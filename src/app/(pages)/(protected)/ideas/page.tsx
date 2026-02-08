"use client";

import { useRouter } from "next/navigation";
import { Plus, Lightbulb, FileText, Star, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { type IdeaMetadata } from "@/types/metadata.types";

export default function IdeasPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const { data, isLoading } = api.entry.list.useQuery({
    type: "idea",
    limit: 50,
    isStarred: isStarredOnly || undefined,
  });

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/ideas/${data.id}`);
    },
  });

  const handleNewIdea = () => {
    createMutation.mutate({
      type: "idea",
      title: "An emerging idea...",
      content: "",
      metadata: {
        status: "New",
      } satisfies IdeaMetadata,
    });
  };

  const ideas = data?.entries ?? [];
  const hasIdeas = ideas.length > 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Ideas
          </h1>
        </div>

        {/* Utility Icons */}
        <div className="text-muted-foreground/60 mb-2 flex items-center gap-6">
          <button
            onClick={handleNewIdea}
            disabled={createMutation.isPending}
            className="hover:text-foreground transition-colors disabled:opacity-50"
          >
            {createMutation.isPending ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Plus size={22} strokeWidth={1.5} />
            )}
          </button>
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
        </div>
      </header>

      {/* Content Area */}
      <div className="mt-16">
        {hasIdeas ? (
          <div className="space-y-4">
            {ideas.map((idea) => (
              <Link
                key={idea.id}
                href={`/ideas/${idea.id}`}
                className="group border-border/10 hover:border-primary/20 bg-muted/5 hover:bg-muted/10 flex items-center justify-between rounded-lg border p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="border-primary/20 bg-primary/5 text-primary flex h-10 w-10 items-center justify-center rounded-full border transition-transform group-hover:scale-110">
                    <Lightbulb size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-foreground group-hover:text-primary line-clamp-1 flex items-center gap-2 font-serif text-xl font-medium transition-colors">
                      {idea.title ?? "Untitled Idea"}
                      {idea.isStarred && (
                        <Star
                          size={12}
                          className="shrink-0 fill-yellow-400 text-yellow-400"
                        />
                      )}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground/40 text-[10px] font-bold tracking-widest uppercase">
                        {format(
                          new Date(idea.createdAt),
                          "MMM d",
                        ).toLowerCase()}
                      </span>
                      <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                        {(idea.metadata as IdeaMetadata)?.status ?? "New"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
                  <Plus size={18} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Simple Empty State - Matching the Ideas reference strictly */
          <div className="max-w-2xl space-y-6">
            <div className="text-muted-foreground space-y-4 text-lg leading-relaxed tracking-tight">
              <p>
                Save all your ideas in one place so that they don&apos;t get
                lost.{" "}
                <span className="text-primary decoration-primary/30 underline underline-offset-4">
                  Reflect
                </span>{" "}
                will bring them back up occasionally for contemplation.
              </p>
            </div>

            <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
              <span className="lowercase">More info in our</span>
              <a
                href="#"
                className="group text-muted-foreground decoration-border/60 hover:text-primary hover:decoration-primary/40 flex items-center gap-1 underline underline-offset-4 transition-colors"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>

            {/* Custom Styled Add Button from reference */}
            <div className="pt-6">
              <button
                onClick={handleNewIdea}
                disabled={createMutation.isPending}
                className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  <Loader2 size={16} className="text-primary animate-spin" />
                ) : (
                  <Lightbulb size={16} className="text-primary" />
                )}
                <span>
                  {createMutation.isPending ? "Adding..." : "Add idea"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
