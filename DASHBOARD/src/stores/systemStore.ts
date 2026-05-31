// systemStore.ts | TITANIUM_OS / DASHBOARD | v3.0 | 2026-05-29
// Zustand store — sidebar navigation + focus target

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "home" | "v32" | "genesis" | "mims" | "eva" | "identity"
                     | "agenti" | "storie" | "mappa" | "rete" | "sinapsi" | "canvas" | "neuro" | "automazioni";

interface UIState {
  view: ViewMode;
  setView: (v: ViewMode) => void;
  focusTarget: string | null;
  navigateTo: (view: ViewMode, target?: string) => void;
  clearFocus: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  expandedCell: string | null;
  expandCell: (id: string | null) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      view: "home",
      setView: (v) => set({ view: v, focusTarget: null }),
      focusTarget: null,
      navigateTo: (view, target) => set({ view, focusTarget: target ?? null }),
      clearFocus: () => set({ focusTarget: null }),
      sidebarCollapsed: false,
      toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      expandedCell: null,
      expandCell: (id) => set({ expandedCell: id }),
    }),
    {
      name: "titanium_ui_v3",
      partialize: (s) => ({ view: s.view, sidebarCollapsed: s.sidebarCollapsed }),
    }
  )
);
