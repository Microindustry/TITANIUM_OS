// CanvasLayout.tsx | TITANIUM_OS / DASHBOARD | v4.2 | 2026-05-28
// Tela — layout statico + sezione Matteo (skills espandibili, interessi, principi)

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight, AlertTriangle, CheckCircle2, Circle,
  StickyNote, Lightbulb, Zap, ExternalLink,
  RefreshCw, ScanLine, FileText, Activity,
  User, Cpu, Wrench, Leaf, BookOpen, ChevronDown, ChevronUp, ChevronRight,
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

type Skill = {
  label: string;
  note: string;
  company: string;
  tags: string[];
  details: string[];
};

const SKILLS_INDUSTRIA: Skill[] = [
  {
    label: "TIG gr.1/gr.2 titanio",
    note: "MotoGP · SCProject · 200A bagno fusione",
    company: "SCProject",
    tags: ["Titanio", "Aerospace", "MotoGP", "TIG"],
    details: [
      "Saldatura TIG su titanio grado 1 e 2 — spessori 0.8–4 mm, corrente fino a 200A",
      "Parti MotoGP: collettori scarico, supporti telai, cover titanio e acciaio inox",
      "Controllo bagno fusione, gestione gas di protezione (Ar 99.999%), back-purge",
      "Materiali: Ti6Al4V · gr.9 · gr.1 puro — riconoscimento visivo cordone",
      "Lavoro in camera bianca su pezzi pre-consegna team factory MotoGP",
    ],
  },
  {
    label: "Robot Panasonic + cobot",
    note: "Programmazione percorsi + automazione ESSEGI",
    company: "ESSEGI",
    tags: ["Robotica", "MIG", "Automazione", "Panasonic"],
    details: [
      "Programmazione robot Panasonic serie TM per saldatura MIG automatizzata",
      "Setup percorsi su fixture custom — tolleranza ripetibilità ±0.1 mm",
      "Parametri: velocità filo, tensione d'arco, frequenza oscillazione, gas mix Ar/CO₂",
      "Cobot: collaborazione uomo-macchina per tratti difficili — safe-stop e zone",
      "Ottimizzazione cicli: riduzione ciclo pezzo da 4 min a 2:20 — scarti < 2%",
    ],
  },
  {
    label: "Manutenzione presse 250 bar",
    note: "Pneumatica · oleodinamica · idraulica · DATWLER",
    company: "DATWLER",
    tags: ["Pneumatica", "Oleodinamica", "Idraulica", "PLC", "Siemens"],
    details: [
      "Pneumatica: valvole direzionali 5/2 e 5/3, cilindri ISO, regolatori e FRL, pressostati",
      "Oleodinamica: pompe pistoni assiali, valvole proporzionali, accumulatori a membrana",
      "Idraulica presse: circuiti 250 bar, sostituzioni guarnizioni, diagnosi perdite su manifold",
      "Elettronica: lettura schemi ladder PLC Siemens S7, diagnosi I/O, sostituzione moduli",
      "Manutenzione preventiva: piani PM settimanali/mensili, MTBF tracking su fogli officina",
      "Diagnosi guasti: analisi vibrazioni, test pressione, lettura parametri HMI TP900",
    ],
  },
  {
    label: "QC + NDT / DT",
    note: "Test distruttivi, calibri, collaudi 60 bar · LU.VE",
    company: "LU.VE",
    tags: ["QC", "NDT", "Collaudi", "Metrology"],
    details: [
      "Controllo dimensionale: calibri, micrometri, comparatori, rugosimetri — ISO GPS",
      "NDT: ispezione visiva VT, penetranti PT, ultrasuoni UT su pezzi saldati",
      "DT: test a pressione fino a 60 bar su scambiatori e collettori in alluminio",
      "Redazione rapporti di non-conformità, NCR e 8D su SAP",
      "Collaudo finale su linea: test funzionali, leak test, certificazione CE",
    ],
  },
  {
    label: "Progettazione meccanica CNC",
    note: "V32 178 kg · Epoxy Granite · IT6-IT7",
    company: "TITANIUM_OS",
    tags: ["CNC", "CAD", "Epoxy Granite", "Precisione"],
    details: [
      "V32: fresatrice 3 assi 178 kg — telaio 40×40×3 S235 + colonne 60×60, h 905 mm",
      "Precisione RSS ±0.019 mm — IT6-IT7 — delta EG corretto a 0.03–0.06 mm",
      "Epoxy Granite filling su colonne cave — smorzamento vibrazioni +40 dB",
      "Guide SBR20 + viti sfe PMI C5 — 8 custodi ZX400 con pre-carico regolabile",
      "Servo Leadshine: closed-loop NEMA34 12 Nm — encoder 1000 ppr",
      "BEP: 61 ore → ROI anno 1 stimato 322% a €45/h Precision Lab",
    ],
  },
  {
    label: "Elettrica civile / industriale",
    note: "Quadri, relè, alimentatori, strumentazione",
    company: "Self-learning",
    tags: ["Elettrica", "Quadri", "CEI", "In apprendimento"],
    details: [
      "Lettura schemi elettrici civili e industriali — CEI 64-8, EN 60204-1",
      "Cablaggio quadri: morsettiere, interruttori, relè, contattori, inverter",
      "Strumentazione: PT100, termocoppie tipo K, trasduttori pressione 4-20 mA",
      "Alimentatori switching, UPS, cablaggi CAN bus e RS485 su macchine",
      "IN APPRENDIMENTO — corso CEI 11-27 + pratica su V32 CNC cabinet",
    ],
  },
];

