"""交付物生成：基于已保存的结构化运行结果生成 JSON / Markdown / HTML / Word / Excel。

只读取 run 的 structured_result（既有的真实执行结果或人工复核记录），不重新自由生成专业结论。
所有交付物头部标注 run_id / 模型 / Prompt 版本 / 执行时间 / 复核状态 / AI 辅助声明。
"""
from __future__ import annotations

import html
import json
from pathlib import Path
from typing import Any

from skills_runtime import run_manager
from skills_runtime.artifact_manager import artifact_dir
from skills_runtime.models import now_iso

SKILL_NAMES = {
    "regulatory-decomposer": "监管解读",
    "regulatory-mapping": "内规映射",
    "regulation-gap-analysis": "制度差距分析",
    "remediation-implementation": "整改落地",
}
STATUS_NAMES = {
    "review_required": "待人工复核",
    "pending": "等待执行",
    "running": "执行中",
    "completed": "已完成",
    "succeeded": "已完成",
    "failed": "执行失败",
    "queued": "排队中",
    "approved": "复核通过",
    "changes_requested": "要求修改",
    "in_review": "复核中",
}


def status_zh(value: str) -> str:
    return STATUS_NAMES.get(value or "", value or "—")


DISCLAIMER = "AI 辅助分析，须经合规/法律人员复核。"


def generate(run_data: dict[str, Any], types: list[str]) -> list[dict[str, Any]]:
    run_id = run_data.get("run_id") or ""
    skill_id = run_data.get("skill_id") or ""
    result = run_data.get("structured_result") or {}
    out_dir = artifact_dir(run_id)
    artifacts: list[dict[str, Any]] = []
    meta = _meta(run_data)

    wanted = {t.lower() for t in types} or {"html", "json"}
    if "json" in wanted:
        path = out_dir / "output.json"
        path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        artifacts.append(_artifact(run_id, "结构化数据（JSON）", "json", path))
    if "md" in wanted or "markdown" in wanted:
        path = out_dir / "report.md"
        path.write_text(_markdown(skill_id, meta, result), encoding="utf-8")
        artifacts.append(_artifact(run_id, f"{SKILL_NAMES.get(skill_id, skill_id)}报告（文本）", "md", path))
    if "html" in wanted:
        path = out_dir / "report.html"
        path.write_text(_html(skill_id, meta, result), encoding="utf-8")
        artifacts.append(_artifact(run_id, f"{SKILL_NAMES.get(skill_id, skill_id)}网页报告", "html", path))
    if "docx" in wanted or "word" in wanted:
        path = _docx(skill_id, meta, result, out_dir)
        if path:
            artifacts.append(_artifact(run_id, f"{SKILL_NAMES.get(skill_id, skill_id)}文档报告", "docx", path))
    if "xlsx" in wanted or "excel" in wanted:
        path = _xlsx(skill_id, meta, result, out_dir)
        if path:
            artifacts.append(_artifact(run_id, f"{SKILL_NAMES.get(skill_id, skill_id)}数据表格", "xlsx", path))

    # 回写 run 的 artifacts 列表
    existing = run_manager.load_run(run_id) or run_data
    existing.setdefault("structured_result", result)
    existing["structured_result"]["artifacts"] = artifacts
    run_manager.save_json(run_id, "run.json", existing)
    run_manager.save_json(run_id, "artifacts.json", artifacts)
    return artifacts


def _meta(run_data: dict[str, Any]) -> dict[str, Any]:
    result = run_data.get("structured_result") or {}
    return {
        "runId": run_data.get("run_id") or "",
        "taskId": run_data.get("task_id") or "",
        "skillId": run_data.get("skill_id") or "",
        "skillName": SKILL_NAMES.get(run_data.get("skill_id") or "", run_data.get("skill_id") or ""),
        "model": (result.get("model") or {}).get("name") or run_data.get("model") or "",
        "promptVersion": run_data.get("prompt_version") or "",
        "status": run_data.get("status") or "",
        "createdAt": run_data.get("created_at") or "",
        "completedAt": run_data.get("completed_at") or "",
        "reviewStatus": (result.get("review") or {}).get("status") or "pending",
        "generatedAt": now_iso(),
        "inputs": run_data.get("input_refs") or [],
    }


