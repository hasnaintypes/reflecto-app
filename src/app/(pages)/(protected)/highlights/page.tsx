"use client";

import { useRouter } from "next/navigation";
import { Plus, Sparkles, FileText, Star, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { type HighlightMetadata } from "@/types/metadata.types";

export default function HighlightsPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const { data, isLoading } = api.entry.list.useQuery({
    type: "highlight",
    limit: 50,
    isStarred: isStarredOnly || undefined,
  });

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/highlights/${data.id}`);
    },
  });

  const handleCapture = () => {
    createMutation.mutate({
      type: "highlight",
      title: "A significant moment...",
      content: "",
      metadata: {} satisfies HighlightMetadata,
    });
  };

  const highlights = data?.entries ?? [];
  const hasHighlights = highlights.length > 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#F87171] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Highlights
          </h1>
        </div>

        <div className="mb-2 flex items-center gap-6">
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
            onClick={handleCapture}
            disabled={createMutation.isPending}
            className="group flex items-center gap-2 text-[#F87171] transition-colors hover:text-[#F87171]/80 disabled:opacity-50"
          >
            <div className="group-hover:text-background rounded-full border border-[#F87171]/30 p-2 transition-all group-hover:bg-[#F87171]">
              {createMutation.isPending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Plus size={20} strokeWidth={2.5} />
              )}
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">
              {createMutation.isPending ? "Capturing..." : "Capture"}
            </span>
          </button>
        </div>
      </header>

      <div className="mt-16">
        {hasHighlights ? (
          <div className="space-y-24">
            {highlights.map((highlight) => (
              <Link
                key={highlight.id}
                href={`/highlights/${highlight.id}`}
                className="group block space-y-6 text-center"
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-border/20 h-px w-12 transition-all duration-500 group-hover:w-24 group-hover:bg-[#F87171]/40" />
                  <Sparkles
                    size={16}
                    className="text-[#F87171]/40 transition-colors group-hover:text-[#F87171]"
                  />
                  <div className="bg-border/20 h-px w-12 transition-all duration-500 group-hover:w-24 group-hover:bg-[#F87171]/40" />
                </div>

                <h2 className="text-foreground mx-auto max-w-3xl font-serif text-4xl leading-snug tracking-tight transition-colors duration-500 group-hover:text-[#F87171]">
                  {highlight.title ??
                    (highlight.content
                      ? highlight.content.replace(/<[^>]*>/g, "").slice(0, 100)
                      : "Untitled Highlight")}
                </h2>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-muted-foreground/30 block text-[10px] font-bold tracking-[0.3em] uppercase">
                    {format(
                      new Date(highlight.createdAt),
                      "MMM d, yyyy",
                    ).toLowerCase()}
                  </span>
                  {highlight.isStarred && (
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  )}
                </div>

                <div className="mx-auto h-1 w-1 rounded-full bg-[#F87171]/20 transition-all duration-500 group-hover:scale-[4] group-hover:bg-[#F87171]/40" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-muted-foreground flex items-center gap-1.5 text-lg tracking-tight">
              <span className="lowercase">Your highlights</span>
              <Sparkles
                size={16}
                className="fill-[#F87171]/10 text-[#F87171]"
              />
              <span className="lowercase">
                will show up here once you start adding them to your entries...
              </span>
            </div>

            <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
              <span className="lowercase">More info in our</span>
              <a
                href="#"
                className="group text-muted-foreground decoration-border/60 flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#F87171] hover:decoration-[#F87171]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
