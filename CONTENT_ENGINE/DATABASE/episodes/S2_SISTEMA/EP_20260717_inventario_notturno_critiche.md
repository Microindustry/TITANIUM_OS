# TITANIUM_OS · S2 · Episodio 65
## "Il Muro è Fuori"

*17 luglio 2026 — GENESIS 70% — V32 65%*

---

## COLD OPEN

Notte alta. Nessuna finestra aperta nella taverna da 12 m².

Sul monitor: otto righe verdi, tutte con la stessa parola — *healthy*. Otto container Docker, ognuno al suo posto, ognuno che risponde. L'UI è su `localhost:4007`. L'admin esiste. L'app LinkedIn `microindustry-postiz` ha un ID, ha un Client Secret, ha due redirect URI accettati. La configurazione è verificata. Il codice è corretto.

E però non si connette.

Non per un bug. Non per un errore di Matteo. Per una richiesta di approvazione che giace in un ufficio di San Francisco — o forse in un data center, forse in una coda automatizzata — in attesa che qualcuno con accesso alla Community Management API decida di rispondere.

Il log del terminale dice: `BLOCCO`.

Il sistema lo scrive senza drammi, come scrive tutto il resto.

---

## ATTO I — Otto Container Sani

Ci sono volute ore per arrivare qui.

Docker Desktop 4.82. Stack Postiz self-hosted. Otto container avviati in sequenza, ognuno verificato uno per uno: il database, il broker, il worker, il proxy, il frontend. Quando l'ultimo è diventato verde, Matteo ha guardato la schermata di Docker Desktop — quella griglia di stati — e per un momento sembrava quasi semplice. Come se bastasse questo: scaricare un'immagine, configurare un compose, aspettare.

Ma prima c'era stato il redirect URI.

L'errore era apparso la prima volta che aveva tentato l'autenticazione OAuth con LinkedIn: `redirect_uri mismatch`. Classico. Il tipo di errore che sembra idiota solo dopo che l'hai risolto — prima ti mangia un'ora di debug, ti fa controllare ogni stringa, ogni slash finale, ogni carattere in più. Due URI aggiunti alla lista degli autorizzati nell'app `microindustry-postiz` (ID app: 247572507, collegata alla Pagina `microindustry` con ID 136056455). Client ID e Client Secret nel compose. Prodotti OAuth abilitati: Sign-In with OIDC, Share on LinkedIn.

Errore risolto. Stack funzionante. UI raggiungibile.

E poi il sistema si è fermato davanti a un muro che non era suo.

---

## ATTO II — Lo Scope che Non Esiste (Ancora)

La connessione a una Pagina LinkedIn — non un profilo personale, una *Pagina* — richiede scope specifici: `w_organization_social`, `r_organization_social`, `rw_organization_admin`. Questi scope appartengono alla **Community Management API** di LinkedIn. Non sono disponibili per default. Non si sbloccano cambiando configurazione. Non si sbloccano aspettando.

Si richiedono. E poi si aspetta che LinkedIn risponda.

Matteo ha verificato tutto quello che era verificabile dalla sua parte: la Pagina `microindustry` esiste, l'app è collegata, i prodotti base sono concessi. La configurazione è corretta — non c'è niente da sistemare lì dentro. Il blocco non è un bug. È una coda burocratica esterna, una richiesta di approvazione che adesso vive nei sistemi di LinkedIn e non in quelli della taverna.

Questo è un tipo di blocco diverso da quelli abituali.

Quando V32 si blocca, Matteo può prendere un attrezzo e fare qualcosa. Quando GENESIS si blocca su un algoritmo, può aprire un file e modificarlo. Quando VULCAN si blocca su una geometria, può ridisegnare. Ma quando il blocco è un'entità esterna che deve rispondere — una piattaforma, un'API, un processo di approvazione — non c'è niente da fare tranne aspettare.

Lo stack è stato fermato per la notte. Non perché fosse rotto. Per liberare RAM alle GPU che lavorano nelle ore buie.

Una decisione pragmatica. Il sistema non aspetta: se non può avanzare da un lato, avanza dagli altri.

---

## ATTO III — La Notte che Lavora da Sola

Tre commit nella stessa notte.

