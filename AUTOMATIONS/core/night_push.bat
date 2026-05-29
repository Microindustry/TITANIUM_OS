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
) else (
    echo [night_push] push in corso...
    git push origin main
    if errorlevel 1 (
        echo [night_push] ERR: push fallito
    ) else (
        echo [night_push] OK: push completato
    )
)

:: Aggiorna sempre il profilo GitHub (stato live)
echo [night_push] aggiornamento GitHub profile...
C:\Users\benen\tools\python311\python.exe C:\Users\benen\TITANIUM_OS\TITANIUM_OS\AUTOMATIONS\core\update_github_profile.py >> "%TITANIUM_ROOT%\DATA\logs\night_push.log" 2>&1

:: Rigenera dataset episodi se sono cresciuti (settimanale via day check)
for /f %%d in ('powershell -Command "(Get-Date).DayOfWeek"') do set DAY=%%d
if "%DAY%"=="Saturday" (
    echo [night_push] sabato: rigenero dataset episodi...
    C:\Users\benen\tools\python311\python.exe C:\Users\benen\TITANIUM_OS\TITANIUM_OS\CONTENT_ENGINE\scripts\episodes_to_dataset.py >> "%TITANIUM_ROOT%\DATA\logs\night_push.log" 2>&1
)

echo [night_push] done %DATE% %TIME% >> "%TITANIUM_ROOT%\DATA\logs\night_push.log"
