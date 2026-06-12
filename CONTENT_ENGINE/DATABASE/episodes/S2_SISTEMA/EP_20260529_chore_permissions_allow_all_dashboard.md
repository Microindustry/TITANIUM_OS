<!-- TOC -->

- [TITANIUM_OS  S1E08](#titaniumos-s1e08)
  - [Tagliare il Grasso](#tagliare-il-grasso)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Peso delle Cose che Funzionano](#atto-i-il-peso-delle-cose-che-funzionano)
  - [ATTO II  Permessi e Frizioni Invisibili](#atto-ii-permessi-e-frizioni-invisibili)
  - [ATTO III  Config G](#atto-iii-config-g)
  - [CHIUSURA](#chiusura)
  - [REEL_HOOK](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S1E08

## "Tagliare il Grasso"

---

## COLD OPEN

Il file si chiama `CanvasLayout.tsx`.

Millecentosedici righe. Un blocco monolitico scritto di notte, durante sessioni che finivano alle due, quando l'unica cosa che importava era che funzionasse — non che fosse leggibile. Non che fosse mantenibile. Non che qualcuno, incluso te tra sei mesi, capisse dove finiva una cosa e dove iniziava un'altra.

Questa mattina Matteo apre il file. Lo guarda. Poi apre il terminale.

Non perché qualcosa sia rotto. Perché sa che se aspetta ancora, smette di essere codice e diventa debito.

---

## ATTO I — Il Peso delle Cose che Funzionano

C'è una categoria di lavoro che non appare mai nei titoli. Non è una feature nuova. Non è un bug fixato. Non è il momento in cui qualcosa che era rotto torna a funzionare — quella scarica di dopamina pulita, verificabile, definitiva.

È la mattina in cui guardi qualcosa che funziona e decidi di smontarlo comunque.

`CanvasLayout.tsx` funzionava. La dashboard di GENESIS si apriva, le MacroCard mostravano i dati, la sezione Matteo caricava lo stato del sistema, la sezione Claude rendeva i log delle sessioni. Tutto corretto. Tutto dentro un unico file da 1116 righe dove ogni componente sapeva troppo degli altri, dove modificare il colore di un titolo significava scorrere duecento righe per trovare il punto giusto, dove il rischio di rompere qualcosa era proporzionale alla stanchezza del momento.

Il refactoring non è glamour. È igiene.

Matteo estrae tre componenti: `MacroCard`, `MatteoSection`, `ClaudeSection`. Ognuno nel suo file. Ognuno con una responsabilità sola. Il file principale scende da 1116 a 290 righe — una riduzione del 74% senza toccare un pixel dell'interfaccia, senza cambiare una sola funzionalità visibile.

È il tipo di lavoro che non puoi mostrare a nessuno. Il prima e il dopo sembrano identici. Solo il diff su Git racconta cosa è successo davvero.

---

## ATTO II — Permessi e Frizioni Invisibili

Prima del refactoring, c'è un problema più piccolo e più fastidioso.

Il file `settings.local.json` della dashboard aveva una configurazione parziale: permessi attivi solo per `npx tsc`. Questo significava che ogni volta che l'ambiente si riavviava, certi processi si bloccavano su richieste di autorizzazione. Micro-interruzioni. Finestre di dialogo. Il tipo di frizione che non ferma nessun progetto ma ti logora per accumulo — trenta secondi persi dieci volte al giorno diventano cinque minuti persi al giorno diventano mezz'ora persa a settimana.

La soluzione è `allow-all`. Non elegante, non definitiva, non la configurazione di produzione che userai tra due anni quando il sistema gira in un capannone vero. Ma è la configurazione giusta adesso, in una taverna da 12 m² dove l'unico utente sei tu e il costo della frizione supera il costo del rischio.

Insieme a questo: uno script `.bat` con privilegi admin per ottimizzare l'avvio su Windows. Piccolo. Concreto. Il tipo di cosa che risolvi una volta e non ci pensi più.

Questa è la sessione #8. Il sistema RAG ha 150 chunk. Lo state è v2.5.0. Il commit è marcato `dirty` — ci sono modifiche non ancora consolidate, il cantiere è aperto.

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
| **Commit chiave** | `5a9d2d7` |
| **Lavoro principale** | CanvasLayout refactor 1116→290 righe |
| **Componenti estratti** | MacroCard, MatteoSection, ClaudeSection |
| **Config modificata** | settings.local.json allow-all |
| **Milestone attivo** | Config G — Rinforzi colonne Z+U |
| **Sessione RAG** | #8 — 150 chunk |
| **State version** | v2.5.0 |
| **Angolo narrativo** | Manutenzione come disciplina, non come emergenza |
| **Tono** | Onesto, anti-motivazionale, tecnico-personale |
| **Target capannone** | 15 luglio 2030 |

## FATTI (per il RAG)

- **FATTO:** Il file `CanvasLayout.tsx` della dashboard GENESIS contava 1116 righe monolitiche; dopo il refactoring è stato suddiviso in tre componenti separati (`MacroCard`, `MatteoSection`, `ClaudeSection`), portando il file principale a 290 righe. **LOGICA:** Riduzione del 74% del codice nel file principale senza modifiche funzionali o visibili all'interfaccia.

- **DECISIONE:** Il file `settings.local.json` della dashboard è stato impostato su `allow-all` per i permessi di processo. **LOGICA:** La configurazione precedente (permessi attivi solo per `npx tsc`) generava richieste di autorizzazione a ogni riavvio dell'ambiente; in un setup monoutente la frizione da micro-interruzioni supera il rischio di sicurezza.

- **FATTO:** È stato creato uno script `.bat` con privilegi admin per ottimizzare l'avvio del sistema su Windows.

- **FATTO:** Alla sessione S1E08 il sistema RAG di GENESIS conta 150 chunk e lo stato del sistema è versione `v2.5.0`, con commit marcato `dirty`.

- **OBIETTIVO:** Step attivo su V32 in S1E08: saldatura TIG di 4 gusset da 200 mm sulla colonna Z sinistra (progetto "Config G — Rinforzi colonne Z+U"). **PRECISIONE:** V32 è una macchina CNC da 178 kg in corpo Epoxy Granite con target di precisione IT6-IT7.

- **FATTO:** Il milestone temporale del progetto TITANIUM_OS è fissato a luglio 2030, distante 49 mesi dalla data dell'episodio S1E08.
