# 外规内化 Skill Runtime 与结构化输出方案

> 本方案用于替代“将历史 HTML 报告 iframe 作为各分析 Tab 主体”的方向。目标是建设真正由既有 Skill 驱动的外规内化工作台：用户上传外规/内规或选择任务后，点击执行分析，由平台调用 Skill 执行引擎生成结构化结果，并在平台页面内展示。HTML、Word、Excel、Markdown、JSON 仅作为交付物、历史样例或下载文件出现。

## 1. Skill 真实可执行性盘点

### 1.1 搜索范围与结论

已检查范围：

- 当前项目：`/Users/hanshuting/Desktop/合规平台`
- 相邻尽调工作目录：`/Users/hanshuting/Desktop/dtt工作/尽职调查`
- 相邻尽调副本：`/Users/hanshuting/Desktop/dtt工作/尽职调查 copy`
- Desktop 历史目录的文件名检索：`main.py`、`scripts/`、`regulatory_scanner`、`decomposer.py`、`regulatory_mapping`、`generate_reports.py`、`generate_remediation.py`
- 当前项目中的 `docs`、`reports`、`platform_server.py`、`app.js`、`index.html`

总体结论：

- 当前项目未发现可直接调用的五个外规内化 Skill 执行脚本。
- 当前项目存在五个 Skill 定义文档，且文档中描述了应有脚本、输入、输出和专业规则，但这些脚本目录未出现在当前项目。
- 当前项目存在历史 HTML 报告：`reports/regulatory-full-flow.html`、`reports/regulatory-mapping.html`、`reports/regulatory-gap.html`、`reports/remediation.html`。
- 当前 `platform_server.py` 只有演示抓取、上传、SQLite 样例任务和 `build_analysis()` 启发式演示分析；`build_analysis()` 不是专业 Skill，不能伪装成 Skill 执行结果。
- 相邻尽调目录中的 `scripts/` 主要是旧尽调演示数据/工作簿生成脚本，不是外规内化五个 Skill 的执行引擎。

### 1.2 按 Skill 盘点

