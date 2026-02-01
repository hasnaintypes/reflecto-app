"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Moon, 
  Heart, 
  Hash, 
  AtSign, 
  Gem, 
  Maximize2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Heatmap } from "./_components/heatmap";
import { StatsGrid } from "./_components/stats-grid";
import { InsightCharts } from "./_components/insight-charts";

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl relative pb-24">
      {/* Sticky Header Wrapper - SOLID Background */}
      <div className="sticky top-0 z-30 bg-[#080808] -mx-8 px-8 py-6 mb-4 border-b border-white/[0.03]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-bold text-white tracking-tight">Insights</h1>
          <div className="flex items-center gap-4 text-[11px] font-medium text-zinc-500 bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-white/5">
            <span>All time</span>
            <Maximize2 size={12} className="rotate-90" />
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 transition-all relative",
                activeTab === tab.id 
                  ? "text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <tab.icon size={14} className={cn(activeTab === tab.id ? tab.color : "opacity-50")} />
              <span className="text-[13px] font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>



      {/* Content Area */}
      <div className="space-y-8">
        <Heatmap />
        <StatsGrid />
        <InsightCharts />
      </div>
    </div>
  );
}
