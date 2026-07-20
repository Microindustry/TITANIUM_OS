# docling_extract.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-07-20
# Estrattore PDF -> Markdown STRUTTURATO via Docling, eseguito nel venv dedicato
# ~/.venvs/docling (subprocess). Docling da' heading/tabelle/ordine-di-lettura/OCR ->
# chunk RAG migliori alla fonte. Se il venv/Docling manca o la conversione fallisce/scade
# -> ritorna None e il chiamante ripiega su pdfplumber (il PDF non resta mai non-processato).
# Isolato: NON tocca il torch 2.6.0+cu124 pinnato del RAG (vive nel suo venv).
import os
import subprocess
import sys
import tempfile
from pathlib import Path

_HERE = Path(__file__).resolve().parent
WORKER = _HERE / "_docling_worker.py"
VENV_PY = Path(os.environ.get(
    "DOCLING_VENV_PYTHON",
    str(Path.home() / ".venvs" / "docling" / "Scripts" / "python.exe")))
TIMEOUT = int(os.environ.get("DOCLING_TIMEOUT", "300"))


def is_available() -> bool:
    """True solo se il venv Docling e il worker esistono davvero (leva o accesa o spenta,
    niente teatro)."""
    return VENV_PY.exists() and WORKER.exists()


def extract(pdf_path) -> "tuple[str, int] | None":
    """(markdown, n_pagine) via Docling, oppure None se non disponibile/fallisce/scade."""
    if not is_available():
        return None
    pdf_path = str(Path(pdf_path).resolve())
    fd, out = tempfile.mkstemp(suffix=".md", prefix="docling_")
    os.close(fd)
    try:
        env = dict(os.environ, PYTHONIOENCODING="utf-8")
        r = subprocess.run([str(VENV_PY), str(WORKER), pdf_path, out],
                           capture_output=True, text=True, timeout=TIMEOUT, env=env)
        if r.returncode != 0:
            return None
        md = Path(out).read_text(encoding="utf-8", errors="replace")
        if not md.strip():
            return None
        try:
            pages = int((r.stdout or "0").strip().splitlines()[-1])
        except Exception:
            pages = 0
        return md, pages
    except Exception:
        return None
    finally:
        try:
            os.remove(out)
        except OSError:
            pass


if __name__ == "__main__":
    print(f"available={is_available()} venv={VENV_PY}")
    if len(sys.argv) > 1:
        res = extract(sys.argv[1])
        if res:
            md, pages = res
            print(f"OK pages={pages} len={len(md)}")
        else:
            print("extract -> None (fallback pdfplumber)")
