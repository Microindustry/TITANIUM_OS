# retention.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-07-07
"""
RETENTION — la REGOLA scritta che tiene pulito il disco (non pulizia one-shot).

Nato dal finding 04 P3 dell'attacco #52: 3.0 GB di chroma_db_* di quarantena
+ 13k cartelle BACKUPS/ + log senza scadenza. Ogni regola vive QUI, con il suo
perche'; la notturna lo esegue a fine catena (night_push.bat, prima di
stato_fisico). Default = DRY-RUN (stampa cosa farebbe); --apply per eseguire.

REGOLE (tutte per eta'/rotazione, mai per contenuto):
  R1 chroma-debris   NODES/MENTE_RAG/chroma_db_*  (quarantene di rag_recover/reset):
                     tieni SEMPRE la piu' recente, elimina le altre se > 7 giorni.
                     I known-good veri stanno in _VAULT/BACKUPS/rag_snapshots.
  R2 backups-ts      BACKUPS/<YYYYMMDD_HHMMSS>/ (snapshot per-evento del watcher):
                     elimina cartelle > 45 giorni. La storia per-file recente resta
                     (backup.py tiene gia' max 30 versioni per file).
  R3 backups-full    BACKUPS/FULL_*: tieni solo il piu' recente.
  R4 logs            DATA/logs + logs/: elimina file > 30 giorni (i log vivi hanno
                     mtime fresco, quindi non vengono mai toccati).
  R5 rag-snapshots   _VAULT/BACKUPS/rag_snapshots/chroma_db_*: tieni le 3 piu' recenti
                     (safety-net: e' la stessa rotazione che fa gia' rag_engine).
  R6 chroma-reset    NODES/MENTE_RAG/chroma_db_reset_* (quarantena dell'INDICE VECCHIO
                     spostato da rag_recover --rebuild-hard, spesso corrotto: e' il
                     motivo del reset): keep 0, elimina se > 1 giorno. La rete vera
                     e' R5 (snapshot known-good in _VAULT) + l'indice vivo verificato
                     ogni notte. Nato da 14,8 GB sopravvissuti a R1 (attacco #2 A4:
                     R1 teneva il piu' recente-per-nome = il reset da 14,5 GB corrotto).
  R7 manifest-corr   NODES/MENTE_RAG/rag_manifest_CORROTTO_*.json: elimina se > 7 giorni.
  NB deep_freeze     NON toccato qui: ruota da solo (MAX_FREEZE_FILES in deep_freeze.py).

Output: DATA/retention_last.json (letto dal night_audit come segnale organi-vivi).
"""

import json
import re
import shutil
import stat
import sys
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# --- parametri della regola (giorni / copie da tenere) ---
CHROMA_DEBRIS_DAYS = 7
CHROMA_DEBRIS_KEEP = 1
CHROMA_RESET_DAYS = 1        # quarantena reset: grazia corta (R5 e' la rete vera)
CHROMA_RESET_KEEP = 0
MANIFEST_CORROTTO_DAYS = 7
BACKUPS_TS_DAYS = 45
BACKUPS_TS_KEEP = 300   # tetto a NUMERO: il watcher crea ~1 cartella/evento (centinaia/giorno);
                        # senza cap la sola regola per eta' (45gg) lascia decine di migliaia di
                        # cartelle = esplosione inode che rallenta ogni scansione. keep-N e' il
                        # tetto vero; la storia per-file resta in backup.py (max 30 versioni/file).
BACKUPS_FULL_KEEP = 1
LOGS_DAYS = 30
RAG_SNAPSHOTS_KEEP = 3

RAG_DIR = ROOT / "NODES" / "MENTE_RAG"
BACKUPS_DIR = ROOT / "BACKUPS"
SNAPSHOTS_DIR = ROOT / "_VAULT" / "BACKUPS" / "rag_snapshots"
LOG_DIRS = [ROOT / "DATA" / "logs", ROOT / "logs"]
REPORT_PATH = ROOT / "DATA" / "retention_last.json"

TS_RE = re.compile(r"(\d{8}_\d{6})")


def _dir_size(p: Path) -> int:
    total = 0
    for f in p.rglob("*"):
        try:
            if f.is_file():
                total += f.stat().st_size
        except OSError:
            pass
    return total


def _entry_age_days(p: Path, now: datetime) -> float:
    """Eta' dal timestamp nel NOME se c'e' (autoritativo), altrimenti mtime."""
    m = TS_RE.search(p.name)
    if m:
        try:
            ts = datetime.strptime(m.group(1), "%Y%m%d_%H%M%S")
            return (now - ts).total_seconds() / 86400
        except ValueError:
            pass
    return (now - datetime.fromtimestamp(p.stat().st_mtime)).total_seconds() / 86400


