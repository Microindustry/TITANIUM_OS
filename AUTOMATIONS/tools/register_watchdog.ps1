# register_watchdog.ps1 | TITANIUM_OS / AUTOMATIONS / tools | v1.0 | 2026-06-03
# Registra TI_Watchdog (SERVICES/watchdog.py) come task AtLogon, RunLevel Highest.
# Il watchdog mantiene vivi api_server (5001) + mente_watcher, riavviandoli se cadono.
# PORTABILE: utente corrente, python e root dinamici. Si auto-eleva via UAC.

# --- Auto-elevazione (RunLevel Highest richiede admin) ---
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Elevazione richiesta - apro UAC..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    return
}

# --- Path PORTABILI ---
$TI   = (Resolve-Path "$PSScriptRoot\..\..").Path                 # repo root = due livelli sopra tools\
$USER = $env:USERNAME
# pythonw.exe = niente finestra console per un servizio di background
$PYW  = "$env:LOCALAPPDATA\Programs\Python\Python311\pythonw.exe"
if (-not (Test-Path $PYW)) {
    $pyExe = (Get-Command python -ErrorAction SilentlyContinue).Source
    if ($pyExe) { $PYW = (Join-Path (Split-Path $pyExe) 'pythonw.exe') }
}
$WD   = "$TI\SERVICES\watchdog.py"
$LOG  = "$TI\DATA\logs\register_watchdog.log"
New-Item -ItemType Directory -Path (Split-Path $LOG) -Force | Out-Null

Write-Host "  user = $USER"
Write-Host "  TI   = $TI"
Write-Host "  PYW  = $PYW"
Write-Host "  WD   = $WD"

if (-not (Test-Path $WD)) {
    Write-Host "  [ERR] watchdog.py non trovato: $WD" -ForegroundColor Red
    "[$(Get-Date -F HH:mm:ss)] ERR watchdog.py mancante: $WD" | Add-Content $LOG
    Read-Host "Premi Enter per chiudere"; return
}

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) `
    -ExecutionTimeLimit ([TimeSpan]::Zero)          # 0 = nessun limite (gira sempre)

$principal = New-ScheduledTaskPrincipal -UserId $USER -LogonType Interactive -RunLevel Highest
$action    = New-ScheduledTaskAction -Execute $PYW -Argument "`"$WD`"" -WorkingDirectory $TI
$trigger   = New-ScheduledTaskTrigger -AtLogOn -User $USER

try {
    Unregister-ScheduledTask -TaskName "TI_Watchdog" -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask -TaskName "TI_Watchdog" -Action $action -Trigger $trigger `
        -Settings $settings -Principal $principal -Force | Out-Null
    Write-Host "  [OK] TI_Watchdog registrato (AtLogon, RunLevel Highest, no time-limit)" -ForegroundColor Green
    "[$(Get-Date -F HH:mm:ss)] OK TI_Watchdog -> $PYW $WD (user=$USER)" | Add-Content $LOG
} catch {
    Write-Host "  [ERR] $_" -ForegroundColor Red
    "[$(Get-Date -F HH:mm:ss)] ERR $_" | Add-Content $LOG
}

Write-Host "`nFatto. Il watchdog partira' al prossimo login; per avviarlo subito: schtasks /run /tn TI_Watchdog" -ForegroundColor Green
