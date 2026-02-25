"use client";

import React from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CalendarStrip() {
  const today = new Date();
  const startOfState = startOfWeek(today, { weekStartsOn: 1 });

  const days = Array.from({ length: 14 }).map((_, i) =>
    addDays(startOfState, i),
  );

  return (
    <div className="no-scrollbar flex items-center justify-between overflow-x-auto overflow-y-hidden py-2">
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
            className="group flex min-w-[50px] cursor-pointer flex-col items-center"
          >
            <span
              className={cn(
                "mb-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors",
                isToday
                  ? "text-primary"
                  : "text-muted-foreground/60 group-hover:text-muted-foreground",
              )}
            >
              {dayName}
            </span>
            <div className="relative flex flex-col items-center">
              <span
                className={cn(
                  "text-lg font-medium transition-all duration-300",
                  isToday
                    ? "text-foreground scale-110 font-semibold"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {dayNumber}
              </span>
              {isToday && (
                <motion.div
                  layoutId="activeDay"
                  className="bg-primary absolute -bottom-4 h-1 w-1 rounded-full shadow-[0_0_8px_var(--primary)]"
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
