# set_tasks_hl.ps1 | TITANIUM_OS | v1.1 | 2026-06-24
# v1.1: de-hardcodato (no C:\Users\benen) - root da $PSScriptRoot, utente da $env:USERNAME
$TI  = (Resolve-Path "$PSScriptRoot\..\..").Path
$PY  = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $PY) { $PY = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe" }
$LOG = "$TI\DATA\logs\task_hl.log"
"[$(Get-Date -F HH:mm:ss)] START" | Set-Content $LOG

$s = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -WakeToRun `
    -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 10)

$p = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest

$defs = @(
  @{n="TI_StoryAgent";    exe="$TI\NODES\STORY_AGENT\run_story_agent.bat"; arg=$null;                                  trigger=(New-ScheduledTaskTrigger -Daily -At "02:07")},
  @{n="TI_NightResearch"; exe="$TI\AUTOMATIONS\core\night_research.bat";   arg=$null;                                  trigger=(New-ScheduledTaskTrigger -Daily -At "03:37")},
  @{n="TI_NightPush";     exe="$TI\AUTOMATIONS\core\night_push.bat";       arg=$null;                                  trigger=(New-ScheduledTaskTrigger -Daily -At "04:07")},
  @{n="TI_DailyBrief";    exe=$PY;                                         arg="$TI\AUTOMATIONS\core\daily_brief.py";  trigger=(New-ScheduledTaskTrigger -Daily -At "07:30")},
  @{n="TI_DeepFreeze";    exe=$PY;                                         arg="$TI\AUTOMATIONS\core\deep_freeze.py";  trigger=(New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "03:00")},
  @{n="TI_FineTune";      exe="$TI\AUTOMATIONS\core\night_finetune.bat";   arg=$null;                                  trigger=(New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "01:00")},
  @{n="TI_Watchdog";      exe=$PY;                                         arg="$TI\SERVICES\watchdog.py";             trigger=(New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME)},
  @{n="TI_StartEcosystem";exe="cmd.exe";                                   arg="/c `"$TI\START_LOGIN.bat`"";           trigger=(New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME)}
)

foreach ($d in $defs) {
  Unregister-ScheduledTask -TaskName $d.n -Confirm:$false -ErrorAction SilentlyContinue
  $action = if ($d.arg) { New-ScheduledTaskAction -Execute $d.exe -Argument $d.arg } `
            else        { New-ScheduledTaskAction -Execute $d.exe }
  try {
    Register-ScheduledTask -TaskName $d.n -Action $action -Trigger $d.trigger -Settings $s -Principal $p -Force | Out-Null
    "[$(Get-Date -F HH:mm:ss)] OK $($d.n)" | Add-Content $LOG
  } catch {
    "[$(Get-Date -F HH:mm:ss)] ERR $($d.n): $_" | Add-Content $LOG
  }
}

# Elimina vecchi task obsoleti con restrizione batteria
$old = @("\TITANIUM_OS\TITANIUM_NightPush","\TITANIUM_OS\TITANIUM_NightResearch",
         "\TITANIUM_OS\TITANIUM_DailyBrief","\TITANIUM_OS\TITANIUM_DeepFreeze",
         "\TITANIUM_OS\TITANIUM_Watchdog","TITANIUM_OS_StoryAgent","TITANIUM_StartEcosystem")
foreach ($o in $old) { schtasks /delete /tn $o /f 2>$null }
"[$(Get-Date -F HH:mm:ss)] Vecchi task eliminati" | Add-Content $LOG

# Fast startup OFF
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 0 /f 2>$null
"[$(Get-Date -F HH:mm:ss)] FastStartup OFF" | Add-Content $LOG
"[$(Get-Date -F HH:mm:ss)] DONE" | Add-Content $LOG
