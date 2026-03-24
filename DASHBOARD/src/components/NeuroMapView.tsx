// NeuroMapView.tsx | TITANIUM_OS | v3.0 | 2026-03-18
// Mappa dimensionale multi-livello — drill-down immersivo con stack navigabile
// v3.0: click nodo → zoom in → figli in orbita | breadcrumb | animazioni SVG | ∞ livelli

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { X, AlertTriangle, ChevronLeft } from "lucide-react";

// ─── TIPI ──────────────────────────────────────────────────────────────────
type Status = "active" | "building" | "pending" | "future";

interface MapNode {
  id: string;
  label: string;
  emoji: string;
  ring: 0 | 1 | 2;
  idx: number;
  total: number;
  hex: string;
  detail: string;
  status: Status;
  pct?: number;
  pillarKey?: string;
  hasChildren?: boolean; // mostra indicatore drill-in
}

interface DrillNode {
  id: string;
  label: string;
  emoji: string;
  hex: string;
  status: Status;
  pct?: number;
  detail: string;
  children?: Record<string, DrillNode[]>;
}

interface DrillLevel {
  parentId: string;
  parentLabel: string;
  parentEmoji: string;
  parentHex: string;
  nodes: MapNode[];
  edges: [string, string][];
}

interface PillarData {
  status: string;
  pct_complete: number;
  next: string;
  phase: string;
}
interface LiveState {
  ciclo_position: string;
  focus_today: string;
  next_step: string;
  active_milestone: string;
  blockers: string[];
  pillars: Record<string, PillarData>;
  last_update: string;
}

// ─── GEOMETRIA ─────────────────────────────────────────────────────────────
const CX = 250, CY = 215;
const RADII = [0, 88, 160];
const NODE_R = [22, 15, 11];

function nodePos(n: MapNode): { x: number; y: number } {
  if (n.ring === 0) return { x: CX, y: CY };
  const r = RADII[n.ring];
  const angle = (-90 + n.idx * (360 / n.total)) * (Math.PI / 180);
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

function arcPath(cx: number, cy: number, r: number, pct: number): string {
  if (pct <= 0) return "";
  if (pct >= 99.9) return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx + 0.01} ${cy - r}`;
  const a = -Math.PI / 2 + (pct / 100) * 2 * Math.PI;
  return `M ${cx} ${cy - r} A ${r} ${r} 0 ${pct > 50 ? 1 : 0} 1 ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
}

// ─── PALETTE ───────────────────────────────────────────────────────────────
const STATUS_HEX: Record<Status, string> = {
  active: "#10b981", building: "#f59e0b", pending: "#818cf8", future: "#475569",
};
const STATUS_LABEL: Record<Status, string> = {
  active: "ATTIVO", building: "IN BUILD", pending: "IN ATTESA", future: "FUTURO",
};
const STATUS_CLASS: Record<Status, string> = {
  active:   "text-emerald-400 border-emerald-800 bg-emerald-900/20",
  building: "text-amber-400   border-amber-800   bg-amber-900/20",
  pending:  "text-indigo-400  border-indigo-800  bg-indigo-900/20",
  future:   "text-slate-500   border-slate-700   bg-slate-800/20",
};
const STATUS_CYCLE: Status[] = ["active", "building", "pending", "future"];
const API = "";

