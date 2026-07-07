// CriticheSection.tsx | TITANIUM_OS / DASHBOARD | v1.1 | 2026-07-05
// Critiche & Miglioramenti â€” N-livelli per progetto, aggiornabile ogni sessione
// v1.1 (#54): il canone manuale arriva LIVE da /api/critiche/manuali (fonte:
// DATA/audit/critiche_manuali.json, editabile senza rebuild); CRITICHE_ROOT
// baked resta solo come fallback offline.

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, AlertTriangle, CheckCircle2, Clock, Lock, Activity } from "lucide-react";
import { NodeLevel as KitLevel, type NodeKitTheme } from "./skilltree/NodeKit";
import { CRITICHE_ROOT } from "../data/criticheData";
import { buildAutoBranch, type AutoFinding } from "../data/criticheAuto";
import { buildBussolaBranch, type BussolaTodo } from "../data/bussolaTodos";
import { getAllLeaves, type SkillNode } from "../data/skillTreeData";

// â”€â”€ STATUS STYLES â€” tema rose/red per distinguere dalle altre view â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ST = {
  done:    { tile: "bg-emerald-900/70 border-emerald-500/60 text-emerald-100", glow: "0 0 20px #10b98140", pulse: false, dot: "bg-emerald-400", icon: CheckCircle2 },
  active:  { tile: "bg-rose-900/70   border-rose-500/60   text-rose-100",     glow: "0 0 24px #f4366040", pulse: true,  dot: "bg-rose-400",   icon: AlertTriangle },
  blocked: { tile: "bg-slate-800/60  border-slate-700/30  text-slate-500",    glow: "none",               pulse: false, dot: "bg-slate-600", icon: Clock         },
  future:  { tile: "bg-slate-900/30  border-slate-800/20  text-slate-700",    glow: "none",               pulse: false, dot: "bg-slate-800", icon: Lock          },
};

// NodeTile/NodeLevel: struttura condivisa in skilltree/NodeKit (critica gc03,
// erano 4 copie) â€” qui resta solo il TEMA rose delle CRITICHE (+ testi "risolti"/
// "da fare", icone piÃ¹ piccole, griglia foglie piÃ¹ larga per le note lunghe).
const THEME: NodeKitTheme = {
  st: ST,
  pulseClass: "bg-rose-400", pulseHex: "#f43660",
  hover: "hover:brightness-110",
  iconSize: { sm: "text-base", md: "text-2xl", lg: "text-3xl" },
  countSuffix: " risolti",
  activeLabel: "da fare", activeLabelClass: "text-rose-400",
  directLabel: "Critiche dirette",
  leafGrid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2",
};

const NodeLevel = (p: { node: SkillNode; onDrillIn: (n: SkillNode) => void }) =>
  <KitLevel {...p} theme={THEME} />;

