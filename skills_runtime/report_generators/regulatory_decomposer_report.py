from __future__ import annotations

from pathlib import Path
from typing import Any


def generate(_run: dict[str, Any], output_dir: Path) -> list[dict[str, Any]]:
    output_dir.mkdir(parents=True, exist_ok=True)
    return []
