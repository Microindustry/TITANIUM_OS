// CanvasLayout.tsx | TITANIUM_OS | v1.1 | 2026-03-16
// Canvas gestionale stile n8n — tutte le caselle sempre visibili, draggable, resizable
// Rimpiazza EcosystemLayout. Niente sidebar, niente nav fisso.

import { useState, useEffect, useCallback, useRef } from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  Cpu, Target, Layers, RefreshCw, GitBranch,
  Zap, Play, CheckCircle2, Trash2,
  AlertCircle, Activity, X, Hammer, BookOpen,
  Unlock, TrendingUp, Package, RotateCcw,
  Terminal, Plus, ChevronRight,
  Brain, Search, ScanLine, Radio, FileText, Clock, ExternalLink,
} from "lucide-react";

import { CellShell } from "./CellShell";
import { EcoTreeView } from "./EcoTreeView";
import { AutomationsView } from "./AutomationsView";
import { NeuroMapView } from "./NeuroMapView";
import { MdManager } from "./MdManager";
import { StatBlock, Progress, CheckItem, ScrollArea } from "./UIComponents";

// ─── LAYOUT STORAGE ───────────────────────────────────────────────────────────
const LAYOUT_KEY = "titanium_canvas_v5"; // v5: aggiunta cella content engine
const ROW_H = 44;
const COLS = 12;
const MARGIN: [number, number] = [6, 6];

const DEFAULT_LAYOUT: Layout[] = [
  { i: "focus",       x: 0, y: 0,  w: 4,  h: 6,  minW: 3, minH: 4 },
  { i: "ciclo",       x: 4, y: 0,  w: 5,  h: 6,  minW: 4, minH: 5 },
  { i: "pillars",     x: 9, y: 0,  w: 3,  h: 6,  minW: 2, minH: 4 },
  { i: "v32",         x: 0, y: 6,  w: 4,  h: 8,  minW: 3, minH: 5 },
  { i: "ecotree",     x: 4, y: 6,  w: 4,  h: 8,  minW: 3, minH: 5 },
  { i: "neuromap",    x: 8, y: 6,  w: 4,  h: 8,  minW: 3, minH: 6 },
  { i: "automazioni", x: 0, y: 14, w: 7,  h: 6,  minW: 5, minH: 4 },
  { i: "mente",       x: 7, y: 14, w: 5,  h: 6,  minW: 3, minH: 5 },
  { i: "docs",        x: 0, y: 20, w: 8,  h: 8,  minW: 6, minH: 6 },
  { i: "content",     x: 8, y: 20, w: 4,  h: 8,  minW: 3, minH: 5 },
];

function loadLayout(): Layout[] {
  try {
    const s = localStorage.getItem(LAYOUT_KEY);
    return s ? JSON.parse(s) : DEFAULT_LAYOUT;
  } catch {
    return DEFAULT_LAYOUT;
  }
}

// ─── CICLO STEPS + ICONE ─────────────────────────────────────────────────────
const CICLO_ICONS: Record<string, React.ElementType> = {
  build:    Hammer,
  doc:      BookOpen,
  teach:    Play,
  unlock:   Unlock,
  design:   Layers,
  produce:  Cpu,
  sell:     TrendingUp,
  reinvest: RefreshCw,
};

