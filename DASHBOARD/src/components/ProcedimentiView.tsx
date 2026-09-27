// ProcedimentiView.tsx — "come gira il sistema": apertura, profilo, automazioni, risultato
// parte di: TITANIUM_OS / DASHBOARD
// versione: 1.0 / data: 2026-06-09
// Consultabile da: stato "API live" (sidebar) -> click. Spiega il procedimento e cosa otteniamo.

import { useGlobalState } from "../hooks/SystemStateContext";
import {
  Activity, Power, Terminal, RefreshCw, Moon, CheckCircle2, ArrowRight, FileCode,
} from "lucide-react";

interface Passo { cosa: string; come: string }
interface Sezione {
  titolo: string; icona: typeof Power; colore: string; intro: string; passi: Passo[];
}

const SEZIONI: Sezione[] = [
  {
    titolo: "1 · Apertura sessione (come parte)",
    icona: Power, colore: "#10b981",
    intro: "Doppio click su un collegamento del Desktop. Niente comandi a mente.",
    passi: [
      { cosa: "Collegamento \"Claude Code [TI]\"", come: "→ CLAUDE_CODE.bat: trova claude.exe da solo e apre Claude dentro TITANIUM_OS." },
      { cosa: "Sessione NUOVA che riprende dallo stato", come: "Claude legge DA_FARE.md (bussola) + RIAVVIO_SESSIONE.txt + BRAIN/STATE.json e dice in <10s dove siamo. Contesto pulito ogni volta." },
      { cosa: "Collegamento \"TITANIUM_OS [PS]\"", come: "→ PowerShell dentro TITANIUM_OS, col profilo già caricato (sotto)." },
    ],
  },
  {
    titolo: "2 · Il Profilo (l'ambiente, già pronto)",
    icona: Terminal, colore: "#22d3ee",
    intro: "Il profilo PowerShell prepara tutto all'apertura del terminale — path de-hardcodati, a prova di migrazione.",
    passi: [
      { cosa: "Variabili", come: "TI_ROOT, MI_ROOT, MENTE_DIR, PYTHONPATH puntati alla macchina corrente (via $env:USERPROFILE/LOCALAPPDATA)." },
      { cosa: "Scorciatoie", come: "ti (vai al repo) · brief (stato+prossimo step) · claude-ti (apri Claude) · start-titanium / start-dashboard / start-api · gp/gs/gl (git)." },
      { cosa: "PATH", come: "Python, Node, gh, npm e .local\\bin (graphify) pronti. Nessuna chiave API in chiaro nel profilo." },
    ],
  },
  {
    titolo: "3 · Aggiornamenti automatici (a fine sessione)",
    icona: RefreshCw, colore: "#f59e0b",
    intro: "Un hook \"Stop\" globale (~/.claude/hooks/stop_titanium.sh) gira da solo quando finisco di rispondere, da qualunque cartella. Lavora SOLO se qualcosa è cambiato.",
    passi: [
      { cosa: "RIAVVIO_SESSIONE.txt", come: "rigenerato (generate_restart_prompt.py) → la prossima apertura sa dove eravamo." },
      { cosa: "STORIE + CRITICHE + mirror Desktop", come: "sync_dashboard.py: rebuild episodes.json se ci sono episodi nuovi · refresh bussola_todos (CRITICHE) se la bussola cambia · copia DA_FARE.md → Desktop \"da fare.txt\"." },
      { cosa: "Taglio della bussola", come: "bussola_taglio.py: le righe chiuse delle sessioni prima dell'ultima chiusa vanno in ABBIAMO_FATTO.md col loro perché (di notte nel night_audit e al /salva)." },
    ],
  },
  {
    titolo: "4 · Automazioni all'accensione (il PC è quasi sempre spento)",
    icona: Moon, colore: "#38bdf8",
    intro: "Dal #73: i task \"notturni\" partono quando accendi. Gira solo la manutenzione, in fila e gratis; la generazione (API finite) si fa in sessione, su richiesta.",
    passi: [
      { cosa: "Catena d'avvio (TI_NightResearch)", come: "self-heal RAG → riflusso FATTI → wiki → RAG incrementale → snapshot → audit a regole + taglio bussola." },
      { cosa: "TI_NightPush · TI_DeepFreeze", come: "commit/push + inventario + profilo GitHub · backup cifrato settimanale." },
      { cosa: "Su richiesta", come: "night_research.bat genera (ricerca + episodio Nina) · caroselli, storie, fine-tuning: spenti, si fanno in sessione." },
    ],
  },
];

const RISULTATI = [
  "La continuità non dipende dalla memoria: passa dai file (bussola/RIAVVIO/STATE).",
  "Lo stato è sempre fresco — STORIE, CRITICHE e il mirror Desktop si allineano da soli.",
  "Niente lavoro manuale ripetuto: apri, lavori, chiudi. Il resto si tiene in ordine.",
  "Perdita zero: tutto committato e pushato; il piano vivo è la SCALETTA dentro DA_FARE.md.",
  "Un solo punto di consultazione (questo) per capire come gira — senza tenerlo a mente.",
];

export function ProcedimentiView() {
  const sys = useGlobalState();
  return (
    <div className="h-full overflow-y-auto bg-[var(--shell-bg)]" style={{ animation: "nl-fadeUp 0.3s ease both" }}>
      <div className="max-w-4xl mx-auto px-6 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <Activity size={20} className={sys.isOnline ? "text-emerald-400" : "text-slate-600"} />
          <h2 className="text-lg font-bold text-slate-100 tracking-wide">Procedimenti del Sistema</h2>
          <span className="ml-auto flex items-center gap-1.5 text-[9px] font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${sys.isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-700"}`} />
            <span className={sys.isOnline ? "text-emerald-500/80" : "text-slate-600"}>{sys.isOnline ? "API live" : "offline"}</span>
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-6 ml-8">
          Come gira tutto: come si apre una sessione, cosa fa il profilo, cosa si aggiorna da solo — e cosa otteniamo.
        </p>

        {/* Sezioni */}
        <div className="space-y-4">
          {SEZIONI.map(s => {
            const Icon = s.icona;
            return (
              <section key={s.titolo} className="rounded-xl border overflow-hidden"
                style={{ borderColor: s.colore + "33", background: s.colore + "06" }}>
                <div className="flex items-center gap-2.5 px-4 py-3">
                  <Icon size={15} style={{ color: s.colore }} />
                  <h3 className="text-sm font-bold" style={{ color: s.colore }}>{s.titolo}</h3>
                </div>
                <p className="px-4 -mt-1 mb-2 text-[11px] text-slate-400 italic">{s.intro}</p>
                <div className="px-4 pb-3 space-y-1.5">
                  {s.passi.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px]">
                      <ArrowRight size={12} className="mt-0.5 shrink-0" style={{ color: s.colore }} />
                      <span><span className="text-slate-200 font-semibold">{p.cosa}</span>
                        <span className="text-slate-500"> — {p.come}</span></span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Cosa otteniamo */}
        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] px-4 py-4">
          <div className="flex items-center gap-2 mb-2.5">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-emerald-300">Cosa otteniamo</h3>
          </div>
          <div className="space-y-1.5">
            {RISULTATI.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                <span className="text-emerald-400 mt-0.5">✓</span>{r}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-slate-700 font-mono text-center mt-6 flex items-center justify-center gap-1.5">
          <FileCode size={10} /> dettagli: CLAUDE.md · AUTOMATIONS/core/sync_dashboard.py · profilo PowerShell
        </p>
      </div>
    </div>
  );
}
