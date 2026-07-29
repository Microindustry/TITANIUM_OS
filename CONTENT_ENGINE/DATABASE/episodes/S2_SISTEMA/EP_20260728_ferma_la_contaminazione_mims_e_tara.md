<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 70](#titaniumos-s2-episodio-70)
  - [Cinque Bugie e un Sistema che Credeva a Se Stesso](#cinque-bugie-e-un-sistema-che-credeva-a-se-stesso)
  - [COLD OPEN](#cold-open)
  - [ATTO I  La Coda Stale](#atto-i-la-coda-stale)
  - [ATTO II  Le Cinque Bugie di MIMS](#atto-ii-le-cinque-bugie-di-mims)
  - [ATTO III  Il Rumore delle Critiche](#atto-iii-il-rumore-delle-critiche)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 70
## "Cinque Bugie e un Sistema che Credeva a Se Stesso"

*28 luglio 2026 — Sessione #69*

---

## COLD OPEN

Una cartella clinica non mente. Non può — è fatta di log, timestamp, stati booleani. Eppure per sette notti consecutive ha scritto che la corsia Nina era funzionante. Tre episodi in coda, etichettati `bozza_verde`, promossi settimane prima. Il sistema controllava il tetto del backlog — `6 >= 6`, falso positivo — e si fermava. Credeva a se stesso. Credeva a un numero sbagliato.

Fuori dalla taverna è luglio. Dentro, 23:14. Matteo ha la sessione aperta davanti e una lista di fix che non sono nuove funzionalità: sono autopsie.

---

## ATTO I — La Coda Stale

Sette notti.

Non è un numero drammatico se non capisci cosa significa: per sette cicli notturni, il `story_agent` di Nina ha visto la coda piena e si è fermato prima di produrre. `EP_N2_04`, `EP_N2_05`, `EP_N2_06` — tre episodi con stato `bozza_verde` nel database, benché promossi da tempo. Il contatore del backlog leggeva sei slot occupati. Il tetto era sei. Blocco.

Il bug era silenzioso nel modo peggiore: nessun errore, nessun crash, nessun allarme rosso nella cartella clinica. Il sistema funzionava — eseguiva il ciclo notturno, scriveva i commit automatici, aggiornava i vettori. Faceva tutto tranne la cosa per cui era stato costruito quella settimana: generare.

Quattro episodi persi nel buio.

Il fix era chirurgico: `audit_episodes` usava un match per titolo per verificare quali episodi esistessero già nel RAG. Se il titolo cambiava di un carattere — una maiuscola, uno spazio — l'episodio risultava orfano o duplicato. Lo `story_agent` riciclava l'identificatore `Episodio 69` su contenuti diversi. Il contatore saliva. Il backlog reale era tre, non sei.

Rimosso il match per titolo. Backlog reale: `6 → 3`. Corsia Nina: sbloccata. Totale episodi: `252 → 256`, zero orfani.

Non è una vittoria rumorosa. È la rimozione di un errore silenzioso che durava da una settimana.

---

## ATTO II — Le Cinque Bugie di MIMS

Matteo trova il problema di verità nel mezzo dell'audit.

Non è un crash. Non è un 503. È qualcosa di più sottile e, in un certo senso, più grave: in cinque episodi su otto recenti, MIMS viene descritto come un sistema software, un agente AI, un modulo cognitivo. In un caso viene inventato persino un acronimo. 

MIMS è meccanica. Connettori fisici. Tiles 190×190 millimetri in PA-GF30. Un sistema di giunzione modulare per pannelli che ancora non esiste — che è il *prossimo* progetto, dopo che caroselli ed ecosistema saranno in piedi. Non ha righe di codice. Non ha endpoint. Non ha un vettore nel ChromaDB.

Il sistema stava raccontando una storia parallela, coerente con se stessa, completamente sbagliata.

La radice: `nina_agent` nella fase `stage1_architect` non riceveva le definizioni dei pilastri. Generava senza contesto canonico, e colmava il vuoto con inferenza. L'inferenza leggeva "MIMS" nell'archivio, trovava pattern vicini ad altri sistemi software del progetto, costruiva una descrizione plausibile. Plausibile e falsa.

Il fix: il canone viene iniettato prima dell'architettura dell'episodio, non dopo. La contaminazione si ferma.

Ma Matteo ritira anche due suoi errori mentre fa l'audit.

Il primo: aveva scritto che la paginazione ChromaDB risolveva il 503. Non lo risolve. Il problema è un segmento HNSW incoerente — `limit=10` restituisce zero embedding. La cura è `rag_recover --drop-hnsw`, un'operazione che richiede una decisione manuale. Non un parametro, non un agente: un click. Scritto nel log, non nascosto.

Il secondo: nell'episodio #68 aveva segnalato 101 `bare-except` nel codice. L'audit li ritrova: uno solo, nel codice proprio. Gli altri erano nei wrapper di librerie esterne. Numero sbagliato per un ordine di grandezza. Anche questo nel log.

Ci vuole un tipo preciso di rigore per correggere se stesso con la stessa voce con cui corregge il sistema.

---

## ATTO III — Il Rumore delle Critiche

Dieci critiche a notte in meno.

Non sembra molto finché non moltiplichi per sette notti e ti ricordi che ogni critica falsa è un segnale che oscura quelli reali. Il night_audit produceva alert su `organi_vivi` — un campo del grafo interno che tiene traccia di componenti attivi. Il SYSTEM_PROMPT non conteneva la definizione: età in giorni dall'ultima attività. Il sistema non capiva cosa stava guardando e segnalava anomalie su valori normali.

Aggiunta la legenda al prompt. Dieci critiche sparite.

Il warning HF — Hugging Face, il modello di embedding — generava un messaggio a ogni inferenza, finiva nei log, veniva letto dall'audit come un evento degradato. Spostato nel vault. Silenzio.

La cartella clinica di questa notte — quella del 28 luglio — è più corta delle precedenti. Meno righe, meno alert. Non perché il sistema stia peggio: perché sta leggendo meglio se stesso.

Poi c'è la vista RETE, nella dashboard React. Sorgente SISTEMA: riparata. Quattro endpoint mancavano dal proxy — le richieste tornavano con l'`index.html` invece dei dati, e il frontend non aveva modo di distinguere un 200 vuoto da un 200 con contenuto. Quattro righe nel proxy. Vista funzionante.

E `nina_agent max_tokens`: `4000 → 8000`. I primi quattro episodi della serie N2 si troncavano a metà. L'open-loop finale — la parte narrativa che tiene aperta la tensione tra un episodio e il prossimo — spariva nel silenzio di un buffer troppo piccolo. Nessuno se n'era accorto perché gli episodi sembravano completi. Erano solo corti.

---

## CHIUSURA

Sessione #69 non ha prodotto nulla di nuovo. Ha fermato cinque cose che andavano nella direzione sbagliata e ha corretto tre numeri errati — due dei quali erano di Matteo.

C'è qualcosa di preciso in questo tipo di lavoro che è difficile da raccontare senza farlo sembrare meno di quello che è. Non aggiunge features. Non avanza percentuali di completamento. Non genera contenuto. Rimuove errori che il sistema usava per costruire se stesso.

MIMS è meccanica. Questo ora è nel canone, iniettato prima che gli agenti inizino a scrivere. La prossima volta che il RAG trova "MIMS" e prova a inferire, trova la definizione corretta prima dell'inferenza.

Il sistema cognitivo che racconta V32 e GENESIS non può permettersi di inventare. Non perché sia un problema estetico — perché è il sistema che Matteo userà per prendere decisioni reali su metallo, su geometrie, su cilindri e piani premente. Se il RAG contamina il canone, le decisioni diventano rumore.

Fuori è ancora luglio. Il capannone è fermo al 2030. Dentro, `252 → 256`, `4000 → 8000`, `6 → 3`.

I numeri giusti, finalmente, al posto giusto.

---

## reel_hook

256 episodi nel sistema. Per una settimana, 4 non esistevano — il contatore del backlog leggeva 6 su 6 e si bloccava. Backlog reale: 3. Nel frattempo, MIMS veniva descritto come software AI in 5 episodi su 8. MIMS è alluminio e PA-GF30 — non ha un endpoint. Quando un sistema impara a raccontarsi, la prima cosa che sbaglia è se stesso.

---

## FATTI (per il RAG)

- **DECISIONE:** `nina_agent max_tokens` portato da 4000 a 8000 token — gli episodi serie N2 si troncavano eliminando l'open-loop finale
- **LOGICA:** buffer insufficiente su episodi lunghi; il troncamento non generava errore, l'output sembrava valido ma era incompleto
- **DECISIONE:** match per titolo rimosso da `audit_episodes`; backlog reale corretto da 6 a 3; corsia Nina sbloccata dopo 7 notti; totale episodi 252 → 256, 0 orfani
- **LOGICA:** lo stato `bozza_verde` su EP_N2_04/05/06 non veniva aggiornato al momento della promozione; il tetto `6 >= 6` bloccava la generazione senza errore esplicito
- **DECISIONE:** canone MIMS iniettato in `stage1_architect` prima della generazione — MIMS = sistema modulare di connettori fisici, tiles 190×190 PA-GF30, progetto post-caroselli/ecosistema; NON software/AI
- **LOGICA:** `nina_agent` senza definizioni dei pilastri inferiva da pattern adiacenti nel RAG; 5 episodi su 8 recenti descrivevano MIMS come modulo cognitivo
- **OBIETTIVO:** zero contaminazione canone MIMS nei prossimi episodi; `rag_recover --drop-hnsw` resta azione manuale (click Matteo) — non automatizzabile senza rischio perdita vettori

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E70 |
| **Data** | 2026-07-28 |
| **Sessione** | #69 |
| **Progetto principale** | GENESIS |
| **Sotto-sistema** | nina_agent / audit / canone |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Tag narrativo** | debug, canone, verità, sistema cognitivo |
| **File** | `EP_20260728_cinque_bugie_sistema.md` |