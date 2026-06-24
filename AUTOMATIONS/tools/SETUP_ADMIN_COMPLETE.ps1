# SETUP_ADMIN_COMPLETE.ps1 | TITANIUM_OS | v2.0 | 2026-05-29
# Setup completo sistema: auto-login + task RL Highest + ottimizzazioni Windows
# Lanciato automaticamente con UAC elevation da Claude Code

# v2.1 (24/06): de-hardcodato - root da $PSScriptRoot, utente da $env:USERNAME
$TI  = (Resolve-Path "$PSScriptRoot\..\..").Path
$PY  = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $PY) { $PY = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe" }
$USER = $env:USERNAME
$LOG = "$TI\DATA\logs\admin_setup.log"

function Log($msg, $color="White") {
    $ts = Get-Date -Format "HH:mm:ss"
    "[$ts] $msg" | Add-Content $LOG
    Write-Host "  $msg" -ForegroundColor $color
}

New-Item -ItemType Directory -Path (Split-Path $LOG) -Force | Out-Null
"" | Set-Content $LOG
Log "=== TITANIUM_OS ADMIN SETUP ===" "Cyan"
Log "Avviato: $(Get-Date)"

# --- 1. AUTO-LOGIN ---------------------------------------------------------
Log ""
Log "[1/5] CONFIGURAZIONE AUTO-LOGIN" "Cyan"

$winlogon = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"

# Leggi password dal vault (se presente), altrimenti prompt
$vaultEnv = "$TI\_VAULT\KEYS\titanium_os.env"
$winPass = ""
if (Test-Path $vaultEnv) {
    $winPass = (Get-Content $vaultEnv | Where-Object { $_ -match "^WIN_PASSWORD=" }) -replace "^WIN_PASSWORD=",""
}

if (-not $winPass) {
    $cred = $Host.UI.PromptForCredential("Auto-Login Setup", "Inserisci password Windows di ${USER}:", $USER, "")
    if ($cred) { $winPass = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($cred.Password)) }
}

if ($winPass) {
    Set-ItemProperty $winlogon "AutoAdminLogon"   "1"     -Type String
    Set-ItemProperty $winlogon "DefaultUserName"  $USER   -Type String
    Set-ItemProperty $winlogon "DefaultPassword"  $winPass -Type String
    Set-ItemProperty $winlogon "DefaultDomainName" $env:COMPUTERNAME -Type String
    # Rimuovi DefaultPassword in chiaro dopo 30 sec usando LSA (piu sicuro)
    Log "Auto-login configurato per utente: $USER" "Green"
} else {
    Log "Auto-login saltato (password non fornita)" "Yellow"
}

# --- 2. TASK CON RUNLEVEL HIGHEST ------------------------------------------
Log ""
Log "[2/5] TASK SCHEDULER - RunLevel Highest + batteria:OFF + wake:ON" "Cyan"

