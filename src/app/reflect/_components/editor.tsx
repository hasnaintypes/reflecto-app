"use client";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EditorToolbar } from "./toolbar";
import { ShortcutsDialog } from "./shortcuts-dialog";

export default function JournalEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      CharacterCount,
      Placeholder.configure({
        placeholder: "The floor is yours...",
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-neutral dark:prose-invert prose-2xl max-w-none focus:outline-none font-serif leading-relaxed text-neutral-200 transition-all duration-700",
          isCentered ? "text-center" : "text-left",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      setIsSaving(true);
      // Save to local draft
      const json = editor.getJSON();
      localStorage.setItem("reflecto-draft", JSON.stringify(json));
      
      setTimeout(() => setIsSaving(false), 800);
    },
    immediatelyRender: false,
  });

  // Load from local draft on mount
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const saved = localStorage.getItem("reflecto-draft");
      if (saved) {
        try {
          editor.commands.setContent(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load draft", e);
        }
      }
    }
  }, [editor]);

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const wordCount = editor?.storage.characterCount.words() || 0;
  const charCount = editor?.storage.characterCount.characters() || 0;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="animate-in fade-in flex h-screen flex-col pt-6 pb-4 duration-1000">
      {/* Integrated Navigation & Toolbar */}
      <div className="sticky top-8 z-50 shrink-0 mb-12 flex items-center justify-between px-2">
        {/* Left: Back Button */}
        <div className="flex-1">
          <Link
            href="/dashboard"
            className="group flex w-fit items-center gap-3 text-neutral-500 transition-all hover:text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-neutral-900/50 backdrop-blur-xl transition-all group-hover:border-white/10 group-hover:bg-neutral-800">
              <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
              Back
            </span>
          </Link>
        </div>

        {/* Center: Toolbar */}
        <div className="flex-initial px-4">
          <EditorToolbar
            editor={editor}
            isCentered={isCentered}
            onToggleAlignment={() => setIsCentered(!isCentered)}
            addImage={addImage}
          />
        </div>

        {/* Right: Date */}
        <div className="flex-1 flex justify-end">
          <div className="flex flex-col items-end gap-0.5 pr-2">
            <span className="font-mono text-[11px] font-bold tracking-tight text-neutral-300">
              {new Date()
                .toLocaleDateString("en-US", { month: "short", day: "numeric" })
                .toUpperCase()}
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-600 uppercase">
              Today
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Editor Space */}
      <div className="relative flex-1 overflow-y-auto px-2 custom-scrollbar">
        {/* Animated Background Glow (Cursor Follow) */}
        <motion.div
          animate={{
            x: mousePos.x - 400,
            y: mousePos.y - 400,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.5 }}
          className="pointer-events-none fixed top-0 left-0 -z-10 h-[800px] w-[800px] rounded-full bg-emerald-500/5 blur-[120px]"
        />

        {/* Static Secondary Glow */}
        <div className="pointer-events-none fixed top-1/4 -right-20 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[100px]" />
        <div className="max-w-none prose prose-neutral dark:prose-invert prose-2xl">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Floating Help Circle */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <TooltipProvider delayDuration={400}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsHelpOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 text-neutral-500 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-neutral-800 hover:text-emerald-400 shadow-2xl"
              >
                <HelpCircle size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="bg-neutral-800 text-[10px] font-medium tracking-wide text-white border-white/5 py-1 px-2"
            >
              <p>Keyboard Shortcuts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ShortcutsDialog 
        open={isHelpOpen}
        onOpenChange={setIsHelpOpen}
      />

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
          color: #262626;
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
