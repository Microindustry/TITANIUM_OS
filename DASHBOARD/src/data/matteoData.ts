// matteoData.ts | TITANIUM_OS / DASHBOARD / data | v1.0 | 2026-05-29
// Dati statici sezione Matteo — skills, interessi, principi

export type Skill = {
  label: string;
  note: string;
  company: string;
  tags: string[];
  details: string[];
};

export type Interesse = {
  icon: string;
  label: string;
  note: string;
  details: string[];
};

export const SKILLS_INDUSTRIA: Skill[] = [
  {
    label: "TIG gr.1/gr.2 titanio",
    note: "MotoGP · SCProject · 200A bagno fusione",
    company: "SCProject",
    tags: ["Titanio", "Aerospace", "MotoGP", "TIG"],
    details: [
      "Saldatura TIG su titanio grado 1 e 2 — spessori 0.8–4 mm, corrente fino a 200A",
      "Parti MotoGP: collettori scarico, supporti telai, cover titanio e acciaio inox",
      "Controllo bagno fusione, gestione gas di protezione (Ar 99.999%), back-purge",
      "Materiali: Ti6Al4V · gr.9 · gr.1 puro — riconoscimento visivo cordone",
      "Lavoro in camera bianca su pezzi pre-consegna team factory MotoGP",
    ],
  },
  {
    label: "Robot Panasonic + cobot",
    note: "Programmazione percorsi + automazione ESSEGI",
    company: "ESSEGI",
    tags: ["Robotica", "MIG", "Automazione", "Panasonic"],
    details: [
      "Programmazione robot Panasonic serie TM per saldatura MIG automatizzata",
      "Setup percorsi su fixture custom — tolleranza ripetibilità ±0.1 mm",
      "Parametri: velocità filo, tensione d'arco, frequenza oscillazione, gas mix Ar/CO₂",
      "Cobot: collaborazione uomo-macchina per tratti difficili — safe-stop e zone",
      "Ottimizzazione cicli: riduzione ciclo pezzo da 4 min a 2:20 — scarti < 2%",
    ],
  },
  {
    label: "Manutenzione presse 250 bar",
    note: "Pneumatica · oleodinamica · idraulica · DATWLER",
    company: "DATWLER",
    tags: ["Pneumatica", "Oleodinamica", "Idraulica", "PLC", "Siemens"],
    details: [
      "Pneumatica: valvole direzionali 5/2 e 5/3, cilindri ISO, regolatori e FRL, pressostati",
      "Oleodinamica: pompe pistoni assiali, valvole proporzionali, accumulatori a membrana",
      "Idraulica presse: circuiti 250 bar, sostituzioni guarnizioni, diagnosi perdite su manifold",
      "Elettronica: lettura schemi ladder PLC Siemens S7, diagnosi I/O, sostituzione moduli",
      "Manutenzione preventiva: piani PM settimanali/mensili, MTBF tracking su fogli officina",
      "Diagnosi guasti: analisi vibrazioni, test pressione, lettura parametri HMI TP900",
    ],
  },
  {
    label: "QC + NDT / DT",
    note: "Test distruttivi, calibri, collaudi 60 bar · LU.VE",
    company: "LU.VE",
    tags: ["QC", "NDT", "Collaudi", "Metrology"],
    details: [
      "Controllo dimensionale: calibri, micrometri, comparatori, rugosimetri — ISO GPS",
      "NDT: ispezione visiva VT, penetranti PT, ultrasuoni UT su pezzi saldati",
      "DT: test a pressione fino a 60 bar su scambiatori e collettori in alluminio",
      "Redazione rapporti di non-conformità, NCR e 8D su SAP",
      "Collaudo finale su linea: test funzionali, leak test, certificazione CE",
    ],
  },
  {
    label: "Progettazione meccanica CNC",
    note: "V32 178 kg · Epoxy Granite · IT6-IT7",
    company: "TITANIUM_OS",
    tags: ["CNC", "CAD", "Epoxy Granite", "Precisione"],
    details: [
      "V32: fresatrice 3 assi 178 kg — telaio 40×40×3 S235 + colonne 60×60, h 905 mm",
      "Precisione RSS ±0.019 mm — IT6-IT7 — delta EG corretto a 0.03–0.06 mm",
      "Epoxy Granite filling su colonne cave — smorzamento vibrazioni +40 dB",
      "Guide SBR20 + viti sfe PMI C5 — 8 custodi ZX400 con pre-carico regolabile",
      "Servo Leadshine: closed-loop NEMA34 12 Nm — encoder 1000 ppr",
      "BEP: 61 ore → ROI anno 1 stimato 322% a €45/h Precision Lab",
    ],
  },
  {
    label: "Elettrica civile / industriale",
    note: "Quadri, relè, alimentatori, strumentazione",
    company: "Self-learning",
    tags: ["Elettrica", "Quadri", "CEI", "In apprendimento"],
    details: [
      "Lettura schemi elettrici civili e industriali — CEI 64-8, EN 60204-1",
      "Cablaggio quadri: morsettiere, interruttori, relè, contattori, inverter",
      "Strumentazione: PT100, termocoppie tipo K, trasduttori pressione 4-20 mA",
      "Alimentatori switching, UPS, cablaggi CAN bus e RS485 su macchine",
      "IN APPRENDIMENTO — corso CEI 11-27 + pratica su V32 CNC cabinet",
    ],
  },
];

