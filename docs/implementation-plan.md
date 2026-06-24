# 托管内控智能化平台改造计划

## 0. 分析结论摘要

当前项目是一个已存在的轻量 Demo/POC，不是新建工程。主平台由静态 HTML/CSS/JS 加 Python 本地服务组成，已初步接入外规内化样例、旧尽调后端代理和风险监测占位页面。

本次改造应采用“保留既有能力、统一平台骨架、分阶段迁移”的方式推进：

- P0 先修平台骨架、统一导航、路由状态、滚动问题，并把外规内化工作台接入为可追溯任务流。
- P1 再迁移尽职调查核心功能，并用最新视觉资产替换旧排版和旧图片。
- P2 最后搭建风险监测规则库、预警中心、处置台账和执行记录框架。

重要边界：外规内化既有 Skills 只能复用和接入，不允许修改其专业逻辑、判断规则、阈值、Prompt 或输出口径。

## 0.1 P0 实施状态（2026-06-24）

已按本计划开始并完成 P0 首轮实施，范围仅限平台骨架、统一导航、路由修复和外规内化工作台接入。

本轮已完成：

- 建立统一 App Shell：左侧导航、顶部栏、面包屑、页面标题区和统一内容容器。
- 一级导航收敛为：首页总览、外规内化、尽职调查、风险监测、任务中心、交付与留痕。
- 建立 History API 路由：`/`、`/regulatory`、`/regulatory/tasks/:caseId`、`/diligence`、`/monitoring`、`/tasks`、`/artifacts`。
- 服务端将一级应用路由统一回退到主平台 `index.html`；旧尽调完整页保留在 `/diligence/index.html`。
- 首页卡片、左侧导航、任务列表按钮统一进入同一个外规内化标准任务详情页。
- 页面级路由切换后滚动回顶部；外规详情 Tab 切换不主动滚动。
- 外规内化前台流程展示为：监管识别、监管解读、内规映射、Gap 分析、整改落地。
- 外规内化任务详情页包含：总览、监管原文、监管解读、内规映射、Gap 分析、整改落地、交付物、审阅与留痕。
- 已有 HTML 报告通过统一平台框架中的报告预览展示。
- 已有 Word / HTML 输出文件集中展示在“交付与留痕”。
- 对未结构化接入的真实数据明确标记为“待接入”或“演示数据”。

本轮未进入：

- P1 尽职调查功能迁移与最新视觉资产适配。
- P1 尽调图片、插画、人物形象、关系图谱替换。
- P2 风险监测具体规则库、预警中心、异常处置台账和执行记录。

详见 [docs/p0-change-log.md](/Users/hanshuting/Desktop/合规平台/docs/p0-change-log.md)。

## 1. 当前技术栈与项目结构

### 1.1 技术栈

当前不是 React/Vue/Next 工程，也没有发现 `package.json`。

- 前端：原生 HTML、CSS、JavaScript。
- 主入口：[index.html](/Users/hanshuting/Desktop/合规平台/index.html:1)。
- 主样式：[styles.css](/Users/hanshuting/Desktop/合规平台/styles.css:1)。
- 主交互：[app.js](/Users/hanshuting/Desktop/合规平台/app.js:1)。
- 后端：Python `http.server` + `ThreadingHTTPServer`。
- 后端入口：[platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:1)。
- 数据库：SQLite，[data/platform.db](/Users/hanshuting/Desktop/合规平台/data/platform.db)。
- 旧尽调页面：`diligence/index.html + diligence/script.js + diligence/styles.css`。
- 旧尽调后端：由主服务代理到 `/Users/hanshuting/Desktop/dtt工作/尽职调查/due_diligence_assistant_demo/server.py`。

### 1.2 路由结构

主平台当前没有真正的前端路由，只有 DOM 视图切换：

- `home`：首页。
- `regulatory`：外规内化工作台。
- `diligence`：主平台内嵌的尽调简化工作台。
- `monitoring`：风险监测占位页。
- `research`：智能研究台静态页。

相关代码：

- 视图标题配置在 [app.js](/Users/hanshuting/Desktop/合规平台/app.js:1)。
- `setView()` 只切换 `.is-active`，不更新 URL，不重置滚动位置，见 [app.js](/Users/hanshuting/Desktop/合规平台/app.js:747)。
- P0 后服务器将 `/`、`/regulatory`、`/diligence`、`/monitoring`、`/tasks`、`/artifacts` 映射到主平台 `index.html`；旧尽调完整页保留在 `/diligence/index.html`，见 [platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:492)。

旧尽调页有自己的前端状态和 URL 逻辑，包含 `pushState/replaceState`，但路径是 `/risk-map` 这类根路径，不在 `/diligence/...` 下。刷新后可能回到主平台首页，而不是旧尽调页。

