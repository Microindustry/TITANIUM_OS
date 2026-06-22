# fix_titoli_vault.py | TITANIUM_OS / CONTENT_ENGINE | v1.0 | 2026-06-23
# Normalizza i TITOLI (H1 + frontmatter `title:`) dei file MENTE malformati:
#   - estensione incollata nel nome/titolo (es. "assoluto-v6pdf" -> "Assoluto V6")
#   - nessun H1 (in Obsidian il titolo diventa il nome-file mangled)
#   - H1-mostro (intero doc collassato su una riga, newline persi in conversione)
# ADDITIVO E SICURO: NON rinomina i file (967 wikilink puntano agli stem) e non
# cancella nulla; tocca solo H1/frontmatter. Idempotente. Il nome vero si deriva
# dal frontmatter (source > notebook > title) o, in mancanza, dallo stem pulito.
# Dopo: ri-eseguire vault_intersect + storie_intersect (rigenerano i Collegati con
# i titoli puliti) e rag-update. Uso: python fix_titoli_vault.py [--apply]

import os
import re
import sys
import argparse
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception: pass

MENTE = Path(os.environ.get("MENTE_DIR", r"C:\Users\teo\MICROINDUSTRY\MENTE"))
SKIP_DIRS = {".obsidian", ".git", "_allegati"}
SKIP_REL = {os.path.join("KNOWLEDGE", "RESEARCH")}   # paper web: titoli loro, fuori dal RAG
SKIP_STEMS = {"HOME", "README"}

_EXT_TAIL = re.compile(r"[\s_\-.]*(pdf|docx|xlsx|pptx|md|txt)$", re.I)
_FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
_H1 = re.compile(r"^#\s+(.+)$", re.M)
_NUM = re.compile(r"^(\d{1,3})[_\-]")
_DATE = re.compile(r"^(\d{4}-\d{2}-\d{2})")

H1_MAX = 400   # oltre = H1-mostro (doc collassato, newline persi) -> sostituisci.
               # Sotto resta intatto: anche titoli lunghi legittimi (es. paper) si tengono.


def clean_title(raw: str) -> str:
    t = raw.strip().strip("\"'").strip()
    t = _EXT_TAIL.sub("", t)                       # togli estensione incollata
    t = t.replace("_", " ").replace("-", " ")
    t = re.sub(r"\s+", " ", t).strip()
    t = t.rstrip(" .")                              # via punteggiatura finale residua
    def cap(w: str) -> str:
        if not w: return w
        if w.isupper() or any(c.isdigit() for c in w): return w   # acronimi/sigle/versioni
        return w[:1].upper() + w[1:]
    return " ".join(cap(w) for w in t.split())


def fm_get(fm: str, key: str) -> str:
    m = re.search(rf"^{key}:\s*(.+)$", fm, re.M)
    return m.group(1).strip().strip("\"'") if m else ""


def derive_title(stem: str, fm: str) -> str:
    md = _DATE.match(stem)
    if md and len(stem) <= 12:                       # file-data (sessioni): titolo leggibile
        return f"Sessione {md.group(1)}"
    base = ""
    for key in ("source", "notebook", "title"):
        v = fm_get(fm, key)
        if v:
            base = clean_title(v); break
    if not base:
        base = clean_title(stem)
    # mantieni l'ordine NN_ del notebook come prefisso leggibile
    m = _NUM.match(stem)
    if m and not base[:3].strip().split(" ")[0].isdigit():
        base = f"{int(m.group(1)):02d} · {base}"
    return base


def needs_fix(stem: str, h1: str | None) -> bool:
    mangled_name = bool(_EXT_TAIL.search(stem))   # serve frontmatter title pulito
    no_h1 = h1 is None                            # serve un H1 in testa
    monster_h1 = h1 is not None and len(h1) > H1_MAX
    return mangled_name or no_h1 or monster_h1


TOP_REGION = 1500   # l'intersect legge il titolo dai primi ~1500 char: l'H1 va QUI


def _top_h1(text: str, body_start: int):
    """Cerca l'H1 SOLO nella zona iniziale (post-frontmatter, primi TOP_REGION char).
    Gli heading nel corpo profondo NON vanno mai toccati. Ritorna (start,end,testo)
    in offset assoluti, o None."""
    region = text[body_start:body_start + TOP_REGION]
    m = _H1.search(region)
    if not m:
        return None
    return body_start + m.start(), body_start + m.end(), m.group(1).strip()


def process(p: Path, apply: bool) -> tuple[bool, str]:
    try:
        txt = p.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return False, ""
    fmm = _FM.match(txt)
    fm = fmm.group(1) if fmm else ""
    body0 = fmm.end() if fmm else 0
    top = _top_h1(txt, body0)
    h1 = top[2] if top else None

    if not needs_fix(p.stem, h1):
        return False, ""

    title = derive_title(p.stem, fm)
    if not title:
        return False, ""

    new = txt
    # 1) frontmatter title: (aggiungi se manca, altrimenti aggiorna)
    if fmm:
        if re.search(r"^title:\s*.+$", fm, re.M):
            new_fm = re.sub(r"^title:\s*.+$", f'title: "{title}"', fm, count=1, flags=re.M)
        else:
            new_fm = fm.rstrip() + f'\ntitle: "{title}"'
        new = new[:fmm.start(1)] + new_fm + new[fmm.end(1):]

    # 2) H1 in testa: sostituisci se mostro, inserisci se assente nella zona iniziale.
    #    Mai toccare heading di corpo profondi (oltre TOP_REGION).
    fmm2 = _FM.match(new)
    body0b = fmm2.end() if fmm2 else 0
    top2 = _top_h1(new, body0b)
    if top2 and len(top2[2]) > H1_MAX:                   # H1-mostro in testa -> sostituisci
        new = new[:top2[0]] + f"# {title}" + new[top2[1]:]
    elif top2 is None:                                   # nessun H1 in testa -> inserisci
        new = new[:body0b] + f"\n# {title}\n\n" + new[body0b:]

    if new == txt:
        return False, ""
    if apply:
        p.write_text(new, encoding="utf-8")
    return True, title


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="scrive le modifiche (default: dry-run)")
    ap.add_argument("--limit-show", type=int, default=15)
    args = ap.parse_args()

    if not MENTE.exists():
        print(f"MENTE assente: {MENTE}"); return 1

    fixed, samples = 0, []
    for p in sorted(MENTE.rglob("*.md")):
        if any(part in SKIP_DIRS for part in p.parts) or p.stem in SKIP_STEMS:
            continue
        rel = str(p.relative_to(MENTE))
        if any(rel.startswith(d + os.sep) for d in SKIP_REL):
            continue
        did, title = process(p, args.apply)
        if did:
            fixed += 1
            if len(samples) < args.limit_show:
                samples.append(f"  {p.relative_to(MENTE)}  ->  \"{title}\"")

    mode = "APPLICATO" if args.apply else "DRY-RUN (niente scritto)"
    print(f"[fix_titoli_vault] {mode}: {fixed} file con titolo da correggere")
    for s in samples:
        print(s)
    if not args.apply and fixed:
        print("  ... esegui con --apply per scrivere.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
