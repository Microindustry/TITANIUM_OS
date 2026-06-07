@echo off
:: night_ai_watch.bat | TITANIUM_OS | v1.0 | 2026-06-07
:: AI News Watcher - passata a tier (48h/settimanale). Keyless: GitHub via gh, YouTube/siti RSS.
:: Schedulabile da Task Scheduler. Path portabili via _ti_paths.bat (no hardcode).

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\night_ai_watch.log"
echo [ai_watch] avvio %DATE% %TIME% >> "%LOG%"

if not defined PYTHON (
    echo [ai_watch] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

:: passata che rispetta la frequenza dei tier (no --force: solo le sorgenti "due")
"%PYTHON%" NODES\AI_NEWS_WATCHER\watcher.py >> "%LOG%" 2>&1

echo [ai_watch] done %DATE% %TIME% >> "%LOG%"
