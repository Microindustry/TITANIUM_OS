// MatteoSection.tsx | TITANIUM_OS / DASHBOARD | v2.0 | 2026-05-31
// Skill tree visivo — percorso reale V32 + ecosistema. Caselle sbloccabili per milestone.

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, CheckCircle2, Zap, Circle } from "lucide-react";
import { SKILL_TREE, categoryProgress, globalProgress, type Skill, type SkillCategory } from "../data/skillTreeData";

// ── STATUS CONFIG ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  done:    { label: "FATTO",     icon: CheckCircle2, cell: "bg-emerald-900/60 border-emerald-500/50 text-emerald-300",   dot: "bg-emerald-500" },
  active:  { label: "IN CORSO",  icon: Zap,          cell: "bg-amber-900/50 border-amber-400/60 text-amber-200 shadow-[0_0_8px_#f59e0b30]", dot: "bg-amber-400" },
  blocked: { label: "BLOCCATO",  icon: Circle,       cell: "bg-slate-900/60 border-slate-700/40 text-slate-500",        dot: "bg-slate-600" },
  future:  { label: "FUTURO",    icon: Lock,         cell: "bg-slate-900/30 border-slate-800/30 text-slate-700",        dot: "bg-slate-800" },
};

// ── SKILL CELL ────────────────────────────────────────────────────────────────
function SkillCell({ skill, selected, onClick }: { skill: Skill; selected: boolean; onClick: () => void }) {
  const cfg = STATUS_CFG[skill.status];
  const Icon = cfg.icon;

  return (
    <button
      onClick={onClick}
      className={`relative rounded-lg border px-2 py-1.5 text-left transition-all duration-150
                  hover:brightness-125 hover:scale-[1.02] active:scale-95
                  ${cfg.cell} ${selected ? "ring-1 ring-white/20" : ""}`}
    >
      <div className="flex items-start gap-1.5">
        <Icon size={9} className="flex-shrink-0 mt-0.5 opacity-70" />
        <span className="text-[9px] font-mono leading-tight">{skill.label}</span>
      </div>
      {skill.note && (skill.status === "done" || skill.status === "active") && (
        <div className="text-[7px] text-slate-600 mt-0.5 truncate">{skill.note}</div>
      )}
    </button>
  );
}

// ── SKILL DETAIL PANEL ────────────────────────────────────────────────────────
function SkillDetail({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const cfg = STATUS_CFG[skill.status];
  const Icon = cfg.icon;
  return (
    <div className={`rounded-xl border p-3 ${cfg.cell}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Icon size={11} />
          <span className="text-[11px] font-bold font-mono">{skill.label}</span>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 flex-shrink-0">
          <ChevronUp size={11} />
        </button>
      </div>
      <div className="flex items-center gap-1.5 mb-1">
        <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        <span className="text-[9px] font-mono text-slate-400">{cfg.label}</span>
      </div>
      {skill.note && (
        <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{skill.note}</p>
      )}
    </div>
  );
}

// ── CATEGORY BLOCK ────────────────────────────────────────────────────────────
function CategoryBlock({ cat, locked }: { cat: SkillCategory; locked: boolean }) {
  const [open, setOpen] = useState(
    !locked && ["fondamenta", "v32_struttura", "v32_azionamenti", "software"].includes(cat.id)
  );
  const [selected, setSelected] = useState<string | null>(null);
  const { total, done, active, pct } = categoryProgress(cat);

  const selectedSkill = cat.skills.find(s => s.id === selected);

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${
      locked ? "border-slate-800/30 opacity-40" : cat.border
    } ${locked ? "bg-slate-900/10" : cat.bg}`}>

      {/* Header categoria */}
      <button
        onClick={() => !locked && setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
          locked ? "cursor-not-allowed" : "hover:brightness-110 transition-all"
        }`}
      >
        <span className="text-base flex-shrink-0">{cat.icon}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
              locked ? "text-slate-700" : cat.color
            }`}>
              {cat.label}
            </span>
            {cat.unlockedBy && locked && (
              <span className="text-[7px] font-mono text-slate-700 border border-slate-800 rounded px-1.5 py-0.5">
                🔒 bloccato
              </span>
            )}
            {active > 0 && !locked && (
              <span className="text-[7px] font-mono text-amber-400 border border-amber-500/30 rounded px-1.5 py-0.5 bg-amber-950/30">
                {active} in corso
              </span>
            )}
          </div>

          {/* Progress bar mini */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-0.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  locked ? "bg-slate-800" : cat.dot
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[8px] font-mono text-slate-600 tabular-nums flex-shrink-0">
              {done}/{total}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0">
          {locked
            ? <Lock size={11} className="text-slate-700" />
            : open
              ? <ChevronUp size={11} className="text-slate-600" />
              : <ChevronDown size={11} className="text-slate-600" />
          }
        </div>
      </button>

      {/* Contenuto — griglia caselle */}
      {open && !locked && (
        <div className="px-4 pb-4 space-y-2">
          {selectedSkill && (
            <SkillDetail skill={selectedSkill} onClose={() => setSelected(null)} />
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
            {cat.skills.map(skill => (
              <SkillCell
                key={skill.id}
                skill={skill}
                selected={selected === skill.id}
                onClick={() => setSelected(s => s === skill.id ? null : skill.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── COMPONENTE PRINCIPALE ─────────────────────────────────────────────────────
export function MatteoSection() {
  const g = globalProgress();

  // Categorie "completate" al 100% per sbloccare le successive
  const completedCatIds = new Set(
    SKILL_TREE.filter(c => categoryProgress(c).pct === 100).map(c => c.id)
  );

  const isLocked = (cat: SkillCategory) =>
    !!cat.unlockedBy && !completedCatIds.has(cat.unlockedBy);

  return (
    <div className="space-y-4">
      {/* Stats header */}
      <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              Percorso — Matteo Benenati
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-white tabular-nums">{g.done}</span>
              <span className="text-slate-600 font-mono text-lg mb-0.5">/ {g.total}</span>
              <span className="text-[9px] font-mono text-slate-600 mb-1">skill</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {[
              { label: "FATTO",    v: g.done,    c: "text-emerald-400" },
              { label: "ATTIVI",   v: g.active,  c: "text-amber-400"   },
              { label: "BLOCCATI", v: g.blocked, c: "text-slate-500"   },
              { label: "FUTURI",   v: g.future,  c: "text-slate-700"   },
            ].map(s => (
              <div key={s.label} className="text-right">
                <div className={`text-xl font-black font-mono tabular-nums ${s.c}`}>{s.v}</div>
                <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Barra globale */}
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000"
            style={{ width: `${Math.round((g.done / g.total) * 100)}%` }}
          />
        </div>

        {/* Legenda status */}
        <div className="flex items-center gap-4 mt-3">
          {(Object.entries(STATUS_CFG) as [string, typeof STATUS_CFG.done][]).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
              <span className="text-[8px] font-mono text-slate-600 uppercase">{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista categorie */}
      <div className="space-y-2">
        {SKILL_TREE.map(cat => (
          <CategoryBlock key={cat.id} cat={cat} locked={isLocked(cat)} />
        ))}
      </div>

      <div className="text-center py-2">
        <span className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em]">
          Capannone — 15 Luglio 2030
        </span>
      </div>
    </div>
  );
}
