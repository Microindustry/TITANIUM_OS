// ValoreCard.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-08
// Card home VALORE — che cosa vende ogni pilastro + IL MOTORE (grafo→mappa→Nina).
// DERIVATA: legge valoreData.json generato da AUTOMATIONS/tools/sync_valore.py
// dal doc fonte unica MENTE/SESSIONI/2026-07-08_valore-per-pilastro.md (pattern au18).
// Non scrivere contenuti qui dentro: si cambia il doc, si rilancia sync_valore.py.

import { useState } from "react";
import { ChevronDown, Quote, Network, Map, Sparkles, Euro, ArrowRight } from "lucide-react";
import { useUIStore } from "../stores/systemStore";
import valore from "../data/valoreData.json";

const STRATO_ICONS = [Network, Map, Sparkles];

const NATURA_COLORS: Record<string, string> = {
  "Vendono ore/servizi ORA": "#34d399",
  "Vendono prodotto/IP DOPO": "#fbbf24",
  "Moltiplicano il valore degli altri": "#22d3ee",
};

function naturaColor(naturaTesto: string): string {
  const t = naturaTesto.toLowerCase();
  if (t.includes("cassa breve")) return NATURA_COLORS["Vendono ore/servizi ORA"];
  if (t.includes("moltiplicatore")) return NATURA_COLORS["Moltiplicano il valore degli altri"];
  return NATURA_COLORS["Vendono prodotto/IP DOPO"];
}

function PilastroRow({ p }: { p: (typeof valore.pilastri)[number] }) {
  const [open, setOpen] = useState(false);
  const color = naturaColor(p.natura || "");
  return (
    <button onClick={() => setOpen(o => !o)}
      className="text-left w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2.5 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="text-[12px] font-bold text-slate-100 flex-1 min-w-0">{p.titolo}</span>
        <ChevronDown size={12} className={`flex-shrink-0 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <div className="mt-2 pt-2 border-t border-white/5 space-y-1.5">
          <p className="text-[11px] text-slate-400 leading-relaxed"><span className="font-bold text-slate-300">Valore:</span> {p.valore}</p>
          {p.prodotto && <p className="text-[11px] text-slate-400 leading-relaxed"><span className="font-bold text-slate-300">Prodotto:</span> {p.prodotto}</p>}
          {p.natura && <p className="text-[10px] leading-relaxed" style={{ color }}>{p.natura}</p>}
        </div>
      )}
    </button>
  );
}

export function ValoreCard() {
  const [msgOpen, setMsgOpen] = useState(false);
  const navigateTo = useUIStore(s => s.navigateTo);
  return (
    <div className="bg-slate-900/60 border border-slate-700/30 rounded-2xl p-4 space-y-4">
      {/* header */}
      <div className="flex items-center gap-3 flex-wrap">
        <Euro size={13} className="text-emerald-400" />
        <span className="text-[7px] font-mono text-slate-600 uppercase tracking-[0.3em]">
          Valore — cosa vende ognuno · deciso 08/07/2026
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-700/40 to-transparent" />
        <button onClick={() => navigateTo("valore")}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 border border-emerald-500/30
                     bg-emerald-500/10 hover:bg-emerald-500/20 transition-all">
          <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wide">Quadro completo</span>
          <ArrowRight size={10} className="text-emerald-400" />
        </button>
      </div>

      {/* IL MOTORE — la lezione */}
      <div>
        <div className="text-[11px] font-black text-white uppercase tracking-wide mb-2">
          Il Motore <span className="text-slate-500 font-normal normal-case">— HR non è un CV: è una piattaforma a 3 strati, per chiunque, in ogni settore</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {valore.motore.strati.map((s, i) => {
            const Icon = STRATO_ICONS[i] ?? Network;
            return (
              <div key={s.nome} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={12} className="text-cyan-300" />
                  <span className="text-[10px] font-bold text-cyan-200 uppercase tracking-wide">{s.nome.replace(/\.$/, "")}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">{s.testo}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
          <p className="text-[10px] text-amber-200/90 leading-relaxed">
            <span className="font-bold uppercase text-amber-300">Legge:</span> {valore.motore.legge}
          </p>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed mt-2">{valore.motore.loop}</p>
      </div>

      {/* Il messaggio di Matteo */}
      <button onClick={() => setMsgOpen(o => !o)}
        className="text-left w-full rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 hover:border-emerald-500/40 transition-all">
        <div className="flex items-center gap-2">
          <Quote size={12} className="text-emerald-400 flex-shrink-0" />
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wide flex-1">
            Il messaggio fondante (Matteo, 08/07/2026)
          </span>
          <ChevronDown size={12} className={`flex-shrink-0 text-emerald-600 transition-transform ${msgOpen ? "rotate-180" : ""}`} />
        </div>
        <p className={`text-[10px] text-emerald-100/70 leading-relaxed mt-1.5 font-mono ${msgOpen ? "" : "line-clamp-2"}`}>
          "{valore.messaggio_matteo.testo}"
        </p>
      </button>

      {/* Le 3 nature economiche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {valore.frame.map(f => (
          <div key={f.natura} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <div className="text-[9px] font-bold uppercase tracking-wide mb-1" style={{ color: NATURA_COLORS[f.natura] ?? "#94a3b8" }}>
              {f.natura}
            </div>
            <div className="text-[11px] font-bold text-slate-200">{f.pilastri}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{f.orizzonte}</div>
          </div>
        ))}
      </div>

      {/* I pilastri, espandibili */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {valore.pilastri.map(p => <PilastroRow key={p.titolo} p={p} />)}
      </div>

      <p className="text-[8px] font-mono text-slate-600">
        fonte unica: {valore._fonte_unica} · derivata da sync_valore.py · {valore._generato_il}
      </p>
    </div>
  );
}
