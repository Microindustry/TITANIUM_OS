# night_audit.py | TITANIUM_OS / NODES / AUDIT_AGENT | v1.0 | 2026-06-05
# Self-audit notturno (Punto 0b + 1b "cartella clinica"). Ogni notte, da solo:
#  - legge STATE, git log recente, conteggio episodi, stato RAG e SALUTE dei log
#    della catena notturna (ricerca/story/push: errori, 429, ricerche a vuoto);
#  - genera CRITICHE strutturate (Sonnet = economico; fallback a regole se offline);
#  - le AGGIUNGE (mai sovrascrive, dedup per hash) a DATA/audit/critiche_auto.json;
#  - scrive DATA/audit/system_health.json (sintesi per brief/dashboard).
# Idempotente per-giorno: se gia' girato oggi -> skip (usa --force per rifare).
# Il commit lo fa night_audit.bat (come story_agent), per restare additivo/isolato.

import os
import re
import sys
import io
import json
import hashlib
import logging
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

TI_ROOT  = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(TI_ROOT))
try:
    from CORE.log import get_logger
    logger = get_logger("night_audit")
except Exception:
    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s [night_audit] %(levelname)s %(message)s")
    logger = logging.getLogger("night_audit")

STATE_F   = TI_ROOT / "BRAIN" / "STATE.json"
LOGS_DIR  = TI_ROOT / "DATA" / "logs"
EPISODES  = TI_ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
AUDIT_DIR = TI_ROOT / "DATA" / "audit"
CRITICHE  = AUDIT_DIR / "critiche_auto.json"
HEALTH    = AUDIT_DIR / "system_health.json"
BUSSOLA       = TI_ROOT / "DA_FARE_FATTO.md"           # la scaletta viva (da fare/fatto)
BUSSOLA_TODOS = AUDIT_DIR / "bussola_todos.json"       # estratto strutturato per la dashboard (CRITICHE)

MODEL     = "claude-sonnet-4-6"   # economico, NO Opus (regola #4)
TODAY     = datetime.now().strftime("%Y-%m-%d")

# Pattern di guasto cercati nei log della catena notturna
LOG_FAIL_PATTERNS = [
    (r"Traceback|PermissionError|FileNotFoundError", "crash/eccezione"),
    (r"\b429\b|rate limit|Too Many Requests",        "rate-limit sorgente"),
    (r"Read timed out|timeout",                       "timeout di rete"),
    (r"Nessun risultato|0 risultati|0 documenti",     "ricerca a vuoto"),
    (r"ERR:|ERROR|push fallito",                       "errore esplicito"),
]
NIGHT_LOGS = ["night_research.log", "research_agent.log", "story_agent_run.log",
              "story_agent.log", "night_push.log", "rag_engine.log",
              "update_github_profile.log"]


# ── RACCOLTA SEGNALI ──────────────────────────────────────────────────────────

def _read_json(p: Path, default):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return default


def _git(*args: str) -> str:
    try:
        r = subprocess.run(["git", *args], capture_output=True, text=True,
                           encoding="utf-8", errors="replace", cwd=str(TI_ROOT))
        return r.stdout.strip()
    except Exception:
        return ""


# ── BUSSOLA (DA_FARE_FATTO.md) — collegamento alla cartella clinica ──────────────

# glifo nel [ ] -> stato della riga
_BUSSOLA_STATO = {"✓": "fatto", "◐": "in_corso", "": "da_fare", "✗": "non_fatto", "💡": "idea"}
_BUSSOLA_LINE  = re.compile(r"^\s*[-*]?\s*\[([^\]]*)\]\s*(.+?)\s*$")
_BUSSOLA_SESS  = re.compile(r"^##\s+(.*sessione.*)$", re.IGNORECASE)


def parse_bussola() -> list[dict]:
    """Estrae le righe-todo da DA_FARE_FATTO.md con il loro stato e la sessione.
    Deterministico (niente LLM): la bussola e' la fonte, qui la rendiamo struttura."""
    if not BUSSOLA.exists():
        return []
    todos, sessione = [], ""
    for raw in BUSSOLA.read_text(encoding="utf-8", errors="replace").splitlines():
        ms = _BUSSOLA_SESS.match(raw)
        if ms:
            sessione = ms.group(1).strip()
            continue
        m = _BUSSOLA_LINE.match(raw)
        if not m:
            continue
        glyph = m.group(1).strip()
        testo = m.group(2).strip()
        # salta le righe di legenda (es. "[✓] fatto · [◐] in corso ...")
        if not testo or testo.lower().startswith(("fatto", "in corso", "da fare", "non fatto", "idea")):
            continue
        stato = _BUSSOLA_STATO.get(glyph, "da_fare")
        todos.append({
            "id": "BUS-" + hashlib.sha1(testo.lower().encode("utf-8")).hexdigest()[:8],
            "stato": stato, "testo": testo, "sessione": sessione,
        })
    return todos


