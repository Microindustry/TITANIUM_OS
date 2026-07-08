<!-- TOC -->

- [RIPASSO  Sessioni 3256 (06/06  08/07/2026)](#ripasso-sessioni-3256-0606-08072026)
  - [1  LARCO IN UNA PAGINA](#1-larco-in-una-pagina)
  - [2  LE DECISIONI CHE ANCORA GOVERNANO (il canone operativo)](#2-le-decisioni-che-ancora-governano-il-canone-operativo)
  - [3  COSA È VIVO  PARCHEGGIATO  SUPERATO](#3-cosa-è-vivo-parcheggiato-superato)
  - [4  IL CARATTERE  dove abbiamo osato, dove ci siamo impantanati](#4-il-carattere-dove-abbiamo-osato-dove-ci-siamo-impantanati)
  - [5  I NUMERI DEL MESE (misurabile, regola 6)](#5-i-numeri-del-mese-misurabile-regola-6)
  - [6  I FILI APERTI (da qui si riparte)](#6-i-fili-aperti-da-qui-si-riparte)

<!-- /TOC -->

# RIPASSO — Sessioni #32→#56 (06/06 → 08/07/2026)
*Scritto da Claude (Fable 5) su richiesta di Matteo, sessione #56 — 08/07/2026.*
*Scopo: rivedere un mese di lavoro PRIMA di ridisegnare l'ecosistema a 3 facce.*
*Fonti: DA_FARE_FATTO.md (bussola) + BRAIN/STATE.json (74 milestone verificate) + memoria.*

---

## 1 · L'ARCO IN UNA PAGINA

Un mese, cinque fasi. Ognuna ha lasciato qualcosa che oggi GIRA DA SOLO.

**FASE 1 — LA NASCITA DEL MONDO (S32-37 · 06-11/06)**
Nasce il binario AVVENTURA: bibbia del mondo, Nina + THEMIS vs l'Entropia, il
PERCORSO_EVOLUTIVO (spirale + Pietre + 3 strati), l'arco macro "storia dell'IA"
(Loop→Automazione→LLM→RAG→Wiki→Agenti→Orchestrazione) ancorato al progetto REALE.
Nel frattempo: Graphify in produzione (il salto RAG→Wiki), AI News Watcher keyless,
vista CONTROLLO ("il posto unico in italiano semplice" — il lavoro che Matteo cita
ancora oggi come riferimento), N-livelli sui contenuti (il pattern che regge tutto),
arco Nina 8/8 + verticale Finanza. **Fase creativa esplosiva: in 6 giorni il mondo
di Nina è passato da idea a canone.**

**FASE 2 — IL DEBITO (S38-39 · 12-20/06)**
NotebookLM collegato, pitch per-progetto, CV, pilastri a livelli. Ma fatta di fretta:
roba a metà, viste acerbe, chiavi da ruotare. Da qui la correzione di Matteo che è
diventata legge: **"INTEGRA, non rifare"**. E la prima vera cura del vault Obsidian
(da puntini isolati a rete: 106 note sole → 7).

**FASE 3 — LA GUERRA DELL'INFRASTRUTTURA (S40-47 · 22-25/06)**
La settimana più dura e più formativa. Il RAG muore e risorge TRE volte:
llamafactory declassa torch a CPU · il compactor di chromadb 1.x è rotto (pin 0.5.23)
· blackout → HNSW corrotto → recovery a 2 livelli · commit-leak da 56 GB che satura
Windows. Ogni guasto è diventato un ORGANO: self-heal orfani, watchdog, recovery
`--drop-hnsw`, snapshot known-good, guardie stdout. In mezzo: canone VERITIERO
(via il framing "recuperato/EUR 0" da 49 file + canon_guard alla fonte), CRITICHE
azzerate su 3 fonti, de-hardcode `benen`, RAG v4.2 (heading-aware + GraphRAG-lite),
RETE viva (orfani/freschezza/hub). E la decisione che cambia la scala: **Nina =
auto-promozione, niente revisione umana** (grounding + canon_guard + reversibilità
al posto del cancello).

**FASE 4 — NINA PRENDE UN VOLTO (S48-51 · 25/06-02/07)**
Da "poster HTML" a LINGUAGGIO: Adobe Express provato e funzionante, stile
blueprint-anime alla Geronimo Stilton, flusso d'onda continuo tra le slide,
densità "racconto della buonanotte". Il preambolo chiuso in 3 caroselli
(PRE_01 cos'è · PRE_02 come funziona · PRE_03 chi c'è) dopo iterazioni dure
(v1→v10, scarti netti di Matteo: "no per nulla" al fumetto, "stai ripetendo,
sforzati di più" al PRE_03). **Nina ha un volto definitivo** (mora, mix
colombiana+sud Italia, denim) e una regola: ogni futura Nina = quel viso.
EP_N2_01 e 02 rifatti al nuovo standard 16 slide narrative.

**FASE 5 — L'ATTACCO E L'ORDINE (S52-56 · 02-08/07)**
L'ATTACCO ESERCITO: 7 specialisti Fable in parallelo (design/sicurezza/scrittura/
software/news-IA/gestionale/integrità-RAG), 7 report, TOP 10 + backlog ~35 voci.
Filo rosso trovato: *il sistema gira, ma la fonte di verità è stantia in 3 punti,
e 1 ordine hardware sblocca la catena economica*. Poi l'esecuzione a ondate:
Obsidian ecosistema VERO (link rotti 46→0, orfani 14→1), casa in ordine
(smistamento chiavetta, retention 5 regole), 4 sentinelle notturne nuove,
single-instance ovunque, e la cattura in flagrante dello **STATE clobber**
(68 milestone cancellate da un template default — trovato, ripristinato, curato
alla radice con write atomico + snapshot). Chiusura #56: la Mappa DERIVA invece
di copiare (au18), le % hanno un nome, il MASTER stantio declassato ad archivio.

---

## 2 · LE DECISIONI CHE ANCORA GOVERNANO (il canone operativo)

Queste sono LE regole emerse sul campo in queste 25 sessioni. Sono il carattere.

1. **Additivo, mai cancella-e-rifai.** Versioni in `_VERSIONI/`, archivi in
   `_ARCHIVIO/`, git rm recuperabili. Nessun lavoro si butta: si supera.
2. **Integra, non rifare** (#38). Migliora il file che c'è; svuotarlo per metterci
   una cosa più povera = spreco.
3. **Una sola verità.** `_CANONE.md` nel vault, STATE per le %, fonti derivate non
   copiate (au18). Quando la verità si sdoppia, ri-obsolesce da sola.
4. **Decidi, non varianti.** Quando c'è una scelta tecnica giusta: si decide, +1 riga
   di perché (Via B, corpo unico, chromadb 0.5.23, Postiz, canone unico EP_N2).
5. **Ogni guasto diventa un organo.** Blackout → recovery. Clobber → write atomico.
   Doppioni → single-instance. Il sistema impara dai suoi morti.
6. **Il sistema PROPONE, i valori li decide il genitore — ma Nina è AUTO.**
   Codice/sicurezza a cancello umano (SELF_IMPROVE propose-only); contenuti Nina
   auto-promossi con garanzie (grounding + canon_guard + reversibilità).
7. **Grounding sempre.** Ogni generatore (story, Nina, pipeline) interroga il RAG.
   Niente si scrive "a memoria". FATTI per il RAG in ogni episodio.
8. **Il fisico comanda l'economia.** Decine di commit software, ma il BEP passa dal
   mandrino ER20 (~4 mesi fermo). Il software è pronto a RICEVERE; il reddito è in officina.

---

## 3 · COSA È VIVO · PARCHEGGIATO · SUPERATO

**VIVO E AUTONOMO (gira ogni notte, si sorveglia da solo):**
- Catena notturna completa: topics → ricerca → Nina loop → riflusso FATTI →
  rag-update → snapshot → audit (4 sentinelle: organi vivi / canone vault /
  pip-audit / QC episodi) → CRITICHE.md → inventario → retention → push → graphify.
- RAG v4.2: 18.113 chunk allineati (semantico==bm25), heading-aware, canon-pin,
  linkgraph, recovery a 2 livelli, snapshot known-good.
- Nina loop: genera 1 EP/notte grounded (EP_N2_52 stanotte), guardia anti-gemelli,
  QC strutturale. Canone = EP_N2_01…52.
- Vault Obsidian: ~595 note / 3230 ponti / 0 link rotti — ecosistema vero.
- Watchdog + single-instance + STATE atomico + snapshot 14gg.

**PARCHEGGIATO (deciso, in attesa del suo momento):**
- **Social/pubblicazioni**: stack DECISO (Postiz self-hosted + Graph API Meta +
  sito statico repo separato `nina`) — si riprende ORA (sessione #56+).
- **Animatic/voce EP_N2_01**: «attendi con animazione» (Matteo, #43).
- **ASSOLUTO V9 / MIMS scalabilità**: materia di studio, non task.
- **SELF_IMPROVE nodo completo**: esiste propose-only notturno; l'agente pieno
  (branch/PR) viene dopo.
- **Ordine hardware** (mandrino ER20 + martinetto Vevor + UPS): IL tappo. 6-7
  critiche puntano lì.

**SUPERATO (esiste in git/_ARCHIVIO, non si usa più):**
- EP_AV_* (arco vecchio) → origine storica in `_ARCHIVIO`, sostituito da EP_N2.
- Vista CRITICHE → CRITICHE.md notturno. `criticheData.ts` → fallback non importato.
- CORE/watchdog.py, START_GETAC, registrar legacy → superseded/rimossi.
- AUTOMATIONS_MASTER.md → archivio storico (v1.3), verità nelle 4 fonti vive.
- PRE_03 v1-v4, PRE_01 v1-v9 → `_VERSIONI/` (la storia delle scelte visive).

---

## 4 · IL CARATTERE — dove abbiamo osato, dove ci siamo impantanati

**Le vittorie hanno una firma comune: decisione netta + esecuzione totale.**
- Il canone unico EP_N2 (#43): un pomeriggio, 6 step, e Nina ha UNA storia.
- L'attacco esercito (#52): 7 agenti in parallelo sul nostro stesso lavoro,
  propose-only — il sistema che si fa auditare senza paura.
- La notte del clobber (#55): visto un numero sbagliato in uno screenshot →
  trovato il ladro alle 20:40 → 68 milestone ripristinate → cura alla radice.
  Questo è il livello.
- Nina auto-promozione: la scelta CORAGGIOSA (fidarsi delle garanzie, non del
  cancello) che rende il progetto scalabile.

**I pantani hanno anche loro una firma: verità sdoppiata + fretta.**
- #38: rifatto invece di integrato → debito, viste acerbe, giorni persi.
- Le percentuali divergenti: 3 numeri per GENESIS, corretti a mano DUE volte,
  finché non si è curata la radice (fonte unica → derivare, non copiare).
- Il RAG martellato a freddo (commit-leak 56 GB): l'entusiasmo senza guardia
  satura anche Windows. Ora la guardia c'è.
- L'hardware rimandato: il mandrino è il singolo acquisto più citato del mese.

**La lezione per le 3 facce:** ogni volta che abbiamo dato a una cosa il SUO posto
(CONTROLLO per gli strumenti, CRITICHE.md per i guasti, _CANONE per la verità,
_VERSIONI per la storia) il carico mentale è sceso e la velocità è salita.
Le 3 facce sono la stessa mossa, un livello sopra: TITANIUM (il sistema per noi) ·
NINA (il prodotto educativo) · PUBBLICAZIONI (l'output verso il mondo).
E la paura "tutto si basa su Nina" ha la risposta già scritta in queste sessioni:
la FORZA non è mai stata un contenuto, è sempre stata la PIPELINE
(fonte → storia → derivati → mondo). Nina è il primo treno, non la ferrovia.

---

## 5 · I NUMERI DEL MESE (misurabile, regola 6)

| Cosa | 06/06 | 08/07 |
|---|---|---|
| Episodi Nina canone (EP_N2) | 0 | 52 |
| Preambolo caroselli | — | 3 (PRE_01/02/03, 50 slide) |
| Episodi al nuovo standard 16-slide | — | 2 (EP_N2_01, 02) |
| RAG chunk allineati | ~6.500 (instabile) | 18.113 (==, self-heal) |
| Vault: note connesse / link rotti | 384 sparse / 46 rotti | ~595 connesse / 0 |
| Sentinelle notturne | 0 | 4 + watchdog + organi vivi |
| Critiche aperte gestite | ~67 sparse | CRITICHE.md notturno, 3 fonti |
| Milestone verificate in STATE | ~40 | 74 |
| Verità duplicate note | 5+ posti | au18 chiuso (derivazione) |

---

## 6 · I FILI APERTI (da qui si riparte)

**Gated Matteo (nessuno dei quali è software):**
1. Ordine hardware: mandrino 2.2kW ER20 + martinetto Vevor + UPS (~250-350 EUR)
2. Chiave Semantic Scholar gratuita in .env (5 min, azzera i 429 notturni)
3. Trade secrets MIMS in _VAULT cifrato (mezz'ora insieme)
4. Prerequisiti social: mail progetto → pagina FB+IG Business → app Meta dev → Docker Desktop

**Lavoro nostro (in ordine, deciso 08/07):**
1. ~~Ripasso~~ (questo documento)
2. **3 FACCE**: ristrutturazione sidebar/home (TITANIUM · NINA · PUBBLICAZIONI)
3. **Vista PUBBLICAZIONI**: cosa abbiamo trovato + come costruiremo + scaletta attivazione
4. **Analisi VALORE per pilastro** (che prodotto economico è ognuno) — doc MENTE + card home
5. **HR/CV vivo** (la vista CV attuale è rumore — derivare dal grafo competenze + prove reali)
6. Sessione CVE (42 fix, test finetune dopo) · viste doppie neuro/sinapsi · backlog #52
7. EP_N2_03 "la Misura" — già nel formato doppio (social-cut ≤10 + completo 16)