def _artifact(run_id: str, name: str, type_: str, path: Path) -> dict[str, Any]:
    return {
        "id": f"ART-{run_id}-{type_}",
        "name": name,
        "type": type_,
        "path": f"data/skill_artifacts/{run_id}/{path.name}",
        "source": "本次执行结果",
        "generatedAt": now_iso(),
    }


# ---------- Markdown ----------

def _markdown(skill_id: str, meta: dict[str, Any], result: dict[str, Any]) -> str:
    lines = [f"# {meta['skillName']}报告", "", _meta_md(meta), ""]
    if skill_id == "regulatory-decomposer":
        five = result.get("fiveDimensions") or {}
        intent = five.get("regulatoryIntent") or {}
        lines += ["## 监管意图", f"- 政策背景：{intent.get('policyBackground','')}", f"- 监管目标：{intent.get('regulatoryGoal','')}", f"- 风险关切：{intent.get('riskConcern','')}", ""]
        lines += ["## 监管要求（摘要）", "", "| 条款 | 义务类型 | 主体 | 监管动作 | 时限 | 监管要求摘要 |", "|---|---|---|---|---|---|"]
        for r in five.get("regulatoryRequirements") or []:
            lines.append(f"| {r.get('clauseRef','')} | {r.get('obligationType','')} | {r.get('subject','')} | {r.get('action','')} | {r.get('deadline') or ''} | {(_one_line(r.get('originalExcerpt','')))[:60]} |")
        lines += ["", "## 条款原文（完整）", ""]
        for c in result.get("clauses") or []:
            integ = c.get("integrity") or {}
            flag = "（原文待人工复核：" + str(integ.get("reason", "")) + "）" if integ.get("status") == "review_required" else ""
            lines += [f"### {c.get('clauseRef','')} {flag}", _one_line(c.get("originalText", "")), ""]
    elif skill_id == "regulatory-mapping":
        s = result.get("summary") or {}
        lines += [f"## 摘要", f"- 监管要求数：{s.get('totalRequirements',0)}，已映射：{s.get('mappedCount',0)}，需复核：{s.get('reviewRequiredCount',0)}，覆盖率：{s.get('coverageRate',0)}", ""]
        lines += ["## 映射明细", "", "| 外规条款 | 内规条款 | 维度 | 置信度 | 复核状态 | 匹配摘要 |", "|---|---|---|---|---|---|"]
        for m in result.get("mappings") or []:
            lines.append(f"| {m.get('externalClauseRef','')} | {m.get('matchedInternalClauseRef') or '无匹配'} | {m.get('dimension','')} | {m.get('confidence',0)} | {m.get('manualReviewStatus','')} | {_one_line(m.get('mappingSummary',''))[:50]} |")
    elif skill_id == "regulation-gap-analysis":
        s = result.get("summary") or {}
        lines += [f"## 摘要", f"- 义务数：{s.get('totalObligations',0)}，满足：{s.get('fullyCompliantCount',0)}，部分满足：{s.get('partiallyCompliantCount',0)}，未满足：{s.get('nonCompliantCount',0)}，合规率：{s.get('complianceRate',0)}", ""]
        lines += ["## 差距清单", "", "| 差距编号 | 外规依据 | 满足度 | 风险 | 类型 | 差距描述 | 整改建议 |", "|---|---|---|---|---|---|---|"]
        for g in result.get("gapItems") or []:
            lines.append(f"| {g.get('gapId','')} | {g.get('externalClauseRef','')} | {g.get('complianceLevel','')} | {g.get('riskLevel','')} | {g.get('gapType','')} | {_one_line(g.get('gapDescription',''))[:50]} | {_one_line(g.get('recommendation',''))[:50]} |")
    elif skill_id == "remediation-implementation":
        s = result.get("summary") or {}
        lines += [f"## 摘要", f"- 整改项：{s.get('totalItems',0)}，紧急：{s.get('urgentCount',0)}，控制点：{s.get('controlPointCount',0)}，制度草案：{s.get('policyDraftCount',0)}", ""]
        for it in result.get("items") or []:
            d = it.get("dimensions") or {}
            lines += [f"### {it.get('remediationId','')} ({it.get('gapId','')}) — 优先级 {it.get('priority','')} / {it.get('plannedCompletionDate','')}",
                      f"- 外规依据：{it.get('externalBasis','')}",
                      f"- 制度：{(d.get('institution') or {}).get('action','')}",
                      f"- 流程：{(d.get('process') or {}).get('action','')}",
                      f"- 系统：{(d.get('system') or {}).get('action','')}",
                      f"- 控制点：{(d.get('control') or {}).get('controlPointId','')} {(d.get('control') or {}).get('description','')}"]
            pd = it.get("policyDraft") or {}
            if pd.get("title"):
                lines += [f"- 制度草案《{pd.get('title')}》：{pd.get('purpose','')}", f"  > {pd.get('disclaimer','')}"]
            lines.append("")
    lines += ["", f"> {DISCLAIMER}"]
    return "\n".join(lines)


