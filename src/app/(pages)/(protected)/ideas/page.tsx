"use client";

import { useRouter } from "next/navigation";
import { Plus, Lightbulb, FileText, Star, Loader2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DeleteAlertDialog } from "@/components/shared/delete-alert-dialog";

import { type IdeaMetadata } from "@/types/metadata.types";

export default function IdeasPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const [deletingIdea, setDeletingIdea] = useState<{
    id: string;
    title: string | null;
  } | null>(null);
  const utils = api.useUtils();
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

  const deleteMutation = api.entry.delete.useMutation({
    onSuccess: () => {
      void utils.entry.list.invalidate();
      setDeletingIdea(null);
      toast.success("Idea deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete idea");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

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
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[#10B981] text-[10px] font-bold tracking-[0.3em] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Ideas
          </h1>
        </div>

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

      <div className="mt-16">
        {hasIdeas ? (
          <div className="flex flex-col">
            {ideas.map((idea) => {
              // Strip HTML tags and create a clean preview string
              const previewText = idea.content
                ? idea.content.replace(/<[^>]*>/g, "").slice(0, 160)
                : "Capturing the spark...";

              return (
                <Link
                  key={idea.id}
                  href={`/ideas/${idea.id}`}
                  className={cn(
                    "group border-border/5 hover:bg-muted/5 relative flex flex-col gap-6 border-b py-12 transition-all duration-500 first:pt-0 last:border-0 md:flex-row md:items-start md:gap-16",
                  )}
                >
                  {/* Left Side: Minimalist Date Column */}
                  <div className="flex shrink-0 flex-row items-center gap-4 md:w-32 md:flex-col md:items-start md:gap-1">
                    <span className="text-muted-foreground/40 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                      {format(new Date(idea.createdAt), "yyyy")}
                    </span>
                    <span className="text-foreground/60 font-mono text-sm font-bold tracking-tighter uppercase md:text-lg">
                      {format(new Date(idea.createdAt), "MMM dd")}
                    </span>
                    {/* Mobile-only divider line */}
                    <div className="bg-border/10 h-px flex-1 md:hidden" />
                  </div>

                  {/* Center: Content & Preview */}
                  <div className="relative z-10 flex-1 space-y-4 transition-transform duration-500 group-hover:translate-x-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-foreground group-hover:text-[#10B981] font-serif text-3xl font-light tracking-tight transition-colors duration-500 md:text-4xl">
                        {idea.title ?? "Untitled Idea"}
                      </h3>
                      {idea.isStarred && (
                        <Star
                          size={18}
                          className="fill-yellow-400/20 text-yellow-400 transition-all duration-500 group-hover:fill-yellow-400"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="bg-[#10B981]/10 text-[#10B981] rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                        {(idea.metadata as IdeaMetadata)?.status ?? "New"}
                      </span>
                    </div>

                    {/* Text Preview - Limits to 2 lines */}
                    <p className="text-muted-foreground/60 line-clamp-2 max-w-2xl font-sans text-sm leading-relaxed md:text-base">
                      {previewText}
                      {previewText.length >= 160 && "..."}
                    </p>

                    <div className="flex items-center gap-6 pt-2">
                      <span className="text-muted-foreground/30 text-[10px] font-medium tracking-widest uppercase italic">
                        Idea Profile — Creative Spark
                      </span>

                      <button
                        className="text-muted-foreground/20 flex items-center gap-2 p-1 transition-colors hover:text-red-400/80"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeletingIdea({ id: idea.id, title: idea.title });
                        }}
                      >
                        <Trash2 size={14} />
                        <span className="text-[9px] tracking-widest uppercase opacity-0 transition-opacity group-hover:opacity-100">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Large Decorative Ghost Icon */}
                  <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 overflow-hidden opacity-[0.03] transition-all duration-1000 group-hover:scale-115 group-hover:opacity-[0.12] md:-right-8">
                    <Lightbulb
                      size={180}
                      strokeWidth={0.3}
                      className="fill-[#10B981] rotate-12 transition-all duration-1000 group-hover:rotate-0"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="max-w-2xl space-y-6">
            <div className="text-muted-foreground space-y-4 text-lg leading-relaxed tracking-tight">
              <p>
                Save all your ideas in one place so that they don&apos;t get
                lost.{" "}
                <span className="text-[#10B981] decoration-[#10B981]/30 underline underline-offset-4">
                  Reflect
                </span>{" "}
                will bring them back up occasionally for contemplation.
              </p>
            </div>

            <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
              <span className="lowercase">More info in our</span>
              <a
                href="#"
                className="group text-muted-foreground decoration-border/60 hover:text-[#10B981] hover:decoration-[#10B981]/40 flex items-center gap-1 underline underline-offset-4 transition-colors"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>

            <div className="pt-6">
              <button
                onClick={handleNewIdea}
                disabled={createMutation.isPending}
                className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  <Loader2 size={16} className="text-[#10B981] animate-spin" />
                ) : (
                  <Lightbulb size={16} className="text-[#10B981]" />
                )}
                <span>
                  {createMutation.isPending ? "Adding..." : "Add idea"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      <DeleteAlertDialog
        open={!!deletingIdea}
        onOpenChange={(open) => !open && setDeletingIdea(null)}
        onConfirm={() => deletingIdea?.id && handleDelete(deletingIdea.id)}
        title="Delete idea?"
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
