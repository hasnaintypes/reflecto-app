"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  Loader2,
  Sparkles,
} from "lucide-react";
import { JournalEditor } from "@/components/journal-editor";
import Link from "next/link";
import { format } from "date-fns";
import { api } from "@/trpc/react";
import { useEntryStore } from "@/stores/use-entry-store";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { type JournalMetadata } from "@/types/metadata.types";

export default function JournalDetailPage() {
  const { id } = useParams();
  const entryId = id as string;
  const { currentEntry, setCurrentEntry, updateEntry } = useEntryStore();

  const { data: entry, isLoading } = api.entry.getById.useQuery(
    { id: entryId },
    { enabled: !!entryId },
  );

  const updateMutation = api.entry.update.useMutation({
    onSuccess: (data) => {
      updateEntry(data.id, data);
    },
  });

  const toggleStar = () => {
    if (!currentEntry) return;
    const newStarred = !currentEntry.isStarred;
    updateEntry(currentEntry.id, { isStarred: newStarred });
    updateMutation.mutate({
      id: entryId,
      isStarred: newStarred,
    });
  };

  const debouncedUpdate = useDebounce(
    (updates: {
      title?: string;
      metadata?: JournalMetadata;
      isStarred?: boolean;
    }) => {
      updateMutation.mutate({
        id: entryId,
        ...updates,
      });
    },
    1000,
  );

  useEffect(() => {
    if (entry) {
      setCurrentEntry(entry);
    }
  }, [entry, setCurrentEntry]);

  if (isLoading || !currentEntry) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin opacity-20" />
      </div>
    );
  }

  const dateStr = format(
    new Date(currentEntry.createdAt),
    "MMMM do, yyyy",
  ).toLowerCase();

  const handleTitleChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.innerText;
    debouncedUpdate({ title: newTitle });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pb-24 duration-1000">
      <header className="flex items-center justify-between pt-12 pb-16">
        <Link
          href="/journal"
          className="text-muted-foreground/40 hover:text-foreground flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Timeline
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-muted-foreground/20 text-[9px] font-bold tracking-[0.2em] uppercase">
            {dateStr} — Ref. {entryId.slice(0, 8)}
          </div>
          <div className="text-muted-foreground/40 flex items-center gap-4">
            <Star
              size={18}
              className={cn(
                "cursor-pointer transition-colors",
                currentEntry.isStarred
                  ? "fill-yellow-400 text-yellow-400"
                  : "hover:text-primary",
              )}
              onClick={toggleStar}
            />
            <Share2
              size={18}
              className="hover:text-foreground cursor-pointer transition-colors"
            />
            <MoreHorizontal
              size={18}
              className="hover:text-foreground cursor-pointer transition-colors"
            />
          </div>
        </div>
      </header>

      <div className="space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="border-border/40 bg-muted/50 text-muted-foreground flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold tracking-wider">
              <Sparkles size={10} className="text-primary" />
              JOURNAL ENTRY
            </div>
          </div>
          <h1
            className="text-foreground font-serif text-7xl leading-tight font-medium tracking-tight italic focus:outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={handleTitleChange}
          >
            {currentEntry.title ??
              format(new Date(currentEntry.createdAt), "EEEE")}
          </h1>
        </div>

        <div className="relative min-h-[500px]">
          <JournalEditor id={entryId} initialType="journal" />
        </div>
      </div>
    </div>
  );
}
