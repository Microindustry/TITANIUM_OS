# night_caroselli_nina.py | TITANIUM_OS / CAROSELLI_AGENT | v1.0 | 2026-07-16
# L'APPRENDISTA NOTTURNO — CORSIA NINA (ONDATA B, attacco #2 finding #4).
# Gemello di night_caroselli, ma per il cammino educativo di Nina. Differenza chiave:
# NON inventa. I 53 testi EP_N2 ESISTONO GIA' come canone (episodes/S_AVVENTURA/):
# l'apprendista li IMPAGINA in un carosello (VERBATIM dove possibile), non li scrive.
# Percio' NON usa la GPU/RAG — il grounding e' il testo canonico stesso.
#   0. REFILL  : nina_queue rifornisce la coda dai testi ready senza carosello
#   1. QUEUE   : primo item "pending" da DATA/caroselli_nina_queue.json
#   2. SOURCE  : legge il testo EP_N2 canonico (dossier = il testo, niente invenzione)
#   3. DRAFT   : Claude (sonnet) impagina in <=10 slide (3 strati, onde, open loop)
#   4. BUILD   : sg_builder (stampo condiviso, voce="nina"); scene SOLO dalla libreria
#   5. RENDER  : slides/ PNG + slides_ig/ JPEG
#   6. QC      : caroselli_qc + canon_guard (incl. [persone]: Nina/parentela = falla)
# Guardie: lock single-instance (proprio) · timeout 20 min · MAX_BOZZE con TETTO
#          anti-backlog · nessun push · additivo (tutto sotto _BOZZE/).

import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

BASE      = Path(__file__).resolve().parents[2]
CAROSELLI = BASE / "CONTENT_ENGINE" / "DATABASE" / "MONDO" / "POSTER" / "CAROSELLI"
BOZZE     = CAROSELLI / "_BOZZE"
QUEUE     = BASE / "DATA" / "caroselli_nina_queue.json"
REPORT    = BASE / "DATA" / "audit" / "bozze_caroselli_nina.json"
LOG       = BASE / "DATA" / "logs" / "night_caroselli_nina.log"
LOCK      = BASE / "DATA" / "night_caroselli_nina.lock"

MODEL       = "claude-sonnet-4-6"   # economico, NO Opus (regola notturne)
MAX_MINUTES = 20
MAX_BOZZE   = 3                      # bozze/notte
MAX_BACKLOG = 6                      # TETTO anti-backlog (pubblicare e' il collo)
MIN_TESTO   = 600                    # sotto questa soglia il testo canonico e' sospetto

