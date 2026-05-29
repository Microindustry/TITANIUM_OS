# generate_functions_list.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-05-28
# Genera FUNZIONI_SISTEMA.txt sul Desktop — aggiornato a ogni chiusura sessione Claude

import json
import os
import re
from pathlib import Path
from datetime import datetime

TI_ROOT  = Path(__file__).resolve().parents[2]
DESKTOP  = Path.home() / "OneDrive" / "Desktop"
OUT      = DESKTOP / "FUNZIONI_SISTEMA.txt"
PROFILE  = Path.home() / "OneDrive" / "Music" / "Documents" / "WindowsPowerShell" / "Microsoft.PowerShell_profile.ps1"
AGENTS_DB = TI_ROOT / "NODES" / "AGENTS" / "agents_db.json"
MENTE    = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))


# ── parser profilo PS ─────────────────────────────────────────────────────────

def parse_ps_functions(profile: Path) -> list[dict]:
    if not profile.exists():
        return []
    text = profile.read_text(encoding="utf-8", errors="replace")
    funcs = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # Commento sopra la funzione
        comment = ""
        if line.startswith("#") and i + 1 < len(lines) and lines[i+1].strip().startswith("function"):
            comment = line.lstrip("# ").strip()
            i += 1
            line = lines[i].strip()
        m = re.match(r'^function\s+(\S+)\s*\{?(.*)', line)
        if m:
            name = m.group(1)
            # Raccogli parametri se ci sono
            params = []
            body_lines = []
            j = i + 1
            while j < len(lines) and not re.match(r'^function\s+', lines[j].strip()):
                l = lines[j].strip()
                if l.startswith("param(") or "Mandatory=$true" in l or "[string]$" in l or "[switch]$" in l:
                    params.append(l)
                body_lines.append(l)
                if l == "}" and not any(c in "".join(body_lines[:-1]) for c in ["{"]):
                    break
                j += 1
            # Estrai descrizione dal corpo (prima Write-Host o commento)
            desc = comment
            if not desc:
                for bl in body_lines[:3]:
                    if bl.startswith("#"):
                        desc = bl.lstrip("# ").strip()
                        break
            funcs.append({"name": name, "desc": desc, "params": params[:3]})
        i += 1
    return funcs


# ── parser alias PS ───────────────────────────────────────────────────────────

def parse_ps_aliases(profile: Path) -> list[tuple]:
    if not profile.exists():
        return []
    text = profile.read_text(encoding="utf-8", errors="replace")
    aliases = []
    for m in re.finditer(r'Set-Alias\s+-Name\s+(\S+)\s+-Value\s+"([^"]+)"', text):
        name, target = m.group(1), m.group(2)
        short_target = Path(target).name if "\\" in target else target
        aliases.append((name, short_target))
    return aliases


# ── agenti dal DB ─────────────────────────────────────────────────────────────

def load_agents() -> list[dict]:
    if not AGENTS_DB.exists():
        return []
    with open(AGENTS_DB, encoding="utf-8") as f:
        data = json.load(f)
    return [
        {"key": k, "name": v["name"], "emoji": v.get("emoji",""),
         "role": v["role"], "active": v.get("active", True),
         "tags": ", ".join(v.get("tags", [])[:4])}
        for k, v in data["agents"].items()
    ]


# ── script Python in AUTOMATIONS ─────────────────────────────────────────────

def list_automations() -> list[dict]:
    scripts = []
    for d in sorted((TI_ROOT / "AUTOMATIONS").rglob("*.py")):
        if "__pycache__" in str(d) or d.name.startswith("_"):
            continue
        # Leggi header (prima riga con #)
        try:
            first = d.read_text(encoding="utf-8", errors="replace").splitlines()
            header = next((l.lstrip("# ").strip() for l in first[:3] if l.startswith("#") and "|" in l), "")
            desc   = next((l.lstrip("# ").strip() for l in first[:5] if l.startswith("#") and "|" not in l and len(l) > 5), "")
        except Exception:
            header, desc = "", ""
        rel = d.relative_to(TI_ROOT)
        scripts.append({"path": str(rel), "header": header, "desc": desc})
    return scripts


# ── nodi NODES/ ──────────────────────────────────────────────────────────────

def list_nodes() -> list[dict]:
    nodes_dir = TI_ROOT / "NODES"
    if not nodes_dir.exists():
        return []
    result = []
    for node_dir in sorted(nodes_dir.iterdir()):
        if node_dir.is_dir() and not node_dir.name.startswith("_") and node_dir.name != "__pycache__":
            scripts = list(node_dir.glob("*.py"))
            main_script = scripts[0].name if scripts else "—"
            result.append({"name": node_dir.name, "script": main_script, "files": len(scripts)})
    return result


