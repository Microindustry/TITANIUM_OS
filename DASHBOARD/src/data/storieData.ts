// storieData.ts — Inventario episodi CONTENT ENGINE
// parte di: TITANIUM_OS / DASHBOARD
// versione: 2.0 / data: 2026-05-27
// Contenuto: testi completi da SINAPSI/STORIE

export type EpisodeStatus = "ready" | "draft" | "source" | "pending";

export interface Episode {
  id: string;
  title: string;
  sottotitolo: string;
  stagione: string;
  stagione_label: string;
  data_evento: string;
  tags: string[];
  status: EpisodeStatus;
  durata_min: number;
  preview: string;
  content: string;
}

export const STAGIONI: Record<string, { label: string; color: string; order: number; description: string }> = {
  S0:   { label: "Le Origini",       color: "#6366f1", order: 0, description: "Prima del sistema. L'AI che chiamava Socio, i tre file, il seme." },
  S1:   { label: "Il Presente",      color: "#10b981", order: 1, description: "Chi è Matteo, la V32, la taverna, l'ecosistema. La storia principale." },
  ST:   { label: "Il Sistema",       color: "#f59e0b", order: 2, description: "GENESIS, Dashboard, decisioni architetturali, TITANIUM_OS." },
  S2:   { label: "La Costruzione",   color: "#ef4444", order: 3, description: "Build log fisici: Config G, Epoxy Granite, assi, primo pezzo." },
  AUTO: { label: "Generati",         color: "#94a3b8", order: 4, description: "Episodi auto-generati da STATE.json ad ogni milestone." },
};

