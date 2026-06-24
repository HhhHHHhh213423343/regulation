# P0 变更日志

## 范围

本轮仅实施 P0：平台骨架、统一导航、路由修复、外规内化工作台接入。

未进入：

- P1 尽职调查功能迁移与最新视觉资产适配。
- P1 尽调图片、插画、人物形象、关系图谱替换。
- P2 风险监测规则库、预警中心、异常处置台账和执行记录。

## 修改文件

### `index.html`

修改目的：

- 建立统一 App Shell。
- 收敛一级导航。
- 增加面包屑、页面标题区、统一内容容器。
- 增加外规内化工作台和标准任务详情容器。
- 增加任务中心、交付与留痕框架入口。

主要变化：

- 一级导航仅保留：首页总览、外规内化、尽职调查、风险监测、任务中心、交付与留痕。
- 首页卡片、重点事项、KPI 均使用统一 `data-route` 路由入口。
- 外规内化任务详情页包含：总览、监管原文、监管解读、内规映射、Gap 分析、整改落地、交付物、审阅与留痕。
- 保留尽职调查当前入口，但明确标记 P1 再迁移。
- 风险监测仅保留 P2 待接入占位，不新增规则。

### `app.js`

修改目的：

- 建立前端 History API 路由。
- 修复入口不统一、路由切换不复位、Tab 切换跳位等问题。
- 将外规内化既有报告接入标准任务详情页。

主要变化：

- 新增 `/`、`/regulatory`、`/regulatory/tasks/:caseId`、`/diligence`、`/monitoring`、`/tasks`、`/artifacts` 路由。
- 首页卡片、左侧导航、任务列表按钮统一进入同一个外规内化任务详情页。
- 页面级路由切换后滚动回顶部。
- 外规详情 Tab 切换更新详情内容和 URL，但不主动滚动页面。
- 外规流程前台显示为：监管识别、监管解读、内规映射、Gap 分析、整改落地。
- 报告预览嵌入既有 HTML 文件，不修改报告内容。
- 交付物列表只展示当前项目中真实存在的 HTML / Word 文件。
- 顶部文件上传只响应带 `data-upload-kind` 的外规/内规上传控件，避免误拦截其他模块文件输入。

### `styles.css`

修改目的：

- 增加 P0 统一平台样式。
- 让首页总览、详情页、Tab、交付物卡片、报告预览保持克制的内部管理平台风格。

主要变化：

- 新增统一内容容器、面包屑、KPI 卡片、状态标签、详情页头部、详情 Tab、报告预览、交付物卡片、审阅留痕样式。
- 不重写旧尽调样式，不进行 P1 视觉迁移。

### `platform_server.py`

修改目的：

- 修复直接访问 `/diligence` 绕开统一 App Shell 的服务端路由问题。

主要变化：

- 将 `/`、`/regulatory`、`/diligence`、`/monitoring`、`/tasks`、`/artifacts` 统一回退到主平台 `index.html`。
- 旧尽调完整页仍保留在 `/diligence/index.html`，但不再作为一级导航默认入口。

### `README.md`

修改目的：

- 补充项目启动说明、P0 范围、关键页面路径和保护边界。

### `docs/implementation-plan.md`

修改目的：

- 更新 P0 状态，记录本轮已实施内容与仍未解决问题。

### `docs/p0-change-log.md`

修改目的：

- 记录本轮 P0 文件级变更、已修复问题、未解决问题和验证建议。

## 已修复问题

- 一级导航不符合 PRD：已收敛为六个一级入口。
- “内规外化”前台文案不一致：P0 前台统一为“外规内化”。
- 首页卡片和任务列表入口不统一：已统一到 `/regulatory/tasks/:caseId` 标准详情页。
- 主平台无详情页：已新增外规内化标准任务详情页。
- 外规流程缺少清晰五步前台结构：已展示监管识别、监管解读、内规映射、Gap 分析、整改落地。
- 页面路由切换不复位：已在页面级路由切换后滚动回顶部。
- Tab 切换可能跳位：外规详情 Tab 切换不主动滚动。
- 直接访问 `/diligence` 绕开统一平台框架：已改为主平台路由，旧页保留在 `/diligence/index.html`。
- 文件上传全局误拦截：已限定为顶部外规/内规上传控件。
- 交付文件分散：已增加交付与留痕统一入口。

