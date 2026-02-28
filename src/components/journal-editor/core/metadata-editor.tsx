"use client";

import React from "react";
import { Star, ChevronDown } from "lucide-react";
import { useEntryStore } from "@/stores/use-entry-store";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EntryMetadata } from "@/types/metadata.types";

const CATEGORIES = [
  "JOURNAL",
  "THOUGHTS",
  "INVOLVED ME",
  "AROUND ME",
  "MEMORIES",
  "GRATITUDE",
  "REFLECTIONS",
  "TINY WINS",
  "DAILY LOG",
  "VENTING",
];

export function MetadataEditor() {
  const { currentEntry, updateEntry } = useEntryStore();
  const updateMutation = api.entry.update.useMutation();

  // Optimistic local state for immediate feedback
  const [localMood, setLocalMood] = React.useState<number | null>(null);
  const [localCategory, setLocalCategory] = React.useState<string | null>(null);

  // Reset local state when entry changes
  React.useEffect(() => {
    setLocalMood(null);
    setLocalCategory(null);
  }, [currentEntry?.id]);

  if (!currentEntry) return null;

  const metadata = (currentEntry.metadata as Record<string, any>) || {};
  const currentMood = localMood ?? (metadata.mood as number) ?? 0;
  const currentCategory =
    localCategory ?? (metadata.category as string) ?? "JOURNAL";
  const isJournal = currentEntry.type === "journal";

  const handleMoodChange = (mood: number) => {
    setLocalMood(mood);
    const updatedMetadata = { ...metadata, mood };
    updateEntry(currentEntry.id, { metadata: updatedMetadata });

    if (currentEntry.id) {
      updateMutation.mutate({
        id: currentEntry.id,
        metadata: updatedMetadata,
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    setLocalCategory(category);
    const updatedMetadata = { ...metadata, category };
    updateEntry(currentEntry.id, { metadata: updatedMetadata });

    if (currentEntry.id) {
      updateMutation.mutate({
        id: currentEntry.id,
        metadata: updatedMetadata,
      });
    }
  };

  return (
    <div className="mb-6 flex items-center gap-6 border-y border-border/10 py-3">
      {/* Mood Selector */}
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
          Mood
        </span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleMoodChange(star)}
              className="group relative p-1 transition-all hover:scale-110 active:scale-95"
            >
              <Star
                size={14}
                className={cn(
                  "transition-all duration-300",
                  star <= currentMood
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/20 group-hover:text-primary/40"
                )}
              />
              {star <= currentMood && (
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 p-1 opacity-20 blur-sm duration-1000" />
              )}
            </button>
          ))}
        </div>
      </div>

      {isJournal && (
        <>
          <div className="h-4 w-[1px] bg-border/20" />

          {/* Category Selector */}
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
              Category
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg border border-border/20 bg-muted/30 px-3 py-1 text-xs font-medium transition-all hover:bg-muted/50 active:scale-95">
                  <span className="text-foreground/80">{currentCategory}</span>
                  <ChevronDown size={12} className="text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-40 border-border/40 bg-card/95 backdrop-blur-xl"
              >
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={cn(
                      "cursor-pointer text-xs transition-colors",
                      currentCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
}