### 1.3 页面目录

- `/index.html`：托管内控平台主页面。
- `/app.js`：主平台状态、外规内化、尽调简化工作台、页面切换逻辑。
- `/styles.css`：主平台全局样式。
- `/platform_server.py`：主平台 API、SQLite、监管抓取、上传、旧尽调代理。
- `/reports`：主平台 iframe 使用的外规内化 HTML 报告。
- `/docs`：PRD、外规内化交付文件、历史 HTML/Word 报告。
- `/diligence`：旧尽调页面及其样式、脚本、知识库、素材。
- `/data/platform.db`：主平台 SQLite 数据库。
- `/uploads`：外规/内规上传目录。

### 1.4 共享组件现状

当前没有模块化组件目录。所谓组件主要是 CSS class 和 JS 字符串模板：

- 主平台：`agent-card`、`pipeline`、`step-card`、`report-shell`、`panel-card`、`risk-pill`、`diligence-table` 等。
- 旧尽调页：大量函数式模板，例如 `renderHome`、`renderDueTask`、`renderEnterpriseLibrary`、`renderWatchlist`、`renderReportCenter`、`renderDocumentWorkspace` 等。

问题：表格、标签、卡片、详情抽屉、报告预览、筛选器没有统一抽象。P0 应先沉淀轻量 UI primitives，而不是继续复制页面。

### 1.5 状态管理方式

主平台：

- 使用全局变量维护状态：`regulatoryCase`、`activeStepId`、`regulatoryCases`、`diligenceState`。
- 不写 URL，不支持浏览器前进/后退恢复状态。
- 筛选条件、Tab、详情状态都在 JS 内存中。

旧尽调：

- 使用大型全局 `state` 对象管理页面、筛选、报告、画像、预警、编辑器状态。
- 部分状态写入 `localStorage`，例如画像详情布局偏好。
- 有内部路由同步逻辑，但与主平台路由体系不一致。

后端：

- 主平台 SQLite 只有三张外规相关表：`regulatory_cases`、`regulatory_scrape_runs`、`regulatory_uploads`。
- 旧尽调后端有独立 SQLite 和复杂 schema，包括企业、人员、证据、财务、报告、风险标签、贷后事件等。

### 1.6 Mock 数据位置

主平台 Mock/样例：

- `fallbackRegulatoryCase` 在 [app.js](/Users/hanshuting/Desktop/合规平台/app.js:9)。
- `SAMPLE_CASE` 在 [platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:67)。
- `build_analysis()` 是轻量启发式演示分析，见 [platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:365)。它不能替代既有专业 Skills。
- 风险监测当前为静态占位，见 [index.html](/Users/hanshuting/Desktop/合规平台/index.html:171)。

旧尽调 Mock/数据：

- `diligence/script.js` 内含智能导航、风险地图、风险画像、任务、监控预警等静态样例。
- `diligence/knowledge_library/manifest.json` 保存知识库文件索引和文本摘要。
- 外部旧尽调项目数据库位于 `/Users/hanshuting/Desktop/dtt工作/尽职调查/database/sme_due_diligence_demo.db`。
- 外部旧尽调 CSV 源数据位于 `/Users/hanshuting/Desktop/dtt工作/尽职调查/artifacts/csv`。

## 2. 当前已实现页面、入口、路由和功能

### 2.1 首页

位置：[index.html](/Users/hanshuting/Desktop/合规平台/index.html:52)

已实现：

- 平台标题、侧边栏导航、四个 Agent 卡片入口。
- 卡片点击可切换到对应视图。

性质：

- 主要是静态展示。
- KPI 是硬编码，不来自任务或数据库。
- 不符合 PRD 中“首页总览需要展示待办、监管变化、高风险事项、尽调进度、预警摘要”的要求。

问题：

- 一级导航缺少 PRD 要求的“任务中心”“交付与留痕”。
- “智能研究台”不在 PRD 核心一级导航里，后续应并入“知识与素材”或“任务中心/研究能力”。
- 文案里有“内规外化”，PRD 使用“外规内化”，需统一。

### 2.2 外规内化工作台

位置：[index.html](/Users/hanshuting/Desktop/合规平台/index.html:97)，逻辑在 [app.js](/Users/hanshuting/Desktop/合规平台/app.js:9)

已实现：

- 五步流程卡：监管识别、监管解读/义务拆解、制度映射、Gap 分析、整改落地。
- 可从 SQLite 加载监管案例。
- 可上传外规/内规到 `uploads` 并记录 `regulatory_uploads`。
- 可触发监管网站抓取任务。
- 可对当前案例执行 `reanalyze`。
- iframe 嵌入 HTML 报告。

可用程度：

