"""
========================================================
TITANIUM_OS — SETUP SCRIPT
Modulo    : setup.py
Parte di  : TITANIUM_OS root
Versione  : 1.0.0
Data      : 2026-03-09
Autore    : THEMIS (Titanium Ventures)
========================================================
Input  : nessuno — eseguire una volta sola
Output : struttura cartelle TITANIUM_OS + file di inizializzazione
Eseguire dalla cartella dove si vuole creare TITANIUM_OS.
Esempio: metti setup.py in D:\\ e lancia: python setup.py
========================================================
"""

import os
import json
from datetime import datetime
from pathlib import Path

# ============================================================
# CONFIGURAZIONE — cambia TITANIUM_OS_ROOT se vuoi
# ============================================================
TITANIUM_OS_ROOT = Path(os.path.dirname(os.path.abspath(__file__))) / "TITANIUM_OS"

# ============================================================
# STRUTTURA CARTELLE
# ============================================================
FOLDERS = [
    # BRAIN — cervello del sistema
    "BRAIN",
    "BRAIN/ASSOLUTO",
    "BRAIN/ASSOLUTO/VERSIONS",
    "BRAIN/ASSOLUTO/ATTI",

    # DATA — dati strutturati
    "DATA",

    # VERSIONS — versioning file sistema
    "VERSIONS",
    "VERSIONS/snapshots",

    # AUTOMATIONS — script automazione
    "AUTOMATIONS",
    "AUTOMATIONS/core",
    "AUTOMATIONS/research",
    "AUTOMATIONS/ai",

    # SOURCES — fonti dati grezze
    "SOURCES",
    "SOURCES/youtube",
    "SOURCES/reddit",
    "SOURCES/reports",

    # PILLARS — i 3 pilastri + identity
    "PILLARS",
    "PILLARS/V32",
    "PILLARS/MIMS",
    "PILLARS/GENESIS",
    "PILLARS/VITA_NATURA",
    "PILLARS/IDENTITY",
    "PILLARS/IDENTITY/CV",
    "PILLARS/IDENTITY/LINKEDIN",
    "PILLARS/IDENTITY/SITO",

    # DASHBOARD
    "DASHBOARD",
    "DASHBOARD/app",
    "DASHBOARD/public",
    "DASHBOARD/private",

    # SHARED — cartella condivisa con amico
    "SHARED",
    "SHARED/amico",

    # BACKUPS — backup automatici
    "BACKUPS",

    # INBOX — idee, link, note in arrivo
    "INBOX",
]

# ============================================================
# FILE INIZIALI
# ============================================================

def create_state_json():
    """Crea il file STATE.json iniziale."""
    state = {
        "meta": {
            "created": datetime.now().isoformat(),
            "version": "1.0.0",
            "description": "Stato live del sistema TITANIUM_OS"
        },
        "last_update": datetime.now().isoformat(),
        "active_milestone": "Config G — Rinforzi colonne Z+U",
        "last_action": "Setup iniziale TITANIUM_OS",
        "next_step": "Assemblare rinforzi Config G sulla V32",
        "session_count": 0,
        "pillars": {
            "V32": {
                "status": "in_progress",
                "phase": "Config G rinforzi",
                "pct_complete": 65,
                "next": "Gusset + diagonali + tiranti M10"
            },
            "MIMS": {
                "status": "waiting_press",
                "phase": "Design completo, attende pressa",
                "pct_complete": 30,
                "next": "Acquistare martinetto + resistenze pressa"
            },
            "GENESIS": {
                "status": "building",
                "phase": "TITANIUM_OS setup",
                "pct_complete": 10,
                "next": "Avviare watcher + core automations"
            },
            "VITA_NATURA": {
                "status": "active",
                "phase": "Sito + prenotazioni",
                "pct_complete": 40,
                "next": "EVA WhatsApp bot pilot"
            },
            "IDENTITY": {
                "status": "pending",
                "phase": "Riposizionamento professionale",
                "pct_complete": 20,
                "next": "Aggiornare CV + LinkedIn per ruoli tecnici"
            }
        },
        "milestones": {
            "verified": [
                "Componenti V32 presenti (foto 13 Feb 2026)",
                "8 pezzi interfaccia lavorati (bronzine + scalini)",
                "HMI TP900 Comfort acquisito",
                "Basamento traliccio saldato TIG",
                "Asse X assemblato (guide+vite+servo)"
            ],
            "next": "Rinforzi Config G (gusset + diag + tiranti M10)",
            "target_capannone": "15 Luglio 2030"
        },
        "focus_today": "",
        "blockers": [],
        "ideas_inbox": 0
    }
    return state


