<!-- TOC -->

- [EP_AUTO_40  Milestone](#epauto40-milestone)
    - [Tool installati: Python 3.11, Node.js, gh CLI, Tailscale](#tool-installati-python-311-nodejs-gh-cli-tailscale)
- [IL SISTEMA  Episodio: Fondamenta](#il-sistema-episodio-fondamenta)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Prima di costruire, costruisci il terreno](#atto-i-prima-di-costruire-costruisci-il-terreno)
  - [ATTO II  Quattro tool, un sistema](#atto-ii-quattro-tool-un-sistema)
  - [ATTO III  Cosa si sblocca adesso](#atto-iii-cosa-si-sblocca-adesso)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# EP_AUTO_40 — Milestone
### "Tool installati: Python 3.11, Node.js, gh CLI, Tailscale"

---
id: EP_AUTO_40
title: "Tool installati: Python 3.11, Node.js, gh CLI, Tai"
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
milestone_originale: "Tool installati: Python 3.11, Node.js, gh CLI, Tailscale"
---

# IL SISTEMA — Episodio: "Fondamenta"

---

## COLD OPEN

Avevamo appena pushato il tag v3.0.0. Sapevo da dove ricominciare. Bene. Perché il giorno dopo ho dovuto ricominciare davvero — e la prima cosa che ti chiede un sistema serio è: su cosa gira?

---

## ATTO I — Prima di costruire, costruisci il terreno

Fammi dire una cosa che sembra ovvia ma non lo è: un progetto CNC, una pressa per polimeri, un sistema di automazione industriale — fisici o digitali, poco cambia — crollano se le fondamenta sono improvvisate. Io lo so perché l'ho fatto nel modo sbagliato. Ho scritto codice Python su una macchina con tre versioni di Python installate e nessuna configurata bene. Ho eseguito script Node su versioni che non ricordavo nemmeno di aver installato. Ho usato Git dal terminale di Windows senza mai toccare `gh` CLI. Funzionava? Più o meno. Era un sistema? No. Era polvere tenuta insieme dall'abitudine.

TITANIUM_OS ha sei aree attive in questo momento. V32, la fresatrice CNC, è al 65% — il cinematismo è definito, i profili in alluminio sono ordinati, manca ancora l'assemblaggio della struttura portante e tutta la parte di controllo elettronico. MIMS, i connettori modulari, è al 30% e aspetta la pressa — aspetta VULCAN, che non ha ancora un nome nell'archivio ma esiste nella testa e nei preventivi. GENESIS, il sistema di automazione, è al 70% — è quello che gira già in parte, è quello che gestisce i flussi interni, è quello da cui dipende tutto il resto. Vita Natura, il centro estetico con AI, è al 40% — EVA sta girando, ma in modalità base, senza ancora l'integrazione completa con la knowledge base. IDENTITY è al 50% — il profilo GitHub esiste, il CV tecnico è scritto, ma il sistema di presenza digitale non è ancora coerente.

Sei aree. Ognuna con dipendenze dalle altre. Ognuna che genera file, dati, sessioni, log. E io stavo lavorando su tutto questo con un ambiente di sviluppo che non avevo mai formalizzato.

Il problema non era la competenza. Il problema era che ogni volta che aprivo una sessione dovevo ricostruire il contesto da zero. Sapevo che `python` sul terminale chiamava una versione, che `python311` ne chiamava un'altra, che Node era installato ma non so da quando e in quale percorso. Non è un modo di lavorare. È un modo di sopravvivere.

---

## ATTO II — Quattro tool, un sistema

La sessione che voglio raccontare è questa: mi siedo, apro Claude Code dalla cartella `TITANIUM_OS/TITANIUM_OS`, ed eseguo il comando con `--dangerously-skip-permissions` perché in quella fase sto ancora configurando e voglio che l'AI abbia accesso completo al filesystem per fare le verifiche. Non è una scelta che faccio a caso — è una scelta consapevole in un ambiente controllato, su una macchina che conosco.

Prima cosa: verifica Python. Lo vedo nei log di sessione, nero su bianco. PowerShell chiama `C:\Users\benen\tools\python311\python.exe --version` e risponde `Python 3.11.9`. Poi chiama `pip list` filtrato per quello che conta: `mcp 1.27.1`, `anthropic 0.104.1`. Queste non sono versioni a caso. `anthropic 0.104.1` è la versione SDK che supporta i tool use aggiornati — senza quella, EVA non può fare le chiamate strutturate che le servono per ragionare sui dati di Vita Natura. `mcp 1.27.1` è il protocollo che permette a Claude Code di parlare con i miei script locali. Sono dipendenze precise, non installate per abitudine ma per funzione.

Poi Node. La versione installata è Node 22 — non la LTS più conservativa, ma non l'edge più instabile. È la scelta che bilancia compatibilità con le librerie React che uso per l'interfaccia di GENESIS e accesso alle API moderne. TypeScript gira sopra, con React, Zustand per lo state management, Tailwind per i componenti visivi. Questo stack lo vedo già nel CV tecnico che ho scritto — non è aspirazionale, è descrittivo. È quello che uso.

Poi `gh` CLI, versione 2.92. Questo è il pezzo che cambia il workflow in modo concreto. Prima il push su GitHub era una sequenza di comandi Git che eseguivo a memoria, con qualche errore, qualche `git push --force` che non avrei dovuto fare. Con `gh` ho autenticazione integrata, posso creare issue, pull request, release direttamente da terminale. Il tag v3.0.0 che ho pushato nell'episodio precedente — quello lo rifarei con `gh release create` e avrei metadati strutturati, non solo un tag nudo.

Infine Tailscale. Questo è il meno appariscente dei quattro ma forse il più strategico. Tailscale crea una rete privata cifrata tra i miei dispositivi — non è una VPN nel senso classico del termine, è una mesh network che usa WireGuard sotto. Cosa significa in pratica? Significa che posso accedere alla macchina di sviluppo da remoto come se fossi seduto davanti a lei. Significa che GENESIS, quando girerà su hardware dedicato, potrà comunicare con il server EVA senza esporre porte pubbliche. Significa che il centro estetico Vita Natura potrà ricevere dati dall'AI senza passare per infrastruttura cloud che non controllo. È sicurezza per architettura, non per configurazione.

Il prompt di sistema che vedo nel log di sessione — quella riga — dice tutto: `Python 3.11 | Node 22 | gh 2.92 | Claude Code 2.1`. Sotto, la barra di navigazione: `ti | tiv | mi | mente | cad | fin | ce | ws | pers | inbox | mappa`. Ogni alias è un'area. `ti` è TITANIUM_OS. `mente` è il sistema RAG, la knowledge base che alimenta EVA. `cad` è dove vivono i file di progetto per V32 e VULCAN. Non è un terminale decorato — è un pannello di controllo.

E poi c'è il controllo della cartella DATA: `contacts.json` e altri cinque file che non vedo tutti nel log. Quella cartella è il nucleo operativo di EVA — i contatti del centro estetico, le sessioni, i dati che l'AI usa per rispondere in modo contestuale. Sapere che quella struttura esiste e che Python 3.11 con le librerie giuste la può leggere — ChromaDB per i vettori, SentenceTransformer per gli embedding, pdfplumber per i documenti — non è un dettaglio. È la differenza tra un chatbot generico e un sistema che sa chi sei e cosa hai fatto.

---

## ATTO III — Cosa si sblocca adesso

Adesso ho un ambiente che posso descrivere con precisione. Non "ho Python" — ho Python 3.11.9 in un percorso specifico, con dipendenze versionate, chiamabile da alias nel profilo PowerShell. Non "uso GitHub" — uso `gh` 2.92 con autenticazione configurata, integrato nel workflow di ogni area del progetto.

Questo sblocca tre cose concrete. Prima: posso automatizzare il backup dell'archivio MENTE verso GitHub senza script fragili — `gh` gestisce l'autenticazione, Task Scheduler gestisce il timing. Seconda: GENESIS può iniziare a girare con log strutturati che vanno in repository tracciato — ogni modifica al sistema di automazione ha una storia. Terza: EVA su Vita Natura può ricevere aggiornamenti della knowledge base senza sessioni manuali — il pipeline è Python, il trasporto è Tailscale, l'interfaccia è React.

V32 è ancora al 65% perché mancano pezzi fisici — quelli non li installo da terminale. Ma il sistema che la controllerà quando sarà pronta sta girando su fondamenta solide. MIMS aspetta VULCAN, e VULCAN aspetta i soldi giusti e il progetto meccanico finalizzato. Nel frattempo, ogni ora che passo su GENESIS con un ambiente stabile è un'ora che non perdo a ricostruire il contesto.

---

## CHIUSURA

*Le fondamenta non si vedono quando l'edificio è in piedi. Si vedono quando trema.*

## FATTI (per il RAG)

- **FATTO:** Stack di sviluppo TITANIUM_OS su Windows: Python 3.11.9 installato in `C:\Users\benen\tools\python311\python.exe`, con dipendenze `mcp 1.27.1` e `anthropic 0.104.1`.

- **DECISIONE:** Versione `anthropic 0.104.1` scelta perché supporta i tool use aggiornati necessari a EVA per le chiamate strutturate sui dati di Vita Natura. **LOGICA:** Senza quella versione SDK, le chiamate strutturate di EVA non funzionano.

- **FATTO:** Node.js versione 22 installato; stack frontend: TypeScript + React + Zustand (state management) + Tailwind CSS, usato per l'interfaccia di GENESIS.

- **FATTO:** `gh` CLI versione 2.92 installato per gestione GitHub integrata da terminale (issue, pull request, release). Il tag v3.0.0 era già stato pushato alla sessione precedente.

- **FATTO:** Tailscale installato come mesh network cifrata basata su WireGuard, per connettere i dispositivi di sviluppo in rete privata senza esporre porte pubbliche — prerequisito per la comunicazione tra GENESIS e il server EVA di Vita Natura.

- **OBIETTIVO:** Avanzamento aree TITANIUM_OS al momento dell'episodio: V32 65%, GENESIS 70%, EVA/Vita Natura 40%, MIMS 30%, IDENTITY 50%.