| Skill | Source of Truth | 文档中声明的脚本/运行方式 | 当前是否找到真实脚本 | 当前脚本路径 | 输入方式 | 输出方式 | 所需依赖 | 是否可由当前 `platform_server.py` 调用 | 当前状态 |
|---|---|---|---|---|---|---|---|---|---|
| 监管识别 | `docs/监管识别。skill(1).docx` | 文档声明 `regulatory_scanner/scanner.py`、`config.py`、`main.py`，示例运行目录为 Windows WorkBuddy 路径 `regulatory_scanner/` | 否 | 未找到 | 监管来源、时间范围、监管机构、业务领域；或外规文件/链接；文档要求搜索后写入 `regulatory_scanner/daily_input.json` | `regulatory_scanner/output/regulatory_latest.md`，并应包含结构化摘要、分类、链接验证 | 文档未完整列出 Python 包；涉及 WebSearch/WebFetch、HTTP 链接校验、分类关键词体系 | 否。当前服务只有 `scrape_regulatory_sources()` 的轻量网页抓取和 `build_analysis()` 演示逻辑 | 仅有 Skill 定义文档；执行引擎待接入 |
| 监管解读 / 监管义务拆解 | `docs/监管解读(1).docx` | 文档声明 Skill 根目录 `scripts/` 下有 `decomposer.py`、`pkulaw_enhancer.py`、`config.py`、`obligation_db.py`、`main.py`，运行 `cd scripts && python main.py --json-input input.json --output ./output` | 否 | 未找到 | 单个监管文件 `.docx/.md/.txt` 或文本；也可接收监管识别输出 | Markdown 报告、JSON、SQLite 五维监管义务库 | `python-docx`；可选北大法网 MCP：`mcp__pkulaw__...`；SQLite | 否。当前服务没有 MCP/脚本调度或义务库写入接口 | 仅有 Skill 定义文档；执行引擎待接入 |
| 制度映射 | `docs/制度映射(1).docx` | 文档声明 `regulatory_mapping/`，运行 `python scripts/main.py --input regulation.txt --top-k 10`、`--scanner`、`--search`；还声明 `scripts/extract_taxonomy.py` | 否 | 未找到 | 外规文本、监管识别/义务拆解输出、内部制度标签体系/内规文件 | `output/mapping_matrix.xlsx`、`output/mapping_matrix.json`、`output/mapping_matrix_batch.json` | Python 3.9+、`scikit-learn`、`numpy`、`openpyxl`、`jieba`、`rank-bm25`、`sentence-transformers`、BGE 模型、本地 taxonomy | 否。当前服务无向量模型、taxonomy、映射脚本或 Excel/JSON 读取接口 | 仅有 Skill 定义文档；执行引擎待接入 |
| Gap 分析 | `docs/Gap分析(1).docx` | 文档声明 bundled `scripts/generate_reports.py`，运行 `python scripts/generate_reports.py --data gap_items.json --output ./output/` | 否 | 未找到 | 外规要求、内规制度文本、映射结果；文档脚本输入为 `gap_items.json` | `regulation_gap_analysis_report.html`、`regulation_gap_analysis_report.md`，核心为 Gap 结构化表 | Python 3.10+、`python-docx`；可选 PKULaw MCP | 否。当前服务没有 Gap 结构化推理和报告生成脚本接入 | 仅有 Skill 定义文档；执行引擎待接入 |
| 整改落地 | `docs/整改落地(1).docx` | 文档声明 `scripts/generate_remediation.py`，运行 `PYTHONIOENCODING=utf-8 python "<skill_dir>/scripts/generate_remediation.py" --gap-file ... --output-dir ...` | 否 | 未找到 | Gap 清单、Gap 报告 Markdown 或用户粘贴清单 | `remediation_plan.md`、`policy_drafts.md`、`remediation_summary.json` | 文档未完整列出 Python 包；依赖 Gap 结构化数据和整改框架 | 否。当前服务没有整改脚本、输出目录或交付物登记接口 | 仅有 Skill 定义文档；执行引擎待接入 |

> 重要边界：以上“文档中声明的脚本/运行方式”来自 Skill 文档正文，只能说明专业设计意图；在当前项目中未找到对应可执行代码前，页面不得显示“已运行成功”。

## 2. Skill Registry 设计

### 2.1 目标

Skill Registry 只做“引用、封装、状态管理、运行入口描述”，不复制、不改写、不覆盖 Skill 文档中的专业逻辑。Registry 的作用是让平台知道：

- 哪个 Skill 对应哪个源文档；
- 当前是否有真实执行引擎；
- 输入/输出结构如何在前台渲染；
- 如果没有引擎，页面应显示“专业 Skill 执行引擎待接入”；
- 如果使用历史案例，只能标注为 `demo-replay` 或“历史案例结果”。

### 2.2 建议目录

```text
skills/
  registry.json
  regulatory-scanner/
    input.schema.json
    output.schema.json
    adapter.md
  regulatory-decomposer/
    input.schema.json
    output.schema.json
    adapter.md
  regulatory-mapping/
    input.schema.json
    output.schema.json
    adapter.md
  regulation-gap-analysis/
    input.schema.json
    output.schema.json
    adapter.md
  remediation-implementation/
    input.schema.json
    output.schema.json
    adapter.md
```

### 2.3 Registry 条目草案

```json
{
  "id": "regulatory-decomposer",
  "name": "监管解读",
  "pipelineStage": "regulatory-interpretation",
  "sourceDocument": "docs/监管解读(1).docx",
  "sourceOfTruth": true,
  "inputSchema": "skills/regulatory-decomposer/input.schema.json",
  "outputSchema": "skills/regulatory-decomposer/output.schema.json",
  "executionMode": "unavailable",
  "runner": "",
  "artifactTemplates": [],
  "professionalLogicLocked": true,
  "statusText": "专业 Skill 执行引擎待接入"
}
```

五个 Skill 的初始 `executionMode` 建议全部设为 `unavailable`。只有当真实脚本、API、MCP 或后端服务路径被确认并完成适配后，才能改为 `live-script` 或 `api`。