def create_claude_md():
    """Crea il CLAUDE.md master — cervello del sistema."""
    content = """# TITANIUM_OS — CLAUDE.md MASTER
*Versione: 1.0.0 | Aggiornato: automaticamente da state_updater.py*

---

## CHI SONO
**Matteo Benenati** — Artigiano industriale + system builder.
- 15+ anni industria: TIG/MIG (titanio MotoGP @ SCProject), robot (ESSEGI), presse idrauliche (DATWLER), QC (LU.VE)
- Attuale: riposizionamento verso ruoli tecnici manageriali / project coordination
- Compagna: Maria → Vita Natura (centro estetico, Boffalora sopra Ticino)
- Amico collaboratore: sviluppa progetti AI paralleli
- Lavoro con: Claude Code + Cursor come ambienti di sviluppo primari
- ADHD probabile: sistema progettato come scaffolding cognitivo, non come reminder

---

## IL SISTEMA
**TITANIUM VENTURES** — 3 pilastri interconnessi + infrastruttura digitale

| Pilastro | Descrizione | Status |
|----------|-------------|--------|
| **V32** | CNC 3 assi precision, 178kg, ±0.019mm, PLC Siemens S7-314C | In costruzione |
| **MIMS** | Micro Industry Modulo System — protocollo fisico modulare | Design OK, attende pressa |
| **GENESIS** | Infrastruttura digitale: EVA + AVA + automazioni | In build |

---

## LE 10 REGOLE (non negoziabili)
1. Niente è finito — ogni progetto è una versione
2. Tutto si connette — nessun silo
3. Documenta mentre costruisci
4. Scala organicamente
5. Automatizza il ripetitivo
6. Costruisci ciò che usi (meta-ricorsività)
7. Insegna ciò che impari
8. Proteggi il sapere
9. Reinvesti sempre (60% margine Y1)
10. Libertà sopra profitto

---

## MILESTONE VERIFICATE (Feb 2026)
- ✅ BOM V32 completo + foto
- ✅ 8 pezzi interfaccia (bronzine + scalini)
- ✅ HMI TP900 Comfort 9" acquisito
- ✅ Basamento saldato TIG
- ✅ Asse X assemblato

## PROSSIMA MILESTONE
🔴 **Config G** — Rinforzi colonne Z+U (gusset 200mm + diagonali + tiranti M10 micrometrici)

---

## PERSONAGGI AI
- **THEMIS** — Esecuzione tecnica, analisi, codifica (attivo ora)
- **EVA** — Business automation (in sviluppo)
- **AVA** — YouTube avatar traduttore empatico (pianificato)
- ARIA, NEXUS, TESLA, FORGE — futuri

---

## REGOLA CODICE (sempre)
Ogni file: header con modulo/parte di/versione/data + docstring con input/output + commenti inline su ogni step logico non ovvio.

---

## COME USARE QUESTO FILE
Carica questo file all'inizio di ogni sessione Claude Code.
Poi leggi STATE.json per il contesto live.
Poi esegui il task specificato.

---
*Questo file è gestito parzialmente da state_updater.py — non modificare le sezioni AUTO-GENERATED.*
"""
    return content


