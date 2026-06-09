// avventuraMapData.ts — la Mappa dell'Avventura (mondo di Nina), a livelli
// parte di: TITANIUM_OS / DASHBOARD
// versione: 0.1 / data: 2026-06-09
// Fonte canone: CONTENT_ENGINE/DATABASE/MONDO/{BIBBIA_DEL_MONDO, PERCORSO_EVOLUTIVO, MAPPA_AVVENTURA}.md
// Bozza dati: le 7 Regioni (l'arco "storia dell'IA") ancorate al progetto reale.

export type EpStato = "scritto" | "da-scrivere" | "futuro";

export interface RegioneEpisodio {
  id: string;          // es. EP_AV_01
  titolo: string;
  stato: EpStato;
}

export interface Regione {
  n: number;
  nome: string;        // nome nel mondo
  tappa: string;       // la tappa dell'arco (concetto IA)
  pietra: string;      // ⟡n + nome
  colore: string;
  concetto: string;    // per il bambino
  vero: string;        // per il papà fabbro
  pezzoReale: string;  // il pezzo del progetto che la àncora
  episodi: RegioneEpisodio[];
  semi: string[];      // episodi tecnici-fonte (id o titolo breve)
  pietreRichiamate: string[];
}

export interface MondoLuogo { nome: string; desc: string; }
export interface MondoCast { nome: string; ruolo: string; stato: string; }

export const MONDO = {
  titolo: "Il Sistema",
  sottotitolo: "Due terre — Atomi e Bit — cucite da un ponte: la Giuntura.",
  legge: "Il Grande Loop ⟡1 — un gesto fatto bene non fa una cosa sola: ne fa tre.",
  nemico: "l'Entropia (il Disordine) — non si uccide, si tiene a bada con struttura e Loop.",
  protagonisti: "Nina (non sa, è il ponte verso chi guarda) + THEMIS (sa, custode della Giuntura).",
  luoghi: [
    { nome: "La Giuntura", desc: "Il ponte Atomi↔Bit, cuore del mondo: dove l'energia diventa struttura." },
    { nome: "La Taverna", desc: "I 12 m² da cui parte tutto. Il seme." },
    { nome: "La Mappa Vivente", desc: "Questa mappa: mostra il mondo e si aggiorna da sola." },
    { nome: "Il Grande Loop", desc: "La legge del mondo: aggiusti, impari, lasci una traccia." },
  ] as MondoLuogo[],
  cast: [
    { nome: "THEMIS", ruolo: "Custode della Giuntura · la misura esatta", stato: "attiva" },
    { nome: "FORGE", ruolo: "Fabbro degli Atomi · dà forma alla materia", stato: "futuro" },
    { nome: "EVA", ruolo: "Messaggera · parla col mondo di fuori", stato: "in sviluppo" },
    { nome: "AVA", ruolo: "Cantastorie · trasforma ciò che accade in racconto", stato: "pianificata" },
    { nome: "ARIA", ruolo: "Tessitrice del tempo · tiene l'ordine delle giornate", stato: "futuro" },
    { nome: "NEXUS", ruolo: "Direttore d'orchestra · coordina chi fa cosa", stato: "futuro" },
    { nome: "TESLA", ruolo: "Ascoltatore dei sensori · sente il battito delle macchine", stato: "futuro" },
  ] as MondoCast[],
};

