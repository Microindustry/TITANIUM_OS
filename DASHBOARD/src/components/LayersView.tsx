// LayersView.tsx — Vista caselle drill-down immersiva a layer
// Parte di: TITANIUM_OS / DASHBOARD
// Versione: 2.0 | Data: 2026-03-17

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Plus, ArrowLeft, Layers, CheckCircle2, Circle, Clock, Zap } from 'lucide-react';
import { LAYERS_DATA, type Layer, type LayerStatus, type LayerColor } from '../data/layersData';

// ── Colori per status ───────────────────────────────────────────────────────
const STATUS_CONFIG: Record<LayerStatus, { dot: string; badge: string; label: string; glow: string }> = {
  active:   { dot: 'bg-emerald-400',              badge: 'bg-emerald-500/10 text-emerald-400',  label: 'ATTIVO',   glow: 'rgba(16,185,129,0.15)' },
  building: { dot: 'bg-cyan-400 animate-pulse',   badge: 'bg-cyan-500/10 text-cyan-400',        label: 'BUILD',    glow: 'rgba(6,182,212,0.15)'  },
  pending:  { dot: 'bg-amber-400',                badge: 'bg-amber-500/10 text-amber-400',      label: 'PENDING',  glow: 'rgba(245,158,11,0.12)' },
  future:   { dot: 'bg-slate-500',               badge: 'bg-slate-700/50 text-slate-400',      label: 'FUTURO',   glow: 'rgba(100,116,139,0.08)'},
};

const COLOR_HEX: Record<LayerColor, string> = {
  emerald: '#10b981',
  cyan:    '#06b6d4',
  indigo:  '#6366f1',
  amber:   '#f59e0b',
  slate:   '#64748b',
  pink:    '#ec4899',
  violet:  '#8b5cf6',
};

const COLOR_TEXT: Record<LayerColor, string> = {
  emerald: 'text-emerald-400',
  cyan:    'text-cyan-400',
  indigo:  'text-indigo-400',
  amber:   'text-amber-400',
  slate:   'text-slate-400',
  pink:    'text-pink-400',
  violet:  'text-violet-400',
};

const COLOR_BG: Record<LayerColor, string> = {
  emerald: 'bg-emerald-500/10',
  cyan:    'bg-cyan-500/10',
  indigo:  'bg-indigo-500/10',
  amber:   'bg-amber-500/10',
  slate:   'bg-slate-700/30',
  pink:    'bg-pink-500/10',
  violet:  'bg-violet-500/10',
};

// ── Status icon ─────────────────────────────────────────────────────────────
function StatusIcon({ status }: { status: LayerStatus }) {
  if (status === 'active')   return <CheckCircle2 size={11} className="text-emerald-400" />;
  if (status === 'building') return <Zap size={11} className="text-cyan-400" />;
  if (status === 'pending')  return <Clock size={11} className="text-amber-400" />;
  return <Circle size={11} className="text-slate-500" />;
}