def write_bussola_todos() -> dict:
    """Scrive DATA/audit/bussola_todos.json (consumato dalla dashboard CRITICHE)."""
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)
    todos = parse_bussola()
    BUSSOLA_TODOS.write_text(json.dumps(todos, ensure_ascii=False, indent=2), encoding="utf-8")
    aperti = sum(1 for t in todos if t["stato"] in ("da_fare", "in_corso", "non_fatto"))
    logger.info("bussola: %d todo (%d aperti) -> bussola_todos.json", len(todos), aperti)
    return {"total": len(todos), "open": aperti}


def collect_signals() -> dict:
    state = _read_json(STATE_F, {})
    since = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
    # bussola: i todo aperti diventano contesto per l'LLM ("trova potenzialita'")
    bussola_open = [t["testo"] for t in parse_bussola()
                    if t["stato"] in ("da_fare", "in_corso")][:20]

    # commit ultima settimana
    commits = [l for l in _git("log", f"--since={since}", "--format=%h %s").splitlines() if l]

    # episodi su disco
    ep_files = list(EPISODES.rglob("*.md")) if EPISODES.exists() else []

    # stato RAG: ultimo "Totale: N chunk" dal log
    rag_chunks = None
    rlog = LOGS_DIR / "rag_engine.log"
    if rlog.exists():
        m = re.findall(r"Totale:\s*(\d+)\s*chunk", rlog.read_text(encoding="utf-8", errors="replace"))
        if m:
            rag_chunks = int(m[-1])

    # SALUTE log notturni: scansiona le ultime ~80 righe di ognuno
    log_issues = []
    for name in NIGHT_LOGS:
        f = LOGS_DIR / name
        if not f.exists():
            continue
        tail = "\n".join(f.read_text(encoding="utf-8", errors="replace").splitlines()[-80:])
        for pat, label in LOG_FAIL_PATTERNS:
            if re.search(pat, tail, re.IGNORECASE):
                log_issues.append({"log": name, "tipo": label})

    return {
        "date": TODAY,
        "git_head": _git("rev-parse", "--short", "HEAD"),
        "active_milestone": state.get("active_milestone", ""),
        "next_step": state.get("next_step", ""),
        "pillars": {k: v.get("pct_complete") for k, v in state.get("pillars", {}).items()},
        "blockers": state.get("blockers", []),
        "commits_7d": commits,
        "n_commits_7d": len(commits),
        "n_episodes": len(ep_files),
        "rag_chunks": rag_chunks,
        "log_issues": log_issues,
        "bussola_open": bussola_open,
    }


# ── GENERAZIONE CRITICHE ────────────────────────────────────────────────────────

SYSTEM_PROMPT = """Sei l'auditor interno di TITANIUM_OS, il sistema operativo personale di Matteo (artigiano industriale + system builder, V32=CNC epoxy-granite, MIMS=moduli, GENESIS=stack AI).
Il tuo compito: la "cartella clinica" del sistema. Non una to-do generica: diagnostica che accende la lampadina.
Ricevi i segnali di salute di stanotte. Produci 3-6 CRITICHE concrete, verificabili, azionabili.
Regole: niente lodi, niente fuffa. Ogni critica = un rischio o un'inefficienza REALE leggibile dai dati. Se i log mostrano guasti, quelli vengono prima.
Considera anche "bussola_open" (la scaletta da-fare di Matteo): se un todo aperto e' a rischio di essere dimenticato, e' bloccante per altro, o sbloccherebbe valore, emetti UNA critica area "ROADMAP" che lo evidenzi (max 1-2). Non ripetere pari pari il todo: di' perche' conta ORA.
Rispondi SOLO con un array JSON, niente testo attorno. Schema per elemento:
{"area":"RAG|RICERCA|NOTTURNE|V32|MIMS|GENESIS|SISTEMA|ROADMAP","severity":"alta|media|bassa","finding":"cosa non va, dai dati","azione":"il prossimo passo concreto"}"""


def critiche_via_llm(signals: dict) -> list[dict] | None:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        logger.warning("ANTHROPIC_API_KEY assente -> fallback a regole")
        return None
    try:
        import anthropic
    except ImportError:
        logger.warning("anthropic non installato -> fallback a regole")
        return None
    try:
        client = anthropic.Anthropic(api_key=api_key)
        resp = client.messages.create(
            model=MODEL, max_tokens=1500, system=SYSTEM_PROMPT,
            messages=[{"role": "user",
                       "content": "Segnali di stanotte:\n" + json.dumps(signals, ensure_ascii=False, indent=2)}],
        )
        txt = resp.content[0].text.strip()
        m = re.search(r"\[.*\]", txt, re.DOTALL)
        data = json.loads(m.group(0) if m else txt)
        return data if isinstance(data, list) else None
    except Exception as e:
        logger.warning("LLM audit fallito (%s) -> fallback a regole", e)
        return None


