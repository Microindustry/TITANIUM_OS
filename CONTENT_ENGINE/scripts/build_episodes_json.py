# build_episodes_json.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v2.0 | 2026-06-05
# Manutenzione di DASHBOARD/src/data/episodes.json (la fonte dati robusta degli episodi;
# il dashboard la renderizza direttamente via storieData.ts -> EPISODES = episodesData).
#  - aggiunge l'episodio PILOTA (EP_PILOTA_00) in cima se assente
#  - ripulisce i titoli "slug" (underscore / minuscoli / troncati)
#  - DEDUP: rimuove voci con id duplicato (tiene la prima)
#  - RECUPERO: importa gli episodi .md su disco non ancora in dashboard (regola d'oro:
#    non perdere episodi). Additivo e idempotente: non tocca le voci esistenti.
# I dati sono JSON: non possono rompere il build (a differenza dei template literal TS).

import re
import sys
import json
from pathlib import Path
from datetime import datetime

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
PILOTA_MD = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S0_ORIGINI" / "EP_PILOTA_00_il_mondo.md"
EPISODES_DIR = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"

sys.path.insert(0, str(Path(__file__).resolve().parent))
import audit_episodes as audit  # riusa il matching disco<->json (stesse regole)

# Etichette stagione note alla UI (STAGIONI in storieData.ts). Una stagione fuori da
# questo set romperebbe StorieView (STAGIONI[ep.stagione].color). Recuperiamo SOLO in AUTO/ST.
STAGIONE_LABEL = {
    "S0": "Le Origini", "S1": "Il Presente", "ST": "Il Sistema",
    "S2": "La Costruzione", "AUTO": "Generati", "MOM": "Momenti",
    "AV": "L'Avventura",   # binario educativo (Nina + THEMIS contro l'Entropia)
}


def _parse_frontmatter(raw: str) -> dict:
    """Estrae i campi 'key: value' (stile YAML leggero) dalla testa del file."""
    fm = {}
    for line in raw.splitlines()[:40]:
        m = re.match(r'^(id|title|sottotitolo|stagione|data_evento|tags|status|durata_min|parent|level)\s*:\s*(.+)$', line)
        if not m:
            continue
        k, v = m.group(1), m.group(2).strip()
        v = v.strip().strip('"').strip("'").strip()
        if k == "tags":
            v = [t.strip().strip('"').strip("'") for t in re.sub(r"[\[\]]", "", v).split(",") if t.strip()]
        fm[k] = v
    return fm


def _season_from_path(path: Path) -> str:
    s = str(path).upper()
    if "S_AVVENTURA" in s:
        return "AV"          # binario educativo (stagione "L'Avventura")
    if "S2_SISTEMA" in s:
        return "ST"          # i dev-log del sistema vanno nella stagione "Il Sistema"
    if "S0_ORIGINI" in s:
        return "S0"
    if "S1_PRESENTE" in s:
        return "S1"
    return "AUTO"            # SA_AUTO e milestone auto-generati


def _strip_frontmatter(text: str) -> str:
    """Toglie un eventuale blocco frontmatter YAML fenced (--- ... ---) in testa,
    cosi i campi key:value non finiscono nel contenuto renderizzato. I metadati
    restano letti da _parse_frontmatter (che scansiona le prime righe a parte)."""
    return re.sub(r"\A\s*---\s*\n.*?\n---\s*\n", "", text, count=1, flags=re.DOTALL)


def _episode_from_md(path: Path, used_ids: set) -> dict:
    raw = path.read_text(encoding="utf-8", errors="replace")
    body = _strip_frontmatter(audit.strip_toc(raw)).strip()
    fm = _parse_frontmatter(raw)
    meta = audit.extract_md_meta(path)

    # id univoco: frontmatter/heading -> nome file -> stem completo se collide
    eid = fm.get("id") or meta["id"] or meta["id_from_name"] or path.stem
    if eid in used_ids:
        eid = path.stem  # convenzione anti-collisione gia' usata in passato (ID = stem completo)
    n = 2
    base = eid
    while eid in used_ids:
        eid = f"{base}_{n}"; n += 1

    title = clean_title(fm.get("title") or meta["title"] or path.stem.replace("_", " "))
    stag = fm.get("stagione") if fm.get("stagione") in STAGIONE_LABEL else _season_from_path(path)

    data_ev = fm.get("data_evento", "")
    if not data_ev:
        md = re.search(r"(20\d{2})[-_]?(\d{2})[-_]?(\d{2})", path.stem)
        if md:
            data_ev = f"{md.group(1)}-{md.group(2)}-{md.group(3)}"
        else:
            data_ev = datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")

    status = fm.get("status", "ready")
    if status not in ("ready", "draft", "source", "pending"):
        status = "ready"  # la UI ha solo questi stati: evita STATUS_CONFIG[undefined]

    preview = " ".join(re.sub(r"[#*>`\-\[\]()]", " ", body).split())[:200]
    words = len(body.split())
    durata = fm.get("durata_min")
    try:
        durata = int(durata)
    except (TypeError, ValueError):
        durata = max(3, min(20, round(words / 180)))

    # gerarchia "a livelli" (additiva): un episodio puo' essere figlio-approfondimento
    # di un altro. Modello GitHub-Docs: il padre dichiara i figli; qui il figlio dichiara
    # il padre (piu' robusto contro id mancanti). 'children' viene calcolato in build_tree().
    parent = fm.get("parent") or None
    try:
        level = int(fm.get("level"))
    except (TypeError, ValueError):
        level = 0  # default top-level; build_tree() lo corregge dalla catena dei parent

    return {
        "id": eid,
        "title": title,
        "sottotitolo": fm.get("sottotitolo", ""),
        "stagione": stag,
        "stagione_label": STAGIONE_LABEL.get(stag, "Generati"),
        "data_evento": data_ev,
        "tags": fm.get("tags", []),
        "status": status,
        "durata_min": durata,
        "preview": preview,
        "content": body,
        "parent_id": parent,   # None = episodio principale (LV0)
        "level": level,        # 0 = principale · 1+ = approfondimento
        "children": [],        # calcolato in build_tree() (id dei figli)
        "recuperato": True,  # traccia che e' stato importato dall'audit (non scritto a mano)
    }


