"use client";

import { useRouter } from "next/navigation";
import { Plus, Moon, FileText, Star, Loader2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type DreamMetadata } from "@/types/metadata.types";
import { toast } from "sonner";

export default function DreamsPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const [deletingDream, setDeletingDream] = useState<any>(null);
  const { data, isLoading } = api.entry.list.useQuery({
    type: "dream",
    limit: 50,
    isStarred: isStarredOnly || undefined,
  });

  const utils = api.useUtils();
  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/dreams/${data.id}`);
    },
  });

  const deleteMutation = api.entry.delete.useMutation({
    onSuccess: () => {
      utils.entry.list.invalidate();
      setDeletingDream(null);
      toast.success("Dream deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete dream");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const handleRecord = () => {
    createMutation.mutate({
      type: "dream",
      title: "A new dream...",
      content: "",
      metadata: {} satisfies DreamMetadata,
    });
  };

  const dreams = data?.entries ?? [];
  const hasDreams = dreams.length > 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Minimalist Header */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Dreams
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
            onClick={handleRecord}
            disabled={createMutation.isPending}
            className="group text-primary hover:text-primary/80 flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <div className="border-primary/30 group-hover:bg-primary group-hover:text-background rounded-full border p-2 transition-all">
              {createMutation.isPending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Plus size={20} strokeWidth={2.5} />
              )}
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">
              {createMutation.isPending ? "Recording..." : "Record"}
            </span>
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="mt-16">
        {hasDreams ? (
          <div className="flex flex-col">
            {dreams.map((dream, i) => {
              // Strip HTML tags and create a clean preview string
              const previewText = dream.content
                ? dream.content.replace(/<[^>]*>/g, "").slice(0, 160)
                : "No content recorded...";

              return (
                <Link
                  key={dream.id}
                  href={`/dreams/${dream.id}`}
                  className={cn(
                    "group border-border/5 hover:bg-muted/5 relative flex flex-col gap-6 border-b py-12 transition-all duration-500 first:pt-0 last:border-0 md:flex-row md:items-start md:gap-16",
                  )}
                >
                  {/* Left Side: Minimalist Date Column */}
                  <div className="flex shrink-0 flex-row items-center gap-4 md:w-32 md:flex-col md:items-start md:gap-1">
                    <span className="text-muted-foreground/40 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                      {format(new Date(dream.createdAt), "yyyy")}
                    </span>
                    <span className="text-foreground/60 font-mono text-sm font-bold tracking-tighter uppercase md:text-lg">
                      {format(new Date(dream.createdAt), "MMM dd")}
                    </span>
                    {/* Mobile-only divider line */}
                    <div className="bg-border/10 h-px flex-1 md:hidden" />
                  </div>

                  {/* Center: Content & Preview */}
                  <div className="relative z-10 flex-1 space-y-4 transition-transform duration-500 group-hover:translate-x-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-foreground font-serif text-3xl font-light tracking-tight transition-colors duration-500 md:text-4xl lg:text-5xl">
                        {dream.title ?? "Untitled Dream"}
                      </h3>
                      {dream.isStarred && (
                        <Star
                          size={18}
                          className="fill-yellow-400/20 text-yellow-400 transition-all duration-500 group-hover:fill-yellow-400"
                        />
                      )}
                    </div>

                    {/* Text Preview - Limits to 2 lines */}
                    <p className="text-muted-foreground/60 line-clamp-2 max-w-2xl font-sans text-sm leading-relaxed md:text-base">
                      {previewText}
                      {previewText.length >= 160 && "..."}
                    </p>

                    <div className="flex items-center gap-6 pt-2">
                      <span className="text-muted-foreground/30 text-[10px] font-medium tracking-widest uppercase italic">
                        {/* Replaced word count with a subtle "Read Entry" hint */}
                        Entry Details — {Math.ceil(previewText.length / 5)}{" "}
                        words
                      </span>

                      <button
                        className="text-muted-foreground/20 flex items-center gap-2 p-1 transition-colors hover:text-red-400/80"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeletingDream(dream);
                        }}
                      >
                        <Trash2 size={14} />
                        <span className="text-[9px] tracking-widest uppercase opacity-0 transition-opacity group-hover:opacity-100">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Large Decorative Moon (Ghost Background) */}
                  <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 overflow-hidden opacity-10 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-20 md:-right-4">
                    <Moon
                      size={180}
                      strokeWidth={0.3}
                      className="group-hover:fill-primary/5 rotate-12 transition-all duration-1000 group-hover:rotate-0"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty State - Styled based on your provided screenshot */
          <div className="max-w-2xl space-y-6">
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xl tracking-tight">
              <span>Your dreams</span>
              <Moon
                size={20}
                className="fill-primary/20 text-primary inline-block animate-pulse"
              />
              <span>
                will show up here once you start adding them to your entries...
              </span>
            </div>

            <div className="text-muted-foreground/80 flex items-center gap-2 text-sm">
              <span>More info in our</span>
              <a
                href="#"
                className="group text-muted-foreground hover:text-primary hover:decoration-primary/50 inline-flex items-center gap-1.5 transition-all"
              >
                <FileText
                  size={14}
                  className="transition-transform group-hover:-rotate-12"
                />
                documentation
              </a>
            </div>
          </div>
        )}
      </div>
      <AlertDialog
        open={!!deletingDream}
        onOpenChange={(open) => !open && setDeletingDream(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl font-medium tracking-tight italic">
              Delete dream?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground pt-2 text-sm leading-relaxed">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex flex-row gap-3 sm:justify-end">
            <AlertDialogCancel className="hover:bg-muted/50 mt-0 flex-1 rounded-xl border-none bg-transparent sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(deletingDream?.id)}
              className="min-w-[100px] flex-1 rounded-xl bg-red-500 text-white hover:bg-red-600 sm:flex-none"
            >
              {deleteMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
