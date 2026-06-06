import episodesData from "./episodes.json";
// storieData.ts — Inventario episodi CONTENT ENGINE
// parte di: TITANIUM_OS / DASHBOARD
// versione: 2.0 / data: 2026-05-27
// Contenuto: testi completi da SINAPSI/STORIE

export type EpisodeStatus = "ready" | "draft" | "source" | "pending";

export interface Episode {
  id: string;
  title: string;
  sottotitolo: string;
  stagione: string;
  stagione_label: string;
  data_evento: string;
  tags: string[];
  status: EpisodeStatus;
  durata_min: number;
  preview: string;
  content: string;
}

export const STAGIONI: Record<string, { label: string; color: string; order: number; description: string }> = {
  S0:   { label: "Le Origini",       color: "#6366f1", order: 0, description: "Prima del sistema. L'AI che chiamava Socio, i tre file, il seme." },
  S1:   { label: "Il Presente",      color: "#10b981", order: 1, description: "Chi è Matteo, la V32, la taverna, l'ecosistema. La storia principale." },
  ST:   { label: "Il Sistema",       color: "#f59e0b", order: 2, description: "GENESIS, Dashboard, decisioni architetturali, TITANIUM_OS." },
  S2:   { label: "La Costruzione",   color: "#ef4444", order: 3, description: "Build log fisici: Config G, Epoxy Granite, assi, primo pezzo." },
  AUTO: { label: "Generati",         color: "#94a3b8", order: 4, description: "Episodi auto-generati da STATE.json ad ogni milestone." },
  MOM:  { label: "Momenti",          color: "#a78bfa", order: 5, description: "Momenti chiave isolati, inseribili tra gli episodi principali." },
  AV:   { label: "L'Avventura",      color: "#ec4899", order: 6, description: "Binario educativo: il mondo fantastico che spiega la tecnologia ai bambini. Nina + THEMIS contro l'Entropia." },
};

export const EPISODES: Episode[] = episodesData as unknown as Episode[];
