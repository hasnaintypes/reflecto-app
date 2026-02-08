import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EntryWithRelations,
  EntryFilters,
} from "@/server/types/entry.types";

interface EntryStoreState {
  entries: EntryWithRelations[];
  currentEntry: EntryWithRelations | null;
  isLoading: boolean;
  filters: EntryFilters;

  // Actions
  setEntries: (entries: EntryWithRelations[]) => void;
  appendEntries: (entries: EntryWithRelations[]) => void;
  setCurrentEntry: (entry: EntryWithRelations | null) => void;
  setLoading: (isLoading: boolean) => void;
  setFilters: (filters: Partial<EntryFilters>) => void;
  resetFilters: () => void;

  // Optimistic updates
  addEntry: (entry: EntryWithRelations) => void;
  updateEntry: (id: string, entry: Partial<EntryWithRelations>) => void;
  removeEntry: (id: string) => void;
}

export const useEntryStore = create<EntryStoreState>()(
  persist(
    (set) => ({
      entries: [],
      currentEntry: null,
      isLoading: false,
      filters: {
        limit: 20,
      },

      setEntries: (entries) => set({ entries }),

      appendEntries: (newEntries) =>
        set((state) => ({
          entries: [...state.entries, ...newEntries],
        })),

      setCurrentEntry: (entry) => set({ currentEntry: entry }),

      setLoading: (isLoading) => set({ isLoading }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () =>
        set({
          filters: { limit: 20 },
        }),

      addEntry: (entry) =>
        set((state) => ({
          entries: [entry, ...state.entries],
        })),

      updateEntry: (id, update) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, ...update } : e,
          ),
          currentEntry:
            state.currentEntry?.id === id
              ? { ...state.currentEntry, ...update }
              : state.currentEntry,
        })),

      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
          currentEntry:
            state.currentEntry?.id === id ? null : state.currentEntry,
        })),
    }),
    {
      name: "reflecto-entry-store",
      partialize: (state) => ({ filters: state.filters }), // Only persist filters
    },
  ),
);
