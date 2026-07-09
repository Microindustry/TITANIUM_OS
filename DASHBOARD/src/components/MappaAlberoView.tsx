// MappaAlberoView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-09
// LA MAPPA di Nina come ALBERO — "un ramo, grafo espandibile su livelli" (Matteo #57).
// INTEGRA le 3 mappe precedenti senza distruggerle (MappaView geo → deep-link
// mappa-geo; mappa-gioco e avventura-mappa restano raggiungibili): questa è la
// titolare. DERIVATA da buildNinaCV (stesso adapter del CV di Nina: un grafo,
// due lenti — qui LUOGHI del cammino, là ABILITÀ). La geografia ILLUSTRATA
// (blueprint-anime) va al prodotto: caroselli/sito, non alla dash.
// Layer-gioco v1: ogni regione ha la % che si colora + la PROSSIMA MISSIONE
// (la prima casella non ancora scritta) evidenziata.

import { useState } from "react";
import { Map, ChevronDown, Sparkles, Target } from "lucide-react";
import { buildNinaCV, giroColor, type NinaDominio } from "./NinaCvView";

function RegioneCard({ d }: { d: NinaDominio }) {
  const [open, setOpen] = useState(false);
  const fatte = d.skills.filter(s => s.scritto).length;
  const pct = d.skills.length ? Math.round((fatte / d.skills.length) * 100) : 0;
  const missione = d.skills.find(s => !s.scritto);
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full text-left p-4 hover:bg-slate-900/70 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-xl flex-shrink-0">{d.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-bold text-slate-100">{d.nome}</div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              {fatte}/{d.skills.length} caselle colorate
              {missione && <span className="text-pink-400/80"> · prossima: {missione.concetto}</span>}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-black tabular-nums" style={{ color: pct === 100 ? "#34d399" : "#ec4899" }}>{pct}%</div>
            <div className="w-20 h-1 rounded-full bg-slate-800 overflow-hidden mt-1">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct === 100 ? "#34d399" : "#ec4899" }} />
            </div>
          </div>
          <ChevronDown size={13} className={`flex-shrink-0 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {d.skills.map((s, i) => {
            const col = giroColor(s.giro);
            const isMissione = missione && s === missione;
            return (
              <div key={i}
                title={`${s.concetto} — giro ${s.giro}${s.scritto ? " · scritta" : isMissione ? " · PROSSIMA MISSIONE" : " · da scrivere"}`}
                className={`rounded-xl border p-3 ${s.scritto ? "bg-slate-900/60" : "bg-slate-950/40"} ${isMissione ? "ring-1 ring-pink-500/50" : ""}`}
                style={{ borderColor: s.scritto ? col + "55" : "#1e293b" }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: s.scritto ? col : "#334155" }} />
                  <span className={`text-[11px] font-semibold leading-tight ${s.scritto ? "text-slate-200" : "text-slate-500"}`}>
                    {s.concetto}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 ml-3.5">
                  <span className="text-[8px] font-mono px-1 rounded" style={{ color: col, background: col + "1a" }}>giro {s.giro}</span>
                  {isMissione && (
                    <span className="text-[8px] font-mono text-pink-400 flex items-center gap-0.5">
                      <Target size={8} /> missione
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function MappaAlberoView() {
  const cv = buildNinaCV();
  const pct = cv.totali ? Math.round((cv.scritti / cv.totali) * 100) : 0;
  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">

        {/* HERO — la mappa che si espande da sola */}
        <div className="relative rounded-2xl border border-pink-500/25 bg-gradient-to-br from-pink-500/[0.07] to-slate-900/60 p-6 overflow-hidden flex items-center justify-between gap-3 flex-wrap">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
               style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10), transparent 70%)" }} />
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-pink-400 flex items-center gap-1.5 mb-2">
              <Map size={11} className="text-pink-400" /> La Mappa · il cammino di Nina
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white leading-snug max-w-xl">
              Il mondo si espande da solo: ogni episodio colora una casella.
            </h1>
          </div>
          <div className="text-right relative">
            <div className="text-4xl md:text-5xl font-black text-pink-300 tabular-nums leading-none">{pct}%</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">{cv.scritti}/{cv.totali} caselle</div>
          </div>
        </div>

        <p className="text-[12px] text-slate-500 leading-relaxed flex items-center gap-1.5">
          <Sparkles size={11} className="text-pink-400/70 flex-shrink-0" />
          Stesso grafo del CV di Nina, lente diversa: là le abilità, qui i luoghi del cammino.
          Apri una regione per entrarci — la casella col mirino è la prossima missione.
        </p>

        {/* LE REGIONI — il ramo espandibile */}
        <div className="space-y-2.5">
          {cv.domini.map(d => <RegioneCard key={d.chiave} d={d} />)}
        </div>

        <p className="text-[9px] font-mono text-slate-700 pb-4">
          derivata da episodes.json (asse_nina) — si aggiorna da sola col loop notturno ·
          la geografia illustrata vive nel prodotto (caroselli/sito) · viste storiche: mappa-geo, mappa-gioco (CommandBar)
        </p>
      </div>
    </div>
  );
}
