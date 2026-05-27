# generate_assoluto_pdf.py | TITANIUM_OS / TOOLS | v1.0 | 2026-05-27
"""Genera ASSOLUTO_V7.pdf da ASSOLUTO_V7.md con layout industriale."""

import re
import os
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.pdfgen import canvas

# ─────────────────────────────────────────────────────────────
# PALETTE COLORI — Titanium Ventures Industrial Theme
# ─────────────────────────────────────────────────────────────
C_NAVY      = colors.HexColor('#0F2239')   # sfondo header sezione
C_STEEL     = colors.HexColor('#1B3A5C')   # sub-header
C_AZURE     = colors.HexColor('#2E6DA4')   # accent links/bold
C_BRASS     = colors.HexColor('#C8943A')   # accent oro/titanio
C_LIGHT_BG  = colors.HexColor('#F2F5F9')   # sfondo alternato tabelle
C_MID_BG    = colors.HexColor('#E1E8F0')   # riga header tabella
C_DARK_TEXT = colors.HexColor('#1A1A1A')   # testo corpo
C_MID_TEXT  = colors.HexColor('#4A4A4A')   # testo secondario
C_WHITE     = colors.HexColor('#FFFFFF')
C_DIVIDER   = colors.HexColor('#C0CDD9')   # linea divisoria
C_CODE_BG   = colors.HexColor('#1E2D3D')   # sfondo code block
C_CODE_TEXT = colors.HexColor('#A8D5F2')   # testo code block
C_COVER_BG  = colors.HexColor('#0A1628')   # cover page background

PAGE_W, PAGE_H = A4
MARGIN_L = 2.0 * cm
MARGIN_R = 2.0 * cm
MARGIN_T = 2.2 * cm
MARGIN_B = 2.2 * cm
INNER_W = PAGE_W - MARGIN_L - MARGIN_R

# ─────────────────────────────────────────────────────────────
# STILI
# ─────────────────────────────────────────────────────────────
def build_styles():
    s = getSampleStyleSheet()

    base = dict(fontName='Helvetica', fontSize=9.5, leading=14,
                textColor=C_DARK_TEXT, alignment=TA_JUSTIFY)

    styles = {
        'body': ParagraphStyle('body', **base),
        'body_small': ParagraphStyle('body_small', **{**base, 'fontSize': 8.5, 'leading': 12}),

        'h1': ParagraphStyle('h1',
            fontName='Helvetica-Bold', fontSize=16, leading=20,
            textColor=C_WHITE, spaceBefore=0, spaceAfter=2,
            alignment=TA_LEFT, leftIndent=0),

        'h2': ParagraphStyle('h2',
            fontName='Helvetica-Bold', fontSize=13, leading=17,
            textColor=C_WHITE, spaceBefore=0, spaceAfter=0,
            alignment=TA_LEFT),

        'h3': ParagraphStyle('h3',
            fontName='Helvetica-Bold', fontSize=10.5, leading=14,
            textColor=C_STEEL, spaceBefore=8, spaceAfter=3,
            alignment=TA_LEFT),

        'h4': ParagraphStyle('h4',
            fontName='Helvetica-Bold', fontSize=9.5, leading=13,
            textColor=C_AZURE, spaceBefore=5, spaceAfter=2,
            alignment=TA_LEFT),

        'bullet': ParagraphStyle('bullet', **{
            **base, 'leftIndent': 12, 'bulletIndent': 0,
            'spaceBefore': 1, 'spaceAfter': 1
        }),

        'bullet2': ParagraphStyle('bullet2', **{
            **base, 'fontSize': 8.8, 'leftIndent': 22, 'bulletIndent': 10,
            'spaceBefore': 0.5, 'spaceAfter': 0.5
        }),

        'code': ParagraphStyle('code',
            fontName='Courier', fontSize=7.8, leading=11.5,
            textColor=C_CODE_TEXT, alignment=TA_LEFT,
            leftIndent=8, rightIndent=8),

        'blockquote': ParagraphStyle('blockquote',
            fontName='Helvetica-Oblique', fontSize=9, leading=13,
            textColor=C_STEEL, leftIndent=14, rightIndent=8,
            spaceBefore=4, spaceAfter=4, alignment=TA_JUSTIFY),

        'table_header': ParagraphStyle('table_header',
            fontName='Helvetica-Bold', fontSize=8, leading=10,
            textColor=C_WHITE, alignment=TA_CENTER),

        'table_cell': ParagraphStyle('table_cell',
            fontName='Helvetica', fontSize=7.8, leading=11,
            textColor=C_DARK_TEXT, alignment=TA_LEFT),

        'table_cell_center': ParagraphStyle('table_cell_center',
            fontName='Helvetica', fontSize=7.8, leading=11,
            textColor=C_DARK_TEXT, alignment=TA_CENTER),

        'cover_title': ParagraphStyle('cover_title',
            fontName='Helvetica-Bold', fontSize=32, leading=38,
            textColor=C_WHITE, alignment=TA_LEFT),

        'cover_sub': ParagraphStyle('cover_sub',
            fontName='Helvetica', fontSize=14, leading=18,
            textColor=C_BRASS, alignment=TA_LEFT),

        'cover_meta': ParagraphStyle('cover_meta',
            fontName='Helvetica', fontSize=9, leading=13,
            textColor=colors.HexColor('#8BA8C4'), alignment=TA_LEFT),

        'toc_h1': ParagraphStyle('toc_h1',
            fontName='Helvetica-Bold', fontSize=10, leading=14,
            textColor=C_STEEL, spaceBefore=4, spaceAfter=1),

        'toc_h2': ParagraphStyle('toc_h2',
            fontName='Helvetica', fontSize=9, leading=12,
            textColor=C_MID_TEXT, leftIndent=12, spaceBefore=1),
    }
    return styles


