// NinaCvView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-16
// Il CV di Nina — l'albero delle abilità che si riempie man mano nascono gli episodi.
// Gemello della Mappa di Nina (un albero, due viste). Data-driven dagli episodi (asse_nina):
// ogni episodio "adattato" = casella sbloccata; i giri della spirale = i livelli.

import { Sparkles } from "lucide-react";
import { EPISODES } from "../data/storieData";

const NINA_REG: Record<number, string> = {
  0: "La Materia", 1: "La Traccia", 2: "L'Officina che gira sola", 3: "La Mente che parla",
  4: "La Biblioteca delle Fonti", 5: "La Grande Mappa", 6: "L'Esercito Silenzioso", 7: "Il Direttore",
};
const NINA_FIN: Record<number, string> = {
  1: "Il Valore", 2: "Spendere meno di quanto entra", 3: "Il Cuscinetto", 4: "Far lavorare i soldi",
};
const GIRO: Record<number, string> = { 1: "#34d399", 2: "#22d3ee", 3: "#a78bfa" };
const giroColor = (g: number) => GIRO[Math.min(Math.max(g, 1), 3)] ?? "#34d399";

type NinaSkill = { concetto: string; giro: number; scritto: boolean };
type NinaDominio = { icon: string; nome: string; chiave: string; skills: NinaSkill[] };

function buildNinaCV(): { domini: NinaDominio[]; scritti: number; totali: number } {
  const domini: NinaDominio[] = [];
  let scritti = 0;
  let totali = 0;
  const add = (verticale: string, regioni: Record<number, string>, icon: string) => {
    for (const n of Object.keys(regioni).map(Number).sort((a, b) => a - b)) {
      const eps = EPISODES
        .filter(e => !e.parent_id
          && (e.narrativa?.asse_nina?.verticale ?? "tech") === verticale
          && e.narrativa?.asse_nina?.regione === n)
        .sort((a, b) => (a.narrativa?.asse_nina?.giro_spirale ?? 1) - (b.narrativa?.asse_nina?.giro_spirale ?? 1));
      if (!eps.length) continue;
      const skills: NinaSkill[] = eps.map(e => {
        const sc = e.narrativa?.asse_nina?.stato_nina === "adattato";
        totali++;
        if (sc) scritti++;
        return { concetto: e.narrativa?.asse_nina?.concetto ?? e.title, giro: e.narrativa?.asse_nina?.giro_spirale ?? 1, scritto: sc };
      });
      domini.push({ icon, nome: regioni[n] ?? `Regione ${n}`, chiave: `${verticale}-${n}`, skills });
    }
  };
  add("tech", NINA_REG, "⟡");
  add("finanza", NINA_FIN, "₣");
  return { domini, scritti, totali };
}

export function NinaCvView() {
  const cv = buildNinaCV();
  const pct = cv.totali ? Math.round((cv.scritti / cv.totali) * 100) : 0;
  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">

        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-pink-400/80 flex items-center gap-1.5">
              <Sparkles size={11} className="text-pink-400" /> CV di Nina · albero delle abilità
            </div>
            <h1 className="text-2xl font-black text-white mt-1">Le abilità di Nina</h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-pink-300 tabular-nums">{pct}%</div>
            <div className="text-[10px] font-mono text-slate-500">{cv.scritti}/{cv.totali} caselle</div>
          </div>
        </div>

        <p className="text-[13px] text-slate-400 leading-relaxed max-w-2xl">
          Stesso motore del CV di Matteo, ma per Nina: ogni episodio scritto <span className="text-slate-200">sblocca una casella</span>.
          È il <span className="text-pink-300">gemello della Mappa di Nina</span> — lì la navighi come luoghi (tipo Skyrim), qui la leggi come abilità. Si aggiorna da solo man mano che nascono gli episodi.
        </p>

        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-500 to-emerald-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-1">
          {cv.domini.map(d => (
            <div key={d.chiave} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5">
              <div className="text-[12px] font-bold text-slate-200 mb-2.5">{d.icon} {d.nome}</div>
              <div className="flex flex-wrap gap-1.5">
                {d.skills.map((s, i) => (
                  <span key={i}
                    className="text-[10px] font-mono px-2 py-1 rounded-lg border flex items-center gap-1.5"
                    style={s.scritto
                      ? { borderColor: giroColor(s.giro) + "66", color: "#e2e8f0", background: "#1e293b66" }
                      : { borderColor: "#33415544", color: "#64748b", background: "transparent" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.scritto ? giroColor(s.giro) : "#475569" }} />
                    {s.concetto}{s.giro > 1 && <span className="opacity-60">·g{s.giro}</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[9px] font-mono text-slate-600 pt-1">colore = giro/profondità · pieno = sbloccato · tenue = da scrivere — un solo albero, due viste (mappa + abilità).</p>
      </div>
    </div>
  );
}
