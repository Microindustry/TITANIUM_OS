// AvventuraMapView.tsx — la Mappa dell'Avventura (il mondo di Nina) a livelli
// parte di: TITANIUM_OS / DASHBOARD
// versione: 0.1 / data: 2026-06-09
// Vista navigabile (bozza) dal canone MONDO. Additiva: non tocca la MAPPA del sistema.

import { useState } from "react";
import { MONDO, REGIONI, type EpStato } from "../data/avventuraMapData";
import { useUIStore } from "../stores/systemStore";
import {
  Sparkles, ChevronDown, ChevronRight, MapPin, Users, Gem, ArrowRight, Mic,
} from "lucide-react";

const EP_STATO: Record<EpStato, { label: string; dot: string; text: string }> = {
  "scritto":     { label: "SCRITTO",     dot: "bg-emerald-400", text: "text-emerald-400" },
  "da-scrivere": { label: "DA SCRIVERE", dot: "bg-amber-400",   text: "text-amber-400" },
  "futuro":      { label: "PIÙ AVANTI",  dot: "bg-slate-600",   text: "text-slate-500" },
};

export function AvventuraMapView() {
  const navigate = useUIStore(s => s.navigateTo);
  const [open, setOpen] = useState<Set<number>>(() => new Set([1, 2, 3])); // regioni con episodi scritti
  const [mondoOpen, setMondoOpen] = useState(true);

  const toggle = (n: number) =>
    setOpen(prev => { const s = new Set(prev); s.has(n) ? s.delete(n) : s.add(n); return s; });

  return (
    <div className="h-full overflow-y-auto bg-[#0a0612]" style={{ animation: "nl-fadeUp 0.3s ease both" }}>
      <div className="max-w-4xl mx-auto px-6 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <Sparkles size={20} className="text-pink-400" />
          <h2 className="text-lg font-bold tracking-wide"
            style={{ background: "linear-gradient(90deg,#f59e0b,#ec4899,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            La Mappa dell'Avventura
          </h2>
          <button onClick={() => navigate("avventura")}
            className="ml-auto flex items-center gap-1.5 text-[9px] font-mono text-pink-400/70 hover:text-pink-300 uppercase tracking-wider border border-pink-500/20 hover:border-pink-500/40 rounded px-2 py-1 transition-all">
            <Mic size={9} /> tutti gli episodi
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-1 ml-8">
          Il viaggio di Nina tra le 7 Regioni — la storia dell'IA, ogni tappa ancorata a un pezzo reale del progetto.
        </p>
        {/* le due Terre: Atomi (caldo) ↔ Bit (freddo), cucite dalla Giuntura */}
        <div className="flex items-center gap-2 mb-5 ml-8 text-[9px] font-mono">
          <span className="text-amber-400/80">⬡ Atomi</span>
          <span className="flex-1 h-px max-w-[120px]" style={{ background: "linear-gradient(90deg,#f59e0b55,#22d3ee55)" }} />
          <span className="text-cyan-400/80">Bit ◇</span>
          <span className="text-slate-600 ml-2">· cuciti dalla Giuntura</span>
        </div>

        {/* LIVELLO 0 — IL MONDO */}
        <div className="rounded-xl border border-pink-500/20 bg-pink-500/[0.04] mb-5 overflow-hidden">
          <button onClick={() => setMondoOpen(v => !v)}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-white/[0.02]">
            <span className="text-pink-400">{mondoOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
            <span className="text-sm font-bold tracking-wider uppercase text-pink-300">Il Mondo · "{MONDO.titolo}"</span>
            <span className="ml-auto text-[10px] text-slate-500 italic hidden sm:block">{MONDO.sottotitolo}</span>
          </button>
          {mondoOpen && (
            <div className="px-5 pb-4 space-y-3">
              <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
                <div className="text-slate-400"><span className="text-slate-600 uppercase text-[9px] font-mono">legge</span><br />{MONDO.legge}</div>
                <div className="text-slate-400"><span className="text-slate-600 uppercase text-[9px] font-mono">nemico</span><br />{MONDO.nemico}</div>
                <div className="text-slate-400 sm:col-span-2"><span className="text-slate-600 uppercase text-[9px] font-mono">protagonisti</span><br />{MONDO.protagonisti}</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-1"><MapPin size={9} /> luoghi</div>
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {MONDO.luoghi.map(l => (
                    <div key={l.nome} className="text-[11px] text-slate-400">
                      <span className="text-slate-200 font-semibold">{l.nome}</span> — {l.desc}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Users size={9} /> il cast (nodi reali)</div>
                <div className="flex flex-wrap gap-1.5">
                  {MONDO.cast.map(c => (
                    <span key={c.nome} title={`${c.ruolo} — ${c.stato}`}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-400">
                      {c.nome}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LIVELLO 1+2 — LE 7 REGIONI */}
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2 ml-1">
          Le 7 Regioni — l'arco della storia dell'IA
        </div>
        <div className="space-y-2.5">
          {REGIONI.map(r => {
            const isOpen = open.has(r.n);
            return (
              <div key={r.n} className="rounded-xl border overflow-hidden"
                style={{ borderColor: isOpen ? r.colore + "55" : "rgba(30,41,59,0.7)", background: isOpen ? r.colore + "08" : "transparent" }}>
                {/* livello 1: la Regione */}
                <button onClick={() => toggle(r.n)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02]">
                  <span style={{ color: r.colore }}>{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-mono"
                    style={{ background: r.colore + "22", color: r.colore }}>{r.n}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-100">{r.nome}</div>
                    <div className="text-[10px] text-slate-500 italic">{r.tappa}</div>
                  </div>
                  <span className="ml-auto shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: r.colore + "1a", color: r.colore }}>
                    {r.pietra}
                  </span>
                </button>

                {/* livello 2: dentro la Regione */}
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 space-y-3">
                    <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="text-slate-300"><span className="text-slate-600 uppercase text-[9px] font-mono">per il bambino</span><br />{r.concetto}</div>
                      <div className="text-slate-400"><span className="text-slate-600 uppercase text-[9px] font-mono">vero dietro</span><br />{r.vero}</div>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <span className="text-slate-600 uppercase text-[9px] font-mono">pezzo reale</span> · {r.pezzoReale}
                    </div>

                    {/* episodi */}
                    <div>
                      <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Mic size={9} /> episodi di Nina</div>
                      <div className="space-y-1">
                        {r.episodi.map(ep => {
                          const st = EP_STATO[ep.stato];
                          const clickable = ep.stato === "scritto";
                          return (
                            <button key={ep.id} disabled={!clickable}
                              onClick={() => clickable && navigate("avventura")}
                              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-left border border-slate-800/60
                                ${clickable ? "hover:border-slate-600 hover:bg-slate-900/60 cursor-pointer" : "cursor-default opacity-80"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                              <span className="text-[11px] font-mono text-slate-500">{ep.id}</span>
                              <span className="text-xs text-slate-200">{ep.titolo}</span>
                              <span className={`text-[8px] font-mono font-bold tracking-wider ml-1 ${st.text}`}>{st.label}</span>
                              {clickable && <ArrowRight size={11} className="ml-auto text-slate-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* semi + pietre */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1">semi (episodi-fonte)</div>
                        <div className="flex flex-wrap gap-1">
                          {r.semi.map(s => <span key={s} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-500">{s}</span>)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1"><Gem size={9} /> pietre richiamate</div>
                        <div className="flex flex-wrap gap-1">
                          {r.pietreRichiamate.length
                            ? r.pietreRichiamate.map(p => <span key={p} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-400">{p}</span>)
                            : <span className="text-[9px] text-slate-700 italic">nessuna (è la base)</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-slate-700 font-mono text-center mt-7">
          bozza · canone in CONTENT_ENGINE/DATABASE/MONDO/MAPPA_AVVENTURA.md — un gesto fatto bene fa più di un frutto.
        </p>
      </div>
    </div>
  );
}
