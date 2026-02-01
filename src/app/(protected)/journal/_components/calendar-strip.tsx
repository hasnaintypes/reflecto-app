"use client";

import React from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CalendarStrip() {
  const today = new Date();
  const startOfState = startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday
  
  const days = Array.from({ length: 12 }).map((_, i) => addDays(startOfState, i));

  return (
    <div className="flex items-center gap-3 py-6">
      {days.map((day, i) => {
        const isToday = isSameDay(day, today);
        const dayName = format(day, "EEE").toUpperCase();
        const dayNumber = format(day, "dd");

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-all cursor-pointer",
              isToday 
                ? "bg-white/5 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                : "bg-zinc-900/30 border-white/5 hover:bg-zinc-800/50"
            )}
          >
            <span className={cn(
              "text-[10px] font-bold tracking-wider mb-1",
              isToday ? "text-red-400" : "text-zinc-500"
            )}>
              {dayName}
            </span>
            <span className={cn(
              "text-xl font-bold",
              isToday ? "text-white" : "text-zinc-300"
            )}>
              {dayNumber}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
