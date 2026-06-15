// InventarioView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-15
// Lo slot ex-"GRAFO" ripensato. Il grafo nel sito non ha mai retto: il grafo della
// conoscenza vero vive in OBSIDIAN (vault MENTE, graph view nativo). Qui questa
// posizione fa una cosa utile e onesta: mostra l'INVENTARIO — cosa abbiamo
// costruito, notte per notte (DOCS/INVENTARIO_NOTTURNO.md, generato dalla notturna).
// Fetch con fallback: se l'API non risponde, resta comunque la guida a Obsidian.

import { useEffect, useState } from "react";
import { Network, Archive, FolderGit2 } from "lucide-react";

const VAULT = "C:\\Users\\teo\\MICROINDUSTRY\\MENTE";
const LAUNCHER = "APRI_MENTE_Obsidian.bat";

export function InventarioView() {
  const [content, setContent] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("/api/file?path=DOCS/INVENTARIO_NOTTURNO.md")
      .then(r => r.json())
      .then(d => { if (d.ok && d.content) setContent(d.content); else setErr(true); })
      .catch(() => setErr(true));
  }, []);

  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400/70 flex items-center gap-2 mb-1">
            <Archive size={11} className="text-cyan-400" />
            Inventario & Conoscenza
          </div>
          <h1 className="text-2xl font-black text-white">Cosa abbiamo costruito</h1>
        </div>

        {/* ── IL GRAFO VERO È OBSIDIAN ── */}
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5">
          <div className="flex items-center gap-2 text-violet-300 font-bold text-sm mb-2">
            <Network size={14} /> Il grafo della conoscenza vive in Obsidian
          </div>
          <p className="text-[13px] text-slate-400 leading-relaxed">
            Il grafo nel sito non ha mai retto bene. La scelta: tenerlo dove funziona davvero —
            il <span className="text-slate-200">graph view nativo di Obsidian</span> sul vault MENTE
            (note + wikilink = il grafo-wiki, navigabile).
          </p>
          <div className="mt-3 grid gap-2 text-[12px] font-mono">
            <div className="flex items-center gap-2 text-slate-500">
              <FolderGit2 size={12} className="text-violet-400/70 flex-shrink-0" />
              <span className="text-slate-300">{VAULT}</span>
            </div>
            <div className="text-slate-600">apri: <span className="text-violet-300">{LAUNCHER}</span> (launcher sul Desktop)</div>
          </div>
        </div>

        {/* ── INVENTARIO NOTTURNO ── */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
            Inventario notturno · DOCS/INVENTARIO_NOTTURNO.md
          </div>
          {content ? (
            <pre className="text-[12px] leading-relaxed text-slate-300 whitespace-pre-wrap font-mono">
              {content}
            </pre>
          ) : err ? (
            <p className="text-[13px] text-slate-500 leading-relaxed">
              Inventario non ancora disponibile via API (parte alla prima catena notturna, o
              apri <span className="text-slate-300 font-mono">DOCS/INVENTARIO_NOTTURNO.md</span>).
              Lo genera <span className="text-slate-300 font-mono">inventario_notturno.py</span>:
              ogni notte aggiunge i commit del giro, costruendo lo storico di cosa è stato fatto.
            </p>
          ) : (
            <p className="text-[12px] text-slate-600 font-mono animate-pulse">caricamento inventario…</p>
          )}
        </div>

      </div>
    </div>
  );
}
