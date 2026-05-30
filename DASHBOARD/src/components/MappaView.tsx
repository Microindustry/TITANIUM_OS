// MappaView.tsx | TITANIUM_OS | v2.0 | 2026-05-30
// Topologia live — drill-down multi-livello, cerchi concentrici, breadcrumb

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d";
import { ChevronLeft, Activity } from "lucide-react";

type NodeStatus = "active" | "building" | "pending" | "future";

interface GNode {
  id: string; label: string; type: "root" | "pillar" | "node" | "leaf";
  status: NodeStatus; pillar: string; desc: string; pct?: number;
  hasChildren?: boolean; ring?: number;
  // ForceGraph fx/fy per posizioni fisse
  fx?: number; fy?: number;
  x?: number; y?: number;
}
interface GLink { source: string; target: string; kind: "owns" | "chain" | "dep" }

// ── palette ───────────────────────────────────────────────────
const PILLAR_HEX: Record<string, string> = {
  ROOT: "#10b981", V32: "#10b981", GENESIS: "#06b6d4",
  MIMS: "#f59e0b", VITA_NATURA: "#a78bfa", IDENTITY: "#64748b",
};
const STATUS_HEX: Record<NodeStatus, string> = {
  active: "#10b981", building: "#f59e0b", pending: "#818cf8", future: "#334155",
};
function nColor(n: GNode) {
  if (n.type === "root")   return "#10b981";
  if (n.type === "pillar") return PILLAR_HEX[n.pillar] ?? "#475569";
  return STATUS_HEX[n.status];
}
function parseStatus(s: string): NodeStatus {
  const l = s.toLowerCase();
  if (l.startsWith("attivo")) return "active";
  if (l.startsWith("building")) return "building";
  if (l.startsWith("pending")) return "pending";
  return "future";
}

