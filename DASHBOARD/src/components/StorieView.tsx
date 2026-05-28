// StorieView.tsx — Inventario episodi podcast + LLM training dataset
// parte di: TITANIUM_OS / DASHBOARD
// versione: 2.0 / data: 2026-05-28

import { useState } from "react";
import { EPISODES, STAGIONI, type Episode, type EpisodeStatus } from "../data/storieData";
import { Mic, Clock, ChevronDown, ChevronUp, ArrowLeft, Layers, BookOpen } from "lucide-react";
import { useContentFiles } from "../hooks/useSystemQuery";
import { useUIStore } from "../stores/systemStore";

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
  // inline bold
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

function EpisodeCard({ ep }: { ep: Episode }) {
  const [open, setOpen] = useState(false);
  const stagione = STAGIONI[ep.stagione];
  const status = STATUS_CONFIG[ep.status];
  const lines = ep.content.split("\n");

  return (
    <div
      className="rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur transition-all duration-200"
      style={{ borderColor: open ? stagione.color + "55" : undefined }}
    >
      {/* Header row */}
      <button
        className="w-full text-left px-4 py-3 flex items-start gap-3"
        onClick={() => setOpen(v => !v)}
      >
        {/* ID badge */}
        <span
          className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded mt-0.5"
          style={{ background: stagione.color + "22", color: stagione.color }}
        >
          {ep.id}
        </span>

        {/* Title + preview */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-100">{ep.title}</span>
            <span className="text-xs text-slate-400 italic truncate max-w-xs">{ep.sottotitolo}</span>
          </div>
          {!open && (
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{ep.preview}</p>
          )}
        </div>

        {/* Meta row right */}
        <div className="shrink-0 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {ep.durata_min}m
          </span>
          <span className={`flex items-center gap-1 font-medium ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 border-t border-slate-700/40">
          {/* Tags + date */}
          <div className="flex flex-wrap gap-1 mt-3 mb-4">
            {ep.tags.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                #{t}
              </span>
            ))}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-500 ml-auto">
              {ep.data_evento}
            </span>
          </div>

          {/* Rendered markdown content */}
          <div className="rounded-lg bg-slate-950/60 px-5 py-4 overflow-hidden">
            {lines.map((line, i) => renderMdLine(line, i))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StorieView() {
  const navigateTo = useUIStore(s => s.navigateTo);
  const { data: liveContent } = useContentFiles();
  const liveCount = liveContent?.total ?? 0;

  const [filterStagione, setFilterStagione] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<EpisodeStatus | null>(null);
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);

  const filtered = EPISODES.filter(ep => {
    if (filterStagione && ep.stagione !== filterStagione) return false;
    if (filterStatus && ep.status !== filterStatus) return false;
    return true;
  });

  // Group by stagione
  const grouped = Object.entries(STAGIONI)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, s]) => ({
      key,
      ...s,
      episodes: filtered.filter(ep => ep.stagione === key),
      total: EPISODES.filter(ep => ep.stagione === key).length,
    }))
    .filter(g => g.episodes.length > 0);

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
          <button onClick={() => navigateTo("sinapsi", "content")} className="ml-auto text-[9px] font-mono text-indigo-400/60 hover:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
            <Layers size={9} /> content engine
          </button>
          <button onClick={() => navigateTo("canvas")} className="text-[9px] font-mono text-slate-500/60 hover:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <ArrowLeft size={9} /> canvas
          </button>
        </div>

        {/* Season filter pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(STAGIONI).map(([key, s]) => {
            const count = EPISODES.filter(ep => ep.stagione === key).length;
            const active = filterStagione === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setFilterStagione(active ? null : key);
                  setExpandedSeason(active ? null : key);
                }}
                className="text-xs px-3 py-1 rounded-full border transition-all flex items-center gap-1.5"
                style={{
                  borderColor: active ? s.color : "#334155",
                  background: active ? s.color + "22" : "transparent",
                  color: active ? s.color : "#64748b",
                }}
              >
                {s.label}
                <span className="text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
          <div className="w-px bg-slate-700 mx-1" />
          {(["ready", "source", "draft"] as EpisodeStatus[]).map(st => {
            const cfg = STATUS_CONFIG[st];
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(filterStatus === st ? null : st)}
                className="text-xs px-3 py-1 rounded-full border transition-all flex items-center gap-1.5"
                style={{
                  borderColor: filterStatus === st ? "#475569" : "#1e293b",
                  background: filterStatus === st ? "#1e293b" : "transparent",
                  color: filterStatus === st ? "#e2e8f0" : "#475569",
                }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Season description — shown when a season is selected */}
        {filterStagione && STAGIONI[filterStagione]?.description && (
          <div
            className="mt-3 ml-0 px-3 py-2 rounded-lg text-xs text-slate-400 italic flex items-start gap-2"
            style={{ background: STAGIONI[filterStagione].color + "11", borderLeft: `2px solid ${STAGIONI[filterStagione].color}44` }}
          >
            <BookOpen size={11} className="mt-0.5 shrink-0" style={{ color: STAGIONI[filterStagione].color }} />
            {STAGIONI[filterStagione].description}
          </div>
        )}
      </div>

      {/* ── Episode list ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {grouped.map(g => (
          <div key={g.key}>
            {/* Stagione header */}
            <div
              className="flex items-center gap-2 mb-3 cursor-pointer group"
              onClick={() => setExpandedSeason(expandedSeason === g.key ? null : g.key)}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: g.color }}
              >
                {g.label}
              </span>
              <div className="flex-1 h-px" style={{ background: g.color + "33" }} />
              <span className="text-xs font-mono text-slate-600">{g.episodes.length} ep</span>
            </div>

            {/* Season description inline when not filtered */}
            {!filterStagione && g.description && (
              <p className="text-[11px] text-slate-600 italic mb-3 ml-0">
                {g.description}
              </p>
            )}

            {/* Episodes */}
            <div className="space-y-2">
              {g.episodes.map(ep => (
                <EpisodeCard key={ep.id} ep={ep} />
              ))}
            </div>
          </div>
        ))}

        {/* Prossimi episodi */}
        <div className="mt-4 rounded-xl border border-dashed border-slate-700/40 px-4 py-5 text-center space-y-1">
          <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-2">In pipeline</p>
          <p className="text-xs text-slate-600 font-mono">
            S2: Asse Y · Primo Pezzo H7 · Mandrino Day
          </p>
          <p className="text-xs text-slate-700 font-mono">
            ST: Il Brevetto · EP_T08
          </p>
          <p className="text-[10px] text-slate-700 font-mono mt-2">
            AUTO: generati da STATE.json su ogni milestone verificato
          </p>
        </div>
      </div>
    </div>
  );
}
