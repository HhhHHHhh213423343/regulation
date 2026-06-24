from __future__ import annotations

import re
from typing import Any

from . import clause_integrity
from .models import Clause, ParsedDocument


# 仅在行首（前面是换行/字符串开头 + 可选空白或全角空格）出现的“第X条”才视为结构性条款边界，
# 避免把修订决定中“将《某办法》第X条修改为……”这类正文内引用误判为条款，
# 否则会在引用处错误切断，留下以“将”结尾的半句残文。
CLAUSE_RE = re.compile(r"(?:^|\n)[\s　]*(第[一二三四五六七八九十百千万零〇两\d]+条)")
ACTION_GROUPS = {
    "建立/设立": ["建立", "设立", "成立", "组建", "构建", "搭建"],
    "报送/报告": ["报送", "报告", "上报", "提交", "报备", "备案"],
    "审批/核准": ["审批", "核准", "批准", "许可", "同意"],
    "检查/审计": ["检查", "审计", "核查", "审查", "排查", "评估"],
    "披露/公开": ["披露", "公开", "公告", "公示", "发布"],
    "整改/纠正": ["整改", "纠正", "改正", "限期改正", "责令改正"],
    "登记/注册": ["登记", "注册", "备案登记", "信息登记"],
    "监测/预警": ["监测", "预警", "监控", "跟踪", "识别"],
    "限制/禁止": ["限制", "禁止", "停止", "暂停", "终止"],
    "保存/归档": ["保存", "归档", "留存", "保管", "记录"],
    "培训/教育": ["培训", "教育", "学习", "考核"],
    "制定/修订": ["制定", "修订", "修改", "完善", "起草"],
}


def split_clauses(document: ParsedDocument) -> list[Clause]:
    matches = list(CLAUSE_RE.finditer(document.text))
    clauses: list[Clause] = []
    if matches:
        for index, match in enumerate(matches):
            start = match.start(1)
            end = matches[index + 1].start(1) if index + 1 < len(matches) else len(document.text)
            text = document.text[start:end].strip()
            if len(text) < 15:
                continue
            clauses.append(_build_clause(len(clauses) + 1, match.group(1), text, start, end, "high"))
        return clauses
    return _fallback_paragraph_split(document)


def _fallback_paragraph_split(document: ParsedDocument) -> list[Clause]:
    clauses: list[Clause] = []
    for block in document.blocks:
        text = str(block.get("text") or "").strip()
        if len(text) < 15 or block.get("type") == "heading":
            continue
        ref = f"段落{block.get('position', {}).get('paragraphIndex', len(clauses) + 1)}"
        clauses.append(
            _build_clause(
                len(clauses) + 1,
                ref,
                text,
                int(block.get("position", {}).get("paragraphIndex", 0)),
                int(block.get("position", {}).get("paragraphIndex", 0)),
                "low",
            )
        )
    return clauses


def _build_clause(index: int, ref: str, text: str, start: int, end: int, confidence: str) -> Clause:
    merged = _merge_subitems(text)
    return Clause(
        clause_id=f"C-{index:03d}",
        clause_ref=ref,
        heading_path=[],
        original_text=merged,
        position={"paragraphStart": start, "paragraphEnd": end},
        rule_tags={"obligationType": classify_obligation(text), "regulatoryActions": extract_actions(text)},
        split_confidence=confidence,
        integrity=clause_integrity.assess(merged),
    )


def _merge_subitems(text: str) -> str:
    return re.sub(r"\n+\s*([（(][一二三四五六七八九十\d]+[）)])", r" \1", text)


def classify_obligation(text: str) -> str:
    if any(word in text for word in ["不得超过", "只能"]):
        return "限制性"
    if any(word in text for word in ["不得", "禁止", "严禁"]):
        return "禁止性"
    if any(word in text for word in ["应当", "必须", "须"]):
        return "强制性"
    if any(word in text for word in ["报送", "备案", "审批", "登记"]):
        return "程序性"
    if any(word in text for word in ["可以", "可", "授权"]):
        return "授权性"
    return "一般性"


def extract_actions(text: str) -> list[dict[str, Any]]:
    actions: list[dict[str, Any]] = []
    for group, words in ACTION_GROUPS.items():
        hits = [word for word in words if word in text]
        if hits:
            actions.append({"category": group, "verbs": hits})
    return actions

