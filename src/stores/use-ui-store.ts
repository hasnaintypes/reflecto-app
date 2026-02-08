import { create } from "zustand";

interface UIStoreState {
  sidebarOpen: boolean;
  activeWorkspace: string;
  searchQuery: string;
  isDraggable: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveWorkspace: (workspace: string) => void;
  setSearchQuery: (query: string) => void;
  setDraggable: (draggable: boolean) => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  sidebarOpen: true,
  activeWorkspace: "journal",
  searchQuery: "",
  isDraggable: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setDraggable: (draggable) => set({ isDraggable: draggable }),
}));
