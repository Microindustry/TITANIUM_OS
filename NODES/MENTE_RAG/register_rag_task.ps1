# register_rag_task.ps1 | TITANIUM_OS / NODES / MENTE_RAG | v1.0 | 2026-06-20
# Registra TI_RagRebuild: un task ELEVATO che esegue rag_clean_rebuild.ps1 (rebuild
# pulito a scrittore singolo). Si registra UNA volta (un solo UAC). Dopo, il rebuild
# si lancia con `schtasks /Run /TN TI_RagRebuild` SENZA UAC — anche da Claude/non-admin.
# Questo elimina il muro UAC sui rebuild RAG: il task e' pre-autorizzato a girare elevato.

$ErrorActionPreference = 'Stop'
$script = 'C:\Users\teo\TITANIUM_OS\NODES\MENTE_RAG\rag_clean_rebuild.ps1'
$log    = 'C:\Users\teo\TITANIUM_OS\DATA\logs\register_rag_task.log'
"" | Out-File $log
function L($m){ "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $m" | Tee-Object -FilePath $log -Append }

try {
    $action    = New-ScheduledTaskAction -Execute 'powershell.exe' `
                    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$script`""
    $principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" `
                    -LogonType Interactive -RunLevel Highest
    $settings  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries `
                    -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
    Register-ScheduledTask -TaskName 'TI_RagRebuild' -Action $action -Principal $principal `
                    -Settings $settings -Description 'Rebuild pulito RAG ChromaDB (scrittore singolo) — on-demand, elevato' -Force | Out-Null
    L "TI_RagRebuild registrato (RunLevel=Highest). Trigger: schtasks /Run /TN TI_RagRebuild"
} catch {
    L "ERRORE registrazione: $($_.Exception.Message)"
}
