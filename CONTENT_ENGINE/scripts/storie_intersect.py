# storie_intersect.py | TITANIUM_OS / CONTENT_ENGINE | v1.0 | 2026-06-13
# Interseca gli episodi fra loro: da lista piatta a RETE narrativa.
# Calcola relazioni TIPIZZATE fra episodi (perche' due episodi si toccano) e le scrive
# nel campo `collegati` di episodes.json. setup_obsidian le trasforma in wikilink nel vault
# (cosi' il grafo di Obsidian connette gli episodi) e la dashboard puo' mostrarle.
#
# Tipi di legame (il "perche'", non solo il "che"):
#   stessa_regione  - stessa Pietra/Regione di Nina (⟡X)            [forte]
#   prerequisito    - questo richiama una Pietra che l'altro POSA   [forte, direzionale]
#   evoluzione      - stesso concetto a giro di spirale diverso     [forte: l'asse evolutivo]
#   approfondisce   - relazione albero parent/child (N-livelli)     [forte]
#   continuita      - stessa stagione, episodi adiacenti nel tempo  [medio: il flusso-storia]
#   tema            - >=2 tag specifici condivisi                   [medio]
#
# Rebuild-safe: ricalcola tutto a ogni run, sovrascrive `collegati`. Idempotente.
# Uso: python CONTENT_ENGINE/scripts/storie_intersect.py [--max N]  (default 6 legami/episodio)

import json, sys, argparse
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"

# Tag troppo generici: non creano un legame "di tema" significativo (collegerebbero tutto)
TAG_STOP = {"sistema", "titanium_os", "titanium", "auto", "episodio", "avventura",
            "educativo", "bambini", "nina", "genesis", "v32", "mims", "build", "ai",
            "dev-log", "devlog", "automazione", "content", "storie"}


def _nina(e):  # asse_nina o {}
    return (e.get("narrativa") or {}).get("asse_nina") or {}


def _tags(e):
    return {str(t).lower().strip() for t in (e.get("tags") or [])} - TAG_STOP


def _date(e):
    try:
        return datetime.strptime(e.get("data_evento", "")[:10], "%Y-%m-%d")
    except Exception:
        return None


def compute(eps, max_links=6):
    by_id = {e["id"]: e for e in eps}
    # indice per pietra (chi POSA una pietra = chi la insegna, giro piu' basso prima)
    pietra_eps = {}
    for e in eps:
        n = _nina(e)
        p = n.get("pietra")
        if p:
            pietra_eps.setdefault(p, []).append(e)
    for p in pietra_eps:
        pietra_eps[p].sort(key=lambda e: _nina(e).get("giro_spirale", 9))

    out = {}
    for e in eps:
        eid = e["id"]
        n = _nina(e)
        cand = {}  # other_id -> (score, tipo, motivo)

        def add(oid, score, tipo, motivo):
            if oid == eid or oid not in by_id:
                return
            if oid not in cand or score > cand[oid][0]:
                cand[oid] = (score, tipo, motivo)

        # 1) stessa Regione/Pietra
        my_p = n.get("pietra")
        if my_p:
            for o in pietra_eps.get(my_p, []):
                if o["id"] != eid:
                    rn = n.get("regione_nome") or my_p
                    add(o["id"], 5, "stessa_regione", f"stessa Regione {my_p} ({rn})")

        # 2) prerequisito: io richiamo una Pietra che un altro posa
        for rp in (n.get("richiama") or []):
            for o in pietra_eps.get(rp, [])[:2]:
                add(o["id"], 6, "prerequisito", f"posa la Pietra {rp} che questo richiama")

        # 3) evoluzione: stesso concetto, giro diverso (l'asse evolutivo del sapere)
        my_concept = (n.get("concetto") or "").strip().lower()
        my_giro = n.get("giro_spirale")
        if my_concept:
            for o in eps:
                on = _nina(o)
                if o["id"] != eid and (on.get("concetto") or "").strip().lower() == my_concept:
                    og = on.get("giro_spirale")
                    if og is not None and my_giro is not None and og != my_giro:
                        verso = "approfondisce" if og > my_giro else "alla base di"
                        add(o["id"], 6, "evoluzione", f"evoluzione del concetto (giro {my_giro}↔{og}, {verso})")
                    else:
                        add(o["id"], 5, "evoluzione", "stesso concetto")

        # 4) albero N-livelli (parent/children)
        pid = e.get("parent_id")
        if pid:
            t = by_id.get(pid, {}).get("title", pid)
            add(pid, 7, "approfondisce", f"approfondimento di «{t}»")
        for cid in (e.get("children") or []):
            t = by_id.get(cid, {}).get("title", cid)
            add(cid, 6, "approfondito_da", f"approfondito da «{t}»")

        # 5) tema: tag specifici condivisi (>=2)
        my_tags = _tags(e)
        if my_tags:
            for o in eps:
                if o["id"] == eid:
                    continue
                shared = my_tags & _tags(o)
                if len(shared) >= 2:
                    add(o["id"], 2 + len(shared), "tema", "tema: " + ", ".join(sorted(shared)[:3]))

        # 6) continuita nell'ARCO della stagione: lega l'episodio ai suoi VICINI nella
        #    sequenza (sempre, anche se distanti anni). Cosi' gli archi biografici (S0/S1,
        #    Origine->Taverna->...->Verdetto) si concatenano e nessun episodio resta isolato.
        season = sorted([o for o in eps if o.get("stagione") == e.get("stagione") and _date(o)],
                        key=_date)
        sids = [o["id"] for o in season]
        if eid in sids:
            i = sids.index(eid)
            if i > 0:
                add(season[i - 1]["id"], 3, "continuita", "continua da (arco della stagione)")
            if i < len(sids) - 1:
                add(season[i + 1]["id"], 3, "continuita", "porta a (arco della stagione)")

        # ordina per score, taglia
        ranked = sorted(cand.items(), key=lambda kv: -kv[1][0])[:max_links]
        out[eid] = [{"id": oid, "title": by_id[oid].get("title", oid),
                     "tipo": tipo, "motivo": motivo}
                    for oid, (score, tipo, motivo) in ranked]
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max", type=int, default=6, help="max legami per episodio")
    args = ap.parse_args()

    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    links = compute(eps, args.max)

    total = 0
    for e in eps:
        e["collegati"] = links.get(e["id"], [])
        total += len(e["collegati"])

    EPISODES_JSON.write_text(json.dumps(eps, ensure_ascii=False, indent=2), encoding="utf-8")

    # statistiche
    isolati = sum(1 for e in eps if not e["collegati"])
    per_tipo = {}
    for e in eps:
        for c in e["collegati"]:
            per_tipo[c["tipo"]] = per_tipo.get(c["tipo"], 0) + 1
    print(f"INTERSEZIONE: {total} legami su {len(eps)} episodi (media {total/len(eps):.1f}/ep)")
    print(f"episodi ancora isolati: {isolati}")
    print("per tipo:", ", ".join(f"{k}={v}" for k, v in sorted(per_tipo.items(), key=lambda x: -x[1])))


if __name__ == "__main__":
    main()
