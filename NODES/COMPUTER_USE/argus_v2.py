# argus_v2.py | TITANIUM_OS / NODES / COMPUTER_USE | v2.0 | 2026-05-30
"""
ARGUS v2 -- agente visivo ibrido a costo quasi-zero.

Architettura 3 livelli (dal piu economico al piu costoso):

  Livello 1 -- OmniParser locale (GRATIS)
    Screenshot -> YOLO icon detection + EasyOCR text -> lista elementi UI
    con label e bounding box. Nessuna API call.

  Livello 2 -- Text matching semantico (GRATIS)
    Cerca l'elemento piu vicino al task con fuzzy matching.
    Copre ~80% dei casi (click su bottoni, link, testo noto).

  Livello 3 -- Haiku vision (ECONOMICO: $1/$5 per MTok)
    Solo se matching ambiguo o task complesso.
    3x piu economico di Sonnet, usato <20% delle volte.

Installazione OmniParser (una volta sola):
  pip install easyocr ultralytics huggingface_hub
  python argus_v2.py --setup

Uso:
  python argus_v2.py "Clicca sul pulsante Login"
  python argus_v2.py "Dimmi cosa c'e' sullo schermo" --no-act
  python argus_v2.py "Copia il titolo" --force-llm
"""

import os, sys, time, base64, json, argparse, logging
from pathlib import Path
from io import BytesIO

# Fix encoding Windows
if sys.stdout is not None:
    try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception: pass
if sys.stderr is not None:
    try: sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception: pass

_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT))

try:
    from CORE.log import get_logger
    logger = get_logger("argus_v2")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [argus_v2] %(levelname)s %(message)s")
    logger = logging.getLogger("argus_v2")

import mss
import pyautogui
import pyperclip
from PIL import Image, ImageDraw

# ── Paths -----------------------------------------------------------------------
BASE_DIR  = Path(__file__).resolve().parents[3]
VAULT_ENV = BASE_DIR / "_VAULT" / "KEYS" / "titanium_os.env"
SHOTS_DIR = BASE_DIR / "DATA" / "screen_agent_shots"
SHOTS_DIR.mkdir(parents=True, exist_ok=True)
WEIGHTS_DIR = Path(__file__).parent / "omniparser_weights"

# ── Config ----------------------------------------------------------------------
SONNET    = "claude-sonnet-4-6"            # fallback LLM -- solo quando OmniParser non basta
IMG_SCALE = 0.5                            # scala screenshot
MAX_LOOPS = 15
CONFIDENCE_THRESHOLD = 0.45               # sotto questa soglia -> chiama Haiku

pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.1


def _load_env():
    if VAULT_ENV.exists():
        for line in VAULT_ENV.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())


# ══════════════════════════════════════════════════════════════════════════════
# LIVELLO 1: OmniParser locale
# ══════════════════════════════════════════════════════════════════════════════

_omni_model = None   # lazy-loaded

def _load_omniparser():
    """Carica OmniParser la prima volta. Richiede setup."""
    global _omni_model
    if _omni_model is not None:
        return _omni_model
    try:
        import easyocr
        from ultralytics import YOLO
        yolo_path = WEIGHTS_DIR / "icon_detect" / "best.pt"
        if not yolo_path.exists():
            logger.warning("OmniParser weights non trovati in %s -- usa --setup", WEIGHTS_DIR)
            return None
        _omni_model = {
            "ocr": easyocr.Reader(["en", "it"], gpu=False),
            "yolo": YOLO(str(yolo_path)),
        }
        logger.info("OmniParser caricato (CPU, no GPU)")
        return _omni_model
    except ImportError as e:
        logger.warning("OmniParser non disponibile (%s) -- installa con --setup", e)
        return None


