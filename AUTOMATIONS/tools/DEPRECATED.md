<!-- TOC -->

- [AUTOMATIONS/tools  script legacy vs attuali](#automationstools-script-legacy-vs-attuali)
  - [ATTUALI (portabili  tenere)](#attuali-portabili-tenere)
  - [LEGACY (ridondanti  superati dai registrar portabili)](#legacy-ridondanti-superati-dai-registrar-portabili)
    - [Come rimuoverli (quando decidi)](#come-rimuoverli-quando-decidi)
  - [Avvio ecosistema al login  RISOLTO (nessun gap)](#avvio-ecosistema-al-login-risolto-nessun-gap)

<!-- /TOC -->

# AUTOMATIONS/tools — script legacy vs attuali

Audit del 2026-06-05. Chiude il thread "valutare se rimuovere i vecchi registrar".
**Nessuno script è stato cancellato**: la rimozione è una decisione di Matteo. Qui solo
la mappa e la raccomandazione.

## ✅ ATTUALI (portabili — tenere)

| Script | Cosa fa | Note |
|--------|---------|------|
| `register_night_tasks.ps1` | Registra i 6 task notturni in Task Scheduler | Path dinamici (`$PSScriptRoot`), `$env:USERNAME`, auto-UAC. Registra: TI_StoryAgent, TI_NightResearch, TI_NightPush, TI_DailyBrief, TI_DeepFreeze, TI_FineTune |
| `register_watchdog.ps1` | Registra `TI_Watchdog` (AtLogon, RunLevel Highest) | Portabile, supervisiona api_server + mente_watcher |
| `../../SETUP_ADMIN.bat` (root) | 24/7 (no standby) + RDP + OpenSSH | **Pulito, machine-agnostic — tenere.** Non è hardcoded benen |

## ⚠️ LEGACY (ridondanti — superati dai registrar portabili)

Tutti **superati** dai due registrar portabili sopra. **NB (24/06, sess.#45):** non sono
più hardcoded `benen` — de-hardcodati in place (root da `$PSScriptRoot`/`%~dp0`, utente da
`$env:USERNAME`/`%USERNAME%`, PC da `%COMPUTERNAME%`), quindi ora **girerebbero** su qualsiasi
macchina. Restano comunque **ridondanti** con `register_night_tasks.ps1` (la fonte unica): tenerli
crea il rischio di registrare task in conflitto.

**✅ RIMOSSI #45 (24/06):** i 5 registrar legacy sono stati eliminati con `git rm`
(restano recuperabili dalla history). La fonte unica per i task notturni è ora
`register_night_tasks.ps1` (+ `register_watchdog.ps1`). Tabella storica:

| Script | Stato | Superato da |
|--------|-------|-------------|
| `set_tasks_hl.ps1` | 🗑️ rimosso #45 | `register_night_tasks.ps1` |
| `SETUP_ADMIN_COMPLETE.ps1` | 🗑️ rimosso #45 | `register_night_tasks.ps1` + `register_watchdog.ps1` |
| `fix_tasks_admin.ps1` | 🗑️ rimosso #45 | `register_night_tasks.ps1` (TI_FineTune) |
| `optimize_windows_admin.bat` | 🗑️ rimosso #45 | `register_night_tasks.ps1` + SETUP_ADMIN.bat |
| `FIX_ADMIN_TASKS.bat` | 🗑️ rimosso #45 | `register_night_tasks.ps1` |
| `../../START_GETAC.bat` (root) | ancora presente | `START_LOGIN.bat` (fisso) — rimuovere/archiviare se il Getac non si usa più |

### Recuperarli (se mai servissero)

```powershell
# sono nella git history: ripristina un file da prima della rimozione (#45, commit precedente a HEAD)
git checkout <commit>~1 -- AUTOMATIONS/tools/set_tasks_hl.ps1
```

## ✅ Avvio ecosistema al login — RISOLTO (nessun gap)

I vecchi script registravano un task **`TI_StartEcosystem`**. Il nuovo registrar non lo
crea, ma **non serve**: sul fisso l'avvio al login è gestito da un collegamento nella
cartella Esecuzione automatica:

```
shell:startup\TITANIUM_OS.lnk  ->  C:\Users\teo\TITANIUM_OS\START_LOGIN.bat  (verificato 2026-06-05)
```

Quindi al login parte `START_LOGIN.bat` (dashboard, n8n, chrome-CDP, api_server, watcher).
I servizi core sono inoltre coperti da `TI_Watchdog`, che li rilancia se cadono.

> Nota: `START_LOGIN.bat` ora risolve `claude.exe` dinamicamente (commit del 2026-06-05),
> quindi anche l'avvio al login apre Claude Code correttamente.
