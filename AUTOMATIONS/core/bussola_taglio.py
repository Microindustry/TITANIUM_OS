# bussola_taglio.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-09-27
"""
IL TAGLIO DELLA BUSSOLA - lo fa il sistema, non noi (R2, sessione #73).

Perche': la bussola era arrivata a 2.858 righe perche' tagliarla dipendeva da
qualcuno che se lo ricordasse. "Se lo deve ricordare un umano, muore."

Regola (R3, #72) - si taglia con UNA SESSIONE DI RITARDO:
  quando la sessione N e' chiusa, dai blocchi delle sessioni PRIMA di N escono le
  righe chiuse ([✓] [v] [x] [✗]) con le loro righe di spiegazione (il *perche'*) e
  vanno in ABBIAMO_FATTO.md, sotto il titolo della loro sessione.
  Le righe aperte ([ ] [◐] [💡]) restano dove sono, coi loro titoli e il loro testo.
  Un blocco senza piu' niente di aperto esce INTERO, com'era.
  Il blocco della sessione N resta in bussola: e' la memoria corta.

Quale sessione e' "chiusa":
  --chiusa N   lo passa /salva alla chiusura della sessione N
  (niente)     la piu' recente in bussola: di notte (night_audit) la sessione e' finita

Uso:
  python AUTOMATIONS/core/bussola_taglio.py                        # prova: dice cosa farebbe
  python AUTOMATIONS/core/bussola_taglio.py --applica              # taglia davvero
  python AUTOMATIONS/core/bussola_taglio.py --chiusa 73 --applica
Idempotente: rilanciato subito dopo non sposta nulla.
"""

import os
import re
import sys
from datetime import datetime
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
BUSSOLA = BASE / "DA_FARE.md"
STORIA = BASE / "ABBIAMO_FATTO.md"

_SESSIONE = re.compile(r"^##\s+Sessione\s+#(\d+)")
_TITOLO2 = re.compile(r"^##\s")
_VOCE = re.compile(r"^(\s*)[-*]\s+\[([^\]]*)\]\s")
_CONTESTO = re.compile(r"^(\*\*.+\*\*\s*$|#{3,6}\s)")
CHIUSE = {"✓", "v", "x", "X", "✗"}


def _eol(testo: str) -> str:
    return "\r\n" if "\r\n" in testo else "\n"


def _indent(riga: str) -> int:
    return len(riga) - len(riga.lstrip(" "))


def _toc(righe: list[str]) -> tuple[int, int]:
    """(inizio, fine) del blocco <!-- TOC --> ... <!-- /TOC -->, (-1, -1) se manca."""
    ini = fin = -1
    for i, r in enumerate(righe):
        s = r.strip().lower()
        if s.startswith("<!-- toc") and ini < 0:
            ini = i
        elif s.startswith("<!-- /toc") and ini >= 0:
            fin = i
            break
    return ini, fin


def _blocchi(righe: list[str]) -> list[dict]:
    """I blocchi sessione: dal titolo '## Sessione #N' al prossimo titolo '## '."""
    t0, t1 = _toc(righe)
    teste = [i for i, r in enumerate(righe)
             if _TITOLO2.match(r) and not (t0 <= i <= t1)]
    out = []
    for k, i in enumerate(teste):
        m = _SESSIONE.match(righe[i])
        if not m:
            continue
        fine = teste[k + 1] if k + 1 < len(teste) else len(righe)
        out.append({"n": int(m.group(1)), "ini": i, "fine": fine, "titolo": righe[i]})
    return out


def _voci(righe: list[str], ini: int, fine: int) -> list[dict]:
    """Le voci [ ] di un blocco, con l'estensione delle loro righe di spiegazione."""
    voci, fence, i = [], False, ini + 1
    while i < fine:
        r = righe[i]
        if r.lstrip().startswith("```"):
            fence = not fence
        m = None if fence else _VOCE.match(r)
        if not m:
            i += 1
            continue
        ind, glifo = len(m.group(1)), m.group(2).strip()
        j = i + 1
        while j < fine:
            s = righe[j]
            if not s.strip() or _indent(s) <= ind or _VOCE.match(s):
                break
            j += 1
        voci.append({"ini": i, "fine": j, "chiusa": glifo in CHIUSE})
        i = j
    return voci


def _contesto(righe: list[str], ini_blocco: int, riga: int) -> int | None:
    """La riga-titolo (**grassetto** o ###) piu' vicina sopra la voce, dentro il blocco.
    Solo a inizio riga: un grassetto indentato e' spiegazione di una voce, non un titolo."""
    for k in range(riga - 1, ini_blocco, -1):
        if _indent(righe[k]) == 0 and _CONTESTO.match(righe[k]):
            return k
    return None


def _slug(testo: str) -> str:
    # come l'estensione TOC che ha scritto gli indici: via punteggiatura e underscore
    s = re.sub(r"[^\w\s-]|_", "", testo.lower())
    return re.sub(r"-{2,}", "-", re.sub(r"\s+", "-", s.strip()))


def _voce_toc(titolo: str) -> str:
    t = titolo.lstrip("#").strip()
    etichetta = re.sub(r"[#·—+]", "", t)
    return f"  - [{etichetta}](#{_slug(t)})"


def _scrivi(path: Path, righe: list[str], eol: str) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(eol.join(righe) + eol, encoding="utf-8", newline="")
    os.replace(tmp, path)


