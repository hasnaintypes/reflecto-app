"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import type { EntryType } from "@prisma/client";
import type { Editor, Range } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import { cn } from "@/lib/utils";

import React, { useEffect, useRef } from "react";
import { useSharedEditor } from "../../_components/editor-context";
import { api } from "@/trpc/react";
import { useEntryStore } from "@/stores/use-entry-store";
import { toast } from "sonner";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import { useDebounce } from "@/hooks/use-debounce";
import { createSuggestionConfig } from "./suggestion-config";
import "tippy.js/dist/tippy.css";
import { type SuggestionItem } from "./suggestion-list";

interface JournalEditorProps {
  id?: string;
  initialType?: string;
}

interface MentionNodeAttributes {
  id: string;
  label: string;
}

interface TrpcResponse<T> {
  result: {
    data: {
      json: T;
    };
  };
}

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
      Image,
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
      Mention.extend({
        name: "mention-tag",
        inline: true,
        group: "inline",
        atom: true,
        addAttributes() {
          return {
            id: {
              default: null,
              parseHTML: (element) => element.getAttribute("data-id"),
              renderHTML: (attributes: Record<string, string>) => {
                if (!attributes.id) return {};
                return { "data-id": attributes.id };
              },
            },
            label: {
              default: null,
              parseHTML: (element) => element.getAttribute("data-label"),
              renderHTML: (attributes: Record<string, string>) => {
                if (!attributes.label) return {};
                return { "data-label": attributes.label };
              },
            },
          };
        },
        parseHTML() {
          return [
            {
              tag: 'span[data-type="mention-tag"]',
              getAttrs: (dom) => {
                const element = dom;
                return {
                  id: element.getAttribute("data-id"),
                  label: element.getAttribute("data-label"),
                };
              },
            },
          ];
        },
        renderHTML({ node, HTMLAttributes }) {
          return [
            "span",
            {
              ...HTMLAttributes,
              class: "mention-tag-custom editor-tag",
              "data-type": "mention-tag",
              "data-id": (node.attrs as MentionNodeAttributes).id,
              "data-label": (node.attrs as MentionNodeAttributes).label,
            },
            `#${(node.attrs as MentionNodeAttributes).label}`,
          ];
        },
      }).configure({
        HTMLAttributes: {
          class: "editor-tag",
        },
        renderText({ node }) {
          return `#${(node.attrs as MentionNodeAttributes).label}`;
        },
        suggestion: {
          char: "#",
          ...createSuggestionConfig(),
          command: ({
            editor,
            range,
            props,
          }: {
            editor: Editor;
            range: Range;
            props: SuggestionItem;
          }) => {
            // Execute async logic but don't return the promise to the command handler
            const executeCommand = async () => {
              // If this is a new tag (has isNew flag), create it first
              if (props.isNew) {
                try {
                  const createResponse = await fetch(
                    "/api/trpc/tag.create?batch=1",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        "0": { json: { name: props.label, color: "#60A5FA" } },
                      }),
                    },
                  );
                  const createData =
                    (await createResponse.json()) as TrpcResponse<{
                      id: string;
                      name: string;
                    }>[];
                  const newTag = createData[0]?.result?.data?.json;

                  if (newTag) {
                    props.id = newTag.id;
                    props.label = newTag.name;
                  }
                } catch (error) {
                  console.error("Failed to create tag:", error);
                }
              }

              // Delete the trigger character and query text
              editor
                .chain()
                .focus()
                .deleteRange(range)
                .insertContent({
                  type: "mention-tag",
                  attrs: props,
                })
                .run();
            };

            void executeCommand();
          },
          items: async ({
            query,
          }: {
            query: string;
          }): Promise<SuggestionItem[]> => {
            const response = await fetch(
              `/api/trpc/tag.search?batch=1&input=${encodeURIComponent(JSON.stringify({ "0": { json: { query } } }))}`,
            );
            const data = (await response.json()) as TrpcResponse<
              SuggestionItem[]
            >[];
            const results: SuggestionItem[] = data[0]?.result?.data?.json ?? [];

            // If query exists and no exact match found, add "Create new" option
            if (
              query.trim() &&
              !results.some(
                (r) => r.label?.toLowerCase() === query.toLowerCase(),
              )
            ) {
              return [{ id: "new", label: query, isNew: true }, ...results];
            }

            return results;
          },
        },
      }),
      Mention.extend({
        name: "mention-person",
        inline: true,
        group: "inline",
        atom: true,
        addAttributes() {
          return {
            id: {
              default: null,
              parseHTML: (element) => element.getAttribute("data-id"),
              renderHTML: (attributes: Record<string, string>) => {
                if (!attributes.id) return {};
                return { "data-id": attributes.id };
              },
            },
            label: {
              default: null,
              parseHTML: (element) => element.getAttribute("data-label"),
              renderHTML: (attributes: Record<string, string>) => {
                if (!attributes.label) return {};
                return { "data-label": attributes.label };
              },
            },
          };
        },
        parseHTML() {
          return [
            {
              tag: 'span[data-type="mention-person"]',
              getAttrs: (dom) => {
                const element = dom;
                return {
                  id: element.getAttribute("data-id"),
                  label: element.getAttribute("data-label"),
                };
              },
            },
          ];
        },
        renderHTML({ node, HTMLAttributes }) {
          return [
            "span",
            {
              ...HTMLAttributes,
              class: "mention-person-custom editor-person",
              "data-type": "mention-person",
              "data-id": (node.attrs as MentionNodeAttributes).id,
              "data-label": (node.attrs as MentionNodeAttributes).label,
            },
            `@${(node.attrs as MentionNodeAttributes).label}`,
          ];
        },
        renderText({ node }) {
          return `@${(node.attrs as MentionNodeAttributes).label}`;
        },
      }).configure({
        HTMLAttributes: {
          class: "editor-person",
        },
        suggestion: {
          char: "@",
          ...createSuggestionConfig(),
          command: ({
            editor,
            range,
            props,
          }: {
            editor: Editor;
            range: Range;
            props: SuggestionItem;
          }) => {
            const executeCommand = async () => {
              if (props.isNew) {
                try {
                  const createResponse = await fetch(
                    "/api/trpc/person.create?batch=1",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        "0": { json: { name: props.label } },
                      }),
                    },
                  );
                  const createData =
                    (await createResponse.json()) as TrpcResponse<{
                      id: string;
                      name: string;
                    }>[];
                  const newPerson = createData[0]?.result?.data?.json;

                  if (newPerson) {
                    props.id = newPerson.id;
                    props.label = newPerson.name;
                  }
                } catch (error) {
                  console.error("Failed to create person:", error);
                }
              }

              editor
                .chain()
                .focus()
                .deleteRange(range)
                .insertContent({
                  type: "mention-person",
                  attrs: props,
                })
                .run();
            };

            void executeCommand();
          },
          items: async ({
            query,
          }: {
            query: string;
          }): Promise<SuggestionItem[]> => {
            const response = await fetch(
              `/api/trpc/person.search?batch=1&input=${encodeURIComponent(JSON.stringify({ "0": { json: { query } } }))}`,
            );
            const data = (await response.json()) as TrpcResponse<
              SuggestionItem[]
            >[];
            const results: SuggestionItem[] = data[0]?.result?.data?.json ?? [];

            if (
              query.trim() &&
              !results.some(
                (r) => r.label?.toLowerCase() === query.toLowerCase(),
              )
            ) {
              return [{ id: "new", label: query, isNew: true }, ...results];
            }

            return results;
          },
        },
      }),
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
