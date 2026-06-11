// FileBrowser.tsx | TITANIUM_OS | v2.0 | 2026-03-16
// File browser organizzato per FUNZIONE (non per cartella).
// Categorie: AUTOMAZIONI | DOCS | DASHBOARD | DATA | BRAIN | CONTENT
// Usa /api/root + /api/file + /api/open

import { useState, useEffect } from "react";
import {
  Folder, FolderOpen, FileText, ExternalLink,
  ChevronRight, ChevronDown, RefreshCw, AlertCircle,
  Cpu, BookOpen, Layout, Database, Brain, Play,
} from "lucide-react";

// ── Tipi ───────────────────────────────────────────────────────
interface FsEntry { name: string; is_dir: boolean; size_kb: number | null; }

// ── Colori per estensione ──────────────────────────────────────
const EXT_COLORS: Record<string, string> = {
  ".tsx": "text-cyan-400", ".ts":  "text-cyan-500",
  ".py":  "text-emerald-400", ".md":  "text-amber-400",
  ".json":"text-indigo-400",  ".css": "text-rose-400",
  ".txt": "text-slate-400",   ".html":"text-orange-400",
};
function extColor(name: string) {
  const i = name.lastIndexOf(".");
  return i < 0 ? "text-slate-500" : EXT_COLORS[name.slice(i).toLowerCase()] ?? "text-slate-500";
}

// ── Categorie funzionali ───────────────────────────────────────
// Ogni categoria punta a una o più sottocartelle del progetto
interface Category {
  id: string;
  label: string;
  note: string;        // spiegazione neofita
  subPath: string;     // path relativo rispetto a ROOT
  icon: React.ElementType;
  color: string;
  badge: string;
}

const CATEGORIES: Category[] = [
  {
    id: "automazioni", label: "AUTOMAZIONI", subPath: "AUTOMATIONS\\core",
    note: "Script Python che eseguono task automatici: scanner, backup, changelog, TTS, video...",
    icon: Cpu, color: "text-emerald-400", badge: "border-emerald-500/30 bg-emerald-900/10",
  },
  {
    id: "docs", label: "DOCS / .MD", subPath: "DOCS",
    note: "Note, spec tecniche, piani, decisioni. I file .md sono la memoria del progetto.",
    icon: BookOpen, color: "text-amber-400", badge: "border-amber-500/30 bg-amber-900/10",
  },
  {
    id: "dashboard", label: "DASHBOARD", subPath: "DASHBOARD\\src",
    note: "Sorgente React del dashboard che stai guardando ora. Componenti, layout, stili.",
    icon: Layout, color: "text-cyan-400", badge: "border-cyan-500/30 bg-cyan-900/10",
  },
  {
    id: "data", label: "DATA / OUTPUT", subPath: "DATA",
    note: "Output generati: digest dello scanner, view JSON, report sanitizer, indici semantici.",
    icon: Database, color: "text-indigo-400", badge: "border-indigo-500/30 bg-indigo-900/10",
  },
  {
    id: "brain", label: "BRAIN / STATE", subPath: "BRAIN",
    note: "STATE.json = cuore del sistema. Contiene milestone, next step, blockers, % pilastri.",
    icon: Brain, color: "text-rose-400", badge: "border-rose-500/30 bg-rose-900/10",
  },
  {
    id: "content", label: "CONTENT ENGINE", subPath: "CONTENT_ENGINE",
    note: "Script storytelling: podcast, video, audio. Racconta il processo costruttivo.",
    icon: Play, color: "text-amber-400", badge: "border-amber-500/30 bg-amber-900/10",
  },
];

// Cartelle da saltare sempre
const SKIP = new Set(["node_modules","__pycache__",".git","BACKUPS","VERSIONS","venv",".venv","dist","build","flatted"]);