const SKILLS_DIGITAL: Skill[] = [
  {
    label: "LLM + Prompt Engineering",
    note: "Claude API · input tecnici strutturati · output verificati",
    company: "Anthropic / TITANIUM_OS",
    tags: ["Claude API", "Prompt", "Agents", "MCP"],
    details: [
      "Claude API: structured prompts per output tecnici verificabili (BOM, schemi, codice)",
      "Gestione contesto lungo: chunking, cache prompts, tool use su dati RAG",
      "Agent framework: 8 agenti validatori specializzati (TESLA, FORGE, ARIA, EVA…)",
      "MCP custom: 5 tool server locali — get_state, search_mente, update_milestone",
      "Research Agent: 11 sorgenti accademiche (arXiv, OpenAlex, Semantic Scholar, CNKI)",
    ],
  },
  {
    label: "Python 3.11",
    note: "Flask API · RAG pipeline · CLI tools · automazioni",
    company: "TITANIUM_OS",
    tags: ["Python", "Flask", "CLI", "Scripts"],
    details: [
      "Flask REST API (localhost:5001) — endpoint /api/media /api/photos /api/pdfs",
      "CLI tools: pdf_to_memory.py, generate_restart_prompt.py, generate_functions_list.py",
      "Pipeline dati: estrazione testo, chunking, embedding, upsert ChromaDB",
      "Automazioni: MENTE_WATCHER, MENTE_SCANNER (818+ estrazioni), deep_freeze.py",
      "Stile: Path-based (no hardcoded), header obbligatorio, env vars da .env",
    ],
  },
  {
    label: "RAG + ChromaDB",
    note: "Hybrid v4.0 · BM25 + semantico + CrossEncoder",
    company: "TITANIUM_OS / GENESIS",
    tags: ["RAG", "ChromaDB", "BM25", "SentenceTransformer"],
    details: [
      "RAG v4.0 hybrid: BM25 TF-IDF (sklearn) + semantico cosine (ChromaDB)",
      "Merge Reciprocal Rank Fusion (RRF k=60) — top-15 → reranker → top-5",
      "Reranker: cross-encoder/ms-marco-MiniLM-L-6-v2 (preciso su Q&A tecnico)",
      "Embedding: paraphrase-multilingual-MiniLM-L12-v2 — 384-dim, IT/EN/DE/FR offline",
      "Chunk: 512 chars / stride 200 — incrementale via manifest JSON (no rebuild)",
    ],
  },
  {
    label: "React + Vite + Tailwind",
    note: "Dashboard TITANIUM_OS · Tela v4.2",
    company: "TITANIUM_OS",
    tags: ["React", "Vite", "Tailwind", "Zustand", "TanStack"],
    details: [
      "Dashboard TITANIUM_OS: CanvasLayout, EcosystemView, StorieView, NeuroMapView",
      "State management: Zustand + TanStack Query — polling API ogni 30s",
      "Command Bar Ctrl+K — navigazione rapida, ricerca sezioni, azioni",
      "Dark UI: Tailwind slate palette + responsive grid, componenti componibili",
      "WebSocket-ready: struttura predisposta per live-update da API server",
    ],
  },
  {
    label: "MCP Server custom",
    note: "Integrazione AI ↔ filesystem / STATE.json",
    company: "TITANIUM_OS",
    tags: ["MCP", "Claude Code", "Tools", "Python"],
    details: [
      "5 tool MCP: get_state · update_milestone · search_mente · get_daily_brief · list_content_ready",
      "Auto-load in Claude Code via .claude/settings.json — zero setup per sessione",
      "search_mente: query RAG v4.0 da Claude senza aprire terminale",
      "update_milestone: scrive su STATE.json + incrementa session_count + commit opzionale",
      "Architettura: stdio transport, Python asyncio, type-safe tool definitions",
    ],
  },
  {
    label: "Git / GitHub",
    note: "Version control · repo pubblici · workflow",
    company: "GitHub / TITANIUM_OS",
    tags: ["Git", "GitHub", "CI", "Workflow"],
    details: [
      "Repo TITANIUM_OS su GitHub (Microindustry/TITANIUM_OS) — commit per sessione",
      "Hooks Stop: auto-commit STATE.json + push dopo ogni sessione significativa",
      "Branch strategy: main sempre deployable — feature branch per refactor grandi",
      "GitHub CLI (gh 2.92): PR, status, release da terminale",
      "Prossimo: GitHub Actions per CI + GitHub profile pubblico IDENTITY",
    ],
  },
  {
    label: "n8n + PowerShell",
    note: "Automazioni workflow · Task Scheduler · profile avanzato",
    company: "TITANIUM_OS",
    tags: ["n8n", "PowerShell", "Automazione", "Windows"],
    details: [
      "n8n localhost:5678 (SQLite): workflow trigger HTTP, webhook, cron — base EVA",
      "PowerShell profile: aliases (claude-ti, brief, rag, ask, research, ti-status…)",
      "UTF-8 BOM su profilo PS — fix encoding emoji per PS 5.1 su Windows 10",
      "Task Scheduler: START_LOGIN.bat v1.1 — auto-avvio ecosistema al login Windows",
      "Profilo PS: funzioni per agenti, research, rag, git shortcuts, PATH management",
    ],
  },
];

