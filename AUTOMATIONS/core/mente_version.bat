@echo off
:: mente_version.bat | TITANIUM_OS | v1.0 | 2026-06-12
:: Versiona il SAPERE: committa le modifiche di MENTE nel suo git LOCALE (mai pushato).
:: Cosi ogni evoluzione (riflusso FATTI, ingest, edit) resta nello storico, recuperabile.
:: Regola 1 (niente e' finito, ogni cosa e' una versione) applicata alla conoscenza.

call "%~dp0_ti_paths.bat"

set "MENTE=%MENTE_DIR%"
if "%MENTE%"=="" set "MENTE=%USERPROFILE%\MICROINDUSTRY\MENTE"
if not exist "%MENTE%\.git" goto :nogit

cd /d "%MENTE%"
git add -A
:: commit solo se c'e' qualcosa di cambiato (evita commit vuoti notturni)
git diff --cached --quiet
if errorlevel 1 (
    git -c user.name="TITANIUM_OS" -c user.email="benenatimatteo.mb@gmail.com" commit -m "auto: evoluzione sapere %DATE% %TIME%" >nul 2>&1
    echo [mente_version] sapere versionato: %DATE% %TIME%
) else (
    echo [mente_version] nessuna modifica al sapere - skip
)
goto :eof

:nogit
echo [mente_version] MENTE non e' un repo git - salto (esegui git init in %MENTE%)