def _meta_md(meta: dict[str, Any]) -> str:
    return (f"- 执行模块：{meta['skillName']}　模型：{meta['model']}\n"
            f"- 执行时间：{meta['completedAt'] or meta['createdAt']}　执行结果：{status_zh(meta['status'])}　人工复核：{status_zh(meta['reviewStatus'])}\n"
            f"- 技术信息（供审计）：执行批次 `{meta['runId']}`　任务编号 `{meta['taskId']}`　执行指令 `{meta['promptVersion']}`")


# ---------- HTML ----------

def _html(skill_id: str, meta: dict[str, Any], result: dict[str, Any]) -> str:
    body = _markdown_to_html_tables(skill_id, result)
    return f"""<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<title>{html.escape(meta['skillName'])}报告 {html.escape(meta['runId'])}</title>
<style>
body{{font-family:-apple-system,'PingFang SC',sans-serif;margin:0;background:#f5f6f8;color:#1f2329}}
.wrap{{max-width:980px;margin:0 auto;padding:32px}}
header{{background:#0f2c4c;color:#fff;padding:24px 32px;border-radius:12px;margin-bottom:20px}}
header h1{{margin:0 0 8px;font-size:22px}}
.meta{{font-size:13px;line-height:1.9;opacity:.92}}
.meta code{{background:rgba(255,255,255,.16);padding:1px 6px;border-radius:4px}}
section{{background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}}
h2{{font-size:16px;border-left:4px solid #2f6fed;padding-left:10px;margin-top:0}}
table{{width:100%;border-collapse:collapse;font-size:13px}}
th,td{{border:1px solid #e5e8ee;padding:7px 9px;text-align:left;vertical-align:top}}
th{{background:#f0f3f8}}
.tag{{display:inline-block;padding:1px 8px;border-radius:10px;font-size:12px}}
.tag.high{{background:#fde2e2;color:#c0392b}} .tag.mid{{background:#fef3d6;color:#b9770e}} .tag.low{{background:#e3f1e0;color:#2f8f46}}
.disc{{color:#b9770e;font-size:13px;margin-top:12px}}
</style></head><body><div class="wrap">
<header><h1>{html.escape(meta['skillName'])}报告</h1>
<div class="meta">执行模块：{html.escape(meta['skillName'])}　模型：{html.escape(str(meta['model']))}<br>
执行时间：{html.escape(meta['completedAt'] or meta['createdAt'])}　执行结果：{html.escape(status_zh(meta['status']))}　人工复核：{html.escape(status_zh(meta['reviewStatus']))}<br>
<span style="font-size:12px;opacity:.7">技术信息（供审计）：执行批次 {html.escape(meta['runId'])}　任务编号 {html.escape(meta['taskId'])}　执行指令 {html.escape(meta['promptVersion'])}</span></div></header>
{body}
<p class="disc">⚠ {html.escape(DISCLAIMER)}</p>
</div></body></html>"""


