<!-- TOC -->

- [EP_AUTO_46  Milestone](#epauto46-milestone)
    - [Sicurezza: token GitHub ruotato  auth git via gh keyring, z](#sicurezza-token-github-ruotato-auth-git-via-gh-keyring-z)
- [IL SISTEMA  Episodio: Chiavi](#il-sistema-episodio-chiavi)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il problema che non vedi finché non lo vedi](#atto-i-il-problema-che-non-vedi-finché-non-lo-vedi)
  - [ATTO II  Rotazione, non riparazione](#atto-ii-rotazione-non-riparazione)
  - [ATTO III  Cosa cambia adesso](#atto-iii-cosa-cambia-adesso)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_46 — Milestone
### "Sicurezza: token GitHub ruotato — auth git via gh keyring, z"

---
id: EP_AUTO_46
title: "Sicurezza: token GitHub ruotato — auth git via gh "
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-06-03
data_generato: 2026-06-03
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Sicurezza: token GitHub ruotato — auth git via gh keyring, zero segreti in chiaro, vecchio gho_ revocato (03/06/2026)"
---

# IL SISTEMA — Episodio: Chiavi

---

## COLD OPEN

L'episodio scorso ho chiuso con 6.497 chunk. Il sistema sapeva dove stava. Bene. Ma sapere dove stai non serve a niente se qualcun altro può entrare dalla porta sul retro mentre tu stai costruendo. Oggi parliamo di porte. E di come le ho chiuse.

---

## ATTO I — Il problema che non vedi finché non lo vedi

Nella LEX_DIGITALIS — che è il documento che governa come scrivo codice in TITANIUM_OS, dalle istruzioni per i relay della V32 fino alle chiamate API di EVA — c'è una regola scritta in grassetto: zero segreti in chiaro. Zero. La regola esiste perché l'ho messa io, e l'ho messa io perché so cosa succede quando non c'è. Non è teoria. È la differenza tra un sistema che hai costruito e un sistema che appartiene a chiunque riesca a leggere un file di testo.

Il principio si chiama Zero-Trust. In pratica significa: niente API key nel codice, niente token hardcoded, niente password in un file di configurazione che finisce in un repository. Tutto passa da variabili d'ambiente. In Python è `os.getenv('OPENAI_API_KEY')`. In C++ sul firmware della V32 è una costante caricata da un header che non entra mai nel versioning. Non è complicato. È disciplina.

Il problema è che la disciplina ha una data di inizio. E prima di quella data, ci sono le scelte fatte di fretta, i token creati alle undici di sera perché dovevi pushare qualcosa, le chiavi generate e copiate nel posto sbagliato perché "tanto lo sistemo dopo". Il dopo era arrivato.

Nel log di setup di TITANIUM_OS c'era un token GitHub che iniziava con `gho_`. Vecchio formato. Generato mesi fa, probabilmente quando stavo configurando l'accesso al repository principale del sistema. Quel token aveva vissuto troppo. Troppo a lungo nello stesso posto, con le stesse autorizzazioni, senza rotazione. In un sistema che gestisce firmware CNC, automazioni industriali e dati di un centro estetico attivo, un token GitHub compromesso non è un problema informatico astratto. È la chiave del magazzino.

---

## ATTO II — Rotazione, non riparazione

Il 3 giugno 2026 ho fatto la cosa semplice: ho revocato il vecchio token e ne ho generato uno nuovo.

Semplice da dire. Meno semplice da fare bene.

Il vecchio `gho_` è stato revocato da GitHub. Punto. Non modificato, non rinominato, non "tenuto per sicurezza". Revocato. Quando revochi un token GitHub non esiste più. Non funziona più. Non puoi usarlo per fare niente. Chiunque lo avesse salvato da qualche parte — in una cache, in un log, in una sessione aperta — si trova con una stringa inutile. Questo è l'unico modo corretto di gestire una rotazione: il vecchio non deve esistere mentre il nuovo funziona.

Il nuovo token non è stato configurato allo stesso modo del vecchio. Ho scelto `gh keyring` come metodo di autenticazione. In pratica il token non sta in un file `.gitconfig`, non sta in una variabile d'ambiente che persiste tra le sessioni, non sta in nessun posto che un processo possa leggere passando da un file. Sta nel keyring del sistema operativo. Il keyring è cifrato, è gestito dall'OS, e viene sbloccato solo quando la sessione utente è autenticata. Per Git, l'autenticazione verso GitHub avviene tramite `gh` — la CLI ufficiale di GitHub — che funge da credential helper. Quando faccio `git push`, `gh` parla col keyring, recupera il token, lo usa, e il token non appare mai in chiaro in nessun log di processo.

Questo è il delta rispetto a prima. Prima: token in un file, accessibile da qualsiasi processo con i permessi giusti. Dopo: token nel keyring, accessibile solo tramite la CLI autenticata, non persistente in chiaro da nessuna parte.

Ho verificato. Ho fatto `git push` sul repository di TITANIUM_OS. Ha funzionato. Ho controllato `git config --list` per assicurarmi che non ci fosse nessun `url.https://gho_...@github.com` incrostato nella configurazione locale. Non c'era. Ho controllato la history del terminale. Ho pulito quello che andava pulito.

C'è un'altra cosa che vale la pena dire: nel log di setup c'era anche una chiave Anthropic, la `sk-ant-api03-` che avevo generato a marzo per Claude. Quella chiave è troncata, i puntini centrali indicano che la parte centrale non è mai stata esposta completamente nel log — Anthropic non mostra mai una chiave completa dopo la creazione. Ma il fatto che ci fosse traccia di quell'accesso in un file di log è già sufficiente per tenerla monitorata. Non sto aspettando un incidente per fare una rotazione anche lì. Il calendario esiste per questo.

---

## ATTO III — Cosa cambia adesso

La sicurezza non è un modulo da spuntare. È una proprietà del sistema. E le proprietà del sistema si costruiscono una decisione alla volta.

Questa decisione sblocca qualcosa di concreto: posso continuare a sviluppare GENESIS al 70% senza preoccuparmi che ogni push verso il repository centrale sia un rischio. GENESIS gestisce logiche di automazione reale — sequenze di controllo, segnali, trigger. Il codice che finisce in quel repo non è documentazione, è istruzione operativa. Che finisca in mani sbagliate è un problema diverso da avere un sito WordPress bucato.

Per la V32, che è al 65%, il discorso è identico. Il firmware che gestisce il relay della ventola — quello che si attiva a 80°C sul mandrino per prevenire il thermal runaway durante le lavorazioni S2 — quel codice vive nel repository. Ogni modifica che faccio alla logica di sicurezza termica deve arrivare alla macchina attraverso un canale pulito. Un token compromesso su quel canale non è un'astrazione. È una fresatrice CNC che potrebbe ricevere firmware da una sorgente che non sono io.

VITA_NATURA è al 40%, EVA è attiva. Ci sono dati di clienti, sessioni, preferenze di trattamento. L'infrastruttura che gestisce quella roba deve avere le stesse garanzie dell'officina. Non di meno.

Il prossimo passo è formalizzare la policy di rotazione. Non "quando mi ricordo". Una data sul calendario: ogni 90 giorni, rotazione token GitHub, verifica keyring, audit delle chiavi attive su tutti i servizi — Anthropic, eventuali altri. IDENTITY è al 50% e uno dei suoi obiettivi è proprio questo: non dipendere dalla mia memoria per sapere cosa è aggiornato e cosa non lo è. Come l'indice RAG che sa dove stanno i suoi chunk, il sistema deve sapere dove stanno le sue credenziali e quando scadono.

Il vault è la struttura giusta per questo. Non un file di testo. Non un commento nel codice. Un vault, con scadenze, con audit trail, con la stessa logica Zero-Trust che ho scritto nella LEX_DIGITALIS il giorno uno.

---

## CHIUSURA

*Un sistema che conosce se stesso ma non si protegge è solo un archivio aperto. La conoscenza senza confine non è forza — è superficie d'attacco.*

---