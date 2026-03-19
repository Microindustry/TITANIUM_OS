// NeuroOSLayout.tsx | TITANIUM_OS | v2.0 | 2026-03-18
// Layout navigazione neuro-mappa con drill-down multi-livello
// v2.0: click nodo → figli in orbita radiale | stack breadcrumb | animazione fade+slide | ∞ livelli

import { useState, useEffect, useRef, useCallback } from "react";
import { X, RotateCcw, ChevronLeft } from "lucide-react";
import {
  CellFocus, CellCiclo, CellPillars, CellV32,
  CellEcoTree, CellAutomazioni, CellMente, CellContentEngine,
  PILLARS_DATA,
} from "./CanvasLayout";
import { NeuroMapView } from "./NeuroMapView";
import { MdManager } from "./MdManager";
import { FileBrowser } from "./FileBrowser";

// ─── TIPI ──────────────────────────────────────────────────────────────────
type NodeColor = "emerald" | "cyan" | "indigo" | "amber" | "slate" | "rose" | "violet";

interface MapNode {
  id: string;
  label: string;
  sub: string;
  note: string;
  color: NodeColor;
  x: number;         // posizione % da sinistra
  y: number;         // posizione % dall'alto
  size: "sm" | "md" | "lg" | "xl";
  pct?: number;
  pulse?: boolean;
  hasChildren?: boolean; // indica drill-in disponibile
}

interface DrillChild {
  id: string;
  label: string;
  sub: string;
  note: string;
  color: NodeColor;
  size: "sm" | "md" | "lg" | "xl";
  pct?: number;
  pulse?: boolean;
  hasChildren?: boolean;
}

interface Conn { from: string; to: string; label?: string; dashed?: boolean; }

interface StackLevel {
  nodes: MapNode[];
  connections: Conn[];
  centerId: string;
  centerLabel: string;
  centerColor: NodeColor;
}

