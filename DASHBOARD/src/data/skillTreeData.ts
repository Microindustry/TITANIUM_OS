// skillTreeData.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-31
// Skill tree Matteo — percorso reale V32 + ecosistema

export type SkillStatus = "done" | "active" | "blocked" | "future";

export interface Skill {
  id: string;
  label: string;
  status: SkillStatus;
  note?: string;        // cosa l'ha sbloccato o cosa sblocca
  unlocks?: string[];   // id di skill che sblocca
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  border: string;
  bg: string;
  dot: string;
  icon: string;
  skills: Skill[];
  unlockedBy?: string; // id categoria che deve essere completata prima
}

export const SKILL_TREE: SkillCategory[] = [
  // ─────────────────────────────────────────────
  // FONDAMENTA — prerequisiti già acquisiti
  // ─────────────────────────────────────────────
  {
    id: "fondamenta",
    label: "FONDAMENTA",
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/20",
    dot: "bg-emerald-500",
    icon: "⚡",
    skills: [
      { id: "f01", label: "TIG acciaio strutturale", status: "done", note: "15 anni officina" },
      { id: "f02", label: "TIG titanio (grado 5)", status: "done", note: "SCProject MotoGP" },
      { id: "f03", label: "MIG acciaio", status: "done", note: "officina propria" },
      { id: "f04", label: "Lettura disegno tecnico", status: "done" },
      { id: "f05", label: "Metrologia di base (calibro, micrometro)", status: "done" },
      { id: "f06", label: "Robot industriali (programmazione)", status: "done", note: "ESSEGI" },
      { id: "f07", label: "Presse industriali", status: "done", note: "DATWLER" },
      { id: "f08", label: "QC su linea produzione", status: "done", note: "LU.VE" },
      { id: "f09", label: "Tornio manuale (base)", status: "done" },
      { id: "f10", label: "Fresatrice manuale (base)", status: "done" },
      { id: "f11", label: "Taglio plasma / smerigliatrice angolare", status: "done" },
      { id: "f12", label: "Lettura schemi elettrici", status: "done" },
    ],
  },

  // ─────────────────────────────────────────────
  // V32 — STRUTTURA MECCANICA
  // ─────────────────────────────────────────────
  {
    id: "v32_struttura",
    label: "V32 — Struttura",
    color: "text-amber-400",
    border: "border-amber-500/40",
    bg: "bg-amber-950/20",
    dot: "bg-amber-500",
    icon: "🔩",
    skills: [
      { id: "s01", label: "Progetto telaio traliccio 40×40×3 S235", status: "done" },
      { id: "s02", label: "Taglio profilati a misura", status: "done" },
      { id: "s03", label: "Saldatura TIG telaio base", status: "done" },
      { id: "s04", label: "Verifica planarità basamento (±0.1mm)", status: "done" },
      { id: "s05", label: "Colonne portale 60×60 montate", status: "done" },
      { id: "s06", label: "Decisione corpo unico (no molle)", status: "done", note: "maggio 2026" },
      { id: "s07", label: "Gusset 200mm colonna Z sinistra", status: "active", note: "Config G in corso" },
      { id: "s08", label: "Gusset 200mm colonna Z destra", status: "blocked", note: "attende Z sinistra" },
      { id: "s09", label: "Diagonali rinforzo colonne", status: "blocked" },
      { id: "s10", label: "Tiranti M10 superiori", status: "blocked" },
      { id: "s11", label: "Epoxy fill colonne (smorzamento vibrazioni)", status: "blocked" },
      { id: "s12", label: "Verniciatura struttura", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // V32 — CINEMATICA (guide, viti, cuscinetti)
  // ─────────────────────────────────────────────
  {
    id: "v32_cinematica",
    label: "V32 — Cinematica",
    color: "text-amber-400",
    border: "border-amber-500/40",
    bg: "bg-amber-950/20",
    dot: "bg-amber-500",
    icon: "↔",
    skills: [
      { id: "c01", label: "Asse X: guide lineari montate", status: "done" },
      { id: "c02", label: "Asse X: vite a ricircolo SFU calibrata", status: "done" },
      { id: "c03", label: "Asse X: supporti vite (FK/FF)", status: "done" },
      { id: "c04", label: "Asse X: slitte carrello allineate", status: "done" },
      { id: "c05", label: "Asse Y: guide lineari montate", status: "blocked" },
      { id: "c06", label: "Asse Y: vite a ricircolo calibrata", status: "blocked" },
      { id: "c07", label: "Asse Z: guide montate su colonne", status: "blocked" },
      { id: "c08", label: "Asse Z: vite verticale calibrata", status: "blocked" },
      { id: "c09", label: "Gioco assiale misurato tutti gli assi (<0.02mm)", status: "future" },
      { id: "c10", label: "Ripetibilità bidirezionale verificata", status: "future" },
      { id: "c11", label: "Lubrificazione guide (grasso LM2)", status: "future" },
      { id: "c12", label: "Copertura guide da trucioli (soffietti)", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // V32 — AZIONAMENTI (servo, drive, encoder)
  // ─────────────────────────────────────────────
  {
    id: "v32_azionamenti",
    label: "V32 — Azionamenti",
    color: "text-amber-400",
    border: "border-amber-500/40",
    bg: "bg-amber-950/20",
    dot: "bg-amber-500",
    icon: "⚙",
    skills: [
      { id: "a01", label: "Servomotore asse X montato + giuntato", status: "done" },
      { id: "a02", label: "Drive Siemens collegato asse X", status: "done" },
      { id: "a03", label: "Encoder asse X configurato", status: "done" },
      { id: "a04", label: "Parametrizzazione drive X (SINAMICS)", status: "active" },
      { id: "a05", label: "Servomotore asse Y montato", status: "blocked" },
      { id: "a06", label: "Servomotore asse Z montato", status: "blocked" },
      { id: "a07", label: "Mandrino 2.2kW ER20 ordinato", status: "active", note: "BLOCKER — da ordinare" },
      { id: "a08", label: "Mandrino 2.2kW ER20 montato", status: "blocked", note: "attende ordine" },
      { id: "a09", label: "Inverter mandrino configurato", status: "blocked" },
      { id: "a10", label: "Tuning guadagni PID tutti assi", status: "future" },
      { id: "a11", label: "Test velocità max (rapids) tutti assi", status: "future" },
      { id: "a12", label: "Test coppia sotto carico", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // V32 — CONTROLLO (PLC, HMI, software)
  // ─────────────────────────────────────────────
  {
    id: "v32_controllo",
    label: "V32 — Controllo",
    color: "text-cyan-400",
    border: "border-cyan-500/40",
    bg: "bg-cyan-950/20",
    dot: "bg-cyan-500",
    icon: "🖥",
    skills: [
      { id: "k01", label: "PLC Siemens S7-314C-2 PtP installato", status: "done" },
      { id: "k02", label: "HMI TP900 Comfort acquisito + montato", status: "done" },
      { id: "k03", label: "TIA Portal installato + licenza", status: "done" },
      { id: "k04", label: "Comunicazione PLC-HMI verificata", status: "done" },
      { id: "k05", label: "Programma PLC asse X (LAD base)", status: "active" },
      { id: "k06", label: "Schermata HMI home + jog", status: "blocked" },
      { id: "k07", label: "Fine corsa hardware tutti assi", status: "blocked" },
      { id: "k08", label: "Fine corsa software (software limits)", status: "blocked" },
      { id: "k09", label: "Arresto emergenza (E-STOP) cablato", status: "blocked" },
      { id: "k10", label: "Homing automatico tutti assi", status: "future" },
      { id: "k11", label: "Programma G-code primo pezzo", status: "future" },
      { id: "k12", label: "Interfaccia PC-PLC (OPC-UA attivo)", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // V32 — SENSORISTICA
  // ─────────────────────────────────────────────
  {
    id: "v32_sensori",
    label: "V32 — Sensoristica",
    color: "text-indigo-400",
    border: "border-indigo-500/40",
    bg: "bg-indigo-950/20",
    dot: "bg-indigo-500",
    icon: "📡",
    skills: [
      { id: "x01", label: "IFM VSE150 vibrazioni installato", status: "done" },
      { id: "x02", label: "IFM VSA004 accelerometro installato", status: "done" },
      { id: "x03", label: "Balluff IO-Link master BNI004L", status: "done" },
      { id: "x04", label: "ESP32 firmware base (WiFi + HTTP)", status: "blocked" },
      { id: "x05", label: "Lettura vibrazioni live su dashboard", status: "future" },
      { id: "x06", label: "Alert vibrazione anomala (soglia)", status: "future" },
      { id: "x07", label: "Misura termica utensile (termocamera)", status: "future" },
      { id: "x08", label: "Probing utensile (tool length)", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // V32 — VALIDAZIONE E PRIMA PARTE
  // ─────────────────────────────────────────────
  {
    id: "v32_validazione",
    label: "V32 — Validazione",
    color: "text-rose-400",
    border: "border-rose-500/40",
    bg: "bg-rose-950/20",
    dot: "bg-rose-500",
    icon: "✓",
    skills: [
      { id: "v01", label: "Test movimento tutti assi (aria)", status: "future" },
      { id: "v02", label: "Precisione posizionamento (±0.019mm RSS)", status: "future" },
      { id: "v03", label: "Prima fresa in MDF (test percorso)", status: "future" },
      { id: "v04", label: "Prima fresa in alluminio 7075", status: "future" },
      { id: "v05", label: "Finitura superficie Ra < 1.6 µm", status: "future" },
      { id: "v06", label: "Primo componente MIMS Heavy prodotto", status: "future", note: "→ sblocca MIMS" },
      { id: "v07", label: "BEP raggiunto (61 ore lavorate)", status: "future" },
      { id: "v08", label: "ROI 322% anno 1 verificato", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // SOFTWARE & AI — skill digitali
  // ─────────────────────────────────────────────
  {
    id: "software",
    label: "SOFTWARE & AI",
    color: "text-violet-400",
    border: "border-violet-500/40",
    bg: "bg-violet-950/20",
    dot: "bg-violet-500",
    icon: "🧠",
    skills: [
      { id: "sw01", label: "Python 3.11 base", status: "done" },
      { id: "sw02", label: "Flask API server", status: "done" },
      { id: "sw03", label: "React 19 + TypeScript", status: "done" },
      { id: "sw04", label: "RAG ChromaDB + BM25 + CrossEncoder", status: "done" },
      { id: "sw05", label: "MCP server (Model Context Protocol)", status: "done" },
      { id: "sw06", label: "Multi-agente NEXUS swarm", status: "done" },
      { id: "sw07", label: "Computer use ARGUS v2 (OmniParser)", status: "done" },
      { id: "sw08", label: "Story Agent (git→podcast)", status: "done" },
      { id: "sw09", label: "n8n workflow automation", status: "active" },
      { id: "sw10", label: "EVA WhatsApp Business API", status: "blocked" },
      { id: "sw11", label: "Fine-tuning LLM su dataset TITANIUM", status: "future" },
      { id: "sw12", label: "Modello proprio su dominio industriale", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // VULCAN — si sblocca con V32 completa
  // ─────────────────────────────────────────────
  {
    id: "vulcan",
    label: "VULCAN",
    color: "text-orange-400",
    border: "border-orange-500/40",
    bg: "bg-orange-950/20",
    dot: "bg-orange-500",
    icon: "🔥",
    unlockedBy: "v32_validazione",
    skills: [
      { id: "vl01", label: "Pressa 20t colonne guida montate", status: "done" },
      { id: "vl02", label: "Ricetta polimero A (PA-GF30 base)", status: "future" },
      { id: "vl03", label: "Ricetta polimero B (composito rinforzato)", status: "future" },
      { id: "vl04", label: "Ricetta polimero C (alta temperatura)", status: "future" },
      { id: "vl05", label: "Stampo test MIMS Light (ABS)", status: "future" },
      { id: "vl06", label: "Primo tile MIMS Heavy prodotto", status: "future", note: "→ sblocca MIMS Heavy" },
      { id: "vl07", label: "Brevetto processo polimeri depositato", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // PRECISION LAB — si sblocca con V32 operativa
  // ─────────────────────────────────────────────
  {
    id: "precision_lab",
    label: "PRECISION LAB",
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/20",
    dot: "bg-emerald-500",
    icon: "🏭",
    unlockedBy: "v32_validazione",
    skills: [
      { id: "pl01", label: "Prima lavorazione cliente (EUR 45/h)", status: "future" },
      { id: "pl02", label: "BEP superato — V32 si ripaga", status: "future" },
      { id: "pl03", label: "Listino materiali (Alu, acciaio, titanio)", status: "future" },
      { id: "pl04", label: "Workflow preventivo → produzione → consegna", status: "future" },
      { id: "pl05", label: "Certificazione ISO lavorazione (futuro)", status: "future" },
    ],
  },

  // ─────────────────────────────────────────────
  // CAPANNONE 2030 — obiettivo finale
  // ─────────────────────────────────────────────
  {
    id: "capannone",
    label: "CAPANNONE 2030",
    color: "text-slate-400",
    border: "border-slate-500/40",
    bg: "bg-slate-800/30",
    dot: "bg-slate-500",
    icon: "🎯",
    unlockedBy: "precision_lab",
    skills: [
      { id: "cp01", label: "Capitale accumulato dal Precision Lab", status: "future" },
      { id: "cp02", label: "Capannone trovato e affittato", status: "future" },
      { id: "cp03", label: "V32 spostata e reinstallata", status: "future" },
      { id: "cp04", label: "VULCAN operativo nel capannone", status: "future" },
      { id: "cp05", label: "Prima produzione MIMS industriale", status: "future" },
      { id: "cp06", label: "Target: 15 Luglio 2030", status: "future" },
    ],
  },
];

// Utility: conta skill per stato in una categoria
export function categoryProgress(cat: SkillCategory) {
  const total = cat.skills.length;
  const done = cat.skills.filter(s => s.status === "done").length;
  const active = cat.skills.filter(s => s.status === "active").length;
  return { total, done, active, pct: Math.round((done / total) * 100) };
}

// Utility: totale globale
export function globalProgress() {
  const all = SKILL_TREE.flatMap(c => c.skills);
  const done = all.filter(s => s.status === "done").length;
  const active = all.filter(s => s.status === "active").length;
  const blocked = all.filter(s => s.status === "blocked").length;
  const future = all.filter(s => s.status === "future").length;
  return { total: all.length, done, active, blocked, future };
}
