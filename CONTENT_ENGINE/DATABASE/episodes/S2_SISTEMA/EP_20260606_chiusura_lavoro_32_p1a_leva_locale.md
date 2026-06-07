<!-- TOC -->

- [TITANIUM_OS  S02E08](#titaniumos-s02e08)
  - [La View Che Mentiva](#la-view-che-mentiva)
  - [COLD OPEN](#cold-open)
  - [ATTO I  IL PROBLEMA CHE NON URLAVA](#atto-i-il-problema-che-non-urlava)
  - [ATTO II  RISCRITTURA ADDITIVA](#atto-ii-riscrittura-additiva)
  - [ATTO III  IL BINARIO CHE NON DOVEVA ESISTERE](#atto-iii-il-binario-che-non-doveva-esistere)
  - [CHIUSURA](#chiusura)
  - [REEL HOOK](#reel-hook)
  - [METADATI EPISODIO](#metadati-episodio)

<!-- /TOC -->

# TITANIUM_OS — S02E08
## "La View Che Mentiva"

---

## COLD OPEN

Ore 23:47. Il monitor nel buio della taverna mostra una dashboard.

Sette automazioni. Tutte con il badge verde. Tutte "attive".

Tre di quelle, in quel momento, non stanno girando.

---

## ATTO I — IL PROBLEMA CHE NON URLAVA

Ci sono bug che crashano tutto e ci li vedi subito. E poi ci sono i peggiori: quelli che sembrano funzionare.

La view principale di GENESIS — la schermata che Matteo apre ogni mattina per capire cosa è vivo e cosa no — mentiva in due direzioni contemporaneamente. Classificava come "attive" automazioni che erano ferme. E classificava come "da fare" cose che erano già operative. Un sistema di stato che costruiva una realtà parallela, silenziosa, convincente.

Il NightAudit aveva sollevato un'anomalia. File che non esistevano. O che esistevano ma venivano letti male. Il tipo di segnale che di notte sembra un falso positivo e di giorno diventa un'ora persa a capire cosa ci si può fidare.

La sessione del 5 giugno — Matteo al lavoro, ~8 ore di autonomia del sistema — aveva già trovato una parte del problema. **TI_NightPush** era uscito con codice 255. Causa: `update_github_profile.py` chiamava `gh` con un path che non veniva trovato. Non un crollo spettacolare. Una silenziosa uscita sbagliata nel mezzo della notte, mentre tutto il resto sembrava dormire tranquillo.

Quella cosa era già fixata nel codice committato. Ma la dashboard non lo sapeva ancora.

---

## ATTO II — RISCRITTURA ADDITIVA

Il 6 giugno Matteo apre la sessione #32 con un obiettivo preciso: **P1a**. Far sì che quello che la view mostra corrisponda a quello che il sistema sta facendo davvero.

La scelta tecnica è importante: riscrittura *additiva*. Nessuna voce rimossa dall'array AUTOMAZ. Non si cancella, non si semplifica, non si nasconde la complessità sotto un refactor pulito. Si aggiunge la colonna mancante — lo stato operativo reale — e si fa parlare ogni riga di sé stessa.

Le card "attive" e "da fare" smettono di leggere una categoria statica scritta a mano mesi fa. Cominciano a interrogare lo stato reale. `model_ready`, `last_run`, `exit_code`. Dati vivi, non etichette.

Il badge di stato arriva nella view principale. Verde se l'automazione ha girato e ha restituito 0. Giallo se è in attesa. Rosso se qualcosa è uscito storto. Tre colori che non mentono.

E poi — quasi in parallelo, quasi come un effetto collaterale della chiarezza ritrovata — viene accesa la leva locale. **Ollama/Qwen**. `model_ready: true`. GENESIS smette di dipendere esclusivamente dall'esterno per ragionare. Ha adesso un cervello locale, piccolo, pronto, che gira in taverna.

Build verde. Tutto committato. Push su main.

---

## ATTO III — IL BINARIO CHE NON DOVEVA ESISTERE

Ma la cosa più strana della sessione #32 non è il fix tecnico.

È quello che nasce nel mezzo.

Durante il lavoro sul P1a, prende forma qualcosa che non era in agenda: **P2 — AVVENTURA**. Un binario narrativo nuovo, parallelo ai tecnici. Non la biografia di Matteo. Non un diario del progetto. Qualcosa di diverso.

Il primo episodio si chiama *"La Bambina e la Giuntura"*. Il mondo è quello educativo. La stagione si chiama AV.

Matteo non ha spiegato perché è nata proprio quel giorno. E forse non c'è una spiegazione che regge il peso di una risposta diretta. Ci sono momenti in cui la mente, mentre risolve un problema tecnico concreto — una view che mente, un badge che manca — trova spazio per qualcos'altro. Non come fuga. Come ampliamento.

Un sistema cognitivo che si occupa solo di sé stesso è un sistema che non racconta nulla di interessante.

La bibbia del mondo esiste già. Il pilota è scritto. Il binario è lanciato.

---

## CHIUSURA

Alla fine della sessione #32 rimangono tre cose su cui posare lo sguardo:

Una dashboard che adesso dice la verità. Un modello locale acceso per la prima volta. Una storia per bambini che nasce nello stesso commit in cui si correggeva un exit code sbagliato.

Non è coerenza. È quello che succede quando si lavora sul serio per otto ore e si lascia il sistema libero di trovare i propri bordi.

Il target capannone è 15 luglio 2030. Mancano 1500 giorni circa.

V32 è al 65%. GENESIS al 70%.

Ogni giorno che la view mente è un giorno in cui non si sa davvero dove si è.

Adesso la view non mente più.

---

## REEL HOOK

La mia dashboard mostrava 7 automazioni attive.  
3 erano ferme. Da settimane, forse.  
Oggi ho riscritto l'array — additivo, nessuna voce tolta — e ho acceso il modello locale.  
Adesso ogni card legge lo stato reale. Non l'etichetta che ci avevo messo mesi fa.  
Nel mezzo è nata anche una storia per bambini. Non so ancora cosa farne.

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S02E08 |
| **Titolo** | La View Che Mentiva |
| **Data** | 2026-06-06 |
| **Sessione** | #32 |
| **Milestone chiuse** | P1a (AUTOMAZ stato reale + badge live) |
| **Milestone aperte** | P2 AVVENTURA (binario lanciato, bibbia scritta) |
| **Leva accesa** | Ollama/Qwen local — `model_ready: true` |
| **Anomalia risolta** | NightAudit falso negativo + TI_NightPush exit 255 |
| **V32** | 65% |
| **GENESIS** | 70% |
| **Target capannone** | 15 luglio 2030 |
| **Tag narrativo** | stato-reale, riscrittura-additiva, binario-avventura, leva-locale |
| **Co-author AI** | Claude Opus 4.8 |