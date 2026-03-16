import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Progress } from "./UIComponents";
import { getVincenteItems, BOM_ITEMS } from "../data/bomData";

interface Miglioria {
  num: number;
  title: string;
  problema: string;
  soluzione: string;
  componenti: string[];
  costo: string;
  effetto: string;
  priorita: number;
  color: string;
}

const MIGLIORIE: Miglioria[] = [
  {
    num: 1,
    title: "Validazione Vibrazioni Reale",
    problema: "f0=3.83 Hz e calcolato, non misurato.",
    soluzione: "IFM VSA004 (accelerometro) + FM350 (contatore rapido) + impulso martello + FFT = f0 reale misurato.",
    componenti: ["IFM VSA004", "6ES7 350-1AH03-0AE0", "IFM VSE150"],
    costo: "0",
    effetto: "Dato reale al posto di stima. Contenuto YouTube garantito.",
    priorita: 2,
    color: "text-green-400",
  },
  {
    num: 2,
    title: "Asse Y — Upgrade a Vite 8mm",
    problema: "V3.0 prevede viti 1605 su tutti gli assi. Y non necessita alta forza assiale.",
    soluzione: "Vite passo 8mm su Y: rapidi +60% (8000 vs 5000 mm/min), risoluzione 0.008mm resta IT7.",
    componenti: ["VITE-8MM-1", "VITE-8MM-2"],
    costo: "0",
    effetto: "Velocita rapida Y +60%. Tempo ciclo ridotto su posizionamenti.",
    priorita: 3,
    color: "text-blue-400",
  },
  {
    num: 3,
    title: "Probing Automatico Z",
    problema: "Zero-setting manuale Z = errore operatore, tempo perso.",
    soluzione: "IFM O5D100 (laser ToF) su staffa MIMS accanto al mandrino. Routine G-code automatica.",
    componenti: ["IFM O5D100"],
    costo: "0",
    effetto: "Risparmio 3-5 min/pezzo. Su 100 pezzi/anno = 5-8 ore.",
    priorita: 4,
    color: "text-purple-400",
  },
  {
    num: 4,
    title: "Monitoraggio Termico Mandrino",
    problema: "Deriva termica = 7.2% dell'errore RSS. Peggiora durante sessione.",
    soluzione: "OMRON E5CC (termoregolatore PID) + termocoppia sul mandrino. Compensazione software Z.",
    componenti: ["OMRON E5CC-RX3A5M-001", "Omron E6B2-CWZ5B"],
    costo: "0",
    effetto: "RSS da 0.019mm a ~0.017mm. Contributo termico da 7.2% a <1%.",
    priorita: 5,
    color: "text-orange-400",
  },
  {
    num: 5,
    title: "Doppio HMI — Operativo + Diagnostica",
    problema: "Un solo HMI per tutto = navigazione complessa.",
    soluzione: "TP900 9\" = OPERATIVO (G-code, assi, allarmi). KTP600 6\" = DIAGNOSTICA (temp, vibrazioni, trend).",
    componenti: ["6AV2 124-0JC01-0AX0", "6AV6 647-0AD11-3AX0"],
    costo: "0",
    effetto: "Zero switch tra schermate. Produttivita e sicurezza.",
    priorita: 6,
    color: "text-cyan-400",
  },
  {
    num: 6,
    title: "Machine Vision QC",
    problema: "QC manuale post-fresatura = soggettivo, lento.",
    soluzione: "Basler acA1920-155um (USB3, 2.3MP) + Python edge detection vs DXF. Report OK/NOK automatico.",
    componenti: ["Basler acA1920-155um"],
    costo: "0",
    effetto: "QC oggettivo, documentato, presentabile B2B.",
    priorita: 8,
    color: "text-pink-400",
  },
  {
    num: 7,
    title: "Epoxy Granite Formula Ottimizzata",
    problema: "Epoxy commerciale zeta=0.03. Si puo migliorare.",
    soluzione: "Granito 2-8mm (45%) + 0.5-2mm (25%) + quarzo (15%) + resina EP2 (12%) + grafite (3%). Target zeta=0.05-0.08.",
    componenti: ["EPOXY-G", "IFM VSA004"],
    costo: "255 (gia previsto)",
    effetto: "Smorzamento +67-167%. Ogni test = episodio YouTube.",
    priorita: 7,
    color: "text-yellow-400",
  },
];

