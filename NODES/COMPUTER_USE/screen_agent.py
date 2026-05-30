# screen_agent.py | TITANIUM_OS / NODES / COMPUTER_USE | v1.0 | 2026-05-30
"""
Agente visivo a griglia di puntini.

Loop: screenshot → griglia sovrapposta → Claude analizza → azione → repeat.

La griglia divide lo schermo in COLS x ROWS punti rossi.
Claude vede l'immagine annotata e risponde con coordinate griglia (col, row).
L'agente traduce in pixel reali ed esegue l'azione.

Uso:
  python screen_agent.py "Clicca sul pulsante Login"
  python screen_agent.py "Dimmi cosa vedi sullo schermo" --no-act
  python screen_agent.py "Apri Chrome" --save-shots
  python screen_agent.py "Copia il testo del titolo" --cols 30 --rows 20
"""

import os, sys, time, base64, json, argparse, logging
from pathlib import Path
from io import BytesIO

_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_ROOT))

try:
    from CORE.log import get_logger
    logger = get_logger("screen_agent")
except ImportError:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [screen_agent] %(levelname)s %(message)s")
    logger = logging.getLogger("screen_agent")

import mss
import pyautogui
import pyperclip
from PIL import Image, ImageDraw, ImageFont
import anthropic

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR  = Path(__file__).resolve().parents[3]
VAULT_ENV = BASE_DIR / "_VAULT" / "KEYS" / "titanium_os.env"
SHOTS_DIR = BASE_DIR / "DATA" / "screen_agent_shots"
SHOTS_DIR.mkdir(parents=True, exist_ok=True)

# ── Config ────────────────────────────────────────────────────────────────────
MODEL      = "claude-sonnet-4-6"
GRID_COLS  = 20        # colonne griglia (asse X)
GRID_ROWS  = 15        # righe griglia (asse Y)
MAX_LOOPS  = 20
IMG_SCALE  = 0.75      # scala screenshot prima di inviare (riduce token)
DOT_R      = 4         # raggio puntino in pixel
DOT_COLOR  = (220, 60, 60)    # rosso
LABEL_CLR  = (255, 200, 0)    # giallo per etichette
LABEL_STEP = 5         # etichetta ogni N punti per non intasare

pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.1


def _load_env():
    if VAULT_ENV.exists():
        for line in VAULT_ENV.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())


# ── Screenshot ────────────────────────────────────────────────────────────────

def capture() -> tuple[Image.Image, int, int]:
    """Cattura schermo principale. Ritorna (PIL Image, width, height) originali."""
    with mss.mss() as sct:
        mon = sct.monitors[1]
        raw = sct.grab(mon)
        img = Image.frombytes("RGB", raw.size, raw.bgra, "raw", "BGRX")
    return img, img.width, img.height


# ── Griglia puntini ───────────────────────────────────────────────────────────

def overlay_grid(img: Image.Image, cols: int, rows: int) -> tuple[Image.Image, list]:
    """
    Sovrappone griglia di puntini rossi sull'immagine.
    Ritorna (immagine_annotata, grid_points[(col, row, px, py)]).
    Le etichette "(col,row)" vengono disegnate ogni LABEL_STEP punti.
    """
    w, h = img.size
    out = img.copy()
    draw = ImageDraw.Draw(out)

    # Prova a caricare un font piccolo, fallback al default
    try:
        font = ImageFont.truetype("arial.ttf", 9)
    except Exception:
        font = ImageFont.load_default()

    points = []
    for r in range(rows):
        for c in range(cols):
            px = int((c + 0.5) * w / cols)
            py = int((r + 0.5) * h / rows)

            # Cerchio
            draw.ellipse(
                [px - DOT_R, py - DOT_R, px + DOT_R, py + DOT_R],
                fill=DOT_COLOR, outline=(255, 255, 255)
            )
            # Etichetta ai punti di riferimento
            if c % LABEL_STEP == 0 and r % LABEL_STEP == 0:
                draw.text((px + DOT_R + 1, py - 6), f"{c},{r}", fill=LABEL_CLR, font=font)

            points.append((c, r, px, py))

    return out, points


def img_to_b64(img: Image.Image, scale: float = IMG_SCALE) -> str:
    if scale < 1.0:
        w, h = img.size
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    buf = BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return base64.standard_b64encode(buf.getvalue()).decode()


def save_shot(img: Image.Image, tag: str = "") -> Path:
    ts = time.strftime("%H%M%S")
    p = SHOTS_DIR / f"{ts}_{tag}.png"
    img.save(p)
    logger.debug("shot → %s", p)
    return p