// ─── DATI FIGLI PER DRILL-DOWN ─────────────────────────────────────────────
const DRILL_CHILDREN: Record<string, DrillNode[]> = {
  // TITANIUM OS → pilastri (si torna al livello 0, non serve)
  v32: [
    { id: "v32-struttura", label: "STRUTTURA",   emoji: "🏗", hex: "#10b981", status: "building", pct: 65, detail: "Basamento traliccio TIG · colonne Z+U · Config G gusset+diag+tiranti M10." },
    { id: "v32-assi",      label: "ASSI X/Y/Z",  emoji: "⚙",  hex: "#06b6d4", status: "building", pct: 55, detail: "X assemblato (guide+vite+servo) · Y/Z in montaggio · target ±0.019mm IT6." },
    { id: "v32-mandrino",  label: "MANDRINO",    emoji: "🔄", hex: "#ef4444", status: "pending",  pct: 0,  detail: "2.2kW ER20 — da ordinare. Blocker: ultimo pezzo prima di fresare stampi." },
    { id: "v32-elettr",    label: "ELETTRONICA", emoji: "⚡", hex: "#6366f1", status: "building", pct: 50, detail: "HMI TP900 Comfort · controller CNC · driver stepper · sensori posizione." },
  ],
  mims: [
    { id: "mims-vulcan",   label: "VULCAN",      emoji: "🔥", hex: "#ef4444", status: "pending",  pct: 15, detail: "Pressa 20t — riempie gli stampi fresati da V32. Ricette polimeri proprietarie.",
      children: {
        "mims-vulcan": [
          { id: "vul-struttura", label: "STRUTTURA", emoji: "🏗", hex: "#ef4444", status: "pending",  pct: 20, detail: "Martinetto 20t Vevor 3 stati · colonne guida (know-how DATWLER)." },
          { id: "vul-ricette",   label: "RICETTE",   emoji: "🧪", hex: "#f59e0b", status: "future",   pct: 0,  detail: "Formula proprietaria polimeri · temp/pressione/tempo/durezza." },
          { id: "vul-brevetto",  label: "BREVETTO",  emoji: "📜", hex: "#06b6d4", status: "future",   pct: 0,  detail: "Documentazione brevettuale · moat competitivo MIMS." },
        ],
      }
    },
    { id: "mims-kit",     label: "CONNETTORI",  emoji: "🔩", hex: "#f59e0b", status: "pending",  pct: 10, detail: "Tile modulari incastro · stampati con VULCAN · il prodotto finale MIMS." },
    { id: "mims-fitpark", label: "FIT PARK",    emoji: "🏋", hex: "#10b981", status: "future",   pct: 5,  detail: "Area fitness outdoor · tornello con connettori MIMS · prima applicazione." },
    { id: "mims-digital", label: "DIGITALE",    emoji: "📱", hex: "#818cf8", status: "future",   pct: 0,  detail: "App mobile · catalogo connettori · API MIMS online." },
  ],
  vita: [
    { id: "eva-bot",    label: "EVA BOT",  emoji: "🤖", hex: "#818cf8", status: "building", pct: 40, detail: "n8n workflow · WhatsApp Business API · risposte automatiche." },
    { id: "vita-crm",   label: "CRM",      emoji: "📋", hex: "#ec4899", status: "future",   pct: 0,  detail: "Gestione appuntamenti · clienti · SMS reminder." },
    { id: "vita-brand", label: "BRAND",    emoji: "🌿", hex: "#10b981", status: "pending",  pct: 10, detail: "Instagram · contenuti estetici · campagne Vita Natura." },
  ],
  identity: [
    { id: "id-cv",      label: "CV LAYERS",  emoji: "📄", hex: "#06b6d4", status: "active",  pct: 80, detail: "SCProject · ESSEGI · DATWLER · LU.VE — proof reali.",
      children: {
        "id-cv": [
          { id: "cv-sc",      label: "SCProject", emoji: "🔥", hex: "#06b6d4", status: "active", pct: 100, detail: "TIG/MIG titanio MotoGP · scarichi racing WorldChampionship." },
          { id: "cv-essegi",  label: "ESSEGI",    emoji: "🤖", hex: "#6366f1", status: "active", pct: 100, detail: "Robot industriali · programmazione · celle automatizzate." },
          { id: "cv-datwler", label: "DATWLER",   emoji: "🔧", hex: "#f59e0b", status: "active", pct: 100, detail: "Presse industriali · colonne guide (riuso in VULCAN)." },
          { id: "cv-luve",    label: "LU.VE",     emoji: "📏", hex: "#10b981", status: "active", pct: 100, detail: "Quality Control · metrologia · ISO · scambiatori calore." },
        ],
      }
    },
    { id: "id-sinapsi",  label: "SINAPSI",   emoji: "🔮", hex: "#8b5cf6", status: "active",  pct: 60, detail: "Ecosistema navigabile a layer · CV tree · VULCAN · MIMS." },
    { id: "id-content",  label: "CONTENT",   emoji: "🎬", hex: "#ec4899", status: "pending", pct: 10, detail: "Video · podcast · thread X · storytelling industriale." },
  ],
  genesis: [
    { id: "gen-brain", label: "BRAIN",       emoji: "🧠", hex: "#06b6d4", status: "active",  pct: 90, detail: "STATE.json · KNOWLEDGE 21 file · ASSOLUTO V7." },
    { id: "gen-auto",  label: "AUTOMATIONS", emoji: "⚙",  hex: "#10b981", status: "active",  pct: 70, detail: "34 automazioni · n8n · watcher · scanner · 13 attive." },
    { id: "gen-dash",  label: "DASHBOARD",   emoji: "📊", hex: "#6366f1", status: "active",  pct: 85, detail: "React 19 · LayersView v2 · NeuroMap v3 · 10+ pannelli." },
    { id: "gen-mem",   label: "MEMORY",      emoji: "💾", hex: "#8b5cf6", status: "active",  pct: 75, detail: ".claude/memory/ · feedback · user · project · reference." },
  ],
  // Ring 2 ciclo drill-down
  build:    [
    { id: "build-v32",    label: "V32 CONFIG G",  emoji: "🔧", hex: "#10b981", status: "building",  pct: 65, detail: "CNC in costruzione · rinforzi colonne Z+U · gusset+diag+tiranti · epoxy fill." },
    { id: "build-vulcan", label: "VULCAN PRESSA", emoji: "🔥", hex: "#ef4444", status: "pending",   pct: 15, detail: "Pressa 20t · attende V32 completamento · poi riempirà stampi per MIMS." },
  ],
  design:   [
    { id: "des-mims",  label: "MIMS CAD",    emoji: "📐", hex: "#818cf8", status: "building", pct: 40, detail: "Shapr3D · piastra A5 · corpo connettore · assiemi." },
    { id: "des-v33",   label: "V33 DESIGN",  emoji: "🖊",  hex: "#06b6d4", status: "future",   pct: 5,  detail: "Prossima generazione fresatrice · specifiche avanzate." },
    { id: "des-sys",   label: "GENESIS v7",  emoji: "🧬", hex: "#10b981", status: "building", pct: 60, detail: "Architettura TITANIUM_OS V7 · nuovi layer · ottimizzazioni." },
  ],
  doc:      [
    { id: "doc-video",  label: "VIDEO AVA",   emoji: "🎬", hex: "#06b6d4", status: "building", pct: 30, detail: "Storytelling milestone · format YouTube · script AVA." },
    { id: "doc-change", label: "CHANGELOG",   emoji: "📝", hex: "#10b981", status: "active",   pct: 70, detail: "Changelog automatico via n8n · diff_log.json · watcher." },
    { id: "doc-linkedin",label: "LINKEDIN",   emoji: "💼", hex: "#818cf8", status: "pending",  pct: 10, detail: "Post storytelling · aggiornamenti milestone · brand." },
  ],
};

