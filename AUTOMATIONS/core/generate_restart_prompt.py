# generate_restart_prompt.py | TITANIUM_OS / AUTOMATIONS / core | v1.1 | 2026-05-28
# Genera RIAVVIO_SESSIONE.txt con metadati completi
# Trigger: hook Stop Claude Code + alias PS `update-restart`

import json
import os
import subprocess
from pathlib import Path
from datetime import datetime

TI_ROOT  = Path(__file__).resolve().parents[2]
STATE    = TI_ROOT / "BRAIN" / "STATE.json"
DESKTOP  = Path.home() / "OneDrive" / "Desktop"
OUT      = DESKTOP / "RIAVVIO_SESSIONE.txt"
MENTE    = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
GIT_ROOT = TI_ROOT.parent  # TITANIUM_OS/ (root repo)


# ── helpers ───────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE.exists():
        with open(STATE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def git_meta() -> dict:
    def run(cmd):
        try:
            return subprocess.check_output(cmd, cwd=str(TI_ROOT), text=True,
                                           stderr=subprocess.DEVNULL).strip()
        except Exception:
            return ""
    return {
        "hash":    run(["git", "rev-parse", "--short", "HEAD"]),
        "branch":  run(["git", "branch", "--show-current"]),
        "message": run(["git", "log", "--oneline", "-1"]),
        "dirty":   bool(run(["git", "status", "--porcelain"])),
    }


def recent_sessions(n: int = 4) -> list[str]:
    sess_dir = MENTE / "SESSIONI"
    if not sess_dir.exists():
        return []
    files = sorted(
        [f for f in sess_dir.glob("*.md") if not f.name.startswith("_")],
        key=lambda f: f.stat().st_mtime, reverse=True
    )
    return [f.stem for f in files[:n]]


def rag_stats() -> str:
    try:
        import chromadb
        db = TI_ROOT / "NODES" / "MENTE_RAG" / "chroma_db"
        if not db.exists():
            return "DB non trovato"
        client = chromadb.PersistentClient(path=str(db))
        col = client.get_collection("mente")
        # Leggi anche manifest per file count
        manifest = TI_ROOT / "NODES" / "MENTE_RAG" / "rag_manifest.json"
        files_n = ""
        if manifest.exists():
            try:
                m = __import__("json").loads(manifest.read_text(encoding="utf-8"))
                files_n = f" | {len(m.get('files', {}))} file"
            except Exception:
                pass
        return f"{col.count()} chunk{files_n}"
    except Exception:
        return "non verificabile"


# ── generatore ────────────────────────────────────────────────────────────────

def generate() -> str:
    s    = load_state()
    git  = git_meta()
    now  = datetime.now().strftime("%Y-%m-%d %H:%M")
    meta = s.get("meta", {})

    milestone   = s.get("active_milestone", "—")
    next_step   = s.get("next_step", "—")
    last_action = s.get("last_action", "—")
    blockers    = s.get("blockers", [])
    pillars     = s.get("pillars", {})
    sessions    = recent_sessions(4)
    nodes       = s.get("nodes", {})

    def fmt_pillars():
        lines = []
        for name, p in pillars.items():
            pct = p.get("pct_complete", 0)
            nxt = (p.get("next") or p.get("phase", ""))[:70]
            lines.append(f"  {name:<14} {pct:>3}%  {nxt}")
        return "\n".join(lines)

    def fmt_nodes():
        lines = []
        for k, v in nodes.items():
            status = "✓" if "ATTIVO" in str(v) or "NUOVO" in str(v) else "○"
            lines.append(f"  {status} {k:<20} {str(v)[:55]}")
        return "\n".join(lines)

    def fmt_blockers():
        return "\n".join(f"  ! {b}" for b in blockers) if blockers else "  nessuno"

    pendenti = [
        "V8 documento completo — DOPO decisione silent blocks (v.A senza tamponi / v.B con Ø18 h30)",
        "GitHub profile pubblico + README TITANIUM_OS",
        "CV originale .docx — aggiungere sezione AI/digital skills (file da fornire)",
        "RAG rebuild incremental — 2376 chunk > 2min timeout (serve --incremental flag)",
        "EVA WhatsApp pilot — Maria Rule zero-click (n8n + WhatsApp Business API)",
        "Scheda formulazione gomma tamponi (economica / prototipo / produzione)",
        "Dashboard agenti — pannello nella Tela per interrogare gli agenti direttamente",
    ]

    out = f"""RIAVVIO SESSIONE — TITANIUM_OS / MICROINDUSTRY
═══════════════════════════════════════════════════════════════════
METADATI
  Generato:      {now}
  STATE:         v{meta.get('version','?')} | {meta.get('updated','?')[:10]}
  Git commit:    {git['hash']} [{git['branch']}]{' ⚠ dirty' if git['dirty'] else ''}
  Ultimo commit: {git['message']}
  RAG:           {rag_stats()}
  Sessioni:      #{s.get('session_count','?')}
  File output:   {OUT}
═══════════════════════════════════════════════════════════════════

PROMPT DI APERTURA (copia-incolla a Claude):

"Siamo in sessione attiva su TITANIUM_OS + MICROINDUSTRY V32 build.
Leggi BRAIN/STATE.json e MAPPA_SISTEMA.md per il contesto completo.

MILESTONE: {milestone}
STEP:      {next_step}

PILLARS:
{fmt_pillars()}

BLOCKERS:
{fmt_blockers()}

PENDENTI (in ordine di priorità):
{chr(10).join(f'  {i+1}. {p}' for i, p in enumerate(pendenti))}

ULTIMA AZIONE REGISTRATA:
  {last_action[:150]}

SESSIONI RECENTI: {', '.join(sessions)}

Inizia leggendo STATE.json e dimmi cosa prioritizzare."

═══════════════════════════════════════════════════════════════════
NODI ECOSISTEMA:
{fmt_nodes()}

COMANDI RAPIDI:
  start-titanium   → API (5001) + Dashboard (5173)
  claude-ti        → Claude Code in TITANIUM_OS
  ti-status        → stato rapido
  rag-rebuild      → rebuild ChromaDB
  agents           → lista agenti
  ask -Agent themis -Question "dove eravamo rimasti?"
  research -Query "..." -Domain V32|CNC|acquaponica -Rag

LINK:
  Dashboard:  http://localhost:5173
  API health: http://localhost:5001/api/health
  GitHub:     https://github.com/Microindustry/TITANIUM_OS
═══════════════════════════════════════════════════════════════════
"""
    return out


def main():
    content = generate()
    OUT.write_text(content, encoding="utf-8")
    print(f"[restart_prompt] Scritto: {OUT} ({len(content)} chars)")


if __name__ == "__main__":
    main()
