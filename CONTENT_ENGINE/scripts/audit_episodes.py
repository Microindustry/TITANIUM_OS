# audit_episodes.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-05
# Audit READ-ONLY: ogni episodio .md su disco e' rappresentato in
# DASHBOARD/src/data/episodes.json (la fonte dati del dashboard)?
#
# Regola d'oro: NON perdere episodi. Questo script non scrive nulla: elenca gli
# orfani (su disco ma non in dashboard) e segnala id duplicati nel json.
#
# Il matching disco<->json e' fuzzy di proposito: gli id storici sono incoerenti
# (EP_AUTO_002 vs EP_AUTO_00, stagioni AUTO/ST/MOM...), quindi si confronta su piu'
# segnali: id embedded, titolo normalizzato, impronta del contenuto.
#
# Uso:  python CONTENT_ENGINE/scripts/audit_episodes.py [--json]

import re
import sys
import json
import argparse
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
EPISODES_DIR = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"


def strip_toc(raw: str) -> str:
    return re.sub(r"<!--\s*TOC\s*-->.*?<!--\s*/TOC\s*-->", "", raw, flags=re.DOTALL)


def norm(s: str) -> str:
    """Normalizza per confronto: minuscole, solo alfanumerici, niente spazi."""
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def fingerprint(text: str) -> str:
    """Impronta robusta del corpo: tolto TOC/markup, primi 120 char alfanumerici."""
    body = strip_toc(text)
    body = re.sub(r"[#*>`_\-\[\]()]", " ", body)
    return norm(body)[:120]


def derive_id_from_name(path: Path) -> str:
    """Id canonico dal nome file: EP_AUTO_50_xxx -> EP_AUTO_50, EP_20260604_x -> EP_20260604."""
    m = re.match(r"(EP(?:_[A-Za-z0-9]+?)?_\d+)", path.stem)
    return m.group(1) if m else ""


def extract_md_meta(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8", errors="replace")
    body = strip_toc(raw)
    head = "\n".join(raw.splitlines()[:60])
    # id: frontmatter -> heading "# EP_XXX — ..." -> nome file
    mid = re.search(r"^id:\s*(\S+)", head, re.M)
    eid = mid.group(1).strip() if mid else ""
    if not eid:
        mh = re.search(r"^#\s+(EP[_A-Za-z0-9]+)", body, re.M)
        eid = mh.group(1) if mh else derive_id_from_name(path)
    # title: frontmatter -> heading dopo il prefisso EP -> primo heading "vero"
    mtitle = re.search(r'^title:\s*"?([^"\n]+)"?', head, re.M)
    title = mtitle.group(1).strip() if mtitle else ""
    if not title:
        mh2 = re.search(r"^#\s+EP[_A-Za-z0-9]+\s*[—\-]\s*(.+)$", body, re.M)
        if mh2:
            title = mh2.group(1).strip()
    if not title:
        for m in re.finditer(r"^#{1,3}\s+(.+)$", body, re.M):
            cand = m.group(1).strip().strip('"')
            if cand and "milestone" not in cand.lower() and not cand.startswith("EP_"):
                title = cand
                break
    return {
        "path": str(path.relative_to(ROOT)),
        "id": eid,
        "id_from_name": derive_id_from_name(path),
        "title": title,
        "fp": fingerprint(raw),
    }


def collect() -> dict:
    """Analisi riusabile: confronta disco vs episodes.json. Read-only."""
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    json_ids = [e.get("id", "") for e in eps]
    id_set = set(json_ids)
    title_set = {norm(e.get("title", "")) for e in eps}
    fp_set = {fingerprint(e.get("content", "")) for e in eps if e.get("content")}

    dup = sorted({i for i in json_ids if json_ids.count(i) > 1})

    md_files = [p for p in sorted(EPISODES_DIR.rglob("*.md"))
                if "INDEX" not in p.stem.upper()                       # gli indici non sono episodi
                and not any(part.startswith("_")                       # _PROPOSTI/_ARCHIVIO = staging
                            for part in p.relative_to(EPISODES_DIR).parts[:-1])]
    orphans = []
    for p in md_files:
        m = extract_md_meta(p)
        in_json = (
            (m["id"] and m["id"] in id_set)
            or (m["id_from_name"] and m["id_from_name"] in id_set)
            or (m["fp"] and m["fp"] in fp_set)
        )
        # NB (28/07): il match per TITOLO e' stato rimosso. story_agent riusa il numero
        # nell'H1 ("Episodio 69" tre volte) -> episodi diversi con lo stesso titolo
        # risultavano "in dashboard" pur non essendoci: EP_20260725/26/27 erano persi in
        # silenzio e il recupero orfani di build_episodes_json si fidava di questo audit.
        # Ordine corretto dei segnali: id -> id_from_name -> fingerprint del contenuto.
        if not in_json:
            orphans.append(m)
    return {
        "json_total": len(eps), "json_unique_ids": len(id_set),
        "duplicate_ids": dup, "md_total": len(md_files), "orphans": orphans,
    }


# Alias usato dal builder (build_episodes_json.py)
main_collect = collect


def main():
    ap = argparse.ArgumentParser(description="Audit episodi disco vs episodes.json")
    ap.add_argument("--json", action="store_true", help="output JSON invece che testo")
    args = ap.parse_args()

    r = collect()
    eps_total, id_unique = r["json_total"], r["json_unique_ids"]
    dup, md_files, orphans = r["duplicate_ids"], r["md_total"], r["orphans"]

    if args.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0 if not orphans and not dup else 1

    print(f"episodes.json: {eps_total} voci, {id_unique} id unici")
    if dup:
        print(f"⚠ ID DUPLICATI nel json: {dup}")
    print(f"episodi .md su disco: {md_files}")
    print(f"\nORFANI (su disco ma NON in dashboard): {len(orphans)}")
    for o in orphans:
        label = o["title"] or o["id"] or "(senza titolo)"
        print(f"  - {o['path']}\n      id={o['id'] or '—'} | {label[:70]}")
    if not orphans:
        print("  (nessuno — ogni episodio su disco e' in dashboard ✓)")
    return 0 if not orphans and not dup else 1


if __name__ == "__main__":
    sys.exit(main())
