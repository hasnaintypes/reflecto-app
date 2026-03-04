"use client";

import React from "react";
import { api } from "@/trpc/react";
import { usePreferencesStore } from "@/stores/use-preferences-store";
import {
  Lightbulb,
  FileText,
  Quote,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkedContextProps {
  entryId: string;
  date: Date;
}

const typeConfig = {
  note: {
    icon: FileText,
    color: "text-blue-400",
    label: "Note",
    path: "/notes",
  },
  wisdom: {
    icon: Quote,
    color: "text-purple-400",
    label: "Wisdom",
    path: "/wisdom",
  },
  idea: {
    icon: Lightbulb,
    color: "text-amber-400",
    label: "Idea",
    path: "/ideas",
  },
  highlight: {
    icon: Sparkles,
    color: "text-rose-400",
    label: "Highlight",
    path: "/highlights",
  },
};

export function LinkedContext({ entryId, date }: LinkedContextProps) {
  const preferences = usePreferencesStore((state) => state.preferences);
  const showLinkedItems = preferences?.preferences?.showItemsInEntries ?? true;

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, isLoading } = api.entry.list.useQuery(
    {
      type: ["note", "wisdom", "idea", "highlight"] as (
        | "journal"
        | "dream"
        | "highlight"
        | "idea"
        | "note"
        | "wisdom"
      )[],
      dateFrom: startOfDay,
      dateTo: endOfDay,
      limit: 10,
    },
    {
      enabled: !!entryId && showLinkedItems,
    },
  );

  if (
    !showLinkedItems ||
    (!isLoading && (!data?.entries || data.entries.length === 0))
  ) {
    return null;
  }

  return (
    <div className="border-border/10 mt-12 space-y-6 border-t pt-8">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground/40 text-[10px] font-bold tracking-[0.3em] uppercase">
          Linked Context
        </span>
        <div className="bg-border/5 h-px flex-1" />
      </div>

      {isLoading ? (
        <div className="text-muted-foreground/40 flex items-center gap-2 text-xs italic">
          <Loader2 size={12} className="animate-spin" />
          <span>Searching for connections...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data?.entries
            .filter((e) => e.id !== entryId)
            .map((item) => {
              const config = typeConfig[item.type as keyof typeof typeConfig];
              if (!config) return null;
              const Icon = config.icon;

              return (
                <Link
                  key={item.id}
                  href={`${config.path}?id=${item.id}`}
                  className="group border-border/5 hover:bg-muted/5 hover:border-border/10 flex items-start gap-4 rounded-xl border p-4 transition-all duration-300"
                >
                  <div
                    className={cn(
                      "mt-1 rounded-lg bg-zinc-900 p-2",
                      config.color,
                    )}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground/40 text-[9px] font-bold tracking-widest uppercase">
                        {config.label}
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-muted-foreground/20 group-hover:text-muted-foreground/60 transition-colors"
                      />
                    </div>
                    <h4 className="text-foreground/80 truncate text-sm font-medium">
                      {item.title ?? "Untitled"}
                    </h4>
                    <p className="text-muted-foreground/50 line-clamp-1 text-xs italic">
                      {item.content?.replace(/<[^>]*>/g, "").slice(0, 60)}...
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
