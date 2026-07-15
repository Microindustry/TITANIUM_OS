# update_github_profile.py | TITANIUM_OS / AUTOMATIONS / CORE | v2.0 | 2026-07-15
# Aggiorna automaticamente il README del profilo GitHub (Microindustry/Microindustry)
# Legge STATE.json per milestone e versione aggiornati
# v2.0 (#61): canone GUIDA §7.7 — MAI numeri di progetto come fatti (178kg/±0,019 tolti:
# la V32 è AL TELAIO); percentuali dichiarate come metriche di gestione; nodi/stack
# aggiornati (RAG v4.2, apprendista notturno, Nina, 3 facce).

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
    mims_pct    = state.get("pillars", {}).get("MIMS", {}).get("pct_complete", 0)
    vn_pct      = state.get("pillars", {}).get("VITA_NATURA", {}).get("pct_complete", 0)
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

Quando ho iniziato a costruire la mia fresatrice CNC da zero — progetto **corpo unico** in acciaio saldato TIG, 3 assi; oggi è un **telaio in piedi**, coi componenti scelti uno a uno — ho capito che avevo bisogno di un sistema per non perdere il filo. Da lì è nato TITANIUM_OS. I numeri della macchina li dirà la macchina, quando potrà dimostrarli.

Nessuna laurea. Solo proof-of-work reali.

---

## TITANIUM_OS — Il sistema operativo della mia vita

> *Un sistema che gira da solo vale più di 10 abitudini che dipendono dalla volontà.*

**TITANIUM_OS** è il sistema che costruisco mentre costruisce me. Ogni nodo elimina un carico mentale. Ogni automazione libera energia per il lavoro fisico.

### Stato Live — v{v} | Sessione #{session} | {updated}

*Le barre sono metriche di gestione interna (STATE.json live), non misure fisiche:
lo stato reale della V32 oggi è un telaio in piedi + componentistica scelta.*

| Pilastro | Avanzamento gestione | Stato |
|----------|-----------|-------|
| **V32 CNC** (fresatrice 3 assi) | `{bars(v32_pct)}` | Al telaio — in costruzione |
| **GENESIS** (ecosistema AI) | `{bars(genesis_pct)}` | Building |
| **MIMS** (sistema modulare d'acciaio) | `{bars(mims_pct)}` | Attende la pressa VULCAN |
| **VITA NATURA** (centro estetico) | `{bars(vn_pct)}` | Attivo |

**Milestone attivo:** {milestone}
**Prossimo step:** {next_step}

---

### Nodi GENESIS attivi

| Nodo | Descrizione |
|------|-------------|
| `MENTE RAG v4.2` | ChromaDB hybrid BM25+semantico+CrossEncoder, chunking heading-aware + GraphRAG-lite — ~19.600 chunk, si aggiorna da solo a ogni modifica |
| `Story Agent` | Milestone verificato → episodio narrativo (02:07 ogni notte) — il lavoro si documenta da solo |
| `Nina Agent` | Il binario educativo: favole vere generate a 2 stadi con grounding RAG |
| `Apprendista notturno` | Bozze di caroselli Instagram in quarantena (@04:15) — QC automatico + canon_guard, promozione solo umana di giorno |
| `Research Agent` | Paper e segnali da 13 sorgenti (arXiv, Semantic Scholar, GitHub...) |
| `Watchdog + self-heal` | Il sistema si sorveglia e si ripara (RAG recovery a 2 livelli, sentinelle notturne) |
| `Daily Brief` | Briefing quotidiano 07:30 |
| `API Server` | Flask localhost:5001 — media, foto, agenti, RAG |
| `Dashboard` | React+Vite — 3 facce: TITANIUM (sistema) · NINA (favola vera) · PUBBLICAZIONI |
| `Personal LLM` | Fine-tuning sui miei episodi (domenica notte) |

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

Calcoli di progetto (non ancora dimostrati sul campo): BEP V32 **61 ore** | Tariffa target **EUR 45/h**

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
    # guardia canone (GUIDA §7.7): il profilo è un CONTENUTO PUBBLICO — niente
    # numeri di progetto come fatti. Se scatta, NON si pubblica (il template è
    # fisso ma STATE/episodi ci finiscono dentro raw: la falla può rientrare da lì).
    try:
        from canon_guard import scan_public
        falle = scan_public(readme)
    except ImportError:
        falle = []
    if falle:
        for f_ in falle:
            logger.error("canon_guard scan_public: %s", f_)
        logger.error("PUBBLICAZIONE ANNULLATA: %d falle di canone nel README", len(falle))
        sys.exit(1)
    update_profile(readme)
