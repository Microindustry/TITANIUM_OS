# github_actions.py | TITANIUM_OS / NODES / COMPUTER_USE / actions | v1.0 | 2026-05-30
# Azioni GitHub: pin repo, aggiorna profilo, ecc.

import time
from ..browser_agent import BrowserAgent

PROFILE_URL = "https://github.com/Microindustry"
SETTINGS_URL = "https://github.com/settings/profile"


def pin_repos(repos: list[str], agent: BrowserAgent = None) -> bool:
    """Pinna i repo specificati sul profilo GitHub."""
    ba = agent or BrowserAgent()

    js_open_panel = (
        "Array.from(document.querySelectorAll('summary,button'))"
        ".find(el=>el.textContent.trim().includes('Customize your pins'))?.click()"
    )
    js_clear = (
        "Array.from(document.querySelectorAll('input[type=checkbox]:checked'))"
        ".forEach(cb=>cb.click())"
    )
    repos_str = str(repos)
    js_select = (
        f"(function(){{var r={repos_str};"
        "r.forEach(function(n){"
        "var l=Array.from(document.querySelectorAll('label'))"
        ".find(x=>x.textContent.trim()===n||x.textContent.includes(n));"
        "if(l){var cb=l.querySelector('input[type=checkbox]');"
        "if(cb&&!cb.checked){cb.click();console.log('pin:'+n);}}"
        "});}})()"
    )
    js_save = (
        "Array.from(document.querySelectorAll('button[type=submit]'))"
        ".find(b=>b.textContent.includes('Save'))?.click()"
    )

    if ba.cdp_connected():
        page = ba.navigate(PROFILE_URL)
        page.wait_for_load_state("domcontentloaded")
        time.sleep(1)
        page.evaluate(js_open_panel); time.sleep(1.5)
        page.evaluate(js_clear);      time.sleep(0.5)
        page.evaluate(js_select);     time.sleep(1)
        page.evaluate(js_save);       time.sleep(1.5)
        return True
    else:
        ba.open_url_and_run(PROFILE_URL, js_open_panel)
        time.sleep(2)
        ba.devtools_run_js(js_clear)
        time.sleep(1)
        ba.devtools_run_js(js_select)
        time.sleep(1)
        ba.devtools_run_js(js_save)
        ba.devtools_close()
        return True


def update_profile(bio: str, location: str, agent: BrowserAgent = None) -> bool:
    """Aggiorna bio e location del profilo GitHub (web UI)."""
    ba = agent or BrowserAgent()
    if ba.cdp_connected():
        page = ba.navigate(SETTINGS_URL)
        page.wait_for_load_state("domcontentloaded")
        time.sleep(1)
        page.fill("#user_profile_bio", bio)
        page.fill("#user_profile_location", location)
        page.locator("button[type=submit]").first.click()
        time.sleep(1.5)
        return True
    return False
