"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  Moon,
  Cloud,
  Loader2,
} from "lucide-react";
import { JournalEditor } from "@/components/journal-editor";
import Link from "next/link";
import { format } from "date-fns";
import { api } from "@/trpc/react";
import { useEntryStore } from "@/stores/use-entry-store";
import type { DreamMetadata } from "@/server/types/metadata.types";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export default function DreamDetailPage() {
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
      metadata?: DreamMetadata;
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
  const metadata = (currentEntry.metadata as DreamMetadata) ?? {};

  const handleTitleChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.innerText;
    debouncedUpdate({ title: newTitle });
  };

  const handleMetadataChange = (field: keyof DreamMetadata, value: string) => {
    const newMetadata = { ...metadata, [field]: value };
    debouncedUpdate({ metadata: newMetadata });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="flex items-center justify-between pt-12 pb-16">
        <Link
          href="/dreams"
          className="text-muted-foreground/40 hover:text-foreground flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
        >
          <ChevronLeft size={14} />
          Back
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

      <div className="animate-in fade-in slide-in-from-bottom-4 custom-scrollbar flex-1 space-y-16 overflow-y-auto duration-1000">
        <h1
          className="text-foreground font-serif text-7xl leading-tight font-medium tracking-tight italic focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          onInput={handleTitleChange}
        >
          {currentEntry.title ?? "Untitled Dream"}
        </h1>

        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-muted-foreground/40 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase">
              <Cloud size={12} className="text-primary" />
              Atmosphere
            </label>
            <div
              className="text-foreground border-border/20 border-b pb-1 text-base font-medium italic focus:outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleMetadataChange("atmosphere", e.currentTarget.innerText)
              }
            >
              {metadata.atmosphere ?? "Hazy, nostalgic..."}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground/40 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase">
              <Moon size={12} className="text-[#A78BFA]" />
              Clarity
            </label>
            <div
              className="text-foreground border-border/20 border-b pb-1 text-base font-medium focus:outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleMetadataChange("clarity", e.currentTarget.innerText)
              }
            >
              {metadata.clarity ?? "Vivid"}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-border/10 flex items-center gap-4 border-t pt-8">
            <label className="text-muted-foreground/40 text-[9px] font-bold tracking-[0.2em] uppercase">
              Dream Journal Entry
            </label>
            <div className="bg-border/10 h-px flex-1" />
          </div>
          <div className="relative min-h-[500px]">
            <JournalEditor id={entryId} initialType="dream" />
          </div>
        </div>
      </div>
    </div>
  );
}