export const SKILLS_DIGITAL: Skill[] = [
  {
    label: "LLM + Prompt Engineering",
    note: "Claude API · input tecnici strutturati · output verificati",
    company: "Anthropic / TITANIUM_OS",
    tags: ["Claude API", "Prompt", "Agents", "MCP"],
    details: [
      "Claude API: structured prompts per output tecnici verificabili (BOM, schemi, codice)",
      "Gestione contesto lungo: chunking, cache prompts, tool use su dati RAG",
      "Agent framework: 8 agenti validatori specializzati (TESLA, FORGE, ARIA, EVA...)",
      "MCP custom: 5 tool server locali — get_state, search_mente, update_milestone",
      "Research Agent: 11 sorgenti accademiche (arXiv, OpenAlex, Semantic Scholar, CNKI)",
    ],
  },
  {
    label: "Python 3.11",
    note: "Flask API · RAG pipeline · CLI tools · automazioni",
    company: "TITANIUM_OS",
    tags: ["Python", "Flask", "CLI", "Scripts"],
    details: [
      "Flask REST API (localhost:5001) — endpoint /api/media /api/photos /api/pdfs",
      "CLI tools: pdf_to_memory.py, generate_restart_prompt.py, generate_functions_list.py",
      "Pipeline dati: estrazione testo, chunking, embedding, upsert ChromaDB",
      "Automazioni: MENTE_WATCHER, MENTE_SCANNER (818+ estrazioni), deep_freeze.py",
      "Stile: Path-based (no hardcoded), header obbligatorio, env vars da .env",
    ],
  },
  {
    label: "RAG + ChromaDB",
    note: "Hybrid v4.0 · BM25 + semantico + CrossEncoder",
    company: "TITANIUM_OS / GENESIS",
    tags: ["RAG", "ChromaDB", "BM25", "SentenceTransformer"],
    details: [
      "RAG v4.0 hybrid: BM25 TF-IDF (sklearn) + semantico cosine (ChromaDB)",
      "Merge Reciprocal Rank Fusion (RRF k=60) — top-15 → reranker → top-5",
      "Reranker: cross-encoder/ms-marco-MiniLM-L-6-v2 (preciso su Q&A tecnico)",
      "Embedding: paraphrase-multilingual-MiniLM-L12-v2 — 384-dim, IT/EN/DE/FR offline",
      "Chunk: 512 chars / stride 200 — incrementale via manifest JSON (no rebuild)",
    ],
  },
  {
    label: "React + Vite + Tailwind",
    note: "Dashboard TITANIUM_OS · Tela v5.0",
    company: "TITANIUM_OS",
    tags: ["React", "Vite", "Tailwind", "Zustand", "TanStack"],
    details: [
      "Dashboard TITANIUM_OS: CanvasLayout MacroCards, EcosystemView, StorieView, NeuroMapView",
      "State management: Zustand + TanStack Query — polling API ogni 30s",
      "Command Bar Ctrl+K — navigazione rapida, ricerca sezioni, azioni",
      "Dark UI: Tailwind slate palette + responsive grid, componenti componibili",
      "WebSocket-ready: struttura predisposta per live-update da API server",
    ],
  },
  {
    label: "MCP Server custom",
    note: "Integrazione AI <-> filesystem / STATE.json",
    company: "TITANIUM_OS",
    tags: ["MCP", "Claude Code", "Tools", "Python"],
    details: [
      "5 tool MCP: get_state · update_milestone · search_mente · get_daily_brief · list_content_ready",
      "Auto-load in Claude Code via .claude/settings.json — zero setup per sessione",
      "search_mente: query RAG v4.0 da Claude senza aprire terminale",
      "update_milestone: scrive su STATE.json + incrementa session_count + commit opzionale",
      "Architettura: stdio transport, Python asyncio, type-safe tool definitions",
    ],
  },
  {
    label: "Git / GitHub",
    note: "Version control · repo pubblici · workflow",
    company: "GitHub / TITANIUM_OS",
    tags: ["Git", "GitHub", "CI", "Workflow"],
    details: [
      "Repo TITANIUM_OS su GitHub (Microindustry/TITANIUM_OS) — commit per sessione",
      "Hooks Stop: auto-commit STATE.json + push dopo ogni sessione significativa",
      "Branch strategy: main sempre deployable — feature branch per refactor grandi",
      "GitHub CLI (gh 2.92): PR, status, release da terminale",
      "Prossimo: GitHub Actions per CI + GitHub profile pubblico IDENTITY",
    ],
  },
  {
    label: "n8n + PowerShell",
    note: "Automazioni workflow · Task Scheduler · profile avanzato",
    company: "TITANIUM_OS",
    tags: ["n8n", "PowerShell", "Automazione", "Windows"],
    details: [
      "n8n localhost:5678 (SQLite): workflow trigger HTTP, webhook, cron — base EVA",
      "PowerShell profile: aliases (claude-ti, brief, rag, ask, research, ti-status...)",
      "UTF-8 BOM su profilo PS — fix encoding emoji per PS 5.1 su Windows 10",
      "Task Scheduler: START_LOGIN.bat v1.1 — auto-avvio ecosistema al login Windows",
      "Profilo PS: funzioni per agenti, research, rag, git shortcuts, PATH management",
    ],
  },
];

