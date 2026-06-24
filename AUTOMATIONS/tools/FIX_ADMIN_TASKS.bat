@echo off
:: FIX_ADMIN_TASKS.bat | TITANIUM_OS | v1.0 | 2026-05-29
:: Self-elevating - chiede UAC automaticamente, poi sistema i task vecchi
:: ESEGUI DOPPIO CLICK - accetta UAC - fatto.

:: Controlla se siamo admin
net session >nul 2>&1
if %errorlevel% == 0 goto :ISADMIN

:: Non admin - rilancia con UAC
echo Richiesta privilegi amministratore...
powershell -Command "Start-Process '%~f0' -Verb RunAs"
exit /b

:ISADMIN
:: root del repo derivata dalla posizione dello script (AUTOMATIONS\tools\ -> ..\..) - no hardcode benen
for %%I in ("%~dp0..\..") do set "TI=%%~fI"
echo.
echo  TITANIUM_OS - Fix Task Scheduler (Admin)
echo  ==========================================

:: Rimuovi vecchi task \TITANIUM_OS\ (che non possiamo modificare senza admin)
echo.
echo [1/3] Rimozione task vecchi con restrizione batteria...
schtasks /delete /tn "\TITANIUM_OS\TITANIUM_NightPush"     /f 2>nul && echo   NightPush eliminato     || echo   NightPush: skip
schtasks /delete /tn "\TITANIUM_OS\TITANIUM_NightResearch" /f 2>nul && echo   NightResearch eliminato || echo   NightResearch: skip
schtasks /delete /tn "\TITANIUM_OS\TITANIUM_DailyBrief"    /f 2>nul && echo   DailyBrief eliminato    || echo   DailyBrief: skip
schtasks /delete /tn "\TITANIUM_OS\TITANIUM_DeepFreeze"    /f 2>nul && echo   DeepFreeze eliminato    || echo   DeepFreeze: skip
schtasks /delete /tn "\TITANIUM_OS\TITANIUM_Watchdog"      /f 2>nul && echo   Watchdog eliminato      || echo   Watchdog: skip
schtasks /delete /tn "TITANIUM_OS_StoryAgent"              /f 2>nul && echo   StoryAgent eliminato    || echo   StoryAgent: skip
schtasks /delete /tn "TITANIUM_StartEcosystem"             /f 2>nul && echo   StartEcosystem eliminato || echo   StartEcosystem: skip

:: Applica impostazioni corrette ai nuovi task TI_ (batteria OFF, wake ON)
echo.
echo [2/3] Aggiornamento impostazioni nuovi task TI_...
powershell -NonInteractive -Command ^
  "$names = @('TI_NightPush','TI_NightResearch','TI_DailyBrief','TI_DeepFreeze','TI_FineTune','TI_StoryAgent','TI_StartEcosystem');" ^
  "foreach ($n in $names) {" ^
  "  try {" ^
  "    $s = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -WakeToRun -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Hours 10);" ^
  "    Set-ScheduledTask -TaskName $n -Settings $s -ErrorAction Stop | Out-Null;" ^
  "    Write-Host '  ['$n'] OK' -ForegroundColor Green" ^
  "  } catch { Write-Host '  ['$n'] skip: '$_ -ForegroundColor Yellow }" ^
  "}"

:: Registra StartEcosystem con privilegi elevati
echo.
echo [3/3] Registrazione TI_StartEcosystem (avvio al login)...
schtasks /create /f /tn "TI_StartEcosystem" ^
    /ru "%USERNAME%" /rl HIGHEST ^
    /sc ONLOGON ^
    /tr "cmd.exe /c \"%TI%\START_LOGIN.bat\"" ^
    /delay 0000:30 2>nul && echo   OK || echo   Gia' esistente

echo.
echo  COMPLETATO. Chiudi questa finestra.
pause
