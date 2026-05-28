// CanvasLayout.tsx | TITANIUM_OS / DASHBOARD | v4.1 | 2026-05-28
// Tela — layout statico + sezione Matteo (skills, interessi, principi)

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight, AlertTriangle, CheckCircle2, Circle,
  StickyNote, Lightbulb, Zap, ExternalLink,
  RefreshCw, ScanLine, FileText, Activity,
  User, Cpu, Wrench, Leaf, BookOpen, ChevronDown, ChevronUp,
} from "lucide-react";
import { useGlobalState } from "../hooks/SystemStateContext";
import { useUIStore } from "../stores/systemStore";

// ── helpers ──────────────────────────────────────────────────────────────────

const api = (url: string, opts?: RequestInit) =>
  fetch(url, opts).then(r => r.json()).catch(() => null);

const PILLAR_CFG: Record<string, { color: string; bar: string; bg: string; nav: string }> = {
  V32:         { color: "#34d399", bar: "bg-emerald-400", bg: "bg-emerald-400/10", nav: "v32" },
  MIMS:        { color: "#fbbf24", bar: "bg-amber-400",   bg: "bg-amber-400/10",   nav: "mims" },
  GENESIS:     { color: "#22d3ee", bar: "bg-cyan-400",    bg: "bg-cyan-400/10",    nav: "genesis" },
  VITA_NATURA: { color: "#818cf8", bar: "bg-indigo-400",  bg: "bg-indigo-400/10",  nav: "eva" },
  IDENTITY:    { color: "#94a3b8", bar: "bg-slate-400",   bg: "bg-slate-400/10",   nav: "cv" },
};

function pct(p: any): number {
  return Number(p?.pct_complete ?? p?.pct ?? 0);
}

// ── SEZIONE: Milestone ────────────────────────────────────────────────────────

