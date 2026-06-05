// RagChatView.tsx | TITANIUM_OS / DASHBOARD | v1.0 | 2026-06-05
// Chat RAG VERA (PUNTO 4a): chiedi -> risposta + fonti, ancorata a MENTE via /api/rag/chat.
// Toggle motore (PUNTO 4b): Claude (haiku, sempre on) o Locale (Ollama+Qwen, leva).
// Se la leva e' spenta lo dice e fa fallback a Claude — niente teatro.

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Brain, Cpu, Cloud, FileText } from "lucide-react";

interface Source { source: string; score: number; }
interface Message {
  role: "user" | "rag";
  text: string;
  ts: number;
  sources?: Source[];
  engine?: string;
  fallback?: boolean;
}

type Engine = "claude" | "local";

interface OllamaStatus { available: boolean; model?: string; model_ready?: boolean; hint?: string; }

export function RagChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [engine, setEngine] = useState<Engine>("claude");
  const [ollama, setOllama] = useState<OllamaStatus | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    fetch("/api/llm/ollama/status")
      .then(r => r.json())
      .then(d => setOllama({ available: !!d.available, model: d.model, model_ready: d.model_ready, hint: d.hint }))
      .catch(() => setOllama({ available: false }));
  }, []);

  const localReady = !!(ollama?.available && ollama?.model_ready);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setMessages(m => [...m, { role: "user", text: q, ts: Date.now() }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/rag/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, engine }),
      });
      const data = await res.json();
      if (data.ok) {
        setMessages(m => [...m, {
          role: "rag", text: data.answer, ts: Date.now(),
          sources: data.sources ?? [], engine: data.engine_used, fallback: data.fallback,
        }]);
      } else {
        setMessages(m => [...m, { role: "rag", text: `⚠ ${data.error}`, ts: Date.now() }]);
      }
    } catch {
      setMessages(m => [...m, { role: "rag", text: "⚠ Errore di connessione", ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden"
         style={{ background: "radial-gradient(ellipse at 30% 10%, #083344 0%, #050a14 70%)" }}>

      {/* Header */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-cyan-900/40 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-cyan-500/40 bg-cyan-950/30 flex items-center justify-center">
          <Brain size={18} className="text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-black font-mono uppercase tracking-wider text-cyan-300">Chat RAG</div>
          <div className="text-[10px] text-slate-500 font-mono">
            Risposte ancorate a MENTE/ — con fonti. {messages.length === 0 ? "Chiedi qualcosa." : ""}
          </div>
        </div>

        {/* Engine toggle */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/60 p-0.5">
          <button
            onClick={() => setEngine("claude")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all
              ${engine === "claude" ? "bg-cyan-950/60 text-cyan-300 border border-cyan-500/30" : "text-slate-500 hover:text-slate-300 border border-transparent"}`}
          >
            <Cloud size={11} /> Claude
          </button>
          <button
            onClick={() => setEngine("local")}
            title={localReady ? "Ollama + Qwen locale" : (ollama?.hint ?? "Leva locale spenta — fallback a Claude")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all
              ${engine === "local" ? "bg-indigo-950/60 text-indigo-300 border border-indigo-500/30" : "text-slate-500 hover:text-slate-300 border border-transparent"}`}
          >
            <Cpu size={11} /> Locale
            <span className={`w-1.5 h-1.5 rounded-full ${localReady ? "bg-emerald-400" : "bg-slate-600"}`} />
          </button>
        </div>
      </div>

      {/* Leva spenta hint */}
      {engine === "local" && !localReady && (
        <div className="flex-shrink-0 px-5 py-2 bg-amber-950/20 border-b border-amber-900/30 text-[10px] font-mono text-amber-400/80">
          ⚡ Leva locale spenta — {ollama?.hint ?? "installa Ollama + pull del modello"}. Per ora rispondo con Claude (fallback).
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background: "rgba(5,7,20,0.6)" }}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-3 opacity-40">
            <Brain size={44} className="text-cyan-400/60" />
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/70">RAG pronto</div>
            <div className="text-[10px] text-slate-600 text-center max-w-sm">
              Chiedi del progetto: V32, MIMS, decisioni officina, economia. La risposta cita i file di MENTE/.
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-sm
              ${msg.role === "rag" ? "bg-cyan-950/40 border border-cyan-500/30" : "bg-slate-700/50 border border-slate-600/50"}`}>
              {msg.role === "rag" ? <Brain size={13} className="text-cyan-400" /> : "M"}
            </div>
            <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed
              ${msg.role === "rag" ? "bg-cyan-950/20 border border-cyan-500/20 text-slate-200 rounded-tl-sm"
                                   : "bg-slate-700/50 border border-slate-600/40 text-slate-100 rounded-tr-sm"}`}>
              <div className="whitespace-pre-wrap font-mono text-[12px] leading-[1.6]">{msg.text}</div>

              {msg.role === "rag" && msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-cyan-900/40 flex flex-wrap gap-1 items-center">
                  <FileText size={9} className="text-slate-600" />
                  <span className="text-[8px] text-slate-600 font-mono uppercase tracking-wider mr-1">
                    Fonti ({msg.sources.length})
                  </span>
                  {msg.sources.map((sr, j) => (
                    <span key={j} title={`score ${sr.score}`}
                          className="text-[8px] px-1.5 py-0.5 rounded font-mono bg-cyan-500/10 text-cyan-300">
                      {sr.source.split(/[\\/]/).pop()}
                    </span>
                  ))}
                </div>
              )}

              {msg.role === "rag" && msg.engine && (
                <div className="text-[9px] text-slate-600 mt-2 font-mono flex items-center gap-1.5">
                  {msg.engine === "local"
                    ? <><Cpu size={9} className="text-indigo-400" /> Qwen locale</>
                    : <><Cloud size={9} className="text-cyan-500" /> claude-haiku{msg.fallback ? " (fallback)" : ""}</>}
                  <span>· {new Date(msg.ts).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 bg-cyan-950/40 border border-cyan-500/30">
              <Brain size={13} className="text-cyan-400" />
            </div>
            <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 size={12} className="text-cyan-400 animate-spin" />
                <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
                  recupero da MENTE e rispondo...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-cyan-900/40 bg-black/30 backdrop-blur-sm">
        <div className="flex gap-3 items-end rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Chiedi al RAG... (Enter per inviare)"
            rows={1}
            disabled={loading}
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
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                       border border-cyan-500/30 bg-cyan-950/30 hover:scale-105 active:scale-95
                       transition-all disabled:opacity-30"
          >
            {loading ? <Loader2 size={14} className="text-cyan-400 animate-spin" />
                     : <Send size={14} className="text-cyan-400" />}
          </button>
        </div>
        <div className="text-[9px] text-slate-700 font-mono mt-1.5 pl-1">
          Enter per inviare · Shift+Enter a capo · retrieval ChromaDB+BM25+reranker · motore: {engine === "local" ? "Locale (Ollama)" : "Claude haiku"}
        </div>
      </div>
    </div>
  );
}
