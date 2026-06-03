@echo off
:: story_agent nightly | TITANIUM_OS | v2.0 | 2026-06-03
:: Eseguito da Windows Task Scheduler ogni notte - genera episodi da commit recenti
:: v2.0: path portabili via _ti_paths.bat (no hardcode benen)

call "%~dp0..\..\AUTOMATIONS\core\_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\story_agent.log"
echo [story_agent] avvio %DATE% %TIME% >> "%LOG%"

if not defined PYTHON (
    echo [story_agent] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

:: genera max 10 gruppi tematici - poi commita
"%PYTHON%" NODES\STORY_AGENT\story_agent.py --max 10 >> "%LOG%" 2>&1

:: se ci sono file nuovi, committa
git add CONTENT_ENGINE\DATABASE\episodes\S2_SISTEMA\
git add NODES\STORY_AGENT\story_state.json

git diff --cached --quiet
if errorlevel 1 (
    git commit -m "auto: story_agent - episodi generati %DATE%" >> "%LOG%" 2>&1
    echo [story_agent] commit fatto >> "%LOG%"
) else (
    echo [story_agent] nessun episodio nuovo - skip commit >> "%LOG%"
)

echo [story_agent] done %DATE% %TIME% >> "%LOG%"