// ── Barra progresso ─────────────────────────────────────────────────────────
function PctBar({ pct, color }: { pct: number; color: LayerColor }) {
  const barColor: Record<LayerColor, string> = {
    emerald: 'bg-emerald-500', cyan: 'bg-cyan-500', indigo: 'bg-indigo-500',
    amber: 'bg-amber-500', slate: 'bg-slate-500', pink: 'bg-pink-500', violet: 'bg-violet-500',
  };
  return (
    <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${barColor[color]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ── Casella singola ─────────────────────────────────────────────────────────
function LayerCard({ layer, onClick, index }: { layer: Layer; onClick: (l: Layer) => void; index: number }) {
  const [hovered, setHovered] = useState(false);
  const sc = STATUS_CONFIG[layer.status];
  const hex = COLOR_HEX[layer.color];
  const hasChildren = (layer.children?.length ?? 0) > 0;

  return (
    <div
      className="group relative flex flex-col gap-2.5 p-4 rounded-xl cursor-pointer transition-all duration-300"
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(15,23,42,0.95) 0%, ${sc.glow.replace('0.15', '0.08')} 100%)`
          : 'rgba(15,23,42,0.8)',
        border: `1px solid ${hovered ? hex + '60' : hex + '20'}`,
        boxShadow: hovered ? `0 0 24px ${hex}22, 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 ${hex}15` : '0 2px 8px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
        animationDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(layer)}
    >
      {/* Accent line top */}
      <div
        className="absolute top-0 left-4 right-4 h-px rounded-full transition-all duration-300"
        style={{ background: hovered ? `linear-gradient(90deg, transparent, ${hex}80, transparent)` : `linear-gradient(90deg, transparent, ${hex}20, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sc.dot}`} />
          <span className={`text-[12px] font-bold tracking-wider truncate ${COLOR_TEXT[layer.color]}`}>
            {layer.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${sc.badge}`}>{sc.label}</span>
          {hasChildren && (
            <ChevronRight
              size={12}
              className="transition-transform duration-200"
              style={{ color: hovered ? hex : '#475569', transform: hovered ? 'translateX(2px)' : 'translateX(0)' }}
            />
          )}
        </div>
      </div>

      {/* Subtitle */}
      {layer.subtitle && (
        <p className="text-[9px] text-slate-500 leading-relaxed line-clamp-2">{layer.subtitle}</p>
      )}

      {/* Progresso */}
      {typeof layer.pct === 'number' && (
        <div className="flex items-center gap-2">
          <PctBar pct={layer.pct} color={layer.color} />
          <span className="text-[8px] font-mono flex-shrink-0" style={{ color: hex + 'cc' }}>{layer.pct}%</span>
        </div>
      )}

      {/* Skills */}
      {layer.skills && layer.skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {layer.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className={`text-[7px] px-1.5 py-0.5 rounded-sm font-mono transition-all duration-200 ${COLOR_BG[layer.color]} ${COLOR_TEXT[layer.color]}`}
              style={{ opacity: hovered ? 1 : 0.7 }}
            >
              {s}
            </span>
          ))}
          {layer.skills.length > 3 && (
            <span className="text-[7px] px-1.5 py-0.5 rounded-sm font-mono bg-slate-800 text-slate-500">+{layer.skills.length - 3}</span>
          )}
        </div>
      )}

      {/* Proof */}
      {layer.proof && (
        <div className="flex items-start gap-1.5 mt-1 pt-2.5 border-t border-slate-800/60">
          <CheckCircle2 size={9} className="text-emerald-500 flex-shrink-0 mt-0.5" />
          <span className="text-[8px] text-slate-400 italic leading-tight">{layer.proof}</span>
        </div>
      )}

      {/* Sub-layer count */}
      {hasChildren && (
        <div className="flex items-center gap-1 mt-auto pt-1">
          <Layers size={9} style={{ color: hex + '80' }} />
          <span className="text-[8px]" style={{ color: hex + '80' }}>
            {layer.children!.length} layer{layer.children!.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Modale aggiungi layer ───────────────────────────────────────────────────
function AddLayerModal({ parentName, parentColor, onClose, onAdd }: {
  parentName: string;
  parentColor: LayerColor;
  onClose: () => void;
  onAdd: (layer: Layer) => void;
}) {
  const hex = COLOR_HEX[parentColor];
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [status, setStatus] = useState<LayerStatus>('pending');
  const [color, setColor] = useState<LayerColor>(parentColor);
  const [skillsRaw, setSkillsRaw] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
      id: `custom_${Date.now()}`,
      name: name.trim().toUpperCase(),
      type: 'layer',
      status,
      color,
      subtitle: subtitle.trim() || undefined,
      skills: skillsRaw ? skillsRaw.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
      children: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
      <div
        className="flex flex-col gap-4 p-5 w-[360px] rounded-2xl"
        style={{
          background: 'rgba(15,23,42,0.98)',
          border: `1px solid ${hex}40`,
          boxShadow: `0 0 40px ${hex}20, 0 20px 60px rgba(0,0,0,0.6)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus size={12} style={{ color: hex }} />
            <span className="text-[11px] font-bold tracking-wider text-slate-200">
              LAYER in <span style={{ color: hex }}>{parentName}</span>
            </span>
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-300 text-[13px] transition-colors">✕</button>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { label: 'Nome *', value: name, set: setName, placeholder: 'NUOVA_SKILL', mono: true },
            { label: 'Descrizione', value: subtitle, set: setSubtitle, placeholder: 'breve descrizione' },
            { label: 'Skills (virgola)', value: skillsRaw, set: setSkillsRaw, placeholder: 'skill1, skill2' },
          ].map(({ label, value, set, placeholder, mono }) => (
            <div key={label}>
              <label className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</label>
              <input
                value={value}
                onChange={(e) => set(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={placeholder}
                className={`w-full mt-1 bg-slate-900 rounded-lg px-3 py-2 text-[11px] text-slate-200 focus:outline-none transition-all ${mono ? 'font-mono' : ''}`}
                style={{ border: `1px solid ${hex}30` }}
                onFocus={(e) => { e.target.style.borderColor = hex + '80'; }}
                onBlur={(e) => { e.target.style.borderColor = hex + '30'; }}
              />
            </div>
          ))}

          <div className="flex gap-3">
            {[
              { label: 'Status', value: status, set: setStatus as (v: string) => void, opts: [['active','Attivo'],['building','Building'],['pending','Pending'],['future','Futuro']] },
              { label: 'Colore', value: color, set: setColor as (v: string) => void, opts: [['emerald','Emerald'],['cyan','Cyan'],['indigo','Indigo'],['amber','Amber'],['violet','Violet'],['pink','Pink'],['slate','Slate']] },
            ].map(({ label, value, set, opts }) => (
              <div key={label} className="flex-1">
                <label className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</label>
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full mt-1 bg-slate-900 rounded-lg px-2 py-2 text-[11px] text-slate-200 font-mono focus:outline-none"
                  style={{ border: `1px solid ${hex}30` }}
                >
                  {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2 text-[10px] text-slate-500 border border-slate-800 rounded-lg hover:text-slate-300 transition-colors">
            ANNULLA
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-2 text-[10px] font-bold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: hex, border: `1px solid ${hex}50`, background: !name.trim() ? 'transparent' : hex + '15' }}
          >
            AGGIUNGI
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Vista principale ─────────────────────────────────────────────────────────
export default function LayersView() {
  const [stack, setStack] = useState<Layer[]>([LAYERS_DATA]);
  const [tree, setTree] = useState<Layer>(LAYERS_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [animKey, setAnimKey] = useState(0);         // forza re-render animato
  const [direction, setDirection] = useState<'in' | 'out'>('in');
  const gridRef = useRef<HTMLDivElement>(null);

  const current = stack[stack.length - 1];
  const level = stack.length - 1;
  const children = current.children ?? [];
  const isRoot = level === 0;

  // Trigger animazione ogni cambio di livello
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [current.id]);

  const drillDown = (layer: Layer) => {
    if ((layer.children?.length ?? 0) > 0) {
      setDirection('in');
      setStack((prev) => [...prev, layer]);
    }
  };

  const goBack = () => {
    if (stack.length > 1) {
      setDirection('out');
      setStack((prev) => prev.slice(0, -1));
    }
  };

  const goToIndex = (idx: number) => {
    setDirection('out');
    setStack((prev) => prev.slice(0, idx + 1));
  };

  const addLayerToCurrent = (newLayer: Layer) => {
    const addToNode = (node: Layer, targetId: string): Layer => {
      if (node.id === targetId) return { ...node, children: [...(node.children ?? []), newLayer] };
      if (node.children) return { ...node, children: node.children.map((c) => addToNode(c, targetId)) };
      return node;
    };
    const updatedTree = addToNode(tree, current.id);
    setTree(updatedTree);
    setStack((prev) => {
      const newStack = [...prev];
      const updateNode = (n: Layer, id: string): Layer => {
        if (n.id === id) return { ...n, children: [...(n.children ?? []), newLayer] };
        if (n.children) return { ...n, children: n.children.map((c) => updateNode(c, id)) };
        return n;
      };
      newStack[newStack.length - 1] = updateNode(newStack[newStack.length - 1], current.id);
      return newStack;
    });
  };

  const currentHex = COLOR_HEX[current.color];

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-mono overflow-hidden relative">

      {/* ── Sfondo dinamico per livello ── */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${currentHex}08 0%, transparent 70%)`,
          opacity: isRoot ? 0.6 : 1,
        }}
      />

      {/* ── Level watermark ── */}
      <div
        className="absolute bottom-8 right-8 font-bold pointer-events-none select-none transition-all duration-500"
        style={{
          fontSize: '120px',
          lineHeight: 1,
          color: currentHex + '06',
          letterSpacing: '-0.05em',
        }}
      >
        L{level}
      </div>

      {/* ── Header breadcrumb ── */}
      <div
        className="flex-shrink-0 px-5 py-3 border-b flex items-center gap-2 relative z-10"
        style={{ borderColor: currentHex + '20', background: 'rgba(2,6,23,0.7)', backdropFilter: 'blur(8px)' }}
      >
        {/* Back */}
        {!isRoot && (
          <button
            onClick={goBack}
            className="flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
            style={{ border: `1px solid ${currentHex}40`, color: currentHex, background: currentHex + '10' }}
          >
            <ArrowLeft size={11} />
          </button>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 overflow-x-auto min-w-0">
          {stack.map((node, idx) => (
            <div key={node.id} className="flex items-center gap-1 flex-shrink-0">
              {idx > 0 && <ChevronRight size={9} className="text-slate-700" />}
              <button
                onClick={() => goToIndex(idx)}
                className="text-[10px] tracking-wider transition-all duration-200 hover:opacity-100"
                style={{
                  color: idx === stack.length - 1 ? COLOR_HEX[node.color] : '#475569',
                  fontWeight: idx === stack.length - 1 ? 700 : 400,
                }}
              >
                {node.name}
              </button>
            </div>
          ))}
        </div>

        {/* Destra: livello + count */}
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          {!isRoot && current.subtitle && (
            <span className="text-[9px] text-slate-600 hidden lg:block max-w-[200px] truncate">{current.subtitle}</span>
          )}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md"
            style={{ border: `1px solid ${currentHex}25`, background: currentHex + '08' }}
          >
            <span className="text-[9px] font-bold" style={{ color: currentHex }}>L{level}</span>
            <span className="text-[8px] text-slate-600">·</span>
            <span className="text-[8px] text-slate-500">{children.length} nodi</span>
          </div>
        </div>
      </div>

      {/* ── Dettaglio nodo corrente ── */}
      {!isRoot && (current.proof || (current.pct !== undefined)) && (
        <div
          className="flex-shrink-0 px-5 py-2.5 flex items-center gap-4 border-b relative z-10"
          style={{ borderColor: currentHex + '15', background: currentHex + '05' }}
        >
          {current.proof && (
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={10} className="text-emerald-400 flex-shrink-0" />
              <span className="text-[9px] text-slate-400 italic">{current.proof}</span>
            </div>
          )}
          {current.pct !== undefined && (
            <div className="flex items-center gap-2 ml-auto w-32">
              <PctBar pct={current.pct} color={current.color} />
              <span className="text-[9px] flex-shrink-0" style={{ color: currentHex }}>{current.pct}%</span>
            </div>
          )}
        </div>
      )}

      {/* ── Griglia caselle ── */}
      <div
        ref={gridRef}
        key={animKey}
        className="flex-1 overflow-y-auto p-5 relative z-10"
        style={{
          animation: `${direction === 'in' ? 'slideIn' : 'slideOut'} 0.25s ease-out forwards`,
        }}
      >
        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideOut {
            from { opacity: 0; transform: translateX(-20px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {children.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-700">
            <Layers size={32} className="opacity-20" />
            <p className="text-[10px] tracking-wider">Nessun layer — aggiungi il primo</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto">
            {children.map((child, i) => (
              <div
                key={child.id}
                style={{ animation: `cardIn 0.3s ease-out ${i * 55}ms both` }}
              >
                <LayerCard layer={child} onClick={drillDown} index={i} />
              </div>
            ))}

            {/* Card aggiungi */}
            <div
              onClick={() => setShowAddModal(true)}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-300 min-h-[100px]"
              style={{
                animation: `cardIn 0.3s ease-out ${children.length * 55}ms both`,
                border: `1px dashed ${currentHex}25`,
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = currentHex + '60';
                (e.currentTarget as HTMLDivElement).style.background = currentHex + '05';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = currentHex + '25';
                (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              }}
            >
              <Plus size={18} style={{ color: currentHex + '60' }} />
              <span className="text-[8px] tracking-wider" style={{ color: currentHex + '50' }}>aggiungi layer</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer strip ── */}
      <div
        className="flex-shrink-0 px-5 py-2 border-t flex items-center gap-4 relative z-10"
        style={{ borderColor: currentHex + '15', background: 'rgba(2,6,23,0.8)' }}
      >
        {(['active', 'building', 'pending', 'future'] as LayerStatus[]).map((s) => {
          const count = children.filter((c) => c.status === s).length;
          if (!count) return null;
          return (
            <div key={s} className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[s].dot}`} />
              <span className="text-[8px] text-slate-600">{count} {STATUS_CONFIG[s].label}</span>
            </div>
          );
        })}
        <div className="ml-auto flex items-center gap-1.5">
          <StatusIcon status={current.status} />
          <span className="text-[8px] text-slate-600">SINAPSI v2.0</span>
        </div>
      </div>

      {/* ── Modale ── */}
      {showAddModal && (
        <AddLayerModal
          parentName={current.name}
          parentColor={current.color}
          onClose={() => setShowAddModal(false)}
          onAdd={addLayerToCurrent}
        />
      )}
    </div>
  );
}
