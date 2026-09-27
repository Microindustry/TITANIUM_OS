@echo off
:: night_audit nightly | TITANIUM_OS | v1.1 | 2026-09-27
:: Self-audit notturno: genera critiche additive + system_health, poi committa.
:: Eseguito dopo ricerca/story (cosi' puo' auditarli) e prima del push notturno.
:: Path portabili via _ti_paths.bat (no hardcode benen).
:: v1.1 (#73): night_audit.py fa anche il TAGLIO della bussola (bussola_taglio.py) e
::   ruota le critiche chiuse vecchie nell'archivio: qui si committano anche quelli,
::   in un commit a parte. Se il /salva salta (come la #72, rimasta un mese fuori da
::   git), la bussola si salva lo stesso.

call "%~dp0..\..\AUTOMATIONS\core\_ti_paths.bat"
cd /d "%TI_ROOT%"
setlocal EnableDelayedExpansion

:: log del .bat su file SEPARATO: night_audit.py apre night_audit.log internamente
:: (rediregere il .bat sullo stesso file -> PermissionError, lock di Windows).
set "LOG=%TI_ROOT%\DATA\logs\night_audit_run.log"
echo [night_audit] avvio %DATE% %TIME% >> "%LOG%"

if not defined PYTHON (
    echo [night_audit] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

"%PYTHON%" NODES\AUDIT_AGENT\night_audit.py >> "%LOG%" 2>&1

:: --quiet e commit con PATHSPEC ESPLICITO: committa SOLO questi file, mai lo
:: staging accidentale di altri processi (mente_watcher, indexer) che gira di notte.
:: Solo i file che esistono (l'archivio nasce alla prima rotazione).
set "CLINICA="
for %%F in (DATA\audit\critiche_auto.json DATA\audit\critiche_auto_archivio.jsonl DATA\audit\system_health.json) do (
    if exist "%%F" set "CLINICA=!CLINICA! %%F"
)
git add !CLINICA!
git diff --cached --quiet -- !CLINICA!
if errorlevel 1 (
    git commit -m "auto: night_audit - cartella clinica %DATE%" -- !CLINICA! >> "%LOG%" 2>&1
    echo [night_audit] commit fatto >> "%LOG%"
) else (
    echo [night_audit] nessuna variazione audit - skip commit >> "%LOG%"
)

:: il taglio della bussola (R2): commit a parte, solo se bussola o storia sono cambiate
set "BUSSOLA=DA_FARE.md ABBIAMO_FATTO.md"
git add %BUSSOLA%
git diff --cached --quiet -- %BUSSOLA%
if errorlevel 1 (
    git commit -m "auto: bussola - taglio notturno %DATE%" -- %BUSSOLA% >> "%LOG%" 2>&1
    echo [night_audit] commit bussola fatto >> "%LOG%"
) else (
    echo [night_audit] bussola invariata - skip commit >> "%LOG%"
)

echo [night_audit] done %DATE% %TIME% >> "%LOG%"
endlocal
