// CvView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-15
// Vista CV — la figura professionale di Matteo, navigabile a livelli (click = dettagli).
// Dati VERI da matteoData.ts. È la base da cui "studiare" il CV: poi verrà ingegnerizzato
// sfruttando il lavoro su Nina (CV-che-si-genera). Sostituisce il vecchio room="matteo".

import { useState, type ReactNode } from "react";
import { SKILLS_INDUSTRIA, SKILLS_DIGITAL, INTERESSI, PRINCIPI, COMPETENZE_UNITE, type Skill, type Interesse, type Livello } from "../data/matteoData";
import { Wrench, Cpu, Compass, Quote, ChevronDown, Mail, Layers, Sparkles } from "lucide-react";
import { EPISODES } from "../data/storieData";

const LIV: Record<Livello, { label: string; color: string }> = {
  "maestria":         { label: "maestria",    color: "#34d399" },
  "operativo":        { label: "operativo",   color: "#22d3ee" },
  "esplorazione":     { label: "esplorazione", color: "#a78bfa" },
  "in-apprendimento": { label: "in apprend.", color: "#fbbf24" },
};

// ── IL CV DI NINA = il gemello della Mappa di Nina, letto come abilità ──
// Stesso engine del profilo di Matteo (CV-che-si-genera): ogni episodio scritto
// sblocca una "casella". Data-driven dagli episodi reali (asse_nina) → si aggiorna
// da solo man mano che nascono. I giri della spirale = i livelli di profondità.
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

function SkillCard({ s, accent }: { s: Skill; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(o => !o)}
      className="text-left w-full rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[13px] font-bold text-slate-100">{s.label}</div>
          <div className="text-[10px] font-mono uppercase tracking-wide mt-0.5" style={{ color: accent }}>{s.company}</div>
        </div>
        <ChevronDown size={13} className={`flex-shrink-0 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      <div className="text-[12px] text-slate-400 mt-1.5">{s.note}</div>
      <div className="flex flex-wrap gap-1 mt-2">
        {s.tags.map(t => (
          <span key={t} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400">{t}</span>
        ))}
      </div>
      {open && (
        <ul className="mt-3 pt-2.5 border-t border-white/5 space-y-1.5">
          {s.details.map((d, i) => (
            <li key={i} className="text-[11px] text-slate-400 leading-relaxed flex gap-2">
              <span style={{ color: accent }}>·</span>{d}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

function InteresseCard({ it }: { it: Interesse }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(o => !o)}
      className="text-left w-full rounded-xl border border-slate-800 bg-slate-900/40 p-3 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-2">
        <span className="text-lg">{it.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-bold text-slate-200">{it.label}</div>
          <div className="text-[10px] text-slate-500">{it.note}</div>
        </div>
        <ChevronDown size={12} className={`flex-shrink-0 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <ul className="mt-2.5 pt-2 border-t border-white/5 space-y-1.5">
          {it.details.map((d, i) => (
            <li key={i} className="text-[11px] text-slate-400 leading-relaxed flex gap-2"><span className="text-violet-400">·</span>{d}</li>
          ))}
        </ul>
      )}
    </button>
  );
}

function Section({ icon, title, accent, children }: { icon: ReactNode; title: string; accent: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>
        {icon}{title}
      </div>
      {children}
    </section>
  );
}

