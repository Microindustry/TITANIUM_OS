# fix_pilastri_software.py | TITANIUM_OS / AUTOMATIONS / tools | v1.0 | 2026-08-16
# Bonifica lo STORICO della contaminazione trovata in #69: MIMS/VULCAN/V32 (meccanica)
# descritti come software/AI negli episodi Nina gia' scritti. La SORGENTE e' gia' chiusa
# (nina_agent.PILASTRI_CANONE + canon_guard [pilastri-software], commit a77256f3 del 28/07):
# questo tool ripara cio' che era gia' finito su disco -> MENTE -> RAG.
#
# Regola: se il concetto e' informatico l'aggancio giusto e' GENESIS (l'unico pilastro
# software). V32 = CNC meccanica, MIMS = giunti meccanici, VULCAN = pressa + mattonelle.
# Toglie anche le FONTI FABBRICATE e i NUMERI INVENTATI spacciati per FATTI (blocco RAG).
#
# Sostituzioni ESATTE e curate. Idempotente: rieseguibile senza danni.
# Dry-run di default; --apply per scrivere. --all estende oltre i file segnalati.
# Lavora sulle DUE copie: repo (episodes/) + specchio MENTE (che il watcher reindicizza).
#
# Verifica di chiusura:  python AUTOMATIONS/core/canon_guard.py <dir episodi>  -> 0 righe

import os
import re
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
ROOTS = [BASE / "CONTENT_ENGINE" / "DATABASE" / "episodes", MENTE]
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"

# File segnalati da canon_guard.scan (13 righe su 64 EP_N2 vivi) — 16/08/2026.
FLAGGED = {
    "EP_N2_01_la_bambina_che_chiedeva_perche.md",
    "EP_N2_13_il_battito_del_guardiano.md",
    "EP_N2_52_il_battito_del_guardiano.md",
    "EP_N2_57_il_cartellino_sulla_stoffa.md",
    "EP_N2_59_il_polso_che_non_respira.md",
    "EP_N2_60_il_direttore_invisibile.md",
    "EP_N2_63_la_mano_che_insegna_alla_notte.md",
    "EP_N2_64_il_sussurratore_che_indovina.md",
}

# ORDINE SIGNIFICATIVO: prima le riscritture lunghe e specifiche, poi la pulizia
# generica del token — altrimenti la generica smonterebbe le stringhe lunghe.
PAIRS = [
    # ── EP_N2_57 — MIMS spacciato per modulo di provenance + statistica inventata ──
    ("Nel sistema GENESIS, il modulo MIMS assegna a ogni asserzione la propria genealogia "
     "di documenti e decisioni — autore, timestamp, versione, hash di integrità.",
     "Nel sistema GENESIS, il RAG di MENTE lega ogni chunk alla sua fonte — file, sezione, "
     "data — e la risposta cita da dove viene."),
    ("Gli studi su metacognizione ed epistemic vigilance mostrano che chi impara a "
     "sorgentizzare le proprie asserzioni riduce il rischio di false credenze del 40-60%.",
     "Chi si abitua a chiedere «da dove lo sai?» impara a separare cio' che ha verificato "
     "da cio' che ha solo sentito dire."),
    ("- FATTO 4: La mente umana che impara a sorgentizzare le proprie asserzioni riduce il "
     "rischio di false credenze del 40-60% (studi su metacognizione e epistemic vigilance).",
     "- FATTO 4: Chi si abitua a chiedere «da dove lo sai?» separa cio' che ha verificato da "
     "cio' che ha solo sentito dire: e' una pratica di metacognizione, non una percentuale misurata."),

    # ── EP_N2_60 — "DAG Scheduler e Clock Tick" attribuiti a V32/MIMS ──
    ("In GENESIS/V32/MIMS, il DAG Scheduler e il Clock Tick sono il Direttore Invisibile: "
     "dicono a ogni microistruzione quando eseguirsi, nell'ordine corretto, senza conflitti. "
     "Senza questo, il processore sarebbe la sala dei sarti confusi.",
     "In GENESIS le notturne girano a orari fissi con guardie single-instance: un solo "
     "processo per volta sulla GPU da 8 GB, altrimenti si pestano i piedi. E' il Direttore "
     "Invisibile — senza di lui la notte sarebbe la sala dei sarti confusi."),

    # ── EP_N2_63 — "il MIMS consolida i pattern di controllo motorio" (inventato) ──
    ("Nel sistema GENESIS/V32, il MIMS consolida i pattern di controllo motorio durante i "
     "cicli di riposo/attesa. Un gesto di calibrazione insegnato male nel setup iniziale "
     "persiste e si amplifica attraverso tutti i cicli successivi — il sistema non ha "
     "autocorrezione etica, solo fedeltà al pattern appreso.",
     "Nel sistema GENESIS il loop notturno riesegue ogni notte lo schema che gli e' stato "
     "dato: un errore nel seme — un titolo gia' usato, una regola mancante nel prompt — "
     "rientra identico a ogni giro finche' un umano non lo corregge alla fonte. Il sistema "
     "non ha autocorrezione etica, solo fedeltà al pattern appreso."),
    ("In GENESIS/V32, il MIMS consolida i pattern di controllo motorio durante i cicli di riposo.",
     "In GENESIS il loop notturno riesegue ogni notte lo schema ricevuto: un errore nel seme "
     "rientra identico a ogni giro."),
    # [persone] — Nina e' una bambina: "sua figlia" le attribuisce una figlia.
    ("Nina pensa alla sarta. Pensa a sua figlia.",
     "Nina pensa alla sarta. Pensa alla figlia della sarta."),

    # ── EP_N2_64 — l'acronimo inventato + la fonte fabbricata + il numero inventato ──
    ("Nel sistema GENESIS/V32, il modulo MIMS (Machine-Induced Meaning Synthesis) usa "
     "generazione token-by-token basata su probabilità condizionata.",
     "Nel sistema GENESIS il generatore degli episodi produce token per token su probabilità "
     "condizionata: per questo ogni episodio e' ancorato ai FATTI del RAG e passa da "
     "canon_guard prima di uscire."),
    # documentation_hallucination_2026 NON esiste (0 file in MENTE): fonte fabbricata.
    (" Fonte: GENESIS/documentation_hallucination_2026", ""),
    ("- FATTO: Una sarta esperta su 10.000 vestiti imbastisce male 1 volta su 1.000 — ma con "
     "la stessa sicurezza delle altre 999. Questa è la metafora che regge ep. 7-8.",
     "- FATTO: Anche chi e' espertissimo sbaglia ogni tanto, e lo fa con la stessa sicurezza "
     "di quando ha ragione. E' la metafora che regge ep. 7-8. (nessun numero misurato)"),

    # ── Pulizia generica del token: il pilastro software e' GENESIS, da solo ──
    ("GENESIS/V32/MIMS", "GENESIS"),
    # #71: variante non coperta prima — TITANIUM_OS e' il repo/OS, non un pilastro,
    # e saldato con la barra faceva lo stesso danno (EP_N2_10, EP_N2_44).
    ("GENESIS/TITANIUM_OS/MIMS", "GENESIS"),
    ("GENESIS/TITANIUM_OS", "GENESIS"),
    ("GENESIS V32/MIMS", "GENESIS"),
    ("GENESIS/MIMS", "GENESIS"),
    ("GENESIS/V32", "GENESIS"),
]


