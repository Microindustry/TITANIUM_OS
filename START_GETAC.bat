@echo off
:: START_GETAC.bat — Launcher TITANIUM_OS per Getac (benen)
:: v2.0: API + Watcher + RAG rebuild automatico all'avvio + Dashboard

set PYTHON=%USERPROFILE%\tools\python311\python.exe
set NODE=%USERPROFILE%\tools\nodejs
set TI_ROOT=%~dp0

:: Carica variabili d'ambiente dal vault se esiste
if exist "%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env" (
    for /F "tokens=1,2 delims==" %%A in (%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env) do (
        if not "%%A"=="" if not "%%A:~0,1%"=="#" set %%A=%%B
    )
)

echo.
echo  *** TITANIUM_OS — AVVIO ECOSISTEMA ***
echo.

:: 1. API Server in background
echo  [1/4] API Server (porta 5001)...
start /B "TITANIUM-API" "%PYTHON%" "%TI_ROOT%api_server.py"
timeout /t 3 /nobreak > nul

:: 2. RAG Rebuild immediato (sincronizza MENTE/ con ChromaDB)
echo  [2/4] RAG Rebuild (MENTE/ -> ChromaDB)...
"%PYTHON%" "%TI_ROOT%NODES\MENTE_RAG\rag_engine.py" --rebuild
echo  RAG OK.

:: 3. MENTE_WATCHER in background (mantiene RAG aggiornato per le sessioni successive)
echo  [3/4] MENTE_WATCHER (auto-rebuild su modifiche MENTE/)...
start /B "TITANIUM-WATCHER" "%PYTHON%" "%TI_ROOT%NODES\MENTE_WATCHER\mente_watcher.py"

:: 4. Dashboard React in background
echo  [4/4] Dashboard (porta 5173)...
start /B "TITANIUM-DASHBOARD" cmd /c "cd /d %TI_ROOT%DASHBOARD && %USERPROFILE%\tools\nodejs\npm.cmd run dev"
timeout /t 4 /nobreak > nul

:: Apri nel browser
start "" "http://localhost:5173"

echo.
echo  Sistema ATTIVO:
echo    API:       http://localhost:5001/api/health
echo    Dashboard: http://localhost:5173
echo    Watcher:   MENTE_WATCHER in background (auto-RAG rebuild)
echo.
