# eva_inbox.py | TITANIUM_OS / NODES / EVA | v0.1 | 2026-06-05
# Inbox degli handoff di EVA: quando EVA passa una richiesta a una persona del
# centro (prenotazione completa, annullamento, fallback), il fatto va registrato
# da qualche parte — altrimenti la richiesta del cliente svanisce.
#
# Ogni handoff e' una riga JSON in DATA/eva/handoffs.jsonl (append-only, robusto):
# l'operatore (o un nodo n8n) puo' leggerlo e richiamare il cliente.
#
# PII (nome cliente, numero WhatsApp) => il file NON e' versionato: DATA/eva/ e'
# gitignored. Path configurabile via EVA_DATA_DIR per test/portabilita'.

import os
import json
from pathlib import Path
from datetime import datetime

NODE_DIR = Path(__file__).resolve().parent
ROOT = NODE_DIR.parents[1]  # .../TITANIUM_OS


def _data_dir() -> Path:
    """Cartella runtime di EVA (gitignored). Override via EVA_DATA_DIR."""
    d = os.environ.get("EVA_DATA_DIR", "").strip()
    base = Path(d) if d else (ROOT / "DATA" / "eva")
    base.mkdir(parents=True, exist_ok=True)
    return base


def _inbox_path() -> Path:
    return _data_dir() / "handoffs.jsonl"


def record_handoff(record: dict) -> dict:
    """Appende un handoff alla inbox. Aggiunge ts/status se mancanti.

    record tipico: {sender, intent, reply, slots?}. Ritorna il record salvato.
    Non solleva: se la scrittura fallisce, ritorna comunque il record (best-effort).
    """
    rec = dict(record or {})
    rec.setdefault("ts", datetime.now().isoformat(timespec="seconds"))
    rec.setdefault("status", "nuovo")  # nuovo -> in_carico -> chiuso (gestito a mano/n8n)
    try:
        line = json.dumps(rec, ensure_ascii=False)
        with _inbox_path().open("a", encoding="utf-8") as fh:
            fh.write(line + "\n")
    except OSError:
        pass
    return rec


def read_handoffs(limit: int | None = None, status: str | None = None) -> list[dict]:
    """Legge gli handoff (piu' recenti per ultimi). Filtra per status se dato.
    Righe corrotte vengono saltate, non bloccano la lettura."""
    p = _inbox_path()
    if not p.exists():
        return []
    out: list[dict] = []
    for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            rec = json.loads(line)
        except json.JSONDecodeError:
            continue
        if status and rec.get("status") != status:
            continue
        out.append(rec)
    if limit:
        out = out[-limit:]
    return out


# ── CLI: leggi la inbox (per l'operatore) ──────────────────────────────────────

def _main():
    import argparse
    ap = argparse.ArgumentParser(description="EVA inbox — handoff verso l'operatore")
    ap.add_argument("--limit", type=int, default=20, help="quanti mostrarne (ultimi N)")
    ap.add_argument("--nuovi", action="store_true", help="solo status=nuovo")
    args = ap.parse_args()
    recs = read_handoffs(limit=args.limit, status="nuovo" if args.nuovi else None)
    if not recs:
        print("Inbox vuota.")
        return
    for r in recs:
        slots = r.get("slots") or {}
        riga = " · ".join(f"{k}={v}" for k, v in slots.items()) if slots else r.get("reply", "")[:80]
        print(f"[{r.get('ts')}] {r.get('status'):8} {r.get('sender','?'):>14}  {r.get('intent','')}: {riga}")


if __name__ == "__main__":
    _main()
