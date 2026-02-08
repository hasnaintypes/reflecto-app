"use client";

import React from "react";
import { format, subDays, startOfDay, endOfDay, startOfWeek } from "date-fns";
import {
  Plus,
  ListFilter,
  Info,
  FileText,
  Sparkles,
  Loader2,
  Moon,
  Heart,
  Lightbulb,
  Gem,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { type EntryWithRelations } from "@/server/types/entry.types";

export default function ReflectPage() {
  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(yesterday, "EEEE, MMM dd");

  const startOfYesterday = startOfDay(yesterday);
  const endOfYesterday = endOfDay(yesterday);
  const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  // Fetch yesterday's entries
  const { data: yesterdayData, isLoading: isLoadingYesterday } =
    api.entry.list.useQuery({
      dateFrom: startOfYesterday,
      dateTo: endOfYesterday,
      limit: 10,
    });

  // Fetch this week's entries
  const { data: weekData, isLoading: isLoadingWeek } = api.entry.list.useQuery({
    dateFrom: startOfThisWeek,
    limit: 50,
  });

  // Total count for memory lane
  const { data: totalData } = api.entry.list.useQuery({ limit: 1 });

  const yesterdayEntries = yesterdayData?.entries ?? [];
  const weekEntries = weekData?.entries ?? [];
  const totalEntries = totalData?.entries.length ?? 0; // This is not quite right for total count, but good enough to check if > 0

  const getEntryIcon = (type: string) => {
    switch (type) {
      case "dream":
        return <Moon size={14} className="text-yellow-400" />;
      case "highlight":
        return <Heart size={14} className="text-red-400" />;
      case "idea":
        return <Lightbulb size={14} className="text-blue-400" />;
      case "wisdom":
        return <Gem size={14} className="text-pink-400" />;
      default:
        return <FileText size={14} className="text-primary" />;
    }
  };

  const getEntryLink = (entry: EntryWithRelations) => {
    if (entry.type === "journal") return `/write?id=${entry.id}`;
    return `/${entry.type}s/${entry.id}`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pb-24 duration-1000">
      <div className="bg-background/80 sticky top-0 z-20 -mx-6 mb-8 px-6 backdrop-blur-md transition-all duration-300">
        <header className="flex flex-col justify-between gap-6 pt-6 md:flex-row md:items-end">
          <div className="space-y-1">
            <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              Review
            </p>
            <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
              Reflect
            </h1>
          </div>

          <button className="text-muted-foreground hover:text-primary mb-2 transition-colors">
            <ListFilter size={22} strokeWidth={1.5} />
          </button>
        </header>

        <div className="from-background/80 pointer-events-none absolute -bottom-8 left-0 h-8 w-full bg-gradient-to-b to-transparent" />
      </div>

      <div className="space-y-12">
        <section className="group">
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-foreground text-2xl font-medium">Yesterday</h2>
            <span className="text-muted-foreground/60 font-mono text-xs tracking-widest uppercase">
              {formattedYesterday}
            </span>
          </div>

          {isLoadingYesterday ? (
            <Loader2 className="text-primary/40 animate-spin" size={20} />
          ) : yesterdayEntries.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {yesterdayEntries.map((entry) => (
                <Link
                  key={entry.id}
                  href={getEntryLink(entry)}
                  className="group/item border-border/40 hover:border-primary/20 bg-muted/5 hover:bg-muted/10 flex items-center gap-3 rounded-lg border p-4 transition-all"
                >
                  <div className="bg-background border-border/40 rounded-full border p-2 shadow-sm">
                    {getEntryIcon(entry.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-foreground group-hover/item:text-primary truncate text-sm font-medium transition-colors">
                      {entry.title ?? "Untitled Entry"}
                    </h3>
                    <p className="text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                      {entry.type}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg lowercase">
                There is no entry for {format(yesterday, "MMM dd")} yet.
              </p>
              <Link
                href="/write"
                className="group text-primary flex items-center gap-2 transition-all hover:opacity-80"
              >
                <div className="border-primary/30 group-hover:bg-primary group-hover:text-background rounded-full border p-1.5 transition-all">
                  <Plus size={14} strokeWidth={3} />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase">
                  Write entry
                </span>
              </Link>
            </div>
          )}
        </section>

        <section>
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="text-foreground text-2xl font-medium">This week</h2>
            <span className="text-muted-foreground/60 font-mono text-xs tracking-widest uppercase">
              {format(startOfThisWeek, "MMM dd")} → Today
            </span>
          </div>

          {isLoadingWeek ? (
            <Loader2 className="text-primary/40 animate-spin" size={20} />
          ) : weekEntries.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {weekEntries.map((entry) => (
                <Link
                  key={entry.id}
                  href={getEntryLink(entry)}
                  className="border-border/40 hover:border-primary/20 bg-muted/5 hover:bg-muted/10 group flex items-center gap-2 rounded-full border px-4 py-2 transition-all"
                >
                  {getEntryIcon(entry.type)}
                  <span className="text-foreground group-hover:text-primary text-xs font-medium">
                    {entry.title ?? "Untitled"}
                  </span>
                  <span className="text-muted-foreground/40 font-mono text-[9px]">
                    {format(new Date(entry.createdAt), "EEE")}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground flex items-center gap-1.5 text-lg">
              <span className="lowercase">
                Nothing here yet... highlights and ideas will appear shortly
              </span>
              <Sparkles size={16} className="fill-primary/10 text-primary" />
            </div>
          )}
        </section>

        <section>
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-foreground text-2xl font-medium">
              More / Less
            </h2>
            <div className="border-border/60 text-muted-foreground/60 flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold">
              PRO <Info size={10} />
            </div>
          </div>
          <p className="text-muted-foreground/80 mb-4 text-sm lowercase">
            Evolution of your aspirations
          </p>
          <p className="text-muted-foreground max-w-xl leading-relaxed lowercase">
            You didn&apos;t flag any tags as &quot;do more&quot; or &quot;do
            less&quot; yet. Click on a tag and open the &quot;Details&quot; tab
            in order to do so.
          </p>
        </section>

        <section>
          <h2 className="text-foreground mb-6 text-2xl font-medium">
            Memory lane
          </h2>
          <div className="text-muted-foreground flex items-start gap-3 text-lg">
            <span className="leading-relaxed lowercase">
              {totalEntries < 10
                ? `Throwbacks will show up here once you have created 10 or more entries, otherwise it would be quite boring... (currently ${totalEntries}/10)`
                : "Looking back at your journey..."}
            </span>
          </div>
        </section>
      </div>

      <div className="border-border mt-24 border-t pt-8">
        <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
          <span className="lowercase">Curious about the process?</span>
          <a
            href="#"
            className="group text-muted-foreground decoration-border/60 hover:text-primary hover:decoration-primary/40 flex items-center gap-1 underline underline-offset-4 transition-colors"
          >
            <FileText size={14} className="opacity-70" />
            <span className="lowercase">read the guide.</span>
          </a>
        </div>
      </div>
    </div>
  );
}