# ─────────────────────────────────────────────────────────────
# FLOWABLES CUSTOM
# ─────────────────────────────────────────────────────────────
class SectionHeader(Flowable):
    """Barra colorata per intestazione di sezione ATTO."""
    def __init__(self, text, width, level=1):
        Flowable.__init__(self)
        self.text = text
        self._width = width
        self.level = level
        self.height = 28 if level == 1 else 22

    def draw(self):
        c = self.canv
        bg = C_NAVY if self.level == 1 else C_STEEL
        c.setFillColor(bg)
        c.rect(0, 0, self._width, self.height, fill=1, stroke=0)
        # Accento brass a sinistra
        c.setFillColor(C_BRASS)
        c.rect(0, 0, 4 if self.level == 1 else 3, self.height, fill=1, stroke=0)
        # Testo
        c.setFillColor(C_WHITE)
        fs = 14 if self.level == 1 else 11
        c.setFont('Helvetica-Bold', fs)
        c.drawString(12, (self.height - fs) / 2 + 1, self.text)

    def wrap(self, availWidth, availHeight):
        return self._width, self.height


class CodeBlock(Flowable):
    """Blocco codice con sfondo scuro."""
    def __init__(self, text, width):
        Flowable.__init__(self)
        self._code = text
        self._width = width
        self._lines = text.split('\n')
        self._line_h = 11.5
        self.height = len(self._lines) * self._line_h + 14

    def draw(self):
        c = self.canv
        c.setFillColor(C_CODE_BG)
        c.roundRect(0, 0, self._width, self.height, 4, fill=1, stroke=0)
        c.setFillColor(C_CODE_TEXT)
        c.setFont('Courier', 7.8)
        y = self.height - 9
        for line in self._lines:
            c.drawString(8, y, line if len(line) <= 100 else line[:97] + '...')
            y -= self._line_h

    def wrap(self, availWidth, availHeight):
        return self._width, self.height