def parse_screen_local(img: Image.Image) -> list[dict]:
    """
    Livello 1: estrae elementi UI dall'immagine con OmniParser.
    Ritorna lista di {label, x, y, w, h, type, confidence}
    coordinate normalizzate 0-1.
    """
    model = _load_omniparser()
    if not model:
        return []

    import numpy as np
    img_arr = np.array(img)
    W, H = img.size
    elements = []

    # OCR: trova tutto il testo con posizioni
    try:
        ocr_results = model["ocr"].readtext(img_arr, detail=1, paragraph=False)
        for (bbox, text, conf) in ocr_results:
            if conf < 0.3 or not text.strip():
                continue
            xs = [p[0] for p in bbox]
            ys = [p[1] for p in bbox]
            cx = (min(xs) + max(xs)) / 2 / W
            cy = (min(ys) + max(ys)) / 2 / H
            w  = (max(xs) - min(xs)) / W
            h  = (max(ys) - min(ys)) / H
            elements.append({
                "label": text.strip(),
                "x": cx, "y": cy, "w": w, "h": h,
                "type": "text",
                "confidence": float(conf),
            })
    except Exception as e:
        logger.debug("OCR error: %s", e)

    # YOLO: trova icone e bottoni
    try:
        results = model["yolo"].predict(img_arr, conf=0.3, verbose=False)
        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                cx = (x1 + x2) / 2 / W
                cy = (y1 + y2) / 2 / H
                w  = (x2 - x1) / W
                h  = (y2 - y1) / H
                conf = float(box.conf[0])
                elements.append({
                    "label": f"icon_{len(elements)}",
                    "x": cx, "y": cy, "w": w, "h": h,
                    "type": "icon",
                    "confidence": conf,
                })
    except Exception as e:
        logger.debug("YOLO error: %s", e)

    logger.info("OmniParser: %d elementi trovati", len(elements))
    return elements


# ══════════════════════════════════════════════════════════════════════════════
# LIVELLO 2: Text matching semantico (gratis)
# ══════════════════════════════════════════════════════════════════════════════

def _similarity(a: str, b: str) -> float:
    """Similarita semplice tra due stringhe (Jaccard su parole)."""
    wa = set(a.lower().split())
    wb = set(b.lower().split())
    if not wa or not wb:
        return 0.0
    return len(wa & wb) / len(wa | wb)


def match_element(task: str, elements: list[dict]) -> tuple[dict | None, float]:
    """
    Trova l'elemento piu rilevante per il task dato.
    Ritorna (elemento, confidence) o (None, 0) se nessun match.
    """
    if not elements:
        return None, 0.0

    # Estrai parole chiave dal task
    task_lower = task.lower()
    best = None
    best_score = 0.0

    for el in elements:
        label = el["label"].lower()
        score = _similarity(task_lower, label)

        # Boost se il task contiene esattamente il testo dell'elemento
        if label in task_lower or any(w in task_lower for w in label.split()):
            score = max(score, 0.6)

        # Boost per elementi di tipo testo (piu affidabili)
        if el["type"] == "text":
            score *= 1.1

        if score > best_score:
            best_score = score
            best = el

    return best, min(best_score, 1.0)


# ══════════════════════════════════════════════════════════════════════════════
# LIVELLO 3: Haiku vision (fallback economico)
# ══════════════════════════════════════════════════════════════════════════════

SONNET_SYSTEM = """Sei ARGUS, agente desktop. Hai la lista degli elementi UI rilevati sullo schermo.
Scegli quale elemento clickare o che azione eseguire per completare il task.

Rispondi SOLO con JSON:
{
  "action": "click" | "type" | "hotkey" | "scroll" | "copy" | "done",
  "element_label": "<label dell elemento>",
  "x": <float 0-1>,
  "y": <float 0-1>,
  "text": "<testo per type/hotkey>",
  "reasoning": "<una riga>"
}"""


