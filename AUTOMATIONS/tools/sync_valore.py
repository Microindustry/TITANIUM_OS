# sync_valore.py | TITANIUM_OS / AUTOMATIONS / TOOLS | v1.0 | 2026-07-08
# Deriva DASHBOARD/src/data/valoreData.json dal doc fonte unica in MENTE
# (SESSIONI/2026-07-08_valore-per-pilastro.md) — pattern au18: la card home
# VALORE non si scrive a mano, si rigenera da qui dopo ogni modifica al doc.
# Fallisce ad alta voce se la struttura del doc cambia (drift = errore, non silenzio).

import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

TI_ROOT = Path(__file__).resolve().parents[2]
MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))

SOURCE = MENTE / "SESSIONI" / "2026-07-08_valore-per-pilastro.md"
TARGET = TI_ROOT / "DASHBOARD" / "src" / "data" / "valoreData.json"


def die(msg: str) -> None:
    print(f"[sync_valore] ERRORE: {msg}", file=sys.stderr)
    sys.exit(1)


def section(text: str, heading_re: str) -> str:
    """Estrae il corpo di una sezione '## ...' fino al prossimo '## ' o '---'."""
    m = re.search(rf"^## {heading_re}.*?$(.*?)(?=^## |^---$|\Z)", text, re.M | re.S)
    if not m:
        die(f"sezione '## {heading_re}' non trovata nel doc — struttura cambiata?")
    return m.group(1).strip()


def clean(s: str) -> str:
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)          # via i bold
    s = re.sub(r"\[\[(.+?)\]\]", r"\1", s)           # via i wikilink
    return re.sub(r"\s+", " ", s).strip()


def main() -> None:
    if not SOURCE.exists():
        die(f"doc fonte non trovato: {SOURCE}")
    text = SOURCE.read_text(encoding="utf-8")

    # ── frame: le 3 nature economiche (righe tabella) ──
    frame = []
    for m in re.finditer(r"^\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$", text, re.M):
        frame.append({"natura": clean(m.group(1)), "pilastri": clean(m.group(2)),
                      "orizzonte": clean(m.group(3))})
    if len(frame) != 3:
        die(f"attese 3 righe nella tabella nature, trovate {len(frame)}")

    # ── il motore: i 3 strati ──
    motore_sec = section(text, r"IL MOTORE")
    strati = []
    for m in re.finditer(r"^\d\.\s+\*\*(.+?)\*\*(.*?)(?=^\d\.\s+\*\*|\n\n\*\*|\Z)",
                         motore_sec, re.M | re.S):
        # il corpo dello strato senza i sotto-bullet (la LEGGE è estratta a parte)
        body = re.sub(r"^\s*-\s+\*\*LEGGE.*$", "", m.group(2), flags=re.M | re.S)
        strati.append({"nome": clean(m.group(1)), "testo": clean(body)})
    if len(strati) != 3:
        die(f"attesi 3 strati del motore, trovati {len(strati)}")

    legge_m = re.search(r"\*\*LEGGE \(non negoziabile\):\*\*(.+?)(?=\n\s*\n|\n2\.)", motore_sec, re.S)
    vincolo_m = re.search(r"\*\*Vincolo anti-piattaforma[^*]*\*\*(.+?)(?=\n\n)", motore_sec, re.S)
    loop_m = re.search(r"\*\*Il loop generativo universale:\*\*(.+?)(?=\n\n)", motore_sec, re.S)
    if not (legge_m and vincolo_m and loop_m):
        die("LEGGE / vincolo anti-piattaforma / loop generativo non trovati nel doc")

    # ── i pilastri (### sottosezioni) ──
    pilastri = []
    for m in re.finditer(r"^### (.+?)$(.*?)(?=^### |^---$|\Z)", section(text, r"I PILASTRI"), re.M | re.S):
        body = m.group(2)
        campi = {}
        for k, pat in [("valore", r"\*\*Valore(?: per un'azienda)?:\*\*"),
                       ("prodotto", r"\*\*Prodotto:\*\*"),
                       ("natura", r"\*\*Natura:\*\*")]:
            f = re.search(rf"-\s+{pat}(.+?)(?=^-\s+\*\*|\Z)", body, re.M | re.S)
            campi[k] = clean(f.group(1)) if f else ""
        if not campi["valore"]:
            die(f"pilastro '{m.group(1)}' senza campo Valore — struttura cambiata?")
        pilastri.append({"titolo": clean(m.group(1)), **campi})
    if len(pilastri) < 6:
        die(f"attesi >=6 pilastri, trovati {len(pilastri)}")

    # ── cosa non promettiamo ──
    non_promesse = [clean(b) for b in re.findall(r"^- (.+?)$", section(text, r"COSA NON PROMETTIAMO"), re.M)]

    # ── il messaggio originale di Matteo (blockquote) ──
    msg_sec = section(text, r"IL MESSAGGIO ORIGINALE")
    quote = " ".join(l.lstrip("> ").strip() for l in msg_sec.splitlines() if l.startswith(">"))
    if len(quote) < 100:
        die("messaggio originale di Matteo non trovato o troppo corto")

    out = {
        "_generato_da": "AUTOMATIONS/tools/sync_valore.py — NON editare a mano",
        "_fonte_unica": "MENTE/SESSIONI/2026-07-08_valore-per-pilastro.md",
        "_generato_il": datetime.now().isoformat(timespec="seconds"),
        "frame": frame,
        "motore": {
            "strati": strati,
            "legge": clean(legge_m.group(1)),
            "vincolo": clean(vincolo_m.group(1)),
            "loop": clean(loop_m.group(1)),
        },
        "pilastri": pilastri,
        "non_promesse": non_promesse,
        "messaggio_matteo": {"data": "2026-07-08", "testo": quote},
    }
    TARGET.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[sync_valore] OK — {TARGET.name}: {len(pilastri)} pilastri, "
          f"{len(strati)} strati, {len(frame)} nature, msg {len(quote)} char")


if __name__ == "__main__":
    main()
