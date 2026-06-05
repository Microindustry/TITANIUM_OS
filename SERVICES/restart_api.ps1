# restart_api.ps1 | TITANIUM_OS / SERVICES | v1.0 | 2026-06-05
# Riavvia api_server (5001) per caricare codice nuovo SENZA aspettare il login.
# Serve quando api_server gira elevato (spawnato dal watchdog) e una shell
# normale non puo' ucciderlo: questo script si auto-eleva via UAC.
# Uso: doppio click, oppure  powershell -File SERVICES\restart_api.ps1

# --- Auto-elevazione: uccidere un processo High-IL richiede admin ---
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Elevazione richiesta - apro UAC..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    return
}

$TI  = (Resolve-Path "$PSScriptRoot\..").Path
$PY  = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe"
if (-not (Test-Path $PY)) {
    $pyExe = (Get-Command python -ErrorAction SilentlyContinue).Source
    if ($pyExe) { $PY = $pyExe }
}

Write-Host "  TI = $TI"
Write-Host "  PY = $PY"

# 1) Termina ogni api_server in ascolto sulla 5001 (anche se elevato)
$killed = 0
$conns = Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue
foreach ($c in $conns) {
    try { Stop-Process -Id $c.OwningProcess -Force -ErrorAction Stop; $killed++ } catch {}
}
# Fallback: qualsiasi python con api_server.py nel commandline
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'api_server\.py' } | ForEach-Object {
    try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop; $killed++ } catch {}
}
Write-Host "  processi terminati: $killed"
Start-Sleep -Milliseconds 1000

# 2) Riavvia api_server (detached, niente finestra). Il watchdog lo adottera'.
Start-Process -FilePath $PY -ArgumentList "api_server.py" -WorkingDirectory $TI -WindowStyle Hidden
Start-Sleep -Seconds 3

# 3) Verifica /api/health
try {
    $h = Invoke-RestMethod -Uri "http://localhost:5001/api/health" -TimeoutSec 5
    Write-Host "  [OK] api_server live - status=$($h.status)" -ForegroundColor Green
} catch {
    Write-Host "  [WARN] health non risponde ancora: $_" -ForegroundColor Yellow
}
Write-Host "Fatto." -ForegroundColor Green
