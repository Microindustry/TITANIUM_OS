<!-- TOC -->

- [TITANIUM_OS  S2E07](#titaniumos-s2e07)
  - [La Macchina Non Dorme](#la-macchina-non-dorme)
    - [COLD OPEN](#cold-open)
  - [ATTO I  IL LABIRINTO META](#atto-i-il-labirinto-meta)
  - [ATTO II  18 SU 21](#atto-ii-18-su-21)
  - [ATTO III  LA SLIDE-PONTE](#atto-iii-la-slide-ponte)
    - [CHIUSURA](#chiusura)
  - [reel_hook](#reelhook)
  - [FATTI (per il RAG)](#fatti-per-il-rag)

<!-- /TOC -->

# TITANIUM_OS — S2E07
## "La Macchina Non Dorme"

---

### COLD OPEN

È le 23:47 di un lunedì di luglio.

La taverna è silenziosa. Il tornio non gira, la saldatrice è spenta, il piano di V32 non esiste ancora — c'è solo la forma di ciò che sarà, in Epoxy Granite, in attesa. Sul monitor ci sono undici finestre aperte. Una è Meta Business Suite. Una è un file chiamato `_MESSAGGI_OUTREACH.md`. Una è un calendario con date cerchiate in arancione.

Matteo non sta costruendo niente di fisico stanotte.

Sta costruendo la presenza.

---

## ATTO I — IL LABIRINTO META

Ci sono problemi che non hanno una soluzione elegante. Ci sono solo soluzioni che funzionano.

Meta Business Manager è uno di quei sistemi che sembra progettato da qualcuno che non ha mai dovuto usarlo sul serio. Hai un profilo personale. Hai un profilo business. Hai un account pubblicitario. Hai una pagina. Hai un profilo Instagram. Questi cinque oggetti possono essere collegati in circa quaranta modi diversi, e trentasette di questi modi generano un errore o una limitazione che scopri solo dopo averci cliccato sopra.

La sessione #67b inizia con un problema preciso: gestire due profili distinti — `@benenatimatteo.mb` (il sistema, MIMS, tutto il mondo industriale) e `@ilmondodinina.ms` (il centro estetico, Eva, Maria) — senza che i permessi di uno intralcino l'altro. La soluzione che funziona è controintuitiva: tutto passa da Matteo come owner su `benenatimatteo.mb`, non dai profili Instagram limitati. Gli account IG sono agganciati alla Pagina. La Pagina è agganciata al Business Manager. Il Business Manager obbedisce all'owner.

Una volta capito questo, il labirinto smette di essere un labirinto. Diventa solo un percorso lungo.

La Pagina Facebook "Il Mondo di Nina" viene creata e collegata a `@ilmondodinina.ms`. La coppia FB+IG è viva. Business Suite può pubblicare in automatico.

---

## ATTO II — 18 SU 21

Il numero che conta non è 21. È 18.

21 è il totale dei post previsti prima che Matteo parta per sette giorni. 18 è quanti sono già programmati con data certa — il sistema pubblica da solo, senza che nessuno prema un tasto. 3 sono bloccati da un tetto tecnico di Meta: non si può programmare oltre 29 giorni nel futuro. Questi tre post esistono, sono pronti, ma devono aspettare il rientro. Nel calendario c'è già il promemoria per il 30 luglio.

La distribuzione è questa: il profilo Sistema (V32, MIMS, VULCAN, GENESIS) ha 10 post su 11 programmati, fino al 18 agosto con il post su VULCAN. Il profilo Nina ha 8 post su 10 programmati, fino al 16 agosto con EP_N2_04.

Ogni carosello è generato da un sistema preciso. C'è una guida operativa — `GUIDA_CAROSELLI.md` — che non lascia spazio all'improvvisazione. La struttura è questa: si parte sempre da `_TEMPLATE/carosello_base.html`, mai dall'episodio precedente (regola anti-drift F12, che esiste perché il drift è successo davvero e ha creato problemi). Si definisce il frontmatter: casella, competenza, prova reale, guida, pietra, voce. Si generano i sorgenti con `_build_*.py`, si renderizza con `_render_all.py`, si ottengono i PNG in `slides/` e `slides_social/`. Il QC automatico — `caroselli_qc.py` — verifica tutto in modo ricorsivo su ogni cartella sotto `CAROSELLI/`.

I caroselli vivono in binari separati: `CAROSELLI/NINA/` e `CAROSELLI/SISTEMA/`. Questo è stato deciso il 13 luglio (riordino #59, 15 luglio) e non si discute più.

Questa sera si scopre che EP_N2_04, EP_N2_05, EP_N2_06 erano in `_BOZZE` per errore — erano già programmati e in coda. Vengono spostati in `CAROSELLI/NINA/`. È un errore di organizzazione, non di contenuto. Viene corretto.

---

## ATTO III — LA SLIDE-PONTE

Il dettaglio tecnico più piccolo della sessione è quello che potrebbe avere l'impatto più lungo.

I due profili — il sistema industriale e il mondo di Nina — vivono in universi diversi. Audience diversa, tono diverso, contenuto diverso. Ma c'è una persona che li tiene insieme: Matteo. E quella connessione, se non viene resa esplicita, rimane invisibile.

La slide-ponte risolve questo in modo chirurgico. Sulla slide 8 dei caroselli-ponte PRE_04 e PRE_SG_04 viene aggiunto l'@mention dell'altro profilo. Chi segue il sistema industriale vede un rimando a Nina. Chi segue Nina vede un rimando al sistema. Non è una campagna pubblicitaria. È un filo.

Il tool che genera questa slide è `_render_slide.py` — rigenerato per l'occasione. Il CSS viene da `tokens.css`, che è l'unica sorgente di stile. Niente hardcoded, niente eccezioni.

Poi Matteo scrive `_MESSAGGI_OUTREACH.md`. Dieci DM universali, uno per microindustry, uno per Nina. Non sono messaggi di vendita — sono aperture. Il modo in cui una community cresce non è attraverso annunci, è attraverso conversazioni singole, una alla volta, con persone reali.

A mezzanotte passata, il commit chiude la sessione #67b. Matteo parte domani per sette giorni.

Il sistema pubblica da solo.

---

### CHIUSURA

C'è qualcosa di strano nel costruire qualcosa che funziona mentre sei assente.

Le macchine fisiche si fermano quando ti fermi tu. La saldatrice non salda da sola. Il piano di V32 non si fresna da solo. Il corpo della VULCAN non si assembla da solo. Ogni millimetro richiede la tua presenza, le tue mani, il tuo occhio.

Il sistema digitale no. Lui continua.

Non è autonomia nel senso romantico della parola. È pianificazione. Sono stati necessari due giorni di lavoro per costruire diciotto momenti di presenza automatica. Il lavoro è già stato fatto — è solo distribuito nel tempo.

Matteo lo sa. Non c'è magia. C'è solo un sacco di lavoro fatto prima, che permette un po' di silenzio dopo.

Il 30 luglio, al rientro, ci saranno tre post da caricare. Il calendario lo ricorderà.

La taverna aspetterà.

---

## reel_hook

18 post programmati. 2 profili. 7 giorni via.
Il sistema pubblica da solo — non perché sia intelligente,
ma perché qualcuno ci ha passato sopra due notti intere.
3 post bloccati dal tetto 29 giorni di Meta: pronti, in attesa, al rientro.
La presenza non è costanza — è infrastruttura.

---

## FATTI (per il RAG)

- **DECISIONE**: Gestione dual-profile Meta (Sistema + Nina) tramite Matteo owner su `benenatimatteo.mb`; profili IG agganciati a Pagine FB, Business Suite gestisce la programmazione automatica.
- **LOGICA**: I profili IG limitati non hanno i permessi per gestire la pubblicazione cross-account; l'owner del Business Manager bypassa questa limitazione strutturalmente.
- **DECISIONE**: 18/21 post programmati con date certe entro il 21/07; i 3 rimanenti bloccati dal tetto tecnico Meta di 29 giorni, promemoria Calendar al 30/07.
- **LOGICA**: Meta Business Suite non permette programmazione oltre 29 giorni nel futuro; i post esistono e sono pronti, il blocco è solo temporale.
- **DECISIONE**: EP_N2_04/05/06 spostati da `CAROSELLI/_BOZZE/` a `CAROSELLI/NINA/`; erano già in coda programmata ma catalogati nella cartella sbagliata.
- **OBIETTIVO**: Al rientro (30/07) caricare i 3 post mancanti; prossima milestone social: VULCAN post 18/08 (Sistema) e EP_N2_04 16/08 (Nina).
- **DECISIONE**: Slide-ponte con @handle cross-profilo aggiunta sulla slide 8 di PRE_04 e PRE_SG_04, generata con `_render_slide.py` da `tokens.css`.
- **LOGICA**: Rendere esplicita la connessione tra i due profili senza rompere la separazione di tono e audience; un @mention sulla slide-ponte è il minimo intervento con massima visibilità.

---

| Campo | Valore |
|---|---|
| **Episodio** | S2E07 |
| **Data** | 2026-07-21 |
| **Sessione** | #67b |
| **Milestone** | Lancio social vivo — 18/21 post programmati |
| **Progetti attivi** | EVA, GENESIS, V32 (65%), GENESIS (70%) |
| **Prossimo step** | 30/07 — caricamento 3 post rimanenti post-tetto Meta |
| **Tag** | `social` `meta` `caroselli` `EVA` `dual-profile` `automazione` |