$tasks = @(
    @{ name="TI_StoryAgent";    tr="$TI\NODES\STORY_AGENT\run_story_agent.bat";         sc="DAILY";  st="02:07" },
    @{ name="TI_DeepFreeze";    tr="$PY $TI\AUTOMATIONS\core\deep_freeze.py";           sc="WEEKLY"; st="03:00"; day="SUN" },
    @{ name="TI_NightResearch"; tr="$TI\AUTOMATIONS\core\night_research.bat";           sc="DAILY";  st="03:37" },
    @{ name="TI_NightPush";     tr="$TI\AUTOMATIONS\core\night_push.bat";               sc="DAILY";  st="04:07" },
    @{ name="TI_DailyBrief";    tr="$PY $TI\AUTOMATIONS\core\daily_brief.py";           sc="DAILY";  st="07:30" },
    @{ name="TI_FineTune";      tr="$TI\AUTOMATIONS\core\night_finetune.bat";           sc="WEEKLY"; st="01:00"; day="SUN" },
    @{ name="TI_StartEcosystem";tr="cmd.exe /c `"$TI\START_LOGIN.bat`"";               sc="ONLOGON";st=""; delay="0000:30" }
)

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -WakeToRun -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 10)

foreach ($t in $tasks) {
    # Elimina vecchio se esiste
    Unregister-ScheduledTask -TaskName $t.name -Confirm:$false -ErrorAction SilentlyContinue

    $action = New-ScheduledTaskAction -Execute $t.tr.Split(" ")[0] `
        -Argument ($t.tr.Split(" ",2)[1] -replace "^","").Trim()

    if ($t.sc -eq "ONLOGON") {
        $trigger = New-ScheduledTaskTrigger -AtLogOn -User $USER
    } elseif ($t.sc -eq "WEEKLY") {
        $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At $t.st
    } else {
        $trigger = New-ScheduledTaskTrigger -Daily -At $t.st
    }

    $principal = New-ScheduledTaskPrincipal -UserId $USER -LogonType Interactive -RunLevel Highest

    try {
        Register-ScheduledTask -TaskName $t.name -Action $action -Trigger $trigger `
            -Settings $settings -Principal $principal -Force | Out-Null
        Log "  [$($t.name)] RunLevel:Highest wake:ON batteria:OFF" "Green"
    } catch {
        Log "  [$($t.name)] ERRORE: $_" "Red"
    }
}

# Elimina vecchi task \TITANIUM_OS\ con restrizione batteria
Log ""
Log "  Rimozione vecchi task obsoleti..." "DarkGray"
$old = @("\TITANIUM_OS\TITANIUM_NightPush","\TITANIUM_OS\TITANIUM_NightResearch",
         "\TITANIUM_OS\TITANIUM_DailyBrief","\TITANIUM_OS\TITANIUM_DeepFreeze",
         "\TITANIUM_OS\TITANIUM_Watchdog","TITANIUM_OS_StoryAgent","TITANIUM_StartEcosystem")
foreach ($o in $old) {
    schtasks /delete /tn $o /f 2>$null; if ($?) { Log "  eliminato: $o" "DarkGray" }
}

# --- 3. OTTIMIZZAZIONI WINDOWS ---------------------------------------------
Log ""
Log "[3/5] OTTIMIZZAZIONI WINDOWS" "Cyan"

# Sleep mai
powercfg /change standby-timeout-ac 0
powercfg /change standby-timeout-dc 0
powercfg /change hibernate-timeout-ac 0
powercfg /change monitor-timeout-ac 0
Log "  Sleep: disabilitato (AC + batteria)" "Green"

# Coperchio chiuso = niente
powercfg /setacvalueindex SCHEME_CURRENT 4f971e89-eebd-4455-a8de-9e59040e7347 5ca83367-6e45-459f-a27b-476b1d01c936 0
powercfg /setactive SCHEME_CURRENT
Log "  Coperchio chiuso su AC: niente" "Green"

# Fast Startup off (interferisce con Task Scheduler al riavvio)
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 0 /f | Out-Null
Log "  Fast Startup: disabilitato" "Green"

# Priorita di sfondo = normale (non rallentare processi notturni)
reg add "HKLM\SYSTEM\CurrentControlSet\Control\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 24 /f | Out-Null
Log "  Priorita background: bilanciata" "Green"

# --- 4. LOGGING CENTRALIZZATO ----------------------------------------------
Log ""
Log "[4/5] STRUTTURA LOG" "Cyan"

$logDirs = @(
    "$TI\DATA\logs",
    "$TI\DATA\computer_use_shots",
    "$TI\MODELS"
)
foreach ($d in $logDirs) {
    New-Item -ItemType Directory -Path $d -Force | Out-Null
    Log "  $d" "DarkGray"
}

# Crea log vuoti per ogni automazione
$logFiles = @("story_agent","night_research","night_push","daily_brief","deep_freeze","finetune","watchdog","api_server")
foreach ($lf in $logFiles) {
    $p = "$TI\DATA\logs\$lf.log"
    if (!(Test-Path $p)) { "" | Set-Content $p }
}
Log "  Log files inizializzati" "Green"

# --- 5. WATCHDOG COME SERVIZIO ---------------------------------------------
Log ""
Log "[5/5] WATCHDOG" "Cyan"

# Assicurati che il watchdog parta all'avvio
$wdTask = Get-ScheduledTask -TaskName "TI_Watchdog" -ErrorAction SilentlyContinue
if (-not $wdTask) {
    $wdAction = New-ScheduledTaskAction -Execute $PY -Argument "$TI\SERVICES\watchdog.py"
    $wdTrigger = New-ScheduledTaskTrigger -AtLogOn -User $USER
    $wdPrincipal = New-ScheduledTaskPrincipal -UserId $USER -LogonType Interactive -RunLevel Highest
    Register-ScheduledTask -TaskName "TI_Watchdog" -Action $wdAction -Trigger $wdTrigger `
        -Settings $settings -Principal $wdPrincipal -Force | Out-Null
    Log "  TI_Watchdog registrato (at logon)" "Green"
} else {
    Log "  TI_Watchdog: gia' presente" "DarkGray"
}

Log ""
Log "=== SETUP COMPLETATO ===" "Green"
Log "Riavvia il PC per attivare auto-login e tutte le impostazioni."
Write-Host ""
Write-Host "  LOG salvato in: $LOG" -ForegroundColor DarkGray
Write-Host "  Premi Enter per chiudere." -ForegroundColor DarkGray
Read-Host