def _rm(path: Path, apply: bool) -> bool:
    if not apply:
        return True

    def _onerror(func, p, _exc):
        # file readonly (tipico dei segmenti chroma copiati): togli il flag e riprova
        try:
            Path(p).chmod(stat.S_IWRITE)
            func(p)
        except OSError:
            pass

    try:
        if path.is_dir():
            shutil.rmtree(path, onerror=_onerror)
        else:
            path.unlink()
        return not path.exists()
    except OSError:
        return not path.exists()


def run(apply: bool) -> dict:
    now = datetime.now()
    actions = []  # (regola, path, MB)

    # R1 — chroma debris: tutte le chroma_db_* TRANNE la viva (chroma_db esatta) e
    # TRANNE i reset (li gestisce R6 con grazia piu' corta)
    debris = sorted(
        [d for d in RAG_DIR.glob("chroma_db_*")
         if d.is_dir() and not d.name.startswith("chroma_db_reset_")],
        key=lambda d: d.name,
        reverse=True,
    )
    for d in debris[CHROMA_DEBRIS_KEEP:]:
        if _entry_age_days(d, now) > CHROMA_DEBRIS_DAYS:
            actions.append(("R1-chroma-debris", d))

    # R2 — cartelle timestamp del watcher-backup: tetto a NUMERO (keep-N) + scadenza per eta'.
    if BACKUPS_DIR.exists():
        ts_dirs = sorted(
            [d for d in BACKUPS_DIR.iterdir()
             if d.is_dir() and re.fullmatch(r"\d{8}_\d{6}", d.name)],
            key=lambda d: d.name,
            reverse=True,
        )
        for i, d in enumerate(ts_dirs):
            if i >= BACKUPS_TS_KEEP or _entry_age_days(d, now) > BACKUPS_TS_DAYS:
                actions.append(("R2-backups-ts", d))

    # R3 — full backup manuali: tieni il piu' recente
    fulls = sorted(BACKUPS_DIR.glob("FULL_*"), key=lambda d: d.name, reverse=True)
    for d in fulls[BACKUPS_FULL_KEEP:]:
        actions.append(("R3-backups-full", d))

    # R4 — log vecchi
    cutoff = now - timedelta(days=LOGS_DAYS)
    for log_dir in LOG_DIRS:
        if not log_dir.exists():
            continue
        for f in log_dir.rglob("*"):
            try:
                if f.is_file() and datetime.fromtimestamp(f.stat().st_mtime) < cutoff:
                    actions.append(("R4-logs", f))
            except OSError:
                pass

    # R5 — safety-net rotazione snapshot RAG
    if SNAPSHOTS_DIR.exists():
        snaps = sorted(
            [d for d in SNAPSHOTS_DIR.glob("chroma_db_*") if d.is_dir()],
            key=lambda d: d.name,
            reverse=True,
        )
        for d in snaps[RAG_SNAPSHOTS_KEEP:]:
            actions.append(("R5-rag-snapshots", d))

    # R6 — quarantena reset dell'indice vecchio (keep 0, grazia corta)
    resets = sorted(
        [d for d in RAG_DIR.glob("chroma_db_reset_*") if d.is_dir()],
        key=lambda d: d.name,
        reverse=True,
    )
    for d in resets[CHROMA_RESET_KEEP:]:
        if _entry_age_days(d, now) > CHROMA_RESET_DAYS:
            actions.append(("R6-chroma-reset", d))

    # R7 — manifest corrotti messi da parte
    for f in RAG_DIR.glob("rag_manifest_CORROTTO_*.json"):
        if f.is_file() and _entry_age_days(f, now) > MANIFEST_CORROTTO_DAYS:
            actions.append(("R7-manifest-corr", f))

    # esegui (o simula) e rendiconta
    results = []
    freed = 0
    for rule, path in actions:
        size = _dir_size(path) if path.is_dir() else path.stat().st_size
        ok = _rm(path, apply)
        if ok:
            freed += size
        results.append({
            "rule": rule,
            "path": str(path.relative_to(ROOT)),
            "mb": round(size / 1048576, 1),
            "removed": bool(apply and ok),
        })
        print(f"[{rule}] {'RM ' if apply else 'dry'} {path.relative_to(ROOT)} ({size / 1048576:.1f} MB)")

    report = {
        "ran_at": now.isoformat(),
        "mode": "apply" if apply else "dry-run",
        "actions": len(results),
        "freed_mb": round(freed / 1048576, 1),
        "by_rule": {},
        "items": results,
    }
    for r in results:
        report["by_rule"][r["rule"]] = report["by_rule"].get(r["rule"], 0) + 1
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[retention] {report['mode']}: {report['actions']} azioni, "
          f"{report['freed_mb']} MB {'liberati' if apply else 'liberabili'}")
    return report


if __name__ == "__main__":
    run(apply="--apply" in sys.argv)
