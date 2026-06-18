// App.tsx | TITANIUM_OS | v6.0 | 2026-05-29
// Layout sidebar — navigazione spaziale, design architetturale

import { useEffect, useState, lazy, Suspense, useCallback, Component, Fragment, type ReactNode, type ErrorInfo } from "react";

// ── Error Boundary globale ────────────────────────────────────
class GlobalErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: any) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e: Error) { return { error: e }; }
  componentDidCatch(e: Error, info: ErrorInfo) { console.error("[TITANIUM] crash:", e, info); }
  render() {
    if (this.state.error) return (
      <div style={{ background: "#050a14", color: "#f43f5e", fontFamily: "monospace", padding: 32, height: "100vh", overflow: "auto" }}>
        <div style={{ fontSize: 11, color: "#06b6d4", marginBottom: 8 }}>TITANIUM_OS — RUNTIME ERROR</div>
        <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 16 }}>{this.state.error.message}</div>
        <pre style={{ fontSize: 9, color: "#475569", whiteSpace: "pre-wrap" }}>{this.state.error.stack}</pre>
        <button onClick={() => { this.setState({ error: null }); window.location.reload(); }}
          style={{ marginTop: 24, padding: "8px 16px", background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", cursor: "pointer", borderRadius: 6, fontFamily: "monospace", fontSize: 10 }}>
          RELOAD
        </button>
      </div>
    );
    return this.props.children;
  }
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Home, Box, Cpu, Layers, MessageSquare, Mic,
  Network, Activity, ChevronLeft, ChevronRight, Zap, Terminal,
  FlaskConical, AlertTriangle, Sun, Moon, Presentation, BookOpen, Sparkles, Gauge, Map, Archive, CalendarDays,
} from "lucide-react";
import { useGlobalState } from "./hooks/SystemStateContext";
import { useUIStore, type ViewMode } from "./stores/systemStore";
import { CommandBar } from "./components/CommandBar";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5_000, gcTime: 60_000, retry: 2 } },
});

// Lazy views
const CanvasLayout   = lazy(() => import("./components/CanvasLayout").then(m => ({ default: m.CanvasLayout })));
const AgentsView     = lazy(() => import("./components/AgentsView").then(m => ({ default: m.AgentsView })));
const NeuroOSLayout  = lazy(() => import("./components/NeuroOSLayout").then(m => ({ default: m.NeuroOSLayout })));
const LayersView     = lazy(() => import("./components/LayersView"));
const StorieView     = lazy(() => import("./components/StorieView").then(m => ({ default: m.StorieView })));
const RagGraphView   = lazy(() => import("./components/RagGraphView").then(m => ({ default: m.RagGraphView })));
const MappaView          = lazy(() => import("./components/MappaView").then(m => ({ default: m.MappaView })));
const AutomationsView    = lazy(() => import("./components/AutomationsView").then(m => ({ default: m.AutomationsView })));
const NotturneView       = lazy(() => import("./components/AutomationsView").then(m => ({ default: m.NotturneView })));
const PitchView          = lazy(() => import("./components/PitchView").then(m => ({ default: m.PitchView })));
const MetodoView         = lazy(() => import("./components/MetodoView").then(m => ({ default: m.MetodoView })));
const RagChatView        = lazy(() => import("./components/RagChatView").then(m => ({ default: m.RagChatView })));
const ControlloView      = lazy(() => import("./components/ControlloView").then(m => ({ default: m.ControlloView })));
const AvventuraMapView   = lazy(() => import("./components/AvventuraMapView").then(m => ({ default: m.AvventuraMapView })));
const ProcedimentiView   = lazy(() => import("./components/ProcedimentiView").then(m => ({ default: m.ProcedimentiView })));
const InventarioView     = lazy(() => import("./components/InventarioView").then(m => ({ default: m.InventarioView })));
const CvView             = lazy(() => import("./components/CvView").then(m => ({ default: m.CvView })));
const NinaCvView         = lazy(() => import("./components/NinaCvView").then(m => ({ default: m.NinaCvView })));
const MappaGiocoView     = lazy(() => import("./components/MappaGiocoView").then(m => ({ default: m.MappaGiocoView })));
const PitchProgettoView  = lazy(() => import("./components/PitchProgettoView").then(m => ({ default: m.PitchProgettoView })));
const SpiegaPilastroView = lazy(() => import("./components/SpiegaPilastroView").then(m => ({ default: m.SpiegaPilastroView })));
const CalendarioView     = lazy(() => import("./components/CalendarioView").then(m => ({ default: m.CalendarioView })));

