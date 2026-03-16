// MdManager.tsx | TITANIUM_OS | v1.0 | 2026-03-11
// Gestione file .md — lista live, preview, editor inline, ultimi modificati, percorso completo

import { useState, useEffect, useRef, useCallback } from "react";
import {
  FileText, Clock, Edit3, Eye, ExternalLink, Save,
  X, RefreshCw, Search, FolderOpen, Check, AlertCircle,
} from "lucide-react";

interface MdFile {
  path: string;
  rel:  string;
  name: string;
  size_kb: number;
  modified: string;
}

// ── HELPERS ────────────────────────────────────────────────────
function relativeTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60)    return "adesso";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m fa`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h fa`;
  return `${Math.floor(diff / 86400)}g fa`;
}

function folderOf(rel: string): string {
  const parts = rel.split(/[\\/]/);
  return parts.length > 1 ? parts.slice(0, -1).join("/") : "root";
}

// ── EDITOR PANEL ───────────────────────────────────────────────
function EditorPanel({ file, onClose, onSaved }: {
  file: MdFile;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [original, setOriginal] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/file?path=${encodeURIComponent(file.path)}`)
      .then(r => r.json())
      .then(d => {
        if (d.ok && d.content != null) {
          setContent(d.content);
          setOriginal(d.content);
        } else {
          setError(d.error || "Errore lettura file");
        }
      })
      .catch(() => setError("API offline"));
  }, [file.path]);

  const save = async () => {
    if (content === null) return;
    setSaving(true);
    setError(null);
    try {
      const r = await fetch("/api/md-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: file.path, content }),
      });
      const d = await r.json();
      if (d.ok) {
        setOriginal(content);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        onSaved();
      } else {
        setError(d.error || "Salvataggio fallito");
      }
    } catch {
      setError("API offline");
    } finally {
      setSaving(false);
    }
  };

  const isDirty = content !== original;

  return (
    <div className="flex flex-col h-full">
      {/* Editor header */}
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <Edit3 size={10} className="text-amber-400 flex-shrink-0" />
        <span className="text-[10px] font-mono text-amber-400 truncate flex-1">{file.rel}</span>
        <span className="text-[8px] font-mono text-slate-600">{file.size_kb}kb</span>
        {isDirty && <span className="text-[8px] font-mono text-amber-500">● modificato</span>}
        <button
          onClick={save}
          disabled={saving || !isDirty}
          className="flex items-center gap-1 px-2 py-1 bg-emerald-900/30 border border-emerald-500/40 hover:border-emerald-500/70 text-emerald-400 rounded text-[9px] font-mono uppercase tracking-wider transition-all disabled:opacity-30"
        >
          {saved ? <Check size={9} /> : <Save size={9} />}
          {saving ? "salvando..." : saved ? "salvato" : "salva"}
        </button>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 transition-colors">
          <X size={11} />
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-rose-400 mb-2 bg-rose-900/10 border border-rose-500/20 rounded px-2 py-1.5 flex-shrink-0">
          <AlertCircle size={9} /> {error}
        </div>
      )}

      {content === null && !error ? (
        <div className="text-[9px] font-mono text-slate-600 p-2">caricamento…</div>
      ) : (
        <textarea
          ref={taRef}
          value={content ?? ""}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); save(); } }}
          className="flex-1 w-full bg-slate-950 border border-slate-700 focus:border-amber-500/50 rounded-lg p-3 text-[10px] font-mono text-slate-200 outline-none resize-none leading-relaxed scrollbar-thin transition-colors"
          spellCheck={false}
          placeholder="File vuoto"
        />
      )}
      <div className="text-[8px] font-mono text-slate-700 mt-1 flex-shrink-0">Ctrl+S per salvare</div>
    </div>
  );
}

// ── PREVIEW PANEL ──────────────────────────────────────────────
function PreviewPanel({ file, onClose, onEdit }: {
  file: MdFile;
  onClose: () => void;
  onEdit: () => void;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/file?path=${encodeURIComponent(file.path)}`)
      .then(r => r.json())
      .then(d => {
        if (d.ok && d.content != null) setContent(d.content);
        else setError(d.error || "Errore");
      })
      .catch(() => setError("API offline"));
  }, [file.path]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <Eye size={10} className="text-cyan-400 flex-shrink-0" />
        <span className="text-[10px] font-mono text-cyan-400 truncate flex-1">{file.rel}</span>
        <span className="text-[8px] font-mono text-slate-600">{file.size_kb}kb</span>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 px-2 py-1 bg-amber-900/20 border border-amber-500/30 hover:border-amber-500/60 text-amber-400 rounded text-[9px] font-mono uppercase tracking-wider transition-all"
        >
          <Edit3 size={9} /> modifica
        </button>
        <button
          onClick={() => fetch("/api/open", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: file.path }) }).catch(() => {})}
          className="text-slate-600 hover:text-indigo-400 transition-colors"
          title="Apri esternamente"
        >
          <ExternalLink size={10} />
        </button>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 transition-colors">
          <X size={11} />
        </button>
      </div>
      {error && <div className="text-[9px] font-mono text-rose-400 p-2">{error}</div>}
      {content === null && !error && <div className="text-[9px] font-mono text-slate-600 p-2">caricamento…</div>}
      {content !== null && (
        <pre className="flex-1 overflow-y-auto overflow-x-auto bg-slate-950 border border-slate-800 rounded-lg p-3 text-[9px] font-mono text-slate-300 whitespace-pre-wrap break-words leading-relaxed scrollbar-thin">
          {content.slice(0, 8000)}
          {content.length > 8000 && <span className="text-slate-600">{"\n"}… ({Math.round(content.length / 1000)}K caratteri)</span>}
        </pre>
      )}
    </div>
  );
}

