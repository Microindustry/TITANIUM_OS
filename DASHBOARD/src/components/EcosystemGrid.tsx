// EcosystemGrid.tsx | ECOSYSTEM_OS | v1.2 | 2026-03-16
// Griglia draggabile principale — 8 celle, layout persiste in localStorage
// Concetto: 1024 assi = ogni cella = una dimensione di attenzione del sistema
// v1.2: lastUpdated badge su ogni CellShell — caricato da /api/state con fallback statico

import { useState, useCallback, useEffect } from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  Cpu,
  RefreshCw,
  Target,
  Layers,
  Calculator,
  GitBranch,
  Users,
  Calendar,
  Package,
  Trophy,
  Grid3X3,
  Hammer,
  X,
} from "lucide-react";

import { CellShell } from "./CellShell";
import { EcoTreeView } from "./EcoTreeView";
import { WarehouseView } from "./WarehouseView";
import { VincenteView } from "./VincenteView";
import { CatalogView } from "./CatalogView";
import {
  StatBlock,
  Progress,
  TimelineItem,
  CheckItem,
  ScrollArea,
  Badge,
} from "./UIComponents";

// ── LAYOUT STORAGE ──────────────────────────────────────────
const LAYOUT_KEY = "ecosystem_grid_layout_v1";
const ROW_H = 50;
const COLS = 12;
const MARGIN: [number, number] = [8, 8];

const DEFAULT_LAYOUT: Layout[] = [
  { i: "focus",      x: 0, y: 0,  w: 4,  h: 4,  minW: 3, minH: 3 },
  { i: "ciclo",      x: 4, y: 0,  w: 5,  h: 4,  minW: 4, minH: 3 },
  { i: "pillars",    x: 9, y: 0,  w: 3,  h: 4,  minW: 2, minH: 3 },
  { i: "v32",        x: 0, y: 4,  w: 6,  h: 6,  minW: 4, minH: 4 },
  { i: "eva",        x: 6, y: 4,  w: 6,  h: 6,  minW: 4, minH: 4 },
  { i: "ecotree",    x: 0, y: 10, w: 4,  h: 8,  minW: 3, minH: 5 },
  { i: "personaggi", x: 4, y: 10, w: 4,  h: 8,  minW: 3, minH: 5 },
  { i: "timeline",   x: 8, y: 10, w: 4,  h: 8,  minW: 3, minH: 5 },
];

function loadLayout(): Layout[] {
  try {
    const s = localStorage.getItem(LAYOUT_KEY);
    return s ? JSON.parse(s) : DEFAULT_LAYOUT;
  } catch {
    return DEFAULT_LAYOUT;
  }
}

function saveLayout(l: Layout[]) {
  localStorage.setItem(LAYOUT_KEY, JSON.stringify(l));
}

// ── CICLO RICORSIVO (ATTO VI) ────────────────────────────────
// COSTRUISCI → DOCUMENTI → INSEGNI → SBLOCCHI → PROGETTI → PRODUCI → VENDI → REINVESTI
const CICLO_STEPS = [
  { id: "build",    label: "COSTRUISCI", sub: "V32 fisica", color: "text-emerald-400", active: true },
  { id: "doc",      label: "DOCUMENTI",  sub: "video + AVA", color: "text-cyan-400",    active: false },
  { id: "teach",    label: "INSEGNI",    sub: "skill tree",  color: "text-cyan-400",    active: false },
  { id: "unlock",   label: "SBLOCCHI",   sub: "competenze",  color: "text-indigo-400",  active: false },
  { id: "design",   label: "PROGETTI",   sub: "MIMS CAD",    color: "text-indigo-400",  active: false },
  { id: "produce",  label: "PRODUCI",    sub: "V32 + pressa",color: "text-amber-400",   active: false },
  { id: "sell",     label: "VENDI",      sub: "B2B + community", color: "text-amber-400", active: false },
  { id: "reinvest", label: "REINVESTI",  sub: "upgrade",     color: "text-emerald-400", active: false },
];

