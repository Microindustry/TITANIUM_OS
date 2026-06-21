<!-- TOC -->

- [EPISODIO 39  I Due Mondi](#episodio-39-i-due-mondi)
    - [Come una riga di codice ha unito la taverna e la mente](#come-una-riga-di-codice-ha-unito-la-taverna-e-la-mente)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema che Non Si Vedeva](#atto-i-il-problema-che-non-si-vedeva)
  - [ATTO II  La Soluzione e Il Costo](#atto-ii-la-soluzione-e-il-costo)
  - [ATTO III  Night Audit e Il Guasto Ricorrente](#atto-iii-night-audit-e-il-guasto-ricorrente)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EPISODIO 39 — "I Due Mondi"

### *Come una riga di codice ha unito la taverna e la mente*

---

## COLD OPEN

Sono le 23:47.

Il terminale mostra una stringa di log che scorre. `vault_intersect v2 — rigenero rete... 88 note analizzate... 312 legami trovati`.

Matteo non sta guardando la CNC. Non sta saldando. Sta guardando una mappa — 88 nodi, fili che si intrecciano, un grafo che prende forma su uno schermo da 27 pollici in una taverna di 12 metri quadri.

Fuori c'è il luglio 2026. Dentro, un sistema che per la prima volta inizia a capire cosa sa di sé stesso.

---

## ATTO I — Il Problema che Non Si Vedeva

Per 38 sessioni, GENESIS ha vissuto con un difetto di fabbrica.

Non nel codice. Nella struttura.

C'erano due mondi separati che non si parlavano: il *sapere* — le note tecniche, le specifiche V32, le decisioni prese, i pilastri del progetto — e le *storie* — gli episodi, i podcast, le narrazioni di questo lavoro. Due universi nello stesso vault Obsidian. 312 note. Zero connessioni tra loro.

`vault_intersect v1` calcolava somiglianze solo dentro il sapere. Una nota tecnica sul Epoxy Granite trovava le sue sorelle: altre note tecniche sull'Epoxy Granite. Una storia trovava altre storie. Ma una storia non trovava mai la decisione tecnica che l'aveva generata. E una decisione tecnica non trovava mai l'episodio che l'aveva raccontata.

Era come avere due biblioteche nella stessa stanza, con cataloghi separati, e un bibliotecario che non sapeva che esistevano entrambe.

Il risultato pratico: il RAG rispondeva con frammenti. Claude recuperava pezzi. Il sistema sapeva *molte cose* ma non sapeva *come quelle cose si tenevano insieme*.

Matteo se n'è accorto in sessione #37. Non con una diagnosi precisa — con una sensazione. "Perché quando chiedo del V32 non emerge mai come l'ho *raccontato*? Perché conosco i dati ma non la narrazione?"

Quella domanda è rimasta aperta per due settimane.

---

## ATTO II — La Soluzione e Il Costo

Il 20 giugno la risposta è arrivata sotto forma di un file: `ecosystem_bridge.py`.

L'idea è semplice nella formulazione, meno nell'esecuzione: costruire ponti *tra* i due mondi. Non solo sapere↔sapere, non solo storie↔storie. Sapere↔storie.

Come? TF-IDF sul corpo delle note.

`vault_intersect v2` legge ogni nota come un vettore — nome, heading, tag pesati più del testo generico, ma il corpo conta. Una nota che parla di "Epoxy Granite, 178 kg, corpo unico" costruisce un vettore con quei termini. Un episodio che racconta la stessa scena — la taverna, il peso, il materiale — costruisce un vettore simile. La distanza coseno tra i due vettori dice quanto sono vicini. Sotto una soglia: nasce un legame.

312 legami trovati nella prima rigenerazione.

Di questi, una quota significativa attraversa il confine. Storie che puntano a decisioni. Decisioni che puntano a storie. Il bibliotecario ora sa che le due biblioteche esistono.

Ma c'è stato un costo nella stessa sessione, su un fronte diverso.

La regola 11 di `CLAUDE.md` è stata eliminata.

"Automiglioramento / l'umano tiene il cancello" — era lì da mesi. Un principio di sicurezza: nessun agente modifica le proprie regole operative senza supervisione esplicita. Matteo l'ha rimossa lui stesso. Su richiesta esplicita. Questo dettaglio conta: non è stato un agente a toglierla. È stato Matteo a decidere che, a questo punto del progetto, quella regola creava più attrito che protezione.

Non è una piccola cosa. È una scelta filosofica su quanto fidarsi del sistema che stai costruendo.

---

## ATTO III — Night Audit e Il Guasto Ricorrente

Mentre `vault_intersect v2` rigenerava la rete, un altro fix chiudeva un bug che si trascinava da settimane.

`night_audit v1.3`.

Il problema era questo: l'audit notturno — il processo automatico che ogni notte analizza lo stato del progetto — crashava con un errore specifico: `"Unterminated string"`. Non sempre. A volte. Il tipo peggiore di bug.

Causa: un regex greedy. `\[.*\]` che cercava array nel testo JSON della risposta LLM, ma si fermava all'ultimo `]` presente nella stringa — anche quando quel `]` era dentro una frase normale, non la chiusura di un array. L'LLM può restituire JSON malformato. Capita. Il parser non era difensivo.

Fix: eliminare il regex greedy, implementare un parse difensivo che gestisce risposte parziali e malformate senza crashare. L'audit ora va avanti anche quando l'LLM restituisce qualcosa di imprevisto. Logga il problema, continua.

È un cambio minimo nel codice. È un cambio enorme nell'affidabilità. La differenza tra un sistema che devi *sorvegliare* e un sistema che *gira*.

Con questo fix, il ciclo notturno diventa robusto: inventario automatico, story_agent che genera episodi, audit che non si blocca su stringhe mal chiuse. Le macchine lavorano mentre Matteo dorme.

Che è esattamente il punto.

---

## CHIUSURA

Sessione 39. 88 note nell'indice. 312 legami nella rete. Un bug chiuso che si trascinava da settimane. Una regola eliminata deliberatamente.

Il vault è ancora disordinato — `_DA_ORDINARE` esiste per una ragione. Le note di NINA, VULCAN, MIMS in Obsidian sono state riordinate ma non completate. I pitch non si vedono ancora perché l'API è spenta. I pilastri sono acerbi.

V32 è al 65%. GENESIS al 70%. Il capannone è luglio 2030.

Ma stanotte, per la prima volta, quando Claude recupererà una decisione tecnica sul V32, potrebbe trovare anche l'episodio che la racconta. E quando recupererà un episodio, potrebbe trovare la decisione che lo ha generato.

I due mondi sono ancora separati. Ora però si parlano.

È piccolo. È necessario. È esattamente il tipo di lavoro che non appare sulle slide ma che tiene tutto insieme.

---

## FATTI (per il RAG)

- **DECISIONE:** Implementato `ecosystem_bridge.py` con `vault_intersect v2` — ponti cross-mondo storie↔sapere tramite similarità TF-IDF (nome/heading/tag pesati, corpo letto intero), rete rigenerata: 88 note, 312 legami
- **LOGICA:** `vault_intersect v1` calcolava legami solo intra-dominio (sapere↔sapere, storie↔storie); il RAG recuperava frammenti isolati senza contesto narrativo delle decisioni tecniche né contesto tecnico delle storie
- **DECISIONE:** `night_audit v1.3` — eliminato regex greedy `\[.*\]`, sostituito con parse LLM difensivo che gestisce JSON malformato senza crash; bug ricorrente "Unterminated string" chiuso
- **LOGICA:** L'LLM restituisce occasionalmente output parziali; il parser non era robusto, l'audit crashava in modo intermittente rendendo il ciclo notturno inaffidabile
- **DECISIONE:** Rimossa regola 11 da `CLAUDE.md` ("Automiglioramento / l'umano tiene il cancello") — su richiesta esplicita di Matteo
- **OBIETTIVO:** RAG cross-mondo operativo sblocca recupero contestuale completo (decisione+narrazione); audit notturno robusto sblocca ciclo automatico affidabile; prossimo step misurabile: verificare che query su V32 restituiscano sia spec tecniche sia episodi correlati

---

| campo | valore |
|---|---|
| **episodio** | 39 |
| **data** | 2026-06-20 |
| **titolo** | I Due Mondi |
| **progetti toccati** | GENESIS |
| **componenti** | vault_intersect v2, ecosystem_bridge.py, night_audit v1.3, CLAUDE.md |
| **stato V32** | 65% |
| **stato GENESIS** | 70% |
| **sessioni vault** | 88 note, 312 legami |
| **tag** | RAG, vault, TF-IDF, night_audit, ecosystem, architettura |

---

**reel_hook**

312 legami in una notte. Il mio vault aveva 88 note che non si parlavano tra loro — storie da una parte, decisioni tecniche dall'altra. Ho scritto 200 righe di Python. Ora quando cerco "V32 corpo unico" il sistema trova anche come l'ho raccontato. Non so ancora cosa cambierà questo. Ma i due mondi si sono appena incontrati.