import { useState } from "react";
import { Anchor, Box, Calculator, Calendar, Hammer, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Progress,
  ScrollArea,
  StatBlock,
  TimelineItem,
  CheckItem,
} from "./UIComponents";

// Dati da ASSOLUTO V3.0 + V32 Analisi Tecnica Reale (tutto per cursor)
const INVESTIMENTO_EUR = 2250;
const BEP_ORE = 61;
const REVENUE_Y1 = 9500;

export const DashboardView = () => {
  const [isV32Open, setIsV32Open] = useState(false);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [partsSold, setPartsSold] = useState(0);

  const revenue = hoursWorked * 45 + partsSold * 500; // €45/h Precision Lab, €500/stampo MIMS (ATTO VIII)
  const profit = revenue - INVESTIMENTO_EUR;
  const progressToBreakEven = (revenue / INVESTIMENTO_EUR) * 100;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
        <div className="lg:col-span-2 space-y-6">
          <Card
            onClick={() => setIsV32Open(true)}
            className="shadow-xl overflow-hidden relative group border-blue-900/30 hover:border-blue-500 transition-all cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Anchor size={120} />
            </div>
            <div className="absolute top-4 right-4 animate-pulse">
              <Badge className="bg-blue-600 hover:bg-blue-500">APRI CHECKLIST</Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Box className="text-blue-500" /> TITANIUM V32
              </CardTitle>
              <CardDescription>Reattore Nucleare — Config G (verifica 13 Feb 2026)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatBlock label="Massa" value="178 kg" sub="69 non sospesa + 109 sospesa" />
                <StatBlock
                  label="Precisione"
                  value="±0.019 mm"
                  sub="Classe IT6-IT7"
                  color="text-green-400"
                />
                <StatBlock label="f₀" value="3.83 Hz" sub="4 molle ISO K=15.8 N/mm" />
                <StatBlock
                  label="ROI Y1"
                  value="322%"
                  sub="BEP 61 ore (1.4 mesi)"
                  color="text-yellow-400"
                />
              </div>
              <Progress value={45} />
            </CardContent>
          </Card>

          <Card className="border-green-900/20 bg-zinc-900/80">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calculator className="text-green-500" /> EVA: MOTORE ECONOMICO
              </CardTitle>
              <CardDescription>
                Simulatore Profitto — Investimento €{INVESTIMENTO_EUR.toLocaleString()} (Revenue Y1
                €{REVENUE_Y1.toLocaleString()})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-mono text-zinc-500 uppercase mb-2 block">
                      Ore Fresatura (€45/h — Precision Lab)
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setHoursWorked((h) => Math.max(0, h - 1))}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                      >
                        -
                      </button>
                      <div className="text-2xl font-bold w-16 text-center">{hoursWorked}</div>
                      <button
                        onClick={() => setHoursWorked((h) => h + 1)}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-500 uppercase mb-2 block">
                      Stampi MIMS (€500/stampo)
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setPartsSold((m) => Math.max(0, m - 1))}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                      >
                        -
                      </button>
                      <div className="text-2xl font-bold w-16 text-center">{partsSold}</div>
                      <button
                        onClick={() => setPartsSold((m) => m + 1)}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col justify-center space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-sm">Profitto Netto</span>
                    <span
                      className={`text-xl font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {profit >= 0 ? "+" : ""}€ {profit}
                    </span>
                  </div>
                  <Progress
                    value={progressToBreakEven}
                    indicatorClassName={profit >= 0 ? "bg-green-500" : "bg-yellow-500"}
                  />
                  <p className="text-[10px] text-zinc-500">
                    BEP: {BEP_ORE} ore (1.4 mesi @10h/sett) • 5 stampi MIMS
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="text-zinc-400" /> Timeline (ATTO XII)
              </CardTitle>
              <CardDescription>2026 → 2030 — La Mappa verso la Libertà Industriale</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] px-6 pb-6">
                <div className="border-l-2 border-zinc-800 ml-2 space-y-6 pl-6 pt-2">
                  <TimelineItem
                    date="15 Luglio 2030"
                    title="IL CAPANNONE"
                    desc="V32 + V33 operative. Matteo 35 anni: LIBERO."
                    status="future"
                  />
                  <TimelineItem
                    date="2029"
                    title="V32 Mk2 • EVA SaaS • 50k iscritti"
                    desc="Asse rotativo, 5 clienti, community marketplace."
                    status="future"
                  />
                  <TimelineItem
                    date="2028"
                    title="Precision Lab • Hub&Spoke"
                    desc="€2.000/mese, MIMS produzione continua, 10k iscritti."
                    status="future"
                  />
                  <TimelineItem
                    date="2027 Q4"
                    title="EVA €1.500/mese • Polimero brevettato"
                    desc="YouTube 1k iscritti, MIMS Heavy 50 kit."
                    status="future"
                  />
                  <TimelineItem
                    date="2027 Q1"
                    title="V32 operativa • Primi stampi MIMS"
                    desc="Target produzione e revenue."
                    status="future"
                  />
                  <TimelineItem
                    date="2026 Q3"
                    title="V32 assemblaggio completo"
                    desc="Pianificato."
                    status="future"
                  />
                  <TimelineItem
                    date="2026 Q2"
                    title="Colonne Z+U definitive • Epoxy fill"
                    desc="Pianificato."
                    status="future"
                  />
                  <TimelineItem
                    date="2026 Q1"
                    title="Rinforzi Config G"
                    desc="Fase A/B/C/D — prossimo step."
                    status="current"
                  />
                  <TimelineItem
                    date="Feb 2026"
                    title="Componenti verificati"
                    desc="Basamento saldato, asse X assemblato, HMI TP900, 9 piastre."
                    status="done"
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {isV32Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Hammer className="text-blue-500" /> APPENDICE B: PROCEDURA RINFORZI
                </h3>
                <p className="text-sm text-zinc-400">Configurazione G — Dettaglio da ASSOLUTO V3.0</p>
              </div>
              <button
                onClick={() => setIsV32Open(false)}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <ScrollArea className="p-6 space-y-6 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-sm font-bold uppercase">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" /> Fase A — Basamento
                </div>
                <div className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3">
                  <CheckItem text="4x gusset triangolari 150mm a ogni angolo (saldatura TIG cordone pieno)" />
                  <CheckItem text="4x diagonali 40x40x2 nei piani XZ e YZ (taglio 45°, saldatura a registro)" />
                  <CheckItem text="Verifica planarità con riga e spessimetro" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-sm font-bold uppercase">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" /> Fase B — Colonne Z+U (Config G)
                </div>
                <div className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3">
                  <CheckItem text="4x gusset 200mm base + 4x gusset 200mm testa" />
                  <CheckItem text="2x diagonali a X tra Z e U (40x40x2, L~630mm)" />
                  <CheckItem text="8x tiranti M10 micrometrici" />
                  <CheckItem text="Riempire tubolari con Epoxy Granite" />
                  <CheckItem text="Allineamento con comparatore centesimale &lt; 0.03mm" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-sm font-bold uppercase">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" /> Fase C — Telaio XY
                </div>
                <div className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3">
                  <CheckItem text="4x diagonali nel piano" />
                  <CheckItem text="8x gusset 100mm a tutti gli angoli" />
                  <CheckItem text="Verifica ortogonalità con squadra di precisione" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-sm font-bold uppercase">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" /> Fase D — Verifica finale
                </div>
                <div className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3">
                  <CheckItem text="Deflessione Z con comparatore + peso noto (target &lt; 0.03mm @100N)" />
                  <CheckItem text="Test vibrazioni con IFM VSE150 per confermare f₀" />
                </div>
              </div>
              <p className="text-xs text-zinc-500 pt-2">
                Materiale: ~5m tubolari 40x40x2, ~0.3m² lamiera 2mm, ~5kg Epoxy, 8 bulloni M10.
                Costo stimato: €40–60.
              </p>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};
