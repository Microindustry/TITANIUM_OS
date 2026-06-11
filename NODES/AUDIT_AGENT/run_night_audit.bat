@echo off
:: night_audit nightly | TITANIUM_OS | v1.0 | 2026-06-05
:: Self-audit notturno: genera critiche additive + system_health, poi committa.
:: Eseguito dopo ricerca/story (cosi' puo' auditarli) e prima del push notturno.
:: Path portabili via _ti_paths.bat (no hardcode benen).

call "%~dp0..\..\AUTOMATIONS\core\_ti_paths.bat"
cd /d "%TI_ROOT%"

:: log del .bat su file SEPARATO: night_audit.py apre night_audit.log internamente
:: (rediregere il .bat sullo stesso file -> PermissionError, lock di Windows).
set "LOG=%TI_ROOT%\DATA\logs\night_audit_run.log"
echo [night_audit] avvio %DATE% %TIME% >> "%LOG%"

if not defined PYTHON (
    echo [night_audit] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

"%PYTHON%" NODES\AUDIT_AGENT\night_audit.py >> "%LOG%" 2>&1

:: commit additivo SOLO della cartella clinica (isolato dal resto)
git add DATA\audit\critiche_auto.json DATA\audit\system_health.json

:: --quiet e commit con PATHSPEC ESPLICITO: committa SOLO la cartella clinica,
:: mai lo staging accidentale di altri processi (mente_watcher, indexer) che gira di notte.
git diff --cached --quiet -- DATA\audit\critiche_auto.json DATA\audit\system_health.json
if errorlevel 1 (
    git commit -m "auto: night_audit - cartella clinica %DATE%" -- DATA\audit\critiche_auto.json DATA\audit\system_health.json >> "%LOG%" 2>&1
    echo [night_audit] commit fatto >> "%LOG%"
) else (
    echo [night_audit] nessuna variazione audit - skip commit >> "%LOG%"
)

echo [night_audit] done %DATE% %TIME% >> "%LOG%"