// ─── BUILDER LIVELLO DRILL ─────────────────────────────────────────────────
function buildDrillLevel(parentId: string, children: DrillNode[]): DrillLevel {
  // Trova il parent nei dati base o nei figli ricorsivi
  const findNode = (id: string): { label: string; emoji: string; hex: string } => {
    for (const [, arr] of Object.entries(DRILL_CHILDREN)) {
      const found = arr.find((n) => n.id === id);
      if (found) return found;
    }
    // Fallback: cerca nei livelli profondi
    for (const [, arr] of Object.entries(DRILL_CHILDREN)) {
      for (const n of arr) {
        if (n.children) {
          for (const [, sub] of Object.entries(n.children)) {
            const f = sub.find((s) => s.id === parentId);
            if (f) return f;
          }
        }
      }
    }
    return { label: parentId.toUpperCase(), emoji: "◉", hex: "#06b6d4" };
  };

  const parent = findNode(parentId);

  const total1 = Math.min(children.length, 6);
  const extra  = children.slice(6);
  const ring1  = children.slice(0, 6);
  const total2 = extra.length;

  const nodes: MapNode[] = [
    {
      id: parentId, label: parent.label, emoji: parent.emoji,
      ring: 0, idx: 0, total: 1,
      hex: parent.hex, status: "active",
      detail: "",
    },
    ...ring1.map((c, i) => ({
      id: c.id, label: c.label, emoji: c.emoji,
      ring: 1 as const, idx: i, total: total1,
      hex: c.hex, status: c.status, pct: c.pct,
      detail: c.detail,
      hasChildren: !!(c.children?.[c.id]?.length),
    })),
    ...extra.map((c, i) => ({
      id: c.id, label: c.label, emoji: c.emoji,
      ring: 2 as const, idx: i, total: total2,
      hex: c.hex, status: c.status, pct: c.pct,
      detail: c.detail,
      hasChildren: false,
    })),
  ];

  const edges: [string, string][] = ring1.map((c) => [parentId, c.id] as [string, string]);
  extra.forEach((c, i) => {
    edges.push([parentId, c.id]);
    if (i > 0) edges.push([extra[i - 1].id, c.id]);
  });

  return { parentId, parentLabel: parent.label, parentEmoji: parent.emoji, parentHex: parent.hex, nodes, edges };
}

