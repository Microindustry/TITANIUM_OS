@echo off
"%USERPROFILE%\AppData\Local\Programs\Python\Python311\python.exe" "%USERPROFILE%\TITANIUM_OS\generate_restart_prompt.py"
:: Sync incrementale dashboard (rebuild STORIE + refresh CRITICHE se cambiate) — non blocca
"%USERPROFILE%\AppData\Local\Programs\Python\Python311\python.exe" "%USERPROFILE%\TITANIUM_OS\AUTOMATIONS\core\sync_dashboard.py" --quiet
