// SystemStateContext.tsx | TITANIUM_OS | v2.0 | 2026-03-24
// Bridge backward-compatible: useGlobalState() ora usa TanStack Query sotto
// Il Context Provider non e' piu' necessario — useGlobalState() funziona ovunque
// dentro QueryClientProvider (vedi App.tsx)

import { useSystemQuery } from "./useSystemQuery";
import type { SystemState } from "./useSystemState";

interface SystemCtx {
  state: SystemState | null;
  loading: boolean;
  error: string | null;
  isOnline: boolean;
  refetch: () => void;
  pillar: (id: string) => any;
  pct: (id: string) => number;
  activeMilestone: string;
  focusToday: string;
  blockers: string[];
}

/**
 * Hook backward-compatible — stessa API di prima.
 * Sotto usa TanStack Query: cache, stale-while-revalidate, selector-based.
 * Non richiede piu' SystemStateProvider wrapping.
 */
export function useGlobalState(): SystemCtx {
  return useSystemQuery();
}

// DEPRECATO — mantenuto per non rompere App.tsx durante la migrazione
// Rimosso al prossimo step
export function SystemStateProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
