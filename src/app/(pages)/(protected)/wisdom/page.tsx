"use client";

import { useRouter } from "next/navigation";
import {
  Lightbulb,
  Quote,
  Asterisk,
  AlignLeft,
  GraduationCap,
  ArrowUpDown,
  Plus,
  Star,
  FileText,
  Loader2,
  Trash2,
} from "lucide-react";

import Link from "next/link";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { DeleteAlertDialog } from "@/components/shared/delete-alert-dialog";

import { type WisdomMetadata } from "@/types/metadata.types";
import { format, formatDistanceToNow } from "date-fns";

type WisdomType = NonNullable<WisdomMetadata["wisdom_type"]>;

export default function WisdomPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
  const [deletingWisdom, setDeletingWisdom] = useState<{
    id: string;
    title: string | null;
  } | null>(null);
  const utils = api.useUtils();
  const { data, isLoading } = api.entry.list.useQuery({
    type: "wisdom",
    limit: 50,
    isStarred: isStarredOnly ? true : undefined,
  });

  const createMutation = api.entry.create.useMutation({
    onSuccess: (data) => {
      router.push(`/wisdom/${data.id}`);
    },
  });

  const deleteMutation = api.entry.delete.useMutation({
    onSuccess: () => {
      void utils.entry.list.invalidate();
      setDeletingWisdom(null);
      toast.success("Wisdom deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete wisdom");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const handleNewWisdom = (type: WisdomType) => {
    createMutation.mutate({
      type: "wisdom",
      title: "A spark of wisdom...",
      content: "",
      metadata: {
        wisdom_type: type,
      } satisfies WisdomMetadata,
    });
  };

  const wisdomEntries = data?.entries ?? [];
  const hasWisdom = wisdomEntries.length > 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin opacity-20" />
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quote":
        return Quote;
      case "fact":
        return Asterisk;
      case "excerpt":
        return AlignLeft;
      case "lesson":
        return GraduationCap;
      default:
        return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quote":
        return "text-purple-400";
      case "fact":
        return "text-sky-400";
      case "excerpt":
        return "text-orange-400";
      case "lesson":
        return "text-emerald-400";
      default:
        return "text-amber-400";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#F472B6] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Wisdom
          </h1>
        </div>

        {/* Header Utilities */}
        <div className="text-muted-foreground/60 mb-2 flex items-center gap-6">
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
          <ArrowUpDown
            size={20}
            className="hover:text-foreground cursor-pointer transition-colors"
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                disabled={createMutation.isPending}
                className="hover:text-foreground cursor-pointer transition-colors outline-none disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Plus size={20} />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="animate-in fade-in zoom-in-95 border-border/40 bg-popover/90 min-w-[160px] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl duration-300"
            >
              {[
                {
                  icon: Lightbulb,
                  label: "Thought",
                  type: "thought",
                  color: "text-amber-400",
                },
                {
                  icon: Quote,
                  label: "Quote",
                  type: "quote",
                  color: "text-purple-400",
                },
                {
                  icon: Asterisk,
                  label: "Fact",
                  type: "fact",
                  color: "text-sky-400",
                },
                {
                  icon: AlignLeft,
                  label: "Excerpt",
                  type: "excerpt",
                  color: "text-orange-400",
                },
                {
                  icon: GraduationCap,
                  label: "Lesson",
                  type: "lesson",
                  color: "text-emerald-400",
                },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className="group focus:bg-muted focus:text-foreground flex w-full cursor-pointer items-center gap-3 px-3 py-2 transition-all"
                  onClick={() => handleNewWisdom(item.type as WisdomType)}
                >
                  {React.createElement(item.icon as any, {
                    size: 14,
                    className: item.color,
                  })}
                  <span className="text-muted-foreground group-focus:text-foreground text-[11px] font-bold tracking-[0.15em] uppercase transition-colors">
                    {item.label}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Content Area */}
      <div className="mt-16">
        {hasWisdom ? (
          <div className="flex flex-col">
            {wisdomEntries.map((entry) => {
              const type =
                (entry.metadata as WisdomMetadata | null)?.wisdom_type ??
                "thought";
              // Strip HTML tags and create a clean preview string
              const previewText = entry.content
                ? entry.content.replace(/<[^>]*>/g, "").slice(0, 160)
                : "";

              return (
                <Link
                  key={entry.id}
                  href={`/wisdom/${entry.id}`}
                  className={cn(
                    "group border-border/5 hover:bg-muted/5 relative flex flex-col gap-6 border-b py-12 transition-all duration-500 first:pt-0 last:border-0 md:flex-row md:items-start md:gap-16",
                  )}
                >
                  {/* Left Side: Minimalist Type/Date Column */}
                  <div className="flex shrink-0 flex-row items-center gap-4 md:w-32 md:flex-col md:items-start md:gap-1">
                    <div
                      className={cn(
                        "font-mono text-[10px] font-bold tracking-[0.2em] uppercase",
                        getTypeColor(type),
                      )}
                    >
                      {type}
                    </div>
                    <span className="text-foreground/60 font-mono text-sm font-bold tracking-tighter uppercase md:text-lg">
                      {format(new Date(entry.createdAt), "MMM dd")}
                    </span>
                    {/* Mobile-only divider line */}
                    <div className="bg-border/10 h-px flex-1 md:hidden" />
                  </div>

                  {/* Center: Content & Preview */}
                  <div className="relative z-10 flex-1 space-y-4 transition-transform duration-500 group-hover:translate-x-1">
                    <div className="flex items-center gap-3">
                      <h3
                        className={cn(
                          "text-foreground font-serif text-3xl font-light tracking-tight transition-colors duration-500 md:text-4xl",
                          type === "quote" && "italic",
                        )}
                      >
                        {type === "quote" ? (
                          <>
                            <span className="text-muted-foreground/20 absolute -left-8 top-0 font-serif text-7xl select-none">
                              &ldquo;
                            </span>
                            {entry.title ?? previewText}
                            <span className="text-muted-foreground/20 ml-1 font-serif text-3xl select-none">
                              &rdquo;
                            </span>
                          </>
                        ) : (
                          entry.title ?? (previewText || "A spark of wisdom...")
                        )}
                      </h3>
                      {entry.isStarred && (
                        <Star
                          size={18}
                          className="fill-yellow-400/20 text-yellow-400 transition-all duration-500 group-hover:fill-yellow-400"
                        />
                      )}
                    </div>

                    {/* Meta info (Author/Source) */}
                    {((entry.metadata as WisdomMetadata | null)?.author ??
                      (entry.metadata as WisdomMetadata | null)?.source) && (
                      <div className="text-muted-foreground/40 flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase italic">
                        <div
                          className={cn(
                            "h-px w-6",
                            getTypeColor(type)
                              .replace("text-", "bg-")
                              .replace("-400", "-400/30"),
                          )}
                        />
                        {(entry.metadata as WisdomMetadata | null)?.author ??
                          (entry.metadata as WisdomMetadata | null)?.source}
                      </div>
                    )}

                    {/* Text Preview - Only if not using title as content */}
                    {entry.title && previewText && (
                      <p className="text-muted-foreground/60 line-clamp-2 max-w-2xl font-sans text-sm leading-relaxed md:text-base">
                        {previewText.length > 200
                          ? previewText.slice(0, 200) + "..."
                          : previewText}
                      </p>
                    )}

                    <div className="flex items-center gap-6 pt-2">
                      <span className="text-muted-foreground/30 text-[10px] font-medium tracking-widest uppercase italic">
                        Wisdom Profile — {type} Details
                      </span>

                      <button
                        className="text-muted-foreground/20 flex items-center gap-2 p-1 transition-colors hover:text-red-400/80"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeletingWisdom({
                            id: entry.id,
                            title: entry.title,
                          });
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
                    {React.createElement(getTypeIcon(type) as any, {
                      size: 180,
                      strokeWidth: 0.3,
                      className: cn(
                        "rotate-12 transition-all duration-1000 group-hover:rotate-0",
                        getTypeColor(type).replace("text-", "fill-"),
                      ),
                    })}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty State - Matching the 'Wisdom' reference strictly */
          <div className="max-w-2xl space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed tracking-tight">
              Collect shower thoughts, mind-blowing facts, insightful quotes,
              excerpts from good books, and lessons learned as a source of
              inspiration.
            </p>

            <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
              <span className="lowercase">More info in our</span>
              <a
                href="#"
                className="group text-muted-foreground decoration-border/60 flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#F472B6] hover:decoration-[#F472B6]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>

            {/* Multi-Action Button Stack from reference */}
            <div className="flex flex-row items-start gap-3 pt-4">
              <ActionButton
                icon={<Lightbulb size={16} className="text-amber-400" />}
                label="Add Thought"
                type="thought"
                onClick={handleNewWisdom}
                isPending={createMutation.isPending && (createMutation.variables as any)?.metadata?.wisdom_type === "thought"}
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<Quote size={16} className="text-purple-400" />}
                label="Add Quote"
                type="quote"
                onClick={handleNewWisdom}
                isPending={createMutation.isPending && (createMutation.variables as any)?.metadata?.wisdom_type === "quote"}
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<Asterisk size={16} className="text-sky-400" />}
                label="Add Fact"
                type="fact"
                onClick={handleNewWisdom}
                isPending={createMutation.isPending && (createMutation.variables as any)?.metadata?.wisdom_type === "fact"}
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<AlignLeft size={16} className="text-orange-400" />}
                label="Add Excerpt"
                type="excerpt"
                onClick={handleNewWisdom}
                isPending={createMutation.isPending && (createMutation.variables as any)?.metadata?.wisdom_type === "excerpt"}
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<GraduationCap size={16} className="text-emerald-400" />}
                label="Add Lesson"
                type="lesson"
                onClick={handleNewWisdom}
                isPending={createMutation.isPending && (createMutation.variables as any)?.metadata?.wisdom_type === "lesson"}
                disabled={createMutation.isPending}
              />
            </div>
          </div>
        )}
      </div>
      <DeleteAlertDialog
        open={!!deletingWisdom}
        onOpenChange={(open) => !open && setDeletingWisdom(null)}
        onConfirm={() => deletingWisdom?.id && handleDelete(deletingWisdom.id)}
        title="Delete wisdom?"
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}

/* Reusable Action Button Component matching your UI style */
function ActionButton({
  icon,
  label,
  type,
  onClick,
  isPending,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  type: WisdomType;
  onClick: (type: WisdomType) => void;
  isPending: boolean;
  disabled: boolean;
}) {
  return (
    <button
      onClick={() => onClick(type)}
      disabled={disabled}
      className="bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground flex min-w-[160px] cursor-pointer items-center gap-3 rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : icon}
      <span>{isPending ? "Adding..." : label}</span>
    </button>
  );
}