def _markdown_to_html_tables(skill_id: str, result: dict[str, Any]) -> str:
    def esc(v: Any) -> str:
        return html.escape(_one_line(str(v if v is not None else "")))

    def risk_tag(v: str) -> str:
        cls = {"高": "high", "中": "mid", "低": "low"}.get(v, "")
        return f'<span class="tag {cls}">{esc(v)}</span>' if v else ""

    parts: list[str] = []
    if skill_id == "regulatory-decomposer":
        five = result.get("fiveDimensions") or {}
        intent = five.get("regulatoryIntent") or {}
        parts.append("<section><h2>监管意图</h2><table>"
                     + "".join(f"<tr><th>{k}</th><td>{esc(intent.get(v,''))}</td></tr>" for k, v in
                               [("政策背景", "policyBackground"), ("监管目标", "regulatoryGoal"), ("风险关切", "riskConcern"), ("预期效果", "expectedEffect")])
                     + "</table></section>")
        rows = "".join(
            f"<tr><td>{esc(r.get('clauseRef'))}</td><td>{esc(r.get('obligationType'))}</td><td>{esc(r.get('subject'))}</td>"
            f"<td>{esc(r.get('action'))}</td><td>{esc(r.get('deadline') or '')}</td><td>{esc(r.get('originalExcerpt'))[:120]}</td></tr>"
            for r in five.get("regulatoryRequirements") or [])
        parts.append(f"<section><h2>监管要求（摘要，{len(five.get('regulatoryRequirements') or [])}）</h2><table>"
                     "<tr><th>条款</th><th>义务类型</th><th>主体</th><th>监管动作</th><th>时限</th><th>监管要求摘要</th></tr>"
                     f"{rows}</table></section>")
        clause_rows_list = []
        for c in result.get("clauses") or []:
            flagged = (c.get("integrity") or {}).get("status") == "review_required"
            badge = '<span class="tag high">原文待人工复核</span>' if flagged else '<span class="tag low">完整</span>'
            cell = '<td style="white-space:pre-wrap">' + esc(c.get("originalText")) + "</td>"
            clause_rows_list.append("<tr><td>" + esc(c.get("clauseRef")) + "</td><td>" + badge + "</td>" + cell + "</tr>")
        parts.append("<section><h2>条款原文（完整，" + str(len(result.get("clauses") or [])) + "）</h2>"
                     '<p style="font-size:12px;color:#5a6472">以下为文件解析的完整条款原文（非模型摘要）；疑似不完整者标记为“原文待人工复核”。</p>'
                     "<table><tr><th>条款</th><th>完整性</th><th>条款原文</th></tr>"
                     + "".join(clause_rows_list) + "</table></section>")
    elif skill_id == "regulatory-mapping":
        s = result.get("summary") or {}
        parts.append(f"<section><h2>映射摘要</h2><p>监管要求 {s.get('totalRequirements',0)} 条，已映射 {s.get('mappedCount',0)}，"
                     f"需复核 {s.get('reviewRequiredCount',0)}，覆盖率 {s.get('coverageRate',0)}，内规条款 {s.get('internalClauseCount',0)}。</p></section>")
        rows = "".join(
            f"<tr><td>{esc(m.get('externalClauseRef'))}</td><td>{esc(m.get('matchedInternalClauseRef') or '无匹配')}</td>"
            f"<td>{esc(m.get('dimension'))}</td><td>{esc(m.get('confidence'))}（{esc(m.get('confidenceLevel'))}）</td>"
            f"<td>{esc(m.get('manualReviewStatus'))}</td><td>{esc(m.get('mappingSummary'))[:120]}</td></tr>"
            for m in result.get("mappings") or [])
        parts.append("<section><h2>映射明细</h2><table>"
                     "<tr><th>外规条款</th><th>内规条款</th><th>维度</th><th>置信度</th><th>复核状态</th><th>匹配摘要</th></tr>"
                     f"{rows}</table></section>")
    elif skill_id == "regulation-gap-analysis":
        s = result.get("summary") or {}
        parts.append(f"<section><h2>差距分析摘要</h2><p>义务 {s.get('totalObligations',0)} 条，满足 {s.get('fullyCompliantCount',0)}，"
                     f"部分满足 {s.get('partiallyCompliantCount',0)}，未满足 {s.get('nonCompliantCount',0)}，合规率 {s.get('complianceRate',0)}。</p></section>")
        rows = "".join(
            f"<tr><td>{esc(g.get('gapId'))}</td><td>{esc(g.get('externalClauseRef'))}</td><td>{esc(g.get('complianceLevel'))}</td>"
            f"<td>{risk_tag(g.get('riskLevel'))}</td><td>{esc(g.get('gapType'))}</td><td>{esc(g.get('gapDescription'))[:100]}</td>"
            f"<td>{esc(g.get('recommendation'))[:100]}</td></tr>"
            for g in result.get("gapItems") or [])
        parts.append("<section><h2>差距清单</h2><table>"
                     "<tr><th>差距编号</th><th>外规依据</th><th>满足度</th><th>风险</th><th>类型</th><th>Gap 描述</th><th>整改建议</th></tr>"
                     f"{rows}</table></section>")
    elif skill_id == "remediation-implementation":
        s = result.get("summary") or {}
        parts.append(f"<section><h2>整改摘要</h2><p>整改项 {s.get('totalItems',0)}，紧急 {s.get('urgentCount',0)}，"
                     f"控制点 {s.get('controlPointCount',0)}，制度草案 {s.get('policyDraftCount',0)}。</p></section>")
        for it in result.get("items") or []:
            d = it.get("dimensions") or {}
            pd = it.get("policyDraft") or {}
            draft = ""
            if pd.get("title"):
                draft = (f"<p><strong>制度草案《{esc(pd.get('title'))}》</strong>：{esc(pd.get('purpose'))}<br>"
                         f"适用范围：{esc(pd.get('scope'))}<br>审批流程：{esc(pd.get('approvalPath'))}<br>"
                         f"外规依据：{esc(pd.get('regulatoryBasis'))}</p><p class='disc'>⚠ {esc(pd.get('disclaimer'))}</p>")
            parts.append(
                f"<section><h2>{esc(it.get('remediationId'))} · {esc(it.get('gapId'))} · {esc(it.get('priority'))} · {esc(it.get('plannedCompletionDate'))}</h2>"
                f"<table><tr><th>外规依据</th><td>{esc(it.get('externalBasis'))}</td></tr>"
                f"<tr><th>制度</th><td>{esc((d.get('institution') or {}).get('action'))}</td></tr>"
                f"<tr><th>流程</th><td>{esc((d.get('process') or {}).get('action'))}</td></tr>"
                f"<tr><th>系统</th><td>{esc((d.get('system') or {}).get('action'))}</td></tr>"
                f"<tr><th>控制点</th><td>{esc((d.get('control') or {}).get('controlPointId'))} {esc((d.get('control') or {}).get('description'))}</td></tr>"
                f"<tr><th>责任部门</th><td>{esc(it.get('ownerDepartment'))}</td></tr></table>{draft}</section>")
    return "\n".join(parts)