def create_rules_md():
    """BOOTSTRAP SOLTANTO — usato solo se BRAIN/RULES.md non esiste (macchina nuova).
    La fonte unica delle regole e' CLAUDE.md; RULES.md si deriva con
    AUTOMATIONS/tools/sync_regole.py. Questa lista e' ferma alla versione a 10 regole
    del 02/06 e NON va aggiornata qui: si aggiorna CLAUDE.md e si rilancia il sync."""
    content = """# LE 10 REGOLE DELL'ECOSISTEMA
*Vincoli operativi — ogni decisione viene filtrata qui*

---

## 1. Niente è finito
Ogni progetto è una versione. V32 → Mk1 → Mk2. MIMS → 2.0 → 3.0.
**Azione**: rilascia versioni funzionanti, migliora iterativamente.

## 2. Tutto si connette
Ogni skill nutre le altre. Saldatura MotoGP → basamento V32. Python EVA → automazioni MIMS.
**Azione**: cerca attivamente le connessioni tra skill diverse.

## 3. Documenta mentre costruisci
Il processo È il contenuto. Foto, note, screenshot: sempre in tempo reale.
**Azione**: camera sempre pronta, note in tempo reale.

## 4. Scala organicamente
Non forzare la crescita. Ogni espansione finanziata dal cash flow.
**Azione**: zero investitori fino a prodotto validato.

## 5. Automatizza il ripetitivo
Se fai qualcosa più di 3 volte → scrivi uno script.
**Azione**: lista settimanale attività ripetitive da automatizzare.

## 6. Costruisci ciò che usi
MIMS nasce da esigenze reali. V32 costruita CON MIMS.
**Azione**: il primo cliente di ogni prodotto sei tu.

## 7. Insegna ciò che impari
YouTube forza la chiarezza. Effetto Feynman.
**Azione**: ogni concetto tecnico → video o post.

## 8. Proteggi il sapere
Trade secret su ricette polimero. Brevetti pianificati.
**Azione**: pubblica il "cosa" e il "perché", MAI il "come esattamente".

## 9. Reinvesti sempre
60% del margine nel primo anno torna nel sistema.
**Azione**: budget reinvestimento fisso su ogni entrata.

## 10. Libertà sopra profitto
Il capannone è il goal. I soldi sono il mezzo.
**Azione**: ogni decisione: "Questo mi avvicina o allontana dal capannone?"

---
*Target: 15 Luglio 2030 — Matteo Benenati, 35 anni: LIBERO.*
"""
    return content


def create_projects_json():
    """Crea DATA/projects.json iniziale."""
    projects = {
        "meta": {"last_update": datetime.now().isoformat()},
        "projects": [
            {
                "id": "V32",
                "name": "Titanium V32 CNC",
                "status": "in_progress",
                "priority": 1,
                "investment_needed": 2250,
                "investment_done": 0,
                "bep_hours": 61,
                "revenue_y1": 9500,
                "notes": "Manca: mandrino 2.2kW, VFD, vite 1605 Y, BK12/BF12, quadro IP54"
            },
            {
                "id": "MIMS",
                "name": "MIMS Platform",
                "status": "waiting_press",
                "priority": 2,
                "investment_needed": 500,
                "investment_done": 0,
                "notes": "Attende pressa 4 colonne operativa"
            },
            {
                "id": "GENESIS",
                "name": "GENESIS Digital / EVA",
                "status": "building",
                "priority": 3,
                "investment_needed": 50,
                "investment_done": 0,
                "notes": "TITANIUM_OS in build — Fase 1 core automations"
            },
            {
                "id": "VITA_NATURA",
                "name": "Vita Natura — EVA Pilot",
                "status": "active",
                "priority": 4,
                "notes": "WordPress + Amelia/SimplyBook + WhatsApp bot"
            }
        ]
    }
    return projects


