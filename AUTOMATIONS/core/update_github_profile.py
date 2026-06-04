# update_github_profile.py | TITANIUM_OS / AUTOMATIONS / CORE | v1.0 | 2026-05-29
# Aggiorna automaticamente il README del profilo GitHub (Microindustry/Microindustry)
# Legge STATE.json per milestone e versione aggiornati

import os, sys, json, base64, subprocess, logging
from pathlib import Path
from datetime import datetime

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

_ROOT_UGP = Path(__file__).resolve().parents[3] / "TITANIUM_OS"
sys.path.insert(0, str(_ROOT_UGP))
try:
    from CORE.log import get_logger
    logger = get_logger("update_github_profile")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [github_profile] %(levelname)s %(message)s")
    logger = logging.getLogger("update_github_profile")

BASE = Path(__file__).resolve().parents[3]
STATE_FILE = BASE / "TITANIUM_OS" / "BRAIN" / "STATE.json"
# gh risolto dinamicamente: PATH -> Program Files -> tools (legacy). No hardcode benen/tools.
import shutil as _shutil
GH = (_shutil.which("gh")
      or next((p for p in [
          Path(os.environ.get("ProgramFiles", r"C:\Program Files")) / "GitHub CLI" / "gh.exe",
          Path.home() / "tools" / "gh" / "gh.exe",
      ] if p.exists()), None)
      or "gh")
GH = str(GH)

# Carica env vars dal vault (necessario quando eseguito da Task Scheduler)
_env_file = Path.home() / "TITANIUM_OS" / "_VAULT" / "KEYS" / "titanium_os.env"
if _env_file.exists():
    for _line in _env_file.read_text(encoding="utf-8").splitlines():
        _line = _line.strip()
        if _line and not _line.startswith("#") and "=" in _line:
            _k, _, _v = _line.partition("=")
            os.environ.setdefault(_k.strip(), _v.strip())

def load_state():
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except:
        return {}

def get_recent_episodes(n=5):
    ep_dir = BASE / "TITANIUM_OS" / "CONTENT_ENGINE" / "DATABASE" / "episodes"
    eps = sorted(ep_dir.rglob("*.md"), key=lambda f: f.stat().st_mtime, reverse=True)[:n]
    titles = []
    for ep in eps:
        txt = ep.read_text(encoding="utf-8", errors="replace")
        for line in txt.splitlines():
            if line.startswith("title:"):
                titles.append(line.split(":",1)[1].strip().strip('"'))
                break
    return titles

