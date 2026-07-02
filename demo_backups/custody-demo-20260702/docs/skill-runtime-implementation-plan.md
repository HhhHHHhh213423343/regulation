# Skill Runtime 技术实施方案

## 1. 目标与边界

本方案目标是把 `docs` 中已有的五个 Word Skill 文档转化为项目中的可执行 Skill 能力。Word Skill 文档仍然是专业逻辑、业务方法论、输入输出规范和判断口径的唯一来源；新增代码只能封装、执行、校验和展示这些规范，不得改变其专业含义。

本轮设计不实现全部五个 Skill，优先为平台建立统一 Runtime，再以“监管解读 / 监管义务拆解”作为第一个 MVP。

明确禁止：

- 修改原始 Skill 文档中的条款分类、映射阈值、Gap 分类、整改口径或报告结构。
- 把普通自由问答、`build_analysis()` 或历史 HTML 报告伪装成专业 Skill。
- 让前端直接调用大模型 API。
- 将 API Key 写入前端、仓库、HTML、日志或结构化输出文件。

## 2. 推荐目录结构

```text
skills_runtime/
  __init__.py
  registry.py
  models.py
  document_parser.py
  clause_splitter.py
  rule_validator.py
  llm_client.py
  storage.py
  review.py
  prompts/
    regulatory_decomposer.md
  runners/
    regulatory_decomposer_runner.py
  report_generators/
    regulatory_decomposer_report.py

skills/
  registry.json
  regulatory-scanner/
    input.schema.json
    output.schema.json
  regulatory-decomposer/
    input.schema.json
    output.schema.json
  regulatory-mapping/
    input.schema.json
    output.schema.json
  regulation-gap-analysis/
    input.schema.json
    output.schema.json
  remediation-implementation/
    input.schema.json
    output.schema.json

data/
  skill_runs/
  structured_outputs/
  skill_artifacts/
  review_records/
```

继续保留当前 `platform_server.py` 架构，不引入 React、Vue、Docker 或大型后端框架。Runtime 以 Python 模块方式接入 `platform_server.py`。

## 3. Skill Registry 结构

`skills/registry.json` 建议作为运行时能力目录。它只引用源文档和执行适配层，不复制或改写专业逻辑。

```json
{
  "version": "0.1.0",
  "skills": [
    {
      "id": "regulatory-decomposer",
      "name": "监管解读",
      "stage": "regulatory_interpretation",
      "sourceDocument": "docs/监管解读(1).docx",
      "sourceOfTruth": true,
      "professionalLogicLocked": true,
      "inputSchema": "skills/regulatory-decomposer/input.schema.json",
      "outputSchema": "skills/regulatory-decomposer/output.schema.json",
      "executionMode": "llm-assisted",
      "runner": "skills_runtime.runners.regulatory_decomposer_runner:run",
      "promptTemplate": "skills_runtime/prompts/regulatory_decomposer.md",
      "reportGenerator": "skills_runtime.report_generators.regulatory_decomposer_report:generate",
      "artifactTypes": ["html", "docx", "json"],
      "requiresApiKey": true,
      "requiresHumanReview": true,
      "status": "planned"
    }
  ]
}
```

### 3.1 五个 Skill 的初始执行状态

| Skill ID | 名称 | 初始执行状态 | MVP 优先级 | 说明 |
|---|---|---|---|---|
| `regulatory-scanner` | 监管识别 | `planned` | 后续 | 可先保留当前轻量抓取，但不能标记为专业 Skill 执行结果 |
| `regulatory-decomposer` | 监管解读 | `planned -> executable-mvp` | 第一优先级 | 先支持上传单文件、条款切分、LLM 五维 JSON 输出 |
| `regulatory-mapping` | 制度映射 | `planned` | 后续 | 涉及 BM25/BGE/阈值/内规 taxonomy，必须按源文档另行实现 |
| `regulation-gap-analysis` | Gap 分析 | `planned` | 后续 | 依赖制度映射输出和人工复核 |
| `remediation-implementation` | 整改落地 | `planned` | 后续 | 依赖 Gap 清单，不能跳步生成 |

### 3.2 执行状态定义