type Interesse = {
  icon: string;
  label: string;
  note: string;
  details: string[];
};

const INTERESSI: Interesse[] = [
  {
    icon: "🐠",
    label: "Acquario / Acquaponica",
    note: "Sistemi chiusi, biofiltri, ciclo azoto",
    details: [
      "Sistemi acquaponici: integrazione pesce + piante in ciclo chiuso",
      "Biofiltrazione: ciclo azoto (NH₃ → NO₂ → NO₃), parametri acqua",
      "Automazione: sensori pH/TDS/temperatura → controllo pompe via Arduino/ESP32",
      "Studio: dimensionamento serbatoi, densità ittica, grow bed ratio",
    ],
  },
  {
    icon: "🧫",
    label: "Bioreattori",
    note: "Fermentazione, mycologia, microalghe",
    details: [
      "Fermentazione: SCOBY, kefir, kimchi — controllo temperatura e pH",
      "Mycologia: coltivazione funghi su substrati lignocellulosici, sterilizzazione",
      "Microalghe: Spirulina, Chlorella — potenziale integrazione acquaponica",
      "Bioreattore DIY: camera a pressione positiva, agitatore magnetico, UV sterilizzazione",
    ],
  },
  {
    icon: "🌱",
    label: "Serre e coltivazione",
    note: "Idroponica, indoor, automazione clima",
    details: [
      "Idroponica: NFT, DWC, ebb&flow — nutrienti, EC, pH target per coltura",
      "Automazione clima: controllo LED grow, ventilazione, umidità relativa",
      "Integrazione V32: componenti serra in alluminio lavorati a CNC",
      "Target: modulo autonomo 2m² per produzione erbe aromatiche Vita Natura",
    ],
  },
  {
    icon: "⚡",
    label: "Impianti elettrici",
    note: "Civile + industriale — CEI, linguaggio tecnico",
    details: [
      "Civile: lettura planimetrie, calcolo sezioni cavo, protezioni differenziali",
      "Industriale: quadri 400V, avviatori diretti/stella-triangolo, inverter",
      "Studio: CEI 64-8, EN 60204-1, norma ATEX base",
      "Pratica: cablaggio quadro V32 CNC — 48V servo + 24V controllo + schermo",
    ],
  },
  {
    icon: "📚",
    label: "Research Agent",
    note: "Paper, tesi, libri tecnici → RAG automatico",
    details: [
      "11 sorgenti: arXiv, OpenAlex, Semantic Scholar, Baidu, CNKI, GitHub, tesi EU",
      "Query CLI: research -Query \"epoxy granite CNC\" -Domain V32 -Rag",
      "Output strutturato: titolo, abstract, anno, DOI, link — JSON + auto-RAG",
      "Filtri: -Domain V32|CNC|acquaponica|bioreattori — rilevanza contestuale",
      "Prossimo: UI panel in Dashboard per triggere ricerche da Tela",
    ],
  },
  {
    icon: "🎙️",
    label: "Content Engine",
    note: "YouTube + LinkedIn + podcast — 1 build → N output",
    details: [
      "22 episodi generati: dual-pass haiku (bozza) + sonnet (narrativa finale)",
      "Pipeline: milestone → script episodio → reel_hook → LinkedIn post → dataset",
      "Formato: storia tecnica + dato misurabile + open loop emotivo",
      "Dataset JSONL: fine-tuning futuro LLM personale su stile narrativo TITANIUM_OS",
      "Avatar AVA (pianificato): YouTube shorts, voce sintetica, taglio industriale",
    ],
  },
];

