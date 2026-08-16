# genesis_db.py | TITANIUM_OS / CORE / GENESIS | v1.0 | 2026-08-16
# S1 della scala GENESIS (BRAIN/SCALA-GENESIS.md): lo SCHELETRO RELAZIONALE di GENESIS.
#
# PERCHE': oggi lo stato di GENESIS vive sparso (JSON, .md, dashboard). Le domande
# "quanti agenti ha il dipartimento X", "quanto e' costato il run di stanotte",
# "quali skill sono a schedule" non hanno una risposta unica. Qui c'e' lo schema che
# la da'. Ispirato a FounderOS-DEMO (MIT, clone read-only in ARCHIVE/REFERENCE/founderos),
# ridotto all'osso: SCARTATO tutto il blocco social/funnel/broadcast/persona/metric.
#
# DIFFERENZE volute rispetto a FounderOS:
#   - agents.parent_id  -> gerarchia RICORSIVA (lead -> specialist -> worker). In
#     FounderOS la gerarchia e' implicita nel tier: qui e' un vero albero navigabile.
#   - agent_runs        -> + model, tokens_in/out, cost_usd (S6: "quanto costa GENESIS
#     al giorno"). In FounderOS il run non porta il costo.
#   - FOREIGN KEY dichiarate e ATTIVE (PRAGMA foreign_keys=ON): l'integrita' la tiene
#     il database, non la buona volonta' di chi scrive.
#
# NB: STATE.json RESTA SEPARATO. E' handoff di CONTESTO (il racconto per la sessione
# dopo), non stato strutturato. Non si fondono: lo dice la scala a S2.
#
# Nessuna dipendenza nuova: sqlite3 e' nella stdlib.
#   python CORE/genesis_db.py --init    crea/aggiorna il .db (idempotente)
#   python CORE/genesis_db.py --info    mostra tabelle e conteggi

from __future__ import annotations

import os
import sqlite3
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
DB_PATH = Path(os.environ.get("GENESIS_DB", str(BASE / "DATA" / "genesis.db")))

SCHEMA_VERSION = 1

# Le 8 tabelle. Niente social, niente funnel: quello di FounderOS non ci serve.
DDL = """
-- 1. i 6 dipartimenti reali (V32, MIMS, VITA-NATURA, FIT-PARK, FINANZE, OFFICINA)
CREATE TABLE IF NOT EXISTS departments (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  slug     TEXT NOT NULL UNIQUE,
  tagline  TEXT NOT NULL DEFAULT '',
  color    TEXT NOT NULL DEFAULT '',
  ord      INTEGER NOT NULL DEFAULT 0
);

-- 2. gli agenti, ad ALBERO: parent_id punta al lead che li coordina
CREATE TABLE IF NOT EXISTS agents (
  id            TEXT PRIMARY KEY,
  department_id TEXT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  parent_id     TEXT     REFERENCES agents(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT '',
  tier          TEXT NOT NULL CHECK (tier IN ('lead','specialist','worker')),
  status        TEXT NOT NULL DEFAULT 'planned'
                CHECK (status IN ('planned','building','active','paused','retired')),
  description   TEXT NOT NULL DEFAULT '',
  model         TEXT NOT NULL DEFAULT '',
  entrypoint    TEXT NOT NULL DEFAULT ''   -- script/comando che lo esegue davvero
);
CREATE INDEX IF NOT EXISTS ix_agents_dept   ON agents(department_id);
CREATE INDEX IF NOT EXISTS ix_agents_parent ON agents(parent_id);

-- 3. ogni esecuzione, col suo costo (S6: quanto costa GENESIS al giorno)
CREATE TABLE IF NOT EXISTS agent_runs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id    TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  started_at  TEXT NOT NULL,
  finished_at TEXT,
  ok          INTEGER NOT NULL DEFAULT 0,
  model       TEXT NOT NULL DEFAULT '',
  tokens_in   INTEGER NOT NULL DEFAULT 0,
  tokens_out  INTEGER NOT NULL DEFAULT 0,
  cost_usd    REAL    NOT NULL DEFAULT 0.0,
  summary     TEXT    NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS ix_runs_agent ON agent_runs(agent_id, started_at);

-- 4. cosa ha in mano un agente
CREATE TABLE IF NOT EXISTS agent_tasks (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id   TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'todo'
             CHECK (status IN ('todo','doing','blocked','done','dropped')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_tasks_agent ON agent_tasks(agent_id, status);

-- 5. gli orari: e' qui che si legge chi lavora di notte
CREATE TABLE IF NOT EXISTS agent_crons (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id    TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  schedule    TEXT NOT NULL,              -- cron, oppure il nome del task di Windows
  description TEXT NOT NULL DEFAULT '',
  enabled     INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_crons_agent ON agent_crons(agent_id);

-- 6. cosa sa fare il sistema (S7: una skill parte da sola)
CREATE TABLE IF NOT EXISTS skills (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  category       TEXT NOT NULL DEFAULT '',
  description    TEXT NOT NULL DEFAULT '',
  owner_agent_id TEXT REFERENCES agents(id) ON DELETE SET NULL,
  status         TEXT NOT NULL DEFAULT 'planned'
                 CHECK (status IN ('planned','building','active','retired')),
  path           TEXT NOT NULL DEFAULT '',   -- dove vive davvero (file/skill)
  ord            INTEGER NOT NULL DEFAULT 0
);

-- 7. le procedure: il lavoro ripetibile, con i suoi passi
CREATE TABLE IF NOT EXISTS sop_tasks (
  id            TEXT PRIMARY KEY,
  department_id TEXT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  summary       TEXT NOT NULL DEFAULT '',
  steps         TEXT NOT NULL DEFAULT '[]', -- JSON: lista di passi
  assignee_kind TEXT NOT NULL DEFAULT 'agent'
                CHECK (assignee_kind IN ('agent','human')),
  assignee_id   TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS ix_sop_dept ON sop_tasks(department_id);

-- 8. gli strumenti (S5: "N/M systems live" deve dire il vero)
CREATE TABLE IF NOT EXISTS tools (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'planned'
              CHECK (status IN ('planned','configured','live','down','retired')),
  description TEXT NOT NULL DEFAULT '',
  probe       TEXT NOT NULL DEFAULT ''   -- come si verifica che sia VIVO, non "configurato"
);
"""

