// CanvasLayout.tsx | TITANIUM_OS | v3.0 | 2026-03-22
// Canvas workspace — 8 celle operative, dati live da STATE.json
// v3.0: rimosso FOCUS/CICLO/V32 ridondanti → COMANDO + PILASTRI azionabili + NODI LIVE

import React, { useState, useEffect, useCallback, useRef, useMemo, useDeferredValue } from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  Zap, Layers, RefreshCw, GitBranch, Plus, Brain, Search,
  ScanLine, Radio, BookOpen, RotateCcw, Activity, X,
  FileText, Clock, ChevronRight, AlertCircle, Trash2,
  Terminal, ArrowRight,
} from "lucide-react";
import { CellShell } from "./CellShell";
import { EcoTreeView } from "./EcoTreeView";
import { AutomationsView } from "./AutomationsView";
import { NeuroMapView } from "./NeuroMapView";
import { MdManager } from "./MdManager";
import { useGlobalState } from "../hooks/SystemStateContext";
import { useUIStore } from "../stores/systemStore";


// ─── LAYOUT ──────────────────────────────────────────────────────────────────
const LAYOUT_KEY = "titanium_canvas_v7";
const ROW_H = 44;
const COLS = 12;
const MARGIN: [number, number] = [6, 6];

const DEFAULT_LAYOUT: Layout = [
  { i: "comando",     x: 0,  y: 0,  w: 5,  h: 6,  minW: 4, minH: 4 },
  { i: "nodi",        x: 5,  y: 0,  w: 4,  h: 6,  minW: 3, minH: 4 },
  { i: "pilastri",    x: 9,  y: 0,  w: 3,  h: 6,  minW: 3, minH: 4 },
  { i: "ecotree",     x: 0,  y: 6,  w: 5,  h: 9,  minW: 3, minH: 5 },
  { i: "neuromap",    x: 5,  y: 6,  w: 7,  h: 9,  minW: 4, minH: 6 },
  { i: "mente",       x: 0,  y: 15, w: 4,  h: 7,  minW: 3, minH: 5 },
  { i: "docs",        x: 4,  y: 15, w: 4,  h: 7,  minW: 3, minH: 5 },
  { i: "content",     x: 8,  y: 15, w: 4,  h: 7,  minW: 3, minH: 5 },
];

function loadLayout(): Layout {
  try {
    const s = localStorage.getItem(LAYOUT_KEY);
    return s ? JSON.parse(s) : DEFAULT_LAYOUT;
  } catch { return DEFAULT_LAYOUT; }
}

