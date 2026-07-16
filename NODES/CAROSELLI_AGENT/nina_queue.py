# nina_queue.py | TITANIUM_OS / CAROSELLI_AGENT | v1.0 | 2026-07-16
# CODA DELLA CORSIA NINA (ONDATA B, attacco #2 finding #4).
# I 53 testi EP_N2 del cammino ESISTONO GIA' come canone (episodes/S_AVVENTURA/):
# la corsia notturna non li INVENTA, li impagina. Qui la coda si rifornisce da sola
# scandendo i testi 'ready' che non hanno ancora un carosello in CAROSELLI/NINA/.
# Additivo/idempotente: mai tocca item esistenti, mai gli EP con carosello promosso.

import json
import re
from pathlib import Path

BASE     = Path(__file__).resolve().parents[2]
QUEUE    = BASE / "DATA" / "caroselli_nina_queue.json"
TESTI    = BASE / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S_AVVENTURA"
CAROSELLI_NINA = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI" / "NINA"

TARGET_PENDING = 8
TOPLABEL       = "IL MONDO DI NINA · IL CAMMINO"

_ID_RE      = re.compile(r"(EP_N2_\d+)", re.I)
_H1_RE      = re.compile(r"^#\s+EP_N2_\d+\s*[—–-]\s*(.+?)\s*$", re.M)
_CASELLA_RE = re.compile(r"[Cc]asella\s+(\d+)")
_STATUS_RE  = re.compile(r"^status:\s*(\w+)", re.M)


def _has_carosello(ep_id: str) -> bool:
    return (CAROSELLI_NINA / ep_id).is_dir()


def _parse(path: Path) -> dict | None:
    m = _ID_RE.search(path.name)
    if not m:
        return None
    ep_id = m.group(1).upper()
    text  = path.read_text(encoding="utf-8", errors="replace")
    st = _STATUS_RE.search(text)
    if not st or st.group(1).lower() != "ready":
        return None
    h1 = _H1_RE.search(text)
    title = h1.group(1).strip() if h1 else ep_id
    cas = _CASELLA_RE.search(text)
    casella = int(cas.group(1)) if cas else None
    return {"id": ep_id, "title": title,
            "text_path": str(path.relative_to(BASE)),
            "casella": casella}


def _to_item(ep: dict) -> dict:
    return {
        "id": ep["id"],
        "title": ep["title"],
        "casella": ep["casella"],
        "text_path": ep["text_path"],
        "toplabel": TOPLABEL,
        "status": "pending",
    }


def ensure_pending(target: int = TARGET_PENDING) -> dict:
    """Rifornisce la coda Nina dai testi canonici 'ready' senza carosello, in ordine
    numerico, finche' i pending >= target. Ritorna {added, pending_after, ids}."""
    QUEUE.parent.mkdir(parents=True, exist_ok=True)
    queue = json.loads(QUEUE.read_text(encoding="utf-8")) if QUEUE.exists() else {
        "note": "Coda della corsia Nina (night_caroselli_nina). status: pending -> "
                "bozza_verde/bozza_falle. Input = testo EP_N2 canonico (niente invenzione). "
                "Si rifornisce da nina_queue.ensure_pending.",
        "items": [],
    }
    items = queue.setdefault("items", [])
    known = {i.get("id") for i in items}
    pending_before = sum(1 for i in items if i.get("status") == "pending")

    def num(p: Path) -> int:
        m = re.search(r"EP_N2_(\d+)", p.name)
        return int(m.group(1)) if m else 0

    added_ids, pending = [], pending_before
    for path in sorted(TESTI.glob("EP_N2_*.md"), key=num):
        if pending >= target:
            break
        ep = _parse(path)
        if ep is None or ep["id"] in known or _has_carosello(ep["id"]):
            continue
        items.append(_to_item(ep))
        known.add(ep["id"])
        added_ids.append(ep["id"])
        pending += 1

    if added_ids:
        QUEUE.write_text(json.dumps(queue, ensure_ascii=False, indent=2), encoding="utf-8")
    return {"added": len(added_ids), "pending_before": pending_before,
            "pending_after": pending, "ids": added_ids}


if __name__ == "__main__":
    rep = ensure_pending()
    print(f"[nina_queue] +{rep['added']} pending "
          f"({rep['pending_before']} -> {rep['pending_after']}): "
          f"{', '.join(rep['ids']) or '(niente da aggiungere)'}")