## 尚未解决问题

- 外规内化真实 Skills 的可执行路径和调用协议尚未确认；当前仅接入既有报告和演示结构化状态。
- 条款级内规映射、Gap 清单、整改任务尚未结构化接入，页面明确标记为“待接入”。
- 审阅与留痕尚未接入后端任务模型和真实操作日志。
- 任务中心目前只接入外规内化演示任务入口。
- 尽职调查仍为当前入口保留状态，未迁移为 PRD 的新对象模型。
- 风险监测仍为 P2 占位，未新增具体规则或预警。
- 本地浏览器自动化环境受 Chrome headless 权限限制，建议人工检查关键路径。

## 本地启动与验证步骤

启动：

```bash
python3 platform_server.py
```

如端口被占用：

```bash
COMPLIANCE_PLATFORM_PORT=8770 python3 platform_server.py
```

访问：

```text
http://localhost:8766/
```

建议验证：

1. 从首页点击“外规内化”，进入 `/regulatory`。
2. 从首页“高风险 Gap”进入 `/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=gap`。
3. 从左侧导航进入“外规内化”，再点击任务列表“查看详情”，确认进入同一个标准任务详情页。
4. 在任务详情页切换八个 Tab，确认页面不自动跳到中部或底部。
5. 打开“内规映射”“Gap 分析”“整改落地”，确认报告预览保留在统一平台导航下。
6. 进入“交付与留痕”，确认 HTML / Word 文件入口可见。
7. 进入“尽职调查”，确认当前入口仍可加载，不发生 P1 视觉迁移。
8. 进入“风险监测”，确认只显示 P2 待接入占位，没有新增具体规则。

## Claude 接管增量（2026-06-24，无 git 仓库，以下为文件级变更账本）

新增：
- `skills_runtime/candidate_search.py`：纯 Python BM25 + 关键词候选检索（BGE 降级未启用）。
- `skills_runtime/artifact_builder.py`：HTML/Word/Excel/JSON/Markdown 交付物生成（基于已保存 structured_result）。
- `skills_runtime/runners/_common.py`：上游运行加载 + 模型选择。
- `skills_runtime/runners/regulatory_mapping_runner.py`：内规映射 Agent。
- `skills_runtime/runners/regulation_gap_analysis_runner.py`：Gap 分析 Agent。
- `skills_runtime/runners/remediation_implementation_runner.py`：整改落地 Agent。
- `skills_runtime/prompts/regulatory_mapping.md`、`regulation_gap_analysis.md`、`remediation_implementation.md`。
- `docs/claude-takeover-status.md`、`docs/external-regulation-internalization-v1-regression-report.md`。

修改：
- `skills_runtime/registry.py`：注册全部 5 个 Skill（新增映射/Gap/整改）。
- `skills_runtime/runners/remediation_implementation_runner.py`：按风险排序并截断 12 条以控制输出 token。
- `platform_server.py`：新增映射/Gap/整改/交付物/运行列表 API 与处理函数。
- `app.js` / `styles.css`：mapping/gap/remediation/artifacts/audit 五个 Tab 改为结构化工作台，新增 run 元数据、复核区、交付物、留痕渲染。
- `README.md`：补充四个下游 Agent、API 与可演示路径。

边界遵守：未修改 `docs/` 五个原始 Skill Word 文档；未输出/提交 API Key；未重置 `data/` 既有运行产物；`build_analysis()` 未被当作专业 Skill 输出。

## 重点检查页面和交互路径

- `/`
- `/regulatory`
- `/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=overview`
- `/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=mapping`
- `/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=gap`
- `/regulatory/tasks/PBOC-2026-004-PSBC-CUSTODY?tab=remediation`
- `/artifacts`
- `/diligence`
- `/monitoring`
