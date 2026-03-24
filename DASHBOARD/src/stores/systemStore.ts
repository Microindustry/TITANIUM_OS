// systemStore.ts | TITANIUM_OS / DASHBOARD | v2.0 | 2026-03-24
// Zustand store per UI state — navigazione, focus, preferenze
// Ogni componente puo' navigare tra viste e settare un focus target

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "canvas" | "neuro" | "sinapsi" | "storie" | "rete";

interface UIState {
  // Vista attiva
  view: ViewMode;
  setView: (v: ViewMode) => void;

  // Focus target — quando navighi a una vista, puoi indicare COSA aprire
  // es: navigateTo("sinapsi", "V32") → apre SINAPSI e drilla in V32
  focusTarget: string | null;
  navigateTo: (view: ViewMode, target?: string) => void;
  clearFocus: () => void;

  // Cella espansa in CANVAS (fullscreen)
  expandedCell: string | null;
  expandCell: (id: string | null) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      view: "canvas",
      setView: (v) => set({ view: v, focusTarget: null }),

      focusTarget: null,
      navigateTo: (view, target) => set({ view, focusTarget: target ?? null }),
      clearFocus: () => set({ focusTarget: null }),

      expandedCell: null,
      expandCell: (id) => set({ expandedCell: id }),
    }),
    {
      name: "titanium_ui_v2",
      partialize: (state) => ({ view: state.view }), // persisti solo la vista, non il focus
    }
  )
);
