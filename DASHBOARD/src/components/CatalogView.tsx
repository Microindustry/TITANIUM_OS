import type { ReactNode } from "react";
import { Box, Component, Grid, Hexagon, Layers } from "lucide-react";
import { Badge } from "./UIComponents";

interface CatalogItemData {
  id: string;
  name: string;
  category: string;
  tier: string;
  desc: string;
  specs: string;
  status: string;
  icon: ReactNode;
}

// ASSOLUTO V3.0 — Pilastro 2: geometria sacra 40x40, Config 1/2/3, Tier tree
const CATALOG_ITEMS: CatalogItemData[] = [
  {
    id: "MIMS-C1",
    name: "MIMS Config 1: Strutturale",
    category: "Configurazione",
    tier: "Tier 1",
    desc: "Gamba strutturale — tubo D16 nel foro centrale. Colonne, montanti, pilastri.",
    specs: "Matrice 40x40mm | Croce D29.9 H7/g6 | Foro D16",
    status: "Verificato",
    icon: <Box className="text-blue-500" />,
  },
  {
    id: "MIMS-C2",
    name: "MIMS Config 2: Canalina",
    category: "Configurazione",
    tier: "Tier 1",
    desc: "4× tubi 10×10 agli angoli, centro libero. Cable management, aria, fluidi.",
    specs: "Passaggio cavi interno",
    status: "Verificato",
    icon: <Layers className="text-green-500" />,
  },
  {
    id: "MIMS-C3",
    name: "MIMS Config 3: Modulare",
    category: "Configurazione",
    tier: "Tier 2",
    desc: "Piastrine 10×10 slide-in + grani M4. Profilo reversibile = estruso alu. Game Changer.",
    specs: "Compatibile M4/M5 — staffe, supporti, pannelli",
    status: "In Sviluppo",
    icon: <Component className="text-orange-500" />,
  },
  {
    id: "MIMS-H",
    name: "MIMS Heavy",
    category: "Prodotto",
    tier: "Tier 2",
    desc: "Versione industria pesante. Tech-Bolt acciaio nitrurato.",
    specs: "Target 2027 | Architectural",
    status: "Target 2027",
    icon: <Hexagon className="text-purple-500" />,
  },
  {
    id: "ISOLA-1",
    name: "Isola Lavoro",
    category: "Applicazione",
    tier: "Tier 4",
    desc: "Banco sega lunedì, trapano martedì, custom giovedì — smonta/rimonta in 2h. Liquidità industriale.",
    specs: "Modulare | Zero saldature | Industrial",
    status: "Idea",
    icon: <Grid className="text-zinc-100" />,
  },
];

export const CatalogView = () => (
  <div className="space-y-6 animate-in slide-in-from-right duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CATALOG_ITEMS.map((item) => (
        <div
          key={item.id}
          className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all hover:shadow-2xl flex flex-col"
        >
          <div className="p-6 border-b border-zinc-800/50 bg-zinc-900 group-hover:bg-zinc-800/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <Badge
                color={
                  item.status === "Verificato"
                    ? "bg-green-900/30 text-green-400 border-green-800"
                    : "bg-zinc-800 text-zinc-500"
                }
              >
                {item.status}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{item.id}</p>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <p className="text-sm text-zinc-300 leading-relaxed">{item.desc}</p>
            <div className="space-y-2 pt-4 border-t border-zinc-800/50">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Tier</span>
                <span className="font-mono text-zinc-300">{item.tier}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Specs</span>
                <span className="font-mono text-zinc-300 text-right">{item.specs}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
