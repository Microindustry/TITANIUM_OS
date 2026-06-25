# night_audit.py | TITANIUM_OS / NODES / AUDIT_AGENT | v1.4 | 2026-06-25
# v1.4: segnale ORFANI DI RETE (tesi Konik: graph view = diagnostico). Legge
#       DATA/audit/vault_orphans.json (prodotto da vault_intersect): note MENTE
#       senza legami nel grafo = sapere scollegato / indice stantio -> critica "RETE".
# v1.3: parse LLM DIFENSIVO (fix blocker "Unterminated string"). Via il regex greedy
#       \[.*\] che si fermava all'ultimo ']' (anche dentro una stringa "finding") e
#       troncava l'array -> ora raw_decode bilancia le parentesi rispettando le
#       stringhe; se la risposta e' troncata (max_tokens) si recuperano gli oggetti
#       {...} completi scartando solo l'ultimo monco. max_tokens 1500 -> 2500.
# v1.2: cartella clinica AUTO-PULENTE (fix n03) — una critica non più osservata da
#       AUTO_CLOSE_DAYS giorni si auto-chiude (status=resolved) e si RIAPRE da sola
#       se il guasto ritorna. Stop alle critiche che restano "aperte" per settimane
#       anche quando il log è tornato pulito.
# v1.1: log scan evidence-based — filtro 36h per riga (le righe ereditano la data
#       più vicina), \bERROR\b non matcha più "errore", segnali con riga+data,
#       prompt Sonnet vincolato all'estratto (fix falso "doppio crash" AUD-f6721639a6)
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
VAULT_ORPHANS = AUDIT_DIR / "vault_orphans.json"      # note MENTE senza legami (da vault_intersect)
BUSSOLA       = TI_ROOT / "DA_FARE_FATTO.md"           # la scaletta viva (da fare/fatto)
BUSSOLA_TODOS = AUDIT_DIR / "bussola_todos.json"       # estratto strutturato per la dashboard (CRITICHE)

MODEL     = "claude-sonnet-4-6"   # economico, NO Opus (regola #4)
TODAY     = datetime.now().strftime("%Y-%m-%d")
AUTO_CLOSE_DAYS = 4   # una critica non ri-osservata da N giorni -> auto-resolved (riapre se ritorna)

# Pattern di guasto cercati nei log della catena notturna
# NB: \bERROR\b e non ERROR — altrimenti matcha l'italiano "errore" nel testo normale
LOG_FAIL_PATTERNS = [
    (r"Traceback|PermissionError|FileNotFoundError", "crash/eccezione"),
    (r"\b429\b|rate limit|Too Many Requests",        "rate-limit sorgente"),
    (r"Read timed out|\btimeout\b",                   "timeout di rete"),
    (r"Nessun risultato|0 risultati|0 documenti",     "ricerca a vuoto"),
    (r"ERR:|\bERROR\b|push fallito",                  "errore esplicito"),
]
# Finestra di rilevanza: una riga di guasto più vecchia di così è storia, non guasto attivo
LOG_FRESH_HOURS = 36

_LINE_DATE_RX = [
    (re.compile(r"(\d{4})-(\d{2})-(\d{2})"), "ymd"),   # 2026-06-11 02:07:03
    (re.compile(r"(\d{2})/(\d{2})/(\d{4})"), "dmy"),   # done 11/06/2026 4:07
]

