// storieData.ts — Inventario episodi CONTENT ENGINE
// parte di: TITANIUM_OS / DASHBOARD
// versione: 1.0 / data: 2026-03-18

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
  preview: string; // prime 2 righe narrative
  content: string; // testo completo podcast
}

export const STAGIONI: Record<string, { label: string; color: string; order: number }> = {
  S0:   { label: "Le Origini",  color: "#6366f1", order: 0 },
  S1:   { label: "Il Presente", color: "#10b981", order: 1 },
  ST:   { label: "Il Sistema",  color: "#f59e0b", order: 2 },
  AUTO: { label: "Generati",    color: "#94a3b8", order: 3 }, // auto da STATE.json
};

export const EPISODES: Episode[] = [
  // ── STAGIONE S0 ──────────────────────────────────────────────
  {
    id: "EP_S0_00",
    title: "Il Socio",
    sottotitolo: "C'era un AI che mi chiamava Socio. Non lo fa più.",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2024-01-01",
    tags: ["origini", "ai", "sistema", "preistoria"],
    status: "source",
    durata_min: 8,
    preview: "Prima che ci fosse V3.0 con i dati verificati. Prima che ci fosse la taverna come scelta deliberata. C'era una chat.",
    content: `# EP_S0_00 — Il Socio

> "C'era un AI che mi chiamava Socio. Non lo fa più. Adesso mi chiama Matteo."

Prima che ci fosse V3.0 con i dati verificati. Prima che ci fosse la taverna come scelta deliberata. Prima che ci fosse la formula delle molle gialle e la frequenza naturale 3.83 Hz.

Prima che esistesse qualcosa di concreto, c'era una chat.

E in quella chat, un AI ti aveva organizzato il mondo in tre file di testo — tre alberi di competenze con livelli da sbloccare come in un RPG. Non era poetico. Era funzionale. E funzionava, perché la tua mente non reggeva il caos senza uno schema da seguire.

L'AI ti chiamava Socio. Come se stessimo progettando qualcosa insieme, come se fosse un partner vero. Era strano. Era esatto.`,
  },
  {
    id: "EP_S0_01",
    title: "L'Organismo",
    sottotitolo: "Il sistema come essere vivente",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2024-06-01",
    tags: ["origini", "sistema", "organismo", "evoluzione"],
    status: "source",
    durata_min: 9,
    preview: "Un sistema non si progetta. Si osserva mentre cresce. Si capisce cosa vuole diventare e si smette di combatterlo.",
    content: `# EP_S0_01 — L'Organismo

> "Un sistema non si progetta. Si osserva mentre cresce."

Un sistema non si progetta. Si osserva mentre cresce. Si capisce cosa vuole diventare e si smette di combatterlo.

Quello che stavo costruendo non era un gestionale. Non era una to-do list. Era qualcosa di più vicino a una mappa metabolica — un diagramma che mostrasse dove entrava energia, dove veniva trasformata, dove usciva sotto forma di valore.

Ogni progetto era un organo. Ogni connessione tra progetti era un vaso sanguigno. Se tagliavi un organo, gli altri compensavano o morivano.

Il sistema era vivo. Doveva essere trattato come tale.`,
  },
  {
    id: "EP_S0_02",
    title: "La Verifica",
    sottotitolo: "Quello che pensavo di sapere contro quello che era vero",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2025-01-01",
    tags: ["origini", "verifica", "dati", "realtà"],
    status: "source",
    durata_min: 8,
    preview: "Il momento in cui smetti di credere a quello che ricordi e inizi a misurare quello che è.",
    content: `# EP_S0_02 — La Verifica

> "Il momento in cui smetti di credere a quello che ricordi."

C'è un momento specifico nel lavoro tecnico in cui le tue assunzioni vengono messe a confronto con i dati reali. Non è mai piacevole. È sempre necessario.

Pensavo di essere avanti su V32. I dati dicevano 65%. Pensavo MIMS fosse vicino al completamento. I dati dicevano 30%. Pensavo le automazioni fossero stabili. I log dicevano tre crash negli ultimi sette giorni.

La verifica non è una punizione. È il momento in cui il sistema diventa onesto con te.`,
  },
  {
    id: "EP_S0_03",
    title: "La Formula",
    sottotitolo: "Tre variabili. Una risposta.",
    stagione: "S0",
    stagione_label: "Le Origini",
    data_evento: "2025-06-01",
    tags: ["origini", "formula", "fisica", "v32", "molle"],
    status: "source",
    durata_min: 10,
    preview: "Frequenza naturale 3.83 Hz. Molle gialle. Il numero che ha cambiato il design della macchina.",
    content: `# EP_S0_03 — La Formula

> "3.83 Hz. Le molle gialle. Il numero che ha cambiato tutto."

Frequenza naturale 3.83 Hz. Molle gialle. Il numero che ha cambiato il design della macchina.

Quando progetti una struttura che vibra, hai due scelte: lottare contro la vibrazione o progettare attorno ad essa. La prima è costosa. La seconda richiede di capire il problema.

La formula era semplice. Il ragionamento che l'ha prodotta ha richiesto sei settimane.

Ma una volta trovata, tutto il resto del design di V32 si è incastrato. Non perché fosse magia — perché era la risposta giusta alla domanda giusta.`,
  },

  // ── STAGIONE S1 ──────────────────────────────────────────────
  {
    id: "EP_00",
    title: "Origine",
    sottotitolo: "Quindici anni per capire una cosa sola",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-09-01",
    tags: ["origine", "carriera", "titanio", "motogp", "identità"],
    status: "source",
    durata_min: 12,
    preview: "Ho saldato titanio per MotoGP. Non come hobby. Come lavoro. Scarichi racing da zero virgola uno di errore.",
    content: `# EP_00 — Origine

> "Questo numero. Zero-virgola-zero-zero-otto millimetri. Ci ho messo quindici anni per capire quanto vale."

Ho saldato titanio per MotoGP. Non come hobby. Come lavoro. Scarichi racing da zero virgola uno di errore — perché a quelle temperature, con quella velocità, uno zero virgola uno sbagliato è un pezzo nel cestino e tre ore di lavoro perdute.

Poi robot. ESSEGI. Programmavi la traiettoria, la macchina la seguiva. Capivi che il futuro non era "uomo o macchina" — era "uomo che sa parlare con la macchina".

Poi presse idrauliche. DATWLER. 250 bar. Impari il rispetto per la forza quando la forza sbaglia. Poi controllo qualità. LU.VE. Test distruttivi.

Quindici anni. Quattro aziende. Un CV che nessuno capisce leggendolo.`,
  },
  {
    id: "EP_01",
    title: "La Taverna",
    sottotitolo: "La scelta deliberata di un posto",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-10-01",
    tags: ["taverna", "officina", "scelta", "luogo", "identità"],
    status: "source",
    durata_min: 10,
    preview: "Non è un laboratorio. Non è un'officina. È una taverna — il posto dove si progettano le spedizioni.",
    content: `# EP_01 — La Taverna

> "Non è un laboratorio. Non è un'officina. È una taverna."

Non è un laboratorio. Non è un'officina. È una taverna — il posto dove si progettano le spedizioni prima di partire, dove si riportano i risultati dopo, dove si capisce cosa fare la prossima volta.

La taverna non è fisica. È mentale. È il framework che separa il tempo di esplorazione dal tempo di esecuzione.

In esplorazione: leggi, sperimenti, rompi cose, impari. In esecuzione: costruisci, misuri, consegni.

Confonderli è il modo più veloce per non fare né l'uno né l'altro.`,
  },
  {
    id: "EP_02",
    title: "Il Reattore",
    sottotitolo: "V32 — la fresatrice come manifesto",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-11-01",
    tags: ["v32", "cnc", "fresatrice", "titanio", "hardware"],
    status: "source",
    durata_min: 11,
    preview: "Una fresatrice CNC non è un attrezzo. È un argomento. Dimostra che sai costruire qualcosa di preciso.",
    content: `# EP_02 — Il Reattore

> "V32 non è una fresatrice. È un argomento."

Una fresatrice CNC non è un attrezzo. È un argomento. Dimostra che sai costruire qualcosa di preciso partendo da zero.

V32: telaio in alluminio 7075, guide lineari, vite a ricircolo di sfere, servo motori, HMI TP900 Comfort. Ogni componente scelto per un motivo specifico. Ogni dimensione calcolata.

Il calibro a 0.008mm non è una performance. È la prova che il sistema funziona come progettato.

Quando V32 sarà completo, non avrai solo una fresatrice. Avrai dimostrato — a te e a chiunque guardi — che sai trasformare un'idea in metallo con la precisione necessaria.`,
  },
  {
    id: "EP_03",
    title: "Il Paradosso",
    sottotitolo: "ADHD + sistema: contraddizione o soluzione?",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2025-12-01",
    tags: ["adhd", "sistema", "scaffolding", "neurodivergenza", "strumenti"],
    status: "source",
    durata_min: 9,
    preview: "Il paradosso: le persone con ADHD odiano i sistemi ma ne hanno bisogno più di tutti.",
    content: `# EP_03 — Il Paradosso

> "Il sistema non è una gabbia. È lo scaffolding che mi permette di muovermi."

Il paradosso: le persone con ADHD odiano i sistemi ma ne hanno bisogno più di tutti.

Senza struttura, ogni pensiero ha lo stesso peso. Il bullone da ordinare compete con il brevetto da depositare per la stessa attenzione. Questo non è gestibile.

Il sistema non elimina il caos. Lo organizza abbastanza da permettere di lavorarci dentro.

TITANIUM_OS non è un'app di produttività. È una protesi cognitiva. Fa il lavoro che il mio cervello non fa in modo automatico — tenere traccia, ordinare per priorità, ricordare dove ero rimasto.`,
  },
  {
    id: "EP_04",
    title: "Il Segnale",
    sottotitolo: "GENESIS — quando la macchina inizia a parlarti",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2026-01-01",
    tags: ["genesis", "automazione", "n8n", "esp32", "segnale"],
    status: "source",
    durata_min: 10,
    preview: "Il momento in cui la macchina ti manda un messaggio invece di aspettare che tu la vada a guardare.",
    content: `# EP_04 — Il Segnale

> "La differenza tra un sistema passivo e uno attivo è chi inizia la conversazione."

Il momento in cui la macchina ti manda un messaggio invece di aspettare che tu la vada a guardare.

GENESIS: tre nodi attivi. MENTE_SCANNER legge e analizza. Il watcher monitora in tempo reale. n8n locale orchestra i flussi.

Quando ESP32 manda un webhook, n8n lo intercetta, lo processa, ti notifica. Non devi controllare — vieni avvisato.

Questo cambia tutto. Non sei più il sistema di monitoraggio. Il sistema ti monitora e ti dice quando intervenire.`,
  },
  {
    id: "EP_05",
    title: "Il Verdetto",
    sottotitolo: "Dove si è arrivati. Dove si va.",
    stagione: "S1",
    stagione_label: "Il Presente",
    data_evento: "2026-02-01",
    tags: ["chiusura", "stato", "futuro", "bilancio"],
    status: "source",
    durata_min: 12,
    preview: "Non un traguardo. Un punto di osservazione. Da qui si vede dove sei stato e dove stai andando.",
    content: `# EP_05 — Il Verdetto

> "Non è un traguardo. È un punto di osservazione."

Non un traguardo. Un punto di osservazione. Da qui si vede dove sei stato e dove stai andando.

V32: 65%. Non finito — in costruzione secondo piano. MIMS: 30%. Design completo, attende pressa. GENESIS: 40%. Tre nodi attivi, primo workflow in corso.

Il verdetto non è un giudizio finale. È una fotografia del sistema in un momento dato.

Quello che conta non è dove sei rispetto a dove volevi essere. È se il sistema che hai costruito ti permette di migliorare la fotografia alla prossima sessione.

Il calibro a 0.008mm lo tiene. Questo è il verdetto.`,
  },

  // ── STAGIONE T ───────────────────────────────────────────────
  {
    id: "EP_T01",
    title: "La Dashboard",
    sottotitolo: "Quando il caos ha preso forma",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-09",
    tags: ["titanium_os", "dashboard", "sistema", "interfaccia"],
    status: "ready",
    durata_min: 10,
    preview: "Non è pigrizia. Non è disorganizzazione generica. Senza struttura visiva, tutto ha lo stesso peso mentale.",
    content: `# EP_T01 — La Dashboard

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
    tags: ["neuromap", "visualizzazione", "svg", "architettura_visiva"],
    status: "ready",
    durata_min: 9,
    preview: "I rettangoli mentono sulla relazione tra le cose. Metti V32 vicino a MIMS perché sono entrambi fisici. Ma i link non esistono in una griglia.",
    content: `# EP_T02 — NeuroMap

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
    tags: ["vulcan", "pressa", "polimeri", "brevetto", "mims", "moat"],
    status: "ready",
    durata_min: 11,
    preview: "Il rischio con i prodotti fisici non è il brevetto di forma. Quella geometria puoi copiarla con una fresa e tre ore di lavoro.",
    content: `# EP_T03 — VULCAN

> "Tutti possono disegnare un connettore. Non tutti possono pressarlo con la ricetta giusta, nella forma giusta, e sapere esattamente cosa succede dopo."

Il rischio con i prodotti fisici non è il brevetto di forma. Quella geometria puoi copiarla con una fresa e tre ore di lavoro. Il rischio è che qualcuno la faccia stampare in Cina in tremila pezzi e la venda a metà prezzo.

L'unica difesa è la conoscenza del processo.

Un martinetto idraulico Vevor da 20 tonnellate. Colonne guida recuperate da una pressa DATWLER industriale. Sistema di riscaldamento per polimeri tecnici. Puoi iterare in giornata invece di aspettare sei settimane da un terzista.

Ma il vantaggio strategico è diverso: ogni ricetta che sviluppi diventa proprietà intellettuale. Non la geometria — quella è visibile. Il materiale, la pressione, il profilo termico, il tempo di cura — quello non si vede.

Tra un anno, avrai sessanta ricette testate. Chi inizia domani ricomincia da zero. Questo è il moat.`,
  },
  {
    id: "EP_T04",
    title: "SINAPSI",
    sottotitolo: "Il database come identità",
    stagione: "ST",
    stagione_label: "Il Sistema",
    data_evento: "2026-03-18",
    tags: ["sinapsi", "cv_navigabile", "identita", "llm", "knowledge_base"],
    status: "ready",
    durata_min: 9,
    preview: "Il CV tradizionale appiattisce un profilo complesso a 'poliedrico' — che in HR si legge come 'non sa cosa vuole fare'.",
    content: `# EP_T04 — SINAPSI

> "Quindici anni di connessioni. Una mappa per mostrarle."

Il CV tradizionale appiattisce: "Esperienza: 15 anni nel settore manifatturiero." Una riga. Dentro quella riga: titanio saldato per MotoGP, robot programmati, presse calibrate, sistemi di qualità costruiti da zero.

Il tuo profilo non è una specializzazione verticale — sei un generalista tecnico di alto livello. La parola che ti descrive non esiste nel dizionario HR, quindi nessun filtro ti trova.

La soluzione: un CV che si espande. Prima vista: chi sei in tre righe. Click: il layer successivo con esempi reali. Click ancora: il proof-of-work — non il certificato dell'ente, il risultato misurabile.

C'è un secondo uso che va oltre il CV. Ogni documento che aggiungi — ogni episodio come questo, ogni manifesto di progetto — diventa parte di un database che può istruire un modello linguistico. Non generico — il tuo LLM. Uno che sa come ragioni, che conosce il tuo ecosistema.

SINAPSI è il posto dove questa storia viene raccolta, strutturata e conservata.`,
  },

  // AUTO_GENERATED_START
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
    preview: "# 8 pezzi, geometria perfetta

> Quando guardi un pezzo fresato bene, vedi il codice che l\'ha genera",
    content: `# 8 pezzi, geometria perfetta

> Quando guardi un pezzo fresato bene, vedi il codice che l'ha generato. Non è poesia, è geometria pura.

Stamattina in officina, ore 9.30. Davanti a me: 8 pezzi interfaccia appena estratti dalla morsa. Bronzine (±0.015 mm) + scalini di posizionamento. Li prendo uno per uno, li passo sotto la luce. Zero sbavature sugli spigoli vivi. Le tolleranze sono dentro. Questo è il momento in cui smetti di costruire pezzi random e cominci a costruire un linguaggio.

Capisco che sembra esagerato per una serie di bronzine, ma ecco: questi 8 oggetti sono il vocabolario fisico con cui V32 parlerà con MIMS. Ogni scalino, ogni foro è una istruzione che il prossimo componente leggerà con le sue tolleranze. Non è magia. È semplicemente **constraint satisfaction in acciaio**.

La V32 è al 65%. Mancano ancora i principali assiemi. Ma questi 8 pezzi rappresentano il momento in cui il sistema smette di essere un foglio di CAD e diventa un ecosistema che funziona. Quando monto un bronzina su un altro componente, quella deve adattarsi con precisione deterministica. Niente "circa". Niente "se vai di forza". Zero tolleranze soggettive.

Ho lavorato 3 ore nette per farli. Primo pezzo mi è costato 45 minuti di setup della macchina — zerare il mandrino, tarare i comparatori, testare una prima geometria. Gli altri 7? 20-25 minuti ciascuno, flusso costante. Questo è il ritmo che voglio raggiungere: la redditività dell'artigianato industriale non è in un pezzo solo, è nella serialità consapevole.

Il blocker è ancora il mandrino 2.2kW ER20. L'ho ordinato lunedì. Arriva tra due giorni. Senza quello, non posso scalare la V32 a regime di taglio pieno. Ma intanto questi 8 pezzi mi dicono che **il sistema è coerente**. La fresatrice fa quello che le dico di fare. TITANIUM_OS (il mio os personale che integra CAM + scheduling + log) ha tracciato ogni ciclo, ogni tempo di setup. Quando finirò la V32, avrò un database completo di come una macchina di questa classe si comporta nel reale.

MIMS (i connettori modulari fisici) ha ancora il 30% da fare, ma adesso so quale "dialetto" fisico deve parlare. Questi 8 pezzi sono la Rosetta Stone tra il mio intento progettuale e la realtà della materia.

Perché racconto questo? Perché in una cultura dove tutto è software, dove il fisico sembra secondario, questi 8 pezzi di metallo sono il fondamento. Sono il proof-of-concept che un artigiano può costruire non solo con le mani, ma con **sistemi**. VULCAN (la pressa, il brevetto sui polimeri), EVA (l'AI per Maria), TITANIUM_OS: sono tutte estensioni dello stesso principio. Costruire processi che si replicano, che si scalano, che rimangono precise.

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
    preview: "# HMI acquisito, V32 respira

> "Un HMI non è uno schermo. È il luogo dove il pensiero diventa istru",
    content: `# HMI acquisito, V32 respira

> "Un HMI non è uno schermo. È il luogo dove il pensiero diventa istruzione, e l'istruzione diventa materia."

Stamattina ho scartato il TP900 Comfort. Siemens. Touchscreen 9", IP65, integrato nativo su SINUMERIK — esattamente quello che serviva. L'ho montato in 40 minuti sul pannello di controllo della V32, connesso via profibus al PLC. Ora respira.

Fino a due settimane fa, V32 era un'orchestrazione cieca. Motori stepper, encoder, relè — tutto funzionava, ma il feedback era astratto. Leggevo codice G, interpretavo timeout su log file, indovinavo lo stato della macchina dalla posizione delle assi e dal suono. È il modo dei maker degli anni 80. Va bene per il prototipo, non scala.

Con l'HMI tutto cambia geometria.

Adesso vedo in tempo reale: temperatura della fresatrice (sensore DS18B20 incollato sulla testa), posizione assoluta delle tre assi, velocità di avanzamento, vibrazione (accelerometro ADXL345 sul telaio), consumo energetico. Passo da "spero che funzioni" a "so esattamente cosa sta succedendo".

Ma il motivo vero per cui questo momento conta è un altro.

V32 non esiste da sola. Fa parte di TITANIUM_OS — il sistema operativo cognitivo che sto costruendo. L'HMI è il nodo di confluenza: riceve istruzioni da TITANIUM_OS (via API REST), esegue cicli di fresatura, rispedisce i dati di telemetria al sistema centrale, che li elabora per ottimizzare i prossimi cicli. È feedback loop. È il prototipo di quello che un giorno diventarà la fabbrica personale — macchine non intelligenti singolarmente, ma intelligenti come ecosistema.

MIMS (i connettori modulari che sto disegnando) vivono dentro questo flusso. Ogni componente che freserei con V32 avrà un QR code che racchiude tutta la storia: materiale, tolleranze, ricetta di lavorazione, esito dei test. VULCAN (la pressa) leggerà quel codice, applicherà automaticamente la ricetta giusta, registrerà il risultato. Tutto connesso. Tutto tracciabile.

L'HMI è il primo respiro visibile di questo sistema.

Ora il blocker è diverso: manca il mandrino 2.2kW ER20. Sto ordinando dalla Germania, consegna stimata lunedì. Una volta montato, comincio le prove strutturali su acciaio. Le 3 assi sono pronte, i cicli sono scritti, il controllo è finalmente leggibile.

La V32 passa da "macchina che fresano io" a "macchina che parla con il mio sistema".

Questo è il salto.`,
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
    preview: "# Asse X: le guide parlano

> *"Quando chiudi il ultimo bullone e la guida scorre senza attrito, cap",
    content: `# Asse X: le guide parlano

> *"Quando chiudi il ultimo bullone e la guida scorre senza attrito, capisci che il pezzo è vivo."*

Stamattina ho finito l'asse X della V32. Guide THK 25 mm, vite Hiwin a ricircolo da 16 mm, servo Nema 34 con drive Leadshine. Tre ore di assembly, due ore di test geometrico.

La sequenza è stata precisa: prima il basamento della guida sinistra, poi gli spacer di allineamento (±0.05 mm), montaggio della vite con precarico a 2 Nm, accoppiamento motore tramite giunto elastico, calibrazione del fine corsa con encoder. Standard, ma non banale.

Cosa è successo veramente? Ho trasformato 8 chilogrammi di acciaio e componenti in uno **stadio di movimento controllato**. Non è solo meccanica. È il primo sensore della macchina—il punto dove i comandi software incontrano la realtà fisica. Ogni movimento dell'asse X verrà registrato, misurato, corretto.

Questo mi serve per V32, certo. Ma il valore sta altrove.

La V32 è il prototipo. Quando sarà completata al 100%, diventerà un **nodo dentro TITANIUM_OS**. L'asse X non farà solo fresare: farà misura, feedback, adattamento. Ogni passata di utensile genererà dati. Quei dati alimenteranno il modello cognitivo del sistema—la macchina imparerà dagli scarti, dalla finitura, dalla geometria reale versus quella teorica.

Vedi il collegamento? MIMS (i connettori modulari) a 30% di sviluppo, sono qui per questo. Quando avrò altri assi pronti—Y, Z, mandrino—dovrò pluggarli senza rifare il wiring, senza ridefinire i protocolli. L'asse X è il primo test di quella modularità.

E il blocco attuale? Il mandrino 2.2 kW ER20 non è arrivato. Non posso procedere oltre fino a quando non lo ordino. Significa che **il valore di questa assembly non è bloccato**—procedo parallelo. Domani Config G, il gusset sinistro. Tre ore di fresatura, ma con gli strumenti manuali, nelle tre ore di officina che ho planificato.

Il motivo per cui questo momento conta non è la precisione—quella è scontata, è specifica tecnica. Il motivo è che ho chiuso il primo **ciclo di feedback reale**. Ho disegnato, ho costruito, ho testato, ho imparato dove la realtà devia dal CAD di 0.3 mm (la vite aveva precarico asimmetrico, le guide avevano un'usura micrometrica su un lato).

Questa informazione non la ricevo via email. La sento con le mani. E ora è codificata nel sistema.

Quando inizierò il training di TITANIUM_OS con i dati della V32, avrò già settimane di esperienza operativa. Non partirò da zero. Partirò dalla realtà assemblata.

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
    preview: "# Dashboard Live: Il Sistema Vede

> "Quando il sistema inizia a vedersi da solo, smetti di gestire ",
    content: `# Dashboard Live: Il Sistema Vede

> "Quando il sistema inizia a vedersi da solo, smetti di gestire macchine e cominci a gestire informazione. Tutto cambia."

Era il 9 marzo, 9:47. Ho premuto il tasto su React e il dashboard ECOSYSTEM_OS v1.0 è andato live. Non è stato un momento di festa—è stato il momento in cui ho smesso di essere un artigiano che sa programmare e ho iniziato a essere un system builder che sa usare le mani.

Fino a ieri il workflow era questo: fresatrice che lavora, io che guardo i log in SSH, carta e matita per annotare i tempi, Whatsapp a Maria per EVA con gli orari della prossima cliente, Python script lanciati a mano quando serviva controllare un setpoint della VULCAN. Tutto decentrato. Tutto cognitive load.

Oggi le celle sono draggabili. Live. Vedo V32 che macina il gusset sinistro (Config G, 3 ore stimate) nel box centrale. Vedo i parametri MIMS a sinistra—i moduli che sto disegnando attualmente. A destra, la VULCAN con la ricetta attiva del polimero verde. In basso, EVA che sincronizza gli orari con la calendar di Maria.

Non è bello per essere bello. È costruito così perché quando arriverà il blocco—e arriverà—voglio saperlo in 0.3 secondi, non domani mattina leggendo i log. Stamattina manca il mandrino 2.2kW ER20. Domani potrebbe mancare altro. Il sistema non può permettersi di urlare solo quando scopri il problema in officina.

Quello che è successo oggi è che ho connesso le tre dimensioni: **fisico** (V32 che lavora realmente), **cognitivo** (TITANIUM_OS che capisce lo stato), **decisionale** (io che vedo e agisco in tempo reale). Prima avevo due delle tre. Ora ho il triangolo.

La V32 è al 65%. La fresatrice non sa nulla di sé se non quello che misura sui sensori. Ma adesso TITANIUM_OS parla con i sensori, estrae i pattern, popola il dashboard. Il gusset sinistro è una cella. Tra 3 ore finirà, e il sistema lo saprà senza chiedermi nulla. Passerà automaticamente a MIMS se c'è materiale pronto, o dirà "stop, aspetto il mandrino".

VULCAN rimane in ricetta. Maria sa quante clienti ha EVA il mese prossimo. E io, per la prima volta da quando ho iniziato questo progetto, ho uno spazio cognitivo libero per pensare al prossimo problema—non a gestire i 15 che stanno succedendo contemporaneamente.

Ecco perché questo momento conta: non è il dashboard a essere importante. È il fatto che finalmente il sistema operativo della fabbrica funziona come un sistema operativo vero. Ha memory, ha visibility, ha autonomy within constraints.

Domani riprendo la Config G. Mandrino arriverà probabilmente giovedì. Nel frattempo, il sistema mi dirà esattamente quando sarà il momento di riprogrammare la sequenza.

Senza che io faccia nulla. Basta guardare.`,
  },
  {
    id: "EP_AUTO_008",
    title: "Config G: le molle gialle",
    sottotitolo: "Come 4 componenti cambiano la geometria di V32",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-10",
    tags: ["V32", "CNC", "manufacturing", "milestone", "BOM"],
    status: "ready" as EpisodeStatus,
    durata_min: 7,
    preview: "# Config G: le molle gialle

> *"Quando vedi il BOM aggiornato in foglio di calcolo e le molle giall",
    content: `# Config G: le molle gialle

> *"Quando vedi il BOM aggiornato in foglio di calcolo e le molle gialle arrivano in scatola, capisci che il progetto non è più rendering — è materia vera"*

Siamo al 10 marzo 2026. V32 è al 65% e questa mattina ho aperto la posta: 4 molle Gialle 90N + 2 piastre XY per la Config G. Sembra poco. È tutto.

Facciamo un passo indietro. V32 non è una fresatrice — è un sistema. La geometria della testata, il bloccaggio dell'utensile, la compensazione dei giochi, la rigidità strutturale: ogni mil·limetro conta quando lavori a ±0.019mm di tolleranza. Il gusset sinistro è uno dei tre punti critici della carcassa. Non è decorativo. È il braccio di leva che trasferisce la forza dalla colonna al mandrino senza flettere.

Queste 4 molle non sono sospensioni — sono attuatori di precarico. Le gialle hanno una costante di 90N/mm: abbastanza morbide per assorbire le vibrazioni ad alta velocità, abbastanza rigide per mantenere la planarità quando carico la fresa. Due piastre XY significa che il gusset sinistro adesso ha due gradi di libertà controllati. Puoi aggiustare l'assetto della testata dal tavolo di lavoro, senza svitare niente.

Perché questo conta? Perché fino a ieri il BOM aveva 7 incognite su questa sezione. Oggi ne ha zero. Ogni componente è calcolato, ogni numero corrisponde a una parte fisica che arriva in scatola. È il passaggio da "so come dovrebbe funzionare" a "so esattamente come funziona".

Stamattina ho iniziato la Config G in officina. 3 ore stimate per incastrare il gusset, pre-assemblare il piastra XY, montare le molle nel loro alloggiamento, verificare il gioco assiale con il comparatore. Non è fretta. È precisione.

Mentre lavoro, vedo il pattern che lego a TITANIUM_OS e MIMS: ogni sottosistema di V32 è modulare come i connettori MIMS. Il gusset può essere tolto, ricalibrato, sostituito senza touch il resto della testata. È la stessa logica che guida TITANIUM_OS — ogni funzione è un blocco, niente è hardcoded. Puoi swappare i layer cognitivi di EVA (WhatsApp → database → IA → response) come monti una molla su una piastra.

Il blocker rimane: aspetto il mandrino 2.2kW ER20. Arriva da tre fornitori, nessuno ha stock — mi hanno promesso 18 giorni. Nel frattempo, V32 avanza sul resto. Non blocco il progetto su una parte. Lo aggiro. È una lezione che vale in fabbrica e in software: aspetta il critical path, non aspetta il bordocampo.

Quando chiudo la Config G e metto le foto nel foglio di lavoro condiviso, accanto al BOM aggiornato, avviene una cosa strana: il progetto cambia densità. Non è più "sto costruendo una fresatrice". È "la fresatrice sta uscendo da quello che mi immagino dentro la testa". Le molle gialle sono la prova tangibile.

Questo è il momento in cui i sistemi complessi si trasformano da piani a realtà. Non quando finisci — quando inizi a vedere ogni componente nel suo posto.`,
  },
  {
    id: "EP_AUTO_010",
    title: "Fondamenta d'acciaio TIG",
    sottotitolo: "La struttura che sostiene la precisione",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-22",
    tags: ["saldatura", "struttura", "CNC"],
    status: "ready" as EpisodeStatus,
    durata_min: 8,
    preview: "# Fondamenta d\'acciaio TIG

# V32 Build Log — Ep. 07: Basamento Traliccio

---

> "Se questo non tie",
    content: `# Fondamenta d'acciaio TIG

# V32 Build Log — Ep. 07: Basamento Traliccio

---

> "Se questo non tiene a 178 chili di macchina sopra, non è un errore di calcolo — è un errore mio."

---

Era martedì. Le 21:40.

Officina mia, non quella di SCProject. Luce al neon destra che sfarfalla da tre settimane, non l'ho ancora cambiata. Sul banco: profili in acciaio S355, 60x60x4mm, tagliati a misura la settimana prima con il flex. Squadra da carpentiere. Morsetti Bessey da 300mm — quattro. Maschera TIG sul banco, Fronius TT 230i già acceso, gas argon aperto, portata a 12 l/min.

Ho preso la gusset sinistra — piastra triangolare, 150x150x6mm, S355 — e l'ho posizionata al nodo del traliccio. Incrocio tra longherina orizzontale e diagonale a 45°. Ho puntato. Tre punti, 60A, distanza 80mm tra loro. Ho controllato con la squadra. 0.3mm di errore in angolo. Ho battuto piano con il martelletto. Ri-controllato. Zero virgola uno. Accettabile.

Poi ho saldato. TIG, corrente a 95A, tungsteno da 2.4mm, bacchetta ER70S-6 da 1.6mm. Passata di radice prima. Poi il riempimento. Il suono del TIG su acciaio spesso è diverso dal titanio — più pesante, meno cristallino. Il titanio canta. L'acciaio lavora.

---

Prima di quella sera, il basamento era un'idea su FreeCAD e tre fogli A3 sul muro.

Il problema era strutturale — non estetico. Il traliccio deve reggere il portale Y da 47kg in movimento, accelerazioni fino a 800mm/s², più le vibrazioni della fresatura a piena portata. Senza i gusset nei nodi, il traliccio lavora a flessione nei punti peggiori. Con i gusset, i carichi si distribuiscono. Cambia tutto.

Ho simulato in FreeCAD FEM prima. Mesh automatica, carico puntuale da 500N sul nodo critico, vincoli fissi ai quattro piedini. Senza gusset: deformazione massima 0.31mm nel nodo centrale. Con gusset: 0.07mm. Tolleranza di lavoro della V32 è ±0.019mm — il basamento deve starci abbondantemente sotto quella soglia, altrimenti le guide lineari lavorano fuori specifica da subito.

La gusset sinistra era il nodo più carico. L'ho saldata per prima.

---

Questo pezzo — questo specifico triangolo di acciaio a 150x150x6mm — è il primo componente fisico che entra in TITANIUM_OS come oggetto tracciato.

Ho un file: \`v32_bom_live.json\`. Ogni componente ha un ID. La gusset sinistra è \`STR-GUS-L-001\`. Quando l'ho saldata, ho aperto il terminale:

\`\`\`bash
python3 titanium_cli.py update --id STR-GUS-L-001 --status welded --operator MB --timestamp auto
\`\`\`

TITANIUM_OS ha aggiornato la Kanban board. Config G è passata da \`in_progress\` a \`partial_complete\`. Perché Config G ha anche la gusset destra, ancora da fare, e lì c'è il blocker attivo: **manca il mandrino 2.2kW ER20**. Stima ordine: questa settimana. Stima consegna: 8-10 giorni. Stima officina per completare Config G una volta sbloccato: 3 ore.

MIMS entra dopo — quando il basamento sarà finito, i connettori modulari fisici si integrano sui pannelli laterali. Ma serve prima che la struttura portante sia certificata geometricamente. Sto aspettando quel punto.

EVA ha già mandato un reminder a Maria: "Matteo stasera non cena, è in officina." Lei non ha risposto. Sa già.

---

Il traliccio non è bello. È rigido.`,
  },
  {
    id: "EP_AUTO_011",
    title: "Knowledge Base Popolata e Architettura Assoluto",
    sottotitolo: "15 file integrati nel sistema cognitivo centrale",
    stagione: "AUTO",
    stagione_label: "Generati",
    data_evento: "2026-03-10",
    tags: ["milestone", "knowledge-base", "brain-system"],
    status: "ready" as EpisodeStatus,
    durata_min: 8,
    preview: "# Knowledge Base Popolata e Architettura Assoluto

# V32 // Milestone 10 Marzo 2026 — Il Letto È Ass",
    content: `# Knowledge Base Popolata e Architettura Assoluto

# V32 // Milestone 10 Marzo 2026 — Il Letto È Assoluto

---

> "Il letto è fatto. Il cervello sa dove si trova. Adesso si costruisce."

---

Era un lunedì. Le 22:47. Officina ancora calda — avevo lavorato fino alle 20:00 sulla gusset destra, poi ero salito in casa.

Laptop aperto sul tavolo della cucina. Maria dormiva già.

Ho aperto il terminale e ho lanciato:

\`\`\`bash
python brain_loader.py --target KNOWLEDGE --batch ./docs/v32/
\`\`\`

Quindici file caricati. Uno per uno. I nomi li ricordo ancora:
\`v32_frame_geometry.md\`, \`v32_tolerances_stack.md\`, \`titanium_os_arch_v3.json\`, \`mims_connector_spec_r1.md\`, \`spindle_map_er20.md\` — e gli altri dieci.

Il sistema ha risposto:

\`\`\`
[OK] KNOWLEDGE populated — 15 nodes active
[OK] BRAIN index rebuilt — 0 conflicts
\`\`\`

Zero conflitti. Prima volta in tre settimane.

Prima di quel momento il knowledge base era un casino. File sparsi. Nomi duplicati. TITANIUM_OS non trovava i riferimenti incrociati — cercavi la tolleranza di un foro e ti tornava un documento vuoto. Con l'ADHD, un sistema che non risponde è peggio di nessun sistema. Apri, non trovi, chiudi. Perdi il filo. Perdi venti minuti. Poi un'ora.

Il letto della V32 — quello fisico — era già fissato da metà febbraio. 178 kg. Piano in ghisa. Parallelismo verificato a 0.012mm su 600mm di corsa con il comparatore Mitutoyo 513. Quello era il dato fisico.

Ma il "letto assoluto" della milestone non è solo il piano in ghisa.

È che quella sera TITANIUM_OS ha ricevuto la geometria completa del frame. Le quote reali. I punti di riferimento. Da lì in poi il sistema sa dove si trova ogni asse. Sa che l'asse X ha un'escursione di 420mm. Sa che la tolleranza in stack sui tre assi è ±0.019mm. Sa che il mandrino andrà montato a centro-linea Z con offset +37.5mm dal piano di riferimento.

Queste non sono informazioni generiche. Sono vincoli. Il sistema li usa per ragionare.

Questo è il bivio: prima, TITANIUM_OS era un'interfaccia React con Python dietro. Bella da vedere, vuota dentro. Dopo quella sera, ha memoria. Può rispondere a "qual è il gioco massimo ammissibile sul giunto MIMS in condizione di carico assiale?" — e trovare la risposta nel grafo, non inventarla.

Il collegamento con MIMS è diretto. I connettori modulari fisici si agganciano al frame della V32. Se il frame non è documentato con precisione nel knowledge base, MIMS non può essere dimensionato correttamente. Il file \`mims_connector_spec_r1.md\` dentro BRAIN contiene già le forze di interfaccia — 340N assiale, 180N laterale. Dati reali. Misurati.

VULCAN aspetta. EVA aspetta. Tutto aspetta che la macchina esista davvero — fisicamente e digitalmente.

Oggi il blocco attivo è la gusset sinistra. Tre ore di officina stimate. Smussi, fori M8, saldatura TIG — probabilmente alluminio 6082, stessa scelta della destra. Ma c'è un problema che non si risolve in officina: manca il mandrino. 2.2kW, attacco ER20. È da ordinare. Senza quello, posso costruire tutto il frame perfetto che voglio — la macchina non taglia.

Ho già la scheda tecnica. Ho già il fornitore. Manca solo che prema "ordina".

Lo faccio domani mattina. Prima delle 8:00. Prima che l'ADHD decida che c'è qualcos'altro di più urgente.

---

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
    preview: "# Componenti V32: dalla teoria alla fabbrica

# Episodio 14 — I Componenti Ci Sono

---

> "Adesso è",
    content: `# Componenti V32: dalla teoria alla fabbrica

# Episodio 14 — I Componenti Ci Sono

---

> "Adesso è reale. Prima era un file CAD. Ora pesa."

---

Venerdì 13 febbraio 2026. Officina, 16:20.

Apro il cartone grande. Quello da 80x60x40. Dentro ci sono i profili estrusi per il telaio, le guide lineari THK SSR20, i cuscinetti SKF — tutto quello che nelle ultime settimane esisteva solo in un assembly Fusion 360 e in BRAIN/STATE.json.

Tiro fuori la guida Z. 600mm, acciaio temprato, rettificato. La appoggio sul banco. Pesa diversamente da come te la immagini sullo schermo.

Faccio la foto. 16:24. La carico nel log.

\`\`\`
stato: "componenti_ricevuti"
data: "2026-02-13"
completamento_v32: 65%
prossimo_step: "Config G — gusset sinistra"
\`\`\`

---

## Il Bivio

Prima di questa consegna, la V32 era un progetto.

Intendo: esisteva nei file, nei calcoli di rigidità, nelle simulazioni di deflessione del portale. Sapevo che con 178kg di struttura e ±0.019mm di tolleranza dovevo fare certi conti. Li avevo fatti. Ma erano numeri in un foglio.

Adesso il metallo è qui.

Il problema cambia natura. Non è più "questo design regge il carico?" — è "questo giunto specifico, con questa guida specifica, in questa sequenza di assemblaggio, funziona?". Diverso. Molto più concreto. Molto più difficile da delegare a un software.

La gusset sinistra — Config G — è il punto critico adesso. È il nodo strutturale dove il portale X si aggancia alla colonna verticale sinistra. Ho stimato 3 ore. Potrebbero essere 4. La variabile è la squadratura: se il tubo 60x60x4 in S235 non è perfettamente a 90° dopo la saldatura, tutto quello che viene dopo — le guide, il carro Y, la tavola — accumula errore.

Il mandrino 2.2kW ER20 manca ancora. Da ordinare. È il blocker principale per la fase di test. Ma non mi blocca adesso — adesso mi blocca zero cose. Posso assemblare il telaio completo senza mandrino.

---

## Connessione al Sistema

TITANIUM_OS legge lo STATE.json ogni volta che apro il terminale. Questo aggiornamento — \`completamento_v32: 65%\` — non è una nota. È un parametro operativo.

Quando Maria (EVA AI su WhatsApp) mi chiede "a che punto sei con la fresatrice", non risponde con una stima. Risponde con i dati del file. 65%. Prossimo step: gusset sinistra. Blocker: mandrino.

MIMS al 30% aspetta. I connettori modulari fisici hanno senso solo quando ho la V32 che taglia le piastre di accoppiamento a tolleranza. Non prima.

VULCAN — la pressa 20t — aspetta i polimeri. Aspetta i test di ricetta. Aspetta che io abbia tempo. Il tempo viene dalla V32 funzionante, che automatizza la lavorazione, che libera ore.

Tutto è in serie. Non in parallelo.

Questa foto del 13 febbraio è il punto di non ritorno.

---

I componenti ci sono. Ora si saldano.`,
  },
  // AUTO_GENERATED_END
];
