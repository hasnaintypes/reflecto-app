"use client";

import React from "react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Sparkles,
  Heading1,
  Heading2,
  Quote,
  Minus,
  Image as ImageIcon,
  AlignCenter,
  AlignLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorToolbarProps {
  editor: Editor | null;
  isCentered: boolean;
  onToggleAlignment: () => void;
  addImage: () => void;
}

const ToolbarButton = ({
  onClick,
  isActive,
  children,
  tooltip,
  className,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  tooltip: string;
  className?: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:bg-white/5 hover:text-white",
          isActive ? "bg-white/10 text-white" : "text-neutral-500",
          className,
        )}
      >
        {children}
      </button>
    </TooltipTrigger>
    <TooltipContent
      sideOffset={8}
      className="border-white/5 bg-neutral-800 px-2 py-1 text-white"
    >
      <p className="text-[11px] font-medium tracking-wide">{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

export function EditorToolbar({
  editor,
  isCentered,
  onToggleAlignment,
  addImage,
}: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl border border-white/5 bg-neutral-900/50 p-1.5 shadow-[0_8px_32_rgb(0,0,0,0.4)] backdrop-blur-xl">
      {/* Alignment group */}
      <div className="flex items-center gap-1 px-1">
        <ToolbarButton
          onClick={onToggleAlignment}
          isActive={isCentered}
          tooltip="Toggle Alignment"
        >
          {isCentered ? <AlignCenter size={18} /> : <AlignLeft size={18} />}
        </ToolbarButton>
      </div>

      <div className="mx-1 h-6 w-[1px] bg-white/10" />

      {/* Block types */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor?.isActive("heading", { level: 1 })}
          tooltip="Heading 1"
        >
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor?.isActive("heading", { level: 2 })}
          tooltip="Heading 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          isActive={editor?.isActive("blockquote")}
          tooltip="Blockquote"
        >
          <Quote size={18} />
        </ToolbarButton>
      </div>

      <div className="mx-1 h-6 w-[1px] bg-white/10" />

      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
          tooltip="Bold"
        >
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
          tooltip="Italic"
        >
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          isActive={editor?.isActive("underline")}
          tooltip="Underline"
        >
          <UnderlineIcon size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike")}
          tooltip="Strikethrough"
        >
          <Strikethrough size={18} />
        </ToolbarButton>
      </div>

      <div className="mx-1 h-6 w-[1px] bg-white/10" />

      {/* Insertion */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          tooltip="Divider"
        >
          <Minus size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} tooltip="Insert Image">
          <ImageIcon size={18} />
        </ToolbarButton>
      </div>

      <div className="mx-1 h-6 w-[1px] bg-white/10" />

      {/* AI/Magic group */}
      <div className="flex items-center gap-1 px-1">
        <ToolbarButton
          onClick={() => undefined} // Placeholder for AI
          className="text-emerald-400/80 hover:bg-emerald-400/10 hover:text-emerald-400"
          tooltip="AI Refine"
        >
          <Sparkles size={18} />
        </ToolbarButton>
      </div>
    </div>
  );
}
