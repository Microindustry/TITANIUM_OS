// AgentsView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-05-29
// Pannello agenti — chat live, glassmorphism, personalità per ogni agente

import { useState, useRef, useEffect } from "react";
import { Send, ChevronRight, Zap, Loader2, Bot } from "lucide-react";

// ── TIPI ─────────────────────────────────────────────────────────────────────
interface Agent {
  name: string;
  emoji: string;
  role: string;
  color: string;
  active: boolean;
  expertise: string[];
  tone: string;
}

interface Message {
  role: "user" | "agent";
  text: string;
  ts: number;
}

// ── PALETTE PER AGENTE ────────────────────────────────────────────────────────
const AGENT_STYLE: Record<string, {
  glow: string; border: string; bg: string; badge: string;
  accent: string; dot: string; gradient: string;
}> = {
  tesla:  { glow: "0 0 60px #facc1520", border: "border-yellow-500/40",  bg: "bg-yellow-950/20",   badge: "bg-yellow-500/15 text-yellow-300",  accent: "text-yellow-400",  dot: "bg-yellow-400",  gradient: "from-yellow-950/60 via-slate-900/80 to-slate-950" },
  forge:  { glow: "0 0 60px #f9731620", border: "border-orange-500/40",  bg: "bg-orange-950/20",   badge: "bg-orange-500/15 text-orange-300",  accent: "text-orange-400",  dot: "bg-orange-400",  gradient: "from-orange-950/60 via-slate-900/80 to-slate-950" },
  aqua:   { glow: "0 0 60px #22c55e20", border: "border-green-500/40",   bg: "bg-green-950/20",    badge: "bg-green-500/15 text-green-300",    accent: "text-green-400",   dot: "bg-green-400",   gradient: "from-green-950/60 via-slate-900/80 to-slate-950" },
  lex:    { glow: "0 0 60px #64748b20", border: "border-slate-400/40",   bg: "bg-slate-800/30",    badge: "bg-slate-500/15 text-slate-300",    accent: "text-slate-300",   dot: "bg-slate-400",   gradient: "from-slate-800/60 via-slate-900/80 to-slate-950" },
  plc:    { glow: "0 0 60px #06b6d420", border: "border-cyan-500/40",    bg: "bg-cyan-950/20",     badge: "bg-cyan-500/15 text-cyan-300",      accent: "text-cyan-400",    dot: "bg-cyan-400",    gradient: "from-cyan-950/60 via-slate-900/80 to-slate-950" },
  themis: { glow: "0 0 60px #818cf820", border: "border-indigo-500/40",  bg: "bg-indigo-950/20",   badge: "bg-indigo-500/15 text-indigo-300",  accent: "text-indigo-400",  dot: "bg-indigo-400",  gradient: "from-indigo-950/60 via-slate-900/80 to-slate-950" },
  aria:   { glow: "0 0 60px #a855f720", border: "border-purple-500/40",  bg: "bg-purple-950/20",   badge: "bg-purple-500/15 text-purple-300",  accent: "text-purple-400",  dot: "bg-purple-400",  gradient: "from-purple-950/60 via-slate-900/80 to-slate-950" },
  eva:    { glow: "0 0 60px #ec489920", border: "border-pink-500/40",    bg: "bg-pink-950/20",     badge: "bg-pink-500/15 text-pink-300",      accent: "text-pink-400",    dot: "bg-pink-400",    gradient: "from-pink-950/60 via-slate-900/80 to-slate-950" },
};

const DEFAULT_STYLE = AGENT_STYLE.themis;

