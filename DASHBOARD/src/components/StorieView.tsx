// StorieView.tsx — Inventario episodi podcast + LLM training dataset
// parte di: TITANIUM_OS / DASHBOARD
// versione: 3.0 / data: 2026-06-07
// v3.0: stagioni a fisarmonica (divisione chiara), titoli leggibili, flood AUTO chiuso di default

import { useState, useRef, useEffect } from "react";
import { EPISODES, STAGIONI, type Episode, type EpisodeStatus } from "../data/storieData";
import ninaFoundationMd from "../data/nina_dal_giorno_0.md?raw";
import sistemaFoundationMd from "../data/sistema_dal_giorno_0.md?raw";
import sistemaGuidaMd from "../data/sistema_linea_guida.md?raw";
import { Mic, Clock, ChevronDown, ChevronRight, ArrowLeft, Layers, BookOpen, Maximize2, Minimize2, Sparkles, Archive, Bot, Cpu } from "lucide-react";
import { useContentFiles, useNinaStatus, useNinaArchived, useFile } from "../hooks/useSystemQuery";
import { useUIStore } from "../stores/systemStore";

// Le storie di Nina vivono nella stagione AV (canone EP_N2). Tutto il resto = sistema.
const NINA_STAGIONE = "AV";
const NINA_COLOR = "#ec4899";
const ninaNum = (e: Episode) => {
  const m = e.id.match(/EP_N2_(\d+)/);
  return m ? parseInt(m[1], 10) : 999;
};

const STATUS_CONFIG: Record<EpisodeStatus, { label: string; color: string; dot: string }> = {
  ready:   { label: "PRONTO",  color: "text-emerald-400", dot: "bg-emerald-400" },
  draft:   { label: "BOZZA",   color: "text-yellow-400",  dot: "bg-yellow-400" },
  source:  { label: "SOURCE",  color: "text-blue-400",    dot: "bg-blue-400" },
  pending: { label: "IN CODA", color: "text-slate-500",   dot: "bg-slate-500" },
};

// ── Markdown line renderer ──────────────────────────────────────────────────
function renderMdLine(line: string, idx: number) {
  if (line.startsWith("# ")) {
    return <h1 key={idx} className="text-base font-bold text-slate-100 mt-4 mb-1">{line.slice(2)}</h1>;
  }
  if (line.startsWith("### ")) {
    return <h3 key={idx} className="text-xs font-semibold text-slate-400 italic mb-3">{line.slice(4)}</h3>;
  }
  if (line.startsWith("## ")) {
    const text = line.slice(3);
    return (
      <h2 key={idx} className="text-xs font-bold uppercase tracking-widest text-amber-400/80 mt-5 mb-2 border-b border-amber-400/20 pb-1">
        {text}
      </h2>
    );
  }
  if (line.startsWith("> ")) {
    return (
      <blockquote key={idx} className="border-l-2 border-slate-600 pl-3 my-2 text-slate-400 italic text-xs">
        {line.slice(2)}
      </blockquote>
    );
  }
  if (line.startsWith("**") && line.endsWith("**")) {
    return <p key={idx} className="text-xs font-bold text-slate-200 my-1">{line.slice(2, -2)}</p>;
  }
  if (line === "" || line === "---") {
    return <div key={idx} className="my-2" />;
  }
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p key={idx} className="text-xs text-slate-300 leading-relaxed my-0.5">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i} className="text-slate-100 font-semibold">{p.slice(2, -2)}</strong>
          : p
      )}
    </p>
  );
}

