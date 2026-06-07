// CriticheSection.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Critiche & Miglioramenti — N-livelli per progetto, aggiornabile ogni sessione

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, Clock, Lock, Activity } from "lucide-react";
import { CRITICHE_ROOT } from "../data/criticheData";
import { buildAutoBranch, type AutoFinding } from "../data/criticheAuto";
import { buildBussolaBranch, type BussolaTodo } from "../data/bussolaTodos";
import { nodeProgress, getAllLeaves, type SkillNode } from "../data/skillTreeData";

// ── STATUS STYLES — tema rose/red per distinguere dalle altre view ─────────
const ST = {
  done:    { tile: "bg-emerald-900/70 border-emerald-500/60 text-emerald-100", glow: "0 0 20px #10b98140", pulse: false, dot: "bg-emerald-400", icon: CheckCircle2 },
  active:  { tile: "bg-rose-900/70   border-rose-500/60   text-rose-100",     glow: "0 0 24px #f4366040", pulse: true,  dot: "bg-rose-400",   icon: AlertTriangle },
  blocked: { tile: "bg-slate-800/60  border-slate-700/30  text-slate-500",    glow: "none",               pulse: false, dot: "bg-slate-600", icon: Clock         },
  future:  { tile: "bg-slate-900/30  border-slate-800/20  text-slate-700",    glow: "none",               pulse: false, dot: "bg-slate-800", icon: Lock          },
};

function NodeTile({ node, onClick, size = "md" }: {
  node: SkillNode; onClick?: () => void; size?: "sm" | "md" | "lg";
}) {
  const [open, setOpen] = useState(false);
  const st = ST[node.status];
  const { done, total, active, pct } = nodeProgress(node);
  const hasChildren = !node.isLeaf && (node.children?.length ?? 0) > 0;
  const isClickable = hasChildren && !!onClick;
  const padding  = size === "lg" ? "p-5" : size === "sm" ? "p-2" : "p-3.5";
  const iconSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-2xl";
  const labelSz  = size === "lg" ? "text-[12px]" : size === "sm" ? "text-[9px]" : "text-[10px]";

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
        <span className={iconSize}>{node.icon}</span>
        <div className="flex items-center gap-1.5">
          {st.pulse && active > 0 && (
            <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"
                 style={{ boxShadow: "0 0 6px #f43660" }} />
          )}
          {isClickable && <ChevronRight size={10} className="text-slate-500 opacity-60" />}
        </div>
      </div>

      <div className={`${labelSz} font-mono font-bold uppercase tracking-wide leading-tight mb-1`}>
        {node.label}
      </div>

      {/* Critica espandibile */}
      {node.isLeaf && node.note && open && (
        <p className="text-[8px] text-slate-400 mt-2 pt-2 border-t border-white/5 leading-relaxed">
          {node.note}
        </p>
      )}

      {/* Categoria: progress */}
      {!node.isLeaf && total > 0 && (
        <>
          <div className="text-[8px] font-mono text-slate-600 mb-1.5">{done}/{total} risolti</div>
          <div className="h-1 bg-black/30 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${st.dot}`}
                 style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[8px] font-mono text-right mt-1 opacity-60">{pct}%</div>
        </>
      )}

      {/* Status dot */}
      {node.isLeaf && (
        <div className="flex justify-end mt-1">
          <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
               style={node.status === "active" ? { boxShadow: "0 0 6px #f43660" } : {}} />
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
            <div className="text-[8px] font-mono text-slate-600">{done}/{total} risolti</div>
            {active > 0 && (
              <div className="text-[8px] font-mono text-rose-400 mt-0.5">{active} da fare</div>
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
            <NodeTile key={child.id} node={child} size="lg" onClick={() => onDrillIn(child)} />
          ))}
        </div>
      )}

      {leaves.length > 0 && (
        <>
          {groups.length > 0 && (
            <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest border-t border-slate-800 pt-3">
              Critiche dirette
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {leaves.map(child => (
              <NodeTile key={child.id} node={child} size="md" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function CriticheSection() {
  // Cartella clinica viva (P1b): findings dal self-audit notturno, innestati
  // come ramo LIVE accanto al canone manuale di criticheData.ts.
  const [autoFindings, setAutoFindings] = useState<AutoFinding[]>([]);
  const [bussola, setBussola] = useState<BussolaTodo[]>([]);
  useEffect(() => {
    fetch("/api/critiche/auto")
      .then(r => r.json())
      .then(d => { if (d.ok && Array.isArray(d.findings)) setAutoFindings(d.findings); })
      .catch(() => { /* offline: resta solo il canone manuale */ });
    fetch("/api/bussola/todos")
      .then(r => r.json())
      .then(d => { if (d.ok && Array.isArray(d.todos)) setBussola(d.todos); })
      .catch(() => { /* offline: nessun ramo bussola */ });
  }, []);

  // Root = canone manuale + ramo BUSSOLA (la rotta) + ramo auto-audit, in testa
  const root = useMemo<SkillNode>(() => {
    const branches = [buildBussolaBranch(bussola), buildAutoBranch(autoFindings)]
      .filter((b): b is SkillNode => b !== null);
    if (branches.length === 0) return CRITICHE_ROOT;
    return { ...CRITICHE_ROOT, children: [...branches, ...(CRITICHE_ROOT.children ?? [])] };
  }, [autoFindings, bussola]);

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

  const drillIn = (node: SkillNode) => { setStack(s => [...s, node]); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goBack  = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  const goTo    = (idx: number) => setStack(s => s.slice(0, idx + 1));

  return (
    <div className="space-y-3">
      {/* ── HEADER AUDIT ── */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[8px] font-mono text-rose-400/70 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <AlertTriangle size={9} className="text-rose-400" />
              Critiche & Miglioramenti — Audit continuo
            </div>
            <div className="text-[8px] font-mono text-slate-500 mb-2 flex items-center gap-2">
              <span>Canone manuale + auto-audit notturno · click critica per dettaglio</span>
              {autoFindings.length > 0 && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded
                                 bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <Activity size={8} className="animate-pulse" />
                  {autoFindings.length} live · {autoOpen} aperti
                </span>
              )}
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-black text-rose-300 tabular-nums">{active}</span>
              <span className="text-slate-600 font-mono mb-0.5 text-sm">da fare</span>
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
          Canone: criticheData.ts · Live: night_audit → critiche_auto.json
        </span>
      </div>
    </div>
  );
}