export function CvView() {
  const ninaCV = buildNinaCV();
  const ninaPct = ninaCV.totali ? Math.round((ninaCV.scritti / ninaCV.totali) * 100) : 0;
  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* ── HEADER ── */}
        <header className="space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">CV · figura professionale</div>
          <h1 className="text-3xl font-black text-white">Matteo Benenati</h1>
          <p className="text-[15px] text-slate-300 leading-relaxed max-w-2xl">
            Artigiano industriale + system builder. <span className="text-white font-semibold">15+ anni</span> ai vertici
            della manifattura italiana — la mano che salda il titanio e la mente che costruisce il sistema.
          </p>
          <div className="flex flex-wrap gap-2">
            {["SCProject", "ESSEGI", "DATWLER", "LU.VE", "TITANIUM_OS"].map(c => (
              <span key={c} className="text-[10px] font-mono px-2 py-1 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300">{c}</span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
            <Mail size={11} /> benenatimatteo.mb@gmail.com
          </div>
          <p className="text-[10px] text-slate-600 italic">Base viva — verrà ingegnerizzata col lavoro su Nina (il CV che si genera).</p>
        </header>

        {/* ── PROFILO UNITO: professionali + personali per dominio ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-200">
            <Layers size={12} /> Il profilo completo — dove la mano e la mente si uniscono
          </div>
          <p className="text-[12px] text-slate-500 leading-relaxed">
            Non due liste separate: la <span className="text-slate-300">stessa persona</span>, per dominio.
            <span className="text-slate-400"> 👤 = dove la passione personale incontra il mestiere.</span>
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {COMPETENZE_UNITE.map(d => (
              <div key={d.nome} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{d.icon}</span>
                  <div className="text-[13px] font-bold text-slate-100">{d.nome}</div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 mb-2.5 leading-snug">{d.claim}</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.skills.map(s => (
                    <span key={s.label}
                      className="text-[10px] font-mono px-2 py-1 rounded-lg border bg-slate-800/40 flex items-center gap-1.5"
                      style={{ borderColor: LIV[s.livello].color + "55", color: "#cbd5e1" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: LIV[s.livello].color }} />
                      {s.label}{s.personale && <span title="passione personale">👤</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-[9px] font-mono text-slate-600">
            {(Object.keys(LIV) as Livello[]).map(k => (
              <span key={k} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: LIV[k].color }} />{LIV[k].label}
              </span>
            ))}
          </div>
        </section>

        {/* ── IL CV DI NINA: skill-tree che si riempie man mano nascono gli episodi ── */}
        <section className="space-y-3 pt-4 border-t border-pink-500/20">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-pink-300">
              <Sparkles size={12} /> Il CV di Nina — l'albero delle abilità
            </div>
            <div className="text-[10px] font-mono text-slate-500">{ninaCV.scritti}/{ninaCV.totali} caselle · <span className="text-pink-400">{ninaPct}%</span></div>
          </div>
          <p className="text-[12px] text-slate-500 leading-relaxed">
            Stesso motore del mio CV, ma per Nina: ogni episodio scritto <span className="text-slate-300">sblocca una casella</span>.
            È il <span className="text-pink-300">gemello della Mappa di Nina</span> — lì la navighi come luoghi (tipo Skyrim), qui la leggi come abilità. Si aggiorna da solo dagli episodi.
          </p>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 to-emerald-500 rounded-full transition-all" style={{ width: `${ninaPct}%` }} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {ninaCV.domini.map(d => (
              <div key={d.chiave} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
                <div className="text-[12px] font-bold text-slate-200 mb-2">{d.icon} {d.nome}</div>
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
          <p className="text-[9px] font-mono text-slate-600">colore = giro/profondità · pieno = scritto · tenue = da scrivere — un solo albero, due viste (mappa + abilità).</p>
        </section>

        <Section icon={<Wrench size={12} />} title="Competenze industriali" accent="#34d399">
          <div className="grid sm:grid-cols-2 gap-3">
            {SKILLS_INDUSTRIA.map(s => <SkillCard key={s.label} s={s} accent="#34d399" />)}
          </div>
        </Section>

        <Section icon={<Cpu size={12} />} title="Competenze digitali" accent="#22d3ee">
          <div className="grid sm:grid-cols-2 gap-3">
            {SKILLS_DIGITAL.map(s => <SkillCard key={s.label} s={s} accent="#22d3ee" />)}
          </div>
        </Section>

        <Section icon={<Compass size={12} />} title="Interessi & R&D" accent="#a78bfa">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INTERESSI.map(it => <InteresseCard key={it.label} it={it} />)}
          </div>
        </Section>

        <Section icon={<Quote size={12} />} title="Principi" accent="#94a3b8">
          <div className="grid sm:grid-cols-2 gap-2">
            {PRINCIPI.map((p, i) => (
              <div key={i} className="text-[12px] text-slate-300 rounded-xl border border-slate-800/60 bg-slate-900/30 px-3.5 py-2.5 leading-relaxed">
                {p}
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