# SOSPESI (#71, 27/08) — la regola generica "GENESIS/X -> GENESIS" NON vale qui.
# Verificati a mano leggendo la frase in contesto, non il nome del file.
SOSPESI = {
    # da GIUDICARE: il pilastro giusto NON e' GENESIS, e' quello MECCANICO.
    # Collassare su GENESIS non ripulisce: sposta il falso da una parte all'altra.
    "EP_N2_03": "ripetibilita' = controllo qualita' della CNC -> il referente e' V32, non GENESIS",
    "EP_N2_05": "calibrazione manuale del gesto = fisica -> il referente e' V32, non GENESIS",
    "EP_N2_46": "3 occorrenze MISTE: 2 sono cruscotto (software, ok) ma 1 dice "
                "'lo spazio fisico e' di 12 m2' — su GENESIS diventa un errore di categoria",
    "EP_N2_48": "'Nel sistema GENESIS/V32 di MIMS' -> collassato diventa "
                "'Nel sistema GENESIS di MIMS': sgrammaticato. Serve riscrittura, non strip",
    "EP_N2_56": "golden template validata da sensori = ciclo produttivo -> MIMS/VULCAN, "
                "non GENESIS. In piu' 'e nelle fabbriche smart reali' e' una comparazione gonfiata",
    # ROTTI, non sporchi: troncati a meta' parola dal bug max_tokens pre-#69.
    # Vanno RIGENERATI dall'Architetto: rattoppare la frase mozza la lascia mozza.
    "EP_N2_28": "TRONCATO: 'In GENESIS/V32, M' — rigenerare",
    "EP_N2_55": "TRONCATO: '...la g' + 'V32 (architettura di fluidita' narrativa)' e' "
                "un'invenzione anche nel frammento superstite — rigenerare",
}


def sospeso(nome_file: str) -> str:
    """Ritorna il motivo se l'episodio e' sospeso, stringa vuota altrimenti."""
    m = re.match(r"(EP_N2_\d+)", nome_file)
    return SOSPESI.get(m.group(1), "") if m else ""


