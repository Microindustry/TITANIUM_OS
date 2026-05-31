// MappaView.tsx | TITANIUM_OS | v4.0 | 2026-05-31
// Topologia N-livelli tile — stesso pattern navStack di GenesisSection/MimsSection

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Zap, Lock, Circle, AlertCircle } from "lucide-react";

// ── TIPI ─────────────────────────────────────────────────────────────────────
type NodeStatus = "active" | "building" | "pending" | "future";

interface MapNode {
  id: string;
  label: string;
  type: "root" | "pillar" | "node" | "leaf";
  status: NodeStatus;
  pillar: string;
  desc: string;
  pct?: number;
  hasChildren?: boolean;
  children?: MapNode[];
  isLeaf?: boolean;
}

// ── PALETTE ───────────────────────────────────────────────────────────────────
const PILLAR_COLOR: Record<string, { color: string; border: string; bg: string; dot: string; bar: string }> = {
  ROOT:        { color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-950/20", dot: "bg-emerald-400", bar: "bg-emerald-400" },
  V32:         { color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-950/20", dot: "bg-emerald-400", bar: "bg-emerald-400" },
  GENESIS:     { color: "text-cyan-400",    border: "border-cyan-500/40",    bg: "bg-cyan-950/20",    dot: "bg-cyan-400",    bar: "bg-cyan-400"    },
  MIMS:        { color: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-950/20",   dot: "bg-amber-400",   bar: "bg-amber-400"   },
  VITA_NATURA: { color: "text-violet-400",  border: "border-violet-500/40",  bg: "bg-violet-950/20",  dot: "bg-violet-400",  bar: "bg-violet-400"  },
  IDENTITY:    { color: "text-slate-400",   border: "border-slate-600/40",   bg: "bg-slate-800/20",   dot: "bg-slate-400",   bar: "bg-slate-400"   },
};
const STATUS_TILE: Record<NodeStatus, { tile: string; glow: string; dot: string; icon: typeof Zap }> = {
  active:   { tile: "bg-emerald-900/60 border-emerald-500/50 text-emerald-100", glow: "0 0 20px #10b98140", dot: "bg-emerald-400", icon: Zap          },
  building: { tile: "bg-amber-900/60   border-amber-400/50   text-amber-100",   glow: "0 0 20px #f59e0b40", dot: "bg-amber-400",   icon: Zap          },
  pending:  { tile: "bg-slate-800/60   border-slate-600/40   text-slate-400",   glow: "none",               dot: "bg-slate-500",   icon: Circle       },
  future:   { tile: "bg-slate-900/30   border-slate-800/20   text-slate-600",   glow: "none",               dot: "bg-slate-800",   icon: Lock         },
};

function pillarCfg(pillar: string) {
  return PILLAR_COLOR[pillar] ?? PILLAR_COLOR.ROOT;
}

// ── DATI STATICI ─────────────────────────────────────────────────────────────
const SYSTEM_TREE: Omit<MapNode, "isLeaf">[] = [
  {
    id: "V32", label: "V32 CNC", type: "pillar", status: "active", pillar: "V32",
    desc: "Fresatrice 3 assi · 178kg corpo unico · ±0.019mm · Config G 65%", pct: 65, hasChildren: true,
    children: [
      { id:"v32-struttura", label:"STRUTTURA",   type:"leaf", status:"active",   pillar:"V32", pct:65, desc:"Telaio 40×40×3 S235 · colonne 60×60 · gusset 200mm Config G · diagonali · tiranti M10", isLeaf:true },
      { id:"v32-assi",      label:"ASSI X/Y/Z",  type:"leaf", status:"building", pillar:"V32", pct:55, desc:"Asse X: guide LM20 + SFU1605 + servo 400W · Y/Z in montaggio · target ±0.019mm IT6-IT7", isLeaf:true },
      { id:"v32-mandrino",  label:"MANDRINO",    type:"leaf", status:"pending",  pillar:"V32", pct:0,  desc:"2.2kW ER20 — BLOCKER da ordinare. Prerequisito: fresatura stampi MIMS.", isLeaf:true },
      { id:"v32-elettr",    label:"ELETTRONICA", type:"leaf", status:"building", pillar:"V32", pct:50, desc:"HMI TP900 Comfort · CNC controller · driver stepper · cablaggio pannello", isLeaf:true },
      { id:"v32-vulcan",    label:"→ VULCAN",    type:"leaf", status:"pending",  pillar:"V32", pct:0,  desc:"Output: V32 produce stampi 7075 → VULCAN pressa VCM → MIMS tile. Catena produttiva.", isLeaf:true },
    ],
  },
  {
    id: "MIMS", label: "MIMS", type: "pillar", status: "active", pillar: "MIMS",
    desc: "Micro-Industry Modular System · DNA 29.9mm · 3 giunti · 7 materiali · Lego pesante", pct: 30, hasChildren: true,
    children: [
      { id:"mims-tile",    label:"DNA TILE",    type:"leaf", status:"active",   pillar:"MIMS", pct:100, desc:"190×190mm · D29.9mm H7/g6 · foro Ø16mm · retrocompatibilità totale · piastrina 40mm", isLeaf:true },
      { id:"mims-giunti",  label:"3 GIUNTI",   type:"leaf", status:"active",   pillar:"MIMS", pct:80,  desc:"Eco-Snap €1.50 (0 utensili) · Quick-Twist €4 · Tech-Bolt €7 (42CrMo4 nitrurato)", isLeaf:true },
      { id:"mims-mat",     label:"7 MATERIALI", type:"leaf", status:"active",   pillar:"MIMS", pct:40,  desc:"STD/HVY/DMP/ECO/FLR/ACS/MET · stesso stampo · DNA invariante · BOM completo", isLeaf:true },
      { id:"mims-vulcan",  label:"VULCAN VCM",  type:"leaf", status:"pending",  pillar:"MIMS", pct:15,  desc:"Pressa 4 colonne 15-20t · Edwards RV3 + ROPEX ±0.5°C · VCM 18-step · attende V32", isLeaf:true },
      { id:"mims-ip",      label:"IP",          type:"leaf", status:"active",   pillar:"MIMS", pct:50,  desc:"B2 URGENTE dopo 100 pezzi · 6 trade secrets (Coca-Cola analogy) · 4 marchi EU", isLeaf:true },
      { id:"mims-gtm",     label:"GTM",         type:"leaf", status:"active",   pillar:"MIMS", pct:30,  desc:"TAM €4.2B · SAM €180M · SOM Y3 €300-450K · SEED Q2-Q4 2026 · 500 sub YT", isLeaf:true },
    ],
  },
  {
    id: "GENESIS", label: "GENESIS OS", type: "pillar", status: "active", pillar: "GENESIS",
    desc: "OS digitale · infrastruttura · RAG v4.0 · 5 nodi attivi · n8n + MCP + Flask", pct: 83, hasChildren: true,
    children: [
      {
        id:"gen-infra", label:"INFRASTRUTTURA", type:"node", status:"active", pillar:"GENESIS", pct:90, desc:"API Flask 5001 · Dashboard React 5173 · MCP Server 5 tool · n8n 5678 · Git/GitHub", hasChildren:true, isLeaf:false,
        children: [
          { id:"gi-api",  label:"API SERVER", type:"leaf", status:"active", pillar:"GENESIS", desc:"/api/state · /api/rag/* · /api/brief · /api/scan · Flask Python 3.11", isLeaf:true },
          { id:"gi-dash", label:"DASHBOARD",  type:"leaf", status:"active", pillar:"GENESIS", desc:"React 18 + Vite + TypeScript + Tailwind · TanStack Query · Zustand store", isLeaf:true },
          { id:"gi-mcp",  label:"MCP SERVER", type:"leaf", status:"active", pillar:"GENESIS", desc:"5 tool: get_state · update_milestone · search_mente · update_session · run_script", isLeaf:true },
          { id:"gi-n8n",  label:"N8N",        type:"leaf", status:"active", pillar:"GENESIS", desc:"13 workflow attivi + 14 pipeline · porta 5678 · orchestratore eventi locali", isLeaf:true },
        ],
      },
      {
        id:"gen-intel", label:"INTELLIGENZA", type:"node", status:"active", pillar:"GENESIS", pct:70, desc:"RAG v4.0 hybrid BM25+semantic+CrossEncoder · 7 agenti pianificati · Daily Brief", hasChildren:true, isLeaf:false,
        children: [
          { id:"gi-rag",   label:"MENTE RAG v4.0", type:"leaf", status:"active",  pillar:"GENESIS", desc:"ChromaDB + BM25 + CrossEncoder + RRF k=60 · multilingual 384-dim · chunk 512/200", isLeaf:true },
          { id:"gi-themis",label:"THEMIS",          type:"leaf", status:"active",  pillar:"GENESIS", desc:"Claude Sonnet · codice + analisi V32/GENESIS · MCP tools · sessioni continue", isLeaf:true },
          { id:"gi-eva",   label:"EVA",             type:"leaf", status:"pending", pillar:"GENESIS", desc:"WhatsApp bot Maria · prenotazioni Vita Natura · n8n workflow · PENDING", isLeaf:true },
          { id:"gi-brief", label:"DAILY BRIEF",     type:"leaf", status:"active",  pillar:"GENESIS", desc:"Script Python → DATA/daily_brief_last.md · aggrega STATE + RAG + meteo", isLeaf:true },
        ],
      },
      { id:"gen-auto",    label:"AUTOMAZIONI", type:"leaf", status:"active",  pillar:"GENESIS", pct:80, desc:"Stop hooks (pre/post tool) · MENTE scanner/watcher · Content pipeline · rag-update", isLeaf:true },
      { id:"gen-security",label:"SICUREZZA",   type:"leaf", status:"active",  pillar:"GENESIS", pct:100, desc:"_VAULT/KEYS · AES-256 backup deep_freeze.py · .gitignore sanitizer · Path.home()", isLeaf:true },
    ],
  },
  {
    id: "VITA_NATURA", label: "VITA NATURA", type: "pillar", status: "active", pillar: "VITA_NATURA",
    desc: "Centro estetico Maria · Boffalora s/T (MI) · EVA WhatsApp bot · Google integrations", pct: 40, hasChildren: true,
    children: [
      { id:"vn-eva",      label:"EVA BOT",   type:"leaf", status:"building", pillar:"VITA_NATURA", pct:40, desc:"n8n workflow · WhatsApp Business API · risposte automatiche · Maria Rule zero-click", isLeaf:true },
      { id:"vn-calendar", label:"CALENDAR",  type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Google Calendar MCP · legge/crea eventi · integrato in Claude Code sessioni", isLeaf:true },
      { id:"vn-gmail",    label:"GMAIL",     type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Gmail MCP · search, draft, labels · benenatimatteo.mb@gmail.com live", isLeaf:true },
      { id:"vn-sito",     label:"SITO WEB",  type:"leaf", status:"pending",  pillar:"VITA_NATURA", pct:20, desc:"Sito centro estetico · prenotazioni online · SEO locale · in sviluppo", isLeaf:true },
    ],
  },
  {
    id: "IDENTITY", label: "IDENTITY", type: "pillar", status: "active", pillar: "IDENTITY",
    desc: "Brand personale · artigiano digitale + system builder · 15+ anni industria", pct: 50, hasChildren: true,
    children: [
      { id:"id-skills",  label:"SKILL TREE", type:"leaf", status:"active",   pillar:"IDENTITY", pct:60, desc:"N-livelli: Fondamenta (done) → V32 (active) → GENESIS → MIMS → Content → ADHD tools", isLeaf:true },
      { id:"id-cv",      label:"CV LAYERS",  type:"leaf", status:"active",   pillar:"IDENTITY", pct:80, desc:"SCProject MotoGP → ESSEGI robot → DATWLER presse → LU.VE QC · proof reali", isLeaf:true },
      { id:"id-github",  label:"GITHUB",     type:"leaf", status:"building", pillar:"IDENTITY", pct:45, desc:"Profilo Microindustry · repo TITANIUM_OS · release history · AI skills", isLeaf:true },
      { id:"id-content", label:"CONTENT",    type:"leaf", status:"pending",  pillar:"IDENTITY", pct:10, desc:"Podcast + reel + LinkedIn · AVA avatar YouTube · storytelling industriale", isLeaf:true },
      { id:"id-pitch",   label:"PITCH",      type:"leaf", status:"active",   pillar:"IDENTITY", pct:40, desc:"Partner software Microindustry go-to-market · Matteo = metodo+IP, partner = scala", isLeaf:true },
    ],
  },
];

// ── STATUS STYLES TILE ────────────────────────────────────────────────────────
function NodeTile({ node, onClick, size = "md" }: {
  node: MapNode; onClick?: () => void; size?: "sm" | "md" | "lg";
}) {
  const [open, setOpen] = useState(false);
  const st  = STATUS_TILE[node.status];
  const cfg = pillarCfg(node.pillar);
  const hasChildren = !!(node.hasChildren && node.children?.length);
  const isClickable  = hasChildren && !!onClick;

  const padding  = size === "lg" ? "p-5" : size === "sm" ? "p-2" : "p-3.5";
  const iconSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-2xl";
  const labelSz  = size === "lg" ? "text-[11px]" : size === "sm" ? "text-[9px]" : "text-[10px]";

  const statusIcon = node.status === "active" || node.status === "building"
    ? (node.status === "active" ? "⚡" : "⚙") : node.status === "pending" ? "○" : "◌";

  const childCount = node.children?.length ?? 0;
  const doneSub = node.children?.filter(c => c.status === "active" || c.isLeaf).length ?? 0;

  return (
    <button
      onClick={() => { if (isClickable) onClick?.(); else if (node.isLeaf) setOpen(o => !o); }}
      className={`rounded-xl border text-left transition-all duration-200 w-full ${st.tile} ${padding} ${
        isClickable || node.isLeaf
          ? "hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] cursor-pointer"
          : "cursor-default opacity-40"
      }`}
      style={{ boxShadow: st.glow }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={iconSize}>{statusIcon}</span>
        <div className="flex items-center gap-1.5">
          {(node.status === "active" || node.status === "building") && (
            <div className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse`} />
          )}
          {isClickable && <ChevronRight size={10} className="text-slate-500 opacity-60" />}
        </div>
      </div>
      <div className={`${labelSz} font-mono font-bold uppercase tracking-wide leading-tight mb-1`}>
        {node.label}
      </div>

      {/* Foglia: nota espandibile */}
      {node.isLeaf && node.desc && open && (
        <p className="text-[8px] text-slate-400 mt-2 pt-2 border-t border-white/5 leading-relaxed">
          {node.desc}
        </p>
      )}

      {/* Categoria: progress */}
      {!node.isLeaf && childCount > 0 && (
        <>
          <div className="text-[8px] font-mono text-slate-600 mb-1.5">{doneSub}/{childCount}</div>
          <div className="h-1 bg-black/30 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${cfg.bar}`}
                 style={{ width: `${node.pct ?? Math.round((doneSub/childCount)*100)}%` }} />
          </div>
          <div className="text-[8px] font-mono text-right mt-1 opacity-60">
            {node.pct ?? Math.round((doneSub/childCount)*100)}%
          </div>
        </>
      )}

      {/* Foglia: status dot */}
      {node.isLeaf && (
        <div className="flex items-center justify-between mt-1">
          {node.pct !== undefined && (
            <div className="text-[7px] font-mono text-slate-600">{node.pct}%</div>
          )}
          <div className={`w-1.5 h-1.5 rounded-full ml-auto ${st.dot}`} />
        </div>
      )}
    </button>
  );
}

// ── LIVELLO DI NAVIGAZIONE ────────────────────────────────────────────────────
function NodeLevel({ node, onDrillIn }: { node: MapNode; onDrillIn: (n: MapNode) => void }) {
  const children = node.children ?? [];
  const leaves   = children.filter(c => c.isLeaf);
  const groups   = children.filter(c => !c.isLeaf);
  const cfg      = pillarCfg(node.pillar);

  const total   = leaves.length + groups.length;
  const done    = children.filter(c => c.status === "active").length;
  const active  = children.filter(c => c.status === "active" || c.status === "building").length;
  const pct     = node.pct ?? (total > 0 ? Math.round((done/total)*100) : 0);

  return (
    <div className="space-y-4">
      {/* Header nodo corrente */}
      <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {node.id === "V32" ? "🔩" : node.id === "MIMS" ? "⬡" : node.id === "GENESIS" ? "⬡" : node.id === "VITA_NATURA" ? "🌿" : node.id === "IDENTITY" ? "🧭" : "⚡"}
            </span>
            <div>
              <div className={`text-[11px] font-mono font-bold uppercase tracking-widest ${cfg.color}`}>{node.label}</div>
              {node.desc && <div className="text-[9px] text-slate-500 mt-0.5 max-w-xs truncate">{node.desc}</div>}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-black tabular-nums ${cfg.color}`}>{pct}%</div>
            <div className="text-[8px] font-mono text-slate-600">{done}/{total}</div>
            {active > 0 && <div className="text-[8px] font-mono text-amber-400 mt-0.5">{active} attivi</div>}
          </div>
        </div>
        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${cfg.bar}`} style={{ width:`${pct}%` }} />
        </div>
      </div>

      {/* Sub-categorie (grandi) */}
      {groups.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {groups.map(child => (
            <NodeTile key={child.id} node={child} size="lg" onClick={() => onDrillIn(child)} />
          ))}
        </div>
      )}

      {/* Foglie dirette */}
      {leaves.length > 0 && (
        <>
          {groups.length > 0 && (
            <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest border-t border-slate-800 pt-3">
              Nodi diretti
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {leaves.map(child => <NodeTile key={child.id} node={child} size="md" />)}
          </div>
        </>
      )}
    </div>
  );
}

// ── ROOT LEVEL — tutti i pilastri ─────────────────────────────────────────────
function RootLevel({ nodes, state, onDrillIn }: { nodes: MapNode[]; state: any; onDrillIn: (n: MapNode) => void }) {
  const pillars = state?.pillars ?? {};

  // Aggiorna pct dai dati live
  const live = nodes.map(n => {
    const p = pillars[n.id];
    if (p) return { ...n, pct: p.pct_complete ?? n.pct };
    return n;
  });

  const activeCount   = live.filter(n => n.status === "active").length;
  const buildingCount = live.filter(n => n.status === "building").length;

  return (
    <div className="space-y-4">
      {/* Header sistema */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[8px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1">TITANIUM OS — Topologia</div>
            <div className="text-[8px] font-mono text-slate-500">
              {live.length} pilastri · sistema operativo cognitivo
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { v: activeCount,   c: "text-emerald-400", l: "ATTIVI"   },
              { v: buildingCount, c: "text-amber-400",   l: "BUILD"    },
              { v: live.filter(n => n.status === "pending").length, c: "text-indigo-400", l: "PENDING" },
              { v: live.filter(n => n.status === "future").length,  c: "text-slate-700",  l: "FUTURE"  },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className={`text-xl font-black font-mono ${s.c}`}>{s.v}</div>
                <div className="text-[7px] font-mono text-slate-700 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pilastri grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {live.map(node => (
          <NodeTile key={node.id} node={node} size="lg" onClick={() => onDrillIn(node)} />
        ))}
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPALE ─────────────────────────────────────────────────────
export function MappaView({ systemState }: { systemState: any }) {
  const [stack, setStack] = useState<MapNode[]>([]);

  const drillIn = (node: MapNode) => setStack(s => [...s, node]);
  const goBack  = () => setStack(s => s.length > 0 ? s.slice(0, -1) : s);
  const goTo    = (idx: number) => setStack(s => s.slice(0, idx + 1));

  const current = stack[stack.length - 1] ?? null;

  // Stats globali per breadcrumb header
  const allNodes = SYSTEM_TREE;
  const allLeaves = allNodes.flatMap(n => n.children ?? []).flatMap(c => (c as MapNode).children ?? [c]);
  const globalDone = allLeaves.filter(l => l.status === "active").length;

  return (
    <div className="space-y-3">
      {/* ── BREADCRUMB ── */}
      {stack.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={() => setStack([])}
            className="text-[9px] font-mono text-slate-600 hover:text-slate-400 uppercase tracking-wider"
          >
            🧭 Sistema
          </button>
          {stack.map((node, idx) => {
            const cfg = pillarCfg(node.pillar);
            return (
              <span key={node.id} className="flex items-center gap-1.5">
                <span className="text-slate-700 text-[9px]">/</span>
                <button
                  onClick={() => goTo(idx + 1)}
                  className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${
                    idx === stack.length - 1 ? cfg.color + " font-bold" : "text-slate-600 hover:text-slate-400"
                  }`}
                >
                  {node.label}
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* ── CONTENUTO ── */}
      {current === null ? (
        <RootLevel nodes={SYSTEM_TREE as MapNode[]} state={systemState} onDrillIn={drillIn} />
      ) : (
        <NodeLevel node={current} onDrillIn={drillIn} />
      )}

      {/* Footer */}
      <div className="text-center py-1 flex items-center justify-center gap-2">
        <CheckCircle2 size={8} className="text-emerald-700" />
        <span className="text-[7px] font-mono text-slate-800 uppercase tracking-[0.3em]">
          {globalDone} nodi attivi · capannone 15 Luglio 2030
        </span>
        <AlertCircle size={8} className="text-slate-800" />
      </div>
    </div>
  );
}
