# storie_evoluzione.py | TITANIUM_OS / CONTENT_ENGINE | v1.0 | 2026-06-13
# Organizza gli episodi PER EVOLUZIONE: l'asse del tempo + la spirale dei concetti.
# Mentre storie_intersect collega per TEMA/Regione (rete), questo li ordina per
# COME SI E' EVOLUTO il sapere: fase del filone, filo precede->segue nel tempo,
# spirale (stesso concetto a giri crescenti), e decisioni che cambiano (aggiorna).
#
# Scrive `evoluzione` in ogni episodio di episodes.json:
#   fase        - atto del filone (I Materia · II Secondo Cervello · III Mente che Impara · IV Mondo · ₣ Valore · Diario)
#   precede/segue - episodio prima/dopo nello stesso filo (stesso concetto se Nina, sennò stessa stagione)
#   spirale     - catena {id,giro} dello stesso concetto a profondita' crescente (l'evoluzione vera)
#   aggiorna/superato_da - stesso concetto, giro piu' alto e data dopo = evolve il precedente
#
# Rebuild-safe / idempotente. Uso: python CONTENT_ENGINE/scripts/storie_evoluzione.py

import json
import sys
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"

# Pietra -> atto del filone "dal metallo alla mente"
FASE_PIETRA = {
    "⟡0": "I · La Materia",
    "⟡1": "II · Il Secondo Cervello", "⟡2": "II · Il Secondo Cervello",
    "⟡3": "III · La Mente che Impara", "⟡4": "III · La Mente che Impara",
    "⟡5": "III · La Mente che Impara", "⟡6": "III · La Mente che Impara",
    "⟡7": "IV · Il Mondo",
}
FASE_DEFAULT_RUOLO = {
    "origine": "I · La Materia", "costruzione": "I · La Materia",
    "presente": "Diario del Sistema", "sistema": "Diario del Sistema",
    "auto": "Diario del Sistema", "momento": "Diario del Sistema",
    "avventura": "IV · Il Mondo",
}
FASE_ORDER = ["I · La Materia", "II · Il Secondo Cervello", "III · La Mente che Impara",
              "IV · Il Mondo", "₣ · Il Valore (Finanza)", "Diario del Sistema"]


def _nina(e):
    return (e.get("narrativa") or {}).get("asse_nina") or {}


def _ruolo(e):
    return (e.get("narrativa") or {}).get("asse_ruolo") or {}


def _date(e):
    try:
        return datetime.strptime(e.get("data_evento", "")[:10], "%Y-%m-%d")
    except Exception:
        return datetime.min


def fase_of(e):
    n = _nina(e)
    if n.get("verticale") == "finanza":
        return "₣ · Il Valore (Finanza)"
    p = n.get("pietra")
    if p and p in FASE_PIETRA:
        return FASE_PIETRA[p]
    return FASE_DEFAULT_RUOLO.get(_ruolo(e).get("tipo"), "Diario del Sistema")


def compute(eps):
    by_id = {e["id"]: e for e in eps}

    # 1) fase per ognuno
    for e in eps:
        e.setdefault("evoluzione", {})
        e["evoluzione"] = {"fase": fase_of(e)}

    # 2) spirale: concetto -> episodi ordinati per giro,data
    concept_eps = {}
    for e in eps:
        c = (_nina(e).get("concetto") or "").strip().lower()
        if c:
            concept_eps.setdefault(c, []).append(e)
    for c, lst in concept_eps.items():
        lst.sort(key=lambda e: (_nina(e).get("giro_spirale", 9), _date(e)))
        catena = [{"id": e["id"], "title": e.get("title", e["id"]),
                   "giro": _nina(e).get("giro_spirale")} for e in lst]
        for i, e in enumerate(lst):
            ev = e["evoluzione"]
            if len(catena) > 1:
                ev["spirale"] = catena
            # aggiorna/superato_da fra giri consecutivi (l'evoluzione del concetto)
            if i > 0:
                prev = lst[i - 1]
                ev["aggiorna"] = {"id": prev["id"], "title": prev.get("title", prev["id"]),
                                  "motivo": f"evolve «{prev.get('title','')}» (giro {_nina(prev).get('giro_spirale')}→{_nina(e).get('giro_spirale')})"}
                prev["evoluzione"].setdefault("superato_da", {
                    "id": e["id"], "title": e.get("title", e["id"]),
                    "motivo": f"approfondito da «{e.get('title','')}» (giro {_nina(e).get('giro_spirale')})"})

    # 3) filo temporale precede/segue: dentro lo stesso concetto (Nina) o stagione (diario)
    def thread_key(e):
        c = (_nina(e).get("concetto") or "").strip().lower()
        return ("nina:" + c) if c else ("stag:" + str(e.get("stagione", "")))

    threads = {}
    for e in eps:
        threads.setdefault(thread_key(e), []).append(e)
    for k, lst in threads.items():
        lst.sort(key=_date)
        for i, e in enumerate(lst):
            ev = e["evoluzione"]
            if i > 0:
                p = lst[i - 1]
                ev["precede"] = {"id": p["id"], "title": p.get("title", p["id"])}
            if i < len(lst) - 1:
                nx = lst[i + 1]
                ev["segue"] = {"id": nx["id"], "title": nx.get("title", nx["id"])}

    return eps


def main():
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    compute(eps)
    EPISODES_JSON.write_text(json.dumps(eps, ensure_ascii=False, indent=2), encoding="utf-8")

    # statistiche
    import collections
    fasi = collections.Counter(e["evoluzione"]["fase"] for e in eps)
    spirali = sum(1 for e in eps if e["evoluzione"].get("spirale"))
    aggiorna = sum(1 for e in eps if e["evoluzione"].get("aggiorna"))
    print(f"EVOLUZIONE: {len(eps)} episodi organizzati")
    print("  per fase del filone:")
    for f in FASE_ORDER:
        if fasi.get(f):
            print(f"    {f}: {fasi[f]}")
    print(f"  episodi in una spirale (concetto a piu' giri): {spirali}")
    print(f"  passaggi evolutivi (aggiorna/approfondisce): {aggiorna}")


if __name__ == "__main__":
    main()
