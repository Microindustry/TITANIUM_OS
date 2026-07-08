// mappaData.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-07-08
// FONTE UNICA della mappa-sistema (fix au18/gc04 "verità sparsa").
// I rami V32 / GENESIS / MIMS sono DERIVATI dagli alberi N-livelli
// (skillTreeData / genesisData / mimsData): la struttura non è più copiata a mano
// — aggiorni il data file e la Mappa segue da sola.
// Le % dei sotto-nodi sono COMPUTATE dalle foglie (nodeProgress), non dichiarate;
// le % dei 5 pilastri restano live da STATE.json (override in MappaView via systemState).
// VITA_NATURA e IDENTITY non hanno (ancora) un albero N-livelli: il loro ramo
// vive SOLO qui — se nasce il data file, si deriva come gli altri.

import { SKILL_ROOT, nodeProgress, type SkillNode } from "./skillTreeData";
import { GENESIS_ROOT } from "./genesisData";
import { MIMS_ROOT } from "./mimsData";

// ── TIPI ─────────────────────────────────────────────────────────────────────
export type NodeStatus = "active" | "building" | "pending" | "future";

export interface MapNode {
  id: string; label: string; type: "root" | "pillar" | "node" | "leaf";
  status: NodeStatus; pillar: string; desc: string; pct?: number;
  hasChildren?: boolean; children?: MapNode[]; isLeaf?: boolean;
}

// ── ADAPTER SkillNode → MapNode ──────────────────────────────────────────────
// SkillStatus (alberi N-livelli) → NodeStatus (mappa radiale):
// done=operativo(verde) · active=in lavorazione(ambra) · blocked=in attesa · future
const STATUS_MAP: Record<SkillNode["status"], NodeStatus> = {
  done: "active", active: "building", blocked: "pending", future: "future",
};

function fromSkill(n: SkillNode, pillar: string): MapNode {
  const kids = (n.children ?? []).map(c => fromSkill(c, pillar));
  if (!kids.length) {
    return {
      id: n.id, label: n.label, type: "leaf", status: STATUS_MAP[n.status], pillar,
      desc: n.note ? `${n.label} — ${n.note}` : n.label,
      pct: n.status === "done" ? 100 : undefined, isLeaf: true,
    };
  }
  const p = nodeProgress(n);
  return {
    id: n.id, label: n.label, type: "node", status: STATUS_MAP[n.status], pillar,
    desc: `${n.note ?? n.label} · ${p.done}/${p.total} voci fatte`,
    pct: p.pct, hasChildren: true, children: kids,
  };
}

// Nodo-pilastro: id/label/desc curati (DATI MASTER), figli derivati dalla fonte.
// pct = fallback computato dalle foglie; a runtime MappaView lo sovrascrive
// col pct_complete live di STATE.json (che resta la fonte unica delle %).
function pillarFrom(id: string, label: string, desc: string, src: SkillNode): MapNode {
  const p = nodeProgress(src);
  return {
    id, label, type: "pillar", status: "active", pillar: id,
    desc: `${desc} · ${p.done}/${p.total} voci fatte`,
    pct: p.pct, hasChildren: true,
    children: (src.children ?? []).map(c => fromSkill(c, id)),
  };
}

const V32_SRC = SKILL_ROOT.children?.find(n => n.id === "v32") ?? SKILL_ROOT;

// ── RADICE ───────────────────────────────────────────────────────────────────
// Niente pct dichiarato: MappaView lo computa live come media dei pilastri.
export const ROOT_NODE: MapNode = {
  id: "OS", label: "TITANIUM OS", type: "root", status: "active",
  pillar: "ROOT", desc: "Sistema operativo cognitivo di Matteo Benenati. V32+MIMS+GENESIS+VITA NATURA+IDENTITY.",
};

// ── ALBERO SISTEMA ───────────────────────────────────────────────────────────
export const SYSTEM_TREE: MapNode[] = [
  pillarFrom("V32", "V32 CNC",
    "Fresatrice 3 assi · 178kg corpo unico · ±0.019mm · Config G", V32_SRC),
  pillarFrom("MIMS", "MIMS",
    "Micro-Industry Modular System · DNA 29.9mm · 3 giunti · 7 materiali · TAM €4.2B", MIMS_ROOT),
  pillarFrom("GENESIS", "GENESIS",
    "OS digitale · API Flask · Dashboard React 19 · RAG hybrid · MCP · n8n", GENESIS_ROOT),
  {
    id: "VITA_NATURA", label: "VITA NATURA", type: "pillar", status: "active", pillar: "VITA_NATURA",
    desc: "Centro estetico Maria · Boffalora s/T (MI) · EVA WhatsApp bot · Google integrations", pct: 40, hasChildren: true,
    children: [
      { id:"vn-eva",      label:"EVA BOT",  type:"leaf", status:"building",  pillar:"VITA_NATURA", pct:40,  desc:"Pilot v0.3 reale (NODES/EVA) · prenotazione multi-turno + inbox handoff · manca token WhatsApp + agenda · Maria Rule", isLeaf:true },
      { id:"vn-calendar", label:"CALENDAR", type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Google Calendar MCP · legge/crea eventi · integrato in Claude Code", isLeaf:true },
      { id:"vn-gmail",    label:"GMAIL",    type:"leaf", status:"active",   pillar:"VITA_NATURA", pct:100, desc:"Gmail MCP · search, draft, labels · benenatimatteo.mb@gmail.com live", isLeaf:true },
      { id:"vn-sito",     label:"SITO WEB", type:"leaf", status:"pending",  pillar:"VITA_NATURA", pct:20,  desc:"Sito centro estetico · prenotazioni online · SEO locale · in sviluppo", isLeaf:true },
    ],
  },
  {
    id: "IDENTITY", label: "IDENTITY", type: "pillar", status: "active", pillar: "IDENTITY",
    desc: "Brand personale · artigiano digitale + system builder · 15+ anni industria", pct: 50, hasChildren: true,
    children: [
      { id:"id-skills",  label:"SKILL TREE", type:"leaf", status:"active",   pillar:"IDENTITY", pct:60, desc:"N-livelli: Fondamenta (done) → V32 (active) → GENESIS → MIMS → Content → ADHD", isLeaf:true },
      { id:"id-cv",      label:"CV LAYERS",  type:"leaf", status:"active",   pillar:"IDENTITY", pct:80, desc:"SCProject MotoGP → ESSEGI robot → DATWLER presse → LU.VE QC · proof reali", isLeaf:true },
      { id:"id-github",  label:"GITHUB",     type:"leaf", status:"building", pillar:"IDENTITY", pct:45, desc:"Profilo Microindustry · repo TITANIUM_OS · release history · AI skills", isLeaf:true },
      { id:"id-content", label:"CONTENT",    type:"leaf", status:"pending",  pillar:"IDENTITY", pct:10, desc:"Podcast + reel + LinkedIn · AVA avatar YouTube · storytelling industriale", isLeaf:true },
      { id:"id-pitch",   label:"PITCH",      type:"leaf", status:"active",   pillar:"IDENTITY", pct:40, desc:"Partner software Microindustry go-to-market · Matteo = metodo+IP, partner = scala", isLeaf:true },
    ],
  },
];
