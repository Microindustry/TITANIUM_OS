// RagGraphView.tsx | TITANIUM_OS | v6.0 | 2026-05-30
// Embedding space 3D — Three.js raw, zero lib extra
// t-SNE 3D su ChromaDB, OrbitControls, shader points

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Search, X, RefreshCw } from "lucide-react";

interface VecPoint {
  id: string; label: string; folder: string;
  chunk_count: number; x: number; y: number; z: number;
}
interface VecLink {
  source: number; target: number; weight: number;
}
interface VecData {
  ok: boolean; chunk_count: number; doc_count: number;
  points: VecPoint[]; links?: VecLink[];
}

const FOLDER_COLOR: Record<string, string> = {
  // MENTE (sorgente Conoscenza/RAG)
  "V32/": "#10b981", "MIMS/": "#f59e0b", "GENESIS/": "#06b6d4",
  "OFFICINA/": "#f97316", "SESSIONI/": "#f43f5e", "KNOWLEDGE/": "#818cf8",
  "VITA_NATURA/": "#a78bfa", "STORIE/": "#ec4899",
  "ASSOLUTO/": "#eab308", "VULCAN/": "#ef4444",
  // Repo (sorgente Sistema/Graphify)
  "NODES/": "#06b6d4", "AUTOMATIONS/": "#f59e0b", "DASHBOARD/": "#ec4899",
  "CORE/": "#10b981", "BRAIN/": "#a78bfa", "MCP/": "#22d3ee",
  "SERVICES/": "#f97316", "CONTENT_ENGINE/": "#f43f5e", "DOCS/": "#64748b",
};

function folderColor(f: string) {
  for (const [k, v] of Object.entries(FOLDER_COLOR)) if (f.startsWith(k)) return v;
  return "#475569";
}

