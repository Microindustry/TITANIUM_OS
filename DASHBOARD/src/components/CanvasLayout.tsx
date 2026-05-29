// CanvasLayout.tsx | TITANIUM_OS / DASHBOARD | v6.0 | 2026-05-29
// Command center con navigazione drill-down — celle una dentro l'altra

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2,
  StickyNote, Zap, Activity, RefreshCw, ScanLine,
  FileText, ChevronRight, User, Cpu, Layers,
  Box, Mic, Circle,
} from "lucide-react";
import { useGlobalState } from "../hooks/SystemStateContext";
import { useUIStore } from "../stores/systemStore";
import { MatteoSection } from "./MatteoSection";
import { ClaudeSection } from "./ClaudeSection";

// ── API helper ────────────────────────────────────────────────────────────────
const api = (url: string, opts?: RequestInit) =>
  fetch(url, opts).then(r => r.json()).catch(() => null);

// ── NAVIGAZIONE A STACK ───────────────────────────────────────────────────────
type RoomId = "home" | "v32" | "genesis" | "mims" | "eva" | "matteo" | "claude";
interface NavNode { id: RoomId; label: string }

// ── COLORI PILASTRI ───────────────────────────────────────────────────────────
const PILLAR_CFG: Record<string, {
  color: string; bar: string; bg: string; border: string;
  glow: string; room: RoomId;
}> = {
  V32:         { color: "#34d399", bar: "bg-emerald-400", bg: "bg-emerald-500/8",  border: "border-emerald-500/30", glow: "shadow-emerald-500/20", room: "v32"     },
  MIMS:        { color: "#fbbf24", bar: "bg-amber-400",   bg: "bg-amber-500/8",    border: "border-amber-500/30",   glow: "shadow-amber-500/20",   room: "mims"    },
  GENESIS:     { color: "#22d3ee", bar: "bg-cyan-400",    bg: "bg-cyan-500/8",     border: "border-cyan-500/30",    glow: "shadow-cyan-500/20",    room: "genesis" },
  VITA_NATURA: { color: "#a78bfa", bar: "bg-violet-400",  bg: "bg-violet-500/8",   border: "border-violet-500/30",  glow: "shadow-violet-500/20",  room: "eva"     },
  IDENTITY:    { color: "#94a3b8", bar: "bg-slate-400",   bg: "bg-slate-500/8",    border: "border-slate-600/30",   glow: "shadow-slate-500/10",   room: "matteo"  },
};

function pct(p: any): number { return Number(p?.pct_complete ?? p?.pct ?? 0); }