### 2.4 执行模式定义

| executionMode | 含义 | 页面按钮 | 页面标识 | 结果来源 |
|---|---|---|---|---|
| `live-script` | 本地真实脚本已接入，由平台 Runner 调用 | “执行监管识别/执行分析”可点击 | “实时执行” | 脚本 stdout、JSON、数据库或输出目录 |
| `api` | 外部或内部后端 API 已接入 | API 健康检查通过后可点击 | “API 执行” | API response |
| `demo-replay` | 只读历史案例数据，可加载查看 | “加载历史案例输出” | “历史案例结果 / 非本次执行” | 从历史 HTML/JSON 抽取的结构化案例 |
| `unavailable` | 只有 Skill 定义文档，未接入执行引擎 | 执行按钮禁用 | “专业 Skill 执行引擎待接入” | 无运行结果 |

## 3. 当前项目建议新增或修改的文件

### 3.1 本次只新增

- `docs/skill-runtime-and-structured-output-plan.md`：本方案文档。

### 3.2 后续 P0 修正建议新增

- `skills/registry.json`：统一 Skill Registry。
- `skills/<skill-id>/input.schema.json`：每个 Skill 的前台输入结构。
- `skills/<skill-id>/output.schema.json`：每个 Skill 的结构化输出结构。
- `skills/<skill-id>/adapter.md`：记录该 Skill 如何接入真实脚本/API，以及不得修改的专业边界。
- `data/regulatory-history/<case-id>/case.json`：历史案例元数据。
- `data/regulatory-history/<case-id>/<skill-id>.json`：从历史报告抽取的只读结构化输出。
- `data/regulatory-artifacts/<case-id>/manifest.json`：HTML、Word、Excel、Markdown、JSON 交付物清单。

### 3.3 后续 P0 修正建议修改

- `platform_server.py`
  - 新增只读 Registry API：`GET /api/skills`、`GET /api/skills/:id`。
  - 新增任务结果 API：`GET /api/regulatory/tasks/:caseId/results/:skillId`。
  - 新增执行入口：`POST /api/regulatory/tasks/:caseId/run/:skillId`。
  - 初始阶段若 `executionMode=unavailable`，必须返回明确错误：`专业 Skill 执行引擎待接入`。
  - 不得让 `build_analysis()` 作为上述 Skill 的执行结果。
- `app.js`
  - 将外规内化各 Tab 主体从 iframe 报告改为结构化工作台。
  - 执行按钮根据 Registry 状态显示为可执行、加载历史案例或禁用。
  - 结果区根据 `executionMode` 标注“实时执行/API 执行/历史案例/待接入”。
- `index.html`
  - 保留统一 App Shell 和详情页容器。
  - 不新增重复详情页。
- `README.md`
  - 增加 Skill Registry、执行模式和“历史报告仅作为交付物”的说明。
- `docs/implementation-plan.md`
  - 将 P0 方向修正为结构化工作台 + 交付物预览，而非各 Tab iframe 主体。
- `docs/p0-change-log.md`
  - 补记方向调整和待修复事项。

## 4. 每个 Tab 的输入、操作按钮、输出数据结构

### 4.1 监管识别 Tab

输入区：

```json
{
  "sources": ["PBOC", "NFRA", "SAFE", "CSRC", "HKMA"],
  "dateRange": {
    "from": "YYYY-MM-DD",
    "to": "YYYY-MM-DD"
  },
  "regulators": [],
  "businessDomains": [],
  "uploadedExternalFiles": [],
  "urls": []
}
```

操作按钮：

- `执行监管识别`：仅 `live-script` 或 `api` 可用。
- `加载历史案例输出`：仅 `demo-replay` 可用。
- `查看交付物`：进入交付物 Tab 或打开交付物弹窗。

输出结构：

