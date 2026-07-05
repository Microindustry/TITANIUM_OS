<!-- TOC -->

- [TITANIUM_OS  Episodio N2.04](#titaniumos-episodio-n204)
  - [Il Giorno dellEsercito](#il-giorno-dellesercito)
  - [COLD OPEN](#cold-open)
  - [ATTO I  LESERCITO](#atto-i-lesercito)
  - [ATTO II  SEDICI ORE DI CHIRURGIA](#atto-ii-sedici-ore-di-chirurgia)
  - [ATTO III  QUELLO CHE RIMANE](#atto-iii-quello-che-rimane)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio N2.04
## "Il Giorno dell'Esercito"
*4 luglio 2026*

---

## COLD OPEN

Le 23:47. Il terminale scorre.

`auto: night_audit - cartella clinica 04/07/2026`

Fuori è il 4 luglio. In America festeggiano l'indipendenza. Matteo ha passato le ultime sedici ore a fare una cosa diversa: ha smontato il suo sistema pezzo per pezzo, ha chiamato sette specialisti immaginari a guardare dentro, e ha lasciato che dicessero tutto quello che non funzionava.

Non è una festa. È un'autopsia su qualcosa che respira ancora.

---

## ATTO I — L'ESERCITO

Due giorni prima, il 2 luglio, Matteo aveva avviato qualcosa che nel sistema si chiama ATTACCO ESERCITO.

Il nome è preciso. Non è una review. Non è un audit. È sette agenti specializzati — design, sicurezza, scrittura, software, news-IA, gestionale, integrità-RAG — che entrano nel corpus di GENESIS con un mandato unico: trovare dove il sistema mente a sé stesso.

Il risultato era arrivato pulito, senza abbellimenti. Tre punti in cui **la fonte di verità è stantia**:

1. Il canone RAG — `_CANONE.md` riga 13 — descriveva V32 come "su molle / recuperato". Sbagliato. Vietato per regola di canone, eppure era lì, scritto, e il RAG lo recuperava.
2. `INDICE_CAMMINO`: 9 titoli su 15 sbagliati. Il sistema navigava con una mappa errata.
3. Il pitch aveva tre errori. Tre.

E poi c'era il punto quattro, che non era un errore di codice: un ordine hardware — Vevor, pinza ER20, UPS — tra 250 e 350 euro. Un acquisto che sblocca la catena economica intera e risolve le corruzioni HNSW. Non committato perché non si può committare un ordine. Quel punto era in mano a Matteo, non al sistema.

La sintesi coordinata era finita in `_SINTESI.md`. Tutte le azioni — TOP 10 più il backlog completo, quarantanove voci — erano finite in `DA_FARE_FATTO.md` come caselle vuote. Niente codice-proposta committato: gate `SELF_IMPROVE` chiuso. Il sistema propone, Matteo decide.

Era il 3 luglio sera. La lista era lunga. Il 4 luglio sarebbe stato il giorno di svuotarla.

---

## ATTO II — SEDICI ORE DI CHIRURGIA

Il 4 luglio comincia con la CSS.

Non è glamour. `nl-fadeUp` era globale solo in teoria — quattro view animavano "a fortuna", ognuna con la sua logica. La correzione è netta: animazione unificata, `prefers-reduced-motion` aggiunto, contrasto `slate-600/700` alzato alla soglia WCAG verificata con screenshot. Due regole CSS invalide rimosse. Il template dei caroselli — `tokens.css` come fonte di verità, `carosello_base.html` come standard — diventa canonico. I nomi file diventano `carosello.html` fisso: gli script se lo aspettavano già, nessuno lo aveva mai scritto come regola.

Poi arriva la sicurezza.

EVA — il sistema WhatsApp per il centro estetico di Maria — girava con il bind aperto. Un'API esposta con dati PII clienti. La correzione è `bind 127.0.0.1` come default, `EVA_BIND` variabile per il tunnel esterno. L'endpoint `/inbox` riceve `X-API-Key` con logica fail-closed da remoto. `APP_SECRET` obbligatorio in `LIVE` — se manca, il sistema non parte. Il dry-run resta invariato: non si rompe niente in sviluppo, si chiude tutto in produzione.

Poi arriva il RAG.

Il problema si chiamava commit-leak: quando un import del RAG falliva sotto carico, il sistema riprovava in loop — ogni richiesta ricominciava da capo, martellando il ChromaDB. La cura non è un retry più intelligente. La cura è alla radice: lock più failure-latch da 300 secondi sui tre punti di import per-request nell'`api_server`. Un fallimento si ferma, aspetta, non si moltiplica. Attivo dal prossimo restart API — quello notturno.

Nel mezzo, la pulizia. Indirizzi IP fuori dal repo pubblico — `VULCAN_MANIFESTO`, `mims_protocol`, `fit-park-specs` spostati in `MENTE`. Restano nella history git: da valutare `filter-repo` con Matteo. Un file vuoto chiamato `perfetta` era tracciato. Rimosso.

Le exclusions RAG: `ASSOLUTO/VERSIONI`, `ARCHIVIO`, `ARCHIVE_V6` esclusi dall'indice. 441 file diventano 388. Il rebuild-hard verificato. L'`INDICE_CAMMINO` — quello con 9 titoli sbagliati su 15 — viene rigenerato da `episodes.json`. 52 caselle, tutte vere. Mai più titoli scaduti.

E poi `nina_rag_loop`.

La versione 1.0 aveva due bug silenziosi. Il primo: lost-update sullo stato — `agent.generate` scriveva `last_generated`, `run()` salvava una versione vecchia sopra. Il secondo: deadlock a fine giro, quando il ciclo cercava di acquisire un lock che aveva già. La v1.1 è chirurgica: `run()` ricarica lo stato prima di salvare. Il deadlock sparisce. Nina — il generatore di episodi — smette di girare in tondo.

L'ultimo pezzo è la catena narrativa. EP_N2_03 "Dove siamo" era sganciato — l'open-loop dal secondo episodio non agganciava il terzo, le Pietre non venivano richiamate. Riagganciato. EP_N2_51 e EP_N2_52 archiviati: erano doppioni della lezione EP_N2_08, nati dai semi gemelli EP_AV_02 e EP_AV_02_2. La guardia anti-gemelli entra in `nina_rag_loop`: una sola rigenerazione per regione per giro. Dry-run verificato. Gli indici rigenerati: 50 caselle.

Le 23:47. Il terminale scorre: `auto: night_audit`.

---

## ATTO III — QUELLO CHE RIMANE

Di quarantanove voci, una è rimasta aperta.

Non per dimenticanza. Per architettura. L'ordine hardware — Vevor, pinza ER20, UPS, 250-350 euro — sblocca la catena economica e risolve le corruzioni HNSW di ChromaDB. Ma nessun agente può ordinarlo. Nessun commit può comprarlo. Quel punto è sulla lista di Matteo, non del sistema.

È la distinzione più onesta che esiste in TITANIUM_OS: il sistema può trovare, proporre, correggere, costruire strutture. Non può decidere dove va il denaro. Quella linea non si sposta.

Ci sono anche le cose che il giorno non ha toccato. Il carosello EP_N2_03 è ancora da fare. Il canone RAG riga 13 è stato identificato come sbagliato — ma la correzione del testo non è negli undici commit di oggi. Resta in `DA_FARE_FATTO.md`, casella ancora vuota.

Non è una sconfitta. È un inventario onesto.

V32 è al 65%. GENESIS è al 70%. L'esercito è rientrato con i referti. La chirurgia è stata fatta. Il sistema che gira domani mattina sa dove si trova, cosa può fidarsi di sé stesso e cosa no.

È diverso da come era stamattina.

---

## CHIUSURA

C'è una cosa strana nel chiamare sette specialisti a trovare i tuoi errori: non ti senti attaccato. Ti senti visto.

Il sistema aveva una mappa sbagliata. Navigava con 9 titoli falsi su 15. EVA era aperta. Nina girava in loop. Il RAG si moltiplicava sotto carico. Nessuno di questi problemi era visibile dall'esterno — il sistema funzionava, nel senso che rispondeva, generava, non crashava.

Funzionare e essere affidabile sono due cose diverse.

Oggi Matteo ha lavorato sulla seconda. Non è la parte che si vede. È la parte che regge tutto il resto.

---

## reel_hook

441 file nel RAG. 53 erano archivi che il sistema continuava a interrogare — versioni morte, doppioni, storia che il presente non doveva più leggere.
Oggi sono diventati 388.
Non è una pulizia. È la differenza tra un sistema che si ricorda di tutto e uno che sa cosa gli serve sapere.
Il prossimo restart API porta con sé un lock che prima non c'era. Nessuno lo vedrà — ma la prossima volta che ChromaDB viene martellato, si fermerà invece di moltiplicarsi.
L'ordine hardware è ancora sulla lista. Quello lo decide Matteo.

---

## FATTI (per il RAG)

- DECISIONE: RAG exclusions impostate su ASSOLUTO/VERSIONI + ARCHIVIO + ARCHIVE_V6 — corpus ridotto da 441 a 388 file, rebuild-hard verificato.
- LOGICA: I file archiviati venivano interrogati al pari del corpus attivo, inquinando il retrieval con contenuti obsoleti e aumentando il carico HNSW inutilmente.
- DECISIONE: failure-latch 300s + lock sui 3 punti di import per-request in api_server (guardia RAG) — attivo dal prossimo restart notturno.
- LOGICA: Import falliti sotto carico si moltiplicavano in loop per-request (commit-leak); il latch blocca la cascata alla radice invece di gestire ogni retry singolarmente.
- DECISIONE: nina_rag_loop v1.1 — run() ricarica stato prima di salvare; rimosso deadlock fine-giro su lock già acquisito.
- LOGICA: lost-update silenzioso: agent.generate scriveva last_generated, run() sovrascriveva con versione precedente al salvataggio; il deadlock bloccava il ciclo senza errore esplicito.
- DECISIONE: INDICE_CAMMINO rigenerato da episodes.json — 52 caselle, 9/15 titoli precedenti erano sbagliati.
- LOGICA: L'indice era mantenuto a mano e non sincronizzato con lo stato reale degli episodi; la generazione automatica da episodes.json elimina il disallineamento strutturalmente.
- DECISIONE: EVA hardening — bind 127.0.0.1 default, /inbox con X-API-Key fail-closed, APP_SECRET obbligatorio in LIVE.
- LOGICA: API esposta con dati PII clienti centro estetico; fail-closed garantisce che una configurazione incompleta non vada mai in produzione.
- OBIETTIVO: Ordine hardware Vevor + ER20 + UPS