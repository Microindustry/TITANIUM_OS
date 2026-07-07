// AutomationsView.tsx | TITANIUM_OS DASHBOARD | v1.0 | 2026-03-11
// Mappa visuale di tutte le automazioni — note IT + ramificazioni + potenziamento

import { useState, useEffect } from "react";
import { Zap, ArrowRight, ChevronDown, ChevronUp, Rocket, GitBranch, Moon, RefreshCw } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DATI AUTOMAZIONI
// ─────────────────────────────────────────────────────────────

type Priority = "attiva" | "notturna" | "alta" | "media" | "bassa" | "ce";

// Stato OPERATIVO REALE (verificato 06/06 contro Task Scheduler + processi + watcher.py).
// È la verità che la vecchia view nascondeva: separa ciò che gira da ciò che esiste-ma-dorme.
//  persistente = processo sempre vivo (supervisionato dal watchdog)
//  event       = girato dal watcher su evento file (NON un processo indipendente)
//  scheduled   = Task Scheduler TI_* (notturne)
//  on-demand   = parte solo a mano / via API / CLI
//  dormiente   = il file ESISTE su disco ma non è cablato a nessun trigger (era "da creare", falso)
type Stato = "persistente" | "event" | "scheduled" | "on-demand" | "dormiente";

interface Automation {
  id: number;
  nome: string;
  file: string;
  trigger: string;
  cosa_fa: string;
  come_potenziare: string;
  priority: Priority;
  stato: Stato;    // verità operativa reale (P1a audit 06/06)
  dipende_da?: string[];
  alimenta?: string[];
  task?: string;   // nome task in Windows Task Scheduler (per stato live)
  proc?: string;   // chiave processo in /api/watchdog/status (per stato live persistente)
}

// Stato live di un task da Task Scheduler (GET /api/tasks/notturne)
interface TaskLive {
  state: string;            // Ready | Running | Disabled | ...
  next_run: string;
  last_run: string;
  last_result_label: string;
  active: boolean;
}

