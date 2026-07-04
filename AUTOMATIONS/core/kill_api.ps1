# kill_api.ps1 | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-07-04
# Spegne l'API (porta 5001) + watchdog in modo pulito, anche se elevata.
# Nato come DATA/tmp_kill_api.ps1 durante il recovery HNSW del 03/07 (l'API elevata
# teneva il lock su chroma_db): promosso a utility perche' serve in ogni recovery.
# Va lanciato da shell ELEVATA se l'API gira elevata (altrimenti Stop-Process fallisce).
try { Stop-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction Stop; Write-Host "watchdog task stop" } catch {}
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'watchdog\.py|api_server\.py' } | ForEach-Object {
    try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop; Write-Host "killed $($_.ProcessId) ($($_.Name))" } catch {}
}
Start-Sleep 1
Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object {
    try { Stop-Process -Id $_ -Force -ErrorAction Stop; Write-Host "killed 5001 owner $_" } catch { Write-Host "no-kill $_ : $($_.Exception.Message)" }
}
Start-Sleep 1
if (Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue) { Write-Host "ESITO: 5001 ANCORA SU" } else { Write-Host "ESITO: 5001 LIBERA" }
