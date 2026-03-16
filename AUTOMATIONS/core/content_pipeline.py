"""
========================================================
TITANIUM_OS — MULTI-FORMAT CONTENT PIPELINE (#27)
Modulo    : content_pipeline.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Prende uno storytelling .md grezzo (o un tema)
            e produce 3 output pronti per la distribuzione:
            1. Post LinkedIn (testo formattato)
            2. Traccia podcast (script strutturato)
            3. Script video/fumetto (scene + VO)
            Salva i 3 formati in CONTENT_ENGINE/produzione_contenuti/
            e registra in CONTENT_ENGINE/distribuiti/log.json.
Input     : --source <file.md> o --tema <stringa>
Output    : 3 file .md in CONTENT_ENGINE/produzione_contenuti/
Avvio     : python content_pipeline.py --source respiro_dei_dati.md
            python content_pipeline.py --tema "MIMS connettori"
========================================================
"""

import sys
import json
import logging
import argparse
from pathlib import Path
from datetime import datetime

ROOT           = Path(__file__).resolve().parent.parent.parent
CONTENT_ENGINE = Path("C:/Users/Matteo/Desktop/CONTENT_ENGINE")
OUTPUT_DIR     = CONTENT_ENGINE / "produzione_contenuti"
TEMPLATES_DIR  = CONTENT_ENGINE / "templates"
DISTRIBUITI_DIR = CONTENT_ENGINE / "distribuiti"
LOG_PATH       = ROOT / "DATA" / "logs" / "content_pipeline.log"

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [CONTENT_PIPELINE] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("content_pipeline")

# Formati da generare
FORMATS = ["linkedin", "podcast", "video"]


def _load_template(fmt: str) -> str:
    """Carica il template per il formato."""
    template_map = {
        "linkedin": TEMPLATES_DIR / "template_linkedin.md",
        "podcast":  TEMPLATES_DIR / "template_podcast.md",
        "video":    TEMPLATES_DIR / "template_video_fumetto.md",
    }
    path = template_map.get(fmt)
    if path and path.exists():
        return path.read_text(encoding="utf-8", errors="ignore")[:1500]
    return ""


def _generate_format(content: str, fmt: str, tema: str) -> str:
    """
    Chiama Claude API per generare un formato specifico.
    """
    try:
        import anthropic
        client = anthropic.Anthropic()
    except ImportError:
        log.error("anthropic SDK non installato. Esegui: pip install anthropic")
        sys.exit(1)

    template = _load_template(fmt)

    format_desc = {
        "linkedin": (
            "POST LINKEDIN pronto per la pubblicazione. "
            "Max 3000 caratteri. Tono: professionale e visionario, prima persona. "
            "Struttura: hook (1 riga) → problema → svolta → prova concreta → CTA. "
            "Aggiungi 3-5 hashtag pertinenti alla fine."
        ),
        "podcast": (
            "TRACCIA PODCAST pronta per la registrazione. "
            "Durata: 8-12 minuti. ADHD-friendly: frasi brevi, ritmo variato. "
            "Struttura: hook 30s → atto 1 (contesto) → atto 2 (trasformazione) "
            "→ atto 3 (lezione) → chiusura con cliffhanger. "
            "Includi indicazioni temporali e note di pausa."
        ),
        "video": (
            "SCRIPT VIDEO/FUMETTO pronto per la produzione. "
            "5 scene numerate. Per ogni scena: descrizione visiva (cosa si vede), "
            "voiceover (max 15 parole), nota regia (ritmo/transizione). "
            "Durata totale: 60-90 secondi."
        ),
    }[fmt]

    system = (
        "Sei un content producer specializzato per Matteo Benenati: "
        "artigiano industriale e system builder, ADHD, stile tecnico-poetico. "
        "I suoi 3 pilastri: Scaffolding Cognitivo, Modularità come DNA, Silenzio Operativo. "
        "Scrivi SEMPRE in italiano. Output diretto — niente meta-commenti."
    )

    user = (
        f"Tema/Contenuto sorgente:\n{content[:2000]}\n\n"
        f"Genera: {format_desc}\n\n"
        f"{'Template di riferimento:' + chr(10) + template if template else ''}"
    )

    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system=system,
        messages=[{"role": "user", "content": user}]
    )
    return msg.content[0].text


def _save_format(tema: str, fmt: str, content: str) -> Path:
    """Salva il file generato in produzione_contenuti/."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    safe = tema.lower().replace(" ", "_")[:25]
    date = datetime.now().strftime("%Y-%m-%d")
    filename = f"{safe}_{fmt}_{date}.md"
    path = OUTPUT_DIR / filename

    header = (
        f"---\ntitolo: {tema}\nformato: {fmt}\ndata: {date}\n"
        f"generato_da: content_pipeline.py\nstato: pronto_revisione\n---\n\n"
        f"# {tema} — {fmt.upper()}\n\n"
    )
    path.write_text(header + content, encoding="utf-8")
    return path


def _log_distribution(tema: str, outputs: list[dict]):
    """Registra la pipeline in CONTENT_ENGINE/distribuiti/log.json."""
    DISTRIBUITI_DIR.mkdir(parents=True, exist_ok=True)
    log_path = DISTRIBUITI_DIR / "pipeline_log.json"

    if log_path.exists():
        with open(log_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = {"runs": []}

    data["runs"].append({
        "timestamp": datetime.now().isoformat(),
        "tema": tema,
        "outputs": outputs,
    })

    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def run_pipeline(source_content: str, tema: str,
                 formats: list[str] = None) -> list[Path]:
    """
    Pipeline completa: genera tutti i formati richiesti.
    Ritorna la lista di file creati.
    """
    if formats is None:
        formats = FORMATS

    log.info("=" * 50)
    log.info(f"Content Pipeline | tema='{tema}' formati={formats}")

    outputs = []
    for fmt in formats:
        log.info(f"Generazione: {fmt}...")
        try:
            text = _generate_format(source_content, fmt, tema)
            path = _save_format(tema, fmt, text)
            outputs.append({"format": fmt, "file": path.name})
            log.info(f"Salvato: {path.name}")
        except Exception as e:
            log.error(f"Errore generazione {fmt}: {e}")
            outputs.append({"format": fmt, "error": str(e)})

    _log_distribution(tema, outputs)
    log.info(f"Pipeline completata: {len([o for o in outputs if 'file' in o])}/{len(formats)} formati")
    log.info("=" * 50)

    return [OUTPUT_DIR / o["file"] for o in outputs if "file" in o]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Multi-format Content Pipeline")
    parser.add_argument("--source",  type=str, help="File .md sorgente")
    parser.add_argument("--tema",    type=str, help="Tema (se non c'è sorgente)")
    parser.add_argument("--formati", type=str, default="linkedin,podcast,video",
                        help="Formati separati da virgola (default: tutti e 3)")
    args = parser.parse_args()

    if not args.source and not args.tema:
        parser.print_help()
        sys.exit(0)

    formati = [f.strip() for f in args.formati.split(",")]

    if args.source:
        path = Path(args.source)
        if not path.is_absolute():
            path = OUTPUT_DIR / path
        source_content = path.read_text(encoding="utf-8", errors="ignore")
        tema = args.tema or path.stem
    else:
        source_content = args.tema  # usa il tema come prompt diretto
        tema = args.tema

    files = run_pipeline(source_content, tema, formats=formati)
    for f in files:
        print(f"  → {f.name}")
