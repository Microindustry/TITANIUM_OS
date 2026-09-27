# critiche_md.py | TITANIUM_OS / AUTOMATIONS / core | v1.1 | 2026-09-27
"""
CRITICHE.md — la cartella clinica come FILE (stile bussola), al posto della
vista dashboard CRITICHE (eliminata 07/07 su decisione Matteo: "non si
aggiorna, non va"). Le FONTI DI VERITA' restano i JSON:
  - DATA/audit/critiche_manuali.json  (canone manuale, per progetto)
  - DATA/audit/critiche_auto.json     (self-audit notturno, auto-pulente 4gg)
Questo modulo li RENDERIZZA. Si rigenera: night_audit a fine giro + a richiesta.
Per cambiare lo stato di una critica: dirlo a Claude o editare il JSON —
il file si riallinea da solo. La fonte 'bussola' NON si duplica qui:
vive in DA_FARE.md.

v1.1 (#73, K1-K4 — stessa malattia della bussola, stessa cura):
  K2  CRITICHE.md tiene solo le APERTE; le risolte vanno in CRITICHE_CHIUSE.md,
      fuori dal percorso di lettura (fuori_lettura.py).
  K3  la staleness si VEDE: una critica attiva o bloccata non riverificata da
      SCADENZA_GG giorni e' ⌛ SCADUTA. Data di verifica per critica: il campo
      'verificata' della foglia; se manca, 'updated' della foglia; se manca, la
      data del file (il minimo onesto: e' l'ultima volta che qualcuno l'ha toccato).
  K4  prima di eseguire una critica si verifica: scritto in testa al file.
"""

import json
import sys
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AUDIT = ROOT / "DATA" / "audit"
MANUALI = AUDIT / "critiche_manuali.json"
AUTO = AUDIT / "critiche_auto.json"
ARCHIVIO_AUTO = AUDIT / "critiche_auto_archivio.jsonl"
OUT = ROOT / "CRITICHE.md"
OUT_CHIUSE = ROOT / "CRITICHE_CHIUSE.md"

SCADENZA_GG = 30   # K3: oltre, una critica aperta e' scaduta finche' non si riverifica

MARK = {"active": "[ ]", "stale": "[⌛]", "blocked": "[◐]", "done": "[✓]", "future": "[💡]"}
ORDER = {"stale": 0, "active": 1, "blocked": 2, "future": 3, "done": 4}
SEV_ORDER = {"alta": 0, "media": 1, "bassa": 2}
CHIUSE_AUTO = ("resolved", "done", "auto-resolved", "closed")


