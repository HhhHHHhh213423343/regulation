# API Key 安全配置指南

## 1. 基本原则

API Key 只能由后端读取，不能出现在前端代码、浏览器请求、HTML、日志、结构化输出或报告交付物中。

本项目后续接入大模型时，前端只调用本地 `platform_server.py` 暴露的业务 API，由后端读取环境变量并调用模型服务。

## 2. 本地配置方式

1. 在项目根目录复制示例文件：

```bash
cp .env.example .env
```

2. 编辑 `.env`，填入真实配置：

```text
LLM_PROVIDER=openai-compatible
LLM_API_KEY=你的真实APIKey
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=你确认使用的模型
```

3. 启动平台服务时，后端读取 `.env` 或当前 shell 环境变量。

如果不配置 `LLM_API_KEY`，监管解读 Skill MVP 必须返回：

```text
执行引擎未配置
```

并且不得展示任何虚假的模型分析结果。

## 3. `.gitignore` 要求

当前项目根目录尚未发现 `.gitignore`。后续实施 Skill Runtime 前必须新增 `.gitignore`，至少包含：

```gitignore
.env
.env.*
!.env.example
data/skill_runs/
data/skill_artifacts/
uploads/
__pycache__/
*.pyc
```

说明：

- `.env.example` 可以提交，因为它只包含占位符。
- `.env`、`.env.local`、`.env.production` 等真实配置文件不得提交。
- `data/skill_runs/` 可能保存用户上传文件、监管原文、模型输出和复核记录，默认不得提交。
- `uploads/` 可能包含用户原始文件，默认不得提交。

## 4. 日志与错误处理

后端日志允许记录：

- run_id；
- skill_id；
- 模型名称；
- 请求耗时；
- 输出 token 估算；
- 错误类型；
- 错误摘要。

后端日志禁止记录：

- API Key；
- Authorization Header；
- 完整请求 Header；
- 完整模型请求体；
- 用户上传文件全文；
- 包含敏感内容的完整模型输出。

错误返回给前端时，只返回可理解的业务错误，例如：

```json
{
  "status": "engine-not-configured",
  "message": "执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY。"
}
```

## 5. 前端边界

前端不得：

- 保存 API Key；
- 读取 `.env`；
- 直接请求大模型 API；
- 在 localStorage/sessionStorage 中保存密钥；
- 将模型请求 Prompt、Header 或 Key 展示给用户。

前端可以展示：

- 当前执行状态；
- 模型名称；
- run_id；
- 执行时间；
- 结构化结果；
- 人工复核状态；
- 交付物列表。

## 6. 轮换与撤销

如果怀疑 API Key 泄露：

1. 立即在供应商控制台撤销旧 Key。
2. 本地 `.env` 更换新 Key。
3. 检查项目目录中是否误提交 `.env` 或日志。
4. 清理包含敏感信息的本地日志和临时文件。
5. 如已进入远端仓库，需要按密钥泄露流程处理，不只是在新提交中删除。

## 7. 需要用户提供的信息

实施监管解读 MVP 前，需要确认：

- 使用哪家模型服务；
- API 是否兼容 OpenAI Chat Completions / Responses 格式；
- `LLM_BASE_URL`；
- 模型名称；
- API Key；
- 是否有组织 ID、项目 ID、区域、网关或内网代理要求；
- 是否允许上传监管原文到外部模型服务；
- 单次请求最大 token、费用和并发限制。
