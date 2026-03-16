// CellShell.tsx | ECOSYSTEM_OS | v2.2 | 2026-03-16
// Wrapper per ogni cella draggabile della griglia
// v2.1: fullscreen via ReactDOM.createPortal → esce dalla gerarchia transform di react-grid-layout
import { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minimize2 } from "lucide-react";

type CellColor = "emerald" | "cyan" | "indigo" | "amber" | "rose" | "slate";

interface CellShellProps {
  title: string;
  icon: ReactNode;
  color?: CellColor;
  children: ReactNode;
  mono?: string;         // etichetta mono a destra
  noPad?: boolean;       // disabilita padding body
  lastUpdated?: string;  // data ultimo aggiornamento (ISO o stringa libera)
}

/** Formatta una data ISO in "16 mar" — compatto per l'header */
function fmtDate(raw: string): string {
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "short" })
             .replace(".", "").toLowerCase();
  } catch {
    return raw;
  }
}

const colorMap: Record<CellColor, { text: string; border: string; dot: string }> = {
  emerald: { text: "text-emerald-400", border: "border-emerald-500/20 hover:border-emerald-500/50", dot: "bg-emerald-500" },
  cyan:    { text: "text-cyan-400",    border: "border-cyan-500/20 hover:border-cyan-500/50",       dot: "bg-cyan-500"    },
  indigo:  { text: "text-indigo-400",  border: "border-indigo-500/20 hover:border-indigo-500/50",   dot: "bg-indigo-400"  },
  amber:   { text: "text-amber-400",   border: "border-amber-500/20 hover:border-amber-500/50",     dot: "bg-amber-500"   },
  rose:    { text: "text-rose-400",    border: "border-rose-500/20 hover:border-rose-500/50",       dot: "bg-rose-500"    },
  slate:   { text: "text-slate-400",   border: "border-slate-700 hover:border-slate-600",           dot: "bg-slate-500"   },
};

export const CellShell = ({
  title, icon, color = "slate", children, mono, noPad = false, lastUpdated,
}: CellShellProps) => {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[color];

  // ESC chiude l'overlay
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [expanded]);

  // Header riusabile in modalità normale e fullscreen
  const Header = ({ full }: { full: boolean }) => (
    <div className="cell-drag-handle flex items-center gap-2 px-3 py-2 border-b border-slate-800 flex-shrink-0">
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      <span className={`text-[9px] font-mono uppercase tracking-[0.18em] ${c.text}`}>{title}</span>
      <div className={`${mono || lastUpdated ? "" : "ml-auto"} flex gap-1 items-center`}>
        {mono && (
          <span className="text-[8px] font-mono text-slate-600 uppercase tracking-wider ml-auto mr-1">{mono}</span>
        )}
        {lastUpdated && (
          <span
            className="text-[7px] font-mono text-slate-700 uppercase tracking-wider ml-auto mr-1 border border-slate-800 rounded px-1 py-0.5"
            title={`Aggiornato: ${lastUpdated}`}
          >
            upd {fmtDate(lastUpdated)}
          </span>
        )}
        {/* Grip dots — nascosti in fullscreen */}
        {!full && [0, 1, 2].map((i) => (
          <div key={i} className="w-0.5 h-3 rounded-full bg-slate-700" />
        ))}
      </div>
      <div className={`${c.text} opacity-60 ml-0.5`}>{icon}</div>
      {/* Expand / Minimize */}
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!full); }}
        className="ml-1 text-slate-600 hover:text-slate-300 transition-colors flex-shrink-0"
        title={full ? "Riduci" : "Espandi a tutta pagina"}
      >
        {full ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
      </button>
    </div>
  );

  return (
    <>
      {/* ── CELLA NORMALE ───────────────────────────────────── */}
      <div className={`h-full flex flex-col bg-slate-900/90 border rounded-xl overflow-hidden transition-colors duration-200 ${c.border}`}>
        <Header full={false} />
        <div className={`flex-1 overflow-y-auto scrollbar-thin ${noPad ? "" : "p-4"}`}>
          {children}
        </div>
      </div>

      {/* ── OVERLAY FULLSCREEN via Portal → esce da transform/overflow parent ── */}
      {expanded && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col"
          style={{ animation: "cellExpand 0.14s ease-out" }}
        >
          <style>{`@keyframes cellExpand { from { opacity:0; transform:scale(0.98) } to { opacity:1; transform:scale(1) } }`}</style>
          <div className="flex-shrink-0 bg-slate-900/95 border-b border-slate-800">
            <Header full={true} />
            <div className="px-3 pb-1 text-[7px] font-mono text-slate-700 tracking-widest">
              ESC per chiudere
            </div>
          </div>
          <div className={`flex-1 overflow-y-auto scrollbar-thin min-h-0 ${noPad ? "" : "p-6"}`}>
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
