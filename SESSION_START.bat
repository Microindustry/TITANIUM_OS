@echo off
:: ========================================================
:: TITANIUM_OS — SESSION START
:: File    : SESSION_START.bat
:: Versione: 1.0.0
:: ========================================================
:: Doppio click su questo file all'inizio di ogni sessione.
:: Mostra il brief completo: milestone, stato, prossimo step,
:: blockers, attività recente + prompt pre-compilato per Claude.
:: ========================================================

title TITANIUM_OS — Session Brief

:: Path sessione orienter
set SCRIPT_PATH=%~dp0AUTOMATIONS\core\session_orienter.py

python "%SCRIPT_PATH%"
echo.
pause
