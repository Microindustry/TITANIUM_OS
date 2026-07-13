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
import os
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
CANONE_MANUALE  = AUDIT_DIR / "critiche_manuali.json"  # canone manuale vivo (#54, ex criticheData.ts)
CANONE_STALE_DAYS = 30  # file canone fermo da N giorni -> segnale (organo silenzioso)

# Canone del VAULT (#54, attacco 07 P1): la "verita' unica" MENTE/_CANONE.md va sorvegliata
MENTE_DIR = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
CANONE_VAULT_STALE_DAYS = 14  # _CANONE.md fermo da N giorni con la serie che genera ogni notte = deriva

# Organi vivi (#54 ondata C — lezione guasto 7: la notturna morta 11 giorni in silenzio):
# un organo notturno si giudica dall'OUTPUT, non dal processo. Un organo che tace non e'
# sano, e' silenzioso. (nome, path, giorni massimi senza scrittura; dir = figlio piu' recente)
ORGANI_VIVI = [
    ("nina-loop",           TI_ROOT / "DATA" / "nina_state.json",             3),
    ("snapshot RAG",        TI_ROOT / "_VAULT" / "BACKUPS" / "rag_snapshots", 3),
    ("inventario notturno", TI_ROOT / "DOCS" / "INVENTARIO_NOTTURNO.md",      3),
    ("retention disco",     TI_ROOT / "DATA" / "retention_last.json",         3),
    ("AI news watcher",     TI_ROOT / "DATA" / "ai_news_watcher_state.json",  4),  # tier 48h
    ("daily brief",         TI_ROOT / "DATA" / "daily_brief_last.md",         3),
    ("riflusso FATTI",      MENTE_DIR / "KNOWLEDGE" / "genesis_nodi_fatti.md", 7),
]

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
        client = anthropic.Anthropic(api_key=api_key, max_retries=4)
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


# QC strutturale episodi (#54 ondata C, attacco 03 F8): QUALITA_BATCH_44 era una
# verifica one-off ferma a EP 20->50; questo copre TUTTO l'arco a ogni notte, e gli
# EP nuovi del loop entrano nel QC da subito. Marker CORE = struttura del template
# (mancarne uno = episodio rotto -> log_issue). L'open-loop e' un caso a parte:
# manca DAVVERO su meta' dell'arco (lavoro-contenuti noto, F2) -> metrica contata,
# niente allarme per notte; il giudizio di merito resta all'LLM dell'audit.
QC_EP_CORE = [
    ("cold-open",  re.compile(r"##\s*COLD OPEN", re.I)),
    ("atti",       re.compile(r"##\s*ATTO I", re.I)),
    ("chiusura",   re.compile(r"##\s*CHIUSURA", re.I)),
    ("provalo-tu", re.compile(r"provalo tu", re.I)),
    ("fatti-rag",  re.compile(r"##\s*FATTI", re.I)),
]
QC_EP_OPEN_LOOP = re.compile(r"open loop", re.I)
QC_EP_MIN_CHARS = 3000

PIP_AUDIT_JSON = AUDIT_DIR / "pip_audit.json"


def check_qc_episodi(signals: dict) -> None:
    """(#54 ondata C, 03 F8) QC strutturale su tutti gli EP_N2 attivi del vault."""
    storie = MENTE_DIR / "STORIE" / "S_AVVENTURA"
    out = {"checked": 0, "structure_fail": 0, "open_loop_missing": 0}
    try:
        for f in sorted(storie.glob("EP_N2_*.md")):
            out["checked"] += 1
            text = f.read_text(encoding="utf-8", errors="replace")
            missing = [n for n, rx in QC_EP_CORE if not rx.search(text)]
            if len(text) < QC_EP_MIN_CHARS:
                missing.append(f"troppo corto ({len(text)} char)")
            if missing:
                out["structure_fail"] += 1
                signals["log_issues"].append({
                    "log": "QC episodi", "tipo": "episodio strutturalmente rotto",
                    "riga": f"{f.name}: mancano {', '.join(missing)}",
                    "data": TODAY,
                })
            if not QC_EP_OPEN_LOOP.search(text):
                out["open_loop_missing"] += 1
    except OSError as e:
        logger.warning("QC episodi saltato: %s", e)
    signals["qc_episodi"] = out


def check_caroselli(signals: dict) -> None:
    """(#57, 13/07) Sentinella regole caroselli: esegue il QC condiviso
    (CONTENT_ENGINE/scripts/caroselli_qc.py = stessa logica del check manuale,
    GUIDA_CAROSELLI.md §5) — file canonici, canvas 1080x1350, slide entro i
    limiti (completo/social IG), anti-wireframe, self-contained."""
    out = {"checked": 0, "issues": 0}
    try:
        sys.path.insert(0, str(TI_ROOT / "CONTENT_ENGINE" / "scripts"))
        from caroselli_qc import run_qc
        rep = run_qc()
        out = {"checked": rep.get("checked", 0), "issues": len(rep.get("issues", []))}
        for msg in rep.get("issues", []):
            signals["log_issues"].append({
                "log": "QC caroselli", "tipo": "regola caroselli violata",
                "riga": msg, "data": TODAY,
            })
    except Exception as e:
        logger.warning("QC caroselli saltato: %s", e)
    signals["qc_caroselli"] = out


