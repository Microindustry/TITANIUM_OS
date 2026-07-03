# ATTACCO 03 · SCRITTURA / NARRATIVA — mondo Nina

*Specialista 03 dell'ATTACCO ESERCITO · 2026-07-03 · PROPOSE-ONLY (nessun file di canone toccato)*
*Bersaglio: `CONTENT_ENGINE/DATABASE/**` — episodi EP_N2_01→51, PRE_01/02/03, BIBBIA, PIETRE, PERCORSO_EVOLUTIVO, INDICE_CAMMINO, caroselli.*
*Metodo: lettura mirata canone + grep strutturale su tutti i 51 EP_N2 + verifica slide-count reale degli HTML.*

---

## PRIORITÀ (ordinate)

| # | Finding | Gravità | Tipo |
|---|---------|---------|------|
| F1 | INDICE_CAMMINO (la "sola verità" dichiarata) è scaduto: 9/15 titoli sbagliati, ferma a 15 su 51, sezione proposte punta all'episodio sbagliato | **ALTA** | quick-win + ingegneria |
| F2 | Catena open-loop 2→3 rotta: EP_N2_02 promette "la MISURA", EP_N2_03 apre su un'altra cosa | **ALTA** | quick-win (si salda col carosello EP_N2_03, v. traccia in fondo) |
| F3 | EP_N2_51 duplica EP_N2_08 (stessa Pietra, stesso giro, stessa lezione) e si auto-dichiara "Casella 7" collidendo con EP_N2_07 | **ALTA** | quick-win |
| F4 | 7 Pietre vs 8 Pietre: PERCORSO_EVOLUTIVO e MAPPA_AVVENTURA non conoscono ⟡0 La Materia | MEDIA | quick-win |
| F5 | "Guardiano" usato per 2 Pietre diverse (⟡2 watcher e ⟡6 watchdog) → àncora dual-coding diluita | MEDIA | quick-win |
| F6 | Cartelle caroselli fuori convenzione (`ep 1.html` vs `carosello.html`), README EP_N2_01 dice ancora 8 slide (sono 16), indice caroselli non registra EP_N2_02 né PRE_03 | MEDIA | quick-win |
| F7 | EP_N2_17 vs EP_N2_10: due episodi ⟡1 quasi identici (giro 1/2 senza vera differenza di profondità) | MEDIA | ingegneria leggera |
| F8 | EP_N2_16-19 e 51 non coperti dalla verifica qualità (QUALITA_BATCH_44 copre solo 20→50) | BASSA | quick-win |

**Verdetto complessivo (onesto):** la qualità di scrittura dei singoli episodi è alta e on-canon
(struttura verificata via grep: tutti i 51 hanno "Dove siamo", "test della sarta", "Provalo tu",
SCENE, DIDATTICA, FATTI — zero mancanti). Il problema non è la prosa: è **l'indice che non tiene
il passo del mondo**. Il mondo è cresciuto 3.4x (15→51 episodi) e i documenti-verità sono rimasti
alla sessione #43-44. È esattamente l'Entropia della bibbia: nessuno ha sbagliato in grande, tutto
è derivato di un soffio alla volta.

---

## 1 · CANONE — una sola verità (violazioni)

### F1 — INDICE_CAMMINO scaduto (il documento che si dichiara canonico non lo è più)

`MONDO/INDICE_CAMMINO.md:29-30` dichiara: *"Una sola verità: questo è l'ordine canonico; se un
episodio cambia il suo open loop, si aggiorna qui."* Non è successo. Tre rotture:

1. **9/15 titoli non corrispondono ai file** (gli episodi sono stati riscritti/reintitolati il
   23/06 — archivio `_ARCHIVIO/reemit_20260623_160725/` — dopo la stesura dell'indice):

   | Casella | INDICE_CAMMINO dice | Il file dice |
   |---|---|---|
   | 4 | La Mappa Viva (`INDICE_CAMMINO.md:46`) | **La Mappa che Non Mente** (`EP_N2_04_la_mappa_che_non_mente.md:3`) |
   | 5 | Prima la Mano, Poi la Macchina (`:47`) | **Le Mani Prima dei Rulli** |
   | 7 | La Mente che Parla (`:49`) | **Il Sussurratore di Parole** |
   | 8 | Quando la Mente Inventa (`:50`) | **La Lampada che Sussurra** |
   | 9 | La Biblioteca delle Fonti (`:51`) | **La Bibliotecaria della Mente** |
   | 10 | La Traccia (`:52`) | **Il Grande Loop: quando il gesto rimane** |
   | 12 | L'Esercito Silenzioso (`:54`) | **La Squadra Notturna** |
   | 13 | Il Soldato Caduto in Silenzio (`:55`) | **Il Battito del Guardiano** |
   | 15 | Il Valore (`:57`) | **Il Gettone della Sarta** |

2. **La sezione "Caselle proposte" punta all'episodio sbagliato**: `INDICE_CAMMINO.md:71-73` dice
   che `EP_N2_16` = *"Il Guardiano che Non Dorme"* in `_PROPOSTI/` da validare. In canone
   `EP_N2_16` è **"Lo Specchio del Giudice"** (night_audit, ⟡6 giro 3), il "Guardiano che Non
   Dorme" è diventato **EP_N2_23** (⟡2, news watcher — concetto diverso!), e `_PROPOSTI/` è vuota.
   Chi si fida dell'indice sbaglia episodio E concetto.

3. **Il cammino si ferma a 15, il canone è a 51.** I 36 episodi di ampiezza (16→51) esistono solo
   in `PIETRE.md` (vista per-Pietra) ma il "libro" non dice quali sono innestabili né dove.
   `QUALITA_BATCH_44.md:45-48` lo segnalava già come aperto ("va deciso a mano dove agganciarli") —
   mai deciso.

**PROPOSTA (quick-win ≤30 min):** aggiornare la tabella 1→15 con i titoli reali + correggere la
sezione proposte (EP_N2_16 = Specchio del Giudice, innesto accanto a casella 13-14; il guardiano
⟡2 = EP_N2_23) + aggiungere una sezione "AMPIEZZA (16→51): schede della mappa, non caselle del
libro — navigali da PIETRE.md" con la regola d'innesto.
**PROPOSTA (ingegneria):** l'indice va **generato**, non mantenuto a mano — stesso pattern di
`generate_pietre_index.py` (che infatti tiene `PIETRE.md` fresco al 02/07 mentre l'indice a mano è
morto al 23/06): un `generate_indice_cammino.py` che legge `episodes.json` (`asse_nina` + open
loop) e riscrive la tabella. Un documento-verità che si rigenera non deriva. (Regola 2: se lo fai
3 volte, script.)

### F2 — La catena open-loop 2→3 è rotta nel punto più visibile (i due episodi rifatti)

- `EP_N2_02_il_soffio_di_troppo.md:200-202` chiude: *"ogni problema ha un'unità di misura
  nascosta… → Casella 3: la MISURA"*. Anche il carosello pubblicato lo promette:
  `POSTER/CAROSELLI/EP_N2_02/README.md:31` — slide 16 = *"open loop → la MISURA (EP_03)"*.
- Ma `EP_N2_03_mille_volte_uguale.md` consegna **la ripetibilità/deriva** e il suo micro-recap
  non aggancia: `EP_N2_03:36` *"Nina ha imparato a riconoscere i motivi e gli ordini"* — non è
  la casella 2 (che insegnava: la precisione è una relazione). È un recap scritto contro una
  versione precedente dell'episodio 2.
- Anche le Pietre richiamate sono etichettate contro il vecchio canone: `EP_N2_03:211` *"⟡0
  casella 1 (riconoscere l'ordine)"* — la casella 1 fonda *"fatto bene = regge quando lo tiri"*
  (`EP_N2_01:150`), non "riconoscere l'ordine".
- `INDICE_CAMMINO.md:44-45` dice invece 2→3 = "la ripetibilità" e vanta *"catena open-loop
  integra 1→15, nessun buco"* (`:66-67`) — vero a sess#43, falso dopo la riscrittura di EP_N2_02.

**Nota di merito:** il contenuto di EP_N2_03 È già misura-centrico (il calibro, gli undici
millimetri, "misura ogni cinque" — `EP_N2_03:142-152`). Il buco è di *aggancio*, non di sostanza:
la misura è l'eroe nascosto dell'episodio ma nessuno la nomina come tema.

**PROPOSTA (quick-win, additiva, 2 micro-edit):**
1. `EP_N2_03:36` "Dove siamo" → *"Nina ha imparato che la precisione è un patto ('giusto rispetto
   a cosa?'). Ora scopre l'attrezzo che rende il patto controllabile — la misura — e il nemico che
   lo insidia: la deriva."*
2. `EP_N2_03:211` richiami → *"⟡0 casella 1 (fatto bene = regge quando lo tiri) · ⟡0 casella 2
   (la precisione è una relazione; quanto è 'il giusto' si misura)"*.
3. Il **carosello EP_N2_03** salda il tutto presentando l'episodio sotto la lente "la MISURA"
   (v. traccia dettagliata in fondo) — così la promessa della slide 16 di EP_N2_02 viene mantenuta
   senza riscrivere nulla.

### F4 — 7 Pietre o 8 Pietre? I documenti fondativi non conoscono ⟡0

- `PERCORSO_EVOLUTIVO.md:66-69` (canone dei "numerini"): *"⟡1…⟡7 sono le Pietre dell'arco = le 7
  tappe"* — ⟡0 non esiste.
- `MAPPA_AVVENTURA.md:59-72`: "LE 7 REGIONI", il grafo `:153` parte da ⟡1 — nessuna Regione 0.
- Ma il canone vivo ha **8 Pietre**: `PIETRE.md:34` (⟡0 LA MATERIA, radice, 6 episodi),
  `BIBBIA_VISIVA_CAROSELLI.md:55` ("Le 8 Pietre ⟡0…⟡7"), `EP_N2_01:160` ("Regione 0 La Materia").
- I due file vecchi hanno già il banner "fonte di verità = INDICE_CAMMINO" per gli **ID episodio**
  (`PERCORSO_EVOLUTIVO.md:19-21`, `MAPPA_AVVENTURA.md:25-28`) ma NON per la **numerazione Pietre**
  — e PERCORSO_EVOLUTIVO è tuttora il canone dichiarato della didattica. Chi scrive un episodio
  nuovo seguendo PERCORSO §2 numera le Pietre in modo sbagliato.

**PROPOSTA (quick-win):** 2 righe di banner in `PERCORSO_EVOLUTIVO.md` §2 e in `MAPPA_AVVENTURA.md`
L1: *"Numerazione Pietre → fonte di verità: PIETRE.md (8 Pietre, ⟡0 La Materia = radice aggiunta
con Nina v2; qui sotto resta la vecchia numerazione a 7 per storia)."* Aggiornare anche la riga
verticali (₣ Finanza manca del tutto in MAPPA_AVVENTURA).

---

## 2 · RIPETIZIONI E INCASTRI DEBOLI

### F3 — EP_N2_51 è un doppione di EP_N2_08 (e ruba la casella a EP_N2_07)

- `EP_N2_08` (canone, casella 8): *"l'allucinazione della mente: da dove lo sai?"* — ⟡3 giro 2
  (`PIETRE.md:79`).
- `EP_N2_51_il_sussurratore_che_indovina.md` insegna: *"una macchina che indovina bene la parola
  dopo non sta pensando come te… per questo chiediamo sempre: «da dove lo sai?»"*, Pietra
  *"⟡3 giro 2 — L'allucinazione: la Mente sceglie la parola più probabile, non quella più vera"*.
  **Stessa Pietra, stesso giro, stessa lezione, stessa frase-firma** di EP_N2_08. In più si
  auto-dichiara *"Casella 7 del viaggio (giro 2)"* — ma la casella 7 del libro è EP_N2_07.
- Il titolo aggrava: "Il Sussurratore che Indovina" (51) vs "Il Sussurratore di Parole" (07) —
  per un lettore sono lo stesso episodio.

**PROPOSTA:** non cancellare (regola additiva). Riclassificare EP_N2_51 in `episodes.json`
come **richiamo/ripasso** (la "ripetizione spaziata" di PERCORSO_EVOLUTIVO §1.2 prevede proprio
carte-richiamo!) oppure ri-angolarlo al primo re-emit: c'è un giro 3 di ⟡3 vero e non coperto —
*"perché il Sussurratore parla meglio se gli parli meglio"* (il prompt: la domanda è metà della
risposta). Comunque: togliere l'auto-dichiarazione "Casella 7". Nota bene: la regola "gli episodi
auto-generati dichiarano una casella" andrebbe nel generatore — le schede di ampiezza devono
dichiarare **Pietra+giro, mai casella** (le caselle sono solo del libro).

### F7 — EP_N2_10 vs EP_N2_17: due episodi ⟡1 senza vera differenza di giro

- `EP_N2_10` (⟡1 giro 1): *"le cose che facciamo bene e che documentiamo non muoiono con noi:
  diventano semi"*.
- `EP_N2_17` (⟡1 giro 2): *"un gesto documentato diventa un insegnamento che vive oltre il
  momento"*. E il titolo di 17 ("La Traccia") è il vecchio titolo della casella 10 in
  `INDICE_CAMMINO.md:52` — confusione da migrazione.
- La spirale (PERCORSO §1.1) chiede che il giro 2 vada **più a fondo**, non che ridica la stessa
  cosa con parole diverse. Qui manca il gradino: giro 2 naturale di ⟡1 = *la traccia che si può
  interrogare* (non solo "resta": risponde — è il ponte verso ⟡4 RAG) oppure *la traccia
  sbagliata* (una nota vecchia non aggiornata insegna l'errore: la traccia va curata).

**PROPOSTA:** al primo re-emit, dare a EP_N2_17 uno dei due angoli sopra e (quick-win subito)
aggiornare in `episodes.json` il campo concetto per differenziarli nella vista PIETRE.

### F5 — "Guardiano": una parola, due Pietre (àncora dual-coding diluita)

Il dual coding (PERCORSO_EVOLUTIVO §1.3 e §5: *una key-image per Pietra, sempre uguale*) è il
motore mnemonico della serie. Ma "guardiano/guardia/che-non-dorme" oggi copre concetti diversi:

| Episodio | Pietra | Concetto reale |
|---|---|---|
| `EP_N2_13` Il Battito del Guardiano | ⟡6 | watchdog (guasto silenzioso) |
| `EP_N2_23` Il Guardiano che Non Dorme | ⟡2 | news watcher (RSS/GitHub) — `PIETRE.md:63` |
| `EP_N2_26` La ruota dei guardiani | ⟡2 | tier a rotazione 48h |
| `EP_N2_44` Il Turno di Guardia | ⟡6 | errori visti/detti/riparati |
| `EP_N2_31` Il Cruscotto che Non Dorme | ⟡5 | dashboard |

In più `EP_N2_23` ha ereditato ESATTAMENTE il titolo del vecchio EP_N2_16 archiviato
(`_ARCHIVIO/reemit_20260623_155229/…/EP_N2_16_il_guardiano_che_non_dorme.md`) che però era il
watchdog ⟡6 — la stessa parola ha *cambiato Pietra* nella migrazione.

**PROPOSTA (quick-win):** una riga di lessico nel `NINA_V2_CHARACTER_BIBLE.md` §REGOLE (è il posto
delle costanti): *"«guardiano» è riservato a ⟡6 (chi veglia sul sistema); chi guarda FUORI (⟡2,
watcher/news) è la «vedetta» (o «sentinella alle finestre», cfr. EP_N2_25)."* Applicarla ai titoli
solo al prossimo re-emit (additivo).

### Echi buoni (da NON toccare — anzi, da dichiarare)

- `EP_N2_04` "La Mappa che Non Mente" ↔ `EP_N2_50` "Il semaforo che mente": è la stessa verità
  ricorrente (*controlla i fatti, non le parole*) vista da ⟡5 e ⟡7 — richiamo spaziato perfetto.
  Quick-win: dichiararlo (campo `richiama` di EP_N2_50 → EP_N2_04) così il grafo lo vede.
- Il "test della sarta" c'è in **tutti** i 51 (verificato via grep) e i 3 strati
  bottoni=bambino / sarta=grande / pizzicore=cuore reggono bene nei campioni letti (01, 02, 03).
  Lo strato fondo è sempre misurabile (100 cicli vs 10-20 in `EP_N2_01:100`; ±0,5 vs ±0,1 mm e
  50-100 g vs 200-300 g in `EP_N2_02:152`; deviazione = spostamento × N in `EP_N2_03:130`). Solido.

### F8 — Buco di verifica qualità: EP_N2_16-19 e 51

`QUALITA_BATCH_44.md:20-21` certifica il batch **20→50**. Ma il canone contiene anche 16, 17, 18,
19 e 51, arrivati fuori da quel controllo (e infatti 51 e 17 sono i due con problemi trovati qui).
**PROPOSTA (quick-win):** girare lo stesso protocollo (canon_guard + lettura campione) sui 5
scoperti e annotarlo in QUALITA_BATCH_44 (append).

---

## 3 · PREAMBOLO vs EPISODI + CAROSELLI (ritmo e pipeline)

**La distinzione anagrafica/storia è rispettata e giusta:** PRE_01 (cos'è, 17 slide), PRE_02
(come funziona, 16), PRE_03 (scheda personaggi, 17) presentano; gli EP raccontano; Nina si
presenta viva dentro EP_N2_01 (cold open in medias res, `EP_N2_01:40-50`), non in un episodio
dedicato. Densità coerente col canone (social snello / episodi ricchi). Nessuna violazione.

### F6 — La pipeline caroselli non rispetta la propria convenzione

`POSTER/CAROSELLI/README.md:30-31` impone nomi canonici (*"carosello.html … così uno script può
ciclare su tutte le cartelle"*). Realtà (verificata su disco):

- I sorgenti si chiamano `ep 1.html`, `ep 2.html`, `pre 01.html`, `pre 2.html`, `pre 03.html`
  (spazi nel nome, zero-padding incoerente). Nessun `carosello.html` esiste.
- `EP_N2_01/README.md:15,25-33` dice "8 slide" ed elenca le 8 vecchie — l'HTML reale ne ha **16**
  (contate: 16 in `ep 1.html`, 16 in `ep 2.html`) e `slides/` ha 16 PNG. Il README fotografa la v1
  archiviata in `_VERSIONI/v1_8slide_2506/`.
- L'indice caroselli (`CAROSELLI/README.md:57-60`) elenca solo EP_N2_01 — manca EP_N2_02 (fatto)
  — e la tabella PREAMBOLO (`:52-55`) non ha PRE_03 (fatto, con `_VERSIONI` fino a v5).
- Il diagramma pipeline (`:45`) dice ancora "8 slide" mentre lo standard è 15-20
  (`BIBBIA_VISIVA_CAROSELLI.md:61`).
- `PRE_03/` non ha né `README.md` né `caption.txt` (le altre cartelle sì).

**PROPOSTA (quick-win, 20 min):** rinominare i 5 HTML in `carosello.html` (o, se i nomi servono ad
Adobe, aggiornare la regola del README alla realtà — una delle due, non entrambe a metà);
aggiornare README EP_N2_01 alle 16 slide; completare l'indice (EP_N2_01 ✅, EP_N2_02 ✅, PRE_01/02/03 ✅);
aggiungere README+caption a PRE_03. Il ritmo interno delle 16 slide di EP_N2_02
(`EP_N2_02/README.md:28-31`: cover → cold open → 3 beat-atto → frase-chiave → strato grande →
chiusura → open loop+provalo tu) è il **template giusto**: usarlo come stampo dichiarato (una riga
nella BIBBIA_VISIVA §6B) invece di lasciarlo implicito.

---

## 4 · PROSSIMI EPISODI — proposte

Ordine di produzione consigliato (coerente con `PRODUZIONE_NINA.md:31-33`: si produce nell'ordine
del cammino):

1. **Carosello EP_N2_03 — "la Misura"** (traccia completa sotto). Salda F2 e mantiene la promessa
   pubblicata nella slide 16 di EP_N2_02.
2. **Carosello EP_N2_04 — "La Mappa che Non Mente"** (⟡5 giro 1). Fortissimo per il social: è la
   tesi del prodotto reale (dashboard/stato live) — il carosello che parla anche ai grandi di
   "sistemi che dicono la verità". Gemello del reel 4 già scritto (`REEL_NINA.md:55-59`).
3. **Episodio nuovo ₣2 — "Spendere Meno di Quanto Entra"** — Pietra dichiarata e vuota da
   settimane (`PIETRE.md:165-167` "*da posare*"). Nina ha appena imparato cos'è il gettone
   (EP_N2_15): il passo dopo è il **secchio col buco** — non conta quanto entra, conta quanto
   resta. Test della sarta: la paghetta della settimana in tre barattoli. Strato grande: flusso ≠
   stock; il BEP dell'officina (61 ore) è lo stesso concetto. Chiude il salto laterale aperto da
   `INDICE_CAMMINO.md:57` (→ ₣2/₣3) che oggi non porta da nessuna parte.
4. **Episodio nuovo ⟡6 giro 3 — "I Sette Fabbri"** (l'attacco multi-agente): concetto reale
   freschissimo (questa stessa revisione: 7 specialisti, ognuno attacca un dominio, propose-only).
   Lezione: *tanti occhi diversi sulla stessa cosa vedono ciò che un occhio solo non vede — ma
   nessuno tocca il pezzo: propongono al costruttore.* Grounding: `DOCS/ATTACCO_20260702/_PIANO.md`.
5. **Riclassifica EP_N2_51 → carta-richiamo** di ⟡3 (v. F3) — costo quasi zero, ripara la
   collisione di casella.

---

## TRACCIA DETTAGLIATA — Carosello/episodio EP_N2_03 · "LA MISURA"

> **Decisione di incastro (una riga di perché):** non serve un episodio nuovo — `EP_N2_03
> Mille Volte Uguale` È già l'episodio della misura (calibro, riferimento zero, "misura ogni
> cinque"): il carosello lo presenta sotto la lente **"la Misura"** promessa da EP_N2_02, e due
> micro-edit additivi (F2) sigillano la catena 2→3. Una sola verità, zero riscritture.

**Titolo carosello:** *La Misura — mille volte uguale* (kicker di copertina: `⟡0 · giro 3 · LA MISURA`)
**Episodio fonte:** `EP_N2_03_mille_volte_uguale.md` · Pietra ⟡0 giro 3 · Casella 3
**Tema (1 riga):** la deriva è invisibile all'occhio — la vedi solo misurando contro un
riferimento fermo, ogni N volte; una volta giusta è fortuna, mille volte uguale è metodo.
**Formato:** 16 slide · 1080×1350 · blueprint SVG narrativo, famiglia PRE_*/EP_N2_01-02
(`BIBBIA_VISIVA_CAROSELLI.md` §2-5: thread oro con bead-⟡ che avanza, slot `[ Nina ]`/`[ Themis ]`,
niente foto, palette ⟡0 `#f4b65a` su fondo `#1a2440→#05070d`).

**I 3 strati:**
- **bambino (bottoni):** il quaderno di musica dove le note scappano dal rigo "da sole", e i
  venti chiodi di FORGE tutti da 11 mm — tranne uno.
- **grande (sarta):** ogni punto spostato di 0,5 mm = 5 cm fuori dopo 100 punti (deviazione =
  spostamento × N); la riga di gesso è la calibrazione: confronto periodico con uno zero **esterno**
  al sistema; ripetibilità = stesso metodo, stesso strumento, stesse condizioni, stesso risultato.
- **cuore (pizzicore):** "MA QUANDO è diventato sbagliato?" — mai, e sempre: nessuno ha sbagliato
  in grande. Anche la memoria deriva. Per questo il papà ti dà un calibro, non una risposta.

**Arco 16 slide:**

| # | Slide | Beat | Scena SVG (blueprint) |
|---|-------|------|------------------------|
| 1 | Cover | *"Il nemico non grida. Sposta le cose di un soffio alla volta."* + titolo | pentagramma le cui note derivano fuori dal rigo; bead-⟡ sul filo oro alla tacca 3 |
| 2 | Cold open | La Giuntura di notte; Nina trova il quaderno di musica: le prime righe perfette | quaderno aperto, righe 1-10 in ordine |
| 3 | Il pizzicore | Riga 12 giusta, riga 15 quasi, riga 20 le note galleggiano. «Quando è diventato sbagliato?» «Piano piano.» | zoom progressivo a 3 pannelli sulla stessa pagina |
| 4 | La cucitura | Il test della sarta: ogni punto giusto, l'insieme storto — 0,5 mm × 100 = 5 cm | linea di cucitura che curva dolcemente fuori asse, quota `0,5 mm` ripetuta |
| 5 | Il nome del nemico | «Si chiama deriva. E la forza dietro ha un nome vero: l'**Entropia**.» | texture ruggine/polvere che avanza dal bordo — MAI una faccia (canone `NINA_V2_CHARACTER_BIBLE.md:43-47`) |
| 6 | Perché l'occhio non basta | Lo spostamento è più piccolo di quello che vedi. L'occhio si abitua; **lo strumento no** | occhio vs calibro sullo stesso mezzo millimetro |
| 7 | LA MISURA | *Misurare = confrontare con un riferimento che non si sposta.* Non "mi sembra": un numero | il calibro di FORGE aperto sulla quota, grande, da eroe |
| 8 | La riga di gesso | Il riferimento fermo della sarta: lo zero a cui tornare, segnato PRIMA di cucire | mano che tira la riga di gesso col righello |
| 9 | Ogni N volte | Non controlli una volta: ogni dieci punti, ogni cinque chiodi. Il ricontrollo è il mestiere | timeline di punti con tacche di controllo evidenziate |
| 10 | I venti chiodi | FORGE: 11 mm, 11 mm, 11 mm… **11,5** al quindicesimo. «Il fuoco è cambiato.» | fila di 20 chiodi, il 15° evidenziato rosso con quota |
| 11 | La cassa dei rifiuti | Misurare ti fa scartare **in tempo**: 5 chiodi fuori, non 500 | cassetta con 5 chiodi separati; bilancia costo piccolo/costo enorme |
| 12 | La frase-chiave | *«Una cosa giusta una volta è fortuna. Mille volte uguale è metodo.»* | slide tipografica pura (Playfair), thread oro passante |
| 13 | Strato grande | deviazione totale = spostamento × N · calibrazione = confronto periodico con zero esterno · vale in officina, in medicina, in cucina | formula quotata a blueprint + 3 icone (calibro/provetta/bilancia) |
| 14 | Anche la memoria | «Il bambino del quaderno aveva solo la memoria dell'ultima nota. E la memoria deriva.» → *non ricordare: controlla, documenta* | la nota copiata dalla nota copiata dalla nota, sempre più su |
| 15 | Chiusura | La casella 3 si accende (rame lucidato); Nina col calibro in tasca. Il Disordine arretra di un passo | Mappa Viva, pedina sulla casella 3, texture-Entropia che si ritira |
| 16 | Open loop + Provalo tu | *«E se lo spostamento fosse troppo piccolo per vederlo — chi te lo dice?»* → Casella 4: **La Mappa che Non Mente** · Provalo tu: copia 10 volte una linea a mano libera vs col righello fisso | freccia sul filo oro verso la bead 4 + mini-scena delle 10 linee che derivano |

**Coerenze da rispettare in build:** piede `⟡0 · NINA · n/16`; parole illustrate: *deriva* (linea
che scivola), *misura* (calibro oro), *Entropia* (texture ruggine); slot illustratore `[ Nina ]`
slide 2-3-15, `[ Themis ]` slide 5-6, `[ FORGE mani ]` slide 10 (canone: personaggi via
illustratore, `BIBBIA_VISIVA_CAROSELLI.md:88-93`).
**Caption (bozza):** "Nessuno ha sbagliato in grande. Eppure alla riga venti le note sono fuori
dal rigo. Si chiama deriva — e si batte con una riga di gesso. EP_N2_03, la storia della buonanotte
sulla misura. #titaniumos #nina"

---

*Report additivo, propose-only. Nessun file di canone modificato: tutte le correzioni sopra sono
proposte con file:riga per l'esecuzione a mano o in sessione dedicata.*