- 报告预览可用。
- 监管案例列表 API 可用。
- 上传接口可用。
- 抓取接口依赖外网和监管网页结构，稳定性一般。
- `reanalyze` 只是 `build_analysis()` 演示逻辑，不是专业 Skill 调用。

问题：

- 外规内化目前是“案例 + 报告 iframe”，不是 PRD 要求的任务详情页和多 Tab 工作台。
- `build_analysis()` 会生成空的 `mapping_items/gap_items/remediation_items`，不能显示条款级映射、Gap 清单和整改任务。
- 现有 HTML 报告中 `regulatory-full-flow.html` 将制度映射和 Gap 部分压缩展示，前台需要单独呈现“内规映射”。
- iframe 使用 `#step1/#step2` hash，PRD 要求主要页面导航不要依赖 hash。
- 报告文件存在时可打开，但交付物中心尚不存在。

### 2.3 尽职调查 Agent 主平台嵌入页

位置：[index.html](/Users/hanshuting/Desktop/合规平台/index.html:142)，逻辑在 [app.js](/Users/hanshuting/Desktop/合规平台/app.js:291)

已实现：

- 从旧尽调后端代理读取 `/api/companies`、`/api/home-feed`、`/api/knowledge-files`。
- 展示企业选择、首页、洞察任务、企业画像、洞察报告、监控预警、知识中心。
- 可生成报告、报告预审、刷新任务。

可用程度：

- API 连通性已确认：企业列表和首页 feed 可返回。
- 主平台只嵌入了旧尽调的一部分能力。
- 报告生成、预审依赖旧尽调后端。

问题：

- 页面仍以“企业”为核心，但 PRD 要求统一为“尽调对象”，支持管理人、产品、交易对手、外包机构等。
- 主平台嵌入页和 `/diligence/index.html` 旧完整页不是同一套路由和详情页，存在“不同入口进入不同详情页”的结构风险。
- 主平台嵌入页缺少对象画像、风险研判、证据验证、关系图谱、报告工坊的完整 Tab。
- 旧尽调页使用的路径和主平台路径没有统一。

### 2.4 旧尽调完整页

位置：[diligence/index.html](/Users/hanshuting/Desktop/合规平台/diligence/index.html:1)，逻辑在 [diligence/script.js](/Users/hanshuting/Desktop/合规平台/diligence/script.js:1)

已实现：

- 首页、风险地图、洞察任务、企业画像、洞察报告、监控预警、知识中心。
- 智能命令输入、企业搜索、画像详情、风险屋、报告编辑画布、报告预审、证据溯源。
- 材料上传、知识文件上传、报告导出入口。

可保留能力：

- 企业/对象检索和选择。
- 洞察任务流程。
- 风险画像数据结构和风险维度。
- 风险地图交互思路。
- 风险屋/风险维度拆解逻辑。
- 报告生成、报告预审、报告编辑画布、引用溯源。
- 知识库分类、预览、下载。
- 材料补充与证据验证思路。

不宜直接保留：

- 宇宙/大渐变背景、低对比度文字、旧排版。
- 旧导航体系和旧路由路径。
- 旧图片引用方式。
- 以授信企业为唯一对象类型的文案。

### 2.5 风险监测 Agent

位置：[index.html](/Users/hanshuting/Desktop/合规平台/index.html:171)

已实现：

- 三个静态说明块：监测对象、监测依据、当前状态。

性质：

- 只是静态占位。
- 没有规则库、预警中心、处置台账、执行记录。
- 没有 Mock 数据结构。

### 2.6 智能研究台

位置：[index.html](/Users/hanshuting/Desktop/合规平台/index.html:195)

已实现：

- 上传材料输入框。
- 研究问题 textarea。
- “生成分析任务”按钮。

问题：

- 按钮没有绑定动作。
- 全局 `input[type=file]` change 逻辑会把研究台上传也当成外规上传，只上传第一个文件到 `/api/regulatory/upload`。
- 没有任务创建、状态或结果展示。

## 3. 外规内化相关资产位置

### 3.1 页面和代码

- 主平台外规内化页面：[index.html](/Users/hanshuting/Desktop/合规平台/index.html:97)
- 外规内化前端状态与渲染：[app.js](/Users/hanshuting/Desktop/合规平台/app.js:9)
- 外规 API、抓取、上传、演示分析：[platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:93)
- 外规数据库：[data/platform.db](/Users/hanshuting/Desktop/合规平台/data/platform.db)

### 3.2 已有 HTML 报告

主平台展示用：

- [reports/regulatory-full-flow.html](/Users/hanshuting/Desktop/合规平台/reports/regulatory-full-flow.html)
- [reports/regulatory-mapping.html](/Users/hanshuting/Desktop/合规平台/reports/regulatory-mapping.html)
- [reports/regulatory-gap.html](/Users/hanshuting/Desktop/合规平台/reports/regulatory-gap.html)
- [reports/remediation.html](/Users/hanshuting/Desktop/合规平台/reports/remediation.html)

