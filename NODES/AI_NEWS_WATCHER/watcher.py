# watcher.py | TITANIUM_OS / NODES / AI_NEWS_WATCHER | v1.0 | 2026-06-07
# Monitor AI-news a tier (48h/settimanale/sospesi) — keyless.
# Sorgenti v1: GitHub (via gh CLI, gia' autenticato), YouTube (RSS nativo), siti (RSS/Atom).
# Instagram: rimandato (no API pubblica). YouTube-stats/Gemini: upgrade quando ci sara' la chiave.
# Stato: DATA/ai_news_watcher_state.json (separato da BRAIN/STATE.json). Vedi BRAIN/AI_NEWS_WATCHER_BRIEF.md

import os
import re
import sys
import os
import json
import time
import argparse
import subprocess
from pathlib import Path
from datetime import datetime, timezone, timedelta
from xml.etree import ElementTree as ET

import requests

# Fix encoding Windows cp1252
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE))
try:
    from CORE.log import get_logger
    logger = get_logger("ai_news_watcher")
except Exception:
    import logging
    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s [ai_news_watcher] %(levelname)s %(message)s")
    logger = logging.getLogger("ai_news_watcher")

STATE_PATH = BASE / "DATA" / "ai_news_watcher_state.json"
MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
DIGEST_PATH = MENTE / "KNOWLEDGE" / "AI_NEWS_RECENTI.md"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) TITANIUM_OS-watcher"}


def write_digest(st: dict):
    """Scrive un digest leggibile dei segnali recenti in MENTE/KNOWLEDGE -> entra nel
    vault Obsidian + RAG (la ricerca notturna, che gira dopo, lo indicizza). Cosi'
    l'agente NON lavora a vuoto: gli 'aggiornamenti AI da integrare' atterrano dove si
    vedono (vault, ricerca semantica, brief)."""
    crit = (st.get("criticita") or [])[:40]
    out = ["# 📡 AI News — aggiornamenti AI da integrare",
           "",
           "*Generato dall'AI News Watcher (notturno): segnali recenti dai creator/repo AI seguiti. "
           "`da_valutare` = da guardare e decidere se integrare nel progetto.*",
           f"*Aggiornato: {_today()} · {len(crit)} segnali.*",
           ""]
    if not crit:
        out.append("_nessun segnale recente (sorgenti in cooldown o nulla di nuovo)._")
    else:
        for c in crit:
            url = c.get("url", "")
            titolo = (c.get("sintesi") or "(senza titolo)").strip()
            link = f"[{titolo}]({url})" if url else titolo
            out.append(f"- `{c.get('visto_il','')}` **{c.get('fonte','')}** — {link}")
    try:
        DIGEST_PATH.parent.mkdir(parents=True, exist_ok=True)
        DIGEST_PATH.write_text("\n".join(out), encoding="utf-8")
        logger.info("digest AI news -> %s (%d segnali)", DIGEST_PATH, len(crit))
    except Exception as e:
        logger.warning("digest non scritto: %s", e)

TIER_HOURS = {1: 48, 2: 168, 3: None}  # 3 = sospeso

# Roster di default (dalla lista creator del brief). Solo handle risolvibili keyless.
# kind: github | youtube | site. Per youtube si accetta channel_id o @handle (lo risolvo).
DEFAULT_SOURCES = [
    # --- GitHub (priorita' alta: agenti/builder + italiani) ---
    {"name": "safishamsi (Graphify)", "kind": "github", "handle": "safishamsi", "tier": 1},
    {"name": "Cole Medin",            "kind": "github", "handle": "coleam00",   "tier": 1},
    {"name": "AI Jason",              "kind": "github", "handle": "JayZeeDesign","tier": 1},
    {"name": "Simon Willison",        "kind": "github", "handle": "simonw",      "tier": 1},
    {"name": "Eugene Yan",            "kind": "github", "handle": "eugeneyan",   "tier": 2},
    {"name": "Karpathy",              "kind": "github", "handle": "karpathy",    "tier": 1},
    {"name": "Sabrina Ramonov",       "kind": "github", "handle": "SabrinaRamonov", "tier": 2},
    {"name": "Matthew Berman",        "kind": "github", "handle": "TheMattBerman","tier": 2},
    {"name": "LangChain",             "kind": "github", "handle": "langchain-ai","tier": 2},
    # --- GitHub topics (repo nuovi/aggiornati su temi chiave) ---
    {"name": "topic:claude-code",     "kind": "github_topic", "handle": "claude-code", "tier": 1},
    {"name": "topic:ai-agents",       "kind": "github_topic", "handle": "ai-agents",   "tier": 2},
    # --- Siti / blog (RSS/Atom pubblici) ---
    {"name": "Anthropic News",        "kind": "site", "handle": "https://www.anthropic.com/news", "tier": 1},
    {"name": "Simon Willison",        "kind": "site", "handle": "https://simonwillison.net/atom/everything/", "tier": 2},
    {"name": "LangChain Blog",        "kind": "site", "handle": "https://blog.langchain.dev/rss/", "tier": 2},
    {"name": "Latent Space",          "kind": "site", "handle": "https://www.latent.space/feed", "tier": 2},
    # --- YouTube (RSS nativo; @handle risolto a channel_id) ---
    {"name": "Fireship",              "kind": "youtube", "handle": "@Fireship", "tier": 2},
    {"name": "Matt Wolfe",            "kind": "youtube", "handle": "@mreflow",  "tier": 2},
]