def build_readme(state):
    v = state.get("meta", {}).get("version", "?")
    genesis_pct = state.get("pillars", {}).get("GENESIS", {}).get("pct_complete", 0)
    v32_pct     = state.get("pillars", {}).get("V32", {}).get("pct_complete", 0)
    milestone   = state.get("active_milestone", "—")
    next_step   = state.get("next_step", "—")
    session     = state.get("session_count", 0)
    milestones  = state.get("milestones", {}).get("verified", [])[-5:]
    blockers    = state.get("blockers", [])
    episodes    = get_recent_episodes(5)
    updated     = datetime.now().strftime("%d %b %Y %H:%M")

    bars = lambda pct: ("█" * (pct // 10)) + ("░" * (10 - pct // 10)) + f" {pct}%"

    readme = f"""## Matteo Benenati — Microindustry

```
╔══════════════════════════════════════════════════════════════╗
║  ARTIGIANO INDUSTRIALE + SYSTEM BUILDER                      ║
║  15 anni di officina. Titanio, robot, presse, CNC da zero.  ║
║  Il codice è la mia seconda officina.                        ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Chi sono

Non vengo dal software. Vengo dall'officina.

Ho saldato scarichi in titanio per le moto del MotoGP da **SCProject**. Ho programmato robot **ESSEGI** per linee di packaging industriale. Ho operato presse **DATWLER** e fatto QC su impianti di refrigerazione **LU.VE**. Ho costruito macchine con le mani per 15 anni prima di scrivere la prima riga di codice seria.

Quando ho iniziato a costruire la mia fresatrice CNC da zero — **178 kg, struttura corpo unico in acciaio saldato TIG, 3 assi, ±0.019 mm** — ho capito che avevo bisogno di un sistema per non perdere il filo. Da lì è nato TITANIUM_OS.

Nessuna laurea. Solo proof-of-work reali.

---

## TITANIUM_OS — Il sistema operativo della mia vita

> *Un sistema che gira da solo vale più di 10 abitudini che dipendono dalla volontà.*

**TITANIUM_OS** è il sistema che costruisco mentre costruisce me. Ogni nodo elimina un carico mentale. Ogni automazione libera energia per il lavoro fisico.

### Stato Live — v{v} | Sessione #{session} | {updated}

| Pilastro | Progresso | Stato |
|----------|-----------|-------|
| **V32 CNC** (fresatrice 3 assi) | `{bars(v32_pct)}` | In costruzione |
| **GENESIS** (ecosistema AI) | `{bars(genesis_pct)}` | Building |
| **MIMS** (stampo tegole) | `{bars(30)}` | Attende V32 |
| **VITA NATURA** (centro estetico) | `{bars(40)}` | Attivo |

**Milestone attivo:** {milestone}
**Prossimo step:** {next_step}

---

### Nodi GENESIS attivi

| Nodo | Descrizione |
|------|-------------|
| `MCP Server` | 5 tool Claude — get_state, search_mente, update_milestone |
| `MENTE RAG v4.0` | ChromaDB hybrid BM25+semantic+CrossEncoder — 6000+ chunk |
| `Story Agent` | Genera episodi narrativi dai commit git (02:07 ogni notte) |
| `Research Agent` | Cerca paper su 13 sorgenti (arXiv, Semantic Scholar, GitHub...) |
| `Computer Use` | Controllo desktop via Anthropic API — screenshot+click+tastiera |
| `Daily Brief` | Briefing quotidiano 07:30 |
| `API Server` | Flask localhost:5001 — media, foto, agenti, RAG |
| `Dashboard v7.0` | React+Vite — sidebar + AgentsView + dot grid |
| `Personal LLM` | Fine-tuning TinyLlama-1.1B sui miei episodi (domenica notte) |

---

### Ultimi 5 milestone verificati
{chr(10).join(f"- {m}" for m in milestones)}

### Episodi recenti
{chr(10).join(f"- *{e}*" for e in episodes)}

---

### Stack

```
Python 3.11 · ChromaDB · SentenceTransformer · Flask · MCP
React + Vite · Tailwind · n8n · Claude API · Windows 10
LLaMA-Factory · PyAutoGUI · Anthropic Computer Use API
```

---

### Obiettivo 2030

**Capannone artigianale proprio** — 15 Luglio 2030.
Non è un obiettivo lavorativo. È un obiettivo di sovranità.

BEP V32: **61 ore = 1.4 mesi** | ROI Anno 1: **322%** | Tariffa: **EUR 45/h**

---

*Aggiornato automaticamente ogni notte da TITANIUM_OS · TI_NightPush 04:07*
"""
    return readme

def update_profile(readme_content):
    # Leggi SHA attuale
    result = subprocess.run(
        [GH, "api", "repos/Microindustry/Microindustry/contents/README.md", "--jq", ".sha"],
        capture_output=True, text=True
    )
    sha = result.stdout.strip()

    content_b64 = base64.b64encode(readme_content.encode("utf-8")).decode()

    payload = json.dumps({
        "message": f"auto: profile update {datetime.now().strftime('%Y-%m-%d')}",
        "content": content_b64,
        "sha": sha
    })

    result = subprocess.run(
        [GH, "api", "repos/Microindustry/Microindustry/contents/README.md",
         "-X", "PUT", "--input", "-"],
        input=payload, capture_output=True, text=True
    )

    if result.returncode == 0:
        logger.info("Profile aggiornato: %s", datetime.now().strftime("%H:%M:%S"))
    else:
        logger.error("ERRORE aggiornamento: %s", result.stderr[:200])

if __name__ == "__main__":
    state = load_state()
    readme = build_readme(state)
    update_profile(readme)
