"use client";

import React from "react";
import { motion } from "framer-motion";

export function Heatmap() {
  // Generate mock data: 52 weeks, 7 days
  const weeks = 52;
  const days = 7;
  
  // Levels for contribution colors
  const levels = [
    "bg-zinc-900/50",
    "bg-emerald-900/30",
    "bg-emerald-700/50",
    "bg-emerald-500/80",
    "bg-emerald-400",
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4">
      <div className="flex flex-col gap-1.5 min-w-max">
        {/* Month labels */}
        <div className="flex text-[10px] text-zinc-500 mb-1 ml-7">
          {["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((month, i) => (
            <div key={i} className="flex-1 min-w-[38px]">{month}</div>
          ))}
        </div>
        
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1.5 text-[9px] text-zinc-600 pr-2">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          
          <div className="flex gap-1">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: days }).map((_, dayIndex) => {
                  const level = Math.floor(Math.random() * 5);
                  return (
                    <motion.div
                      key={dayIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                      className={`w-[10px] h-[10px] rounded-[2px] ${levels[level]} hover:ring-1 hover:ring-white/20 transition-all cursor-pointer`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mt-4 text-[11px] text-zinc-500">
        <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-white/5">
          <span className="font-semibold text-zinc-300">1192</span> entries
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-white/5">
          <span className="font-semibold text-zinc-300">6972</span> bullets
        </div>
      </div>
    </div>
  );
}
