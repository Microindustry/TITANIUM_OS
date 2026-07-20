# setup_obsidian.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.2 | 2026-07-20
# SETUP del vault Obsidian: porta DENTRO MENTE (il vault) anche le STORIE/episodi che
# vivono nel repo, cosi Obsidian mostra TUTTO il sapere in un posto solo (conoscenza +
# racconto + evoluzione). Poi rigenera HOME + indici. Un comando = vault pronto.
#
# Sync UNIDIREZIONALE repo -> MENTE/STORIE (gli episodi sono generati nel repo, canonici
# li': qui se ne tiene una copia navigabile in Obsidian). Idempotente. Wired nella notturna.

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EPISODES_SRC = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes"
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
MONDO_SRC = ROOT / "CONTENT_ENGINE" / "DATABASE" / "MONDO"
MENTE = Path(os.environ.get("MENTE_DIR", r"C:\Users\teo\MICROINDUSTRY\MENTE"))
STORIE_DST = MENTE / "STORIE"
MONDO_DST = MENTE / "KNOWLEDGE" / "MONDO"

_C_START = "<!-- COLLEGATI:start (auto, storie_intersect) -->"
_C_END = "<!-- COLLEGATI:end -->"
# staging/archivio: non canone (sess.#43) — non si sincronizzano né si intessono nel vault
_SKIP_PARTS = {"_ARCHIVIO", "_PROPOSTI"}
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
        if any(part in _SKIP_PARTS for part in rel.parts[:-1]):
            continue                                   # archiviati/proposti: non canone
        dst = STORIE_DST / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        # copia solo se diverso (mtime/size) — evita scritture inutili
        if dst.exists() and dst.stat().st_size == src.stat().st_size \
           and int(dst.stat().st_mtime) == int(src.stat().st_mtime):
            continue
        shutil.copy2(src, dst)
        n += 1
    return n


def sync_mondo() -> int:
    """v1.1: porta nel vault anche la bibbia del MONDO (BIBBIA_DEL_MONDO, MAPPA_AVVENTURA,
    PIETRE, NINA_V2_*, ...) — prima [[BIBBIA_DEL_MONDO]] e [[MAPPA_AVVENTURA]] in _CANONE
    erano wikilink fantasma. Solo i .md di primo livello (LOGHI/POSTER/PERSONAGGI restano
    nel repo). Destinazione KNOWLEDGE/MONDO: cosi' vault_intersect li intesse nella rete."""
    if not MONDO_SRC.exists():
        return 0
    n = 0
    for src in sorted(MONDO_SRC.glob("*.md")):
        dst = MONDO_DST / src.name
        dst.parent.mkdir(parents=True, exist_ok=True)
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

    files = [f for f in (STORIE_DST.rglob("*.md") if STORIE_DST.exists() else [])
             if not any(part in _SKIP_PARTS for part in f.relative_to(STORIE_DST).parts[:-1])]
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
    return n, id2stem


# fasi del filone, in ordine (combacia con storie_evoluzione.FASE_ORDER)
_FASI = ["I · La Materia", "II · Il Secondo Cervello", "III · La Mente che Impara",
         "IV · Il Mondo", "₣ · Il Valore (Finanza)", "Diario del Sistema"]