export const INTERESSI: Interesse[] = [
  {
    icon: "🐠",
    label: "Acquario / Acquaponica",
    note: "Sistemi chiusi, biofiltri, ciclo azoto",
    details: [
      "Sistemi acquaponici: integrazione pesce + piante in ciclo chiuso",
      "Biofiltrazione: ciclo azoto (NH3 → NO2 → NO3), parametri acqua",
      "Automazione: sensori pH/TDS/temperatura → controllo pompe via Arduino/ESP32",
      "Studio: dimensionamento serbatoi, densità ittica, grow bed ratio",
    ],
  },
  {
    icon: "🧫",
    label: "Bioreattori",
    note: "Fermentazione, mycologia, microalghe",
    details: [
      "Fermentazione: SCOBY, kefir, kimchi — controllo temperatura e pH",
      "Mycologia: coltivazione funghi su substrati lignocellulosici, sterilizzazione",
      "Microalghe: Spirulina, Chlorella — potenziale integrazione acquaponica",
      "Bioreattore DIY: camera a pressione positiva, agitatore magnetico, UV sterilizzazione",
    ],
  },
  {
    icon: "🌱",
    label: "Serre e coltivazione",
    note: "Idroponica, indoor, automazione clima",
    details: [
      "Idroponica: NFT, DWC, ebb&flow — nutrienti, EC, pH target per coltura",
      "Automazione clima: controllo LED grow, ventilazione, umidità relativa",
      "Integrazione V32: componenti serra in alluminio lavorati a CNC",
      "Target: modulo autonomo 2m² per produzione erbe aromatiche Vita Natura",
    ],
  },
  {
    icon: "⚡",
    label: "Impianti elettrici",
    note: "Civile + industriale — CEI, linguaggio tecnico",
    details: [
      "Civile: lettura planimetrie, calcolo sezioni cavo, protezioni differenziali",
      "Industriale: quadri 400V, avviatori diretti/stella-triangolo, inverter",
      "Studio: CEI 64-8, EN 60204-1, norma ATEX base",
      "Pratica: cablaggio quadro V32 CNC — 48V servo + 24V controllo + schermo",
    ],
  },
  {
    icon: "📚",
    label: "Research Agent",
    note: "Paper, tesi, libri tecnici → RAG automatico",
    details: [
      "11 sorgenti: arXiv, OpenAlex, Semantic Scholar, Baidu, CNKI, GitHub, tesi EU",
      "Query CLI: research -Query \"epoxy granite CNC\" -Domain V32 -Rag",
      "Output strutturato: titolo, abstract, anno, DOI, link — JSON + auto-RAG",
      "Filtri: -Domain V32|CNC|acquaponica|bioreattori — rilevanza contestuale",
      "Prossimo: UI panel in Dashboard per triggere ricerche da Tela",
    ],
  },
  {
    icon: "🎙️",
    label: "Content Engine",
    note: "YouTube + LinkedIn + podcast — 1 build → N output",
    details: [
      "22 episodi generati: dual-pass haiku (bozza) + sonnet (narrativa finale)",
      "Pipeline: milestone → script episodio → reel_hook → LinkedIn post → dataset",
      "Formato: storia tecnica + dato misurabile + open loop emotivo",
      "Dataset JSONL: fine-tuning futuro LLM personale su stile narrativo TITANIUM_OS",
      "Avatar AVA (pianificato): YouTube shorts, voce sintetica, taglio industriale",
    ],
  },
];