def _read(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def data_verifica(foglia: dict, file_updated: str) -> str:
    """K3: quando e' stata verificata l'ultima volta (YYYY-MM-DD, '' se ignoto)."""
    return str(foglia.get("verificata") or foglia.get("updated") or file_updated or "")[:10]


def giorni_da(giorno: str, oggi: date | None = None) -> int | None:
    try:
        return ((oggi or date.today()) - date.fromisoformat(giorno)).days
    except ValueError:
        return None


def stato_effettivo(foglia: dict, file_updated: str, oggi: date | None = None) -> str:
    """Lo stato come va mostrato: active/blocked non riverificate da SCADENZA_GG -> 'stale'."""
    st = foglia.get("status", "active")
    if st in ("active", "blocked"):
        g = giorni_da(data_verifica(foglia, file_updated), oggi)
        if g is None or g > SCADENZA_GG:
            return "stale"
    return st


def _walk_leaves(node: dict, trail: list[str], out: list):
    kids = node.get("children") or []
    label = (node.get("label") or "?").strip()
    if not kids:
        out.append((trail, node))
        return
    for c in kids:
        _walk_leaves(c, trail + [label], out)


def _manuali() -> tuple[dict, str]:
    """{sezione: [(sub, label, stato_effettivo, nota, data_verifica)]} + data del file."""
    man = _read(MANUALI) or {}
    file_updated = str(man.get("updated") or "")[:10]
    sezioni: dict[str, list] = {}
    if man.get("root"):
        foglie: list = []
        _walk_leaves(man["root"], [], foglie)
        for trail, f in foglie:
            sec = trail[1] if len(trail) > 1 else (trail[0] if trail else "Generale")
            sub = " > ".join(trail[2:]) if len(trail) > 2 else ""
            sezioni.setdefault(sec, []).append((
                sub, (f.get("label") or "?").strip(), stato_effettivo(f, file_updated),
                (f.get("note") or "").strip(), data_verifica(f, file_updated)))
    return sezioni, file_updated


def _auto() -> list:
    auto = _read(AUTO) or []
    if isinstance(auto, dict):
        auto = next((v for v in auto.values() if isinstance(v, list)), [])
    return auto


def _nota(note: str) -> str:
    return note if len(note) <= 300 else note[:297] + "..."


def _gg_it(giorno: str) -> str:
    try:
        return date.fromisoformat(giorno).strftime("%d/%m/%Y")
    except ValueError:
        return "data ignota"


def render() -> str:
    now = datetime.now()
    sezioni, file_updated = _manuali()
    auto = _auto()
    auto_open = [c for c in auto if c.get("status") not in CHIUSE_AUTO]
    auto_open.sort(key=lambda c: (SEV_ORDER.get(c.get("severity"), 9), c.get("area", "")))

    conta = {k: 0 for k in ORDER}
    for items in sezioni.values():
        for it in items:
            conta[it[2]] = conta.get(it[2], 0) + 1

    lines = [
        "# CRITICHE — la cartella clinica di TITANIUM_OS (solo le APERTE)",
        "",
        "*Vista FILE delle critiche. Fonti di verità = `DATA/audit/critiche_manuali.json` (canone)*",
        "*+ `DATA/audit/critiche_auto.json` (self-audit notturno). Questo file si RIGENERA*",
        "*(night_audit, ogni notte): NON editarlo a mano — per cambiare stato di' a Claude*",
        "*o edita il JSON. La bussola vive in `DA_FARE.md`. Le risolte sono in `CRITICHE_CHIUSE.md`.*",
        "",
        "> **Prima di eseguire una critica, verificala (K4).** Una critica **⌛ SCADUTA** non è un",
        f"> ordine: è un'ipotesi che nessuno riguarda da più di {SCADENZA_GG} giorni. Sul backlog vecchio",
        "> 4 voci su 7 erano già fatte. Se è ancora vera: metti la data di oggi in `verificata`",
        "> nel JSON. Se non lo è più: chiudila (`status: done`) e passa in `CRITICHE_CHIUSE.md`.",
        "",
        f"Stati: `[ ]` attiva · `[⌛]` scaduta (non riverificata da {SCADENZA_GG}+ gg) · "
        "`[◐]` bloccata · `[💡]` futura (idea/dopo)",
        "",
        f"## IL POLSO — {now:%d/%m/%Y %H:%M}",
        "",
        f"- **Canone manuale**: {conta['active']} attive · **{conta['stale']} ⌛ scadute** · "
        f"{conta['blocked']} bloccate · {conta['future']} future · "
        f"{conta['done']} risolte (in `CRITICHE_CHIUSE.md`)",
        f"- **Auto-audit**: {len(auto_open)} aperte / {len(auto)} nel file vivo "
        "(si auto-chiudono dopo 4 giorni senza ri-osservazione; le chiuse da 30+ giorni "
        "passano in `DATA/audit/critiche_auto_archivio.jsonl`)",
        "- **Bussola**: i to-do vivono in `DA_FARE.md` (non duplicati qui)",
        "",
        "---",
        "",
        "## CANONE MANUALE — per progetto (solo aperte)",
        "",
    ]

    for sec, items in sezioni.items():
        aperte = [it for it in items if it[2] != "done"]
        if not aperte:
            continue
        aperte.sort(key=lambda it: ORDER.get(it[2], 9))
        n_fare = sum(1 for it in aperte if it[2] in ("active", "stale", "blocked"))
        lines.append(f"### {sec} ({n_fare} da fare · {len(aperte)} aperte)")
        for sub, label, stato, note, verif in aperte:
            prefix = f"**{sub}** · " if sub else ""
            coda = ""
            if stato == "stale":
                g = giorni_da(verif)
                coda = (f" — *⌛ scaduta: non riverificata da {g} giorni ({_gg_it(verif)})*"
                        if g is not None else " — *⌛ scaduta: mai verificata*")
            lines.append(f"- {MARK.get(stato, '[ ]')} {prefix}{label}{coda}")
            if note:
                lines.append(f"  - *{_nota(note)}*")
        lines.append("")

    lines += ["---", "", "## AUTO-AUDIT — aperte (cartella clinica notturna)", ""]
    if not auto_open:
        lines.append("*(nessuna critica automatica aperta — sistema in salute)*")
    for c in auto_open:
        sev = c.get("severity", "?")
        area = c.get("area", "?")
        visto = c.get("last_seen", c.get("date", ""))
        lines.append(f"- [ ] **[{sev} · {area}]** {(c.get('finding') or '').strip()}"
                     + (f" *(vista l'ultima volta il {_gg_it(visto)})*" if visto else ""))
        if c.get("azione"):
            lines.append(f"  - *azione: {c['azione'].strip()}*")
    lines += [
        "",
        "---",
        f"*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — {now:%Y-%m-%d %H:%M}*",
        "",
    ]
    return "\n".join(lines)


def render_chiuse() -> str:
    now = datetime.now()
    sezioni, _ = _manuali()
    auto = _auto()
    chiuse_auto = [c for c in auto if c.get("status") in CHIUSE_AUTO]
    chiuse_auto.sort(key=lambda c: c.get("resolved_on", c.get("date", "")), reverse=True)
    n_arch = 0
    if ARCHIVIO_AUTO.exists():
        n_arch = sum(1 for r in ARCHIVIO_AUTO.read_text(encoding="utf-8").splitlines() if r.strip())

    lines = [
        "# CRITICHE CHIUSE — lo storico della cartella clinica",
        "",
        "*Rigenerato da `AUTOMATIONS/core/critiche_md.py`. **Fuori dal percorso di lettura** (K2, #73):*",
        "*non si legge a inizio sessione, si apre quando serve sapere perché una cosa è stata chiusa.*",
        "*Le critiche aperte sono in `CRITICHE.md`.*",
        "",
        "## CANONE MANUALE — risolte",
        "",
    ]
    for sec, items in sezioni.items():
        fatte = [it for it in items if it[2] == "done"]
        if not fatte:
            continue
        lines.append(f"### {sec} ({len(fatte)})")
        for sub, label, _stato, note, _v in fatte:
            prefix = f"**{sub}** · " if sub else ""
            lines.append(f"- [✓] {prefix}{label}")
            if note:
                lines.append(f"  - *{_nota(note)}*")
        lines.append("")

    lines += ["---", "", f"## AUTO-AUDIT — chiuse ancora nel file vivo ({len(chiuse_auto)})", ""]
    for c in chiuse_auto:
        quando = c.get("resolved_on", "")
        perche = (c.get("resolved_by") or "").strip()
        lines.append(f"- [✓] **[{c.get('severity', '?')} · {c.get('area', '?')}]** "
                     f"{(c.get('finding') or '').strip()}"
                     + (f" — *chiusa il {_gg_it(quando)}{': ' + perche if perche else ''}*" if quando else ""))
    lines += [
        "",
        f"*Le chiuse da più di 30 giorni: `DATA/audit/critiche_auto_archivio.jsonl` ({n_arch} righe).*",
        "",
        "---",
        f"*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — {now:%Y-%m-%d %H:%M}*",
        "",
    ]
    return "\n".join(lines)


def write() -> Path:
    OUT.write_text(render(), encoding="utf-8")
    OUT_CHIUSE.write_text(render_chiuse(), encoding="utf-8")
    print(f"[critiche_md] scritti {OUT.name} + {OUT_CHIUSE.name}")
    return OUT


if __name__ == "__main__":
    if sys.stdout is not None and (sys.stdout.encoding or "").lower() != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    write()
    sys.exit(0)
