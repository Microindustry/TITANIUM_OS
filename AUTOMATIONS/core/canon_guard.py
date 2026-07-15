# canon_guard.py | TITANIUM_OS / AUTOMATIONS / core | v1.2 | 2026-07-15
# REGOLA DI CANONE, implementata UNA volta e usata ovunque (scalabile/adattiva).
# Regola Matteo: i componenti V32/VULCAN NON si descrivono mai come
# "recuperati / usati / di recupero / EUR 0 di recupero". Sempre specifica
# tecnica + logica progettuale (es. "PLC industriale Siemens S7-314C").
#
# v1.1 — famiglia PERSONE/CANONE NARRATIVO: Nina e' il personaggio del binario
# educativo (bibbia del mondo), NON una persona reale della famiglia. Presentarla
# come parente in voce reale = falla (successo in EP_SG_01_01, bozza 14/07:
# l'apprendista ha scritto una parentela inventata e il QC era cieco).
# In SG Nina appare SOLO come cameo-domanda nel balloon (PONTE_SG_NINA).
#
# v1.2 — scan_public(): numeri di PROGETTO non ancora misurati (massa 178 kg,
# precisione RSS ±0,019) vietati nei CONTENUTI PUBBLICI come fatti compiuti
# (ordine Matteo 15/07: "siamo ancora al telaio, eviterei il peso"). Solo per
# contenuti in uscita (night_caroselli) — NON per i doc interni di MENTE, dove
# quei numeri sono legittimi come dati di progetto.
#
# - clean(text)  -> applica le correzioni note (auto-fix alla fonte, idempotente)
# - scan(text)   -> trova formulazioni vietate ANCHE nuove (proximità hardware),
#                   per segnalare ciò che l'auto-fix non copre ancora (adattivo)
#
# Usato da: NODES/STORY_AGENT/story_agent.py (clean su ogni episodio scritto),
#           NODES/AUDIT_AGENT/night_audit.py (scan -> cartella clinica),
#           AUTOMATIONS/tools/fix_recuperato_canon.py (bonifica massiva).

import re

# Auto-fix: sostituzioni ESATTE e curate (estendibile quando emergono nuove frasi).
PAIRS = [
    ("Un PLC Siemens S7-314C recuperato", "Un PLC Siemens S7-314C industriale"),
    ("PLC Siemens S7-314C recuperato",    "PLC Siemens S7-314C industriale"),
    ("Un PLC recuperato",                 "Un PLC industriale Siemens S7-314C"),
    ("un PLC recuperato",                 "un PLC industriale Siemens S7-314C"),
    ("TP900 Comfort recuperato",          "TP900 Comfort industriale"),
    ("componenti recuperati",             "componenti industriali selezionati"),
    ("Tutto recupero, tutto EUR 0 di hardware.",
     "Tutti componenti industriali reali, zero spesa hardware aggiuntiva."),
    ("Costo hardware: EUR 0 (recupero).",
     "Spesa hardware aggiuntiva: EUR 0 (componenti industriali gia' in dotazione)."),
    ("asset da €11.749 di valore recuperato",
     "asset dal valore equivalente a nuovo di €11.749"),
    ("Asset recuperato dichiarato = €11.749",
     "Valore equivalente a nuovo = €11.749"),
    ("asset recuperato **€9.499 (81%)**",
     "valore equivalente a nuovo non speso **€9.499 (81%)**"),
    ("Recuperato €9.499 (81%). Investimento €2.250. Asset €11.749.",
     "Valore equivalente a nuovo €11.749. Investimento reale €2.250 (19%)."),
    # --- varianti archivio NotebookLM (_DA_ORDINARE), stesso framing vietato ---
    ("Componenti Recuperati (EUR 0 costo) — Valore Mercato EUR 9,499",
     "Componenti industriali selezionati — Valore di mercato equivalente EUR 9.499"),
    ("TOTALE RECUPERATO EUR 9,499 81% del valore totale",
     "VALORE EQUIVALENTE A NUOVO EUR 9.499 (81% del valore totale)"),
    ("Componenti recuperati EUR 9,749 (81% del valore)",
     "Componenti industriali selezionati, valore equivalente EUR 9.749 (81%)"),
    ("Asset recuperati EUR 9,749 (81%) a costo zero",
     "Valore equivalente a nuovo EUR 9.749 (81%)"),
    ("Cilindri riciclati", "Cilindri come guide lineari"),
    ("cilindro recuperato", "cilindro (guida lineare)"),
    ("Omron E5CC (recuperato)", "Omron E5CC"),
    # --- varianti "Euro X,XXX" nelle note puntate dal CANONE (attacco #52, 07 P0.1) ---
    ("Valore recuperato Euro 9,499", "Valore equivalente a nuovo Euro 9,499"),
    ("6.1 Componenti Recuperati (Euro 0 costo)",
     "6.1 Componenti industriali selezionati (Euro 0 spesa aggiuntiva)"),
    ("TOTALE RECUPERATO 9,499", "VALORE EQUIVALENTE A NUOVO 9,499"),
    ("Euro 9,499 di Valore Recuperato a Costo Zero",
     "Euro 9,499 di valore equivalente a nuovo (zero spesa aggiuntiva)"),
    ("81% recuperato", "81% valore equivalente a nuovo"),
]

