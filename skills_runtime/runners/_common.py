"""下游 Skill runner 共用工具：上游运行加载、模型选择。"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from skills_runtime import run_manager


def select_model(config: Any, role: str) -> str:
    if role == "reasoning" and getattr(config, "model_reasoning", ""):
        return config.model_reasoning
    return config.model_fast


def load_upstream_result(run_id: str) -> dict[str, Any]:
    """读取上游 Skill 运行的 structured_result。"""
    data = run_manager.load_run(run_id)
    if not data:
        raise RuntimeError(f"未找到上游运行：{run_id}")
    result = data.get("structured_result") or {}
    if not result:
        raise RuntimeError(f"上游运行 {run_id} 尚无结构化结果。")
    return result


def latest_run_for(task_id: str, skill_id: str) -> str | None:
    """在文件系统中查找指定 task 与 skill 的最近一次运行 run_id。"""
    runs_dir = run_manager.RUNS_DIR
    if not runs_dir.exists():
        return None
    best: tuple[str, str] | None = None
    for run_path in runs_dir.glob("*/run.json"):
        data = run_manager.load_run(run_path.parent.name)
        if not data:
            continue
        if data.get("skill_id") != skill_id:
            continue
        if task_id and str(data.get("task_id")) != str(task_id):
            continue
        created = data.get("created_at") or ""
        if best is None or created > best[1]:
            best = (data["run_id"], created)
    return best[0] if best else None
