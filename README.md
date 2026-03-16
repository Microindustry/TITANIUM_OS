# TITANIUM_OS

> *Quando il cervello non basta, costruisci un sistema.*

---

## La storia

Ci sono persone che lavorano il metallo di giorno e scrivono codice di notte.

Quindici anni di industria pesante — saldature TIG/MIG sul titanio per i team MotoGP, robot di assemblaggio, presse industriali, controllo qualità. Le mani nell'acciaio, la testa sempre su più fronti contemporaneamente.

Il problema? Con un cervello che funziona a raffica, tenere tutto in testa è impossibile. Le idee arrivano a valanga, i progetti si moltiplicano, la concentrazione si spezza nel momento sbagliato. Un'agenda non basta. Un task manager non basta. Un foglio Excel non basta.

Serviva qualcosa di diverso. Non uno strumento — un **sistema operativo per la mente**.

TITANIUM_OS è quel sistema. Costruito pezzo per pezzo, come si costruisce una macchina CNC: con precisione, con intenzione, senza sprechi. Nel tempo libero. In officina. Di notte.

---

## Cosa è

TITANIUM_OS è un ecosistema software locale che gira su Windows. Non è un'app, non è un SaaS, non è un prodotto da installare. È un'infrastruttura personale che tiene in sincronia quattro progetti reali in parallelo:

| Progetto | Cosa è |
|----------|--------|
| **V32** | Fresatrice CNC a 3 assi, 178 kg, costruita da zero — precisione ±0.019 mm |
| **MIMS** | Sistema di connettori modulari fisici (prodotto industriale proprietario) |
| **GENESIS** | Il cervello AI interno — watcher, scanner, dashboard, automazioni |
| **EVA** | AI assistant WhatsApp per un centro estetico |

Ogni progetto ha il suo stato, il suo milestone, il suo prossimo passo. Il sistema li tiene tutti vivi — anche quando la testa è altrove.

---

## Come funziona

### Il cervello: `BRAIN/STATE.json`
Ogni sessione di lavoro inizia leggendo un file JSON. Contiene lo stato live di ogni progetto, il milestone attivo, l'ultimo step completato, il prossimo da fare. Niente domande, niente recap. Operativi in 10 secondi.

```json
{
  "active_milestone": "Config G — Rinforzi colonne Z+U",
  "ciclo_position": "COSTRUISCI",
  "next_step": "Saldare 4 gusset 200mm sulla colonna Z sinistra"
}
```

### Il corpo: 28 automazioni Python
Una pipeline silenziosa che gira in background mentre si lavora:

- **Watcher** — ogni file modificato viene catturato in tempo reale
- **Backup Versioning** — snapshot automatico ad ogni cambiamento, 30 versioni per file
- **PDF to Memory** — drag-drop un PDF, esce Markdown classificato per progetto
- **Mente Scanner** — 818 frammenti di pensiero estratti e strutturati in dati interrogabili
- **Content Pipeline** — materiale grezzo → LinkedIn + podcast + video script via Claude API
- **Deep Freeze** — backup AES-256 crittografato ogni domenica alle 3:00
- **Sanitizer** — blocca ogni commit che contiene API keys, token o IBAN

### Il volto: Dashboard React
Interfaccia stile terminale industriale. Mostra lo stato live di tutti i pilastri. Niente decorazioni, solo dati.

```
FOCUS · AUTOMAZIONE ATTIVA    CICLO OPERATIVO       PILASTRI
V32 · LA MACCHINA             ECOTREE · FILE SYSTEM  NEURO MAP
AUTOMAZIONI · GENESIS OS      MENTE · DIGEST         DOCS · MD FILES
CONTENT ENGINE · PODCAST
```

---

## La macchina fisica: V32

Mentre il software gira, in officina c'è una fresatrice CNC da 178 kg in costruzione.

- Struttura: alluminio 7075 + acciaio
- Controllo: PLC Siemens S7-314C
- Investimento: EUR 2.250
- Precisione RSS: ±0.019 mm (IT6-IT7)
- Milestone attivo: Config G — rinforzi colonne Z+U (65%)

Il software serve anche a questo: tenere traccia di ogni bullone, ogni saldatura, ogni decisione tecnica sulla macchina.

---

## Stack

```
Python 3.x         — automazioni, API server Flask, watcher
React + Vite       — dashboard locale
Tailwind CSS       — UI
SQLite             — indice semantico
n8n (Oracle Cloud) — workflow engine
Claude API         — content generation
Windows            — OS host
```

---

## Struttura del repo

```
TITANIUM_OS/
├── BRAIN/          # STATE.json — stato live, regole, knowledge base
├── AUTOMATIONS/    # 28 moduli Python attivi
├── DASHBOARD/      # React app (Vite + Tailwind)
├── NODES/          # Nodi operativi (Mente Scanner, etc.)
├── DATA/           # Output JSON, logs, indici semantici
├── SOURCES/        # PDF e documenti sorgente
├── INBOX/          # Brief di sessione, idee in arrivo
└── api_server.py   # Flask server porta 5001
```

---

## Avviare il sistema

```bash
# Installa dipendenze
pip install -r requirements.txt

# Avvia ecosistema (watcher + api server)
START_ECOSYSTEM.bat

# Avvia dashboard
cd DASHBOARD && npm run dev
```

---

## L'origine

Nessuna laurea in informatica. Solo 15 anni di officina, un cervello che non si ferma mai, e la necessità assoluta di costruire strumenti che funzionino davvero.

TITANIUM_OS è lo scaffolding cognitivo di chi costruisce macchine fisiche e sistemi digitali allo stesso tempo. È anche la dimostrazione che chiunque, con abbastanza ostinazione, può costruire il proprio sistema operativo personale.

---

*Versione: 2.1.0 | Aggiornato: 2026-03-16*
