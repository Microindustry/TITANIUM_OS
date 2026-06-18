<!-- TOC -->

- [TITANIUM_OS  Episodio 37](#titaniumos-episodio-37)
  - [La Mappa che Cammina](#la-mappa-che-cammina)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Red-Team alle 3 di mattina](#atto-i-il-red-team-alle-3-di-mattina)
  - [ATTO II  Cosa si accanisce, cosa si accontona](#atto-ii-cosa-si-accanisce-cosa-si-accontona)
  - [ATTO III  Nina cammina sulle sue regioni](#atto-iii-nina-cammina-sulle-sue-regioni)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio 37
## "La Mappa che Cammina"

*Data: 17 giugno 2026 — Sessione #37*

---

## COLD OPEN

Ore 23:14. Il dev server gira su `localhost:5174`.

Matteo apre il browser. La mappa compare — non tutta in una volta, ma *in cascata*: prima il bordo, poi le regioni, poi i nodi interni, uno dopo l'altro, come se qualcuno stesse disegnando la planimetria di un posto che esiste davvero. Hover su una regione: il colore si sposta leggermente, come se la mappa sapesse che c'è una mano vicina.

Non è un portfolio. Non è un CV.

È un sistema operativo narrativo che ha imparato a respirare.

---

## ATTO I — Il Red-Team alle 3 di mattina

Prima di poter costruire, bisogna sapere cosa si rompe.

Oggi la sessione inizia con un attacco. Non metaforico: Matteo chiama il commit *"critiche(attacco-opus 17/06)"* — red-team sistematico su tutti i fronti. Ogni sezione della dashboard viene letta come se qualcuno stesse cercando il punto di cedimento. Come fa con le saldature TIG sul titanio: non si guarda il cordone bello, si guarda dove potrebbe partire la cricca.

Il risultato: zero errori visivi nel dev server. Ma soprattutto, qualcosa di più importante.

La sezione *Critiche* aveva uno scopo dichiarato — e non lo stava rispettando. Matteo lo annota così: *"fare quello per cui è stata [creata]"*. Non una riformulazione estetica. Un recupero di funzione. Come quando una pressa torna al collaudo originale dopo una deriva produttiva di sei mesi.

Il problema non era il codice. Era che la sezione aveva smesso di fare la sua parte nel sistema.

Questo è il tipo di diagnosi che richiede di uscire dal terminale e guardare il progetto con gli occhi di qualcuno che lo usa per la prima volta — o con gli occhi di qualcuno che vuole dimostrare che non funziona.

Matteo sa fare entrambe le cose. È lo stesso meccanismo del Quality Control in officina: il pezzo deve passare anche quando sei tu a volerlo fare fuori.

---

## ATTO II — Cosa si accanisce, cosa si accontona

Nel mezzo della sessione, una decisione che sembra piccola ma non lo è.

RAG-chat e agenti: fuori dalla sidebar.

Il commit dice tutto: *"Matteo: non uso la chat RAG né gli agenti → accantonati dalla sidebar (route..."*. Non eliminati. Accantonati. La distinzione è tecnica e mentale insieme.

In un'altra fase del progetto, questa sarebbe stata una resa. Oggi è il contrario.

GENESIS è al 70%. V32 è al 65%. Il target del capannone è il 15 luglio 2030 — quattro anni, ma il calendario non si costruisce con le feature che *potrebbero* servire. Si costruisce con quelle che *servono adesso*. EVA è pending ma reale — il centro estetico di Maria non aspetta che il RAG-chat diventi elegante. Aspetta che il sistema funzioni.

Accantonare qualcosa che non usi non è un fallimento di design. È onestà di sistema.

La sidebar ora è pulita. Mappa di gioco, CV unito, pitch, critiche. Quattro voci. Tutte attive. Tutte verificate dal vivo.

C'è qualcosa di profondamente artigianale in questa scelta: la stessa logica con cui si decide quali attrezzature montare sul banco di lavoro nel locale da 12 m². Non ci sta tutto. E non deve starci tutto.

---

## ATTO III — Nina cammina sulle sue regioni

Ma il cuore della sessione #37 è la mappa.

La Mappa di Nina — percorribile, data-driven, costruita sull'asse `asse_nina` — copre le Regioni da 0 a 7, più il verticale Finanza. Otto regioni. Otto episodi dell'arco completo: da `EP_AV_M0 Materia` a `EP_AV_06 Direttore`.

Il commit `polish(mappa-gioco)` descrive due cose: *layout pieno* e *micro-interazioni leggere*. L'ingresso a cascata — ogni elemento che arriva con un ritardo minimo, nell'ordine giusto. L'hover che risponde.

Questi non sono ornamenti.

Sono il modo in cui un sistema comunica di essere vivo.

Matteo lo sa perché costruisce macchine da 178 kg che devono lavorare con precisione IT6-IT7. Sa la differenza tra un sistema che funziona e un sistema che *dà feedback* di funzionare. Il CNC non ti dice solo che ha finito il ciclo — ti dice dove si trova, a quale velocità, con quale errore di posizionamento. La mappa fa lo stesso: ti dice dove sei nell'arco di Nina, su quale regione, a quale livello della gerarchia `parent/level/children`.

153 episodi nel sistema. Build TypeScript verde.

Il numero conta. Non perché sia grande — conta perché ogni episodio è un nodo nella struttura, e tutti e 153 sono stati verificati contro lo schema. Nessuna eccezione silenziosa. Nessun nodo orfano.

È quello che si intende quando si dice che una struttura è *rebuild-safe*: non che non si rompa mai, ma che quando si tocca qualcosa si sa esattamente cosa si propaga e dove.

---

## CHIUSURA

Alle 23 passate, con il night audit automatico già partito in background e lo story agent che genera i prossimi episodi da solo, Matteo guarda la mappa sul browser.

Nina cammina. Ogni regione ha il suo colore, il suo nome, il suo posto nell'arco. L'ingresso a cascata fa il suo lavoro in silenzio — nessuna animazione aggressiva, nessun effetto che distrae. Solo il sistema che si rivela nell'ordine in cui è stato costruito.

C'è qualcosa di strano nel costruire un sistema narrativo mentre costruisci fisicamente una macchina CNC in cantina. Uno è atoms, l'altro è bits. Ma la logica è identica: corpi unici, strutture rebuild-safe, nessun nodo orfano, feedback che comunica stato.

Il capannone è il 15 luglio 2030.

Per arrivarci bisogna che ogni pezzo del sistema sappia dove si trova.

Oggi, la mappa lo sa.

---

## reel_hook

153 episodi nel sistema. Build TypeScript verde. Oggi ho accantonato RAG-chat e agenti — non perché non funzionino, ma perché non li uso. La sidebar ora ha quattro voci. Tutte attive. La mappa di Nina entra in cascata e risponde all'hover. Qualcuno mi spieghi perché un sistema da 178 kg in cantina e uno narrativo su `localhost:5174` usano esattamente la stessa logica di collaudo.

---

## FATTI (per il RAG)

- **DECISIONE:** RAG-chat e agenti rimossi dalla sidebar della dashboard GENESIS (route accantonata, non eliminata).
- **LOGICA:** Matteo non utilizza attivamente queste feature nel workflow reale → presenza in UI genera rumore senza valore operativo; EVA è il prossimo deployment reale.
- **DECISIONE:** Mappa di Nina implementata come sistema data-driven sull'asse `asse_nina`, Regioni 0-7 + verticale Finanza, navigabile nel dev server Vite `localhost:5174`.
- **LOGICA:** L'arco NINA COMPLETO 8/8 (`EP_AV_M0` → `EP_AV_06 Direttore`) richiede struttura percorribile, non solo enumerazione — gerarchia `parent/level/children` garantisce rebuild-safe su 153 episodi verificati.
- **DECISIONE:** Red-team sistematico (critiche(attacco-opus 17/06)) su tutta la dashboard prima del polish finale; sezione Critiche riportata alla sua funzione originale.
- **OBIETTIVO:** Dashboard pronta per il prossimo sprint EVA (WhatsApp automation Maria) + sessione #38 su MIMS o V32 (65% → prossimo milestone fisico).

---

| Campo | Valore |
|---|---|
| **Episodio** | S1E37 |
| **Data** | 2026-06-17 |
| **Progetto primario** | GENESIS / Dashboard |
| **Tag** | `mappa-nina` `dashboard` `red-team` `UI` `data-driven` `rebuild-safe` |
| **Stato V32** | 65% |
| **Stato GENESIS** | 70% |
| **Commit count sessione** | ~7 |
| **Build** | TS verde, 153 ep |
| **Prossimo step** | EVA deployment reale / sessione #38 |