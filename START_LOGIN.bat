@echo off
:: START_LOGIN.bat — Auto-avvio TITANIUM_OS al login | v1.3 | 2026-05-30
:: Non blocca il login — tutto non-bloccante.

set PYTHON=%USERPROFILE%\tools\python311\python.exe
set PYTHONW=%USERPROFILE%\tools\python311\pythonw.exe
set NODE=%USERPROFILE%\tools\nodejs
set TI_ROOT=%~dp0

:: Carica variabili d'ambiente dal vault
if exist "%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env" (
    for /F "tokens=1,2 delims==" %%A in (%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env) do (
        if not "%%A"=="" if not "%%A:~0,1%"=="#" set %%A=%%B
    )
)

:: 0. Chrome con remote-debugging-port — abilita Playwright CDP (computer_use)
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --no-first-run --no-default-browser-check

:: 1. Watchdog — pythonw = silenzioso, sopravvive alla chiusura del bat
start "" "%PYTHONW%" "%TI_ROOT%CORE\watchdog.py"

:: 2. Dashboard — avviata dal watchdog se non parte, ma proviamo subito
start "" cmd /c "cd /d %TI_ROOT%DASHBOARD && %NODE%\npm.cmd run dev --silent"

:: 3. RAG rebuild in background (sync iniziale MENTE/ -> ChromaDB)
start "" "%PYTHONW%" "%TI_ROOT%NODES\MENTE_RAG\rag_engine.py" --rebuild

:: 4. n8n
start "" cmd /c "%NODE%\npx.cmd n8n"

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
