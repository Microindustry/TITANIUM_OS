# sync_regole.py | TITANIUM_OS / AUTOMATIONS / tools | v1.0 | 2026-08-16
# FONTE UNICA delle regole: CLAUDE.md. Questo script le DERIVA in BRAIN/RULES.md.
#
# PERCHE' (#70): le regole vivevano in due liste scritte a mano che erano DIVERSE.
# CLAUDE.md aveva "Leva cognitiva 1->N" e "Output misurabile" che in RULES.md non
# c'erano; RULES.md aveva "Insegna cio' che impari" che in CLAUDE.md non c'era; e la
# numerazione era sfasata, quindi citare "regola 6" voleva dire due cose diverse a
# seconda del file. Peggio: RULES.md e' servito alla dashboard (vite.config keyFiles),
# quindi a schermo si vedeva la lista vecchia. Stesso trattamento della Mappa in #56:
# DERIVA, NON COPIA.
#
# Tocca SOLO il blocco fra i marcatori: il resto di RULES.md (REGOLE SISTEMA —
# PDF_TO_MEMORY) resta intatto. Idempotente. --check per il gate notturno (exit 1 se
# il derivato non e' allineato, senza scrivere).

from __future__ import annotations

import re
import sys
from datetime import datetime
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
SORGENTE = BASE / "CLAUDE.md"
DERIVATO = BASE / "BRAIN" / "RULES.md"

INIZIO = "<!-- REGOLE:start (derivato da CLAUDE.md — non editare a mano) -->"
FINE = "<!-- REGOLE:end -->"

# La sezione regole in CLAUDE.md: dal titolo "## LE N REGOLE" al successivo "## " o "---" isolato
SEZIONE_RX = re.compile(r"^##\s+LE\s+\d+\s+REGOLE.*?$(.*?)^---\s*$", re.M | re.S)
REGOLA_RX = re.compile(r"^(\d{1,2})\.\s+\*\*(.+?)\*\*\s*\n(.*?)(?=^\d{1,2}\.\s+\*\*|\Z)", re.M | re.S)


def estrai() -> list[tuple[str, str, str]]:
    testo = SORGENTE.read_text(encoding="utf-8")
    m = SEZIONE_RX.search(testo)
    if not m:
        raise SystemExit("ERRORE: sezione '## LE N REGOLE' non trovata in CLAUDE.md")
    return [(n, titolo.strip(), corpo.strip()) for n, titolo, corpo in REGOLA_RX.findall(m.group(1))]


def rendi(regole: list[tuple[str, str, str]]) -> str:
    righe = [
        INIZIO,
        "",
        f"# LE {len(regole)} REGOLE DELL'ECOSISTEMA",
        "*Vincoli operativi — ogni decisione viene filtrata qui.*",
        "",
        "> ⚠ **File DERIVATO.** La fonte unica è `CLAUDE.md` §LE REGOLE.",
        "> Si rigenera con `python AUTOMATIONS/tools/sync_regole.py`. Non editare a mano:",
        "> la prossima esecuzione sovrascrive. Per cambiare una regola, si cambia CLAUDE.md.",
        "",
        "---",
        "",
    ]
    for n, titolo, corpo in regole:
        righe.append(f"## {n}. {titolo}")
        for r in corpo.splitlines():
            righe.append(r.strip())
        righe.append("")
    righe += [
        "---",
        f"*Target: 15 Luglio 2030 — Matteo Benenati, 35 anni: LIBERO.*",
        f"<!-- derivato il {datetime.now().strftime('%Y-%m-%d')} da CLAUDE.md -->",
        FINE,
    ]
    return "\n".join(righe)


def main() -> int:
    regole = estrai()
    blocco = rendi(regole)
    testo = DERIVATO.read_text(encoding="utf-8") if DERIVATO.exists() else ""

    if INIZIO in testo and FINE in testo:
        nuovo = re.sub(re.escape(INIZIO) + r".*?" + re.escape(FINE), lambda _: blocco,
                       testo, flags=re.S)
    else:
        # prima esecuzione: sostituisce il vecchio blocco scritto a mano (dal titolo H1
        # fino alla riga del target 2030), lasciando in piedi tutto il resto del file
        m = re.search(r"^#\s+LE\s+\d+\s+REGOLE.*?LIBERO\.\*\s*$", testo, re.M | re.S)
        if m:
            nuovo = testo[:m.start()] + blocco + testo[m.end():]
        else:
            nuovo = blocco + "\n\n" + testo

    # il TOC generato non vale piu' per il blocco derivato: si toglie, non si mente
    nuovo = re.sub(r"^<!-- TOC -->.*?^<!-- /TOC -->\s*", "", nuovo, flags=re.M | re.S)

    allineato = testo == nuovo
    if "--check" in sys.argv:
        print(f"regole in CLAUDE.md: {len(regole)} · RULES.md "
              f"{'ALLINEATO' if allineato else 'DA RIGENERARE'}")
        return 0 if allineato else 1

    if not allineato:
        DERIVATO.write_text(nuovo, encoding="utf-8")
    print(f"sync_regole: {len(regole)} regole · {DERIVATO.relative_to(BASE)} "
          f"{'era gia allineato' if allineato else 'rigenerato'}")
    for n, titolo, _ in regole:
        print(f"   {n:>2}. {titolo}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
