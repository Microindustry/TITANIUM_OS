// NeuroMapView.tsx | TITANIUM_OS | v2.0 | 2026-03-16
// Mappa dimensionale ecosistema — SVG node graph + live STATE.json sync
// v2.0: live data · progress arc · ciclo indicator · blockers · write bidirezionale
// Hover: illumina assi · Click: dettaglio + PATCH status

import { useState, useMemo, useEffect, useCallback } from "react";
import { X, AlertTriangle } from "lucide-react";

// ─── TIPI ─────────────────────────────────────────────────────
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
  pct?: number;       // percentuale completamento (ring 0 e 1)
  pillarKey?: string; // chiave in STATE.json pillars (solo ring 1)
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

// ─── GEOMETRIA ────────────────────────────────────────────────
const CX = 250;
const CY = 215;
const RADII = [0, 88, 165];
const NODE_R = [22, 15, 12]; // raggio cerchio per ring 0/1/2

function nodePos(n: MapNode): { x: number; y: number } {
  if (n.ring === 0) return { x: CX, y: CY };
  const r = RADII[n.ring];
  const angle = (-90 + n.idx * (360 / n.total)) * (Math.PI / 180);
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

// Arc SVG path: parte da top (-90°), clockwise, pct 0-100
function arcPath(cx: number, cy: number, r: number, pct: number): string {
  if (pct <= 0) return "";
  if (pct >= 99.9) {
    // Cerchio completo — due archi per evitare bug SVG start=end
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx + 0.01} ${cy - r}`;
  }
  const endAngle = -Math.PI / 2 + (pct / 100) * 2 * Math.PI;
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  return `M ${cx} ${cy - r} A ${r} ${r} 0 ${pct > 50 ? 1 : 0} 1 ${x2} ${y2}`;
}

// ─── MAPPING STATUS ───────────────────────────────────────────
function mapStatus(s: string): Status {
  if (s === "in_progress" || s === "active") return "active";
  if (s === "building") return "building";
  if (s.startsWith("waiting") || s === "pending") return "pending";
  return "future";
}

// ─── CICLO MAP — STATE.json → node id ─────────────────────────
const CICLO_MAP: Record<string, string> = {
  COSTRUISCI: "build", DOCUMENTA: "doc",   INSEGNA: "teach",
  SBLOCCA:    "unlock", PROGETTA: "design", PRODUCI: "produce",
  VENDI:      "sell",   REINVESTI: "reinvest",
};

const STATUS_CYCLE: Status[] = ["active", "building", "pending", "future"];

// ─── DATI NODI BASE ───────────────────────────────────────────
const NODES_BASE: MapNode[] = [
  // Centro
  { id: "os",       label: "TITANIUM OS",  emoji: "⚡", ring: 0, idx: 0, total: 1,
    hex: "#10b981", status: "active",
    detail: "Sistema operativo dell'ecosistema. Cervello collettivo, memoria, orchestrazione, Claude Code." },

  // Ring 1 — Pilastri
  { id: "v32",      label: "V32",          emoji: "🔧", ring: 1, idx: 0, total: 5,
    hex: "#10b981", status: "active",   pct: 65, pillarKey: "V32",
    detail: "Fresatrice CNC 3 assi. 178 kg, ±0.019 mm IT6. ROI 322% · BEP 61 h. Config G in corso." },
  { id: "mims",     label: "MIMS",         emoji: "🔩", ring: 1, idx: 1, total: 5,
    hex: "#f59e0b", status: "pending",  pct: 30, pillarKey: "MIMS",
    detail: "Connettori modulari. Piattaforma fisica + digitale. Attende pressa. ATTO III." },
  { id: "vita",     label: "VITA NATURA",  emoji: "🌿", ring: 1, idx: 2, total: 5,
    hex: "#818cf8", status: "active",   pct: 40, pillarKey: "VITA_NATURA",
    detail: "Centro estetico di Maria. EVA WhatsApp bot in sviluppo. Boffalora sopra Ticino." },
  { id: "identity", label: "IDENTITY",     emoji: "👤", ring: 1, idx: 3, total: 5,
    hex: "#64748b", status: "pending",  pct: 20, pillarKey: "IDENTITY",
    detail: "CV + LinkedIn + brand personale Matteo Benenati. Artigiano industriale + system builder." },
  { id: "genesis",  label: "GENESIS",      emoji: "🧠", ring: 1, idx: 4, total: 5,
    hex: "#06b6d4", status: "building", pct: 40, pillarKey: "GENESIS",
    detail: "TITANIUM OS: dashboard React, memory system, Claude Code, n8n automazioni. ATTO V." },

  // Ring 2 — CICLO OPERATIVO
  { id: "build",    label: "COSTRUISCI",   emoji: "⚒",  ring: 2, idx: 0, total: 8,
    hex: "#10b981", status: "active",
    detail: "Config G — Rinforzi colonne Z+U. Gusset 200mm + diagonali 40×40×2 + epoxy granite." },
  { id: "doc",      label: "DOCUMENTA",    emoji: "📖", ring: 2, idx: 1, total: 8,
    hex: "#06b6d4", status: "building",
    detail: "Video AVA, changelog automatico, storytelling milestone → n8n → .md → LinkedIn." },
  { id: "teach",    label: "INSEGNA",      emoji: "🎓", ring: 2, idx: 2, total: 8,
    hex: "#06b6d4", status: "future",
    detail: "Community, skill tree, PDF to memory, tutorial YouTube." },
  { id: "unlock",   label: "SBLOCCA",      emoji: "🔓", ring: 2, idx: 3, total: 8,
    hex: "#818cf8", status: "active",
    detail: "Rimuovi blockers. Sblocca competenze critiche. Risolvi dipendenze." },
  { id: "design",   label: "PROGETTA",     emoji: "📐", ring: 2, idx: 4, total: 8,
    hex: "#818cf8", status: "building",
    detail: "MIMS CAD, connettori tipo A/B, architettura GENESIS v7, design V33." },
  { id: "produce",  label: "PRODUCI",      emoji: "⚙",  ring: 2, idx: 5, total: 8,
    hex: "#f59e0b", status: "pending",
    detail: "V32 + pressa MIMS. Ore fresatura €45/h · stampi €500/cad." },
  { id: "sell",     label: "VENDI",        emoji: "📈", ring: 2, idx: 6, total: 8,
    hex: "#f59e0b", status: "future",
    detail: "B2B fresatura, MIMS kit, EVA SaaS. Target: €1.500/mese 2027." },
  { id: "reinvest", label: "REINVESTI",    emoji: "♻",  ring: 2, idx: 7, total: 8,
    hex: "#10b981", status: "future",
    detail: "Upgrade V32 → V33, espandi MIMS Heavy, reinvesti profitto. Capannone 2030." },
];

// ─── CONNESSIONI ──────────────────────────────────────────────
const EDGES: [string, string][] = [
  // OS ↔ pilastri
  ["os", "v32"], ["os", "mims"], ["os", "vita"], ["os", "identity"], ["os", "genesis"],
  // Pilastri ↔ ciclo
  ["v32",      "build"],  ["v32",      "produce"],
  ["mims",     "design"], ["mims",     "produce"], ["mims", "sell"],
  ["vita",     "sell"],   ["vita",     "design"],
  ["identity", "teach"],  ["identity", "sell"],
  ["genesis",  "doc"],    ["genesis",  "teach"],   ["genesis", "unlock"],
  // Loop ciclo ∞
  ["build", "doc"], ["doc", "teach"], ["teach", "unlock"], ["unlock", "design"],
  ["design", "produce"], ["produce", "sell"], ["sell", "reinvest"], ["reinvest", "build"],
];

// ─── UI HELPERS ───────────────────────────────────────────────
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

const API = "http://localhost:5001";

// ─── COMPONENTE ───────────────────────────────────────────────
export function NeuroMapView() {
  const [hovered,    setHovered]    = useState<string | null>(null);
  const [selected,   setSelected]   = useState<string | null>(null);
  const [live,       setLive]       = useState<LiveState | null>(null);
  const [apiOk,      setApiOk]      = useState<boolean | null>(null); // null=caricamento iniziale
  const [savedFlash, setSavedFlash] = useState(false);

  // ── Fetch STATE.json via api_server ──
  const fetchState = useCallback(async () => {
    try {
      const r = await fetch(`${API}/api/state`, { signal: AbortSignal.timeout(4000) });
      if (!r.ok) throw new Error("non-ok");
      setLive(await r.json());
      setApiOk(true);
    } catch {
      setApiOk(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, 30_000); // refresh ogni 30s
    return () => clearInterval(id);
  }, [fetchState]);

  // ── Merge dati live → nodi (override status e pct dai pillar reali) ──
  const nodes: MapNode[] = useMemo(() => {
    if (!live) return NODES_BASE;
    return NODES_BASE.map((n) => {
      if (!n.pillarKey) return n;
      const p = live.pillars[n.pillarKey];
      if (!p) return n;
      return { ...n, status: mapStatus(p.status), pct: p.pct_complete };
    });
  }, [live]);

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

  // Nodo attivo nel ciclo operativo (da STATE.json)
  const cicloActiveId = live ? (CICLO_MAP[live.ciclo_position] ?? null) : null;

  // Connessioni di un nodo
  const connectedTo = useCallback((id: string): Set<string> => {
    const s = new Set<string>();
    EDGES.forEach(([a, b]) => {
      if (a === id) s.add(b);
      if (b === id) s.add(a);
    });
    return s;
  }, []);

  // Salute media sistema → arco del nodo OS
  const systemPct = useMemo(() => {
    if (!live) return 0;
    const vals = Object.values(live.pillars).map((p) => p.pct_complete).filter(Boolean);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  }, [live]);

  const activeId     = hovered || selected;
  const activeConn   = activeId ? connectedTo(activeId) : new Set<string>();
  const selectedNode = selected ? nodeMap[selected] : null;

  // Opacità edge
  const edgeOpacity = (a: string, b: string): number => {
    if (!activeId) return 0.18;
    return (a === activeId || b === activeId) ? 0.95 : 0.04;
  };

  // Opacità nodo
  const nodeOpacity = (id: string): number => {
    if (!activeId) return 1;
    if (id === activeId || activeConn.has(id)) return 1;
    return 0.2;
  };

  // Colore edge
  const edgeColor = (a: string, b: string): string => {
    if (!activeId) return "#334155";
    if (a === activeId || b === activeId) return nodeMap[a].hex;
    return "#1e293b";
  };

  // ── PATCH status pillar → api_server → STATE.json ──
  const patchStatus = async (node: MapNode, next: Status) => {
    if (!node.pillarKey) return;
    const statusMap: Record<Status, string> = {
      active: "active", building: "building", pending: "pending", future: "future",
    };
    try {
      await fetch(`${API}/api/state/pillar/${node.pillarKey}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusMap[next] }),
      });
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
      fetchState(); // ricarica dati freschi
    } catch { /* silent — offline */ }
  };

  const cycleStatus = (node: MapNode) => {
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(node.status) + 1) % STATUS_CYCLE.length];
    patchStatus(node, next);
  };

  // ─── RENDER ────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes np { 0%,100% { opacity:.04 } 50% { opacity:.22 } }
        @keyframes nc { 0%,100% { opacity:.1  } 50% { opacity:.6  } }
        .np-pulse { animation: np 2.6s ease-in-out infinite; }
        .nc-pulse { animation: nc 1.3s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-col gap-1.5">

        {/* ── Header: stats + API status + legenda ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
            {nodes.length} nodi · {EDGES.length} assi · ∞ ciclo
          </span>

          {/* Dot API live/offline */}
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
              apiOk === null ? "bg-slate-600" :
              apiOk ? "bg-emerald-500" : "bg-red-500"
            }`} />
            <span className="text-[7px] font-mono text-slate-700">
              {apiOk === null ? "…" : apiOk ? "LIVE" : "OFFLINE"}
            </span>
          </div>

          <div className="ml-auto flex gap-1.5">
            {(["active","building","pending","future"] as Status[]).map((s) => (
              <div key={s} className={`text-[7px] font-mono px-1.5 py-0.5 rounded border ${STATUS_CLASS[s]}`}>
                {STATUS_LABEL[s]}
              </div>
            ))}
          </div>
        </div>

        {/* ── Focus today — strip compatta sopra la mappa ── */}
        {live?.focus_today && (
          <div className="flex items-center gap-2 px-2 py-1 rounded border border-l-2
                          border-emerald-900/40 border-l-emerald-500 bg-emerald-950/20 flex-shrink-0">
            <span className="text-[7px] font-mono text-emerald-600 uppercase tracking-widest flex-shrink-0">▶ OGGI</span>
            <span className="text-[8px] font-mono text-emerald-400 truncate">{live.focus_today}</span>
          </div>
        )}

        {/* ── SVG Map ── */}
        <div className="w-full overflow-hidden">
          <svg
            viewBox="0 0 500 430"
            style={{ display: "block", width: "100%", height: "auto" }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid dots background */}
            <defs>
              <pattern id="ngrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.6" fill="#1e293b" />
              </pattern>
            </defs>
            <rect width="500" height="430" fill="url(#ngrid)" />

            {/* Anelli guida */}
            {RADII.slice(1).map((r) => (
              <circle key={r} cx={CX} cy={CY} r={r}
                fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 5" />
            ))}

            {/* ── EDGES ── */}
            {EDGES.map(([a, b], i) => {
              const pa = posMap[a], pb = posMap[b];
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

            {/* ── PROGRESS ARCS — ring 0 (sistema) e ring 1 (pilastri) ── */}
            {nodes.map((n) => {
              if (n.ring === 2) return null;
              const { x, y } = posMap[n.id];
              // OS: arco più largo per non scontrarsi con selection ring (r+7=29)
              const arcR = n.ring === 0 ? NODE_R[0] + 10 : NODE_R[1] + 5;
              const pct  = n.ring === 0 ? systemPct : (n.pct ?? 0);
              if (pct <= 0) return null;
              return (
                <g key={`arc-${n.id}`}
                   style={{ opacity: nodeOpacity(n.id), transition: "opacity 0.18s" }}>
                  {/* Track grigio — sfondo arco */}
                  <circle cx={x} cy={y} r={arcR}
                    fill="none" stroke="#1e293b" strokeWidth="2.5" />
                  {/* Arco progresso */}
                  <path
                    d={arcPath(x, y, arcR, pct)}
                    fill="none"
                    stroke={n.hex}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </g>
              );
            })}

            {/* ── NODES ── */}
            {nodes.map((n) => {
              const { x, y } = posMap[n.id];
              const r       = NODE_R[n.ring];
              const isActive = n.id === activeId;
              const isSel    = n.id === selected;
              const isCiclo  = n.id === cicloActiveId;

              return (
                <g key={n.id}
                  style={{ cursor: "pointer", opacity: nodeOpacity(n.id), transition: "opacity 0.18s" }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(selected === n.id ? null : n.id)}
                >
                  {/* Pulse ring per nodi attivi */}
                  {n.status === "active" && (
                    <circle cx={x} cy={y} r={r + 5} fill="none"
                      stroke={n.hex} strokeWidth="8" className="np-pulse" />
                  )}

                  {/* Ciclo position — anello arancione tratteggiato */}
                  {isCiclo && (
                    <circle cx={x} cy={y} r={r + 10} fill="none"
                      stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 3"
                      className="nc-pulse" />
                  )}

                  {/* Anello selezione */}
                  {isSel && (
                    <circle cx={x} cy={y} r={r + 7} fill="none"
                      stroke={n.hex} strokeWidth="1.5" strokeOpacity="0.5" />
                  )}

                  {/* Cerchio principale */}
                  <circle cx={x} cy={y} r={r}
                    fill="#0f172a"
                    stroke={n.hex}
                    strokeWidth={isActive ? 2.2 : 1.2}
                    strokeOpacity={isActive ? 1 : 0.65}
                    style={{ transition: "stroke-width 0.15s" }}
                  />

                  {/* Status dot angolo in alto a destra */}
                  <circle cx={x + r * 0.62} cy={y - r * 0.62} r={2.5}
                    fill={STATUS_HEX[n.status]} />

                  {/* "▶ NOW" badge sopra il nodo ciclo attivo */}
                  {isCiclo && (
                    <text x={x} y={y - r - 5}
                      textAnchor="middle" fill="#f97316"
                      fontSize="5" fontFamily="monospace" letterSpacing="0.05em"
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    >▶ NOW</text>
                  )}

                  {/* Emoji */}
                  <text x={x} y={y + (n.ring === 0 ? 5 : 4)}
                    textAnchor="middle"
                    fontSize={n.ring === 0 ? 13 : n.ring === 1 ? 10 : 8}
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  >{n.emoji}</text>

                  {/* Nome nodo */}
                  <text x={x} y={y + r + 10}
                    textAnchor="middle"
                    fill={isCiclo ? "#f97316" : isActive ? n.hex : "#475569"}
                    fontSize="6.5"
                    fontFamily="monospace"
                    letterSpacing="0.05em"
                    style={{ transition: "fill 0.15s", userSelect: "none", pointerEvents: "none" }}
                  >{n.label}</text>
                </g>
              );
            })}

            {/* Ciclo label + last update — in basso */}
            {live?.ciclo_position && (
              <text x={CX} y={412} textAnchor="middle"
                fill="#f97316" fontSize="7" fontFamily="monospace"
                letterSpacing="0.1em" opacity="0.55"
              >CICLO · {live.ciclo_position}</text>
            )}
            {live?.last_update && (
              <text x={492} y={426} textAnchor="end"
                fill="#1e293b" fontSize="5" fontFamily="monospace"
              >{new Date(live.last_update).toLocaleString("it-IT", {
                  day: "2-digit", month: "2-digit",
                  hour: "2-digit", minute: "2-digit",
                })}</text>
            )}
          </svg>
        </div>

        {/* ── Blockers strip — visibile solo se ci sono blocchi ── */}
        {live?.blockers && live.blockers.length > 0 && (
          <div className="flex items-start gap-2 px-2 py-1 rounded border border-l-2
                          border-red-900/40 border-l-red-500 bg-red-950/20 flex-shrink-0">
            <AlertTriangle size={9} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              {live.blockers.map((b, i) => (
                <span key={i} className="text-[8px] font-mono text-red-400">{b}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── Detail panel ── */}
        {selectedNode && (
          <div className="flex-shrink-0 rounded-lg border p-2.5"
            style={{
              borderColor:      `${selectedNode.hex}30`,
              borderLeftColor:  selectedNode.hex,
              borderLeftWidth:  2,
              backgroundColor:  "#030712",
            }}
          >
            {/* Header panel */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">{selectedNode.emoji}</span>
                <div>
                  <div className="text-[11px] font-bold font-mono" style={{ color: selectedNode.hex }}>
                    {selectedNode.label}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    {/* Status badge — cliccabile per ring 1 (pilastri) */}
                    <button
                      onClick={() => { if (selectedNode.ring === 1) cycleStatus(selectedNode); }}
                      className={`text-[7px] font-mono px-1.5 py-0.5 rounded border ${STATUS_CLASS[selectedNode.status]}
                        ${selectedNode.ring === 1 ? "cursor-pointer hover:opacity-70" : "cursor-default"}`}
                      title={selectedNode.ring === 1 ? "Click per cambiare status" : undefined}
                    >
                      {STATUS_LABEL[selectedNode.status]}
                      {selectedNode.ring === 1 && " ↻"} · {connectedTo(selectedNode.id).size} assi
                    </button>
                    {/* Pct per ring 1 */}
                    {selectedNode.ring === 1 && selectedNode.pct !== undefined && (
                      <span className="text-[7px] font-mono text-slate-500">{selectedNode.pct}%</span>
                    )}
                    {/* Conferma salvataggio */}
                    {savedFlash && (
                      <span className="text-[7px] font-mono text-emerald-500">✓ SALVATO</span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)}
                className="text-slate-600 hover:text-slate-400 transition-colors mt-0.5">
                <X size={10} />
              </button>
            </div>

            {/* Dati live pillar (ring 1 con pillarKey) */}
            {selectedNode.ring === 1 && selectedNode.pillarKey && live?.pillars?.[selectedNode.pillarKey] && (
              <div className="mb-1.5 p-1.5 rounded bg-slate-900/50 border border-slate-800">
                <div className="text-[7px] font-mono text-slate-600 uppercase mb-0.5">Fase</div>
                <div className="text-[8px] font-mono text-slate-400 mb-1">
                  {live.pillars[selectedNode.pillarKey].phase}
                </div>
                <div className="text-[7px] font-mono text-slate-600 uppercase mb-0.5">Next</div>
                <div className="text-[8px] font-mono text-emerald-400">
                  {live.pillars[selectedNode.pillarKey].next}
                </div>
              </div>
            )}

            {/* OS: overview salute tutti i pilastri */}
            {selectedNode.id === "os" && live && (
              <div className="mb-1.5 grid grid-cols-3 gap-1">
                {Object.entries(live.pillars).map(([key, p]) => (
                  <div key={key} className="p-1 rounded bg-slate-900/50 border border-slate-800">
                    <div className="text-[7px] font-mono text-slate-600 truncate">{key}</div>
                    <div className="text-[9px] font-mono font-bold"
                         style={{ color: STATUS_HEX[mapStatus(p.status)] }}>
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

            {/* Descrizione nodo */}
            <p className="text-[9px] font-mono text-slate-500 leading-relaxed mb-2">
              {selectedNode.detail}
            </p>

            {/* Nodi connessi come chip cliccabili */}
            <div className="flex flex-wrap gap-1">
              {Array.from(connectedTo(selectedNode.id)).map((cid) => {
                const cn = nodeMap[cid];
                return (
                  <button key={cid} onClick={() => setSelected(cid)}
                    className="text-[7px] font-mono px-1.5 py-0.5 rounded border
                               border-slate-700 text-slate-500 hover:border-slate-500
                               hover:text-slate-300 transition-colors">
                    {cn.emoji} {cn.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
