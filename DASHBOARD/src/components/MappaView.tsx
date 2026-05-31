// MappaView.tsx | TITANIUM_OS | v5.0 | 2026-05-31
// Cerchi SVG radiali N-livelli — estetica originale, drill controllabile, no force-graph

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Activity } from "lucide-react";

// ── TIPI ─────────────────────────────────────────────────────────────────────
type NodeStatus = "active" | "building" | "pending" | "future";

interface MapNode {
  id: string; label: string; type: "root" | "pillar" | "node" | "leaf";
  status: NodeStatus; pillar: string; desc: string; pct?: number;
  hasChildren?: boolean; children?: MapNode[]; isLeaf?: boolean;
}

// ── PALETTE ───────────────────────────────────────────────────────────────────
const PILLAR_HEX: Record<string, string> = {
  ROOT: "#10b981", V32: "#10b981", GENESIS: "#06b6d4",
  MIMS: "#f59e0b", VITA_NATURA: "#a78bfa", IDENTITY: "#64748b",
};
const STATUS_HEX: Record<NodeStatus, string> = {
  active: "#10b981", building: "#f59e0b", pending: "#818cf8", future: "#334155",
};
function nodeCol(n: MapNode): string {
  if (n.type === "root") return "#10b981";
  return PILLAR_HEX[n.pillar] ?? "#475569";
}
const NODE_ICON: Record<string, string> = {
  OS: "⬡", V32: "🔩", MIMS: "⬡", GENESIS: "⬡", VITA_NATURA: "🌿", IDENTITY: "🧭",
};

// ── DATI SISTEMA ──────────────────────────────────────────────────────────────
const ROOT_NODE: MapNode = {
  id: "OS", label: "TITANIUM OS", type: "root", status: "active",
  pillar: "ROOT", desc: "Sistema operativo cognitivo di Matteo Benenati. V32+MIMS+GENESIS+VITA NATURA+IDENTITY.", pct: 60,
};

