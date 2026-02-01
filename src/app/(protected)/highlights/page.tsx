"use client";

import React from "react";
import { Plus, Sparkles, FileText } from "lucide-react";

export default function HighlightsPage() {
  const highlights = [];
  const hasHighlights = highlights.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#F87171] uppercase">
            Workspace
          </p>
          <h1 className="font-serif text-6xl font-medium tracking-tight text-white italic">
            Highlights
          </h1>
        </div>

        <button className="group flex items-center gap-2 text-[#F87171] transition-colors hover:text-[#F87171]/80">
          <div className="rounded-full border border-[#F87171]/30 p-2 transition-all group-hover:bg-[#F87171] group-hover:text-black">
            <Plus size={20} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">
            Capture
          </span>
        </button>
      </header>

      <div className="mt-16">
        {!hasHighlights && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-lg tracking-tight text-zinc-400">
              <span className="lowercase">Your highlights</span>
              <Sparkles
                size={16}
                className="fill-[#F87171]/10 text-[#F87171]"
              />
              <span className="lowercase">
                will show up here once you start adding them to your entries...
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500">
              <span className="lowercase">More info in our</span>
              <a
                href="#"
                className="group flex items-center gap-1 text-zinc-400 underline decoration-zinc-800 underline-offset-4 transition-colors hover:text-[#F87171] hover:decoration-[#F87171]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