def critiche_via_regole(signals: dict) -> list[dict]:
    """Fallback deterministico: critiche dai soli segnali, senza LLM."""
    out = []
    for issue in signals["log_issues"]:
        out.append({
            "area": "NOTTURNE",
            "severity": "alta" if issue["tipo"] in ("crash/eccezione", "errore esplicito") else "media",
            "finding": f"{issue['log']}: rilevato {issue['tipo']} nelle ultime esecuzioni.",
            "azione": f"Ispezionare DATA/logs/{issue['log']} e correggere la causa.",
        })
    if signals["n_commits_7d"] == 0:
        out.append({"area": "SISTEMA", "severity": "media",
                    "finding": "Nessun commit negli ultimi 7 giorni: il sistema non avanza.",
                    "azione": "Verificare che story_agent e la catena notturna producano output."})
    for pil, pct in (signals["pillars"] or {}).items():
        if isinstance(pct, (int, float)) and pct and pct < 35:
            out.append({"area": pil, "severity": "bassa",
                        "finding": f"Pilastro {pil} fermo al {pct}%.",
                        "azione": f"Definire il prossimo step misurabile per {pil}."})
    if not out:
        out.append({"area": "SISTEMA", "severity": "bassa",
                    "finding": "Nessun guasto rilevato nei log notturni.",
                    "azione": "Mantenere; nessuna azione richiesta."})
    return out


# ── PERSISTENZA ADDITIVA ────────────────────────────────────────────────────────

def _cid(c: dict) -> str:
    base = (c.get("area", "") + "|" + c.get("finding", "")).lower()
    base = re.sub(r"\s+", " ", base).strip()
    return "AUD-" + hashlib.sha1(base.encode("utf-8")).hexdigest()[:10]


def append_critiche(new: list[dict], signals: dict) -> dict:
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)
    existing = _read_json(CRITICHE, [])
    by_id = {c["id"]: c for c in existing if "id" in c}
    added = 0
    for c in new:
        cid = _cid(c)
        if cid in by_id:
            by_id[cid]["last_seen"] = TODAY          # gia' nota: aggiorna data
            continue
        by_id[cid] = {
            "id": cid, "date": TODAY, "git": signals["git_head"],
            "area": c.get("area", "SISTEMA"), "severity": c.get("severity", "media"),
            "finding": c.get("finding", ""), "azione": c.get("azione", ""),
            "fonte": signals.get("_fonte", "auto-audit"),
            "status": "open", "last_seen": TODAY,
        }
        added += 1
    merged = sorted(by_id.values(), key=lambda x: (x["date"], x["id"]), reverse=True)
    CRITICHE.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding="utf-8")
    return {"added": added, "total": len(merged), "open": sum(1 for c in merged if c.get("status") == "open")}


def write_health(signals: dict, stats: dict):
    health = {
        "last_audit": datetime.now().isoformat(timespec="seconds"),
        "date": TODAY,
        "git_head": signals["git_head"],
        "rag_chunks": signals["rag_chunks"],
        "n_episodes": signals["n_episodes"],
        "n_commits_7d": signals["n_commits_7d"],
        "pillars": signals["pillars"],
        "log_issues": signals["log_issues"],
        "critiche": stats,
        "verdict": "ATTENZIONE" if signals["log_issues"] else "OK",
    }
    HEALTH.write_text(json.dumps(health, ensure_ascii=False, indent=2), encoding="utf-8")


# ── MAIN ─────────────────────────────────────────────────────────────────────

def already_today() -> bool:
    h = _read_json(HEALTH, {})
    return h.get("date") == TODAY


def main():
    force = "--force" in sys.argv
    # la bussola si rinfresca SEMPRE (anche se l'audit LLM e' gia' girato oggi):
    # e' deterministica e a costo zero, e la dashboard deve vedere i todo aggiornati.
    write_bussola_todos()
    if "--bussola-only" in sys.argv:
        return
    if already_today() and not force:
        logger.info("audit gia' eseguito oggi (%s) - skip (--force per rifare)", TODAY)
        return

    logger.info("avvio self-audit notturno")
    signals = collect_signals()
    logger.info("segnali: %d commit/7gg, %d episodi, RAG %s chunk, %d problemi log",
                signals["n_commits_7d"], signals["n_episodes"],
                signals["rag_chunks"], len(signals["log_issues"]))

    critiche = critiche_via_llm(signals)
    if critiche is None:
        signals["_fonte"] = "auto-audit (regole)"
        critiche = critiche_via_regole(signals)
    else:
        signals["_fonte"] = f"auto-audit ({MODEL})"

    stats = append_critiche(critiche, signals)
    write_health(signals, stats)
    logger.info("done — critiche +%d (tot %d, aperte %d) | verdict %s",
                stats["added"], stats["total"], stats["open"],
                "ATTENZIONE" if signals["log_issues"] else "OK")


if __name__ == "__main__":
    main()