| 状态 | 含义 | 前端表现 | 是否可生成专业结果 |
|---|---|---|---|
| `unavailable` | 只有文档，没有实现计划或配置 | 显示“专业 Skill 执行引擎待接入” | 否 |
| `planned` | 已有技术方案，但未接入 Runner | 显示“设计中 / 待实现” | 否 |
| `engine-not-configured` | Runner 已实现，但缺少 API Key 或必要环境变量 | 显示“执行引擎未配置” | 否 |
| `ready` | Runner、依赖、密钥检查通过 | 执行按钮可点击 | 是 |
| `running` | 正在执行 | 显示进度和运行编号 | 否 |
| `succeeded` | 执行成功且输出通过 Schema 校验 | 展示结构化结果 | 是，但仍需复核 |
| `failed` | 执行失败或输出无效 | 展示错误、日志摘要 | 否 |
| `needs-review` | 输出存在必须复核项 | 显示人工复核任务 | 可展示，但不得标记“已审定” |
| `reviewed` | 人工复核完成 | 显示复核人、时间和结论 | 可作为交付基础 |

## 4. 每个 Skill 的输入与输出概览

| Skill | 输入 | 输出 | 是否必须人工复核 |
|---|---|---|---|
| 监管识别 | 监管来源、时间范围、监管机构、业务领域、外规文件或链接 | 监管文件清单、分类、发布日期、生效日期、影响等级、适用机构、原文链接 | 高影响等级、无效链接、来源不完整项必须复核 |
| 监管解读 | 单份外规文件文本或上传文件、监管识别结果 | 监管意图、监管要求、适用对象、操作要求、检查重点、条款原文摘录 | 所有 LLM 生成的解释性结论必须复核；高风险/禁止性/限制性条款必须重点复核 |
| 制度映射 | 监管义务库、内规制度文件、taxonomy | 外规条款、内规条款、映射摘要、置信度、覆盖矩阵 | 中低置信度、LLM 辅助确认、无匹配条款必须复核 |
| Gap 分析 | 映射结果、内规条文、外规要求 | 合规率、满足度分布、风险分布、Gap 清单、整改建议 | 未满足、部分满足、高风险 Gap 必须复核 |
| 整改落地 | Gap 清单、整改期限、责任部门 | 新增制度、待修订条款、系统改造、控制点、整改时间线、制度草案 | 所有制度草案、控制点、系统改造建议必须复核 |

## 5. 完整执行链路

```text
上传/选择任务
  -> 文件保存与元数据登记
  -> 文件解析
  -> 条款切分
  -> 规则校验与基础标注
  -> LLM 调用
  -> JSON Schema 校验
  -> 结果存储与版本登记
  -> 人工复核任务生成
  -> 前端结构化展示
  -> 用户点击生成报告
  -> HTML / Word / JSON 交付物生成
```

### 5.1 文件解析

由 Python 完成：

- `.txt`：按 UTF-8 优先读取，失败时尝试常见中文编码。
- `.md`：按文本读取，保留标题层级和列表结构。
- `.docx`：使用 `python-docx` 提取段落、标题、表格文本和段落索引。

解析输出必须包含：

```json
{
  "documentId": "",
  "filename": "",
  "fileType": "docx|txt|md",
  "text": "",
  "blocks": [
    {
      "blockId": "B-001",
      "type": "heading|paragraph|table",
      "text": "",
      "position": {
        "paragraphIndex": 0,
        "headingPath": []
      }
    }
  ]
}
```

### 5.2 条款切分

由 Python 规则完成，严格参考 `docs/监管解读(1).docx`：

- 按“第X条”结构拆解为独立条款。
- 合并编号子条目，如（一）（二）（三）。
- 过滤少于 15 字符的碎片。
- 保留条款原文、来源段落、标题路径和字符范围。
- 用关键词标注义务类型：
  - `应当`、`必须`、`须` -> 强制性；
  - `不得`、`禁止`、`严禁` -> 禁止性；
  - `不得超过`、`只能` -> 限制性；
  - 其他按源文档规则标注为授权性、程序性或一般性。

### 5.3 规则校验

由 Python 完成：

- 文件类型和大小校验。
- 文本是否为空。
- 条款数量是否为 0。
- 条款碎片过滤结果是否异常。
- 强制/禁止/限制关键词命中检查。
- LLM 输出是否为合法 JSON。
- LLM 输出是否包含五维结构。
- 每条监管要求是否能回溯到原文摘录。

### 5.4 LLM 调用

由后端 `skills_runtime/llm_client.py` 完成，前端只调用平台 API。

