# risk-analysis.md | knowledge/economics | v1.0 | 2026-03-10
# Stress Test e Difesa — Analisi Rischi
# Fonte: ASSOLUTO V6 — Blocco 1

---

## Rischio Qualità Hub&Spoke

| Rischio | Mitigazione |
|---------|------------|
| Pezzi non conformi dai fornitori | Dima di Controllo "Passa/Non-Passa" prodotta con V32 |
| Penali | Contratto: non conformità a carico dello Spoke |
| Pass-Through | Tutto passa dall'HUB per ripresa e QC prima spedizione |

## Rischio Noleggio Fit Park

| Rischio | Mitigazione |
|---------|------------|
| Materiali sovradimensionati | MIMS HEAVY in ghisa/acciaio |
| Liability fisica | Trasferita al gestore tramite contratto B2B + App con ToS |
| Logistica inversa | A carico cliente o deposito cauzionale |

## Rischio Finanziario

- BOM è documento VIVO — nessuna cifra fissa da considerare definitiva
- Break-even = dato narrativo per storytelling, non commitment operativo
- Reinvestimento: 60% margine Anno 1 (target)

## Piano Difesa Pre-Mortem

Prima di ogni decisione rilevante, attivare L'Avvocato del Diavolo:
1. Qual è il punto di rottura?
2. Cosa succede se il fornitore non consegna?
3. Qual è il worst-case finanziario?
4. Esiste un piano B eseguibile entro 30 giorni?