const PRIORITA_ESECUZIONE = [
  { step: 1, task: "Config G rinforzi", when: "Prossimo step (gia pianificato)", status: "current" as const },
  { step: 2, task: "Montaggio VSA004 + test impulso", when: "1 giorno — validazione f0", status: "pending" as const },
  { step: 3, task: "Setup vite 8mm su Y", when: "Durante assemblaggio — 0 costo", status: "pending" as const },
  { step: 4, task: "Staffa O5D100 per probing Z", when: "Stampa 3D su P1S — 2 ore", status: "pending" as const },
  { step: 5, task: "Cablaggio E5CC termocoppia mandrino", when: "Durante cablaggio quadro", status: "pending" as const },
  { step: 6, task: "Doppio HMI (programmazione PLC)", when: "Durante programmazione PLC", status: "pending" as const },
  { step: 7, task: "Epoxy Granite formula test", when: "Durante fill tubolari Q2", status: "pending" as const },
  { step: 8, task: "Basler QC setup", when: "Dopo V32 operativa — Q3-Q4", status: "pending" as const },
];

export const VincenteView = () => {
  const vincenteItems = getVincenteItems(BOM_ITEMS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Settaggio Vincente</h1>
        <p className="text-sm text-zinc-500 mt-1">7 migliorie concrete — Investimento aggiuntivo: 0</p>
      </div>

      {/* KPI miglioramento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-[10px] text-zinc-500 uppercase mb-1">RSS Attuale</div>
          <div className="text-lg font-black text-zinc-400 line-through">+/-0.019mm</div>
        </Card>
        <Card className="p-4 border-green-900/30">
          <div className="text-[10px] text-zinc-500 uppercase mb-1">RSS Vincente</div>
          <div className="text-lg font-black text-green-400">+/-0.017mm</div>
        </Card>
        <Card className="p-4 border-blue-900/30">
          <div className="text-[10px] text-zinc-500 uppercase mb-1">Rapidi Y</div>
          <div className="text-lg font-black text-blue-400">8000 mm/min</div>
          <div className="text-[10px] text-zinc-600">+60% vs 5000</div>
        </Card>
        <Card className="p-4 border-yellow-900/30">
          <div className="text-[10px] text-zinc-500 uppercase mb-1">Componenti attivati</div>
          <div className="text-lg font-black text-yellow-400">{vincenteItems.length}</div>
          <div className="text-[10px] text-zinc-600">+30% utilizzo lista</div>
        </Card>
      </div>

      {/* Progress globale */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-zinc-500 uppercase font-mono">Progresso Settaggio Vincente</span>
          <span className="text-xs text-zinc-400">0 / 8 completati</span>
        </div>
        <Progress value={0} indicatorClassName="bg-yellow-500" />
      </Card>

      {/* 7 Migliorie */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-tight">Le 7 Migliorie</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {MIGLIORIE.map(m => (
            <Card key={m.num} className="overflow-hidden hover:border-zinc-600 transition-all">
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-sm font-black ${m.color}`}>
                      {m.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{m.title}</h3>
                    </div>
                  </div>
                  <Badge variant={m.costo === "0" ? "success" : "warning"}>
                    {m.costo === "0" ? "COSTO 0" : `\u20AC${m.costo}`}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-red-400 font-mono uppercase">Problema: </span>
                    <span className="text-zinc-400">{m.problema}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-mono uppercase">Soluzione: </span>
                    <span className="text-zinc-300">{m.soluzione}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-mono uppercase">Effetto: </span>
                    <span className="text-zinc-300">{m.effetto}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {m.componenti.map(c => (
                    <span key={c} className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Priorita di esecuzione */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Priorita di Esecuzione</CardTitle>
          <CardDescription>Sequenza ottimale — dalla struttura ai sensori</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {PRIORITA_ESECUZIONE.map(p => (
              <div
                key={p.step}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                  p.status === "current"
                    ? "border-blue-600/30 bg-blue-950/20"
                    : "border-zinc-800 bg-zinc-950/50"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                  p.status === "current" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-500"
                }`}>
                  {p.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-zinc-200">{p.task}</div>
                  <div className="text-[10px] text-zinc-500">{p.when}</div>
                </div>
                <Badge variant={p.status === "current" ? "default" : "outline"}>
                  {p.status === "current" ? "PROSSIMO" : "PENDENTE"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Componenti Vincente */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Componenti Non Sfruttati (da attivare)</CardTitle>
          <CardDescription>{vincenteItems.length} componenti gia in tuo possesso con ruolo nel settaggio vincente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {vincenteItems.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded border border-zinc-800/50 hover:bg-zinc-800/20">
                <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                <span className="font-mono text-xs text-blue-500 w-40 flex-shrink-0">{item.id}</span>
                <span className="text-sm text-zinc-300 flex-1">{item.name}</span>
                <span className="text-[10px] text-yellow-500 font-mono text-right">{item.vincente}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
