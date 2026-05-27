@echo off
:: START_GETAC.bat — Launcher TITANIUM_OS per Getac (benen)
:: Equivalente di START_ECOSYSTEM.bat ma con path corretti per questa macchina

set PYTHON=%USERPROFILE%\tools\python311\python.exe
set NODE=%USERPROFILE%\tools\nodejs
set TI_ROOT=%~dp0

:: Carica variabili d'ambiente dal vault se esiste
if exist "%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env" (
    for /F "tokens=1,2 delims==" %%A in (%USERPROFILE%\TITANIUM_OS\_VAULT\KEYS\titanium_os.env) do (
        if not "%%A"=="" if not "%%A:~0,1%"=="#" set %%A=%%B
    )
)

echo.
echo  *** TITANIUM_OS - AVVIO ECOSISTEMA ***
echo.

:: API Server in background
echo  [1/2] API Server (porta 5001)...
start /B "TITANIUM-API" "%PYTHON%" "%TI_ROOT%api_server.py"
timeout /t 2 /nobreak > nul

:: Watcher in background
echo  [2/2] MENTE_WATCHER...
start /B "TITANIUM-WATCHER" "%PYTHON%" "%TI_ROOT%NODES\MENTE_WATCHER\mente_watcher.py"

echo.
echo  API:       http://localhost:5001/api/health
echo  Scanner:   python NODES\MENTE_SCANNER\scanner.py
echo.
echo  Per il dashboard: apri un nuovo terminale e digita: start-dashboard
echo.
