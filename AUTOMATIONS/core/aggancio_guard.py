# aggancio_guard.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-09-27
"""
I2 (#73): la regola "meglio VUOTO che inventato" deve MORDERE, non solo stare nel prompt.

Il problema (aperto dal #70): lo slot `aggancio_reale` degli episodi Nina non resta mai
vuoto. Il prompt dell'Architetto dice "se non c'e' un aggancio vero, stringa vuota", ma
l'LLM lo riempie sempre: prima inventava un MIMS software, dopo la bonifica del #70
inventa DENTRO GENESIS ("GENESIS v3.2", "MIN-REL", "Tesla-Validator", validatori FORGE+
LEX+THEMIS che non esistono). E i FATTI portano numeri senza fonte (EP_N2_16: "il 70%
dell'affidabilita'", "errori da 10% a 2-3%"): il riflusso li versa in MENTE e il RAG li
restituisce come veri.

Qui la regola e' codice, deterministico, e nel dubbio SVUOTA:
  A. l'aggancio deve nominare almeno un nodo REALE (nomi derivati dal repo: cartelle di
     NODES/, script di NODES/ e AUTOMATIONS/, piu' pochi nomi umani dei pezzi veri) o un
     pezzo MECCANICO vero (telaio, giunti, pressa...);
  B. niente marcatori di invenzione: canon_guard.scan (pilastri fusi/software), versioni
     di GENESIS che non esistono, personaggi presentati come nodi (FORGE, LEX, TESLA...),
     V32/MIMS/VULCAN nominati senza nessuna parola meccanica;
  C. numeri: una percentuale o una cifra con unita' che non compare nelle fonti RAG
     dell'episodio non passa (vale per l'aggancio e per ogni FATTO).

Uso nel generatore (nina_agent): pulisci_scheletro() dopo lo stadio 1, pulisci_episodio()
dopo lo stadio 2. Da riga di comando, controllo senza modifiche:
  python AUTOMATIONS/core/aggancio_guard.py [file.md | cartella]
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from canon_guard import scan as _canon_scan  # noqa: E402

VUOTO = "—"

# nomi umani dei pezzi veri che non sono nomi di file (tenerla CORTA: il resto si deriva)
_ALIAS_REALI = ("RAG", "MENTE", "Obsidian", "dashboard", "bussola", "CRITICHE", "ChromaDB",
                "BM25", "reranker", "Ollama", "graphify", "TITANIUM_OS", "GitHub")
# pezzi meccanici veri (PILASTRI_CANONE di nina_agent + DATI MASTER di CLAUDE.md)
_MECCANICI = (r"telai|colonn|guid[ae]\b|mandrin|epoxy|granit|giunt|tile\b|croce|PA-GF30|"
              r"pressa|mattonell|officina|saldatur|\bTIG\b|fresa|fresatur|gusset|tirant")
_PILASTRI_MECC = re.compile(r"\b(?:V32|MIMS|VULCAN)\b", re.IGNORECASE)
_MECC_RE = re.compile(_MECCANICI, re.IGNORECASE)
# GENESIS non ha numeri di versione: "GENESIS v3.2", "GENESIS v5", "GENESIS V32", "GENESIS-V32"
_VERSIONE_RE = re.compile(r"\bGENESIS[\s\-]*v?\d", re.IGNORECASE)
# personaggi del mondo Nina / del roster "futuro" presentati come nodi del sistema
_PERSONAGGI = ("FORGE", "LEX", "TESLA", "ARIA", "AVA", "SINAPSI")
_COMPOSTI_RE = re.compile(r"\b\w+-(?:Validator|Monitor|Custodian|Guardian)\b", re.IGNORECASE)
# numeri "forti": percentuali e cifre con unita' (sono quelli che si inventano)
_NUMERI_RE = re.compile(
    r"\d+(?:[.,]\d+)?\s*(?:-\s*\d+(?:[.,]\d+)?\s*)?(?:%|€|euro\b|mm\b|kg\b|ore\b|h\b|giorni\b|anni\b|volte\b)",
    re.IGNORECASE)

_nodi_cache: tuple[str, ...] | None = None


def nodi_reali() -> tuple[str, ...]:
    """Nomi dei nodi VERI, derivati dal repo (deriva, non copia) + gli alias umani."""
    global _nodi_cache
    if _nodi_cache is None:
        nomi = set(_ALIAS_REALI)
        nodes = ROOT / "NODES"
        if nodes.exists():
            nomi.update(d.name for d in nodes.iterdir() if d.is_dir() and not d.name.startswith(("_", ".")))
        for base in (ROOT / "NODES", ROOT / "AUTOMATIONS", ROOT / "SERVICES", ROOT / "CORE"):
            if base.exists():
                nomi.update(p.stem for p in base.rglob("*.py")
                            if not p.stem.startswith("_") and len(p.stem) > 4)
        nomi -= set(_PERSONAGGI)
        _nodi_cache = tuple(sorted(nomi, key=len, reverse=True))
    return _nodi_cache


def nodi_per_prompt() -> str:
    """L'elenco CORTO da dare all'Architetto: i nodi (cartelle di NODES/), i servizi e i
    nomi umani. Se il modello cita uno di questi, la guardia lo riconosce."""
    scelti = set(_ALIAS_REALI) | {"night_audit", "canon_guard", "rag_engine", "watchdog",
                                  "nina_rag_loop", "story_agent", "deep_freeze", "inventario_notturno"}
    nodes = ROOT / "NODES"
    if nodes.exists():
        scelti.update(d.name for d in nodes.iterdir() if d.is_dir() and not d.name.startswith(("_", ".")))
    return ", ".join(sorted(n for n in scelti if n in nodi_reali() or n in _ALIAS_REALI))


def _nomina_nodo_reale(t: str) -> bool:
    low = t.lower()
    for n in nodi_reali():
        if re.search(rf"(?<![\w]){re.escape(n.lower())}(?![\w])", low):
            return True
    return False


def numeri_senza_fonte(testo: str, fonti: str) -> list[str]:
    """Le cifre 'forti' del testo che nelle fonti RAG non ci sono."""
    if not fonti:
        return []
    norm = lambda s: re.sub(r"\s+", "", s.replace(",", ".")).lower()  # noqa: E731
    f = norm(fonti)
    return [m.group(0).strip() for m in _NUMERI_RE.finditer(testo) if norm(m.group(0)) not in f]


def valuta_aggancio(testo: str, fonti: str = "") -> list[str]:
    """Motivi per cui l'aggancio NON regge. Lista vuota = passa."""
    t = (testo or "").strip()
    if not t or t in (VUOTO, "-", '""'):
        return []
    motivi = []
    if not (_nomina_nodo_reale(t) or _MECC_RE.search(t)):
        motivi.append("non nomina nessun nodo reale ne' un pezzo meccanico vero")
    motivi += [f"canone: {h[:80]}" for h in _canon_scan(t)]
    if _VERSIONE_RE.search(t):
        motivi.append(f"versione di GENESIS che non esiste: {_VERSIONE_RE.search(t).group(0)}")
    for p in _PERSONAGGI:
        if re.search(rf"\b{p}\b", t):
            motivi.append(f"personaggio presentato come nodo: {p}")
    if _COMPOSTI_RE.search(t):
        motivi.append(f"agente inventato: {_COMPOSTI_RE.search(t).group(0)}")
    if _PILASTRI_MECC.search(t) and not _MECC_RE.search(t):
        motivi.append("V32/MIMS/VULCAN nominati senza nessun pezzo meccanico (sono meccanica)")
    motivi += [f"numero senza fonte: {n}" for n in numeri_senza_fonte(t, fonti)]
    return motivi


