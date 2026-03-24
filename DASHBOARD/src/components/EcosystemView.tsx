// EcosystemView.tsx | TITANIUM_OS | v2.0 | 2026-03-22
// Brain Graph 2D force-directed con glow canvas — stile alexandra.kassis
// Dati: STATE.json via API + struttura ECOSYSTEM_MANIFEST

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useGlobalState } from "../hooks/SystemStateContext";

// ─── TIPI ──────────────────────────────────────────────────────────────────
interface EcoNode {
  id: string;
  label: string;
  type: "core" | "fisico" | "digitale" | "sistema" | "narrazione" | "identita";
  group: string;
  pct?: number;
  status?: string;
  description?: string;
  val?: number;
  color?: string;
}

interface EcoLink {
  source: string;
  target: string;
  type: "layer" | "data" | "dipendenza" | "output";
  label?: string;
}

// ─── COLORI PER TIPO ────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, string> = {
  core:       "#10b981",
  fisico:     "#22c55e",
  digitale:   "#06b6d4",
  sistema:    "#6366f1",
  narrazione: "#f59e0b",
  identita:   "#a855f7",
};

// ─── NODI ECOSISTEMA ────────────────────────────────────────────────────────
const BASE_NODES: EcoNode[] = [
  { id: "MATTEO",        label: "MATTEO",           type: "core",       group: "root",      val: 28 },
  { id: "TITANIUM",      label: "TITANIUM",         type: "core",       group: "root",      val: 22 },
  { id: "GENESIS",       label: "GENESIS OS",       type: "sistema",    group: "sistema",   val: 16 },
  { id: "ECOSYSTEM",     label: "ECOSYSTEM",        type: "sistema",    group: "sistema",   val: 13 },
  { id: "DASHBOARD",     label: "DASHBOARD",        type: "digitale",   group: "digitale",  val: 15 },
  { id: "CONTENT",       label: "CONTENT ENGINE",   type: "narrazione", group: "narrazione",val: 13 },
  { id: "V32",           label: "CNC V32",          type: "fisico",     group: "fisico",    val: 20, description: "Fresatrice 3 assi — 178kg" },
  { id: "MIMS",          label: "MIMS",             type: "fisico",     group: "fisico",    val: 15, description: "Connettori modulari" },
  { id: "VULCAN",        label: "VULCAN",           type: "fisico",     group: "fisico",    val: 13, description: "Pressa 20t + polimeri" },
  { id: "FITPARK",       label: "FIT PARK 4.0",     type: "fisico",     group: "fisico",    val: 10, description: "Area fitness + tornello MIMS" },
  { id: "EVA",           label: "EVA",              type: "digitale",   group: "digitale",  val: 12, description: "AI assistant WhatsApp" },
  { id: "VITA_NATURA",   label: "VITA NATURA",      type: "digitale",   group: "digitale",  val: 11, description: "Centro estetico Maria" },
  { id: "STATE",         label: "STATE.json",       type: "sistema",    group: "sistema",   val: 10 },
  { id: "BRAIN",         label: "BRAIN/",           type: "sistema",    group: "sistema",   val: 9 },
  { id: "API_SERVER",    label: "API Server",       type: "sistema",    group: "sistema",   val: 9 },
  { id: "N8N",           label: "n8n",              type: "sistema",    group: "sistema",   val: 8 },
  { id: "WATCHER",       label: "Watcher",          type: "sistema",    group: "sistema",   val: 7 },
  { id: "SCANNER",       label: "MENTE Scanner",    type: "sistema",    group: "sistema",   val: 7 },
  { id: "EPISODES",      label: "Episodi",          type: "narrazione", group: "narrazione",val: 9 },
  { id: "DATASET",       label: "Dataset LLM",      type: "narrazione", group: "narrazione",val: 8 },
  { id: "REEL",          label: "Reel Hooks",       type: "narrazione", group: "narrazione",val: 7 },
  { id: "AUDIO",         label: "TTS Audio",        type: "narrazione", group: "narrazione",val: 7 },
  { id: "GITHUB",        label: "GitHub",           type: "identita",   group: "identita",  val: 9 },
  { id: "CV",            label: "CV Navigabile",    type: "identita",   group: "identita",  val: 8 },
  { id: "LLM_MATTEO",    label: "LLM Matteo",       type: "identita",   group: "identita",  val: 8 },
];

