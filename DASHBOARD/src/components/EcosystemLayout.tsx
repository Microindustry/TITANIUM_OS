// EcosystemLayout.tsx | ECOSYSTEM_OS | v2.0 | 2026-03-09
// Layout a pannello singolo con navigazione laterale
// Sempre visibili: CicloBar (funzionale) + NodiBar + EcoTree (basso)
// Ciclo = navigatore primario del sistema: ogni step apre la sua view

import { useState, useEffect } from "react";
import {
  Cpu, Target, Calculator, Layers, Users, Calendar,
  Package, Trophy, Grid3X3, Hammer, X, ChevronDown,
  ChevronUp, Terminal, Zap, Play, RotateCcw,
  BookOpen, Unlock, TrendingUp, RefreshCw,
  AlertCircle, Activity,
} from "lucide-react";

import { EcoTreeView } from "./EcoTreeView";
import { WarehouseView } from "./WarehouseView";
import { VincenteView } from "./VincenteView";
import { CatalogView } from "./CatalogView";
import { AutomationsView } from "./AutomationsView";
import {
  StatBlock, Progress, TimelineItem, CheckItem, ScrollArea,
} from "./UIComponents";

// ─────────────────────────────────────────────────────────────
// TIPI
// ─────────────────────────────────────────────────────────────
type ViewId =
  | "focus" | "v32" | "eva" | "pillars"
  | "personaggi" | "timeline" | "warehouse"
  | "vincente" | "catalog" | "digest" | "automations";

// ─────────────────────────────────────────────────────────────
// CICLO RICORSIVO — ogni step mappa a una view (ATTO VI)
// ─────────────────────────────────────────────────────────────
const CICLO: Array<{
  id: string; label: string; sub: string;
  view: ViewId; accentClass: string; ringClass: string;
}> = [
  { id: "build",    label: "COSTRUISCI", sub: "V32",          view: "v32",        accentClass: "text-emerald-400 border-emerald-500/60 bg-emerald-900/20", ringClass: "ring-emerald-500/50" },
  { id: "doc",      label: "DOCUMENTA",  sub: "AVA / video",  view: "personaggi", accentClass: "text-cyan-400    border-cyan-500/60    bg-cyan-900/20",    ringClass: "ring-cyan-500/50"    },
  { id: "teach",    label: "INSEGNA",    sub: "community",    view: "personaggi", accentClass: "text-cyan-400    border-cyan-500/40    bg-cyan-900/10",    ringClass: "ring-cyan-500/40"    },
  { id: "unlock",   label: "SBLOCCA",    sub: "skills",       view: "personaggi", accentClass: "text-indigo-400  border-indigo-500/60  bg-indigo-900/20",  ringClass: "ring-indigo-500/50"  },
  { id: "design",   label: "PROGETTA",   sub: "MIMS CAD",     view: "catalog",    accentClass: "text-indigo-400  border-indigo-500/40  bg-indigo-900/10",  ringClass: "ring-indigo-500/40"  },
  { id: "produce",  label: "PRODUCI",    sub: "V32 + pressa", view: "warehouse",  accentClass: "text-amber-400   border-amber-500/60   bg-amber-900/20",   ringClass: "ring-amber-500/50"   },
  { id: "sell",     label: "VENDI",      sub: "B2B + mkt",    view: "eva",        accentClass: "text-amber-400   border-amber-500/40   bg-amber-900/10",   ringClass: "ring-amber-500/40"   },
  { id: "reinvest", label: "REINVESTI",  sub: "upgrade",      view: "pillars",    accentClass: "text-emerald-400 border-emerald-500/40 bg-emerald-900/10", ringClass: "ring-emerald-500/40" },
];

const CICLO_KEY = "eco_ciclo_step";

// ─────────────────────────────────────────────────────────────
// NODI AVVIABILI
// ─────────────────────────────────────────────────────────────
const NODI = [
  { id: "mente",   name: "MENTE_SCANNER", dot: "bg-emerald-500", status: "active",   cmd: "cd NODES/MENTE_SCANNER && python scanner.py",    desc: "Legge LA MIA MENTE → digest JSON" },
  { id: "eva",     name: "EVA",           dot: "bg-amber-500",   status: "building", cmd: "cd NODES/EVA && python eva_bot.py",               desc: "WhatsApp bot · Vita Natura" },
  { id: "v32w",    name: "V32_WATCHER",   dot: "bg-slate-600",   status: "pending",  cmd: "cd NODES/V32_WATCHER && python watcher.py",       desc: "Telemetria CNC · IFM + OPC-UA" },
  { id: "sched",   name: "SCHEDULER",     dot: "bg-emerald-500", status: "active",   cmd: "START_TITANIUM_OS.bat",                           desc: "Task scheduler Windows" },
];

