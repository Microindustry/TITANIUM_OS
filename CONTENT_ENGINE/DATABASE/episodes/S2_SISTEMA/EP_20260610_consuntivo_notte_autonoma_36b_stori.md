<!-- TOC -->

- [TITANIUM_OS  S2E09](#titaniumos-s2e09)
  - [La Spina Dorsale di Nina](#la-spina-dorsale-di-nina)
    - [Come si chiude un arco narrativo alle 3 di notte](#come-si-chiude-un-arco-narrativo-alle-3-di-notte)
  - [COLD OPEN](#cold-open)
  - [ATTO I  Il Problema dei Due Assi](#atto-i-il-problema-dei-due-assi)
  - [ATTO II  Chiudere lArco](#atto-ii-chiudere-larco)
  - [ATTO III  Il Sistema Verifica Se Stesso](#atto-iii-il-sistema-verifica-se-stesso)
  - [CHIUSURA](#chiusura)
  - [REEL_HOOK](#reelhook)
  - [METADATI EPISODIO](#metadati-episodio)

<!-- /TOC -->

# TITANIUM_OS — S2E09
## "La Spina Dorsale di Nina"
### *Come si chiude un arco narrativo alle 3 di notte*

---

## COLD OPEN

Il cursore lampeggia su una riga di terminale.

```
build verde, 148 ep.
```

Non c'è nessuno a leggere quella riga tranne Matteo. La taverna è silenziosa — il CNC fermo, la saldatrice fredda. Sul monitor, una struttura ad albero si popola da sola: ⟡0, ⟡1, ⟡2... fino a ⟡7. Otto regioni. Otto Pietre. Un arco che, tre ore prima, non esisteva ancora nella forma che ha adesso.

Fuori è il 10 giugno 2026. Dentro è la notte autonoma numero 36b.

---

## ATTO I — Il Problema dei Due Assi

C'è una cosa che Matteo capisce bene per lavoro: la struttura prima della forma. Quando salda il titanio per un telaio MotoGP, il giunto deve reggere le forze vettoriali prima di essere bello. La stessa logica si applica a Nina.

Nina è il sistema educativo che cresce dentro GENESIS — un corso tecnico su AI, grafi, automazione, RAG. Non un corso normale: un corso che si costruisce da solo, che sa dove si trova dentro la propria mappa, che segue due assi contemporaneamente.

Il problema di ieri sera era questo: gli episodi esistevano come file Markdown sparsi. 124 episodi costruiti nelle sessioni precedenti. Ma il sistema di build non capiva la loro struttura. Non sapeva chi era padre di chi. Non sapeva a quale livello di profondità si trovava ogni contenuto. E soprattutto — non riusciva a navigare l'arco narrativo di Nina in modo coerente.

La diagnosi era brutale: *124 episodi ma lavoro recente 0 episodi.* Il numero era grande ma la macchina non produceva.

Matteo ha aperto `build_episodes_json.py` e ha cominciato a smontarla.

Il nuovo sistema introduce due assi distinti che viaggiano in parallelo:

**ASSE RUOLO** — determinato dalla stagione. Ogni episodio ha un ruolo didattico: seme, approfondimento, avanzato. Il livello viene calcolato automaticamente da `apply_narrativa()` leggendo il frontmatter.

**ASSE NINA** — l'arco narrativo della protagonista. Nina attraversa otto stadi: ⟡0 La Materia, ⟡1 il Loop, ⟡2 l'Automazione, ⟡3 LLM, ⟡4 RAG, ⟡5 Wiki, ⟡6 Agenti, ⟡7 Orchestrazione.

La build-safe non significa solo che non si rompe. Significa che i due assi possono evolversi indipendentemente senza invalidarsi. Puoi aggiungere un nuovo approfondimento LV2 senza toccare l'arco di Nina. Puoi estendere Nina a ⟡8 senza ristrutturare tutti i ruoli.

Questa è la differenza tra un sistema fragile e uno che si lascia costruire nel tempo.

---

## ATTO II — Chiudere l'Arco

Alle ore che non si dicono, la struttura era in piedi. Adesso si trattava di riempirla.

EP_AV_05 parla di Agenti. EP_AV_06 parla di Orchestrazione. Insieme chiudono la spina dorsale di Nina — da ⟡1 a ⟡7, sette tappe che trasformano un'idea di automazione in un sistema che coordina agenti autonomi.

Scrivere EP_AV_06 in questa sessione ha un sapore particolare. L'Orchestrazione non è solo un argomento tecnico del corso — è quello che Matteo sta facendo in questo momento, su questo schermo, in questa notte. Sta orchestrando GENESIS. Sta decidendo quali agenti parlano con quali sistemi, quali dati fluiscono dove, come una rete di strumenti collabora per produrre qualcosa di coerente.

Il contenuto e il processo si rispecchiano.

C'è anche il blocco `## FATTI` — un requisito del canone a due assi che spesso viene sottovalutato. Ogni seme tecnico chiude con una sezione di fatti strutturati, leggibili dal RAG. Non prosa. Fatti. Punti. Dati verificabili.

La ragione è pratica: ChromaDB deve poter recuperare queste informazioni durante una conversazione. Se la conoscenza è seppellita in paragrafi narrativi, il retrieval diventa rumoroso. Se è esplicitata in fatti puliti, il sistema risponde meglio.

Questo è il confine tra scrivere *per i lettori* e scrivere *per il sistema*. GENESIS deve essere entrambe le cose. Il canone lo impone.

Il `PIETRE.md` viene generato automaticamente da `generate_pietre_index.py` — legge `asse_nina` dal frontmatter di ogni episodio e costruisce l'indice. Nessuna manutenzione manuale. Le otto Pietre si aggiornano da sole quando si aggiunge un episodio.

Stesso principio per la Mappa di Nina: le regioni da ⟡0 a ⟡7 si popolano dai concetti presenti nei file sorgente. La mappa non è disegnata — è derivata. Se cambia il contenuto, cambia la mappa.

---

## ATTO III — Il Sistema Verifica Se Stesso

Prima della sessione notturna, c'era stato un momento importante: il SISTEMA VERIFICA reale.

Non uno script di test automatico — una verifica manuale, sistematica, di ogni componente critico.

Git: pulito. Build TypeScript: zero errori. RAG GPU: operativo. Servizi API: `/api/graph/graphify` e `/api/rag/vectors` erano a 404 e 500. Matteo li ha riavviati. Sono tornati a 200. Il toggle Conoscenza/Sistema nel dashboard era LIVE.

n8n era stato installato globalmente — versione 2.25.6 — e il `START_LOGIN.bat` riagganciato per usare il binario globale con fallback su `npx`. Non l'installazione, ma il fatto che al prossimo riavvio il sistema sappia dove trovarlo.

Questi sono i momenti che non appaiono mai nelle demo. La sessione di "solo manutenzione" che tiene in piedi tutte le altre. Matteo la documenta lo stesso — nella bussola, nello STATE, nella cartella clinica notturna. Non perché qualcuno la leggerà, ma perché la tracciabilità è parte del sistema.

La VISIONE Nina-PRODOTTO è stata catturata nel canone — nella BIBBIA §0-bis. La derivazione educativa di MIMS. Il corso che esiste perché il sistema che lo insegna esiste già nella realtà fisica di una taverna da 12 m². Non è un corso su come costruire sistemi AI. È la documentazione di come uno specifico sistema AI è stato costruito, errori inclusi.

Questo distingue Nina da qualunque altro corso tecnico sull'AI.

Il changelog guida la scaletta. Le sessioni reali diventano episodi reali. L'arco narrativo non è inventato — è estratto da quello che è già successo.

---

## CHIUSURA

`build verde, 148 ep.`

Quella riga sul terminale è il risultato di molte ore di lavoro invisibile. La struttura a due assi non si vede — è nel codice, nel frontmatter, nelle funzioni di build. La mappa di Nina non è stata disegnata — è stata calcolata. L'indice delle Pietre si aggiorna da solo.

Il lavoro di questa notte non produce niente che si possa fotografare. Non c'è un pezzo lavorato, non c'è un connettore stampato, non c'è una corsa in asse sul V32. C'è un sistema che adesso sa dove si trova e dove sta andando.

Per Matteo — che costruisce cose fisiche di giorno e sistemi cognitivi di notte — questa è la stessa cosa. Il V32 al 65% ha una struttura portante. GENESIS al 70% ha adesso una spina dorsale.

Entrambi si costruiscono un pezzo alla volta, con la stessa logica: prima la struttura, poi la forma.

Il capannone è al 2030. Ci sono ancora molte notti.

---

## REEL_HOOK

> 148 episodi. Zero generati nelle ultime sessioni — il sistema produceva ma non costruiva.
> Problema: due assi narrativi non sincronizzati, mappa generata a mano, fatti sepolti nella prosa.
> Soluzione: rebuild-safe con frontmatter strutturato, derivazione automatica, blocchi FATTI espliciti per il RAG.
> Adesso la mappa si aggiorna da sola. La domanda è: quanti sistemi stai mantenendo a mano che potrebbero derivarsi da soli?

---

## METADATI EPISODIO

| Campo | Valore |
|---|---|
| **Episodio** | S2E09 |
| **Data registrazione** | 2026-06-10 |
| **Sessione** | Notte Autonoma #36b / Sessione #35 |
| **Progetto principale** | GENESIS — modulo STORIE / Nina |
| **Progetti secondari** | V32 (65%), MIMS (implicito) |
| **Componenti tecniche** | build_episodes_json.py, asse_ruolo, asse_nina, generate_pietre_index.py, ChromaDB RAG, n8n 2.25.6 |
| **Stato build** | ✅ verde — 148 episodi |
| **Arco Nina** | ⟡1→⟡7 completo (EP_AV_05 + EP_AV_06) |
| **Co-autore AI** | Claude Opus 4.8 |
| **Tono** | Tecnico / Riflessivo |
| **Target 2030** | Capannone — 15 luglio |