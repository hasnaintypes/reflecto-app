"use client";

import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShortcutsDialog } from "./shortcuts-dialog";

export function HelpButton() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <div className="fixed right-6 bottom-6 z-[100]">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="border-border/40 bg-muted/80 text-muted-foreground hover:border-border/60 hover:bg-muted hover:text-primary flex h-10 w-10 items-center justify-center rounded-full border shadow-2xl backdrop-blur-xl transition-all"
            >
              <HelpCircle size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="border-border/50 bg-popover text-popover-foreground px-2 py-1 text-[10px] font-medium tracking-wide"
          >
            <p>Keyboard Shortcuts</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <ShortcutsDialog open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
}
