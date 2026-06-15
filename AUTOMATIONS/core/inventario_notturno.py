#!/usr/bin/env python3
# inventario_notturno.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-06-15
# "Cosa abbiamo costruito, notte per notte." Ad ogni catena notturna registra i
# commit nuovi (dall'ultimo giro) in un INVENTARIO cumulativo, il più recente in alto.
# Stop alla cecità su cosa è stato fatto: lo storico si accumula da solo.
#
# Fonte = git log (i commit sono il fatto reale, non un racconto -> meno allucinazioni).
# Stato in DATA/.inventario_last.txt (ultimo HEAD processato): niente doppioni.
# Non fallisce mai (exit 0): è in coda alla notturna, non deve romperla.
# Il commit del file lo fa night_push.bat (pathspec esplicito), come gli altri step.

import json
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
OUT = BASE / "DOCS" / "INVENTARIO_NOTTURNO.md"
STAMP = BASE / "DATA" / ".inventario_last.txt"
HEALTH = BASE / "DATA" / "audit" / "system_health.json"
CRITICHE = BASE / "DATA" / "audit" / "critiche_auto.json"
EPISODES = BASE / "CONTENT_ENGINE" / "DATABASE" / "episodes"

MARKER = "<!-- INVENTARIO:INSERT -->"
HEADER = (
    "# Inventario — cosa abbiamo costruito (notte per notte)\n\n"
    "> Generato da `AUTOMATIONS/core/inventario_notturno.py` a ogni catena notturna.\n"
    "> Ogni blocco = i commit di quel giro (il più recente in alto). I commit sono il fatto reale.\n\n"
    f"{MARKER}\n"
)


def _git(*args: str) -> str:
    try:
        r = subprocess.run(["git", *args], capture_output=True, text=True,
                           encoding="utf-8", errors="replace", cwd=str(BASE))
        return r.stdout.strip()
    except Exception:
        return ""


def _commits_since() -> list[tuple[str, str]]:
    """(hash, subject) dei commit nuovi dall'ultimo giro. Fallback: ultime 24h."""
    last = STAMP.read_text(encoding="utf-8").strip() if STAMP.exists() else ""
    rng = f"{last}..HEAD" if last and _git("cat-file", "-t", last) == "commit" else None
    if rng:
        raw = _git("log", rng, "--no-merges", "--format=%h\t%s")
    else:
        since = (datetime.now() - timedelta(hours=24)).strftime("%Y-%m-%d %H:%M:%S")
        raw = _git("log", f"--since={since}", "--no-merges", "--format=%h\t%s")
    out = []
    for line in raw.splitlines():
        if "\t" not in line:
            continue
        h, s = line.split("\t", 1)
        if s.startswith("auto: inventario"):       # non inventariare sé stesso
            continue
        out.append((h, s.strip()))
    return out


def _stats() -> str:
    bits = []
    try:
        n_ep = sum(1 for _ in EPISODES.rglob("*.md")) if EPISODES.exists() else 0
        if n_ep:
            bits.append(f"episodi: {n_ep}")
    except Exception:
        pass
    try:
        cr = json.loads(CRITICHE.read_text(encoding="utf-8"))
        op = sum(1 for c in cr if c.get("status") == "open")
        rs = sum(1 for c in cr if c.get("status") == "resolved")
        bits.append(f"critiche aperte: {op} ({rs} risolte)")
    except Exception:
        pass
    try:
        h = json.loads(HEALTH.read_text(encoding="utf-8"))
        if h.get("rag_chunks") is not None:
            bits.append(f"RAG: {h['rag_chunks']} chunk")
    except Exception:
        pass
    return " · ".join(bits)


def main() -> int:
    commits = _commits_since()
    head = _git("rev-parse", "HEAD")
    if not commits:
        # niente di nuovo: aggiorna solo lo stamp, non sporcare l'inventario
        if head:
            STAMP.write_text(head, encoding="utf-8")
        print("[inventario] nessun commit nuovo - skip")
        return 0

    today = datetime.now().strftime("%Y-%m-%d")
    block_lines = [f"## {today} · {len(commits)} commit"]
    for h, s in commits:
        block_lines.append(f"- `{h}` {s}")
    stats = _stats()
    if stats:
        block_lines.append(f"\n_{stats}_")
    block = "\n".join(block_lines) + "\n\n"

    OUT.parent.mkdir(parents=True, exist_ok=True)
    if OUT.exists() and MARKER in OUT.read_text(encoding="utf-8"):
        text = OUT.read_text(encoding="utf-8")
        text = text.replace(MARKER, MARKER + "\n\n" + block, 1)
    else:
        text = HEADER + "\n" + block
    OUT.write_text(text, encoding="utf-8")

    if head:
        STAMP.write_text(head, encoding="utf-8")
    print(f"[inventario] +1 blocco ({len(commits)} commit) -> {OUT.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