export const CICLO_STEPS = [
  { id: "build",    label: "COSTRUISCI", color: "text-emerald-400", border: "border-emerald-500/50", bg: "bg-emerald-900/20" },
  { id: "doc",      label: "DOCUMENTA",  color: "text-cyan-400",    border: "border-cyan-500/50",    bg: "bg-cyan-900/20"    },
  { id: "teach",    label: "INSEGNA",    color: "text-cyan-400",    border: "border-cyan-500/30",    bg: "bg-cyan-900/10"    },
  { id: "unlock",   label: "SBLOCCA",    color: "text-indigo-400",  border: "border-indigo-500/50",  bg: "bg-indigo-900/20"  },
  { id: "design",   label: "PROGETTA",   color: "text-indigo-400",  border: "border-indigo-500/30",  bg: "bg-indigo-900/10"  },
  { id: "produce",  label: "PRODUCI",    color: "text-amber-400",   border: "border-amber-500/50",   bg: "bg-amber-900/20"   },
  { id: "sell",     label: "VENDI",      color: "text-amber-400",   border: "border-amber-500/30",   bg: "bg-amber-900/10"   },
  { id: "reinvest", label: "REINVESTI",  color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-900/10" },
];

// ─── PILLARS ──────────────────────────────────────────────────────────────────
export const PILLARS_DATA = [
  { label: "V32",         pct: 65, bar: "bg-emerald-500", note: "Config G rinforzi", atto: "II" },
  { label: "MIMS",        pct: 30, bar: "bg-amber-500",   note: "Attende pressa",    atto: "III" },
  { label: "GENESIS",     pct: 10, bar: "bg-cyan-500",    note: "OS setup",          atto: "V" },
  { label: "VITA NATURA", pct: 40, bar: "bg-indigo-400",  note: "EVA pilot",         atto: "IV" },
  { label: "IDENTITY",    pct: 20, bar: "bg-slate-500",   note: "CV + LinkedIn",     atto: "—" },
];

// ─── CELL: FOCUS + AUTOMAZIONE ATTIVA ────────────────────────────────────────
export function CellFocus() {
  const [state, setState] = useState<Record<string, any> | null>(null);
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/state")
      .then((r) => r.json())
      .then((d) => { setState(d); setApiOk(true); })
      .catch(() => setApiOk(false));
  }, []);

  const milestone = state?.active_milestone || "—";
  const nextStep  = state?.next_step        || "—";
  const focus     = state?.focus_today      || "—";
  const blockers: string[] = state?.blockers ?? [];
  const updated   = state?.last_update ? new Date(state.last_update).toLocaleString("it-IT") : "—";
  const sessions  = state?.session_count ?? 0;

  // Mini flow: watcher → state_updater → watchdog → api
  const FLOW_NODES = [
    { label: "watcher",       ok: apiOk },
    { label: "state_updater", ok: apiOk },
    { label: "watchdog",      ok: apiOk },
    { label: "api :5001",     ok: apiOk },
  ];

  return (
    <div className="space-y-2.5 text-[10px]">
      {/* Milestone */}
      <div className="bg-slate-950 border border-cyan-500/20 rounded-lg p-2.5">
        <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Milestone attiva</div>
        <div className="text-sm font-bold text-cyan-400 leading-tight">{milestone}</div>
        <div className="text-[8px] font-mono text-slate-600 mt-1">{updated} · {sessions} sessioni</div>
      </div>

      {/* Next step */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
        <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Prossimo step</div>
        <div className="font-mono text-white leading-snug">▸ {nextStep}</div>
      </div>

      {/* Focus */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
        <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Focus oggi</div>
        <div className="font-mono text-emerald-400">{focus}</div>
      </div>

      {/* Blockers */}
      {blockers.length > 0 && (
        <div className="bg-slate-950 border border-rose-500/20 rounded-lg p-2.5">
          <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1">
            <AlertCircle size={8} className="text-rose-400" /> Blockers
          </div>
          {blockers.map((b) => (
            <div key={b} className="font-mono text-rose-400">▸ {b}</div>
          ))}
        </div>
      )}

      {/* Mini automation flow */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
        <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-2">Pipeline attiva</div>
        <div className="flex items-center gap-1">
          {FLOW_NODES.map((n, i) => (
            <div key={n.label} className="flex items-center gap-1">
              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8px] font-mono ${
                n.ok === true  ? "border-emerald-500/40 bg-emerald-900/20 text-emerald-400" :
                n.ok === false ? "border-rose-500/30 bg-rose-900/10 text-rose-400" :
                                 "border-slate-700 bg-slate-900 text-slate-600"
              }`}>
                <div className={`w-1 h-1 rounded-full ${
                  n.ok === true ? "bg-emerald-400 animate-pulse" :
                  n.ok === false ? "bg-rose-500" : "bg-slate-600"
                }`} />
                {n.label}
              </div>
              {i < FLOW_NODES.length - 1 && <ChevronRight size={8} className="text-slate-700 flex-shrink-0" />}
            </div>
          ))}
        </div>
        <div className={`mt-1.5 text-[8px] font-mono ${apiOk === false ? "text-rose-400" : "text-slate-600"}`}>
          {apiOk === false ? "API offline — avvia api_server.py" : "watcher → state_updater → watchdog → api :5001"}
        </div>
      </div>
    </div>
  );
}

// ─── CELL: CICLO OPERATIVO ────────────────────────────────────────────────────
export function CellCiclo() {
  const [active, setActive] = useState("build");
  const [state, setState] = useState<Record<string, any> | null>(null);

  // note per DOCUMENTA
  const [docNote, setDocNote] = useState("");
  const [docSaved, setDocSaved] = useState(false);

  // input per REINVESTI
  const [nextInput, setNextInput] = useState("");
  const [nextSaved, setNextSaved] = useState(false);

  // blockers per SBLOCCA
  const [newBlocker, setNewBlocker] = useState("");

  useEffect(() => {
    fetch("/api/state")
      .then((r) => r.json())
      .then(setState)
      .catch(() => {});
  }, []);

  const blockers: string[] = state?.blockers ?? [];
  const milestone = state?.active_milestone || "—";
  const step = CICLO_STEPS.find((s) => s.id === active)!;

  // Azioni API (ottimistiche — falliscono silenziosamente se offline)
  const apiPatch = (body: object) =>
    fetch("/api/state", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then((r) => r.json())
      .then(setState)
      .catch(() => {});

  const removeBlocker = (b: string) => {
    const updated = blockers.filter((x) => x !== b);
    setState((s) => s ? { ...s, blockers: updated } : s); // ottimistico
    apiPatch({ blockers: updated });
  };

  const addBlocker = () => {
    if (!newBlocker.trim()) return;
    const updated = [...blockers, newBlocker.trim()];
    setState((s) => s ? { ...s, blockers: updated } : s);
    apiPatch({ blockers: updated });
    setNewBlocker("");
  };

  const saveNextStep = () => {
    if (!nextInput.trim()) return;
    setState((s) => s ? { ...s, next_step: nextInput.trim() } : s);
    apiPatch({ next_step: nextInput.trim() });
    setNextSaved(true);
    setTimeout(() => setNextSaved(false), 2000);
    setNextInput("");
  };

  const saveDocNote = () => {
    if (!docNote.trim()) return;
    fetch("/api/changelog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "DECISION", note: docNote.trim() }),
    }).catch(() => {});
    setDocSaved(true);
    setTimeout(() => { setDocSaved(false); setDocNote(""); }, 2000);
  };

  // Contenuto per ogni step
  const CONTENT: Record<string, React.ReactNode> = {
    build: (
      <div className="space-y-2">
        <div className="bg-slate-950 border border-emerald-500/20 rounded-lg p-2.5">
          <div className="text-[8px] font-mono text-slate-600 uppercase mb-1">Milestone corrente</div>
          <div className="text-[11px] font-bold text-emerald-400">{milestone}</div>
        </div>
        <div>
          <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-1">
            <span>Config G — Rinforzi Z+U</span><span>65%</span>
          </div>
          <Progress value={65} />
        </div>
        <button
          onClick={() => apiPatch({ last_action: `✅ COMPLETATA: ${milestone}` })}
          className="w-full text-[9px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/70 hover:bg-emerald-900/20 rounded-lg py-1.5 transition-all"
        >
          <CheckCircle2 size={9} className="inline mr-1" /> Segna Completata
        </button>
      </div>
    ),
    doc: (
      <div className="space-y-2">
        <div className="text-[8px] font-mono text-slate-600 mb-1">Nota decisionale per changelog</div>
        <textarea
          value={docNote}
          onChange={(e) => setDocNote(e.target.value)}
          placeholder="Perché questo file fa questo passaggio..."
          className="w-full h-16 bg-slate-950 border border-slate-700 rounded-lg p-2 text-[10px] font-mono text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-cyan-500/50"
        />
        <button
          onClick={saveDocNote}
          className={`w-full text-[9px] font-mono uppercase tracking-widest rounded-lg py-1.5 transition-all border ${
            docSaved
              ? "border-emerald-500/50 text-emerald-400 bg-emerald-900/20"
              : "border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60"
          }`}
        >
          {docSaved ? "✓ Salvato" : "Salva in Changelog"}
        </button>
      </div>
    ),
    teach: (
      <div className="space-y-2">
        <div className="text-[8px] font-mono text-slate-600 mb-1">Carica PDF o .md → Memory</div>
        <div className="border border-dashed border-slate-700 rounded-lg p-3 text-center text-[9px] font-mono text-slate-600 hover:border-cyan-500/40 hover:text-cyan-500/60 transition-colors cursor-pointer">
          <Package size={16} className="mx-auto mb-1 opacity-40" />
          Drag & drop .pdf o .md
        </div>
        <div className="text-[8px] font-mono text-slate-600 text-center">
          → chiama pdf_to_memory.py · classifica ATTO/INFO
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2">
          <div className="text-[8px] font-mono text-slate-600 mb-1">Aggiungi file .md vuoto</div>
          <div className="flex gap-1.5">
            <input
              type="text" placeholder="nome_file"
              className="flex-1 bg-transparent border border-slate-700 rounded px-2 py-1 text-[9px] font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40"
            />
            <button className="px-2 py-1 border border-slate-700 rounded text-[9px] font-mono text-slate-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors">
              <Plus size={9} />
            </button>
          </div>
        </div>
      </div>
    ),
    unlock: (
      <div className="space-y-2">
        <div className="text-[8px] font-mono text-slate-600 mb-1">Blockers attivi</div>
        {blockers.length === 0 ? (
          <div className="text-[9px] font-mono text-emerald-400/60 text-center py-2">✓ Nessun blocker</div>
        ) : (
          blockers.map((b) => (
            <div key={b} className="flex items-center gap-2 bg-slate-950 border border-rose-500/20 rounded-lg px-2.5 py-1.5">
              <span className="flex-1 text-[9px] font-mono text-rose-400">▸ {b}</span>
              <button onClick={() => removeBlocker(b)} className="text-slate-600 hover:text-rose-400 transition-colors">
                <Trash2 size={9} />
              </button>
            </div>
          ))
        )}
        <div className="flex gap-1.5">
          <input
            value={newBlocker}
            onChange={(e) => setNewBlocker(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addBlocker()}
            placeholder="Aggiungi blocker..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[9px] font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/40"
          />
          <button onClick={addBlocker} className="px-2 py-1 border border-indigo-500/30 rounded text-indigo-400 hover:border-indigo-500/60 transition-colors">
            <Plus size={9} />
          </button>
        </div>
      </div>
    ),
    design: (
      <div className="space-y-2">
        <div className="bg-slate-950 border border-indigo-500/20 rounded-lg p-2.5">
          <div className="text-[8px] font-mono text-slate-600 uppercase mb-1">MIMS Platform</div>
          <div className="text-[9px] font-mono text-slate-400">Connettori modulari — 30% · Attende pressa</div>
          <Progress value={30} indicatorClassName="bg-indigo-400" />
        </div>
        <div className="text-[8px] font-mono text-slate-600">Prossimo design action</div>
        <textarea
          placeholder="Es: sketch connettore tipo B con foro cieco..."
          className="w-full h-14 bg-slate-950 border border-slate-700 rounded-lg p-2 text-[10px] font-mono text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-indigo-500/40"
        />
        <button className="w-full text-[9px] font-mono uppercase tracking-widest text-indigo-400 border border-indigo-500/30 hover:border-indigo-500/60 rounded-lg py-1.5 transition-all">
          Salva Nota Design
        </button>
      </div>
    ),
    produce: (
      <div className="space-y-2">
        <div className="text-[8px] font-mono text-slate-600 mb-1">BOM prioritario — V32</div>
        {[
          { item: "Mandrino 2.2kW ER20",   qty: "1x", status: "mancante", color: "text-rose-400" },
          { item: "Epoxy Granite",          qty: "5kg", status: "da ordinare", color: "text-amber-400" },
          { item: "Gusset 200mm laser cut", qty: "8x", status: "da ordinare", color: "text-amber-400" },
          { item: "Bulloni M10 inox",       qty: "32x", status: "in stock",   color: "text-emerald-400" },
          { item: "Diagonali 40x40x2",      qty: "4x", status: "in stock",   color: "text-emerald-400" },
        ].map((r) => (
          <div key={r.item} className="flex items-center gap-2 text-[9px] font-mono">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.color === "text-emerald-400" ? "bg-emerald-500" : r.color === "text-rose-400" ? "bg-rose-500" : "bg-amber-500"}`} />
            <span className="flex-1 text-slate-400">{r.item}</span>
            <span className="text-slate-600">{r.qty}</span>
            <span className={`${r.color} text-[8px]`}>{r.status}</span>
          </div>
        ))}
      </div>
    ),
    sell: (
      <div className="space-y-2">
        <div className="bg-slate-950 border border-amber-500/20 rounded-lg p-2.5">
          <div className="text-[8px] font-mono text-slate-600 uppercase mb-1">EVA · Canali attivi</div>
          <div className="space-y-1">
            {[
              { ch: "Vita Natura",  status: "WhatsApp bot in sviluppo", dot: "bg-amber-500" },
              { ch: "YouTube",      status: "AVA storytelling · Q2 2026", dot: "bg-slate-600" },
              { ch: "B2B Fresatura", status: "V32 operativa · target Q3", dot: "bg-slate-600" },
              { ch: "MIMS Market",  status: "Post pressa · 2027",         dot: "bg-slate-600" },
            ].map((c) => (
              <div key={c.ch} className="flex items-center gap-2 text-[9px] font-mono">
                <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                <span className="text-slate-300 w-24">{c.ch}</span>
                <span className="text-slate-600">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    reinvest: (
      <div className="space-y-2">
        <div className="text-[8px] font-mono text-slate-600 mb-1">Imposta prossimo step</div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
          <div className="text-[8px] font-mono text-slate-600 mb-1">Step corrente</div>
          <div className="text-[10px] font-mono text-white">▸ {state?.next_step || "—"}</div>
        </div>
        <div className="flex gap-1.5">
          <input
            value={nextInput}
            onChange={(e) => setNextInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveNextStep()}
            placeholder="Prossima azione concreta..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-[9px] font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40"
          />
          <button onClick={saveNextStep} className={`px-2 py-1 border rounded text-[9px] font-mono transition-all ${nextSaved ? "border-emerald-500/60 text-emerald-400 bg-emerald-900/20" : "border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60"}`}>
            {nextSaved ? "✓" : "Set"}
          </button>
        </div>
        <div className="text-[8px] font-mono text-slate-600">
          → chiama set_next_step() in state_updater.py
        </div>
      </div>
    ),
  };

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Icon grid 4×2 */}
      <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
        {CICLO_STEPS.map((s) => {
          const Icon = CICLO_ICONS[s.id];
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-lg border transition-all ${
                isActive
                  ? `${s.border} ${s.bg} ${s.color}`
                  : "border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-500"
              }`}
            >
              <Icon size={16} />
              <span className="text-[7px] font-mono uppercase tracking-wide leading-none text-center">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-800 flex-shrink-0" />

      {/* Content panel */}
      <div className={`flex-1 overflow-y-auto rounded-lg border p-2.5 ${step.border} ${step.bg}`}>
        <div className={`text-[8px] font-mono uppercase tracking-widest mb-2 ${step.color}`}>
          {step.label}
        </div>
        {CONTENT[active]}
      </div>
    </div>
  );
}

// ─── CELL: PILASTRI ───────────────────────────────────────────────────────────
export function CellPillars() {
  return (
    <div className="space-y-2">
      {PILLARS_DATA.map((p) => (
        <div key={p.label} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${p.bar}`} />
              <span className="text-[10px] font-bold text-white">{p.label}</span>
              <span className="text-[7px] font-mono text-slate-700 border border-slate-800 rounded px-1">ATTO {p.atto}</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500">{p.pct}%</span>
          </div>
          <Progress value={p.pct} indicatorClassName={p.bar} />
          <div className="text-[8px] font-mono text-slate-600 mt-1">{p.note}</div>
        </div>
      ))}
    </div>
  );
}

