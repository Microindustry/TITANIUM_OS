// ControlloView.tsx — Centro di Controllo: cosa hai, cosa fa, come si usa, se e' acceso
// parte di: TITANIUM_OS / DASHBOARD
// versione: 1.0 / data: 2026-06-07
// Scopo: UN posto solo per governare tutti gli strumenti senza tenerli a mente (anti-sovraccarico).

import { useGlobalState } from "../hooks/SystemStateContext";
import { useUIStore, type ViewMode } from "../stores/systemStore";
import {
  Gauge, Brain, Radar, Moon, Mic,
  Bot, Server, ArrowRight, Circle,
} from "lucide-react";

type Stato = "on" | "pronto" | "fermo" | "sviluppo" | "futuro";

const STATO_CFG: Record<Stato, { label: string; dot: string; text: string }> = {
  on:       { label: "ACCESO",   dot: "bg-emerald-400",            text: "text-emerald-400" },
  pronto:   { label: "PRONTO",   dot: "bg-cyan-400",               text: "text-cyan-400" },
  fermo:    { label: "FERMO",    dot: "bg-amber-400",              text: "text-amber-400" },
  sviluppo: { label: "IN CORSO", dot: "bg-violet-400",             text: "text-violet-400" },
  futuro:   { label: "FUTURO",   dot: "bg-slate-600",              text: "text-slate-500" },
};

interface Tool {
  nome: string;
  cosa: string;          // cosa fa, in 1 riga semplice
  come: string;          // come lo usi, concreto
  stato: Stato;
  goto?: ViewMode;       // vista collegata (se cliccabile)
}

interface Gruppo {
  titolo: string;
  icona: typeof Brain;
  colore: string;
  tools: Tool[];
}

const GRUPPI: Gruppo[] = [
  {
    titolo: "Conoscenza — il cervello",
    icona: Brain, colore: "#22d3ee",
    tools: [
      { nome: "Chat RAG", stato: "on", goto: "ragchat",
        cosa: "Fai una domanda al sistema, ti risponde con le fonti dai tuoi documenti.",
        come: "Vista 'Chat RAG' (sotto GENESIS) — scrivi la domanda." },
      { nome: "MENTE RAG", stato: "on",
        cosa: "Il motore che cerca dentro tutto quello che hai scritto in MENTE/.",
        come: "Aggiungi un file in MENTE/ → si indicizza da solo. Da terminale: rag \"domanda\"." },
      { nome: "Graphify (Wiki)", stato: "pronto",
        cosa: "Mappa codice e sapere come un grafo di relazioni: Claude capisce senza rileggere tutto (meno token).",
        come: "In Claude Code scrivi /graphify. Tutto in locale, niente costi." },
    ],
  },
  {
    titolo: "Occhi sul mondo",
    icona: Radar, colore: "#f59e0b",
    tools: [
      { nome: "AI News Watcher", stato: "fermo",
        cosa: "Ti porta le novita' AI (nuovi repo GitHub, video YouTube, articoli) dai creator che segui.",
        come: "Pronto ma NON parte da solo. Lancio manuale: night_ai_watch.bat. (Schedulazione 48h: quando vuoi.)" },
    ],
  },
  {
    titolo: "Automazioni — lavorano per te",
    icona: Moon, colore: "#38bdf8",
    tools: [
      { nome: "Notturne", stato: "on", goto: "notturne",
        cosa: "Task che girano di notte: ricerca, auto-controllo del sistema, generazione storie, backup.",
        come: "Vista 'Notturne' (sotto AUTOMAZIONI). Girano da sole su Task Scheduler." },
      { nome: "Scanner + Watcher MENTE", stato: "on",
        cosa: "Quando aggiungi un documento, lo legge e lo rende cercabile, da solo.",
        come: "Automatico. Niente da fare: metti i file in MENTE/." },
    ],
  },
  {
    titolo: "Contenuti — quello che racconti",
    icona: Mic, colore: "#f43f5e",
    tools: [
      { nome: "Storie", stato: "on", goto: "storie",
        cosa: "Tutti i tuoi episodi (podcast + dataset per l'LLM), divisi per stagione.",
        come: "Vista 'Storie'. Le stagioni si aprono/chiudono a fisarmonica." },
      { nome: "Avventura (Nina)", stato: "on", goto: "avventura",
        cosa: "Il binario educativo: il mondo che spiega la tecnologia ai bambini (Nina + THEMIS).",
        come: "Vista 'Avventura' (sotto Storie)." },
      { nome: "Mappa dell'Avventura", stato: "on", goto: "avventura-mappa",
        cosa: "Il mondo di Nina a livelli: le 7 Regioni (la storia dell'IA) ancorate al progetto reale.",
        come: "Apri la mappa: scendi nelle Regioni, vedi episodi e concetti." },
      { nome: "Pubblicazioni", stato: "pronto", goto: "pubblicazioni",
        cosa: "La terza faccia: come i caroselli (Nina + storie in prima persona) escono verso il mondo. Stack deciso: Postiz + API ufficiale Meta.",
        come: "Vista 'Pubblicazioni': cosa abbiamo scelto, la pipeline, e la scaletta di attivazione da fare insieme (mail, pagina FB/IG, Docker)." },
    ],
  },
  {
    titolo: "Personaggi AI",
    icona: Bot, colore: "#818cf8",
    tools: [
      { nome: "THEMIS", stato: "on", goto: "agenti",
        cosa: "L'esecutore tecnico: codice, analisi V32/GENESIS. Sono io, qui dentro.",
        come: "Vista 'Agenti'." },
      { nome: "EVA", stato: "sviluppo",
        cosa: "Assistente WhatsApp per Vita Natura (prenotazioni). In sviluppo (dry-run).",
        come: "Vista 'EVA' (pilastro). Non ancora collegata a WhatsApp." },
      { nome: "AVA · ARIA · altri", stato: "futuro",
        cosa: "Avatar YouTube, Life-OS, hardware… pianificati, non ancora costruiti.",
        come: "Quando sara' il momento." },
    ],
  },
  {
    titolo: "Infrastruttura — le fondamenta",
    icona: Server, colore: "#10b981",
    tools: [
      { nome: "API + Dashboard", stato: "on",
        cosa: "Il server (porta 5001) e questa dashboard (porta 5173).",
        come: "Partono al login. Questa pagina ne e' la prova." },
      { nome: "n8n", stato: "on",
        cosa: "Automazioni visuali self-hosted (porta 5678), tutto in locale.",
        come: "npx n8n / parte al login." },
    ],
  },
];

