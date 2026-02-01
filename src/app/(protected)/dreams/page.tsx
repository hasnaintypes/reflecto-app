"use client";

import React from "react";
import { Plus, Moon, FileText } from "lucide-react";

export default function DreamsPage() {
  // Toggle for empty state
  const dreams = [];
  const hasDreams = dreams.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Minimalist Header - Matching the high-end typography style */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#FB923C] uppercase">
            Journal
          </p>
          <h1 className="font-serif text-6xl font-medium tracking-tight text-white italic">
            Dreams
          </h1>
        </div>

        <button className="group flex items-center gap-2 text-[#FB923C] transition-colors hover:text-[#FB923C]/80">
          <div className="rounded-full border border-[#FB923C]/30 p-2 transition-all group-hover:bg-[#FB923C] group-hover:text-black">
            <Plus size={20} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">
            Record
          </span>
        </button>
      </header>

      {/* Content Area - Clean and Card-free */}
      <div className="mt-16">
        {hasDreams ? (
          <div className="space-y-12">
            {/* List items would render here similarly to the Ideas page */}
          </div>
        ) : (
          /* Empty State - Styled based on your provided screenshot */
          <div className="max-w-2xl space-y-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xl tracking-tight text-zinc-400">
              <span>Your dreams</span>
              <Moon
                size={20}
                className="inline-block animate-pulse fill-[#FB923C]/20 text-[#FB923C]"
              />
              <span>
                will show up here once you start adding them to your entries...
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>More info in our</span>
              <a
                href="#"
                className="group inline-flex items-center gap-1.5 text-zinc-300 underline decoration-zinc-800 underline-offset-4 transition-all hover:text-[#FB923C] hover:decoration-[#FB923C]/50"
              >
                <FileText
                  size={14}
                  className="transition-transform group-hover:-rotate-12"
                />
                documentation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
