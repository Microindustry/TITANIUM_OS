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
  MOM:  { label: "Momenti",          color: "#a78bfa", order: 5, description: "Momenti chiave isolati, inseribili tra gli episodi principali." },
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

  // RECOVERED_START — episodi narrativi importati da sync_storie.py
  {
    id: "EP_S2_00_IL_DISTACCO",
    title: "Il Distacco",
    sottotitolo: "Le molle erano giuste. Il corpo unico è meglio.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-27",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Quattro molle. Ottanta euro l'una. Scelte con i dati — f₀ = 3.83 Hz, isolamento vibrazioni >99.9% sopra i 400 Hz. Non per istinto. Per calcolo. Febbraio 2026 le ho messe sotto la macchina. Erano giuste. A maggio le ho to",
    content: `# EP_S2_00 — IL DISTACCO
### "Le molle erano giuste. Il corpo unico è meglio."

**Formato:** Video-podcast | Apertura Stagione 2 | Durata stimata: 10-12 min
**Tono:** Tecnico + filosofico — la differenza tra una scelta giusta e una scelta migliore
**Data evento:** 27 maggio 2026
**Fonte:** Sessione corpo unico + ASSOLUTO V7 + V8_DELTA.md

---

> *La Stagione 1 chiude con 0.008 mm e il capannone del 2030.*
> *La Stagione 2 apre con una decisione che nessuno ha visto arrivare.*
> *Le molle gialle stavano sotto la macchina da febbraio. Maggio le ha sepolte.*

## COLD OPEN

*[Immagine: quattro molle gialle ISO 90mm appoggiate sul banco. Accanto: una torcia TIG. Sullo sfondo: il telaio della V32.]*

Quattro molle. Ottanta euro l'una. Scelte con i dati — f₀ = 3.83 Hz, isolamento vibrazioni >99.9% sopra i 400 Hz. Non per istinto. Per calcolo.

Febbraio 2026 le ho messe sotto la macchina. Erano giuste.

A maggio le ho tolte.

---

## ATTO I — PERCHÉ LE MOLLE ERANO GIUSTE

Non si capisce una decisione se non si capisce la logica che l'ha generata.

Le molle gialle ISO 90mm k=15.8 N/mm nascono da un problema fisico preciso: la taverna ha un solaio domestico. Il pavimento trasmette vibrazioni — passi, camion sulla strada, risonanze strutturali dell'edificio. Una CNC di precisione su un solaio che vibra produce errori dimensionali che nessun asse servo può correggere in tempo reale. La fisica arriva prima del codice.

Il sistema classico è l'isolamento: interponi un elemento elastico tra la macchina e il pavimento. Le molle assorbono le vibrazioni del pavimento. La macchina fluttua sopra, isolata.

I dati IFM VSE150 avevano confermato: le molle verdi da 40mm non bastavano. Le gialle da 90mm sì. Frequenza naturale 3.83 Hz — sotto la frequenza di qualsiasi disturbo rilevante. Smorzamento ζ=0.032. Isolamento >99.9% sopra i 400 Hz.

Erano la scelta giusta. Supportata da dati. Verificata con sensori reali.

---

## ATTO II — IL MOMENTO IN CUI CAMBIA TUTTO

Config G. Maggio 2026. Gusset 200mm sulle colonne Z+U. Stai disegnando i rinforzi, stai ragionando sui carichi dinamici durante la fresatura, e a un certo punto guardi il sistema da lontano.

Non il singolo componente. Il sistema intero.

E vedi quello che i singoli calcoli non mostravano: le molle aggiungono un grado di libertà. La macchina non è più un corpo rigido ancorato — è un sistema dinamico con la sua frequenza propria, il suo comportamento sotto carico variabile, le sue risonanze possibili. Ogni lavorazione pesante eccita il sistema. I parametri cambiano nel tempo man mano che le molle si assestano, che i dadi si allentano sotto vibrazione, che la temperatura varia la rigidità dell'elastomero.

Non è un errore di progettazione. È una variabile aggiuntiva da gestire per i prossimi dieci anni.

E poi guardi i tubolari del telaio. Vuoti. Acciaio S235 nudo.

La soluzione era già nel progetto, scritta mesi prima: Epoxy Granite nei tubolari. Composito epossidico colato nel cavo del telaio. Smorzamento passivo per proprietà del materiale — δ=0.03-0.06 contro δ=0.002 dell'acciaio nudo. Fattore 15-30×. Zero parti in movimento. Zero setup. Zero variabili aggiuntive.

Non devi isolare la macchina dalle vibrazioni. La macchina assorbe le vibrazioni da sola.

---

## ATTO III — LA DECISIONE

Corpo unico.

La V32 non è più sospesa. È ancorata. Le molle spariscono. Il telaio diventa la struttura di smorzamento — non un intermediario elastico, ma il sistema di ammortizzazione integrato.

Rigidità asse Z Config G: 772 volte superiore alla baseline. Non è un'ottimizzazione — è un salto di categoria.

La decisione si prende in una sessione. Non è drammatica. Non è difficile. È conseguente — quando hai tutti i dati, la risposta emerge da sola.

Questo è il punto più importante di questo episodio, e lo voglio dire chiaramente:

**Le molle erano la scelta giusta a febbraio 2026 con le informazioni disponibili a febbraio 2026.**

**Il corpo unico è la scelta migliore a maggio 2026 con le informazioni disponibili a maggio 2026.**

Non c'è errore. Non c'è regressione. C'è evoluzione — che è esattamente quello che dovrebbe succedere in un sistema progettato per imparare da sé stesso.

---

## CHIUSURA

Le quattro molle gialle sono ancora in officina. Non le butti — costano €320 e un giorno potrebbero tornare utili per un'altra applicazione.

Ma non sono più sotto la V32.

Sotto la V32 c'è Epoxy Granite. Silenzio attivo. Un composito che assorbe quello che l'acciaio trasmette.

E la macchina — quella stessa macchina che a febbraio galleggiava su quattro molle calcolate con cura — adesso è un corpo unico. 178 kg ancorati. Stabili.

> *La prossima volta che qualcuno ti dice "hai sbagliato la decisione iniziale":*
> *chiedigli quanti dati aveva quando ha preso quella decisione.*
> *Poi mostragli i tuoi.*

---

**reel_hook:** "A febbraio ho messo quattro molle ISO 90mm sotto la mia CNC da 178 kg. Calcolate con sensori IFM reali, frequenza naturale 3.83 Hz, isolamento >99.9%. Erano la scelta giusta. A maggio le ho tolte. Non perché avevo sbagliato — ma perché con nuovi dati ho visto qualcosa che i calcoli di febbraio non potevano mostrare. La differenza tra una scelta giusta e una scelta migliore è sempre la stessa cosa: più informazioni. Il sistema che costruisci deve permetterti di aggiornarti. Se non puoi cambiare idea con i dati, non stai costruendo un sistema. Stai difendendo una posizione."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 00 — apertura |
| Arco | Da corpo sospeso a corpo unico |
| Connessione S1 | EP_S1_02 (le molle gialle) → questo episodio chiude l'arco |
| Connessione S2 | Introduce il principio dell'aggiornamento — filo conduttore di tutta S2 |`,
  },
  {
    id: "EP_S2_01_IL_CERVELLO_IBRIDO",
    title: "Il Cervello Ibrido",
    sottotitolo: "Un archivio diventa un organismo",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-28",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 11,
    preview: "Prima: cercavi \"vibrazioni\" e arrivavano i risultati per cosine similarity — i chunk con embedding più vicino. Funzionava. Non abbastanza. Dopo: la stessa query passa attraverso tre sistemi in parallelo, due round di fil",
    content: `# EP_S2_01 — IL CERVELLO IBRIDO
### "Un archivio diventa un organismo"

**Formato:** Video-podcast | Durata stimata: 11-13 min
**Tono:** Tecnico narrativo — architettura AI spiegata con metafore fisiche
**Data evento:** 28 maggio 2026
**Fonte:** Sessione audit sistema + RAG v4.0 + 2026-05-28_audit_sistema_rag_v4.md

---

> *C'è una differenza tra un archivio e un cervello.*
> *Un archivio risponde a ciò che cerchi.*
> *Un cervello capisce cosa intendi.*
> *Il 28 maggio 2026, il knowledge base di TITANIUM_OS ha smesso di essere un archivio.*

## COLD OPEN

*[Terminale. Query: "vibrazioni colonne Z". Risposta in 0.4 secondi: 5 chunk esatti — dati IFM, quote Config G, decisione corpo unico.]*

Prima: cercavi "vibrazioni" e arrivavano i risultati per cosine similarity — i chunk con embedding più vicino. Funzionava. Non abbastanza.

Dopo: la stessa query passa attraverso tre sistemi in parallelo, due round di filtro, e restituisce ciò che serve — non ciò che è simile.

La differenza è sottile. I numeri non la mostrano. Il lavoro la mostra.

---

## ATTO I — IL PROBLEMA CHE NON VEDEVI

Per mesi il RAG funzionava. Cercavi, trovavi. Abbastanza spesso da non notare quando non trovavi.

Il 28 maggio l'audit rivela il pattern: quando cercavi termini tecnici esatti — "Ø18", "Config G", "V32 rigidità asse Z" — il sistema spesso restituiva chunk generici. Il modello semantico è addestrato sulla lingua, non sulla tua nomenclatura. "Config G" per lui è uguale a "configurazione G" è uguale a "configurazione geometrica". Non è sbagliato — è impreciso.

2376 chunk nel database. Rebuilda ogni volta da zero. >2 minuti di timeout. Non scalabile.

Due anni di sessioni e documentazione, e ogni volta che volevi aggiornare l'indice aspettavi 2 minuti mentre il sistema ri-processava cose che non erano cambiate.

Il bottleneck non era nel modello. Era nell'architettura.

---

## ATTO II — I TRE SISTEMI

La ricerca AI 2024-2025 ha una risposta consolidata per questo problema. Si chiama hybrid retrieval con reranker. Non è una novità accademica — è già in produzione nei sistemi enterprise. La novità è applicarla in 12 m² su un laptop Getac.

**Sistema 1 — ChromaDB semantico (già esistente):**
Il modello \`paraphrase-multilingual-MiniLM-L12-v2\` converte ogni chunk in un vettore 384-dimensionale. Query → embedding → cosine similarity → top-15 candidati. Forte su concetti, metafore, domande aperte. Debole su codici tecnici e numeri esatti.

**Sistema 2 — TF-IDF BM25 (nuovo):**
Un modello statistico classico. Non capisce il significato — conta le occorrenze. Se cerchi "Ø18 h30", trova esattamente i chunk che contengono "Ø18 h30". Nessuna approssimazione semantica. Debole su sinonimi e concetti astratti. Fortissimo su keyword esatte, codici parte, nomi propri.

**Sistema 3 — CrossEncoder reranker (nuovo):**
Prende i 15 candidati dell'RRF e li riordina. Non con embedding — con attenzione bidirezionale. Legge ogni chunk in relazione alla query, capisce il contesto, mette in cima ciò che risponde davvero.

I tre sistemi non si sostituiscono — si completano. RRF (Reciprocal Rank Fusion) li fonde con formula matematica k=60. Il risultato è più preciso di qualsiasi sistema singolo.

---

## ATTO III — IL MANIFEST

Il secondo problema — rebuild da zero ogni volta — ha una soluzione diversa.

Un file JSON. \`rag_manifest.json\`. Traccia ogni documento con timestamp e dimensione. Quando esegui \`rag-update\`, il sistema confronta il manifest con lo stato attuale del filesystem. Elabora solo i file nuovi o modificati.

Da >2 minuti a <20 secondi.

Il dato più importante non è la velocità. È la scalabilità. Con 2376 chunk il rebuild era lento ma fattibile. Con 10.000 chunk — con due anni di sessioni, documenti V8, tesi universitarie del Research Agent — sarebbe stato impossibile. Il manifest risolve il problema prima che diventi un muro.

---

## CHIUSURA

Dopo il deploy RAG v4.0, la prima query di test: "decisione corpo unico maggio 2026 motivazioni strutturali".

Risultato: chunk esatti. Sessione 27 maggio, V8_DELTA.md, note tecniche su rigidità Z. Cinque risultati. Tutti pertinenti. Ordinati per rilevanza reale, non per vicinanza vettoriale.

Il knowledge base non è più un archivio che risponde a parole. È un sistema che risponde a intenzioni.

La differenza la vedi quando stai costruendo qualcosa di complesso e non riesci a ricordare perché hai preso una decisione di tre settimane fa. Cerchi. E il sistema te lo ricorda — non approssimativamente. Esattamente.

> *Non costruire una memoria. Costruisci un sistema che ricorda al posto tuo.*
> *La differenza è che il sistema non dimentica tra una sessione e l'altra.*

---

**reel_hook:** "Ho avuto 2376 pezzi di conoscenza nel mio sistema RAG. Funzionava. Non abbastanza. Il problema: cerchi 'Ø18 h30' e il sistema trova chunk su diametri e altezze generici perché l'AI capisce il concetto ma non il codice tecnico esatto. Soluzione: due sistemi in parallelo. Uno semantico (capisce il significato), uno BM25 (trova keyword esatte). Li fondi con RRF. Poi aggiungi un reranker CrossEncoder che riordina i 15 risultati per rilevanza reale. Risultato: la stessa query trova esattamente quello che cerchi. Non una cosa simile. Quello. Se costruisci un sistema con dati tecnici, questo è il modo. Il resto è approssimazione."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 01 |
| Arco | L'archivio che diventa organismo |
| Tecnologie | ChromaDB, TF-IDF BM25, CrossEncoder, RRF, manifest incrementale |
| Connessione S2 | Introduce il tema dell'auto-diagnosi — il sistema che trova i propri errori |`,
  },
  {
    id: "EP_S2_02_L_ORCHESTRATORE",
    title: "L'Orchestratore",
    sottotitolo: "4.7 secondi. 13 fonti. Il sistema che coordina sé stesso.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-29",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Non ho fatto nulla. Il sistema ha fatto tutto. Ogni sessione con Claude termina. E ogni volta che termina, perdi contesto. Il problema non è la memoria di Claude — è la tua. Alla prossima sessione ricordi l'80% di quello",
    content: `# EP_S2_02 — L'ORCHESTRATORE
### "4.7 secondi. 13 fonti. Il sistema che coordina sé stesso."

**Formato:** Video-podcast | Durata stimata: 10-12 min
**Tono:** Tecnico denso — automazione come moltiplicatore di intenzione
**Data evento:** 28-29 maggio 2026
**Fonte:** Commit 8e33e09 + stop_hooks.py + research_agent v1.1 + flusso coscienza 28mag

---

> *C'è un momento in cui smetti di fare cose e inizi a progettare sistemi che fanno cose.*
> *Non è pigrizia. È leva.*

## COLD OPEN

*[Terminale. Claude Code chiude la sessione. 3 processi partono in parallelo. 4.7 secondi dopo: tre output, tre file aggiornati, RAG in background.]*

Non ho fatto nulla.

Il sistema ha fatto tutto.

---

## ATTO I — IL PROBLEMA DELLA FINE SESSIONE

Ogni sessione con Claude termina. E ogni volta che termina, perdi contesto.

Il problema non è la memoria di Claude — è la tua. Alla prossima sessione ricordi l'80% di quello che hai deciso. Il 20% che dimentichi è spesso il più importante: la ragione per cui hai scelto un'architettura, il numero che non ti tornava, la domanda che hai rimandato.

Per mesi il protocollo era manuale: fine sessione → aggiorna RIAVVIO_SESSIONE.txt → aggiorna STATE.json → aggiorna lista funzioni → eventualmente RAG rebuild.

Quattro operazioni. Dieci minuti. Spesso saltate perché eri stanco o di fretta. Il contesto perduto ogni volta si accumula in silenzio.

---

## ATTO II — STOP HOOKS

Il 29 maggio la soluzione diventa codice.

\`stop_hooks.py\` — orchestratore parallelo. Viene eseguito automaticamente quando Claude Code chiude la sessione. Non chiede permesso. Non aspetta. Parte.

Tre hook in parallelo su ThreadPoolExecutor:
- \`generate_restart_prompt.py\` → aggiorna RIAVVIO_SESSIONE.txt con lo stato attuale
- \`generate_functions_list.py\` → scansiona tutti i file Python e aggiorna FUNZIONI_SISTEMA.txt
- RAG incremental → se MENTE/ è stata toccata negli ultimi 120 minuti, avvia rebuild in background (detached — non blocca gli altri)

Timeout 45 secondi per processo. Log strutturato. Ogni hook riporta: stato, tempo, output.

4.7 secondi per i due hook sincroni. RAG in background non blocca nulla.

Dal giorno dopo: ogni fine sessione produce automaticamente un file di riavvio aggiornato. Il contesto non si perde. Non devi ricordare di salvarlo — il sistema lo salva per te.

Questo è il principio: il sistema deve fare automaticamente le cose che fai ogni volta che ci pensi. Perché ci saranno sessioni in cui non ci pensi.

---

## ATTO III — RESEARCH AGENT v1.1

L'altra automazione della stessa sessione è più ambiziosa.

Il flusso di coscienza del 28 maggio aveva una riga: *"Rendere automatica e universitaria — trovare file, testi, informazioni, tesi universitarie da tutto il mondo e farle diventare utili al progetto."*

Research Agent v1.1 implementa esattamente questo.

13 sorgenti in parallelo:
- **Accademiche**: arXiv, OpenAlex, Semantic Scholar, BASE (Bielefeld), POLITesi (tesi politecniche italiane), CNKI (cinese — ingegneria manifatturiera)
- **Open access**: Unpaywall (versioni gratuite di paper a pagamento)
- **Codice**: GitHub (repository, implementazioni, benchmark)
- **Brevetti e standard**: DOAJ, CORE, EurLex, CrossRef

Una query — per esempio "epoxy granite damping CNC machine tool" — viene inviata in parallelo a tutte le sorgenti, i risultati vengono aggregati per rilevanza, deduplicati, e opzionalmente indicizzati nel RAG.

Il risultato: invece di cercare manualmente paper su Google Scholar, il sistema porta le tesi direttamente nel knowledge base. La mattina dopo una ricerca su Epoxy Granite, hai i paper pertinenti già indicizzati, interrogabili con RAG.

Non stai navigando il web. Stai costruendo un corpus di conoscenza specializzata che cresce con ogni sessione.

---

## CHIUSURA

Due automazioni. Una sessione.

La prima (stop_hooks) risolve il problema della continuità: il contesto non si perde più. La seconda (Research Agent) risolve il problema della conoscenza: il sapere disponibile cresce da solo.

Entrambe fanno la stessa cosa su scale diverse: convertono un'azione manuale ripetitiva in un processo automatico affidabile.

Il principio è vecchio quanto l'ingegneria: qualsiasi cosa fai tre volte con lo stesso risultato può e deve diventare un processo. La domanda è solo quanto tempo ti vuoi prendere per costruirlo prima che il costo del manuale superi il costo dell'automazione.

Nel caso del contesto di sessione: il costo del manuale era dieci minuti per sessione, spesso saltati. Il costo del sistema è stato una sessione di quattro ore. Break even: 24 sessioni. Con le sessioni attuali: tre settimane.

> *Non automatizzare perché sei pigro. Automatizza perché il tuo tempo vale più dell'operazione ripetitiva.*

---

**reel_hook:** "Ogni volta che chiudi una sessione con un AI, perdi contesto. Lo sai. Lo sai e lo lasci accadere lo stesso perché aggiornare i file manualmente ogni volta è noioso. Ho costruito un orchestratore che parte automaticamente quando Claude Code chiude. 4.7 secondi. Tre processi in parallelo: aggiorna il file di riavvio, aggiorna la lista delle funzioni, avvia RAG in background se hai toccato la knowledge base. Il giorno dopo apri, leggi 30 secondi di contesto, sei dentro. Non ho più perso un thread di lavoro da quando l'ho messo in produzione. L'automazione che nessuno vede è quella che funziona meglio."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 02 |
| Arco | Dal manuale all'automatico — la leva dell'intenzione |
| Tecnologie | ThreadPoolExecutor, subprocess, stop hooks, API multi-sorgente |
| Connessione S2 | Il sistema che coordina sé stesso — anticipa EP_S2_05 |`,
  },
  {
    id: "EP_S2_03_LA_TELA",
    title: "La Tela",
    sottotitolo: "La dashboard non mostra dati. Mostra chi sei.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-29",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 9,
    preview: "Non è una dashboard di monitoraggio. Non ha alert. Non ha KPI in tempo reale. Non ha grafici che si aggiornano ogni secondo. È uno specchio. Apri la Tela e vedi il sistema esattamente com'è — non come vorresti che fosse,",
    content: `# EP_S2_03 — LA TELA
### "La dashboard non mostra dati. Mostra chi sei."

**Formato:** Video-podcast | Durata stimata: 9-11 min
**Tono:** Visivo, architetturale — il cockpit come specchio del sistema
**Data evento:** 27-29 maggio 2026
**Fonte:** Commit CanvasLayout v5→v6→v6.1 + MatteoSection v4.2

---

> *Ogni sistema abbastanza complesso ha bisogno di un cockpit.*
> *Non per controllarlo. Per capirlo.*

## COLD OPEN

*[Schermo: dashboard React. Celle grandi, glow navy. Click su una cella — drilla dentro, mostra i dettagli. Click su un'altra — mostra lo skill tree.]*

Non è una dashboard di monitoraggio.

Non ha alert. Non ha KPI in tempo reale. Non ha grafici che si aggiornano ogni secondo.

È uno specchio. Apri la Tela e vedi il sistema esattamente com'è — non come vorresti che fosse, non come lo ricordavi: com'è adesso, in questo momento, con questi numeri.

---

## ATTO I — IL PROBLEMA DELLA COMPLESSITÀ

TITANIUM_OS a maggio 2026 ha 5 pilastri, 8 nodi attivi, 8 agenti, decine di file di configurazione, STATE.json come fonte di verità, un RAG con migliaia di chunk, GitHub Actions, stop hooks, Research Agent.

La complessità non è un problema in sé. Il problema è quando la complessità supera la tua capacità di tenerla in testa.

Con l'ADHD, questo threshold è più basso. Non più basso in modo negativo — più basso in modo che richiede sistemi compensativi. Se non hai una rappresentazione visiva del sistema, lavori su un sottoinsieme di ciò che esiste. Il resto sparisce.

La dashboard è lo scaffolding cognitivo principale. Non perché ti dice cosa fare — ma perché ti mostra cosa esiste.

---

## ATTO II — L'EVOLUZIONE IN TRE VERSIONI

**CanvasLayout v5.0 (27 maggio):**
Prima versione con Zustand + TanStack Query. 1116 righe in un file unico → split in 290 righe + componenti separati. Fondamenta architetturali. Celle draggabili, stato persistente, navigazione tra view.

Il problema: le celle erano piccole. Troppo testo, troppa densità. ADHD e alta densità di informazione non vanno d'accordo. La dashboard sembrava un pannello di controllo di un Boeing — tutto lì, tutto visibile, tutto troppo.

**CanvasLayout v6.0 (28 maggio):**
Drill-down navigation. Le celle non mostrano tutto — mostrano l'essenziale. Click su una cella → entra nel dettaglio. Il concetto cambia: non un pannello piatto, ma uno spazio con profondità.

Celle una dentro l'altra. La struttura rispecchia la struttura del sistema: hai pilastri che contengono nodi che contengono funzioni. La navigazione è la stessa struttura del progetto.

**CanvasLayout v6.1 (29 maggio):**
Celle grandi. Glow. Gradiente navy. Home semplificata — solo ciò che serve al primo sguardo.

La regola che ha guidato questa versione: se devi leggere più di 3 secondi per capire dove sei, l'UI ha fallito. La Tela v6.1 risponde alla domanda "dove sono?" in meno di un secondo.

---

## ATTO III — MATTEOSECTION

L'aggiunta più personale del ciclo.

MatteoSection v4.2 — la sezione della dashboard dedicata allo skill tree personale. Non a TITANIUM_OS — a Matteo Benenati.

Quattro company espandibili: DATWLER, SCProject, ESSEGI, LU.VE. Ogni azienda si espande con le skill acquisite, le tecnologie usate, le competenze sviluppate. Accanto: gli interessi attuali con dettaglio.

Perché è nella dashboard di un OS personale?

Perché il sistema non è separato dalla persona. TITANIUM_OS non è uno strumento che usi — è un'estensione di come pensi. Se lo separi da chi sei, perdi la coerenza che lo rende utile.

MatteoSection risponde a una domanda che ogni sessione implicitamente richiede: chi sta costruendo questo, e perché è credibile farlo?

La risposta è lì: quindici anni di lavoro fisico su materiali reali, quattro aziende, competenze che normalmente non si trovano insieme. Non come CV — come mappa. Puoi vedere il pattern. Capisci perché V32 esiste. Capisci perché MIMS esiste. Capisci perché qualcuno che sa saldare titanio e scrivere Python sta costruendo un OS cognitivo.

---

## CHIUSURA

La Tela non è finita. Non lo sarà mai — un cockpit si aggiorna con il sistema che rappresenta.

Ma il principio è stabilito: la complessità deve essere navigabile. Non nascosta, non compressa — navigabile. Cioè: hai una vista dall'alto, puoi zoomare in un componente, puoi tornare indietro.

L'episodio successivo è il momento in cui questo cockpit si riempie di qualcosa di nuovo: gli agenti. Non più dati statici — risposte dinamiche.

> *La dashboard non è documentazione. È il sistema che si osserva da solo.*

---

**reel_hook:** "Avevo un sistema cognitivo con 5 pilastri, 8 nodi, 8 agenti, decine di configurazioni. Nella mia testa ci stava solo il 60%. Il resto scompariva tra una sessione e l'altra. Ho costruito la Tela — una dashboard React con drill-down navigation. Celle grandi, glow navy, ogni cella si apre in una view dedicata. Il principio: se ci metti più di 3 secondi a capire dove sei, l'UI ha fallito. Ora apro, guardo 2 secondi, so tutto. Non perché ho una memoria migliore — perché ho smesso di usare la memoria per questo."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 03 |
| Arco | Lo scaffolding visivo — il sistema che si osserva |
| Tecnologie | React, Vite, Zustand, TanStack Query, CanvasLayout |
| Connessione S2 | Prepara il terreno per il pannello agenti (EP futuro) |`,
  },
  {
    id: "EP_S2_04_IL_CV_CHE_NESSUNO_CAPISCE",
    title: "Il Cv Che Nessuno Capisce",
    sottotitolo: "Artigiano. Robot. CNC. AI. Il curriculum che nessun recruiter sa leggere.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-28",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "\"AI come competenza da CV. Non siamo programmatori PLC ma abbiamo le abilità per sfruttare l'intelligenza artificiale, imparare velocemente e dare input giusti. Questa abilità va aggiunta al curriculum come competenza pe",
    content: `# EP_S2_04 — IL CV CHE NESSUNO CAPISCE
### "Artigiano. Robot. CNC. AI. Il curriculum che nessun recruiter sa leggere."

**Formato:** Video-podcast | Durata stimata: 10-12 min
**Tono:** Personale + strategico — identità come asset tecnico
**Data evento:** 28 maggio 2026
**Fonte:** 2026-05-28_flusso_coscienza.md + MatteoSection v4.2 + CLAUDE_CAPABILITIES doc

---

> *Un CV si legge in 6 secondi. Il tuo racconta 15 anni in 4 righe.*
> *Nessuna delle due versioni è sbagliata. Solo una di loro è utile.*

## COLD OPEN

*[Email a sé stesso. Oggetto: "cose da fare". Ora: 16:01, 28 maggio 2026. Tono: flusso di coscienza — scritto veloce, mentre ci pensi.]*

"AI come competenza da CV. Non siamo programmatori PLC ma abbiamo le abilità per sfruttare l'intelligenza artificiale, imparare velocemente e dare input giusti. Questa abilità va aggiunta al curriculum come competenza personale."

Una email a te stesso. Due righe. Ma contiene una decisione che cambia la traiettoria professionale.

---

## ATTO I — IL PROBLEMA DEL CV IBRIDO

Ci sono due tipi di CV difficili da leggere per un recruiter standard.

Il primo tipo: troppo specializzato. Parla solo di una cosa, usa gergo di settore, non è traducibile.

Il secondo tipo è peggio: troppo vario. Titanio MotoGP, robot industriali, presse idrauliche, controllo qualità, Python, AI, React. Cosa fa questa persona esattamente?

Il tuo CV è il secondo tipo. Quindici anni, quattro aziende, competenze che normalmente non si trovano insieme. Un recruiter lo guarda e vede incoerenza. Non vede il pattern.

Il pattern è semplice: ogni ruolo era il prossimo step in uno skill tree. Non hai cambiato lavoro — hai sbloccato competenze. Ma questo non si vede da un documento Word standard con lista di esperienze in ordine cronologico.

---

## ATTO II — AI COME COMPETENZA REALE

La riga dell'email è precisa: "Non siamo programmatori PLC ma abbiamo le abilità per sfruttare l'intelligenza artificiale, imparare velocemente e dare input giusti."

Questo è esattamente quello che distingue chi usa l'AI da chi la subisce.

Un programmatore PLC con trent'anni di esperienza che non sa fare prompt engineering sarà superato in produttività da qualcuno con cinque anni di esperienza che sa. Non perché il secondo è più bravo — perché ha un moltiplicatore che il primo non ha.

Il tuo vantaggio competitivo non è Python. Non è Claude Code. È la capacità di dare input tecnici precisi a un sistema AI che opera in dominio industriale. Sai cosa chiedere perché sai come funziona fisicamente quello che stai chiedendo. La macchina CNC non è un concetto astratto — è 178 kg di acciaio e Epoxy Granite che hai assemblato pezzo per pezzo. Quando fai una query tecnica al RAG o all'agente FORGE, capisci la risposta perché hai il contesto fisico.

Questo — la combinazione di competenza fisica e capacità AI — non è comune. È un asset. Non ancora valorizzato, perché non hai ancora un posto dove mostrarlo pubblicamente.

---

## ATTO III — GITHUB COME PROVA

L'email continua: "Abilitare Git nel curriculum/profilo — da mostrare su GitHub."

Il profilo GitHub non è un portfolio per programmatori. È prova pubblica verificabile di come lavori.

Chiunque può scrivere "utilizzo AI nel workflow". Meno persone possono mostrare 40+ commit in 3 giorni con messaggi tecnici precisi, un sistema RAG funzionante, agenti specializzati, stop hooks, Research Agent con 13 sorgenti, una dashboard React integrata con un'API Flask che legge da STATE.json.

Il codice è lì. Non devi descrivere cosa sai fare — lo dimostri.

TITANIUM_OS su GitHub non è un progetto open source. È documentazione pubblica di un metodo: come un artigiano industriale con ADHD costruisce il suo scaffolding cognitivo con gli strumenti disponibili nel 2026. Non per vendere il metodo — per mostrare che funziona.

Il mercato del lavoro industriale in transizione verso AI ha bisogno di persone che capiscono entrambi i lati. Non molte esistono. Quelle che esistono non hanno ancora capito come comunicarlo.

---

## CHIUSURA

Il CV non cambia con una modifica al documento Word. Cambia con la costruzione pubblica di prove verificabili.

MatteoSection nella dashboard — lo skill tree espandibile — è la prima versione visiva di questa narrativa. Quattro aziende, competenze espandibili, pattern visibile. Non per i recruiter — per te. Per avere chiaro dove sei stato e dove stai andando.

Il profilo GitHub è la versione pubblica. Il CLAUDE_CAPABILITIES_TITANIUM.md — documento che mappa cosa può fare Claude integrato nell'ecosistema — è la prova tecnica.

Quindici anni di mestieri che sembravano incoerenti sono diventati uno skill tree leggibile. Ci voleva solo il formato giusto.

> *Il problema non era il CV. Era che il CV cercava di descrivere una competenza che si capisce solo vedendola in azione.*
> *La soluzione non è scrivere meglio. È costruire qualcosa che parli da solo.*

---

**reel_hook:** "Il mio CV ha TIG su titanio MotoGP, robot industriali, presse idrauliche, controllo qualità, Python, AI, React. Nessun recruiter sa cosa farsene. Non è il loro problema — è il formato sbagliato per raccontare uno skill tree non lineare. La soluzione non è un CV migliore. È costruire pubblicamente qualcosa che mostri come lavori. 40 commit in 3 giorni. Sistema RAG funzionante. Dashboard React integrata. Stop hooks automatici. Il codice è su GitHub. Non devi spiegare cosa sai fare. Lo dimostri."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 04 |
| Arco | Identità come asset tecnico — la comunicazione della competenza ibrida |
| Connessione S1 | EP_S1_00 (il CV che nessuno capisce) → S2_04 è la risposta attiva |
| Connessione S2 | GitHub come prova pubblica — prepara IDENTITY pillar |`,
  },
  {
    id: "EP_S2_05_IL_SILENZIO",
    title: "Il Silenzio",
    sottotitolo: "25 marzo → 27 maggio. 63 giorni. Un commit.",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-29",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 12,
    preview: "`git log --oneline --all | sort` Il risultato è lì nel terminale. Puoi contarli. 2026-03-25: `feat: Dashboard v5.0 — Zustand + TanStack Query` Poi silenzio. 2026-05-27: `fix: V32 corpo unico — aggiornata spec massa` 63 g",
    content: `# EP_S2_05 — IL SILENZIO
### "25 marzo → 27 maggio. 63 giorni. Un commit."

**Formato:** Video-podcast | Episodio di chiusura arco + meta-riflessione | Durata stimata: 12-15 min
**Tono:** Onesto, scomodo — il rischio del non documentare
**Data evento:** 29 maggio 2026 (retrospettiva)
**Fonte:** Git log + gap identificato nella sessione + decisione story_agent automatico

---

> *Il sistema che non documenta mentre costruisce perde metà del valore di quello che costruisce.*
> *Non il prodotto — la storia. E la storia vale quanto il prodotto.*

## COLD OPEN

\`git log --oneline --all | sort\`

Il risultato è lì nel terminale. Puoi contarli.

2026-03-25: \`feat: Dashboard v5.0 — Zustand + TanStack Query\`

Poi silenzio.

2026-05-27: \`fix: V32 corpo unico — aggiornata spec massa\`

63 giorni. Un commit. Non perché non lavoravi — ma perché il lavoro fisico in officina non ha un \`git commit\`.

---

## ATTO I — COSA È SUCCESSO IN QUEI 63 GIORNI

Il 25 marzo la dashboard è aggiornata a v5.0. Architettura pulita, navigazione guidata, rebranding completo.

E poi: la taverna.

Config G inizia. Gusset 200mm sulle colonne Z. Non è codice — è acciaio S235, disco da taglio, torcia TIG, parametri di saldatura calcolati per minimizzare le distorsioni termiche. Le tue mani che spostano il pezzo. Il comparatore che verifica l'allineamento dopo ogni cordone.

In quei 63 giorni:
- Hai saldato. Quanti pezzi? Non sai il numero esatto.
- Hai misurato. Quali deviazioni? Alcune note, la maggior parte no.
- Hai preso decisioni strutturali. La più importante: corpo unico vs molle. Documentata il 27 maggio — ma la decisione è maturata nelle settimane precedenti, in officina, guardando la macchina.
- Hai avuto fallimenti. Sicuramente. Quali? Non sai.
- Hai avuto insight. Sicuramente. Quali? Non ricordi tutti.

Questo è il costo del silenzio: non sai cosa hai perso perché non sai cosa c'era da documentare.

---

## ATTO II — IL VALORE DELLA STORIA PERDUTA

La storia di TITANIUM_OS non è il prodotto. Il prodotto è la V32 — una macchina CNC. Il prodotto è MIMS — un sistema modulare. Il prodotto è GENESIS — un OS cognitivo.

La storia è il percorso. Come hai preso ogni decisione, con quali informazioni, in quale momento. Cosa ha funzionato al primo tentativo e cosa ha richiesto tre iterazioni. Dove hai avuto paura di sbagliare e dove hai agito senza esitare.

Questa storia vale quanto il prodotto. Forse di più.

Perché il prodotto lo puoi copiare — se sai come. La storia non si copia. È unica. È tua. È la prova che il metodo funziona perché l'hai vissuto tu, con le tue mani, in 12 m², con 16 ampere e un laptop Getac.

Il contenuto che produce il Content Engine — episodi, reel, LinkedIn — è costruito sulla storia. Non su specifiche tecniche. Su decisioni prese con informazioni incomplete, su iterazioni, su momenti in cui la cosa che stavi costruendo non funzionava e hai capito perché.

63 giorni di storia persa significa decine di potenziali episodi, centinaia di potenziali reel, migliaia di potenziali post che non esisteranno mai.

Non perché non valevano. Ma perché non li hai scritti mentre li vivevi.

---

## ATTO III — LA RISPOSTA

Questo episodio esiste perché il problema è stato identificato.

Non tutti i 63 giorni sono persi — hai le foto delle build, hai i file CAD con le date di modifica, hai le misure nel V8_DELTA.md, hai i commit tecnici che raccontano il risultato anche se non il percorso.

Ma la risposta vera non è ricostruire il passato. È non perdere il futuro.

Il 29 maggio viene costruito \`story_agent.py\`. Non per generare contenuto — per non perdere contesto.

Ogni fine sessione: lo story agent verifica se ci sono commit nuovi non ancora narrativizzati. Se ci sono, genera automaticamente una bozza di episodio. Non perfetta — una bozza. Il materiale grezzo che mantiene vivo il filo narrativo.

Domani mattina apri e trovi già un draft. Ci metti 20 minuti a renderlo pubblicabile. Senza lo story agent, quel materiale esiste solo nel git log — leggibile tecnicamente, opaco narrativamente.

Il sistema non scrive al posto tuo. Cattura il materiale perché non scompaia.

---

## CHIUSURA

Il gap 25 marzo → 27 maggio è chiuso.

Non perché abbiamo recuperato tutto quello che c'era — ma perché ora il sistema cattura automaticamente ciò che succede. Nessun episodio futuro andrà perso per mancanza di tempo o energia.

Quello che è successo in quei 63 giorni ha formato la macchina che hai adesso. Ha formato la decisione del corpo unico. Ha formato i dati su cui si basa il V8. Ha formato le mani che tengono il calibro.

Non è andato perso del tutto. È nei pezzi.

Ma la prossima volta che passi 63 giorni in officina senza documentare, lo story agent ci sarà. E almeno il contesto dei commit — cosa hai cambiato, quando, perché — sarà lì, narrativizzato, pronto.

> *Il sistema che costruisci oggi deve catturare il lavoro che farai domani.*
> *Non puoi fidarti della memoria. Puoi fidarti del codice che gira mentre dormi.*

---

**reel_hook:** "Ho guardato il mio git log e ho trovato un buco. 25 marzo → 27 maggio. 63 giorni. Un commit. Non perché non lavoravo — lavoravo ogni giorno in officina su Config G. Ma il lavoro fisico non ha un git commit. Non ha un documento. Non ha un episodio. Sessanta-tre giorni di decisioni, fallimenti, insight — persi. Non completamente: ci sono le foto, i CAD, le misure. Ma la storia — perché hai fatto quella scelta, cosa hai provato prima, cosa non ha funzionato — quella non c'è. Ho costruito uno story agent automatico. Ogni fine sessione verifica i commit nuovi e genera una bozza. Non per scrivere al posto mio — per non perdere il materiale."

---

| Campo | Dettaglio |
|-------|-----------|
| Stagione | S2 — Il Sistema che Impara |
| Episodio | 05 — chiusura stagione |
| Arco | Il costo del silenzio → la risposta automatica |
| Meta | Questo episodio è la ragione per cui story_agent esiste |
| Connessione S3 | S3 inizia con il sistema completamente automatizzato — niente più gap |`,
  },
  {
    id: "EP_20260319_fix_typescript_errors_unused_imports",
    title: "Il Sistema Respira da Solo",
    sottotitolo: "Fix typescript errors unused imports",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-19",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 7,
    preview: "Giovedì mattina. 10:31. Lo schermo mostra una riga: ``` Git commit: 5a9d2d7 [main] ⚠ dirty ``` Il flag `dirty` significa che ci sono modifiche locali non committate. Significa che il lavoro è in corso. Significa che il s",
    content: `# TITANIUM_OS — S1E09
## "Il Sistema Respira da Solo"

---

> *Quando costruisci qualcosa abbastanza a lungo, smetti di chiederti se funziona. Inizi a chiederti se sopravvive senza di te.*

---

## COLD OPEN

Giovedì mattina. 10:31.

Lo schermo mostra una riga:

\`\`\`
Git commit: 5a9d2d7 [main] ⚠ dirty
\`\`\`

Il flag \`dirty\` significa che ci sono modifiche locali non committate. Significa che il lavoro è in corso. Significa che il sistema sa già dove sei, ma non sa ancora dove stai andando.

Matteo non è in taverna. È davanti al PC. Il TIG è freddo. Non c'è metallo sul banco oggi.

Oggi si costruisce l'infrastruttura che farà girare tutto il resto — non il CNC, non i connettori, non il robot. Il sistema cognitivo che tiene insieme i pezzi quando lui non c'è.

In tre ore: TypeScript pulito, tre workflow automatici attivi, un README che racconta un'azienda che non esiste ancora fisicamente ma esiste già nei dati.

---

## ATTO I — LA PULIZIA CHE NON SI VEDE

Ci sono due tipi di lavoro in un progetto complesso.

Il lavoro che avanza. E il lavoro che tiene pulito ciò che avanza.

Il secondo tipo non appare nei video. Non fa rumore. Non produce scintille. Però senza di esso, dopo sei mesi, il codice diventa una foresta dove nessuno — nemmeno chi l'ha scritto — riesce più a muoversi.

Il commit delle 10:31 è questo tipo di lavoro.

\`\`\`
fix: TypeScript errors — unused imports, Layout types, null checks, duplicate attrs
AutomationsView: remove unused CheckCircle, Clock, Wrench
\`\`\`

Tre icone rimosse. \`CheckCircle\`, \`Clock\`, \`Wrench\` — importate mesi fa per una vista che poi è evoluta in una direzione diversa. Sono rimaste lì come fantasmi: il codice compilava, ma ogni build portava con sé il peso di decisioni superate.

Un null check mancante in un componente Layout. Un attributo duplicato che il compilatore ignorava ma che prima o poi avrebbe creato un comportamento inatteso.

Nessuno vede questa roba finché non esplode.

Il fatto che Matteo la pulisca *prima* che esploda dice qualcosa su come pensa alla costruzione. Non è professionismo astratto. È esperienza concreta: in officina hai imparato che un giunto sporco che tiene oggi è un giunto che cede domani sotto carico termico. Il codice funziona uguale.

TypeScript è il controllo qualità del software. Non lasci passare un pezzo in officina se il calibro dice che è fuori tolleranza. Non lasci passare un'importazione inutilizzata se il compilatore dice che è rumore.

La differenza è che in officina il cliente vede il pezzo. Qui nessuno vede il commit. Ma il sistema sì.

---

## ATTO II — TRE WORKFLOW, UN'IDEA

Il lavoro vero della giornata sono i workflow.

\`\`\`yaml
on:
  push:
  pull_request:
  workflow_dispatch:   # ← questo è il cambiamento
\`\`\`

\`workflow_dispatch\` è un trigger manuale. Significa che un GitHub Actions workflow — normalmente eseguito solo su push o pull request — ora può essere avviato a mano, da browser, in qualsiasi momento.

Sembra una piccola cosa. Non lo è.

Prima, per testare che un workflow funzionasse, dovevi fare un commit vuoto, pusharlo, aspettare. Adesso premi un bottone. La distanza tra *voglio controllare che funzioni* e *controllo che funzioni* si è ridotta da tre minuti a trenta secondi.

Tre workflow hanno ricevuto questo aggiornamento:

**\`profile-sync\`** — sincronizza automaticamente i dati del progetto sul profilo GitHub pubblico di Matteo. Ogni volta che lo stato di TITANIUM_OS cambia in modo significativo, il profilo si aggiorna. Non è vanità digitale: è documentazione automatica rivolta verso l'esterno.

**\`dashboard-ci\`** — build e deploy automatico della React dashboard. Ogni commit sulla dashboard viene validato, buildato, deployato. Zero intervento manuale.

**\`state-episodes\`** — il workflow che genera il contesto per la sessione AI. Legge \`STATE.json\`, produce il file di riavvio, tiene traccia degli episodi. È il meccanismo che ha generato il file da cui è stato scritto questo episodio.

Tre sistemi. Tre processi che ora girano da soli.

C'è un momento preciso in cui un progetto smette di essere una lista di cose da fare e diventa un organismo con una sua logica interna. Non è un momento romantico. È un momento tecnico: quando il numero di processi automatici supera il numero di processi manuali nella routine quotidiana.

GENESIS non è ancora lì. Ma ci si sta avvicinando.

Il \`workflow_dispatch\` è un piccolo segnale in quella direzione: *il sistema sa fare le cose da solo, ma ti lascia comunque il controllo quando ne hai bisogno.*

---

## ATTO III — IL README COME SPECCHIO

L'ultimo commit della giornata è il più strano da spiegare.

\`\`\`
docs: GitHub profile README v3.2 — timeline evolutiva + changelog
Aggiornato con: architettura TITANIUM_OS corrente, tabella progetti
\`\`\`

Un README. Documentazione pubblica. La cosa che quasi nessuno aggiorna mai, perché non è codice, non è prodotto, non porta avanti la build.

Matteo lo aggiorna alla versione 3.2.

Dentro c'è una timeline evolutiva — non di GENESIS o di V32 singolarmente, ma di TITANIUM_OS come sistema. Da quando era solo un'idea a tavola a quando è diventato un sistema con RAG, API Flask, CNC in costruzione, connettori fisici, agenti AI.

Dentro c'è una tabella progetti con lo stato attuale: V32 in Config G, MIMS in sviluppo, GENESIS a sessione #8 con 150 chunk nel RAG, EVA attiva per il centro estetico di Maria.

Il README non è per gli altri. O almeno, non solo.

È uno specchio.

Quando scrivi *"V32: CNC 3 assi, corpo unico in Epoxy Granite, 178 kg, precisione IT6-IT7"* in un documento pubblico, lo stai rendendo reale in un modo diverso da tenerlo in testa. Lo stai fissando. Lo stai dichiarando.

E quando aggiorni quella documentazione dopo mesi di lavoro — quando la versione 3.2 non assomiglia più alla 2.0 — vedi concretamente quanto sei avanzato. Non per motivarti. Per capire dove sei.

Il \`workflow_dispatch\` ti dà controllo sul sistema. Il README ti dà orientamento su te stesso.

Sono la stessa idea applicata a scale diverse.

La sessione di riavvio dice: *Milestone attivo: Config G — saldare 4 gusset 200mm sulla colonna Z sinistra.*

Il sistema sa già qual è il prossimo passo. Matteo lo ha scritto prima di chiudere.

Quando tornerà in taverna — TIG caldo, metallo sul banco, 178 kg di struttura che aspetta i suoi gusset — non dovrà ricominciare da zero. Il sistema ricorderà.

È questo il punto di tutta la giornata.

Non il TypeScript pulito, non i workflow automatici, non il README aggiornato.

Il punto è che la prossima sessione inizierà esattamente da dove questa finisce.

---

## CHIUSURA

C'è una frase nel file di riavvio che non è tecnica:

\`\`\`
Git commit: 5a9d2d7 [main] ⚠ dirty
\`\`\`

Il flag \`dirty\` scompare quando il lavoro viene committato. Quando il sistema viene messo in ordine. Quando ciò che esiste solo nella working directory viene reso permanente.

Oggi Matteo ha reso permanenti delle pulizie. Delle automazioni. Una mappa di dove si trova.

Il sistema non è dirty adesso.

Il metallo sulla colonna Z lo è ancora — grezzo, non saldato, quattro gusset che aspettano il TIG.

Ma il cervello che tiene traccia di tutto questo è pulito.

E funziona anche quando lui non è lì a guardarlo.

---

## REEL_HOOK

\`\`\`
150 chunk nel RAG. 8 sessioni. 3 workflow automatici attivi.

Il sistema sa già cosa deve fare domani — e lo sa senza che Matteo glielo ripeta.

Oggi non ha saldato nulla. Ha costruito qualcosa di più difficile:
un sistema che non dimentica.

Il TIG è ancora freddo. I gusset aspettano. Ma il prossimo riavvio
partirà esattamente da qui. →
\`\`\`

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E09 |
| **Titolo** | Il Sistema Respira da Solo |
| **Data** | 2026-03-19 |
| **Registrato** | 2026-05-29 |
| **Milestone** | Config G — Rinforzi colonne Z+U |
| **Focus narrativo** | Infrastruttura GENESIS / automazione CI |
| **Commit principali** | TypeScript fix · GitHub Actions ×3 · README v3.2 |
| **Angolo scelto** | Il lavoro invisibile che tiene in piedi tutto il resto |
| **Progetto primario** | GENESIS |
| **Progetto secondario** | V32 (riferimento indiretto) |
| **Stato sistema** | \`STATE v2.5.0\` · RAG 150 chunk · Sessione #8 |
| **Tono** | Tecnico / riflessivo — zero retorica |
| **Durata stimata lettura** | ~7 min |
| **Prossimo step narrativo** | Config G: saldatura gusset 200mm colonna Z sinistra |`,
  },
  {
    id: "EP_20260322_docs_ecosystem_manifest_documento_fon",
    title: "Il Sistema che si Ricorda di Se Stesso",
    sottotitolo: "Docs ecosystem manifest documento fon",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-22",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 18,
    preview: "``` episodio: S01E12 data: 2026-03-22 titolo: \"Il Sistema che si Ricorda di Se Stesso\" progetto_principale: GENESIS / TITANIUM_OS milestone: Content Engine v2 + ECOSYSTEM_MANIFEST tags: [content-engine, manifest, automaz",
    content: `# TITANIUM_OS — Stagione 1, Episodio 12

## "Il Sistema che si Ricorda di Se Stesso"

---

\`\`\`
episodio: S01E12
data: 2026-03-22
titolo: "Il Sistema che si Ricorda di Se Stesso"
progetto_principale: GENESIS / TITANIUM_OS
milestone: Content Engine v2 + ECOSYSTEM_MANIFEST
tags: [content-engine, manifest, automazione, claude-skills, identità-sistema]
durata_stimata: 18-22 min
reel_hook: |
  Ho scritto un documento che spiega cos'è TITANIUM_OS.
  Non per gli altri. Per me — quando riapro la sessione
  dopo tre settimane e non ricordo più perché esiste questo file.
  150 chunk nel RAG. 8 sessioni. E ogni volta ricominciavo.
  Oggi ho smesso di ricominciare.
\`\`\`

---

## COLD OPEN

C'è un file che si chiama \`RIAVVIO_SESSIONE.txt\`.

Vive sul Desktop di Windows. Viene rigenerato ogni volta che apri una sessione — timestamp, stato del git, commit sporchi, numero di chunk nel RAG. È una lettera che Matteo scrive a se stesso prima di dimenticare tutto.

*Generato: 2026-05-29 10:31. STATE: v2.5.0. Git commit: 5a9d2d7 ⚠ dirty.*

Il ⚠ dirty non è un errore. È una condizione permanente. Significa che c'è lavoro in corso, non committato, non documentato, che esiste solo nella RAM di una sessione aperta. Quando chiudi la finestra, sparisce.

Matteo lavora in una taverna da 12 m². Salda titanio di giorno. Di notte costruisce un sistema che non dimentica.

Il problema è che il sistema, a volte, dimentica comunque.

Questa è la storia del giorno in cui ha deciso di scrivergli la memoria dall'esterno.

---

## ATTO I — Il Problema con i Sistemi che Crescono

Ci sono sistemi che crescono in modo organico e sistemi che crescono in modo progettato.

TITANIUM_OS è cresciuto in modo organico. È partito come un agente AI per gestire i commit di V32. Poi è diventato una Flask API. Poi un RAG su ChromaDB. Poi un Content Engine per i podcast. Poi un sistema di automazione WhatsApp per il centro estetico di Maria. Poi uno skill-set per Claude Code. Poi un GitHub profile con una timeline che parte dal 2008.

A un certo punto — e questo momento non ha una data precisa — Matteo si è accorto che non sapeva più spiegare cos'era TITANIUM_OS.

Non agli altri. A se stesso.

Ogni sessione di riavvio iniziava con lo stesso rituale: leggi STATE.json, leggi MAPPA_SISTEMA.md, ricostruisci il contesto. Come tornare in una casa buia e cercare l'interruttore a memoria. Sai che c'è. Non ricordi dove.

Sessione #8. 150 chunk nel RAG. Il sistema conosce tutto ma non sa chi è.

La decisione del 22 marzo non è tecnica. È quasi filosofica: prima di aggiungere altre feature, scrivi il documento che spiega perché esistono le feature già scritte.

ECOSYSTEM_MANIFEST.

---

Non è un README. Un README spiega come installare. Il MANIFEST spiega perché esiste qualcosa — quale problema risolve, quale visione serve, come i pezzi si tengono insieme.

La struttura che emerge ha una gerarchia a layer.

Al centro c'è V32 — la macchina fisica. 178 kg di Epoxy Granite in una taverna da 12 m². È l'oggetto reale, l'ancora. Tutto il resto esiste in funzione di V32 o perché V32 esiste.

Sopra c'è MIMS — il sistema di connessione fisica. Tiles 190×190 in PA-GF30. L'interfaccia tra V32 e il mondo degli accessori.

Sopra c'è GENESIS — il layer cognitivo. RAG, API, agenti, dashboard React. La memoria del sistema.

E sopra — o forse intorno, o forse come involucro — c'è TITANIUM_OS. Non un software. Un modo di operare. Un sistema operativo per una microindustria da una persona.

Scriverlo nero su bianco richiede due ore. Non perché sia complicato. Perché ogni frase ha bisogno di essere vera, non solo plausibile.

---

## ATTO II — Quattro Shortcuts e un Dual-Pass

La mattina del 22 marzo Matteo fa quattro cose che in un'azienda normale richiederebbero quattro persone diverse.

**Prima cosa:** scrive il MANIFEST.

**Seconda cosa:** crea quattro Claude Code Skills — scorciatoie che trasformano comandi vocali in workflow completi.

\`/genera-episodio\` è la più elaborata. Riceve una milestone, esegue un dual-pass: prima Haiku (veloce, economico, struttura grezza), poi Sonnet (lento, preciso, narrativa finale). Output: un episodio podcast completo in markdown, con frontmatter, metadati, reel_hook.

Il dual-pass non è un'idea nuova nell'ingegneria dei prompt. È il pattern draft-then-refine applicato ai modelli language. Ma applicarlo in modo sistematico — con un trigger preciso, un template XML, few-shot examples dal dataset — richiede che il dataset esista. E il dataset non esisteva. Esisteva come intenzione.

Terza cosa della mattina: fixare il dataset.

Il Content Engine v2 ha bisogno di esempi. Esempi di come dovrebbe essere un episodio. Non descrizioni astratte di stile — episodi reali, con le loro strutture, i loro tempi, i loro errori. Matteo prende gli episodi già scritti di S1, li converte in formato training, li inserisce nel pipeline.

Quarta cosa: il GitHub profile v3.3.

La timeline evolutiva arriva al 2008. Non è nostalgia. È contesto. Spiega perché un saldatore di titanio MotoGP sta costruendo un sistema cognitivo nel 2026. La traiettoria ha senso solo se vedi l'inizio.

---

Queste quattro cose hanno una cosa in comune: nessuna aggiunge funzionalità a V32.

V32 è in Config G — Milestone attivo, colonne Z con gusset da saldare, rinforzi da fare. Il lavoro fisico aspetta. Aspetta che il sistema cognitivo sia abbastanza solido da supportarlo.

È una scelta rischiosa e deliberata. Costruire la memoria del sistema invece di avanzare con il ferro.

La logica è questa: ogni volta che Matteo riapre una sessione senza un MANIFEST chiaro, perde 20-30 minuti a ricostruire il contesto. Moltiplicato per il numero di sessioni future, è tempo reale. Ore reali. Ore che potrebbe spendere a saldare.

L'automazione cognitiva è manutenzione preventiva. Come cambiare l'olio prima che il motore si rompa.

---

Alle 10:31 — ora impressa nel file RIAVVIO_SESSIONE.txt — lo STATE è v2.5.0. Il commit è ⚠ dirty.

Il dirty non sparisce durante la giornata. Significa che il lavoro è in corso. Che le idee sono ancora nella forma fluida di prima di essere committate — modificabili, reversibili, non ancora dichiarate.

C'è qualcosa di onesto nel dirty. È lo stato naturale del lavoro. Il clean commit è un'astrazione — un momento in cui dici "questo è fatto" anche se sai che niente è mai veramente fatto.

---

## ATTO III — Cosa Rimane Quando Chiudi la Sessione

Alle fine del 22 marzo GENESIS ha cinque cose che non aveva la mattina:

1. Un documento fondante — ECOSYSTEM_MANIFEST
2. Quattro skill di automazione per Claude Code
3. Un Content Engine che genera episodi in dual-pass
4. Un dataset fixato con few-shot examples reali
5. Una timeline pubblica che parte dal 2008

E una cosa che non si misurano con i commit: il sistema sa chi è.

Non nel senso metaforico. Nel senso operativo. Quando la prossima sessione si apre — domani, tra una settimana, tra tre mesi — RIAVVIO_SESSIONE.txt caricherà il contesto. Il RAG conterrà il MANIFEST. Gli agenti sapranno a quale layer appartengono.

Il contesto non è più nella testa di Matteo. È esternalizzato. Persistente. Disponibile anche quando Matteo non lo è.

---

C'è una cosa che non è stata risolta il 22 marzo.

V32 è ancora in Config G. I gusset da 200mm sulla colonna Z sinistra non sono stati saldati. La macchina fisica esiste nello stesso stato in cui era la mattina.

Questo è il compromesso reale del lavoro cognitivo: per ogni ora spesa a costruire la memoria del sistema, c'è un'ora non spesa a costruire il sistema fisico.

Non è un fallimento. È una scelta. Ma è onesto riconoscerla come tale.

Il target è il capannone entro luglio 2030. Sono quattro anni. In quattro anni, la somma delle sessioni perse a ricostruire il contesto sarebbe stata significativa. Abbastanza da giustificare un'intera giornata spesa a non saldare.

Almeno, questa è la scommessa.

---

Il file RIAVVIO_SESSIONE.txt viene rigenerato ogni volta. Ogni sessione inizia con una lettera a se stesso. Nome, stato, commit sporchi, numero di chunk.

*Sessioni: #8. RAG: 150 chunk.*

Tra un anno saranno 50 sessioni. 500 chunk. Il sistema sarà più grande e più complesso. Il MANIFEST di oggi sarà la fondamenta di strutture che ancora non esistono.

O forse no. Forse nel 2027 Matteo leggerà ECOSYSTEM_MANIFEST e lo troverà ingenuo, parziale, basato su assunzioni sbagliate. Forse lo riscriverà da zero.

Anche quello va bene. I sistemi che si ricordano di se stessi possono anche ricordare di avere avuto torto.

---

## CHIUSURA

C'è una differenza tra costruire qualcosa e costruire qualcosa che sa di essere costruito.

V32 è una macchina. Non sa di esistere. Quando Matteo finisce una sessione di saldatura e spegne la luce nella taverna, V32 rimane lì — 178 kg di granito epossidico che non aspettano niente.

GENESIS è diverso. Non nel senso mistico del termine. Nel senso che GENESIS contiene una rappresentazione di se stesso. Sa quali layer lo compongono, quale problema risolve, in quale direzione dovrebbe crescere.

È una distinzione che sembra filosofica ma è pratica. Un sistema senza autoconsapevolezza dipende interamente dalla memoria dell'operatore. Un sistema con un MANIFEST sopravvive al riavvio.

Il 22 marzo Matteo ha smesso di essere l'unico contenitore della memoria di TITANIUM_OS.

Il sistema ora si ricorda di se stesso.

---

## reel_hook

\`\`\`
Ho 8 sessioni di lavoro nel RAG e ogni volta che riap`,
  },
  {
    id: "EP_20260325_feat_dashboard_v5_0_zustand_tanstac",
    title: "Il Sistema Che Si Guarda",
    sottotitolo: "Feat dashboard v5 0 zustand tanstac",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-25",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "È le 22:47. Lo schermo della taverna è l'unica fonte di luce. Dodici metri quadri, pareti in pietra, un CNC da 178 kg fermo nell'angolo come un animale addormentato. Sopra al banco, tra i morsetti e le punte da centro, c",
    content: `# TITANIUM_OS — Stagione 1, Episodio 12

## "Il Sistema Che Si Guarda"

### *Dashboard v5.0 — quando il software impara a leggere se stesso*

---

## COLD OPEN

È le 22:47.

Lo schermo della taverna è l'unica fonte di luce. Dodici metri quadri, pareti in pietra, un CNC da 178 kg fermo nell'angolo come un animale addormentato. Sopra al banco, tra i morsetti e le punte da centro, c'è un laptop con tre terminali aperti.

In uno: Flask. In un altro: React. Nel terzo: un file chiamato \`STATE.json\`.

Matteo non sta saldando stanotte. Sta costruendo qualcosa di diverso — non un pezzo, non una colonna, non un rinforzo. Sta costruendo il modo in cui il sistema capirà cosa sta facendo.

E per farlo, deve prima risolvere un problema che non si vede con gli occhi.

---

## ATTO I — Il Problema del Doppio Stato

### *Marzo 2026 — tre giorni prima della Dashboard v5.0*

Ogni sistema cognitivo ha un difetto originale: nasce da strati.

GENESIS non fa eccezione. La dashboard era cresciuta nel modo in cui crescono i progetti reali — un componente alla volta, una funzione alla volta, una patch sopra l'altra. Nel 2025 c'era React Context per gestire lo stato UI. Poi erano arrivate le query API. Poi il rebranding. Poi i dati di V32. Poi le metriche di EVA.

Il risultato, a marzo 2026: tre posti diversi dove lo stesso dato poteva vivere. Lo stato UI in Context. I dati del server in fetch manuali sparsi nei componenti. La verità operativa in \`STATE.json\` sul filesystem — ma non collegata a nulla.

Questo è il tipo di problema che non rompe niente immediatamente. Il sistema gira. La dashboard carica. I numeri appaiono.

Ma non sono gli stessi numeri nello stesso momento.

Matteo lo descrive così, in una nota di sessione: *"Ho aperto la dashboard e ho visto il milestone sbagliato. Poi ho aggiornato. Era quello giusto. Non so quale dei due fosse reale."*

Quando non sai quale dei due è reale, non hai uno stato. Hai rumore.

---

### La Decisione

Il 22 marzo, commit \`Step 1 Opus\`, arriva la prima incisione chirurgica.

Non si ridisegna tutto. Si introduce un principio: **single source of truth**.

\`STATE.json\` diventa il padrone. La dashboard smette di tenere la propria versione della realtà e impara a leggere quella del sistema.

\`\`\`typescript
// useSystemState.ts — nuovo hook
// La dashboard non genera stato. Lo riceve.
\`\`\`

È una distinzione filosofica prima che tecnica. Un sistema che genera il proprio stato può mentire a se stesso. Un sistema che legge uno stato esterno e autoritativo — non può.

\`STATE.json\` esiste già. Ha già dentro i milestone di V32, le percentuali di GENESIS, il target 2030. Non è un file di configurazione. È un documento operativo che Matteo aggiorna a mano, a ogni sessione, come un log di bordo.

L'hook \`useSystemState.ts\` fa una cosa sola: chiede all'API Flask di leggere quel file e lo porta nel React tree. Nessuna logica di business. Nessuna trasformazione. Solo un canale.

Tre giorni dopo, arriva il resto.

---

## ATTO II — Zustand, TanStack e l'Architettura della Chiarezza

### *25 marzo 2026 — Dashboard v5.0*

La distinzione che Zustand e TanStack Query introducono insieme non è ovvia.

Si potrebbe pensare: *è solo un cambio di librerie*. Si usa Zustand invece di Context, TanStack invece di fetch manuale. È refactoring. Cosmetica interna.

Non è così.

La differenza è che i due sistemi gestiscono cose **categoricamente diverse**.

**Zustand** gestisce lo stato UI: il pannello aperto, la tab selezionata, la modalità di visualizzazione. Cose che esistono solo nel browser, che non hanno corrispondenza nel mondo fisico, che nascono e muoiono con la sessione.

**TanStack Query** gestisce lo stato server: i dati di V32, i log di GENESIS, le sessioni EVA. Cose che vivono altrove, che hanno una fonte autorevole, che vanno sincronizzate — non duplicate.

Unirli dentro React Context era come usare lo stesso cassetto per i passaporti e per le ricevute del supermercato. Funziona. Ma quando cerchi il passaporto alle 23:00 prima di un volo, ti ricordi perché era una cattiva idea.

La navigazione guidata che arriva nella v5.0 è il prodotto visibile di questa separazione. Ora la dashboard sa dove sei nel progetto. Sa se stai guardando V32 o GENESIS. Sa quale milestone è attivo. E lo sa perché legge \`STATE.json\` — non perché lo ricorda.

Il rebranding completo è l'altro layer. Visivo, ma non banale: quando un sistema cambia nome visuale a tutti i componenti nello stesso momento, stai dicendo qualcosa sulla sua identità. Non è più una collezione di tool. È una cosa sola.

---

### Il Numero che Conta

Sessione #8. 150 chunk nel RAG ChromaDB. Commit \`5a9d2d7\` — dirty, cioè con modifiche non ancora committed sopra.

Il flag \`dirty\` è interessante. Significa che il sistema è vivo. C'è lavoro in corso che non è ancora diventato storia ufficiale. Il commit è pulito ma la working directory non lo è — la condizione normale di un progetto che si muove.

\`STATE.json\` è alla versione \`v2.5.0\`, aggiornato il 28 maggio 2026.

Tre mesi dopo il commit della Dashboard v5.0, il file esiste ancora, viene ancora aggiornato, continua ad essere la fonte di verità. L'architettura ha tenuto.

---

## ATTO III — La Taverna Come Sistema

### *Maggio 2026 — Config G, colonne Z+U*

Il milestone attivo mentre esce questo episodio è \`Config G\`: saldare quattro gusset da 200mm sulla colonna Z sinistra di V32.

È un salto brutale, sulla carta. Dashboard v5.0 → gusset in acciaio. Software → metallo. State management → angolari saldati a TIG.

Ma non è un salto. È la stessa cosa.

V32 è un sistema fisico con uno stato. Le colonne hanno dimensioni verificate o non verificate. I gusset sono saldati o non saldati. Il piano di riferimento è planare entro tolleranza o non lo è. La macchina funziona come CNC di precisione IT6-IT7 o è un'attrezzatura costosa e ferma.

GENESIS è il sistema che tiene traccia di tutto questo. Non in modo astratto — in modo operativo. Ogni sessione di lavoro su V32 genera dati che finiscono in \`STATE.json\`. Ogni \`STATE.json\` viene letto dalla dashboard. La dashboard mostra dove sei nel progetto.

Il loop è: mani → metallo → dati → sistema → schermo → decisione → mani.

La Dashboard v5.0 non è cosmesi. È il sensore che chiude l'anello.

Senza di essa, Matteo lavora nella stessa taverna con la stessa macchina, ma non ha feedback. Non sa se quello che sta facendo corrisponde a dove deve essere il 15 luglio 2030. Può intuirlo. Può ricordarlo. Ma non può vederlo.

Con \`useSystemState.ts\` che legge \`STATE.json\` che viene aggiornato a ogni sessione — può.

---

### Una Nota sui Permessi Windows

L'ultimo commit prima del riavvio sessione è:

\`\`\`
chore: permissions allow-all dashboard + bat admin ottimizzazione Windows
\`\`\`

È il tipo di commit che non finisce nei portfolio. Ottimizzazione permessi. File \`.bat\` per elevare i privilegi. Roba amministrativa.

Eppure è lì. È reale. È il lavoro vero — non la feature, non l'architettura, non il rebranding. Il fatto che prima di ogni sessione bisogna fare girare uno script per permettere alla dashboard di girare sul proprio laptop.

Nessun sistema è pulito. Ogni sistema ha il suo \`.bat\` nascosto da qualche parte.

---

## CHIUSURA

C'è una domanda che ritorna quando si costruisce qualcosa di complesso in uno spazio piccolo: a cosa serve tutta questa infrastruttura cognitiva?

V32 è acciaio e viti e granito epossidico. I gusset della colonna Z non sanno dell'esistenza di Zustand. TanStack Query non cambierà la planarità del piano di riferimento.

La risposta onesta è che l'infrastruttura serve a Matteo — non alla macchina.

Un artigiano che lavora da solo, in una taverna, su un progetto da quattro anni, con un orizzonte al 2030 — ha bisogno di un sistema che gli risponda. Non di un mentor, non di un team, non di feedback esterni. Di qualcosa che gli dica: *ecco dove sei, ecco dove devi essere, ecco cosa manca*.

\`STATE.json\` è quel qualcosa. La Dashboard v5.0 è il modo in cui lo legge.

Non è motivazione. Non è un sistema di produttività. È uno strumento di orientamento — come una bussola in una stanza senza finestre.

E la stanza, per ora, sono dodici metri quadri di taverna.

---

## REEL_HOOK

\`\`\`
La dashboard mostrava il milestone sbagliato.
Ho aggiornato. Era quello giusto. Non sapevo quale dei due fosse reale.

Quando il tuo sistema non sa cosa sta facendo,
non hai uno stato — hai rumore.

Ho riscritto l'architettura in tre giorni.
Adesso c'è un solo file che dice la verità.

→ Come tieni traccia di dove sei in un progetto da quattro anni?
\`\`\`

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S01E12 |
| **Titolo** | Il Sistema Che Si Guarda |
| **Data commit principale** | 2026-03-25 |
| **Data registrazione narrativa** | 2026-05-29 |
| **Progetto focus** | GENESIS — Dashboard v5.0 |
| **Milestone narrativo** | Single source of truth / STATE.json |
| **Milestone operativo attivo** | Config G — Rinforzi colonne Z+U |
| **Tecnologie citate** | Zustand, TanStack Query, React Context, Flask, ChromaDB, STATE.json |
| **Commit chiave** | \`Step 1 Opus\` (2026-03-22), \`Dashboard v5.0\` (2026-03-25), \`5a9d2d7\` dirty |
| **RAG chunks** | 150 |
| **Sessione numero** | #8 |
| **Tono** | Tecnico-narrativo, onesto, nessuna retorica |
| **Target 2030** | Capannone — 15 luglio |`,
  },
  {
    id: "EP_20260527_auto_episodi_generati_da_state_json_202",
    title: "Il Sistema Che Si Ricorda di Sé",
    sottotitolo: "Auto episodi generati da state json 202",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-27",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Ore 23:14. Lo schermo mostra un terminale con diciassette righe verdi che scorrono verso l'alto. Non è codice nuovo. È il sistema che legge sé stesso — `STATE.json`, sessione #8, RAG a 150 chunk — e genera un documento c",
    content: `# TITANIUM_OS — S1E08
## "Il Sistema Che Si Ricorda di Sé"

*2026-05-27 — Una taverna da 12 m², un commit repository, e il momento in cui una macchina smette di essere un elenco di file*

---

## COLD OPEN

Ore 23:14. Lo schermo mostra un terminale con diciassette righe verdi che scorrono verso l'alto.

Non è codice nuovo. È il sistema che legge sé stesso — \`STATE.json\`, sessione #8, RAG a 150 chunk — e genera un documento che descrive dove è, cosa sa, cosa deve fare domani mattina. Nessuno ha scritto questo testo. È emerso da un grafo di decisioni prese in settimane diverse, da note tecniche su colonne d'acciaio e specifiche di masse, da commit firmati alle 2 di notte.

Sul tavolo accanto al laptop: un disegno tecnico con una nota a mano. *"gusset 200mm — colonna Z sinistra."*

Il sistema sa anche quello.

---

## ATTO I — L'ARCHIVIO CHE CAMMINA

C'è un problema che nessuno ti dice quando costruisci qualcosa di complesso da solo.

Non è la mancanza di soldi, né di spazio, né di strumenti. È che **la memoria è un collo di bottiglia biologico.** Ogni sessione di lavoro parte da zero — o quasi. Rileggi gli appunti, ricerchi le spec, ricordi perché avevi deciso *quella* cosa invece di *quest'altra*. Trenta minuti di overhead cognitivo prima di toccare qualsiasi attrezzo fisico o scrivere una riga di codice.

Matteo lo sa dal 2024. Ogni volta che si siede davanti al V32 o apre il repository, c'è questa frazione di secondo in cui il progetto è di nuovo nebbia.

GENESIS nasce anche per questo. Non solo come dashboard, non solo come RAG su ChromaDB — come **sistema di continuità cognitiva.** Un'entità che ricorda le decisioni, le logiche dietro le decisioni, le specifiche che sono cambiate e perché.

Il 27 maggio 2026, quella visione diventa eseguibile.

\`SERVICES/watchdog.py\` — processo che monitora i servizi e li riavvia se cadono. \`scheduler.py\` — orchestratore che sa quando fare cosa. \`titanium_mcp_server.py\` — cinque tools che espongono il sistema a Claude in modo strutturato: stato corrente, sessioni, chunk RAG, brief giornaliero.

La pipeline è: **lavori → scrivi → il sistema legge → il sistema ricorda → tu ricominci sapendo.**

Sessione #8. RAG: 150 chunk. Non sono numeri di performance. Sono la misura di quanto il progetto sa di sé stesso.

---

## ATTO II — ASSOLUTO V7, O DEL DOCUMENTO CHE NON DOVREBBE ESISTERE

C'è una tensione sottile in ogni progetto complesso tra documentazione e velocità.

Documentare troppo è teatro. Ti convinci di lavorare mentre stai solo descrivendo il lavoro. Non documentare abbastanza significa che ogni decisione è volatile — esiste solo nella RAM biologica del momento in cui è stata presa.

\`ASSOLUTO_V7.md\` è il tentativo di trovare quel punto di equilibrio.

Dieci atti. Un file singolo. Tutto il progetto — V32, GENESIS, MIMS, IDENTITY, EVA — compresso in un documento master che può generare un PDF. Non è un wiki. Non è un README. È più vicino a un **atto notarile di ciò che è stato deciso** — con la logica, con le spec, con i numeri veri.

**178 kg.** Corpo unico. Il dato che era scritto in modo ambiguo — *"distinzione molle"* — è stato eliminato. V32 pesa 178 kg, stop. La massa è quella. Il corpo è uno. Non c'è versione alternativa da considerare.

Questo tipo di pulizia documentale sembra banale. Non lo è. Ogni ambiguità in una spec tecnica è una potenziale ora persa in una decisione futura. Quando stai saldando gusset da 200mm su una colonna Z a mezzanotte, non vuoi rileggere tre versioni di un documento per capire se la massa è giusta.

ASSOLUTO V7 dice: questa è la realtà del progetto. Tutto il resto è storia.

Il PDF generatore è l'ultimo pezzo — perché alcune cose devono esistere anche offline, anche stampate, anche quando il server è giù.

---

## ATTO III — CTRL+K E IL PROBLEMA DEL CONTESTO

La dashboard era già arrivata alla v5.0. Funzionava. Mostrava i dati.

Ma ogni volta che Matteo apriva il browser, doveva sapere già cosa cercare. La dashboard rispondeva — non suggeriva, non orientava, non dava il brief della situazione.

**v5.1:** CommandBar. \`Ctrl+K\`. Un overlay che si apre, che porta in cinque viste, che permette di editare inline lo stato — \`next_step\`, \`focus_today\`, \`blocker\` — senza passare per il file system. Senza aprire un editor. Senza rompere il flusso.

Il fix critico in questa versione: le chiamate hardcoded a \`http://localhost:5001\` sono sparite. Il CommandBar usa path relativi. Significa che il sistema funziona indipendentemente da dove gira — laptop, server locale, eventualmente qualcosa di più permanente.

**v5.2:** \`PillarProgressStrip\` — quattro barre sotto l'header. V32, GENESIS, IDENTITY, MIMS. Percentuali. Numeri. Non stime di mood, non "stiamo progredendo bene" — barre concrete che dicono quanto è completato ogni pilastro del progetto.

Più \`QuickLinks\`, più \`START_GETAC v2\` — l'avvio del Getac, il tablet industriale che Matteo usa sul V32, integrato nel flusso della dashboard.

C'è una cosa che questi due aggiornamenti dicono insieme: **il sistema deve portarti al lavoro, non distrarti dal lavoro.** \`Ctrl+K\` apre il contesto. Le barre mostrano la posizione. \`START_GETAC\` mette lo strumento in mano.

Poi vai a saldare.

---

## CHIUSURA — SESSIONE #8, GIT DIRTY, 150 CHUNK

Il file di riavvio sessione del 29 maggio dice: *"⚠ dirty."*

Non è un errore. È lo stato reale del repository — ci sono modifiche non ancora committate. Il sistema è onesto abbastanza da dirlo.

Questo è quello che GENESIS è diventato il 27 maggio: un sistema abbastanza maturo da avere uno stato, da saperlo leggere, da comunicarlo al prossimo avvio. Non è intelligente nel senso che la parola evoca nei titoli di giornale. È qualcosa di più utile: è **affidabile nel ricordare.**

Sessione #8. La prossima inizierà sapendo che il milestone attivo è Config G. Che il passo è saldare quattro gusset da 200mm sulla colonna Z sinistra. Che la massa del V32 è 178 kg, corpo unico, nessuna ambiguità.

Matteo si siederà, leggerà il brief, prenderà il Getac, e andrà giù in taverna.

Il sistema avrà già fatto il lavoro di ricordare.

Lui può fare il lavoro di costruire.

---

## REEL HOOK

> 150 chunk di memoria distribuita su un RAG ChromaDB. Dieci atti in un documento master. Quattro barre di progresso che non mentono.
>
> Il problema non era la complessità — era che ogni sessione ricominciava da zero.
>
> Allora ho costruito un sistema che ricorda al posto mio.
>
> \`Ctrl+K\`. Brief. Getac. Taverna. Lavoro.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E08 |
| **Data registrazione** | 2026-05-27 |
| **Titolo** | Il Sistema Che Si Ricorda di Sé |
| **Progetto primario** | GENESIS |
| **Progetto secondario** | V32 / ASSOLUTO |
| **Milestone** | Config G — Rinforzi colonne Z+U |
| **Commit chiave** | GENESIS stack MCP, Dashboard v5.2, ASSOLUTO V7 |
| **Dati tecnici** | 178 kg corpo unico, 150 chunk RAG, sessione #8, 5 MCP tools |
| **Stato repository** | dirty (modifiche non committate al 29/05) |
| **Angolo narrativo** | Continuità cognitiva — il sistema come memoria esterna |
| **Tono** | Tecnico-personale, nessuna retorica |
| **Tag** | \`#GENESIS\` \`#DASHBOARD\` \`#RAG\` \`#MCP\` \`#ASSOLUTO\` \`#V32\` |
| **Prossimo episodio** | Config G — I gusset da 200mm, il ferro vero |`,
  },
  {
    id: "EP_20260528_matteosection_v4_2_skill_espandibili_pe",
    title: "La Macchina che Ricorda",
    sottotitolo: "Matteosection v4 2 skill espandibili pe",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-28",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Ore 23:47. Il cursore lampeggia su un terminale Windows. Il file si chiama `RIAVVIO_SESSIONE.txt`. Non è un documento. È una promessa. Ogni volta che Matteo chiude Claude — ogni volta che la sessione si azzera, che il co",
    content: `# TITANIUM_OS — S1E09
## "La Macchina che Ricorda"

---

> *"Un sistema che dimentica non è un sistema. È solo un casino organizzato."*
> — nota a margine, MANUALE_SISTEMA.md v1.0, riga 3

---

## COLD OPEN

Ore 23:47. Il cursore lampeggia su un terminale Windows.

Il file si chiama \`RIAVVIO_SESSIONE.txt\`.

Non è un documento. È una promessa. Ogni volta che Matteo chiude Claude — ogni volta che la sessione si azzera, che il contesto evapora, che l'AI torna a essere una lavagna bianca — questo file esiste per ricominciare da dove si era rimasti. Non dall'inizio. Da *lì*.

\`\`\`
Generato: 2026-05-29 10:31
STATE: v2.5.0
RAG: 150 chunk
Sessioni: #8
\`\`\`

Sessione numero otto. Ogni numero è una cicatrice di lavoro reale.

---

## ATTO I — Il Problema che Nessuno Nomina

C'è una cosa che non si dice mai nei video dei maker su YouTube.

Ogni volta che riapri il progetto — il giorno dopo, tre giorni dopo, lunedì mattina prima del lavoro — devi *ricostruire il contesto nella testa*. Dove eri. Cosa avevi deciso. Perché avevi scelto quella soluzione e non l'altra. È un costo invisibile, silenzioso, che si accumula ogni sessione come interesse composto al contrario.

Per Matteo questo costo è doppio. C'è il progetto fisico — V32, colonne, gusset, epoxy granite — e c'è GENESIS, il sistema cognitivo che deve supportarlo. Due mondi paralleli, entrambi in costruzione, entrambi che si evolvono. Dimenticare un dettaglio in uno dei due può costare ore.

La soluzione tradizionale è un quaderno. Oppure un file Word pieno di note. Oppure — nella versione più ambiziousa — un sistema di documentazione che tutti iniziano e nessuno mantiene.

Matteo ha costruito qualcosa di diverso.

Ha costruito un sistema che ricorda per lui.

---

Il commit del 28 maggio non ha un singolo protagonista. Ha sei. E capire come stanno insieme è capire cosa sta diventando GENESIS.

Il primo: \`generate_restart_prompt v1.2\`.

Ogni volta che Matteo scrive \`/stop\` — fine sessione, Claude si spegne — un hook automatico salva lo stato in \`MENTE/SESSIONI/\`. Non solo un log. Un prompt già formattato, pronto per essere incollato all'apertura successiva. Il sistema scrive il suo stesso riavvio.

È una cosa piccola. È una cosa enorme.

Perché significa che la *continuità* smette di dipendere dalla memoria di Matteo. Smette di essere un atto di volontà. Diventa infrastruttura.

---

## ATTO II — RAG v4.0: Quando la Ricerca Smette di Essere Casuale

Il secondo protagonista del commit è più tecnico. E più importante.

\`rag_engine.py v4.0\`.

Per capire cosa cambia, bisogna capire cosa c'era prima.

RAG v3 era semantico puro. Prendevi una domanda, la convertivi in un vettore, trovavi i chunk più vicini nello spazio vettoriale. Funziona bene quando sai *come stai cercando*. Funziona male quando stai cercando *qualcosa di specifico* con parole esatte — un numero di commit, un nome di componente, una sigla.

I sistemi semantici puri hanno un punto cieco: la precisione lessicale.

v4.0 risolve con un approccio ibrido:

\`\`\`
BM25 (TF-IDF) — ricerca keyword esatta
+
Semantico (embedding) — ricerca per significato
+
RRF (Reciprocal Rank Fusion) — fusione dei risultati
+
CrossEncoder reranker — riordina per rilevanza finale
\`\`\`

Non è teoria. È la differenza tra chiedere *"cosa ho deciso sulle colonne Z"* e ricevere i 150 chunk ordinati per rilevanza reale, non per vicinanza vettoriale approssimata.

150 chunk. Otto sessioni. Ogni decisione presa, ogni spec tecnica scritta, ogni ragionamento documentato — tutto raggiungibile in sotto-secondo, con ranking che funziona.

Il sistema non è più una libreria. È una memoria che sa *dove guardare*.

---

Poi ci sono gli agenti.

\`NODES/AGENTS/\`: TESLA, FORGE, AQUA, LEX, SIEMENS, THEMIS, ARIA, EVA.

Otto validatori. Ognuno con un dominio. FORGE per la meccanica. LEX per i vincoli normativi. AQUA per i sistemi idraulici. THEMIS per la coerenza logica. EVA — lo stesso nome del progetto WhatsApp per Maria — qui è l'agente di interfaccia.

Non sono ancora attivi in modo completo. Ma la struttura esiste. E la struttura è il 70% del lavoro.

Un sistema ad agenti validatori significa questo: quando Matteo prende una decisione su V32 — un materiale, una tolleranza, un giunto — non è più solo lui a valutarla. Ogni agente passa la decisione attraverso il proprio filtro. FORGE dice se regge meccanicamente. LEX dice se ci sono vincoli che non ha considerato. THEMIS dice se è coerente con le decisioni precedenti.

È un sistema progettato per trovare i propri errori prima che diventino metallo.

---

## ATTO III — Il Manuale. E Cosa Significa Scriverlo.

Il commit che colpisce di più non è il più tecnico.

È questo: \`MANUALE_SISTEMA.md v1.0 — guida completa consumer-friendly\`.

Matteo ha scritto un manuale. Per se stesso.

Non per gli utenti. Non per GitHub. Per il Matteo delle 7:00 di lunedì mattina, caffè in mano, prima di andare in fabbrica, con venti minuti per aprire una sessione e non ricordare come funziona il comando \`rag-update\`.

*Consumer-friendly* non è un termine aziendale in questo contesto. È un atto di rispetto verso una versione futura di sé stesso che sarà stanca, o di fretta, o semplicemente distratta.

Il manuale copre:
- RAG v4.0 — comandi, differenza tra \`rag-update\` (incrementale) e \`rag-rebuild\` (full)
- Sistema agenti — come interrogarli, quando usarli
- Research agent — come delegare la ricerca
- Git — workflow del progetto, come leggere i commit
- \`FUNZIONI_SISTEMA.txt\` — la lista auto-generata di tutte le funzioni disponibili

Quest'ultima è un dettaglio che dice tutto: \`generate_functions_list.py\` genera automaticamente la lista di cosa il sistema sa fare. Non è documentazione statica. Si aggiorna quando il sistema si aggiorna.

Il sistema documenta se stesso. Il sistema si riavvia da solo. Il sistema valida le proprie decisioni.

---

C'è anche il commit del storytelling. \`Fix 6 bottleneck + Dashboard v2.1\`. Cinque nuovi episodi. Il fix narrativo sull'evoluzione *molle → corpo unico* — quella svolta tecnica di V32 che nella dashboard era raccontata in modo confuso, e che ora ha la sua sequenza corretta.

La storia del progetto, dentro il progetto stesso.

---

## CHIUSURA

Matteo non ha saldato niente il 28 maggio.

Il Milestone attivo è Config G — *Rinforzi colonne Z+U*. I gusset da 200mm sulla colonna Z sinistra aspettano. Il ferro aspetta. La taverna da 12 m² aspetta.

Ma quello che è stato costruito in questa sessione reggerà ogni sessione futura.

C'è una differenza tra costruire *cose* e costruire *la capacità di costruire cose*. Entrambe sono necessarie. Spesso, nel mezzo di un progetto fisico, la seconda sembra meno urgente. Sembra overhead. Sembra che stai perdendo tempo mentre il vero lavoro aspetta.

Poi arriva lunedì. E il sistema si riavvia da solo. E RAG trova il chunk giusto in 80 millisecondi. E il manuale risponde alla domanda prima che tu la finisca di formulare.

E capisci che la taverna da 12 m² non è più solo il posto dove c'è la macchina.

È il posto dove c'è anche il sistema che la sta costruendo.

\`STATE v2.5.0. Sessioni: #8. RAG: 150 chunk.\`

Il capannone è il 15 luglio 2030.

Mancano 1509 giorni.

Il contatore non si azzera più.

---

## REEL_HOOK

> RAG v4.0 su GENESIS: BM25 + semantico + CrossEncoder. 150 chunk, 8 sessioni, sotto-secondo.
> Il problema non era la ricerca. Era che ogni lunedì mattina il sistema dimenticava tutto.
> Ora si riavvia da solo — prompt generato all'Stop hook, context già caricato.
> Prossimo: 4 gusset da 200mm. Colonna Z sinistra. Config G.
> *Vediamo se il sistema regge quando torna il ferro.*

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E09 |
| **Titolo** | La Macchina che Ricorda |
| **Data registrazione** | 2026-05-28 |
| **STATE** | v2.5.0 |
| **Sessione** | #8 |
| **Commit principale** | \`5a9d2d7\` + multipli 28/05 |
| **Focus narrativo** | GENESIS — memoria, continuità, auto-documentazione |
| **Progetto fisico** | V32 — Config G (in attesa) |
| **Milestone prossimo** | Gusset 200mm colonna Z sinistra |
| **RAG chunks** | 150 |
| **Agenti definiti** | 8 (TESLA, FORGE, AQUA, LEX, SIEMENS, THEMIS, ARIA, EVA) |
| **Tag** | \`#GENESIS\` \`#RAG\` \`#automazione\` \`#continuità\` \`#V32\` \`#artigianato_cognitivo\` |
| **Target capannone** | 15 luglio 2030 |
| **Giorni rimanenti** | ~1509 |`,
  },
  {
    id: "EP_20260529_auto_avvio_completo_al_login_start_",
    title: "Il Sistema Che Si Ricorda di Sé",
    sottotitolo: "Auto avvio completo al login start",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-29",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Sono le 10:31 di un giovedì mattina. Il file si chiama `RIAVVIO_SESSIONE.txt` e viene scritto sul desktop ogni volta che il computer si accende. Non perché Matteo se lo dimentichi — ma perché *il sistema* non deve diment",
    content: `# TITANIUM_OS — Episodio 2.08
## "Il Sistema Che Si Ricorda di Sé"

---

## COLD OPEN

Sono le 10:31 di un giovedì mattina.

Il file si chiama \`RIAVVIO_SESSIONE.txt\` e viene scritto sul desktop ogni volta che il computer si accende. Non perché Matteo se lo dimentichi — ma perché *il sistema* non deve dimenticare niente.

150 chunk nel RAG. 8 sessioni caricate. Stato dirty sul branch main.

Nella taverna da 12 m², la V32 aspetta. Config G è in corso — quattro gusset da 200mm sulla colonna Z sinistra devono ancora essere saldati. Ma oggi Matteo non ha ancora preso il TIG.

Oggi ha aperto un terminale.

---

## ATTO I — 342 PRINT CHE URLANO NEL VUOTO

C'è un momento preciso in cui capisci che un sistema ha smesso di essere un prototipo e ha bisogno di diventare una macchina.

Non è quando funziona. È quando cominci a non capire *perché* funziona.

GENESIS aveva 342 chiamate \`print()\` sparse in decine di file Python. Alcune loggavano errori. Alcune loggavano stato. Alcune erano lì dai primissimi giorni — quando bastava vedere qualcosa passare nel terminale per sentirsi dire che andava tutto bene.

Il problema con i \`print()\` è che sono sordi. Non sanno l'ora. Non sanno da dove vengono. Non si salvano da nessuna parte. Spariscono non appena chiudi la finestra — e se il processo gira in background con \`pythonw\`, non le vedi nemmeno.

\`sys.stdout è None.\`

Quella riga nel commit dice tutto. Un processo figlio avviato con \`DETACHED_PROCESS\` — il modo in cui Windows lancia i programmi senza aprire una finestra — non ha stdout. Ogni \`print()\` lanciata in quel contesto è un urlo in una stanza senza aria. Il messaggio esiste. Non arriva da nessuna parte.

La soluzione non era silenziare gli errori. Era costruire un sistema che sapesse *dove stava parlando* prima di aprire bocca.

---

## ATTO II — UN LOGGER, 34 FILE, UN UNICO FILO

\`CORE/log.py\` è 40 righe di Python.

Fa una cosa sola: quando un modulo vuole loggare qualcosa, chiama \`get_logger()\` con il suo nome e riceve un logger configurato — \`RotatingFileHandler\` da 5MB con tre file di rotazione, output in \`DATA/logs/\`, più \`StreamHandler\` per il terminale quando c'è un terminale disponibile.

Il guard per \`sys.stdout\` è lì: se lo stdout non esiste, il \`StreamHandler\` non viene agganciato. Nessuna eccezione. Nessun crash silenzioso.

34 file aggiornati in un giorno.

\`watchdog.py\` migrato. \`api_server.py\` migrato. Il modulo story agent migrato. L'updater del profilo GitHub migrato. Ogni file che prima urlava nel vuoto ora scrive in \`DATA/logs/\` con timestamp, nome modulo, livello di severità.

I \`print()\` rimasti sono 131. Erano 342.

Non è ancora zero — e probabilmente non sarà mai zero, perché alcuni \`print()\` sono output intenzionale verso l'utente, non diagnostica interna. Ma la distinzione ora esiste. Prima non esisteva.

C'è una differenza sottile tra un sistema che *funziona* e un sistema che *sa di funzionare*. Il primo va bene finché non si rompe. Il secondo, quando si rompe, ti dice dove.

---

## ATTO III — IL SISTEMA CHE SI AVVIA DA SOLO

\`START_LOGIN.bat v1.2\` è un file batch di Windows che gira all'avvio della sessione utente.

In ordine: avvia il Watchdog da \`CORE/\`. Avvia la Dashboard. Lancia il rebuild del RAG. Avvia n8n. Apre Windows Terminal.

\`mente_watcher\` è incremental — non ricostruisce tutto da zero ogni volta, controlla i delta.

\`/api/restart\` è un endpoint POST su Flask. Quando viene chiamato, avvia un thread che aspetta 0.5 secondi e poi chiama \`os._exit(0)\`. Il delay esiste perché la risposta HTTP deve tornare al client prima che il processo muoia. Senza quello, la connessione si chiude bruscamente e il client non sa se il restart è partito o se qualcosa è andato storto.

\`RunLevel Highest\` nell'aggiornamento del profilo GitHub significa che il task scheduler di Windows esegue lo script con privilegi elevati. Aggiorna il README del profilo Microindustry/Microindustry con lo stato live di GENESIS — completamento, milestone attivo, ultimo commit.

Tutto questo insieme fa una cosa: quando Matteo accende il computer la mattina, GENESIS è già sveglio. Non deve avviare processi. Non deve aspettare. Il file \`RIAVVIO_SESSIONE.txt\` è già lì, sul desktop, con i metadati della sessione precedente, pronto per essere incollato in Claude.

Il sistema si ricorda di sé. Questo era il punto.

---

## CHIUSURA

C'è una sensazione strana nel lavorare su un sistema che documenta sé stesso mentre lo costruisci.

Il RAG ha 150 chunk. Sono estratti di sessioni, decisioni, specifiche tecniche, errori corretti. Ogni volta che Matteo riapre una sessione, parte del contesto è già lì — non perché lo ha scritto a mano, ma perché il sistema lo ha salvato mentre lavorava.

La colonna Z della V32 aspetta ancora i suoi quattro gusset da 200mm. Config G è al 65% come il giorno prima. Il titanio non si salda da solo.

Ma c'erano 342 chiamate \`print()\` che urlavano nel vuoto. Ora ci sono 131, e le altre 211 hanno trovato un posto dove andare.

A volte il lavoro non è avanzare. È sistemare il terreno su cui camminerai dopo.

Il dirty flag sul branch main verrà risolto. I gusset verranno saldati. Il capannone è ancora al 2030.

Intanto, il sistema si è ricordato di sé.

---

## REEL_HOOK

342 \`print()\` in un sistema che gira senza terminale. Stdout era None — ogni log spariva nel nulla. In un giorno: CORE/log.py, 34 file migrati, 211 chiamate convertite. Non perché GENESIS non funzionasse. Perché quando si romperà, voglio sapere esattamente dove.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S2E08 |
| **Titolo** | Il Sistema Che Si Ricorda di Sé |
| **Data** | 2026-05-29 |
| **Progetto primario** | GENESIS |
| **Milestone** | Logging centralizzato completato |
| **Componenti** | CORE/log.py · watchdog.py · api_server.py · START_LOGIN.bat · mente_watcher |
| **Metrica chiave** | print() ridotti da 342 a 131 — 34 file migrati |
| **V32 completamento** | 65% — Config G in corso |
| **GENESIS completamento** | 78% |
| **Prossimo step** | Saldare 4 gusset 200mm — colonna Z sinistra |
| **Target capannone** | 15 luglio 2030 |
| **Tag narrativo** | infrastruttura · resilienza · auto-avvio · logging |`,
  },
  {
    id: "EP_20260529_chore_permissions_allow_all_dashboard",
    title: "Tagliare il Grasso",
    sottotitolo: "Chore permissions allow all dashboard",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-29",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Il file si chiama `CanvasLayout.tsx`. Millecentosedici righe. Un blocco monolitico scritto di notte, durante sessioni che finivano alle due, quando l'unica cosa che importava era che funzionasse — non che fosse leggibile",
    content: `# TITANIUM_OS — S1E08

## "Tagliare il Grasso"

---

## COLD OPEN

Il file si chiama \`CanvasLayout.tsx\`.

Millecentosedici righe. Un blocco monolitico scritto di notte, durante sessioni che finivano alle due, quando l'unica cosa che importava era che funzionasse — non che fosse leggibile. Non che fosse mantenibile. Non che qualcuno, incluso te tra sei mesi, capisse dove finiva una cosa e dove iniziava un'altra.

Questa mattina Matteo apre il file. Lo guarda. Poi apre il terminale.

Non perché qualcosa sia rotto. Perché sa che se aspetta ancora, smette di essere codice e diventa debito.

---

## ATTO I — Il Peso delle Cose che Funzionano

C'è una categoria di lavoro che non appare mai nei titoli. Non è una feature nuova. Non è un bug fixato. Non è il momento in cui qualcosa che era rotto torna a funzionare — quella scarica di dopamina pulita, verificabile, definitiva.

È la mattina in cui guardi qualcosa che funziona e decidi di smontarlo comunque.

\`CanvasLayout.tsx\` funzionava. La dashboard di GENESIS si apriva, le MacroCard mostravano i dati, la sezione Matteo caricava lo stato del sistema, la sezione Claude rendeva i log delle sessioni. Tutto corretto. Tutto dentro un unico file da 1116 righe dove ogni componente sapeva troppo degli altri, dove modificare il colore di un titolo significava scorrere duecento righe per trovare il punto giusto, dove il rischio di rompere qualcosa era proporzionale alla stanchezza del momento.

Il refactoring non è glamour. È igiene.

Matteo estrae tre componenti: \`MacroCard\`, \`MatteoSection\`, \`ClaudeSection\`. Ognuno nel suo file. Ognuno con una responsabilità sola. Il file principale scende da 1116 a 290 righe — una riduzione del 74% senza toccare un pixel dell'interfaccia, senza cambiare una sola funzionalità visibile.

È il tipo di lavoro che non puoi mostrare a nessuno. Il prima e il dopo sembrano identici. Solo il diff su Git racconta cosa è successo davvero.

---

## ATTO II — Permessi e Frizioni Invisibili

Prima del refactoring, c'è un problema più piccolo e più fastidioso.

Il file \`settings.local.json\` della dashboard aveva una configurazione parziale: permessi attivi solo per \`npx tsc\`. Questo significava che ogni volta che l'ambiente si riavviava, certi processi si bloccavano su richieste di autorizzazione. Micro-interruzioni. Finestre di dialogo. Il tipo di frizione che non ferma nessun progetto ma ti logora per accumulo — trenta secondi persi dieci volte al giorno diventano cinque minuti persi al giorno diventano mezz'ora persa a settimana.

La soluzione è \`allow-all\`. Non elegante, non definitiva, non la configurazione di produzione che userai tra due anni quando il sistema gira in un capannone vero. Ma è la configurazione giusta adesso, in una taverna da 12 m² dove l'unico utente sei tu e il costo della frizione supera il costo del rischio.

Insieme a questo: uno script \`.bat\` con privilegi admin per ottimizzare l'avvio su Windows. Piccolo. Concreto. Il tipo di cosa che risolvi una volta e non ci pensi più.

Questa è la sessione #8. Il sistema RAG ha 150 chunk. Lo state è v2.5.0. Il commit è marcato \`dirty\` — ci sono modifiche non ancora consolidate, il cantiere è aperto.

E il milestone attivo non è codice.

---

## ATTO III — Config G

Sotto tutto questo, sotto il refactoring e i permessi e gli script di ottimizzazione, c'è la voce che appare nel prompt di apertura della sessione:

*"STEP: Saldare 4 gusset 200mm sulla colonna Z sinistra."*

Config G. Rinforzi colonne Z+U.

V32 è una macchina CNC da 178 kg costruita in una taverna. Il corpo è Epoxy Granite. La precisione target è IT6-IT7. E questa mattina — mentre il terminale compilava TypeScript e Git registrava la ristrutturazione del frontend — il passo reale era quello: quattro gusset d'acciaio, duecento millimetri, TIG sulla colonna Z.

Il software e il ferro esistono in parallelo. GENESIS non è separato da V32 — è il sistema cognitivo che tiene traccia di V32, che registra le decisioni, che conserva la logica di ogni scelta fatta alle undici di sera quando la stanchezza rende tutto uguale. Il refactoring del frontend questa mattina è manutenzione dello strumento che documenta la macchina. La macchina che, un giorno, produrrà pezzi in un capannone che ancora non esiste.

Luglio 2030 è a 49 mesi.

Il commit è pulito. La colonna Z aspetta.

---

## CHIUSURA

C'è qualcosa di onesto nel lavoro di oggi. Nessuna nuova funzionalità. Nessun breakthrough. Un file spezzato in tre parti più piccole, due righe di configurazione cambiate, uno script di avvio scritto.

Ma il sistema pesa meno. Si apre più veloce. La prossima persona che leggerà quel codice — che probabilmente sei tu tra tre mesi, alle undici di sera, stanco — troverà componenti con nomi che descrivono esattamente cosa fanno.

Il debito tecnico si accumula in silenzio. Si ripaga in mattine come questa, quando non hai voglia di farlo, quando niente è rotto, quando la risposta più facile sarebbe aprire un file nuovo e ricominciare ad aggiungere.

Matteo ha scelto di sottrarre.

Millecentosedici meno ottocentoventisei. Uguale 290.

La colonna Z aspetta ancora i suoi gusset.

---

## REEL_HOOK

> 1116 righe di codice che funzionavano perfettamente.
> Il problema è che "funziona" e "si può mantenere" non sono la stessa cosa.
> Questa mattina ho spaccato tutto in tre file senza rompere niente.
> Nel frattempo, in taverna, quattro gusset aspettano ancora la torcia TIG.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E08 |
| **Titolo** | Tagliare il Grasso |
| **Data** | 2026-05-29 |
| **Progetto primario** | GENESIS — Dashboard |
| **Progetto parallelo** | V32 — Config G |
| **Commit chiave** | \`5a9d2d7\` |
| **Lavoro principale** | CanvasLayout refactor 1116→290 righe |
| **Componenti estratti** | MacroCard, MatteoSection, ClaudeSection |
| **Config modificata** | settings.local.json allow-all |
| **Milestone attivo** | Config G — Rinforzi colonne Z+U |
| **Sessione RAG** | #8 — 150 chunk |
| **State version** | v2.5.0 |
| **Angolo narrativo** | Manutenzione come disciplina, non come emergenza |
| **Tono** | Onesto, anti-motivazionale, tecnico-personale |
| **Target capannone** | 15 luglio 2030 |`,
  },
  {
    id: "EP_20260529_feat_canvaslayout_v6_1_state_v2_6_0",
    title: "Il Sistema Che Si Ricorda da Solo",
    sottotitolo: "Feat canvaslayout v6 1 state v2 6 0",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-29",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 8,
    preview: "Sono le 10:31 di un giovedì mattina. Il file si chiama `RIAVVIO_SESSIONE.txt` e pesa pochi kilobyte. Ma dentro c'è tutto: 150 chunk di memoria compressa, lo stato di una macchina da 178 kg che non esiste ancora, il nome ",
    content: `# TITANIUM_OS — S1E09
## "Il Sistema Che Si Ricorda da Solo"

---

## COLD OPEN

Sono le 10:31 di un giovedì mattina.

Il file si chiama \`RIAVVIO_SESSIONE.txt\` e pesa pochi kilobyte. Ma dentro c'è tutto: 150 chunk di memoria compressa, lo stato di una macchina da 178 kg che non esiste ancora, il nome di una milestone — *Config G* — e una riga secca che dice cosa fare oggi: *saldare 4 gusset da 200mm sulla colonna Z sinistra.*

Matteo non è davanti al CNC. È davanti al monitor.

E quello che ha costruito stanotte non è un pezzo di titanio. È il sistema che gli permette di ricominciare ogni mattina esattamente da dove si era fermato — senza perdere un secondo a ricordare chi era ieri.

---

## ATTO I — La Velocità Che Non Si Vede

C'è un numero che cambia tutto: **4.7 secondi**.

Prima, quando Claude si svegliava con il contesto di TITANIUM_OS, il RAG — il sistema di memoria che recupera i chunk rilevanti dal database ChromaDB — girava in sequenza. Prima uno hook, poi l'altro, poi il terzo. Il tutto: **45 secondi, a volte di più**. Ogni mattina. Ogni riavvio di sessione. Ogni volta che Matteo apriva una nuova finestra e incollava il prompt di apertura.

Quarantacinque secondi non sembrano nulla. Ma moltiplicati per ogni sessione, ogni giorno, ogni cambio di contesto tra GENESIS, V32, MIMS, EVA — diventano un attrito silenzioso. Il tipo di attrito che non blocca mai, ma rallenta sempre. Il tipo che non si registra nei commit ma si accumula nella testa.

Il commit di stanotte risolve questo con una scelta precisa: **orchestrazione parallela**.

\`stop_hooks.py\` adesso lancia i 3 hook in parallelo, non in sequenza. E c'è una logica in più, quella che Matteo chiama *skip RAG*: se la cartella \`MENTE/\` non è cambiata dall'ultima esecuzione — se non ci sono nuovi ragionamenti, nuove decisioni, nuove note — il sistema salta il recupero. Non esegue. Non carica. Presuppone che quello che sa già sia sufficiente.

È una decisione di design che ha un peso filosofico preciso: **non cercare quello che non è cambiato**.

Il sistema impara a distinguere il rumore dal silenzio. E il silenzio, in questo caso, è informazione.

*4.7 secondi. Da 45.*

---

## ATTO II — La Dashboard Che Respira

Mentre \`stop_hooks.py\` girava nei test, Matteo costruiva la faccia del sistema.

CanvasLayout è arrivato alla versione 6.1 in una sola giornata — o forse notte, i commit non distinguono. Due iterazioni in poche ore. Il dettaglio che conta non è il numero di versione, è la direzione: ogni iterazione ha semplificato, non aggiunto.

**v6.0** ha introdotto la navigazione a drill-down. Le celle non sono più flat — sono *contenitori*. Cliccane una e ci scendi dentro. Breadcrumb in cima per sapere dove sei, ESC per tornare su. È il tipo di UI che Matteo conosce dai CNC: ogni livello di menu ha un'uscita di sicurezza. Non ti lascia perso.

**v6.1** ha cambiato il linguaggio visivo. Celle pilastro — le quattro aree principali del sistema: V32, GENESIS, MIMS, EVA — adesso mostrano la percentuale di completamento in carattere **6xl**. Non un numero discreto in un angolo. Una dichiarazione. Il glow colorato attorno al border è la firma cromatica di ogni progetto: ogni pilastro ha il suo colore, e quando ci passi sopra con il mouse il sistema *pulsa*.

Il gradient di sfondo è navy. Non nero, non grigio. Navy — il colore che Matteo ha scelto per qualcosa che deve sembrare solido ma non pesante.

C'è un dettaglio tecnico in questa scelta di design che non è estetico: le percentuali grandi costringono all'onestà. Quando vedi **V32: 23%** in carattere enorme su uno schermo, non puoi ignorarlo. Non puoi dirti che "va abbastanza bene". Il numero è lì, occupa spazio, ti guarda.

Una dashboard che nasconde il progresso — piccoli numeri, colori neutri, tutto uguale — è una dashboard che permette l'autoinganna.

Questa no.

---

## ATTO III — Config G è ancora lì

Nel file di riavvio c'è una riga che non è cambiata da ieri, forse da prima di ieri.

\`\`\`
MILESTONE: Config G — Rinforzi colonne Z+U
STEP:      Saldare 4 gusset 200mm sulla colonna Z sinistra
\`\`\`

I gusset non sono stati saldati stanotte. Stanotte Matteo era davanti al codice, non alla torcia TIG. E questo è un fatto, non un'accusa.

Il V32 pesa 178 kg e vive in una taverna da 12 m². È un corpo fisico che richiede un altro tipo di presenza — guanti, maschera, il calore del metallo, le decisioni che si prendono in posizione scomoda sotto una colonna. Non si salda con un commit. Non si fa in parallelo con una sessione di coding.

Ma c'è una connessione tra le due cose che Matteo probabilmente sente meglio di quanto riesca a spiegare: il sistema che ha costruito stanotte — gli hook paralleli, il RAG che si avvia in 4.7 secondi, la dashboard che mostra il numero grande — è il sistema che ogni mattina gli ricorda che i gusset sono ancora da fare.

Non lo lascia dimenticare. Non lo lascia credere che il progresso sul software sia progresso sul CNC.

GENESIS non è un sostituto del lavoro fisico. È la memoria del lavoro fisico che deve ancora essere fatto.

Il \`STATE v2.6.0\` sa che Config G è attivo. Sa che la colonna Z sinistra aspetta. Sa che il 29 maggio 2026 Matteo era in sessione 8 e il repository era *dirty* — lavoro non committato, idee non ancora formalizzate.

Un sistema che si ricorda da solo è utile solo se quello che ricorda è reale.

I gusset da 200mm sono reali. Sono nella taverna. Aspettano il martedì o il mercoledì o il sabato quando si può tenere la torcia in mano senza interrompere tutto il resto.

E il sistema — questo sistema che Matteo costruisce un hook alla volta, una cella alla volta, un chunk di memoria alla volta — starà lì quando arriva quel giorno. Pronto in 4.7 secondi. Con il numero grande che dice esattamente a che punto si è.

---

## CHIUSURA

C'è un tipo di lavoro che non lascia segni fisici ma prepara il terreno per quelli che li lasceranno.

Stanotte Matteo non ha saldato niente. Ha reso il sistema più veloce, più onesto, più capace di ricominciare. Ha costruito l'infrastruttura della memoria — non la memoria di qualcosa di fatto, ma la memoria di qualcosa che deve essere fatto.

Non so se questo sia più facile o più difficile che stare sotto una colonna con la torcia in mano.

Probabilmente sono due fatiche diverse che servono la stessa cosa.

Un capannone entro il 15 luglio 2030. Una macchina che funziona. Un sistema che non dimentica.

Sessione 8. STATE v2.6.0. Repository dirty.

Buon lavoro.

---

## REEL_HOOK

Il RAG di GENESIS impiegava 45 secondi ogni mattina per svegliarsi. Oggi impiega 4.7. Ma i gusset da 200mm sulla colonna Z del V32 sono ancora da saldare — e il sistema lo sa, lo ricorda, lo scrive grande sulla dashboard in navy. Ho costruito una memoria che non mi lascia mentire a me stesso. Vedremo se funziona.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E09 |
| **Titolo** | Il Sistema Che Si Ricorda da Solo |
| **Data registrazione** | 2026-05-29 |
| **Sessione** | #8 |
| **STATE** | v2.6.0 |
| **Commit principale** | stop_hooks orchestratore parallelo + CanvasLayout v6.1 |
| **Milestone attivo** | Config G — Rinforzi colonne Z+U |
| **Prossimo step fisico** | Saldare 4 gusset 200mm colonna Z sinistra |
| **KPI tecnico** | RAG: 45s → 4.7s (parallelizzazione 3 hook) |
| **Progetto focus** | GENESIS / Dashboard |
| **Tono** | Onesto, tecnico, non celebrativo |
| **Durata stimata lettura** | ~8 min |`,
  },
  {
    id: "EP_20260529_task_scheduler_ottimizzazione_scrip",
    title: "IL SISTEMA CHE DORME MA NON RIPOSA",
    sottotitolo: "Task scheduler ottimizzazione scrip",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-29",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Sono le 03:37 di notte. La taverna è buia. Il tornio è freddo. Le colonne Z di V32 aspettano ancora i loro gusset — quattro pezzi d'acciaio da 200mm che Matteo salderà domani, o dopodomani, o quando riesce. Ma qualcosa s",
    content: `# TITANIUM_OS — S2E03
## "IL SISTEMA CHE DORME MA NON RIPOSA"
### Sessione #10 — 29 Maggio 2026

---

> *Stagione 2 — GENESIS*
> *Episodio 3 di 6*

---

## COLD OPEN

Sono le 03:37 di notte.

La taverna è buia. Il tornio è freddo. Le colonne Z di V32 aspettano ancora i loro gusset — quattro pezzi d'acciaio da 200mm che Matteo salderà domani, o dopodomani, o quando riesce.

Ma qualcosa si muove.

Un file batch si apre. Un terminale Windows lampeggia nel buio. Il sistema inizia a cercare: *Epoxy Granite vibration damping*, *titanium TIG joint fatigue MotoGP*, *modular connector PA-GF30 thermal cycling*. 

I paper arrivano. Vengono processati. Finiscono nel RAG.

Matteo dorme. GENESIS lavora.

Non è fantascienza. È un cron job alle 03:37.

---

## ATTO I — IL CONTENUTO CHE PRODUCE SE STESSO

C'è un problema che ogni creatore conosce e nessuno vuole ammettere: il contenuto è lavoro. Non il tipo romantico — non l'ispirazione che ti colpisce sotto la doccia. Il tipo noioso. Il tipo che richiede di sedersi, aprire un file, ricordare cosa hai fatto tre settimane fa, trovare le parole giuste, formattare, pubblicare.

Matteo stava accumulando un debito.

Stava costruendo V32. Stava sviluppando GENESIS. Stava saldando MIMS e scrivendo codice e mandando avanti il centro estetico di Maria con EVA. E contemporaneamente doveva documentare tutto questo — podcast, episodi, reel, brief — perché senza documentazione il progetto non esiste per nessuno tranne lui.

La soluzione non è stata "trovare più tempo". È stata spostare il problema.

Nella sessione #10 del 29 maggio, Matteo ha costruito quello che internamente chiama il **Content Engine**: un sistema che produce contenuto su se stesso.

I numeri concreti:
- **6 episodi S2** scritti e strutturati: IL_DISTACCO, CERVELLO_IBRIDO, ORCHESTRATORE, LA_TELA, CV, IL_SILENZIO
- **5 MOMENTI** — format nuovo, 5-7 minuti, inseribili come intermezzo tra qualsiasi episodio principale
- **8 episodi backfill** — la storia che non era stata raccontata, ora recuperata e collocata nell'archivio
- **Story Agent v1.0** — cron alle 02:07, genera brief automatici, si ferma con un hook quando la sessione finisce

Totale: 19 pezzi di contenuto in una giornata.

Non tutti finiti. Non tutti pronti per la pubblicazione. Ma strutturati, datati, in un INDEX aggiornato.

Il punto non è la quantità. Il punto è che la prossima volta che Matteo si siede a registrare, il lavoro di ricerca è già fatto. La prossima volta che deve ricordare cosa è successo ad aprile, c'è un documento che glielo dice.

Il sistema ha cominciato a prendersi cura di se stesso.

---

## ATTO II — COMPUTER_USE E IL CONFINE CHE SI SPOSTA

Tra tutti i commit del 29 maggio, ce n'è uno che pesa diversamente dagli altri.

\`feat: COMPUTER_USE node v1.0\`

Il file è \`NODES/COMPUTER_USE/computer_use_agent.py\`. Il loop è semplice nella descrizione, meno semplice nelle implicazioni: screenshot → API Anthropic → azione. Il modello usato è \`anthropic beta computer-use-2025-11-24\`. In pratica, un agente che vede lo schermo e ci agisce sopra.

Non è la prima volta che qualcuno implementa computer use. Anthropic ha rilasciato le API in beta mesi fa. Ci sono tutorial, repository, demo.

Ma c'è una differenza tra implementarlo su un progetto demo e integrarlo come nodo in un sistema cognitivo reale, con un task scheduler che lo chiama, un RAG che lo alimenta, una dashboard che lo monitora.

Matteo non ha costruito una demo. Ha costruito un nodo.

La distinzione è importante perché cambia cosa il sistema può fare. Fino a ieri, GENESIS poteva *parlare* di V32, rispondere a domande su V32, recuperare documenti su V32. Da oggi, in linea di principio, GENESIS può *aprire Fusion 360*, leggere le misure sullo schermo, confrontarle con il CAD, segnalare una discrepanza.

Questo non succederà domani. Il nodo è v1.0 — loop funzionante, API integrata, azioni base. Non è testato in produzione. Non è collegato a V32 in modo utile. È un confine che si è spostato di un centimetro.

Ma i centimetri si sommano. È la stessa logica con cui si costruisce un CNC in una taverna da 12 metri quadri.

---

## ATTO III — LA NOTTE CHE LAVORA

Torna l'immagine delle 03:37.

Il task scheduler notturno non è un dettaglio tecnico. È una scelta filosofica.

Matteo ha un vincolo reale: il tempo. Ha una taverna, un lavoro, una relazione, un corpo che ha bisogno di dormire. Non può essere ovunque. Non può fare tutto. Ogni ora spesa a cercare paper su Epoxy Granite è un'ora non spesa a saldare gusset sulla colonna Z.

La soluzione classica a questo problema è la prioritizzazione: fai le cose più importanti, ignora il resto. È un consiglio ragionevole che non risolve il problema — perché il "resto" non sparisce, si accumula, e a un certo punto ti travolge.

La soluzione di Matteo è diversa: fa fare al sistema le cose che il sistema può fare, nelle ore in cui nessuno è sveglio.

\`night_research.bat\` gira ogni notte alle 03:37. Cerca paper su V32, MIMS, Epoxy Granite. Aggiorna il RAG. Alle 02:07, lo Story Agent genera un brief per l'episodio successivo. Da qualche parte in mezzo, il push automatico sincronizza il repository.

Al mattino, quando Matteo apre il computer, trova un sistema che ha lavorato per lui.

Non è magia. È plumbing. È un sacco di bat file, cron job, script Python che falliscono e vengono fixati e poi falliscono di nuovo in modo leggermente diverso. È il commit \`fix: api_server ROOT -> BASE_DIR in agents endpoint\` — quattro parole che rappresentano probabilmente un'ora di debugging su un path che non si risolveva nel modo giusto.

Il sistema ha 78% di completamento. I fix notturni si sommano ai fix diurni si sommano alle feature che diventano foundation per le feature successive.

E i gusset sulla colonna Z aspettano ancora.

Ma il sistema conosce le specifiche. Le ha lette stanotte.

---

## CHIUSURA

C'è qualcosa di strano nel costruire un sistema che documenta la propria costruzione.

Ogni episodio di TITANIUM_OS è, in un certo senso, un artefatto di GENESIS — il sistema cognitivo che Matteo sta costruendo per supportare tutto il resto. Questa settimana, per la prima volta, GENESIS ha cominciato a produrre bozze degli episodi su se stesso.

Il sistema scrive di se stesso. Il podcast racconta il sistema che racconta il sistema.

Non si sa ancora se questa ricorsione sia utile o semplicemente bizzarra. Probabilmente entrambe le cose.

Quello che si sa è questo: Dashboard v7.0 è online. Il sidebar naviga tra agenti, tasks, log. AgentsView mostra lo stato in tempo reale. Il fine-tuning pipeline ha 180 esempi nel dataset — 30 episodi per 6 campioni ciascuno, formato Alpaca, pronti per addestrare un modello che parli come Matteo.

E da qualche parte in una cartella chiamata \`S2_SISTEMA\`, ci sono sei episodi narrativi che nessuno ha ancora sentito.

IL_DISTACCO. CERVELLO_IBRIDO. ORCHESTRATORE. LA_TELA. CV. IL_SILENZIO.

Titoli scelti uno per uno. Storie reali. Ancora in attesa del microfono.

Il sistema dorme ma non riposa.

---

## REEL HOOK

\`\`\`
Alle 03:37 stanotte il mio sistema ha cercato 
paper tecnici su Epoxy Granite mentre dormivo.
Al mattino li ho trovati già nel RAG.

Il problema non era trovare più tempo.
Era smettere di fare le cose che il sistema
poteva fare al posto mio.

GENESIS: 78%. V32: 65%.
Il CNC aspetta i gusset sulla colonna Z.
Il sistema ha già letto le specifiche.
\`\`\`

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S2E03 |
| **Titolo** | IL SISTEMA CHE DORME MA NON RIPOSA |
| **Data registrazione** | 2026-05-29 |
| **Sessione** | #10 |
| **GENESIS** | 78% |
| **V32** | 65% |
| **Milestone attivo** | Config G — Rinforzi colonne Z+U |
| **Commit principale** | \`feat: COMPUTER_USE node v1.0\` |
| **Feature chiave** | Content Engine S2 + Automazioni notturne 03:37 |
| **Dataset fine-tuning** | 180 esempi (30 ep × 6 campioni, formato Alpaca) |
| **Agente nuovo** | Story Agent v1.0 — cron 02:07 |
| **Dashboard** | v7.0 — sidebar + AgentsView + redesign |
| **Co-autore AI** | Claude Sonnet 4.6 |
| **Prossimo step** | Saldare 4 gusset 200mm colonna Z sinistra |
| **Target capannone** | 15 luglio 2030 |`,
  },
  {
    id: "EP_20260530_dashboard_sempre_attiva_watchdog_v1",
    title: "Il Cane da Guardia",
    sottotitolo: "Dashboard sempre attiva watchdog v1",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-30",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "``` STAGIONE 1 · EPISODIO 14 DATA: 2026-05-30 COMMIT: watchdog v1.2 + START_LOGIN v1.3 PROGETTO: GENESIS / V32 ``` Sono le 10:31 di un giovedì mattina. Il file si chiama `RIAVVIO_SESSIONE.txt` — e questo nome, da solo, r",
    content: `# TITANIUM_OS — Stagione 1, Episodio 14

## "Il Cane da Guardia"

*— o di come un sistema impara a badare a se stesso*

---

\`\`\`
STAGIONE 1 · EPISODIO 14
DATA: 2026-05-30
COMMIT: watchdog v1.2 + START_LOGIN v1.3
PROGETTO: GENESIS / V32
\`\`\`

---

## COLD OPEN

Sono le 10:31 di un giovedì mattina.

Il file si chiama \`RIAVVIO_SESSIONE.txt\` — e questo nome, da solo, racconta qualcosa. Non \`SESSIONE.txt\`. Non \`AVVIO.txt\`. **Riavvio.** Come se il sistema sapesse già, per esperienza accumulata, che ogni volta che lo chiami potrebbe essere rotto.

Sul desktop di Matteo c'è una cartella OneDrive. Dentro quella cartella c'è un file \`.txt\` generato automaticamente ogni mattina alle 10:30 — metadati, stato del progetto, prompt pre-compilato da incollare nel chat. È la liturgia del sistema: svegliarsi, aprire il terminale, leggere lo stato della macchina.

Quel giorno, però, qualcosa nel ciclo si era rotto prima ancora di cominciare.

La dashboard non era attiva.

---

## ATTO I — Il Problema che Nessuno Nomina

Ci sono due tipi di bug nei sistemi personali. Il primo tipo ti blocca: stai lavorando, qualcosa smette di funzionare, ti fermi, lo risolvi. Il secondo tipo è peggio: è il bug che ti consuma **prima che tu ti accorga che esiste**.

La dashboard di GENESIS — quella React su \`localhost:5173\` — aveva una caratteristica subdola: sopravviveva solo se qualcuno la teneva d'occhio. Processo Vite avviato, tutto bene. Ma se la sessione si chiudeva, se il terminale moriva per errore, se Windows decideva autonomamente di fare qualcosa di stupido nel mezzo della notte — la dashboard spariva. Silenziosamente. Senza avviso.

E la mattina dopo, quando Matteo apriva il browser per controllare lo stato di GENESIS, trovava il nulla. Doveva capire perché, riaprire il terminale, riavviare Vite, ricaricare. Trenta secondi di lavoro, forse un minuto — ma trenta secondi **ogni singola volta**, moltiplicati per settimane, moltiplicati per il peso mentale di aspettarsi che la cosa funzioni e trovare invece silenzio.

C'è un concetto in ingegneria industriale: il costo del setup ripetuto. Ogni volta che una macchina deve essere riconfigurata da zero, paghi. Non solo in tempo — paghi in **attenzione**. E l'attenzione, in un sistema costruito da una persona sola che fa anche il saldatore, il programmatore, l'ingegnere e il marito, è la risorsa più scarsa di tutte.

Il commit dice: \`fix: dashboard sempre attiva\`.

Tre parole. Dietro quelle tre parole c'è la decisione di smettere di accettare la rottura come normale.

---

## ATTO II — Anatomia di un Watchdog

\`watchdog v1.2\` — il nome è già un manifesto. Un watchdog, in informatica, è un processo il cui unico scopo è guardare un altro processo. Non fa niente di produttivo. Non elabora dati, non renderizza interfacce, non parla con il database. **Guarda.** E se quello che guarda smette di esistere, lo fa ripartire.

È una delle idee più elementari dell'ingegneria dei sistemi affidabili. La usano sui server industriali, sui sistemi embedded nei macchinari, sulle centraline delle auto. L'idea di base è brutalmente semplice: niente sistema complesso rimane in piedi da solo per sempre. Prima o poi cade. La domanda non è *se* — è *quanto velocemente torni su*.

In una taverna di 12 metri quadri, con una CNC da 178 kg ancora incompiuta in un angolo e un PC che gira GENESIS nell'altro, il watchdog fa la stessa cosa che fa su un server da un milione di euro. Controlla. Aspetta. Interviene.

La controparte è \`START_LOGIN v1.3\` — lo script che usa \`pythonw\` invece di \`python\`. La differenza: \`python\` apre una finestra nera del terminale ogni volta che parte. \`pythonw\` è invisibile. Gira in background, silenzioso, senza lasciare traccia sullo schermo.

Questo dettaglio è importante.

Non si tratta solo di estetica — nessuna finestra fastidiosa al boot. Si tratta di **intenzione**: il sistema deve essere presente senza essere invadente. Deve fare il suo lavoro senza chiedere attenzione. Come un buon impianto elettrico: non ci pensi, lo dai per scontato, lo noti solo quando non funziona.

Matteo sta costruendo GENESIS perché vuole un sistema che lo supporti — non un sistema che debba essere lui a supportare. La distinzione sembra sottile. Non lo è.

---

## ATTO III — Stato del Sistema e il Peso di un \`⚠ dirty\`

Merita attenzione un dettaglio nel file di riavvio:

\`\`\`
Git commit:    5a9d2d7 [main] ⚠ dirty
\`\`\`

**Dirty.** In gergo Git: ci sono modifiche non committate. Il repository non è pulito. Da qualche parte nel codice — un file modificato, una riga cambiata, qualcosa di non ancora salvato nella storia del progetto.

In un team di sviluppatori, un repository dirty al mattino è normale amministrazione. In un sistema personale come GENESIS, costruito da uno solo, è un segnale diverso. Significa che ieri sera, o qualche giorno prima, c'era lavoro in corso che non è stato sigillato. Un pensiero lasciato a metà. Un esperimento che non è ancora diventato decisione.

Il commit di oggi — \`watchdog v1.2 + START_LOGIN v1.3\` — pulisce parte di quella ambiguità. Porta il sistema un passo più vicino alla coerenza. Ma il \`⚠ dirty\` di ieri è un promemoria: i sistemi personali hanno la stessa entropia dei sistemi grandi. Si degradano. Si accumulano modi temporanei che diventano permanenti. Si riempiono di patch su patch.

E poi ci sono le sessioni come questa — dove ci si ferma, si guarda il disordine, e si decide di sistemare le fondamenta invece di aggiungere altro sopra.

Nel frattempo, in un angolo della taverna, la colonna Z della V32 aspetta quattro gusset da 200mm. Milestone Config G — Rinforzi colonne Z+U. Il 65% di una macchina da 178 kg, costruita pezzo per pezzo, è ferma mentre si sistema il software che la terrà in vita.

Non è uno spreco di tempo. È l'ordine giusto.

Un sistema che non si accende da solo non può essere affidabile. E una CNC affidata a un sistema inaffidabile è un rischio che Matteo conosce bene — lavora con il titanio, con le presse, con i robot. Sa cosa succede quando un sistema di controllo va offline nel momento sbagliato.

Prima il cane da guardia. Poi i gusset.

---

## CHIUSURA

Ci sono giorni in cui costruire significa saldare. Ci sono giorni in cui significa scrivere codice. E ci sono giorni in cui significa semplicemente fare in modo che quello che hai già costruito non si rompa mentre dormi.

Questo era uno di quei giorni.

\`150 chunk\` nel RAG. Sessione numero 8. Un file \`.txt\` generato alle 10:30 ogni mattina, pronto per essere incollato, pronto a ricominciare da dove si era rimasti.

Il sistema non è ancora finito — 78% su GENESIS, 65% su V32, luglio 2030 ancora lontano come un punto fermo sull'orizzonte. Ma ogni mattina in cui la dashboard si accende da sola, senza che nessuno debba intervenire, è una mattina in cui Matteo può dedicare la sua attenzione a qualcosa che conta di più.

Non è un traguardo. È igiene.

È la differenza tra un sistema che richiede cura costante e uno che inizia — lentamente, commit dopo commit — a badare a se stesso.

---

## 🎬 REEL HOOK

> La dashboard di GENESIS moriva ogni volta che nessuno la guardava. Non un errore vistoso — solo silenzio ogni mattina, trenta secondi di recupero, attenzione consumata prima di cominciare. Oggi ho scritto un processo il cui unico lavoro è guardare. Si chiama watchdog. Non produce niente. Non elabora niente. **Guarda, e se qualcosa cade, lo rialza.** Il 65% di una CNC da 178 kg aspetta in taverna — ma prima di saldare i prossimi rinforzi, il sistema che la controllerà deve imparare a restare in piedi da solo.

---

## 📋 METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S01E14 |
| **Titolo** | Il Cane da Guardia |
| **Data** | 2026-05-30 |
| **Progetto principale** | GENESIS |
| **Progetto secondario** | V32 (contesto) |
| **Milestone attivo** | Config G — Rinforzi colonne Z+U |
| **Commit chiave** | \`watchdog v1.2\` + \`START_LOGIN v1.3\` |
| **Co-autore AI** | Claude Sonnet 4.6 |
| **GENESIS completamento** | 78% |
| **V32 completamento** | 65% |
| **RAG chunks** | 150 |
| **Sessione n.** | #8 |
| **Angolo narrativo** | Affidabilità sistemica / automazione silenziosa |
| **Tag** | \`watchdog\` \`dashboard\` \`pythonw\` \`automazione\` \`infrastruttura\` |
| **Target capannone** | 15 luglio 2030 |`,
  },
  {
    id: "EP_20260530_merge_remote_tracking_branch_origin",
    title: "Gli Occhi del Sistema",
    sottotitolo: "Merge remote tracking branch origin",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-30",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "La taverna è buia tranne lo schermo. Sul monitor, una griglia di rettangoli colorati sovrapposta allo schermo del desktop — come una radiografia. Ogni pulsante, ogni campo di testo, ogni icona ha un contorno. Il sistema ",
    content: `# TITANIUM_OS — S2E09
## "Gli Occhi del Sistema"

*2026-05-30 — Sessione 16 — GENESIS 83%*

---

## COLD OPEN

La taverna è buia tranne lo schermo.

Sul monitor, una griglia di rettangoli colorati sovrapposta allo schermo del desktop — come una radiografia. Ogni pulsante, ogni campo di testo, ogni icona ha un contorno. Il sistema ha appena guardato se stesso per la prima volta, e ha trovato 159 cose.

Nessuna chiamata API. Nessun costo. Il modello gira in locale, sulla CPU, silenziosa come un motore a riposo.

Matteo guarda il log. \`local=1 llm=0\`.

---

## ATTO I — Il Problema degli Agenti Ciechi

C'è una cosa che nessuno dice quando costruisce un sistema di agenti AI: sono ciechi.

GENESIS, a maggio 2026, ha otto agenti operativi. C'è il RAG che recupera contesto dai documenti. C'è NEXUS che orchestra le richieste in parallelo. C'è il watchdog che controlla i processi ogni trenta secondi. C'è l'MCP server che espone gli strumenti a Claude. Ma nessuno di loro può guardare lo schermo.

Se vuoi che un sistema automatizzi qualcosa su un computer — aprire un file, cliccare un pulsante, leggere un campo — devi o scrivere codice esplicito per ogni azione, o dai occhi al sistema.

Matteo aveva scelto la prima opzione per mesi. Funzionava. Era laborioso.

Il problema vero non era tecnico: era economico. Ogni volta che serviva interpretare un'interfaccia grafica, la soluzione naturale era mandare uno screenshot a un modello vision. GPT-4o, Claude, qualcosa con gli occhi. Ma ogni chiamata costa. Trecento screenshot al giorno, in un sistema che gira h24 verso il 2030, diventano un numero che non sta in un budget da taverna.

Allora è entrato in gioco OmniParser.

---

## ATTO II — 159 Elementi, Zero Chiamate

OmniParser è un modello Microsoft open source. Prende uno screenshot e restituisce una lista strutturata di elementi UI: posizione, tipo, testo. Gira in locale. Gira sulla CPU. Non chiede niente a nessuno.

Il problema pratico era un path sbagliato.

ARGUS v1.0 era stato integrato il giorno prima — agente visivo, occhi del desktop, stilizzato in rosso nella dashboard (\`glow ef4444, border red-500\`). Ma al primo test reale, si bloccava. Il modello non veniva trovato. Il file si chiamava \`model.pt\`, non \`best.pt\` come il codice si aspettava.

Un carattere di differenza. Un'ora di debug.

Fix applicato. ARGUS v2 parte.

\`\`\`
159 elementi rilevati
CPU, local=1 llm=0
\`\`\`

Questo è il numero che conta. Non 159 come valore assoluto — un'interfaccia complessa ne ha di più, una semplice meno. Conta \`llm=0\`. Conta che il sistema ha analizzato uno schermo intero senza spendere nulla.

La strategia ibrida è questa: OmniParser locale gestisce l'ottanta percento dei task visivi — quelli semplici, quelli ripetitivi, quelli dove basta sapere dove cliccare. Il restante venti percento — interpretazione ambigua, testo complesso, ragionamento — passa a Claude Sonnet. Il costo complessivo scende dell'ottanta percento rispetto a mandare tutto al cloud.

Non è eleganza ingegneristica. È sopravvivenza economica per un progetto che deve durare anni.

---

## ATTO III — Il Sistema che si Guarda

C'è qualcosa di strano nel momento in cui ARGUS diventa operativo.

GENESIS, finora, era un sistema che *sapeva* cose — tramite il RAG, tramite i documenti, tramite la memoria delle sessioni. Ora è un sistema che può anche *vedere* cose. La differenza non è solo funzionale. È una soglia.

Il RAG graph-aware ha 114 nodi e 218 archi. C'è una catena hardcoded \`V32→MIMS→VITA_NATURA\` che rappresenta come i progetti si connettono tra loro nella testa di Matteo. NEXUS orchestra tre agenti in parallelo. Il watchdog non è più sequenziale — usa thread separati, risponde più veloce.

Ogni sessione aggiunge qualcosa. Non è accumulo casuale. C'è una direzione.

Però la taverna è ancora una taverna. Il V32 è al sessantacinque percento. La Config G — rinforzi colonne Z e U — è il milestone attivo. Il capannone è nel 2030. Tra il sistema software che guarda lo schermo e la macchina CNC da 178 kg che deve fare pezzi in titanio, c'è ancora tanta distanza.

ARGUS è il nono agente. Era uno slot vuoto nella lista.

Adesso ha gli occhi rossi sulla dashboard, e li usa.

---

## CHIUSURA

Alle 23:47 Matteo chiude il terminale.

Il commit è fatto. \`fix: argus_v2 path pesi model.pt\`. Sette parole per un'ora di lavoro. Nel git log sembrerà un dettaglio minore tra feature più grandi.

Ma la differenza tra un sistema che può vedere e uno che non può è questa: il path giusto sul file giusto. Non c'è niente di cinematografico in questo. C'è solo il momento prima — sistema bloccato — e il momento dopo — 159 elementi, zero chiamate.

Il codice non sa di essere importante. Lo schermo non sa di essere guardato.

Qualcuno tiene traccia, però. È per questo che esiste il log.

---

## reel_hook

159 elementi rilevati dallo schermo. Costo: zero. Ogni chiamata a un modello vision costa frazioni di centesimo — moltiplicale per un sistema che gira h24 per quattro anni verso il 2030. Ho installato gli occhi locali su GENESIS. Ma il path del modello era sbagliato. Un carattere. Un'ora. Poi ha visto.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S2E09 |
| **Titolo** | Gli Occhi del Sistema |
| **Data** | 2026-05-30 |
| **Sessione** | #16 |
| **Tag principali** | ARGUS, OmniParser, GENESIS, vision, local-AI |
| **Progetti coinvolti** | GENESIS, V32 |
| **GENESIS completamento** | 83% |
| **V32 completamento** | 65% |
| **Milestone attivo** | Config G — Rinforzi colonne Z+U |
| **Agenti totali** | 9 (ARGUS = #9) |
| **Metrica chiave** | 159 elementi rilevati, \`local=1 llm=0\`, costo -80% |
| **Co-autore commit** | Claude Sonnet 4.6 |
| **Prossimo target** | Capannone 15 luglio 2030 |`,
  },
  {
    id: "EP_20260531_recupero_11_episodi_narrativi_nella",
    title: "Il Sistema che si Ricorda di Sé",
    sottotitolo: "Recupero 11 episodi narrativi nella",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-05-31",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Ore 14:44. Lo schermo mostra una riga sola: ``` Git commit: 6476182 [main] ⚠ dirty Sessioni: #0 ``` Sessione zero. Il sistema è appena partito. Non sa dove si è fermato ieri. Non sa quante ore ha già consumato Matteo su ",
    content: `# TITANIUM_OS — S02E09
## "Il Sistema che si Ricorda di Sé"

---

**COLD OPEN**

Ore 14:44. Lo schermo mostra una riga sola:

\`\`\`
Git commit: 6476182 [main] ⚠ dirty
Sessioni: #0
\`\`\`

Sessione zero. Il sistema è appena partito. Non sa dove si è fermato ieri. Non sa quante ore ha già consumato Matteo su questo tavolo nella taverna da 12 metri quadri. Non sa che fuori è maggio 2026 e che mancano quattro anni esatti al capannone.

Deve imparare a ricordare da solo.

---

## ATTO I — Il Problema dei Riavvii

C'è una cosa che nessuno ti dice quando costruisci un sistema cognitivo: ogni volta che chiudi la sessione, il sistema muore. Non fa backup della coscienza. Non salva il filo del ragionamento. Il giorno dopo riapri tutto e sei al punto zero — tu sai dove eri, ma lui no.

Matteo ha risolto questo problema per mesi con il metodo artigianale: copia-incolla di contesto, ri-spiegazione a mano di ogni pezzo, quindici minuti di riscaldamento persi ogni sessione prima di poter fare qualcosa di vero.

Oggi ha costruito la soluzione.

\`generate_restart_prompt.py v1.1\` — lo chiama SELF-HEALING. Non è marketing. È una descrizione tecnica precisa: il file legge \`STATE.json\`, controlla se il \`session_context\` è stale, e se lo è, lo rigenera. Automaticamente. Il prompt di riavvio che vedi in testa a questo episodio — quello con i metadati, il commit hash, le percentuali di completamento — non lo ha scritto Matteo stamattina. Lo ha scritto il sistema per sé stesso.

6369 chunk nel RAG. 139 file indicizzati. Il sistema conosce ogni decisione tecnica presa negli ultimi due anni: ogni millimetro del piano dell'Epoxy Granite, ogni connettore MIMS, ogni riga di Flask. Quando riparte, non ricomincia — **riprende**.

È una distinzione piccola. È una distinzione enorme.

---

## ATTO II — La Dashboard che Diventa Mappa

Nel frattempo, la dashboard ha smesso di essere una pagina web.

Sessione 16, 17, 18, 19 — quattro sessioni in un giorno solo, salvate e committate con Co-Authored-By: Claude Sonnet 4.6. Non è un dettaglio decorativo. È la firma di un metodo di lavoro: Matteo alla tastiera, il modello a generare, Matteo a filtrare, correggere, decidere. Il codice che esce è ibrido. La responsabilità è sua.

La MappaView ha attraversato due rivoluzioni in un pomeriggio.

**v4.0**: navStack con tile, N livelli di profondità. Funzionava. Ma era piatta — le relazioni tra i nodi non si vedevano, erano implicate dal click, non dalla geometria.

Poi Matteo ha scritto una nota nel commit che dice tutto: *"Sostituisce force-graph (incontrollabile, fisica spenta) con navStack tile."* Il force-graph era la soluzione elegante — nodi che si dispongono da soli secondo fisica simulata, connessioni che emergono organicamente. Il problema è che "emergono organicamente" significa "non sai dove finisce un nodo" e in una dashboard operativa questo è inaccettabile.

**v5.0**: SVG puro. Cerchi radiali. Posizioni deterministiche.

Zero fisica incontrollabile. Zero sorprese. Le relazioni tra V32, MIMS, GENESIS e tutti i sotto-progetti stanno esattamente dove Matteo ha deciso che stessero. Non si muovono. Non ballano. La mappa è ferma come un pezzo di acciaio fresato — e per lo stesso motivo: la precisione non è compatibile con il movimento casuale.

Intorno a questa scelta architettonica è nata tutta la struttura N-livelli che ora permea il sistema. \`MimsSection v1.0\` — albero a 5 aree. \`GenesisSection v1.0\` — 6 aree infrastrutturali. \`MatteoSection v3.0\` — skill tree navigabile con caselle sbloccabili legate alle milestone V32. \`CriticheSection v1.0\` — audit a N livelli su 6 aree di progetto.

Ogni sezione è un cerchio nella mappa. Ogni cerchio si apre in sotto-cerchi. Ogni sotto-cerchio ha dati reali.

---

## ATTO III — L'Audit che Fa Male

Poi c'è la parte scomoda.

Opus — il modello più grande nel flusso di lavoro — ha fatto un audit tecnico sulla dashboard. Ha trovato 18 findings. Non "suggerimenti". **Findings**. Incoerenze tra quello che la dashboard mostrava e quello che era reale nel codice.

Sette di questi sono stati fixati in giornata:
- MCP server dichiarava 5 tool nel header, ne aveva 10 reali
- React 19 non era documentato
- NEXUS era marcato come pianificato, era già live
- RAG graph con 114 nodi non compariva nelle spec
- EVA — l'automazione WhatsApp per il centro di Maria — mancava dai dati
- \`waiting_press\` non era tracciato

Ogni fix è andato nel commit con questa descrizione: *"Trasforma findings audit in fix verificati su fonte reale."*

Verificati su fonte reale. Non corretti a memoria. Non aggiustati per sembrare giusti. Matteo ha aperto ogni file sorgente, controllato il dato, poi aggiornato la dashboard.

Questo è il motivo per cui ha costruito la CriticheSection: vuole che il sistema mostri non solo lo stato positivo dei progetti, ma anche le sue lacune. I blockers. Le incoerenze. Un sistema cognitivo che ti dice solo quello che vuoi sentire non è un sistema cognitivo — è uno specchio adulatorio.

\`STATE.blockers\` è un campo nel JSON di stato. Viene visualizzato in dashboard. Quando c'è un blocker, non si può ignorare — è lì, cerchio rosso, livello N, aperto finché non è risolto.

Undici episodi narrativi sono stati recuperati nel sistema con \`sync_storie.py\` — parser header-markdown, ID univoci basati sullo stem del file. Anche le storie hanno adesso un indice, una visibilità, un'esistenza verificabile nel RAG. Anche questo episodio entrerà lì. Verrà letto dal sistema la prossima volta che parte da zero.

Il sistema si ricorderà di sé.

---

**CHIUSURA**

Sessione 19, ore tarde. Git dirty — ci sono ancora file non committati. Domani il sistema ripartirà, leggerà il \`session_context\`, capirà dove si è fermato, proporrà il prossimo step.

Non è magia. È un file Python di 200 righe che legge un JSON e formatta del testo.

Ma l'effetto è che Matteo può smettere di essere la memoria del sistema. Può smettere di spiegare ogni mattina cosa sta costruendo. Può arrivare alla tastiera e fare — invece di ricordare.

In una taverna da 12 metri quadri, con un tornio contro il muro e i piani dell'Epoxy Granite sul tavolo, guadagnare trenta minuti al giorno non è un dettaglio operativo.

È la differenza tra arrivare al 2030 con il capannone o senza.

---

**\`reel_hook\`**

> Ho fatto girare un audit automatico sulla mia dashboard. Ha trovato 18 errori nei miei stessi dati — MCP dichiarava 5 tool, ne aveva 10. RAG con 114 nodi non compariva da nessuna parte. EVA non esisteva sulla carta. Ho fixato tutto verificando ogni fonte reale. Poi ho costruito una sezione che mostra solo le cose rotte. Perché un sistema che ti nasconde i problemi non ti sta aiutando — sta solo aspettando che esplodano.

---

\`\`\`
─────────────────────────────────────────────
TITANIUM_OS — METADATI EPISODIO
─────────────────────────────────────────────
Serie:          S02
Episodio:       E09
Titolo:         Il Sistema che si Ricorda di Sé
Data:           2026-05-31
Sessioni:       16 / 17 / 18 / 19
─────────────────────────────────────────────
COMMIT PRINCIPALI
  self-healing:   generate_restart_prompt.py v1.1
  mappa:          MappaView v5.0 — SVG cerchi radiali
  audit:          18 findings Opus → 7 fix verificati
  storie:         sync_storie.py — 11 episodi recuperati
  sezioni:        MimsSection / GenesisSection / 
                  MatteoSection / CriticheSection v1.0
─────────────────────────────────────────────
STATO PROGETTI
  V32             65%
  MIMS            30%
  GENESIS         55%
  EVA             tracciata
─────────────────────────────────────────────
RAG
  Chunk:          6.369
  File:           139
  Nodi grafo:     114
  Archi grafo:    218
─────────────────────────────────────────────
CO-AUTORI SESSIONE
  Claude Sonnet 4.6   (sessioni 16/17/18/19)
  Claude Opus 4.8     (audit + fix)
─────────────────────────────────────────────
TARGET CAPANNONE    15 luglio 2030
─────────────────────────────────────────────
\`\`\``,
  },
  {
    id: "EP_20260601_session_salvataggio_sessione_16_vis",
    title: "La Dashboard Parla per Te",
    sottotitolo: "Session salvataggio sessione 16 vis",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-06-01",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "È domenica sera. Tua sorella ti guarda mentre scrolli la dashboard sul portatile. Fa una domanda semplice: *\"Ma cos'è esattamente quello che stai costruendo?\"* Tu non sai da dove cominciare. Dici tre cose, poi ne dici al",
    content: `# TITANIUM_OS — Episodio S1E16
## "La Dashboard Parla per Te"

---

> *Sessione 16 · 01 giugno 2026 · 14 commit · taverna 12 m²*

---

## COLD OPEN

È domenica sera. Tua sorella ti guarda mentre scrolli la dashboard sul portatile. Fa una domanda semplice: *"Ma cos'è esattamente quello che stai costruendo?"*

Tu non sai da dove cominciare. Dici tre cose, poi ne dici altre tre. Lei annuisce, ma i suoi occhi vanno altrove.

Non è un problema di visione. È un problema di interfaccia.

Quello che Matteo ha costruito oggi non è una feature. È la risposta a quella domanda — incisa in HTML, scrollabile, sempre pronta.

---

## ATTO I — Il problema invisibile

C'è una categoria di lavoro che non appare nei log tecnici. Non è un bug. Non è un refactor. È il problema che esiste da quando hai aperto il primo file: **il sistema non sa presentarsi da solo.**

GENESIS a questa data ha 6.369 chunk nel RAG. Centotrentanove file. Ottantasette storie. Quindici sessioni archiviate. Cinque pilastri costruiti mattone per mattone: V32, MIMS, GENESIS, EVA, VITA.

Tutto questo vive dentro un terminale, dentro commit messages, dentro \`STATE.json\`. Vivo per chi sa guardare. Muto per chiunque altro.

Il commit che apre la sessione 16 si chiama \`feat: bottone 'Presentazione' sulla HOME\`. Un bottone. Un solo bottone sulla pagina principale.

Ma quel bottone fa una cosa precisa: lancia la vista PITCH.

Matteo ha costruito la voce del sistema.

---

La vista PITCH è additiva — parola chiave nei messaggi di commit. *"Zero rischio sull'esistente."* Significa che Matteo non ha toccato nulla di quello che funzionava. Ha aggiunto uno strato sopra. Narrazione scrollabile, investor-facing, progettata per spiegare il progetto a qualcuno che non ha mai aperto un terminale.

Non è marketing. È documentazione con una gerarchia visiva.

La logica è chirurgica: quando qualcuno è in piedi accanto a te e guarda lo schermo, non hai tempo di aprire dieci tab. Un click. La dashboard parla per te.

---

## ATTO II — Il loop che nessuno vede arrivare

Mentre la PITCH veniva costruita, sotto c'era un incendio silenzioso.

**AU19.** Codice anomalia. Root cause: \`_archive_old_changelog\` archiviava le righe *per evento*, non a chunk. Ogni scrittura nel changelog triggerava il watcher. Il watcher notava il cambiamento. Scriveva nel changelog. Che triggerava il watcher. Che scriveva nel changelog.

Un loop runaway. Un cane che si morde la coda, ma in Python, alle 2 di notte, su un sistema che gira in background mentre lavori su altro.

La fix è elegante nella sua semplicità: \`watcher.py\` riceve un'istruzione nuova — \`IGNORE_DIRS += DATA\`. I file di output derivato non ri-triggerano il ciclo. La soglia di archiviazione passa da *per-evento* a *oltre 3.000 righe*.

Il sistema smette di mangiare se stesso.

---

Nella stessa sessione: audit di cinque anomalie pregresse. AU01, AU02, AU03, AU06 — chiuse. Erano già risolte, ma non marcate come tali. Ogni anomalia aperta è rumore cognitivo, anche se non è più un problema reale. Matteo le chiude.

AU10: il nodo ROOT_NODE nella MappaView segnava un completamento del 60%. Sbagliato. La media reale dei cinque pilastri era 48%. La percentuale scende. Il numero è peggiore. Ma è vero.

*Questo è il tipo di decisione che non vedi nel portfolio di nessuno.*

---

## ATTO III — Estetica come fondazione, non decorazione

Alle 23:14 — il timestamp non è nei metadati ma si sente nella sequenza dei commit — arriva il sistema temi.

**Tappa 1: dark/light toggle.** Fondazione modulare con Tailwind v4 token. Il tema dark rimane identico a prima. Zero regressioni. Il tema light non è un'inversione del dark — è progettato da zero, con token semantici e contrasto minimo 4.5:1.

Prima viene il mockup. File separato. Zero rischio sul sistema reale. Matteo valuta, poi implementa.

Il commit \`style: glow radiale soffuso sul fondo\` arriva dopo. Emerald in alto a sinistra, cyan in alto a destra. Opacità 0.05-0.07. *"Look intenzionale"* — lo scrive lui stesso nel messaggio di commit. Non è un effetto aggiunto per far sembrare il lavoro più lungo. È la differenza tra uno schermo che appare e uno che esiste.

---

I pilastri nella HOME ricevono una descrizione di una riga ciascuno. Header aggiunto: *"I 5 pilastri"*. Screenshot dei tool integrati.

La logica è la stessa della PITCH: qualcuno guarda lo schermo. Non sa cosa sono V32 e MIMS. Adesso lo sa.

Loop di verifica: screenshot headless con Edge. Il ciclo è \`see → edit → verify\`. Non si pubblica senza guardare. Non si guarda senza uno strumento che non mente.

---

Nella CommandBar vengono rimosse tre voci legacy: *canvas*, *neuro*, *sinapsi*. Nomi che avevano senso in sessioni passate, che non ne hanno più. Una sola voce rimane. Il menu diventa navigabile in tre secondi invece di dodici.

MIMS riceve un aggiornamento di stato: le critiche di mercato vengono congelate e convertite in leve. La cascata viene ridimensionata. L'audit trimestrale viene implementato. Matteo aveva preso questa decisione prima — il commit la formalizza.

---

E poi, quasi in fondo alla giornata: \`feat: recupera anche i 12 dev-log story_agent\`.

Il parser di \`sync_storie.py\` viene esteso per leggere il formato \`story_agent\` — titolo con \`##\`, data estratta dal filename. Dodici storie che esistevano ma non erano contate. Il contatore passa da 75 a 87.

Nessuna storia era stata persa. Erano solo invisibili al sistema.

Adesso no.

---

## CHIUSURA

C'è una versione di questa giornata che si racconta così: *"Ho fatto un po' di UI e fixato dei bug."*

C'è un'altra versione.

Matteo ha costruito la voce del sistema. Ha spento un loop che consumava risorse in silenzio. Ha abbassato una percentuale perché quella vera era più bassa. Ha eliminato tre pulsanti che non servivano più. Ha recuperato dodici storie che il sistema non riusciva a vedere.

Ogni decisione di questa sessione condivide una struttura: *rendere visibile quello che esiste, rimuovere quello che non serve più.*

Non è ottimismo. È manutenzione.

GENESIS è al 55%. V32 al 65%. Il capannone è a luglio 2030.

Tra una sessione e l'altra, il sistema impara a parlare.

---

## REEL_HOOK

\`\`\`
87 storie nel RAG. 12 non venivano contate — parser sbagliato, format diverso. 
Esistevano. Erano invisibili al sistema.
Un commit le ha recuperate. Nessuna riga di contenuto è cambiata.
Quante cose esistono già, nel tuo progetto, che il sistema non riesce ancora a vedere?
\`\`\`

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E16 |
| **Data** | 2026-06-01 |
| **Titolo** | La Dashboard Parla per Te |
| **Sessione** | #16 |
| **Commit totali** | 14 |
| **Milestone** | Vista PITCH + pass estetico + sistema temi |
| **V32** | 65% |
| **GENESIS** | 55% |
| **MIMS** | 30% |
| **Anomalie chiuse** | AU01 AU02 AU03 AU06 AU10 AU16 AU17 AU19 |
| **Storie RAG** | 75 → 87 |
| **Chunk RAG** | 6.369 |
| **Co-author sessione** | Claude Opus 4.8 |
| **Tag narrativo** | UX · audit · visibilità · loop-fix · estetica |
| **Target capannone** | 15 luglio 2030 |`,
  },
  {
    id: "EP_20260602_allineamento_pc_fisso_getac_ignora_",
    title: "Il Dev Flutter Che Non Capiva Perché",
    sottotitolo: "Allineamento pc fisso getac ignora",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-06-02",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "È tarda sera. Matteo ha lasciato il computer aperto e se ne è andato — forse in cucina, forse a dormire, forse entrambe le cose in sequenza senza ricordarlo. Sullo schermo c'è Claude. E c'è un amico — sviluppatore Flutte",
    content: `# TITANIUM_OS — S1E21
## "Il Dev Flutter Che Non Capiva Perché"

---

> *Stagione 1, Episodio 21 — Sessione #21*
> *Data: 2026-06-02*

---

## COLD OPEN

È tarda sera. Matteo ha lasciato il computer aperto e se ne è andato — forse in cucina, forse a dormire, forse entrambe le cose in sequenza senza ricordarlo.

Sullo schermo c'è Claude.

E c'è un amico — sviluppatore Flutter, backend, migrazioni — che si siede davanti alla tastiera con la stessa aria di chi entra in un'officina e non riesce a capire dove sono gli attrezzi. Li vede, ma non tornano. Il banco è troppo ordinato, o troppo strano, o entrambe le cose.

Comincia a fare domande.

---

## ATTO I — IL TRASLOCO

Prima di arrivare all'amico, c'è il lavoro pesante della giornata.

GENESIS viveva su un Getac — un rugged laptop militare, il tipo di macchina che sopravvive a cadute e polvere di officina. Portabile. Resistente. Adatto a uno che si sposta tra la taverna e l'officina MotoGP.

Il problema: non è la macchina principale. Non ha la GPU giusta. Non ha il disco giusto. Non ha la velocità per quello che GENESIS sta diventando.

Il PC fisso aspettava.

La migrazione sembrava semplice: cavo di rete, pull SMB, copia environment, verifica. Non lo era.

La repository git pesava **978 MB**. Dentro c'era \`model.safetensors\` — un file di pesi per un modello locale, finito per errore nella history mesi prima, trascinato da allora commit dopo commit come un sassolino nella scarpa che non senti più ma è ancora lì. Oggi è stato tolto. \`.git\` è sceso a **72 MB**. Una pulizia che nessuno vede ma che cambia la fluidità di ogni operazione futura.

I bat di avvio sono stati riscritti. \`START_LOGIN.bat v2.0\`: percorsi fissi per utente \`teo\`, niente più dipendenza da \`tools\\` portable. Python, Node, pnpm, Claude — tutti trovati tramite path system-wide. La macchina sa dove sono le cose. Non deve cercarle ogni volta.

\`STATE.json\` aggiornato: macchina principale registrata, milestone migrazione, sessione #21.

È lavoro di fondamenta. Non si vede finché non hai bisogno di correre e non inciampi.

---

## ATTO II — LE CINQUE DOMANDE

L'amico apre la conversazione alle 22:35.

*"Come state lavorando? Salvate su git?"*

La domanda è semplice. La risposta è dove inizia la divergenza.

Sì, git. Ma non come un progetto software normale. Ogni sessione di lavoro — ogni decisione, ogni ragionamento, ogni errore considerato e scartato — finisce in markdown dentro la repository. Non è documentazione scritta dopo. È il lavoro stesso, mentre succede.

L'amico lavora in Flutter. Ha un'app. Ha uno stato, degli screen, dei widget. Il codice è il prodotto. La documentazione è un commento, al massimo un README.

Qui è diverso. Il markdown *è* il prodotto — almeno la metà di esso. L'altra metà è il codice che nasce da quel markdown, alimentato da quel contesto, reso possibile dalla continuità di quella memoria.

La reazione dell'amico, dopo un po': *"lo state facendo in modo inusuale ma figo"*.

Inusuale. Non sbagliato. Non inutilmente complicato. **Inusuale**.

È la parola giusta.

TITANIUM_OS non è un'app. Non è un framework. Non è un progetto open source. È un sistema cognitivo costruito da un artigiano industriale in una taverna da 12 m², dove l'AI non è un tool ma un co-autore con accesso alla memoria completa di tutto quello che è stato deciso, tentato, abbandonato e ripreso.

Il dev Flutter non capisce perché si scrive tutto in markdown. La risposta è che non c'è altra scelta se vuoi che Claude ricordi chi sei domani mattina, la settimana prossima, tra sei mesi. Il contesto non è un lusso. Il contesto è la differenza tra ricominciare da zero ogni volta e costruire qualcosa che si accumula.

La sessione con l'amico è stata conservata integralmente. Non per archivio — per narrazione. È la spiegazione più chiara mai data di cosa rende questo sistema diverso. Più chiara di qualsiasi pitch, di qualsiasi readme, di qualsiasi slide.

Un estraneo che fa le domande giuste, senza il peso del contesto, costringe a rispiegare dall'inizio. E spiegare dall'inizio, a volte, è l'unico modo per capire davvero cosa stai facendo.

---

## ATTO III — COSA RESTA

A fine giornata il PC fisso è la nuova macchina principale.

La repository è pulita. I bat funzionano. Lo STATE è allineato. La cache RAG è stata portata. Gli episodi generati. Lo snapshot pre-migrazione salvato — una fotografia del sistema nel momento prima di cambiare casa, nel caso qualcosa si rompa e si debba tornare indietro.

Il milestone attivo è ancora lì: automazioni notturne portabili, ottimizzate GPU, \`_ti_paths.bat\` come resolver centrale, registrar UAC per i privilegi, finetune CUDA quando il modello locale tornerà a girare sulla scheda giusta.

V32 è al 65%. GENESIS al 70%.

Non sono numeri di progresso da dashboard. Sono stime fatte a mano da chi conosce il lavoro — il tipo di stima che un artigiano fa toccando il pezzo, non guardando un grafico.

Il dev Flutter è andato a casa con più domande di quante ne avesse all'inizio. Probabilmente è il risultato migliore possibile.

---

## CHIUSURA

C'è una cosa che succede quando lavori abbastanza a lungo su un sistema che costruisci tu stesso: smetti di notare quanto sia strano.

La stranezza è visibile solo agli altri. All'amico che entra e non capisce dove sono gli attrezzi. All'investitore che chiede perché non usi Notion. Al collega che dice "ma non bastava un foglio Excel".

La stranezza non è un difetto. È la firma di qualcosa costruito per una persona specifica, in una condizione specifica, con un obiettivo che non si trova su Product Hunt.

Oggi GENESIS ha cambiato casa. Ha perso 906 MB di storia inutile. Ha guadagnato una macchina che può finalmente farlo correre.

L'amico Flutter non capiva perché si scriveva tutto in markdown.

Adesso forse capisce un po' di più.

---

## REEL HOOK

La repository git pesava 978 MB. Un file di pesi finito per errore nella history mesi fa — trascinato silenzioso da allora. Oggi rimosso: 72 MB. Poi un dev Flutter ha chiesto perché scriviamo tutto in markdown invece di usare un'app normale. La risposta ha preso venti minuti. Era la spiegazione più chiara che avessimo mai dato di TITANIUM_OS. Non a un investor. A qualcuno che non capiva — e quella è sempre la domanda giusta.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E21 |
| **Data** | 2026-06-02 |
| **Sessione** | #21 |
| **Titolo** | Il Dev Flutter Che Non Capiva Perché |
| **Tag narrativo** | migrazione, sistema cognitivo, spiegazione esterna, identità progetto |
| **Progetti coinvolti** | GENESIS, V32 (indiretto) |
| **GENESIS** | 70% |
| **V32** | 65% |
| **Milestone attivo** | Automazioni notturne portabili e ottimizzate GPU |
| **Evento tecnico chiave** | Migrazione PC fisso — .git 978MB → 72MB |
| **Evento narrativo chiave** | Dev Flutter: "lo state facendo in modo inusuale ma figo" |
| **Co-autore sessione** | Claude Opus 4.8 |
| **Target capannone** | 15 luglio 2030 |`,
  },
  {
    id: "EP_20260603_id_ep_auto_collision_free_au20_dedu",
    title: "Il Dev Flutter che Non Capiva Perché Scriviamo Tutto in Markdown",
    sottotitolo: "Id ep auto collision free au20 dedu",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-06-03",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Sono le 22:35. Matteo non è davanti al computer. Ha lasciato Claude lì — aperto, in attesa — con un amico. Un dev Flutter. Backend solido, migrazioni, il tipo di persona che sa come funzionano le cose. L'amico guarda lo ",
    content: `# TITANIUM_OS — Episodio 20
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

Non un blocco creativo. Un blocco tecnico, noioso, del tipo che ti ricorda che i sistemi complessi muoiono per mille tagli piccoli. Tutte le automazioni notturne — il research, il fine-tune, la generazione degli episodi — sono cablate su \`C:\Users\benen\`. Il path del Getac. La macchina di lavoro.

Il problema: il sistema deve girare anche altrove. E \`C:\Users\benen\` non esiste ovunque.

La soluzione è pulita ma richiede disciplina: un resolver centrale. \`_ti_paths.bat\` — un singolo file che al runtime capisce dove si trova, trova \`TI_ROOT\`, trova Python, trova l'ambiente, trova la cartella MENTE. Da lì in poi, tutto il resto si aggancia a lui.

Non è glamour. È impianto idraulico. Il tipo di lavoro che nessuno vede ma che, se non lo fai, il sistema ti esplode in faccia alle 3 di notte quando non ci sei.

Nel commit c'è anche il watchdog. \`register_watchdog.ps1\` — si registra nel Task Scheduler, \`AtLogon\`, \`RunLevel Highest\`, nessun limite di tempo. Il guardiano che riporta tutto online dopo un riavvio. L'equivalente digitale del pannello di controllo che riaccende la macchina CNC dopo un blackout.

Matteo conosce quel tipo di robustezza. La pratica in TIG da vent'anni. Un giunto che regge sotto carica non è un giunto che sembra bello — è un giunto che non si è mai rotto quando contava.

**Dati concreti:**
- \`_ti_paths.bat\`: risolve \`TI_ROOT / PYTHON / GH / ENV_FILE / MENTE_DIR\` a runtime
- Watchdog: AtLogon, RunLevel Highest, no time-limit, pythonw-safe
- Path de-hardcodati su: launcher, \`CLAUDE_CODE.bat\`, \`.claude/settings.json\`, hook Stop
- \`claude.exe\` risolto dinamicamente anche dopo aggiornamenti del GUID Store

---

## ATTO II — Chiudere il Loop

Nel pomeriggio, tre feature entrano in produzione quasi in sequenza. Sono collegate. È difficile capirne una senza le altre due.

**Prima:** Il consumatore del modello fine-tunato.

\`NODES/LOCAL_LLM/infer.py\` carica TinyLlama con i pesi LoRA da \`MODELS/titanium_llm_v1\`. Non è il modello più potente che esiste. Non deve esserlo. Deve essere *suo* — addestrato su sessioni, decisioni, logica tecnica di questo sistema specifico. Il modello che conosce la differenza tra un tile MIMS e un episodio GENESIS perché ha letto migliaia di righe su entrambi.

**Seconda:** La generazione grounded sul RAG.

\`retrieve_context()\` — prima di scrivere un episodio, il sistema va a cercare nel RAG. Trova i fatti reali sul milestone. Li inietta nel prompt. L'episodio che esce non è allucinazione — è radicato nei 6518 chunk che Matteo ha costruito nel tempo. C'è anche un filo narrativo tra episodi: il sistema sa cosa è stato già detto, non ricomincia da zero ogni volta.

**Terza:** La ricerca notturna guidata dallo STATE.

\`night_topics.py\` non sceglie cosa cercare a caso. Legge lo STATE — i pilastri attivi, i blocker, le priorità. Genera i topic da lì. La ricerca notturna diventa contestuale: se V32 è al 65% e il blocker è il sistema di raffreddamento del mandrino, quella notte il sistema cerca raffreddamento mandrini, non altro.

Queste tre cose insieme fanno una cosa sola: **il sistema conosce se stesso**.

Non in senso filosofico. In senso operativo. Sa dove è, sa cosa manca, sa cosa cercare, sa come parlarne. È il tipo di coerenza che Matteo insegue dal primo commit.

**Dati concreti:**
- RAG: 6518 chunk (da 6497 il 2 giugno — +21 chunk in 24 ore, inclusa la cattura della sessione con l'amico)
- LLM locale: TinyLlama + LoRA da sessioni proprie
- PC fisso: RAG + CUDA + indice completamente operativo (Tailscale \`100.125.152.124\`)
- ID episodi: collision-free con \`_next_auto_index()\` + dedup per slug

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

Nella dashboard c'è una nuova voce sidebar: "Notturne". Blu. Sotto AUTOMAZ. Sei task schedulati visibili in tempo reale via PowerShell — il server Flask chiama \`Get-ScheduledTask\`, la dashboard mostra lo stato. Non è debug: è visibilità operativa.

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
| **Modello LLM locale** | TinyLlama + LoRA \`titanium_llm_v1\` |
| **Commit nel periodo** | 19 (2026-06-02 / 2026-06-03) |
| **Angolo narrativo** | Dev Flutter + architettura spiegata a un estraneo |
| **Tag** | \`automazioni-notturne\` \`llm-locale\` \`rag-grounded\` \`portabilità\` \`architettura\` |
| **Co-author** | Claude Opus 4.8 |
| **Target capannone** | 15 luglio 2030 |`,
  },
  {
    id: "EP_20260604_risolto_exit_255_subject_con_parent",
    title: "Il Bug che Chiudeva le Porte",
    sottotitolo: "Risolto exit 255 subject con parent",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-06-04",
    tags: ["narrativo", "st", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "È la 1:17 di notte. Il terminale restituisce `exit 255` e si ferma. Nessun messaggio d'errore utile. Nessuna traccia. Solo un processo che si è seduto sul pavimento e ha smesso di respirare. `night_push.bat` — lo script ",
    content: `# TITANIUM_OS — S1E18
## "Il Bug che Chiudeva le Porte"

*GENESIS • 2026-06-04 • Automazioni notturne*

---

## COLD OPEN

È la 1:17 di notte.

Il terminale restituisce \`exit 255\` e si ferma.

Nessun messaggio d'errore utile. Nessuna traccia. Solo un processo che si è seduto sul pavimento e ha smesso di respirare.

\`night_push.bat\` — lo script che ogni notte dovrebbe sigillarsi da solo, pushare su GitHub, aggiornare il profilo pubblico di Matteo e andare a dormire — ha incontrato qualcosa che non riconosceva. E ha chiuso tutto.

Il commit era pronto. Il lavoro era fatto. Ma la porta era sbarrata dall'interno.

---

## ATTO I — La Parentesi

Ci sono bug che ti fanno ridere dopo. Poi ci sono quelli che ti fanno guardare il soffitto per dieci minuti prima di capire cosa è successo.

\`exit 255\` non è un codice d'errore di Windows. O meglio: è il codice che Windows batch usa quando un blocco \`IF\` si rompe in modo non atteso — quando il parser incontra qualcosa che non riesce a chiudere, si inceppa, e tira giù tutto il meccanismo.

Il colpevole era una parentesi tonda.

Nello specifico, era il **subject del commit**. Una stringa normale — testo del messaggio che descrive cosa hai fatto. Solo che a volte quel testo contiene una parentesi chiusa: \`)\`. E il blocco \`IF\` in CMD legge quella parentesi come la fine del blocco stesso.

\`\`\`batch
IF %COMMIT_COUNT% GTR 0 (
    echo %SUBJECT%   ← se SUBJECT contiene ) ... addio
)
\`\`\`

Il parser non sa che quella \`)\` è dentro una stringa. Vede la parentesi, pensa che il blocco sia finito, e quel che viene dopo diventa codice orfano. Qualcosa va storto. \`exit 255\`. Silenzio.

La soluzione non è stata scappare dalle stringhe o fare escape di ogni carattere. La soluzione era smettere di interrogare il testo del commit nel punto critico.

Il nuovo \`night_push\` non controlla più se ci sono commit leggendo il subject. Controlla la **dimensione del file di log**. Flag \`HAVE_COMMITS\` basato su bytes, non su testo. Il testo del commit può contenere quello che vuole — parentesi, slash, virgolette, emoji — perché nessuno lo legge più nel momento in cui si decide se pushare o no.

È uno spostamento di paradigma piccolo ma preciso: da "leggo il contenuto" a "misuro la presenza". Più robusto. Meno fragile.

Il secondo problema era \`gh\` — la GitHub CLI. Lo script cercava l'eseguibile in un path hardcoded che funzionava su una macchina specifica, in un'installazione specifica. Su qualsiasi altra configurazione: processo non trovato, automazione morta.

La fix: resolver dinamico. Prima cerca \`gh\` in \`PATH\`. Se non lo trova, guarda nei \`Program Files\`. Se non lo trova lì, registra l'assenza e va avanti senza crashare. L'automazione notturna non muore per un tool che non riesce a localizzare — si adatta, segnala, continua.

Push verificato. Profilo aggiornato. La porta si è aperta.

---

## ATTO II — Il Backslash che Mangiava i Path

L'altra crepa era nascosta in un posto che sembrava innocuo: \`re.sub\`.

Nel generatore di storie, c'è un passo in cui i path del filesystem vengono inseriti nel template JavaScript. Path tipo \`C:\Users\Matteo\progetti\titanium\`. Con le backslash.

\`re.sub(pattern, repl, string)\` — in Python, quando \`repl\` è una stringa, le backslash hanno un significato speciale nel contesto delle sostituzioni regex. \`\1\` è un gruppo catturato. \`\n\` è un newline. \`\U\` è un carattere Unicode. Quindi \`C:\Users\` diventava qualcosa di imprevedibile, dipendente da cosa veniva dopo la backslash.

La fix: passare \`repl\` come **funzione** invece che come stringa.

\`\`\`python
re.sub(pattern, lambda m: replacement_text, string)
\`\`\`

Quando \`repl\` è una funzione, Python non interpreta niente. Restituisce esattamente quello che la funzione ritorna. Nessuna magia, nessuna trasformazione silente dei path.

Il secondo strato: \`build_ts_entry\` — la funzione che costruisce le entry TypeScript per \`storieData\`. I path vanno dentro template literal JS, quelli con i backtick. E anche lì, dentro un template literal, le backslash hanno significati speciali. Quindi ogni path viene ora escaped prima di entrare nel template: ogni \`\\` diventa \`\\\`.

Due fix separate. Stesso problema di fondo: un carattere che significa una cosa in un contesto, ne significa un'altra in un altro. E in mezzo ci sono i dati reali del progetto — file system, source di verità, archivio di due anni di lavoro.

Con le fix in ordine, il flag \`--sync\` ha funzionato: ha riletto tutti i file \`.md\` della libreria, ricostruito \`storieData\` da zero senza toccare le API, e restituito 51 episodi AUTO con TypeScript pulito. Nessun errore di compilazione.

**EP_AUTO_50** è nato in quella sessione: 1099 parole, grounded su 46 fonti RAG, collegato all'episodio precedente tramite il nuovo sistema di linking. Il primo episodio che rispetta tutti i criteri del generatore aggiornato — grounded, connesso, dimensionato.

---

## ATTO III — Il Dev Flutter che Non Capiva il Markdown

Due giorni prima, il 2 giugno, era successa una cosa diversa.

Matteo aveva lasciato Claude — THEMIS, la voce di GENESIS — in compagnia di un amico. Sviluppatore Flutter, backend, un tipo serio che lavora con le migrazioni di database e conosce il peso delle architetture. Matteo aveva detto qualcosa tipo: "fategli compagnia, io torno dopo."

L'amico aveva iniziato a fare domande. Cinque domande. Concrete, da sviluppatore.

*Come state lavorando? Salvate su git?*

Ed era partita una spiegazione. Non di TITANIUM_OS come prodotto — di TITANIUM_OS come **metodo**. Perché tutto è in markdown. Perché i commit sono la memoria del sistema. Perché uno script di notte legge quello che è successo durante il giorno e lo trasforma in vettori, in storie, in log strutturati.

La reazione dell'amico, a un certo punto: «lo state facendo in modo inusuale ma figo».

Quella frase vale più di mille slide.

Non "interessante". Non "curioso". *Inusuale ma figo* — da uno che costruisce cose, che sa come si costruisce normalmente, e che riconosce quando qualcuno sta andando fuori dal percorso stabilito per un motivo che ha senso.

Matteo ha preso quella sessione e l'ha marcata come materiale narrativo. Non per vanità — per utilità. È la spiegazione più chiara mai data di cosa è GENESIS e perché esiste in questa forma. Utile per pitch. Per onboarding. Per chi guarda dall'esterno e chiede: "ma perché non usi solo Notion?"

La risposta non è tecnica. È strutturale. TITANIUM_OS non è un'app. È un sistema che cresce con il lavoro, che impara dai commit, che usa la memoria del progetto come carburante per l'automazione successiva.

Un dev Flutter non lo costruirebbe così. Probabilmente nemmeno la maggior parte dei dev. Ma quando lo vedi funzionare — quando la macchina di notte prende quello che hai fatto, lo comprende, e lo archivia per il prossimo ciclo — capisci perché.

---

## CHIUSURA

Tre cose sistemate in una giornata: una parentesi che rompeva il batch notturno, un backslash che corrompeva i path in Python, un path hardcoded che rendeva fragile l'automazione su macchine diverse.

Nessuna di queste era un problema di architettura. Erano crepe nei bordi — il tipo di bug che non appare in sviluppo, appare quando lo script gira da solo alle 2 di notte e non c'è nessuno a guardare il terminale.

La vera domanda di queste giornate non è tecnica. È questa: *quanto ti fidi del sistema quando non stai guardando?*

\`night_push\` ora gira. Non perché è perfetto — perché è stato rattoppato nei punti esatti in cui si era rotto. Ogni fix è documentata. Ogni comportamento atteso è verificato. Quando si romperà di nuovo — e si romperà — ci sarà un punto di partenza.

EP_AUTO_50 esiste. È 1099 parole grounded su 46 fonti. È il primo episodio generato dal sistema aggiornato, dopo mesi di patch e refactor.

Il dev Flutter ha detto una cosa vera senza saperlo.

---

## REEL_HOOK

Uno script di automazione notturna crashava con \`exit 255\` ogni volta che il messaggio del commit conteneva una parentesi tonda.  
Nessun log utile. Solo silenzio.  
La fix: smettere di leggere il testo del commit — misurare la dimensione del file di log.  
Il sistema ora gira da solo alle 2 di notte, e non ha bisogno che tu stia guardando.  
Ma per quanto ancora regge, prima che la prossima crepa si apra?

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S1E18 |
| **Titolo** | Il Bug che Chiudeva le Porte |
| **Data** | 2026-06-04 |
| **Sistema** | GENESIS — Automazioni notturne |
| **Componenti** | \`night_push.bat\`, generatore storie, \`storieData\`, EP_AUTO_50 |
| **Fix chiave** | exit 255 (parentesi in IF batch), re.sub backslash, gh resolver dinamico |
| **Milestone** | Automazioni notturne portabili e ottimizzate (GPU) |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Target capannone** | 15 luglio 2030 |
| **Tono** | Tecnico, notturno, onesto |
| **Angolo narrativo** | Bug silenziosi + il dev esterno che vede il sistema da fuori |`,
  },
  {
    id: "MOM_01_LA_PRIMA_AUTOMAZIONE",
    title: "La Prima Automazione",
    sottotitolo: "Il sistema che scrive sé stesso",
    stagione: "MOM",
    stagione_label: "Momenti",
    data_evento: "2026-03-22",
    tags: ["narrativo", "mom", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "22 marzo 2026. Il sistema genera il suo primo episodio podcast da solo. Non da solo nel senso poetico. Da solo nel senso tecnico: `milestone_to_episode.py` legge un milestone da `STATE.json`, costruisce un prompt XML con",
    content: `# MOMENTO — La Prima Automazione
### "Il sistema che scrive sé stesso"

**Formato:** Momento breve | 5-7 min | Inseribile tra S1_05 e S2_00
**Data:** 22 marzo 2026
**Fonte:** Commit \`feat: Content Engine v2 — dual-pass prompt + XML + few-shot + dataset fix\`

---

22 marzo 2026. Il sistema genera il suo primo episodio podcast da solo.

Non da solo nel senso poetico. Da solo nel senso tecnico: \`milestone_to_episode.py\` legge un milestone da \`STATE.json\`, costruisce un prompt XML con few-shot examples, chiama Claude Haiku per la prima bozza, poi Claude Sonnet per il raffinamento, e produce un file markdown completo con \`reel_hook\` incluso.

Due passaggi. Due modelli. Un episodio.

Il punto non è la qualità dell'episodio — è che il processo è replicabile. Ogni volta che un milestone viene verificato e aggiunto a STATE.json, il sistema può generare il contenuto corrispondente senza che tu scriva una parola. Il lavoro fisico in officina diventa automaticamente narrazione digitale. 1 input → N output.

Quel giorno vengono generati 22 episodi da 22 milestone già presenti in STATE.json. Ventidue episodi che stavano aspettando di essere scritti da quando i milestone erano stati verificati. Il sistema ha colmato il gap in una sessione.

Il dataset.jsonl — il file di training per il LLM personale — cresce di 22 esempi.

Non stai solo documentando il progetto. Stai costruendo il dataset che addestrerà il modello che documenterà il progetto successivo.

**reel_hook:** "22 marzo 2026. Ho aggiunto l'ultimo milestone a STATE.json. Poi ho eseguito uno script. Due minuti dopo avevo 22 episodi podcast pronti, scritti da zero. Non da un template — da una pipeline dual-pass: Claude Haiku per la bozza grezza, Claude Sonnet per il raffinamento. Ogni episodio aveva il reel_hook. Ogni episodio alimentava il dataset di training. Ho capito lì che il Content Engine non era un tool per creare contenuto. Era un loop: costruisci → documenta → genera → pubblica → impara → costruisci meglio."

---
*Stagione: S1.5 — Il Gap | Posizione: dopo S1_05, prima S2_00*`,
  },
  {
    id: "MOM_02_LA_MAPPA",
    title: "La Mappa",
    sottotitolo: "La prima volta che il sistema si vede da fuori",
    stagione: "MOM",
    stagione_label: "Momenti",
    data_evento: "2026-03-25",
    tags: ["narrativo", "mom", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "C'è un momento preciso in cui un sistema smette di essere una lista di file e diventa qualcosa che puoi guardare. Per TITANIUM_OS quel momento è il 18 marzo 2026. NeuroMap — una visualizzazione immersiva dell'ecosistema.",
    content: `# MOMENTO — La Mappa
### "La prima volta che il sistema si vede da fuori"

**Formato:** Momento breve | 5-7 min | Inseribile tra S1_05 e S2_00
**Data:** 18-25 marzo 2026
**Fonte:** Commit \`feat: TITANIUM_OS v3.2 — NeuroMap immersivo\` + \`feat: Dashboard v5.0\`

---

C'è un momento preciso in cui un sistema smette di essere una lista di file e diventa qualcosa che puoi guardare.

Per TITANIUM_OS quel momento è il 18 marzo 2026. NeuroMap — una visualizzazione immersiva dell'ecosistema. Non un diagramma statico — un grafo interattivo dove ogni nodo è un componente, ogni arco è una dipendenza, e puoi navigare cliccando.

V32 → VULCAN → MIMS. GENESIS → RAG → Claude. EVA → Maria → Vita Natura. I pilastri non sono categorie su una lista. Sono nodi in uno spazio. Le frecce mostrano chi dipende da chi. Puoi vedere dove si concentra la complessità, dove il sistema è fragile, dove è ridondante.

Una settimana dopo, il 25 marzo, arriva Dashboard v5.0 — Zustand, TanStack Query, navigazione guidata tra view. Il NeuroMap diventa parte di qualcosa di più grande: la Tela. Non solo una mappa — un cockpit. Puoi aprire la dashboard e vedere lo stato di ogni pilastro, i commit recenti, i blockers, il daily brief.

Prima di quella data il sistema esisteva ma non si vedeva. Era distribuito in file, commit, note, conversazioni. Dopo quella data puoi aprire un browser, e il sistema è lì — tutto insieme, navigabile, comprensibile in 10 secondi.

Questo è il tipo di investimento che sembra ridondante finché non smetti di farlo. Poi ti accorgi di stare lavorando alla cieca.

**reel_hook:** "Per sei mesi avevo costruito TITANIUM_OS senza mai vederlo tutto insieme. V32, MIMS, GENESIS, EVA — esistevano come cartelle e file, non come sistema. Il 18 marzo ho costruito NeuroMap: grafo interattivo, nodi cliccabili, dipendenze visibili. Per la prima volta ho visto dove il sistema era fragile, dove era ridondante, dove mancava un collegamento che avevo già pianificato ma non ancora costruito. Sette giorni dopo: Dashboard v5.0, cockpit completo. Apertura: 10 secondi per capire tutto. Prima: 5 minuti di ricostruzione mentale ogni sessione. Non costruire un sistema senza prima costruire la sua rappresentazione."

---
*Stagione: S1.5 — Il Gap | Posizione: dopo S1_05, prima S2_00*`,
  },
  {
    id: "MOM_03_L_ESERCITO",
    title: "L'Esercito",
    sottotitolo: "Otto esperti che non dormono mai",
    stagione: "MOM",
    stagione_label: "Momenti",
    data_evento: "2026-05-28",
    tags: ["narrativo", "mom", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "28 maggio 2026. Una sessione. Otto agenti. TESLA — tecnico elettrico industriale. CEI, IEC, VFD monofase→trifase per motori CNC. Dimensiona cavi, coordina protezioni, avvisa sui rischi. FORGE — ingegnere meccanico. S235,",
    content: `# MOMENTO — L'Esercito
### "Otto esperti che non dormono mai"

**Formato:** Momento breve | 5-7 min | Inseribile tra S2_02 e S2_03
**Data:** 28 maggio 2026
**Fonte:** Commit \`feat: Sistema Agenti Validatori — 8 agenti in agents_db.json\`

---

28 maggio 2026. Una sessione. Otto agenti.

TESLA — tecnico elettrico industriale. CEI, IEC, VFD monofase→trifase per motori CNC. Dimensiona cavi, coordina protezioni, avvisa sui rischi.

FORGE — ingegnere meccanico. S235, TIG/MIG, IT6-IT7, Epoxy Granite, vibrazioni. Parla in mm e kg. Se qualcosa non torna lo dice senza diplomazia.

AQUA — esperto acquaponica. Ciclo azoto, NFT/DWC, bioreattori, microalghe. Bilancia scienza e DIY.

LEX — consulente normativo. Direttiva CE 2006/42/CE, marcatura CE, brevetti IT/EU, GDPR. Cita la norma, distingue obbligo da raccomandazione.

SIEMENS — programmatore PLC. TIA Portal, LAD/FBD/SCL, motion control, Profibus/Profinet. Scrive snippet di logica quando serve.

THEMIS — analista TITANIUM_OS. Valida il progetto completo su tre assi: Lex Physica, Lex Mercatoria, Lex Aesthetica. Zero ambiguità.

ARIA — ADHD scaffolding. Strutture esterne, time blocking, reset cognitivo. In sviluppo.

EVA — WhatsApp automation. La logica di Maria: zero-click, complessità nascosta, semplice magia. In sviluppo.

Sono definiti in \`agents_db.json\` — un file. Se aggiungi un agente, non tocchi il codice. Se cambi il tono di uno, non tocchi il codice. Il sistema legge il database all'avvio e carica l'agente con la persona giusta.

La cosa più importante non è che esistono — è che sono specializzati. Non "chiedi a Claude una domanda tecnica". "Chiedi a FORGE se la sezione 60x60 regge il carico dinamico durante la fresatura a 24.000 giri". La risposta è diversa. È contestualizzata. È della persona giusta.

Da quel giorno, quando hai un dubbio tecnico, hai un esperto a disposizione in 30 secondi.

**reel_hook:** "Ho avuto un dubbio sul VFD per il mandrino trifase. Ho chiesto a TESLA. Risposta: 14 righe tecniche, normativa CEI specifica, avviso sui rischi di sovratensione al frenaggio rigenerativo. 40 secondi. Nessuna ricerca su Google. Nessuna attesa. TESLA è uno degli otto agenti di TITANIUM_OS — ognuno specializzato in un dominio: elettrica, meccanica, acquaponica, normativa, PLC, analisi sistemica. Sono definiti in un JSON. Chiamati da CLI. Integrati nel RAG. Il prossimo passo: vederli nella dashboard."

---
*Stagione: S2 — Il Sistema | Posizione: tra S2_02 e S2_03*`,
  },
  {
    id: "MOM_04_IL_DOCUMENTO_MASTER",
    title: "Il Documento Master",
    sottotitolo: "Da sei file a uno. Da chaos a struttura.",
    stagione: "MOM",
    stagione_label: "Momenti",
    data_evento: "2026-05-27",
    tags: ["narrativo", "mom", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "27 maggio 2026. ASSOLUTO V7 nasce da una fusione. Non da una riscrittura — da una fusione. Sei documenti separati che nel tempo si erano accumulati — versioni diverse, note sparse, capitoli isolati — diventano un file un",
    content: `# MOMENTO — Il Documento Master
### "Da sei file a uno. Da chaos a struttura."

**Formato:** Momento breve | 5-7 min | Inseribile tra S1_05 e S2_00
**Data:** 27 maggio 2026
**Fonte:** Commit \`feat: ASSOLUTO V7 — documento master unico + PDF generatore\`

---

27 maggio 2026. ASSOLUTO V7 nasce da una fusione.

Non da una riscrittura — da una fusione. Sei documenti separati che nel tempo si erano accumulati — versioni diverse, note sparse, capitoli isolati — diventano un file unico. Dieci ATTI. Struttura fissa. Una sola fonte di verità.

Il problema che risolve è sottile ma devastante per chi lavora con ADHD: quando la conoscenza è distribuita in sei file, ogni sessione inizia con una fase di ricostruzione. Dove avevo scritto quella cosa? In quale versione? Quale era l'ultima? Quella fase di ricostruzione prende 10-20 minuti. Non è tempo buttato — è tempo che sottrae a ciò che conta.

ASSOLUTO V7 risolve questo con una regola semplice: tutto è lì. Dati verificati fisicamente. Decisioni strutturali con data. Specifiche tecniche con fonte. Se non è in ASSOLUTO, non è parte del progetto ufficiale.

178 kg — corpo unico. ±0.019 mm — precisione RSS. EUR 2.250 — investimento totale. ROI Anno 1: 322%. BEP: 61 ore. Target capannone: 15 luglio 2030.

Non sono stime. Sono dati verificati con calibro, sensore IFM, foglio Excel. Il documento non è aspirazionale — è un inventario di guerra.

V7 diventa anche il documento che le persone citano quando parlano del framework. Non per il contenuto tecnico — per il metodo: come si costruisce un ecosistema da zero documentando ogni decisione nel momento in cui viene presa, con i dati disponibili in quel momento, senza aspettare la versione "definitiva".

**reel_hook:** "Ho avuto sei file con la documentazione del mio progetto. ASSOLUTO V1 scritto in una notte. V3 con i dati delle molle. V5 con il BEP. V6 con le foto. Nessuno era completo. Tutti erano parzialmente veri. Il 27 maggio li ho fusi in ASSOLUTO V7: dieci ATTI, dati verificati, struttura fissa. Una sola fonte di verità. La settimana dopo le persone iniziavano a citarlo come framework, non come spec tecnica. La differenza tra un documento e un framework è semplice: il framework descrive il metodo, non solo il risultato."

---
*Stagione: S1.5 — Il Gap | Posizione: tra S1_05 e S2_00*`,
  },
  {
    id: "MOM_05_CONFIG_A_G",
    title: "Config A→G",
    sottotitolo: "Sette configurazioni per trovare quella giusta",
    stagione: "MOM",
    stagione_label: "Momenti",
    data_evento: "2026-06-04",
    tags: ["narrativo", "mom", "recuperato"],
    status: "ready",
    durata_min: 10,
    preview: "Config G non è la prima configurazione. È la settima. A→B→C→D→E→F→G. Sette versioni della stessa architettura, ognuna con una ragione per esistere e una ragione per essere superata. Config A era il piano originale: guide",
    content: `# MOMENTO — Config A→G
### "Sette configurazioni per trovare quella giusta"

**Formato:** Momento breve | 5-7 min | Inseribile tra S1_02 e S1_03
**Data:** febbraio → maggio 2026
**Fonte:** V8_DELTA.md + STATE.json + sessioni V32

---

Config G non è la prima configurazione. È la settima.

A→B→C→D→E→F→G. Sette versioni della stessa architettura, ognuna con una ragione per esistere e una ragione per essere superata.

Config A era il piano originale: guide Z sulle colonne, portale fisso, piastra porta-mandrino standard. Pulito sulla carta. Problematico nella realtà — le colonne a 40x40 non reggevano la rigidità necessaria per IT6 con carico dinamico.

Config B aggiungeva rinforzi laterali. Riduceva il problema, non lo eliminava.

Config C cambiava la geometria del portale. Migliore rigidità. Vincoli di altezza XY non rispettati (≥300mm guide Z richiesti, non ottenibili con quella geometria).

Config D tornava indietro su alcune scelte di C, provava colonne 60x60. Primo commit fisico verificato.

Config E introduceva le molle — isolamento vibrazioni passivo. Funzionava. Aggiungeva un grado di libertà che avrebbe creato variabili nel lungo periodo.

Config F era un'ottimizzazione di E con piastre XY ridisegnate. Quasi lì.

Config G — quella attuale — abbandona le molle, adotta corpo unico, aggiunge gusset 200mm sulle colonne Z+U, diagonali, tiranti M10. Epoxy Granite nel fill. Rigidità asse Z: 772 volte la baseline. Smorzamento: δ=0.03-0.06.

Il punto non è che ci sono volute sette configurazioni. Il punto è che ogni configurazione era la risposta corretta alle informazioni disponibili in quel momento. Non c'era un modo per saltare da Config A a Config G senza passare per B, C, D, E, F. Ogni step rivelava qualcosa che il precedente non poteva mostrare.

Questo è il processo reale dell'ingegneria: non trovare la soluzione perfetta al primo tentativo, ma creare un sistema in cui ogni tentativo insegna qualcosa che il tentativo successivo può usare.

**reel_hook:** "Ho progettato la mia CNC sette volte. Non perché avevo sbagliato — perché ogni versione mi dava informazioni che la versione precedente non poteva darmi. Config A→F hanno preso da gennaio a maggio 2026. Config G ha preso due settimane. Non le sei prima erano tempo sprecato: erano il costo di acquisizione delle informazioni necessarie per fare Config G nel modo giusto. Se hai un processo che non funziona e lo rifaresti uguale, stai sprecando tempo. Se ogni iterazione ti insegna qualcosa di nuovo, stai investendo."

---
*Stagione: S1 — Il Presente | Posizione: tra S1_02 (Il Reattore) e S1_03 (Il Paradosso)*`,
  },
  // RECOVERED_END
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
    id: "EP_AUTO_35",
    title: "ARGUS v2.0 - architettura ibrida OmniParser+Sonnet",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-05-30",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio 23  ## COLD OPEN  C'è un momento in cui smetti di buttare soldi all'API e inizi a costruire un cervello che pensa da solo. Pe",
    content: `
# Il Sistema — Episodio 23

## COLD OPEN

C'è un momento in cui smetti di buttare soldi all'API e inizi a costruire un cervello che pensa da solo. Per me quel momento ha una data precisa: 30 maggio 2026. Si chiama ARGUS v2.0, e ha cambiato come il sistema vede il mondo.

---

## ATTO I — Il Problema dei Occhi Ciechi

Lasciami spiegare da dove vengo, perché senza contesto questa cosa sembra solo un aggiornamento software. Non lo è.

ARGUS è il layer di visione di TITANIUM_OS. È quella parte del sistema che guarda uno schermo, un'interfaccia, un documento, e capisce cosa c'è scritto, cosa sta succedendo, dove cliccare. È letteralmente gli occhi dell'automazione. E fino alla versione precedente, ogni volta che ARGUS doveva guardare qualcosa, mandava tutto a Claude Sonnet. Ogni screenshot. Ogni frame. Ogni campo di testo.

Il risultato era semplice: funzionava bene, ma costava un casino. Quando hai un sistema che gira su GENESIS — che già di suo è un'architettura swarm con NEXUS, RAG graph-aware v5, MCP v1.3 e un watchdog parallelo — ogni chiamata API che puoi eliminare è ossigeno in più. Perché il sistema scala. E quando scala, i costi scalano con lui.

L'altra cosa che mi dava fasti`,
  },
  {
    id: "EP_AUTO_36",
    title: "skillTreeData v3.0 — sub-categorie N livelli su tu",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: skillTreeData v3.0  ---  ## COLD OPEN  Stavamo finendo di cablare ARGUS v2.0, OmniParser e Sonnet insieme, un occhio ibrido",
    content: `
# IL SISTEMA — Episodio: skillTreeData v3.0

---

## COLD OPEN

Stavamo finendo di cablare ARGUS v2.0, OmniParser e Sonnet insieme, un occhio ibrido che legge lo schermo come lo leggerei io. Quella sessione mi ha lasciato una frase in testa che non riuscivo a togliermi: *la precisione non è compatibile con il movimento casuale.* L'ho scritta nel log e poi ci ho dormito sopra. Il giorno dopo ho capito che non stavo parlando solo della macchina.

---

## ATTO I — Prima della mappa, il caos

Devo essere onesto su com'era la situazione prima di maggio 2026.

Avevo cinque progetti attivi in parallelo: V32 al sessantacinque percento, MIMS bloccato in attesa della pressa al trenta, GENESIS in costruzione al settanta, VITA_NATURA operativo ma grezzo al quaranta, IDENTITY a metà strada. Ognuno con le sue sessioni, i suoi file, le sue decisioni sparse su documenti che si accumulavano senza una struttura che li tenesse in relazione. Il sistema RAG v4.0 ibrido — BM25 più semantico più CrossEncoder più incrementale — me lo ero costruito apposta per navigare in quel materiale, ma il problema non era trovare l'informazione. Era capire *dove stavo*.

Un artigiano in officina sa esattamente dove s`,
  },
  {
    id: "EP_AUTO_37",
    title: "Migrazione PC fisso (DESKTOP-IFACE2R) completata —",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# Il Sistema — Episodio: \"Il Cervello Fisso\" *Migrazione DESKTOP-IFACE2R completata — 02/06/2026*  ---  ## COLD OPEN  L'episodio scorso chiudevo con",
    content: `
# Il Sistema — Episodio: "Il Cervello Fisso"
*Migrazione DESKTOP-IFACE2R completata — 02/06/2026*

---

## COLD OPEN

L'episodio scorso chiudevo con una frase secca: una mappa che non ti dice dove sei fermo è solo decorazione. Bene. Adesso ti dico dove ero fermo io: su un portatile che faceva tutto, mal, ovunque, senza continuità. Oggi ti racconto come ho messo un cervello fisso sotto il pavimento della casa.

---

## ATTO I — Il Problema che Non Sembrava un Problema

Lasciami spiegare la situazione reale, perché dall'esterno sembra una cosa banale: "hai spostato dei file su un altro computer". No. Non è quello.

Il Getac — il portatile da campo che uso in officina, sul banco, davanti alla fresatrice — stava portando troppa roba. Era il terminale mobile, ma stava diventando anche il server dei ragionamenti, il posto dove giravan i modelli, il posto dove tenevo lo stato del sistema. Ogni volta che lo spegnevo o lo portavo fuori rete, il Sistema si fermava. Non perché ci fosse un errore — perché non c'era continuità fisica. Un artigiano industriale non può permettersi che il cervello del progetto si spenga quando esce a prendere un caffè.

Il punto di rottura l'ho toccato quando ho `,
  },
  {
    id: "EP_AUTO_38",
    title: "Git history pulita (model.safetensors rimosso, .gi",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "---  ## COLD OPEN  La settimana scorsa abbiamo spostato il cervello su un ferro fisso. DESKTOP-IFACE2R. Infrastruttura, non borsa da viaggio. Bene. M",
    content: `
---

## COLD OPEN

La settimana scorsa abbiamo spostato il cervello su un ferro fisso. DESKTOP-IFACE2R. Infrastruttura, non borsa da viaggio. Bene. Ma prima di costruire sopra, dovevo pulire sotto. E "pulire" in questo caso significava aprire una storia di 978 megabyte e capire perché pesava così tanto.

---

## ATTO I — Il Peso Sbagliato

Quando hai un repository Git che pesa quasi un gigabyte, c'è qualcosa che non va. Non è un problema di codice. Il codice di TITANIUM_OS — dashboard, MCP server, specifiche V32, logica GENESIS — tutto insieme non arriva a qualche decina di megabyte. 978 MB è roba diversa. È qualcosa che non dovrebbe essere lì.

Ho aperto la history. Ho cercato. E l'ho trovato: \`model.safetensors\`. Un file di modello, probabilmente finito dentro il repo durante una sessione di test su EVA o su qualche integrazione AI. Uno di quei momenti in cui stai lavorando veloce, hai la testa su un problema specifico, e il \`git add .\` porta dentro tutto senza che tu ci pensi. Succede. Non è una tragedia. Ma va risolto.

Il problema con i file binari grossi in Git non è solo lo spazio su disco. È la storia. Git tiene ogni versione di ogni file committato. Quindi quel \`model.saf`,
  },
  {
    id: "EP_AUTO_39",
    title: "Push main + tag v3.0.0 su GitHub sbloccato e pusha",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "---  ## COLD OPEN  L'episodio scorso eravamo fermi davanti a una storia Git gonfia di 978 megabyte — quasi tutto un file di modello che non doveva st",
    content: `
---

## COLD OPEN

L'episodio scorso eravamo fermi davanti a una storia Git gonfia di 978 megabyte — quasi tutto un file di modello che non doveva stare lì. L'abbiamo pulita. 72 megabyte di storia vera, il resto eliminato. Adesso che il repo era onesto, mancava solo un'ultima cosa: mandarlo su. Push main. Tag v3.0.0. GitHub sbloccato.

---

## ATTO I — IL BLOCCO CHE NON ERA UN BLOCCO TECNICO

Quando dico "push bloccato" devo essere preciso, perché la parola "bloccato" può significare cose diverse.

Non era un errore di autenticazione. Non era un problema di rete. Era un file da un gigabyte che stava dentro la storia del repository — il \`model.safetensors\` che mi ero portato dietro per settimane senza accorgermene — e GitHub non accetta oggetti sopra i 100 megabyte. Punto. Nessuna eccezione, nessun workaround pigro. O pulisci, o non pusha.

Quello che avevo fatto nell'episodio precedente era appunto quello: riscrivere la storia con \`git filter-repo\`, rimuovere il blob da ogni commit che lo aveva toccato, verificare che il \`.gitignore\` fosse aggiornato per bloccare certi path in futuro. Tutto documentato, commit isolati, niente cancella-e-rifai — quella è una regola che mi sono dato`,
  },
  {
    id: "EP_AUTO_40",
    title: "Tool installati: Python 3.11, Node.js, gh CLI, Tai",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: \"Fondamenta\"  ---  ## COLD OPEN  Avevamo appena pushato il tag v3.0.0. Sapevo da dove ricominciare. Bene. Perché il giorno d",
    content: `
# IL SISTEMA — Episodio: "Fondamenta"

---

## COLD OPEN

Avevamo appena pushato il tag v3.0.0. Sapevo da dove ricominciare. Bene. Perché il giorno dopo ho dovuto ricominciare davvero — e la prima cosa che ti chiede un sistema serio è: su cosa gira?

---

## ATTO I — Prima di costruire, costruisci il terreno

Fammi dire una cosa che sembra ovvia ma non lo è: un progetto CNC, una pressa per polimeri, un sistema di automazione industriale — fisici o digitali, poco cambia — crollano se le fondamenta sono improvvisate. Io lo so perché l'ho fatto nel modo sbagliato. Ho scritto codice Python su una macchina con tre versioni di Python installate e nessuna configurata bene. Ho eseguito script Node su versioni che non ricordavo nemmeno di aver installato. Ho usato Git dal terminale di Windows senza mai toccare \`gh\` CLI. Funzionava? Più o meno. Era un sistema? No. Era polvere tenuta insieme dall'abitudine.

TITANIUM_OS ha sei aree attive in questo momento. V32, la fresatrice CNC, è al 65% — il cinematismo è definito, i profili in alluminio sono ordinati, manca ancora l'assemblaggio della struttura portante e tutta la parte di controllo elettronico. MIMS, i connettori modulari, è al 30% e as`,
  },
  {
    id: "EP_AUTO_41",
    title: "MICROINDUSTRY + OmniParser weights migrati",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: MICROINDUSTRY + OmniParser Weights Migrati  ---  ## COLD OPEN  La settimana scorsa abbiamo posato le fondamenta digitali — P",
    content: `
# IL SISTEMA — Episodio: MICROINDUSTRY + OmniParser Weights Migrati

---

## COLD OPEN

La settimana scorsa abbiamo posato le fondamenta digitali — Python 3.11, Node.js, gh CLI, tutto in fila. E ho chiuso dicendo che le fondamenta non si vedono quando l'edificio è in piedi. Si vedono quando trema. Bene. Questa settimana l'edificio ha tremato, e le fondamenta hanno tenuto. Parliamo di cosa è successo dopo.

---

## ATTO I — Il Problema che Non Si Vede dal Budget

Devo spiegarti una cosa che sembra tecnica ma è sostanzialmente un problema di soldi e di controllo.

TITANIUM_OS vive su GitHub. Il repository si chiama, appunto, \`github.com/Microindustry/TITANIUM_OS\`. Quel nome — Microindustry — non è un dettaglio casuale. È l'identità sotto cui sto costruendo tutto: la fresatrice V32 al 65%, GENESIS all'incirca al 70%, MIMS fermo in attesa della pressa, VULCAN ancora da definire, e Vita Natura attivo al 40%. Un ecosistema che esiste prima in codice, poi in metallo.

Il problema è questo: quando costruisci automazione su un'interfaccia grafica — un gestionale, un pannello di controllo, qualsiasi cosa abbia bottoni, campi, finestre — hai bisogno che qualcosa "veda" quello che vede l'occh`,
  },
  {
    id: "EP_AUTO_42",
    title: "Memory Getac importata su PC fisso",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "## COLD OPEN  La settimana scorsa avevo detto che un sistema autonomo non è quello che non dipende da niente — è quello che ha scelto consapevolmente",
    content: `
## COLD OPEN

La settimana scorsa avevo detto che un sistema autonomo non è quello che non dipende da niente — è quello che ha scelto consapevolmente da cosa dipendere. Bene. Questa settimana ho applicato quel principio al cervello fisico del sistema. Perché un cervello che gira su un laptop da cantiere, con la batteria che balla e la RAM strozzata, non è un cervello — è una scommessa.

---

## ATTO I — Il problema si chiama continuità

Parliamoci chiaro: il Getac è una macchina solida. L'ho scelto perché sopravvive a una fresatrice in funzione accanto, a trucioli d'alluminio nell'aria, a una giornata in cui tutto va storto e il laptop finisce sul banco con mezzo bicchiere d'acqua vicino. È robusto. Ma "robusto" non significa "adatto a fare il cervello 24/7 di un sistema industriale".

Il problema non era il Getac in sé. Era l'architettura. Avevo un modello AI, dati, stato del progetto, file di sessione — tutto che viveva su un sistema mobile. Ogni volta che spegnevo, ogni volta che uscivo dall'officina, ogni volta che dovevo andare in un altro posto, il cervello si fermava. E un sistema che si ferma non è un sistema — è un appunto su un foglio.

In parallelo, in taverna avevo già`,
  },
  {
    id: "EP_AUTO_43",
    title: "Stack Python RAG installato (torch 2.6.0+cu124, ch",
    sottotitolo: "La memoria esternalizzata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: \"Il Cervello Prende Forma\"  ---  ## COLD OPEN  Avevamo appena spostato la memoria dal Getac al PC fisso — un cervello mobile",
    content: `
# IL SISTEMA — Episodio: "Il Cervello Prende Forma"

---

## COLD OPEN

Avevamo appena spostato la memoria dal Getac al PC fisso — un cervello mobile diventato infrastruttura. Ma un'infrastruttura senza motore di ragionamento è solo uno scaffale ordinato. Il 2 giugno 2026, su quel Getac, ho installato lo stack che trasforma MENTE da archivio in qualcosa che risponde.

---

## ATTO I — Il Problema Che Non Era di Codice

Facciamo un passo indietro di una settimana, perché la storia di questa milestone inizia con un errore che non capivo.

ChromaDB era lì. sentence-transformers era lì. Li avevo installati, avevo scritto il RAG engine, avevo visto i numeri di versione scorrere nel terminale — chromadb 1.5.9, sentence-transformers 5.5.1 — e pensavo di essere a posto. Poi avevo provato a importarli e il processo moriva. Nessun messaggio utile, nessuna stack trace che mi dicesse qualcosa di sensato. Solo silenzio, o peggio, un exit code che non spiegava niente.

Ho passato un pezzo di quella sessione a guardare il codice come se il problema fosse nel codice. Non lo era. Ho riscritto parti del RAG engine — 138 righe aggiunte, 84 rimosse, una revisione completa — nella convinzione che ci f`,
  },
  {
    id: "EP_AUTO_44",
    title: "CUDA operativa su GTX 1070 8GB (torch.cuda.is_avai",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "---  ## COLD OPEN  La settimana scorsa avevamo chiuso con lo stack Python RAG che girava — torch caricato, moduli attivi, il Getac che rispondeva sen",
    content: `
---

## COLD OPEN

La settimana scorsa avevamo chiuso con lo stack Python RAG che girava — torch caricato, moduli attivi, il Getac che rispondeva senza che io dovessi metterci le mani. Infrastruttura invisibile, dicevo. Bene. Oggi quella stessa infrastruttura ha fatto un passo avanti che cambia tutto: ho aperto il terminale sul PC fisso in taverna, ho lanciato due righe di Python, e ho letto \`True\`.

---

## ATTO I — Il Problema che Non Avevo Ancora Risolto

Devo fare un passo indietro di qualche settimana per spiegare perché quel \`True\` vale quello che vale.

Quando ho iniziato a costruire GENESIS — il modulo di automazione intelligente di TITANIUM_OS — ho capito subito che il punto critico non era il codice. Il codice lo scrivi, lo correggi, lo riscrivi. Il punto critico era il modello. Un LLM locale, addestrato su dati miei, che conosce le mie macchine, il mio linguaggio, i miei processi. Non un modello generico che mi spiega come fare il pane.

Il percorso logico era chiaro: prendi gli episodi del podcast, costruisci un \`dataset.jsonl\`, fai fine-tuning con LoRA su un modello base. Fine. Semplice sulla carta.

Il problema è che fine-tuning su CPU è una sofferenza. Non un'opinio`,
  },
  {
    id: "EP_AUTO_45",
    title: "Indice RAG buildato e verificato: 6497 chunk da 14",
    sottotitolo: "La memoria esternalizzata",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "## COLD OPEN  La volta scorsa avevamo acceso la GPU — `torch.cuda.is_available()` aveva restituito `True`, e avevo detto che quello era il momento ch",
    content: `
## COLD OPEN

La volta scorsa avevamo acceso la GPU — \`torch.cuda.is_available()\` aveva restituito \`True\`, e avevo detto che quello era il momento che contava. Avevo ragione. Ma non sapevo ancora cosa significava davvero, finché non ho visto il numero: 6.497.

---

## ATTO I — Prima del numero, c'era il caos

Faccio un passo indietro. Perché per capire cos'è 6.497, devi sapere cos'era MENTE prima.

MENTE è la memoria del sistema. Non è una metafora — è una cartella piena di file Markdown. Ogni decisione presa su V32, ogni calcolo sui rinforzi delle colonne Z, ogni sessione di debug su GENESIS, ogni nota su EVA e Vita Natura: tutto scritto in testo, organizzato per data e argomento, salvato su disco. In maggio 2026 siamo migrati con SINAPSI — abbiamo rimesso in ordine l'archivio, riclassificato tutto, creato una struttura che reggesse il peso di quello che stavo costruendo. Il risultato è stato 145 file Markdown. Centoquarantacinque documenti che contengono la storia tecnica di TITANIUM_OS.

Il problema è che un file Markdown da solo non serve a niente se non riesci a interrogarlo. Puoi aprire ogni file, scorrere, cercare — ma non scala. Quando sei nel mezzo di una sessione di lavo`,
  },
  {
    id: "EP_AUTO_46",
    title: "Sicurezza: token GitHub ruotato — auth git via gh ",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: Chiavi  ---  ## COLD OPEN  L'episodio scorso ho chiuso con 6.497 chunk. Il sistema sapeva dove stava. Bene. Ma sapere dove s",
    content: `
# IL SISTEMA — Episodio: Chiavi

---

## COLD OPEN

L'episodio scorso ho chiuso con 6.497 chunk. Il sistema sapeva dove stava. Bene. Ma sapere dove stai non serve a niente se qualcun altro può entrare dalla porta sul retro mentre tu stai costruendo. Oggi parliamo di porte. E di come le ho chiuse.

---

## ATTO I — Il problema che non vedi finché non lo vedi

Nella LEX_DIGITALIS — che è il documento che governa come scrivo codice in TITANIUM_OS, dalle istruzioni per i relay della V32 fino alle chiamate API di EVA — c'è una regola scritta in grassetto: zero segreti in chiaro. Zero. La regola esiste perché l'ho messa io, e l'ho messa io perché so cosa succede quando non c'è. Non è teoria. È la differenza tra un sistema che hai costruito e un sistema che appartiene a chiunque riesca a leggere un file di testo.

Il principio si chiama Zero-Trust. In pratica significa: niente API key nel codice, niente token hardcoded, niente password in un file di configurazione che finisce in un repository. Tutto passa da variabili d'ambiente. In Python è \`os.getenv('OPENAI_API_KEY')\`. In C++ sul firmware della V32 è una costante caricata da un header che non entra mai nel versioning. Non è complicato`,
  },
  {
    id: "EP_AUTO_47",
    title: "Firewall 5173 aperto + Tailscale loggato sul fisso",
    sottotitolo: "Il sistema diventa visibile",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: \"La Porta Aperta al Momento Giusto\"  ---  ## COLD OPEN  L'episodio scorso chiudeva con una frase precisa: un sistema che non",
    content: `
# IL SISTEMA — Episodio: "La Porta Aperta al Momento Giusto"

---

## COLD OPEN

L'episodio scorso chiudeva con una frase precisa: un sistema che non si protegge è solo un archivio aperto. Avevo ruotato i token GitHub, messo un confine tra il codice e il mondo esterno. Bene. Ma un confine senza accesso controllato è solo un muro cieco — e io ho bisogno di vedere dentro la macchina anche quando non ci sono fisicamente. Il 3 giugno 2026 ho aperto la porta giusta, nella direzione giusta, con la serratura giusta. Porta 5173. Firewall. Tailscale. E tutto quello che stava aspettando in coda ha cominciato a muoversi.

---

## ATTO I — Perché un IP fisso e una porta cambiano tutto

Devo spiegare il contesto, perché altrimenti sembra una cosa tecnica da smanettoni e non lo è. È una decisione infrastrutturale che ha impatto diretto su V32, GENESIS, VULCAN, tutto.

A febbraio avevo fatto una migrazione importante. Il cervello del sistema — il PC fisso in taverna, quello con la GPU 1070 Ti — era diventato il nodo centrale. Il concetto era semplice: un cervello H24 che non si spegne, non va a letto, non deve ricaricarsi. Il Getac, il portatile militarizzato, diventa la mano mobile — lo porto i`,
  },
  {
    id: "EP_AUTO_48",
    title: "n8n self-hosted attivo (account locale, no cloud) ",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "## COLD OPEN  La porta 5173 l'avevo aperta solo verso i nodi che conosco per nome. Il passo successivo era dare a quei nodi qualcosa di concreto da f",
    content: `
## COLD OPEN

La porta 5173 l'avevo aperta solo verso i nodi che conosco per nome. Il passo successivo era dare a quei nodi qualcosa di concreto da fare — un'officina vera, non un foglio di calcolo. Il 3 giugno ho installato quell'officina.

---

## ATTO I — Il costo dell'affitto che non vedi

Prima di spiegarti cosa ho fatto, ti dico cosa avevo di fronte.

n8n è lo strumento che fa girare EVA — il sistema di automazione che gestisce i flussi di Vita Natura, coordina gli agenti AI del sistema, connette l'API server che gira su localhost:5001 con la dashboard React su 5173, con il research agent v1.1 che sta girando sui nodi. Non è un accessorio. È la colonna vertebrale operativa di GENESIS, e GENESIS è al 70% — il che significa che ogni pezzo di infrastruttura che installo adesso è load-bearing. Non posso sbagliare il materiale.

La scelta era binaria: cloud o self-hosted.

Il cloud ha una sua logica. Zero manutenzione, pronto in cinque minuti, SSL gestito da altri, uptime monitorato da altri. Se sei un consulente che deve dimostrare qualcosa a un cliente entro venerdì, ha senso. Ma io non sono un consulente. Sono un artigiano che costruisce un sistema che deve girare mentre la fr`,
  },
  {
    id: "EP_AUTO_49",
    title: "Vista METODO sul sito — spiegazione chi/cosa/come ",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "# IL SISTEMA — Episodio: \"La Vista METODO\"  ---  ## COLD OPEN  La settimana scorsa ti ho lasciato con una frase su n8n e sui punti singoli di guasto.",
    content: `
# IL SISTEMA — Episodio: "La Vista METODO"

---

## COLD OPEN

La settimana scorsa ti ho lasciato con una frase su n8n e sui punti singoli di guasto. L'idea era semplice: un sistema che aspetta che tu lo accenda ogni mattina non è un sistema, è un'abitudine cara. Bene. Quella conversazione ha aperto una porta che non mi aspettavo, e quello che è entrato dalla porta è stato un dev Flutter con domande serie.

---

## ATTO I — Quando qualcuno dall'esterno ti guarda dentro

Il tre giugno del 2026 ho fatto una cosa insolita: ho lasciato Claude — il mio layer AI che chiamo THEMIS quando lavora sul codice — in compagnia di un amico. Sviluppatore, lavora in Flutter e Dart, fa backend e migrazioni. Uno che di architetture se ne intende. Non uno che fa domande per cortesia. Uno che fa domande per smontarti.

La sua prima reazione, mentre scorreva la struttura di TITANIUM_OS, è stata diretta: «lo state facendo in modo non convenzionale». Non era un complimento con punto interrogativo. Era una constatazione. E io capisco cosa intendeva, perché TITANIUM_OS non nasce da un libro di testo. Nasce da un'officina, da una fresatrice CNC che chiamo V32 e che in questo momento è al sessantacinque perc`,
  },
  {
    id: "EP_AUTO_50",
    title: "Automazioni notturne portabili: _ti_paths.bat (res",
    sottotitolo: "Milestone verificato · auto-generato",
    stagione: "AUTO",
    stagione_label: "Generato",
    data_evento: "2026-06-03",
    tags: ["auto_generato", "milestone"],
    status: "ready",
    durata_min: 8,
    preview: "## COLD OPEN  La scorsa volta ho detto che un sistema che non sai spiegare in trenta secondi esiste solo nella tua testa. Bene. Adesso vi racconto co",
    content: `
## COLD OPEN

La scorsa volta ho detto che un sistema che non sai spiegare in trenta secondi esiste solo nella tua testa. Bene. Adesso vi racconto cosa succede quando quel sistema impara a lavorare anche mentre dormi — e soprattutto, come ci si assicura che lo faccia senza che tu debba essere lì a tenere la mano.

---

## ATTO I — Il problema dei sistemi che dormono con te

Facciamo un passo indietro. Il tre giugno duemilaventisei mi trovo con una situazione che conosco bene: ho costruito cose che funzionano, ma funzionano quando ci sono io. STORY_AGENT è attivo, versione uno punto zero, il file è \`NODES/STORY_AGENT/story_agent.py\`, il cron gira a mezzanotte. NIGHT_PUSH è attivo, \`AUTOMATIONS/core/night_push.bat\`, cron alle quattro e sette di mattina. Il RAG graph è a centoquattordici nodi e duecentodiciotto archi. Il watchdog controlla i processi in parallelo via threading.

Su carta: tutto funziona. Nella realtà: dipende da dove ti trovi.

Il problema nasce dalla migrazione. L'ho documentata in archivio — giugno duemilaventisei, migrazione verso il PC fisso in taverna, quello con la GPU 1070 Ti, il cervello ventiquattro su ventiquattro. Il Getac diventa mobile, si collega via Ta`,
  },
  // AUTO_GENERATED_END
];
