# computer_use_agent.py | TITANIUM_OS / NODES / COMPUTER_USE | v1.0 | 2026-05-29
"""
Agente che controlla il desktop via Anthropic Computer Use API.
Loop: screenshot → Claude → azione (click/tastiera/scroll) → repeat.
Uso: python computer_use_agent.py "Apri il browser e vai su localhost:5173"
     python computer_use_agent.py "Fai uno screenshot e salvalo"
"""

import os, sys, time, base64, json, argparse
from pathlib import Path
from io import BytesIO
import anthropic
import mss
import mss.tools
import pyautogui
from PIL import Image

# ── Config ──────────────────────────────────────────────────────────────────
BASE_DIR   = Path(__file__).resolve().parents[3]
VAULT_ENV  = BASE_DIR / "_VAULT" / "KEYS" / "titanium_os.env"
SHOTS_DIR  = BASE_DIR / "DATA" / "computer_use_shots"
SHOTS_DIR.mkdir(parents=True, exist_ok=True)

MAX_LOOPS  = 30          # sicurezza: interrompi dopo N iterazioni
SCALE      = 0.5         # scala screenshot prima di mandarlo all'API (riduce token)
MODEL      = "claude-sonnet-4-6"
BETA       = "computer-use-2025-11-24"

pyautogui.FAILSAFE = True  # muovi il mouse in alto a sinistra per fermare


def _load_env():
    if VAULT_ENV.exists():
        for line in VAULT_ENV.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())


def capture_screenshot() -> tuple[bytes, int, int]:
    """Cattura lo schermo, ritorna (png_bytes, width, height)."""
    with mss.mss() as sct:
        monitor = sct.monitors[1]  # schermo principale
        raw = sct.grab(monitor)
        img = Image.frombytes("RGB", raw.size, raw.bgra, "raw", "BGRX")
        w, h = img.size
        if SCALE < 1.0:
            img = img.resize((int(w * SCALE), int(h * SCALE)), Image.LANCZOS)
        buf = BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue(), int(w * SCALE), int(h * SCALE)


def save_screenshot(data: bytes, label: str = ""):
    ts = time.strftime("%H%M%S")
    path = SHOTS_DIR / f"{ts}_{label}.png"
    path.write_bytes(data)
    return str(path)


def _scale_coord(x: int, y: int, img_w: int, img_h: int) -> tuple[int, int]:
    """Trasforma coordinate screenshot (scalato) in coordinate schermo reali."""
    with mss.mss() as sct:
        mon = sct.monitors[1]
        real_w, real_h = mon["width"], mon["height"]
    rx = int(x * real_w / img_w)
    ry = int(y * real_h / img_h)
    return rx, ry


def execute_action(action: dict, img_w: int, img_h: int) -> str:
    """Esegue l'azione restituita da Claude."""
    t = action.get("type", "")

    if t == "screenshot":
        return "screenshot richiesto"

    elif t in ("left_click", "right_click", "middle_click"):
        x, y = _scale_coord(action["coordinate"][0], action["coordinate"][1], img_w, img_h)
        button = t.replace("_click", "")
        pyautogui.click(x, y, button=button)
        return f"click {button} @ ({x},{y})"

    elif t == "double_click":
        x, y = _scale_coord(action["coordinate"][0], action["coordinate"][1], img_w, img_h)
        pyautogui.doubleClick(x, y)
        return f"double_click @ ({x},{y})"

    elif t == "left_click_drag":
        x1, y1 = _scale_coord(action["start_coordinate"][0], action["start_coordinate"][1], img_w, img_h)
        x2, y2 = _scale_coord(action["end_coordinate"][0], action["end_coordinate"][1], img_w, img_h)
        pyautogui.drag(x1, y1, x2, y2, duration=0.3)
        return f"drag ({x1},{y1}) → ({x2},{y2})"

    elif t == "type":
        pyautogui.typewrite(action["text"], interval=0.03)
        return f"type: {action['text'][:40]}"

    elif t == "key":
        keys = action["text"].lower().replace("+", " ").split()
        pyautogui.hotkey(*keys)
        return f"key: {action['text']}"

    elif t == "scroll":
        x, y = _scale_coord(action["coordinate"][0], action["coordinate"][1], img_w, img_h)
        clicks = action.get("scroll_direction", "down")
        amount = action.get("scroll_distance", 3)
        direction = -amount if clicks == "down" else amount
        pyautogui.scroll(direction, x=x, y=y)
        return f"scroll {clicks} {amount} @ ({x},{y})"

    elif t == "wait":
        time.sleep(action.get("duration", 1))
        return "wait"

    elif t == "cursor_position":
        x, y = _scale_coord(action["coordinate"][0], action["coordinate"][1], img_w, img_h)
        pyautogui.moveTo(x, y)
        return f"move cursor @ ({x},{y})"

    return f"azione sconosciuta: {t}"


