// bussolaTodos.ts | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-07
// La BUSSOLA (DA_FARE_FATTO.md) innestata nella vista CRITICHE come ramo.
// La scaletta condivisa io<->Matteo (da fare / fatto) vive accanto alla cartella
// clinica di sistema: GET /api/bussola/todos (rigenerato dal night_audit).

import { type SkillNode, type SkillStatus } from "./skillTreeData";

export interface BussolaTodo {
  id: string;
  stato: string;       // fatto | in_corso | da_fare | non_fatto | idea
  testo: string;
  sessione?: string;
}

const pink   = { color: "text-pink-400",   border: "border-pink-500/40",   bg: "bg-pink-950/20",   dot: "bg-pink-400"   };
const rose   = { color: "text-rose-400",   border: "border-rose-500/40",   bg: "bg-rose-950/20",   dot: "bg-rose-400"   };
const amber  = { color: "text-amber-400",  border: "border-amber-500/40",  bg: "bg-amber-950/20",  dot: "bg-amber-400"  };
const slate  = { color: "text-slate-400",  border: "border-slate-600/30",  bg: "bg-slate-800/20",  dot: "bg-slate-500"  };
const violet = { color: "text-violet-400", border: "border-violet-500/40", bg: "bg-violet-950/20", dot: "bg-violet-400" };

// stato bussola -> stato SkillNode (active = da fare, done = fatto, ecc.)
const STATO_MAP: Record<string, { status: SkillStatus; icon: string; style: typeof pink }> = {
  da_fare:   { status: "active",  icon: "☐", style: rose   },
  in_corso:  { status: "active",  icon: "◐", style: amber  },
  non_fatto: { status: "blocked", icon: "✗", style: slate  },
  idea:      { status: "future",  icon: "💡", style: violet },
  fatto:     { status: "done",    icon: "✓", style: slate  },
};

const GROUP_ORDER: Array<{ key: string; label: string; style: typeof pink }> = [
  { key: "da_fare",   label: "DA FARE",   style: rose   },
  { key: "in_corso",  label: "IN CORSO",  style: amber  },
  { key: "non_fatto", label: "NON FATTO", style: slate  },
  { key: "idea",      label: "IDEE",      style: violet },
  { key: "fatto",     label: "FATTO",     style: slate  },
];

function shortLabel(t: string): string {
  const first = (t || "").split(/[.\n]/)[0].trim();
  return first.length > 64 ? first.slice(0, 64) + "…" : first;
}

/**
 * Costruisce il ramo "Bussola" raggruppando i todo per stato.
 * Ritorna null se non ci sono todo (il chiamante non innesta nulla).
 */
export function buildBussolaBranch(todos: BussolaTodo[]): SkillNode | null {
  if (!todos || todos.length === 0) return null;

  const groups: SkillNode[] = [];
  for (const g of GROUP_ORDER) {
    const items = todos.filter(t => t.stato === g.key);
    if (items.length === 0) continue;
    const leaves: SkillNode[] = items.map(t => {
      const m = STATO_MAP[t.stato] ?? STATO_MAP.da_fare;
      return {
        id: `bus_${t.id}`,
        label: shortLabel(t.testo),
        icon: m.icon,
        status: m.status,
        note: `${t.testo}${t.sessione ? `\n— ${t.sessione}` : ""}`,
        isLeaf: true,
        ...m.style,
      };
    });
    groups.push({
      id: `bus_grp_${g.key}`,
      label: g.label,
      icon: STATO_MAP[g.key]?.icon ?? "•",
      status: g.key === "da_fare" || g.key === "in_corso" ? "active" : "done",
      note: `${items.length} voci`,
      ...g.style,
      children: leaves,
    });
  }

  const open = todos.filter(t => ["da_fare", "in_corso", "non_fatto"].includes(t.stato)).length;
  return {
    id: "cr_bussola",
    label: "Bussola — la scaletta",
    icon: "📋",
    status: open > 0 ? "active" : "done",
    note: "DA FARE / FATTO condiviso io↔Matteo (DA_FARE_FATTO.md). Rigenerato ogni " +
          "notte dal night_audit: la nostra rotta accanto alla cartella clinica.",
    ...pink,
    children: groups,
  };
}