const PRINCIPI = [
  "Costruisci ciò che usi — il primo cliente sei tu.",
  "Se funziona in taverna, funziona ovunque.",
  "Non costruiamo prodotti. Costruiamo libertà.",
  "1 input → N output. Ogni azione produce più artefatti.",
  "Identifica → Automatizza → Scala.",
  "Un sistema che gira da solo vale più di 10 abitudini.",
];

function SkillRow({ skill, accent }: { skill: Skill; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all ${open ? "border-slate-600/60 bg-slate-800/40" : "border-transparent"}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-2 px-3 py-2.5 text-left hover:bg-slate-800/30 rounded-xl transition-colors"
      >
        <ChevronRight
          size={12}
          className={`mt-0.5 flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
          style={{ color: accent }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-200 leading-tight">{skill.label}</div>
          <div className="text-[10px] text-slate-600 leading-snug mt-0.5">{skill.note}</div>
        </div>
        <span
          className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5"
          style={{ color: accent, background: `${accent}18` }}
        >
          {skill.company}
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-2">
          <div className="flex flex-wrap gap-1 mb-1">
            {skill.tags.map(t => (
              <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">{t}</span>
            ))}
          </div>
          <ul className="space-y-1">
            {skill.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-slate-700 mt-1 flex-shrink-0" style={{ fontSize: 6 }}>▸</span>
                <span className="text-[10px] text-slate-400 leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function InteresseCard({ item }: { item: Interesse }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-xl border cursor-pointer transition-all ${open ? "border-emerald-500/30 bg-emerald-900/10" : "border-slate-700/40 bg-slate-800/50 hover:border-slate-600/50"}`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-1">
          <div className="text-base">{item.icon}</div>
          <ChevronRight size={11} className={`text-slate-600 mt-1 flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`} />
        </div>
        <div className="text-xs font-semibold text-slate-200 leading-tight mt-1">{item.label}</div>
        <div className="text-[10px] text-slate-600 leading-snug mt-0.5">{item.note}</div>
      </div>
      {open && (
        <div className="px-3 pb-3 border-t border-slate-700/30">
          <ul className="space-y-1 mt-2">
            {item.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1 flex-shrink-0" style={{ fontSize: 6 }}>▸</span>
                <span className="text-[10px] text-slate-400 leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MatteoSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
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
        <div className="px-5 pb-5 space-y-5 border-t border-slate-800">

          {/* Skill Tree */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench size={12} className="text-amber-400" />
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Competenze Industria</span>
              </div>
              <div className="space-y-0.5">
                {SKILLS_INDUSTRIA.map(s => (
                  <SkillRow key={s.label} skill={s} accent="#fbbf24" />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={12} className="text-cyan-400" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Competenze Digital + AI</span>
              </div>
              <div className="space-y-0.5">
                {SKILLS_DIGITAL.map(s => (
                  <SkillRow key={s.label} skill={s} accent="#22d3ee" />
                ))}
              </div>
            </div>
          </div>

          {/* Interessi */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={12} className="text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Interessi & Aree in Sviluppo</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {INTERESSI.map(i => <InteresseCard key={i.label} item={i} />)}
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
