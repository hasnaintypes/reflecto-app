"use client";

import React from "react";
import {
  Lightbulb,
  Quote,
  Asterisk,
  AlignLeft,
  GraduationCap,
  FileText,
  Star,
  ArrowUpDown,
} from "lucide-react";

export default function WisdomPage() {
  const wisdomEntries = [];
  const hasWisdom = wisdomEntries.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#F472B6] uppercase">
            Workspace
          </p>
          <h1 className="font-serif text-6xl font-medium tracking-tight text-white italic">
            Wisdom
          </h1>
        </div>

        {/* Header Utilities */}
        <div className="mb-2 flex items-center gap-6 text-zinc-500">
          <Star
            size={20}
            className="cursor-pointer transition-colors hover:text-white"
          />
          <ArrowUpDown
            size={20}
            className="cursor-pointer transition-colors hover:text-white"
          />
        </div>
      </header>

      {/* Content Area */}
      <div className="mt-16">
        {hasWisdom ? (
          <div className="space-y-12">{/* Wisdom entries render here */}</div>
        ) : (
          /* Empty State - Matching the 'Wisdom' reference strictly */
          <div className="max-w-2xl space-y-8">
            <p className="text-lg leading-relaxed tracking-tight text-zinc-400">
              Collect shower thoughts, mind-blowing facts, insightful quotes,
              excerpts from good books, and lessons learned as a source of
              inspiration.
            </p>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500">
              <span className="lowercase">More info in our</span>
              <a
                href="#"
                className="group flex items-center gap-1 text-zinc-400 underline decoration-zinc-800 underline-offset-4 transition-colors hover:text-[#F472B6] hover:decoration-[#F472B6]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>

            {/* Multi-Action Button Stack from reference */}
            <div className="flex flex-row items-start gap-3 pt-4">
              <ActionButton
                icon={<Lightbulb size={16} className="text-amber-400" />}
                label="Add Thought"
              />
              <ActionButton
                icon={<Quote size={16} className="text-purple-400" />}
                label="Add Quote"
              />
              <ActionButton
                icon={<Asterisk size={16} className="text-sky-400" />}
                label="Add Fact"
              />
              <ActionButton
                icon={<AlignLeft size={16} className="text-orange-400" />}
                label="Add Excerpt"
              />
              <ActionButton
                icon={<GraduationCap size={16} className="text-emerald-400" />}
                label="Add Lesson"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Action Button Component matching your UI style */
function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex min-w-[160px] cursor-pointer items-center gap-3 rounded bg-zinc-800/40 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white active:scale-95">
      {icon}
      <span>{label}</span>
    </button>
  );
}