# ── STATO ───────────────────────────────────────────────────────────────────
def load_state() -> dict:
    if STATE_PATH.exists():
        try:
            st = json.loads(STATE_PATH.read_text(encoding="utf-8"))
        except Exception as ex:
            logger.warning("stato illeggibile (%s) — riparto pulito", ex)
            st = {}
    else:
        st = {}
    st.setdefault("meta", {"version": "1.0.0", "created": _today()})
    st.setdefault("config", {
        "tiers": {f"tier{t}": {"frequency_hours": h} for t, h in TIER_HOURS.items()},
        "rotation": {
            "promote_t2_to_t1": "2+ criticita' rilevanti in 2 settimane",
            "demote_t1_to_t2": "nessun segnale per 3 settimane",
            "demote_t2_to_t3": "nessun segnale per 6 settimane",
        },
    })
    st.setdefault("sources", [])
    st.setdefault("criticita", [])
    # merge roster di default (per handle) senza sovrascrivere lo stato runtime
    by_handle = {(s.get("kind"), s.get("handle")): s for s in st["sources"]}
    for d in DEFAULT_SOURCES:
        key = (d["kind"], d["handle"])
        if key not in by_handle:
            st["sources"].append({**d, "added": _now_iso(), "last_check": None,
                                  "last_seen": [], "signals": []})
    return st


def save_state(st: dict):
    st["meta"]["last_run"] = _now_iso()
    STATE_PATH.write_text(json.dumps(st, ensure_ascii=False, indent=2), encoding="utf-8")


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _today() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def _due(src: dict, force: bool) -> bool:
    """La sorgente va controllata? (rispetta la frequenza del tier)."""
    tier = int(src.get("tier", 2))
    hours = TIER_HOURS.get(tier)
    if hours is None:
        return False  # tier 3 sospeso
    if force or not src.get("last_check"):
        return True
    try:
        last = datetime.fromisoformat(src["last_check"])
    except Exception:
        return True
    return datetime.now(timezone.utc) - last >= timedelta(hours=hours)


# ── SORGENTI ────────────────────────────────────────────────────────────────
def gh_json(endpoint: str, jq: str | None = None) -> list | dict | None:
    """Chiama la GitHub API via gh CLI (auth keyring, nessuna chiave)."""
    cmd = ["gh", "api", endpoint]
    if jq:
        cmd += ["--jq", jq]
    try:
        out = subprocess.run(cmd, capture_output=True, text=True, timeout=30,
                             encoding="utf-8", errors="replace")
        if out.returncode != 0:
            logger.warning("[gh] %s -> %s", endpoint, (out.stderr or "").strip()[:160])
            return None
        txt = out.stdout.strip()
        if not txt:
            return None
        if jq:  # con --jq puo' tornare piu' oggetti riga-per-riga
            return [json.loads(l) for l in txt.splitlines() if l.strip()]
        return json.loads(txt)
    except Exception as ex:
        logger.warning("[gh] %s: %s", endpoint, ex)
        return None


