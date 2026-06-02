@echo off
:: CLAUDE_CODE.bat — Lancia Claude Code in TITANIUM_OS | v2.0 | 2026-06-02
:: Doppio click per aprire Claude Code nella cartella corretta
set TI_ROOT=%USERPROFILE%\TITANIUM_OS
set CLAUDE=%USERPROFILE%\AppData\Roaming\Claude\claude-code\2.1.160\claude.exe

echo.
echo   TITANIUM_OS - Avvio Claude Code
echo   Cartella: %TI_ROOT%
echo.

cd /d "%TI_ROOT%"
start "" "%CLAUDE%" --dangerously-skip-permissions
