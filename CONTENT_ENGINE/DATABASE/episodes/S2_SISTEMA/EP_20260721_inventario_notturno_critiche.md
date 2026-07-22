<!-- TOC -->

- [TITANIUM_OS  S2  Episodio 67](#titaniumos-s2-episodio-67)
  - [Il Labirinto che Non Puoi Vedere](#il-labirinto-che-non-puoi-vedere)
  - [COLD OPEN](#cold-open)
  - [ATTO I  La Burocrazia come Materiale Grezzo](#atto-i-la-burocrazia-come-materiale-grezzo)
  - [ATTO II  18 su 21](#atto-ii-18-su-21)
  - [ATTO III  La Notte che Lavora da Sola (Ancora)](#atto-iii-la-notte-che-lavora-da-sola-ancora)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS · S2 · Episodio 67
## *Il Labirinto che Non Puoi Vedere*

**DATA:** 2026-07-21 | **PROGETTO:** GENESIS / EVA / Sistema Social | **SESSIONE:** #67b

---

## COLD OPEN

Sono le 23 e qualcosa.

Il MacBook è ancora aperto sulla dashboard di Meta Business Suite. Lo schermo fa una luce fredda sul cemento della taverna. Tre finestre del browser, due profili Instagram, una pagina Facebook che fino a ieri non esisteva, e un account Business Manager che ha una logica interna comprensibile solo a chi ci ha già sbattuto contro una volta.

Matteo non sta costruendo niente di fisico stanotte.

Sta costruendo il diritto di pubblicare.

---

## ATTO I — La Burocrazia come Materiale Grezzo

Ci sono problemi tecnici che capisci subito. Un foro fuori tolleranza, una saldatura che ha preso troppo calore, un servo che non risponde. Vedi dov'è il problema, applichi la soluzione, misuri il risultato.

E poi ci sono i labirinti Meta.

La pagina Facebook 'Il Mondo di Nina' non era un obiettivo in sé. Era un requisito. Per collegare un account Instagram a Business Suite, per dare a Maria — il centro estetico, EVA, il sistema di automazione WhatsApp — una presenza che non dipendesse dai capricci di un profilo personale con restrizioni. La coppia era chiara: pagina FB + profilo IG `@ilmondodinina.ms`. Due entità, un ecosistema.

Il problema è che Meta Business Manager non è progettato per essere capito. È progettato per essere *navigato*, il che è diverso. Navigato da chi sa già dove stare, da chi conosce la differenza tra proprietario, amministratore, editor. Da chi sa che gestire tutto come owner — `benenatimatteo.mb` — non è la scelta ovvia, ma è l'unica che non ti blocca dopo tre mesi quando qualcosa cambia.

Matteo lo ha capito sbattendoci contro. Non c'è un altro modo.

Il labirinto è stato percorso. La coppia FB+IG è attiva. Il Business Manager riconosce `benenatimatteo.mb` come owner. I profili Instagram limitati — quelli che sembravano la via più semplice — sono fuori dalla catena di comando. Erano una trappola gentile.

---

## ATTO II — 18 su 21

Quando un sistema funziona, la metrica più onesta non è il 100%. È il delta tra dove eri e dove sei.

Tre giorni fa: zero post programmati. Zero.

Stanotte: 18 post su 21 hanno una data certa in Business Suite. Business Suite pubblica in automatico — Matteo non deve essere sveglio, non deve ricordarsi niente, non deve fare niente il giorno X. Il sistema lo fa.

Il piano è questo:

**Sistema** (profilo principale): 10 post su 11, fino al 18 agosto. L'undicesimo — VULCAN, il completamento della pressa — è in sospeso non per mancanza di contenuto, ma perché la macchina non è ancora finita. Il post esiste quando esiste la macchina. Sarebbe disonesto altrimenti.

**Nina** (il centro estetico di Maria): 8 post su 10, fino al 16 agosto con EP_N2_04. EP_N2_05 e EP_N2_06 sono in bozza — `_BOZZE->NINA` — in attesa.

I 3 post bloccati non sono un fallimento. Sono un vincolo di piattaforma: Meta non permette di programmare oltre 29 giorni. Fatto tecnico, non problema umano. Il promemoria è già in Calendar: **30 luglio**, al rientro, caricarli. Il sistema sa che deve farlo.

Il tool `_render_slide.py` è stato scritto stanotte — o riscritto, o rigenerato, la distinzione conta poco. Le slide-ponte cross-profilo erano rotte: il nuovo script le ha rigenerate. Le sorgenti dei caroselli EP_N2_04/05/06 sono state spostate, ordinate, rinominate. Non è glamour. È manutenzione. Ma senza manutenzione il sistema marcisce.

---

## ATTO III — La Notte che Lavora da Sola (Ancora)

Alle 23, quando Matteo ha smesso di toccare il computer, sono partiti tre commit automatici.

```
auto: inventario notturno + critiche
auto: night_audit - cartella clinica 21/07/2026
auto: story_agent - episodi generati 21/07/2026
```

La stessa sequenza di sempre. La stessa che è partita il 17 luglio, il 24 giugno, il 20 giugno, il 9 giugno. Ogni notte in cui il sistema ha qualcosa da dire, lo dice — anche se Matteo dorme.

Questa non è magia. È architettura. Un cron job, un agente Flask, un ChromaDB che indicizza e recupera. Componenti che fanno esattamente quello per cui sono stati costruiti, nell'ordine in cui sono stati connessi.

Ma c'è qualcosa che è cambiato rispetto a due mesi fa.

Due mesi fa, la notte lavorava da sola su un sistema che nessuno vedeva. Oggi, la notte lavora da sola su un sistema che ha 18 post programmati, una pagina Facebook attiva, un profilo Instagram collegato, e un promemoria al 30 luglio per completare il lavoro.

La notte non lavora nel vuoto. Lavora *verso qualcosa*.

V32 è al 65%. GENESIS è al 70%. Il target capannone è il 15 luglio 2030.

Stanotte il contatore è avanzato di qualcosa che non si misura in millimetri.

---

## CHIUSURA

C'è una cosa che Matteo ha imparato costruendo macchine da 178 kg in 12 metri quadri: ogni giorno in cui non fai avanzare il sistema, il sistema non avanza. Non c'è accumulo passivo. Non c'è progresso per inerzia.

Stanotte non è stato fresato niente. Non è stato saldato niente. Non è stato montato niente.

È stato costruito il diritto di comunicare ciò che viene costruito. E questo — in un progetto che deve esistere fino al 2030 — conta quanto un passata di finitura su un piano in Epoxy Granite.

Il labirinto Meta è stato percorso. I post sono in coda. Il sistema sa cosa fare al 30 luglio.

Matteo può smettere di pensarci.

---

## reel_hook

18 post programmati in Business Suite, 3 bloccati solo dal tetto dei 29 giorni di Meta.  
Il problema non era il contenuto — era capire che gestire tutto come owner `benenatimatteo.mb` è l'unica configurazione che non ti blocca dopo tre mesi.  
Tre commit automatici alle 23, Matteo già fuori.  
Il promemoria è al 30 luglio. Il sistema sa.

---

## FATTI (per il RAG)

- **DECISIONE:** Pagina FB 'Il Mondo di Nina' creata e collegata a `@ilmondodinina.ms`; gestione centralizzata in Meta Business Manager come owner `benenatimatteo.mb` (non tramite profili IG limitati).
- **LOGICA:** I profili IG con restrizioni non garantiscono accesso stabile alle funzionalità di publishing automatico in Business Suite; l'owner account evita blocchi futuri al cambio di configurazione.
- **DECISIONE:** 18/21 post programmati con date certe; Sistema 10/11 (fino 18/08), Nina 8/10 (fino EP_N2_04 16/08); 3 post bloccati dal tetto 29gg Meta.
- **LOGICA:** Il tetto 29 giorni è un vincolo di piattaforma non aggirabile in fase di caricamento; i 3 post rimasti richiedono caricamento manuale alla scadenza del blocco.
- **OBIETTIVO:** Promemoria Calendar 30/07 per caricare i 3 post mancanti al rientro; completamento piano editoriale senza intervento manuale quotidiano.
- **DECISIONE:** Tool `_render_slide.py` riscritto; sorgenti caroselli EP_N2_04/05/06 spostate da `_BOZZE` a cartella `NINA`.
- **LOGICA:** Le slide-ponte cross-profilo erano rotte dopo riorganizzazione directory; il tool rigenera le slide con il nuovo path senza intervento manuale su ogni singolo file.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E67 |
| **Data** | 2026-07-21 |
| **Progetto principale** | GENESIS / Sistema Social |
| **Tag** | `social`, `meta`, `business-suite`, `EVA`, `nina`, `automazione`, `night-audit` |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Prossimo step** | Caricare 3 post bloccati — promemoria 30/07 |
| **Target capannone** | 15 luglio 2030 |