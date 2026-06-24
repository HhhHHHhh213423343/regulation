"""Gap 分析 Agent runner（外规内化第 4 步）。

专业规范唯一来源：docs/Gap分析(1).docx。
输入：监管解读义务库 + 内规映射结果。逐条语义推理判断满足程度、风险评级、Gap 类型。
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
MAX_OBLIGATIONS = 40


def run(
    task_id: str,
    decomposer_run_id: str,
    mapping_run_id: str,
    run_id: str | None = None,
) -> dict[str, Any]:
    skill = get_skill("regulation-gap-analysis")
    if not skill:
        raise RuntimeError("Gap 分析 Skill Registry 未配置。")
    config = get_config()
    if not config.configured:
        return {
            "status": "engine-not-configured",
            "message": "执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY。",
            "canRun": False,
        }
    model = select_model(config, skill.model_role)
    run_obj = run_manager.create_run(task_id, skill.id, model, skill.prompt_version)
    append_event(run_obj.run_id, "run_created", {"skill_id": skill.id, "task_id": task_id, "decomposer_run_id": decomposer_run_id, "mapping_run_id": mapping_run_id})
    try:
        run_obj.status = "running"
        run_manager.save_run(run_obj)

        decomposer = load_upstream_result(decomposer_run_id)
        mapping = load_upstream_result(mapping_run_id)
        obligations = _join_obligations_with_mappings(decomposer, mapping)
        if not obligations:
            raise RuntimeError("没有可用于 Gap 分析的监管义务。")
        run_manager.save_json(run_obj.run_id, "gap_inputs.json", obligations)

        prompt = (ROOT / skill.prompt_template).read_text(encoding="utf-8")
        payload = {
            "taskId": task_id,
            "skillId": skill.id,
            "promptVersion": skill.prompt_version,
            "sourceDocument": "docs/Gap分析(1).docx",
            "obligations": obligations[:MAX_OBLIGATIONS],
        }
        append_event(run_obj.run_id, "llm_request_prepared", {"model": model, "obligation_count": len(obligations)})
        llm_result = LLMClient(config).chat_json(prompt, payload, model=model)

        structured = _compose_output(run_obj.run_id, task_id, decomposer_run_id, mapping_run_id, llm_result, model, skill.prompt_version)
        run_manager.save_json(run_obj.run_id, "output.json", structured)
        run_manager.complete_run(run_obj, "review_required", structured)
        append_event(run_obj.run_id, "run_completed", {"status": "review_required", "gaps": len(structured.get("gapItems", []))})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()
    except Exception as error:
        run_obj.warnings.append(str(error))
        run_manager.complete_run(run_obj, "failed", {"error": str(error)})
        append_event(run_obj.run_id, "run_failed", {"error": str(error)})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()


def _join_obligations_with_mappings(decomposer: dict[str, Any], mapping: dict[str, Any]) -> list[dict[str, Any]]:
    five = decomposer.get("fiveDimensions") or {}
    reqs = five.get("regulatoryRequirements") if isinstance(five.get("regulatoryRequirements"), list) else []
    mapping_index: dict[str, dict[str, Any]] = {}
    for m in mapping.get("mappings", []) if isinstance(mapping.get("mappings"), list) else []:
        if isinstance(m, dict) and m.get("requirementId"):
            mapping_index[m["requirementId"]] = m
    joined: list[dict[str, Any]] = []
    for req in reqs:
        if not isinstance(req, dict):
            continue
        req_id = req.get("requirementId") or req.get("clauseId") or ""
        m = mapping_index.get(req_id, {})
        joined.append(
            {
                "requirementId": req_id,
                "clauseRef": req.get("clauseRef") or "",
                "obligationType": req.get("obligationType") or "",
                "content": req.get("content") or req.get("originalExcerpt") or "",
                "mapping": {
                    "matchedInternalClauseRef": m.get("matchedInternalClauseRef") or "",
                    "internalClauseText": (m.get("internalClauseText") or "")[:400],
                    "confidence": m.get("confidence", 0),
                    "manualReviewStatus": m.get("manualReviewStatus") or "",
                },
            }
        )
    return joined


def _compose_output(
    run_id: str,
    task_id: str,
    decomposer_run_id: str,
    mapping_run_id: str,
    llm_result: dict[str, Any],
    model: str,
    prompt_version: str,
) -> dict[str, Any]:
    raw = llm_result.get("gapItems") if isinstance(llm_result.get("gapItems"), list) else []
    gap_items: list[dict[str, Any]] = []
    review_items: list[dict[str, Any]] = []
    counts = {"满足": 0, "部分满足": 0, "未满足": 0}
    for index, item in enumerate(raw):
        if not isinstance(item, dict):
            continue
        compliance = item.get("complianceLevel") if item.get("complianceLevel") in counts else "未满足"
        counts[compliance] += 1
        risk = item.get("riskLevel") if item.get("riskLevel") in {"高", "中", "低"} else "中"
        gap_type = item.get("gapType") if item.get("gapType") in {"制度型", "执行型", "混合型"} else "待判定"
        needs_review = compliance in {"未满足", "部分满足"} or risk == "高"
        gap = {
            "gapId": item.get("gapId") or f"G-{index + 1:03d}",
            "requirementId": item.get("requirementId") or "",
            "externalClauseRef": item.get("externalClauseRef") or "",
            "externalRequirement": item.get("externalRequirement") or "",
            "internalStatus": item.get("internalStatus") or "",
            "gapDescription": item.get("gapDescription") or "",
            "complianceLevel": compliance,
            "riskLevel": risk,
            "gapType": gap_type,
            "classificationReason": item.get("classificationReason") or "",
            "riskExplanation": item.get("riskExplanation") or "",
            "recommendation": item.get("recommendation") or "",
            "evidence": item.get("evidence") if isinstance(item.get("evidence"), dict) else {},
            "needsReview": needs_review,
        }
        gap_items.append(gap)
        if needs_review:
            review_items.append(
                {
                    "targetType": "gap",
                    "targetId": gap["gapId"],
                    "riskLevel": "high" if risk == "高" else "medium",
                    "reason": "未满足/部分满足/高风险 Gap 必须人工复核。",
                    "decision": "pending",
                }
            )
    total = len(gap_items)
    summary = {
        "totalObligations": total,
        "fullyCompliantCount": counts["满足"],
        "partiallyCompliantCount": counts["部分满足"],
        "nonCompliantCount": counts["未满足"],
        "complianceRate": round(counts["满足"] / total, 2) if total else 0.0,
    }
    distribution = {
        "complianceLevel": [{"label": k, "count": v} for k, v in counts.items()],
        "riskLevel": _count_by(gap_items, "riskLevel", ["高", "中", "低"]),
        "gapType": _count_by(gap_items, "gapType", ["制度型", "执行型", "混合型", "待判定"]),
    }
    return {
        "runId": run_id,
        "skillId": "regulation-gap-analysis",
        "taskId": task_id,
        "upstream": {"decomposerRunId": decomposer_run_id, "mappingRunId": mapping_run_id},
        "model": {"provider": "deepseek", "name": model, "promptVersion": prompt_version},
        "summary": summary,
        "distribution": distribution,
        "gapItems": gap_items,
        "review": {"status": "pending", "required": True, "items": review_items},
        "artifacts": [],
    }


def _count_by(items: list[dict[str, Any]], key: str, labels: list[str]) -> list[dict[str, Any]]:
    out = []
    for label in labels:
        count = sum(1 for i in items if i.get(key) == label)
        if count:
            out.append({"label": label, "count": count})
    return out
