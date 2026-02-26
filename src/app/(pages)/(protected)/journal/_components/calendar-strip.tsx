"use client";

import React, { useState } from "react";
import { format, addDays, startOfWeek, isSameDay, isFuture } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type EntryWithRelations } from "@/server/types/entry.types";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CalendarStripProps {
  entries: EntryWithRelations[];
}

export function CalendarStrip({ entries }: CalendarStripProps) {
  const today = new Date();
  const router = useRouter();
  const startOfState = startOfWeek(today, { weekStartsOn: 1 });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const days = Array.from({ length: 14 }).map((_, i) =>
    addDays(startOfState, i),
  );

  const entryDates = entries.map((e) => new Date(e.createdAt));
  const hasEntry = (date: Date) => entryDates.some((d) => isSameDay(d, date));

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/write?id=${data.id}`);
    },
  });

  const handleDayClick = (day: Date) => {
    if (isFuture(day)) return;

    const existingEntry = entries.find((e) =>
      isSameDay(new Date(e.createdAt), day),
    );
    if (existingEntry) {
      router.push(`/write?id=${existingEntry.id}`);
    } else {
      setSelectedDay(day);
      setIsDialogOpen(true);
    }
  };

  const handleCreateEntry = () => {
    if (!selectedDay) return;

    createMutation.mutate({
      type: "journal",
      title: `${format(selectedDay, "do MMM")}: Daily Reflection`,
      content: "",
      createdAt: selectedDay,
      metadata: {
        category: "THOUGHTS",
        tags: ["daily"],
      },
    });
  };

  return (
    <>
      <div className="no-scrollbar flex items-center justify-between overflow-x-auto overflow-y-hidden py-2">
        {days.map((day, i) => {
          const isTodayDay = isSameDay(day, today);
          const isFutureDay = isFuture(day);
          const dayHasEntry = hasEntry(day);
          const dayName = format(day, "eee").toLowerCase();
          const dayNumber = format(day, "d");

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: isFutureDay ? 0.3 : 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => handleDayClick(day)}
              className={cn(
                "group flex min-w-[50px] flex-col items-center transition-all",
                isFutureDay
                  ? "cursor-not-allowed"
                  : "cursor-pointer active:scale-95",
              )}
            >
              <span
                className={cn(
                  "mb-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors",
                  isTodayDay
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
                    isTodayDay
                      ? "text-foreground scale-110 font-semibold"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {dayNumber}
                </span>

                {/* Indicator Dots */}
                <div className="absolute -bottom-4 flex gap-1">
                  {isTodayDay && (
                    <motion.div
                      layoutId="activeDay"
                      className="bg-primary h-1 w-1 rounded-full shadow-[0_0_8px_var(--primary)]"
                    />
                  )}
                  {dayHasEntry && !isTodayDay && (
                    <div className="bg-muted-foreground/30 h-1 w-1 rounded-full" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-border/40 bg-card rounded-2xl shadow-2xl sm:max-w-[425px]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="font-serif text-2xl font-medium tracking-tight italic">
              Create entry
            </DialogTitle>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You don&apos;t have an entry yet for{" "}
              <span className="text-foreground font-semibold">
                {selectedDay && format(selectedDay, "EEE, MMM do")}
              </span>
              . Do you want to create one?
            </p>
          </DialogHeader>
          <DialogFooter className="mt-8 flex gap-3 sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="hover:bg-muted/50 rounded-lg px-6"
            >
              No
            </Button>
            <Button
              onClick={handleCreateEntry}
              disabled={createMutation.isPending}
              className="bg-primary text-primary-foreground min-w-[80px] rounded-lg px-6 hover:opacity-90"
            >
              {createMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Yes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
