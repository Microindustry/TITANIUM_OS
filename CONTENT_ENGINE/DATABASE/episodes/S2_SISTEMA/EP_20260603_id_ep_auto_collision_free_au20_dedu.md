<!-- TOC -->

- [TITANIUM_OS  Episodio 20](#titaniumos-episodio-20)
  - [Il Dev Flutter che Non Capiva Perché Scriviamo Tutto in Markdown](#il-dev-flutter-che-non-capiva-perché-scriviamo-tutto-in-markdown)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema con i Path Hardcodati](#atto-i-il-problema-con-i-path-hardcodati)
  - [ATTO II  Chiudere il Loop](#atto-ii-chiudere-il-loop)
  - [ATTO III  Il Dev Flutter e le Cinque Domande](#atto-iii-il-dev-flutter-e-le-cinque-domande)
  - [CHIUSURA](#chiusura)
  - [REEL HOOK](#reel-hook)
  - [METADATI EPISODIO](#metadati-episodio)

<!-- /TOC -->

# TITANIUM_OS — Episodio 20
## "Il Dev Flutter che Non Capiva Perché Scriviamo Tutto in Markdown"

---

> *Stagione 1 · Sessione #20 · 2026-06-03*
> *Automazioni notturne · LLM locale · RAG grounded · Architettura spiegata a un estraneo*

---

## COLD OPEN

Sono le 22:35.

Matteo non è davanti al computer. Ha lasciato Claude lì — aperto, in attesa — con un amico. Un dev Flutter. Backend solido, migrazioni, il tipo di persona che sa come funzionano le cose.

L'amico guarda lo schermo. Vede la dashboard. Vede i commit. Vede il markdown.

Scrive la prima domanda: *"Come state lavorando? Salvate su git?"*

È una domanda normale. Ragionevole. La domanda che farebbe chiunque con un background tecnico e zero contesto su quello che sta succedendo in questa taverna da 12 m².

Claude risponde. L'amico legge. Fa un'altra domanda. Poi un'altra.

Alla quinta, scrive: *«lo state facendo in modo inusuale ma figo».*

Quella frase — cinque parole — vale più di qualsiasi documentazione che Matteo abbia mai scritto sul sistema.

---

## ATTO I — Il Problema con i Path Hardcodati

La mattina del 3 giugno inizia con un blocco.

Non un blocco creativo. Un blocco tecnico, noioso, del tipo che ti ricorda che i sistemi complessi muoiono per mille tagli piccoli. Tutte le automazioni notturne — il research, il fine-tune, la generazione degli episodi — sono cablate su `C:\Users\benen`. Il path del Getac. La macchina di lavoro.

Il problema: il sistema deve girare anche altrove. E `C:\Users\benen` non esiste ovunque.

La soluzione è pulita ma richiede disciplina: un resolver centrale. `_ti_paths.bat` — un singolo file che al runtime capisce dove si trova, trova `TI_ROOT`, trova Python, trova l'ambiente, trova la cartella MENTE. Da lì in poi, tutto il resto si aggancia a lui.

Non è glamour. È impianto idraulico. Il tipo di lavoro che nessuno vede ma che, se non lo fai, il sistema ti esplode in faccia alle 3 di notte quando non ci sei.

Nel commit c'è anche il watchdog. `register_watchdog.ps1` — si registra nel Task Scheduler, `AtLogon`, `RunLevel Highest`, nessun limite di tempo. Il guardiano che riporta tutto online dopo un riavvio. L'equivalente digitale del pannello di controllo che riaccende la macchina CNC dopo un blackout.

Matteo conosce quel tipo di robustezza. La pratica in TIG da vent'anni. Un giunto che regge sotto carica non è un giunto che sembra bello — è un giunto che non si è mai rotto quando contava.

**Dati concreti:**
- `_ti_paths.bat`: risolve `TI_ROOT / PYTHON / GH / ENV_FILE / MENTE_DIR` a runtime
- Watchdog: AtLogon, RunLevel Highest, no time-limit, pythonw-safe
- Path de-hardcodati su: launcher, `CLAUDE_CODE.bat`, `.claude/settings.json`, hook Stop
- `claude.exe` risolto dinamicamente anche dopo aggiornamenti del GUID Store

---

## ATTO II — Chiudere il Loop

Nel pomeriggio, tre feature entrano in produzione quasi in sequenza. Sono collegate. È difficile capirne una senza le altre due.

**Prima:** Il consumatore del modello fine-tunato.

`NODES/LOCAL_LLM/infer.py` carica TinyLlama con i pesi LoRA da `MODELS/titanium_llm_v1`. Non è il modello più potente che esiste. Non deve esserlo. Deve essere *suo* — addestrato su sessioni, decisioni, logica tecnica di questo sistema specifico. Il modello che conosce la differenza tra un tile MIMS e un episodio GENESIS perché ha letto migliaia di righe su entrambi.

**Seconda:** La generazione grounded sul RAG.

`retrieve_context()` — prima di scrivere un episodio, il sistema va a cercare nel RAG. Trova i fatti reali sul milestone. Li inietta nel prompt. L'episodio che esce non è allucinazione — è radicato nei 6518 chunk che Matteo ha costruito nel tempo. C'è anche un filo narrativo tra episodi: il sistema sa cosa è stato già detto, non ricomincia da zero ogni volta.

**Terza:** La ricerca notturna guidata dallo STATE.

`night_topics.py` non sceglie cosa cercare a caso. Legge lo STATE — i pilastri attivi, i blocker, le priorità. Genera i topic da lì. La ricerca notturna diventa contestuale: se V32 è al 65% e il blocker è il sistema di raffreddamento del mandrino, quella notte il sistema cerca raffreddamento mandrini, non altro.

Queste tre cose insieme fanno una cosa sola: **il sistema conosce se stesso**.

Non in senso filosofico. In senso operativo. Sa dove è, sa cosa manca, sa cosa cercare, sa come parlarne. È il tipo di coerenza che Matteo insegue dal primo commit.

**Dati concreti:**
- RAG: 6518 chunk (da 6497 il 2 giugno — +21 chunk in 24 ore, inclusa la cattura della sessione con l'amico)
- LLM locale: TinyLlama + LoRA da sessioni proprie
- PC fisso: RAG + CUDA + indice completamente operativo (Tailscale `100.125.152.124`)
- ID episodi: collision-free con `_next_auto_index()` + dedup per slug

---

## ATTO III — Il Dev Flutter e le Cinque Domande

Torniamo a quella sera.

L'amico fa cinque domande. Non le conosciamo tutte — la cattura è parziale. Ma la prima è abbastanza: *"Come state lavorando? Salvate su git?"*

È la domanda giusta perché rivela il gap. Un dev Flutter pensa in termini di repo, branch, PR, deploy pipeline. Pensa a un'app con uno stack definito, un ciclo di vita chiaro, utenti che cliccano su cose.

TITANIUM_OS non è quello.

È un sistema cognitivo che vive in markdown. Ogni decisione è scritta. Ogni sessione viene catturata. Ogni RAG chunk è una decisione reale — non documentazione retroattiva, ma pensiero in tempo reale trasformato in dato ricercabile. Lo STATE non è un database di configurazione: è una fotografia dell'intero sistema aggiornata ogni sessione. Il git non è per il codice — è per la memoria.

La vista METODO che entra in produzione quel giorno nasce esattamente da questo scambio. *"markdown come fonte + RAG vettoriale + loop 1→N"* — tre righe che spiegano perché questo sistema è diverso da un'app classica. Non perché sia più sofisticato. Perché ha un'architettura che cresce con chi la usa.

L'amico Flutter non capisce perché scriviamo tutto in markdown. È una reazione onesta. La maggior parte dei dev non lo farebbe. C'è qualcosa di deliberatamente lento in quel processo — scrivi, strutturi, committi, aspetti che il RAG indicizzi. Non è la velocità di uno sprint.

Ma è la differenza tra un sistema che ricorda e uno che dimentica.

Matteo lo sa. Lo ha imparato costruendo pezzi fisici dove un'informazione persa — una misura, una tolleranza, un parametro di saldatura — si trasforma in un pezzo da rifare. L'Epoxy Granite di V32 non perdona. Nemmeno il codice che non sa dove si trova.

*"Lo state facendo in modo inusuale ma figo."*

Non è un complimento generico. È la risposta di qualcuno che ha capito abbastanza da riconoscere che non avrebbe fatto così — e che forse avrebbe avuto torto.

---

## CHIUSURA

La sessione #20 si chiude con le automazioni notturne che passano da SPENTE a LIVE.

Nella dashboard c'è una nuova voce sidebar: "Notturne". Blu. Sotto AUTOMAZ. Sei task schedulati visibili in tempo reale via PowerShell — il server Flask chiama `Get-ScheduledTask`, la dashboard mostra lo stato. Non è debug: è visibilità operativa.

Quella notte, mentre Matteo dorme, il sistema ricerca, indicizza, impara.

Non è autonomia. È delegazione intelligente — il tipo che funziona solo se hai costruito le fondamenta giuste. I path resolver. Il watchdog. Il RAG grounded. Il loop chiuso tra LLM locale e memoria vettoriale.

Matteo costruisce macchine che lavorano quando lui non può. L'ha sempre fatto — con la CNC, con i robot, con le presse. GENESIS è la stessa cosa, con meno trucioli.

V32 è al 65%. GENESIS è al 70%. Il capannone è al 2030.

Le notti sono già al lavoro.

---

## REEL HOOK

Il sistema ha 6518 chunk di memoria e un LLM addestrato su di essa — ma fino a ieri girava solo su una macchina con un path hardcodato. Un dev Flutter ha guardato l'architettura e detto «inusuale ma figo». Quella stessa notte le automazioni sono passate da spente a live. Adesso il sistema ricerca, impara e genera episodi mentre dormo — ma non so ancora cosa produrrà da solo la prima volta che non guardo.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **ID** | EP_AUTO_20 |
| **Data registrazione** | 2026-06-03 |
| **Sessioni coperte** | #19, #20 (con traccia #18) |
| **Pilastro principale** | GENESIS |
| **Pilastri secondari** | V32 (contesto), TITANIUM_OS infra |
| **Milestone** | Automazioni notturne portabili + LLM locale live |
| **Avanzamento V32** | 65% |
| **Avanzamento GENESIS** | 70% |
| **RAG chunk** | 6518 |
| **Modello LLM locale** | TinyLlama + LoRA `titanium_llm_v1` |
| **Commit nel periodo** | 19 (2026-06-02 / 2026-06-03) |
| **Angolo narrativo** | Dev Flutter + architettura spiegata a un estraneo |
| **Tag** | `automazioni-notturne` `llm-locale` `rag-grounded` `portabilità` `architettura` |
| **Co-author** | Claude Opus 4.8 |
| **Target capannone** | 15 luglio 2030 |