// ── AGENT CARD (sidebar) ──────────────────────────────────────────────────────
function AgentCard({
  id, agent, selected, onClick,
}: { id: string; agent: Agent; selected: boolean; onClick: () => void }) {
  const s = AGENT_STYLE[id] ?? DEFAULT_STYLE;

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left rounded-2xl p-4 border transition-all duration-300
        ${selected
          ? `${s.border} ${s.bg} scale-[1.02]`
          : "border-slate-800/60 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40"
        } ${!agent.active ? "opacity-40" : ""}`}
      style={selected ? { boxShadow: s.glow } : undefined}
      disabled={!agent.active}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                         ${selected ? s.bg : "bg-slate-800/60"} border ${selected ? s.border : "border-slate-700/40"}`}>
          {agent.emoji || "🤖"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-black font-mono uppercase tracking-wider
                              ${selected ? s.accent : "text-slate-300 group-hover:text-slate-100"}`}>
              {agent.name}
            </span>
            {/* Status dot */}
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                              ${agent.active ? (selected ? s.dot : "bg-emerald-500") : "bg-slate-700"}`} />
          </div>
          <p className="text-[9px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
            {agent.role}
          </p>
        </div>

        <ChevronRight size={12} className={`flex-shrink-0 transition-all
          ${selected ? s.accent : "text-slate-700 group-hover:text-slate-500"}
          ${selected ? "translate-x-0.5" : ""}`} />
      </div>

      {/* Tags */}
      {selected && (
        <div className="flex flex-wrap gap-1 mt-3">
          {(agent.expertise ?? []).slice(0, 3).map((e, i) => (
            <span key={i} className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${s.badge}`}>
              {e.split(":")[0].split("(")[0].trim().slice(0, 20)}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

// ── CHAT PANEL ────────────────────────────────────────────────────────────────
function ChatPanel({ id, agent }: { id: string; agent: Agent }) {
  const s = AGENT_STYLE[id] ?? DEFAULT_STYLE;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    setMessages([]);
  }, [id]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;

    setMessages(m => [...m, { role: "user", text: q, ts: Date.now() }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agents/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent: id, question: q }),
      });
      const data = await res.json();
      if (data.ok) {
        setMessages(m => [...m, { role: "agent", text: data.answer, ts: Date.now() }]);
      } else {
        setMessages(m => [...m, { role: "agent", text: `⚠ ${data.error}`, ts: Date.now() }]);
      }
    } catch {
      setMessages(m => [...m, { role: "agent", text: "⚠ Errore di connessione", ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className={`flex flex-col h-full rounded-2xl border ${s.border} overflow-hidden`}
         style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, boxShadow: s.glow }}>
      {/* Header agente */}
      <div className={`flex-shrink-0 p-5 border-b ${s.border} bg-gradient-to-r ${s.gradient}`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
                           border ${s.border} bg-black/20 backdrop-blur-sm`}>
            {agent.emoji}
          </div>
          <div className="flex-1">
            <div className={`text-xl font-black font-mono uppercase tracking-wider ${s.accent}`}>
              {agent.name}
            </div>
            <div className="text-sm text-slate-400 mt-0.5">{agent.role}</div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${s.badge} border ${s.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {agent.active ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Tone */}
        <div className="mt-3 text-[10px] font-mono text-slate-500 italic leading-relaxed">
          "{agent.tone?.slice(0, 100)}..."
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4"
           style={{ background: "rgba(5,7,20,0.9)" }}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-3 opacity-40">
            <div className="text-5xl">{agent.emoji}</div>
            <div className={`text-[11px] font-mono uppercase tracking-widest ${s.accent}`}>
              {agent.name} pronto
            </div>
            <div className="text-[10px] text-slate-600 text-center max-w-xs">
              Fai una domanda tecnica. L'agente ha accesso alla knowledge base del progetto.
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-sm
              ${msg.role === "agent"
                ? `${s.bg} border ${s.border}`
                : "bg-slate-700/50 border border-slate-600/50"}`}>
              {msg.role === "agent" ? agent.emoji : "M"}
            </div>

            {/* Bubble */}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
              ${msg.role === "agent"
                ? `${s.bg} border ${s.border} text-slate-200`
                : "bg-slate-700/50 border border-slate-600/40 text-slate-100"
              } ${msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}>
              <div className="whitespace-pre-wrap font-mono text-[12px] leading-[1.6]">
                {msg.text}
              </div>
              <div className="text-[9px] text-slate-600 mt-2 font-mono">
                {new Date(msg.ts).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-sm ${s.bg} border ${s.border}`}>
              {agent.emoji}
            </div>
            <div className={`${s.bg} border ${s.border} rounded-2xl rounded-tl-sm px-4 py-3`}>
              <div className="flex items-center gap-2">
                <Loader2 size={12} className={`${s.accent} animate-spin`} />
                <span className={`text-[10px] font-mono ${s.accent} animate-pulse`}>
                  {agent.name} sta elaborando...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={`flex-shrink-0 p-4 border-t ${s.border} bg-black/30 backdrop-blur-sm`}>
        <div className={`flex gap-3 items-end rounded-xl border ${s.border} ${s.bg} p-3`}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Chiedi a ${agent.name}... (Enter per inviare)`}
            rows={1}
            disabled={!agent.active || loading}
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600
                       resize-none focus:outline-none font-mono leading-relaxed disabled:opacity-40
                       max-h-32 overflow-y-auto"
            style={{ minHeight: "24px" }}
            onInput={e => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = Math.min(t.scrollHeight, 128) + "px";
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading || !agent.active}
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                        border transition-all disabled:opacity-30
                        ${s.border} ${s.bg} hover:scale-105 active:scale-95`}
          >
            {loading
              ? <Loader2 size={14} className={`${s.accent} animate-spin`} />
              : <Send size={14} className={s.accent} />}
          </button>
        </div>
        <div className="text-[9px] text-slate-700 font-mono mt-1.5 pl-1">
          Enter per inviare · Shift+Enter per andare a capo · claude-haiku-4-5
        </div>
      </div>
    </div>
  );
}

// ── SCHERMATA INIZIALE ────────────────────────────────────────────────────────
function AgentIntro() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      {/* Dot grid decorativo */}
      <div className="w-24 h-24 relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-3xl border border-indigo-500/20 bg-indigo-950/20" />
        <Bot size={36} className="text-indigo-400/60" />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-400 animate-pulse" />
      </div>
      <div className="text-center">
        <div className="text-[11px] font-mono text-indigo-400/60 uppercase tracking-[0.3em] mb-2">
          Team di Esperti
        </div>
        <h2 className="text-2xl font-black text-white mb-3">
          Scegli un agente
        </h2>
        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
          Ogni agente è specializzato in un dominio tecnico di TITANIUM_OS.
          Hanno accesso al tuo knowledge base RAG.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {["⚡ TESLA — Elettrica", "🔧 FORGE — Meccanica", "🌿 AQUA — Acquaponica",
          "📋 LEX — Normativa", "🖥️ SIEMENS — PLC", "⚖️ THEMIS — Sistema"].map(a => (
          <span key={a} className="text-[10px] font-mono text-slate-600 px-2 py-1 rounded-lg
                                   border border-slate-800 bg-slate-900/40">
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export function AgentsView() {
  const [agents, setAgents] = useState<Record<string, Agent>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents")
      .then(r => r.json())
      .then(d => { setAgents(d.agents ?? {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const activeAgents = Object.entries(agents).filter(([, a]) => a.active);
  const inactiveAgents = Object.entries(agents).filter(([, a]) => !a.active);
  const selectedAgent = selected ? agents[selected] : null;

  return (
    <div className="h-full flex overflow-hidden"
         style={{ background: "radial-gradient(ellipse at 30% 20%, #0f172a 0%, #050a14 100%)" }}>

      {/* ── SIDEBAR ── */}
      <div className="w-72 flex-shrink-0 flex flex-col border-r border-slate-800/60 overflow-y-auto"
           style={{ background: "rgba(7,11,24,0.95)" }}>

        {/* Header sidebar */}
        <div className="flex-shrink-0 p-4 border-b border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg border border-indigo-500/30 bg-indigo-950/30
                            flex items-center justify-center">
              <Zap size={12} className="text-indigo-400" />
            </div>
            <div>
              <div className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-slate-100">
                AGENTI
              </div>
              <div className="text-[8px] font-mono text-slate-600">
                {activeAgents.length} attivi · {inactiveAgents.length} in sviluppo
              </div>
            </div>
          </div>
        </div>

        {/* Agent list */}
        <div className="flex-1 p-3 space-y-2">
          {loading ? (
            <div className="text-center py-8">
              <Loader2 size={16} className="text-slate-600 animate-spin mx-auto" />
            </div>
          ) : (
            <>
              {activeAgents.map(([id, agent]) => (
                <AgentCard key={id} id={id} agent={agent}
                           selected={selected === id}
                           onClick={() => setSelected(selected === id ? null : id)} />
              ))}

              {inactiveAgents.length > 0 && (
                <>
                  <div className="pt-2 pb-1">
                    <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest px-1">
                      In sviluppo
                    </div>
                  </div>
                  {inactiveAgents.map(([id, agent]) => (
                    <AgentCard key={id} id={id} agent={agent}
                               selected={false} onClick={() => {}} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      <div className="flex-1 p-4 overflow-hidden">
        {selected && selectedAgent
          ? <ChatPanel key={selected} id={selected} agent={selectedAgent} />
          : <AgentIntro />}
      </div>
    </div>
  );
}
