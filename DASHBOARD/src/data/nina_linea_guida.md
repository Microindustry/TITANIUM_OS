<!-- TOC -->

- [Linea guida  Nina (il progetto grande)](#linea-guida-nina-il-progetto-grande)
  - [Le fonti (chi comanda su cosa)](#le-fonti-chi-comanda-su-cosa)
  - [Il mondo in breve](#il-mondo-in-breve)
  - [I personaggi (regole che non si sgarrano)](#i-personaggi-regole-che-non-si-sgarrano)
  - [La struttura di ogni episodio (identica, sempre)](#la-struttura-di-ogni-episodio-identica-sempre)
  - [La didattica (4 principi  Pietre)](#la-didattica-4-principi-pietre)
  - [Il visivo](#il-visivo)
  - [Formato e produzione](#formato-e-produzione)
  - [Le interazioni col sistema (pareggiate  lecosistema)](#le-interazioni-col-sistema-pareggiate-lecosistema)
  - [Il terreno di sviluppo (fissato 14/07  PIANO_PRODUZIONE_NINA.md in MENTE)](#il-terreno-di-sviluppo-fissato-1407-pianoproduzioneninamd-in-mente)
  - [Le stagioni di Nina  la pipeline (14/07)](#le-stagioni-di-nina-la-pipeline-1407)
  - [Guardie QC (le falle, tutte in un posto)](#guardie-qc-le-falle-tutte-in-un-posto)
  - [Stato](#stato)

<!-- /TOC -->

# Linea guida — Nina (il progetto grande)

> IL documento operativo del binario Nina: ordina le fonti e porta in linea le regole vitali —
> un episodio si produce giusto leggendo qui; il dettaglio resta nelle bibbie. **Fonte canonica:**
> `MENTE/KNOWLEDGE/MONDO/LINEA_GUIDA_NINA.md` (v2) + `PONTE_SG_NINA.md`, indicizzate nel RAG.

**Cos'è Nina:** il diario animato di un sistema che gira davvero — raccontato da un padre-artigiano a sua figlia, una casella alla volta, dove ogni cosa è vera. Il WOW è «è VERO»: ogni potere è un nodo reale. Parla su **3 strati contemporaneamente** (bambino: la favola · curioso: il concetto · grande/papà fabbro: i FATTI) — il bambino è il primo registro, non il tetto.

## Le fonti (chi comanda su cosa)

BIBBIA_DEL_MONDO (mondo, legge, Entropia) · NINA_V2_CHARACTER_BIBLE (personaggi: look, voce, modi) · BIBBIA_VISIVA (blueprint-anime, marchio) · GUIDA_CAROSELLI (procedura, copertina §2-bis, QC) · FORMATO_EPISODIO_DOPPIO (stampo) · PERCORSO_EVOLUTIVO (didattica) · PONTE_SG_NINA (interazioni) · **INDICE_CAMMINO (⚠ unica fonte per ID e ordine EP_N2)**. In conflitto vince il più specifico e recente.

## Il mondo in breve

Due terre — **Atomi** e **Bit** — cucite dalla **Giuntura** (tesi: sono lo stesso mondo). La legge: il **Grande Loop** ⟡1 (aggiusti, impari, lasci una traccia). Il nemico: **il Disordine/l'Entropia** ⟡E — una forza, mai un cattivo con la faccia; non si sconfigge, si tiene a bada; arretra dove qualcuno costruisce. I luoghi: la Fucina (regno di FORGE) e la Mappa Viva (Nina è una pedina; le caselle imparate si colorano).

## I personaggi (regole che non si sgarrano)

- **NINA** — ~9-10 anni, **evergreen** (cresce in competenza, mai in età); il *pizzicore dietro le orecchie* quando le dicono «è così e basta»; non finge di sapere. Frasi-firma: «Perché?» · «Da dove lo sai? Mostrami.» · «È come quando…».
- **THEMIS** — la guida col calibro: semplifica per rispetto, non per pietà; socratica (regola → prova). «Controlla i fatti, non le parole.»
- **FORGE** — il fabbro: parla pochissimo, mostra col fare. «La mano deve sapere *prima*.»
- **Il Costruttore-papà** — presenza costante, mai protagonista: lascia strumenti, non risposte.
- **I NIENTE:** niente villain con la faccia · niente magia senza funzione reale · niente Nina che invecchia · niente moralismo · niente foto reali (unica eccezione: il volto generato di Nina).

## La struttura di ogni episodio (identica, sempre)

micro-recap «Dove siamo» → COLD OPEN → 3 ATTI → chiusura con open loop → SCENE/key-image → DIDATTICA → FATTI. Con: il **test della sarta** (un esempio domestico/artigiano per episodio) · il **«provalo tu»** (esperimento reale a casa) · l'open loop che tira alla casella dopo · le verità ricorrenti (*fai bene la cosa vera · non ricordare, documenta · controlla i fatti · tieni a bada il Disordine · prima la mano, poi la macchina*).

## La didattica (4 principi + Pietre)

**Spirale, non scala** (un concetto torna più in profondità, mai partire dalle equazioni) · **ripetizione spaziata** (i richiami sono progettati; Pietra muta da >5 episodi → si richiama) · **dual coding** (ogni concetto: una parola-chiave + una key-image che ricorre IDENTICA — i componenti SVG riutilizzabili) · **auto-generazione** (il «provalo tu»). Le **Pietre**: ⟡1…⟡7 = l'arco IA (Loop→Orchestrazione), le forze fuori arco = lettere (⟡E). Ogni episodio dichiara Pietre nuove e richiamate → grafo dei prerequisiti: mai usare una Pietra non posata.

## Il visivo

Blueprint-anime (schemi vivi, monoline ciano/oro su fondo scuro) · parole illustrate alla Geronimo Stilton · avatar+simbolo per entità, componenti SVG identici tra caroselli · marchio fisso intoccabile (cornice, intestazione, piede ⟡·NINA·n/N) · il PONTE attraversa le slide (nastro unico) · **caroselli RICCHI** (mai griglia a vista, mai slot vuoti) · **copertina = §2-bis** (poster: safe-zone 1:1, prova miniatura, un punto focale, titolo=gancio, griglia=collezione).

## Formato e produzione

Formato (riconciliazione 14/07): **un taglio, sempre ≤10 slide** (l'extra = carosello in più; densità per canale resta) · frontmatter motore obbligatorio (casella · competenza · prova REALE · guida · pietra · voce nina) · ciclo: stampo → grounding RAG (debole = falla, si segnala mai si inventa) → build da _TEMPLATE (mai dall'episodio precedente) → QC verde → Express → vetrina · **autonomia**: Nina genera in automatico (garanzie: grounding, canon_guard, QC, additività; eccezione PRE_01 = insieme) · i FATTI rifluiscono nel RAG.

## Le interazioni col sistema (pareggiate — l'ecosistema)

Nina **DÀ la domanda** (cameo 1-2 slide nei portanti SG 1·4·9, frasi-firma, mai narratrice) e **RICEVE i semi e le prove** (le domande diventano caselle EP_N2; la prova cita il carosello SG — stesso fatto, mai numeri diversi; uno racconta, l'altro rimanda). Pareggio persone: Nina in SG solo domanda · Matteo in EP_N2 solo Costruttore-papà. Mai le due voci nella stessa slide.

## Il terreno di sviluppo (fissato 14/07 — `PIANO_PRODUZIONE_NINA.md` in MENTE)

- **La serie PRE — 4 caroselli** (spiegare non sta in uno solo): PRE_01 *Il Mondo di Nina* (**da rifare da 0, INSIEME** — primo della rotta) · PRE_02 *Come funziona Nina* (caselle, Pietre, 3 strati — a standard quando toccato) · PRE_03 *I Personaggi* (17→16 quando toccato) · PRE_04 *Tutto è vero* (**nuovo** — il patto di verità + presenta il binario di Matteo: i preamboli si presentano a vicenda, 1 slide ciascuno).
- **Il cammino — 53 caselle → 53 caroselli doppi**: i testi esistono già (canone EP_N2, ordine da INDICE_CAMMINO); la produzione è portarli a carosello publish-ready. Prossimo dopo il preambolo: EP_N2_03 «Mille Volte Uguale» (la Misura), primo nato con lo stampo doppio. **Totale Nina: 57 caroselli** (≈912 slide complete + ≈570 social).
- **Interazioni segnate**: i cameo si producono coi portanti SG; i semi atterrano nel cammino (SG_01 → ⟡3 la Mente che parla · SG_04 → ⟡0 la Materia/misura · SG_09 → ₣1 il Valore/chiusura d'arco).
- **Cadenza**: PRE_01 insieme → PRE_02-04 anche autonome → cammino in ordine di casella, 1-2 per ciclo, parallelo con SG ammesso; a regime anche in notte autonoma.

## Le stagioni di Nina — la pipeline (14/07)

*⚠ I titoli dei caroselli successivi si adattano a come vengono i precedenti — linea guida, non regola.*

- **N1 «Il Cammino»** — PRONTA: PRE (4) + 53 caselle = 57 caroselli (testi esistenti).
- **N2 «Le Nuove Pietre»** — caselle proposte + verticale Finanza ₣. *Materiale parziale.*
- **N3 «La Fucina di FORGE»** — la saldatura vera come materia (il grafo di Matteo → curriculum Nina). *Gated: grafo HR (si alimenta con S6 di SG).*
- **N4 «Il Mondo Animato»** — l'animazione (bibbia già pronta per questo). *Gated: pipeline video/AVA.*
- **N5 «Il Libro»** — il libro del cammino, i ⟡ diventano numeri di pagina. *Gated: N1 completa.*

## Guardie QC (le falle, tutte in un posto)

slide oltre limite · wireframe/slot vuoti · non self-contained · canvas ≠ 1080×1350 · copertina fuori safe-zone o illeggibile a miniatura · frontmatter incompleto / prova non verificabile · grounding debole non segnalato · Pietra non posata usata / Pietra muta >5 ep · doppione di lezione (guardia gemelli) · ponte violato (cameo >2 slide, Nina narratrice in SG, lessico fantastico a Matteo, numeri diversi tra binari) · canone numeri (mai «recuperato»; «canale usato», mai prezzi per-pezzo) · personaggi (Nina che invecchia, villain con faccia, magia senza funzione, moralismo).

## Stato

PRE_01 da rifare (insieme) · PRE_02/03 a standard quando toccati · EP_N2_03 dopo il preambolo · cameo SG pronti nel PONTE (si producono coi portanti)
