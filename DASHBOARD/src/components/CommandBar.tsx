// CommandBar.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-27
// Ctrl+K palette — navigazione + azioni sistema + edit stato

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Search, Grid3X3, GitBranch, Layers, Mic, Globe,
  Scan, RefreshCw, FileText, Activity, AlertTriangle,
  Target, Flame, ChevronRight, Check, X, Loader2,
} from "lucide-react";
import { useUIStore } from "../stores/systemStore";

type ViewMode = "canvas" | "neuro" | "sinapsi" | "storie" | "rete";

// ─── COMANDI DISPONIBILI ─────────────────────────────────────────────────────

interface Cmd {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  group: "nav" | "sys" | "edit";
  keywords: string[];
  action: () => void | Promise<void>;
}

async function callAPI(path: string, method = "POST", body?: object): Promise<{ ok: boolean; msg: string }> {
  try {
    const r = await fetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok, msg: data.message || data.error || (r.ok ? "OK" : `Error ${r.status}`) };
  } catch (e) {
    return { ok: false, msg: "API offline" };
  }
}

// ─── COMPONENTE ──────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: (v: ViewMode) => void;
}

const GROUP_LABELS = { nav: "NAVIGAZIONE", sys: "SISTEMA", edit: "MODIFICA STATO" };
const GROUP_ORDER: Array<Cmd["group"]> = ["nav", "sys", "edit"];

