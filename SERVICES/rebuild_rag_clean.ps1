# rebuild_rag_clean.ps1 | TITANIUM_OS / SERVICES | v1.0 | 2026-06-13
# Rebuild COMPLETO del RAG con accesso ESCLUSIVO a ChromaDB. Risolve il conflitto
# "0 chunk semantici": l'api_server (e il watchdog che lo rilancia) tengono aperto
# il DB e bloccano il writer HNSW durante un --rebuild. Qui: fermo watchdog + api,
# rebuild pulito, riavvio tutto. Si auto-eleva (serve admin per uccidere api elevato).
# Uso: doppio click, oppure  powershell -File SERVICES\rebuild_rag_clean.ps1

$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Elevazione richiesta - apro UAC..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    return
}

$TI  = (Resolve-Path "$PSScriptRoot\..").Path
$PY  = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe"
if (-not (Test-Path $PY)) { $PY = (Get-Command python -ErrorAction SilentlyContinue).Source }
$env:MENTE_DIR = "C:\Users\teo\MICROINDUSTRY\MENTE"
$env:PYTHONPATH = $TI

# HEALTH GATE: il RAG e' sano solo se semantico >1000 chunk E semantico == bm25.
# v1.1: oltre al caso "0 chunk" ora rileva anche la DIVERGENZA semantico!=bm25 (lasciata
# da un incrementale interrotto/conflitto GPU) -> la regola "una sola verita'" vale anche
# qui. Idempotente: se sano e allineato non fa nulla; se rotto O divergente, rebuild esclusivo.
$pre = & $PY "$TI\NODES\MENTE_RAG\rag_engine.py" --stats 2>$null | Out-String
$pc = [regex]::Match($pre, '"chunks":\s*(\d+)')
$pb = [regex]::Match($pre, '"bm25_chunks":\s*(\d+)')
$cn = if ($pc.Success) { [int]$pc.Groups[1].Value } else { 0 }
$bn = if ($pb.Success) { [int]$pb.Groups[1].Value } else { -1 }
if ($cn -gt 1000 -and $cn -eq $bn) {
    Write-Host "RAG gia' sano e allineato ($cn == $bn) - nessun rebuild necessario." -ForegroundColor Green
    return
}
Write-Host "RAG da rigenerare (semantico=$cn bm25=${bn}: vuoto o divergente) - rebuild esclusivo." -ForegroundColor Yellow

Write-Host "== 1) fermo il watchdog (non deve rilanciare api durante il rebuild) ==" -ForegroundColor Cyan
try { Stop-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop; Write-Host "  TI_Watchdog (task) fermato" } catch { Write-Host "  (task watchdog gia' fermo o assente)" }
# CRITICO: Stop-ScheduledTask non uccide il processo watchdog.py gia' avviato (detached,
# loop while-True) che RILANCIA l'api entro ~30s. Sotto admin lo killiamo davvero, altrimenti
# l'api torna su a meta' rebuild e ChromaDB si corrompe (lezione 14/06).
$wd = 0
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'watchdog\.py' } | ForEach-Object {
    try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop; $wd++ } catch {}
}
Write-Host "  processi watchdog.py terminati: $wd"

Write-Host "== 2) chiudo api_server (rilascia ChromaDB) ==" -ForegroundColor Cyan
$killed = 0
Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue | ForEach-Object {
    try { Stop-Process -Id $_.OwningProcess -Force -ErrorAction Stop; $killed++ } catch {}
}
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'api_server\.py' } | ForEach-Object {
    try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop; $killed++ } catch {}
}
Write-Host "  processi api terminati: $killed"
Start-Sleep -Seconds 2

Write-Host "== 3) rebuild RAG (accesso esclusivo, ~10-15 min su GPU) ==" -ForegroundColor Cyan
& $PY "$TI\NODES\MENTE_RAG\rag_engine.py" --rebuild

Write-Host "== 4) verifica chunk semantici ==" -ForegroundColor Cyan
$stats = & $PY "$TI\NODES\MENTE_RAG\rag_engine.py" --stats 2>$null | Out-String
$m = [regex]::Match($stats, '"chunks":\s*(\d+)')
$chunks = if ($m.Success) { [int]$m.Groups[1].Value } else { 0 }
if ($chunks -gt 0) { Write-Host "  OK: $chunks chunk semantici" -ForegroundColor Green }
else { Write-Host "  ATTENZIONE: ancora 0 chunk - rilancia o controlla i log" -ForegroundColor Red }

Write-Host "== 5) riavvio api_server ==" -ForegroundColor Cyan
# redirect su logfile = handle OS validi (Hidden lascia stdout/stderr invalidi e il
# codice nativo torch ci crasha sopra su /api/rag/search). (#42 blackout)
$logDir = Join-Path $TI "logs"; if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
Start-Process -FilePath $PY -ArgumentList "api_server.py" -WorkingDirectory $TI -WindowStyle Hidden `
    -RedirectStandardOutput (Join-Path $logDir "api_server.log") `
    -RedirectStandardError  (Join-Path $logDir "api_server.err.log")

Write-Host "== 6) riavvio watchdog ==" -ForegroundColor Cyan
try { Start-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop; Write-Host "  TI_Watchdog riavviato" } catch { Write-Host "  (non ho potuto riavviare il watchdog: $_)" }

Write-Host "`nFatto. Chunk semantici: $chunks" -ForegroundColor Green
Start-Sleep -Seconds 4
