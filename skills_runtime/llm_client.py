from __future__ import annotations

import json
import os
import re
import ssl
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]


def load_env(path: Path | None = None) -> None:
    env_path = path or ROOT / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        clean = line.strip()
        if not clean or clean.startswith("#") or "=" not in clean:
            continue
        key, value = clean.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


@dataclass
class LLMConfig:
    provider: str
    api_key: str
    base_url: str
    model_fast: str
    model_reasoning: str
    timeout_seconds: int
    max_output_tokens: int
    temperature: float

    @property
    def configured(self) -> bool:
        return bool(self.api_key and self.base_url and self.model_fast)

    @property
    def host(self) -> str:
        return urlparse(self.base_url).netloc


def get_config() -> LLMConfig:
    load_env()
    return LLMConfig(
        provider=os.getenv("LLM_PROVIDER", ""),
        api_key=os.getenv("LLM_API_KEY", ""),
        base_url=(os.getenv("LLM_BASE_URL", "") or "").rstrip("/"),
        model_fast=os.getenv("LLM_MODEL_FAST") or os.getenv("LLM_MODEL", ""),
        model_reasoning=os.getenv("LLM_MODEL_REASONING", ""),
        timeout_seconds=int(os.getenv("LLM_TIMEOUT_SECONDS", "120") or "120"),
        max_output_tokens=int(os.getenv("LLM_MAX_OUTPUT_TOKENS", "12000") or "12000"),
        temperature=float(os.getenv("LLM_TEMPERATURE", "0") or "0"),
    )


def health_status(last_test_status: dict[str, Any] | None = None) -> dict[str, Any]:
    config = get_config()
    return {
        "configured": config.configured,
        "provider": config.provider or "unconfigured",
        "model": config.model_fast or "unconfigured",
        "base_url_host": config.host,
        "json_mode_supported": True,
        "last_test_status": last_test_status or {"status": "not_run"},
    }


class LLMClient:
    def __init__(self, config: LLMConfig | None = None):
        self.config = config or get_config()
        if not self.config.configured:
            raise RuntimeError("执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY、LLM_BASE_URL 和 LLM_MODEL_FAST。")

    def chat_json(self, system_prompt: str, user_payload: dict[str, Any], model: str | None = None) -> dict[str, Any]:
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": json.dumps(user_payload, ensure_ascii=False)},
        ]
        content = self._chat(messages, response_format={"type": "json_object"}, model=model)
        return parse_json_content(content)

    def chat_text(self, prompt: str, model: str | None = None) -> str:
        return self._chat([{"role": "user", "content": prompt}], model=model)

    def _chat(
        self,
        messages: list[dict[str, str]],
        response_format: dict[str, str] | None = None,
        model: str | None = None,
    ) -> str:
        url = self._endpoint()
        payload: dict[str, Any] = {
            "model": model or self.config.model_fast,
            "messages": messages,
            "temperature": self.config.temperature,
            "max_tokens": self.config.max_output_tokens,
        }
        if response_format:
            payload["response_format"] = response_format
        request = Request(
            url,
            data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {self.config.api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        started = time.time()
        try:
            with urlopen(request, timeout=self.config.timeout_seconds, context=_ssl_context()) as response:
                data = json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            body = error.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"LLM HTTP {error.code}: {_safe_error(body)}") from error
        except URLError as error:
            raise RuntimeError(f"LLM 连接失败：{error.reason}") from error
        except TimeoutError as error:
            raise RuntimeError("LLM 请求超时。") from error
        if not data.get("choices"):
            raise RuntimeError("LLM 响应缺少 choices。")
        content = data["choices"][0].get("message", {}).get("content", "")
        if not content:
            raise RuntimeError("LLM 响应内容为空。")
        _ = time.time() - started
        return content

    def _endpoint(self) -> str:
        base = self.config.base_url.rstrip("/")
        if base.endswith("/v1"):
            return f"{base}/chat/completions"
        return f"{base}/v1/chat/completions"


def parse_json_content(content: str) -> dict[str, Any]:
    clean = content.strip()
    fenced = re.search(r"```(?:json)?\s*(\{.*\})\s*```", clean, flags=re.S)
    if fenced:
        clean = fenced.group(1)
    try:
        parsed = json.loads(clean)
    except json.JSONDecodeError as error:
        raise RuntimeError(f"模型未返回合法 JSON：{error}") from error
    if not isinstance(parsed, dict):
        raise RuntimeError("模型 JSON 输出必须是对象。")
    return parsed


def run_smoke_test() -> dict[str, Any]:
    client = LLMClient()
    result: dict[str, Any] = {"status": "running", "text_test": {}, "json_test": {}}
    text = client.chat_text("请用一句中文回复：LLM smoke test ok。")
    result["text_test"] = {"status": "ok", "sample": text[:80]}
    json_payload = client.chat_json(
        "你只输出 JSON。输出字段必须包含 ok(boolean) 和 message(string)。",
        {"instruction": "返回 {\"ok\": true, \"message\": \"json ok\"}"},
    )
    result["json_test"] = {"status": "ok", "keys": sorted(json_payload.keys())}
    result["status"] = "ok"
    return result


def _safe_error(body: str) -> str:
    body = re.sub(r"sk-[A-Za-z0-9_-]+", "sk-***", body)
    return body[:600]


def _ssl_context() -> ssl.SSLContext:
    try:
        import certifi  # type: ignore

        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()