def check_pip_audit(signals: dict) -> None:
    """(#54 ondata C, attacco 02 Dep) CVE sulle dipendenze: legge il report
    settimanale di pip-audit (sabato, night_push). Segnala solo le vulnerabilita'
    FIXABILI: lo stack RAG e' pinnato per compatibilita' (torch 2.6+cu124,
    chromadb 0.5.23) e un allarme non-azionabile e' solo rumore."""
    out = {"vulns": 0, "fixable": 0, "packages": []}
    d = _read_json(PIP_AUDIT_JSON, {})
    for dep in (d.get("dependencies") or []):
        vulns = dep.get("vulns") or []
        if not vulns:
            continue
        nfix = sum(1 for v in vulns if v.get("fix_versions"))
        out["vulns"] += len(vulns)
        out["fixable"] += nfix
        if nfix:
            out["packages"].append(f"{dep.get('name')} {dep.get('version')} ({nfix})")
    if out["fixable"]:
        signals["log_issues"].append({
            "log": "pip_audit.json", "tipo": "CVE dipendenze con fix disponibile",
            "riga": f"{out['fixable']} CVE fixabili in {len(out['packages'])} pacchetti: "
                    + ", ".join(out["packages"][:6]),
            "data": TODAY,
        })
    signals["pip_audit"] = out


def check_organi_vivi(signals: dict) -> None:
    """(#54 ondata C) Sentinella organi vivi: eta' dell'ultimo OUTPUT di ogni
    organo notturno (tabella ORGANI_VIVI). Output assente o piu' vecchio della
    soglia -> log_issue -> critica in cartella clinica."""
    out = {}
    now = datetime.now().timestamp()
    for nome, path, max_days in ORGANI_VIVI:
        try:
            if not path.exists():
                out[nome] = None
                signals["log_issues"].append({
                    "log": "organi vivi", "tipo": "organo assente",
                    "riga": f"{nome}: output mai visto ({path.name} non esiste)",
                    "data": TODAY,
                })
                continue
            if path.is_dir():
                mt = max((f.stat().st_mtime for f in path.iterdir()),
                         default=path.stat().st_mtime)
            else:
                mt = path.stat().st_mtime
            age_days = round((now - mt) / 86400, 1)
            out[nome] = age_days
            if age_days > max_days:
                signals["log_issues"].append({
                    "log": "organi vivi", "tipo": "organo silenzioso",
                    "riga": f"{nome}: ultimo output {age_days:g} giorni fa "
                            f"(soglia {max_days}) — {path.name}",
                    "data": TODAY,
                })
        except OSError as e:
            logger.warning("organo %s non leggibile: %s", nome, e)
    signals["organi_vivi"] = out


def check_canone_vault(signals: dict) -> None:
    """(#54, attacco 07 P1) Canone ENFORCED, non solo dichiarato. Due sentinelle:
    1. id-collision: due note ATTIVE (fuori _ARCHIVIO/_PROPOSTI) con lo stesso
       EP-id nel vault = due verita' per lo stesso episodio servite dal RAG
       (successo con EP_N2_01 'bottone' vs 'bambina' — nessuno lo rilevava);
    2. _CANONE.md: fermo da CANONE_VAULT_STALE_DAYS+ O serie EP_N2 su disco oltre
       il massimo che il canone dichiara -> la verita' unica sta derivando
       (la serie si auto-genera ogni notte, il canone no).
    Ogni rottura -> log_issues (diventa critica in cartella clinica)."""
    storie = MENTE_DIR / "STORIE"
    out = {"id_collisions": 0, "canone_age_days": None,
           "max_ep_disco": None, "max_ep_canone": None}
    ep_rx = re.compile(r"^(EP_(?:[A-Z0-9]+_)+?\d+)")

    # 1 — collisioni id tra note attive
    try:
        seen: dict[str, str] = {}
        collisions = []
        if storie.exists():
            for f in sorted(storie.rglob("EP_*.md")):
                if any(p.startswith("_") for p in f.relative_to(storie).parts[:-1]):
                    continue
                m = ep_rx.match(f.stem)
                if not m:
                    continue
                eid = m.group(1).upper()
                if eid in seen:
                    collisions.append(f"{eid} ({seen[eid]} vs {f.name})")
                else:
                    seen[eid] = f.name
        out["id_collisions"] = len(collisions)
        for c in collisions[:5]:
            signals["log_issues"].append({
                "log": "vault STORIE", "tipo": "id-collision canone",
                "riga": f"due note attive per {c} — due verita' nel RAG",
                "data": TODAY,
            })
    except Exception as e:
        logger.warning("check id-collision saltato: %s", e)

    # 2 — freshness/copertura _CANONE.md
    try:
        canone = MENTE_DIR / "_CANONE.md"
        if canone.exists():
            age = (datetime.now() - datetime.fromtimestamp(canone.stat().st_mtime)).days
            out["canone_age_days"] = age
            text = canone.read_text(encoding="utf-8", errors="replace")
            declared = [int(n) for n in re.findall(r"EP_N2_(\d{1,3})", text)]
            declared += [int(m.group(1)) for m in
                         re.finditer(r"EP_N2_\d{1,3}\s*(?:…|\.{2,3})\s*(\d{1,3})", text)]
            out["max_ep_canone"] = max(declared) if declared else None
            disk = []
            if storie.exists():
                for f in storie.rglob("EP_N2_*.md"):
                    if any(p.startswith("_") for p in f.relative_to(storie).parts[:-1]):
                        continue
                    m = re.match(r"EP_N2_(\d{1,3})", f.name)
                    if m:
                        disk.append(int(m.group(1)))
            out["max_ep_disco"] = max(disk) if disk else None
            if age > CANONE_VAULT_STALE_DAYS:
                signals["log_issues"].append({
                    "log": "_CANONE.md", "tipo": "verita' unica stantia",
                    "riga": f"_CANONE.md fermo da {age} giorni (soglia {CANONE_VAULT_STALE_DAYS}) "
                            "mentre la serie si auto-genera ogni notte",
                    "data": TODAY,
                })
            if (out["max_ep_disco"] and out["max_ep_canone"]
                    and out["max_ep_disco"] > out["max_ep_canone"]):
                signals["log_issues"].append({
                    "log": "_CANONE.md", "tipo": "serie oltre il canone dichiarato",
                    "riga": f"su disco EP_N2_{out['max_ep_disco']:02d}, il canone dichiara "
                            f"EP_N2_{out['max_ep_canone']:02d}: aggiornare _CANONE.md",
                    "data": TODAY,
                })
    except Exception as e:
        logger.warning("check freshness _CANONE saltato: %s", e)

    signals["canone_vault"] = out


