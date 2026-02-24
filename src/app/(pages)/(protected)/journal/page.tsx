"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  PenLine,
  FileText,
  Plus,
  Loader2,
  Star,
} from "lucide-react";
import { CalendarStrip } from "./_components/calendar-strip";
import { JournalTimeline } from "./_components/journal-timeline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { api } from "@/trpc/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { type JournalMetadata } from "@/types/metadata.types";
import { usePreferencesStore } from "@/stores/use-preferences-store";

export default function JournalPage() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isStarredOnly, setIsStarredOnly] = React.useState(false);
  const preferences = usePreferencesStore((state) => state.preferences);
  const dayEndsAt = parseInt(preferences?.preferences?.dayEndsAt ?? "0");

  const { data: entryData } = api.entry.list.useQuery({
    type: "journal",
    limit: 50,
    isStarred: isStarredOnly || undefined,
  });

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/write?id=${data.id}`);
    },
  });

  const entries = entryData?.entries ?? [];

  const handleNewEntry = () => {
    const now = new Date();
    const adjustedToday = new Date(now);

    // If current hour is before dayEndsAt (e.g. 2 AM < 3 AM), it's still "today" but relative to yesterday
    if (now.getHours() < dayEndsAt) {
      adjustedToday.setDate(now.getDate() - 1);
    }
    adjustedToday.setHours(0, 0, 0, 0);

    // Check if we already have a journal entry for this adjusted day
    const existingToday = entries.find((e) => {
      const entryDate = new Date(e.createdAt);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === adjustedToday.getTime();
    });

    if (existingToday) {
      router.push(`/write?id=${existingToday.id}`);
      return;
    }

    const dateStr = format(adjustedToday, "do MMM");

    createMutation.mutate({
      type: "journal",
      title: `${dateStr}: Daily Reflection`,
      content: "",
      metadata: {
        category: "THOUGHTS",
        tags: ["daily"],
      } satisfies JournalMetadata,
    });
  };

  const hasEntries = entries.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pb-24 duration-1000">
      <div className="bg-background/80 sticky top-0 z-20 -mx-6 mb-8 px-6 backdrop-blur-md transition-all duration-300">
        <header className="flex flex-col justify-between gap-6 pt-6 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-muted-foreground/60 text-[10px] font-bold tracking-[0.3em] uppercase">
              Timeline
            </p>
            <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
              Journal
            </h1>
          </div>

          <div className="text-muted-foreground/60 mb-2 flex items-center gap-6">
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:text-foreground relative transition-colors outline-none">
                  <CalendarIcon size={20} />
                  <div className="bg-primary absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="border-border bg-popover w-auto p-0"
                align="end"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => setDate(d)}
                  initialFocus
                  className="bg-popover text-foreground border-none"
                />
              </PopoverContent>
            </Popover>
            <Star
              size={20}
              className={cn(
                "cursor-pointer transition-all duration-300",
                isStarredOnly
                  ? "scale-110 fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/60 hover:text-foreground",
              )}
              onClick={() => setIsStarredOnly(!isStarredOnly)}
            />
            <button
              onClick={handleNewEntry}
              disabled={createMutation.isPending}
              className="hover:text-foreground cursor-pointer transition-colors disabled:opacity-50"
            >
              {createMutation.isPending ? (
                <Loader2 size={22} className="animate-spin" />
              ) : (
                <Plus size={22} />
              )}
            </button>
          </div>
        </header>

        <div className="border-border/40 border-b py-4">
          <CalendarStrip />
        </div>

        <div className="from-background/80 pointer-events-none absolute -bottom-8 left-0 h-8 w-full bg-gradient-to-b to-transparent" />
      </div>

      <div className="mb-8 max-w-2xl space-y-4">
        <p className="text-muted-foreground/80 text-sm leading-relaxed">
          The journal is your stream of consciousness. A space where the trivial
          and the profound coexist, forming a narrative of your evolving self.
        </p>
        <p className="text-md text-muted-foreground/60 font-serif italic">
          &quot;We do not learn from experience... we learn from reflecting on
          experience.&quot;
        </p>
      </div>

      {/* Content Area */}
      <div className="relative mt-8">
        {hasEntries ? (
          <div className="space-y-10">
            {/* Added a small descriptive label for the timeline */}
            <div className="flex items-center gap-4 opacity-50">
              <span className="text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                Today&apos;s Narrative
              </span>
              <div className="bg-border/40 h-px flex-1" />
            </div>
            <JournalTimeline entries={entries} />
          </div>
        ) : (
          <div className="max-w-2xl space-y-8 py-4">
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed tracking-tight">
              <p>
                This is your{" "}
                <span className="text-foreground italic">Daily Log</span>. Use
                this space to record events as they happen, or reflect on your
                day before it ends.
              </p>
              <p>
                Every entry you write is automatically indexed by date and time,
                making it easy to travel back through your memory lane.
              </p>
            </div>

            <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
              <span className="lowercase">
                Not sure where to start? Check the
              </span>
              <a
                href="#"
                className="group text-muted-foreground decoration-border/60 hover:text-primary hover:decoration-primary/40 flex items-center gap-1 underline underline-offset-4 transition-colors"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">journaling guide.</span>
              </a>
            </div>

            <div className="pt-6">
              <button
                onClick={handleNewEntry}
                disabled={createMutation.isPending}
                className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  <Loader2 size={16} className="text-primary animate-spin" />
                ) : (
                  <PenLine size={16} className="text-primary" />
                )}
                <span>
                  {createMutation.isPending
                    ? "Starting..."
                    : "Write your first entry"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="border-border mt-2 flex flex-col items-center border-t pt-8">
        <p className="text-muted-foreground/40 text-[10px] font-bold tracking-[0.2em] uppercase">
          {hasEntries ? "That's all your memories for now" : "End of Timeline"}
        </p>
      </div>
    </div>
  );
}
