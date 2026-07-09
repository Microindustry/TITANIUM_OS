// SpiegaPilastroView.tsx | TITANIUM_OS / DASHBOARD | v2.0 | 2026-06-18
// I PILASTRI come SPIEGAZIONE (non pitch): ogni pilastro a livelli Lv1→Lv3, da aprire
// e spiegare a un amico/ingegnere/collega in 30 secondi, "che lo visualizzi nella mente".
// Differenza col pitch: il pitch VENDE, qui si SPIEGA (essenza → come funziona → scala).
// v2.0: INTEGRA (non sostituisce) — sotto la spiegazione torna il contenuto ricco originale
// della room (V32Room/GenesisRoom/MimsRoom/EvaRoom) + micro-animazioni JS-controlled (motion).

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, BookOpen, Presentation } from "lucide-react";
import { useGlobalState } from "../hooks/SystemStateContext";
import { V32Room, GenesisRoom, MimsRoom, EvaRoom } from "./CanvasLayout";
import { PilastroEconomiaCard } from "./PilastroEconomiaCard";
import { PitchProgettoBody } from "./PitchProgettoView";

type Livello = { lv: number; titolo: string; testo: string };
type Pilastro = { nome: string; icona: string; accent: string; frase: string; livelli: Livello[]; catena: string };

// la room ricca originale di ogni pilastro (dati, percorso, blockers) — riusata, non duplicata
const ROOMS: Record<string, typeof V32Room> = {
  v32: V32Room, genesis: GenesisRoom, mims: MimsRoom, eva: EvaRoom,
};

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
  const { state } = useGlobalState();
  const p = PILASTRI[pilastro] ?? FALLBACK;
  const Room = ROOMS[pilastro];
  const [aperti, setAperti] = useState<number[]>([1, 2, 3]);
  const toggle = (lv: number) => setAperti(a => a.includes(lv) ? a.filter(x => x !== lv) : [...a, lv]);
  // unificazione #57: SPIEGAZIONE e PITCH sono tab della STESSA pagina (il valore resta sempre visibile)
  const [tab, setTab] = useState<"spiega" | "pitch">("spiega");

  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-5">

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-3xl">{p.icona}</span>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: p.accent }}>Pilastro · spiegazione</div>
            <h1 className="text-2xl font-black text-white">{p.nome}</h1>
          </div>
        </motion.div>

        <motion.p
          className="text-[15px] text-slate-200 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          {p.frase}
        </motion.p>

        {/* la QUALITÀ — sempre visibile, qualunque tab (unificazione #57) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <PilastroEconomiaCard pilastro={pilastro} />
        </motion.div>

        {/* TAB: spiegazione | pitch — una pagina sola per pilastro */}
        <div className="flex items-center gap-2">
          {([["spiega", "Spiegazione", BookOpen], ["pitch", "Pitch", Presentation]] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 border text-[11px] font-bold uppercase tracking-wide transition-all
                ${tab === id ? "text-slate-100" : "border-slate-800 bg-slate-900/40 text-slate-500 hover:text-slate-300"}`}
              style={tab === id ? { borderColor: p.accent + "66", background: p.accent + "14", color: p.accent } : undefined}>
              <Icon size={11} /> {label}
            </button>
          ))}
        </div>

        {tab === "pitch" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                      className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <PitchProgettoBody progetto={pilastro} />
          </motion.div>
        )}

        {tab === "spiega" && (<>
        {/* livelli — apri e spiega, dal più semplice al più profondo (entrata a cascata) */}
        <div className="space-y-2.5">
          {p.livelli.map((l, i) => {
            const open = aperti.includes(l.lv);
            return (
              <motion.button
                key={l.lv}
                onClick={() => toggle(l.lv)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 3 }}
                className="w-full text-left rounded-xl border bg-slate-900/40 p-4 hover:bg-slate-900/70"
                style={{ borderColor: p.accent + (open ? "55" : "22") }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono font-black px-2 py-1 rounded-lg flex-shrink-0"
                    style={{ background: p.accent + "1a", color: p.accent, border: `1px solid ${p.accent}44` }}>
                    Lv{l.lv}
                  </span>
                  <span className="text-[13px] font-bold text-slate-100">{l.titolo}</span>
                  <motion.span
                    className="ml-auto text-slate-500 text-[11px]"
                    animate={{ rotate: open ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >▸</motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[13px] text-slate-300 leading-relaxed mt-2.5 pl-1">{l.testo}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* la catena: dove si incastra nel sistema */}
        <motion.div
          className="rounded-xl border border-slate-800 bg-slate-900/30 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 + p.livelli.length * 0.07 }}
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5 flex items-center gap-1.5">
            <ArrowRight size={11} style={{ color: p.accent }} /> Nella catena
          </div>
          <p className="text-[13px] text-slate-300 leading-relaxed">{p.catena}</p>
        </motion.div>

        <p className="text-[10px] text-slate-600 italic">Spiegazione, pitch e valore in un posto solo: apri i livelli e raccontala a voce; il pitch che VENDE è il tab qui sopra.</p>

        {/* DENTRO IL PILASTRO — il contenuto ricco originale (dati, percorso, blockers): reintegrato, non perso */}
        {Room && (
          <motion.div
            className="pt-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + p.livelli.length * 0.07 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500">Dentro il pilastro · dati e percorso</span>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-700/40 to-transparent" />
            </div>
            <Room state={state} />
          </motion.div>
        )}
        </>)}

      </div>
    </div>
  );
}
