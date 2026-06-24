from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


@dataclass
class SkillRun:
    run_id: str
    task_id: str
    skill_id: str
    execution_mode: str = "live-script"
    status: str = "queued"
    input_refs: list[dict[str, Any]] = field(default_factory=list)
    structured_result: dict[str, Any] = field(default_factory=dict)
    warnings: list[str] = field(default_factory=list)
    review_required: bool = True
    model: str = ""
    prompt_version: str = ""
    created_at: str = field(default_factory=now_iso)
    completed_at: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "run_id": self.run_id,
            "task_id": self.task_id,
            "skill_id": self.skill_id,
            "execution_mode": self.execution_mode,
            "status": self.status,
            "input_refs": self.input_refs,
            "structured_result": self.structured_result,
            "warnings": self.warnings,
            "review_required": self.review_required,
            "model": self.model,
            "prompt_version": self.prompt_version,
            "created_at": self.created_at,
            "completed_at": self.completed_at,
        }


@dataclass
class ParsedDocument:
    document_id: str
    filename: str
    file_type: str
    text: str
    sha256: str
    blocks: list[dict[str, Any]]
    stored_path: Path


@dataclass
class Clause:
    clause_id: str
    clause_ref: str
    heading_path: list[str]
    original_text: str
    position: dict[str, int]
    rule_tags: dict[str, Any]
    split_confidence: str
    integrity: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return {
            "clauseId": self.clause_id,
            "clauseRef": self.clause_ref,
            "headingPath": self.heading_path,
            "originalText": self.original_text,
            "position": self.position,
            "ruleTags": self.rule_tags,
            "splitConfidence": self.split_confidence,
            "integrity": self.integrity,
        }

