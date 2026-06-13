# riordina_mente.py | TITANIUM_OS / CONTENT_ENGINE / scripts | v1.0 | 2026-06-13
# Riordina MENTE per TEMA (non per provenienza): dissolve le cartelle "da_chiavetta"
# nelle sottocartelle tematiche coerenti, smistando anche i file finiti nel dominio
# sbagliato (v32_* in KNOWLEDGE, finanza non in FINANZA, vecchi episodi non nelle STORIE).
# Usa `git mv` dentro il repo locale di MENTE -> preserva la storia (evolutivo, regola 1).
#
# Idempotente: salta i file gia' spostati. READ-ONLY sul resto: tocca solo i da_chiavetta.

import subprocess
import sys
from pathlib import Path

MENTE = Path("C:/Users/teo/MICROINDUSTRY/MENTE")

# ── MAPPATURA per dominio ──────────────────────────────────────────────────────
# Ogni voce: cartella_sorgente (da_chiavetta) -> regola di smistamento.
# Le regole rare/cross-dominio sono esplicite per nome file; il resto va a una default.

# ASSOLUTO/da_chiavetta: sono tutte VERSIONI vecchie del documento maestro -> evoluzione
ASSOLUTO_DEFAULT = "ASSOLUTO/VERSIONI"

# MIMS/da_chiavetta: disegni tecnici vs protocollo/manifesti
MIMS_DESIGN_KEYS = ("disegno", "base_", "piastra", "dentro_", "fissaggio", "innestro",
                    "solo_fori", "a_5_full", "a_5")
MIMS_DEFAULT = "MIMS/PROTOCOLLO"

# VITA_NATURA/da_chiavetta: documenti operativi del centro (EVA li consuma)
VN_DEFAULT = "VITA_NATURA/CENTRO"

# V32/da_chiavetta
V32_DEFAULT = "V32/BOM"

# KNOWLEDGE/da_chiavetta: mappa esplicita per file (la cartella piu' mista).
# Routing cross-dominio incluso (i file qui non sono tutti "knowledge").
KNOWLEDGE_MAP = {
    # -> VISIONE (manifesti, piani strategici, codex)
    "il_codex_di_prodotto_v2": "KNOWLEDGE/VISIONE",
    "il_manifesto_di_comando": "KNOWLEDGE/VISIONE",
    "il_manifesto_di_genesis_fabbrica_autonoma": "KNOWLEDGE/VISIONE",
    "il_master_manifesto": "KNOWLEDGE/VISIONE",
    "lex_digitalis": "KNOWLEDGE/VISIONE",
    "master_plan": "KNOWLEDGE/VISIONE",
    "volume_di_guerra_definitivo_master_plan": "KNOWLEDGE/VISIONE",
    # -> PERSONAGGI
    "i_protagonisti": "KNOWLEDGE/PERSONAGGI",
    "figure_professionali": "KNOWLEDGE/PERSONAGGI",
    "themis_e_building": "KNOWLEDGE/PERSONAGGI",
    "rami": "KNOWLEDGE/PERSONAGGI",
    # -> PROMPTS (istruzioni per AI)
    "istruzioni": "KNOWLEDGE/PROMPTS",
    "istruzioni_ia": "KNOWLEDGE/PROMPTS",
    "istruzioni_ia_copia": "KNOWLEDGE/PROMPTS",
    "istruzioni_per_notbook": "KNOWLEDGE/PROMPTS",
    "gemini_attive_09_02_26": "KNOWLEDGE/PROMPTS",
    "prompt_esatto_nel_tuo_generatore": "KNOWLEDGE/PROMPTS",
    "per_visualizazione_video": "KNOWLEDGE/PROMPTS",
    # -> MEDIA (content / storytelling / youtube)
    "5_media_storytelling_e_feedback": "KNOWLEDGE/MEDIA",
    "analisi_video_youtube_contenuto_e_contesto": "KNOWLEDGE/MEDIA",
    "123_riasasunto_con_impostazioni": "KNOWLEDGE/MEDIA",
    "riasasunto_con_gaiant_killer_file_aggiornato": "KNOWLEDGE/MEDIA",
    # -> V32 (erano nel dominio sbagliato)
    "v32_analisi_tecnica_reale": "V32/NOTE_OFFICINA",
    "v32_la_mappa_vivente": "V32/NOTE_OFFICINA",
    # -> FINANZA (era vuota!)
    "la_scienza_finanziaria_l_asimmetria_di_valore": "FINANZA",
    "la_scienza_finanziaria_l_asimmetria_di_valore_copia": "FINANZA",
    # -> GENESIS
    "agenti_ai_da_officina_a_codice": "GENESIS",
    # -> SESSIONI/STORIE/ARCHIVIO_ORIGINALI (vecchi episodi = evoluzione del racconto)
    "ep_00_origine": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "ep_01_la_taverna": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "ep_02_il_reattore": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "ep_03_il_paradosso": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "ep_04_il_segnale": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "ep_05_il_verdetto": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "ep_s0_00_il_socio": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "ep_s0_01_l_organismo": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    "filone_unico": "SESSIONI/STORIE/ARCHIVIO_ORIGINALI",
    # -> BOZZE (ambigui / draft)
    "nuovo_documento_di_testo": "KNOWLEDGE/BOZZE",
    "v1": "KNOWLEDGE/BOZZE",
    "v2": "KNOWLEDGE/BOZZE",
}


def git_mv(src: Path, dst_dir: str) -> str:
    dst = MENTE / dst_dir / src.name
    if dst.exists():
        return f"  skip (esiste): {dst_dir}/{src.name}"
    (MENTE / dst_dir).mkdir(parents=True, exist_ok=True)
    r = subprocess.run(["git", "mv", str(src.relative_to(MENTE)), str(dst.relative_to(MENTE))],
                       cwd=str(MENTE), capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        # fallback: file non tracciato -> move semplice + add
        try:
            src.rename(dst)
            subprocess.run(["git", "add", str(dst.relative_to(MENTE))], cwd=str(MENTE))
            return f"  mosso (no-git): -> {dst_dir}/"
        except Exception as e:
            return f"  ERR {src.name}: {r.stderr.strip() or e}"
    return f"  {src.name:52} -> {dst_dir}/"


def target_for(domain: str, fname_stem: str) -> str:
    if domain == "ASSOLUTO":
        return ASSOLUTO_DEFAULT
    if domain == "V32":
        return V32_DEFAULT
    if domain == "VITA_NATURA":
        return VN_DEFAULT
    if domain == "MIMS":
        low = fname_stem.lower()
        return "MIMS/DESIGN" if any(k in low for k in MIMS_DESIGN_KEYS) else MIMS_DEFAULT
    if domain == "KNOWLEDGE":
        return KNOWLEDGE_MAP.get(fname_stem, "KNOWLEDGE/BOZZE")
    return f"{domain}"


def main() -> int:
    moved = 0
    for dc in sorted(MENTE.glob("*/da_chiavetta")):
        domain = dc.parent.name
        print(f"== {domain}/da_chiavetta ==")
        for f in sorted(dc.glob("*.md")):
            dst = target_for(domain, f.stem)
            print(git_mv(f, dst))
            moved += 1
        # rimuovi la cartella da_chiavetta se vuota
        try:
            dc.rmdir()
            print(f"  (rimossa cartella vuota {domain}/da_chiavetta)")
        except OSError:
            print(f"  ! {domain}/da_chiavetta non vuota — controlla")
    print(f"\n  totale spostati: {moved}. Ora MENTE e' per tema, non per provenienza.")
    print("  commit nel git di MENTE per fissare l'evoluzione del riordino.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