// ── PERSONAGGI (ATTO IV) ─────────────────────────────────────
const PERSONAGGI = [
  {
    name: "THEMIS",
    role: "Esecuzione tecnica",
    domain: "Claude Code · dati · zero fluff",
    status: "operative" as const,
    color: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  {
    name: "EVA",
    role: "Motore economico",
    domain: "WhatsApp bot · KPI · Vita Natura",
    status: "building" as const,
    color: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    name: "AVA",
    role: "Traduttrice empatica",
    domain: "YouTube · storytelling · 3D Pixar",
    status: "defined" as const,
    color: "text-indigo-400",
    dot: "bg-indigo-400",
  },
  {
    name: "ARIA",
    role: "Esperta materiali",
    domain: "Polimeri · ricette · test",
    status: "future" as const,
    color: "text-slate-500",
    dot: "bg-slate-600",
  },
  {
    name: "NEXUS",
    role: "Ing. strutturale",
    domain: "FEM · certificazioni · calcolo",
    status: "future" as const,
    color: "text-slate-500",
    dot: "bg-slate-600",
  },
  {
    name: "FORGE",
    role: "Produttivo",
    domain: "CAM · processi · toolpath",
    status: "future" as const,
    color: "text-slate-500",
    dot: "bg-slate-600",
  },
];

const statusLabel = {
  operative: { text: "OPERATIVO", color: "text-cyan-400 border-cyan-800 bg-cyan-900/20" },
  building:  { text: "IN BUILD",  color: "text-emerald-400 border-emerald-800 bg-emerald-900/20" },
  defined:   { text: "DEFINITO",  color: "text-indigo-400 border-indigo-800 bg-indigo-900/20" },
  future:    { text: "FUTURO",    color: "text-slate-500 border-slate-700 bg-slate-800/20" },
};

// ── PILLARS ──────────────────────────────────────────────────
const PILLARS = [
  { id: "V32",        label: "V32",        pct: 65, status: "in_progress", color: "bg-emerald-500", note: "Config G rinforzi" },
  { id: "MIMS",       label: "MIMS",       pct: 30, status: "waiting",     color: "bg-amber-500",   note: "Attende pressa" },
  { id: "GENESIS",    label: "GENESIS",    pct: 10, status: "building",    color: "bg-cyan-500",    note: "OS setup" },
  { id: "VITA",       label: "VITA NATURA",pct: 40, status: "active",      color: "bg-indigo-400",  note: "EVA pilot" },
  { id: "IDENTITY",   label: "IDENTITY",   pct: 20, status: "pending",     color: "bg-slate-500",   note: "CV + LinkedIn" },
];

// ── EVA ECONOMY CELL ─────────────────────────────────────────
const INVESTIMENTO = 2250;
const BEP_ORE = 61;

function CellEva() {
  const [ore, setOre] = useState(0);
  const [stampi, setStampi] = useState(0);
  const revenue = ore * 45 + stampi * 500;
  const profit = revenue - INVESTIMENTO;
  const pct = Math.min(100, (revenue / INVESTIMENTO) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">
            Ore Fresatura · €45/h
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOre((h) => Math.max(0, h - 1))} className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm">-</button>
            <span className="text-xl font-black text-white w-10 text-center">{ore}</span>
            <button onClick={() => setOre((h) => h + 1)} className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm">+</button>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">
            Stampi MIMS · €500/cad
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setStampi((m) => Math.max(0, m - 1))} className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm">-</button>
            <span className="text-xl font-black text-white w-10 text-center">{stampi}</span>
            <button onClick={() => setStampi((m) => m + 1)} className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm">+</button>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-mono">Profitto Netto</span>
          <span className={`text-xl font-black ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {profit >= 0 ? "+" : ""}€{profit.toLocaleString()}
          </span>
        </div>
        <Progress
          value={pct}
          indicatorClassName={profit >= 0 ? "bg-emerald-500" : "bg-amber-500"}
        />
        <div className="flex justify-between text-[9px] font-mono text-slate-600">
          <span>BEP: {BEP_ORE} ore (1.4 mesi)</span>
          <span>Inv: €{INVESTIMENTO.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <StatBlock label="Revenue" value={`€${revenue}`} color="text-white" />
          <StatBlock label="ROI Y1 (target)" value="322%" color="text-amber-400" sub="€9.500 year 1" />
        </div>
      </div>
    </div>
  );
}

// ── V32 CHECKLIST MODAL ──────────────────────────────────────
function CellV32() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <StatBlock label="Massa"     value="178 kg"     sub="69 non sospesa + 109 sospesa" />
          <StatBlock label="Precisione" value="±0.019 mm" sub="IT6-IT7" color="text-emerald-400" />
          <StatBlock label="f₀"         value="3.91 Hz"   sub="4 molle gialle ISO 90mm" />
          <StatBlock label="ROI Y1"     value="322%"      sub="BEP 61 ore · 1.4 mesi" color="text-amber-400" />
        </div>
        <div>
          <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
            <span>Config G — Rinforzi Z+U</span>
            <span>65%</span>
          </div>
          <Progress value={65} />
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <div className="text-[9px] font-mono text-slate-500 uppercase mb-2">BLOCKERS</div>
          <div className="text-[10px] text-rose-400 font-mono">▸ Manca mandrino 2.2kW ER20 — da ordinare</div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="w-full text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 rounded-lg py-2 transition-colors"
        >
          Apri Checklist Config G
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl shadow-2xl max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Hammer size={16} className="text-emerald-400" /> PROCEDURA RINFORZI
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">Config G — ATTO VIII</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 hover:bg-slate-800 rounded-lg">
                <X size={16} className="text-slate-400" />
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
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Fase {f.fase}
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

// ── MAIN GRID ────────────────────────────────────────────────
interface EcosystemGridProps {
  containerWidth: number;
}

// Date statiche fallback — aggiornate dinamicamente da /api/state
const STATIC_DATE = "2026-03-16";
const DEFAULT_DATES: Record<string, string> = {
  focus:      STATIC_DATE,
  ciclo:      STATIC_DATE,
  pillars:    STATIC_DATE,
  v32:        STATIC_DATE,
  eva:        STATIC_DATE,
  ecotree:    STATIC_DATE,
  personaggi: STATIC_DATE,
  timeline:   STATIC_DATE,
  warehouse:  STATIC_DATE,
  vincente:   STATIC_DATE,
  catalogo:   STATIC_DATE,
};

export const EcosystemGrid = ({ containerWidth }: EcosystemGridProps) => {
  const [layout, setLayout] = useState<Layout[]>(loadLayout);
  const [cellDates, setCellDates] = useState<Record<string, string>>(DEFAULT_DATES);

  // Carica date reali da STATE.json via API
  useEffect(() => {
    fetch("http://localhost:5001/api/state")
      .then((r) => r.json())
      .then((data) => {
        // Prende last_updated globale da STATE.json
        const ts: string = data?.last_updated ?? data?.timestamp ?? STATIC_DATE;
        // Prende date specifiche per pilastro se presenti, altrimenti usa globale
        const v32Date: string  = data?.pillars?.V32?.last_updated  ?? ts;
        const mimsDate: string = data?.pillars?.MIMS?.last_updated ?? ts;
        setCellDates({
          focus:      ts,
          ciclo:      ts,
          pillars:    ts,
          v32:        v32Date,
          eva:        mimsDate,
          ecotree:    ts,
          personaggi: ts,
          timeline:   ts,
          warehouse:  v32Date,
          vincente:   v32Date,
          catalogo:   mimsDate,
        });
      })
      .catch(() => {/* fallback silenzioso alle date statiche */});
  }, []);

  const onLayoutChange = useCallback((l: Layout[]) => {
    setLayout(l);
    saveLayout(l);
  }, []);

  const resetLayout = () => {
    setLayout(DEFAULT_LAYOUT);
    saveLayout(DEFAULT_LAYOUT);
  };

  return (
    <div>
      {/* Reset hint */}
      <div className="flex justify-end mb-1">
        <button
          onClick={resetLayout}
          className="text-[9px] font-mono text-slate-600 hover:text-emerald-400 uppercase tracking-widest transition-colors flex items-center gap-1"
        >
          <RefreshCw size={9} /> reset layout
        </button>
      </div>

      <GridLayout
        layout={layout}
        cols={COLS}
        rowHeight={ROW_H}
        width={containerWidth}
        margin={MARGIN}
        draggableHandle=".cell-drag-handle"
        onLayoutChange={onLayoutChange}
        resizeHandles={["se"]}
        compactType="vertical"
        preventCollision={false}
      >
        {/* ── FOCUS: THEMIS ──────────────────────────────── */}
        <div key="focus">
          <CellShell title="FOCUS · THEMIS" icon={<Cpu size={11} />} color="cyan" mono="NOW" lastUpdated={cellDates.focus}>
            <div className="space-y-3">
              <div className="bg-slate-950 border border-cyan-500/20 rounded-lg p-3">
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Milestone attiva</div>
                <div className="text-xs font-bold text-cyan-400">Config G — Rinforzi colonne Z+U</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Prossimo step</div>
                <div className="text-[11px] text-white font-mono">▸ Saldare 4 gusset 200mm sulla colonna Z sinistra</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Focus oggi</div>
                <div className="text-[11px] text-emerald-400 font-mono">Config G: gusset sinistra — stima 3h officina</div>
              </div>
              <div className="text-[9px] font-mono text-slate-600 text-center">
                09 Mar 2026 · ECOSYSTEM OS v1.0
              </div>
            </div>
          </CellShell>
        </div>

        {/* ── CICLO RICORSIVO (ATTO VI) ──────────────────── */}
        <div key="ciclo">
          <CellShell title="CICLO RICORSIVO · ATTO VI" icon={<RefreshCw size={11} />} color="emerald" lastUpdated={cellDates.ciclo}>
            <div className="space-y-2">
              <p className="text-[8px] font-mono text-slate-600 mb-3">
                Non lineare — ricorsivo e amplificante. Ogni progetto nutre gli altri.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CICLO_STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-1">
                    <div
                      className={`rounded px-2 py-1 border text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${
                        s.active
                          ? "bg-emerald-900/30 border-emerald-500/50 text-emerald-400 shadow shadow-emerald-500/10"
                          : "bg-slate-950 border-slate-800 text-slate-500"
                      }`}
                    >
                      <div>{s.label}</div>
                      <div className={`text-[7px] font-normal mt-0.5 ${s.active ? "text-emerald-500/70" : "text-slate-600"}`}>
                        {s.sub}
                      </div>
                    </div>
                    {i < CICLO_STEPS.length - 1 && (
                      <span className="text-slate-700 text-[10px]">→</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Loop arrow */}
              <div className="flex items-center gap-1 mt-1">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-[8px] font-mono text-slate-600">loop ∞</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
              <div className="bg-slate-950 border border-emerald-500/10 rounded p-2 mt-2">
                <p className="text-[8px] font-mono text-slate-500 leading-relaxed">
                  <span className="text-emerald-400">⬤</span> Posizione attuale: <span className="text-emerald-400 font-bold">COSTRUISCI</span>
                  {" · "}Trigger: V32 Config G fisica — gusset + diagonali + epoxy fill
                </p>
              </div>
            </div>
          </CellShell>
        </div>

        {/* ── PILLARS STATUS ─────────────────────────────── */}
        <div key="pillars">
          <CellShell title="PILASTRI" icon={<Layers size={11} />} color="indigo" lastUpdated={cellDates.pillars}>
            <div className="space-y-2.5">
              {PILLARS.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between text-[9px] font-mono mb-1">
                    <span className="text-slate-300 font-bold">{p.label}</span>
                    <span className="text-slate-500">{p.pct}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-0.5">
                    <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                  </div>
                  <div className="text-[8px] font-mono text-slate-600">{p.note}</div>
                </div>
              ))}
            </div>
          </CellShell>
        </div>

        {/* ── V32 MACHINE ────────────────────────────────── */}
        <div key="v32">
          <CellShell title="V32 · LA MACCHINA" icon={<Target size={11} />} color="emerald" mono="ATTO II" lastUpdated={cellDates.v32}>
            <CellV32 />
          </CellShell>
        </div>

        {/* ── EVA ECONOMIA ───────────────────────────────── */}
        <div key="eva">
          <CellShell title="EVA · MOTORE ECONOMICO" icon={<Calculator size={11} />} color="amber" mono="ATTO XII" lastUpdated={cellDates.eva}>
            <CellEva />
          </CellShell>
        </div>

        {/* ── ECOTREE ────────────────────────────────────── */}
        <div key="ecotree">
          <CellShell title="ECOTREE · ARCHITETTURA" icon={<GitBranch size={11} />} color="cyan" mono="v1.0" lastUpdated={cellDates.ecotree}>
            <EcoTreeView />
          </CellShell>
        </div>

        {/* ── PERSONAGGI (ATTO IV) ────────────────────────── */}
        <div key="personaggi">
          <CellShell title="PERSONAGGI · ATTO IV" icon={<Users size={11} />} color="indigo" lastUpdated={cellDates.personaggi}>
            <div className="space-y-2">
              {PERSONAGGI.map((p) => {
                const s = statusLabel[p.status];
                return (
                  <div key={p.name} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                      <span className={`text-xs font-black ${p.color}`}>{p.name}</span>
                      <div className={`ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded border uppercase ${s.color}`}>
                        {s.text}
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-400 ml-3.5">{p.role}</div>
                    <div className="text-[8px] text-slate-600 font-mono ml-3.5 mt-0.5">{p.domain}</div>
                  </div>
                );
              })}
            </div>
          </CellShell>
        </div>

        {/* ── TIMELINE ───────────────────────────────────── */}
        <div key="timeline">
          <CellShell title="TIMELINE · 2026→2030" icon={<Calendar size={11} />} color="slate" mono="ATTO XII" lastUpdated={cellDates.timeline}>
            <div className="border-l-2 border-slate-800 ml-2 space-y-5 pl-5 pt-1">
              <TimelineItem date="Lug 2030" title="IL CAPANNONE" desc="V32 + V33 operative. Matteo 35 anni: LIBERO." status="future" />
              <TimelineItem date="2029" title="V32 Mk2 · EVA SaaS" desc="Asse rotativo, 5 clienti, community marketplace." status="future" />
              <TimelineItem date="2028" title="Precision Lab · Hub&Spoke" desc="€2.000/mese, MIMS produzione, 10k iscritti." status="future" />
              <TimelineItem date="2027 Q4" title="EVA €1.500/mese" desc="YouTube 1k, MIMS Heavy 50 kit, polimero brevettato." status="future" />
              <TimelineItem date="2027 Q1" title="V32 operativa · MIMS" desc="Primi stampi, revenue attiva." status="future" />
              <TimelineItem date="2026 Q3" title="Assemblaggio completo" desc="V32 pronta produzione." status="future" />
              <TimelineItem date="2026 Q2" title="Colonne Z+U · Epoxy" desc="Definitivo. Pianificato." status="future" />
              <TimelineItem date="2026 Q1" title="Rinforzi Config G" desc="Fase A/B/C/D — IN CORSO." status="current" />
              <TimelineItem date="Feb 2026" title="Componenti verificati" desc="Basamento saldato, asse X, HMI TP900." status="done" />
            </div>
          </CellShell>
        </div>
      </GridLayout>

      {/* ── EXTRA VIEWS (sotto la griglia) ─────────────────── */}
      <div className="mt-6 space-y-4">
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest text-center">
          ─── viste estese ───
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="h-[600px]">
            <CellShell title="MAGAZZINO · V32 BOM" icon={<Package size={11} />} color="slate" noPad lastUpdated={cellDates.warehouse}>
              <WarehouseView />
            </CellShell>
          </div>
          <div className="h-[500px]">
            <CellShell title="SETTAGGIO VINCENTE · UPGRADES" icon={<Trophy size={11} />} color="amber" noPad lastUpdated={cellDates.vincente}>
              <VincenteView />
            </CellShell>
          </div>
          <div className="h-[500px]">
            <CellShell title="CATALOGO MIMS" icon={<Grid3X3 size={11} />} color="indigo" noPad lastUpdated={cellDates.catalogo}>
              <CatalogView />
            </CellShell>
          </div>
        </div>
      </div>
    </div>
  );
};
