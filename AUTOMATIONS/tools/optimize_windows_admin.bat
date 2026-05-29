@echo off
:: optimize_windows_admin.bat | TITANIUM_OS | v1.1 | 2026-05-29
:: Ottimizzazioni Windows + task elevato — esegui UNA VOLTA come Amministratore

echo ============================================
echo  TITANIUM_OS — Setup Admin una-tantum
echo ============================================
echo.

echo [1/5] Disabilito SysMain (Superfetch — inutile su SSD)...
sc stop SysMain >nul 2>&1
sc config SysMain start= disabled
echo     OK

echo [2/5] Disabilito Windows Search Indexer...
sc stop WSearch >nul 2>&1
sc config WSearch start= disabled
echo     OK

echo [3/5] Disabilito Xbox Game Bar / DVR (background overhead)...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v AllowGameDVR /t REG_DWORD /d 0 /f >nul
echo     OK

echo [4/5] Ricreo task TITANIUM_StartEcosystem con privilegi elevati...
schtasks /delete /tn "\TITANIUM_StartEcosystem" /f >nul 2>&1

:: Crea file XML temporaneo
set XMLFILE=%TEMP%\titanium_task_admin.xml
(
echo ^<?xml version="1.0" encoding="UTF-16"?^>
echo ^<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task"^>
echo   ^<RegistrationInfo^>^<Description^>TITANIUM_OS — avvio ecosistema + Claude con admin^</Description^>^</RegistrationInfo^>
echo   ^<Triggers^>
echo     ^<LogonTrigger^>^<Enabled^>true^</Enabled^>^<UserId^>DESKTOP-DIUB4EJ\benen^</UserId^>^<Delay^>PT20S^</Delay^>^</LogonTrigger^>
echo   ^</Triggers^>
echo   ^<Principals^>
echo     ^<Principal id="Author"^>
echo       ^<UserId^>DESKTOP-DIUB4EJ\benen^</UserId^>
echo       ^<LogonType^>InteractiveToken^</LogonType^>
echo       ^<RunLevel^>HighestAvailable^</RunLevel^>
echo     ^</Principal^>
echo   ^</Principals^>
echo   ^<Settings^>
echo     ^<MultipleInstancesPolicy^>IgnoreNew^</MultipleInstancesPolicy^>
echo     ^<DisallowStartIfOnBatteries^>false^</DisallowStartIfOnBatteries^>
echo     ^<StopIfGoingOnBatteries^>false^</StopIfGoingOnBatteries^>
echo     ^<AllowHardTerminate^>true^</AllowHardTerminate^>
echo     ^<ExecutionTimeLimit^>PT0S^</ExecutionTimeLimit^>
echo     ^<Enabled^>true^</Enabled^>
echo   ^</Settings^>
echo   ^<Actions Context="Author"^>
echo     ^<Exec^>
echo       ^<Command^>cmd.exe^</Command^>
echo       ^<Arguments^>/c "C:\Users\benen\TITANIUM_OS\TITANIUM_OS\START_LOGIN.bat"^</Arguments^>
echo     ^</Exec^>
echo   ^</Actions^>
echo ^</Task^>
) > "%XMLFILE%"

schtasks /create /tn "\TITANIUM_StartEcosystem" /xml "%XMLFILE%" /f
del "%XMLFILE%" >nul 2>&1
echo     OK — Claude parte con admin a ogni login

echo [5/5] Abbasso UAC a notifica minima (niente popup per operazioni interne)...
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v PromptOnSecureDesktop /t REG_DWORD /d 0 /f >nul
echo     OK — UAC disabilitato per admin silenzioso

echo.
echo ============================================
echo  Tutto fatto. Riavvia Windows ora.
echo ============================================
pause