// ─── LAYOUT RADIALE ────────────────────────────────────────────────────────
// Posiziona N figli in orbita attorno al centro (50%, 50%)
function radialLayout(children: DrillChild[], _parentId: string): MapNode[] {
  const cx = 50, cy = 50;
  const r1 = 30; // raggio ring 1 in %
  const r2 = 44; // raggio ring 2

  const ring1 = children.slice(0, Math.min(children.length, 6));
  const ring2 = children.slice(6);

  const toNode = (c: DrillChild, idx: number, total: number, ring: number): MapNode => {
    const angle = (-90 + idx * (360 / total)) * (Math.PI / 180);
    const r = ring === 1 ? r1 : r2;
    return {
      ...c,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  return [
    // parent al centro (non è un nodo cliccabile come tale — è il riferimento)
    ...ring1.map((c, i) => toNode(c, i, ring1.length, 1)),
    ...ring2.map((c, i) => toNode(c, i, ring2.length, 2)),
  ];
}

function radialConnections(centerId: string, children: DrillChild[]): Conn[] {
  return children.map(c => ({ from: centerId, to: c.id }));
}

// ─── DATI DRILL-DOWN ────────────────────────────────────────────────────────
const DRILL_CHILDREN: Record<string, DrillChild[]> = {
  titanium: [], // livello 0 — nessun drill-in (si torna indietro)

  v32: [
    { id: "v32-hw",   label: "HARDWARE",    sub: "60% · Alu 7075",       note: "Struttura 178 kg, ±0.019 mm IT6. Config G: rinforzi Z+U, gusset 200mm, epoxy granite.",    color: "emerald", size: "md", pct: 60 },
    { id: "v32-sw",   label: "SOFTWARE",    sub: "85% · TITANIUM_OS",    note: "Dashboard React :5173, VLC, G-code, Python automazioni. Il cervello digitale della macchina.", color: "cyan",    size: "md", pct: 85, pulse: true },
    { id: "v32-elec", label: "ELETTRONICA", sub: "50% · controller",     note: "Controller CNC, driver stepper, sensing posizione, wiring industriale.",                    color: "indigo",  size: "sm", pct: 50 },
    { id: "v32-cnc",  label: "G-CODE",      sub: "20% · percorsi",       note: "Percorsi utensile, post-processor, cicli di lavorazione Alu 7075.",                         color: "amber",   size: "sm", pct: 20 },
  ],

  mims: [
    { id: "mims-vulcan",  label: "VULCAN",    sub: "15% · pressa 20t",  note: "Martinetto Vevor 20t (3 stati) + colonne guida DATWLER. Brevetterà la formula polimerica.", color: "rose",    size: "md", pct: 15, hasChildren: true },
    { id: "mims-kit",     label: "KIT FISICO", sub: "40% · tile",       note: "Tile modulari, sistema incastro, stampo polimero VULCAN. Prototipo in corso.",               color: "amber",   size: "md", pct: 40 },
    { id: "mims-fitpark", label: "FIT PARK",   sub: "5% · fitness",     note: "Area fitness outdoor con tornello MIMS proprietario. Primo caso d'uso B2C.",                 color: "emerald", size: "sm", pct: 5  },
    { id: "mims-digital", label: "DIGITALE",   sub: "0% · app/API",     note: "App mobile, backend gestione, API connettori MIMS. Post pressa.",                            color: "cyan",    size: "sm", pct: 0  },
  ],

  "mims-vulcan": [
    { id: "vul-struttura", label: "STRUTTURA", sub: "20% · telaio",    note: "Martinetto Vevor 20t a 3 stati (idle/semi/full). 4 colonne guida DATWLER come struttura.",  color: "rose",   size: "md", pct: 20 },
    { id: "vul-ricette",   label: "RICETTE",   sub: "0% · formula",    note: "Formulazioni polimeriche target tile MIMS. Dati: temp/pressione/tempo/durezza.",            color: "amber",  size: "md", pct: 0  },
    { id: "vul-brevetto",  label: "BREVETTO",  sub: "0% · IP",         note: "Documentazione brevettuale formula proprietaria. Moat competitivo MIMS a lungo termine.",   color: "cyan",   size: "sm", pct: 0  },
  ],

  vitanatura: [
    { id: "eva-bot",    label: "EVA BOT",  sub: "40% · WhatsApp",    note: "n8n workflow + WhatsApp Business API. Risposte automatiche, prenotazioni, follow-up clienti.", color: "indigo", size: "md", pct: 40, pulse: true },
    { id: "vita-crm",   label: "CRM",      sub: "0% · gestione",     note: "Gestione appuntamenti, clienti, SMS reminder. Pipeline: EVA → Google Calendar.",              color: "violet", size: "sm", pct: 0  },
    { id: "vita-brand", label: "BRAND",    sub: "10% · social",      note: "Instagram, contenuti estetici, campagne Vita Natura. Storytelling del centro.",               color: "emerald", size: "sm", pct: 10 },
  ],

  identity: [
    { id: "id-cv",      label: "CV LAYERS",  sub: "80% · proof",     note: "Curriculum navigabile a layer: SCProject → ESSEGI → DATWLER → LU.VE. Proof reali, non certificazioni.", color: "cyan",   size: "md", pct: 80, hasChildren: true },
    { id: "id-sinapsi", label: "SINAPSI",    sub: "60% · memoria",   note: "Ecosistema navigabile a layer. Porta di accesso ai progetti personali. Mappa CV + VULCAN + MIMS.", color: "violet", size: "md", pct: 60 },
    { id: "id-content", label: "CONTENT",    sub: "10% · video",     note: "Video, podcast, thread X, storytelling industriale. Content Engine da ricostruire.",           color: "amber",  size: "sm", pct: 10 },
  ],

  "id-cv": [
    { id: "cv-sc",      label: "SCProject", sub: "TIG/MIG MotoGP",   note: "Saldatura titanio aerospace. Scarichi MotoGP montati in gara WorldChampionship.",             color: "cyan",    size: "md", pct: 100 },
    { id: "cv-essegi",  label: "ESSEGI",    sub: "robot industriali", note: "Programmazione e operatività robot industriali. Celle automatizzate in produzione.",           color: "indigo",  size: "md", pct: 100 },
    { id: "cv-datwler", label: "DATWLER",   sub: "presse + guide",   note: "Setup presse industriali. Colonne guida riutilizzate come struttura in VULCAN.",               color: "amber",   size: "md", pct: 100 },
    { id: "cv-luve",    label: "LU.VE",     sub: "QC · ISO",         note: "Quality Control scambiatori di calore. Metrologia, CMM, non conformità, normative EU.",        color: "emerald", size: "md", pct: 100 },
  ],

  genesis: [
    { id: "gen-brain", label: "BRAIN",       sub: "90% · STATE.json",  note: "STATE.json + KNOWLEDGE 21 file + ASSOLUTO V7. Fonte primaria di orientamento.",               color: "cyan",   size: "md", pct: 90, pulse: true },
    { id: "gen-auto",  label: "AUTOMATIONS", sub: "70% · 34 nodi",     note: "34 automazioni: 13 attive + 14 da fare + 7 Content Engine. Python-only, zero cloud.",         color: "emerald", size: "md", pct: 70 },
    { id: "gen-dash",  label: "DASHBOARD",   sub: "85% · React 19",    note: "React 19 + Vite + Tailwind v4. LayersView v2, NeuroMap v3, 10+ pannelli. Porta 5173.",        color: "indigo",  size: "md", pct: 85 },
    { id: "gen-mem",   label: "MEMORY",      sub: "75% · .claude",     note: ".claude/memory/ — feedback, user, project, reference. Persistenza tra sessioni Claude Code.", color: "violet",  size: "sm", pct: 75 },
  ],

  focus: [
    { id: "foc-milestone", label: "MILESTONE", sub: "attiva",          note: "Milestone corrente: Config G — Rinforzi Z+U. Tracking progress in tempo reale.",              color: "cyan",   size: "md" },
    { id: "foc-blockers",  label: "BLOCKERS",  sub: "in risoluzione",  note: "Blockers attivi: manca mandrino 2.2kW ER20. Da ordinare prima di procedere.",                 color: "rose",   size: "sm" },
    { id: "foc-pipeline",  label: "PIPELINE",  sub: "13 attive",       note: "Automazioni attive: watcher, state_updater, watchdog, api :5001.",                            color: "emerald", size: "sm" },
  ],

  ciclo: [
    { id: "ciclo-build",    label: "COSTRUISCI", sub: "▶ NOW",          note: "Config G in corso: rinforzi colonne Z+U, gusset 200mm, diagonali, epoxy granite.",            color: "emerald", size: "md", pulse: true },
    { id: "ciclo-doc",      label: "DOCUMENTA",  sub: "building",       note: "Video AVA, changelog automatico n8n, storytelling milestone → LinkedIn.",                     color: "cyan",   size: "sm" },
    { id: "ciclo-teach",    label: "INSEGNA",    sub: "futuro",         note: "Community, skill tree, tutorial YouTube. PDF to memory.",                                     color: "cyan",   size: "sm" },
    { id: "ciclo-unlock",   label: "SBLOCCA",    sub: "attivo",         note: "Rimuovi blockers. Sblocca competenze critiche. Risolvi dipendenze.",                           color: "indigo", size: "sm" },
    { id: "ciclo-design",   label: "PROGETTA",   sub: "building",       note: "MIMS CAD Shapr3D, connettori A/B, GENESIS v7, design V33.",                                   color: "indigo", size: "sm" },
    { id: "ciclo-produce",  label: "PRODUCI",    sub: "pending",        note: "V32 + pressa MIMS. Ore fresatura €45/h · stampi €500/cad.",                                   color: "amber",  size: "sm" },
    { id: "ciclo-sell",     label: "VENDI",      sub: "futuro",         note: "B2B fresatura, MIMS kit, EVA SaaS. Target: €1.500/mese 2027.",                                color: "amber",  size: "sm" },
    { id: "ciclo-reinvest", label: "REINVESTI",  sub: "futuro",         note: "Upgrade V32→V33, espandi MIMS Heavy, reinvesti profitto. Capannone 2030.",                    color: "emerald", size: "sm" },
  ],
};

// ─── CROSS-CONNECTIONS NEURALI PER LIVELLO DRILL ──────────────────────────
// Connessioni laterali tra figli (non solo parent→figlio) — le "sinapsi"
const DRILL_CROSS_CONNS: Record<string, Conn[]> = {
  // ── GENESIS ───────────────────────────────────────────────────────────
  genesis: [
    { from: "gen-mem",   to: "gen-brain", label: "ricorda",    dashed: true },
    { from: "gen-brain", to: "gen-auto",  label: "istruisce",  dashed: true },
    { from: "gen-brain", to: "gen-dash",  label: "stato live", dashed: true },
    { from: "gen-auto",  to: "gen-dash",  label: "alimenta",   dashed: true },
    { from: "gen-auto",  to: "gen-mem",   label: "archivia",   dashed: true },
  ],
  // ── MIMS ─────────────────────────────────────────────────────────────
  mims: [
    { from: "mims-vulcan",  to: "mims-kit",      label: "produce",   dashed: true },
    { from: "mims-kit",     to: "mims-fitpark",   label: "installa",  dashed: true },
    { from: "mims-kit",     to: "mims-digital",   label: "connette",  dashed: true },
    { from: "mims-fitpark", to: "mims-digital",   label: "dati uso",  dashed: true },
  ],
  // ── VULCAN ───────────────────────────────────────────────────────────
  "mims-vulcan": [
    { from: "vul-struttura", to: "vul-ricette",   label: "pressa",    dashed: true },
    { from: "vul-ricette",   to: "vul-brevetto",  label: "formula IP",dashed: true },
  ],
  // ── V32 ──────────────────────────────────────────────────────────────
  v32: [
    { from: "v32-hw",   to: "v32-elec",   label: "ospita",    dashed: true },
    { from: "v32-elec", to: "v32-sw",     label: "segnali",   dashed: true },
    { from: "v32-sw",   to: "v32-cnc",    label: "invia",     dashed: true },
    { from: "v32-hw",   to: "v32-cnc",    label: "vincoli",   dashed: true },
  ],
  // ── VITA NATURA ──────────────────────────────────────────────────────
  vitanatura: [
    { from: "eva-bot",   to: "vita-crm",   label: "popola",    dashed: true },
    { from: "vita-crm",  to: "vita-brand", label: "fidelizza", dashed: true },
    { from: "vita-brand",to: "eva-bot",    label: "porta clienti", dashed: true },
  ],
  // ── IDENTITY ─────────────────────────────────────────────────────────
  identity: [
    { from: "id-cv",      to: "id-sinapsi",  label: "popola",    dashed: true },
    { from: "id-sinapsi", to: "id-content",  label: "racconta",  dashed: true },
    { from: "id-content", to: "id-cv",       label: "valorizza", dashed: true },
  ],
  // ── CV LAYERS ────────────────────────────────────────────────────────
  "id-cv": [
    { from: "cv-sc",      to: "cv-essegi",   label: "evolve",    dashed: true },
    { from: "cv-essegi",  to: "cv-datwler",  label: "meccanica", dashed: true },
    { from: "cv-datwler", to: "cv-luve",     label: "qualità",   dashed: true },
    { from: "cv-datwler", to: "cv-sc",       label: "guide→VULCAN", dashed: true },
  ],
  // ── FOCUS ────────────────────────────────────────────────────────────
  focus: [
    { from: "foc-milestone", to: "foc-blockers",  label: "bloccata da", dashed: true },
    { from: "foc-blockers",  to: "foc-pipeline",  label: "risolve",     dashed: true },
    { from: "foc-pipeline",  to: "foc-milestone", label: "avanza",      dashed: true },
  ],
  // ── CICLO OPERATIVO — loop completo ───────────────────────────────────
  ciclo: [
    { from: "ciclo-build",    to: "ciclo-doc",      label: "→" },
    { from: "ciclo-doc",      to: "ciclo-teach",    label: "→" },
    { from: "ciclo-teach",    to: "ciclo-unlock",   label: "→" },
    { from: "ciclo-unlock",   to: "ciclo-design",   label: "→" },
    { from: "ciclo-design",   to: "ciclo-produce",  label: "→" },
    { from: "ciclo-produce",  to: "ciclo-sell",     label: "→" },
    { from: "ciclo-sell",     to: "ciclo-reinvest", label: "→" },
    { from: "ciclo-reinvest", to: "ciclo-build",    label: "∞",          dashed: true },
    // shortcuts
    { from: "ciclo-build",    to: "ciclo-unlock",   label: "sblocca",    dashed: true },
    { from: "ciclo-design",   to: "ciclo-doc",      label: "documenta",  dashed: true },
  ],
};

// ─── NODI BASE (livello 0) ──────────────────────────────────────────────────
const NODES_BASE: MapNode[] = [
  { id: "titanium",  label: "TITANIUM OS", sub: "v6 · ASSOLUTO",      note: "Nucleo centrale — tutto l'ecosistema parte da qui. Stato globale e visione d'insieme.", color: "emerald", x: 50, y: 44, size: "xl", pulse: true },
  { id: "focus",     label: "FOCUS",       sub: "Config G · 65%",      note: "Milestone attiva, next step, focus giornaliero, blockers e pipeline.",                  color: "cyan",    x: 18, y: 15, size: "md", pct: 65, pulse: true, hasChildren: true },
  { id: "ciclo",     label: "CICLO",       sub: "8 fasi ricorsive",     note: "BUILD → DOC → TEACH → SBLOCCA → PROGETTA → PRODUCI → VENDI → REINVESTI.",              color: "emerald", x: 50, y:  7, size: "md", hasChildren: true },
  { id: "pillars",   label: "PILASTRI",    sub: "5 progetti",           note: "Panoramica avanzamento % tutti i progetti. Un colpo d'occhio su tutto.",               color: "indigo",  x: 82, y: 15, size: "md" },
  { id: "mente",     label: "MENTE",       sub: "digest AI",            note: "Scanner → estrae decisioni, spec tecniche, milestone. Memoria del sistema.",           color: "cyan",    x: 13, y: 47, size: "sm" },
  { id: "automazioni", label: "AUTOMAZ.", sub: "13+14 nodi",            note: "GENESIS: 13 automazioni attive + 14 da fare. Python-only, zero cloud.",                color: "amber",   x: 27, y: 63, size: "sm" },
  { id: "docs",      label: "DOCS",        sub: "editor MD",            note: "Editor markdown integrato: leggi, crea, modifica tutti i .md senza uscire.",          color: "amber",   x: 73, y: 63, size: "sm" },
  { id: "content",   label: "CONTENT",     sub: "podcast/video",        note: "Content engine: podcast, video, storytelling del processo costruttivo.",               color: "amber",   x: 87, y: 47, size: "sm" },
  { id: "v32",       label: "V32",         sub: "65% · ATTO II",        note: "Fresatrice CNC titanio. Config G: rinforzi Z+U, Epoxy Granite, mandrino 2.2kW.",       color: "emerald", x:  9, y: 76, size: "md", pct: 65, hasChildren: true },
  { id: "mims",      label: "MIMS",        sub: "30% · pressa",         note: "Connettori modulari: prodotto fisico + ecosistema digitale. VULCAN + FitPark.",        color: "amber",   x: 26, y: 84, size: "md", pct: 30, hasChildren: true },
  { id: "genesis",   label: "GENESIS",     sub: "10% · OS setup",       note: "TITANIUM_OS: automazioni, infrastruttura locale. Il cervello digitale.",               color: "cyan",    x: 50, y: 87, size: "md", pct: 10, hasChildren: true },
  { id: "vitanatura",label: "VITA NATURA", sub: "40% · EVA pilot",      note: "Centro estetico Maria, Boffalora s/T (MI). EVA: AI assistant + WhatsApp bot.",         color: "indigo",  x: 74, y: 84, size: "md", pct: 40, hasChildren: true },
  { id: "identity",  label: "IDENTITY",    sub: "20% · CV+LI",          note: "Brand personale: artigiano digitale + system builder. CV layers navigabili.",          color: "slate",   x: 91, y: 76, size: "md", pct: 20, hasChildren: true },
];

const CONNECTIONS_BASE: Conn[] = [
  // ── TITANIUM OS → tutto ──────────────────────────────────────────────
  { from: "titanium", to: "focus",       label: "stato live" },
  { from: "titanium", to: "ciclo",       label: "processo" },
  { from: "titanium", to: "pillars",     label: "overview" },
  { from: "titanium", to: "v32",         label: "ATTO II" },
  { from: "titanium", to: "mims",        label: "ATTO III" },
  { from: "titanium", to: "genesis",     label: "OS" },
  { from: "titanium", to: "vitanatura",  label: "EVA" },
  { from: "titanium", to: "identity",    label: "brand" },
  // ── GENESIS → strumenti ──────────────────────────────────────────────
  { from: "genesis",  to: "mente",       label: "scanner",      dashed: true },
  { from: "genesis",  to: "automazioni", label: "automaz.",     dashed: true },
  { from: "genesis",  to: "docs",        label: "files",        dashed: true },
  // ── PROGETTI → strumenti ─────────────────────────────────────────────
  { from: "v32",      to: "focus",       label: "milestone",    dashed: true },
  { from: "v32",      to: "mente",       label: "scansiona",    dashed: true },
  { from: "mims",     to: "v32",         label: "produce",      dashed: true },
  // ── CONTENT ──────────────────────────────────────────────────────────
  { from: "titanium", to: "content",     label: "storytelling", dashed: true },
  { from: "identity", to: "content",     label: "brand →",      dashed: true },
  { from: "vitanatura",to:"content",     label: "social",       dashed: true },
  // ── IDENTITY ─────────────────────────────────────────────────────────
  { from: "identity", to: "mims",        label: "builder",      dashed: true },
  // ── VITA NATURA ──────────────────────────────────────────────────────
  { from: "genesis",  to: "vitanatura",  label: "EVA OS",       dashed: true },
];

const L0: StackLevel = {
  nodes: NODES_BASE,
  connections: CONNECTIONS_BASE,
  centerId: "titanium",
  centerLabel: "TITANIUM OS",
  centerColor: "emerald",
};

// ─── PALETTE ───────────────────────────────────────────────────────────────
const C: Record<NodeColor, { border:string;bg:string;glow:string;text:string;dot:string;line:string;badge:string;bar:string }> = {
  emerald: { border:"border-emerald-500/50", bg:"bg-emerald-900/20", glow:"shadow-[0_0_24px_rgba(0,212,126,0.25)]", text:"text-emerald-400", dot:"bg-emerald-400", line:"#00d47e", badge:"bg-emerald-900/50 text-emerald-400 border-emerald-500/40", bar:"bg-emerald-500" },
  cyan:    { border:"border-cyan-500/50",    bg:"bg-cyan-900/20",    glow:"shadow-[0_0_24px_rgba(0,180,216,0.25)]", text:"text-cyan-400",    dot:"bg-cyan-400",    line:"#00b4d8", badge:"bg-cyan-900/50 text-cyan-400 border-cyan-500/40",    bar:"bg-cyan-500"    },
  indigo:  { border:"border-indigo-500/50",  bg:"bg-indigo-900/20",  glow:"shadow-[0_0_24px_rgba(91,95,240,0.25)]", text:"text-indigo-400",  dot:"bg-indigo-400",  line:"#5b5ff0", badge:"bg-indigo-900/50 text-indigo-400 border-indigo-500/40",  bar:"bg-indigo-400"  },
  amber:   { border:"border-amber-500/50",   bg:"bg-amber-900/20",   glow:"shadow-[0_0_24px_rgba(212,150,10,0.25)]",text:"text-amber-400",   dot:"bg-amber-400",   line:"#d4960a", badge:"bg-amber-900/50 text-amber-400 border-amber-500/40",   bar:"bg-amber-500"   },
  slate:   { border:"border-slate-500/40",   bg:"bg-slate-800/30",   glow:"shadow-[0_0_24px_rgba(90,90,114,0.2)]",  text:"text-slate-400",   dot:"bg-slate-500",   line:"#5a5a72", badge:"bg-slate-800/50 text-slate-400 border-slate-500/40",   bar:"bg-slate-500"   },
  rose:    { border:"border-rose-500/50",    bg:"bg-rose-900/20",    glow:"shadow-[0_0_24px_rgba(244,63,94,0.25)]", text:"text-rose-400",    dot:"bg-rose-400",    line:"#f43f5e", badge:"bg-rose-900/50 text-rose-400 border-rose-500/40",    bar:"bg-rose-500"    },
  violet:  { border:"border-violet-500/50",  bg:"bg-violet-900/20",  glow:"shadow-[0_0_24px_rgba(139,92,246,0.25)]",text:"text-violet-400",  dot:"bg-violet-400",  line:"#8b5cf6", badge:"bg-violet-900/50 text-violet-400 border-violet-500/40",  bar:"bg-violet-500"  },
};

// ─── DOCS PANEL ────────────────────────────────────────────────────────────
function DocsPanel() {
  const [tab, setTab] = useState<"md"|"files">("md");
  return (
    <div className="flex flex-col h-full gap-2 min-h-0">
      <div className="flex-shrink-0 flex items-center gap-0.5 border border-slate-800 rounded-lg p-0.5 self-start">
        {(["md","files"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-2 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest transition-all ${
              tab === t ? "bg-amber-900/40 text-amber-400 border border-amber-500/30" : "text-slate-600 hover:text-slate-400"
            }`}>{t === "md" ? ".MD" : "FILES"}</button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === "md" ? <MdManager /> : <FileBrowser />}
      </div>
    </div>
  );
}

// ─── PANEL CONTENT ─────────────────────────────────────────────────────────
function PanelContent({ id, level }: { id: string; level: number }) {
  // Nodi drill figli — panel generico
  if (level > 0) {
    const allChildren = Object.values(DRILL_CHILDREN).flat();
    const node = allChildren.find(n => n.id === id);
    if (node) return (
      <div className="space-y-3 text-[10px] font-mono">
        <div className={`border rounded-xl p-3 ${C[node.color as NodeColor].border} ${C[node.color as NodeColor].bg}`}>
          <div className={`font-bold mb-2 ${C[node.color as NodeColor].text}`}>{node.label}</div>
          <p className="text-slate-400 leading-relaxed text-[9px]">{node.note}</p>
        </div>
        {node.pct !== undefined && (
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${C[node.color as NodeColor].bar}`} style={{ width: `${node.pct}%` }} />
            </div>
            <span className={`font-bold ${C[node.color as NodeColor].text}`}>{node.pct}%</span>
          </div>
        )}
      </div>
    );
  }

  // Pannelli livello 0 — componenti dedicati
  switch (id) {
    case "focus":       return <CellFocus />;
    case "ciclo":       return <CellCiclo />;
    case "pillars":     return <CellPillars />;
    case "v32":         return <CellV32 />;
    case "mente":       return <CellMente />;
    case "automazioni": return <CellAutomazioni />;
    case "docs":        return <DocsPanel />;
    case "content":     return <CellContentEngine />;
    case "genesis":     return (
      <div className="space-y-3">
        <div className="border border-cyan-500/20 rounded-xl p-3 bg-cyan-900/10">
          <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-2">Struttura TITANIUM_OS</div>
          <CellEcoTree />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{v:"13",l:"attive",c:"text-emerald-400"},{v:"14",l:"da fare",c:"text-amber-400"},{v:"7",l:"content",c:"text-cyan-400"}].map(s => (
            <div key={s.l} className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-center">
              <div className={`text-lg font-bold font-mono ${s.c}`}>{s.v}</div>
              <div className="text-[7px] font-mono text-slate-600 uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    );
    case "mims": return (
      <div className="space-y-3 text-[10px] font-mono">
        <div className="border border-amber-500/20 rounded-xl p-3 bg-amber-900/10">
          <div className="text-amber-400 font-bold mb-3">MIMS · Connettori Modulari</div>
          {[
            {l:"Prodotto fisico",v:"Connettori MDF modulari",c:"text-amber-400"},
            {l:"Attuatore",v:"VULCAN — pressa 20t Vevor",c:"text-rose-400"},
            {l:"Applicazione",v:"Fit Park 4.0 — area fitness",c:"text-slate-400"},
            {l:"Brevetto",v:"Formula polimerica proprietaria",c:"text-cyan-400"},
            {l:"Stato",v:"Attende VULCAN pressa",c:"text-rose-400"},
          ].map(r => (
            <div key={r.l} className="flex gap-3 py-1 border-b border-slate-800/40 last:border-0">
              <span className="text-slate-600 w-36 flex-shrink-0">{r.l}</span>
              <span className={r.c}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[8px]">
          <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: "30%" }} />
          </div>
          <span className="text-amber-400 font-bold">30%</span>
        </div>
      </div>
    );
    case "vitanatura": return (
      <div className="space-y-3 text-[10px] font-mono">
        <div className="border border-indigo-500/20 rounded-xl p-3 bg-indigo-900/10">
          <div className="text-indigo-400 font-bold mb-3">VITA NATURA · Centro Estetico</div>
          {[
            {l:"Sede",v:"Boffalora sopra Ticino (MI)",c:"text-slate-400"},
            {l:"Titolare",v:"Maria",c:"text-indigo-400"},
            {l:"AI project",v:"EVA — assistant in sviluppo",c:"text-indigo-400"},
            {l:"Bot",v:"WhatsApp — pilota in corso",c:"text-amber-400"},
          ].map(r => (
            <div key={r.l} className="flex gap-3 py-1 border-b border-slate-800/40 last:border-0">
              <span className="text-slate-600 w-28 flex-shrink-0">{r.l}</span>
              <span className={r.c}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[8px]">
          <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-400 rounded-full" style={{ width: "40%" }} />
          </div>
          <span className="text-indigo-400 font-bold">40%</span>
        </div>
      </div>
    );
    case "identity": return (
      <div className="space-y-3 text-[10px] font-mono">
        <div className="border border-slate-600/30 rounded-xl p-3 bg-slate-800/20">
          <div className="text-slate-300 font-bold mb-3">IDENTITY · Brand Personale</div>
          {[
            {l:"Ruolo",v:"Artigiano digitale + system builder",c:"text-slate-300"},
            {l:"Esperienza",v:"15+ anni industria manifatturiera",c:"text-slate-400"},
            {l:"MotoGP",v:"SCProject — TIG/MIG titanio",c:"text-emerald-400"},
            {l:"CV layers",v:"Navigabile in SINAPSI",c:"text-cyan-400"},
          ].map(r => (
            <div key={r.l} className="flex gap-3 py-1 border-b border-slate-800/40 last:border-0">
              <span className="text-slate-600 w-24 flex-shrink-0">{r.l}</span>
              <span className={r.c}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    );
    case "titanium": return (
      <div className="space-y-3">
        <div className="border border-emerald-500/20 rounded-xl p-3 bg-emerald-900/10">
          <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-3">Stato sistema</div>
          {PILLARS_DATA.map(p => (
            <div key={p.label} className="mb-2.5 last:mb-0">
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-slate-300">{p.label}</span>
                <span className={`font-bold ${p.bar}`}>{p.pct}%</span>
              </div>
              <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${p.bar}`} style={{ width: `${p.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="border border-slate-800 rounded-xl overflow-hidden" style={{ height: 240 }}>
          <div className="text-[7px] font-mono text-slate-700 px-3 py-1.5 border-b border-slate-800 uppercase tracking-widest">Neuro Map</div>
          <div className="h-full overflow-hidden"><NeuroMapView /></div>
        </div>
      </div>
    );
    default: return <div className="text-[9px] font-mono text-slate-600 p-4">Nessun contenuto.</div>;
  }
}

// ─── STATUS STRIP ──────────────────────────────────────────────────────────
function StatusStrip({ state }: { state: Record<string, any> | null }) {
  return (
    <div className="flex-shrink-0 h-8 border-b border-slate-800/60 bg-slate-900/30 px-4 flex items-center gap-3 overflow-hidden">
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${state ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
      <span className="text-[8px] font-mono text-cyan-400 truncate">{state?.active_milestone || "—"}</span>
      <div className="w-px h-3 bg-slate-800 flex-shrink-0" />
      <span className="text-[8px] font-mono text-slate-500 truncate flex-1">▸ {state?.next_step || "—"}</span>
      {state?.blockers?.length > 0 && (
        <span className="text-[8px] font-mono text-rose-400 flex-shrink-0">⚠ {state!.blockers[0]}</span>
      )}
    </div>
  );
}

// ─── NEURO NODE ────────────────────────────────────────────────────────────
function NeuroNode({ node, isActive, isHovered, onClick, onEnter, onLeave, level: _level, delay = 0 }: {
  node: MapNode; isActive: boolean; isHovered: boolean;
  onClick: () => void; onEnter: () => void; onLeave: () => void;
  level: number; delay?: number;
}) {
  const colors = C[node.color] ?? C.slate;
  const W = node.size === "xl" ? 128 : node.size === "lg" ? 112 : node.size === "md" ? 96 : 80;
  const H = node.size === "xl" ? 80  : node.size === "lg" ? 70  : node.size === "md" ? 64 : 52;
  const canDrill = !!(node.hasChildren && DRILL_CHILDREN[node.id]?.length);

  return (
    <div
      className={`absolute select-none rounded-xl border px-2.5 py-2 transition-colors duration-200
        ${colors.border} ${colors.bg}
        ${isActive || isHovered ? colors.glow : ""}
        ${isActive ? "z-20" : "z-10"}
        ${canDrill ? "cursor-zoom-in" : "cursor-pointer"}
      `}
      style={{
        left: `${node.x}%`, top: `${node.y}%`,
        width: W, height: H,
        transform: `translate(-50%, -50%)${isActive ? " scale(1.1)" : isHovered ? " scale(1.05)" : ""}`,
        transition: "transform 0.18s ease, box-shadow 0.2s ease",
        animation: `nl-nodeIn 0.48s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Status dot */}
      <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} mb-1.5 ${node.pulse ? "animate-pulse" : ""}`} />
      {/* Label */}
      <div className={`font-bold font-mono uppercase leading-none tracking-wide ${colors.text} ${node.size === "xl" ? "text-[11px]" : node.size === "md" ? "text-[9px]" : "text-[8px]"}`}>
        {node.label}
        {canDrill && <span className="ml-1 opacity-50 text-[7px]">▶</span>}
      </div>
      {/* Sub */}
      <div className={`font-mono text-slate-500 mt-0.5 leading-none ${node.size === "xl" ? "text-[9px]" : "text-[7px]"}`}>{node.sub}</div>
      {/* Progress bar */}
      {node.pct !== undefined && (
        <div className="mt-1.5 h-0.5 bg-slate-800/80 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${node.pct}%` }} />
        </div>
      )}
      {/* Active dot */}
      {isActive && <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${colors.dot} border border-slate-950`} />}
      {/* Tooltip */}
      {isHovered && !isActive && (
        <div className={`absolute bottom-full left-1/2 mb-2 px-2.5 py-2 rounded-xl border text-[8px] font-mono leading-snug z-50 pointer-events-none whitespace-normal ${colors.badge} shadow-xl`}
          style={{ transform: "translateX(-50%)", width: 200 }}>
          {canDrill && <div className="text-[7px] opacity-60 mb-1 uppercase tracking-widest">▶ clicca per entrare</div>}
          {!canDrill && <div className="text-[7px] uppercase tracking-widest opacity-60 mb-1">cosa è:</div>}
          {node.note}
        </div>
      )}
    </div>
  );
}

// ─── NEURO OS LAYOUT ────────────────────────────────────────────────────────
export function NeuroOSLayout() {
  const [stack,       setStack]       = useState<StackLevel[]>([L0]);
  const [activeNode,  setActiveNode]  = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [liveState,   setLiveState]   = useState<Record<string, any> | null>(null);
  const [mapSize,     setMapSize]     = useState({ w: 1000, h: 580 });
  const [showNote,    setShowNote]    = useState(false);
  const [animKey,     setAnimKey]     = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoomNode,    setZoomNode]    = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const current = stack[stack.length - 1];
  const level   = stack.length - 1;

  // ── Live state ──
  useEffect(() => {
    const load = () => fetch("/api/state").then(r => r.json()).then(setLiveState).catch(() => {});
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  // ── Misura container ──
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setMapSize({ w: width, h: height });
    });
    obs.observe(el);
    setMapSize({ w: el.clientWidth, h: el.clientHeight });
    return () => obs.disconnect();
  }, []);

  const nodeById = useCallback((id: string) =>
    current.nodes.find(n => n.id === id) ??
    NODES_BASE.find(n => n.id === id), [current.nodes]);

  const px = (node: MapNode) => ({
    x: (node.x / 100) * mapSize.w,
    y: (node.y / 100) * mapSize.h,
  });

  // ── Drill in ──
  const drillInto = (nodeId: string) => {
    const children = DRILL_CHILDREN[nodeId];
    if (!children?.length || isTransitioning) return;
    const parentNode = nodeById(nodeId);
    if (!parentNode) return;

    // Burst zoom dal nodo cliccato
    setZoomNode(nodeId);
    setTimeout(() => setZoomNode(null), 420);

    setIsTransitioning(true);
    setActiveNode(null);

    setTimeout(() => {
      const childNodes = radialLayout(children, nodeId);
      const centerNode: MapNode = { ...parentNode, x: 50, y: 50, size: "xl", pulse: true };
      const newNodes = [centerNode, ...childNodes];
      // Connessioni: parent→figli + cross-connections neurali
      const newConns = [
        ...radialConnections(nodeId, children),
        ...(DRILL_CROSS_CONNS[nodeId] ?? []),
      ];

      setStack(prev => [...prev, {
        nodes: newNodes,
        connections: newConns,
        centerId: nodeId,
        centerLabel: parentNode.label,
        centerColor: parentNode.color,
      }]);
      setAnimKey(k => k + 1);
      setIsTransitioning(false);
    }, 280);
  };

  // ── Drill back ──
  const drillBack = (targetIdx?: number) => {
    if (stack.length <= 1) return;
    setIsTransitioning(true);
    setActiveNode(null);
    setTimeout(() => {
      setStack(prev => targetIdx !== undefined ? prev.slice(0, targetIdx + 1) : prev.slice(0, -1));
      setAnimKey(k => k + 1);
      setIsTransitioning(false);
    }, 200);
  };

  // ── Click nodo ──
  const handleNodeClick = (id: string) => {
    // Nodo centrale in drill-mode → vai su
    if (level > 0 && id === current.centerId) { drillBack(); return; }
    // Nodo con figli → drill in
    if (DRILL_CHILDREN[id]?.length) { drillInto(id); return; }
    // Pannello slide
    setActiveNode(prev => {
      if (prev !== id) setShowNote(false);
      return prev === id ? null : id;
    });
  };

  const activeNodeData = activeNode ? nodeById(activeNode) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Keyframes immersivi ── */}
      <style>{`
        @keyframes nl-nodeIn {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.28); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes nl-pulse-ring {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.22; }
        }
        @keyframes nl-drill-zoom {
          from { opacity: 0.55; transform: translate(-50%,-50%) scale(1); }
          to   { opacity: 0;    transform: translate(-50%,-50%) scale(4.5); }
        }
        @keyframes nl-fadeUp {
          from { opacity: 0; transform: translateY(7px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>

      <StatusStrip state={liveState} />

      {/* ── Breadcrumb drill ── */}
      {level > 0 && (
        <div className="flex-shrink-0 flex items-center gap-1 px-4 py-1.5 border-b border-slate-800/50 bg-slate-900/20">
          <button onClick={() => drillBack(0)}
            className="text-[9px] font-mono text-slate-600 hover:text-slate-300 transition-colors flex items-center gap-1">
            <ChevronLeft size={10} /> ROOT
          </button>
          {stack.slice(1).map((entry, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-slate-700 text-[9px]">/</span>
              <button onClick={() => drillBack(idx + 1)}
                className="text-[9px] font-mono transition-colors"
                style={{ color: idx === stack.length - 2 ? C[entry.centerColor]?.line : "#475569", fontWeight: idx === stack.length - 2 ? 700 : 400 }}>
                {entry.centerLabel}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── AREA PRINCIPALE ── */}
      <div className="flex-1 relative overflow-hidden">
        {/* ── MAPPA ── */}
        <div
          ref={mapRef}
          key={animKey}
          className="absolute inset-0"
          style={{
            right: activeNode ? 432 : 0,
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "scale(0.97) translateY(4px)" : "scale(1) translateY(0)",
            transition: "right 0.3s ease, opacity 0.22s ease, transform 0.22s ease",
            animation: `nl-fadeUp 0.3s ease both`,
            // Dot grid background
            backgroundImage: "radial-gradient(circle, #1e293b 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundColor: "#020617",
          }}
        >
          {/* Radial glow dal colore del nodo centrale */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 55% 40% at 50% 50%, ${C[current.centerColor]?.line ?? "#10b981"}${level > 0 ? "0d" : "06"} 0%, transparent 70%)`,
            }}
          />

          {/* Level watermark */}
          {level > 0 && (
            <div className="absolute pointer-events-none select-none font-mono font-black"
              style={{
                fontSize: 130, lineHeight: 1,
                left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                color: (C[current.centerColor]?.line ?? "#10b981") + "07",
                zIndex: 0,
              }}>
              L{level}
            </div>
          )}

          {/* SVG: pulse rings + connessioni + drillZoom burst */}
          <svg className="absolute inset-0 pointer-events-none" width={mapSize.w} height={mapSize.h} style={{ overflow: "visible", zIndex: 1 }}>
            <defs>
              <marker id="arrow-solid2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.15)" />
              </marker>
              <marker id="arrow-dashed2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L0,5 L5,2.5 z" fill="rgba(255,255,255,0.08)" />
              </marker>
            </defs>

            {/* ── Pulse rings per nodi attivi ── */}
            {current.nodes.filter(n => n.pulse).map(n => {
              const pos = px(n);
              const r = n.size === "xl" ? 72 : n.size === "md" ? 58 : 44;
              const color = C[n.color]?.line ?? "#10b981";
              return (
                <circle key={`pr-${n.id}`}
                  cx={pos.x} cy={pos.y} r={r}
                  fill="none" stroke={color} strokeWidth="1.5"
                  style={{ animation: "nl-pulse-ring 2.6s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" }}
                />
              );
            })}

            {/* ── drillZoom burst ── */}
            {zoomNode && (() => {
              const n = nodeById(zoomNode);
              if (!n) return null;
              const pos = px(n);
              const color = C[n.color]?.line ?? "#10b981";
              return (
                <circle key={`dz-${zoomNode}`}
                  cx={pos.x} cy={pos.y} r={50}
                  fill={color} fillOpacity="0.08"
                  stroke={color} strokeWidth="1"
                  style={{ animation: "nl-drill-zoom 0.42s ease-out forwards" }}
                />
              );
            })()}

            {current.connections.map((conn) => {
              const fromNode = nodeById(conn.from);
              const toNode   = nodeById(conn.to);
              if (!fromNode || !toNode) return null;

              const fp = px(fromNode), tp = px(toNode);
              const mx = (fp.x + tp.x) / 2, my = (fp.y + tp.y) / 2;
              const dx = tp.x - fp.x, dy = tp.y - fp.y;
              const len = Math.sqrt(dx*dx + dy*dy) || 1;
              const offset = len * 0.08;
              const cpx = mx + (-dy/len)*offset, cpy = my + (dx/len)*offset;
              const color = C[fromNode.color]?.line ?? "#334155";
              const isAct = conn.from === activeNode || conn.to === activeNode || conn.from === hoveredNode || conn.to === hoveredNode;

              return (
                <g key={`${conn.from}-${conn.to}`}>
                  <path
                    d={`M ${fp.x} ${fp.y} Q ${cpx} ${cpy} ${tp.x} ${tp.y}`}
                    stroke={color}
                    strokeWidth={conn.dashed ? 1 : 1.5}
                    fill="none"
                    opacity={isAct ? (conn.dashed ? 0.4 : 0.55) : (conn.dashed ? 0.12 : 0.22)}
                    strokeDasharray={conn.dashed ? "5,4" : undefined}
                    markerEnd={conn.dashed ? "url(#arrow-dashed2)" : "url(#arrow-solid2)"}
                    style={{ transition: "opacity 0.25s" }}
                  />
                  {conn.label && (
                    <text x={cpx} y={cpy - 4} textAnchor="middle" fill={color} fontSize="7"
                      opacity={isAct ? 0.6 : 0} fontFamily="'JetBrains Mono', monospace" fontWeight="500"
                      style={{ transition: "opacity 0.25s" }}>
                      {conn.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodi HTML */}
          {current.nodes.map((node, idx) => (
            <NeuroNode
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              isHovered={hoveredNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              onEnter={() => setHoveredNode(node.id)}
              onLeave={() => setHoveredNode(null)}
              level={level}
              delay={idx * 42}
            />
          ))}

          {/* Hint */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-30 hover:opacity-70 transition-opacity">
            <RotateCcw size={9} className="text-slate-600" />
            <span className="text-[7px] font-mono text-slate-600 uppercase tracking-widest">
              {level > 0 ? "click centro → su · " : ""}▶ = espandibile
            </span>
          </div>
        </div>

        {/* ── SLIDE PANEL ── */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[432px] border-l border-slate-800/70 bg-slate-950 flex flex-col transition-transform duration-300 ease-in-out"
          style={{ transform: activeNode ? "translateX(0)" : "translateX(100%)" }}
        >
          {activeNodeData && (
            <>
              <div className="flex-shrink-0 border-b border-slate-800/60 p-4 relative">
                {/* Accent line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
                  activeNodeData.color === "emerald" ? "via-emerald-500/40" :
                  activeNodeData.color === "cyan"    ? "via-cyan-500/40" :
                  activeNodeData.color === "indigo"  ? "via-indigo-500/40" :
                  activeNodeData.color === "amber"   ? "via-amber-500/40" :
                  activeNodeData.color === "rose"    ? "via-rose-500/40" :
                  activeNodeData.color === "violet"  ? "via-violet-500/40" :
                  "via-slate-500/40"} to-transparent`} />

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className={`inline-flex items-center gap-1.5 text-[7px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border mb-2 ${C[activeNodeData.color]?.badge}`}>
                      <div className={`w-1 h-1 rounded-full ${C[activeNodeData.color]?.dot} animate-pulse`} />
                      {activeNodeData.sub}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-bold font-mono uppercase tracking-widest ${C[activeNodeData.color]?.text}`}>
                        {activeNodeData.label}
                      </div>
                      <button onClick={() => setShowNote(v => !v)}
                        className={`text-[8px] font-mono px-1.5 py-0.5 rounded border transition-all ${showNote ? `${C[activeNodeData.color]?.badge} opacity-80` : "border-slate-800 text-slate-700 hover:text-slate-500"}`}>
                        ℹ
                      </button>
                    </div>
                    {showNote && (
                      <div className="text-[8px] font-mono text-slate-500 mt-2 bg-slate-900/60 border border-slate-800/60 rounded-lg px-2.5 py-1.5 leading-relaxed">
                        {activeNodeData.note}
                      </div>
                    )}
                  </div>
                  <button onClick={() => setActiveNode(null)} className="flex-shrink-0 p-1.5 hover:bg-slate-800 rounded-lg transition-colors mt-0.5">
                    <X size={13} className="text-slate-500" />
                  </button>
                </div>

                {activeNodeData.pct !== undefined && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${C[activeNodeData.color]?.bar}`} style={{ width: `${activeNodeData.pct}%` }} />
                    </div>
                    <span className={`text-[9px] font-bold font-mono ${C[activeNodeData.color]?.text}`}>{activeNodeData.pct}%</span>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin min-h-0">
                <PanelContent id={activeNode!} level={level} />
              </div>

              <div className="flex-shrink-0 border-t border-slate-800/60 px-4 py-2 flex items-center gap-2">
                <span className="text-[7px] font-mono text-slate-700 uppercase tracking-widest flex-shrink-0">connesso a:</span>
                <div className="flex flex-wrap gap-1.5">
                  {current.connections
                    .filter(c => c.from === activeNode || c.to === activeNode)
                    .map(c => {
                      const otherId = c.from === activeNode ? c.to : c.from;
                      const other = nodeById(otherId);
                      if (!other) return null;
                      return (
                        <button key={otherId} onClick={() => setActiveNode(otherId)}
                          className={`text-[7px] font-mono px-1.5 py-0.5 rounded border transition-all hover:scale-105 ${C[other.color]?.badge}`}>
                          {other.label}
                        </button>
                      );
                    })
                  }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
