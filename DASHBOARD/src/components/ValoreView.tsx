// ValoreView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-09
// Vista VALORE — il luogo unico della lezione del 08/07: IL MOTORE (grafo→mappa→Nina),
// le 3 nature economiche, ogni pilastro con valore/prodotto, cosa NON promettiamo.
// DERIVATA da valoreData.json (sync_valore.py ← doc fonte unica in MENTE, pattern au18).
// Non scrivere contenuti qui: si cambia il doc in MENTE, si rilancia sync_valore.py.

import { Quote, Network, Map, Sparkles, Euro, ShieldAlert, Repeat } from "lucide-react";
import valore from "../data/valoreData.json";

const STRATO_ICONS = [Network, Map, Sparkles];

const NATURA_COLORS: Record<string, string> = {
  "Vendono ore/servizi ORA": "#34d399",
  "Vendono prodotto/IP DOPO": "#fbbf24",
  "Moltiplicano il valore degli altri": "#22d3ee",
};

function naturaColor(naturaTesto: string): string {
  const t = (naturaTesto || "").toLowerCase();
  if (t.includes("cassa breve")) return NATURA_COLORS["Vendono ore/servizi ORA"];
  if (t.includes("moltiplicatore")) return NATURA_COLORS["Moltiplicano il valore degli altri"];
  return NATURA_COLORS["Vendono prodotto/IP DOPO"];
}

export function ValoreView() {
  return (
    <div className="h-full overflow-y-auto bg-[var(--shell-bg)]" style={{ animation: "nl-fadeUp 0.3s ease both" }}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* ── HEADER ── */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Euro size={16} className="text-emerald-400" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em]">
              Valore per pilastro — deciso 08/07/2026 · fonte unica in MENTE
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Che cosa vende ognuno<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-[13px] text-slate-400 mt-2 leading-relaxed max-w-2xl">
            Da dove entrano i soldi oggi, dove sta il tetto alto domani, e perché i
            moltiplicatori non si misurano in euro diretti. Al centro: <b className="text-slate-200">IL MOTORE</b> —
            la lezione più importante che il sistema ha imparato su se stesso.
          </p>
        </div>

        {/* ── IL MESSAGGIO FONDANTE ── */}
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Quote size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
              Il messaggio fondante — Matteo, {valore.messaggio_matteo.data}
            </span>
          </div>
          <p className="text-[12px] text-emerald-100/80 leading-relaxed font-mono whitespace-pre-wrap">
            "{valore.messaggio_matteo.testo}"
          </p>
          <p className="text-[10px] text-emerald-400/60 mt-3 italic">
            Trascritto verbatim. È la definizione del MOTORE: HR non è un CV — è una
            piattaforma per chiunque, in ogni settore.
          </p>
        </div>

        {/* ── IL MOTORE — 3 strati ── */}
        <div>
          <h2 className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-3">
            Il Motore — tre strati in simbiosi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {valore.motore.strati.map((s, i) => {
              const Icon = STRATO_ICONS[i] ?? Network;
              return (
                <div key={s.nome} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-black text-cyan-300">{i + 1}</span>
                    <Icon size={13} className="text-cyan-300" />
                  </div>
                  <div className="text-[12px] font-bold text-cyan-200 uppercase tracking-wide mb-1.5">
                    {s.nome.replace(/\.$/, "")}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{s.testo}</p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldAlert size={12} className="text-amber-400" />
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">La legge (non negoziabile)</span>
              </div>
              <p className="text-[11px] text-amber-100/80 leading-relaxed">{valore.motore.legge}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Repeat size={12} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Il loop generativo</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{valore.motore.loop}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 mt-3">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Vincolo anti-piattaforma</span>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5">{valore.motore.vincolo}</p>
          </div>
        </div>

        {/* ── LE 3 NATURE ECONOMICHE ── */}
        <div>
          <h2 className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-3">
            Le tre nature economiche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {valore.frame.map(f => (
              <div key={f.natura} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
                   style={{ borderTopColor: NATURA_COLORS[f.natura] ?? "#334155", borderTopWidth: 2 }}>
                <div className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: NATURA_COLORS[f.natura] ?? "#94a3b8" }}>
                  {f.natura}
                </div>
                <div className="text-[13px] font-bold text-slate-100">{f.pilastri}</div>
                <div className="text-[10px] text-slate-500 mt-1">{f.orizzonte}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── I PILASTRI ── */}
        <div>
          <h2 className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-3">
            I pilastri — valore e prodotto
          </h2>
          <div className="space-y-3">
            {valore.pilastri.map(p => {
              const color = naturaColor(p.natura || "");
              return (
                <div key={p.titolo} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-[13px] font-bold text-slate-100">{p.titolo}</span>
                  </div>
                  <div className="space-y-1.5 pl-4">
                    <p className="text-[12px] text-slate-400 leading-relaxed"><b className="text-slate-300">Valore:</b> {p.valore}</p>
                    {p.prodotto && <p className="text-[12px] text-slate-400 leading-relaxed"><b className="text-slate-300">Prodotto:</b> {p.prodotto}</p>}
                    {p.natura && <p className="text-[11px] leading-relaxed" style={{ color }}>{p.natura}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── COSA NON PROMETTIAMO ── */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
          <h2 className="text-[10px] font-bold text-rose-300 uppercase tracking-widest mb-2.5">
            Cosa NON promettiamo (onestà per il pitch)
          </h2>
          <ul className="space-y-1.5">
            {valore.non_promesse.map((n, i) => (
              <li key={i} className="text-[11px] text-rose-100/70 leading-relaxed flex gap-2">
                <span className="text-rose-400">·</span>{n}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[9px] font-mono text-slate-600 pb-4">
          fonte unica: {valore._fonte_unica} · derivata da sync_valore.py · {valore._generato_il}
        </p>
      </div>
    </div>
  );
}
