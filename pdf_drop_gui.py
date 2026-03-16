# pdf_drop_gui.py | TITANIUM_OS | v1.0 | 2026-03-10
# Modulo: Interfaccia grafica drag & drop per pdf_to_memory
# Parte di: GENESIS
# Doppio click su APRI_PDF_DROP.bat per avviare

import sys
import tkinter as tk
from tkinter import filedialog
from pathlib import Path
import threading
import io

ROOT     = Path(__file__).resolve().parent
PDF_DROP = ROOT / "PDF_DROP"

# ── COLORI (dark, coerente con ecosystem) ────────────────────────────────────
BG        = "#0f0f0f"
BG_PANEL  = "#1a1a1a"
ACCENT    = "#00bfff"      # azzurro titanio
ACCENT2   = "#005f7f"
TEXT      = "#e0e0e0"
TEXT_DIM  = "#606060"
SUCCESS   = "#00e676"
ERROR_COL = "#ff5252"
WARN      = "#ffd740"
BORDER    = "#2a2a2a"

# ── IMPORTA pdf_to_memory ────────────────────────────────────────────────────
try:
    sys.path.insert(0, str(ROOT / "AUTOMATIONS" / "core"))
    import pdf_to_memory as p2m
    PDF_ENGINE_OK = True
except ImportError as e:
    PDF_ENGINE_OK = False
    PDF_ENGINE_ERR = str(e)

# ── SUPPORTO DRAG & DROP ─────────────────────────────────────────────────────
try:
    from tkinterdnd2 import TkinterDnD, DND_FILES
    DND_AVAILABLE = True
except ImportError:
    DND_AVAILABLE = False


