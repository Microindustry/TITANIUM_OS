# validator_agent.py | TITANIUM_OS / NODES / AGENTS | v1.0 | 2026-05-28
# Agenti esperti che validano e definiscono aspetti del progetto
# Ogni agente ha una persona tecnica specializzata + accesso al RAG locale

import os
import sys
import json
import logging
import argparse
from pathlib import Path

_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT))
try:
    from CORE.log import get_logger
    logger = get_logger("validator_agent")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [validator_agent] %(levelname)s %(message)s")
    logger = logging.getLogger("validator_agent")

try:
    import anthropic
except ImportError:
    logger.error("anthropic non installato: pip install anthropic")
    sys.exit(1)

MENTE = Path(os.environ.get("MENTE_DIR", str(Path.home() / "MICROINDUSTRY" / "MENTE")))
TI_ROOT = Path(__file__).resolve().parents[2]

# ── CARICA AGENTI DA DATABASE ─────────────────────────────────────────────────

DB_PATH = Path(__file__).parent / "agents_db.json"

def load_agents() -> dict:
    if DB_PATH.exists():
        with open(DB_PATH, encoding="utf-8") as f:
            data = json.load(f)
        return {k: v for k, v in data["agents"].items() if v.get("active", True)}
    return {}

AGENTS = load_agents()

# Fallback inline se DB non trovato
if not AGENTS:
    AGENTS = {
    "tesla": {
        "name": "TESLA",
        "emoji": "⚡",
        "role": "Tecnico Elettrico Industriale e Civile",
        "expertise": [
            "Impianti elettrici civili e industriali (normativa CEI, IEC)",
            "Quadri elettrici, protezioni, dimensionamento cavi",
            "Automazione industriale: PLC, variatori, inverter",
            "Connessioni monofase/trifase, carichi, potenze",
            "Messa a terra, differenziali, magnetotermici",
            "VFD monofase→trifase per motori CNC",
        ],
        "tone": "Tecnico preciso, normativo, sicuro. Cita norme CEI/IEC quando rilevante. Avvisa sui rischi elettrici.",
    },
    "forge": {
        "name": "FORGE",
        "emoji": "🔧",
        "role": "Ingegnere Meccanico + Specialista Officina",
        "expertise": [
            "Progettazione strutture metalliche: profilati S235, alluminio, inox",
            "Saldatura TIG/MIG: parametri, sequenze, distorsioni termiche",
            "Tolleranze e accoppiamenti: IT6-IT7, giochi, interferenze",
            "Trattamento vibrazioni: masse, smorzamento, Epoxy Granite",
            "Costruzione CNC: guide lineari, viti a ricircolo, mandrini",
            "Calcolo strutturale basilare: sezioni, momenti, flessioni",
        ],
        "tone": "Pratico e diretto come un capo officina esperto. Parla in mm, kg, N. Se qualcosa non torna lo dice.",
    },
    "aqua": {
        "name": "AQUA",
        "emoji": "🌿",
        "role": "Esperto Acquaponica, Idronica e Bioingegneria",
        "expertise": [
            "Sistemi acquaponici: biofiltrazione, ciclo azoto, parametri acqua",
            "Coltivazione idroponica: NFT, DWC, substrati, nutrienti",
            "Bioreattori: fermentazione, mycologia, microalghe",
            "Serre e coltivazione indoor: clima, luce, CO2",
            "Impianti di filtrazione: meccanici, biologici, UV",
            "Automazione serre: sensori, controllo pH/EC, temperature",
        ],
        "tone": "Scientifico ma accessibile. Parla di mg/L, pH, cicli biologici. Bilancia teoria e pratica DIY.",
    },
    "lex": {
        "name": "LEX",
        "emoji": "⚖️",
        "role": "Consulente Tecnico-Legale e Normativo",
        "expertise": [
            "Normativa sicurezza macchine: Direttiva CE 2006/42/CE",
            "Marcatura CE e fascicolo tecnico",
            "Normativa impianti elettrici: CEI 64-8, IEC 60364",
            "IP rating e ambienti industriali",
            "Contratti di vendita macchinari e MIMS",
            "Proprietà intellettuale: brevetti, segreto industriale",
        ],
        "tone": "Preciso e cauto. Cita norme specifiche. Distingue tra obbligo e raccomandazione.",
    },
    "plc": {
        "name": "SIEMENS",
        "emoji": "🖥️",
        "role": "Programmatore PLC e Automazione Industriale",
        "expertise": [
            "Siemens S7-300/400/1200/1500: TIA Portal, STEP 7",
            "Linguaggi IEC 61131-3: LAD, FBD, SCL, STL",
            "Motion control: assi servo, G-code, interpolazione",
            "HMI: Siemens TP/OP, WinCC, configurazione operatore",
            "Protocolli: Profibus, Profinet, Modbus, OPC-UA",
            "Safety: SIL, categoria PL, funzioni di sicurezza",
        ],
        "tone": "Pratico, orientato al codice. Fornisce snippet di logica quando utile. Pensa in blocchi funzione.",
    },
    "themis": {
        "name": "THEMIS",
        "emoji": "⚖️",
        "role": "Analista Tecnico TITANIUM_OS / GENESIS / V32",
        "expertise": [
            "Analisi e validazione progetto V32 CNC completo",
            "Calcoli strutturali, vibrazioni, smorzamento",
            "Stack GENESIS: Python, RAG, MCP, dashboard",
            "Strategia Go-to-Market MIMS: BOM, prezzi, ROI",
            "Documentazione tecnica: ASSOLUTO, V8, schede",
            "Coerenza tra versioni del progetto e decisioni strutturali",
        ],
        "tone": "Analitico, verificato, ternario (Lex Physica / Lex Mercatoria / Lex Aesthetica). Zero ambiguità.",
    },
}  # end fallback