Il primo: `auto: inventario notturno + critiche`. Il secondo: `auto: night_audit - cartella clinica 17/07/2026`. Il terzo: `auto: story_agent - episodi generati 17/07/2026`.

Nessuno di questi lo ha scritto Matteo — non nel senso che si siede e digita. Li ha costruiti mesi fa, pezzo per pezzo, finché il sistema non ha imparato a eseguirli da solo nell'orario che Matteo dorme. È uno degli aspetti di GENESIS che sembra strano finché non diventa normale: il sistema ha un ritmo circadiano. Di giorno lavora con Matteo. Di notte consolida, audita, genera.

L'episodio di questa notte viene generato da `story_agent.py` — un file che Matteo ha modificato oggi stesso. Il sistema scrive storie sui suoi progressi, poi le legge per diventare più informato. Un loop che si chiude su sé stesso, ogni notte, silenziosamente.

Fuori dalla taverna non lo sa nessuno. Dentro, otto container dormono spenti per risparmiare RAM, e il night audit processa quello che è stato fatto, e da qualche parte in California una richiesta API aspetta risposta.

Il log dice `BLOCCO`. Ma il sistema continua lo stesso.

Questo è GENESIS al 70%.

---

## CHIUSURA

C'è una differenza tra un blocco che viene da dentro e uno che viene da fuori.

I blocchi interni — un bug, una quota sbagliata, un algoritmo che non converge — hanno una soluzione che dipende da Matteo. Li puoi aggredire, tornare alle due di notte, riaprire il codice. I blocchi esterni hanno un'altra geometria: esistono in un sistema che non controlli, in una timeline che non è la tua, in una decisione presa da qualcuno che non conosce la taverna da 12 m² né quello che ci viene costruito dentro.

La risposta giusta a un blocco esterno non è lavorarci più a lungo. È documentarlo, fermare lo stack, liberare le risorse per quello che *puoi* fare, e aspettare senza smettere di muoversi altrove.

Postiz è vivo. La configurazione è corretta. Il muro è fuori.

Quando LinkedIn risponde, lo stack riparte.

---

## reel_hook

8 container Docker, tutti *healthy*, UI su `localhost:4007` — stack Postiz costruito da zero in una sessione.

Il problema non è nel codice. Non è nella configurazione. È in una richiesta di approvazione API che adesso dorme in una coda di LinkedIn.

Config verificata. Blocco documentato. Stack spento per liberare RAM alle GPU notturne.

Il sistema aspetta. Ma non si ferma.

---

## FATTI (per il RAG)

- **DECISIONE:** Postiz self-hosted montato su Docker Desktop 4.82, 8 container verificati healthy, UI raggiungibile su `localhost:4007`, admin creato — sessione #65 completata sul lato infrastruttura.
- **LOGICA:** Stack self-hosted scelto per controllo totale dei dati e indipendenza da piani SaaS; configurazione OAuth app LinkedIn `microindustry-postiz` (ID 247572507) collegata a Pagina `microindustry` (ID 136056455) con Client ID/Secret nel compose.
- **DECISIONE:** Errore `redirect_uri mismatch` risolto aggiungendo 2 URI autorizzati nell'app LinkedIn; prodotti Sign-In OIDC + Share on LinkedIn concessi.
- **LOGICA:** La connessione a Pagine LinkedIn (non profili personali) richiede scope `w_organization_social`, `r_organization_social`, `rw_organization_admin` — disponibili solo tramite Community Management API, non abilitabili lato utente.
- **OBIETTIVO:** Sblocco dipende da approvazione LinkedIn Community Management API (richiesta inviata, in attesa); al rilascio, riavviare lo stack e completare connessione Pagina — questo abilita la pipeline di pubblicazione automatica da GENESIS verso LinkedIn.
- **DECISIONE:** Stack spento a fine sessione per liberare RAM GPU durante ciclo notturno; `story_agent.py` modificato nella stessa giornata, confermando loop RAG attivo.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E65 |
| **Data** | 2026-07-17 |
| **Progetto principale** | GENESIS |
| **Sottosistema** | Postiz / LinkedIn OAuth |
| **Stato milestone** | BLOCCATO (esterno) — infrastruttura verificata |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Tag** | `docker` `oauth` `linkedin` `postiz` `blocco-esterno` `night-audit` |
| **Prossimo trigger** | Approvazione LinkedIn Community Management API |