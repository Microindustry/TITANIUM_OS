<!-- TOC -->

- [EP_AUTO_09  Milestone](#epauto09-milestone)
    - [Ottimizzazione Claude Code - .claudeignore, settings.json, r](#ottimizzazione-claude-code---claudeignore-settingsjson-r)
- [Il Sistema  Episodio 14](#il-sistema-episodio-14)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il caos silenzioso](#atto-i-il-caos-silenzioso)
  - [ATTO II  Struttura o morte](#atto-ii-struttura-o-morte)
  - [ATTO III  Cosa si sblocca](#atto-iii-cosa-si-sblocca)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_09 — Milestone
### "Ottimizzazione Claude Code - .claudeignore, settings.json, r"

---
id: EP_AUTO_09
title: "Ottimizzazione Claude Code - .claudeignore, settin"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-03-26
data_generato: 2026-05-29
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "Ottimizzazione Claude Code - .claudeignore, settings.json, rules/, skills portabili (26 Mar 2026)"
---

# Il Sistema — Episodio 14

## COLD OPEN

Ci sono giorni in cui non costruisci niente di fisico. Non c'è truciolo sul pavimento, non c'è alluminio sul mandrino. Eppure finisci la giornata con la sensazione di aver montato qualcosa di solido. Il 26 marzo 2026 è stato uno di quei giorni.

---

## ATTO I — Il caos silenzioso

Parliamo di come stavo lavorando con Claude fino a quel momento. Funzionava, intendiamoci. Ma era come avere un operaio bravo che ogni mattina si sveglia senza memoria. Gli rispieghi il contesto, gli ridici com'è organizzato il progetto, gli ricordi che V32 è una fresatrice CNC e non un codice di progetto astratto, che MIMS sono connettori fisici, che GENESIS non è fantascienza ma una dashboard vera con agenti reali. Ogni sessione, ripartivi da zero.

Il problema non era Claude. Il problema era che io non avevo mai formalizzato il sistema di lavoro. Avevo cartelle sparse, regole implicite che esistevano solo nella mia testa, convenzioni che davo per scontate e che invece andavano scritte da qualche parte. Stavo chiedendo a uno strumento potente di operare in un ambiente che non aveva struttura. È come pretendere che una fresatrice lavori bene senza origini, senza zero pezzo, senza utensili registrati.

TITANIUM_OS a quel punto era già abbastanza complesso da rendere il problema evidente. V32 al sessantacinque percento, con la Config G dei rinforzi in lavorazione. GENESIS con la dashboard v7.0 e il RAG alla quarta versione. VITA_NATURA con EVA in fase pilota. MIMS che aspettava la catena V32 verso VULCAN per sbloccarsi. Cinque sistemi, ognuno con la sua logica, ognuno con il suo vocabolario tecnico, ognuno con dipendenze dagli altri. Tenere tutto in testa era possibile. Trasmetterlo a ogni nuova sessione di lavoro era uno spreco.

---

## ATTO II — Struttura o morte

Il 26 marzo ho smesso di lavorare sui progetti e ho lavorato sull'ambiente di lavoro. Distinzione importante.

La prima cosa è stata il `.claudeignore`. Sembra banale, è fondamentale. Definisci cosa Claude non deve vedere: file temporanei, build, log, cartelle che contengono rumore e non segnale. Quando stai lavorando sulla cinematica di V32 non ti serve che l'AI stia cercando di capire anche i backup automatici di Fusion o i file di sessione del browser. Il `.claudeignore` è il modo per dire: qui si lavora, qui no.

Poi il `settings.json`. Questo è dove ho centralizzato il comportamento. Lingua italiana, tono tecnico diretto, preferenza per la prosa strutturata senza bullet point quando si ragiona, massima densità informativa. Non aspettarmi che il modello indovini come voglio che mi risponda. Scrivi le preferenze, salvale, non ci pensare più.

La parte che mi ha preso più tempo, e che vale di più, è la cartella `rules/`. Qui vivono le regole di dominio. Ho scritto file separati per ogni sottoambiente di TITANIUM_OS. Cosa è GENESIS, come è strutturato il suo filesystem, quali sono le convenzioni di naming che uso nei moduli. Cosa è V32, a che punto è la costruzione, quali sono i vincoli meccanici che influenzano ogni decisione software. Cosa è EVA nel contesto di VITA_NATURA, come interagisce con il sistema di prenotazioni, qual è il livello di autonomia che le sto dando in questa fase.

E poi le `skills` portabili. Questa è la parte che mi piace di più. Ho cominciato a scrivere procedure riutilizzabili: come faccio il debug di un agente GENESIS, come struttura una sessione di design per componenti MIMS, come valuto se un'automazione è pronta per VULCAN. Non sono legate a un progetto specifico. Sono metodi di lavoro che posso portare da un contesto all'altro, che Claude può applicare coerentemente perché li trova scritti, non perché li intuisce.

Il risultato immediato è stato questo: ho aperto una sessione su V32 il giorno dopo, senza spiegare niente, e Claude sapeva già dove eravamo. Ha letto le rules, ha capito il contesto, ha ripreso da dove avevamo lasciato. Non ho perso venti minuti a riorientare il sistema.

---

## ATTO III — Cosa si sblocca

Questa ottimizzazione non è fine a se stessa. È infrastruttura. È lo stesso motivo per cui a un certo punto smetti di usare morse improvvisati e fai un attrezzaggio decente: non per quella lavorazione, ma per le cinquanta che vengono dopo.

Adesso MIMS ha un contesto scritto che spiega perché aspetta la catena V32-VULCAN. Quando tornerò a progettare i connettori, Claude non dovrà capire da zero quella dipendenza. IDENTITY, il sistema dove tengo il CV aggiornato e le capabilities di Claude documentate, adesso è integrato nelle rules e non galleggia a parte. VITA_NATURA ha le sue regole specifiche: tono diverso, obiettivi diversi, EVA ha un profilo comportamentale scritto che non devo rispiegare a ogni sessione.

Il sistema smette di dipendere dalla mia memoria in tempo reale. Diventa replicabile. Diventa trasparente. Se tra tre mesi riprendo un thread su GENESIS, non parto da un foglio bianco.

---

## CHIUSURA

*Il problema non era la