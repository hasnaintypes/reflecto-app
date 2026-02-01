"use client";

import React from "react";
import { Plus, Lightbulb } from "lucide-react";

export default function IdeasPage() {
  // Toggle this to see the empty state vs. the list
  const ideas: any[] = [];
  const hasIdeas = ideas.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-8 pb-8 duration-1000">
      {/* Header Section */}
      <header className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#FB923C] uppercase">
            Workspace
          </p>
          <h1 className="font-serif text-6xl font-medium tracking-tight text-white italic">
            Ideas
          </h1>
          <p className="max-w-md pt-2 text-sm text-zinc-500">
            A minimalist space for raw thoughts and evolving concepts. No
            constraints, just clarity.
          </p>
        </div>

        <button className="group flex items-center gap-2 text-[#FB923C] transition-colors hover:text-[#FB923C]/80">
          <div className="rounded-full border border-[#FB923C]/30 p-2 transition-all group-hover:bg-[#FB923C] group-hover:text-black">
            <Plus size={20} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">
            Capture
          </span>
        </button>
      </header>

      {/* Content Area */}
      <div className="relative">
        {hasIdeas ? (
          <div className="space-y-8">
            {/* Map your ideas here */}
            {ideas.map((idea, index) => (
              <div key={index} className="group cursor-pointer">
                <span className="font-mono text-xs text-zinc-600">
                  {idea.date}
                </span>
                <h3 className="mt-1 text-2xl text-zinc-300 transition-colors group-hover:text-white">
                  {idea.title}
                </h3>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Empty State */
          <div className="flex flex-col items-start justify-center py-10">
            <div className="mb-6 inline-flex items-center gap-3 text-zinc-700">
              <Lightbulb size={18} strokeWidth={1.5} />
              <span className="font-mono text-xs tracking-widest uppercase">
                The canvas is empty
              </span>
            </div>

            <h2 className="max-w-md text-3xl leading-relaxed font-light text-zinc-400">
              Great things start with a{" "}
              <span className="text-zinc-200">single spark</span>. What’s on
              your mind?
            </h2>

            <button className="group mt-10 flex items-center gap-4 text-zinc-500 transition-all hover:text-[#FB923C]">
              <span className="text-sm font-medium tracking-tighter uppercase transition-all group-hover:tracking-[0.2em]">
                Start creating
              </span>
              <div className="h-px w-12 bg-zinc-800 transition-all group-hover:w-20 group-hover:bg-[#FB923C]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