// ── dati figli statici per drill L2/L3 ───────────────────────
const STATIC_CHILDREN: Record<string, Array<Omit<GNode, "ring" | "fx" | "fy" | "x" | "y">>> = {
  // Pillar V32 → sub-sistemi fisici
  V32: [
    { id:"v32-struttura", label:"STRUTTURA",   type:"leaf", status:"building", pillar:"V32", pct:65,  desc:"Telaio 40×40×3 S235 · colonne 60×60 · gusset 200mm · diagonali · tiranti M10", hasChildren:false },
    { id:"v32-assi",      label:"ASSI X/Y/Z",  type:"leaf", status:"building", pillar:"V32", pct:55,  desc:"Asse X assemblato · guide LM20 · vite SFU1605 · servo 400W · Y/Z in montaggio · target ±0.019mm", hasChildren:false },
    { id:"v32-mandrino",  label:"MANDRINO",    type:"leaf", status:"pending",  pillar:"V32", pct:0,   desc:"2.2kW ER20 — da ordinare. BLOCKER: ultimo pezzo prima di fresare stampi MIMS.", hasChildren:false },
    { id:"v32-elettr",    label:"ELETTRONICA", type:"leaf", status:"building", pillar:"V32", pct:50,  desc:"HMI TP900 Comfort · CNC controller · driver stepper · sensori posizione · cablaggi", hasChildren:false },
    { id:"v32-config-g",  label:"CONFIG G",    type:"leaf", status:"active",   pillar:"V32", pct:65,  desc:"Milestone attivo: rinforzi colonne Z+U · epoxy fill · silent blocks decisione v.A/v.B", hasChildren:false },
  ],
  // Pillar MIMS → prodotti
  MIMS: [
    { id:"mims-vulcan",   label:"VULCAN",      type:"leaf", status:"pending",  pillar:"MIMS", pct:15, desc:"Pressa 20t Vevor · 3 posizioni · colonne guida (know-how DATWLER) · attende V32", hasChildren:false },
    { id:"mims-kit",      label:"CONNETTORI",  type:"leaf", status:"pending",  pillar:"MIMS", pct:10, desc:"Tile modulari incastro · stampati con VULCAN · il prodotto finale MIMS · Shapr3D CAD", hasChildren:false },
    { id:"mims-fitpark",  label:"FIT PARK",    type:"leaf", status:"future",   pillar:"MIMS", pct:5,  desc:"Area fitness outdoor · primo mercato · connettori MIMS come infrastruttura modulare", hasChildren:false },
    { id:"mims-digital",  label:"DIGITALE",    type:"leaf", status:"future",   pillar:"MIMS", pct:0,  desc:"App mobile · catalogo connettori online · API MIMS · canale B2B", hasChildren:false },
  ],
  // Pillar VITA_NATURA → servizi
  VITA_NATURA: [
    { id:"vn-eva",        label:"EVA BOT",     type:"leaf", status:"building", pillar:"VITA_NATURA", pct:40, desc:"n8n workflow · WhatsApp Business API · risposte automatiche · Maria Rule zero-click", hasChildren:false },
    { id:"vn-calendar",   label:"CALENDAR",    type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Google Calendar MCP · legge/crea eventi · integrato in Claude Code sessioni", hasChildren:false },
    { id:"vn-gmail",      label:"GMAIL",       type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Gmail MCP · search, draft, labels · account benenatimatteo.mb@gmail.com", hasChildren:false },
    { id:"vn-crm",        label:"CRM",         type:"leaf", status:"future",   pillar:"VITA_NATURA", pct:0,  desc:"Gestione appuntamenti · clienti · SMS reminder · analytics prenotazioni", hasChildren:false },
  ],
  // Pillar IDENTITY → layer
  IDENTITY: [
    { id:"id-cv",         label:"CV LAYERS",   type:"leaf", status:"active",   pillar:"IDENTITY", pct:80, desc:"SCProject · ESSEGI · DATWLER · LU.VE — 15+ anni industria reale · proof verificati", hasChildren:false },
    { id:"id-sinapsi",    label:"SINAPSI",     type:"leaf", status:"active",   pillar:"IDENTITY", pct:60, desc:"Ecosistema navigabile a layer · CV tree · VULCAN · MIMS · storytelling tecnico", hasChildren:false },
    { id:"id-github",     label:"GITHUB",      type:"leaf", status:"building", pillar:"IDENTITY", pct:45, desc:"Profilo pubblico Microindustry · repo TITANIUM_OS · v2.8.0 release · AI skills", hasChildren:false },
    { id:"id-content",    label:"CONTENT",     type:"leaf", status:"pending",  pillar:"IDENTITY", pct:10, desc:"Video AVA · podcast · thread X/LinkedIn · storytelling industriale · AVA avatar", hasChildren:false },
  ],
  // Servizi GENESIS → sub-layer
  MENTE_RAG: [
    { id:"rag-semantic",  label:"SEMANTIC",    type:"leaf", status:"active",   pillar:"GENESIS", desc:"ChromaDB · paraphrase-multilingual-MiniLM-L12-v2 · 384-dim · 759 chunk", hasChildren:false },
    { id:"rag-bm25",      label:"BM25",        type:"leaf", status:"active",   pillar:"GENESIS", desc:"TF-IDF sklearn · ngram 1-2 · keyword exact match · complementa semantic", hasChildren:false },
    { id:"rag-reranker",  label:"RERANKER",    type:"leaf", status:"active",   pillar:"GENESIS", desc:"cross-encoder/ms-marco-MiniLM-L-6-v2 · reordina top-15 → top-5 · RRF k=60", hasChildren:false },
    { id:"rag-graph",     label:"GRAPH v5",    type:"leaf", status:"active",   pillar:"GENESIS", desc:"networkx · 114 nodi · 218 archi · catene V32→MIMS→VITA_NATURA · graph-aware search", hasChildren:false },
  ],
  DASHBOARD: [
    { id:"dash-react",    label:"REACT 19",    type:"leaf", status:"active",   pillar:"GENESIS", desc:"Vite 7 · TypeScript · Tailwind v4 · Zustand · TanStack Query", hasChildren:false },
    { id:"dash-mappa",    label:"MAPPA",       type:"leaf", status:"active",   pillar:"GENESIS", desc:"Topologia live TITANIUM_OS · force-directed · drill-down multi-livello · cerchi", hasChildren:false },
    { id:"dash-rete",     label:"RETE",        type:"leaf", status:"active",   pillar:"GENESIS", desc:"Embedding 3D · t-SNE 759 chunk · Three.js raw · similarità semantica visiva", hasChildren:false },
    { id:"dash-cmd",      label:"CTRL+K",      type:"leaf", status:"active",   pillar:"GENESIS", desc:"CommandBar · navigazione rapida · fuzzy search · jump to view · Ctrl+K", hasChildren:false },
  ],
  AGENTS: [
    { id:"ag-themis",     label:"THEMIS",      type:"leaf", status:"active",   pillar:"GENESIS", desc:"Esecuzione tecnica · codifica · analisi V32/GENESIS · engineer agent", hasChildren:false },
    { id:"ag-tesla",      label:"TESLA",       type:"leaf", status:"building", pillar:"GENESIS", desc:"Hardware · elettronica · CNC · IoT · agent hardware specialist", hasChildren:false },
    { id:"ag-forge",      label:"FORGE",       type:"leaf", status:"building", pillar:"GENESIS", desc:"Meccanica · officina · saldatura · MIMS · agent officina", hasChildren:false },
    { id:"ag-eva",        label:"EVA",         type:"leaf", status:"pending",  pillar:"GENESIS", desc:"WhatsApp automation · prenotazioni Vita Natura · conversational agent", hasChildren:false },
    { id:"ag-aria",       label:"ARIA",        type:"leaf", status:"future",   pillar:"GENESIS", desc:"Life OS · ADHD scaffolding · scheduling · agent cognitivo", hasChildren:false },
  ],
  NEXUS: [
    { id:"nx-swarm",      label:"SWARM",       type:"leaf", status:"active",   pillar:"GENESIS", desc:"ThreadPoolExecutor · 3 agenti paralleli · rag+research+state", hasChildren:false },
    { id:"nx-rag",        label:"RAG AGENT",   type:"leaf", status:"active",   pillar:"GENESIS", desc:"search_graph() · hybrid BM25+semantic · graph-aware expansion · top-5", hasChildren:false },
    { id:"nx-research",   label:"RESEARCH",    type:"leaf", status:"active",   pillar:"GENESIS", desc:"13 sorgenti · arXiv · OpenAlex · GitHub · Semantic Scholar · BM25", hasChildren:false },
  ],
};

// ── posizioni cerchi concentrici ──────────────────────────────
const RADII = [0, 110, 210, 300];

function ringPositions(parentId: string, children: GNode[]): GNode[] {
  // Ring 1: primi 8 figli, Ring 2: resto
  return children.map((c, i) => {
    const ring  = i < 8 ? 1 : 2;
    const peers = i < 8 ? Math.min(children.length, 8) : children.length - 8;
    const idx   = i < 8 ? i : i - 8;
    const r     = RADII[ring];
    const angle = (-Math.PI / 2) + (idx / peers) * Math.PI * 2;
    return { ...c, ring, fx: Math.cos(angle) * r, fy: Math.sin(angle) * r };
  });
  void parentId;
}

// ── build graph per drill level ───────────────────────────────
function buildLevel0(state: any): { nodes: GNode[]; links: GLink[] } {
  const pillars   = state?.pillars ?? {};
  const rawNodes  = state?.nodes ?? {};

  const PILLAR_NODE_MAP: Record<string, string[]> = {
    GENESIS:     ["MENTE_RAG","MENTE_SCANNER","MENTE_WATCHER","MCP_SERVER","DAILY_BRIEF",
                  "API_SERVER","DASHBOARD","N8N","RESEARCH_AGENT","AGENTS","STORY_AGENT",
                  "NIGHT_PUSH","COMPUTER_USE","NEXUS"],
    V32:         ["V32_WATCHER"],
    VITA_NATURA: ["EVA","GOOGLE_CALENDAR","GMAIL"],
    MIMS:        [], IDENTITY: [],
  };

  const nodes: GNode[] = [];
  const links: GLink[] = [];

  // Root al centro
  nodes.push({ id:"OS", label:"TITANIUM OS", type:"root", status:"active", pillar:"ROOT",
    desc:"Sistema operativo cognitivo di Matteo Benenati. Orchestratore di V32, MIMS, GENESIS, VITA NATURA, IDENTITY.",
    hasChildren:true, fx:0, fy:0 });

  // Pillars in ring 1
  const pillarIds = Object.keys(pillars);
  pillarIds.forEach((key, i) => {
    const p = pillars[key];
    const angle = (-Math.PI/2) + (i / pillarIds.length) * Math.PI * 2;
    const status: NodeStatus =
      p.status === "in_progress" || p.status === "active" ? "active" :
      p.status === "building"                              ? "building" :
      p.status?.startsWith("waiting") || p.status === "pending" ? "pending" : "future";

    // ha figli nel STATIC_CHILDREN o nei rawNodes
    const hasChildren = !!(STATIC_CHILDREN[key] || Object.entries(rawNodes).some(([, v]) =>
      PILLAR_NODE_MAP[key]?.some(n => n === Object.keys(rawNodes).find(k => k === n))));

    nodes.push({ id:key, label:key.replace(/_/g," "), type:"pillar", status, pillar:key,
      desc:p.phase ?? "", pct:p.pct_complete ?? 0, hasChildren:true,
      fx: Math.cos(angle) * RADII[1], fy: Math.sin(angle) * RADII[1] });
    links.push({ source:"OS", target:key, kind:"owns" });
    void hasChildren;
  });

  // Catena V32→MIMS
  if (pillars.V32 && pillars.MIMS)
    links.push({ source:"V32", target:"MIMS", kind:"chain" });

  // Service nodes in ring 2
  const processedNodes = new Set<string>();
  for (const [nodeKey, nodeDesc] of Object.entries(rawNodes) as [string, string][]) {
    if (processedNodes.has(nodeKey)) continue;
    processedNodes.add(nodeKey);

    let pillar = "GENESIS";
    for (const [p, arr] of Object.entries(PILLAR_NODE_MAP))
      if ((arr as string[]).includes(nodeKey)) { pillar = p; break; }

    const status = parseStatus(nodeDesc);
    const parent = pillar in pillars ? pillar : "OS";

    // Posizione ring 2 relativa al pillar parent
    const parentNode = nodes.find(n => n.id === pillar);
    const sibs = Object.entries(rawNodes as Record<string,string>)
      .filter(([k]) => {
        let pl = "GENESIS";
        for (const [pp, arr] of Object.entries(PILLAR_NODE_MAP))
          if ((arr as string[]).includes(k)) { pl = pp; break; }
        return pl === pillar;
      });
    const idx   = sibs.findIndex(([k]) => k === nodeKey);
    const total = sibs.length;
    const pAngle = parentNode ? Math.atan2(parentNode.fy ?? 0, parentNode.fx ?? 0) : 0;
    const spread = Math.PI * 0.7;
    const angle  = pAngle - spread/2 + (total > 1 ? (idx / (total-1)) * spread : 0);
    const r = RADII[2];

    nodes.push({ id:nodeKey, label:nodeKey.replace(/_/g," "), type:"node", status, pillar,
      desc:nodeDesc, hasChildren:!!(STATIC_CHILDREN[nodeKey]),
      fx: Math.cos(angle) * r, fy: Math.sin(angle) * r });
    links.push({ source:parent, target:nodeKey, kind:"owns" });
  }

  return { nodes, links };
}

function buildDrillLevel(nodeId: string, parentNode: GNode, state: any): { nodes: GNode[]; links: GLink[] } {
  // Cerca figli: prima nei STATIC_CHILDREN, poi nei service nodes dello state
  const rawNodes  = state?.nodes ?? {};
  const PILLAR_NODE_MAP: Record<string, string[]> = {
    GENESIS: ["MENTE_RAG","MENTE_SCANNER","MENTE_WATCHER","MCP_SERVER","DAILY_BRIEF",
              "API_SERVER","DASHBOARD","N8N","RESEARCH_AGENT","AGENTS","STORY_AGENT",
              "NIGHT_PUSH","COMPUTER_USE","NEXUS"],
    V32: ["V32_WATCHER"], VITA_NATURA: ["EVA","GOOGLE_CALENDAR","GMAIL"],
    MIMS: [], IDENTITY: [],
  };

  let children: Omit<GNode,"ring"|"fx"|"fy"|"x"|"y">[] = STATIC_CHILDREN[nodeId] ?? [];

  // Se è un pillar e non ha static children, usa i rawNodes
  if (children.length === 0 && parentNode.type === "root") {
    const pillarIds = Object.keys(state?.pillars ?? {});
    children = pillarIds.map(key => {
      const p = state.pillars[key];
      const status: NodeStatus =
        p.status === "in_progress" || p.status === "active" ? "active" :
        p.status === "building" ? "building" :
        p.status?.startsWith("waiting") || p.status === "pending" ? "pending" : "future";
      return { id:key, label:key.replace(/_/g," "), type:"pillar" as const, status,
        pillar:key, desc:p.phase ?? "", pct:p.pct_complete ?? 0,
        hasChildren:!!(STATIC_CHILDREN[key] || (PILLAR_NODE_MAP[key]?.length ?? 0) > 0) };
    });
  }

  if (children.length === 0 && nodeId in (state?.pillars ?? {})) {
    // servizi del pillar dai rawNodes
    const arr = PILLAR_NODE_MAP[nodeId] ?? [];
    children = arr
      .filter(k => k in rawNodes)
      .map(k => ({
        id:k, label:k.replace(/_/g," "), type:"node" as const,
        status: parseStatus(rawNodes[k]), pillar:nodeId,
        desc:rawNodes[k], hasChildren:!!(STATIC_CHILDREN[k]),
      }));
  }

  const positioned = ringPositions(nodeId, children as GNode[]);
  const nodes: GNode[] = [
    { ...parentNode, fx:0, fy:0, type: parentNode.type },
    ...positioned,
  ];
  const links: GLink[] = positioned.map(c => ({ source:nodeId, target:c.id, kind:"owns" as const }));
  return { nodes, links };
}

// ── breadcrumb entry ──────────────────────────────────────────
interface StackEntry {
  nodeId: string; label: string; color: string;
  nodes: GNode[]; links: GLink[];
}

// ── componente principale ─────────────────────────────────────
export function MappaView({ systemState }: { systemState: any }) {
  const fgRef       = useRef<ForceGraphMethods>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims]     = useState({ w: window.innerWidth - 180, h: window.innerHeight - 64 });
  const [stack, setStack]   = useState<StackEntry[]>([]);
  const [selected, setSelected] = useState<GNode | null>(null);
  const pulseRef = useRef(0);

  // Pulse animation
  useEffect(() => {
    let id: number;
    const loop = () => { pulseRef.current = (pulseRef.current + 0.04) % (Math.PI * 2); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  // Resize
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      const r = containerRef.current!.getBoundingClientRect();
      if (r.width > 0) setDims({ w: r.width, h: r.height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Init level 0
  useEffect(() => {
    if (!systemState) return;
    const { nodes, links } = buildLevel0(systemState);
    setStack([{ nodeId:"OS", label:"TITANIUM OS", color:"#10b981", nodes, links }]);
  }, [systemState]);

  const current = stack[stack.length - 1];

  // Centra la vista
  useEffect(() => {
    const id = setTimeout(() => fgRef.current?.zoomToFit(600, 60), 600);
    return () => clearTimeout(id);
  }, [current]);

  const drillInto = useCallback((node: GNode) => {
    if (!node.hasChildren || !systemState) return;
    setSelected(null);
    const { nodes, links } = buildDrillLevel(node.id, node, systemState);
    setStack(s => [...s, { nodeId:node.id, label:node.label, color:nColor(node), nodes, links }]);
  }, [systemState]);

  const drillBack = useCallback((idx: number) => {
    setSelected(null);
    setStack(s => s.slice(0, idx + 1));
  }, []);

  const handleNodeClick = useCallback((raw: any) => {
    const node = raw as GNode;
    if (node.hasChildren) { drillInto(node); }
    else { setSelected(s => s?.id === node.id ? null : node); }
  }, [drillInto]);

  // ── canvas draw ─────────────────────────────────────────────
  const nodeCanvasObject = useCallback((raw: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const x: number = raw.x, y: number = raw.y;
    if (!isFinite(x) || !isFinite(y)) return;
    const n    = raw as GNode;
    const col  = nColor(n);
    const isSel = selected?.id === n.id;
    const r    = n.type === "root" ? 14 : n.type === "pillar" ? 11 : 7;

    // Pulse ring attivi
    if (n.status === "active") {
      const pulse = Math.abs(Math.sin(pulseRef.current + (raw.index ?? 0) * 0.8));
      ctx.beginPath();
      ctx.arc(x, y, r + 3 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = col + "33";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Glow
    if (n.type !== "leaf" || n.status === "active") {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2);
      g.addColorStop(0, col + "28");
      g.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // Selection ring
    if (isSel) {
      ctx.beginPath();
      ctx.arc(x, y, r + 7, 0, Math.PI * 2);
      ctx.strokeStyle = col + "99";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Drill indicator ring (nodi espandibili)
    if (n.hasChildren && !isSel) {
      ctx.beginPath();
      ctx.arc(x, y, r + 4, 0, Math.PI * 2);
      ctx.strokeStyle = col + "44";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Cerchio principale
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#050a14";
    ctx.fill();
    ctx.strokeStyle = col;
    ctx.lineWidth = isSel ? 2.5 : 1.8;
    ctx.stroke();

    // Progress arc pillar/leaf con %
    if (n.pct !== undefined && n.pct > 0) {
      ctx.beginPath();
      ctx.arc(x, y, r + 3, -Math.PI/2, -Math.PI/2 + (n.pct/100)*Math.PI*2);
      ctx.strokeStyle = col;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    // Status dot
    ctx.beginPath();
    ctx.arc(x + r * 0.68, y - r * 0.68, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = STATUS_HEX[n.status];
    ctx.fill();

    // Drill arrow
    if (n.hasChildren) {
      ctx.font = `${6 / globalScale}px monospace`;
      ctx.fillStyle = col + "cc";
      ctx.textAlign = "center";
      ctx.fillText("▶", x + r * 0.55, y + r * 0.72);
    }

    // ── Label ──────────────────────────────────────────────────
    const text   = n.label.toUpperCase();
    const pctTxt = n.pct !== undefined ? `${n.pct}%` : null;
    const leafOp = n.type === "leaf"
      ? Math.min(1, Math.max(0, (globalScale - 0.45) / 0.4)) : 1;
    if (leafOp <= 0) return;
    ctx.globalAlpha = leafOp;

    const px     = Math.max((n.type === "root" ? 13 : n.type === "pillar" ? 10 : 8) / globalScale, 5);
    const weight = n.type === "leaf" ? "500 " : "700 ";
    ctx.font     = `${weight}${px}px 'JetBrains Mono', monospace`;
    ctx.textAlign = "center";
    const ty     = y + r + 10 / globalScale;
    const m      = ctx.measureText(text);
    const padX   = 4 / globalScale, padY = 2.5 / globalScale;

    // pill bg
    ctx.fillStyle = "rgba(5,10,20,0.85)";
    ctx.beginPath();
    ctx.roundRect(x - m.width/2 - padX, ty - px*0.88 - padY, m.width + padX*2, px*1.15 + padY*2, 3/globalScale);
    ctx.fill();

    ctx.fillStyle = isSel ? col
      : n.type === "root"   ? "#f8fafc"
      : n.type === "pillar" ? col
      : "#cbd5e1";
    ctx.fillText(text, x, ty);

    if (pctTxt && n.type !== "leaf") {
      const px2 = Math.max(7 / globalScale, 4);
      ctx.font  = `600 ${px2}px monospace`;
      ctx.fillStyle = col + "cc";
      ctx.fillText(pctTxt, x, ty + px + 3/globalScale);
    }

    ctx.globalAlpha = 1;
  }, [selected]);

  const linkCanvasObject = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
    const s = link.source, t = link.target;
    if (!isFinite(s?.x) || !isFinite(s?.y) || !isFinite(t?.x) || !isFinite(t?.y)) return;
    const l = link as GLink;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(t.x, t.y);
    ctx.strokeStyle = l.kind === "chain" ? "#f59e0b55" : "#1e293b";
    ctx.lineWidth   = l.kind === "chain" ? 1.5 : 0.7;
    if (l.kind === "chain") ctx.setLineDash([4,4]);
    ctx.stroke();
    ctx.setLineDash([]);
  }, []);

  if (!current) return (
    <div className="flex-1 flex items-center justify-center h-full">
      <span className="text-[9px] font-mono text-slate-600 animate-pulse uppercase tracking-widest">caricamento sistema...</span>
    </div>
  );

  const level = stack.length - 1;
  const activeCount   = current.nodes.filter(n => n.status === "active").length;
  const buildingCount = current.nodes.filter(n => n.status === "building").length;

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "#050a14" }}>

      {/* ── Sidebar ── */}
      <div className="w-44 flex-shrink-0 flex flex-col border-r border-slate-800/60 p-3 gap-3 overflow-y-auto">

        {/* Breadcrumb */}
        <div>
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest mb-1.5">navigazione</div>
          {stack.map((entry, i) => (
            <button key={i} onClick={() => drillBack(i)}
              className="flex items-center gap-1 w-full text-left mb-0.5 group">
              {i > 0 && <ChevronLeft size={8} className="text-slate-700 flex-shrink-0" />}
              <span className="text-[8px] font-mono truncate transition-colors"
                style={{ color: i === level ? entry.color : "#475569", fontWeight: i === level ? 700 : 400 }}>
                {entry.label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-1.5">
          <div className="flex-1 p-2 rounded border border-slate-800 bg-slate-900/40 text-center">
            <div className="text-[7px] font-mono text-slate-600">attivi</div>
            <div className="text-[13px] font-bold font-mono text-emerald-400">{activeCount}</div>
          </div>
          <div className="flex-1 p-2 rounded border border-slate-800 bg-slate-900/40 text-center">
            <div className="text-[7px] font-mono text-slate-600">build</div>
            <div className="text-[13px] font-bold font-mono text-amber-400">{buildingCount}</div>
          </div>
        </div>

        {/* Legenda */}
        <div>
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest mb-1.5">stato</div>
          {(Object.entries(STATUS_HEX) as [NodeStatus,string][]).map(([k,c]) => (
            <div key={k} className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background:c }} />
              <span className="text-[8px] font-mono text-slate-600">{k}</span>
            </div>
          ))}
        </div>

        <div className="text-[7px] font-mono text-slate-700 border-t border-slate-800/60 pt-2 space-y-0.5 mt-auto">
          <div>click nodo ▶ = drill in</div>
          <div>click sidebar = torna</div>
          <div>scroll = zoom</div>
          <div className="flex items-center gap-1">
            <Activity size={7} className="text-emerald-600" />
            <span className="text-slate-800">live · L{level}</span>
          </div>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <ForceGraph2D
          ref={fgRef}
          key={current.nodeId}
          width={dims.w}
          height={dims.h}
          graphData={{ nodes: current.nodes, links: current.links }}
          backgroundColor="#050a14"
          showNavInfo={false}
          nodeCanvasObject={nodeCanvasObject}
          nodeCanvasObjectMode={() => "replace"}
          linkCanvasObject={linkCanvasObject}
          linkCanvasObjectMode={() => "replace"}
          nodeLabel={() => ""}
          d3AlphaDecay={1}
          d3VelocityDecay={1}
          cooldownTicks={0}
          onNodeClick={handleNodeClick}
          onBackgroundClick={() => setSelected(null)}
          nodeVal={(n: any) =>
            (n as GNode).type === "root"   ? 200 :
            (n as GNode).type === "pillar" ? 80  : 20
          }
        />

        {/* Level badge */}
        <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded border border-slate-800/60 bg-slate-950/90">
          <span className="text-[8px] font-mono" style={{ color: stack[level]?.color ?? "#475569" }}>
            L{level} · {stack[level]?.label?.toUpperCase()}
          </span>
        </div>

        {/* Pannello nodo selezionato */}
        {selected && (
          <div className="absolute top-3 right-3 z-10 w-60 rounded-xl border p-3 shadow-2xl"
            style={{ borderColor: nColor(selected)+"40", background:"#030712f0",
                     borderLeftColor:nColor(selected), borderLeftWidth:2 }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[10px] font-bold font-mono text-slate-200">{selected.label.toUpperCase()}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background:STATUS_HEX[selected.status] }} />
                  <span className="text-[8px] font-mono capitalize" style={{ color:STATUS_HEX[selected.status] }}>{selected.status}</span>
                  {selected.pct !== undefined && <span className="text-[7px] font-mono text-slate-600">· {selected.pct}%</span>}
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-slate-400 ml-2 text-[10px]">✕</button>
            </div>
            {selected.pct !== undefined && (
              <div className="h-1 rounded-full bg-slate-800 mb-2 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width:`${selected.pct}%`, background:nColor(selected) }} />
              </div>
            )}
            <div className="text-[8px] font-mono text-slate-500 leading-relaxed break-words">
              {selected.desc.slice(0, 200)}{selected.desc.length > 200 ? "…" : ""}
            </div>
            {selected.hasChildren && (
              <button onClick={() => drillInto(selected)}
                className="mt-2 w-full text-[8px] font-mono py-1 rounded border transition-all"
                style={{ borderColor:nColor(selected)+"60", color:nColor(selected), background:nColor(selected)+"10" }}>
                ▶ ENTRA
              </button>
            )}
          </div>
        )}

        {/* Badge */}
        <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded border border-slate-800/60 bg-slate-950/80 pointer-events-none">
          <span className="text-[7px] font-mono text-slate-700">{current.nodes.length} nodi · L{level}/{2}</span>
        </div>
      </div>
    </div>
  );
}
