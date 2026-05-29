// MacroCard.tsx | TITANIUM_OS / DASHBOARD / components | v1.0 | 2026-05-29
// Componente generico espandibile — usato in CanvasLayout per le 4 sezioni home

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type MacroCardProps = {
  icon: React.ElementType;
  color: string;
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function MacroCard({ icon: Icon, color, title, summary, defaultOpen = false, children }: MacroCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800/40 transition-colors"
        style={{ minHeight: 56 }}
      >
        <Icon size={15} style={{ color }} className="flex-shrink-0" />
        <span className="text-[11px] font-mono uppercase tracking-widest flex-shrink-0" style={{ color }}>
          {title}
        </span>
        {summary && (
          <span className="ml-2 text-[10px] font-mono text-slate-600 truncate hidden sm:block">{summary}</span>
        )}
        <span className="ml-auto text-slate-600 flex-shrink-0">
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </button>
      {open && (
        <div className="border-t border-slate-800 px-5 pb-5 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