class DividerLine(Flowable):
    def __init__(self, width, color=None, thickness=0.5):
        Flowable.__init__(self)
        self._width = width
        self._color = color or C_DIVIDER
        self._thickness = thickness
        self.height = 6

    def draw(self):
        self.canv.setStrokeColor(self._color)
        self.canv.setLineWidth(self._thickness)
        self.canv.line(0, 3, self._width, 3)

    def wrap(self, availWidth, availHeight):
        return self._width, self.height


# ─────────────────────────────────────────────────────────────
# HEADER / FOOTER DI PAGINA
# ─────────────────────────────────────────────────────────────
class PageTemplate:
    def __init__(self, doc):
        self.doc = doc
        self._page_num = 0

    def on_page(self, canvas_obj, doc):
        canvas_obj.saveState()
        w, h = A4
        # Header line
        canvas_obj.setStrokeColor(C_DIVIDER)
        canvas_obj.setLineWidth(0.4)
        canvas_obj.line(MARGIN_L, h - 16*mm, w - MARGIN_R, h - 16*mm)
        # Header text
        canvas_obj.setFont('Helvetica-Bold', 7)
        canvas_obj.setFillColor(C_STEEL)
        canvas_obj.drawString(MARGIN_L, h - 14*mm, 'TITANIUM VENTURES')
        canvas_obj.setFont('Helvetica', 7)
        canvas_obj.setFillColor(C_MID_TEXT)
        canvas_obj.drawRightString(w - MARGIN_R, h - 14*mm, 'ASSOLUTO V7 — 2026-05-27')
        # Footer line
        canvas_obj.setStrokeColor(C_DIVIDER)
        canvas_obj.line(MARGIN_L, 14*mm, w - MARGIN_R, 14*mm)
        # Footer text
        canvas_obj.setFont('Helvetica', 7)
        canvas_obj.setFillColor(C_MID_TEXT)
        canvas_obj.drawString(MARGIN_L, 10*mm, 'Matteo Benenati — Confidenziale')
        canvas_obj.drawRightString(w - MARGIN_R, 10*mm, str(doc.page))
        # Accento brass in basso a sinistra
        canvas_obj.setFillColor(C_BRASS)
        canvas_obj.rect(MARGIN_L - 2*mm, 10*mm, 1.5*mm, 4*mm, fill=1, stroke=0)
        canvas_obj.restoreState()

    def on_first_page(self, canvas_obj, doc):
        # Cover page — full dark background
        canvas_obj.saveState()
        w, h = A4
        canvas_obj.setFillColor(C_COVER_BG)
        canvas_obj.rect(0, 0, w, h, fill=1, stroke=0)
        # Brass accent bar left
        canvas_obj.setFillColor(C_BRASS)
        canvas_obj.rect(0, 0, 8*mm, h, fill=1, stroke=0)
        # Steel band bottom
        canvas_obj.setFillColor(C_STEEL)
        canvas_obj.rect(8*mm, 0, w, 50*mm, fill=1, stroke=0)
        canvas_obj.restoreState()


# ─────────────────────────────────────────────────────────────
# PARSER MARKDOWN → FLOWABLES
# ─────────────────────────────────────────────────────────────
def inline_style(text, style):
    """Converte **bold** e `code` inline in XML per ReportLab."""
    # Escape caratteri XML pericolosi
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    # **bold**
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    # *italic*
    text = re.sub(r'\*(.+?)\*', r'<i>\1</i>', text)
    # `code`
    text = re.sub(r'`([^`]+)`', r'<font name="Courier" color="#2E6DA4">\1</font>', text)
    return text


def parse_table(lines):
    """Converte righe markdown tabella in lista di liste."""
    rows = []
    for line in lines:
        if re.match(r'^\s*\|[-:\s|]+\|\s*$', line):
            continue  # riga separatore
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        rows.append(cells)
    return rows


