# register_night_tasks.ps1 | TITANIUM_OS / AUTOMATIONS / tools | v1.0 | 2026-06-03
# Registra i task notturni in Task Scheduler — PORTABILE (utente corrente, path dinamici).
# Sostituisce set_tasks_hl.ps1 / fix_tasks_admin.ps1 / SETUP_ADMIN_COMPLETE.ps1 (hardcoded benen).
# RunLevel Highest richiede elevazione: lo script si auto-eleva via UAC se serve.

# --- Auto-elevazione ---
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Elevazione richiesta (RunLevel Highest) — apro UAC..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    return
}

# --- Path PORTABILI ---
$TI   = (Resolve-Path "$PSScriptRoot\..\..").Path          # repo root = due livelli sopra tools\
$USER = $env:USERNAME
$PY   = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $PY) { $PY = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe" }
$LOG  = "$TI\DATA\logs\register_tasks.log"
New-Item -ItemType Directory -Path (Split-Path $LOG) -Force | Out-Null
"[$(Get-Date -F HH:mm:ss)] START — user=$USER  TI=$TI  PY=$PY" | Set-Content $LOG
Write-Host "  user=$USER" -ForegroundColor Cyan
Write-Host "  TI  =$TI"   -ForegroundColor Cyan
Write-Host "  PY  =$PY"   -ForegroundColor Cyan

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -WakeToRun -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 10)

$principal = New-ScheduledTaskPrincipal -UserId $USER -LogonType Interactive -RunLevel Highest

$defs = @(
  @{n="TI_StoryAgent";     exe="$TI\NODES\STORY_AGENT\run_story_agent.bat";    arg=$null;                                     trigger=(New-ScheduledTaskTrigger -Daily -At "02:07")},
  @{n="TI_NightResearch";  exe="$TI\AUTOMATIONS\core\night_research.bat";       arg=$null;                                     trigger=(New-ScheduledTaskTrigger -Daily -At "03:37")},
  @{n="TI_NightAudit";     exe="$TI\NODES\AUDIT_AGENT\run_night_audit.bat";     arg=$null;                                     trigger=(New-ScheduledTaskTrigger -Daily -At "03:52")},
  @{n="TI_NightPush";      exe="$TI\AUTOMATIONS\core\night_push.bat";           arg=$null;                                     trigger=(New-ScheduledTaskTrigger -Daily -At "04:07")},
  @{n="TI_DailyBrief";     exe=$PY;                                             arg="`"$TI\AUTOMATIONS\core\daily_brief.py`""; trigger=(New-ScheduledTaskTrigger -Daily -At "07:30")},
  @{n="TI_DeepFreeze";     exe=$PY;                                             arg="`"$TI\AUTOMATIONS\core\deep_freeze.py`""; trigger=(New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "03:00")},
  @{n="TI_FineTune";       exe="$TI\AUTOMATIONS\core\night_finetune.bat";       arg=$null;                                     trigger=(New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "01:00")}
)

foreach ($d in $defs) {
  Unregister-ScheduledTask -TaskName $d.n -Confirm:$false -ErrorAction SilentlyContinue
  $action = if ($d.arg) { New-ScheduledTaskAction -Execute $d.exe -Argument $d.arg } `
            else        { New-ScheduledTaskAction -Execute $d.exe }
  try {
    Register-ScheduledTask -TaskName $d.n -Action $action -Trigger $d.trigger -Settings $settings -Principal $principal -Force | Out-Null
    "[$(Get-Date -F HH:mm:ss)] OK  $($d.n)" | Add-Content $LOG
    Write-Host "  [OK] $($d.n)" -ForegroundColor Green
  } catch {
    "[$(Get-Date -F HH:mm:ss)] ERR $($d.n): $_" | Add-Content $LOG
    Write-Host "  [ERR] $($d.n): $_" -ForegroundColor Red
  }
}

# --- Power: niente sleep, wake abilitato (per i task notturni) ---
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
powercfg /change monitor-timeout-ac 0
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 0 /f | Out-Null
"[$(Get-Date -F HH:mm:ss)] Power: sleep OFF, fast-startup OFF" | Add-Content $LOG
Write-Host "  [OK] Power: sleep disabilitato, fast-startup OFF" -ForegroundColor Green

"[$(Get-Date -F HH:mm:ss)] DONE" | Add-Content $LOG
Write-Host "`nFatto. Task registrati per l'utente $USER. Log: $LOG" -ForegroundColor Green