def create_milestones_json():
    """Crea DATA/milestones.json."""
    milestones = {
        "meta": {"last_update": datetime.now().isoformat()},
        "milestones": [
            {"id": 1, "date": "2026-02", "name": "Componenti V32 presenti", "status": "VERIFICATO"},
            {"id": 2, "date": "2026-02", "name": "8 pezzi interfaccia lavorati", "status": "VERIFICATO"},
            {"id": 3, "date": "2026-02", "name": "HMI TP900 acquisito", "status": "VERIFICATO"},
            {"id": 4, "date": "2026-02", "name": "Basamento saldato TIG", "status": "VERIFICATO"},
            {"id": 5, "date": "2026-02", "name": "Asse X assemblato", "status": "VERIFICATO"},
            {"id": 6, "date": "2026-Q1", "name": "Rinforzi Config G", "status": "PROSSIMO"},
            {"id": 7, "date": "2026-Q2", "name": "Epoxy Granite fill + YouTube Ep.01", "status": "PIANIFICATO"},
            {"id": 8, "date": "2026-Q2", "name": "Colonne Z+U definitive", "status": "PIANIFICATO"},
            {"id": 9, "date": "2026-Q2", "name": "Primo video YouTube", "status": "PIANIFICATO"},
            {"id": 10, "date": "2026-Q3", "name": "Pressa 4 colonne operativa", "status": "PIANIFICATO"},
            {"id": 11, "date": "2026-Q3", "name": "V32 assemblaggio completo", "status": "PIANIFICATO"},
            {"id": 12, "date": "2026-Q4", "name": "EVA pilot Vita Natura", "status": "PIANIFICATO"},
            {"id": 13, "date": "2027-Q1", "name": "V32 operativa — primo pezzo H7", "status": "TARGET"},
            {"id": 14, "date": "2027-Q2", "name": "Primi stampi MIMS (20 tiles)", "status": "TARGET"},
            {"id": 15, "date": "2027-Q4", "name": "YouTube 1.000 iscritti", "status": "TARGET"},
            {"id": 20, "date": "2030-07-15", "name": "CAPANNONE OPERATIVO — LIBERO", "status": "OBIETTIVO"}
        ]
    }
    return milestones


def create_links_inbox():
    """Crea il file links_inbox.txt con istruzioni."""
    content = """# LINKS INBOX — TITANIUM_OS
# Aggiunge qui i link da analizzare. Uno per riga.
# Automation #5 (link_analyzer.py) li processerà automaticamente.
# Formato: URL  oppure  URL | nota opzionale
#
# Esempio:
# https://github.com/qualcosa | tool interessante per GENESIS
# https://youtube.com/watch?v=... | tutorial Python watcher
#
"""
    return content


def create_ai_sources():
    """Crea il file ai_sources.txt per l'automazione #21."""
    content = """# AI INTELLIGENCE SOURCES — per Automation #21 (ai_intelligence_updater.py)
# Sorgenti monitorate per nuovi pattern, tool, tecniche AI
# Formato: URL | tipo | frequenza_check | note

# === GITHUB ===
https://github.com/hesreallyhim/awesome-claude-code | github | weekly | Claude Code tips
https://github.com/travisvn/awesome-claude-skills | github | weekly | Claude Skills
https://github.com/wshobson/agents | github | weekly | 112 agenti specializzati
https://github.com/anthropics/anthropic-cookbook | github | weekly | Anthropic official examples
https://github.com/anthropics/claude-code | github | weekly | Claude Code updates

# === YOUTUBE CANALI ===
# Igor Pogany — The AI Advantage (practical Claude workflows)
https://www.youtube.com/@theaiadvantage | youtube | weekly | Claude + Cursor workflows
# AI Foundations (n8n, automazioni)
https://www.youtube.com/@AIFoundations | youtube | weekly | automation tutorials
# Ondrej (Claude AI agents)
https://www.youtube.com/@OndrejAI | youtube | weekly | Claude agents pratici

# === REDDIT ===
https://www.reddit.com/r/ClaudeAI/ | reddit | daily | Claude updates e tips
https://www.reddit.com/r/LocalLLaMA/ | reddit | weekly | LLM tools
https://www.reddit.com/r/MachineLearning/ | reddit | weekly | ML advances

# === BLOG / NEWS ===
https://www.anthropic.com/news | web | weekly | Anthropic updates ufficiali
https://docs.anthropic.com | web | weekly | Docs aggiornamenti
https://news.ycombinator.com | web | daily | HackerNews AI threads

# === FORUM MAKER / INDUSTRIALE ===
https://www.cnczone.com | web | monthly | CNC community
https://forum.makerforums.info | web | monthly | Maker community
"""
    return content


def create_requirements_txt():
    """Crea requirements.txt per le automazioni Python."""
    content = """# TITANIUM_OS — Python Dependencies
# Installa con: pip install -r requirements.txt

# File system watching (Automation #1 — watcher)
watchdog>=4.0.0

# Scheduling jobs (per automazioni periodiche)
schedule>=1.2.0

# Requests HTTP (per scraper/research automations)
requests>=2.31.0

# Beautiful Soup (HTML parsing per scraper)
beautifulsoup4>=4.12.0

# YouTube data (Automation #6)
yt-dlp>=2024.1.0

# Rich — output console colorato e leggibile
rich>=13.0.0

# Python-dotenv — gestione .env secrets
python-dotenv>=1.0.0

# Anthropic SDK — per Claude API calls
anthropic>=0.40.0
"""
    return content


