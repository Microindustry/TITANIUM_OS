# queue_refill.py | TITANIUM_OS / CAROSELLI_AGENT | v1.0 | 2026-07-16
# RIEMPIMENTO AUTOMATICO della coda dell'apprendista (ONDATA A/A2, finding #2).
# La coda si estendeva A MANO dai piani: al 16/07 restavano 5 pending -> l'apprendista
# sarebbe morto il ~21/07. Qui la coda si rifornisce da sola leggendo il piano di
# produzione (MENTE), appendendo i prossimi episodi mancanti finche' i pending
# raggiungono TARGET_PENDING. MAI tocca item esistenti (promossi/bozze/pending).
#
# I PORTANTI (aperture di capitolo, spesso con cameo Nina) NON sono bulletati come
# EP_SG_NN_MM nel piano: parsando solo le righe-episodio restano fuori per costruzione.
# In piu' si salta esplicitamente ogni riga che nomina il cameo Nina.

import json
import os
import re
from pathlib import Path

BASE  = Path(__file__).resolve().parents[2]
QUEUE = BASE / "DATA" / "caroselli_queue.json"
MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
PIANO = MENTE / "STORIE" / "SG_GIORNO0" / "_PIANO_PRODUZIONE.md"

TARGET_PENDING = 8   # quanti "pending" tenere pronti in coda (soglia di rifornimento)
TOPLABEL       = "TITANIUM OS · IL SISTEMA — STAGIONE 1"

_CAP_RE = re.compile(r"^###\s+(CAP\s+\d+[^\n—]*?)\s*(?:—|-)", re.I)
_EP_RE  = re.compile(r"^-\s+(?:\[[^\]]*\]\s*)?(EP_SG_\d+_\d+)\s+(.+?)\s*$")
_HINT_RE = re.compile(r"\*\((.+?)\)\*")


def _parse_plan(text: str) -> list[dict]:
    """Estrae gli episodi bulletati dal piano, in ordine, con capitolo e hint."""
    out, cap = [], ""
    for line in text.splitlines():
        mc = _CAP_RE.match(line)
        if mc:
            cap = mc.group(1).strip()
            continue
        me = _EP_RE.match(line)
        if not me:
            continue
        ep_id, rest = me.group(1), me.group(2)
        # cameo Nina / portante: fuori dalla corsia notturna
        if re.search(r"cameo\s+nina", rest, re.I):
            continue
        hint = ""
        mh = _HINT_RE.search(rest)
        if mh:
            hint = mh.group(1).strip()
            rest = rest[:mh.start()].strip()
        title = rest.strip(" *")
        out.append({"id": ep_id, "title": title, "cap": cap, "hint": hint})
    return out


def _to_item(ep: dict) -> dict:
    """Costruisce un item-coda 'pending' da una voce di piano (angolo+query derivati)."""
    hint = ep["hint"]
    queries = [ep["title"]]
    if hint:
        # gli hint sono tipo "EP_S0_04, cavallo di Troia EP_S0_07": una query ciascuno
        queries += [h.strip() for h in re.split(r"[·,;]", hint) if h.strip()]
    angolo = (f"{ep['title']} — capitolo «{ep['cap']}». "
              f"Aggancio alle fonti: {hint or ep['title']}. "
              "Attieniti SOLO ai fatti del dossier; stato reale obbligatorio, "
              "mai numeri/percentuali di progetto come fatti.")
    return {
        "id": ep["id"],
        "title": ep["title"],
        "cap": ep["cap"],
        "angolo": angolo,
        "toplabel": TOPLABEL,
        "queries": queries[:3],
        "status": "pending",
        "_auto_refill": True,   # traccia che l'angolo e' derivato (revisione umana lo affina)
    }


def ensure_pending(target: int = TARGET_PENDING) -> dict:
    """Rifornisce la coda dai piani finche' i pending >= target. Additivo, idempotente.
    Ritorna un report {added, pending_before, pending_after, ids}."""
    if not QUEUE.exists() or not PIANO.exists():
        return {"added": 0, "reason": "coda o piano assenti", "pending_after": 0}
    queue = json.loads(QUEUE.read_text(encoding="utf-8"))
    items = queue.setdefault("items", [])
    known = {i.get("id") for i in items}
    pending_before = sum(1 for i in items if i.get("status") == "pending")

    plan = _parse_plan(PIANO.read_text(encoding="utf-8"))
    added_ids = []
    pending = pending_before
    for ep in plan:
        if pending >= target:
            break
        if ep["id"] in known:
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
    print(f"[queue_refill] +{rep['added']} pending "
          f"({rep.get('pending_before', '?')} -> {rep.get('pending_after', '?')}): "
          f"{', '.join(rep.get('ids', [])) or '(niente da aggiungere)'}")
