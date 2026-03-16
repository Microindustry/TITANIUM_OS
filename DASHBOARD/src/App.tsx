// App.tsx | TITANIUM_OS | v3.0 | 2026-03-10
// Shell principale: Header industriale + EcosystemLayout

import { useEffect, useState } from "react";
import { Activity, Zap } from "lucide-react";
import { CanvasLayout } from "./components/CanvasLayout";

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-[10px] font-mono text-slate-500 tabular-nums tracking-wider">
      {now.toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
      <span className="text-slate-700 mx-1">|</span>
      {now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-mono overflow-hidden">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="flex-shrink-0 h-11 border-b border-slate-800/60 px-4 flex items-center gap-4 bg-slate-950 relative">
        {/* Accent line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 border border-emerald-500/40 rounded flex items-center justify-center bg-emerald-500/5">
            <Zap size={12} className="text-emerald-400" />
          </div>
          <div className="leading-none">
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-100">TITANIUM</div>
            <div className="text-[7px] text-slate-600 tracking-[0.3em] uppercase">OS v2.1</div>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-800/60" />

        {/* Milestone */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-slate-400 uppercase tracking-[0.12em]">
            Config G — Rinforzi Z+U
          </span>
          <span className="text-[8px] text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">65%</span>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Activity size={10} className="text-emerald-500" />
            <span className="text-[8px] text-emerald-500/80 uppercase tracking-[0.2em]">live</span>
          </div>
          <Clock />
          <span className="text-[7px] text-slate-600 border border-slate-800/60 rounded px-1.5 py-0.5 tracking-wider">
            ASSOLUTO V6
          </span>
        </div>
      </header>

      {/* ── LAYOUT ────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        <CanvasLayout />
      </div>
    </div>
  );
}
