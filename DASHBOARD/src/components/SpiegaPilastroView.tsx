// SpiegaPilastroView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-18
// I PILASTRI come SPIEGAZIONE (non pitch): ogni pilastro a livelli Lv1→Lv3, da aprire
// e spiegare a un amico/ingegnere/collega in 30 secondi, "che lo visualizzi nella mente".
// Differenza col pitch: il pitch VENDE, qui si SPIEGA (essenza → come funziona → scala).

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Livello = { lv: number; titolo: string; testo: string };
type Pilastro = { nome: string; icona: string; accent: string; frase: string; livelli: Livello[]; catena: string };

const PILASTRI: Record<string, Pilastro> = {
  v32: {
    nome: "V32", icona: "🔩", accent: "#34d399",
    frase: "Una fresatrice CNC di precisione costruita da zero. È il motore: produce, paga, finanzia tutto il resto.",
    livelli: [
      { lv: 1, titolo: "Cos'è", testo: "Un centro di lavoro CNC a 3 assi fatto a mano. Non comprato — costruito, per conoscere ogni vincolo dall'interno." },
      { lv: 2, titolo: "Come funziona", testo: "L-configuration monolitica + Epoxy Granite (granito epossidico) che smorza le vibrazioni. La fisica (massa) sostituisce la ghisa stabilizzata costosa → precisione al centesimo a un costo una frazione del mercato." },
      { lv: 3, titolo: "Come scala", testo: "Non è in vendita: è la Macchina Madre. Produce gli stampi e i pezzi di MIMS. Ogni pezzo fatto in casa ha costo marginale quasi zero → un generatore di cassa, non un peso a bilancio." },
    ],
    catena: "V32 produce gli stampi → MIMS diventa prodotto.",
  },
  mims: {
    nome: "MIMS", icona: "⬡", accent: "#fbbf24",
    frase: "Il «Lego per l'industria pesante»: la rigidità del saldato con la reversibilità del bullone.",
    livelli: [
      { lv: 1, titolo: "Il problema", testo: "Il mercato è bipolare: alluminio T-slot (modulare ma flette) o carpenteria saldata (rigida ma irreversibile). Manca il «medio pesante»." },
      { lv: 2, titolo: "Scheletro + pelle", testo: "Scheletro: giunti su un DNA di 29,9 mm, bloccaggio meccanico (no saldatura). Pelle: le «mattonelle» VULCAN — pannelli piatti a basso costo (plastiche/miscele brevettabili) che chiudono e insonorizzano, eliminando la lamiera." },
      { lv: 3, titolo: "Come scala", testo: "La geometria è un asset (IP), non un prodotto copiabile. GTM «Cavallo di Troia»: entri dal basso col pezzo economico, pianti lo standard, poi sali ai livelli industriali (Heavy)." },
    ],
    catena: "MIMS dipende da V32+VULCAN per gli stampi; è il salto di scala del business fisico.",
  },
  genesis: {
    nome: "GENESIS", icona: "🧬", accent: "#22d3ee",
    frase: "L'OS digitale: il cervello che documenta, ricorda, automatizza — e costruisce sé stesso.",
    livelli: [
      { lv: 1, titolo: "Cos'è", testo: "Un sistema operativo cognitivo che gira sul PC fisso 24/7. La protesi che fa scalare un artigiano senza assumere." },
      { lv: 2, titolo: "Come funziona", testo: "Memoria/RAG (il contesto reale del progetto), agenti notturni (storie, ricerca, audit, auto-miglioramento), dashboard + API + MCP. Principio: 1 input → N output." },
      { lv: 3, titolo: "Come scala", testo: "Il sistema si migliora da solo: watcher e ricerca portano novità, Self-Improve propone, l'umano approva (regola 11). Cresce senza mani in più." },
    ],
    catena: "GENESIS orchestra tutto: V32, MIMS, EVA, Nina, il CV girano qui sopra.",
  },
  eva: {
    nome: "EVA · Vita Natura", icona: "🌿", accent: "#a78bfa",
    frase: "L'assistente AI del centro estetico di Maria — il ponte che porta cashflow mentre il resto matura.",
    livelli: [
      { lv: 1, titolo: "Cos'è", testo: "Una piattaforma reale (pilot v0.3, non «pending»): risponde su WhatsApp a orari, servizi e prenotazioni del centro." },
      { lv: 2, titolo: "Come funziona", testo: "Brain (capisce l'intento) + prenotazione multi-turno + inbox handoff all'operatore + webhook WhatsApp in dry-run sicuro (senza token non scrive ai clienti). La «Maria Rule»: lato cliente zero-click, la complessità sta nel backend." },
      { lv: 3, titolo: "Come scala", testo: "È la prova del metodo su clienti veri. Prossimo: agenda reale (Calendar), notifiche n8n, NLU con LLM. Cashflow vero che finanzia l'hardware costoso." },
    ],
    catena: "EVA finanzia il ponte: reddito reale mentre V32/MIMS maturano.",
  },
};
const FALLBACK = PILASTRI.v32 as Pilastro;

export function SpiegaPilastroView({ pilastro }: { pilastro: string }) {
  const p = PILASTRI[pilastro] ?? FALLBACK;
  const [aperti, setAperti] = useState<number[]>([1, 2, 3]);
  const toggle = (lv: number) => setAperti(a => a.includes(lv) ? a.filter(x => x !== lv) : [...a, lv]);

  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">

        <div className="flex items-center gap-3">
          <span className="text-3xl">{p.icona}</span>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: p.accent }}>Pilastro · spiegazione</div>
            <h1 className="text-2xl font-black text-white">{p.nome}</h1>
          </div>
        </div>

        <p className="text-[15px] text-slate-200 leading-relaxed">{p.frase}</p>

        {/* livelli — apri e spiega, dal più semplice al più profondo */}
        <div className="space-y-2.5">
          {p.livelli.map(l => {
            const open = aperti.includes(l.lv);
            return (
              <button key={l.lv} onClick={() => toggle(l.lv)}
                className="w-full text-left rounded-xl border bg-slate-900/40 p-4 transition-all hover:bg-slate-900/70"
                style={{ borderColor: p.accent + (open ? "55" : "22") }}>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono font-black px-2 py-1 rounded-lg flex-shrink-0"
                    style={{ background: p.accent + "1a", color: p.accent, border: `1px solid ${p.accent}44` }}>
                    Lv{l.lv}
                  </span>
                  <span className="text-[13px] font-bold text-slate-100">{l.titolo}</span>
                </div>
                {open && <p className="text-[13px] text-slate-300 leading-relaxed mt-2.5 pl-1">{l.testo}</p>}
              </button>
            );
          })}
        </div>

        {/* la catena: dove si incastra nel sistema */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5 flex items-center gap-1.5">
            <ArrowRight size={11} style={{ color: p.accent }} /> Nella catena
          </div>
          <p className="text-[13px] text-slate-300 leading-relaxed">{p.catena}</p>
        </div>

        <p className="text-[10px] text-slate-600 italic">Spiegazione (non pitch): apri i livelli e raccontala a voce. Il pitch dedicato è sotto PITCH nella barra.</p>
      </div>
    </div>
  );
}
