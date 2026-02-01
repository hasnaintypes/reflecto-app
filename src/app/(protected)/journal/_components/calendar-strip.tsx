"use client";

import React from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CalendarStrip() {
  const today = new Date();
  // Start from Monday
  const startOfState = startOfWeek(today, { weekStartsOn: 1 }); 
  
  // 14 days to fill the width nicely
  const days = Array.from({ length: 14 }).map((_, i) => addDays(startOfState, i));

  return (
    <div className="flex items-center justify-between py-2 overflow-x-auto overflow-y-hidden no-scrollbar">
      {days.map((day, i) => {
        const isToday = isSameDay(day, today);
        const dayName = format(day, "eee").toLowerCase();
        const dayNumber = format(day, "d");

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="flex flex-col items-center min-w-[50px] group cursor-pointer"
          >
            {/* Day Name - Lowercase & Wide tracking */}
            <span className={cn(
              "text-[10px] font-bold tracking-[0.2em] mb-3 transition-colors uppercase",
              isToday ? "text-[#FB923C]" : "text-zinc-600 group-hover:text-zinc-400"
            )}>
              {dayName}
            </span>

            {/* Day Number */}
            <div className="relative flex flex-col items-center">
              <span className={cn(
                "text-lg font-medium transition-all duration-300",
                isToday 
                  ? "text-white scale-110" 
                  : "text-zinc-500 group-hover:text-zinc-200"
              )}>
                {dayNumber}
              </span>

              {/* Minimalist Active Indicator */}
              {isToday && (
                <motion.div 
                  layoutId="activeDay"
                  className="absolute -bottom-4 w-1 h-1 rounded-full bg-[#FB923C] shadow-[0_0_8px_#FB923C]"
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}