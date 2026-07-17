<!-- TOC -->

- [TITANIUM_OS  Episodio Podcast](#titaniumos-episodio-podcast)
  - [La Macchina che Pulisce Se Stessa](#la-macchina-che-pulisce-se-stessa)
    - [Sessione 63-64  16 luglio 2026](#sessione-63-64-16-luglio-2026)
  - [COLD OPEN](#cold-open)
  - [ATTO I  IL PROBLEMA CHE NON SI VEDE](#atto-i-il-problema-che-non-si-vede)
  - [ATTO II  LE TRE ONDATE](#atto-ii-le-tre-ondate)
  - [ATTO III  QUELLO CHE ASPETTA](#atto-iii-quello-che-aspetta)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio Podcast
## "La Macchina che Pulisce Se Stessa"
### Sessione #63-64 · 16 luglio 2026

---

## COLD OPEN

È mezzanotte passata.

Il commit log scorre sul terminale: ventiquattro righe. Ventiquattro operazioni chirurgiche su un sistema che, fino a ieri, si re-embeddava da solo ogni volta che respirava.

Matteo non è davanti al computer. Il computer lavora da solo.

Questo è il punto.

---

## ATTO I — IL PROBLEMA CHE NON SI VEDE

Ci sono due tipi di debito tecnico.

Il primo tipo lo vedi: un bullone che non entra, un foro fuori tolleranza, una saldatura che regge a occhio ma non regge al carico. Il secondo tipo è invisibile finché non ti frena. È il debito che si accumula quando un sistema funziona — tecnicamente funziona — ma consuma il 40% delle sue risorse a fare cose che non avrebbe mai dovuto fare.

GENESIS aveva quel secondo tipo di problema.

Il RAG — ChromaDB, l'indice che permette al sistema cognitivo di recuperare fatti da 39 sessioni, da centinaia di decisioni tecniche, da tre anni di lavoro su V32, VULCAN, MIMS — il RAG si re-embeddava per intero ogni volta che un file cambiava. Qualsiasi file. Un apostrofo corretto in una nota Obsidian faceva ripartire il monolite da capo.

Il numero concreto: `fatti_dalle_storie.md` per il dominio GENESIS aveva raggiunto 1153 righe. Un blocco unico. Ogni aggiornamento triggerava il re-embed dell'intero blocco. Non del pezzo nuovo. Tutto.

E c'era di peggio.

Le STORIE — gli episodi grezzi, le bozze narrative — occupavano il 55% dell'indice. I generatori, quando cercavano un fatto tecnico, pescavano metà del tempo da prosa narrativa invece che da fatti curati. Il sistema si auto-inquinava. Si citava.

Poi c'erano i doppioni: file `*_copia` rimasti nel vault accanto agli originali. Le daily-note Obsidian in formato `YYYY-MM-DD.md` che finivano nell'indice invece che restare fuori canone. Il log del watcher arrivato a 27 MB perché `FileHandler` non ruota. I task GPU che, al riavvio della macchina — spenta quattro notti su dieci — si impilevano tutti insieme invece di scaglionarsi.

Non era un sistema rotto. Era un sistema che perdeva.

---

## ATTO II — LE TRE ONDATE

L'attacco #2 si è strutturato in tre ondate. Non per eleganza narrativa — per priorità di rischio.

**ONDATA A: le fondamenta.**

Prima di ottimizzare, serviva che il sistema leggesse le cose giuste. `_canon_stems()` — la funzione che determina quali file sono canonici — leggeva tutti i wikilink di `_CANONE.md`, inclusi due link marcati SUPERSEDED. Risultato: documenti obsoleti che entravano nell'indice come se fossero correnti. Fix chirurgico: un filtro che salta i link con tag di supersessione.

Poi la coda dell'apprendista. Morta intorno al 21 luglio — refill manuale, ogni volta. Sostituita con auto-refill più un tetto anti-backlog: l'apprendista ora genera multi-bozza ma non accumula infinitamente. Il log del watcher: `RotatingFileHandler`, 5 MB cap, tre backup. Piccolo, necessario, permanente.

**ONDATA B: il metabolismo.**

Qui è dove il RAG ha smesso di sudare.

Tre attriti in parallelo: re-embed di massa ogni run, esecuzioni concorrenti che si calpestano, churn di file che non sono cambiati. Soluzione: hash manifest. Prima di re-embeddare qualsiasi chunk, il sistema confronta l'hash con quello dell'ultimo run. Se è identico, esce subito — early-exit no-op. Un lock impedisce build concorrenti. Il risultato non è un numero di velocità: è che il sistema smette di consumarsi da solo.

Stessa ondata: LinkedIn. Quindici episodi convertiti in PDF con `pdf_export.py` — il canale non-Meta, pubblicabile oggi, fermo da settimane perché mancava l'ultimo passaggio. Quindici PDF, un pomeriggio. Fatto.

Nina — la corsia apprendista per i 53 caroselli della serie N2 — sbloccata: prima girava solo in parallelo al flusso principale, condividendo risorse. Ora ha una corsia dedicata. `EP_N2_04` promosso come prova del fuoco.

**ONDATA C: l'onestà.**

Il "Personal LLM domenicale" era teatro. Dataset da 30 esempi, finetune che segnava verde senza esserlo davvero. Il dataset è stato portato a 176 episodi. Il finetune ora è vero — o non si esegue. Nessun verde finto.

I task GPU al riavvio: `RandomDelay` sulla schedulazione. Quattro notti su dieci la macchina è spenta. Al boot, tutti i recuperi partivano insieme e la macchina soffocava. Adesso partono sfasati. Piccolo, ma elimina un collo reale.

E il riflusso dei FATTI: il monolite da 1153 righe è stato spezzato. Rotazione trimestrale — `2026Q2`, `2026Q3` — invece di un file che cresce senza limite. Le STORIE retrocesse: i generatori leggono prima i FATTI curati, le STORIE pesano meno nell'indice. Il sistema adesso cita fatti, non se stesso.

Ventiquattro commit. Tutti verificati. Ondate A, B, C chiuse.

---

## ATTO III — QUELLO CHE ASPETTA

Domani — sessione #64 — c'è Postiz.

Il repo è già clonato in `C:/Users/teo/tools/postiz-docker-compose`. Il `docker-compose.yaml` ha il `JWT_SECRET` generato, i campi `LINKEDIN_` vuoti e in attesa. I segreti sono in `_VAULT/ACCOUNTS/postiz.md`, gitignored. Stack completo: Postiz, Postgres, Redis, Temporal. UI su `localhost:4007`. WSL2, Ubuntu, Docker Desktop 4.82 installati via winget.

Manca un riavvio.

Solo quello. Matteo ha installato tutto ieri sera, il sistema aspetta un riavvio per attivare WSL2. È la cosa più piccola e più concreta che separa GENESIS dalla pubblicazione autonoma. Non un'architettura da progettare. Non un problema da risolvere. Un tasto da premere.

Il profilo GitHub è alla versione 2.1 — sintesi umana con Adesso/Prossimo, dettaglio tecnico in `<details>`, canon-safe. La baseline LinkedIn `PRE_SG_01` è stata letta: targeting corretto, engagement sottile. I quindici PDF di episodi LinkedIn sono pronti.

Il collo numero uno — la pubblicazione — si rompe domani o si rimanda di un'altra settimana.

---

## CHIUSURA

C'è una soddisfazione particolare nel lavoro di pulizia.

Non è quella del pezzo nuovo montato, del test che passa, della misura che rientra in tolleranza. È più silenziosa. È la soddisfazione di togliere attrito da un sistema che funzionerà anche quando dormi — che funziona già, stanotte, mentre Matteo non è davanti allo schermo.

Il sistema cognitivo di GENESIS si è re-embeddato per l'ultima volta da monolite stasera. Domani mattina, quando il watcher rileverà una modifica, confronterà l'hash, uscirà in no-op, e risparmierà cinque minuti di CPU che nessuno avrebbe mai notato perdere — ma che si accumulano, sessione dopo sessione, fino a diventare il motivo per cui qualcosa si fa più lentamente del necessario.

Ventiquattro righe nel commit log. Ventiquattro problemi che non esisteranno più.

Il riavvio aspetta domani mattina.

---

## FATTI (per il RAG)

- **DECISIONE:** `fatti_dalle_storie.md` spezzato da monolite (1153 righe GENESIS) a rotazione trimestrale (`2026Q2`, `2026Q3`) — stop re-embed dell'intero dominio a ogni modifica.
- **LOGICA:** Un singolo file di fatti per dominio triggerava re-embed completo a ogni aggiornamento; la rotazione trimestrale isola i chunk recenti e riduce il perimetro di re-embed.
- **DECISIONE:** Hash manifest + lock build_index + early-exit no-op sul RAG — nessun re-embed se il contenuto non è cambiato.
- **LOGICA:** Tre attriti concorrenti (re-embed di massa, run paralleli, churn su file invariati) consumavano risorse a ogni ciclo senza produrre aggiornamenti reali.
- **DECISIONE:** STORIE retrocesse nell'indice — i generatori pesano prima i FATTI curati (backlog #8).
- **LOGICA:** Le STORIE occupavano il 55% dell'indice; i generatori pescavano prosa narrativa invece di fatti tecnici verificati, inquinando le risposte del sistema.
- **DECISIONE:** `RandomDelay` sui task GPU notturni per scaglionare i recuperi al boot.
- **LOGICA:** Macchina spenta ~4 notti su 10; al riavvio tutti i task recuperavano insieme causando picco di carico; lo scaglionamento distribuisce il carico sul tempo di avvio.
- **DECISIONE:** Dataset finetune portato da 30 a 176 episodi; finetune vero o non eseguito — eliminato il finto-verde.
- **OBIETTIVO:** Sessione #64 — montaggio Postiz (riavvio WSL2 → `docker compose up` → OAuth LinkedIn → primo post autonomo); questo è il collo n.1 alla pubblicazione.

---

| Campo | Valore |
|---|---|
| **Episodio** | EP_GENESIS_S1_#63-64 |
| **Data registrazione** | 2026-07-16 |
| **Dominio principale** | GENESIS / RAG |
| **Commit di riferimento** | Attacco #2 — Ondate A/B/C (#61/#62) |
| **Milestone sbloccata** | Dominio 2 (Conoscenza/RAG) completato |
| **Prossimo step critico** | Sessione #64 — Postiz montaggio + LinkedIn live |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Tag narrativo** | pulizia-sistemica, RAG, automazione-notturna, pubblicazione |

---

> **reel_hook**
>
> Il RAG si re-embeddava da solo ogni volta che cambiava un file. Qualsiasi file. Stava consumando il 40% delle risorse su lavoro già fatto. Ventiquattro commit in una notte per togliere ogni attrito. Domani mattina