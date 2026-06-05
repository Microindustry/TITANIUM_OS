# test_eva.py | TITANIUM_OS / NODES / EVA | v0.1 | 2026-06-05
# Test offline del cervello EVA: intenti stateless + flusso prenotazione multi-turno.
# Esegui:  python NODES\EVA\test_eva.py   (exit 0 = tutto verde)

import os
import sys
import tempfile
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))

# Isola la inbox EVA in una cartella temporanea: i test non sporcano DATA/eva.
os.environ["EVA_DATA_DIR"] = tempfile.mkdtemp(prefix="eva_test_")

import eva_brain
import eva_session
import eva_inbox

_fail = 0

def check(cond, label):
    global _fail
    print(("  OK  " if cond else " FAIL ") + label)
    if not cond:
        _fail += 1

def conv(sender, msg):
    return eva_brain.handle_message(msg, sender=sender)

print("== Intenti stateless ==")
check(conv("s0", "ciao")["intent"] == "saluto", "saluto")
check(conv("s0", "a che ora aprite?")["intent"] == "orari", "orari")
check(conv("s0", "che servizi offrite?")["intent"] == "servizi", "servizi")
check(conv("s0", "quanto costa un massaggio?")["intent"] == "prezzo", "prezzo")
check(conv("s0", "vendete biciclette?")["intent"] == "fallback", "fallback")

print("== Prenotazione graduale (5 turni) ==")
eva_session.reset_session("A")
r = conv("A", "vorrei prenotare");      check("trattamento" in r["reply"].lower(), "chiede servizio")
r = conv("A", "un massaggio");          check("giorno" in r["reply"].lower(),      "chiede giorno")
r = conv("A", "giovedi");               check("ora" in r["reply"].lower(),         "chiede ora")
r = conv("A", "alle 15");               check("nome" in r["reply"].lower(),        "chiede nome")
r = conv("A", "Maria");                 check(r["handoff"] and "Massaggio" in r["reply"], "riepilogo+handoff")
check("15:00" in r["reply"] and "giovedi" in r["reply"] and "Maria" in r["reply"], "slot corretti nel riepilogo")
check(not eva_session.active("A"), "sessione chiusa dopo done")

print("== Prenotazione one-shot ==")
eva_session.reset_session("B")
r = conv("B", "posso prenotare una pulizia viso domani alle 10:30?")
check("nome" in r["reply"].lower(), "one-shot: mancava solo il nome")
r = conv("B", "Giulia")
check(r["handoff"] and "Pulizia viso" in r["reply"] and "10:30" in r["reply"] and "domani" in r["reply"], "one-shot riepilogo")

print("== Annullamento in corso ==")
eva_session.reset_session("C")
conv("C", "vorrei prenotare un massaggio")
check(eva_session.active("C"), "sessione attiva")
r = conv("C", "lascia perdere")
check(r["intent"] == "annulla_prenotazione" and not eva_session.active("C"), "annullato e sessione chiusa")

print("== Slot strutturati nel risultato ==")
eva_session.reset_session("D")
conv("D", "vorrei prenotare un massaggio domani alle 16")
r = conv("D", "Anna")
check(r.get("slots", {}).get("name") == "Anna", "risultato porta gli slot a flusso completo")
check(r["slots"].get("time") == "16:00" and "Massaggio" in r["slots"].get("service", ""), "slot service/time corretti")

print("== Persistenza sessioni (sopravvive al restart) ==")
import importlib
eva_session.reset_session("P")
conv("P", "vorrei prenotare un massaggio")   # avvia, stato su disco
conv("P", "venerdi")                          # avanza
check(eva_session.active("P"), "sessione P attiva prima del 'restart'")
# Simula un riavvio del processo: ricarica il modulo -> rilegge da sessions.json
eva_session = importlib.reload(eva_session)
eva_brain.eva_session = eva_session           # ri-aggancia il brain al modulo ricaricato
check(eva_session.active("P"), "sessione P ripristinata dopo reload")
r = conv("P", "alle 11")
check("nome" in r["reply"].lower(), "il flusso riprende dal punto giusto post-restart")

print("== Inbox handoff ==")
rec = eva_inbox.record_handoff({"sender": "39333", "intent": "prenotazione",
                                "reply": "ok", "slots": {"service": "Massaggio", "name": "Anna"}})
check(rec["status"] == "nuovo" and "ts" in rec, "record con status/ts di default")
recs = eva_inbox.read_handoffs()
check(len(recs) >= 1 and recs[-1]["sender"] == "39333", "handoff riletto dalla inbox")
check(len(eva_inbox.read_handoffs(status="chiuso")) == 0, "filtro status esclude i non-chiusi")

print()
if _fail:
    print(f"X {_fail} test FALLITI")
    sys.exit(1)
print("Tutti i test verdi.")
