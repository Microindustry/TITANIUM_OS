# remap_pilot_2assi.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v0.1 | 2026-06-10
# SPIKE additivo: aggiunge il campo 'narrativa' (asse_ruolo + asse_nina) a 5 episodi pilota.
# NON tocca nessun campo esistente. Idempotente: rilanciabile, sovrascrive solo 'narrativa'
# dei 5 id elencati. Schema in DATABASE/STORIE_STRUTTURA_2ASSI.md, allineato a MAPPA_AVVENTURA.md.

import sys
import json
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"

REGIONI = {
    1: "LA TRACCIA", 2: "L'OFFICINA CHE GIRA SOLA", 3: "LA MENTE CHE PARLA",
    4: "LA BIBLIOTECA DELLE FONTI", 5: "LA GRANDE MAPPA",
    6: "L'ESERCITO SILENZIOSO", 7: "IL DIRETTORE",
}


def nina(concetto, regione, giro, richiama, stato):
    return {
        "concetto": concetto,
        "regione": regione,
        "regione_nome": REGIONI[regione],
        "pietra": f"⟡{regione}",
        "giro_spirale": giro,
        "richiama": richiama,
        "stato_nina": stato,
    }


# id -> blocco narrativa (vedi tabella PILOTA nel canone)
PILOTA = {
    "EP_SEED_CONTROLLO": {
        "asse_ruolo": {"tipo": "sistema", "fase_sistema": "GENESIS"},
        "asse_nina": nina("un posto solo per governare il disordine", 7, 1, [], "fonte"),
    },
    "EP_SEED_WATCHER": {
        "asse_ruolo": {"tipo": "sistema", "fase_sistema": "GENESIS"},
        "asse_nina": nina("stare informati senza farlo a mano", 2, 2, ["⟡1"], "fonte"),
    },
    "EP_SEED_GRAPHIFY": {
        "asse_ruolo": {"tipo": "sistema", "fase_sistema": "GENESIS"},
        "asse_nina": nina("la mappa della conoscenza", 5, 1, ["⟡4"], "fonte"),
    },
    "EP_SEED_RETE": {
        "asse_ruolo": {"tipo": "sistema", "fase_sistema": "GENESIS"},
        "asse_nina": nina("vedere il sistema come una mappa", 5, 2, ["⟡4"], "fonte"),
    },
    "EP_AV_00": {
        "asse_ruolo": {"tipo": "avventura"},
        "asse_nina": nina("il Grande Loop", 1, 1, [], "adattato"),
    },
}


def main():
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    by_id = {e.get("id"): e for e in eps}
    done, missing = [], []
    for eid, narr in PILOTA.items():
        e = by_id.get(eid)
        if not e:
            missing.append(eid)
            continue
        e["narrativa"] = narr          # additivo: unico campo toccato
        done.append(eid)

    EPISODES_JSON.write_text(json.dumps(eps, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"narrativa aggiunta a {len(done)} episodi pilota:")
    for d in done:
        r = PILOTA[d]["asse_nina"]
        print(f"  {d}: ruolo={PILOTA[d]['asse_ruolo']['tipo']} | "
              f"Reg {r['regione']} {r['pietra']} '{r['concetto']}' giro {r['giro_spirale']} ({r['stato_nina']})")
    if missing:
        print("ATTENZIONE id non trovati:", missing)


if __name__ == "__main__":
    main()
