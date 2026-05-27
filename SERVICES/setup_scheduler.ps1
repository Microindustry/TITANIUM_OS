# setup_scheduler.ps1 | TITANIUM_OS / SERVICES | v1.0 | 2026-05-27
# Registra Task Scheduler Windows per TITANIUM_OS
# Esegui UNA VOLTA: .\SERVICES\setup_scheduler.ps1

$PYTHON  = "$env:USERPROFILE\tools\python311\python.exe"
$TI_ROOT = "$env:USERPROFILE\TITANIUM_OS\TITANIUM_OS"
$LOG_DIR = "$TI_ROOT\DATA\logs"

if (-not (Test-Path $LOG_DIR)) { New-Item -ItemType Directory -Force $LOG_DIR | Out-Null }

Write-Host "TITANIUM_OS Setup Task Scheduler" -ForegroundColor Cyan

# TASK 1: WATCHDOG al login
$a1 = New-ScheduledTaskAction -Execute $PYTHON -Argument "$TI_ROOT\SERVICES\watchdog.py" -WorkingDirectory $TI_ROOT
$t1 = New-ScheduledTaskTrigger -AtLogOn
$s1 = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 0) -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable

try {
    Unregister-ScheduledTask -TaskName "TITANIUM_Watchdog" -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask -TaskName "TITANIUM_Watchdog" -TaskPath "\TITANIUM_OS\" -Action $a1 -Trigger $t1 -Settings $s1 -RunLevel Highest -Description "TITANIUM_OS Watchdog" | Out-Null
    Write-Host "  [OK] TITANIUM_Watchdog (al login)" -ForegroundColor Green
} catch {
    Write-Host "  [ERR] Watchdog: $_" -ForegroundColor Red
}

# TASK 2: DAILY BRIEF alle 07:30
$a2 = New-ScheduledTaskAction -Execute $PYTHON -Argument "$TI_ROOT\AUTOMATIONS\core\daily_brief.py" -WorkingDirectory $TI_ROOT
$t2 = New-ScheduledTaskTrigger -Daily -At "07:30"
$s2 = New-ScheduledTaskSettingsSet -StartWhenAvailable

try {
    Unregister-ScheduledTask -TaskName "TITANIUM_DailyBrief" -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask -TaskName "TITANIUM_DailyBrief" -TaskPath "\TITANIUM_OS\" -Action $a2 -Trigger $t2 -Settings $s2 -Description "TITANIUM_OS Daily Brief 07:30" | Out-Null
    Write-Host "  [OK] TITANIUM_DailyBrief (07:30 daily)" -ForegroundColor Green
} catch {
    Write-Host "  [ERR] DailyBrief: $_" -ForegroundColor Red
}

# TASK 3: DEEP FREEZE domenica 03:00
$freeze = "$TI_ROOT\AUTOMATIONS\core\deep_freeze.py"
if (Test-Path $freeze) {
    $a3 = New-ScheduledTaskAction -Execute $PYTHON -Argument $freeze -WorkingDirectory $TI_ROOT
    $t3 = New-ScheduledTaskTrigger -Weekly -WeeksInterval 1 -DaysOfWeek Sunday -At "03:00"
    $s3 = New-ScheduledTaskSettingsSet -StartWhenAvailable -WakeToRun
    try {
        Unregister-ScheduledTask -TaskName "TITANIUM_DeepFreeze" -Confirm:$false -ErrorAction SilentlyContinue
        Register-ScheduledTask -TaskName "TITANIUM_DeepFreeze" -TaskPath "\TITANIUM_OS\" -Action $a3 -Trigger $t3 -Settings $s3 -Description "TITANIUM_OS Backup AES-256 domenica 03:00" | Out-Null
        Write-Host "  [OK] TITANIUM_DeepFreeze (domenica 03:00)" -ForegroundColor Green
    } catch {
        Write-Host "  [ERR] DeepFreeze: $_" -ForegroundColor Red
    }
} else {
    Write-Host "  [SKIP] DeepFreeze (deep_freeze.py non trovato)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Verifica: taskschd.msc -> Task Scheduler Library -> TITANIUM_OS" -ForegroundColor DarkGray
Write-Host "Avvio immediato watchdog:" -ForegroundColor DarkGray
Write-Host "  Start-ScheduledTask -TaskPath '\TITANIUM_OS\' -TaskName 'TITANIUM_Watchdog'" -ForegroundColor White
Write-Host ""
