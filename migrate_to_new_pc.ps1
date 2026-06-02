# migrate_to_new_pc.ps1 | TITANIUM_OS / SISTEMA / MIGRAZIONE | v1.0 | 2026-06-02
# -----------------------------------------------------------------------------
# Migra TUTTO l'ecosistema TITANIUM_OS dal Getac a un PC fisso via cavo di rete.
# Lanciare QUESTO script SUL PC NUOVO (destinazione), con username 'benen'.
#
# Trasferimento:  cavo ethernet diretto o stessa LAN -> cartella condivisa SMB.
# Modello:        PULL (il PC nuovo tira i dati dal PC vecchio).
#
# USO:
#   1) Sul PC VECCHIO (Getac) -> esegui il blocco "FASE 0" in fondo (condivisione).
#   2) Sul PC NUOVO -> apri PowerShell come utente benen e lancia:
#        powershell -ExecutionPolicy Bypass -File migrate_to_new_pc.ps1 -Source '\\GETAC\benen'
#      (sostituisci GETAC col nome o IP del PC vecchio: es. '\\192.168.137.1\benen')
#
# Niente viene cancellato sul PC vecchio. Robocopy /E ricopia incrementale.
# -----------------------------------------------------------------------------
param(
    [Parameter(Mandatory = $true)]
    [string]$Source,                                   # es. \\GETAC\benen  oppure  \\192.168.1.50\benen
    [string]$DestUser = $env:USERPROFILE,              # di norma C:\Users\benen
    [switch]$IncludeTools,                             # copia anche tools\ (python/node/gh) invece di reinstallare
    [switch]$DryRun                                    # mostra cosa farebbe senza copiare
)

$ErrorActionPreference = 'Stop'
function Say($m){ Write-Host "  $m" -ForegroundColor Cyan }
function Ok($m){ Write-Host "  OK  $m" -ForegroundColor Green }
function Warn($m){ Write-Host "  !!  $m" -ForegroundColor Yellow }

Write-Host "`n=== MIGRAZIONE TITANIUM_OS -> $DestUser ===" -ForegroundColor White
Say "Sorgente: $Source"
if ($DryRun) { Warn "DRY-RUN: nessun file verra' copiato" }

# --- 0. sanity: la sorgente e' raggiungibile? ---
if (-not (Test-Path $Source)) {
    throw "Sorgente '$Source' non raggiungibile. Verifica cavo/rete, condivisione SMB e credenziali (vedi FASE 0 in fondo allo script)."
}
Ok "Sorgente raggiungibile"

# --- 1. alberi da copiare (sorgente relativa a \\PCVECCHIO\benen) ---
# robocopy flags: /E sottocartelle anche vuote, /COPY:DAT dati+attributi+timestamp,
# /R:2 retry, /W:5 attesa, /MT:16 multithread, /NFL /NDL output sintetico, /XJ no junction
$rcFlags = @('/E','/COPY:DAT','/R:2','/W:5','/MT:16','/NFL','/NDL','/NP','/XJ')
if ($DryRun) { $rcFlags += '/L' }

# coppie (sorgente, destinazione). Path relativi alla home benen.
$trees = @(
    @{ name='Repo TITANIUM_OS (codice+git+working tree)'; src='TITANIUM_OS\TITANIUM_OS'; dst='TITANIUM_OS\TITANIUM_OS' },
    @{ name='_VAULT (segreti + backup/bundle)';           src='TITANIUM_OS\_VAULT';      dst='TITANIUM_OS\_VAULT' },
    @{ name='DATA root';                                   src='TITANIUM_OS\DATA';        dst='TITANIUM_OS\DATA' },
    @{ name='WORKSPACE (pre-git)';                         src='TITANIUM_OS\WORKSPACE';   dst='TITANIUM_OS\WORKSPACE' },
    @{ name='Microindustry (dentro TITANIUM_OS)';          src='TITANIUM_OS\Microindustry'; dst='TITANIUM_OS\Microindustry' },
    @{ name='MICROINDUSTRY (MENTE/CAD/FOTO/CONTENT/FIN)';  src='MICROINDUSTRY';           dst='MICROINDUSTRY' },
    @{ name='.claude (settings, MCP, memory)';             src='.claude';                 dst='.claude' }
)
if ($IncludeTools) {
    $trees += @{ name='tools (python311/nodejs/gh/ohmyposh)'; src='tools'; dst='tools' }
}

