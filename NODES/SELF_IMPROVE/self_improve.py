# self_improve.py | TITANIUM_OS / NODES / SELF_IMPROVE | v1.1 | 2026-06-24
# Il nodo dell'AUTOMIGLIORAMENTO. Ogni notte, da solo:
#  - legge i segnali INTERNI (critiche del night_audit, gap delle storie, salute task,
#    stato RAG, todo aperti della bussola) e quelli ESTERNI (i segnali dell'AI News
#    Watcher: aggiornamenti del campo AI da integrare);
#  - chiede a Claude (Sonnet, economico) 3-6 PROPOSTE di miglioramento concrete;
#  - le scrive come PROPOSTE (mai modifiche) in DATA/self_improve/ + un digest leggibile
#    in MENTE/KNOWLEDGE/AUTOMIGLIORAMENTO.md (vault Obsidian + RAG + brief).
#
# GUARDRAIL (invariante permanente — il gate "il sistema propone, l'umano approva".
# Era la regola 11 di CLAUDE.md, tolta dal testo il 20/06 su richiesta di Matteo:
# il PRINCIPIO sta qui nel codice, non come slogan. STATE.self_improve lo dichiara
# in forma verificabile dagli agenti notturni):
#  - SOLO PROPOSTE. Non modifica codice, non fa commit, non merge, non cancella.
#  - Mai toccare sicurezza/chiavi/permessi/impostazioni di sistema.
#  - Ogni proposta marcata: "sicuro" (piccola, reversibile) | "approvazione" (serve umano).
#  - L'umano (Matteo) decide e applica. L'autonomia sta nel TROVARE, non nell'ESEGUIRE.

import os, sys, io, json, re, hashlib
from datetime import datetime, timedelta
from pathlib import Path

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

TI_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(TI_ROOT))
try:
    from CORE.log import get_logger
    logger = get_logger("self_improve")
except Exception:
    import logging
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [self_improve] %(levelname)s %(message)s")
    logger = logging.getLogger("self_improve")

MENTE   = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
OUT_DIR = TI_ROOT / "DATA" / "self_improve"
DIGEST  = MENTE / "KNOWLEDGE" / "AUTOMIGLIORAMENTO.md"
MODEL   = "claude-sonnet-4-6"   # economico (regola: no Opus per i notturni)
TODAY   = datetime.now().strftime("%Y-%m-%d")


def _read_json(p: Path, default):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return default


def collect_signals() -> dict:
    audit = _read_json(TI_ROOT / "DATA" / "audit" / "critiche_auto.json", [])
    crit_aperte = [c for c in audit if c.get("status") == "open"][:12]
    health = _read_json(TI_ROOT / "DATA" / "audit" / "system_health.json", {})
    gap = _read_json(TI_ROOT / "DATA" / "storie_gap.json", {})
    bussola = _read_json(TI_ROOT / "DATA" / "audit" / "bussola_todos.json", [])
    todo_aperti = [t.get("testo") for t in (bussola if isinstance(bussola, list) else [])
                   if t.get("stato") in ("da_fare", "in_corso")][:15]
    state = _read_json(TI_ROOT / "BRAIN" / "STATE.json", {})

    # SEGNALI ESTERNI: le news AI trovate dal watcher (i "57 segnali") — il campo da integrare
    watcher = _read_json(TI_ROOT / "DATA" / "ai_news_watcher_state.json", {})
    news = []
    for c in (watcher.get("criticita") or [])[:30]:
        news.append({"fonte": c.get("fonte"), "titolo": c.get("sintesi"), "url": c.get("url")})

    return {
        "data": TODAY,
        "milestone": state.get("active_milestone", "")[:300],
        "pillars": {k: v.get("pct_complete") for k, v in state.get("pillars", {}).items()},
        "critiche_audit_aperte": [{"area": c.get("area"), "sev": c.get("severity"),
                                   "finding": c.get("finding", "")[:240]} for c in crit_aperte],
        "salute": {k: health.get(k) for k in ("verdict", "n_episodes", "rag_chunks", "n_commits_7d") if k in health},
        "gap_storie": gap.get("gap_profondita") or gap.get("note") or gap,
        "todo_bussola_aperti": todo_aperti,
        "news_ai_da_integrare": news,
        "n_news": len(news),
    }


