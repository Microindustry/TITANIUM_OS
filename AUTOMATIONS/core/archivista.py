"""
========================================================
TITANIUM_OS — ARCHIVISTA CREATIVO (#26)
Modulo    : archivista.py
Parte di  : AUTOMATIONS/core/
Versione  : 1.0.0
Data      : 2026-03-16
========================================================
Funzione  : Scansiona CONTENT_ENGINE/archive/ (e opzionalmente
            TITANIUM_OS/ARCHIVE/), estrae il DNA creativo
            dei vecchi file, e genera uno storytelling .md
            multicanale in CONTENT_ENGINE/produzione_contenuti/.
            Usa Claude API (claude-sonnet-4-6).
Input     : tema (str) — argomento dello storytelling
            formato (str) — 'full' | 'linkedin' | 'podcast' | 'video'
Output    : .md in CONTENT_ENGINE/produzione_contenuti/
Config    : DATA/archivista_config.json (opzionale)
Avvio     : python archivista.py --tema "MIMS" --formato full
========================================================
"""

import os
import sys
import json
import logging
import argparse
from pathlib import Path
from datetime import datetime

# ============================================================
# CONFIGURAZIONE
# ============================================================

ROOT           = Path(__file__).resolve().parent.parent.parent
CONTENT_ENGINE = Path(os.environ.get("CONTENT_ENGINE_DIR", str(Path.home() / "MICROINDUSTRY" / "CONTENT_ENGINE")))
ARCHIVE_DIRS   = [
    CONTENT_ENGINE / "archive",
    ROOT / "ARCHIVE",
]
OUTPUT_DIR     = CONTENT_ENGINE / "produzione_contenuti"
TEMPLATES_DIR  = CONTENT_ENGINE / "templates"
LOG_PATH       = ROOT / "DATA" / "logs" / "archivista.log"
STATE_PATH     = ROOT / "BRAIN" / "STATE.json"

# Max caratteri da passare ad ogni archivio estratto (evita context overflow)
MAX_CHARS_PER_FILE = 2000
# Max file da passare al modello
MAX_ARCHIVE_FILES  = 10

LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [ARCHIVISTA] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger("archivista")


# ============================================================
# ESTRAZIONE ARCHIVIO
# ============================================================

def _collect_archive_files(tema: str) -> list[dict]:
    """
    Raccoglie i file dall'archivio rilevanti per il tema dato.
    Ritorna lista di {"file": path, "excerpt": str}.
    """
    candidates = []
    tema_lower = tema.lower()

    for archive_dir in ARCHIVE_DIRS:
        if not archive_dir.exists():
            continue
        for f in archive_dir.rglob("*.md"):
            try:
                content = f.read_text(encoding="utf-8", errors="ignore")
            except IOError:
                continue
            # Rilevanza semplice: contiene il tema nel nome o nel contenuto
            relevant = (
                tema_lower in f.name.lower() or
                tema_lower in content.lower()[:500]
            )
            candidates.append({
                "file": str(f.relative_to(archive_dir.parent)),
                "content": content,
                "relevant": relevant,
                "size": len(content),
            })

    # Ordina: prima i rilevanti, poi per dimensione decrescente
    candidates.sort(key=lambda x: (not x["relevant"], -x["size"]))

    # Tronca al max
    selected = candidates[:MAX_ARCHIVE_FILES]

    result = []
    for c in selected:
        excerpt = c["content"][:MAX_CHARS_PER_FILE]
        if len(c["content"]) > MAX_CHARS_PER_FILE:
            excerpt += "\n[... troncato ...]"
        result.append({"file": c["file"], "excerpt": excerpt})

    return result


def _load_state() -> str:
    """Carica il contesto corrente da STATE.json (max 500 char)."""
    if not STATE_PATH.exists():
        return ""
    try:
        with open(STATE_PATH, "r", encoding="utf-8") as f:
            state = json.load(f)
        # Prendi i campi più utili per il contesto narrativo
        relevant = {
            k: state[k] for k in
            ("current_focus", "active_projects", "last_milestone", "next_step")
            if k in state
        }
        return json.dumps(relevant, ensure_ascii=False, indent=2)[:500]
    except (json.JSONDecodeError, KeyError):
        return ""


def _load_template(formato: str) -> str:
    """Carica il template per il formato richiesto."""
    template_map = {
        "linkedin": TEMPLATES_DIR / "template_linkedin.md",
        "podcast":  TEMPLATES_DIR / "template_podcast.md",
        "video":    TEMPLATES_DIR / "template_video_fumetto.md",
    }
    path = template_map.get(formato)
    if path and path.exists():
        return path.read_text(encoding="utf-8", errors="ignore")[:1500]
    return ""


# ============================================================
# GENERAZIONE VIA CLAUDE API
# ============================================================