def taglia(chiusa: int | None = None, applica: bool = False) -> dict:
    testo = BUSSOLA.read_text(encoding="utf-8")
    eol = _eol(testo)
    righe = testo.splitlines()
    blocchi = _blocchi(righe)
    esito = {"chiusa": None, "blocchi": {}, "righe_spostate": 0, "applicato": False}
    if not blocchi:
        return esito
    if chiusa is None:
        chiusa = max(b["n"] for b in blocchi)
    esito["chiusa"] = chiusa

    togli: set[int] = set()        # righe che escono dalla bussola
    pacchi = []                    # (n, titolo, righe da mettere nella storia, intero?)
    for b in blocchi:
        if b["n"] >= chiusa:
            continue
        voci = _voci(righe, b["ini"], b["fine"])
        chiuse = [v for v in voci if v["chiusa"]]
        aperte = [v for v in voci if not v["chiusa"]]
        if not chiuse and aperte:
            continue
        if not aperte:
            # niente di aperto: il blocco esce intero, com'era (senza i --- finali)
            corpo = righe[b["ini"]:b["fine"]]
            while corpo and corpo[-1].strip() in ("", "---"):
                corpo.pop()
            togli.update(range(b["ini"], b["fine"]))
            pacchi.append((b["n"], b["titolo"], corpo[1:], True))
            esito["blocchi"][b["n"]] = {"righe": len(corpo), "intero": True}
            continue
        corpo, ultimo_ctx = [], None
        for v in chiuse:
            ctx = _contesto(righe, b["ini"], v["ini"])
            if ctx is not None and ctx != ultimo_ctx:
                if corpo:
                    corpo.append("")
                corpo.append(righe[ctx])
                ultimo_ctx = ctx
            corpo.extend(righe[v["ini"]:v["fine"]])
            togli.update(range(v["ini"], v["fine"]))
        nota = (f"*Righe chiuse tagliate dalla bussola il {datetime.now():%d/%m/%Y} "
                f"(il blocco resta in DA_FARE.md finche' ha voci aperte).*")
        pacchi.append((b["n"], b["titolo"], [nota, ""] + corpo, False))
        esito["blocchi"][b["n"]] = {"righe": len(corpo), "intero": False}

    esito["righe_spostate"] = sum(len(p[2]) for p in pacchi)
    if not pacchi or not applica:
        return esito

    # ── 1) la storia prima (se si rompe a meta', si duplica invece di perdere) ──
    st_testo = STORIA.read_text(encoding="utf-8")
    st_eol = _eol(st_testo)
    st = st_testo.splitlines()
    for n, titolo, corpo, _intero in sorted(pacchi, key=lambda p: p[0]):
        esistenti = {b["n"]: b for b in _blocchi(st)}
        if n in esistenti:                         # la sessione c'e' gia': si accoda
            b = esistenti[n]
            fine = b["fine"]
            while fine - 1 > b["ini"] and st[fine - 1].strip() in ("", "---"):
                fine -= 1
            st[fine:fine] = [""] + corpo
            continue
        # sessione nuova: in cima alla storia (prima del primo blocco), piu' la voce di indice
        primo = min((b["ini"] for b in _blocchi(st)), default=len(st))
        testa = [titolo] if corpo and not corpo[0].strip() else [titolo, ""]
        st[primo:primo] = testa + corpo + ["", "---", ""]
        t0, t1 = _toc(st)
        if t0 >= 0:
            dove = next((i + 1 for i in range(t0, t1) if st[i].startswith("- [")), t0 + 1)
            st.insert(dove, _voce_toc(titolo))
    _scrivi(STORIA, st, st_eol)

    # ── 2) poi la bussola: via le righe spostate e l'indice dei blocchi usciti interi ──
    interi = {p[0] for p in pacchi if p[3]}
    t0, t1 = _toc(righe)
    if t0 >= 0 and interi:
        i = t0
        while i < t1:
            m = re.match(r"^(\s*)- \[Sessione (\d+)\s", righe[i])
            if m and int(m.group(2)) in interi:
                ind = len(m.group(1))
                togli.add(i)
                k = i + 1
                while k < t1 and righe[k].strip() and _indent(righe[k]) > ind:
                    togli.add(k)
                    k += 1
                i = k
                continue
            i += 1
    nuove = [r for i, r in enumerate(righe) if i not in togli]
    _scrivi(BUSSOLA, nuove, eol)
    esito["applicato"] = True
    return esito


def _riassunto(e: dict) -> str:
    if not e["blocchi"]:
        return f"niente da tagliare (sessione chiusa: #{e['chiusa']})"
    parti = [f"#{n}: {v['righe']} righe{' (blocco intero)' if v['intero'] else ''}"
             for n, v in sorted(e["blocchi"].items())]
    verbo = "spostate" if e["applicato"] else "da spostare (prova, niente scritto)"
    return f"chiusa #{e['chiusa']} -> {verbo} in ABBIAMO_FATTO.md: " + "; ".join(parti)


if __name__ == "__main__":
    if sys.stdout is not None and (sys.stdout.encoding or "").lower() != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    arg_n = None
    if "--chiusa" in sys.argv:
        try:
            arg_n = int(sys.argv[sys.argv.index("--chiusa") + 1].lstrip("#"))
        except (IndexError, ValueError):
            print("uso: --chiusa N (numero della sessione che si sta chiudendo)")
            sys.exit(2)
    print("[bussola_taglio] " + _riassunto(taglia(arg_n, applica="--applica" in sys.argv)))
