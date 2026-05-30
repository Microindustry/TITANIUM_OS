# browser_agent.py | TITANIUM_OS / NODES / COMPUTER_USE | v1.0 | 2026-05-30
# Controllo browser: CDP-first (Playwright), DevTools console fallback

import time, logging
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
try:
    from CORE.log import get_logger
    logger = get_logger("browser_agent")
except ImportError:
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("browser_agent")

from .computer_use import ComputerUse

CDP_PORT    = 9222
CDP_URL     = f"http://localhost:{CDP_PORT}"
CHROME_EXE  = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


class BrowserAgent:
    """
    Controllo browser a due livelli:
    1. CDP (Playwright) — se Chrome parte con --remote-debugging-port=9222
    2. DevTools console (PyAutoGUI + win32gui) — fallback universale
    """

    def __init__(self):
        self._cu       = ComputerUse()
        self._pw       = None   # playwright instance
        self._browser  = None   # CDP browser
        self._ctx      = None   # browser context

    # ── CDP ──────────────────────────────────────────────────────────────────

    def connect_cdp(self) -> bool:
        """Prova a connettersi a Chrome via CDP. Ritorna True se riesce."""
        try:
            from playwright.sync_api import sync_playwright
            self._pw      = sync_playwright().start()
            self._browser = self._pw.chromium.connect_over_cdp(CDP_URL)
            logger.info("CDP connesso a Chrome (porta %d)", CDP_PORT)
            return True
        except Exception as e:
            logger.info("CDP non disponibile: %s", e)
            self._pw = None
            return False

    def cdp_connected(self) -> bool:
        return self._browser is not None and self._browser.is_connected()

    def get_page(self, url_contains: str = None):
        """Ritorna la prima pagina aperta che matcha url_contains."""
        if not self.cdp_connected():
            return None
        for ctx in self._browser.contexts:
            for page in ctx.pages:
                if url_contains is None or url_contains in page.url:
                    return page
        return None

    def new_page(self, url: str = None):
        """Apre una nuova pagina nel browser CDP."""
        if not self.cdp_connected():
            return None
        if not self._browser.contexts:
            self._ctx = self._browser.new_context()
        else:
            self._ctx = self._browser.contexts[0]
        page = self._ctx.new_page()
        if url:
            page.goto(url, wait_until="domcontentloaded")
        return page

    def run_js(self, js: str, url_contains: str = None):
        """Esegue JS sulla pagina attiva via CDP."""
        page = self.get_page(url_contains)
        if not page:
            page = self.new_page()
        if not page:
            return None
        return page.evaluate(js)

    def navigate(self, url: str, wait: str = "domcontentloaded"):
        """Naviga a URL via CDP."""
        page = self.get_page()
        if not page:
            page = self.new_page()
        page.goto(url, wait_until=wait)
        return page

    def fill(self, selector: str, value: str, url_contains: str = None):
        """Compila un campo form via CDP."""
        page = self.get_page(url_contains)
        if page:
            page.fill(selector, value)

    def click_selector(self, selector: str, url_contains: str = None):
        """Clicca un elemento via CDP selector."""
        page = self.get_page(url_contains)
        if page:
            page.click(selector)

    def disconnect(self):
        if self._browser:
            self._browser.close()
        if self._pw:
            self._pw.stop()
        self._browser = self._pw = None

    # ── DEVTOOLS CONSOLE FALLBACK ─────────────────────────────────────────────

    def _chrome_hwnd(self, url_hint: str = None) -> int | None:
        hint = url_hint or "Chrome"
        return self._cu.find_window(hint, class_name="Chrome_WidgetWin_1", timeout=5) \
            or self._cu.find_window("Chrome", class_name="Chrome_WidgetWin_1", timeout=3)

    def devtools_run_js(self, js: str, url_hint: str = None) -> bool:
        """
        Fallback: apre DevTools console e incolla JS.
        Funziona anche senza CDP ma richiede Chrome in foreground.
        """
        hwnd = self._chrome_hwnd(url_hint)
        if not hwnd:
            logger.error("Chrome non trovato")
            return False

        self._cu.focus(hwnd)
        time.sleep(0.5)
        self._cu.hotkey("f12")
        time.sleep(2.5)

        # Clicca area console (basso-destra del DevTools panel)
        rect = self._cu.window_rect(hwnd)
        if rect:
            l, t, r, b = rect
            self._cu.click(l + (r - l) * 3 // 4, t + (b - t) * 9 // 10)
        time.sleep(0.4)

        self._cu.paste(js)
        time.sleep(0.2)
        self._cu.press("enter")
        time.sleep(1.5)
        return True

    def devtools_close(self, url_hint: str = None):
        hwnd = self._chrome_hwnd(url_hint)
        if hwnd:
            self._cu.focus(hwnd)
            self._cu.hotkey("f12")

    # ── HIGH-LEVEL ACTIONS ────────────────────────────────────────────────────

    def open_url_and_run(self, url: str, js: str) -> bool:
        """
        Apre URL e esegue JS.
        Usa CDP se disponibile, DevTools console altrimenti.
        """
        if self.cdp_connected():
            page = self.navigate(url)
            page.wait_for_load_state("domcontentloaded")
            time.sleep(1)
            result = page.evaluate(js)
            logger.info("CDP JS eseguito — result: %s", result)
            return True
        else:
            import subprocess
            subprocess.Popen([CHROME_EXE, url])
            time.sleep(5)
            return self.devtools_run_js(js, url_hint=url.split("/")[2])

    def open_chrome_with_cdp(self) -> bool:
        """Lancia Chrome con --remote-debugging-port se non è già aperto con CDP."""
        if self.connect_cdp():
            return True
        import subprocess
        subprocess.Popen([
            CHROME_EXE,
            f"--remote-debugging-port={CDP_PORT}",
            "--no-first-run",
            "--no-default-browser-check",
        ])
        time.sleep(3)
        return self.connect_cdp()


# Istanza globale
ba = BrowserAgent()
