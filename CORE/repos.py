# repos.py | TITANIUM_OS / CORE / GENESIS | v1.0 | 2026-08-27
# S3 della scala GENESIS (BRAIN/SCALA-GENESIS.md): il REPOSITORY LAYER.
#
# PERCHE': a S1 e S2 la SQL era gia' sparsa in due file (genesis_db.info,
# genesis_seed.seed, la CTE dell'albero). Con due file si convive; con dieci nodi
# che leggono il db, no: la stessa domanda si scrive in cinque modi leggermente
# diversi e nessuno sa piu' qual e' quella giusta. Qui la SQL vive UNA volta.
#
# REGOLA DEL GRADINO: fuori da questo file non ci sono SELECT.
#   Verifica:  grep -rn "SELECT" --include=*.py CORE/ | grep -v repos.py   -> vuoto
#
# CONTRATTO: ogni funzione riceve una CONNESSIONE gia' aperta (quella di
# genesis_db.connect, che tiene le FK attive e row_factory=Row). repos NON apre
# connessioni e NON sa dove sta il file .db: e' un layer di query, non di sessione.
# Cosi' resta usabile dentro una transazione altrui — il seed conta le righe
# PRIMA del commit e deve vedere la propria scrittura.
#
# NOMI DI TABELLA: SQLite non permette di parametrizzare un identificatore, quindi
# il nome finisce per forza in una f-string. Per questo esiste TABELLE: e' la
# whitelist, e conteggio() rifiuta tutto cio' che non e' in lista. E' l'unico punto
# del layer dove un nome entra nel testo della query.

from __future__ import annotations

import sqlite3

# Le 8 tabelle dello schema (S1). Fonte unica: genesis_db le importa da qui.
TABELLE: list[str] = [
    "departments", "agents", "agent_runs", "agent_tasks",
    "agent_crons", "skills", "sop_tasks", "tools",
]

# Query ricorsiva: e' la prova del gradino S2 — l'albero torna dal database,
# non da una struttura ricostruita in Python.
ALBERO_SQL = """
WITH RECURSIVE albero(id, name, tier, department_id, parent_id, livello, via) AS (
    SELECT id, name, tier, department_id, parent_id, 0, name
      FROM agents WHERE parent_id IS NULL
  UNION ALL
    SELECT a.id, a.name, a.tier, a.department_id, a.parent_id,
           al.livello + 1, al.via || ' > ' || a.name
      FROM agents a JOIN albero al ON a.parent_id = al.id
)
SELECT al.livello, al.name, al.tier, d.name AS dipartimento, al.via
  FROM albero al JOIN departments d ON d.id = al.department_id
 ORDER BY d.ord, al.via
"""


def schema_version(con: sqlite3.Connection) -> int:
    """PRAGMA user_version: la versione dello schema scritta da genesis_db.init."""
    return con.execute("PRAGMA user_version").fetchone()[0]


def tabelle_presenti(con: sqlite3.Connection) -> set[str]:
    """I nomi delle tabelle che esistono davvero nel file .db."""
    return {r["name"] for r in con.execute(
        "SELECT name FROM sqlite_master WHERE type='table'")}


def conteggio(con: sqlite3.Connection, tabella: str) -> int:
    """Righe di una tabella. Il nome DEVE essere in TABELLE: non e'
    pignoleria, e' l'unico modo di mettere un identificatore in una query
    senza aprire la porta a un'iniezione."""
    if tabella not in TABELLE:
        raise ValueError(f"tabella sconosciuta: {tabella!r} (attese: {', '.join(TABELLE)})")
    return con.execute(f"SELECT COUNT(*) FROM {tabella}").fetchone()[0]


def conteggi(con: sqlite3.Connection, tabelle: list[str] | None = None) -> dict:
    """Conteggi in blocco. Una tabella dichiarata ma non ancora creata vale None
    (e' il caso di un .db vecchio: si distingue 'zero righe' da 'tabella assente')."""
    presenti = tabelle_presenti(con)
    return {t: (conteggio(con, t) if t in presenti else None)
            for t in (tabelle or TABELLE)}


def albero(con: sqlite3.Connection) -> list[sqlite3.Row]:
    """L'organigramma ad albero, risolto dal database con una CTE ricorsiva."""
    return con.execute(ALBERO_SQL).fetchall()
