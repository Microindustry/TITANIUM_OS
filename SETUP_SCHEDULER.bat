@echo off
:: ========================================================
:: TITANIUM_OS — SETUP TASK SCHEDULER WINDOWS
:: File    : SETUP_SCHEDULER.bat
:: Versione: 1.0.0
:: ========================================================
:: ESEGUIRE COME AMMINISTRATORE
:: Installa tutti i task automatici di TITANIUM_OS:
::   1. START_WATCHER   — avvio con Windows, sempre attivo
::   2. DAILY_BRIEF     — ogni mattina alle 08:00
::   3. WEEKLY_BACKUP   — ogni domenica alle 02:00
:: ========================================================

echo.
echo [TITANIUM_OS] Setup Task Scheduler Windows
echo [TITANIUM_OS] Assicurati di eseguire come Amministratore
echo.

:: Ottieni il path corrente (dove si trova questo .bat)
set ROOT=%~dp0

:: Rimuovi il backslash finale se presente
if "%ROOT:~-1%"=="\" set ROOT=%ROOT:~0,-1%

echo Path TITANIUM_OS: %ROOT%
echo.

:: ============================================================
:: TASK 1: Watcher — avvio con Windows (al login utente)
:: ============================================================
echo [1/3] Registrazione: TITANIUM_OS Watcher...

schtasks /Create /F /TN "TITANIUM_OS\Watcher" ^
  /TR "pythonw \"%ROOT%\AUTOMATIONS\core\watcher.py\"" ^
  /SC ONLOGON ^
  /RL HIGHEST ^
  /RU "%USERNAME%"

if %errorlevel% equ 0 (
    echo       OK — avviera' al prossimo login
) else (
    echo       ERRORE — eseguire come Amministratore
)

:: ============================================================
:: TASK 2: Daily Brief — ogni mattina alle 08:00
:: ============================================================
echo [2/3] Registrazione: TITANIUM_OS Daily Brief...

schtasks /Create /F /TN "TITANIUM_OS\DailyBrief" ^
  /TR "python \"%ROOT%\AUTOMATIONS\core\milestone_tracker.py\"" ^
  /SC DAILY ^
  /ST 08:00 ^
  /RL HIGHEST ^
  /RU "%USERNAME%"

if %errorlevel% equ 0 (
    echo       OK — ogni giorno alle 08:00
) else (
    echo       ERRORE
)

:: ============================================================
:: TASK 3: Weekly Full Backup — ogni domenica alle 02:00
:: ============================================================
echo [3/3] Registrazione: TITANIUM_OS Weekly Backup...

schtasks /Create /F /TN "TITANIUM_OS\WeeklyBackup" ^
  /TR "python \"%ROOT%\AUTOMATIONS\core\backup.py\"" ^
  /SC WEEKLY ^
  /D SUN ^
  /ST 02:00 ^
  /RL HIGHEST ^
  /RU "%USERNAME%"

if %errorlevel% equ 0 (
    echo       OK — ogni domenica alle 02:00
) else (
    echo       ERRORE
)

:: ============================================================
:: SUMMARY
:: ============================================================
echo.
echo [TITANIUM_OS] Task registrati:
echo.
schtasks /Query /TN "TITANIUM_OS" /FO LIST 2>nul
echo.
echo [TITANIUM_OS] Setup completato.
echo [TITANIUM_OS] Per avviare subito il watcher: START_TITANIUM_OS.bat
echo.
pause