// Card episodio — RICORSIVA: se l'episodio ha figli (approfondimenti LV1+), li mostra
// annidati e indentati dentro la sezione espansa. Profondita' libera (pattern N-livelli
// del skill-tree, applicato ai CONTENUTI). 'childrenOf' risolve gli id-figlio in episodi.
function EpisodeCard({
  ep,
  color,
  depth = 0,
  childrenOf,
}: {
  ep: Episode;
  color: string;
  depth?: number;
  childrenOf: (ep: Episode) => Episode[];
}) {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[ep.status];
  const lines = ep.content.split("\n");
  const kids = childrenOf(ep);

  return (
    <div
      className="rounded-lg border bg-slate-900/50 backdrop-blur transition-all duration-150 hover:bg-slate-900/80"
      style={{ borderColor: open ? color + "66" : "rgba(51,65,85,0.5)" }}
    >
      {/* Header row */}
      <button
        className="w-full text-left px-3.5 py-3 flex items-center gap-3"
        onClick={() => setOpen(v => !v)}
      >
        {/* Badge: la DATA dell'episodio (identificativo serio per la timeline),
            non l'id-slug grezzo. L'id resta come tooltip per chi sviluppa. */}
        <span
          className="shrink-0 text-[10px] font-mono font-bold px-2 py-1 rounded self-start"
          style={{ background: color + "1f", color }}
          title={ep.id}
        >
          {(() => {
            const d = (ep.data_evento || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
            return d ? `${d[3]}.${d[2]}.${d[1].slice(2)}` : ep.stagione;
          })()}
        </span>

        {/* Title block — titolo sempre leggibile, niente troncatura aggressiva */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-100 leading-snug">{ep.title}</h4>
          {ep.sottotitolo && (
            <p className="text-xs text-slate-400 italic leading-snug mt-0.5 line-clamp-1">{ep.sottotitolo}</p>
          )}
        </div>

        {/* Meta */}
        <div className="shrink-0 flex items-center gap-3 text-xs text-slate-500 self-start mt-0.5">
          {kids.length > 0 && (
            <span
              className="hidden sm:flex items-center gap-1 font-mono"
              style={{ color }}
              title={`${kids.length} approfondimenti`}
            >
              <Layers size={11} />{kids.length}
            </span>
          )}
          <span className="hidden sm:flex items-center gap-1"><Clock size={11} />{ep.durata_min}m</span>
          <span className={`flex items-center gap-1.5 font-medium ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className="hidden sm:inline">{status.label}</span>
          </span>
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 border-t border-slate-700/40">
          <div className="flex flex-wrap gap-1 mt-3 mb-4">
            {ep.tags.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">#{t}</span>
            ))}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-500 ml-auto">{ep.data_evento}</span>
          </div>
          <div className="rounded-lg bg-slate-950/60 px-5 py-4 overflow-hidden">
            {lines.map((line, i) => renderMdLine(line, i))}
          </div>

          {/* Approfondimenti (figli) — annidati e indentati: i livelli sui contenuti */}
          {kids.length > 0 && (
            <div
              className="mt-3 pl-3 space-y-2 border-l-2"
              style={{ borderColor: color + "55" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color }}>
                <Layers size={10} /> Approfondimenti · LV{depth + 1}
              </p>
              {kids.map(k => (
                <EpisodeCard key={k.id} ep={k} color={color} depth={depth + 1} childrenOf={childrenOf} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Pannello RAG NINA — il nodo che genera in automatico ──────────────────────
// "vede gli episodi archiviati e continua a generarli, alimentando il RAG di Nina"
// (canone sess.#44: tutto automatico, nessun intervento). Stato live da /api/nina/status,
// con fallback ai conteggi locali se l'API è spenta.
function NinaRagPanel({ canonLocal }: { canonLocal: number }) {
  const { data, isError } = useNinaStatus();
  const canon = data?.canon_count ?? canonLocal;
  const semi = data?.seed_archive_count;
  const last = data?.last_generated;
  const offline = isError || !data;

  return (
    <div
      className="rounded-xl border p-4 mb-4"
      style={{ borderColor: NINA_COLOR + "44", background: NINA_COLOR + "0a" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Bot size={15} style={{ color: NINA_COLOR }} />
        <h3 className="text-sm font-bold tracking-wider uppercase" style={{ color: NINA_COLOR }}>RAG Nina</h3>
        <span
          className="text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1"
          style={{ background: NINA_COLOR + "1f", color: NINA_COLOR }}
          title="Genera e promuove da solo, senza approvazione"
        >
          <Sparkles size={9} /> AUTOMATICO
        </span>
        {offline && <span className="ml-auto text-[9px] font-mono text-slate-600">API offline · conteggi locali</span>}
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-3">
        Il nodo legge gli episodi <strong className="text-slate-300">archiviati</strong> (l'origine del mondo)
        e <strong className="text-slate-300">continua a generarne di nuovi</strong> da solo, ancorandoli al sapere
        reale del sistema → così alimenta il RAG di Nina. Niente bozze, niente approvazione: gli episodi nascono definitivi.
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-300 flex items-center gap-1.5">
          <BookOpen size={11} style={{ color: NINA_COLOR }} /> {canon} episodi nel canone
        </span>
        {typeof semi === "number" && (
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-300 flex items-center gap-1.5">
            <Archive size={11} className="text-amber-400" /> {semi} semi archiviati
          </span>
        )}
        {typeof data?.generated_total === "number" && data.generated_total > 0 && (
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-300 flex items-center gap-1.5">
            <Cpu size={11} className="text-cyan-400" /> {data.generated_total} auto-generati
          </span>
        )}
      </div>
      {last && (
        <p className="text-[10px] font-mono text-slate-500 mt-3">
          ultimo generato: <span style={{ color: NINA_COLOR }}>{last.id}</span> · {last.title}
          {last.at && <span className="text-slate-600"> · {last.at.slice(0, 10)}</span>}
        </p>
      )}
    </div>
  );
}

// Riga di un archiviato — espandibile per LEGGERLO: al click carica il contenuto del
// file (lazy, via /api/file) e lo rende come gli altri episodi. Sola lettura.
function ArchivedRow({ it, tone }: { it: { id: string; title: string; file: string; path: string }; tone: string }) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useFile(open ? it.path : null);
  // pulizia per il lettore: normalizza CRLF, togli frontmatter YAML, blocco TOC e H1
  // (gli .md d'archivio sono \r\n e hanno un TOC in testa — altrimenti renderebbe grezzo).
  const body = (() => {
    let raw: string = (data?.content ?? "").replace(/\r\n/g, "\n");
    raw = raw.replace(/^---\n[\s\S]*?\n---\n?/, "");
    const out: string[] = [];
    let inToc = false;
    for (const l of raw.split("\n")) {
      const t = l.trim();
      if (t === "<!-- TOC -->") { inToc = true; continue; }
      if (t === "<!-- /TOC -->") { inToc = false; continue; }
      if (inToc) continue;
      if (l.startsWith("# ")) continue;
      out.push(l);
    }
    while (out.length && out[0].trim() === "") out.shift();
    return out.join("\n");
  })();

  return (
    <div className="rounded-md bg-slate-900/40 border border-slate-800/60 overflow-hidden">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center gap-2 px-3 py-1.5 text-left">
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0" style={{ background: tone + "1f", color: tone }}>{it.id}</span>
        <span className="text-xs text-slate-300 truncate flex-1">{it.title}</span>
        {open ? <ChevronDown size={12} className="text-slate-500 shrink-0" /> : <ChevronRight size={12} className="text-slate-500 shrink-0" />}
      </button>
      {open && (
        <div className="px-3 pb-3 border-t border-slate-800/60">
          {isLoading ? (
            <p className="text-[11px] text-slate-500 italic py-3">carico…</p>
          ) : isError || !body.trim() ? (
            <p className="text-[11px] text-slate-500 italic py-3">contenuto non disponibile</p>
          ) : (
            <div className="rounded-lg bg-slate-950/60 px-4 py-3 mt-2 overflow-hidden">
              {body.split("\n").map((line, i) => renderMdLine(line, i))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Episodi Nina ARCHIVIATI (origine EP_AV + versioni precedenti) ─────────────
// "RAG Nina = tutti gli episodi, anche quelli archiviati". Sola lettura, raggruppati.
function NinaArchived() {
  const { data, isError, isLoading } = useNinaArchived();
  const [open, setOpen] = useState(true);
  const origine = data?.origine ?? [];
  const versioni = data?.versioni ?? [];
  const tot = origine.length + versioni.length;

  // Vuoto = l'API non sta servendo l'archivio (i file ci sono su disco). Non spariamo
  // un pannello vuoto: diciamo cosa fare, cosi' la pagina RAG Nina non resta muta.
  if (!tot) {
    return (
      <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Archive size={13} className="text-amber-400" />
          <span className="text-xs font-bold tracking-wider uppercase text-amber-300">Archiviati</span>
          <span className="ml-auto text-[10px] font-mono text-amber-400/70">{isLoading ? "carico…" : "0 caricati"}</span>
        </div>
        {!isLoading && (
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            {isError ? "Archivio non raggiungibile dall'API" : "L'API non sta servendo l'archivio"} — i file ci sono
            su disco (origine EP_AV + versioni re-emit), ma il server è vecchio (route assente).
            Riavvia l'API con <code className="text-amber-300">SERVICES\restart_api.ps1</code>, poi ricarica: appariranno tutti.
          </p>
        )}
      </div>
    );
  }

  const Group = ({ label, items, tone }: { label: string; items: { id: string; title: string; file: string; path: string }[]; tone: string }) => (
    items.length ? (
      <div className="mt-2">
        <p className="text-[10px] font-mono uppercase tracking-widest mb-1.5" style={{ color: tone }}>{label} · {items.length}</p>
        <div className="space-y-1">
          {items.map((it, i) => (
            <ArchivedRow key={it.file + i} it={it} tone={tone} />
          ))}
        </div>
      </div>
    ) : null
  );

  return (
    <div className="mt-4 rounded-xl border border-slate-800/70 bg-slate-900/30">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center gap-2 px-4 py-2.5 text-left">
        <Archive size={13} className="text-amber-400" />
        <span className="text-xs font-bold tracking-wider uppercase text-amber-300">Archiviati</span>
        <span className="text-[10px] font-mono text-slate-500">l'origine (EP_AV) + le versioni precedenti</span>
        <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400">{tot}</span>
        {open ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
      </button>
      {open && (
        <div className="px-4 pb-3">
          <Group label="Origine — il mondo prima del canone (EP_AV)" items={origine} tone="#f59e0b" />
          <Group label="Versioni SUPERATE (stessi titoli, vecchie versioni — NON i 50 definitivi)" items={versioni} tone="#64748b" />
        </div>
      )}
    </div>
  );
}

export function StorieView({ initialStagione = null, ninaView = null, sistemaView = null }: { initialStagione?: string | null; ninaView?: "rag" | "giorno0" | null; sistemaView?: "giorno0" | "guida" | null } = {}) {
  const navigateTo = useUIStore(s => s.navigateTo);
  const { data: liveContent } = useContentFiles();
  const liveCount = liveContent?.total ?? 0;

  const [filterStatus, setFilterStatus] = useState<EpisodeStatus | null>(null);

  // STORIE = due mondi: il SISTEMA (il dev-log) e NINA (l'avventura educativa).
  // Si arriva su AV -> apre direttamente Nina.
  const [mode, setMode] = useState<"sistema" | "nina">(ninaView || initialStagione === NINA_STAGIONE ? "nina" : "sistema");

  // Deep-link dalle voci di sidebar: "fondamenta" -> il documento del giorno 0,
  // "rag" -> l'elenco di tutti gli episodi/storie di Nina.
  const focusTarget = useUIStore(s => s.focusTarget);
  const fondamentaRef = useRef<HTMLDivElement>(null);
  const ragRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mode !== "nina") return;
    const ref = focusTarget === "rag" ? ragRef : focusTarget === "fondamenta" ? fondamentaRef : null;
    if (!ref) return;
    const t = setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => clearTimeout(t);
  }, [mode, focusTarget]);

  // Il fondamento: togliamo TOC e il titolo H1 (lo da' gia' l'intestazione di sezione),
  // cosi' non resta un "nome grande" che fa sembrare giorno 0 un singolo episodio.
  const stripFoundation = (md: string) => {
    const out: string[] = [];
    let inToc = false;
    for (const l of md.split("\n")) {
      const t = l.trim();
      if (t === "<!-- TOC -->") { inToc = true; continue; }
      if (t === "<!-- /TOC -->") { inToc = false; continue; }
      if (inToc) continue;
      if (l.startsWith("# ")) continue;
      out.push(l);
    }
    // niente righe vuote in testa
    while (out.length && out[0].trim() === "") out.shift();
    return out;
  };
  const foundationLines = stripFoundation(ninaFoundationMd);
  const sistemaFoundationLines = stripFoundation(sistemaFoundationMd);
  const sistemaGuidaLines = stripFoundation(sistemaGuidaMd);

  // Storie di Sistema: si visualizzano TUTTE le stagioni aperte di default (anche AUTO e
  // le bozze) — niente episodi nascosti. Se si arriva su una stagione precisa, apri solo quella.
  const [openSeasons, setOpenSeasons] = useState<Set<string>>(() => {
    if (initialStagione) return new Set([initialStagione]);
    return new Set(Object.keys(STAGIONI));
  });

  const toggleSeason = (key: string) =>
    setOpenSeasons(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const allKeys = Object.keys(STAGIONI);
  const allOpen = openSeasons.size >= allKeys.length;
  const setAll = (open: boolean) => setOpenSeasons(open ? new Set(allKeys) : new Set());

  const statusFiltered = (eps: Episode[]) =>
    filterStatus ? eps.filter(ep => ep.status === filterStatus) : eps;

  // Indice id->episodio + risolutore dei figli (approfondimenti) per la card ricorsiva
  const byId = new Map(EPISODES.map(e => [e.id, e]));
  const childrenOf = (ep: Episode): Episode[] =>
    (ep.children ?? []).map(id => byId.get(id)).filter((e): e is Episode => !!e);
  // Solo i principali (LV0) compaiono nell'elenco di stagione: i figli vivono annidati
  const isTopLevel = (ep: Episode) => !ep.parent_id;

  // Sezioni per stagione (ordine canonico), solo quelle con episodi.
  // SISTEMA = tutte le stagioni TRANNE AV (Nina ha il suo mondo a parte).
  const sections = Object.entries(STAGIONI)
    .filter(([key]) => key !== NINA_STAGIONE)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, s]) => ({
      key,
      ...s,
      episodes: statusFiltered(EPISODES.filter(ep => ep.stagione === key && isTopLevel(ep))),
      total: EPISODES.filter(ep => ep.stagione === key && isTopLevel(ep)).length,
    }))
    .filter(g => g.total > 0);

  // NINA = il cammino EP_N2 dal giorno 0, in ordine di casella (numero EP_N2).
  const ninaEpisodes = statusFiltered(
    EPISODES.filter(ep => ep.stagione === NINA_STAGIONE && isTopLevel(ep))
  ).sort((a, b) => ninaNum(a) - ninaNum(b));

  // Due PAGINE Nina isolate (non due sezioni nella stessa): il bottone preme l'una o l'altra.
  //   "rag"      -> RAG Nina = solo gli archiviati
  //   "giorno0"  -> Nina dal giorno 0 = fondamento + tutti gli episodi nella miglior versione
  const ninaPage: "rag" | "giorno0" = ninaView ?? (focusTarget === "rag" ? "rag" : "giorno0");

  // Pagina SISTEMA "dal giorno 0" (gemella di quella di Nina): il PIANO della storia
  // + SOLO gli episodi definitivi (EP_SG_NN), uno alla volta quando sono publish-ready.
  // Il materiale grezzo (le stagioni S0/S1/ST/S2/MOM/AUTO) resta in «Storie · Sistema»:
  // si riscrive dal vero, non si copia.
  const sgNum = (e: Episode) => {
    const m = e.id.match(/EP_SG_(\d+)/);
    return m ? parseInt(m[1], 10) : 999;
  };
  const sistemaGiorno0Eps = statusFiltered(
    EPISODES.filter(ep => ep.id.startsWith("EP_SG_") && isTopLevel(ep))
  ).sort((a, b) => sgNum(a) - sgNum(b));

  // Conteggi (per-mondo, così l'header dice la verità del mondo che stai guardando)
  const sistemaEps = EPISODES.filter(e => e.stagione !== NINA_STAGIONE);
  const modeEps = mode === "nina" ? EPISODES.filter(e => e.stagione === NINA_STAGIONE)
    : sistemaView ? sistemaGiorno0Eps : sistemaEps;
  const totalMin = modeEps.reduce((s, e) => s + e.durata_min, 0);
  const readyCount = modeEps.filter(e => e.status === "ready").length;

  return (
    <div className="flex flex-col h-full bg-[var(--shell-bg)] overflow-hidden" style={{ animation: "nl-fadeUp 0.3s ease both" }}>

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 pb-4 border-b border-slate-800/60">
        {/* (#57 gerarchia) il focale è la MOLE narrativa: quanti episodi esistono */}
        <div className="flex items-center gap-2 mb-1.5">
          {mode === "nina"
            ? <Sparkles size={12} style={{ color: NINA_COLOR }} />
            : <Mic size={12} className="text-emerald-400" />}
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]"
                style={{ color: mode === "nina" ? NINA_COLOR : "#34d399" }}>Storie</span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-700/40 to-transparent" />
        </div>
        <div className="flex items-baseline gap-2.5 flex-wrap mb-1">
          <span className="text-3xl font-black tabular-nums leading-none"
                style={{ color: mode === "nina" ? NINA_COLOR : "#6ee7b7" }}>{modeEps.length}</span>
          <span className="text-base font-bold text-slate-300">episodi</span>
          <span className="text-[11px] font-mono text-slate-500">
            · {Math.round(totalMin / 60)}h {totalMin % 60}m di racconto
            {liveCount > 0 && <span className="text-emerald-500 ml-1.5">· {liveCount} su disco</span>}
          </span>
        </div>

        {/* Selettore SISTEMA | NINA — nascosto nelle pagine Nina (isolamento totale:
            le pagine Nina si raggiungono solo dai bottoni in sidebar) */}
        <div className="flex items-center gap-2 ml-7 mt-2">
          {mode !== "nina" && !sistemaView && ([
            ["sistema", "Sistema", "#34d399", Mic],
            ["nina", "Nina", NINA_COLOR, Sparkles],
          ] as const).map(([m, label, col, Ico]) => {
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="text-xs px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-semibold"
                style={{
                  borderColor: active ? col : "#1e293b",
                  background: active ? col + "1f" : "transparent",
                  color: active ? col : "#64748b",
                }}
              >
                <Ico size={12} /> {label}
              </button>
            );
          })}
          {!sistemaView && (
            <button onClick={() => setAll(!allOpen)} className="ml-auto text-[9px] font-mono text-slate-500/70 hover:text-slate-300 uppercase tracking-wider flex items-center gap-1">
              {allOpen ? <Minimize2 size={9} /> : <Maximize2 size={9} />}
              {allOpen ? "chiudi tutto" : "apri tutto"}
            </button>
          )}
          <button onClick={() => navigateTo("sinapsi", "content")} className={`${sistemaView ? "ml-auto " : ""}text-[9px] font-mono text-indigo-400/60 hover:text-indigo-400 uppercase tracking-wider flex items-center gap-1`}>
            <Layers size={9} /> content engine
          </button>
          <button onClick={() => navigateTo("canvas")} className="text-[9px] font-mono text-slate-500/60 hover:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <ArrowLeft size={9} /> canvas
          </button>
        </div>

        {/* Introduzione di cosa trovi sotto — cambia col mondo scelto */}
        <p className="text-xs text-slate-500 leading-relaxed ml-7 mt-3 max-w-3xl">
          {mode === "nina" ? (
            ninaPage === "rag" ? (
              <><strong style={{ color: NINA_COLOR }}>RAG Nina</strong> — <strong style={{ color: NINA_COLOR }}>solo gli archiviati</strong>:
              l'origine (EP_AV) e le versioni precedenti, la sorgente da cui il nodo rigenera e indicizza da solo.</>
            ) : (
              <><strong style={{ color: NINA_COLOR }}>Nina dal giorno 0</strong> — il fondamento (cosa sappiamo fare, i personaggi,
              le zone, come nasce l'avventura) <strong style={{ color: NINA_COLOR }}>+ tutti gli episodi nella loro miglior versione</strong>, dall'inizio.</>
            )
          ) : sistemaView === "guida" ? (
            <><strong className="text-rose-400">Linea guida provvisoria</strong> — tutti i dati del terreno di sviluppo EP_SG
            fissati in un posto (regole, stagione 1, interazioni con Nina, cadenza). Fonte canonica in MENTE, indicizzata nel RAG.</>
          ) : sistemaView === "giorno0" ? (
            <><strong className="text-emerald-400">Il Sistema dal giorno 0</strong> — la storia definitiva, raccontata da capo:
            qui c'è <strong className="text-emerald-400">il piano</strong> (la tesi, i 3 atti, le fonti) e sotto entrano
            <strong className="text-emerald-400"> solo gli episodi definitivi</strong> (EP_SG), uno alla volta.
            Il materiale grezzo resta in «Storie · Sistema».</>
          ) : (
            <>Le storie del <strong className="text-slate-300">sistema</strong>: il dev-log di TITANIUM_OS, in ordine.
            Si <strong className="text-emerald-400">autoalimentano</strong> — ogni milestone verificato genera un episodio.
            · {readyCount} pronti su {modeEps.length}</>
          )}
        </p>

        {/* Status filter pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(["ready", "source", "draft"] as EpisodeStatus[]).map(st => {
            const cfg = STATUS_CONFIG[st];
            const active = filterStatus === st;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(active ? null : st)}
                className="text-xs px-3 py-1 rounded-full border transition-all flex items-center gap-1.5"
                style={{
                  borderColor: active ? "#475569" : "#1e293b",
                  background: active ? "#1e293b" : "transparent",
                  color: active ? "#e2e8f0" : "#475569",
                }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Corpo: SISTEMA (stagioni a fisarmonica) · NINA (dal giorno 0 + RAG Nina) ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
        {mode === "sistema" && !sistemaView && sections.map(g => {
          const isOpen = openSeasons.has(g.key);
          const shown = g.episodes.length;
          return (
            <div
              key={g.key}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: isOpen ? g.color + "44" : "rgba(30,41,59,0.8)", background: isOpen ? g.color + "08" : "transparent" }}
            >
              {/* Intestazione stagione — LA DIVISIONE, forte e colorata */}
              <button
                onClick={() => toggleSeason(g.key)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="shrink-0" style={{ color: g.color }}>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.color }} />
                <span className="text-sm font-bold tracking-wider uppercase shrink-0" style={{ color: g.color }}>
                  {g.label}
                </span>
                <span className="hidden md:block text-[11px] text-slate-500 italic truncate flex-1 min-w-0">
                  {g.description}
                </span>
                <span
                  className="ml-auto shrink-0 text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{ background: g.color + "1a", color: g.color }}
                >
                  {filterStatus && shown !== g.total ? `${shown}/${g.total}` : g.total} ep
                </span>
              </button>

              {/* Episodi della stagione */}
              {isOpen && (
                <div className="px-3 pb-3 pt-1 space-y-2">
                  {shown === 0 ? (
                    <p className="text-xs text-slate-600 italic px-2 py-3 text-center">
                      Nessun episodio con questo filtro.
                    </p>
                  ) : (
                    g.episodes.map(ep => <EpisodeCard key={ep.id} ep={ep} color={g.color} childrenOf={childrenOf} />)
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* ── SISTEMA LINEA GUIDA (provvisoria) — il terreno di sviluppo EP_SG, fissato ── */}
        {mode === "sistema" && sistemaView === "guida" && (
          <div className="scroll-mt-4">
            <div className="flex items-center gap-2 mb-2 mt-1">
              <BookOpen size={14} className="text-rose-400" />
              <h3 className="text-sm font-bold tracking-wider uppercase text-rose-400">
                Linea guida provvisoria — storie di sistema
              </h3>
              <span className="text-[10px] font-mono text-slate-500">fonte canonica: MENTE/STORIE/SG_GIORNO0 + PONTE_SG_NINA · questa è la copia di consultazione</span>
            </div>
            <div className="rounded-xl border px-5 py-4 overflow-hidden border-rose-400/20 bg-rose-400/5">
              {sistemaGuidaLines.map((line, i) => renderMdLine(line, i))}
            </div>
          </div>
        )}

        {/* ── SISTEMA DAL GIORNO 0 — pagina isolata (gemella di «Nina dal giorno 0»):
            il fondamento + tutti gli episodi in un'unica timeline cronologica ── */}
        {mode === "sistema" && sistemaView === "giorno0" && (
          <div className="scroll-mt-4">
            <div className="flex items-center gap-2 mb-2 mt-1">
              <Mic size={14} className="text-emerald-400" />
              <h3 className="text-sm font-bold tracking-wider uppercase text-emerald-400">
                Il Sistema dal giorno 0 — il piano della storia
              </h3>
              <span className="text-[10px] font-mono text-slate-500">la storia definitiva si compila un episodio alla volta · il grezzo resta in «Storie · Sistema»</span>
            </div>
            <div className="rounded-xl border px-5 py-4 overflow-hidden border-emerald-400/20 bg-emerald-400/5">
              {sistemaFoundationLines.map((line, i) => renderMdLine(line, i))}
            </div>

            {/* gli episodi DEFINITIVI (EP_SG_NN): entrano uno alla volta, solo publish-ready */}
            <div className="flex items-center gap-2 mb-2 mt-5">
              <BookOpen size={13} className="text-emerald-400" />
              <h4 className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                Gli episodi definitivi — uno alla volta
              </h4>
              <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400">
                {sistemaGiorno0Eps.length}
              </span>
            </div>
            {sistemaGiorno0Eps.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700/40 px-4 py-6 text-center space-y-1">
                <p className="text-xs text-slate-500">
                  Ancora nessun episodio definitivo: si parte quando il piano qui sopra ha l'ok.
                </p>
                <p className="text-[10px] font-mono text-slate-600">
                  i 9 capitoli entrano qui come EP_SG_01…09 · il materiale grezzo resta in «Storie · Sistema»
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {sistemaGiorno0Eps.map(ep => <EpisodeCard key={ep.id} ep={ep} color="#34d399" childrenOf={childrenOf} />)}
              </div>
            )}
          </div>
        )}

        {/* Prossimi episodi (solo SISTEMA a stagioni) */}
        {mode === "sistema" && !sistemaView && (
          <div className="mt-2 rounded-xl border border-dashed border-slate-700/40 px-4 py-5 text-center space-y-1">
            <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
              <BookOpen size={10} /> In pipeline
            </p>
            <p className="text-xs text-slate-600 font-mono">S2: Asse Y · Primo Pezzo H7 · Mandrino Day</p>
            <p className="text-xs text-slate-700 font-mono">ST: Il Brevetto · EP_T08</p>
            <p className="text-[10px] text-slate-700 font-mono mt-2">
              AUTO: generati da STATE.json su ogni milestone verificato
            </p>
          </div>
        )}

        {/* ── NINA: due PAGINE isolate — premi un bottone, vedi UNA pagina ── */}
        {/* PAGINA 1 — NINA DAL GIORNO 0: il fondamento + tutti gli episodi nella miglior versione */}
        {mode === "nina" && ninaPage === "giorno0" && (
            <div ref={fondamentaRef} className="scroll-mt-4">
              <div className="flex items-center gap-2 mb-2 mt-1">
                <Sparkles size={14} style={{ color: NINA_COLOR }} />
                <h3 className="text-sm font-bold tracking-wider uppercase" style={{ color: NINA_COLOR }}>
                  Nina dal giorno 0 — i {ninaEpisodes.length} episodi DEFINITIVI
                </h3>
                <span className="text-[10px] font-mono text-slate-500">il fondamento + il canone EP_N2 nella miglior versione · (l'archivio/sorgente è in «RAG Nina»)</span>
              </div>
              <div
                className="rounded-xl border px-5 py-4 overflow-hidden"
                style={{ borderColor: NINA_COLOR + "33", background: NINA_COLOR + "08" }}
              >
                {foundationLines.map((line, i) => renderMdLine(line, i))}
              </div>

              {/* gli episodi nuovi e definitivi (il cammino EP_N2), in ordine dall'inizio */}
              <div className="flex items-center gap-2 mb-2 mt-5">
                <BookOpen size={13} style={{ color: NINA_COLOR }} />
                <h4 className="text-xs font-bold tracking-wider uppercase" style={{ color: NINA_COLOR }}>
                  Tutti gli episodi — nella loro miglior versione, dall'inizio
                </h4>
                <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: NINA_COLOR + "1a", color: NINA_COLOR }}>
                  {ninaEpisodes.length}
                </span>
              </div>
              {ninaEpisodes.length === 0 ? (
                <p className="text-xs text-slate-600 italic px-2 py-4 text-center">Nessun episodio con questo filtro.</p>
              ) : (
                <div className="space-y-2">
                  {ninaEpisodes.map(ep => <EpisodeCard key={ep.id} ep={ep} color={NINA_COLOR} childrenOf={childrenOf} />)}
                </div>
              )}
            </div>
        )}

        {/* PAGINA 2 — RAG NINA: solo gli archiviati (origine EP_AV + versioni precedenti) */}
        {mode === "nina" && ninaPage === "rag" && (
            <div ref={ragRef} className="scroll-mt-4">
              <NinaRagPanel canonLocal={ninaEpisodes.length} />

              <div className="flex items-center gap-2 mb-2 mt-1">
                <Bot size={14} style={{ color: NINA_COLOR }} />
                <h3 className="text-sm font-bold tracking-wider uppercase" style={{ color: NINA_COLOR }}>
                  RAG Nina — l'ARCHIVIO (non gli episodi)
                </h3>
                <span className="text-[10px] font-mono text-slate-500">la sorgente da cui il nodo rigenera · gli episodi definitivi sono in «Nina dal giorno 0»</span>
              </div>

              {/* gli archiviati: l'origine (EP_AV) + le versioni precedenti */}
              <NinaArchived />
            </div>
        )}
      </div>
    </div>
  );
}
