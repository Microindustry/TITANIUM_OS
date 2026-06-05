@echo off
:: _resolve_claude.bat | TITANIUM_OS | v1.0 | 2026-06-05
:: Risolve dinamicamente claude.exe (pacchetto Store Claude_*) e imposta %CLAUDE%.
:: Robusto agli update di versione e al GUID del pacchetto Store.
:: USA for /d (NIENTE for /f 'dir'): nessuna sub-shell -> nessuna ricorsione
:: dell'AutoRun di cmd quando chiamato da ti_autorun.cmd, nessun banner catturato.
:: Chiamato da CLAUDE_CODE.bat / START_LOGIN.bat / ti_autorun.cmd.
:: NB: niente setlocal, cosi' %CLAUDE% propaga al chiamante.

set "PKGROOT=%LOCALAPPDATA%\Packages"

:: 1) cartella claude-code dentro il pacchetto Store (Claude_*)
set "CC_DIR="
for /d %%p in ("%PKGROOT%\Claude_*") do if exist "%%p\LocalCache\Roaming\Claude\claude-code" set "CC_DIR=%%p\LocalCache\Roaming\Claude\claude-code"

:: fallback legacy: Roaming non pacchettizzato
if not defined CC_DIR if exist "%USERPROFILE%\AppData\Roaming\Claude\claude-code" set "CC_DIR=%USERPROFILE%\AppData\Roaming\Claude\claude-code"

:: 2) versione installata (lessicalmente l'ultima: la piu' alta)
set "CLAUDE="
if defined CC_DIR for /d %%v in ("%CC_DIR%\*") do if exist "%%v\claude.exe" set "CLAUDE=%%v\claude.exe"