def guardia_pubblicato(nome_file: str, vecchie: list[str]) -> list[str]:
    """GUARDIA ANTI-DIVERGENZA (#70, dopo la segnalazione di Matteo).

    Correggere un episodio il cui carosello e' GIA' USCITO significa creare due verita':
    quella su Instagram e quella nel canone. Nessuno se ne accorge finche' non fa danno.

    NON mi baso sulle scalette `_SOCIAL_QUEUE*/_SCALETTA.md`: il 16/08 si sono rivelate
    STANTIE — davano EP_SG_02_02 "da programmare" ed EP_N2_04 "bozza" mentre erano
    entrambi gia' pubblici. Un controllo che dipende da un file che un umano deve
    ricordarsi di aggiornare non e' un controllo.

    Mi baso sull'ARTEFATTO: se esiste il carosello e la frase che sto per cambiare e'
    DENTRO quel carosello, allora quella frase e' (o sara') sotto gli occhi di qualcuno
    -> mi fermo. Se il carosello esiste ma la frase non ci compare (tipico: DIDATTICA e
    FATTI, metadati per il RAG che non arrivano mai alle slide), si procede.
    """
    m = re.match(r"(EP_[A-Z0-9_]+?)_[a-z]", nome_file) or re.match(r"(EP_[A-Z0-9_]+)\.md", nome_file)
    if not m or not CAROSELLI.exists():
        return []
    ep_id = m.group(1)
    cartelle = [d for d in CAROSELLI.rglob(ep_id) if d.is_dir()]
    if not cartelle:
        return []
    conflitti = []
    for d in cartelle:
        pubblicato = ""
        for nome in ("carosello.html", "caption.txt", "README.md"):
            p = d / nome
            if p.exists():
                pubblicato += p.read_text(encoding="utf-8", errors="ignore")
        for old in vecchie:
            frammento = old.strip()[:60]
            if frammento and frammento in pubblicato:
                conflitti.append(f"{ep_id}: la frase '{frammento[:45]}…' e' DENTRO "
                                 f"{d.relative_to(CAROSELLI)}")
    return conflitti


def main():
    apply = "--apply" in sys.argv
    scope_all = "--all" in sys.argv
    forza = "--anche-pubblicati" in sys.argv
    changed_files = 0
    total_hits = 0
    bloccati = 0
    sospesi_n = 0
    visti_sospesi = set()
    for root in ROOTS:
        if not root.exists():
            continue
        # anche il RIFLUSSO: fatti_dalle_storie_*.md e' generato DAGLI episodi e finisce
        # nel RAG. Correggere solo gli episodi lasciava il falso li' dentro (#70).
        candidati = list(root.rglob("EP_N2_*.md")) + list(root.rglob("fatti_dalle_storie_*.md"))
        for f in candidati:
            if "_ARCHIVIO" in f.parts:
                continue
            if not scope_all and f.name not in FLAGGED:
                continue
            motivo = sospeso(f.name)
            if motivo and "--anche-sospesi" not in sys.argv:
                if f.name not in visti_sospesi:
                    visti_sospesi.add(f.name)
                    sospesi_n += 1
                    print('\n=== ' + f.name + " ===")
                    print(f"  [~] SOSPESO — {motivo}")
                continue
            try:
                txt = f.read_text(encoding="utf-8")
            except Exception:
                continue
            orig = txt
            file_hits = []
            for old, new in PAIRS:
                if old in txt:
                    n = txt.count(old)
                    txt = txt.replace(old, new)
                    file_hits.append((n, old, new))
            if file_hits:
                conflitti = guardia_pubblicato(f.name, [old for _, old, _ in file_hits])
                if conflitti and not forza:
                    bloccati += 1
                    print(f"\n=== {f} ===")
                    for c in conflitti:
                        print(f"  [!] FERMO — GIA' NEL CAROSELLO: {c}")
                    print("      correggerlo qui creerebbe due verita' (canone vs pubblicato).")
                    print("      Se e' voluto: rilancia con --anche-pubblicati e RIGENERA il carosello.")
                    continue
                changed_files += 1
                print(f"\n=== {f} ===")
                if conflitti:
                    print("  [!] FORZATO su contenuto gia' nel carosello — va RIGENERATO")
                for n, old, new in file_hits:
                    total_hits += n
                    print(f"  [{n}x] '{old[:70]}...'\n      -> '{new[:70]}...'")
                if apply and txt != orig:
                    f.write_text(txt, encoding="utf-8")
    mode = "APPLICATE" if apply else "DRY-RUN (nessuna modifica)"
    scope = "TUTTI gli EP_N2" if scope_all else f"{len(FLAGGED)} file segnalati"
    print(f"\n--- {mode} · scope {scope}: {total_hits} sostituzioni in {changed_files} file"
          + (f" · {bloccati} BLOCCATI dalla guardia pubblicato" if bloccati else "")
          + (f" · {sospesi_n} SOSPESI (giudizio umano / da rigenerare)" if sospesi_n else "") + " ---")


if __name__ == "__main__":
    main()