```json
{
  "documents": [
    {
      "id": "REG-001",
      "title": "",
      "regulator": "",
      "source": "PBOC",
      "category": "",
      "publishDate": "",
      "effectiveDate": "",
      "impactLevel": "高|中|低|待评估",
      "applicableInstitutions": [],
      "originalUrl": "",
      "linkStatus": "valid|invalid|unchecked",
      "summary": ""
    }
  ],
  "categoryDistribution": [],
  "kpis": {
    "total": 0,
    "highImpact": 0,
    "invalidLinks": 0
  },
  "sourceMeta": {
    "executionMode": "unavailable",
    "isHistoricalCase": false
  }
}
```

### 4.2 监管解读 Tab

输入区：

```json
{
  "selectedRegulatoryDocumentIds": [],
  "documentText": "",
  "documentFiles": []
}
```

操作按钮：

- `执行监管解读`
- `加载历史案例输出`
- `查看监管原文`

输出结构：

```json
{
  "interpretations": [
    {
      "documentId": "",
      "regulatoryIntent": {
        "policyBackground": "",
        "regulatoryGoal": "",
        "riskConcern": "",
        "expectedEffect": "",
        "upperLevelLawBasis": [],
        "revisionHistory": [],
        "regulatoryTrend": "",
        "judicialPractice": []
      },
      "requirements": [
        {
          "id": "REQ-001",
          "clauseRef": "",
          "obligationType": "强制性|禁止性|限制性|授权性|程序性|一般性",
          "subject": "",
          "action": "",
          "content": "",
          "deadline": "",
          "originalExcerpt": ""
        }
      ],
      "applicableObjects": {
        "direct": [],
        "indirect": [],
        "exempted": []
      },
      "operationalRequirements": [],
      "inspectionFocus": [],
      "regulatoryActions": []
    }
  ],
  "sourceMeta": {
    "executionMode": "unavailable",
    "isHistoricalCase": false
  }
}
```

### 4.3 内规映射 Tab

输入区：

```json
{
  "obligationLibraryId": "",
  "internalPolicyFiles": [],
  "taxonomyVersion": "",
  "mappingOptions": {
    "topK": 10,
    "manualReviewRequiredBelowConfidence": 0.2
  }
}
```

操作按钮：

- `执行制度映射`
- `加载历史案例输出`
- `导出映射矩阵`

输出结构：

```json
{
  "mappings": [
    {
      "id": "MAP-001",
      "externalClauseRef": "",
      "externalRequirement": "",
      "matchedInternalPolicy": "",
      "matchedInternalClauseRef": "",
      "internalClauseText": "",
      "mappingSummary": "",
      "dimension": "监管意图|监管要求|适用对象|操作要求|检查重点",
      "confidence": 0,
      "confidenceLevel": "高|中|低",
      "manualReviewStatus": "待复核|已确认|已排除",
      "signals": {
        "bm25": 0,
        "embedding": 0,
        "keyword": 0,
        "coso": 0,
        "penaltyBoost": 0
      }
    }
  ],
  "coverageMatrix": [],
  "dimensionDistribution": [],
  "sourceMeta": {
    "executionMode": "unavailable",
    "isHistoricalCase": false
  }
}
```

### 4.4 Gap 分析 Tab

输入区：

```json
{
  "mappingResultId": "",
  "internalPolicyClauseIds": [],
  "externalRequirementIds": []
}
```

操作按钮：

- `执行 Gap 分析`
- `加载历史案例输出`
- `导出 Gap 清单`

输出结构：

```json
{
  "summary": {
    "complianceRate": 0,
    "fullyCompliantCount": 0,
    "partiallyCompliantCount": 0,
    "nonCompliantCount": 0
  },
  "distribution": {
    "complianceLevel": [],
    "riskLevel": [],
    "gapType": []
  },
  "gapItems": [
    {
      "id": "G-001",
      "domain": "",
      "externalClauseRef": "",
      "externalRequirement": "",
      "internalStatus": "",
      "gapDescription": "",
      "complianceLevel": "满足|部分满足|未满足",
      "riskLevel": "高|中|低",
      "gapType": "制度型|执行型|混合型|待判定",
      "recommendation": ""
    }
  ],
  "sourceMeta": {
    "executionMode": "unavailable",
    "isHistoricalCase": false
  }
}
```