// ─── CELL: V32 ────────────────────────────────────────────────────────────────
export function CellV32() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <StatBlock label="Massa"      value="178 kg"    sub="69+109 kg" />
          <StatBlock label="Precisione" value="±0.019mm"  sub="IT6-IT7" color="text-emerald-400" />
          <StatBlock label="f₀"         value="3.91 Hz"   sub="4 molle gialle ISO" />
          <StatBlock label="ROI Y1"     value="322%"      sub="BEP 61h · 1.4 mesi" color="text-amber-400" />
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 space-y-1.5">
          <div className="flex justify-between text-[8px] font-mono text-slate-600">
            <span>Config G — Rinforzi Z+U</span><span>65%</span>
          </div>
          <Progress value={65} />
          <div className="text-[8px] font-mono text-slate-600">
            Attenuazione @400Hz: 99.99% · Deflessione Z: 0.0006mm @100N
          </div>
        </div>
        <div className="bg-slate-950 border border-rose-500/20 rounded-lg p-2.5">
          <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Blockers</div>
          <div className="text-[9px] font-mono text-rose-400">▸ Manca mandrino 2.2kW ER20 — da ordinare</div>
        </div>
        <button
          onClick={() => setModal(true)}
          className="w-full text-[9px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-900/10 rounded-lg py-2 transition-all"
        >
          Apri Checklist Config G →
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl shadow-2xl max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Hammer size={13} className="text-emerald-400" /> PROCEDURA RINFORZI — Config G
                </h3>
                <p className="text-[9px] text-slate-500 font-mono">ATTO VIII</p>
              </div>
              <button onClick={() => setModal(false)} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors">
                <X size={13} className="text-slate-400" />
              </button>
            </div>
            <ScrollArea className="p-4 space-y-4">
              {[
                { fase: "A — Basamento", items: [
                  "4x gusset triangolari 150mm a ogni angolo (TIG cordone pieno)",
                  "4x diagonali 40x40x2 nei piani XZ e YZ (taglio 45°, a registro)",
                  "Verifica planarità con riga e spessimetro",
                ]},
                { fase: "B — Colonne Z+U", items: [
                  "4x gusset 200mm base + 4x gusset 200mm testa",
                  "2x diagonali a X tra Z e U (40x40x2, L~630mm)",
                  "8x tiranti M10 micrometrici",
                  "Riempire tubolari con Epoxy Granite",
                  "Allineamento con comparatore centesimale < 0.03mm",
                ]},
                { fase: "C — Telaio XY", items: [
                  "4x diagonali nel piano",
                  "8x gusset 100mm a tutti gli angoli",
                  "Verifica ortogonalità con squadra di precisione",
                ]},
                { fase: "D — Verifica finale", items: [
                  "Deflessione Z con comparatore + peso noto (target < 0.03mm @100N)",
                  "Test vibrazioni con IFM VSE150 per confermare f₀",
                ]},
              ].map((f) => (
                <div key={f.fase} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[9px] font-bold uppercase">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {f.fase}
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1.5">
                    {f.items.map((item) => <CheckItem key={item} text={item} />)}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}

// ─── CELL: ECOTREE MODIFICABILE ───────────────────────────────────────────────
export function CellEcoTree() {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
        Architettura progetto · hover su nodo → note inline
      </div>
      <div className="flex-1 min-h-0">
        <EcoTreeView />
      </div>
    </div>
  );
}

// ─── CELL: AUTOMAZIONI ────────────────────────────────────────────────────────
export function CellAutomazioni() {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Status bar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[9px] font-mono px-2 py-1 rounded border border-emerald-500/30 bg-emerald-900/10 text-emerald-400">
          <Zap size={9} />
          GENESIS OS · interno
        </div>
        <div className="text-[8px] font-mono text-slate-600">
          Python-only · 13 attive · 14 da implementare
        </div>
      </div>
      {/* AutomationsView in modalità compatta */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <AutomationsView />
      </div>
    </div>
  );
}

// ─── CELL: MENTE · DIGEST ─────────────────────────────────────────────────────
export function CellMente() {
  const [digest, setDigest] = useState<Record<string, any> | null>(null);
  const [scanning, setScanning] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [searching, setSearching] = useState(false);

  const loadDigest = useCallback(() => {
    fetch("/api/digest")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setDigest)
      .catch(() => setDigest(null));
  }, []);

  useEffect(() => { loadDigest(); }, [loadDigest]);

  const scanNow = async () => {
    setScanning(true);
    try {
      await fetch("/api/scan", { method: "POST" });
      await loadDigest();
    } finally {
      setScanning(false);
    }
  };

  const doSearch = async (q: string) => {
    if (!q.trim()) { setResults(null); return; }
    setSearching(true);
    try {
      const r = await fetch(`/api/digest/search?q=${encodeURIComponent(q)}`);
      const d = await r.json();
      setResults(d.results ?? []);
    } finally {
      setSearching(false);
    }
  };

  const summary = digest?.global_summary;
  const lastScan = digest?.scanned_at ? new Date(digest.scanned_at).toLocaleString("it-IT") : null;

  // Top 5 decisioni dall'intero digest
  const topDecisions: string[] = [];
  if (digest?.by_file) {
    for (const f of digest.by_file) {
      for (const d of (f.extracts?.decisions ?? [])) {
        if (!topDecisions.includes(d)) topDecisions.push(d);
        if (topDecisions.length >= 5) break;
      }
      if (topDecisions.length >= 5) break;
    }
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Header stats */}
      <div className="grid grid-cols-3 gap-1.5 flex-shrink-0">
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center">
          <div className="text-[14px] font-bold text-cyan-400">{summary?.total_extractions ?? "—"}</div>
          <div className="text-[7px] font-mono text-slate-600 uppercase tracking-wide">estrazioni</div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center">
          <div className="text-[14px] font-bold text-emerald-400">{summary?.total_decisions ?? "—"}</div>
          <div className="text-[7px] font-mono text-slate-600 uppercase tracking-wide">decisioni</div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center">
          <div className="text-[14px] font-bold text-amber-400">{digest?.files_read ?? "—"}</div>
          <div className="text-[7px] font-mono text-slate-600 uppercase tracking-wide">file letti</div>
        </div>
      </div>

      {/* Search box */}
      <div className="flex gap-1.5 flex-shrink-0">
        <div className="flex-1 flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 focus-within:border-cyan-500/50 transition-colors">
          <Search size={10} className="text-slate-600 flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
            placeholder="cerca decisioni, spec, milestone..."
            className="flex-1 bg-transparent text-[10px] font-mono text-slate-300 placeholder:text-slate-700 outline-none"
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults(null); }} className="text-slate-600 hover:text-slate-400">
              <X size={9} />
            </button>
          )}
        </div>
        <button
          onClick={() => doSearch(query)}
          disabled={!query.trim() || searching}
          className="px-2 py-1.5 bg-cyan-900/20 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all disabled:opacity-30"
        >
          {searching ? "..." : "cerca"}
        </button>
      </div>

      {/* Results or top decisions */}
      <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
        {results !== null ? (
          results.length === 0 ? (
            <div className="text-[9px] font-mono text-slate-600 p-2">Nessun risultato per "{query}"</div>
          ) : results.map((r, i) => (
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
        ) : (
          <>
            {!digest && (
              <div className="text-[9px] font-mono text-slate-600 p-2">
                API offline o digest non trovato.<br />Avvia api_server.py poi premi SCAN.
              </div>
            )}
            {topDecisions.map((d, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5">
                <div className="text-[7px] font-mono text-slate-700 uppercase mb-0.5">decisione</div>
                <div className="text-[9px] font-mono text-slate-300 leading-snug">{d}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Footer: scan button + last scan */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={scanNow}
          disabled={scanning}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-900/20 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all disabled:opacity-50"
        >
          <ScanLine size={10} className={scanning ? "animate-pulse" : ""} />
          {scanning ? "scanning..." : "scan ora"}
        </button>
        {lastScan && (
          <span className="text-[8px] font-mono text-slate-700">ultimo: {lastScan}</span>
        )}
      </div>
    </div>
  );
}

// ─── CELL: CONTENT ENGINE ─────────────────────────────────────────────────────
export function CellContentEngine() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [content, setContent] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/content-files")
      .then(r => r.json())
      .then(d => { if (d.ok) { setFiles(d.files); setApiOk(true); } else setApiOk(false); })
      .catch(() => setApiOk(false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openFile = (f: any) => {
    setSelected(f);
    setContent(null);
    fetch(`/api/file?path=${encodeURIComponent(f.path)}`)
      .then(r => r.json())
      .then(d => { if (d.ok) setContent(d.content); })
      .catch(() => setContent("Errore lettura file"));
  };

  const relTime = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m fa`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h fa`;
    return `${Math.floor(diff / 86400)}g fa`;
  };

  // Vista preview
  if (selected) {
    return (
      <div className="flex flex-col h-full gap-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-amber-400 transition-colors text-[9px] font-mono">← lista</button>
          <span className="text-[9px] font-mono text-amber-400 truncate flex-1">{selected.name}</span>
          <button
            onClick={() => fetch("/api/open", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: selected.path }) }).catch(() => {})}
            className="text-slate-600 hover:text-indigo-400 transition-colors"
            title="Apri esternamente"
          >
            <ExternalLink size={10} />
          </button>
        </div>
        {content === null
          ? <div className="text-[9px] font-mono text-slate-600">caricamento…</div>
          : <pre className="flex-1 overflow-y-auto bg-slate-950 border border-slate-800 rounded-lg p-3 text-[9px] font-mono text-slate-300 whitespace-pre-wrap break-words leading-relaxed scrollbar-thin">
              {content.slice(0, 6000)}
            </pre>
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Header */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest flex-1">
          CONTENT_ENGINE/produzione_contenuti
        </div>
        <button onClick={load} disabled={loading} className="text-slate-600 hover:text-amber-400 transition-colors" title="Aggiorna">
          <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
        </button>
        <span className="text-[8px] font-mono text-slate-700 border border-slate-800 rounded px-1.5 py-0.5">{files.length} ep.</span>
      </div>

      {apiOk === false && (
        <div className="text-[9px] font-mono text-rose-400 bg-rose-900/10 border border-rose-500/20 rounded px-2 py-1.5 flex-shrink-0">
          API offline — avvia api_server.py
        </div>
      )}

      {/* Lista episodi */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1 min-h-0">
        {loading && <div className="text-[9px] font-mono text-slate-600 p-2">caricamento…</div>}
        {!loading && files.length === 0 && apiOk !== false && (
          <div className="text-[9px] font-mono text-slate-600 p-2 text-center">
            Nessun episodio ancora.<br/>
            <span className="text-slate-700">Genera il primo da Claude Code.</span>
          </div>
        )}
        {files.map(f => (
          <button
            key={f.path}
            onClick={() => openFile(f)}
            className="w-full text-left flex items-start gap-2 px-2.5 py-2 rounded-lg border border-slate-800 hover:border-amber-500/30 hover:bg-amber-900/5 transition-all group"
          >
            <FileText size={11} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-mono text-slate-200 truncate group-hover:text-amber-300 transition-colors">{f.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Clock size={7} className="text-slate-700" />
                <span className="text-[8px] font-mono text-slate-600">{relTime(f.modified)}</span>
                <span className="text-slate-700">·</span>
                <span className="text-[8px] font-mono text-slate-700">{f.size_kb}kb</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-slate-800 pt-2 text-[8px] font-mono text-slate-700">
        → CONTENT_ENGINE/archive · audio · video · distribuiti
      </div>
    </div>
  );
}

// ─── CANVAS LAYOUT PRINCIPALE ─────────────────────────────────────────────────
const STATIC_DATE = "2026-03-16";

export function CanvasLayout() {
  const [layout, setLayout] = useState<Layout[]>(loadLayout);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [stateDate, setStateDate] = useState(STATIC_DATE);
  const containerRef = useRef<HTMLDivElement>(null);

  // Legge last_update da STATE.json per i badge sulle celle
  useEffect(() => {
    fetch("/api/state")
      .then((r) => r.json())
      .then((d) => { if (d?.last_update) setStateDate(d.last_update); })
      .catch(() => {});
  }, []);

  // Misura larghezza container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setContainerWidth(w);
    });
    obs.observe(el);
    setContainerWidth(el.clientWidth);
    return () => obs.disconnect();
  }, []);

  const onLayoutChange = useCallback((l: Layout[]) => {
    setLayout(l);
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(l));
  }, []);

  const resetLayout = () => {
    setLayout(DEFAULT_LAYOUT);
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(DEFAULT_LAYOUT));
  };

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto overflow-x-hidden px-2 pb-6">
      {/* Reset hint */}
      <div className="flex justify-end pt-1 pb-0.5">
        <button
          onClick={resetLayout}
          className="text-[8px] font-mono text-slate-700 hover:text-emerald-400 uppercase tracking-widest transition-colors flex items-center gap-1"
        >
          <RotateCcw size={8} /> reset layout
        </button>
      </div>

      <GridLayout
        layout={layout}
        cols={COLS}
        rowHeight={ROW_H}
        width={containerWidth - 16} /* sottrai padding */
        margin={MARGIN}
        draggableHandle=".cell-drag-handle"
        onLayoutChange={onLayoutChange}
        resizeHandles={["se"]}
        compactType="vertical"
        preventCollision={false}
      >
        {/* ── FOCUS + AUTOMAZIONE ATTIVA ─────────────────── */}
        <div key="focus">
          <CellShell title="FOCUS · AUTOMAZIONE ATTIVA" icon={<Cpu size={11} />} color="cyan" mono="LIVE" lastUpdated={stateDate}>
            <CellFocus />
          </CellShell>
        </div>

        {/* ── CICLO OPERATIVO ────────────────────────────── */}
        <div key="ciclo">
          <CellShell title="CICLO OPERATIVO" icon={<RefreshCw size={11} />} color="emerald" mono="ATTO VI" lastUpdated={stateDate}>
            <CellCiclo />
          </CellShell>
        </div>

        {/* ── PILASTRI ───────────────────────────────────── */}
        <div key="pillars">
          <CellShell title="PILASTRI" icon={<Layers size={11} />} color="indigo" lastUpdated={stateDate}>
            <CellPillars />
          </CellShell>
        </div>

        {/* ── V32 LA MACCHINA ────────────────────────────── */}
        <div key="v32">
          <CellShell title="V32 · LA MACCHINA" icon={<Target size={11} />} color="emerald" mono="ATTO II" lastUpdated={stateDate}>
            <CellV32 />
          </CellShell>
        </div>

        {/* ── ECOTREE MODIFICABILE ───────────────────────── */}
        <div key="ecotree">
          <CellShell title="ECOTREE · FILE SYSTEM" icon={<GitBranch size={11} />} color="cyan" mono="v1.0" noPad lastUpdated={stateDate}>
            <div className="p-3 h-full">
              <CellEcoTree />
            </div>
          </CellShell>
        </div>

        {/* ── NEURO MAP · 1024 ASSI ──────────────────────── */}
        <div key="neuromap">
          <CellShell title="NEURO MAP · ECOSISTEMA" icon={<Activity size={11} />} color="indigo" mono="1024 assi" noPad lastUpdated={stateDate}>
            <div className="p-3 h-full overflow-hidden flex flex-col min-h-0">
              <NeuroMapView />
            </div>
          </CellShell>
        </div>

        {/* ── AUTOMAZIONI · GENESIS OS ───────────────────── */}
        <div key="automazioni">
          <CellShell title="AUTOMAZIONI · GENESIS OS" icon={<Zap size={11} />} color="amber" mono="34 nodi" noPad lastUpdated={stateDate}>
            <div className="p-3 h-full flex flex-col">
              <CellAutomazioni />
            </div>
          </CellShell>
        </div>

        {/* ── MENTE · DIGEST ─────────────────────────────── */}
        <div key="mente">
          <CellShell title="MENTE · DIGEST" icon={<Brain size={11} />} color="cyan" mono="LA MIA MENTE" lastUpdated={stateDate}>
            <CellMente />
          </CellShell>
        </div>

        {/* ── DOCS · MD FILES ────────────────────────────── */}
        <div key="docs">
          <CellShell title="DOCS · MD FILES" icon={<BookOpen size={11} />} color="amber" mono="live" lastUpdated={stateDate}>
            <MdManager />
          </CellShell>
        </div>

        {/* ── CONTENT ENGINE · PODCAST ───────────────────── */}
        <div key="content">
          <CellShell title="CONTENT ENGINE · PODCAST" icon={<Radio size={11} />} color="amber" mono="produzione" lastUpdated={stateDate}>
            <CellContentEngine />
          </CellShell>
        </div>
      </GridLayout>
    </div>
  );
}
