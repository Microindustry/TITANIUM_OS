# fix_tasks_admin.ps1 | TITANIUM_OS | v1.1 | 2026-06-24
# Rimuove restrizioni batteria e abilita WakeToRun su tutti i task TITANIUM
# ESEGUIRE COME AMMINISTRATORE
# v1.1: de-hardcodato (no C:\Users\benen) - root da $PSScriptRoot
$TI = (Resolve-Path "$PSScriptRoot\..\..").Path

$taskPaths = @(
    @{path="\TITANIUM_OS\"; name="TITANIUM_NightPush"},
    @{path="\TITANIUM_OS\"; name="TITANIUM_NightResearch"},
    @{path="\TITANIUM_OS\"; name="TITANIUM_DailyBrief"},
    @{path="\TITANIUM_OS\"; name="TITANIUM_DeepFreeze"},
    @{path="\TITANIUM_OS\"; name="TITANIUM_Watchdog"},
    @{path="\"; name="TITANIUM_OS_StoryAgent"},
    @{path="\"; name="TITANIUM_StartEcosystem"}
)

foreach ($t in $taskPaths) {
    try {
        $task     = Get-ScheduledTask -TaskPath $t.path -TaskName $t.name -ErrorAction Stop
        $settings = New-ScheduledTaskSettingsSet `
            -AllowStartIfOnBatteries `
            -DontStopIfGoingOnBatteries `
            -WakeToRun `
            -StartWhenAvailable `
            -ExecutionTimeLimit (New-TimeSpan -Hours 6)
        Set-ScheduledTask -TaskPath $t.path -TaskName $t.name -Settings $settings | Out-Null
        Write-Host "  [$($t.name)] OK - batteria:OFF  wake:ON" -ForegroundColor Green
    } catch {
        Write-Host "  [$($t.name)] ERRORE: $_" -ForegroundColor Red
    }
}

# Registra task fine-tuning settimanale (domenica 01:00)
Write-Host "`n[ Fine-Tuning ] Registro task domenica 01:00..." -ForegroundColor Cyan
try {
    $action   = New-ScheduledTaskAction -Execute "$TI\AUTOMATIONS\core\night_finetune.bat"
    $trigger  = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "01:00"
    $settings2 = New-ScheduledTaskSettingsSet `
        -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
        -WakeToRun -StartWhenAvailable `
        -ExecutionTimeLimit (New-TimeSpan -Hours 10)
    Register-ScheduledTask `
        -TaskName "TITANIUM_FineTune" -TaskPath "\TITANIUM_OS\" `
        -Action $action -Trigger $trigger -Settings $settings2 `
        -RunLevel Highest -Force | Out-Null
    Write-Host "  [TITANIUM_FineTune] OK - domenica 01:00" -ForegroundColor Green
} catch {
    Write-Host "  [TITANIUM_FineTune] ERRORE: $_" -ForegroundColor Red
}

Write-Host "`nTutto completato. Premi Enter per chiudere."
Read-Host