def build_table_flowable(rows, styles, full_width):
    if not rows:
        return None
    # Normalizza numero colonne
    max_cols = max(len(r) for r in rows)
    norm = [r + [''] * (max_cols - len(r)) for r in rows]

    # Calcola larghezze colonne (distribuzione equa, min 1.5cm)
    col_w = full_width / max_cols
    col_widths = [col_w] * max_cols

    # Paragrafi per ogni cella
    def cell_para(text, is_header=False):
        clean = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
        clean = re.sub(r'\*(.+?)\*', r'\1', clean)
        clean = clean.replace('✅', 'OK').replace('⏳', '...').replace('🎯', '>>')
        clean = clean.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        st = styles['table_header'] if is_header else styles['table_cell']
        return Paragraph(clean, st)

    data = []
    for i, row in enumerate(norm):
        data.append([cell_para(cell, is_header=(i == 0)) for cell in row])

    ts = TableStyle([
        # Header
        ('BACKGROUND', (0, 0), (-1, 0), C_STEEL),
        ('TEXTCOLOR', (0, 0), (-1, 0), C_WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        # Righe alternate
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_WHITE, C_LIGHT_BG]),
        # Grid
        ('GRID', (0, 0), (-1, -1), 0.3, C_DIVIDER),
        ('LINEBELOW', (0, 0), (-1, 0), 1.0, C_BRASS),
        # Padding
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        # Valign
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ])

    tbl = Table(data, colWidths=col_widths, repeatRows=1)
    tbl.setStyle(ts)
    return tbl


def md_to_flowables(md_text, styles, inner_w):
    """Converte testo markdown in lista di ReportLab Flowables."""
    story = []
    lines = md_text.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i]

        # ── Riga vuota
        if not line.strip():
            story.append(Spacer(1, 3))
            i += 1
            continue

        # ── Titolo principale # (solo ASSOLUTO V7 titolo)
        if line.startswith('# ') and not line.startswith('## '):
            text = line[2:].strip()
            story.append(Spacer(1, 4))
            story.append(SectionHeader(text, inner_w, level=1))
            story.append(Spacer(1, 6))
            i += 1
            continue

        # ── ATTO header ##
        if line.startswith('## '):
            text = line[3:].strip()
            story.append(Spacer(1, 8))
            story.append(SectionHeader(text, inner_w, level=1))
            story.append(Spacer(1, 5))
            i += 1
            continue

        # ── Sub-sezione ###
        if line.startswith('### '):
            text = line[4:].strip()
            story.append(Spacer(1, 5))
            story.append(SectionHeader(text, inner_w, level=2))
            story.append(Spacer(1, 4))
            i += 1
            continue

        # ── H4 ####
        if line.startswith('#### '):
            text = line[5:].strip()
            story.append(Paragraph(inline_style(text, styles), styles['h4']))
            i += 1
            continue

        # ── Code block ```
        if line.strip().startswith('```'):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code_lines.append(lines[i])
                i += 1
            i += 1  # skip closing ```
            code_text = '\n'.join(code_lines)
            story.append(Spacer(1, 3))
            story.append(CodeBlock(code_text, inner_w))
            story.append(Spacer(1, 4))
            continue

        # ── Blocco tabella |
        if line.startswith('|'):
            table_lines = []
            while i < len(lines) and lines[i].startswith('|'):
                table_lines.append(lines[i])
                i += 1
            rows = parse_table(table_lines)
            if rows:
                tbl = build_table_flowable(rows, styles, inner_w)
                if tbl:
                    story.append(Spacer(1, 4))
                    story.append(tbl)
                    story.append(Spacer(1, 6))
            continue

        # ── Blockquote >
        if line.startswith('> '):
            text = inline_style(line[2:].strip(), styles)
            story.append(Spacer(1, 3))
            # Barra laterale brass
            bq_data = [[Paragraph(text, styles['blockquote'])]]
            bq_tbl = Table(bq_data, colWidths=[inner_w - 8])
            bq_tbl.setStyle(TableStyle([
                ('LINEBEFORETABLE', (0, 0), (0, -1), 3, C_BRASS),
                ('LINEBEFORE', (0, 0), (0, -1), 3, C_BRASS),
                ('BACKGROUND', (0, 0), (-1, -1), C_LIGHT_BG),
                ('TOPPADDING', (0, 0), (-1, -1), 5),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
                ('LEFTPADDING', (0, 0), (-1, -1), 10),
                ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ]))
            story.append(bq_tbl)
            story.append(Spacer(1, 3))
            i += 1
            continue

        # ── Bullet list - o *
        if re.match(r'^(\s*)([-*+])\s+', line):
            indent = len(re.match(r'^(\s*)', line).group(1))
            text = re.sub(r'^\s*[-*+]\s+', '', line)
            text = inline_style(text, styles)
            # Sostituisci emoji
            text = text.replace('✅', '<b>✓</b>').replace('⏳', '→').replace('🎯', '▶')
            st = styles['bullet2'] if indent > 0 else styles['bullet']
            story.append(Paragraph(f'• &nbsp;{text}', st))
            i += 1
            continue

        # ── Numbered list 1.
        if re.match(r'^\d+\.\s+', line):
            text = re.sub(r'^\d+\.\s+', '', line)
            text = inline_style(text, styles)
            story.append(Paragraph(f'&nbsp;&nbsp;{text}', styles['bullet']))
            i += 1
            continue

        # ── Linea orizzontale ---
        if re.match(r'^-{3,}\s*$', line):
            story.append(Spacer(1, 3))
            story.append(DividerLine(inner_w, C_BRASS, 1.2))
            story.append(Spacer(1, 3))
            i += 1
            continue

        # ── Paragrafo normale
        text = inline_style(line.strip(), styles)
        # Rimuovi emoji non gestiti
        text = text.replace('✅', '✓').replace('⏳', '→').replace('🎯', '▶')
        if text:
            story.append(Paragraph(text, styles['body']))
        i += 1

    return story


