// MappaGiocoView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-16
// Mappa-GIOCO semplificata (2D disegnata, niente 3D): le zone della storia come
// "tastini Lv", strade e monti sullo sfondo che collegano i punti. Clicchi una zona
// -> ci ENTRI e trovi le zone dentro (annidata, stile Skyrim). Data-driven dagli
// episodi (asse_nina): regioni -> concetti -> approfondimenti. Da rifinire a vista.

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { EPISODES } from "../data/storieData";

const NINA_REG: Record<number, string> = {
  0: "La Materia", 1: "La Traccia", 2: "L'Officina che gira sola", 3: "La Mente che parla",
  4: "La Biblioteca delle Fonti", 5: "La Grande Mappa", 6: "L'Esercito Silenzioso", 7: "Il Direttore",
};
const NINA_FIN: Record<number, string> = {
  1: "Il Valore", 2: "Spendere meno di quanto entra", 3: "Il Cuscinetto", 4: "Far lavorare i soldi",
};
const GIRO: Record<number, string> = { 1: "#34d399", 2: "#22d3ee", 3: "#a78bfa" };
const giroColor = (g: number) => GIRO[Math.min(Math.max(g, 1), 3)] ?? "#34d399";

type Zona = { id: string; nome: string; livello: number; scritto: boolean; figli: Zona[] };

function figliDi(epId: string): Zona[] {
  return EPISODES.filter(e => e.parent_id === epId).map(e => ({
    id: e.id,
    nome: e.narrativa?.asse_nina?.concetto ?? e.title,
    livello: e.narrativa?.asse_nina?.giro_spirale ?? 2,
    scritto: true,
    figli: [],
  }));
}

function buildMondo(): Zona {
  const regioniDi = (verticale: string, regioni: Record<number, string>): Zona[] => {
    const out: Zona[] = [];
    for (const n of Object.keys(regioni).map(Number).sort((a, b) => a - b)) {
      const eps = EPISODES
        .filter(e => !e.parent_id
          && (e.narrativa?.asse_nina?.verticale ?? "tech") === verticale
          && e.narrativa?.asse_nina?.regione === n)
        .sort((a, b) => (a.narrativa?.asse_nina?.giro_spirale ?? 1) - (b.narrativa?.asse_nina?.giro_spirale ?? 1));
      if (!eps.length) continue;
      const concetti: Zona[] = eps.map(e => ({
        id: e.id,
        nome: e.narrativa?.asse_nina?.concetto ?? e.title,
        livello: e.narrativa?.asse_nina?.giro_spirale ?? 1,
        scritto: e.narrativa?.asse_nina?.stato_nina === "adattato",
        figli: figliDi(e.id),
      }));
      out.push({
        id: `${verticale}-${n}`, nome: regioni[n] ?? `Regione ${n}`, livello: 1,
        scritto: concetti.some(c => c.scritto), figli: concetti,
      });
    }
    return out;
  };
  return {
    id: "mondo", nome: "Il Mondo di Nina", livello: 0, scritto: true,
    figli: [...regioniDi("tech", NINA_REG), ...regioniDi("finanza", NINA_FIN)],
  };
}

const W = 1000;
const H = 560;
const PAD = 130;
const MONTI = [{ x: 200, y: 150 }, { x: 520, y: 110 }, { x: 820, y: 165 }, { x: 360, y: 440 }, { x: 700, y: 450 }];

