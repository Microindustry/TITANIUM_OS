// NodeKit.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-07
// NodeTile + NodeLevel CONDIVISI del pattern N-livelli (navStack).
// Prima vivevano in 4 copie identiche-a-tema-diverso dentro MatteoSection /
// GenesisSection / MimsSection / CriticheSection (critica gc03 — la diagnosi
// diceva 3, erano 4). Qui vive la STRUTTURA; l'identità visiva (accento, glow,
// testi, griglie) resta nella section via NodeKitTheme — pixel identici.

import { useState } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { nodeProgress, type SkillNode } from "../../data/skillTreeData";

export interface StatusStyle {
  tile: string;
  glow: string;
  pulse: boolean;
  icon: LucideIcon;
  dot: string;
}

export interface NodeKitTheme {
  st: Record<SkillNode["status"], StatusStyle>;
  pulseClass: string;                    // es. "bg-cyan-400"
  pulseHex: string;                      // es. "#22d3ee"
  hover: string;                         // "hover:brightness-115" (critiche: 110)
  iconSize: { sm: string; md: string; lg: string };
  countSuffix: string;                   // "" | " risolti"
  activeLabel: string;                   // "attivi" | "da fare"
  activeLabelClass: string;              // es. "text-cyan-400"
  directLabel: string;                   // "Nodi diretti" | "Skill dirette" | "Critiche dirette"
  leafGrid: string;                      // classi griglia foglie
}

export function NodeTile({ node, onClick, size = "md", theme }: {
  node: SkillNode; onClick?: () => void; size?: "sm" | "md" | "lg"; theme: NodeKitTheme;
}) {
  const [open, setOpen] = useState(false);
  const st = theme.st[node.status];
  const { done, total, active, pct } = nodeProgress(node);
  const hasChildren = !node.isLeaf && (node.children?.length ?? 0) > 0;
  const isClickable = hasChildren && !!onClick;
  const padding  = size === "lg" ? "p-5" : size === "sm" ? "p-2" : "p-3.5";
  const iconSize = theme.iconSize[size];
  const labelSz  = size === "lg" ? "text-[12px]" : size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <button
      onClick={() => { if (isClickable) onClick?.(); else if (node.isLeaf) setOpen(o => !o); }}
      className={`rounded-xl border text-left transition-all duration-200 w-full ${st.tile} ${padding} ${
        isClickable || node.isLeaf
          ? `hover:scale-[1.03] ${theme.hover} active:scale-[0.97] cursor-pointer`
          : "cursor-default opacity-40"
      }`}
      style={{ boxShadow: st.glow }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={iconSize}>{node.icon}</span>
        <div className="flex items-center gap-1.5">
          {st.pulse && active > 0 && (
            <div className={`w-1.5 h-1.5 rounded-full ${theme.pulseClass} animate-pulse`}
                 style={{ boxShadow: `0 0 6px ${theme.pulseHex}` }} />
          )}
          {isClickable && <ChevronRight size={10} className="text-slate-500 opacity-60" />}
        </div>
      </div>

      <div className={`${labelSz} font-mono font-bold uppercase tracking-wide leading-tight mb-1`}>
        {node.label}
      </div>

      {node.isLeaf && node.note && open && (
        <p className="text-[8px] text-slate-400 mt-2 pt-2 border-t border-white/5 leading-relaxed">
          {node.note}
        </p>
      )}

      {!node.isLeaf && total > 0 && (
        <>
          <div className="text-[8px] font-mono text-slate-600 mb-1.5">{done}/{total}{theme.countSuffix}</div>
          <div className="h-1 bg-black/30 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${st.dot}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[8px] font-mono text-right mt-1 opacity-60">{pct}%</div>
        </>
      )}

      {node.isLeaf && (
        <div className="flex justify-end mt-1">
          <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
               style={node.status === "active" ? { boxShadow: `0 0 6px ${theme.pulseHex}` } : {}} />
        </div>
      )}
    </button>
  );
}

export function NodeLevel({ node, onDrillIn, theme }: {
  node: SkillNode; onDrillIn: (n: SkillNode) => void; theme: NodeKitTheme;
}) {
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
              <div className={`text-[11px] font-mono font-bold uppercase tracking-widest ${node.color}`}>
                {node.label}
              </div>
              {node.note && <div className="text-[9px] text-slate-500 mt-0.5">{node.note}</div>}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-black tabular-nums ${node.color}`}>{pct}%</div>
            <div className="text-[8px] font-mono text-slate-600">{done}/{total}{theme.countSuffix}</div>
            {active > 0 && (
              <div className={`text-[8px] font-mono ${theme.activeLabelClass} mt-0.5`}>
                {active} {theme.activeLabel}
              </div>
            )}
          </div>
        </div>
        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${node.dot}`}
               style={{ width: `${pct}%` }} />
        </div>
      </div>

      {groups.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {groups.map(child => (
            <NodeTile key={child.id} node={child} size="lg" onClick={() => onDrillIn(child)} theme={theme} />
          ))}
        </div>
      )}

      {leaves.length > 0 && (
        <>
          {groups.length > 0 && (
            <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest border-t border-slate-800 pt-3">
              {theme.directLabel}
            </div>
          )}
          <div className={theme.leafGrid}>
            {leaves.map(child => <NodeTile key={child.id} node={child} size="md" theme={theme} />)}
          </div>
        </>
      )}
    </div>
  );
}
