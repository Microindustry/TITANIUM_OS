// genesisData.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Albero N-livelli GENESIS — OS digitale: infrastruttura, intelligenza, automazioni

import { type SkillNode, type SkillStatus } from "./skillTreeData";

const cyan    = { color: "text-cyan-400",    border: "border-cyan-500/40",    bg: "bg-cyan-950/20",    dot: "bg-cyan-400"    };
const emerald = { color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-950/20", dot: "bg-emerald-400" };
const amber   = { color: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-950/20",   dot: "bg-amber-400"   };
const violet  = { color: "text-violet-400",  border: "border-violet-500/40",  bg: "bg-violet-950/20",  dot: "bg-violet-400"  };
const indigo  = { color: "text-indigo-400",  border: "border-indigo-500/40",  bg: "bg-indigo-950/20",  dot: "bg-indigo-400"  };
const teal    = { color: "text-teal-400",    border: "border-teal-500/40",    bg: "bg-teal-950/20",    dot: "bg-teal-400"    };
const slate   = { color: "text-slate-400",   border: "border-slate-600/30",   bg: "bg-slate-800/20",   dot: "bg-slate-500"   };

function leaf(id: string, label: string, status: SkillStatus, note?: string): SkillNode {
  const c = status === "done"    ? emerald
          : status === "active"  ? amber
          : status === "blocked" ? { color:"text-slate-500", border:"border-slate-700/30", bg:"bg-slate-900/40", dot:"bg-slate-600" }
          :                        { color:"text-slate-700", border:"border-slate-800/20", bg:"bg-slate-900/20", dot:"bg-slate-800" };
  return {
    id, label,
    icon: status === "done" ? "✓" : status === "active" ? "⚡" : status === "blocked" ? "○" : "◌",
    status, note, isLeaf: true, ...c,
  };
}

export const GENESIS_ROOT: SkillNode = {
  id: "genesis_root",
  label: "GENESIS",
  icon: "⬡",
  status: "active",
  note: "OS digitale di TITANIUM_OS — il sistema che gestisce se stesso",
  ...cyan,
  children: [

    // ── INFRASTRUTTURA ────────────────────────────────────────────────────────
    {
      id: "infra", label: "Infrastruttura", icon: "🖥", status: "active", ...cyan,
      note: "Layer fisico — tutto gira su Getac, Windows 10 Pro",
      children: [

        {
          id: "api", label: "API Server", icon: "🔌", status: "active", ...cyan,
          note: "Flask · porta 5001 · endpoints sistema",
          children: [
            leaf("api01", "Flask server — /api/state, /api/rag/*, /api/brief", "active"),
            leaf("api02", "Endpoint /api/state → STATE.json live", "active"),
            leaf("api03", "Endpoint /api/rag/search + /api/rag/rebuild", "active"),
            leaf("api04", "Endpoint /api/brief → daily_brief_last.md", "active"),
            leaf("api05", "Endpoint /api/scan → MENTE Scanner trigger", "active"),
          ],
        },

        {
          id: "dashboard", label: "Dashboard", icon: "📊", status: "active", ...cyan,
          note: "React + Vite · porta 5173 · questa UI",
          children: [
            leaf("db01", "React 18 + Vite + TypeScript + Tailwind", "active"),
            leaf("db02", "TanStack Query — stato condiviso, zero fetch duplicati", "active"),
            leaf("db03", "Zustand — UI store (view, sidebar, scroll)", "active"),
            leaf("db04", "NavStack N-livelli — pattern universale dashboard", "active", "Usato da: MatteoSection, MimsSection, GenesisSection"),
            leaf("db05", "Lazy loading view + ErrorBoundary globale", "active"),
          ],
        },

        {
          id: "mcp", label: "MCP Server", icon: "🤖", status: "active", ...cyan,
          note: "5 tool nativi — Claude abita nell'ecosistema",
          children: [
            leaf("mcp01", "get_state — legge STATE.json live", "active"),
            leaf("mcp02", "update_milestone — aggiorna milestone + commit", "active"),
            leaf("mcp03", "search_mente — RAG query da Claude", "active"),
            leaf("mcp04", "update_session_context — aggiorna RIAVVIO_SESSIONE.txt", "active"),
            leaf("mcp05", "run_script — esegue script Python del sistema", "active"),
          ],
        },

        {
          id: "n8n_infra", label: "n8n", icon: "🔗", status: "active", ...cyan,
          note: "porta 5678 · orchestratore workflow locali",
          children: [
            leaf("n8n01", "npx n8n — avvio locale, dati in ~/.n8n/", "active"),
            leaf("n8n02", "13 workflow attivi + 14 in pipeline", "active"),
            leaf("n8n03", "Webhook trigger → automazioni evento-driven", "active"),
          ],
        },

        {
          id: "git_infra", label: "Git / GitHub", icon: "📦", status: "done", ...emerald,
          note: "Microindustry org — versionamento + storia",
          children: [
            leaf("git01", "Repo TITANIUM_OS — main branch, push ogni sessione", "done"),
            leaf("git02", "GitHub CLI (gh.exe) — PR, issues, release da terminale", "done"),
            leaf("git03", "Commit semantico — sessione, feat, fix, chore", "done"),
            leaf("git04", "VERSIONS/changelog.md — aggiornato automaticamente", "done"),
          ],
        },

      ],
    },

    // ── INTELLIGENZA ──────────────────────────────────────────────────────────
    {
      id: "intel", label: "Intelligenza", icon: "🧠", status: "active", ...violet,
      note: "Layer cognitivo — RAG + agenti AI",
      children: [

        {
          id: "rag", label: "MENTE RAG v4.0", icon: "🔍", status: "active", ...violet,
          note: "Hybrid BM25+semantico+CrossEncoder — memoria esternalizzata",
          children: [
            leaf("rag01", "ChromaDB + paraphrase-multilingual-MiniLM-L12-v2 (384-dim)", "active", "IT/EN/DE/FR — chunk 512 char / stride 200"),
            leaf("rag02", "BM25 TF-IDF sklearn (ngram 1-2) — keyword tecnici esatti", "active"),
            leaf("rag03", "CrossEncoder ms-marco-MiniLM-L-6-v2 — reranker top-15→top-5", "active"),
            leaf("rag04", "Reciprocal Rank Fusion (k=60) — merge semantico+keyword", "active"),
            leaf("rag05", "rag-update incrementale (<20s) / rag-rebuild completo", "active"),
            leaf("rag06", "Sorgente: MENTE/ — ogni doc aggiunto è memoria permanente", "active"),
          ],
        },

        {
          id: "agenti", label: "Agenti AI", icon: "🤖", status: "active", ...violet,
          note: "THEMIS attivo, EVA in sviluppo, 5 pianificati",
          children: [
            leaf("ag01", "THEMIS — Claude Sonnet — codice, analisi, V32, GENESIS", "active"),
            leaf("ag02", "EVA — WhatsApp bot Maria — prenotazioni Vita Natura", "blocked", "WhatsApp pilot PENDING"),
            leaf("ag03", "AVA — YouTube avatar — script, reel, contenuti", "future"),
            leaf("ag04", "ARIA — Life OS, ADHD scaffolding, scheduling", "future"),
            leaf("ag05", "NEXUS — orchestratore multi-agente", "future"),
            leaf("ag06", "TESLA — hardware IoT, sensori, CNC monitoring", "future"),
            leaf("ag07", "FORGE — officina AI, saldatura, progettazione meccanica", "future"),
          ],
        },

        {
          id: "brief", label: "Daily Brief", icon: "📋", status: "active", ...violet,
          note: "Python → DATA/daily_brief_last.md ogni mattina",
          children: [
            leaf("br01", "Script: NODES/DAILY_BRIEF/brief.py — comando: brief", "active"),
            leaf("br02", "Output: DATA/daily_brief_last.md — digest giornaliero", "active"),
            leaf("br03", "Aggrega: STATE.json + RAG query + meteo + calendario", "active"),
          ],
        },

      ],
    },

    // ── AUTOMAZIONI ───────────────────────────────────────────────────────────
    {
      id: "automaz", label: "Automazioni", icon: "⚙", status: "active", ...amber,
      note: "Se lo fai 3× → script. Se lo fai ogni giorno → nodo.",
      children: [

        {
          id: "scanner", label: "MENTE Scanner", icon: "🔭", status: "active", ...amber,
          note: "Legge MENTE/ → estrae decisioni, spec, milestone",
          children: [
            leaf("sc01", "scanner.py — analisi semantica file MENTE/", "active"),
            leaf("sc02", "MENTE Watcher — fs events → /api/scan automatico", "active"),
            leaf("sc03", "Output: DATA/mente_digest.json", "active"),
          ],
        },

        {
          id: "hooks", label: "Stop Hooks", icon: "🪝", status: "active", ...amber,
          note: "Eseguiti automaticamente da Claude Code — pre/post tool",
          children: [
            leaf("hk01", "generate_functions_list.py → FUNZIONI_SISTEMA.txt", "active", "Aggiornato ad ogni modifica funzioni"),
            leaf("hk02", "generate_restart_prompt.py → RIAVVIO_SESSIONE.txt", "active", "Fine sessione → contesto per la prossima"),
            leaf("hk03", "rag-update → incrementale dopo scrittura in MENTE/", "active"),
            leaf("hk04", "STATE.json → commit automatico dopo update_milestone", "active"),
          ],
        },

        {
          id: "content_pipe", label: "Content Pipeline", icon: "🎙", status: "active", ...amber,
          note: "1 milestone → N artefatti (podcast, reel, dataset, RAG)",
          children: [
            leaf("cp01", "milestone_to_episode.py — dual-pass haiku+sonnet", "active"),
            leaf("cp02", "episodes_to_dataset.py — fine-tuning JSONL", "active"),
            leaf("cp03", "VERSIONS/changelog.md + diff_log.json — storia automatica", "active"),
            leaf("cp04", "Reel hook — testo pronto per Instagram/YT Shorts", "active"),
          ],
        },

      ],
    },

    // ── SICUREZZA ─────────────────────────────────────────────────────────────
    {
      id: "security", label: "Sicurezza", icon: "🔐", status: "done", ...indigo,
      note: "Vault + backup AES-256 + sanitizer git",
      children: [

        {
          id: "vault", label: "VAULT", icon: "🔒", status: "done", ...indigo,
          note: "_VAULT/ — mai git, mai hardcoded",
          children: [
            leaf("v01", "_VAULT/KEYS/titanium_os.env — tutte le API key", "done"),
            leaf("v02", "_VAULT/ACCOUNTS/ — credenziali", "done"),
            leaf("v03", "_VAULT/BACKUPS/ — AES-256 da deep_freeze.py", "done"),
            leaf("v04", "Path.home() + env var — mai path hardcoded nel codice", "done"),
          ],
        },

        {
          id: "git_sec", label: "Git Security", icon: "🛡", status: "done", ...indigo,
          children: [
            leaf("gs01", ".gitignore — _VAULT/, *.env, __pycache__, node_modules", "done"),
            leaf("gs02", "Sanitizer pre-commit — blocca secrets accidentali", "done"),
            leaf("gs03", "Commit signing — no secrets in history", "done"),
          ],
        },

      ],
    },

    // ── DATI ──────────────────────────────────────────────────────────────────
    {
      id: "data", label: "Dati", icon: "📂", status: "active", ...teal,
      note: "DATA/ — output persistente di tutti i nodi",
      children: [

        {
          id: "data_files", label: "File dati live", icon: "📄", status: "active", ...teal,
          children: [
            leaf("df01", "STATE.json — fonte unica verità, aggiornato ogni sessione", "active"),
            leaf("df02", "daily_brief_last.md — digest AI quotidiano", "active"),
            leaf("df03", "mente_digest.json — output scanner MENTE", "active"),
            leaf("df04", "view_index.json — indice view dashboard", "active"),
            leaf("df05", "rag_vectors_cache.json — cache vettori RAG", "active"),
            leaf("df06", "semantic_index.db — SQLite indice semantico", "active"),
          ],
        },

        {
          id: "knowledge", label: "MENTE Knowledge", icon: "🧬", status: "active", ...teal,
          note: "MICROINDUSTRY/MENTE/ — fonte RAG — mai perdere",
          children: [
            leaf("km01", "MENTE/V32/ — CNC: BOM, schemi, decisioni officina", "active"),
            leaf("km02", "MENTE/MIMS/ — design, protocollo fisico, ASSOLUTO_V7", "active"),
            leaf("km03", "MENTE/VITA_NATURA/ — sito, EVA, procedure estetiche", "active"),
            leaf("km04", "MENTE/SESSIONI/ — cattura decisioni dalle chat Claude", "active"),
            leaf("km05", "MENTE/KNOWLEDGE/ — libri, corsi, repo di riferimento", "active"),
          ],
        },

      ],
    },

    // ── ROADMAP ───────────────────────────────────────────────────────────────
    {
      id: "genesis_road", label: "Roadmap", icon: "🗺", status: "active", ...slate,
      children: [

        {
          id: "gr_now", label: "In corso", icon: "⚡", status: "active", ...amber,
          children: [
            leaf("gr01", "Dashboard v7 — N-livelli su tutte le view", "active"),
            leaf("gr02", "EVA WhatsApp pilot — prenotazioni Maria", "blocked"),
            leaf("gr03", "Computer Use node — desktop agent CDP", "active"),
            leaf("gr04", "RAG v4.0 hybrid — già live", "done"),
          ],
        },

        {
          id: "gr_next", label: "Prossimo", icon: "📈", status: "future", ...slate,
          children: [
            leaf("gr05", "NEXUS — orchestratore multi-agente", "future"),
            leaf("gr06", "TESLA — monitoring CNC IoT in tempo reale", "future"),
            leaf("gr07", "FORGE — AI officina: saldatura + progettazione", "future"),
            leaf("gr08", "LLM fine-tuned su episodi TITANIUM_OS", "future"),
            leaf("gr09", "API pubblica GENESIS — altri possono interrogare il sistema", "future"),
          ],
        },

      ],
    },

  ],
};
