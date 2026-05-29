@echo off
:: START_LOGIN.bat — Auto-avvio TITANIUM_OS al login | v1.2 | 2026-05-29
:: Non blocca il login — tutto non-bloccante.

set PYTHON=%USERPROFILE%\tools\python311\python.exe
set NODE=%USERPROFILE%\tools\nodejs
set TI_ROOT=%~dp0

:: Carica variabili d'ambiente dal vault
if exist "%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env" (
    for /F "tokens=1,2 delims==" %%A in (%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env) do (
        if not "%%A"=="" if not "%%A:~0,1%"=="#" set %%A=%%B
    )
)

:: 1. Watchdog (supervisore — avvia e monitora API + WATCHER + MENTE_WATCHER)
start /B "TITANIUM-WATCHDOG" "%PYTHON%" "%TI_ROOT%CORE\watchdog.py"

:: 2. Dashboard
start /B "TITANIUM-DASH" cmd /c "cd /d %TI_ROOT%DASHBOARD && %NODE%\npm.cmd run dev --silent"

:: 3. RAG rebuild in background (sync iniziale MENTE/ -> ChromaDB)
start /B "TITANIUM-RAG" "%PYTHON%" "%TI_ROOT%NODES\MENTE_RAG\rag_engine.py" --rebuild

:: 4. n8n
start /B "TITANIUM-N8N" cmd /c "%NODE%\npx.cmd n8n"

:: 5. Apri Windows Terminal in TITANIUM_OS (claude-ti pronto)
set WT=%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe
if exist "%WT%" (
    start "" "%WT%" -d "%USERPROFILE%\TITANIUM_OS\TITANIUM_OS" powershell.exe -NoExit -Command "& '%USERPROFILE%\tools\nodejs\claude.cmd' --dangerously-skip-permissions"
) else (
    start "" powershell.exe -NoExit -WorkingDirectory "%USERPROFILE%\TITANIUM_OS\TITANIUM_OS" -Command "& '%USERPROFILE%\tools\nodejs\claude.cmd' --dangerously-skip-permissions"
)

:: 6. Apri dashboard nel browser dopo 6s (attende che Vite sia pronto)
timeout /t 6 /nobreak > nul
start "" "http://localhost:5173"
