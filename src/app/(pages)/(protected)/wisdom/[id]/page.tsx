"use client";

import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Star,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  Lightbulb,
  Quote as QuoteIcon,
  Asterisk,
  AlignLeft,
  GraduationCap,
  Calendar,
  User,
  Link as LinkIcon,
  MessageSquare,
  Loader2,
} from "lucide-react";
import JournalEditor from "../../write/_components/editor";
import Link from "next/link";
import { format } from "date-fns";
import { api } from "@/trpc/react";
import { useEntryStore } from "@/stores/use-entry-store";
import type { WisdomMetadata } from "@/server/types/metadata.types";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

type WisdomType = "thought" | "quote" | "fact" | "excerpt" | "lesson";

type WisdomConfig = { icon: React.ElementType; color: string; label: string };

const typeConfigs: Record<WisdomType, WisdomConfig> = {
  thought: { icon: Lightbulb, color: "text-amber-400", label: "Thought" },
  quote: { icon: QuoteIcon, color: "text-purple-400", label: "Quote" },
  fact: { icon: Asterisk, color: "text-sky-400", label: "Fact" },
  excerpt: { icon: AlignLeft, color: "text-orange-400", label: "Excerpt" },
  lesson: { icon: GraduationCap, color: "text-emerald-400", label: "Lesson" },
};

export default function WisdomDetailPage() {
  const { id } = useParams();
  const entryId = id as string;
  const searchParams = useSearchParams();
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
      metadata?: WisdomMetadata;
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

  const type =
    (currentEntry.metadata as WisdomMetadata | null)?.wisdom_type ??
    (searchParams.get("type") as WisdomType) ??
    "thought";
  const config = typeConfigs[type] ?? typeConfigs.thought;
  const dateStr = format(
    new Date(currentEntry.createdAt),
    "MMMM do, yyyy",
  ).toLowerCase();
  const metadata = (currentEntry.metadata as WisdomMetadata | null) ?? {};

  const handleTitleChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.innerText;
    debouncedUpdate({ title: newTitle });
  };

  const handleMetadataChange = (field: keyof WisdomMetadata, value: string) => {
    const newMetadata = { ...metadata, [field]: value };
    debouncedUpdate({ metadata: newMetadata });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      <div className="animate-in fade-in slide-in-from-top-4 bg-background/80 sticky top-0 z-30 -mx-6 px-6 backdrop-blur-md transition-all duration-300 duration-1000">
        <header className="mb-4 space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <Link
              href="/wisdom"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
            >
              <ChevronLeft size={14} />
              Collected Wisdom
            </Link>

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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border-border/40 bg-muted/30 text-muted-foreground flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                <config.icon size={10} className={config.color} />
                {config.label}
              </div>
              <span className="text-muted-foreground/30 text-[9px] font-bold tracking-[0.2em] uppercase">
                Ref. {entryId.slice(0, 8)}
              </span>
            </div>

            <div className="text-muted-foreground/40 text-[9px] font-medium tracking-wider uppercase">
              {dateStr}
            </div>
          </div>
        </header>

        {/* Gradient fade at bottom of sticky header */}
        <div className="from-background/80 pointer-events-none absolute -bottom-6 left-0 h-6 w-full bg-gradient-to-b to-transparent" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 pt-4 duration-1000">
        <div className="space-y-1">
          <h1
            className="text-foreground font-serif text-5xl leading-tight font-medium tracking-tight italic focus:outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={handleTitleChange}
          >
            {currentEntry.title ??
              (type === "thought"
                ? "A new thought..."
                : type === "quote"
                  ? '"A profound quote..." '
                  : type === "fact"
                    ? "An interesting fact..."
                    : type === "excerpt"
                      ? "An insightful excerpt..."
                      : "A valuable lesson...")}
          </h1>
        </div>

        {/* Dynamic Fields Section */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          {(type === "quote" || type === "excerpt") && (
            <div className="space-y-1">
              <label className="text-muted-foreground/40 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                <User size={12} />
                Author
              </label>
              <div
                className="text-foreground border-border/20 border-b pb-1 text-base font-medium focus:outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleMetadataChange("author", e.currentTarget.innerText)
                }
              >
                {metadata.author ?? "Unknown"}
              </div>
            </div>
          )}

          {(type === "fact" || type === "excerpt") && (
            <div className="space-y-1">
              <label className="text-muted-foreground/40 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                <LinkIcon size={12} />
                Source
              </label>
              <div
                className="text-foreground border-border/20 border-b pb-1 text-base font-medium focus:outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleMetadataChange("source", e.currentTarget.innerText)
                }
              >
                {metadata.source ?? "Unknown Source"}
              </div>
            </div>
          )}

          {type === "lesson" && (
            <div className="space-y-1 md:col-span-2">
              <label className="text-muted-foreground/40 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                <Calendar size={12} />
                Context
              </label>
              <div
                className="text-foreground border-border/20 border-b pb-1 text-base font-medium focus:outline-none"
                contentEditable
                suppressContentEditableWarning
                // Note: wisdomMetadataSchema currently only has author/source/wisdom_type.
                // We should probably add a source or use title for context if not present.
              >
                Describe the situation...
              </div>
            </div>
          )}
        </div>

        {/* Notes Area */}
        <div className="space-y-4">
          <div className="border-border/10 flex items-center gap-4 border-t pt-8">
            <label className="text-muted-foreground/40 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase">
              <MessageSquare size={12} />
              Notes & Reflection
            </label>
            <div className="bg-border/10 h-px flex-1" />
          </div>
          <div className="relative min-h-[400px]">
            <JournalEditor id={entryId} initialType="wisdom" />
          </div>
        </div>
      </div>
    </div>
  );
}