sys.path.insert(0, str(CAROSELLI / "_TEMPLATE"))
sys.path.insert(0, str(BASE / "CONTENT_ENGINE" / "scripts"))
sys.path.insert(0, str(BASE / "AUTOMATIONS" / "core"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

_START = time.time()


def log(msg: str) -> None:
    line = f"[{datetime.now():%d/%m/%Y %H:%M:%S}] [pid {os.getpid()}] {msg}"
    print(line, flush=True)
    try:
        LOG.parent.mkdir(parents=True, exist_ok=True)
        with LOG.open("a", encoding="utf-8") as f:
            f.write(line + "\n")
    except PermissionError:
        pass


def _timeout() -> bool:
    return (time.time() - _START) > MAX_MINUTES * 60


def _save_report(item: dict, status: str, issues: list, folder: str = "") -> None:
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    rep = {"generated": datetime.now().isoformat()[:19],
           "item": item.get("id", "?"), "title": item.get("title", ""),
           "status": status, "issues": issues, "folder": folder}
    REPORT.write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    log(f"report: {rep['item']} -> {status} ({len(issues)} issue)")


SYSTEM = """Sei l'apprendista notturno di TITANIUM_OS per il cammino di NINA (mondo educativo).
Ti do il TESTO CANONICO di un episodio (Nina + THEMIS scoprono un principio reale). Il tuo
compito NON e' inventare: e' IMPAGINARE quel testo in un carosello Instagram, restando fedele.
REGOLE NON NEGOZIABILI:
- USA SOLO i contenuti del testo canonico. VERBATIM dove possibile (frasi-chiave, i numeri
  didattici dell'episodio). Se una cosa non c'e' nel testo, non la aggiungi.
- Nina e THEMIS sono PERSONAGGI del racconto. MAI trattarli come persone reali; MAI parentela
  reale ("mia figlia", "papa'"), MAI foto reali. Nina e' la guida-bambina del mondo, THEMIS il
  custode della misura.
- Voce: narratore del cammino, calda e concreta, per un pubblico ampio (il bambino, il curioso,
  il grande). MAI motivazionale vuoto. Italiano.
- 3 STRATI (il testo li dichiara in "3 strati"): il bambino (immagine concreta), il curioso
  (il meccanismo), il grande (il fatto tecnico). Distribuiscili tra le slide.
- MAI codici interni (EP_N2, casella, RAG, chunk, Pietra ⟡...) nel testo per il pubblico:
  parole piane. MAI numeri di progetto V32 (178 kg, ±0,019) come fatti.
- Max 10 slide. Slide 1 = COPERTINA: titolo-gancio max 2 righe corte.
- Ogni slide: kicker (etichetta MAIUSCOLA breve), lead (titolo, HTML con al piu'
  <span class="accent|cyan|pink|rose"> e <br>), intro (2-3 frasi, puo' usare
  <span class="soft|g|cyan|pink">), opzionali seal (frase-sigillo breve) e cta (solo ultima).
- scene: scegli SOLO da questa lista: {scenes}
- Ultima slide: open loop + cta verso la prossima tappa del cammino.
Rispondi SOLO con JSON valido:
{{"caption": "caption IG con hashtag", "slides": [{{"kicker": "...", "lead": "...",
"intro": "...", "seal": "", "cta": "", "scene": "..."}}]}}"""


def draft_with_claude(item: dict, testo: str, scenes: list[str]) -> dict:
    import anthropic
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"], max_retries=3)
    user = (f"EPISODIO DA IMPAGINARE: {item['title']} (casella {item.get('casella','?')} del cammino)\n\n"
            f"TESTO CANONICO (fonte unica — impagina questo, non inventare):\n{testo}")
    msg = client.messages.create(model=MODEL, max_tokens=4000,
                                 system=SYSTEM.format(scenes=", ".join(scenes)),
                                 messages=[{"role": "user", "content": user}])
    txt = msg.content[0].text.strip()
    m = re.search(r"\{.*\}", txt, re.S)
    return json.loads(m.group(0))


def main() -> int:
    if LOCK.exists() and (time.time() - LOCK.stat().st_mtime) < 3600:
        log("lock presente (<1h): un'altra istanza gira — esco pulito")
        return 0
    LOCK.write_text(str(os.getpid()), encoding="utf-8")
    try:
        return run()
    finally:
        LOCK.unlink(missing_ok=True)


def run() -> int:
    log(f"START night_caroselli_nina (modello {MODEL})")
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log("ANTHROPIC_API_KEY assente — esco (exit 2)")
        return 2

    # 0 · REFILL — la coda si rifornisce dai testi canonici (non muore a mano)
    try:
        import nina_queue
        rep = nina_queue.ensure_pending()
        if rep.get("added"):
            log(f"refill coda: +{rep['added']} pending dai testi ({', '.join(rep['ids'])})")
    except Exception as e:  # noqa: BLE001
        log(f"refill saltato: {e}")

    if not QUEUE.exists():
        log("coda assente — niente da fare (exit 0)")
        return 0

    made, last_rc = 0, 0
    while made < MAX_BOZZE and not _timeout():
        queue = json.loads(QUEUE.read_text(encoding="utf-8"))
        backlog = sum(1 for i in queue.get("items", [])
                      if str(i.get("status", "")).startswith("bozza_"))
        if backlog >= MAX_BACKLOG:
            log(f"tetto backlog raggiunto ({backlog} bozze non promosse >= {MAX_BACKLOG}) — "
                "stop: il collo e' la pubblicazione, non la generazione")
            break
        item = next((i for i in queue.get("items", [])
                     if i.get("status") == "pending" and not i.get("insieme")), None)
        if item is None:
            log("coda vuota (nessun pending)" if made == 0
                else f"coda esaurita dopo {made} bozze")
            break
        log(f"[bozza {made+1}/{MAX_BOZZE}] item: {item['id']} — {item['title']}")
        last_rc = _produce(item, queue)
        made += 1

    log(f"END batch — {made} bozza/e prodotta/e")
    return last_rc


def _produce(item: dict, queue: dict) -> int:
    """Pipeline per UN episodio Nina: legge il testo canonico -> impagina -> build ->
    render -> QC. Ritorna un exit-code (0 ok / 1 errore / 3 timeout). Scrive coda + report."""
    # 2 · SOURCE — il testo canonico E' il dossier (nessuna invenzione, nessuna GPU)
    tpath = BASE / item["text_path"]
    if not tpath.exists():
        _save_report(item, "errore", [f"testo canonico assente: {item['text_path']}"])
        item["status"] = "testo_assente"
        QUEUE.write_text(json.dumps(queue, ensure_ascii=False, indent=2), encoding="utf-8")
        return 1
    testo = tpath.read_text(encoding="utf-8", errors="replace")
    if len(testo) < MIN_TESTO:
        _save_report(item, "grounding_debole",
                     [f"testo {len(testo)} char < {MIN_TESTO}: episodio troppo scarno"])
        item["status"] = "grounding_debole"
        QUEUE.write_text(json.dumps(queue, ensure_ascii=False, indent=2), encoding="utf-8")
        return 0

    # 3 · DRAFT
    from sg_builder import SCENES, build
    import canon_guard
    if _timeout():
        _save_report(item, "timeout", ["timeout pre-draft"])
        return 3
    try:
        data = draft_with_claude(item, testo, list(SCENES.keys()))
    except Exception as e:  # noqa: BLE001
        _save_report(item, "errore", [f"draft fallito: {e}"])
        return 1
    slides = data.get("slides", [])[:10]
    issues: list[str] = []
    for s in slides:
        if s.get("scene") not in SCENES:
            issues.append(f"scena '{s.get('scene')}' fuori libreria -> tolta")
            s["scene"] = ""
        for k in ("lead", "intro", "seal", "cta", "kicker"):
            if s.get(k):
                s[k] = canon_guard.clean(s[k])
        testo_slide = " ".join(str(s.get(k, "")) for k in ("lead", "intro", "seal"))
        hits = canon_guard.scan(testo_slide) + canon_guard.scan_public(testo_slide)
        if hits:
            issues.append(f"canon_guard: {hits[0][:90]}")

    # 4 · BUILD (in quarantena, stampo Nina)
    folder = BOZZE / item["id"]
    folder.mkdir(parents=True, exist_ok=True)
    meta = {"title": f"Nina · {item['id']} — {item['title']}",
            "toplabel": item.get("toplabel", "IL MONDO DI NINA · IL CAMMINO"),
            "serie": item["id"], "voce": "nina"}
    for s in slides:
        s["social"] = True
    build(folder, meta, slides)
    (folder / "caption.txt").write_text(data.get("caption", ""), encoding="utf-8")
    (folder / "README.md").write_text(
        f"# BOZZA · {item['id']} — {item['title']} (cammino Nina)\n\n*Impaginata dall'apprendista "
        f"notturno {datetime.now():%d/%m/%Y %H:%M} dal testo canonico "
        f"`{item['text_path']}` — NON promossa.*\n\nPromozione (solo di giorno, dopo revisione): "
        f"sposta in CAROSELLI/NINA/{item['id']}/, rigenera griglia + PDF.\n", encoding="utf-8")

    # 5 · RENDER
    import render_queue as rq
    if _timeout():
        _save_report(item, "timeout", issues + ["timeout pre-render"], str(folder))
        return 3
    outs = rq._render_html(folder / "carosello.html", folder / "slides", as_jpeg=False)
    rq._sheet(outs, folder / "_sheet.png")
    igdir = folder / "slides_ig"
    igdir.mkdir(exist_ok=True)
    from PIL import Image
    for png in outs:
        img = Image.open(png).convert("RGB")
        jpg = igdir / (png.stem + ".jpg")
        q = 92
        img.save(jpg, quality=q)
        while jpg.stat().st_size > rq.MAX_JPEG_BYTES and q > 40:
            q -= 10
            img.save(jpg, quality=q)

    # 6 · QC
    import caroselli_qc as qc
    html = folder / "carosello.html"
    n = qc._check_html(html, qc.MAX_COMPLETO, issues, item["id"], "bozza")
    qc._check_cover(html, issues, item["id"])
    if len(outs) != n:
        issues.append(f"render: {len(outs)} png su {n} slide")

    status = "verde" if not issues else "falle"
    item["status"] = "bozza_" + status
    item["bozza"] = str(folder.relative_to(BASE))
    QUEUE.write_text(json.dumps(queue, ensure_ascii=False, indent=2), encoding="utf-8")
    _save_report(item, status, issues, str(folder))
    log(f"END ok — bozza {item['id']} ({n} slide, QC {status})")
    return 0


if __name__ == "__main__":
    try:
        rc = main()
    except Exception as e:  # noqa: BLE001
        log(f"CRASH: {e!r}")
        rc = 1
    log(f"EXIT {rc}")
    sys.exit(rc)
