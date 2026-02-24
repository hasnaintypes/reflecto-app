"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Star, Paperclip } from "lucide-react";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { type EntryWithRelations } from "@/server/types/entry.types";
import { usePreferencesStore } from "@/stores/use-preferences-store";

const categoryColors: Record<string, string> = {
  THOUGHTS: "text-violet-400",
  "INVOLVED ME": "text-red-400",
  "AROUND ME": "text-blue-400",
  MEMORIES: "text-emerald-400",
  GRATITUDE: "text-amber-400",
  REFLECTIONS: "text-cyan-400",
  "TINY WINS": "text-pink-400",
  "DAILY LOG": "text-zinc-400",
  VENTING: "text-rose-400",
};

interface JournalTimelineProps {
  entries: EntryWithRelations[];
}

export function JournalTimeline({ entries }: JournalTimelineProps) {
  const router = useRouter();
  const preferences = usePreferencesStore((state) => state.preferences);
  const collapseLongBullets =
    preferences?.preferences?.collapseLongBullets === true;
  const itemIndicators = preferences?.preferences?.itemIndicators !== false;

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 py-4">
      {entries.map((entry, i) => {
        const metadata = (entry.metadata ?? {}) as Record<string, unknown>;
        const category = (metadata.category as string | undefined) ?? "OTHER";
        const categoryColor = categoryColors[category] ?? "text-zinc-400";
        const tags = (metadata.tags as string[] | undefined) ?? [];
        const timeStr = format(
          new Date(entry.createdAt),
          "hh:mm a, EEE",
        ).toUpperCase();

        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => router.push(`/write?id=${entry.id}`)}
            className="group hover:bg-muted/30 relative -mx-4 cursor-pointer rounded-xl px-4 py-4 transition-all duration-300"
          >
            {/* Timeline Vertical Thread - Visible on Hover for effect */}
            <div className="from-border/20 via-border/10 group-hover:from-primary/40 absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b to-transparent opacity-50 transition-all duration-500 group-hover:opacity-100" />

            {/* Content Wrapper */}
            <div className="flex flex-col gap-4">
              {/* Meta Row */}
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "text-[9px] font-bold tracking-[0.3em] uppercase",
                    categoryColor,
                  )}
                >
                  {category}
                </span>

                <div className="bg-border/20 h-px w-8" />

                <div className="flex items-center gap-2 text-zinc-600">
                  <Clock size={10} strokeWidth={2} />
                  <span className="text-[10px] font-medium tracking-widest uppercase">
                    {timeStr}
                  </span>
                  {entry.isStarred && (
                    <Star
                      size={10}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  )}
                  {itemIndicators && entry.attachments.length > 0 && (
                    <Paperclip size={10} className="text-zinc-600" />
                  )}
                </div>

                {tags.length > 0 && (
                  <div className="ml-auto flex items-center gap-2">
                    {tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-muted border-border/40 text-muted-foreground rounded-full border px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Text */}
              <div
                className={cn(
                  "text-muted-foreground group-hover:text-foreground max-w-3xl font-serif text-[1.35rem] leading-relaxed tracking-tight transition-colors duration-300",
                  collapseLongBullets && "line-clamp-3",
                )}
                dangerouslySetInnerHTML={{ __html: entry.content ?? "" }}
              />

              {/* Interaction Footer (Optional/Subtle) */}
              <div className="mt-2 flex items-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <button className="cursor-pointer text-[10px] font-bold tracking-widest text-zinc-600 uppercase hover:text-[#FB923C]">
                  Edit
                </button>
                <button
                  className="cursor-pointer text-[10px] font-bold tracking-widest text-zinc-600 uppercase hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add delete logic if needed
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