// ─────────────────────────────────────────────────────────────
// NAVIGAZIONE LATERALE DESTRA
// ─────────────────────────────────────────────────────────────
const NAV_ITEMS: Array<{ id: ViewId; icon: React.ReactNode; label: string; accent: string }> = [
  { id: "focus",      icon: <Cpu size={15} />,        label: "Focus",     accent: "text-cyan-400"    },
  { id: "v32",        icon: <Target size={15} />,      label: "V32",       accent: "text-emerald-400" },
  { id: "eva",        icon: <Calculator size={15} />,  label: "EVA",       accent: "text-amber-400"   },
  { id: "pillars",    icon: <Layers size={15} />,      label: "Pilastri",  accent: "text-indigo-400"  },
  { id: "personaggi", icon: <Users size={15} />,       label: "Agenti",    accent: "text-indigo-400"  },
  { id: "timeline",   icon: <Calendar size={15} />,    label: "Timeline",  accent: "text-slate-400"   },
  { id: "warehouse",  icon: <Package size={15} />,     label: "Magazzino", accent: "text-slate-400"   },
  { id: "vincente",   icon: <Trophy size={15} />,      label: "Upgrades",  accent: "text-amber-400"   },
  { id: "catalog",    icon: <Grid3X3 size={15} />,     label: "MIMS",      accent: "text-cyan-400"    },
  { id: "digest",      icon: <BookOpen size={15} />,    label: "Digest",      accent: "text-indigo-400"  },
  { id: "automations", icon: <Zap size={15} />,         label: "Automazioni", accent: "text-cyan-400"    },
];

// ─────────────────────────────────────────────────────────────
// PANEL CONTENT COMPONENTS
// ─────────────────────────────────────────────────────────────

