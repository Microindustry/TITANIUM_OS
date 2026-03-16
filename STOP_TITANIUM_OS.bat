@echo off
:: ========================================================
:: TITANIUM_OS — STOP SISTEMA
:: Versione: 2.0.0
:: Ferma solo i processi TITANIUM_OS (watcher, api, dashboard)
:: Non tocca altri processi Python del sistema
:: ========================================================

echo [TITANIUM_OS] Fermo i processi TITANIUM_OS...

:: Ferma Flask API server (porta 5001)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5001" 2^>nul') do (
    taskkill /F /PID %%a > nul 2>&1
)
echo [TITANIUM_OS] API server (5001) fermato.

:: Ferma Vite dev server (porta 5173)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" 2^>nul') do (
    taskkill /F /PID %%a > nul 2>&1
)
echo [TITANIUM_OS] Dashboard (5173) fermata.

:: Ferma watcher e mente_watcher cercando il path specifico
for /f "tokens=2" %%a in ('wmic process where "commandline like '%%TITANIUM_OS%%'" get processid /format:list 2^>nul ^| findstr "="') do (
    taskkill /F /PID %%a > nul 2>&1
)
echo [TITANIUM_OS] Watcher fermato.

echo.
echo [TITANIUM_OS] Sistema fermato.
pause
