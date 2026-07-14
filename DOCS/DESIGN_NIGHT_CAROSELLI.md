# DESIGN — night_caroselli: il binario notturno delle bozze (collo n°1)

*v1.0 · 14/07/2026 (#58 mattina) — DESIGN ONLY, la costruzione è il passo dopo (gated ok Matteo
sul design). Attacca il collo di bottiglia n°1 del piano produzione: il RITMO.*

## Il principio (una riga)

**La notte propone, il QC decide, il giorno promuove.** La notte non pubblica MAI e non tocca
MAI le vetrine: produce bozze in quarantena, il verde umano/QC le fa avanzare.

## Requisiti (dai piani + regole Matteo)

1. Bozze = caroselli doppi conformi a GUIDA/FORMATO (grounding RAG, canone, cover §2-bis).
2. Additivo e reversibile: tutto in cartelle `_BOZZE/`, mai sopra materiale esistente.
3. L'autogenerazione AUTO esistente NON si tocca (continua a nutrire i piani).
4. Consumo API notturno limitato e configurabile (1 bozza/notte di default).
5. PRE_01 Nina e tutto ciò che è "INSIEME" è ESCLUSO dalla coda per costruzione.

## Architettura (riusa l'esistente, zero pezzi nuovi dove possibile)

```
NODES/CAROSELLI_AGENT/night_caroselli.py          (nuovo, unico file)
  1. QUEUE   : legge lo STATO dei piani (MENTE: _PIANO_PRODUZIONE.md + PIANO_PRODUZIONE_NINA.md)
               → primo item [ ] non-INSIEME della stagione attiva (ordine dei piani)
  2. GROUND  : interroga il RAG locale (rag_engine, stesso processo di night_research)
               → dossier fatti per l'item (fonti citate; grounding debole → SKIP con report)
  3. DRAFT   : Claude API (modello economico, stile night_audit) con: stampo FORMATO,
               regole GUIDA/§2-bis, dossier RAG → slide DATA (json: kicker/lead/intro/seal/scene/social)
  4. BUILD   : sg_builder.build() → carosello.html + social.html in CAROSELLI/_BOZZE/<ID>/
  5. RENDER+QC: render_queue su _BOZZE + caroselli_qc → verde/falle nel report
  6. REPORT  : DATA/audit/bozze_caroselli.json + riga nella cartella clinica (night_audit
               la legge) → la mattina: "1 bozza pronta, QC verde, falle: 0"
PROMOZIONE (solo umano/Claude di giorno): sposta _BOZZE/<ID> → CAROSELLI/<ID>,
  spunta lo stato nel piano, aggiorna vetrina. La notte non promuove MAI.
```

## Guardie

- Lock single-instance (pattern watchdog) · timeout duro 20 min · exit-code + marker pid
  (lezione watcher v1.2) · nessun push · scene SOLO dalla libreria sg_builder (niente SVG
  liberi di notte) · canon_guard.clean() sul testo prima del build · se QC rosso: la bozza
  resta con le falle scritte nel report (non si ritenta in loop).

## Scheduler

`TI_NightCaroselli` dopo TI_NightResearch (~04:15), via `_ti_paths.bat` (portabile, no hardcode).

## Costo/valore

1 bozza/notte ≈ 30 giorni = un capitolo di stagione al mese SENZA sessioni diurne dedicate;
il giorno serve solo per rifinire e promuovere. Scala a 2-3/notte quando il binario è rodato.

## Stato

- [ ] Design approvato da Matteo → [ ] build night_caroselli.py → [ ] 3 notti di prova su
  EP_SG_01_01/02/03 (bozze, non promozione) → [ ] a regime nel calendario notturno
