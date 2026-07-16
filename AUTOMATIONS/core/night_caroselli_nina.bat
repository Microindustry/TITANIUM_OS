@echo off
:: night_caroselli_nina.bat | TITANIUM_OS | v1.0 | 2026-07-16
:: L'APPRENDISTA NOTTURNO — CORSIA NINA (ONDATA B): impagina i testi EP_N2 canonici
:: in caroselli in CAROSELLI/_BOZZE/, QC incluso, MAI promozione. NON usa la GPU
:: (grounding = testo canonico). Report: DATA/audit/bozze_caroselli_nina.json
:: Schedulato: TI_NightCaroselliNina ~04:35 (dopo TI_NightCaroselli).

call "%~dp0_ti_paths.bat"
cd /d "%TI_ROOT%"

set "LOG=%TI_ROOT%\DATA\logs\night_caroselli_nina.log"
echo [night_caroselli_nina] avvio %DATE% %TIME% >> "%LOG%"

if not defined PYTHON (
    echo [night_caroselli_nina] ERR: python non trovato >> "%LOG%"
    exit /b 1
)

"%PYTHON%" NODES\CAROSELLI_AGENT\night_caroselli_nina.py >> "%LOG%" 2>&1
echo [night_caroselli_nina] fine (errorlevel %ERRORLEVEL%) %DATE% %TIME% >> "%LOG%"
exit /b %ERRORLEVEL%