// Focus / Themis — dati live da /api/state
function PanelFocus() {
  const [state, setState] = useState<Record<string, any> | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("/api/state")
      .then((r) => r.json())
      .then(setState)
      .catch(() => setErr(true));
  }, []);

  const milestone = state?.active_milestone ?? "—";
  const nextStep  = state?.next_step       ?? "—";
  const focus     = state?.focus_today     ?? "—";
  const blockers: string[] = state?.blockers ?? [];
  const ciclo     = state?.ciclo_position  ?? "—";
  const updated   = state?.last_update     ? new Date(state.last_update).toLocaleString("it-IT") : "—";

  return (
    <div className="space-y-3 max-w-xl">
      {err && (
        <div className="text-[9px] font-mono text-rose-500 bg-rose-900/20 border border-rose-500/20 rounded px-3 py-2">
          API non raggiungibile — avvia api_server.py
        </div>
      )}
      <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Milestone attiva</div>
          <div className="text-[8px] font-mono text-slate-600">{ciclo} · {updated}</div>
        </div>
        <div className="text-base font-bold text-cyan-400">{milestone}</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Prossimo step</div>
        <div className="text-sm text-white font-mono">▸ {nextStep}</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Focus oggi</div>
        <div className="text-sm text-emerald-400 font-mono">{focus}</div>
      </div>
      {blockers.length > 0 && (
        <div className="bg-slate-900 border border-rose-500/20 rounded-xl p-4">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <AlertCircle size={10} className="text-rose-400" /> Blockers
          </div>
          {blockers.map((b) => (
            <div key={b} className="text-sm text-rose-400 font-mono">▸ {b}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// V32 Machine
function PanelV32() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBlock label="Massa"      value="178 kg"    sub="69+109 kg" />
          <StatBlock label="Precisione" value="±0.019mm"  sub="IT6-IT7" color="text-emerald-400" />
          <StatBlock label="f₀"         value="3.91 Hz"   sub="4 molle gialle ISO" />
          <StatBlock label="ROI Y1"     value="322%"      sub="BEP 61h · 1.4 mesi" color="text-amber-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>Config G — Rinforzi Z+U</span><span>65%</span>
          </div>
          <Progress value={65} />
          <div className="text-[9px] font-mono text-slate-600 mt-1">
            Attenuazione @400Hz: 99.99% · Deflessione Z: 0.0006mm @100N
          </div>
        </div>
        <div className="bg-slate-900 border border-rose-500/20 rounded-xl p-3">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Blockers</div>
          <div className="text-xs text-rose-400 font-mono">▸ Manca mandrino 2.2kW ER20 — da ordinare</div>
        </div>
        <button
          onClick={() => setModal(true)}
          className="w-full text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl py-2.5 transition-colors"
        >
          Apri Checklist Config G →
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl shadow-2xl max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Hammer size={14} className="text-emerald-400" /> PROCEDURA RINFORZI — Config G
                </h3>
                <p className="text-[9px] text-slate-400 font-mono">ATTO VIII</p>
              </div>
              <button onClick={() => setModal(false)} className="p-1.5 hover:bg-slate-800 rounded-lg">
                <X size={14} className="text-slate-400" />
              </button>
            </div>
            <ScrollArea className="p-5 space-y-5">
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
                <div key={f.fase} className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {f.fase}
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-2">
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

// EVA Economy
function PanelEva() {
  const [ore, setOre] = useState(0);
  const [stampi, setStampi] = useState(0);
  const inv = 2250;
  const rev = ore * 45 + stampi * 500;
  const profit = rev - inv;
  const pct = Math.min(100, (rev / inv) * 100);
  return (
    <div className="space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Ore Fresatura · €45/h", val: ore, set: setOre },
          { label: "Stampi MIMS · €500/cad", val: stampi, set: setStampi },
        ].map((c) => (
          <div key={c.label} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">{c.label}</div>
            <div className="flex items-center gap-3">
              <button onClick={() => c.set((v: number) => Math.max(0, v - 1))} className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">-</button>
              <span className="text-xl font-black text-white w-10 text-center">{c.val}</span>
              <button onClick={() => c.set((v: number) => v + 1)} className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-mono">Profitto Netto</span>
          <span className={`text-2xl font-black ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {profit >= 0 ? "+" : ""}€{profit.toLocaleString()}
          </span>
        </div>
        <Progress value={pct} indicatorClassName={profit >= 0 ? "bg-emerald-500" : "bg-amber-500"} />
        <div className="flex justify-between text-[9px] font-mono text-slate-600">
          <span>BEP: 61 ore (1.4 mesi)</span>
          <span>Inv: €{inv.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <StatBlock label="Revenue" value={`€${rev}`} />
          <StatBlock label="ROI Y1 target" value="322%" color="text-amber-400" sub="€9.500 year 1" />
        </div>
      </div>
    </div>
  );
}

// Pillars
const PILLARS = [
  { label: "V32",          pct: 65, bar: "bg-emerald-500", note: "Config G rinforzi", atto: "II" },
  { label: "MIMS",         pct: 30, bar: "bg-amber-500",   note: "Attende pressa",    atto: "III" },
  { label: "GENESIS",      pct: 10, bar: "bg-cyan-500",    note: "OS setup",          atto: "V" },
  { label: "VITA NATURA",  pct: 40, bar: "bg-indigo-400",  note: "EVA pilot",         atto: "IV" },
  { label: "IDENTITY",     pct: 20, bar: "bg-slate-500",   note: "CV + LinkedIn",     atto: "—" },
];

function PanelPillars() {
  return (
    <div className="space-y-3 max-w-md">
      {PILLARS.map((p) => (
        <div key={p.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${p.bar}`} />
              <span className="text-xs font-bold text-white">{p.label}</span>
              <span className="text-[8px] font-mono text-slate-600 border border-slate-700 rounded px-1">ATTO {p.atto}</span>
            </div>
            <span className="text-xs font-mono text-slate-400">{p.pct}%</span>
          </div>
          <Progress value={p.pct} indicatorClassName={p.bar} />
          <div className="text-[9px] font-mono text-slate-500 mt-1.5">{p.note}</div>
        </div>
      ))}
    </div>
  );
}

// Personaggi
const PERSONAGGI = [
  { name: "THEMIS", role: "Esecuzione tecnica", domain: "Claude Code · zero fluff",        status: "OPERATIVO", dot: "bg-cyan-400",    label: "text-cyan-400 border-cyan-800 bg-cyan-900/20" },
  { name: "EVA",    role: "Motore economico",   domain: "WhatsApp bot · KPI · Vita Natura", status: "IN BUILD",  dot: "bg-emerald-500", label: "text-emerald-400 border-emerald-800 bg-emerald-900/20" },
  { name: "AVA",    role: "Traduttrice empatica",domain: "YouTube · storytelling · 3D Pixar",status: "DEFINITA",  dot: "bg-indigo-400",  label: "text-indigo-400 border-indigo-800 bg-indigo-900/20" },
  { name: "ARIA",   role: "Esperta materiali",   domain: "Polimeri · ricette · test",       status: "FUTURO",    dot: "bg-slate-600",   label: "text-slate-500 border-slate-700 bg-slate-800/20" },
  { name: "NEXUS",  role: "Ing. strutturale",    domain: "FEM · certificazioni · calcolo",  status: "FUTURO",    dot: "bg-slate-600",   label: "text-slate-500 border-slate-700 bg-slate-800/20" },
  { name: "FORGE",  role: "Produttivo",          domain: "CAM · toolpath · manufacturing",  status: "FUTURO",    dot: "bg-slate-600",   label: "text-slate-500 border-slate-700 bg-slate-800/20" },
];

function PanelPersonaggi() {
  return (
    <div className="space-y-2 max-w-lg">
      <p className="text-[9px] font-mono text-slate-600 mb-3">
        Un personaggio nasce quando sblocchi un Ramo Skill — ATTO IV
      </p>
      {PERSONAGGI.map((p) => (
        <div key={p.name} className="bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-2 mb-0.5">
            <div className={`w-2 h-2 rounded-full ${p.dot}`} />
            <span className={`text-sm font-black ${p.label.split(" ")[0]}`}>{p.name}</span>
            <span className={`ml-auto text-[8px] font-mono px-2 py-0.5 rounded border uppercase ${p.label}`}>
              {p.status}
            </span>
          </div>
          <div className="text-xs text-slate-400 ml-4">{p.role}</div>
          <div className="text-[9px] text-slate-600 font-mono ml-4 mt-0.5">{p.domain}</div>
        </div>
      ))}
    </div>
  );
}

// Timeline
function PanelTimeline() {
  return (
    <div className="max-w-sm">
      <div className="border-l-2 border-slate-800 ml-3 space-y-5 pl-6 pt-1">
        <TimelineItem date="Lug 2030" title="IL CAPANNONE"         desc="V32 + V33 operative. Matteo 35 anni: LIBERO."          status="future" />
        <TimelineItem date="2029"     title="V32 Mk2 · EVA SaaS"   desc="Asse rotativo, 5 clienti, community marketplace."      status="future" />
        <TimelineItem date="2028"     title="Precision Lab"         desc="€2.000/mese, MIMS produzione, 10k iscritti."          status="future" />
        <TimelineItem date="2027 Q4"  title="EVA €1.500/mese"       desc="YouTube 1k, MIMS Heavy 50 kit, polimero brevettato."  status="future" />
        <TimelineItem date="2027 Q1"  title="V32 operativa · MIMS" desc="Target produzione e revenue attiva."                  status="future" />
        <TimelineItem date="2026 Q3"  title="Assemblaggio V32"      desc="Pianificato."                                         status="future" />
        <TimelineItem date="2026 Q2"  title="Colonne Z+U · Epoxy"  desc="Pianificato."                                         status="future" />
        <TimelineItem date="2026 Q1"  title="Rinforzi Config G"     desc="Fase A/B/C/D — IN CORSO."                             status="current" />
        <TimelineItem date="Feb 2026" title="Componenti verificati" desc="Basamento TIG, asse X, HMI TP900."                   status="done" />
      </div>
    </div>
  );
}

// MENTE Digest — dati live da /api/digest
function PanelDigest() {
  const [digest, setDigest] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const reload = () => {
    setLoading(true);
    setErr("");
    fetch("/api/digest")
      .then((r) => r.json())
      .then((d) => { setDigest(d); setLoading(false); })
      .catch(() => { setErr("API non raggiungibile"); setLoading(false); });
  };

  useEffect(() => { reload(); }, []);

  if (loading) return <div className="text-[10px] font-mono text-slate-500 p-4">Caricamento digest…</div>;
  if (err || digest?.error) return (
    <div className="text-[10px] font-mono text-rose-500 p-4 space-y-2">
      <div>{err || digest?.error}</div>
      <button onClick={reload} className="text-slate-400 hover:text-slate-200 underline">riprova</button>
    </div>
  );

  const summary = digest?.global_summary ?? {};
  const files: any[] = (digest?.by_file ?? []).filter((f: any) => f.readable);
  const topDec   = files.filter((f) => (f.extracts?.decisions?.length ?? 0) > 0)
    .sort((a, b) => (b.extracts.decisions?.length ?? 0) - (a.extracts.decisions?.length ?? 0))
    .slice(0, 5);

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-[9px] font-mono text-slate-500">
          Scansione: {digest?.scanned_at ? new Date(digest.scanned_at).toLocaleString("it-IT") : "—"}
        </div>
        <button onClick={reload} className="text-[8px] font-mono text-slate-600 hover:text-slate-300 flex items-center gap-1">
          <RefreshCw size={9} /> aggiorna
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <StatBlock label="File letti"   value={String(digest?.total_files ?? 0)} />
        <StatBlock label="Decisioni"    value={String(summary.total_decisions ?? 0)} color="text-cyan-400" />
        <StatBlock label="Specifiche"   value={String(summary.total_specs ?? 0)}     color="text-emerald-400" />
        <StatBlock label="Milestone"    value={String(summary.total_milestones ?? 0)} color="text-amber-400" />
      </div>

      {/* Top file con decisioni */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3">
          Top file · decisioni estratte
        </div>
        <div className="space-y-3">
          {topDec.map((f) => (
            <div key={f.path} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-cyan-400 truncate max-w-[200px]" title={f.path}>
                  {f.path.split(/[\\/]/).pop()}
                </span>
                <span className="text-[8px] font-mono text-slate-600">
                  {f.extracts.decisions?.length ?? 0} dec · {f.size_kb}kb
                </span>
              </div>
              {(f.extracts.decisions ?? []).slice(0, 2).map((d: string, i: number) => (
                <div key={i} className="text-[8px] font-mono text-slate-400 ml-3 truncate" title={d}>
                  ▸ {d.slice(0, 100)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lista completa file */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">
          Tutti i file ({files.length})
        </div>
        <ScrollArea className="max-h-48 space-y-1">
          {files.map((f) => (
            <div key={f.path} className="flex items-center justify-between text-[8px] font-mono py-0.5">
              <span className="text-slate-400 truncate max-w-[220px]" title={f.path}>
                {f.path.replace(/\\/g, "/").split("/").slice(-2).join("/")}
              </span>
              <div className="flex gap-2 text-slate-600 flex-shrink-0 ml-2">
                <span className="text-cyan-500/60">{f.extracts?.decisions?.length ?? 0}d</span>
                <span className="text-emerald-500/60">{f.extracts?.specs?.length ?? 0}s</span>
                <span className="text-amber-500/60">{f.extracts?.milestones?.length ?? 0}m</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

// Panel dispatcher
function MainPanel({ view }: { view: ViewId }) {
  const titles: Record<ViewId, string> = {
    focus:       "FOCUS · THEMIS",
    v32:         "V32 · LA MACCHINA — ATTO II",
    eva:         "EVA · MOTORE ECONOMICO — ATTO XII",
    pillars:     "PILASTRI — ASSOLUTO V6",
    personaggi:  "PERSONAGGI — ATTO IV",
    timeline:    "TIMELINE 2026 → 2030",
    warehouse:   "MAGAZZINO · V32 BOM",
    vincente:    "SETTAGGIO VINCENTE · UPGRADES",
    catalog:     "CATALOGO MIMS — ATTO III",
    digest:      "MENTE DIGEST — LA MIA MENTE",
    automations: "AUTOMAZIONI · RAMIFICAZIONI SISTEMA",
  };

  const content: Record<ViewId, React.ReactNode> = {
    focus:       <PanelFocus />,
    v32:         <PanelV32 />,
    eva:         <PanelEva />,
    pillars:     <PanelPillars />,
    personaggi:  <PanelPersonaggi />,
    timeline:    <PanelTimeline />,
    warehouse:   <WarehouseView />,
    vincente:    <VincenteView />,
    catalog:     <CatalogView />,
    digest:      <PanelDigest />,
    automations: <AutomationsView />,
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
      <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-3">
        {titles[view]}
      </div>
      {content[view]}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CICLO BAR — funzionale e integrato
// ─────────────────────────────────────────────────────────────
function CicloBar({
  activeStep,
  onStep,
}: {
  activeStep: number;
  onStep: (idx: number) => void;
}) {
  return (
    <div className="border-b border-slate-800 bg-slate-950/80 px-3 py-2 flex-shrink-0">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin pb-0.5">
        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mr-1 flex-shrink-0">ciclo</span>
        {CICLO.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onStep(i)}
              title={`Apri: ${s.view} (${s.sub})`}
              className={`relative rounded px-2 py-1 border text-[8px] font-mono font-bold uppercase tracking-wider transition-all duration-150 ${
                i === activeStep
                  ? `ring-1 ${s.ringClass} ${s.accentClass}`
                  : "border-slate-800 text-slate-600 hover:border-slate-600 hover:text-slate-400 bg-transparent"
              }`}
            >
              {s.label}
              <div className="text-[6px] font-normal opacity-70 leading-none mt-0.5">{s.sub}</div>
              {i === activeStep && (
                <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
              )}
            </button>
            {i < CICLO.length - 1 && (
              <span className="text-slate-700 text-[9px]">›</span>
            )}
          </div>
        ))}
        {/* loop arrow */}
        <span className="text-slate-700 text-[9px] ml-1 flex-shrink-0">↩</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NODI BAR — programmi avviabili
// ─────────────────────────────────────────────────────────────
function NodiBar() {
  const [openCmd, setOpenCmd] = useState<string | null>(null);
  // Stato scan MENTE_SCANNER via API
  const [scanPhase, setScanPhase] = useState<"idle" | "running" | "ok" | "err">("idle");
  const [scanMsg, setScanMsg]   = useState("");

  const runMenteScan = async () => {
    setScanPhase("running");
    setScanMsg("");
    try {
      const r = await fetch("/api/scan", { method: "POST" });
      const data = await r.json();
      if (data.ok) {
        const g = data.digest?.global_summary ?? {};
        const tot = (g.total_decisions ?? 0) + (g.total_specs ?? 0) + (g.total_milestones ?? 0);
        setScanMsg(`${data.digest?.total_files ?? "?"} file · ${tot} estratti`);
        setScanPhase("ok");
      } else {
        setScanMsg((data.error ?? "errore").slice(0, 80));
        setScanPhase("err");
      }
    } catch {
      setScanMsg("API offline — avvia api_server.py");
      setScanPhase("err");
    }
    // Reset dopo 8s
    setTimeout(() => { setScanPhase("idle"); setScanMsg(""); }, 8000);
  };

  return (
    <div className="border-b border-slate-800 bg-slate-900/40 px-3 py-1.5 flex items-center gap-3 flex-shrink-0 flex-wrap">
      <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest flex-shrink-0">nodi</span>
      {NODI.map((n) => (
        <div key={n.id} className="flex items-center gap-1.5 relative">
          {/* Badge nodo */}
          <button
            onClick={() => setOpenCmd(openCmd === n.id ? null : n.id)}
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded px-2 py-1 transition-colors group"
            title={n.desc}
          >
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.dot} ${n.status === "active" ? "animate-pulse" : ""}`} />
            <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-200">{n.name}</span>
            <Terminal size={8} className="text-slate-600 group-hover:text-slate-400" />
          </button>

          {/* Bottone RUN solo per MENTE_SCANNER (ha endpoint API) */}
          {n.id === "mente" && (
            <button
              onClick={runMenteScan}
              disabled={scanPhase === "running"}
              title="Lancia scanner via API"
              className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[8px] font-mono border transition-all ${
                scanPhase === "running" ? "border-amber-500/40 text-amber-400 animate-pulse cursor-wait"
                : scanPhase === "ok"    ? "border-emerald-500/40 text-emerald-400"
                : scanPhase === "err"   ? "border-rose-500/40 text-rose-400"
                : "border-slate-700 text-slate-600 hover:border-emerald-500/40 hover:text-emerald-400"
              }`}
            >
              {scanPhase === "running" ? <Activity size={8} /> : <Play size={8} />}
              {scanPhase === "running" ? "scan…" : "run"}
            </button>
          )}

          {/* Feedback scan */}
          {n.id === "mente" && scanMsg && (
            <span className={`text-[8px] font-mono ${scanPhase === "ok" ? "text-emerald-400" : "text-rose-400"}`}>
              {scanMsg}
            </span>
          )}

          {/* Tooltip cmd */}
          {openCmd === n.id && (
            <div className="absolute top-full mt-1 left-0 z-30 bg-slate-950 border border-emerald-500/30 rounded-lg p-3 shadow-xl min-w-[260px]">
              <div className="text-[8px] font-mono text-slate-500 mb-1">{n.desc}</div>
              <div className="flex items-center gap-2 bg-slate-900 rounded p-1.5">
                <code className="text-[9px] font-mono text-emerald-400 flex-1 break-all">{n.cmd}</code>
                <button
                  onClick={() => { navigator.clipboard?.writeText(n.cmd); setOpenCmd(null); }}
                  className="text-[8px] font-mono text-slate-500 hover:text-slate-200 flex-shrink-0"
                >
                  copy
                </button>
              </div>
              <button onClick={() => setOpenCmd(null)} className="mt-1 text-[8px] text-slate-600 hover:text-slate-400">
                chiudi
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ECOTREE PANEL — sempre visibile in basso, espandibile
// ─────────────────────────────────────────────────────────────
function EcoTreePanel() {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-slate-800 flex-shrink-0" style={{ height: open ? "280px" : "32px" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-8 flex items-center gap-2 px-3 bg-slate-950/60 hover:bg-slate-900/60 transition-colors border-b border-slate-800"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400">ECOTREE · ARCHITETTURA</span>
        <div className="ml-auto text-slate-600">
          {open ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
        </div>
      </button>
      {open && (
        <div className="h-[248px] overflow-y-auto scrollbar-thin p-3">
          <EcoTreeView />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RIGHT NAV — navigazione laterale
// ─────────────────────────────────────────────────────────────
function RightNav({
  active,
  onSelect,
}: {
  active: ViewId;
  onSelect: (v: ViewId) => void;
}) {
  return (
    <div className="w-11 border-l border-slate-800 bg-slate-950 flex flex-col items-center py-3 gap-1 flex-shrink-0">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            title={item.label}
            className={`relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 group ${
              isActive
                ? `bg-slate-800 ${item.accent} ring-1 ring-current`
                : "text-slate-600 hover:text-slate-400 hover:bg-slate-800/60"
            }`}
          >
            {item.icon}
            {/* Tooltip */}
            <div className="pointer-events-none absolute right-full mr-2 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[9px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
              {item.label}
            </div>
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-current rounded-full" />
            )}
          </button>
        );
      })}

      {/* Divider + Reset */}
      <div className="flex-1" />
      <div className="w-6 h-px bg-slate-800" />
      <button
        onClick={() => {
          localStorage.removeItem(CICLO_KEY);
          window.location.reload();
        }}
        title="Reset sistema"
        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-700 hover:text-rose-400 hover:bg-slate-800/60 transition-all"
      >
        <RotateCcw size={13} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN LAYOUT
// ─────────────────────────────────────────────────────────────
export const EcosystemLayout = () => {
  // Ripristina posizione dal ciclo salvato
  const [cicloStep, setCicloStep] = useState<number>(() => {
    try { return parseInt(localStorage.getItem(CICLO_KEY) || "0", 10) || 0; }
    catch { return 0; }
  });
  const [activeView, setActiveView] = useState<ViewId>(
    () => CICLO[Math.min(cicloStep, CICLO.length - 1)].view
  );

  const handleCicloStep = (idx: number) => {
    setCicloStep(idx);
    setActiveView(CICLO[idx].view);
    localStorage.setItem(CICLO_KEY, String(idx));
  };

  const handleNavSelect = (v: ViewId) => {
    setActiveView(v);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── AREA PRINCIPALE ──────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Ciclo (sempre visibile, funzionale) */}
        <CicloBar activeStep={cicloStep} onStep={handleCicloStep} />
        {/* Nodi avviabili (sempre visibile) */}
        <NodiBar />
        {/* Panel centrale */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <MainPanel view={activeView} />
          {/* EcoTree (sempre visibile in basso) */}
          <EcoTreePanel />
        </div>
      </div>

      {/* ── NAV LATERALE DESTRA ───────────────────────────── */}
      <RightNav active={activeView} onSelect={handleNavSelect} />
    </div>
  );
};