export const REGIONI: Regione[] = [
  {
    n: 1, nome: "La Traccia", tappa: "il Loop", pietra: "⟡1 il Grande Loop", colore: "#6366f1",
    concetto: "Se fai bene una cosa, lasci una traccia che insegna ad altri.",
    vero: "Un gesto → un pezzo + una misura imparata + una nota che resta.",
    pezzoReale: "il sistema che cattura e ripete (MENTE, le tracce)",
    episodi: [{ id: "EP_AV_00", titolo: "La Bambina e la Giuntura", stato: "scritto" }],
    semi: ["EP_S0_00 Il Socio", "MOM_04 Il Documento Master", "EP_T07 Il Documento"],
    pietreRichiamate: [],
  },
  {
    n: 2, nome: "L'Officina che Gira Sola", tappa: "l'Automazione", pietra: "⟡2 l'Automazione", colore: "#f59e0b",
    concetto: "Un incantesimo che, detto una volta, si ripete da solo senza di te.",
    vero: "Watcher + task notturni: il gesto ripetuto diventa codice che gira.",
    pezzoReale: "watcher + notturne + AI News Watcher",
    episodi: [{ id: "EP_AV_01", titolo: "L'Incantesimo che si Ripete", stato: "scritto" }],
    semi: ["MOM_01 La Prima Automazione", "EP_AUTO_29 Story Agent", "Il Sistema Respira da Solo"],
    pietreRichiamate: ["⟡1 Loop"],
  },
  {
    n: 3, nome: "La Mente che Parla", tappa: "l'LLM", pietra: "⟡3 il Modello", colore: "#10b981",
    concetto: "Una mente che capisce le parole e risponde — ma da sola si può sbagliare.",
    vero: "Claude (cloud) + Qwen locale sulla GPU: il cervello ibrido.",
    pezzoReale: "Claude / Qwen locale (leva LLM)",
    episodi: [{ id: "EP_AV_02", titolo: "La Mente che Parla", stato: "scritto" }],
    semi: ["EP_S2_01 Il Cervello Ibrido", "Leva LLM locale (Qwen)", "EP_AUTO_25 Capabilities"],
    pietreRichiamate: ["⟡1 Loop"],
  },
  {
    n: 4, nome: "La Biblioteca delle Fonti", tappa: "il RAG", pietra: "⟡4 la Memoria-con-fonti", colore: "#ef4444",
    concetto: "Cercare per significato, prendere i pezzi giusti e dire da dove vengono. Senza fonti è solo immaginazione.",
    vero: "MENTE RAG: 6.7k chunk, BM25+semantico+reranker, risposte citate.",
    pezzoReale: "MENTE RAG (6.7k chunk)",
    episodi: [{ id: "EP_AV_03", titolo: "la Biblioteca delle Fonti", stato: "da-scrivere" }],
    semi: ["EP_T05 Il Sistema Pensa", "EP_T04 SINAPSI", "EP_AUTO_26 RAG v4.0"],
    pietreRichiamate: ["⟡3 LLM"],
  },
  {
    n: 5, nome: "La Grande Mappa", tappa: "la Wiki / il grafo", pietra: "⟡5 la Conoscenza-organizzata", colore: "#a78bfa",
    concetto: "Non basta avere tutto: serve come sono legate le cose. Una mappa di fili.",
    vero: "Il salto RAG→Wiki: il grafo di relazioni (Graphify) e la vista GRAFO.",
    pezzoReale: "MENTE/ + grafo (Graphify / vista GRAFO)",
    episodi: [{ id: "EP_AV_04", titolo: "la Grande Mappa", stato: "da-scrivere" }],
    semi: ["EP_T02 NeuroMap", "EP_T01 La Dashboard", "EP_S2_03 La Tela", "Graphify / vista GRAFO"],
    pietreRichiamate: ["⟡4 RAG"],
  },
  {
    n: 6, nome: "L'Esercito Silenzioso", tappa: "gli Agenti", pietra: "⟡6 gli Agenti", colore: "#818cf8",
    concetto: "Tante piccole entità che fanno un lavoro ciascuna, mentre tu dormi.",
    vero: "THEMIS, EVA, FORGE, gli agenti notturni (research, story, audit).",
    pezzoReale: "THEMIS, EVA, FORGE… (il cast = nodi reali)",
    episodi: [{ id: "EP_AV_05", titolo: "l'Esercito", stato: "futuro" }],
    semi: ["MOM_03 L'Esercito", "EP_AUTO_24 8 Agenti Validatori", "EP_AUTO_23 Research Agent"],
    pietreRichiamate: ["⟡2 Automazione", "⟡4 RAG"],
  },
  {
    n: 7, nome: "Il Direttore", tappa: "l'Orchestrazione", pietra: "⟡7 l'Orchestrazione", colore: "#22d3ee",
    concetto: "Quando gli aiutanti sono tanti, serve qualcuno che dica chi fa cosa, e quando.",
    vero: "NEXUS (futuro), l'orchestratore; oggi La Tela + il calendario notturno.",
    pezzoReale: "NEXUS (futuro)",
    episodi: [{ id: "EP_AV_06", titolo: "il Direttore", stato: "futuro" }],
    semi: ["EP_S2_02 L'Orchestratore", "EP_S2_03 La Tela", "Il Sistema che si Guarda"],
    pietreRichiamate: ["⟡5 Wiki", "⟡6 Agenti"],
  },
];