// ─── DATI NODI BASE (livello 0) ────────────────────────────────────────────
const NODES_BASE: MapNode[] = [
  { id: "os",       label: "TITANIUM OS", emoji: "⚡", ring: 0, idx: 0, total: 1, hex: "#10b981", status: "active", detail: "Sistema operativo dell'ecosistema. Cervello collettivo, memoria, Claude Code, orchestrazione." },
  { id: "v32",      label: "V32",         emoji: "🔧", ring: 1, idx: 0, total: 5, hex: "#10b981", status: "building",  pct: 65,  pillarKey: "V32",          detail: "CNC 3 assi IN COSTRUZIONE — fresa stampi per MIMS via VULCAN. 178 kg, ±0.019 mm. La Taverna.", hasChildren: true },
  { id: "mims",     label: "MIMS",        emoji: "🔩", ring: 1, idx: 1, total: 5, hex: "#f59e0b", status: "pending",  pct: 30,  pillarKey: "MIMS",         detail: "Connettori modulari fisici — output catena V32→VULCAN→MIMS. Attende V32.", hasChildren: true },
  { id: "vita",     label: "VITA NATURA", emoji: "🌿", ring: 1, idx: 2, total: 5, hex: "#818cf8", status: "active",   pct: 40,  pillarKey: "VITA_NATURA",  detail: "Centro estetico Maria. EVA WhatsApp bot. Boffalora s/T.", hasChildren: true },
  { id: "identity", label: "IDENTITY",    emoji: "👤", ring: 1, idx: 3, total: 5, hex: "#64748b", status: "pending",  pct: 20,  pillarKey: "IDENTITY",     detail: "CV layers + SINAPSI + brand Matteo Benenati.", hasChildren: true },
  { id: "genesis",  label: "GENESIS",     emoji: "🧠", ring: 1, idx: 4, total: 5, hex: "#06b6d4", status: "building", pct: 40,  pillarKey: "GENESIS",      detail: "TITANIUM_OS: dashboard, memory, Claude Code, n8n.", hasChildren: true },
  { id: "build",    label: "COSTRUISCI",  emoji: "⚒",  ring: 2, idx: 0, total: 8, hex: "#10b981", status: "active",   detail: "Config G — Rinforzi Z+U.", hasChildren: true },
  { id: "doc",      label: "DOCUMENTA",   emoji: "📖", ring: 2, idx: 1, total: 8, hex: "#06b6d4", status: "building", detail: "Video AVA, changelog, storytelling.", hasChildren: true },
  { id: "teach",    label: "INSEGNA",     emoji: "🎓", ring: 2, idx: 2, total: 8, hex: "#06b6d4", status: "future",   detail: "Community, skill tree, tutorial." },
  { id: "unlock",   label: "SBLOCCA",     emoji: "🔓", ring: 2, idx: 3, total: 8, hex: "#818cf8", status: "active",   detail: "Rimuovi blockers. Sblocca dipendenze." },
  { id: "design",   label: "PROGETTA",    emoji: "📐", ring: 2, idx: 4, total: 8, hex: "#818cf8", status: "building", detail: "MIMS CAD, connettori, GENESIS v7.", hasChildren: true },
  { id: "produce",  label: "PRODUCI",     emoji: "⚙",  ring: 2, idx: 5, total: 8, hex: "#f59e0b", status: "pending",  detail: "La catena: V32 fresa stampi → VULCAN pressa → MIMS esce. La Taverna." },
  { id: "sell",     label: "VENDI",       emoji: "📈", ring: 2, idx: 6, total: 8, hex: "#f59e0b", status: "future",   detail: "B2B fresatura, MIMS kit, EVA SaaS. Target €1.5k/mese 2027." },
  { id: "reinvest", label: "REINVESTI",   emoji: "♻",  ring: 2, idx: 7, total: 8, hex: "#10b981", status: "future",   detail: "Upgrade V32→V33, espandi MIMS, reinvesti profitto." },
];

const EDGES_BASE: [string, string][] = [
  ["os","v32"],["os","mims"],["os","vita"],["os","identity"],["os","genesis"],
  ["v32","build"],["v32","produce"],["v32","mims"],  // catena: V32→stampi→VULCAN→MIMS
  ["mims","design"],["mims","produce"],["mims","sell"],
  ["vita","sell"],["vita","design"],
  ["identity","teach"],["identity","sell"],
  ["genesis","doc"],["genesis","teach"],["genesis","unlock"],
  ["build","doc"],["doc","teach"],["teach","unlock"],["unlock","design"],
  ["design","produce"],["produce","sell"],["sell","reinvest"],["reinvest","build"],
];

const CICLO_MAP: Record<string, string> = {
  COSTRUISCI:"build",DOCUMENTA:"doc",INSEGNA:"teach",
  SBLOCCA:"unlock",PROGETTA:"design",PRODUCI:"produce",VENDI:"sell",REINVESTI:"reinvest",
};

function mapStatus(s: string): Status {
  if (s === "in_progress" || s === "active") return "active";
  if (s === "building") return "building";
  if (s.startsWith("waiting") || s === "pending") return "pending";
  return "future";
}

