@echo off
:: night_self_improve.bat | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-06-14
:: Nodo AUTOMIGLIORAMENTO (regola 11): legge i segnali (critiche audit, gap storie,
:: salute, todo bussola, news AI del watcher) e PROPONE 3-6 migliorie. MAI esegue.
:: Output: DATA/self_improve/ + MENTE/KNOWLEDGE/AUTOMIGLIORAMENTO.md (vault + RAG + brief).
:: Gira dopo audit (03:52) e watcher (03:25). Chiave LLM dall'env utente (ANTHROPIC_API_KEY).

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\self_improve.log"
echo [self_improve] avvio %DATE% %TIME% >> "%LOG%"

if not defined PYTHON (
    echo [self_improve] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

"%PYTHON%" NODES\SELF_IMPROVE\self_improve.py >> "%LOG%" 2>&1
if errorlevel 1 (
    echo [self_improve] ERR: self_improve fallito >> "%LOG%"
    exit /b 1
)

echo [self_improve] done %DATE% %TIME% >> "%LOG%"
