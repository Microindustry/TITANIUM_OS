# fuori_lettura.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-09-27
"""
FONTE UNICA dei file che stanno FUORI dal percorso di lettura (R4, sessione #73).

Sono archivi: servono quando cerchi il *perche'*, non per orientarti. Se restano
negli indici il peso non e' sparito, e' solo cambiato di file (nel grafo graphify
del 24/09 ABBIAMO_FATTO pesava 78 nodi e la bussola 6).

Chi la usa:
  - sync_dashboard.py  -> genera .graphifyignore (graphify)
  - semantic_indexer.py -> salta questi file (ricerca SQLite /api/search)
Il RAG (search_mente) non li vede comunque: indicizza solo MENTE/, non il repo.
A inizio sessione non si leggono: lo dice CLAUDE.md (protocollo) e l'hook SessionStart.
"""

from fnmatch import fnmatch

PATTERN = (
    "ABBIAMO_FATTO.md",       # la storia: ci finisce il taglio della bussola
    "BACKLOG_EREDITATO.md",   # le 193 voci vecchie in quarantena (#72)
    "CRITICHE_CHIUSE.md",     # critiche risolte (K2)
    "DA_FARE_FATTO.md",       # cartello del vecchio nome della bussola (R7)
    "DOCS/_archivio_*",       # piani e liste archiviati
)


def fuori_lettura(rel_path: str) -> bool:
    """True se il path (relativo alla root del repo) e' un archivio da non leggere."""
    p = rel_path.replace("\\", "/")
    if p.startswith("./"):
        p = p[2:]
    return any(fnmatch(p, pat) for pat in PATTERN)