// ─── PATCH API ───────────────────────────────────────────────────────────────
const apiPatch = (body: object) =>
  fetch("/api/state", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    .then(r => r.json()).catch(() => null);

// ─── CELL: COMANDO ──────────────────────────────────────────────────────────
// Unica cella di azione: cosa fare ORA, blockers, ultima azione
function CellComando({ state, online }: { state: any; online: boolean }) {
  const [nextInput, setNextInput] = useState("");
  const [newBlocker, setNewBlocker] = useState("");

  const nextStep  = state?.next_step || "—";
  const focusToday = state?.focus_today || "—";
  const lastAction = state?.last_action || "—";
  const milestone  = state?.active_milestone || "—";
  const blockers: string[] = state?.blockers ?? [];

  const saveNext = () => { if (nextInput.trim()) { apiPatch({ next_step: nextInput.trim() }); setNextInput(""); } };
  const removeBlocker = (b: string) => apiPatch({ blockers: blockers.filter(x => x !== b) });
  const addBlocker = () => { if (newBlocker.trim()) { apiPatch({ blockers: [...blockers, newBlocker.trim()] }); setNewBlocker(""); } };

  return (
    <div className="space-y-2 text-[10px]">
      {/* Next step — il cuore */}
      <div className="bg-slate-950 border border-emerald-500/30 rounded-lg p-3">
        <div className="text-[8px] font-mono text-emerald-500/60 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <ArrowRight size={8} /> Prossima azione
        </div>
        <div className="font-mono text-emerald-400 text-[12px] font-bold leading-snug mb-2">{nextStep}</div>
        <div className="flex gap-1.5">
          <input value={nextInput} onChange={e => setNextInput(e.target.value)} onKeyDown={e => e.key === "Enter" && saveNext()}
            placeholder="Aggiorna prossimo step..." className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[9px] font-mono text-slate-300 placeholder-slate-700 focus:outline-none focus:border-emerald-500/40" />
          <button onClick={saveNext} className="px-2 py-1 border border-emerald-500/30 rounded text-emerald-400 hover:border-emerald-500/60 text-[8px] font-mono uppercase">set</button>
        </div>
      </div>

      {/* Focus oggi + milestone compatti */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2">
          <div className="text-[7px] font-mono text-slate-600 uppercase tracking-widest mb-0.5">Focus oggi</div>
          <div className="font-mono text-cyan-400 text-[9px] leading-snug">{focusToday}</div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2">
          <div className="text-[7px] font-mono text-slate-600 uppercase tracking-widest mb-0.5">Milestone</div>
          <div className="font-mono text-white text-[9px] leading-snug">{milestone}</div>
        </div>
      </div>

      {/* Blockers — editabili inline */}
      {blockers.length > 0 && (
        <div className="bg-slate-950 border border-rose-500/20 rounded-lg p-2">
          <div className="text-[7px] font-mono text-rose-400/60 uppercase tracking-widest mb-1 flex items-center gap-1">
            <AlertCircle size={7} /> Blockers
          </div>
          {blockers.map(b => (
            <div key={b} className="flex items-center gap-1.5 mb-0.5">
              <span className="font-mono text-rose-400 text-[9px] flex-1">▸ {b}</span>
              <button onClick={() => removeBlocker(b)} className="text-slate-700 hover:text-rose-400"><Trash2 size={8} /></button>
            </div>
          ))}
        </div>
      )}

      {/* Add blocker */}
      <div className="flex gap-1.5">
        <input value={newBlocker} onChange={e => setNewBlocker(e.target.value)} onKeyDown={e => e.key === "Enter" && addBlocker()}
          placeholder="+ blocker..." className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[9px] font-mono text-slate-300 placeholder-slate-700 focus:outline-none focus:border-rose-500/30" />
        <button onClick={addBlocker} className="px-1.5 py-1 border border-slate-800 rounded text-slate-600 hover:text-rose-400 hover:border-rose-500/30"><Plus size={8} /></button>
      </div>

      {/* Ultima azione + stato connessione */}
      <div className="flex items-center gap-2 text-[8px] font-mono text-slate-700">
        <span>Ultima: {lastAction}</span>
        <span className="ml-auto flex items-center gap-1">
          <div className={`w-1 h-1 rounded-full ${online ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
          {online ? "LIVE" : "OFFLINE"}
        </span>
      </div>
    </div>
  );
}

// ─── CELL: NODI LIVE ─────────────────────────────────────────────────────────
// Tutti i nodi da state.nodes con stato reale
const NODE_COLORS: Record<string, { dot: string; text: string; border: string; bg: string }> = {
  "ATTIVO":  { dot: "bg-emerald-400 animate-pulse", text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-900/10" },
  "pending": { dot: "bg-amber-400",                 text: "text-amber-400",   border: "border-amber-500/20",   bg: "bg-amber-900/5" },
  "future":  { dot: "bg-slate-600",                 text: "text-slate-500",   border: "border-slate-800",      bg: "bg-slate-900/30" },
};

function getNodeStatus(value: string): string {
  if (value.startsWith("ATTIVO")) return "ATTIVO";
  if (value.startsWith("pending")) return "pending";
  return "future";
}

function CellNodi({ state }: { state: any }) {
  const navigateTo = useUIStore(s => s.navigateTo);
  const nodes = state?.nodes ?? {};
  const entries = Object.entries(nodes) as [string, string][];

  if (entries.length === 0) return <div className="text-[9px] font-mono text-slate-600 p-2">Caricamento nodi...</div>;

  const order = { "ATTIVO": 0, "pending": 1, "future": 2 };
  const sorted = [...entries].sort((a, b) => order[getNodeStatus(a[1])] - order[getNodeStatus(b[1])]);

  const counts = { attivi: 0, pending: 0, future: 0 };
  entries.forEach(([, v]) => {
    const s = getNodeStatus(v);
    if (s === "ATTIVO") counts.attivi++;
    else if (s === "pending") counts.pending++;
    else counts.future++;
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-3 text-[8px] font-mono">
        <span className="text-emerald-400">{counts.attivi} attivi</span>
        <span className="text-amber-400">{counts.pending} pending</span>
        <span className="text-slate-600">{counts.future} future</span>
        {/* Cross-link: vai alla MAPPA per esplorare i nodi */}
        <button onClick={() => navigateTo("neuro")} className="ml-auto text-[7px] font-mono text-emerald-500/50 hover:text-emerald-400 uppercase tracking-wider flex items-center gap-0.5">
          esplora in mappa <ChevronRight size={7} />
        </button>
      </div>

      {sorted.map(([name, value]) => {
        const status = getNodeStatus(value);
        const colors = NODE_COLORS[status];
        const desc = value.includes("—") ? value.split("—").slice(1).join("—").trim() : value;

        return (
          <button key={name} onClick={() => navigateTo("neuro", name.toLowerCase())}
            className={`w-full text-left rounded-lg border p-2 ${colors.border} ${colors.bg} hover:brightness-125 transition-all cursor-pointer`}>
            <div className="flex items-center gap-2 mb-0.5">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
              <span className={`text-[10px] font-bold font-mono ${colors.text}`}>{name}</span>
              <span className="text-[7px] font-mono text-slate-700 uppercase ml-auto">{status}</span>
            </div>
            <div className="text-[8px] font-mono text-slate-500 ml-3.5 leading-snug">{desc}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─── CELL: PILASTRI (AZIONABILE) ─────────────────────────────────────────────
// Mostra COSA FARE per ogni pillar, non solo %
const PILLAR_COLORS: Record<string, { bar: string; text: string; border: string }> = {
  V32:         { bar: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/20" },
  MIMS:        { bar: "bg-amber-500",   text: "text-amber-400",   border: "border-amber-500/20" },
  GENESIS:     { bar: "bg-cyan-500",    text: "text-cyan-400",    border: "border-cyan-500/20" },
  VITA_NATURA: { bar: "bg-indigo-400",  text: "text-indigo-400",  border: "border-indigo-500/20" },
  IDENTITY:    { bar: "bg-slate-500",   text: "text-slate-400",   border: "border-slate-700" },
};

function CellPilastri({ state }: { state: any }) {
  const navigateTo = useUIStore(s => s.navigateTo);
  const pillars = state?.pillars ?? {};
  const entries = Object.entries(pillars) as [string, any][];

  if (entries.length === 0) return <div className="text-[9px] font-mono text-slate-600 p-2">Caricamento...</div>;

  // Mappa pillar ID → ID layer in SINAPSI
  const pillarToLayer: Record<string, string> = {
    V32: "v32", MIMS: "mims", GENESIS: "genesis", VITA_NATURA: "eva", IDENTITY: "cv",
  };

  return (
    <div className="space-y-1.5">
      {entries.map(([key, p]) => {
        const c = PILLAR_COLORS[key] || { bar: "bg-slate-500", text: "text-slate-400", border: "border-slate-700" };
        return (
          <button key={key}
            onClick={() => navigateTo("sinapsi", pillarToLayer[key] || key.toLowerCase())}
            className={`w-full text-left rounded-lg border p-2 ${c.border} bg-slate-950 hover:brightness-125 transition-all cursor-pointer`}
            title={`Apri ${key} in SINAPSI`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`w-1.5 h-1.5 rounded-full ${c.bar}`} />
              <span className={`text-[9px] font-bold font-mono ${c.text}`}>{key.replace("_", " ")}</span>
              <span className="text-[8px] font-mono text-slate-700 ml-auto">{p.pct_complete}%</span>
              <ChevronRight size={8} className="text-slate-700" />
            </div>
            <div className="h-0.5 bg-slate-800 rounded-full mb-1.5">
              <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${p.pct_complete}%` }} />
            </div>
            <div className="text-[8px] font-mono text-slate-400 leading-snug flex items-start gap-1">
              <ArrowRight size={7} className={`flex-shrink-0 mt-0.5 ${c.text}`} />
              <span>{p.next || p.phase || "—"}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── CELL: RICERCA + DECISIONI ──────────────────────────────────────────────
// Search semantico + ultime decisioni dal MENTE_SCANNER
function CellMente() {
  const navigateTo = useUIStore(s => s.navigateTo);
  const [digest, setDigest] = useState<Record<string, any> | null>(null);
  const [scanning, setScanning] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [searching, setSearching] = useState(false);

  const loadDigest = useCallback(() => {
    fetch("/api/digest").then(r => r.ok ? r.json() : Promise.reject()).then(setDigest).catch(() => setDigest(null));
  }, []);

  useEffect(() => { loadDigest(); }, [loadDigest]);

  const scanNow = async () => { setScanning(true); try { await fetch("/api/scan", { method: "POST" }); await loadDigest(); } finally { setScanning(false); } };
  const doSearch = async (q: string) => {
    if (!q.trim()) { setResults(null); return; }
    setSearching(true);
    try { const r = await fetch(`/api/digest/search?q=${encodeURIComponent(q)}`); const d = await r.json(); setResults(d.results ?? []); } finally { setSearching(false); }
  };

  // Top decisions da digest
  const topDecisions: string[] = [];
  if (digest?.by_file) {
    for (const f of digest.by_file) {
      for (const d of (f.extracts?.decisions ?? [])) {
        if (!topDecisions.includes(d)) topDecisions.push(d);
        if (topDecisions.length >= 6) break;
      }
      if (topDecisions.length >= 6) break;
    }
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Search */}
      <div className="flex gap-1.5 flex-shrink-0">
        <div className="flex-1 flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 focus-within:border-cyan-500/50">
          <Search size={10} className="text-slate-600 flex-shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && doSearch(query)}
            placeholder="cerca decisioni, spec..." className="flex-1 bg-transparent text-[10px] font-mono text-slate-300 placeholder:text-slate-700 outline-none" />
          {query && <button onClick={() => { setQuery(""); setResults(null); }} className="text-slate-600 hover:text-slate-400"><X size={9} /></button>}
        </div>
        <button onClick={() => doSearch(query)} disabled={!query.trim() || searching}
          className="px-2 py-1.5 bg-cyan-900/20 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 rounded-lg text-[9px] font-mono uppercase tracking-wider disabled:opacity-30">
          {searching ? "..." : "cerca"}
        </button>
      </div>

      {/* Results / decisions */}
      <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
        {results !== null ? (
          results.length === 0 ? <div className="text-[9px] font-mono text-slate-600 p-2">Nessun risultato</div>
          : results.map((r, i) => (
            <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg p-2">
              <div className="text-[8px] font-mono text-cyan-400 truncate mb-1">{r.file}</div>
              {r.hits.slice(0, 3).map((h: any, j: number) => (
                <div key={j} className="flex gap-1.5 items-start">
                  <span className="text-[7px] font-mono text-slate-700 uppercase flex-shrink-0">{h.category}</span>
                  <span className="text-[9px] font-mono text-slate-400 leading-snug">{h.text}</span>
                </div>
              ))}
            </div>
          ))
        ) : topDecisions.length > 0 ? topDecisions.map((d, i) => (
          <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5">
            <div className="text-[9px] font-mono text-slate-400 leading-snug">{d}</div>
          </div>
        )) : (
          <div className="text-[9px] font-mono text-slate-600 p-2 text-center">
            {digest ? "Nessuna decisione estratta" : "Digest non disponibile"}
          </div>
        )}
      </div>

      {/* Scan + cross-link */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={scanNow} disabled={scanning}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-900/20 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 rounded-lg text-[9px] font-mono uppercase tracking-wider disabled:opacity-50">
          <ScanLine size={10} className={scanning ? "animate-pulse" : ""} />
          {scanning ? "scanning..." : "scan"}
        </button>
        {digest && (
          <span className="text-[8px] font-mono text-slate-700">
            {digest.files_read ?? 0} file · {digest.global_summary?.total_extractions ?? 0} estrazioni
          </span>
        )}
        <button onClick={() => navigateTo("rete")} className="ml-auto text-[7px] font-mono text-cyan-500/50 hover:text-cyan-400 uppercase tracking-wider flex items-center gap-0.5">
          vedi rete <ChevronRight size={7} />
        </button>
      </div>
    </div>
  );
}

// ─── CELL: CONTENT ENGINE ────────────────────────────────────────────────────
// Episodi tracker con frontmatter YAML — tab per stagione, badge status
const EP_STATUS: Record<string, { text: string; border: string; bg: string }> = {
  pubblicato: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-900/10" },
  finale:     { text: "text-cyan-400",    border: "border-cyan-500/30",    bg: "bg-cyan-900/10" },
  bozza:      { text: "text-amber-400",   border: "border-amber-500/20",   bg: "bg-amber-900/5" },
};
function epStatus(s: string) { return EP_STATUS[s?.toLowerCase()] ?? { text: "text-slate-500", border: "border-slate-700", bg: "" }; }

function CellContentEngine() {
  const navigateTo = useUIStore(s => s.navigateTo);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [activeSt, setActiveSt] = useState<string>("tutti");

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/content-files").then(r => r.json())
      .then(d => { if (d.ok) setFiles(d.files); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openFile = (f: any) => {
    setSelected(f); setContent(null);
    fetch(`/api/file?path=${encodeURIComponent(f.path)}`).then(r => r.json())
      .then(d => { if (d.ok) setContent(d.content); })
      .catch(() => setContent("Errore lettura file"));
  };

  // Tab per stagione, con conteggi
  const stagioni = ["tutti", ...Array.from(new Set(
    files.map(f => f.meta?.stagione).filter(Boolean)
  )).sort()];
  const stLabel: Record<string, string> = {};
  for (const f of files) {
    if (f.meta?.stagione && f.meta?.stagione_label && !stLabel[f.meta.stagione])
      stLabel[f.meta.stagione] = f.meta.stagione_label;
  }
  const stCounts: Record<string, number> = { tutti: files.length };
  for (const f of files) {
    const s = f.meta?.stagione;
    if (s) stCounts[s] = (stCounts[s] || 0) + 1;
  }

  const visible = activeSt === "tutti" ? files : files.filter(f => f.meta?.stagione === activeSt);

  // Vista dettaglio episodio
  if (selected) return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-amber-400 text-[9px] font-mono">← episodi</button>
        <span className="text-[9px] font-mono text-amber-500/70 flex-shrink-0">{selected.meta?.id || ""}</span>
        <span className="text-[8px] font-mono text-slate-700 ml-auto">{selected.size_kb}kb</span>
      </div>
      {/* Metadati frontmatter */}
      {selected.meta?.title && (
        <div className="bg-slate-950 border border-amber-500/20 rounded-lg p-2.5 flex-shrink-0">
          <div className="text-[11px] font-mono text-amber-300 font-bold leading-snug mb-0.5">{selected.meta.title}</div>
          {selected.meta.sottotitolo && <div className="text-[8px] font-mono text-slate-500 leading-snug mb-1.5">{selected.meta.sottotitolo}</div>}
          <div className="flex items-center gap-2 flex-wrap">
            {selected.meta.status && (() => { const sc = epStatus(selected.meta.status); return (
              <span className={`text-[7px] font-mono uppercase px-1.5 py-0.5 rounded border ${sc.text} ${sc.border} ${sc.bg}`}>{selected.meta.status}</span>
            ); })()}
            {selected.meta.data_evento && <span className="text-[8px] font-mono text-slate-600">{selected.meta.data_evento}</span>}
            {selected.meta.stagione_label && <span className="text-[7px] font-mono text-slate-700 ml-auto">{selected.meta.stagione_label}</span>}
          </div>
        </div>
      )}
      {content === null
        ? <div className="text-[9px] font-mono text-slate-600 animate-pulse flex-1">caricamento...</div>
        : <pre className="flex-1 overflow-y-auto bg-slate-950 border border-slate-800 rounded-lg p-3 text-[9px] font-mono text-slate-300 whitespace-pre-wrap break-words leading-relaxed">{content.slice(0, 8000)}</pre>
      }
    </div>
  );

  // Vista lista episodi
  return (
    <div className="flex flex-col h-full gap-2">
      {/* Header + cross-link */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-[8px] font-mono text-slate-600">{visible.length} ep</span>
        <button onClick={() => navigateTo("storie")} className="ml-auto text-[7px] font-mono text-amber-500/50 hover:text-amber-400 uppercase tracking-wider flex items-center gap-0.5">
          vista completa <ChevronRight size={7} />
        </button>
        <button onClick={load} disabled={loading} className="text-slate-600 hover:text-amber-400">
          <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Tab stagioni */}
      <div className="flex gap-1 flex-wrap flex-shrink-0">
        {stagioni.map(st => (
          <button key={st} onClick={() => setActiveSt(st)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wide transition-all ${
              activeSt === st
                ? "bg-amber-900/40 text-amber-400 border border-amber-500/30"
                : "text-slate-600 hover:text-slate-400 border border-slate-800"
            }`}>
            {stLabel[st] ? stLabel[st].split(" ").slice(0, 2).join(" ") : st}
            <span className="ml-1 opacity-50 text-[7px]">{stCounts[st] || 0}</span>
          </button>
        ))}
      </div>

      {/* Lista episodi */}
      <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
        {loading && <div className="text-[9px] font-mono text-slate-600 p-2 animate-pulse">caricamento...</div>}
        {!loading && visible.length === 0 && (
          <div className="text-[9px] font-mono text-slate-600 p-2 text-center">Nessun episodio</div>
        )}
        {visible.map(f => {
          const sc = epStatus(f.meta?.status);
          return (
            <button key={f.path} onClick={() => openFile(f)}
              className="w-full text-left flex items-start gap-2 px-2.5 py-2 rounded-lg border border-slate-800 hover:border-amber-500/30 hover:bg-amber-900/5 transition-all group">
              {/* ID badge */}
              <span className="text-[7px] font-mono text-amber-600/70 font-bold flex-shrink-0 w-14 truncate leading-snug mt-0.5">
                {f.meta?.id || f.name.split(".")[0].slice(0, 8)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-slate-200 truncate group-hover:text-amber-300 leading-snug">
                  {f.meta?.title || f.name}
                </div>
                {f.meta?.sottotitolo && (
                  <div className="text-[8px] font-mono text-slate-600 truncate leading-snug">{f.meta.sottotitolo}</div>
                )}
                <div className="flex items-center gap-1.5 mt-0.5">
                  {f.meta?.status && (
                    <span className={`text-[7px] font-mono uppercase px-1 py-0.5 rounded border leading-none ${sc.text} ${sc.border}`}>
                      {f.meta.status}
                    </span>
                  )}
                  {f.meta?.data_evento && (
                    <span className="text-[7px] font-mono text-slate-700">{f.meta.data_evento}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── EXPORTS PER NEUROOSLAYOUT (wrapper standalone) ──────────────────────────
// Vecchi nomi mantenuti per backward-compat con NeuroOSLayout
// CICLO_STEPS mantenuto per eventuale uso esterno
export const CICLO_STEPS = [
  { id: "build", label: "COSTRUISCI", color: "text-emerald-400", border: "border-emerald-500/50", bg: "bg-emerald-900/20" },
  { id: "doc",   label: "DOCUMENTA",  color: "text-cyan-400",    border: "border-cyan-500/50",    bg: "bg-cyan-900/20" },
  { id: "teach", label: "INSEGNA",    color: "text-cyan-400",    border: "border-cyan-500/30",    bg: "bg-cyan-900/10" },
  { id: "unlock",label: "SBLOCCA",    color: "text-indigo-400",  border: "border-indigo-500/50",  bg: "bg-indigo-900/20" },
];

export function CellFocusStandalone() {
  const { state, isOnline } = useGlobalState();
  return <CellComando state={state} online={isOnline} />;
}
export function CellCicloStandalone() {
  const { state } = useGlobalState();
  return <CellComando state={state} online={true} />;
}
export function CellPillarsStandalone() {
  const { state } = useGlobalState();
  return <CellPilastri state={state} />;
}
export function CellV32Standalone() {
  const { state } = useGlobalState();
  return <CellPilastri state={state} />;
}
export function CellEcoTree() {
  return <div className="h-full flex flex-col gap-2"><div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Architettura progetto</div><div className="flex-1 min-h-0"><EcoTreeView /></div></div>;
}
export function CellAutomazioni() {
  return <div className="h-full flex flex-col gap-2"><div className="flex-1 min-h-0 overflow-hidden"><AutomationsView /></div></div>;
}
export { CellMente, CellContentEngine };

// Dati pillar per NeuroOSLayout sidebar
export const PILLARS_DATA = [
  { label: "V32",         pct: 65, bar: "bg-emerald-500", note: "CNC in costruzione — fresa stampi", atto: "II" },
  { label: "MIMS",        pct: 30, bar: "bg-amber-500",   note: "Attende V32→VULCAN",               atto: "III" },
  { label: "GENESIS",     pct: 40, bar: "bg-cyan-500",    note: "3/3 nodi attivi",                   atto: "V" },
  { label: "VITA NATURA", pct: 40, bar: "bg-indigo-400",  note: "EVA pilot",                         atto: "IV" },
  { label: "IDENTITY",    pct: 20, bar: "bg-slate-500",   note: "CV + LinkedIn",                     atto: "—" },
];

// ─── QUICK ACTIONS ────────────────────────────────────────────────────────────
type QAStatus = "idle" | "loading" | "ok" | "err";
interface QA { id: string; label: string; desc: string; icon: React.ElementType; color: string; endpoint: string; method?: string }

const QA_ACTIONS: QA[] = [
  { id: "scan",    label: "Scan MENTE",    desc: "Scansiona file e aggiorna digest",  icon: ScanLine,    color: "text-emerald-400 border-emerald-500/30", endpoint: "/api/scan" },
  { id: "rag",     label: "RAG Rebuild",   desc: "Ricostruisce indice ChromaDB",       icon: RefreshCw,   color: "text-cyan-400 border-cyan-500/30",     endpoint: "/api/rag/rebuild" },
  { id: "brief",   label: "Daily Brief",   desc: "Genera brief giornaliero",           icon: FileText,    color: "text-indigo-400 border-indigo-500/30",  endpoint: "/api/daily-brief" },
  { id: "health",  label: "API Health",    desc: "Verifica stato server",              icon: Activity,    color: "text-slate-400 border-slate-700",       endpoint: "/api/health", method: "GET" },
];

function QuickActionsBar() {
  const [statuses, setStatuses] = useState<Record<string, QAStatus>>({});
  const [msgs, setMsgs] = useState<Record<string, string>>({});

  const run = async (qa: QA) => {
    setStatuses(s => ({ ...s, [qa.id]: "loading" }));
    try {
      const r = await fetch(qa.endpoint, {
        method: qa.method || "POST",
        headers: { "Content-Type": "application/json" },
        body: qa.method === "GET" ? undefined : "{}",
      });
      const data = await r.json().catch(() => ({}));
      setStatuses(s => ({ ...s, [qa.id]: r.ok ? "ok" : "err" }));
      setMsgs(s => ({ ...s, [qa.id]: data.message || data.error || (r.ok ? "OK" : `${r.status}`) }));
    } catch {
      setStatuses(s => ({ ...s, [qa.id]: "err" }));
      setMsgs(s => ({ ...s, [qa.id]: "offline" }));
    }
    setTimeout(() => setStatuses(s => ({ ...s, [qa.id]: "idle" })), 2500);
  };

  return (
    <div className="flex items-center gap-1.5">
      {QA_ACTIONS.map(qa => {
        const Icon = qa.icon;
        const st = statuses[qa.id] || "idle";
        const isLoading = st === "loading";
        const isDone = st === "ok";
        const isErr = st === "err";
        return (
          <button key={qa.id} onClick={() => run(qa)} title={qa.desc} disabled={isLoading}
            className={`qa-btn ${qa.color} bg-slate-900/60 hover:bg-slate-800 disabled:opacity-50`}
          >
            <Icon size={9} className={isLoading ? "animate-spin" : isDone ? "text-emerald-400" : isErr ? "text-rose-400" : ""} />
            <span className={isDone ? "text-emerald-400" : isErr ? "text-rose-400" : ""}>
              {isLoading ? "..." : isDone ? (msgs[qa.id] || "OK") : isErr ? (msgs[qa.id] || "ERR") : qa.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── CANVAS LAYOUT ───────────────────────────────────────────────────────────
export function CanvasLayout() {
  const { state, isOnline: online } = useGlobalState();
  const [layout, setLayout] = useState<Layout>(loadLayout);
  const [containerWidth, setContainerWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateDate = state?.last_update || "";

  // Debounce ResizeObserver — non settare ogni pixel durante drag finestra
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const obs = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      clearTimeout(timer);
      timer = setTimeout(() => setContainerWidth(w), 80);
    });
    obs.observe(el);
    setContainerWidth(el.clientWidth);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  // Debounce localStorage — non scrivere ad ogni pixel di drag cella
  const saveLayoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onLayoutChange = useCallback((l: Layout) => {
    setLayout(l);
    if (saveLayoutTimer.current) clearTimeout(saveLayoutTimer.current);
    saveLayoutTimer.current = setTimeout(() => {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(l));
    }, 400);
  }, []);
  const resetLayout = () => { setLayout(DEFAULT_LAYOUT); localStorage.setItem(LAYOUT_KEY, JSON.stringify(DEFAULT_LAYOUT)); };

  // Memoize config objects — evita nuovi oggetti ad ogni render
  const gridConfig = useMemo(() => ({ cols: COLS, rowHeight: ROW_H, margin: MARGIN }), []);
  const dragConfig = useMemo(() => ({ handle: ".cell-drag-handle" }), []);
  const resizeConfig = useMemo(() => ({ handles: ["se"] as ["se"] }), []);

  // useDeferredValue per width — GridLayout non blocca render prioritari
  const deferredWidth = useDeferredValue(containerWidth);

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto overflow-x-hidden px-2 pb-6">
      <div className="flex items-center justify-between pt-1.5 pb-1 px-1">
        <QuickActionsBar />
        <button onClick={resetLayout} className="text-[8px] font-mono text-slate-700 hover:text-emerald-400 uppercase tracking-widest transition-colors flex items-center gap-1">
          <RotateCcw size={8} /> reset layout
        </button>
      </div>
      <GridLayout layout={layout} width={deferredWidth - 16}
        gridConfig={gridConfig}
        dragConfig={dragConfig}
        resizeConfig={resizeConfig}
        onLayoutChange={onLayoutChange}>

        {/* Row 1: Azione + Infrastruttura + Progetti */}
        <div key="comando"><CellShell title="AZIONE · COSA FARE ORA" icon={<Terminal size={11} />} color="emerald" mono={online ? "LIVE" : "OFFLINE"} lastUpdated={stateDate}><CellComando state={state} online={online} /></CellShell></div>
        <div key="nodi"><CellShell title="NODI · INFRASTRUTTURA" icon={<Zap size={11} />} color="amber" mono={`${Object.values(state?.nodes ?? {}).filter((n: any) => String(n).startsWith("ATTIVO")).length} attivi`} lastUpdated={stateDate}><CellNodi state={state} /></CellShell></div>
        <div key="pilastri"><CellShell title="PROGETTI · CLICK PER DETTAGLI" icon={<Layers size={11} />} color="indigo" lastUpdated={stateDate}><CellPilastri state={state} /></CellShell></div>

        {/* Row 2: Architettura + Intelligence */}
        <div key="ecotree"><CellShell title="ARCHITETTURA · FILE SYSTEM" icon={<GitBranch size={11} />} color="cyan" noPad lastUpdated={stateDate}><div className="p-3 h-full"><EcoTreeView /></div></CellShell></div>
        <div key="neuromap"><CellShell title="INTELLIGENCE · MENTE SCANNER" icon={<Activity size={11} />} color="indigo" noPad lastUpdated={stateDate}><div className="p-3 h-full overflow-hidden flex flex-col min-h-0"><NeuroMapView /></div></CellShell></div>

        {/* Row 3: Ricerca + Knowledge + Contenuti */}
        <div key="mente"><CellShell title="RICERCA · DECISIONI" icon={<Brain size={11} />} color="cyan" lastUpdated={stateDate}><CellMente /></CellShell></div>
        <div key="docs"><CellShell title="KNOWLEDGE · DOCS" icon={<BookOpen size={11} />} color="amber" lastUpdated={stateDate}><MdManager /></CellShell></div>
        <div key="content"><CellShell title="CONTENUTI · EPISODI" icon={<Radio size={11} />} color="amber" lastUpdated={stateDate}><CellContentEngine /></CellShell></div>
      </GridLayout>
    </div>
  );
}