function ToolRow({ t, onGo }: { t: Tool; onGo: (v: ViewMode) => void }) {
  const s = STATO_CFG[t.stato];
  const clickable = !!t.goto;
  return (
    <button
      disabled={!clickable}
      onClick={() => t.goto && onGo(t.goto)}
      className={`w-full text-left rounded-lg border border-slate-800/70 bg-slate-900/40 px-4 py-3
                  transition-all ${clickable ? "hover:border-slate-600 hover:bg-slate-900/80 cursor-pointer" : "cursor-default"}`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`w-2 h-2 rounded-full ${s.dot} shrink-0`} />
        <span className="text-sm font-semibold text-slate-100">{t.nome}</span>
        <span className={`text-[9px] font-mono font-bold tracking-wider ${s.text}`}>{s.label}</span>
        {clickable && <ArrowRight size={12} className="ml-auto text-slate-600" />}
      </div>
      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{t.cosa}</p>
      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed flex items-start gap-1.5">
        <Circle size={5} className="mt-1.5 shrink-0 fill-slate-600 text-slate-600" />
        <span><span className="text-slate-600 uppercase tracking-wider text-[9px] font-mono mr-1">come</span>{t.come}</span>
      </p>
    </button>
  );
}

export function ControlloView() {
  const sys = useGlobalState();
  const navigate = useUIStore(s => s.setView);

  const counts = GRUPPI.flatMap(g => g.tools).reduce((acc, t) => {
    acc[t.stato] = (acc[t.stato] ?? 0) + 1; return acc;
  }, {} as Record<string, number>);

  return (
    <div className="h-full overflow-y-auto bg-[var(--shell-bg)]" style={{ animation: "nl-fadeUp 0.3s ease both" }}>
      <div className="max-w-5xl mx-auto px-6 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <Gauge size={20} className="text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-100 tracking-wide">Centro di Controllo</h2>
          <span className="ml-auto flex items-center gap-1.5 text-[9px] font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${sys.isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-700"}`} />
            <span className={sys.isOnline ? "text-emerald-500/80" : "text-slate-600"}>
              {sys.isOnline ? "sistema live" : "offline"}
            </span>
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-5 ml-8">
          Tutto quello che hai, in un posto solo. Cosa fa · come si usa · se è acceso. Niente da tenere a mente.
        </p>

        {/* Legenda stati */}
        <div className="flex flex-wrap gap-3 mb-6 ml-8">
          {(Object.keys(STATO_CFG) as Stato[]).map(k => (
            <span key={k} className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
              <span className={`w-1.5 h-1.5 rounded-full ${STATO_CFG[k].dot}`} />
              {STATO_CFG[k].label}
              {counts[k] ? <span className="text-slate-700">×{counts[k]}</span> : null}
            </span>
          ))}
        </div>

        {/* Gruppi */}
        <div className="space-y-7">
          {GRUPPI.map(g => {
            const Icon = g.icona;
            return (
              <section key={g.titolo}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} style={{ color: g.colore }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: g.colore }}>
                    {g.titolo}
                  </h3>
                  <div className="flex-1 h-px" style={{ background: g.colore + "22" }} />
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {g.tools.map(t => <ToolRow key={t.nome} t={t} onGo={navigate} />)}
                </div>
              </section>
            );
          })}
        </div>

        <p className="text-[10px] text-slate-700 font-mono text-center mt-8">
          TITANIUM_OS — un sistema che gira da solo vale più di 10 abitudini che dipendono dalla volontà.
        </p>
      </div>
    </div>
  );
}
