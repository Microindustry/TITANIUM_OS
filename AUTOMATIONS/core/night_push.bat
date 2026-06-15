@echo off
:: night_push.bat | TITANIUM_OS | v2.0 | 2026-06-03
:: Git push notturno - sincronizza il lavoro del giorno con GitHub
:: v2.0: path portabili via _ti_paths.bat (no hardcode benen); auth via gh keyring

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\night_push.log"

:: c'e' qualcosa da pushare? Uso un FLAG basato sulla dimensione del file, NON il testo
:: del commit: i subject con ')' (es. "feat(storie)") chiuderebbero il blocco IF -> errore 255.
git log origin/main..HEAD --oneline > "%TEMP%\ti_night_log.txt" 2>&1
set "HAVE_COMMITS="
for %%A in ("%TEMP%\ti_night_log.txt") do if %%~zA GTR 0 set "HAVE_COMMITS=1"
del "%TEMP%\ti_night_log.txt" 2>nul

if not defined HAVE_COMMITS (
    echo [night_push] nessun commit da pushare - skip >> "%LOG%"
) else (
    echo [night_push] push in corso... >> "%LOG%"
    git push origin main >> "%LOG%" 2>&1
    if errorlevel 1 (
        echo [night_push] ERR: push fallito >> "%LOG%"
        :: propaga il fallimento: senza questo LastTaskResult resta 0 e il guasto e' invisibile
        exit /b 1
    ) else (
        echo [night_push] OK: push completato >> "%LOG%"
    )
)

:: Aggiorna sempre il profilo GitHub (stato live)
echo [night_push] aggiornamento GitHub profile... >> "%LOG%"
if defined PYTHON "%PYTHON%" "%TI_ROOT%\AUTOMATIONS\core\update_github_profile.py" >> "%LOG%" 2>&1

:: Rigenera dataset episodi se sono cresciuti (settimanale: sabato)
for /f %%d in ('powershell -NoProfile -Command "(Get-Date).DayOfWeek"') do set DAY=%%d
if "%DAY%"=="Saturday" (
    echo [night_push] sabato: rigenero dataset episodi... >> "%LOG%"
    if defined PYTHON "%PYTHON%" "%TI_ROOT%\CONTENT_ENGINE\scripts\episodes_to_dataset.py" >> "%LOG%" 2>&1
)

:: STATO FISICO: riscrive STATO_SISTEMA.txt sul Desktop (verde/allerta) — fine catena,
:: cosi riflette il risultato di tutta la notte. Risolve la cecita' sui guasti notturni.
if defined PYTHON "%PYTHON%" "%TI_ROOT%\AUTOMATIONS\core\stato_fisico.py" >> "%LOG%" 2>&1

echo [night_push] done %DATE% %TIME% >> "%LOG%"
