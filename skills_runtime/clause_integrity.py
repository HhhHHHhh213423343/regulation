"""条款原文完整性校验。

用于判断切分/抓取得到的条款原文是否完整，避免把半句话当作"条款原文"展示。
判定规则（保守，宁可标记待复核也不静默展示残缺）：
- 空文本 -> review_required
- 以悬空连接/虚词结尾（如 将/应/须/并/及/为/的 等）-> review_required
- 未以句末标点结尾且不是标题 -> review_required
- 中文引号「“ ”」数量不配对 -> review_required
否则 complete。
"""
from __future__ import annotations

from typing import Any

# 不应作为一句话结尾的悬空连接词/虚词（出现在结尾通常意味着被截断）
DANGLING_TAIL = set("将应须并及与或为的是在对向把被由和之以其且若如即按经向自从")
SENTENCE_END = "。！？；…」』）)\"”"


def _looks_heading(text: str) -> bool:
    stripped = text.strip()
    if len(stripped) <= 24 and any(tag in stripped for tag in ("章", "节", "编", "目录")):
        return True
    return False


def assess(text: str | None) -> dict[str, Any]:
    raw = (text or "").strip()
    if not raw:
        return {"status": "review_required", "reason": "原文为空，需重新解析", "length": 0}
    reasons: list[str] = []
    status = "complete"
    last = raw[-1]
    if _looks_heading(raw):
        return {"status": "complete", "reason": "标题/章节", "length": len(raw)}
    if last in DANGLING_TAIL:
        status = "review_required"
        reasons.append(f"以悬空词“{last}”结尾，疑似截断")
    elif last not in SENTENCE_END:
        status = "review_required"
        reasons.append("未以句末标点结尾，疑似不完整")
    if raw.count("“") != raw.count("”"):
        status = "review_required"
        reasons.append("引号不配对，疑似截断")
    return {"status": status, "reason": "；".join(reasons) or "原文完整", "length": len(raw)}