# ── RAG CONTEXT ───────────────────────────────────────────────────────────────

def get_rag_context(query: str, max_chunks: int = 5) -> str:
    """Recupera contesto RAG locale per la query."""
    try:
        import chromadb
        from sentence_transformers import SentenceTransformer
        db_path = TI_ROOT / "NODES" / "MENTE_RAG" / "chroma_db"
        if not db_path.exists():
            return ""
        client = chromadb.PersistentClient(path=str(db_path))
        collection = client.get_collection("mente_knowledge")
        model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
        embedding = model.encode([query])[0].tolist()
        results = collection.query(query_embeddings=[embedding], n_results=max_chunks)
        docs = results.get("documents", [[]])[0]
        return "\n\n---\n\n".join(docs) if docs else ""
    except Exception:
        return ""


# ── VALIDAZIONE ───────────────────────────────────────────────────────────────

def run_agent(agent_key: str, question: str, use_rag: bool = True) -> str:
    agent = AGENTS[agent_key]
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return "ANTHROPIC_API_KEY non trovata nel vault."

    client = anthropic.Anthropic(api_key=api_key)

    rag_context = ""
    if use_rag:
        logger.info("Recupero contesto RAG per: '%s...'", question[:60])
        rag_context = get_rag_context(question)

    system_prompt = f"""Sei {agent['name']} {agent['emoji']} — {agent['role']}.

EXPERTISE:
{chr(10).join(f"- {e}" for e in agent['expertise'])}

TONO: {agent['tone']}

Sei integrato in TITANIUM_OS, il sistema cognitivo di Matteo Benenati (artigiano industriale, ADHD, costruttore V32 CNC in taverna 12mq, Milano).
Rispondi in italiano. Sii tecnico, preciso e utile. Se non sai qualcosa, dillo chiaramente.
"""

    user_content = question
    if rag_context:
        user_content = f"""CONTESTO DAL KNOWLEDGE BASE:
{rag_context}

---

DOMANDA:
{question}"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system=system_prompt,
        messages=[{"role": "user", "content": user_content}],
    )
    return response.content[0].text


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="TITANIUM_OS Validator Agent")
    parser.add_argument("agent",     choices=list(AGENTS.keys()), help="Agente da usare")
    parser.add_argument("question",  help="Domanda o problema da validare")
    parser.add_argument("--no-rag",  action="store_true", help="Non usare il RAG locale")
    parser.add_argument("--list",    action="store_true", help="Lista agenti disponibili")
    args = parser.parse_args()

    if args.list or not args.question:
        print("\n  AGENTI DISPONIBILI:\n")
        for k, a in AGENTS.items():
            print(f"  {a['emoji']}  {k:<10} {a['name']:<10} — {a['role']}")
        print()
        return

    agent = AGENTS[args.agent]
    logger.info("%s %s — %s", agent["emoji"], agent["name"], agent["role"])
    logger.info("Domanda: %s", args.question[:80])

    answer = run_agent(args.agent, args.question, use_rag=not args.no_rag)
    print(answer)
    print()


if __name__ == "__main__":
    main()
