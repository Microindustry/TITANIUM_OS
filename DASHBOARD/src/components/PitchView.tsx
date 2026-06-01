// PitchView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-01
// Vista PITCH — racconto investor-facing. Scrolli e capisci, senza dover parlare.
// Additiva: non tocca nessun'altra view. Legge i pct live da STATE.

import { useGlobalState } from "../hooks/SystemStateContext";

const ACCENT = {
  v32:     "#34d399",
  mims:    "#fbbf24",
  genesis: "#22d3ee",
  vita:    "#a78bfa",
  identity:"#94a3b8",
};

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl md:text-4xl font-black tabular-nums leading-none"
            style={{ color: color ?? "#fff" }}>{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1.5">{label}</span>
    </div>
  );
}

function PillarRow({ color, tag, name, line, pct }: {
  color: string; tag: string; name: string; line: string; pct: number;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-800/50 group">
      <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-base font-black tracking-tight" style={{ color }}>{name}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">{tag}</span>
        </div>
        <p className="text-[13px] text-slate-400 leading-snug mt-1">{line}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-xl font-black tabular-nums" style={{ color }}>{pct}<span className="text-xs text-slate-600">%</span></div>
        <div className="w-20 h-1 rounded-full bg-slate-800 overflow-hidden mt-1">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}

export function PitchView() {
  const { state } = useGlobalState();
  const p = state?.pillars ?? {};
  const pc = (k: string, d: number) => Number(p?.[k]?.pct_complete ?? d);

  return (
    <div className="h-full overflow-y-auto" style={{ background: "var(--shell-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-20">

        {/* ── ACT 0 — HERO ─────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-emerald-400/80">Il progetto</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] text-white">
            TITANIUM<span className="text-emerald-400">_</span>OS
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Un artigiano industriale che, da solo, sta costruendo il suo
            <span className="text-white font-semibold"> sistema operativo</span>:
            una fabbrica personale che trasforma il lavoro fisico in
            <span className="text-emerald-400 font-semibold"> un'impresa che si autoalimenta.</span>
          </p>
          <div className="flex gap-8 pt-4">
            <Stat value="15+" label="anni industria" />
            <Stat value="5" label="pilastri" color={ACCENT.genesis} />
            <Stat value="1" label="persona" color={ACCENT.mims} />
          </div>
        </section>

        {/* ── ACT 1 — CHI ──────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Chi</div>
          <h2 className="text-2xl font-black text-white">Matteo Benenati</h2>
          <p className="text-[15px] text-slate-300 leading-relaxed">
            Quindici anni in officina, ai livelli più alti della manifattura italiana.
            La mano che salda il titanio non è una metafora: è il vantaggio sleale.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["SCProject", "TIG titanio · MotoGP"],
              ["ESSEGI", "Robotica · programmazione"],
              ["DATWLER", "Presse industriali"],
              ["LU.VE", "Controllo qualità di linea"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
                <div className="text-sm font-bold text-slate-200">{k}</div>
                <div className="text-[12px] text-slate-500 mt-0.5">{v}</div>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-slate-400 leading-relaxed italic border-l-2 border-emerald-500/40 pl-4">
            ADHD probabile. Ogni sistema che costruisco non è decorazione — è la struttura
            che tiene insieme una mente che corre. Il software è la mia protesi cognitiva.
          </p>
        </section>

        {/* ── ACT 2 — I 5 PILASTRI ─────────────────────────────────── */}
        <section className="space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Il sistema · 5 pilastri connessi</div>
          <h2 className="text-2xl font-black text-white">Tutto si tiene</h2>
          <div>
            <PillarRow color={ACCENT.v32} tag="il motore" name="V32 — CNC" pct={pc("V32", 65)}
              line="Una fresatrice di precisione costruita da zero. È la fonte: produce, paga, finanzia il resto." />
            <PillarRow color={ACCENT.mims} tag="il sogno" name="MIMS" pct={pc("MIMS", 30)}
              line="Materiali e connettori modulari brevettabili. Idea in sviluppo — il salto di scala." />
            <PillarRow color={ACCENT.genesis} tag="il cervello" name="GENESIS" pct={pc("GENESIS", 55)}
              line="L'OS digitale: AI, automazione, memoria. Il sistema che gestisce la costruzione di sé stesso." />
            <PillarRow color={ACCENT.vita} tag="il ponte" name="VITA NATURA · EVA" pct={pc("VITA_NATURA", 40)}
              line="Un assistente AI che manda avanti il centro estetico — cashflow mentre il resto matura." />
            <PillarRow color={ACCENT.identity} tag="la voce" name="IDENTITY" pct={pc("IDENTITY", 50)}
              line="Brand, contenuti, percorso. Ogni passo costruito diventa una storia che documenta il metodo." />
          </div>
          <p className="text-[13px] text-slate-500 leading-relaxed pt-1">
            La catena è intenzionale: <span className="text-emerald-400/90">V32</span> produce gli stampi →
            <span className="text-amber-400/90"> MIMS</span> diventa prodotto · <span className="text-cyan-400/90">GENESIS</span> orchestra tutto ·
            <span className="text-violet-400/90"> EVA</span> finanzia il ponte.
          </p>
        </section>

        {/* ── ACT 3 — PROOF ────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Non parole · numeri misurati</div>
          <h2 className="text-2xl font-black text-white">La prova è fisica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
            <Stat value="±0.019" label="mm precisione" color={ACCENT.v32} />
            <Stat value="178" label="kg corpo unico" color={ACCENT.v32} />
            <Stat value="61h" label="break-even V32" color={ACCENT.mims} />
            <Stat value="322%" label="ROI anno 1" color={ACCENT.mims} />
          </div>
          <p className="text-[14px] text-slate-400 leading-relaxed">
            Investimento V32: <span className="text-slate-200">€2.250</span>. Ogni milestone fisico genera
            automaticamente un episodio, un reel, un dato di training — <span className="text-white">1 input → N output.</span>
            Il lavoro in officina alimenta il sistema digitale, che rende l'officina più capace. Il loop è il prodotto.
          </p>
        </section>

        {/* ── ACT 4 — VISIONE ──────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">Dove arriva</div>
          <h2 className="text-2xl font-black text-white">Il capannone, 2030</h2>
          <p className="text-[15px] text-slate-300 leading-relaxed">
            Non è un obiettivo di lavoro. È un obiettivo di <span className="text-emerald-400 font-semibold">sovranità</span>:
            uno spazio dove V32, VULCAN e MIMS girano insieme, una produzione propria, la libertà di costruire
            senza chiedere permesso. Entro il <span className="text-white">15 luglio 2030</span>.
          </p>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 mt-2">
            <p className="text-lg text-slate-200 leading-relaxed font-medium">
              «Un sistema che gira da solo vale più di dieci abitudini che dipendono dalla volontà.»
            </p>
            <p className="text-[11px] font-mono uppercase tracking-widest text-emerald-400/70 mt-3">— la regola zero</p>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="border-t border-slate-800 pt-10 pb-6">
          <p className="text-[13px] text-slate-500 leading-relaxed">
            Cerco chi porta la <span className="text-slate-300">scala</span> a un metodo già provato.
            Non un exit: un <span className="text-white font-semibold">per-noi-più</span>.
          </p>
          <div className="text-[11px] font-mono text-slate-700 mt-4">TITANIUM_OS · Microindustry · benenatimatteo.mb@gmail.com</div>
        </section>

      </div>
    </div>
  );
}