const AUTOMATIONS: Automation[] = [
  // ── ATTIVE ──────────────────────────────────────────────────
  {
    id: 1, priority: "attiva", stato: "persistente", proc: "watcher",
    nome: "Watchdog File-System",
    file: "AUTOMATIONS/core/watcher.py",
    trigger: "Avvio sistema (START_TITANIUM_OS.bat)",
    cosa_fa: "Monitora in tempo reale ogni modifica a file e cartelle in TITANIUM_OS usando watchdog. È il trigger primario dell'intero ecosistema: ogni evento (creazione, modifica, cancellazione, spostamento) viene passato a backup, changelog e state_updater.",
    come_potenziare: "Aggiungere filtri per tipo file (es. ignora .pyc, .log). Integrare notifica Telegram se rilevata modifica a file critici (CLAUDE.md, STATE.json). Aggiungere debounce configurabile.",
    alimenta: ["Backup Versioning", "Changelog Writer", "State Updater"],
  },
  {
    id: 2, priority: "attiva", stato: "event",
    nome: "Backup Versioning",
    file: "AUTOMATIONS/core/backup.py",
    trigger: "Da watcher su evento MODIFIED/CREATED",
    cosa_fa: "Crea snapshot automatici di file importanti (.md, .json, .py, .yaml) in BACKUPS/[timestamp]/. Mantiene massimo 30 versioni per file e fa cleanup automatico. Tiene un diff_log.json per storico versioni.",
    come_potenziare: "Aggiungere sync automatico su Google Drive o GitHub releases. Differenziare frequenza per tipo file (es. STATE.json = ogni modifica, .py = ogni 5 minuti). Aggiungere compressione .zip per backup settimanali.",
    dipende_da: ["Watchdog File-System"],
  },
  {
    id: 3, priority: "attiva", stato: "event",
    nome: "Changelog Writer",
    file: "AUTOMATIONS/core/changelog_writer.py",
    trigger: "Da watcher su ogni evento file",
    cosa_fa: "Registra ogni evento in VERSIONS/changelog.md con emoji per tipo (✏️ modifica, ✨ creazione, 🗑️ cancellazione, ➡️ spostamento). Auto-archivia se supera 2000 righe. Supporta entry manuali con tipo MILESTONE, DECISION, BUY, ERROR.",
    come_potenziare: "Aggiungere export periodico su Notion o GitHub Wiki. Generare digest settimanale automatico. Categorizzare per pillar (V32, MIMS, EVA) per filtrare per progetto.",
    dipende_da: ["Watchdog File-System"],
  },
  {
    id: 4, priority: "attiva", stato: "event",
    nome: "State Updater",
    file: "AUTOMATIONS/core/state_updater.py",
    trigger: "Da watcher + manuale + ora con webhook n8n",
    cosa_fa: "Aggiorna BRAIN/STATE.json in risposta a modifiche file. Mappa il path del file al pillar corrispondente (V32, MIMS, EVA...). Ora invia anche webhook a n8n su set_milestone() e mark_milestone_done() per triggerare la content pipeline.",
    come_potenziare: "Aggiungere rilevamento automatico milestone da pattern nel testo dei file. Integrare con GitHub Issues per sync automatico. Calcolare velocity (milestone/settimana) e aggiungerla allo stato.",
    dipende_da: ["Watchdog File-System"],
    alimenta: ["n8n Engine"],
  },
  {
    id: 5, priority: "attiva", stato: "on-demand",
    nome: "Session Orienter",
    file: "AUTOMATIONS/core/session_orienter.py",
    trigger: "Manuale (doppio click SESSION_START.bat)",
    cosa_fa: "Genera un brief completo all'avvio sessione: legge STATE.json, milestones.json, changelog recente. Conta file in INBOX per tipo. Genera barre di progresso per pillar. Compone prompt strutturato per Claude e lo salva in INBOX/session_brief_[timestamp].md.",
    come_potenziare: "Integrare con Edge TTS per leggere il brief ad alta voce all'avvio. Aggiungere suggerimento automatico del prossimo task in base ai blockers. Inviare il brief su Telegram ogni mattina.",
  },
  {
    id: 6, priority: "attiva", stato: "on-demand",
    nome: "Milestone Tracker",
    file: "AUTOMATIONS/core/milestone_tracker.py",
    trigger: "Task Scheduler Windows — ogni giorno alle 08:00",
    cosa_fa: "Genera daily brief mattutino: dove sei, cosa hai fatto ieri, prossime milestone, countdown al capannone (15 luglio 2030). Legge changelog di ieri per estrarre attività. Salva in INBOX/daily_brief_[data].md.",
    come_potenziare: "Inviare il daily brief su Telegram ogni mattina automaticamente. Aggiungere analisi trend (velocità, milestone in ritardo). Generare retrospettiva settimanale ogni lunedì.",
  },
  {
    id: 7, priority: "attiva", stato: "on-demand",
    nome: "PDF to Memory",
    file: "AUTOMATIONS/core/pdf_to_memory.py",
    trigger: "Drag-drop in PDF_DROP/ oppure --watch",
    cosa_fa: "Converte PDF in Markdown strutturato. Classifica automaticamente come ATTO (documenti legali, se ≥2 keyword burocratiche) o INFO (conoscenza). Gestisce versioning: rileva duplicati per nome, incrementa versione. Sposta i PDF in _PROCESSED/ o _ERRORS/.",
    come_potenziare: "Aggiungere OCR per PDF scansionati (pytesseract). Integrare con cross_ref_engine per aggiornare dependency_map automaticamente su ogni nuovo ATTO. Aggiungere preview della classificazione prima del salvataggio.",
    alimenta: ["Cross-Ref Engine"],
  },
  {
    id: 8, priority: "attiva", stato: "on-demand",
    nome: "Cross-Ref Engine",
    file: "AUTOMATIONS/core/cross_ref_engine.py",
    trigger: "CLI manuale (extract / scan / check / propagate / report)",
    cosa_fa: "Gestisce dipendenze cross-documento nell'ASSOLUTO V6. Mantiene sincronizzati valori come prezzi, misure, date tra più atti. Se cambia un valore master (es. prezzo V32), lo propaga a tutti gli atti che lo citano. Crea backup prima di ogni propagazione.",
    come_potenziare: "Aggiungere trigger automatico da pdf_to_memory: ogni nuovo ATTO → scan automatico. Alert su Telegram se rilevata inconsistenza. Interfaccia web nella dashboard per visualizzare la dependency map.",
    dipende_da: ["PDF to Memory"],
  },
  {
    id: 9, priority: "attiva", stato: "on-demand",
    nome: "Assoluto Splitter",
    file: "AUTOMATIONS/core/assoluto_splitter.py",
    trigger: "CLI manuale (split / compose / status)",
    cosa_fa: "Divide il documento master ASSOLUTO V6 in atti separati (split) o ricompone gli atti nel master (compose). Mantiene versioning completo: archivia sempre la versione precedente prima di ogni operazione.",
    come_potenziare: "Automatizzare split dopo ogni modifica al master. Aggiungere diff visuale tra versioni. Generare PDF del master composto automaticamente.",
  },
  {
    id: 10, priority: "attiva", stato: "on-demand",
    nome: "Mente Scanner",
    file: "NODES/MENTE_SCANNER/scanner.py",
    trigger: "API /api/trigger/scanner oppure manuale",
    cosa_fa: "Scansiona ricorsivamente LA MIA MENTE/ ed estrae decisioni, spec tecniche (mm/Hz/€/kg/RPM), milestone (date Q/mesi), personaggi (THEMIS, EVA, V32, MIMS...). Output: DATA/mente_digest.json con 818 estrazioni da 46 file.",
    come_potenziare: "Aggiungere embedding semantico per ricerca vettoriale. Schedulare automaticamente ogni settimana. Estrarre anche da audio (note vocali) con Whisper.",
    alimenta: ["API Server"],
  },
  {
    id: 11, priority: "attiva", stato: "persistente", proc: "api_server",
    nome: "API Server",
    file: "api_server.py",
    trigger: "Avvio con START_ECOSYSTEM.bat (localhost:5001)",
    cosa_fa: "Server Flask che serve dati live alla dashboard React: GET /api/state (STATE.json), GET /api/digest (mente_digest.json), PATCH /api/state (aggiorna campi), POST /api/scan (avvia scanner). CORS abilitato per localhost:5173.",
    come_potenziare: "Aggiungere WebSocket per aggiornamenti real-time senza polling. Aggiungere endpoint /api/automations per leggere AUTOMATIONS_MASTER.md live. Autenticazione API key per accesso esterno.",
    dipende_da: ["State Updater", "Mente Scanner"],
  },
  {
    id: 12, priority: "attiva", stato: "persistente",
    nome: "n8n Engine",
    file: "AUTOMATIONS/deploy/n8n/docker-compose.yml",
    trigger: "Sempre attivo (npx n8n locale / Oracle Cloud)",
    cosa_fa: "Motore di orchestrazione workflow. Riceve webhook da state_updater.py su ogni milestone. Esegue il workflow TITANIUM_OS Bridge: chiama Claude CLI per generare storytelling, salva .md in CONTENT_ENGINE, distribuisce output. PostgreSQL per persistenza, Traefik per SSL in cloud.",
    come_potenziare: "Aggiungere workflow per Edge TTS (voce automatica). Integrare LinkedIn API per posting automatico. Aggiungere monitoring con alert se n8n è offline.",
    dipende_da: ["State Updater"],
    alimenta: ["Content Engine"],
  },
  {
    id: 13, priority: "attiva", stato: "on-demand",
    nome: "Batch Launchers",
    file: "*.bat (7 file nella root)",
    trigger: "Doppio click manuale",
    cosa_fa: "Script Windows per avviare componenti: START_TITANIUM_OS.bat (watcher in background), SESSION_START.bat (session brief), STOP_TITANIUM_OS.bat (ferma watcher), SETUP_SCHEDULER.bat (Task Scheduler), START_ECOSYSTEM.bat (API + dashboard), APRI_PDF_DROP.bat, CLAUDE_CODE.bat.",
    come_potenziare: "Creare un launcher unico TITANIUM_MASTER.bat che avvia tutto in sequenza. Aggiungere check salute (verifica che watcher e API siano up). Aggiungere icona tray Windows per status live.",
  },

  // ── NOTTURNE (Task Scheduler — schedulate sul fisso, utente teo) ──
  {
    id: 30, priority: "notturna", stato: "scheduled", task: "TI_StoryAgent",
    nome: "Story Agent notturno",
    file: "NODES/STORY_AGENT/run_story_agent.bat",
    trigger: "Task Scheduler — TI_StoryAgent, ogni notte 02:07",
    cosa_fa: "Genera episodi narrativi dai commit recenti raggruppati per tema (max 10), poi committa gli episodi nuovi. Path portabili via _ti_paths.bat — niente più hardcode benen.",
    come_potenziare: "Generare anche il reel_hook per ogni episodio. Inviare su Telegram un digest degli episodi prodotti. Throttling se i commit della giornata sono pochi.",
    dipende_da: ["Batch Launchers"],
    alimenta: ["Multi-format Content Pipeline"],
  },
  {
    id: 31, priority: "notturna", stato: "scheduled", task: "TI_NightResearch",
    nome: "Night Research",
    file: "AUTOMATIONS/core/night_research.bat",
    trigger: "Task Scheduler — TI_NightResearch, ogni notte 03:37",
    cosa_fa: "Research agent su topic fissi (epoxy granite, guide lineari, composite molding, AI agent) per V32/MIMS/GENESIS, poi RAG update incrementale. Risolve Python/MENTE_DIR via _ti_paths.bat.",
    come_potenziare: "Topic dinamici letti da STATE.json (blockers/milestone attivi). Salvare un report sintetico delle scoperte. Limitare a paper post-2023.",
    alimenta: ["MENTE RAG"],
  },
  {
    id: 32, priority: "notturna", stato: "scheduled", task: "TI_NightPush",
    nome: "Night Push",
    file: "AUTOMATIONS/core/night_push.bat",
    trigger: "Task Scheduler — TI_NightPush, ogni notte 04:07",
    cosa_fa: "Push su GitHub dei commit del giorno (auth via gh keyring, zero token in chiaro) + aggiorna il profilo GitHub. Il sabato rigenera il dataset episodi per il fine-tuning.",
    come_potenziare: "Eseguire prima il sanitizer come gate pre-push. Notifica Telegram con il riassunto dei commit pushati. Skip pulito se la rete è offline.",
    dipende_da: ["Batch Launchers"],
  },
  {
    id: 33, priority: "notturna", stato: "scheduled", task: "TI_DailyBrief",
    nome: "Daily Brief",
    file: "AUTOMATIONS/core/daily_brief.py",
    trigger: "Task Scheduler — TI_DailyBrief, ogni mattina 07:30",
    cosa_fa: "Brief mattutino: dove sei, cosa hai fatto ieri, prossime milestone, countdown capannone (15 lug 2030). Output in DATA/daily_brief_last.md.",
    come_potenziare: "Lettura ad alta voce con Edge TTS all'avvio. Invio automatico su Telegram. Suggerimento del prossimo task in base ai blockers.",
  },
  {
    id: 34, priority: "notturna", stato: "scheduled", task: "TI_DeepFreeze",
    nome: "Deep Freeze (backup AES-256)",
    file: "AUTOMATIONS/core/deep_freeze.py",
    trigger: "Task Scheduler — TI_DeepFreeze, domenica 03:00",
    cosa_fa: "Backup settimanale crittografato AES-256 dell'ecosistema, con rotazione (max 8 freeze) e manifest. Protegge il sapere anche in caso di guasto disco.",
    come_potenziare: "Sync su Google Drive (15GB free) o S3. Notifica con dimensione e checksum. Verifica integrità automatica post-freeze.",
  },
  {
    id: 35, priority: "notturna", stato: "scheduled", task: "TI_FineTune",
    nome: "Fine-Tune LLM (GPU)",
    file: "AUTOMATIONS/core/night_finetune.bat",
    trigger: "Task Scheduler — TI_FineTune, domenica 01:00",
    cosa_fa: "Fine-tuning LoRA del Personal LLM (TinyLlama-1.1B) sul dataset episodi, su GPU GTX 1070 (CUDA, fp16). Guard llamafactory: skip pulito se la dipendenza manca. llamafactory 0.9.5 installato ✓.",
    come_potenziare: "Salire a un modello 3B quando la VRAM lo consente. Valutazione automatica post-training (perplexity sul validation set). Versionare i checkpoint in MODELS/.",
    dipende_da: ["Night Push"],
  },
  {
    id: 36, priority: "notturna", stato: "scheduled", task: "TI_NightAudit",
    nome: "Night Audit (cartella clinica)",
    file: "NODES/AUDIT_AGENT/night_audit.py",
    trigger: "Task Scheduler — TI_NightAudit, ogni notte 03:52",
    cosa_fa: "Self-audit notturno evidence-based: legge STATE, git, salute dei log (filtro 36h) e genera CRITICHE strutturate (Sonnet, fallback a regole) in DATA/audit/critiche_auto.json + system_health.json. v1.2 (15/06): cartella clinica AUTO-PULENTE — una critica non più osservata da 4 giorni si auto-chiude (resolved) e riapre da sola se il guasto torna (fix n03).",
    come_potenziare: "Gate qualità che blocchi se il RAG non risponde. Riassunto settimanale delle critiche risolte. Severità calibrata sul ripetersi del guasto.",
    alimenta: ["CRITICHE.md (cartella clinica file, root repo)"],
  },
  {
    id: 37, priority: "notturna", stato: "scheduled", task: "TI_AiWatch",
    nome: "AI News Watcher",
    file: "NODES/AI_NEWS_WATCHER/watcher.py",
    trigger: "Task Scheduler — TI_AiWatch, 03:25 (rotazione tier 48h)",
    cosa_fa: "Segue 30+ creator/repo AI (GitHub via gh keyring, RSS, YouTube), keyless. Scrive un digest in MENTE/KNOWLEDGE/AI_NEWS_RECENTI.md (vault + RAG + brief). È la sorgente esterna del Self-Improve.",
    come_potenziare: "Dedup semantico tra segnali. Punteggio di rilevanza per progetto (V32/MIMS/GENESIS). Soglia per promuovere un segnale a proposta.",
    alimenta: ["Self-Improve"],
  },
  {
    id: 38, priority: "notturna", stato: "scheduled", task: "TI_SelfImprove",
    nome: "Self-Improve (propone, umano approva)",
    file: "NODES/SELF_IMPROVE/self_improve.py",
    trigger: "Task Scheduler — TI_SelfImprove, ogni notte 04:30",
    cosa_fa: "Legge segnali interni (critiche, storie_gap, health, bussola, STATE) + esterni (AI News) e fa proporre a Sonnet 3-6 migliorie tipizzate (fix-interno | integra-esterno), marcate sicuro|approvazione, in DATA/self_improve/ + MENTE/KNOWLEDGE/AUTOMIGLIORAMENTO.md. GUARDRAIL (regola 11): SOLO proposte, mai modifiche/merge in autonomia.",
    come_potenziare: "Tasso di adozione delle proposte. Collegare ogni proposta a una critica/commit. Bozza PR pronta all'approvazione.",
    dipende_da: ["AI News Watcher", "Night Audit"],
  },
  {
    id: 39, priority: "attiva", stato: "event",
    nome: "Sync Dashboard + Pct-Sync",
    file: "AUTOMATIONS/core/sync_dashboard.py",
    trigger: "Hook Stop (fine sessione) + a mano",
    cosa_fa: "Tiene la dashboard allineata senza intervento: rebuild STORIE (episodes.json), refresh CRITICHE (bussola_todos), mirror Desktop e — step 4 (15/06) — PCT-SYNC: riallinea le % dei pilastri (MappaView + PILLARS_DATA + ROOT) alla FONTE UNICA STATE.json via NODES/PCT_SYNC/pct_sync.py. Lavora solo se le sorgenti sono cambiate.",
    come_potenziare: "Estendere la fonte-unica al resto dell'albero (nodi/leaf, non solo %). Check TS post-sync.",
    alimenta: ["CRITICHE.md (cartella clinica file)", "STORIE"],
  },
  {
    id: 40, priority: "notturna", stato: "scheduled", task: "TI_NightPush",
    nome: "Inventario notturno",
    file: "AUTOMATIONS/core/inventario_notturno.py",
    trigger: "Dentro Night Push, prima del push-check",
    cosa_fa: "Registra i commit nuovi del giro (dall'ultimo HEAD, stamp in DATA/.inventario_last.txt) in DOCS/INVENTARIO_NOTTURNO.md — il più recente in alto, con stats (episodi/critiche/RAG). Costruisce lo storico cumulativo di cosa è stato fatto. Lo slot dashboard 'INVENTARIO' lo mostra.",
    come_potenziare: "Raggruppare per area (V32/MIMS/GENESIS). Highlight dei milestone. Export settimanale leggibile.",
    dipende_da: ["Night Push"],
  },

  // ── ALTA PRIORITÀ ───────────────────────────────────────────
  {
    id: 14, priority: "alta", stato: "persistente", task: "TI_Watchdog",
    nome: "Automation Watch-Dog",
    file: "AUTOMATIONS/core/automation_watchdog.py",
    trigger: "Task Scheduler TI_Watchdog (Running) — supervisore permanente",
    cosa_fa: "Monitora che tutte le 13 automazioni attive siano in esecuzione. Se rileva che watcher, API server o n8n sono crashed, li riavvia automaticamente. Invia alert Telegram in caso di crash.",
    come_potenziare: "Integrare con Windows Service Manager. Aggiungere dashboard di salute nella UI. Storico crash e uptime per ogni processo.",
  },
  {
    id: 15, priority: "alta", stato: "scheduled", task: "TI_DeepFreeze",
    nome: "Backup Deep Freeze",
    file: "AUTOMATIONS/core/deep_freeze.py",
    trigger: "Task Scheduler TI_DeepFreeze — domenica 03:00 (= scheda Notturne #34)",
    cosa_fa: "Export settimanale crittografato (AES-256) dell'intero ecosistema in un archivio .zip compresso. Salva su disco locale + opzionalmente su Google Drive o S3. Mantiene le ultime 12 settimane.",
    come_potenziare: "Aggiungere sync su cloud storage (Google Drive gratuito 15GB). Notifica Telegram con dimensione backup e stato. Verifica integrità automatica con checksum.",
  },
  {
    id: 16, priority: "alta", stato: "dormiente",
    nome: "Sanitizzazione Dati Sensibili",
    file: "AUTOMATIONS/core/sanitizer.py",
    trigger: "Esiste + API /api/sanitizer/report — ma NON ancora cablato come gate pre-sync",
    cosa_fa: "Scansiona tutti i file .md e .json prima di qualsiasi sync cloud per identificare API key, password, token, dati personali (regex patterns). Blocca il sync se trova dati sensibili e notifica.",
    come_potenziare: "Aggiungere allowlist per chiavi già sicure. Integrazione con git pre-commit hook. Report settimanale su file a rischio.",
  },

  // ── MEDIA PRIORITÀ ──────────────────────────────────────────
  {
    id: 17, priority: "media", stato: "dormiente",
    nome: "Sync Cloud Bidirezionale Ghost",
    file: "AUTOMATIONS/core/ghost_sync.py",
    trigger: "Esiste su disco — NON ancora cablato a watcher/scheduler",
    cosa_fa: "Sincronizza TITANIUM_OS con un repository cloud (GitHub o Google Drive) in modalità bidirezionale. Gestisce i conflitti tramite timestamp di precisione: vince sempre la versione più recente. Esclude BACKUPS/ e node_modules/.",
    come_potenziare: "Usare rclone per sync multi-cloud. Aggiungere merge intelligente per file .md (unione non distruttiva). Sync selettivo per cartella.",
  },
  {
    id: 18, priority: "media", stato: "event",
    nome: "Validatore Sintassi MD",
    file: "AUTOMATIONS/core/md_validator.py",
    trigger: "CABLATO: watcher.py importa validate_file e lo chiama su ogni .md",
    cosa_fa: "Verifica la struttura di ogni file .md prima del salvataggio: gerarchia heading (h1→h2→h3 senza salti), link interni validi, tabelle ben formate, frontmatter YAML corretto. Blocca il backup se struttura corrotta.",
    come_potenziare: "Aggiungere correzione automatica per errori semplici. Integrazione con markdownlint. Statistiche qualità per file nel tempo.",
  },
  {
    id: 19, priority: "media", stato: "event",
    nome: "Auto-Linker Riferimenti",
    file: "AUTOMATIONS/core/auto_linker.py",
    trigger: "CABLATO: watcher.py importa run_auto_linker e lo chiama sugli eventi",
    cosa_fa: "Quando un file .md viene spostato, scansiona tutti gli altri .md per trovare link che puntano al vecchio path e li aggiorna automaticamente con il nuovo path. Zero link rotti nel sistema.",
    come_potenziare: "Costruire un indice globale dei link per ricerca istantanea. Aggiungere lint periodico per trovare link morti. Report dei file più linkati.",
  },
  {
    id: 20, priority: "media", stato: "event",
    nome: "Indicizzazione Semantica",
    file: "AUTOMATIONS/core/semantic_indexer.py",
    trigger: "CABLATO: watcher.py importa index_file e lo chiama su ogni .md salvato",
    cosa_fa: "Estrae tag semantici da ogni file .md salvato e li salva in un database SQLite (search_index.db). Permette ricerche logiche via API: 'tutti i file che parlano di titanio e costi' senza aprire ogni file.",
    come_potenziare: "Aggiungere embedding vettoriale (sentence-transformers) per ricerca semantica. Esporre endpoint /api/search nella dashboard. Clusterizzare file per argomento automaticamente.",
  },
  {
    id: 21, priority: "media", stato: "event",
    nome: "Compiler Documentale (TOC)",
    file: "AUTOMATIONS/core/toc_compiler.py",
    trigger: "CABLATO: watcher.py importa compile_toc e lo chiama su salvataggio .md",
    cosa_fa: "Genera e aggiorna automaticamente l'indice (Table of Contents) in ogni file .md che supera una soglia di lunghezza. Inserisce o aggiorna il blocco <!-- TOC --> con link agli heading. Utile per ASSOLUTO V6 e documenti lunghi.",
    come_potenziare: "Generare anche un indice master di tutto TITANIUM_OS. Creare sitemap navigabile nella dashboard. Aggiungere numeri di riga nei link per navigazione precisa.",
  },
  {
    id: 26, priority: "media", stato: "dormiente",
    nome: "Archivista Creativo",
    file: "AUTOMATIONS/core/archivista.py",
    trigger: "Esiste su disco — NON ancora cablato (atteso: n8n su milestone + manuale)",
    cosa_fa: "Scansiona /archive in CONTENT_ENGINE per estrarre il DNA creativo dei vecchi storytelling: temi ricorrenti, intuizioni, 'scintille' non usate. Li usa come base per generare nuovi contenuti coerenti con la voce e la storia del progetto.",
    come_potenziare: "Costruire un knowledge graph dei temi ricorrenti. Aggiungere scoring per ogni 'scintilla' (quante volte citata, quanto è stata efficace). Integrazione con Claude API per analisi semantica profonda.",
    dipende_da: ["n8n Engine"],
    alimenta: ["Multi-format Content Pipeline"],
  },

  // ── BASSA PRIORITÀ ──────────────────────────────────────────
  {
    id: 22, priority: "bassa", stato: "dormiente",
    nome: "Analisi Sentiment & Topic",
    file: "AUTOMATIONS/core/sentiment_topic.py",
    trigger: "Esiste su disco — NON schedulato (atteso: notte 03:00)",
    cosa_fa: "Classifica automaticamente i file .md in workspace tematici (tecnico, finanziario, creativo, operativo) analizzando il contenuto. Crea cluster per raggruppare file correlati. Output in SQLite per ricerca rapida.",
    come_potenziare: "Usare Claude API per classificazione semantica precisa. Visualizzare i cluster come mappa nella dashboard. Alert se un tema critico non viene aggiornato da troppo tempo.",
  },
  {
    id: 23, priority: "bassa", stato: "dormiente",
    nome: "Gestione Permessi ACL",
    file: "AUTOMATIONS/core/acl_manager.py",
    trigger: "Esiste su disco — NON cablato a watcher",
    cosa_fa: "Mappa i metadati dei file .md (frontmatter: access: private/shared/public) ai permessi Windows corrispondenti. Assicura che file con dati sensibili abbiano accesso limitato all'utente corrente.",
    come_potenziare: "Integrare con Active Directory per ambienti enterprise. Aggiungere log accessi. Sync permessi con Google Drive sharing settings.",
  },
  {
    id: 24, priority: "bassa", stato: "dormiente",
    nome: "Deep-Link Windows",
    file: "AUTOMATIONS/core/deep_link.py",
    trigger: "Esiste su disco — NON cablato a watcher",
    cosa_fa: "Crea automaticamente shortcut .lnk Windows per ogni file .md creato nel progetto. Le shortcut aprono il file direttamente nell'ambiente preferito (Cursor, Obsidian) con i privilegi già configurati.",
    come_potenziare: "Creare shortcut anche per aprire direttamente nella dashboard web. Aggiungere menu contestuale Windows integrato. Generare un launcher globale con ricerca.",
  },
  {
    id: 25, priority: "bassa", stato: "event",
    nome: "Pipeline Deploy View (md→json)",
    file: "AUTOMATIONS/core/md_view_pipeline.py",
    trigger: "CABLATO: watcher.py importa deploy_view e lo chiama su salvataggio .md",
    cosa_fa: "Trasforma ogni .md in una view JSON (DATA/views/*.json) che la dashboard React renderizza. È il 5° modulo event-driven reale che la vecchia view marcava come potenziamento futuro: gira già su ogni salvataggio.",
    come_potenziare: "Aggiungere editor inline direttamente nella dashboard. Hot-reload automatico su modifica file. Modalità focus per lettura immersiva.",
  },
  {
    id: 27, priority: "bassa", stato: "dormiente",
    nome: "Multi-format Content Pipeline",
    file: "AUTOMATIONS/core/content_pipeline.py",
    trigger: "Esiste su disco — NON cablato (atteso: da Archivista su storytelling)",
    cosa_fa: "Trasforma il file .md storytelling in 3 formati: post LinkedIn (tono professionale/visionario, max 3000 char), traccia podcast (narrativo, bullet ADHD-friendly), script video/fumetto (visivo, dinamico, con didascalie). Salva i 3 formati in sottocartelle di CONTENT_ENGINE.",
    come_potenziare: "Aggiungere formato newsletter Substack. Generare automaticamente hashtag ottimizzati per LinkedIn. A/B testing su formati diversi.",
    dipende_da: ["Archivista Creativo"],
  },

  // ── CONTENT ENGINE ──────────────────────────────────────────
  {
    id: 101, priority: "ce", stato: "event",
    nome: "CE-1: Trigger Milestone → Webhook n8n",
    file: "state_updater.py → n8n webhook",
    trigger: "set_milestone() / mark_milestone_done()",
    cosa_fa: "Punto di ingresso della content pipeline. Quando viene impostata o completata una milestone in state_updater.py, viene inviato un webhook HTTP POST a n8n con payload JSON (nome milestone, stato pillar, focus, next_step).",
    come_potenziare: "Aggiungere webhook anche su cambio status pillar. Throttling per evitare trigger multipli ravvicinati. Payload arricchito con estratti dal changelog.",
  },
  {
    id: 102, priority: "ce", stato: "dormiente",
    nome: "CE-2: Lettura Stato + Archivio",
    file: "n8n HTTP Request node → /api/state",
    trigger: "Da webhook trigger (CE-1)",
    cosa_fa: "n8n legge lo stato attuale del sistema via API (/api/state) e i vecchi storytelling dall'archivio CONTENT_ENGINE/archive/ per dare contesto storico a Claude nella generazione.",
    come_potenziare: "Caricare anche gli ultimi 5 changelog entry per contesto temporale. Aggiungere lettura mente_digest per arricchire il contesto semantico.",
  },
  {
    id: 103, priority: "ce", stato: "dormiente",
    nome: "CE-3: Generazione Storytelling",
    file: "n8n → Claude CLI (claude -p)",
    trigger: "Da CE-2",
    cosa_fa: "n8n costruisce un prompt contestualizzato e lo passa a Claude CLI tramite Execute Command node. Claude genera lo storytelling in italiano con sezioni: momento, significato, LinkedIn post, traccia podcast. Output: testo puro.",
    come_potenziare: "Passare anche esempi di storytelling precedenti come few-shot. Aggiungere parametri di stile configurabili (formale/narrativo/tecnico). Generare varianti e scegliere la migliore.",
  },
  {
    id: 104, priority: "ce", stato: "dormiente",
    nome: "CE-4: Salvataggio File .md",
    file: "n8n Code node → CONTENT_ENGINE/produzione_contenuti/",
    trigger: "Da CE-3",
    cosa_fa: "n8n salva l'output di Claude come file .md in CONTENT_ENGINE/produzione_contenuti/ con naming [data]_[nome_milestone].md. Il file è immediatamente disponibile per voice e video pipeline.",
    come_potenziare: "Aggiungere frontmatter YAML automatico (tags, data, pillar, tipo). Commit automatico su GitHub per versioning. Indicizzazione semantica automatica.",
  },
  {
    id: 105, priority: "ce", stato: "dormiente",
    nome: "CE-5: Text-to-Speech (Edge TTS)",
    file: "AUTOMATIONS/core/elevenlabs_tts.py",
    trigger: "Da CE-4 (n8n chiama script)",
    cosa_fa: "Converte il file .md storytelling in audio .mp3 usando Microsoft Edge TTS (gratuito, qualità alta, voce italiana). Salva in CONTENT_ENGINE/audio/[data]_[nome].mp3.",
    come_potenziare: "Aggiungere ElevenLabs per voci premium clonate. Generare capitoli separati per il podcast. Aggiungere musica di sottofondo automatica con ffmpeg.",
  },
  {
    id: 106, priority: "ce", stato: "dormiente",
    nome: "CE-6: Video / Avatar Animato",
    file: "AUTOMATIONS/core/video_generator.py",
    trigger: "Da CE-5 (opzionale, a pagamento)",
    cosa_fa: "Genera video con avatar animato usando HeyGen o D-ID API. Input: audio .mp3 + foto/avatar. Output: video .mp4 con avatar che parla il testo dello storytelling. Per ora salta con flag skip_video=true.",
    come_potenziare: "Usare avatar personalizzato creato da foto. Aggiungere sottotitoli automatici con Whisper. Generare reel verticale per Instagram/TikTok.",
  },
  {
    id: 107, priority: "ce", stato: "dormiente",
    nome: "CE-7: Distribuzione Canali",
    file: "n8n workflow nodes (Telegram, LinkedIn)",
    trigger: "Da CE-4 o CE-5 o CE-6",
    cosa_fa: "n8n distribuisce gli output sui canali configurati: Telegram (notifica immediata con testo .md), LinkedIn (post professionale formattato), archivio CONTENT_ENGINE/distribuiti/ (log di tutto il pubblicato).",
    come_potenziare: "Aggiungere scheduling ottimale (post LinkedIn nelle ore di picco). A/B test su testo. Analisi engagement e feedback loop per migliorare i prompt futuri.",
    dipende_da: ["CE-4: Salvataggio File .md"],
  },
];

