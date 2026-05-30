# computer_use.py | TITANIUM_OS / NODES / COMPUTER_USE | v1.0 | 2026-05-30
# Primitives per controllo desktop: finestre, tastiera, mouse, screenshot

import os, sys, subprocess, time, logging
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("computer_use")
except ImportError:
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("computer_use")

import pyautogui
import pyperclip

pyautogui.FAILSAFE = False
pyautogui.PAUSE = 0.15

# Windows-only imports
try:
    import win32gui, win32con, win32process, win32api
    import ctypes
    WINDOWS = True
except ImportError:
    WINDOWS = False
    logger.warning("win32* non disponibile — funzioni finestre disabilitate")


class ComputerUse:
    """
    Controllo desktop: trova finestre, invia tasti, muove mouse, cattura screenshot.
    CDP-first per browser, PyAutoGUI per tutto il resto.
    """

    # ── WINDOW MANAGEMENT ────────────────────────────────────────────────────

    def find_windows(self, title_contains: str = None, class_name: str = None) -> list[tuple[int, str]]:
        """Trova finestre visibili per titolo e/o classe. Ritorna [(hwnd, title), ...]."""
        if not WINDOWS:
            return []
        results = []
        def cb(hwnd, _):
            if not win32gui.IsWindowVisible(hwnd):
                return
            title = win32gui.GetWindowText(hwnd)
            cls   = win32gui.GetClassName(hwnd)
            if title_contains and title_contains.lower() not in title.lower():
                return
            if class_name and class_name not in cls:
                return
            results.append((hwnd, title))
        win32gui.EnumWindows(cb, None)
        return results

    def find_window(self, title_contains: str, class_name: str = None, timeout: int = 15) -> int | None:
        """Aspetta e ritorna hwnd della prima finestra trovata, None se timeout."""
        for _ in range(timeout * 2):
            hits = self.find_windows(title_contains, class_name)
            if hits:
                return hits[0][0]
            time.sleep(0.5)
        return None

    def focus(self, hwnd: int) -> bool:
        """Porta la finestra in foreground. Usa AttachThreadInput per bypassare restrizioni."""
        if not WINDOWS:
            return False
        try:
            fg      = win32gui.GetForegroundWindow()
            fg_tid  = win32process.GetWindowThreadProcessId(fg)[0]
            tgt_tid = win32process.GetWindowThreadProcessId(hwnd)[0]
            ctypes.windll.user32.AttachThreadInput(fg_tid, tgt_tid, True)
            win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
            win32gui.BringWindowToTop(hwnd)
            win32gui.SetForegroundWindow(hwnd)
            ctypes.windll.user32.AttachThreadInput(fg_tid, tgt_tid, False)
            time.sleep(0.5)
            return True
        except Exception as e:
            logger.debug("focus warn: %s", e)
            return False

    def window_rect(self, hwnd: int) -> tuple[int, int, int, int] | None:
        """Ritorna (left, top, right, bottom) della finestra."""
        if not WINDOWS:
            return None
        try:
            return win32gui.GetWindowRect(hwnd)
        except Exception:
            return None

    # ── KEYBOARD ─────────────────────────────────────────────────────────────

    def hotkey(self, *keys):
        pyautogui.hotkey(*keys)

    def type_text(self, text: str, interval: float = 0.04):
        """Digita testo carattere per carattere."""
        pyautogui.typewrite(text, interval=interval)

    def paste(self, text: str):
        """Copia in clipboard e incolla — più veloce e sicuro di typewrite."""
        pyperclip.copy(text)
        time.sleep(0.15)
        pyautogui.hotkey("ctrl", "v")

    def press(self, *keys):
        for k in keys:
            pyautogui.press(k)

    # ── MOUSE ─────────────────────────────────────────────────────────────────

    def click(self, x: int, y: int, button: str = "left", clicks: int = 1):
        pyautogui.click(x, y, button=button, clicks=clicks)

    def click_relative(self, hwnd: int, rel_x: float, rel_y: float):
        """Clicca a coordinate relative alla finestra (0.0–1.0)."""
        rect = self.window_rect(hwnd)
        if not rect:
            return
        l, t, r, b = rect
        x = int(l + (r - l) * rel_x)
        y = int(t + (b - t) * rel_y)
        self.click(x, y)

    def move(self, x: int, y: int):
        pyautogui.moveTo(x, y)

    def scroll(self, clicks: int, x: int = None, y: int = None):
        pyautogui.scroll(clicks, x=x, y=y)

    # ── SCREENSHOT ────────────────────────────────────────────────────────────

    def screenshot(self, save_path: str = None, region: tuple = None):
        """Cattura schermata. Ritorna PIL Image. Salva su disco se save_path fornito."""
        img = pyautogui.screenshot(region=region)
        if save_path:
            img.save(save_path)
            logger.info("screenshot -> %s", save_path)
        return img

    def screenshot_window(self, hwnd: int, save_path: str = None):
        """Screenshot della sola finestra."""
        rect = self.window_rect(hwnd)
        if not rect:
            return self.screenshot(save_path)
        l, t, r, b = rect
        return self.screenshot(save_path, region=(l, t, r - l, b - t))

    # ── CLIPBOARD ─────────────────────────────────────────────────────────────

    def clipboard_set(self, text: str):
        pyperclip.copy(text)

    def clipboard_get(self) -> str:
        return pyperclip.paste()

    # ── APPS ──────────────────────────────────────────────────────────────────

    def open_app(self, exe: str, args: list = None, wait: bool = False):
        """Lancia un eseguibile. Ritorna il processo."""
        cmd = [exe] + (args or [])
        proc = subprocess.Popen(cmd)
        if wait:
            proc.wait()
        return proc

    def open_url(self, url: str, browser: str = None):
        """Apre URL nel browser di sistema o in quello specificato."""
        if browser:
            self.open_app(browser, [url])
        else:
            import webbrowser
            webbrowser.open(url)

    # ── SCREEN INFO ──────────────────────────────────────────────────────────

    @property
    def screen_size(self) -> tuple[int, int]:
        return pyautogui.size()


# Istanza globale per import diretto
cu = ComputerUse()
