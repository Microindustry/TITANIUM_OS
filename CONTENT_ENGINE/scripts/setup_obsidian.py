# setup_obsidian.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-13
# SETUP del vault Obsidian: porta DENTRO MENTE (il vault) anche le STORIE/episodi che
# vivono nel repo, cosi Obsidian mostra TUTTO il sapere in un posto solo (conoscenza +
# racconto + evoluzione). Poi rigenera HOME + indici. Un comando = vault pronto.
#
# Sync UNIDIREZIONALE repo -> MENTE/STORIE (gli episodi sono generati nel repo, canonici
# li': qui se ne tiene una copia navigabile in Obsidian). Idempotente. Wired nella notturna.

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EPISODES_SRC = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
MENTE = Path("C:/Users/teo/MICROINDUSTRY/MENTE")
STORIE_DST = MENTE / "STORIE"

_C_START = "<!-- COLLEGATI:start (auto, storie_intersect) -->"
_C_END = "<!-- COLLEGATI:end -->"
_ID_RX = re.compile(r"^#\s+(EP_\S+)", re.MULTILINE)

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


def inject_collegati() -> int:
    """Inietta i wikilink `## Collegati` nelle note del vault, dai `collegati` di
    episodes.json. Mappa id->nomefile leggendo l'header `# EP_...` (cosi' i wikilink
    puntano al nome reale della nota -> il grafo di Obsidian connette gli episodi).
    Idempotente: rimpiazza il blocco fra i marker. Ritorna quante note aggiornate."""
    if not EPISODES_JSON.exists():
        return 0
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    coll = {e["id"]: e.get("collegati", []) for e in eps}
    # id noti, ordinati per lunghezza desc: il nome-file inizia SEMPRE con l'id
    # (setup_obsidian copia col nome del repo = {id}[_slug].md). Match per prefisso =
    # robusto anche se l'header e' un titolo umano (niente piu' dipendenza dal '# EP_').
    known_ids = sorted((e["id"] for e in eps), key=len, reverse=True)

    def stem_to_id(stem: str):
        for eid in known_ids:
            if stem == eid or stem.startswith(eid + "_"):
                return eid
        return None

    files = list(STORIE_DST.rglob("*.md")) if STORIE_DST.exists() else []
    file_txt = {}      # cache contenuti
    file_id = {}       # f -> id episodio
    id2stem = {}       # id -> stem (per i wikilink)
    for f in files:
        try:
            file_txt[f] = f.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        eid = stem_to_id(f.stem) or f.stem
        file_id[f] = eid
        id2stem.setdefault(eid, f.stem)

    n = 0
    for f in files:
        txt = file_txt.get(f)
        if txt is None:
            continue
        eid = file_id.get(f, f.stem)
        links = coll.get(eid, [])
        # costruisci il blocco (solo legami il cui target esiste come nota)
        righe = []
        for c in links:
            stem = id2stem.get(c["id"])
            if not stem:
                continue
            righe.append(f"- [[{stem}|{c.get('title', c['id'])}]] — *{c.get('motivo','')}*")
        blocco = _C_START + "\n## Collegati\n" + ("\n".join(righe) if righe else "_nessun legame_") + "\n" + _C_END

        # rimpiazza blocco esistente o appendi in coda (idempotente)
        if _C_START in txt and _C_END in txt:
            new = re.sub(re.escape(_C_START) + r".*?" + re.escape(_C_END), blocco, txt, flags=re.DOTALL)
        else:
            new = txt.rstrip() + "\n\n" + blocco + "\n"
        if new != txt:
            f.write_text(new, encoding="utf-8")
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
    nc = inject_collegati()
    print(f"  Intersezioni (wikilink Collegati) iniettate in {nc} note → il grafo connette gli episodi")
    gen_index()
    print(f"\n  Vault pronto: {MENTE}")
    print("  Apri in Obsidian (launcher Desktop) -> HOME.md -> graph view.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
