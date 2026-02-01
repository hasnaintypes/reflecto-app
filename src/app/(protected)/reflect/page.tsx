"use client";

import React from "react";
import { format, subDays } from "date-fns";
import { Plus, ListFilter, Info, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ReflectPage() {
  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(yesterday, "EEEE, MMM dd");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pb-24 duration-1000">
      <div className="sticky top-0 z-20 -mx-6 mb-8 bg-[#09090b]/80 px-6 backdrop-blur-md transition-all duration-300">
        <header className="flex flex-col justify-between gap-6 pt-6 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#FCD34D] uppercase">
              Review
            </p>
            <h1 className="font-serif text-6xl font-medium tracking-tight text-white italic">
              Reflect
            </h1>
          </div>

          <button className="mb-2 text-zinc-500 transition-colors hover:text-[#FCD34D]">
            <ListFilter size={22} strokeWidth={1.5} />
          </button>
        </header>

        <div className="pointer-events-none absolute -bottom-8 left-0 h-8 w-full bg-gradient-to-b from-[#09090b]/80 to-transparent" />
      </div>

      <div className="space-y-12">
        <section className="group">
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-2xl font-medium text-white">Yesterday</h2>
            <span className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
              {formattedYesterday}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-zinc-400 lowercase">
              There is no entry for {format(yesterday, "MMM dd")} yet.
            </p>
            <Link
              href="/write"
              className="group flex items-center gap-2 text-[#FCD34D] transition-all hover:opacity-80"
            >
              <div className="rounded-full border border-[#FCD34D]/30 p-1.5 transition-all group-hover:bg-[#FCD34D] group-hover:text-black">
                <Plus size={14} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">
                Write entry
              </span>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-2xl font-medium text-white">This week</h2>
            <span className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
              Jan 26 → Today
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-lg text-zinc-400">
            <span className="lowercase">
              Nothing here yet... highlights and ideas will appear shortly
            </span>
            <Sparkles size={16} className="fill-[#FCD34D]/10 text-[#FCD34D]" />
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-2xl font-medium text-white">More / Less</h2>
            <div className="flex items-center gap-1 rounded border border-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-zinc-500">
              PRO <Info size={10} />
            </div>
          </div>
          <p className="mb-4 text-sm text-zinc-500 lowercase">
            Evolution of your aspirations
          </p>
          <p className="max-w-xl leading-relaxed text-zinc-400 lowercase">
            You didn&apos;t flag any tags as &quot;do more&quot; or &quot;do less&quot; yet. Click on a
            tag and open the &quot;Details&quot; tab in order to do so.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-medium text-white">Memory lane</h2>
          <div className="flex items-start gap-3 text-lg text-zinc-400">
            <span className="leading-relaxed lowercase">
              Throwbacks will show up here once you have created 10 or more
              entries, otherwise it would be quite boring...
            </span>
          </div>
        </section>
      </div>

      <div className="mt-24 border-t border-zinc-900 pt-8">
        <div className="flex items-center gap-1.5 text-sm text-zinc-500">
          <span className="lowercase">Curious about the process?</span>
          <a
            href="#"
            className="group flex items-center gap-1 text-zinc-400 underline decoration-zinc-800 underline-offset-4 transition-colors hover:text-[#FCD34D] hover:decoration-[#FCD34D]/40"
          >
            <FileText size={14} className="opacity-70" />
            <span className="lowercase">read the guide.</span>
          </a>
        </div>
      </div>
    </div>
  );
}