export function MappaGiocoView() {
  const [stack, setStack] = useState<Zona[]>(() => [buildMondo()]);
  const cur = stack[stack.length - 1];
  if (!cur) return null;

  const items = cur.figli.map((z, i) => {
    const n = cur.figli.length;
    const t = n <= 1 ? 0.5 : i / (n - 1);
    const x = PAD + t * (W - 2 * PAD);
    const y = H * 0.46 + Math.sin(t * Math.PI * (n <= 4 ? 1.1 : 2.3)) * (H * 0.30);
    return { z, x, y };
  });
  const road = items.map((it, i) => `${i === 0 ? "M" : "L"} ${it.x.toFixed(0)} ${it.y.toFixed(0)}`).join(" ");

  return (
    <div className="h-full overflow-hidden flex flex-col" style={{ background: "#0a0f1a" }}>
      <style>{`
        @keyframes mg-fade { from { opacity: 0; } to { opacity: 1; } }
        .mg-zona { animation: mg-fade .45s ease backwards; }
        .mg-can { transition: filter .18s ease; cursor: pointer; }
        .mg-can:hover { filter: brightness(1.45); }
        .mg-road { animation: mg-fade .8s ease backwards; }
      `}</style>
      {/* breadcrumb */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60 flex-wrap">
        {stack.length > 1 && (
          <button onClick={() => setStack(s => s.slice(0, -1))} className="text-slate-400 hover:text-white" title="indietro">
            <ChevronLeft size={16} />
          </button>
        )}
        <div className="flex items-center gap-1.5 text-[11px] font-mono flex-wrap">
          {stack.map((z, i) => (
            <span key={z.id} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-700">/</span>}
              <button onClick={() => setStack(s => s.slice(0, i + 1))}
                className={i === stack.length - 1 ? "text-pink-300 font-bold" : "text-slate-500 hover:text-slate-300"}>
                {z.nome}
              </button>
            </span>
          ))}
        </div>
        <span className="ml-auto text-[10px] font-mono text-slate-600">{cur.figli.length} zone · clicca un tastino con › per entrare</span>
      </div>

      {/* mappa */}
      <div className="flex-1 relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect width={W} height={H} fill="#0a0f1a" />
          {/* monti (sfondo) */}
          {MONTI.map((m, i) => (
            <g key={i} opacity={0.25}>
              <polygon points={`${m.x - 75},${m.y + 75} ${m.x},${m.y - 45} ${m.x + 75},${m.y + 75}`} fill="#1e293b" stroke="#334155" strokeWidth={1} />
              <polygon points={`${m.x - 22},${m.y + 12} ${m.x},${m.y - 45} ${m.x + 22},${m.y + 12}`} fill="#64748b" opacity={0.5} />
            </g>
          ))}
          {/* strade + zone (rianimano all'ingresso, key=cur.id) */}
          <g key={cur.id}>
            {items.length > 1 && <path className="mg-road" d={road} fill="none" stroke="#334155" strokeWidth={11} strokeLinecap="round" opacity={0.35} />}
            {items.length > 1 && <path className="mg-road" d={road} fill="none" stroke="#64748b" strokeWidth={4} strokeLinecap="round" strokeDasharray="2 16" opacity={0.6} />}
            {items.map(({ z, x, y }, i) => {
              const col = z.scritto ? giroColor(z.livello || 1) : "#64748b";
              const entra = z.figli.length > 0;
              return (
                <g key={z.id} className="mg-zona" style={{ animationDelay: `${i * 0.06}s` }}>
                  <g className={entra ? "mg-can" : ""} onClick={() => entra && setStack(s => [...s, z])} style={{ cursor: entra ? "pointer" : "default" }}>
                    <circle cx={x} cy={y} r={27} fill="#0f172a" stroke={col} strokeWidth={2.5} />
                    <circle cx={x} cy={y} r={6} fill={col} />
                    {entra && <text x={x} y={y + 5} textAnchor="middle" fontSize={15} fill={col} fontWeight={700}>›</text>}
                    <rect x={x - 62} y={y + 32} width={124} height={26} rx={7} fill="#0f172aee" stroke={col + "66"} strokeWidth={1} />
                    <text x={x} y={y + 49} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={col} fontWeight={700}>
                      Lv{z.livello || 1} · {z.nome.length > 16 ? z.nome.slice(0, 15) + "…" : z.nome}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
        <div className="absolute bottom-3 left-4 text-[9px] font-mono text-slate-600">
          2D semplificata · tastini con › si aprono (zone dentro) · colore = livello/giro · sfondo: strade + monti · da rifinire a vista
        </div>
      </div>
    </div>
  );
}