def create_start_bat():
    """Crea START_TITANIUM_OS.bat per avvio Windows."""
    content = """@echo off
:: ========================================================
:: TITANIUM_OS — AVVIO SISTEMA WINDOWS
:: File    : START_TITANIUM_OS.bat
:: Versione: 1.0.0
:: Data    : 2026-03-09
:: ========================================================
:: Avvia il watcher in background (senza finestra visibile)
:: Per aggiungere all'avvio automatico di Windows:
:: 1. Win+R -> shell:startup
:: 2. Copia questo .bat nella cartella che si apre
:: ========================================================

title TITANIUM_OS — Sistema Attivo

:: Path al watcher — modifica se necessario
set WATCHER_PATH=%~dp0AUTOMATIONS\\core\\watcher.py

:: Controlla che Python sia installato
python --version > nul 2>&1
if errorlevel 1 (
    echo ERRORE: Python non trovato. Installa Python dal sito python.org
    pause
    exit /b 1
)

:: Avvia watcher in background (nascosto)
echo [TITANIUM_OS] Avvio watcher in background...
start /B pythonw "%WATCHER_PATH%"

echo [TITANIUM_OS] Sistema attivo. Watcher in esecuzione.
echo [TITANIUM_OS] Per fermare: Task Manager ^> pythonw.exe ^> Termina
timeout /t 3 > nul
"""
    return content


def create_stop_bat():
    """Crea STOP_TITANIUM_OS.bat."""
    content = """@echo off
:: ========================================================
:: TITANIUM_OS — STOP SISTEMA
:: ========================================================
echo [TITANIUM_OS] Fermo il watcher...
taskkill /F /IM pythonw.exe /T > nul 2>&1
echo [TITANIUM_OS] Sistema fermato.
pause
"""
    return content


def create_gitignore():
    """Crea .gitignore."""
    content = """# TITANIUM_OS — .gitignore
BACKUPS/
*.pyc
__pycache__/
.env
*.log
VERSIONS/snapshots/
"""
    return content


