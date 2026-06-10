// StorieView.tsx — Inventario episodi podcast + LLM training dataset
// parte di: TITANIUM_OS / DASHBOARD
// versione: 3.0 / data: 2026-06-07
// v3.0: stagioni a fisarmonica (divisione chiara), titoli leggibili, flood AUTO chiuso di default

import { useState } from "react";
import { EPISODES, STAGIONI, type Episode, type EpisodeStatus } from "../data/storieData";
import { Mic, Clock, ChevronDown, ChevronRight, ArrowLeft, Layers, BookOpen, Maximize2, Minimize2 } from "lucide-react";
import { useContentFiles } from "../hooks/useSystemQuery";
import { useUIStore } from "../stores/systemStore";

const STATUS_CONFIG: Record<EpisodeStatus, { label: string; color: string; dot: string }> = {
  ready:   { label: "PRONTO",  color: "text-emerald-400", dot: "bg-emerald-400" },
  draft:   { label: "BOZZA",   color: "text-yellow-400",  dot: "bg-yellow-400" },
  source:  { label: "SOURCE",  color: "text-blue-400",    dot: "bg-blue-400" },
  pending: { label: "IN CODA", color: "text-slate-500",   dot: "bg-slate-500" },
};

// Stagioni "rumorose" chiuse di default (il loro volume annega le altre)
const COLLAPSED_BY_DEFAULT = new Set(["AUTO"]);

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
        {/* ID badge */}
        <span
          className="shrink-0 text-[10px] font-mono font-bold px-2 py-1 rounded self-start"
          style={{ background: color + "1f", color }}
        >
          {ep.id}
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

export function StorieView({ initialStagione = null }: { initialStagione?: string | null } = {}) {
  const navigateTo = useUIStore(s => s.navigateTo);
  const { data: liveContent } = useContentFiles();
  const liveCount = liveContent?.total ?? 0;

  const [filterStatus, setFilterStatus] = useState<EpisodeStatus | null>(null);

  // Stagioni aperte: tutte tranne quelle "rumorose"; se si arriva su una stagione, apri solo quella
  const [openSeasons, setOpenSeasons] = useState<Set<string>>(() => {
    if (initialStagione) return new Set([initialStagione]);
    return new Set(Object.keys(STAGIONI).filter(k => !COLLAPSED_BY_DEFAULT.has(k)));
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

  // Sezioni per stagione (ordine canonico), solo quelle con episodi
  const sections = Object.entries(STAGIONI)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, s]) => ({
      key,
      ...s,
      episodes: statusFiltered(EPISODES.filter(ep => ep.stagione === key && isTopLevel(ep))),
      total: EPISODES.filter(ep => ep.stagione === key && isTopLevel(ep)).length,
    }))
    .filter(g => g.total > 0);

  const totalMin = EPISODES.reduce((s, e) => s + e.durata_min, 0);
  const readyCount = EPISODES.filter(e => e.status === "ready").length;

  return (
    <div className="flex flex-col h-full bg-[#020617] overflow-hidden" style={{ animation: "nl-fadeUp 0.3s ease both" }}>

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3 mb-1">
          <Mic size={18} className="text-amber-400" />
          <h2 className="text-base font-bold text-slate-100 tracking-widest uppercase">Storie</h2>
          <span className="text-xs font-mono text-slate-500 ml-auto">
            {EPISODES.length} ep · {Math.round(totalMin / 60)}h {totalMin % 60}m
            {liveCount > 0 && <span className="text-emerald-500 ml-2">· {liveCount} su disco</span>}
          </span>
        </div>
        <div className="flex items-center gap-3 ml-7">
          <p className="text-xs text-slate-500">
            Podcast · LLM dataset · {readyCount} pronti su {EPISODES.length}
          </p>
          <button onClick={() => setAll(!allOpen)} className="ml-auto text-[9px] font-mono text-slate-500/70 hover:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            {allOpen ? <Minimize2 size={9} /> : <Maximize2 size={9} />}
            {allOpen ? "chiudi tutto" : "apri tutto"}
          </button>
          <button onClick={() => navigateTo("sinapsi", "content")} className="text-[9px] font-mono text-indigo-400/60 hover:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
            <Layers size={9} /> content engine
          </button>
          <button onClick={() => navigateTo("canvas")} className="text-[9px] font-mono text-slate-500/60 hover:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <ArrowLeft size={9} /> canvas
          </button>
        </div>

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

      {/* ── Stagioni a fisarmonica ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
        {sections.map(g => {
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

        {/* Prossimi episodi */}
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
      </div>
    </div>
  );
}
