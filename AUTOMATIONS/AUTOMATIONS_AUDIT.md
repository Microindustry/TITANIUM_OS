<!-- TOC -->

- [AUTOMAZIONI  Audit reale (P1a: stanno girando davvero?)](#automazioni-audit-reale-p1a-stanno-girando-davvero)
  - [Il problema: la view AUTOMAZ mente in DUE direzioni](#il-problema-la-view-automaz-mente-in-due-direzioni)
  - [Cosa gira DAVVERO (verificato)](#cosa-gira-davvero-verificato)
    - [Processi persistenti (3)  supervisionati dal watchdog](#processi-persistenti-3-supervisionati-dal-watchdog)
    - [Scheduled (Task Scheduler TI_)  stato reale 06/06](#scheduled-task-scheduler-ti-stato-reale-0606)
    - [Event-driven (girano quando il watcher vede un cambio file, NON persistenti)](#event-driven-girano-quando-il-watcher-vede-un-cambio-file-non-persistenti)
    - [On-demand (manuale / API / MCP)](#on-demand-manuale-api-mcp)
  - [Anomalie da chiudere](#anomalie-da-chiudere)
  - [Raccomandazione (fix P1a vero, prossimo step)](#raccomandazione-fix-p1a-vero-prossimo-step)
  - [AGGIORNAMENTO 06/06 (sessione 32)  il grosso FATTO  scoperta](#aggiornamento-0606-sessione-32-il-grosso-fatto-scoperta)

<!-- /TOC -->

# AUTOMAZIONI — Audit reale (P1a: "stanno girando davvero?")

*06/06/2026 · sessione autonoma · richiesta di Matteo nel PIANO P1a*

> Matteo (P1a): *"AUDIT REALE delle 13 attive / 3 alta priorità: che ruolo
> hanno, stanno girando davvero, perché lo stato è fermo."* Questa è la verità
> verificata contro Task Scheduler + processi + codice del watcher.

## Il problema: la view AUTOMAZ mente in DUE direzioni

`AutomationsView.tsx` ha un array **hardcoded di 40 voci** (13 attiva · 6 notturna
· 3 alta · 6 media · 5 bassa · 7 ce). Confrontato con la realtà:

1. **SOVRASTIMA** — ~14 voci puntano a file marcati "(da creare)" che **non
   esistono** (watchdog_monitor, sanitizer, cloud_sync, toc_generator,
   archivista, topic_analyzer, acl_manager, deeplink_creator, formatter,
   semantic_index, ...). Sono *pianificate*, non automazioni: listarle come tali
   è teatro.
2. **SOTTOSTIMA** — moduli che **esistono e girano davvero** (event-driven dal
   watcher) sono marcati "(da creare)" nella view: `md_validator.py`,
   `semantic_indexer.py`, `toc_compiler.py`, `auto_linker.py`,
   `md_view_pipeline.py` (verificati su disco + importati da watcher.py).

## Cosa gira DAVVERO (verificato)

### Processi persistenti (3) — supervisionati dal watchdog
- `watcher.py` — osserva il filesystem, triggera le automazioni event-driven.
- `api_server.py` — Flask :5001.
- `mente_watcher.py` — watch MENTE/ → /api/scan.

### Scheduled (Task Scheduler `TI_*`) — stato reale 06/06
| Task | Stato | Ultimo run | Esito |
|------|-------|-----------|-------|
| TI_Watchdog | **Running** | 03/06 21:24 | in esecuzione (0x41001) |
| TI_DailyBrief | Ready | 05/06 07:30 | **0 OK** |
| TI_NightPush | Ready | 05/06 04:07 | **0 OK** |
| TI_NightResearch | Ready | 05/06 03:37 | **0 OK** |
| TI_StoryAgent | Ready | 05/06 02:07 | **0 OK** |
| TI_DeepFreeze | Ready | mai (dom 03:00) | non ancora partito |
| TI_FineTune | Ready | mai (dom 01:00) | non ancora partito |
| TI_NightAudit | Ready | **mai (via scheduler)** | ⚠ vedi sotto |

### Event-driven (girano quando il watcher vede un cambio file, NON persistenti)
`backup.py`, `changelog_writer.py`, `state_updater.py`, `md_validator.py`,
`semantic_indexer.py`, `toc_compiler.py`, `auto_linker.py`, `md_view_pipeline.py`.
→ Sono "attive" solo nel senso che il watcher le chiama sugli eventi. Non sono
13 processi indipendenti in esecuzione.

### On-demand (manuale / API / MCP)
`scanner.py`, `daily_brief.py` (anche schedulato), `milestone_tracker.py`,
`pdf_to_memory.py`, `cross_ref_engine.py`, `assoluto_splitter.py`,
`deep_freeze.py`.

## Anomalie da chiudere

1. ~~**TI_NightAudit: lo scheduler dice "mai eseguito"**~~ **[RISOLTO 06/06]**
   `/api/tasks/notturne` ora riporta `TI_NightAudit: last_run 2026-06-06 03:52,
   result 0 (OK)`. Il task **gira davvero via scheduler** — il "mai eseguito"
   era un dato stale letto prima del primo run notturno. Nessuna riparazione
   necessaria: la cartella clinica si aggiorna da sola.
2. **TI_DeepFreeze / TI_FineTune**: mai partiti perché schedulati di domenica e
   la domenica non è ancora arrivata dopo la registrazione — atteso, ricontrollare
   dopo il primo weekend.
3. **"3 alta priorità"**: sono tutte voci "(da creare)" → non esistono. Lo "stato
   fermo" che vedi è corretto: non c'è niente da far girare.

## Raccomandazione (fix P1a vero, prossimo step)

Lo stato reale ESISTE già via API (`/api/tasks/notturne` per le scheduled,
processi per i persistenti). Il fix:
1. Aggiungere un campo `stato: "persistente" | "scheduled" | "event" | "on-demand"
   | "pianificata"` a ogni voce dell'array (o meglio: **derivarlo live**).
2. Le "pianificata" (da creare) in una sezione separata "Roadmap automazioni",
   non mescolate con quelle reali.
3. Correggere le 5 voci sottostimate (md_validator & co.) da "da creare" a
   "event-driven attiva".
4. Collegare il badge stato al vivo come fatto per le Notturne (Get-ScheduledTask
   + processi), così la view smette di essere un quadro statico.

> Non ho riscritto l'array (40 voci) in questa sessione: è il grosso del P1a e
> va fatto con calma/collegato al vivo. Questo audit è la base per farlo.

## AGGIORNAMENTO 06/06 (sessione #32) — il grosso FATTO + scoperta

Riscritto l'array (commit `5f148a7`, additivo, build verde). **Scoperta che
l'audit non aveva colto**: i ~14 file marcati "(da creare)" **esistono già su
disco**, solo con nomi diversi da quelli citati nella view:

| view diceva "(da creare)" | file reale su disco | stato reale |
|---|---|---|
| `watchdog_monitor.py` | `automation_watchdog.py` | persistente (TI_Watchdog) |
| `cloud_sync.py` | `ghost_sync.py` | dormiente |
| `semantic_index.py` | `semantic_indexer.py` | **event (cablato)** |
| `toc_generator.py` | `toc_compiler.py` | **event (cablato)** |
| `md_validator.py` | `md_validator.py` | **event (cablato)** |
| `auto_linker.py` | `auto_linker.py` | **event (cablato)** |
| (mancava la card) | `md_view_pipeline.py` | **event (cablato)** |
| `topic_analyzer.py` | `sentiment_topic.py` | dormiente |
| `acl_manager.py` | `acl_manager.py` | dormiente |
| `deeplink_creator.py` | `deep_link.py` | dormiente |
| `archivista.py` | `archivista.py` | dormiente |
| `formatter.py` | `content_pipeline.py` | dormiente |
| `sanitizer.py` | `sanitizer.py` | dormiente (ha API report) |

Quindi la classe corretta non è "pianificata/da creare" ma **dormiente**
(esiste, non cablata a nessun trigger). Aggiunto campo `stato` a ogni voce +
badge UI + striscia conteggio per stato. **Resta**: collegare il badge
`persistente` al vivo (`/api/watchdog/status`) anche nella view principale
(oggi solo le Notturne leggono `/api/tasks/notturne`).
