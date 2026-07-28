<!-- TOC -->

- [AZIONI  SOLO MATTEO (non delegabili al sistema)](#azioni-solo-matteo-non-delegabili-al-sistema)
  - [1 DECISIONE STRATEGICA  sblocca MIMS (BEP  brevetto B2)](#1-decisione-strategica-sblocca-mims-bep-brevetto-b2)
  - [HARDWARE  ordinare / montare](#hardware-ordinare-montare)
  - [CHIAVI .env  5 min ciascuna](#chiavi-env-5-min-ciascuna)
  - [DATO PUNTUALE](#dato-puntuale)
    - [Già chiuse stanotte dal sistema (sess.45, non più tue)](#già-chiuse-stanotte-dal-sistema-sess45-non-più-tue)

<!-- /TOC -->

# AZIONI — SOLO MATTEO (non delegabili al sistema)

*Generato sess.#45 · 2026-06-24 · dalle critiche aperte che un loop autonomo NON può chiudere
(hardware fisico, chiavi segrete, decisioni di dominio/business). Quando ne fai una, dimmelo
e la chiudo nella cartella clinica.*

---

## 🎯 1 DECISIONE STRATEGICA — sblocca MIMS (BEP + brevetto B2)
- [ ] **Connettori MIMS: via A vs via B** *(critiche AUD-4cc527ac79 / AUD-49bd443cde · SCHEDA §5)*
  - **Via A — iniezione esterna:** stampo €15.000, €2,50/pz, ciclo 45s. Volumi alti, finitura. Capitale alto, fuori da VULCAN, processo *standard* (B2 si appoggia a tecnologia non tua).
  - **Via B — compressione VULCAN:** stesso impianto delle tiles, tooling ordine di grandezza inferiore, *dentro il moat-Formula* (B2 su processo proprietario). Ciclo più lento, geometria 3D del giunto più difficile.
  - **Perché solo tua:** non è una scelta tecnica "giusta", è capitale €15k + strategia IP. Il canone lo dice esplicito: *"Da decidere con Matteo — non inventata qui."* È il singolo nodo che sblocca BEP/B2.

## 🔧 HARDWARE — ordinare / montare
- [ ] **UPS ~50-80€** *(AUD-4bf52d5827 / AUD-7e0d0da35d)* — cura alla RADICE della corruzione HNSW da power-loss (3 volte in 2gg). Il fix software (`--drop-hnsw`) è un cerotto ri-applicato a ogni blackout. Stesso checkout del mandrino.
- [ ] **Mandrino 2.2kW ER20** *(AUD-74a2dc9f29)* — prerequisito fresatura stampi MIMS. Identificare fornitore + budget + data.
- [ ] **Martinetto Vevor 3 stadi 20t** — montarlo al centro della pressa VULCAN → prima colata di validazione. È *il vero passo* che sblocca la prima mattonella (MIMS fermo al 30% "waiting_press", AUD-77abb05083).

## 🔑 CHIAVI — ~5 min ciascuna
> ⚠ **CORREZIONE (#69, 28/07): NON metterle in `TITANIUM_OS/.env` — nessuno lo legge.**
> Verificato: zero `load_dotenv()` nel repo; `.env` contiene solo 5 variabili di path. Il solo
> loader è `AUTOMATIONS/core/_ti_paths.bat` → `_VAULT/KEYS/titanium_os.env` (oggi tutto
> commentato, e `eol=#` salta le righe commentate). `ANTHROPIC_API_KEY` funziona perché è una
> **variabile utente Windows**. Quindi: `setx NOME "valore"` (variabile utente) **oppure**
> scommentare la riga in `_VAULT/KEYS/titanium_os.env`. Le critiche che dicono ".env" sbagliano.

- [ ] **SEMANTIC_SCHOLAR_API_KEY** *(AUD-0722e6a2fa / AUD-b35b0846ad)* — gratuita su semanticscholar.org/product/api. Azzera i 429 della ricerca notturna (1 req/s anonimo → 100 req/s). Il codice la legge già se presente (`research_agent._ss_headers`). Misurato #69: S2 torna 0 risultati in **158/195 chiamate (81%)**. NB: il backoff esiste già dal #42 — manca solo la chiave.
- [ ] **Ruotare le chiavi .env del red-team #38** *(AUD-6ed7c6c248 / AUD-a3277f3bed / AUD-e85421edda)* — esposte durante il red-team, ancora attive. Unica azione di sicurezza bloccata su persona fisica.
- [ ] *(opzionale)* **HF_TOKEN** — download modelli più rapidi. NON bloccante: il warning è già silenziato e i modelli sono in cache.

## 📌 DATO PUNTUALE
- [ ] **URL sito di Maria (Vita Natura)** *(AUD-961a04366a)* — serve per chiudere il collegamento Desktop. 30 secondi, lo dai e l'agente chiude da solo.

---

### Già chiuse stanotte dal sistema (sess.#45, non più tue)
Silent block V8 → deciso v.B Ø18mm provvisorio (reversibile, resta solo il durometro). Tutte le
critiche software/stale (research_agent broadening, gitignore views, warning HF, gate self-improve,
Nina definitiva, night_audit, Obsidian _DA_ORDINARE) → risolte. 18 chiuse, 13 lasciate qui sopra.