// ─── CONNESSIONI ────────────────────────────────────────────────────────────
const BASE_LINKS: EcoLink[] = [
  { source: "MATTEO",     target: "TITANIUM",    type: "layer" },
  { source: "TITANIUM",   target: "GENESIS",     type: "layer" },
  { source: "TITANIUM",   target: "ECOSYSTEM",   type: "layer" },
  { source: "TITANIUM",   target: "DASHBOARD",   type: "layer" },
  { source: "TITANIUM",   target: "CONTENT",     type: "layer" },
  { source: "TITANIUM",   target: "V32",         type: "layer" },
  { source: "TITANIUM",   target: "MIMS",        type: "layer" },
  { source: "TITANIUM",   target: "VULCAN",      type: "layer" },
  { source: "MIMS",       target: "FITPARK",     type: "dipendenza", label: "tornello" },
  { source: "VULCAN",     target: "MIMS",        type: "dipendenza", label: "polimeri" },
  { source: "TITANIUM",   target: "EVA",         type: "layer" },
  { source: "EVA",        target: "VITA_NATURA",  type: "dipendenza", label: "WhatsApp bot" },
  { source: "MATTEO",     target: "VITA_NATURA",  type: "data",       label: "Maria" },
  { source: "GENESIS",    target: "STATE",        type: "data" },
  { source: "GENESIS",    target: "BRAIN",        type: "data" },
  { source: "GENESIS",    target: "WATCHER",      type: "data" },
  { source: "GENESIS",    target: "SCANNER",      type: "data" },
  { source: "ECOSYSTEM",  target: "API_SERVER",   type: "data" },
  { source: "ECOSYSTEM",  target: "N8N",          type: "data" },
  { source: "API_SERVER",  target: "STATE",       type: "data",       label: "/api/state" },
  { source: "DASHBOARD",  target: "API_SERVER",   type: "data",       label: "polling 10s" },
  { source: "CONTENT",    target: "EPISODES",     type: "output" },
  { source: "CONTENT",    target: "DATASET",      type: "output" },
  { source: "CONTENT",    target: "REEL",         type: "output" },
  { source: "CONTENT",    target: "AUDIO",        type: "output" },
  { source: "STATE",      target: "CONTENT",      type: "data",       label: "milestones" },
  { source: "EPISODES",   target: "DATASET",      type: "data",       label: "JSONL" },
  { source: "TITANIUM",   target: "GITHUB",       type: "output" },
  { source: "TITANIUM",   target: "CV",           type: "output" },
  { source: "DATASET",    target: "LLM_MATTEO",   type: "data",       label: "fine-tuning" },
  { source: "CONTENT",    target: "GITHUB",       type: "output",     label: "storytelling" },
];

const LINK_COLORS: Record<string, string> = {
  layer:       "rgba(100,116,139,0.7)",
  data:        "rgba(6,182,212,0.7)",
  dipendenza:  "rgba(245,158,11,0.7)",
  output:      "rgba(168,85,247,0.6)",
};

