# 监管解读 Skill MVP 规格

## 1. MVP 目标

监管解读 MVP 是第一个真实可运行的外规内化 Skill。它严格以 `docs/监管解读(1).docx` 为专业规范，支持用户上传一份外规文件，由后端提取文本、按条款切分、调用大模型 API，并输出五维结构化 JSON。

MVP 不做的事情：

- 不修改 `docs/监管解读(1).docx`。
- 不把历史 HTML 报告嵌入为分析主体。
- 不生成伪造的成功结果。
- 不在前端直接调用模型 API。
- 不实现制度映射、Gap 分析和整改落地。

## 2. 专业规范来源

唯一专业来源：

- `docs/监管解读(1).docx`

MVP 必须保留该文档定义的核心流水线：

1. 文件读取。
2. 法律条文解析。
3. 义务类型标注。
4. 12 类监管动作抽取。
5. 监管意图推理。
6. 适用对象提取。
7. 操作要求生成。
8. 检查重点生成。
9. 五维结构化输出。

北大法网增强和知识图谱构建可作为后续增强项；MVP 先保留字段和状态，不强制实现外部 MCP 检索。

## 3. 用户流程

```text
进入外规内化任务详情
  -> 打开“监管解读”Tab
  -> 上传 .docx / .txt / .md 外规文件
  -> 点击“执行监管解读”
  -> 后端创建 run_id
  -> 后端解析文件并切分条款
  -> 后端调用大模型生成五维 JSON
  -> 前端展示结构化结果
  -> 用户查看原文摘录、模型输出、来源位置、复核状态
  -> 用户可提交复核意见
  -> 用户点击“生成报告”
  -> 后端生成 HTML / Word / JSON 交付物
```

如果模型 API 未配置：

- 上传仍可进行。
- 文件解析和条款切分可以先执行。
- 点击执行时显示“执行引擎未配置”。
- 不展示任何虚假监管解读结论。

## 4. 输入支持

### 4.1 文件类型

| 类型 | MVP 支持方式 |
|---|---|
| `.txt` | UTF-8 优先读取，失败时尝试常见中文编码 |
| `.md` | 文本读取，保留标题和列表结构 |
| `.docx` | 使用 `python-docx` 读取段落、标题和表格文本 |

### 4.2 上传输入模型

```json
{
  "taskId": "PBOC-2026-004-PSBC-CUSTODY",
  "skillId": "regulatory-decomposer",
  "file": {
    "filename": "regulation.docx",
    "contentType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "sizeBytes": 0
  },
  "options": {
    "enablePkulawEnhancement": false,
    "requireHumanReview": true,
    "reportLanguage": "zh-CN"
  }
}
```

## 5. 条款切分规则

MVP 由 Python 规则完成条款切分和基础标注。

### 5.1 切分策略

- 优先识别 `第X条`、`第 X 条`、`第十条`、`第十一条` 等条款标题。
- 对每条条款保留标题路径、段落索引和原文。
- 遇到（一）（二）（三）等编号子条目时合并到所属条款。
- 过滤少于 15 字符的孤立碎片。
- 若全文没有标准条款编号，则按标题和段落块降级切分，并标记 `splitConfidence: "low"`。

### 5.2 基础义务类型

| 规则命中 | 义务类型 |
|---|---|
| `应当`、`必须`、`须` | 强制性 |
| `不得`、`禁止`、`严禁` | 禁止性 |
| `不得超过`、`只能` | 限制性 |
| `可以`、`可`、`授权` | 授权性 |
| `报送`、`备案`、`审批`、`登记` | 程序性 |
| 未明确命中 | 一般性 |

### 5.3 12 类监管动作

必须按源 Skill 文档保留 12 类动作体系：

