# generate_indice_cammino.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-07-04
# Genera CONTENT_ENGINE/DATABASE/MONDO/INDICE_CAMMINO.md: l'ordine canonico in cui Nina
# ha camminato (casella = EP_N2_NN in ordine numerico), derivato da episodes.json.
# Nato dall'attacco #52 (03 F1): l'indice scritto a mano era scaduto — 9/15 titoli
# sbagliati e fermo a 15 caselle su 51. Da oggi e' una VISTA dei dati, come PIETRE.md:
# non si edita a mano, si rigenera dopo build_episodes_json (sync_mondo lo porta nel vault).

import re
import sys
import json
from pathlib import Path
from datetime import date

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
PROPOSTI_DIR = ROOT / "CONTENT_ENGINE" / "DATABASE" / "episodes" / "S_AVVENTURA" / "_PROPOSTI"
OUT = ROOT / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "INDICE_CAMMINO.md"

_N2 = re.compile(r"^EP_N2_(\d+)$")


def main():
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    cammino = []
    for e in eps:
        m = _N2.match(e["id"])
        if m:
            cammino.append((int(m.group(1)), e))
    cammino.sort(key=lambda x: x[0])

    lines = [
        "---",
        "id: INDICE_CAMMINO",
        'title: Indice del Cammino — il "libro" di Nina (ordine canonico)',
        "stagione: AV",
        "status: ready",
        "tags: nina, nina-v2, cammino, indice, mappa, canone, libro, caselle, open-loop",
        "---",
        "",
        '# Indice del Cammino — il "libro" di Nina',
        "",
        f"*Generato da `generate_indice_cammino.py` il {date.today().isoformat()} — VISTA di `episodes.json`.*",
        "*Non si edita a mano: si rigenera dopo `build_episodes_json.py` (l'indice a mano era scaduto — attacco #52, 03 F1).*",
        "*Estende [[NINA_V2_ARCHITETTURA]] (§\"il libro è il viaggio sulla mappa\") e [[BIBBIA_DEL_MONDO]].*",
        "*Coerenza personaggi: [[NINA_V2_CHARACTER_BIBLE]]. Pietre: [[PIETRE]].*",
        "",
        "> **Cos'è questo file.** La Mappa di Nina è **non-lineare e ri-percorribile**: si entra da",
        "> qualunque casella, si cammina in qualunque ordine (ogni episodio è un punto d'ingresso",
        "> autosufficiente). MA il *libro* è lineare nei **passi di Nina**: **questo indice È l'ordine",
        "> in cui Nina ha camminato**, tenuto insieme dagli **open loop**. — *Una sola verità: titoli e",
        "> Pietre vengono dai dati, non dalla memoria di chi scrive.*",
        "",
        "## Come leggere la tabella",
        "- **Casella** = il passo del viaggio (l'ordine del libro). **Pietra ⟡/₣** = la materia/concetto (il nodo sulla Mappa).",
        "- **L'ordine delle Pietre NON è numerico — è voluto.** Il cammino segue la logica *del racconto*",
        "  (pedagogica), non il numero della Pietra. La Mappa resta navigabile per Pietra; il libro segue i passi.",
        "",
        f"## Il cammino (caselle 1 → {len(cammino)})",
        "",
        "| # | Episodio | Titolo | Pietra | Il concetto (1 riga) |",
        "|---|----------|--------|--------|----------------------|",
    ]

    pietre_viste = set()
    for n, e in cammino:
        an = (e.get("narrativa") or {}).get("asse_nina") or {}
        pietra = an.get("pietra", "—")
        giro = an.get("giro_spirale")
        p_label = f"{pietra} {an.get('regione_nome', '')}".strip() if pietra not in pietre_viste else \
                  f"{pietra} (giro {giro})" if giro else pietra
        pietre_viste.add(pietra)
        concetto = (an.get("concetto") or e.get("sottotitolo") or "").strip()
        if len(concetto) > 90:
            concetto = concetto[:87] + "…"
        lines.append(f"| {n} | `{e['id']}` | {e['title']} | {p_label} | {concetto} |")

    lines += [
        "",
        "## I due movimenti sulla Mappa",
        "- **Avanti:** l'arco unico dal **metallo alla mente** (materia → automazione → IA → orchestrazione).",
        "- **Di lato:** i **salti laterali** in materie nuove (Finanza ₣, e le prossime) con gli stessi piedi —",
        "  prova che gli strumenti imparati funzionano ovunque. La mappa cresce *in ampiezza*, non in età di Nina.",
        "",
    ]

    # caselle proposte: lette dal filesystem, non a mano (03 F1: la sezione puntava all'episodio sbagliato)
    proposte = sorted(p.stem for p in PROPOSTI_DIR.glob("EP_*.md")) if PROPOSTI_DIR.exists() else []
    lines.append("## Caselle proposte (non ancora nel cammino)")
    if proposte:
        for s in proposte:
            lines.append(f"- `{s}` — in `S_AVVENTURA/_PROPOSTI/` (proposta del generatore, **da validare**).")
    else:
        lines.append("*(nessuna proposta in attesa)*")
    lines += ["", "<!-- COLLEGATI: rigenerato dall'ecosistema a ogni rebuild Obsidian -->", ""]

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"INDICE_CAMMINO.md generato: {len(cammino)} caselle · {len(proposte)} proposte -> {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
