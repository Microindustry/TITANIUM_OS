@echo off
:: CLAUDE_CODE.bat - Lancia Claude Code in TITANIUM_OS riprendendo l'ultima sessione | v3.0 | 2026-06-03
:: Doppio click: apre Claude nella cartella giusta e RIPRENDE la conversazione (--continue).
:: Risolve claude.exe in modo dinamico (robusto agli update di versione e al GUID del pacchetto Store).
setlocal enabledelayedexpansion
set TI_ROOT=%USERPROFILE%\TITANIUM_OS

:: Risoluzione dinamica di claude.exe via resolver condiviso (DRY, no sub-shell)
call "%TI_ROOT%\_resolve_claude.bat"

if not defined CLAUDE (
    echo [ERRORE] claude.exe non trovato. Controlla l'installazione di Claude Code.
    pause
    exit /b 1
)

cd /d "%TI_ROOT%"
start "" "%CLAUDE%" --dangerously-skip-permissions "Leggi DA_FARE_FATTO.md (la bussola: cosa e' fatto / cosa resta), poi RIAVVIO_SESSIONE.txt e BRAIN/STATE.json, e riprendi: dimmi in meno di 10 secondi dove eravamo e il prossimo step (il primo punto della bussola), senza domande."
endlocal
