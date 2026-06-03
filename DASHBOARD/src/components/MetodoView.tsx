// MetodoView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-03
// Vista METODO — "chi siamo, cosa, come". Nata dalle domande di un dev esterno
// (sessione 02/06/2026): la spiegazione più chiara mai data del perché il sistema
// è inusuale — markdown come fonte + vettori, non un database classico.
// Additiva: non tocca nessun'altra view. Numeri verificati dal repo il 03/06/2026.

import { type ReactNode } from "react";

const ACCENT = {
  matteo:  "#34d399",
  themis:  "#22d3ee",
  loop:    "#fbbf24",
  stack:   "#a78bfa",
};

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl md:text-4xl font-black tabular-nums leading-none"
            style={{ color: color ?? "#fff" }}>{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1.5">{label}</span>
    </div>
  );
}

function Step({ n, color, title, children }: { n: string; color: string; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-[11px] font-black font-mono tabular-nums"
           style={{ borderColor: color + "55", color, background: color + "0d" }}>{n}</div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="text-sm font-bold text-slate-200">{title}</div>
        <p className="text-[13px] text-slate-400 leading-snug mt-1">{children}</p>
      </div>
    </div>
  );
}

export function MetodoView() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-20">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400/80">Come funziona</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] text-white">
            Il metodo
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            La maggior parte dei software tiene i dati in un database. Qui no.
            TITANIUM_OS è costruito su <span className="text-white font-semibold">testo leggibile</span> e
            <span className="text-cyan-400 font-semibold"> memoria che si rigenera</span> —
            un sistema pensato per essere usato da una persona e da un'AI, insieme.
          </p>
        </section>

        {/* ── CHI LAVORA QUI ───────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Chi lavora qui</div>
          <h2 className="text-2xl font-black text-white">Due mani, un cervello condiviso</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-5 py-4">
              <div className="text-base font-black" style={{ color: ACCENT.matteo }}>Matteo</div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-600 mt-0.5">l'artigiano</div>
              <p className="text-[13px] text-slate-400 leading-relaxed mt-2">
                Costruisce nel mondo fisico: salda, frese, decide. Ogni cosa che fa in officina
                diventa una traccia scritta che il sistema conserva.
              </p>
            </div>
            <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/5 px-5 py-4">
              <div className="text-base font-black" style={{ color: ACCENT.themis }}>THEMIS</div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-600 mt-0.5">l'agente AI</div>
              <p className="text-[13px] text-slate-400 leading-relaxed mt-2">
                Non è una chat: vive nel terminale, legge e modifica i file veri, fa i commit,
                e all'avvio rilegge dove eravamo. Lavora <em>dentro</em> il progetto, non accanto.
              </p>
            </div>
          </div>
        </section>

        {/* ── IL PRINCIPIO INUSUALE ────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Il principio inusuale</div>
          <h2 className="text-2xl font-black text-white">I dati sono testo, non un database</h2>
          <p className="text-[15px] text-slate-300 leading-relaxed">
            La fonte di verità sono <span className="text-white font-semibold">file di testo</span> (Markdown):
            decisioni d'officina, note, documentazione, perfino la memoria dell'AI. Un file di testo
            lo leggi tu, lo leggo io, lo legge Git — e non resta intrappolato in un formato proprietario.
          </p>
          <p className="text-[14px] text-slate-400 leading-relaxed border-l-2 border-cyan-500/40 pl-4 italic">
            C'è un database, ma non comanda lui: è un <span className="text-slate-200">indice rigenerabile</span>.
            Se lo cancelli, si ricostruisce dai file in venti secondi. Il manoscritto sono i file;
            il database è solo l'indice analitico generato dal manoscritto.
          </p>
        </section>

        {/* ── COME RICORDA (RAG) ───────────────────────────────────── */}
        <section className="space-y-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Come ricorda</div>
          <h2 className="text-2xl font-black text-white">Cercare per significato, non per parola</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-1">
            <Stat value="146" label="documenti" color={ACCENT.themis} />
            <Stat value="6.518" label="frammenti" color={ACCENT.themis} />
            <Stat value="384" label="numeri / frammento" color={ACCENT.themis} />
            <Stat value="3" label="livelli memoria" color={ACCENT.themis} />
          </div>
          <div className="space-y-4">
            <Step n="1" color={ACCENT.themis} title="Spezza">
              I documenti vengono divisi in migliaia di piccoli frammenti.
            </Step>
            <Step n="2" color={ACCENT.themis} title="Traduce in significato">
              Ogni frammento diventa un vettore — una sequenza di numeri che ne cattura il <em>senso</em>, non solo le parole.
            </Step>
            <Step n="3" color={ACCENT.themis} title="Ritrova per vicinanza">
              Quando fai una domanda, anche lei diventa un vettore: il sistema trova i frammenti
              più vicini di significato. Così ricorda anche se cerchi con parole diverse.
            </Step>
          </div>
        </section>

        {/* ── IL LOOP ──────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Il motore</div>
          <h2 className="text-2xl font-black text-white">Un input, tanti output</h2>
          <p className="text-[15px] text-slate-300 leading-relaxed">
            La regola è la leva: <span className="text-white font-semibold">cattura mentre costruisci</span>.
            Un solo milestone fisico genera in automatico un episodio, un reel, un dato di training
            e nuova conoscenza per l'AI.
          </p>
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-mono">
              <span className="text-amber-300 font-bold">officina</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">nota Markdown</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">indice (RAG)</span>
              <span className="text-slate-600">→</span>
              <span className="text-cyan-300">l'AI sa di più</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">output migliore</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-300 font-bold">officina più capace</span>
            </div>
          </div>
          <p className="text-[14px] text-slate-400 leading-relaxed">
            È <span className="text-white">meta-ricorsivo</span>: TITANIUM_OS gestisce la costruzione di TITANIUM_OS.
            Il lavoro fisico alimenta il sistema digitale, che rende il lavoro fisico più capace. Il loop è il prodotto.
          </p>
        </section>

        {/* ── LO STACK ─────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Sotto il cofano</div>
          <h2 className="text-2xl font-black text-white">Due linguaggi, una memoria versionata</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-1">
            <Stat value="70" label="file Python · backend" color={ACCENT.stack} />
            <Stat value="46" label="file React · interfaccia" color={ACCENT.stack} />
            <Stat value="132" label="documenti Markdown" color={ACCENT.stack} />
            <Stat value="100%" label="su Git" color={ACCENT.stack} />
          </div>
          <p className="text-[14px] text-slate-400 leading-relaxed">
            <span className="text-slate-200">Python</span> è il cervello (motori, ricerca, automazioni),
            <span className="text-slate-200"> React</span> è la sala di controllo che stai guardando,
            <span className="text-slate-200"> Git</span> è la memoria che non dimentica nulla.
            Nessun segreto resta in chiaro: le chiavi vivono in uno store cifrato, fuori dal codice.
          </p>
        </section>

        {/* ── CLOSING ──────────────────────────────────────────────── */}
        <section className="border-t border-slate-800 pt-10 pb-6">
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <p className="text-lg text-slate-200 leading-relaxed font-medium">
              «Non ricordare — documenta. Il sistema lo recupera domani.»
            </p>
            <p className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/70 mt-3">— il compounding del sapere</p>
          </div>
          <div className="text-[11px] font-mono text-slate-700 mt-6">TITANIUM_OS · il metodo · documentato mentre si costruisce</div>
        </section>

      </div>
    </div>
  );
}