# ---------- Word ----------

def _docx(skill_id: str, meta: dict[str, Any], result: dict[str, Any], out_dir: Path) -> Path | None:
    try:
        from docx import Document
    except Exception:
        return None
    doc = Document()
    doc.add_heading(f"{meta['skillName']}报告", level=0)
    p = doc.add_paragraph()
    p.add_run(f"执行模块：{meta['skillName']}　模型：{meta['model']}\n").bold = True
    doc.add_paragraph(f"执行时间：{meta['completedAt'] or meta['createdAt']}　执行结果：{status_zh(meta['status'])}　人工复核：{status_zh(meta['reviewStatus'])}")
    doc.add_paragraph(f"技术信息（供审计）：执行批次 {meta['runId']}　任务编号 {meta['taskId']}　执行指令 {meta['promptVersion']}")

    def table(headers: list[str], rows: list[list[str]]) -> None:
        t = doc.add_table(rows=1, cols=len(headers))
        t.style = "Light Grid Accent 1"
        for i, h in enumerate(headers):
            t.rows[0].cells[i].text = h
        for row in rows:
            cells = t.add_row().cells
            for i, v in enumerate(row):
                cells[i].text = _one_line(str(v if v is not None else ""))[:200]

    if skill_id == "regulatory-decomposer":
        five = result.get("fiveDimensions") or {}
        intent = five.get("regulatoryIntent") or {}
        doc.add_heading("监管意图", level=1)
        for label, key in [("政策背景", "policyBackground"), ("监管目标", "regulatoryGoal"), ("风险关切", "riskConcern"), ("预期效果", "expectedEffect")]:
            doc.add_paragraph(f"{label}：{intent.get(key,'')}")
        doc.add_heading("监管要求（摘要）", level=1)
        table(["条款", "义务类型", "主体", "监管动作", "时限", "监管要求摘要"],
              [[r.get("clauseRef"), r.get("obligationType"), r.get("subject"), r.get("action"), r.get("deadline") or "", r.get("originalExcerpt")] for r in five.get("regulatoryRequirements") or []])
        doc.add_heading("条款原文（完整）", level=1)
        for c in result.get("clauses") or []:
            flagged = (c.get("integrity") or {}).get("status") == "review_required"
            heading = str(c.get("clauseRef") or "") + ("　[原文待人工复核]" if flagged else "")
            doc.add_paragraph(heading).bold = True
            doc.add_paragraph(str(c.get("originalText") or ""))  # 完整原文，不截断
    elif skill_id == "regulatory-mapping":
        doc.add_heading("映射明细", level=1)
        table(["外规条款", "内规条款", "维度", "置信度", "复核状态", "匹配摘要"],
              [[m.get("externalClauseRef"), m.get("matchedInternalClauseRef") or "无匹配", m.get("dimension"), m.get("confidence"), m.get("manualReviewStatus"), m.get("mappingSummary")] for m in result.get("mappings") or []])
    elif skill_id == "regulation-gap-analysis":
        doc.add_heading("Gap 清单", level=1)
        table(["Gap", "外规依据", "满足度", "风险", "类型", "Gap 描述", "整改建议"],
              [[g.get("gapId"), g.get("externalClauseRef"), g.get("complianceLevel"), g.get("riskLevel"), g.get("gapType"), g.get("gapDescription"), g.get("recommendation")] for g in result.get("gapItems") or []])
    elif skill_id == "remediation-implementation":
        for it in result.get("items") or []:
            d = it.get("dimensions") or {}
            pd = it.get("policyDraft") or {}
            doc.add_heading(f"{it.get('remediationId')} · {it.get('gapId')} · {it.get('priority')}", level=1)
            doc.add_paragraph(f"外规依据：{it.get('externalBasis','')}")
            doc.add_paragraph(f"制度：{(d.get('institution') or {}).get('action','')}")
            doc.add_paragraph(f"流程：{(d.get('process') or {}).get('action','')}")
            doc.add_paragraph(f"系统：{(d.get('system') or {}).get('action','')}")
            doc.add_paragraph(f"控制点：{(d.get('control') or {}).get('controlPointId','')} {(d.get('control') or {}).get('description','')}")
            if pd.get("title"):
                doc.add_paragraph(f"制度草案《{pd.get('title')}》：{pd.get('purpose','')}")
                doc.add_paragraph(pd.get("disclaimer", DISCLAIMER)).italic = True
    doc.add_paragraph("")
    doc.add_paragraph(f"⚠ {DISCLAIMER}").italic = True
    path = out_dir / "report.docx"
    doc.save(str(path))
    return path


