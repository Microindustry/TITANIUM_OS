@echo off
:: APRI_PDF_DROP.bat | TITANIUM_OS | v1.0 | 2026-03-10
:: Doppio click per aprire la finestra PDF_DROP

cd /d "%~dp0"
python pdf_drop_gui.py
pause
