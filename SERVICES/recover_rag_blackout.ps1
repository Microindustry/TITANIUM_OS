# recover_rag_blackout.ps1 | TITANIUM_OS / SERVICES | one-off | 2026-06-23
# Recovery post-blackout: ChromaDB store corrotto (journal SQLite orfano + HNSW
# troncato -> crash nativo su query). Ferma watchdog+api, SPOSTA lo store corrotto
# (additivo, non cancella), lascia il campo libero per un rebuild pulito.
# Auto-elevazione UAC.
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    return
}
$TI  = (Resolve-Path "$PSScriptRoot\..").Path
$res = Join-Path $TI "logs\recover_result.txt"
$out = @()

# 1) Ferma il watchdog (smette di respawnare api_server)
schtasks /End    /TN "TI_Watchdog" 2>$null | Out-Null
schtasks /Change /TN "TI_Watchdog" /DISABLE 2>$null | Out-Null
$out += "watchdog: stopped+disabled"

# 2) Uccidi ogni api_server.py + chi tiene la 5001
$killed = 0
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'api_server\.py' } | ForEach-Object {
    try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop; $killed++ } catch {}
}
Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue | ForEach-Object {
    try { Stop-Process -Id $_.OwningProcess -Force -ErrorAction Stop; $killed++ } catch {}
}
Start-Sleep -Seconds 3
$out += "api_server killed: $killed"

# 3) Verifica GPU libera
$gpuApps = (nvidia-smi --query-compute-apps=pid --format=csv,noheader 2>$null | Measure-Object).Count
$out += "gpu compute apps residui: $gpuApps"

# 4) SPOSTA (non cancella) lo store corrotto
$cd  = Join-Path $TI "NODES\MENTE_RAG\chroma_db"
$bak = Join-Path $TI ("NODES\MENTE_RAG\chroma_db_corrupt_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
if (Test-Path $cd) {
    try { Rename-Item -Path $cd -NewName (Split-Path $bak -Leaf) -ErrorAction Stop; $out += "chroma_db -> $(Split-Path $bak -Leaf) (spostato OK)" }
    catch { $out += "ERRORE spostamento chroma_db: $_  (file ancora in lock?)" }
} else { $out += "chroma_db non trovato (gia' spostato?)" }

$out += "5001 listener residuo: " + (((Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue).OwningProcess) -join ',')
$out | Set-Content -Path $res -Encoding UTF8
