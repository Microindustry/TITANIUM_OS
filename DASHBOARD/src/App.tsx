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
  FlaskConical, Moon, BookOpen, Sparkles, Gauge, Map, Archive, CalendarDays, Bot, Send, Landmark,
} from "lucide-react";
import { useGlobalState } from "./hooks/SystemStateContext";
import { useUIStore, type ViewMode } from "./stores/systemStore";
import { PageKicker } from "./components/UIComponents";
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
const PubblicazioniView  = lazy(() => import("./components/PubblicazioniView").then(m => ({ default: m.PubblicazioniView })));
const ValoreView         = lazy(() => import("./components/ValoreView").then(m => ({ default: m.ValoreView })));
const MappaAlberoView    = lazy(() => import("./components/MappaAlberoView").then(m => ({ default: m.MappaAlberoView })));
const GiocoView          = lazy(() => import("./components/GiocoView").then(m => ({ default: m.GiocoView })));

// ── SIDEBAR CONFIG — 3 FACCE (decisione Matteo 08/07, sess #56) ───────────────
// TITANIUM = il sistema (pilastri + governo) · NINA = il prodotto educativo ·
// PUBBLICAZIONI = l'output verso il mondo. Stessi id/view (deep-link intatti),
// cambia solo il raggruppamento.
interface NavItem {
  id: ViewMode;
  label: string;
  icon: typeof Home;
  color: string;
  group: "pillars" | "hr" | "system" | "storie" | "nina" | "pub";
  dot?: string;        // colore dot status
}