历史交付文件：

- [docs/外规内化全流程报告_PBOC2026第4号(1).html](/Users/hanshuting/Desktop/合规平台/docs/外规内化全流程报告_PBOC2026第4号(1).html)
- [docs/邮储银行托管业务制度合规对标映射报告(1).html](/Users/hanshuting/Desktop/合规平台/docs/邮储银行托管业务制度合规对标映射报告(1).html)
- [docs/邮储银行托管业务制度合规差距分析报告(1).html](/Users/hanshuting/Desktop/合规平台/docs/邮储银行托管业务制度合规差距分析报告(1).html)

### 3.3 Word / Skill / 交付文件

- [docs/监管识别。skill(1).docx](/Users/hanshuting/Desktop/合规平台/docs/监管识别。skill(1).docx)
- [docs/监管解读(1).docx](/Users/hanshuting/Desktop/合规平台/docs/监管解读(1).docx)
- [docs/制度映射(1).docx](/Users/hanshuting/Desktop/合规平台/docs/制度映射(1).docx)
- [docs/Gap分析(1).docx](/Users/hanshuting/Desktop/合规平台/docs/Gap分析(1).docx)
- [docs/整改落地(1).docx](/Users/hanshuting/Desktop/合规平台/docs/整改落地(1).docx)

注意：当前仓库内未发现标准代码形态的 Skill 目录，只有上述 Word/HTML 交付件和报告。后续如果要“接入 Skills”，需要确认真正可执行的 Skill 路径、调用方式和输入输出协议。

### 3.4 保护边界确认

外规内化既有 Skills 和报告只能复用、读取、展示、做前端接入，不允许修改：

- 不修改监管识别 Skill 的判断逻辑。
- 不修改监管解读/义务拆解 Skill 的 Prompt、输出口径。
- 不修改制度映射 Skill 的匹配规则、置信度标准。
- 不修改 Gap 分析 Skill 对制度型、执行型、混合型的分类。
- 不修改整改落地 Skill 的四维整改口径。
- 不把低置信度映射自动标为人工确认。
- 不把模拟分析伪装为真实专业结论。
- 不在文件未真实存在时显示“可下载/已生成”。

## 4. 尽职调查模块旧资产与可保留功能

### 4.1 当前项目内旧尽调页面

- [diligence/index.html](/Users/hanshuting/Desktop/合规平台/diligence/index.html:1)
- [diligence/script.js](/Users/hanshuting/Desktop/合规平台/diligence/script.js:1)
- [diligence/styles.css](/Users/hanshuting/Desktop/合规平台/diligence/styles.css:1)
- [diligence/knowledge_library/manifest.json](/Users/hanshuting/Desktop/合规平台/diligence/knowledge_library/manifest.json)
- `diligence/knowledge_library/files/*`
- `diligence/assets/*`

### 4.2 外部旧尽调项目位置

主平台代理的旧后端路径：

- `/Users/hanshuting/Desktop/dtt工作/尽职调查/due_diligence_assistant_demo/server.py`

旧项目数据与素材：

- `/Users/hanshuting/Desktop/dtt工作/尽职调查/database/schema.sql`
- `/Users/hanshuting/Desktop/dtt工作/尽职调查/database/sme_due_diligence_demo.db`
- `/Users/hanshuting/Desktop/dtt工作/尽职调查/artifacts/csv`
- `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets`
- `/Users/hanshuting/Desktop/dtt工作/尽职调查/risk_house_svg_preview`

### 4.3 可保留功能清单

可保留并迁移到新平台框架：

- 企业/对象列表与搜索。
- 当前对象详情 API。
- 洞察任务状态、步骤、发现。
- 风险画像维度、风险等级、风险评分。
- 风险地图和区域风险预览。
- 风险屋/风险模块交互。
- 监控预警名单、预警详情、趋势和建议。
- 报告类型中心。
- 尽调报告生成。
- 报告预审。
- 报告编辑画布。
- 引用来源/证据溯源。
- 知识库文件分类、预览、下载。
- 材料上传与补件。
- 旧 Skill Pipeline 调用方式。

需要改造后保留：

- 将“企业”泛化为“尽调对象”。
- 将授信场景文案改为托管对象准入、存续期复评、专项核查。
- 将旧页面内的 report center/detail 与主平台标准详情页统一。
- 将旧样式改为平台统一设计系统。

不建议保留：

- 旧宇宙背景、过度装饰、低对比度文字。
- 根路径路由 `/risk-map`、`/report-center` 等。
- 旧图片名和缺失图片引用。
- 旧大页面里混杂多套导航的结构。