const SYSTEM_TREE: MapNode[] = [
  {
    id: "V32", label: "V32 CNC", type: "pillar", status: "active", pillar: "V32",
    desc: "Fresatrice 3 assi · 178kg corpo unico · ±0.019mm · Config G 65%", pct: 65, hasChildren: true,
    children: [
      { id:"v32-struttura", label:"STRUTTURA",   type:"leaf", status:"active",   pillar:"V32", pct:65, desc:"Telaio 40×40×3 S235 · colonne 60×60 · gusset 200mm Config G · diagonali · tiranti M10", isLeaf:true },
      { id:"v32-assi",      label:"ASSI X/Y/Z",  type:"leaf", status:"building", pillar:"V32", pct:55, desc:"Asse X: guide LM20 + SFU1605 + servo 400W · Y/Z in montaggio · target ±0.019mm IT6-IT7", isLeaf:true },
      { id:"v32-mandrino",  label:"MANDRINO",    type:"leaf", status:"pending",  pillar:"V32", pct:0,  desc:"2.2kW ER20 — BLOCKER da ordinare. Prerequisito: fresatura stampi MIMS.", isLeaf:true },
      { id:"v32-elettr",    label:"ELETTRONICA", type:"leaf", status:"building", pillar:"V32", pct:50, desc:"HMI TP900 Comfort · CNC controller · driver stepper · cablaggio pannello", isLeaf:true },
      { id:"v32-config",    label:"CONFIG G",    type:"leaf", status:"active",   pillar:"V32", pct:65, desc:"Milestone attivo: rinforzi colonne Z+U · epoxy fill · silent blocks v.A/v.B", isLeaf:true },
    ],
  },
  {
    id: "MIMS", label: "MIMS", type: "pillar", status: "active", pillar: "MIMS",
    desc: "Micro-Industry Modular System · DNA 29.9mm · 3 giunti · 7 materiali · TAM €4.2B", pct: 30, hasChildren: true,
    children: [
      { id:"mims-tile",   label:"DNA TILE",    type:"leaf", status:"active",  pillar:"MIMS", pct:100, desc:"190×190mm · D29.9mm H7/g6 · foro Ø16mm · retrocompatibilità totale · piastrina 40mm", isLeaf:true },
      { id:"mims-giunti", label:"3 GIUNTI",   type:"leaf", status:"active",  pillar:"MIMS", pct:80,  desc:"Eco-Snap €1.50 · Quick-Twist €4 · Tech-Bolt €7 (42CrMo4 nitrurato)", isLeaf:true },
      { id:"mims-mat",    label:"7 MATERIALI", type:"leaf", status:"active",  pillar:"MIMS", pct:40,  desc:"STD/HVY/DMP/ECO/FLR/ACS/MET · stesso stampo · DNA invariante", isLeaf:true },
      { id:"mims-vulcan", label:"VULCAN VCM",  type:"leaf", status:"pending", pillar:"MIMS", pct:15,  desc:"Pressa 4 colonne 15-20t · Edwards RV3 + ROPEX ±0.5°C · VCM 18-step · attende V32", isLeaf:true },
      { id:"mims-ip",     label:"IP",          type:"leaf", status:"active",  pillar:"MIMS", pct:50,  desc:"B2 URGENTE dopo 100 pezzi · 6 trade secrets · 4 marchi EU", isLeaf:true },
      { id:"mims-gtm",    label:"GTM",         type:"leaf", status:"active",  pillar:"MIMS", pct:30,  desc:"TAM €4.2B · SAM €180M · SOM Y3 €300-450K · SEED Q2-Q4 2026", isLeaf:true },
    ],
  },
  {
    id: "GENESIS", label: "GENESIS", type: "pillar", status: "active", pillar: "GENESIS",
    desc: "OS digitale · API Flask · Dashboard React · RAG v4.0 · MCP 5 tool · n8n", pct: 83, hasChildren: true,
    children: [
      {
        id:"gen-infra", label:"INFRA", type:"node", status:"active", pillar:"GENESIS", pct:90,
        desc:"API Flask 5001 · Dashboard React 5173 · MCP Server 5 tool · n8n 5678 · Git/GitHub",
        hasChildren:true,
        children: [
          { id:"gi-api",  label:"API SERVER", type:"leaf", status:"active", pillar:"GENESIS", desc:"/api/state · /api/rag/* · /api/brief · /api/scan · Flask Python 3.11", isLeaf:true },
          { id:"gi-dash", label:"DASHBOARD",  type:"leaf", status:"active", pillar:"GENESIS", desc:"React 18 + Vite + TypeScript + Tailwind · TanStack Query · Zustand store", isLeaf:true },
          { id:"gi-mcp",  label:"MCP SERVER", type:"leaf", status:"active", pillar:"GENESIS", desc:"5 tool: get_state · update_milestone · search_mente · update_session · run_script", isLeaf:true },
          { id:"gi-n8n",  label:"N8N",        type:"leaf", status:"active", pillar:"GENESIS", desc:"13 workflow attivi + 14 pipeline · porta 5678 · orchestratore eventi locali", isLeaf:true },
        ],
      },
      {
        id:"gen-intel", label:"INTELLIGENZA", type:"node", status:"active", pillar:"GENESIS", pct:70,
        desc:"RAG v4.0 hybrid BM25+semantic+CrossEncoder · 7 agenti pianificati · Daily Brief",
        hasChildren:true,
        children: [
          { id:"gi-rag",   label:"MENTE RAG",  type:"leaf", status:"active",  pillar:"GENESIS", desc:"ChromaDB + BM25 + CrossEncoder + RRF k=60 · multilingual 384-dim · chunk 512/200", isLeaf:true },
          { id:"gi-themis",label:"THEMIS",      type:"leaf", status:"active",  pillar:"GENESIS", desc:"Claude Sonnet · codice + analisi · MCP tools · sessioni continue", isLeaf:true },
          { id:"gi-eva",   label:"EVA",         type:"leaf", status:"pending", pillar:"GENESIS", desc:"WhatsApp bot Maria · prenotazioni Vita Natura · n8n workflow · PENDING", isLeaf:true },
          { id:"gi-brief", label:"DAILY BRIEF", type:"leaf", status:"active",  pillar:"GENESIS", desc:"Script Python → DATA/daily_brief_last.md · STATE + RAG + meteo", isLeaf:true },
        ],
      },
      { id:"gen-auto",    label:"AUTOMAZIONI", type:"leaf", status:"active",  pillar:"GENESIS", pct:80,  desc:"Stop hooks · MENTE scanner/watcher · Content pipeline · rag-update auto", isLeaf:true },
      { id:"gen-security",label:"SICUREZZA",   type:"leaf", status:"active",  pillar:"GENESIS", pct:100, desc:"_VAULT/KEYS · AES-256 backup · .gitignore sanitizer · Path.home() ovunque", isLeaf:true },
      { id:"gen-data",    label:"DATI",         type:"leaf", status:"active",  pillar:"GENESIS", pct:90,  desc:"STATE.json · MENTE/ · rag_vectors_cache · semantic_index.db · daily_brief", isLeaf:true },
    ],
  },
  {
    id: "VITA_NATURA", label: "VITA NATURA", type: "pillar", status: "active", pillar: "VITA_NATURA",
    desc: "Centro estetico Maria · Boffalora s/T (MI) · EVA WhatsApp bot · Google integrations", pct: 40, hasChildren: true,
    children: [
      { id:"vn-eva",      label:"EVA BOT",  type:"leaf", status:"building", pillar:"VITA_NATURA", pct:40,  desc:"n8n workflow · WhatsApp Business API · risposte automatiche · Maria Rule", isLeaf:true },
      { id:"vn-calendar", label:"CALENDAR", type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Google Calendar MCP · legge/crea eventi · integrato in Claude Code", isLeaf:true },
      { id:"vn-gmail",    label:"GMAIL",    type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Gmail MCP · search, draft, labels · benenatimatteo.mb@gmail.com live", isLeaf:true },
      { id:"vn-sito",     label:"SITO WEB", type:"leaf", status:"pending",  pillar:"VITA_NATURA", pct:20,  desc:"Sito centro estetico · prenotazioni online · SEO locale · in sviluppo", isLeaf:true },
    ],
  },
  {
    id: "IDENTITY", label: "IDENTITY", type: "pillar", status: "active", pillar: "IDENTITY",
    desc: "Brand personale · artigiano digitale + system builder · 15+ anni industria", pct: 50, hasChildren: true,
    children: [
      { id:"id-skills",  label:"SKILL TREE", type:"leaf", status:"active",   pillar:"IDENTITY", pct:60, desc:"N-livelli: Fondamenta (done) → V32 (active) → GENESIS → MIMS → Content → ADHD", isLeaf:true },
      { id:"id-cv",      label:"CV LAYERS",  type:"leaf", status:"active",   pillar:"IDENTITY", pct:80, desc:"SCProject MotoGP → ESSEGI robot → DATWLER presse → LU.VE QC · proof reali", isLeaf:true },
      { id:"id-github",  label:"GITHUB",     type:"leaf", status:"building", pillar:"IDENTITY", pct:45, desc:"Profilo Microindustry · repo TITANIUM_OS · release history · AI skills", isLeaf:true },
      { id:"id-content", label:"CONTENT",    type:"leaf", status:"pending",  pillar:"IDENTITY", pct:10, desc:"Podcast + reel + LinkedIn · AVA avatar YouTube · storytelling industriale", isLeaf:true },
      { id:"id-pitch",   label:"PITCH",      type:"leaf", status:"active",   pillar:"IDENTITY", pct:40, desc:"Partner software Microindustry go-to-market · Matteo = metodo+IP, partner = scala", isLeaf:true },
    ],
  },
];

// ── SVG NODO CENTRALE ─────────────────────────────────────────────────────────
function CenterNode({ node, cx, cy, r, isBack, onClick }: {
  node: MapNode; cx: number; cy: number; r: number; isBack: boolean; onClick: () => void;
}) {
  const col  = nodeCol(node);
  const pct  = node.pct ?? 0;
  const circ = 2 * Math.PI * (r + 8);
  const dash = (pct / 100) * circ;

  return (
    <g onClick={isBack ? onClick : undefined} style={{ cursor: isBack ? "pointer" : "default" }}>
      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={r * 2.2} fill={col + "08"} />
      <circle cx={cx} cy={cy} r={r * 1.5} fill={col + "12"} />
      {/* Pulse ring */}
      <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke={col} strokeWidth={1}
        className="mappa-pulse" style={{ animationDuration: "3s" }} />
      {/* Progress arc */}
      {pct > 0 && (
        <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke={col} strokeWidth={3.5}
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="round" opacity={0.9} />
      )}
      {/* Back dashed ring */}
      {isBack && (
        <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke={col + "55"}
          strokeWidth={1.5} strokeDasharray="5 5" />
      )}
      {/* Main circle */}
      <circle cx={cx} cy={cy} r={r} fill="#050a14" stroke={col} strokeWidth={2.5} />
      {/* Icon */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize={18}>{NODE_ICON[node.id] ?? "⬡"}</text>
      {/* Label */}
      <text x={cx} y={cy + 10} textAnchor="middle" fill={col}
        fontSize={9} fontFamily="JetBrains Mono, monospace" fontWeight={700}
        letterSpacing={1}>
        {node.label.slice(0, 12).toUpperCase()}
      </text>
      {pct > 0 && (
        <text x={cx} y={cy + 22} textAnchor="middle" fill={col + "99"}
          fontSize={7} fontFamily="monospace">{pct}%</text>
      )}
      {isBack && (
        <text x={cx} y={cy - r - 10} textAnchor="middle" fill={col + "77"}
          fontSize={7} fontFamily="monospace">← torna</text>
      )}
    </g>
  );
}

// ── SVG NODO FIGLIO ───────────────────────────────────────────────────────────
function ChildNode({ node, cx, cy, r, isSelected, onClick }: {
  node: MapNode; cx: number; cy: number; r: number; isSelected: boolean; onClick: () => void;
}) {
  const col        = nodeCol(node);
  const statusCol  = STATUS_HEX[node.status];
  const pct        = node.pct ?? 0;
  const circ       = 2 * Math.PI * (r + 6);
  const dash       = (pct / 100) * circ;
  const canDrill   = !!(node.hasChildren && node.children?.length);
  const labelTrunc = node.label.slice(0, 11).toUpperCase();
  const labelW     = Math.max(labelTrunc.length * 5.2 + 10, 50);

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      {/* Glow */}
      <circle cx={cx} cy={cy} r={r * 2} fill={col + "0a"} />
      {/* Active pulse */}
      {(node.status === "active" || node.status === "building") && (
        <circle cx={cx} cy={cy} r={r + 12} fill="none" stroke={col} strokeWidth={1}
          className="mappa-pulse"
          style={{ animationDuration: node.status === "active" ? "2.4s" : "3.2s", animationDelay: `${Math.random() * 0.8}s` }} />
      )}
      {/* Selection ring */}
      {isSelected && (
        <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke={col} strokeWidth={2} opacity={0.8} />
      )}
      {/* Drill dashed ring */}
      {canDrill && !isSelected && (
        <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke={col + "55"}
          strokeWidth={1} strokeDasharray="3 3" />
      )}
      {/* Progress arc */}
      {pct > 0 && (
        <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke={col} strokeWidth={2.5}
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="round" opacity={0.85} />
      )}
      {/* Main circle */}
      <circle cx={cx} cy={cy} r={r} fill="#050a14" stroke={col}
        strokeWidth={isSelected ? 2.5 : 1.8} />
      {/* Status dot */}
      <circle cx={cx + r * 0.68} cy={cy - r * 0.68} r={3} fill={statusCol} />
      {/* Drill arrow */}
      {canDrill && (
        <text x={cx + r * 0.35} y={cy + r * 0.6}
          textAnchor="middle" fill={col + "cc"} fontSize={6} fontFamily="monospace">▶</text>
      )}
      {/* Label pill */}
      <rect x={cx - labelW/2} y={cy + r + 4} width={labelW} height={12} rx={3} fill="rgba(5,10,20,0.90)" />
      <text x={cx} y={cy + r + 13} textAnchor="middle"
        fill={isSelected ? col : node.type === "pillar" ? col : "#94a3b8"}
        fontSize={7} fontFamily="JetBrains Mono, monospace" fontWeight={700}>
        {labelTrunc}
      </text>
      {pct > 0 && (
        <text x={cx} y={cy + r + 24} textAnchor="middle"
          fill={col + "88"} fontSize={6} fontFamily="monospace">{pct}%</text>
      )}
    </g>
  );
}

// ── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({ node, onClose, onDrill }: {
  node: MapNode; onClose: () => void; onDrill?: () => void;
}) {
  const col = nodeCol(node);
  return (
    <div className="absolute bottom-4 left-4 z-20 w-64 rounded-xl border p-3 shadow-2xl"
      style={{ borderColor: col + "44", background: "#030712f2", borderLeftColor: col, borderLeftWidth: 2 }}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-[10px] font-bold font-mono text-slate-200">{node.label.toUpperCase()}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_HEX[node.status] }} />
            <span className="text-[8px] font-mono" style={{ color: STATUS_HEX[node.status] }}>{node.status}</span>
            {node.pct !== undefined && <span className="text-[7px] font-mono text-slate-600">· {node.pct}%</span>}
          </div>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 text-[10px] ml-2">✕</button>
      </div>
      {node.pct !== undefined && (
        <div className="h-1 rounded-full bg-slate-800 mb-2 overflow-hidden">
          <div className="h-full rounded-full" style={{ width:`${node.pct}%`, background: col }} />
        </div>
      )}
      <div className="text-[8px] font-mono text-slate-500 leading-relaxed break-words">
        {node.desc.slice(0, 220)}{node.desc.length > 220 ? "…" : ""}
      </div>
      {onDrill && (
        <button onClick={onDrill}
          className="mt-2 w-full text-[8px] font-mono py-1 rounded border transition-all"
          style={{ borderColor: col + "60", color: col, background: col + "10" }}>
          ▶ DRILL IN
        </button>
      )}
    </div>
  );
}

