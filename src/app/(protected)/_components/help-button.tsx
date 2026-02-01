"use client";

import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ShortcutsDialog } from "./shortcuts-dialog";

export function HelpButton() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
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
      </div>

      <ShortcutsDialog 
        open={isHelpOpen}
        onOpenChange={setIsHelpOpen}
      />
    </>
  );
}