# ─────────────────────────────────────────────────────────────
# COVER PAGE
# ─────────────────────────────────────────────────────────────
def build_cover(styles, inner_w):
    cover = []
    # Spazio verticale alto (la cover ha sfondo nero da on_first_page)
    cover.append(Spacer(1, 60))

    # Titolo grande
    cover.append(Paragraph('ASSOLUTO', ParagraphStyle('ct',
        fontName='Helvetica-Bold', fontSize=52, leading=56,
        textColor=C_WHITE, alignment=TA_LEFT)))
    cover.append(Spacer(1, 4))
    cover.append(Paragraph('V7', ParagraphStyle('cv',
        fontName='Helvetica-Bold', fontSize=72, leading=76,
        textColor=C_BRASS, alignment=TA_LEFT)))
    cover.append(Spacer(1, 16))

    cover.append(DividerLine(inner_w, C_BRASS, 2))
    cover.append(Spacer(1, 12))

    cover.append(Paragraph('TITANIUM VENTURES', ParagraphStyle('ctt',
        fontName='Helvetica-Bold', fontSize=18, leading=22,
        textColor=colors.HexColor('#8BA8C4'), alignment=TA_LEFT)))
    cover.append(Spacer(1, 8))

    cover.append(Paragraph(
        'Documento Master Unico — Ecosistema Completo',
        ParagraphStyle('cs', fontName='Helvetica', fontSize=11, leading=15,
        textColor=C_BRASS, alignment=TA_LEFT)))
    cover.append(Spacer(1, 30))

    # Meta info
    meta_items = [
        ('Versione', 'V7.0.0'),
        ('Data', '2026-05-27'),
        ('Autore', 'Matteo Benenati'),
        ('Macchina', 'Getac — La Taverna'),
        ('Supera', 'ASSOLUTO V6 (10 file → 1 file)'),
        ('Contenuto', '10 ATTI — Fisico + Digitale + Strategico + Economico'),
    ]
    meta_data = [[
        Paragraph(f'<b>{k}</b>', ParagraphStyle('mk',
            fontName='Helvetica-Bold', fontSize=8, textColor=C_BRASS)),
        Paragraph(v, ParagraphStyle('mv',
            fontName='Helvetica', fontSize=8, textColor=colors.HexColor('#C0D4E8')))
    ] for k, v in meta_items]

    meta_tbl = Table(meta_data, colWidths=[50, inner_w - 50])
    meta_tbl.setStyle(TableStyle([
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LINEBELOW', (0, -1), (-1, -1), 0.5, C_STEEL),
    ]))
    cover.append(meta_tbl)
    cover.append(Spacer(1, 40))

    # Quote
    cover.append(Paragraph(
        '"Un sistema che gira da solo vale più di 10 abitudini che dipendono dalla volontà."',
        ParagraphStyle('cq', fontName='Helvetica-Oblique', fontSize=10,
        textColor=colors.HexColor('#6A8FAF'), alignment=TA_LEFT)))

    cover.append(PageBreak())
    return cover


