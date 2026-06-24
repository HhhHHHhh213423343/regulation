from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
import time
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, urlopen

from .llm_client import LLMClient, get_config
from .models import now_iso


ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT_DIR = ROOT / "data" / "regulatory_snapshots"

DOC_TYPE_KEYWORDS = ["规章", "规范性文件", "公告", "办法", "通知", "监管规则", "征求意见"]
CUSTODY_RELEVANCE_LEVELS = {"high", "medium"}


@dataclass(frozen=True)
class RegulatorySource:
    source_id: str
    regulator: str
    official_domain: str
    list_page_url: str
    document_type_scope: list[str]
    crawler_mode: str
    enabled: bool = True
    rate_limit_seconds: float = 2
    last_success_at: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "source_id": self.source_id,
            "regulator": self.regulator,
            "official_domain": self.official_domain,
            "list_page_url": self.list_page_url,
            "document_type_scope": self.document_type_scope,
            "crawler_mode": self.crawler_mode,
            "enabled": self.enabled,
            "rate_limit_seconds": self.rate_limit_seconds,
            "last_success_at": self.last_success_at,
        }


SOURCES: dict[str, RegulatorySource] = {
    "PBOC": RegulatorySource(
        source_id="PBOC",
        regulator="中国人民银行",
        official_domain="pbc.gov.cn",
        list_page_url="http://www.pbc.gov.cn/tiaofasi/144941/144957/index.html",
        document_type_scope=DOC_TYPE_KEYWORDS,
        crawler_mode="requests",
    ),
    "NFRA": RegulatorySource(
        source_id="NFRA",
        regulator="国家金融监督管理总局",
        official_domain="nfra.gov.cn",
        list_page_url="https://www.nfra.gov.cn/cn/view/pages/ItemList.html?itemPId=915&itemId=928&itemUrl=zhengwuxinxi/zhengcefagui/ItemListRightList.html&itemName=%E6%94%BF%E7%AD%96%E6%B3%95%E8%A7%84",
        document_type_scope=DOC_TYPE_KEYWORDS,
        crawler_mode="json_api",
    ),
    "CSRC": RegulatorySource(
        source_id="CSRC",
        regulator="中国证券监督管理委员会",
        official_domain="csrc.gov.cn",
        list_page_url="https://www.csrc.gov.cn/csrc/c100039/common_list.shtml",
        document_type_scope=DOC_TYPE_KEYWORDS,
        crawler_mode="requests",
    ),
    "SAFE": RegulatorySource(
        source_id="SAFE",
        regulator="国家外汇管理局",
        official_domain="safe.gov.cn",
        list_page_url="https://www.safe.gov.cn/safe/zcfg/index.html",
        document_type_scope=DOC_TYPE_KEYWORDS,
        crawler_mode="requests",
    ),
}


def list_sources() -> list[dict[str, Any]]:
    return [source.to_dict() for source in SOURCES.values()]


