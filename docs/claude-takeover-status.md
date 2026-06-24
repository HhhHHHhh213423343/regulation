# Claude 接管状态报告 (claude-takeover-status)

> 生成时间：2026-06-24
> 接管人：Claude (Opus 4.8)
> 项目路径：`/Users/hanshuting/Desktop/合规平台/`
> 前序开发：Codex

## 0. 重要前置说明：工作目录纠偏

接管指令在 `/Users/hanshuting/Desktop/dtt工作/尽职调查` 目录被发起，但该目录是**另一个项目**（尽职调查 / Astraea 风险平台，原生 HTML+SQLite，是一个干净的 git 仓库）。

指令中描述的「托管内控智能化平台」全部证据（`platform_server.py`、`docs/` 五个 Skill Word 文档、`skills_runtime/`、`.env`、邮储历史 HTML 报告）**只存在于 `/Users/hanshuting/Desktop/合规平台/`**。因此本次所有接管与开发工作均在 `合规平台/` 进行。

- `合规平台/` **不是 git 仓库**（`git status` 报 `not a git repository`）。这意味着 Codex 留下的全部改动都未受版本控制——「不要覆盖/删除未提交改动」的要求在这里等价于「不要破坏现有任何文件」。
- 因为没有 git，本报告无法提供 `git diff`；改用「文件 + 数据库 + 运行产物」实测来替代历史 diff。

## 1. 检查记录（实测，非历史说明）

### 1.1 目录结构（合规平台根目录）

```
platform_server.py        后端单文件 HTTP 服务（58KB）
app.js / index.html / styles.css   原生前端（无框架）
skills_runtime/           Skill 执行引擎（Python 包）
  registry.py             Skill 注册表（当前仅 regulatory-decomposer）
  models.py / run_manager.py / audit_logger.py / artifact_manager.py
  document_parser.py      .docx/.txt/.md 解析（zip+XML，无需 python-docx）
  clause_splitter.py      条款切分 + 义务类型 + 12 类监管动作
  llm_client.py           DeepSeek/OpenAI 兼容客户端（后端读 .env）
  regulatory_scanner.py   监管识别 v1 扫描器
  prompts/                regulatory_decomposer.md / regulatory_scanner.md
  runners/                regulatory_decomposer_runner.py（仅此一个）
  report_generators/      regulatory_decomposer_report.py（空壳 stub）
data/
  platform.db             SQLite（11 张表）
  skill_runs/             2 次真实监管解读运行产物
  structured_outputs/     run 级结构化输出
  regulatory_snapshots/   扫描快照
reports/                  4 个历史 HTML 报告（mapping/gap/remediation/full-flow）
docs/                     PRD、计划、五个 Skill Word 文档、邮储历史 HTML
diligence/                内嵌的尽调 Demo 静态副本
uploads/                  上传暂存
.env / .env.example       LLM 配置（.env 已含真实 DeepSeek key，已被 .gitignore 忽略）
```

### 1.2 docs/ 文件清单

- 计划/规格类（可读写）：`implementation-plan.md`、`p0-change-log.md`、`regulatory-decomposer-mvp-spec.md`、`skill-runtime-implementation-plan.md`、`skill-runtime-and-structured-output-plan.md`、`regulatory-scanner-v1-test-report.md`、`api-key-security-guide.md`
- **五个原始 Skill Word 文档（只读，禁止修改）**：`监管识别。skill(1).docx`、`监管解读(1).docx`、`制度映射(1).docx`、`Gap分析(1).docx`、`整改落地(1).docx`
- 历史交付物 HTML（只读案例基准）：`外规内化全流程报告_PBOC2026第4号(1).html`、`邮储银行托管业务制度合规对标映射报告(1).html`、`邮储银行托管业务制度合规差距分析报告(1).html`
- 历史结果 docx：`制度映射(1).docx`/`Gap分析(1).docx`/`整改落地(1).docx`/`监管解读(1).docx` 同名既是 Skill 也是样例（以 Skill 专业逻辑为准，不改）

### 1.3 SQLite 表结构（11 张表）

