"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const entries = [
  {
    id: "1",
    category: "THOUGHTS",
    categoryColor: "text-violet-400",
    content:
      "Spent a long moment realizing how often I confuse being busy with actually moving forward. The hours fill themselves easily, but intention doesn’t. Today felt slower, and strangely, more honest. Fewer tasks, more presence. It felt like choosing depth over noise, even if just for a while.",
    time: "11:40 AM, FRI",
  },
  {
    id: "2",
    category: "INVOLVED ME",
    categoryColor: "text-red-400",
    content:
      "Decided to sit with discomfort instead of escaping it. No music, no scrolling, no distractions. Just letting unfinished thoughts surface and pass on their own. It wasn’t peaceful, but it was real. There’s something grounding about not running from your own mind.",
    time: "01:10 PM, FRI",
  },
  {
    id: "3",
    category: "AROUND ME",
    categoryColor: "text-blue-400",
    content:
      "The evening felt unusually still. Cars moved slower, voices sounded softer, and even the air felt lighter. It reminded me that the world doesn’t demand urgency—most of it is something we manufacture internally and then mistake for reality.",
    time: "06:30 PM, FRI",
  },
  {
    id: "4",
    category: "MEMORIES",
    categoryColor: "text-emerald-400",
    content:
      "Remembered a version of myself that needed less validation and more silence. Back then, days weren’t optimized, documented, or shared—they were simply lived. That memory didn’t feel like nostalgia. It felt like a quiet reminder of something recoverable.",
    time: "09:00 PM, FRI",
  },
  {
    id: "5",
    category: "THOUGHTS",
    categoryColor: "text-violet-400",
    content:
      "Started to understand that self-discipline isn’t about restriction, but about respect. Respect for future energy, future focus, and future peace. The rules aren’t punishment—they’re boundaries built by someone who finally cares.",
    time: "11:55 PM, FRI",
  },
  {
    id: "6",
    category: "MEMORIES",
    categoryColor: "text-emerald-400",
    content: "Spent a week in the Mountains, disconnected from the world.",
    time: "07:00 AM, THU",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=200",
    ],
  },
];

export function JournalTimeline() {
  return (
    <div className="flex flex-col gap-6 py-4">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative -mx-4 rounded-xl px-4 py-4 transition-all duration-300 hover:bg-white/[0.02]"
        >
          {/* Timeline Vertical Thread - Visible on Hover for effect */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-zinc-800 via-zinc-900 to-transparent opacity-50 transition-all duration-500 group-hover:from-[#FB923C]/40 group-hover:opacity-100" />

          {/* Content Wrapper */}
          <div className="flex flex-col gap-4">
            {/* Meta Row */}
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "text-[9px] font-bold tracking-[0.3em] uppercase",
                  entry.categoryColor,
                )}
              >
                {entry.category}
              </span>

              <div className="h-px w-8 bg-zinc-900" />

              <div className="flex items-center gap-2 text-zinc-600">
                <Clock size={10} strokeWidth={2} />
                <span className="text-[10px] font-medium tracking-widest uppercase">
                  {entry.time}
                </span>
              </div>
            </div>

            {/* Content Text */}
            <p className="max-w-3xl font-serif text-[1.35rem] leading-relaxed tracking-tight text-zinc-300 transition-colors duration-300 group-hover:text-zinc-100">
              {entry.content}
            </p>

            {/* Image Gallery - Refined Aspect Ratios */}
            {entry.images && (
              <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
                {entry.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01, y: -4 }}
                    className="h-48 w-72 shrink-0 overflow-hidden rounded-lg border border-white/5 bg-zinc-900"
                  >
                    <Image
                      src={img}
                      alt="journal entry"
                      width={288}
                      height={192}
                      className="h-full w-full object-cover opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Interaction Footer (Optional/Subtle) */}
            <div className="mt-2 flex items-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <button className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase hover:text-[#FB923C] cursor-pointer">
                Edit
              </button>
              <button className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase hover:text-red-400 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