| 类别 | 动词 |
|---|---|
| 建立/设立 | 建立、设立、成立、组建、构建、搭建 |
| 报送/报告 | 报送、报告、上报、提交、报备、备案 |
| 审批/核准 | 审批、核准、批准、许可、同意 |
| 检查/审计 | 检查、审计、核查、审查、排查、评估 |
| 披露/公开 | 披露、公开、公告、公示、发布 |
| 整改/纠正 | 整改、纠正、改正、限期改正、责令改正 |
| 登记/注册 | 登记、注册、备案登记、信息登记 |
| 监测/预警 | 监测、预警、监控、跟踪、识别 |
| 限制/禁止 | 限制、禁止、停止、暂停、终止 |
| 保存/归档 | 保存、归档、留存、保管、记录 |
| 培训/教育 | 培训、教育、学习、考核 |
| 制定/修订 | 制定、修订、修改、完善、起草 |

## 6. LLM Prompt 设计

Prompt 模板建议放在：

```text
skills_runtime/prompts/regulatory_decomposer.md
```

模板要求：

- 明确声明 `docs/监管解读(1).docx` 是唯一专业规范。
- 输入为文件元数据、条款数组和 Python 规则预标注。
- 输出必须是 JSON，不允许输出 Markdown 正文。
- 必须逐项生成五维结构。
- 每个监管要求必须引用 `clauseId` 和 `originalExcerpt`。
- 不确定时写 `needsReview: true`，不能编造依据。
- 不允许改变源文档定义的义务类型和监管动作口径。

## 7. 结构化输出 JSON

```json
{
  "runId": "RUN-20260624-000001",
  "skillId": "regulatory-decomposer",
  "taskId": "",
  "sourceDocument": {
    "filename": "",
    "fileType": "docx|txt|md",
    "sha256": "",
    "textLength": 0
  },
  "model": {
    "provider": "",
    "name": "",
    "temperature": 0,
    "executedAt": ""
  },
  "clauses": [
    {
      "clauseId": "C-001",
      "clauseRef": "第一条",
      "headingPath": [],
      "originalText": "",
      "position": {
        "paragraphStart": 0,
        "paragraphEnd": 0
      },
      "ruleTags": {
        "obligationType": "强制性|禁止性|限制性|授权性|程序性|一般性",
        "regulatoryActions": []
      },
      "splitConfidence": "high|medium|low"
    }
  ],
  "fiveDimensions": {
    "regulatoryIntent": {
      "policyBackground": "",
      "regulatoryGoal": "",
      "riskConcern": "",
      "expectedEffect": "",
      "upperLevelLawBasis": [],
      "revisionHistory": [],
      "regulatoryTrend": "",
      "judicialPractice": [],
      "sourceClauseIds": [],
      "needsReview": true
    },
    "regulatoryRequirements": [
      {
        "requirementId": "REQ-001",
        "clauseId": "C-001",
        "clauseRef": "",
        "obligationType": "强制性|禁止性|限制性|授权性|程序性|一般性",
        "subject": "",
        "action": "",
        "content": "",
        "deadline": "",
        "originalExcerpt": "",
        "needsReview": true
      }
    ],
    "applicableObjects": {
      "direct": [],
      "indirect": [],
      "exempted": [],
      "sourceClauseIds": [],
      "needsReview": true
    },
    "operationalRequirements": [
      {
        "operationId": "OP-001",
        "requirementId": "REQ-001",
        "steps": [],
        "deadline": "",
        "requiredDocuments": [],
        "sourceClauseIds": [],
        "needsReview": true
      }
    ],
    "inspectionFocus": [
      {
        "focusId": "IF-001",
        "requirementId": "REQ-001",
        "controlPoint": "",
        "violationPattern": "",
        "inspectionMethod": "",
        "penaltyBasis": "",
        "sourceClauseIds": [],
        "needsReview": true
      }
    ]
  },
  "review": {
    "status": "pending",
    "required": true,
    "items": []
  },
  "artifacts": []
}
```

## 8. 后端 API 设计

### 8.1 上传并执行

```text
POST /api/skills/regulatory-decomposer/runs
Content-Type: multipart/form-data
```

