// AvventuraMapView.tsx — la MAPPA di Nina (le avventure), percorribile a livelli
// parte di: TITANIUM_OS / DASHBOARD
// versione: 1.0 / data: 2026-06-10
// Mappa navigabile (drill-down + briciole). Due movimenti: GIÙ = approfondire,
// DI LATO = cambiare ramo/verticale. Si AGGIORNA DA SOLA: stato "scritto" e
// approfondimenti (LV1+) sono letti dall'albero VERO degli episodi (episodes.json).
// Additiva: non tocca la MAPPA del sistema.

import { useState } from "react";
import { MONDO, MAPPA_RADICE, type MappaNodo, type EpStato } from "../data/avventuraMapData";
import { EPISODES } from "../data/storieData";
import { useUIStore } from "../stores/systemStore";
import {
  Sparkles, ChevronRight, ArrowLeft, Layers, Mic, Users, MapPin, ArrowRight, BookOpen, Home,
} from "lucide-react";

// ── indice degli episodi reali (la fonte che fa "aggiornare da sola" la mappa) ──
const EP_BY_ID = new Map(EPISODES.map(e => [e.id, e]));
const childEpisodes = (epId: string) =>
  EPISODES.filter(e => e.parent_id === epId);
const exists = (id?: string) => !!id && EP_BY_ID.has(id);

const EP_STATO: Record<EpStato, { label: string; dot: string; text: string }> = {
  "scritto":     { label: "SCRITTO",     dot: "bg-emerald-400", text: "text-emerald-400" },
  "da-scrivere": { label: "DA SCRIVERE", dot: "bg-amber-400",   text: "text-amber-400" },
  "futuro":      { label: "PIÙ AVANTI",  dot: "bg-slate-600",   text: "text-slate-500" },
};

// figli "vivi" di un nodo: rami statici, oppure gli approfondimenti REALI se è un episodio
function nodeChildren(node: MappaNodo): MappaNodo[] {
  if (node.figli && node.figli.length) return node.figli;
  if (node.tipo === "episodio" && node.episodeId) {
    return childEpisodes(node.episodeId).map((e): MappaNodo => ({
      id: e.id, nome: e.title, tipo: "episodio",
      colore: node.colore, sottotitolo: e.sottotitolo, episodeId: e.id, stato: "scritto",
    }));
  }
  return [];
}

// stato reale: se l'episodio esiste su disco → SCRITTO (a prescindere dal dato statico)
function statoReale(node: MappaNodo): EpStato {
  if (node.tipo === "episodio") return exists(node.episodeId) ? "scritto" : (node.stato ?? "futuro");
  return node.stato ?? "futuro";
}

