// GenesisSection.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Mappa navigabile N-livelli GENESIS — Infrastruttura / Intelligenza / Automazioni / Sicurezza / Dati / Roadmap

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Zap, Lock, Circle } from "lucide-react";
import { GENESIS_ROOT } from "../data/genesisData";
import { nodeProgress, getAllLeaves, type SkillNode } from "../data/skillTreeData";

const ST = {
  done:    { tile: "bg-emerald-900/70 border-emerald-500/60 text-emerald-100", glow: "0 0 24px #10b98150", pulse: false, icon: CheckCircle2, dot: "bg-emerald-400" },
  active:  { tile: "bg-cyan-900/70   border-cyan-400/70   text-cyan-100",     glow: "0 0 28px #22d3ee70", pulse: true,  icon: Zap,          dot: "bg-cyan-400"   },
  blocked: { tile: "bg-slate-800/60   border-slate-700/30   text-slate-500",  glow: "none",               pulse: false, icon: Circle,       dot: "bg-slate-600"  },
  future:  { tile: "bg-slate-900/30   border-slate-800/20   text-slate-700",  glow: "none",               pulse: false, icon: Lock,         dot: "bg-slate-800"  },
};

function NodeTile({ node, onClick, size = "md" }: { node: SkillNode; onClick?: () => void; size?: "sm" | "md" | "lg" }) {
  const [open, setOpen] = useState(false);
  const st = ST[node.status];
  const { done, total, active, pct } = nodeProgress(node);
  const hasChildren = !node.isLeaf && (node.children?.length ?? 0) > 0;
  const isClickable  = hasChildren && !!onClick;
  const padding  = size === "lg" ? "p-5" : size === "sm" ? "p-2" : "p-3.5";
  const iconSize = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  const labelSz  = size === "lg" ? "text-[12px]" : size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <button
      onClick={() => { if (isClickable) onClick?.(); else if (node.isLeaf) setOpen(o => !o); }}
      className={`rounded-xl border text-left transition-all duration-200 w-full ${st.tile} ${padding} ${
        isClickable || node.isLeaf ? "hover:scale-[1.03] hover:brightness-115 active:scale-[0.97] cursor-pointer" : "cursor-default opacity-40"
      }`}
      style={{ boxShadow: st.glow }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={iconSize}>{node.icon}</span>
        <div className="flex items-center gap-1.5">
          {st.pulse && active > 0 && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: "0 0 6px #22d3ee" }} />}
          {isClickable && <ChevronRight size={10} className="text-slate-500 opacity-60" />}
        </div>
      </div>
      <div className={`${labelSz} font-mono font-bold uppercase tracking-wide leading-tight mb-1`}>{node.label}</div>
      {node.isLeaf && node.note && open && (
        <p className="text-[8px] text-slate-400 mt-2 pt-2 border-t border-white/5 leading-relaxed">{node.note}</p>
      )}
      {!node.isLeaf && total > 0 && (
        <>
          <div className="text-[8px] font-mono text-slate-600 mb-1.5">{done}/{total}</div>
          <div className="h-1 bg-black/30 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${st.dot}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[8px] font-mono text-right mt-1 opacity-60">{pct}%</div>
        </>
      )}
      {node.isLeaf && (
        <div className="flex justify-end mt-1">
          <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} style={node.status === "active" ? { boxShadow: "0 0 6px #22d3ee" } : {}} />
        </div>
      )}
    </button>
  );
}

function NodeLevel({ node, onDrillIn }: { node: SkillNode; onDrillIn: (n: SkillNode) => void }) {
  const children = node.children ?? [];
  const leaves   = children.filter(c => c.isLeaf);
  const groups   = children.filter(c => !c.isLeaf);
  const { done, total, active, pct } = nodeProgress(node);

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border ${node.border} ${node.bg} p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{node.icon}</span>
            <div>
              <div className={`text-[11px] font-mono font-bold uppercase tracking-widest ${node.color}`}>{node.label}</div>
              {node.note && <div className="text-[9px] text-slate-500 mt-0.5">{node.note}</div>}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-black tabular-nums ${node.color}`}>{pct}%</div>
            <div className="text-[8px] font-mono text-slate-600">{done}/{total}</div>
            {active > 0 && <div className="text-[8px] font-mono text-cyan-400 mt-0.5">{active} attivi</div>}
          </div>
        </div>
        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${node.dot}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {groups.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {groups.map(child => (
            <NodeTile key={child.id} node={child} size="lg" onClick={() => onDrillIn(child)} />
          ))}
        </div>
      )}

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

export function GenesisSection() {
  const [stack, setStack] = useState<SkillNode[]>([GENESIS_ROOT]);
  const current = stack[stack.length - 1];

  const leaves  = getAllLeaves(GENESIS_ROOT);
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
      {/* ── STATS GLOBALI ── */}
      <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[8px] font-mono text-cyan-500/70 uppercase tracking-widest mb-1">
              GENESIS — Ecosystem OS
            </div>
            <div className="text-[8px] font-mono text-slate-500 mb-2">
              Infrastruttura · Intelligenza · Automazioni · Dati · Sicurezza
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-black text-cyan-300 tabular-nums">{done}</span>
              <span className="text-slate-600 font-mono mb-0.5 text-sm">/ {leaves.length}</span>
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { v: done,    c: "text-emerald-400", l: "FATTO"    },
              { v: active,  c: "text-cyan-400",    l: "ATTIVI"   },
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
          <div className="h-full bg-gradient-to-r from-cyan-700 to-cyan-400 rounded-full transition-all duration-1000"
               style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[8px] font-mono text-cyan-500/50 text-right mt-1">{pct}% nodi completati</div>
      </div>

      {/* ── BREADCRUMB ── */}
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

      {/* ── LIVELLO CORRENTE ── */}
      <NodeLevel node={current} onDrillIn={drillIn} />

      <div className="text-center py-1">
        <span className="text-[7px] font-mono text-slate-800 uppercase tracking-[0.3em]">
          Un sistema che gira da solo vale più di 10 abitudini
        </span>
      </div>
    </div>
  );
}
