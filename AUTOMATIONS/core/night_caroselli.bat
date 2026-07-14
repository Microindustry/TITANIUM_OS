@echo off
:: night_caroselli.bat | TITANIUM_OS | v1.0 | 2026-07-14
:: L'APPRENDISTA NOTTURNO dei caroselli (design approvato #58): 1 bozza/notte in
:: CAROSELLI/_BOZZE/, QC incluso, MAI promozione. Report: DATA/audit/bozze_caroselli.json
:: Schedulato: TI_NightCaroselli ~04:15 (dopo TI_NightResearch).

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\night_caroselli.log"
echo [night_caroselli] avvio %DATE% %TIME% >> "%LOG%"

if not defined PYTHON (
    echo [night_caroselli] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

"%PYTHON%" NODES\CAROSELLI_AGENT\night_caroselli.py >> "%LOG%" 2>&1
echo [night_caroselli] fine (errorlevel %ERRORLEVEL%) %DATE% %TIME% >> "%LOG%"
exit /b %ERRORLEVEL%
