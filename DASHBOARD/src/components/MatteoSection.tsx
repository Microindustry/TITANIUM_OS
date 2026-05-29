// MatteoSection.tsx | TITANIUM_OS / DASHBOARD / components | v1.0 | 2026-05-29
// Sezione profilo Matteo — skills espandibili, interessi, principi, 2030

import { useState } from "react";
import { Wrench, Cpu, Leaf, BookOpen, ChevronRight } from "lucide-react";
import { SKILLS_INDUSTRIA, SKILLS_DIGITAL, INTERESSI, PRINCIPI, type Skill, type Interesse } from "../data/matteoData";

function SkillRow({ skill, accent }: { skill: Skill; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all ${open ? "border-slate-600/60 bg-slate-800/40" : "border-transparent"}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-2 px-3 py-2.5 text-left hover:bg-slate-800/30 rounded-xl transition-colors"
      >
        <ChevronRight
          size={12}
          className={`mt-0.5 flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
          style={{ color: accent }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-200 leading-tight">{skill.label}</div>
          <div className="text-[10px] text-slate-600 leading-snug mt-0.5">{skill.note}</div>
        </div>
        <span
          className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5"
          style={{ color: accent, background: `${accent}18` }}
        >
          {skill.company}
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-2">
          <div className="flex flex-wrap gap-1 mb-1">
            {skill.tags.map(t => (
              <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">{t}</span>
            ))}
          </div>
          <ul className="space-y-1">
            {skill.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-slate-700 mt-1 flex-shrink-0" style={{ fontSize: 6 }}>▸</span>
                <span className="text-[10px] text-slate-400 leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function InteresseCard({ item }: { item: Interesse }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-xl border cursor-pointer transition-all ${open ? "border-emerald-500/30 bg-emerald-900/10" : "border-slate-700/40 bg-slate-800/50 hover:border-slate-600/50"}`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-1">
          <div className="text-base">{item.icon}</div>
          <ChevronRight size={11} className={`text-slate-600 mt-1 flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`} />
        </div>
        <div className="text-xs font-semibold text-slate-200 leading-tight mt-1">{item.label}</div>
        <div className="text-[10px] text-slate-600 leading-snug mt-0.5">{item.note}</div>
      </div>
      {open && (
        <div className="px-3 pb-3 border-t border-slate-700/30">
          <ul className="space-y-1 mt-2">
            {item.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1 flex-shrink-0" style={{ fontSize: 6 }}>▸</span>
                <span className="text-[10px] text-slate-400 leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function MatteoSection() {
  return (
    <div className="space-y-5">

      {/* Skill Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench size={12} className="text-amber-400" />
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Competenze Industria</span>
          </div>
          <div className="space-y-0.5">
            {SKILLS_INDUSTRIA.map(s => <SkillRow key={s.label} skill={s} accent="#fbbf24" />)}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={12} className="text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Competenze Digital + AI</span>
          </div>
          <div className="space-y-0.5">
            {SKILLS_DIGITAL.map(s => <SkillRow key={s.label} skill={s} accent="#22d3ee" />)}
          </div>
        </div>
      </div>

      {/* Interessi */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={12} className="text-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Interessi & Aree in Sviluppo</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INTERESSI.map(i => <InteresseCard key={i.label} item={i} />)}
        </div>
      </div>

      {/* Principi */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={12} className="text-indigo-400" />
          <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Principi Operativi</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {PRINCIPI.map((p, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-indigo-500/50 text-[10px] font-mono mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs text-slate-400 leading-snug italic">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Orizzonte 2030 */}
      <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/30">
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Orizzonte 2030</span>
        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
          Capannone autonomo · V32 in produzione MIMS · EVA genera cashflow · YouTube 47k+
          <span className="block text-[10px] text-slate-600 mt-1 font-mono">
            "0.008 mm. Display. Luglio 2030. Finestre industriali. Luce."
          </span>
        </p>
      </div>

    </div>
  );
}