### 4.5 整改落地 Tab

输入区：

```json
{
  "gapResultId": "",
  "selectedGapIds": [],
  "targetCompletionDate": "",
  "ownerDepartments": []
}
```

操作按钮：

- `生成整改方案`
- `加载历史案例输出`
- `导出整改计划`

输出结构：

```json
{
  "policyActions": {
    "newPolicies": [],
    "revisedClauses": []
  },
  "processActions": [],
  "systemChanges": [],
  "controlPoints": [
    {
      "id": "C-NEW-001",
      "type": "预防性|检测性|指导性",
      "description": "",
      "relatedGapIds": [],
      "owner": "",
      "evidenceRequired": ""
    }
  ],
  "highRiskMatrix": [],
  "timeline": [
    {
      "phase": "",
      "startDate": "",
      "endDate": "",
      "tasks": []
    }
  ],
  "policyDrafts": [],
  "sourceMeta": {
    "executionMode": "unavailable",
    "isHistoricalCase": false
  }
}
```

### 4.6 交付物 Tab

交付物 Tab 才能展示或预览 HTML、Word、Excel、Markdown、JSON。

```json
{
  "artifacts": [
    {
      "id": "ART-001",
      "name": "外规内化全流程报告",
      "type": "html|docx|xlsx|md|json",
      "path": "reports/regulatory-full-flow.html",
      "source": "历史案例|实时执行|API执行|人工上传",
      "generatedAt": "",
      "previewMode": "fullscreen-modal|new-window|download-only"
    }
  ]
}
```

## 5. 历史 HTML 报告转换为只读案例数据

### 5.1 可转换来源

- `reports/regulatory-full-flow.html`
- `reports/regulatory-mapping.html`
- `reports/regulatory-gap.html`
- `reports/remediation.html`
- `docs/外规内化全流程报告_PBOC2026第4号(1).html`
- `docs/邮储银行托管业务制度合规对标映射报告(1).html`
- `docs/邮储银行托管业务制度合规差距分析报告(1).html`

### 5.2 转换原则

- 转换后的数据必须标记：
  - `isHistoricalCase: true`
  - `executionMode: "demo-replay"`
  - `notLiveRun: true`
  - `sourceArtifact: "<原始HTML路径>"`
- 页面标签必须显示“历史案例结果”。
- 按钮文案使用“加载历史案例输出”，不得使用“执行成功”。
- 新建任务在没有真实引擎时只显示空状态和“专业 Skill 执行引擎待接入”。
- 历史案例数据不得写回为新任务实时执行结果。

### 5.3 建议转换流程

1. 对历史 HTML 建立 artifact manifest。
2. 使用稳定解析器抽取标题、KPI、表格、风险分布、整改矩阵等结构。
3. 将每个阶段输出保存为独立 JSON：
   - `regulatory-scanner.json`
   - `regulatory-decomposer.json`
   - `regulatory-mapping.json`
   - `regulation-gap-analysis.json`
   - `remediation-implementation.json`
4. 每条数据保留 HTML 来源锚点或来源章节名，便于审计。
5. 前台只读渲染这些 JSON，不直接把 iframe 放进分析 Tab 主体。

## 6. 四种运行状态的页面区分

### 6.1 `live-script`

- Badge：`实时执行`
- 主按钮：可点击，文案为“执行监管识别/执行制度映射/执行 Gap 分析”等。
- 结果区：显示运行时间、runner 路径、输出文件、执行日志摘要。
- 失败时：显示脚本 stderr、退出码和“未生成有效结构化结果”。

### 6.2 `api`

- Badge：`API 执行`
- 主按钮：API 健康检查通过后可点击。
- 结果区：显示接口响应时间、请求 ID、返回结构化数据。
- 失败时：显示 API 错误，不回退成演示结论。

### 6.3 `demo-replay`

- Badge：`历史案例结果`
- 主按钮：`加载历史案例输出`
- 结果区：显示“此结果来自历史报告抽取，非本次 Skill 执行”。
- 交付物：可打开原始 HTML/Word/Excel。