// ── Nodo albero ricorsivo ──────────────────────────────────────
function TreeNode({ entry, parentPath, depth, onOpen }: {
  entry: FsEntry; parentPath: string; depth: number;
  onOpen: (p: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth === 0); // primo livello aperto
  const [children, setChildren] = useState<FsEntry[] | null>(null);
  const [loading, setLoading]   = useState(false);

  if (entry.is_dir && SKIP.has(entry.name)) return null;

  const fullPath = `${parentPath}\\${entry.name}`;

  const toggle = async () => {
    if (!entry.is_dir) { onOpen(fullPath); return; }
    if (!expanded && children === null) {
      setLoading(true);
      try {
        const r = await fetch(`/api/file?path=${encodeURIComponent(fullPath)}`);
        const d = await r.json();
        if (d.ok && d.type === "dir") setChildren(d.children);
      } catch { /* silent */ }
      finally { setLoading(false); }
    }
    setExpanded(v => !v);
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 py-[3px] px-1 rounded cursor-pointer hover:bg-slate-800/50 group transition-colors"
        style={{ paddingLeft: 4 + depth * 10 }}
        onClick={toggle}
      >
        {entry.is_dir ? (
          <span className="w-3 flex-shrink-0 text-slate-700">
            {loading ? <RefreshCw size={7} className="animate-spin" />
              : expanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}
          </span>
        ) : <span className="w-3 flex-shrink-0" />}

        {entry.is_dir
          ? <span>{expanded
              ? <FolderOpen size={9} className="text-amber-400/60 flex-shrink-0" />
              : <Folder size={9} className="text-amber-400/40 flex-shrink-0" />
            }</span>
          : <FileText size={9} className={`flex-shrink-0 ${extColor(entry.name)}`} />
        }

        <span className={`text-[9px] font-mono truncate flex-1 ${
          entry.is_dir ? "text-slate-300" : extColor(entry.name)
        }`}>{entry.name}</span>

        {!entry.is_dir && entry.size_kb !== null && (
          <span className="text-[7px] font-mono text-slate-700 flex-shrink-0">{entry.size_kb}kb</span>
        )}
        {!entry.is_dir && (
          <button
            onClick={e => { e.stopPropagation(); fetch("/api/open",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:fullPath})}).catch(()=>{}); }}
            className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-600 hover:text-indigo-400 transition-all flex-shrink-0"
            title="Apri nel programma predefinito"
          >
            <ExternalLink size={7} />
          </button>
        )}
      </div>

      {expanded && children && (
        <div>
          {children.map(c => (
            <TreeNode key={c.name} entry={c} parentPath={fullPath} depth={depth+1} onOpen={onOpen} />
          ))}
          {children.length === 0 && (
            <div className="text-[7px] font-mono text-slate-700 py-0.5" style={{paddingLeft:4+(depth+1)*10}}>vuota</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Pannello categoria: titolo + albero ────────────────────────
function CategoryPanel({ cat, root, onOpen }: {
  cat: Category; root: string; onOpen: (p: string) => void;
}) {
  const [data, setData]     = useState<FsEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  // Path assoluto derivato da ROOT (CONTENT_ENGINE vive nel repo dalla migrazione 06/2026)
  const absPath = `${root}\\${cat.subPath}`;

  useEffect(() => {
    fetch(`/api/file?path=${encodeURIComponent(absPath)}`)
      .then(r => r.json())
      .then(d => {
        if (d.ok && d.type === "dir") setData(d.children);
        else setError(d.error ?? "cartella non trovata");
      })
      .catch(() => setError("API offline"))
      .finally(() => setLoading(false));
  }, [absPath]);

  const Icon = cat.icon;

  return (
    <div className={`border rounded-xl overflow-hidden ${cat.badge}`}>
      {/* Header categoria */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800/60">
        <Icon size={10} className={cat.color} />
        <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${cat.color}`}>
          {cat.label}
        </span>
        {data && (
          <span className="ml-auto text-[7px] font-mono text-slate-600">
            {data.filter(f => !f.is_dir).length} file · {data.filter(f => f.is_dir).length} dir
          </span>
        )}
      </div>

      {/* Nota neofita */}
      <div className="px-3 py-1.5 border-b border-slate-800/40">
        <span className="text-[8px] font-mono text-slate-600">{cat.note}</span>
      </div>

      {/* Contenuto */}
      <div className="px-1 py-1">
        {loading && (
          <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-600 p-2">
            <RefreshCw size={8} className="animate-spin" /> caricamento…
          </div>
        )}
        {error && (
          <div className="flex items-center gap-1 text-[8px] font-mono text-rose-400/70 p-2">
            <AlertCircle size={8} /> {error}
          </div>
        )}
        {data && data.map(entry => (
          <TreeNode
            key={entry.name}
            entry={entry}
            parentPath={absPath}
            depth={0}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPALE ──────────────────────────────────────
export function FileBrowser() {
  const [root, setRoot]         = useState<string | null>(null);
  const [error, setError]       = useState<string | null>(null);
  const [lastOpened, setLastOpened] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("automazioni");

  useEffect(() => {
    fetch("/api/root")
      .then(r => r.json())
      .then(d => { if (d.ok) setRoot(d.root); else setError("endpoint /api/root non trovato"); })
      .catch(() => setError("API offline — avvia api_server.py"));
  }, []);

  const handleOpen = (path: string) => {
    setLastOpened(path);
    fetch("/api/open", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    }).catch(() => {});
  };

  if (error) {
    return (
      <div className="text-[9px] font-mono text-rose-400 bg-rose-900/10 border border-rose-500/20 rounded p-3 flex items-start gap-2">
        <AlertCircle size={10} className="flex-shrink-0 mt-0.5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!root) {
    return (
      <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600 p-3">
        <RefreshCw size={9} className="animate-spin" /> connessione API…
      </div>
    );
  }

  const activeCat = CATEGORIES.find(c => c.id === activeId)!;

  return (
    <div className="flex flex-col h-full gap-2 min-h-0">

      {/* Sidebar categorie */}
      <div className="flex-shrink-0 flex flex-wrap gap-1">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[8px] font-mono uppercase tracking-wider transition-all ${
                activeId === cat.id
                  ? `${cat.badge} ${cat.color} font-bold`
                  : "border-slate-800 text-slate-600 hover:text-slate-400 hover:border-slate-700"
              }`}
            >
              <Icon size={8} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Ultimo aperto */}
      {lastOpened && (
        <div className="flex-shrink-0 flex items-center gap-1.5 text-[8px] font-mono text-emerald-400/70
          bg-emerald-900/10 border border-emerald-500/15 rounded px-2 py-1">
          <ExternalLink size={7} />
          <span className="truncate">{lastOpened.split("\\").slice(-2).join("\\")}</span>
        </div>
      )}

      {/* Pannello categoria attiva */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <CategoryPanel key={activeId} cat={activeCat} root={root} onOpen={handleOpen} />
      </div>

    </div>
  );
}
