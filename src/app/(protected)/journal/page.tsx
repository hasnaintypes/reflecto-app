"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  PenLine,
  FileText,
  Plus,
} from "lucide-react";
import { CalendarStrip } from "./_components/calendar-strip";
import { JournalTimeline } from "./_components/journal-timeline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

export default function JournalPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Your data remains the same
  const entries = [
    {
      id: "1",
      category: "THOUGHTS",
      categoryColor: "text-violet-400",
      content:
        "Spent a long moment realizing how often I confuse being busy with actually moving forward...",
      time: "11:40 AM, FRI",
    },
    {
      id: "2",
      category: "INVOLVED ME",
      categoryColor: "text-red-400",
      content: "Decided to sit with discomfort instead of escaping it...",
      time: "01:10 PM, FRI",
    },
    {
      id: "6",
      category: "MEMORIES",
      categoryColor: "text-emerald-400",
      content: "Spent a week in the Mountains...",
      time: "07:00 AM, THU",
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=200",
      ],
    },
  ];

  const hasEntries = entries.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pb-24 duration-1000">
   
      <div className="sticky top-0 z-20 -mx-6 mb-8 bg-[#09090b]/80 px-6 backdrop-blur-md transition-all duration-300">
        <header className="flex flex-col justify-between gap-6 pt-6 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
              Timeline
            </p>
            <h1 className="font-serif text-6xl font-medium tracking-tight text-white italic">
              Journal
            </h1>
          </div>

          <div className="mb-2 flex items-center gap-6 text-zinc-500">
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative transition-colors hover:text-white">
                  <CalendarIcon size={20} />
                  <div className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-[#FB923C]" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto border-white/10 bg-zinc-950 p-0"
                align="end"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => setDate(d)}
                  initialFocus
                  className="border-none bg-zinc-950 text-white"
                />
              </PopoverContent>
            </Popover>
            <Link href="/write">
              <Plus
                size={22}
                className="cursor-pointer transition-colors hover:text-white"
              />
            </Link>
          </div>
        </header>

        <div className="border-b border-white/[0.03] py-4">
          <CalendarStrip />
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-0 h-8 w-full bg-gradient-to-b from-[#09090b]/80 to-transparent" />
      </div>

      <div className="mb-8 max-w-2xl space-y-4">
        <p className="text-sm leading-relaxed text-zinc-500">
          The journal is your stream of consciousness. A space where the
          trivial and the profound coexist, forming a narrative of your
          evolving self.
        </p>
        <p className="text-md font-serif text-zinc-400 italic">
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
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                Today&apos;s Narrative
              </span>
              <div className="h-px flex-1 bg-zinc-900" />
            </div>
            <JournalTimeline />
          </div>
        ) : (
          <div className="max-w-2xl space-y-8 py-4">
            <div className="space-y-6 text-lg leading-relaxed tracking-tight text-zinc-400">
              <p>
                This is your{" "}
                <span className="text-white italic">Daily Log</span>. Use this
                space to record events as they happen, or reflect on your day
                before it ends.
              </p>
              <p>
                Every entry you write is automatically indexed by date and time,
                making it easy to travel back through your memory lane.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500">
              <span className="lowercase">
                Not sure where to start? Check the
              </span>
              <a
                href="#"
                className="group flex items-center gap-1 text-zinc-400 underline decoration-zinc-800 underline-offset-4 transition-colors hover:text-[#FB923C] hover:decoration-[#FB923C]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">journaling guide.</span>
              </a>
            </div>

            <div className="pt-6">
              <Link href="/write">
                <button className="flex items-center gap-2 rounded bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-700 hover:text-white active:scale-95">
                  <PenLine size={16} className="text-[#FB923C]" />
                  <span>Write your first entry</span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-col items-center border-t border-zinc-900 pt-8">
        <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-700 uppercase">
          {hasEntries ? "That's all your memories for now" : "End of Timeline"}
        </p>
      </div>
    </div>
  );
}