响应成功：

```json
{
  "runId": "RUN-20260624-000001",
  "status": "succeeded",
  "outputVersion": 1,
  "resultUrl": "/api/skills/runs/RUN-20260624-000001"
}
```

模型未配置：

```json
{
  "runId": "",
  "status": "engine-not-configured",
  "message": "执行引擎未配置：请在后端环境变量中配置 LLM_API_KEY。",
  "canRun": false
}
```

### 8.2 查看执行结果

```text
GET /api/skills/runs/:runId
```

返回结构化 JSON、运行元数据、复核状态和交付物列表。

### 8.3 保存人工复核

```text
POST /api/skills/runs/:runId/review
```

请求：

```json
{
  "reviewer": "合规复核人",
  "items": [
    {
      "targetId": "REQ-001",
      "decision": "accepted|rejected|edited",
      "comment": ""
    }
  ],
  "status": "approved|changes_requested|rejected"
}
```

### 8.4 生成报告

```text
POST /api/skills/runs/:runId/artifacts
```

请求：

```json
{
  "types": ["html", "docx", "json"]
}
```

## 9. 前端展示设计

监管解读 Tab 不再展示 iframe。建议页面区域：

1. 上传与执行区：
   - 文件选择；
   - 文件类型提示；
   - `执行监管解读`；
   - `生成报告`。
2. 执行状态区：
   - 未配置：`执行引擎未配置`；
   - 运行中：进度与 run_id；
   - 成功：模型、执行时间、输出版本；
   - 失败：错误摘要。
3. 条款原文区：
   - 条款编号；
   - 原文摘录；
   - 来源位置；
   - 规则标注。
4. 五维输出区：
   - 监管意图；
   - 监管要求；
   - 适用对象；
   - 操作要求；
   - 检查重点。
5. 人工复核区：
   - `待复核`、`已确认`、`需修改`；
   - 复核意见；
   - 复核人和时间。
6. 交付物区：
   - HTML；
   - Word；
   - JSON。

## 10. 数据保存要求

每次执行必须保存：

- run_id；
- skill_id；
- task_id；
- 输入文件名；
- 输入文件 hash；
- 解析文本版本；
- 条款切分结果；
- 模型供应商和模型名称；
- 执行开始/结束时间；
- 输出版本；
- 原始结构化 JSON；
- 人工复核记录；
- 报告交付物清单。

## 11. 没有 API Key 时可先实现的能力

不需要 API Key 即可实现：

- 文件上传。
- 文件类型和大小校验。
- `.txt` / `.md` 文本解析。
- `.docx` 解析，前提是本地安装 `python-docx`。
- 条款切分。
- 义务类型规则标注。
- 监管动作关键词初步抽取。
- 执行记录创建。
- 前端展示“执行引擎未配置”。

需要 API Key 才能实现：

- 五维监管意图和要求生成。
- 操作要求生成。
- 检查重点生成。
- 完整结构化监管解读 JSON。
- 基于模型结果的正式报告。

## 12. 验收标准

### 12.1 API 未配置

- 上传文件后，系统能显示文件已解析和条款数量。
- 点击执行时显示“执行引擎未配置”。
- 页面不出现模型生成的监管解读结论。

### 12.2 API 已配置

- 上传 `.docx`、`.txt` 或 `.md` 后可执行监管解读。
- 执行完成后展示 run_id、模型名、执行时间、输出版本。
- 页面展示五维结构化结果。
- 每个监管要求能看到条款原文摘录和来源位置。
- 所有模型生成结论默认显示“待复核”。
- 点击“生成报告”后出现 HTML / Word / JSON 交付物。

## 13. 后续增强

- 接入北大法网 MCP，补齐上位法依据、修订历史和案例映射。
- 增加长文分片和多轮合并。
- 增加输出一致性检查。
- 增加人工复核后的“审定版”输出。
- 将监管解读输出作为制度映射的上游输入。
