// MatteoSection.tsx | TITANIUM_OS / DASHBOARD | v3.0 | 2026-05-31
// Mappa navigabile N livelli — navStack infinito. Tile → categoria → skill → dettaglio.

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Zap, Lock, Circle } from "lucide-react";
import { SKILL_ROOT, nodeProgress, globalProgress, type SkillNode } from "../data/skillTreeData";

// ── STATUS STYLES ─────────────────────────────────────────────────────────────
const ST = {
  done:    { tile: "bg-emerald-900/70 border-emerald-500/60 text-emerald-100",   glow: "0 0 24px #10b98150", pulse: false, icon: CheckCircle2, dot: "bg-emerald-400" },
  active:  { tile: "bg-amber-900/70   border-amber-400/70   text-amber-100",     glow: "0 0 28px #f59e0b70", pulse: true,  icon: Zap,          dot: "bg-amber-400"   },
  blocked: { tile: "bg-slate-800/60   border-slate-700/30   text-slate-500",     glow: "none",               pulse: false, icon: Circle,       dot: "bg-slate-600"   },
  future:  { tile: "bg-slate-900/30   border-slate-800/20   text-slate-700",     glow: "none",               pulse: false, icon: Lock,         dot: "bg-slate-800"   },
};

// ── NODE TILE — usato per tutti i livelli ─────────────────────────────────────
function NodeTile({
  node, onClick, size = "md",
}: {
  node: SkillNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}) {
  const [open, setOpen] = useState(false);
  const st = ST[node.status];
  const Icon = st.icon;
  const { done, total, active, pct } = nodeProgress(node);
  const hasChildren = !node.isLeaf && (node.children?.length ?? 0) > 0;
  const isClickable = hasChildren && onClick;

  const padding  = size === "lg" ? "p-5" : size === "sm" ? "p-2" : "p-3.5";
  const iconSize = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  const labelSz  = size === "lg" ? "text-[12px]" : size === "sm" ? "text-[9px]" : "text-[10px]";

  const handleClick = () => {
    if (isClickable) onClick?.();
    else if (node.isLeaf) setOpen(o => !o);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-xl border text-left transition-all duration-200 w-full
                  ${st.tile} ${padding}
                  ${isClickable || node.isLeaf
                    ? "hover:scale-[1.03] hover:brightness-115 active:scale-[0.97] cursor-pointer"
                    : "cursor-default opacity-40"
                  }`}
      style={{ boxShadow: st.glow }}
    >
      {/* Icon + nav arrow */}
      <div className="flex items-start justify-between mb-2">
        <span className={iconSize}>{node.icon}</span>
        <div className="flex items-center gap-1.5">
          {st.pulse && active > 0 && (
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"
                 style={{ boxShadow: "0 0 6px #f59e0b" }} />
          )}
          {isClickable && <ChevronRight size={10} className="text-slate-500 opacity-60" />}
        </div>
      </div>

      {/* Label */}
      <div className={`${labelSz} font-mono font-bold uppercase tracking-wide leading-tight mb-1`}>
        {node.label}
      </div>

      {/* Note se è foglia */}
      {node.isLeaf && node.note && open && (
        <p className="text-[8px] text-slate-400 mt-2 pt-2 border-t border-white/5 leading-relaxed">
          {node.note}
        </p>
      )}

      {/* Progress se ha figli */}
      {!node.isLeaf && total > 0 && (
        <>
          <div className="text-[8px] font-mono text-slate-600 mb-1.5">{done}/{total}</div>
          <div className="h-1 bg-black/30 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${st.dot}`}
                 style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[8px] font-mono text-right mt-1 opacity-60">{pct}%</div>
        </>
      )}

      {/* Status dot se foglia */}
      {node.isLeaf && (
        <div className="flex justify-end mt-1">
          <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
               style={node.status === "active" ? { boxShadow: "0 0 6px #f59e0b" } : {}} />
        </div>
      )}
    </button>
  );
}

// ── LIVELLO DI NAVIGAZIONE ────────────────────────────────────────────────────
function NodeLevel({ node, onDrillIn }: { node: SkillNode; onDrillIn: (n: SkillNode) => void }) {
  const children = node.children ?? [];
  const leaves   = children.filter(c => c.isLeaf);
  const groups   = children.filter(c => !c.isLeaf);

  const { done, total, active, pct } = nodeProgress(node);

  return (
    <div className="space-y-4">
      {/* Header nodo corrente */}
      <div className={`rounded-2xl border ${node.border} ${node.bg} p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{node.icon}</span>
            <div>
              <div className={`text-[11px] font-mono font-bold uppercase tracking-widest ${node.color}`}>
                {node.label}
              </div>
              {node.note && (
                <div className="text-[9px] text-slate-500 mt-0.5">{node.note}</div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-black tabular-nums ${node.color}`}>{pct}%</div>
            <div className="text-[8px] font-mono text-slate-600">{done}/{total}</div>
            {active > 0 && (
              <div className="text-[8px] font-mono text-amber-400 mt-0.5">{active} attivi</div>
            )}
          </div>
        </div>
        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${node.dot}`}
               style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Sotto-categorie (grandi) */}
      {groups.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {groups.map(child => (
            <NodeTile
              key={child.id}
              node={child}
              size="lg"
              onClick={() => onDrillIn(child)}
            />
          ))}
        </div>
      )}

      {/* Foglie — skill tiles (medie) */}
      {leaves.length > 0 && (
        <>
          {groups.length > 0 && (
            <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest border-t border-slate-800 pt-3">
              Skill dirette
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {leaves.map(child => (
              <NodeTile key={child.id} node={child} size="md" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── COMPONENTE PRINCIPALE — navStack ──────────────────────────────────────────
export function MatteoSection() {
  const [stack, setStack] = useState<SkillNode[]>([SKILL_ROOT]);
  const g = globalProgress();

  const current = stack[stack.length - 1];

  const drillIn = (node: SkillNode) => {
    setStack(s => [...s, node]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  const goTo   = (idx: number) => setStack(s => s.slice(0, idx + 1));

  return (
    <div className="space-y-3">
      {/* ── STATS GLOBALI ── */}
      <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">
              Matteo Benenati — Percorso
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-black text-white tabular-nums">{g.done}</span>
              <span className="text-slate-600 font-mono mb-0.5 text-sm">/ {g.total}</span>
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { v: g.done,    c: "text-emerald-400", l: "FATTO"    },
              { v: g.active,  c: "text-amber-400",   l: "ATTIVI"   },
              { v: g.blocked, c: "text-slate-500",   l: "BLOCCATI" },
              { v: g.future,  c: "text-slate-700",   l: "FUTURI"   },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className={`text-xl font-black font-mono ${s.c}`}>{s.v}</div>
                <div className="text-[7px] font-mono text-slate-700 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000"
               style={{ width: `${Math.round((g.done / g.total) * 100)}%` }} />
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      {stack.length > 1 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={goBack}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
            <ChevronLeft size={12} />
          </button>
          {stack.map((node, idx) => (
            <span key={node.id} className="flex items-center gap-1.5">
              {idx > 0 && <span className="text-slate-700 text-[9px]">/</span>}
              <button
                onClick={() => goTo(idx)}
                className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${
                  idx === stack.length - 1
                    ? current.color + " font-bold"
                    : "text-slate-600 hover:text-slate-400"
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
          Capannone — 15 Luglio 2030
        </span>
      </div>
    </div>
  );
}
