# rag_update_exclusive.ps1 | TITANIUM_OS / SERVICES | v1.1 | 2026-06-23
# Rebuild RAG in ACCESSO ESCLUSIVO a ChromaDB: ferma watchdog+watcher+api (che tengono
# aperto il DB e potrebbero corrompere l'HNSW su scrittura concorrente), esegue
# il rebuild, riavvia tutto con handle validi. Auto-eleva (serve admin). (#42)
#
# v1.2 (#43): ferma ANCHE watcher.py. Senza, dopo una modifica MASSIVA a MENTE (es.
# rigenerazione Obsidian, 287 file) il watcher lancia un incrementale gigante che
# combatte il rebuild -> delete-spam label-fantasma + crash mid-write (journal aperto).
# Lo riavvia a fine (handle validi). L'accesso "esclusivo" ora e' davvero esclusivo.
#
# v1.1: usa --rebuild (full), NON --incremental. Su chromadb 0.5.23 un incrementale
# con MOLTI delete (es. dopo intersect/fix-titoli che toccano centinaia di file)
# lascia label soft-deleted inconsistenti -> "Label not found" -> query intermittenti
# rotte. Il full rebuild resetta la collection -> indice compatto e pulito. Per pochi
# file cambiati l'incrementale notturno va bene; dopo modifiche massive serve questo.

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
$logDir = Join-Path $TI "logs"; if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

Write-Host "== 1) fermo watchdog + watcher + api (accesso esclusivo a ChromaDB) ==" -ForegroundColor Cyan
try { Stop-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop } catch {}
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'watchdog\.py' } | ForEach-Object { try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop } catch {} }
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'watcher\.py' } | ForEach-Object { try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop } catch {} }
Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { try { Stop-Process -Id $_.OwningProcess -Force -ErrorAction Stop } catch {} }
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'api_server\.py' } | ForEach-Object { try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop } catch {} }
Start-Sleep -Seconds 2

Write-Host "== 2) full rebuild HARD (reset fisico chroma_db -> HNSW da 0) ==" -ForegroundColor Cyan
& $PY "$TI\NODES\MENTE_RAG\rag_engine.py" --rebuild-hard

Write-Host "== 3) verifica allineamento ==" -ForegroundColor Cyan
$stats = & $PY "$TI\NODES\MENTE_RAG\rag_engine.py" --stats 2>$null | Out-String
$c = [regex]::Match($stats, '"chunks":\s*(\d+)'); $b = [regex]::Match($stats, '"bm25_chunks":\s*(\d+)')
Write-Host ("  semantico={0} bm25={1}" -f $c.Groups[1].Value, $b.Groups[1].Value)

Write-Host "== 4) riavvio api (logfile = handle validi) + watchdog + watcher ==" -ForegroundColor Cyan
Start-Process -FilePath $PY -ArgumentList "api_server.py" -WorkingDirectory $TI -WindowStyle Hidden `
    -RedirectStandardOutput (Join-Path $logDir "api_server.log") `
    -RedirectStandardError  (Join-Path $logDir "api_server.err.log")
try { Start-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop } catch {}
$PYW = $PY -replace 'python\.exe$','pythonw.exe'; if (-not (Test-Path $PYW)) { $PYW = $PY }
Start-Process -FilePath $PYW -ArgumentList "$TI\AUTOMATIONS\core\watcher.py" -WorkingDirectory $TI -WindowStyle Hidden
Write-Host "Fatto." -ForegroundColor Green
Start-Sleep -Seconds 3
