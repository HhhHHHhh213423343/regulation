# 托管内控智能化平台

本项目是已有托管内控平台的 Demo / POC，不是新建项目。当前 P0 重点完成平台骨架、统一导航、路由修复和外规内化工作台接入。

## 当前技术栈

- 前端：原生 HTML、CSS、JavaScript
- 后端：Python `http.server` + `ThreadingHTTPServer`
- 数据库：SQLite，位于 `data/platform.db`
- 主入口：`index.html`
- 本地服务：`platform_server.py`

## 本轮 P0 范围

已完成：

- 统一 App Shell：左侧导航、顶部栏、面包屑、页面标题区、统一内容容器。
- 一级导航收敛为：首页总览、外规内化、尽职调查、风险监测、任务中心、交付与留痕。
- 外规内化工作台展示五步流程：监管识别、监管解读、内规映射、Gap 分析、整改落地。
- 外规内化任务详情页：总览、监管原文、监管解读、内规映射、Gap 分析、整改落地、交付物、审阅与留痕。
- 通过平台框架嵌入既有 HTML 报告和展示既有输出文件。
- 统一首页、侧边栏、任务列表等入口到同一个外规内化任务详情页。
- 路由切换后主内容区回到顶部；详情 Tab 切换不主动滚动到页面中部或底部。
- 直接访问 `/diligence` 进入统一平台框架；旧尽调完整页仍保留在 `/diligence/index.html`。

未进入：

- P1 尽职调查视觉迁移。
- P1 尽调图片、人物形象、风险图谱替换。
- P2 风险监测具体规则库、预警中心和处置台账实现。

## 重要边界

外规内化既有 Skills、专业逻辑、判断规则、阈值、Prompt 和输出口径不得修改。本轮只做读取、接入、展示和统一平台框架适配。

所有暂未接入真实数据的位置必须明确标记为“演示数据”或“待接入”，不得伪装为真实运行结果。

## 本地启动

```bash
python3 platform_server.py
```

默认访问：

```text
http://localhost:8766/
```

如果 8766 端口被占用，可以指定端口：

```bash
COMPLIANCE_PLATFORM_PORT=8770 python3 platform_server.py
```

## Zeabur 部署

仓库包含 `Procfile`，Zeabur 可使用以下启动命令：

```bash
python3 platform_server.py
```

服务端会优先读取平台注入的 `PORT` 环境变量；本地仍可继续使用 `COMPLIANCE_PLATFORM_PORT`。生产环境不要上传 `.env`，请在 Zeabur 环境变量中配置：

```text
LLM_PROVIDER
LLM_BASE_URL
LLM_MODEL_FAST
LLM_MODEL_REASONING
LLM_API_KEY
LLM_MODEL
LLM_TIMEOUT_SECONDS
LLM_MAX_OUTPUT_TOKENS
LLM_TEMPERATURE
```

如果只展示静态 demo，可暂不配置 LLM；涉及四个 Agent 实时执行、LLM 健康检查和冒烟测试时需要配置有效 Key。

## 建议检查路径

- 首页总览：`/`
- 外规内化工作台：`/regulatory`
- 外规内化任务详情：`/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=overview`
- 内规映射 Tab：`/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=mapping`
- Gap 分析 Tab：`/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=gap`
- 交付与留痕：`/artifacts`

## 外规内化四个下游 Agent（已接入真实执行引擎）

监管解读 → 内规映射 → Gap 分析 → 整改落地 四个 Agent 均由 `skills_runtime/` 真实执行（DeepSeek 受控结构化分析 + Python 规则 + 人工复核），不使用 Mock，不调用 `build_analysis()`，专业逻辑唯一来源为 `docs/` 五个 Skill Word 文档（只读）。

执行链路（任务详情页对应 Tab 内点击执行）：

```text
监管解读  上传 .docx/.txt/.md 外规 或 用当前任务真实原文 → 五维义务库
内规映射  上传内规制度文件 → 条款级切分 + BM25/关键词候选 + DeepSeek 受控映射（低置信度默认 review_required）
Gap 分析  解读义务库 + 映射结果 → 满足/部分满足/未满足 × 高/中/低 × 制度型/执行型/混合型
整改落地  Gap 清单 → 制度/流程/系统/控制点四维 + 制度草案（强制声明“AI 辅助草案，须经法律合规部门审查”）
交付物    基于已保存结构化结果生成 HTML/Word/Excel/JSON/Markdown
```

平台 API：

```text
GET  /api/health/llm                              LLM 配置健康（不返回 Key）
POST /api/health/llm/smoke                        LLM 实时冒烟
GET  /api/skills                                  Skill 注册表（4 个）
GET  /api/skills/runs?task_id=&skill_id=          运行列表
GET  /api/skills/runs/:run_id                     运行详情
POST /api/skills/regulatory-decomposer/runs       监管解读（multipart: file）
POST /api/skills/regulatory-decomposer/runs-from-case   用任务真实原文执行
POST /api/skills/regulatory-mapping/runs          内规映射（multipart: file + decomposer_run_id）
POST /api/skills/regulation-gap-analysis/runs      Gap 分析（json: decomposer_run_id + mapping_run_id）
POST /api/skills/remediation-implementation/runs   整改落地（json: gap_run_id）
POST /api/skills/runs/:run_id/artifacts            生成交付物（json: types[]）
POST /api/skills/runs/:run_id/review               人工复核留痕
```

可演示路径（自带真实运行结果，task_id `990f2d424a481f6e80d6`，跨境放款链路）：

```text
/regulatory/tasks/990f2d424a481f6e80d6?tab=interpretation
/regulatory/tasks/990f2d424a481f6e80d6?tab=mapping
/regulatory/tasks/990f2d424a481f6e80d6?tab=gap
/regulatory/tasks/990f2d424a481f6e80d6?tab=remediation
/regulatory/tasks/990f2d424a481f6e80d6?tab=artifacts
```

LLM 配置在 `.env`（`LLM_API_KEY` 仅后端读取，不进入前端/日志/交付物）。详见 `docs/claude-takeover-status.md` 与 `docs/external-regulation-internalization-v1-regression-report.md`。

## 主要文件

- `index.html`：平台页面结构和统一 App Shell。
- `app.js`：前端路由、外规内化详情页、报告/交付物接入、当前尽调入口保留。
- `styles.css`：P0 统一平台样式。
- `platform_server.py`：本地服务、监管案例 API、上传、旧尽调代理。
- `docs/implementation-plan.md`：改造计划与 P0 状态。
- `docs/p0-change-log.md`：P0 本轮变更记录。