// ─── COMPONENTE ─────────────────────────────────────────────────────────────
export function EcosystemView({ systemState }: { systemState?: any }) {
  // TanStack Query: stato condiviso, zero fetch duplicati
  const { state: queryState } = useGlobalState();
  const liveState = systemState || queryState;

  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<EcoNode | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  // Forze d3
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.d3Force("charge")?.strength(-120);
    fg.d3Force("link")?.distance(60);
    fg.d3Force("center")?.strength(0.05);
    // Zoom per inquadrare tutto dopo stabilizzazione
    setTimeout(() => fg.zoomToFit(600, 60), 1000);
  }, []);

  // Resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setDimensions({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fetch gestito da TanStack Query via useGlobalState — zero polling duplicato

  // Graph data con merge live
  const graphData = useMemo(() => {
    const nodes = BASE_NODES.map(n => {
      const node = { ...n };
      if (liveState?.pillars) {
        const pk = ({ V32: "V32", MIMS: "MIMS", GENESIS: "GENESIS", VITA_NATURA: "VITA_NATURA" } as Record<string, string>)[n.id];
        if (pk && liveState.pillars[pk]) {
          const p = liveState.pillars[pk];
          node.pct = p.pct_complete;
          node.status = p.status;
          node.description = `${p.phase} · ${p.pct_complete}%`;
          node.val = 10 + (p.pct_complete / 100) * 15;
        }
      }
      node.color = TYPE_COLORS[node.type] || "#94a3b8";
      return node;
    });
    const filtered = filter ? nodes.filter(n => n.type === filter || n.id === "MATTEO" || n.id === "TITANIUM") : nodes;
    const ids = new Set(filtered.map(n => n.id));
    // Deep clone links — d3-force muta source/target da stringa a oggetto
    const getId = (v: any): string => (typeof v === "object" ? v.id : v);
    const links = BASE_LINKS
      .filter(l => ids.has(getId(l.source)) && ids.has(getId(l.target)))
      .map(l => ({ ...l, source: getId(l.source), target: getId(l.target) }));
    return { nodes: filtered, links };
  }, [liveState, filter]);

  // Canvas node renderer — cerchio con glow
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const r = Math.sqrt(node.val || 10) * 1.8;
    const color = node.color || "#94a3b8";
    const isActive = node.id === hovered || node.id === selected?.id;
    const x = node.x || 0;
    const y = node.y || 0;

    // Glow esterno (piccolo per non coprire i link)
    const gradient = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 1.8);
    gradient.addColorStop(0, color + (isActive ? "50" : "20"));
    gradient.addColorStop(1, color + "00");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Cerchio principale
    ctx.fillStyle = color;
    ctx.globalAlpha = isActive ? 1 : 0.85;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Ring pulsante per nodi attivi
    if (node.status === "in_progress" || node.status === "active" || node.status === "building") {
      ctx.strokeStyle = color + "80";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Label
    const fontSize = Math.max(3, 12 / globalScale);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = isActive ? "#ffffff" : color;
    ctx.globalAlpha = isActive ? 1 : 0.8;
    ctx.fillText(node.label, x, y - r - fontSize * 0.8);

    // Sub-label pct
    if (node.pct !== undefined) {
      ctx.font = `${fontSize * 0.75}px monospace`;
      ctx.fillStyle = "#94a3b8";
      ctx.globalAlpha = 0.6;
      ctx.fillText(`${node.pct}%`, x, y - r - fontSize * 0.8 + fontSize);
    }
    ctx.globalAlpha = 1;
  }, [hovered, selected]);

  // Click → zoom
  const handleNodeClick = useCallback((node: any) => {
    setSelected(node);
    fgRef.current?.centerAt(node.x, node.y, 800);
    fgRef.current?.zoom(4, 800);
  }, []);

  const types = [
    { id: "core",       label: "CORE",       color: TYPE_COLORS.core },
    { id: "fisico",     label: "FISICO",     color: TYPE_COLORS.fisico },
    { id: "digitale",   label: "DIGITALE",   color: TYPE_COLORS.digitale },
    { id: "sistema",    label: "SISTEMA",    color: TYPE_COLORS.sistema },
    { id: "narrazione", label: "NARRAZIONE", color: TYPE_COLORS.narrazione },
    { id: "identita",   label: "IDENTITA",   color: TYPE_COLORS.identita },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#0a0a0f] overflow-hidden">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.w}
        height={dimensions.h}
        backgroundColor="#0a0a0f"
        nodeCanvasObject={paintNode}
        nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
          const r = Math.sqrt(node.val || 10) * 1.8;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, r * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }}
        linkColor={(link: any) => LINK_COLORS[link.type] || "rgba(100,116,139,0.6)"}
        linkWidth={(link: any) => (link.type === "layer" ? 2 : 1.2)}
        linkDirectionalParticles={3}
        linkDirectionalParticleWidth={2.5}
        linkDirectionalParticleColor={(link: any) => {
          const t = (typeof link.target === "object" ? link.target : graphData.nodes.find((n: any) => n.id === link.target)) as any;
          return TYPE_COLORS[t?.type] || "#64748b";
        }}
        linkDirectionalParticleSpeed={0.004}
        onNodeHover={(node: any) => setHovered(node?.id || null)}
        onNodeClick={handleNodeClick}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        warmupTicks={50}
        cooldownTicks={100}
      />

      {/* ── SIDEBAR FILTRI ──────────────────────────────────────────────── */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
        <button
          onClick={() => setFilter(null)}
          className={`text-[8px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${
            !filter ? "border-slate-500/40 bg-slate-800/60 text-slate-200" : "border-slate-800/40 bg-slate-900/40 text-slate-600 hover:text-slate-400"
          }`}
        >All Types</button>
        {types.map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(f => f === t.id ? null : t.id)}
            className={`flex items-center gap-2 text-[8px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${
              filter === t.id ? "" : "border-slate-800/40 bg-slate-900/40 text-slate-500 hover:text-slate-300"
            }`}
            style={filter === t.id ? { borderColor: t.color + "66", backgroundColor: t.color + "15", color: t.color } : undefined}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
            {t.label}
          </button>
        ))}
        <div className="mt-2 px-3 py-1.5 text-[7px] font-mono text-slate-600 border border-slate-800/30 rounded-lg bg-slate-900/30">
          {graphData.nodes.length} nodi · {graphData.links.length} link
        </div>
      </div>

      {/* ── DETTAGLIO NODO ────────────────────────────────────────────── */}
      {selected && (
        <div className="absolute bottom-4 left-4 z-10 w-[280px] rounded-xl border border-slate-700/40 bg-slate-950/90 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: TYPE_COLORS[selected.type] }} />
              <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-slate-100">{selected.label}</span>
            </div>
            <button onClick={() => { setSelected(null); fgRef.current?.zoomToFit(400, 60); }} className="text-[9px] text-slate-600 hover:text-slate-400">ESC</button>
          </div>
          <div className="text-[8px] font-mono uppercase tracking-widest mb-2" style={{ color: TYPE_COLORS[selected.type] }}>{selected.type}</div>
          {selected.description && <p className="text-[9px] font-mono text-slate-400 leading-relaxed mb-2">{selected.description}</p>}
          {selected.pct !== undefined && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${selected.pct}%`, backgroundColor: TYPE_COLORS[selected.type] }} />
              </div>
              <span className="text-[9px] font-mono text-slate-400">{selected.pct}%</span>
            </div>
          )}
          {selected.status && <div className="mt-2 text-[8px] font-mono text-slate-500">Status: <span className="text-slate-300">{selected.status}</span></div>}
          <div className="mt-3 pt-2 border-t border-slate-800/40">
            <div className="text-[7px] font-mono text-slate-600 uppercase tracking-widest mb-1">Connessioni</div>
            <div className="flex flex-wrap gap-1">
              {BASE_LINKS.filter(l => l.source === selected.id || l.target === selected.id).map((l, i) => {
                const other = l.source === selected.id ? l.target : l.source;
                return (
                  <span key={i} className="text-[7px] font-mono px-1.5 py-0.5 rounded border border-slate-800/40 text-slate-500 cursor-pointer hover:text-slate-300"
                    onClick={() => { const n = graphData.nodes.find((nd: any) => nd.id === other); if (n) handleNodeClick(n); }}>
                    {other}{l.label ? ` (${l.label})` : ""}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── TITOLO ────────────────────────────────────────────────────── */}
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-slate-300">ECOSYSTEM GRAPH</div>
        <div className="text-[8px] font-mono text-slate-600 tracking-wider">{liveState ? "LIVE" : "OFFLINE"} · force-directed · click per drill-down</div>
      </div>
    </div>
  );
}
