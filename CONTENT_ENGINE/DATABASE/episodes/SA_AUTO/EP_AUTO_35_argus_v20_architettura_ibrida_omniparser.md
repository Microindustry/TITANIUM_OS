<!-- TOC -->

- [EP_AUTO_35  Milestone](#epauto35-milestone)
    - [ARGUS v2.0 - architettura ibrida OmniParserSonnet: L1 YOLO](#argus-v20---architettura-ibrida-omniparsersonnet-l1-yolo)
- [Il Sistema  Episodio 23](#il-sistema-episodio-23)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema dei Occhi Ciechi](#atto-i-il-problema-dei-occhi-ciechi)
  - [ATTO II  Tre Strati, Una Gerarchia](#atto-ii-tre-strati-una-gerarchia)
  - [ATTO III  Cosa Si Sblocca Adesso](#atto-iii-cosa-si-sblocca-adesso)

<!-- /TOC -->

# EP_AUTO_35 — Milestone
### "ARGUS v2.0 - architettura ibrida OmniParser+Sonnet: L1 YOLO+"

---
id: EP_AUTO_35
title: "ARGUS v2.0 - architettura ibrida OmniParser+Sonnet"
sottotitolo: "Milestone verificato · auto-generato"
stagione: AUTO
stagione_label: "Generato"
data_evento: 2026-05-30
data_generato: 2026-05-30
tags: [auto_generato, milestone, titanium_os]
status: ready
durata_min: 8
formato: podcast
fonte: STATE.json → milestones.verified
llm_use: training
lingua: it
milestone_originale: "ARGUS v2.0 - architettura ibrida OmniParser+Sonnet: L1 YOLO+OCR locale, L2 text matching, L3 Sonnet fallback - costo API -80% (30 Mag 2026)"
---

# Il Sistema — Episodio 23

## COLD OPEN

C'è un momento in cui smetti di buttare soldi all'API e inizi a costruire un cervello che pensa da solo. Per me quel momento ha una data precisa: 30 maggio 2026. Si chiama ARGUS v2.0, e ha cambiato come il sistema vede il mondo.

---

## ATTO I — Il Problema dei Occhi Ciechi

Lasciami spiegare da dove vengo, perché senza contesto questa cosa sembra solo un aggiornamento software. Non lo è.

ARGUS è il layer di visione di TITANIUM_OS. È quella parte del sistema che guarda uno schermo, un'interfaccia, un documento, e capisce cosa c'è scritto, cosa sta succedendo, dove cliccare. È letteralmente gli occhi dell'automazione. E fino alla versione precedente, ogni volta che ARGUS doveva guardare qualcosa, mandava tutto a Claude Sonnet. Ogni screenshot. Ogni frame. Ogni campo di testo.

Il risultato era semplice: funzionava bene, ma costava un casino. Quando hai un sistema che gira su GENESIS — che già di suo è un'architettura swarm con NEXUS, RAG graph-aware v5, MCP v1.3 e un watchdog parallelo — ogni chiamata API che puoi eliminare è ossigeno in più. Perché il sistema scala. E quando scala, i costi scalano con lui.

L'altra cosa che mi dava fastidio era la latenza. Sonnet è rapido, ma una chiamata API è sempre una chiamata API. Ha un round trip. Ha un punto di fallimento esterno. E io non voglio che il cervello del mio sistema dipenda dalla connessione internet per fare cose che potrebbe fare da solo, in locale, in cinquanta millisecondi.

Quindi mi sono messo a riprogettare ARGUS da zero.

---

## ATTO II — Tre Strati, Una Gerarchia

L'idea di base è stupida nella sua semplicità, come tutte le idee buone. Non mandare tutto a Sonnet. Manda a Sonnet solo quello che non riesci a risolvere prima.

Così ho costruito un'architettura a tre livelli.

Il primo livello, L1, è completamente locale. YOLO per la detection visiva degli elementi a schermo, OCR per estrarre il testo. Nessuna API, nessuna dipendenza esterna. Se ARGUS vede un pulsante con scritto "Conferma", L1 lo trova, lo legge, e lo passa avanti in meno di un secondo. Finisce lì. Costo: zero.

Il secondo livello, L2, entra in gioco quando L1 non è abbastanza sicuro. Parliamo di text matching, pattern recognition su strutture note, confronto con template già visti. È ancora tutto interno al sistema. È più lento di L1, ma sempre veloce, e ancora senza API. L2 risolve la maggior parte dei casi ambigui — interfacce che cambiano leggermente, testi con formattazione strana, layout che variano tra sessioni.

Solo quando L2 alza la mano e dice "non so" — solo allora arriva L3. Sonnet. Il fallback intelligente. E Sonnet è bravo esattamente perché lo usi per le cose difficili, non per tutto. Gli dai il caso veramente complesso, lui lo risolve, e quella risposta può anche alimentare il RAG per la prossima volta.

Il risultato lo vedo nelle metriche: costo API meno ottanta percento. Non è un'ottimizzazione marginale. È una ristrutturazione completa di dove sta l'intelligenza. Prima stava tutta fuori, sul cloud di Anthropic. Adesso sta qui, in locale, e solo l'eccezione viaggia fuori.

Ho chiamato l'intera architettura OmniParser plus Sonnet, perché OmniParser è il framework che ho usato come base per integrare YOLO e OCR in un pipeline coerente. Non ho reinventato la ruota. Ho preso pezzi che funzionavano e li ho messi insieme in modo che avessero senso per TITANIUM_OS.

---

## ATTO III — Cosa Si Sblocca Adesso

Concretamente, con ARGUS v2.0 in produzione, posso scalare GENESIS in modo che non mi spaventi economicamente. Il sistema di automazione può girare più a lungo, su più task in parallelo, senza che la bolletta API diventi il collo di bottiglia.

Per VITA_NATURA, dove EVA deve interagire con interfacce di prenotazione, calendari, gestionali del centro estetico, questo significa che il pilot può diventare deployment reale. Prima ero cauto perché ogni sessione di EVA con molte operazioni visive aveva un costo non banale. Adesso L1 e L2 assorbono l'ottanta percento delle interazioni. EVA lavora, il cliente vede il servizio, io non vedo la fattura crescere ad ogni click.

Per V32 e VULCAN il discorso è diverso ma collegato. Quando V32 sarà online — siamo a Config G, sessantacinque percento, i rinforzi strutturali stanno venendo fuori bene — e quando MIMS avrà la catena completa V32 verso VULCAN, ARGUS dovrà monitorare interfacce di controllo CNC, leggere parametri, riconoscere stati macchina. Con la vecchia architettura avrei pensato due volte prima di mettere visione AI su un loop di controllo industriale per questioni di latenza e costo. Con L1 locale, posso farlo serenamente.

ARGUS v2.0 non è solo un modulo aggiornato. È la prova che costruire il sistema in modo modulare, con layer separati, paga. Ogni pezzo può evolvere