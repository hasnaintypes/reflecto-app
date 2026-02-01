"use client";

import React from "react";
import { format } from "date-fns";
import JournalEditor from "./_components/editor";
import { Sparkles } from "lucide-react";

export default function WritePage() {
  const now = new Date();
  const dateStr = format(now, "MMMM do, yyyy").toLowerCase();
  const dayStr = format(now, "EEEE");

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      <div className="animate-in fade-in slide-in-from-top-4 sticky top-0 z-30 -mx-6 bg-[#09090b]/80 px-6 backdrop-blur-md transition-all duration-300 duration-1000">
        <header className="mb-8 space-y-4 pt-6">
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#FB923C] uppercase">
              {dateStr}
            </p>
            <h1 className="font-serif text-7xl font-medium tracking-tight text-white italic">
              {dayStr}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 rounded border border-white/5 bg-zinc-900/50 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-400">
              <Sparkles size={10} className="text-[#FB923C]" />
              CURRENT ENTRY
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-700 uppercase">
              Session #1
            </span>
          </div>
        </header>

        {/* Gradient fade at bottom of sticky header */}
        <div className="pointer-events-none absolute -bottom-8 left-0 h-8 w-full bg-gradient-to-b from-[#09090b]/80 to-transparent" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 relative min-h-[500px] duration-1000">
        <JournalEditor />
      </div>
    </div>
  );
}