// ── BREADCRUMB ────────────────────────────────────────────────────────────────
function Breadcrumb({ stack, onBack }: { stack: NavNode[]; onBack: () => void }) {
  if (stack.length <= 1) return null;
  return (
    <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-b border-slate-800/60 bg-slate-950/80">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 hover:text-slate-200 transition-colors group"
      >
        <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
        <span>BACK</span>
      </button>
      <div className="h-3 w-px bg-slate-800" />
      {stack.map((node, i) => (
        <div key={node.id} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={9} className="text-slate-700" />}
          <span className={`text-[10px] font-mono uppercase tracking-widest ${
            i === stack.length - 1 ? "text-slate-200" : "text-slate-600"
          }`}>{node.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── HOME: HERO STATUS ─────────────────────────────────────────────────────────
function HeroStatus({ state, online }: { state: any; online: boolean }) {
  const [nextInput, setNextInput] = useState("");
  const milestone  = state?.active_milestone ?? "—";
  const nextStep   = state?.next_step ?? "—";
  const blockers: string[] = state?.blockers ?? [];

  const saveNext = () => {
    if (!nextInput.trim()) return;
    api("/api/state", { method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ next_step: nextInput.trim() }) });
    setNextInput("");
  };

  const removeBlocker = (b: string) =>
    api("/api/state", { method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockers: blockers.filter(x => x !== b) }) });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* Milestone */}
      <div className="lg:col-span-2 bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5
                      shadow-lg shadow-emerald-500/5">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${online ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Milestone attivo · {online ? "LIVE" : "offline"}
          </span>
        </div>
        <h2 className="text-lg font-bold text-white mb-3 leading-snug">{milestone}</h2>
        <div className="flex items-start gap-2 mb-4">
          <ArrowRight size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-emerald-300 leading-snug">{nextStep}</span>
        </div>
        <div className="flex gap-2">
          <input
            value={nextInput}
            onChange={e => setNextInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && saveNext()}
            placeholder="Aggiorna prossimo step..."
            className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 text-sm
                       text-slate-200 placeholder-slate-700 focus:outline-none focus:border-emerald-500/40"
          />
          <button onClick={saveNext}
            className="px-3 py-2 bg-emerald-900/30 border border-emerald-500/30 hover:border-emerald-400
                       text-emerald-400 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors">
            set
          </button>
        </div>
      </div>

      {/* Blockers */}
      <div className={`bg-slate-900/80 border rounded-2xl p-5 shadow-lg ${
        blockers.length ? "border-rose-500/30 shadow-rose-500/5" : "border-slate-700/50"
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={12} className={blockers.length ? "text-rose-400" : "text-slate-600"} />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Blockers</span>
          {blockers.length > 0 && (
            <span className="ml-auto text-[9px] font-mono bg-rose-900/40 text-rose-400 px-1.5 py-0.5 rounded">
              {blockers.length}
            </span>
          )}
        </div>
        {blockers.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 size={13} className="text-emerald-500/40" /> Nessun blocker
          </div>
        ) : (
          <div className="space-y-2">
            {blockers.map(b => (
              <div key={b} className="flex items-start gap-2 group">
                <span className="text-rose-500 mt-0.5 flex-shrink-0 text-xs">▶</span>
                <span className="text-sm text-slate-300 flex-1 leading-snug">{b}</span>
                <button onClick={() => removeBlocker(b)}
                  className="opacity-0 group-hover:opacity-100 text-slate-700 hover:text-rose-400 text-xs transition-opacity">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── HOME: PILLAR GRID ─────────────────────────────────────────────────────────
function PillarGrid({ state, onEnter }: { state: any; onEnter: (id: RoomId, label: string) => void }) {
  const pillars = state?.pillars ?? {};
  const entries = Object.entries(pillars) as [string, any][];
  if (!entries.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {entries.map(([key, p]) => {
        const cfg = PILLAR_CFG[key] ?? { color: "#94a3b8", bar: "bg-slate-400", bg: "bg-slate-500/8", border: "border-slate-600/30", glow: "shadow-slate-500/10", room: "home" as RoomId };
        const progress = pct(p);
        const next = (p?.next ?? p?.phase ?? "").slice(0, 60);

        return (
          <button
            key={key}
            onClick={() => onEnter(cfg.room, key.replace("_", " "))}
            className={`group text-left rounded-2xl border ${cfg.bg} ${cfg.border}
                        hover:brightness-125 transition-all duration-200 p-4
                        shadow-lg ${cfg.glow} hover:shadow-xl hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider"
                    style={{ color: cfg.color }}>
                {key.replace("_", " ")}
              </span>
              <ChevronRight size={11} className="text-slate-700 group-hover:text-slate-400
                            group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 tabular-nums">
              {progress}<span className="text-sm text-slate-600">%</span>
            </div>
            <div className="h-1 bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div className={`h-full rounded-full ${cfg.bar} transition-all duration-700`}
                   style={{ width: `${progress}%` }} />
            </div>
            {next && <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{next}</p>}
          </button>
        );
      })}
    </div>
  );
}

// ── HOME: NOTE RAPIDE ─────────────────────────────────────────────────────────
function QuickNotes({ state }: { state: any }) {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (state?.canvas_notes !== undefined) setNotes(state.canvas_notes);
  }, [state?.canvas_notes]);

  const handleChange = (val: string) => {
    setNotes(val);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      api("/api/state", { method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canvas_notes: val }) }).then(() => setSaved(true));
    }, 800);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <StickyNote size={12} className="text-amber-400" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Note rapide</span>
        {saved && <span className="ml-auto text-[9px] font-mono text-emerald-500/70">✓ salvato</span>}
      </div>
      <textarea
        value={notes}
        onChange={e => handleChange(e.target.value)}
        placeholder={"Idee, misure, promemoria...\nSalvato automaticamente."}
        className="w-full h-28 bg-slate-800/50 border border-slate-700/40 rounded-xl px-3 py-3
                   text-sm text-slate-200 placeholder-slate-700 focus:outline-none
                   focus:border-amber-500/30 resize-none font-mono leading-relaxed"
      />
    </div>
  );
}

