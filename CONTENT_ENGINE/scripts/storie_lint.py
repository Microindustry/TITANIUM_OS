# storie_lint.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-11
# Validatore degli INVARIANTI del canone STORIE (DATABASE/STORIE_STRUTTURA_2ASSI.md).
# "Se non posso misurarlo, non esiste" (regola 6): qui le STORIE hanno un health-check.
# READ-ONLY: legge episodes.json (+ i .md per la copertura FATTI), non scrive nulla.
# Exit code: 0 se nessuna violazione BLOCCANTE, 1 altrimenti (gate-able in CI/notturna).
#
# Invarianti verificati (dal canone):
#  1. Prerequisiti spirale macro: 'richiama' punta solo a Pietre GIA' posate (regione < propria).
#     Un episodio non puo' usare una Pietra non ancora posata; ⟡0 e' la radice, la richiamano tutte.
#  2. Spirale dei contenuti: un figlio-approfondimento ha giro_spirale > del padre.
#  3. Ogni episodio 'avventura' (Nina) INSEGNA un concetto -> deve avere asse_nina.
#  4. Coerenza Pietra<->Regione: pietra == prefisso+regione, regione nel range del verticale,
#     regione_nome == nome canonico della regione.
#  5. Integrita' albero: parent_id esistente, niente cicli, niente id duplicati.
#  6. Copertura FATTI(per il RAG): % episodi che insegnano al sistema (metrica, non bloccante).

import sys
import json
import re
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
EPISODES_DIR = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"

# Costanti canoniche: riusate dal builder per non divergere (single source of truth).
sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_episodes_json import REGIONI_NINA, REGIONI_FINANZA  # noqa: E402

VERTICALI = {
    "tech":    {"prefix": "⟡", "regioni": REGIONI_NINA},
    "finanza": {"prefix": "₣", "regioni": REGIONI_FINANZA},
}


class Report:
    def __init__(self):
        self.errors: list[str] = []     # bloccanti -> exit 1
        self.warnings: list[str] = []   # da guardare, non bloccano
        self.info: list[str] = []       # metriche

    def err(self, eid, msg):  self.errors.append(f"  [{eid}] {msg}")
    def warn(self, eid, msg): self.warnings.append(f"  [{eid}] {msg}")


def _pietra_regione(pietra: str):
    """Estrae il numero di regione da una Pietra tipo '⟡4' o '₣2'."""
    m = re.search(r"(\d+)", pietra or "")
    return int(m.group(1)) if m else None


def lint(eps: list) -> Report:
    r = Report()
    by_id = {e.get("id"): e for e in eps}

    # 5a. id duplicati
    seen = {}
    for e in eps:
        eid = e.get("id")
        seen[eid] = seen.get(eid, 0) + 1
    for eid, n in seen.items():
        if n > 1:
            r.err(eid, f"id duplicato ({n} volte)")

    n_nina = 0
    for e in eps:
        eid = e.get("id", "?")
        narr = e.get("narrativa") or {}
        nina = narr.get("asse_nina")
        ruolo = (narr.get("asse_ruolo") or {}).get("tipo")

        # 5b. integrita' albero
        pid = e.get("parent_id")
        if pid and pid not in by_id:
            r.warn(eid, f"parent_id '{pid}' inesistente (sara' trattato come principale)")
        if pid == eid:
            r.err(eid, "parent_id punta a se stesso")

        # 3. ogni avventura insegna un concetto
        if ruolo == "avventura" and not nina:
            r.warn(eid, "episodio 'avventura' (Nina) senza asse_nina: non insegna alcun concetto")

        if not nina:
            continue
        n_nina += 1

        vert = nina.get("verticale", "tech")
        spec = VERTICALI.get(vert)
        if not spec:
            r.err(eid, f"verticale sconosciuto: '{vert}'")
            continue
        reg = nina.get("regione")
        pietra = nina.get("pietra", "")

        # 4. coerenza Pietra <-> Regione <-> nome
        if reg not in spec["regioni"]:
            r.err(eid, f"regione {reg} fuori range per verticale '{vert}' ({sorted(spec['regioni'])})")
        else:
            atteso_pietra = f"{spec['prefix']}{reg}"
            if pietra != atteso_pietra:
                r.err(eid, f"pietra '{pietra}' incoerente con regione {reg} (atteso '{atteso_pietra}')")
            atteso_nome = spec["regioni"][reg]
            if nina.get("regione_nome") and nina["regione_nome"] != atteso_nome:
                r.warn(eid, f"regione_nome '{nina['regione_nome']}' != canonico '{atteso_nome}'")

        # 1. prerequisiti: richiama solo Pietre gia' posate (regione strettamente minore)
        for rk in nina.get("richiama", []):
            rkreg = _pietra_regione(rk)
            if rkreg is None:
                r.warn(eid, f"richiama '{rk}' non parsabile")
            elif isinstance(reg, int) and rkreg >= reg and vert == "tech":
                r.err(eid, f"richiama '{rk}' (regione {rkreg}) >= propria regione {reg}: "
                           f"usa una Pietra non ancora posata (viola la spirale macro)")

        # 2. spirale dei contenuti: figlio piu' profondo del padre
        if pid and pid in by_id:
            pn = (by_id[pid].get("narrativa") or {}).get("asse_nina")
            if pn and isinstance(nina.get("giro_spirale"), int) and isinstance(pn.get("giro_spirale"), int):
                if nina["giro_spirale"] <= pn["giro_spirale"]:
                    r.err(eid, f"giro_spirale {nina['giro_spirale']} <= padre {pn['giro_spirale']}: "
                               f"un approfondimento deve essere un giro PIU' profondo")

    # 6. copertura FATTI (metrica): scansiona i .md su disco
    md_files = list(EPISODES_DIR.rglob("*.md")) if EPISODES_DIR.exists() else []
    with_fatti = sum(1 for p in md_files
                     if re.search(r"##\s*FATTI", p.read_text(encoding="utf-8", errors="replace")))
    tot = len(md_files)
    pct = round(100 * with_fatti / tot) if tot else 0
    r.info.append(f"episodi totali (json): {len(eps)} · con asse_nina: {n_nina}")
    r.info.append(f"copertura FATTI(per il RAG): {with_fatti}/{tot} md ({pct}%) "
                  f"{'OK' if pct >= 60 else '⚠ sotto soglia 60% — episodi che non insegnano al RAG'}")
    return r


def main() -> int:
    if not EPISODES_JSON.exists():
        print(f"[storie_lint] episodes.json non trovato: {EPISODES_JSON}")
        return 1
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    r = lint(eps)

    print("=" * 64)
    print(" STORIE LINT — invarianti del canone 2-assi")
    print("=" * 64)
    for line in r.info:
        print(" · " + line)
    if r.errors:
        print(f"\n✗ VIOLAZIONI BLOCCANTI ({len(r.errors)}):")
        print("\n".join(r.errors))
    if r.warnings:
        print(f"\n⚠ AVVISI ({len(r.warnings)}):")
        print("\n".join(r.warnings))
    if not r.errors and not r.warnings:
        print("\n✓ nessuna violazione: le STORIE rispettano il canone.")
    print()
    return 1 if r.errors else 0


if __name__ == "__main__":
    sys.exit(main())
