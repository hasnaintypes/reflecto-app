"use client";

import React from "react";
import { api } from "@/trpc/react";
import { usePreferencesStore } from "@/stores/use-preferences-store";
import { format, subDays, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakBar() {
  const preferences = usePreferencesStore((state) => state.preferences);
  const showStreak = preferences?.preferences?.streak ?? false;

  const { from, to, last7Days, today } = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i));
    return {
      from: days[0]!,
      to: new Date(), // End of today
      last7Days: days,
      today,
    };
  }, []);

  const { data: heatmap } = api.insights.getHeatmap.useQuery(
    { from, to },
    { enabled: showStreak, staleTime: 1000 * 60 * 5 }, // 5 minutes cache
  );

  const { data: streakInfo } = api.insights.getStreak.useQuery(undefined, {
    enabled: showStreak,
  });

  if (!showStreak) return null;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex min-w-[100px] items-center gap-1.5">
        <div
          className={cn(
            "rounded-full p-1.5",
            (streakInfo?.currentStreak ?? 0) > 0
              ? "bg-orange-500/10 text-orange-500"
              : "bg-zinc-500/10 text-zinc-500/50",
          )}
        >
          <Flame
            size={14}
            className={cn(
              (streakInfo?.currentStreak ?? 0) > 0 && "animate-pulse",
            )}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-foreground text-[11px] leading-none font-bold tracking-widest uppercase">
            {streakInfo?.currentStreak ?? 0} DAY STREAK
          </span>
          <span className="text-muted-foreground/60 mt-1 text-[9px] leading-none font-medium tracking-wider uppercase">
            Best: {streakInfo?.longestStreak ?? 0}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {last7Days.map((date, i) => {
          const hasActivity = heatmap?.some((log) =>
            isSameDay(new Date(log.date), date),
          );
          const isToday = isSameDay(date, today);
          const dayLabel = format(date, "EEEEE"); // M, T, W...

          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "text-[9px] font-bold tracking-widest uppercase",
                  isToday ? "text-primary" : "text-muted-foreground/30",
                )}
              >
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
                    : "bg-zinc-800",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
