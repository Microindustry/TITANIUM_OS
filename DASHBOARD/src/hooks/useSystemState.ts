// useSystemState.ts — TITANIUM_OS / DASHBOARD
// Hook React che legge STATE.json via API server (porta 5001)
// Single source of truth: elimina dati hardcoded nei componenti
// Polling ogni 10s per aggiornamento live

import { useState, useEffect, useCallback } from "react";

// Path relativo: in dev usa Vite middleware, in prod il server statico
const API_BASE = "";

export interface PillarState {
  pct_complete: number;
  status: string;
  label?: string;
  focus?: string;
  next?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface SystemState {
  meta?: { system?: string; version?: string };
  last_update: string;
  active_milestone: string;
  ciclo_position: string;
  last_action: string;
  next_step: string;
  session_count: number;
  pillars: Record<string, PillarState>;
  milestones: { verified: string[]; pending?: string[] };
  focus_today: string;
  blockers: string[];
  ideas_inbox: number;
  nodes?: Record<string, unknown>;
}

interface UseSystemStateResult {
  state: SystemState | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  // shortcuts per accesso rapido
  pillar: (id: string) => PillarState | null;
  pct: (id: string) => number;
  focusToday: string;
  activeMilestone: string;
  blockers: string[];
  isOnline: boolean;
}

const POLL_MS = 10_000; // 10 secondi

export function useSystemState(): UseSystemStateResult {
  const [state, setState] = useState<SystemState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/state`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data: SystemState = await res.json();
      setState(data);
      setError(null);
      setIsOnline(true);
    } catch (e) {
      // API offline — usa ultimo stato valido, non cancellare
      setError(e instanceof Error ? e.message : "errore sconosciuto");
      setIsOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, POLL_MS);
    return () => clearInterval(interval);
  }, [fetchState]);

  const pillar = (id: string): PillarState | null =>
    state?.pillars?.[id] ?? null;

  const pct = (id: string): number =>
    state?.pillars?.[id]?.pct_complete ?? 0;

  return {
    state,
    loading,
    error,
    refetch: fetchState,
    pillar,
    pct,
    focusToday: state?.focus_today ?? "",
    activeMilestone: state?.active_milestone ?? "",
    blockers: state?.blockers ?? [],
    isOnline,
  };
}