// ── COMPONENTE PRINCIPALE ─────────────────────────────────────────────────────
export function MappaView({ systemState }: { systemState: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims]     = useState({ w: 800, h: 600 });
  const [stack, setStack]   = useState<MapNode[]>([]);
  const [selected, setSelected] = useState<MapNode | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      if (r.width > 20) setDims({ w: r.width, h: r.height });
    });
    ro.observe(el);
    setDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const drillIn = (node: MapNode) => { setSelected(null); setStack(s => [...s, node]); };
  const goBack  = () => { setSelected(null); setStack(s => s.slice(0, -1)); };
  const goTo    = (idx: number) => { setSelected(null); setStack(s => s.slice(0, idx + 1)); };

  const level      = stack.length;
  const current    = stack[level - 1] ?? null;
  const centerNode = current ?? ROOT_NODE;

  // Aggiorna pct dai dati live
  const pillars = systemState?.pillars ?? {};
  const rawChildren = current?.children ?? SYSTEM_TREE;
  const children = rawChildren.map(n => {
    const p = pillars[n.id];
    return p ? { ...n, pct: p.pct_complete ?? n.pct } : n;
  });

  // Layout radiale
  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const count   = children.length;
  const R       = count <= 3 ? 155 : count <= 5 ? 175 : count <= 7 ? 200 : 220;
  const childR  = count <= 3 ? 38  : count <= 5 ? 33  : count <= 7 ? 27  : 22;
  const centerR = 55;

  const positions = children.map((_, i) => {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  });

  // Stats
  const activeCount   = children.filter(n => n.status === "active").length;
  const buildingCount = children.filter(n => n.status === "building").length;

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "#050a14" }}>
      <style>{`
        @keyframes mappa-pulse-ring {
          0%, 100% { opacity: 0.07; }
          50%       { opacity: 0.38; }
        }
        .mappa-pulse { animation: mappa-pulse-ring 2.8s ease-in-out infinite; }
      `}</style>

      {/* ── Sidebar ── */}
      <div className="w-32 flex-shrink-0 flex flex-col border-r border-slate-800/60 p-2.5 gap-3 overflow-y-auto">
        {/* Breadcrumb */}
        <div>
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest mb-1.5">livello</div>
          <button onClick={() => { setStack([]); setSelected(null); }}
            className="flex items-center gap-1 w-full text-left mb-0.5">
            <span className={`text-[8px] font-mono truncate transition-colors ${level === 0 ? "text-emerald-400 font-bold" : "text-slate-600 hover:text-slate-400"}`}>
              🧭 sistema
            </span>
          </button>
          {stack.map((node, i) => {
            const col = nodeCol(node);
            return (
              <button key={node.id} onClick={() => goTo(i + 1)}
                className="flex items-center gap-1 w-full text-left mb-0.5">
                <ChevronLeft size={7} className="text-slate-700 flex-shrink-0" />
                <span className="text-[8px] font-mono truncate transition-colors"
                  style={{ color: i === level - 1 ? col : "#475569", fontWeight: i === level - 1 ? 700 : 400 }}>
                  {node.label.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex gap-1">
          <div className="flex-1 p-1.5 rounded border border-slate-800 bg-slate-900/40 text-center">
            <div className="text-[6px] font-mono text-slate-600">attivi</div>
            <div className="text-[12px] font-bold font-mono text-emerald-400">{activeCount}</div>
          </div>
          <div className="flex-1 p-1.5 rounded border border-slate-800 bg-slate-900/40 text-center">
            <div className="text-[6px] font-mono text-slate-600">build</div>
            <div className="text-[12px] font-bold font-mono text-amber-400">{buildingCount}</div>
          </div>
        </div>

        {/* Legenda */}
        <div>
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest mb-1.5">stato</div>
          {(Object.entries(STATUS_HEX) as [NodeStatus, string][]).map(([k, c]) => (
            <div key={k} className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c }} />
              <span className="text-[7px] font-mono text-slate-600">{k}</span>
            </div>
          ))}
        </div>

        {/* Help */}
        <div className="text-[7px] font-mono text-slate-800 border-t border-slate-800/60 pt-2 space-y-0.5 mt-auto">
          <div>▶ cerchio = drill in</div>
          <div>● foglia = dettaglio</div>
          <div>centro = torna su</div>
          <div className="flex items-center gap-1 mt-1">
            <Activity size={7} className="text-emerald-700" />
            <span>L{level} · {count} nodi</span>
          </div>
        </div>
      </div>

      {/* ── SVG Area ── */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <svg key={`${level}-${centerNode.id}`} width={dims.w} height={dims.h}>
          <defs>
            <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={nodeCol(centerNode)} stopOpacity="0.04" />
              <stop offset="100%" stopColor="#050a14" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background glow */}
          <ellipse cx={cx} cy={cy} rx={dims.w * 0.4} ry={dims.h * 0.4} fill="url(#bg-glow)" />

          {/* Ring guide */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#1e293b88" strokeWidth={0.5} strokeDasharray="4 8" />

          {/* Connection lines */}
          {positions.map((pos, i) => (
            <line key={i}
              x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              stroke={nodeCol(children[i]) + "22"} strokeWidth={1} />
          ))}

          {/* Center node */}
          <CenterNode
            node={centerNode} cx={cx} cy={cy} r={centerR}
            isBack={level > 0} onClick={goBack}
          />

          {/* Child nodes */}
          {children.map((node, i) => (
            <ChildNode
              key={node.id}
              node={node}
              cx={positions[i].x}
              cy={positions[i].y}
              r={childR}
              isSelected={selected?.id === node.id}
              onClick={() => {
                if (node.hasChildren && node.children?.length) drillIn(node);
                else setSelected(s => s?.id === node.id ? null : node);
              }}
            />
          ))}
        </svg>

        {/* Level watermark */}
        {level > 0 && (
          <div className="absolute pointer-events-none select-none font-mono font-black"
            style={{
              fontSize: 140, lineHeight: 1,
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              color: nodeCol(centerNode) + "06",
              zIndex: 0,
            }}>
            L{level}
          </div>
        )}

        {/* Detail panel */}
        {selected && (
          <DetailPanel
            node={selected}
            onClose={() => setSelected(null)}
            onDrill={selected.hasChildren && selected.children?.length ? () => drillIn(selected) : undefined}
          />
        )}

        {/* Badge */}
        <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded border border-slate-800/60 bg-slate-950/80 pointer-events-none">
          <span className="text-[7px] font-mono" style={{ color: nodeCol(centerNode) }}>
            L{level} · {centerNode.label.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