function MilestoneSection({ state, online }: { state: any; online: boolean }) {
  const [nextInput, setNextInput] = useState("");
  const milestone   = state?.active_milestone ?? "—";
  const nextStep    = state?.next_step ?? "—";
  const lastAction  = state?.last_action ?? "";
  const blockers: string[] = state?.blockers ?? [];

  const saveNext = () => {
    if (!nextInput.trim()) return;
    api("/api/state", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ next_step: nextInput.trim() }),
    });
    setNextInput("");
  };

  const removeBlocker = (b: string) =>
    api("/api/state", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockers: blockers.filter(x => x !== b) }),
    });

  const pillars = state?.pillars ?? {};
  const overallPct = Object.values(pillars).length
    ? Math.round(Object.values(pillars).reduce((s: number, p: any) => s + pct(p), 0) / Object.values(pillars).length)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

      {/* Milestone principale */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-700/60 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${online ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            Milestone attivo · {online ? "LIVE" : "offline"}
          </span>
          <span className="ml-auto text-[11px] font-mono text-slate-600">{overallPct}% ecosistema</span>
        </div>

        <h2 className="text-lg font-bold text-white leading-snug mb-1">{milestone}</h2>

        <div className="flex items-start gap-2 mt-3 mb-4">
          <ArrowRight size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-emerald-300 leading-snug">{nextStep}</span>
        </div>

        {/* Aggiorna next step */}
        <div className="flex gap-2">
          <input
            value={nextInput}
            onChange={e => setNextInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && saveNext()}
            placeholder="Aggiorna prossimo step..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
          />
          <button
            onClick={saveNext}
            className="px-3 py-2 bg-emerald-900/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors"
          >
            set
          </button>
        </div>

        {lastAction && (
          <p className="text-[11px] font-mono text-slate-600 mt-2">↺ {lastAction}</p>
        )}
      </div>

      {/* Blockers */}
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={13} className={blockers.length ? "text-rose-400" : "text-slate-600"} />
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Blockers</span>
          {blockers.length > 0 && (
            <span className="ml-auto text-[10px] font-mono bg-rose-900/40 text-rose-400 px-1.5 py-0.5 rounded">
              {blockers.length}
            </span>
          )}
        </div>

        {blockers.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 size={14} className="text-emerald-500/50" />
            Nessun blocker attivo
          </div>
        ) : (
          <div className="space-y-2">
            {blockers.map(b => (
              <div key={b} className="flex items-start gap-2 group">
                <span className="text-rose-400 mt-0.5 flex-shrink-0">▸</span>
                <span className="text-sm text-slate-300 flex-1 leading-snug">{b}</span>
                <button
                  onClick={() => removeBlocker(b)}
                  className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 text-xs transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SEZIONE: Pilastri ─────────────────────────────────────────────────────────

function PilastriSection({ state }: { state: any }) {
  const navigateTo = useUIStore(s => s.navigateTo);
  const pillars = state?.pillars ?? {};
  const entries = Object.entries(pillars) as [string, any][];

  if (!entries.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {entries.map(([key, p]) => {
        const cfg = PILLAR_CFG[key] ?? { color: "#94a3b8", bar: "bg-slate-400", bg: "bg-slate-400/10", nav: key.toLowerCase() };
        const progress = pct(p);
        const next = p?.next ?? p?.phase ?? "";

        return (
          <button
            key={key}
            onClick={() => navigateTo("sinapsi", cfg.nav)}
            className={`text-left rounded-2xl border border-slate-700/60 p-4 ${cfg.bg} hover:border-slate-500 transition-all group`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider" style={{ color: cfg.color }}>
                {key.replace("_", " ")}
              </span>
              <ExternalLink size={10} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
            </div>

            <div className="text-2xl font-bold text-white mb-2">{progress}<span className="text-sm text-slate-500">%</span></div>

            <div className="h-1 bg-slate-800 rounded-full mb-2">
              <div className={`h-full rounded-full ${cfg.bar} transition-all`} style={{ width: `${progress}%` }} />
            </div>

            {next && (
              <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{next}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── SEZIONE: Note + Suggerimenti ──────────────────────────────────────────────

function buildSuggestions(state: any): string[] {
  const tips: string[] = [];
  if (!state) return tips;

  const blockers: string[] = state.blockers ?? [];
  blockers.forEach(b => tips.push(`Risolvi blocker: ${b}`));

  const pillars = state.pillars ?? {};
  Object.entries(pillars).forEach(([key, p]: [string, any]) => {
    const n = p?.next ?? p?.phase;
    if (n && pct(p) < 100) tips.push(`${key.replace("_", " ")}: ${n}`);
  });

  if (!state.last_rag_rebuild) tips.push("RAG rebuild non registrato — esegui rag-rebuild");
  if (state.session_count && state.session_count > 3) {
    tips.push("Sessione > 3 — aggiorna STATE.json con progressi");
  }

  return tips.slice(0, 5);
}

function NotesSuggestionsSection({ state }: { state: any }) {
  const [notes, setNotes] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carica note da STATE
  useEffect(() => {
    if (state?.canvas_notes !== undefined) setNotes(state.canvas_notes);
  }, [state?.canvas_notes]);

  const handleChange = (val: string) => {
    setNotes(val);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      api("/api/state", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canvas_notes: val }),
      }).then(() => setSaved(true));
    }, 800);
  };

  const suggestions = buildSuggestions(state);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Note */}
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <StickyNote size={13} className="text-amber-400" />
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Note rapide</span>
          {saved && <span className="ml-auto text-[10px] font-mono text-emerald-500/70">salvato ✓</span>}
        </div>
        <textarea
          value={notes}
          onChange={e => handleChange(e.target.value)}
          placeholder={"Scrivi qui — salvato automaticamente in STATE.json\n\nIdee, misure, promemoria..."}
          className="w-full h-36 bg-slate-800/60 border border-slate-700/50 rounded-xl px-3 py-3 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-amber-500/30 resize-none font-mono leading-relaxed"
        />
      </div>

      {/* Suggerimenti */}
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={13} className="text-cyan-400" />
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Suggerimenti</span>
        </div>

        {suggestions.length === 0 ? (
          <div className="text-sm text-slate-600 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500/40" />
            Nessun suggerimento — sistema in ordine
          </div>
        ) : (
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Circle size={6} className="text-cyan-500/60 flex-shrink-0 mt-1.5" />
                <span className="text-sm text-slate-300 leading-snug">{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SEZIONE: Azioni rapide ────────────────────────────────────────────────────

const ACTIONS = [
  { id: "scan",  label: "Scan MENTE",  icon: ScanLine,  color: "text-emerald-400 border-emerald-500/30 hover:border-emerald-400", endpoint: "/api/scan",        method: "POST" },
  { id: "rag",   label: "RAG Rebuild", icon: RefreshCw, color: "text-cyan-400 border-cyan-500/30 hover:border-cyan-400",          endpoint: "/api/rag/rebuild", method: "POST" },
  { id: "brief", label: "Daily Brief", icon: FileText,  color: "text-indigo-400 border-indigo-500/30 hover:border-indigo-400",    endpoint: "/api/daily-brief", method: "POST" },
  { id: "check", label: "API Health",  icon: Activity,  color: "text-slate-400 border-slate-600 hover:border-slate-400",          endpoint: "/api/health",      method: "GET" },
];

type Btn = "idle" | "loading" | "ok" | "err";

function QuickActions() {
  const [st, setSt] = useState<Record<string, Btn>>({});

  const run = async (a: typeof ACTIONS[0]) => {
    setSt(s => ({ ...s, [a.id]: "loading" }));
    const res = await api(a.endpoint, { method: a.method, headers: { "Content-Type": "application/json" }, body: a.method === "GET" ? undefined : "{}" });
    setSt(s => ({ ...s, [a.id]: res ? "ok" : "err" }));
    setTimeout(() => setSt(s => ({ ...s, [a.id]: "idle" })), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map(a => {
        const Icon = a.icon;
        const status = st[a.id] ?? "idle";
        return (
          <button
            key={a.id}
            onClick={() => run(a)}
            disabled={status === "loading"}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-900 text-sm font-mono transition-all disabled:opacity-50 ${a.color}`}
          >
            <Icon size={13} className={status === "loading" ? "animate-spin" : ""} />
            {status === "ok" ? "OK ✓" : status === "err" ? "ERR" : a.label}
          </button>
        );
      })}
    </div>
  );
}

// ── SEZIONE: Navigazione ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "storie",  label: "Storie",       desc: "Episodi podcast & dataset",  color: "text-amber-400" },
  { id: "sinapsi", label: "Sinapsi",       desc: "Mappa idee & pilastri",       color: "text-cyan-400" },
  { id: "neuro",   label: "Neuro Map",     desc: "Intelligence & scanner",      color: "text-indigo-400" },
  { id: "rete",    label: "Rete",          desc: "File knowledge base",         color: "text-emerald-400" },
  { id: "docs",    label: "Docs",          desc: "Markdown manager",            color: "text-slate-400" },
];

function NavSection() {
  const navigateTo = useUIStore(s => s.navigateTo);
  return (
    <div className="flex flex-wrap gap-2">
      {NAV_LINKS.map(n => (
        <button
          key={n.id}
          onClick={() => navigateTo(n.id)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700/60 bg-slate-900 hover:border-slate-500 transition-all group"
        >
          <Zap size={11} className={`${n.color} opacity-70 group-hover:opacity-100`} />
          <div className="text-left">
            <div className={`text-xs font-semibold ${n.color}`}>{n.label}</div>
            <div className="text-[10px] text-slate-600">{n.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── SEZIONE: Matteo ───────────────────────────────────────────────────────────

const SKILLS_INDUSTRIA = [
  { label: "TIG gr.1/gr.2 titanio", note: "MotoGP · SCProject · 200A bagno fusione" },
  { label: "Robot Panasonic + cobot", note: "Programmazione percorsi + automazione ESSEGI" },
  { label: "Manutenzione presse 250bar", note: "Pneumatica / oleodinamica / idraulica · DATWLER" },
  { label: "QC + NDT/DT", note: "Test distruttivi, calibri, collaudi 60bar · LU.VE" },
  { label: "Progettazione meccanica CNC", note: "V32 178kg · Epoxy Granite · 8 Custodi · IT6-IT7" },
  { label: "Elettrica civile / industriale", note: "Quadri, relè, alimentatori, strumentazione · IN APPRENDIMENTO" },
];

const SKILLS_DIGITAL = [
  { label: "LLM + Prompt Engineering", note: "Claude API · input tecnici strutturati · output verificati" },
  { label: "Python 3.11", note: "Flask API · RAG pipeline · CLI tools · automazioni" },
  { label: "RAG + ChromaDB", note: "Knowledge base personale · SentenceTransformer offline" },
  { label: "React + Vite + Tailwind", note: "Dashboard TITANIUM_OS · componenti live" },
  { label: "MCP Server custom", note: "Integrazione AI ↔ filesystem / STATE.json" },
  { label: "Git / GitHub", note: "Version control · repository pubblici · commit workflow" },
  { label: "n8n + PowerShell", note: "Automazioni workflow · Task Scheduler · profile avanzato" },
];

const INTERESSI = [
  { icon: "🐠", label: "Acquario / Acquaponica", note: "Sistemi chiusi, biofiltri, ciclo azoto — in studio" },
  { icon: "🧫", label: "Bioreattori", note: "Fermentazione, mycologia, microalghe — prototipo futuro" },
  { icon: "🌱", label: "Serre e coltivazione", note: "Idroponica, coltivazione indoor, automazione clima" },
  { icon: "⚡", label: "Impianti elettrici", note: "Civile + industriale — linguaggio tecnico + pratica" },
  { icon: "📚", label: "Ricerca tecnica automatizzata", note: "Agent per trovare paper, tesi universitarie, libri tecnici → RAG" },
  { icon: "🎙️", label: "Content Engine", note: "YouTube + LinkedIn + podcast — 1 build → N output" },
];

const PRINCIPI = [
  "Costruisci ciò che usi — il primo cliente sei tu.",
  "Se funziona in taverna, funziona ovunque.",
  "Non costruiamo prodotti. Costruiamo libertà.",
  "1 input → N output. Ogni azione produce più artefatti.",
  "Identifica → Automatizza → Scala.",
  "Un sistema che gira da solo vale più di 10 abitudini.",
];

function MatteoSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
      {/* Header collapsible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800/40 transition-colors"
      >
        <User size={14} className="text-slate-400 flex-shrink-0" />
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Matteo Benenati — Profilo</span>
        <span className="ml-2 text-[10px] font-mono text-slate-700">
          tecnico industriale · system builder · AI integrator
        </span>
        <span className="ml-auto text-slate-600">
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-800">

          {/* Skill Tree */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-4">

            {/* Industria */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench size={12} className="text-amber-400" />
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Competenze Industria</span>
              </div>
              <div className="space-y-1.5">
                {SKILLS_INDUSTRIA.map(s => (
                  <div key={s.label} className="flex flex-col gap-0">
                    <span className="text-xs font-semibold text-slate-200">{s.label}</span>
                    <span className="text-[10px] text-slate-600 leading-snug">{s.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital + AI */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={12} className="text-cyan-400" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Competenze Digital + AI</span>
              </div>
              <div className="space-y-1.5">
                {SKILLS_DIGITAL.map(s => (
                  <div key={s.label} className="flex flex-col gap-0">
                    <span className="text-xs font-semibold text-slate-200">{s.label}</span>
                    <span className="text-[10px] text-slate-600 leading-snug">{s.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interessi e aree */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={12} className="text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Interessi & Aree in Sviluppo</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {INTERESSI.map(i => (
                <div key={i.label} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
                  <div className="text-base mb-1">{i.icon}</div>
                  <div className="text-xs font-semibold text-slate-200 leading-tight">{i.label}</div>
                  <div className="text-[10px] text-slate-600 leading-snug mt-0.5">{i.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Principi */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={12} className="text-indigo-400" />
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Principi Operativi</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {PRINCIPI.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500/50 text-[10px] font-mono mt-0.5 flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <span className="text-xs text-slate-400 leading-snug italic">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orizzonte 2030 */}
          <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/30">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Orizzonte 2030</span>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Capannone autonomo · V32 in produzione MIMS · EVA genera cashflow · YouTube 47k+
              <span className="block text-[10px] text-slate-600 mt-1 font-mono">
                "0.008 mm. Display. Luglio 2030. Finestre industriali. Luce."
              </span>
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

// ── CANVAS PRINCIPALE ─────────────────────────────────────────────────────────

export function CanvasLayout() {
  const { state, isOnline: online } = useGlobalState();

  return (
    <div className="h-full overflow-y-auto bg-[#020617]">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">TITANIUM_OS</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}
              {" · "}Tela operativa
            </p>
          </div>
          <QuickActions />
        </div>

        {/* Milestone + Blockers */}
        <MilestoneSection state={state} online={online} />

        {/* Pilastri */}
        <PilastriSection state={state} />

        {/* Note + Suggerimenti */}
        <NotesSuggestionsSection state={state} />

        {/* Matteo — profilo, skills, interessi */}
        <MatteoSection />

        {/* Navigazione */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-4">
          <p className="text-[11px] font-mono text-slate-600 uppercase tracking-widest mb-3">Navigazione</p>
          <NavSection />
        </div>

      </div>
    </div>
  );
}

// ── Exports compat ────────────────────────────────────────────────────────────
export const CICLO_STEPS = [
  { id: "build", label: "COSTRUISCI", color: "text-emerald-400", border: "border-emerald-500/50", bg: "bg-emerald-900/20" },
  { id: "doc",   label: "DOCUMENTA",  color: "text-cyan-400",    border: "border-cyan-500/50",    bg: "bg-cyan-900/20" },
  { id: "teach", label: "INSEGNA",    color: "text-cyan-400",    border: "border-cyan-500/30",    bg: "bg-cyan-900/10" },
  { id: "unlock",label: "SBLOCCA",    color: "text-indigo-400",  border: "border-indigo-500/50",  bg: "bg-indigo-900/20" },
];

export const PILLARS_DATA = [
  { label: "V32",         pct: 65, bar: "bg-emerald-500", note: "CNC in costruzione", atto: "II" },
  { label: "MIMS",        pct: 30, bar: "bg-amber-500",   note: "Attende V32→VULCAN", atto: "III" },
  { label: "GENESIS",     pct: 55, bar: "bg-cyan-500",    note: "Stack operativo",    atto: "V" },
  { label: "VITA NATURA", pct: 40, bar: "bg-indigo-400",  note: "EVA pilot",          atto: "IV" },
  { label: "IDENTITY",    pct: 35, bar: "bg-slate-500",   note: "Content Engine v2",  atto: "—" },
];

export function CellFocusStandalone() { return null; }
export function CellCicloStandalone() { return null; }
export function CellPillarsStandalone() { return null; }
export function CellV32Standalone() { return null; }
export function CellEcoTree() { return null; }
export function CellAutomazioni() { return null; }
export function CellMente() { return null; }
export function CellContentEngine() { return null; }