后端从环境变量读取：

- `LLM_PROVIDER`
- `LLM_API_KEY`
- `LLM_BASE_URL`
- `LLM_MODEL`
- `LLM_TIMEOUT_SECONDS`
- `LLM_MAX_OUTPUT_TOKENS`

调用要求：

- API Key 不返回给前端。
- Prompt 模板保存在后端文件中。
- 请求日志不得记录完整 API Key。
- 请求可以记录模型名称、耗时、token 估算、run_id 和错误摘要。
- 输出必须要求 JSON，并进行严格解析和 Schema 校验。

### 5.5 结果存储

建议先使用文件存储，后续再扩展 SQLite 表。

```text
data/skill_runs/<run_id>/input.json
data/skill_runs/<run_id>/parsed_document.json
data/skill_runs/<run_id>/clauses.json
data/skill_runs/<run_id>/llm_request_meta.json
data/skill_runs/<run_id>/output.json
data/skill_runs/<run_id>/review.json
data/skill_artifacts/<run_id>/report.html
data/skill_artifacts/<run_id>/report.docx
data/skill_artifacts/<run_id>/output.json
```

`llm_request_meta.json` 只能保存模型、参数、耗时和错误摘要，不保存 API Key。

### 5.6 人工复核

每次执行默认创建复核记录。人工复核不改变模型原始输出，而是在复核层记录修订意见。

```json
{
  "runId": "",
  "reviewStatus": "pending|in_review|approved|rejected|changes_requested",
  "reviewItems": [
    {
      "targetType": "requirement|intent|operation|inspection_focus",
      "targetId": "",
      "riskLevel": "high|medium|low",
      "reason": "",
      "reviewerComment": "",
      "decision": "pending|accepted|rejected|edited"
    }
  ],
  "reviewer": "",
  "reviewedAt": ""
}
```

必须进入人工复核的结论：

- LLM 生成的监管意图、监管趋势、风险关切。
- 所有强制性、禁止性、限制性条款。
- 无明确来源摘录的监管要求。
- 模型置信度低或输出字段缺失的条目。
- 涉及处罚依据、检查重点、时限和适用对象边界的结论。
- 后续制度映射中的中低置信度匹配。
- Gap 分析中的未满足、高风险、混合型分类。
- 整改落地中的制度草案、系统改造和控制点建议。

### 5.7 报告生成

报告生成只发生在用户点击“生成报告”之后。报告内容来自已保存的结构化 JSON 和复核记录，不重新自由生成专业结论。

第一阶段支持：

- JSON：直接导出结构化结果。
- HTML：使用后端模板渲染。
- Word：优先使用 `python-docx` 渲染。

报告必须标注：

- run_id；
- 输入文件名；
- 模型名称；
- 执行时间；
- 输出版本；
- 复核状态；
- “AI 辅助分析，须经合规/法律人员复核”。

## 6. 大模型 API 后端接入方式

### 6.1 平台 API

前端只调用本地平台：

```text
POST /api/skills/regulatory-decomposer/runs
GET  /api/skills/runs/:runId
POST /api/skills/runs/:runId/review
POST /api/skills/runs/:runId/artifacts
GET  /api/skills/runs/:runId/artifacts
```

### 6.2 后端 LLM Client

`llm_client.py` 负责：

- 读取环境变量；
- 判断配置是否完整；
- 组装 provider 请求；
- 调用模型；
- 解析 JSON；
- 统一错误格式。

如果未配置 API Key：

```json
{
  "status": "engine-not-configured",
  "message": "执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY。",
  "canRun": false
}
```

前端必须展示该状态，不能展示演示结论。

## 7. `.env.example` 内容

本轮新增根目录 `.env.example`，只放占位变量，不放真实密钥。建议内容见项目根目录文件。

关键变量：

```text
LLM_PROVIDER=openai-compatible
LLM_API_KEY=replace-with-your-api-key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1
LLM_TIMEOUT_SECONDS=120
LLM_MAX_OUTPUT_TOKENS=12000
```

实际本地配置应复制为 `.env`，并确保 `.env` 不进入版本控制。

## 8. `.gitignore` 密钥保护要求

当前项目根目录尚未发现 `.gitignore`。后续实施前必须新增 `.gitignore`，至少包含：

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

注意：

