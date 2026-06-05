@echo off
:: screen_agent.bat - alias rapido per ScreenAgent
:: Uso: screen "Clicca sul pulsante Login"
::      screen "Dimmi cosa vedi" --no-act
::      screen "Copia il titolo" --save-shots
:: Python + env (ANTHROPIC_API_KEY) risolti in modo portabile via _ti_paths.bat
:: (no hardcode C:\Users\benen).
call "%~dp0AUTOMATIONS\core\_ti_paths.bat"
if not defined PYTHON (
    echo [screen_agent] ERR: python non trovato
    exit /b 1
)
"%PYTHON%" "%~dp0NODES\COMPUTER_USE\screen_agent.py" %*
