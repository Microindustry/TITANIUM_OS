// PilastroEconomiaCard.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-09
// La "QUALITÀ" di un pilastro (ordine Matteo #57): il prodotto economico che può
// generare per gli altri. UNIFICA pilastro ↔ pitch ↔ valore in un posto solo:
// dato economico DERIVATO da valoreData.json (fonte unica MENTE, pattern au18)
// + scorciatoie al pitch del pilastro e al quadro VALORE completo.

import { Euro, Presentation, ArrowRight } from "lucide-react";
import { useUIStore, type ViewMode } from "../stores/systemStore";
import valore from "../data/valoreData.json";

// mappa pilastro → (prefisso titolo in valoreData, vista pitch dedicata)
const MAP: Record<string, { prefix: string; pitch: ViewMode }> = {
  v32:      { prefix: "V32",      pitch: "pitch-v32" },
  mims:     { prefix: "MIMS",     pitch: "pitch-mims" },
  genesis:  { prefix: "GENESIS",  pitch: "pitch-genesis" },
  eva:      { prefix: "EVA",      pitch: "pitch-eva" },
  nina:     { prefix: "NINA",     pitch: "pitch-nina" },
  identity: { prefix: "CV VIVO",  pitch: "pitch-hr" },
};

const NATURA_COLORS = { cassa: "#34d399", molt: "#22d3ee", ip: "#fbbf24" };

function naturaColor(naturaTesto: string): string {
  const t = (naturaTesto || "").toLowerCase();
  if (t.includes("cassa breve")) return NATURA_COLORS.cassa;
  if (t.includes("moltiplicatore")) return NATURA_COLORS.molt;
  return NATURA_COLORS.ip;
}

export function PilastroEconomiaCard({ pilastro }: { pilastro: string }) {
  const navigateTo = useUIStore(s => s.navigateTo);
  const m = MAP[pilastro];
  const p = m && valore.pilastri.find(x => x.titolo.toUpperCase().startsWith(m.prefix));
  if (!m || !p) return null;
  const color = naturaColor(p.natura || "");

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
         style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Euro size={13} style={{ color }} />
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
          Valore — cosa genera per gli altri
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-700/40 to-transparent" />
        <button onClick={() => navigateTo(m.pitch)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 border border-slate-700
                     bg-slate-800/60 hover:border-slate-500 transition-all">
          <Presentation size={10} className="text-slate-300" />
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wide">Pitch</span>
        </button>
        <button onClick={() => navigateTo("valore")}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 border border-emerald-500/30
                     bg-emerald-500/10 hover:bg-emerald-500/20 transition-all">
          <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wide">Quadro VALORE</span>
          <ArrowRight size={10} className="text-emerald-400" />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-[12px] text-slate-300 leading-relaxed">
          <b className="text-slate-100">Valore per chi lo usa:</b> {p.valore}
        </p>
        {p.prodotto && (
          <p className="text-[12px] text-slate-300 leading-relaxed">
            <b className="text-slate-100">Prodotto economico:</b> {p.prodotto}
          </p>
        )}
        {p.natura && (
          <p className="text-[11px] leading-relaxed" style={{ color }}>{p.natura}</p>
        )}
      </div>
      <p className="text-[8px] font-mono text-slate-600 mt-3">
        derivato dal doc VALORE (fonte unica MENTE) — si aggiorna con sync_valore.py
      </p>
    </div>
  );
}
