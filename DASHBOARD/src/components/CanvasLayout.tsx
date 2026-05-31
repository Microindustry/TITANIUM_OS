// CanvasLayout.tsx | TITANIUM_OS / DASHBOARD | v6.1 | 2026-05-29
// Command center con navigazione drill-down — celle una dentro l'altra

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2,
  StickyNote, ChevronRight, User, Cpu, Layers,
  Box, Mic, Circle,
} from "lucide-react";
import { useGlobalState } from "../hooks/SystemStateContext";
import { useUIStore } from "../stores/systemStore";
import { MatteoSection } from "./MatteoSection";
import { MimsSection } from "./MimsSection";
import { GenesisSection } from "./GenesisSection";
import { CriticheSection } from "./CriticheSection";
import { ClaudeSection } from "./ClaudeSection";

// ── API helper ────────────────────────────────────────────────────────────────
const api = (url: string, opts?: RequestInit) =>
  fetch(url, opts).then(r => r.json()).catch(() => null);

// ── NAVIGAZIONE A STACK ───────────────────────────────────────────────────────
type RoomId = "home" | "v32" | "genesis" | "mims" | "eva" | "matteo" | "claude" | "critiche";
interface NavNode { id: RoomId; label: string }

// ── COLORI PILASTRI ───────────────────────────────────────────────────────────
const PILLAR_CFG: Record<string, {
  color: string; colorDim: string; bar: string; bg: string; border: string;
  glow: string; room: RoomId; gradient: string;
}> = {
  V32:         { color: "#34d399", colorDim: "#34d39940", bar: "bg-emerald-400", bg: "bg-emerald-950/60",  border: "border-emerald-500/50", glow: "0 0 40px #34d39920", room: "v32",     gradient: "from-emerald-950/80 to-slate-900/90" },
  MIMS:        { color: "#fbbf24", colorDim: "#fbbf2440", bar: "bg-amber-400",   bg: "bg-amber-950/60",    border: "border-amber-500/50",   glow: "0 0 40px #fbbf2420", room: "mims",    gradient: "from-amber-950/80 to-slate-900/90"   },
  GENESIS:     { color: "#22d3ee", colorDim: "#22d3ee40", bar: "bg-cyan-400",    bg: "bg-cyan-950/60",     border: "border-cyan-500/50",    glow: "0 0 40px #22d3ee20", room: "genesis", gradient: "from-cyan-950/80 to-slate-900/90"    },
  VITA_NATURA: { color: "#a78bfa", colorDim: "#a78bfa40", bar: "bg-violet-400",  bg: "bg-violet-950/60",   border: "border-violet-500/50",  glow: "0 0 40px #a78bfa20", room: "eva",     gradient: "from-violet-950/80 to-slate-900/90"  },
  IDENTITY:    { color: "#94a3b8", colorDim: "#94a3b840", bar: "bg-slate-400",   bg: "bg-slate-800/60",    border: "border-slate-500/50",   glow: "0 0 40px #94a3b815", room: "matteo",  gradient: "from-slate-800/80 to-slate-900/90"   },
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


// ── HOME: PILLAR GRID — celle grandi e fisiche ────────────────────────────────
function PillarGrid({ state, onEnter }: { state: any; onEnter: (id: RoomId, label: string) => void }) {
  const pillars = state?.pillars ?? {};
  const entries = Object.entries(pillars) as [string, any][];
  if (!entries.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {entries.map(([key, p]) => {
        const cfg = PILLAR_CFG[key] ?? {
          color: "#94a3b8", colorDim: "#94a3b840", bar: "bg-slate-400",
          bg: "bg-slate-800/60", border: "border-slate-500/50",
          glow: "0 0 40px #94a3b815", room: "home" as RoomId, gradient: "from-slate-800/80 to-slate-900/90"
        };
        const progress = pct(p);
        const rawStatus = String(p?.status ?? "");
        const statusText = rawStatus === "in_progress" ? "IN CORSO"
          : rawStatus.startsWith("waiting") ? "IN ATTESA"
          : rawStatus === "building" ? "BUILDING"
          : rawStatus === "active" ? "ATTIVO"
          : rawStatus.toUpperCase();

        return (
          <button
            key={key}
            onClick={() => onEnter(cfg.room, key.replace("_", " "))}
            className={`group relative text-left rounded-2xl overflow-hidden
                        bg-gradient-to-br ${cfg.gradient}
                        border-2 ${cfg.border}
                        transition-all duration-300 p-6 min-h-[200px] flex flex-col
                        hover:-translate-y-1 hover:border-opacity-80`}
            style={{ boxShadow: cfg.glow }}
          >
            {/* Glow angolo top-left */}
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full opacity-20 blur-2xl pointer-events-none"
                 style={{ background: cfg.color }} />

            {/* Header */}
            <div className="flex items-start justify-between mb-auto">
              <div>
                <div className="text-[11px] font-black font-mono uppercase tracking-[0.2em] mb-1"
                     style={{ color: cfg.color }}>
                  {key.replace("_", " ")}
                </div>
                {statusText && (
                  <div className="text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded"
                       style={{ color: cfg.color, background: cfg.colorDim }}>
                    {statusText}
                  </div>
                )}
              </div>
              <ChevronRight size={16} className="transition-all duration-200 mt-0.5"
                            style={{ color: cfg.color, opacity: 0.5 }} />
            </div>

            {/* Percentuale grande */}
            <div className="my-4">
              <span className="text-6xl font-black tabular-nums text-white leading-none">
                {progress}
              </span>
              <span className="text-2xl font-bold ml-1" style={{ color: cfg.color }}>%</span>
            </div>

            {/* Barra progresso */}
            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${cfg.bar} transition-all duration-700`}
                   style={{ width: `${progress}%` }} />
            </div>
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
            onClick={() => s.id ? onEnter(s.id, s.label) : navigateTo(s.nav! as any)}
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
    { k: "Investimento",v: "EUR 2.250" },
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
function GenesisRoom(_: { state: any }) {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
      <GenesisSection />
    </div>
  );
}

// ── ROOM: MIMS ────────────────────────────────────────────────────────────────
function MimsRoom(_: { state: any }) {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
      <MimsSection />
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

// ── NIGHT SCHEDULE WIDGET ────────────────────────────────────────────────────
const NIGHT_TASKS = [
  { time: "02:07", label: "Story Agent",    desc: "episodi da git log",          color: "text-violet-400", dot: "bg-violet-500" },
  { time: "03:00", label: "Deep Freeze",    desc: "backup AES-256",              color: "text-cyan-400",   dot: "bg-cyan-500"   },
  { time: "03:37", label: "Night Research", desc: "13 sorgenti scientifiche",    color: "text-indigo-400", dot: "bg-indigo-500" },
  { time: "04:07", label: "Night Push",     desc: "git push automatico",         color: "text-emerald-400",dot: "bg-emerald-500"},
  { time: "07:30", label: "Daily Brief",    desc: "report mattutino generato",   color: "text-amber-400",  dot: "bg-amber-500"  },
];

function NightScheduleWidget() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const isDone = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return nowMin > h * 60 + m;
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-indigo-500/60" />
          Sistema notturno — gira mentre dormi
        </div>
        <div className="text-[8px] font-mono text-slate-700">
          {now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {NIGHT_TASKS.map(t => {
          const done = isDone(t.time);
          return (
            <div key={t.time}
              className={`rounded-xl p-2.5 border transition-all ${
                done
                  ? "bg-slate-900 border-slate-800 opacity-50"
                  : "bg-slate-900/80 border-slate-700/60"
              }`}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${done ? "bg-slate-600" : t.dot}`}
                     style={!done ? { boxShadow: `0 0 6px currentColor` } : {}} />
                <span className={`text-[9px] font-mono tabular-nums ${done ? "text-slate-600" : t.color}`}>
                  {t.time}
                </span>
              </div>
              <div className={`text-[9px] font-bold font-mono leading-tight ${done ? "text-slate-600" : "text-slate-300"}`}>
                {t.label}
              </div>
              <div className="text-[8px] text-slate-600 leading-tight mt-0.5">{t.desc}</div>
              {done && (
                <div className="text-[7px] font-mono text-emerald-600 mt-1">✓ eseguito</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── CANVAS PRINCIPALE ─────────────────────────────────────────────────────────
export function CanvasLayout({ room: externalRoom }: { room?: string }) {
  const { state, isOnline: online } = useGlobalState();

  // Se viene passata una room dall'esterno (da App.tsx sidebar), usiamo quella
  // altrimenti manteniamo la navigazione interna con stack
  const [navStack, setNavStack] = useState<NavNode[]>([
    { id: (externalRoom as RoomId) ?? "home", label: externalRoom?.toUpperCase() ?? "Home" }
  ]);

  // Sincronizza con prop esterna
  useEffect(() => {
    if (externalRoom) {
      setNavStack([{ id: externalRoom as RoomId, label: externalRoom.toUpperCase() }]);
    }
  }, [externalRoom]);

  const currentRoom = navStack[navStack.length - 1].id;

  const pushRoom = (id: RoomId, label: string) => {
    setNavStack(s => [...s, { id, label }]);
    window.scrollTo(0, 0);
  };
  const popRoom = () => setNavStack(s => s.length > 1 ? s.slice(0, -1) : s);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navStack.length > 1) popRoom();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navStack]);

  return (
    <div className="h-full flex flex-col">
      {/* Breadcrumb — solo se navigazione interna attiva */}
      {navStack.length > 1 && <Breadcrumb stack={navStack} onBack={popRoom} />}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-5 py-5 space-y-5">

          {/* ── HOME ── */}
          {currentRoom === "home" && (
            <>
              <div className="flex items-center gap-3 flex-wrap">
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">TITANIUM_OS</h1>
                  <p className="text-[9px] text-slate-600 font-mono mt-0.5">
                    {new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}
                    {" · "}{online
                      ? <span className="text-emerald-400">live</span>
                      : <span className="text-slate-600">offline</span>}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <div>
                    <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Milestone</div>
                    <div className="text-[11px] font-bold text-white">{state?.active_milestone ?? "—"}</div>
                  </div>
                </div>
                {(state?.blockers ?? []).length > 0 && (
                  <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-500/30 rounded-xl px-3 py-2">
                    <AlertTriangle size={11} className="text-rose-400 flex-shrink-0" />
                    <div>
                      <div className="text-[8px] font-mono text-rose-400/60 uppercase tracking-widest">Blockers</div>
                      <div className="text-[11px] font-bold text-rose-300">{state?.blockers?.length ?? 0}</div>
                    </div>
                  </div>
                )}
              </div>
              <PillarGrid state={state} onEnter={pushRoom} />

              {/* ── SPLIT: sinistra=Identity, destra=navigazione ── */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 pt-2 border-t border-slate-800/40">
                {/* LEFT — Identity skill tree */}
                <div className="bg-slate-900/60 border border-slate-700/30 rounded-2xl p-4 overflow-hidden">
                  <div className="text-[7px] font-mono text-slate-600 uppercase tracking-[0.3em] mb-3">
                    Identity — Percorso
                  </div>
                  <MatteoSection />
                </div>

                {/* RIGHT — navigazione rapida + schedule */}
                <div className="space-y-4">
                  <SectionLinks onEnter={pushRoom} />
                  <NightScheduleWidget />
                </div>
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
          {currentRoom === "critiche" && (
            <div className="bg-slate-900/80 border border-rose-500/20 rounded-2xl p-5">
              <CriticheSection />
            </div>
          )}

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
  { label: "IDENTITY",    pct: 50, bar: "bg-slate-500",   note: "Content Engine v2",  atto: "—" },
];
export function CellFocusStandalone()   { return null; }
export function CellCicloStandalone()   { return null; }
export function CellPillarsStandalone() { return null; }
export function CellV32Standalone()     { return null; }
export function CellEcoTree()           { return null; }
export function CellAutomazioni()       { return null; }
export function CellMente()             { return null; }
export function CellContentEngine()     { return null; }