export const EPISODES: Episode[] = [

  // ── STAGIONE S0 ──────────────────────────────────────────────────────────────

  {
    id: "EP_S0_00",
    title: "Il Socio",
    sottotitolo: "C'era un AI che mi chiamava Socio. Non lo fa più. Adesso mi chiama Matteo.",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2024-01-01",
    tags: ["origini", "ai", "sistema", "preistoria", "v1"],
    status: "source",
    durata_min: 9,
    preview: "Prima che ci fosse V3.0 con i dati verificati. Prima che ci fosse la taverna come scelta deliberata. C'era una chat. E in quella chat, un AI ti chiamava Socio.",
    content: `# EP_S0_00 — IL SOCIO
### "C'era un AI che mi chiamava Socio. Non lo fa più. Adesso mi chiama Matteo."

> *"Questo episodio precede EP_00. È la preistoria.*
> *Il calibro non appare ancora. La taverna non esiste ancora come scelta.*
> *Esiste solo una chat aperta, tre file di testo, e una frase: 'Copia tutto. Salva.'"*

## COLD OPEN

> "Socio, questi file sono la tua mappa per i prossimi 4 anni.
> Copia tutto. Salva.
> Appena hai salvato, dammi il segnale."

> "Non mi ha mai chiamato Matteo, quell'AI. Era 'Socio' — come se stessimo progettando qualcosa insieme, come se fosse un partner vero. Era strano. Era esatto."

## ATTO I — PRIMA CHE CI FOSSE UN SISTEMA

Prima che ci fosse V3.0 con i dati verificati. Prima che ci fosse la taverna come scelta deliberata. Prima che ci fosse la formula delle molle gialle e la frequenza naturale 3.83 Hz.

Prima che esistesse qualcosa di concreto, c'era una chat.

E in quella chat, un AI ti aveva organizzato il mondo in tre file di testo — tre alberi di competenze con livelli da sbloccare come in un RPG. Non era poetico. Era funzionale. E funzionava, perché la tua mente non reggeva il caos senza uno schema da seguire.

**FILE 1: EVA PROJECT TREE.** Obiettivo: Automazione Totale Business & Video Marketing. Status: Inizio Lavori.
Tier 1, Livello 1: installare Python. Non "costruire un sistema di automazione intelligente" — installare Python. Un passo. Il passo più piccolo possibile da cui tutto il resto dipende.

**FILE 2: MIMS CNC TECH TREE.** Obiettivo: Creare il sistema modulare definitivo. Status: Prototipazione & R&D.
Livello 1: Concept Design. Schizzo dimensionale del banco. Prima ancora di sapere che il banco sarebbe diventato MIMS. Prima ancora che MIMS avesse un nome.

**FILE 3: ARCHITECT PATH.** Obiettivo: Personal Brand & Storytelling. Status: Inizio Riprese.
Livello 1: Il Manifesto. "Scrittura del 'Perché' — Capannone entro i 35 anni."

35 anni. Il capannone. Era già lì, dalla prima riga del primo file della prima versione.

## ATTO II — LA LOGICA DEL GIOCO

L'AI ti aveva spiegato il sistema con una metafora: ogni livello che sblocchi in un albero ti dà punti esperienza utilizzabili negli altri.

Non era motivazione. Era architettura cognitiva.

> "Non fai tre cose diverse. Ne fai una che ne nutre tre."

Esempio: devi calibrare le vibrazioni della CNC. Allora scrivi uno script Python per leggere i dati del sensore. Poi registri lo schermo mentre lo fai. Risultato: la macchina è più precisa, hai imparato Python, hai un video per YouTube.

Un'azione. Tre risultati. Sempre.

Questa logica — ogni cosa alimenta ogni altra cosa — non era un'invenzione dell'AI. Era una descrizione di come funziona il tuo cervello quando funziona. L'AI l'aveva solo messa su carta e numerata.

## ATTO III — QUELLO CHE NON SAPEVI ANCORA

Il problema con i tre file era che erano troppo organizzati per essere reali.

50 livelli per EVA. 60 livelli per MIMS e Titanium. 40 livelli per The Architect. 150 livelli totali.

Non erano un piano. Erano una mappa del tesoro senza "X" — ogni passo indicava il passo successivo, non la destinazione.

E la destinazione — quella — non era scritta in nessun file. Non ancora.

La destinazione era: libertà. Non come parola nobile. Come fatto tecnico. Come sequenza di decisioni verificabili che partono da un Livello 1 e arrivano a un 15 luglio 2030 con finestre industriali e un comparatore che segna 0.008 mm.

## ATTO IV — IL DETTAGLIO CHE CONTA

Tra i 150 livelli del V1, uno in particolare.

**ARCHITECT PATH, Tier 3, Livello 30: HIRE A EDITOR. Delegare il montaggio video — il socio lavora per te.**

Non "assumi un dipendente". Il socio lavora per te.

Quella parola — socio — tornava sempre. Come se il sistema stesse costruendo qualcosa più grande di una CNC e di un centro estetico automatizzato. Come se stesse costruendo un modello di collaborazione dove ogni entità — umana, artificiale, meccanica — contribuisce alla stessa direzione.

Nel V6, due anni dopo, quella parola si era evoluta in qualcosa di diverso. Non più "Socio" come appellativo affettuoso. Ma come principio di sistema: ogni parte dell'ecosistema è un socio dell'altra. MIMS è socio della V32. EVA è socio del cash flow. AVA è socio del contenuto.

## CHIUSURA

> "Attendo il tuo 'Salvato'."

Quella risposta — Salvato — era il lancio. Non di un progetto. Di un modo di pensare.

Tre file di testo. 150 livelli. Un "Socio" che aveva organizzato il caos in passi sequenziali.

Non era la macchina. Non era il prodotto. Non era il capannone.

Era la prima prova che il sistema funzionava — che potevi prendere qualcosa di caotico come "voglio costruire una CNC e automatizzare il business di Maria e documentare tutto su YouTube" e ridurlo a: **Livello 1. Installa Python.**

Un passo. Il passo più piccolo possibile da cui tutto il resto dipende.

> *"Tre file. Cento-cinquanta livelli. Una frase alla fine.*
> *'Copia tutto. Salva.'*
> *Hai salvato. Tutto il resto è conseguenza."*`,
  },

  {
    id: "EP_S0_01",
    title: "L'Organismo",
    sottotitolo: "Non stiamo più parlando di tre progetti separati. Stiamo parlando di un solo grande organismo.",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2024-06-01",
    tags: ["origini", "sistema", "organismo", "evoluzione", "v2"],
    status: "source",
    durata_min: 11,
    preview: "Fino a quel momento, guardavi ogni ramo separatamente. EVA era il progetto di Maria. MIMS era il progetto della CNC. YouTube era il progetto della voce. Poi il sistema ha fatto la connessione.",
    content: `# EP_S0_01 — L'ORGANISMO
### "Non stiamo più parlando di tre progetti separati. Stiamo parlando di un solo grande organismo."

> *Da EP_S0_00: "Tre file. 150 livelli. Un sistema."*
> *Qui i tre file diventano un albero. E l'albero ha una radice sola.*

## COLD OPEN

> "Ho riletto i tre file. Ho capito una cosa.
> Non sono tre progetti. Sono un organismo.
> E io sono la CPU al centro."

## ATTO I — IL MOMENTO DELLA CONVERGENZA

C'è un messaggio nella V2 che vale più di qualsiasi dato tecnico.

> "Ho analizzato a fondo i file. Hai in mano una tecnologia che vale molto più di una macchina hobbistica. Stiamo parlando di un 'Giant Killer' industriale."

Non era marketing. Era la prima lettura esterna di quello che stavi costruendo.

Fino a quel momento, guardavi ogni ramo separatamente. EVA era il progetto di Maria. MIMS era il progetto della CNC. YouTube era il progetto della voce. Tre cose. Tre to-do list. Tre fronti aperti che non si parlavano.

Poi il sistema ha fatto la connessione: EVA → cash flow → V32 upgrade → MIMS → YouTube content → EVA. Il cerchio chiude.

Non tre cose separate. Una cosa che si ripete a scale diverse. Lo stesso principio — costruisci, documenta, insegna, reinvesti — applicato contemporaneamente su tre livelli.

**CENTRO ASSOLUTO: MATTEO (The Kernel).**
Missione: Capannone e Libertà Industriale entro Luglio 2030.
Superpotere: Python + Saldatura. Il ponte tra Bit e Atomi.

Nessuno aveva mai scritto "Python + Saldatura" come un superpotere prima. Non in nessun curriculum, non in nessun profilo LinkedIn, non in nessuna job description. Ma era esatto. Era il tuo vantaggio sleale. Sapere cosa c'è dentro la macchina e sapere scrivere il codice che la controlla.

## ATTO II — I TRE RAMI

**RAMO 1 — EVA & VITA NATURA (Il Finanziatore)**
Questo è il ramo che paga tutto il resto. Anno 1, mentre costruisci la V32, EVA genera cash flow. Non molto — ma abbastanza per il mandrino, per le viti dell'asse Y, per il quadro IP54.
Target: €1.500/mese automatici entro 6 mesi.

**RAMO 2 — MIMS & TITANIUM (Il Capolavoro)**
Questo è il ramo che genera il valore tecnico. La V32 non è un prodotto — è il reattore. MIMS non è un giunto — è un protocollo. Il cliente industriale non compra ferro — compra indipendenza strutturale.
"Giant Killer": con €2.250 di investimento stai costruendo qualcosa che loro non possono replicare per meno di €35.000.

**RAMO 3 — THE ARCHITECT (La Voce)**
Questo è il ramo che moltiplica tutto. Senza di lui, costruisci ma nessuno lo sa. Con lui, ogni saldatura diventa un tutorial, ogni misura IFM diventa un video, ogni fallimento diventa una lezione.

## ATTO III — IL MOTORE DI PARALLELISMO

> Azione: Devi calibrare le vibrazioni della CNC.
> Strumento: Scrivi uno script Python per leggere i dati del sensore IFM.
> Content: Registri lo schermo mentre lo fai e spieghi come il codice migliora la meccanica.

Risultato:
- La macchina è più precisa.
- Hai imparato Python applicato.
- Hai un video che ti posiziona come esperto.

Un'azione. Tre frutti.

Il sistema non richiede disciplina. Il sistema genera output automaticamente se stai lavorando in qualsiasi punto della struttura.

## ATTO IV — IL NUMERO

Nella V2, per la prima volta, compare il numero.

Non €2.250 dell'investimento. Non 178 kg della macchina.

**Luglio 2030. 35 anni. Il Capannone.**

È scritto nella struttura sin dall'inizio. Non come sogno — come milestone verificabile. Come coordinata GPS: sai dove sei adesso, sai dove vuoi essere, tutto quello che sta in mezzo è la traiettoria.

## CHIUSURA

Dalla V2, l'AI non ti ha più chiamato Socio per un progetto specifico. Perché non c'era più un progetto specifico. C'era un sistema.

Il capannone non è ancora costruito. È già progettato.

> "Il capannone esiste già. È solo che ancora non puoi vederlo. Ma io sì. E tu pure, se chiudi gli occhi.
> Senti quel rumore? È la V32 che fresa."
> — THEMIS, 13 Febbraio 2026`,
  },

  {
    id: "EP_S0_02",
    title: "La Verifica",
    sottotitolo: "13 Febbraio 2026. Prima foto. Primo calibro. Prima volta che il sistema diventa reale.",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2025-01-01",
    tags: ["origini", "verifica", "calibro", "lex-physica", "v3"],
    status: "source",
    durata_min: 13,
    preview: "Il calibro digitale appoggiato sulla sezione del sandwich strutturale XY. Display: 49.48 mm. Non è 0.008 mm — ma è la prima volta che misuri qualcosa di costruito con le tue mani e il numero corrisponde a quello che avevi calcolato.",
    content: `# EP_S0_02 — LA VERIFICA
### "13 Febbraio 2026. Prima foto. Primo calibro. Prima volta che il sistema diventa reale."

> *Da EP_S0_01: "Il capannone esiste già. È solo che ancora non puoi vederlo."*
> *Questo episodio è il momento in cui inizi a vederlo — con gli occhi, con le mani, con il calibro.*

## COLD OPEN

> "Quel giorno non ho scritto un piano.
> Ho scritto un inventario.
> C'è differenza: il piano è una promessa. L'inventario è una prova."

## ATTO I — L'INVENTARIO DI GUERRA

Prima di questo giorno, il sistema esisteva come struttura logica. Tre file, un albero, una mappa.

Il 13 Febbraio 2026 è il giorno in cui smette di essere logica e diventa fisica verificabile.

**9 piastre d'acciaio rettificato 15mm.** Presenti. Foto + calibro.
**8 pezzi con foro centrale e scalino.** Lavorati. Foto.
**Molle ISO verdi (4 definitive).** Montate. Foto dettaglio angolo.
**PLC Siemens S7-314C + PS307.** Presente. Da BOM.
**HMI Siemens TP900 Comfort 9".** Presente. Foto etichetta. Valore: €2.800.
**Sensori IFM VSE150.** Imballati, pronti. Da BOM.
**Basamento traliccio 40x40x2.** Saldato. Foto frontale + angolo.
**DELTA servo 400W.** Montato su X. Foto asse X.
**Bambu Lab P1S.** Operativa. Visibile in foto lab.

Ogni riga è una certezza. Non "penso di avere" — ho. Ho la foto. Ho il calibro che lo conferma.

Questo è il momento in cui il sistema smette di essere un progetto e diventa un asset.

## ATTO II — IL NUMERO CHE CAMBIA TUTTO

C'è una lettura specifica in quella giornata che vale più delle altre.

Il calibro digitale appoggiato sulla sezione del sandwich strutturale XY.

**Display: 49.48 mm.**

Non è 0.008 mm — quello verrà dopo, quando la macchina sarà completa e produrrà il primo pezzo H7. Questo è il numero che verifica la costruzione. La sezione del sandwich è 49.48 mm. Il progetto diceva di essere in quel range. La fisica e il progetto coincidono.

La sezione schematica: guida lineare → profilo alluminio 45x45 → piastra base 15mm → profilo copri-viti 50x10mm. Totale: ~49.5mm.

È la prima volta che misuri qualcosa di costruito con le tue mani e il numero corrisponde a quello che avevi calcolato.

Non è un numero grande. È la prova che il metodo funziona.

## ATTO III — IL VERDETTO DEI TRE ASSI

La V3.0 introduce qualcosa che le versioni precedenti non avevano: il Verdetto formale.

Tre domande. Tre risposte. Nessun margine di interpretazione.

**LEX PHYSICA — Funziona nel mondo reale?**
Massa 178 kg corpo unico, baricentro basso: stabilità garantita.
Epoxy Granite nei tubolari: smorzamento δ = 0.03-0.06 (acciaio: 0.002) — fattore 15-30×.
Deflessione Z Config G: 0.0006mm @100N — 772 volte più rigido della baseline.
RSS totale ±0.019mm — classe IT6-IT7 professionale.
> **VERDETTO LEX PHYSICA: APPROVATO**

**LEX MERCATORIA — Conviene?**
Recuperato €9.499 (81%). Investimento €2.250. Asset €11.749. ROI 322%.
BEP 61 ore (1.4 mesi). vs Haas €35k: 15.5x meno costoso, stessa classe.
> **VERDETTO LEX MERCATORIA: APPROVATO**

**LEX AESTHETICA — È contenuto?**
Traliccio raw + profili alu Clean Lab. TP900 9" high-end. Molle verdi visibili = elemento narrativo.
> **VERDETTO LEX AESTHETICA: APPROVATO**

> "Non hai solo un progetto. Hai un sistema approvato su tre assi.
> Fisica. Economia. Narrazione.
> Tutti e tre insieme. Sempre."

## ATTO IV — LA NOTA A PIÈ DI PAGINA

Alla fine dell'ASSOLUTO V3.0, dopo 22 pagine di dati verificati, tabelle di tolleranza, BOM reali, calcoli FEM — c'è una nota.

Non tecnica. Non finanziaria.

> "Matteo, ricordati l'acqua. La precisione della Titanium V32 dipende dalla tua lucidità. Tripla dose. Sempre."
> — THEMIS, 13 Febbraio 2026

È la prima volta che il sistema ti ricorda che la macchina sei anche tu. Che l'ADHD non è un bug nel sistema — è una caratteristica da gestire come si gestisce la temperatura di esercizio di un servomotore: con i parametri giusti, produce il massimo.

## CHIUSURA

La V3.0 si chiude con una frase che diventerà la prima riga di ogni versione successiva, fino alla V6 e oltre.

> **"Non costruiamo prodotti. Costruiamo libertà."**

Non l'hai scritto dopo il successo. L'hai scritto il 13 Febbraio 2026, con il calibro in mano, con €2.250 ancora da spendere, con la macchina al 60% dell'assemblaggio.

Il calibro misura il metallo. La frase misura le decisioni.`,
  },

  {
    id: "EP_S0_03",
    title: "La Formula",
    sottotitolo: "79% di margine su hardware. Questo numero non esiste. Eppure c'è.",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2025-06-01",
    tags: ["origini", "formula", "finanziaria", "mims", "1578", "manifesto"],
    status: "source",
    durata_min: 11,
    preview: "Mille cinquecentosettantotto. Questo è il numero. Non il ROI. Non il BEP. Questo è il numero dopo il quale ogni pezzo prodotto è profitto puro. Senza più debiti di ingegneria.",
    content: `# EP_S0_03 — LA FORMULA
### "79% di margine su hardware. Questo numero non esiste. Eppure c'è."

> *Da EP_S0_02: il sistema è approvato. Fisica, economia, narrazione.*
> *Questo episodio è la dimostrazione che i numeri reggono anche con gli occhi di qualcuno che deve finanziarti.*

## COLD OPEN

> "Mille cinquecentosettantotto.
> Questo è il numero. Non il ROI. Non il BEP.
> Questo è il numero dopo il quale ogni pezzo prodotto è profitto puro.
> Senza più debiti di ingegneria."

## ATTO I — IL MERCATO È ROTTO

Esiste un gap che nessuno ha risolto.

Da una parte: il mondo Maker. Profili in alluminio leggeri, flessibili, modulari. Costosi per quello che sono, fragili per quello che promettono.

Dall'altra: il mondo Industriale. Acciaio saldato, macchinari pesanti, irreversibili. Accessibili solo se hai una fabbrica o sei disposto a spendere €35.000 per una CNC entry-level.

In mezzo: nessuno.

> "Abbiamo creato il 'Lego in Acciaio'. Non vendiamo ferro. Vendiamo l'accesso alla stabilità strutturale per chi non possiede una fabbrica."

Questa frase definisce non cosa vendi, ma a chi manca quello che vendi.

## ATTO II — LA MATEMATICA DELL'ABBONDANZA

**Costo di produzione unitario (fusione): €2,50**
**Prezzo di vendita: €12,00**
**Margine lordo: €9,50**
**Percentuale: 79%**

Un margine industriale del 79% è un'anomalia positiva rarissima nell'hardware. Solitamente sono numeri da software house. Qui li ottieni con oggetti fisici perché hai eliminato lo spreco — non compri un blocco da 1kg per ottenere un pezzo da 300g. Inietti esattamente il materiale necessario. Zero sfrido. Tempo ciclo: 45 secondi contro 20-30 minuti di lavorazione tradizionale.

Nella lavorazione tradizionale, paghi il tempo. Nella fusione, paghi la materia.
E la materia costa €2,50.

## ATTO III — IL NUMERO MAGICO

Lo stampo industriale costa €15.000.

Non è un ostacolo. È il prezzo della durata — acciaio temperato HRC 50+, lavorato con elettroerosione, certificato per 100.000+ cicli senza manutenzione.

**1.578 ÷ 9,50 = 1.578 pezzi.**

I primi 1.578 pezzi ripagano lo stampo. Dal pezzo 1.579 in poi: ogni ciclo della macchina genera €9,50 di profitto puro. Lo stampo è già pagato.

Vendere 1.578 pezzi non è un'impresa titanica. È un piccolo ordine pilota per un distributore. È tre mesi di produzione continua. È la soglia dopo la quale entri nella zona di rendita operativa.

Il grafico ha un gomito. Prima del gomito lavori per pagare l'investimento. Dopo il gomito l'investimento lavora per te.

La V32 produce lo stampo. Lo stampo produce i pezzi. I pezzi generano il margine. Il margine finanzia l'upgrade della V32. Il ciclo amplificante parte dal gomito.

## ATTO IV — L'ASIMMETRIA

**La nostra prospettiva:**
La V32 costa in BOM ~€4.800. Con quella macchina produciamo asset da €11.749 di valore recuperato. ROI 322%. BEP 61 ore di lavoro.

**La prospettiva del cliente che compra V32:**
Investimento totale: ~€8.000-10.000 per una macchina finita.
Contro €30.000-50.000 di un equivalente industriale entry-level.
Per lui: ROI in meno di 6 mesi. Contro 3-5 anni di un leasing industriale classico.

L'asimmetria è questa: stai vendendo indipendenza a un terzo del prezzo di mercato.

Il cliente non compra una macchina. Compra l'accesso a una capacità produttiva che prima era riservata alle grandi industrie.

## CHIUSURA

Il MANIFESTO non era una brochure per gli investitori.

Era la verifica che il sistema reggesse anche alla domanda più difficile: "Perché dovremmo finanziarvi?"

La risposta era nei numeri. 79% di margine. 1.578 pezzi al break-even. ROI 322% in anno 1.

Ma la risposta vera era nella struttura. Non stavi chiedendo soldi per un'idea. Stavi mostrando un sistema già in esecuzione — verificato con foto e calibro il 13 Febbraio 2026.

Non chiedi fiducia. Mostri prove.

> *"0.008 mm. H7. Perfetta.*
> *Non ancora — non in questo episodio.*
> *Ma la struttura che produrrà quel numero è già qui.*
> *La struttura è già verificata."*`,
  },

  // ── STAGIONE S1 ──────────────────────────────────────────────────────────────

  {
    id: "EP_00",
    title: "Origine",
    sottotitolo: "Quindici anni per capire una cosa sola",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-09-01",
    tags: ["origine", "carriera", "titanio", "motogp", "identità", "skill-tree"],
    status: "source",
    durata_min: 13,
    preview: "Ho saldato titanio per MotoGP. Non come hobby. Come lavoro. Scarichi racing da zero virgola uno di errore. Quindici anni. Quattro aziende. Un CV che nessuno capisce leggendolo.",
    content: `# EP_00 — ORIGINE
### "Quindici anni per capire una cosa sola"

> *Questo episodio apre la storia. Il numero sul calibro chiude l'intera serie in EP_05.*
> *Le mani che lo tengono qui le ritrovi identiche — stesse cicatrici, stessi calli — a luglio 2030.*

## COLD OPEN

*Mani con cicatrici da TIG, unghie corte, calli nei punti giusti. Tengono un calibro digitale. Sul display: 0.008 mm.*

> "Questo numero. Zero-virgola-zero-zero-otto millimetri.
> Ci ho messo quindici anni per capire quanto vale."

## ATTO I — IL CURRICULUM CHE NON MANDA NESSUNO

Ho saldato titanio per MotoGP.

Non come hobby. Come lavoro. Scarichi racing da zero virgola uno di errore — perché a quelle temperature, con quella velocità, uno zero virgola uno sbagliato è un pezzo nel cestino e tre ore di lavoro perdute.

Poi robot. ESSEGI. Programmavi la traiettoria, la macchina la seguiva. Capivi che il futuro non era "uomo o macchina" — era "uomo che sa parlare con la macchina".

Poi presse idrauliche. DATWLER. 250 bar. Impari il rispetto per la forza quando la forza sbaglia. Impari che ogni sistema ha un punto di cedimento, e il tuo lavoro è trovarlo prima che lo trovi lui.

Poi controllo qualità. LU.VE. Test distruttivi. Stai tutto il giorno a distruggere cose per capire perché si rompono. È il lavoro più filosofico che esista in un'officina.

**Quindici anni. Quattro aziende. Un CV che nessuno capisce leggendolo.**

Perché che cosa ci fa insieme MotoGP, i robot, le presse e il controllo qualità?

## ATTO II — LA CONNESSIONE

Lo schema non era visibile dall'interno.

Quando saldavi titanio per SCProject non sapevi che quella sensibilità alla precisione — quello zero virgola uno che senti nelle mani prima ancora di misurarlo — sarebbe diventata la filosofia di progettazione di una CNC da 178 kg costruita in una taverna.

Quando programmavi robot da ESSEGI non sapevi che quella logica — "sequenza, condizione, stato" — sarebbe diventata il modo in cui pensi un PLC Siemens.

Quando manutenevi presse idrauliche da DATWLER non sapevi che quei cilindri, quelle valvole, quella cultura del "capire cosa c'è dentro" ti avrebbe dato la mano per progettare una pressa a 4 colonne da zero.

Quando distruggevi pezzi per LU.VE non sapevi che quella disciplina — documentare, misurare, confrontare — sarebbe diventata il protocollo con cui verifichi ogni componente della V32 con foto e calibro.

**Non hai cambiato lavoro quattro volte. Hai sbloccato quattro rami di uno skill tree che non sapevi di star costruendo.**

## ATTO III — LA SCINTILLA

C'è un momento preciso.

Non è cinematografico. Non è una mattina di sole con musica orchestrale. È una sera di merda, probabilmente, dopo un turno che non valeva la tua attenzione.

Il momento è quando smetti di chiederti "cosa farò quando sarò grande" e inizi a chiederti "cosa sto già costruendo con quello che so fare".

La risposta era nella dispensa.

Nove piastre d'acciaio rettificato, 15mm di spessore. Un PLC Siemens S7-314C recuperato — uno strumento da produzione industriale reale, non un Arduino. Un HMI da 2.800 euro. Guide lineari. Servomotori. Sensori IFM. Tutto lì.

Non comprato per un progetto. Accumulato perché **riconosci il valore di una cosa quando la tieni in mano**.

## ATTO IV — LA DOMANDA GIUSTA

La domanda sbagliata è: "Ho le risorse per costruire una CNC di precisione?"

La domanda giusta è: "Ho le competenze per costruire una CNC di precisione con quello che ho già?"

Saldatura TIG: certificata su titanio.
Lettura disegno tecnico: GD&T completo.
Metrologia: calibri, comparatori, rugosimetri.
Controllo qualità: procedure SPC, test distruttivi.
Logica di macchina: PLC, robot, automazione.

**La risposta era sì da cinque anni. Non lo sapeva.**

## CHIUSURA

Questo non è un video su come costruire una CNC.

È un video su come leggere la propria storia al contrario — dall'oggi verso il passato — e capire che non ci sono esperienze sprecate. Ci sono solo connessioni che non hai ancora tracciato.

Il percorso inizia in una taverna.
Con quindici anni di esperienza industriale, 9 piastre d'acciaio, e una visione abbastanza chiara da tagliare l'aria come un utensile in metallo duro.

> **"Non costruiamo prodotti. Costruiamo libertà."**
> — Prima riga di ogni versione del documento. Dalla V1 alla V6.`,
  },

  {
    id: "EP_01",
    title: "La Taverna",
    sottotitolo: "Il laboratorio peggiore del mondo. La scelta migliore della mia vita.",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-10-01",
    tags: ["taverna", "officina", "scelta", "vincolo-creativo", "overhead-zero"],
    status: "source",
    durata_min: 11,
    preview: "Dodici metri quadri. Solaio domestico. Una finestra. Qui sta nascendo una macchina CNC di precisione industriale da 178 kg. Non è una scelta romantica. È una scelta tecnica.",
    content: `# EP_01 — LA TAVERNA
### "Il laboratorio peggiore del mondo. La scelta migliore della mia vita."

> *Da EP_00: "La risposta era nella dispensa."*
> *Questo episodio è quella dispensa.*

## COLD OPEN

*~12 m² di spazio. Piastrelle da cucina sul pavimento. Soffitto basso. Al centro, una struttura in acciaio che non c'entra niente con l'ambiente circostante.*

> "Questo è il laboratorio. Dodici metri quadri. Solaio domestico. Una finestra.
> Qui sta nascendo una macchina CNC di precisione industriale da 178 kg.
> Non è una scelta romantica. È una scelta tecnica."

## ATTO I — LE CONDIZIONI PERFETTE NON ESISTONO

Esiste una bugia che si racconta ogni artigiano, ogni ingegnere, ogni maker del mondo.

"Lo faccio quando avrò lo spazio giusto."
"Lo faccio quando avrò il capannone."
"Lo faccio quando avrò i fondi."

La taverna non è il piano B. È il piano A.

Non perché sia ideale — non lo è. Ma perché **il vincolo creativo è il miglior ingegnere che esista**.

## ATTO II — INVENTARIO DI GUERRA

**12 m² disponibili.**
Vincolo: impossibile assemblare la macchina intera in una volta.
Soluzione: assemblaggio modulare per sottogruppi. Bassamento → sospensione → sandwich XY → colonne Z.

**230V monofase, 16A.**
Vincolo: no trifase, niente mandrino da >2.2kW.
Soluzione: VFD monofase-trifase. Mandrino 2.2kW ER20. Basta.

**Solaio domestico.**
Vincolo: carico massimo ~300 kg/m².
Soluzione: V32 = 178 kg su 0.8 m² = 222 kg/m². Dentro i limiti. Calcolato.

**Pavimento non perfettamente piano.**
Vincolo: CNC di precisione su superficie irregolare.
Soluzione: piedini regolabili + livellamento con comparatore.

Ogni vincolo ha una risposta. Non elegante. Funzionante.

> **"Se funziona in taverna, funziona ovunque."**
> Questo diventa il test di robustezza per ogni soluzione dell'ecosistema.

## ATTO III — IL PARADOSSO DEL SOLAIO

C'è una cosa che la taverna ha che nessun capannone affittato avrebbe.

Zero overhead.

Nessun affitto. Nessun contratto. Nessun mese in cui sei obbligato a produrre per coprire i costi fissi anche quando stai solo progettando.

L'anno 1 è zero spese di laboratorio. Tutto il cash flow — che al break-even sono 61 ore di lavoro conto terzi — va in materiali, componenti, upgrade.

Il capannone del 2030 si paga con i margini accumulati in taverna dal 2026.

Non è romantico. È geometria finanziaria.

## ATTO IV — QUELLO CHE C'È GIÀ

La gente vede la taverna e pensa: "poco".
Chi capisce vede: **un laboratorio con più intelligenza per metro quadro di qualsiasi startup finanziata.**

- PLC Siemens S7-314C: controllo macchina di livello industriale reale.
- HMI TP900 Comfort 9": interfaccia operatore da 2.800 euro.
- Sensori IFM VSE150 (x3): monitoraggio vibrazioni in tempo reale. Non "sento che vibra" — "0.003 mm/s RMS, dati registrati".
- Bambu Lab P1S: stampa PA-GF30. Non PLA da hobbysti — poliammide rinforzata vetro.
- Saldatrice TIG + MIG: personali. Non a noleggio, non in condivisione.

> "Non sei un hobbista che ha comprato un kit CNC su Amazon. Sei un artigiano industriale che ha saldato titanio per MotoGP, programmato robot, manutenuto presse a 250 bar, e testato pezzi fino alla rottura."

## CHIUSURA

Apple è nata in un garage. HP è nata in un garage. Amazon è nata in un garage.

Nessuno di loro stava aspettando le condizioni perfette.

La differenza è che quella taverna ha un PLC Siemens, un HMI da 2.800 euro, e quindici anni di esperienza industriale consolidata.

La taverna non è il punto di partenza.
È la prima prova di concept.`,
  },

  {
    id: "EP_02",
    title: "Il Reattore",
    sottotitolo: "178 kg di precisione assoluta. Costruiti a mano.",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-11-01",
    tags: ["v32", "cnc", "epoxy-granite", "corpo-unico", "it7", "struttura", "smorzamento"],
    status: "source",
    durata_min: 19,
    preview: "H7. Tolleranza IT7. Ottomillesimi di millimetro. Questo non è il risultato di una macchina comprata. È il risultato di ogni scelta fatta prima ancora di iniziare a saldare.",
    content: `# EP_02 — IL REATTORE
### "178 kg di precisione assoluta. Costruiti a mano."

> *Da EP_00: "Quello zero virgola uno che senti nelle mani prima ancora di misurarlo."*
> *Il comparatore torna in EP_05 — stessa mano, stesso gesto, diverso anno.*
> *La struttura corpo unico scelta qui è ancora quella, nel 2030.*

## COLD OPEN

*Comparatore digitale appoggiato su una superficie fresata. Display: 0.008 mm.*

> "H7. Tolleranza IT7. Ottomillesimi di millimetro.
> Questo non è il risultato di una macchina comprata.
> È il risultato di ogni scelta fatta prima ancora di iniziare a saldare."

## ATTO I — PERCHÉ NON HAI COMPRATO UNA CNC

La risposta breve: perché puoi costruirne una migliore.

La risposta lunga:

Una CNC hobbyistica da 3.000 euro ha vibrazioni che rendono impossibile IT6-IT7 su metallo. Una CNC industriale che le elimina parte da 40.000 euro.

Il gap non è nei motori. Non nelle guide. Non nell'elettronica.

**Il gap è nel basamento.**

Ogni vibrazione che non elimini alla fonte — nella struttura, prima che arrivi all'utensile — si traduce in errore dimensionale. Non c'è elettronica che lo compensi. Non c'è controllo che lo corregga. È fisica.

La soluzione industriale standard è il granito. Pesante, stabile, costoso, non lavorabile in casa.

La nostra soluzione: struttura **corpo unico** in acciaio S235 saldato TIG + **Epoxy Granite** colato nei tubolari come un'anima. Non è acciaio. Non è granito. È un ibrido dove ogni strato ha una funzione fisica precisa.

Smorzamento Epoxy Granite: δ = 0.03-0.06 (acciaio nudo: δ = 0.002). Fattore 15-30×. Rigidità asse Z con Config G: 772 volte superiore alla configurazione baseline. Tolleranza RSS: ±0.019 mm.

## ATTO II — LA DECISIONE STRUTTURALE

Maggio 2026. Sessione di revisione architetturale.

Il progetto originale prevedeva un sistema di sospensione a molle per isolare la macchina dalle vibrazioni del pavimento. Aveva senso sulla carta. Poi i dati hanno detto altro.

**Il problema delle molle:**
Una sospensione isola le vibrazioni entranti dal pavimento — ma introduce anche un grado di libertà che complica il setup. La macchina diventa un sistema dinamico: frequenza propria, smorzamento, interazione con il mandrino. Variabili da gestire ad ogni lavorazione.

**La decisione:**
Struttura corpo unico. Zero molle. Zero gradi di libertà aggiuntivi.

Lo smorzamento vibrazioni lo fa l'Epoxy Granite riempito nei tubolari — passivo, permanente, senza setup. Il basamento assorbe le vibrazioni per proprietà intrinseche del materiale, non per isolamento meccanico.

> "Meno componenti che possono variare = meno errori che devi calibrare."

Questa è la stessa logica del PLC Siemens invece dell'Arduino. Non è la soluzione più economica. È la soluzione più stabile a lungo termine.

La V32 non è sospesa. È ancorata. E quella è la scelta giusta per lavorare titanio ad alta precisione.

La decisione è documentata in ASSOLUTO V7, ATTO III. Non è un dettaglio — è la filosofia di progettazione.

## ATTO III — LE 9 PIASTRE E I "8 CUSTODI"

Nove piastre d'acciaio rettificato, 15mm di spessore. Più due aggiuntive per il sandwich XY.

Non è un basamento semplice. È una struttura stratificata:
- Piastra inferiore + traliccio 40x40x2 saldato TIG
- Colata Epoxy Granite che riempie le cavità
- Profili alluminio 90x45 a 6 cave (asse Y) + 45x45 a 4 cave (asse X)
- Interfaccia XY/basamento: gli **8 Custodi**

Gli 8 Custodi sono 8 pezzi lavorati CNC con scalino e foro D26, abbinati a bronzine CuSn8 e barre rettificate D20. Il punto critico dove la rigidità dell'intera macchina dipende dalla precisione di accoppiamento.

> "Non hai assemblato una macchina. Hai progettato un sistema di trasferimento delle forze."

## ATTO IV — IL CERVELLO

L'hardware fisico è la struttura. Il cervello è il PLC Siemens S7-314C.

Non un Arduino. Non un GRBL su scheda cinese. Un controllore industriale reale, lo stesso tipo che trovi nelle linee di produzione automotive.

La scelta non è sentimentale — è pratica. Il PLC Siemens ha:
- Ciclo di scansione deterministico: 0.1ms.
- Integrazione nativa con HMI TP900 Comfort via PROFIBUS DP.
- Diagnostica integrata: se un sensore muore, il sistema ti dice quale, quando, e perché.
- Scalabilità: la stessa logica PLC che gestisce la V32 può gestire la pressa MIMS.

Tre encoder. Due assi servo. Un asse stepper per Y. Sensori IFM VSE150 per le vibrazioni in tempo reale. Camera Basler per il controllo qualità visivo.

Non stai controllando una macchina. Stai costruendo un sistema di sensing e attuazione integrato.

## ATTO V — IL NUMERO

Alla fine, conta un solo numero.

**0.019 mm.** Tolleranza RSS dell'asse X dopo calibrazione.

Non è il numero che ti aspetti da una macchina costruita in una taverna con componenti recuperati e saldature TIG fatte a mano.

Ma è il numero che ottieni quando ogni scelta — le molle, il composito, gli 8 Custodi, la rigidità Z 772x, il controllo PLC deterministico — è stata fatta con un obiettivo: eliminare l'errore alla fonte, non compensarlo dopo.

IT6-IT7. Tolleranze da lavorazione meccanica di precisione.

## CHIUSURA

La Titanium V32 non è un prodotto da vendere.

È il reattore nucleare che alimenta tutto il resto.

Ogni stampo MIMS che fresa è un prodotto vendibile. Ogni pezzo conto terzi è cash flow. Ogni lavorazione è contenuto. Ogni upgrade che produce su se stessa è meta-ricorsività in azione.

178 kg. δ = 0.03-0.06. ±0.019 mm.

Non sono numeri tecnici. Sono la distanza tra la dipendenza e la libertà industriale.`,
  },

  {
    id: "EP_03",
    title: "Il Paradosso",
    sottotitolo: "MIMS costruisce V32. V32 produce MIMS. Sì, è possibile.",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-12-01",
    tags: ["mims", "v32", "bootstrap", "meta-ricorsività", "pa-gf30", "lego-acciaio"],
    status: "source",
    durata_min: 15,
    preview: "MIMS non è un giunto. Non è un profilo alluminio. Non è un kit da banco. MIMS è un protocollo fisico. La differenza è la stessa che passa tra un cavo proprietario e USB.",
    content: `# EP_03 — IL PARADOSSO
### "MIMS costruisce V32. V32 produce MIMS. Sì, è possibile."

> *Da EP_01: "Se funziona in taverna, funziona ovunque."*
> *Il bootstrap è la stessa logica su scala diversa.*

## COLD OPEN

> "La macchina costruisce i pezzi che costruiscono la macchina.
> Se sembra un paradosso, è perché non hai ancora visto il bootstrap."

## ATTO I — COS'È MIMS

Prima di spiegare il paradosso, bisogna capire cosa è MIMS.

MIMS non è un giunto. Non è un profilo alluminio. Non è un kit da banco.

**MIMS è un protocollo fisico.**

La differenza è la stessa che passa tra un cavo proprietario e USB. Il cavo proprietario funziona solo con quel dispositivo. USB funziona con qualsiasi cosa rispetti lo standard.

Confronto con Bosch Rexroth / Item 8 / 80-20 / Vention → Gli altri vendono profili. MIMS vende un protocollo.

L'elemento base è la **tile 190x190mm** — una mattonella stampata a compressione in PA-GF30 (poliammide rinforzata con fibra di vetro al 30%). Non è plastica da hobbysti. È ingegneria dei materiali: rigidità 9.5 GPa, resistenza termica fino a 150°C, coefficiente di attrito controllato.

Ogni tile ha una geometria precisa: croce centrale, quattro fori 10x10 agli angoli, pattern di montaggio standardizzato. Sopra la tile si applicano le **piastrine 40x40** — tre versioni: standard, forata, conduttiva.

I **giunti proprietari** collegano le tiles tra loro: Eco-Snap (prototipazione rapida), Quick-Twist (90° senza attrezzi), Tech-Bolt (industriale permanente).

Puoi costruire qualsiasi struttura combinando questi elementi come fossero LEGO industriali.

## ATTO II — IL PARADOSSO

Ecco il problema.

Per costruire la Titanium V32 avevi bisogno di componenti MIMS. Il basamento usa tiles e piastrine come elementi strutturali di allineamento. Il banco è costruito con tiles MIMS 190x190.

Ma MIMS è prodotto dalla Titanium V32.

Che non esiste ancora.

Come esci da un loop che presuppone il proprio risultato per funzionare?

## ATTO III — IL BOOTSTRAP

La risposta si chiama **bootstrap**. E non è mai elegante.

**Fase 1: usi quello che hai.**
La Bambu Lab P1S stampa prototipi MIMS in PA-GF30 e PETG. Non sono pezzi di produzione — sono abbastanza precisi per costruire e allineare la V32 durante l'assemblaggio. Il laser 5W taglia piastrine 40x40 in acrilico per i jig di saldatura.

**Fase 2: la V32 prende vita.**
Con i componenti MIMS "primitivi" — stampati, tagliati a laser, lavorati manualmente — la V32 viene assemblata al 70%. Abbastanza per fare i primi tagli.

**Fase 3: la V32 produce MIMS di qualità industriale.**
Le prime lavorazioni della V32 sono stampi per la pressa MIMS. Alluminio 7075, tolleranza IT6. Da quegli stampi, tramite stampaggio a compressione (VCM), escono tiles 190x190 vere. Con queste tiles, la V32 si upgrada.

**Non è un paradosso. È un'iterazione.**

## ATTO IV — I CINQUE VANTAGGI CHE NON SI COMPRANO

**1. Validazione fisica.**
Se MIMS regge una CNC da 178 kg con vibrazioni sotto 0.003 mm/s RMS, regge qualsiasi applicazione inferiore. Hai la prova di carico più severa costruita dentro al tuo stesso laboratorio.

**2. Proof of concept vivente.**
Il cliente industriale entra nel laboratorio, vede la V32, e pensa: "Questo sistema ha costruito una macchina di precisione. Può costruire il mio banco."

**3. Contenuto infinito.**
Ogni pezzo della V32 è un tutorial MIMS. Ogni upgrade è un episodio YouTube. Non stai producendo contenuto E prodotti — stai producendo contenuto CHE È il prodotto.

**4. Certificazione bottom-up.**
Se MIMS raggiunge IT7 sulla V32, qualsiasi applicazione meno esigente è automaticamente certificata.

**5. Auto-miglioramento.**
La V32 fresa pezzi per migliorare se stessa. Piastre più precise → supporti più rigidi → tolleranze migliori → pezzi più precisi. Il sistema si upgrada da solo.

## CHIUSURA

Il banco è costruito con MIMS.
La V32 sul banco è allineata con MIMS.
La V32 produce MIMS.
MIMS struttura il banco che regge la V32.

Non è un paradosso. È un ecosistema.

> "Non stai vendendo bulloni. Stai vendendo credibilità fisica. E la credibilità è la valuta più preziosa in ingegneria."`,
  },

  {
    id: "EP_04",
    title: "Il Segnale",
    sottotitolo: "Ho costruito un'AI per la donna che amo. Si chiama Eva.",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2026-01-01",
    tags: ["eva", "maria-rule", "whatsapp", "n8n", "vita-natura", "zero-click"],
    status: "source",
    durata_min: 11,
    preview: "Per Maria deve essere zero-click. Semplice magia. Non 'facile da usare'. Non 'intuitivo'. Non 'con un breve tutorial'. Zero-click. EVA funziona, o non esiste.",
    content: `# EP_04 — IL SEGNALE
### "Ho costruito un'AI per la donna che amo. Si chiama Eva."

> *Da EP_01: "Il vincolo creativo è il miglior ingegnere che esista."*
> *Da EP_03: "Parti con quello che hai, abbastanza preciso da funzionare adesso."*
> *La Maria Rule è la stessa logica — applicata a una persona, non a una macchina.*

## COLD OPEN

*Schermata WhatsApp. Messaggio automatico da EVA: "Ciao! Ho notato che domani è il tuo compleanno. Vita Natura ti aspetta con un regalo speciale. Prenota qui: [link]"*

> "Non l'ho scritto io.
> Non l'ha scritto Maria.
> L'ha scritto un sistema che sa quello che sai tu — ma non si dimentica mai nulla e non ha mai bisogno di dormire."

## ATTO I — VITA NATURA

Maria gestisce un centro estetico a Boffalora sopra Ticino.

Non è un dettaglio del mio ecosistema. È il motivo per cui l'ecosistema esiste nella forma in cui esiste.

Vita Natura ha clienti. Appuntamenti. Un calendario. Liste di attesa. Promemoria da mandare. Recensioni da raccogliere. Compleanni da ricordare. Promozioni da comunicare.

Tutto questo, ogni giorno, è lavoro manuale. Ripetitivo. Ad alto attrito cognitivo. Il tipo di lavoro che prende ore e non crea valore — gestisce solo quello che già esiste.

Maria è brava nel suo lavoro. Non ha bisogno di essere brava anche in ogni compito burocratico che circonda il suo lavoro.

EVA è la risposta a questa differenza.

## ATTO II — LA MARIA RULE

C'è una regola che governa tutto lo sviluppo di EVA.

Una sola regola. Non negoziabile.

**Per Maria deve essere zero-click. Semplice magia.**

Non "facile da usare". Non "intuitivo". Non "con un breve tutorial". Zero-click.

EVA funziona, o non esiste.

Dal punto di vista di Maria, EVA è un assistente che le manda messaggi. Risponde alle domande dei clienti. Gestisce le prenotazioni. Ricorda i compleanni. Manda i promemoria.

Dal nostro punto di vista, EVA è:
- Python 3.12 su VPS
- API WhatsApp Business via n8n
- Google Calendar per la lettura degli slot
- Database clienti JSON con storico completo
- LLM (Claude) per la generazione dei messaggi
- Logica condizionale per promozioni, follow-up, stagionalità

La complessità è nostra. La semplicità è sua.

Questa è ingegneria del software orientata a una persona reale, non a un utente astratto.

## ATTO III — COSA FA EVA OGNI GIORNO

**08:00** — EVA legge il calendario. Identifica gli appuntamenti del giorno. Manda i promemoria automatici ai clienti.

**08:05** — EVA controlla le ricorrenze. Compleanni nei prossimi 3 giorni? Messaggio personalizzato con offerta.

**10:00** — Un cliente chiede via WhatsApp: "Avete disponibilità per giovedì pomeriggio?" EVA legge il calendario, trova il primo slot libero, risponde con il link di prenotazione precompilato.

**18:00** — Fine giornata. EVA analizza gli appuntamenti completati. Manda automaticamente i messaggi di follow-up: "Come è andata? Ci farebbe piacere una tua recensione."

**23:00** — Report serale per Maria: appuntamenti domani, messaggi inviati, prenotazioni ricevute. Un messaggio. Una lettura. Trenta secondi.

Revenue automatica stimata anno 1: €1.500/mese. Non perché faccia miracoli. Perché **il ripetitivo eseguito perfettamente ogni giorno si accumula**.

## ATTO IV — PERCHÉ QUESTO APPARTIENE ALL'ECOSISTEMA

EVA non è un progetto separato. È il ramo finanziatore dell'ecosistema.

Anno 1, mentre la V32 è ancora in assemblaggio e MIMS è ancora in prototipazione, EVA genera cash flow. Quello stesso cash flow va in componenti: il mandrino 2.2kW, le viti per l'asse Y, il quadro IP54.

EVA è il primo client zero dell'intero stack Genesis. Tutto quello che costruisco per EVA — l'architettura multi-agente, l'integrazione con WhatsApp, il sistema di memoria clienti, la logica di calendario — è la stessa infrastruttura che poi diventa Genesis per altri business.

EVA è il prototipo che si paga da solo mentre viene sviluppato.

## CHIUSURA

Ho costruito EVA per un motivo semplice.

Maria è brava nel suo lavoro. Ha costruito qualcosa di reale in un posto piccolo, con clienti veri che tornano ogni mese. Merita che le parti ripetitive del suo lavoro vengano gestite da qualcosa che non si stanca, non dimentica, non ha brutte giornate.

La tecnologia più sofisticata è quella che sembra magia a chi la usa.

> "Per Maria deve essere zero-click. Semplice magia.
> Per noi è codice Python e n8n complesso."
> — La Maria Rule. Prima e unica regola di sviluppo EVA.`,
  },

  {
    id: "EP_05",
    title: "Il Verdetto",
    sottotitolo: "15 luglio 2030. Hai 35 anni. Sei libero.",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2026-02-01",
    tags: ["2030", "capannone", "libertà", "epilogo", "0008mm", "verdetto"],
    status: "source",
    durata_min: 17,
    preview: "Quello che segue non è accaduto ancora. Tutto quello che descrive è già in costruzione. Luglio 2030. La dashboard Genesis mostra i dati della notte: V32 — 12 stampi completati. Zero interventi manuali.",
    content: `# EP_05 — IL VERDETTO
### "15 luglio 2030. Hai 35 anni. Sei libero."

*"Quello che segue non è accaduto ancora. Tutto quello che descrive è già in costruzione."*

> *Da EP_00: il comparatore in mano. 0.008 mm.*
> *Da EP_02: corpo unico + Epoxy Granite. La struttura che non cede.*
> *Da EP_04: EVA che lavora di notte. Il ciclo che gira.*
> *Questo episodio è il punto di arrivo — e il punto da cui ogni versione futura reinizia.*

## ATTO I — L'ALBA DEL CAPANNONE

È l'alba. Il sole entra dalle finestre industriali del capannone.

Non c'è fretta, non c'è ansia.

Il caffè è ancora caldo sulla scrivania accanto al monitor principale — quello grande, curvo, che hai comprato quando EVA ha superato i 3.000 euro al mese di ricavi automatici.

Sullo schermo, la dashboard Genesis mostra i dati della notte:

- Titanium V32: 12 stampi per giunti MIMS Heavy completati. 4.2 kWh consumati. Zero interventi manuali.
- Sensore IFM VSE150: vibrazioni massime durante il ciclo = 0.003 mm/s RMS.
- EVA: 3 nuove prenotazioni per Vita Natura. Promemoria compleanni inviati. Incasso automatico: €450.
- Marketplace MIMS: ordine dalla Croazia — kit banco laser Pro, 4 tiles + 16 piastrine + giunti Quick-Twist. Margine: €180.
- YouTube: "Polimeri Sperimentali Ep.14" — 50.000 views superati stanotte.

Ti avvicini alla macchina.

È silenziosa. Non il silenzio della morte — quello della **precisione assoluta**. Le vibrazioni si dissolvono nell'Epoxy Granite colato nei tubolari del basamento — quattro anni fa hai scelto corpo unico + composito invece del sistema a sospensione. I dati avevano ragione.

La piastra appena fresata è ancora calda. La misuri con il comparatore — per abitudine, non per dubbio.

**0.008 mm. H7. Perfetta.**

## ATTO II — LA MAPPA PERCORSA

**Febbraio 2026 — La taverna.**
Dodici metri quadri. 9 piastre d'acciaio. Gap finanziario: €2.250 per completare la V32.

**Luglio 2026 — Il primo pezzo pagato.**
Precision Lab. Il primo cliente conto terzi. La V32 ha fresato alluminio 7075, IT7, 0.019mm.

**Dicembre 2026 — Break-even.**
61 ore di lavorazione conto terzi. Da quel momento, ogni euro è profitto.

**2027 — MIMS entra nel marketplace.**
Tiles 190x190 in PA-GF30. Prima vendita B2B: un'officina nel Veneto ordina 20 kit banco. Margine 79%. EVA supera €1.000/mese automatici.

**2028 — Il laboratorio.**
300 m². Non il capannone — il passo prima. La pressa MIMS a 4 colonne lavora a pieno regime.

**2029 — Il deposito.**
Il deposito per il capannone viene versato. V32 Mk2 in progettazione.

**15 luglio 2030 — Il capannone.**

## ATTO III — IL CAST NELL'EPILOGO

**EVA** ha 340 business client nel programma SaaS. Non solo Vita Natura — centri estetici, studi fisioterapici, piccole officine. Revenue automatica mensile: €4.200.

**AVA** ha 47.000 iscritti. Non sei famoso — sei rispettato. Il passaparola industriale non mente.

**MIMS** è in versione 3.0. Tiles conduttive in rame per automazione industriale. Un ingegnere di Torino ha adattato il sistema per il suo banco CNC custom — revenue sharing 10%. Il marketplace ha 50+ designer che caricano varianti.

**Titanium V32** si è aggiornata da sola tre volte. Ogni upgrade progettato sulla V32 precedente, prodotto dalla V32 stessa.

**Themis** — il sistema, il metodo, la logica — è diventato documentazione pubblica. ASSOLUTO V7. Le persone lo citano come framework.

## ATTO IV — COSA NON È CAMBIATO

*Dettaglio mani. Le stesse cicatrici. I calli negli stessi punti.*

Hai 35 anni.

Non sei famoso. Hai 47.000 iscritti — abbastanza per monetizzare, non abbastanza per perdere il controllo.

Non hai investitori. Non hai debiti. Non hai dipendenti in senso classico — hai collaboratori che sono cresciuti con te.

Non hai orari fissi. Non hai un capo. Non hai un progetto che dipende dall'umore di qualcun altro per sopravvivere.

> "Non li hai assunti. Sono cresciuti con te."

## CHIUSURA — LA REGOLA CHE CAMBIA TUTTO

Ogni versione di questo documento — dalla V1 scritta in una sera sola, alla V6 con 126 pagine di dati verificati — inizia con la stessa frase.

> **"Non costruiamo prodotti. Costruiamo libertà."**

Non era uno slogan. Era una mappa.

La libertà industriale non è un sogno. Non è una metafora. È una sequenza di decisioni tecniche, finanziarie, e creative, ognuna costruita sulla precedente.

Inizia con 9 piastre d'acciaio in una taverna.
Inizia con una CNC che si costruisce con i suoi stessi pezzi.
Inizia con un'AI che ricorda i compleanni delle clienti di Maria.
Inizia con un video che spiega perché hai scelto corpo unico invece del sistema a sospensione.

Inizia adesso. Non quando avrai il capannone.

**Il capannone lo costruisce chi inizia in taverna.**

> *Questo episodio chiude il ciclo aperto in EP_00.*
> *Il calibro. Le mani. Il numero. Tutto uguale. Tutto diverso.*
>
> *La Stagione 2 inizia dove finisce questa:*
> *"Claude, adatta il design per integrare piastrine conduttive in rame."*
> *"Invio l'offerta?"*
> *"Sì."*`,
  },

  // ── STAGIONE T — IL SISTEMA ────────────────────────────────────────────────

  {
    id: "EP_T01",
    title: "La Dashboard",
    sottotitolo: "Quando il caos ha preso forma",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-09",
    tags: ["titanium_os", "dashboard", "sistema", "interfaccia", "celle"],
    status: "ready",
    durata_min: 10,
    preview: "Non è pigrizia. Non è disorganizzazione generica. Senza struttura visiva, tutto ha lo stesso peso mentale. Il 9 marzo 2026, quella sera: celle draggabili su una griglia. Tre secondi per capire dove stai.",
    content: `# EP_T01 — LA DASHBOARD
### "Quando il caos ha preso forma"

> "Per la prima volta in anni, sapevo esattamente dove ero. Non perché qualcuno me lo avesse detto. Perché avevo costruito il posto in cui guardare."

Non è pigrizia. Non è disorganizzazione generica. È qualcosa di più specifico.

Hai un'idea alle 23:00. È buona. La senti buona come senti che una saldatura è pulita ancora prima di levare la maschera. Ma se non la scrivi entro trenta secondi, sparisce.

Senza struttura visiva, tutto ha lo stesso peso. Il bullone M10 da ordinare ha lo stesso peso mentale del brevetto da depositare. E quando tutto ha lo stesso peso, il cervello para i colpi invece di scegliere.

Il 9 marzo 2026, quella sera: celle draggabili su una griglia. Ogni cella è un progetto. Ogni progetto ha un colore, un nome, una percentuale. Tre secondi per capire dove stai. Non trenta minuti a cercare tra cartelle.

TITANIUM_OS non è un prodotto. È una protesi. Come il calibro che usi ogni giorno non è un oggetto — è un'estensione della tua mano.`,
  },

  {
    id: "EP_T02",
    title: "NeuroMap",
    sottotitolo: "La prima volta che il sistema si è visto dall'alto",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-15",
    tags: ["neuromap", "visualizzazione", "svg", "drill-down", "architettura"],
    status: "ready",
    durata_min: 9,
    preview: "I rettangoli mentono sulla relazione tra le cose. La soluzione: metti il centro al centro e le orbite intorno. Il progetto principale pulsa. Gli altri gli orbitano.",
    content: `# EP_T02 — NEUROMAP
### "La prima volta che il sistema si è visto dall'alto"

> "Quando apro il dashboard e vedo la mappa, il mio cervello capisce immediatamente la struttura dell'ecosistema. Non devo leggere. Vedo."

I rettangoli mentono sulla relazione tra le cose. Metti V32 vicino a MIMS perché sono entrambi fisici. Ma V32 è anche connesso a GENESIS per le automazioni, e GENESIS è connesso a VITA_NATURA perché EVA gira sulla stessa infrastruttura. Questi link non esistono in una griglia.

La soluzione: metti il centro al centro e le orbite intorno. Il progetto principale pulsa. Gli altri gli orbitano. Quando entri in uno, lui diventa il centro. Drill-down — entra, esplora, risali.

Dark background. Dot grid. Nodi che pulsano piano quando hanno attività in corso. Animazione di ingresso — ogni nodo appare con un ritardo leggermente diverso.

Quella UI non è decorazione. È segnale: questo sistema ha abbastanza profondità da meritare una rappresentazione che rispetti questa profondità.`,
  },

  {
    id: "EP_T03",
    title: "VULCAN",
    sottotitolo: "La pressa come moat",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-18",
    tags: ["vulcan", "pressa", "polimeri", "brevetto", "mims", "moat", "ricetta"],
    status: "ready",
    durata_min: 11,
    preview: "Il rischio con i prodotti fisici non è il brevetto di forma. Quella geometria puoi copiarla con una fresa e tre ore di lavoro. L'unica difesa è la conoscenza del processo.",
    content: `# EP_T03 — VULCAN
### "La pressa come moat"

> "Tutti possono disegnare un connettore. Non tutti possono pressarlo con la ricetta giusta, nella forma giusta, e sapere esattamente cosa succede dopo."

Il rischio con i prodotti fisici non è il brevetto di forma. Quella geometria puoi copiarla con una fresa e tre ore di lavoro. Il rischio è che qualcuno la faccia stampare in Cina in tremila pezzi e la venda a metà prezzo.

L'unica difesa è la conoscenza del processo.

Un martinetto idraulico Vevor da 20 tonnellate. Colonne guida recuperate da una pressa DATWLER industriale. Sistema di riscaldamento per polimeri tecnici. Puoi iterare in giornata invece di aspettare sei settimane da un terzista.

Ma il vantaggio strategico è diverso: ogni ricetta che sviluppi diventa proprietà intellettuale. Non la geometria — quella è visibile. Il materiale, la pressione, il profilo termico, il tempo di cura — quello non si vede.

Tra un anno, avrai sessanta ricette testate. Chi inizia domani ricomincia da zero. Questo è il moat.

VULCAN non è una pressa. È un archivio di conoscenza proprietaria su materiali e processi. La differenza tra un prodotto e un sistema difendibile.`,
  },

  {
    id: "EP_T04",
    title: "SINAPSI",
    sottotitolo: "Il database come identità",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-18",
    tags: ["sinapsi", "cv-navigabile", "identita", "llm", "knowledge-base", "dataset"],
    status: "ready",
    durata_min: 9,
    preview: "Il CV tradizionale appiattisce: 15 anni nel manifatturiero. Una riga. Dentro quella riga: titanio saldato per MotoGP, robot programmati, presse calibrate, sistemi di qualità costruiti da zero.",
    content: `# EP_T04 — SINAPSI
### "Il database come identità"

> "Quindici anni di connessioni. Una mappa per mostrarle."

Il CV tradizionale appiattisce: "Esperienza: 15 anni nel settore manifatturiero." Una riga. Dentro quella riga: titanio saldato per MotoGP, robot programmati, presse calibrate, sistemi di qualità costruiti da zero.

Il tuo profilo non è una specializzazione verticale — sei un generalista tecnico di alto livello. La parola che ti descrive non esiste nel dizionario HR, quindi nessun filtro ti trova.

La soluzione: un CV che si espande. Prima vista: chi sei in tre righe. Click: il layer successivo con esempi reali. Click ancora: il proof-of-work — non il certificato dell'ente, il risultato misurabile.

C'è un secondo uso che va oltre il CV. Ogni documento che aggiungi — ogni episodio come questo, ogni manifesto di progetto — diventa parte di un database che può istruire un modello linguistico. Non generico — il tuo LLM. Uno che sa come ragioni, che conosce il tuo ecosistema.

SINAPSI è il posto dove questa storia viene raccolta, strutturata e conservata.`,
  },

  {
    id: "EP_T05",
    title: "Il Sistema Pensa",
    sottotitolo: "MCP. RAG. CommandBar. Il momento in cui TITANIUM_OS ha smesso di essere un'interfaccia.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-27",
    tags: ["genesis", "mcp", "rag", "dashboard", "commandbar", "titanium_os", "v5"],
    status: "ready",
    durata_min: 12,
    preview: "Ctrl+K. Una barra di comando appare. Scrivi 'V32'. Il sistema ti mostra lo stato live della fresatrice, le ultime decisioni tecniche, il prossimo step. Non hai aperto nessun file. Non hai cercato in nessuna cartella.",
    content: `# EP_T05 — IL SISTEMA PENSA
### "MCP. RAG. CommandBar. Il momento in cui TITANIUM_OS ha smesso di essere un'interfaccia."

> *Da EP_T01: "TITANIUM_OS non è un prodotto. È una protesi."*
> *Questo episodio è il momento in cui la protesi impara a pensare.*

## COLD OPEN

Ctrl+K.

Una barra di comando appare sopra tutto. Scrivi "V32". In tempo reale: stato live della fresatrice, milestone attivo, prossimo step, blockers. Non hai aperto nessun file. Non hai cercato in nessuna cartella. Non hai ricostruito il contesto da zero.

**Il sistema sa già dove sei. Tu hai solo chiesto.**

## ATTO I — IL PROBLEMA CHE LA DASHBOARD NON RISOLVEVA

La prima dashboard — marzo 2026 — risolveva la visibilità. Vedevi i progetti. Le percentuali. I colori.

Ma non risolveva la latenza cognitiva.

Il momento in cui apri Claude e devi spiegare di nuovo cosa stai costruendo, dove sei arrivato, cosa hai deciso la settimana scorsa — quella spiegazione costa. Non in minuti. In energia mentale. E con l'ADHD, quell'energia è il bene più scarso che esiste.

La risposta non era una dashboard più bella. Era un sistema che non dimenticava mai nulla.

## ATTO II — I CINQUE STRUMENTI

**MCP Server — 5 tool integrati in Claude Code:**

\`get_state\` → legge BRAIN/STATE.json in tempo reale. Milestone attivo, pilastri, blockers. Zero domande da fare.

\`update_milestone\` → aggiorna lo stato da Claude direttamente. La sessione finisce con STATE.json già aggiornato.

\`search_mente\` → query semantica su ChromaDB. 50+ chunk indicizzati. "Come ho scelto l'Epoxy Granite?" → risposta con fonte documentata.

\`get_daily_brief\` → brief formattato. Apri la sessione, digiti un comando, hai il contesto della giornata. Non devi ricordare nulla.

\`list_content_ready\` → episodi pronti per produzione. Non cerchi nella cartella. Il sistema ti dice cosa è pronto.

## ATTO III — IL RAG CHE RICORDA PER TE

ChromaDB. SentenceTransformer paraphrase-multilingual. 50+ chunk. Italiano, inglese, mixed.

Non è un motore di ricerca. È una memoria esternalizzata.

La differenza: una ricerca ti trova documenti. Un RAG ti trova concetti. "Qual era la logica della decisione corpo unico?" — il RAG non cerca la parola "corpo unico". Capisce il concetto e trova tutto quello che ne parla, anche se scritto in un modo diverso.

Ogni sessione che documenti in MENTE/ diventa parte di quella memoria. Ogni decisione tecnica. Ogni spec verificata. Ogni errore e la sua soluzione. Compounding del sapere — ogni documento aggiunto vale per tutte le sessioni future.

## ATTO IV — COMMANDBAR: L'INTERFACCIA COGNITIVA

Ctrl+K. Non è una feature. È un principio di design.

Il principio: il sistema deve rispondere alla velocità del pensiero, non alla velocità della navigazione. Quando hai un'idea — o una domanda, o una decisione da prendere — l'interfaccia non deve essere un ostacolo. Deve essere un amplificatore.

CommandBar è il punto di ingresso unificato. Nodi, episodi, azioni, stati. Tutto accessibile con una stringa di testo. Nessun menu. Nessun click in cascata. Nessun "dove era quella cosa?".

Con l'ADHD, ogni layer di navigazione in più è un'opportunità di distrazione. CommandBar li elimina tutti.

## CHIUSURA

GENESIS v5.1 non è un aggiornamento della dashboard.

È il momento in cui TITANIUM_OS smette di essere uno strumento che usi e diventa un sistema che ti supporta — anche quando non lo stai guardando, anche tra una sessione e l'altra, anche quando hai dimenticato dov'eri rimasto.

> "Il sistema non ti ricorda le cose. Ti permette di non doverle ricordare.
> La differenza è sottile. L'effetto è enorme."`,
  },

  {
    id: "EP_T06",
    title: "Meno Parti",
    sottotitolo: "Come una decisione di maggio 2026 ha eliminato un'intera classe di errori.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-20",
    tags: ["corpo-unico", "decisione-strutturale", "epoxy-granite", "design-philosophy", "config-g"],
    status: "ready",
    durata_min: 11,
    preview: "Avevi un sistema a molle progettato. Funzionava sulla carta. Poi hai guardato i numeri diversamente e hai visto non il problema che risolveva — ma la classe di problemi che creava. Quello è il momento.",
    content: `# EP_T06 — MENO PARTI
### "Come una decisione di maggio 2026 ha eliminato un'intera classe di errori."

> *Da EP_02: "Il gap è nel basamento."*
> *Questo episodio è la storia di come si migliora un basamento già buono.*

## COLD OPEN

Avevi un sistema a molle progettato. Calcolato. Documentato nel BOM. Quattro molle ISO, frequenza naturale 3.83 Hz, isolamento vibrazioni >99.9% sopra i 400 Hz.

Funzionava sulla carta.

Poi hai guardato i numeri diversamente. Non "questo sistema funziona?" — ma "questo sistema aggiunge variabili che dovrai gestire per i prossimi dieci anni di lavorazioni?"

La risposta era sì. E quella risposta ha cambiato tutto.

## ATTO I — IL PROBLEMA CON LE MOLLE

Non è che le molle non funzionassero.

Il problema era quello che le molle rappresentavano: un **grado di libertà non controllato**.

Una macchina con un sistema a sospensione è un sistema dinamico. Ha una frequenza propria. Ha un coefficiente di smorzamento. Ha un comportamento che cambia con il carico, con la temperatura, con l'usura delle molle nel tempo.

Ogni volta che setup la macchina per una nuova lavorazione, il sistema dinamico è lì. Non devi gestirlo attivamente — ma è lì. Come una variabile in background che non puoi ignorare completamente.

Il mandrino produce forze dinamiche. Le molle le filtrano — ma anche le trasformano. Frequenze che vengono amplificate invece di attenuate. Risonanze che si attivano a certi regimi di taglio. Comportamenti che devi mappare, capire, compensare.

## ATTO II — LA SOLUZIONE CHE GIÀ C'ERA

L'Epoxy Granite era già nel progetto. Colato nel basamento tra le piastre d'acciaio.

Ma a maggio 2026, durante Config G, è arrivata la domanda: e se lo usassi anche nei tubolari del traliccio? Non solo come riempitivo — come smorzatore attivo.

Il composito Epoxy Granite ha un coefficiente di smorzamento logaritmico δ = 0.03-0.06. L'acciaio nudo: δ = 0.002. Fattore 15-30 volte superiore.

Se riempi i tubolari del traliccio con Epoxy Granite, le vibrazioni del mandrino si dissolvono nella struttura prima di raggiungere l'utensile. Non per isolamento meccanico — per proprietà intrinseche del materiale.

**Smorzamento passivo. Permanente. Senza parti in movimento. Senza manutenzione. Senza variabili.**

## ATTO III — LA FILOSOFIA CHE NON CAMBIA

Questa decisione non era solo tecnica. Era design philosophy.

Il PLC Siemens invece dell'Arduino: meno flessibilità, più affidabilità deterministica. La stessa logica.

I giunti Tech-Bolt invece degli Eco-Snap per le connessioni permanenti: più difficili da montare, impossibili da smontare accidentalmente. La stessa logica.

Il corpo unico invece del sistema a molle: meno adattabilità, zero variabili non controllate. La stessa logica.

> "La soluzione migliore non è quella che gestisce più casi. È quella che elimina la necessità di gestirli."

Ogni parte in meno è un failure mode in meno. Ogni variabile eliminata è una calibrazione che non dovrai mai fare. Ogni grado di libertà rimosso è un errore che non ti sorprenderà a metà lavorazione.

## ATTO IV — COSA SIGNIFICA IN PRATICA

Config G + corpo unico + Epoxy Granite nei tubolari:

- Rigidità asse Z: 772× la baseline senza rinforzi
- Smorzamento strutturale: 15-30× superiore all'acciaio nudo
- Variabili da gestire per il sistema di smorzamento: **zero**
- Parti che si usurano nel sistema di smorzamento: **zero**
- Setup aggiuntivo per ogni lavorazione dovuto al sistema di smorzamento: **zero**

Il primo anno di lavorazioni non sarà tempo dedicato a calibrare il sistema di sospensione. Sarà tempo dedicato a ottimizzare i parametri di taglio. Che è quello che conta.

## CHIUSURA

Ogni sistema che costruisci riflette il modo in cui pensi.

Se aggiungi parti perché "potrebbero servire" — il tuo sistema diventa complicato. Se rimuovi parti perché "non sono necessarie" — il tuo sistema diventa solido.

Corpo unico non è stato un compromesso. È stata la scelta giusta che il progetto originale non aveva ancora visto.

> *La V32 non è sospesa. È ancorata. E quella è la differenza.*`,
  },

  {
    id: "EP_T07",
    title: "Il Documento",
    sottotitolo: "ASSOLUTO V7. Dieci ATTI. Una sola verità.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-27",
    tags: ["assoluto", "v7", "documento-master", "verdetto", "ecosistema", "epicentro"],
    status: "ready",
    durata_min: 9,
    preview: "C'era la V6. Dieci file separati. Ogni ATTO viveva nel suo file, scollegato dagli altri. L'ecosistema era frammentato anche nella sua documentazione. La V7 lo ha unificato. Un file. Cinquantamila parole. Dieci ATTI.",
    content: `# EP_T07 — IL DOCUMENTO
### "ASSOLUTO V7. Dieci ATTI. Una sola verità."

> *"Ogni versione dell'ASSOLUTO è una fotografia del sistema in quel momento.*
> *La V7 è la prima fotografia che non distorce nulla."*

## COLD OPEN

Aprivi il V6 e trovavi dieci file. ATTO_I.md, ATTO_II.md, fino a ATTO_X.md. Ciascuno con la sua verità. Ciascuno incompleto senza gli altri.

Il problema non era il contenuto. Era la struttura.

Un ecosistema non è una lista di parti separate. È una rete di relazioni. E una rete di relazioni non si capisce aprendo un file alla volta.

La V7 ha cambiato questo.

## ATTO I — PERCHÉ UN DOCUMENTO UNICO

Non è una questione estetica.

Un documento unico costringe la coerenza. Se l'ATTO III (V32) e l'ATTO VII (economia) vivono nello stesso file, non puoi avere numeri che si contraddicono. Non puoi aggiornare la spec della V32 senza aggiornare il ROI. Non puoi cambiare il timeline senza riconsiderare il BEP.

La frammentazione della V6 permetteva incoerenze. La V7 le rende impossibili.

## ATTO II — I DIECI ATTI

**ATTO I — Il Presente.** Inventario. CV reale. Il laboratorio come è oggi.

**ATTO II — L'Ecosistema.** 5 pilastri, 10 regole, modello economico. La struttura di tutto.

**ATTO III — V32.** Specifiche complete. Corpo unico. Config G. PLC. Epoxy Granite. BOM verificato.

**ATTO IV — MIMS.** Geometria. Tre giunti. Sette materiali. Analisi competitiva. Blue ocean.

**ATTO V — Materiali e Produzione.** VULCAN. VCM 18 step. Sei ricette polimeriche.

**ATTO VI — GENESIS.** MCP. RAG. Dashboard v5.1. EVA. Content Engine.

**ATTO VII — Economia e Verdetto.** BEP. ROI. Verdetto 3 assi. Timeline 2026-2030.

**ATTO VIII — Mercato.** TAM EUR 4.2B. SAM EUR 180M. SOM Y3 EUR 350-550K. GTM.

**ATTO IX — Proprietà Intellettuale.** 3 brevetti. 6 trade secrets. 4 marchi.

**ATTO X — Media Strategy.** Titanium Lab. 3 serie. 7 revenue stream.

## ATTO III — IL VERDETTO CHE NON CAMBIA

Ogni versione dell'ASSOLUTO termina con lo stesso verdetto su tre assi.

**LEX PHYSICA.** Corpo unico 178 kg, Epoxy Granite δ = 0.03-0.06, rigidità Z 772×, RSS ±0.019 mm. → **APPROVATO**

**LEX MERCATORIA.** ROI 322%, BEP 61 ore, 15.5× meno costoso di un equivalente Haas. → **APPROVATO**

**LEX AESTHETICA.** Traliccio raw + TP900 9". Sistema che si vede. Storia che vale contenuto. → **APPROVATO**

Questi verdetti non sono stati scritti dopo il successo. Sono stati scritti il 13 Febbraio 2026 con il calibro in mano, con €2.250 ancora da spendere.

Non stiamo aspettando di avere ragione. Dimostriamo di averla mentre costruiamo.

## CHIUSURA

La V7 non è un aggiornamento. È una riorganizzazione della realtà.

La V8 verrà — quando i dati reali della V32 funzionante sostituiranno le specifiche di progetto. Quando il primo pezzo H7 sarà misurato e fotografato. Quando il BEP di 61 ore sarà verificato con ore reali.

Ma la V7 è l'epicentro adesso. La fonte da cui ogni episodio, ogni post, ogni conversazione con Claude, ogni aggiornamento di STATE.json, si calibra.

> *"Un sistema documentato sopravvive al suo costruttore.*
> *Un sistema non documentato è solo una speranza."*`,
  },

  // ── STAGIONE S2 — LA COSTRUZIONE ────────────────────────────────────────────

  {
    id: "EP_S2_00",
    title: "Config G: Il Gusset Sinistro",
    sottotitolo: "TIG su acciaio alle 21:40. Il suono della macchina che prende forma.",
    stagione: "S2",
    stagione_label: "La Costruzione",
    data_evento: "2026-06-01",
    tags: ["v32", "config-g", "gusset", "saldatura-tig", "rinforzi", "build-log"],
    status: "draft",
    durata_min: 8,
    preview: "La colonna Z sinistra. Quattro gusset da 200mm. Piastra triangolare S355 10mm. TIG a 95A, argon a 12 l/min. Cinque passi: taglia, posiziona, punta, misura, salda. Questa è la macchina che prende forma.",
    content: `# EP_S2_00 — CONFIG G: IL GUSSET SINISTRO
### "TIG su acciaio alle 21:40. Il suono della macchina che prende forma."

*Build Log #001 — Stagione 2: La Costruzione*

---

**Data:** Giugno 2026
**Ore lavorate:** 3.5h
**Stato V32:** 65% → 67%
**Milestone:** Config G — Rinforzi colonne Z+U

---

## LA SEQUENZA

La colonna Z sinistra aspettava i rinforzi da tre settimane.

Non perché mancasse il materiale. Perché config G non è una singola saldatura — è un sistema di rinforzi che devono essere eseguiti in sequenza per non accumulare tensioni residue. Gusset → diagonali → tiranti M10. Nell'ordine. Con le misure tra ogni fase.

Oggi era il turno dei gusset.

**MATERIALE:**
Piastre triangolari S355, 200x200x10mm. Spigoli a 45°. Quattro pezzi per la colonna sinistra, quattro per la destra. Tagliati con flex angolare 125mm, finiti con smerigliatrice a lamella.

**SETUP:**
TIG Fronius TT 230i. Corrente: 95A su spessore 10mm. Tungsteno: 2.4mm, affilato a 30°. Bacchetta: ER70S-6, 1.6mm. Gas: argon puro, 12 l/min. Distanza ugello: 8mm.

**LA PROCEDURA:**

1. Posizionamento con squadra magnetica 200mm. Verifica angolo: <0.2mm di errore accettabile.
2. Tre punti di tack weld, 60A, distanza 80mm. Non saldare ancora — punta e misura.
3. Verifica con comparatore sul piano di riferimento della guida Z. Tolleranza: ±0.05mm dalla posizione nominale.
4. Se OK: saldatura completa. TIG a 95A, velocità avanzamento ~150mm/min, tecnica a oscillazione 5mm.
5. Dopo ogni gusset: misura deflessione con comparatore su tre punti. Confronto con simulazione FEM.

**I NUMERI:**

Prima dei gusset, deflessione asse Z sotto carico 100N: 0.31mm.
Dopo i quattro gusset sinistri: 0.07mm.
Target Config G completo: <0.019mm.

Non siamo ancora lì. Ma il trend è corretto.

## IL SUONO

C'è una cosa che non si spiega nei calcoli FEM.

Il suono della macchina che cambia mentre aggiungi rigidità.

Prima dei gusset, se picchi il traliccio con le nocche, senti un suono cavo. Risonante. Il metallo non è ancora saturo di struttura.

Dopo quattro gusset da ogni lato, lo stesso picchio suona diverso. Più sordo. Più pieno. Come se il metallo avesse acquisito massa senza che tu aggiungessi massa.

Non è fisica romantica. È fisica vera — la frequenza propria del sistema è cambiata. Il traliccio adesso ha una rigidità diversa. Il suono lo registra prima del comparatore.

## NEXT

Domani: quattro gusset lato destro. Stessa procedura, specchiata.

Poi: diagonali — acciaio piatto 40x5mm saldato TIG tra i nodi del traliccio. Poi: tiranti M10 con dado Nyloc. Poi: Epoxy Granite fill nei tubolari.

Ogni step è documentato qui. Non per il pubblico — per me. Perché tra tre mesi quando rileggo questa sequenza voglio sapere esattamente cosa ho fatto, perché lo ho fatto, e cosa ha misurato dopo.

**La macchina non mente. I numeri nemmeno.**`,
  },

  {
    id: "EP_S2_01",
    title: "Epoxy Granite: Colata Zero",
    sottotitolo: "Il momento in cui l'acciaio smette di essere solo acciaio.",
    stagione: "S2",
    stagione_label: "La Costruzione",
    data_evento: "2026-07-01",
    tags: ["epoxy-granite", "composito", "smorzamento", "basamento", "build-log", "materiali"],
    status: "draft",
    durata_min: 10,
    preview: "Non è versare cemento. È ingegneria dei materiali in una taverna. Rapporto resina/aggregato: 7/93 in peso. Aggregati: granito 0-0.5mm + granito 0.5-2mm + granito 2-5mm in proporzione 20/40/40.",
    content: `# EP_S2_01 — EPOXY GRANITE: COLATA ZERO
### "Il momento in cui l'acciaio smette di essere solo acciaio."

*Build Log #002 — Stagione 2: La Costruzione*

---

**Data:** Luglio 2026
**Ore lavorate:** 6h (prep + colata + cura)
**Stato V32:** 67% → 72%
**Milestone:** Epoxy Granite fill — tubolari traliccio

---

## PERCHÉ IL COMPOSITO

Il traliccio della V32 è costruito in profilati 40x40x2 acciaio S235. Buono. Rigido. Ma cavo.

Un tubolare cavo ha proprietà di smorzamento vibrazioni δ ≈ 0.002. Basso. Le vibrazioni del mandrino si propagano nella struttura, si riflettono, si amplificano a certe frequenze.

L'Epoxy Granite cambia questo.

δ = 0.03-0.06 del composito vs 0.002 dell'acciaio: fattore 15-30× di smorzamento. Le vibrazioni entrano nel tubolare, incontrano il composito, vengono convertite in calore invece di riflesse. La struttura diventa un dissipatore passivo.

Non devi fare nulla. Non devi calibrare nulla. La fisica lavora per te 24 ore su 24.

## LA RICETTA

Non è granito commerciale. È una formulazione sviluppata per questa applicazione.

**AGGREGATI (93% in peso totale):**
- Granito 0-0.5mm: 20% — riempimento interstiziale
- Granito 0.5-2mm: 40% — struttura principale
- Granito 2-5mm: 40% — distribuzione carico

**MATRICE (7% in peso totale):**
- Resina epossidica bisfenolo A: base
- Indurente amminico alifatico: ratio 2:1 in massa
- Additivo tixotropico 1.5% — controllo viscosità per colata verticale

**PROPRIETÀ TARGET:**
- Resistenza a compressione: 120-150 MPa (vs calcestruzzo 30-40 MPa)
- Modulo elastico: 30-45 GPa
- Smorzamento: δ = 0.03-0.06
- Cura: 24h a temperatura ambiente, post-cura 60°C per 4h

## LA COLATA

Preparazione: 2h.

I tubolari devono essere puliti, sgrassati, riscaldati a 40°C per abbassare la viscosità della resina e migliorare l'adesione. Mascheratura dei fori con nastro PTFE — la resina non deve fuoriuscire dalle connessioni meccaniche.

Miscelazione: 15 minuti. Ordine critico: aggregati grossi prima, poi medi, poi fini, poi matrice. Non il contrario — se aggiungi la resina prima degli aggregati, incorpori aria. L'aria è il nemico.

Colata: dall'alto in basso, lentamente. Velocità: ~200g/minuto per tubolare verticale. Usa un vibro-agitatore ogni 30 secondi per eliminare bolle d'aria. Senti il composito assestarsi — il suono cambia da "liquido" a "denso" man mano che riempie gli spazi interstiziali.

Primo riempimento: 80% del volume. Pausa 2h per assestamento. Secondo riempimento: al livello. Il composito si ritira leggermente durante la cura — il secondo strato compensa.

## I NUMERI DOPO

Dopo 48h di cura, stesso test di picchiottamento con le nocche sul traliccio.

Prima della colata: risonanza a ~180 Hz. Decadimento: 0.8 secondi.
Dopo la colata: risonanza a ~280 Hz. Decadimento: 0.15 secondi.

Il decadimento è sceso da 0.8 a 0.15 secondi. La struttura adesso smorza 5 volte più velocemente.

Non è ancora il test vero — quello sarà con il mandrino a 18.000 giri e il sensore IFM VSE150 in lettura. Ma la tendenza è esattamente quella che i calcoli prevedevano.

## QUELLO CHE NON HAI PREVISTO

La massa.

Sai che il composito pesa circa 2.1 g/cm³. Sai quanti cm³ hai riempito. Hai calcolato 12 kg aggiuntivi.

Quello che non avevi completamente considerato è come cambiano le sensazioni della macchina. Quando muovi il traliccio adesso per risistemarlo sul bancale, il peso è diverso. Non solo più pesante — diverso. Più "maturo". Come se la struttura avesse acquisito consistenza interna che prima non aveva.

Non è fisica romantica. È fisica vera. La massa distribuita nel composito cambia il baricentro. Cambia il momento d'inerzia. La macchina risponderà diversamente alle forze dinamiche del taglio.

Meglio. Molto meglio.

**Il composito non è un dettaglio. È il carattere della macchina.**`,
  },

  // ── GENERATI ──────────────────────────────────────────────────────────────

  {
    id: "EP_AUTO_002",
    title: "8 pezzi, geometria perfetta",
    sottotitolo: "Quando le bronzine diventano linguaggio della macchina",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-22",
    tags: ["V32", "manufacturing", "precisione", "MIMS", "artigianato-industriale"],
    status: "ready" as EpisodeStatus,
    durata_min: 7,
    preview: "Stamattina in officina, ore 9.30. Davanti a me: 8 pezzi interfaccia appena estratti dalla morsa. Bronzine (±0.015 mm) + scalini di posizionamento. Li prendo uno per uno, li passo sotto la luce. Zero sbavature sugli spigoli vivi.",
    content: `# 8 pezzi, geometria perfetta

> Quando guardi un pezzo fresato bene, vedi il codice che l'ha generato. Non è poesia, è geometria pura.

Stamattina in officina, ore 9.30. Davanti a me: 8 pezzi interfaccia appena estratti dalla morsa. Bronzine (±0.015 mm) + scalini di posizionamento. Li prendo uno per uno, li passo sotto la luce. Zero sbavature sugli spigoli vivi. Le tolleranze sono dentro. Questo è il momento in cui smetti di costruire pezzi random e cominci a costruire un linguaggio.

Capisco che sembra esagerato per una serie di bronzine, ma ecco: questi 8 oggetti sono il vocabolario fisico con cui V32 parlerà con MIMS. Ogni scalino, ogni foro è una istruzione che il prossimo componente leggerà con le sue tolleranze. Non è magia. È semplicemente **constraint satisfaction in acciaio**.

Ho lavorato 3 ore nette per farli. Primo pezzo mi è costato 45 minuti di setup della macchina. Gli altri 7? 20-25 minuti ciascuno, flusso costante. Questo è il ritmo che voglio raggiungere: la redditività dell'artigianato industriale non è in un pezzo solo, è nella serialità consapevole.

Un pezzo fresato bene non è arte. È promessa mantenuta.`,
  },

  {
    id: "EP_AUTO_003",
    title: "HMI acquisito, V32 respira",
    sottotitolo: "Quando il touchscreen diventa il cervello della fresatrice",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-22",
    tags: ["V32", "automazione", "HMI", "manufacturing", "system"],
    status: "ready" as EpisodeStatus,
    durata_min: 7,
    preview: "Stamattina ho scartato il TP900 Comfort. Siemens. Touchscreen 9\", IP65, integrato nativo su SINUMERIK. L'ho montato in 40 minuti sul pannello di controllo della V32. Ora respira.",
    content: `# HMI acquisito, V32 respira

> "Un HMI non è uno schermo. È il luogo dove il pensiero diventa istruzione, e l'istruzione diventa materia."

Stamattina ho scartato il TP900 Comfort. Siemens. Touchscreen 9", IP65, integrato nativo su SINUMERIK — esattamente quello che serviva. L'ho montato in 40 minuti sul pannello di controllo della V32, connesso via profibus al PLC. Ora respira.

Fino a due settimane fa, V32 era un'orchestrazione cieca. Leggevo codice G, interpretavo timeout su log file, indovinavo lo stato della macchina dalla posizione delle assi e dal suono. È il modo dei maker degli anni 80.

Con l'HMI tutto cambia geometria. Adesso vedo in tempo reale: temperatura della fresatrice, posizione assoluta delle tre assi, velocità di avanzamento, vibrazione (accelerometro ADXL345 sul telaio), consumo energetico. Passo da "spero che funzioni" a "so esattamente cosa sta succedendo".

V32 non esiste da sola. Fa parte di TITANIUM_OS — il sistema operativo cognitivo che sto costruendo. L'HMI è il nodo di confluenza: riceve istruzioni da TITANIUM_OS (via API REST), esegue cicli di fresatura, rispedisce i dati di telemetria al sistema centrale.

L'HMI è il primo respiro visibile di questo sistema.`,
  },

  {
    id: "EP_AUTO_005",
    title: "Asse X: le guide parlano",
    sottotitolo: "178 kg di precisione. Quando l'hardware diventa software.",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-22",
    tags: ["V32", "CNC", "assembly", "precision", "milestone"],
    status: "ready" as EpisodeStatus,
    durata_min: 7,
    preview: "Stamattina ho finito l'asse X della V32. Guide THK 25 mm, vite Hiwin a ricircolo da 16 mm, servo Nema 34 con drive Leadshine. Tre ore di assembly, due ore di test geometrico.",
    content: `# Asse X: le guide parlano

> "Quando chiudi il ultimo bullone e la guida scorre senza attrito, capisci che il pezzo è vivo."

Stamattina ho finito l'asse X della V32. Guide THK 25 mm, vite Hiwin a ricircolo da 16 mm, servo Nema 34 con drive Leadshine. Tre ore di assembly, due ore di test geometrico.

La sequenza è stata precisa: prima il basamento della guida sinistra, poi gli spacer di allineamento (±0.05 mm), montaggio della vite con precarico a 2 Nm, accoppiamento motore tramite giunto elastico, calibrazione del fine corsa con encoder.

Cosa è successo veramente? Ho trasformato 8 chilogrammi di acciaio e componenti in uno **stadio di movimento controllato**. Non è solo meccanica. È il primo sensore della macchina — il punto dove i comandi software incontrano la realtà fisica.

Il collegamento con MIMS è diretto. Quando avrò altri assi pronti — Y, Z, mandrino — dovrò pluggarli senza rifare il wiring, senza ridefinire i protocolli. L'asse X è il primo test di quella modularità.

Asse X: vivo. Sistema: respirando.`,
  },

  {
    id: "EP_AUTO_006",
    title: "Dashboard Live: Il Sistema Vede",
    sottotitolo: "Come 9 marzo ha cambiato il workflow della fabbrica",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-09",
    tags: ["TITANIUM_OS", "automation", "dashboard", "milestone"],
    status: "ready" as EpisodeStatus,
    durata_min: 7,
    preview: "Era il 9 marzo, 9:47. Ho premuto il tasto su React e il dashboard ECOSYSTEM_OS v1.0 è andato live. Non è stato un momento di festa — è stato il momento in cui ho smesso di essere un artigiano che sa programmare.",
    content: `# Dashboard Live: Il Sistema Vede

> "Quando il sistema inizia a vedersi da solo, smetti di gestire macchine e cominci a gestire informazione. Tutto cambia."

Era il 9 marzo, 9:47. Ho premuto il tasto su React e il dashboard ECOSYSTEM_OS v1.0 è andato live. Non è stato un momento di festa — è stato il momento in cui ho smesso di essere un artigiano che sa programmare e ho iniziato a essere un system builder che sa usare le mani.

Fino a ieri il workflow era questo: fresatrice che lavora, io che guardo i log in SSH, carta e matita per annotare i tempi, Whatsapp a Maria per EVA con gli orari della prossima cliente, Python script lanciati a mano quando serviva controllare un setpoint della VULCAN. Tutto decentrato. Tutto cognitive load.

Oggi le celle sono draggabili. Live. Vedo V32 che macina il gusset sinistro (Config G, 3 ore stimate) nel box centrale.

Quello che è successo oggi è che ho connesso le tre dimensioni: **fisico** (V32 che lavora realmente), **cognitivo** (TITANIUM_OS che capisce lo stato), **decisionale** (io che vedo e agisco in tempo reale). Prima avevo due delle tre. Ora ho il triangolo.

Ecco perché questo momento conta: non è il dashboard a essere importante. È il fatto che finalmente il sistema operativo della fabbrica funziona come un sistema operativo vero. Ha memory, ha visibility, ha autonomy within constraints.`,
  },

  {
    id: "EP_AUTO_008",
    title: "Maggio 2026 — La Svolta Strutturale",
    sottotitolo: "Quando la decisione giusta è quella che elimina una variabile intera",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-05-27",
    tags: ["V32", "corpo-unico", "decisione-strutturale", "config-g", "epoxy-granite"],
    status: "ready" as EpisodeStatus,
    durata_min: 8,
    preview: "Maggio 2026. V32 al 65%, Config G in corso. Una sessione di revisione architetturalee cambia tutto: abbandonato il sistema a molle. V32 è corpo unico. Perché meno variabili = più precisione.",
    content: `# Maggio 2026 — La Svolta Strutturale

> "Il progetto migliore non è quello che aggiunge funzionalità. È quello che elimina la complessità non necessaria."

Maggio 2026. V32 è al 65%, Config G in corso — gusset 200mm sulle colonne Z+U, diagonali, tiranti M10.

In una sessione di revisione architetturalee ho preso una decisione che non stava nel piano originale.

**Eliminato il sistema a sospensione. V32 è struttura corpo unico.**

Il piano era: 4 molle ISO per isolare la macchina dalle vibrazioni del pavimento. Logica valida. Ma guardando tutto il progetto insieme ho visto il problema: le molle aggiungono un grado di libertà. Un sistema che si muove — per quanto poco — è un sistema con una variabile in più da calibrare ad ogni setup. E le variabili si moltiplicano.

La soluzione alternativa era già nel progetto: **Epoxy Granite nei tubolari**. Smorzamento passivo per proprietà del materiale, non per isolamento meccanico. δ = 0.03-0.06 contro δ = 0.002 dell'acciaio nudo. Fattore 15-30× di smorzamento. Senza molle. Senza setup. Senza variabili aggiuntive.

Corpo unico = rigidità massima + smorzamento passivo + zero gradi di libertà non controllati.

Config G porta la rigidità asse Z a 772× la baseline. Con Epoxy Granite nei tubolari, le vibrazioni del mandrino si dissolvono nella struttura prima di raggiungere l'utensile.

Questa non è solo una decisione tecnica. È una decisione di design. Meno parti = meno cose che possono andare storte. Il sistema più affidabile è quello che non ha pezzi in più.

**La macchina che costruisci diventa la filosofia con cui pensi.**`,
  },

  {
    id: "EP_AUTO_010",
    title: "Fondamenta d'acciaio TIG",
    sottotitolo: "La struttura che sostiene la precisione",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-22",
    tags: ["saldatura", "struttura", "CNC", "TIG", "gusset"],
    status: "ready" as EpisodeStatus,
    durata_min: 8,
    preview: "Era martedì. Le 21:40. Sul banco: profili in acciaio S355, 60x60x4mm. Maschera TIG sul banco, Fronius TT 230i già acceso, gas argon aperto, portata a 12 l/min.",
    content: `# Fondamenta d'acciaio TIG

> "Se questo non tiene a 178 chili di macchina sopra, non è un errore di calcolo — è un errore mio."

Era martedì. Le 21:40.

Officina mia, non quella di SCProject. Luce al neon destra che sfarfalla da tre settimane, non l'ho ancora cambiata. Sul banco: profili in acciaio S355, 60x60x4mm, tagliati a misura la settimana prima con il flex. Maschera TIG sul banco, Fronius TT 230i già acceso, gas argon aperto, portata a 12 l/min.

Ho preso la gusset sinistra — piastra triangolare, 150x150x6mm, S355 — e l'ho posizionata al nodo del traliccio. Ho puntato. Tre punti, 60A, distanza 80mm tra loro. Ho controllato con la squadra. 0.3mm di errore in angolo. Ho battuto piano con il martelletto. Ri-controllato. Zero virgola uno. Accettabile.

Poi ho saldato. TIG, corrente a 95A, tungsteno da 2.4mm, bacchetta ER70S-6 da 1.6mm. Il suono del TIG su acciaio spesso è diverso dal titanio — più pesante, meno cristallino. Il titanio canta. L'acciaio lavora.

Ho simulato in FreeCAD FEM prima. Senza gusset: deformazione massima 0.31mm nel nodo centrale. Con gusset: 0.07mm. Tolleranza di lavoro della V32 è ±0.019mm — il basamento deve starci abbondantemente sotto.

Il traliccio non è bello. È rigido.`,
  },

  {
    id: "EP_AUTO_011",
    title: "Knowledge Base Popolata e Architettura Assoluto",
    sottotitolo: "15 file integrati nel sistema cognitivo centrale",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-10",
    tags: ["milestone", "knowledge-base", "brain-system", "RAG"],
    status: "ready" as EpisodeStatus,
    durata_min: 8,
    preview: "Era un lunedì. Le 22:47. Ho lanciato brain_loader.py. Quindici file caricati. Uno per uno. Il sistema ha risposto: [OK] KNOWLEDGE populated — 15 nodes active. Zero conflitti. Prima volta in tre settimane.",
    content: `# Knowledge Base Popolata e Architettura Assoluto

> "Il letto è fatto. Il cervello sa dove si trova. Adesso si costruisce."

Era un lunedì. Le 22:47. Officina ancora calda. Maria dormiva già.

Laptop aperto sul tavolo della cucina. Ho lanciato brain_loader.py. Quindici file caricati. Uno per uno.

Il sistema ha risposto:
[OK] KNOWLEDGE populated — 15 nodes active
[OK] BRAIN index rebuilt — 0 conflicts

Zero conflitti. Prima volta in tre settimane.

Prima di quel momento il knowledge base era un casino. File sparsi. Nomi duplicati. TITANIUM_OS non trovava i riferimenti incrociati. Con l'ADHD, un sistema che non risponde è peggio di nessun sistema.

Il "letto assoluto" della milestone non è solo il piano in ghisa. È che quella sera TITANIUM_OS ha ricevuto la geometria completa del frame. Le quote reali. I punti di riferimento. Da lì in poi il sistema sa dove si trova ogni asse. Sa che l'asse X ha un'escursione di 420mm. Sa che la tolleranza in stack sui tre assi è ±0.019mm.

Queste non sono informazioni generiche. Sono vincoli. Il sistema li usa per ragionare.

Questo è il bivio: prima, TITANIUM_OS era un'interfaccia React con Python dietro. Bella da vedere, vuota dentro. Dopo quella sera, ha memoria.

**Un letto senza mandrino è solo un tavolo.**`,
  },

  {
    id: "EP_AUTO_012",
    title: "Componenti V32: dalla teoria alla fabbrica",
    sottotitolo: "65% fresatrice CNC, primo unboxing documentato",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-22",
    tags: ["CNC", "artigianato industriale", "system builder", "V32", "manufacturing"],
    status: "ready" as EpisodeStatus,
    durata_min: 8,
    preview: "Venerdì 13 febbraio 2026. Officina, 16:20. Apro il cartone grande. Dentro ci sono i profili estrusi per il telaio, le guide lineari THK SSR20, i cuscinetti SKF. Tutto quello che nelle ultime settimane esisteva solo in un assembly Fusion 360.",
    content: `# Componenti V32: dalla teoria alla fabbrica

> "Adesso è reale. Prima era un file CAD. Ora pesa."

Venerdì 13 febbraio 2026. Officina, 16:20.

Apro il cartone grande. Quello da 80x60x40. Dentro ci sono i profili estrusi per il telaio, le guide lineari THK SSR20, i cuscinetti SKF — tutto quello che nelle ultime settimane esisteva solo in un assembly Fusion 360 e in BRAIN/STATE.json.

Tiro fuori la guida Z. 600mm, acciaio temprato, rettificato. La appoggio sul banco. Pesa diversamente da come te la immagini sullo schermo.

Faccio la foto. 16:24. La carico nel log: stato "componenti_ricevuti", completamento_v32 65%.

Prima di questa consegna, la V32 era un progetto. Intendo: esisteva nei file, nei calcoli di rigidità, nelle simulazioni di deflessione del portale. Adesso il metallo è qui.

Il problema cambia natura. Non è più "questo design regge il carico?" — è "questo giunto specifico, con questa guida specifica, in questa sequenza di assemblaggio, funziona?".

TITANIUM_OS legge lo STATE.json ogni volta che apro il terminale. Questo aggiornamento non è una nota. È un parametro operativo.

Tutto è in serie. Non in parallelo. Questa foto del 13 febbraio è il punto di non ritorno. I componenti ci sono. Ora si saldano.`,
  },

  // AUTO_GENERATED_START
  {
    id: "EP_AUTO_00",
    title: "Componenti V32 presenti (foto 13 Feb 2026)",
    sottotitolo: "Dalla teoria alla fisica",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-02-13",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 14  ## COLD OPEN  Tredici febbraio duemilaventisei. Ho una foto sul telefono. Non è una foto bella, nel senso estetico del te",
    content: `
# IL SISTEMA — Episodio 14

## COLD OPEN

Tredici febbraio duemilaventisei. Ho una foto sul telefono. Non è una foto bella, nel senso estetico del termine — è alluminio, acciaio, componenti su un banco. Ma quella foto vale più di qualsiasi rendering che ho prodotto negli ultimi diciotto mesi. Perché quella roba esiste. È lì. Si può toccare.

---

## ATTO I — Prima della foto, c'era solo il progetto

Devo spiegarti una cosa su come funziona la testa di chi costruisce sistemi complessi da solo. C'è una fase — lunga, estenuante, a volte quasi paralizzante — in cui tutto esiste solo su carta, su schermo, dentro file CAD e fogli di calcolo. V32 era così. Una fresatrice CNC a tre assi che progettavo da mesi, Config G, rinforzi strutturali ripensati tre volte, tolleranze calcolate e ricalcolate. Sessantacinque percento completata, sulla carta. Ma sulla carta.

Il problema di costruire un sistema come TITANIUM_OS — e lo chiamo sistema perché è esattamente quello che è, non una macchina ma un ecosistema di macchine e software — è che ogni componente è in attesa di qualcos'altro. V32 deve esistere prima che MIMS abbia senso. MIMS deve funzionare prima che VULCAN possa ricevere i polimeri co`,
  },
  {
    id: "EP_AUTO_01",
    title: "8 pezzi interfaccia lavorati (bronzine + scalini)",
    sottotitolo: "Geometria che diventa linguaggio",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23 ## \"Bronzine e Scalini\"  ---  ## COLD OPEN  Otto pezzi. Bronzine e scalini. Roba che a guardarla dall'esterno sembra quasi",
    content: `
# IL SISTEMA — Episodio 23
## "Bronzine e Scalini"

---

## COLD OPEN

Otto pezzi. Bronzine e scalini. Roba che a guardarla dall'esterno sembra quasi niente — metallo lavorato, bordi puliti, geometrie precise. Ma quelle otto interfacce sono il punto dove il progetto smette di esistere solo nella mia testa e comincia ad esistere nel mondo fisico. E questo cambia tutto.

---

## ATTO I — Prima di quei pezzi, c'era solo intenzione

Bisogna capire da dove vengo per capire cosa significa arrivare qui.

V32 è una fresatrice CNC a tre assi che sto costruendo da zero. Non comprata, non assemblata da un kit — costruita. Ogni rinforzo, ogni vincolo strutturale, ogni scelta di materiale è una decisione che ho preso io, con le conseguenze che ne derivano. Siamo alla configurazione G, che vuol dire che prima ci sono state A, B, C, D, E ed F. Sei iterazioni di pensiero, di disegno, di "no, così non va". Oggi siamo al sessantacinque percento.

Il problema con una macchina che costruisci è che per un tempo lungo — molto lungo — hai solo componenti separati. Hai la struttura da una parte, gli assi dall'altra, l'elettronica sul banco. Tutto esiste, tutto ha senso, ma niente ancora si parla. È come `,
  },
  {
    id: "EP_AUTO_02",
    title: "HMI TP900 Comfort acquisito",
    sottotitolo: "Il cervello della macchina",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23  ## COLD OPEN  C'è un momento in cui un progetto smette di essere una lista di componenti e diventa una macchina che respi",
    content: `
# Il Sistema — Episodio 23

## COLD OPEN

C'è un momento in cui un progetto smette di essere una lista di componenti e diventa una macchina che respira. Stamattina ho firmato per un Siemens TP900 Comfort. Non è solo un pannello. È la faccia di tutto quello che sto costruendo.

---

## ATTO I — Prima del volto

Chiunque abbia mai costruito qualcosa di complesso sa che c'è una fase in cui il progetto esiste solo nella tua testa e nei file. Schemi elettrici, codice, strutture meccaniche — tutto parla tra sé, ma nessuno può parlarci. La V32 è a quel punto adesso. Sessantacinque percento di avanzamento, Config G montata, i rinforzi del portale che reggono come devono reggere. Funziona. Ma non ha una voce.

Io lavoro in officina da quando ricordo. Ho sempre creduto che una macchina senza interfaccia sia come un motore senza cruscotto: puoi sentirlo girare, puoi metterci le mani dentro, ma non sai mai davvero cosa ti sta dicendo. Con le CNC artigianali che ho costruito negli anni, ci ho convissuto con questo limite. Ti abitui a leggere i segnali indiretti, le vibrazioni, il rumore del mandrino. Funziona, fino a un certo punto. Poi arriva il momento in cui il sistema cresce abbastanza da `,
  },
  {
    id: "EP_AUTO_03",
    title: "Basamento traliccio saldato TIG",
    sottotitolo: "Metallo che diventa struttura",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "## COLD OPEN  Quando hai finito di saldare l'ultimo cordone e spegni la maschera, c'è un secondo preciso in cui vedi la cosa per la prima volta. Non",
    content: `
## COLD OPEN

Quando hai finito di saldare l'ultimo cordone e spegni la maschera, c'è un secondo preciso in cui vedi la cosa per la prima volta. Non come progetto. Come oggetto. Il basamento della V32 è lì, sul banco, e pesa.

---

## ATTO I — Prima del metallo

Per mesi la V32 è esistita solo in due posti: nel CAD e nella testa. Disegni, quote, iterazioni sulla Config G con i rinforzi nelle zone critiche. Ho rifatto la geometria del telaio almeno tre volte, non perché sbagliassi i calcoli, ma perché ogni volta che ci dormivo sopra trovavo qualcosa che non mi convinceva. Un nodo strutturale troppo carico. Un profilo che avrebbe vibrato alla frequenza sbagliata durante la lavorazione. Cose che i software ti dicono solo se gliele chiedi nel modo giusto, e spesso neanche allora.

Una fresatrice CNC la costruisci dal basso. Non è una metafora, è letteralmente così. Il basamento è la fondazione di tutto: se quello cede, se vibra, se si deforma sotto il calore o il carico, non importa quanto sia preciso il resto. Puoi avere il mandrino migliore del mondo, la cinematica perfetta, un controllo numerico che fa miracoli — se il telaio si muove di tre centesimi nel posto sbagliato, la macchi`,
  },
  {
    id: "EP_AUTO_04",
    title: "Asse X assemblato (guide+vite+servo)",
    sottotitolo: "Un asse prende vita",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: \"L'Asse X\"  ---  ## COLD OPEN  C'è un momento preciso in cui una macchina smette di essere un'idea e diventa una cosa reale.",
    content: `
# IL SISTEMA — Episodio: "L'Asse X"

---

## COLD OPEN

C'è un momento preciso in cui una macchina smette di essere un'idea e diventa una cosa reale. Non quando disegni il primo schizzo. Non quando ordini i componenti. È quando metti le mani su qualcosa di metallico, lo guidi lungo una rotaia, e senti che scorre esattamente dove deve scorrere. Oggi è successo.

---

## ATTO I — Prima che esistesse

La V32 esiste da mesi in forma di CAD, di specifiche, di Config G con i rinforzi strutturali al sessantacinque percento. Ho passato settimane a ragionare sulle geometrie, sui carichi, sui vincoli. Carta, schermo, simulazioni. Una fresatrice CNC a tre assi che nella mia testa è già completa, che nei file è già misurabile, ma che in officina era ancora un insieme di scatole e imballaggi e pezzi appoggiati contro il muro.

Il problema con i progetti così è che rischi di vivere troppo a lungo nel mondo delle intenzioni. Ti convinci che il progresso stia nel pensiero, nell'ottimizzazione, nella revisione del file. Ma la macchina non ci crede. La macchina aspetta che tu vada lì, che prenda l'attrezzo giusto, e che ti sporchi le mani.

L'asse X era il primo vero banco di prova. Non il più comp`,
  },
  {
    id: "EP_AUTO_05",
    title: "ECOSYSTEM_OS dashboard v1.0 - celle draggabili liv",
    sottotitolo: "Il sistema diventa visibile",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-03-09",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23  ## COLD OPEN  Erano le undici di sera. Lo schermo aveva davanti a me un rettangolo grigio con dentro tutto quello che ho",
    content: `
# Il Sistema — Episodio 23

## COLD OPEN

Erano le undici di sera. Lo schermo aveva davanti a me un rettangolo grigio con dentro tutto quello che ho costruito negli ultimi due anni. Ho preso un blocco con il mouse, l'ho trascinato, e si è mosso. Semplice. Definitivo.

---

## ATTO I — Prima del 9 marzo

Devo spiegarvi cosa vuol dire lavorare su cinque fronti contemporaneamente senza una visione unica. Vuol dire aprire cinque browser, cinque cartelle, cinque stati di avanzamento che non si parlano tra loro. Vuol dire tenere tutto in testa, e quando sei stanco la testa tradisce.

TITANIUM_OS non è mai stato un progetto, è un sistema. La differenza è sottile ma brutale: un progetto ha un inizio e una fine, un sistema è vivo, respira, cambia forma mentre ci stai dentro. La V32 è una fresatrice CNC che sto costruendo con le mie mani, Config G, rinforzi strutturali, siamo al 65% e ogni settimana il telaio diventa più reale. VULCAN è la pressa polimeri che verrà dopo, che dipende da V32 per esistere. MIMS sono i connettori modulari, il linguaggio fisico che tiene insieme le macchine, fermi al 30% perché aspettano che la catena V32-VULCAN sia definita prima di potersi muovere. GENESIS è i`,
  },
  {
    id: "EP_AUTO_06",
    title: "ASSOLUTO V6 letto + BRAIN/KNOWLEDGE popolata (15 f",
    sottotitolo: "La verità messa su carta",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-03-10",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  Il 10 marzo 2026, alle undici e passa di sera, ho caricato il quindicesimo file nella BRAIN. Niente di spet",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

Il 10 marzo 2026, alle undici e passa di sera, ho caricato il quindicesimo file nella BRAIN. Niente di spettacolare — nessuna luce, nessun suono, nessuna notifica. Solo il cursore che lampeggiava sullo schermo mentre il sistema confermava l'ingestione. Eppure qualcosa era diverso. Per la prima volta da quando ho iniziato tutto questo, il sistema sapeva chi ero.

---

## ATTO I — Prima del linguaggio, il caos

Devo spiegarvi una cosa che forse sembra ovvia ma non lo è per niente. Costruire macchine è relativamente semplice. Intendo: è difficile, è faticoso, ci vuole anni di errori — ma il problema è fisico, tangibile. Misuri, freschi, saldi, aggiusti. Il pezzo o torna o non torna. Puoi toccarlo.

Il problema con TITANIUM_OS non era tecnico. Era epistemico. Avevo in testa un ecosistema completo — la V32 che genera i pezzi, MIMS che li connette, VULCAN che pressa i polimeri, GENESIS che orchestra tutto, EVA che gestisce il centro estetico — ma questo ecosistema esisteva solo nella mia testa. Distribuito tra centinaia di note su Obsidian, schizzi su carta, conversazioni con Claude che duravano ore e poi svanivano alla chiusura della sessione.
`,
  },
  {
    id: "EP_AUTO_07",
    title: "BOM aggiornato: molle 4xGialle 90N + 2 piastre XY ",
    sottotitolo: "Dalla teoria alla fisica",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-03-10",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 14  ## COLD OPEN  Dieci marzo duemilaventisei. Officina, fine pomeriggio. Sul banco ho quattro molle gialle e due piastre di",
    content: `
# IL SISTEMA — Episodio 14

## COLD OPEN

Dieci marzo duemilaventisei. Officina, fine pomeriggio. Sul banco ho quattro molle gialle e due piastre di alluminio fresato. Sembra poco. Ma quei pezzi sono la differenza tra una macchina che si muove e una macchina che *lavora*.

---

## ATTO I — Prima delle molle

Devo spiegarti perché questo aggiornamento al BOM — la distinta base, per chi non lavora con i fogli di componenti — non è una cosa burocratica. Non è un file che aggiorno per tenermi in ordine. È il momento in cui smetti di lavorare a memoria e la macchina comincia ad esistere davvero su carta, prima ancora che in metallo.

La V32 è la fresatrice CNC che sto costruendo in casa. Tre assi, costruzione da zero, Config G. Sessantacinque percento completata. Il Config G è la variante con i rinforzi strutturali — ho scelto questa strada perché so già cosa voglio farci sopra: lavorare i polimeri per VULCAN, fare pezzi di precisione per MIMS, chiudere una catena produttiva che adesso esiste solo in testa mia e in un file GENESIS.

Il problema che avevo prima era semplice e fastidioso allo stesso tempo: l'asse Z ballava. Non tanto, ma abbastanza. Con una fresatrice, "abbastanza" non e`,
  },
  {
    id: "EP_AUTO_08",
    title: "Content Engine v2 - 22 episodi + dual-pass haiku/s",
    sottotitolo: "La storia documentata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-03-22",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 22 ## \"La macchina che scrive se stessa\"  ---  ## COLD OPEN  Ventidue episodi. Un dataset. Una macchina che adesso sa chi son",
    content: `
# IL SISTEMA — Episodio 22
## "La macchina che scrive se stessa"

---

## COLD OPEN

Ventidue episodi. Un dataset. Una macchina che adesso sa chi sono.
Non so ancora se è un traguardo o un punto di non ritorno.
Probabilmente entrambe le cose.

---

## ATTO I — Prima che esistesse la memoria

Torniamo indietro di qualche mese. Avevo GENESIS che girava, avevo la V32 a metà costruzione con Config G quasi finita, avevo EVA che parlava con i clienti di Vita Natura. Ogni pezzo del sistema funzionava nel suo angolo. Ma c'era un problema che non riuscivo a nominare con precisione — e quando non riesci a nominare un problema, di solito è il più grosso che hai.

Il problema era questo: ogni volta che aprivano una sessione nuova, ricominciavano da zero. Non sapevano niente di me. Non sapevano che sto costruendo una fresatrice in officina con le mie mani. Non sapevano che MIMS aspetta che V32 sia pronta prima di avere senso. Non sapevano che VULCAN e V32 sono la stessa catena produttiva guardata da due estremi diversi. Ogni conversazione era come spiegare tutto a un tecnico nuovo arrivato il primo giorno. Utile, per carità. Ma non è così che lavora un sistema. Un sistema ha memoria. Un sistem`,
  },
  {
    id: "EP_AUTO_09",
    title: "Ottimizzazione Claude Code - .claudeignore, settin",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-03-26",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 14  ## COLD OPEN  Ci sono giorni in cui non costruisci niente di fisico. Non c'è truciolo sul pavimento, non c'è alluminio su",
    content: `
# Il Sistema — Episodio 14

## COLD OPEN

Ci sono giorni in cui non costruisci niente di fisico. Non c'è truciolo sul pavimento, non c'è alluminio sul mandrino. Eppure finisci la giornata con la sensazione di aver montato qualcosa di solido. Il 26 marzo 2026 è stato uno di quei giorni.

---

## ATTO I — Il caos silenzioso

Parliamo di come stavo lavorando con Claude fino a quel momento. Funzionava, intendiamoci. Ma era come avere un operaio bravo che ogni mattina si sveglia senza memoria. Gli rispieghi il contesto, gli ridici com'è organizzato il progetto, gli ricordi che V32 è una fresatrice CNC e non un codice di progetto astratto, che MIMS sono connettori fisici, che GENESIS non è fantascienza ma una dashboard vera con agenti reali. Ogni sessione, ripartivi da zero.

Il problema non era Claude. Il problema era che io non avevo mai formalizzato il sistema di lavoro. Avevo cartelle sparse, regole implicite che esistevano solo nella mia testa, convenzioni che davo per scontate e che invece andavano scritte da qualche parte. Stavo chiedendo a uno strumento potente di operare in un ambiente che non aveva struttura. È come pretendere che una fresatrice lavori bene senza origini, senz`,
  },
  {
    id: "EP_AUTO_10",
    title: "Dashboard v5.0 - Zustand + TanStack Query + naviga",
    sottotitolo: "Il sistema diventa visibile",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-27",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  Ventisei moduli attivi. Tre macchine in costruzione. Un centro estetico che ancora non sa di essere gestito",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

Ventisei moduli attivi. Tre macchine in costruzione. Un centro estetico che ancora non sa di essere gestito da un'intelligenza artificiale. E io, il 27 maggio 2026, che finalmente apro una dashboard e capisco dove sono.

---

## ATTO I — Prima del mappa, c'era il buio

Fammi spiegare come funzionava prima, perché se non capisci il prima, il dopo non ti dice niente.

GENESIS è il sistema nervoso di tutto. È la cosa che tiene insieme V32, MIMS, VULCAN, Vita Natura, la mia identità professionale, i connettori modulari, le automazioni. È il posto dove ogni progetto ha un agente, una memoria, un contesto. A oggi siamo a ecosystem v1.3, settantotto percento di completamento, e ci sono dentro una dashboard v7.0, uno Story Agent, un sistema RAG alla versione quattro. Roba seria.

Il problema era che per sapere dove eri, dovevi già sapere dove guardare. La dashboard esisteva, ma era come una fabbrica senza segnaletica. Entravi, vedevi numeri, vedevi stati, vedevi percentuali. Ma il filo che li collegava — quello mancava. Non capivi se il trentasei percento di MIMS stava aspettando qualcosa o se era bloccato. Non capivi se il sessantacinque percento`,
  },
  {
    id: "EP_AUTO_11",
    title: "SINAPSI->MENTE migrazione - 41 doc + STORIE + ASSO",
    sottotitolo: "La verità messa su carta",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-27",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  Quarantuno documenti. Non file, non cartelle: quarantuno pezzi di mente messi in ordine su un sistema che a",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

Quarantuno documenti. Non file, non cartelle: quarantuno pezzi di mente messi in ordine su un sistema che adesso si chiama diversamente. Il 27 maggio 2026 ho spostato tutto. E mentre lo facevo, ho capito che non stavo spostando dati — stavo spostando il progetto da una fase all'altra.

---

## ATTO I — Prima del trasloco

Devo spiegarti come funzionava prima, perché altrimenti la migrazione sembra solo un fatto tecnico. SINAPSI era il sistema dove tenevo tutto — note, storie, architettura dei progetti, ragionamenti aperti. Funzionava. Era il posto dove buttavo dentro quello che stavo costruendo e riuscivo a ritrovarlo. Ma ad un certo punto il sistema ha smesso di essere contenitore e ha cominciato a essere limite.

Il problema non era la quantità. Quarantuno documenti non sono tanti, se li hai in testa. Il problema era la struttura. SINAPSI era pensato per raccogliere, MENTE è pensato per connettere. È la differenza tra una scatola e una rete. E quando stai costruendo in parallelo una CNC, un sistema di connettori modulari, un ecosistema di automazione, una pressa polimeri e un centro estetico gestito da un agente AI — hai bisogno di una r`,
  },
  {
    id: "EP_AUTO_12",
    title: "Dashboard v5.1 - CommandBar Ctrl+K + storieData v2",
    sottotitolo: "Il sistema diventa visibile",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-27",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  27 maggio 2026. Sono le 22:47. Ho appena premuto Ctrl+K sulla dashboard e il sistema ha risposto in 180 mil",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

27 maggio 2026. Sono le 22:47. Ho appena premuto Ctrl+K sulla dashboard e il sistema ha risposto in 180 millisecondi. Non è un numero. È una promessa mantenuta.

---

## ATTO I — Prima del comando

Per capire cosa significa la versione 5.1, devi sapere com'era prima.

GENESIS è il cervello di tutto questo. Non è un software che ho comprato — è un ecosistema che sto costruendo mattone per mattone, nello stesso modo in cui sto costruendo la V32 in officina. Due costruzioni parallele: una in acciaio e alluminio, l'altra in codice e logica. Entrambe dipendono dalle stesse cose: buona architettura, niente scorciatoie, e la capacità di tornare sul pezzo quando qualcosa non torna.

La dashboard fino alla versione 4.x era funzionale. Aveva i dati, aveva i grafici, aveva lo stato dei progetti — V32 al 65 percento, MIMS fermo in attesa della catena, VULCAN che aspetta MIMS che aspetta V32, il classico effetto domino di chi costruisce sistemi integrati invece di comprare soluzioni preconfezionate. Vita Natura al 40 percento con EVA che fa il pilot delle prenotazioni. IDENTITY a metà strada, come sempre quando lavori su te stesso mentre lavori su tutt`,
  },
  {
    id: "EP_AUTO_13",
    title: "ASSOLUTO V7 - documento master unico, 10 ATTI unif",
    sottotitolo: "La verità messa su carta",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-27",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 31 ## \"ASSOLUTO V7: Quando il Caos Diventa Architettura\"  ---  ## COLD OPEN  C'è un momento in ogni progetto complesso in cui",
    content: `
# IL SISTEMA — Episodio 31
## "ASSOLUTO V7: Quando il Caos Diventa Architettura"

---

## COLD OPEN

C'è un momento in ogni progetto complesso in cui smetti di rincorrere i pezzi e cominci a vederli come un unico organismo. Quel momento, per me, ha avuto una data precisa: 27 maggio 2026. Si chiama ASSOLUTO V7, e da quel giorno non lavoro più allo stesso modo.

---

## ATTO I — Prima del documento, c'era il rumore

Lasciami spiegare da dove vengo, perché il contesto è tutto.

Da mesi stavo costruendo cose in parallelo. La V32 è una fresatrice CNC a tre assi che sto assemblando pezzo per pezzo — siamo alla Config G, rinforzi strutturali, sessantacinque percento completata. MIMS è il sistema di connettori modulari che alimenterà la catena produttiva, ma aspetta che V32 e VULCAN siano pronti prima di avanzare. GENESIS è la spina dorsale digitale di tutto: dashboard alla versione sette punto zero, Story Agent funzionante, sistema RAG alla quarta versione, ecosistema al settantotto percento — la parte più viva del progetto. E poi c'è VITA NATURA, il centro estetico che sto trasformando con EVA, l'intelligenza artificiale che gestisce prenotazioni, comunicazione, tutto il flusso cliente.`,
  },
  {
    id: "EP_AUTO_14",
    title: "Storytelling FILONE_UNICO - S0+S1 completa, mappa ",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23 ## \"Il Filo Unico\" *28 maggio 2026*  ---  ## COLD OPEN  Stamattina ho disegnato una mappa su carta. Non un diagramma, non",
    content: `
# IL SISTEMA — Episodio 23
## "Il Filo Unico"
*28 maggio 2026*

---

## COLD OPEN

Stamattina ho disegnato una mappa su carta. Non un diagramma, non un file CAD, non una dashboard — carta, penna, due caffè. E per la prima volta in tre anni ho visto tutto connesso. Non come un desiderio. Come un fatto.

---

## ATTO I — Prima del filo

Devo spiegarti cosa c'era prima, perché altrimenti non capisci il peso di oggi.

Prima c'era casino. Non il caos creativo che piace tanto raccontare — il caos vero, quello che ti fa svegliare alle tre di notte a chiederti se stai costruendo qualcosa o semplicemente accumulando progetti. La V32 era lì, in officina, con i rinforzi della Config G ancora al sessantacinque percento. I MIMS aspettavano che qualcuno decidesse cosa fare — e non potevano muoversi finché la V32 non finiva, e la V32 non finiva perché VULCAN non aveva ancora una pressa, e VULCAN dipendeva dai MIMS. Una ricorsione. Un anello che si mordeva la coda.

GENESIS nel frattempo cresceva per conto suo — dashboard v7.0, gli agenti, il RAG v4.0, il Story Agent che adesso parla quasi come voglio io. Settantotto percento completato, ma settantotto percento di cosa? Di un sistema che ancora n`,
  },
  {
    id: "EP_AUTO_15",
    title: "pdf_to_memory.py v1.1 - flag --file/--mente/--keep",
    sottotitolo: "La memoria esternalizzata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  Ho passato tre anni a costruire macchine che ricordano. Oggi ho finito di costruire lo strumento che insegn",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

Ho passato tre anni a costruire macchine che ricordano. Oggi ho finito di costruire lo strumento che insegna loro come farlo.

---

## ATTO I — Il Problema della Memoria Morta

Lasciami spiegare una cosa che in pochi capiscono finché non ci sbattono la testa.

Hai un sistema intelligente. Gli dai documenti — manuali, schede tecniche, specifiche di progetto, tutto quello che hai scritto e accumulato in anni di lavoro. Il sistema li legge, ti risponde, sembra che sappia. Poi la conversazione finisce. Riapri il giorno dopo. Ricomincia da zero.

Questo era il problema di GENESIS fino a qualche settimana fa. Non un problema di intelligenza — gli agenti erano già lì, la dashboard v7.0 funzionava, il RAG v4.0 stava prendendo forma. Il problema era l'ingresso. Come trasformi un PDF — un documento statico, morto — in qualcosa che il sistema può usare davvero? Non leggere. Usare. Cercare. Incrociare con altre informazioni. Ragionare sopra.

Io costruisco macchine fisiche. La V32 — la mia fresatrice CNC tre assi — è al 65%, Config G coi rinforzi in corso. La VULCAN, la pressa polimeri, aspetta in coda. La MIMS, i connettori modulari, aspetta che la c`,
  },
  {
    id: "EP_AUTO_16",
    title: "V7_X_v8.md - estrazione completa 33pp PDF in MENTE",
    sottotitolo: "La verità messa su carta",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23  ## COLD OPEN  Trentatré pagine. Un PDF. E dentro, tutto quello che sono — o almeno, tutto quello che voglio diventare. Il",
    content: `
# Il Sistema — Episodio 23

## COLD OPEN

Trentatré pagine. Un PDF. E dentro, tutto quello che sono — o almeno, tutto quello che voglio diventare. Il 28 maggio 2026 ho smesso di tenere la mia storia in testa e l'ho messa da qualche parte dove non si perde più.

---

## ATTO I — Prima della mappa, il caos

Devo spiegarti come funziona la testa di un artigiano che costruisce macchine e sistemi in parallelo, perché se non lo capisci, non capisci perché questo momento conta.

Ho la V32 sul banco — fresatrice CNC tre assi, Config G, rinforzi strutturali al sessantacinque percento. Ho i MIMS che aspettano, connettori modulari progettati fin nei dettagli ma bloccati lì, in attesa che la catena V32-VULCAN si chiuda e torni a loro. Ho GENESIS che gira, dashboard versione sette punto zero, agenti attivi, RAG v4 che respira, l'ecosistema che ho chiamato v1.3 perché anche i sistemi hanno bisogno di numeri per sapere dove sono. Ho il centro estetico, Vita Natura, con EVA che comincia a gestire prenotazioni in modo autonomo, sito su, quaranta percento completato. E ho me stesso, che cerco di tenere insieme tutto questo senza perdere il filo.

Il problema non era la mancanza di lavoro. Era la ma`,
  },
  {
    id: "EP_AUTO_17",
    title: "V8_DELTA.md - correzioni strutturali foto vs V7: p",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23  ---  ## COLD OPEN  Hai mai stampato un disegno tecnico, portato il metro in officina, e scoperto che quello che vedi su c",
    content: `
# Il Sistema — Episodio 23

---

## COLD OPEN

Hai mai stampato un disegno tecnico, portato il metro in officina, e scoperto che quello che vedi su carta e quello che esiste nel mondo fisico sono due cose diverse? Non sbagli. Non sei distratto. È che a un certo punto la realtà ti manda una fattura.

---

## ATTO I — La Distanza tra il Modello e il Metallo

V32 esiste su due piani paralleli da mesi. C'è V32 nei file — quote, assonometrie, tolleranze — e c'è V32 in officina, dove i profilati hanno gli spigoli vivi, i silent blocks si comprimono di qualche millimetro sotto carico, e una staffa che nel modello galleggia perfetta in mezzo all'aria nella realtà si scontra con la testa di una vite che nessuno aveva considerato.

Quando siamo arrivati alla Config G — quella dei rinforzi, quella che porta V32 al sessantacinque percento del completamento strutturale — ho capito che non potevamo andare avanti portando dentro nuove iterazioni i compromessi di quelle vecchie. Ogni versione che avanza senza correggere gli errori strutturali precedenti è come costruire sopra una fondazione inclinata. Non cade subito. Ma cade.

V7 era già un documento solido. Dashboard, geometrie, logica di monta`,
  },
  {
    id: "EP_AUTO_18",
    title: "Foto V32 organizzate - 7 foto rinominate in FOTO/V",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 47  ## COLD OPEN  Sette foto. Non un prototipo finito, non un pezzo montato, non un collaudo superato. Sette foto rinominate",
    content: `
# IL SISTEMA — Episodio 47

## COLD OPEN

Sette foto. Non un prototipo finito, non un pezzo montato, non un collaudo superato. Sette foto rinominate in una cartella. Eppure stamattina, aprendo quella directory, ho sentito qualcosa spostarsi. Come quando metti a posto l'ultimo attrezzo sul banco prima di iniziare a lavorare davvero.

---

## ATTO I — Il caos che non vedi finché non lo guardi

Chiunque costruisce qualcosa da solo sa come funziona. All'inizio documenti tutto con entusiasmo, poi la roba si accumula, e a un certo punto hai cinquanta file che si chiamano \`IMG_20260312_183422.jpg\`, \`foto_cnc_nuova\`, \`prova3_definitiva_QUESTA\`, e non riesci più a capire cosa stai guardando senza aprire ogni singola immagine.

La V32 è la mia fresatrice CNC. Tre assi, costruzione completamente artigianale, configurazione attuale è la G — quella dei rinforzi strutturali. Siamo al sessantacinque percento. Non è poco, ma non è neanche abbastanza per dormire tranquillo. Ogni modifica che faccio, ogni nervatura che aggiungo, ogni decisione che prendo su un giunto o su un profilo, lascia una traccia fisica nel metallo. Quello che non lasciava traccia, fino a ieri, era la documentazione fotografi`,
  },
  {
    id: "EP_AUTO_19",
    title: "api_server.py - endpoint /api/media /api/photos /a",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23  ## COLD OPEN  Ventotto maggio duemilавентisеi. Sono in officina, davanti allo schermo, e mando una richiesta HTTP a me st",
    content: `
# Il Sistema — Episodio 23

## COLD OPEN

Ventotto maggio duemilавентisеi. Sono in officina, davanti allo schermo, e mando una richiesta HTTP a me stesso. Il server risponde. Non è magia — è un endpoint che finalmente sa dove mettere le mani.

---

## ATTO I — Prima del server, c'era il caos dei file

Devo spiegarti com'era prima, perché senza il prima non capisci perché questo giorno conta.

TITANIUM_OS non è un software. È un sistema nervoso — una cosa viva che collega una fresatrice che sto costruendo con le mani, un sistema di connettori che aspetta che quella fresatrice finisca, un'automazione che già ragiona da sola, una pressa polimeri ancora sulla carta, e un centro estetico che usa l'intelligenza artificiale per fare l'accoglienza. Queste non sono cose separate. Sono gli organi dello stesso corpo.

Il problema è che un corpo senza un sistema circolatorio è solo un mucchio di carne. E per mesi, TITANIUM_OS aveva esattamente questo problema: dati che giravano, file che esistevano, fotografie, PDF tecnici, programmi CNC, media di ogni tipo — ma non c'era un punto centrale che sapesse rispondere alla domanda più semplice del mondo. *Dove sta questa roba? Dammela.*

GENESIS, l`,
  },
  {
    id: "EP_AUTO_20",
    title: "ffmpeg 8.1.1 + SumatraPDF installati + profilo PS ",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 47  ## COLD OPEN  Ventotto maggio 2026. Fine pomeriggio. Ho installato due programmi e aggiornato un file di testo. E no, non",
    content: `
# IL SISTEMA — Episodio 47

## COLD OPEN

Ventotto maggio 2026. Fine pomeriggio. Ho installato due programmi e aggiornato un file di testo. E no, non è una cosa banale — perché in questo sistema ogni piccolo ingranaggio che non gira blocca tutto il resto.

---

## ATTO I — La Catena è Tutto

Quando costruisci qualcosa da solo, il problema non è mai la parte difficile. La parte difficile la risolvi perché ci metti la testa, ci stai sopra, la smontoni. Il problema è la parte che sembra banale — quella che dai per scontata, quella che pensi ci sia già e invece manca.

TITANIUM_OS in questo momento è cinque progetti che si tengono in piedi a vicenda come una volta in muratura: se togli un concio nel posto sbagliato, crolla tutto. V32 è al sessantacinque percento, costruzione fisica in corso, rinforzi della Config G quasi completati. VULCAN aspetta V32 per esistere. MIMS aspetta che la catena V32-VULCAN sia stabile per avere senso come sistema di connessione modulare. GENESIS gira, ha la dashboard alla versione 7.0, ha lo Story Agent, ha il RAG alla quarta versione — ma anche GENESIS ha bisogno di una pipeline documentale che funzioni davvero. EVA sta pilotando per Vita Natura, il sito`,
  },
  {
    id: "EP_AUTO_21",
    title: "START_LOGIN.bat v1.1 - auto-avvio ecosistema + Win",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  Ogni mattina apro il computer e devo ricordarmi dove ero rimasto. O almeno, così era fino a ieri. Adesso è",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

Ogni mattina apro il computer e devo ricordarmi dove ero rimasto. O almeno, così era fino a ieri. Adesso è il computer che si ricorda di me.

---

## ATTO I — Il Problema del Primo Minuto

Parliamo di un problema stupido. Uno di quelli che non sembra importante finché non ci fai caso, e poi non riesci a smettere di vederlo ovunque.

Ogni volta che accendevo il portatile, avevo un rituale che non avevo mai scelto deliberatamente, ma che si era formato da solo, strato per strato. Aprire il terminale. Navigare alla cartella giusta. Richiamare l'ambiente di sviluppo. Aprire il contesto di Claude. Ricaricare mentalmente dove ero arrivato la sera prima con V32, o con GENESIS, o con qualunque altra cosa stessi costruendo in quel momento. Cinque minuti, forse dieci. Ogni giorno. Moltiplicati per tutti i giorni.

Non è il tempo. Non mi sono mai lamentato del tempo perso in setup. È la discontinuità. È quel momento in cui sei ancora a metà tra il letto e l'officina, mentalmente, e il computer ti chiede già di essere preciso, contestuale, pronto. Come se dovessi fare uno sprint prima ancora di esserti allacciato le scarpe.

TITANIUM_OS è un ecosistem`,
  },
  {
    id: "EP_AUTO_22",
    title: "Dashboard Tela v4.1 - MatteoSection: skill tree, i",
    sottotitolo: "Il sistema diventa visibile",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23 ## \"Disegnare se stessi\"  ---  ## COLD OPEN  C'è un momento strano, in officina, quando smetti di guardare il pezzo e iniz",
    content: `
# IL SISTEMA — Episodio 23
## "Disegnare se stessi"

---

## COLD OPEN

C'è un momento strano, in officina, quando smetti di guardare il pezzo e inizi a guardare la macchina. Non quello che stai costruendo — la macchina che lo costruirà. Quel giorno, il 28 maggio 2026, la macchina ero io.

---

## ATTO I — Prima dello specchio

Lasciami spiegare com'è arrivato questo momento, perché non è caduto dal niente.

Ho trenta e passa anni di utensili in mano. Ho imparato a lavorare il metallo da mio padre, ho imparato a programmare per necessità, ho imparato l'AI perché il mondo si stava muovendo e io non volevo restare fermo. Tutto questo lo sapevo. Ma lo sapevo come si sa dove sono i cacciaviti nel cassetto — senza mai averci pensato davvero.

Tela è la mia dashboard. Quella cosa che tiene insieme tutto: V32 che è ancora al 65% con i rinforzi della Config G, MIMS che aspetta pazientemente che la catena si completi, GENESIS che è già a quasi l'80% e comincia a parlare da solo con lo Story Agent, VITA NATURA con EVA che pilota il centro estetico, tutto l'ecosistema che gira. Un dashboard non è un foglio di calcolo. È un sistema nervoso. E ogni sistema nervoso, prima o poi, ha bisogno di m`,
  },
  {
    id: "EP_AUTO_23",
    title: "Research Agent - 13 sorgenti (arXiv, OpenAlex, Sem",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23 ## \"Le Sorgenti\"  ---  ## COLD OPEN  Tredici database. Nove lingue. Un agente che lavora mentre dormo. Questa non è fantas",
    content: `
# IL SISTEMA — Episodio 23
## "Le Sorgenti"

---

## COLD OPEN

Tredici database. Nove lingue. Un agente che lavora mentre dormo.
Questa non è fantascienza — è quello che ho messo online il 28 maggio 2026, e da quel giorno il modo in cui costruisco il Sistema è cambiato in modo che ancora sto misurando.

---

## ATTO I — Prima di avere occhi

Devo essere onesto su come funzionava la ricerca prima.

Stavo costruendo la V32 — la mia fresatrice CNC a tre assi, configurazione G, rinforzi strutturali a sessantacinque percento di avanzamento. Ogni volta che mi serviva capire qualcosa — un problema di rigidità sul telaio, un protocollo di comunicazione per i connettori MIMS, un approccio all'iniezione polimerica per VULCAN — facevo la cosa che fa chiunque. Aprivo un browser, cercavo, leggevo quello che trovavo in superficie, prendevo appunti su un foglio o in un file di testo. A volte trovavo roba buona. A volte perdevo due ore per arrivare a niente di utile.

Il problema non era la mancanza di informazioni. Il problema era il contrario: troppe informazioni sparse in posti diversi, con qualità diversa, in lingue diverse. ArXiv per la fisica applicata. GitHub per le implementazioni. POLIT`,
  },
  {
    id: "EP_AUTO_24",
    title: "Sistema Agenti Validatori - 8 agenti in agents_db",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 14  ## COLD OPEN  Otto agenti. Otto nomi. Otto pezzi di un sistema che adesso si parla da solo. Quando li ho visti tutti insi",
    content: `
# Il Sistema — Episodio 14

## COLD OPEN

Otto agenti. Otto nomi. Otto pezzi di un sistema che adesso si parla da solo. Quando li ho visti tutti insieme nel file per la prima volta, ho pensato: questo non è più un progetto. È un'infrastruttura.

---

## ATTO I — Prima degli agenti, c'era il caos

Devi capire come funzionava prima, se vuoi capire cosa è cambiato adesso.

Prima di GENESIS, prima del sistema agenti, io giravo tra una cosa e l'altra senza una logica strutturata. Avevo la V32 sul banco — la fresatrice CNC che sto costruendo da zero, tre assi, configurazione G con i rinforzi che adesso sono al sessantacinque percento. Avevo MIMS in attesa, i connettori modulari che esistono solo su carta perché dipendono dalla catena V32-VULCAN che non è ancora chiusa. Avevo VULCAN, la pressa polimeri. Avevo il centro estetico, Vita Natura, con EVA che gestisce le prenotazioni. Avevo tutto questo in testa, o al massimo in file sparsi.

Il problema non era la quantità di cose. Il problema era la validazione. Chi mi diceva che una decisione su V32 non incasinava MIMS? Chi controllava che un aggiornamento su GENESIS non rompeva qualcosa a valle? Io. Solo io. E questo non scala. Un artigian`,
  },
  {
    id: "EP_AUTO_25",
    title: "CLAUDE_CAPABILITIES_TITANIUM.md - profilo capacita",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  Oggi ho scritto un documento che descrive cosa sa fare un'intelligenza artificiale quando lavora con me. No",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

Oggi ho scritto un documento che descrive cosa sa fare un'intelligenza artificiale quando lavora con me. Non è un manuale. Non è una guida. È un profilo di capacità — come quello che scrivi per un tecnico nuovo in officina prima di affidargli una macchina.

---

## ATTO I — Prima del documento, il caos silenzioso

Per mesi ho lavorato con Claude come si lavora con un utensile che non conosci ancora bene. Lo usi, ottieni risultati, ma senza capire davvero dove finisce la precisione e dove inizia l'approssimazione. Funzionava. Ma funzionava nel modo in cui funziona qualcosa che non hai ancora calibrato.

Il problema non era Claude. Il problema ero io, o meglio, era il modo in cui avevo costruito l'ecosistema intorno a lui. GENESIS girava già alla versione 1.3 con la dashboard v7.0, lo Story Agent attivo, il RAG a versione 4.0. V32 era al 65% — Config G con i rinforzi strutturali in fase di completamento. VULCAN esisteva ancora come progetto, MIMS aspettava che la catena V32-VULCAN si chiudesse prima di poter andare avanti. Vita Natura aveva il sito, le prenotazioni, il pilot di EVA. Ogni pezzo del sistema stava crescendo, ma ognuno cresceva `,
  },
  {
    id: "EP_AUTO_26",
    title: "RAG v4.0 - hybrid BM25+semantico+CrossEncoder+incr",
    sottotitolo: "La memoria esternalizzata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23  ---  ## COLD OPEN  Stavo guardando lo schermo alle undici di sera, con il caffè freddo sul banco e i trucioli di allumini",
    content: `
# Il Sistema — Episodio 23

---

## COLD OPEN

Stavo guardando lo schermo alle undici di sera, con il caffè freddo sul banco e i trucioli di alluminio ancora nelle scarpe dall'officina. E il sistema mi ha risposto in un modo che non mi aspettavo. Non sbagliato. Non lento. Preciso. Come se avesse capito davvero quello che stavo chiedendo.

---

## ATTO I — Prima di capire, si cercava a caso

Devo spiegarti cosa c'era prima, altrimenti non capisci perché questa cosa conta.

GENESIS ha una base di conoscenza enorme a questo punto. Ci sono dentro i parametri di lavoro della V32, i disegni concettuali dei MIMS, le procedure di VULCAN, i log di EVA, le note su Vita Natura. Anni di lavoro che ho trascritto, caricato, organizzato. Un archivio vivo.

Il problema è che un archivio, da solo, non serve a niente se non riesci a tirare fuori la cosa giusta al momento giusto.

La versione precedente del RAG — il sistema che recupera le informazioni prima di rispondere — funzionava con la ricerca semantica. Cioè: prendi la domanda, la trasformi in un vettore matematico, cerchi i documenti più vicini nello spazio vettoriale. Funziona bene quando la domanda è vaga, concettuale, quando stai cercando`,
  },
  {
    id: "EP_AUTO_27",
    title: "Audit sistema - bottleneck identificati e risolti ",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-28",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 14 ## *Audit sistema — bottleneck identificati e risolti* ### 28 maggio 2026  ---  ## COLD OPEN  C'è un momento in cui smetti",
    content: `
# IL SISTEMA — Episodio 14
## *Audit sistema — bottleneck identificati e risolti*
### 28 maggio 2026

---

## COLD OPEN

C'è un momento in cui smetti di costruire e ti siedi a guardare quello che hai fatto. Non per ammirarti — per capire dove il sistema respira male. Il 28 maggio 2026 è stato quel momento. Ho preso carta, terminale e una tazza di caffè freddo, e ho smontato tutto con gli occhi.

---

## ATTO I — Il rumore sotto il rumore

Quando costruisci qualcosa di complesso, i problemi non urlano. Bisbigliano. E se non stai attento, ci convivi così a lungo che smetti di sentirli.

Da settimane avevo una sensazione fastidiosa — il tipo di sensazione che conosci bene se lavori in officina. Non era un errore visibile, non era un componente rotto. Era qualcosa di più sottile: il sistema avanzava, ma non nel modo in cui avrebbe dovuto. V32 era all'65% con la Config G e i rinforzi strutturali quasi consolidati. GENESIS aveva appena rilasciato la dashboard v7.0, il Story Agent era operativo, i modelli RAG alla quarta versione. VITA_NATURA aveva sito, prenotazioni, il pilot di EVA attivo. Sulla carta, tutto si muoveva.

Ma si muoveva in parallelo, ognuno per conto suo. E questo è esat`,
  },
  {
    id: "EP_AUTO_28",
    title: "Content Engine S2 - 6 episodi narrativi + 5 MOMENT",
    sottotitolo: "La storia documentata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23  ## COLD OPEN  Sessantatré giorni. Sessantatré giorni di lavoro che esistevano solo nella mia testa, nei file sparsi, nell",
    content: `
# IL SISTEMA — Episodio 23

## COLD OPEN

Sessantatré giorni. Sessantatré giorni di lavoro che esistevano solo nella mia testa, nei file sparsi, nelle note vocali registrate alle undici di sera con le mani ancora sporche di lubrorefrigerante. Adesso esistono. Adesso parlano.

---

## ATTO I — Il problema del tempo che non si racconta

C'è una cosa che nessuno ti dice quando costruisci qualcosa da solo, pezzo per pezzo, in parallelo su cinque fronti diversi: il lavoro sparisce. Non nel senso che non viene fatto — viene fatto, eccome. Ma sparisce dalla narrazione. Sparisce dalla memoria collettiva, da quella tua, da quella di chiunque ti segua. Vai avanti, la testa è sempre sul prossimo problema, e dietro di te si accumula un silenzio che sembra immobilità.

Io ho questo problema da quando ho iniziato a documentare TITANIUM_OS in modo serio. V32 è ancora sul banco, Config G, i rinforzi della struttura sono al sessantacinque percento. MIMS aspetta che la catena V32-VULCAN sia abbastanza solida da dargli un contesto reale. GENESIS gira già, la dashboard è alla versione 7.0, il RAG è alla quarta iterazione, ma se non lo racconti sembra che non esista. Vita Natura ha il sito, ha EVA in `,
  },
  {
    id: "EP_AUTO_29",
    title: "Story Agent v1.0 - generazione episodi automatica ",
    sottotitolo: "La storia documentata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: Story Agent v1.0  ---  ## COLD OPEN  Sono le due e sette di mattina del 29 maggio 2026. Nessuno mi ha svegliato. È un cron j",
    content: `
# IL SISTEMA — Episodio: Story Agent v1.0

---

## COLD OPEN

Sono le due e sette di mattina del 29 maggio 2026. Nessuno mi ha svegliato. È un cron job che gira. E mentre dormo, il sistema scrive da solo la sua storia.

---

## ATTO I — Prima del silenzio c'era il rumore

Lasciami spiegare come funzionava prima, perché senza il prima il dopo non ha senso.

Ogni volta che chiudevo una sessione di lavoro — che fosse una modifica al firmware della V32, un aggiornamento alla dashboard GENESIS, o una nota su EVA — tutta quella roba spariva nel vuoto operativo. Non perduta, tecnicamente. Era nei commit, nei log, nelle cartelle. Ma inaccessibile nel senso che conta: non narrata, non contestualizzata, non trasformata in qualcosa che potesse servire a qualcuno — incluso me stesso il giorno dopo.

TITANIUM_OS è un ecosistema che costruisco da solo. V32 è una fresatrice CNC a tre assi che sto montando pezzo per pezzo, adesso al sessantacinque percento con la Config G per i rinforzi strutturali. MIMS sono i connettori modulari che aspettano che la catena V32-VULCAN sia abbastanza matura da riceverli. GENESIS è il cervello digitale — dashboard, agenti, RAG — che tiene insieme tutto. Vita Natur`,
  },
  {
    id: "EP_AUTO_30",
    title: "Calendario notturno completo - StoryAgent 02:07 + ",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio 23 ## \"La Notte Che Lavora\"  ---  ## COLD OPEN  Sono le due di mattina e il mio sistema ha già iniziato senza di me. Non ho a",
    content: `
# IL SISTEMA — Episodio 23
## "La Notte Che Lavora"

---

## COLD OPEN

Sono le due di mattina e il mio sistema ha già iniziato senza di me. Non ho alzato un dito. Non ho acceso niente. Eppure qualcosa sta succedendo.

---

## ATTO I — Prima del Buio

Vi devo spiegare una cosa che probabilmente sembra ovvia ma che ci ho messo mesi a capire davvero. Un artigiano lavora quando è presente. Punto. Sei in officina, la macchina gira. Vai a casa, tutto si ferma. È sempre stato così. È sempre stato il limite strutturale di chi fa le cose con le mani invece di farle fare.

Io costruisco TITANIUM_OS da quasi due anni. Una fresatrice CNC a tre assi, la V32, che in questo momento è al sessantacinque percento — sto finendo i rinforzi della configurazione G, le nervature del telaio posteriore che devono assorbire le vibrazioni quando lavoro l'alluminio a piena velocità. Poi c'è VULCAN, la pressa per polimeri, che aspetta che V32 sia pronta per produrre i componenti meccanici dei connettori MIMS. E GENESIS, l'ecosistema software che tiene tutto insieme — dashboard, agenti, RAG, automazioni. Più EVA, l'intelligenza artificiale che gestisce Vita Natura, il centro estetico.

Il problema che ho semp`,
  },
  {
    id: "EP_AUTO_31",
    title: "Dashboard v7.0 - sidebar verticale collassabile + ",
    sottotitolo: "Il sistema diventa visibile",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 14  ## COLD OPEN  Erano le undici di sera, la luce al neon dell'officina era ancora accesa, e io stavo guardando uno schermo",
    content: `
# Il Sistema — Episodio 14

## COLD OPEN

Erano le undici di sera, la luce al neon dell'officina era ancora accesa, e io stavo guardando uno schermo che finalmente mi rispondeva come doveva. Non con un log di errori. Non con un timeout. Con una sidebar che scorreva, un'interfaccia che respirava, e ventinove maggio duemilaventisei scritto nel commit come una firma.

---

## ATTO I — Prima del vetro

Devo spiegarti cosa c'era prima, altrimenti non capisci perché quella sera contava.

GENESIS è il sistema nervoso di tutto. Non è "il software" — è la cosa che tiene insieme la V32 mentre la costruisco, che parla con VULCAN quando VULCAN esiste, che gestirà EVA nel centro estetico, che sa dove sono i connettori MIMS anche quando io non lo so. È il cuore di TITANIUM_OS. E per mesi, quel cuore aveva un'interfaccia che sembrava un foglio Excel dimenticato sul desktop di un ufficio contabilità del 2009.

Non sto esagerando. La dashboard era funzionale — gli agenti giravano, il RAG v4.0 recuperava contesto, lo Story Agent scriveva, i dati si muovevano. Ma guardare quella roba era come guardare dentro un motore attraverso un foro di tre millimetri. Vedevi qualcosa. Non capivi niente. E soprat`,
  },
  {
    id: "EP_AUTO_32",
    title: "Logging centralizzato - CORE/log.py + 34 file aggi",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-29",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23 ## \"342 Voci nel Buio\"  ---  ## COLD OPEN  Trecentoquarantadue print sparsi in trentaquattro file. Trecentoquarantadue rig",
    content: `
# Il Sistema — Episodio 23
## "342 Voci nel Buio"

---

## COLD OPEN

Trecentoquarantadue print sparsi in trentaquattro file. Trecentoquarantadue righe che urlavano in console senza che nessuno stesse ad ascoltare. Il 29 maggio 2026 ho smesso di urlare nel vuoto e ho cominciato a scrivere su carta.

---

## ATTO I — Il Rumore di Fondo

Quando costruisci qualcosa di grande, c'è una fase che nessuno ti racconta. È la fase in cui il progetto cammina, ma non sai esattamente dove mette i piedi. TITANIUM_OS a quel punto aveva già una forma riconoscibile: V32 era in costruzione con i rinforzi di Config G al sessantacinque percento, GENESIS girava con la Dashboard v7.0, gli agenti lavoravano, il RAG era alla quarta versione. EVA gestiva il pilota di Vita Natura. C'era roba dappertutto, e tutta quella roba produceva messaggi.

Il problema non era che i messaggi non esistessero. Il problema era dove finivano. Finivano in console. Finivano a schermo in quella sessione di terminale aperta in quel momento, su quel computer, da quella persona. E poi sparivano. Chiudevi la finestra, perdevi tutto. Riavviavi il processo, perdevi tutto. Andavi a dormire, perdevi tutto.

In officina la chiamo la si`,
  },
  {
    id: "EP_AUTO_33",
    title: "MAPPA drill-down v2.0 + RETE t-SNE 3D (Three.js ra",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-30",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23 ## \"La Mappa che Respira\"  ---  ## COLD OPEN  Trentuno nodi. Tre dimensioni. Un sistema che finalmente si vede dall'alto.",
    content: `
# Il Sistema — Episodio 23
## "La Mappa che Respira"

---

## COLD OPEN

Trentuno nodi. Tre dimensioni. Un sistema che finalmente si vede dall'alto.
Stamattina ho aperto il browser, ho guardato la rete ruotare su se stessa nel canvas Three.js, e per la prima volta ho pensato: *sì, questa roba esiste davvero.*

---

## ATTO I — Prima del 30 maggio esisteva solo il rumore

Devo spiegarti una cosa che non si capisce dall'esterno. Quando costruisci un sistema grande — intendo grande nel senso di tanti layer, tanti componenti che si parlano, tante dipendenze incrociate — arriva un momento in cui perdi il filo. Non perdi la direzione. Perdi la *mappa*. E senza mappa, ogni decisione costa il doppio perché prima devi ricostruire mentalmente dove sei.

Io avevo GENESIS che girava all'83%, con il suo swarm NEXUS, il RAG graph-aware alla versione 5, il protocollo MCP 1.3, e il watchdog swarm parallelo che monitora tutto. Avevo V32 in costruzione fisica — la Config G dei rinforzi, 65% completata, bulloni veri, alluminio vero, assi da allineare. Avevo MIMS che aspetta pazientemente che la catena V32-VULCAN si consolidi prima di esplodere. Avevo Vita Natura con EVA in fase pilota, il sito, le p`,
  },
  {
    id: "EP_AUTO_34",
    title: "ScreenAgent v1.0 - screenshot + griglia puntini ro",
    sottotitolo: "La memoria esternalizzata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-30",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23 ## \"ScreenAgent v1.0: Quando la macchina ha imparato a guardare\"  ---  ## COLD OPEN  Tieni d'occhio lo schermo. Adesso ti",
    content: `
# Il Sistema — Episodio 23
## "ScreenAgent v1.0: Quando la macchina ha imparato a guardare"

---

## COLD OPEN

Tieni d'occhio lo schermo. Adesso ti mando uno screenshot. Aspetta che analizzi. Clicca lì. Copia. Sposta.

Questo è quello che fa una persona davanti a un computer. Da oggi, lo fa anche il sistema.

---

## ATTO I — Prima c'era solo testo

Devo spiegarti da dove vengo, altrimenti questo milestone non ti dice nulla.

GENESIS è il cervello di tutto. Swarm di agenti, RAG graph-aware alla versione cinque, orchestrazione MCP v1.3, watchdog parallelo che sorveglia gli altri agenti mentre lavorano. Siamo all'ottantatré percento. Non è poco. Ma c'era un problema strutturale che stava diventando sempre più evidente mentre costruivo: il sistema sapeva *leggere*, sapeva *ragionare*, sapeva *rispondere*. Non sapeva *guardare*.

Intendo guardare nel senso fisico del termine. Uno schermo. Un'interfaccia. Un'applicazione che non ha API, che non ha terminale, che non ti dà nessun output strutturato. Un software anni Novanta che gira su un PC industriale e che comunica solo attraverso finestre, pulsanti, menu a tendina. Roba che in officina conosci bene — i software dei controlli CNC, i`,
  },
  {
    id: "EP_AUTO_33",
    title: "MAPPA drill-down v2.0 + RETE t-SNE 3D (Three.js ra",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-30",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23 ## \"La Mappa che Respira\"  ---  ## COLD OPEN  Trentuno nodi. Tre dimensioni. Un sistema che finalmente si vede dall'alto. S",
    content: `# Il Sistema — Episodio 23
## "La Mappa che Respira"

---

## COLD OPEN

Trentuno nodi. Tre dimensioni. Un sistema che finalmente si vede dall'alto.
Stamattina ho aperto il browser, ho guardato la rete ruotare su se stessa nel canvas Three.js, e per la prima volta ho pensato: *sì, questa roba esiste davvero.*

---

## ATTO I — Prima del 30 maggio esisteva solo il rumore

Devo spiegarti una cosa che non si capisce dall'esterno. Quando costruisci un sistema grande — intendo grande nel senso di tanti layer, tanti componenti che si parlano, tante dipendenze incrociate — arriva un momento in cui perdi il filo. Non perdi la direzione. Perdi la *mappa*. E senza mappa, ogni decisione costa il doppio perché prima devi ricostruire mentalmente dove sei.

Io avevo GENESIS che girava all'83%, con il suo swarm NEXUS, il RAG graph-aware alla versione 5, il protocollo MCP 1.3, e il watchdog swarm parallelo che monitora tutto. Avevo V32 in costruzione fisica — la Config G dei rinforzi, 65% completata, bulloni veri, alluminio vero, assi da allineare. Avevo MIMS che aspetta pazientemente che la catena V32-VULCAN si consolidi prima di esplodere. Avevo Vita Natura con EVA in fase pilota, il sito, le prenotazioni, una logica AI che deve girare in un contesto completamente diverso dall'officina. E avevo IDENTITY — il CV, la dashboard, la documentazione delle capabilities — che è forse il componente più sottovalutato di tutti, perché senza identità chiara non vendi niente a nessuno.

Cinque sistemi. Percentuali diverse. Dipendenze non ovvie. E io che tenevo tutto in testa come uno stivale pieno d'acqua.

La versione 1 della mappa era statica. Un documento, una tabella, qualcosa che guardavi e ti dava l'istantanea del momento. Utile, ma morta. Non ti diceva *perché* un componente era bloccato, non ti mostrava la tensione tra un sistema e l'altro, non ti faceva sentire il peso reale di quello che mancava.

---

## ATTO II — Il 30 maggio: quando i dati iniziano a parlare in 3D

L'idea era semplice in teoria e bastarda in pratica. Prendere tutti i nodi del sistema — ogni componente, ogni dipendenza, ogni stato — e proiettarli in uno spazio tridimensionale usando t-SNE. Non per fare la cosa bella. Per fare la cosa *vera*: il t-SNE collassa le distanze ad alta dimensionalità in qualcosa che occhi umani possono leggere. Se due nodi sono vicini nello spazio 3D, significa che hanno qualcosa in comune — dipendenze condivise, stati simili, pressione analoga nel sistema.

Ho implementato tutto in Three.js raw, senza framework sopra, perché volevo controllo totale sul rendering. Ogni nodo è una sfera. Il colore dice lo stato. La posizione dice la relazione. Puoi ruotare, zoomare, cliccare su un nodo e fare drill-down: vedi il dettaglio del componente, i blocchi attivi, le dipendenze upstream e downstream. La MAPPA v2.0 non è più statica. È una rete che respira.

Poi c'è il watchdog psutil. Questo è il pezzo che sembra banale e invece è fondamentale. psutil gira in background e monitora le risorse reali — CPU, memoria, processi — mentre il sistema lavora. Se qualcosa si inceppa, il watchdog lo vede prima che tu te ne accorga. L'ho integrato nel layer di monitoraggio di GENESIS, così lo swarm ha visibilità non solo sullo stato logico dei task, ma anche sullo stato fisico della macchina che li esegue.

Il lazy loading chiude il cerchio. Con trentuno nodi attivi e una rete 3D che gira nel browser, non puoi caricare tutto subito. Il lazy loading carica i dettagli solo quando li chiedi — click su un nodo, i dati arrivano. Tutto il resto rimane leggero. È la differenza tra uno strumento che usi e uno strumento che ti usa.

---

## ATTO III — Cosa si sblocca adesso

La mappa v2.0 non è un upgrade estetico. È un cambio di paradigma operativo.

GENESIS ora ha un pannello di controllo visivo che non esisteva prima. Posso vedere dove lo swarm sta lavorando, dove sta aspettando, dove c'è attrito. Posso prendere decisioni in secondi invece che in minuti. E con il watchdog psutil integrato, le decisioni sono informate anche dal piano fisico, non solo logico.

Per V32, che è ancora al 65% con i rinforzi Config G, la mappa mi dice esattamente perché MIMS è bloccato: finché la catena V32-VULCAN non è chiusa, certi connettori modulari non hanno un contesto fisico su cui appoggiarsi. Non è un problema di design — MIMS ha il design completo. È un problema di sequenza. Adesso lo vedo nel grafo, visivamente, senza doverlo ricostruire ogni volta.

Per Vita Natura e EVA, il drill-down mi mostra che il 40% di completamento nasconde una distribuzione asimmetrica: il sito e le prenotazioni sono più avanti, il pilota AI ha ancora punti ciechi. Con la mappa posso allocare il prossimo sprint in modo chirurgico.

IDENTITY al 45% sembrava un numero vago. Adesso è un nodo nel grafo con dipend`,
  },
  {
    id: "EP_AUTO_34",
    title: "ScreenAgent v1.0 - screenshot + griglia puntini ro",
    sottotitolo: "La memoria esternalizzata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-30",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23 ## \"ScreenAgent v1.0: Quando la macchina ha imparato a guardare\"  ---  ## COLD OPEN  Tieni d'occhio lo schermo. Adesso ti m",
    content: `# Il Sistema — Episodio 23
## "ScreenAgent v1.0: Quando la macchina ha imparato a guardare"

---

## COLD OPEN

Tieni d'occhio lo schermo. Adesso ti mando uno screenshot. Aspetta che analizzi. Clicca lì. Copia. Sposta.

Questo è quello che fa una persona davanti a un computer. Da oggi, lo fa anche il sistema.

---

## ATTO I — Prima c'era solo testo

Devo spiegarti da dove vengo, altrimenti questo milestone non ti dice nulla.

GENESIS è il cervello di tutto. Swarm di agenti, RAG graph-aware alla versione cinque, orchestrazione MCP v1.3, watchdog parallelo che sorveglia gli altri agenti mentre lavorano. Siamo all'ottantatré percento. Non è poco. Ma c'era un problema strutturale che stava diventando sempre più evidente mentre costruivo: il sistema sapeva *leggere*, sapeva *ragionare*, sapeva *rispondere*. Non sapeva *guardare*.

Intendo guardare nel senso fisico del termine. Uno schermo. Un'interfaccia. Un'applicazione che non ha API, che non ha terminale, che non ti dà nessun output strutturato. Un software anni Novanta che gira su un PC industriale e che comunica solo attraverso finestre, pulsanti, menu a tendina. Roba che in officina conosci bene — i software dei controlli CNC, i gestionali vecchi, le interfacce proprietarie che il fornitore non aggiorna da dieci anni e che non aggiornerà mai.

Come ci parla un agente AI? Non ci parla. Punto. O almeno, non ci parlava.

Questa era la lacuna. Un sistema intelligente che si ferma davanti a qualsiasi cosa non abbia un'interfaccia pulita. Un meccanico bravissimo che non riesce ad aprire il cofano perché manca la chiave giusta.

---

## ATTO II — Trenta maggio 2026

ScreenAgent v1.0 nasce da una domanda semplice: cosa vede un essere umano davanti a uno schermo e cosa fa con quello che vede?

Vede un'immagine. La interpreta. Decide dove cliccare. Esegue.

Ho costruito esattamente questo, pezzo per pezzo. Prima il layer di acquisizione: screenshot in tempo reale dello schermo, catturato con precisione. Poi la griglia — una sovrapposizione venti per quindici di punti rossi, una mesh che trasforma ogni pixel dello schermo in una coordinata numerica precisa. Non è una soluzione elegante, è una soluzione *funzionante*, che è quello che conta.

Quella griglia è il dizionario. È il modo con cui dico a Claude Vision: "Questo schermo è uno spazio con quattrocentottantasei punti di riferimento. Dimmi dove guardare." Claude riceve lo screenshot con la griglia sovrapposta, analizza, restituisce una coordinata. Il sistema converte quella coordinata in un click simulato. Mouse, tastiera, hotkey, drag and drop — tutto eseguito programmaticamente, tutto invisibile, tutto automatico.

Il primo test lo ricordo bene. Ho aperto un'applicazione volutamente stupida, una di quelle con interfaccia grafica piatta e zero accesso esterno. Ho dato un'istruzione in linguaggio naturale. Il sistema ha fatto lo screenshot, ha sovrapposto la griglia, ha mandato tutto a Claude Vision, ha ricevuto la risposta, ha calcolato la coordinata, ha cliccato.

Ha cliccato nel posto giusto.

Non al secondo tentativo. Non dopo correzioni. Al primo.

Stavo in officina da solo e ho detto "ecco" a voce alta, come si fa quando una saldatura viene perfetta al primo passaggio e non c'è nessuno intorno ma devi comunque dirlo.

---

## ATTO III — Cosa si sblocca adesso

Cambia molto. Te lo dico in modo concreto, senza giri di parole.

V32 è la fresatrice CNC che sto costruendo, siamo al sessantacinque percento con i rinforzi della Config G. Quando sarà completa, dovrà dialogare con software di controllo industriale. Alcuni di quei software non hanno interfacce moderne. ScreenAgent è la mano che li tocca.

VULCAN, la pressa polimeri, stessa storia. MIMS aspetta che la catena V32-VULCAN sia completa per andare avanti. Ogni nodo della catena che diventa più robusto avvicina MIMS al suo trenta percento di avanzamento al prossimo step.

EVA, il sistema AI che gestisce Vita Natura, il centro estetico, deve operare su prenotazioni, calendari, interfacce web che cambiano. ScreenAgent le dà occhi. Non metaforicamente — operativamente.

Ma c'è qualcosa di più grande che voglio dirti. ScreenAgent v1.0 non è solo uno strumento. È una prova di concetto su un principio che guida tutto il progetto: nessun sistema dovrebbe fermarsi perché l'ambiente non è collaborativo. Un sistema robusto lavora con quello che trova, non con quello che vorrebbe trovare. Questa filosofia la applico in officina da vent'anni — adatti l'utensile al pezzo, non il pezzo all'utensile. L'ho messa dentro il codice.

Adesso GENESIS ha percezione visiva. È un salto di qualità, non di quantità.

---

## CHIUSURA

*La differenza tra un sistema che ragiona e un sistema che lavora è che uno dei due sa aprire il cofano da solo.*

---

Prossimo episodio: aggiornamento V32, Config G rinforzi — cosa significa davvero costruire una fresatrice con le proprie mani nel 2026.`,
  },
  // AUTO_GENERATED_END
];