def check_canone_manuale(signals: dict) -> None:
    """(#54) Riconciliazione canone manuale: conta le critiche attive in
    critiche_manuali.json e misura la freschezza del file. Se il canone e'
    fermo da CANONE_STALE_DAYS+ giorni lo segnala come organo silenzioso
    (lezione guasto 7: cio' che tace non e' sano, va osservato)."""
    out = {"active": 0, "done": 0, "file_age_days": None, "stale": False}
    try:
        if CANONE_MANUALE.exists():
            d = _read_json(CANONE_MANUALE, {})
            def _walk(n):
                if n.get("isLeaf"):
                    st = n.get("status")
                    if st == "active":
                        out["active"] += 1
                    elif st == "done":
                        out["done"] += 1
                for c in n.get("children") or []:
                    _walk(c)
            if isinstance(d.get("root"), dict):
                _walk(d["root"])
            age = (datetime.now() - datetime.fromtimestamp(CANONE_MANUALE.stat().st_mtime)).days
            out["file_age_days"] = age
            if age >= CANONE_STALE_DAYS:
                out["stale"] = True
                signals["log_issues"].append({
                    "log": "critiche_manuali.json", "tipo": "canone critiche stantio",
                    "riga": f"canone manuale fermo da {age} giorni (>{CANONE_STALE_DAYS}) — "
                            f"{out['active']} attive da riverificare", "data": TODAY,
                })
    except Exception as e:
        logger.warning("check canone manuale fallito: %s", e)
    signals["canone_manuale"] = out


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
        "canone_manuale": signals.get("canone_manuale", {}),
        "canone_vault": signals.get("canone_vault", {}),
        "organi_vivi": signals.get("organi_vivi", {}),
        "pip_audit": signals.get("pip_audit", {}),
        "qc_episodi": signals.get("qc_episodi", {}),
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

    check_canone_manuale(signals)
    check_canone_vault(signals)
    check_organi_vivi(signals)
    check_pip_audit(signals)
    check_qc_episodi(signals)
    check_caroselli(signals)
    critiche = critiche_via_llm(signals)
    if critiche is None:
        signals["_fonte"] = "auto-audit (regole)"
        critiche = critiche_via_regole(signals)
    else:
        signals["_fonte"] = f"auto-audit ({MODEL})"

    stats = append_critiche(critiche, signals)
    write_health(signals, stats)
    # CRITICHE.md (#54): la cartella clinica come FILE stile bussola — sostituisce
    # la vista dashboard (eliminata 07/07). Best-effort, si rigenera ogni notte.
    try:
        from AUTOMATIONS.core.critiche_md import write as _critiche_md_write
        _critiche_md_write()
    except Exception as e:
        logger.warning("critiche_md saltato: %s", e)
    logger.info("done — critiche +%d, auto-chiuse %d (tot %d, aperte %d) | verdict %s",
                stats["added"], stats.get("auto_closed", 0), stats["total"], stats["open"],
                "ATTENZIONE" if signals["log_issues"] else "OK")


if __name__ == "__main__":
    main()