// ── SIDEBAR CONFIG ────────────────────────────────────────────────────────────
interface NavItem {
  id: ViewMode;
  label: string;
  icon: typeof Home;
  color: string;
  group: "pillars" | "system";
  dot?: string;        // colore dot status
}

const NAV_ITEMS: NavItem[] = [
  // Pilastri
  { id: "home",     label: "HOME",     icon: Home,          color: "text-slate-300",  group: "pillars", dot: "bg-emerald-500" },
  { id: "v32",      label: "V32",      icon: Box,           color: "text-emerald-400",group: "pillars", dot: "bg-emerald-400" },
  { id: "genesis",  label: "GENESIS",  icon: Cpu,           color: "text-cyan-400",   group: "pillars", dot: "bg-cyan-400"    },
  { id: "mims",     label: "MIMS",     icon: Layers,        color: "text-amber-400",  group: "pillars", dot: "bg-amber-400"   },
  { id: "eva",      label: "EVA",      icon: MessageSquare, color: "text-violet-400", group: "pillars", dot: "bg-violet-400"  },
  { id: "identity", label: "CV",       icon: Network,       color: "text-slate-400",  group: "pillars", dot: "bg-slate-400"   },
  // Sistema
  { id: "controllo",   label: "CONTROLLO",   icon: Gauge,         color: "text-emerald-300", group: "system", dot: "bg-emerald-400" },
  { id: "pitch",       label: "PITCH",       icon: Presentation,  color: "text-emerald-300", group: "system", dot: "bg-emerald-400" },
  { id: "metodo",      label: "METODO",      icon: BookOpen,      color: "text-cyan-300",   group: "system" },
  { id: "automazioni", label: "AUTOMAZIONI", icon: FlaskConical,  color: "text-amber-400",  group: "system", dot: "bg-amber-400"   },
  { id: "storie",      label: "STORIE",     icon: Mic,           color: "text-rose-400",   group: "system"  },
  { id: "mappa",       label: "MAPPA NINA",  icon: Map,         color: "text-pink-400",   group: "system"  },
  { id: "rete",        label: "INVENTARIO", icon: Archive,       color: "text-cyan-400",   group: "system"  },
  { id: "calendario",  label: "CALENDARIO", icon: CalendarDays,  color: "text-indigo-300", group: "system", dot: "bg-indigo-400" },
  { id: "critiche",    label: "CRITICHE",   icon: AlertTriangle, color: "text-rose-400",   group: "system", dot: "bg-rose-500" },
];

const PILLAR_COLORS: Record<string, { bar: string; text: string }> = {
  V32:         { bar: "bg-emerald-500", text: "text-emerald-400" },
  GENESIS:     { bar: "bg-cyan-500",    text: "text-cyan-400" },
  MIMS:        { bar: "bg-amber-500",   text: "text-amber-400" },
  VITA_NATURA: { bar: "bg-violet-500",  text: "text-violet-400" },
  IDENTITY:    { bar: "bg-slate-500",   text: "text-slate-400" },
};