// ─────────────────────────────────────────────────────────────
// COLORI E BADGE PER PRIORITÀ
// ─────────────────────────────────────────────────────────────
// Badge STATO operativo — verità verificata (P1a). È diverso dalla priorità:
// la priorità dice "quanto conta", lo stato dice "gira davvero o no".
const STATO_CONFIG: Record<Stato, { label: string; color: string; border: string; bg: string; help: string }> = {
  persistente: { label: "PERSISTENTE", color: "text-emerald-300", border: "border-emerald-500/40", bg: "bg-emerald-900/20", help: "processo sempre vivo (supervisionato dal watchdog)" },
  event:       { label: "EVENT-DRIVEN", color: "text-sky-300",     border: "border-sky-500/40",     bg: "bg-sky-900/20",     help: "girato dal watcher su evento file — non un processo a sé" },
  scheduled:   { label: "SCHEDULED",    color: "text-indigo-300",  border: "border-indigo-500/40",  bg: "bg-indigo-900/20",  help: "Task Scheduler TI_* (notturne)" },
  "on-demand": { label: "ON-DEMAND",    color: "text-amber-300",   border: "border-amber-500/40",   bg: "bg-amber-900/20",   help: "parte solo a mano / via API / CLI" },
  dormiente:   { label: "DORMIENTE",    color: "text-slate-400",   border: "border-slate-600/50",   bg: "bg-slate-800/40",   help: "il file ESISTE su disco ma non è cablato a nessun trigger" },
};

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; border: string; dot: string }> = {
  attiva:   { label: "ATTIVA",     color: "text-emerald-400", bg: "bg-emerald-900/20", border: "border-emerald-500/40", dot: "bg-emerald-500" },
  notturna: { label: "🌙 NOTTURNA", color: "text-indigo-300",  bg: "bg-indigo-900/20",  border: "border-indigo-500/40",  dot: "bg-indigo-400"  },
  alta:   { label: "🔧 ALTA",  color: "text-rose-400",    bg: "bg-rose-900/20",    border: "border-rose-500/40",    dot: "bg-rose-500"    },
  media:  { label: "🟡 MEDIA", color: "text-amber-400",   bg: "bg-amber-900/20",   border: "border-amber-500/40",   dot: "bg-amber-500"   },
  bassa:  { label: "🟢 BASSA", color: "text-slate-400",   bg: "bg-slate-800",      border: "border-slate-700",      dot: "bg-slate-500"   },
  ce:     { label: "⚡ CE",    color: "text-cyan-400",    bg: "bg-cyan-900/20",    border: "border-cyan-500/40",    dot: "bg-cyan-500"    },
};