export function CommandBar({ open, onClose, onNavigate }: Props) {
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const [status, setStatus] = useState<{ id: string; state: "loading" | "ok" | "err"; msg: string } | null>(null);
  const [editMode, setEditMode] = useState<{ field: "next_step" | "focus_today" | "blocker" } | null>(null);
  const [editVal, setEditVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);

  const view = useUIStore((s) => s.view) as ViewMode;

  const runAction = useCallback(async (id: string, fn: () => void | Promise<void>) => {
    setStatus({ id, state: "loading", msg: "" });
    try {
      await fn();
      setStatus(s => s ? { ...s, state: "ok", msg: "Fatto" } : null);
      setTimeout(() => { setStatus(null); onClose(); }, 900);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus(s => s ? { ...s, state: "err", msg } : null);
      setTimeout(() => setStatus(null), 2500);
    }
  }, [onClose]);

  const CMDS: Cmd[] = [
    // ── NAVIGAZIONE
    {
      id: "go-canvas", label: "CANVAS", desc: "Banco di lavoro — stato, blockers, docs", icon: Grid3X3,
      color: "text-slate-300", group: "nav", keywords: ["canvas", "lavoro", "home"],
      action: () => { onNavigate("canvas"); onClose(); },
    },
    {
      id: "go-neuro", label: "MAPPA", desc: "Naviga l'ecosistema — drill-down infinito", icon: GitBranch,
      color: "text-emerald-400", group: "nav", keywords: ["mappa", "neuro", "ecosystem", "nodi"],
      action: () => { onNavigate("neuro"); onClose(); },
    },
    {
      id: "go-sinapsi", label: "SINAPSI", desc: "Approfondisci — pilastri, skill, proof", icon: Layers,
      color: "text-indigo-400", group: "nav", keywords: ["sinapsi", "layers", "pilastri", "v32", "mims"],
      action: () => { onNavigate("sinapsi"); onClose(); },
    },
    {
      id: "go-storie", label: "STORIE", desc: "Episodi podcast + dataset fine-tuning", icon: Mic,
      color: "text-amber-400", group: "nav", keywords: ["storie", "podcast", "episodi", "content"],
      action: () => { onNavigate("storie"); onClose(); },
    },
    {
      id: "go-rete", label: "RETE", desc: "Grafo connessioni tra progetti", icon: Globe,
      color: "text-cyan-400", group: "nav", keywords: ["rete", "grafo", "connessioni", "graph"],
      action: () => { onNavigate("rete"); onClose(); },
    },

    // ── SISTEMA
    {
      id: "scan-mente", label: "Scan MENTE", desc: "Scansiona /api/scan — aggiorna digest", icon: Scan,
      color: "text-emerald-400", group: "sys", keywords: ["scan", "mente", "digest", "indicizza"],
      action: async () => {
        await runAction("scan-mente", async () => {
          const r = await callAPI("/api/scan");
          if (!r.ok) throw new Error(r.msg);
        });
      },
    },
    {
      id: "rag-rebuild", label: "RAG Rebuild", desc: "Ricostruisce indice ChromaDB", icon: RefreshCw,
      color: "text-cyan-400", group: "sys", keywords: ["rag", "rebuild", "chroma", "embeddings", "indice"],
      action: async () => {
        await runAction("rag-rebuild", async () => {
          const r = await callAPI("/api/rag/rebuild");
          if (!r.ok) throw new Error(r.msg);
        });
      },
    },
    {
      id: "daily-brief", label: "Daily Brief", desc: "Genera brief giornaliero", icon: FileText,
      color: "text-indigo-400", group: "sys", keywords: ["brief", "daily", "riepilogo", "giornaliero"],
      action: async () => {
        await runAction("daily-brief", async () => {
          const r = await callAPI("/api/daily-brief");
          if (!r.ok) throw new Error(r.msg);
        });
      },
    },
    {
      id: "api-health", label: "API Health", desc: "Ping /api/health — verifica stato server", icon: Activity,
      color: "text-slate-300", group: "sys", keywords: ["health", "api", "status", "ping", "server"],
      action: async () => {
        await runAction("api-health", async () => {
          const r = await callAPI("/api/health", "GET");
          if (!r.ok) throw new Error(r.msg);
          setStatus(s => s ? { ...s, msg: r.msg } : null);
        });
      },
    },

    // ── MODIFICA STATO
    {
      id: "edit-next-step", label: "Aggiorna Next Step", desc: "Modifica prossimo step del milestone", icon: Target,
      color: "text-emerald-400", group: "edit", keywords: ["next", "step", "prossimo", "milestone"],
      action: () => { setEditMode({ field: "next_step" }); setEditVal(""); setTimeout(() => editRef.current?.focus(), 50); },
    },
    {
      id: "edit-focus", label: "Aggiorna Focus Oggi", desc: "Cosa devi fare oggi — priorità assoluta", icon: Flame,
      color: "text-amber-400", group: "edit", keywords: ["focus", "oggi", "today", "priorita"],
      action: () => { setEditMode({ field: "focus_today" }); setEditVal(""); setTimeout(() => editRef.current?.focus(), 50); },
    },
    {
      id: "add-blocker", label: "Aggiungi Blocker", desc: "Registra un impedimento attivo", icon: AlertTriangle,
      color: "text-rose-400", group: "edit", keywords: ["blocker", "blocco", "impedimento", "problema"],
      action: () => { setEditMode({ field: "blocker" }); setEditVal(""); setTimeout(() => editRef.current?.focus(), 50); },
    },
  ];

  // Filtra
  const q = query.trim().toLowerCase();
  const filtered = q
    ? CMDS.filter(c =>
        c.label.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.keywords.some(k => k.includes(q))
      )
    : CMDS;

  // Raggruppa
  const groups = GROUP_ORDER
    .map(g => ({ g, items: filtered.filter(c => c.group === g) }))
    .filter(({ items }) => items.length > 0);

  // Lista piatta per navigazione da tastiera
  const flat = groups.flatMap(({ items }) => items);

  useEffect(() => { setSel(0); }, [query]);
  useEffect(() => { if (open) { setQuery(""); setSel(0); setEditMode(null); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (editMode) {
      if (e.key === "Escape") { setEditMode(null); inputRef.current?.focus(); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, flat.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); flat[sel]?.action(); }
    if (e.key === "Escape") { onClose(); }
  }, [flat, sel, onClose, editMode]);

  const submitEdit = useCallback(async () => {
    if (!editMode || !editVal.trim()) return;
    const { field } = editMode;
    await runAction("edit-state", async () => {
      let body: Record<string, unknown>;
      if (field === "blocker") {
        // append to array
        await callAPI("/api/state", "GET");
        body = { blockers: [editVal.trim()] };
      } else {
        body = { [field]: editVal.trim() };
      }
      const r = await callAPI("/api/state", "PATCH", body);
      if (!r.ok) throw new Error(r.msg);
    });
    setEditMode(null);
  }, [editMode, editVal, runAction]);

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div
      className="cmd-overlay fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(4px)" }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="cmd-panel w-full max-w-[560px] mx-4 rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#111118", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/60">
          <Search size={14} className="text-slate-500 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Cerca comando, naviga, esegui..."
            className="flex-1 bg-transparent text-slate-200 text-sm font-mono placeholder-slate-600 outline-none"
          />
          <kbd className="text-[9px] font-mono text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        {/* Edit mode inline */}
        {editMode && (
          <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-900/40">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              {editMode.field === "next_step" && "PROSSIMO STEP"}
              {editMode.field === "focus_today" && "FOCUS OGGI"}
              {editMode.field === "blocker" && "NUOVO BLOCKER"}
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={editRef}
                value={editVal}
                onChange={e => setEditVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") { e.preventDefault(); submitEdit(); }
                  if (e.key === "Escape") { setEditMode(null); inputRef.current?.focus(); }
                }}
                placeholder="Inserisci testo..."
                className="flex-1 bg-slate-800/60 text-slate-200 text-xs font-mono px-3 py-1.5 rounded border border-slate-700 outline-none focus:border-emerald-500/50"
              />
              <button onClick={submitEdit} className="flex items-center gap-1 px-2 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono hover:bg-emerald-500/20 transition-colors">
                <Check size={10} /> Salva
              </button>
              <button onClick={() => { setEditMode(null); inputRef.current?.focus(); }} className="p-1.5 rounded text-slate-500 hover:text-slate-300 transition-colors">
                <X size={10} />
              </button>
            </div>
          </div>
        )}

        {/* Risultati */}
        <div className="max-h-[360px] overflow-y-auto scrollbar-thin py-1">
          {groups.length === 0 && (
            <div className="px-4 py-8 text-center text-[11px] font-mono text-slate-600">
              Nessun comando trovato
            </div>
          )}
          {groups.map(({ g, items }) => (
            <div key={g}>
              <div className="px-4 py-1.5 text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-slate-600">
                {GROUP_LABELS[g]}
              </div>
              {items.map(cmd => {
                const idx = flatIdx++;
                const Icon = cmd.icon;
                const isSel = sel === idx;
                const isLoading = status?.id === cmd.id && status.state === "loading";
                const isDone = status?.id === cmd.id && status.state === "ok";
                const isErr = status?.id === cmd.id && status.state === "err";
                return (
                  <button
                    key={cmd.id}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSel(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isSel ? "bg-slate-800/60" : "hover:bg-slate-800/30"
                    }`}
                  >
                    <div className={`flex-shrink-0 ${isLoading ? "animate-spin" : ""}`}>
                      {isLoading ? <Loader2 size={14} className="text-slate-400" /> :
                       isDone    ? <Check size={14} className="text-emerald-400" /> :
                       isErr     ? <X size={14} className="text-rose-400" /> :
                       <Icon size={14} className={cmd.color} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[11px] font-mono font-semibold ${cmd.color}`}>{cmd.label}</div>
                      <div className="text-[9px] font-mono text-slate-500 truncate">
                        {isErr ? status!.msg : cmd.desc}
                      </div>
                    </div>
                    {isSel && !isLoading && !isDone && !isErr && (
                      <ChevronRight size={11} className="text-slate-600 flex-shrink-0" />
                    )}
                    {view === cmd.id.replace("go-", "") && cmd.group === "nav" && (
                      <span className="text-[8px] font-mono text-slate-600 border border-slate-800 rounded px-1">corrente</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-800/40 flex items-center gap-4 bg-slate-950/40">
          <span className="text-[8px] font-mono text-slate-700"><kbd className="border border-slate-800 rounded px-1">↑↓</kbd> naviga</span>
          <span className="text-[8px] font-mono text-slate-700"><kbd className="border border-slate-800 rounded px-1">↵</kbd> esegui</span>
          <span className="text-[8px] font-mono text-slate-700"><kbd className="border border-slate-800 rounded px-1">ESC</kbd> chiudi</span>
          <span className="ml-auto text-[8px] font-mono text-slate-700"><kbd className="border border-slate-800 rounded px-1">Ctrl K</kbd> riapri</span>
        </div>
      </div>
    </div>
  );
}
