<!-- TOC -->

- [EP_AUTO_48  Milestone](#epauto48-milestone)
    - [n8n self-hosted attivo (account locale, no cloud)  pnpm ins](#n8n-self-hosted-attivo-account-locale-no-cloud-pnpm-ins)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il costo dellaffitto che non vedi](#atto-i-il-costo-dellaffitto-che-non-vedi)
  - [ATTO II  Tre comandi e una decisione di architettura](#atto-ii-tre-comandi-e-una-decisione-di-architettura)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)

<!-- /TOC -->

# EP_AUTO_48 — Milestone
### "n8n self-hosted attivo (account locale, no cloud) + pnpm ins"

---
id: EP_AUTO_48
title: "n8n self-hosted attivo (account locale, no cloud) "
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
milestone_originale: "n8n self-hosted attivo (account locale, no cloud) + pnpm installato; avvio al login operativo (03/06/2026)"
---

## COLD OPEN

La porta 5173 l'avevo aperta solo verso i nodi che conosco per nome. Il passo successivo era dare a quei nodi qualcosa di concreto da fare — un'officina vera, non un foglio di calcolo. Il 3 giugno ho installato quell'officina.

---

## ATTO I — Il costo dell'affitto che non vedi

Prima di spiegarti cosa ho fatto, ti dico cosa avevo di fronte.

n8n è lo strumento che fa girare EVA — il sistema di automazione che gestisce i flussi di Vita Natura, coordina gli agenti AI del sistema, connette l'API server che gira su localhost:5001 con la dashboard React su 5173, con il research agent v1.1 che sta girando sui nodi. Non è un accessorio. È la colonna vertebrale operativa di GENESIS, e GENESIS è al 70% — il che significa che ogni pezzo di infrastruttura che installo adesso è load-bearing. Non posso sbagliare il materiale.

La scelta era binaria: cloud o self-hosted.

Il cloud ha una sua logica. Zero manutenzione, pronto in cinque minuti, SSL gestito da altri, uptime monitorato da altri. Se sei un consulente che deve dimostrare qualcosa a un cliente entro venerdì, ha senso. Ma io non sono un consulente. Sono un artigiano che costruisce un sistema che deve girare mentre la fresatrice V32 lavora, mentre VULCAN preme i polimeri, mentre qualcuno prenota un trattamento su Vita Natura alle undici di sera. Il cloud significa che la mia produzione dipende da una connessione internet e da un abbonamento mensile verso infrastruttura che non controllo. Significa che i dati degli agenti — le sessioni, i log, le chiamate API — escono dalla mia rete e viaggiano su server di terzi.

Ho letto il confronto: self-hosted vs cloud per organizzazioni anche grandi. La conclusione era sempre la stessa — il cloud è comodo all'inizio, costoso a scala, e non ti dà mai il controllo pieno. Per una realtà come la mia, dove il valore è nell'integrazione stretta tra macchine fisiche e software, dove EVA deve parlare con Genesis che deve parlare con la dashboard che deve parlare con l'API server, avere un nodo esterno nel mezzo è un punto di rottura intenzionale. Come montare un giunto idraulico di plastica in un circuito di raffreddamento ad alta pressione — funziona finché funziona, poi ti ritrovi con il pavimento allagato.

Self-hosted era l'unica scelta tecnica coerente. La domanda era solo: come.

---

## ATTO II — Tre comandi e una decisione di architettura

Il 3 giugno ho configurato n8n self-hosted in locale. Account locale, nessun cloud, nessun abbonamento. Il nodo gira su localhost:5678 con SQLite come database — leggero, file-based, nessun servizio esterno da gestire. È la stessa scelta che farei per un prototipo di connettore MIMS: minima complessità strutturale finché non hai validato il design.

Prima cosa: pnpm. Ho scelto pnpm invece di npm per un motivo preciso — gestione degli spazi su disco. pnpm non duplica i pacchetti node per ogni progetto. Li linka. Se hai dieci progetti che usano la stessa versione di una libreria, npm la installa dieci volte. pnpm la installa una volta e crea link simbolici. In un sistema dove sto gestendo la dashboard React, l'API server Python, i nodi degli agenti e adesso anche n8n, la frammentazione del disco è un problema reale, non teorico. È lo stesso principio per cui nel Config G sto usando epoxy granite fill per i rinforzi delle colonne Z e U — riempi le cavità con materiale che lavora, non con aria.

Installato pnpm, installato n8n via npx. Configurazione dell'account locale: nessuna email di verifica esterna, nessun token OAuth verso servizi terzi. Il sistema si autentica su se stesso.

Poi la parte che fa la differenza: l'avvio automatico al login. Non basta che n8n giri quando lo lanci a mano. In un sistema operativo come TITANIUM_OS — e usiamo questo termine in modo preciso, non come metafora — i servizi devono essere up quando la macchina è up. Se il server si riavvia, se cade la corrente, se faccio un aggiornamento di sistema e riavvio, voglio che n8n sia operativo senza che io debba ricordarmi di lanciare un comando. Un operatore CNC non dovrebbe dover ricordarsi di accendere il mandrino ogni mattina — ci sono procedure di avvio automatizzate proprio per questo.

Ho configurato l'avvio al login. Adesso quando il sistema parte, n8n parte. Localhost:5678, pronto.

Questo chiude un loop che era aperto da un po'. Nel log di sessione dell'11, quella del 29 maggio sul Config G — tra i rinforzi alle colonne Z e U — c'era già la spunta: n8n attivo, npx n8n, localhost:5678, SQLite. Era attivo in quella sessione. Ma "attivo in quella sessione" non è lo stesso di "attivo per definizione". La differenza è esattamente quella tra un pezzo lavorato su misura per un cliente e un pezzo che rientra nel processo di produzione standard. Il secondo scala. Il primo no.

Il 3 giugno ho trasformato un'attivazione manuale in un'infrastruttura.

---

## ATTO III — Cosa si sblocca adesso

Con n8n self-hosted stabile e con avvio automatico, l'architettura degli agenti di GENESIS ha una base su cui costruire senza riserve.

EVA — il sistema che gestisce Vita Natura, che è al 40% ma sta crescendo — adesso ha il suo motore di orchestrazione locale. I flussi che connettono le prenotazioni, i follow-up automatici, le comunicazioni con i clienti del centro estetico possono girare su un nodo che non dipende da nessun servizio esterno. Questo è importante per Vita Natura in modo specifico: un centro estetico lavora su dati sensibili, su preferenze personali, su storico dei trattamenti. Non è roba che voglio su un cloud americano.

Per GENESIS più in generale — che è al 70% e ha l'Error Handler già pensato come il pezzo sul nastro trasportatore che si inceppa e accende la spia rossa — adesso ho un punto di controllo centrale che posso monitorare, interrogare, e far evolvere senza chiedere permesso a nessuno. Posso aggiungere nodi. Posso connettere l'API server su 5001 ai workflow di n8n. Posso fare girare il research agent v1.1 attraverso trigger automatici invece di chiamate manuali.

Il prossimo passo concreto è costruire il primo workflow operativo: un flusso che prende l'output del research agent, lo elabora, e lo scrive nel database. Non un test. Un flusso che entra in produzione. Nel frattempo MIMS aspetta ancora la pressa — waiting_press, 30% — e V32 è al 65% con i rinforzi in lavorazione. L'infrastruttura software cresce in parallelo alla macchina fisica. È così che funziona quando costruisci un sistema integrato: non puoi finire il software e poi aspettare l'hardware, né viceversa. Crescono insieme o non crescono.

L'officina digitale è aperta. Ha un indirizzo fisso, si accende da sola, e nessuno può tagliarti la corrente tranne te.

---

## CHIUSURA

*In officina, la macchina che non parte da sola la mattina è una macchina che dipende da te per esistere. E tu non puoi permetterti di essere il punto singolo di guasto del tuo sistema.*