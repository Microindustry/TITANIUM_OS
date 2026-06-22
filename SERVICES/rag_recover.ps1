# rag_recover.ps1 | TITANIUM_OS / SERVICES | v1.0 | 2026-06-23
# RECOVERY a 2 LIVELLI del RAG dopo crash/blackout (ChromaDB non e' crash-durable:
# l'HNSW si corrompe e la query fa SIGSEGV). Idempotente: se il RAG e' sano non fa
# nulla. Accesso ESCLUSIVO a ChromaDB (ferma watchdog+api). Auto-eleva (serve admin
# per uccidere l'api elevato). Uso: doppio click, o powershell -File SERVICES\rag_recover.ps1
#
#   L0  probe         -> sano? esci.
#   L1  --drop-hnsw   -> sposta SOLO il segmento HNSW; Chroma lo ricostruisce da
#                        sqlite (no ri-embed, secondi/minuti). Probe di nuovo.
#   L2  --rebuild     -> ri-embedda tutto dal corpus MENTE (~10-15 min). Probe.
# La sonda gira in SUBPROCESS: un SIGSEGV e' visibile solo come exit-code != 0.

$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Elevazione richiesta - apro UAC..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    return
}

$TI  = (Resolve-Path "$PSScriptRoot\..").Path
$PY  = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe"
if (-not (Test-Path $PY)) { $PY = (Get-Command python -ErrorAction SilentlyContinue).Source }
$env:MENTE_DIR  = "C:\Users\teo\MICROINDUSTRY\MENTE"
$env:PYTHONPATH = $TI
$RAG = "$TI\NODES\MENTE_RAG\rag_engine.py"
$logDir = Join-Path $TI "logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

function Probe {
    # CORRUZIONE: $true se la QUERY risponde senza crashare (PROBE_OK + exit 0).
    # Serve --probe (non --stats): un HNSW corrotto fa SIGSEGV in query, non in count().
    $out = & $PY $RAG --probe 2>&1 | Out-String
    return ($LASTEXITCODE -eq 0 -and $out -match "PROBE_OK")
}

function Aligned {
    # DIVERGENZA: $true se semantico >1000 chunk E semantico == bm25 (una sola verita').
    # count() legge sqlite (non l'HNSW) quindi non crasha su indice corrotto.
    $s  = & $PY $RAG --stats 2>$null | Out-String
    $mc = [regex]::Match($s, '"chunks":\s*(\d+)')
    $mb = [regex]::Match($s, '"bm25_chunks":\s*(\d+)')
    $c  = if ($mc.Success) { [int]$mc.Groups[1].Value } else { 0 }
    $b  = if ($mb.Success) { [int]$mb.Groups[1].Value } else { -1 }
    Write-Host "  semantico=$c bm25=$b"
    return ($c -gt 1000 -and $c -eq $b)
}

function Stop-RagHolders {
    # Ferma watchdog (task + processo, altrimenti rilancia l'api a meta' recovery)
    try { Stop-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop } catch {}
    Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'watchdog\.py' } | ForEach-Object {
        try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop } catch {}
    }
    Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue | ForEach-Object {
        try { Stop-Process -Id $_.OwningProcess -Force -ErrorAction Stop } catch {}
    }
    Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'api_server\.py' } | ForEach-Object {
        try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop } catch {}
    }
    Start-Sleep -Seconds 2
}

function Start-Api {
    # NB: redirect su logfile = handle OS validi. -WindowStyle Hidden lascia
    # stdout/stderr invalidi e il codice nativo (torch) ci crasha sopra. (#42)
    Start-Process -FilePath $PY -ArgumentList "api_server.py" -WorkingDirectory $TI -WindowStyle Hidden `
        -RedirectStandardOutput (Join-Path $logDir "api_server.log") `
        -RedirectStandardError  (Join-Path $logDir "api_server.err.log")
}

function Finish($msg, $color) {
    Start-Api
    try { Start-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop } catch {}
    Write-Host "`n$msg" -ForegroundColor $color
}

Write-Host "== L0: sonda salute RAG (esclusivo) ==" -ForegroundColor Cyan
Stop-RagHolders
$probeOk = Probe
$aligned = Aligned
if ($probeOk -and $aligned) { Finish "RAG SANO e allineato - nessun recovery necessario." Green; return }

if (-not $probeOk) {
    # CORRUZIONE (query crasha): prima L1 chirurgico (no ri-embed).
    Write-Host "RAG NON risponde (indice HNSW corrotto). Provo L1 chirurgico..." -ForegroundColor Yellow
    Write-Host "== L1: drop segmento HNSW (Chroma ricostruisce da sqlite) ==" -ForegroundColor Cyan
    Write-Host "  $((& $PY $RAG --drop-hnsw 2>&1 | Out-String).Trim())"
    if ((Probe) -and (Aligned)) { Finish "RECUPERATO al LIVELLO 1 (rapido, embedding preservati). RAG sano." Green; return }
    Write-Host "L1 insufficiente (sqlite compromesso o divergente). Passo a L2..." -ForegroundColor Yellow
} else {
    # Query ok ma DIVERGENZA semantico!=bm25 (L1 non serve, riallinea solo il rebuild).
    Write-Host "RAG risponde ma DIVERGE (semantico!=bm25). Passo a L2 per riallineare..." -ForegroundColor Yellow
}

Write-Host "== L2: rebuild HARD dal corpus MENTE (reset fisico chroma_db, HNSW da 0) ==" -ForegroundColor Cyan
& $PY $RAG --rebuild-hard
$ok2 = (Probe) -and (Aligned)
if ($ok2) { Finish "RECUPERATO al LIVELLO 2 (rebuild da corpus). RAG sano e allineato." Green }
else      { Finish "ATTENZIONE: dopo L2 il RAG non e' sano - controlla logs/api_server.err.log" Red }