## 5. 视觉素材检查

### 5.1 当前项目已有素材

当前 `diligence/assets` 已有：

- `astraea-logo.png`
- `astraea-topbar-logo.png`
- `astraea-mark.svg`
- `astraea-hero-portrait.png`
- `astraea-portrait.png`
- `astraea-home-assistant.png`
- `astraea-assistant.png`
- `astraea-emblem.png`
- `logo.png`
- `risk-map-china.png`

这些可以作为人物形象、品牌标识、风险地图素材的候选。

### 5.2 当前项目缺失或不完整的素材

发现的问题：

- [diligence/script.js](/Users/hanshuting/Desktop/合规平台/diligence/script.js:3) 引用 `./assets/agent-home-assistant.png`，但当前目录没有该文件，实际访问为 404。
- 当前项目没有发现 `risk-house.png`，但外部最新/旧项目的 `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets/risk-house.png` 存在。
- 当前项目没有独立的关系图谱图片、节点图谱素材、报告封面素材、任务插画素材。
- 风险屋有 React/Vite 预览项目：`/Users/hanshuting/Desktop/dtt工作/尽职调查/risk_house_svg_preview`，但尚未接入当前平台。

### 5.3 后续需要确认或提供的素材路径

如果最新尽调项目素材不以当前 `diligence/assets` 为准，请后续提供以下文件或目录：

- 最新人物形象：例如 `assets/persona/*.png` 或指定主图。
- 最新首页主视觉：用于尽调首页标题右侧。
- 最新任务插画：用于新建尽调任务、空状态。
- 最新风险画像/风险屋素材：例如 `risk-house.png` 或 SVG/组件路径。
- 最新关系图谱视觉：节点、边、风险高亮样式或示例截图。
- 最新报告封面/报告图表素材。
- 最新风险地图底图或区域数据。

可选复用候选：

- `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets/risk-house.png`
- `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets/astraea-portrait.png`
- `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets/astraea-assistant.png`
- `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets/risk-map-china.png`

## 6. 当前问题清单

### 6.1 路由和跳转问题

- 主平台没有 URL 路由，视图切换后地址栏不变。
- 浏览器前进/后退无法恢复模块、Tab 或详情状态。
- 主平台 `setView()` 不做滚动复位，长页面切换后可能停留在旧滚动位置。
- 旧尽调页内部路由使用 `/risk-map` 等根路径，刷新可能回到主平台 `index.html`。
- 主平台尽调嵌入页和 `/diligence/index.html` 完整旧页是两套入口和两套详情结构。
- 首页卡片和侧边栏进入的是同一主平台 view，但旧尽调完整页另有独立入口，后续必须统一。

### 6.2 输入框和交互问题

- 主平台研究台 textarea 静态可输入，但“生成分析任务”按钮无绑定动作。
- 研究台上传会被全局文件上传逻辑当作外规上传，只上传第一个文件。
- 旧尽调里有多处 `render()` 后重建 DOM 的输入逻辑，部分输入状态靠全局 state 保留，迁移时要逐项验证。
- 旧尽调有报告编辑器、搜索框、补件手动编辑等复杂输入，不能简单复制到新页面后假定可用。

### 6.3 组件重复和样式不一致

- 主平台和旧尽调是两套完全不同视觉系统。
- 主平台偏静态卡片式，旧尽调偏大视觉/复杂背景。
- 卡片、标签、表格、抽屉、报告预览、筛选器没有统一组件。
- PRD 要求金融机构内部管理平台风格，当前首页 hero 和旧尽调宇宙背景都需要收敛。

### 6.4 数据与真实性问题

- `build_analysis()` 是演示启发式，不是专业外规内化 Skill。
- 外规抓取结果中有部分过旧、非托管业务强相关或页面正文噪声较多的记录。
- 尽调样例包含通用上市公司和中小企业授信案例，未完全贴合托管对象。
- 风险监测没有规则数据模型。
- 首页 KPI 为硬编码，容易被误解为真实统计。

### 6.5 自动化验证限制

已完成：

- 静态代码扫描。
- PRD 文本抽取。
- SQLite 表结构检查。
- 主平台 API 连通性检查。
- 旧尽调代理 `/api/companies`、`/api/home-feed` 连通性检查。
- 缺失素材 URL 检查，确认 `agent-home-assistant.png` 为 404。

未完成：

- 本机 Chrome headless 自动化被系统权限中止，未完成浏览器点击/输入自动化验证。

后续实施前建议用可见浏览器或已授权的自动化环境补做：

- 首页入口点击。
- 主平台视图切换滚动位置。
- 尽调输入框输入保留。
- 报告编辑器编辑、搜索、引用跳转。
- 文件上传与按钮状态。