def fetch_github_user(handle: str) -> list[dict]:
    """Eventi pubblici significativi di un utente: release, repo nuovi, repo resi pubblici."""
    events = gh_json(f"users/{handle}/events/public") or []
    items = []
    for e in events[:30]:
        et = e.get("type")
        repo = (e.get("repo") or {}).get("name", "?")
        when = e.get("created_at", "")
        if et == "ReleaseEvent":
            rel = (e.get("payload") or {}).get("release") or {}
            items.append({"id": f"rel:{rel.get('id')}", "title": f"{repo}: release {rel.get('tag_name','')}",
                          "url": rel.get("html_url") or f"https://github.com/{repo}", "date": when})
        elif et == "CreateEvent" and (e.get("payload") or {}).get("ref_type") == "repository":
            items.append({"id": f"repo:{repo}", "title": f"nuovo repo: {repo}",
                          "url": f"https://github.com/{repo}", "date": when})
        elif et == "PublicEvent":
            items.append({"id": f"pub:{repo}", "title": f"repo reso pubblico: {repo}",
                          "url": f"https://github.com/{repo}", "date": when})
    return items


def fetch_github_topic(topic: str) -> list[dict]:
    """Repo aggiornati di recente su un topic (proxy di 'trending' senza API dedicata)."""
    data = gh_json(f"search/repositories?q=topic:{topic}&sort:updated&per_page=15"
                   .replace("&sort:updated", "+sort:updated"))
    # endpoint corretto: search/repositories?q=topic:X sort:updated
    if not data:
        data = gh_json(f"search/repositories?q=topic:{topic}%20sort:updated&per_page=15")
    items = []
    for r in (data or {}).get("items", [])[:15]:
        stars = r.get("stargazers_count", 0)
        items.append({"id": f"topic:{r.get('id')}",
                      "title": f"{r.get('full_name')} ★{stars} — {(r.get('description') or '')[:80]}",
                      "url": r.get("html_url"), "date": r.get("updated_at", ""),
                      "stars": stars})
    return items


def _parse_feed(xml_text: str) -> list[dict]:
    """Parser RSS 2.0 + Atom (stdlib, nessuna dipendenza)."""
    items = []
    try:
        root = ET.fromstring(xml_text)
    except Exception:
        return items
    # RSS 2.0
    for it in root.iter():
        tag = it.tag.split("}")[-1]
        if tag == "item":
            t = it.findtext("title") or ""
            link = it.findtext("link") or ""
            guid = it.findtext("guid") or link
            date = it.findtext("pubDate") or ""
            items.append({"id": guid.strip(), "title": t.strip(), "url": link.strip(), "date": date.strip()})
    if items:
        return items
    # Atom
    ns = "{http://www.w3.org/2005/Atom}"
    for e in root.findall(f"{ns}entry"):
        t = (e.findtext(f"{ns}title") or "").strip()
        link_el = e.find(f"{ns}link")
        link = (link_el.get("href") if link_el is not None else "") or ""
        eid = (e.findtext(f"{ns}id") or link).strip()
        date = (e.findtext(f"{ns}updated") or e.findtext(f"{ns}published") or "").strip()
        items.append({"id": eid, "title": t, "url": link, "date": date})
    return items


def fetch_site(url: str) -> list[dict]:
    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        r.raise_for_status()
        return _parse_feed(r.text)[:15]
    except Exception as ex:
        logger.warning("[site] %s: %s", url, ex)
        return []


def _resolve_youtube_channel_id(handle: str) -> str | None:
    """Risolve @handle / URL canale -> channelId (UC...) leggendo la pagina (keyless).
    YouTube serve una consent-page ai bot: serve UA browser + cookie CONSENT/SOCS."""
    if handle.startswith("UC"):
        return handle
    url = handle if handle.startswith("http") else f"https://www.youtube.com/{handle}"
    yt_headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
    }
    try:
        r = requests.get(url, headers=yt_headers, cookies={"CONSENT": "YES+1", "SOCS": "CAI"}, timeout=20)
        m = re.search(r'"channelId":"(UC[0-9A-Za-z_-]{22})"', r.text) or \
            re.search(r'(UC[0-9A-Za-z_-]{22})', r.text)
        return m.group(1) if m else None
    except Exception as ex:
        logger.warning("[youtube] resolve %s: %s", handle, ex)
        return None


def fetch_youtube(src: dict) -> list[dict]:
    cid = src.get("channel_id") or _resolve_youtube_channel_id(src["handle"])
    if not cid:
        return []
    src["channel_id"] = cid  # cache nel sorgente
    feed = f"https://www.youtube.com/feeds/videos.xml?channel_id={cid}"
    return fetch_site(feed)


