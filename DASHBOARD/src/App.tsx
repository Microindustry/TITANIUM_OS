// App.tsx | TITANIUM_OS | v3.2 | 2026-03-18
// Shell principale: Header industriale + EcosystemLayout

import { useEffect, useState } from "react";
import { Activity, Zap, Grid3X3, GitBranch, Layers, Info, Network, Mic } from "lucide-react";
import { useSystemState } from "./hooks/useSystemState";
import { NeuroOSLayout } from "./components/NeuroOSLayout";
import { CanvasLayout } from "./components/CanvasLayout";
import LayersView from "./components/LayersView";
import { StorieView } from "./components/StorieView";

// Persiste la scelta di view tra sessioni
const VIEW_KEY = "titanium_view_mode";
type ViewMode = "neuro" | "canvas" | "sinapsi" | "storie";

// ─── VIEW STORY ─────────────────────────────────────────────────────────────
const VIEW_STORIES: Record<ViewMode, { title: string; tagline: string; body: string; color: string; accent: string }> = {
  neuro: {
    title:   "MAPPA",
    tagline: "l'ecosistema come mappa neurale",
    body:    "Tutto il sistema in un'unica vista esplorabile. Ogni nodo è un progetto — click per entrare, ∞ livelli di profondità. Le linee sono sinapsi: connessioni reali tra le parti del sistema. Drill-down fino al dettaglio più piccolo.",
    color:   "text-emerald-400",
    accent:  "border-emerald-500/30 bg-emerald-900/10",
  },
  canvas: {
    title:   "CANVAS",
    tagline: "il workspace da lavoro quotidiano",
    body:    "Pannelli drag-and-drop liberi. Ogni cella è uno strumento operativo: V32, milestone, automazioni, EcoTree, docs. Ridimensionabili, riposizionabili. La macchina da lavoro del sistema.",
    color:   "text-slate-300",
    accent:  "border-slate-700/40 bg-slate-800/10",
  },
  sinapsi: {
    title:   "SINAPSI",
    tagline: "il sistema nervoso del progetto",
    body:    "Vista verticale a layer. Ogni scheda è un capitolo navigabile: CV, VULCAN, MIMS, EVA, GENESIS, CONTENT. Drill-in con animazione stagger. Il modo più diretto per scavare dentro un singolo progetto.",
    color:   "text-indigo-400",
    accent:  "border-indigo-500/30 bg-indigo-900/10",
  },
  storie: {
    title:   "STORIE",
    tagline: "podcast + dataset LLM · dal passato a oggi",
    body:    "Ogni evento rilevante del progetto diventa un episodio. Formato storytelling per podcast. Dataset strutturato per fine-tuning del tuo LLM. 14 episodi · 3 stagioni · Le Origini → Il Presente → Il Sistema.",
    color:   "text-amber-400",
    accent:  "border-amber-500/30 bg-amber-900/10",
  },
};