## 7. 分阶段实施计划

### P0：平台骨架、统一导航、路由问题修复、外规内化工作台接入

目标：先把平台变成一个稳定的托管内控工作台骨架，统一导航、路由、页面布局和外规内化五步工作台。P0 不迁移尽调完整功能，不改外规 Skills 专业逻辑。

#### 涉及现有文件

- [index.html](/Users/hanshuting/Desktop/合规平台/index.html:1)
- [app.js](/Users/hanshuting/Desktop/合规平台/app.js:1)
- [styles.css](/Users/hanshuting/Desktop/合规平台/styles.css:1)
- [platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:1)
- [data/platform.db](/Users/hanshuting/Desktop/合规平台/data/platform.db)
- `reports/*.html`
- `docs/*外规内化*`
- `docs/*制度映射*`
- `docs/*Gap分析*`
- `docs/*整改落地*`

#### 计划新增文件

- `docs/platform-information-architecture.md`
- `docs/mock-data-description.md`
- `data/mock-platform.js` 或 `data/mock-platform.json`
- `js/router.js`
- `js/state.js`
- `js/api.js`
- `js/components.js`
- `js/modules/regulatory.js`
- `js/modules/tasks.js`
- `js/modules/artifacts.js`

如果继续保持无构建工具，新增 JS 应使用普通 `<script>` 或 ES module；不建议在 P0 引入 React/Vue。

#### 会修改的页面

- 首页总览：从四张入口卡改为 PRD 要求的 KPI、重点事项、智能体状态、监管变化、尽调进度、风险预警摘要。
- 外规内化首页：从单案例工作台升级为任务列表 + KPI + 最近报告 + 高风险 Gap 摘要。
- 外规内化任务详情页：新增总览、监管原文、监管解读、内规映射、Gap 分析、整改落地、交付物、审阅与留痕 Tab。
- 交付与留痕：至少做文件列表和报告预览框架。
- 任务中心：至少做待复核、待整改、已归档框架。

#### 不会动的现有功能

- 不修改外规内化既有 Skill 文档和 HTML 报告结论。
- 不修改报告中的专业分析口径。
- 不修改旧尽调后端专业逻辑。
- 不删除 `diligence` 旧页。
- 不删除任何现有报告文件。

#### 关键实现点

- 建立统一 App Shell：左侧一级导航 + 顶部栏 + 页面标题区 + 主内容区。
- 一级导航调整为：首页总览、外规内化、尽职调查、风险监测、任务中心、交付与留痕。
- 底部入口：知识与素材、系统设置、当前用户。
- 建立轻量路由：例如 `#/home`、`#/regulatory/tasks/:id`，或 History API；如果使用 hash，需要避免用 hash 做报告内部锚点主导航。
- 每次页面级路由切换后执行主内容区滚动复位。
- Tab 切换不改变页面滚动位置，除非用户进入新详情页。
- 首页卡片、KPI、列表入口都跳到同一套标准详情页。
- 外规内化报告 iframe 保留，但旁边增加结构化表格和证据抽屉。
- `build_analysis()` 标记为 Demo Adapter，不作为专业 Skill。
- 文件交付物只在真实文件存在时显示预览/下载。
- 上传外规、上传内规、研究台上传拆分处理，避免全部进入外规上传。

#### 风险

- 没有构建体系，模块化要控制复杂度。
- 当前 SQLite schema 不支持任务、交付物、审阅留痕，需要谨慎扩展。
- 外规内化真正 Skill 的可执行路径尚未确认，P0 只能先接入现有报告和文件。
- iframe 报告和结构化页面之间的数据一致性需要明确来源。
- 如果继续用根路径 fallback，旧尽调路由仍可能冲突。

#### 需要确认的信息

- 外规内化五个既有 Skills 的真实可执行路径、调用命令或 API 是什么？
- 是否允许新增 SQLite 表：`agent_tasks`、`artifact_files`、`review_records`、`audit_logs`、`remediation_actions`？
- P0 是否以 hash 路由为临时方案，还是要求 History API 并由 Python server 支持路径回退？
- 交付中心是否需要立即支持下载 Word/HTML，还是 P0 只做预览和文件存在性展示？
- 首页 KPI 可否先使用明确标识的 Mock 数据？

### P1：尽职调查功能迁移与最新视觉资产适配

目标：保留旧尽调项目核心业务功能，统一迁移到新平台骨架，并用最新项目视觉资产替换旧视觉和旧排版。

#### 涉及现有文件

