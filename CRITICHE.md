<!-- TOC -->

- [CRITICHE  la cartella clinica di TITANIUM_OS (solo le APERTE)](#critiche-la-cartella-clinica-di-titaniumos-solo-le-aperte)
  - [IL POLSO  27/09/2026 20:21](#il-polso-27092026-2021)
  - [CANONE MANUALE  per progetto (solo aperte)](#canone-manuale-per-progetto-solo-aperte)
    - [V32 CNC (2 da fare  5 aperte)](#v32-cnc-2-da-fare-5-aperte)
    - [MIMS (7 da fare  10 aperte)](#mims-7-da-fare-10-aperte)
    - [GENESIS / Dashboard (2 da fare  6 aperte)](#genesis-dashboard-2-da-fare-6-aperte)
    - [Vita Natura (0 da fare  2 aperte)](#vita-natura-0-da-fare-2-aperte)
    - [Identity (0 da fare  2 aperte)](#identity-0-da-fare-2-aperte)
    - [Sistema (trasversale) (1 da fare  4 aperte)](#sistema-trasversale-1-da-fare-4-aperte)
    - [Audit Trimestrale  Cosa Rimuovere (1 da fare  5 aperte)](#audit-trimestrale-cosa-rimuovere-1-da-fare-5-aperte)
    - [Audit Opus  Dati live (1 da fare  2 aperte)](#audit-opus-dati-live-1-da-fare-2-aperte)
    - [Audit 15/06  Opus (0 da fare  1 aperte)](#audit-1506-opus-0-da-fare-1-aperte)
    - [Attacco Opus  17/06 (6 da fare  6 aperte)](#attacco-opus-1706-6-da-fare-6-aperte)
  - [AUTO-AUDIT  aperte (cartella clinica notturna)](#auto-audit-aperte-cartella-clinica-notturna)

<!-- /TOC -->

# CRITICHE — la cartella clinica di TITANIUM_OS (solo le APERTE)

*Vista FILE delle critiche. Fonti di verità = `DATA/audit/critiche_manuali.json` (canone)*
*+ `DATA/audit/critiche_auto.json` (self-audit notturno). Questo file si RIGENERA*
*(night_audit, ogni notte): NON editarlo a mano — per cambiare stato di' a Claude*
*o edita il JSON. La bussola vive in `DA_FARE.md`. Le risolte sono in `CRITICHE_CHIUSE.md`.*

> **Prima di eseguire una critica, verificala (K4).** Una critica **⌛ SCADUTA** non è un
> ordine: è un'ipotesi che nessuno riguarda da più di 30 giorni. Sul backlog vecchio
> 4 voci su 7 erano già fatte. Se è ancora vera: metti la data di oggi in `verificata`
> nel JSON. Se non lo è più: chiudila (`status: done`) e passa in `CRITICHE_CHIUSE.md`.

Stati: `[ ]` attiva · `[⌛]` scaduta (non riverificata da 30+ gg) · `[◐]` bloccata · `[💡]` futura (idea/dopo)

## IL POLSO — 27/09/2026 20:21

- **Canone manuale**: 0 attive · **20 ⌛ scadute** · 0 bloccate · 23 future · 37 risolte (in `CRITICHE_CHIUSE.md`)
- **Auto-audit**: 7 aperte / 300 nel file vivo (si auto-chiudono dopo 4 giorni senza ri-osservazione; le chiuse da 30+ giorni passano in `DATA/audit/critiche_auto_archivio.jsonl`)
- **Bussola**: i to-do vivono in `DA_FARE.md` (non duplicati qui)

---

## CANONE MANUALE — per progetto (solo aperte)

### V32 CNC (2 da fare · 5 aperte)
- [⌛] **Fisico & Build** · Mandrino 2.2kW ER20 non ordinato — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *BLOCKER CRITICO — senza mandrino V32 non funziona, VULCAN non parte, MIMS bloccato. Ordina entro questa settimana.*
- [⌛] **Fisico & Build** · Gusset Z destra bloccato su sinistra — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Dipende dal completamento gusset sinistra. Non è un bug ma una dipendenza reale.*
- [💡] **Fisico & Build** · Verifica planarità dopo Config G
  - *Dopo rinforzi, ri-misurare basamento con comparatore. Target ±0.1mm.*
- [💡] **Fisico & Build** · Epoxy fill colonne — timing non definito
  - *Va fatto dopo saldatura finale, prima di montaggio assi. Mettere in checklist.*
- [💡] **Dati & Coerenza** · BEP 61 ore — aggiornato dopo Config G?
  - *Il BEP è calcolato su configurazione precedente. Rivalutare dopo completion.*

### MIMS (7 da fare · 10 aperte)
- [⌛] **Prodotto** · Eco-Snap: €0.08 (V6) vs €0.30 (V7) — mai risolto — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Discrepanza +275% non chiarita da sessioni precedenti. Quale è il costo reale? Definire prima del GTM.*
- [⌛] **Prodotto** · Fit Park dati base mancanti — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Dimensioni, attrezzi, costo kit non definiti. Rimuovere dalla roadmap o completare con dati reali.*
- [⌛] **Prodotto** · Trade secrets: ricette non documentate in nessun posto sicuro — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Esistono solo in testa a Matteo. Scrivere in _VAULT con cifratura prima di avanzare.*
- [⌛] **Business & GTM — (idea, non ancora)** · TAM €4.2B — fonte Grand View Research verificata? — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Citata ma mai linkato il report originale. Verificare che sia il mercato giusto (modular systems, non solo T-slot).*
- [⌛] **Business & GTM — (idea, non ancora)** · Primo cliente MIMS: chi è? — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Il piano SEED parla di 10 beta. Identificare nome/profilo dei primi 3 prima di produrre.*
- [⌛] **IP & Protezione** · B2 'dopo 100 pezzi venduti' — rischio prior art — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Se qualcuno brevetta la geometria 29.9mm nel frattempo, perdi tutto. Valutare provisional patent subito (costo ~€300).*
- [⌛] **IP & Protezione** · Trade secrets non in _VAULT cifrato — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *TS1-TS4 esistono solo in MENTE/MIMS/ (testo plain). Spostare in _VAULT/KEYS/ con cifratura.*
- [💡] **Prodotto** · MIMS-DMP: δ>0.05 — dato validato o stimato?
  - *Se è una stima, non usarlo come claim brevettuale. Serve test fisico con comparatore vibrazioni.*
- [💡] **Business & GTM — (idea, non ancora)** · SOM Y3 €300-450K — assunzioni di base?
  - *Non c'è un modello finanziario dietro. Costruire foglio di calcolo: unità × prezzo × canale.*
- [💡] **Business & GTM — (idea, non ancora)** · Competitor: nessuno Zero-tool modulare verificato?
  - *Blue ocean claim forte. Fare una ricerca su Kickstarter/Indiegogo prima di usarlo nel pitch.*

### GENESIS / Dashboard (2 da fare · 6 aperte)
- [⌛] **UX / Interfaccia** · MappaView: label si sovrappongono con 6+ nodi — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Con 6 nodi (GENESIS) i testi si toccano. Aumentare R radiale o ridurre font.*
- [⌛] **Infrastruttura** · n8n: 13 workflow non documentati — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *AGGIORNATA 15/06: la contraddizione architetturale è RISOLTA — STATE conferma n8n self-hosted LOCALE (binario globale 2.25.6, localhost:5678, no cloud). Resta il gap doc: i 13 workflow non sono documentati da nessuna parte e AUTOMATIONS_MASTER.md è fermo (vedi au16). Esportare i 13 workflow in un...*
- [💡] **Codice** · CanvasLayout.tsx > 650 righe — monolite
  - *Ogni Room dovrebbe essere un file separato. Refactor quando si aggiunge la prossima sezione.*
- [💡] **UX / Interfaccia** · Sidebar 11 voci — affollamento cognitivo
  - *Per ADHD, meno è meglio. Valutare collasso EVA+IDENTITY in un gruppo, o hide dei meno usati.*
- [💡] **UX / Interfaccia** · CommandBar (Ctrl+K) non discoverable
  - *Nessun hint visibile nella UI. Aggiungere tooltip o hint nella sidebar.*
- [💡] **UX / Interfaccia** · NeuroOSLayout (neuro) e MappaView fanno cose simili
  - *Due topologie per lo stesso sistema. Valutare se neuro è ancora necessario o da rimuovere.*

### Vita Natura (0 da fare · 2 aperte)
- [💡] Sito web Vita Natura: nessun progresso documentato
  - *Ogni sessione si menziona ma non si lavora. Decidere: priorità alta o rimuovere dalla roadmap attiva.*
- [💡] CRM prenotazioni — requisiti non scritti
  - *Prima di costruire il CRM, scrivere 5 user stories con Maria. Senza requisiti si costruisce due volte.*

### Identity (0 da fare · 2 aperte)
- [💡] Content Engine: quanti episodi pubblicati?
  - *La pipeline esiste ma non si sa se è stata usata. Contare episodi esistenti e pubblicati.*
- [💡] AVA avatar YouTube: nessuna azione concreta
  - *Da sessioni fa. Definire: quando? Cosa serve? O toglierla dalla roadmap attiva.*

### Sistema (trasversale) (1 da fare · 4 aperte)
- [⌛] Nessun KPI misurabile settimana per settimana — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *I % di completamento si aggiornano a mano senza criteri chiari. Definire: cosa significa +5%?*
- [💡] Backup _VAULT: AES-256 deep_freeze.py — ultimo run?
  - *Non c'è traccia dell'ultimo backup. Aggiungere timestamp in STATE.json: last_backup.*
- [💡] Capannone 2030: nessuna milestone intermedia con date
  - *L'obiettivo esiste ma non c'è un roadmap con checkpoint annuali. Aggiungere in STATE.json.*
- [💡] ADHD scaffolding: il sistema aiuta o complica?
  - *Ogni sessione si aggiungono cose. Fare un audit trimestrale: cosa NON uso? Rimuovere senza pietà.*

### Audit Trimestrale — Cosa Rimuovere (1 da fare · 5 aperte)
- [⌛] Decidere insieme prima di togliere — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *Questa lista è il PATTO: io segnalo, tu decidi, poi lo facciamo in un commit isolato. Nessuna sorpresa, niente lavoro perso.*
- [💡] View 'neuro' (NeuroOSLayout) — duplicato di MappaView
  - *Già fuori dalla sidebar (solo via Ctrl+K). Fa la stessa cosa di MappaView. Candidato #1 alla rimozione: meno confusione, una sola mappa. Recuperabile da git se serve.*
- [💡] View 'sinapsi' (LayersView) — legacy
  - *Terza topologia dello stesso sistema. Tieni MappaView, valuta di togliere questa. In git resta.*
- [💡] PILLARS_DATA + 8 export no-op in CanvasLayout
  - *Dead-code legacy (CellFocusStandalone & co). Si rimuove SOLO insieme a NeuroOSLayout che li importa. Un colpo solo, sicuro.*
- [💡] Sidebar 12 voci → troppe per ADHD
  - *Collassare il gruppo 'Sistema' a comparsa: a vista solo i 5 pilastri + HOME. Meno carico cognitivo, più presentabile.*

### Audit Opus — Dati live (1 da fare · 2 aperte)
- [⌛] **Percentuali divergenti** · PILLARS_DATA legacy hardcoded in CanvasLayout — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *PARZIALE: IDENTITY allineato 35→50. MA PILLARS_DATA è ancora importato da NeuroOSLayout (view legacy 'neuro') insieme a 8 export no-op (CellFocusStandalone & co.) → non cancellabile senza refactor di NeuroOSLayout. Vero fix: rimuovere la view 'neuro' (duplicato di MappaView, vedi gc09) e tutto il...*
- [💡] **STATE.json marcio** · meta.version '1.0.0' mentre il sistema è v6/v7
  - *STATE.meta.version='1.0.0' non significa nulla: App=v6.0, dashboard=v7, RAG=v5. Campo morto. O lo si allinea o si rimuove.*

### Audit 15/06 — Opus (0 da fare · 1 aperte)
- [💡] Agenti-personaggio: teatro residuo nella vista AGENTI
  - *Gli agenti reali (story/research/audit/watcher/self_improve) girano. I 'personaggi' THEMIS/EVA/AVA/ARIA/NEXUS/TESLA/FORGE sono ancora dichiarati ma non operativi. O li si rende reali o si tolgono dalla vista: oggi è teatro che gonfia la percezione di capacità.*

### Attacco Opus — 17/06 (6 da fare · 6 aperte)
- [⌛] Verità sparsa: i dati-pilastro vivono in 5+ posti (au18 VIVO) — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *FRONTE DATI. Per cambiare lo stato di EVA ho dovuto editare 5 punti (genesisData ×2, MappaView ×2, + STATE). Finché non c'è UNA fonte, ogni verità si sdoppia e i pilastri ri-obsolescono da soli. AVANZATA 08/07 (sess #56): MappaView ×2 ELIMINATO — SYSTEM_TREE ora derivato da mappaData.ts (adapter ...*
- [⌛] Il build di PRODUZIONE non completa (tsc -b / git push → OOM) — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *FRONTE INFRA. `tsc --noEmit` è falso-verde; il gate vero `tsc -b` va in OOM (malloc 500MB) anche con RAM libera, e pure `git push` a volte. Conseguenza grave: non puoi fare `npm run build` né deployare la dashboard. Da indagare: bitness git, repo bloat (git gc), tetto memoria ambiente.*
- [⌛] Chiavi API ancora NON ruotate (esposte, dimostrate) — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *FRONTE SICUREZZA. Il fix /api/file è merged e live, ma le chiavi esfiltrate (ANTHROPIC/GITHUB via .env) restano compromesse finché non le RUOTI a mano. Azione tua, non rimandabile.*
- [⌛] Pilastri FISICI fermi mentre il digitale sprinta — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *FRONTE STRATEGIA. V32 (reddito vero) bloccato su mandrino ER20 + decisione silent blocks; MIMS al 30%. Decine di commit software, zero sul fronte fisico. Rischio: un sistema digitale bellissimo sopra un'officina ferma. La leva di reddito è lì, non nel codice.*
- [⌛] asse_nina 59/182 + numeri pitch non verificati — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *FRONTE CONTENUTO. asse_nina su 59/182 episodi (decisione 'scala' aperta → metadato parziale, ennesimo backfill in arrivo). Pitch: TAM €4.2B senza fonte, BOM vs €2250 incoerenti (già marcati provvisori). Da consolidare prima di un partner.*
- [⌛] critiche_auto: il path a-regole genera rumore basso-segnale — *⌛ scaduta: non riverificata da 84 giorni (05/07/2026)*
  - *FRONTE META. Anche dopo il fix n03 (auto-close), la cartella clinica live mescola findings ricchi (Sonnet) e generici ('rilevato errore nelle ultime esecuzioni', regole). Proposta: usare il path-regole solo come ultima spiaggia e marcarlo a bassa severità.*

---

## AUTO-AUDIT — aperte (cartella clinica notturna)

- [ ] **[media · CANONE]** 26 formulazioni vietate 'componente recuperato/usato/EUR 0' (V32/VULCAN) negli episodi. *(vista l'ultima volta il 24/09/2026)*
  - *azione: Lanciare AUTOMATIONS/tools/fix_recuperato_canon.py --apply (o estendere AUTOMATIONS/core/canon_guard.py se è una frase nuova).*
- [ ] **[media · NOTTURNE]** _CANONE.md: rilevato verita' unica stantia nelle ultime esecuzioni. *(vista l'ultima volta il 24/09/2026)*
  - *azione: Ispezionare DATA/logs/_CANONE.md e correggere la causa.*
- [ ] **[media · NOTTURNE]** organi vivi: rilevato organo silenzioso nelle ultime esecuzioni. *(vista l'ultima volta il 24/09/2026)*
  - *azione: Ispezionare DATA/logs/organi vivi e correggere la causa.*
- [ ] **[media · NOTTURNE]** _CANONE.md: rilevato serie oltre il canone dichiarato nelle ultime esecuzioni. *(vista l'ultima volta il 24/09/2026)*
  - *azione: Ispezionare DATA/logs/_CANONE.md e correggere la causa.*
- [ ] **[media · NOTTURNE]** pip_audit.json: rilevato CVE dipendenze con fix disponibile nelle ultime esecuzioni. *(vista l'ultima volta il 24/09/2026)*
  - *azione: Ispezionare DATA/logs/pip_audit.json e correggere la causa.*
- [ ] **[media · NOTTURNE]** critiche_manuali.json: rilevato canone critiche stantio nelle ultime esecuzioni. *(vista l'ultima volta il 24/09/2026)*
  - *azione: Ispezionare DATA/logs/critiche_manuali.json e correggere la causa.*
- [ ] **[bassa · MIMS]** Pilastro MIMS fermo al 30%. *(vista l'ultima volta il 24/09/2026)*
  - *azione: Definire il prossimo step misurabile per MIMS.*

---
*Rigenerato da `AUTOMATIONS/core/critiche_md.py` — 2026-09-27 20:21*