- `.env.example` 可以提交，因为它只包含占位符。
- `.env`、`.env.local`、任何真实密钥文件不得提交。
- `data/skill_runs/` 可能包含用户上传文件、模型输出和监管文本，应默认不提交。
- 运行日志不得包含 API Key、完整请求 Header 或用户敏感文件全文。

## 9. Mock、历史案例、真实执行结果的区分

| 类型 | 来源 | 前端标签 | 是否可作为新执行结果 | 是否可生成交付物 |
|---|---|---|---|---|
| Mock | 前端/后端手写样例 | `演示数据` | 否 | 否，除非明确标注演示 |
| 历史案例 | 历史 HTML/JSON 抽取 | `历史案例结果` | 否 | 可下载原历史交付物 |
| 真正执行结果 | Skill Runner + 规则 + LLM/API 输出 | `本次执行结果` | 是 | 可基于结构化 JSON 生成 |
| 未配置 | Runner 存在但缺 API Key | `执行引擎未配置` | 否 | 否 |
| 待接入 | 尚未实现 Runner | `专业 Skill 执行引擎待接入` | 否 | 否 |

`build_analysis()` 只能保留为旧演示逻辑，不进入 Skill Runtime，不显示为专业 Skill 输出。

## 10. Python / 规则 / 大模型分工

### 10.1 Python 和规则完成

- 文件上传保存。
- `.docx`、`.txt`、`.md` 文本提取。
- 条款切分。
- 子条目合并。
- 碎片过滤。
- 义务类型初判。
- 12 类监管动词初步抽取。
- JSON Schema 校验。
- 运行记录、版本、复核记录和交付物保存。
- HTML / Word / JSON 报告渲染。

### 10.2 大模型完成

- 监管意图推理：政策背景、监管目标、风险关切、预期效果。
- 条款语义归纳。
- 适用对象归纳。
- 操作要求生成。
- 检查重点生成。
- 对规则抽取结果进行结构化补全。

### 10.3 后续可选 MCP/API 完成

- 北大法网增强：上位法依据、修订历史、监管趋势、司法实践。
- 监管官网实时原文抓取。
- 外部法条检索和案例检索。

## 11. 预计新增和修改的文件

### 11.1 本轮设计新增

- `docs/skill-runtime-implementation-plan.md`
- `docs/regulatory-decomposer-mvp-spec.md`
- `.env.example`
- `docs/api-key-security-guide.md`

### 11.2 后续实施预计新增

- `skills/registry.json`
- `skills/regulatory-decomposer/input.schema.json`
- `skills/regulatory-decomposer/output.schema.json`
- `skills_runtime/registry.py`
- `skills_runtime/models.py`
- `skills_runtime/document_parser.py`
- `skills_runtime/clause_splitter.py`
- `skills_runtime/rule_validator.py`
- `skills_runtime/llm_client.py`
- `skills_runtime/storage.py`
- `skills_runtime/review.py`
- `skills_runtime/prompts/regulatory_decomposer.md`
- `skills_runtime/runners/regulatory_decomposer_runner.py`
- `skills_runtime/report_generators/regulatory_decomposer_report.py`
- `.gitignore`

### 11.3 后续实施预计修改

- `platform_server.py`：增加 Skill Runtime API。
- `app.js`：监管解读 Tab 改为上传、执行、结构化展示、复核和报告生成入口。
- `index.html`：必要时补充上传/结果容器。
- `styles.css`：补充结构化工作台、复核状态和报告交付物样式。
- `README.md`：补充本地 API Key 配置和 Skill Runtime 启动说明。

## 12. 分阶段建议

### Phase A：Runtime 基础

- 新增 Registry、数据模型、文档解析、条款切分、LLM Client 配置检测。
- API Key 未配置时返回 `engine-not-configured`。
- 前端能显示“执行引擎未配置”。

### Phase B：监管解读 MVP

- 支持上传 `.docx`、`.txt`、`.md`。
- 切分条款并调用 LLM。
- 输出五维 JSON。
- 保存 run_id、模型、时间、版本和复核记录。
- 前端结构化展示 JSON。

### Phase C：报告交付

- 用户点击“生成报告”后生成 HTML / Word / JSON。
- 报告只基于结构化结果和复核记录。

### Phase D：其余四个 Skill

- 按源文档逐一实现，不能跨越依赖顺序。
- 制度映射、Gap 分析、整改落地必须等待上游结构化数据稳定后接入。
