@echo off
:: START_LOGIN.bat — Auto-avvio TITANIUM_OS al login | v2.0 | 2026-06-02
:: PC fisso (DESKTOP-IFACE2R) — utente: teo
:: Non blocca il login — tutto non-bloccante.

set PYTHON=%USERPROFILE%\AppData\Local\Programs\Python\Python311\python.exe
set PYTHONW=%USERPROFILE%\AppData\Local\Programs\Python\Python311\pythonw.exe
set PNPM=%USERPROFILE%\AppData\Roaming\npm\pnpm.cmd
set NODE=C:\Program Files\nodejs
set TI_ROOT=%USERPROFILE%\TITANIUM_OS
call "%TI_ROOT%\_resolve_claude.bat"

:: Carica variabili d'ambiente dal vault
if exist "%TI_ROOT%\_VAULT\KEYS\titanium_os.env" (
    for /F "usebackq tokens=1,2 delims==" %%A in ("%TI_ROOT%\_VAULT\KEYS\titanium_os.env") do (
        if not "%%A"=="" set %%A=%%B
    )
)

:: 0. Chrome con remote-debugging-port (computer_use / Playwright CDP)
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --no-first-run --no-default-browser-check 2>nul

:: 1. API Server — Flask porta 5001
start "" "%PYTHONW%" "%TI_ROOT%\api_server.py"

:: 2. Dashboard — Vite porta 5173 (usa pnpm)
start "" cmd /c "cd /d "%TI_ROOT%\DASHBOARD" && "%PNPM%" dev --silent"

:: 3. RAG rebuild in background (sync MENTE/ -> ChromaDB)
start "" "%PYTHONW%" "%TI_ROOT%\NODES\MENTE_RAG\rag_engine.py" --rebuild

:: 4. n8n — porta 5678
start "" cmd /c ""%NODE%\npx.cmd" n8n"

:: 5. Watchdog (backup + changelog + state)
start "" "%PYTHONW%" "%TI_ROOT%\AUTOMATIONS\core\watcher.py"

:: 6. Apri PowerShell con Claude Code in TITANIUM_OS
start "" powershell.exe -NoExit -WorkingDirectory "%TI_ROOT%" -Command "& '%CLAUDE%' --dangerously-skip-permissions"

:: 7. Apri dashboard nel browser dopo 8s (attende Vite)
timeout /t 8 /nobreak > nul
start "" "http://localhost:5173"
