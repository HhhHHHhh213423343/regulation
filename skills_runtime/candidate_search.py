"""轻量候选检索：纯 Python BM25 + 关键词 Jaccard，用于内规映射候选筛选。

说明：制度映射 Skill 源文档要求 BM25 + BGE Embedding + 关键词 + COSO + 处罚加权五信号融合。
V1 在不引入 sentence-transformers / BGE 模型的前提下，先实现 BM25 + 关键词两路统计信号，
作为「候选筛选」层；语义判断与最终映射确认交由 DeepSeek 受控复核（只在候选集合内选择，
不允许自由猜测）。BGE 语义信号在 V1 标记为降级未启用，见回归报告。
"""
from __future__ import annotations

import math
import re
from typing import Any


_CJK = r"一-鿿"
_ASCII_WORD = re.compile(r"[a-zA-Z0-9]+")
_CJK_RUN = re.compile(f"[{_CJK}]+")

# 领域关键词（托管/合规口径，COSO 五要素相关），命中可提升关键词信号
DOMAIN_KEYWORDS = {
    "托管", "保管", "存管", "登记", "结算", "清算", "估值", "核算", "份额", "净值",
    "资产", "账户", "资金", "划付", "划转", "隔离", "独立", "权益",
    "信息披露", "披露", "报送", "报告", "备案", "审批", "核准",
    "风险", "内控", "合规", "审计", "检查", "监督", "问责", "处罚",
    "投资者", "委托人", "受托", "管理人", "投资经理",
    "数据安全", "客户信息", "保密", "留痕", "档案", "记录", "保存",
    "授权", "职责", "岗位", "制度", "流程", "控制",
}


def tokenize(text: str) -> list[str]:
    """中文按 2-gram 切分 + 领域关键词整体保留；ASCII 按词。"""
    if not text:
        return []
    tokens: list[str] = []
    for word in _ASCII_WORD.findall(text.lower()):
        tokens.append(word)
    for run in _CJK_RUN.findall(text):
        # 领域关键词整体作为 token
        for kw in DOMAIN_KEYWORDS:
            if kw in run:
                tokens.append(kw)
        # 字符 2-gram
        if len(run) == 1:
            tokens.append(run)
        else:
            for i in range(len(run) - 1):
                tokens.append(run[i : i + 2])
    return tokens


class BM25:
    def __init__(self, corpus_tokens: list[list[str]], k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.corpus = corpus_tokens
        self.n = len(corpus_tokens)
        self.doc_len = [len(doc) for doc in corpus_tokens]
        self.avgdl = (sum(self.doc_len) / self.n) if self.n else 0.0
        self.df: dict[str, int] = {}
        for doc in corpus_tokens:
            for term in set(doc):
                self.df[term] = self.df.get(term, 0) + 1
        self.idf: dict[str, float] = {}
        for term, freq in self.df.items():
            self.idf[term] = math.log(1 + (self.n - freq + 0.5) / (freq + 0.5))
        self.tf: list[dict[str, int]] = []
        for doc in corpus_tokens:
            counts: dict[str, int] = {}
            for term in doc:
                counts[term] = counts.get(term, 0) + 1
            self.tf.append(counts)

    def score(self, query_tokens: list[str], index: int) -> float:
        if self.avgdl == 0:
            return 0.0
        counts = self.tf[index]
        dl = self.doc_len[index]
        total = 0.0
        for term in query_tokens:
            if term not in counts:
                continue
            idf = self.idf.get(term, 0.0)
            freq = counts[term]
            denom = freq + self.k1 * (1 - self.b + self.b * dl / self.avgdl)
            total += idf * (freq * (self.k1 + 1)) / denom
        return total


def keyword_jaccard(query_tokens: list[str], doc_tokens: list[str]) -> float:
    qs = {t for t in query_tokens if t in DOMAIN_KEYWORDS}
    ds = {t for t in doc_tokens if t in DOMAIN_KEYWORDS}
    if not qs:
        # 退化为整体 token Jaccard
        qs = set(query_tokens)
        ds = set(doc_tokens)
    if not qs or not ds:
        return 0.0
    inter = len(qs & ds)
    union = len(qs | ds)
    return inter / union if union else 0.0


def rank_candidates(
    query_text: str,
    documents: list[dict[str, Any]],
    text_key: str = "text",
    top_k: int = 6,
) -> list[dict[str, Any]]:
    """返回 top_k 候选，每个含 bm25 / keyword / fused 分数。documents 为 dict 列表。"""
    corpus_tokens = [tokenize(str(d.get(text_key, ""))) for d in documents]
    bm25 = BM25(corpus_tokens)
    query_tokens = tokenize(query_text)
    scored: list[dict[str, Any]] = []
    raw_bm25 = [bm25.score(query_tokens, i) for i in range(len(documents))]
    max_bm25 = max(raw_bm25) if raw_bm25 else 0.0
    for i, doc in enumerate(documents):
        bm = (raw_bm25[i] / max_bm25) if max_bm25 > 0 else 0.0
        kw = keyword_jaccard(query_tokens, corpus_tokens[i])
        fused = round(0.6 * bm + 0.4 * kw, 4)
        scored.append(
            {
                **doc,
                "signals": {"bm25": round(bm, 4), "keyword": round(kw, 4)},
                "candidateScore": fused,
            }
        )
    scored.sort(key=lambda d: d["candidateScore"], reverse=True)
    return scored[:top_k]
