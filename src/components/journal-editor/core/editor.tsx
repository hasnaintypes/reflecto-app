"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import type { EntryType } from "@prisma/client";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import { cn } from "@/lib/utils";
import { ResizableImage, TagMention, PeopleMention } from "../extensions";

import React, { useEffect, useRef } from "react";
import { useSharedEditor } from "./use-editor";
import { api } from "@/trpc/react";
import { useEntryStore } from "@/stores/use-entry-store";
import { useDebounce } from "@/hooks/use-debounce";
import { usePreferencesStore } from "@/stores/use-preferences-store";
import type { JournalEditorProps } from "./types";
import type { EntryMetadata } from "@/types/metadata.types";

import "tippy.js/dist/tippy.css";
import { Loader2 } from "lucide-react";

export default function JournalEditor({
  id: propId,
  initialType = "journal",
}: JournalEditorProps) {
  const { setEditor, isCentered } = useSharedEditor();
  const { currentEntry, setCurrentEntry, updateEntry } = useEntryStore();
  const preferences = usePreferencesStore((state) => state.preferences);

  const bulletedJournal = preferences?.preferences?.bulletedMode ?? true;
  const spellChecking = preferences?.preferences?.spellChecking ?? true;
  const newlineOnEnter = preferences?.preferences?.newlineOnEnter ?? false;
  const autocomplete = preferences?.preferences?.autocomplete ?? true;

  const lastSavedContent = useRef<string>("");
  const isHandlingContentSet = useRef<boolean>(true); // Start locked
  const isInitialized = useRef<boolean>(false);

  const effectiveId = propId ?? currentEntry?.id;
  const effectiveType = currentEntry?.type ?? initialType;

  const createEntry = api.entry.create.useMutation({
    onSuccess: (data) => {
      setCurrentEntry(data);
      lastSavedContent.current = data.content ?? "";
      // Sync URL without full reload
      const url = new URL(window.location.href);
      url.searchParams.set("id", data.id);
      window.history.replaceState(null, "", url.toString());
    },
    onError: (err) => {
      console.error("Failed to create entry:", err.message);
    },
  });

  const updateEntryMutation = api.entry.update.useMutation({
    onSuccess: (data) => {
      updateEntry(data.id, data);
      lastSavedContent.current = data.content ?? "";
    },
    onError: (err) => {
      console.error("Failed to update entry:", err.message);
    },
  });

  const handleAutoSave = useDebounce(
    (content: string) => {
      if (!effectiveId && (!content || content === "<p></p>")) return;

      // Get latest metadata from store to avoid closure staleness
      const latestEntry = useEntryStore.getState().currentEntry;
      const latestMetadata = (latestEntry?.metadata as EntryMetadata) ?? {};

      if (effectiveId) {
        updateEntryMutation.mutate({
          id: effectiveId,
          content,
          isStarred: currentEntry?.isStarred,
          editorMode: bulletedJournal ? "bullet" : "simple",
          metadata: latestMetadata,
        });
      } else {
        createEntry.mutate({
          type: effectiveType as EntryType,
          content,
          isStarred: currentEntry?.isStarred,
          editorMode: bulletedJournal ? "bullet" : "simple",
          title: currentEntry?.title ?? "New Entry",
          metadata: latestMetadata,
        });
      }
    },
    3000,
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {},
        orderedList: false,
        horizontalRule: false,
      }),
      Underline,
      ResizableImage,
      CharacterCount,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Write here...",
      }),
      ...(autocomplete ? [TagMention, PeopleMention] : []),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-neutral dark:prose-invert prose-2xl max-w-none focus:outline-none font-serif leading-relaxed text-foreground/80 transition-all duration-700",
          isCentered ? "text-center" : "text-left",
        ),
        spellcheck: spellChecking ? "true" : "false",
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          if (editor?.isActive("bulletList")) {
            editor.commands.splitListItem("listItem");
            return true;
          }
          if (!newlineOnEnter) {
            handleAutoSave.flush();
            return false; // Allow default behavior (new line)
          }
        }
        return false;
      },
    },
    onCreate: ({ editor }) => {
      if (bulletedJournal && editor.isEmpty && !editor.isActive("bulletList")) {
        editor.commands.toggleBulletList();
      }
    },
    onTransaction: ({ editor, transaction }) => {
      if (
        bulletedJournal &&
        transaction.docChanged &&
        editor.isEmpty &&
        !editor.isActive("bulletList")
      ) {
        editor.commands.toggleBulletList();
      }
    },
    onUpdate: ({ editor }) => {
      if (isHandlingContentSet.current) return;
      const html = editor.getHTML();
      if (html === lastSavedContent.current) return;

      const bulletCount = (html.match(/<li[^>]*>/g) ?? []).length;

      // Update store with bullet count immediately
      const currentMetadata = (currentEntry?.metadata as Record<string, unknown>) ?? {};
      if (currentMetadata.bullets !== bulletCount) {
        updateEntry(effectiveId ?? "", {
          metadata: { ...currentMetadata, bullets: bulletCount },
        });
      }

      handleAutoSave(html);
    },
    immediatelyRender: false,
  });

  // Current entry is now fetched and synced by the parent WritePageContent
  // which ensures fetching starts even while the loader is showing.
  const isEntryLoading = false; 

  // Sync entry content to editor whenever the store entry changes
  useEffect(() => {
    if (editor && !editor.isDestroyed && currentEntry) {
      const currentHTML = editor.getHTML();
      // Only set content if it's different to avoid cursor jumps
      if (currentEntry.content !== currentHTML) {
        isHandlingContentSet.current = true;
        editor.commands.setContent(currentEntry.content ?? "");
        lastSavedContent.current = currentEntry.content ?? "";
        
        setTimeout(() => {
          isHandlingContentSet.current = false;
          isInitialized.current = true;
        }, 100);
      }
    } else if (editor && !editor.isDestroyed && !propId && !isInitialized.current) {
      // For truly new entries
      editor.commands.setContent("");
      isInitialized.current = true;
      isHandlingContentSet.current = false;
    }
  }, [currentEntry, editor, propId]);

  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
    return () => setEditor(null);
  }, [editor, setEditor]);

  useEffect(() => {
    if (editor && currentEntry && !editor.isFocused) {
      const currentHTML = editor.getHTML();
      if (currentEntry.content && currentEntry.content !== currentHTML) {
        setTimeout(() => {
          if (editor && !editor.isDestroyed) {
            editor.commands.setContent(currentEntry.content);
            lastSavedContent.current = currentEntry.content!;

            if (
              bulletedJournal &&
              editor.isEmpty &&
              !editor.isActive("bulletList")
            ) {
              editor.commands.toggleBulletList();
            }
          }
        }, 0);
      }
    }
  }, [editor, currentEntry, bulletedJournal]);

  if (isEntryLoading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <Loader2 className="animate-spin text-muted-foreground/40" size={32} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in flex h-full flex-col duration-1000">
      <div className="relative flex-1 px-2">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--border);
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--muted-foreground);
          opacity: 0.4;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 3rem 0;
          opacity: 0.2;
        }
        .ProseMirror blockquote {
          border-left: 2px solid var(--primary);
          padding-left: 1.5rem;
          color: var(--muted-foreground);
          font-style: italic;
        }
        /* Bullet List Styling */
        .ProseMirror ul {
          list-style-type: none;
          padding-left: 2rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .ProseMirror li {
          position: relative;
          margin-bottom: 1rem;
          line-height: 1.7;
          transition: all 0.3s ease;
        }
        .ProseMirror li::before {
          content: "";
          position: absolute;
          left: -1.5rem;
          top: 0.75em;
          width: 0.5rem;
          height: 0.5rem;
          background: linear-gradient(135deg, var(--primary) 0%, #34d399 100%);
          border-radius: 50%;
          opacity: 0.6;
          box-shadow: 0 0 10px var(--primary-foreground);
          transition: all 0.3s ease;
        }
        .ProseMirror li:hover::before {
          opacity: 1;
          transform: scale(1.2);
          box-shadow: 0 0 15px var(--primary);
        }
        .ProseMirror {
          overflow-x: hidden !important;
          width: 100%;
        }
        /* Tags - Blue text ONLY */
        span.editor-tag,
        span.mention-tag-custom,
        span[data-type="mention-tag"],
        .ProseMirror span.editor-tag,
        .ProseMirror span.mention-tag-custom,
        .ProseMirror span[data-type="mention-tag"],
        .prose span.editor-tag,
        .prose span.mention-tag-custom,
        .prose span[data-type="mention-tag"] {
          color: #60a5fa !important;
          background: transparent !important;
          background-color: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          font-weight: normal !important;
          font-family: inherit !important;
          text-decoration: none !important;
          box-shadow: none !important;
        }

        /* People - Green text ONLY */
        span.editor-person,
        span.mention-person-custom,
        span[data-type="mention-person"],
        .ProseMirror span.editor-person,
        .ProseMirror span.mention-person-custom,
        .ProseMirror span[data-type="mention-person"],
        .prose span.editor-person,
        .prose span.mention-person-custom,
        .prose span[data-type="mention-person"] {
          color: #34d399 !important;
          background: transparent !important;
          background-color: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          font-weight: normal !important;
          font-family: inherit !important;
          font-style: normal !important;
          text-decoration: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
