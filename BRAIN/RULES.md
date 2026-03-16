# LE 10 REGOLE DELL'ECOSISTEMA
*Vincoli operativi — ogni decisione viene filtrata qui*

---

## 1. Niente è finito
Ogni progetto è una versione. V32 → Mk1 → Mk2. MIMS → 2.0 → 3.0.
**Azione**: rilascia versioni funzionanti, migliora iterativamente.

## 2. Tutto si connette
Ogni skill nutre le altre. Saldatura MotoGP → basamento V32. Python EVA → automazioni MIMS.
**Azione**: cerca attivamente le connessioni tra skill diverse.

## 3. Documenta mentre costruisci
Il processo È il contenuto. Foto, note, screenshot: sempre in tempo reale.
**Azione**: camera sempre pronta, note in tempo reale.

## 4. Scala organicamente
Non forzare la crescita. Ogni espansione finanziata dal cash flow.
**Azione**: zero investitori fino a prodotto validato.

## 5. Automatizza il ripetitivo
Se fai qualcosa più di 3 volte → scrivi uno script.
**Azione**: lista settimanale attività ripetitive da automatizzare.

## 6. Costruisci ciò che usi
MIMS nasce da esigenze reali. V32 costruita CON MIMS.
**Azione**: il primo cliente di ogni prodotto sei tu.

## 7. Insegna ciò che impari
YouTube forza la chiarezza. Effetto Feynman.
**Azione**: ogni concetto tecnico → video o post.

## 8. Proteggi il sapere
Trade secret su ricette polimero. Brevetti pianificati.
**Azione**: pubblica il "cosa" e il "perché", MAI il "come esattamente".

## 9. Reinvesti sempre
60% del margine nel primo anno torna nel sistema.
**Azione**: budget reinvestimento fisso su ogni entrata.

## 10. Libertà sopra profitto
Il capannone è il goal. I soldi sono il mezzo.
**Azione**: ogni decisione: "Questo mi avvicina o allontana dal capannone?"

---
*Target: 15 Luglio 2030 — Matteo Benenati, 35 anni: LIBERO.*

---

## REGOLE SISTEMA — PDF_TO_MEMORY

### Gerarchia output
| Tipo documento | Destinazione | Criterio |
|---|---|---|
| ATTO | `BRAIN/ASSOLUTO/` | ≥2 keyword legali/burocratiche |
| INFO | `BRAIN/KNOWLEDGE/` | Tutto il resto |

### Regole versioning
- Ogni documento ha una versione corrente e uno storico completo in `DATA/pdf_versions.json`
- Il documento è sempre "in corso" — non esistono versioni definitive
- Una nuova versione NON cancella la precedente: PDF originale → `PDF_DROP/_PROCESSED/`
- Il `.md` corrente è sempre quello con numero versione più alto

### Regole classificazione ATTO
Parole chiave che triggherano classificazione ATTO (soglia: 2 hits):
`delibera, decreto, atto n., contratto, verbale, certificato, fattura, ricevuta,
autorizzazione, ordinanza, circolare, normativa, regolamento, art., comma, legge n.,
d.lgs, d.p.r., allegato, sentenza, provvedimento, dichiarazione, omologazione, collaudo`

### Flusso drag & drop
```
PDF_DROP/               ← trascina qui
  _PROCESSED/           ← PDF archiviati post-elaborazione (con versione nel nome)
  _ERRORS/              ← PDF falliti (es: solo immagini scansionate)
BRAIN/KNOWLEDGE/        ← output INFO (.md)
BRAIN/ASSOLUTO/         ← output ATTI (.md)
DATA/pdf_versions.json  ← database versioni
```

### Come avviare
```bash
# Processa tutto ciò che è in PDF_DROP ora
python AUTOMATIONS/core/pdf_to_memory.py

# Modalità watch (gira sempre in background)
python AUTOMATIONS/core/pdf_to_memory.py --watch
```