class PDFDropApp:
    def __init__(self):
        # Usa TkinterDnD se disponibile, altrimenti tkinter base
        if DND_AVAILABLE:
            self.root = TkinterDnD.Tk()
        else:
            self.root = tk.Tk()

        self.root.title("PDF_DROP — TITANIUM_OS")
        self.root.geometry("640x620")
        self.root.configure(bg=BG)
        self.root.resizable(False, False)

        # Icona (ignora se non trovata)
        try:
            self.root.iconbitmap(str(ROOT / "assets" / "icon.ico"))
        except Exception:
            pass

        self._build_ui()
        self._check_engine()

    # ── UI ───────────────────────────────────────────────────────────────────
    def _build_ui(self):
        # Titolo
        tk.Label(
            self.root,
            text="PDF_DROP",
            font=("Consolas", 22, "bold"),
            fg=ACCENT, bg=BG
        ).pack(pady=(22, 0))

        tk.Label(
            self.root,
            text="TITANIUM_OS — Conversore PDF → Memoria",
            font=("Consolas", 9),
            fg=TEXT_DIM, bg=BG
        ).pack(pady=(0, 18))

        # Zona drop
        drop_frame = tk.Frame(self.root, bg=BG_PANEL, bd=0, relief="flat",
                              highlightthickness=2, highlightbackground=ACCENT2)
        drop_frame.pack(padx=28, pady=0, fill="x")

        self.drop_label = tk.Label(
            drop_frame,
            text="TRASCINA I PDF QUI",
            font=("Consolas", 15, "bold"),
            fg=ACCENT, bg=BG_PANEL,
            pady=38, cursor="hand2"
        )
        self.drop_label.pack(fill="x")

        self.drop_sub = tk.Label(
            drop_frame,
            text="oppure usa i bottoni sotto",
            font=("Consolas", 9),
            fg=TEXT_DIM, bg=BG_PANEL,
            pady=0
        )
        self.drop_sub.pack(pady=(0, 20))

        # Abilita drag & drop sulla zona se disponibile
        if DND_AVAILABLE:
            self.drop_label.drop_target_register(DND_FILES)
            self.drop_label.dnd_bind("<<Drop>>", self._on_drop)
            self.drop_sub.drop_target_register(DND_FILES)
            self.drop_sub.dnd_bind("<<Drop>>", self._on_drop)
            drop_frame.drop_target_register(DND_FILES)
            drop_frame.dnd_bind("<<Drop>>", self._on_drop)
        else:
            # Senza tkinterdnd2: mostra avviso ma app funziona comunque
            self.drop_sub.config(
                text="⚠ Drag & drop non attivo  |  pip install tkinterdnd2",
                fg=WARN
            )

        # Bottoni
        btn_frame = tk.Frame(self.root, bg=BG)
        btn_frame.pack(pady=16, padx=28, fill="x")

        self._btn(btn_frame, "SCEGLI FILE PDF", self._choose_files,
                  ACCENT, BG).pack(side="left", expand=True, fill="x", padx=(0, 6))

        self._btn(btn_frame, "PROCESSA PDF_DROP", self._process_folder,
                  BG, ACCENT).pack(side="left", expand=True, fill="x", padx=(6, 0))

        # Bottone apri cartella
        self._btn(
            self.root, "Apri cartella PDF_DROP in Explorer",
            self._open_folder, BG, TEXT_DIM, small=True
        ).pack(pady=(0, 10))

        # Separatore
        tk.Frame(self.root, bg=BORDER, height=1).pack(fill="x", padx=28, pady=(0, 10))

        # Label log
        tk.Label(
            self.root, text="LOG", font=("Consolas", 8, "bold"),
            fg=TEXT_DIM, bg=BG, anchor="w"
        ).pack(padx=28, fill="x")

        # Riquadro log
        log_frame = tk.Frame(self.root, bg=BG_PANEL,
                             highlightthickness=1, highlightbackground=BORDER)
        log_frame.pack(padx=28, pady=(4, 16), fill="both", expand=True)

        self.log_text = tk.Text(
            log_frame,
            font=("Consolas", 9),
            bg=BG_PANEL, fg=TEXT,
            bd=0, relief="flat",
            state="disabled",
            wrap="word",
            insertbackground=ACCENT,
            selectbackground=ACCENT2,
            padx=10, pady=8
        )
        self.log_text.pack(fill="both", expand=True)

        # Tag colori per il log
        self.log_text.tag_config("ok",    foreground=SUCCESS)
        self.log_text.tag_config("err",   foreground=ERROR_COL)
        self.log_text.tag_config("warn",  foreground=WARN)
        self.log_text.tag_config("info",  foreground=ACCENT)
        self.log_text.tag_config("dim",   foreground=TEXT_DIM)

        # Status bar
        self.status_var = tk.StringVar(value="Pronto.")
        tk.Label(
            self.root,
            textvariable=self.status_var,
            font=("Consolas", 8),
            fg=TEXT_DIM, bg=BG, anchor="w"
        ).pack(padx=28, pady=(0, 10), fill="x")

    def _btn(self, parent, text, cmd, bg, fg, small=False):
        """Factory bottone."""
        font = ("Consolas", 8) if small else ("Consolas", 10, "bold")
        pady = 4 if small else 10
        return tk.Button(
            parent, text=text, command=cmd,
            font=font, fg=fg, bg=bg,
            activeforeground=BG, activebackground=ACCENT,
            relief="flat", bd=0, cursor="hand2",
            pady=pady, padx=16
        )

    # ── AZIONI ───────────────────────────────────────────────────────────────
    def _check_engine(self):
        """Verifica che pdf_to_memory sia importabile."""
        if not PDF_ENGINE_OK:
            self._log(f"[ERROR] pdf_to_memory non caricato: {PDF_ENGINE_ERR}", "err")
            self._log("        Verifica che pdfplumber sia installato.", "warn")
        else:
            self._log("Sistema pronto.", "info")
            self._log(f"PDF_DROP: {PDF_DROP}", "dim")

    def _on_drop(self, event):
        """Gestisce il drop di file dalla finestra Explorer."""
        # event.data può contenere percorsi separati da spazi o con graffe per path con spazi
        raw = event.data.strip()
        # Parsa percorsi (gestisce '{path con spazi}' e 'path_senza_spazi')
        paths = []
        if raw.startswith("{"):
            import re
            paths = re.findall(r'\{([^}]+)\}|(\S+)', raw)
            paths = [p[0] or p[1] for p in paths]
        else:
            paths = raw.split()

        pdfs = [Path(p) for p in paths if Path(p).suffix.lower() == ".pdf"]

        if not pdfs:
            self._log("[WARN] Nessun PDF nel drop.", "warn")
            return

        self._process_files(pdfs)

    def _choose_files(self):
        """Apre dialogo selezione file."""
        files = filedialog.askopenfilenames(
            title="Scegli PDF da processare",
            filetypes=[("PDF files", "*.pdf *.PDF")],
            initialdir=str(PDF_DROP)
        )
        if files:
            self._process_files([Path(f) for f in files])

    def _process_folder(self):
        """Processa tutti i PDF in PDF_DROP ora."""
        pdfs = list(PDF_DROP.glob("*.pdf")) + list(PDF_DROP.glob("*.PDF"))
        if not pdfs:
            self._log("[INFO] Nessun PDF in PDF_DROP.", "warn")
            return
        self._process_files(pdfs)

    def _open_folder(self):
        """Apre PDF_DROP in Windows Explorer."""
        import subprocess
        PDF_DROP.mkdir(exist_ok=True)
        subprocess.Popen(f'explorer "{PDF_DROP}"')

    def _process_files(self, pdf_paths: list):
        """Lancia l'elaborazione in un thread separato (non blocca la GUI)."""
        if not PDF_ENGINE_OK:
            self._log("[ERROR] Motore PDF non disponibile.", "err")
            return

        self.status_var.set(f"Processo {len(pdf_paths)} PDF...")
        self._log(f"\n─── Avvio: {len(pdf_paths)} file ───", "info")

        def run():
            # Copia stdout su GUI
            old_stdout = sys.stdout
            sys.stdout = GUIStream(self._log_raw)
            ok = 0
            for path in pdf_paths:
                # Se il file non è in PDF_DROP, copialo lì prima
                if path.parent != PDF_DROP:
                    import shutil
                    dest = PDF_DROP / path.name
                    shutil.copy2(str(path), str(dest))
                    path = dest

                if p2m.process_pdf(path):
                    ok += 1

            sys.stdout = old_stdout
            total = len(pdf_paths)
            tag = "ok" if ok == total else ("warn" if ok > 0 else "err")
            self._log(f"\n─── Fine: {ok}/{total} OK ───", tag)
            self.root.after(0, lambda: self.status_var.set(
                f"Completato: {ok}/{total} OK — {total - ok} errori"
            ))

        threading.Thread(target=run, daemon=True).start()

    # ── LOG ──────────────────────────────────────────────────────────────────
    def _log(self, msg: str, tag: str = ""):
        """Aggiunge riga al log con colore."""
        self.log_text.configure(state="normal")
        self.log_text.insert("end", msg + "\n", tag)
        self.log_text.see("end")
        self.log_text.configure(state="disabled")

    def _log_raw(self, msg: str):
        """Callback per reindirizzare stdout dello script."""
        # Colore automatico in base al prefisso
        if "[OK]" in msg or "[DONE]" in msg:
            tag = "ok"
        elif "[ERROR]" in msg:
            tag = "err"
        elif "[WARN]" in msg:
            tag = "warn"
        elif "[PDF]" in msg or "[VER]" in msg or "[CLASS]" in msg:
            tag = "info"
        else:
            tag = "dim"
        self.root.after(0, lambda m=msg, t=tag: self._log(m, t))

    def run(self):
        self.root.mainloop()


class GUIStream:
    """Reindirizza sys.stdout al log della GUI."""
    def __init__(self, callback):
        self.callback = callback
        self.buf = ""

    def write(self, text):
        self.buf += text
        if "\n" in self.buf:
            lines = self.buf.split("\n")
            for line in lines[:-1]:
                if line.strip():
                    self.callback(line)
            self.buf = lines[-1]

    def flush(self):
        pass


# ── MAIN ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    PDF_DROP.mkdir(parents=True, exist_ok=True)
    app = PDFDropApp()
    app.run()