def _generate_storytelling(tema: str, formato: str,
                            archive_excerpts: list[dict],
                            state_context: str) -> str:
    """
    Chiama Claude API per generare lo storytelling.
    Ritorna il testo generato.
    """
    try:
        import anthropic
    except ImportError:
        log.error("anthropic SDK non installato. Esegui: pip install anthropic")
        sys.exit(1)

    client = anthropic.Anthropic()  # usa ANTHROPIC_API_KEY dall'ambiente

    # Costruisci il contesto archivio
    archive_context = ""
    if archive_excerpts:
        archive_context = "\n\n### ARCHIVIO ESTRATTO:\n"
        for item in archive_excerpts:
            archive_context += f"\n**{item['file']}:**\n{item['excerpt']}\n---"

    # Carica template formato
    template = _load_template(formato) if formato != "full" else ""

    # Formato istruzioni
    format_instructions = {
        "full": (
            "Genera uno storytelling COMPLETO con tre sezioni:\n"
            "1. POST LINKEDIN (max 3000 char, tono professionale/visionario)\n"
            "2. TRACCIA PODCAST (8-12 min, ADHD-friendly, 4 atti)\n"
            "3. SCRIPT VIDEO/FUMETTO (5 scene, descrizioni visive precise)\n"
            "Separa le sezioni con '---'"
        ),
        "linkedin": "Genera SOLO il post LinkedIn (max 3000 char). Tono: professionale, visionario, prima persona.",
        "podcast":  "Genera SOLO la traccia podcast (8-12 min). Stile ADHD-friendly: hook forte, 3 atti, cliffhanger finale.",
        "video":    "Genera SOLO lo script video/fumetto (5 scene). Descrizioni visive precise, VO conciso.",
    }.get(formato, "Genera uno storytelling completo.")

    # System prompt
    system = (
        "Sei l'Archivista Creativo di TITANIUM_OS. "
        "Conosci Matteo Benenati: artigiano industriale (TIG titanio, MotoGP, CNC), "
        "system builder, ADHD probabile. "
        "Il suo stile narrativo: tecnico-poetico, zero fluff, "
        "usa metafore artigianali per spiegare il digitale. "
        "I suoi 3 pilastri creativi: (1) Scaffolding Cognitivo, "
        "(2) Modularità come DNA, (3) Silenzio Operativo. "
        "Scrivi SEMPRE in italiano."
    )

    # User prompt
    user = f"""Tema: **{tema}**

Contesto attuale (STATE.json):
{state_context if state_context else "Non disponibile"}
{archive_context}

Istruzioni formato:
{format_instructions}

{f"Template di riferimento:{chr(10)}{template}" if template else ""}

Regole:
- Filo rosso: collega sempre il tema ai 3 pilastri creativi
- Usa dettagli tecnici concreti (non vaghi)
- Il testo deve essere pronto per la distribuzione, non una bozza
- Non aggiungere note meta o spiegazioni fuori dal testo richiesto
"""

    log.info(f"Chiamata Claude API | tema='{tema}' formato='{formato}'")

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system=system,
        messages=[{"role": "user", "content": user}]
    )

    return message.content[0].text


# ============================================================
# SALVATAGGIO OUTPUT
# ============================================================

def _save_output(tema: str, formato: str, content: str) -> Path:
    """Salva il file .md in produzione_contenuti/."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Nome file: tema_formato_data.md
    safe_tema = tema.lower().replace(" ", "_")[:30]
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"{safe_tema}_{formato}_{date_str}.md"
    out_path = OUTPUT_DIR / filename

    # Header frontmatter
    header = f"""---
titolo: {tema}
formato: {formato}
data: {date_str}
generato_da: archivista.py
stato: pronto_revisione
---

# {tema}

*Generato da Archivista Creativo — {datetime.now().strftime("%Y-%m-%d %H:%M")}*

---

"""
    out_path.write_text(header + content, encoding="utf-8")
    log.info(f"Salvato: {out_path.relative_to(CONTENT_ENGINE.parent)}")
    return out_path


# ============================================================
# MAIN
# ============================================================

def run(tema: str, formato: str = "full") -> Path:
    """Flusso completo: archivio → estrazione → generazione → salvataggio."""
    log.info("=" * 50)
    log.info(f"Archivista Creativo | tema='{tema}' formato='{formato}'")

    # 1. Scansiona archivio
    archive_excerpts = _collect_archive_files(tema)
    log.info(f"File archivio trovati: {len(archive_excerpts)}")

    # 2. Carica contesto corrente
    state_context = _load_state()

    # 3. Genera via Claude
    storytelling = _generate_storytelling(tema, formato, archive_excerpts, state_context)

    # 4. Salva
    out_path = _save_output(tema, formato, storytelling)

    log.info(f"Completato: {out_path.name}")
    log.info("=" * 50)
    return out_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Archivista Creativo — genera storytelling")
    parser.add_argument("--tema",    required=True, help="Tema dello storytelling (es: 'MIMS')")
    parser.add_argument("--formato", default="full",
                        choices=["full", "linkedin", "podcast", "video"],
                        help="Formato output (default: full)")
    args = parser.parse_args()

    out = run(tema=args.tema, formato=args.formato)
    print(f"\nFile generato: {out}")