def scan_sources(
    scan_run_id: str,
    source_ids: list[str],
    days: int = 30,
    business_domain: str = "托管业务",
    document_types: list[str] | None = None,
    custody_only: bool = False,
    limit_per_source: int = 5,
) -> dict[str, Any]:
    selected = [SOURCES[source_id] for source_id in source_ids if source_id in SOURCES and SOURCES[source_id].enabled]
    if not selected:
        selected = [source for source in SOURCES.values() if source.enabled]
    run_dir = SNAPSHOT_DIR / scan_run_id
    run_dir.mkdir(parents=True, exist_ok=True)
    result = {
        "scan_run_id": scan_run_id,
        "started_at": now_iso(),
        "completed_at": "",
        "status": "running",
        "source_results": [],
        "source_diagnostics": [],
        "documents": [],
        "logs": [],
        "summary": {
            "official_raw_candidates": 0,
            "date_filtered": 0,
            "document_type_filtered": 0,
            "custody_filter_before": 0,
            "custody_filter_after": 0,
            "dedupe_count": 0,
            "discovered": 0,
            "new": 0,
            "deduplicated": 0,
            "detail_fetch_success": 0,
            "text_success": 0,
            "attachment_success": 0,
        },
    }
    seen: set[str] = set()
    for source in selected:
        source_result = {"source_id": source.source_id, "status": "running", "discovered": 0, "errors": []}
        diagnosis = build_source_diagnosis(source)
        try:
            candidates, list_meta = discover_source_candidates(source, days, document_types, diagnosis)
            source_result["discovered"] = len(candidates)
            result["summary"]["discovered"] += len(candidates)
            result["summary"]["official_raw_candidates"] += diagnosis["raw_candidate_count"]
            result["summary"]["date_filtered"] += diagnosis["date_filter_count"]
            result["summary"]["document_type_filtered"] += diagnosis["document_type_filter_count"]
            result["summary"]["dedupe_count"] += diagnosis["dedupe_count"]
            for candidate in candidates[:limit_per_source]:
                time.sleep(source.rate_limit_seconds)
                document = fetch_document(scan_run_id, source, candidate, business_domain)
                if document["fetch_status"] == "detail_fetched":
                    diagnosis["detail_fetch_success_count"] += 1
                    result["summary"]["detail_fetch_success"] += 1
                dedupe_key = document["official_url"] or document["content_hash"] or document["title"]
                if dedupe_key in seen:
                    result["summary"]["deduplicated"] += 1
                    continue
                seen.add(dedupe_key)
                result["summary"]["custody_filter_before"] += 1
                diagnosis["custody_filter_before_count"] = diagnosis.get("custody_filter_before_count", 0) + 1
                is_custody_relevant = document.get("custody_relevance") in CUSTODY_RELEVANCE_LEVELS
                if is_custody_relevant:
                    result["summary"]["custody_filter_after"] += 1
                    diagnosis["custody_filter_count"] += 1
                if custody_only and not is_custody_relevant:
                    continue
                result["documents"].append(document)
                result["summary"]["new"] += 1
                if document["parse_status"] == "parsed":
                    diagnosis["body_parse_success_count"] = diagnosis.get("body_parse_success_count", 0) + 1
                    result["summary"]["text_success"] += 1
                if document.get("attachments"):
                    diagnosis["attachment_download_success_count"] = diagnosis.get("attachment_download_success_count", 0) + len(document.get("attachments") or [])
                    result["summary"]["attachment_success"] += len(document.get("attachments") or [])
            source_result["status"] = "success"
            source_result["last_success_at"] = now_iso()
            result["logs"].append({"source_id": source.source_id, "event": "list_page_fetched", "meta": list_meta})
        except Exception as error:
            source_result["status"] = "failed"
            source_result["errors"].append(str(error))
            diagnosis["errors"].append(str(error))
            result["logs"].append({"source_id": source.source_id, "event": "source_failed", "error": str(error)})
        if diagnosis["raw_candidate_count"] == 0 and not diagnosis["errors"]:
            diagnosis["warnings"].append("列表页/接口可访问，但未解析到官方候选文件，请检查栏目 URL、动态渲染或 parser。")
        result["source_results"].append(source_result)
        result["source_diagnostics"].append(diagnosis)
    failed = [item for item in result["source_results"] if item["status"] == "failed"]
    total_raw = sum(item.get("raw_candidate_count", 0) for item in result["source_diagnostics"])
    total_docs = len(result["documents"])
    if len(failed) == len(result["source_results"]):
        result["status"] = "failed"
    elif failed:
        result["status"] = "partial_failed"
    elif total_docs > 0:
        result["status"] = "completed_with_results"
    elif total_raw == 0:
        result["status"] = "completed_empty"
        result["empty_reason"] = "未发现候选文件，需查看来源诊断"
    else:
        result["status"] = "review_required"
        result["empty_reason"] = "官方候选存在，但筛选、去重或详情抓取后无可展示文件"
    result["completed_at"] = now_iso()
    return result


