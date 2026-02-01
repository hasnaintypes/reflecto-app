"use client";

import {
  useEditor,
  EditorContent,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import { cn } from "@/lib/utils";

import React, { useEffect } from "react";
import { useSharedEditor } from "../../_components/editor-context";

export default function JournalEditor() {
  const { setEditor, isCentered } = useSharedEditor();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      Image,
      CharacterCount,
      Placeholder.configure({
        placeholder: "Write here...",
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-neutral dark:prose-invert prose-2xl max-w-none focus:outline-none font-serif leading-relaxed text-neutral-400 transition-all duration-700",
          isCentered ? "text-center" : "text-left",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      // Save to local draft
      const json = editor.getJSON();
      localStorage.setItem("reflecto-draft", JSON.stringify(json));
    },
    immediatelyRender: false,
  });

  // Sync editor with context
  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
    return () => setEditor(null);
  }, [editor, setEditor]);

  // Load from local draft on mount
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const saved = localStorage.getItem("reflecto-draft");
      if (saved) {
        try {
          editor.commands.setContent(JSON.parse(saved) as JSONContent);
        } catch (e) {
          console.error("Failed to load draft", e);
        }
      }
    }
  }, [editor]);



  return (
    <div className="animate-in fade-in flex h-full flex-col pt-6 pb-4 duration-1000">
      <div className="relative flex-1 overflow-y-auto px-2 custom-scrollbar">
        <div className="max-w-none prose prose-neutral dark:prose-invert prose-2xl">
          <EditorContent editor={editor} />
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #525252;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror hr {
          border: none;
          border-top: 1px solid #1f1f1f;
          margin: 3rem 0;
        }
        .ProseMirror blockquote {
          border-left: 2px solid #333;
          padding-left: 1.5rem;
          color: #a3a3a3;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