# ── API endpoints ─────────────────────────────────────────────────────────────

API_ENDPOINTS = [
    ("GET",  "/api/health",              "Stato API server"),
    ("GET",  "/api/state",               "Legge STATE.json completo"),
    ("PATCH","/api/state",               "Aggiorna campi STATE.json"),
    ("POST", "/api/scan",                "Trigger scan MENTE/ (MENTE_WATCHER)"),
    ("GET",  "/api/rag/status",          "Stato RAG (chunk count, ultimo rebuild)"),
    ("POST", "/api/rag/rebuild",         "Avvia rebuild RAG ChromaDB in background"),
    ("GET",  "/api/daily-brief",         "Legge ultimo daily brief"),
    ("POST", "/api/daily-brief",         "Genera nuovo daily brief"),
    ("GET",  "/api/media/<path>",        "Serve immagine o PDF inline"),
    ("GET",  "/api/photos",              "Lista foto con URL servibili"),
    ("GET",  "/api/pdfs",                "Lista PDF in MENTE/ con URL"),
    ("GET",  "/api/programs",            "Lista programmi lanciabili"),
    ("POST", "/api/programs/<name>/run", "Lancia programma per nome"),
]

RESEARCH_SOURCES = [
    ("openalex",         "250M paper open access (ex Microsoft Academic)"),
    ("semantic_scholar", "250M paper con abstract strutturati"),
    ("arxiv",            "Preprint tecnici/scientifici"),
    ("core_ac",          "200M paper full-text open access"),
    ("theses_fr",        "Tesi dottorali universitarie europee"),
    ("dart_europe",      "1.3M tesi universitarie EU"),
    ("openlibrary",      "Libri tecnici open access (Internet Archive)"),
    ("doaj",             "Articoli peer-reviewed open access"),
    ("baidu_scholar",    "400M+ paper cinesi — forte su CNC, manifattura"),
    ("cnki",             "60M paper CNKI — più grande DB accademico cinese"),
    ("github",           "Repository open source — CNC, RAG, automazione"),
    ("base",             "300M+ doc accademici incl. repository italiani (Bielefeld)"),
    ("politesi",         "Tesi Politecnico Milano — meccanica, manifattura, meccatronica"),
]

RESEARCH_PRESETS = [
    ("ITA",      "politesi, base, dart_europe, theses_fr, doaj"),
    ("CNC",      "openalex, arxiv, baidu_scholar, cnki, github, politesi"),
    ("V32",      "openalex, arxiv, semantic_scholar, baidu_scholar, base"),
    ("MIMS",     "openalex, arxiv, baidu_scholar, politesi, base"),
    ("AI",       "arxiv, semantic_scholar, openalex, github"),
    ("brevetti", "base, openalex, semantic_scholar"),
]


# ── formattazione ─────────────────────────────────────────────────────────────

def section(title: str, width: int = 70) -> str:
    return f"\n{'═' * width}\n  {title.upper()}\n{'═' * width}\n"