function ViewStoryCard({ view }: { view: ViewMode }) {
  const [open, setOpen] = useState(false);
  const current = VIEW_STORIES[view];

  return (
    <div className="relative flex items-center">
      {/* Badge inline — mostra tagline vista corrente */}
      <div
        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border cursor-pointer transition-all duration-200 ${current.accent} hover:opacity-90`}
        onClick={() => setOpen(v => !v)}
      >
        <Info size={8} className={current.color} />
        <span className={`text-[7px] font-mono tracking-[0.15em] uppercase ${current.color} opacity-70`}>
          {current.tagline}
        </span>
      </div>

      {/* Popup storytelling */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 z-50 w-[340px] rounded-xl border border-slate-700/60 bg-slate-950 shadow-2xl shadow-black/60 overflow-hidden">
            {/* Header popup */}
            <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-900/40">
              <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Le 3 viste del sistema</div>
              <div className="text-[9px] font-mono text-slate-400">Stessa architettura, prospettive diverse.</div>
            </div>

            {/* Tre blocchi storytelling */}
            {(["neuro","canvas","sinapsi","storie"] as ViewMode[]).map(v => {
              const s = VIEW_STORIES[v];
              const isActive = v === view;
              return (
                <div key={v} className={`px-4 py-3 border-b border-slate-800/40 last:border-0 transition-colors ${isActive ? s.accent : "hover:bg-slate-900/30"}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    {v === "neuro"   && <GitBranch size={9} className={s.color} />}
                    {v === "canvas"  && <Grid3X3   size={9} className={s.color} />}
                    {v === "sinapsi" && <Layers    size={9} className={s.color} />}
                    {v === "storie"  && <Mic       size={9} className={s.color} />}
                    <span className={`text-[9px] font-bold font-mono uppercase tracking-widest ${s.color}`}>{s.title}</span>
                    <span className="text-[7px] font-mono text-slate-600 italic">{s.tagline}</span>
                    {isActive && <span className="ml-auto text-[6px] font-mono text-slate-600 border border-slate-700 rounded px-1 py-0.5 uppercase">attiva</span>}
                  </div>
                  <p className="text-[8px] font-mono text-slate-500 leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-[10px] font-mono text-slate-500 tabular-nums tracking-wider">
      {now.toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
      <span className="text-slate-700 mx-1">|</span>
      {now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

export default function App() {
  const sys = useSystemState();
  const [view, setView] = useState<ViewMode>(() => {
    const saved = localStorage.getItem(VIEW_KEY);
    if (saved === "layers") return "sinapsi";
    return (saved as ViewMode) ?? "neuro";
  });

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-mono overflow-hidden">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="flex-shrink-0 h-11 border-b border-slate-800/60 px-4 flex items-center gap-4 bg-slate-950 relative">
        {/* Accent line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 border border-emerald-500/40 rounded flex items-center justify-center bg-emerald-500/5">
            <Zap size={12} className="text-emerald-400" />
          </div>
          <div className="leading-none">
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-100">TITANIUM</div>
            <div className="text-[7px] text-slate-600 tracking-[0.3em] uppercase">OS v2.1</div>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-800/60" />

        {/* Milestone */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-slate-400 uppercase tracking-[0.12em]">
            {sys.activeMilestone || "loading..."}
          </span>
          <span className="text-[8px] text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">{sys.pct("V32")}%</span>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Activity size={10} className="text-emerald-500" />
            <span className="text-[8px] text-emerald-500/80 uppercase tracking-[0.2em]">live</span>
          </div>
          <Clock />
          <span className="text-[7px] text-slate-600 border border-slate-800/60 rounded px-1.5 py-0.5 tracking-wider">
            ASSOLUTO V6
          </span>

          {/* ── VIEW TOGGLE ───────────────────────────────── */}
          <div className="flex items-center gap-0.5 border border-slate-800 rounded-lg p-0.5 ml-2">
            <button
              onClick={() => { setView("neuro"); localStorage.setItem(VIEW_KEY, "neuro"); }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all ${
                view === "neuro"
                  ? "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-600 hover:text-slate-400"
              }`}
              title="Neuro-mappa navigabile"
            >
              <GitBranch size={9} /> MAPPA
            </button>
            <button
              onClick={() => { setView("canvas"); localStorage.setItem(VIEW_KEY, "canvas"); }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all ${
                view === "canvas"
                  ? "bg-slate-800/60 text-slate-300 border border-slate-700"
                  : "text-slate-600 hover:text-slate-400"
              }`}
              title="Canvas drag libero"
            >
              <Grid3X3 size={9} /> CANVAS
            </button>
            <button
              onClick={() => { setView("sinapsi"); localStorage.setItem(VIEW_KEY, "sinapsi"); }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all ${
                view === "sinapsi"
                  ? "bg-indigo-900/40 text-indigo-400 border border-indigo-500/30"
                  : "text-slate-600 hover:text-slate-400"
              }`}
              title="SINAPSI — sistema nervoso del progetto"
            >
              <Layers size={9} /> SINAPSI
            </button>
            <button
              onClick={() => { setView("storie"); localStorage.setItem(VIEW_KEY, "storie"); }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all ${
                view === "storie"
                  ? "bg-amber-900/40 text-amber-400 border border-amber-500/30"
                  : "text-slate-600 hover:text-slate-400"
              }`}
              title="STORIE — podcast + dataset LLM"
            >
              <Mic size={9} /> STORIE
            </button>
          </div>

          {/* ── MATTEO LINK ──────────────────────────────── */}
          <a
            href="/matteo/index.html" target="_blank" rel="noopener"
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all text-slate-600 hover:text-violet-400 border border-transparent hover:border-violet-500/20 hover:bg-violet-900/10"
            title="MATTEO — ecosistema navigabile personale"
          >
            <Network size={9} /> MATTEO
          </a>

          {/* ── VIEW STORY CARD ───────────────────────────── */}
          <ViewStoryCard view={view} />
        </div>
      </header>

      {/* ── LAYOUT ────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        {view === "neuro"   && <NeuroOSLayout systemState={sys.state} />}
        {view === "canvas"  && <CanvasLayout />}
        {view === "sinapsi" && <LayersView />}
        {view === "storie"  && <StorieView />}
      </div>
    </div>
  );
}