const NAV_ITEMS: NavItem[] = [
  // TITANIUM · Pilastri
  { id: "home",     label: "HOME",     icon: Home,          color: "text-slate-300",  group: "pillars", dot: "bg-emerald-500" },
  { id: "v32",      label: "V32",      icon: Box,           color: "text-emerald-400",group: "pillars", dot: "bg-emerald-400" },
  { id: "genesis",  label: "GENESIS",  icon: Cpu,           color: "text-cyan-400",   group: "pillars", dot: "bg-cyan-400"    },
  { id: "mims",     label: "MIMS",     icon: Layers,        color: "text-amber-400",  group: "pillars", dot: "bg-amber-400"   },
  { id: "eva",      label: "EVA",      icon: MessageSquare, color: "text-violet-400", group: "pillars", dot: "bg-violet-400"  },
  // HR — il motore sulla persona: voce NAVIGABILE (pagina pilastro); CV e CV NINA sotto-voci annidate
  { id: "hr",       label: "HR",       icon: Network,       color: "text-slate-300",  group: "hr", dot: "bg-slate-400"   },
  // TITANIUM · Sistema — PITCH eliminato dalla barra (#57): vive DENTRO ogni pilastro (tab);
  // la vista "pitch" (Modalità Presentazione) resta raggiungibile dal bottone in home
  { id: "controllo",   label: "CONTROLLO",   icon: Gauge,         color: "text-emerald-300", group: "system", dot: "bg-emerald-400" },
  { id: "valore",      label: "VALORE",      icon: Landmark,      color: "text-emerald-300", group: "system", dot: "bg-emerald-400" },
  { id: "metodo",      label: "METODO",      icon: BookOpen,      color: "text-cyan-300",   group: "system" },
  { id: "automazioni", label: "AUTOMAZIONI", icon: FlaskConical,  color: "text-amber-400",  group: "system", dot: "bg-amber-400"   },
  // ── SISTEMA (le storie, voce Matteo) — faccia propria come Nina (#58, ordine Matteo) ──
  { id: "storie",          label: "EPISODI",      icon: Mic,      color: "text-rose-400",   group: "storie", dot: "bg-rose-400" },
  { id: "sistema-giorno0", label: "DAL GIORNO 0", icon: BookOpen, color: "text-rose-400",   group: "storie", dot: "bg-rose-400" },
  { id: "sistema-guida",   label: "LINEA GUIDA",  icon: Map,      color: "text-rose-400",   group: "storie", dot: "bg-rose-400" },
  { id: "rete",        label: "INVENTARIO", icon: Archive,       color: "text-cyan-400",   group: "system"  },
  { id: "calendario",  label: "CALENDARIO", icon: CalendarDays,  color: "text-indigo-300", group: "system", dot: "bg-indigo-400" },
  // NINA — il prodotto educativo (pagina pilastro in cima; l'Archivio è sotto-voce di DAL GIORNO 0)
  { id: "nina-pilastro", label: "NINA",         icon: Bot,      color: "text-pink-400", group: "nina", dot: "bg-pink-400" },
  { id: "nina-giorno0",  label: "DAL GIORNO 0", icon: Sparkles, color: "text-pink-400", group: "nina", dot: "bg-pink-400" },
  { id: "nina-guida",    label: "LINEA GUIDA",  icon: Map,      color: "text-pink-400", group: "nina", dot: "bg-pink-400" },
  { id: "gioco",         label: "GIOCO",        icon: Bot,      color: "text-pink-400", group: "nina" },
  { id: "mappa",         label: "MAPPA",        icon: Map,      color: "text-pink-400", group: "nina" },
  // PUBBLICAZIONI — l'output verso il mondo
  { id: "pubblicazioni", label: "PUBBLICAZIONI", icon: Send, color: "text-orange-300", group: "pub", dot: "bg-orange-400" },
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
  const hrItems     = NAV_ITEMS.filter(n => n.group === "hr");
  const systemItems = NAV_ITEMS.filter(n => n.group === "system");
  const storieItems = NAV_ITEMS.filter(n => n.group === "storie");
  const ninaItems   = NAV_ITEMS.filter(n => n.group === "nina");
  const pubItems    = NAV_ITEMS.filter(n => n.group === "pub");

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
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
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

      {/* Nav — 3 FACCE: Titanium (pilastri+sistema) · Nina · Pubblicazioni */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {/* ══ FACCIA 1 · TITANIUM ══ */}
        {!collapsed && (
          <div className="text-[7px] font-mono text-emerald-600/80 uppercase tracking-[0.3em] px-3 py-2">
            Titanium · Pilastri
          </div>
        )}
        {pillarItems.map(item => <NavBtn key={item.id} item={item} />)}

        {/* ══ HR — voce navigabile + CV/CV NINA annidate; senza titoletto di sezione
            (correzione Matteo 09/07: ridondante — HR parla da sé, in coda ai pilastri) ══ */}
        {hrItems.map(item => (
          <Fragment key={item.id}>
            <NavBtn item={item} />
            {!collapsed && ([
              ["identity", "CV", "text-slate-400", "slate"],
              ["cv-nina", "CV Nina", "text-pink-400", "pink"],
            ] as const).map(([vm, lbl, iconCol, tone]) => (
              <button key={vm} onClick={() => onNavigate(vm as ViewMode)}
                title={vm === "identity" ? "Il CV vivo di Matteo — prima istanza del motore" : "Il CV di Nina — l'albero che si riempie dagli episodi"}
                className={`group relative w-full flex items-center gap-2 rounded-lg transition-all duration-200 pl-9 pr-3 py-1.5
                  ${view === vm
                    ? (tone === "pink" ? "bg-pink-950/40 text-pink-300 border border-pink-500/30" : "bg-slate-800/60 text-slate-200 border border-slate-600/40")
                    : (tone === "pink" ? "text-slate-600 hover:text-pink-300 hover:bg-pink-950/20 border border-transparent" : "text-slate-600 hover:text-slate-300 hover:bg-slate-800/40 border border-transparent")}`}>
                {vm === "identity"
                  ? <Network size={11} className={`flex-shrink-0 ${iconCol}`} />
                  : <Sparkles size={11} className={`flex-shrink-0 ${iconCol}`} />}
                <span className="text-[9px] font-semibold font-mono uppercase tracking-wider flex-1 text-left">{lbl}</span>
              </button>
            ))}
          </Fragment>
        ))}

        {!collapsed && (
          <div className="text-[7px] font-mono text-emerald-600/80 uppercase tracking-[0.3em] px-3 py-2">
            Titanium · Sistema
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
            {/* (#57) le sotto-voci PITCH sono state UNIFICATE dentro i pilastri (tab Pitch
                in ogni pagina pilastro); le viste pitch-* restano per i deep-link */}
          </Fragment>
        ))}

        {/* ══ SISTEMA — le storie di sistema (voce Matteo), faccia propria come Nina (#58) ══ */}
        <div className="my-2 border-t border-slate-800/60" />
        {!collapsed && (
          <div className="text-[7px] font-mono text-rose-500/80 uppercase tracking-[0.3em] px-3 py-2">
            Sistema
          </div>
        )}
        {storieItems.map(item => <NavBtn key={item.id} item={item} />)}

        {/* ══ FACCIA 2 · NINA — il prodotto educativo ══ */}
        <div className="my-2 border-t border-slate-800/60" />
        {!collapsed && (
          <div className="text-[7px] font-mono text-pink-500/80 uppercase tracking-[0.3em] px-3 py-2">
            Nina
          </div>
        )}
        {ninaItems.map(item => (
          <Fragment key={item.id}>
            <NavBtn item={item} />
            {/* (#57, Matteo) Archivio TOLTO dalla barra: "a lv di visuale inutile, basta
                tenere i dati" — i dati restano (MENTE/_ARCHIVIO + episodes.json), la vista
                nina-archivio resta raggiungibile da CommandBar/deep-link. Reversibile. */}
            {/* (#57, Matteo) Mappa-Gioco TOLTA dalla barra ("il serpentone non va bene
                come percorso"): superata dall'albero (missioni per regione). La vista
                mappa-gioco resta deep-link; il mondo ILLUSTRATO degno si fa nel
                prodotto (caroselli/sito), non con 3 triangoli in dash. */}
          </Fragment>
        ))}

        {/* ══ FACCIA 3 · PUBBLICAZIONI — l'output verso il mondo ══ */}
        <div className="my-2 border-t border-slate-800/60" />
        {!collapsed && (
          <div className="text-[7px] font-mono text-orange-500/80 uppercase tracking-[0.3em] px-3 py-2">
            Pubblicazioni
          </div>
        )}
        {pubItems.map(item => <NavBtn key={item.id} item={item} />)}
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
  // const toggleTheme = useUIStore(s => s.toggleTheme); // (#57 P9) riattivare col light completo
  const [cmdOpen, setCmdOpen] = useState(false);

  // (#57 P9) tema FORZATO dark: la "tappa 2" del light non è mai stata fatta (card
  // interne hardcoded dark) — mostrare il toggle esponeva un tema rotto. Infra
  // tema intatta: quando il light sarà completo, ripristinare `theme` qui e il bottone.
  useEffect(() => { document.documentElement.dataset.theme = "dark"; }, [theme]);

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
          {/* (#57 P9) toggle tema NASCOSTO finché il light non è completo — codice sotto intatto:
          <button onClick={toggleTheme} title={theme === "dark" ? "Tema chiaro" : "Tema scuro"}
            className="flex items-center text-slate-500 hover:text-amber-400 transition-colors">
            {theme === "dark" ? <Sun size={11} /> : <Moon size={11} />}
          </button> */}
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
            {view === "nina-pilastro" && <SpiegaPilastroView pilastro="nina" />}
            {view === "hr"       && <SpiegaPilastroView pilastro="hr" />}
            {view === "identity"  && <CvView />}
            {view === "cv-nina"   && <NinaCvView />}
            {/* Sistema */}
            {view === "agenti"      && <AgentsView />}
            {view === "automazioni" && (
              <div className="h-full overflow-y-auto">
                <div className="max-w-5xl mx-auto px-5 py-5">
                  <PageKicker icon={FlaskConical} color="text-amber-400/70" sub="pipeline live del sistema">Automazioni</PageKicker>
                  <AutomationsView />
                </div>
              </div>
            )}
            {view === "notturne"    && (
              <div className="h-full overflow-y-auto">
                <div className="max-w-5xl mx-auto px-5 py-5">
                  <PageKicker icon={Moon} color="text-sky-400/70" sub="schedulate su Task Scheduler">Automazioni notturne</PageKicker>
                  <NotturneView />
                </div>
              </div>
            )}
            {view === "controllo"   && <ControlloView />}
            {view === "procedimenti" && <ProcedimentiView />}
            {view === "avventura-mappa" && <AvventuraMapView />}
            {view === "storie"      && <StorieView />}
            {view === "sistema-giorno0" && <StorieView sistemaView="giorno0" />}
            {view === "sistema-guida"   && <StorieView sistemaView="guida" />}
            {view === "avventura"   && <StorieView initialStagione="AV" />}
            {view === "nina-giorno0"  && <StorieView ninaView="giorno0" />}
            {view === "nina-guida"    && <StorieView ninaView="guida" />}
            {view === "nina-archivio" && <StorieView ninaView="rag" />}
            {view === "pitch"       && <PitchView />}
            {view === "valore"      && <ValoreView />}
            {view === "pitch-nina"    && <PitchProgettoView progetto="nina" />}
            {view === "pitch-mims"    && <PitchProgettoView progetto="mims" />}
            {view === "pitch-v32"     && <PitchProgettoView progetto="v32" />}
            {view === "pitch-genesis" && <PitchProgettoView progetto="genesis" />}
            {view === "pitch-eva"     && <PitchProgettoView progetto="eva" />}
            {view === "pitch-hr"      && <PitchProgettoView progetto="hr" />}
            {view === "metodo"      && <MetodoView />}
            {/* (#57) MAPPA = l'albero derivato (integra le 3 mappe, non le distrugge):
                la geo radiale resta su mappa-geo, gioco/avventura sui loro deep-link */}
            {view === "mappa"     && <MappaAlberoView />}
            {view === "mappa-geo" && <MappaView source="nina" systemState={sys.state as any} />}
            {view === "gioco"     && <GiocoView />}
            {view === "mappa-gioco" && <MappaGiocoView />}
            {view === "rete"     && <InventarioView />}
            {view === "calendario" && <CalendarioView />}
            {view === "pubblicazioni" && <PubblicazioniView />}
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
