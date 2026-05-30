<!-- TOC -->

- [TITANIUM_OS  S1E08](#titaniumos-s1e08)
  - [Il Sistema Che Si Ricorda di Sé](#il-sistema-che-si-ricorda-di-sé)
  - [COLD OPEN](#cold-open)
  - [ATTO I  LARCHIVIO CHE CAMMINA](#atto-i-larchivio-che-cammina)
  - [ATTO II  ASSOLUTO V7, O DEL DOCUMENTO CHE NON DOVREBBE ESISTERE](#atto-ii-assoluto-v7-o-del-documento-che-non-dovrebbe-esistere)
  - [ATTO III  CTRLK E IL PROBLEMA DEL CONTESTO](#atto-iii-ctrlk-e-il-problema-del-contesto)
  - [CHIUSURA  SESSIONE 8, GIT DIRTY, 150 CHUNK](#chiusura-sessione-8-git-dirty-150-chunk)
  - [REEL HOOK](#reel-hook)
  - [METADATI EPISODIO](#metadati-episodio)

<!-- /TOC -->

# TITANIUM_OS — S1E08
## "Il Sistema Che Si Ricorda di Sé"

*2026-05-27 — Una taverna da 12 m², un commit repository, e il momento in cui una macchina smette di essere un elenco di file*

---

## COLD OPEN

Ore 23:14. Lo schermo mostra un terminale con diciassette righe verdi che scorrono verso l'alto.

Non è codice nuovo. È il sistema che legge sé stesso — `STATE.json`, sessione #8, RAG a 150 chunk — e genera un documento che descrive dove è, cosa sa, cosa deve fare domani mattina. Nessuno ha scritto questo testo. È emerso da un grafo di decisioni prese in settimane diverse, da note tecniche su colonne d'acciaio e specifiche di masse, da commit firmati alle 2 di notte.

Sul tavolo accanto al laptop: un disegno tecnico con una nota a mano. *"gusset 200mm — colonna Z sinistra."*

Il sistema sa anche quello.

---

## ATTO I — L'ARCHIVIO CHE CAMMINA

C'è un problema che nessuno ti dice quando costruisci qualcosa di complesso da solo.

Non è la mancanza di soldi, né di spazio, né di strumenti. È che **la memoria è un collo di bottiglia biologico.** Ogni sessione di lavoro parte da zero — o quasi. Rileggi gli appunti, ricerchi le spec, ricordi perché avevi deciso *quella* cosa invece di *quest'altra*. Trenta minuti di overhead cognitivo prima di toccare qualsiasi attrezzo fisico o scrivere una riga di codice.

Matteo lo sa dal 2024. Ogni volta che si siede davanti al V32 o apre il repository, c'è questa frazione di secondo in cui il progetto è di nuovo nebbia.

GENESIS nasce anche per questo. Non solo come dashboard, non solo come RAG su ChromaDB — come **sistema di continuità cognitiva.** Un'entità che ricorda le decisioni, le logiche dietro le decisioni, le specifiche che sono cambiate e perché.

Il 27 maggio 2026, quella visione diventa eseguibile.

`SERVICES/watchdog.py` — processo che monitora i servizi e li riavvia se cadono. `scheduler.py` — orchestratore che sa quando fare cosa. `titanium_mcp_server.py` — cinque tools che espongono il sistema a Claude in modo strutturato: stato corrente, sessioni, chunk RAG, brief giornaliero.

La pipeline è: **lavori → scrivi → il sistema legge → il sistema ricorda → tu ricominci sapendo.**

Sessione #8. RAG: 150 chunk. Non sono numeri di performance. Sono la misura di quanto il progetto sa di sé stesso.

---

## ATTO II — ASSOLUTO V7, O DEL DOCUMENTO CHE NON DOVREBBE ESISTERE

C'è una tensione sottile in ogni progetto complesso tra documentazione e velocità.

Documentare troppo è teatro. Ti convinci di lavorare mentre stai solo descrivendo il lavoro. Non documentare abbastanza significa che ogni decisione è volatile — esiste solo nella RAM biologica del momento in cui è stata presa.

`ASSOLUTO_V7.md` è il tentativo di trovare quel punto di equilibrio.

Dieci atti. Un file singolo. Tutto il progetto — V32, GENESIS, MIMS, IDENTITY, EVA — compresso in un documento master che può generare un PDF. Non è un wiki. Non è un README. È più vicino a un **atto notarile di ciò che è stato deciso** — con la logica, con le spec, con i numeri veri.

**178 kg.** Corpo unico. Il dato che era scritto in modo ambiguo — *"distinzione molle"* — è stato eliminato. V32 pesa 178 kg, stop. La massa è quella. Il corpo è uno. Non c'è versione alternativa da considerare.

Questo tipo di pulizia documentale sembra banale. Non lo è. Ogni ambiguità in una spec tecnica è una potenziale ora persa in una decisione futura. Quando stai saldando gusset da 200mm su una colonna Z a mezzanotte, non vuoi rileggere tre versioni di un documento per capire se la massa è giusta.

ASSOLUTO V7 dice: questa è la realtà del progetto. Tutto il resto è storia.

Il PDF generatore è l'ultimo pezzo — perché alcune cose devono esistere anche offline, anche stampate, anche quando il server è giù.

---

## ATTO III — CTRL+K E IL PROBLEMA DEL CONTESTO

La dashboard era già arrivata alla v5.0. Funzionava. Mostrava i dati.

Ma ogni volta che Matteo apriva il browser, doveva sapere già cosa cercare. La dashboard rispondeva — non suggeriva, non orientava, non dava il brief della situazione.

**v5.1:** CommandBar. `Ctrl+K`. Un overlay che si apre, che porta in cinque viste, che permette di editare inline lo stato — `next_step`, `focus_today`, `blocker` — senza passare per il file system. Senza aprire un editor. Senza rompere il flusso.

Il fix critico in questa versione: le chiamate hardcoded a `http://localhost:5001` sono sparite. Il CommandBar usa path relativi. Significa che il sistema funziona indipendentemente da dove gira — laptop, server locale, eventualmente qualcosa di più permanente.

**v5.2:** `PillarProgressStrip` — quattro barre sotto l'header. V32, GENESIS, IDENTITY, MIMS. Percentuali. Numeri. Non stime di mood, non "stiamo progredendo bene" — barre concrete che dicono quanto è completato ogni pilastro del progetto.

Più `QuickLinks`, più `START_GETAC v2` — l'avvio del Getac, il tablet industriale che Matteo usa sul V32, integrato nel flusso della dashboard.

C'è una cosa che questi due aggiornamenti dicono insieme: **il sistema deve portarti al lavoro, non distrarti dal lavoro.** `Ctrl+K` apre il contesto. Le barre mostrano la posizione. `START_GETAC` mette lo strumento in mano.

Poi vai a saldare.

---

## CHIUSURA — SESSIONE #8, GIT DIRTY, 150 CHUNK

Il file di riavvio sessione del 29 maggio dice: *"⚠ dirty."*

Non è un errore. È lo stato reale del repository — ci sono modifiche non ancora committate. Il sistema è onesto abbastanza da dirlo.

Questo è quello che GENESIS è diventato il 27 maggio: un sistema abbastanza maturo da avere uno stato, da saperlo leggere, da comunicarlo al prossimo avvio. Non è intelligente nel senso che la parola evoca nei titoli di giornale. È qualcosa di più utile: è **affidabile nel ricordare.**

Sessione #8. La prossima inizierà sapendo che il milestone attivo è Config G. Che il passo è saldare quattro gusset da 200mm sulla colonna Z sinistra. Che la massa del V32 è 178 kg, corpo unico, nessuna ambiguità.

Matteo si siederà, leggerà il brief, prenderà il Getac, e andrà giù in taverna.

Il sistema avrà già fatto il lavoro di ricordare.

Lui può fare il lavoro di costruire.

---

## REEL HOOK

> 150 chunk di memoria distribuita su un RAG ChromaDB. Dieci atti in un documento master. Quattro barre di progresso che non mentono.
>
> Il problema non era la complessità — era che ogni sessione ricominciava da zero.
>
> Allora ho costruito un sistema che ricorda al posto mio.
>
> `Ctrl+K`. Brief. Getac. Taverna. Lavoro.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E08 |
| **Data registrazione** | 2026-05-27 |
| **Titolo** | Il Sistema Che Si Ricorda di Sé |
| **Progetto primario** | GENESIS |
| **Progetto secondario** | V32 / ASSOLUTO |
| **Milestone** | Config G — Rinforzi colonne Z+U |
| **Commit chiave** | GENESIS stack MCP, Dashboard v5.2, ASSOLUTO V7 |
| **Dati tecnici** | 178 kg corpo unico, 150 chunk RAG, sessione #8, 5 MCP tools |
| **Stato repository** | dirty (modifiche non committate al 29/05) |
| **Angolo narrativo** | Continuità cognitiva — il sistema come memoria esterna |
| **Tono** | Tecnico-personale, nessuna retorica |
| **Tag** | `#GENESIS` `#DASHBOARD` `#RAG` `#MCP` `#ASSOLUTO` `#V32` |
| **Prossimo episodio** | Config G — I gusset da 200mm, il ferro vero |