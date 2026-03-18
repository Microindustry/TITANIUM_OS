// ecosystemTree.ts | TITANIUM_OS | v3.0 | 2026-03-18
// Struttura albero completo ecosistema — TITANIUM_OS + SINAPSI + CONTENT_ENGINE + tutti i progetti

export interface EcoNode {
  id: string;
  name: string;
  type: "folder" | "file" | "node" | "automation" | "data" | "dashboard" | "project" | "external";
  status: "active" | "pending" | "archived" | "future";
  comment: string;
  path?: string;
  children?: EcoNode[];
}

const R  = "C:/Users/Matteo/Desktop/TITANIUM_OS";
const M  = "C:/Users/Matteo/Desktop/LA MIA MENTE";
const S  = "C:/Users/Matteo/Desktop/SINAPSI";
const CE = "C:/Users/Matteo/Desktop/CONTENT_ENGINE";

export const ECOSYSTEM_TREE: EcoNode = {
  id: "root",
  name: "TITANIUM_OS",
  type: "folder",
  status: "active",
  path: R,
  comment: "Root sistema ricorsivo v7 — ogni nodo nutre gli altri. ASSOLUTO V7 riscritta.",
  children: [

    // ── BRAIN ─────────────────────────────────────────────────────────────
    {
      id: "brain",
      name: "BRAIN",
      type: "folder",
      status: "active",
      path: `${R}/BRAIN`,
      comment: "State machine + memoria AI + KNOWLEDGE base. Il cuore del sistema.",
      children: [
        {
          id: "state",
          name: "STATE.json",
          type: "data",
          status: "active",
          path: `${R}/BRAIN/STATE.json`,
          comment: "Stato live: milestone, step, blockers, pillars, nodi attivi. Fonte primaria di orientamento.",
        },
        {
          id: "knowledge",
          name: "KNOWLEDGE",
          type: "folder",
          status: "active",
          path: `${R}/BRAIN/KNOWLEDGE`,
          comment: "21 file .md per dominio. Fonte: ASSOLUTO V6 + V7 in arrivo.",
          children: [
            { id: "k-economics", name: "economics/ (5 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/economics`, comment: "roi-analysis · pricing-strategy · revenue-model · risk-analysis · revenue-target-y1" },
            { id: "k-technical", name: "technical/ (3 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/technical`, comment: "iot-automation · genesis-architecture · tech-stack-unified" },
            { id: "k-mims", name: "mims/ (5 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/mims`, comment: "protocol · configurations · applications · market-analysis · fit-park-specs" },
            { id: "k-system", name: "system/ (8 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/system`, comment: "rules/ (ai-behavior, lex-digitalis, neuro-sincrono) + personas/ (eva, themis, ava, the-board)" },
          ],
        },
        {
          id: "assoluto",
          name: "ASSOLUTO",
          type: "folder",
          status: "active",
          path: `${R}/BRAIN/ASSOLUTO`,
          comment: "Atti ufficiali V6 (10 ATTI) + V7 riscritta da Claude. V7 = fonte più aggiornata.",
          children: [
            { id: "assoluto-v6", name: "V6/ (10 ATTI)", type: "folder", status: "active", path: `${R}/BRAIN/ASSOLUTO/V6`, comment: "ATTO I→X: manifesto, CV, MIMS, V32, VULCAN, EVA, Content, Economics, Automations, Identity." },
            { id: "assoluto-v7", name: "V7/ (in review)", type: "folder", status: "pending", path: `${R}/BRAIN/ASSOLUTO/V7`, comment: "V7 riscritta da Claude — meno tabelle, più narrativa. Da validare con Matteo." },
          ],
        },
      ],
    },

    // ── AUTOMATIONS ───────────────────────────────────────────────────────
    {
      id: "automations",
      name: "AUTOMATIONS",
      type: "folder",
      status: "active",
      path: `${R}/AUTOMATIONS`,
      comment: "34 automazioni totali: 13 attive + 14 da fare + 7 Content Engine. Master: AUTOMATIONS_MASTER.md.",
      children: [
        {
          id: "auto-core",
          name: "core/ (10 moduli)",
          type: "folder",
          status: "active",
          path: `${R}/AUTOMATIONS/core`,
          comment: "watcher · backup · changelog_writer · state_updater · scanner · pdf_to_memory · cross_ref_engine · session_orienter · milestone_tracker · assoluto_splitter",
        },
        {
          id: "auto-deploy",
          name: "deploy/n8n/",
          type: "folder",
          status: "active",
          path: `${R}/AUTOMATIONS/deploy/n8n`,
          comment: "docker-compose.yml + .env.example + DEPLOY.md — Oracle Cloud Free Tier (EUR 0/mese).",
        },
        {
          id: "auto-master",
          name: "AUTOMATIONS_MASTER.md",
          type: "file",
          status: "active",
          path: `${R}/AUTOMATIONS/AUTOMATIONS_MASTER.md`,
          comment: "Fonte primaria: lista completa 34 automazioni con status. Aggiornare sempre qui.",
        },
      ],
    },

    // ── NODES ─────────────────────────────────────────────────────────────
    {
      id: "nodes",
      name: "NODES",
      type: "folder",
      status: "active",
      path: `${R}/NODES`,
      comment: "Processi autonomi live. Ogni nodo = agente specializzato.",
      children: [
        { id: "mente", name: "MENTE_SCANNER", type: "automation", status: "active", path: `${R}/NODES/MENTE_SCANNER`, comment: "ATTIVO — 818 estrazioni da 46 file (354 dec, 329 spec, 135 milestone). Scan giornaliero n8n." },
        { id: "eva-node", name: "EVA", type: "automation", status: "pending", path: `${R}/NODES/EVA`, comment: "WhatsApp bot Vita Natura (Maria). Attende API setup WhatsApp Business." },
        { id: "v32watcher", name: "V32_WATCHER", type: "automation", status: "future", path: `${R}/NODES/V32_WATCHER`, comment: "Telemetria CNC via IFM + OPC-UA. Attiva post assemblaggio V32." },
        { id: "layers-node", name: "LAYERS_VIEW", type: "automation", status: "active", path: `${R}/DASHBOARD/src/components/LayersView.tsx`, comment: "Vista drill-down immersiva ecosistema. Tree navigabile a layer con +." },
      ],
    },

    // ── DATA ──────────────────────────────────────────────────────────────
    {
      id: "data",
      name: "DATA",
      type: "folder",
      status: "active",
      path: `${R}/DATA`,
      comment: "Output processato. Fonte per dashboard e AI context.",
      children: [
        { id: "mente_digest", name: "mente_digest.json", type: "data", status: "active", path: `${R}/DATA/mente_digest.json`, comment: "Output MENTE_SCANNER — 818 estrazioni totali." },
        { id: "costs", name: "costs.json", type: "data", status: "active", path: `${R}/DATA/costs.json`, comment: "Registro costi infrastruttura. Totale attivo: EUR 0/mese." },
        { id: "projects", name: "projects.json", type: "data", status: "active", path: `${R}/DATA/projects.json`, comment: "Registro progetti: V32, MIMS, GENESIS, VITA_NATURA, VULCAN, CV." },
        { id: "milestones", name: "milestones.json", type: "data", status: "active", path: `${R}/DATA/milestones.json`, comment: "Lista milestone con tracking status." },
        { id: "contacts", name: "contacts.json", type: "data", status: "active", path: `${R}/DATA/contacts.json`, comment: "Rubrica contatti professionali." },
      ],
    },

    // ── PDF_DROP ──────────────────────────────────────────────────────────
    {
      id: "pdf_drop",
      name: "PDF_DROP",
      type: "folder",
      status: "active",
      path: `${R}/PDF_DROP`,
      comment: "Drop zone PDF. Auto-processati → KNOWLEDGE/ o ASSOLUTO/ via pdf_to_memory.py.",
    },

    // ── DASHBOARD ─────────────────────────────────────────────────────────
    {
      id: "dashboard",
      name: "DASHBOARD",
      type: "dashboard",
      status: "active",
      path: `${R}/DASHBOARD`,
      comment: "React 19 + Vite + Tailwind v4. LayersView v2.0, EcoTree, 10+ pannelli. Porta 5173.",
    },

    // ── VERSIONS ──────────────────────────────────────────────────────────
    {
      id: "versions",
      name: "VERSIONS",
      type: "folder",
      status: "active",
      path: `${R}/VERSIONS`,
      comment: "changelog.md + watcher.log + diff_log.json + snapshot archives.",
    },

    // ── FILE RADICE ───────────────────────────────────────────────────────
    { id: "api_server", name: "api_server.py", type: "file", status: "active", path: `${R}/api_server.py`, comment: "Flask API :5001 — /api/state /api/digest /api/scan /api/health." },
    { id: "claude_md", name: "CLAUDE.md", type: "file", status: "active", path: `${R}/CLAUDE.md`, comment: "Istruzioni Claude Code. Protocollo Neuro-Sincrono attivo." },

    // ── LA MIA MENTE (esterno) ────────────────────────────────────────────
    {
      id: "la_mia_mente",
      name: "LA MIA MENTE",
      type: "external",
      status: "active",
      path: M,
      comment: "61 file sorgente. ASSOLUTO V6 + V32 + MIMS + manifesti. Scansionati da MENTE_SCANNER.",
      children: [
        { id: "v6_folder", name: "v6/ (15 file)", type: "folder", status: "active", path: `${M}/v6`, comment: "ASSOLUTO V6 completo: 10 ATTI + LEX DIGITALIS + istruzioni." },
        { id: "taitan_folder", name: "TAITAN/ (14 file)", type: "folder", status: "active", path: `${M}/TAITAN`, comment: "Manifesti ecosistema: Master Plan, Codex Prodotto, figure professionali." },
        { id: "mims_folder", name: "MIMS/ (10 file)", type: "folder", status: "active", path: `${M}/MIMS`, comment: "CAD 3D: STL + Shapr3D. Piastra A5, corpo connettore, assiemi." },
      ],
    },

    // ── SINAPSI (esterno) ─────────────────────────────────────────────────
    {
      id: "sinapsi",
      name: "SINAPSI",
      type: "external",
      status: "active",
      path: S,
      comment: "Memoria dell'ecosistema. 40+ file storici. Porta di accesso ai progetti personali navigabili.",
      children: [
        {
          id: "sinapsi-archivio",
          name: "ARCHIVIO/ (40+ file)",
          type: "folder",
          status: "active",
          path: `${S}/ARCHIVIO`,
          comment: "Flussi storici, idee, PDF sorgente, versioni V1→V6. Memoria lunga del sistema.",
        },
        {
          id: "sinapsi-progetti",
          name: "PROGETTI",
          type: "folder",
          status: "active",
          path: `${S}/PROGETTI`,
          comment: "Progetti personali navigabili a layer. Ogni progetto = proof-of-work reale.",
          children: [
            {
              id: "cv",
              name: "CV",
              type: "project",
              status: "active",
              path: `${S}/PROGETTI/CV`,
              comment: "Curriculum navigabile a layer. SCProject > ESSEGI > DATWLER > LU.VE + skill tree espandibile. HR-ready.",
              children: [
                { id: "cv-scproject", name: "SCProject", type: "folder", status: "active", path: `${S}/PROGETTI/CV/SCProject`, comment: "TIG/MIG titanio — saldatura componenti scarico MotoGP. Skill: metallurgia Ti, saldatura orbitale, QC visivo." },
                { id: "cv-essegi", name: "ESSEGI", type: "folder", status: "active", path: `${S}/PROGETTI/CV/ESSEGI`, comment: "Programmazione + operatività robot industriali. Skill: KUKA, PLC, integrazione celle automatizzate." },
                { id: "cv-datwler", name: "DATWLER", type: "folder", status: "active", path: `${S}/PROGETTI/CV/DATWLER`, comment: "Setup e conduzione presse industriali. Skill: setup stampi, parametri processo, manutenzione." },
                { id: "cv-luve", name: "LU.VE", type: "folder", status: "active", path: `${S}/PROGETTI/CV/LU.VE`, comment: "Quality Control produzione. Skill: metrologia, CMM, report non conformità, sistemi ISO." },
              ],
            },
            {
              id: "vulcan",
              name: "VULCAN",
              type: "project",
              status: "building",
              path: `${S}/PROGETTI/VULCAN`,
              comment: "Pressa artigianale 20t. Martinetto Vevor 3 stati + colonne guida DATWLER. Brevetterà formulazione polimerica MIMS.",
              children: [
                { id: "vulcan-hw", name: "HARDWARE", type: "folder", status: "building", path: `${S}/PROGETTI/VULCAN/HARDWARE`, comment: "Martinetto Vevor 20t (3 stati: idle/semi/full). Struttura: 4 colonne guida DATWLER. Telaio Alu 7075." },
                { id: "vulcan-ricette", name: "RICETTE", type: "folder", status: "pending", path: `${S}/PROGETTI/VULCAN/RICETTE`, comment: "Formulazioni polimeriche testate. Target: matrice per tile MIMS. Dati: temp/pressione/tempo/durezza." },
                { id: "vulcan-brevetto", name: "BREVETTO", type: "folder", status: "future", path: `${S}/PROGETTI/VULCAN/BREVETTO`, comment: "Documentazione per brevetto materiale. Formula proprietaria = moat competitivo MIMS." },
                { id: "vulcan-manifesto", name: "VULCAN_MANIFESTO.md", type: "file", status: "building", path: `${S}/PROGETTI/VULCAN/VULCAN_MANIFESTO.md`, comment: "Visione strategica: perché VULCAN esiste → MIMS → brevetto → scalabilità." },
              ],
            },
            {
              id: "mims-proj",
              name: "MIMS",
              type: "project",
              status: "building",
              path: `${S}/PROGETTI/MIMS`,
              comment: "Sistema connettori modulari fisici. Tile polimeriche + ecosistema digitale. Fit Park 4.0 = primo caso d'uso.",
              children: [
                { id: "mims-prodotto", name: "PRODOTTO", type: "folder", status: "building", path: `${S}/PROGETTI/MIMS/PRODOTTO`, comment: "Tile modulari (piastra A5, corpo connettore). CAD Shapr3D. Materiale: polimero VULCAN." },
                { id: "mims-fitpark", name: "FIT_PARK_4.0", type: "folder", status: "pending", path: `${S}/PROGETTI/MIMS/FIT_PARK_4.0`, comment: "Area fitness con tornello MIMS proprietario. Primo deployment B2C del sistema." },
                { id: "mims-kit", name: "MIMS_KIT", type: "folder", status: "future", path: `${S}/PROGETTI/MIMS/MIMS_KIT`, comment: "Kit auto-generazione per clienti. Include CV-layer di chi costruisce il proprio ecosistema MIMS." },
              ],
            },
            {
              id: "eva-proj",
              name: "EVA",
              type: "project",
              status: "pending",
              path: `${S}/PROGETTI/EVA`,
              comment: "AI assistant Vita Natura (Maria). WhatsApp bot + CRM estetica. Boffalora sopra Ticino, MI.",
              children: [
                { id: "eva-core", name: "CORE", type: "folder", status: "pending", path: `${S}/PROGETTI/EVA/CORE`, comment: "Persona EVA: tono, script, FAQ. Integrazione WhatsApp Business API." },
                { id: "eva-crm", name: "CRM", type: "folder", status: "future", path: `${S}/PROGETTI/EVA/CRM`, comment: "Gestione prenotazioni + clienti Vita Natura. Pipeline: EVA → Google Calendar → SMS reminder." },
              ],
            },
          ],
        },
        {
          id: "sinapsi-layers",
          name: "index.html",
          type: "file",
          status: "active",
          path: `${S}/index.html`,
          comment: "Mappa navigabile locale — tree a caselle espandibili per HR, MIMS kit, condivisione.",
        },
      ],
    },

    // ── CONTENT_ENGINE (esterno) ──────────────────────────────────────────
    {
      id: "content_engine",
      name: "CONTENT_ENGINE",
      type: "external",
      status: "pending",
      path: CE,
      comment: "Auto-generazione contenuti da flussi storici. Da ricostruire: storytelling + passato → file automatici.",
      children: [
        {
          id: "ce-storytelling",
          name: "STORYTELLING",
          type: "folder",
          status: "pending",
          path: `${CE}/STORYTELLING`,
          comment: "Flussi di coscienza storici + idee + versioni. Base narrativa per contenuti futuri.",
        },
        {
          id: "ce-templates",
          name: "TEMPLATES",
          type: "folder",
          status: "pending",
          path: `${CE}/TEMPLATES`,
          comment: "Template output: post LinkedIn, video script, podcast brief, thread X.",
        },
        {
          id: "ce-pipeline",
          name: "PIPELINE",
          type: "folder",
          status: "future",
          path: `${CE}/PIPELINE`,
          comment: "Automazione: flusso → distilla → genera → pubblica. Target: 7 automazioni Content Engine.",
        },
      ],
    },

  ],
};
