"use client";

import React, { useState } from "react";
import { BookOpen, Moon, Heart, Hash, AtSign, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { Heatmap } from "./_components/heatmap";
import { StatsGrid } from "./_components/stats-grid";
import { InsightCharts } from "./_components/insight-charts";

const levels = [
  "bg-muted/40", // Level 0: Empty
  "bg-primary/20", // Level 1: Low
  "bg-primary/40", // Level 2: Medium
  "bg-primary/60", // Level 3: High
  "bg-primary", // Level 4: Peak
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
      <div className="bg-background/80 sticky top-0 z-20 -mx-6 mb-8 px-6 backdrop-blur-md transition-all duration-300">
        <header className="flex flex-col gap-2 pt-6">
          {/* Row 1: Sub-header and Legend */}
          <div className="flex items-center justify-between">
            <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              Analysis
            </p>
            {/* Heatmap Legend - Perfectly Aligned */}
            <div className="text-muted-foreground/60 flex items-center gap-2 text-[9px] font-bold tracking-tighter uppercase">
              <span>Less</span>
              <div className="flex gap-1.5">
                {levels.map((lvl, i) => (
                  <div key={i} className={`h-2.5 w-2.5 rounded-[1px] ${lvl}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Row 2: Main Title and Filter */}
          <div className="flex items-center justify-between">
            <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
              Insights
            </h1>
          </div>
        </header>

        <nav className="border-border/40 flex items-center gap-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative flex items-center gap-2.5 px-4 py-4 transition-all",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
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
                <div className="bg-primary absolute right-0 bottom-0 left-0 h-px shadow-[0_0_8px_var(--primary)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="from-background/80 pointer-events-none absolute -bottom-8 left-0 h-8 w-full bg-gradient-to-b to-transparent" />
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
