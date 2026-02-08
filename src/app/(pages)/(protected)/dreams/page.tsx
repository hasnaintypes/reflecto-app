"use client";

import { useRouter } from "next/navigation";
import { Plus, Moon, FileText, Star, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { type DreamMetadata } from "@/types/metadata.types";

export default function DreamsPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const { data, isLoading } = api.entry.list.useQuery({
    type: "dream",
    limit: 50,
    isStarred: isStarredOnly || undefined,
  });

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/dreams/${data.id}`);
    },
  });

  const handleRecord = () => {
    createMutation.mutate({
      type: "dream",
      title: "A new dream...",
      content: "",
      metadata: {
        atmosphere: "",
        clarity: "Vivid",
      } satisfies DreamMetadata,
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {dreams.map((dream) => {
              const metadata = (dream.metadata as DreamMetadata) ?? {};
              return (
                <Link
                  key={dream.id}
                  href={`/dreams/${dream.id}`}
                  className="group border-primary/5 from-primary/5 hover:border-primary/20 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border bg-gradient-to-br via-transparent to-transparent p-6 transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="text-primary/5 group-hover:text-primary/10 absolute -top-8 -right-8 transition-colors duration-500 group-hover:scale-110">
                    <Moon size={120} />
                  </div>

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-primary/60 text-[10px] font-bold tracking-widest uppercase">
                          {format(
                            new Date(dream.createdAt),
                            "MMM d",
                          ).toLowerCase()}
                        </span>
                        {dream.isStarred && (
                          <Star
                            size={10}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        )}
                      </div>
                      <div className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                        {metadata.atmosphere ?? "Mystical"}
                      </div>
                    </div>

                    <h3 className="text-foreground group-hover:text-primary font-serif text-3xl font-medium transition-colors">
                      {dream.title ?? "Untitled Dream"}
                    </h3>

                    <div className="flex items-center gap-2 pt-2">
                      <div className="bg-border/40 h-px flex-1" />
                      <span className="text-muted-foreground/30 text-[9px] font-bold tracking-[0.2em] uppercase">
                        Clarity: {metadata.clarity ?? "Vivid"}
                      </span>
                    </div>
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
    </div>
  );
}