TABLES = ["departments", "agents", "agent_runs", "agent_tasks",
          "agent_crons", "skills", "sop_tasks", "tools"]


def connect(db_path: Path | str | None = None) -> sqlite3.Connection:
    """Connessione con le FK ATTIVE (sqlite le tiene spente di default) e le righe
    accessibili per nome. Ogni accesso al db passa da qui."""
    path = Path(db_path or DB_PATH)
    path.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(str(path))
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA foreign_keys = ON")
    con.execute("PRAGMA journal_mode = WAL")   # letture concorrenti (dashboard + notturne)
    return con


def init(db_path: Path | str | None = None) -> Path:
    """Crea (o completa) il database. IDEMPOTENTE: rieseguibile senza danni."""
    path = Path(db_path or DB_PATH)
    with connect(path) as con:
        con.executescript(DDL)
        con.execute(f"PRAGMA user_version = {SCHEMA_VERSION}")
        con.commit()
    return path


def info(db_path: Path | str | None = None) -> dict:
    """Tabelle presenti e quante righe hanno. Serve a dire 'gira' con un numero."""
    path = Path(db_path or DB_PATH)
    out: dict = {"db": str(path), "exists": path.exists()}
    if not path.exists():
        return out
    with connect(path) as con:
        out["schema_version"] = con.execute("PRAGMA user_version").fetchone()[0]
        presenti = {r["name"] for r in con.execute(
            "SELECT name FROM sqlite_master WHERE type='table'")}
        out["tables"] = {t: (con.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
                             if t in presenti else None) for t in TABLES}
    return out


if __name__ == "__main__":
    if "--info" in sys.argv:
        d = info()
        print(f"db: {d['db']}  esiste={d['exists']}")
        if d.get("exists"):
            print(f"schema_version: {d['schema_version']}")
            for t, n in d["tables"].items():
                print(f"  {t:<14} {'MANCA' if n is None else str(n) + ' righe'}")
    else:
        p = init()
        d = info(p)
        mancanti = [t for t, n in d["tables"].items() if n is None]
        print(f"genesis_db init -> {p}")
        print(f"  tabelle: {len(TABLES) - len(mancanti)}/{len(TABLES)}"
              + (f"  MANCANTI: {mancanti}" if mancanti else "  (tutte)"))