export function AvventuraMapView() {
  const navigate = useUIStore(s => s.navigateTo);
  const [stack, setStack] = useState<MappaNodo[]>([MAPPA_RADICE]);
  const current = stack[stack.length - 1];
  // LV senza limite di profondità: la navigazione è infinita per design.
  // Unica guardia: non si rientra in un antenato già nel percorso (anti-ciclo).
  const ancestorIds = new Set(stack.map(n => n.id));
  const figli = nodeChildren(current).filter(n => !ancestorIds.has(n.id));
  const atRoot = stack.length === 1;

  const enter = (n: MappaNodo) => setStack(s => [...s, n]);
  const goTo = (i: number) => setStack(s => s.slice(0, i + 1));
  const back = () => setStack(s => (s.length > 1 ? s.slice(0, -1) : s));

  return (
    <div className="h-full overflow-y-auto bg-[#0a0612]" style={{ animation: "nl-fadeUp 0.3s ease both" }}>
      <div className="max-w-4xl mx-auto px-6 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <Sparkles size={20} className="text-pink-400" />
          <h2 className="text-lg font-bold tracking-wide"
            style={{ background: "linear-gradient(90deg,#f59e0b,#ec4899,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Mappa di Nina · le avventure
          </h2>
          <button onClick={() => navigate("avventura")}
            className="ml-auto flex items-center gap-1.5 text-[9px] font-mono text-pink-400/70 hover:text-pink-300 uppercase tracking-wider border border-pink-500/20 hover:border-pink-500/40 rounded px-2 py-1 transition-all">
            <Mic size={9} /> tutti gli episodi
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-4 ml-8">
          Percorribile: <span className="text-slate-400">scendi</span> per approfondire,
          {" "}<span className="text-slate-400">torna su</span> per cambiare discorso. Si aggiorna da sola man mano che nascono gli episodi.
        </p>

        {/* Briciole (breadcrumb) */}
        <div className="flex items-center flex-wrap gap-1 mb-4 ml-8 text-[11px] font-mono">
          {stack.map((n, i) => (
            <span key={n.id} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={11} className="text-slate-700" />}
              <button
                onClick={() => goTo(i)}
                className={`px-1.5 py-0.5 rounded ${i === stack.length - 1 ? "text-pink-300" : "text-slate-500 hover:text-slate-300"}`}
              >
                {i === 0 ? <Home size={11} className="inline -mt-0.5" /> : n.nome}
              </button>
            </span>
          ))}
        </div>

        {/* "Torna su" */}
        {!atRoot && (
          <button onClick={back}
            className="flex items-center gap-1.5 mb-3 ml-8 text-[10px] font-mono text-slate-500 hover:text-slate-300 uppercase tracking-wider">
            <ArrowLeft size={11} /> torna su
          </button>
        )}

        {/* Scheda del nodo corrente (se non è la radice) */}
        {!atRoot && (current.concetto || current.vero || current.pezzoReale) && (
          <div className="rounded-xl border mb-5 px-5 py-4 space-y-2"
            style={{ borderColor: (current.colore ?? "#64748b") + "44", background: (current.colore ?? "#64748b") + "0a" }}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: current.colore ?? "#cbd5e1" }}>{current.nome}</span>
              {current.pietra && <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: (current.colore ?? "#64748b") + "1a", color: current.colore }}>{current.pietra}</span>}
            </div>
            {current.concetto && <p className="text-[11px] text-slate-300"><span className="text-slate-600 uppercase text-[9px] font-mono">per il bambino</span> · {current.concetto}</p>}
            {current.vero && <p className="text-[11px] text-slate-400"><span className="text-slate-600 uppercase text-[9px] font-mono">vero dietro</span> · {current.vero}</p>}
            {current.pezzoReale && <p className="text-[11px] text-slate-500"><span className="text-slate-600 uppercase text-[9px] font-mono">pezzo reale</span> · {current.pezzoReale}</p>}
            {current.tipo === "episodio" && exists(current.episodeId) && (
              <button onClick={() => navigate("avventura")}
                className="mt-1 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
                style={{ color: current.colore ?? "#ec4899" }}>
                <BookOpen size={11} /> apri l'episodio <ArrowRight size={11} />
              </button>
            )}
          </div>
        )}

        {/* IL MONDO — solo alla radice (il vestito narrativo) */}
        {atRoot && (
          <div className="rounded-xl border border-pink-500/20 bg-pink-500/[0.04] mb-5 px-5 py-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wider uppercase text-pink-300">Il Mondo · "{MONDO.titolo}"</span>
              <span className="ml-auto text-[10px] text-slate-500 italic hidden sm:block">{MONDO.sottotitolo}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
              <div className="text-slate-400"><span className="text-slate-600 uppercase text-[9px] font-mono">legge</span><br />{MONDO.legge}</div>
              <div className="text-slate-400"><span className="text-slate-600 uppercase text-[9px] font-mono">nemico</span><br />{MONDO.nemico}</div>
              <div className="text-slate-400 sm:col-span-2"><span className="text-slate-600 uppercase text-[9px] font-mono">protagonisti</span><br />{MONDO.protagonisti}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Users size={9} /> il cast (nodi reali)</div>
              <div className="flex flex-wrap gap-1.5">
                {MONDO.cast.map(c => (
                  <span key={c.nome} title={`${c.ruolo} — ${c.stato}`}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-400">{c.nome}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* I FIGLI del nodo corrente — le tessere su cui cliccare per scendere */}
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
          {atRoot ? <><MapPin size={9} /> i mondi (scegli un ramo)</> : <><Layers size={9} /> dentro · livello {stack.length - 1}</>}
        </div>

        {figli.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700/50 px-4 py-6 text-center">
            <p className="text-xs text-slate-500">
              {current.tipo === "episodio"
                ? "Ancora nessun approfondimento qui — nascerà man mano. (Si aggiunge un .md figlio con parent: " + current.episodeId + ")"
                : "Ramo predisposto, ancora da riempire."}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-2.5">
            {figli.map(n => {
              const kids = nodeChildren(n);
              const st = EP_STATO[statoReale(n)];
              const col = n.colore ?? "#64748b";
              const canEnter = kids.length > 0 || (n.tipo !== "episodio");
              return (
                <button key={n.id}
                  onClick={() => (canEnter ? enter(n) : exists(n.episodeId) && navigate("avventura"))}
                  className="text-left rounded-xl border px-4 py-3 transition-all hover:bg-white/[0.02]"
                  style={{ borderColor: col + "33", background: col + "06" }}>
                  <div className="flex items-center gap-2">
                    {n.tipo === "episodio" && <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />}
                    <span className="text-sm font-semibold text-slate-100">{n.nome}</span>
                    {n.tipo === "episodio"
                      ? <span className={`ml-auto text-[8px] font-mono font-bold tracking-wider ${st.text}`}>{st.label}</span>
                      : <ChevronRight size={15} className="ml-auto text-slate-600" />}
                  </div>
                  {n.sottotitolo && <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">{n.sottotitolo}</p>}
                  <div className="flex items-center gap-2 mt-2 text-[9px] font-mono text-slate-600">
                    {kids.length > 0 && <span className="flex items-center gap-1" style={{ color: col }}><Layers size={9} />{kids.length} {n.tipo === "episodio" ? "approfondimenti" : "dentro"}</span>}
                    {n.tipo === "episodio" && n.episodeId && <span className="text-slate-700">{n.episodeId}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <p className="text-[10px] text-slate-700 font-mono text-center mt-7">
          Mappa di Nina · canone in CONTENT_ENGINE/DATABASE/MONDO/MAPPA_AVVENTURA.md — un gesto fatto bene fa più di un frutto.
        </p>
      </div>
    </div>
  );
}
