// GiocoView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-09
// IL GIOCO — Real Life RPG: il dossier operativo in dash (modello PUBBLICAZIONI:
// cos'è + il come + lo stile + scaletta passo-passo con gate espliciti).
// Fonte unica: MENTE/KNOWLEDGE/MONDO/GIOCO/_DOSSIER.md (si cambia là, si riflette qua).

import { Gamepad2, Lock, Check, Target } from "lucide-react";

const MECCANICHE: Array<[string, string, "ok" | "da_validare"]> = [
  ["Mondo", "la Mappa: regioni → caselle (albero derivato, si colora da solo)", "ok"],
  ["Missione", "arrivare a una casella = attraversare il suo episodio", "ok"],
  ["Livelli", "i giri della spirale: stesso luogo, più a fondo", "ok"],
  ["Salvataggio", "il profilo che si colora — Nina nel bambino, CV nell'adulto (principio 9)", "ok"],
  ["XP", "giro 1 = 10 · giro 2 = 25 · giro 3 = 50; livello giocatore a soglie", "da_validare"],
  ["Collezionabili", "le Pietre ⟡ come achievement narrativi", "da_validare"],
];

const SCALETTA: Array<{ n: number; chi: "claude" | "insieme" | "futuro"; testo: string; fatto?: boolean }> = [
  { n: 1, chi: "claude",  testo: "Dossier in MENTE + questa vista", fatto: true },
  { n: 2, chi: "insieme", testo: "Validare le meccaniche v1 (XP, Pietre, nome dei livelli) — 15 min" },
  { n: 3, chi: "claude",  testo: "XP + livello DERIVATI nell'albero (Mappa e CV di Nina)" },
  { n: 4, chi: "insieme", testo: "EP_N2_03 col formato doppio — il primo episodio che dichiara la sua missione" },
  { n: 5, chi: "claude",  testo: "La slide-mappa nel template carosello (poster del mondo, blueprint-anime)" },
  { n: 6, chi: "claude",  testo: "Pagina GIOCO sul sito Nina (quando parte GitHub Pages — scaletta pubblicazioni)" },
  { n: 7, chi: "insieme", testo: "La mappa STAMPABILE (MakerSkillTree-style): il bambino colora a mano" },
  { n: 8, chi: "futuro",  testo: "Il salvataggio del lettore — profilo per chi gioca (motore HR multi-persona)" },
];

const CHI_STYLE = {
  claude:  { label: "CLAUDE",  cls: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" },
  insieme: { label: "INSIEME", cls: "text-amber-300 border-amber-500/30 bg-amber-500/10" },
  futuro:  { label: "FUTURO",  cls: "text-slate-500 border-slate-700 bg-slate-800/40" },
};

export function GiocoView() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* HERO — la regola del gioco */}
        <div className="relative rounded-2xl border border-pink-500/25 bg-gradient-to-br from-pink-500/[0.07] to-slate-900/60 p-6 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
               style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10), transparent 70%)" }} />
          <div className="flex items-center gap-2 mb-3">
            <Gamepad2 size={13} className="text-pink-400" />
            <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-[0.3em]">Il Gioco · Real Life RPG</span>
            <div className="h-px flex-1 bg-gradient-to-r from-pink-500/30 to-transparent" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-white leading-snug max-w-3xl">
            Arrivare a una casella è una <span className="text-pink-300">missione</span>,
            completarla è un <span className="text-pink-300">level-up</span> —
            e il salvataggio è il profilo che si colora.
          </p>
          <p className="text-[12px] text-slate-400 leading-relaxed mt-3 max-w-3xl">
            Non un'app separata: un layer sul motore (grafo → mappa → guida). Due giocatori,
            un motore: Nina dentro il racconto, il lettore nel prodotto — e per l'adulto si
            chiama CV vivo. Si sviluppa passo passo, come Pubblicazioni.
          </p>
        </div>

        {/* MECCANICHE v1 */}
        <section>
          <h2 className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-3">Il come — meccaniche v1</h2>
          <div className="space-y-2">
            {MECCANICHE.map(([nome, testo, stato]) => (
              <div key={nome} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 flex items-start gap-3">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                  stato === "ok" ? "text-emerald-300 bg-emerald-500/10" : "text-amber-300 bg-amber-500/10"}`}>
                  {stato === "ok" ? "C'È" : "DA VALIDARE"}
                </span>
                <p className="text-[12px] text-slate-300 leading-relaxed">
                  <b className="text-slate-100">{nome}:</b> {testo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* LO STILE */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-2.5">Lo stile — le regole</h2>
          <ul className="space-y-1.5 text-[12px] text-slate-400 leading-relaxed">
            <li>· Il mondo illustrato SOLO in qualità <b className="text-slate-200">blueprint-anime</b> (caroselli/sito) — mai più triangoli o serpentoni in dash</li>
            <li>· In dash vive <b className="text-slate-200">l'albero onesto</b>, derivato, che si colora da solo</li>
            <li>· Riferimenti (ricognizione GitHub): <b className="text-slate-200">MakerSkillTree</b> (stampabile per bambini!), SkillTreeOSS/NSA per le meccaniche</li>
          </ul>
        </section>

        {/* SCALETTA */}
        <section>
          <h2 className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-3">La scaletta — passo passo</h2>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
            {SCALETTA.map((s, i) => {
              const chi = CHI_STYLE[s.chi];
              return (
                <div key={s.n} className={`flex items-center gap-3 p-3 ${i > 0 ? "border-t border-slate-800/60" : ""}`}>
                  <span className="w-6 h-6 rounded-lg border border-slate-700 flex items-center justify-center text-[10px] font-black font-mono text-slate-400 flex-shrink-0">{s.n}</span>
                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${chi.cls}`}>
                    {s.chi === "insieme" && <Lock size={7} className="inline mr-0.5 -mt-0.5" />}{chi.label}
                  </span>
                  <p className={`text-[12px] leading-relaxed flex-1 ${s.fatto ? "text-slate-500 line-through decoration-slate-700" : "text-slate-300"}`}>{s.testo}</p>
                  {s.fatto ? <Check size={13} className="text-emerald-400 flex-shrink-0" />
                           : s.n === 2 ? <Target size={13} className="text-pink-400 flex-shrink-0" /> : null}
                </div>
              );
            })}
          </div>
          <p className="text-[9px] font-mono text-slate-700 mt-3">
            fonte unica: MENTE/KNOWLEDGE/MONDO/GIOCO/_DOSSIER.md · prossimo passo: il 2 (insieme, 15 min)
          </p>
        </section>
      </div>
    </div>
  );
}
