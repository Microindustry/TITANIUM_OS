# storie_gap.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-12
# "LA DISTANZA TRA I PUNTINI" (idea Matteo): mette in fila gli EPISODI (i puntini della
# storia) e le AZIONI reali (commit/milestone). Dove c'e' azione ma non c'e' racconto =
# un GAP narrativo. Dove un concetto di Nina e' fermo a un solo giro di spirale = un GAP
# di profondita'. Misura le distanze e PROPONE cosa aggiungere -> potere divulgativo +
# base per l'auto-generazione (lo story_agent puo' leggere questo per sapere COSA scrivere,
# non solo "gli ultimi commit").
#
# READ-ONLY. Output: DATA/storie_gap.json (per la dashboard/auto-gen) + report leggibile.

import os
import re
import sys
import json
import subprocess
from collections import defaultdict
from datetime import datetime
from pathlib import Path

if sys.stdout is not None and getattr(sys.stdout, "encoding", "") and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[2]
EPISODES_JSON = ROOT / "DASHBOARD" / "src" / "data" / "episodes.json"
OUT = ROOT / "DATA" / "storie_gap.json"

# regioni Nina (tech) per misurare la profondita' della spirale
sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_episodes_json import REGIONI_NINA  # noqa: E402

# un commit "racconta lavoro reale" se non e' rumore automatico/di servizio
NOISE = re.compile(r"^(auto:|chore\(salva\)|chore\(config\)|docs\(bussola\)|merge )", re.IGNORECASE)


def iso_week(d: str) -> str:
    try:
        y, m, dd = map(int, d[:10].split("-"))
        iy, iw, _ = datetime(y, m, dd).isocalendar()
        return f"{iy}-W{iw:02d}"
    except Exception:
        return "?"


def git_commits() -> list[dict]:
    r = subprocess.run(["git", "log", "--since=90 days ago", "--format=%ad|%s", "--date=short"],
                       capture_output=True, text=True, encoding="utf-8", errors="replace", cwd=str(ROOT))
    out = []
    for line in r.stdout.splitlines():
        if "|" not in line:
            continue
        date, subj = line.split("|", 1)
        if NOISE.match(subj.strip()):
            continue
        out.append({"date": date.strip(), "subject": subj.strip(), "week": iso_week(date)})
    return out


def main() -> int:
    eps = json.loads(EPISODES_JSON.read_text(encoding="utf-8"))
    commits = git_commits()

    # 1) DISTANZA TIMELINE: per settimana, azioni reali vs episodi
    ep_week = defaultdict(int)
    for e in eps:
        ep_week[iso_week(e.get("data_evento", ""))] += 1
    com_week = defaultdict(list)
    for c in commits:
        com_week[c["week"]].append(c["subject"])

    timeline_gaps = []
    for wk in sorted(com_week):
        n_act = len(com_week[wk])
        n_ep = ep_week.get(wk, 0)
        # gap = settimana con molto lavoro reale ma racconto assente/scarso
        if n_act >= 4 and n_ep == 0:
            timeline_gaps.append({"settimana": wk, "azioni": n_act, "episodi": 0,
                                  "esempi": com_week[wk][:3]})

    # 2) PROFONDITA' SPIRALE: per regione Nina, quanti giri sono coperti
    region_depth = defaultdict(set)
    for e in eps:
        nina = (e.get("narrativa") or {}).get("asse_nina") or {}
        if nina.get("verticale", "tech") == "tech" and isinstance(nina.get("regione"), int):
            region_depth[nina["regione"]].add(nina.get("giro_spirale", 1))
    depth_gaps = []
    for reg, nome in REGIONI_NINA.items():
        giri = region_depth.get(reg, set())
        if not giri:
            depth_gaps.append({"regione": reg, "nome": nome, "giri": 0,
                               "proposta": f"manca del tutto un episodio per ⟡{reg} {nome}"})
        elif max(giri) < 2:
            depth_gaps.append({"regione": reg, "nome": nome, "giri": 1,
                               "proposta": f"⟡{reg} {nome} è fermo al giro 1: un approfondimento (giro 2) aggiungerebbe profondità"})

    # 3) COPERTURA FATTI: quanti episodi insegnano al RAG (gia' misurato dal lint, qui sintesi)
    result = {
        "generato": datetime.now().isoformat(timespec="seconds"),
        "episodi_totali": len(eps),
        "azioni_90gg": len(commits),
        "gap_timeline": timeline_gaps,
        "gap_profondita": depth_gaps,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    print("=" * 64)
    print(" STORIE GAP — la distanza tra i puntini (azioni vs racconto)")
    print("=" * 64)
    print(f" episodi: {len(eps)} · azioni reali (90gg): {len(commits)}\n")
    if timeline_gaps:
        print(f" GAP TIMELINE — settimane con lavoro reale ma senza episodio ({len(timeline_gaps)}):")
        for g in timeline_gaps:
            print(f"   {g['settimana']}: {g['azioni']} azioni, 0 episodi → es. {g['esempi'][0][:60]}")
    else:
        print(" GAP TIMELINE: nessuno — ogni settimana di lavoro ha il suo racconto.")
    print()
    if depth_gaps:
        print(f" GAP PROFONDITÀ — concetti di Nina da approfondire ({len(depth_gaps)}):")
        for g in depth_gaps:
            print(f"   ⟡{g['regione']} {g['nome']}: {g['proposta']}")
    else:
        print(" GAP PROFONDITÀ: nessuno — ogni regione ha almeno un approfondimento.")
    print(f"\n → {OUT.relative_to(ROOT)} (consumabile da dashboard / auto-generazione)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
