// MimsSection.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Mappa navigabile N-livelli MIMS â€” Prodotto / Produzione / Mercato / IP / Roadmap

import { useState } from "react";
import { ChevronLeft, CheckCircle2, Zap, Lock, Circle } from "lucide-react";
import { MIMS_ROOT } from "../data/mimsData";
import { getAllLeaves, type SkillNode } from "../data/skillTreeData";
import { NodeLevel as KitLevel, type NodeKitTheme } from "./skilltree/NodeKit";

// â”€â”€ STATUS STYLES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ST = {
  done:    { tile: "bg-emerald-900/70 border-emerald-500/60 text-emerald-100", glow: "0 0 24px #10b98150", pulse: false, icon: CheckCircle2, dot: "bg-emerald-400" },
  active:  { tile: "bg-amber-900/70   border-amber-400/70   text-amber-100",   glow: "0 0 28px #f59e0b70", pulse: true,  icon: Zap,          dot: "bg-amber-400"   },
  blocked: { tile: "bg-slate-800/60   border-slate-700/30   text-slate-500",   glow: "none",               pulse: false, icon: Circle,       dot: "bg-slate-600"   },
  future:  { tile: "bg-slate-900/30   border-slate-800/20   text-slate-700",   glow: "none",               pulse: false, icon: Lock,         dot: "bg-slate-800"   },
};

// NodeTile/NodeLevel: struttura condivisa in skilltree/NodeKit (critica gc03,
// erano 4 copie) â€” qui resta solo il TEMA amber di MIMS.
const THEME: NodeKitTheme = {
  st: ST,
  pulseClass: "bg-amber-400", pulseHex: "#f59e0b",
  hover: "hover:brightness-115",
  iconSize: { sm: "text-lg", md: "text-2xl", lg: "text-4xl" },
  countSuffix: "",
  activeLabel: "attivi", activeLabelClass: "text-amber-400",
  directLabel: "Skill dirette",
  leafGrid: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2",
};

const NodeLevel = (p: { node: SkillNode; onDrillIn: (n: SkillNode) => void }) =>
  <KitLevel {...p} theme={THEME} />;

// â”€â”€ COMPONENTE PRINCIPALE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function MimsSection() {
  const [stack, setStack] = useState<SkillNode[]>([MIMS_ROOT]);
  const current = stack[stack.length - 1];

  const leaves  = getAllLeaves(MIMS_ROOT);
  const done    = leaves.filter(l => l.status === "done").length;
  const active  = leaves.filter(l => l.status === "active").length;
  const blocked = leaves.filter(l => l.status === "blocked").length;
  const future  = leaves.filter(l => l.status === "future").length;
  const pct     = Math.round((done / leaves.length) * 100);

  const drillIn = (node: SkillNode) => { setStack(s => [...s, node]); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goBack  = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  const goTo    = (idx: number) => setStack(s => s.slice(0, idx + 1));

  return (
    <div className="space-y-3">
      {/* â”€â”€ STATS GLOBALI â”€â”€ */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[8px] font-mono text-amber-500/70 uppercase tracking-widest mb-1">
              MIMS â€” Micro-Industry Modular System
            </div>
            <div className="text-[8px] font-mono text-slate-500 mb-2">
              DNA 29.9mm H7/g6 Â· 3 giunti Â· 7 materiali Â· Lego per l'industria pesante
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-black text-amber-300 tabular-nums">{done}</span>
              <span className="text-slate-600 font-mono mb-0.5 text-sm">/ {leaves.length}</span>
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { v: done,    c: "text-emerald-400", l: "FATTO"    },
              { v: active,  c: "text-amber-400",   l: "ATTIVI"   },
              { v: blocked, c: "text-slate-500",   l: "BLOCCATI" },
              { v: future,  c: "text-slate-700",   l: "FUTURI"   },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className={`text-xl font-black font-mono ${s.c}`}>{s.v}</div>
                <div className="text-[7px] font-mono text-slate-700 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-700 to-amber-400 rounded-full transition-all duration-1000"
               style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[8px] font-mono text-amber-500/50 text-right mt-1">{pct}% milestone completati</div>
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
          TAM â‚¬4.2B Â· Blue ocean Â· Capannone 2030
        </span>
      </div>
    </div>
  );
}
