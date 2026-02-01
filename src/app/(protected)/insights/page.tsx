"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Moon,
  Heart,
  Hash,
  AtSign,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Heatmap } from "./_components/heatmap";
import { StatsGrid } from "./_components/stats-grid";
import { InsightCharts } from "./_components/insight-charts";

const levels = [
  "bg-zinc-900/40", // Level 0: Empty
  "bg-indigo-900/20", // Level 1: Low
  "bg-indigo-700/40", // Level 2: Medium
  "bg-indigo-500/60", // Level 3: High
  "bg-[#6366F1]", // Level 4: Peak
];

const tabs = [
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "dreams", label: "Dreams", icon: Moon, color: "text-yellow-400" },
  { id: "highlights", label: "Highlights", icon: Heart, color: "text-red-400" },
  { id: "tags", label: "Tags", icon: Hash, color: "text-blue-400" },
  { id: "people", label: "People", icon: AtSign, color: "text-emerald-400" },
  { id: "wisdom", label: "Wisdom", icon: Gem, color: "text-pink-400" },
];

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState("journal");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pb-24 duration-1000">
      <div className="sticky top-0 z-20 -mx-6 mb-8 bg-[#09090b]/80 px-6 backdrop-blur-md transition-all duration-300">
        <header className="flex flex-col gap-2 pt-6">
          {/* Row 1: Sub-header and Legend */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#6366F1] uppercase">
              Analysis
            </p>
            {/* Heatmap Legend - Perfectly Aligned */}
            <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">
              <span>Less</span>
              <div className="flex gap-1.5">
                {levels.map((lvl, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-[1px] ${lvl}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Row 2: Main Title and Filter */}
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-6xl font-medium tracking-tight text-white italic">
              Insights
            </h1>
          </div>
        </header>

        <nav className="flex items-center gap-2 border-b border-white/[0.03]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative flex items-center gap-2.5 px-4 py-4 transition-all",
                activeTab === tab.id
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              <tab.icon
                size={14}
                className={cn(
                  "transition-opacity",
                  activeTab === tab.id
                    ? tab.color
                    : "opacity-40 group-hover:opacity-100",
                )}
              />
              <span className="text-[11px] font-bold tracking-widest uppercase">
                {tab.label}
              </span>

              {activeTab === tab.id && (
                <div className="absolute right-0 bottom-0 left-0 h-px bg-[#6366F1] shadow-[0_0_8px_#6366F1]" />
              )}
            </button>
          ))}
        </nav>
        
        <div className="pointer-events-none absolute -bottom-8 left-0 h-8 w-full bg-gradient-to-b from-[#09090b]/80 to-transparent" />
      </div>

      <div className="space-y-12">
        <section>
          <Heatmap />
        </section>

        <section className="pt-2">
          <StatsGrid />
        </section>

        <section className="pt-2">
          <InsightCharts />
        </section>
      </div>
    </div>
  );
}
