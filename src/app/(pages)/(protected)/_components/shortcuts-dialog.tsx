"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ShortcutItemProps {
  label: string;
  keys: string[];
}

const ShortcutItem = ({ label, keys }: ShortcutItemProps) => (
  <div className="group flex items-center justify-between py-3">
    <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">
      {label}
    </span>
    <div className="flex items-center gap-1.5">
      {keys.map((key) => (
        <kbd
          key={key}
          className="border-border bg-muted text-muted-foreground inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border px-1.5 font-mono text-[11px] font-semibold shadow-[0_2px_0_0_rgba(0,0,0,0.4)]"
        >
          {key === "Ctrl" ? "⌘" : key}
        </kbd>
      ))}
    </div>
  </div>
);

const Section = ({
  title,
  items,
}: {
  title: string;
  items: ShortcutItemProps[];
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-muted-foreground/60 px-1 text-[11px] font-semibold tracking-wider uppercase">
      {title}
    </h3>
    <div className="divide-border/40 flex flex-col divide-y">
      {items.map((item) => (
        <ShortcutItem key={item.label} {...item} />
      ))}
    </div>
  </div>
);

export function ShortcutsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const formattingShortcuts = [
    { label: "Bold", keys: ["Ctrl", "B"] },
    { label: "Italic", keys: ["Ctrl", "I"] },
    { label: "Underline", keys: ["Ctrl", "U"] },
    { label: "Strikethrough", keys: ["Ctrl", "Shift", "X"] },
    { label: "Heading 1", keys: ["Ctrl", "Alt", "1"] },
    { label: "Heading 2", keys: ["Ctrl", "Alt", "2"] },
  ];

  const navigationShortcuts = [
    { label: "New Line", keys: ["Enter"] },
    { label: "Hard Break", keys: ["Shift", "Enter"] },
    { label: "Undo", keys: ["Ctrl", "Z"] },
    { label: "Redo", keys: ["Ctrl", "Y"] },
    { label: "Search", keys: ["Ctrl", "F"] },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border/40 bg-background gap-0 overflow-hidden p-0 sm:max-w-[550px]">
        <div className="border-border/40 border-b p-8">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl font-semibold">
              Keyboard Shortcuts
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Master the editor with these productivity commands.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="bg-muted/20 grid grid-cols-1 gap-x-12 gap-y-8 p-8 md:grid-cols-2">
          <Section title="Formatting" items={formattingShortcuts} />
          <Section title="Editor" items={navigationShortcuts} />
        </div>

        <div className="border-border/40 bg-muted/40 flex justify-center border-t p-4">
          <p className="text-[10px] tracking-widest text-zinc-600 uppercase">
            Press <kbd className="text-muted-foreground/60">Esc</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