def generate() -> str:
    now      = datetime.now().strftime("%Y-%m-%d %H:%M")
    funcs    = parse_ps_functions(PROFILE)
    aliases  = parse_ps_aliases(PROFILE)
    agents   = load_agents()
    scripts  = list_automations()
    nodes    = list_nodes()

    lines = []
    lines.append(f"FUNZIONI SISTEMA — TITANIUM_OS / MICROINDUSTRY")
    lines.append(f"{'═' * 70}")
    lines.append(f"  Generato: {now}  |  File: {OUT.name}")
    lines.append(f"  Aggiornato automaticamente alla chiusura di ogni sessione Claude.")
    lines.append(f"  Per aggiornare manualmente: update-funzioni (PS) o update-restart")

    # ── navigazione ──
    lines.append(section("NAVIGAZIONE — cd rapidi (PowerShell)"))
    nav = [
        ("ti",      "→ TITANIUM_OS/TITANIUM_OS/   (codice)"),
        ("tiv",     "→ TITANIUM_OS/_VAULT/         (secrets)"),
        ("tirepo",  "→ TITANIUM_OS/                (root repo)"),
        ("tiw",     "→ TITANIUM_OS/WORKSPACE/"),
        ("mi",      "→ MICROINDUSTRY/"),
        ("mente",   "→ MICROINDUSTRY/MENTE/         (knowledge base)"),
        ("cad",     "→ MICROINDUSTRY/CAD/"),
        ("foto",    "→ MICROINDUSTRY/FOTO/"),
        ("fin",     "→ MICROINDUSTRY/FINANCE/"),
        ("ce",      "→ MICROINDUSTRY/CONTENT_ENGINE/"),
        ("ws",      "→ MICROINDUSTRY/WORKSPACE/"),
        ("pers",    "→ PERSONALE/"),
        ("inbox",   "→ Desktop/INBOX/               (drop zone)"),
        ("mappa",   "→ Apre MAPPA_SISTEMA.md in Cursor/notepad"),
        ("exp",     "→ Apre Explorer nella cartella corrente"),
        ("vault",   "→ Apre Explorer in _VAULT/"),
        ("docs",    "→ Apre Explorer in Documents/"),
    ]
    for name, desc in nav:
        lines.append(f"  {name:<14} {desc}")

    # ── sistema ──
    lines.append(section("SISTEMA — launcher e controllo"))
    sys_cmds = [
        ("start-titanium",  "Avvia API (5001) + Dashboard (5173) insieme"),
        ("start-api",       "Avvia solo api_server.py porta 5001"),
        ("start-dashboard", "Avvia solo React dashboard porta 5173"),
        ("start-scanner",   "Avvia MENTE_SCANNER (estrazione documenti)"),
        ("stop-titanium",   "Ferma tutti i processi Python TITANIUM_OS"),
        ("ti-status",       "Stato rapido: API, GitHub auth, milestone, blockers"),
        ("reload",          "Ricarica il profilo PowerShell ($PROFILE)"),
        ("update-restart",  "Aggiorna RIAVVIO_SESSIONE.txt con stato corrente"),
        ("update-funzioni", "Aggiorna questo file FUNZIONI_SISTEMA.txt"),
    ]
    for name, desc in sys_cmds:
        lines.append(f"  {name:<20} {desc}")

    # ── AI e RAG ──
    lines.append(section("AI — Claude Code e RAG"))
    ai_cmds = [
        ("claude-ti",          "Apre Claude Code in TITANIUM_OS con --dangerously-skip-permissions"),
        ("brief",              "Genera e mostra il daily brief"),
        ("rag 'query'",        "Cerca nel RAG v4.0 (hybrid BM25+semantico+reranker)"),
        ("rag-update",         "Rebuild INCREMENTALE — solo file nuovi/modificati (<20 sec)"),
        ("rag -Rebuild",       "Full rebuild RAG (reset indice) — ~1-3 min"),
        ("rag -Stats",         "Statistiche RAG (chunk, file, config)"),
        ("rag-rebuild",        "Full rebuild alias — con avviso durata"),
    ]
    for name, desc in ai_cmds:
        lines.append(f"  {name:<30} {desc}")

    # ── agenti ──
    lines.append(section("AGENTI VALIDATORI — ask + agents"))
    lines.append("  Uso: ask -Agent <nome> -Question 'domanda tecnica'")
    lines.append("       ask -Agent forge -Question 'Quanto regge un gusset 200mm in S235?'")
    lines.append("       ask -Agent tesla -NoRag -Question 'CEI 64-8 sezione 4 riassunto'\n")
    active   = [a for a in agents if a["active"]]
    inactive = [a for a in agents if not a["active"]]
    for a in active:
        lines.append(f"  {a['emoji']} {a['key']:<10} {a['name']:<10} {a['role']}")
        if a["tags"]:
            lines.append(f"    {'':12} tag: {a['tags']}")
    if inactive:
        lines.append("\n  In sviluppo:")
        for a in inactive:
            lines.append(f"  {a['emoji']} {a['key']:<10} {a['name']:<10} {a['role']} (inattivo)")

    # ── ricerca ──
    lines.append(section("RICERCA ACCADEMICA — research"))
    lines.append("  Uso: research -Query 'query' [-Domain dominio] [-Sources src1,src2] [-Max N] [-Rag] [-DryRun]")
    lines.append("  Preset domini: V32, CNC, acquaponica, PLC, AI, elettrica, gomma\n")
    lines.append("  Esempi:")
    lines.append("    research -Query 'epoxy granite CNC damping' -Domain V32 -Rag")
    lines.append("    research -Query 'aquaponics biofiltration closed loop' -Domain acquaponica -Sources 'theses_fr,openalex'")
    lines.append("    research -Query 'Siemens S7 motion control' -Sources 'github,semantic_scholar' -DryRun\n")
    lines.append("  Sorgenti disponibili:")
    for src, desc in RESEARCH_SOURCES:
        lines.append(f"    {src:<20} {desc}")
    lines.append("\n  Preset dominio (--preset / -p):")
    for preset, srcs in RESEARCH_PRESETS:
        lines.append(f"    {preset:<12} {srcs}")

    # ── git ──
    lines.append(section("GIT — shortcuts"))
    git_cmds = [
        ("gs",              "git status"),
        ("gp",              "git pull"),
        ("glog",            "git log --oneline --graph --all -20"),
        ("gpush 'msg'",     "git add -A && git commit -m msg && git push"),
    ]
    for name, desc in git_cmds:
        lines.append(f"  {name:<20} {desc}")

    # ── media ──
    lines.append(section("MEDIA E FILE"))
    media_cmds = [
        ("pdf [file]",       "Apre file in SumatraPDF (o apre MENTE/ASSOLUTO/ se senza argomento)"),
        ("pdf V7_X_v8.md",   "Cerca in MENTE/ASSOLUTO/ se non è path assoluto"),
        ("apri-foto [dir]",  "Apre cartella foto in Explorer (default: V32_BUILD)"),
        ("open-pdf",         "Apre lista PDF via API nel browser (localhost:5001/api/pdfs)"),
        ("open-photos",      "Apre lista foto via API nel browser (localhost:5001/api/photos)"),
    ]
    for name, desc in media_cmds:
        lines.append(f"  {name:<25} {desc}")

    # ── utilità ──
    lines.append(section("UTILITÀ"))
    util_cmds = [
        ("which <nome>",     "Trova il path di un eseguibile"),
        ("mkcd <path>",      "Crea cartella e ci entra"),
        ("gh <args>",        "GitHub CLI (gh pr, gh issue, gh auth, ...)"),
        ("node <args>",      "Node.js"),
        ("npm <args>",       "npm"),
        ("python <args>",    "Python 3.11 (tools/python311/)"),
        ("pip <args>",       "pip (tools/python311/Scripts/)"),
        ("ffmpeg <args>",    "ffmpeg 8.1.1"),
    ]
    for name, desc in util_cmds:
        lines.append(f"  {name:<25} {desc}")

    # ── API endpoints ──
    lines.append(section("API SERVER — localhost:5001"))
    lines.append("  Base URL: http://localhost:5001")
    lines.append("  Avvia con: start-api  oppure  start-titanium\n")
    for method, path, desc in API_ENDPOINTS:
        lines.append(f"  {method:<6} {path:<38} {desc}")

    # ── nodi ──
    lines.append(section("NODI NODES/"))
    for n in nodes:
        lines.append(f"  {n['name']:<22} script principale: {n['script']}  ({n['files']} file)")

    # ── script Python ──
    lines.append(section("SCRIPT AUTOMATIONS/"))
    for s in scripts:
        path_short = s["path"].replace("AUTOMATIONS\\", "").replace("AUTOMATIONS/", "")
        desc = s["desc"] or s["header"].split("|")[0].strip() if s["header"] else ""
        lines.append(f"  {path_short:<45} {desc[:45]}")

    # ── alias ──
    lines.append(section("ALIAS POWERSHELL"))
    for name, target in aliases:
        lines.append(f"  {name:<10} → {target}")

    # ── documentazione ──
    lines.append(section("DOCUMENTAZIONE"))
    docs = [
        ("DOCS/MANUALE_SISTEMA.md",     "Guida completa — comandi, esempi, flussi, troubleshooting"),
        ("MAPPA_SISTEMA.md",            "Mappa filesystem e architettura (Desktop)"),
        ("Desktop/RIAVVIO_SESSIONE.txt","Prompt pronto per riaprire sessione Claude"),
        ("Desktop/FUNZIONI_SISTEMA.txt","Questo file — lista auto-generata"),
    ]
    for path, desc in docs:
        lines.append(f"  {path:<45} {desc}")

    lines.append(f"\n{'═' * 70}")
    lines.append(f"  Aggiornato: {now}  |  Script: AUTOMATIONS/core/generate_functions_list.py")
    lines.append(f"  Hook Stop attivo — si aggiorna ad ogni chiusura sessione Claude.")
    lines.append(f"{'═' * 70}\n")

    return "\n".join(lines)


def main():
    content = generate()
    OUT.write_text(content, encoding="utf-8")
    print(f"[functions_list] Scritto: {OUT} ({len(content.splitlines())} righe)")


if __name__ == "__main__":
    main()
