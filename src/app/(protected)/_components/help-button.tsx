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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 text-neutral-500 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20 hover:bg-neutral-800 hover:text-emerald-400"
            >
              <HelpCircle size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="border-white/5 bg-neutral-800 px-2 py-1 text-[10px] font-medium tracking-wide text-white"
          >
            <p>Keyboard Shortcuts</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <ShortcutsDialog open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
}