def build_source_diagnosis(source: RegulatorySource) -> dict[str, Any]:
    return {
        "source_id": source.source_id,
        "regulator": source.regulator,
        "list_page_url": source.list_page_url,
        "crawler_mode": source.crawler_mode,
        "request_url": source.list_page_url,
        "final_url": "",
        "http_status": None,
        "content_type": "",
        "response_bytes": 0,
        "page_title": "",
        "raw_candidate_count": 0,
        "date_filter_count": 0,
        "document_type_filter_count": 0,
        "custody_filter_before_count": 0,
        "custody_filter_count": 0,
        "dedupe_count": 0,
        "dedupe_removed_count": 0,
        "detail_fetch_success_count": 0,
        "body_parse_success_count": 0,
        "attachment_download_success_count": 0,
        "errors": [],
        "warnings": [],
    }


def discover_source_candidates(
    source: RegulatorySource,
    days: int,
    document_types: list[str] | None,
    diagnosis: dict[str, Any],
) -> tuple[list[dict[str, str]], dict[str, Any]]:
    if source.source_id == "NFRA":
        return discover_nfra_candidates(source, days, document_types, diagnosis)
    page_html, list_meta = fetch_url(source.list_page_url, source.official_domain)
    apply_fetch_meta(diagnosis, list_meta)
    diagnosis["page_title"] = extract_title(page_html)
    candidates = discover_candidates(page_html, source, days, document_types, diagnosis)
    if source.source_id == "CSRC" and "政策解读" not in diagnosis["page_title"]:
        diagnosis["warnings"].append("当前页面标题不是“政策解读”，请人工确认 CSRC 栏目 URL。")
    if source.source_id == "NFRA" and "ng-controller" in page_html:
        diagnosis["warnings"].append("页面为 Angular 空壳，需使用 JSON API 或 browser fallback。")
    return candidates, list_meta


def discover_nfra_candidates(
    source: RegulatorySource,
    days: int,
    document_types: list[str] | None,
    diagnosis: dict[str, Any],
) -> tuple[list[dict[str, str]], dict[str, Any]]:
    params = {"itemId": "928", "pageSize": "18", "pageIndex": "1"}
    request_url = "https://www.nfra.gov.cn/cbircweb/DocInfo/SelectDocByItemIdAndChild?" + urlencode(params)
    diagnosis["request_url"] = request_url
    raw_json, meta = fetch_url(request_url, source.official_domain)
    apply_fetch_meta(diagnosis, meta)
    diagnosis["page_title"] = "DocInfo/SelectDocByItemIdAndChild"
    payload = json.loads(raw_json)
    rows = ((payload.get("data") or {}).get("rows") or []) if isinstance(payload, dict) else []
    raw_candidates: list[dict[str, str]] = []
    for row in rows:
        doc_id = str(row.get("docId") or "")
        if not doc_id:
            continue
        title = html.unescape(str(row.get("docTitle") or row.get("docSubtitle") or "")).strip()
        if not title:
            continue
        detail_url = (
            "https://www.nfra.gov.cn/cn/view/pages/ItemDetail.html?"
            + urlencode({"docId": doc_id, "itemId": "928", "generaltype": str(row.get("generaltype") or "0")})
        )
        raw_candidates.append(
            {
                "title": title,
                "url": detail_url,
                "publish_date": extract_date(str(row.get("publishDate") or row.get("builddate") or "")),
                "api_url": "https://www.nfra.gov.cn/cbircweb/DocInfo/SelectByDocId?" + urlencode({"docId": doc_id}),
            }
        )
    return filter_candidates(raw_candidates, source, days, document_types, diagnosis), meta


def apply_fetch_meta(diagnosis: dict[str, Any], meta: dict[str, Any]) -> None:
    diagnosis["request_url"] = meta.get("url") or diagnosis.get("request_url") or ""
    diagnosis["final_url"] = meta.get("final_url") or ""
    diagnosis["http_status"] = meta.get("status")
    diagnosis["content_type"] = meta.get("content_type") or ""
    diagnosis["response_bytes"] = meta.get("bytes") or 0


