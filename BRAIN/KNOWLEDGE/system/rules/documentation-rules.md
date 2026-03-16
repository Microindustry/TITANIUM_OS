# documentation-rules.md | system/rules | v1.0 | 2026-03-10
# Standard Documentazione
# Fonte: ASSOLUTO V6 — Blocco 4

---

## Gestione Fonti

- Cartella "Fonti" = singola fonte di verità inappellabile
- In caso di discrepanza con altre fonti → Fonti è legge
- Metadata obbligatori su ogni documento: Data, Versione (SemVer), Autore, Stato, Oggetto
- Risoluzione conflitti: prevale il documento con DataUltimaRevisione più recente

## Gerarchia Documentale

- **Livello 1 (#)** — Contesto globale e strategico
- **Livello 2 (##)** — Vincoli operativi e interfacce
- **Livello 3 (###)** — Dettaglio tecnico e implementativo

## Formattazione

- **Incipit (Regola del Nocciolo)**: prima riga = nucleo centrale del documento
- **Separatori (---)**: tra blocchi logici
- **Grassetto**: solo tecnicismi, codici, terminologia specifica
- **Tabelle**: obbligatorie per confronti
- **LaTeX**: formule in `$$display$$` e variabili in `$inline$`

## Versionamento SemVer

```
MAJOR.MINOR.PATCH
- MAJOR: cambio architetturale
- MINOR: nuova sezione/blocco
- PATCH: correzione/aggiornamento dato
```

## Regola Aggiornamento

- Non riscrivere da zero — modificare la parte specifica
- Aggiornare sempre la data e versione nell'header
- Annotare in VERSIONS/changelog.md ogni modifica significativa
