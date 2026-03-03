"use client";

import React from "react";
import { api } from "@/trpc/react";
import { usePreferencesStore } from "@/stores/use-preferences-store";
import { format, subDays, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { Flame, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakBar() {
  const preferences = usePreferencesStore((state) => state.preferences);
  const showStreak = preferences?.preferences?.streak ?? false;

  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i));
  
  const { data: heatmap, isLoading: isHeatmapLoading } = api.insights.getHeatmap.useQuery(
    {
      from: last7Days[0],
      to: last7Days[6],
    },
    { enabled: showStreak }
  );

  const { data: streakInfo } = api.insights.getStreak.useQuery(
    undefined,
    { enabled: showStreak }
  );

  if (!showStreak) return null;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-1.5 min-w-[100px]">
        <div className={cn(
          "p-1.5 rounded-full",
          (streakInfo?.currentStreak ?? 0) > 0 ? "bg-orange-500/10 text-orange-500" : "bg-zinc-500/10 text-zinc-500/50"
        )}>
          <Flame size={14} className={cn((streakInfo?.currentStreak ?? 0) > 0 && "animate-pulse")} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-widest text-foreground uppercase leading-none">
            {streakInfo?.currentStreak ?? 0} DAY STREAK
          </span>
          <span className="text-[9px] font-medium tracking-wider text-muted-foreground/60 uppercase leading-none mt-1">
            Best: {streakInfo?.longestStreak ?? 0}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {last7Days.map((date, i) => {
          const hasActivity = heatmap?.some(log => isSameDay(new Date(log.date), date));
          const isToday = isSameDay(date, today);
          const dayLabel = format(date, "EEEEE"); // M, T, W...

          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className={cn(
                "text-[9px] font-bold tracking-widest uppercase",
                isToday ? "text-primary" : "text-muted-foreground/30"
              )}>
                {dayLabel}
              </span>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-500",
                  hasActivity 
                    ? "bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" 
                    : "bg-zinc-800"
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
