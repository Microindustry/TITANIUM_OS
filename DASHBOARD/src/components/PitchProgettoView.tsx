// PitchProgettoView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-17
// Pitch PER PROGETTO: la spiegazione vera e attuale di ogni progetto (DOCS/PITCH_*.md),
// che i pilastri obsoleti non danno. Render markdown minimale (no dipendenze) + fallback.
// Sotto-voci di PITCH in sidebar: Nina · MIMS · V32 · GENESIS · EVA · HR.

import { useEffect, useState, type ReactNode } from "react";
import { Presentation } from "lucide-react";

const PITCH: Record<string, { file: string; title: string; accent: string }> = {
  nina:    { file: "PITCH_NINA.md",    title: "Nina",    accent: "#ec4899" },
  mims:    { file: "PITCH_MIMS.md",    title: "MIMS",    accent: "#fbbf24" },
  v32:     { file: "PITCH_V32.md",     title: "V32",     accent: "#34d399" },
  genesis: { file: "PITCH_GENESIS.md", title: "GENESIS", accent: "#22d3ee" },
  eva:     { file: "PITCH_EVA.md",     title: "EVA",     accent: "#a78bfa" },
  hr:      { file: "PITCH_HR.md",      title: "HR",      accent: "#94a3b8" },
};
const FALLBACK = { file: "PITCH_NINA.md", title: "Nina", accent: "#ec4899" };

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).forEach((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) out.push(<strong key={i} className="text-white">{p.slice(2, -2)}</strong>);
    else if (p.startsWith("`") && p.endsWith("`")) out.push(<code key={i} className="font-mono text-[12px] text-cyan-300 bg-slate-800/60 px-1 rounded">{p.slice(1, -1)}</code>);
    else if (p) out.push(p);
  });
  return out;
}

function Markdown({ src, accent }: { src: string; accent: string }) {
  const clean = src
    .replace(/<!--\s*TOC\s*-->[\s\S]*?<!--\s*\/TOC\s*-->/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      const items = list.slice();
      blocks.push(
        <ul key={`l${blocks.length}`} className="space-y-1 my-2">
          {items.map((li, i) => (
            <li key={i} className="text-[13px] text-slate-300 leading-relaxed flex gap-2">
              <span style={{ color: accent }}>·</span><span>{inline(li)}</span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  clean.split("\n").forEach((raw, idx) => {
    const l = raw.trimEnd();
    if (l.startsWith("- ")) { list.push(l.slice(2)); return; }
    flush();
    if (!l.trim()) return;
    if (l.startsWith("# ")) blocks.push(<h1 key={idx} className="text-2xl font-black text-white mt-1 mb-2">{inline(l.slice(2))}</h1>);
    else if (l.startsWith("### ")) blocks.push(<h3 key={idx} className="text-[12px] font-mono uppercase tracking-[0.2em] mt-5 mb-1.5" style={{ color: accent }}>{inline(l.slice(4))}</h3>);
    else if (l.startsWith("## ")) blocks.push(<h2 key={idx} className="text-lg font-bold text-slate-100 mt-4 mb-1.5">{inline(l.slice(3))}</h2>);
    else if (l.startsWith("> ")) blocks.push(<blockquote key={idx} className="border-l-2 pl-3 my-3 text-[14px] text-slate-300 italic" style={{ borderColor: accent + "66" }}>{inline(l.slice(2))}</blockquote>);
    else if (l.startsWith("---")) blocks.push(<hr key={idx} className="border-slate-800 my-3" />);
    else if (l.startsWith("_") && l.endsWith("_") && l.length > 2) blocks.push(<p key={idx} className="text-[11px] text-slate-500 italic my-1">{inline(l.slice(1, -1))}</p>);
    else blocks.push(<p key={idx} className="text-[13px] text-slate-300 leading-relaxed my-1.5">{inline(l)}</p>);
  });
  flush();
  return <div>{blocks}</div>;
}

// Corpo del pitch SENZA il contenitore pagina — riusabile dentro altre viste
// (unificazione #57: la pagina pilastro lo incorpora come tab "Pitch").
export function PitchProgettoBody({ progetto }: { progetto: string }) {
  const meta = PITCH[progetto] ?? FALLBACK;
  const [md, setMd] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setMd(null);
    setErr(false);
    fetch(`/api/file?path=DOCS/${meta.file}`)
      .then(r => r.json())
      .then(d => { if (d.ok && d.content) setMd(d.content); else setErr(true); })
      .catch(() => setErr(true));
  }, [meta.file]);

  return (
    <>
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 flex items-center gap-2" style={{ color: meta.accent }}>
        <Presentation size={11} /> Pitch per progetto · {meta.title}
      </div>
      {md ? (
        <Markdown src={md} accent={meta.accent} />
      ) : err ? (
        <p className="text-[13px] text-slate-500 leading-relaxed">
          Pitch non disponibile via API (serve l'API attiva). Apri <span className="font-mono text-slate-300">DOCS/{meta.file}</span>.
        </p>
      ) : (
        <p className="text-[12px] text-slate-600 font-mono animate-pulse">caricamento pitch…</p>
      )}
    </>
  );
}

export function PitchProgettoView({ progetto }: { progetto: string }) {
  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <PitchProgettoBody progetto={progetto} />
      </div>
    </div>
  );
}
