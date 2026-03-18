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
  // AUTO_GENERATED_END
];
