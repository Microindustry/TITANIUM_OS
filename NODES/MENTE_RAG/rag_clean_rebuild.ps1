# rag_clean_rebuild.ps1 | TITANIUM_OS / NODES / MENTE_RAG | v2.0 | 2026-06-20
# Manutenzione RAG: rebuild PULITO a scrittore singolo. ChromaDB si corrompe se due
# processi scrivono insieme; l'API (gestita dal watchdog, che la riavvia ogni 30s) tiene
# il lock. Questo script — ELEVATO — mette il sistema in MANUTENZIONE, libera il lock,
# ricostruisce con UN solo scrittore, poi rialza tutto.
# v2.0: + .maintenance.lock (il watchdog ci sta fermo), uccide il PROCESSO watchdog vecchio
#       e ogni rebuild/API in corso (fine race del 20:24), auto-registra TI_RagRebuild.

$ErrorActionPreference = 'Continue'
$root = 'C:\Users\teo\TITANIUM_OS'
$base = "$root\NODES\MENTE_RAG"
$py   = 'C:\Users\teo\AppData\Local\Programs\Python\Python311\python.exe'
$lock = "$root\DATA\.maintenance.lock"
$log  = "$root\DATA\logs\rag_clean_rebuild.log"
"" | Out-File $log
function L($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $m" | Tee-Object -FilePath $log -Append }

function Kill-ByCmd($pattern) {
    Get-CimInstance Win32_Process -Filter "Name='python.exe' OR Name='pythonw.exe'" |
        Where-Object { $_.CommandLine -like $pattern } |
        ForEach-Object { try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop; L "  killed PID $($_.ProcessId) ($pattern)" } catch { L "  kill fail $($_.ProcessId): $($_.Exception.Message)" } }
}

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
L "=== START rag_clean_rebuild v2 (admin=$isAdmin) ==="

try {
    # 0a. uccidi eventuali ALTRE istanze di questo script (vecchie run elevate ancora vive)
    Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" |
        Where-Object { $_.CommandLine -like '*rag_clean_rebuild.ps1*' -and $_.ProcessId -ne $PID } |
        ForEach-Object { try { Stop-Process -Id $_.ProcessId -Force; L "killed vecchia istanza script PID $($_.ProcessId)" } catch {} }

    # 0b. MANUTENZIONE ON (il watchdog nuovo ci sta fermo)
    "maintenance $(Get-Date -Format o)" | Out-File $lock -Encoding ascii
    L "lock manutenzione creato"

    # 1. watchdog OFF: task + PROCESSO (quello in esecuzione ha codice vecchio senza lock-check)
    schtasks /End    /TN TI_Watchdog 2>&1 | Out-Null
    schtasks /Change /TN TI_Watchdog /DISABLE 2>&1 | Out-Null
    Kill-ByCmd '*watchdog.py*'
    L "watchdog fermato (task + processo)"

    # 2. uccidi ogni rebuild/API in corso (fine race), poi l'API sulla 5001
    Kill-ByCmd '*rag_engine.py*--rebuild*'
    Kill-ByCmd '*api_server.py*'
    $pids = @((Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique)
    foreach ($p in $pids) { try { Stop-Process -Id $p -Force; L "  killed API 5001 PID $p" } catch {} }
    Start-Sleep -Seconds 5
    $still = (Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue | Measure-Object).Count
    L "5001 listener dopo kill: $still (atteso 0)"

    # 3. cancella indice corrotto + derivati stantii (rigenerabili da MENTE)
    foreach ($d in (Get-ChildItem $base -Directory -Filter 'chroma_db*' -ErrorAction SilentlyContinue)) {
        Remove-Item $d.FullName -Recurse -Force -ErrorAction SilentlyContinue; L "rimosso $($d.Name)"
    }
    Remove-Item "$base\rag_manifest.json","$base\rag_corpus.jsonl","$base\rag_tfidf.pkl" -Force -ErrorAction SilentlyContinue
    L "manifest/corpus/tfidf rimossi"

    # 4. rebuild a scrittore singolo (niente watchdog, niente API = niente corruzione)
    L "rebuild in corso (embedding GPU, ~2-4 min)..."
    Set-Location $root
    & $py "$base\rag_engine.py" --rebuild *>> $log
    L "rebuild terminato (exit=$LASTEXITCODE)"
    & $py "$base\rag_engine.py" --stats *>> $log
}
finally {
    # 5. MANUTENZIONE OFF + rialza il watchdog NUOVO (ri-avvierà API + watcher puliti)
    Remove-Item $lock -Force -ErrorAction SilentlyContinue
    L "lock manutenzione rimosso"
    schtasks /Change /TN TI_Watchdog /ENABLE 2>&1 | Out-Null
    schtasks /Run    /TN TI_Watchdog 2>&1 | Out-Null
    L "watchdog riabilitato + avviato (ri-alza API/watcher)"

    # 6. auto-registra TI_RagRebuild -> i prossimi rebuild si lanciano SENZA UAC
    try {
        $action    = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$base\rag_clean_rebuild.ps1`""
        $principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Highest
        $settings  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
        Register-ScheduledTask -TaskName 'TI_RagRebuild' -Action $action -Principal $principal -Settings $settings -Description 'Rebuild pulito RAG ChromaDB (scrittore singolo) on-demand, elevato' -Force | Out-Null
        L "TI_RagRebuild registrato -> prossimi rebuild: schtasks /Run /TN TI_RagRebuild (no UAC)"
    } catch { L "registrazione TI_RagRebuild fallita: $($_.Exception.Message)" }
    L "=== FINE rag_clean_rebuild v2 ==="
}
