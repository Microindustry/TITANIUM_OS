# fix_recuperato_canon.py | TITANIUM_OS / AUTOMATIONS / tools | v1.0 | 2026-06-22
# Consolida il canone (episodi + MENTE) togliendo le formulazioni VIETATE
# "componente/asset recuperato/usato/EUR 0" per V32/VULCAN — regola Matteo:
# mai "recuperato/usato", sempre specifica tecnica + logica progettuale.
# Sostituzioni CURATE (esatte): NON tocca gli usi legittimi di "recupero"
# (recupero episodi/storie/dati, "usato git", "modello usato", ecc.).
# Dry-run di default; --apply per scrivere. Idempotente.

import sys
from pathlib import Path

sys.path.insert(0, r"C:\Users\teo\TITANIUM_OS")
from AUTOMATIONS.core.canon_guard import PAIRS  # fonte UNICA della regola

ROOTS = [
    Path(r"C:\Users\teo\TITANIUM_OS\CONTENT_ENGINE\DATABASE\episodes"),
    Path(r"C:\Users\teo\MICROINDUSTRY\MENTE"),
]

_UNUSED_OLD_PAIRS = [
    # --- Categoria A: spec componente, basta togliere "recuperato" ---
    ("Un PLC Siemens S7-314C recuperato", "Un PLC Siemens S7-314C industriale"),
    ("PLC Siemens S7-314C recuperato",    "PLC Siemens S7-314C industriale"),
    ("Un PLC recuperato",                 "Un PLC industriale Siemens S7-314C"),
    ("un PLC recuperato",                 "un PLC industriale Siemens S7-314C"),
    ("TP900 Comfort recuperato",          "TP900 Comfort industriale"),
    ("componenti recuperati",             "componenti industriali selezionati"),
    ("Tutto recupero, tutto EUR 0 di hardware.",
     "Tutti componenti industriali reali, zero spesa hardware aggiuntiva."),
    ("Costo hardware: EUR 0 (recupero).",
     "Spesa hardware aggiuntiva: EUR 0 (componenti industriali gia' in dotazione)."),
    # --- Categoria B: framing economico "recuperato" (ROI) ---
    ("asset da €11.749 di valore recuperato",
     "asset dal valore equivalente a nuovo di €11.749"),
    ("Asset recuperato dichiarato = €11.749",
     "Valore equivalente a nuovo = €11.749"),
    ("asset recuperato **€9.499 (81%)**",
     "valore equivalente a nuovo non speso **€9.499 (81%)**"),
    ("Recuperato €9.499 (81%). Investimento €2.250. Asset €11.749.",
     "Valore equivalente a nuovo €11.749. Investimento reale €2.250 (19%)."),
]


def main():
    apply = "--apply" in sys.argv
    changed_files = 0
    total_hits = 0
    for root in ROOTS:
        if not root.exists():
            continue
        for f in root.rglob("*.md"):
            try:
                txt = f.read_text(encoding="utf-8")
            except Exception:
                continue
            orig = txt
            file_hits = []
            for old, new in PAIRS:
                if old in txt:
                    n = txt.count(old)
                    txt = txt.replace(old, new)
                    file_hits.append((n, old, new))
            if file_hits:
                changed_files += 1
                print(f"\n=== {f} ===")
                for n, old, new in file_hits:
                    total_hits += n
                    print(f"  [{n}x] '{old[:60]}...' -> '{new[:60]}...'")
                if apply and txt != orig:
                    f.write_text(txt, encoding="utf-8")
    mode = "APPLICATE" if apply else "DRY-RUN (nessuna modifica)"
    print(f"\n--- {mode}: {total_hits} sostituzioni in {changed_files} file ---")


if __name__ == "__main__":
    main()
