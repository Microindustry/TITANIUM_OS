# stop_hooks.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-05-29
# Orchestratore Stop hooks — 3 hook in parallelo con timeout, log, RAG condizionale

import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path

TI_ROOT    = Path(__file__).resolve().parents[2]
PYTHON     = sys.executable
MENTE      = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
CORE       = TI_ROOT / "AUTOMATIONS" / "core"
RAG_ENGINE = TI_ROOT / "NODES" / "MENTE_RAG" / "rag_engine.py"

TIMEOUT_SEC = 45
RAG_WINDOW_MIN = 120  # considera MENTE/ "toccata" se file modificati entro questi minuti


def mente_was_touched() -> bool:
    if not MENTE.exists():
        return False
    cutoff = time.time() - RAG_WINDOW_MIN * 60
    for f in MENTE.rglob("*"):
        try:
            if f.is_file() and f.stat().st_mtime > cutoff:
                return True
        except OSError:
            continue
    return False


def run_script(label: str, args: list) -> tuple:
    t0 = time.time()
    try:
        r = subprocess.run(
            args,
            timeout=TIMEOUT_SEC,
            capture_output=True,
            text=True,
            cwd=str(TI_ROOT),
        )
        elapsed = time.time() - t0
        ok = r.returncode == 0
        out = (r.stdout.strip() or r.stderr.strip())[:100]
        return label, elapsed, ok, out
    except subprocess.TimeoutExpired:
        return label, time.time() - t0, False, f"TIMEOUT dopo {TIMEOUT_SEC}s"
    except Exception as e:
        return label, time.time() - t0, False, str(e)


def main():
    print(f"\n[stop_hooks] {datetime.now().strftime('%H:%M:%S')} — avvio")

    tasks = [
        ("restart_prompt", [PYTHON, str(CORE / "generate_restart_prompt.py")]),
        ("functions_list", [PYTHON, str(CORE / "generate_functions_list.py")]),
    ]

    rag_touched = mente_was_touched()

    # RAG gira detached — può durare minuti, non blocca gli altri hook
    if rag_touched:
        subprocess.Popen(
            [PYTHON, str(RAG_ENGINE), "--incremental"],
            cwd=str(TI_ROOT),
            creationflags=subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP
            if sys.platform == "win32" else 0,
        )

    t0_total = time.time()
    results = []

    with ThreadPoolExecutor(max_workers=len(tasks)) as ex:
        futures = {ex.submit(run_script, label, args): label for label, args in tasks}
        for future in as_completed(futures, timeout=TIMEOUT_SEC + 10):
            try:
                results.append(future.result())
            except Exception as e:
                results.append((futures[future], 0, False, str(e)))

    elapsed_total = time.time() - t0_total
    print(f"[stop_hooks] done in {elapsed_total:.1f}s")

    for label, elapsed, ok, out in sorted(results, key=lambda r: r[1]):
        status = "OK " if ok else "ERR"
        print(f"  [{status}] {label:<20} {elapsed:.1f}s  {out}")

    if rag_touched:
        print(f"  [BG] rag_incremental       avviato in background (detached)")
    else:
        print(f"  [--] rag_incremental       skipped — MENTE/ invariata (ultime {RAG_WINDOW_MIN}min)")


if __name__ == "__main__":
    main()