SYSTEM = """Sei il nodo AUTOMIGLIORAMENTO di TITANIUM_OS, il sistema personale di Matteo (artigiano industriale + system builder: V32=CNC, MIMS=moduli, GENESIS=stack AI, Nina=prodotto educativo).
Compito: dai segnali di stanotte, proponi 3-6 MIGLIORAMENTI concreti per far evolvere l'ecosistema. Due tipi:
- "fix-interno": risolvere una criticita/gap/debito gia' visibile nei segnali interni.
- "integra-esterno": prendere UN aggiornamento reale dal campo AI (lista news_ai_da_integrare) e proporre come integrarlo nel progetto di Matteo (es. una tecnica RAG da un paper, un tool da un creator). Cita la fonte.

REGOLE FERREE (il sistema e' fidabile solo se le rispetti):
- Proponi, non eseguire. Niente che cancelli, tocchi sicurezza/chiavi/permessi, o faccia merge su main.
- Ogni proposta DEVE essere concreta e ancorata a un segnale reale (cita quale). Niente fuffa, niente lodi.
- Marca l'autonomia: "sicuro" = piccolo, reversibile, basso rischio (es. doc, test, refactor locale); "approvazione" = serve l'ok di Matteo (codice nuovo, dipendenze, scelte di prodotto).
- Preferisci poche proposte ALTE di valore. Ordina per impatto.

Rispondi SOLO con un array JSON. Schema elemento:
{"tipo":"fix-interno|integra-esterno","area":"...","titolo":"...","cosa":"...","perche":"(da quale segnale)","come":"passi concreti","rischio":"...","autonomia":"sicuro|approvazione","fonte":"(url/segnale se esterno)"}"""


def proposte_via_llm(signals: dict):
    key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not key:
        logger.warning("ANTHROPIC_API_KEY assente -> nessuna proposta LLM")
        return None
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=key)
        resp = client.messages.create(
            model=MODEL, max_tokens=2000, system=SYSTEM,
            messages=[{"role": "user", "content": "Segnali di stanotte:\n" + json.dumps(signals, ensure_ascii=False, indent=2)}],
        )
        txt = resp.content[0].text.strip()
        txt = re.sub(r"^```(?:json)?\s*|\s*```$", "", txt, flags=re.MULTILINE).strip()
        m = re.search(r"\[.*\]", txt, re.DOTALL)
        raw = m.group(0) if m else txt
        raw = re.sub(r",(\s*[}\]])", r"\1", raw)        # togli trailing commas
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            # fallback tollerante: parsa i singoli oggetti {...} validi, salta i rotti
            data = []
            for obj in re.findall(r"\{[^{}]*\}", raw, re.DOTALL):
                try:
                    data.append(json.loads(re.sub(r",(\s*})", r"\1", obj)))
                except Exception:
                    continue
            if not data:
                raise
        return data if isinstance(data, list) else None
    except Exception as e:
        logger.warning("LLM self-improve fallito: %s", e)
        return None


def write_outputs(proposte: list, signals: dict):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / f"proposte_{TODAY}.json").write_text(
        json.dumps({"data": TODAY, "proposte": proposte, "segnali": signals}, ensure_ascii=False, indent=2),
        encoding="utf-8")

    # digest leggibile in MENTE (vault + RAG + brief)
    sicure = [p for p in proposte if p.get("autonomia") == "sicuro"]
    appr = [p for p in proposte if p.get("autonomia") != "sicuro"]
    out = ["# 🔁 AUTOMIGLIORAMENTO — proposte del sistema",
           "",
           "*Generato dal nodo SELF_IMPROVE (notturno). Il sistema PROPONE; tu approvi e applichi. "
           "Mai modifiche/merge/sicurezza in autonomia (regola 11).*",
           f"*{TODAY} · {len(proposte)} proposte ({len(sicure)} sicure, {len(appr)} da approvare) · "
           f"{signals.get('n_news',0)} news AI valutate.*", ""]
    def blocco(p):
        tag = "🟢 sicuro" if p.get("autonomia") == "sicuro" else "🟡 approvazione"
        fonte = f" · fonte: {p['fonte']}" if p.get("fonte") else ""
        return (f"### [{p.get('tipo','')}] {p.get('titolo','')}  ·  {tag}\n"
                f"- **Cosa:** {p.get('cosa','')}\n- **Perché:** {p.get('perche','')}\n"
                f"- **Come:** {p.get('come','')}\n- **Rischio:** {p.get('rischio','')}{fonte}\n")
    if appr:
        out.append("## 🟡 Da approvare (impatto, serve il tuo ok)\n")
        out += [blocco(p) for p in appr]
    if sicure:
        out.append("## 🟢 Sicure (piccole, reversibili)\n")
        out += [blocco(p) for p in sicure]
    if not proposte:
        out.append("_nessuna proposta (segnali insufficienti o LLM offline)._")
    try:
        DIGEST.parent.mkdir(parents=True, exist_ok=True)
        DIGEST.write_text("\n".join(out), encoding="utf-8")
    except Exception as e:
        logger.warning("digest non scritto: %s", e)


def main():
    logger.info("avvio automiglioramento")
    signals = collect_signals()
    logger.info("segnali: %d critiche aperte, %d todo, %d news AI",
                len(signals["critiche_audit_aperte"]), len(signals["todo_bussola_aperti"]), signals["n_news"])
    proposte = proposte_via_llm(signals) or []
    write_outputs(proposte, signals)
    sic = sum(1 for p in proposte if p.get("autonomia") == "sicuro")
    logger.info("done — %d proposte (%d sicure, %d da approvare) -> MENTE/KNOWLEDGE/AUTOMIGLIORAMENTO.md",
                len(proposte), sic, len(proposte) - sic)


if __name__ == "__main__":
    main()
