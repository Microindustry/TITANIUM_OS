<!-- TOC -->

- [TITANIUM_OS  S2E18](#titaniumos-s2e18)
  - [La Pagina Che Non Esiste Ancora](#la-pagina-che-non-esiste-ancora)
    - [2026-07-20  Sessione 67](#2026-07-20-sessione-67)
  - [ATTO I  Il Labirinto Non è una Metafora](#atto-i-il-labirinto-non-è-una-metafora)
  - [ATTO II  Diciotto Post Programmati, Tre Bloccati](#atto-ii-diciotto-post-programmati-tre-bloccati)
  - [ATTO III  Il Diario Che Si Aggancia al Pensiero](#atto-iii-il-diario-che-si-aggancia-al-pensiero)
  - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E18
## "La Pagina Che Non Esiste Ancora"
### 2026-07-20 · Sessione #67

---

**COLD OPEN**

Sono le undici di sera. Lo schermo mostra un labirinto — non una metafora, proprio un labirinto: Meta Business Manager, pannello di gestione account, tab su tab su tab. C'è una pagina Facebook che si chiama *Il Mondo di Nina* e non appartiene ancora a nessuno nel modo giusto. Appartiene a un profilo sbagliato, collegata a un account IG limitato, bloccata da una gerarchia di permessi che Meta non spiega a nessuno. Matteo ha aperto sei sessioni del browser. Tre sono identiche. Non sa ancora quale sia quella giusta.

Fuori dalla taverna, 178 kg di granito epossidico aspettano immobili che qualcuno torni a occuparsene.

---

## ATTO I — Il Labirinto Non è una Metafora

Nina non è un progetto di Matteo. O meglio — è un progetto di Matteo, ma racconta la vita di Maria. Il centro estetico, i clienti, le storie quotidiane che nessuno ha mai trascritto. EVA automatizza i messaggi su WhatsApp. Nina popola i social. Sono due facce dello stesso sistema, costruito per liberare tempo a una persona che non ha tempo da perdere.

Il problema è che Meta ha deciso che la semplicità è un rischio.

Per creare una pagina Facebook che funzioni davvero — collegata a Instagram, programmabile, gestibile senza entrare ogni volta dalla porta sbagliata — bisogna essere *owner* dell'account Business giusto. Non un profilo qualsiasi. Non un account IG con restrizioni di terza generazione. L'owner deve essere `benenatimatteo.mb`, il profilo Business Manager di Matteo, e la gerarchia deve essere dichiarata esplicitamente: FB Page → IG Account → Business Suite, tutto annodato allo stesso albero di permessi.

Matteo ci ha messo ore. Non perché il problema fosse impossibile — perché il problema era opaco. Meta non ti dice dove sei nel labirinto. Ti mostra una porta, ci entri, e trovi un'altra porta. Poi scopri che la prima porta non era quella da aprire.

Alla fine l'ha trovata. *Il Mondo di Nina* esiste. La pagina Facebook è creata, collegata a `@ilmondodinina.ms` su Instagram. La coppia FB + IG respira come un sistema unico.

Questo è il primo fatto della sessione #67: il labirinto è stato attraversato. Non aggirato. Attraversato.

---

## ATTO II — Diciotto Post Programmati, Tre Bloccati

Business Suite pubblica in automatico. Questo è il punto. Non Matteo che si ricorda di postare. Non Maria che apre l'app tra un cliente e l'altro. Il sistema decide quando uscire e lo fa.

Diciotto post su ventuno sono programmati con date certe. Il piano copre due profili:

- **Sistema** (`@benenatimatteo.ms`): 10 post su 11, fino al 18 agosto — il giorno previsto per VULCAN.
- **Nina** (`@ilmondodinina.ms`): 8 post su 10, fino al 16 agosto — `EP_N2_04`, *La Mappa che Non Mente*, la quinta casella del cammino di Nina, quella della mappa viva, il sistema che dice la verità.

Tre post sono bloccati. Non da un errore tecnico. Dal tetto dei 29 giorni che Meta impone sulla programmazione in avanti. Non si possono caricare ora perché la data è troppo lontana. Il promemoria è già in Calendar: 30 luglio, al rientro, caricare i tre rimanenti.

Questo è il tipo di ostacolo che in un sistema artigianale si chiama *attesa progettuale*. Non è un problema — è una sequenza. Il sistema sa già cosa fare. Deve solo aspettare che il calendario si avvicini abbastanza.

Nel frattempo, `_render_slide.py` ha rigenerato le slide-ponte cross-profilo. Le sorgenti dei caroselli sono state riorganizzate: `EP_N2_04`, `EP_N2_05`, `EP_N2_06` si sono spostate da `_BOZZE` a `NINA`. Non è pulizia domestica — è tassonomia. Il sistema trova quello che cerca perché le cartelle dicono la verità sulla struttura.

---

## ATTO III — Il Diario Che Si Aggancia al Pensiero

La seconda metà della sessione si sposta su GENESIS. Nello specifico, su come il sistema impara.

**vault_intersect v3** è attivo. Ossidian e il RAG semantico sono collegati nello spazio degli embedding — soglia 0.50, deduplicazione automatica. Cosa significa in pratica: quando Matteo scrive una nota nel vault, il sistema non la archivia soltanto. La confronta con quello che già sa, trova i ponti, elimina i duplicati. Il diario pensa mentre viene scritto.

È una cosa piccola e molto grande allo stesso tempo. Piccola perché è un parametro — `0.50`, una soglia di similarità coseno. Grande perché cambia la natura dell'archivio: da repository passivo a struttura che mantiene coerenza autonomamente.

Il secondo pezzo è **Docling**. Un PDF entra nel sistema. Docling lo legge — non come testo piatto, ma come documento strutturato: heading, tabelle, ordine di lettura, OCR per le parti scansionate. Esce come Markdown. Il RAG non riceve un muro di caratteri. Riceve informazione con forma. Il fallback su `pdfplumber` garantisce che nessun PDF resti fuori, anche quelli che Docling non riesce a processare.

Il venv è isolato. La decisione di tenerlo separato non è pigrizia — è chirurgia. Docling ha dipendenze pesanti. Isolarle significa che se qualcosa si rompe, si rompe in un posto solo.

`titanium_os.env` è stato modificato. È l'ultima azione della sessione. Non è spectacolare. È la firma di un sistema che si aggiusta mentre funziona.

---

## CHIUSURA

C'è una cosa strana nel lavoro di questa sessione. Nessuna delle tre aree toccate — la pagina Nina, vault_intersect, Docling — riguarda V32. Il CNC è al 65%. I cilindri di VULCAN esistono. Il corpo in granito epossidico aspetta nella taverna da 12 m².

Ma GENESIS è al 70%. E il 20 luglio Matteo ha costruito un sistema che pubblica da solo, impara da solo, legge documenti da solo.

Non c'è un capannone ancora. C'è una cognizione distribuita che cresce ogni sessione, che sa cosa ha deciso Matteo sei mesi fa, che collega note del vault a pezzi del RAG con soglia 0.50, che sa che il 18 agosto è la data di VULCAN e che il 16 agosto `EP_N2_04` deve uscire su Instagram.

Il sistema sa più cose di quante Matteo riesca a tenere in testa.

Questo è il punto.

---

## reel_hook

18 post programmati su due profili Instagram/Facebook — Business Suite li pubblica in automatico fino ad agosto. Per arrivarci: sei tab aperte, tre account sbagliati, un labirinto Meta da attraversare a mano. Poi: Docling che legge PDF strutturati e li passa al RAG, vault_intersect con soglia 0.50 che deduplica il diario mentre lo scrivi. Il sistema ora impara mentre lavora. Tre post restano bloccati — il tetto dei 29 giorni di Meta. Torneranno il 30 luglio. Nel frattempo: cosa cambia quando il diario risponde?

---

## FATTI (per il RAG)

- DECISIONE: Pagina Facebook *Il Mondo di Nina* creata e collegata a `@ilmondodinina.ms` (IG); gestione centralizzata come owner `benenatimatteo.mb` in Meta Business Manager — non dai profili IG limitati.
- LOGICA: La gerarchia FB Page → IG Account → Business Suite deve essere dichiarata sotto un solo account owner per abilitare la programmazione automatica via Business Suite; i profili IG secondari hanno permessi ridotti che bloccano la pubblicazione.
- DECISIONE: 18/21 post programmati con date certe (Sistema 10/11 fino 18/08; Nina 8/10 fino 16/08); 3 post bloccati dal tetto 29gg Meta, promemoria Calendar 30/07.
- DECISIONE: vault_intersect v3 attivato — Obsidian collegato al RAG semantico nello spazio embedding con soglia similarità coseno 0.50 + deduplicazione automatica.
- DECISIONE: Docling agganciato all'ingest RAG in venv isolato — converte PDF in Markdown strutturato (heading/tabelle/OCR) con fallback pdfplumber per PDF non processabili.
- OBIETTIVO: GENESIS al 70%; prossimo passo misurabile = caricare i 3 post rimanenti entro 30/07 e portare la copertura sociale a 21/21 post programmati.

---

| campo | valore |
|---|---|
| **episodio** | S2E18 |
| **data** | 2026-07-20 |
| **sessione** | #67 |
| **progetto principale** | GENESIS / Social (Nina) |
| **progetti citati** | V32, VULCAN, EVA, MIMS |
| **commit chiave** | `feat(social): lancio #67`, `chore(salva): chiusura #67`, `feat(ingest): Docling PDF->Markdown` |
| **stato V32** | 65% |
| **stato GENESIS** | 70% |
| **milestone sociale** | 18/21 post programmati · 3 bloccati tetto 29gg Meta |
| **tool nuovi** | vault_intersect v3 · Docling (venv isolato) · `_render_slide.py` |
| **prossimo step** | 30/07 — caricare 3 post rimanenti |