def discover_candidates(
    page_html: str,
    source: RegulatorySource,
    days: int,
    document_types: list[str] | None = None,
    diagnosis: dict[str, Any] | None = None,
) -> list[dict[str, str]]:
    raw_candidates: list[dict[str, str]] = []
    for match in re.finditer(r"<a\b([^>]*)href=[\"']([^\"']+)[\"']([^>]*)>(.*?)</a>", page_html, flags=re.I | re.S):
        attrs = f"{match.group(1)} {match.group(3)}"
        href, raw_title = match.group(2), match.group(4)
        title_attr = re.search(r"\btitle=[\"']([^\"']+)[\"']", attrs, flags=re.I | re.S)
        title = html.unescape(title_attr.group(1)).strip() if title_attr else html_to_text(raw_title)
        if not title or is_navigation_title(title):
            continue
        url = urljoin(source.list_page_url, href)
        if not is_official_url(url, source.official_domain):
            continue
        context = page_html[max(0, match.start() - 180) : match.end() + 180]
        publish_date = extract_date(context)
        raw_candidates.append({"title": title, "url": url, "publish_date": publish_date or ""})
    return filter_candidates(raw_candidates, source, days, document_types, diagnosis)


def filter_candidates(
    raw_candidates: list[dict[str, str]],
    source: RegulatorySource,
    days: int,
    document_types: list[str] | None = None,
    diagnosis: dict[str, Any] | None = None,
) -> list[dict[str, str]]:
    allowed_types = normalize_document_types(document_types or source.document_type_scope)
    date_filtered = [candidate for candidate in raw_candidates if not candidate.get("publish_date") or is_recent(candidate.get("publish_date", ""), days)]
    type_filtered = [candidate for candidate in date_filtered if any(keyword in candidate.get("title", "") for keyword in allowed_types)]
    deduped = dedupe_candidates(type_filtered)
    if diagnosis is not None:
        diagnosis["raw_candidate_count"] = len(raw_candidates)
        diagnosis["date_filter_count"] = len(date_filtered)
        diagnosis["document_type_filter_count"] = len(type_filtered)
        diagnosis["dedupe_count"] = len(deduped)
        diagnosis["dedupe_removed_count"] = len(type_filtered) - len(deduped)
        if raw_candidates and not date_filtered:
            diagnosis["warnings"].append("原始候选存在，但日期筛选后为 0，请检查回溯天数或日期解析。")
        if date_filtered and not type_filtered:
            diagnosis["warnings"].append("日期筛选后存在候选，但文件类型关键词筛选后为 0。")
    return deduped


def normalize_document_types(document_types: list[str]) -> list[str]:
    expanded: list[str] = []
    for item in document_types:
        expanded.append(item)
        if item == "部门规章":
            expanded.extend(["规章", "令"])
    return expanded


def fetch_document(scan_run_id: str, source: RegulatorySource, candidate: dict[str, str], business_domain: str) -> dict[str, Any]:
    document_id = hashlib.sha256(candidate["url"].encode("utf-8")).hexdigest()[:20]
    fetched_at = now_iso()
    raw_html = ""
    text = ""
    attachments: list[dict[str, str]] = []
    fetch_status = "failed"
    parse_status = "failed"
    error = ""
    snapshot_path = ""
    text_path = ""
    try:
        raw_html, _ = fetch_document_body(source, candidate)
        fetch_status = "detail_fetched"
        text = html_to_text(raw_html)
        attachments = extract_attachments(raw_html, candidate["url"], source.official_domain)
        parse_status = "parsed" if len(text) > 80 else "metadata_only"
        snapshot_dir = SNAPSHOT_DIR / scan_run_id / document_id
        snapshot_dir.mkdir(parents=True, exist_ok=True)
        snapshot_path = str(snapshot_dir / "snapshot.html")
        text_path = str(snapshot_dir / "parsed.txt")
        Path(snapshot_path).write_text(raw_html, encoding="utf-8", errors="ignore")
        Path(text_path).write_text(text, encoding="utf-8")
    except Exception as exc:
        error = str(exc)
    title = extract_title(raw_html) or candidate["title"]
    body_for_hash = text or title
    content_hash = hashlib.sha256(body_for_hash.encode("utf-8")).hexdigest()
    enrichment = classify_document(source, title, text, candidate["url"], business_domain, parse_status)
    needs_confirmation = bool(enrichment.get("needsHumanConfirmation", True)) or parse_status != "parsed" or bool(error)
    return {
        "document_id": document_id,
        "scan_run_id": scan_run_id,
        "source_id": source.source_id,
        "regulator": source.regulator,
        "source_column": source.list_page_url,
        "official_url": candidate["url"],
        "title": title,
        "doc_number": extract_doc_number(title + "\n" + text),
        "publish_date": candidate.get("publish_date") or extract_date(text),
        "effective_date": extract_effective_date(text),
        "file_type": infer_file_type(title),
        "body_text": text,
        "body_summary": enrichment.get("summary", "") or text[:260],
        "attachments": attachments,
        "content_hash": content_hash,
        "fetched_at": fetched_at,
        "fetch_status": fetch_status,
        "parse_status": parse_status,
        "crawler_mode": source.crawler_mode,
        "snapshot_path": snapshot_path,
        "text_path": text_path,
        "error": error,
        "business_category": enrichment.get("businessCategory", "其他"),
        "custody_relevance": enrichment.get("custodyRelevance", "unknown"),
        "impact_level": enrichment.get("impactLevel", "unknown"),
        "applicable_institutions": enrichment.get("applicableInstitutions", []),
        "needs_human_confirmation": needs_confirmation,
        "classification_reason": enrichment.get("reason", ""),
    }


