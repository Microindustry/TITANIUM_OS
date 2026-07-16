<!-- TOC -->

- [DOMINIO 2  CONOSCENZA / RAG (attrito nel loop episodiRAGgenerazione)](#dominio-2-conoscenza-rag-attrito-nel-loop-episodiraggenerazione)
  - [Quadro](#quadro)
  - [Attriti trovati](#attriti-trovati)
  - [TOP 3 per leva](#top-3-per-leva)

<!-- /TOC -->

# DOMINIO 2 — CONOSCENZA / RAG (attrito nel loop episodi→RAG→generazione)

*Attacco #2 · 15/07/2026 · agente Fable 5 · **propose-only** (nessun file toccato, nessun rebuild lanciato, 3 query di test via HTTP GET su :5001)*

## Quadro

Il loop è VIVO e segue il vault: 431 file / 19.635 chunk indicizzati, MENTE ha 457 file attivi
(+359 in cartelle escluse), EP_N2_55 auto stanotte, riflusso FATTI @03:43 (+1.738 chunk netti).
Il motore v4.3 (hybrid+canon-pin+GraphRAG-lite) è solido; gli attriti sono di **dieta** (cosa
entra nell'indice) e di **regime** (quanto lavoro rifà per niente): 67 run incrementali il 15/07,
di cui la maggioranza no-op, e un canon-pin che oggi spinge in top-5 anche verità SUPERSEDED.

## Attriti trovati

| # | Attrito | Prova (file:riga / numero) | Impatto sul grounding | Proposta additiva |
|---|---------|---------------------------|----------------------|-------------------|
| 1 | **Canon-pin promuove note che il canone stesso marca "storico"** | Query test `massa V32`: rank 2 `canon=True` da `V32\NOTE_OFFICINA\v32_analisi_tecnica_reale.md` con chunk "178 kg (69 non sospesa + 109 sospesa)" — versione su molle, superata da maggio 2026. `_CANONE.md` la linka con banner "⚠ snapshot storico su molle" ma `_canon_stems()` (rag_engine.py:384-402) pinna TUTTI i `[[wikilink]]` (31) senza distinguere verità/storico | Un generatore riceve il fatto vecchio CON bollino canone accanto al fatto nuovo senza bollino: il pin lavora contro il canone | Nel `_CANONE.md` marcare i link storici (es. riga con prefisso `storico:` o sezione `## STORICO`); in `_canon_stems()` saltare i wikilink su righe che contengono `storico`/`SUPERSEDED` (~5 righe, additivo) |
| 2 | **Re-embed di massa da touch senza cambio contenuto** | 3 eventi: 09/07 02:11 `mod:354 -del:15773`, 13/07 09:26 `mod:367 -del:16398`, 14/07 01:24 `mod:352 -del:14595` (rag_engine.log) = ri-embedding di ~75-84% dell'indice per volta. Il manifest confronta solo mtime+size (rag_engine.py:500-504); i riscrittori dei blocchi `Collegati` (auto_linker/vault_intersect) cambiano mtime ma il contenuto indicizzato è identico perché `_clean_for_index` (riga 201) li scarta | Ore di GPU/CPU sprecate di notte + finestra lunga in cui l'indice è "a metà" se la run muore; è il terreno dei vettori orfani (purge 733 il 13/07 09:26) | Nel manifest aggiungere `hash` sha1 del testo PULITO per file: se mtime cambia ma hash no → aggiorna solo mtime, zero re-embed (~10 righe in `build_index`) |
| 3 | **Nessun lock: indicizzatori concorrenti** | 13/07 09:26:29-09:27:17 tre run interleaved con totali divergenti (17574 / 17824 / 17964) e "Fit TF-IDF su 18697" mentre Totale=17824; 15/07 22:06:30-38 righe log duplicate + doppio "RAG rebuild OK" in mente_watcher.log | Scritture perse (il self-heal v4.3 le ripara DOPO, ri-processando file) e TF-IDF/corpus salvati da chi finisce ultimo — indice e BM25 possono divergere fino alla run successiva | File-lock attorno a `build_index()` (msvcrt.locking su un `.lock` in NODES/MENTE_RAG): il secondo processo esce subito con log "già in corso" (~15 righe) |
| 4 | **Churn no-op: ~60% delle run non ha nulla da fare** | 67 run il 15/07, 62 il 14/07 (818 totali a log); 116 delle ultime 200 run = `add:0 mod:0 -del:0` eppure ogni run rifà fit TF-IDF su 19.635 chunk + linkgraph + riscrive rag_corpus.jsonl (13 MB) e rag_tfidf.pkl (26 MB) + carica l'embedder. Trigger: watcher a raffica su eventi metadata (22:06:38: 26 `MODIFIED` simultanei → rebuild con `mod:0`); 6 run no-op tra le 03:27 e le 03:42 della stessa notte | Nessun danno ai dati, ma decine di load-modello/giorno sulla macchina che tiene anche l'API (GPU) — rumore, I/O e finestre di contesa (vedi #3) gratuite | Early-exit in `build_index`: se `added+modified+removed_chunks==0` salta fit/linkgraph/save e logga "no-op" (~4 righe dopo rag_engine.py:547) |
| 5 | **14,8 GB di leftover morti in NODES/MENTE_RAG** | `chroma_db_reset_20260714_033814` = 14.492 MB, `chroma_db_reset_20260713_105553` = 291 MB, `rag_manifest_CORROTTO_20260622...json` = 3 MB — l'indice VIVO è 201 MB (du -sm 15/07) | Non tocca il retrieval ma è 72× l'indice vivo su disco; a saturazione disco il primo a morire è ChromaDB (non crash-durable) | Voce in bussola: verifica + delete manuale dei due `chroma_db_reset_*` e del manifest CORROTTO; in prospettiva `retention.py` che ruota i reset > 7 giorni |
| 6 | **Doppioni `_copia` e config Obsidian dentro il canone** | `KNOWLEDGE\PROMPTS\istruzioni_ia.md` + `istruzioni_ia_copia.md` = 168+168 chunk (md5 diversi ma quasi-gemelli); `FINANZA\..._asimmetria_di_valore(_copia).md` idem; `.obsidian\*.json` (workspace, graph, app...) = 5 file / 53 chunk indicizzati (SUPPORTED_EXT include .json, riga 130; nessuna esclusione dot-folder) | I gemelli si rubano slot in RRF a vicenda (2 dei 15 FETCH_K possono essere lo stesso testo); i chunk di config Obsidian sono garbage puro nel retrieval | Aggiungere `.obsidian` a `EXCLUDE_DIR_NAMES` (rag_engine.py:152, 1 parola); sentinella night_audit che segnala stem `*_copia` accanto all'originale (decisione a Matteo: fondere o archiviare) |
| 7 | **Riflusso FATTI = monolite da 1.153 chunk ri-embeddato a ogni append** | `GENESIS\fatti_dalle_storie.md` = 1.153 chunk, il file più grande dell'indice (5,9%); notte 15/07 03:43: `mod:5 -del:926`; 44 run a log con del ≥900 | Ogni notte il loop paga il re-embed dell'INTERO storico dei fatti per aggiungerne una manciata; il costo cresce linearmente con la vita del sistema (oggi ~1 min, tra 6 mesi molto di più) | Ruotare il riflusso per trimestre (`fatti_dalle_storie_2026Q3.md`...): l'append tocca solo il file corrente, i chiusi non cambiano mai mtime — zero modifiche al motore |
| 8 | **Eco autoreferenziale: 55% dell'indice sono episodi generati** | STORIE = 237/431 file, 10.715/19.635 chunk (54,6%); query test `massa V32`: 3 dei 5 top sono episodi/riflusso; query `connettori MIMS`: la scheda canone entra solo al rank 5 (slot riservato, score 0.858) dietro 2 chunk di un doc visione e 1 spec basata su "ASSOLUTO V6" (superseded) | Il generatore di episodi si grounda soprattutto su episodi precedenti: un errore passato il QC si auto-conferma alle generazioni successive (il loop intenzionale diventa camera d'eco) | Parametro opt-in `demote_dirs=("STORIE",)` in `search()` (malus RRF tipo canon-bonus inverso) usato SOLO da `retrieve_context` di nina/story_agent — il riflusso FATTI curato resta il canale ufficiale storie→RAG |
| 9 | **Puntatore canone in ritardo sul loop notturno** | `_CANONE.md` dice "Canone serie attuale = EP_N2_01…53" (aggiornato 08/07); esistono EP_N2_54 (14/07) e EP_N2_55 (15/07) in `STORIE/S_AVVENTURA/` — 7 giorni di deriva | Chi interroga il canone sul range serie riceve un numero vecchio di 2 episodi; il drift cresce di 1/notte finché la sentinella non riparte | La sentinella notturna (night_audit) aggiorni il range EP_N2 nel `_CANONE.md` a ogni promozione (già lo fece l'08/07: è ferma, non mancante) |
| 10 | Voci manifest a 0 chunk + note diario in root | `2026-07-03.md` (0 byte), `2026-06-20.md`, `user_matteo.md` → 3 entry con `chunks=0` nel manifest; sono daily-note Obsidian in root MENTE | Cosmetico (nessun chunk servito), ma segnala che le daily-note nascono fuori dalle cartelle-pilastro | Convenzione: daily-note in una cartella `DIARIO/` (o aggiunta a `_NAV_FILES` se restano navigazione) |

**Calcoli richiesti** — (a) MENTE modificati ultimi 7 gg: **572 file** (127 in cartelle escluse);
il RAG segue: skip 429-431/431 nelle run a regime, chunk 18.791 → 19.635 nelle 24h del 15/07.
(b) Attive vs archivio: **457 attive / 359 escluse** (44% del vault è fuori canone — sano).
(c) Stale nel top-5: **sì** su `massa V32` (rank 2, canon=True, dati su molle) e parziale su
`connettori MIMS` (top-2 doc visione, rank 4 da V6); `serie PRE Nina` pulita (5/5 canon fresche).

## TOP 3 per leva

1. **#1 Canon-pin cieco allo "storico"** — è l'unico attrito che INQUINA attivamente il grounding
   oggi (prova in top-5), e la cura è ~5 righe + 2 marcatori nel `_CANONE.md`. Leva massima.
2. **#2+#3 hash-contenuto nel manifest + lock su build_index** — insieme eliminano i re-embed di
   massa (3 eventi da ~15k chunk in 6 giorni) e le run concorrenti che li rendono pericolosi;
   ~25 righe additive totali, si paga una volta e la notte respira.
3. **#7 rotazione del riflusso FATTI** — zero codice motore, ferma la crescita lineare del costo
   notturno del file più grande dell'indice (1.153 chunk ri-embeddati per append).

*Fuori classifica ma 5 minuti: #5 (recupero 14,8 GB) e #6 `.obsidian` (1 parola in EXCLUDE_DIR_NAMES).*