def gen_evoluzione_moc(id2stem):
    """Genera _EVOLUZIONE.md: la mappa 'come siamo arrivati qui' — le spirali dei
    concetti (l'evoluzione del sapere) + gli atti del filone. Dai dati `evoluzione`
    di episodes.json (scritti da storie_evoluzione). Wikilink ai nomi reali delle note."""
    if not EPISODES_JSON.exists():
        return False
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))

    def link(eid, title=None):
        stem = id2stem.get(eid)
        t = title or eid
        return f"[[{stem}|{t}]]" if stem else f"{t}"

    out = ["# 🧬 EVOLUZIONE — come siamo arrivati qui",
           "",
           "*La storia non è una lista: è una spirale. Qui gli episodi ordinati per "
           "**come il sapere si è evoluto** — i concetti ripresi più a fondo, le decisioni "
           "che sono cambiate, gli atti del filone «dal metallo alla mente».*",
           "", "> Generato da `storie_evoluzione` — non editare a mano (si rigenera).", ""]

    # 1) LE SPIRALI (concetti a piu' giri) — l'evoluzione vera
    spirali = {}
    for e in eps:
        sp = (e.get("evoluzione") or {}).get("spirale")
        if sp:
            key = tuple(x["id"] for x in sp)
            spirali[key] = sp
    out.append("## 🌀 Le spirali del sapere")
    out.append("*Stesso concetto, ripreso a profondità crescente (Bruner). Ogni freccia = un'evoluzione.*")
    out.append("")
    if spirali:
        for sp in sorted(spirali.values(), key=lambda s: -len(s)):
            catena = " → ".join(f"{link(x['id'], x['title'])} _(giro {x['giro']})_" for x in sp)
            out.append(f"- {catena}")
    else:
        out.append("_nessuna spirale ancora — servono concetti ripresi a giri diversi_")
    out.append("")

    # 2) GLI ATTI DEL FILONE
    out.append("## 🎬 Gli atti del filone")
    by_fase = {}
    for e in eps:
        f = (e.get("evoluzione") or {}).get("fase", "Diario del Sistema")
        by_fase.setdefault(f, []).append(e)
    for fase in _FASI:
        lst = by_fase.get(fase)
        if not lst:
            continue
        lst.sort(key=lambda e: e.get("data_evento", ""))
        out.append(f"\n### {fase}  ·  {len(lst)} episodi")
        for e in lst:
            d = (e.get("data_evento") or "")[:10]
            agg = (e.get("evoluzione") or {}).get("aggiorna")
            suff = f"  ⟲ _aggiorna_ {link(agg['id'], agg['title'])}" if agg else ""
            out.append(f"- `{d}` {link(e['id'], e.get('title', e['id']))}{suff}")
    out.append("")

    (STORIE_DST / "_EVOLUZIONE.md").write_text("\n".join(out), encoding="utf-8")
    return True


def gen_index():
    """Rigenera HOME + indici (riusa genera_wiki_index)."""
    script = ROOT / "CONTENT_ENGINE" / "scripts" / "genera_wiki_index.py"
    subprocess.run([sys.executable, str(script)], check=False)


def run_ecosystem_bridge():
    """Inietta i ponti CROSS-MONDO (episodio<->sapere). Va DOPO il sync (che riscrive
    le STORIE), altrimenti i ponti negli episodi si perderebbero alla copia successiva."""
    script = ROOT / "CONTENT_ENGINE" / "scripts" / "ecosystem_bridge.py"
    subprocess.run([sys.executable, str(script)], check=False)


def run_vault_intersect():
    """Interseca il sapere NON-storie (KNOWLEDGE/V32/MIMS/...) e rinfresca gli orfani di
    RETE (DATA/audit/vault_orphans.json) che night_audit legge. Senza questo, il segnale
    orfani scadrebbe (gate <48h). Tesi Konik: il grafo come diagnosi CONTINUA del vault."""
    script = ROOT / "CONTENT_ENGINE" / "scripts" / "vault_intersect.py"
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
    nm = sync_mondo()
    print(f"  MONDO (bibbia/mappa/pietre) sincronizzato: {nm} aggiornate in MENTE/KNOWLEDGE/MONDO/")
    nc, id2stem = inject_collegati()
    print(f"  Intersezioni (wikilink Collegati) iniettate in {nc} note → il grafo connette gli episodi")
    if gen_evoluzione_moc(id2stem):
        print("  Mappa _EVOLUZIONE.md generata (spirali + atti del filone)")
    run_ecosystem_bridge()
    print("  Ponti cross-mondo (episodio↔sapere) iniettati → ecosistema unito")
    run_vault_intersect()
    print("  Sapere non-storie intersecato + orfani di RETE rinfrescati (vault_orphans.json)")
    gen_index()
    print(f"\n  Vault pronto: {MENTE}")
    print("  Apri in Obsidian (launcher Desktop) -> HOME.md -> graph view.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