def fetch_document_body(source: RegulatorySource, candidate: dict[str, str]) -> tuple[str, dict[str, Any]]:
    if source.source_id != "NFRA" or not candidate.get("api_url"):
        return fetch_url(candidate["url"], source.official_domain)
    raw_json, meta = fetch_url(candidate["api_url"], source.official_domain)
    payload = json.loads(raw_json)
    data = payload.get("data") or {}
    body_parts = [
        str(data.get("docTitle") or data.get("docSubtitle") or candidate.get("title") or ""),
        str(data.get("documentNo") or ""),
        str(data.get("publishDate") or candidate.get("publish_date") or ""),
        str(data.get("docClob") or ""),
    ]
    for attachment in data.get("attachmentInfoVOList") or []:
        body_parts.append(str(attachment.get("title") or ""))
        body_parts.append(str(attachment.get("urlOtherName") or ""))
    return "\n".join(body_parts), meta


def classify_document(
    source: RegulatorySource,
    title: str,
    text: str,
    url: str,
    business_domain: str,
    parse_status: str,
) -> dict[str, Any]:
    if not get_config().configured:
        return {"businessCategory": "其他", "custodyRelevance": "unknown", "impactLevel": "unknown", "summary": "", "needsHumanConfirmation": True, "reason": "LLM 未配置"}
    prompt_path = ROOT / "skills_runtime" / "prompts" / "regulatory_scanner.md"
    payload = {
        "sourceId": source.source_id,
        "regulator": source.regulator,
        "officialUrl": url,
        "businessDomain": business_domain,
        "title": title,
        "parseStatus": parse_status,
        "text": text[:6000],
    }
    try:
        return LLMClient().chat_json(prompt_path.read_text(encoding="utf-8"), payload)
    except Exception as error:
        return {"businessCategory": "其他", "custodyRelevance": "unknown", "impactLevel": "unknown", "summary": "", "needsHumanConfirmation": True, "reason": f"模型分类失败：{error}"}


def fetch_url(url: str, official_domain: str, timeout: int = 12) -> tuple[str, dict[str, Any]]:
    if not is_official_url(url, official_domain):
        raise ValueError(f"非官方域名，已拒绝抓取：{url}")
    request = Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 CompliancePlatform-RegulatoryScanner/1.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    try:
        with urlopen(request, timeout=timeout, context=ssl_context()) as response:
            raw = response.read()
            final_url = response.geturl()
            status = response.status
            content_type = response.headers.get("Content-Type", "")
    except HTTPError as error:
        raise RuntimeError(f"HTTP {error.code}: {url}") from error
    except URLError as error:
        raise RuntimeError(f"连接失败：{error.reason}") from error
    text = decode_bytes(raw)
    return text, {"url": url, "final_url": final_url, "status": status, "content_type": content_type, "bytes": len(raw)}


