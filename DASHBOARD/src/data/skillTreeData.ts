// skillTreeData.ts | TITANIUM_OS / DASHBOARD | v3.0 | 2026-05-31
// Skill tree Matteo — gerarchia N livelli: Aree → Categorie → Skill → Dettaglio

export type SkillStatus = "done" | "active" | "blocked" | "future";

export interface SkillNode {
  id: string;
  label: string;
  icon: string;
  status: SkillStatus;
  note?: string;
  color: string;
  border: string;
  bg: string;
  dot: string;
  children?: SkillNode[];   // sottocategorie o skill
  isLeaf?: boolean;         // true = è una skill (nodo foglia)
}

// ── HELPER COLORI ─────────────────────────────────────────────────────────────
const emerald = { color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-950/20", dot: "bg-emerald-400" };
const amber   = { color: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-950/20",   dot: "bg-amber-400"   };
const cyan    = { color: "text-cyan-400",     border: "border-cyan-500/40",    bg: "bg-cyan-950/20",    dot: "bg-cyan-400"    };
const indigo  = { color: "text-indigo-400",  border: "border-indigo-500/40",  bg: "bg-indigo-950/20",  dot: "bg-indigo-400"  };
const rose    = { color: "text-rose-400",    border: "border-rose-500/40",    bg: "bg-rose-950/20",    dot: "bg-rose-400"    };
const violet  = { color: "text-violet-400",  border: "border-violet-500/40",  bg: "bg-violet-950/20",  dot: "bg-violet-400"  };
const orange  = { color: "text-orange-400",  border: "border-orange-500/40",  bg: "bg-orange-950/20",  dot: "bg-orange-400"  };
const slate   = { color: "text-slate-400",   border: "border-slate-600/30",   bg: "bg-slate-800/20",   dot: "bg-slate-500"   };
const teal    = { color: "text-teal-400",    border: "border-teal-500/40",    bg: "bg-teal-950/20",    dot: "bg-teal-400"    };

function leaf(id: string, label: string, status: SkillStatus, note?: string): SkillNode {
  const c = status === "done" ? emerald : status === "active" ? amber : status === "blocked" ? { color:"text-slate-500", border:"border-slate-700/30", bg:"bg-slate-900/40", dot:"bg-slate-600" } : { color:"text-slate-700", border:"border-slate-800/20", bg:"bg-slate-900/20", dot:"bg-slate-800" };
  return { id, label, icon: status === "done" ? "✓" : status === "active" ? "⚡" : status === "blocked" ? "○" : "◌", status, note, isLeaf: true, ...c };
}

// ── ALBERO COMPLETO ───────────────────────────────────────────────────────────
export const SKILL_ROOT: SkillNode = {
  id: "root",
  label: "Percorso Matteo",
  icon: "🧭",
  status: "active",
  ...emerald,
  children: [

    // ── FONDAMENTA ────────────────────────────────────────────────────────────
    {
      id: "fondamenta", label: "Fondamenta", icon: "⚡", status: "done", ...emerald,
      children: [

        {
          id: "fond_saldatura", label: "Saldatura", icon: "🔥", status: "done", ...emerald,
          children: [
            leaf("f01", "TIG acciaio strutturale", "done", "15 anni officina"),
            leaf("f02", "TIG titanio gr.1/gr.2", "done", "SCProject MotoGP — corrente 200A"),
            leaf("f03", "MIG acciaio / inox", "done", "officina propria"),
            leaf("f14", "Saldatura a punti / resistenza", "done"),
          ],
        },

        {
          id: "fond_lavorazione", label: "Lavorazione meccanica", icon: "⚙", status: "done", ...emerald,
          children: [
            leaf("f10", "Tornio manuale (base)", "done"),
            leaf("f11", "Fresatrice manuale (base)", "done"),
            leaf("f12", "Taglio plasma / smerigliatrice angolare", "done"),
          ],
        },

        {
          id: "fond_automazione", label: "Automazione industriale", icon: "🤖", status: "done", ...emerald,
          children: [
            leaf("f06", "Robot Panasonic — programmazione percorsi", "done", "ESSEGI"),
            leaf("f07", "Robot cobot — setup fixture", "done", "ESSEGI"),
            leaf("f08", "Presse industriali", "done", "DATWLER"),
          ],
        },

        {
          id: "fond_qualita", label: "Qualità & Basi tecniche", icon: "📐", status: "done", ...emerald,
          children: [
            leaf("f04", "Lettura disegno tecnico", "done"),
            leaf("f05", "Metrologia (calibro, micrometro, comparatore)", "done"),
            leaf("f09", "QC linea di produzione", "done", "LU.VE refrigerazione"),
            leaf("f13", "Lettura schemi elettrici", "done"),
          ],
        },

      ],
    },

    // ── V32 ───────────────────────────────────────────────────────────────────
    {
      id: "v32", label: "V32 CNC", icon: "🔩", status: "active", ...amber,
      children: [

        {
          id: "v32_struttura", label: "Struttura meccanica", icon: "🏗", status: "active", ...amber,
          children: [
            leaf("s01", "Progetto telaio traliccio 40×40×3 S235", "done"),
            leaf("s02", "Taglio profilati a misura", "done"),
            leaf("s03", "Saldatura TIG telaio base", "done"),
            leaf("s04", "Verifica planarità basamento (±0.1mm)", "done"),
            leaf("s05", "Colonne portale 60×60 montate", "done"),
            leaf("s06", "Decisione corpo unico — no molle", "done", "maggio 2026"),
            leaf("s07", "Gusset 200mm colonna Z sinistra", "active", "Config G — IN CORSO"),
            leaf("s08", "Gusset 200mm colonna Z destra", "blocked", "attende Z sinistra"),
            leaf("s09", "Diagonali rinforzo colonne", "blocked"),
            leaf("s10", "Tiranti M10 superiori", "blocked"),
            leaf("s11", "Epoxy fill colonne — smorzamento vibrazioni", "blocked"),
            leaf("s12", "Verniciatura struttura", "future"),
          ],
        },

        {
          id: "v32_cinematica", label: "Cinematica", icon: "↔", status: "active", ...amber,
          children: [
            leaf("c01", "Asse X: guide lineari montate", "done"),
            leaf("c02", "Asse X: vite a ricircolo SFU calibrata", "done"),
            leaf("c03", "Asse X: supporti vite FK/FF", "done"),
            leaf("c04", "Asse X: slitte carrello allineate", "done"),
            leaf("c05", "Asse Y: guide lineari montate", "blocked"),
            leaf("c06", "Asse Y: vite a ricircolo calibrata", "blocked"),
            leaf("c07", "Asse Z: guide montate su colonne", "blocked"),
            leaf("c08", "Asse Z: vite verticale calibrata", "blocked"),
            leaf("c09", "Gioco assiale misurato tutti assi (<0.02mm)", "future"),
            leaf("c10", "Ripetibilità bidirezionale verificata", "future"),
            leaf("c11", "Lubrificazione guide (grasso LM2)", "future"),
            leaf("c12", "Copertura guide — soffietti antitruciolo", "future"),
          ],
        },

        {
          id: "v32_azionamenti", label: "Azionamenti", icon: "⚙", status: "active", ...amber,
          children: [
            leaf("a01", "Servomotore asse X montato + giuntato", "done"),
            leaf("a02", "Drive Siemens SINAMICS collegato asse X", "done"),
            leaf("a03", "Encoder asse X configurato", "done"),
            leaf("a04", "Parametrizzazione drive X", "active"),
            leaf("a05", "Servomotore asse Y montato", "blocked"),
            leaf("a06", "Servomotore asse Z montato", "blocked"),
            leaf("a07", "Mandrino 2.2kW ER20 — ordinare", "active", "BLOCKER principale"),
            leaf("a08", "Mandrino 2.2kW ER20 montato", "blocked"),
            leaf("a09", "Inverter mandrino configurato", "blocked"),
            leaf("a10", "Tuning PID tutti assi", "future"),
            leaf("a11", "Test velocità rapids tutti assi", "future"),
            leaf("a12", "Test coppia sotto carico", "future"),
          ],
        },

        {
          id: "v32_controllo", label: "Controllo PLC/HMI", icon: "🖥", status: "active", ...cyan,
          children: [
            leaf("k01", "PLC Siemens S7-314C-2 PtP installato", "done"),
            leaf("k02", "HMI TP900 Comfort acquisito + montato", "done"),
            leaf("k03", "TIA Portal installato + licenza", "done"),
            leaf("k04", "Comunicazione PLC-HMI verificata", "done"),
            leaf("k05", "Programma PLC asse X — LAD base", "active"),
            leaf("k06", "Schermata HMI home + jog manuale", "blocked"),
            leaf("k07", "Fine corsa hardware tutti assi", "blocked"),
            leaf("k08", "Fine corsa software (software limits)", "blocked"),
            leaf("k09", "E-STOP cablato e testato", "blocked"),
            leaf("k10", "Homing automatico tutti assi", "future"),
            leaf("k11", "Programma G-code primo pezzo", "future"),
            leaf("k12", "Interfaccia PC-PLC via OPC-UA", "future"),
          ],
        },

        {
          id: "v32_sensori", label: "Sensoristica", icon: "📡", status: "active", ...indigo,
          children: [
            leaf("x01", "IFM VSE150 vibrazioni installato", "done"),
            leaf("x02", "IFM VSA004 accelerometro triassiale", "done"),
            leaf("x03", "Balluff IO-Link master BNI004L (8 porte)", "done"),
            leaf("x04", "ESP32 firmware WiFi + HTTP base", "blocked"),
            leaf("x05", "Lettura vibrazioni live su dashboard", "future"),
            leaf("x06", "Alert vibrazione anomala (soglia configurabile)", "future"),
            leaf("x07", "Misura termica utensile", "future"),
            leaf("x08", "Probing utensile — tool length offset", "future"),
          ],
        },

        {
          id: "v32_validazione", label: "Validazione e prima parte", icon: "✓", status: "future", ...rose,
          children: [
            leaf("v01", "Movimento tutti assi — test in aria", "future"),
            leaf("v02", "Precisione posizionamento ±0.019mm RSS", "future"),
            leaf("v03", "Prima fresa in MDF — test percorso", "future"),
            leaf("v04", "Prima fresa in alluminio 7075", "future"),
            leaf("v05", "Finitura superficie Ra < 1.6 µm", "future"),
            leaf("v06", "Primo componente MIMS Heavy prodotto", "future", "→ sblocca VULCAN + MIMS"),
            leaf("v07", "BEP raggiunto — 61 ore lavorate", "future"),
            leaf("v08", "ROI 322% anno 1 documentato", "future"),
          ],
        },

      ],
    },

    // ── SOFTWARE & AI ─────────────────────────────────────────────────────────
    {
      id: "software", label: "Software & AI", icon: "🧠", status: "active", ...violet,
      children: [

        {
          id: "sw_infra", label: "Infrastruttura", icon: "🏗", status: "done", ...violet,
          children: [
            leaf("sw01", "Python 3.11 — scripting + automazioni", "done"),
            leaf("sw02", "Flask API server", "done"),
            leaf("sw03", "React 19 + TypeScript", "done"),
            leaf("sw09", "Dashboard React 19 — v7.0", "done"),
          ],
        },

        {
          id: "sw_ai", label: "AI & Agenti", icon: "🤖", status: "done", ...violet,
          children: [
            leaf("sw04", "RAG ibrido — ChromaDB + BM25 + CrossEncoder", "done"),
            leaf("sw05", "MCP server (Model Context Protocol)", "done"),
            leaf("sw06", "Multi-agente NEXUS swarm", "done"),
            leaf("sw07", "Computer use ARGUS v2 — OmniParser", "done"),
          ],
        },

        {
          id: "sw_automazione", label: "Automazione & Workflow", icon: "⚡", status: "active", ...violet,
          children: [
            leaf("sw08", "Story Agent — git commit → episodio podcast", "done"),
            leaf("sw10", "n8n workflow automation", "active"),
            leaf("sw11", "EVA WhatsApp Business API", "blocked"),
          ],
        },

        {
          id: "sw_proprio", label: "AI proprietaria", icon: "🔮", status: "future", ...violet,
          children: [
            leaf("sw12", "Fine-tuning LLM su dataset TITANIUM_OS", "future"),
            leaf("sw13", "Modello proprio dominio manifatturiero", "future"),
            leaf("sw14", "AVA YouTube avatar", "future"),
          ],
        },

      ],
    },

    // ── VULCAN ────────────────────────────────────────────────────────────────
    {
      id: "vulcan", label: "VULCAN", icon: "🔥", status: "blocked", ...orange,
      note: "Si sblocca quando V32 produce il primo componente MIMS",
      children: [

        {
          id: "vl_hardware", label: "Hardware pressa", icon: "🏭", status: "done", ...orange,
          children: [
            leaf("vl01", "Pressa 20t colonne guida montate", "done"),
          ],
        },

        {
          id: "vl_materiali", label: "Ricette materiali", icon: "🧪", status: "blocked", ...orange,
          children: [
            leaf("vl02", "Ricetta polimero A — PA-GF30 base", "future"),
            leaf("vl03", "Ricetta polimero B — composito rinforzato", "future"),
            leaf("vl04", "Ricetta polimero C — alta temperatura", "future"),
          ],
        },

        {
          id: "vl_produzione", label: "Produzione MIMS", icon: "⚙", status: "blocked", ...orange,
          children: [
            leaf("vl05", "Stampo test MIMS Light in ABS", "future"),
            leaf("vl06", "Primo tile MIMS Heavy prodotto", "future"),
          ],
        },

        {
          id: "vl_ip", label: "IP & Business", icon: "📜", status: "future", ...orange,
          children: [
            leaf("vl07", "Brevetto processo polimeri depositato", "future"),
          ],
        },

      ],
    },

    // ── PRECISION LAB ─────────────────────────────────────────────────────────
    {
      id: "precision_lab", label: "Precision Lab", icon: "🏭", status: "blocked", ...teal,
      note: "Si sblocca con V32 operativa — EUR 45/h",
      children: [

        {
          id: "pl_lancio", label: "Lancio commerciale", icon: "🚀", status: "blocked", ...teal,
          children: [
            leaf("pl01", "Prima lavorazione cliente — EUR 45/h", "future"),
            leaf("pl02", "BEP superato — V32 si ripaga", "future"),
          ],
        },

        {
          id: "pl_operativo", label: "Operativo", icon: "📋", status: "blocked", ...teal,
          children: [
            leaf("pl03", "Listino materiali — Alu, acciaio, titanio", "future"),
            leaf("pl04", "Workflow preventivo → produzione → consegna", "future"),
          ],
        },

        {
          id: "pl_scala", label: "Scala & Partnership", icon: "📈", status: "future", ...teal,
          children: [
            leaf("pl05", "Prima partnership B2B", "future"),
            leaf("pl06", "Cashflow dal laboratorio finanzia VULCAN", "future"),
          ],
        },

      ],
    },

    // ── CAPANNONE 2030 ────────────────────────────────────────────────────────
    {
      id: "capannone", label: "Capannone 2030", icon: "🎯", status: "future", ...slate,
      note: "Target: 15 Luglio 2030",
      children: [

        {
          id: "cap_finanziario", label: "Capitale & Spazio", icon: "💰", status: "future", ...slate,
          children: [
            leaf("cp01", "Capitale accumulato dal Precision Lab", "future"),
            leaf("cp02", "Capannone trovato e affittato", "future"),
          ],
        },

        {
          id: "cap_setup", label: "Setup macchine", icon: "🔩", status: "future", ...slate,
          children: [
            leaf("cp03", "V32 spostata e reinstallata", "future"),
            leaf("cp04", "VULCAN operativo nel capannone", "future"),
          ],
        },

        {
          id: "cap_produzione", label: "Produzione & Team", icon: "👥", status: "future", ...slate,
          children: [
            leaf("cp05", "Prima produzione MIMS industriale", "future"),
            leaf("cp06", "Team — primo collaboratore assunto", "future"),
          ],
        },

        {
          id: "cap_visione", label: "Visione", icon: "🌟", status: "future", ...slate,
          children: [
            leaf("cp07", "Fit Park 4.0 — prima installazione", "future"),
            leaf("cp08", "Libertà — 15 Luglio 2030", "future"),
          ],
        },

      ],
    },

  ],
};

// ── UTILITY ───────────────────────────────────────────────────────────────────
export function nodeProgress(node: SkillNode): { done: number; total: number; active: number; pct: number } {
  if (node.isLeaf) {
    return {
      done: node.status === "done" ? 1 : 0,
      total: 1,
      active: node.status === "active" ? 1 : 0,
      pct: node.status === "done" ? 100 : 0,
    };
  }
  const leaves = getAllLeaves(node);
  const done   = leaves.filter(l => l.status === "done").length;
  const active = leaves.filter(l => l.status === "active").length;
  return { done, total: leaves.length, active, pct: leaves.length ? Math.round((done / leaves.length) * 100) : 0 };
}

export function getAllLeaves(node: SkillNode): SkillNode[] {
  if (node.isLeaf) return [node];
  return (node.children ?? []).flatMap(getAllLeaves);
}

export function globalProgress() {
  const leaves = getAllLeaves(SKILL_ROOT);
  const done    = leaves.filter(l => l.status === "done").length;
  const active  = leaves.filter(l => l.status === "active").length;
  const blocked = leaves.filter(l => l.status === "blocked").length;
  const future  = leaves.filter(l => l.status === "future").length;
  return { total: leaves.length, done, active, blocked, future };
}

// Legacy export per compatibilità (non usato nella nuova MatteoSection)
export const SKILL_TREE: any[] = [];
export type SkillCategory = any;
export function categoryProgress(_: any) { return { done: 0, total: 0, active: 0, pct: 0 }; }