- [diligence/index.html](/Users/hanshuting/Desktop/合规平台/diligence/index.html:1)
- [diligence/script.js](/Users/hanshuting/Desktop/合规平台/diligence/script.js:1)
- [diligence/styles.css](/Users/hanshuting/Desktop/合规平台/diligence/styles.css:1)
- [diligence/knowledge_library/manifest.json](/Users/hanshuting/Desktop/合规平台/diligence/knowledge_library/manifest.json)
- `diligence/assets/*`
- [platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:449)
- 外部旧尽调后端 `/Users/hanshuting/Desktop/dtt工作/尽职调查/due_diligence_assistant_demo/server.py`
- 外部旧尽调数据库 `/Users/hanshuting/Desktop/dtt工作/尽职调查/database/sme_due_diligence_demo.db`
- 外部最新素材 `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets`

#### 计划新增文件

- `docs/asset-inventory.md`
- `docs/due-diligence-migration-map.md`
- `js/modules/diligence.js`
- `js/modules/diligence-adapter.js`
- `js/modules/diligence-report.js`
- `js/modules/diligence-evidence.js`
- `js/modules/diligence-graph.js`
- `data/mock-diligence-objects.js` 或 `.json`
- `assets/diligence/*`，用于放置确认后的最新视觉素材。

#### 会修改的页面

- 尽职调查首页。
- 新建尽调任务页/弹窗。
- 尽调任务详情页。
- 对象画像页。
- 洞察任务页。
- 风险研判页。
- 证据验证页。
- 关系图谱页。
- 报告工坊。
- 知识中心。

#### 不会动的现有功能

- 不修改旧尽调后端的报告生成、预审、Skill Pipeline 专业逻辑。
- 不删除旧 `diligence` 页面，迁移完成前保留为对照和兜底。
- 不修改旧知识库文件内容。
- 不删除旧样例数据。
- 不把旧授信尽调结果伪装成托管真实尽调结论。

#### 关键实现点

- 建立“旧功能 -> 新平台页面 -> 最新视觉资产”的迁移映射。
- 用“尽调对象”替代“企业”作为通用命名。
- 支持对象类型：管理人、产品、交易对手、外包机构、销售机构、关联方、底层资产相关主体。
- 主平台尽调入口和旧完整页入口统一到同一套详情页。
- 将旧 report center 的报告生成、预审、编辑、导出迁到“报告工坊”。
- 将旧风险画像/风险屋迁到“对象画像”和“风险研判”。
- 将旧知识库迁到平台统一“知识与素材/知识中心”。
- 修复 `agent-home-assistant.png` 缺失引用，改用确认后的最新素材。
- 接入 `risk-house.png` 或风险屋 SVG 组件。
- 关系图谱一期可使用真实可交互 Mock 节点，不要求图计算。

#### 风险

- 旧尽调页面非常大，直接搬迁容易引入重复页面和重复状态。
- 旧路由和主平台路由冲突，需要先做路由归一。
- 旧数据以企业/授信为中心，PRD 要求托管对象泛化，需要数据 Adapter。
- 最新视觉资产是否完整尚未确认。
- 报告编辑器和引用溯源交互复杂，需要单独回归。
- 外部旧尽调目录在当前项目外，部署时需要明确是否复制、代理还是重建接口。

#### 需要确认的信息

- 最新尽调项目的最终素材目录是哪一个？是否可以使用 `/Users/hanshuting/Desktop/dtt工作/尽职调查/public/assets`？
- 是否允许把 `risk-house.png` 和其他最新素材复制到当前项目 `assets/diligence`？
- P1 中是否继续代理旧尽调后端，还是将 API/数据迁入当前 `platform_server.py`？
- 尽调对象一期优先支持哪些类型：管理人、产品、交易对手、外包机构，还是先做管理人/产品？
- 旧授信企业样例是否保留为“演示数据”，还是需要替换为托管业务对象样例？
- 报告导出一期是否必须真实生成 PDF/Word，还是沿用旧后端 PDF 入口？

### P2：风险监测规则库、预警中心和处置台账框架

目标：完成规则、预警、处置、执行记录的可演示闭环。P2 一期只使用清晰标记的托管场景 Mock 数据，不做模型自由判断，不接生产数据源。

#### 涉及现有文件

- [index.html](/Users/hanshuting/Desktop/合规平台/index.html:171)
- [app.js](/Users/hanshuting/Desktop/合规平台/app.js:1)
- [styles.css](/Users/hanshuting/Desktop/合规平台/styles.css:1)
- [platform_server.py](/Users/hanshuting/Desktop/合规平台/platform_server.py:1)
- [data/platform.db](/Users/hanshuting/Desktop/合规平台/data/platform.db)

#### 计划新增文件

- `js/modules/monitoring.js`
- `js/modules/monitoring-rules.js`
- `js/modules/monitoring-alerts.js`
- `js/modules/monitoring-ledger.js`
- `data/mock-monitoring-rules.js` 或 `.json`
- `data/mock-risk-alerts.js` 或 `.json`
- `docs/risk-monitoring-rule-model.md`