function hex3(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

const SCALE = 8;

// ── componente Three.js incapsulato ───────────────────────────
function ThreeScene({
  points,
  links,
  onHover,
  onClick,
}: {
  points: VecPoint[];
  links: VecLink[];
  onHover: (p: VecPoint | null, x: number, y: number) => void;
  onClick: (p: VecPoint | null) => void;
}) {
  const mountRef  = useRef<HTMLDivElement>(null);
  const stateRef  = useRef<{
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    pts: THREE.Points;
    raf: number;
    onResize: () => void;
  } | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el || points.length === 0) return;

    // init dopo layout
    const raf0 = requestAnimationFrame(() => {
      const W = el.clientWidth  || 800;
      const H = el.clientHeight || 600;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(W, H);
      renderer.setClearColor(0x050a14);
      el.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(60, W / H, 0.01, 1000);
      camera.position.set(0, 0, 20);

      const scene = new THREE.Scene();
      scene.add(new THREE.AxesHelper(SCALE * 1.2));
      const grid = new THREE.GridHelper(SCALE * 2, 20, 0x1e293b, 0x0f172a);
      grid.position.y = -SCALE;
      scene.add(grid);

      // build point cloud
      const pos: number[] = [], col: number[] = [], sz: number[] = [];
      for (const p of points) {
        pos.push(p.x * SCALE, p.y * SCALE, p.z * SCALE);
        const [r, g, b] = hex3(folderColor(p.folder));
        col.push(r, g, b);
        sz.push(Math.max(0.12, Math.sqrt(p.chunk_count) * 0.1));
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute("color",    new THREE.Float32BufferAttribute(col, 3));
      geo.setAttribute("size",     new THREE.Float32BufferAttribute(sz, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { opacity: { value: 0.9 } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (280.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          uniform float opacity;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            if (d > 1.0) discard;
            gl_FragColor = vec4(vColor, (1.0 - d * 0.4) * opacity);
          }`,
        transparent: true,
        depthWrite: false,
      });

      const pts = new THREE.Points(geo, mat);
      scene.add(pts);

      // ── archi semantici: similarita' embedding REALE dal RAG (P4a) ──
      // intensita' della linea = peso coseno; sky-blue per il tema RAG/ciano.
      if (links.length) {
        const lpos: number[] = [], lcol: number[] = [];
        for (const l of links) {
          const a = points[l.source], b = points[l.target];
          if (!a || !b) continue;
          lpos.push(a.x * SCALE, a.y * SCALE, a.z * SCALE,
                    b.x * SCALE, b.y * SCALE, b.z * SCALE);
          const t = Math.min(1, Math.max(0.3, (l.weight - 0.5) / 0.5));
          lcol.push(0.22 * t, 0.74 * t, 0.97 * t, 0.22 * t, 0.74 * t, 0.97 * t);
        }
        const lgeo = new THREE.BufferGeometry();
        lgeo.setAttribute("position", new THREE.Float32BufferAttribute(lpos, 3));
        lgeo.setAttribute("color",    new THREE.Float32BufferAttribute(lcol, 3));
        const lmat = new THREE.LineBasicMaterial({
          vertexColors: true, transparent: true, opacity: 0.3, depthWrite: false,
        });
        scene.add(new THREE.LineSegments(lgeo, lmat));
      }

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping  = true;
      controls.dampingFactor  = 0.08;
      controls.autoRotate     = true;
      controls.autoRotateSpeed = 0.5;
      controls.addEventListener("start", () => { controls.autoRotate = false; });

      const onResize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);
      };
      loop();

      stateRef.current = { renderer, camera, controls, pts, raf, onResize };
    });

    return () => {
      cancelAnimationFrame(raf0);
      const s = stateRef.current;
      if (!s) return;
      cancelAnimationFrame(s.raf);
      s.controls.dispose();
      window.removeEventListener("resize", s.onResize);
      s.renderer.dispose();
      if (el.contains(s.renderer.domElement)) el.removeChild(s.renderer.domElement);
      stateRef.current = null;
    };
  }, [points, links]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (!s) return;
    const rect = s.renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top)  / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.params.Points = { threshold: 0.4 };
    ray.setFromCamera(mouse, s.camera);
    const hits = ray.intersectObject(s.pts);
    if (hits.length > 0 && hits[0].index != null && hits[0].index < points.length) {
      onHover(points[hits[0].index], e.clientX - rect.left, e.clientY - rect.top);
    } else {
      onHover(null, 0, 0);
    }
  }, [points, onHover]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (!s) return;
    const rect = s.renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top)  / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.params.Points = { threshold: 0.4 };
    ray.setFromCamera(mouse, s.camera);
    const hits = ray.intersectObject(s.pts);
    if (hits.length > 0 && hits[0].index != null && hits[0].index < points.length) {
      onClick(points[hits[0].index]);
    } else {
      onClick(null);
    }
  }, [points, onClick]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  );
}

// ── componente principale ─────────────────────────────────────
export function RagGraphView() {
  const [data, setData]         = useState<VecData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [selected, setSelected] = useState<VecPoint | null>(null);
  const [hovered, setHovered]   = useState<{ p: VecPoint; x: number; y: number } | null>(null);
  const [query, setQuery]       = useState("");
  const [folderFilter, setFolderFilter] = useState<string | null>(null);
  // Sorgente del grafo: conoscenza (RAG, embedding) oppure sistema (Graphify, relazioni reali)
  const [source, setSource]     = useState<"rag" | "graphify">("rag");

  const ENDPOINT = { rag: "/api/rag/vectors", graphify: "/api/graph/graphify" };

  const load = useCallback(async (force = false) => {
    setLoading(true); setError(null);
    try {
      const base = ENDPOINT[source];
      const r = await fetch(force ? `${base}?force=1` : base);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d: VecData = await r.json();
      if (!d.ok) throw new Error((d as any).error);
      setData(d);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [source]);

  useEffect(() => { setFolderFilter(null); setSelected(null); load(); }, [load]);

  // punti filtrati + archi RIMAPPATI sugli indici visibili (gli archi del
  // backend usano indici sull'array pieno: senza remap il filtro li romperebbe).
  const { visible, visibleLinks } = useMemo(() => {
    if (!data) return { visible: [] as VecPoint[], visibleLinks: [] as VecLink[] };
    const q = query.toLowerCase();
    const keep = (p: VecPoint) =>
      (!folderFilter || p.folder === folderFilter) &&
      (!q || p.label.toLowerCase().includes(q) || p.folder.toLowerCase().includes(q));
    const remap = new Map<number, number>();
    const vis: VecPoint[] = [];
    data.points.forEach((p, i) => { if (keep(p)) { remap.set(i, vis.length); vis.push(p); } });
    const vlinks: VecLink[] = [];
    for (const l of data.links ?? []) {
      const a = remap.get(l.source), b = remap.get(l.target);
      if (a !== undefined && b !== undefined) vlinks.push({ source: a, target: b, weight: l.weight });
    }
    return { visible: vis, visibleLinks: vlinks };
  }, [data, folderFilter, query]);

  const allFolders = useMemo(() =>
    data ? Array.from(new Set(data.points.map(p => p.folder))).sort() : [], [data]);

  const onHover = useCallback((p: VecPoint | null, x: number, y: number) => {
    setHovered(p ? { p, x, y } : null);
  }, []);

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "#050a14" }}>

      {/* ── Sidebar ── */}
      <div className="w-44 flex-shrink-0 flex flex-col border-r border-slate-800/60 p-3 gap-3 overflow-y-auto">
        {/* Sorgente del grafo */}
        <div>
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest mb-1.5">grafo di</div>
          <div className="flex gap-1">
            {([["rag", "Conoscenza", "#06b6d4"], ["graphify", "Sistema", "#10b981"]] as const).map(([k, lbl, c]) => (
              <button key={k} onClick={() => setSource(k)}
                className="flex-1 px-2 py-1.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider border transition-all"
                style={{
                  borderColor: source === k ? c : "#1e293b",
                  background: source === k ? c + "1f" : "transparent",
                  color: source === k ? c : "#475569",
                }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest mb-2">
            {source === "rag" ? "embedding 3D" : "knowledge graph"}
          </div>
          {data && (
            <div className="flex gap-1.5 mb-1">
              <div className="flex-1 p-2 rounded border border-slate-800 bg-slate-900/40 text-center">
                <div className="text-[7px] font-mono text-slate-600">doc</div>
                <div className="text-[14px] font-bold font-mono text-emerald-400">{visible.length}</div>
              </div>
              <div className="flex-1 p-2 rounded border border-slate-800 bg-slate-900/40 text-center">
                <div className="text-[7px] font-mono text-slate-600">archi</div>
                <div className="text-[14px] font-bold font-mono text-sky-400">{visibleLinks.length}</div>
              </div>
            </div>
          )}
          <div className="text-[7px] font-mono text-slate-700 leading-relaxed">
            {source === "rag"
              ? <>384-dim → t-SNE 3D<br />archi = similarità coseno reale</>
              : <>Graphify (AST + Leiden)<br />archi = relazioni reali nel codice</>}
          </div>
        </div>

        <div className="relative">
          <Search size={9} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="cerca..."
            className="w-full pl-5 pr-6 py-1.5 text-[9px] font-mono bg-slate-900 border border-slate-800 rounded text-slate-300 placeholder-slate-700 focus:outline-none focus:border-slate-600" />
          {query && <button onClick={() => setQuery("")} className="absolute right-1.5 top-1/2 -translate-y-1/2"><X size={9} className="text-slate-600" /></button>}
        </div>

        {allFolders.length > 0 && (
          <div>
            <div className="text-[7px] font-mono text-slate-700 uppercase tracking-widest mb-1.5">cluster</div>
            <button onClick={() => setFolderFilter(null)}
              className={`w-full text-left px-2 py-1 rounded text-[8px] font-mono mb-0.5 ${!folderFilter ? "bg-slate-800 text-slate-200" : "text-slate-600 hover:text-slate-400"}`}>
              tutti ({data?.doc_count})
            </button>
            {allFolders.map(f => {
              const count = data!.points.filter(p => p.folder === f).length;
              const color = folderColor(f);
              return (
                <button key={f} onClick={() => setFolderFilter(folderFilter === f ? null : f)}
                  className={`w-full text-left px-2 py-1 rounded text-[8px] font-mono flex items-center gap-1.5 ${folderFilter === f ? "bg-slate-800" : "hover:bg-slate-900"}`}
                  style={{ color: folderFilter === f ? color : "#64748b" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  {f.replace("/", "")} ({count})
                </button>
              );
            })}
          </div>
        )}

        <div className="text-[7px] font-mono text-slate-700 border-t border-slate-800/60 pt-2 space-y-0.5 mt-auto">
          <div>drag = ruota · auto-rotate</div>
          <div>scroll = zoom</div>
          <div>click = dettaglio</div>
        </div>

        <button onClick={() => load(true)}
          className="flex items-center justify-center gap-1.5 text-[8px] font-mono text-slate-700 hover:text-slate-400 px-2 py-1.5 rounded border border-slate-800 hover:border-slate-700 transition-all">
          <RefreshCw size={9} /> ricalcola t-SNE
        </button>
      </div>

      {/* ── Canvas area ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3" style={{ background: "#050a14" }}>
            <div className="w-8 h-8 border border-cyan-500/30 rounded-full border-t-cyan-400 animate-spin" />
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">t-SNE 3D...</span>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3" style={{ background: "#050a14" }}>
            <span className="text-[10px] font-mono text-red-400">{error}</span>
            <button onClick={() => load()} className="text-[9px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1.5 border border-slate-800 px-2 py-1 rounded">
              <RefreshCw size={9} /> riprova
            </button>
          </div>
        )}

        {/* 3D scene — sempre montata, visibile solo quando ha dati */}
        {!loading && !error && visible.length > 0 && (
          <ThreeScene
            key={`${folderFilter}-${query}`}
            points={visible}
            links={visibleLinks}
            onHover={onHover}
            onClick={setSelected}
          />
        )}

        {/* Tooltip hover */}
        {hovered && !selected && (
          <div className="absolute z-10 pointer-events-none px-2 py-1.5 rounded border border-slate-800 bg-slate-900/95 shadow-xl"
            style={{ left: hovered.x + 14, top: hovered.y - 8 }}>
            <div className="text-[9px] font-bold font-mono text-slate-200">{hovered.p.label}</div>
            <div className="text-[8px] font-mono" style={{ color: folderColor(hovered.p.folder) }}>{hovered.p.folder}</div>
            <div className="text-[7px] font-mono text-slate-600">{hovered.p.chunk_count} chunk</div>
          </div>
        )}

        {/* Panel selezionato */}
        {selected && (
          <div className="absolute top-3 right-3 z-10 w-52 rounded-xl border p-3 shadow-2xl"
            style={{ borderColor: folderColor(selected.folder) + "40", background: "#030712f0", borderLeftColor: folderColor(selected.folder), borderLeftWidth: 2 }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[10px] font-bold font-mono text-slate-200 break-all">{selected.label}</div>
                <div className="text-[8px] font-mono mt-0.5" style={{ color: folderColor(selected.folder) }}>{selected.folder}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-slate-400 ml-2"><X size={10} /></button>
            </div>
            <div className="flex gap-1.5 mb-2">
              {([["chunk", selected.chunk_count, folderColor(selected.folder)], ["x", selected.x.toFixed(2), "#475569"], ["y", selected.y.toFixed(2), "#475569"], ["z", selected.z.toFixed(2), "#475569"]] as const).map(([k, v, c]) => (
                <div key={k} className="flex-1 p-1 rounded bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[6px] font-mono text-slate-700 uppercase">{k}</div>
                  <div className="text-[9px] font-bold font-mono" style={{ color: c }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="text-[7px] font-mono text-slate-700 break-all">{selected.id}</div>
          </div>
        )}

        {/* Badge */}
        <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded border border-slate-800/60 bg-slate-950/80 pointer-events-none">
          <span className="text-[7px] font-mono text-slate-700">384-dim → t-SNE → 3D</span>
        </div>
      </div>
    </div>
  );
}
