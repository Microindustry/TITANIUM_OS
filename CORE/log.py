# log.py | TITANIUM_OS / CORE | v1.0 | 2026-05-29
# Logger centralizzato — RotatingFileHandler + StreamHandler, formato uniforme
# Usage: from CORE.log import get_logger; logger = get_logger(__name__)

import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path

_LOG_DIR = Path(__file__).resolve().parents[1] / "DATA" / "logs"
_LOG_DIR.mkdir(parents=True, exist_ok=True)

_FORMAT = "%(asctime)s [%(name)-20s] %(levelname)-8s %(message)s"
_DATEFMT = "%Y-%m-%d %H:%M:%S"


def get_logger(name: str, level: int = logging.INFO) -> logging.Logger:
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger  # già configurato, evita duplicati
    logger.setLevel(level)

    log_name = name.split(".")[-1]
    fh = RotatingFileHandler(
        _LOG_DIR / f"{log_name}.log",
        maxBytes=5 * 1024 * 1024,
        backupCount=3,
        encoding="utf-8",
    )
    fh.setFormatter(logging.Formatter(_FORMAT, datefmt=_DATEFMT))

    ch = logging.StreamHandler(sys.stdout)
    ch.setFormatter(logging.Formatter(_FORMAT, datefmt=_DATEFMT))

    logger.addHandler(fh)
    logger.addHandler(ch)
    logger.propagate = False
    return logger
