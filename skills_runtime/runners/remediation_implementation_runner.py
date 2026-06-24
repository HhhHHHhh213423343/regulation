"""整改落地 Agent runner（外规内化第 4 步收口）。

专业规范唯一来源：docs/整改落地(1).docx。
输入：Gap 清单。输出四维整改方案（制度/流程/系统/控制点）+ 制度修订草案。
所有制度草案必须带声明：AI 辅助草案，须经法律合规部门审查。
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from skills_runtime import run_manager
from skills_runtime.audit_logger import append_event
from skills_runtime.llm_client import LLMClient, get_config
from skills_runtime.registry import get_skill
from skills_runtime.runners._common import load_upstream_result, select_model

ROOT = Path(__file__).resolve().parents[2]
DISCLAIMER = "AI 辅助草案，须经法律合规部门审查。"
MAX_GAPS = 12  # 整改草案输出体量大，按风险优先级截断以控制在模型输出 token 预算内
RISK_ORDER = {"高": 0, "中": 1, "低": 2}
PRIORITY_BY_RISK = {"高": ("紧急", "2026-08-01"), "中": ("高", "2026-12-31"), "低": ("中", "2027-06-30")}


def run(task_id: str, gap_run_id: str, run_id: str | None = None) -> dict[str, Any]:
    skill = get_skill("remediation-implementation")
    if not skill:
        raise RuntimeError("整改落地 Skill Registry 未配置。")
    config = get_config()
    if not config.configured:
        return {
            "status": "engine-not-configured",
            "message": "执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY。",
            "canRun": False,
        }
    model = select_model(config, skill.model_role)
    run_obj = run_manager.create_run(task_id, skill.id, model, skill.prompt_version)
    append_event(run_obj.run_id, "run_created", {"skill_id": skill.id, "task_id": task_id, "gap_run_id": gap_run_id})
    try:
        run_obj.status = "running"
        run_manager.save_run(run_obj)

        gap_result = load_upstream_result(gap_run_id)
        gap_items = gap_result.get("gapItems") if isinstance(gap_result.get("gapItems"), list) else []
        # 优先整改未满足/部分满足项，并按风险高→低排序，截断到 MAX_GAPS 控制输出体量
        prioritized = [g for g in gap_items if g.get("complianceLevel") in {"未满足", "部分满足"}] or gap_items
        prioritized = sorted(prioritized, key=lambda g: RISK_ORDER.get(g.get("riskLevel"), 1))
        if not prioritized:
            raise RuntimeError("Gap 运行没有可用于整改落地的 Gap 项。")
        inputs = [
            {
                "gapId": g.get("gapId"),
                "externalClauseRef": g.get("externalClauseRef"),
                "externalRequirement": g.get("externalRequirement"),
                "complianceLevel": g.get("complianceLevel"),
                "riskLevel": g.get("riskLevel"),
                "gapType": g.get("gapType"),
                "recommendation": g.get("recommendation"),
            }
            for g in prioritized[:MAX_GAPS]
        ]
        run_manager.save_json(run_obj.run_id, "remediation_inputs.json", inputs)

        prompt = (ROOT / skill.prompt_template).read_text(encoding="utf-8")
        payload = {
            "taskId": task_id,
            "skillId": skill.id,
            "promptVersion": skill.prompt_version,
            "sourceDocument": "docs/整改落地(1).docx",
            "gapItems": inputs,
        }
        append_event(run_obj.run_id, "llm_request_prepared", {"model": model, "gap_count": len(inputs)})
        llm_result = LLMClient(config).chat_json(prompt, payload, model=model)

        structured = _compose_output(run_obj.run_id, task_id, gap_run_id, prioritized, llm_result, model, skill.prompt_version)
        run_manager.save_json(run_obj.run_id, "output.json", structured)
        run_manager.complete_run(run_obj, "review_required", structured)
        append_event(run_obj.run_id, "run_completed", {"status": "review_required", "items": len(structured.get("items", []))})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()
    except Exception as error:
        run_obj.warnings.append(str(error))
        run_manager.complete_run(run_obj, "failed", {"error": str(error)})
        append_event(run_obj.run_id, "run_failed", {"error": str(error)})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()


def _compose_output(
    run_id: str,
    task_id: str,
    gap_run_id: str,
    gap_items: list[dict[str, Any]],
    llm_result: dict[str, Any],
    model: str,
    prompt_version: str,
) -> dict[str, Any]:
    risk_by_gap = {g.get("gapId"): g.get("riskLevel") for g in gap_items}
    raw = llm_result.get("items") if isinstance(llm_result.get("items"), list) else []
    items: list[dict[str, Any]] = []
    review_items: list[dict[str, Any]] = []
    for index, item in enumerate(raw):
        if not isinstance(item, dict):
            continue
        gap_id = item.get("gapId") or ""
        risk = risk_by_gap.get(gap_id, "中")
        default_priority, default_date = PRIORITY_BY_RISK.get(risk, ("高", "2026-12-31"))
        draft = item.get("policyDraft") if isinstance(item.get("policyDraft"), dict) else {}
        draft["disclaimer"] = DISCLAIMER  # 强制声明，不依赖模型
        dimensions = item.get("dimensions") if isinstance(item.get("dimensions"), dict) else {}
        record = {
            "remediationId": item.get("remediationId") or f"R-{index + 1:03d}",
            "gapId": gap_id,
            "externalBasis": item.get("externalBasis") or "",
            "dimensions": {
                "institution": dimensions.get("institution") or {"action": "", "type": "不涉及"},
                "process": dimensions.get("process") or {"action": "", "type": "不涉及"},
                "system": dimensions.get("system") or {"action": "", "type": "不涉及", "priority": "中"},
                "control": dimensions.get("control") or {"controlPointId": f"KCP-NEW-{index + 1:03d}", "controlType": "预防性", "description": ""},
            },
            "ownerDepartment": item.get("ownerDepartment") or "待指定",
            "priority": item.get("priority") or default_priority,
            "plannedCompletionDate": item.get("plannedCompletionDate") or default_date,
            "status": item.get("status") or "待启动",
            "policyDraft": draft,
            "needsReview": True,
        }
        items.append(record)
        review_items.append(
            {
                "targetType": "remediation",
                "targetId": record["remediationId"],
                "riskLevel": "high" if risk == "高" else "medium",
                "reason": "整改制度草案、系统改造、控制点建议须经法律合规人员复核。",
                "decision": "pending",
            }
        )
    summary = {
        "totalItems": len(items),
        "urgentCount": sum(1 for i in items if i["priority"] == "紧急"),
        "controlPointCount": sum(1 for i in items if i["dimensions"]["control"].get("controlPointId")),
        "policyDraftCount": sum(1 for i in items if i["policyDraft"].get("title")),
    }
    return {
        "runId": run_id,
        "skillId": "remediation-implementation",
        "taskId": task_id,
        "upstream": {"gapRunId": gap_run_id},
        "model": {"provider": "deepseek", "name": model, "promptVersion": prompt_version},
        "disclaimer": DISCLAIMER,
        "summary": summary,
        "items": items,
        "review": {"status": "pending", "required": True, "items": review_items},
        "artifacts": [],
    }
