// EcoTreeView.tsx | ECOSYSTEM_OS | v1.0 | 2026-03-09
// Albero cartelle ECOSYSTEM_OS — interattivo, commentabile, editabile
// Stato persiste in localStorage

import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  Cpu,
  Database,
  Zap,
  LayoutDashboard,
  MessageSquare,
  Pencil,
  Check,
  X,
  ExternalLink,
  Eye,
  Copy,
} from "lucide-react";
import { ECOSYSTEM_TREE, type EcoNode } from "../data/ecosystemTree";

const STORAGE_KEY = "ecosystem_tree_v1";

interface NodeOverride {
  expanded?: boolean;
  comment?: string;
  name?: string;
}

type TreeOverrides = Record<string, NodeOverride>;

function loadOverrides(): TreeOverrides {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveOverrides(o: TreeOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
}

// ── STATUS DOT ─────────────────────────────────────────────
const statusColor: Record<EcoNode["status"], string> = {
  active: "bg-emerald-500",
  pending: "bg-amber-500",
  archived: "bg-slate-600",
  future: "bg-indigo-400",
};

// ── ICON per tipo nodo ──────────────────────────────────────
function NodeIcon({
  type,
  expanded,
  color,
}: {
  type: EcoNode["type"];
  expanded: boolean;
  color: string;
}) {
  const cls = `w-3.5 h-3.5 ${color} flex-shrink-0`;
  switch (type) {
    case "automation": return <Zap className={cls} />;
    case "data":       return <Database className={cls} />;
    case "file":       return <FileText className={cls} />;
    case "node":       return <Cpu className={cls} />;
    case "dashboard":  return <LayoutDashboard className={cls} />;
    default:           return expanded ? <FolderOpen className={cls} /> : <Folder className={cls} />;
  }
}

// ── SINGLE NODE ─────────────────────────────────────────────
function TreeNode({
  node,
  depth,
  overrides,
  onOverrideChange,
}: {
  node: EcoNode;
  depth: number;
  overrides: TreeOverrides;
  onOverrideChange: (id: string, patch: NodeOverride) => void;
}) {
  const override = overrides[node.id] || {};
  const isExpanded = override.expanded ?? (depth === 0 || node.status === "active");
  const displayName = override.name ?? node.name;
  const displayComment = override.comment ?? node.comment;

  const hasChildren = node.children && node.children.length > 0;
  const [showComment, setShowComment] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [nameVal, setNameVal] = useState(displayName);
  const [commentVal, setCommentVal] = useState(displayComment);
  const nameRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  // Preview contenuto file/cartella via /api/file
  const [preview, setPreview] = useState<{ content?: string; type?: string; children?: any[]; size_kb?: number; error?: string } | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const togglePreview = () => {
    if (preview) { setPreview(null); return; }
    if (!node.path) return;
    setPreviewLoading(true);
    fetch(`/api/file?path=${encodeURIComponent(node.path)}`)
      .then((r) => r.json())
      .then((d) => { setPreview(d); setPreviewLoading(false); })
      .catch(() => { setPreview({ error: "API offline" }); setPreviewLoading(false); });
  };

  useEffect(() => { if (editingName) nameRef.current?.focus(); }, [editingName]);
  useEffect(() => { if (editingComment) commentRef.current?.focus(); }, [editingComment]);

  const iconColor =
    node.status === "active"
      ? "text-emerald-400"
      : node.status === "pending"
      ? "text-amber-400"
      : node.status === "future"
      ? "text-indigo-400"
      : "text-slate-500";

  const toggleExpand = () => {
    if (!hasChildren) return;
    onOverrideChange(node.id, { expanded: !isExpanded });
  };

  const saveName = () => {
    onOverrideChange(node.id, { name: nameVal });
    setEditingName(false);
  };

  const saveComment = () => {
    onOverrideChange(node.id, { comment: commentVal });
    setEditingComment(false);
  };

  return (
    <div>
      {/* ── ROW ─────────────────────────────────────────── */}
      <div
        className="group flex items-center gap-1.5 rounded px-1 py-0.5 hover:bg-slate-800/60 transition-colors"
        style={{ paddingLeft: `${depth * 14 + 4}px` }}
      >
        {/* Chevron / leaf */}
        <button
          onClick={toggleExpand}
          className="w-3 h-3 flex-shrink-0 text-slate-600 hover:text-slate-400 transition-colors"
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />
          ) : (
            <span className="block w-1.5 h-1.5 rounded-full bg-slate-700 ml-0.5" />
          )}
        </button>

        {/* Icon */}
        <NodeIcon type={node.type} expanded={isExpanded} color={iconColor} />

        {/* Name (editable) */}
        {editingName ? (
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <input
              ref={nameRef}
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveName(); if (e.key === "Escape") { setEditingName(false); setNameVal(displayName); } }}
              className="flex-1 min-w-0 bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-[10px] font-mono text-white outline-none"
            />
            <button onClick={saveName} className="text-emerald-400 hover:text-emerald-300"><Check size={10} /></button>
            <button onClick={() => { setEditingName(false); setNameVal(displayName); }} className="text-slate-500 hover:text-slate-300"><X size={10} /></button>
          </div>
        ) : (
          <span
            className={`text-[10px] font-mono flex-1 min-w-0 truncate cursor-default select-none ${
              node.status === "active"
                ? "text-slate-200"
                : node.status === "pending"
                ? "text-amber-300/80"
                : node.status === "future"
                ? "text-indigo-300/70"
                : "text-slate-500"
            }`}
            onDoubleClick={() => setEditingName(true)}
            title="Doppio click per rinominare"
          >
            {displayName}
          </span>
        )}

        {/* Status dot */}
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusColor[node.status]}`} />

        {/* Actions — visibili su hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {node.path && (
            <>
              {/* Preview contenuto inline */}
              <button
                onClick={(e) => { e.stopPropagation(); togglePreview(); }}
                className={`transition-colors ${preview ? "text-cyan-400" : "text-slate-600 hover:text-cyan-400"}`}
                title="Anteprima contenuto"
              >
                <Eye size={9} />
              </button>
              {/* Copia path — per chiedere a Claude di modificare */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard?.writeText(node.path!);
                }}
                className="text-slate-600 hover:text-emerald-400 transition-colors"
                title={`Copia path: ${node.path}`}
              >
                <Copy size={9} />
              </button>
              {/* Apri con app esterna */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fetch("/api/open", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path: node.path }),
                  }).catch(() => {});
                }}
                className="text-slate-600 hover:text-indigo-400 transition-colors"
                title="Apri con app predefinita"
              >
                <ExternalLink size={9} />
              </button>
            </>
          )}
          <button
            onClick={() => setShowComment(!showComment)}
            className="text-slate-600 hover:text-cyan-400 transition-colors"
            title="Mostra / aggiungi commento"
          >
            <MessageSquare size={9} />
          </button>
          <button
            onClick={() => { setEditingName(true); setNameVal(displayName); }}
            className="text-slate-600 hover:text-emerald-400 transition-colors"
            title="Rinomina"
          >
            <Pencil size={9} />
          </button>
        </div>
      </div>

      {/* ── COMMENT AREA ────────────────────────────────── */}
      {showComment && (
        <div
          className="mx-2 mb-1 rounded border border-slate-700 bg-slate-800/80"
          style={{ marginLeft: `${depth * 14 + 20}px` }}
        >
          {editingComment ? (
            <div className="p-2 flex flex-col gap-1">
              <textarea
                ref={commentRef}
                value={commentVal}
                onChange={(e) => setCommentVal(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-600 rounded p-1.5 text-[9px] font-mono text-slate-200 outline-none resize-none"
              />
              <div className="flex gap-1 justify-end">
                <button onClick={saveComment} className="text-[9px] text-emerald-400 hover:text-emerald-300 font-mono uppercase flex items-center gap-1">
                  <Check size={9} /> Salva
                </button>
                <button onClick={() => { setEditingComment(false); setCommentVal(displayComment); }} className="text-[9px] text-slate-500 hover:text-slate-300 font-mono uppercase flex items-center gap-1">
                  <X size={9} /> Annulla
                </button>
              </div>
            </div>
          ) : (
            <div
              className="p-2 cursor-pointer"
              onClick={() => { setEditingComment(true); setCommentVal(displayComment); }}
              title="Click per modificare"
            >
              <p className="text-[9px] text-slate-400 font-mono leading-relaxed">
                {displayComment || <span className="text-slate-600 italic">— nessun commento — click per aggiungere</span>}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── FILE PREVIEW ─────────────────────────────────── */}
      {(previewLoading || preview) && (
        <div
          className="mx-2 mb-1 rounded border border-cyan-500/20 bg-slate-900/80"
          style={{ marginLeft: `${depth * 14 + 20}px` }}
        >
          {previewLoading && (
            <div className="p-2 text-[8px] font-mono text-slate-500">caricamento…</div>
          )}
          {preview && !previewLoading && (
            <>
              {preview.error && (
                <div className="p-2 text-[8px] font-mono text-rose-500">{preview.error}</div>
              )}
              {/* Cartella: lista figli */}
              {preview.type === "dir" && preview.children && (
                <div className="p-2 space-y-0.5 max-h-40 overflow-y-auto scrollbar-thin">
                  <div className="text-[7px] font-mono text-slate-600 uppercase mb-1">
                    {preview.children.length} elementi
                  </div>
                  {preview.children.map((c: any) => (
                    <div key={c.name} className="flex items-center gap-1.5 text-[8px] font-mono text-slate-400">
                      <span className="text-slate-600">{c.is_dir ? "📁" : "📄"}</span>
                      <span className="truncate flex-1">{c.name}</span>
                      {c.size_kb != null && <span className="text-slate-600">{c.size_kb}kb</span>}
                    </div>
                  ))}
                </div>
              )}
              {/* File: contenuto testo */}
              {preview.type === "file" && preview.content != null && (
                <div className="relative">
                  <div className="flex items-center justify-between px-2 pt-1.5 pb-0.5">
                    <span className="text-[7px] font-mono text-slate-600">{preview.size_kb}kb</span>
                    <span className="text-[7px] font-mono text-cyan-500/60">
                      chiedi a Claude di modificarlo
                    </span>
                  </div>
                  <pre className="p-2 text-[8px] font-mono text-slate-300 overflow-x-auto overflow-y-auto max-h-52 whitespace-pre-wrap break-words scrollbar-thin leading-relaxed">
                    {preview.content.slice(0, 4000)}
                    {preview.content.length > 4000 && (
                      <span className="text-slate-600">{"\n"}… ({Math.round(preview.content.length / 1000)}K caratteri totali)</span>
                    )}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── CHILDREN ────────────────────────────────────── */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              overrides={overrides}
              onOverrideChange={onOverrideChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ──────────────────────────────────────────
export const EcoTreeView = () => {
  const [overrides, setOverrides] = useState<TreeOverrides>(loadOverrides);

  const handleChange = (id: string, patch: NodeOverride) => {
    setOverrides((prev) => {
      const next = { ...prev, [id]: { ...prev[id], ...patch } };
      saveOverrides(next);
      return next;
    });
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setOverrides({});
  };

  return (
    <div className="h-full flex flex-col">
      {/* Legend */}
      <div className="flex items-center gap-3 mb-2 pb-2 border-b border-slate-800 flex-wrap">
        {[
          { color: "bg-emerald-500", label: "active" },
          { color: "bg-amber-500", label: "pending" },
          { color: "bg-indigo-400", label: "future" },
          { color: "bg-slate-600", label: "archived" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
            <span className="text-[8px] font-mono text-slate-500 uppercase">{s.label}</span>
          </div>
        ))}
        <button
          onClick={resetAll}
          className="ml-auto text-[8px] font-mono text-slate-600 hover:text-rose-400 uppercase transition-colors"
        >
          reset
        </button>
      </div>

      {/* Hint */}
      <p className="text-[8px] font-mono text-slate-600 mb-2">
        👁 preview · 📋 copia path · ↗ apri · 💬 commento · ✏ rinomina
      </p>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <TreeNode
          node={ECOSYSTEM_TREE}
          depth={0}
          overrides={overrides}
          onOverrideChange={handleChange}
        />
      </div>
    </div>
  );
};