def _line_date(line: str):
    """Estrae la data da una riga di log (None se assente)."""
    for rx, kind in _LINE_DATE_RX:
        m = rx.search(line)
        if not m:
            continue
        try:
            if kind == "ymd":
                return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
            return datetime(int(m.group(3)), int(m.group(2)), int(m.group(1)))
        except ValueError:
            continue
    return None
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
    todos, sessione, in_toc = [], "", False
    for raw in BUSSOLA.read_text(encoding="utf-8", errors="replace").splitlines():
        # Salta il blocco indice (<!-- TOC --> ... <!-- /TOC -->): sono link
        # markdown '- [titolo](#ancora)' che il regex scambierebbe per todo
        # (glyph=titolo, testo='(#ancora)') gonfiando il conteggio "da fare".
        low = raw.strip().lower()
        if low.startswith("<!-- toc"):
            in_toc = True; continue
        if low.startswith("<!-- /toc"):
            in_toc = False; continue
        if in_toc:
            continue
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
        # guardia anti-TOC residua: link-ancora '(#...)' sfuggiti al blocco -> non sono todo
        if testo.startswith("(#"):
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

    # SALUTE log notturni: ultime ~80 righe, ma una riga conta solo se RECENTE
    # (ogni riga eredita la data più vicina nel log: prima quella sopra, poi quella
    # sotto — un traceback senza timestamp appartiene alla run che lo chiude).
    cutoff = datetime.now() - timedelta(hours=LOG_FRESH_HOURS)
    log_issues = []
    for name in NIGHT_LOGS:
        f = LOGS_DIR / name
        if not f.exists():
            continue
        lines = f.read_text(encoding="utf-8", errors="replace").splitlines()[-80:]
        pairs = []
        ctx = None
        for ln in lines:                       # forward fill: data più vicina sopra
            d = _line_date(ln)
            if d:
                ctx = d
            pairs.append([ln, ctx])
        below = None
        for i in range(len(pairs) - 1, -1, -1):  # backward fill per le righe iniziali
            if pairs[i][1] is None:
                pairs[i][1] = below
            else:
                below = pairs[i][1]
        seen = set()
        for ln, d in pairs:
            if d is not None and d < cutoff:
                continue                        # riga storica: non rifirare per settimane
            for pat, label in LOG_FAIL_PATTERNS:
                if label in seen:
                    continue
                if re.search(pat, ln, re.IGNORECASE):
                    seen.add(label)
                    log_issues.append({
                        "log": name, "tipo": label,
                        "riga": ln.strip()[:200],
                        "data": d.strftime("%Y-%m-%d") if d else "sconosciuta",
                    })

    # Canon guard (regola scalabile): conta le formulazioni vietate
    # "componente recuperato/usato/EUR 0" per V32/VULCAN ancora nel canone.
    canon_violations = 0
    try:
        from AUTOMATIONS.core.canon_guard import scan as _canon_scan
        for _f in EPISODES.rglob("*.md"):
            try: canon_violations += len(_canon_scan(_f.read_text(encoding="utf-8")))
            except Exception: pass
    except Exception:
        pass

    # Orfani di RETE (tesi Konik): note MENTE senza legami nel grafo del vault.
    # Prodotto da vault_intersect; conta solo se l'artefatto e' fresco (<48h).
    vault_orphans = 0
    vault_orphans_top = []
    vo = _read_json(VAULT_ORPHANS, {})
    if vo:
        try:
            fresh = (datetime.now() - datetime.fromisoformat(vo.get("generated", ""))) < timedelta(hours=48)
        except ValueError:
            fresh = False
        if fresh:
            vault_orphans = vo.get("n_orfani", 0)
            vault_orphans_top = [{"stem": o.get("stem"), "domain": o.get("domain")}
                                 for o in vo.get("orfani", [])[:8]]

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
        "canon_violations": canon_violations,
        "vault_orphans": vault_orphans,
        "vault_orphans_top": vault_orphans_top,
    }


# ── GENERAZIONE CRITICHE ────────────────────────────────────────────────────────

SYSTEM_PROMPT = """Sei l'auditor interno di TITANIUM_OS, il sistema operativo personale di Matteo (artigiano industriale + system builder, V32=CNC epoxy-granite, MIMS=moduli, GENESIS=stack AI).
Il tuo compito: la "cartella clinica" del sistema. Non una to-do generica: diagnostica che accende la lampadina.
Ricevi i segnali di salute di stanotte. Produci 3-6 CRITICHE concrete, verificabili, azionabili.
Regole: niente lodi, niente fuffa. Ogni critica = un rischio o un'inefficienza REALE leggibile dai dati. Se i log mostrano guasti, quelli vengono prima.
EVIDENZE: ogni log_issue include la riga esatta ("riga") e la sua data. Cita SOLO ciò che la riga mostra davvero: vietato dire "confermato dai log" o inventare conseguenze (push fallito, commit incompleto) non presenti nell'estratto. Se non hai la riga, il guasto non esiste. Nel finding riporta l'estratto tra virgolette con la data.
Considera anche "bussola_open" (la scaletta da-fare di Matteo): se un todo aperto e' a rischio di essere dimenticato, e' bloccante per altro, o sbloccherebbe valore, emetti UNA critica area "ROADMAP" che lo evidenzi (max 1-2). Non ripetere pari pari il todo: di' perche' conta ORA.
Rispondi SOLO con un array JSON, niente testo attorno. Schema per elemento:
{"area":"RAG|RICERCA|NOTTURNE|RETE|V32|MIMS|GENESIS|SISTEMA|ROADMAP","severity":"alta|media|bassa","finding":"cosa non va, dai dati","azione":"il prossimo passo concreto"}"""


