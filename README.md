# TITANIUM_OS

> *Un artigiano del titanio che ha costruito il proprio sistema operativo cognitivo.*

---

## La storia

Ci sono persone che lavorano il metallo di giorno e scrivono codice di notte.

Matteo Benenati è una di queste. Quindici anni di industria pesante — saldature TIG/MIG sul titanio per i team MotoGP di SCProject, robot di assemblaggio in ESSEGI, presse industriali in DATWLER, controllo qualità in LU.VE. Le mani nell'acciaio, la testa sempre su più fronti contemporaneamente.

Il problema? Con l'ADHD, tenere tutto in testa è impossibile. Le idee arrivano in raffica, i progetti si moltiplicano, la concentrazione si spezza. Serviva uno scaffold — non un'agenda, non un task manager, non un foglio Excel. Serviva un **sistema operativo per la mente**.

TITANIUM_OS è quel sistema.

---

## Cosa è

TITANIUM_OS è un ecosistema software locale che gira su Windows. Non è un'app, non è un SaaS, non è un prodotto finito. È un'infrastruttura personale costruita pezzo per pezzo, come si costruisce una macchina CNC: con precisione, con intenzione, senza sprechi.

Il sistema tiene traccia di quattro progetti reali in parallelo:

| Progetto | Cosa è |
|----------|--------|
| **V32** | Fresatrice CNC a 3 assi, 178 kg, costruita da zero — precisione ±0.019 mm |
| **MIMS** | Sistema di connettori modulari fisici (prodotto industriale proprietario) |
| **GENESIS** | Il cervello AI interno — watcher, scanner, dashboard, automazioni |
| **EVA** | AI assistant WhatsApp per Vita Natura, il centro estetico di Maria |

---

## Come funziona

### Il cervello: `BRAIN/STATE.json`
Ogni sessione di lavoro inizia leggendo un file JSON. Contiene lo stato live di ogni progetto, il milestone attivo, l'ultimo step completato, il prossimo da fare. Niente domande, niente recap. Sei operativo in 10 secondi.

### Il corpo: 28 automazioni Python
Il cuore del sistema è una pipeline di automazioni che girano in background:

- **Watcher** — monitora ogni file modificato in tempo reale
- **Backup versioning** — snapshot automatico ad ogni cambiamento (max 30 versioni per file)
- **PDF to Memory** — drag-drop un PDF, viene convertito in Markdown e classificato automaticamente
- **Mente Scanner** — scansiona 818 frammenti di pensiero e li struttura in dati
- **Content Pipeline** — trasforma materiale grezzo in contenuti LinkedIn, podcast, video tramite Claude API
- **Deep Freeze** — backup AES-256 crittografato ogni domenica alle 3:00
- **Sanitizer** — blocca commit se trova API keys, token, IBAN o dati sensibili nel codice

### Il volto: Dashboard React
Un'interfaccia minimalista, stile terminale industriale, che mostra lo stato live di tutti i pilastri. Costruita con React + Vite + Tailwind. Gira in locale su porta 5173.

```
FOCUS · AUTOMAZIONE ATTIVA    CICLO OPERATIVO       PILASTRI
V32 · LA MACCHINA             ECOTREE · FILE SYSTEM  NEURO MAP
AUTOMAZIONI · GENESIS OS      MENTE · DIGEST         DOCS · MD FILES
CONTENT ENGINE · PODCAST
```

---

## La macchina fisica: V32

Mentre il software gira, in officina c'è una fresatrice CNC da 178 kg in costruzione.

- Struttura in alluminio 7075 + acciaio
- PLC Siemens S7-314C
- Investimento: EUR 2.250
- Precisione RSS: ±0.019 mm (IT6-IT7)
- Milestone attivo: Config G — rinforzi colonne Z+U (65% completato)

Il software serve anche a questo: tenere traccia di ogni bullone, ogni saldatura, ogni modifica alla macchina.

---

## Stack tecnico

```
Python 3.x        — automazioni, API server Flask, watcher
React + Vite      — dashboard locale
Tailwind CSS      — UI
SQLite            — indice semantico
n8n (Oracle Cloud) — workflow engine
Claude API        — content generation
Windows           — OS host
```

---

## Struttura del repo

```
TITANIUM_OS/
├── BRAIN/          # STATE.json — stato live, regole, knowledge base
├── AUTOMATIONS/    # 28 moduli Python attivi
├── DASHBOARD/      # React app (Vite + Tailwind)
├── NODES/          # Nodi operativi (Mente Scanner, etc.)
├── DATA/           # Output JSON, logs, indici
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

## Chi è Matteo

Artigiano industriale che costruisce macchine con le mani e sistemi con il codice. Non ha una laurea in informatica. Ha 15 anni di officina, un cervello che funziona a raffica, e la necessità di costruire strumenti che funzionino davvero — per sé prima, per gli altri poi.

TITANIUM_OS è il suo scaffolding cognitivo. È anche la prova che chiunque, con abbastanza ostinazione, può costruire il proprio sistema operativo personale.

---

*Versione: 2.1.0 | Aggiornato: 2026-03-16*
