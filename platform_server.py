from __future__ import annotations

import hashlib
import html
import json
import os
import re
import shutil
import ssl
import sqlite3
import subprocess
import threading
import time
from cgi import FieldStorage
from datetime import datetime, timedelta, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.error import URLError
from urllib.parse import parse_qs, unquote, urlparse
from urllib.request import Request, urlopen

from skills_runtime.llm_client import health_status, run_smoke_test
from skills_runtime.regulatory_scanner import list_sources as list_regulatory_sources
from skills_runtime.regulatory_scanner import scan_sources as scan_regulatory_sources_v1
from skills_runtime.registry import list_skills
from skills_runtime.run_manager import load_run
from skills_runtime.runners.regulatory_decomposer_runner import run as run_regulatory_decomposer
from skills_runtime.runners.regulatory_mapping_runner import run as run_regulatory_mapping
from skills_runtime.runners.regulation_gap_analysis_runner import run as run_regulation_gap_analysis
from skills_runtime.runners.remediation_implementation_runner import run as run_remediation
from skills_runtime.runners._common import latest_run_for
from skills_runtime import artifact_builder


ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "data" / "platform.db"
UPLOAD_DIR = ROOT / "uploads"
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT") or os.getenv("COMPLIANCE_PLATFORM_PORT", "8766"))
DILIGENCE_PORT = int(os.getenv("DILIGENCE_DEMO_PORT", "8767"))
DILIGENCE_ROOT = Path("/Users/hanshuting/Desktop/dtt工作/尽职调查")
DILIGENCE_SERVER = DILIGENCE_ROOT / "due_diligence_assistant_demo" / "server.py"
DILIGENCE_PROCESS: subprocess.Popen | None = None
LLM_LAST_TEST_STATUS: dict[str, Any] = {"status": "not_run"}

REGULATOR_SOURCES = [
    {
        "source": "PBOC",
        "regulator": "中国人民银行",
        "url": "http://www.pbc.gov.cn/tiaofasi/144941/144957/index.html",
        "keywords": ["令", "公告", "通知", "办法", "规定"],
    },
    {
        "source": "NFRA",
        "regulator": "国家金融监督管理总局",
        "url": "https://www.nfra.gov.cn/cn/view/pages/ItemList.html?itemPId=915&itemId=928",
        "keywords": ["令", "办法", "通知", "监管", "托管"],
    },
    {
        "source": "SAFE",
        "regulator": "国家外汇管理局",
        "url": "https://www.safe.gov.cn/safe/zcfg/index.html",
        "keywords": ["通知", "汇发", "外汇", "办法", "规定"],
    },
    {
        "source": "CSRC",
        "regulator": "中国证监会",
        "url": "http://www.csrc.gov.cn/csrc/c100028/common_list.shtml",
        "keywords": ["公告", "办法", "规定", "指引", "托管"],
    },
    {
        "source": "HKMA",
        "regulator": "香港金融管理局",
        "url": "https://www.hkma.gov.hk/chi/news-and-media/press-releases/",
        "keywords": ["监管", "通告", "规则", "指引", "咨询", "政策"],
    },
]

