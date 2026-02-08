import { format, eachDayOfInterval, subWeeks, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { type ComprehensiveEntry } from "@/types/entry.types";

interface HeatmapProps {
  entries: ComprehensiveEntry[];
}

export function Heatmap({ entries }: HeatmapProps) {
  const weeksToShow = 52;
  const endDate = new Date();
  const startDate = subWeeks(endDate, weeksToShow - 1);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Align to Monday

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 2) return 2;
    if (count <= 4) return 3;
    return 4;
  };

  const levels = [
    "bg-muted/40", // Level 0: Empty
    "bg-primary/20", // Level 1: Low
    "bg-primary/40", // Level 2: Medium
    "bg-primary/60", // Level 3: High
    "bg-primary", // Level 4: Peak
  ];

  // Group days into weeks
  const heatmapData: Date[][] = [];
  for (let i = 0; i < weeksToShow; i++) {
    const week = days.slice(i * 7, (i + 1) * 7);
    if (week.length > 0) heatmapData.push(week);
  }

  // Calculate stats
  const totalEntries = entries.length;

  // Calculate streak
  let currentStreak = 0;
  const checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);

  // If no entry today, start checking from yesterday
  const hasEntryToday = entries.some((e) =>
    isSameDay(new Date(e.createdAt), checkDate),
  );
  if (!hasEntryToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const hasEntry = entries.some((e) =>
      isSameDay(new Date(e.createdAt), checkDate),
    );
    if (hasEntry) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthLabels: { label: string; index: number }[] = [];
  heatmapData.forEach((week, i) => {
    if (week[0]) {
      const month = months[week[0].getMonth()] ?? "";
      if (
        monthLabels.length === 0 ||
        monthLabels[monthLabels.length - 1]?.label !== month
      ) {
        monthLabels.push({ label: month, index: i });
      }
    }
  });

  return (
    <div className="w-full space-y-4 py-2">
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex min-w-max flex-col gap-2">
          <div className="relative mb-2 ml-11 h-4 text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: `${m.index * 17}px` }}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col justify-between py-1 pr-4 text-[8px] font-black text-zinc-700 uppercase">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="flex gap-[5px]">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[5px]">
                  {week.map((day, dayIndex) => {
                    const count = entries.filter((e) =>
                      isSameDay(new Date(e.createdAt), day),
                    ).length;
                    const level = getLevel(count);
                    return (
                      <motion.div
                        key={dayIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: weekIndex * 0.005 }}
                        className={`h-[12px] w-[12px] rounded-[1.5px] ${levels[level]} hover:ring-primary/50 cursor-pointer transition-all hover:ring-1`}
                        title={`${format(day, "MMM dd, yyyy")}: ${count} entries`}
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
          <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Total Entries
          </p>
          <p className="text-foreground font-mono text-xl font-medium">
            {totalEntries.toLocaleString()}
          </p>
        </div>
        <div className="bg-border/40 h-8 w-px" />
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Current Streak
          </p>
          <p className="text-primary font-mono text-xl font-medium">
            {currentStreak} Days
          </p>
        </div>
      </div>
    </div>
  );
}
