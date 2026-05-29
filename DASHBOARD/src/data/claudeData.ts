// claudeData.ts | TITANIUM_OS / DASHBOARD / data | v1.0 | 2026-05-29
// Albero capacità Claude — verificate nelle sessioni TITANIUM_OS

export type CNode = {
  id: string;
  label: string;
  note?: string;
  badge?: string;
  children?: CNode[];
};

export const DOMAIN_COLORS: Record<string, string> = {
  codice:     "#22d3ee",
  sistema:    "#34d399",
  analisi:    "#fbbf24",
  conoscenza: "#818cf8",
  content:    "#f472b6",
  agenti:     "#fb923c",
  limiti:     "#f87171",
};

export const CLAUDE_TREE: CNode[] = [
  {
    id: "codice", label: "CODICE", note: "Scrittura, debug, architettura — tutto verificato in sessione",
    children: [
      { id: "py", label: "Python 3.11", note: "Flask · RAG · CLI · agents · automazioni", children: [
        { id: "flask",     label: "Flask REST API",         note: "localhost:5001 — /api/state /api/rag /api/media /api/photos /api/pdfs", badge: "ATTIVO" },
        { id: "rag-py",    label: "RAG Pipeline v4.0",      note: "ChromaDB + BM25 + CrossEncoder — 2376+ chunk indicizzati",             badge: "ATTIVO" },
        { id: "cli",       label: "CLI Tools",              note: "pdf_to_memory.py · generate_restart_prompt.py · generate_functions_list.py" },
        { id: "agents-fw", label: "Agent framework",        note: "validator_agent.py · research_agent.py · 8 agenti in agents_db.json" },
        { id: "auto-fs",   label: "Automazioni filesystem", note: "MENTE_SCANNER 818+ estrazioni · MENTE_WATCHER · deep_freeze AES-256" },
      ]},
      { id: "ts", label: "TypeScript / React", note: "Dashboard TITANIUM_OS — Tela v5.0", children: [
        { id: "canvas-c", label: "CanvasLayout v5.0",    note: "Home MacroCards + touch fix + file splitting + ClaudeSection", badge: "v5.0" },
        { id: "state-m",  label: "State management",     note: "Zustand + TanStack Query — polling API ogni 30s" },
        { id: "cmdbar-c", label: "Command Bar Ctrl+K",   note: "Navigazione rapida + ricerca sezioni + azioni sistema" },
        { id: "views-c",  label: "Multi-view (6)",       note: "EcosystemView · StorieView · NeuroMapView · LayersView · FileBrowser · WarehouseView" },
      ]},
      { id: "ps", label: "PowerShell 5.1", note: "Profile avanzato — Windows 10 Getac", children: [
        { id: "ps-prof", label: "Profile completo",  note: "Alias: claude-ti · brief · rag · ask · research · ti-status · agents" },
        { id: "ps-utf8", label: "UTF-8 BOM fix",     note: "Emoji 0x94 crash CP1252 su PS 5.1 — risolto con BOM header" },
        { id: "task-s",  label: "Task Scheduler",    note: "START_LOGIN.bat v1.1 — 4 processi /B + Windows Terminal claude-ti al login" },
      ]},
      { id: "json-c", label: "JSON / Config", note: "STATE.json · agents_db · settings", children: [
        { id: "state-j",  label: "STATE.json",             note: "Fonte unica di verita — milestone · pillars · nodes · blockers · rag_config" },
        { id: "agents-j", label: "agents_db.json",         note: "8 agenti estensibili senza codice — system_prompt + rag_filter + tools" },
        { id: "claude-s", label: ".claude/settings.json",  note: "MCP auto-load · hooks Stop · permissions allow-all" },
      ]},
    ],
  },
  {
    id: "sistema", label: "SISTEMA", note: "Setup, deploy, infrastruttura locale",
    children: [
      { id: "win10", label: "Windows 10 Pro", note: "Setup completo offline — nessuna dipendenza cloud", children: [
        { id: "winget-i",  label: "winget installs", note: "ffmpeg 8.1.1 · SumatraPDF · gh 2.92 — non-interattivo" },
        { id: "startup-b", label: "Auto-startup",    note: "START_LOGIN.bat — 4 processi non-bloccanti + Windows Terminal claude-ti" },
        { id: "env-v",     label: "ENV vars",        note: "PYTHONPATH · MENTE_DIR · ANTHROPIC_API_KEY da _VAULT/KEYS/titanium_os.env" },
      ]},
      { id: "mcp-s", label: "MCP Server — 5 tool", note: "stdio transport · auto-load · zero setup sessione", children: [
        { id: "gs", label: "get_state",          note: "STATE.json completo — chiamato ad ogni apertura sessione", badge: "ATTIVO" },
        { id: "sm", label: "search_mente",       note: "Query RAG v4.0 da Claude senza aprire terminale — top-5 chunk", badge: "ATTIVO" },
        { id: "um", label: "update_milestone",   note: "Scrive STATE.json + session_count++ + git commit opzionale", badge: "ATTIVO" },
        { id: "gb", label: "get_daily_brief",    note: "Brief da STATE.json — pillars + blockers + note mattutine", badge: "ATTIVO" },
        { id: "lc", label: "list_content_ready", note: "Episodi pronti per pubblicazione da CONTENT_ENGINE/", badge: "ATTIVO" },
      ]},
      { id: "git-s", label: "Git / GitHub", note: "Commit per sessione · repo pubblico", children: [
        { id: "hook-s", label: "Stop hook auto",              note: "Commit STATE.json + MENTE update + push + MENTE/SESSIONI/ auto-save" },
        { id: "gh-c",   label: "GitHub CLI gh 2.92",          note: "PR · status · release da terminale" },
        { id: "repo-s", label: "Microindustry/TITANIUM_OS",   note: "Repo pubblico — history dal 2026-03 · main sempre deployable", badge: "PUBLIC" },
      ]},
    ],
  },
  {
    id: "analisi", label: "ANALISI", note: "Tecnica, documenti, calcoli ingegneristici",
    children: [
      { id: "v32-a", label: "V32 CNC — analisi completa", note: "178 kg · ±0.019 mm RSS · Epoxy Granite · IT6-IT7", children: [
        { id: "pdf-a",   label: "Lettura PDF tecnici",     note: "Anche scansioni — pdfplumber + fallback immagine OCR" },
        { id: "delta-a", label: "Delta V7 vs foto reali",  note: "Documento vs stato fisico → 12 discrepanze → V8_DELTA.md" },
        { id: "calc-a",  label: "Calcoli ingegneristici",  note: "Vibrazioni EG · RSS ±0.019 mm · delta EG 0.03-0.06 · BEP 61h" },
        { id: "bom-a",   label: "BOM management",          note: "Molle · piastre XY · silent blocks v.A/v.B · mandrino ER20" },
      ]},
      { id: "docs-a", label: "Documenti strutturati", note: "ASSOLUTO V7-V8 · 10 ATTI · 891 righe", children: [
        { id: "ver-a",  label: "Versioning documenti", note: "V7 (108pp) → V7_X_v8.md (estrazione) → V8_DELTA.md (diff strutturale)" },
        { id: "ment-a", label: "Ingestione MENTE/",    note: "YAML frontmatter · naming convention · auto-RAG update incremental" },
      ]},
    ],
  },
  {
    id: "conoscenza", label: "CONOSCENZA", note: "RAG · ricerca accademica · pipeline",
    children: [
      { id: "rag-k", label: "RAG v4.0 hybrid", note: "BM25 + semantico + CrossEncoder · 2376+ chunk · incrementale", children: [
        { id: "bm25-k", label: "BM25 TF-IDF",          note: "sklearn ngram 1-2 — preciso su termini tecnici esatti ('ER20', 'M10')" },
        { id: "sem-k",  label: "Semantico ChromaDB",    note: "MiniLM-L12 384-dim · IT/EN/DE/FR · completamente offline" },
        { id: "rer-k",  label: "CrossEncoder reranker", note: "ms-marco-MiniLM-L-6 — top-15 → riordina → top-5 risultati" },
        { id: "rrf-k",  label: "RRF k=60",              note: "Reciprocal Rank Fusion — merge ottimale BM25 + semantico" },
        { id: "inc-k",  label: "Incrementale",          note: "Manifest JSON — solo chunk nuovi, < 20s (no rebuild da 2376+ chunk)" },
      ]},
      { id: "res-k", label: "Research Agent — 11 sorgenti", note: "Paper, tesi, libri → RAG automatico", children: [
        { id: "oa-k",  label: "OpenAlex",              note: "250M paper cross-domain — API REST, nessuna chiave" },
        { id: "ss-k",  label: "Semantic Scholar",      note: "Abstract + citazioni strutturate + paper correlati" },
        { id: "ax-k",  label: "arXiv + CORE.ac.uk",   note: "Preprint + 200M articoli full-text open access" },
        { id: "eu-k",  label: "Tesi EU (2 sorgenti)", note: "DART-Europe 1.3M + theses.fr — acquaponica, CNC, bioreattori" },
        { id: "ol-k",  label: "Open Library + DOAJ",  note: "Internet Archive libri tecnici + peer-reviewed open access" },
      ]},
    ],
  },
  {
    id: "content", label: "CONTENT", note: "Episodi · storytelling · dataset LLM",
    children: [
      { id: "ep-c",   label: "22 episodi generati", note: "Dual-pass haiku (bozza) + sonnet (finale) — FILONE_UNICO S0+S1 completa", badge: "22 ep" },
      { id: "narr-c", label: "Narrativa tecnica",   note: "Stile Simone Rizzo — dato misurabile + problema + azione + open loop emotivo" },
      { id: "data-c", label: "Dataset JSONL LLM",   note: "Fine-tuning futuro LLM personale su stile narrativo TITANIUM_OS" },
      { id: "reel-c", label: "Reel hook — /reel",   note: "Instagram/YouTube Shorts — testo pronto da girare in camera" },
    ],
  },
  {
    id: "agenti", label: "AGENTI", note: "8 specializzati · RAG locale + Claude API",
    children: [
      { id: "tesla-a",   label: "TESLA",   note: "Elettrica civile/industriale · CEI 64-8 · VFD · quadri · strumentazione", badge: "ATTIVO" },
      { id: "forge-a",   label: "FORGE",   note: "Meccanica · officina · saldatura TIG/MIG · CNC V32 · tolleranze",         badge: "ATTIVO" },
      { id: "aqua-a",    label: "AQUA",    note: "Acquaponica · bioreattori · serre · ciclo azoto · parametri acqua",        badge: "ATTIVO" },
      { id: "lex-a",     label: "LEX",     note: "Normativa CE · sicurezza macchine · brevetti · ATEX base",                 badge: "ATTIVO" },
      { id: "siemens-a", label: "SIEMENS", note: "PLC S7 · TIA Portal · motion control · ladder · diagnosi I/O",            badge: "ATTIVO" },
      { id: "themis-a",  label: "THEMIS",  note: "Analisi V32/GENESIS completa — agente principale sessioni TITANIUM_OS",    badge: "ATTIVO" },
      { id: "aria-a",    label: "ARIA",    note: "Life OS · ADHD scaffolding · scheduling adattivo — in sviluppo",           badge: "DEV" },
      { id: "eva-a",     label: "EVA",     note: "WhatsApp automation · prenotazioni Vita Natura · n8n — in sviluppo",       badge: "DEV" },
    ],
  },
  {
    id: "limiti", label: "LIMITI NOTI", note: "Onesta tecnica — cosa NON so fare",
    children: [
      { id: "screen-l",  label: "No screen real-time",       note: "Non vedo la dashboard live — solo screenshot se forniti manualmente" },
      { id: "chat-l",    label: "No memoria cross-sessione", note: "Uso STATE.json + RAG come sostituto — non chat history nativa" },
      { id: "pdf-l",     label: "No editing PDF binario",    note: "Serve .docx sorgente — non posso modificare file PDF direttamente" },
      { id: "timeout-l", label: "Timeout script > 2 min",   note: "RAG rebuild su 2376+ chunk superava limite — risolto con --incremental" },
      { id: "voice-l",   label: "No input vocale diretto",   note: "Microfono tastiera Getac = limite hardware, non software mio" },
    ],
  },
];
