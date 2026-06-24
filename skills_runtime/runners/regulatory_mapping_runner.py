"""内规映射 Agent runner（外规内化第 3 步）。

专业规范唯一来源：docs/制度映射(1).docx。
流程：加载监管解读义务库 → 内规条款级切分 → BM25+关键词候选筛选 → DeepSeek 受控映射复核。
模型只能在候选集合内选择，禁止自由猜测；低置信度默认 review_required。
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from skills_runtime import candidate_search, clause_splitter, document_parser, run_manager
from skills_runtime.audit_logger import append_event
from skills_runtime.llm_client import LLMClient, get_config
from skills_runtime.registry import get_skill
from skills_runtime.runners._common import load_upstream_result, select_model

ROOT = Path(__file__).resolve().parents[2]
MAX_OBLIGATIONS = 30
TOP_K = 6


def run(
    task_id: str,
    decomposer_run_id: str,
    internal_file_path: Path,
    run_id: str | None = None,
) -> dict[str, Any]:
    skill = get_skill("regulatory-mapping")
    if not skill:
        raise RuntimeError("内规映射 Skill Registry 未配置。")
    config = get_config()
    if not config.configured:
        return {
            "status": "engine-not-configured",
            "message": "执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY。",
            "canRun": False,
        }
    model = select_model(config, skill.model_role)
    run_obj = run_manager.create_run(task_id, skill.id, model, skill.prompt_version)
    append_event(run_obj.run_id, "run_created", {"skill_id": skill.id, "task_id": task_id, "decomposer_run_id": decomposer_run_id})
    try:
        run_obj.status = "running"
        run_manager.save_run(run_obj)

        upstream = load_upstream_result(decomposer_run_id)
        obligations = _extract_obligations(upstream)
        if not obligations:
            raise RuntimeError("监管解读运行没有可映射的监管要求。")

        stored_internal = run_manager.attach_input_file(run_obj, Path(internal_file_path), kind="internal_policy")
        parsed_internal = document_parser.parse_document(stored_internal)
        internal_clauses = clause_splitter.split_clauses(parsed_internal)
        if not internal_clauses:
            raise RuntimeError("未能从内规文件中切分出有效条款。")

        candidate_docs = [
            {
                "candidateId": f"CAND-{i + 1:03d}",
                "internalPolicyFile": parsed_internal.filename,
                "internalClauseRef": clause.clause_ref,
                "internalClauseText": clause.original_text,
            }
            for i, clause in enumerate(internal_clauses)
        ]
        run_manager.save_json(run_obj.run_id, "internal_clauses.json", candidate_docs)

        external_requirements: list[dict[str, Any]] = []
        for obligation in obligations[:MAX_OBLIGATIONS]:
            query = " ".join(
                str(obligation.get(k) or "")
                for k in ("content", "action", "subject", "originalExcerpt")
            )
            ranked = candidate_search.rank_candidates(query, candidate_docs, text_key="internalClauseText", top_k=TOP_K)
            external_requirements.append(
                {
                    "requirementId": obligation.get("requirementId") or obligation.get("clauseId"),
                    "clauseRef": obligation.get("clauseRef") or "",
                    "obligationType": obligation.get("obligationType") or "",
                    "content": obligation.get("content") or obligation.get("originalExcerpt") or "",
                    "candidates": [
                        {
                            "candidateId": c["candidateId"],
                            "internalPolicyFile": c["internalPolicyFile"],
                            "internalClauseRef": c["internalClauseRef"],
                            "internalClauseText": c["internalClauseText"][:400],
                            "signals": c["signals"],
                        }
                        for c in ranked
                    ],
                }
            )

        prompt = (ROOT / skill.prompt_template).read_text(encoding="utf-8")
        payload = {
            "taskId": task_id,
            "skillId": skill.id,
            "promptVersion": skill.prompt_version,
            "sourceDocument": "docs/制度映射(1).docx",
            "internalPolicyFile": parsed_internal.filename,
            "externalRequirements": external_requirements,
        }
        append_event(run_obj.run_id, "llm_request_prepared", {"model": model, "obligation_count": len(external_requirements)})
        llm_result = LLMClient(config).chat_json(prompt, payload, model=model)

        structured = _compose_output(
            run_obj.run_id, task_id, decomposer_run_id, parsed_internal,
            candidate_docs, external_requirements, llm_result, model, skill.prompt_version,
        )
        run_manager.save_json(run_obj.run_id, "output.json", structured)
        run_manager.complete_run(run_obj, "review_required", structured)
        append_event(run_obj.run_id, "run_completed", {"status": "review_required", "mappings": len(structured.get("mappings", []))})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()
    except Exception as error:
        run_obj.warnings.append(str(error))
        run_manager.complete_run(run_obj, "failed", {"error": str(error)})
        append_event(run_obj.run_id, "run_failed", {"error": str(error)})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()


def _extract_obligations(upstream: dict[str, Any]) -> list[dict[str, Any]]:
    five = upstream.get("fiveDimensions") or {}
    reqs = five.get("regulatoryRequirements")
    return reqs if isinstance(reqs, list) else []


def _compose_output(
    run_id: str,
    task_id: str,
    decomposer_run_id: str,
    parsed_internal: Any,
    candidate_docs: list[dict[str, Any]],
    external_requirements: list[dict[str, Any]],
    llm_result: dict[str, Any],
    model: str,
    prompt_version: str,
) -> dict[str, Any]:
    candidate_index = {c["candidateId"]: c for c in candidate_docs}
    signal_index = {
        req["requirementId"]: {c["candidateId"]: c["signals"] for c in req["candidates"]}
        for req in external_requirements
    }
    raw = llm_result.get("mappings") if isinstance(llm_result.get("mappings"), list) else []
    mappings: list[dict[str, Any]] = []
    review_items: list[dict[str, Any]] = []
    for item in raw:
        if not isinstance(item, dict):
            continue
        req_id = item.get("requirementId") or ""
        cand_id = item.get("matchedCandidateId") or ""
        candidate = candidate_index.get(cand_id, {})
        confidence = _as_float(item.get("confidence"))
        review_status = item.get("manualReviewStatus") or ("review_required" if confidence < 0.6 else "mapped")
        if confidence < 0.6:
            review_status = "review_required"
        mapping = {
            "requirementId": req_id,
            "externalClauseRef": item.get("externalClauseRef") or "",
            "externalRequirement": item.get("externalRequirement") or "",
            "matchedInternalPolicy": candidate.get("internalPolicyFile") or item.get("matchedInternalPolicy") or "",
            "matchedInternalClauseRef": candidate.get("internalClauseRef") or item.get("matchedInternalClauseRef") or "",
            "internalClauseText": candidate.get("internalClauseText") or item.get("internalClauseText") or "",
            "mappingSummary": item.get("mappingSummary") or "",
            "dimension": item.get("dimension") or "监管要求",
            "confidence": confidence,
            "confidenceLevel": item.get("confidenceLevel") or _confidence_level(confidence),
            "signals": signal_index.get(req_id, {}).get(cand_id, {"bm25": 0, "keyword": 0}),
            "manualReviewStatus": review_status,
            "needsReview": review_status == "review_required",
        }
        mappings.append(mapping)
        if mapping["needsReview"]:
            review_items.append(
                {
                    "targetType": "mapping",
                    "targetId": req_id,
                    "riskLevel": "high" if confidence < 0.4 else "medium",
                    "reason": "低置信度映射需人工复核确认或排除。",
                    "decision": "pending",
                }
            )
    mapped_count = sum(1 for m in mappings if m["matchedInternalClauseRef"])
    summary = {
        "totalRequirements": len(external_requirements),
        "mappedCount": mapped_count,
        "reviewRequiredCount": sum(1 for m in mappings if m["needsReview"]),
        "internalClauseCount": len(candidate_docs),
        "coverageRate": round(mapped_count / len(external_requirements), 2) if external_requirements else 0.0,
    }
    return {
        "runId": run_id,
        "skillId": "regulatory-mapping",
        "taskId": task_id,
        "upstream": {"decomposerRunId": decomposer_run_id},
        "internalPolicy": {"filename": parsed_internal.filename, "sha256": parsed_internal.sha256, "clauseCount": len(candidate_docs)},
        "model": {"provider": "deepseek", "name": model, "promptVersion": prompt_version},
        "engineNotes": ["V1 候选筛选使用 BM25 + 关键词信号；BGE 语义信号未启用（降级）。映射确认由 DeepSeek 在候选集合内完成。"],
        "summary": summary,
        "mappings": mappings,
        "review": {"status": "pending", "required": True, "items": review_items},
        "artifacts": [],
    }


def _as_float(value: Any) -> float:
    try:
        return round(float(value), 2)
    except (TypeError, ValueError):
        return 0.0


def _confidence_level(confidence: float) -> str:
    if confidence >= 0.8:
        return "高"
    if confidence >= 0.6:
        return "中"
    return "低"