// ── HOME: QUICK ACTIONS ───────────────────────────────────────────────────────
const ACTIONS = [
  { id: "scan",  label: "Scan MENTE",  icon: ScanLine,  color: "text-emerald-400 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/20", endpoint: "/api/scan",        method: "POST" },
  { id: "rag",   label: "RAG Rebuild", icon: RefreshCw, color: "text-cyan-400 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/20",             endpoint: "/api/rag/rebuild", method: "POST" },
  { id: "brief", label: "Daily Brief", icon: FileText,  color: "text-indigo-400 border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/20",     endpoint: "/api/daily-brief", method: "POST" },
  { id: "check", label: "API Health",  icon: Activity,  color: "text-slate-400 border-slate-600 hover:border-slate-400 hover:bg-slate-800/40",            endpoint: "/api/health",      method: "GET" },
];

function QuickActions() {
  const [st, setSt] = useState<Record<string, "idle" | "loading" | "ok" | "err">>({});
  const run = async (a: typeof ACTIONS[0]) => {
    setSt(s => ({ ...s, [a.id]: "loading" }));
    const res = await api(a.endpoint, { method: a.method, headers: { "Content-Type": "application/json" }, body: a.method === "GET" ? undefined : "{}" });
    setSt(s => ({ ...s, [a.id]: res ? "ok" : "err" }));
    setTimeout(() => setSt(s => ({ ...s, [a.id]: "idle" })), 2000);
  };
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={12} className="text-cyan-400" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Azioni rapide</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map(a => {
          const Icon = a.icon;
          const status = st[a.id] ?? "idle";
          return (
            <button key={a.id} onClick={() => run(a)} disabled={status === "loading"}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-slate-900/50
                          text-sm font-mono transition-all disabled:opacity-50 ${a.color}`}>
              <Icon size={12} className={status === "loading" ? "animate-spin" : ""} />
              <span className="text-xs">{status === "ok" ? "OK ✓" : status === "err" ? "ERR" : a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── HOME: ACCESSO RAPIDO SEZIONI ──────────────────────────────────────────────
function SectionLinks({ onEnter }: { onEnter: (id: RoomId, label: string) => void }) {
  const navigateTo = useUIStore(s => s.navigateTo);
  const sections = [
    { id: "matteo" as RoomId,  label: "Matteo",   icon: User,   color: "text-amber-400",  desc: "Chi sono · CV · Skills" },
    { id: "claude" as RoomId,  label: "THEMIS",   icon: Cpu,    color: "text-violet-400", desc: "Claude · 8 agenti AI" },
    { nav: "storie",           label: "Storie",   icon: Mic,    color: "text-rose-400",   desc: "Episodi podcast · dataset" },
    { nav: "sinapsi",          label: "Sinapsi",  icon: Layers, color: "text-cyan-400",   desc: "Mappa pilastri · drill-down" },
    { nav: "neuro",            label: "Neuro",    icon: Box,    color: "text-indigo-400", desc: "Intelligence · MENTE scanner" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {sections.map(s => {
        const Icon = s.icon;
        return (
          <button
            key={s.label}
            onClick={() => s.id ? onEnter(s.id, s.label) : navigateTo(s.nav!)}
            className="group flex items-center gap-2.5 p-3 rounded-xl border border-slate-800
                       bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60 transition-all text-left"
          >
            <Icon size={13} className={`${s.color} flex-shrink-0`} />
            <div>
              <div className={`text-[10px] font-bold font-mono uppercase tracking-wider ${s.color}`}>{s.label}</div>
              <div className="text-[9px] text-slate-600 leading-snug">{s.desc}</div>
            </div>
            <ChevronRight size={9} className="text-slate-700 group-hover:text-slate-500 ml-auto
                          group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </button>
        );
      })}
    </div>
  );
}

// ── ROOM: V32 ─────────────────────────────────────────────────────────────────
function V32Room({ state }: { state: any }) {
  const p = state?.pillars?.V32 ?? {};
  const progress = pct(p);
  const specs = [
    { k: "Massa",       v: "178 kg — corpo unico" },
    { k: "Struttura",   v: "S235 saldato TIG" },
    { k: "Precisione",  v: "±0.019 mm (IT6-IT7)" },
    { k: "Investimento",v: "EUR 2.250 (recupero)" },
    { k: "BEP",         v: "61 ore = 1.4 mesi" },
    { k: "ROI Anno 1",  v: "322%" },
    { k: "Localizzaz.", v: "La Taverna (12m²)" },
    { k: "Controllo",   v: "Siemens S7-314C + TP900" },
  ];
  const blockers: string[] = state?.blockers ?? [];

  return (
    <div className="space-y-4">
      {/* Header pilastro */}
      <div className="bg-emerald-500/8 border border-emerald-500/30 rounded-2xl p-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1">V32 CNC 3 assi</div>
            <div className="text-4xl font-bold text-white tabular-nums">
              {progress}<span className="text-lg text-slate-500 ml-1">%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-500">Config G</div>
            <div className="text-sm text-emerald-300 mt-1">{p?.phase ?? ""}</div>
          </div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full transition-all duration-700"
               style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Specs */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Specifiche</div>
          <div className="space-y-2">
            {specs.map(s => (
              <div key={s.k} className="flex justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-500">{s.k}</span>
                <span className="text-[11px] text-slate-200 text-right">{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone + Next */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Stato attuale</div>
          <div className="space-y-3">
            <div>
              <div className="text-[9px] font-mono text-emerald-400/60 uppercase mb-1">Milestone</div>
              <div className="text-sm text-white">{state?.active_milestone ?? "—"}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-emerald-400/60 uppercase mb-1">Prossimo step</div>
              <div className="text-sm text-emerald-300 flex items-start gap-1.5">
                <ArrowRight size={12} className="flex-shrink-0 mt-0.5" />
                {state?.next_step ?? "—"}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-emerald-400/60 uppercase mb-1">Prossimo dopo</div>
              <div className="text-[11px] text-slate-400">{p?.next ?? "—"}</div>
            </div>
          </div>
        </div>

        {/* Blockers */}
        <div className={`bg-slate-900/80 border rounded-2xl p-5 ${
          blockers.length ? "border-rose-500/30" : "border-slate-700/50"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={11} className={blockers.length ? "text-rose-400" : "text-slate-600"} />
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Blockers</div>
          </div>
          {blockers.length === 0 ? (
            <div className="text-sm text-slate-600 flex items-center gap-2">
              <CheckCircle2 size={12} className="text-emerald-500/40" /> Nessun blocker
            </div>
          ) : (
            <div className="space-y-2">
              {blockers.map(b => (
                <div key={b} className="flex items-start gap-2">
                  <span className="text-rose-500 text-[10px] flex-shrink-0 mt-0.5">▶</span>
                  <span className="text-sm text-slate-300 leading-snug">{b}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2">Materiali chiave</div>
            {["Epoxy Granite (smorzamento δ=0.03-0.06)",
              "Guide THK · Viti SFU1605",
              "Bronzine CuSn8 · Barre D20",
              "8 Custodi — nodo rigidità critico"].map(m => (
              <div key={m} className="flex items-center gap-1.5 mb-1">
                <Circle size={4} className="text-emerald-500/50 flex-shrink-0" />
                <span className="text-[10px] text-slate-400">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note officina */}
      <QuickNotes state={state} />
    </div>
  );
}

// ── ROOM: GENESIS ─────────────────────────────────────────────────────────────
function GenesisRoom({ state }: { state: any }) {
  const p = state?.pillars?.GENESIS ?? {};
  const progress = pct(p);
  const nodes = state?.nodes ?? {};
  const activeNodes = Object.entries(nodes).filter(([, v]) => String(v).includes("ATTIVO"));
  const pendingNodes = Object.entries(nodes).filter(([, v]) => !String(v).includes("ATTIVO"));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-cyan-500/8 border border-cyan-500/30 rounded-2xl p-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-widest mb-1">GENESIS — Ecosystem OS</div>
            <div className="text-4xl font-bold text-white tabular-nums">
              {progress}<span className="text-lg text-slate-500 ml-1">%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-500">v5.2 live</div>
            <div className="text-sm text-cyan-300 mt-1">{p?.phase ?? ""}</div>
          </div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 rounded-full transition-all duration-700"
               style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Nodi attivi */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Nodi attivi ({activeNodes.length})
            </div>
          </div>
          <div className="space-y-2">
            {activeNodes.map(([k, v]) => (
              <div key={k} className="flex items-start gap-2">
                <span className="text-emerald-500 text-[10px] flex-shrink-0 mt-0.5 font-mono">✓</span>
                <div>
                  <div className="text-[11px] font-mono text-slate-300">{k}</div>
                  <div className="text-[9px] text-slate-600 leading-snug">{String(v).replace("ATTIVO — ", "").slice(0, 60)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack + pendenti */}
        <div className="space-y-3">
          <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Stack</div>
            {[
              { k: "Frontend",  v: "React · Vite · Zustand · TanStack Query" },
              { k: "Backend",   v: "Python 3.11 · Flask · ChromaDB · MCP" },
              { k: "AI",        v: "Claude Sonnet · RAG v4.0 hybrid · 8 agenti" },
              { k: "Research",  v: "13 sorgenti: OpenAlex · BASE · POLITesi" },
              { k: "Automaz.",  v: "n8n · Stop hooks orchestratore" },
            ].map(s => (
              <div key={s.k} className="flex justify-between gap-3 mb-1.5">
                <span className="text-[10px] font-mono text-slate-500">{s.k}</span>
                <span className="text-[10px] text-slate-300 text-right">{s.v}</span>
              </div>
            ))}
          </div>

          {pendingNodes.length > 0 && (
            <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-4">
              <div className="text-[10px] font-mono text-amber-400/70 uppercase tracking-widest mb-2">Pending</div>
              {pendingNodes.map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 mb-1">
                  <span className="text-amber-500/60 text-[10px] font-mono">○</span>
                  <span className="text-[10px] text-slate-400">{k} — {String(v).slice(0, 40)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ROOM: MIMS ────────────────────────────────────────────────────────────────
function MimsRoom({ state }: { state: any }) {
  const p = state?.pillars?.MIMS ?? {};
  const progress = pct(p);
  return (
    <div className="space-y-4">
      <div className="bg-amber-500/8 border border-amber-500/30 rounded-2xl p-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono text-amber-400/70 uppercase tracking-widest mb-1">MIMS — Micro-Industry Modular System</div>
            <div className="text-4xl font-bold text-white tabular-nums">
              {progress}<span className="text-lg text-slate-500 ml-1">%</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-amber-300">Design completo — attende V32</div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Specifiche</div>
          {[
            { k: "Tile",          v: "190×190 mm" },
            { k: "Piastrine",     v: "40×40 mm" },
            { k: "Giunti",        v: "Eco-Snap · Quick-Twist · Tech-Bolt" },
            { k: "Materiali",     v: "7 dallo stesso standard geometrico" },
            { k: "Prezzo",        v: "da EUR 30 (vs Bosch/Item EUR 150+)" },
            { k: "MOQ",           v: "Zero" },
            { k: "Certificaz.",   v: "V32 come proof of concept pubblico" },
          ].map(s => (
            <div key={s.k} className="flex justify-between gap-3 mb-2">
              <span className="text-[10px] font-mono text-slate-500">{s.k}</span>
              <span className="text-[10px] text-slate-200 text-right">{s.v}</span>
            </div>
          ))}
        </div>
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Catena produzione</div>
          {["V32 completa la fresatura",
            "VULCAN (pressa 15t VCM) stampa tiles",
            "Primo stampo test in alluminio 7075",
            "Certificazione: se regge V32, regge tutto",
            "Marketplace tiles → revenue stream",
            "Blue ocean: nessun competitor sotto EUR 100"].map((s, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <span className="text-amber-500/60 font-mono text-[10px] flex-shrink-0">{i + 1}.</span>
              <span className="text-[11px] text-slate-300 leading-snug">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ROOM: EVA ─────────────────────────────────────────────────────────────────
function EvaRoom({ state }: { state: any }) {
  const p = state?.pillars?.VITA_NATURA ?? {};
  const progress = pct(p);
  return (
    <div className="space-y-4">
      <div className="bg-violet-500/8 border border-violet-500/30 rounded-2xl p-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono text-violet-400/70 uppercase tracking-widest mb-1">EVA · Vita Natura</div>
            <div className="text-4xl font-bold text-white tabular-nums">
              {progress}<span className="text-lg text-slate-500 ml-1">%</span>
            </div>
          </div>
          <div className="text-right text-[10px] font-mono text-violet-300">
            WhatsApp bot Maria<br />
            <span className="text-slate-500">Boffalora sopra Ticino</span>
          </div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-violet-400 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">La regola — zero-click</div>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Dal punto di vista di Maria: un assistente che risponde ai clienti, ricorda i compleanni, ogni mattina alle 8 dice cosa ha da fare.
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Dal nostro: Python + WhatsApp Business API + n8n + Claude API + logica condizionale. La complessità è nostra. La semplicità è sua.
          </p>
        </div>
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-amber-400/70 uppercase tracking-widest mb-3">Setup pendente</div>
          {["WhatsApp Business API — registrazione account",
            "n8n workflow appuntamenti",
            "Google Calendar integration",
            "Database clienti JSON",
            "LLM generazione messaggi",
            "Pilot: prime 2 settimane con Maria"].map((s, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <div className="w-3.5 h-3.5 rounded border border-amber-500/40 flex-shrink-0" />
              <span className="text-[11px] text-slate-300">{s}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] font-mono text-emerald-400/70">
            Target: EUR 1.500/mese automatici → finanzia V32
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOM: MATTEO ──────────────────────────────────────────────────────────────
function MatteoRoom() {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
      <MatteoSection />
    </div>
  );
}

// ── ROOM: CLAUDE / THEMIS ─────────────────────────────────────────────────────
function ClaudeRoom() {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
      <ClaudeSection />
    </div>
  );
}

// ── CANVAS PRINCIPALE ─────────────────────────────────────────────────────────
export function CanvasLayout() {
  const { state, isOnline: online } = useGlobalState();
  const [navStack, setNavStack] = useState<NavNode[]>([{ id: "home", label: "Home" }]);

  const currentRoom = navStack[navStack.length - 1].id;

  const pushRoom = (id: RoomId, label: string) => {
    setNavStack(s => [...s, { id, label }]);
    window.scrollTo(0, 0);
  };
  const popRoom = () => setNavStack(s => s.length > 1 ? s.slice(0, -1) : s);

  // ESC per tornare indietro
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navStack.length > 1) popRoom();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navStack]);

  return (
    <div className="h-full flex flex-col bg-[#020617]">
      {/* Breadcrumb */}
      <Breadcrumb stack={navStack} onBack={popRoom} />

      {/* Contenuto con scroll */}
      <div className="flex-1 overflow-y-scroll" style={{ touchAction: "pan-y" }}>
        <div className="max-w-6xl mx-auto px-4 py-5 space-y-4">

          {/* ── HOME ── */}
          {currentRoom === "home" && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">TITANIUM_OS</h1>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}
                    {" · "}{online ? "sistema live" : "offline"}
                  </p>
                </div>
              </div>

              <HeroStatus state={state} online={online} />
              <PillarGrid state={state} onEnter={pushRoom} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuickNotes state={state} />
                <QuickActions />
              </div>

              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3">Sezioni</p>
                <SectionLinks onEnter={pushRoom} />
              </div>
            </>
          )}

          {/* ── ROOMS ── */}
          {currentRoom === "v32"     && <V32Room state={state} />}
          {currentRoom === "genesis" && <GenesisRoom state={state} />}
          {currentRoom === "mims"    && <MimsRoom state={state} />}
          {currentRoom === "eva"     && <EvaRoom state={state} />}
          {currentRoom === "matteo"  && <MatteoRoom />}
          {currentRoom === "claude"  && <ClaudeRoom />}

        </div>
      </div>
    </div>
  );
}

// ── Exports compat (non rimuovere — usati altrove) ────────────────────────────
export const CICLO_STEPS = [
  { id: "build",  label: "COSTRUISCI", color: "text-emerald-400", border: "border-emerald-500/50", bg: "bg-emerald-900/20" },
  { id: "doc",    label: "DOCUMENTA",  color: "text-cyan-400",    border: "border-cyan-500/50",    bg: "bg-cyan-900/20" },
  { id: "teach",  label: "INSEGNA",    color: "text-cyan-400",    border: "border-cyan-500/30",    bg: "bg-cyan-900/10" },
  { id: "unlock", label: "SBLOCCA",    color: "text-indigo-400",  border: "border-indigo-500/50",  bg: "bg-indigo-900/20" },
];
export const PILLARS_DATA = [
  { label: "V32",         pct: 65, bar: "bg-emerald-500", note: "CNC in costruzione", atto: "II" },
  { label: "MIMS",        pct: 30, bar: "bg-amber-500",   note: "Attende V32→VULCAN", atto: "III" },
  { label: "GENESIS",     pct: 55, bar: "bg-cyan-500",    note: "Stack operativo",    atto: "V" },
  { label: "VITA NATURA", pct: 40, bar: "bg-indigo-400",  note: "EVA pilot",          atto: "IV" },
  { label: "IDENTITY",    pct: 35, bar: "bg-slate-500",   note: "Content Engine v2",  atto: "—" },
];
export function CellFocusStandalone()   { return null; }
export function CellCicloStandalone()   { return null; }
export function CellPillarsStandalone() { return null; }
export function CellV32Standalone()     { return null; }
export function CellEcoTree()           { return null; }
export function CellAutomazioni()       { return null; }
export function CellMente()             { return null; }
export function CellContentEngine()     { return null; }