def _parse_critiche_json(txt: str) -> list[dict] | None:
    """Estrae le critiche da una risposta LLM anche se TRONCATA o sporca.
    1) raw_decode dell'array dal primo '[': bilancia le parentesi rispettando le
       stringhe (un ']' dentro un "finding" non taglia più, niente prosa attorno).
    2) se l'array fallisce (troncato dal max_tokens), recupera oggetto-per-oggetto
       i {...} completi; l'ultimo monco lancia e viene scartato (teniamo i buoni)."""
    txt = (txt or "").strip()
    if not txt:
        return None
    txt = re.sub(r"^```(?:json)?\s*|\s*```$", "", txt).strip()   # toglie i fence ```
    dec = json.JSONDecoder()
    lb = txt.find("[")
    if lb >= 0:
        try:
            data, _ = dec.raw_decode(txt, lb)
            if isinstance(data, list):
                return data
        except json.JSONDecodeError:
            pass
    objs, i = [], 0
    while True:
        j = txt.find("{", i)
        if j < 0:
            break
        try:
            obj, end = dec.raw_decode(txt, j)
            i = end
            if isinstance(obj, dict):
                objs.append(obj)
        except json.JSONDecodeError:
            break   # oggetto troncato a metà: stop, teniamo i precedenti
    return objs or None


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
            model=MODEL, max_tokens=2500, system=SYSTEM_PROMPT,
            messages=[{"role": "user",
                       "content": "Segnali di stanotte:\n" + json.dumps(signals, ensure_ascii=False, indent=2)}],
        )
        txt = resp.content[0].text if resp.content else ""
        data = _parse_critiche_json(txt)
        if not data:
            logger.warning("audit LLM: risposta vuota o non parsabile -> fallback a regole")
            return None
        return data
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
    if signals.get("canon_violations", 0) > 0:
        out.append({"area": "CANONE", "severity": "media",
                    "finding": f"{signals['canon_violations']} formulazioni vietate "
                               f"'componente recuperato/usato/EUR 0' (V32/VULCAN) negli episodi.",
                    "azione": "Lanciare AUTOMATIONS/tools/fix_recuperato_canon.py --apply "
                              "(o estendere AUTOMATIONS/core/canon_guard.py se è una frase nuova)."})
    if signals.get("vault_orphans", 0) > 5:
        n = signals["vault_orphans"]
        es = ", ".join(f"{o['stem']} ({o['domain']})" for o in signals.get("vault_orphans_top", [])[:3])
        out.append({"area": "RETE",
                    "severity": "media" if n > 15 else "bassa",
                    "finding": f"{n} note MENTE isolate nel grafo (0 legami): sapere scollegato "
                               f"o indice/MOC stantio" + (f" — es. {es}." if es else "."),
                    "azione": "Aggiornare _CANONE.md/indici o aggiungere wikilink, poi rilanciare "
                              "CONTENT_ENGINE/scripts/vault_intersect.py."})
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
    new_cids = set()
    added = 0
    for c in new:
        cid = _cid(c)
        new_cids.add(cid)
        if cid in by_id:
            by_id[cid]["last_seen"] = TODAY          # ri-osservata stanotte
            if by_id[cid].get("status") != "open":   # era chiusa -> il guasto è tornato: RIAPRI
                by_id[cid]["status"] = "open"
                by_id[cid].pop("resolved_on", None)
                by_id[cid].pop("resolved_by", None)
            continue
        by_id[cid] = {
            "id": cid, "date": TODAY, "git": signals["git_head"],
            "area": c.get("area", "SISTEMA"), "severity": c.get("severity", "media"),
            "finding": c.get("finding", ""), "azione": c.get("azione", ""),
            "fonte": signals.get("_fonte", "auto-audit"),
            "status": "open", "last_seen": TODAY,
        }
        added += 1
    # AUTO-CLOSE: una critica "open" non ri-osservata in questo giro e ferma da
    # AUTO_CLOSE_DAYS giorni è considerata risolta (il log è tornato pulito). Non si
    # cancella — resta nello storico come resolved e RIAPRE da sola se il guasto torna.
    close_cutoff = (datetime.now() - timedelta(days=AUTO_CLOSE_DAYS)).strftime("%Y-%m-%d")
    auto_closed = 0
    for c in by_id.values():
        if (c.get("status") == "open" and c["id"] not in new_cids
                and c.get("last_seen", c.get("date", "")) < close_cutoff):
            c["status"] = "resolved"
            c["resolved_on"] = TODAY
            c["resolved_by"] = f"auto: non più osservata da {AUTO_CLOSE_DAYS}+ giorni"
            auto_closed += 1
    merged = sorted(by_id.values(), key=lambda x: (x["date"], x["id"]), reverse=True)
    CRITICHE.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding="utf-8")
    return {"added": added, "auto_closed": auto_closed,
            "total": len(merged), "open": sum(1 for c in merged if c.get("status") == "open")}


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
        "vault_orphans": signals.get("vault_orphans", 0),
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
    logger.info("done — critiche +%d, auto-chiuse %d (tot %d, aperte %d) | verdict %s",
                stats["added"], stats.get("auto_closed", 0), stats["total"], stats["open"],
                "ATTENZIONE" if signals["log_issues"] else "OK")


if __name__ == "__main__":
    main()
