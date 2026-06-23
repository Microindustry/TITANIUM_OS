// useSystemQuery.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-03-24
// TanStack Query hook per server state (STATE.json)
// Sostituisce il polling manuale con: cache, stale-while-revalidate, refetch intelligente
// Ogni componente seleziona solo lo slice che serve → zero re-render inutili

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { SystemState, PillarState } from "./useSystemState";

// Re-export tipi per backward compatibility
export type { SystemState, PillarState };

// Path relativo: in dev passa dal Vite middleware (:5173), in prod dal server statico
const POLL_MS = 10_000;

async function fetchSystemState(): Promise<SystemState> {
  const res = await fetch("/api/state", {
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// Query key costante — tutti i consumer condividono la stessa cache
const STATE_KEY = ["system-state"] as const;

// ─── HOOK PRINCIPALE ────────────────────────────────────────────────────────
// Drop-in replacement per useGlobalState, ma con TanStack Query sotto
export function useSystemQuery() {
  const queryClient = useQueryClient();

  const { data: state, isLoading: loading, error: queryError, isSuccess } = useQuery({
    queryKey: STATE_KEY,
    queryFn: fetchSystemState,
    refetchInterval: POLL_MS,           // polling automatico
    staleTime: 5_000,                   // dati "freschi" per 5s → no refetch inutili
    gcTime: 30_000,                     // cache in memoria 30s dopo unmount
    refetchOnWindowFocus: true,         // refetch quando torni sulla tab
    retry: 2,                           // 2 retry su errore, poi fallisce
    placeholderData: (prev) => prev,    // mantieni dati precedenti durante refetch (no flash)
  });

  const error = queryError ? (queryError as Error).message : null;
  const isOnline = isSuccess && !queryError;

  // Refetch manuale — invalida cache e forza nuovo fetch
  const refetch = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: STATE_KEY });
  }, [queryClient]);

  // Selector helpers — identici all'API precedente
  const pillar = useCallback(
    (id: string): PillarState | null => state?.pillars?.[id] ?? null,
    [state]
  );

  const pct = useCallback(
    (id: string): number => state?.pillars?.[id]?.pct_complete ?? 0,
    [state]
  );

  return {
    state: state ?? null,
    loading,
    error,
    isOnline,
    refetch,
    pillar,
    pct,
    activeMilestone: state?.active_milestone ?? "",
    focusToday: state?.focus_today ?? "",
    blockers: state?.blockers ?? [],
  };
}

// ─── SELECTOR HOOKS (granulari, zero re-render extra) ───────────────────────
// Ogni hook seleziona solo un pezzo → il componente ri-renderizza SOLO se quel pezzo cambia

export function usePillar(id: string) {
  return useQuery({
    queryKey: STATE_KEY,
    queryFn: fetchSystemState,
    refetchInterval: POLL_MS,
    staleTime: 5_000,
    select: (data) => data.pillars?.[id] ?? null,
  });
}

export function useActiveMilestone() {
  return useQuery({
    queryKey: STATE_KEY,
    queryFn: fetchSystemState,
    refetchInterval: POLL_MS,
    staleTime: 5_000,
    select: (data) => data.active_milestone ?? "",
  });
}

export function useBlockers() {
  return useQuery({
    queryKey: STATE_KEY,
    queryFn: fetchSystemState,
    refetchInterval: POLL_MS,
    staleTime: 5_000,
    select: (data) => data.blockers ?? [],
  });
}

export function useIsOnline() {
  const { isSuccess, isError } = useQuery({
    queryKey: STATE_KEY,
    queryFn: fetchSystemState,
    refetchInterval: POLL_MS,
    staleTime: 5_000,
  });
  return isSuccess && !isError;
}

// ─── DATA HOOKS (md-files, content-files, digest) ──────────────────────────
// Questi dati non cambiano ogni 10s — staleTime piu' lungo, no polling

export interface MdFile {
  path: string;
  rel: string;
  name: string;
  size_kb: number;
  modified: string;
}

export interface ContentFile extends MdFile {
  meta: Record<string, string>;
}

// Knowledge base: tutti i .md del BRAIN
export function useMdFiles() {
  return useQuery<{ ok: boolean; total: number; files: MdFile[] }>({
    queryKey: ["md-files"],
    queryFn: async () => {
      const res = await fetch("/api/md-files", { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`API ${res.status}`);
      return res.json();
    },
    staleTime: 60_000,      // freschi 60s — i file .md non cambiano ogni secondo
    gcTime: 5 * 60_000,     // cache 5 min
    refetchOnWindowFocus: false,
  });
}

// Episodi content engine con frontmatter YAML
export function useContentFiles() {
  return useQuery<{ ok: boolean; total: number; files: ContentFile[] }>({
    queryKey: ["content-files"],
    queryFn: async () => {
      const res = await fetch("/api/content-files", { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`API ${res.status}`);
      return res.json();
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

// MENTE_SCANNER digest (richiede Flask :5001)
export function useDigest() {
  return useQuery({
    queryKey: ["digest"],
    queryFn: async () => {
      const res = await fetch("/api/digest", { signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error(`API ${res.status}`);
      return res.json();
    },
    staleTime: 5 * 60_000,  // digest cambia raramente — cache 5 min
    gcTime: 10 * 60_000,
    retry: 1,                // Flask potrebbe essere spento
    refetchOnWindowFocus: false,
  });
}

// Stato del nodo RAG Nina (generazione automatica) — alimenta il pannello RAG Nina
export interface NinaStatus {
  ok: boolean;
  canon_count: number;
  seed_archive_count: number;
  generated_total: number;
  last_generated?: { id: string; title: string; at: string } | null;
  last_loop?: string | null;
  seeds?: string[];
  auto: boolean;
}

export function useNinaStatus() {
  return useQuery<NinaStatus>({
    queryKey: ["nina-status"],
    queryFn: async () => {
      const res = await fetch("/api/nina/status", { signal: AbortSignal.timeout(6000) });
      if (!res.ok) throw new Error(`API ${res.status}`);
      return res.json();
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 1,                 // Flask potrebbe essere spento — il pannello degrada da solo
    refetchOnWindowFocus: false,
  });
}

// Episodi Nina ARCHIVIATI (origine EP_AV + versioni precedenti) per RAG Nina
export interface NinaArchivedItem { id: string; title: string; categoria: string; file: string; path: string; }
export function useNinaArchived() {
  return useQuery<{ ok: boolean; total: number; origine: NinaArchivedItem[]; versioni: NinaArchivedItem[] }>({
    queryKey: ["nina-archived"],
    queryFn: async () => {
      const res = await fetch("/api/nina/archived", { signal: AbortSignal.timeout(6000) });
      if (!res.ok) throw new Error(`API ${res.status}`);
      return res.json();
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

// Legge un file specifico (per MdManager, drill-down)
export function useFile(filePath: string | null) {
  return useQuery({
    queryKey: ["file", filePath],
    queryFn: async () => {
      const res = await fetch(`/api/file?path=${encodeURIComponent(filePath!)}`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      return res.json();
    },
    enabled: !!filePath,     // non fetchare se path e' null
    staleTime: 30_000,
    gcTime: 60_000,
  });
}
