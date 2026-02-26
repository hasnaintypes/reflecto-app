"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { format, isFuture, isSameDay } from "date-fns";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

interface JournalCalendarProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function JournalCalendar({
  selectedDate,
  onSelect,
}: JournalCalendarProps) {
  const router = useRouter();

  // Fetch all journal entries to highlight dates
  const { data: entryData } = api.entry.list.useQuery({
    type: "journal",
    limit: 100, // Fetch enough to cover recent history
  });

  const entries = entryData?.entries ?? [];
  const entryDates = entries.map((e) => new Date(e.createdAt));

  const hasEntry = (date: Date) => entryDates.some((d) => isSameDay(d, date));

  const getEntryForDate = (date: Date) =>
    entries.find((e) => isSameDay(new Date(e.createdAt), date));

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/write?id=${data.id}`);
    },
  });

  const handleCreateForDate = (date: Date) => {
    if (isFuture(date)) return;

    createMutation.mutate({
      type: "journal",
      title: `${format(date, "do MMM")}: Daily Reflection`,
      content: "",
      createdAt: date,
      metadata: {
        category: "THOUGHTS",
        tags: ["daily"],
      },
    });
  };

  const selectedEntry = selectedDate ? getEntryForDate(selectedDate) : null;
  const isPastOrToday = selectedDate && !isFuture(selectedDate);
  const showCreateButton = selectedDate && !selectedEntry && isPastOrToday;

  return (
    <div className="bg-card border-border min-w-[320px] rounded-xl border p-3 shadow-2xl">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        disabled={isFuture}
        modifiers={{
          hasEntry: (date: Date) => hasEntry(date),
        }}
        classNames={{
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 transition-all rounded-full relative",
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "text-primary font-bold",
        }}
        components={{
          DayButton: ({ day, className, modifiers, ...props }) => (
            <CalendarDayButton
              day={day}
              className={cn(className, "relative")}
              modifiers={modifiers}
              {...props}
            >
              {day.date.getDate()}
              {hasEntry(day.date) && (
                <span className="bg-primary absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" />
              )}
            </CalendarDayButton>
          ),
        }}
      />

      <div className="border-border/50 mt-4 border-t pt-4 text-center">
        {!selectedDate ? (
          <p className="text-muted-foreground/60 px-2 text-[11px] leading-relaxed">
            Select an{" "}
            <span className="text-foreground font-medium">existing</span> entry
            to open it, or an empty date to create a new entry.{" "}
            <span className="italic">
              Grayed-out dates lie in the future and cannot be selected.
            </span>
          </p>
        ) : showCreateButton ? (
          <button
            onClick={() => handleCreateForDate(selectedDate)}
            disabled={createMutation.isPending}
            className="bg-primary/10 text-primary hover:bg-primary/20 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {createMutation.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            <span>Create entry</span>
          </button>
        ) : selectedEntry ? (
          <button
            onClick={() => router.push(`/write?id=${selectedEntry.id}`)}
            className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all active:scale-[0.98]"
          >
            <span>Open Entry</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