def pulisci_scheletro(skel: dict, fonti: str) -> tuple[dict, list[str]]:
    """Dopo lo stadio 1: aggancio che non regge -> vuoto; FATTI con numeri senza fonte -> via."""
    rep = []
    motivi = valuta_aggancio(skel.get("aggancio_reale", ""), fonti)
    if motivi:
        rep.append(f"aggancio svuotato ({'; '.join(motivi)}): {str(skel.get('aggancio_reale'))[:120]}")
        skel["aggancio_reale"] = ""
    tenuti = []
    for f in skel.get("fatti_rag") or []:
        senza = numeri_senza_fonte(str(f), fonti)
        if senza:
            rep.append(f"FATTO tolto (numeri senza fonte {senza}): {str(f)[:120]}")
        else:
            tenuti.append(f)
    skel["fatti_rag"] = tenuti
    return skel, rep


def pulisci_episodio(md: str, aggancio_ok: str, fonti: str) -> tuple[str, list[str]]:
    """Dopo lo stadio 2: la riga 'Aggancio reale' torna quella verificata (lo Scrittore la
    riempiva lo stesso); i FATTI con numeri senza fonte escono dal blocco."""
    rep = []
    riga_ok = f"**Aggancio reale:** {aggancio_ok.strip() or VUOTO}"

    def _riga(m):
        if m.group(0).strip() != riga_ok:
            rep.append(f"riga aggancio riscritta: {m.group(0)[:120]}")
        return riga_ok
    md = re.sub(r"^\*\*Aggancio reale:\*\*.*$", _riga, md, flags=re.MULTILINE)

    k = md.find("## FATTI")
    if k >= 0 and fonti:
        testa, fatti = md[:k], md[k:]
        righe = []
        for r in fatti.splitlines():
            senza = numeri_senza_fonte(r, fonti) if r.lstrip().startswith("- ") and "**FATTO:**" not in r else []
            if senza:
                rep.append(f"FATTO tolto (numeri senza fonte {senza}): {r.strip()[:120]}")
            else:
                righe.append(r)
        md = testa + "\n".join(righe) + ("\n" if fatti.endswith("\n") else "")
    return md, rep


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    target = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "CONTENT_ENGINE/DATABASE/episodes/S_AVVENTURA"
    files = [target] if target.is_file() else sorted(
        p for p in target.rglob("*.md") if not any(x.startswith("_") for x in p.relative_to(target).parts[:-1]))
    con, male = 0, 0
    for p in files:
        m = re.search(r"^\*\*Aggancio reale:\*\*(.*)$", p.read_text(encoding="utf-8", errors="replace"), re.MULTILINE)
        if not m:
            continue
        con += 1
        motivi = valuta_aggancio(m.group(1))
        if motivi:
            male += 1
            print(f"\n{p.name}\n  aggancio: {m.group(1).strip()[:140]}")
            for x in motivi:
                print(f"  [!] {x}")
    print(f"\n--- aggancio_guard: {male} agganci da svuotare su {con} (numeri non controllati: senza fonti RAG) ---")
