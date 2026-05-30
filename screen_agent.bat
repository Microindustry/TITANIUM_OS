@echo off
:: screen_agent.bat — alias rapido per ScreenAgent
:: Uso: screen "Clicca sul pulsante Login"
::      screen "Dimmi cosa vedi" --no-act
::      screen "Copia il titolo" --save-shots
C:\Users\benen\tools\python311\python.exe "%~dp0NODES\COMPUTER_USE\screen_agent.py" %*
