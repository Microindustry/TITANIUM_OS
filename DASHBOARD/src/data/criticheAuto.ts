// criticheAuto.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-06
// Cartella clinica viva (P1b): trasforma i findings del self-audit notturno
// (DATA/audit/critiche_auto.json via GET /api/critiche/auto) in un ramo
// SkillNode da innestare nell'albero Critiche, accanto al canone manuale.
// Le critiche crescono DA SOLE: non si scrivono piu' solo a mano.

import { type SkillNode, type SkillStatus } from "./skillTreeData";

export interface AutoFinding {
  id: string;
  date?: string;
  git?: string;
  area?: string;
  severity?: string;       // alta | media | bassa
  finding: string;
  azione?: string;
  fonte?: string;
  status?: string;         // open | closed | resolved
  last_seen?: string;
}

const rose    = { color: "text-rose-400",    border: "border-rose-500/40",    bg: "bg-rose-950/20",    dot: "bg-rose-400"    };
const amber   = { color: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-950/20",   dot: "bg-amber-400"   };
const cyan    = { color: "text-cyan-400",    border: "border-cyan-500/40",    bg: "bg-cyan-950/20",    dot: "bg-cyan-400"    };
const violet  = { color: "text-violet-400",  border: "border-violet-500/40",  bg: "bg-violet-950/20",  dot: "bg-violet-400"  };
const slate   = { color: "text-slate-400",   border: "border-slate-600/30",   bg: "bg-slate-800/20",   dot: "bg-slate-500"   };

const AREA_STYLE: Record<string, typeof rose> = {
  V32: amber, GENESIS: cyan, MIMS: violet, VITA_NATURA: violet,
  IDENTITY: slate, SISTEMA: rose,
};
const AREA_ICON: Record<string, string> = {
  V32: "🔩", GENESIS: "⬡", MIMS: "⬡", VITA_NATURA: "🌿", IDENTITY: "🧭", SISTEMA: "⚙",
};

function sevIcon(sev?: string): string {
  switch ((sev || "").toLowerCase()) {
    case "alta": case "critica": case "high": return "🔴";
    case "media": case "medium":              return "🟠";
    case "bassa": case "low":                 return "🟡";
    default:                                   return "🔬";
  }
}

// open -> active (da fare), tutto il resto -> done (risolto/chiuso)
function toStatus(s?: string): SkillStatus {
  return (s || "open").toLowerCase() === "open" ? "active" : "done";
}

function shortLabel(finding: string): string {
  const first = (finding || "").split(/[.\n]/)[0].trim();
  return first.length > 72 ? first.slice(0, 72) + "…" : first;
}

/**
 * Costruisce il ramo "Auto-audit notturno" raggruppando i findings per area.
 * Ritorna null se non ci sono findings (cosi' il chiamante non innesta nulla).
 */
export function buildAutoBranch(findings: AutoFinding[]): SkillNode | null {
  if (!findings || findings.length === 0) return null;

  const byArea = new Map<string, AutoFinding[]>();
  for (const f of findings) {
    const area = (f.area || "SISTEMA").toUpperCase();
    if (!byArea.has(area)) byArea.set(area, []);
    byArea.get(area)!.push(f);
  }

  const groups: SkillNode[] = [];
  for (const [area, items] of byArea) {
    const style = AREA_STYLE[area] ?? rose;
    const leaves: SkillNode[] = items.map(f => ({
      id: `auto_${f.id}`,
      label: shortLabel(f.finding),
      icon: sevIcon(f.severity),
      status: toStatus(f.status),
      note: [
        f.finding,
        f.azione ? `\n▸ AZIONE: ${f.azione}` : "",
        `\n${f.severity ?? "?"} · ${f.area ?? area} · ${f.date ?? "?"}${f.git ? " · " + f.git : ""}${f.fonte ? " · " + f.fonte : ""}`,
      ].join(""),
      isLeaf: true,
      ...(toStatus(f.status) === "done" ? slate : style),
    }));
    const openN = items.filter(f => toStatus(f.status) === "active").length;
    groups.push({
      id: `cr_auto_${area}`,
      label: area,
      icon: AREA_ICON[area] ?? "🔬",
      status: openN > 0 ? "active" : "done",
      note: `${items.length} findings · ${openN} aperti`,
      ...style,
      children: leaves,
    });
  }

  const totalOpen = findings.filter(f => toStatus(f.status) === "active").length;
  return {
    id: "cr_auto",
    label: "Auto-audit notturno",
    icon: "🔬",
    status: totalOpen > 0 ? "active" : "done",
    note: "Cartella clinica viva — generata ogni notte dal self-audit (Sonnet). " +
          "Cresce da sola: non si scrive a mano. Diagnostica che accende la lampadina.",
    ...rose,
    children: groups,
  };
}