// ─── COMPONENTE ────────────────────────────────────────────────────────────
export function NeuroMapView() {
  const [hovered,    setHovered]    = useState<string | null>(null);
  const [selected,   setSelected]   = useState<string | null>(null);
  const [live,       setLive]       = useState<LiveState | null>(null);
  const [apiOk,      setApiOk]      = useState<boolean | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  // ── Drill stack ──
  // stack[0] = livello 0 (base), stack[n] = livelli drill-down
  type StackEntry = {
    nodes: MapNode[];
    edges: [string, string][];
    centerId: string;
    centerLabel: string;
    centerHex: string;
    centerEmoji: string;
  };
  const L0_ENTRY: StackEntry = {
    nodes: NODES_BASE,
    edges: EDGES_BASE,
    centerId: "os",
    centerLabel: "TITANIUM OS",
    centerHex: "#10b981",
    centerEmoji: "⚡",
  };

  const [stack,    setStack]    = useState<StackEntry[]>([L0_ENTRY]);
  const [animKey,  setAnimKey]  = useState(0);
  const [zoomNode, setZoomNode] = useState<{ x: number; y: number; hex: string } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const current = stack[stack.length - 1];
  const level   = stack.length - 1;

  // ── Live state ──
  const fetchState = useCallback(async () => {
    try {
      const r = await fetch(`${API}/api/state`, { signal: AbortSignal.timeout(4000) });
      if (!r.ok) throw new Error();
      setLive(await r.json());
      setApiOk(true);
    } catch { setApiOk(false); }
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, 30_000);
    return () => clearInterval(id);
  }, [fetchState]);

  // ── Nodi con dati live ──
  const nodes: MapNode[] = useMemo(() => {
    if (!live || level > 0) return current.nodes;
    return current.nodes.map((n) => {
      if (!n.pillarKey) return n;
      const p = live.pillars[n.pillarKey];
      if (!p) return n;
      return { ...n, status: mapStatus(p.status), pct: p.pct_complete };
    });
  }, [live, current.nodes, level]);

  const nodeMap = useMemo(() => {
    const m: Record<string, MapNode> = {};
    nodes.forEach((n) => (m[n.id] = n));
    return m;
  }, [nodes]);

  const posMap = useMemo(() => {
    const m: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n) => (m[n.id] = nodePos(n)));
    return m;
  }, [nodes]);

  const cicloActiveId = live ? (CICLO_MAP[live.ciclo_position] ?? null) : null;

  const connectedTo = useCallback((id: string): Set<string> => {
    const s = new Set<string>();
    current.edges.forEach(([a, b]) => {
      if (a === id) s.add(b);
      if (b === id) s.add(a);
    });
    return s;
  }, [current.edges]);

  const systemPct = useMemo(() => {
    if (!live) return 0;
    const vals = Object.values(live.pillars).map((p) => p.pct_complete).filter(Boolean);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  }, [live]);

  const activeId   = hovered || selected;
  const activeConn = activeId ? connectedTo(activeId) : new Set<string>();
  const selNode    = selected ? nodeMap[selected] : null;

  const edgeOpacity = (a: string, b: string) =>
    !activeId ? 0.18 : (a === activeId || b === activeId) ? 0.9 : 0.04;

  const edgeColor = (a: string, b: string) =>
    !activeId ? "#334155" : (a === activeId || b === activeId) ? (nodeMap[a]?.hex ?? "#334155") : "#1e293b";

  const nodeOpacity = (id: string) =>
    !activeId ? 1 : (id === activeId || activeConn.has(id)) ? 1 : 0.18;

  // ── Patch status ──
  const patchStatus = async (n: MapNode, next: Status) => {
    if (!n.pillarKey) return;
    try {
      await fetch(`${API}/api/state/pillar/${n.pillarKey}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
      fetchState();
    } catch { /* offline */ }
  };

  const cycleStatus = (n: MapNode) => {
    patchStatus(n, STATUS_CYCLE[(STATUS_CYCLE.indexOf(n.status) + 1) % STATUS_CYCLE.length]);
  };

  // ── Drill down ──
  const drillInto = (nodeId: string, pos: { x: number; y: number }) => {
    const children = DRILL_CHILDREN[nodeId];
    if (!children || isTransitioning) return;

    const node = nodeMap[nodeId];
    setZoomNode({ x: pos.x, y: pos.y, hex: node?.hex ?? "#06b6d4" });
    setIsTransitioning(true);
    setSelected(null);

    setTimeout(() => {
      const dl = buildDrillLevel(nodeId, children);
      setStack((prev) => [...prev, {
        nodes: dl.nodes,
        edges: dl.edges,
        centerId: nodeId,
        centerLabel: dl.parentLabel,
        centerHex: dl.parentHex,
        centerEmoji: dl.parentEmoji,
      }]);
      setZoomNode(null);
      setAnimKey((k) => k + 1);
      setIsTransitioning(false);
    }, 350);
  };

  const drillBack = (targetIdx?: number) => {
    if (stack.length <= 1) return;
    setIsTransitioning(true);
    setSelected(null);
    setTimeout(() => {
      setStack((prev) => targetIdx !== undefined ? prev.slice(0, targetIdx + 1) : prev.slice(0, -1));
      setAnimKey((k) => k + 1);
      setIsTransitioning(false);
    }, 200);
  };

  // ── Click nodo ──
  const handleNodeClick = (n: MapNode) => {
    const pos = posMap[n.id];
    if (n.hasChildren && DRILL_CHILDREN[n.id]) {
      drillInto(n.id, pos);
    } else {
      setSelected(selected === n.id ? null : n.id);
    }
  };

  // ─── RENDER ────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes np { 0%,100%{opacity:.04}50%{opacity:.22} }
        @keyframes nc { 0%,100%{opacity:.1}50%{opacity:.6} }
        @keyframes drillZoom {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes nodeIn {
          from { opacity: 0; transform-origin: center; transform: scale(0.3); }
          to   { opacity: 1; transform: scale(1); }
        }
        .np-pulse { animation: np 2.6s ease-in-out infinite; }
        .nc-pulse { animation: nc 1.3s ease-in-out infinite; }
        .drill-fade { animation: fadeUp 0.28s ease-out both; }
        .node-in { animation: nodeIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      <div className="flex flex-col gap-1 h-full">

        {/* ── Header ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
            {nodes.length} nodi · {current.edges.length} assi · ∞ ciclo
          </span>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${apiOk === null ? "bg-slate-600" : apiOk ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-[7px] font-mono text-slate-700">{apiOk === null ? "…" : apiOk ? "LIVE" : "OFFLINE"}</span>
          </div>
          <div className="ml-auto flex gap-1.5">
            {(["active","building","pending","future"] as Status[]).map((s) => (
              <div key={s} className={`text-[7px] font-mono px-1.5 py-0.5 rounded border ${STATUS_CLASS[s]}`}>{STATUS_LABEL[s]}</div>
            ))}
          </div>
        </div>

        {/* ── Breadcrumb drill ── */}
        {stack.length > 1 && (
          <div className="flex items-center gap-1 flex-shrink-0 px-0.5 py-1 border-b border-slate-800/50">
            {stack.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1">
                {idx > 0 && <span className="text-slate-700 text-[9px]">/</span>}
                <button
                  onClick={() => drillBack(idx)}
                  className="text-[9px] font-mono transition-all duration-150 hover:opacity-100 flex items-center gap-1"
                  style={{
                    color: idx === stack.length - 1 ? entry.centerHex : "#475569",
                    fontWeight: idx === stack.length - 1 ? 700 : 400,
                  }}
                >
                  {idx === 0 ? "⚡ ROOT" : `${entry.centerEmoji} ${entry.centerLabel}`}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Focus strip ── */}
        {live?.focus_today && level === 0 && (
          <div className="flex items-center gap-2 px-2 py-1 rounded border border-l-2 border-emerald-900/40 border-l-emerald-500 bg-emerald-950/20 flex-shrink-0">
            <span className="text-[7px] font-mono text-emerald-600 uppercase tracking-widest flex-shrink-0">▶ OGGI</span>
            <span className="text-[8px] font-mono text-emerald-400 truncate">{live.focus_today}</span>
          </div>
        )}

        {/* ── SVG Map ── */}
        <div className="w-full overflow-hidden flex-shrink-0">
          <svg
            ref={svgRef}
            key={animKey}
            viewBox="0 0 500 430"
            style={{ display: "block", width: "100%", height: "auto" }}
            preserveAspectRatio="xMidYMid meet"
            className="drill-fade"
          >
            <defs>
              <pattern id="ngrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.6" fill="#1e293b" />
              </pattern>
              {/* Radial glow per il centro del livello corrente */}
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="30%">
                <stop offset="0%" stopColor={current.centerHex} stopOpacity="0.12" />
                <stop offset="100%" stopColor={current.centerHex} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background */}
            <rect width="500" height="430" fill="url(#ngrid)" />
            {/* Glow centro */}
            <rect width="500" height="430" fill="url(#centerGlow)" />

            {/* Anelli guida */}
            {RADII.slice(1).map((r) => (
              <circle key={r} cx={CX} cy={CY} r={r}
                fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 5" />
            ))}

            {/* Level indicator watermark */}
            {level > 0 && (
              <text x={CX} y={CY + 95} textAnchor="middle"
                fill={current.centerHex} fontSize="80" fontFamily="monospace"
                opacity="0.04" letterSpacing="-4" fontWeight="900"
              >L{level}</text>
            )}

            {/* Zoom burst — animazione click */}
            {zoomNode && (
              <circle
                cx={zoomNode.x} cy={zoomNode.y} r={20}
                fill="none" stroke={zoomNode.hex} strokeWidth="2"
                style={{ animation: "drillZoom 0.35s ease-out forwards", transformOrigin: `${zoomNode.x}px ${zoomNode.y}px` }}
              />
            )}

            {/* ── EDGES ── */}
            {current.edges.map(([a, b], i) => {
              const pa = posMap[a], pb = posMap[b];
              if (!pa || !pb) return null;
              const isHot = !!(activeId && (a === activeId || b === activeId));
              return (
                <line key={i}
                  x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                  stroke={edgeColor(a, b)}
                  strokeWidth={isHot ? 1.8 : 0.7}
                  strokeOpacity={edgeOpacity(a, b)}
                  style={{ transition: "stroke-opacity 0.18s, stroke-width 0.18s" }}
                />
              );
            })}

            {/* ── PROGRESS ARCS ── */}
            {nodes.map((n) => {
              if (n.ring === 2) return null;
              const { x, y } = posMap[n.id];
              const arcR = n.ring === 0 ? NODE_R[0] + 10 : NODE_R[1] + 5;
              const pct  = n.ring === 0 ? (level === 0 ? systemPct : 100) : (n.pct ?? 0);
              if (pct <= 0) return null;
              return (
                <g key={`arc-${n.id}`} style={{ opacity: nodeOpacity(n.id), transition: "opacity 0.18s" }}>
                  <circle cx={x} cy={y} r={arcR} fill="none" stroke="#1e293b" strokeWidth="2.5" />
                  <path d={arcPath(x, y, arcR, pct)} fill="none"
                    stroke={n.hex} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                </g>
              );
            })}

            {/* ── NODES ── */}
            {nodes.map((n, ni) => {
              const { x, y } = posMap[n.id];
              const r         = NODE_R[n.ring];
              const isActive  = n.id === activeId;
              const isSel     = n.id === selected;
              const isCiclo   = level === 0 && n.id === cicloActiveId;
              const canDrill  = !!(n.hasChildren && DRILL_CHILDREN[n.id]);

              return (
                <g key={n.id}
                  className={ni > 0 ? "node-in" : ""}
                  style={{
                    cursor: canDrill ? "zoom-in" : "pointer",
                    opacity: nodeOpacity(n.id),
                    transition: "opacity 0.18s",
                    animationDelay: `${ni * 40}ms`,
                  }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleNodeClick(n)}
                >
                  {/* Pulse ring attivi */}
                  {n.status === "active" && (
                    <circle cx={x} cy={y} r={r + 5} fill="none"
                      stroke={n.hex} strokeWidth="8" className="np-pulse" />
                  )}

                  {/* Ciclo badge */}
                  {isCiclo && (
                    <circle cx={x} cy={y} r={r + 10} fill="none"
                      stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 3"
                      className="nc-pulse" />
                  )}

                  {/* Drill glow — nodi espandibili */}
                  {canDrill && isActive && (
                    <circle cx={x} cy={y} r={r + 8} fill="none"
                      stroke={n.hex} strokeWidth="3" strokeOpacity="0.2"
                      style={{ filter: `drop-shadow(0 0 4px ${n.hex})` }}
                    />
                  )}

                  {/* Selection ring */}
                  {isSel && (
                    <circle cx={x} cy={y} r={r + 7} fill="none"
                      stroke={n.hex} strokeWidth="1.5" strokeOpacity="0.5" />
                  )}

                  {/* Cerchio principale */}
                  <circle cx={x} cy={y} r={r}
                    fill="#0f172a"
                    stroke={n.hex}
                    strokeWidth={isActive ? 2.4 : 1.2}
                    strokeOpacity={isActive ? 1 : 0.65}
                    style={{ transition: "stroke-width 0.15s" }}
                  />

                  {/* Status dot */}
                  <circle cx={x + r * 0.62} cy={y - r * 0.62} r={2.5} fill={STATUS_HEX[n.status]} />

                  {/* Drill indicator — triangolino basso destra */}
                  {canDrill && (
                    <text x={x + r * 0.55} y={y + r * 0.75}
                      textAnchor="middle" fill={n.hex} fontSize="5"
                      fontFamily="monospace" opacity={isActive ? 1 : 0.4}
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    >▶</text>
                  )}

                  {/* NOW badge */}
                  {isCiclo && (
                    <text x={x} y={y - r - 5} textAnchor="middle"
                      fill="#f97316" fontSize="5" fontFamily="monospace"
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    >▶ NOW</text>
                  )}

                  {/* Emoji */}
                  <text x={x} y={y + (n.ring === 0 ? 5 : 4)} textAnchor="middle"
                    fontSize={n.ring === 0 ? 13 : n.ring === 1 ? 10 : 8}
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  >{n.emoji}</text>

                  {/* Label */}
                  <text x={x} y={y + r + 10} textAnchor="middle"
                    fill={isCiclo ? "#f97316" : isActive ? n.hex : "#475569"}
                    fontSize="6.5" fontFamily="monospace" letterSpacing="0.05em"
                    style={{ transition: "fill 0.15s", userSelect: "none", pointerEvents: "none" }}
                  >{n.label}</text>
                </g>
              );
            })}

            {/* Ciclo label */}
            {live?.ciclo_position && level === 0 && (
              <text x={CX} y={412} textAnchor="middle"
                fill="#f97316" fontSize="7" fontFamily="monospace"
                letterSpacing="0.1em" opacity="0.55"
              >CICLO · {live.ciclo_position}</text>
            )}
            {level > 0 && (
              <text x={CX} y={412} textAnchor="middle"
                fill={current.centerHex} fontSize="7" fontFamily="monospace"
                letterSpacing="0.1em" opacity="0.4"
              >L{level} · {current.centerLabel}</text>
            )}
          </svg>
        </div>

        {/* ── Back button (se in drill) ── */}
        {stack.length > 1 && (
          <button
            onClick={() => drillBack()}
            className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded border transition-all duration-200 w-fit"
            style={{ borderColor: current.centerHex + "40", color: current.centerHex, background: current.centerHex + "08" }}
          >
            <ChevronLeft size={10} />
            <span className="text-[8px] font-mono">{stack[stack.length - 2].centerLabel}</span>
          </button>
        )}

        {/* ── Blockers ── */}
        {live?.blockers && live.blockers.length > 0 && level === 0 && (
          <div className="flex items-start gap-2 px-2 py-1 rounded border border-l-2 border-red-900/40 border-l-red-500 bg-red-950/20 flex-shrink-0">
            <AlertTriangle size={9} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              {live.blockers.map((b, i) => (
                <span key={i} className="text-[8px] font-mono text-red-400">{b}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── Detail panel ── */}
        {selNode && (
          <div className="flex-shrink-0 rounded-lg border p-2.5"
            style={{ borderColor: `${selNode.hex}30`, borderLeftColor: selNode.hex, borderLeftWidth: 2, backgroundColor: "#030712" }}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">{selNode.emoji}</span>
                <div>
                  <div className="text-[11px] font-bold font-mono" style={{ color: selNode.hex }}>
                    {selNode.label}
                    {selNode.hasChildren && DRILL_CHILDREN[selNode.id] && (
                      <span className="ml-1 text-[8px] opacity-60">▶ espandibile</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <button
                      onClick={() => { if (selNode.ring === 1) cycleStatus(selNode); }}
                      className={`text-[7px] font-mono px-1.5 py-0.5 rounded border ${STATUS_CLASS[selNode.status]}
                        ${selNode.ring === 1 ? "cursor-pointer hover:opacity-70" : "cursor-default"}`}
                    >
                      {STATUS_LABEL[selNode.status]}{selNode.ring === 1 && " ↻"} · {connectedTo(selNode.id).size} assi
                    </button>
                    {selNode.pct !== undefined && (
                      <span className="text-[7px] font-mono text-slate-500">{selNode.pct}%</span>
                    )}
                    {savedFlash && <span className="text-[7px] font-mono text-emerald-500">✓ SALVATO</span>}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-slate-400 transition-colors mt-0.5">
                <X size={10} />
              </button>
            </div>

            {/* Live pillar data */}
            {selNode.ring === 1 && selNode.pillarKey && live?.pillars?.[selNode.pillarKey] && (
              <div className="mb-1.5 p-1.5 rounded bg-slate-900/50 border border-slate-800">
                <div className="text-[7px] font-mono text-slate-600 uppercase mb-0.5">Fase</div>
                <div className="text-[8px] font-mono text-slate-400 mb-1">{live.pillars[selNode.pillarKey].phase}</div>
                <div className="text-[7px] font-mono text-slate-600 uppercase mb-0.5">Next</div>
                <div className="text-[8px] font-mono text-emerald-400">{live.pillars[selNode.pillarKey].next}</div>
              </div>
            )}

            {/* OS overview */}
            {selNode.id === current.centerId && live && level === 0 && (
              <div className="mb-1.5 grid grid-cols-3 gap-1">
                {Object.entries(live.pillars).map(([key, p]) => (
                  <div key={key} className="p-1 rounded bg-slate-900/50 border border-slate-800">
                    <div className="text-[7px] font-mono text-slate-600 truncate">{key}</div>
                    <div className="text-[9px] font-mono font-bold" style={{ color: STATUS_HEX[mapStatus(p.status)] }}>
                      {p.pct_complete}%
                    </div>
                  </div>
                ))}
                <div className="p-1 rounded bg-emerald-950/30 border border-emerald-900/40">
                  <div className="text-[7px] font-mono text-slate-600">SISTEMA</div>
                  <div className="text-[9px] font-mono font-bold text-emerald-400">{systemPct}%</div>
                </div>
              </div>
            )}

            <p className="text-[9px] font-mono text-slate-500 leading-relaxed mb-2">{selNode.detail}</p>

            <div className="flex flex-wrap gap-1">
              {Array.from(connectedTo(selNode.id)).map((cid) => {
                const cn = nodeMap[cid];
                if (!cn) return null;
                return (
                  <button key={cid} onClick={() => setSelected(cid)}
                    className="text-[7px] font-mono px-1.5 py-0.5 rounded border border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300 transition-colors"
                  >{cn.emoji} {cn.label}</button>
                );
              })}
              {selNode.hasChildren && DRILL_CHILDREN[selNode.id] && (
                <button
                  onClick={() => drillInto(selNode.id, posMap[selNode.id])}
                  className="text-[7px] font-mono px-2 py-0.5 rounded border transition-all"
                  style={{ borderColor: selNode.hex + "60", color: selNode.hex, background: selNode.hex + "10" }}
                >▶ entra</button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