### 6.4 `unavailable`

- Badge：`待接入`
- 主按钮：禁用，文案为“专业 Skill 执行引擎待接入”。
- 结果区：显示当前缺少 runner/API/MCP，并列出需要接入的脚本路径或服务。
- 不显示“分析完成”“执行成功”“已生成结论”等状态。

## 7. 对现有 iframe 预览的处理方案

现有 iframe 能保留，但只能出现在：

- 交付物 Tab；
- 页面右上角“查看交付物”；
- 全屏报告预览弹窗；
- 下载入口或新窗口打开。

不得继续作为以下 Tab 的主体：

- 监管解读；
- 内规映射；
- Gap 分析；
- 整改落地；
- 监管识别。

后续调整建议：

1. 保留详情页右上角“查看交付物”入口，但默认打开交付物列表，而不是直接打开全流程报告。
2. `app.js` 中 `renderReportPreview()` 只由交付物相关渲染调用。
3. 分析 Tab 使用结构化 JSON 渲染 KPI、表格、矩阵、清单、时间线。
4. 历史报告 iframe 进入全屏弹窗时，弹窗顶部保留平台标题、任务编号、来源标记和关闭按钮。

## 8. 不修改的原始 Skill 文档和专业逻辑边界

以下文件是专业逻辑、方法论、输入输出规范和业务规则的唯一来源，不在本方案中修改：

- `docs/监管识别。skill(1).docx`
- `docs/监管解读(1).docx`
- `docs/制度映射(1).docx`
- `docs/Gap分析(1).docx`
- `docs/整改落地(1).docx`

明确禁止：

- 修改 Skill 文档中的专业逻辑、判断标准、映射阈值、Gap 分类口径、整改口径或 Prompt 意图。
- 把 `platform_server.py` 的 `build_analysis()` 包装成专业 Skill。
- 用历史 HTML 报告 iframe 冒充结构化执行结果。
- 在真实执行引擎缺失时展示“已运行成功”。
- 用前端静态数据伪造新任务 Skill 输出。

允许做的事情：

- Registry 引用 Skill 文档。
- 为前台渲染建立输入/输出 Schema。
- 接入真实脚本/API/MCP 时做薄适配层。
- 将历史报告抽取为只读结构化案例，并明确标注“历史案例结果”。
- 将 HTML、Word、Excel、Markdown、JSON 作为交付物管理、预览和下载。

## 9. 建议实施顺序

### Step 1：锁定 Registry 与状态口径

- 新增 `skills/registry.json`。
- 五个 Skill 初始状态全部为 `unavailable`。
- 前端先能读取 Registry 并正确显示“待接入”。

### Step 2：拆除分析 Tab iframe 主体

- 将监管识别、监管解读、内规映射、Gap 分析、整改落地改为结构化工作台布局。
- 保留交付物 Tab 的报告预览能力。

### Step 3：抽取历史案例数据

- 从现有 HTML 报告抽取只读 JSON。
- 增加“加载历史案例输出”入口。
- 所有历史案例结果带明显标识。

### Step 4：接入真实执行引擎

- 等确认真实脚本/API/MCP 后，将对应 Registry 条目从 `unavailable` 更新为 `live-script` 或 `api`。
- 增加 Runner 沙箱、输入校验、输出校验和执行日志。
- 脚本输出必须通过 Schema 校验后才进入页面结果区。

## 10. 需要用户确认的信息

- 五个 Skill 的真实代码是否存在于其他未扫描到的位置；如存在，请提供目录路径。
- 是否允许后续创建 `skills/` Registry 目录和 `data/regulatory-history/` 历史案例数据目录。
- 历史 HTML 报告是否都属于同一个案例 `PBOC-2026-004-PSBC-CUSTODY`。
- 后续真实执行优先接入哪一种模式：本地 Python 脚本、后端 API、MCP，还是先做 `demo-replay`。
- 监管识别是否允许平台主动联网搜索监管官网，还是仅处理用户上传/指定链接。