SAMPLE_CASE = {
    "case_id": "PBOC-2026-004-PSBC-CUSTODY",
    "title": "PBOC令〔2026〕第4号",
    "regulator": "中国人民银行",
    "source": "PBOC",
    "publish_date": "2026-05-26",
    "effective_date": "2026-07-01",
    "category": "金融法治 · 消费者保护",
    "risk_level": "极重",
    "url": "https://jrj.sh.gov.cn/ZXYW178/20260526/4839131f4d5142978f0712db05f0fb2e.html",
    "summary": "银行间债券市场制度修订，引入债券中央存管机构双主体制度，触发制度映射、Gap分析和整改落地。",
    "content": "中国人民银行关于修改部分规章的决定。核心涉及债券中央存管机构、登记托管、信息报送与披露、资金清算、数据安全等事项。",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def connect_db() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with connect_db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS regulatory_cases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                case_id TEXT NOT NULL UNIQUE,
                title TEXT NOT NULL,
                regulator TEXT,
                source TEXT,
                publish_date TEXT,
                effective_date TEXT,
                category TEXT,
                risk_level TEXT,
                url TEXT,
                summary TEXT,
                content TEXT,
                analysis_status TEXT NOT NULL DEFAULT 'pending',
                analysis_json TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS regulatory_scrape_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                started_at TEXT NOT NULL,
                finished_at TEXT,
                status TEXT NOT NULL,
                days INTEGER NOT NULL,
                inserted_count INTEGER NOT NULL DEFAULT 0,
                updated_count INTEGER NOT NULL DEFAULT 0,
                error TEXT
            );

            CREATE TABLE IF NOT EXISTS regulatory_uploads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kind TEXT NOT NULL,
                filename TEXT NOT NULL,
                stored_path TEXT NOT NULL,
                size_bytes INTEGER NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS skill_runs (
                run_id TEXT PRIMARY KEY,
                task_id TEXT NOT NULL,
                skill_id TEXT NOT NULL,
                execution_mode TEXT NOT NULL,
                status TEXT NOT NULL,
                model TEXT,
                prompt_version TEXT,
                input_refs_json TEXT,
                output_path TEXT,
                review_required INTEGER NOT NULL DEFAULT 1,
                warnings_json TEXT,
                created_at TEXT NOT NULL,
                completed_at TEXT
            );

            CREATE TABLE IF NOT EXISTS regulatory_sources (
                source_id TEXT PRIMARY KEY,
                regulator TEXT NOT NULL,
                official_domain TEXT NOT NULL,
                list_page_url TEXT NOT NULL,
                document_type_scope_json TEXT,
                crawler_mode TEXT NOT NULL,
                enabled INTEGER NOT NULL DEFAULT 1,
                rate_limit_seconds REAL NOT NULL DEFAULT 2,
                last_success_at TEXT
            );

            CREATE TABLE IF NOT EXISTS regulatory_scan_runs (
                scan_run_id TEXT PRIMARY KEY,
                started_at TEXT NOT NULL,
                completed_at TEXT,
                status TEXT NOT NULL,
                source_ids_json TEXT,
                filters_json TEXT,
                discovered_count INTEGER NOT NULL DEFAULT 0,
                new_count INTEGER NOT NULL DEFAULT 0,
                deduplicated_count INTEGER NOT NULL DEFAULT 0,
                text_success_count INTEGER NOT NULL DEFAULT 0,
                attachment_success_count INTEGER NOT NULL DEFAULT 0,
                error_json TEXT
            );

            CREATE TABLE IF NOT EXISTS regulatory_scan_source_diagnostics (
                scan_run_id TEXT NOT NULL,
                source_id TEXT NOT NULL,
                regulator TEXT,
                list_page_url TEXT,
                crawler_mode TEXT,
                request_url TEXT,
                final_url TEXT,
                http_status INTEGER,
                content_type TEXT,
                response_bytes INTEGER NOT NULL DEFAULT 0,
                page_title TEXT,
                raw_candidate_count INTEGER NOT NULL DEFAULT 0,
                date_filter_count INTEGER NOT NULL DEFAULT 0,
                document_type_filter_count INTEGER NOT NULL DEFAULT 0,
                custody_filter_before_count INTEGER NOT NULL DEFAULT 0,
                custody_filter_count INTEGER NOT NULL DEFAULT 0,
                dedupe_count INTEGER NOT NULL DEFAULT 0,
                dedupe_removed_count INTEGER NOT NULL DEFAULT 0,
                detail_fetch_success_count INTEGER NOT NULL DEFAULT 0,
                body_parse_success_count INTEGER NOT NULL DEFAULT 0,
                attachment_download_success_count INTEGER NOT NULL DEFAULT 0,
                errors_json TEXT,
                warnings_json TEXT,
                created_at TEXT NOT NULL,
                PRIMARY KEY (scan_run_id, source_id)
            );

            CREATE TABLE IF NOT EXISTS regulatory_documents (
                document_id TEXT PRIMARY KEY,
                scan_run_id TEXT,
                source_id TEXT,
                regulator TEXT,
                source_column TEXT,
                official_url TEXT NOT NULL,
                title TEXT NOT NULL,
                doc_number TEXT,
                publish_date TEXT,
                effective_date TEXT,
                file_type TEXT,
                body_summary TEXT,
                content_hash TEXT,
                fetched_at TEXT,
                fetch_status TEXT,
                parse_status TEXT,
                crawler_mode TEXT,
                snapshot_path TEXT,
                text_path TEXT,
                business_category TEXT,
                custody_relevance TEXT,
                impact_level TEXT,
                applicable_institutions_json TEXT,
                needs_human_confirmation INTEGER NOT NULL DEFAULT 1,
                classification_reason TEXT,
                error TEXT,
                is_task_created INTEGER NOT NULL DEFAULT 0,
                case_id TEXT
            );

            CREATE TABLE IF NOT EXISTS regulatory_document_snapshots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                document_id TEXT NOT NULL,
                snapshot_path TEXT,
                text_path TEXT,
                content_hash TEXT,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS regulatory_fetch_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                scan_run_id TEXT,
                source_id TEXT,
                document_id TEXT,
                event TEXT NOT NULL,
                status TEXT,
                message TEXT,
                created_at TEXT NOT NULL
            );
            """
        )
        ensure_scan_run_columns(conn)
        seed_regulatory_sources(conn)
        upsert_case(conn, SAMPLE_CASE, analysis_status="analyzed", analysis_json=build_analysis(SAMPLE_CASE))
        prune_low_quality_cases(conn)


def ensure_scan_run_columns(conn: sqlite3.Connection) -> None:
    existing = {row["name"] for row in conn.execute("PRAGMA table_info(regulatory_scan_runs)").fetchall()}
    columns = {
        "official_raw_candidate_count": "INTEGER NOT NULL DEFAULT 0",
        "date_filter_count": "INTEGER NOT NULL DEFAULT 0",
        "document_type_filter_count": "INTEGER NOT NULL DEFAULT 0",
        "custody_filter_before_count": "INTEGER NOT NULL DEFAULT 0",
        "custody_filter_after_count": "INTEGER NOT NULL DEFAULT 0",
        "dedupe_candidate_count": "INTEGER NOT NULL DEFAULT 0",
        "detail_fetch_success_count": "INTEGER NOT NULL DEFAULT 0",
    }
    for name, definition in columns.items():
        if name not in existing:
            conn.execute(f"ALTER TABLE regulatory_scan_runs ADD COLUMN {name} {definition}")


def row_to_case(row: sqlite3.Row) -> dict[str, Any]:
    data = dict(row)
    data["analysis"] = json.loads(data.pop("analysis_json") or "{}")
    return data


def upsert_case(
    conn: sqlite3.Connection,
    case_data: dict[str, Any],
    analysis_status: str = "pending",
    analysis_json: dict[str, Any] | None = None,
) -> str:
    stable_key = case_data.get("url") or f"{case_data.get('source')}:{case_data.get('title')}:{case_data.get('publish_date')}"
    case_id = case_data.get("case_id") or hashlib.sha1(stable_key.encode("utf-8")).hexdigest()[:16]
    timestamp = now_iso()
    existing = conn.execute("SELECT id FROM regulatory_cases WHERE case_id = ?", (case_id,)).fetchone()
    payload = {
        "case_id": case_id,
        "title": case_data.get("title") or "未命名监管文件",
        "regulator": case_data.get("regulator") or "",
        "source": case_data.get("source") or "",
        "publish_date": case_data.get("publish_date") or "",
        "effective_date": case_data.get("effective_date") or "",
        "category": case_data.get("category") or classify_category(case_data),
        "risk_level": case_data.get("risk_level") or classify_risk(case_data),
        "url": case_data.get("url") or "",
        "summary": case_data.get("summary") or summarize_case(case_data),
        "content": case_data.get("content") or "",
        "analysis_status": analysis_status,
        "analysis_json": json.dumps(analysis_json or {}, ensure_ascii=False),
        "updated_at": timestamp,
    }
    if existing:
        conn.execute(
            """
            UPDATE regulatory_cases SET
                title=:title, regulator=:regulator, source=:source, publish_date=:publish_date,
                effective_date=:effective_date, category=:category, risk_level=:risk_level,
                url=:url, summary=:summary, content=:content, analysis_status=:analysis_status,
                analysis_json=:analysis_json, updated_at=:updated_at
            WHERE case_id=:case_id
            """,
            payload,
        )
    else:
        payload["created_at"] = timestamp
        conn.execute(
            """
            INSERT INTO regulatory_cases (
                case_id, title, regulator, source, publish_date, effective_date, category,
                risk_level, url, summary, content, analysis_status, analysis_json,
                created_at, updated_at
            ) VALUES (
                :case_id, :title, :regulator, :source, :publish_date, :effective_date, :category,
                :risk_level, :url, :summary, :content, :analysis_status, :analysis_json,
                :created_at, :updated_at
            )
            """,
            payload,
        )
    return case_id


def prune_low_quality_cases(conn: sqlite3.Connection) -> None:
    conn.execute(
        """
        DELETE FROM regulatory_cases
        WHERE analysis_status = 'pending'
          AND (
            title IN (
              'Hong Kong Monetary Authority 香港金融管理局',
              '香港金融管理局',
              '首页',
              '主页',
              '跳至主要內容',
              '聯絡我們',
              '联系我们',
              '公告信息',
              '资本项目外汇管理',
              '{{x.itemName}}'
            )
            OR title LIKE '中国人民银行 国家发展改革委 金融监管总局%'
            OR url IN ('https://www.hkma.gov.hk/chi', 'https://www.hkma.gov.hk/chi/')
          )
        """
    )


def html_to_text(raw_html: str) -> str:
    raw_html = re.sub(r"(?is)<script.*?</script>|<style.*?</style>", " ", raw_html)
    raw_html = re.sub(r"(?is)<[^>]+>", " ", raw_html)
    return html.unescape(re.sub(r"\s+", " ", raw_html)).strip()


def fetch_url(url: str, timeout: int = 8) -> str:
    request = Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 CompliancePlatform/1.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    try:
        with urlopen(request, timeout=timeout) as response:
            raw = response.read()
    except URLError as error:
        if "CERTIFICATE_VERIFY_FAILED" not in str(error):
            raise
        with urlopen(request, timeout=timeout, context=ssl._create_unverified_context()) as response:
            raw = response.read()
    for encoding in ("utf-8", "gb18030", "big5"):
        try:
            return raw.decode(encoding)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="ignore")


def extract_links(page_html: str, base_url: str) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    link_pattern = re.compile(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', re.I | re.S)
    date_pattern = re.compile(r"(20\d{2}[-年/.]\d{1,2}[-月/.]\d{1,2})")
    for href, label_html in link_pattern.findall(page_html):
        title = html_to_text(label_html)
        if not title or len(title) < 4:
            continue
        if href.startswith("//"):
            href = "https:" + href
        elif href.startswith("/"):
            root_match = re.match(r"^(https?://[^/]+)", base_url)
            href = (root_match.group(1) if root_match else "") + href
        elif not href.startswith("http"):
            href = base_url.rsplit("/", 1)[0] + "/" + href
        near_text = html_to_text(label_html)
        date_match = date_pattern.search(title + " " + near_text + " " + href)
        publish_date = normalize_date(date_match.group(1)) if date_match else ""
        items.append({"title": title[:160], "url": href, "publish_date": publish_date})
    return items


def is_generic_navigation_link(item: dict[str, str]) -> bool:
    title = item.get("title", "").strip()
    url = item.get("url", "")
    generic_titles = {
        "首页",
        "主页",
        "更多",
        "通知公告",
        "新闻发布",
        "Hong Kong Monetary Authority 香港金融管理局",
        "香港金融管理局",
        "跳至主要內容",
        "聯絡我們",
        "联系我们",
    }
    if title in generic_titles:
        return True
    if "{{" in title or "}}" in title:
        return True
    if title in {"公告信息", "资本项目外汇管理"}:
        return True
    if title.startswith("中国人民银行 国家发展改革委 金融监管总局"):
        return True
    document_signal = re.search(r"令|公告|通知|办法|规定|指引|通告|征求意见|管理规定|实施细则|规则|政策", title)
    if not document_signal:
        return True
    path = urlparse(url).path.rstrip("/")
    if path in {"", "/chi", "/eng", "/cn"}:
        return True
    if len(title) <= 4 and not re.search(r"令|公告|通知|办法|规定|指引|通告", title):
        return True
    return False


def normalize_date(value: str) -> str:
    match = re.search(r"(20\d{2})[-年/.](\d{1,2})[-月/.](\d{1,2})", value)
    if not match:
        return ""
    return f"{int(match.group(1)):04d}-{int(match.group(2)):02d}-{int(match.group(3)):02d}"


def is_recent(date_value: str, days: int) -> bool:
    if not date_value:
        return True
    try:
        date = datetime.strptime(date_value, "%Y-%m-%d").date()
    except ValueError:
        return True
    return date >= (datetime.now().date() - timedelta(days=days))


def classify_category(case_data: dict[str, Any]) -> str:
    text = f"{case_data.get('title', '')} {case_data.get('content', '')}"
    mapping = [
        ("托管", "托管业务"),
        ("债券", "金融市场"),
        ("数据", "数据治理"),
        ("反洗钱", "反洗钱"),
        ("消费者", "消费者保护"),
        ("资本", "资本管理"),
        ("外汇", "外汇管理"),
        ("信息科技", "信息科技"),
    ]
    for keyword, category in mapping:
        if keyword in text:
            return category
    return "综合监管"


def classify_risk(case_data: dict[str, Any]) -> str:
    text = f"{case_data.get('title', '')} {case_data.get('content', '')}"
    if any(keyword in text for keyword in ["不得", "禁止", "处罚", "责令", "整改", "风险准备金", "托管"]):
        return "高"
    if any(keyword in text for keyword in ["应当", "必须", "报告", "报送", "管理办法"]):
        return "中"
    return "低"


def summarize_case(case_data: dict[str, Any]) -> str:
    content = case_data.get("content") or case_data.get("title") or ""
    text = html_to_text(content)
    return (text[:180] + "…") if len(text) > 180 else text


def build_analysis(case_data: dict[str, Any]) -> dict[str, Any]:
    text = f"{case_data.get('title', '')} {case_data.get('summary', '')} {case_data.get('content', '')}"
    obligations = []
    patterns = [
        ("M-001", "报送", "相关机构应按监管要求完成报送、报告或信息披露。"),
        ("M-002", "建立", "应建立与监管要求相匹配的制度、流程和内部控制。"),
        ("M-003", "监测", "应持续监测业务运行、风险事件和数据质量。"),
        ("P-001", "禁止", "不得违反监管禁止性要求或突破职责边界。"),
    ]
    for obligation_id, action, fallback in patterns:
        if action in text or obligation_id.startswith(("M", "P")):
            obligations.append(
                {
                    "id": obligation_id,
                    "type": "强制性" if obligation_id.startswith("M") else "禁止性",
                    "action": action,
                    "requirement": fallback,
                }
            )
    return {
        "steps": [
            {"step_id": "identify", "status": "done", "kpis": ["1份外规", classify_risk(case_data) + "风险", "已入库"]},
            {"step_id": "decompose", "status": "done", "kpis": [f"{len(obligations)}条要求", "4类动作", "五维输出"]},
            {"step_id": "mapping", "status": "ready", "kpis": ["待选择内规", "可重新分析", "可生成矩阵"]},
            {"step_id": "gap", "status": "ready", "kpis": ["待生成Gap", "风险分级", "分类说明"]},
            {"step_id": "remediation", "status": "ready", "kpis": ["四维整改", "制度草案", "KCP控制点"]},
        ],
        "requirements": obligations,
        "mapping_items": [],
        "gap_items": [],
        "remediation_items": [],
        "generated_at": now_iso(),
    }


def scrape_regulatory_sources(days: int) -> tuple[int, int, list[str]]:
    inserted = 0
    updated = 0
    errors: list[str] = []
    with connect_db() as conn:
        for source in REGULATOR_SOURCES:
            try:
                page_html = fetch_url(source["url"], timeout=7)
                links = extract_links(page_html, source["url"])
                filtered = [
                    item
                    for item in links[:50]
                    if is_recent(item.get("publish_date", ""), days)
                    and any(keyword in item["title"] for keyword in source["keywords"])
                    and not is_generic_navigation_link(item)
                ][:5]
                for item in filtered:
                    content = ""
                    try:
                        content = html_to_text(fetch_url(item["url"], timeout=4))[:5000]
                    except Exception:
                        content = item["title"]
                    content_date_match = re.search(r"(20\d{2}[-年/.]\d{1,2}[-月/.]\d{1,2})", content)
                    publish_date = item.get("publish_date") or (
                        normalize_date(content_date_match.group(1)) if content_date_match else ""
                    )
                    if publish_date and not is_recent(publish_date, days):
                        continue
                    case_data = {
                        "title": item["title"],
                        "regulator": source["regulator"],
                        "source": source["source"],
                        "publish_date": publish_date,
                        "url": item["url"],
                        "content": content,
                    }
                    case_id = hashlib.sha1(item["url"].encode("utf-8")).hexdigest()[:16]
                    existed = conn.execute("SELECT 1 FROM regulatory_cases WHERE case_id = ?", (case_id,)).fetchone()
                    upsert_case(conn, {**case_data, "case_id": case_id})
                    inserted += 0 if existed else 1
                    updated += 1 if existed else 0
            except Exception as error:
                errors.append(f"{source['source']}: {error}")
        if inserted == 0 and updated == 0:
            upsert_case(conn, SAMPLE_CASE, analysis_status="analyzed", analysis_json=build_analysis(SAMPLE_CASE))
            updated += 1
    return inserted, updated, errors


def ensure_diligence_backend() -> None:
    global DILIGENCE_PROCESS
    if DILIGENCE_PROCESS and DILIGENCE_PROCESS.poll() is None:
        return
    if not DILIGENCE_SERVER.exists():
        return
    env = os.environ.copy()
    env["DUE_DILIGENCE_DEMO_PORT"] = str(DILIGENCE_PORT)
    # 尽调子服务 server.py 优先读取 PORT；若继承父进程的 PORT（如预览工具注入的
    # PORT=8770）会与合规平台抢占同一端口。显式覆盖为尽调端口，避免端口冲突。
    env["PORT"] = str(DILIGENCE_PORT)
    env["HOST"] = "127.0.0.1"
    DILIGENCE_PROCESS = subprocess.Popen(
        ["python3", str(DILIGENCE_SERVER)],
        cwd=str(DILIGENCE_ROOT),
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


class PlatformHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        return str(ROOT / unquote(urlparse(path).path).lstrip("/"))

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path
        if path == "/api/health/llm":
            return self.respond_json(health_status(LLM_LAST_TEST_STATUS))
        if path == "/api/skills":
            return self.respond_json({"skills": list_skills()})
        if path == "/api/skills/runs":
            task_id = parse_qs(parsed.query).get("task_id", [""])[0]
            skill_id = parse_qs(parsed.query).get("skill_id", [""])[0]
            return self.respond_json({"runs": list_skill_runs(task_id or None, skill_id or None)})
        if path.startswith("/api/skills/runs/"):
            run_id = unquote(path.rsplit("/", 1)[-1])
            run_data = load_run(run_id)
            if not run_data:
                return self.respond_json({"error": "Skill run not found"}, status=404)
            return self.respond_json(run_data)
        if path == "/api/regulatory/sources":
            return self.respond_json({"sources": list_regulatory_sources()})
        if path == "/api/regulatory/scanner/documents":
            return self.respond_json({"documents": list_regulatory_documents()})
        if path == "/api/regulatory/scanner/runs":
            return self.respond_json({"runs": list_regulatory_scan_runs()})
        if path.startswith("/api/regulatory/scanner/runs/") and path.endswith("/diagnostics"):
            scan_run_id = unquote(path.replace("/api/regulatory/scanner/runs/", "", 1).replace("/diagnostics", ""))
            return self.respond_json({"diagnostics": list_scan_source_diagnostics(scan_run_id)})
        if path.startswith("/api/regulatory/documents/"):
            document_id = unquote(path.rsplit("/", 1)[-1])
            document = get_regulatory_document(document_id)
            if not document:
                return self.respond_json({"error": "Document not found"}, status=404)
            return self.respond_json(document)
        if path == "/api/regulatory/cases":
            return self.respond_json(list_cases())
        if path.startswith("/api/regulatory/cases/"):
            case_id = unquote(path.rsplit("/", 1)[-1])
            case = get_case(case_id)
            if not case:
                return self.respond_json({"error": "Case not found"}, status=404)
            return self.respond_json(case)
        if path == "/api/regulatory/runs":
            return self.respond_json(list_runs())
        if path == "/api/platform/meta":
            return self.respond_json({"diligence_url": f"http://localhost:{PORT}/diligence/index.html"})
        if path.startswith("/api/"):
            return self.proxy_to_diligence("GET")
        app_routes = {"/", "/regulatory", "/diligence", "/monitoring", "/tasks", "/artifacts"}
        if path.rstrip("/") in app_routes:
            self.path = "/index.html"
        elif not (ROOT / path.lstrip("/")).exists():
            self.path = "/index.html"
        return super().do_GET()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path
        if path == "/api/health/llm/smoke":
            return self.handle_llm_smoke()
        if path == "/api/regulatory/scanner/run":
            return self.handle_regulatory_scanner_run()
        if path.startswith("/api/regulatory/documents/") and path.endswith("/create-task"):
            document_id = unquote(path.replace("/api/regulatory/documents/", "", 1).replace("/create-task", ""))
            return self.handle_create_task_from_document(document_id)
        if path.startswith("/api/regulatory/documents/") and path.endswith("/mark-irrelevant"):
            document_id = unquote(path.replace("/api/regulatory/documents/", "", 1).replace("/mark-irrelevant", ""))
            return self.handle_mark_document_irrelevant(document_id)
        if path == "/api/skills/regulatory-decomposer/runs-from-case":
            return self.handle_regulatory_decomposer_run_from_case()
        if path == "/api/skills/regulatory-decomposer/runs":
            return self.handle_regulatory_decomposer_run()
        if path == "/api/skills/regulatory-mapping/runs":
            return self.handle_regulatory_mapping_run()
        if path == "/api/skills/regulation-gap-analysis/runs":
            return self.handle_regulation_gap_analysis_run()
        if path == "/api/skills/remediation-implementation/runs":
            return self.handle_remediation_run()
        if path.startswith("/api/skills/runs/") and path.endswith("/artifacts"):
            run_id = unquote(path.replace("/api/skills/runs/", "", 1).replace("/artifacts", ""))
            return self.handle_skill_artifacts(run_id)
        if path.startswith("/api/skills/runs/") and path.endswith("/review"):
            run_id = unquote(path.replace("/api/skills/runs/", "", 1).replace("/review", ""))
            return self.handle_skill_review(run_id)
        if path == "/api/regulatory/scrape":
            body = self.read_json_body()
            days = max(1, min(int(body.get("days", 7) or 7), 90))
            return self.handle_scrape(days)
        if path.endswith("/reanalyze") and path.startswith("/api/regulatory/cases/"):
            case_id = unquote(path.replace("/api/regulatory/cases/", "", 1).replace("/reanalyze", ""))
            return self.handle_reanalyze(case_id)
        if path == "/api/regulatory/upload":
            kind = parse_qs(parsed.query).get("kind", ["external"])[0]
            return self.handle_upload(kind)
        if path.startswith("/api/"):
            return self.proxy_to_diligence("POST")
        return self.respond_json({"error": "Unsupported POST path"}, status=404)

    def handle_llm_smoke(self) -> None:
        global LLM_LAST_TEST_STATUS
        try:
            result = run_smoke_test()
            LLM_LAST_TEST_STATUS = {"status": "ok", "checked_at": now_iso(), "detail": result}
            return self.respond_json(health_status(LLM_LAST_TEST_STATUS))
        except Exception as error:
            LLM_LAST_TEST_STATUS = {"status": "failed", "checked_at": now_iso(), "error": str(error)}
            return self.respond_json(health_status(LLM_LAST_TEST_STATUS), status=502)

    def handle_regulatory_scanner_run(self) -> None:
        body = self.read_json_body()
        source_ids = body.get("source_ids") or body.get("sources") or ["PBOC", "NFRA", "CSRC", "SAFE"]
        if not isinstance(source_ids, list):
            source_ids = ["PBOC", "NFRA", "CSRC", "SAFE"]
        days = max(1, min(int(body.get("days", 30) or 30), 365))
        business_domain = str(body.get("business_domain") or "托管业务")
        document_types = body.get("document_types") if isinstance(body.get("document_types"), list) else None
        custody_only = bool(body.get("custody_only", False))
        limit_per_source = max(1, min(int(body.get("limit_per_source", 5) or 5), 20))
        scan_run_id = f"SCAN-{time.strftime('%Y%m%d%H%M%S')}-{int(time.time() * 1000) % 1000:03d}"
        started_at = now_iso()
        with connect_db() as conn:
            conn.execute(
                """
                INSERT INTO regulatory_scan_runs (
                    scan_run_id, started_at, status, source_ids_json, filters_json
                ) VALUES (?, ?, ?, ?, ?)
                """,
                (
                    scan_run_id,
                    started_at,
                    "running",
                    json.dumps(source_ids, ensure_ascii=False),
                    json.dumps(
                        {
                            "days": days,
                            "business_domain": business_domain,
                            "document_types": document_types,
                            "custody_only": custody_only,
                            "limit_per_source": limit_per_source,
                        },
                        ensure_ascii=False,
                    ),
                ),
            )
        result = scan_regulatory_sources_v1(
            scan_run_id=scan_run_id,
            source_ids=source_ids,
            days=days,
            business_domain=business_domain,
            document_types=document_types,
            custody_only=custody_only,
            limit_per_source=limit_per_source,
        )
        store_scan_result(result)
        return self.respond_json(result, status=201 if result.get("status") != "failed" else 502)

    def handle_regulatory_decomposer_run(self) -> None:
        form = FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={"REQUEST_METHOD": "POST", "CONTENT_TYPE": self.headers.get("Content-Type", "")},
        )
        file_field = form["file"] if "file" in form else None
        if not isinstance(file_field, FieldStorage):
            return self.respond_json({"error": "Missing file field"}, status=400)
        filename = Path(file_field.filename or "regulation.txt").name
        suffix = Path(filename).suffix.lower()
        if suffix not in {".docx", ".txt", ".md"}:
            return self.respond_json({"error": "仅支持 .docx、.txt、.md 外规文件。"}, status=400)
        incoming_dir = UPLOAD_DIR / "skill-runtime"
        incoming_dir.mkdir(parents=True, exist_ok=True)
        stored_path = incoming_dir / f"{int(time.time())}-{hashlib.sha1(filename.encode()).hexdigest()[:8]}-{filename}"
        with stored_path.open("wb") as output:
            shutil.copyfileobj(file_field.file, output)
        task_id_field = form["task_id"].value if "task_id" in form else ""
        task_id = task_id_field or selected_task_id()
        run_data = run_regulatory_decomposer(task_id=task_id, file_path=stored_path)
        index_skill_run(run_data)
        status_code = 201
        if run_data.get("status") == "engine-not-configured":
            status_code = 503
        elif run_data.get("status") == "failed":
            status_code = 500
        return self.respond_json(run_data, status=status_code)

    def handle_regulatory_decomposer_run_from_case(self) -> None:
        body = self.read_json_body()
        case_id = body.get("case_id") or selected_task_id()
        case = get_case(str(case_id))
        if not case:
            return self.respond_json({"error": "Case not found"}, status=404)
        content = case.get("content") or case.get("summary") or ""
        if len(content.strip()) < 20:
            return self.respond_json({"error": "当前任务没有可用于监管解读的真实抓取文本。"}, status=400)
        incoming_dir = UPLOAD_DIR / "skill-runtime"
        incoming_dir.mkdir(parents=True, exist_ok=True)
        source_file = incoming_dir / f"{case_id}-regulatory-source.txt"
        source_file.write_text(f"{case.get('title', '')}\n{content}", encoding="utf-8")
        run_data = run_regulatory_decomposer(task_id=str(case_id), file_path=source_file)
        index_skill_run(run_data)
        return self.respond_json(run_data, status=201 if run_data.get("status") != "failed" else 500)

    def handle_regulatory_mapping_run(self) -> None:
        form = FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={"REQUEST_METHOD": "POST", "CONTENT_TYPE": self.headers.get("Content-Type", "")},
        )
        task_id = (form["task_id"].value if "task_id" in form else "") or selected_task_id()
        decomposer_run_id = form["decomposer_run_id"].value if "decomposer_run_id" in form else ""
        if not decomposer_run_id:
            decomposer_run_id = latest_run_for(str(task_id), "regulatory-decomposer") or ""
        if not decomposer_run_id:
            return self.respond_json({"error": "缺少上游监管解读运行：请先执行监管解读。"}, status=400)
        file_field = form["file"] if "file" in form else None
        if not isinstance(file_field, FieldStorage):
            return self.respond_json({"error": "缺少内规制度文件（file 字段）。"}, status=400)
        filename = Path(file_field.filename or "internal-policy.txt").name
        if Path(filename).suffix.lower() not in {".docx", ".txt", ".md"}:
            return self.respond_json({"error": "仅支持 .docx、.txt、.md 内规文件。"}, status=400)
        incoming_dir = UPLOAD_DIR / "skill-runtime"
        incoming_dir.mkdir(parents=True, exist_ok=True)
        stored_path = incoming_dir / f"{int(time.time())}-{hashlib.sha1(filename.encode()).hexdigest()[:8]}-{filename}"
        with stored_path.open("wb") as output:
            shutil.copyfileobj(file_field.file, output)
        run_data = run_regulatory_mapping(task_id=str(task_id), decomposer_run_id=decomposer_run_id, internal_file_path=stored_path)
        index_skill_run(run_data)
        return self.respond_json(run_data, status=self._skill_status_code(run_data))

    def handle_regulation_gap_analysis_run(self) -> None:
        body = self.read_json_body()
        task_id = str(body.get("task_id") or selected_task_id())
        decomposer_run_id = body.get("decomposer_run_id") or latest_run_for(task_id, "regulatory-decomposer") or ""
        mapping_run_id = body.get("mapping_run_id") or latest_run_for(task_id, "regulatory-mapping") or ""
        if not decomposer_run_id or not mapping_run_id:
            return self.respond_json({"error": "缺少上游运行：Gap 分析需要监管解读与内规映射的运行结果。"}, status=400)
        run_data = run_regulation_gap_analysis(task_id=task_id, decomposer_run_id=decomposer_run_id, mapping_run_id=mapping_run_id)
        index_skill_run(run_data)
        return self.respond_json(run_data, status=self._skill_status_code(run_data))

    def handle_remediation_run(self) -> None:
        body = self.read_json_body()
        task_id = str(body.get("task_id") or selected_task_id())
        gap_run_id = body.get("gap_run_id") or latest_run_for(task_id, "regulation-gap-analysis") or ""
        if not gap_run_id:
            return self.respond_json({"error": "缺少上游 Gap 分析运行：请先执行 Gap 分析。"}, status=400)
        run_data = run_remediation(task_id=task_id, gap_run_id=gap_run_id)
        index_skill_run(run_data)
        return self.respond_json(run_data, status=self._skill_status_code(run_data))

    def handle_skill_artifacts(self, run_id: str) -> None:
        run_data = load_run(run_id)
        if not run_data:
            return self.respond_json({"error": "Skill run not found"}, status=404)
        body = self.read_json_body()
        types = body.get("types") if isinstance(body.get("types"), list) else ["html", "docx", "xlsx", "json"]
        try:
            artifacts = artifact_builder.generate(run_data, types)
        except Exception as error:
            return self.respond_json({"error": f"交付物生成失败：{error}"}, status=500)
        return self.respond_json({"run_id": run_id, "artifacts": artifacts}, status=201)

    @staticmethod
    def _skill_status_code(run_data: dict[str, Any]) -> int:
        status = run_data.get("status")
        if status == "engine-not-configured":
            return 503
        if status == "failed":
            return 500
        return 201

    def handle_create_task_from_document(self, document_id: str) -> None:
        document = get_regulatory_document(document_id)
        if not document:
            return self.respond_json({"error": "Document not found"}, status=404)
        if not document.get("body_text"):
            document["body_text"] = read_document_text(document)
        case_id = document_id
        case_data = {
            "case_id": case_id,
            "title": document.get("title"),
            "regulator": document.get("regulator"),
            "source": document.get("source_id"),
            "publish_date": document.get("publish_date"),
            "effective_date": document.get("effective_date"),
            "category": document.get("business_category") or "监管识别",
            "risk_level": document.get("impact_level") or "待人工确认",
            "url": document.get("official_url"),
            "summary": document.get("body_summary") or "",
            "content": document.get("body_text") or document.get("body_summary") or "",
        }
        with connect_db() as conn:
            upsert_case(conn, case_data, analysis_status="pending", analysis_json={})
            conn.execute(
                "UPDATE regulatory_documents SET is_task_created=1, case_id=? WHERE document_id=?",
                (case_id, document_id),
            )
        return self.respond_json({"case": get_case(case_id), "document": document}, status=201)

    def handle_mark_document_irrelevant(self, document_id: str) -> None:
        with connect_db() as conn:
            cursor = conn.execute(
                """
                UPDATE regulatory_documents
                SET custody_relevance='low', needs_human_confirmation=0, classification_reason='人工标记不相关'
                WHERE document_id=?
                """,
                (document_id,),
            )
        if cursor.rowcount == 0:
            return self.respond_json({"error": "Document not found"}, status=404)
        return self.respond_json({"document": get_regulatory_document(document_id)}, status=200)

    def handle_skill_review(self, run_id: str) -> None:
        run_data = load_run(run_id)
        if not run_data:
            return self.respond_json({"error": "Skill run not found"}, status=404)
        body = self.read_json_body()
        review = {
            "status": body.get("status") or "in_review",
            "reviewer": body.get("reviewer") or "人工复核人",
            "items": body.get("items") or [],
            "reviewed_at": now_iso(),
        }
        run_path = Path("data") / "skill_runs" / run_id / "review.json"
        run_path.parent.mkdir(parents=True, exist_ok=True)
        run_path.write_text(json.dumps(review, ensure_ascii=False, indent=2), encoding="utf-8")
        run_data.setdefault("structured_result", {}).setdefault("review", {})["status"] = review["status"]
        return self.respond_json({"run_id": run_id, "review": review}, status=201)

    def handle_scrape(self, days: int) -> None:
        started_at = now_iso()
        with connect_db() as conn:
            cursor = conn.execute(
                "INSERT INTO regulatory_scrape_runs (started_at, status, days) VALUES (?, ?, ?)",
                (started_at, "running", days),
            )
            run_id = cursor.lastrowid
        threading.Thread(target=run_scrape_job, args=(run_id, days), daemon=True).start()
        return self.respond_json(
            {
                "run_id": run_id,
                "status": "running",
                "inserted_count": 0,
                "updated_count": 0,
                "errors": [],
                "cases": list_cases(),
            },
            status=202,
        )

    def handle_reanalyze(self, case_id: str) -> None:
        case = get_case(case_id)
        if not case:
            return self.respond_json({"error": "Case not found"}, status=404)
        analysis = build_analysis(case)
        with connect_db() as conn:
            conn.execute(
                "UPDATE regulatory_cases SET analysis_status=?, analysis_json=?, updated_at=? WHERE case_id=?",
                ("analyzed", json.dumps(analysis, ensure_ascii=False), now_iso(), case_id),
            )
        case = get_case(case_id)
        return self.respond_json(case or {}, status=201)

    def handle_upload(self, kind: str) -> None:
        if kind not in {"external", "internal"}:
            return self.respond_json({"error": "Invalid upload kind"}, status=400)
        form = FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={"REQUEST_METHOD": "POST", "CONTENT_TYPE": self.headers.get("Content-Type", "")},
        )
        file_field = form["file"] if "file" in form else None
        if not isinstance(file_field, FieldStorage):
            return self.respond_json({"error": "Missing file field"}, status=400)
        filename = Path(file_field.filename or "upload.bin").name
        stored_name = f"{int(time.time())}-{hashlib.sha1(filename.encode()).hexdigest()[:8]}-{filename}"
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        stored_path = UPLOAD_DIR / stored_name
        with stored_path.open("wb") as output:
            shutil.copyfileobj(file_field.file, output)
        size = stored_path.stat().st_size
        with connect_db() as conn:
            conn.execute(
                """
                INSERT INTO regulatory_uploads (kind, filename, stored_path, size_bytes, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (kind, filename, str(stored_path), size, now_iso()),
            )
        return self.respond_json({"kind": kind, "filename": filename, "size_bytes": size}, status=201)

    def read_json_body(self) -> dict[str, Any]:
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0:
            return {}
        return json.loads(self.rfile.read(length).decode("utf-8") or "{}")

    def respond_json(self, payload: dict[str, Any] | list[Any], status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def proxy_to_diligence(self, method: str) -> None:
        ensure_diligence_backend()
        time.sleep(0.15)
        length = int(self.headers.get("Content-Length", "0") or "0")
        body = self.rfile.read(length) if length else None
        target = f"http://127.0.0.1:{DILIGENCE_PORT}{self.path}"
        headers = {
            key: value
            for key, value in self.headers.items()
            if key.lower() not in {"host", "content-length", "connection", "accept-encoding"}
        }
        request = Request(target, data=body, method=method, headers=headers)
        try:
            with urlopen(request, timeout=60) as response:
                response_body = response.read()
                self.send_response(response.status)
                for key, value in response.headers.items():
                    if key.lower() in {"transfer-encoding", "connection", "server", "date"}:
                        continue
                    self.send_header(key, value)
                self.send_header("Content-Length", str(len(response_body)))
                self.end_headers()
                self.wfile.write(response_body)
        except Exception as error:
            self.respond_json({"error": f"Due diligence backend unavailable: {error}"}, status=502)

    def log_message(self, fmt: str, *args: Any) -> None:
        print(f"[platform] {self.address_string()} - {fmt % args}")


def run_scrape_job(run_id: int, days: int) -> None:
    try:
        inserted, updated, errors = scrape_regulatory_sources(days)
        status = "partial" if errors else "success"
        with connect_db() as conn:
            conn.execute(
                """
                UPDATE regulatory_scrape_runs
                SET finished_at=?, status=?, inserted_count=?, updated_count=?, error=?
                WHERE id=?
                """,
                (now_iso(), status, inserted, updated, "\n".join(errors), run_id),
            )
    except Exception as error:
        with connect_db() as conn:
            conn.execute(
                "UPDATE regulatory_scrape_runs SET finished_at=?, status=?, error=? WHERE id=?",
                (now_iso(), "failed", str(error), run_id),
            )


def list_cases() -> list[dict[str, Any]]:
    with connect_db() as conn:
        rows = conn.execute(
            "SELECT * FROM regulatory_cases ORDER BY COALESCE(publish_date, '') DESC, updated_at DESC"
        ).fetchall()
    return [row_to_case(row) for row in rows]


def get_case(case_id: str) -> dict[str, Any] | None:
    with connect_db() as conn:
        row = conn.execute("SELECT * FROM regulatory_cases WHERE case_id=?", (case_id,)).fetchone()
    return row_to_case(row) if row else None


def list_runs() -> list[dict[str, Any]]:
    with connect_db() as conn:
        rows = conn.execute("SELECT * FROM regulatory_scrape_runs ORDER BY id DESC LIMIT 20").fetchall()
    return [dict(row) for row in rows]


def seed_regulatory_sources(conn: sqlite3.Connection) -> None:
    for source in list_regulatory_sources():
        conn.execute(
            """
            INSERT OR REPLACE INTO regulatory_sources (
                source_id, regulator, official_domain, list_page_url, document_type_scope_json,
                crawler_mode, enabled, rate_limit_seconds, last_success_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT last_success_at FROM regulatory_sources WHERE source_id=?), ''))
            """,
            (
                source["source_id"],
                source["regulator"],
                source["official_domain"],
                source["list_page_url"],
                json.dumps(source["document_type_scope"], ensure_ascii=False),
                source["crawler_mode"],
                1 if source["enabled"] else 0,
                float(source["rate_limit_seconds"]),
                source["source_id"],
            ),
        )


def store_scan_result(result: dict[str, Any]) -> None:
    scan_run_id = result.get("scan_run_id", "")
    summary = result.get("summary") or {}
    with connect_db() as conn:
        conn.execute(
            """
            UPDATE regulatory_scan_runs SET
                completed_at=?, status=?, discovered_count=?, new_count=?, deduplicated_count=?,
                text_success_count=?, attachment_success_count=?, error_json=?,
                official_raw_candidate_count=?, date_filter_count=?, document_type_filter_count=?,
                custody_filter_before_count=?, custody_filter_after_count=?, dedupe_candidate_count=?,
                detail_fetch_success_count=?
            WHERE scan_run_id=?
            """,
            (
                result.get("completed_at") or now_iso(),
                result.get("status") or "completed",
                int(summary.get("discovered") or 0),
                int(summary.get("new") or 0),
                int(summary.get("deduplicated") or 0),
                int(summary.get("text_success") or 0),
                int(summary.get("attachment_success") or 0),
                json.dumps(result.get("source_results") or [], ensure_ascii=False),
                int(summary.get("official_raw_candidates") or 0),
                int(summary.get("date_filtered") or 0),
                int(summary.get("document_type_filtered") or 0),
                int(summary.get("custody_filter_before") or 0),
                int(summary.get("custody_filter_after") or 0),
                int(summary.get("dedupe_count") or 0),
                int(summary.get("detail_fetch_success") or 0),
                scan_run_id,
            ),
        )
        for diagnosis in result.get("source_diagnostics") or []:
            conn.execute(
                """
                INSERT OR REPLACE INTO regulatory_scan_source_diagnostics (
                    scan_run_id, source_id, regulator, list_page_url, crawler_mode, request_url, final_url,
                    http_status, content_type, response_bytes, page_title, raw_candidate_count,
                    date_filter_count, document_type_filter_count, custody_filter_before_count,
                    custody_filter_count, dedupe_count, dedupe_removed_count, detail_fetch_success_count,
                    body_parse_success_count, attachment_download_success_count, errors_json, warnings_json,
                    created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    scan_run_id,
                    diagnosis.get("source_id"),
                    diagnosis.get("regulator"),
                    diagnosis.get("list_page_url"),
                    diagnosis.get("crawler_mode"),
                    diagnosis.get("request_url"),
                    diagnosis.get("final_url"),
                    diagnosis.get("http_status"),
                    diagnosis.get("content_type"),
                    int(diagnosis.get("response_bytes") or 0),
                    diagnosis.get("page_title"),
                    int(diagnosis.get("raw_candidate_count") or 0),
                    int(diagnosis.get("date_filter_count") or 0),
                    int(diagnosis.get("document_type_filter_count") or 0),
                    int(diagnosis.get("custody_filter_before_count") or 0),
                    int(diagnosis.get("custody_filter_count") or 0),
                    int(diagnosis.get("dedupe_count") or 0),
                    int(diagnosis.get("dedupe_removed_count") or 0),
                    int(diagnosis.get("detail_fetch_success_count") or 0),
                    int(diagnosis.get("body_parse_success_count") or 0),
                    int(diagnosis.get("attachment_download_success_count") or 0),
                    json.dumps(diagnosis.get("errors") or [], ensure_ascii=False),
                    json.dumps(diagnosis.get("warnings") or [], ensure_ascii=False),
                    now_iso(),
                ),
            )
        for source_result in result.get("source_results") or []:
            if source_result.get("status") == "success":
                conn.execute(
                    "UPDATE regulatory_sources SET last_success_at=? WHERE source_id=?",
                    (source_result.get("last_success_at") or now_iso(), source_result.get("source_id")),
                )
            for error in source_result.get("errors") or []:
                conn.execute(
                    """
                    INSERT INTO regulatory_fetch_logs (scan_run_id, source_id, event, status, message, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (scan_run_id, source_result.get("source_id"), "source_error", "failed", error, now_iso()),
                )
        for log in result.get("logs") or []:
            conn.execute(
                """
                INSERT INTO regulatory_fetch_logs (scan_run_id, source_id, event, status, message, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    scan_run_id,
                    log.get("source_id"),
                    log.get("event") or "scanner_log",
                    "failed" if log.get("error") else "ok",
                    json.dumps(log, ensure_ascii=False),
                    now_iso(),
                ),
            )
        for doc in result.get("documents") or []:
            conn.execute(
                """
                INSERT OR REPLACE INTO regulatory_documents (
                    document_id, scan_run_id, source_id, regulator, source_column, official_url, title,
                    doc_number, publish_date, effective_date, file_type, body_summary, content_hash,
                    fetched_at, fetch_status, parse_status, crawler_mode, snapshot_path, text_path,
                    business_category, custody_relevance, impact_level, applicable_institutions_json,
                    needs_human_confirmation, classification_reason, error, is_task_created, case_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT is_task_created FROM regulatory_documents WHERE document_id=?), 0), COALESCE((SELECT case_id FROM regulatory_documents WHERE document_id=?), ''))
                """,
                (
                    doc.get("document_id"),
                    scan_run_id,
                    doc.get("source_id"),
                    doc.get("regulator"),
                    doc.get("source_column"),
                    doc.get("official_url"),
                    doc.get("title") or "未命名监管文件",
                    doc.get("doc_number"),
                    doc.get("publish_date"),
                    doc.get("effective_date"),
                    doc.get("file_type"),
                    doc.get("body_summary"),
                    doc.get("content_hash"),
                    doc.get("fetched_at"),
                    doc.get("fetch_status"),
                    doc.get("parse_status"),
                    doc.get("crawler_mode"),
                    doc.get("snapshot_path"),
                    doc.get("text_path"),
                    doc.get("business_category"),
                    doc.get("custody_relevance"),
                    doc.get("impact_level"),
                    json.dumps(doc.get("applicable_institutions") or [], ensure_ascii=False),
                    1 if doc.get("needs_human_confirmation", True) else 0,
                    doc.get("classification_reason"),
                    doc.get("error"),
                    doc.get("document_id"),
                    doc.get("document_id"),
                ),
            )
            conn.execute(
                """
                INSERT INTO regulatory_document_snapshots (
                    document_id, snapshot_path, text_path, content_hash, created_at
                ) VALUES (?, ?, ?, ?, ?)
                """,
                (
                    doc.get("document_id"),
                    doc.get("snapshot_path"),
                    doc.get("text_path"),
                    doc.get("content_hash"),
                    now_iso(),
                ),
            )


def list_regulatory_scan_runs() -> list[dict[str, Any]]:
    with connect_db() as conn:
        rows = conn.execute(
            "SELECT * FROM regulatory_scan_runs ORDER BY started_at DESC LIMIT 20"
        ).fetchall()
    return [dict(row) for row in rows]


def list_scan_source_diagnostics(scan_run_id: str) -> list[dict[str, Any]]:
    with connect_db() as conn:
        rows = conn.execute(
            """
            SELECT * FROM regulatory_scan_source_diagnostics
            WHERE scan_run_id=?
            ORDER BY source_id
            """,
            (scan_run_id,),
        ).fetchall()
    diagnostics = []
    for row in rows:
        data = dict(row)
        data["errors"] = json.loads(data.pop("errors_json") or "[]")
        data["warnings"] = json.loads(data.pop("warnings_json") or "[]")
        diagnostics.append(data)
    return diagnostics


def list_regulatory_documents() -> list[dict[str, Any]]:
    with connect_db() as conn:
        rows = conn.execute(
            """
            SELECT * FROM regulatory_documents
            ORDER BY COALESCE(publish_date, '') DESC, fetched_at DESC
            LIMIT 100
            """
        ).fetchall()
    return [document_row_to_dict(row, include_body=False) for row in rows]


def get_regulatory_document(document_id: str) -> dict[str, Any] | None:
    with connect_db() as conn:
        row = conn.execute("SELECT * FROM regulatory_documents WHERE document_id=?", (document_id,)).fetchone()
    return document_row_to_dict(row, include_body=True) if row else None


def document_row_to_dict(row: sqlite3.Row, include_body: bool = False) -> dict[str, Any]:
    data = dict(row)
    data["applicable_institutions"] = json.loads(data.pop("applicable_institutions_json") or "[]")
    data["needs_human_confirmation"] = bool(data.get("needs_human_confirmation"))
    data["body_text"] = read_document_text(data) if include_body else ""
    data["snapshot_url"] = path_to_public_url(data.get("snapshot_path"))
    data["text_url"] = path_to_public_url(data.get("text_path"))
    return data


def read_document_text(document: dict[str, Any]) -> str:
    text_path = document.get("text_path")
    if not text_path:
        return ""
    path = Path(text_path)
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="ignore")


def path_to_public_url(path_value: str | None) -> str:
    if not path_value:
        return ""
    try:
        path = Path(path_value).resolve()
        relative = path.relative_to(ROOT)
    except Exception:
        return ""
    return "/" + str(relative).replace(os.sep, "/")


def selected_task_id() -> str:
    return SAMPLE_CASE["case_id"]


def list_skill_runs(task_id: str | None = None, skill_id: str | None = None) -> list[dict[str, Any]]:
    query = "SELECT run_id, task_id, skill_id, status, model, prompt_version, review_required, created_at, completed_at FROM skill_runs"
    clauses: list[str] = []
    params: list[Any] = []
    if task_id:
        clauses.append("task_id=?")
        params.append(task_id)
    if skill_id:
        clauses.append("skill_id=?")
        params.append(skill_id)
    if clauses:
        query += " WHERE " + " AND ".join(clauses)
    query += " ORDER BY created_at DESC"
    with connect_db() as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute(query, params).fetchall()
    return [dict(row) for row in rows]


def index_skill_run(run_data: dict[str, Any]) -> None:
    if not run_data or not run_data.get("run_id"):
        return
    output_path = str(ROOT / "data" / "structured_outputs" / f"{run_data['run_id']}.json")
    with connect_db() as conn:
        conn.execute(
            """
            INSERT OR REPLACE INTO skill_runs (
                run_id, task_id, skill_id, execution_mode, status, model, prompt_version,
                input_refs_json, output_path, review_required, warnings_json, created_at, completed_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                run_data.get("run_id"),
                run_data.get("task_id") or "",
                run_data.get("skill_id") or "",
                run_data.get("execution_mode") or "live-script",
                run_data.get("status") or "",
                run_data.get("model") or "",
                run_data.get("prompt_version") or "",
                json.dumps(run_data.get("input_refs") or [], ensure_ascii=False),
                output_path,
                1 if run_data.get("review_required", True) else 0,
                json.dumps(run_data.get("warnings") or [], ensure_ascii=False),
                run_data.get("created_at") or now_iso(),
                run_data.get("completed_at") or "",
            ),
        )


def main() -> None:
    init_db()
    threading.Thread(target=ensure_diligence_backend, daemon=True).start()
    httpd = ThreadingHTTPServer((HOST, PORT), PlatformHandler)
    print(f"Serving compliance platform at http://localhost:{PORT}/")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
