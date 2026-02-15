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
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import type { JournalEditorProps } from "./types";

import "tippy.js/dist/tippy.css";

export default function JournalEditor({
  id: propId,
  initialType = "journal",
}: JournalEditorProps) {
  const { setEditor, isCentered } = useSharedEditor();
  const { currentEntry, setCurrentEntry, updateEntry } = useEntryStore();
  const lastSavedContent = useRef<string>("");

  // Use either the prop ID or the current entry ID from the store
  const effectiveId = propId ?? currentEntry?.id;
  const effectiveType = currentEntry?.type ?? initialType;

  // Fetch entry if ID is provided but not in store or doesn't match
  const { data: fetchedEntry } = api.entry.getById.useQuery(
    { id: propId! },
    {
      enabled: !!propId && currentEntry?.id !== propId,
      staleTime: Infinity, // Only fetch once per ID mount
    },
  );

  // Sync fetched entry to store
  useEffect(() => {
    if (fetchedEntry) {
      setCurrentEntry(fetchedEntry);
      lastSavedContent.current = fetchedEntry.content ?? "";
    }
  }, [fetchedEntry, setCurrentEntry]);

  // tRPC mutations
  const createEntry = api.entry.create.useMutation({
    onSuccess: (data) => {
      setCurrentEntry(data);
      lastSavedContent.current = data.content ?? "";
    },
    onError: (err) => {
      toast.error("Failed to create entry: " + err.message);
    },
  });

  const updateEntryMutation = api.entry.update.useMutation({
    onSuccess: (data) => {
      updateEntry(data.id, data);
      lastSavedContent.current = data.content ?? "";
    },
    onError: (err) => {
      toast.error("Failed to update entry: " + err.message);
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
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
      TagMention,
      PeopleMention,
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-neutral dark:prose-invert prose-2xl max-w-none focus:outline-none font-serif leading-relaxed text-foreground/80 transition-all duration-700",
          isCentered ? "text-center" : "text-left",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html === lastSavedContent.current) return;

      handleAutoSave(html);
    },
    immediatelyRender: false,
  });

  const handleAutoSave = useDebounce((content: string) => {
    if (!effectiveId && (!content || content === "<p></p>")) return;

    if (effectiveId) {
      updateEntryMutation.mutate({
        id: effectiveId,
        content,
        isStarred: currentEntry?.isStarred,
        metadata: currentEntry?.metadata as Record<string, unknown>,
      });
    } else {
      createEntry.mutate({
        type: effectiveType as EntryType,
        content,
        isStarred: currentEntry?.isStarred,
        title: currentEntry?.title ?? "New Entry",
        metadata: currentEntry?.metadata as Record<string, unknown>,
      });
    }
  }, 3000);

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
        editor.commands.setContent(currentEntry.content);
        lastSavedContent.current = currentEntry.content;
      }
    }
  }, [editor, currentEntry]);

  return (
    <div className="animate-in fade-in flex h-full flex-col pt-6 pb-4 duration-1000">
      <div className="custom-scrollbar relative flex-1 overflow-y-auto px-2">
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
