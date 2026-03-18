// StorieView.tsx — Inventario episodi podcast + LLM training dataset
// parte di: TITANIUM_OS / DASHBOARD
// versione: 1.0 / data: 2026-03-18

import { useState } from "react";
import { EPISODES, STAGIONI, type Episode, type EpisodeStatus } from "../data/storieData";
import { Mic, Clock, Tag, ChevronDown, ChevronUp, Circle } from "lucide-react";

const STATUS_CONFIG: Record<EpisodeStatus, { label: string; color: string; dot: string }> = {
  ready:   { label: "PRONTO",  color: "text-emerald-400", dot: "bg-emerald-400" },
  draft:   { label: "BOZZA",   color: "text-yellow-400",  dot: "bg-yellow-400" },
  source:  { label: "SOURCE",  color: "text-blue-400",    dot: "bg-blue-400" },
  pending: { label: "IN CODA", color: "text-slate-500",   dot: "bg-slate-500" },
};

function EpisodeCard({ ep }: { ep: Episode }) {
  const [open, setOpen] = useState(false);
  const stagione = STAGIONI[ep.stagione];
  const status = STATUS_CONFIG[ep.status];

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
            <span className="text-xs text-slate-400 italic truncate">{ep.sottotitolo}</span>
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
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3 mb-4">
            {ep.tags.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                #{t}
              </span>
            ))}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 ml-auto">
              {ep.data_evento}
            </span>
          </div>

          {/* Full content */}
          <div
            className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono bg-slate-950/60 rounded-lg p-4"
            style={{ fontSize: "0.8rem", lineHeight: "1.7" }}
          >
            {ep.content}
          </div>
        </div>
      )}
    </div>
  );
}

export function StorieView() {
  const [filterStagione, setFilterStagione] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<EpisodeStatus | null>(null);

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
    }))
    .filter(g => g.episodes.length > 0);

  const totalMin = EPISODES.reduce((s, e) => s + e.durata_min, 0);

  return (
    <div className="flex flex-col h-full bg-[#020617] overflow-hidden" style={{ animation: "nl-fadeUp 0.3s ease both" }}>

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3 mb-1">
          <Mic size={18} className="text-amber-400" />
          <h2 className="text-base font-bold text-slate-100 tracking-widest uppercase">Storie</h2>
          <span className="text-xs font-mono text-slate-500 ml-auto">
            {EPISODES.length} episodi · {Math.round(totalMin / 60)}h {totalMin % 60}m totali
          </span>
        </div>
        <p className="text-xs text-slate-500 ml-7">
          Podcast + dataset LLM · dal passato a oggi · {EPISODES.filter(e => e.status === "ready").length} pronti
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {/* Stagione filters */}
          {Object.entries(STAGIONI).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setFilterStagione(filterStagione === key ? null : key)}
              className="text-xs px-3 py-1 rounded-full border transition-all"
              style={{
                borderColor: filterStagione === key ? s.color : "#334155",
                background: filterStagione === key ? s.color + "22" : "transparent",
                color: filterStagione === key ? s.color : "#64748b",
              }}
            >
              {s.label}
            </button>
          ))}
          <div className="w-px bg-slate-700 mx-1" />
          {/* Status filters */}
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
      </div>

      {/* ── Episode list ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {grouped.map(g => (
          <div key={g.key}>
            {/* Stagione label */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: g.color }}
              >
                {g.label}
              </span>
              <div className="flex-1 h-px" style={{ background: g.color + "33" }} />
              <span className="text-xs font-mono text-slate-600">{g.episodes.length} ep</span>
            </div>

            {/* Episodes */}
            <div className="space-y-2">
              {g.episodes.map(ep => (
                <EpisodeCard key={ep.id} ep={ep} />
              ))}
            </div>
          </div>
        ))}

        {/* Prossimi episodi placeholder */}
        <div className="mt-4 rounded-xl border border-dashed border-slate-700/40 px-4 py-5 text-center">
          <p className="text-xs text-slate-600 font-mono">
            Prossimi: GENESIS · EVA · Fit Park 4.0 · Il Brevetto
          </p>
        </div>
      </div>
    </div>
  );
}
