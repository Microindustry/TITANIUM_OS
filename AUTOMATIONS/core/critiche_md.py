# critiche_md.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-07-07
"""
CRITICHE.md — la cartella clinica come FILE (stile bussola), al posto della
vista dashboard CRITICHE (eliminata 07/07 su decisione Matteo: "non si
aggiorna, non va"). Le FONTI DI VERITA' restano i JSON:
  - DATA/audit/critiche_manuali.json  (canone manuale, per progetto)
  - DATA/audit/critiche_auto.json     (self-audit notturno, auto-pulente 4gg)
Questo modulo li RENDERIZZA in CRITICHE.md (root repo, accanto a
DA_FARE_FATTO.md). Si rigenera: night_audit a fine giro + a richiesta.
Per cambiare lo stato di una critica: dirlo a Claude o editare il JSON —
il file si riallinea da solo. La fonte 'bussola' NON si duplica qui:
vive gia' in DA_FARE_FATTO.md.
"""

import json
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AUDIT = ROOT / "DATA" / "audit"
MANUALI = AUDIT / "critiche_manuali.json"
AUTO = AUDIT / "critiche_auto.json"
OUT = ROOT / "CRITICHE.md"

MARK = {"active": "[ ]", "blocked": "[◐]", "done": "[✓]", "future": "[💡]"}
ORDER = {"active": 0, "blocked": 1, "future": 2, "done": 3}
SEV_ORDER = {"alta": 0, "media": 1, "bassa": 2}


def _read(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def _walk_leaves(node: dict, trail: list[str], out: list):
    kids = node.get("children") or []
    label = (node.get("label") or "?").strip()
    if not kids:
        out.append((trail, label, node.get("status", "active"), (node.get("note") or "").strip()))
        return
    for c in kids:
        _walk_leaves(c, trail + [label], out)


def render() -> str:
    now = datetime.now()
    lines = [
        "# CRITICHE — la cartella clinica di TITANIUM_OS",
        "",
        "*Vista FILE delle critiche (la vista dashboard è stata eliminata il 07/07/2026 su*",
        "*decisione di Matteo). Fonti di verità = `DATA/audit/critiche_manuali.json` (canone)*",
        "*+ `DATA/audit/critiche_auto.json` (self-audit notturno). Questo file si RIGENERA*",
        "*(night_audit, ogni notte): NON editarlo a mano — per cambiare stato di' a Claude*",
        "*o edita il JSON. La terza fonte (bussola) vive già in `DA_FARE_FATTO.md`.*",
        "",
        "Stati: `[ ]` attiva · `[◐]` bloccata · `[💡]` futura (idea/dopo) · `[✓]` risolta",
        "",
    ]

    # ── canone manuale ──
    man = _read(MANUALI)
    counts = {"active": 0, "blocked": 0, "future": 0, "done": 0}
    sections: dict[str, list] = {}
    if man and man.get("root"):
        leaves: list = []
        _walk_leaves(man["root"], [], leaves)
        for trail, label, status, note in leaves:
            counts[status] = counts.get(status, 0) + 1
            sec = trail[1] if len(trail) > 1 else (trail[0] if trail else "Generale")
            sub = " > ".join(trail[2:]) if len(trail) > 2 else ""
            sections.setdefault(sec, []).append((sub, label, status, note))

    # ── auto-audit ──
    auto = _read(AUTO) or []
    if isinstance(auto, dict):
        auto = next((v for v in auto.values() if isinstance(v, list)), [])
    auto_open = [c for c in auto if c.get("status") not in ("resolved", "done", "auto-resolved", "closed")]
    auto_open.sort(key=lambda c: (SEV_ORDER.get(c.get("severity"), 9), c.get("area", "")))

    lines += [
        f"## IL POLSO — {now:%d/%m/%Y %H:%M}",
        "",
        f"- **Canone manuale**: {counts['active']} attive · {counts['blocked']} bloccate · "
        f"{counts['future']} future · {counts['done']} risolte",
        f"- **Auto-audit**: {len(auto_open)} aperte / {len(auto)} totali "
        "(si auto-chiudono dopo 4 giorni senza ri-osservazione)",
        "- **Bussola**: i to-do vivono in `DA_FARE_FATTO.md` (non duplicati qui)",
        "",
        "---",
        "",
        "## CANONE MANUALE — per progetto",
        "",
    ]

    for sec, items in sections.items():
        items.sort(key=lambda it: ORDER.get(it[2], 9))
        n_active = sum(1 for it in items if it[2] in ("active", "blocked"))
        lines.append(f"### {sec} ({n_active} da fare / {len(items)})")
        for sub, label, status, note in items:
            prefix = f"**{sub}** · " if sub else ""
            lines.append(f"- {MARK.get(status, '[ ]')} {prefix}{label}")
            if note and status != "done":
                short = note if len(note) <= 300 else note[:297] + "..."
                lines.append(f"  - *{short}*")
        lines.append("")

    lines += ["---", "", "## AUTO-AUDIT — aperte (cartella clinica notturna)", ""]
    if not auto_open:
        lines.append("*(nessuna critica automatica aperta — sistema in salute)*")
    for c in auto_open:
        sev = c.get("severity", "?")
        area = c.get("area", "?")
        lines.append(f"- [ ] **[{sev} · {area}]** {(c.get('finding') or '').strip()}")
        if c.get("azione"):
            lines.append(f"  - *azione: {c['azione'].strip()}*")
    lines += [
        "",
        "---",
        f"*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — {now:%Y-%m-%d %H:%M}*",
        "",
    ]
    return "\n".join(lines)


def write() -> Path:
    OUT.write_text(render(), encoding="utf-8")
    print(f"[critiche_md] scritto {OUT.name}")
    return OUT


if __name__ == "__main__":
    write()
    sys.exit(0)