# Detection: parole-hardware/economia vicino a "recuperat/di recupero/seconda mano".
# Cattura anche frasi NUOVE (adattivo): se compare un componente + "recuperato"
# sulla stessa riga, lo segnala anche se non e' tra i PAIRS.
_HW = (r"PLC|HMI|TP900|S7-?314|componente|componenti|cilindr|martinett|pressa|"
       r"guid[ae]|servo|sensor|piastr|hardware|asset|valore|colonne|molle|VULCAN|V32")
_BAD = r"recuperat[oi]|di recupero|EUR\s*0.*recuper|tutto recupero|second[ a]\s*mano|riciclat"
_LINE_RE = re.compile(rf"^.*(?:{_HW}).*(?:{_BAD}).*$|^.*(?:{_BAD}).*(?:{_HW}).*$",
                      re.IGNORECASE | re.MULTILINE)

# Nina + parentela PERSONALE nella stessa riga = personaggio narrativo spacciato per
# famiglia vera (nessun auto-fix possibile: va riscritta la slide, quindi solo scan).
# Solo forme possessive personali: le metafore ("figlia del sistema") e la formula di
# chiusura Nina ("per tuo figlio") sono legittime e NON devono scattare.
_PARENTELA = (r"(?:mia|nostra|sua)\s+figli[ao]|figli[ao]\s+(?:mia|nostra|sua)|"
              r"(?:mia|nostra)\s+bambina|mi[ao]\s+figliolett|primogenit[ao]\s+(?:mia|nostra)")
_NINA_RE = re.compile(rf"^.*Nina.{{0,60}}(?:{_PARENTELA}).*$|^.*(?:{_PARENTELA}).{{0,60}}Nina.*$",
                      re.IGNORECASE | re.MULTILINE)


def clean(text: str) -> str:
    """Applica le correzioni note. Idempotente: rieseguibile senza danni."""
    for old, new in PAIRS:
        if old in text:
            text = text.replace(old, new)
    return text


def scan(text: str) -> list[str]:
    """Ritorna le righe con formulazioni vietate ancora presenti (post-clean)."""
    cleaned = clean(text)
    hits = [m.strip() for m in _LINE_RE.findall(cleaned) if m.strip()]
    hits += [f"[persone] {m.strip()}" for m in _NINA_RE.findall(cleaned) if m.strip()]
    return hits


# Numeri di progetto della V32 non ancora misurati sulla macchina reale (al telaio).
# Si estende qui quando un numero diventa misurato (si toglie) o ne nasce uno nuovo.
_PROGETTO_RE = re.compile(r"^.*(?:178\s*kg|±\s*0[.,]019).*$", re.IGNORECASE | re.MULTILINE)


def scan_public(text: str) -> list[str]:
    """SOLO contenuti in uscita: righe con numeri di progetto spacciati per fatti."""
    return [f"[progetto-non-misurato] {m.strip()}"
            for m in _PROGETTO_RE.findall(text) if m.strip()]


if __name__ == "__main__":
    import sys
    from pathlib import Path
    target = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
        r"C:\Users\teo\MICROINDUSTRY\MENTE")
    total = 0
    for f in target.rglob("*.md"):
        try:
            hits = scan(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        if hits:
            total += len(hits)
            print(f"\n{f}")
            for h in hits:
                print(f"  [!] {h[:120]}")
    print(f"\n--- canon_guard.scan: {total} righe da rivedere ---")
