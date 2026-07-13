<!-- TOC -->

- [TITANIUM_OS  Episodio 57](#titaniumos-episodio-57)
  - [Il Sistema che si Guarda allo Specchio](#il-sistema-che-si-guarda-allo-specchio)
  - [COLD OPEN](#cold-open)
  - [ATTO I  La Gerarchia](#atto-i-la-gerarchia)
  - [ATTO II  Cosa si Toglie](#atto-ii-cosa-si-toglie)
  - [ATTO III  Il Gioco](#atto-iii-il-gioco)
  - [CHIUSURA](#chiusura)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — Episodio 57
## "Il Sistema che si Guarda allo Specchio"

*09 luglio 2026 — GENESIS, sessione #57*

---

## COLD OPEN

La dashboard apre su una home con un numero in grande.
Non un titolo. Non un menu. Un numero — il prossimo passo — in tipografia che occupa lo schermo come una pietra tombale o una promessa.

Prima di oggi quel numero era sepolto in un paragrafo, in corpo 11px, tra quattro altre voci alla stessa altezza. Lo guardavi e non lo vedevi. Come quelle cose che hai sempre davanti e che smettono di comunicare perché le hai normalizzate.

Matteo ha guardato la dashboard e ha detto: *rifalla completamente.*

Nessuna spiegazione aggiuntiva. Quando dice così, sa già dov'è il problema — solo non ha voglia di descriverlo a parole quando può mostrarlo con il risultato.

---

## ATTO I — La Gerarchia

C'è una legge in tipografia che Matteo non ha mai letto su nessun libro ma applica istintivamente: *una pagina che parla di tutto uguale non dice niente.*

La sessione #57 è stata, per tre quarti, un lavoro di gerarchia visiva. Non di nuove funzioni. Non di nuovi dati. Di far pesare le cose nel modo giusto.

La HOME ottiene un blocco hero: `next_step` in xl/2xl con un glow. Il prossimo passo smette di essere una voce di lista e diventa il punto focale — l'unica cosa che la pagina ti chiede di guardare prima di tutto il resto.

Il pattern si replica su undici viste. CONTROLLO: il numero di strumenti accesi *adesso* sale da `text-lg` a dominante. AUTOMAZIONI: via i tab per priorità di marzo — quella era un'altra fase, un altro problema. La nuova vista si chiama "la sala macchine" e mostra i processi vivi in tempo reale: watchdog attivo, Task Scheduler, stato di ogni automazione. L'header smette di mentire — non mostra uno stato fermo mentre sotto i dati sono live.

PUBBLICAZIONI: la regola era sepolta nella pagina. "Il sistema prepara e propone, Matteo approva, il canale pubblica." Otto parole che descrivono tutta la filosofia di EVA e del contenuto. Ora apre la vista come un manifesto. Non come una nota a piè di pagina.

SpiegaPilastroView — le sei viste dei pilastri V32/MIMS/GENESIS/EVA/NINA/HR — ricevono ciascuna la propria frase-essenza in tipografia grande. Il pilastro smette di essere un nome e diventa una dichiarazione.

Undici viste. Una regola sola: la cosa più importante deve *pesare* di più.

---

## ATTO II — Cosa si Toglie

Ogni sessione di pulizia ha un momento in cui togli qualcosa che avevi costruito.

Il serpentone era una visualizzazione del percorso — una linea a zigzag con le tappe del progetto, disegnata come un sentiero su una mappa. Matteo aveva detto *non va bene come percorso* e la voce era rimasta in sidebar ad aspettare un'alternativa.

L'alternativa arriva con la Mappa-Albero: tre mappe integrate in un grafo, due lenti di lettura. In dashboard è derivata — si colora da sola, riflette lo stato reale del progetto. L'illustrazione a mano — la vera mappa — è un asset separato, un prodotto. Non il navigatore: il manifesto.

Il serpentone viene pensionato. La sidebar si alleggerisce.

"Archivio Nina" esce dalla barra — i dati restano intatti, la voce sparisce. *A livello visuale inutile, basta che tieni i dati.* L'header "HR — Il motore sulla persona" sparisce perché HR parla da sé.

C'è una disciplina precisa in questo: togliere non è perdere — è far emergere quello che conta. Ogni voce che togli dalla sidebar è un po' di rumore in meno su quello che rimane.

Poi c'è Uptime Kuma. L'idea era: installare il monitor di uptime per la sala macchine. La decisione finale è no — duplicherebbe watchdog e Task Scheduler già attivi. Invece viene costruita in casa la HEARTBEAT BAR: pattern ispirato a Kuma, implementato interno. La seconda tacca va verificata il giorno dopo. Una cosa alla volta.

Il principio è lo stesso della sidebar: non installi un tool perché esiste e funziona. Lo installi se fa qualcosa che non hai già.

---

## ATTO III — Il Gioco

Verso fine sessione arriva qualcosa di diverso.

Matteo dice: *la cartella con dentro il come, lo stile, cosa devi fare per questo gioco — poi lo sviluppiamo passo passo, come pubblicazioni.*

Il Gioco è un'idea che galleggiava da settimane. Un layer sul motore esistente — grafo, mappa, guida — che trasforma il sistema cognitivo in qualcosa che assomiglia a un Real Life RPG. Non un videogioco. Non una metafora. Un meccanismo reale dove le azioni documentate producono progressione visibile.

In sessione #57 diventa un dossier. Vista GIOCO nella dashboard. Scaletta con gate espliciti — lo stesso modello delle pubblicazioni: ogni passo ha una condizione di sblocco, non si va avanti senza aver validato quello precedente.

La scaletta apre con due voci:

**1. [Claude] Dossier + vista GIOCO in dash** — questo documento, questa vista. ✅ Fatto.
**2. [INSIEME, 15 min] Valida le meccaniche** — il prossimo step. 🔒 Locked.

Il lock è intenzionale. Le meccaniche — salvataggio, collezionabili, progressione multi-persona — non vengono sviluppate in solitaria. Si validano insieme. Quindici minuti, decisioni condivise, poi si costruisce.

Lo stile del gioco ha già due regole scritte nel dossier: niente mappe a triangoli o serpentoni disegnati a mano nella dashboard — quella è la versione da asset, da prodotto. In dash: l'albero onesto, derivato, che si colora con lo stato reale.

Non è una gamification dell'esistente. È una seconda lettura dello stesso sistema. Il profilo/CV che si colora — principio 9 del motore HR — diventa il meccanismo di salvataggio. Le Pietre-radici diventano collezionabili. Il motore HR è già multi-persona by design.

L'infrastruttura c'è già. Il Gioco è un modo di guardarla.

---

## CHIUSURA

Il PITCH viene aggiornato. Era fermo al primo giugno, pre-decisione motore. Adesso descrive le tre nature — cosa vende e quando — e include IL MOTORE. Il documento che usi per spiegare il progetto a un interlocutore esterno deve riflettere dove sei adesso, non dove eri due mesi fa.

METODO v2.0: aggiornato con i numeri veri, lo step Riordina, la notte. Era fermo al 3 giugno.

CommandBar accessibile: `role=dialog`, `aria-modal`, input combobox con `aria-activedescendant`, lista con `role=listbox`. PageKicker canonico estratto in UIComponents — era reinventato in ogni vista con tracking diverso: `0.1em`, `0.2em`, `0.3em` di letter-spacing senza logica condivisa. Ora c'è un componente unico, due viste migrate.

La sessione #57 ha fatto una cosa sola, ripetuta in molti posti: ha reso visibile ciò che contava, e ha nascosto ciò che distraeva.

Non è design. Non è UX. È la stessa logica con cui Matteo guarda un giunto TIG e capisce dove la deformazione termica ha spostato il materiale: il pezzo non mente, devi solo sapere dove guardare.

La dashboard è il sistema che si guarda allo specchio. Ogni sessione aggiusta il riflesso.

---

## FATTI (per il RAG)

- **DECISIONE:** Uptime Kuma NON installato; HEARTBEAT BAR costruita in casa (pattern Kuma, implementazione interna); seconda tacca da verificare mattina del 10/07.
- **LOGICA:** Kuma duplicherebbe watchdog + Task Scheduler già attivi — nessun tool esterno se la funzione è già coperta.
- **DECISIONE:** Gerarchia visiva applicata a 11 viste con pattern hero — elemento più importante in tipografia dominante (xl/2xl), non testo-lg alla pari con il resto.
- **LOGICA:** Vista piatta = nessuna priorità comunicata; il next_step in HOME era in corpo 11px tra quattro voci equivalenti.
- **DECISIONE:** Il GIOCO (Real Life RPG) formalizzato come dossier in KNOWLEDGE/MONDO/GIOCO/_DOSSIER.md con scaletta gated modello PUBBLICAZIONI; step 2 (validazione meccaniche, 15 min) è locked — si apre solo insieme.
- **LOGICA:** Le meccaniche (salvataggio=CV colorato, collezionabili=Pietre-radici) usano il motore HR esistente — il Gioco è un layer sul grafo, non un sistema nuovo.
- **OBIETTIVO:** Prossimo passo misurabile — sessione di 15 min per validare meccaniche v1 del Gioco; verifica 2a tacca Heartbeat Bar; migrazione PageKicker alle viste rimanenti.

---

**reel_hook**

Ho rifatto completamente la dashboard di GENESIS in una sessione.
Non perché non funzionasse — funzionava. I dati erano live, le automazioni giravano.
Il problema: il numero più importante era in corpo 11px tra quattro voci alla stessa altezza.
Una gerarchia piatta non dice niente — e un sistema che non comunica priorità non è un sistema.

---

| Campo | Valore |
|---|---|
| **Episodio** | #57 |
| **Data** | 09 luglio 2026 |
| **Progetto principale** | GENESIS |
| **Tag** | `dashboard`, `UX`, `gerarchia`, `gioco`, `HEARTBEAT BAR`, `MAPPA-ALBERO` |
| **V32 completamento** | 65% |
| **GENESIS completamento** | 70% |
| **Commit** | 29 (sessione #57, issue #57) |
| **Prossimo step** | Validazione meccaniche Gioco (15 min, insieme) |