# ============================================================
# MAIN — esecuzione setup
# ============================================================
def main():
    """Esegue il setup completo di TITANIUM_OS."""

    print("\n" + "="*60)
    print("  TITANIUM_OS — SETUP v1.0.0")
    print("  Titanium Ventures — THEMIS")
    print("="*60 + "\n")

    # 1. Crea cartelle
    print("[1/4] Creazione struttura cartelle...")
    for folder in FOLDERS:
        folder_path = TITANIUM_OS_ROOT / folder
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"  ✓ {folder}")

    # 2. Crea file BRAIN
    print("\n[2/4] Creazione file BRAIN...")

    # STATE.json
    state_path = TITANIUM_OS_ROOT / "BRAIN" / "STATE.json"
    with open(state_path, "w", encoding="utf-8") as f:
        json.dump(create_state_json(), f, indent=2, ensure_ascii=False)
    print("  ✓ BRAIN/STATE.json")

    # CLAUDE.md
    claude_path = TITANIUM_OS_ROOT / "BRAIN" / "CLAUDE.md"
    with open(claude_path, "w", encoding="utf-8") as f:
        f.write(create_claude_md())
    print("  ✓ BRAIN/CLAUDE.md")

    # RULES.md — NON si sovrascrive piu' (#70, 16/08/2026).
    # Dal 16/08 RULES.md e' DERIVATO da CLAUDE.md via AUTOMATIONS/tools/sync_regole.py:
    # questo blocco lo riscriveva con la lista vecchia a 10 regole ed e' la ragione per
    # cui esistevano due liste divergenti. Qui resta solo il bootstrap su macchina nuova.
    rules_path = TITANIUM_OS_ROOT / "BRAIN" / "RULES.md"
    if rules_path.exists():
        print("  - BRAIN/RULES.md gia' presente: NON toccato "
              "(e' derivato — rigeneralo con AUTOMATIONS/tools/sync_regole.py)")
    else:
        with open(rules_path, "w", encoding="utf-8") as f:
            f.write(create_rules_md())
        print("  ✓ BRAIN/RULES.md (bootstrap — poi passa a sync_regole.py)")

    # 3. Crea file DATA
    print("\n[3/4] Creazione file DATA...")

    projects_path = TITANIUM_OS_ROOT / "DATA" / "projects.json"
    with open(projects_path, "w", encoding="utf-8") as f:
        json.dump(create_projects_json(), f, indent=2, ensure_ascii=False)
    print("  ✓ DATA/projects.json")

    milestones_path = TITANIUM_OS_ROOT / "DATA" / "milestones.json"
    with open(milestones_path, "w", encoding="utf-8") as f:
        json.dump(create_milestones_json(), f, indent=2, ensure_ascii=False)
    print("  ✓ DATA/milestones.json")

    # Contacts + market_data (vuoti iniziali)
    for fname in ["contacts.json", "market_data.json"]:
        fpath = TITANIUM_OS_ROOT / "DATA" / fname
        with open(fpath, "w", encoding="utf-8") as f:
            json.dump({"meta": {"created": datetime.now().isoformat()}, "data": []}, f, indent=2)
        print(f"  ✓ DATA/{fname}")

    # 4. Crea file root
    print("\n[4/4] Creazione file root...")

    # VERSIONS/changelog.md
    changelog_path = TITANIUM_OS_ROOT / "VERSIONS" / "changelog.md"
    with open(changelog_path, "w", encoding="utf-8") as f:
        f.write(f"# TITANIUM_OS — CHANGELOG\n\n")
        f.write(f"## {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"- [SETUP] Setup iniziale TITANIUM_OS v1.0.0 completato\n\n")
    print("  ✓ VERSIONS/changelog.md")

    # VERSIONS/diff_log.json
    diff_path = TITANIUM_OS_ROOT / "VERSIONS" / "diff_log.json"
    with open(diff_path, "w", encoding="utf-8") as f:
        json.dump({"events": []}, f, indent=2)
    print("  ✓ VERSIONS/diff_log.json")

    # SOURCES files
    for fname, content_fn in [
        ("links_inbox.txt", create_links_inbox),
        ("ai_sources.txt", create_ai_sources),
    ]:
        fpath = TITANIUM_OS_ROOT / "SOURCES" / fname
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content_fn())
        print(f"  ✓ SOURCES/{fname}")

    # requirements.txt
    req_path = TITANIUM_OS_ROOT / "requirements.txt"
    with open(req_path, "w", encoding="utf-8") as f:
        f.write(create_requirements_txt())
    print("  ✓ requirements.txt")

    # .bat files
    start_bat_path = TITANIUM_OS_ROOT / "START_TITANIUM_OS.bat"
    with open(start_bat_path, "w", encoding="utf-8") as f:
        f.write(create_start_bat())
    print("  ✓ START_TITANIUM_OS.bat")

    stop_bat_path = TITANIUM_OS_ROOT / "STOP_TITANIUM_OS.bat"
    with open(stop_bat_path, "w", encoding="utf-8") as f:
        f.write(create_stop_bat())
    print("  ✓ STOP_TITANIUM_OS.bat")

    # .gitignore
    gitignore_path = TITANIUM_OS_ROOT / ".gitignore"
    with open(gitignore_path, "w", encoding="utf-8") as f:
        f.write(create_gitignore())
    print("  ✓ .gitignore")

    # ============================================================
    # SUMMARY
    # ============================================================
    print("\n" + "="*60)
    print("  SETUP COMPLETATO")
    print("="*60)
    print(f"\n  Cartella: {TITANIUM_OS_ROOT}")
    print("\n  PROSSIMI STEP:")
    print("  1. cd TITANIUM_OS")
    print("  2. pip install -r requirements.txt")
    print("  3. Copia i file AUTOMATIONS/ (watcher.py, backup.py, ecc.)")
    print("  4. Avvia: START_TITANIUM_OS.bat")
    print("\n  Il sistema è pronto per ricevere le automazioni core.\n")


if __name__ == "__main__":
    main()
