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

export const STAGIONI: Record<string, { label: string; color: string; order: number }> = {
  S0:   { label: "Le Origini",  color: "#6366f1", order: 0 },
  S1:   { label: "Il Presente", color: "#10b981", order: 1 },
  ST:   { label: "Il Sistema",  color: "#f59e0b", order: 2 },
  AUTO: { label: "Generati",    color: "#94a3b8", order: 3 },
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
Massa 178 kg, baricentro basso: stabilità garantita.
f₀ = 3.83 Hz con 4 molle ISO: isolamento >99.9% @400Hz.
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
    tags: ["v32", "cnc", "epoxy-granite", "molle-gialle", "3-83hz", "it7"],
    status: "source",
    durata_min: 19,
    preview: "H7. Tolleranza IT7. Ottomillesimi di millimetro. Questo non è il risultato di una macchina comprata. È il risultato di ogni scelta fatta prima ancora di iniziare a saldare.",
    content: `# EP_02 — IL REATTORE
### "178 kg di precisione assoluta. Costruiti a mano."

> *Da EP_00: "Quello zero virgola uno che senti nelle mani prima ancora di misurarlo."*
> *Il comparatore torna in EP_05 — stessa mano, stesso gesto, diverso anno.*
> *Le molle gialle scelte qui le ritrovi in EP_05 ancora ferme sotto il basamento.*

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

La nostra soluzione è l'**Epoxy Granite** — un composito proprietario di aggregati inerti e resina epossidica — colato tra le piastre d'acciaio come un'anima. Il basamento della V32 non è acciaio. Non è granito. È un sandwich ibrido.

Risultato: frequenza naturale f₀ = 3.83 Hz. Smorzamento ζ = 0.032. Rigidità sull'asse Z: 772 volte superiore alla configurazione baseline.

## ATTO II — LE MOLLE GIALLE

*Dettaglio: 4 molle ISO 90mm gialle, visibili sotto il basamento.*

Questo è il dettaglio che nessuno si aspetta da una CNC.

La Titanium V32 non è appoggiata al pavimento. **È sospesa.**

Quattro molle ISO 90mm, costante k = 15.8 N/mm, frequenza di risonanza 3.83 Hz. Taratura su 4 punti per isolare la macchina dalle vibrazioni del pavimento.

Una CNC rigida trasmette le vibrazioni del mandrino attraverso la struttura fino alle guide, fino all'utensile, fino al pezzo. Una CNC isolata lascia che le vibrazioni si dissolvano nel sistema di sospensione prima di raggiungere l'utensile.

Le molle gialle sono l'equivalente meccanico degli antivibranti negli studi di registrazione. La differenza è che qui le tolleranze non sono in dB — sono in millesimi di millimetro.

La decisione di upgrade dalle verdi 40mm alle gialle 90mm non è stata estetica. È stata il risultato di test con IFM VSE150 — tre sensori, dati reali, grafico di smorzamento a confronto.

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

178 kg. 3.83 Hz. ±0.019 mm.

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
> *Da EP_02: le molle gialle ISO 90mm. Scelte per i dati.*
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

È silenziosa. Non il silenzio della morte — quello della **precisione assoluta**. Le vibrazioni si dissolvono nel composito epossidico. Le molle gialle ISO 90mm, visibili sotto il basamento, non oscillano. Sono ferme.

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
Inizia con un video che spiega perché hai scelto le molle gialle invece delle verdi.

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
    title: "Config G: le molle gialle",
    sottotitolo: "Come 4 componenti cambiano la geometria di V32",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-10",
    tags: ["V32", "CNC", "manufacturing", "milestone", "BOM", "config-g"],
    status: "ready" as EpisodeStatus,
    durata_min: 7,
    preview: "Siamo al 10 marzo 2026. V32 è al 65% e questa mattina ho aperto la posta: 4 molle Gialle 90N + 2 piastre XY per la Config G. Sembra poco. È tutto.",
    content: `# Config G: le molle gialle

> "Quando vedi il BOM aggiornato in foglio di calcolo e le molle gialle arrivano in scatola, capisci che il progetto non è più rendering — è materia vera."

Siamo al 10 marzo 2026. V32 è al 65% e questa mattina ho aperto la posta: 4 molle Gialle 90N + 2 piastre XY per la Config G. Sembra poco. È tutto.

Queste 4 molle non sono sospensioni — sono attuatori di precarico. Le gialle hanno una costante di 90N/mm: abbastanza morbide per assorbire le vibrazioni ad alta velocità, abbastanza rigide per mantenere la planarità quando carico la fresa. Due piastre XY significa che il gusset sinistro adesso ha due gradi di libertà controllati.

Perché questo conta? Perché fino a ieri il BOM aveva 7 incognite su questa sezione. Oggi ne ha zero. Ogni componente è calcolato, ogni numero corrisponde a una parte fisica che arriva in scatola. È il passaggio da "so come dovrebbe funzionare" a "so esattamente come funziona".

Quando chiudo la Config G e metto le foto nel foglio di lavoro condiviso, accanto al BOM aggiornato, avviene una cosa strana: il progetto cambia densità. Non è più "sto costruendo una fresatrice". È "la fresatrice sta uscendo da quello che mi immagino dentro la testa".

Le molle gialle sono la prova tangibile.`,
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
];