def ssl_context() -> ssl.SSLContext:
    try:
        import certifi  # type: ignore

        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()


def decode_bytes(raw: bytes) -> str:
    for encoding in ("utf-8", "utf-8-sig", "gb18030", "big5"):
        try:
            return raw.decode(encoding)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="ignore")


def html_to_text(raw_html: str) -> str:
    raw_html = re.sub(r"(?is)<script.*?</script>|<style.*?</style>", " ", raw_html)
    raw_html = re.sub(r"(?is)<br\s*/?>", "\n", raw_html)
    raw_html = re.sub(r"(?is)</p>|</div>|</li>|</tr>", "\n", raw_html)
    raw_html = re.sub(r"(?is)<[^>]+>", " ", raw_html)
    return html.unescape(re.sub(r"[ \t\r\f\v]+", " ", raw_html)).strip()


def is_official_url(url: str, official_domain: str) -> bool:
    host = urlparse(url).netloc.lower()
    return host == official_domain or host.endswith("." + official_domain)


def is_navigation_title(title: str) -> bool:
    nav = {"首页", "上一页", "下一页", "尾页", "更多", "返回", "打印", "关闭", "English"}
    return title.strip() in nav or len(title.strip()) < 6


def extract_date(text: str) -> str:
    match = re.search(r"(20\d{2})[年\-/\.](\d{1,2})[月\-/\.](\d{1,2})", text)
    if not match:
        return ""
    return f"{match.group(1)}-{int(match.group(2)):02d}-{int(match.group(3)):02d}"


def extract_effective_date(text: str) -> str:
    match = re.search(r"自(20\d{2}[年\-/\.]\d{1,2}[月\-/\.]\d{1,2}日?)起施行", text)
    return extract_date(match.group(1)) if match else ""


def is_recent(date_value: str, days: int) -> bool:
    if not date_value:
        return True
    try:
        parsed = datetime.fromisoformat(date_value).replace(tzinfo=timezone.utc)
    except ValueError:
        return True
    return parsed >= datetime.now(timezone.utc) - timedelta(days=days)


def extract_attachments(raw_html: str, base_url: str, official_domain: str) -> list[dict[str, str]]:
    attachments: list[dict[str, str]] = []
    for match in re.finditer(r"<a\b[^>]*href=[\"']([^\"']+\.(?:pdf|doc|docx|xls|xlsx|zip))[^\"']*[\"'][^>]*>(.*?)</a>", raw_html, flags=re.I | re.S):
        url = urljoin(base_url, match.group(1))
        if is_official_url(url, official_domain):
            attachments.append({"url": url, "title": html_to_text(match.group(2)) or Path(urlparse(url).path).name})
    return attachments


def extract_title(raw_html: str) -> str:
    for pattern in [r"<title[^>]*>(.*?)</title>", r"<h1[^>]*>(.*?)</h1>"]:
        match = re.search(pattern, raw_html, flags=re.I | re.S)
        if match:
            title = html_to_text(match.group(1))
            title = re.sub(r"[-_].*$", "", title).strip()
            if title:
                return title
    return ""


def extract_doc_number(text: str) -> str:
    patterns = [
        r"[\u4e00-\u9fa5]{1,8}〔20\d{2}〕\s*第?\s*\d+\s*号",
        r"[\u4e00-\u9fa5]{1,8}\[20\d{2}\]\s*\d+\s*号",
        r"公告〔20\d{2}〕\s*第?\s*\d+\s*号",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(0).strip()
    return ""


def infer_file_type(title: str) -> str:
    for keyword in ["公开征求意见", "征求意见稿", "规章", "规范性文件", "公告", "办法", "通知", "监管规则"]:
        if keyword in title:
            return keyword
    return "待识别"


def dedupe_candidates(candidates: list[dict[str, str]]) -> list[dict[str, str]]:
    seen: set[str] = set()
    unique: list[dict[str, str]] = []
    for candidate in candidates:
        key = candidate.get("url") or candidate.get("title", "")
        if key in seen:
            continue
        seen.add(key)
        unique.append(candidate)
    return unique
