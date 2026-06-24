from __future__ import annotations

from pathlib import Path
from typing import Any

from skills_runtime import clause_splitter, document_parser, run_manager
from skills_runtime.audit_logger import append_event
from skills_runtime.llm_client import LLMClient, get_config
from skills_runtime.registry import get_skill


def run(task_id: str, file_path: Path, run_id: str | None = None) -> dict[str, Any]:
    skill = get_skill("regulatory-decomposer")
    if not skill:
        raise RuntimeError("监管解读 Skill Registry 未配置。")
    config = get_config()
    if not config.configured:
        return {
            "status": "engine-not-configured",
            "message": "执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY。",
            "canRun": False,
        }
    run_obj = run_manager.create_run(task_id, skill.id, config.model_fast, skill.prompt_version)
    append_event(run_obj.run_id, "run_created", {"skill_id": skill.id, "task_id": task_id})
    try:
        run_obj.status = "running"
        run_manager.save_run(run_obj)
        stored_input = run_manager.attach_input_file(run_obj, file_path)
        parsed = document_parser.parse_document(stored_input)
        clauses = clause_splitter.split_clauses(parsed)
        if not clauses:
            raise RuntimeError("未能从文件中切分出有效监管条款。")
        run_manager.save_json(run_obj.run_id, "parsed_document.json", _parsed_to_dict(parsed))
        run_manager.save_json(run_obj.run_id, "clauses.json", [clause.to_dict() for clause in clauses])
        prompt = (Path(__file__).resolve().parents[2] / skill.prompt_template).read_text(encoding="utf-8")
        payload = {
            "taskId": task_id,
            "skillId": skill.id,
            "promptVersion": skill.prompt_version,
            "sourceDocument": "docs/监管解读(1).docx",
            "file": {
                "filename": parsed.filename,
                "fileType": parsed.file_type,
                "sha256": parsed.sha256,
                "textLength": len(parsed.text),
            },
            "clauses": [clause.to_dict() for clause in clauses[:60]],
        }
        append_event(run_obj.run_id, "llm_request_prepared", {"model": config.model_fast, "clause_count": len(clauses)})
        llm_result = LLMClient(config).chat_json(prompt, payload, model=config.model_fast)
        structured = _compose_output(run_obj.run_id, task_id, parsed, clauses, llm_result, config.model_fast, skill.prompt_version)
        run_manager.save_json(run_obj.run_id, "output.json", structured)
        run_manager.complete_run(run_obj, "review_required", structured)
        append_event(run_obj.run_id, "run_completed", {"status": "review_required"})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()
    except Exception as error:
        run_obj.status = "failed"
        run_obj.warnings.append(str(error))
        run_manager.complete_run(run_obj, "failed", {"error": str(error)})
        append_event(run_obj.run_id, "run_failed", {"error": str(error)})
        return run_manager.load_run(run_obj.run_id) or run_obj.to_dict()


def _parsed_to_dict(parsed: Any) -> dict[str, Any]:
    return {
        "documentId": parsed.document_id,
        "filename": parsed.filename,
        "fileType": parsed.file_type,
        "sha256": parsed.sha256,
        "textLength": len(parsed.text),
        "blocks": parsed.blocks,
        "storedPath": str(parsed.stored_path),
    }


def _compose_output(
    run_id: str,
    task_id: str,
    parsed: Any,
    clauses: list[Any],
    llm_result: dict[str, Any],
    model: str,
    prompt_version: str,
) -> dict[str, Any]:
    return {
        "runId": run_id,
        "skillId": "regulatory-decomposer",
        "taskId": task_id,
        "sourceDocument": {
            "filename": parsed.filename,
            "fileType": parsed.file_type,
            "sha256": parsed.sha256,
            "textLength": len(parsed.text),
        },
        "model": {"provider": "deepseek", "name": model, "promptVersion": prompt_version},
        "clauses": [clause.to_dict() for clause in clauses],
        "fiveDimensions": {
            "regulatoryIntent": llm_result.get("regulatoryIntent", {}),
            "regulatoryRequirements": _review_items(llm_result.get("regulatoryRequirements", [])),
            "applicableObjects": llm_result.get("applicableObjects", {}),
            "operationalRequirements": _review_items(llm_result.get("operationalRequirements", [])),
            "inspectionFocus": _review_items(llm_result.get("inspectionFocus", [])),
        },
        "review": {
            "status": "pending",
            "required": True,
            "items": _build_review_items(llm_result),
        },
        "artifacts": [],
    }


def _review_items(items: Any) -> list[Any]:
    if not isinstance(items, list):
        return []
    for item in items:
        if isinstance(item, dict):
            item.setdefault("needsReview", True)
    return items


def _build_review_items(llm_result: dict[str, Any]) -> list[dict[str, Any]]:
    review_items: list[dict[str, Any]] = []
    for item in llm_result.get("regulatoryRequirements", []) if isinstance(llm_result.get("regulatoryRequirements"), list) else []:
        if not isinstance(item, dict):
            continue
        review_items.append(
            {
                "targetType": "requirement",
                "targetId": item.get("requirementId") or item.get("clauseId") or "",
                "riskLevel": "high" if item.get("obligationType") in {"强制性", "禁止性", "限制性"} else "medium",
                "reason": "模型生成监管要求，需人工复核；强制/禁止/限制性条款默认高优先级。",
                "decision": "pending",
            }
        )
    review_items.append(
        {
            "targetType": "regulatoryIntent",
            "targetId": "regulatoryIntent",
            "riskLevel": "medium",
            "reason": "监管意图包含模型推理结论，须由合规人员确认。",
            "decision": "pending",
        }
    )
    return review_items
