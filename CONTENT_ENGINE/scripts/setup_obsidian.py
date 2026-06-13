# setup_obsidian.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-13
# SETUP del vault Obsidian: porta DENTRO MENTE (il vault) anche le STORIE/episodi che
# vivono nel repo, cosi Obsidian mostra TUTTO il sapere in un posto solo (conoscenza +
# racconto + evoluzione). Poi rigenera HOME + indici. Un comando = vault pronto.
#
# Sync UNIDIREZIONALE repo -> MENTE/STORIE (gli episodi sono generati nel repo, canonici
# li': qui se ne tiene una copia navigabile in Obsidian). Idempotente. Wired nella notturna.

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EPISODES_SRC = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
MENTE = Path("C:/Users/teo/MICROINDUSTRY/MENTE")
STORIE_DST = MENTE / "STORIE"

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def sync_episodes() -> int:
    """Copia gli episodi (per stagione) nel vault. Ritorna quanti copiati/aggiornati."""
    if not EPISODES_SRC.exists():
        print(f"[setup] sorgente episodi assente: {EPISODES_SRC}")
        return 0
    n = 0
    for src in EPISODES_SRC.rglob("*.md"):
        rel = src.relative_to(EPISODES_SRC)            # es. S2_SISTEMA/EP_xxx.md
        dst = STORIE_DST / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        # copia solo se diverso (mtime/size) — evita scritture inutili
        if dst.exists() and dst.stat().st_size == src.stat().st_size \
           and int(dst.stat().st_mtime) == int(src.stat().st_mtime):
            continue
        shutil.copy2(src, dst)
        n += 1
    return n


def gen_index():
    """Rigenera HOME + indici (riusa genera_wiki_index)."""
    script = ROOT / "CONTENT_ENGINE" / "scripts" / "genera_wiki_index.py"
    subprocess.run([sys.executable, str(script)], check=False)


def main() -> int:
    print("=" * 56)
    print(" SETUP OBSIDIAN — un vault con TUTTO (sapere + storie)")
    print("=" * 56)
    if not MENTE.exists():
        print(f"[setup] vault MENTE assente: {MENTE}")
        return 1
    n = sync_episodes()
    tot = len(list(STORIE_DST.rglob("*.md"))) if STORIE_DST.exists() else 0
    print(f"  STORIE importate nel vault: {n} aggiornate · {tot} episodi totali in MENTE/STORIE/")
    gen_index()
    print(f"\n  Vault pronto: {MENTE}")
    print("  Apri in Obsidian (launcher Desktop) -> HOME.md -> graph view.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
