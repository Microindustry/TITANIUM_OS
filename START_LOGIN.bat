@echo off
:: START_LOGIN.bat — Auto-avvio TITANIUM_OS al login | v2.2 | 2026-09-27
:: PC fisso (DESKTOP-IFACE2R) — utente: teo
:: Non blocca il login — tutto non-bloccante.
:: v2.2 (pulizia avvio #73), tolti 3 passi:
::   - Chrome --remote-debugging-port=9222: morto (la porta non era mai in ascolto)
::   - API server: la avvia e la tiene viva TI_Watchdog (SERVICES/watchdog.py);
::     il secondo avvio da qui era un doppione che moriva sulla porta 5001
::   - finestra PowerShell con Claude CLI: si lavora dall'app desktop
::   (+ #73 sera: tolto anche n8n, mai usato)

set PYTHON=%USERPROFILE%\AppData\Local\Programs\Python\Python311\python.exe
set PYTHONW=%USERPROFILE%\AppData\Local\Programs\Python\Python311\pythonw.exe
set PNPM=%USERPROFILE%\AppData\Roaming\npm\pnpm.cmd
set N8N=%USERPROFILE%\AppData\Roaming\npm\n8n.cmd
set NODE=C:\Program Files\nodejs
set TI_ROOT=%USERPROFILE%\TITANIUM_OS
:: cartella esplicita: da v1.2 ti_autorun.cmd non fa piu' cd nelle shell "cmd /c"
cd /d "%TI_ROOT%"

:: Carica variabili d'ambiente dal vault
if exist "%TI_ROOT%\_VAULT\KEYS\titanium_os.env" (
    for /F "usebackq tokens=1,2 delims==" %%A in ("%TI_ROOT%\_VAULT\KEYS\titanium_os.env") do (
        if not "%%A"=="" set %%A=%%B
    )
)

:: 1. Dashboard — Vite porta 5173 (usa pnpm). v2.1: --silent PRIMA di dev
::    (dopo, pnpm lo passa a vite; vite 7.x non lo conosce -> CACError e dash giu')
start "" cmd /c "cd /d "%TI_ROOT%\DASHBOARD" && "%PNPM%" --silent dev"

:: 2. RAG sync incrementale in background (MENTE/ -> ChromaDB). v2.1: era --rebuild
::    completo (~3 min GPU a OGNI login) -> ora incrementale con self-heal orfani
::    (semantico==bm25 si mantiene da solo). Il full-rebuild pulito resta nel
::    night_research (rebuild_rag_clean health-gated) quando serve davvero.
start "" "%PYTHONW%" "%TI_ROOT%\NODES\MENTE_RAG\rag_engine.py" --incremental

:: 3. n8n TOLTO dall'avvio (#73, 27/09): 0 workflow e 0 esecuzioni in ~/.n8n da quando
::    e' installato (09/06). A mano, se serve: "%N8N%" start  (porta 5678)

:: 4. Watcher file (backup + changelog + state). NB: non e' il watchdog dei
::    servizi, quello e' il task TI_Watchdog
start "" "%PYTHONW%" "%TI_ROOT%\AUTOMATIONS\core\watcher.py"

:: 5. Apri dashboard nel browser dopo 8s (attende Vite)
timeout /t 8 /nobreak > nul
start "" "http://localhost:5173"