export function CriticheSection() {
  // Cartella clinica viva (P1b): findings dal self-audit notturno, innestati
  // come ramo LIVE accanto al canone manuale di criticheData.ts.
  const [autoFindings, setAutoFindings] = useState<AutoFinding[]>([]);
  const [bussola, setBussola] = useState<BussolaTodo[]>([]);
  // canone manuale LIVE (#54): fonte DATA/audit/critiche_manuali.json via API;
  // se l'API Ã¨ giÃ¹ resta il fallback baked (CRITICHE_ROOT)
  const [canone, setCanone] = useState<SkillNode>(CRITICHE_ROOT);
  useEffect(() => {
    fetch("/api/critiche/manuali")
      .then(r => r.json())
      .then(d => { if (d.ok && d.root && Array.isArray(d.root.children)) setCanone(d.root as SkillNode); })
      .catch(() => { /* offline: fallback baked */ });
    fetch("/api/critiche/auto")
      .then(r => r.json())
      .then(d => { if (d.ok && Array.isArray(d.findings)) setAutoFindings(d.findings); })
      .catch(() => { /* offline: resta solo il canone manuale */ });
    fetch("/api/bussola/todos")
      .then(r => r.json())
      .then(d => { if (d.ok && Array.isArray(d.todos)) setBussola(d.todos); })
      .catch(() => { /* offline: nessun ramo bussola */ });
  }, []);

  // Root = canone manuale (live) + ramo BUSSOLA (la rotta) + ramo auto-audit, in testa
  const root = useMemo<SkillNode>(() => {
    const branches = [buildBussolaBranch(bussola), buildAutoBranch(autoFindings)]
      .filter((b): b is SkillNode => b !== null);
    if (branches.length === 0) return canone;
    return { ...canone, children: [...branches, ...(canone.children ?? [])] };
  }, [autoFindings, bussola, canone]);

  const [stack, setStack] = useState<SkillNode[]>([CRITICHE_ROOT]);
  // Quando arrivano i findings il root cambia: riallinea solo se sei alla radice
  useEffect(() => { setStack(s => (s.length === 1 ? [root] : s)); }, [root]);
  const current = stack[stack.length - 1];

  const leaves  = getAllLeaves(root);
  const active  = leaves.filter(l => l.status === "active").length;
  const blocked = leaves.filter(l => l.status === "blocked").length;
  const future  = leaves.filter(l => l.status === "future").length;
  const done    = leaves.filter(l => l.status === "done").length;
  const pct     = leaves.length ? Math.round((done / leaves.length) * 100) : 0;
  const autoOpen = autoFindings.filter(f => (f.status || "open").toLowerCase() === "open").length;
  // Scomposizione onesta del "da fare": 3 fonti distinte confluiscono in questa vista
  // (canone manuale scritto a mano + auto-audit notturno + bussola). Mostrarle separate
  // evita il numero unico opaco che confondeva (es. "33" = solo il canone manuale).
  const canonOpen   = useMemo(() => getAllLeaves(canone).filter(l => l.status === "active").length, [canone]);
  const bussolaOpen = bussola.filter(t => t.stato === "da_fare" || t.stato === "in_corso").length;

  const drillIn = (node: SkillNode) => { setStack(s => [...s, node]); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goBack  = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  const goTo    = (idx: number) => setStack(s => s.slice(0, idx + 1));

  return (
    <div className="space-y-3">
      {/* â”€â”€ HEADER AUDIT â”€â”€ */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[8px] font-mono text-rose-400/70 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <AlertTriangle size={9} className="text-rose-400" />
              Critiche & Miglioramenti â€” Audit continuo
            </div>
            <div className="text-[8px] font-mono text-slate-500 mb-2 flex items-center gap-2">
              <span>Canone manuale + auto-audit notturno Â· click critica per dettaglio</span>
              {autoFindings.length > 0 && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded
                                 bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <Activity size={8} className="animate-pulse" />
                  {autoFindings.length} live Â· {autoOpen} aperti
                </span>
              )}
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-black text-rose-300 tabular-nums">{canonOpen + autoOpen + bussolaOpen}</span>
              <span className="text-slate-600 font-mono mb-0.5 text-sm">da fare (3 fonti)</span>
            </div>
            {/* scomposizione per fonte â€” il totale mescola 3 liste diverse */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {[
                { v: canonOpen,   l: "canone",  c: "text-rose-300/80",  t: "critiche_manuali.json â€” canone manuale (live da /api, editabile senza rebuild)" },
                { v: autoOpen,    l: "audit",   c: "text-cyan-300/80",  t: "auto-audit notturno (night_audit) â€” cartella clinica viva" },
                { v: bussolaOpen, l: "bussola", c: "text-pink-300/80",  t: "DA_FARE_FATTO.md â€” la scaletta condivisa" },
              ].map(s => (
                <span key={s.l} title={s.t}
                      className="inline-flex items-baseline gap-1 px-1.5 py-0.5 rounded
                                 bg-black/30 border border-white/5 font-mono text-[9px]">
                  <span className={`font-bold tabular-nums ${s.c}`}>{s.v}</span>
                  <span className="text-slate-500 uppercase tracking-wide">{s.l}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { v: active,  c: "text-rose-400",    l: "DA FARE"  },
              { v: blocked, c: "text-slate-500",   l: "BLOCCATI" },
              { v: future,  c: "text-slate-700",   l: "FUTURI"   },
              { v: done,    c: "text-emerald-400", l: "RISOLTI"  },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className={`text-xl font-black font-mono ${s.c}`}>{s.v}</div>
                <div className="text-[7px] font-mono text-slate-700 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-rose-700 to-emerald-500 rounded-full transition-all duration-1000"
               style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[8px] font-mono text-rose-500/50 text-right mt-1">{pct}% risolti</div>
      </div>

      {/* â”€â”€ BREADCRUMB â”€â”€ */}
      {stack.length > 1 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={goBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
            <ChevronLeft size={12} />
          </button>
          {stack.map((node, idx) => (
            <span key={node.id} className="flex items-center gap-1.5">
              {idx > 0 && <span className="text-slate-700 text-[9px]">/</span>}
              <button
                onClick={() => goTo(idx)}
                className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${
                  idx === stack.length - 1 ? current.color + " font-bold" : "text-slate-600 hover:text-slate-400"
                }`}
              >
                {node.icon} {node.label}
              </button>
            </span>
          ))}
        </div>
      )}

      {/* â”€â”€ LIVELLO CORRENTE â”€â”€ */}
      <NodeLevel node={current} onDrillIn={drillIn} />

      <div className="text-center py-1">
        <span className="text-[7px] font-mono text-slate-800 uppercase tracking-[0.3em]">
          Canone: critiche_manuali.json (live /api) Â· Audit: night_audit â†’ critiche_auto.json Â· Bussola: DA_FARE_FATTO.md
        </span>
      </div>
    </div>
  );
}
