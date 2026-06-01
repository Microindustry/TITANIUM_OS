@echo off
REM dash_shot.bat | TITANIUM_OS | cattura screenshot della dashboard (localhost:5173)
REM Uso: doppio click, oppure `dash_shot` da terminale. Output -> DATA\dash_shot.png
set "EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=C:\Program Files\Microsoft\Edge\Application\msedge.exe"
set "OUT=%~dp0DATA\dash_shot.png"
if exist "%OUT%" del "%OUT%"
REM profilo dedicato: evita il lock quando Edge e' gia' aperto
set "PROF=%TEMP%\edgeshot_titanium"
"%EDGE%" --headless=new --disable-gpu --no-first-run --user-data-dir="%PROF%" --hide-scrollbars --window-size=1680,1050 --virtual-time-budget=8000 --screenshot="%OUT%" "http://localhost:5173"
echo Screenshot -> %OUT%
