from __future__ import annotations

import json
import shutil
import time
from pathlib import Path
from typing import Any

from .models import SkillRun, now_iso


ROOT = Path(__file__).resolve().parents[1]
RUNS_DIR = ROOT / "data" / "skill_runs"
OUTPUTS_DIR = ROOT / "data" / "structured_outputs"


def new_run_id(skill_id: str) -> str:
    prefix = skill_id.replace("-", "_").upper()[:12]
    return f"RUN-{prefix}-{time.strftime('%Y%m%d%H%M%S')}-{int(time.time() * 1000) % 1000:03d}"


def run_dir(run_id: str) -> Path:
    return RUNS_DIR / run_id


def create_run(task_id: str, skill_id: str, model: str, prompt_version: str) -> SkillRun:
    run = SkillRun(
        run_id=new_run_id(skill_id),
        task_id=task_id,
        skill_id=skill_id,
        status="queued",
        model=model,
        prompt_version=prompt_version,
    )
    run_dir(run.run_id).mkdir(parents=True, exist_ok=True)
    save_run(run)
    return run


def save_upload(run: SkillRun, filename: str, source_file: Any) -> Path:
    safe_name = Path(filename or "upload.txt").name
    target = run_dir(run.run_id) / "inputs" / safe_name
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open("wb") as output:
        shutil.copyfileobj(source_file, output)
    run.input_refs.append({"filename": safe_name, "stored_path": str(target), "kind": "external_regulation"})
    save_run(run)
    return target


def attach_input_file(run: SkillRun, source_path: Path, kind: str = "external_regulation") -> Path:
    safe_name = Path(source_path.name).name
    target = run_dir(run.run_id) / "inputs" / safe_name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source_path, target)
    run.input_refs.append({"filename": safe_name, "stored_path": str(target), "kind": kind})
    save_run(run)
    return target


def save_json(run_id: str, name: str, payload: dict[str, Any] | list[Any]) -> Path:
    target = run_dir(run_id) / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return target


def save_structured_output(run: SkillRun) -> Path:
    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)
    target = OUTPUTS_DIR / f"{run.run_id}.json"
    target.write_text(json.dumps(run.to_dict(), ensure_ascii=False, indent=2), encoding="utf-8")
    return target


def save_run(run: SkillRun) -> None:
    save_json(run.run_id, "run.json", run.to_dict())


def load_run(run_id: str) -> dict[str, Any] | None:
    path = run_dir(run_id) / "run.json"
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def complete_run(run: SkillRun, status: str, structured_result: dict[str, Any] | None = None) -> SkillRun:
    run.status = status
    run.completed_at = now_iso()
    if structured_result is not None:
        run.structured_result = structured_result
    save_run(run)
    save_structured_output(run)
    return run
