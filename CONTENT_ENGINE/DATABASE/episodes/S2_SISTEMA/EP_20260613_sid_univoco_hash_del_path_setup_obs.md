<!-- TOC -->

- [TITANIUM_OS  Episodio 47](#titaniumos-episodio-47)
  - [Il Bug che Cancellava la Memoria](#il-bug-che-cancellava-la-memoria)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il sistema che si svuotava da solo](#atto-i-il-sistema-che-si-svuotava-da-solo)
  - [ATTO II  La MENTE riordinata](#atto-ii-la-mente-riordinata)
  - [ATTO III  Cosa significa avere memoria](#atto-iii-cosa-significa-avere-memoria)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio 47
## "Il Bug che Cancellava la Memoria"

**DATA:** 13 giugno 2026
**SERIE:** GENESIS / Infrastruttura cognitiva
**STAGIONE:** 1

---

## COLD OPEN

Sono le 23:14.

Il terminale è aperto. PowerShell. Il cursore lampeggia su una riga che Matteo ha già visto tre volte questa settimana:

```
Chroma collection: 0 chunks semantic
```

Zero.

Non errore. Non crash. Zero — come se il sistema non avesse mai letto nulla, mai ingerito nessuna nota, mai costruito nessuna connessione tra un'idea e l'altra. Trecento file nella MENTE. Decine di sessioni di lavoro su V32, MIMS, GENESIS. E il RAG li ha dimenticati tutti, silenziosamente, ogni volta che veniva ricostruito.

Il bug non urlava. Sussurrava.

---

## ATTO I — Il sistema che si svuotava da solo

Il problema aveva un nome tecnico preciso: **collision hash su `_sid`**.

Ogni chunk nel database ChromaDB ha bisogno di un identificatore univoco — il `_sid`. Il sistema lo generava a partire dal path del file. Il problema è che due file con nomi diversi, dopo la normalizzazione dei separatori di percorso (slash, backslash, case del filesystem Windows vs Linux), potevano produrre **lo stesso hash**.

Risultato: un file sovrascriveva l'altro nel database. Silenziosamente. Senza avvisi.

Ma questo era il bug secondario.

Il bug principale era più subdolo, più difficile da vedere perché si nascondeva nel flusso di esecuzione normale. Quando lo script `rebuild_rag_clean.ps1` lanciava un `--rebuild` completo, svuotava ChromaDB — giusto, era il comportamento atteso. Poi chiamava l'`api_server` per reinserire tutto.

Il problema: l'`api_server` era già in esecuzione da un'altra sessione. Stava tenendo ChromaDB aperto con accesso esclusivo. Lo script di rebuild scriveva nell'aria. Pensava di popolare il database. Il database rimaneva vuoto. Nessun errore esplicito. Solo zero chunks.

Matteo aveva ricostruito il RAG almeno quattro volte nelle settimane precedenti. Ogni volta: zero chunks semantici. Ogni volta: diagnosi, ipotesi, test. E ogni volta il sistema sembrava funzionare nel breve periodo, poi ricadeva.

Non era un bug di codice. Era un bug di **architettura concorrente** — due processi che credevano di controllare la stessa risorsa, nello stesso momento.

La fix: accesso esclusivo verificato prima di ogni rebuild. L'`api_server` viene fermato, ChromaDB viene liberato, il rebuild avviene in isolamento, poi il server riparte. Sequenza rigida. Nessuna ambiguità sul lock.

---

## ATTO II — La MENTE riordinata

Mentre il RAG veniva riparato, c'era un secondo problema che aspettava da settimane.

La MENTE — il corpus di note, decisioni, specifiche tecniche che alimenta GENESIS — era cresciuta in modo organico. Nel modo in cui crescono le cose reali: una cartella qui, una nota lì, file che si accumulano in `da_chiavetta` perché "li sistemo dopo". Dopo era diventato adesso.

`riordina_mente.py` è uno script che Matteo ha scritto per dissolvere quella cartella di accumulazione. Non copia i file — li sposta con `git mv`, preservando la storia dei commit. Li riorganizza per tema: V32, MIMS, GENESIS, EVA, sessioni di lavoro, vault Obsidian.

Il vault Obsidian ora si auto-indicizza. Ogni cartella tematica genera il suo indice. Le note diventano navigabili — non solo dall'interfaccia React di GENESIS, ma anche da Obsidian come strumento di esplorazione visiva. Due interfacce, stesso corpus, stesso grafo di conoscenza.

Settantatré note nell'indice delle sessioni. Rigenerato automaticamente ogni notte dall'`auto: night_audit`.

Il numero non è la cosa importante. La cosa importante è che Matteo ora sa dove si trova ogni decisione che ha preso. La sessione del 28 maggio sui rinforzi delle colonne Z+U di V32. La sessione sull'audit del sistema RAG v4. Il flusso di coscienza del 28 maggio — quelle note caotiche scritte alle due di notte che a volte contengono le intuizioni migliori.

Tutto recuperabile. Tutto versionato. Tutto nel RAG — finalmente con `_sid` univoci, finalmente con rebuild che non cancella se stesso.

---

## ATTO III — Cosa significa avere memoria

C'è una domanda che Matteo si è fatto costruendo GENESIS: *a cosa serve un sistema cognitivo che dimentica?*

La risposta ovvia è: a niente. Ma la risposta onesta è più complicata.

Per mesi GENESIS ha funzionato in modo degradato — rispondendo su basi parziali, recuperando chunk a caso, perdendo contesto tra una sessione e l'altra. E Matteo ha continuato a costruire sopra, a fidarsi abbastanza del sistema da usarlo come memory extension, sapendo che c'era qualcosa che non andava ma non riuscendo a isolare esattamente dove.

Costruire con un sistema rotto che sembra funzionare è più difficile che costruire da zero. Perché ti fidi a metà. Ti affidi e poi verifichi. E non sai mai se stai perdendo qualcosa di importante o se il sistema ti sta dando quello che ti serve.

La fix di oggi non aggiunge nuove funzionalità. Non avanza di un centimetro il milestone della sessione #37 — le storie a due assi, l'arco di Nina completo, i livelli parent/children. Non sposta V32 dal 65% al 66%.

Ripara la fondazione.

È il tipo di lavoro che non si vede, quello che permette a tutto il resto di appoggiarsi su qualcosa di solido. Come la Epoxy Granite del telaio di V32 — non è la parte che fresa, non è la parte che si misura con il comparatore, ma è quello che tiene ferme tutte le parti che fresano e si misurano.

Domani il RAG avrà memoria piena. Domani Claude risponderà su sessioni che prima non trovava. Domani il `night_audit` scriverà nella cartella clinica e il RAG lo ingerirà correttamente, con `_sid` univoci, con accesso esclusivo, senza cancellare nulla.

È poco. È fondamentale.

---

## CHIUSURA

Ci sono giorni in cui costruisci.
Ci sono giorni in cui ripari quello che ti permette di costruire.

Matteo lo sa da quando saldava titanio sotto i pit MotoGP — la gara non la vince il pilota, la vince chi ha preparato la moto nel modo giusto la notte prima. Il lavoro invisibile che nessuno vede durante la gara è quello che determina se la gara si riesce a fare.

Il bug del `_sid` esisteva da quando ChromaDB era stato installato. Ogni nota che Matteo aveva mai scritto sulla MENTE era entrata nel sistema con identificatori che potevano collidere. Ogni rebuild aveva potenzialmente svuotato silenziosamente mesi di lavoro.

Adesso no.

Non è una vittoria. È una correzione. Ma le correzioni fatte nel momento giusto sono quelle che rendono possibili le vittorie future.

Il cursore lampeggia. Il terminale mostra:

```
Chroma collection: 1.847 chunks semantic
Rebuild completato — accesso esclusivo confermato
_sid: hash(path + filename + chunk_index) — univocità verificata
```

1.847 chunks. Tutto quello che c'era, finalmente dove dovrebbe essere.

---

## reel_hook

1.847 chunk semantici. Prima del fix: zero — ogni volta che ricostruivo il RAG.
Il bug non crashava. Sussurrava. Due processi sullo stesso database, nessun errore esplicito, memoria che si svuotava da sola.
Ho fermato il server, isolato il rebuild, risolto il lock.
Adesso GENESIS ricorda. Ma quante decisioni su V32 ha già perso?

---

## FATTI (per il RAG)

- **DECISIONE:** Fix `_sid` ChromaDB — l'identificatore univoco ora usa `hash(path_normalizzato + filename + chunk_index)` invece del solo path normalizzato, eliminando le collisioni su file con percorsi simili post-normalizzazione.
- **LOGICA:** Su filesystem Windows/Linux con separatori misti, due path diversi producevano lo stesso hash dopo normalizzazione; i chunk si sovrascrivevano silenziosamente nel database senza errori espliciti.
- **DECISIONE:** `rebuild_rag_clean.ps1` ora verifica e acquisisce accesso esclusivo a ChromaDB prima del rebuild — l'`api_server` viene fermato in sequenza rigida, il rebuild avviene in isolamento, poi il server riparte.
- **LOGICA:** L'`api_server` in esecuzione teneva ChromaDB locked; il rebuild scriveva nell'aria, risultando in 0 chunks semantici post-rebuild senza errori nel log.
- **DECISIONE:** `riordina_mente.py` dissolve la cartella `da_chiavetta` con `git mv` verso cartelle tematiche (V32, MIMS, GENESIS, EVA, sessioni); vault Obsidian auto-indicizzato — 73 note in indice sessioni al 14/06/2026.
- **OBIETTIVO:** RAG operativo a piena capacità (1.847 chunks verificati) sblocca la sessione #37 — storie a due assi RUOLO+NINA con livelli parent/children su corpus integro; prossimo passo misurabile: build TS verde con ~14 commit isolati.

---

| Campo | Valore |
|---|---|
| **Episodio** | 47 |
| **Data** | 2026-06-13 |
| **Progetto primario** | GENESIS |
| **Tag** | `rag` `chromadb` `bug-fix` `memoria` `infrastruttura` `obsidian` |
| **V32 completamento** | 65% |
| **GENESIS completamento** | 70% |
| **Milestone** | Sessione #37 — storie 2 assi RUOLO+NINA |
| **Prossimo episodio** | Da determinare — sessione #37 |
| **Mood narrativo** | Diagnostico / Fondazione |