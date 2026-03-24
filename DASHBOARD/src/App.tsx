// App.tsx | TITANIUM_OS | v5.0 | 2026-03-24
// Shell principale — navigazione guidata con ruoli + cross-link tra viste

import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Activity, Zap, Grid3X3, GitBranch, Layers, Network, Mic, Globe,
  ArrowRight, Compass,
} from "lucide-react";
import { useGlobalState } from "./hooks/SystemStateContext";
import { useUIStore } from "./stores/systemStore";
import { CanvasLayout } from "./components/CanvasLayout";

// QueryClient singleton
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5_000, gcTime: 60_000, refetchOnWindowFocus: true, retry: 2 },
  },
});

// Lazy-load viste pesanti
const NeuroOSLayout = lazy(() => import("./components/NeuroOSLayout").then(m => ({ default: m.NeuroOSLayout })));
const LayersView = lazy(() => import("./components/LayersView"));
const StorieView = lazy(() => import("./components/StorieView").then(m => ({ default: m.StorieView })));
const EcosystemView = lazy(() => import("./components/EcosystemView").then(m => ({ default: m.EcosystemView })));

type ViewMode = "neuro" | "canvas" | "sinapsi" | "storie" | "rete";

// ─── RUOLI E NAVIGAZIONE ─────────────────────────────────────────────────────
// Ogni vista ha: ruolo operativo, quando usarla, e dove andare dopo
const VIEW_NAV: Record<ViewMode, {
  title: string;
  icon: typeof GitBranch;
  role: string;           // cosa fai qui — 1 frase
  when: string;           // quando vieni qui
  color: string;
  activeClass: string;
  crossLinks: { to: ViewMode; label: string }[];  // suggerimenti navigazione
}> = {
  canvas: {
    title: "CANVAS",
    icon: Grid3X3,
    role: "Lavora. Aggiorna stato, gestisci blockers, edita docs.",
    when: "Ogni giorno — e' il tuo banco di lavoro",
    color: "text-slate-300",
    activeClass: "bg-slate-800/60 text-slate-300 border border-slate-700",
    crossLinks: [
      { to: "neuro", label: "Esplora struttura" },
      { to: "sinapsi", label: "Scava in un progetto" },
    ],
  },
  neuro: {
    title: "MAPPA",
    icon: GitBranch,
    role: "Esplora. Naviga l'ecosistema, drill-down infinito nei nodi.",
    when: "Per orientarti o mostrare il sistema a qualcuno",
    color: "text-emerald-400",
    activeClass: "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30",
    crossLinks: [
      { to: "canvas", label: "Torna a lavorare" },
      { to: "rete", label: "Vedi connessioni" },
    ],
  },
  sinapsi: {
    title: "SINAPSI",
    icon: Layers,
    role: "Approfondisci. Ogni progetto come capitolo, con skill e proof.",
    when: "Per capire a fondo un singolo pilastro (CV, V32, MIMS...)",
    color: "text-indigo-400",
    activeClass: "bg-indigo-900/40 text-indigo-400 border border-indigo-500/30",
    crossLinks: [
      { to: "canvas", label: "Torna a lavorare" },
      { to: "storie", label: "Leggi la storia" },
    ],
  },
  storie: {
    title: "STORIE",
    icon: Mic,
    role: "Racconta. Episodi podcast + dataset LLM fine-tuning.",
    when: "Per produrre contenuti o rivedere la narrativa",
    color: "text-amber-400",
    activeClass: "bg-amber-900/40 text-amber-400 border border-amber-500/30",
    crossLinks: [
      { to: "sinapsi", label: "Dettagli progetto" },
      { to: "canvas", label: "Torna a lavorare" },
    ],
  },
  rete: {
    title: "RETE",
    icon: Globe,
    role: "Visualizza. Grafo force-directed delle connessioni tra progetti.",
    when: "Per vedere come tutto si collega e trovare dipendenze",
    color: "text-cyan-400",
    activeClass: "bg-cyan-900/40 text-cyan-400 border border-cyan-500/30",
    crossLinks: [
      { to: "neuro", label: "Drill-down nodi" },
      { to: "canvas", label: "Torna a lavorare" },
    ],
  },
};

// Ordine fisso della navigazione — CANVAS prima (e' il punto di partenza)
const VIEW_ORDER: ViewMode[] = ["canvas", "neuro", "sinapsi", "storie", "rete"];

// Clock aggiornato ogni 60s
function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-[10px] font-mono text-slate-500 tabular-nums tracking-wider">
      {now.toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
      <span className="text-slate-700 mx-1">|</span>
      {now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

function ViewLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-[10px] font-mono text-slate-600 animate-pulse">LOADING...</div>
    </div>
  );
}

