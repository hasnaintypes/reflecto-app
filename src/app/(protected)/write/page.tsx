"use client";

import React from "react";
import { format } from "date-fns";
import JournalEditor from "./_components/editor";

export default function WritePage() {
  const now = new Date();
  const dateStr = format(now, "MMM dd");
  const dayStr = format(now, "EEEE");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl relative pb-24">
      {/* Sticky Header Wrapper - SOLID Background */}
      <div className="sticky top-0 z-30 bg-[#080808] -mx-8 px-8 py-6 mb-4 border-b border-white/[0.03]">
        <div className="space-y-1">
          <p className="text-neutral-500 font-medium text-lg leading-none">
            {dateStr}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            {dayStr}
          </h1>
          <p className="text-sm font-medium">
            <span className="text-neutral-500">#1 / </span>
            <span className="text-orange-500">Today</span>
          </p>
        </div>
      </div>

      <div className="w-full">
        <JournalEditor />
      </div>
    </div>
  );
}
