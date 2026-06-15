#!/usr/bin/env python3
# pct_sync.py | TITANIUM_OS / NODES / PCT_SYNC | v1.0 | 2026-06-15
# Agente di COERENZA: allinea le percentuali dei pilastri in tutto l'ecosistema
# alla FONTE UNICA = BRAIN/STATE.json (pillars[X].pct_complete) + ROOT = media.
#
# PERCHE': il pct di ogni pilastro era scritto a mano in piu' posti (STATE.json,
# MappaView SYSTEM_TREE, CanvasLayout PILLARS_DATA) e la ROOT come media a mano.
# A ogni avanzamento di STATE i valori hardcoded restavano indietro -> drift
# ricorrente (critiche au18 / gc05 / n04, corretto a mano due volte). Questo
# agente lo ripara da solo: STATE comanda, la dashboard segue.
#
# SICURO by-design: sostituisce SOLO cifre dentro pattern ancorati e gia'
# esistenti (mai struttura) -> non puo' rompere il TypeScript. Idempotente.
#
# Uso:
#   python NODES/PCT_SYNC/pct_sync.py           # CHECK: riporta i drift (exit 1 se ce ne sono)
#   python NODES/PCT_SYNC/pct_sync.py --fix     # FIX: riallinea e scrive il report
#   python NODES/PCT_SYNC/pct_sync.py --quiet   # meno output (per hook/notturna)

import json
import re
import sys
import datetime
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
STATE = BASE / "BRAIN" / "STATE.json"
MAPPA = BASE / "DASHBOARD" / "src" / "components" / "MappaView.tsx"
CANVAS = BASE / "DASHBOARD" / "src" / "components" / "CanvasLayout.tsx"
REPORT = BASE / "DATA" / "audit" / "pct_sync.json"

# chiave STATE -> label usata in PILLARS_DATA (CanvasLayout, "VITA NATURA" con lo spazio)
PILLARS_LABEL = {
    "V32": "V32", "MIMS": "MIMS", "GENESIS": "GENESIS",
    "VITA_NATURA": "VITA NATURA", "IDENTITY": "IDENTITY",
}


def truth():
    """Legge la fonte unica. Ritorna ({chiave: pct}, root_media)."""
    st = json.loads(STATE.read_text(encoding="utf-8"))
    pil = {k: int(round(v.get("pct_complete", 0)))
           for k, v in st.get("pillars", {}).items() if k in PILLARS_LABEL}
    root = int(round(sum(pil.values()) / len(pil))) if pil else 0
    return pil, root


def sync_mappa(text, pil, root):
    """Riallinea i 5 nodi-pilastro (type:"pillar" + hasChildren) e la ROOT
    (type:"root") in MappaView. Ritorna (nuovo_testo, lista_diff)."""
    diffs = []
    out = []
    cur = None
    for line in text.splitlines(keepends=True):
        # ROOT_NODE: la riga con pillar:"ROOT" porta il pct = media dei pilastri
        # (type:"root" e pct stanno su righe diverse, quindi ancoro su pillar:"ROOT")
        if 'pillar: "ROOT"' in line and 'pct:' in line:
            m = re.search(r'(pct:\s*)(\d+)', line)
            if m and int(m.group(2)) != root:
                diffs.append(("MappaView/ROOT", int(m.group(2)), root))
                line = line[:m.start(2)] + str(root) + line[m.end(2):]
            out.append(line)
            continue
        # apertura di un nodo-pilastro: memorizzo la chiave
        if 'type: "pillar"' in line:
            pm = re.search(r'pillar:\s*"([^"]+)"', line)
            cur = pm.group(1) if pm else None
        # riga di riepilogo del pilastro: e' l'unica con hasChildren + pct
        if cur in pil and "hasChildren: true" in line:
            m = re.search(r'(pct:\s*)(\d+)', line)
            if m and int(m.group(2)) != pil[cur]:
                diffs.append((f"MappaView/{cur}", int(m.group(2)), pil[cur]))
                line = line[:m.start(2)] + str(pil[cur]) + line[m.end(2):]
            cur = None
        out.append(line)
    return "".join(out), diffs


def sync_canvas(text, pil):
    """Riallinea le 5 righe di PILLARS_DATA in CanvasLayout (pattern
    label:"X", pct:N, bar:...). Ritorna (nuovo_testo, lista_diff)."""
    diffs = []
    for key, target in ((k, pil[k]) for k in pil):
        label = PILLARS_LABEL[key]
        pat = re.compile(r'(label:\s*"' + re.escape(label) + r'",\s*pct:\s*)(\d+)(,\s*bar:)')

        def _r(m, key=key, target=target):
            old = int(m.group(2))
            if old != target:
                diffs.append((f"PILLARS_DATA/{key}", old, target))
                return m.group(1) + str(target) + m.group(3)
            return m.group(0)

        text = pat.sub(_r, text)
    return text, diffs


def main():
    fix = "--fix" in sys.argv
    quiet = "--quiet" in sys.argv

    pil, root = truth()
    diffs = []

    mt = MAPPA.read_text(encoding="utf-8")
    mt2, d1 = sync_mappa(mt, pil, root)
    diffs += d1

    ct = CANVAS.read_text(encoding="utf-8")
    ct2, d2 = sync_canvas(ct, pil)
    diffs += d2

    if fix:
        if d1:
            MAPPA.write_text(mt2, encoding="utf-8")
        if d2:
            CANVAS.write_text(ct2, encoding="utf-8")

    rep = {
        "ts": datetime.datetime.now().isoformat(timespec="seconds"),
        "mode": "fix" if fix else "check",
        "truth": {"pillars": pil, "ROOT": root},
        "drift": [{"target": t, "was": w, "now": n} for (t, w, n) in diffs],
        "aligned": len(diffs) == 0,
    }
    try:
        REPORT.parent.mkdir(parents=True, exist_ok=True)
        REPORT.write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    except OSError:
        pass

    if not quiet:
        if not diffs:
            print(f"[pct_sync] OK — % gia' allineate alla fonte unica STATE.json | {pil} ROOT={root}")
        else:
            verb = "RIALLINEATO" if fix else "DRIFT"
            for (t, w, n) in diffs:
                print(f"[pct_sync] {verb}: {t}  {w} -> {n}")
            if not fix:
                print(f"[pct_sync] {len(diffs)} disallineamenti. Esegui: python NODES/PCT_SYNC/pct_sync.py --fix")

    # exit: in CHECK con drift -> 1 (utile come gate per il night_audit); in FIX -> 0
    sys.exit(1 if (diffs and not fix) else 0)


if __name__ == "__main__":
    main()
