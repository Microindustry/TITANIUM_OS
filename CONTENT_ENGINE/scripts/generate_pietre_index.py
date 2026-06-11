# generate_pietre_index.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-11
# Genera CONTENT_ENGINE/DATABASE/MONDO/PIETRE.md: l'indice delle Pietre (concetti dell'arco
# IA) -> episodi che le fondano/approfondiscono, derivato dall'asse_nina di episodes.json.
# Rigenerabile: e' una VISTA dei dati, non una fonte. Lanciare dopo build_episodes_json.

import sys
import json
from pathlib import Path
from datetime import date

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
OUT = ROOT / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "PIETRE.md"

# verticali: (prefisso Pietra, regioni)
VERTICALI = {
    "tech": ("⟡", {
        0: "LA MATERIA", 1: "LA TRACCIA", 2: "L'OFFICINA CHE GIRA SOLA",
        3: "LA MENTE CHE PARLA", 4: "LA BIBLIOTECA DELLE FONTI", 5: "LA GRANDE MAPPA",
        6: "L'ESERCITO SILENZIOSO", 7: "IL DIRETTORE",
    }),
    "finanza": ("₣", {
        1: "IL VALORE", 2: "SPENDERE MENO DI QUANTO ENTRA",
        3: "IL CUSCINETTO", 4: "FAR LAVORARE I SOLDI",
    }),
}
VERT_TITOLO = {"tech": "Tech · la Storia dell'IA", "finanza": "Finanza personale"}


def main():
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    # raggruppa per (verticale, regione)
    buckets: dict = {}
    for e in eps:
        an = (e.get("narrativa") or {}).get("asse_nina")
        if not an:
            continue
        v = an.get("verticale", "tech")
        buckets.setdefault(v, {}).setdefault(an.get("regione"), []).append((e, an))

    lines = [
        "# PIETRE — l'indice dei concetti (concetto → episodio)",
        "",
        f"*Generato da `generate_pietre_index.py` il {date.today().isoformat()} — VISTA dell'`asse_nina`*",
        "*in `episodes.json`. Non si edita a mano: si rigenera dopo `build_episodes_json.py`.*",
        "",
        "> Ogni **Pietra** è un concetto fondante. Due verticali: **Tech** (⟡, l'arco IA) e",
        "> **Finanza** (₣, l'asse \"di lato\"). Sotto ciascuna Pietra gli episodi che la **fondano**",
        "> o **approfondiscono**, per *giro di spirale*. `fonte` = tecnico · `adattato` = episodio Nina.",
        "",
    ]
    n_tot, n_posate = 0, 0
    for v, (prefix, regioni) in VERTICALI.items():
        by_reg = buckets.get(v, {})
        lines += ["---", "", f"# Verticale: {VERT_TITOLO[v]}", ""]
        for n in sorted(regioni):
            rows = sorted(by_reg.get(n, []), key=lambda x: (x[1].get("giro_spirale", 1), x[0]["id"]))
            lines.append(f"## {prefix}{n} · {regioni[n]}  ({len(rows)} episodi)")
            if not rows:
                lines.append("\n*(ancora nessun episodio — Pietra da posare)*\n")
                continue
            n_posate += 1
            lines.append("")
            lines.append("| giro | episodio | concetto | stato | richiama |")
            lines.append("|:--:|---|---|:--:|---|")
            for e, an in rows:
                n_tot += 1
                rich = " ".join(an.get("richiama", []) or []) or "—"
                lines.append(
                    f"| {an.get('giro_spirale','?')} | `{e['id']}` {e['title']} | "
                    f"{an.get('concetto','')} | {an.get('stato_nina','')} | {rich} |"
                )
            lines.append("")
    lines += [
        "---",
        "",
        "**Regola dei prerequisiti (spirale macro):** un episodio non può usare una Pietra non",
        "ancora posata. `richiama` elenca le Pietre già note che riattiva (ripetizione spaziata).",
        "⟡0 (la materia) è la radice dell'arco Tech; la richiamano tutte.",
        "",
    ]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"PIETRE.md generato: {n_posate} Pietre posate (Tech+Finanza) · {n_tot} episodi indicizzati -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
