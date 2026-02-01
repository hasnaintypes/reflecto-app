"use client";

import React from "react";
import { Search, Calendar as CalendarIcon, PenLine } from "lucide-react";
import { CalendarStrip } from "./_components/calendar-strip";
import { JournalTimeline } from "./_components/journal-timeline";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { motion } from "framer-motion";


export default function JournalPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl relative pb-24">
      {/* Sticky Header Wrapper - SOLID Background */}
      <div className="sticky top-0 z-30 bg-[#080808] -mx-8 px-8 py-6 mb-4 border-b border-white/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">Journal</h1>
          
          <div className="flex items-center gap-6">
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-zinc-500 hover:text-white transition-colors relative">
                  <CalendarIcon size={24} strokeWidth={2.5} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-white/10 bg-zinc-950" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => setDate(d)}
                  initialFocus
                  className="bg-zinc-950 border-none"
                />
              </PopoverContent>
            </Popover>
            
            <Link href="/write">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
              >
                <PenLine size={16} />
                Write
              </motion.button>
            </Link>
          </div>
        </div>

        <CalendarStrip />
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        <JournalTimeline />
      </div>

      {/* End of Journal Message */}
      <div className="mt-5 border-white/[0.03] flex flex-col items-center text-center">
        <p className="text-zinc-700 text-sm font-medium tracking-tight">
          That's all your memories for now.
        </p>
      </div>
    </div>
  );
}
