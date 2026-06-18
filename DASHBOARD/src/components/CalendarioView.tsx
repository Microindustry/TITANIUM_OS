// CalendarioView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-18
// CALENDARIO / diario di bordo: cosa abbiamo fatto giorno per giorno, dai commit reali.
// Fonte: DOCS/INVENTARIO_NOTTURNO.md (generato dalla catena notturna). Integra, non duplica.

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";

type Commit = { hash: string; msg: string; color: string };
type Giorno = { data: string; nCommit: number; commits: Commit[]; stats: string };

const CAT: { re: RegExp; color: string }[] = [
  { re: /^auto[:(]/i, color: "#64748b" },
  { re: /^feat[:(]/i, color: "#34d399" },
  { re: /^fix[:(]/i, color: "#fbbf24" },
  { re: /^integra[:(]/i, color: "#22d3ee" },
  { re: /^critiche[:(]/i, color: "#f43f5e" },
  { re: /^content[:(]/i, color: "#a78bfa" },
  { re: /^(polish|cleanup|chore|docs|refactor)[:(]/i, color: "#94a3b8" },
];
function colorOf(msg: string): string {
  for (const c of CAT) if (c.re.test(msg)) return c.color;
  return "#94a3b8";
}

function parse(md: string): Giorno[] {
  const giorni: Giorno[] = [];
  const lines = md.replace(/<!--[\s\S]*?-->/g, "").split("\n");
  let cur: Giorno | null = null;
  for (const raw of lines) {
    const l = raw.trim();
    const h = l.match(/^##\s+(\d{4}-\d{2}-\d{2})\s*·\s*(\d+)\s*commit/i);
    if (h) { cur = { data: h[1], nCommit: Number(h[2]), commits: [], stats: "" }; giorni.push(cur); continue; }
    if (!cur) continue;
    const c = l.match(/^-\s+`([0-9a-f]+)`\s+(.*)$/i);
    if (c) { cur.commits.push({ hash: c[1], msg: c[2], color: colorOf(c[2]) }); continue; }
    const s = l.match(/^_(.*)_$/);
    if (s) cur.stats = s[1];
  }
  return giorni;
}

const labelGiorno = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });

export function CalendarioView() {
  const [giorni, setGiorni] = useState<Giorno[] | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("/api/file?path=DOCS/INVENTARIO_NOTTURNO.md")
      .then(r => r.json())
      .then(d => { if (d.ok && d.content) setGiorni(parse(d.content)); else setErr(true); })
      .catch(() => setErr(true));
  }, []);

  const totCommit = giorni?.reduce((s, g) => s + g.nCommit, 0) ?? 0;

  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">

        <div className="flex items-center gap-3">
          <CalendarDays size={22} className="text-indigo-300" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-300/80">Calendario · diario di bordo</div>
            <h1 className="text-2xl font-black text-white">Cosa abbiamo fatto, giorno per giorno</h1>
          </div>
        </div>
        <p className="text-[12px] text-slate-500">
          Dai commit reali della catena notturna · il più recente in alto
          {giorni && <span className="text-slate-600"> · {giorni.length} giorni, {totCommit} commit</span>}
        </p>

        {err && (
          <p className="text-[13px] text-slate-500">
            Inventario non ancora disponibile — si popola alla prossima catena notturna
            (<span className="font-mono text-slate-400">DOCS/INVENTARIO_NOTTURNO.md</span>).
          </p>
        )}
        {!giorni && !err && <p className="text-[12px] text-slate-600 font-mono animate-pulse">caricamento diario…</p>}

        <div className="space-y-4">
          {giorni?.map((g, i) => (
            <motion.div
              key={g.data}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.45), ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden"
            >
              <div className="flex items-baseline justify-between px-4 py-3 border-b border-slate-800/70 bg-slate-900/60">
                <div>
                  <span className="text-[13px] font-bold text-slate-100 capitalize">{labelGiorno(g.data)}</span>
                  <span className="text-[10px] font-mono text-slate-600 ml-2">{g.data}</span>
                </div>
                <span className="text-[10px] font-mono text-indigo-300/80">{g.nCommit} commit</span>
              </div>
              <div className="px-4 py-3 space-y-1.5">
                {g.commits.map((c, k) => (
                  <div key={c.hash + k} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: c.color, boxShadow: `0 0 5px ${c.color}99` }} />
                    <span className="text-[10px] font-mono text-slate-600 flex-shrink-0 mt-0.5">{c.hash.slice(0, 7)}</span>
                    <span className="text-[12px] text-slate-300 leading-snug">{c.msg}</span>
                  </div>
                ))}
              </div>
              {g.stats && (
                <div className="px-4 py-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-500">{g.stats}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
