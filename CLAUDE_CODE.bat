@echo off
:: ============================================================
:: TITANIUM_OS — Lancia Claude Code dalla cartella corretta
:: Claude Code leggera' automaticamente CLAUDE.md + STATE.json
:: ============================================================
cd /d "%USERPROFILE%\TITANIUM_OS\TITANIUM_OS"
echo.
echo   TITANIUM_OS — Avvio Claude Code
echo   Cartella: %CD%
echo   CLAUDE.md: presente
echo.
claude