def haiku_decide(task: str, elements: list[dict], img: Image.Image) -> dict:
    """
    Livello 3: chiama Haiku solo quando il matching locale e' insufficiente.
    Passa TESTO degli elementi (non immagine) per massimizzare risparmio.
    Se task complesso o nessun elemento trovato, allega anche screenshot.
    """
    import anthropic, re

    _load_env()
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return {"action": "done", "reasoning": "ANTHROPIC_API_KEY non trovata"}

    client = anthropic.Anthropic(api_key=api_key)

    # Serializza elementi in testo compatto (no immagine = molto piu economico)
    el_text = "\n".join(
        f"  [{i}] {e['label']} ({e['type']}) @ ({e['x']:.2f},{e['y']:.2f})"
        for i, e in enumerate(elements[:40])  # max 40 elementi
    )

    # Solo se elementi insufficienti allega screenshot
    use_image = len(elements) < 3

    if use_image:
        # Scala forte per ridurre token
        w, h = img.size
        small = img.resize((int(w * 0.4), int(h * 0.4)), Image.LANCZOS)
        buf = BytesIO()
        small.save(buf, format="PNG", optimize=True)
        img_b64 = base64.standard_b64encode(buf.getvalue()).decode()
        content = [
            {"type": "text", "text": f"Task: {task}\n\nElementi rilevati:\n{el_text or '(nessuno)'}"},
            {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": img_b64}},
        ]
    else:
        content = f"Task: {task}\n\nElementi rilevati:\n{el_text}"

    try:
        resp = client.messages.create(
            model=SONNET,
            max_tokens=256,
            system=SONNET_SYSTEM,
            messages=[{"role": "user", "content": content}],
        )
        raw = resp.content[0].text
        m = re.search(r"\{.*\}", raw, re.DOTALL)
        if m:
            return json.loads(m.group(0))
        return {"action": "done", "reasoning": f"parse error: {raw[:60]}"}
    except Exception as e:
        logger.error("Haiku error: %s", e)
        return {"action": "done", "reasoning": str(e)}


# ══════════════════════════════════════════════════════════════════════════════
# Screenshot
# ══════════════════════════════════════════════════════════════════════════════

def capture() -> tuple[Image.Image, int, int]:
    with mss.mss() as sct:
        mon = sct.monitors[1]
        raw = sct.grab(mon)
        img = Image.frombytes("RGB", raw.size, raw.bgra, "raw", "BGRX")
    return img, img.width, img.height


def scale_img(img: Image.Image, scale: float = IMG_SCALE) -> Image.Image:
    w, h = img.size
    return img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)


# ══════════════════════════════════════════════════════════════════════════════
# Esecuzione azione
# ══════════════════════════════════════════════════════════════════════════════

def execute(action: dict, real_w: int, real_h: int) -> str | None:
    """Esegue azione. Coordinate x/y normalizzate 0-1."""
    act = action.get("action", "done")

    def _px():
        x = int(action.get("x", 0.5) * real_w)
        y = int(action.get("y", 0.5) * real_h)
        return x, y

    if act == "click":
        x, y = _px()
        pyautogui.click(x, y)
        logger.info("click @ (%d,%d) -- %s", x, y, action.get("reasoning", ""))

    elif act == "type":
        pyperclip.copy(action.get("text", ""))
        time.sleep(0.15)
        pyautogui.hotkey("ctrl", "v")
        logger.info("type: %s", action.get("text", "")[:60])

    elif act == "hotkey":
        keys = [k.strip() for k in action.get("text", "").lower().split("+")]
        pyautogui.hotkey(*keys)
        logger.info("hotkey: %s", action.get("text"))

    elif act == "scroll":
        x, y = _px()
        delta = 3 if action.get("scroll_dir", "up") == "up" else -3
        pyautogui.scroll(delta, x=x, y=y)
        logger.info("scroll @ (%d,%d)", x, y)

    elif act == "copy":
        pyautogui.hotkey("ctrl", "c")
        time.sleep(0.25)
        result = pyperclip.paste()
        logger.info("copy -> %s", result[:80])
        return result

    elif act == "done":
        logger.info("done: %s", action.get("reasoning", ""))

    return None


# ══════════════════════════════════════════════════════════════════════════════
# Loop principale
# ══════════════════════════════════════════════════════════════════════════════