// ── CLOCK ─────────────────────────────────────────────────────────────────────
function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-[9px] font-mono text-slate-600 tabular-nums">
      {now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ view, onNavigate, collapsed, onToggle, pillars, online }: {
  view: ViewMode;
  onNavigate: (v: ViewMode) => void;
  collapsed: boolean;
  onToggle: () => void;
  pillars: Record<string, any>;
  online: boolean;
}) {
  const pillarItems = NAV_ITEMS.filter(n => n.group === "pillars");
  const systemItems = NAV_ITEMS.filter(n => n.group === "system");

  const NavBtn = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const isActive = view === item.id;
    const pct = item.id === "v32" ? pillars?.V32?.pct_complete
              : item.id === "genesis" ? pillars?.GENESIS?.pct_complete
              : item.id === "mims" ? pillars?.MIMS?.pct_complete
              : item.id === "eva" ? pillars?.VITA_NATURA?.pct_complete
              : item.id === "identity" ? pillars?.IDENTITY?.pct_complete
              : null;

    return (
      <button
        onClick={() => onNavigate(item.id)}
        title={item.label}
        className={`group relative w-full flex items-center gap-3 rounded-xl transition-all duration-200
          ${collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5"}
          ${isActive
            ? `bg-slate-800/80 ${item.color} border border-slate-700/60`
            : "text-slate-600 hover:text-slate-300 hover:bg-slate-800/40 border border-transparent"
          }`}
      >
        {/* Active indicator */}
        {isActive && (
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full ${
            item.dot ?? "bg-slate-400"
          }`} />
        )}

        <Icon size={15} className="flex-shrink-0" />

        {!collapsed && (
          <>
            <span className="text-[10px] font-bold font-mono uppercase tracking-widest flex-1 text-left">
              {item.label}
            </span>
            {pct != null && (
              <span className={`text-[8px] font-mono tabular-nums ${item.color} opacity-60`}>
                {pct}%
              </span>
            )}
          </>
        )}

        {/* Tooltip quando collapsed */}
        {collapsed && (
          <div className="absolute left-full ml-2 z-50 hidden group-hover:flex items-center
                          bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 whitespace-nowrap
                          shadow-xl">
            <span className={`text-[10px] font-mono font-bold uppercase ${item.color}`}>{item.label}</span>
            {pct != null && <span className="text-[9px] text-slate-500 ml-1.5 font-mono">{pct}%</span>}
          </div>
        )}
      </button>
    );
  };

  return (
    <aside className={`flex-shrink-0 flex flex-col border-r border-slate-800/60 transition-all duration-300
                        ${collapsed ? "w-14" : "w-52"}`}
           style={{ background: "var(--shell-panel)" }}>

      {/* Logo */}
      <div className={`flex-shrink-0 h-12 flex items-center border-b border-slate-800/60
                        ${collapsed ? "justify-center" : "px-4 gap-2.5"}`}>
        <div className="w-6 h-6 border border-emerald-500/40 rounded-lg flex items-center justify-center
                        bg-emerald-500/5 flex-shrink-0">
          <Zap size={11} className="text-emerald-400" />
        </div>
        {!collapsed && (
          <div className="leading-none">
            <div className="text-[10px] font-black tracking-[0.15em] uppercase text-slate-100">TITANIUM</div>
            <div className="text-[6px] text-slate-600 tracking-[0.3em] uppercase">OS v6.0</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {/* Pilastri */}
        {!collapsed && (
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-[0.3em] px-3 py-2">
            Pilastri
          </div>
        )}
        {pillarItems.map(item => (
          <Fragment key={item.id}>
            <NavBtn item={item} />
            {/* Sotto-voce: CV Nina — annidata sotto CV (identity), rosa */}
            {item.id === "identity" && !collapsed && (
              <button
                onClick={() => onNavigate("cv-nina")}
                title="Il CV di Nina — l'albero delle abilità che si riempie dagli episodi"
                className={`group relative w-full flex items-center gap-2 rounded-lg transition-all duration-200 pl-9 pr-3 py-1.5
                  ${view === "cv-nina"
                    ? "bg-pink-950/40 text-pink-300 border border-pink-500/30"
                    : "text-slate-600 hover:text-pink-300 hover:bg-pink-950/20 border border-transparent"}`}
              >
                <Sparkles size={11} className="flex-shrink-0 text-pink-400" />
                <span className="text-[9px] font-semibold font-mono uppercase tracking-wider flex-1 text-left">
                  CV Nina
                </span>
              </button>
            )}
          </Fragment>
        ))}

        {/* Separatore */}
        <div className="my-2 border-t border-slate-800/60" />

        {!collapsed && (
          <div className="text-[7px] font-mono text-slate-700 uppercase tracking-[0.3em] px-3 py-2">
            Sistema
          </div>
        )}
        {systemItems.map(item => (
          <Fragment key={item.id}>
            <NavBtn item={item} />
            {/* Sotto-voce: Notturne — annidata sotto AUTOMAZ., piccola e blu */}
            {item.id === "automazioni" && !collapsed && (
              <button
                onClick={() => onNavigate("notturne")}
                title="Automazioni notturne — schedulate"
                className={`group relative w-full flex items-center gap-2 rounded-lg transition-all duration-200 pl-9 pr-3 py-1.5
                  ${view === "notturne"
                    ? "bg-sky-950/40 text-sky-300 border border-sky-500/30"
                    : "text-slate-600 hover:text-sky-300 hover:bg-sky-950/20 border border-transparent"}`}
              >
                <Moon size={11} className="flex-shrink-0 text-sky-400" />
                <span className="text-[9px] font-semibold font-mono uppercase tracking-wider flex-1 text-left">
                  Notturne
                </span>
              </button>
            )}
            {/* Sotto-voci di PITCH: un pitch per progetto (la spiegazione vera, non i pilastri obsoleti) */}
            {item.id === "pitch" && !collapsed && (
              <>
                {([["pitch-nina", "Nina"], ["pitch-mims", "MIMS"], ["pitch-v32", "V32"], ["pitch-genesis", "GENESIS"], ["pitch-eva", "EVA"], ["pitch-hr", "HR"]] as const).map(([vm, lbl]) => (
                  <button key={vm} onClick={() => onNavigate(vm)}
                    title={`Pitch ${lbl} — la spiegazione reale e attuale del progetto`}
                    className={`group relative w-full flex items-center gap-2 rounded-lg transition-all duration-200 pl-9 pr-3 py-1
                      ${view === vm
                        ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/30"
                        : "text-slate-600 hover:text-emerald-300 hover:bg-emerald-950/20 border border-transparent"}`}>
                    <span className="text-[9px] font-semibold font-mono uppercase tracking-wider flex-1 text-left">{lbl}</span>
                  </button>
                ))}
              </>
            )}
            {/* Sotto-voci di STORIE: NINA (episodi) + Mappa dell'Avventura (rosa, binario educativo) */}
            {item.id === "storie" && !collapsed && (
              <>
                <button
                  onClick={() => onNavigate("avventura")}
                  title="Nina — gli episodi dell'Avventura (stagione AV)"
                  className={`group relative w-full flex items-center gap-2 rounded-lg transition-all duration-200 pl-9 pr-3 py-1.5
                    ${view === "avventura"
                      ? "bg-pink-950/40 text-pink-300 border border-pink-500/30"
                      : "text-slate-600 hover:text-pink-300 hover:bg-pink-950/20 border border-transparent"}`}
                >
                  <Sparkles size={11} className="flex-shrink-0 text-pink-400" />
                  <span className="text-[9px] font-semibold font-mono uppercase tracking-wider flex-1 text-left">
                    Nina
                  </span>
                </button>
              </>
            )}
            {/* Sotto-voce: Mappa-Gioco — annidata sotto MAPPA NINA */}
            {item.id === "mappa" && !collapsed && (
              <button
                onClick={() => onNavigate("mappa-gioco")}
                title="Mappa-gioco 2D — zone, livelli, entri nei luoghi (stile Skyrim)"
                className={`group relative w-full flex items-center gap-2 rounded-lg transition-all duration-200 pl-9 pr-3 py-1.5
                  ${view === "mappa-gioco"
                    ? "bg-pink-950/40 text-pink-300 border border-pink-500/30"
                    : "text-slate-600 hover:text-pink-300 hover:bg-pink-950/20 border border-transparent"}`}
              >
                <Map size={11} className="flex-shrink-0 text-pink-400/80" />
                <span className="text-[9px] font-semibold font-mono uppercase tracking-wider flex-1 text-left">
                  Gioco
                </span>
              </button>
            )}
          </Fragment>
        ))}
      </nav>

      {/* Footer sidebar */}
      <div className={`flex-shrink-0 p-2 border-t border-slate-800/60 space-y-1`}>
        {/* Status online — cliccabile: apre i Procedimenti (come gira il sistema) */}
        <button
          onClick={() => onNavigate("procedimenti")}
          title="API live — clicca: come gira il sistema (apertura, profilo, automazioni)"
          className={`group w-full flex items-center gap-2 rounded-lg transition-all
            ${collapsed ? "justify-center px-0 py-2" : "px-3 py-1.5"}
            ${view === "procedimenti" ? "bg-slate-800/70" : "hover:bg-slate-800/40"}`}
        >
          <Activity size={9} className={online ? "text-emerald-500" : "text-slate-600"} />
          {!collapsed && (
            <span className={`text-[8px] font-mono uppercase tracking-widest flex-1 text-left ${online ? "text-emerald-500/70" : "text-slate-600"}`}>
              {online ? "API live" : "offline"}
            </span>
          )}
          {!collapsed && (
            <span className="text-[7px] font-mono text-slate-700 group-hover:text-slate-400 uppercase">info</span>
          )}
        </button>
        {/* Toggle collapse */}
        <button onClick={onToggle}
          className="w-full flex items-center justify-center py-2 rounded-lg
                     text-slate-700 hover:text-slate-400 hover:bg-slate-800/40 transition-all">
          {collapsed
            ? <ChevronRight size={12} />
            : <ChevronLeft size={12} />}
        </button>
      </div>
    </aside>
  );
}

// ── BOTTOM STATUS BAR ─────────────────────────────────────────────────────────
function StatusBar({ pillars, milestone }: { pillars: Record<string, any>; milestone: string }) {
  const order = ["V32", "GENESIS", "MIMS", "VITA_NATURA", "IDENTITY"];
  return (
    <div className="flex-shrink-0 h-7 border-t border-slate-800/40 px-4 flex items-center gap-5
                    bg-slate-950/80 backdrop-blur-sm">
      <span className="text-[8px] font-mono text-slate-700 uppercase tracking-widest flex-shrink-0 hidden sm:block">
        {milestone?.slice(0, 30)}
      </span>
      <div className="flex-1 flex items-center gap-4 justify-end">
        {order.map(id => {
          const p = pillars?.[id];
          if (!p) return null;
          const pct = p.pct_complete ?? 0;
          const c = PILLAR_COLORS[id] ?? { bar: "bg-slate-500", text: "text-slate-400" };
          const label = id === "VITA_NATURA" ? "EVA" : id;
          return (
            <div key={id} className="flex items-center gap-1.5">
              <span className={`text-[7px] font-mono font-bold tracking-widest ${c.text} w-10 truncate`}>{label}</span>
              <div className="w-14 h-1 rounded-full bg-slate-800 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${c.bar}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[7px] font-mono text-slate-600 tabular-nums w-5">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── VIEW LOADER ───────────────────────────────────────────────────────────────
function ViewLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border border-slate-700 rounded-xl flex items-center justify-center">
          <Zap size={14} className="text-emerald-400/50 animate-pulse" />
        </div>
        <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">caricamento</span>
      </div>
    </div>
  );
}

// ── INNER APP ─────────────────────────────────────────────────────────────────
function AppInner() {
  const sys = useGlobalState();
  const view = useUIStore(s => s.view) as ViewMode;
  const setView = useUIStore(s => s.setView);
  const collapsed = useUIStore(s => s.sidebarCollapsed);
  const toggleSidebar = useUIStore(s => s.toggleSidebar);
  const theme = useUIStore(s => s.theme);
  const toggleTheme = useUIStore(s => s.toggleTheme);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Applica il tema al root (CSS [data-theme] -> token shell)
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const navigate = useCallback((v: ViewMode) => setView(v), [setView]);
  const pillars = sys.state?.pillars ?? {};
  const milestone = sys.state?.active_milestone ?? "";

  // Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setCmdOpen(o => !o); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden"
         style={{ background: "var(--shell-bg)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>

      <CommandBar open={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={navigate as any} />

      {/* ── TOP STRIP (12px) — linea live ── */}
      <div className="flex-shrink-0 h-8 border-b border-slate-800/50 flex items-center justify-between px-4"
           style={{ background: "var(--shell-strip)" }}>
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full ${sys.isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-700"}`} />
          <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest hidden sm:block">
            {sys.isOnline ? "sistema live" : "offline"}
          </span>
          <div className="h-3 w-px bg-slate-800" />
          <span className="text-[8px] font-mono text-slate-500">{milestone?.slice(0, 40)}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme}
            title={theme === "dark" ? "Tema chiaro" : "Tema scuro"}
            className="flex items-center text-slate-500 hover:text-amber-400 transition-colors">
            {theme === "dark" ? <Sun size={11} /> : <Moon size={11} />}
          </button>
          <Clock />
          <button onClick={() => setCmdOpen(true)}
            className="flex items-center gap-1 text-[8px] font-mono text-slate-600 hover:text-slate-300
                       border border-slate-800 hover:border-slate-600 rounded px-1.5 py-0.5 transition-all">
            <Terminal size={8} />
            <span className="hidden sm:inline">⌃K</span>
          </button>
          <a href="/api/state" target="_blank" rel="noopener"
             className="text-[8px] font-mono text-slate-700 hover:text-emerald-400 transition-colors">
            STATE
          </a>
        </div>
      </div>

      {/* ── BODY: SIDEBAR + MAIN ── */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          view={view}
          onNavigate={navigate}
          collapsed={collapsed}
          onToggle={toggleSidebar}
          pillars={pillars}
          online={sys.isOnline}
        />

        {/* Main content */}
        <main className="flex-1 overflow-hidden relative">
          {/* Glow radiale soffuso — profondità premium (token tema) */}
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 background: "radial-gradient(1100px 480px at 12% -8%, var(--glow-a), transparent 60%), radial-gradient(900px 460px at 100% -5%, var(--glow-b), transparent 55%)",
               }} />
          {/* Dot grid decorativo — fondo (token tema) */}
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 backgroundImage: "radial-gradient(circle, var(--dotgrid) 1px, transparent 1px)",
                 backgroundSize: "28px 28px",
               }} />

          <Suspense fallback={<ViewLoader />}>
            {/* Pilastri — usa CanvasLayout con room specifica */}
            {view === "home"     && <CanvasLayout room="home" />}
            {view === "v32"      && <SpiegaPilastroView pilastro="v32" />}
            {view === "genesis"  && <SpiegaPilastroView pilastro="genesis" />}
            {view === "mims"     && <SpiegaPilastroView pilastro="mims" />}
            {view === "eva"      && <SpiegaPilastroView pilastro="eva" />}
            {view === "identity"  && <CvView />}
            {view === "cv-nina"   && <NinaCvView />}
            {view === "critiche"  && <CanvasLayout room="critiche" />}
            {/* Sistema */}
            {view === "agenti"      && <AgentsView />}
            {view === "automazioni" && (
              <div className="h-full overflow-y-auto">
                <div className="max-w-5xl mx-auto px-5 py-5">
                  <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FlaskConical size={10} className="text-amber-400" />
                    <span className="text-amber-400/70">Automazioni</span>
                    <span className="text-slate-700">— pipeline live del sistema</span>
                  </div>
                  <AutomationsView />
                </div>
              </div>
            )}
            {view === "notturne"    && (
              <div className="h-full overflow-y-auto">
                <div className="max-w-5xl mx-auto px-5 py-5">
                  <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Moon size={10} className="text-sky-400" />
                    <span className="text-sky-400/70">Automazioni notturne</span>
                    <span className="text-slate-700">— schedulate su Task Scheduler</span>
                  </div>
                  <NotturneView />
                </div>
              </div>
            )}
            {view === "controllo"   && <ControlloView />}
            {view === "procedimenti" && <ProcedimentiView />}
            {view === "avventura-mappa" && <AvventuraMapView />}
            {view === "storie"      && <StorieView />}
            {view === "avventura"   && <StorieView initialStagione="AV" />}
            {view === "pitch"       && <PitchView />}
            {view === "pitch-nina"    && <PitchProgettoView progetto="nina" />}
            {view === "pitch-mims"    && <PitchProgettoView progetto="mims" />}
            {view === "pitch-v32"     && <PitchProgettoView progetto="v32" />}
            {view === "pitch-genesis" && <PitchProgettoView progetto="genesis" />}
            {view === "pitch-eva"     && <PitchProgettoView progetto="eva" />}
            {view === "pitch-hr"      && <PitchProgettoView progetto="hr" />}
            {view === "metodo"      && <MetodoView />}
            {view === "mappa"    && <MappaView source="nina" systemState={sys.state as any} />}
            {view === "mappa-gioco" && <MappaGiocoView />}
            {view === "rete"     && <InventarioView />}
            {view === "calendario" && <CalendarioView />}
            {view === "ragchat"  && <RagChatView />}
            {/* Legacy — rimossi dalla sidebar ma ancora raggiungibili via CommandBar */}
            {view === "sinapsi"  && <LayersView />}
            {view === "canvas"   && <CanvasLayout room="home" />}
            {view === "neuro"    && <NeuroOSLayout systemState={sys.state} />}
            {view === "architettura" && <MappaView systemState={sys.state as any} />}
            {view === "grafo-rag" && <RagGraphView />}
          </Suspense>
        </main>
      </div>

      {/* ── STATUS BAR BOTTOM ── */}
      <StatusBar pillars={pillars} milestone={milestone} />
    </div>
  );
}

export default function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppInner />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
