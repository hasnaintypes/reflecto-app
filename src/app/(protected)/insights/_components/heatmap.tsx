"use client";

import React from "react";
import { motion } from "framer-motion";

export function Heatmap() {
  const weeks = 52;
  const days = 7;
  
  const levels = [
    "bg-zinc-900/40",    // Level 0: Empty
    "bg-indigo-900/20",  // Level 1: Low
    "bg-indigo-700/40",  // Level 2: Medium
    "bg-indigo-500/60",  // Level 3: High
    "bg-[#6366F1]",      // Level 4: Peak
  ];

  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

  return (
    <div className="w-full space-y-4 py-2">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex flex-col gap-2 min-w-max">
          <div className="flex text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase mb-2 ml-11">
            {months.map((month, i) => (
              <div key={i} className="w-[72px]">{month}</div>
            ))}
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col justify-between py-1 text-[8px] font-black text-zinc-700 uppercase pr-4">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            <div className="flex gap-[5px]">
              {Array.from({ length: weeks }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[5px]">
                  {Array.from({ length: days }).map((_, dayIndex) => {
                    const level = Math.floor(Math.random() * 5);
                    return (
                      <motion.div
                        key={dayIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (weekIndex) * 0.01 }}
                        className={`w-[12px] h-[12px] rounded-[1.5px] ${levels[level]} hover:ring-1 hover:ring-indigo-400/50 transition-all cursor-pointer`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 pt-2">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Entries</p>
          <p className="text-xl font-medium text-white font-mono">1,192</p>
        </div>
        <div className="h-8 w-px bg-zinc-900" />
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Bullets Logged</p>
          <p className="text-xl font-medium text-white font-mono">6,972</p>
        </div>
        <div className="h-8 w-px bg-zinc-900" />
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Current Streak</p>
          <p className="text-xl font-medium text-[#6366F1] font-mono">14 Days</p>
        </div>
      </div>
    </div>
  );
}