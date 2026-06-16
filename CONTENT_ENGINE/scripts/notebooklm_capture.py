#!/usr/bin/env python3
# notebooklm_capture.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-16
# Cattura i notebook di NotebookLM (via CLI `nlm`) in MENTE/_DA_ORDINARE/notebooklm/.
# STAGING come chiavetta_ingest: NON inquina la MENTE curata -> li smisti tu/dopo.
# Idempotente: salta i file gia' presenti (--force per riscrivere). Richiede `nlm login`.
#
# Uso:
#   python notebooklm_capture.py                 # tutti i notebook
#   python notebooklm_capture.py <notebook_id>   # solo quello/i
#   python notebooklm_capture.py --force         # riscrive anche gli esistenti

import datetime
import json
import os
import re
import subprocess
import sys
from pathlib import Path

MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
DEST = MENTE / "_DA_ORDINARE" / "notebooklm"
_NLM = Path.home() / ".local" / "bin" / "nlm.exe"
NLM_CMD = str(_NLM) if _NLM.exists() else "nlm"


def nlm_json(*args):
    try:
        r = subprocess.run([NLM_CMD, *args], capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=120)
        return json.loads(r.stdout)
    except Exception:
        return None


def slug(s, n=60):
    s = re.sub(r"[^\w\s-]", "", (s or "").strip().lower())
    s = re.sub(r"[\s_-]+", "-", s).strip("-")
    return (s or "senza-titolo")[:n]


def main():
    force = "--force" in sys.argv
    ids = [a for a in sys.argv[1:] if not a.startswith("--")]

    nbs = nlm_json("notebook", "list")
    if not nbs:
        print("[notebooklm] nessun notebook — autenticato? prova: nlm login --check")
        return 1
    if ids:
        nbs = [n for n in nbs if n.get("id") in ids]

    DEST.mkdir(parents=True, exist_ok=True)
    today = datetime.date.today().isoformat()
    tot = saved = skipped = 0

    for nb in nbs:
        nb_id = nb.get("id")
        nb_title = nb.get("title", "senza-titolo")
        nb_dir = DEST / slug(nb_title)
        nb_dir.mkdir(parents=True, exist_ok=True)

        srcs = nlm_json("source", "list", nb_id) or []
        for i, s in enumerate(srcs, 1):
            tot += 1
            sid = s.get("id")
            stitle = s.get("title", f"fonte-{i}")
            f = nb_dir / f"{i:02d}_{slug(stitle)}.md"
            if f.exists() and not force:
                skipped += 1
                continue
            data = nlm_json("source", "content", sid) or {}
            content = data.get("content", "")
            if not content:
                continue
            fm = (
                "---\n"
                f'notebook: "{nb_title}"\n'
                f"notebook_id: {nb_id}\n"
                f'source: "{stitle}"\n'
                f"source_id: {sid}\n"
                f"type: {s.get('type', '?')}\n"
                f"captured: {today}\n"
                f"chars: {len(content)}\n"
                "---\n\n"
            )
            f.write_text(fm + content, encoding="utf-8")
            saved += 1

        (nb_dir / "_NOTEBOOK.md").write_text(
            f"# {nb_title}\n\n- id: `{nb_id}`\n- fonti: {len(srcs)}\n- catturato: {today}\n",
            encoding="utf-8",
        )

    print(f"[notebooklm] notebook: {len(nbs)} | fonti viste: {tot} | salvate: {saved} | saltate(gia' presenti): {skipped}")
    print(f"[notebooklm] -> {DEST}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
