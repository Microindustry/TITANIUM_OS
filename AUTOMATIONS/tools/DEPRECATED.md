<!-- TOC -->

- [AUTOMATIONS/tools  script legacy vs attuali](#automationstools-script-legacy-vs-attuali)
  - [ATTUALI (portabili  tenere)](#attuali-portabili-tenere)
  - [LEGACY (hardcoded benen / DESKTOP-DIUB4EJ  rotti su questa macchina teo)](#legacy-hardcoded-benen-desktop-diub4ej-rotti-su-questa-macchina-teo)
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
crea il rischio di registrare task in conflitto. Raccomandazione invariata: **rimuovere quando deciso**.

| Script | Stato | Superato da | Raccomandazione |
|--------|-------|-------------|-----------------|
| `set_tasks_hl.ps1` | de-hardcodato #45, portabile | `register_night_tasks.ps1` | **Rimuovere** (ridondante) |
| `SETUP_ADMIN_COMPLETE.ps1` | de-hardcodato #45, portabile | `register_night_tasks.ps1` + `register_watchdog.ps1` | **Rimuovere** (ridondante) |
| `fix_tasks_admin.ps1` | de-hardcodato #45, portabile | `register_night_tasks.ps1` (TI_FineTune) | **Rimuovere** (ridondante) |
| `optimize_windows_admin.bat` | de-hardcodato #45, portabile | `register_night_tasks.ps1` + SETUP_ADMIN.bat | **Rimuovere** (ridondante) |
| `FIX_ADMIN_TASKS.bat` | de-hardcodato #45, portabile | `register_night_tasks.ps1` | **Rimuovere** (ridondante) |
| `../../START_GETAC.bat` (root) | Launcher Getac (benen) | `START_LOGIN.bat` (fisso) | Rimuovere o archiviare se il Getac non si usa più |

### Come rimuoverli (quando decidi)

```powershell
# dalla cartella tools\ — git rm così resta nella history e si può recuperare
git rm set_tasks_hl.ps1 SETUP_ADMIN_COMPLETE.ps1 fix_tasks_admin.ps1 `
       optimize_windows_admin.bat FIX_ADMIN_TASKS.bat
git rm ..\..\START_GETAC.bat   # opzionale, solo se molli il Getac
git commit -m "chore(tools): rimuovo registrar legacy hardcoded benen (superati dai portabili)"
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