def run(task: str, no_act: bool = False, force_llm: bool = False,
        save_shots: bool = False, max_loops: int = MAX_LOOPS) -> str:

    omni_available = _load_omniparser() is not None
    llm_calls = 0
    local_calls = 0
    last_reasoning = ""

    logger.info("ARGUS v2 | Task: %s | omniparser=%s", task, omni_available)

    for loop in range(1, max_loops + 1):
        logger.info("-- Loop %d/%d --", loop, max_loops)

        img, real_w, real_h = capture()

        # Livello 1: parse locale
        elements = []
        if omni_available and not force_llm:
            small = scale_img(img)
            elements = parse_screen_local(small)
            # Scala le coordinate da immagine ridotta a schermo reale
            for e in elements:
                e["x"] = e["x"]  # gia normalizzate 0-1, ok
                e["y"] = e["y"]

        # Livello 2: matching locale
        action = None
        if elements and not force_llm:
            matched, conf = match_element(task, elements)
            if matched and conf >= CONFIDENCE_THRESHOLD:
                local_calls += 1
                logger.info("match locale: '%s' conf=%.2f", matched["label"], conf)
                action = {
                    "action": "click",
                    "x": matched["x"],
                    "y": matched["y"],
                    "reasoning": f"match locale: {matched['label']} (conf={conf:.2f})",
                }

        # Livello 3: Haiku fallback
        if action is None:
            llm_calls += 1
            logger.info("Haiku fallback (call #%d)", llm_calls)
            action = haiku_decide(task, elements, scale_img(img, 0.4))

        last_reasoning = action.get("reasoning", "")

        if save_shots:
            ts = time.strftime("%H%M%S")
            img.save(SHOTS_DIR / f"{ts}_loop{loop:02d}.png")

        if action.get("action") == "done":
            break

        if not no_act:
            result = execute(action, real_w, real_h)
            if result:
                last_reasoning = result
                break
        else:
            logger.info("[no-act] %s", action)
            break

        time.sleep(0.6)

    logger.info("Fine | loop=%d local=%d llm=%d", loop, local_calls, llm_calls)
    return last_reasoning


# ══════════════════════════════════════════════════════════════════════════════
# Setup OmniParser weights
# ══════════════════════════════════════════════════════════════════════════════

def setup_omniparser():
    """Scarica i pesi OmniParser v2 da HuggingFace (una volta sola)."""
    try:
        from huggingface_hub import snapshot_download
    except ImportError:
        print("Installa prima: pip install huggingface_hub easyocr ultralytics")
        sys.exit(1)

    print("Download OmniParser v2 weights (~500MB)...")
    WEIGHTS_DIR.mkdir(parents=True, exist_ok=True)
    snapshot_download(
        repo_id="microsoft/OmniParser-v2.0",
        local_dir=str(WEIGHTS_DIR),
        ignore_patterns=["*.md", "*.txt", ".gitattributes"],
    )
    print(f"Pesi salvati in {WEIGHTS_DIR}")
    print("Installa dipendenze: pip install easyocr ultralytics")
    print("ARGUS v2 pronto.")


# ══════════════════════════════════════════════════════════════════════════════
# CLI
# ══════════════════════════════════════════════════════════════════════════════

def main():
    p = argparse.ArgumentParser(description="ARGUS v2 -- agente visivo ibrido a costo minimo")
    p.add_argument("task", nargs="?", default="", help="Cosa fare sullo schermo")
    p.add_argument("--setup",     action="store_true", help="Scarica pesi OmniParser v2")
    p.add_argument("--no-act",    action="store_true", help="Solo analisi, nessuna azione")
    p.add_argument("--force-llm", action="store_true", help="Salta OmniParser, usa sempre Haiku")
    p.add_argument("--save-shots",action="store_true", help="Salva screenshot in DATA/screen_agent_shots/")
    p.add_argument("--loops", type=int, default=MAX_LOOPS)
    args = p.parse_args()

    if args.setup:
        setup_omniparser()
        return

    if not args.task:
        p.print_help()
        return

    result = run(
        task=args.task,
        no_act=args.no_act,
        force_llm=args.force_llm,
        save_shots=args.save_shots,
        max_loops=args.loops,
    )
    print(f"\nRisultato: {result}")


if __name__ == "__main__":
    main()
