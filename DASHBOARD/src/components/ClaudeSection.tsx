// ClaudeSection.tsx | TITANIUM_OS / DASHBOARD / components | v1.0 | 2026-05-29
// CV capacità Claude — albero navigabile 3 livelli, verificato in sessioni TITANIUM_OS

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { CLAUDE_TREE, DOMAIN_COLORS, type CNode } from "../data/claudeData";

function TreeNode({ node, depth = 0 }: { node: CNode; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasKids = (node.children?.length ?? 0) > 0;
  const accent = depth === 0 ? (DOMAIN_COLORS[node.id] ?? "#94a3b8") : "#64748b";

  return (
    <div className={depth === 0 ? "border border-slate-800 rounded-xl overflow-hidden mb-1.5" : ""}>
      <button
        onClick={() => hasKids && setOpen(o => !o)}
        className={`w-full flex items-center gap-2 text-left transition-colors
          ${depth === 0 ? "px-4 py-3 hover:bg-slate-800/50" : "px-3 py-2 hover:bg-slate-800/30 rounded-lg"}
          ${!hasKids ? "cursor-default" : "cursor-pointer"}
        `}
        style={{ paddingLeft: depth > 0 ? `${depth * 16 + 12}px` : undefined, minHeight: 36 }}
      >
        {hasKids
          ? <ChevronRight
              size={depth === 0 ? 12 : 10}
              className={`flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
              style={{ color: depth === 0 ? accent : "#475569" }}
            />
          : <span className="flex-shrink-0 text-slate-700 w-3" style={{ fontSize: 5 }}>▸</span>
        }
        <span
          className={`flex-1 leading-tight ${
            depth === 0 ? "text-xs font-bold uppercase tracking-wider" :
            depth === 1 ? "text-xs font-semibold text-slate-200" :
            "text-[11px] text-slate-400"
          }`}
          style={depth === 0 ? { color: accent } : {}}
        >
          {node.label}
        </span>
        {node.badge && (
          <span
            className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 ml-1"
            style={{
              color:      node.badge === "DEV" ? "#f59e0b" : node.badge === "PUBLIC" ? "#22d3ee" : "#34d399",
              background: node.badge === "DEV" ? "#f59e0b18" : node.badge === "PUBLIC" ? "#22d3ee18" : "#34d39918",
            }}
          >
            {node.badge}
          </span>
        )}
      </button>

      {!hasKids && node.note && (
        <p
          className="text-[10px] text-slate-600 leading-snug pb-1"
          style={{ paddingLeft: `${depth * 16 + 28}px` }}
        >
          {node.note}
        </p>
      )}

      {open && hasKids && (
        <div className={depth === 0 ? "border-t border-slate-800/60 pb-1" : ""}>
          {depth === 0 && node.note && (
            <p className="text-[10px] text-slate-600 leading-snug py-1.5 px-4">{node.note}</p>
          )}
          {node.children!.map(c => <TreeNode key={c.id} node={c} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}

export function ClaudeSection() {
  return (
    <div>
      <p className="text-[10px] font-mono text-slate-600 mb-3">
        Capacita verificate nelle sessioni TITANIUM_OS — non marketing, solo dimostrato.
      </p>
      {CLAUDE_TREE.map(n => <TreeNode key={n.id} node={n} depth={0} />)}
    </div>
  );
}
