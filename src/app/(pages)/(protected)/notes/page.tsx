"use client";

import React, { useState } from "react";
import { FileText, Plus, Star, ArrowUpDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { type NoteMetadata } from "@/types/metadata.types";

export default function NotesPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const { data, isLoading } = api.entry.list.useQuery({
    type: "note",
    limit: 50,
    isStarred: isStarredOnly || undefined,
  });

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/notes/${data.id}`);
    },
  });

  const handleNewNote = () => {
    createMutation.mutate({
      type: "note",
      title: "",
      content: "",
      metadata: {} satisfies NoteMetadata,
    });
  };

  const notes = data?.entries ?? [];
  const hasNotes = notes.length > 0;

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
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#A78BFA] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Notes
          </h1>
        </div>

        {/* Utility Icons from reference */}
        <div className="text-muted-foreground/60 mb-2 flex items-center gap-6">
          <button
            onClick={handleNewNote}
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
                : "hover:text-foreground",
            )}
            onClick={() => setIsStarredOnly(!isStarredOnly)}
          />
          <ArrowUpDown
            size={20}
            className="hover:text-foreground cursor-pointer transition-colors"
          />
        </div>
      </header>

      {/* Content Area */}
      <div className="mt-16">
        {hasNotes ? (
          <div className="columns-1 gap-8 space-y-8 md:columns-2">
            {notes.map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className="group border-border/40 bg-muted/20 hover:bg-muted/30 block break-inside-avoid space-y-4 rounded-xl border p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-foreground group-hover:text-primary font-serif text-2xl font-medium transition-colors">
                      {note.title ?? "Untitled Note"}
                    </h3>
                    {note.isStarred && (
                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    )}
                  </div>
                  <FileText size={16} className="text-muted-foreground/30" />
                </div>
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                  {note.content?.replace(/<[^>]*>/g, "").slice(0, 150) ??
                    "Empty note"}
                </p>
                <div className="border-border/5 flex items-center justify-between border-t pt-4">
                  <span className="text-muted-foreground/40 text-[10px] font-bold tracking-widest uppercase">
                    {formatDistanceToNow(new Date(note.createdAt))} ago
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]/40" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State - Matching the 'Notes' reference strictly */
          <div className="max-w-2xl space-y-8">
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed tracking-tight">
              <p>
                Notes help you capture thoughts in more detail. They can be
                completely independent of dates or augment entries in your daily
                log.
              </p>

              <p>
                Here you can collect anything, from weekly / monthly / annual
                summaries, over &quot;lessons learned&quot;, to thought
                experiments and more.
              </p>
            </div>

            {/* Documentation Link */}
            <div className="text-muted-foreground/80 flex items-center gap-1.5 pt-2 text-sm">
              <span className="lowercase">More info in the</span>
              <a
                href="#"
                className="group text-muted-foreground decoration-border/60 flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#A78BFA] hover:decoration-[#A78BFA]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>

            {/* Custom Styled Add Button from reference */}
            <div className="pt-6">
              <button
                onClick={handleNewNote}
                disabled={createMutation.isPending}
                className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin text-[#A78BFA]" />
                ) : (
                  <Plus size={16} className="text-[#A78BFA]" />
                )}
                <span>
                  {createMutation.isPending ? "Adding..." : "Add note"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