如允许扩展 SQLite，新增表：

- `monitoring_rules`
- `risk_alerts`
- `alert_disposition_records`
- `rule_execution_runs`
- `rule_execution_logs`
- `evidence_items`

#### 会修改的页面

- 风险监测总览。
- 监测规则库。
- 规则详情页。
- 预警中心。
- 预警详情页。
- 异常处置台账。
- 规则执行记录。

#### 不会动的现有功能

- 不修改外规内化 Skills。
- 不修改尽调报告生成/预审逻辑。
- 不接生产托管系统数据。
- 不把 Mock 预警展示为真实风险事件。
- 不让大模型自由判断是否预警。

#### 关键实现点

- 规则库字段按 PRD 设计：规则编号、规则名称、业务领域、外规依据、内规依据、监测对象、指标口径、计算公式、阈值、执行频率、数据源、状态、最后执行时间、负责人。
- 预警中心字段按 PRD 设计：预警编号、预警等级、规则名称、监测对象、异常摘要、触发时间、状态、责任人、截止日期。
- 处置台账按闭环状态：待核查、已确认异常、处理中、待复核、已关闭、已豁免。
- 每条 Mock 规则和 Mock 预警明确显示“演示数据，尚未接入生产数据源”。
- 规则详情必须展示依据、指标、阈值、数据快照、执行日志。
- 预警详情必须展示规则依据、数据快照、异常原因、影响范围、处置建议、人工复核、整改记录、操作日志。

#### 风险

- 真实托管监测规则尚未提供，Mock 规则只能作为框架演示。
- 阈值、指标口径、数据源如果没有业务确认，不能进入“真实规则”状态。
- 风险监测容易被误做成 AI 文本判断，必须坚持规则引擎链路。
- 如果 P0 未完成统一任务/证据/留痕组件，P2 会重复造组件。

#### 需要确认的信息

- 一期规则 Mock 是否可使用以下托管场景：投资比例、集中度、估值偏离、清算时效、信息披露、监管报送、账户异常、关联交易、数据安全、业务连续性？
- 是否需要为每条规则提供外规/内规示例条款？
- 预警处置流程是否需要角色：业务经办、合规复核、风险审批、内审查看？
- P2 是否需要导出 Excel 台账？
- 是否允许新增风险监测 SQLite 表？

## 8. 设计改造原则

设计判断读取：这是金融机构内部管理平台，不是营销型 AI 网站。视觉应专业、克制、任务导向、证据导向，信息密度中高。

设计原则：

- 不做大面积 AI 紫渐变、宇宙背景、装饰性 3D。
- 主背景以白色/极浅中性背景为主。
- 风险、状态、任务、证据是视觉重点。
- 统一风险标签：高风险、中风险、低风险、未评级。
- 统一状态标签：进行中、待复核、待整改、已完成、已关闭、已归档。
- 表格和筛选器要可读，桌面 1440px 为主要适配目标。
- 人物形象、风险屋、关系图谱只作为内容资产，不作为整页背景。
- 不把卡片套卡片。
- 不用长篇欢迎语占据首屏。
- 每个按钮要有动作、禁用状态或明确提示。

建议沉淀的基础组件：

- `AppShell`
- `PageHeader`
- `SectionCard`
- `KpiCard`
- `StatusBadge`
- `RiskBadge`
- `FilterBar`
- `SearchInput`
- `DataTable`
- `EvidenceDrawer`
- `TaskTimeline`
- `ReviewPanel`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `ReportPreview`
- `AssetVisual`

## 9. 实施前必须确认的总问题

1. 外规内化真实 Skills 的可执行位置、调用方式、输入输出协议。
2. 是否允许扩展 SQLite schema。
3. 是否允许新增 `js/`、`data/mock-*`、`assets/diligence/` 等目录。
4. 最新尽调视觉资产的权威来源。
5. P0 是否必须先交付 `docs/asset-inventory.md` 和 `docs/due-diligence-migration-map.md`，还是放到 P1 开始时交付。
6. 旧尽调完整页是否保留为隐藏兜底入口，直到 P1 全量迁移完成。
7. 首页和风险监测 Mock 数据的展示口径。
8. 是否需要兼容无后端、直接打开 HTML 的演示方式，还是以后都通过 `platform_server.py` 运行。

## 10. 建议的下一步

等待确认实施范围后，再开始 P0。

推荐优先确认：

- 外规内化 Skills 接入方式。
- 是否允许新增 SQLite 表。
- P0 路由方案。
- 最新尽调素材目录。
- Mock 数据展示口径。

确认后再进入开发，不应现在修改代码。