// ── FILE ROW ───────────────────────────────────────────────────
function FileRow({ file, onPreview, onEdit, isSelected }: {
  file: MdFile;
  onPreview: () => void;
  onEdit: () => void;
  isSelected: boolean;
}) {
  const folder = folderOf(file.rel);
  const rel_time = relativeTime(file.modified);

  return (
    <div
      className={`group flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all cursor-default ${
        isSelected
          ? "border-cyan-500/40 bg-cyan-900/10"
          : "border-transparent hover:border-slate-700 hover:bg-slate-800/40"
      }`}
    >
      <FileText size={11} className="text-slate-600 flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono text-slate-200 truncate">{file.name}</div>
        <div className="text-[8px] font-mono text-slate-600 truncate flex items-center gap-1.5">
          <FolderOpen size={7} className="flex-shrink-0" />
          {folder}
          <span className="text-slate-700">·</span>
          {file.size_kb}kb
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-[8px] font-mono text-slate-600 flex items-center gap-0.5">
          <Clock size={7} /> {rel_time}
        </span>

        {/* Actions — visibili su hover o selezione */}
        <div className={`flex gap-1 transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          <button
            onClick={onPreview}
            className="p-0.5 text-slate-600 hover:text-cyan-400 transition-colors"
            title="Anteprima"
          >
            <Eye size={10} />
          </button>
          <button
            onClick={onEdit}
            className="p-0.5 text-slate-600 hover:text-amber-400 transition-colors"
            title="Modifica"
          >
            <Edit3 size={10} />
          </button>
          <button
            onClick={() => fetch("/api/open", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: file.path }) }).catch(() => {})}
            className="p-0.5 text-slate-600 hover:text-indigo-400 transition-colors"
            title="Apri esternamente"
          >
            <ExternalLink size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export function MdManager() {
  const [files, setFiles] = useState<MdFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MdFile | null>(null);
  const [mode, setMode] = useState<"preview" | "edit" | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/md-files")
      .then(r => r.json())
      .then(d => {
        if (d.ok) { setFiles(d.files); setApiOk(true); }
        else setApiOk(false);
      })
      .catch(() => setApiOk(false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = files.filter(f =>
    !query || f.rel.toLowerCase().includes(query.toLowerCase())
  );

  // Top 5 recenti (già ordinati per mtime desc)
  const recenti = files.slice(0, 5);

  const openPreview = (f: MdFile) => { setSelected(f); setMode("preview"); };
  const openEdit    = (f: MdFile) => { setSelected(f); setMode("edit"); };
  const closePanel  = () => { setSelected(null); setMode(null); };

  // Se un file è aperto, mostra il panel a destra
  if (selected && mode) {
    return (
      <div className="flex gap-3 h-full min-h-0">
        {/* Lista a sinistra (compatta) */}
        <div className="w-48 flex-shrink-0 flex flex-col gap-1 overflow-y-auto scrollbar-thin">
          {files.slice(0, 20).map(f => (
            <button
              key={f.path}
              onClick={() => { setSelected(f); }}
              className={`text-left px-2 py-1 rounded text-[9px] font-mono truncate transition-colors ${
                selected?.path === f.path
                  ? "bg-cyan-900/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/40"
              }`}
              title={f.rel}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Panel a destra */}
        <div className="flex-1 min-w-0 h-full">
          {mode === "preview" ? (
            <PreviewPanel file={selected} onClose={closePanel} onEdit={() => setMode("edit")} />
          ) : (
            <EditorPanel file={selected} onClose={closePanel} onSaved={load} />
          )}
        </div>
      </div>
    );
  }

  // Vista lista principale
  return (
    <div className="flex flex-col h-full gap-2">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex-1 flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 focus-within:border-cyan-500/50 transition-colors">
          <Search size={10} className="text-slate-600 flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="filtra per nome o percorso…"
            className="flex-1 bg-transparent text-[10px] font-mono text-slate-300 placeholder:text-slate-700 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-600 hover:text-slate-400">
              <X size={9} />
            </button>
          )}
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="p-1.5 text-slate-600 hover:text-emerald-400 border border-slate-700 rounded-lg transition-colors disabled:opacity-40"
          title="Aggiorna lista"
        >
          <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
        </button>
        <div className="text-[8px] font-mono text-slate-600 border border-slate-800 rounded px-1.5 py-1">
          {files.length} file
        </div>
      </div>

      {/* Offline notice */}
      {apiOk === false && (
        <div className="text-[9px] font-mono text-rose-400 bg-rose-900/10 border border-rose-500/20 rounded px-2 py-1.5 flex-shrink-0">
          API offline — avvia api_server.py per caricare i file .md
        </div>
      )}

      {/* Recenti */}
      {!query && recenti.length > 0 && (
        <div className="flex-shrink-0">
          <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Clock size={8} /> Ultimi modificati
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {recenti.map(f => (
              <button
                key={f.path}
                onClick={() => openPreview(f)}
                className="flex items-center gap-1 px-2 py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 rounded text-[8px] font-mono text-slate-400 hover:text-cyan-400 transition-all max-w-[150px] truncate"
                title={`${f.rel} — ${relativeTime(f.modified)}`}
              >
                <FileText size={8} />
                <span className="truncate">{f.name}</span>
                <span className="text-slate-600 text-[7px] flex-shrink-0">{relativeTime(f.modified)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {!query && <div className="h-px bg-slate-800 flex-shrink-0" />}

      {/* Lista file */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-0.5 min-h-0">
        {loading && <div className="text-[9px] font-mono text-slate-600 p-2">caricamento…</div>}
        {!loading && filtered.length === 0 && query && (
          <div className="text-[9px] font-mono text-slate-600 p-2">Nessun file per "{query}"</div>
        )}
        {filtered.map(f => (
          <FileRow
            key={f.path}
            file={f}
            onPreview={() => openPreview(f)}
            onEdit={() => openEdit(f)}
            isSelected={selected?.path === f.path}
          />
        ))}
      </div>
    </div>
  );
}
