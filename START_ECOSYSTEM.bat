@echo off
:: ========================================================
:: START_ECOSYSTEM.bat — SUPERSEDED (07/07/2026)
:: Versione: 2.0.0 (stub) — la v1.2.0 vive nella storia git
:: ========================================================
:: Questo era il launcher legacy (marzo 2026). Duplicava START_LOGIN.bat
:: e avviava CORE\watchdog.py (anch'esso SUPERSEDED) che respawnava
:: doppioni di watcher/mente_watcher/api_server con finestre console
:: (visto al boot sporco del 07/07: doppio listener 5001, "tante caselle").
:: NON delega in automatico: se START_LOGIN e' gia' girato al login,
:: rilanciarlo creerebbe di nuovo i doppioni (api_server non e' guardato).
:: ========================================================

echo.
echo  START_ECOSYSTEM e' SUPERSEDED: l'avvio ufficiale e' START_LOGIN.bat
echo  (parte da solo al login di Windows - cartella Esecuzione automatica).
echo  Se il sistema e' giu', lancia:  START_LOGIN.bat
echo.
pause