# ── Conversione griglia → schermo ─────────────────────────────────────────────

def grid_to_screen(col: int, row: int, real_w: int, real_h: int,
                   cols: int, rows: int) -> tuple[int, int]:
    """Traduce (col, row) griglia in pixel schermo reali."""
    x = int((col + 0.5) * real_w / cols)
    y = int((row + 0.5) * real_h / rows)
    return x, y


# ── Claude ────────────────────────────────────────────────────────────────────

def _build_system(cols: int, rows: int) -> str:
    return f"""Sei un agente di automazione desktop. Vedi lo schermo con una griglia di puntini rossi sovrapposta.

GRIGLIA: {cols} colonne (0–{cols-1}) × {rows} righe (0–{rows-1}).
Le etichette gialle "(col,row)" appaiono ogni 5 punti come riferimento.

Rispondi SOLO con JSON valido, NESSUN altro testo:

{{
  "action": "click" | "right_click" | "double_click" | "drag" | "type" | "hotkey" | "scroll" | "select_all" | "copy" | "analyze" | "done",
  "col": <int>,           // colonna griglia — per click/drag
  "row": <int>,           // riga griglia — per click/drag
  "col2": <int>,          // destinazione drag (colonna)
  "row2": <int>,          // destinazione drag (riga)
  "text": "<testo>",      // per type: testo da scrivere | per hotkey: "ctrl+c"
  "scroll_dir": "up|down",
  "scroll_amount": <int>,
  "reasoning": "<una riga: cosa stai facendo e perché>"
}}

Regole:
- Identifica l'elemento target, trova il puntino più vicino, usa quelle coordinate.
- Dopo ogni click aspetti il prossimo screenshot per vedere il risultato.
- "analyze": solo leggi/descrivi lo schermo senza agire (per tasks descrittivi).
- "done": task completato, includi il risultato in "reasoning".
- "copy": prima seleziona il testo (click o select_all), poi "copy" in un passo separato."""


def _parse_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        parts = text.split("```")
        text = parts[1].lstrip("json").strip() if len(parts) > 1 else text
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        logger.warning("JSON non valido: %s", text[:150])
        return {"action": "done", "reasoning": f"Risposta non parsabile: {text[:80]}"}


# ── Esecuzione azione ─────────────────────────────────────────────────────────

