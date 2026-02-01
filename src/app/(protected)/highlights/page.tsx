"use client";

import React from "react";
import { Heart, ArrowRight, Circle } from "lucide-react";

export default function HighlightsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl relative pb-24">
      <div className="sticky top-0 z-30 bg-[#080808] -mx-8 px-8 py-6 mb-4 border-b border-white/[0.03]">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-white tracking-tight">Highlights</h1>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <p className="text-zinc-200 text-base leading-relaxed">
          You don't have any highlights yet,
          <br />
          click on the bullet icon next to an entry to highlight it.
        </p>

        <div className="flex items-center gap-4">
          <Circle className="w-5 h-5 text-zinc-600 fill-zinc-600" />
          <ArrowRight className="w-5 h-5 text-white" />
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </div>
      </div>
    </div>
  );
}
