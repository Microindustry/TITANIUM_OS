@echo off
:: ========================================================
:: ECOSYSTEM_OS — AVVIO COMPLETO
:: File    : START_ECOSYSTEM.bat
:: Versione: 1.2.0
:: Data    : 2026-03-16
:: ========================================================
:: Avvia in ordine:
::   0a. Watcher file-system (background, silenzioso)
::   0b. Mente Watcher (background, silenzioso)
::   0c. Automation Watchdog (background, silenzioso)
::   1. Flask API server   (porta 5001)  — dati live STATE.json / digest
::   2. Vite dev server    (porta 5173)  — dashboard React
::   3. Apre browser       → http://localhost:5173
:: ========================================================

title ECOSYSTEM_OS — Avvio sistema

set ROOT=%~dp0
set DASHBOARD=%ROOT%DASHBOARD
set API=%ROOT%api_server.py

:: ── Verifica Python ────────────────────────────────────────
python --version > nul 2>&1
if errorlevel 1 (
    echo ERRORE: Python non trovato.
    pause & exit /b 1
)

:: ── Verifica Node ─────────────────────────────────────────
node --version > nul 2>&1
if errorlevel 1 (
    echo ERRORE: Node.js non trovato.
    pause & exit /b 1
)

:: ── 0a. Watcher file-system TITANIUM_OS (background, silenzioso) ──
echo [ECOSYSTEM] Avvio Watcher TITANIUM_OS (background)...
start /B pythonw "%ROOT%AUTOMATIONS\core\watcher.py"

:: ── 0b. Watcher LA MIA MENTE → auto-scan (background, silenzioso) ──
echo [ECOSYSTEM] Avvio Mente_Watcher (auto-analisi documenti)...
start /B pythonw "%ROOT%NODES\MENTE_WATCHER\mente_watcher.py"

:: ── 0c. Automation Watchdog — monitora e riavvia processi critici ──
echo [ECOSYSTEM] Avvio Watchdog automazioni (background)...
start /B pythonw "%ROOT%CORE\watchdog.py"

:: ── 1. Flask API server ───────────────────────────────────
echo [ECOSYSTEM] Avvio API server (porta 5001)...
start "ECOSYSTEM API :5001" cmd /k "cd /d %ROOT% && python api_server.py"

:: Breve pausa per dare tempo al server di partire
timeout /t 2 > nul

:: ── 2. Vite dev server ────────────────────────────────────
echo [ECOSYSTEM] Avvio Dashboard React (porta 5173)...
start "ECOSYSTEM DASHBOARD :5173" cmd /k "cd /d %DASHBOARD% && npm run dev"

:: Pausa per il build iniziale di Vite
timeout /t 4 > nul

:: ── 3. Apre browser ───────────────────────────────────────
echo [ECOSYSTEM] Apertura browser...
start http://localhost:5173

echo.
echo =========================================================
echo   ECOSYSTEM_OS attivo
echo   API      : http://localhost:5001/api/health
echo   Dashboard: http://localhost:5173
echo =========================================================
echo   Chiudi le finestre "ECOSYSTEM API" e "ECOSYSTEM DASHBOARD"
echo   per fermare il sistema.
echo =========================================================