# ── PASSATA ─────────────────────────────────────────────────────────────────
FETCHERS = {
    "github": lambda s: fetch_github_user(s["handle"]),
    "github_topic": lambda s: fetch_github_topic(s["handle"]),
    "site": lambda s: fetch_site(s["handle"]),
    "youtube": fetch_youtube,
}


def run_once(force: bool = False, only_kind: str | None = None) -> dict:
    st = load_state()
    new_total, checked = 0, 0
    for src in st["sources"]:
        if only_kind and src.get("kind") != only_kind:
            continue
        if not _due(src, force):
            continue
        fetch = FETCHERS.get(src.get("kind"))
        if not fetch:
            continue
        checked += 1
        items = fetch(src) or []
        seen = set(src.get("last_seen") or [])
        fresh = [it for it in items if it.get("id") and it["id"] not in seen]
        # aggiorna finestra "viste" (cap 200)
        src["last_seen"] = ([it["id"] for it in items] + list(seen))[:200]
        src["last_check"] = _now_iso()
        if fresh:
            src["signals"] = ([_now_iso()] + (src.get("signals") or []))[:20]
            for it in fresh[:8]:
                st["criticita"].insert(0, {
                    "id": f"{src['kind']}:{src['handle']}:{it['id']}"[:120],
                    "fonte": src["name"],
                    "url": it.get("url", ""),
                    "sintesi": it.get("title", "")[:200],
                    "rilevanza": "da_valutare",
                    "stato": "nuovo",
                    "tier": src.get("tier"),
                    "visto_il": _today(),
                })
            new_total += len(fresh)
            logger.info("[%s] %s -> %d nuovi", src["kind"], src["name"], len(fresh))
    st["criticita"] = st["criticita"][:300]
    _apply_rotation(st)
    save_state(st)
    write_digest(st)   # surfacing: i segnali atterrano in MENTE (vault + RAG + brief)
    logger.info("Passata: %d sorgenti controllate, %d segnali nuovi.", checked, new_total)
    return {"checked": checked, "new": new_total}


def _apply_rotation(st: dict):
    """Rotazione tier in base ai segnali recenti (finestre del brief).
    Guard: si retrocede SOLO se la sorgente e' tracciata da almeno quella finestra
    (una sorgente appena aggiunta non viene punita per mancanza di storia)."""
    now = datetime.now(timezone.utc)
    def recent(signals, weeks):
        cut = now - timedelta(weeks=weeks)
        return [s for s in (signals or []) if _safe_dt(s) and _safe_dt(s) >= cut]
    def tracked_weeks(s):
        a = _safe_dt(s.get("added") or "")
        return (now - a).days / 7 if a else 0
    for s in st["sources"]:
        sig = s.get("signals") or []
        tier = int(s.get("tier", 2))
        age = tracked_weeks(s)
        if tier == 2 and len(recent(sig, 2)) >= 2:
            s["tier"] = 1; logger.info("PROMOSSO a Tier1: %s", s["name"])
        elif tier == 1 and age >= 3 and not recent(sig, 3):
            s["tier"] = 2; logger.info("Retrocesso a Tier2: %s", s["name"])
        elif tier == 2 and age >= 6 and not recent(sig, 6):
            s["tier"] = 3; logger.info("Sospeso (Tier3): %s", s["name"])


def _safe_dt(s):
    try:
        return datetime.fromisoformat(s)
    except Exception:
        return None


def main():
    ap = argparse.ArgumentParser(description="AI News Watcher (tier, keyless)")
    ap.add_argument("--force", action="store_true", help="ignora la frequenza dei tier")
    ap.add_argument("--kind", choices=list(FETCHERS), help="limita a un tipo di sorgente")
    ap.add_argument("--list", action="store_true", help="elenca le criticita' aperte e basta")
    args = ap.parse_args()
    if args.list:
        st = load_state()
        for c in st["criticita"][:30]:
            print(f"  [{c.get('stato')}] {c.get('fonte')}: {c.get('sintesi')}  {c.get('url')}")
        return
    res = run_once(force=args.force, only_kind=args.kind)
    print(f"OK — {res['checked']} sorgenti, {res['new']} segnali nuovi. Stato: {STATE_PATH}")


if __name__ == "__main__":
    main()
