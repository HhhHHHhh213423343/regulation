from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .models import now_iso


ROOT = Path(__file__).resolve().parents[1]
AUDIT_DIR = ROOT / "data" / "skill_runs"


def append_event(run_id: str, event: str, payload: dict[str, Any] | None = None) -> None:
    path = AUDIT_DIR / run_id / "audit.log"
    path.parent.mkdir(parents=True, exist_ok=True)
    record = {"at": now_iso(), "event": event, "payload": payload or {}}
    with path.open("a", encoding="utf-8") as output:
        output.write(json.dumps(record, ensure_ascii=False) + "\n")