| 表 | 用途 | 行数 |
|---|---|---|
| `regulatory_cases` | 外规内化任务/案例 | 12 |
| `regulatory_documents` | 扫描发现的监管文件 | 7 |
| `regulatory_document_snapshots` | 文件正文快照 | 8 |
| `regulatory_fetch_logs` | 抓取事件日志 | 25 |
| `regulatory_scan_runs` | 扫描运行（含漏斗计数列） | 3 |
| `regulatory_scan_source_diagnostics` | 每来源诊断（http/raw/各级筛选/正文/附件/错误警告） | 12 |
| `regulatory_scrape_runs` | 旧版轻量抓取运行 | 7 |
| `regulatory_sources` | 监管来源定义 | 0（来源在 scanner 代码内硬编码） |
| `regulatory_uploads` | 外规/内规上传登记 | 0 |
| `skill_runs` | 通用 Skill 运行索引 | 2 |
| `sqlite_sequence` | — | — |

> `regulatory_scan_source_diagnostics` 已覆盖接管要求的全部来源证据字段（原始候选/日期筛选/类型筛选/托管相关性前后/去重/正文/附件/HTTP 状态/最终 URL/错误/警告）。

## 2. 当前「真实能力」（已实测可用）

1. **LLM 通路真实可用**：`run_smoke_test()` 实测返回 `{"status":"ok"}`，DeepSeek 文本 + JSON 模式均通过。`.env` 配置 `LLM_BASE_URL=https://api.deepseek.com`、`model_fast=deepseek-v4-flash`，API Key 已设（长度 35，未在任何输出中暴露）。
2. **监管解读 Agent（regulatory-decomposer）真实可运行**：
   - 真实运行 2 次：`RUN-REGULATORY_D-20260624162124-263`、`RUN-REGULATORY_D-20260624164455-681`（均 `review_required`）。
   - run 681 实测产出 **14 条条款 + 14 条监管要求**，五维结构（监管意图/要求/适用对象/操作要求/检查重点）含真实中文语义（银行间债券市场登记托管结算主题），非 Mock。
   - 完整持久化：`run.json`、`parsed_document.json`、`clauses.json`、`output.json`、`audit.log`、`inputs/`，并写入 `skill_runs` 表与 `structured_outputs/`。
3. **文件解析与条款切分真实可用**：`document_parser.py`（.docx 走 zip+XML，无 python-docx 依赖）+ `clause_splitter.py`（第X条切分、义务类型六分类、12 类监管动作）。
4. **监管识别扫描 v1 部分真实**：
   - PBOC 完成过真实端到端：列表页 HTTP 200、原始候选 21~22、解析出文件、`中国人民银行令〔2026〕第4号` 被分类 `custody=high`、创建为 case `6855485431f4fa6221b9`，并真实喂入监管解读 run 681。
   - 四来源诊断证据已落库（PBOC/NFRA/CSRC/SAFE 各有 HTTP 200 与 raw 候选计数）。
5. **API 面真实存在**：`/api/health/llm`、`/api/health/llm/smoke`、`/api/skills`、`/api/skills/runs/:id`、`/api/skills/regulatory-decomposer/runs(-from-case)`、`/api/skills/runs/:id/review`、`/api/regulatory/scanner/*`、`/api/regulatory/cases`、`/api/regulatory/upload` 等。
6. **审计与复核骨架真实存在**：`audit_logger.append_event`、`handle_skill_review` 写 `review.json`。

## 3. 当前「仅 Mock / 历史案例 / 演示」状态的能力