// Prefetch dati per vista target
function prefetchForView(view: ViewMode) {
  const qc = queryClient;
  if (view === "canvas" || view === "sinapsi") {
    qc.prefetchQuery({ queryKey: ["md-files"], queryFn: () => fetch("/api/md-files").then(r => r.json()), staleTime: 60_000 });
  }
  if (view === "storie") {
    qc.prefetchQuery({ queryKey: ["content-files"], queryFn: () => fetch("/api/content-files").then(r => r.json()), staleTime: 60_000 });
  }
}

// ─── BARRA GUIDA ─────────────────────────────────────────────────────────────
// Mostra: ruolo della vista attiva + cross-link per navigare altrove
function GuideBar({ view, onNavigate }: { view: ViewMode; onNavigate: (v: ViewMode) => void }) {
  const nav = VIEW_NAV[view];
  return (
    <div className="flex-shrink-0 h-7 border-b border-slate-800/40 px-4 flex items-center gap-3 bg-slate-950/80">
      {/* Ruolo vista attiva */}
      <Compass size={9} className={nav.color} />
      <span className={`text-[8px] font-mono font-bold uppercase tracking-widest ${nav.color}`}>
        {nav.title}
      </span>
      <span className="text-[8px] font-mono text-slate-500">
        {nav.role}
      </span>

      {/* Cross-link suggerimenti */}
      <div className="ml-auto flex items-center gap-1">
        {nav.crossLinks.map(link => {
          const target = VIEW_NAV[link.to];
          return (
            <button
              key={link.to}
              onClick={() => onNavigate(link.to)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded border border-slate-800 text-[7px] font-mono uppercase tracking-wider transition-all hover:border-slate-600 ${target.color} opacity-60 hover:opacity-100`}
            >
              <ArrowRight size={7} />
              {link.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── INNER APP ───────────────────────────────────────────────────────────────
function AppInner() {
  const sys = useGlobalState();
  const view = useUIStore((s) => s.view) as ViewMode;
  const rawSetView = useUIStore((s) => s.setView);
  const setView = useCallback((v: ViewMode) => {
    prefetchForView(v);
    rawSetView(v);
  }, [rawSetView]);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-mono overflow-hidden">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="flex-shrink-0 h-11 border-b border-slate-800/60 px-4 flex items-center gap-4 bg-slate-950 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 border border-emerald-500/40 rounded flex items-center justify-center bg-emerald-500/5">
            <Zap size={12} className="text-emerald-400" />
          </div>
          <div className="leading-none">
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-100">TITANIUM</div>
            <div className="text-[7px] text-slate-600 tracking-[0.3em] uppercase">OS v5.0</div>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-800/60" />

        {/* Milestone + progress */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-slate-400 uppercase tracking-[0.12em]">
            {sys.activeMilestone || "loading..."}
          </span>
          <span className="text-[8px] text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">
            {sys.pct("V32")}%
          </span>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Status */}
          <div className="flex items-center gap-1.5">
            <Activity size={10} className={sys.isOnline ? "text-emerald-500" : "text-slate-600"} />
            <span className={`text-[8px] uppercase tracking-[0.2em] ${sys.isOnline ? "text-emerald-500/80" : "text-slate-600"}`}>
              {sys.isOnline ? "live" : "offline"}
            </span>
          </div>
          <Clock />

          {/* ── VIEW TOGGLE con ruolo tooltip ──────────────── */}
          <div className="flex items-center gap-0.5 border border-slate-800 rounded-lg p-0.5 ml-1">
            {VIEW_ORDER.map(id => {
              const v = VIEW_NAV[id];
              const Icon = v.icon;
              const isActive = view === id;
              return (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  title={`${v.title} — ${v.role}`}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all ${
                    isActive ? v.activeClass : "text-slate-600 hover:text-slate-400"
                  }`}
                >
                  <Icon size={9} /> {v.title}
                </button>
              );
            })}
          </div>

          {/* MATTEO link */}
          <a
            href="/matteo/index.html" target="_blank" rel="noopener"
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all text-slate-600 hover:text-violet-400 border border-transparent hover:border-violet-500/20 hover:bg-violet-900/10"
            title="MATTEO — ecosistema navigabile personale"
          >
            <Network size={9} /> MATTEO
          </a>
        </div>
      </header>

      {/* ── BARRA GUIDA ────────────────────────────────────── */}
      <GuideBar view={view} onNavigate={setView} />

      {/* ── LAYOUT ────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<ViewLoader />}>
          {view === "neuro"   && <NeuroOSLayout systemState={sys.state} />}
          {view === "canvas"  && <CanvasLayout />}
          {view === "sinapsi" && <LayersView />}
          {view === "storie"  && <StorieView />}
          {view === "rete"    && <EcosystemView systemState={sys.state} />}
        </Suspense>
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