# ---------- Excel ----------

def _xlsx(skill_id: str, meta: dict[str, Any], result: dict[str, Any], out_dir: Path) -> Path | None:
    try:
        from openpyxl import Workbook
    except Exception:
        return None
    wb = Workbook()
    ws = wb.active
    ws.title = "元数据"
    ws.append(["执行模块", meta["skillName"]])
    ws.append(["模型", str(meta["model"])])
    ws.append(["执行时间", meta["completedAt"] or meta["createdAt"]])
    ws.append(["执行结果", status_zh(meta["status"])])
    ws.append(["人工复核", status_zh(meta["reviewStatus"])])
    ws.append(["声明", DISCLAIMER])
    ws.append(["—— 技术信息（供审计）——", ""])
    ws.append(["执行批次 run_id", meta["runId"]])
    ws.append(["任务编号 task_id", meta["taskId"]])
    ws.append(["执行指令 prompt", meta["promptVersion"]])

    def sheet(name: str, headers: list[str], rows: list[list[Any]]) -> None:
        s = wb.create_sheet(name)
        s.append(headers)
        for row in rows:
            s.append([_one_line(str(v if v is not None else ""))[:500] for v in row])

    if skill_id == "regulatory-decomposer":
        five = result.get("fiveDimensions") or {}
        sheet("监管要求摘要", ["条款", "义务类型", "主体", "监管动作", "时限", "监管要求摘要"],
              [[r.get("clauseRef"), r.get("obligationType"), r.get("subject"), r.get("action"), r.get("deadline") or "", r.get("originalExcerpt")] for r in five.get("regulatoryRequirements") or []])
        cs = wb.create_sheet("条款原文")
        cs.append(["条款", "完整性", "条款原文（完整）"])
        for c in result.get("clauses") or []:
            flagged = (c.get("integrity") or {}).get("status") == "review_required"
            cs.append([str(c.get("clauseRef") or ""), "原文待人工复核" if flagged else "完整", str(c.get("originalText") or "")[:32000]])
    elif skill_id == "regulatory-mapping":
        sheet("映射矩阵", ["外规条款", "外规要求", "内规文件", "内规条款", "维度", "置信度", "置信度等级", "复核状态", "匹配摘要"],
              [[m.get("externalClauseRef"), m.get("externalRequirement"), m.get("matchedInternalPolicy"), m.get("matchedInternalClauseRef"), m.get("dimension"), m.get("confidence"), m.get("confidenceLevel"), m.get("manualReviewStatus"), m.get("mappingSummary")] for m in result.get("mappings") or []])
    elif skill_id == "regulation-gap-analysis":
        sheet("Gap清单", ["Gap", "外规依据", "内规现状", "满足度", "风险", "类型", "Gap描述", "分类理由", "风险说明", "整改建议"],
              [[g.get("gapId"), g.get("externalClauseRef"), g.get("internalStatus"), g.get("complianceLevel"), g.get("riskLevel"), g.get("gapType"), g.get("gapDescription"), g.get("classificationReason"), g.get("riskExplanation"), g.get("recommendation")] for g in result.get("gapItems") or []])
    elif skill_id == "remediation-implementation":
        rows = []
        for it in result.get("items") or []:
            d = it.get("dimensions") or {}
            rows.append([it.get("remediationId"), it.get("gapId"), it.get("externalBasis"),
                         (d.get("institution") or {}).get("action"), (d.get("process") or {}).get("action"),
                         (d.get("system") or {}).get("action"), (d.get("control") or {}).get("controlPointId"),
                         it.get("ownerDepartment"), it.get("priority"), it.get("plannedCompletionDate"), it.get("status")])
        sheet("整改方案", ["整改编号", "Gap", "外规依据", "制度", "流程", "系统", "控制点", "责任部门", "优先级", "计划完成", "状态"], rows)
    path = out_dir / "data.xlsx"
    wb.save(str(path))
    return path


def _one_line(text: str) -> str:
    return " ".join(str(text).split())
