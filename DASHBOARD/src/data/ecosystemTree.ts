// ecosystemTree.ts | TITANIUM_OS | v2.0 | 2026-03-10
// Struttura albero cartelle — aggiornata con KNOWLEDGE 21 file, n8n, watcher, costs

export interface EcoNode {
  id: string;
  name: string;
  type: "folder" | "file" | "node" | "automation" | "data" | "dashboard";
  status: "active" | "pending" | "archived" | "future";
  comment: string;
  path?: string;
  children?: EcoNode[];
}

const R = "C:/Users/Matteo/Desktop/TITANIUM_OS";
const M = "C:/Users/Matteo/Desktop/LA MIA MENTE";

export const ECOSYSTEM_TREE: EcoNode = {
  id: "root",
  name: "TITANIUM_OS",
  type: "folder",
  status: "active",
  path: R,
  comment: "Root sistema ricorsivo — ogni nodo nutre gli altri. v2.1.0",
  children: [
    {
      id: "core",
      name: "BRAIN",
      type: "folder",
      status: "active",
      path: `${R}/BRAIN`,
      comment: "State machine + memoria AI + KNOWLEDGE base. Il cuore del sistema.",
      children: [
        { id: "state", name: "STATE.json", type: "data", status: "active", path: `${R}/BRAIN/STATE.json`, comment: "Stato live: milestone, step, blockers, pillars, nodi attivi." },
        {
          id: "knowledge", name: "KNOWLEDGE", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE`,
          comment: "21 file .md strutturati per dominio. Popolata da ASSOLUTO V6.",
          children: [
            { id: "k-economics", name: "economics/ (5 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/economics`, comment: "roi-analysis · pricing-strategy · revenue-model · risk-analysis · revenue-target-y1" },
            { id: "k-technical", name: "technical/ (3 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/technical`, comment: "iot-automation · genesis-architecture · tech-stack-unified" },
            { id: "k-mims", name: "mims/ (5 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/mims`, comment: "protocol · configurations · applications · market-analysis · fit-park-specs" },
            { id: "k-system", name: "system/ (8 file)", type: "folder", status: "active", path: `${R}/BRAIN/KNOWLEDGE/system`, comment: "rules/ (ai-behavior, lex-digitalis, documentation-rules, neuro-sincrono) + personas/ (eva, themis, ava, the-board-prompts)" },
          ],
        },
        { id: "assoluto", name: "ASSOLUTO/", type: "folder", status: "active", path: `${R}/BRAIN/ASSOLUTO`, comment: "Atti ufficiali, contratti, specifiche legali." },
      ],
    },
    {
      id: "automations",
      name: "AUTOMATIONS",
      type: "folder",
      status: "active",
      path: `${R}/AUTOMATIONS`,
      comment: "Core automazioni + deploy configs. 10 moduli Python + Docker n8n.",
      children: [
        {
          id: "auto-core", name: "core/ (10 moduli)", type: "folder", status: "active", path: `${R}/AUTOMATIONS/core`,
          comment: "watcher · backup · changelog_writer · state_updater · scanner · pdf_to_memory · cross_ref_engine · session_orienter · milestone_tracker · assoluto_splitter",
        },
        {
          id: "auto-deploy", name: "deploy/n8n/", type: "folder", status: "active", path: `${R}/AUTOMATIONS/deploy/n8n`,
          comment: "docker-compose.yml + .env.example + DEPLOY.md — Oracle Cloud Free Tier (EUR 0/mese). Workflow MENTE_SCANNER importato.",
        },
      ],
    },
    {
      id: "nodes",
      name: "NODES",
      type: "folder",
      status: "active",
      path: `${R}/NODES`,
      comment: "Automazioni viventi. Ogni nodo = processo autonomo.",
      children: [
        { id: "mente", name: "MENTE_SCANNER", type: "automation", status: "active", path: `${R}/NODES/MENTE_SCANNER`, comment: "ATTIVO — 818 estrazioni da 46 file. Scan giornaliero via n8n." },
        { id: "eva", name: "EVA", type: "automation", status: "pending", path: `${R}/NODES/EVA`, comment: "WhatsApp bot Vita Natura. Attende API setup." },
        { id: "v32watcher", name: "V32_WATCHER", type: "automation", status: "future", path: `${R}/NODES/V32_WATCHER`, comment: "Telemetria CNC via IFM + OPC-UA. Post assemblaggio." },
      ],
    },
    {
      id: "data",
      name: "DATA",
      type: "folder",
      status: "active",
      path: `${R}/DATA`,
      comment: "Output processato. Fonte dati per dashboard.",
      children: [
        { id: "mente_digest", name: "mente_digest.json", type: "data", status: "active", path: `${R}/DATA/mente_digest.json`, comment: "Output MENTE_SCANNER — 818 estrazioni (354 dec, 329 spec, 135 milestone)." },
        { id: "costs", name: "costs.json", type: "data", status: "active", path: `${R}/DATA/costs.json`, comment: "Registro costi infrastruttura. Totale attivo: EUR 0/mese." },
        { id: "projects", name: "projects.json", type: "data", status: "active", path: `${R}/DATA/projects.json`, comment: "Registro progetti: V32, MIMS, GENESIS, VITA_NATURA." },
        { id: "milestones", name: "milestones.json", type: "data", status: "active", path: `${R}/DATA/milestones.json`, comment: "Lista milestone con tracking status." },
        { id: "contacts", name: "contacts.json", type: "data", status: "active", path: `${R}/DATA/contacts.json`, comment: "Rubrica contatti professionali." },
      ],
    },
    { id: "pdf_drop", name: "PDF_DROP", type: "folder", status: "active", path: `${R}/PDF_DROP`, comment: "Drop zone per PDF. Auto-processati da pdf_to_memory.py → KNOWLEDGE/ o ASSOLUTO/." },
    {
      id: "dashboard",
      name: "DASHBOARD",
      type: "dashboard",
      status: "active",
      path: `${R}/DASHBOARD`,
      comment: "React 19 + Vite + Tailwind v4. 10 pannelli, CicloBar, EcoTree. Porta 5173.",
    },
    { id: "versions", name: "VERSIONS", type: "folder", status: "active", path: `${R}/VERSIONS`, comment: "changelog.md + watcher.log + diff_log.json + snapshot archives." },
    { id: "api_server", name: "api_server.py", type: "file", status: "active", path: `${R}/api_server.py`, comment: "Flask API :5001 — /api/state, /api/digest, /api/scan, /api/health." },
    { id: "claude_md", name: "CLAUDE.md", type: "file", status: "active", path: `${R}/CLAUDE.md`, comment: "Istruzioni Claude Code. Neuro-Sincrono attivo." },
    {
      id: "la_mia_mente",
      name: "LA MIA MENTE",
      type: "folder",
      status: "active",
      path: M,
      comment: "61 file sorgente. ASSOLUTO V6 + V32 + MIMS + manifesti. Scansionati da MENTE_SCANNER.",
      children: [
        { id: "v6_folder", name: "v6/ (15 file)", type: "folder", status: "active", path: `${M}/v6`, comment: "ASSOLUTO V6 completo: 10 ATTI + LEX DIGITALIS + istruzioni." },
        { id: "taitan_folder", name: "TAITAN/ (14 file)", type: "folder", status: "active", path: `${M}/TAITAN`, comment: "Manifesti ecosistema: Master Plan, Codex Prodotto, figure professionali." },
        { id: "mims_folder", name: "MIMS/ (10 file)", type: "folder", status: "active", path: `${M}/MIMS`, comment: "CAD 3D: STL + Shapr3D. Piastra A5, corpo connettore, assiemi." },
      ],
    },
  ],
};