def build_tree(eps: list) -> int:
    """Normalizza la gerarchia 'a livelli' su TUTTI gli episodi (additivo, idempotente).
    - garantisce i campi parent_id/level/children anche sui vecchi episodi piatti;
    - calcola children[] dai parent_id (modello albero, profondita' libera);
    - ricava level dalla catena dei parent (0 = principale, +1 per ogni approfondimento);
    - parent inesistente -> trattato come principale (non perde l'episodio).
    Ritorna il numero di relazioni padre->figlio collegate."""
    by_id = {}
    for e in eps:
        e.setdefault("parent_id", None)
        e.setdefault("level", 0)
        e["children"] = []  # ricalcolato sempre da zero
        by_id[e.get("id")] = e

    linked = 0
    for e in eps:
        pid = e.get("parent_id")
        if pid and pid in by_id and pid != e.get("id"):
            by_id[pid]["children"].append(e["id"])
            linked += 1
        else:
            e["parent_id"] = None  # padre mancante -> promosso a principale

    # level derivato dalla catena (con guardia anti-ciclo)
    def depth(e, seen):
        pid = e.get("parent_id")
        if not pid or pid not in by_id or pid in seen:
            return 0
        return 1 + depth(by_id[pid], seen | {e.get("id")})
    for e in eps:
        e["level"] = depth(e, set())
    return linked


def clean_title(t: str) -> str:
    if not t:
        return t
    # slug -> parole; title-case se tutto minuscolo o con underscore
    if "_" in t or t == t.lower():
        t = t.replace("_", " ").strip()
        t = " ".join(w if (w.isupper() and len(w) > 1) else w.capitalize() for w in t.split())
    return t.strip()


def load_pilota() -> dict | None:
    if not PILOTA_MD.exists():
        return None
    raw = PILOTA_MD.read_text(encoding="utf-8")
    body = re.sub(r"<!--\s*TOC\s*-->.*?<!--\s*/TOC\s*-->", "", raw, flags=re.DOTALL).strip()
    preview = " ".join(re.sub(r"[#*>`\-]", " ", body).split())[:200]
    return {
        "id": "EP_PILOTA_00",
        "title": "Il Mondo",
        "sottotitolo": "Acciaio e codice: chi sono, cosa costruisco, e la crew che ci vive dentro",
        "stagione": "S0",
        "stagione_label": "Le Origini",
        "data_evento": datetime.now().strftime("%Y-%m-%d"),
        "tags": ["pilota", "intro", "ecosistema", "personaggi"],
        "status": "ready",
        "durata_min": 14,
        "preview": preview,
        "content": body,
    }


def main():
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    before = len(eps)

    # 1) titoli puliti
    fixed = 0
    for e in eps:
        nt = clean_title(e.get("title", ""))
        if nt != e.get("title"):
            e["title"] = nt
            fixed += 1

    # 2) dedup per id (tiene la prima occorrenza)
    seen, deduped, removed = set(), [], []
    for e in eps:
        if e.get("id") in seen:
            removed.append(e.get("id"))
            continue
        seen.add(e.get("id"))
        deduped.append(e)
    eps = deduped
    if removed:
        print(f"dedup: rimosse {len(removed)} voci duplicate {removed}")

    # 3) pilota in cima (idempotente)
    if not any(e["id"] == "EP_PILOTA_00" for e in eps):
        pil = load_pilota()
        if pil:
            eps.insert(0, pil)
            print("aggiunto EP_PILOTA_00 in cima")

    # 4) recupero orfani (regola d'oro: non perdere episodi). Additivo, mai sovrascrive.
    orphan_paths = [
        ROOT / o["path"]
        for o in audit.main_collect()["orphans"]
        if "INDEX" not in Path(o["path"]).stem.upper()
    ]
    used_ids = {e.get("id") for e in eps}
    recovered = []
    for p in orphan_paths:
        ep = _episode_from_md(p, used_ids)
        used_ids.add(ep["id"])
        eps.append(ep)
        recovered.append(ep["id"])
    if recovered:
        print(f"recuperati {len(recovered)} episodi orfani dal disco:")
        for rid in recovered:
            print(f"  + {rid}")

    # 5) gerarchia a livelli (additiva): parent/level/children su tutti gli episodi
    linked = build_tree(eps)

    EPISODES_JSON.write_text(json.dumps(eps, ensure_ascii=False, indent=2), encoding="utf-8")
    n_appr = sum(1 for e in eps if e.get("level", 0) > 0)
    print(f"\ntitoli ripuliti: {fixed} | episodi: {before} -> {len(eps)} "
          f"({len(set(e['id'] for e in eps))} id unici)")
    print(f"gerarchia: {linked} relazioni padre->figlio · {n_appr} episodi di approfondimento (LV1+)")


if __name__ == "__main__":
    main()