# ─────────────────────────────────────────────────────────────
# MAIN — BUILD PDF
# ─────────────────────────────────────────────────────────────
def main():
    BASE = Path(__file__).resolve().parent
    MENTE = Path(os.environ.get('MENTE_DIR', str(Path.home() / 'MICROINDUSTRY' / 'MENTE')))

    src = MENTE / 'KNOWLEDGE' / 'ASSOLUTO' / 'ASSOLUTO_V7.md'
    out = MENTE / 'KNOWLEDGE' / 'ASSOLUTO' / 'ASSOLUTO_V7.pdf'

    print(f'[ASSOLUTO PDF] Sorgente: {src}')
    print(f'[ASSOLUTO PDF] Output:   {out}')

    if not src.exists():
        print(f'ERRORE: file sorgente non trovato: {src}')
        return

    text = src.read_text(encoding='utf-8')
    styles = build_styles()
    pt = PageTemplate(None)

    doc = SimpleDocTemplate(
        str(out),
        pagesize=A4,
        leftMargin=MARGIN_L, rightMargin=MARGIN_R,
        topMargin=MARGIN_T + 5*mm, bottomMargin=MARGIN_B + 5*mm,
        title='ASSOLUTO V7 — Titanium Ventures',
        author='Matteo Benenati',
        subject='Documento Master Ecosistema',
    )
    pt.doc = doc

    story = []

    # Cover
    story += build_cover(styles, INNER_W)

    # Contenuto markdown
    # Salta il titolo principale (già nella cover)
    md_clean = re.sub(r'^# ASSOLUTO V7.*?\n', '', text, count=1)
    # Salta riga metadati *Versione...*
    md_clean = re.sub(r'^\*Versione:.*?\n', '', md_clean)
    # Salta blockquote iniziale >
    # lascia tutto il resto

    story += md_to_flowables(md_clean, styles, INNER_W)

    # Aggiungi page break prima di ogni ATTO
    # (già gestito visivamente, ma aggiungiamo break prima di ## ATTO)
    # Rebuild con page breaks
    final_story = []
    atto_count = 0
    for j, el in enumerate(story):
        if isinstance(el, SectionHeader) and el.level == 1 and 'ATTO' in el.text:
            if atto_count > 0:
                final_story.append(PageBreak())
            atto_count += 1
        final_story.append(el)

    def first_page(c, d):
        pt.on_first_page(c, d)

    def later_pages(c, d):
        pt.on_page(c, d)

    doc.build(final_story, onFirstPage=first_page, onLaterPages=later_pages)
    print(f'[ASSOLUTO PDF] ✓ Generato: {out}')
    print(f'[ASSOLUTO PDF] Dimensione: {out.stat().st_size / 1024:.0f} KB')


if __name__ == '__main__':
    main()
