# generate_restart_prompt.py | TITANIUM_OS / AUTOMATIONS / core | v2.0 (delegator) | 2026-05-31
# DEPRECATO come generatore autonomo. Scriveva su Desktop/RIAVVIO_SESSIONE.txt
# (che NESSUNO legge all'avvio sessione) con una lista "pendenti" hardcoded stale.
#
# Ora delega allo script CANONICO root (TITANIUM_OS/generate_restart_prompt.py),
# che scrive TITANIUM_OS/RIAVVIO_SESSIONE.txt — l'unico file letto dal protocollo
# di inizio sessione — ed e' self-healing (deriva da git se session_context e' stale).
#
# Mantenuto solo per retrocompat: qualsiasi vecchio chiamante ottiene il comportamento giusto.

import runpy
import sys
from pathlib import Path

CANONICAL = Path(__file__).resolve().parents[2] / "generate_restart_prompt.py"


def main():
    if not CANONICAL.exists():
        print(f"[restart_prompt] ERRORE: script canonico non trovato: {CANONICAL}", file=sys.stderr)
        sys.exit(1)
    print(f"[restart_prompt] delego a script canonico: {CANONICAL}")
    runpy.run_path(str(CANONICAL), run_name="__main__")


if __name__ == "__main__":
    main()
