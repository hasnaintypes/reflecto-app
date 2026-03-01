"use client";

import React, { useEffect } from "react";
import { format } from "date-fns";
import { JournalEditor, MetadataEditor } from "@/components/journal-editor";
import { Loader2, CheckCircle2, Sparkles, Star } from "lucide-react";
import { api } from "@/trpc/react";
import { useEntryStore } from "@/stores/use-entry-store";
import { usePreferencesStore } from "@/stores/use-preferences-store";
import { cn } from "@/lib/utils";
import type { EntryWithRelations } from "@/server/types/entry.types";
import type { EntryMetadata } from "@/types/metadata.types";
import type { EntryType } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function WritePageContent() {
  const searchParams = useSearchParams();
  const typeFromUrl = (searchParams.get("type") as EntryType) ?? "journal";
  const entryId = searchParams.get("id");

  const { setCurrentEntry, currentEntry } = useEntryStore();
  const preferences = usePreferencesStore((state) => state.preferences);
  const showBulletCount = preferences?.preferences?.bulletedMode ?? true;

  // Load specific entry if ID is provided
  const { data: fetchedEntry, isLoading: isEntryLoading } = api.entry.getById.useQuery(
    { id: entryId! },
    {
      enabled: !!entryId && currentEntry?.id !== entryId,
      staleTime: Infinity,
    },
  );

  const isLoadingEntry = !!entryId && (!currentEntry || currentEntry.id !== entryId) && isEntryLoading;

  // Sync fetched entry to store
  useEffect(() => {
    if (fetchedEntry && entryId) {
      setCurrentEntry(fetchedEntry);
    }
  }, [fetchedEntry, entryId, setCurrentEntry]);

  const displayDate = currentEntry?.createdAt
    ? new Date(currentEntry.createdAt)
    : entryId
      ? null
      : new Date();

  const dateStr = displayDate ? format(displayDate, "MMMM do, yyyy").toLowerCase() : "";
  const dayStr = displayDate ? format(displayDate, "EEEE") : "";
  const now = new Date();

  const defaultTitle = `${dayStr}, ${format(now, "MMM d")}`;

  // Load today's entries for the specific type (only if explicit id is NOT provided)
  const { data: entryData, isLoading: isListLoading } = api.entry.list.useQuery(
    {
      limit: 1,
      type: typeFromUrl,
      dateFrom: new Date(new Date().setHours(0, 0, 0, 0)),
    },
    { enabled: !entryId },
  );

  // Set current entry if found (only when not loading a specific ID)
  useEffect(() => {
    if (!entryId) {
      if (entryData?.entries?.[0]) {
        setCurrentEntry(entryData.entries[0]);
      } else {
        // Create a mock entry in store with default title
        setCurrentEntry({
          id: "",
          type: typeFromUrl,
          title: defaultTitle,
          content: "",
          isStarred: false,
          metadata: {},
          createdAt: now,
          updatedAt: now,
        } as EntryWithRelations); // Cast as partial/mock
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryData, setCurrentEntry, entryId]);

  const updateMutation = api.entry.update.useMutation({
    onSuccess: (data) => {
      updateEntry(data.id, data);
    },
  });

  const { updateEntry } = useEntryStore();

  const toggleStar = () => {
    if (!currentEntry) return;
    const newStarred = !currentEntry.isStarred;
    updateEntry(currentEntry.id, { isStarred: newStarred });

    if (currentEntry.id) {
      updateMutation.mutate({
        id: currentEntry.id,
        isStarred: newStarred,
      });
    }
  };

  // Handle entry clearing and transitions
  useEffect(() => {
    if (entryId && currentEntry && currentEntry.id !== entryId && !isEntryLoading) {
      setCurrentEntry(null);
    }
  }, [entryId, currentEntry, setCurrentEntry, isEntryLoading]);

  if (isLoadingEntry) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4 animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-primary/20" size={48} />
        <p className="text-muted-foreground/40 font-serif italic text-sm tracking-wide">
          Syncing with your reflection...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="animate-in fade-in slide-in-from-top-4 transition-all duration-300 duration-1000">
        <header className="mb-8 space-y-4 pt-6">
          <div className="space-y-1">
            <p className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
              {dateStr}
            </p>
            <h1 className="text-foreground font-serif text-7xl font-medium tracking-tight italic">
              {dayStr}
            </h1>
            {showBulletCount &&
              currentEntry?.metadata &&
              (currentEntry.metadata as EntryMetadata).bullets !==
                undefined && (
                <p className="text-muted-foreground/40 font-mono text-xl font-medium">
                  #{(currentEntry.metadata as EntryMetadata).bullets}
                </p>
              )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="border-border/40 bg-muted/50 text-muted-foreground flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold tracking-wider">
                <Sparkles size={10} className="text-primary" />
                PRESENT MOMENT
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                  Cloud Sync
                </span>
                {isListLoading ? (
                  <Loader2
                    size={10}
                    className="text-muted-foreground animate-spin"
                  />
                ) : (
                  <CheckCircle2 size={10} className="text-emerald-500" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Star
                size={18}
                className={cn(
                  "cursor-pointer transition-colors",
                  currentEntry?.isStarred
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/40 hover:text-primary",
                )}
                onClick={toggleStar}
              />
            </div>
          </div>
        </header>
        <MetadataEditor />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 custom-scrollbar flex-1 overflow-x-hidden overflow-y-auto duration-1000">
        <JournalEditor
          key={entryId ?? "new"}
          id={entryId ?? undefined}
          initialType={typeFromUrl}
        />
      </div>
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="text-muted-foreground animate-spin" size={24} />
        </div>
      }
    >
      <WritePageContent />
    </Suspense>
  );
}