export const PRINCIPI: string[] = [
  "Costruisci cio che usi — il primo cliente sei tu.",
  "Se funziona in taverna, funziona ovunque.",
  "Non costruiamo prodotti. Costruiamo liberta.",
  "1 input → N output. Ogni azione produce piu artefatti.",
  "Identifica → Automatizza → Scala.",
  "Un sistema che gira da solo vale piu di 10 abitudini.",
];

// ── PROFILO UNITO: competenze professionali + personali in un solo albero ──
// L'idea del CV-che-si-genera (principio 9 di Nina): NON due liste separate, ma la
// STESSA persona per DOMINIO — la mano che salda il titanio e tocca l'acquaponica,
// la mente che costruisce il RAG e gli agenti. Il marcatore "personale" è dove la
// passione privata incontra il mestiere. Dati ri-clusterizzati da SKILLS_*/INTERESSI.
export type Livello = "maestria" | "operativo" | "esplorazione" | "in-apprendimento";
export type Natura = "mano" | "mente" | "bio" | "voce";
export type CompUnita = { label: string; livello: Livello; fonte: string; personale?: boolean };
export type DominioCompetenza = { icon: string; nome: string; natura: Natura; claim: string; skills: CompUnita[] };

export const COMPETENZE_UNITE: DominioCompetenza[] = [
  {
    icon: "🔧", nome: "Materia & Mano", natura: "mano",
    claim: "Il fare fisico — dall'officina ai vertici della manifattura, fino al garage di casa.",
    skills: [
      { label: "TIG titanio gr.1/2", livello: "maestria", fonte: "SCProject · MotoGP" },
      { label: "Robotica & cobot", livello: "maestria", fonte: "ESSEGI" },
      { label: "Presse · oleodinamica · PLC", livello: "maestria", fonte: "DATWLER" },
      { label: "QC · NDT · collaudi", livello: "maestria", fonte: "LU.VE" },
      { label: "Progettazione CNC (V32)", livello: "operativo", fonte: "TITANIUM_OS" },
      { label: "Impianti elettrici", livello: "in-apprendimento", fonte: "personale + V32", personale: true },
    ],
  },
  {
    icon: "🧠", nome: "Sistemi & Mente", natura: "mente",
    claim: "Il digitale — costruire macchine che pensano, ricordano e si migliorano.",
    skills: [
      { label: "LLM & Prompt Engineering", livello: "operativo", fonte: "TITANIUM_OS" },
      { label: "Python · Flask · CLI", livello: "operativo", fonte: "TITANIUM_OS" },
      { label: "RAG · ChromaDB", livello: "operativo", fonte: "GENESIS" },
      { label: "MCP · agenti", livello: "operativo", fonte: "TITANIUM_OS" },
      { label: "React · dashboard", livello: "operativo", fonte: "TITANIUM_OS" },
      { label: "n8n · automazioni", livello: "operativo", fonte: "TITANIUM_OS" },
      { label: "Research Agent", livello: "esplorazione", fonte: "personale", personale: true },
    ],
  },
  {
    icon: "🌱", nome: "Vita & Natura", natura: "bio",
    claim: "Il bio — la passione personale che diventa business (Vita Natura).",
    skills: [
      { label: "Acquaponica · ciclo azoto", livello: "esplorazione", fonte: "personale", personale: true },
      { label: "Bioreattori · fermentazione", livello: "esplorazione", fonte: "personale", personale: true },
      { label: "Serre · idroponica · clima", livello: "esplorazione", fonte: "personale", personale: true },
    ],
  },
  {
    icon: "🎙️", nome: "Voce & Racconto", natura: "voce",
    claim: "Il metodo che si documenta da sé — ogni passo diventa contenuto.",
    skills: [
      { label: "Content Engine (1 input→N output)", livello: "esplorazione", fonte: "IDENTITY" },
      { label: "Storytelling industriale", livello: "esplorazione", fonte: "IDENTITY" },
    ],
  },
];
