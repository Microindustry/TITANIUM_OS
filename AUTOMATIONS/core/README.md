<!-- TOC -->

- [AUTOMATIONS/core  indice raggruppato](#automationscore-indice-raggruppato)
  - [Motore eventi (girano da soli, trigger  modifica file)](#motore-eventi-girano-da-soli-trigger-modifica-file)
  - [Notturne (Task Scheduler  launcher e coda)](#notturne-task-scheduler-launcher-e-coda)
  - [Sessione Claude (inizio / fine / hook Stop)](#sessione-claude-inizio-fine-hook-stop)
  - [Conoscenza / indici / canone](#conoscenza-indici-canone)
  - [Contenuti / distribuzione](#contenuti-distribuzione)
  - [Manutenzione / utility](#manutenzione-utility)

<!-- /TOC -->

# AUTOMATIONS/core — indice raggruppato

*Creato 07/07/2026 (decisione 23/06 "raggruppare core"). Il raggruppamento è LOGICO,
non fisico: spostare 40+ script romperebbe i path di 10 task schedulati, degli hook
Stop e dei .bat — il rischio non vale il beneficio. Questa è la mappa.*
*Regola: nuovo script in core → nuova riga qui, nel gruppo giusto.*

## Motore eventi (girano da soli, trigger = modifica file)
| Script | Cosa fa |
|---|---|
| `watcher.py` | FS-watcher del repo: a ogni evento chiama backup/changelog/state (single-instance dal 07/07) |
| `backup.py` | snapshot per-evento in `BACKUPS/[timestamp]/`, max 30 versioni per file |
| `changelog_writer.py` | appende l'evento a `VERSIONS/changelog.md` |
| `state_updater.py` | tocca `BRAIN/STATE.json` (last_action/last_update) |
| `md_validator.py` | verifica struttura .md al salvataggio |

## Notturne (Task Scheduler — launcher e coda)
| Script | Cosa fa |
|---|---|
| `_ti_paths.bat` | risolutore path portabile, chiamato da TUTTI i .bat notturni |
| `night_research.bat` | catena ricerca: research agent + RAG self-heal/snapshot |
| `night_push.bat` | fine catena: inventario, push GitHub, dataset (sabato), **retention**, stato fisico |
| `night_finetune.bat` | fine-tuning Personal LLM (LoRA, GPU) |
| `night_ai_watch.bat` | AI News Watcher keyless (tier 48h) |
| `night_self_improve.bat` | SELF_IMPROVE propose-only → `DATA/self_improve/proposte_*.json` |
| `night_topics.py` | genera i topic di ricerca da STATE.json + RAG |
| `inventario_notturno.py` | inventario cumulativo commit → `DOCS/INVENTARIO_NOTTURNO.md` |
| `retention.py` | **la regola detriti disco** (chroma-debris, BACKUPS vecchi, log) — 5 regole nell'header |
| `deep_freeze.py` | export settimanale AES-256 → `BACKUPS/deep_freeze/` (rotazione 8, chroma esclusa) |
| `stato_fisico.py` | semaforo umano `STATO_SISTEMA.txt` sul Desktop, a fine catena |

## Sessione Claude (inizio / fine / hook Stop)
| Script | Cosa fa |
|---|---|
| `session_orienter.py` | orientamento a inizio sessione |
| `stop_hooks.py` | orchestratore hook Stop (3 in parallelo, timeout) |
| `sync_dashboard.py` | mirror bussola → Desktop + sync incrementale a fine sessione |
| `generate_functions_list.py` | `FUNZIONI_SISTEMA.txt` sul Desktop a chiusura |
| `generate_restart_prompt.py` | DEPRECATO (il RIAVVIO lo scrive la skill salva) |
| `daily_brief.py` | brief mattutino da STATE + contenuti (`brief`) |
| `milestone_tracker.py` | check milestone mattutino |

## Conoscenza / indici / canone
| Script | Cosa fa |
|---|---|
| `canon_guard.py` | LA regola di canone (frasi vietate V32/VULCAN), usata da story_agent + night_audit |
| `semantic_indexer.py` | tag/indice semantico a ogni salvataggio .md |
| `sentiment_topic.py` | classifica i .md in workspace tematici |
| `auto_linker.py` | scan link interni nei .md |
| `toc_compiler.py` | TOC automatici nei .md |
| `md_view_pipeline.py` | .md → payload JSON per la dashboard (`DATA/views/`) |
| `acl_manager.py` | legge metadati frontmatter .md |
| `sanitizer.py` | scan segreti/PII nei .md/.json |
| `pdf_to_memory.py` | `PDF_DROP/*.pdf` → MENTE |
| `mente_version.bat` | committa MENTE nel suo git locale (mai push) |

## Contenuti / distribuzione
| Script | Cosa fa |
|---|---|
| `content_pipeline.py` | storytelling .md → episodio (grounding RAG) |
| `archivista.py` | scansione archive CONTENT_ENGINE |
| `assoluto_splitter.py` | split del file ASSOLUTO master |
| `cross_ref_engine.py` | dipendenze cross-atto ASSOLUTO |
| `social_distributor.py` | distribuzione LinkedIn/Telegram |
| `elevenlabs_tts.py` | testo → audio .mp3 |
| `video_generator.py` | testo → video avatar (HeyGen) |
| `update_github_profile.py` | README profilo GitHub live |

## Manutenzione / utility
| Script | Cosa fa |
|---|---|
| `kill_api.ps1` | spegne API 5001 + watchdog anche se elevati (da shell admin) |
| `automation_watchdog.py` | check automazioni critiche (dormiente — il watchdog vero è `SERVICES/watchdog.py`) |
| `deep_link.py` | shortcut .lnk dinamiche |
| `ghost_sync.py` | sync con repo esterno |
