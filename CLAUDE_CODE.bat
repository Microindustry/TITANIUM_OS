@echo off
:: CLAUDE_CODE.bat — Lancia Claude Code in TITANIUM_OS riprendendo l'ultima sessione | v3.0 | 2026-06-03
:: Doppio click: apre Claude nella cartella giusta e RIPRENDE la conversazione (--continue).
:: Risolve claude.exe in modo dinamico (robusto agli update di versione e al GUID del pacchetto Store).
setlocal enabledelayedexpansion
set TI_ROOT=%USERPROFILE%\TITANIUM_OS
set PKGROOT=%USERPROFILE%\AppData\Local\Packages

:: 1) trova la cartella del pacchetto Store (Claude_*)
set CC_DIR=
for /f "delims=" %%p in ('dir /b /a:d "%PKGROOT%\Claude_*" 2^>nul') do (
    if exist "%PKGROOT%\%%p\LocalCache\Roaming\Claude\claude-code" set "CC_DIR=%PKGROOT%\%%p\LocalCache\Roaming\Claude\claude-code"
)
:: fallback: vecchio path Roaming non pacchettizzato
if not defined CC_DIR if exist "%USERPROFILE%\AppData\Roaming\Claude\claude-code" set "CC_DIR=%USERPROFILE%\AppData\Roaming\Claude\claude-code"

:: 2) prendi la versione installata piu' recente (per data)
set CLAUDE=
if defined CC_DIR for /f "delims=" %%v in ('dir /b /a:d /o-d "%CC_DIR%" 2^>nul') do (
    if not defined CLAUDE if exist "%CC_DIR%\%%v\claude.exe" set "CLAUDE=%CC_DIR%\%%v\claude.exe"
)

if not defined CLAUDE (
    echo [ERRORE] claude.exe non trovato. Controlla l'installazione di Claude Code.
    pause
    exit /b 1
)

cd /d "%TI_ROOT%"
start "" "%CLAUDE%" --dangerously-skip-permissions "Leggi RIAVVIO_SESSIONE.txt e BRAIN/STATE.json e riprendi: dimmi in meno di 10 secondi dove eravamo e il prossimo step, senza domande."
endlocal
