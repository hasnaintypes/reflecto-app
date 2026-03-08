"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Star,
  ArrowUpDown,
  Loader2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { type NoteMetadata } from "@/types/metadata.types";
import { toast } from "sonner";
import { DeleteAlertDialog } from "@/components/shared/delete-alert-dialog";

export default function NotesPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const [deletingNote, setDeletingNote] = useState<{
    id: string;
    title: string | null;
  } | null>(null);
  const utils = api.useUtils();
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

  const deleteMutation = api.entry.delete.useMutation({
    onSuccess: () => {
      void utils.entry.list.invalidate();
      setDeletingNote(null);
      toast.success("Note deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete note");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

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
          <div className="flex flex-col">
            {notes.map((note) => {
              // Strip HTML tags and create a clean preview string
              const previewText = note.content
                ? note.content.replace(/<[^>]*>/g, "").slice(0, 160)
                : "No content recorded...";

              return (
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className={cn(
                    "group border-border/5 hover:bg-muted/5 relative flex flex-col gap-6 border-b py-12 transition-all duration-500 first:pt-0 last:border-0 md:flex-row md:items-start md:gap-16",
                  )}
                >
                  {/* Left Side: Minimalist Date Column */}
                  <div className="flex shrink-0 flex-row items-center gap-4 md:w-32 md:flex-col md:items-start md:gap-1">
                    <span className="text-muted-foreground/40 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                      {format(new Date(note.createdAt), "yyyy")}
                    </span>
                    <span className="text-foreground/60 font-mono text-sm font-bold tracking-tighter uppercase md:text-lg">
                      {format(new Date(note.createdAt), "MMM dd")}
                    </span>
                    {/* Mobile-only divider line */}
                    <div className="bg-border/10 h-px flex-1 md:hidden" />
                  </div>

                  {/* Center: Content & Preview */}
                  <div className="relative z-10 flex-1 space-y-4 transition-transform duration-500 group-hover:translate-x-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-foreground font-serif text-3xl font-light tracking-tight transition-colors duration-500 group-hover:text-[#A78BFA] md:text-4xl">
                        {note.title ?? "Untitled Note"}
                      </h3>
                      {note.isStarred && (
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
                        Note Profile — {Math.ceil(previewText.length / 5)} words
                      </span>

                      <button
                        className="text-muted-foreground/20 flex items-center gap-2 p-1 transition-colors hover:text-red-400/80"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeletingNote({ id: note.id, title: note.title });
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
                    <FileText
                      size={180}
                      strokeWidth={0.3}
                      className="rotate-12 fill-[#A78BFA] transition-all duration-1000 group-hover:rotate-0"
                    />
                  </div>
                </Link>
              );
            })}
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
              <Link
                href="/docs/workspaces/notes"
                className="group text-muted-foreground decoration-border/60 flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#A78BFA] hover:decoration-[#A78BFA]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </Link>
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
      <DeleteAlertDialog
        open={!!deletingNote}
        onOpenChange={(open) => !open && setDeletingNote(null)}
        onConfirm={() => deletingNote?.id && handleDelete(deletingNote.id)}
        title="Delete note?"
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