// ─────────────────────────────────────────────────────────────
// COMPONENTE CARD SINGOLA AUTOMAZIONE
// ─────────────────────────────────────────────────────────────
function AutoCard({ a, live }: { a: Automation; live?: TaskLive }) {
  const [open, setOpen] = useState(false);
  const cfg = PRIORITY_CONFIG[a.priority];

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} overflow-hidden`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
        <span className="text-xs font-mono font-bold text-white flex-1">{a.nome}</span>

        {/* Badge stato LIVE da Task Scheduler */}
        {live && (
          <span
            title={`Stato: ${live.state} · prossima: ${live.next_run || "—"} · ultimo esito: ${live.last_result_label}`}
            className={`flex items-center gap-1 text-[8px] font-mono px-2 py-0.5 rounded border flex-shrink-0 ${
              live.active
                ? "border-emerald-500/40 text-emerald-400 bg-emerald-900/20"
                : "border-slate-600/40 text-slate-400 bg-slate-800/40"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${live.active ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
            {live.active ? "ATTIVO" : live.state || "?"}
          </span>
        )}

        {/* Badge STATO operativo reale (verità P1a) */}
        <span
          title={STATO_CONFIG[a.stato].help}
          className={`text-[8px] font-mono px-2 py-0.5 rounded border flex-shrink-0 ${STATO_CONFIG[a.stato].border} ${STATO_CONFIG[a.stato].color} ${STATO_CONFIG[a.stato].bg}`}
        >
          {STATO_CONFIG[a.stato].label}
        </span>

        <span className={`text-[8px] font-mono px-2 py-0.5 rounded border ${cfg.border} ${cfg.color} flex-shrink-0`}>
          {cfg.label}
        </span>
        {open ? <ChevronUp size={11} className="text-slate-500 flex-shrink-0" /> : <ChevronDown size={11} className="text-slate-500 flex-shrink-0" />}
      </button>

      {/* Corpo espandibile */}
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-800">
          {/* Stato live da Task Scheduler */}
          {live && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-3 text-[10px] font-mono">
              <span className="text-slate-500">stato: <span className={live.active ? "text-emerald-400" : "text-slate-300"}>{live.state}</span></span>
              <span className="text-slate-500">prossima: <span className="text-sky-300">{live.next_run || "—"}</span></span>
              <span className="text-slate-500">ultima: <span className="text-slate-300">{live.last_run || "mai"}</span></span>
              <span className="text-slate-500">esito: <span className="text-slate-300">{live.last_result_label}</span></span>
            </div>
          )}

          {/* File + trigger */}
          <div className="flex gap-4 pt-3">
            <div className="flex-1">
              <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">File</div>
              <div className="text-[10px] font-mono text-slate-400">{a.file}</div>
            </div>
            <div className="flex-1">
              <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Trigger</div>
              <div className="text-[10px] font-mono text-slate-400">{a.trigger}</div>
            </div>
          </div>

          {/* Cosa fa */}
          <div>
            <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Zap size={8} /> Cosa fa
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{a.cosa_fa}</p>
          </div>

          {/* Come potenziare */}
          <div className={`rounded-lg border border-slate-700 bg-slate-900/60 p-3`}>
            <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Rocket size={8} className="text-amber-400" />
              <span className="text-amber-400">Come potenziare</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">{a.come_potenziare}</p>
          </div>

          {/* Dipendenze */}
          {(a.dipende_da || a.alimenta) && (
            <div className="flex gap-4">
              {a.dipende_da && (
                <div className="flex-1">
                  <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Dipende da</div>
                  <div className="flex flex-wrap gap-1">
                    {a.dipende_da.map(d => (
                      <span key={d} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">{d}</span>
                    ))}
                  </div>
                </div>
              )}
              {a.alimenta && (
                <div className="flex-1">
                  <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <ArrowRight size={8} /> Alimenta
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {a.alimenta.map(d => (
                      <span key={d} className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-900/30 border border-emerald-500/30 text-emerald-400">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ARCHITETTURA FLOW VISUALE
// ─────────────────────────────────────────────────────────────
function ArchitetturaDiagram() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4">
        Flusso ramificazioni — architettura live
      </div>

      {/* Layer 1: Trigger primario */}
      <div className="flex items-center gap-3">
        <div className="bg-emerald-900/40 border border-emerald-500/50 rounded-lg px-3 py-2 text-[10px] font-mono text-emerald-400 font-bold">
          WATCHER.PY
        </div>
        <ArrowRight size={12} className="text-slate-600 flex-shrink-0" />
        <div className="flex gap-2 flex-wrap">
          {["BACKUP.PY", "CHANGELOG.PY", "STATE_UPDATER.PY"].map(n => (
            <div key={n} className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[9px] font-mono text-slate-300">{n}</div>
          ))}
        </div>
      </div>

      {/* Layer 2: State → n8n */}
      <div className="ml-8 flex items-center gap-3">
        <div className="w-px h-4 bg-slate-700 ml-2" />
        <div className="text-[9px] font-mono text-slate-600">milestone trigger</div>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <div className="bg-indigo-900/40 border border-indigo-500/50 rounded-lg px-3 py-2 text-[10px] font-mono text-indigo-400 font-bold">
          STATE_UPDATER.PY
        </div>
        <ArrowRight size={12} className="text-slate-600 flex-shrink-0" />
        <div className="bg-cyan-900/40 border border-cyan-500/50 rounded-lg px-3 py-2 text-[10px] font-mono text-cyan-400 font-bold">
          N8N WEBHOOK
        </div>
        <ArrowRight size={12} className="text-slate-600 flex-shrink-0" />
        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg px-3 py-2 text-[10px] font-mono text-cyan-300">
          CLAUDE CLI
        </div>
        <ArrowRight size={12} className="text-slate-600 flex-shrink-0" />
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg px-3 py-2 text-[10px] font-mono text-amber-300">
          STORYTELLING .MD
        </div>
      </div>

      {/* Layer 3: Content output */}
      <div className="ml-4 flex items-center gap-3">
        <div className="w-px h-4 bg-slate-700 ml-2" />
        <div className="text-[9px] font-mono text-slate-600">content pipeline</div>
      </div>
      <div className="flex gap-2 flex-wrap ml-4">
        {[
          { label: "AUDIO .MP3", color: "text-purple-400 border-purple-500/30 bg-purple-900/20" },
          { label: "VIDEO .MP4", color: "text-pink-400 border-pink-500/30 bg-pink-900/20" },
          { label: "LINKEDIN POST", color: "text-blue-400 border-blue-500/30 bg-blue-900/20" },
          { label: "TELEGRAM", color: "text-sky-400 border-sky-500/30 bg-sky-900/20" },
        ].map(o => (
          <div key={o.label} className={`border rounded px-2 py-1 text-[9px] font-mono ${o.color}`}>{o.label}</div>
        ))}
      </div>

      {/* Legenda */}
      <div className="flex gap-4 pt-2 border-t border-slate-800 mt-2">
        {[
          { dot: "bg-emerald-500", label: "Attiva" },
          { dot: "bg-indigo-500",  label: "Bridge n8n" },
          { dot: "bg-cyan-500",    label: "Content Engine" },
          { dot: "bg-amber-500",   label: "Output" },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${l.dot}`} />
            <span className="text-[9px] font-mono text-slate-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VISTA DEDICATA — AUTOMAZIONI NOTTURNE (sidebar → Notturne)
// Verifica al volo: quali sono, cosa fanno, quando girano, se attive
// ─────────────────────────────────────────────────────────────
export function NotturneView() {
  const notturne = AUTOMATIONS.filter(a => a.priority === "notturna");
  const [live, setLive]   = useState<Record<string, TaskLive>>({});
  const [apiOk, setApiOk] = useState<boolean | null>(null);   // null = caricamento
  const [updated, setUpdated] = useState<string>("");

  useEffect(() => {
    let alive = true;
    const load = () => {
      fetch("/api/tasks/notturne", { signal: AbortSignal.timeout(20000) })
        .then(r => r.json())
        .then(d => {
          if (!alive) return;
          if (d.ok) { setLive(d.tasks || {}); setApiOk(true); setUpdated(new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })); }
          else setApiOk(false);
        })
        .catch(() => { if (alive) setApiOk(false); });
    };
    load();
    const id = setInterval(load, 30_000);   // refresh ogni 30s
    return () => { alive = false; clearInterval(id); };
  }, []);

  const liveOf = (a: Automation) => (a.task ? live[a.task] : undefined);
  const activeCount = notturne.filter(a => liveOf(a)?.active).length;

  return (
    <div className="space-y-3">
      {/* Header stato */}
      <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[8px] font-mono text-indigo-300/70 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Moon size={9} className="text-sky-400" />
              Automazioni notturne — Task Scheduler (utente teo)
            </div>
            <div className="text-[8px] font-mono text-slate-500 mb-2">
              {apiOk === false
                ? "API offline — avvia api_server.py per lo stato live · orari sotto"
                : "Stato live da Task Scheduler · refresh ogni 30s · click per dettaglio"}
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-black text-sky-300 tabular-nums">
                {apiOk ? activeCount : notturne.length}
              </span>
              <span className="text-slate-600 font-mono mb-0.5 text-sm">
                {apiOk ? `attivi su ${notturne.length}` : "task schedulati"}
              </span>
            </div>
          </div>
          <div className="text-right">
            {apiOk === null && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-slate-600/40 bg-slate-800/40">
                <RefreshCw size={10} className="text-slate-400 animate-spin" />
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Lettura…</span>
              </div>
            )}
            {apiOk === true && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-emerald-500/40 bg-emerald-900/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Live</span>
              </div>
            )}
            {apiOk === false && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-amber-500/40 bg-amber-900/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider">Offline</span>
              </div>
            )}
            {updated && apiOk && (
              <div className="text-[7px] font-mono text-slate-600 mt-1">agg. {updated}</div>
            )}
          </div>
        </div>

        {/* Orari a colpo d'occhio */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-indigo-500/20">
          {[
            { t: "02:07", n: "StoryAgent" }, { t: "03:37", n: "Research" },
            { t: "04:07", n: "Push" },       { t: "07:30", n: "Daily Brief" },
            { t: "dom 03:00", n: "DeepFreeze" }, { t: "dom 01:00", n: "FineTune (GPU)" },
          ].map(s => (
            <div key={s.n} className="flex items-center gap-1.5 text-[9px] font-mono">
              <span className="text-sky-300 tabular-nums w-14">{s.t}</span>
              <span className="text-slate-500">{s.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cards con stato live per ciascun task */}
      {notturne.map(a => <AutoCard key={a.id} a={a} live={liveOf(a)} />)}

      <div className="text-center py-1">
        <span className="text-[7px] font-mono text-slate-800 uppercase tracking-[0.3em]">
          register_night_tasks.ps1 · path portabili via _ti_paths.bat
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPALE
// ─────────────────────────────────────────────────────────────
type Tab = "architettura" | "attive" | "da_fare" | "content_engine";

export function AutomationsView() {
  const [tab, setTab] = useState<Tab>("architettura");

  // Stato LIVE: task schedulati (/api/tasks/notturne) + processi persistenti
  // (/api/watchdog/status). Così il badge "ATTIVO" sulle card non è cosmetico.
  const [tasksLive, setTasksLive] = useState<Record<string, TaskLive>>({});
  const [procsLive, setProcsLive] = useState<Record<string, { alive: boolean; pid?: number }>>({});

  useEffect(() => {
    let alive = true;
    const load = () => {
      fetch("/api/tasks/notturne", { signal: AbortSignal.timeout(20000) })
        .then(r => r.json()).then(d => { if (alive && d.ok) setTasksLive(d.tasks || {}); })
        .catch(() => {});
      fetch("/api/watchdog/status", { signal: AbortSignal.timeout(20000) })
        .then(r => r.json()).then(d => { if (alive && d.ok) setProcsLive(d.services || {}); })
        .catch(() => {});
    };
    load();
    const id = setInterval(load, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  // Deriva un TaskLive uniforme per qualsiasi card (processo persistente o task).
  const liveOf = (a: Automation): TaskLive | undefined => {
    if (a.proc && procsLive[a.proc]) {
      const s = procsLive[a.proc];
      return {
        state: s.alive ? "Running" : "Stopped", next_run: "", last_run: "",
        last_result_label: s.alive ? `vivo · pid ${s.pid ?? "?"}` : "giù",
        active: s.alive,
      };
    }
    if (a.task && tasksLive[a.task]) return tasksLive[a.task];
    return undefined;
  };

  const attive   = AUTOMATIONS.filter(a => a.priority === "attiva");
  const notturne = AUTOMATIONS.filter(a => a.priority === "notturna");
  const daFare   = AUTOMATIONS.filter(a => ["alta", "media", "bassa"].includes(a.priority));
  const ce       = AUTOMATIONS.filter(a => a.priority === "ce");

  // Conteggio per STATO REALE (verità P1a — i numeri che la vecchia view nascondeva)
  const statoCounts = (["persistente", "event", "scheduled", "on-demand", "dormiente"] as Stato[])
    .map(s => ({ s, n: AUTOMATIONS.filter(a => a.stato === s).length }));

  const TABS: Array<{ id: Tab; label: string; count: number; color: string }> = [
    { id: "architettura",  label: "ARCHITETTURA",   count: 0,         color: "text-slate-400" },
    { id: "attive",        label: "ATTIVE",          count: attive.length + notturne.length,  color: "text-emerald-400" },
    { id: "da_fare",       label: "DA FARE",         count: daFare.length,  color: "text-amber-400"   },
    { id: "content_engine",label: "CONTENT ENGINE",  count: ce.length,      color: "text-cyan-400"    },
  ];

  return (
    <div className="space-y-4">
      {/* Stats header */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Attive",        value: attive.length,  color: "text-emerald-400", border: "border-emerald-500/30" },
          { label: "Alta priorità", value: daFare.filter(a => a.priority === "alta").length,  color: "text-rose-400",   border: "border-rose-500/30"   },
          { label: "Da fare tot.",  value: daFare.length,  color: "text-amber-400",  border: "border-amber-500/30" },
          { label: "Content Engine",value: ce.length,      color: "text-cyan-400",   border: "border-cyan-500/30"  },
        ].map(s => (
          <div key={s.label} className={`bg-slate-900 border ${s.border} rounded-xl p-3 text-center`}>
            <div className={`text-xl font-black font-mono ${s.color}`}>{s.value}</div>
            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Striscia VERITÀ — stato operativo reale (P1a audit 06/06). I badge sopra
          contano per "priorità"/categoria; questi contano per "gira davvero o no". */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
        <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-2">
          Stato operativo reale — verificato contro processi · Task Scheduler · watcher.py
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statoCounts.map(({ s, n }) => {
            const c = STATO_CONFIG[s];
            return (
              <span
                key={s}
                title={c.help}
                className={`inline-flex items-center gap-1.5 text-[9px] font-mono px-2 py-1 rounded border ${c.border} ${c.bg} ${c.color}`}
              >
                <span className="font-black tabular-nums">{n}</span>
                {c.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-slate-800 pb-0">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors border-b-2 -mb-px ${
              tab === t.id
                ? `${t.color} border-current`
                : "text-slate-600 border-transparent hover:text-slate-400"
            }`}
          >
            {t.label}{t.count > 0 && <span className="ml-1 opacity-60">({t.count})</span>}
          </button>
        ))}
      </div>

      {/* Contenuto tab */}
      {tab === "architettura" && (
        <div className="space-y-4">
          <ArchitetturaDiagram />
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <GitBranch size={9} /> Regole architettura
            </div>
            <div className="space-y-2">
              {[
                "watcher.py è il trigger primario — tutto parte da lì",
                "state_updater.py è il bridge verso n8n — gestisce il confine interno/esterno",
                "n8n gestisce tutto ciò che è esterno: API terze parti, distribuzione, scheduling cloud",
                "CONTENT_ENGINE è separato da TITANIUM_OS — sorgente dati vs produzione contenuti",
                "n8n_bridge.json è l'unico file da toccare per cambiare URL webhook — mai hardcodare",
                "Ogni automazione è non-bloccante (thread separato) — il sistema non si ferma mai per un webhook fallito",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-600 mt-1.5 flex-shrink-0" />
                  <span className="text-[11px] text-slate-400">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "attive" && (
        <div className="space-y-2">
          {attive.map(a => <AutoCard key={a.id} a={a} live={liveOf(a)} />)}

          {/* Sottocartella Notturne — stessa cartella ATTIVE, piccola scritta, colore indigo */}
          {notturne.length > 0 && (
            <>
              <div className="text-[9px] font-mono text-indigo-300 uppercase tracking-widest border-t border-slate-800 pt-3 mt-1 flex items-center gap-1.5">
                🌙 Notturne — schedulate (Task Scheduler) ({notturne.length})
              </div>
              {notturne.map(a => <AutoCard key={a.id} a={a} live={liveOf(a)} />)}
            </>
          )}
        </div>
      )}

      {tab === "da_fare" && (
        <div className="space-y-4">
          {(["alta", "media", "bassa"] as Priority[]).map(p => {
            const items = daFare.filter(a => a.priority === p);
            if (!items.length) return null;
            return (
              <div key={p}>
                <div className={`text-[9px] font-mono uppercase tracking-widest mb-2 ${PRIORITY_CONFIG[p].color}`}>
                  — Priorità {PRIORITY_CONFIG[p].label} ({items.length})
                </div>
                <div className="space-y-2">
                  {items.map(a => <AutoCard key={a.id} a={a} live={liveOf(a)} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "content_engine" && (
        <div className="space-y-2">
          <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-3 mb-3">
            <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Pipeline</div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {ce.map((a, i) => (
                <div key={a.id} className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-cyan-300">{a.nome.split(": ")[1] || a.nome}</span>
                  {i < ce.length - 1 && <ArrowRight size={9} className="text-slate-600" />}
                </div>
              ))}
            </div>
          </div>
          {ce.map(a => <AutoCard key={a.id} a={a} />)}
        </div>
      )}
    </div>
  );
}
