# _docling_worker.py | TITANIUM_OS / AUTOMATIONS / core | v1.0 | 2026-07-20
# Gira DENTRO il venv dedicato ~/.venvs/docling (torch ISOLATO dal RAG principale).
# NON va importato dal python principale. Lo invoca docling_extract.py via subprocess.
# Uso: <venv_python> _docling_worker.py <pdf_in> <out_md>
# Converte un PDF in Markdown strutturato (heading/tabelle/OCR) e stampa il n. pagine su stdout.
import sys


def main() -> int:
    if len(sys.argv) < 3:
        print("uso: _docling_worker.py <pdf_in> <out_md>", file=sys.stderr)
        return 2
    src, out = sys.argv[1], sys.argv[2]
    from docling.document_converter import DocumentConverter
    res = DocumentConverter().convert(src)
    md = res.document.export_to_markdown()
    with open(out, "w", encoding="utf-8") as f:
        f.write(md)
    try:
        pages = res.document.num_pages()
    except Exception:
        pages = 0
    print(pages)
    return 0


if __name__ == "__main__":
    sys.exit(main())