foreach ($t in $trees) {
    $s = Join-Path $Source $t.src
    $d = Join-Path $DestUser $t.dst
    if (-not (Test-Path $s)) { Warn "salto '$($t.name)': non trovato in sorgente ($s)"; continue }
    Say ">> $($t.name)"
    & robocopy $s $d @rcFlags | Out-Null
    $rc = $LASTEXITCODE
    if ($rc -ge 8) { Warn "robocopy ha segnalato errori (exit $rc) su $($t.name)" }
    else { Ok "$($t.name) (robocopy exit $rc)" }
}

if ($DryRun) { Warn "DRY-RUN finito. Rilancia senza -DryRun per copiare davvero."; return }

# --- 2. variabili d'ambiente utente (PYTHONPATH, MENTE_DIR) ---
Say ">> Variabili d'ambiente utente"
$repo  = Join-Path $DestUser 'TITANIUM_OS\TITANIUM_OS'
$mente = Join-Path $DestUser 'MICROINDUSTRY\MENTE'
[Environment]::SetEnvironmentVariable('PYTHONPATH', $repo,  'User')
[Environment]::SetEnvironmentVariable('MENTE_DIR',  $mente, 'User')
Ok "PYTHONPATH=$repo"
Ok "MENTE_DIR=$mente"

# --- 3. PATH: aggiungi i tool se non gia' presenti ---
$userPath = [Environment]::GetEnvironmentVariable('Path','User')
$toolDirs = @(
    (Join-Path $DestUser 'tools\gh'),
    (Join-Path $DestUser 'tools\python311'),
    (Join-Path $DestUser 'tools\python311\Scripts'),
    (Join-Path $DestUser 'tools\nodejs')
)
$added = @()
foreach ($p in $toolDirs) {
    if ($userPath -notlike "*$p*") { $userPath = "$userPath;$p"; $added += $p }
}
if ($added.Count -gt 0) {
    [Environment]::SetEnvironmentVariable('Path', $userPath, 'User')
    foreach ($a in $added) { Ok "PATH += $a" }
} else { Ok "PATH gia' a posto" }

# --- 4. verifica integrita' git nel repo copiato ---
Say ">> Verifica repo git"
Push-Location $repo
try {
    & git fsck --full 2>&1 | Select-Object -Last 3 | ForEach-Object { Say $_ }
    $unpushed = (& git log origin/main..HEAD --oneline 2>$null | Measure-Object -Line).Lines
    Ok "Repo OK. Commit locali non pushati: $unpushed (attesi ~27)"
} catch { Warn "git non disponibile nel PATH della sessione corrente: riapri PowerShell e rilancia 'git fsck'." }
Pop-Location

# --- 5. verifica episodi (niente perso) ---
Say ">> Verifica episodi CONTENT_ENGINE"
$epDir = Join-Path $repo 'CONTENT_ENGINE\DATABASE\episodes'
if (Test-Path $epDir) {
    $ep  = (Get-ChildItem $epDir -Filter 'EP_*.md' -File).Count
    $mom = (Get-ChildItem (Join-Path $epDir 'MOMENTI') -Filter '*.md' -File -ErrorAction SilentlyContinue).Count
    Ok "Episodi EP_*: $ep  |  MOMENTI: $mom  (attesi: 15 EP + 5 MOM)"
} else { Warn "cartella episodi non trovata: $epDir" }

# --- 6. promemoria post-migrazione ---
Write-Host "`n=== FATTO. Passi finali (manuali) ===" -ForegroundColor White
Warn "1. Riapri PowerShell (per caricare le nuove env)."
Warn "2. Dipendenze Python: cd $repo ; & .\tools... oppure 'python311\python.exe -m pip install -r requirements.txt'"
Warn "3. RAG: NON copiare l'indice ChromaDB vecchio se cambi macchina -> rigeneralo con 'rag-rebuild'"
Warn "4. Claude Code MCP: verifica .claude\settings.json (mcpServers) e ri-autentica le integrazioni se richiesto."
Warn "5. GitHub: il push e' bloccato da model.safetensors (1GB) -> decidere se pulire la history (vedi chat)."
Write-Host ""

# =============================================================================
# FASE 0 — DA ESEGUIRE SUL PC VECCHIO (Getac) PRIMA DI LANCIARE LO SCRIPT
# =============================================================================
# Collega il cavo di rete tra i due PC (o entrambi al router). Poi, in PowerShell
# come amministratore SUL GETAC, condividi la home in sola lettura:
#
#   net share benen="C:\Users\benen" /GRANT:Everyone,READ
#   # trova l'IP del Getac da dare al PC nuovo come -Source \\IP\benen :
#   ipconfig | findstr IPv4
#
# Sul PC NUOVO, se chiede credenziali, usa l'account del Getac:
#   net use \\GETAC\benen /user:GETAC\benen
#
# A migrazione finita, sul Getac rimuovi la condivisione:
#   net share benen /DELETE
# =============================================================================
