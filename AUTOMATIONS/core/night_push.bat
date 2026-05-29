@echo off
:: night_push.bat | TITANIUM_OS | v1.0 | 2026-05-29
:: Git push notturno — sincronizza il lavoro del giorno con GitHub

set TITANIUM_ROOT=C:\Users\benen\TITANIUM_OS\TITANIUM_OS
set GH=C:\Users\benen\tools\gh\gh.exe

cd /d "%TITANIUM_ROOT%"

:: verifica se c'è qualcosa da pushare
git status --porcelain > nul 2>&1
git log origin/main..HEAD --oneline > temp_log.txt 2>&1
set /p COMMITS=<temp_log.txt
del temp_log.txt

if "%COMMITS%"=="" (
    echo [night_push] nessun commit da pushare — skip
    exit /b 0
)

echo [night_push] push in corso...
git push origin main
if errorlevel 1 (
    echo [night_push] ERR: push fallito
) else (
    echo [night_push] OK: push completato
)
