import sys
mods = ["pdfplumber", "docx", "flask"]
for m in mods:
    try:
        __import__(m)
        print(f"OK  {m}")
    except ImportError:
        print(f"MISS {m}")