1. **内规映射 / Gap 分析 / 整改落地三个 Agent 尚无执行引擎**：`runners/` 下只有 decomposer，`registry.py` 只注册 decomposer。前端 mapping/gap/remediation 三个 Tab 当前**嵌入历史 HTML 报告**（`reports/regulatory-*.html`），属「历史案例结果」，非本次实时运行。
2. **报告交付物生成是空壳**：`report_generators/regulatory_decomposer_report.py` 的 `generate()` 直接 `return []`，即便监管解读也尚未真正产出 HTML/Word/Excel 交付物。`/api/skills/runs/:id/artifacts` 端点尚未实现。
3. **`build_analysis()` 是旧启发式演示**（platform_server.py:513），不是专业 Skill，不得作为外规内化结果展示；`handle_reanalyze` 仍在用它。
4. **NFRA/CSRC/SAFE 正文抓取基本失败**：NFRA 是 Angular 空壳、CSRC `common_list.shtml`、SAFE 列表页——`body_parse_success_count` 多为 0~1。这些来源应显示 Beta/待接入，不得伪装成功。
5. **CSRC 来源是「政策解读/新闻」类栏目**，按要求只能作辅助信息，不能作正式外规库；正式法规栏目状态应为 Beta。
6. `regulatory_sources` 表为空、`regulatory_uploads` 表为空（上传走文件系统 + 该表登记，但尚无内规上传被真正消费）。

## 4. 当前未完成 / 中断的代码

- `report_generators/regulatory_decomposer_report.py`：stub，未实现。
- 三个下游 runner（mapping/gap/remediation）：不存在。
- `registry.py`：缺四个下游 Skill 注册条目。
- artifacts API（生成 HTML/Word/Excel/JSON 交付物）：未实现。
- 前端 mapping/gap/remediation/artifacts Tab：仍为 iframe 历史报告，未改为结构化工作台。
- 审阅留痕 Tab：未接入真实后端运行模型/操作日志。

## 5. 未提交改动风险

- `合规平台/` 非 git 仓库 → 所有 Codex 产物无版本兜底。本次开发**只新增/谨慎修改**，不删除既有文件；新增 runner/report generator/registry 条目/API 为主，对 `platform_server.py`、`app.js` 采用追加式修改。
- `.env` 含真实 DeepSeek Key，已被 `.gitignore` 忽略；本报告及任何代码/日志均不输出 Key 内容。
- `data/platform.db` 与 `data/skill_runs/` 是真实运行产物，不重置、不清空。

## 6. 可继续复用的模块（保留）

- `skills_runtime/`：registry / models / run_manager / document_parser / clause_splitter / llm_client / audit_logger —— 设计干净，下游三个 Agent 直接复用同一 Runtime 与持久化范式。
- `regulatory_decomposer_runner.py` 的 run/compose/review 模式 —— 作为三个下游 runner 的模板。
- `platform_server.py` 的路由分发、`index_skill_run`、`respond_json`、FieldStorage 上传 —— 直接扩展。
- `regulatory_scan_source_diagnostics` 表 —— 已满足来源证据展示要求。
- 历史 HTML 报告（`reports/`、`docs/邮储*.html`）—— 作为回归基准与交付物预览，只读。

## 7. 不应覆盖的模块

- **`docs/` 下五个原始 Skill Word 文档**（监管识别/监管解读/制度映射/Gap分析/整改落地）—— 专业逻辑唯一来源，禁止任何修改。
- `.env`、真实 API Key。
- `data/platform.db` 既有数据、`data/skill_runs/` 既有运行产物。
- 既有历史 HTML 报告内容。
- 已验证可用的监管解读 runner 核心链路（仅做增量完善，不重写）。

## 8. 接管后开发计划（已开始执行，不止于计划）

1. 完善监管解读 Agent 字段覆盖（补主体/时限/监管动作/原文摘录的强约束）。
2. 新增内规映射 Agent：内规条款切分 + 关键词/BM25 候选 + DeepSeek 复核，低置信度默认 `review_required`。
3. 新增 Gap 分析 Agent：满足/部分满足/未满足 × 高/中/低风险 × 制度型/执行型/混合型。
4. 新增整改落地 Agent：制度/流程/系统/控制点四维，草案标注「AI 辅助草案，须经法律合规部门审查」。
5. 前端 7 Tab 改为结构化工作台（上游输入摘要/执行/状态/结构化结果/证据/复核/重跑）。
6. 实现 HTML/Word/Excel/JSON 交付物生成。
7. 用邮储托管历史案例回归，产出 `docs/external-regulation-internalization-v1-regression-report.md`。

> 交付边界：完成上述 1–7 后停止，不进入尽职调查 P1、风险监测 P2、前端大重构、知识图谱、生产级全量抓取。
