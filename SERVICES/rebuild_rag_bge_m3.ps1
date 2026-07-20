# rebuild_rag_bge_m3.ps1 | TITANIUM_OS / SERVICES | v1.0 | 2026-07-20
# SWAP EMBEDDER DELIBERATO: paraphrase-multilingual-MiniLM-L12-v2 (384d) -> BAAI/bge-m3 (1024d).
# Ricalca rebuild_rag_clean.ps1 (accesso ESCLUSIVO a ChromaDB) MA senza health-gate: qui il
# rebuild e' VOLUTO (cambio dimensione, l'indice vecchio non e' "sano per bge-m3"). Atomico:
# 1) edita la costante EMBED_MODEL, 2) ferma watchdog+api, 3) --rebuild-hard (RESET FISICO,
# obbligatorio: 384->1024 non convive con l'HNSW vecchio), 4) verifica, 5) riavvia tutto.
# Rete di sicurezza gia' scattata: snapshot known-good in _VAULT/BACKUPS/rag_snapshots.
# ROLLBACK: rieseguire con -Revert (rimette MiniLM) poi ri-lanciare, oppure --restore-snapshot.
# Uso: doppio click (UAC) oppure  powershell -File SERVICES\rebuild_rag_bge_m3.ps1 [-Revert]
param([switch]$Revert)

$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Elevazione richiesta - apro UAC..." -ForegroundColor Yellow
    $argList = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    if ($Revert) { $argList += " -Revert" }
    Start-Process powershell.exe $argList -Verb RunAs
    return
}

$TI  = (Resolve-Path "$PSScriptRoot\..").Path
$PY  = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe"
if (-not (Test-Path $PY)) { $PY = (Get-Command python -ErrorAction SilentlyContinue).Source }
$env:MENTE_DIR = "C:\Users\teo\MICROINDUSTRY\MENTE"
$env:PYTHONPATH = $TI
$env:RAG_DEVICE = "cuda"

$NEW = if ($Revert) { "paraphrase-multilingual-MiniLM-L12-v2" } else { "BAAI/bge-m3" }
Write-Host "== 0) EMBED_MODEL -> $NEW (edit rag_engine.py) ==" -ForegroundColor Cyan
$rag = "$TI\NODES\MENTE_RAG\rag_engine.py"
& $PY -c @"
import re, pathlib
p = pathlib.Path(r'$rag')
t = p.read_text(encoding='utf-8')
t2 = re.sub(r'EMBED_MODEL(\s*)=(\s*)\"[^\"]*\"', 'EMBED_MODEL\\1=\\2\"$NEW\"', t, count=1)
p.write_text(t2, encoding='utf-8')
print('  EMBED_MODEL impostato a $NEW' if t2 != t else '  (gia $NEW, nessun cambio)')
"@

Write-Host "== 1) fermo il watchdog (non deve rilanciare api durante il rebuild) ==" -ForegroundColor Cyan
try { Stop-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop; Write-Host "  TI_Watchdog (task) fermato" } catch { Write-Host "  (task watchdog gia' fermo o assente)" }
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

Write-Host "== 3) rebuild-hard (RESET FISICO chroma_db, ~10-20 min: bge-m3 e' piu' grande) ==" -ForegroundColor Cyan
& $PY "$TI\NODES\MENTE_RAG\rag_engine.py" --rebuild-hard

Write-Host "== 4) verifica (semantico >0 e allineato a bm25) ==" -ForegroundColor Cyan
$stats = & $PY "$TI\NODES\MENTE_RAG\rag_engine.py" --stats 2>$null | Out-String
$cm = [regex]::Match($stats, '"chunks":\s*(\d+)')
$bm = [regex]::Match($stats, '"bm25_chunks":\s*(\d+)')
$chunks = if ($cm.Success) { [int]$cm.Groups[1].Value } else { 0 }
$bm25   = if ($bm.Success) { [int]$bm.Groups[1].Value } else { -1 }
if ($chunks -gt 1000 -and $chunks -eq $bm25) { Write-Host "  OK: $chunks chunk (semantico == bm25)" -ForegroundColor Green }
else { Write-Host "  ATTENZIONE: chunks=$chunks bm25=$bm25 - controlla i log / valuta --restore-snapshot" -ForegroundColor Red }

Write-Host "== 5) riavvio api_server (redirect via cmd = handle validi, #42) ==" -ForegroundColor Cyan
$logDir = Join-Path $TI "logs"; if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$apiOut = Join-Path $logDir "api_server.log"; $apiErr = Join-Path $logDir "api_server.err.log"
Start-Process -FilePath "cmd.exe" -WorkingDirectory $TI -WindowStyle Hidden `
    -ArgumentList ("/c `"`"$PY`" api_server.py >> `"$apiOut`" 2>>`"$apiErr`"`"")

Write-Host "== 6) riavvio watchdog ==" -ForegroundColor Cyan
try { Start-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop; Write-Host "  TI_Watchdog riavviato" } catch { Write-Host "  (non ho potuto riavviare il watchdog: $_)" }

Write-Host "`nFATTO. Embedder = $NEW | chunk = $chunks" -ForegroundColor Green
Write-Host "PROSSIMO (chiedi a Claude): ricalibrare la soglia di vault_intersect per bge-m3" -ForegroundColor Yellow
Write-Host "  (la distribuzione cosine cambia: lo 0.50 di MiniLM va rimisurato) e rigenerare Collegati+linkgraph." -ForegroundColor Yellow
Start-Sleep -Seconds 5
