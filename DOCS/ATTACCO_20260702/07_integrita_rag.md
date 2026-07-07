<!-- TOC -->

- [07  INTEGRITÀ RAG / CONOSCENZA  mappa dei buchi di incastrabilità](#07-integrità-rag-conoscenza-mappa-dei-buchi-di-incastrabilità)
  - [VERDETTO IN UNA RIGA](#verdetto-in-una-riga)
  - [STATO ATTUALE VERIFICATO (il positivo)](#stato-attuale-verificato-il-positivo)
  - [P0.1  La verità tecnica V32 puntata dal CANONE è QUELLA VECCHIA (molle) e con framing vietato](#p01-la-verità-tecnica-v32-puntata-dal-canone-è-quella-vecchia-molle-e-con-framing-vietato)
  - [P0.2  55 file di versioni SUPERATE sono dentro il canone RAG](#p02-55-file-di-versioni-superate-sono-dentro-il-canone-rag)
  - [P1.1  Collisione di ID nel canone attivo: due EP_N2_01](#p11-collisione-di-id-nel-canone-attivo-due-epn201)
  - [P1.2  _CANONE.md è stantio e nessun codice lo legge: la verità unica non è enforced](#p12-canonemd-è-stantio-e-nessun-codice-lo-legge-la-verità-unica-non-è-enforced)
  - [P2.1  Laudit notturno è cieco sulle violazioni canone fuori STORIE](#p21-laudit-notturno-è-cieco-sulle-violazioni-canone-fuori-storie)
  - [P2.2  Tre verità diverse sul numero di episodi](#p22-tre-verità-diverse-sul-numero-di-episodi)
  - [P2.3  Tracciabilità a metà: le fonti del grounding non sono persistite](#p23-tracciabilità-a-metà-le-fonti-del-grounding-non-sono-persistite)
  - [P3  Orfani e sinergie tra i mondi](#p3-orfani-e-sinergie-tra-i-mondi)
  - [PIANO PROPOSTO (ordine di esecuzione)](#piano-proposto-ordine-di-esecuzione)

<!-- /TOC -->

# 07 · INTEGRITÀ RAG / CONOSCENZA — mappa dei buchi di incastrabilità
*ATTACCO ESERCITO · 2026-07-03 · specialista 07 · propose-only, nessuna modifica applicata*

**Metodo:** solo letture mirate + conteggi offline read-only (sqlite/pickle/jsonl), zero rebuild,
zero query a freddo sull'engine. Stato indice verificato senza toccare GPU/API.

---

## VERDETTO IN UNA RIGA
L'infrastruttura di integrità (self-heal, grounding obbligatorio, canon_guard, watchdog) è sana e
allineata — **ma la "verità unica" è rotta alla sorgente**: le note che `_CANONE.md` indica come
verità V32 descrivono la macchina vecchia (su molle) con framing vietato, e 55 file di versioni
superate sono DENTRO il canone RAG in competizione col reale.

## STATO ATTUALE VERIFICATO (il positivo)
| Check | Stato | Evidenza |
|---|---|---|
| semantico == bm25 == corpus | ✅ **25119 == 25119 == 25119** | conteggio offline: `chroma.sqlite3` (ro) + `rag_tfidf.pkl` + `rag_corpus.jsonl` |
| Self-heal vettori orfani | ✅ attivo ad ogni update | `NODES/MENTE_RAG/rag_engine.py:480-496` |
| Recovery 2 livelli post-crash | ✅ documentato/implementato | `rag_engine.py:707-716` |
| Watchdog API+watcher | ✅ alive, 0 restart | `DATA/watchdog_status.json:4-15` |
| Grounding Nina obbligatorio | ✅ "dal vero o niente" (min 2 fonti) | `NODES/NINA_AGENT/nina_agent.py:86,430-433` |
| canon_guard su output generati | ✅ clean alla fonte | `nina_agent.py:354,380` · `NODES/STORY_AGENT/story_agent.py:333` |
| Orfani vault | 2 (entrambi in KNOWLEDGE/RESEARCH, già fuori canone) | `DATA/audit/vault_orphans.json:5-18` |
| Audit notturno | verdict OK, log_issues [] | `DATA/audit/system_health.json:15,23` |

---

## P0.1 — La verità tecnica V32 puntata dal CANONE è QUELLA VECCHIA (molle) e con framing vietato
**Il buco più grave di incastrabilità.** `MENTE/_CANONE.md:13-14` dichiara:
- riga 13: *"Verità tecnica: [[v32_analisi_tecnica_reale]] · mappa: [[v32_la_mappa_vivente]]"*
- riga 14: *"Numeri master: 178 kg **corpo unico** …"* (allineato ai DATI MASTER / CLAUDE.md)

Ma le due note puntate contraddicono la riga sopra e i DATI MASTER (corpo unico, decisione maggio 2026):
- `MENTE/V32/NOTE_OFFICINA/v32_analisi_tecnica_reale.md:15-16` — *"Massa totale 178 kg (69 non sospesa + 109 sospesa)"*, *"Frequenza naturale 3.83 Hz (4 molle ISO verdi K=15.8)"*; idem `:37,:53,:60,:76,:204`
- `MENTE/V32/NOTE_OFFICINA/v32_la_mappa_vivente.md:18,37,77,210` — *"4 molle ISO verdi"*, *"divisa in due mondi separati da quattro molle"*

E contengono **framing "recuperato" vietato** (regola assoluta di Matteo) proprio nella fonte canonica:
- `v32_analisi_tecnica_reale.md:20` *"Valore recuperato Euro 9,499 (81%)"* · `:163` *"Componenti Recuperati (Euro 0 costo)"* · `:172,:208`
- `v32_la_mappa_vivente.md:18` *"81% recuperato"* · `:132` *"Euro 9,499 di Valore Recuperato a Costo Zero"* · `:215`

`canon_guard.clean` NON le corregge: i `PAIRS` (`AUTOMATIONS/core/canon_guard.py:18-49`) usano
wording "EUR 9,499 / €" mentre le note usano "Euro 9,499" — l'auto-fix non matcha, solo lo `scan`
adattivo le vede. **Conseguenza sistemica:** ogni grounding Nina/story_agent su query V32 pesca
questa verità superata e vietata come "FATTI DALL'ARCHIVIO — la verità reale" (`nina_agent.py:166`).

**Fix quick-win (≤30 min, additivo):**
1. Bonifica le 7 righe "recuperato" nelle 2 note (o estendi `PAIRS` con le varianti "Euro X,XXX" e lancia `fix_recuperato_canon.py` mirato sulle 2 note).
2. Aggiungi in testa a ciascuna un blocco `> ⚠ SUPERSEDED (maggio 2026): corpo unico, non più su molle — vale [[_CANONE]]` così anche il chunk RAG porta con sé l'avviso (chunk 512 char: l'avviso in testa entra nei primi chunk).
**Fix ingegneria:** rifare `v32_analisi_tecnica_reale` versione corpo-unico e spostare le vecchie in `_ARCHIVIO/` (escluse dal RAG automaticamente), poi `rag-update` incrementale. Rinominare i wikilink nel canone.

## P0.2 — 55 file di versioni SUPERATE sono dentro il canone RAG
Le esclusioni (`rag_engine.py:134` `EXCLUDE_REL_DIRS=("KNOWLEDGE/RESEARCH",)` e `:143`
`EXCLUDE_DIR_NAMES={"_ARCHIVIO","_PROPOSTI"}`) non coprono le cartelle-archivio SENZA underscore.
Verificato nel corpus (`rag_corpus.jsonl`, 504 file unici):
- `ASSOLUTO/VERSIONI/` — **13 file** (v3→v6; `_CANONE.md:25` li definisce "storico", non verità)
- `KNOWLEDGE/SINAPSI/ARCHIVIO/` — **32 file**, incl. **duplicati** `V32_ANALISI_TECNICA.md` e `V32_MAPPA_VIVENTE.md` (copia vecchia della nota canone → la stessa affermazione esiste 2 volte con numeri potenzialmente diversi)
- `KNOWLEDGE/ASSOLUTO/ARCHIVE_V6/` — **10 file**

In retrieval RRF questi competono alla pari con V9/reale: **divergenza di verità servita**, e 21 delle
26 violazioni canone fuori `_ARCHIVIO` vivono qui (ASSOLUTO/VERSIONI: 10 · KNOWLEDGE: 11 · scan
`canon_guard.py` eseguito read-only, 50 righe totali di cui 24 in `_ARCHIVIO`).

**Fix quick-win:** in `rag_engine.py:143` aggiungi `"ARCHIVIO", "ARCHIVE_V6"` a `EXCLUDE_DIR_NAMES`
e `os.path.join("ASSOLUTO","VERSIONI")` a `EXCLUDE_REL_DIRS`. ⚠ La pulizia dei ~1.500-2.500 chunk
già indicizzati richiede che l'update purghi i file ora-esclusi: verificare che il self-heal
(`:480-496`, `live_ids - corpus`) li rimuova dopo che il build li salta; se serve rebuild completo,
farlo **in finestra dedicata con `rag_update_exclusive.ps1`** (mai a martello: commit-leak/OOM).
**Alternativa zero-codice:** rinominare le cartelle con underscore (`_ARCHIVIO`) — ma rompe i
wikilink Obsidian: sconsigliata, meglio il fix nelle exclusions.

## P1.1 — Collisione di ID nel canone attivo: due EP_N2_01
Nel vault attivo (indicizzato, non archiviato) esistono **due episodi con lo stesso ID**:
- `MENTE/STORIE/S_AVVENTURA/EP_N2_01_la_bambina_che_chiedeva_perche.md` ← questo è in `episodes.json` ("La Bambina che Chiedeva Perché")
- `MENTE/STORIE/S_AVVENTURA/EP_N2_01_il_bottone_che_regge.md` ← orfano di dashboard ma NEL RAG

Due verità per "l'episodio 1 di Nina". Inoltre: titolo *il_guardiano_che_non_dorme* riusato su
`EP_N2_16` (in `_PROPOSTI`, ok esclusa) e `EP_N2_23` (attivo) — confusione semantica in retrieval.
**Fix quick-win:** sposta `EP_N2_01_il_bottone_che_regge.md` in `S_AVVENTURA/_ARCHIVIO/` (o
rinumera come episodio nuovo se il contenuto è buono) + `rag-update`.
**Fix ingegneria:** check id-collision in `audit_episodes.py`/night_audit (oggi nessuno lo rileva).

## P1.2 — `_CANONE.md` è stantio e nessun codice lo legge: la "verità unica" non è enforced
- `_CANONE.md:31` — *"Canone serie attuale = EP_N2_01…15"* ma la serie è a **EP_N2_38+** (51 episodi N2 in `episodes.json`), con auto-promozione senza revisione dalla sess. #44. Pagina aggiornata 2026-06-22 (`:42`): 11 giorni di deriva su un asse che genera da solo ogni notte.
- Grep su tutto il codice: **nessun modulo legge `_CANONE.md`** (solo `canon_guard.py` implementa UNA regola, quella del "recuperato"). Nessun boost/priorità canone in `rag_engine.py` (grep boost/priorit/weight: 0 hit). La verità unica vive solo per il lettore umano in Obsidian.

**Fix ingegneria (la mossa che chiude il cerchio "sempre la verità"):**
1. **Canon-pin nel retrieval:** al build, parse dei `[[wikilink]]` da `_CANONE.md` → metadato `is_canon=1` sui chunk di quelle note → in `search()` (`rag_engine.py:635` zona RRF) bonus RRF (+0.5/rank) o slot riservato nel top-k. Costo: ~40 righe, zero nuovo modello.
2. **Freshness guard:** night_audit segnala se `_CANONE.md` mtime > 14 giorni O se esistono `EP_N2_NN` con NN > massimo dichiarato nel canone (parse della riga 31).

## P2.1 — L'audit notturno è cieco sulle violazioni canone fuori STORIE
`NODES/AUDIT_AGENT/night_audit.py:240-242` esegue `canon_guard.scan` **solo su EPISODES (STORIE)**.
Le 26 violazioni fuori `_ARCHIVIO` (V32: 5 righe **nelle note canone**, ASSOLUTO: 10, KNOWLEDGE: 11)
sono invisibili → `system_health.json` dice "OK" mentre la fonte canonica viola la regola.
**Fix quick-win:** scandire tutta `MENTE_DIR` saltando `_ARCHIVIO/_PROPOSTI` (riusa
`rag_engine._is_excluded` come single-source della definizione di canone).

## P2.2 — Tre "verità" diverse sul numero di episodi
- `system_health.json:6` → **255** (night_audit.py:187 conta TUTTI gli *.md ricorsivi in STORIE, inclusi `_ARCHIVIO`, `_PROPOSTI`, INDICE_CAMMINO, PRODUZIONE_NINA…)
- `episodes.json` (dashboard) → **218**
- vault `EP_*.md` → **230**
La metrica "n_episodes" non è incastrabile con nulla. **Fix quick-win:** in night_audit contare con
la stessa regola di `build_episodes_json` (escludi `_*` e non-EP), o meglio leggere `len(episodes.json)`.

## P2.3 — Tracciabilità a metà: le fonti del grounding non sono persistite
- Blocco `## FATTI (per il RAG)` presente in **76/218** episodi json (35%) — contratto introdotto in story_agent v1.1 (`story_agent.py:245-257`), gli episodi precedenti ne sono privi.
- `nina_agent.py:423-424` **logga** "Grounding: N righe di fonti" ma non salva QUALI note hanno fondato l'episodio; `episodes.json` non ha campo fonti/sources (schema verificato). Oggi NON si può risalire da un'affermazione di Nina alla nota MENTE che la fonda — la tracciabilità richiesta ("ogni affermazione risale a una nota") esiste solo in transito.
**Fix ingegneria:** persistere in front-matter dell'episodio `fonti: [percorsi note RAG]` (già disponibili in `retrieve_context`, `nina_agent.py:117` — `r["source"]`) e propagarle in `episodes.json` via build. Retroattivo impossibile, ma da subito per i nuovi.
- Nota di igiene: il campo `recuperato` in `episodes.json` è un flag tecnico ("recuperato dal vault", 131 episodi) — innocuo ma nome infelice vista la regola; rinominarlo `from_vault` alla prossima build touch.

## P3 — Orfani e sinergie tra i mondi
- **Orfani attuali: 2**, entrambi `KNOWLEDGE/RESEARCH/GENESIS/*` (`vault_orphans.json:8-17`) — cartella già FUORI canone RAG: sono rumore, non un buco. Causa: `CONTENT_ENGINE/scripts/vault_intersect.py:52` `SKIP_DIRS={"STORIE",".obsidian",".git","_allegati"}` non allineato alle esclusioni RAG (non salta `_ARCHIVIO` né `KNOWLEDGE/RESEARCH`). Effetto doppio: (a) conta orfani in zone fuori canone; (b) i blocchi COLLEGATI possono linkare note canone ↔ note archivio, facendo riaffiorare la verità vecchia nel grafo Obsidian.
  **Fix quick-win:** importare/riusare `rag_engine._is_excluded` in vault_intersect (una definizione di canone, due consumatori).
- **Sinergia presente e viva:** `_CANONE.md:44-69` ha blocchi auto COLLEGATI (vault_intersect) + ECOSISTEMA (ecosystem_bridge) che agganciano V32/MIMS/Nina — il ponte tra i mondi c'è. Quello che manca è il ponte **inverso in retrieval** (P1.2: il canone non pesa di più delle copie).
- Linkgraph GraphRAG-lite: 5841 archi, built 2026-07-03 04:32 (`rag_linkgraph.json`) — fresco.

---

## PIANO PROPOSTO (ordine di esecuzione)
**Quick-win (≤30 min ciascuno, additivi, nessun rebuild pesante):**
1. Bonifica framing + banner SUPERSEDED nelle 2 note canone V32 → `rag-update` incrementale (P0.1)
2. Archivia `EP_N2_01_il_bottone_che_regge.md` → `rag-update` (P1.1)
3. Aggiorna `_CANONE.md` riga 31 (serie EP_N2_01…38+, auto-promozione) e data (P1.2)
4. night_audit: canon-scan su tutta MENTE (via `_is_excluded`) + n_episodes da `episodes.json` (P2.1/P2.2)
5. vault_intersect: riusa `_is_excluded` (P3)

**Ingegnerizzazione (sessione dedicata):**
6. Exclusions estese (ARCHIVIO/ARCHIVE_V6/ASSOLUTO/VERSIONI) + purge chunk in finestra `rag_update_exclusive.ps1` (P0.2)
7. Canon-pin: `is_canon` dai wikilink di `_CANONE.md` + boost RRF in `search()` (P1.2)
8. Persistenza fonti grounding in front-matter + `episodes.json` (P2.3)
9. Check id-collision episodi in audit (P1.1)

**Reversibilità garantita:** ogni fix sopra è un commit isolato; le note spostate vanno in `_ARCHIVIO`
(mai cancellate); l'indice si rigenera sempre da `rag_corpus.jsonl`/MENTE (recovery L1/L2 già in piedi).