def execute_action(action: dict, real_w: int, real_h: int,
                   cols: int, rows: int) -> str | None:
    """Esegue l'azione. Ritorna clipboard text se action=copy, altrimenti None."""
    act = action.get("action", "done")
    reasoning = action.get("reasoning", "")

    def _xy(c_key="col", r_key="row"):
        c = max(0, min(action.get(c_key, cols // 2), cols - 1))
        r = max(0, min(action.get(r_key, rows // 2), rows - 1))
        return grid_to_screen(c, r, real_w, real_h, cols, rows)

    if act == "click":
        x, y = _xy()
        pyautogui.click(x, y)
        logger.info("→ click (%d,%d) → screen(%d,%d) | %s", action.get("col"), action.get("row"), x, y, reasoning)

    elif act == "right_click":
        x, y = _xy()
        pyautogui.rightClick(x, y)
        logger.info("→ right_click (%d,%d) | %s", action.get("col"), action.get("row"), reasoning)

    elif act == "double_click":
        x, y = _xy()
        pyautogui.doubleClick(x, y)
        logger.info("→ double_click (%d,%d) | %s", action.get("col"), action.get("row"), reasoning)

    elif act == "drag":
        x1, y1 = _xy("col", "row")
        x2, y2 = _xy("col2", "row2")
        pyautogui.drag(x1, y1, x2 - x1, y2 - y1, duration=0.4, button="left")
        logger.info("→ drag (%d,%d)→(%d,%d) | %s", x1, y1, x2, y2, reasoning)

    elif act == "type":
        text = action.get("text", "")
        pyperclip.copy(text)
        time.sleep(0.15)
        pyautogui.hotkey("ctrl", "v")
        logger.info("→ type (clipboard): %s", text[:60])

    elif act == "hotkey":
        keys = [k.strip() for k in action.get("text", "").lower().split("+")]
        pyautogui.hotkey(*keys)
        logger.info("→ hotkey: %s | %s", action.get("text"), reasoning)

    elif act == "scroll":
        x, y = _xy()
        direction = action.get("scroll_dir", "down")
        amount = action.get("scroll_amount", 3)
        delta = amount if direction == "up" else -amount
        pyautogui.scroll(delta, x=x, y=y)
        logger.info("→ scroll %s %d @ (%d,%d) | %s", direction, amount, x, y, reasoning)

    elif act == "select_all":
        x, y = _xy()
        pyautogui.click(x, y)
        time.sleep(0.1)
        pyautogui.hotkey("ctrl", "a")
        logger.info("→ select_all @ (%d,%d) | %s", x, y, reasoning)

    elif act == "copy":
        pyautogui.hotkey("ctrl", "c")
        time.sleep(0.25)
        clipboard = pyperclip.paste()
        logger.info("→ copy → clipboard: %s", clipboard[:120])
        return clipboard

    elif act == "analyze":
        logger.info("→ analyze: %s", reasoning)

    return None


# ── Loop principale ───────────────────────────────────────────────────────────

def run(task: str, cols: int = GRID_COLS, rows: int = GRID_ROWS,
        save_shots: bool = False, no_act: bool = False,
        max_loops: int = MAX_LOOPS) -> str:
    """
    Esegue il task sullo schermo.
    Ritorna la stringa con l'ultimo reasoning di Claude.
    """
    _load_env()
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        logger.error("ANTHROPIC_API_KEY non trovata nel vault.")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)
    system = _build_system(cols, rows)
    messages = []
    last_reasoning = ""

    logger.info("ScreenAgent v1.0 | Task: %s | Griglia: %dx%d", task, cols, rows)

    for loop in range(1, max_loops + 1):
        logger.info("--- Loop %d/%d ---", loop, max_loops)

        # Screenshot + griglia
        img, real_w, real_h = capture()
        img_annotated, _ = overlay_grid(img, cols, rows)

        if save_shots:
            save_shot(img_annotated, f"loop{loop:02d}")

        img_b64 = img_to_b64(img_annotated)

        # Costruisci messaggio utente
        if loop == 1:
            user_content = [
                {"type": "text", "text": f"Task: {task}"},
                {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": img_b64}},
            ]
        else:
            prev_action = messages[-1]["content"] if messages else ""
            user_content = [
                {"type": "text", "text": "Azione eseguita. Schermo aggiornato:"},
                {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": img_b64}},
            ]

        messages.append({"role": "user", "content": user_content})

        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=512,
                system=system,
                messages=messages,
            )
        except Exception as e:
            logger.error("API error: %s", e)
            break

        raw_text = resp.content[0].text
        messages.append({"role": "assistant", "content": raw_text})

        action = _parse_json(raw_text)
        act_type = action.get("action", "done")
        last_reasoning = action.get("reasoning", "")

        logger.info("Claude: [%s] %s", act_type, last_reasoning)

        if act_type == "done" or act_type == "analyze":
            logger.info("Completato: %s", last_reasoning)
            break

        if not no_act:
            result = execute_action(action, real_w, real_h, cols, rows)
            if result is not None:
                # Testo copiato → aggiungi alla conversazione come contesto
                messages.append({
                    "role": "user",
                    "content": f"[Clipboard copiato]: {result[:500]}"
                })
                messages.append({
                    "role": "assistant",
                    "content": json.dumps({"action": "done", "reasoning": f"Testo copiato: {result[:200]}"})
                })
                last_reasoning = result
                break
        else:
            logger.info("[no-act mode] azione non eseguita.")
            break

        time.sleep(0.6)

    else:
        logger.warning("Raggiunto max loop (%d), task interrotto.", max_loops)

    return last_reasoning


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    p = argparse.ArgumentParser(description="TITANIUM_OS ScreenAgent — griglia puntini")
    p.add_argument("task", help="Cosa fare sullo schermo")
    p.add_argument("-s", "--save-shots", action="store_true", help="Salva screenshot annotati in DATA/screen_agent_shots/")
    p.add_argument("-n", "--no-act",     action="store_true", help="Solo analisi, non eseguire azioni fisiche")
    p.add_argument("-l", "--loops",  type=int, default=MAX_LOOPS, help="Max iterazioni")
    p.add_argument("--cols", type=int, default=GRID_COLS, help="Colonne griglia")
    p.add_argument("--rows", type=int, default=GRID_ROWS, help="Righe griglia")
    args = p.parse_args()

    result = run(
        task=args.task,
        cols=args.cols,
        rows=args.rows,
        save_shots=args.save_shots,
        no_act=args.no_act,
        max_loops=args.loops,
    )
    print(f"\nRisultato: {result}")


if __name__ == "__main__":
    main()
