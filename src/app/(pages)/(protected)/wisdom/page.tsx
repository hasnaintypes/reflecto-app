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

import { type WisdomMetadata } from "@/types/metadata.types";

type WisdomType = NonNullable<WisdomMetadata["wisdom_type"]>;

export default function WisdomPage() {
  const router = useRouter();
  const [isStarredOnly, setIsStarredOnly] = useState(false);
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
        return <Quote size={14} />;
      case "fact":
        return <Asterisk size={14} />;
      case "excerpt":
        return <AlignLeft size={14} />;
      case "lesson":
        return <GraduationCap size={14} />;
      default:
        return <Lightbulb size={14} />;
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
                  icon: <Lightbulb size={14} className="text-amber-400" />,
                  label: "Thought",
                  type: "thought",
                },
                {
                  icon: <Quote size={14} className="text-purple-400" />,
                  label: "Quote",
                  type: "quote",
                },
                {
                  icon: <Asterisk size={14} className="text-sky-400" />,
                  label: "Fact",
                  type: "fact",
                },
                {
                  icon: <AlignLeft size={14} className="text-orange-400" />,
                  label: "Excerpt",
                  type: "excerpt",
                },
                {
                  icon: (
                    <GraduationCap size={14} className="text-emerald-400" />
                  ),
                  label: "Lesson",
                  type: "lesson",
                },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className="group focus:bg-muted focus:text-foreground flex w-full cursor-pointer items-center gap-3 px-3 py-2 transition-all"
                  onClick={() => handleNewWisdom(item.type as WisdomType)}
                >
                  {item.icon}
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
          <div className="space-y-6">
            {wisdomEntries.map((entry) => {
              const type =
                (entry.metadata as WisdomMetadata | null)?.wisdom_type ??
                "thought";
              return (
                <Link
                  key={entry.id}
                  href={`/wisdom/${entry.id}`}
                  className="group border-border/10 bg-muted/5 hover:bg-muted/10 flex flex-col gap-3 rounded-xl border p-6 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase ${getTypeColor(type)}`}
                      >
                        {getTypeIcon(type)}
                        {type}
                      </div>
                      {entry.isStarred && (
                        <Star
                          size={10}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      )}
                    </div>
                  </div>

                  <p className="text-foreground group-hover:text-primary/90 font-serif text-2xl leading-relaxed transition-colors">
                    {type === "quote"
                      ? `"${entry.title ?? (entry.content ? entry.content.replace(/<[^>]*>/g, "").slice(0, 150) : "")}"`
                      : (entry.title ??
                        (entry.content
                          ? entry.content.replace(/<[^>]*>/g, "").slice(0, 150)
                          : ""))}
                  </p>

                  {((entry.metadata as WisdomMetadata | null)?.author ??
                    (entry.metadata as WisdomMetadata | null)?.source) && (
                    <div className="text-muted-foreground/40 flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase">
                      <div className="bg-muted-foreground/20 h-px w-4" />
                      {(entry.metadata as WisdomMetadata | null)?.author ??
                        (entry.metadata as WisdomMetadata | null)?.source}
                    </div>
                  )}
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
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<Quote size={16} className="text-purple-400" />}
                label="Add Quote"
                type="quote"
                onClick={handleNewWisdom}
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<Asterisk size={16} className="text-sky-400" />}
                label="Add Fact"
                type="fact"
                onClick={handleNewWisdom}
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<AlignLeft size={16} className="text-orange-400" />}
                label="Add Excerpt"
                type="excerpt"
                onClick={handleNewWisdom}
                disabled={createMutation.isPending}
              />
              <ActionButton
                icon={<GraduationCap size={16} className="text-emerald-400" />}
                label="Add Lesson"
                type="lesson"
                onClick={handleNewWisdom}
                disabled={createMutation.isPending}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Action Button Component matching your UI style */
function ActionButton({
  icon,
  label,
  type,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  type: WisdomType;
  onClick: (type: WisdomType) => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={() => onClick(type)}
      disabled={disabled}
      className="bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground flex min-w-[160px] cursor-pointer items-center gap-3 rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
    >
      {disabled ? <Loader2 size={16} className="animate-spin" /> : icon}
      <span>{disabled ? "Adding..." : label}</span>
    </button>
  );
}
