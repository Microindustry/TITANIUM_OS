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

# ── STRUTTURA A 2 ASSI (canone: DATABASE/STORIE_STRUTTURA_2ASSI.md, NCP-compatibile) ──
# Asse RUOLO = diario del sistema (tipo, derivato dalla stagione). Asse NINA = percorso
# educativo (concetto/regione/pietra/giro_spirale/richiama), solo se l'episodio insegna.
# Rebuild-safe: la narrativa si ricalcola a ogni build (a differenza dello spike che la
# scriveva nel json e veniva persa). I miei N-livelli alimentano il giro_spirale: un
# approfondimento (figlio) = un giro più profondo sullo stesso concetto del padre.
ROLE_FROM_STAGIONE = {
    "S0": "origine", "S1": "presente", "ST": "sistema", "S2": "costruzione",
    "MOM": "momento", "AUTO": "auto", "AV": "avventura",
}
REGIONI_NINA = {
    0: "LA MATERIA", 1: "LA TRACCIA", 2: "L'OFFICINA CHE GIRA SOLA",
    3: "LA MENTE CHE PARLA", 4: "LA BIBLIOTECA DELLE FONTI", 5: "LA GRANDE MAPPA",
    6: "L'ESERCITO SILENZIOSO", 7: "IL DIRETTORE",
}
# verticale FINANZA personale (asse "di lato": cambiare discorso) — regioni proprie, Pietre ₣
REGIONI_FINANZA = {
    1: "IL VALORE", 2: "SPENDERE MENO DI QUANTO ENTRA",
    3: "IL CUSCINETTO", 4: "FAR LAVORARE I SOLDI",
}
# id concetto-fondante -> (concetto, regione, giro_base, richiama, stato)
NINA_SEED = {
    # i 4 semi (fonte) — dalla tabella PILOTA del canone
    "EP_SEED_CONTROLLO": ("un posto solo per governare il disordine", 7, 1, [], "fonte"),
    "EP_SEED_WATCHER":   ("stare informati senza farlo a mano", 2, 2, ["⟡1"], "fonte"),
    "EP_SEED_GRAPHIFY":  ("la mappa della conoscenza", 5, 1, ["⟡4"], "fonte"),
    "EP_SEED_RETE":      ("vedere il sistema come una mappa", 5, 2, ["⟡4"], "fonte"),
    # gli episodi di Nina (adattati)
    "EP_AV_M0": ("la Materia: il gesto sul metallo, la radice di tutto", 0, 1, [], "adattato"),
    "EP_AV_00": ("il Grande Loop", 1, 1, [], "adattato"),
    "EP_AV_01": ("l'Automazione", 2, 1, ["⟡1"], "adattato"),
    "EP_AV_02": ("l'LLM, la mente che parla", 3, 1, ["⟡1"], "adattato"),
    "EP_AV_03": ("il RAG, la biblioteca delle fonti", 4, 1, ["⟡3"], "adattato"),
    "EP_AV_04": ("la Wiki, la grande mappa", 5, 1, ["⟡4"], "adattato"),
    "EP_AV_05": ("gli Agenti, l'esercito silenzioso", 6, 1, ["⟡2", "⟡4"], "adattato"),
    "EP_AV_06": ("l'Orchestrazione, il direttore", 7, 1, ["⟡5", "⟡6"], "adattato"),
    # Nina v2 — l'apertura del viaggio (ancorata a La Materia), formato v2
    "EP_N2_01": ("il gesto fatto bene sulla materia vera", 0, 1, [], "adattato"),
    "EP_N2_02": ("la precisione e' una relazione (il soffio di troppo)", 0, 2, [], "adattato"),
    "EP_N2_03": ("la ripetibilita': mille volte uguale, battere la deriva", 0, 3, [], "adattato"),
    "EP_N2_04": ("la mappa viva: il sistema che dice la verita'", 5, 1, ["⟡0"], "adattato"),
    "EP_N2_05": ("prima la mano poi la macchina (automazione)", 2, 1, ["⟡0"], "adattato"),
    # le fonti tecniche dell'arco (Pietre)
    "EP_FILONE_00": ("la materia: scelta, controllo, precisione", 0, 1, [], "fonte"),
    "EP_S0_00":     ("il Socio: un gesto, più frutti", 1, 1, [], "fonte"),
    "MOM_01_LA_PRIMA_AUTOMAZIONE": ("la prima automazione", 2, 1, ["⟡1"], "fonte"),
    "EP_S2_01_IL_CERVELLO_IBRIDO": ("il cervello ibrido: cloud + locale", 3, 1, ["⟡1"], "fonte"),
    "EP_T05": ("il sistema pensa: recupero con fonti", 4, 1, ["⟡3"], "fonte"),
    "EP_T04": ("SINAPSI: la memoria che collega", 4, 2, ["⟡3"], "fonte"),
    "EP_T02": ("NeuroMap: il sistema come mappa", 5, 1, ["⟡4"], "fonte"),
    "EP_T01": ("la Dashboard: vedere il sistema", 5, 1, ["⟡4"], "fonte"),
    "MOM_03_L_ESERCITO": ("l'esercito: tante entità che fanno", 6, 1, ["⟡2", "⟡4"], "fonte"),
    "EP_S2_02_L_ORCHESTRATORE": ("l'orchestratore: chi fa cosa e quando", 7, 1, ["⟡5", "⟡6"], "fonte"),
    "EP_S2_03_LA_TELA": ("la Tela: il calendario notturno", 7, 2, ["⟡6"], "fonte"),
}
# verticale finanza: id -> (concetto, regione, giro, richiama, stato)
FINANZA_SEED = {
    "EP_AV_FIN_01": ("cosa sono i soldi: lavoro e fiducia, scambiabili", 1, 1, [], "adattato"),
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


def apply_narrativa(eps: list) -> int:
    """Struttura a 2 assi (additiva, idempotente, rebuild-safe).
    - asse_ruolo.tipo su TUTTI gli episodi, derivato dalla stagione;
    - asse_nina sui concetti-fondanti (NINA_SEED) o se gia' dichiarato nell'episodio;
    - i figli (approfondimenti) EREDITANO l'asse_nina del padre con giro_spirale +1
      (un approfondimento = un giro piu' profondo della spirale sullo stesso concetto).
    Ritorna quanti episodi hanno un asse_nina."""
    by_id = {e.get("id"): e for e in eps}

    for e in eps:
        narr = e.get("narrativa") or {}
        ar = narr.get("asse_ruolo") or {}
        ar.setdefault("tipo", ROLE_FROM_STAGIONE.get(e.get("stagione"), "auto"))
        narr["asse_ruolo"] = ar
        e["narrativa"] = narr

    def _set_nina(seed: dict, verticale: str, regioni: dict, prefix: str):
        for eid, (concetto, reg, giro, richiama, stato) in seed.items():
            e = by_id.get(eid)
            if not e:
                continue
            e["narrativa"]["asse_nina"] = {
                "verticale": verticale, "concetto": concetto, "regione": reg,
                "regione_nome": regioni.get(reg, "?"), "pietra": f"{prefix}{reg}",
                "giro_spirale": giro, "richiama": richiama, "stato_nina": stato,
            }

    _set_nina(NINA_SEED, "tech", REGIONI_NINA, "⟡")
    _set_nina(FINANZA_SEED, "finanza", REGIONI_FINANZA, "₣")

    # eredita ai figli in ordine di profondita' (il padre e' gia' risolto)
    for e in sorted(eps, key=lambda x: x.get("level", 0)):
        if e.get("level", 0) == 0:
            continue
        if "asse_nina" in e.get("narrativa", {}):
            continue  # mappatura esplicita ha la precedenza
        p = by_id.get(e.get("parent_id"))
        pn = p and p.get("narrativa", {}).get("asse_nina")
        if not pn:
            continue
        child = dict(pn)
        child["giro_spirale"] = pn.get("giro_spirale", 1) + 1
        e["narrativa"]["asse_nina"] = child

    return sum(1 for e in eps if "asse_nina" in e.get("narrativa", {}))


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

    # 4-bis) INGEST DIRETTO per id di frontmatter (robusto): qualsiasi .md episodio con
    # un `id:` non ancora presente viene aggiunto. L'orphan-recovery dell'audit faceva
    # cilecca sui file col prefisso collidente (es. EP_AV_00_2 scambiato per EP_AV_00);
    # qui ci si fida dell'id dichiarato, non dell'euristica sul nome.
    EP_SRC = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
    present = {e.get("id") for e in eps}
    direct = []
    if EP_SRC.exists():
        for p in sorted(EP_SRC.rglob("*.md")):
            fm = _parse_frontmatter(p.read_text(encoding="utf-8", errors="replace"))
            fid = fm.get("id")
            if fid and fid not in present:
                ep = _episode_from_md(p, present)
                present.add(ep["id"])
                eps.append(ep)
                direct.append(ep["id"])
    if direct:
        print(f"ingest diretto (id frontmatter): +{len(direct)} {direct}")

    # 5) gerarchia a livelli (additiva): parent/level/children su tutti gli episodi
    linked = build_tree(eps)

    # 6) struttura a 2 assi (asse_ruolo per tutti, asse_nina sui concetti + eredità ai figli)
    n_nina = apply_narrativa(eps)

    EPISODES_JSON.write_text(json.dumps(eps, ensure_ascii=False, indent=2), encoding="utf-8")
    n_appr = sum(1 for e in eps if e.get("level", 0) > 0)
    print(f"\ntitoli ripuliti: {fixed} | episodi: {before} -> {len(eps)} "
          f"({len(set(e['id'] for e in eps))} id unici)")
    print(f"gerarchia: {linked} relazioni padre->figlio · {n_appr} episodi di approfondimento (LV1+)")
    print(f"2 assi: asse_ruolo su tutti · asse_nina su {n_nina} episodi (concetti + approfondimenti)")


if __name__ == "__main__":
    main()
