from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class SkillDefinition:
    id: str
    name: str
    source_document: str
    source_of_truth: bool
    runner: str
    prompt_template: str
    prompt_version: str
    model_role: str
    requires_human_review: bool = True

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "sourceDocument": self.source_document,
            "sourceOfTruth": self.source_of_truth,
            "runner": self.runner,
            "promptTemplate": self.prompt_template,
            "promptVersion": self.prompt_version,
            "modelRole": self.model_role,
            "requiresHumanReview": self.requires_human_review,
        }


SKILLS: dict[str, SkillDefinition] = {
    "regulatory-decomposer": SkillDefinition(
        id="regulatory-decomposer",
        name="监管解读",
        source_document="docs/监管解读(1).docx",
        source_of_truth=True,
        runner="skills_runtime.runners.regulatory_decomposer_runner:run",
        prompt_template="skills_runtime/prompts/regulatory_decomposer.md",
        prompt_version="regulatory-decomposer-v1.0",
        model_role="fast",
    ),
    "regulatory-mapping": SkillDefinition(
        id="regulatory-mapping",
        name="内规映射",
        source_document="docs/制度映射(1).docx",
        source_of_truth=True,
        runner="skills_runtime.runners.regulatory_mapping_runner:run",
        prompt_template="skills_runtime/prompts/regulatory_mapping.md",
        prompt_version="regulatory-mapping-v1.0",
        model_role="fast",
    ),
    "regulation-gap-analysis": SkillDefinition(
        id="regulation-gap-analysis",
        name="Gap 分析",
        source_document="docs/Gap分析(1).docx",
        source_of_truth=True,
        runner="skills_runtime.runners.regulation_gap_analysis_runner:run",
        prompt_template="skills_runtime/prompts/regulation_gap_analysis.md",
        prompt_version="regulation-gap-analysis-v1.0",
        model_role="reasoning",
    ),
    "remediation-implementation": SkillDefinition(
        id="remediation-implementation",
        name="整改落地",
        source_document="docs/整改落地(1).docx",
        source_of_truth=True,
        runner="skills_runtime.runners.remediation_implementation_runner:run",
        prompt_template="skills_runtime/prompts/remediation_implementation.md",
        prompt_version="remediation-implementation-v1.0",
        model_role="reasoning",
    ),
}


def list_skills() -> list[dict[str, Any]]:
    return [skill.to_dict() for skill in SKILLS.values()]


def get_skill(skill_id: str) -> SkillDefinition | None:
    return SKILLS.get(skill_id)

