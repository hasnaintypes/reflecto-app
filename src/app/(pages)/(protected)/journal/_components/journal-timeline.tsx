"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star, Paperclip } from "lucide-react";
import Image from "next/image";

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
  DREAM: "text-yellow-400",
  NOTE: "text-purple-400",
  WISDOM: "text-pink-400",
  IDEA: "text-orange-400",
  HIGHLIGHT: "text-red-400",
  JOURNAL: "text-zinc-500",
};

interface JournalTimelineProps {
  entries: EntryWithRelations[];
}

export function JournalTimeline({ entries }: JournalTimelineProps) {
  const router = useRouter();
  const preferences = usePreferencesStore((state) => state.preferences);
  const itemIndicators = preferences?.preferences?.itemIndicators !== false;

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 py-4">
      {entries.map((entry, i) => {
        const metadata = (entry.metadata ?? {}) as Record<string, unknown>;

        let category = "JOURNAL";
        if (entry.type !== "journal") {
          category = entry.type.toUpperCase();
        } else {
          category = (metadata.category as string | undefined) ?? "JOURNAL";
        }

        const categoryColor = categoryColors[category] ?? "text-zinc-500";
        const tags = (metadata.tags as string[] | undefined) ?? [];
        const dateObj = new Date(entry.createdAt);
        const timeStr = format(dateObj, "p");
        const dayStr = format(dateObj, "EEE, MMM do");

        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              if (entry.type === "journal") {
                router.push(`/write?id=${entry.id}`);
              } else {
                router.push(`/${entry.type}s`); // e.g. /dreams
              }
            }}
            className="group relative -mx-4 flex cursor-pointer gap-6 rounded-2xl px-4 py-8 transition-all duration-500 hover:bg-white/2"
          >
            {/* Timeline Connector */}
            <div className="relative mt-1 flex flex-col items-center">
              <div className="bg-primary/40 ring-primary/10 group-hover:bg-primary group-hover:ring-primary/20 h-2 w-2 rounded-full ring-4 transition-all duration-500 group-hover:scale-125" />
              <div className="bg-border/20 group-hover:bg-primary/20 absolute top-2 -bottom-8 w-px transition-colors duration-500" />
            </div>

            {/* Content 영역 */}
            <div className="min-w-0 flex-1 space-y-3">
              {/* Header: Time & Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-foreground/80 font-mono text-[10px] font-bold tracking-widest uppercase">
                    {timeStr}
                  </span>
                  <span className="bg-border/30 h-1 w-1 rounded-full" />
                  <span className="text-muted-foreground/40 font-mono text-[9px] font-medium tracking-wider uppercase">
                    {dayStr}
                  </span>
                  <span
                    className={cn(
                      "ml-2 text-[9px] font-bold tracking-[0.2em] uppercase opacity-60 transition-opacity duration-500 group-hover:opacity-100",
                      categoryColor,
                    )}
                  >
                    {category}
                  </span>
                </div>

                <div className="flex items-center gap-3 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                  {entry.isStarred && (
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  )}
                  {itemIndicators && entry.attachments.length > 0 && (
                    <Paperclip size={12} className="text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Entry Preview */}
              <div className="max-w-3xl">
                {(() => {
                  // Robust plain text extraction: strip tags, remove multiple spaces
                  const rawHtml = entry.content ?? "";
                  const plainText = rawHtml
                    .replace(/<[^>]*>/g, " ") // Replace tags with space
                    .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
                    .replace(/\s+/g, " ") // Collapse multiple spaces into one
                    .trim();

                  // We want to show the preview if there is ANY actual text OR if title exists
                  if (plainText.length === 0 && !entry.title) return null;

                  return (
                    <div className="space-y-1">
                      {entry.type !== "journal" && entry.title && (
                        <h3 className="text-foreground/90 group-hover:text-foreground font-serif text-lg font-medium tracking-tight">
                          {entry.title}
                        </h3>
                      )}
                      {plainText.length > 0 && (
                        <p className="text-muted-foreground/80 group-hover:text-foreground/90 line-clamp-1 font-serif text-[1.1rem] leading-relaxed tracking-tight transition-all duration-500">
                          {plainText}
                        </p>
                      )}
                    </div>
                  );
                })()}

                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                    {tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-muted-foreground/60 border-border/40 hover:border-primary/30 hover:text-primary rounded px-0 text-[8px] font-bold tracking-widest uppercase transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Attachments */}
              {entry.attachments.length > 0 && (
                <div className="relative w-full overflow-hidden pt-1">
                  <div className="no-scrollbar -mx-1 flex gap-4 overflow-x-auto py-2">
                    {entry.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="border-border/10 ring-border/5 group-hover:border-border/20 group-hover:ring-primary/10 relative h-32 w-64 shrink-0 overflow-hidden rounded-xl border object-cover shadow-sm ring-1 transition-all duration-700"
                      >
                        <Image
                          src={attachment.fileUrl}
                          alt="Journal attachment"
                          fill
                          sizes="256px"
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="to-background/20 absolute inset-0 bg-linear-to-t from-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