def run(task: str, verbose: bool = True, save_shots: bool = False):
    _load_env()
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[ERRORE] ANTHROPIC_API_KEY non trovata nel vault.")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    print(f"\n[ COMPUTER_USE ] Task: {task}")
    print(f"  Modello: {MODEL} | Beta: {BETA}")
    print(f"  Schermo scala: {SCALE}x | Max loop: {MAX_LOOPS}\n")

    messages = [{"role": "user", "content": task}]
    loop = 0

    while loop < MAX_LOOPS:
        loop += 1

        # Cattura screenshot corrente
        shot_bytes, img_w, img_h = capture_screenshot()
        if save_shots:
            save_screenshot(shot_bytes, f"loop{loop:02d}")

        shot_b64 = base64.standard_b64encode(shot_bytes).decode()

        # Aggiungi screenshot al messaggio se non è il primo giro
        if loop > 1:
            messages.append({
                "role": "user",
                "content": [{
                    "type": "tool_result",
                    "tool_use_id": last_tool_id,
                    "content": [{
                        "type": "image",
                        "source": {"type": "base64", "media_type": "image/png", "data": shot_b64}
                    }]
                }]
            })

        # Se primo giro, allega screenshot al task iniziale
        if loop == 1:
            messages = [{
                "role": "user",
                "content": [
                    {"type": "text", "text": task},
                    {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": shot_b64}}
                ]
            }]

        try:
            resp = client.beta.messages.create(
                model=MODEL,
                max_tokens=1024,
                tools=[{
                    "type": "computer_20250124",
                    "name": "computer",
                    "display_width_px": img_w,
                    "display_height_px": img_h,
                    "display_number": 1
                }],
                messages=messages,
                betas=[BETA],
            )
        except Exception as e:
            print(f"[ERRORE API] {e}")
            break

        if verbose:
            print(f"  Loop {loop} | stop_reason: {resp.stop_reason}")

        # Processa risposta
        tool_uses = []
        text_parts = []
        for block in resp.content:
            if block.type == "text":
                text_parts.append(block.text)
            elif block.type == "tool_use":
                tool_uses.append(block)

        if text_parts:
            print(f"  Claude: {' '.join(text_parts)[:200]}")

        # Aggiungi risposta assistant alla conversazione
        messages.append({"role": "assistant", "content": resp.content})

        # Se nessun tool_use → task completato
        if not tool_uses or resp.stop_reason == "end_turn":
            print(f"\n[ DONE ] Task completato in {loop} loop.")
            break

        # Esegui azioni
        last_tool_id = None
        for tu in tool_uses:
            last_tool_id = tu.id
            action = tu.input
            result = execute_action(action, img_w, img_h)
            if verbose:
                print(f"    → {result}")
            time.sleep(0.4)  # pausa tra azioni

    else:
        print(f"\n[ TIMEOUT ] Raggiunti {MAX_LOOPS} loop, task interrotto.")


def main():
    parser = argparse.ArgumentParser(description="TITANIUM_OS Computer Use Agent")
    parser.add_argument("task", help="Descrizione del task da eseguire")
    parser.add_argument("-v", "--verbose", action="store_true", default=True)
    parser.add_argument("-s", "--save-shots", action="store_true", help="Salva screenshot in DATA/computer_use_shots/")
    args = parser.parse_args()
    run(args.task, verbose=args.verbose, save_shots=args.save_shots)


if __name__ == "__main__":
    main()
