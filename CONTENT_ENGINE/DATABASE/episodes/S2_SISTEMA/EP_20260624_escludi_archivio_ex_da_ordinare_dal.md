<!-- TOC -->

- [TITANIUM_OS  Episodio 47](#titaniumos-episodio-47)
  - [Il sistema che dimentica se stesso](#il-sistema-che-dimentica-se-stesso)
  - [COLD OPEN](#cold-open)
  - [ATTO I  La memoria che si inceppa](#atto-i-la-memoria-che-si-inceppa)
  - [ATTO II  Chirurgia sul tessuto connettivo](#atto-ii-chirurgia-sul-tessuto-connettivo)
  - [ATTO III  Una decisione che non è nel RAG](#atto-iii-una-decisione-che-non-è-nel-rag)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio 47
## "Il sistema che dimentica se stesso"

*Sessione #44-45 · 24 giugno 2026*

---

## COLD OPEN

Ore 02:17. Il terminale non dorme mai.

Sul monitor della taverna — quello inclinato contro il muro di cemento, tra il banco da lavoro e lo scaffale delle mole — scorre una sequenza di commit automatici. Nessuno li guarda. `auto: night_audit - cartella clinica 24/06/2026`. `auto: story_agent - episodi generati 24/06/2026`. Il sistema lavora da solo, nell'oscurità, come un orologiaio cieco che rimonta pezzi che conosce a memoria.

Matteo dorme. O forse no — chi lo sa, con lui.

Al mattino troverà 23 commit in coda e una bussola che è passata da 41 voci aperte a 21. Qualcosa ha pulito la casa mentre lui era fuori.

---

## ATTO I — La memoria che si inceppa

C'è un problema sottile nei sistemi cognitivi costruiti in casa, uno che non si vede nei tutorial e non appare nei paper: il sistema impara cose su se stesso che non sono più vere.

GENESIS aveva 31 critiche aperte nel sidebar. Il numero sembrava onesto — era onesto, un mese fa. Ma la sessione #45 ha scoperto che 18 di quelle erano stale: risolte, superate, o già decise in forma diversa da quando erano state aperte. Il sistema continuava a mostrarle come problemi aperti perché nessuno aveva chiuso il ciclo. Come un medico che tiene in cartella una diagnosi del 2024 senza aggiornarla.

Il burn-down non è stato automatico. È stato un loop autonomo — Matteo che entra, legge, decide, chiude. Trentuno critiche diventano tredici. Poi nove, con l'audit notturno.

Ma c'è di peggio. La bussola — il documento che orienta ogni sessione, il nord magnetico di tutto GENESIS — aveva 41 voci aperte. Venti erano già fatte. Alcune risalivano alla sessione #32. Il bug era topologico: il parser del TOC contava righe fantasma, voci duplicate nell'indice che nella realtà non esistevano. Il commit lo chiama *"bug 42 todo-fantasma"* — quarantadue elementi che il sistema credeva di dover fare e che erano già stati fatti, o non erano mai esistiti come task reali.

Questo è il tipo di debito tecnico che non si vede nel codice. Si vede nell'orientamento. In una sessione che parte convinta di avere 41 problemi aperti e ne ha 21.

---

## ATTO II — Chirurgia sul tessuto connettivo

La giornata del 24 giugno non ha un solo protagonista. Ha una dozzina di interventi minori che sommati cambiano la struttura portante del sistema.

**Il de-hardcode.** Cinque script legacy in `AUTOMATIONS/tools/` avevano i path scritti in chiaro: `C:\Users\benen`. Nomi utente. Percorsi assoluti. Il sistema funzionava su quella macchina, su quella installazione, in quel momento — e sarebbe morto al primo cambio di contesto. Li hanno resi portabili. Poi li hanno rimossi del tutto, perché `register_night_tasks.ps1` li aveva già superati. Due passi: prima sanifica, poi elimina. Non il contrario.

**START_GETAC.bat.** Un launcher per il vecchio Getac — il computer da campo, robusto, che Matteo portava in giro. Puntava a `%USERPROFILE%\tools\python311`, avviava `npm run dev`, avviava il RAG. Era il modo in cui GENESIS si accendeva in movimento, prima che il sistema diventasse quello che è adesso. È rimasto nel repo come un fantasma finché qualcuno non ha guardato e ha detto: questo non serve più. Rimosso. `START_LOGIN.bat` lo ha sostituito da tempo.

Ci sono cose che si tolgono non perché non funzionino, ma perché il contesto che le rendeva necessarie non esiste più. Questa è manutenzione cognitiva — più difficile da giustificare della manutenzione tecnica, perché il codice morto non si vede, non produce errori, non fa rumore. Sta lì, silenzioso, appesantendo la mappa mentale di chiunque debba capire come funziona il sistema.

**Il RAG v4.2.** Questo è il lavoro strutturale della giornata. Il sistema di recupero informazioni passa a un chunking heading-aware: i chunk non vengono tagliati a lunghezza fissa, vengono tagliati dove il documento ha un confine semantico naturale — un heading, una sezione. Il RAG non spezza più una specifica tecnica a metà frase.

Poi: snapshot `_VAULT`. Il vault di Obsidian — le note personali, le connessioni tra idee, la rete di wikilink — entra nel perimetro del RAG come sorgente separata. Con GraphRAG-lite: i wikilink `[[nota]]` diventano archi di un grafo leggero. Il sistema non recupera solo testo — recupera relazioni.

E la cartella `_ARCHIVIO` viene esclusa dal canone. Era `_DA_ORDINARE` fino a ieri — materiale grezzo, fonti NotebookLM, appunti di transizione. Lasciarlo indicizzato significava che il RAG poteva recuperare versioni superate di decisioni come se fossero correnti. Escluderla è una scelta editoriale, non tecnica: decido cosa conta come fonte di verità.

**Il research agent v1.3.** C'era un bug silenzioso: query troppo specifiche — `CNC spindle ER20 runout tolerance` — tornavano zero risultati. Il sistema non provava varianti, non broadenava, restituiva il vuoto. La v1.3 aggiunge query broadening automatico su zero risultati, più un summary diagnostico che spiega perché la ricerca non ha trovato nulla. Non è solo una fix — è trasparenza: il sistema che dice *ho cercato così, non ho trovato nulla, ecco cosa ho provato dopo*.

---

## ATTO III — Una decisione che non è nel RAG

In mezzo a tutto questo — il cleanup, il debito tecnico, il RAG che si riorganizza — c'è un commit che pesa diversamente dagli altri.

`feat(MIMS): connettori = Via B deciso + triage notturno nel protocollo`

MIMS — il sistema modulare di connettori fisici, le tiles 190×190 in PA-GF30 — aveva un bivio aperto da settimane. Come si realizzano i connettori? Via A o Via B?

Matteo ha scelto Via B: compressione tramite VULCAN, processo proprietario B2. Il connettore viene formato per compressione diretta, non assemblato. Il blocco di silenzio — il punto in cui il connettore entra in contatto e smette di fare rumore sotto carico — viene ottenuto con geometria Ø18mm.

Questa non è una fix. Non è manutenzione. È una scelta di processo che definisce come vengono costruiti i pannelli fisici del sistema. Una volta che questa via entra in produzione, cambiare richiede rifare gli stampi, riaddestrare la procedura, riscrivere il protocollo. È il tipo di decisione che ha conseguenze a cascata per anni.

Il commit la porta a canone — la mette nel sistema cognitivo come fatto verificato, non come ipotesi aperta. Il triage notturno nel protocollo significa che anche la sequenza di controllo — cosa si fa quando un connettore non chiude, nell'ordine esatto — è documentata prima che esista il primo pezzo fisico.

Questo è il modo in cui Matteo costruisce: decide sulla carta, poi taglia il metallo. O, in questo caso, decide nel RAG, poi avvia la pressa.

---

## CHIUSURA

Sessione #45 si chiude con le critiche azzerate su tutte e tre le fonti del sidebar. La bussola ha 21 voci aperte invece di 41. Il RAG sa cosa è canone e cosa è archivio. Il sistema sa cosa è ancora valido e cosa è diventato un fantasma.

Non c'è un momento trionfale in questo. È pulizia. È la differenza tra un banco da lavoro dove sai dove metti le mani e uno dove cerchi lo strumento giusto per due minuti prima di ogni operazione.

GENESIS a 70% non significa che mancano tre decimi di funzionalità. Significa che il sistema è abbastanza coerente da fidarsi di se stesso — abbastanza da poter costruire su di lui senza dover verificare tutto da capo ogni volta. Quel 70% si è guadagnato una commit alla volta, molte delle quali non hanno aggiunto nulla di nuovo. Hanno tolto ciò che era falso.

Il terminale continua a girare. `auto: night_audit`. `auto: story_agent`.

Domani ci sarà un'altra sessione. Il sistema ricorderà tutto.

---

## reel_hook

31 critiche aperte nel sistema cognitivo. 18 erano già risolte — il sistema non lo sapeva.  
Se la mappa non si aggiorna, lavori contro una realtà che non esiste più.  
Sessione #45: burn-down, de-hardcode, RAG v4.2 heading-aware, Via B a canone.  
La prossima sessione parte da 13 critiche vere — non da 31 fantasmi.

---

## FATTI (per il RAG)

- **DECISIONE:** MIMS connettori = Via B (compressione VULCAN, processo proprietario B2), geometria Ø18mm — portato a canone in sessione #45.
- **LOGICA:** Via B garantisce il silent block per compressione diretta; il triage notturno nel protocollo documenta la sequenza di controllo prima della produzione fisica.
- **DECISIONE:** RAG v4.2 — chunking heading-aware + snapshot _VAULT + GraphRAG-lite su wikilink Obsidian; cartella `_ARCHIVIO` esclusa dal canone.
- **LOGICA:** Chunk a lunghezza fissa spezzavano contesti semantici; includere `_ARCHIVIO` faceva recuperare versioni superate di decisioni come fonti correnti.
- **DECISIONE:** Research agent v1.3 — query broadening automatico su 0 risultati + summary diagnostico.
- **LOGICA:** Query troppo specifiche (es. `CNC spindle ER20 runout`) restituivano vuoto senza fallback; la v1.3 rende il fallimento trasparente e azionabile.
- **DECISIONE:** 5 registrar legacy de-hardcodati (rimosso path `C:\Users\benen`) poi rimossi perché ridondanti con `register_night_tasks.ps1`; `START_GETAC.bat` rimosso (superato da `START_LOGIN.bat`).
- **OBIETTIVO:** GENESIS a canone coerente — bussola 41→21, critiche 31→9, RAG indicizza solo fonti verificate; prossimo step misurabile: prima tile MIMS prodotta con processo B2 Ø18mm.

---

| Campo | Valore |
|---|---|
| **Episodio** | 47 |
| **Data registrazione** | 2026-06-24 |
| **Sessioni coperte** | #44, #45 |
|