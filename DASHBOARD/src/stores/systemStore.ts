// systemStore.ts | TITANIUM_OS / DASHBOARD | v3.0 | 2026-05-29
// Zustand store — sidebar navigation + focus target

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "home" | "v32" | "genesis" | "mims" | "eva" | "identity"
                     | "agenti" | "storie" | "mappa" | "architettura" | "rete" | "grafo-rag" | "cv-nina" | "mappa-gioco"
                     | "pitch-nina" | "pitch-mims" | "pitch-v32" | "pitch-genesis" | "pitch-eva" | "pitch-hr"
                     | "sinapsi" | "canvas" | "neuro" | "automazioni"
                     | "notturne" | "pitch" | "metodo" | "ragchat" | "avventura" | "nina-archivio" | "nina-giorno0" | "controllo" | "avventura-mappa" | "procedimenti" | "calendario";

export type Theme = "dark" | "light";

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
  theme: Theme;
  toggleTheme: () => void;
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
      theme: "dark",
      toggleTheme: () => set(s => ({ theme: s.theme === "dark" ? "light" : "dark" })),
    }),
    {
      name: "titanium_ui_v3",
      partialize: (s) => ({ view: s.view, sidebarCollapsed: s.sidebarCollapsed, theme: s.theme }),
      // Deep-link via hash: localhost:5173/#controllo apre direttamente quella view
      // (sovrascrive la view persistita). Serve per screenshottare/condividere una
      // view precisa headless (dash_shot) senza dipendere dal localStorage. Guardato:
      // solo token plausibili, no-op fuori dal browser.
      onRehydrateStorage: () => (state) => {
        if (typeof window === "undefined" || !state) return;
        const h = window.location.hash.replace(/^#/, "").trim();
        if (h && /^[a-z0-9-]+$/.test(h)) state.setView(h as ViewMode);
      },
    }
  )
);
