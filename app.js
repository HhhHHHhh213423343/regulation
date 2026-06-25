const pages = {
  home: {
    title: "首页总览",
    subtitle: "以外规内化、尽职调查和风险监测为核心的托管内控工作台。",
    breadcrumb: "首页总览",
    kicker: "银行托管内控",
  },
  regulatory: {
    title: "外规内化",
    subtitle: "将外部监管要求转化为托管业务可执行的制度、流程、控制点与整改任务。",
    breadcrumb: "首页总览 / 外规内化",
    kicker: "外规内化",
  },
  diligence: {
    title: "尽职调查",
    subtitle: "保留当前可用入口；功能迁移与视觉资产适配后续推进。",
    breadcrumb: "首页总览 / 尽职调查",
    kicker: "智能尽职调查",
  },
  monitoring: {
    title: "风险监测",
    subtitle: "基于托管业务日常运营全流程的内控控制目标库，按控制点持续监测运行状态。",
    breadcrumb: "首页总览 / 风险监测",
    kicker: "风险监测",
  },
};

const routeToView = {
  "/": "home",
  "/regulatory": "regulatory",
  "/foreign-regulation": "regulatory",
  "/diligence": "diligence",
  "/monitoring": "monitoring",
};

const FOREIGN_REGULATION_BASE = "/foreign-regulation";
const DEMO_TASK_ID = "pboc-2026-04";
const LEGACY_SHOWCASE_CASE_ID = "PBOC-2026-004-PSBC-CUSTODY";
const REGULATORY_SHOWCASE_ID = DEMO_TASK_ID;
const detailTabToRoute = {
  overview: "overview",
  source: "source",
  interpretation: "interpretation",
  mapping: "mapping",
  gap: "gap-analysis",
  remediation: "rectification",
  artifacts: "deliverables",
  audit: "review",
};
const routeTabToDetail = Object.fromEntries(Object.entries(detailTabToRoute).map(([key, value]) => [value, key]));

const regulatoryDetailTabs = [
  { id: "overview", routeKey: "overview", title: "总览" },
  { id: "source", routeKey: "source", title: "监管原文" },
  { id: "interpretation", routeKey: "interpretation", title: "监管解读" },
  { id: "mapping", routeKey: "mapping", title: "内规映射" },
  { id: "gap", routeKey: "gap-analysis", title: "制度差距分析" },
  { id: "remediation", routeKey: "rectification", title: "整改落地" },
  { id: "artifacts", routeKey: "deliverables", title: "交付物" },
  { id: "audit", routeKey: "review", title: "审阅与留痕" },
];

const stepToDetailTab = {
  identify: "source",
  decompose: "interpretation",
  mapping: "mapping",
  gap: "gap",
  remediation: "remediation",
};

// 统一中文展示映射：底层技术标识（skill_id/status/run_id）保留在数据层，
// 仅在面向业务用户的展示处转换为中文，原始 ID 收入“技术信息”折叠区。
const ZH_SKILL = {
  "regulatory-discovery": "监管识别",
  "regulatory-scanner": "监管识别",
  "regulatory-decomposer": "监管解读",
  "regulatory-mapping": "内规映射",
  "regulation-gap-analysis": "制度差距分析",
  "remediation-implementation": "整改落地",
};
const ZH_STATUS = {
  review_required: "待人工复核",
  pending: "等待执行",
  queued: "排队中",
  running: "执行中",
  completed: "已完成",
  succeeded: "已完成",
  failed: "执行失败",
  partial: "部分完成",
  "engine-not-configured": "执行引擎未配置",
  approved: "复核通过",
  changes_requested: "要求修改",
  in_review: "复核中",
  not_run: "未运行",
  ok: "正常",
};
const ZH_ARTIFACT = { html: "查看网页报告", docx: "下载文档", xlsx: "下载表格", json: "下载结构化数据", md: "下载文本报告" };
// 尽调后端数据中的英文枚举/模板 → 中文（后端为 POC 数据，含有限且模板化的英文）
const DIL_BAND = { strong: "优秀", good: "良好", watch: "关注", weak: "偏弱", fair: "一般", medium: "中等", stable: "稳健", pass: "通过", fail: "未通过", warn: "预警" };
const DIL_SEVERITY = { high: "高", medium: "中", low: "低", info: "提示", 高: "高", 中: "中", 低: "低" };
const DIL_DIMENSION = {
  credit_history: "信用历史",
  repayment_capacity: "偿债能力",
  operational_stability: "经营稳定性",
  innovation_strength: "创新能力",
  risk_mitigation: "风险缓释",
  public_financial_quality: "公开财务质量",
  public_leverage: "公开杠杆水平",
  public_profitability: "公开盈利能力",
};
const DIL_GROUP = {
  industry_insight: "行业洞察", listing_info: "上市信息", public_profile: "公开档案",
  registration: "工商登记", shareholder_summary: "股东摘要",
  basic: "工商基本", finance: "财务概览", governance: "治理结构", operation: "经营情况",
};
const DIL_EVENT = {
  regulatory_attention: "监管关注",
  information_disclosure: "信息披露",
  admin_notice: "行政提示",
  labour_dispute: "劳动争议",
  contract_dispute: "合同争议",
  environmental_check: "环保核查",
  payment_delay: "回款延迟",
  judicial_notice: "司法提示",
};
const DIL_RELATION = {
  affiliate_supplier: "关联供应商",
  subsidiary: "子公司",
  service_affiliate: "服务关联方",
  affiliate_service_company: "关联服务公司",
  shareholder: "股东",
  core_subsidiary: "核心子公司",
  major_operating_entity: "主要经营主体",
  affiliate_supply_chain: "关联供应链",
  controlling_shareholder: "控股股东",
  affiliate: "关联方",
  major_shareholder: "主要股东",
  shareholder_group: "股东集团",
  actual_controller: "实际控制人",
  group_affiliate: "集团关联方",
};
const DIL_TRANSACTION = {
  purchase: "采购",
  equity_relation: "股权关系",
  component_supply: "零部件供应",
  component_purchase: "零部件采购",
  vehicle_production_settlement: "整车生产结算",
  brand_license_and_group_service: "品牌授权及集团服务",
  procurement_and_service: "采购及服务",
  capital_support: "资金支持",
  fund_transfer: "资金往来",
  state_owned_coordination: "国资协同",
  channel_settlement: "渠道结算",
  capital_and_service: "资金及服务往来",
  management_service: "管理服务",
};
const DIL_PHRASES = {
  "Leverage remains elevated for public-company sample": "上市公司样本杠杆水平偏高",
  "Public leverage level warrants peer-based interpretation.": "公开杠杆水平需结合同业进一步解读。",
  "Operating cash conversion is weaker than net profit": "经营性现金流转化弱于净利润",
  "Weak cash conversion can reduce confidence in profit quality.": "现金转化偏弱会削弱对利润质量的信心。",
  "Capex scale exceeds operating cash support": "资本开支规模超出经营性现金支撑",
  "Capital expenditure in the latest annual period is materially above operating cash flow.": "最新年度资本开支显著高于经营性现金流。",
  "Large capex may require financing support or balance-sheet explanation.": "大额资本开支可能需要融资支持或资产负债表层面的解释。",
  "Financial quality from public statements": "基于公开财报的财务质量",
  "Leverage read from public balance sheet": "基于公开资产负债表的杠杆水平",
  "Profitability read from public indicators": "基于公开指标的盈利能力",
  "credit_history score derived from seeded demo evidence.": "基于样例授信与信用记录推导。",
  "repayment_capacity score derived from seeded demo evidence.": "基于样例现金流、杠杆与偿债覆盖推导。",
  "operational_stability score derived from seeded demo evidence.": "基于样例经营、订单与回款稳定性推导。",
  "innovation_strength score derived from seeded demo evidence.": "基于样例研发、知识产权与资质信息推导。",
  "risk_mitigation score derived from seeded demo evidence.": "基于样例担保、缓释措施与复核要求推导。",
  "Revenue and bank inflow diverge in Q4": "四季度收入与银行流入存在差异",
  "December self-reported revenue exceeded verified bank inflow by more than 20 percent.": "12 月自报收入较已核验银行流入高出 20% 以上。",
  "Weakens confidence in short-term collection quality.": "削弱短期回款质量的可信度。",
  "Power usage fell while revenue accelerated": "用电下降但收入加速增长",
  "Power consumption trended down for three months while shipped value increased materially.": "用电量连续三个月下降，但出货金额明显增加。",
  "Requires manual check on outsourced production and revenue recognition timing.": "需要人工核验外协生产与收入确认时点。",
  "Top five customer concentration is elevated": "前五大客户集中度偏高",
  "Top five customers contributed about 76 percent of revenue.": "前五大客户贡献收入约 76%。",
  "Any delay from the top customer could materially affect repayment.": "主要客户延迟回款可能显著影响偿付能力。",
  "Contract receipts lag invoice rhythm": "合同回款滞后于开票节奏",
  "Two key contracts were substantially invoiced before corresponding cash receipts arrived.": "两个重点合同已大额开票，但对应现金回款尚未同步到位。",
  "Raises receivable aging pressure.": "抬升应收账款账龄压力。",
  "R&D capability is well supported": "研发能力支撑较充分",
  "R&D team ratio and software IP portfolio support tech claims.": "研发团队占比和软件知识产权组合可支撑技术能力表述。",
  "Strengthens confidence in product sustainability.": "增强产品持续性的判断信心。",
  "Debt service coverage remains healthy": "偿债覆盖保持健康",
  "Verified monthly collections are above modeled repayment need.": "已核验月度回款高于模型测算偿债需求。",
  "Supports recommended approval.": "支持建议通过。",
  "Project acceptance and receipts are largely aligned": "项目验收与回款基本匹配",
  "Receipts lag contract milestones by less than one billing cycle.": "回款滞后合同节点少于一个账期。",
  "Supports stable project execution quality.": "支持项目执行质量稳定的判断。",
  "Coverage remains adequate": "覆盖水平保持充足",
  "Verified minimum monthly inflow covers modeled repayment by more than 1.6x.": "已核验最低月度流入覆盖模型偿债需求 1.6 倍以上。",
  "Supports approval with equipment collateral add-on.": "支持在增加设备抵押条件下通过。",
  "Coverage is acceptable but thinner than peers": "覆盖可接受但弱于同业",
  "Verified minimum inflow covers modeled repayment by roughly 1.2x.": "已核验最低流入约覆盖模型偿债需求 1.2 倍。",
  "Appropriate for smaller amount or tighter monitoring.": "适合降低额度或加强监测。",
  "Top client contributes sizable deployment revenue": "单一头部客户贡献较大部署收入",
  "Single industrial park client contributes more than one quarter of trailing revenue.": "单一产业园客户贡献近 12 个月收入超过四分之一。",
  "Collection timing may create volatility.": "回款时点可能带来波动。",
  "Hospital project collections are slower than invoice rhythm": "医院项目回款慢于开票节奏",
  "Public hospital receivables are aging beyond standard commercial terms.": "公立医院应收账款账龄超出一般商业账期。",
  "Raises working capital pressure and justifies lower amount.": "抬升营运资金压力，并支持降低授信额度。",
  "Coverage relies on delayed public hospital settlements": "覆盖依赖公立医院延迟结算",
  "Verified bank inflow covers modeled repayment by around 1.15x in weak months.": "弱月份已核验银行流入约覆盖模型偿债需求 1.15 倍。",
  "Buffer is acceptable only with tighter amount and monitoring.": "仅在压降额度并加强监测时缓冲可接受。",
  "One project acceptance lagged by 45 days.": "一个项目验收延迟 45 天。",
  "Collection dispute under mediation; no final judgement yet.": "回款争议仍在调解中，尚无最终判决。",
  "New basic data pushed risk profile for review": "新增基础数据触发风险画像复核",
  "Invoice confirmation variance needs supplementary explanation.": "发票确认差异需要补充解释材料。",
  "Risk indicators shifted toward watch zone": "风险指标进入关注区",
  "Balance sheet equation": "资产负债平衡关系",
  "Total assets should equal liabilities plus equity.": "总资产应与负债及权益合计保持一致。",
  "Revenue minus COGS equals gross profit": "收入减成本等于毛利",
  "Gross profit should bridge cleanly from revenue and cost.": "毛利应能由收入和成本清晰勾稽。",
  "Capex versus fixed asset roll-forward": "资本开支与固定资产滚动勾稽",
  "High variance suggests capex or fixed asset roll-forward needs manual support.": "差异较高，需补充资本开支或固定资产滚动说明。",
  "Cash roll-forward": "现金滚动勾稽",
  "Cash flow statement roll-forward should fully tie.": "现金流量表滚动应能完整勾稽。",
  "Net profit to operating cash conversion": "净利润向经营现金流转化",
  "Large gaps between profit and operating cash need working-capital explanation.": "利润与经营现金流差异较大，需要解释营运资本影响。",
  "Company Profile": "企业概况", "Financial Snapshot": "财务快照",
};
function tz(text) {
  if (text == null) return "";
  let s = String(text);
  if (DIL_PHRASES[s]) return DIL_PHRASES[s];
  if (DIL_BAND[s]) return DIL_BAND[s];
  if (DIL_SEVERITY[s]) return DIL_SEVERITY[s];
  if (DIL_DIMENSION[s]) return DIL_DIMENSION[s];
  if (DIL_GROUP[s]) return DIL_GROUP[s];
  if (DIL_EVENT[s]) return DIL_EVENT[s];
  if (DIL_RELATION[s]) return DIL_RELATION[s];
  if (DIL_TRANSACTION[s]) return DIL_TRANSACTION[s];
  s = s.replace(/Latest debt-to-assets ratio is about ([\d.]+)%\./g, "最新资产负债率约为 $1%。");
  s = s.replace(/Operating cash flow to net profit ratio is about ([\d.]+)x\./g, "经营性现金流与净利润之比约为 $1 倍。");
  s = s.replace(/Capital expenditure[^.]*\./g, "最新年度资本开支显著高于经营性现金流。");
  s = s.replace(/^POC virtual completion:/i, "POC 虚拟补全：");
  return s;
}
function skillLabel(id) { return ZH_SKILL[id] || id || "执行模块"; }
function runStatusLabel(s) { return ZH_STATUS[s] || s || "待处理"; }
function artifactLabel(t) { return ZH_ARTIFACT[(t || "").toLowerCase()] || ((t || "").toUpperCase() || "下载"); }
function runBatchLabel(run) {
  const id = run?.run_id || "";
  const m = id.match(/-(\d{14})-(\d+)$/);
  if (m) return `${skillLabel(run?.skill_id)}-${m[1]}-${m[2]}`;
  return id || skillLabel(run?.skill_id);
}
function techInfo(run) {
  if (!run) return "";
  return `
    <details class="tech-info">
      <summary>技术信息（供审计/排查）</summary>
      <div class="tech-grid">
        <div><span>执行批次 run_id</span><code>${escapeHtml(run.run_id || "—")}</code></div>
        <div><span>任务编号 task_id</span><code>${escapeHtml(run.task_id || "—")}</code></div>
        <div><span>执行模块 skill_id</span><code>${escapeHtml(run.skill_id || "—")}</code></div>
        <div><span>执行指令 prompt</span><code>${escapeHtml(run.prompt_version || "—")}</code></div>
      </div>
    </details>`;
}

const reportArtifacts = [
  {
    name: "外规内化全流程报告",
    type: "网页报告",
    path: "./reports/regulatory-full-flow.html",
    source: "既有输出文件",
    status: "可预览",
  },
  {
    name: "托管业务制度合规对标映射报告",
    type: "网页报告",
    path: "./reports/regulatory-mapping.html",
    source: "既有输出文件",
    status: "可预览",
  },
  {
    name: "托管业务制度合规差距分析报告",
    type: "网页报告",
    path: "./reports/regulatory-gap.html",
    source: "既有输出文件",
    status: "可预览",
  },
  {
    name: "整改落地与内化制度方案",
    type: "网页报告",
    path: "./reports/remediation.html",
    source: "既有输出文件",
    status: "可预览",
  },
  {
    name: "监管识别交付件",
    type: "专业文档",
    path: "./docs/监管识别。skill(1).docx",
    source: "既有文件",
    status: "可下载",
  },
  {
    name: "监管解读交付件",
    type: "文档报告",
    path: "./docs/监管解读(1).docx",
    source: "既有文件",
    status: "可下载",
  },
  {
    name: "制度映射交付件",
    type: "文档报告",
    path: "./docs/制度映射(1).docx",
    source: "既有文件",
    status: "可下载",
  },
  {
    name: "差距分析交付件",
    type: "文档报告",
    path: "./docs/Gap分析(1).docx",
    source: "既有文件",
    status: "可下载",
  },
  {
    name: "整改落地交付件",
    type: "文档报告",
    path: "./docs/整改落地(1).docx",
    source: "既有文件",
    status: "可下载",
  },
];

const fallbackRegulatoryCase = {
  case_id: "PBOC-2026-004-PSBC-CUSTODY",
  regulation_title: "人民银行令〔2026〕第4号",
  regulator: "中国人民银行",
  publish_date: "2026-05-26",
  effective_date: "2026-07-01",
  risk_level: "极重",
  steps: [
    {
      step_id: "identify",
      title: "监管识别",
      status: "已完成",
      summary: "抓取并识别 PBOC 令〔2026〕第4号，完成分类、摘要和风险评级。",
      kpis: ["1份外规", "极重风险", "21天窗口"],
      input_files: ["监管网站/转载链接", "监管原文"],
      outputs: ["结构化摘要", "适用机构", "处罚风险"],
      report: {
        label: "步骤 1/5",
        title: "外规内化全流程报告：监管识别与义务拆解",
        url: "./reports/regulatory-full-flow.html",
      },
    },
    {
      step_id: "decompose",
      title: "监管解读/义务拆解",
      status: "已完成",
      summary: "将监管文件拆成五维义务库，提取监管意图、监管要求、适用对象和检查重点。",
      kpis: ["19条要求", "41个动作", "9项强制"],
      input_files: ["监管识别结果", "监管全文"],
      outputs: ["义务条款", "监管动作", "五维输出"],
      report: {
        label: "步骤 2/5",
        title: "外规内化全流程报告：监管义务拆解",
        url: "./reports/regulatory-full-flow.html",
      },
    },
    {
      step_id: "mapping",
      title: "内规映射",
      status: "已完成",
      summary: "把外规条款逐条映射到示例银行托管业务内部制度，形成覆盖矩阵。",
      kpis: ["49条法规", "16份制度", "24%合规"],
      input_files: ["外规义务库", "16份内部制度"],
      outputs: ["逐条对标映射", "覆盖矩阵", "制度清单"],
      report: {
        label: "步骤 3/5",
        title: "示例银行托管业务制度合规对标映射报告",
        url: "./reports/regulatory-mapping.html",
      },
    },
    {
      step_id: "gap",
      title: "制度差距分析",
      status: "已完成",
      summary: "区分制度型、执行型和混合型差距，避免把执行动作误判为制度修订。",
      kpis: ["25项差距", "8项高风险", "17项制度型"],
      input_files: ["制度映射矩阵", "内部制度现状"],
      outputs: ["差距清单", "风险分级", "整改路线图"],
      report: {
        label: "步骤 4/5",
        title: "示例银行托管业务制度合规差距分析报告",
        url: "./reports/regulatory-gap.html",
      },
    },
    {
      step_id: "remediation",
      title: "整改落地/内化制度",
      status: "已生成",
      summary: "把 差距清单转为制度、流程、系统、控制点四维整改方案和制度草案。",
      kpis: ["4维整改", "6个KCP", "5阶段计划"],
      input_files: ["差距结构化数据", "整改落地"],
      outputs: ["制度草案", "SOP设计", "系统改造清单", "KCP控制点"],
      report: {
        label: "步骤 5/5",
        title: "整改落地与内化制度方案",
        url: "./reports/remediation.html",
      },
    },
  ],
};

let regulatoryCase = cloneFallbackCase();
let activeStepId = regulatoryCase.steps[0].step_id;
let regulatoryCases = [];
let selectedCaseId = DEMO_TASK_ID;
let currentView = "home";
let currentRegulatoryTab = "overview";
let currentRegulatoryDetailCaseId = DEMO_TASK_ID;
let regulatoryDecomposerRun = null;
let regulatoryMappingRun = null;
let regulatoryGapRun = null;
let regulatoryRemediationRun = null;
let regulatorySkillRunsTaskId = null;
let regulatoryLlmHealth = null;
let regulatoryScannerSources = [];
let regulatoryScannerDocuments = [];
let regulatoryScannerLastRun = null;
let regulatoryScannerDiagnostics = [];
let regulatoryShowcase = null;
let diligenceLoaded = false;

// ── 私募基金管理人尽调演示样本 ───────────────────────────────────────
// 平台自有 showcase 数据，不依赖外部尽调后端。整个尽调模块统一围绕“私募基金管理人”：
// 准入尽调（能不能进）→ 管理人画像（它到底怎么样）→ 动态风险监测（进来后持续盯），
// 并与“外规内化”的执行型义务（管理人准入、适当性、关联方、反洗钱）形成闭环。
const CUSTODY_ADMITTANCE_DD = {
  badge: "演示样本",
  notice: "基于预置样板数据展示“私募基金管理人准入尽调”能力，不代表对任何真实管理人的尽调结论。",
  candidates: [
    { code: "PF-001", name: "示例私募证券投资基金管理有限公司", type: "私募证券投资基金管理人", rating: "正常", conclusion: "准予准入（附条件）", current: true },
    { code: "PF-002", name: "示例股权投资基金管理有限公司", type: "私募股权投资基金管理人", rating: "正常", conclusion: "关注·待补充材料", current: false },
    { code: "PF-003", name: "示例量化私募基金管理有限公司", type: "私募证券投资基金管理人", rating: "提示", conclusion: "暂缓准入", current: false },
  ],
  manager: {
    code: "PF-001",
    name: "示例私募证券投资基金管理有限公司",
    type: "私募证券投资基金管理人",
    established: "2016 年",
    controller: "示例投资控股有限公司（持股 65%）",
    admittanceConclusion: "准予准入（附条件）",
    admittanceRating: "BBB · 良好",
    reviewStatus: "待人工复核",
    pendingCount: 3,
  },
  metrics: [
    { label: "管理规模 AUM", value: "86 亿元" },
    { label: "在管私募基金", value: "23 只" },
    { label: "中基协登记", value: "正常 · 普通会员" },
    { label: "成立年限", value: "8 年" },
    { label: "投资经理", value: "12 人" },
    { label: "准入待复核项", value: "3 项" },
  ],
  dimensions: [
    {
      id: "governance", name: "公司治理与股东背景", band: "良好", score: 80,
      summary: "股权与实控人清晰，实缴到位，存在关联私募需穿透。",
      evidence: ["实控人为示例投资控股，持股 65%，股权结构稳定", "注册资本 1.5 亿元，实缴 1.2 亿元", "存在 1 家关联私募机构，需穿透核查与并表监测"],
    },
    {
      id: "investment", name: "投研与管理能力", band: "良好", score: 83,
      summary: "规模与产品线稳健，核心团队成熟，代表产品业绩较好。",
      evidence: ["管理规模 86 亿元，在管私募基金 23 只", "投资经理 12 名，核心团队平均从业 8 年", "代表产品近 3 年年化 12.4%，最大回撤 18%，同类前 1/3"],
    },
    {
      id: "compliance", name: "合规与风控体系", band: "良好", score: 78,
      summary: "中基协登记正常，合规风控独立，存在 1 项已整改关注。",
      evidence: ["中基协登记正常、普通会员，登记编号 P1098765", "设合规风控负责人，制度体系完整", "近 3 年无自律处分 / 行政处罚，1 条整改已闭环"],
    },
    {
      id: "operation", name: "运营与估值核算能力", band: "关注", score: 67,
      summary: "估值与登记已外包、产品全托管，但发生过净值披露延迟。",
      evidence: ["估值与份额登记外包至第三方，全部产品已托管", "近 1 年发生 1 次净值披露延迟（已补披露）", "信息披露及时率 98.6%"],
    },
    {
      id: "reputation", name: "风险事件与声誉", band: "良好", score: 79,
      summary: "无失联 / 异常经营，历史风险事件已企稳，舆情整体正面。",
      evidence: ["中基协无异常经营 / 失联标记", "1 只产品曾净值大幅回撤，目前已企稳", "无重大诉讼仲裁，公开舆情整体正面"],
    },
    {
      id: "related", name: "关联交易与利益冲突", band: "关注", score: 69,
      summary: "与股东方存在资金往来需穿透，防控机制已建立需持续监测。",
      evidence: ["与股东方存在资金往来，需穿透核查", "已建从业人员持基报备、公平交易与异常交易（老鼠仓）监控", "关联私募机构需并表口径持续监测"],
    },
  ],
  pending: [
    "与关联私募机构的穿透核查与并表口径",
    "1 次净值披露延迟的原因与整改闭环",
    "代表产品最大回撤 18% 的风控应对与投资者适当性",
  ],
  // 与“外规内化”执行型监管义务的对应关系（闭环回链）
  obligationLinks: [
    { title: "管理人准入审查", basis: "托管业务管理人准入义务", route: "/foreign-regulation/tasks/pboc-2026-04?tab=rectification" },
    { title: "产品适当性管理", basis: "适当性管理要求", route: "/foreign-regulation/tasks/pboc-2026-04?tab=interpretation" },
    { title: "关联方与关联交易管控", basis: "外规内化差距 M09 · 整改 ACT-019", route: "/foreign-regulation/tasks/pboc-2026-04?tab=gap-analysis" },
    { title: "反洗钱与客户身份识别", basis: "外规内化差距 M13 · 整改 ACT-022", route: "/foreign-regulation/tasks/pboc-2026-04?tab=rectification" },
  ],
  // 管理人画像（“管理人画像”Tab）
  profile: {
    basics: [
      ["统一社会信用代码", "9131DEMO0PF0010001"],
      ["中基协登记编号", "P1098765"],
      ["登记时间", "2016-03"],
      ["机构类型", "私募证券投资基金管理人"],
      ["注册资本 / 实缴", "1.5 亿元 / 1.2 亿元"],
      ["注册地", "上海市"],
      ["经营状态", "正常"],
      ["中基协会员", "普通会员"],
    ],
    shareholders: {
      controller: "示例投资控股有限公司",
      items: [
        ["示例投资控股有限公司", "65%"],
        ["自然人股东 A", "20%"],
        ["员工持股平台", "15%"],
      ],
      note: "存在 1 家关联私募机构（示例股权投资基金管理有限公司），需穿透核查。",
    },
    team: [
      { label: "员工总数", value: "58 人" },
      { label: "投资经理", value: "12 人" },
      { label: "核心高管平均从业", value: "11 年" },
      { label: "近 2 年高管变更", value: "1 人（风控负责人）" },
    ],
    scale: [
      { label: "管理规模 AUM", value: "86 亿元" },
      { label: "在管私募基金", value: "23 只" },
      { label: "策略分布", value: "股票多头 70% / 量化对冲 20% / 其他 10%" },
      { label: "最大单只规模", value: "12 亿元" },
    ],
    performance: {
      product: "示例稳健 1 号",
      items: [
        ["近 3 年年化收益", "12.4%"],
        ["最大回撤", "18%"],
        ["同类排名", "前 1/3"],
        ["成立以来", "正收益"],
      ],
    },
    integrity: [
      { text: "中基协诚信信息正常，无重大失信记录", ok: true },
      { text: "无行政处罚", ok: true },
      { text: "近 3 年 1 条自律关注，已整改闭环", ok: true },
      { text: "非异常经营机构、非失联机构", ok: true },
    ],
  },
  // 动态风险监测（“动态风险监测”Tab）
  monitoring: {
    statusBoard: [
      { label: "中基协公示", value: "正常", tone: "good" },
      { label: "经营状态", value: "正常", tone: "good" },
      { label: "失联标记", value: "无", tone: "good" },
      { label: "异常经营", value: "无", tone: "good" },
    ],
    watchScope: "持续监测对象：示例私募证券投资基金管理有限公司 + 23 只在管私募基金。",
    alerts: [
      { level: "中风险", date: "2026-06-15", title: "关联交易：与股东方资金往来", desc: "监测到与股东方新增资金往来，需穿透核查交易背景与公允性。", action: "要求提供资金用途说明与审批留痕" },
      { level: "中风险", date: "2026-06-10", title: "净值预警：示例进取 2 号近 1 月回撤 12%", desc: "单只产品净值短期大幅回撤，需关注持仓集中度与流动性。", action: "关注后续净值与投资者赎回情况" },
      { level: "低风险", date: "2026-05-28", title: "信息披露：1 只产品净值披露延迟 1 日", desc: "净值披露延迟，已于次日补充披露。", action: "已闭环，纳入运营能力跟踪" },
      { level: "低风险", date: "2026-04-20", title: "高管变更：风控负责人变更", desc: "风控负责人发生变更，已向中基协更新登记。", action: "已核实，持续关注合规体系稳定性" },
    ],
  },
  // 尽调总览（“尽调总览”Tab）：风险雷达（分值越高风险越大）+ 三层分类 + 在管产品组合 + 区域分布
  overview: {
    kpis: [
      { label: "综合准入评分", value: "BBB · 良好" },
      { label: "管理规模 AUM", value: "86 亿元" },
      { label: "在管私募基金", value: "23 只" },
      { label: "在监预警", value: "4 条" },
      { label: "待复核项", value: "3 项" },
    ],
    // 风险雷达模块（score 为风险分，越高越红；layer 三层：micro 管理人自身 / meso 在管产品 / macro 行业政策）
    riskModules: [
      { id: "G", title: "公司治理风险", score: 38, layer: "micro" },
      { id: "C", title: "合规风险", score: 42, layer: "micro" },
      { id: "O", title: "运营估值风险", score: 66, layer: "micro" },
      { id: "R", title: "关联交易风险", score: 64, layer: "micro" },
      { id: "N", title: "产品净值风险", score: 72, layer: "meso" },
      { id: "L", title: "流动性风险", score: 55, layer: "meso" },
      { id: "V", title: "估值差错风险", score: 60, layer: "meso" },
      { id: "P", title: "监管政策风险", score: 58, layer: "macro" },
      { id: "S", title: "行业舆情风险", score: 45, layer: "macro" },
      { id: "B", title: "同业相对风险", score: 50, layer: "macro" },
    ],
    layerLabels: { micro: "微观·管理人自身", meso: "中观·在管产品", macro: "宏观·行业政策" },
    // 在管产品组合：策略分布 + 规模 Top 产品
    portfolio: {
      strategies: [
        { label: "股票多头", value: 70 },
        { label: "量化对冲", value: 20 },
        { label: "其他策略", value: 10 },
      ],
      topProducts: [
        { name: "示例稳健 1 号", scale: "12 亿元", strategy: "股票多头", risk: "低" },
        { name: "示例进取 2 号", scale: "8 亿元", strategy: "股票多头", risk: "中" },
        { name: "示例量化 1 号", scale: "6 亿元", strategy: "量化对冲", risk: "低" },
        { name: "示例稳健 3 号", scale: "5 亿元", strategy: "股票多头", risk: "低" },
      ],
    },
    // 区域分布（在管产品 / 托管对接所在地）
    regions: [
      { label: "上海", value: 9 },
      { label: "北京", value: 6 },
      { label: "深圳", value: 4 },
      { label: "杭州", value: 3 },
      { label: "其他", value: 1 },
    ],
  },
  // 洞察任务（“洞察任务”Tab）：围绕该管理人的尽调任务
  tasks: [
    { id: "T-01", title: "管理人准入尽调（首次）", object: "示例私募证券投资基金管理有限公司", owner: "托管业务部", status: "已完成", level: "低", date: "2026-05-20" },
    { id: "T-02", title: "存续期年度尽调回顾", object: "管理人 + 23 只在管产品", owner: "托管业务部", status: "进行中", level: "中", date: "2026-06-30 截止" },
    { id: "T-03", title: "关联方穿透核查", object: "股东方 / 关联私募机构", owner: "法律合规部", status: "待处理", level: "高", date: "2026-06-28 截止" },
    { id: "T-04", title: "净值异常核查（示例进取 2 号）", object: "示例进取 2 号", owner: "运营核算部", status: "进行中", level: "中", date: "2026-06-20 截止" },
    { id: "T-05", title: "反洗钱与客户身份识别复核", object: "管理人账户开立", owner: "法律合规部", status: "待复核", level: "中", date: "2026-06-25" },
    { id: "T-06", title: "年度现场尽调", object: "管理人办公场所 / 投研团队", owner: "托管业务部", status: "待处理", level: "低", date: "2026-09 计划" },
  ],
  // 尽调报告（“尽调报告”Tab）
  reports: [
    { name: "管理人准入尽调报告", status: "已生成", sections: ["机构概况与股东背景", "六维准入评估", "合规与诚信核查", "准入结论与附加条件"] },
    { name: "存续期尽调报告", status: "草稿", sections: ["规模与产品线变化", "存续期风险事件", "合规与监管跟踪", "持续准入结论"] },
    { name: "关联方穿透专项报告", status: "待生成", sections: ["股权穿透图谱", "关联私募机构", "关联交易与定价", "利益冲突防控"] },
  ],
  // 知识中心（“知识中心”Tab）
  knowledge: {
    categories: [
      { title: "私募监管规则", items: ["私募投资基金监督管理条例", "私募投资基金登记备案办法", "私募证券投资基金运作指引"] },
      { title: "中基协自律规则", items: ["私募基金管理人登记须知", "登记备案相关问题解答", "异常经营 / 失联机构公示机制"] },
      { title: "托管准入标准", items: ["管理人准入尽调标准", "产品准入审核要点", "投资者适当性管理要求"] },
      { title: "尽调清单模板", items: ["管理人准入尽调清单", "关联方穿透核查清单", "存续期尽调要点清单"] },
    ],
    checklist: [
      "营业执照与统一社会信用代码核验",
      "中基协登记状态（正常 / 异常 / 失联）核验",
      "实控人、股东结构与关联方穿透",
      "合规风控负责人与制度体系",
      "在管产品托管与估值外包安排",
      "代表产品历史业绩与最大回撤",
      "诉讼仲裁、行政处罚与自律处分核查",
      "舆情与负面信息扫描",
    ],
  },
};

function admittanceBandTone(band) {
  if (band === "优秀") return "good";
  if (band === "良好") return "ok";
  if (band === "关注") return "watch";
  return "weak";
}

// ── 风险监测：托管业务日常运营流程 × 内控控制目标库（27 个控制目标 / 20 个流程）──
// 来源为托管内控控制目标清单；status 为演示监测状态（正常/关注/预警），与外规内化叙事呼应。
const CUSTODY_CONTROL_OBJECTIVES = [
  { flow: "组织与管理", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标1：控制措施可合理保证托管业务得到有效监督和管理，以及不相容职责分离。" },
  { flow: "合作机构管理", category: "运营控制", status: "关注", objCount: 1, cp: "控制目标2：控制措施可合理保证对合作机构风险信号进行及时跟踪识别，合作风险充分披露。" },
  { flow: "产品准入", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标3：控制措施可合理保证按规定对托管产品准入进行填报、审核和审批。" },
  { flow: "合同管理", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标4：控制措施可合理保证托管业务合同经过各职能岗位审核，托管协议签订前得到适当授权，规范托管业务的工作。" },
  { flow: "账户服务", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标5：控制措施可合理保证开立和管理账户符合托管协议和适用法规要求，并且账户管理的关键信息被准确、及时地传递给委托人或管理人。" },
  { flow: "产品建账与参数设置", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标6：控制措施可合理保证所接收的托管资产被准确、完整和及时地记录。" },
  { flow: "场内清算", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标7：控制措施可合理保证场内清算被准确、及时地执行和记录。" },
  { flow: "场外清算", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标8：控制措施可合理保证场外清算经过授权且被准确、及时地执行和记录。" },
  { flow: "会计估值与核算", category: "运营控制", status: "关注", objCount: 6, cp: "控制目标9-14：合理保证投资收入、相关费用、公司行为、资产估值、账务核对与会计资料保管的准确、完整、及时与安全。" },
  { flow: "投资监督", category: "运营控制", status: "关注", objCount: 1, cp: "控制目标15：控制措施可合理保证托管人根据法律法规、相关合同或投资指引，建立并维护对资产管理人的投资运作监督事项，并及时监控资产管理人的投资运作。" },
  { flow: "重要物品保管", category: "运营控制", status: "正常", objCount: 2, cp: "控制目标16-17：合理保证实物资产的妥善保管（防止丢失、盗用、未经授权使用）并被定期核对。" },
  { flow: "信息披露", category: "运营控制", status: "关注", objCount: 2, cp: "控制目标18-19：合理保证对管理人出具的信息披露内容进行复核确认并按时提供，且向监管机构准确、及时提交托管报告并经审核授权。" },
  { flow: "业务档案管理", category: "运营控制", status: "正常", objCount: 1, cp: "控制目标20：控制措施可合理保证业务档案及时进行有效移交保管，业务档案文件得到保密和安全保管。" },
  { flow: "系统开发及变更管理", category: "信息系统控制", status: "正常", objCount: 1, cp: "控制目标21：控制措施可合理保证对现有托管系统、应用程序和软件的修改经授权、测试和实施。" },
  { flow: "权限管理", category: "信息系统控制", status: "正常", objCount: 1, cp: "控制目标22：控制措施可合理保证对托管系统、程序、数据和参数的逻辑访问仅限于经授权的人员。" },
  { flow: "系统检查", category: "信息系统控制", status: "正常", objCount: 1, cp: "控制目标23：控制措施可合理保证定期开展托管系统检查，系统运行顺畅。" },
  { flow: "物理安全", category: "信息系统控制", status: "正常", objCount: 1, cp: "控制目标24：控制措施可合理保证已对机房实施环境控制措施及物理访问安全措施。" },
  { flow: "网络与数据传输安全", category: "信息系统控制", status: "预警", objCount: 1, cp: "控制目标25：控制措施可合理保证在服务机构与其对应数据交换方之间的数据传输安全。" },
  { flow: "备份与应急管理", category: "信息系统控制", status: "正常", objCount: 1, cp: "控制目标26：控制措施可合理保证定期地备份系统和数据，且存在处理中断恢复程序。" },
  { flow: "软件与硬件管理", category: "信息系统控制", status: "正常", objCount: 1, cp: "控制目标27：控制措施可合理保证信息技术硬件和软件问题得到监控并及时解决。" },
];

function monitorStatusTone(status) {
  if (status === "预警") return "high";
  if (status === "关注") return "medium";
  return "low";
}

function renderMonitoring() {
  const panel = document.getElementById("monitoring-panel");
  if (!panel) return;
  const items = CUSTODY_CONTROL_OBJECTIVES;
  const totalObj = items.reduce((s, x) => s + x.objCount, 0);
  const byStatus = (st) => items.filter((x) => x.status === st).length;
  const normal = byStatus("正常");
  const watch = byStatus("关注");
  const warn = byStatus("预警");
  const kpis = [
    ["监测流程", items.length],
    ["控制目标", totalObj],
    ["运行正常", normal],
    ["关注", watch],
    ["预警", warn],
  ];
  const dist = [
    { label: "正常", count: normal, tone: "low" },
    { label: "关注", count: watch, tone: "medium" },
    { label: "预警", count: warn, tone: "high" },
  ];
  const distTotal = dist.reduce((s, x) => s + x.count, 0) || 1;
  const distBar = `
    <div class="reg-distribution">
      <div class="reg-distribution-bar">
        ${dist.map((x) => `<span class="tone-${x.tone}" style="width:${Math.max(4, x.count / distTotal * 100).toFixed(1)}%"></span>`).join("")}
      </div>
      <div class="reg-distribution-legend">
        ${dist.map((x) => `<span><i class="tone-${x.tone}"></i>${escapeHtml(x.label)} ${x.count}</span>`).join("")}
      </div>
    </div>
  `;
  const categories = ["运营控制", "信息系统控制"];
  const card = (it) => `
    <article class="ctrl-card tone-${monitorStatusTone(it.status)}">
      <div class="ctrl-card-head">
        <strong>${escapeHtml(it.flow)}</strong>
        <span class="status-badge ${it.status === "正常" ? "done" : "pending"}">${escapeHtml(it.status)}</span>
      </div>
      <p>${escapeHtml(it.cp)}</p>
      <em>${it.objCount} 个控制目标</em>
    </article>
  `;
  panel.innerHTML = `
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">风险监测 · 托管内控控制台</span><h3>托管业务运营控制点监测</h3><p>覆盖托管日常运营全流程的内控控制目标库，按控制点持续监测运行状态。</p></div><span class="status-badge ${warn ? "pending" : "done"}">${warn ? `${warn} 项预警` : "运行平稳"}</span></div>
      <div class="adm-kpis">${kpis.map(([l, v]) => `<div><span>${escapeHtml(l)}</span><strong>${v}</strong></div>`).join("")}</div>
      <div style="margin-top:14px">${distBar}</div>
    </section>
    ${categories.map((cat) => {
      const group = items.filter((x) => x.category === cat);
      return `
        <section class="section-card">
          <div class="section-title-row"><div><span class="mini-label">${escapeHtml(cat)}</span><h3>${escapeHtml(cat)}控制点（${group.length}）</h3></div></div>
          <div class="ctrl-grid">${group.map(card).join("")}</div>
        </section>
      `;
    }).join("")}
  `;
}

const diligenceState = {
  activeTab: "custody-admittance",
  companies: [],
  selectedCompanyCode: "COMP-001",
  companyDetail: null,
  homeFeed: null,
  knowledge: null,
  reportKnowledgeFileIds: null,
  reportDataSourceIds: null,
  reportVersionId: null,
  reportDrafts: {},
  loading: false,
};

const DILIGENCE_REPORT_DATA_SOURCE_GROUPS = [
  {
    id: "customer-base",
    title: "客户与案例基础",
    items: [
      { id: "company", label: "企业主体信息" },
      { id: "case_info", label: "案例与授信申请信息" },
      { id: "people", label: "核心人员与角色信息" },
      { id: "profile_attributes", label: "补充画像属性" },
    ],
  },
  {
    id: "operation-flow",
    title: "经营与交易闭环",
    items: [
      { id: "contracts", label: "合同数据" },
      { id: "orders", label: "订单数据" },
      { id: "invoices", label: "发票数据" },
      { id: "bank_summaries", label: "银行摘要与回款" },
      { id: "related_transactions", label: "关联交易摘要" },
    ],
  },
  {
    id: "financial-check",
    title: "财务与核验",
    items: [
      { id: "latest_metrics", label: "最新核心财务指标" },
      { id: "recent_metric_history", label: "近年财务趋势" },
      { id: "reconciliation_checks", label: "勾稽检查结果" },
      { id: "tax_invoice_checks", label: "税票一致性核验" },
      { id: "tax_filings", label: "纳税申报摘要" },
      { id: "credit_history", label: "信用历史摘要" },
    ],
  },
  {
    id: "external-governance",
    title: "外部环境与治理",
    items: [
      { id: "related_companies", label: "关联公司关系" },
      { id: "shareholding_changes", label: "股权变更记录" },
      { id: "industry_profile", label: "行业画像" },
      { id: "peer_comparisons", label: "同业比较" },
      { id: "public_risks", label: "公开风险事件" },
      { id: "public_info_enrichment", label: "公开信息补全层" },
    ],
  },
  {
    id: "guarantee-support",
    title: "担保与补件",
    items: [
      { id: "guarantees", label: "担保与抵质押信息" },
      { id: "due_diligence_materials", label: "尽调补充材料" },
      { id: "validation_findings", label: "核验发现" },
      { id: "recommendation", label: "授信建议与缓释要求" },
    ],
  },
];

const diligenceTabs = {
  home: "首页",
  tasks: "洞察任务",
  profile: "企业画像",
  reports: "洞察报告",
  alerts: "监控预警",
  knowledge: "知识中心",
};

function cloneFallbackCase() {
  return JSON.parse(JSON.stringify(fallbackRegulatoryCase));
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || `请求失败：${response.status}`);
  }
  return payload;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  if (Math.abs(num) >= 100000000) return `${(num / 100000000).toFixed(2)}亿`;
  if (Math.abs(num) >= 10000) return `${(num / 10000).toFixed(2)}万`;
  return `${num.toLocaleString("zh-CN")}元`;
}

function formatRatio(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return `${(num * 100).toFixed(1)}%`;
}

function toFiniteNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function formatSignedRatio(value) {
  const num = toFiniteNumber(value);
  if (num === null) return "—";
  return `${num > 0 ? "+" : ""}${(num * 100).toFixed(1)}%`;
}

function metricValue(detail, code) {
  return toFiniteNumber((detail?.latest_metrics || []).find((item) => item.metric_code === code)?.value);
}

function metricHistory(detail, code) {
  return (detail?.recent_metric_history || [])
    .filter((item) => item.metric_code === code)
    .map((item) => ({ period: String(item.period_code || ""), value: toFiniteNumber(item.value) ?? 0 }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

function changeRatio(series) {
  if (!series || series.length < 2) return null;
  const current = toFiniteNumber(series[series.length - 1]?.value);
  const previous = toFiniteNumber(series[series.length - 2]?.value);
  if (current === null || previous === null || previous === 0) return null;
  return (current - previous) / Math.abs(previous);
}

function formatPeriod(period) {
  const raw = String(period || "");
  const year = raw.match(/^(\d{4})/)?.[1];
  if (!year) return raw || "—";
  if (raw.endsWith("FY") || raw.endsWith("1231")) return `${year}年`;
  if (raw.length >= 6) return `${year}年${Number(raw.slice(4, 6))}月`;
  return `${year}年`;
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function riskLabel(tier) {
  const map = {
    low: "低风险",
    medium: "中风险",
    medium_high: "中高风险",
    high: "高风险",
  };
  return map[tier] || tier || "待评估";
}

function statusLabel(status) {
  const map = {
    conditional_approval: "有条件通过",
    approve: "建议通过",
    public_pack_only: "公开资料分析",
    manual_review_required: "需人工复核",
    report_review: "报告复核中",
  };
  return map[status] || status || "待处理";
}

function caseTitle(item) {
  return item.title || item.regulation_title || "未命名监管文件";
}

function buildCaseFromApi(item) {
  const next = cloneFallbackCase();
  next.case_id = item.case_id || fallbackRegulatoryCase.case_id;
  next.regulation_title = caseTitle(item);
  next.regulator = item.regulator || "";
  next.publish_date = item.publish_date || "";
  next.effective_date = item.effective_date || "";
  next.risk_level = item.risk_level || "待评估";
  const analysisSteps = item.analysis?.steps || [];
  const stepMap = new Map(analysisSteps.map((step) => [step.step_id, step]));
  next.steps = next.steps.map((step) => {
    const dynamicStep = stepMap.get(step.step_id);
    if (!dynamicStep) return step;
    return {
      ...step,
      status: dynamicStep.status === "done" ? "已完成" : dynamicStep.status === "ready" ? "可重新分析" : step.status,
      kpis: dynamicStep.kpis?.length ? dynamicStep.kpis : step.kpis,
      summary:
        step.step_id === "identify"
          ? `抓取并识别 ${next.regulation_title}，完成分类、摘要和风险评级。`
          : step.summary,
    };
  });
  return next;
}

function renderCaseHeader(item) {
  // 旧工作台遗留头部，仅在列表/旧视图存在。详情路由会复用本函数，
  // 而新工作台模板已移除 #case-title/#case-meta，因此必须对缺失 DOM 容错，
  // 否则会在 applySelectedCase 中抛异常、阻断后续 renderRegulatoryDetail。
  const titleEl = document.getElementById("case-title");
  const metaEl = document.getElementById("case-meta");
  if (!titleEl && !metaEl) return;
  const title = item ? caseTitle(item) : regulatoryCase.regulation_title;
  const regulator = item?.regulator || regulatoryCase.regulator || "监管机构待识别";
  const publishDate = item?.publish_date || regulatoryCase.publish_date || "发布日期待识别";
  const effectiveDate = item?.effective_date || regulatoryCase.effective_date || "生效日期待识别";
  if (titleEl) titleEl.textContent = title;
  if (metaEl) metaEl.textContent = `${regulator} · ${publishDate} 发布 · ${effectiveDate} 生效`;
}

function renderCaseSelect() {
  const select = document.getElementById("case-select");
  if (!select) return;
  const cases = regulatoryCases.length ? regulatoryCases : [SAMPLE_CASE_OPTION];
  select.innerHTML = cases
    .map((item) => {
      const label = `${caseTitle(item)}｜${item.regulator || "未知机构"}｜${item.publish_date || "无日期"}`;
      return `<option value="${item.case_id}">${label}</option>`;
    })
    .join("");
  select.value = selectedCaseId;
}

const SAMPLE_CASE_OPTION = {
  case_id: DEMO_TASK_ID,
  title: fallbackRegulatoryCase.regulation_title,
  regulator: fallbackRegulatoryCase.regulator,
  publish_date: fallbackRegulatoryCase.publish_date,
  effective_date: fallbackRegulatoryCase.effective_date,
  risk_level: fallbackRegulatoryCase.risk_level,
};

function applySelectedCase(caseItem) {
  if (!caseItem) {
    regulatoryCase = cloneFallbackCase();
    selectedCaseId = DEMO_TASK_ID;
    renderCaseHeader(SAMPLE_CASE_OPTION);
    renderRegulatoryTaskList();
    renderRegulatoryDetail();
    return;
  }
  selectedCaseId = caseItem.case_id;
  regulatoryCase = buildCaseFromApi(caseItem);
  activeStepId = regulatoryCase.steps.some((step) => step.step_id === activeStepId)
    ? activeStepId
    : regulatoryCase.steps[0].step_id;
  renderCaseHeader(caseItem);
  renderPipeline();
  renderStepDetail();
  renderRegulatoryTaskList();
  renderRegulatoryDetail();
}

async function loadRegulatoryCases(preferredCaseId = selectedCaseId) {
  const status = document.getElementById("case-status");
  try {
    if (!regulatoryShowcase) await loadRegulatoryShowcase();
    regulatoryCases = (await fetchJson("/api/regulatory/cases")).filter((item) => !isShowcaseCase(item.case_id));
    if (regulatoryShowcase) regulatoryCases.unshift(showcaseCaseOption());
    const selected =
      regulatoryCases.find((item) => item.case_id === preferredCaseId) ||
      regulatoryCases[0] ||
      SAMPLE_CASE_OPTION;
    selectedCaseId = selected.case_id;
    renderCaseSelect();
    applySelectedCase(selected);
    if (status) {
      status.textContent = `新规库已加载：${regulatoryCases.length} 条；当前分析状态：${selected.analysis_status || "样例"}`;
    }
  } catch (error) {
    if (!regulatoryShowcase) await loadRegulatoryShowcase().catch(() => {});
    regulatoryCases = [SAMPLE_CASE_OPTION];
    if (regulatoryShowcase) regulatoryCases = [showcaseCaseOption()];
    selectedCaseId = DEMO_TASK_ID;
    renderCaseSelect();
    applySelectedCase(SAMPLE_CASE_OPTION);
    if (status) status.textContent = "后端暂不可用，当前使用内置样例数据。";
  }
}

async function loadRegulatoryShowcase() {
  const raw = await fetchJson("/showcase_data/regulatory_pboc_2026_004.json");
  regulatoryShowcase = normalizeDemoTask(raw);
}

function showcaseCaseOption() {
  if (!regulatoryShowcase) return SAMPLE_CASE_OPTION;
  return {
    case_id: DEMO_TASK_ID,
    legacy_case_id: regulatoryShowcase.case_id || LEGACY_SHOWCASE_CASE_ID,
    title: regulatoryShowcase.task?.name || regulatoryShowcase.title,
    regulation_title: regulatoryShowcase.regulation_title,
    regulator: regulatoryShowcase.regulator,
    publish_date: regulatoryShowcase.publish_date,
    effective_date: regulatoryShowcase.effective_date,
    risk_level: regulatoryShowcase.risk_level,
    analysis_status: "showcase",
    has_complete_analysis: true,
  };
}

function normalizeDemoTask(data) {
  if (!data) return data;
  data.task = data.task || {
    id: DEMO_TASK_ID,
    name: data.title || "PBOC令〔2026〕第4号 / 托管业务监管制度合规分析",
    status: data.overall_status || "待人工复核",
    dataMode: "演示样本",
    contextNotice: data.notice,
    updatedAt: data.updated_at,
  };
  data.task.id = DEMO_TASK_ID;
  data.externalRegulation = data.externalRegulation || {
    id: DEMO_TASK_ID,
    title: data.regulation_title,
    fullName: data.full_name,
    regulator: data.regulator,
    publishDate: data.publish_date,
    effectiveDate: data.effective_date,
    domain: data.domain,
    riskLevel: data.risk_level,
    sourceUrl: data.source_url,
    summary: data.summary,
    clauses: data.source?.clauses || [],
  };
  data.requirements = data.requirements || (data.interpretation?.requirements || []).map((item) => ({
    id: item.id,
    clause: item.clause,
    requirement: item.summary,
    responsibleSubject: item.subject,
    controlPoint: item.object,
    scope: data.domain,
    timing: item.deadline,
    action: item.action,
    mandatoryLevel: item.level,
    riskLevel: item.risk,
    reviewStatus: item.review,
  }));
  data.internalPolicies = data.internalPolicies || data.policy_documents || [];
  data.mappingRecords = data.mappingRecords || data.mapping?.items || [];
  data.gapRecords = data.gapRecords || data.gap_analysis?.items || [];
  data.rectificationActions = data.rectificationActions || [];
  data.deliverables = data.deliverables || data.artifacts || [];
  data.reviewLogs = data.reviewLogs || [];
  return data;
}

async function loadRegulatoryScanner() {
  try {
    const [sourcesPayload, documentsPayload, runsPayload] = await Promise.all([
      fetchJson("/api/regulatory/sources"),
      fetchJson("/api/regulatory/scanner/documents"),
      fetchJson("/api/regulatory/scanner/runs"),
    ]);
    regulatoryScannerSources = sourcesPayload.sources || [];
    regulatoryScannerDocuments = documentsPayload.documents || [];
    regulatoryScannerLastRun = (runsPayload.runs || [])[0] || null;
    regulatoryScannerDiagnostics = regulatoryScannerLastRun?.scan_run_id
      ? (await fetchJson(`/api/regulatory/scanner/runs/${encodeURIComponent(regulatoryScannerLastRun.scan_run_id)}/diagnostics`)).diagnostics || []
      : [];
    renderScannerControls();
    renderScannerDocuments();
  } catch (error) {
    const status = document.getElementById("scanner-status");
    if (status) status.textContent = `监管识别真实扫描加载失败：${error.message}`;
  }
}

async function pollScrapeRun(runId, attempt = 0) {
  const status = document.getElementById("case-status");
  try {
    const runs = await fetchJson("/api/regulatory/runs");
    const run = runs.find((item) => item.id === runId) || runs[0];
    if (!run) return;
    if (run.status === "running" && attempt < 10) {
      if (status) status.textContent = `真实抓取任务运行中：Run #${runId}，稍后自动刷新新规库。`;
      window.setTimeout(() => pollScrapeRun(runId, attempt + 1), 3000);
      return;
    }
    await loadRegulatoryCases();
    if (status) {
      status.textContent =
        run.status === "success" || run.status === "partial"
          ? `抓取完成：新增 ${run.inserted_count || 0} 条，更新 ${run.updated_count || 0} 条。`
          : `抓取任务结束：${run.status || "状态待确认"}。`;
    }
  } catch (error) {
    if (attempt < 3) window.setTimeout(() => pollScrapeRun(runId, attempt + 1), 3000);
  }
}

function renderDiligenceCompanySelect() {
  const select = document.getElementById("diligence-company-select");
  if (!select) return;
  select.innerHTML = diligenceState.companies
    .map((company) => `<option value="${escapeHtml(company.company_code)}">${escapeHtml(company.name)}</option>`)
    .join("");
  select.value = diligenceState.selectedCompanyCode;
}

async function loadDiligence(force = false) {
  if (diligenceLoaded && !force) {
    renderDiligence();
    return;
  }
  diligenceState.loading = true;
  renderDiligence();
  try {
    const [companies, homeFeed, knowledge] = await Promise.all([
      fetchJson("/api/companies"),
      fetchJson("/api/home-feed"),
      fetchJson("/api/knowledge-files"),
    ]);
    diligenceState.companies = companies;
    diligenceState.homeFeed = homeFeed;
    diligenceState.knowledge = knowledge;
    if (!companies.some((item) => item.company_code === diligenceState.selectedCompanyCode)) {
      diligenceState.selectedCompanyCode = companies[0]?.company_code || "COMP-001";
    }
    await loadDiligenceCompany();
    diligenceLoaded = true;
  } catch (error) {
    // 尽调模块已统一为私募基金管理人 showcase，外部后端不可用不应影响渲染。
    diligenceState.loading = false;
    renderDiligence();
  }
}

async function loadDiligenceCompany() {
  if (!diligenceState.selectedCompanyCode) return;
  diligenceState.companyDetail = await fetchJson(`/api/company/${encodeURIComponent(diligenceState.selectedCompanyCode)}`);
  diligenceState.loading = false;
  renderDiligenceCompanySelect();
  renderDiligence();
}

function renderDiligence() {
  const panel = document.getElementById("diligence-panel");
  if (!panel) return;
  document.querySelectorAll("[data-diligence-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.diligenceTab === diligenceState.activeTab);
  });
  // 尽调模块已统一为“私募基金管理人尽调”，全部 Tab 由平台自有 showcase / 占位渲染，
  // 不依赖外部尽调后端，也不再需要面向单个企业的“当前企业”选择器。
  const companySelect = document.querySelector(".diligence-select");
  if (companySelect) companySelect.style.display = "none";
  const renderers = {
    "custody-admittance": renderCustodyAdmittanceDD, // 准入尽调
    home: renderManagerOverview, // 尽调总览（风险雷达 + 三层分类 + 产品组合 + 区域分布）
    profile: renderManagerProfile, // 管理人画像
    alerts: renderManagerMonitoring, // 动态风险监测
    tasks: renderManagerTasks, // 洞察任务
    reports: renderManagerReports, // 尽调报告
    knowledge: renderManagerKnowledge, // 知识中心
  };
  panel.innerHTML = (renderers[diligenceState.activeTab] || renderManagerOverview)();
}

function renderManagerBars(items, unit = "") {
  const max = Math.max(1, ...items.map((it) => Number(it.value) || 0));
  return `
    <div class="mgr-dist">
      ${items.map((it) => {
        const w = Math.max(6, (Number(it.value) || 0) / max * 100);
        return `<div class="mgr-dist-row"><span class="mgr-dist-label">${escapeHtml(it.label)}</span><div class="mgr-dist-track"><i style="width:${w.toFixed(1)}%"></i></div><span class="mgr-dist-val">${escapeHtml(String(it.value))}${escapeHtml(unit)}</span></div>`;
      }).join("")}
    </div>
  `;
}

function renderManagerOverview() {
  const d = CUSTODY_ADMITTANCE_DD;
  const m = d.manager;
  const o = d.overview;
  const mods = o.riskModules;
  const overall = Math.round(mods.reduce((s, x) => s + x.score, 0) / mods.length);
  const layers = ["micro", "meso", "macro"].map((layer) => {
    const items = mods.filter((x) => x.layer === layer);
    const avg = items.length ? Math.round(items.reduce((s, x) => s + x.score, 0) / items.length) : 0;
    const high = items.filter((x) => x.score >= 58).length;
    return { layer, label: o.layerLabels[layer], avg, count: items.length, high };
  });
  const riskBadge = (r) => (r === "高" ? "high" : r === "中" ? "medium" : "low");
  return `
    <div class="showcase-notice">
      <span>${escapeHtml(d.badge)}</span>
      <strong>尽调总览 · 演示样本，围绕同一私募基金管理人的风险驾驶舱。</strong>
    </div>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">尽调总览 · 当前管理人</span><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.type)}｜准入结论：${escapeHtml(m.admittanceConclusion)}</p></div><span class="status-badge done">${escapeHtml(m.admittanceRating)}</span></div>
      <div class="adm-kpis">${o.kpis.map((k) => `<div><span>${escapeHtml(k.label)}</span><strong>${escapeHtml(k.value)}</strong></div>`).join("")}</div>
    </section>

    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">风险雷达</span><h3>管理人风险雷达（分值越高风险越大）</h3><p>按“微观·管理人自身 / 中观·在管产品 / 宏观·行业政策”三层对风险维度分类。</p></div><span class="risk-pill ${scoreTone(overall)}">${escapeHtml(riskLevelByScore(overall))}</span></div>
      <div class="diligence-risk-layout">
        <div class="risk-radar-panel" aria-label="管理人风险雷达">
          <div class="risk-radar-stage">
            <div class="risk-radar-ring ring-1"></div>
            <div class="risk-radar-ring ring-2"></div>
            <div class="risk-radar-ring ring-3"></div>
            <div class="risk-radar-axis axis-x"></div>
            <div class="risk-radar-axis axis-y"></div>
            <div class="risk-radar-center"><strong>${overall}</strong><span>综合风险分</span></div>
            ${mods.map((mod, index) => {
              const angle = (index / mods.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 42 - (mod.score / 100) * 22;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              return `<span class="risk-radar-point tone-${scoreTone(mod.score)} layer-${mod.layer}" style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;"><i>${escapeHtml(mod.id)}</i><em>${escapeHtml(mod.title)}：${mod.score}</em></span>`;
            }).join("")}
          </div>
          <div class="risk-radar-legend">
            <span><i class="layer-dot layer-micro"></i>微观</span>
            <span><i class="layer-dot layer-meso"></i>中观</span>
            <span><i class="layer-dot layer-macro"></i>宏观</span>
          </div>
        </div>
        <div class="risk-overview-column">
          <div class="layer-score-grid">
            ${layers.map((l) => `<div class="layer-score-card layer-${l.layer}"><span>${escapeHtml(l.label)}</span><strong>${l.avg}</strong><em>${l.count} 维 · ${l.high} 维偏高</em></div>`).join("")}
          </div>
          <div class="mgr-risk-list">
            ${mods.slice().sort((a, b) => b.score - a.score).slice(0, 4).map((mod) => `<div class="mgr-risk-item"><span class="risk-dot tone-${scoreTone(mod.score)}"></span><strong>${escapeHtml(mod.title)}</strong><em>${mod.score}</em></div>`).join("")}
          </div>
        </div>
      </div>
    </section>

    <div class="adm-two-col">
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">在管产品组合</span><h3>策略分布</h3></div></div>
        ${renderManagerBars(o.portfolio.strategies, "%")}
        <table class="data-table" style="margin-top:14px"><thead><tr><th>代表产品</th><th>规模</th><th>策略</th><th>风险</th></tr></thead><tbody>
          ${o.portfolio.topProducts.map((p) => `<tr><td><strong>${escapeHtml(p.name)}</strong></td><td>${escapeHtml(p.scale)}</td><td>${escapeHtml(p.strategy)}</td><td><span class="status-badge ${riskBadge(p.risk) === "low" ? "done" : "pending"}">${escapeHtml(p.risk)}风险</span></td></tr>`).join("")}
        </tbody></table>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">区域分布</span><h3>在管产品 / 托管对接地</h3></div></div>
        ${renderManagerBars(o.regions, " 只")}
        <div class="empty-state small">区域分布反映在管产品托管对接所在地集中度，用于属地监管与现场尽调安排。</div>
      </section>
    </div>
  `;
}

function renderManagerProfile() {
  const d = CUSTODY_ADMITTANCE_DD;
  const m = d.manager;
  const p = d.profile;
  return `
    <div class="showcase-notice">
      <span>${escapeHtml(d.badge)}</span>
      <strong>管理人画像 · 演示样本，不代表对任何真实管理人的结论。</strong>
    </div>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">管理人画像 · 基本信息</span><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.type)}｜实控人：${escapeHtml(p.shareholders.controller)}</p></div><span class="status-badge done">${escapeHtml(m.admittanceConclusion)}</span></div>
      <div class="info-grid">
        ${p.basics.map(([k, v]) => `<div><span>${escapeHtml(k)}</span><strong>${escapeHtml(v)}</strong></div>`).join("")}
      </div>
    </section>
    <div class="adm-two-col">
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">股东与实控人</span><h3>股权结构</h3></div></div>
        <table class="data-table"><thead><tr><th>股东</th><th>持股</th></tr></thead><tbody>
          ${p.shareholders.items.map(([n, r]) => `<tr><td>${escapeHtml(n)}</td><td>${escapeHtml(r)}</td></tr>`).join("")}
        </tbody></table>
        <div class="empty-state small">${escapeHtml(p.shareholders.note)}</div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">团队</span><h3>人员与稳定性</h3></div></div>
        <div class="adm-kpis">${p.team.map((t) => `<div><span>${escapeHtml(t.label)}</span><strong>${escapeHtml(t.value)}</strong></div>`).join("")}</div>
      </section>
    </div>
    <div class="adm-two-col">
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">管理规模与产品</span><h3>规模 / 策略</h3></div></div>
        <div class="adm-kpis">${p.scale.map((t) => `<div><span>${escapeHtml(t.label)}</span><strong>${escapeHtml(t.value)}</strong></div>`).join("")}</div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">历史业绩</span><h3>代表产品：${escapeHtml(p.performance.product)}</h3></div></div>
        <div class="info-grid">${p.performance.items.map(([k, v]) => `<div><span>${escapeHtml(k)}</span><strong>${escapeHtml(v)}</strong></div>`).join("")}</div>
      </section>
    </div>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">合规与诚信</span><h3>中基协诚信与监管记录</h3></div></div>
      <ul class="adm-integrity">${p.integrity.map((i) => `<li class="${i.ok ? "is-ok" : "is-warn"}">${escapeHtml(i.text)}</li>`).join("")}</ul>
    </section>
  `;
}

function renderManagerMonitoring() {
  const d = CUSTODY_ADMITTANCE_DD;
  const mon = d.monitoring;
  const levelTone = (lv) => (lv === "高风险" ? "high" : lv === "中风险" ? "medium" : "low");
  return `
    <div class="showcase-notice">
      <span>${escapeHtml(d.badge)}</span>
      <strong>动态风险监测 · 演示样本，持续盯防已准入管理人的存续期风险。</strong>
    </div>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">实时状态</span><h3>${escapeHtml(d.manager.name)}</h3><p>${escapeHtml(mon.watchScope)}</p></div></div>
      <div class="adm-kpis">
        ${mon.statusBoard.map((s) => `<div><span>${escapeHtml(s.label)}</span><strong class="tone-${s.tone === "good" ? "low" : s.tone}">${escapeHtml(s.value)}</strong></div>`).join("")}
      </div>
    </section>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">风险预警</span><h3>动态预警（${mon.alerts.length}）</h3></div><span class="status-badge pending">持续监测</span></div>
      <div class="adm-alert-list">
        ${mon.alerts.map((a) => `
          <article class="adm-alert tone-${levelTone(a.level)}">
            <div class="adm-alert-head"><strong>${escapeHtml(a.title)}</strong><span>${escapeHtml(a.level)} · ${escapeHtml(a.date)}</span></div>
            <p>${escapeHtml(a.desc)}</p>
            <em>处置建议：${escapeHtml(a.action)}</em>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderManagerTasks() {
  const d = CUSTODY_ADMITTANCE_DD;
  const tasks = d.tasks;
  const levelTone = (lv) => (lv === "高" ? "high" : lv === "中" ? "medium" : "low");
  const statuses = ["待处理", "进行中", "待复核", "已完成"];
  const dist = statuses.map((s) => ({ label: s, count: tasks.filter((t) => t.status === s).length }));
  const distTotal = tasks.length || 1;
  const statusTone = { 待处理: "high", 进行中: "medium", 待复核: "medium", 已完成: "low" };
  return `
    <div class="showcase-notice"><span>${escapeHtml(d.badge)}</span><strong>洞察任务 · 围绕同一私募管理人的尽调任务编排（演示样本）。</strong></div>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">洞察任务 · 状态分布</span><h3>${escapeHtml(d.manager.name)} · 尽调任务</h3></div><span class="status-badge pending">${tasks.filter((t) => t.status !== "已完成").length} 项进行中/待办</span></div>
      <div class="reg-distribution">
        <div class="reg-distribution-bar">${dist.map((x) => `<span class="tone-${statusTone[x.label]}" style="width:${Math.max(4, x.count / distTotal * 100).toFixed(1)}%"></span>`).join("")}</div>
        <div class="reg-distribution-legend">${dist.map((x) => `<span><i class="tone-${statusTone[x.label]}"></i>${escapeHtml(x.label)} ${x.count}</span>`).join("")}</div>
      </div>
    </section>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">任务清单</span><h3>尽调任务时间轴</h3></div></div>
      <div class="mgr-task-list">
        ${tasks.map((t) => `
          <div class="mgr-task">
            <span class="task-rail tone-${levelTone(t.level)}"></span>
            <div class="mgr-task-body">
              <strong>${escapeHtml(t.id)} ${escapeHtml(t.title)}</strong>
              <span>对象：${escapeHtml(t.object)}｜牵头：${escapeHtml(t.owner)}</span>
            </div>
            <div class="mgr-task-meta"><span class="status-badge ${t.status === "已完成" ? "done" : "pending"}">${escapeHtml(t.status)}</span><br>${escapeHtml(t.date)}</div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderManagerReports() {
  const d = CUSTODY_ADMITTANCE_DD;
  return `
    <div class="showcase-notice"><span>${escapeHtml(d.badge)}</span><strong>尽调报告 · 围绕同一私募管理人的报告产出（演示样本，预览为占位）。</strong></div>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">尽调报告</span><h3>${escapeHtml(d.manager.name)} · 报告</h3></div></div>
      <div class="mgr-report-grid">
        ${d.reports.map((r) => `
          <article class="mgr-report-card">
            <div class="section-title-row" style="margin:0"><h4>${escapeHtml(r.name)}</h4><span class="status-badge ${r.status === "已生成" ? "done" : "pending"}">${escapeHtml(r.status)}</span></div>
            <div><span class="mini-label">章节大纲</span><ol>${r.sections.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol></div>
            <div class="mgr-report-actions">
              <button type="button" class="primary" data-bridge-action="noop">${r.status === "已生成" ? "预览报告" : "生成报告"}</button>
              <button type="button" data-bridge-action="noop">下载</button>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="empty-state small">报告生成 / 预览为演示占位；正式版将基于准入尽调、画像与监测结果自动成稿。</div>
    </section>
  `;
}

function renderManagerKnowledge() {
  const d = CUSTODY_ADMITTANCE_DD;
  const k = d.knowledge;
  return `
    <div class="showcase-notice"><span>${escapeHtml(d.badge)}</span><strong>知识中心 · 私募基金管理人尽调与托管准入知识库（演示样本）。</strong></div>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">知识中心</span><h3>私募 / 托管准入知识库</h3></div></div>
      <div class="mgr-know-grid">
        ${k.categories.map((c) => `
          <article class="mgr-know-card">
            <h4>${escapeHtml(c.title)}</h4>
            <ul>${c.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">尽调清单模板</span><h3>管理人准入尽调清单（${k.checklist.length} 项）</h3></div></div>
      <div class="mgr-checklist">
        ${k.checklist.map((c) => `<label><input type="checkbox" disabled> ${escapeHtml(c)}</label>`).join("")}
      </div>
      <div class="empty-state small">清单为演示模板，正式版可勾选、留痕并关联尽调任务与报告。</div>
    </section>
  `;
}

function renderManagerPlaceholder(label) {
  const m = CUSTODY_ADMITTANCE_DD.manager;
  return `
    <section class="section-card">
      <div class="section-title-row">
        <div>
          <span class="mini-label">${escapeHtml(label)}</span>
          <h3>${escapeHtml(label)} · 演示占位</h3>
          <p>面向“私募基金管理人”的${escapeHtml(label)}能力，后续接入；当前演示聚焦准入尽调、管理人画像与动态风险监测三视图。</p>
        </div>
        <span class="status-badge pending">后续接入</span>
      </div>
      <div class="empty-state">当前对象：${escapeHtml(m.name)}（${escapeHtml(m.type)}）。完整的${escapeHtml(label)}将围绕同一管理人展开。</div>
    </section>
  `;
}

function renderCustodyAdmittanceDD() {
  const d = CUSTODY_ADMITTANCE_DD;
  const m = d.manager;
  return `
    <div class="showcase-notice">
      <span>${escapeHtml(d.badge)}</span>
      <strong>${escapeHtml(d.notice)}</strong>
    </div>
    <section class="section-card adm-hero">
      <div class="adm-hero-main">
        <span class="mini-label">托管准入尽调 · 当前管理人</span>
        <h3>${escapeHtml(m.name)}</h3>
        <p>${escapeHtml(m.type)}｜成立 ${escapeHtml(m.established)}｜实控人：${escapeHtml(m.controller)}</p>
        <div class="adm-conclusion">
          <span class="status-badge done">${escapeHtml(m.admittanceConclusion)}</span>
          <em>准入评级 ${escapeHtml(m.admittanceRating)}</em>
          <em class="adm-review">${escapeHtml(m.reviewStatus)}</em>
        </div>
      </div>
      <div class="adm-kpis">
        ${d.metrics.map((k) => `<div><span>${escapeHtml(k.label)}</span><strong>${escapeHtml(k.value)}</strong></div>`).join("")}
      </div>
    </section>

    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">尽调维度</span><h3>私募基金管理人准入尽调六维评估</h3><p>面向托管业务的私募基金管理人准入维度，区别于企业授信尽调。</p></div></div>
      <div class="adm-dim-grid">
        ${d.dimensions.map((dim) => `
          <article class="adm-dim-card tone-${admittanceBandTone(dim.band)}">
            <div class="adm-dim-head">
              <strong>${escapeHtml(dim.name)}</strong>
              <span class="adm-band">${escapeHtml(dim.band)} · ${dim.score}</span>
            </div>
            <p class="adm-dim-summary">${escapeHtml(dim.summary)}</p>
            <ul>${dim.evidence.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
    </section>

    <div class="adm-two-col">
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">待人工复核</span><h3>准入关注项（${d.pending.length}）</h3></div><span class="status-badge pending">待复核</span></div>
        <ul class="adm-pending">${d.pending.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">关联监管义务</span><h3>对应外规内化执行型义务</h3></div></div>
        <div class="adm-oblig-list">
          ${d.obligationLinks.map((o) => `
            <button type="button" class="adm-oblig" data-route="${escapeHtml(o.route)}">
              <strong>${escapeHtml(o.title)}</strong>
              <span>${escapeHtml(o.basis)}</span>
              <em>查看外规依据 →</em>
            </button>
          `).join("")}
        </div>
      </section>
    </div>

    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">候选管理人</span><h3>待准入 / 存续期管理人清单</h3></div></div>
      <table class="data-table adm-candidates">
        <thead><tr><th>管理人</th><th>类型</th><th>监管评级</th><th>准入结论</th><th></th></tr></thead>
        <tbody>
          ${d.candidates.map((c) => `
            <tr class="${c.current ? "is-current" : ""}">
              <td><strong>${escapeHtml(c.name)}</strong><span>${escapeHtml(c.code)}</span></td>
              <td>${escapeHtml(c.type)}</td>
              <td>${escapeHtml(c.rating)}</td>
              <td>${escapeHtml(c.conclusion)}</td>
              <td>${c.current ? '<span class="status-badge done">当前</span>' : '<span class="status-badge pending">演示占位</span>'}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <div class="empty-state small">候选管理人清单为演示样板，仅“${escapeHtml(d.manager.name)}”提供完整准入尽调结果。</div>
    </section>
  `;
}

function selectedCompany() {
  return diligenceState.companyDetail?.company || diligenceState.companies.find((item) => item.company_code === diligenceState.selectedCompanyCode) || {};
}

function metricByCode(code) {
  return diligenceState.companyDetail?.latest_metrics?.find((item) => item.metric_code === code);
}

function riskTone(tier) {
  if (tier === "high" || tier === "medium_high") return "high";
  if (tier === "medium") return "medium";
  return "low";
}

function industryGroupName(value) {
  const raw = `${value || ""}`.toLowerCase();
  if (raw.includes("medical") || raw.includes("health") || raw.includes("医疗") || raw.includes("医药")) return "医疗与生命健康";
  if (raw.includes("food") || raw.includes("食品")) return "食品流通";
  if (raw.includes("energy") || raw.includes("新能源") || raw.includes("能源")) return "能源与材料";
  if (raw.includes("sensor") || raw.includes("tech") || raw.includes("manufacturing") || raw.includes("制造") || raw.includes("传感")) return "工业传感器 / 智能制造";
  return "其他行业";
}

function companyFindingSummary(company) {
  const count = Number(company.finding_count || 0);
  if (count > 0) return `${count} 项核验信号待复核`;
  return "暂无重大变化";
}

function buildDiligenceWatchItems() {
  const feedAlerts = diligenceState.homeFeed?.riskAlerts || [];
  const alertByName = new Map(feedAlerts.map((item) => [item.company, item]));
  return (diligenceState.companies || [])
    .map((company) => {
      const score = clampNumber(riskScoreFromTier(company.risk_tier) + Math.min(Number(company.finding_count || 0), 4) * 2, 0, 100);
      const alert = alertByName.get(company.name);
      return {
        code: company.company_code,
        name: company.name,
        tier: company.risk_tier || "medium",
        score,
        tone: riskTone(company.risk_tier),
        industry: industryGroupName(company.industry || company.industry_category || company.business_scope),
        summary: tz(alert?.detail || companyFindingSummary(company)),
        time: alert?.time || "",
        findingCount: Number(company.finding_count || 0),
        selected: company.company_code === diligenceState.selectedCompanyCode,
      };
    })
    .sort((a, b) => b.score - a.score);
}

function renderWatchRadarPoint(item, index, total) {
  const angle = (-105 + (index * 300) / Math.max(total, 1)) * (Math.PI / 180);
  const radius = 42 - item.score * 0.26;
  const left = 50 + Math.cos(angle) * radius;
  const top = 50 + Math.sin(angle) * radius;
  return `
    <button
      type="button"
      class="monitor-radar-point tone-${escapeHtml(item.tone)} ${item.selected ? "is-selected" : ""}"
      style="left:${left.toFixed(2)}%; top:${top.toFixed(2)}%;"
      data-diligence-action="open-profile"
      data-company-code="${escapeHtml(item.code)}"
      aria-label="${escapeHtml(item.name)}"
    >
      ${escapeHtml(item.name?.slice(0, 1) || "企")}
      <em>${escapeHtml(item.name)}｜${escapeHtml(riskLabel(item.tier))}｜${escapeHtml(item.summary)}</em>
    </button>
  `;
}

function renderWatchIndustryGroups(items) {
  const groups = new Map();
  items.forEach((item) => {
    if (!groups.has(item.industry)) groups.set(item.industry, []);
    groups.get(item.industry).push(item);
  });
  return Array.from(groups.entries())
    .map(
      ([industry, companies]) => `
        <section class="monitor-industry-group">
          <div>
            <strong>${escapeHtml(industry)}</strong>
            <span>${companies.length} 家企业</span>
          </div>
          ${companies
            .slice(0, 4)
            .map(
              (item) => `
                <button type="button" class="monitor-company-row" data-diligence-action="open-profile" data-company-code="${escapeHtml(item.code)}">
                  <span>
                    <strong>${escapeHtml(item.name)}</strong>
                    <em>${escapeHtml(item.summary)}</em>
                  </span>
                  <i class="risk-pill ${escapeHtml(item.tier)}">${escapeHtml(riskLabel(item.tier))}</i>
                </button>
              `
            )
            .join("")}
        </section>
      `
    )
    .join("");
}

function allReportDataSourceIds() {
  return DILIGENCE_REPORT_DATA_SOURCE_GROUPS.flatMap((group) => group.items.map((item) => item.id));
}

function allKnowledgeFileIds() {
  return (diligenceState.knowledge?.files || []).map((item) => item.id);
}

function reportKnowledgeIds() {
  if (!diligenceState.reportKnowledgeFileIds) return allKnowledgeFileIds();
  return diligenceState.reportKnowledgeFileIds;
}

function reportDataSourceIds() {
  if (!diligenceState.reportDataSourceIds) return allReportDataSourceIds();
  return diligenceState.reportDataSourceIds;
}

function reportDraftText(version) {
  if (!version) return "";
  return diligenceState.reportDrafts[version.id] ?? version.review_edit_text ?? version.full_text ?? "";
}

function versionSections(version) {
  const sections = version?.section_list || [];
  if (sections.length) return sections;
  const text = version?.full_text || "";
  return text
    .split(/\n(?=第[一二三四五六七八九十]+章\s)/)
    .filter(Boolean)
    .map((content, index) => {
      const firstLine = content.split("\n")[0]?.trim() || `章节 ${index + 1}`;
      return { id: `section-${index + 1}`, title: firstLine, content };
    });
}

function generationModeLabel(mode) {
  if (!mode) return "待生成";
  if (mode.includes("skill_pipeline") && mode.includes("fallback")) return "双 Skill 本地兜底";
  if (mode.includes("skill_pipeline")) return "auditing-data -> writing-report -> DeepSeek";
  if (mode.includes("deepseek")) return "DeepSeek 报告生成";
  return "模板生成";
}

function renderDiligenceHome() {
  const company = selectedCompany();
  const feed = diligenceState.homeFeed || { recentInvestigations: [], riskAlerts: [] };
  return `
    <div class="diligence-grid diligence-grid-home">
      <section class="task-launch-card">
        <div class="section-title-row">
          <div>
            <span class="mini-label">任务发起</span>
            <h4>发起尽职调查任务</h4>
            <p>支持输入企业名称、风险关注点或尽调任务描述，复用旧项目的洞察任务与报告生成能力。</p>
          </div>
        </div>
        <div class="task-input-row">
          <input id="diligence-command-input" type="text" placeholder="例如：对深圳灵犀微传感发起授信尽调，重点关注收入真实性与关联交易" />
          <button class="primary-action" type="button" data-diligence-action="start-task">开始分析</button>
        </div>
        <div class="quick-action-grid">
          ${[
            ["风险洞察", "alerts", "查看公开风险、核验发现与预警事项"],
            ["企业画像", "profile", "查看主体、人员、财务和关联关系"],
            ["任务管理", "tasks", "查看样本企业和尽调处理状态"],
            ["报告生成", "reports", "生成尽调报告并进行预审"],
          ]
            .map(
              ([title, tab, desc]) => `
                <button class="quick-card" type="button" data-diligence-tab="${tab}">
                  <strong>${title}</strong>
                  <span>${desc}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="summary-card">
        <div class="section-title-row">
          <div>
            <span class="mini-label">当前任务</span>
            <h4>${escapeHtml(company.name || "请选择企业")}</h4>
            <p>${escapeHtml(company.overview || "暂无企业概览。")}</p>
          </div>
          <span class="risk-pill ${company.risk_tier || "medium"}">${escapeHtml(riskLabel(company.risk_tier))}</span>
        </div>
        <div class="metric-row">
          <div><span>申请金额</span><strong>${formatMoney(diligenceState.companyDetail?.case_info?.requested_amount_cny)}</strong></div>
          <div><span>建议额度</span><strong>${formatMoney(diligenceState.companyDetail?.recommendation?.suggested_amount_cny)}</strong></div>
          <div><span>核验发现</span><strong>${diligenceState.companyDetail?.validation_findings?.length || 0}项</strong></div>
        </div>
      </section>
    </div>

    <div class="diligence-two-col">
      <section class="panel-card">
        <div class="section-title-row"><h4>最近调查</h4><button type="button" data-diligence-tab="tasks">查看全部</button></div>
        <div class="list-stack">
          ${feed.recentInvestigations
            .map(
              (item) => `
                <div class="list-row">
                  <div><strong>${escapeHtml(item.company)}</strong><span>${escapeHtml(tz(item.industry))} · ${escapeHtml(item.time)}</span></div>
                  <em>${escapeHtml(tz(item.status))}</em>
                </div>
              `
            )
            .join("") || `<div class="empty-state small">暂无最近调查记录</div>`}
        </div>
      </section>
      <section class="panel-card">
        <div class="section-title-row"><h4>风险提醒</h4><button type="button" data-diligence-tab="alerts">查看全部</button></div>
        <div class="list-stack">
          ${feed.riskAlerts
            .map(
              (item) => `
                <div class="list-row">
                  <div><strong>${escapeHtml(item.company)}</strong><span>${escapeHtml(tz(item.detail))}</span></div>
                  <em>${escapeHtml(tz(item.level))}</em>
                </div>
              `
            )
            .join("") || `<div class="empty-state small">暂无风险提醒</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderDiligenceTasks() {
  return `
    <section class="panel-card">
      <div class="section-title-row">
        <div>
          <span class="mini-label">洞察任务</span>
          <h4>洞察任务</h4>
          <p>保留旧项目样本企业、风险分层、报告状态与 执行流程 数据模式。</p>
        </div>
        <button class="primary-action" type="button" data-diligence-action="refresh">刷新任务</button>
      </div>
      <div class="table-wrap">
        <table class="diligence-table">
          <thead><tr><th>企业</th><th>行业</th><th>区域</th><th>风险</th><th>报告/发现</th><th>操作</th></tr></thead>
          <tbody>
            ${diligenceState.companies
              .map(
                (company) => `
                  <tr>
                    <td><strong>${escapeHtml(company.name)}</strong><span>${escapeHtml(company.company_code)}</span></td>
                    <td>${escapeHtml(company.industry_category || company.subindustry || "—")}</td>
                    <td>${escapeHtml([company.region_province, company.region_city].filter(Boolean).join(" / ") || "—")}</td>
                    <td><span class="risk-pill ${company.risk_tier}">${escapeHtml(riskLabel(company.risk_tier))}</span></td>
                    <td>${company.finding_count || 0}项发现 · ${escapeHtml(statusLabel(company.recommendation_status))}</td>
                    <td><button type="button" data-company-code="${escapeHtml(company.company_code)}" data-diligence-action="open-profile">查看画像</button></td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

const DILIGENCE_RISK_MODULES = [
  { id: "01", title: "主体身份与准入风险", layer: "micro", summary: "统一社会信用代码、经营状态、注册地和基础准入信息。" },
  { id: "02", title: "股权结构与控制风险", layer: "micro", summary: "实控、股权变更、核心人员和治理稳定性。" },
  { id: "03", title: "司法涉诉与公开风险", layer: "micro", summary: "公开风险事件、涉诉线索和行政提示。" },
  { id: "04", title: "合规核验与异常风险", layer: "micro", summary: "核验发现、手工复核项和资料一致性。" },
  { id: "05", title: "财务质量与盈利风险", layer: "micro", summary: "利润质量、毛利、应收和收入现金转化。" },
  { id: "06", title: "偿债能力与现金流风险", layer: "micro", summary: "杠杆、经营现金流、短期偿债缓冲。" },
  { id: "07", title: "关联网络与隐性关系风险", layer: "meso", summary: "关联企业、关联交易、资金往来和隐性担保。" },
  { id: "08", title: "供应链与客户集中风险", layer: "meso", summary: "客户集中度、订单稳定性和上游下游依赖。" },
  { id: "09", title: "合同履约与交易真实性风险", layer: "meso", summary: "合同、订单、发票、银行回款和勾稽结果。" },
  { id: "10", title: "业务资质与准入合规风险", layer: "meso", summary: "资质、许可、备案、材料和公开画像属性。" },
  { id: "11", title: "行业与市场景气风险", layer: "macro", summary: "行业景气、价格竞争、政策扰动和同业位置。" },
  { id: "12", title: "区域政策与声誉风险", layer: "macro", summary: "区域政策、公开信息、投诉舆情和声誉冲击。" },
];

const DILIGENCE_LAYER_LABEL = {
  micro: "微观",
  meso: "中观",
  macro: "宏观",
};

function scoreTone(score) {
  if (score >= 75) return "high";
  if (score >= 58) return "medium";
  return "low";
}

function riskLevelByScore(score) {
  if (score >= 86) return "极高风险";
  if (score >= 75) return "高风险";
  if (score >= 58) return "中风险";
  return "低风险";
}

function riskScoreFromTier(tier) {
  return { low: 38, medium: 58, medium_high: 70, high: 82 }[tier] || 55;
}

function buildDiligenceRiskModules(detail) {
  const company = selectedCompany();
  const publicRisks = detail?.public_risks || [];
  const findings = detail?.validation_findings || [];
  const checks = detail?.reconciliation_checks || [];
  const relatedCompanies = detail?.related_companies || [];
  const relatedTransactions = detail?.related_transactions || [];
  const people = detail?.people || [];
  const attrs = detail?.profile_attributes || [];
  const contracts = detail?.contracts || [];
  const orders = detail?.orders || [];
  const receivables = detail?.receivables || [];
  const bank = detail?.bank_summaries?.[0] || {};
  const revenue = metricValue(detail, "revenue") || 0;
  const netProfit = metricValue(detail, "net_profit") || 0;
  const operatingCash = metricValue(detail, "operating_cash_flow") || 0;
  const leverage = metricValue(detail, "asset_liability_ratio") || metricValue(detail, "debt_to_assets_pct") || 0;
  const grossMargin = metricValue(detail, "gross_margin_pct") || 0;
  const receivable = receivables.find((item) => item.record_type === "accounts_receivable") || receivables[0] || {};
  const top5Ratio = toFiniteNumber(receivable.top5_ratio_pct) || 0;
  const highFindings = findings.filter((item) => ["high", "高"].includes(item.severity)).length;
  const mediumFindings = findings.filter((item) => ["medium", "中"].includes(item.severity)).length;
  const failedChecks = checks.filter((item) => item.status === "fail").length;
  const warnedChecks = checks.filter((item) => item.status === "warn").length;
  const actualController = people.filter((item) => item.is_actual_controller).length;
  const guarantors = people.filter((item) => item.is_guarantor).length;
  const base = riskScoreFromTier(company.risk_tier);

  const scoreById = {
    "01": (company.unified_social_credit_code && company.operating_status ? 34 : 56) + (company.risk_tier === "high" ? 16 : 0),
    "02": 36 + relatedCompanies.length * 3 + guarantors * 8 + (actualController ? 8 : 0),
    "03": 38 + publicRisks.length * 9 + publicRisks.filter((item) => item.severity === "medium" || item.severity === "high").length * 8,
    "04": 36 + highFindings * 14 + mediumFindings * 8 + findings.filter((item) => item.requires_manual_review).length * 5,
    "05": 42 + (netProfit <= 0 ? 18 : 0) + (grossMargin && grossMargin < 0.18 ? 12 : 0) + (operatingCash < netProfit ? 16 : 0),
    "06": 40 + (leverage > 0.68 ? 22 : leverage > 0.55 ? 10 : 0) + (operatingCash < 0 ? 20 : 0),
    "07": 38 + relatedTransactions.length * 5 + relatedTransactions.filter((item) => item.risk_level === "high" || item.risk_level === "medium").length * 7,
    "08": 34 + (top5Ratio > 0.65 ? 22 : top5Ratio > 0.45 ? 12 : 0) + Math.min(orders.length, 8) * 2,
    "09": 36 + failedChecks * 16 + warnedChecks * 8 + (contracts.length || orders.length ? 4 : 14),
    "10": attrs.length ? 44 + Math.min(attrs.length, 24) * 0.8 : 58,
    "11": base + publicRisks.length * 4,
    "12": 34 + publicRisks.length * 8 + publicRisks.filter((item) => item.severity === "medium" || item.severity === "high").length * 8,
  };

  const evidenceById = {
    "01": [`状态：${company.operating_status || "待补"}`, `注册地：${company.region_city || company.region_province || "待补"}`, company.unified_social_credit_code ? "统一代码已读取" : "统一代码待补"],
    "02": [`关键人员 ${people.length} 名`, `实控人 ${actualController || 0} 名`, `担保相关 ${guarantors || 0} 名`],
    "03": [`公开风险 ${publicRisks.length} 条`, `最近事件：${publicRisks[0]?.title || "暂无"}`, `风险等级：${riskLabel(company.risk_tier)}`],
    "04": [`核验发现 ${findings.length} 条`, `高风险 ${highFindings} 条`, `需复核 ${findings.filter((item) => item.requires_manual_review).length} 条`],
    "05": [`营业收入 ${formatMoney(revenue)}`, `净利润 ${formatMoney(netProfit)}`, `经营现金流 ${formatMoney(operatingCash)}`],
    "06": [`资产负债率 ${formatRatio(leverage)}`, `经营现金流 ${formatMoney(operatingCash)}`, `银行月净流量 ${formatMoney(bank.net_flow_cny)}`],
    "07": [`关联企业 ${relatedCompanies.length} 家`, `关联交易 ${relatedTransactions.length} 条`, `中高风险交易 ${relatedTransactions.filter((item) => item.risk_level !== "low").length} 条`],
    "08": [`前五客户集中度 ${formatRatio(top5Ratio)}`, `订单 ${orders.length} 条`, `应收账款 ${formatMoney(receivable.balance_cny)}`],
    "09": [`勾稽异常 ${failedChecks + warnedChecks} 项`, `合同 ${contracts.length} 份`, `大额交易 ${bank.large_transaction_count ?? "—"} 笔`],
    "10": [`画像属性 ${attrs.length} 条`, `材料 ${detail?.due_diligence_materials?.length || 0} 份`, `资质信息 ${attrs.filter((item) => /资质|许可|备案|证|上市/.test(item.label || "")).length} 条`],
    "11": [`行业：${company.subindustry || company.industry_category || "待补"}`, `同业对比 ${detail?.peer_comparisons?.length || 0} 条`, `公开风险 ${publicRisks.length} 条`],
    "12": [`公开风险 ${publicRisks.length} 条`, `信息源：${publicRisks[0]?.public_source_name || "待补"}`, `最近日期：${publicRisks[0]?.event_date || "待补"}`],
  };

  return DILIGENCE_RISK_MODULES.map((item) => {
    const score = Math.round(clampNumber(scoreById[item.id] || base, 26, 93));
    return {
      ...item,
      score,
      tone: scoreTone(score),
      level: riskLevelByScore(score),
      evidence: evidenceById[item.id] || [],
    };
  });
}

function buildLayerStats(modules) {
  return ["micro", "meso", "macro"].map((layer) => {
    const items = modules.filter((item) => item.layer === layer);
    const avg = items.length ? Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length) : 0;
    return { layer, label: DILIGENCE_LAYER_LABEL[layer], avg, count: items.length, high: items.filter((item) => item.tone === "high").length };
  });
}

function renderDiligenceProfile() {
  const detail = diligenceState.companyDetail;
  const company = selectedCompany();
  const metrics = [
    ["营业收入", metricByCode("revenue"), "money"],
    ["净利润", metricByCode("net_profit"), "money"],
    ["经营现金流", metricByCode("operating_cash_flow"), "money"],
    ["资产负债率", metricByCode("asset_liability_ratio"), "ratio"],
  ];
  return `
    <div class="diligence-two-col profile-layout">
      <section class="panel-card">
        <div class="section-title-row">
          <div>
            <span class="mini-label">企业画像</span>
            <h4>${escapeHtml(company.name)}</h4>
            <p>${escapeHtml(company.overview || "暂无企业概览。")}</p>
          </div>
          <span class="risk-pill ${company.risk_tier}">${escapeHtml(riskLabel(company.risk_tier))}</span>
        </div>
        <div class="info-grid">
          <div><span>统一社会信用代码</span><strong>${escapeHtml(company.unified_social_credit_code || "—")}</strong></div>
          <div><span>成立日期</span><strong>${escapeHtml(company.established_on || "—")}</strong></div>
          <div><span>注册资本</span><strong>${formatMoney(company.registered_capital_cny)}</strong></div>
          <div><span>经营状态</span><strong>${escapeHtml(company.operating_status || "—")}</strong></div>
        </div>
      </section>
      <section class="panel-card">
        <div class="section-title-row"><h4>关键指标</h4></div>
        <div class="metric-row">
          ${metrics
            .map(
              ([label, metric, type]) => `
                <div>
                  <span>${label}</span>
                  <strong>${type === "ratio" ? formatRatio(metric?.value) : formatMoney(metric?.value)}</strong>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
    </div>

    <div class="diligence-two-col">
      <section class="panel-card">
        <div class="section-title-row"><h4>核心人员</h4></div>
        <div class="list-stack">
          ${(detail?.people || [])
            .map(
              (person) => `
                <div class="list-row">
                  <div><strong>${escapeHtml(person.full_name)}</strong><span>${escapeHtml(tz(person.title || person.role_type || "—"))}</span></div>
                  <em>${person.is_actual_controller ? "实控人" : person.is_guarantor ? "担保人" : "成员"}</em>
                </div>
              `
            )
            .join("") || `<div class="empty-state small">暂无人员数据</div>`}
        </div>
      </section>
      <section class="panel-card">
        <div class="section-title-row"><h4>核验发现</h4></div>
        <div class="list-stack">
          ${(detail?.validation_findings || [])
            .slice(0, 6)
            .map(
              (finding) => `
                <div class="list-row alert-row">
                  <div><strong>${escapeHtml(tz(finding.finding_title))}</strong><span>${escapeHtml(tz(finding.finding_summary))}</span></div>
                  <em class="sev-${escapeHtml(finding.severity || "info")}">${escapeHtml(tz(finding.severity))}风险</em>
                </div>
              `
            )
            .join("") || `<div class="empty-state small">暂无核验发现</div>`}
        </div>
      </section>
    </div>

    ${renderDiligenceRiskScores(detail)}
    ${renderDiligencePortrait(detail)}
  `;
}

function renderDiligenceRiskScores(detail) {
  const scores = detail?.risk_scores || [];
  const txns = detail?.related_transactions || [];
  const publicRisks = detail?.public_risks || [];
  const modules = buildDiligenceRiskModules(detail);
  const layerStats = buildLayerStats(modules);
  const overallScore = modules.length ? Math.round(modules.reduce((sum, item) => sum + item.score, 0) / modules.length) : riskScoreFromTier(selectedCompany().risk_tier);
  const primaryRisks = modules.filter((item) => item.tone === "high").slice(0, 3);
  if (!scores.length && !txns.length && !publicRisks.length && !modules.length) return "";
  return `
    <section class="panel-card diligence-risk-overview">
      <div class="section-title-row">
        <div>
          <span class="mini-label">企业风险画像</span>
          <h4>十二维风险矩阵</h4>
          <p>基于主体、财务、交易、关联网络、公开风险和同业信息形成浅色平台版画像，不使用拟人化 Agent 命名。</p>
        </div>
        <span class="risk-pill ${scoreTone(overallScore)}">${escapeHtml(riskLevelByScore(overallScore))}</span>
      </div>
      <div class="diligence-risk-layout">
        <div class="risk-radar-panel" aria-label="十二维风险分布">
          <div class="risk-radar-stage">
            <div class="risk-radar-ring ring-1"></div>
            <div class="risk-radar-ring ring-2"></div>
            <div class="risk-radar-ring ring-3"></div>
            <div class="risk-radar-axis axis-x"></div>
            <div class="risk-radar-axis axis-y"></div>
            <div class="risk-radar-center">
              <strong>${overallScore}</strong>
              <span>综合风险分</span>
            </div>
            ${modules
              .map((module, index) => {
                const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 42 - (module.score / 100) * 22;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                return `
                  <span class="risk-radar-point tone-${module.tone} layer-${module.layer}" style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;">
                    <i>${escapeHtml(module.id)}</i>
                    <em>${escapeHtml(module.title)}：${module.score}</em>
                  </span>
                `;
              })
              .join("")}
          </div>
          <div class="risk-radar-legend">
            <span><i class="layer-dot layer-micro"></i>微观</span>
            <span><i class="layer-dot layer-meso"></i>中观</span>
            <span><i class="layer-dot layer-macro"></i>宏观</span>
          </div>
        </div>
        <div class="risk-overview-column">
          <div class="layer-score-grid">
            ${layerStats
              .map(
                (item) => `
                  <div class="layer-score-card layer-${item.layer}">
                    <span>${escapeHtml(item.label)}层</span>
                    <strong>${item.avg}</strong>
                    <em>${item.count} 个维度，${item.high} 个高风险</em>
                  </div>
                `
              )
              .join("")}
          </div>
          <div class="score-bars compact">
            ${scores
              .slice(0, 5)
              .map((s) => {
                const v = Math.max(0, Math.min(100, Number(s.score_value) || 0));
                return `
                  <div class="score-bar">
                    <div class="score-bar-head"><span>${escapeHtml(tz(s.score_dimension))}</span><strong>${escapeHtml(String(s.score_value ?? "—"))} / ${escapeHtml(tz(s.score_band))}</strong></div>
                    <div class="score-track"><div class="score-fill band-${escapeHtml(s.score_band || "watch")}" style="width:${v}%"></div></div>
                    <p>${escapeHtml(tz(s.rationale))}</p>
                  </div>`;
              })
              .join("") || `<div class="empty-state small">暂无评分数据</div>`}
          </div>
        </div>
      </div>
      <div class="risk-module-grid">
        ${modules
          .map(
            (module) => `
              <article class="risk-module-card tone-${module.tone} layer-${module.layer}">
                <div class="risk-module-head">
                  <span>${escapeHtml(module.id)} · ${escapeHtml(DILIGENCE_LAYER_LABEL[module.layer])}</span>
                  <strong>${module.score}</strong>
                </div>
                <h5>${escapeHtml(module.title)}</h5>
                <p>${escapeHtml(module.summary)}</p>
                <div class="risk-module-evidence">
                  ${module.evidence.slice(0, 3).map((item) => `<em>${escapeHtml(tz(item))}</em>`).join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
      ${
        primaryRisks.length
          ? `<div class="risk-priority-strip">${primaryRisks.map((item) => `<span>${escapeHtml(item.title)}：${item.level}</span>`).join("")}</div>`
          : ""
      }
    </section>

    <section class="panel-card">
        <div class="section-title-row"><div><span class="mini-label">关联与公开风险</span><h4>关系链路与外部事件</h4></div></div>
        <div class="list-stack">
          ${txns
            .slice(0, 5)
            .map(
              (t) => `
                <div class="list-row alert-row">
                  <div><strong>${escapeHtml(t.related_party_name || "关联方")}</strong><span>${escapeHtml(tz(t.transaction_type || ""))} · ${formatMoney(t.transaction_amount_cny)} · ${escapeHtml(tz(t.pricing_comment || ""))}</span></div>
                  <em class="sev-${escapeHtml(t.risk_level || "low")}">${escapeHtml(tz(t.risk_level))}风险</em>
                </div>`
            )
            .join("")}
          ${publicRisks
            .slice(0, 4)
            .map(
              (p) => `
                <div class="list-row alert-row">
                  <div><strong>${escapeHtml(p.title || tz(p.event_type) || "公开风险")}</strong><span>${escapeHtml(tz((p.summary || "").slice(0, 96)))}</span></div>
                  <em class="sev-${escapeHtml(p.severity || "low")}">${escapeHtml(tz(p.severity))}风险</em>
                </div>`
            )
            .join("") || (txns.length ? "" : `<div class="empty-state small">暂无公开风险</div>`)}
        </div>
    </section>
  `;
}

function renderDiligenceMiniTrend(title, series, formatter = formatMoney) {
  if (!series.length) return "";
  const values = series.map((item) => Math.abs(toFiniteNumber(item.value) ?? 0));
  const max = Math.max(...values, 1);
  const change = changeRatio(series);
  return `
    <article class="trend-card">
      <div class="trend-card-head">
        <strong>${escapeHtml(title)}</strong>
        <span>${formatSignedRatio(change)}</span>
      </div>
      <div class="trend-bars">
        ${series.slice(-6)
          .map((item) => {
            const width = Math.max(((Math.abs(toFiniteNumber(item.value) ?? 0) / max) * 100), 8);
            return `
              <div class="trend-bar-row">
                <span>${escapeHtml(formatPeriod(item.period))}</span>
                <i><b style="width:${width.toFixed(1)}%"></b></i>
                <strong>${escapeHtml(formatter(item.value))}</strong>
              </div>
            `;
          })
          .join("")}
      </div>
    </article>
  `;
}

function renderDiligencePortrait(detail) {
  const attrs = detail?.profile_attributes || [];
  const peers = detail?.peer_comparisons || [];
  const checks = detail?.reconciliation_checks || [];
  const trends = [
    ["营业收入", metricHistory(detail, "revenue")],
    ["净利润", metricHistory(detail, "net_profit")],
    ["现金余额", metricHistory(detail, "cash")],
    ["应收账款", metricHistory(detail, "accounts_receivable")],
  ].filter(([, series]) => series.length);
  if (!attrs.length && !peers.length && !checks.length && !trends.length) return "";
  const groups = {};
  attrs.forEach((a) => {
    const g = a.attribute_group || "other";
    (groups[g] = groups[g] || []).push(a);
  });
  return `
    <div class="diligence-two-col profile-evidence-layout">
      <section class="panel-card">
        <div class="section-title-row"><div><span class="mini-label">趋势核验</span><h4>近年财务趋势</h4></div></div>
        <div class="trend-grid">
          ${trends.map(([title, series]) => renderDiligenceMiniTrend(title, series)).join("") || `<div class="empty-state small">暂无趋势数据</div>`}
        </div>
      </section>
      <section class="panel-card">
        <div class="section-title-row"><div><span class="mini-label">勾稽检查</span><h4>收入、现金与报表一致性</h4></div></div>
        <div class="check-grid">
          ${checks
            .slice(0, 6)
            .map(
              (item) => `
                <article class="check-card status-${escapeHtml(item.status || "warn")}">
                  <div><strong>${escapeHtml(tz(item.check_name))}</strong><span>${escapeHtml(tz(item.status))}</span></div>
                  <p>${escapeHtml(tz(item.interpretation))}</p>
                  <em>${escapeHtml(tz(item.lhs_label))} ${formatMoney(item.lhs_value)} / ${escapeHtml(tz(item.rhs_label))} ${formatMoney(item.rhs_value)}</em>
                </article>
              `
            )
            .join("") || `<div class="empty-state small">暂无勾稽检查数据</div>`}
        </div>
      </section>
    </div>

    <section class="panel-card">
      <div class="section-title-row"><div><span class="mini-label">公开信息画像</span><h4>企业补充画像与同业参照</h4></div></div>
      <div class="portrait-grid portrait-grid-rich">
        ${Object.entries(groups)
          .map(
            ([g, items]) => `
              <div class="portrait-group">
                <h5>${escapeHtml(tz(g))}</h5>
                <div class="portrait-kv">
                  ${items
                    .slice(0, 10)
                    .map((a) => `<div><span>${escapeHtml(tz(a.label || ""))}</span><strong>${escapeHtml(tz((a.value_text || "—").slice(0, 110)))}</strong></div>`)
                    .join("")}
                </div>
              </div>`
          )
          .join("")}
      </div>
      ${
        peers.length
          ? `<div class="portrait-peers">
              <h5>同业对比</h5>
              ${peers
                .map((p) => `<div class="list-row"><div><strong>${escapeHtml(tz(p.percentile_bucket || ""))}</strong><span>${escapeHtml(tz(p.narrative || ""))}</span></div><em>${formatSignedRatio(p.variance_pct)}</em></div>`)
                .join("")}
            </div>`
          : ""
      }
    </section>
  `;
}

function latestReportVersion() {
  const versions = diligenceState.companyDetail?.report_versions || [];
  if (diligenceState.reportVersionId) {
    return versions.find((version) => version.id === diligenceState.reportVersionId) || versions[versions.length - 1] || null;
  }
  return versions[versions.length - 1] || null;
}

function renderReportKnowledgePanel(latest) {
  const knowledge = diligenceState.knowledge || { categories: [], files: [] };
  const selected = new Set(reportKnowledgeIds());
  const grouped = knowledge.categories.map((category) => ({
    ...category,
    files: (knowledge.files || []).filter((file) => file.category === category.id),
  })).filter((group) => group.files.length);
  return `
    <aside class="report-source-panel">
      <div class="report-panel-head">
        <div>
          <span class="mini-label">知识引用依据</span>
          <h5>生成与预审知识库</h5>
        </div>
        <strong>${selected.size}/${knowledge.files?.length || 0}</strong>
      </div>
      <p>勾选后会作为报告生成和预审的引用依据传入后端 Skill Pipeline。</p>
      <div class="report-source-groups">
        ${grouped
          .map(
            (group) => `
              <section class="report-source-group">
                <h6>${escapeHtml(group.title)}</h6>
                ${group.files
                  .map(
                    (file) => `
                      <label class="report-check-item">
                        <input type="checkbox" data-report-knowledge-id="${escapeHtml(file.id)}" ${selected.has(file.id) ? "checked" : ""} />
                        <span>
                          <strong>${escapeHtml(file.name)}</strong>
                          <em>${escapeHtml(file.description || "用于报告引用")}</em>
                        </span>
                      </label>
                    `
                  )
                  .join("")}
              </section>
            `
          )
          .join("") || `<div class="empty-state small">暂无知识文件</div>`}
      </div>
      ${
        latest?.knowledge_files?.length
          ? `<div class="report-linked-note">当前版本已关联：${latest.knowledge_files.map((file) => escapeHtml(file.name)).join("、")}</div>`
          : ""
      }
    </aside>
  `;
}

function renderReportDataSourcePanel() {
  const selected = new Set(reportDataSourceIds());
  return `
    <aside class="report-source-panel">
      <div class="report-panel-head">
        <div>
          <span class="mini-label">结构化数据</span>
          <h5>报告数据源</h5>
        </div>
        <strong>${selected.size}/${allReportDataSourceIds().length}</strong>
      </div>
      <p>这些字段将进入尽调报告生成 prompt，并用于引用目录和证据追溯。</p>
      <div class="report-source-groups compact">
        ${DILIGENCE_REPORT_DATA_SOURCE_GROUPS
          .map(
            (group) => `
              <section class="report-source-group">
                <h6>${escapeHtml(group.title)}</h6>
                ${group.items
                  .map(
                    (item) => `
                      <label class="report-check-item dense">
                        <input type="checkbox" data-report-source-id="${escapeHtml(item.id)}" ${selected.has(item.id) ? "checked" : ""} />
                        <span><strong>${escapeHtml(item.label)}</strong></span>
                      </label>
                    `
                  )
                  .join("")}
              </section>
            `
          )
          .join("")}
      </div>
    </aside>
  `;
}

function renderReportOutline(latest) {
  const sections = versionSections(latest);
  return `
    <nav class="report-outline">
      <span class="mini-label">章节导航</span>
      ${sections
        .map(
          (section, index) => `
            <a href="#report-section-${index + 1}">
              <span>${index + 1}</span>
              <strong>${escapeHtml(section.title || `章节 ${index + 1}`)}</strong>
            </a>
          `
        )
        .join("") || `<div class="empty-state small">暂无章节</div>`}
    </nav>
  `;
}

function renderReportCanvas(latest) {
  if (!latest) {
    return `<div class="empty-state">当前企业暂无报告版本，可选择知识库和数据源后点击“生成报告”。</div>`;
  }
  const draft = reportDraftText(latest);
  return `
    <div class="report-canvas-toolbar">
      <div>
        <span>${escapeHtml(latest.version_label || latest.id || "最新报告")}</span>
        <strong>${escapeHtml(generationModeLabel(latest.generation_mode))}</strong>
      </div>
      <em>${escapeHtml(latest.review_saved_at ? `已保存 ${latest.review_saved_at}` : latest.created_at || "未保存")}</em>
    </div>
    <textarea id="diligence-report-editor" class="report-editor" spellcheck="false">${escapeHtml(draft)}</textarea>
  `;
}

function renderReportReferences(latest) {
  const references = latest?.references || [];
  const basis = latest?.based_on || [];
  const review = latest?.review_result;
  return `
    <section class="report-evidence-panel">
      <div class="report-evidence-col">
        <div class="report-panel-head"><h5>生成依据</h5><strong>${basis.length}</strong></div>
        <div class="report-chip-list">
          ${basis.map((item) => `<span>${escapeHtml(tz(item))}</span>`).join("") || `<span>暂无生成依据</span>`}
        </div>
      </div>
      <div class="report-evidence-col">
        <div class="report-panel-head"><h5>引用追溯</h5><strong>${references.length}</strong></div>
        <div class="report-reference-list">
          ${references
            .slice(0, 8)
            .map(
              (ref) => `
                <div>
                  <strong>${escapeHtml(ref.id || ref.source_id || "R")}</strong>
                  <span>${escapeHtml(ref.title || ref.excerpt || ref.source_name || "引用依据")}</span>
                </div>
              `
            )
            .join("") || `<div><strong>R0</strong><span>暂无引用目录</span></div>`}
        </div>
      </div>
      <div class="report-evidence-col">
        <div class="report-panel-head"><h5>预审结果</h5><strong>${review?.counts?.total || 0}</strong></div>
        <div class="report-reference-list">
          ${(review?.findings || [])
            .slice(0, 5)
            .map(
              (finding) => `
                <div>
                  <strong>${escapeHtml(finding.severity || finding.risk_level || "提示")}</strong>
                  <span>${escapeHtml(finding.title || finding.finding_title || finding.description || "预审发现")}</span>
                </div>
              `
            )
            .join("") || `<div><strong>待预审</strong><span>点击“报告预审”后显示问题清单。</span></div>`}
        </div>
      </div>
    </section>
  `;
}

function renderDiligenceReports() {
  const company = selectedCompany();
  const versions = diligenceState.companyDetail?.report_versions || [];
  const latest = latestReportVersion();
  return `
    <section class="panel-card report-workbench">
      <div class="section-title-row">
        <div>
          <span class="mini-label">报告工作室</span>
          <h4>洞察报告</h4>
          <p>接入尽职调查后端的 auditing-data、writing-report Skills 与 DeepSeek 链路，支持知识引用、数据源选择、预审、草稿保存和 PDF 导出。</p>
        </div>
        <div class="button-row">
          <button class="primary-action" type="button" data-diligence-action="generate-report">生成报告</button>
          <button class="ghost-action" type="button" data-diligence-action="review-report" ${latest ? "" : "disabled"}>报告预审</button>
          <button class="ghost-action" type="button" data-diligence-action="save-report-draft" ${latest ? "" : "disabled"}>保存草稿</button>
        </div>
      </div>
      <div class="report-summary-grid">
        <div><span>当前企业</span><strong>${escapeHtml(company.name || "—")}</strong></div>
        <div><span>版本数量</span><strong>${versions.length}</strong></div>
        <div><span>报告链路</span><strong>${escapeHtml(generationModeLabel(latest?.generation_mode || diligenceState.companyDetail?.ai_capability?.mode))}</strong></div>
      </div>
      <div class="report-studio-layout">
        <div class="report-source-stack">
          ${renderReportKnowledgePanel(latest)}
          ${renderReportDataSourcePanel()}
        </div>
        <div class="report-main-stage">
          <div class="report-version-bar">
            <select id="report-version-select" aria-label="报告版本选择">
              ${versions.map((version) => `<option value="${escapeHtml(version.id)}" ${latest?.id === version.id ? "selected" : ""}>${escapeHtml(version.version_label || version.id)}</option>`).join("")}
            </select>
            <div class="button-row">
              <button class="ghost-action" type="button" data-diligence-action="sync-report-knowledge" ${latest ? "" : "disabled"}>关联知识库</button>
              <a class="ghost-action report-link-button" href="${escapeHtml(latest?.pdf_url || "#")}" target="_blank" rel="noreferrer" aria-disabled="${latest ? "false" : "true"}">导出 PDF</a>
            </div>
          </div>
          <div class="report-editor-layout">
            ${renderReportOutline(latest)}
            <div class="report-canvas">
              ${renderReportCanvas(latest)}
            </div>
          </div>
          ${renderReportReferences(latest)}
        </div>
      </div>
    </section>
  `;
}

function renderDiligenceAlerts() {
  const findings = diligenceState.companyDetail?.validation_findings || [];
  const feedAlerts = diligenceState.homeFeed?.riskAlerts || [];
  const watchItems = buildDiligenceWatchItems();
  const highCount = watchItems.filter((item) => item.tone === "high").length;
  const watchCount = watchItems.reduce((sum, item) => sum + item.findingCount, 0) + feedAlerts.length;
  const industryCount = new Set(watchItems.map((item) => item.industry)).size;
  const focusItems = watchItems.slice(0, 3);
  return `
    <section class="monitor-summary-grid">
      <div><span>雷达监测企业</span><strong>${watchItems.length}</strong><p>覆盖当前尽调样本与关注清单。</p></div>
      <div><span>高风险 / 中高风险</span><strong>${highCount}</strong><p>建议优先进入复核与补件。</p></div>
      <div><span>监控信号</span><strong>${watchCount}</strong><p>来自核验发现、预警和企业画像。</p></div>
      <div><span>行业分组</span><strong>${industryCount}</strong><p>按行业聚类查看风险外溢。</p></div>
    </section>
    <div class="monitor-risk-layout">
      <section class="panel-card monitor-radar-card">
        <div class="section-title-row">
          <div>
            <span class="mini-label">风险地图</span>
            <h4>企业风险雷达</h4>
            <p>越靠近中心代表风险越高；颜色区分高、中、低风险层级。当前为平台浅色版展示。</p>
          </div>
          <strong>${escapeHtml(selectedCompany().name || "当前企业")}</strong>
        </div>
        <div class="monitor-radar-stage">
          <span class="monitor-radar-ring ring-1"></span>
          <span class="monitor-radar-ring ring-2"></span>
          <span class="monitor-radar-ring ring-3"></span>
          <span class="monitor-radar-axis axis-x"></span>
          <span class="monitor-radar-axis axis-y"></span>
          <div class="monitor-radar-center"><strong>高风险</strong><span>重点复核区</span></div>
          ${watchItems.map((item, index) => renderWatchRadarPoint(item, index, watchItems.length)).join("")}
        </div>
        <div class="monitor-radar-legend">
          <span><i class="tone-high"></i>高 / 中高风险</span>
          <span><i class="tone-medium"></i>中风险</span>
          <span><i class="tone-low"></i>低风险</span>
        </div>
      </section>
      <div class="monitor-side-stack">
        <section class="panel-card monitor-insight-card">
          <div class="section-title-row"><div><span class="mini-label">辅助监控</span><h4>重点关注</h4></div></div>
          <div class="monitor-focus-list">
            ${focusItems
              .map(
                (item) => `
                  <button type="button" class="monitor-focus-row" data-diligence-action="open-profile" data-company-code="${escapeHtml(item.code)}">
                    <span>
                      <strong>${escapeHtml(item.name)}</strong>
                      <em>${escapeHtml(riskLabel(item.tier))}｜${escapeHtml(item.summary)}${item.time ? `｜${escapeHtml(item.time)}` : ""}</em>
                    </span>
                    <b>${item.score}</b>
                  </button>
                `
              )
              .join("") || `<div class="empty-state small">暂无重点关注企业</div>`}
          </div>
        </section>
        <section class="panel-card monitor-insight-card">
          <div class="section-title-row"><div><span class="mini-label">建议动作</span><h4>下一步处理</h4></div></div>
          <div class="monitor-action-list">
            <div><strong>重新发起尽调</strong><span>对高风险企业刷新核验与报告依据。</span></div>
            <div><strong>查看风险变化</strong><span>结合企业画像的十二维风险矩阵定位变化来源。</span></div>
            <div><strong>订阅周报</strong><span>沉淀本周新增预警、补件和人工复核结论。</span></div>
          </div>
        </section>
      </div>
    </div>
    <section class="panel-card monitor-industry-list">
      <div class="section-title-row">
        <div>
          <span class="mini-label">行业清单</span>
          <h4>行业企业分组</h4>
          <p>保留 Astreae 风险地图的行业聚合思路，但使用平台现有的卡片和浅色配色。</p>
        </div>
      </div>
      ${renderWatchIndustryGroups(watchItems) || `<div class="empty-state small">暂无行业分组</div>`}
    </section>
    <div class="diligence-two-col">
      <section class="panel-card">
        <div class="section-title-row"><div><span class="mini-label">核验发现</span><h4>当前企业发现</h4></div></div>
        <div class="list-stack">
          ${findings
            .map(
              (finding) => `
                <div class="list-row alert-row">
                  <div><strong>${escapeHtml(tz(finding.finding_title))}</strong><span>${escapeHtml(tz(finding.impact_summary || finding.finding_summary))}</span></div>
                  <em class="sev-${escapeHtml(finding.severity || "info")}">${escapeHtml(tz(finding.severity))}风险</em>
                </div>
              `
            )
            .join("") || `<div class="empty-state small">暂无核验发现</div>`}
        </div>
      </section>
      <section class="panel-card">
        <div class="section-title-row"><div><span class="mini-label">关注清单</span><h4>监控预警</h4></div></div>
        <div class="list-stack">
          ${feedAlerts
            .map(
              (item) => `
                <div class="list-row">
                  <div><strong>${escapeHtml(item.company)}</strong><span>${escapeHtml(tz(item.detail))} · ${escapeHtml(item.time)}</span></div>
                  <em>${escapeHtml(tz(item.level))}</em>
                </div>
              `
            )
            .join("") || `<div class="empty-state small">暂无风险提醒</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderDiligenceKnowledge() {
  const knowledge = diligenceState.knowledge || { categories: [], files: [] };
  return `
    <section class="panel-card">
      <div class="section-title-row">
        <div>
          <span class="mini-label">知识中心</span>
          <h4>知识中心</h4>
          <p>保留外部法规、内部制度、专家经验三类知识文件，并支持预览和下载。</p>
        </div>
      </div>
      <div class="knowledge-grid">
        ${knowledge.files
          .map(
            (file) => `
              <article class="knowledge-card">
                <span>${escapeHtml(knowledge.categories.find((item) => item.id === file.category)?.title || file.category)}</span>
                <h5>${escapeHtml(file.name)}</h5>
                <p>${escapeHtml(file.description || "暂无说明。")}</p>
                <div>
                  <a href="${escapeHtml(file.view_url)}" target="_blank" rel="noreferrer">预览</a>
                  <a href="${escapeHtml(file.download_url)}" target="_blank" rel="noreferrer">下载</a>
                </div>
              </article>
            `
          )
          .join("") || `<div class="empty-state">暂无知识库文件</div>`}
      </div>
    </section>
  `;
}

async function handleDiligenceAction(action, trigger) {
  if (action === "refresh") {
    diligenceLoaded = false;
    await loadDiligence(true);
    showToast("尽调任务已刷新。");
    return;
  }
  if (action === "open-profile") {
    diligenceState.selectedCompanyCode = trigger.dataset.companyCode;
    diligenceState.activeTab = "profile";
    diligenceState.reportVersionId = null;
    await loadDiligenceCompany();
    return;
  }
  if (action === "start-task") {
    const input = document.getElementById("diligence-command-input");
    const value = input?.value?.trim();
    showToast(value ? "已创建洞察任务，正在加载企业画像。" : "已打开默认样本企业画像。");
    diligenceState.activeTab = "profile";
    renderDiligence();
    return;
  }
  if (action === "generate-report") {
    showToast("正在生成尽调报告...");
    const version = await fetchJson(`/api/company/${encodeURIComponent(diligenceState.selectedCompanyCode)}/report-versions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knowledge_file_ids: reportKnowledgeIds(),
        data_source_ids: reportDataSourceIds(),
      }),
    });
    diligenceState.companyDetail.report_versions = [...(diligenceState.companyDetail.report_versions || []), version];
    diligenceState.reportVersionId = version.id;
    diligenceState.reportDrafts[version.id] = version.review_edit_text || version.full_text || "";
    renderDiligence();
    showToast("尽调报告已生成。");
    return;
  }
  if (action === "review-report") {
    const latest = latestReportVersion();
    if (!latest) return;
    const reportText = document.getElementById("diligence-report-editor")?.value || reportDraftText(latest);
    showToast("正在进行报告预审...");
    const reviewed = await fetchJson(
      `/api/company/${encodeURIComponent(diligenceState.selectedCompanyCode)}/report-versions/${encodeURIComponent(latest.id)}/review`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          knowledge_file_ids: reportKnowledgeIds(),
          report_text: reportText,
        }),
      }
    );
    diligenceState.companyDetail.report_versions = (diligenceState.companyDetail.report_versions || []).map((item) =>
      item.id === reviewed.id ? reviewed : item
    );
    diligenceState.reportDrafts[reviewed.id] = reviewed.review_edit_text || reportText;
    renderDiligence();
    showToast("报告预审完成。");
    return;
  }
  if (action === "sync-report-knowledge") {
    const latest = latestReportVersion();
    if (!latest) return;
    const linked = await fetchJson(
      `/api/company/${encodeURIComponent(diligenceState.selectedCompanyCode)}/report-versions/${encodeURIComponent(latest.id)}/knowledge-links`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_ids: reportKnowledgeIds() }),
      }
    );
    diligenceState.companyDetail.report_versions = (diligenceState.companyDetail.report_versions || []).map((item) =>
      item.id === linked.id ? linked : item
    );
    renderDiligence();
    showToast("已关联当前知识库选择。");
    return;
  }
  if (action === "save-report-draft") {
    const latest = latestReportVersion();
    if (!latest) return;
    const fullText = document.getElementById("diligence-report-editor")?.value || reportDraftText(latest);
    const saved = await fetchJson(
      `/api/company/${encodeURIComponent(diligenceState.selectedCompanyCode)}/report-versions/${encodeURIComponent(latest.id)}/draft`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_text: fullText, variant: "platform-light-editor" }),
      }
    );
    diligenceState.companyDetail.report_versions = (diligenceState.companyDetail.report_versions || []).map((item) =>
      item.id === saved.id ? saved : item
    );
    diligenceState.reportDrafts[saved.id] = saved.review_edit_text || fullText;
    renderDiligence();
    showToast("报告草稿已保存。");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function normalizePath(pathname = window.location.pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/index.html" ? "/" : path;
}

function normalizeTaskId(id) {
  const value = decodeURIComponent(id || "").trim();
  if (!value || value === LEGACY_SHOWCASE_CASE_ID || value === DEMO_TASK_ID) return DEMO_TASK_ID;
  return value;
}

function externalTabId(tab = "overview") {
  return detailTabToRoute[tab] || "overview";
}

function internalTabId(tab = "overview") {
  return routeTabToDetail[tab] || tab || "overview";
}

function routeForTask(taskId = selectedCaseId, tab = "overview") {
  return `${FOREIGN_REGULATION_BASE}/tasks/${encodeURIComponent(normalizeTaskId(taskId))}?tab=${encodeURIComponent(externalTabId(tab))}`;
}

function getRouteState(pathname = window.location.pathname, search = window.location.search) {
  const path = normalizePath(pathname);
  const params = new URLSearchParams(search);
  if (path.startsWith(`${FOREIGN_REGULATION_BASE}/tasks/`) || path.startsWith("/regulatory/tasks/")) {
    const prefix = path.startsWith(`${FOREIGN_REGULATION_BASE}/tasks/`) ? `${FOREIGN_REGULATION_BASE}/tasks/` : "/regulatory/tasks/";
    const taskId = normalizeTaskId(path.replace(prefix, ""));
    return {
      viewId: "regulatory",
      detailCaseId: taskId || selectedCaseId,
      detailTab: internalTabId(params.get("tab") || "overview"),
      isDetail: true,
      path,
    };
  }
  return {
    viewId: routeToView[path] || "home",
    detailCaseId: null,
    detailTab: params.get("tab") || "overview",
    isDetail: false,
    path,
  };
}

function navigateTo(path, options = {}) {
  const [pathname, query = ""] = path.split("?");
  const nextUrl = `${pathname}${query ? `?${query}` : ""}`;
  if (options.replace) {
    window.history.replaceState({}, "", nextUrl);
  } else if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
    window.history.pushState({}, "", nextUrl);
  }
  applyRoute(options);
}

function updatePageChrome(viewId, routeState) {
  const meta = pages[viewId] || pages.home;
  document.getElementById("page-title").textContent = meta.title;
  document.getElementById("page-subtitle").textContent = meta.subtitle;
  document.getElementById("page-kicker").textContent = meta.kicker;
  const detailName = normalizeTaskId(routeState.detailCaseId) === DEMO_TASK_ID ? "PBOC令〔2026〕第4号" : "任务基础信息";
  const breadcrumb = routeState.isDetail
    ? `${meta.breadcrumb} / ${detailName}`
    : meta.breadcrumb;
  document.getElementById("breadcrumb").textContent = breadcrumb;
  document.querySelectorAll(".nav-item").forEach((item) => {
    const route = item.dataset.route || "/";
    const itemView = routeToView[route] || "home";
    item.classList.toggle("is-active", itemView === viewId);
  });
  const actions = document.getElementById("page-actions");
  if (!actions) return;
  if (viewId === "regulatory") {
    actions.innerHTML = `
      <button class="primary-action" type="button" data-route="${routeForTask(DEMO_TASK_ID, "overview")}">查看演示样本</button>
      <details class="more-actions">
        <summary>更多操作</summary>
        <div>
          <label class="upload-pill">上传外规<input type="file" data-upload-kind="external" accept=".doc,.docx,.pdf,.txt,.html" /></label>
          <label class="upload-pill">上传内规<input type="file" data-upload-kind="internal" accept=".doc,.docx,.pdf,.txt,.xlsx,.csv" /></label>
          <button type="button" id="scan-button" data-regulatory-extra-action="legacy-scan">真实抓取新规</button>
          <button type="button" data-route="/foreign-regulation">真实任务入口</button>
        </div>
      </details>
    `;
  } else {
    actions.innerHTML = `
      <label class="upload-pill">上传外规<input type="file" data-upload-kind="external" accept=".doc,.docx,.pdf,.txt,.html" /></label>
      <label class="upload-pill">上传内规<input type="file" data-upload-kind="internal" accept=".doc,.docx,.pdf,.txt,.xlsx,.csv" /></label>
      <button class="primary-action" id="scan-button" type="button">真实抓取新规</button>
    `;
  }
}

function applyRoute(options = {}) {
  const routeState = getRouteState();
  currentView = routeState.viewId;
  currentRegulatoryDetailCaseId = routeState.detailCaseId || selectedCaseId;
  currentRegulatoryTab = routeState.detailTab || "overview";

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `view-${routeState.viewId}`);
  });
  updatePageChrome(routeState.viewId, routeState);

  if (routeState.viewId === "regulatory") {
    renderRegulatoryRoute(routeState);
  }
  if (routeState.viewId === "diligence") {
    loadDiligence();
  }
  if (routeState.viewId === "monitoring") {
    renderMonitoring();
  }
  if (options.scroll !== false) {
    document.getElementById("main-workspace")?.scrollTo({ top: 0, behavior: "auto" });
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function routeForCurrentCase(tab = "overview") {
  return routeForTask(currentRegulatoryDetailCaseId || selectedCaseId || DEMO_TASK_ID, tab);
}

function setView(viewId) {
  const route = Object.entries(routeToView).find(([, value]) => value === viewId)?.[0] || "/";
  navigateTo(route);
}

async function refreshSkillRunsForTask(taskId) {
  if (!taskId) return;
  // 切换任务时清空上一任务的运行，避免串台
  if (regulatorySkillRunsTaskId !== taskId) {
    regulatoryDecomposerRun = null;
    regulatoryMappingRun = null;
    regulatoryGapRun = null;
    regulatoryRemediationRun = null;
    regulatorySkillRunsTaskId = taskId;
  }
  let runs = [];
  try {
    const payload = await fetchJson(`/api/skills/runs?task_id=${encodeURIComponent(taskId)}`);
    runs = payload.runs || [];
  } catch (error) {
    return;
  }
  const latestBySkill = {};
  runs.forEach((run) => {
    if (!latestBySkill[run.skill_id]) latestBySkill[run.skill_id] = run;
  });
  const targets = {
    "regulatory-decomposer": (data) => (regulatoryDecomposerRun = data),
    "regulatory-mapping": (data) => (regulatoryMappingRun = data),
    "regulation-gap-analysis": (data) => (regulatoryGapRun = data),
    "remediation-implementation": (data) => (regulatoryRemediationRun = data),
  };
  await Promise.all(
    Object.entries(targets).map(async ([skillId, assign]) => {
      const summary = latestBySkill[skillId];
      if (!summary) return;
      try {
        assign(await fetchJson(`/api/skills/runs/${encodeURIComponent(summary.run_id)}`));
      } catch (error) {
        /* ignore */
      }
    })
  );
  if (currentRegulatoryDetailCaseId === taskId) renderRegulatoryDetail();
}

function renderRegulatoryRoute(routeState) {
  const workbench = document.getElementById("regulatory-workbench");
  const detail = document.getElementById("regulatory-detail");
  if (!workbench || !detail) return;
  const isDetail = routeState.isDetail;
  workbench.hidden = isDetail;
  detail.hidden = !isDetail;
  if (isDetail) {
    const caseItem = findRegulatoryCaseByTaskId(routeState.detailCaseId) || {
      case_id: normalizeTaskId(routeState.detailCaseId),
      title: "待接入完整分析结果",
      analysis_status: "pending_metadata_only",
    };
    selectedCaseId = normalizeTaskId(caseItem.case_id);
    currentRegulatoryDetailCaseId = selectedCaseId;
    if (isShowcaseCase(caseItem.case_id) || hasCompleteRealAnalysis(caseItem)) applySelectedCase(caseItem);
    renderRegulatoryDetail();
    if (!isShowcaseCase(caseItem.case_id)) refreshSkillRunsForTask(routeState.detailCaseId || selectedCaseId);
  } else {
    workbench.innerHTML = renderRegulatoryWorkbench();
    renderRegulatoryTaskList();
    renderScannerControls();
    renderScannerDocuments();
  }
}

function renderRegulatoryWorkbench() {
  const demo = regulatoryShowcase;
  const realCases = (regulatoryCases || []).filter((item) => !isShowcaseCase(item.case_id));
  const highGaps = demo?.metrics?.high_gaps ?? 0;
  return `
    <section class="reg-workbench-hero">
      <div>
        <span class="mode-pill demo">演示样本</span>
        <h3>外规内化分析工作台</h3>
        <p>${escapeHtml(demo?.notice || "基于预置样板数据展示外规内化全流程能力，不代表实时客户分析结论。")}</p>
        <div class="reg-hero-meta">
          <span>当前法规：${escapeHtml(demo?.regulation_title || "人民银行令〔2026〕第4号")}</span>
          <span>监管机构：${escapeHtml(demo?.regulator || "中国人民银行")}</span>
          <span>生效日期：${escapeHtml(demo?.effective_date || "2026-07-01")}</span>
          <span>总体状态：${escapeHtml(demo?.overall_status || "待人工复核")}</span>
        </div>
      </div>
      <div class="reg-hero-score">
        <span>高风险事项</span>
        <strong>${highGaps}</strong>
        <em>距生效日 ${escapeHtml(String(demo?.days_to_effective ?? 21))} 天</em>
        <button class="primary-action" type="button" data-route="${routeForTask(DEMO_TASK_ID, "overview")}">进入完整样板任务</button>
      </div>
    </section>
    ${renderRegulatoryFlowOverview(demo)}
    <section class="reg-section-grid">
      <div class="section-card">
        <div class="section-title-row">
          <div>
            <span class="mini-label">核心发现</span>
            <h3>首要风险与整改方向</h3>
          </div>
        </div>
        <div class="reg-finding-stack">
          ${(demo?.findings || [])
            .map(
              (item) => `
                <article class="reg-risk-card tone-high">
                  <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.area)}｜${escapeHtml(item.risk)}</span></div>
                  <p>${escapeHtml(item.summary)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="section-card">
        <div class="section-title-row">
          <div>
            <span class="mini-label">真实任务入口</span>
            <h3>上传、扫描与运行</h3>
            <p>真实任务仍使用当前上传、后端智能分析链路和历史任务查询能力；执行操作默认收起。</p>
          </div>
        </div>
        <details class="business-tech-drawer">
          <summary>展开真实任务操作面板</summary>
          <div class="case-controls compact">
            <label>
              <span>选择真实任务</span>
              <select id="case-select"></select>
            </label>
            <button class="ghost-action" id="refresh-cases-button" type="button">刷新任务库</button>
            <button class="ghost-action" id="reanalyze-button" type="button">重新分析当前任务</button>
            <p id="case-status">真实任务状态将在这里显示。</p>
          </div>
          <div class="scanner-controls compact">
            <label><span>监管机构</span><select id="scanner-sources" multiple size="4"></select></label>
            <label><span>回溯天数</span><input id="scanner-days" type="number" min="1" max="365" value="30" /></label>
            <label><span>业务领域</span><input id="scanner-domain" type="text" value="托管业务" /></label>
            <label><span>文件类型</span><select id="scanner-doc-types" multiple size="4">
              <option selected>部门规章</option>
              <option selected>规范性文件</option>
              <option selected>公告</option>
              <option selected>办法</option>
              <option selected>通知</option>
              <option selected>监管规则</option>
            </select></label>
          </div>
          <div class="button-row">
            <button class="primary-action" type="button" id="scanner-run-button">执行真实扫描</button>
          </div>
          <div id="scanner-status" class="empty-state small">尚未执行真实扫描。</div>
        </details>
      </div>
    </section>
    <section class="section-card">
      <div class="section-title-row">
        <div>
          <span class="mini-label">任务清单</span>
          <h3>外规内化任务</h3>
          <p>演示样本与真实任务明确分离，真实任务不会使用演示结论补齐。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="diligence-table">
          <thead>
            <tr><th>任务名称</th><th>监管机构</th><th>发布日期</th><th>状态</th><th>数据模式</th><th>操作</th></tr>
          </thead>
          <tbody id="regulatory-task-list"></tbody>
        </table>
      </div>
      <details class="business-tech-drawer">
        <summary>查看真实扫描候选文件</summary>
        <div class="table-wrap">
          <table class="diligence-table">
            <thead>
              <tr><th>监管机构</th><th>文件名称</th><th>文号</th><th>发布日期</th><th>生效日期</th><th>类型</th><th>相关性</th><th>抓取</th><th>原文</th><th>操作</th></tr>
            </thead>
            <tbody id="scanner-document-list"></tbody>
          </table>
        </div>
      </details>
    </section>
  `;
}

function renderScannerControls() {
  const sourceSelect = document.getElementById("scanner-sources");
  if (sourceSelect && regulatoryScannerSources.length) {
    sourceSelect.innerHTML = regulatoryScannerSources
      .map((source) => `<option value="${escapeHtml(source.source_id)}" selected>${escapeHtml(source.regulator)}</option>`)
      .join("");
  }
  const status = document.getElementById("scanner-status");
  if (!status) return;
  if (!regulatoryScannerLastRun) {
    status.textContent = "尚未执行真实扫描。";
    return;
  }
  const stateHint =
    regulatoryScannerLastRun.status === "completed_empty"
      ? "：未发现候选文件，需查看来源诊断"
      : "";
  status.innerHTML = `
    <div>上次扫描：${escapeHtml(regulatoryScannerLastRun.started_at || "—")}；状态：${escapeHtml(regulatoryScannerLastRun.status || "—")}${stateHint}</div>
    <div class="scanner-counts">
      官网原始候选数 ${regulatoryScannerLastRun.official_raw_candidate_count || 0} ·
      日期筛选后数量 ${regulatoryScannerLastRun.date_filter_count || 0} ·
      文件类型筛选后数量 ${regulatoryScannerLastRun.document_type_filter_count || 0} ·
      托管相关性筛选前数量 ${regulatoryScannerLastRun.custody_filter_before_count || 0} ·
      托管相关性筛选后数量 ${regulatoryScannerLastRun.custody_filter_after_count || 0} ·
      去重数量 ${regulatoryScannerLastRun.dedupe_candidate_count || 0} ·
      详情页获取成功数量 ${regulatoryScannerLastRun.detail_fetch_success_count || 0} ·
      正文解析成功数量 ${regulatoryScannerLastRun.text_success_count || 0} ·
      附件下载成功数量 ${regulatoryScannerLastRun.attachment_success_count || 0}
    </div>
    <button type="button" data-scanner-action="toggle-diagnostics">查看扫描诊断</button>
    <div id="scanner-diagnostics-panel" class="scanner-diagnostics" hidden>${renderScannerDiagnostics()}</div>
  `;
}

function renderScannerDiagnostics() {
  if (!regulatoryScannerDiagnostics.length) {
    return `<div class="empty-state small">暂无来源诊断。</div>`;
  }
  return `
    <table>
      <thead><tr><th>来源</th><th>HTTP</th><th>页面标题</th><th>原始/日期/类型/去重</th><th>详情/正文/附件</th><th>URL 与提示</th></tr></thead>
      <tbody>
        ${regulatoryScannerDiagnostics
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.regulator || item.source_id || "—")}<span>${escapeHtml(item.crawler_mode || "—")}</span></td>
                <td>${escapeHtml(String(item.http_status || "—"))}<span>${escapeHtml(item.content_type || "")}</span><span>${item.response_bytes || 0} bytes</span></td>
                <td>${escapeHtml(item.page_title || "—")}</td>
                <td>${item.raw_candidate_count || 0} / ${item.date_filter_count || 0} / ${item.document_type_filter_count || 0} / ${item.dedupe_count || 0}</td>
                <td>${item.detail_fetch_success_count || 0} / ${item.body_parse_success_count || 0} / ${item.attachment_download_success_count || 0}</td>
                <td>
                  <a href="${escapeHtml(item.list_page_url || "#")}" target="_blank" rel="noreferrer">栏目</a>
                  ${item.request_url ? `<a href="${escapeHtml(item.request_url)}" target="_blank" rel="noreferrer">请求</a>` : ""}
                  <span>${escapeHtml([...(item.warnings || []), ...(item.errors || [])].join("；") || "—")}</span>
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderScannerDocuments() {
  const tbody = document.getElementById("scanner-document-list");
  if (!tbody) return;
  const docs = regulatoryScannerDocuments.slice(0, 50);
  tbody.innerHTML = docs.length
    ? docs
        .map(
          (doc) => `
            <tr>
              <td>${escapeHtml(doc.regulator || doc.source_id || "—")}</td>
              <td><strong>${escapeHtml(doc.title)}</strong><span>${escapeHtml(doc.official_url)}</span></td>
              <td>${escapeHtml(doc.doc_number || "—")}</td>
              <td>${escapeHtml(doc.publish_date || "待识别")}</td>
              <td>${escapeHtml(doc.effective_date || "待识别")}</td>
              <td>${escapeHtml(doc.file_type || "待识别")}</td>
              <td>${escapeHtml(doc.custody_relevance || "unknown")}${doc.needs_human_confirmation ? " · 待人工确认" : ""}</td>
              <td>${escapeHtml(doc.fetch_status || "—")}</td>
              <td>${escapeHtml(doc.parse_status || "—")}</td>
              <td class="table-actions">
                <a href="${escapeHtml(doc.official_url)}" target="_blank" rel="noreferrer">官方原文</a>
                ${doc.snapshot_url ? `<a href="${escapeHtml(doc.snapshot_url)}" target="_blank" rel="noreferrer">快照</a>` : `<button type="button" disabled>无快照</button>`}
                ${doc.text_url ? `<a href="${escapeHtml(doc.text_url)}" target="_blank" rel="noreferrer">解析文本</a>` : `<button type="button" disabled>无正文</button>`}
                <button type="button" data-document-action="mark-irrelevant" data-document-id="${escapeHtml(doc.document_id)}">标记不相关</button>
                <button type="button" data-document-action="create-task" data-document-id="${escapeHtml(doc.document_id)}">${doc.is_task_created ? "已纳入" : "纳入任务"}</button>
              </td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="10">尚无真实扫描结果。点击“立即执行真实扫描”后，结果会写入监管识别文档库。</td></tr>`;
}

function isShowcaseCase(caseId) {
  const normalized = normalizeTaskId(caseId);
  return (normalized === DEMO_TASK_ID || caseId === LEGACY_SHOWCASE_CASE_ID) && Boolean(regulatoryShowcase);
}

function currentRegulatoryData(caseItem, caseData) {
  if (isShowcaseCase(caseItem?.case_id || caseData?.case_id)) return regulatoryShowcase;
  return null;
}

function findRegulatoryCaseByTaskId(taskId) {
  const normalized = normalizeTaskId(taskId);
  if (normalized === DEMO_TASK_ID && regulatoryShowcase) return showcaseCaseOption();
  return regulatoryCases.find((item) => normalizeTaskId(item.case_id) === normalized) || null;
}

function hasCompleteRealAnalysis(caseItem) {
  return Boolean(caseItem?.has_complete_analysis || caseItem?.analysis_status === "analyzed" || caseItem?.analysis_status === "completed");
}

function renderPendingTaskDetail(caseItem, tabId) {
  const title = caseTitle(caseItem) || "待接入完整分析结果";
  return `
    <section class="section-card">
      <div class="section-title-row">
        <div>
          <span class="mini-label">真实任务</span>
          <h3>待接入完整分析结果</h3>
          <p>该任务尚未形成完整的监管解读、内规映射、制度差距分析和整改落地结果，因此不进入空白工作台。</p>
        </div>
        <span class="status-badge pending">基础信息可查看</span>
      </div>
      <div class="info-grid">
        <div><span>任务名称</span><strong>${escapeHtml(title)}</strong></div>
        <div><span>任务编号</span><strong>${escapeHtml(caseItem?.case_id || currentRegulatoryDetailCaseId || "待识别")}</strong></div>
        <div><span>监管机构</span><strong>${escapeHtml(caseItem?.regulator || "待识别")}</strong></div>
        <div><span>发布日期</span><strong>${escapeHtml(caseItem?.publish_date || "待识别")}</strong></div>
        <div><span>当前页签</span><strong>${escapeHtml(regulatoryDetailTabs.find((item) => item.id === tabId)?.title || "总览")}</strong></div>
        <div><span>处理建议</span><strong>完成真实分析链路后再开放详情页</strong></div>
      </div>
    </section>
  `;
}

function renderRegulatoryFlowOverview(data) {
  const steps = data?.steps || [];
  const metrics = data?.metrics || {};
  return `
    <section class="section-card reg-flow-section">
      <div class="section-title-row">
        <div>
          <span class="mini-label">流程概览</span>
          <h3>五步外规内化闭环</h3>
        </div>
      </div>
      <div class="reg-flow-grid">
        ${steps
          .map(
            (step, index) => `
              <button class="reg-flow-card" type="button" data-route="${routeForTask(DEMO_TASK_ID, step.id === "identify" ? "source" : step.id)}">
                <span>${index + 1}</span>
                <strong>${escapeHtml(step.title)}</strong>
                <em>${escapeHtml(step.status)}</em>
                <p>${escapeHtml(step.summary)}</p>
                <div>
                  <small>条款 ${step.clauses}</small>
                  <small>要求 ${step.requirements}</small>
                  <small>映射 ${step.mappings}</small>
                  <small>高风险 ${step.high_gaps}</small>
                  <small>待复核 ${step.review_required}</small>
                </div>
              </button>
            `
          )
          .join("")}
      </div>
      <div class="reg-kpi-grid">
        ${[
          ["法规条款数", metrics.clauses],
          ["监管要求数", metrics.requirements],
          ["已确认映射", metrics.confirmed_mappings],
          ["待复核数", metrics.review_required],
          ["高风险差距", metrics.high_gaps],
          ["整改项数", metrics.remediation_items],
          ["合规覆盖率", `${metrics.coverage_rate}%`],
          ["距生效日", `${data?.days_to_effective ?? 0}天`],
        ]
          .map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value ?? "—")}</strong></div>`)
          .join("")}
      </div>
    </section>
  `;
}

function renderRegulatoryTaskList() {
  const tbody = document.getElementById("regulatory-task-list");
  if (!tbody) return;
  const cases = regulatoryCases.length ? regulatoryCases : [showcaseCaseOption()];
  tbody.innerHTML = cases
    .slice(0, 12)
    .map((item) => {
      const isDemo = isShowcaseCase(item.case_id);
      const taskId = isDemo || isShowcaseCase(item.case_id) ? DEMO_TASK_ID : item.case_id;
      const status = isDemo ? "演示样本" : item.analysis_status === "analyzed" ? "分析完成" : item.analysis_status === "pending" ? "等待执行" : "待人工复核";
      const dataMode = isDemo ? "演示样板数据" : "真实任务数据";
      return `
        <tr>
          <td><strong>${escapeHtml(caseTitle(item))}</strong><span>${isDemo ? "基于预置样板数据，不代表实时客户分析结论" : escapeHtml(item.case_id)}</span></td>
          <td>${escapeHtml(item.regulator || "待识别")}</td>
          <td>${escapeHtml(item.publish_date || "待识别")}</td>
          <td><span class="status-badge ${isDemo || item.analysis_status === "analyzed" ? "done" : "pending"}">${escapeHtml(status)}</span></td>
          <td>${escapeHtml(dataMode)}</td>
          <td><button type="button" data-route="${routeForTask(taskId, "overview")}">查看详情</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderRegulatoryDetail() {
  const panel = document.getElementById("regulatory-detail-panel");
  const tabs = document.getElementById("regulatory-detail-tabs");
  if (!panel || !tabs || document.getElementById("regulatory-detail")?.hidden) return;
  const tabExists = regulatoryDetailTabs.some((tab) => tab.id === currentRegulatoryTab);
  if (!tabExists) currentRegulatoryTab = "overview";
  const caseItem = findRegulatoryCaseByTaskId(currentRegulatoryDetailCaseId) || {
    case_id: normalizeTaskId(currentRegulatoryDetailCaseId),
    title: "待接入完整分析结果",
    analysis_status: "pending_metadata_only",
  };
  const caseData = regulatoryCase || buildCaseFromApi(caseItem);
  const businessData = currentRegulatoryData(caseItem, caseData);
  const isComplete = Boolean(businessData) || hasCompleteRealAnalysis(caseItem);
  const title = businessData?.task?.name || businessData?.title || caseTitle(caseItem);
  document.getElementById("regulatory-detail-title").textContent = title;
  document.getElementById("regulatory-detail-meta").textContent = businessData
    ? `${businessData.task?.dataMode || businessData.badge} · ${businessData.regulator} · ${businessData.publish_date} 发布 · 任务状态：${businessData.task?.status || businessData.overall_status}`
    : `真实任务 · ${caseItem.regulator || caseData.regulator || "监管机构待识别"} · ${caseItem.publish_date || caseData.publish_date || "发布日期待识别"}`;
  document.querySelector("[data-detail-deliverables]")?.setAttribute("data-route", routeForCurrentCase("artifacts"));
  const reportLink = document.getElementById("detail-report-link");
  if (reportLink) reportLink.href = "./reports/regulatory-full-flow.html";

  tabs.innerHTML = regulatoryDetailTabs
    .map(
      (tab) => `
        <button
          class="${tab.id === currentRegulatoryTab ? "is-active" : ""}"
          type="button"
          data-regulatory-tab="${tab.routeKey || externalTabId(tab.id)}"
          role="tab"
          aria-selected="${tab.id === currentRegulatoryTab ? "true" : "false"}"
        >${tab.title}</button>
      `
    )
    .join("");
  try {
    // 五阶段流程只在“总览”页呈现（renderRegulatoryFlowOverview），其余 Tab 不再重复
    // 顶部的五阶段卡片，避免与 Tab 栏、任务卡信息三重冗余。
    panel.innerHTML = isComplete
      ? renderRegulatoryTabPanel(currentRegulatoryTab, caseItem, caseData)
      : renderPendingTaskDetail(caseItem, currentRegulatoryTab);
  } catch (error) {
    console.error("外规内化页签渲染失败", error);
    panel.innerHTML = renderRegulatoryTabFallback(currentRegulatoryTab, error);
  }
}

function renderRegulatoryTabFallback(tabId, error) {
  const tab = regulatoryDetailTabs.find((item) => item.id === internalTabId(tabId));
  return `
    <section class="section-card">
      <div class="section-title-row">
        <div>
          <span class="mini-label">页面加载提示</span>
          <h3>${escapeHtml(tab?.title || "当前页签")}暂未完成渲染</h3>
          <p>当前页签点击已触发，但内容渲染时遇到数据字段缺失。请检查样板数据或刷新页面。</p>
        </div>
        <span class="status-badge pending">待排查</span>
      </div>
      <div class="empty-state small">${escapeHtml(error?.message || "未知渲染错误")}</div>
    </section>
  `;
}

function renderReportPreview(title, url) {
  return `
    <section class="report-shell unified-preview">
      <div class="report-toolbar">
        <div>
          <span>报告预览</span>
          <strong>${escapeHtml(title)}</strong>
        </div>
        <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">新窗口打开</a>
      </div>
      <iframe title="${escapeHtml(title)}" src="${escapeHtml(url)}"></iframe>
    </section>
  `;
}

function renderRegulatoryTabPanel(tabId, caseItem, caseData) {
  tabId = internalTabId(tabId);
  const businessData = currentRegulatoryData(caseItem, caseData);
  if (businessData) return renderShowcaseRegulatoryTab(tabId, businessData);
  return renderRealBusinessRegulatoryTab(tabId, caseItem, caseData);
}

function renderRealBusinessRegulatoryTab(tabId, caseItem, caseData) {
  tabId = internalTabId(tabId);
  const title = caseTitle(caseItem);
  const runs = [regulatoryDecomposerRun, regulatoryMappingRun, regulatoryGapRun, regulatoryRemediationRun].filter(Boolean);
  const realNotice = `
    <div class="showcase-notice real">
      <span>真实任务</span>
      <strong>使用上传文件、监管扫描结果和后端智能分析链路生成，不使用演示样板数据补齐。</strong>
    </div>
  `;
  if (tabId === "overview") {
    return `
      ${realNotice}
      <section class="reg-business-hero">
        <div>
          <span class="mode-pill real">真实任务</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(caseItem.summary || caseItem.content || "当前真实任务等待业务化分析结果。若尚未运行，请在审阅与留痕页展开真实任务执行面板。")}</p>
          <div class="reg-hero-meta">
            <span>监管机构：${escapeHtml(caseItem.regulator || "待识别")}</span>
            <span>发布日期：${escapeHtml(caseItem.publish_date || "待识别")}</span>
            <span>生效日期：${escapeHtml(caseItem.effective_date || "待识别")}</span>
            <span>当前状态：${escapeHtml(runStatusLabel(caseItem.analysis_status || "pending"))}</span>
          </div>
        </div>
        <div class="reg-hero-score">
          <span>运行结果</span>
          <strong>${runs.length}</strong>
          <em>已生成分析步骤</em>
          <button class="primary-action" type="button" data-route="${routeForCurrentCase("audit")}">进入审阅与留痕</button>
        </div>
      </section>
      ${renderRealProgressCards()}
    `;
  }
  if (tabId === "source") {
    return `
      ${realNotice}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">监管原文</span><h3>监管文件信息</h3></div><span class="status-badge pending">${caseItem.content ? "原文已读取" : "原文待核验"}</span></div>
        <div class="info-grid">
          <div><span>文件名称</span><strong>${escapeHtml(title)}</strong></div>
          <div><span>发布机构</span><strong>${escapeHtml(caseItem.regulator || "待识别")}</strong></div>
          <div><span>发布日期</span><strong>${escapeHtml(caseItem.publish_date || "待识别")}</strong></div>
          <div><span>生效日期</span><strong>${escapeHtml(caseItem.effective_date || "待识别")}</strong></div>
          <div><span>来源链接</span><strong>${caseItem.url ? `<a href="${escapeHtml(caseItem.url)}" target="_blank" rel="noreferrer">打开监管来源</a>` : "待接入"}</strong></div>
          <div><span>数据模式</span><strong>真实任务数据</strong></div>
        </div>
        <div class="source-text">${escapeHtml(caseItem.content || caseItem.summary || "真实任务原文尚未完成解析，请在审阅与留痕页执行监管解读或检查来源。")}</div>
      </section>
    `;
  }
  if (tabId === "interpretation") return `${realNotice}${renderRealInterpretationBusiness()}`;
  if (tabId === "mapping") return `${realNotice}${renderRealMappingBusiness()}`;
  if (tabId === "gap") return `${realNotice}${renderRealGapBusiness()}`;
  if (tabId === "remediation") return `${realNotice}${renderRealRemediationBusiness()}`;
  if (tabId === "artifacts") return `${realNotice}<section class="section-card"><div class="section-title-row"><div><span class="mini-label">交付物</span><h3>真实任务交付物</h3></div></div>${renderRunArtifacts()}</section>`;
  if (tabId === "audit") {
    return `
      ${realNotice}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">审阅与留痕</span><h3>复核、执行与技术信息</h3></div></div>
        ${renderAuditTrail()}
        <details class="business-tech-drawer">
          <summary>真实任务执行面板</summary>
          ${renderRealTaskOperations()}
        </details>
        <details class="tech-info">
          <summary>技术信息（供审计 / 排查）</summary>
          <div class="notice-list"><p>运行编号、任务编号、模型配置、原始文件路径、输入输出参数等仅在本区域展开查看。</p></div>
          ${runs.map((run) => techInfo(run)).join("") || `<div class="empty-state small">暂无技术运行记录。</div>`}
        </details>
      </section>
    `;
  }
  return `<div class="empty-state">当前页签待接入。</div>`;
}

function renderRealProgressCards() {
  const items = [
    ["监管解读", regulatoryDecomposerRun],
    ["内规映射", regulatoryMappingRun],
    ["制度差距分析", regulatoryGapRun],
    ["整改落地", regulatoryRemediationRun],
  ];
  return `
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">真实任务进度</span><h3>分析步骤</h3></div></div>
      <div class="reg-flow-grid compact">
        ${items
          .map(
            ([label, run], index) => `
              <div class="reg-flow-card readonly">
                <span>${index + 1}</span>
                <strong>${label}</strong>
                <em>${run ? runStatusLabel(run.status) : "等待执行"}</em>
                <p>${run ? "已生成真实运行结果，业务结果见对应页签，技术信息见审阅与留痕。" : "尚未执行，不显示演示结论。"}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderRealInterpretationBusiness() {
  const result = regulatoryDecomposerRun?.structured_result || {};
  const dimensions = result.fiveDimensions || {};
  const requirements = dimensions.regulatoryRequirements || [];
  const clauses = result.clauses || [];
  if (!regulatoryDecomposerRun) {
    return `<section class="section-card"><div class="empty-state">真实监管解读尚未执行。请到“审阅与留痕”展开真实任务执行面板。</div></section>`;
  }
  return `
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">监管解读</span><h3>真实解读结果</h3></div><span class="status-badge pending">${escapeHtml(runStatusLabel(regulatoryDecomposerRun.status))}</span></div>
      ${renderRegKpis([["已解析条款", clauses.length], ["提取监管要求", requirements.length], ["待人工复核", result.review?.items?.length || 0]])}
      <div class="reg-card-grid four">
        ${[
          ["政策背景", dimensions.regulatoryIntent?.policyBackground],
          ["监管目标", dimensions.regulatoryIntent?.regulatoryGoal],
          ["风险关切", dimensions.regulatoryIntent?.riskConcern],
          ["预期效果", dimensions.regulatoryIntent?.expectedEffect],
        ].map(([label, text]) => `<article><strong>${escapeHtml(label)}</strong><p>${escapeHtml(text || "待人工复核。")}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function renderRealMappingBusiness() {
  const result = regulatoryMappingRun?.structured_result || {};
  const s = result.summary || {};
  const mappings = result.mappings || [];
  if (!regulatoryMappingRun) return `<section class="section-card"><div class="empty-state">真实内规映射尚未执行。没有内规证据时，本页不会默认显示已映射或完全满足。</div></section>`;
  return `
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">内规映射</span><h3>真实映射结果</h3></div><span class="status-badge pending">${escapeHtml(runStatusLabel(regulatoryMappingRun.status))}</span></div>
      ${renderRegKpis([["监管要求", s.totalRequirements || 0], ["已映射", s.mappedCount || 0], ["待人工复核", s.reviewRequiredCount || 0], ["内规条款", s.internalClauseCount || 0]])}
      <div class="reg-mapping-stack">
        ${mappings.length ? mappings.slice(0, 8).map((m) => renderMappingCompareCard({
          external_clause: m.externalClauseRef || m.requirementId || "外规要求",
          requirement_id: m.requirementId || "REQ",
          external_requirement: m.externalText || m.mappingSummary || "待人工复核",
          action: m.dimension || "映射",
          risk: m.needsReview ? "待人工复核" : "候选映射",
          status: m.matchedInternalClauseRef ? "候选映射" : "未检索到可用内规依据",
          confidence: m.confidence ?? 0,
          relation: m.mappingSummary || "待人工复核",
          review: m.manualReviewStatus || "待人工复核",
          policy: m.matchedInternalClauseRef || "未检索到可用内规依据",
          policy_clause: m.matchedInternalClauseRef || "无法判断",
          evidence: m.internalExcerpt || "暂无内规证据"
        })).join("") : `<div class="empty-state small">未检索到可用内规依据或映射结果为空。</div>`}
      </div>
    </section>
  `;
}

function renderRealGapBusiness() {
  const result = regulatoryGapRun?.structured_result || {};
  const gaps = result.gapItems || [];
  if (!regulatoryGapRun) return `<section class="section-card"><div class="empty-state">真实制度差距分析尚未执行。没有内规证据时，只能显示无法判断或待人工复核。</div></section>`;
  return `
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">制度差距分析</span><h3>真实差距结果</h3></div><span class="status-badge pending">${escapeHtml(runStatusLabel(regulatoryGapRun.status))}</span></div>
      <div class="reg-gap-stack">
        ${gaps.length ? gaps.map((g) => renderGapCard({
          id: g.gapId || "待编号",
          external_clause: g.externalClauseRef || "外规依据待核验",
          requirement: g.obligationSummary || g.requirement || "监管要求待核验",
          policy: g.internalBasis || "未检索到可用内规依据",
          satisfaction: g.complianceLevel || "无法判断 / 待人工复核",
          risk: g.riskLevel || "待人工复核",
          type: g.gapType || "待人工复核",
          description: g.gapDescription || "差距说明待人工复核。",
          evidence: g.internalEvidence || "暂无内规证据。",
          recommendation: g.recommendation || "需补充内规证据后判断。",
          priority: g.priority || "待定",
          owner: g.ownerDepartment || "待指定",
          review: g.needsReview === false ? "已复核" : "待人工复核",
        })).join("") : `<div class="empty-state small">暂无差距结果。</div>`}
      </div>
    </section>
  `;
}

function renderRealRemediationBusiness() {
  const result = regulatoryRemediationRun?.structured_result || {};
  const items = result.items || [];
  if (!regulatoryRemediationRun) return `<section class="section-card"><div class="empty-state">真实整改方案尚未生成。请先完成真实制度差距分析。</div></section>`;
  return `
    <section class="section-card">
      <div class="section-title-row"><div><span class="mini-label">整改落地</span><h3>真实整改计划</h3></div><span class="status-badge pending">${escapeHtml(runStatusLabel(regulatoryRemediationRun.status))}</span></div>
      <div class="reg-remediation-grid">
        ${items.length ? items.map((item) => `<article><span>${escapeHtml(item.priority || "待定")}｜${escapeHtml(item.plannedCompletionDate || "待排期")}</span><strong>${escapeHtml(item.remediationId || item.gapId || "整改项")}</strong><p>${escapeHtml(item.dimensions?.control?.description || item.externalBasis || "整改内容待复核。")}</p><em>${escapeHtml(item.ownerDepartment || "待指定责任部门")}</em></article>`).join("") : `<div class="empty-state small">暂无整改项。</div>`}
      </div>
    </section>
  `;
}

function renderRealRegulatoryTabPanel(tabId, caseItem, caseData) {
  const steps = caseData.steps || fallbackRegulatoryCase.steps;
  const currentStep = steps.find((step) => stepToDetailTab[step.step_id] === tabId) || steps[0];
  if (tabId === "overview") {
    return `
      <div class="detail-grid">
        <section class="section-card">
          <div class="section-title-row"><div><span class="mini-label">流程进度</span><h3>五步流程</h3></div></div>
          <div class="pipeline detail-pipeline">
            ${steps
              .map(
                (step, index) => `
                  <button class="step-card" type="button" data-route="${routeForCurrentCase(stepToDetailTab[step.step_id] || "overview")}">
                    <span class="step-no">${index + 1}</span>
                    <h4>${escapeHtml(step.title)}</h4>
                    <p>${escapeHtml(step.summary)}</p>
                    <div class="step-kpis">${step.kpis.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
                  </button>
                `
              )
              .join("")}
          </div>
        </section>
        <section class="section-card">
          <div class="section-title-row"><div><span class="mini-label">专业边界</span><h3>专业逻辑保护</h3></div></div>
          <div class="notice-list">
            <p><strong>只读接入：</strong>本页读取现有 Skills 输出、HTML 报告和交付文件，不修改判断规则、阈值、Prompt 或输出口径。</p>
            <p><strong>演示标记：</strong>SQLite 中未完成 Skill 输出的结构化字段均标记为“待接入”或“演示数据”。</p>
            <p><strong>人工复核：</strong>低置信度映射、Gap 结论和整改任务不会在前端自动确认。</p>
          </div>
        </section>
      </div>
    `;
  }
  if (tabId === "source") {
    return `
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">监管原文</span><h3>监管原文</h3></div><span class="status-badge pending">部分待接入</span></div>
        <div class="info-grid">
          <div><span>文件名称</span><strong>${escapeHtml(caseTitle(caseItem))}</strong></div>
          <div><span>发布机构</span><strong>${escapeHtml(caseItem.regulator || "待识别")}</strong></div>
          <div><span>发布日期</span><strong>${escapeHtml(caseItem.publish_date || "待识别")}</strong></div>
          <div><span>生效日期</span><strong>${escapeHtml(caseItem.effective_date || "待识别")}</strong></div>
          <div><span>官方来源</span><strong>${caseItem.url ? `<a href="${escapeHtml(caseItem.url)}" target="_blank" rel="noreferrer">打开官方原文</a>` : "待接入"}</strong></div>
          <div><span>数据口径</span><strong>${caseItem.case_id === fallbackRegulatoryCase.case_id ? "历史案例结果" : "真实扫描结果"}</strong></div>
        </div>
        <div class="source-text">${escapeHtml(caseItem.content || caseItem.summary || "监管原文结构化内容待接入。")}</div>
      </section>
    `;
  }
  if (tabId === "interpretation") {
    return `
      <section class="section-card">
        <div class="section-title-row">
          <div><span class="mini-label">实时执行</span><h3>监管解读真实执行</h3></div>
          <span class="status-badge pending">${regulatoryDecomposerRun ? escapeHtml(runStatusLabel(regulatoryDecomposerRun.status)) : "待执行"}</span>
        </div>
        <div class="notice-list">
          <p><strong>专业边界：</strong>本步骤严格引用 <code>docs/监管解读(1).docx</code> 的五维义务拆解口径；不读取历史 HTML 作为分析主体，不调用 <code>build_analysis()</code>。</p>
          <p><strong>安全边界：</strong>前端只上传文件到 Python 后端；DeepSeek API Key 仅由后端从 <code>.env</code> 读取。</p>
        </div>
        <div class="runtime-panel">
          <label class="file-drop">
            <span>上传外规文件（.docx / .txt / .md）</span>
            <input id="regulatory-decomposer-file" type="file" accept=".docx,.txt,.md" />
          </label>
          <div class="button-row">
            <button type="button" data-skill-action="check-llm">检查 模型配置</button>
            <button class="primary-action" type="button" data-skill-action="run-regulatory-decomposer">执行监管解读</button>
            <button type="button" data-skill-action="run-regulatory-decomposer-from-case">使用当前任务监管原文执行</button>
          </div>
        </div>
        ${renderLlmHealth()}
        ${renderRegulatoryDecomposerResult()}
      </section>
    `;
  }
  if (tabId === "mapping") {
    return `
      <section class="section-card">
        <div class="section-title-row">
          <div><span class="mini-label">内规映射</span><h3>内规映射真实执行</h3></div>
          <span class="status-badge pending">${regulatoryMappingRun ? escapeHtml(runStatusLabel(regulatoryMappingRun.status)) : "待执行"}</span>
        </div>
        <div class="notice-list">
          <p><strong>专业边界：</strong>严格引用 <code>docs/制度映射(1).docx</code>；内规条款级切分 + BM25/关键词候选 + DeepSeek 受控映射复核，模型只能在候选集合内选择，不自由猜测。</p>
          <p><strong>上游输入：</strong>${renderUpstreamHint(regulatoryDecomposerRun, "监管解读义务库")}</p>
        </div>
        <div class="runtime-panel">
          <label class="file-drop">
            <span>上传内规制度文件（.docx / .txt / .md）</span>
            <input id="regulatory-mapping-file" type="file" accept=".docx,.txt,.md" />
          </label>
          <div class="button-row">
            <button class="primary-action" type="button" data-skill-action="run-regulatory-mapping">执行内规映射</button>
            ${regulatoryMappingRun ? `<button type="button" data-skill-action="run-regulatory-mapping">重新执行</button>` : ""}
          </div>
        </div>
        ${renderMappingResult()}
      </section>
    `;
  }
  if (tabId === "gap") {
    return `
      <section class="section-card">
        <div class="section-title-row">
          <div><span class="mini-label">制度差距分析</span><h3>制度差距分析真实执行</h3></div>
          <span class="status-badge pending">${regulatoryGapRun ? escapeHtml(runStatusLabel(regulatoryGapRun.status)) : "待执行"}</span>
        </div>
        <div class="notice-list">
          <p><strong>专业边界：</strong>严格引用 <code>docs/Gap分析(1).docx</code>；区分 满足/部分满足/未满足 × 高/中/低风险 × 制度型/执行型/混合型。</p>
          <p><strong>上游输入：</strong>${renderUpstreamHint(regulatoryDecomposerRun, "监管解读")} ｜ ${renderUpstreamHint(regulatoryMappingRun, "内规映射")}</p>
        </div>
        <div class="button-row">
          <button class="primary-action" type="button" data-skill-action="run-gap-analysis">执行制度差距分析</button>
          ${regulatoryGapRun ? `<button type="button" data-skill-action="run-gap-analysis">重新执行</button>` : ""}
        </div>
        ${renderGapResult()}
      </section>
    `;
  }
  if (tabId === "remediation") {
    return `
      <section class="section-card">
        <div class="section-title-row">
          <div><span class="mini-label">整改落地</span><h3>整改落地真实执行</h3></div>
          <span class="status-badge pending">${regulatoryRemediationRun ? escapeHtml(runStatusLabel(regulatoryRemediationRun.status)) : "待执行"}</span>
        </div>
        <div class="notice-list">
          <p><strong>专业边界：</strong>严格引用 <code>docs/整改落地(1).docx</code>；按 制度/流程/系统/控制点 四维输出，制度草案标注“AI 辅助草案，须经法律合规部门审查”。</p>
          <p><strong>上游输入：</strong>${renderUpstreamHint(regulatoryGapRun, "差距清单")}</p>
        </div>
        <div class="button-row">
          <button class="primary-action" type="button" data-skill-action="run-remediation">生成整改方案</button>
          ${regulatoryRemediationRun ? `<button type="button" data-skill-action="run-remediation">重新执行</button>` : ""}
        </div>
        ${renderRemediationResult()}
      </section>
    `;
  }
  if (tabId === "artifacts") {
    return `
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">交付物</span><h3>交付物</h3></div></div>
        ${renderRunArtifacts()}
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">历史基准</span><h3>历史案例交付物（只读基准）</h3></div></div>
        <div class="artifact-grid">${renderArtifactCards()}</div>
        <div class="empty-state small">历史 HTML 报告仅作为回归比对基准与交付物预览，不代表本次实时运行结果。</div>
      </section>
    `;
  }
  if (tabId === "audit") {
    return `
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">审阅与留痕</span><h3>审阅与留痕</h3></div></div>
        ${renderAuditTrail()}
      </section>
    `;
  }
  return `<div class="empty-state">当前页签待接入。</div>`;
}

function toneClass(value) {
  const text = String(value || "");
  if (text.includes("高") || text.includes("未满足") || text.includes("紧急")) return "high";
  if (text.includes("中") || text.includes("部分") || text.includes("候选") || text.includes("待")) return "medium";
  return "low";
}

function renderShowcaseNotice(data) {
  return `
    <div class="showcase-notice">
      <span>${escapeHtml(data.badge || "演示样本")}</span>
      <strong>${escapeHtml(data.notice || "基于预置样板数据展示外规内化全流程能力，不代表实时客户分析结论。")}</strong>
    </div>
  `;
}

function renderShowcaseHero(data) {
  const metrics = data.metrics || {};
  return `
    <section class="reg-business-hero">
      <div>
        <span class="mode-pill demo">${escapeHtml(data.badge || "演示样本")}</span>
        <h3>${escapeHtml(data.regulation_title)}</h3>
        <p>${escapeHtml(data.summary)}</p>
        <div class="reg-hero-meta">
          <span>监管机构：${escapeHtml(data.regulator)}</span>
          <span>发布日期：${escapeHtml(data.publish_date)}</span>
          <span>生效日期：${escapeHtml(data.effective_date)}</span>
          <span>适用领域：${escapeHtml(data.domain)}</span>
          <span>风险等级：${escapeHtml(data.risk_level)}</span>
          <span>当前状态：${escapeHtml(data.overall_status)}</span>
        </div>
      </div>
      <div class="reg-hero-score">
        <span>合规覆盖率</span>
        <strong>${escapeHtml(String(metrics.coverage_rate ?? "—"))}%</strong>
        <em>高风险差距 ${escapeHtml(String(metrics.high_gaps ?? "—"))} 项</em>
      </div>
    </section>
  `;
}

function renderRegKpis(items) {
  return `
    <div class="reg-kpi-grid">
      ${items.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value ?? "—")}</strong></div>`).join("")}
    </div>
  `;
}

function renderDistributionBar(items) {
  const total = items.reduce((sum, item) => sum + Number(item.count || item.rate || 0), 0) || 1;
  return `
    <div class="reg-distribution">
      <div class="reg-distribution-bar">
        ${items
          .map((item) => {
            const value = Number(item.rate ?? item.count ?? 0);
            return `<span class="tone-${toneClass(item.label)}" style="width:${Math.max(4, (value / total) * 100).toFixed(2)}%"></span>`;
          })
          .join("")}
      </div>
      <div class="reg-distribution-legend">
        ${items.map((item) => `<span><i class="tone-${toneClass(item.label)}"></i>${escapeHtml(item.label)} ${escapeHtml(item.count ?? `${item.rate}%`)}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderShowcaseRegulatoryTab(tabId, data) {
  tabId = internalTabId(tabId);
  const m = data.metrics || {};
  const task = data.task || {};
  const externalRegulation = data.externalRegulation || {};
  const requirements = data.requirements || data.interpretation?.requirements || [];
  const internalPolicies = data.internalPolicies || data.policy_documents || [];
  const mappingRecords = data.mappingRecords || data.mapping?.items || [];
  const gapRecords = data.gapRecords || data.gap_analysis?.items || [];
  const rectificationActions = data.rectificationActions || [];
  const deliverables = data.deliverables || data.artifacts || [];
  const reviewLogs = data.reviewLogs || [];
  const source = data.source || { abstract: externalRegulation.summary || data.summary || "", chapters: [], clauses: externalRegulation.clauses || [] };
  const interpretation = data.interpretation || { intent: [] };
  const mapping = data.mapping || { coverage: [], matrix: [] };
  const gapAnalysis = data.gap_analysis || { satisfaction: [], risk_by_area: [] };
  const remediation = data.remediation || { summary: {}, urgent: [], policy_revisions: [], drafts: [], timeline: [] };
  const audit = data.audit || { business_notes: [], technical_items: [] };
  if (tabId === "overview") {
    return `
      ${renderShowcaseNotice(data)}
      ${renderShowcaseHero(data)}
      ${renderRegulatoryFlowOverview(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">核心发现</span><h3>风险提示与首要整改事项</h3></div></div>
        <div class="reg-finding-grid">
          ${(data.findings || [])
            .map(
              (item) => `
                <article class="reg-risk-card tone-${toneClass(item.risk)}">
                  <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.area)}｜${escapeHtml(item.risk)}</span></div>
                  <p>${escapeHtml(item.summary)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }
  if (tabId === "source") {
    return `
      ${renderShowcaseNotice(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">监管原文</span><h3>监管文件基本信息</h3><p>${escapeHtml(source.abstract)}</p></div><span class="status-badge done">原文完整</span></div>
        <div class="info-grid">
          <div><span>文件全称</span><strong>${escapeHtml(data.full_name)}</strong></div>
          <div><span>监管机构</span><strong>${escapeHtml(data.regulator)}</strong></div>
          <div><span>发布时间</span><strong>${escapeHtml(data.publish_date)}</strong></div>
          <div><span>生效日期</span><strong>${escapeHtml(data.effective_date)}</strong></div>
          <div><span>适用对象</span><strong>${escapeHtml(data.domain)}</strong></div>
          <div><span>来源入口</span><strong><a href="${escapeHtml(data.source_url)}" target="_blank" rel="noreferrer">查看监管机构网站</a></strong></div>
        </div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">章节目录</span><h3>法规结构</h3></div></div>
        <div class="reg-chapter-grid">
          ${source.chapters.map((chapter) => `<div><strong>${escapeHtml(chapter.title)}</strong><span>${chapter.count} 条</span></div>`).join("")}
        </div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">条款原文</span><h3>完整条款卡</h3></div></div>
        <div class="reg-clause-stack">
          ${source.clauses
            .map(
              (clause) => `
                <details class="reg-clause-card">
                  <summary>
                    <span>${escapeHtml(clause.number)}</span>
                    <strong>${escapeHtml(clause.title)}</strong>
                    <em>${escapeHtml(clause.completeness)}</em>
                  </summary>
                  <p>${escapeHtml(clause.summary)}</p>
                  <div>${escapeHtml(clause.text)}</div>
                  <a href="${escapeHtml(data.source_url)}" target="_blank" rel="noreferrer">查看来源链接</a>
                </details>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }
  if (tabId === "interpretation") {
    const reqs = requirements;
    return `
      ${renderShowcaseNotice(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">解读结论</span><h3>监管解读总览</h3></div></div>
        ${renderRegKpis([
          ["已解析条款", m.clauses],
          ["提取监管要求", m.requirements],
          ["强制性要求", m.mandatory],
          ["程序性要求", m.procedural],
          ["一般性要求", m.general],
          ["高风险要求", reqs.filter((item) => (item.riskLevel || item.risk) === "高风险").length],
          ["待人工复核", reqs.filter((item) => String(item.reviewStatus || item.review || "").includes("待")).length],
        ])}
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">监管意图</span><h3>四维意图分析</h3></div></div>
        <div class="reg-card-grid four">
          ${interpretation.intent.map((item) => `<article><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></article>`).join("")}
        </div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">监管要求</span><h3>要求卡片</h3></div></div>
        <div class="reg-requirement-grid">
          ${reqs
            .map(
              (item) => `
                <details class="reg-requirement-card tone-${toneClass(item.riskLevel || item.risk)}">
                  <summary><span>${escapeHtml(item.id)}</span><strong>${escapeHtml(item.requirement || item.summary)}</strong><em>${escapeHtml(item.riskLevel || item.risk)}</em></summary>
                  <div class="reg-requirement-body">
                    <p><b>所属条款：</b>${escapeHtml(item.clause)}</p>
                    <p><b>责任主体：</b>${escapeHtml(item.responsibleSubject || item.subject)}</p>
                    <p><b>监管动作：</b>${escapeHtml(item.action)}</p>
                    <p><b>控制要点：</b>${escapeHtml(item.controlPoint || item.object)}</p>
                    <p><b>适用范围：</b>${escapeHtml(item.scope || data.domain)}</p>
                    <p><b>时点要求：</b>${escapeHtml(item.timing || item.deadline)}</p>
                    <p><b>强制性等级：</b>${escapeHtml(item.mandatoryLevel || item.level)}</p>
                    <p><b>复核状态：</b>${escapeHtml(item.reviewStatus || item.review)}</p>
                  </div>
                </details>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }
  if (tabId === "mapping") {
    return `
      ${renderShowcaseNotice(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">内规映射</span><h3>映射总览</h3></div></div>
        ${renderRegKpis([
          ["监管要求总数", mappingRecords.length],
          ["已确认映射", mappingRecords.filter((item) => item.mappingStatus === "满足").length],
          ["候选映射", mappingRecords.filter((item) => item.mappingStatus === "部分满足").length],
          ["未找到内规", mappingRecords.filter((item) => String(item.internalPolicy).includes("未检索")).length],
          ["待人工复核", mappingRecords.filter((item) => String(item.reviewStatus).includes("待")).length],
          ["映射覆盖率", `${m.coverage_rate}%`],
          ["内规文件数", internalPolicies.length],
        ])}
        ${renderDistributionBar(mapping.coverage)}
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">覆盖矩阵</span><h3>外规条款 × 内规制度</h3></div></div>
        ${renderCoverageMatrix(mapping.matrix)}
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">制度清单</span><h3>内规制度清单</h3></div></div>
        <div class="reg-policy-grid">
          ${internalPolicies.map((doc) => `<article><span>${escapeHtml(doc.type)}｜${escapeHtml(doc.year)}</span><strong>${escapeHtml(doc.name)}</strong><p>${(doc.areas || []).map(escapeHtml).join("、")}</p><em>${escapeHtml(doc.coverage || doc.clauseSummary || "见报告原文")}</em></article>`).join("")}
        </div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">映射明细</span><h3>左右对照卡</h3></div></div>
        <div class="reg-mapping-stack">
          ${mappingRecords.map((item) => renderMappingCompareCard({
            external_clause: item.externalClause,
            requirement_id: item.id,
            external_requirement: item.externalRequirement,
            action: item.externalBasis,
            risk: item.mappingStatus,
            status: item.mappingStatus,
            confidence: item.confidence,
            relation: item.mappingBasis,
            review: item.reviewStatus,
            policy: item.internalPolicy,
            policy_clause: item.internalPolicy,
            evidence: item.internalClause,
          })).join("")}
        </div>
      </section>
    `;
  }
  if (tabId === "gap") {
    const gaps = gapRecords;
    const gapTypes = Object.entries(gaps.reduce((acc, item) => {
      const key = item.gapType || item.type || "待人工复核";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})).map(([label, count]) => ({ label, count }));
    return `
      ${renderShowcaseNotice(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">制度差距分析</span><h3>差距指标</h3></div></div>
        ${renderRegKpis([
          ["制度差距总数", gaps.length],
          ["满足", gaps.filter((item) => item.satisfaction === "满足").length],
          ["部分满足", gaps.filter((item) => String(item.satisfaction).includes("部分")).length],
          ["未满足", gaps.filter((item) => String(item.satisfaction).includes("不合规") || String(item.satisfaction).includes("未满足")).length],
          ["待人工复核", gaps.filter((item) => String(item.reviewStatus).includes("待")).length],
          ["高风险", gaps.filter((item) => item.riskLevel === "高风险").length],
          ["中风险", gaps.filter((item) => item.riskLevel === "中风险").length],
          ["低风险", gaps.filter((item) => item.riskLevel === "低风险").length],
          ["合规覆盖率", `${m.coverage_rate}%`],
        ])}
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">核心风险提示</span><h3>高风险差距</h3></div></div>
        <div class="reg-finding-grid">
          ${gaps.filter((item) => item.riskLevel === "高风险" || item.risk === "高风险").slice(0, 8).map((item) => `<article class="reg-risk-card tone-high"><div><strong>${escapeHtml(item.id)} ${escapeHtml(item.title || item.requirement)}</strong><span>${escapeHtml(item.responsibleDepartment || item.owner)}｜${escapeHtml(item.gapType || item.type)}</span></div><p>${escapeHtml(item.gapDescription || item.description)}</p></article>`).join("")}
        </div>
      </section>
      <section class="reg-section-grid">
        <div class="section-card"><div class="section-title-row"><div><span class="mini-label">满足度分布</span><h3>满足 / 部分 / 未满足</h3></div></div>${renderDistributionBar(gapAnalysis.satisfaction)}</div>
        <div class="section-card"><div class="section-title-row"><div><span class="mini-label">差距分类</span><h3>按类型统计</h3></div></div>${renderDistributionBar(gapTypes)}</div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">热度矩阵</span><h3>按领域和责任部门</h3></div></div>
        <div class="reg-heatmap">
          ${gapAnalysis.risk_by_area.map((row) => `<div><strong>${escapeHtml(row.area)}</strong><span>${escapeHtml(row.owner)}</span><em class="tone-high">高 ${row.high}</em><em class="tone-medium">中 ${row.medium}</em><em class="tone-low">低 ${row.low}</em></div>`).join("")}
        </div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">差距明细</span><h3>差距风险卡</h3></div></div>
        <div class="reg-gap-stack">
          ${gaps.map((item) => renderGapCard({
            id: item.id,
            external_clause: item.externalClause,
            requirement: item.title || item.externalRequirement,
            policy: (item.relatedPolicies || []).join("、") || "未检索到可用内规依据",
            satisfaction: item.satisfaction,
            risk: item.riskLevel,
            type: item.gapType,
            description: item.gapDescription,
            evidence: item.internalEvidence,
            recommendation: item.recommendation,
            priority: item.riskLevel === "高风险" ? "高优先级" : item.riskLevel === "中风险" ? "中优先级" : "低优先级",
            owner: item.responsibleDepartment,
            review: item.reviewStatus,
          })).join("")}
        </div>
      </section>
    `;
  }
  if (tabId === "remediation") {
    const r = remediation;
    return `
      ${renderShowcaseNotice(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">整改计划</span><h3>可执行整改总览</h3></div></div>
        ${renderRegKpis([
          ["制度整改项", r.summary.policy],
          ["流程整改项", r.summary.process],
          ["系统整改项", r.summary.system],
          ["控制点整改项", r.summary.control],
          ["高风险整改项", r.summary.high],
          ["待完成整改项", r.summary.pending],
          ["建议完成时限", r.summary.deadline],
        ])}
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">紧急整改项</span><h3>优先处理清单</h3></div></div>
        <div class="reg-remediation-grid">
          ${r.urgent.map((item) => `<article><span>${escapeHtml(item.priority)}｜${escapeHtml(item.deadline)}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.control)}</p><em>${escapeHtml(item.owner)}</em></article>`).join("")}
        </div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">整改矩阵</span><h3>按差距生成的整改动作</h3></div></div>
        <div class="reg-remediation-grid">
          ${rectificationActions.map((item) => {
            // 执行型义务桥接：涉及反洗钱/关联方/客户身份/对手方等的整改动作，
            // 本质是“执行型”监管义务，由尽职调查模块承接落地，附“去尽调执行”入口。
            const isExecutionDD = /反洗钱|关联方|关联交易|客户身份|尽职|尽调|交易对手|发行人|准入|适当性/.test(item.action || "");
            const bridge = isExecutionDD
              ? `<button type="button" class="bridge-link" data-bridge-action="to-diligence" data-concern="${escapeHtml(item.action || item.sourceGap || "")}">去尽调执行 →</button>`
              : "";
            return `<article><span>${escapeHtml(item.priority)}｜${escapeHtml(item.estimatedCompletion)}</span><strong>${escapeHtml(item.id)} ${escapeHtml(item.sourceGap)}</strong><p>${escapeHtml(item.action)}</p><em>牵头：${escapeHtml(item.responsibleDepartment)}｜协同：${(item.collaboratingDepartments || []).map(escapeHtml).join("、")}</em>${bridge}</article>`;
          }).join("")}
        </div>
      </section>
      <section class="reg-section-grid">
        <div class="section-card"><div class="section-title-row"><div><span class="mini-label">制度修订</span><h3>修订建议</h3></div></div><div class="reg-revision-list">${r.policy_revisions.map((item) => `<div><strong>${escapeHtml(item.policy)}</strong><span>${escapeHtml(item.clause)}｜${escapeHtml(item.action)}｜${escapeHtml(item.owner)}</span><em>外规依据：${escapeHtml(item.basis)}</em></div>`).join("")}</div></div>
        <div class="section-card"><div class="section-title-row"><div><span class="mini-label">新制度草案</span><h3>草案摘要</h3></div></div><div class="reg-draft-list">${r.drafts.map((item) => `<article><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.purpose)}</p><span>核心条款：${item.core.map(escapeHtml).join("、")}</span><em>起草：${escapeHtml(item.owner)}｜会签：${escapeHtml(item.countersign)}</em></article>`).join("")}</div></div>
      </section>
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">整改时间轴</span><h3>倒排计划</h3></div></div>
        <div class="reg-timeline">
          ${r.timeline.map((item) => `<div><span>${escapeHtml(item.date)}</span><strong>${escapeHtml(item.stage)}：${escapeHtml(item.title)}</strong><p>${escapeHtml(item.desc)}</p></div>`).join("")}
        </div>
      </section>
    `;
  }
  if (tabId === "artifacts") {
    return `
      ${renderShowcaseNotice(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">交付物</span><h3>可预览交付物</h3></div></div>
        <div class="artifact-grid">
          ${deliverables.map((item) => `<article class="artifact-card"><span>${escapeHtml(item.type)}</span><h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.status)}</p><div><a href="${escapeHtml(item.path)}" target="_blank" rel="noreferrer">预览</a></div></article>`).join("")}
        </div>
      </section>
    `;
  }
  if (tabId === "audit") {
    return `
      ${renderShowcaseNotice(data)}
      <section class="section-card">
        <div class="section-title-row"><div><span class="mini-label">审阅与留痕</span><h3>业务复核状态</h3></div></div>
        <div class="notice-list">${audit.business_notes.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>
        <div class="reg-timeline">
          ${reviewLogs.map((item) => `<div><span>${escapeHtml(item.time)}</span><strong>${escapeHtml(item.operator)}：${escapeHtml(item.action)}</strong><p>${escapeHtml(item.result)}</p></div>`).join("")}
        </div>
        <details class="tech-info">
          <summary>技术信息（供审计 / 排查）</summary>
          <div class="tech-grid">
            ${audit.technical_items.map((item) => `<div><span>${escapeHtml(item.label)}</span><code>${escapeHtml(item.value)}</code></div>`).join("")}
          </div>
        </details>
        <details class="business-tech-drawer">
          <summary>真实任务执行面板</summary>
          ${renderRealTaskOperations()}
        </details>
      </section>
    `;
  }
  return `<div class="empty-state">当前页签待接入。</div>`;
}

function renderCoverageMatrix(rows) {
  const docs = ["docA", "docB", "docC", "docD", "docE", "docF", "overall"];
  const labels = { docA: "办法", docB: "清算", docC: "信披", docD: "应急", docE: "系统", docF: "合同", overall: "综合" };
  return `
    <div class="reg-matrix">
      <div class="reg-matrix-head"><span>监管要求</span>${docs.map((id) => `<span>${labels[id]}</span>`).join("")}</div>
      ${rows
        .map(
          (row) => `
            <div class="reg-matrix-row">
              <strong>${escapeHtml(row.requirement)}</strong>
              ${docs.map((id) => `<em class="tone-${toneClass(row[id])}">${escapeHtml(row[id])}</em>`).join("")}
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMappingCompareCard(item) {
  return `
    <article class="reg-mapping-card">
      <div>
        <span>外规要求</span>
        <strong>${escapeHtml(item.external_clause)}｜${escapeHtml(item.requirement_id)}</strong>
        <p>${escapeHtml(item.external_requirement)}</p>
        <em>${escapeHtml(item.action)}｜${escapeHtml(item.risk)}</em>
      </div>
      <div class="mapping-bridge tone-${toneClass(item.status)}">
        <strong>${escapeHtml(item.status)}</strong>
        <span>置信度 ${escapeHtml(String(item.confidence))}</span>
        <p>${escapeHtml(item.relation)}</p>
        <em>${escapeHtml(item.review)}</em>
      </div>
      <div>
        <span>内规依据</span>
        <strong>${escapeHtml(item.policy)}</strong>
        <p>${escapeHtml(item.policy_clause)}</p>
        <em>${escapeHtml(item.evidence)}</em>
      </div>
    </article>
  `;
}

function renderGapCard(item) {
  return `
    <article class="reg-gap-card tone-${toneClass(item.risk)}">
      <div class="reg-gap-head">
        <div><span>${escapeHtml(item.id)}｜${escapeHtml(item.external_clause)}</span><strong>${escapeHtml(item.requirement)}</strong></div>
        <em>${escapeHtml(item.risk)}｜${escapeHtml(item.satisfaction)}</em>
      </div>
      <div class="reg-gap-body">
        <p><b>关联内规：</b>${escapeHtml(item.policy)}</p>
        <p><b>差距类型：</b>${escapeHtml(item.type)}｜<b>优先级：</b>${escapeHtml(item.priority)}｜<b>责任部门：</b>${escapeHtml(item.owner)}</p>
        <p><b>差距说明：</b>${escapeHtml(item.description)}</p>
        <p><b>内规证据：</b>${escapeHtml(item.evidence)}</p>
        <p><b>整改建议：</b>${escapeHtml(item.recommendation)}</p>
        <p><b>人工复核：</b>${escapeHtml(item.review)}</p>
      </div>
    </article>
  `;
}

function renderRealTaskOperations() {
  return `
    <div class="runtime-panel">
      <label class="file-drop"><span>上传外规文件</span><input id="regulatory-decomposer-file" type="file" accept=".docx,.txt,.md" /></label>
      <label class="file-drop"><span>上传内规制度文件</span><input id="regulatory-mapping-file" type="file" accept=".docx,.txt,.md" /></label>
      <div class="button-row">
        <button type="button" data-skill-action="check-llm">检查模型配置</button>
        <button class="primary-action" type="button" data-skill-action="run-regulatory-decomposer">执行监管解读</button>
        <button type="button" data-skill-action="run-regulatory-decomposer-from-case">使用当前任务监管原文执行</button>
        <button type="button" data-skill-action="run-regulatory-mapping">执行内规映射</button>
        <button type="button" data-skill-action="run-gap-analysis">执行制度差距分析</button>
        <button type="button" data-skill-action="run-remediation">生成整改方案</button>
      </div>
      ${renderLlmHealth()}
      ${renderAuditTrail()}
    </div>
  `;
}

function renderLlmHealth() {
  if (!regulatoryLlmHealth) {
    return `<div class="empty-state small">尚未检查 模型配置。点击“检查 模型配置”只读取安全状态，不会返回 API Key。</div>`;
  }
  return `
    <div class="status-summary">
      <div><span>配置状态</span><strong>${regulatoryLlmHealth.configured ? "已配置" : "未配置"}</strong><em>${escapeHtml(regulatoryLlmHealth.provider)}</em></div>
      <div><span>模型</span><strong>${escapeHtml(regulatoryLlmHealth.model)}</strong><em>快速模型</em></div>
      <div><span>服务地址</span><strong>${escapeHtml(regulatoryLlmHealth.base_url_host || "—")}</strong><em>已脱敏</em></div>
      <div><span>最近测试</span><strong>${escapeHtml(regulatoryLlmHealth.last_test_status?.status || "not_run")}</strong><em>手动触发</em></div>
    </div>
  `;
}

function renderRegulatoryDecomposerResult() {
  if (!regulatoryDecomposerRun) {
    return `<div class="empty-state">请上传外规文件并执行监管解读。模型未配置时，页面会明确显示“执行引擎未配置”。</div>`;
  }
  const result = regulatoryDecomposerRun.structured_result || {};
  if (regulatoryDecomposerRun.status === "failed") {
    return `<div class="empty-state">执行失败：${escapeHtml((regulatoryDecomposerRun.warnings || []).join("；") || result.error || "未知错误")}</div>`;
  }
  const dimensions = result.fiveDimensions || {};
  const requirements = dimensions.regulatoryRequirements || [];
  const clauses = result.clauses || [];
  const sourceUrl = clauseSourceUrl(regulatoryDecomposerRun);
  return `
    <div class="status-summary">
      <div><span>执行模块</span><strong>监管解读</strong><em>${escapeHtml(runBatchLabel(regulatoryDecomposerRun))}</em></div>
      <div><span>执行结果</span><strong>${escapeHtml(runStatusLabel(regulatoryDecomposerRun.status))}</strong><em>${escapeHtml(runStatusLabel(result.review?.status || "pending"))}</em></div>
      <div><span>模型</span><strong>${escapeHtml(regulatoryDecomposerRun.model || result.model?.name || "—")}</strong><em>DeepSeek</em></div>
      <div><span>条款数</span><strong>${clauses.length}</strong><em>规则切分</em></div>
      <div><span>人工复核</span><strong>需人工复核</strong><em>合规把关</em></div>
    </div>
    ${techInfo(regulatoryDecomposerRun)}
    <section class="subsection-block">
      <h4>监管意图</h4>
      <p>${escapeHtml(dimensions.regulatoryIntent?.policyBackground || "待模型输出")}</p>
      <p>${escapeHtml(dimensions.regulatoryIntent?.regulatoryGoal || "")}</p>
      <p>${escapeHtml(dimensions.regulatoryIntent?.riskConcern || "")}</p>
    </section>
    <section class="subsection-block">
      <h4>监管要求</h4>
      <div class="table-wrap">
        <table class="diligence-table">
          <thead><tr><th>编号</th><th>条款</th><th>义务类型</th><th>监管动作</th><th>主体</th><th>监管要求（摘要）</th><th>复核</th></tr></thead>
          <tbody>
            ${
              requirements.length
                ? requirements
                    .map(
                      (item, index) => `
                        <tr>
                          <td>${escapeHtml(item.requirementId || `REQ-${index + 1}`)}</td>
                          <td>${escapeHtml(item.clauseRef || item.clauseId || "—")}</td>
                          <td>${escapeHtml(item.obligationType || "待判定")}</td>
                          <td>${escapeHtml(item.action || "—")}</td>
                          <td>${escapeHtml(item.subject || "—")}</td>
                          <td>${escapeHtml(item.content || item.requirement || item.originalExcerpt || "—")}</td>
                          <td>${item.needsReview === false ? "可复核" : "需人工复核"}</td>
                        </tr>
                      `
                    )
                    .join("")
                : `<tr><td colspan="7">尚未获得监管要求结构化输出。</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
    <section class="subsection-block">
      <h4>条款原文（完整）</h4>
      <p class="subsection-hint">本区展示来自文件解析的<strong>完整条款原文</strong>（非模型摘要）；疑似解析不完整的条款标记为“原文待人工复核”，并保留“查看原始来源”入口。</p>
      <div class="clause-list">
        ${clauses.map((clause) => renderClauseOriginal(clause, sourceUrl)).join("")}
      </div>
    </section>
  `;
}

function clauseSourceUrl(run) {
  const taskId = run?.task_id;
  const hit = (typeof regulatoryCases !== "undefined" ? regulatoryCases : []).find((item) => item.case_id === taskId);
  return hit?.url || "";
}

function renderClauseOriginal(clause, sourceUrl) {
  const full = clause.originalText || "";
  const integrity = clause.integrity || {};
  const flagged = integrity.status === "review_required";
  const obligation = clause.ruleTags?.obligationType || "一般性";
  const sourceLink = sourceUrl
    ? `<a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer">查看原始来源</a>`
    : `<span class="hint-missing">原始来源链接缺失</span>`;
  const head = `
    <div class="clause-head">
      <strong>${escapeHtml(clause.clauseRef || clause.clauseId || "条款")}</strong>
      <span class="obligation-tag">${escapeHtml(obligation)}</span>
      ${flagged ? `<span class="status-badge danger">原文待人工复核</span>` : `<span class="status-badge done">原文完整</span>`}
    </div>`;
  const flagNote = flagged
    ? `<div class="clause-flag">⚠ 原文解析不完整：${escapeHtml(integrity.reason || "疑似截断")} · ${sourceLink}</div>`
    : "";
  const body =
    full.length > 140
      ? `<details class="clause-full"><summary>展开全文（${full.length} 字）</summary><div class="clause-text">${escapeHtml(full)}</div></details>
         <div class="clause-text clause-preview">${escapeHtml(full.slice(0, 140))}…</div>`
      : `<div class="clause-text">${escapeHtml(full)}</div>`;
  return `<div class="clause-item ${flagged ? "is-flagged" : ""}">${head}${flagNote}${body}</div>`;
}

function renderRunMeta(run) {
  if (!run) return "";
  const result = run.structured_result || {};
  const review = result.review || {};
  return `
    <div class="status-summary">
      <div><span>执行模块</span><strong>${escapeHtml(skillLabel(run.skill_id))}</strong><em>${escapeHtml(runBatchLabel(run))}</em></div>
      <div><span>执行结果</span><strong>${escapeHtml(runStatusLabel(run.status))}</strong><em>${escapeHtml(runStatusLabel(review.status || "pending"))}</em></div>
      <div><span>模型</span><strong>${escapeHtml(run.model || result.model?.name || "—")}</strong><em>DeepSeek</em></div>
      <div><span>执行时间</span><strong>${escapeHtml(run.completed_at || run.created_at || "—")}</strong><em>北京时间</em></div>
      <div><span>人工复核</span><strong>${run.review_required === false ? "可复核" : "需人工复核"}</strong><em>合规把关</em></div>
    </div>
    ${techInfo(run)}
  `;
}

function renderUpstreamHint(run, label) {
  if (!run || !run.run_id) return `<span class="hint-missing">${escapeHtml(label)}：待执行</span>`;
  return `${escapeHtml(label)}：<code>${escapeHtml(run.run_id)}</code>（${escapeHtml(run.status || "—")}）`;
}

function renderInputRefs(run) {
  const refs = run?.input_refs || [];
  if (!refs.length) return "";
  return `<div class="meta-line">输入文件：${refs.map((r) => `<code>${escapeHtml(r.filename || "—")}</code>`).join(" ")}</div>`;
}

function renderReviewSection(run) {
  const items = run?.structured_result?.review?.items || [];
  if (!items.length) return `<div class="empty-state small">本次运行未生成强制复核项。</div>`;
  return `
    <section class="subsection-block">
      <h4>人工复核区（${items.length}）</h4>
      <div class="table-wrap">
        <table class="diligence-table">
          <thead><tr><th>对象</th><th>目标</th><th>风险</th><th>原因</th><th>处理</th></tr></thead>
          <tbody>
            ${items
              .map(
                (item) => `
                  <tr>
                    <td>${escapeHtml(item.targetType || "—")}</td>
                    <td>${escapeHtml(item.targetId || "—")}</td>
                    <td>${escapeHtml(item.riskLevel || "—")}</td>
                    <td>${escapeHtml(item.reason || "—")}</td>
                    <td>${escapeHtml(item.decision || "pending")}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="button-row">
        <button type="button" data-skill-action="approve-review" data-run-id="${escapeHtml(run.run_id)}">标记复核通过</button>
        <button type="button" data-skill-action="request-changes" data-run-id="${escapeHtml(run.run_id)}">要求修改</button>
      </div>
    </section>
  `;
}

function renderArtifactButtons(run) {
  const artifacts = run?.structured_result?.artifacts || [];
  const links = artifacts
    .map((a) => `<a href="/${escapeHtml(a.path)}" target="_blank" rel="noreferrer">${escapeHtml(artifactLabel(a.type))}</a>`)
    .join("");
  return `
    <section class="subsection-block">
      <h4>交付物</h4>
      <div class="button-row">
        <button type="button" data-skill-action="generate-artifacts" data-run-id="${escapeHtml(run.run_id)}">生成 HTML / Word / Excel / JSON</button>
      </div>
      ${links ? `<div class="artifact-links">${links}</div>` : `<div class="empty-state small">尚未生成交付物。点击上方按钮基于本次结构化结果生成。</div>`}
    </section>
  `;
}

function renderMappingResult() {
  const run = regulatoryMappingRun;
  if (!run) return `<div class="empty-state">请上传内规文件并执行内规映射。需先完成监管解读，作为外规义务上游输入。</div>`;
  const result = run.structured_result || {};
  if (run.status === "engine-not-configured") return `<div class="empty-state">执行引擎未配置：请在后端 .env 配置 LLM_API_KEY。</div>`;
  if (run.status === "failed") return `${renderRunMeta(run)}<div class="empty-state">执行失败：${escapeHtml((run.warnings || []).join("；") || result.error || "未知错误")}</div>`;
  const s = result.summary || {};
  const mappings = result.mappings || [];
  return `
    ${renderRunMeta(run)}
    ${renderInputRefs(run)}
    <div class="status-summary">
      <div><span>监管要求</span><strong>${s.totalRequirements || 0}</strong><em>条</em></div>
      <div><span>已映射</span><strong>${s.mappedCount || 0}</strong><em>覆盖率 ${s.coverageRate ?? 0}</em></div>
      <div><span>需复核</span><strong>${s.reviewRequiredCount || 0}</strong><em>低置信度</em></div>
      <div><span>内规条款</span><strong>${s.internalClauseCount || 0}</strong><em>切分</em></div>
    </div>
    <section class="subsection-block">
      <h4>映射明细</h4>
      <div class="table-wrap">
        <table class="diligence-table">
          <thead><tr><th>外规条款</th><th>内规条款</th><th>维度</th><th>置信度</th><th>BM25/关键词</th><th>复核状态</th><th>匹配摘要</th></tr></thead>
          <tbody>
            ${
              mappings.length
                ? mappings
                    .map(
                      (m) => `
                        <tr>
                          <td>${escapeHtml(m.externalClauseRef || m.requirementId || "—")}</td>
                          <td>${escapeHtml(m.matchedInternalClauseRef || "无匹配")}</td>
                          <td>${escapeHtml(m.dimension || "—")}</td>
                          <td>${escapeHtml(String(m.confidence ?? 0))}（${escapeHtml(m.confidenceLevel || "—")}）</td>
                          <td>${escapeHtml(String(m.signals?.bm25 ?? 0))} / ${escapeHtml(String(m.signals?.keyword ?? 0))}</td>
                          <td>${escapeHtml(m.manualReviewStatus || "—")}</td>
                          <td>${escapeHtml((m.mappingSummary || "—").slice(0, 80))}</td>
                        </tr>
                      `
                    )
                    .join("")
                : `<tr><td colspan="7">尚无映射结果。</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
    ${renderReviewSection(run)}
    ${renderArtifactButtons(run)}
  `;
}

function renderGapResult() {
  const run = regulatoryGapRun;
  if (!run) return `<div class="empty-state">请先完成监管解读与内规映射，再执行制度差距分析。</div>`;
  const result = run.structured_result || {};
  if (run.status === "engine-not-configured") return `<div class="empty-state">执行引擎未配置：请在后端 .env 配置 LLM_API_KEY。</div>`;
  if (run.status === "failed") return `${renderRunMeta(run)}<div class="empty-state">执行失败：${escapeHtml((run.warnings || []).join("；") || result.error || "未知错误")}</div>`;
  const s = result.summary || {};
  const gaps = result.gapItems || [];
  return `
    ${renderRunMeta(run)}
    <div class="status-summary">
      <div><span>义务总数</span><strong>${s.totalObligations || 0}</strong><em>条</em></div>
      <div><span>满足/部分/未满足</span><strong>${s.fullyCompliantCount || 0} / ${s.partiallyCompliantCount || 0} / ${s.nonCompliantCount || 0}</strong><em>合规率 ${s.complianceRate ?? 0}</em></div>
      <div><span>制度型/执行型/混合型</span><strong>${distLabel(result, "gapType")}</strong><em>差距类型</em></div>
      <div><span>高/中/低风险</span><strong>${distLabel(result, "riskLevel")}</strong><em>风险分布</em></div>
    </div>
    <section class="subsection-block">
      <h4>差距清单</h4>
      <div class="table-wrap">
        <table class="diligence-table">
          <thead><tr><th>差距编号</th><th>外规依据</th><th>满足度</th><th>风险</th><th>类型</th><th>差距描述</th><th>整改建议</th><th>复核</th></tr></thead>
          <tbody>
            ${
              gaps.length
                ? gaps
                    .map(
                      (g) => `
                        <tr>
                          <td>${escapeHtml(g.gapId || "—")}</td>
                          <td>${escapeHtml(g.externalClauseRef || "—")}</td>
                          <td>${escapeHtml(g.complianceLevel || "—")}</td>
                          <td>${escapeHtml(g.riskLevel || "—")}</td>
                          <td>${escapeHtml(g.gapType || "—")}</td>
                          <td>${escapeHtml((g.gapDescription || "—").slice(0, 70))}</td>
                          <td>${escapeHtml((g.recommendation || "—").slice(0, 70))}</td>
                          <td>${g.needsReview === false ? "可复核" : "需复核"}</td>
                        </tr>
                      `
                    )
                    .join("")
                : `<tr><td colspan="8">尚无 Gap 结果。</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
    ${renderReviewSection(run)}
    ${renderArtifactButtons(run)}
  `;
}

function renderRemediationResult() {
  const run = regulatoryRemediationRun;
  if (!run) return `<div class="empty-state">请先完成 Gap 分析，再生成整改方案。</div>`;
  const result = run.structured_result || {};
  if (run.status === "engine-not-configured") return `<div class="empty-state">执行引擎未配置：请在后端 .env 配置 LLM_API_KEY。</div>`;
  if (run.status === "failed") return `${renderRunMeta(run)}<div class="empty-state">执行失败：${escapeHtml((run.warnings || []).join("；") || result.error || "未知错误")}</div>`;
  const s = result.summary || {};
  const items = result.items || [];
  return `
    ${renderRunMeta(run)}
    <div class="status-summary">
      <div><span>整改项</span><strong>${s.totalItems || 0}</strong><em>四维</em></div>
      <div><span>紧急项</span><strong>${s.urgentCount || 0}</strong><em>高风险</em></div>
      <div><span>控制点</span><strong>${s.controlPointCount || 0}</strong><em>KCP</em></div>
      <div><span>制度草案</span><strong>${s.policyDraftCount || 0}</strong><em>AI 辅助</em></div>
    </div>
    <div class="notice-list"><p><strong>${escapeHtml(result.disclaimer || "AI 辅助草案，须经法律合规部门审查。")}</strong></p></div>
    <section class="subsection-block">
      <h4>四维整改与制度草案</h4>
      ${
        items.length
          ? items
              .map(
                (it) => `
                  <div class="remediation-item">
                    <div class="remediation-head"><strong>${escapeHtml(it.remediationId || "—")} · ${escapeHtml(it.gapId || "—")}</strong>
                      <span class="status-badge ${it.priority === "紧急" ? "danger" : "pending"}">${escapeHtml(it.priority || "—")} · ${escapeHtml(it.plannedCompletionDate || "—")}</span></div>
                    <div class="info-grid">
                      <div><span>外规依据</span><strong>${escapeHtml(it.externalBasis || "—")}</strong></div>
                      <div><span>责任部门</span><strong>${escapeHtml(it.ownerDepartment || "—")}</strong></div>
                      <div><span>制度</span><strong>${escapeHtml((it.dimensions?.institution?.action || "不涉及").slice(0, 60))}</strong></div>
                      <div><span>流程</span><strong>${escapeHtml((it.dimensions?.process?.action || "不涉及").slice(0, 60))}</strong></div>
                      <div><span>系统</span><strong>${escapeHtml((it.dimensions?.system?.action || "不涉及").slice(0, 60))}</strong></div>
                      <div><span>控制点</span><strong>${escapeHtml(it.dimensions?.control?.controlPointId || "—")} ${escapeHtml((it.dimensions?.control?.description || "").slice(0, 40))}</strong></div>
                    </div>
                    ${
                      it.policyDraft?.title
                        ? `<div class="policy-draft"><strong>制度草案《${escapeHtml(it.policyDraft.title)}》</strong><p>${escapeHtml((it.policyDraft.purpose || "").slice(0, 120))}</p><em>${escapeHtml(it.policyDraft.disclaimer || "AI 辅助草案，须经法律合规部门审查。")}</em></div>`
                        : ""
                    }
                  </div>
                `
              )
              .join("")
          : `<div class="empty-state small">尚无整改项。</div>`
      }
    </section>
    ${renderReviewSection(run)}
    ${renderArtifactButtons(run)}
  `;
}

function distLabel(result, key) {
  const dist = (result.distribution || {})[key] || [];
  if (!dist.length) return "—";
  return dist.map((d) => `${d.label} ${d.count}`).join(" / ");
}

function renderRunArtifacts() {
  const runs = [regulatoryDecomposerRun, regulatoryMappingRun, regulatoryGapRun, regulatoryRemediationRun].filter(Boolean);
  if (!runs.length) return `<div class="empty-state">本任务尚无执行结果。请在各 Tab 执行后，在此生成本次运行交付物。</div>`;
  const cards = runs
    .map((run) => {
      const artifacts = run.structured_result?.artifacts || [];
      const links = artifacts.length
        ? artifacts.map((a) => `<a href="/${escapeHtml(a.path)}" target="_blank" rel="noreferrer">${escapeHtml(artifactLabel(a.type))}</a>`).join("")
        : `<button type="button" data-skill-action="generate-artifacts" data-run-id="${escapeHtml(run.run_id)}">生成交付物</button>`;
      return `
        <article class="artifact-card">
          <span>${escapeHtml(skillLabel(run.skill_id))}</span>
          <h4>${escapeHtml(runBatchLabel(run))}</h4>
          <p>本次执行结果 · ${escapeHtml(runStatusLabel(run.status))}</p>
          <div class="artifact-links">${links}</div>
        </article>
      `;
    })
    .join("");
  return `<div class="artifact-grid">${cards}</div>`;
}

function renderAuditTrail() {
  const runs = [regulatoryDecomposerRun, regulatoryMappingRun, regulatoryGapRun, regulatoryRemediationRun].filter(Boolean);
  if (!runs.length) return `<div class="empty-state">本任务尚无运行留痕。各 模块执行后会记录 run_id、模型、时间与复核状态。</div>`;
  const rows = runs
    .sort((a, b) => (a.created_at || "").localeCompare(b.created_at || ""))
    .map(
      (run) => `
        <div>
          <strong>${escapeHtml(run.completed_at || run.created_at || "—")}</strong>
          <span>执行模块 ${escapeHtml(skillLabel(run.skill_id))} · 执行批次 ${escapeHtml(runBatchLabel(run))} · 模型 ${escapeHtml(run.model || "—")}</span>
          <em>${escapeHtml(runStatusLabel(run.status))}${run.review_required === false ? "" : " · 需人工复核"}</em>
        </div>
      `
    )
    .join("");
  return `<div class="timeline-list">${rows}</div>`;
}

function renderArtifactCards() {
  return reportArtifacts
    .map(
      (item) => `
        <article class="artifact-card">
          <span>${escapeHtml(item.type)}</span>
          <h4>${escapeHtml(item.name)}</h4>
          <p>${escapeHtml(item.source)} · ${escapeHtml(item.status)}</p>
          <div>
            <a href="${escapeHtml(item.path)}" target="_blank" rel="noreferrer">${item.path && item.path.endsWith(".html") ? "预览" : "打开"}</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderPipeline() {
  const pipeline = document.getElementById("pipeline");
  if (!pipeline) return;
  pipeline.innerHTML = regulatoryCase.steps
    .map((step, index) => {
      const activeClass = step.step_id === activeStepId ? " is-active" : "";
      return `
        <button class="step-card${activeClass}" type="button" data-step-id="${step.step_id}">
          <span class="step-no">${index + 1}</span>
          <h4>${step.title}</h4>
          <p>${step.summary}</p>
          <div class="step-kpis">${step.kpis.map((item) => `<span>${item}</span>`).join("")}</div>
        </button>
      `;
    })
    .join("");
}

function renderStepDetail() {
  const step = regulatoryCase.steps.find((item) => item.step_id === activeStepId) || regulatoryCase.steps[0];
  const detail = document.getElementById("step-detail");
  if (!detail) return;
  detail.innerHTML = `
    <h4>${step.title}</h4>
    <p>${step.summary}</p>
    <div class="detail-block">
      <strong>状态</strong>
      <p>${step.status}</p>
    </div>
    <div class="detail-block">
      <strong>核心指标</strong>
      <ul>${step.kpis.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="detail-block">
      <strong>输入来源</strong>
      <ul>${step.input_files.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="detail-block">
      <strong>输出物</strong>
      <ul>${step.outputs.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;

  const reportLabel = document.getElementById("report-label");
  const reportTitle = document.getElementById("report-title");
  const reportLink = document.getElementById("report-link");
  const reportFrame = document.getElementById("report-frame");
  if (reportLabel) reportLabel.textContent = step.report.label;
  if (reportTitle) reportTitle.textContent = step.report.title;
  if (reportLink) reportLink.href = step.report.url;
  if (reportFrame) reportFrame.src = step.report.url;
}

function setStep(stepId) {
  if (!regulatoryCase.steps.some((item) => item.step_id === stepId)) return;
  activeStepId = stepId;
  document.querySelectorAll("#pipeline [data-step-id]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.stepId === stepId);
  });
  renderStepDetail();
}

async function handleSkillAction(action, trigger) {
  if (action === "check-llm") {
    regulatoryLlmHealth = await fetchJson("/api/health/llm");
    renderRegulatoryDetail();
    showToast(regulatoryLlmHealth.configured ? "模型配置已读取，未返回密钥。" : "模型尚未配置。");
    return;
  }
  if (action === "run-regulatory-decomposer") {
    const input = document.getElementById("regulatory-decomposer-file");
    const file = input?.files?.[0];
    if (!file) {
      showToast("请先上传一份 .docx / .txt / .md 外规文件。");
      return;
    }
    trigger.disabled = true;
    trigger.textContent = "执行中...";
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("task_id", currentRegulatoryDetailCaseId || selectedCaseId);
      regulatoryDecomposerRun = await fetchJson("/api/skills/regulatory-decomposer/runs", {
        method: "POST",
        body: form,
      });
      renderRegulatoryDetail();
      showToast(`监管解读已完成：${regulatoryDecomposerRun.run_id || regulatoryDecomposerRun.status}`);
    } finally {
      trigger.disabled = false;
      trigger.textContent = "执行监管解读";
    }
  }
  if (action === "run-regulatory-decomposer-from-case") {
    trigger.disabled = true;
    trigger.textContent = "执行中...";
    try {
      regulatoryDecomposerRun = await fetchJson("/api/skills/regulatory-decomposer/runs-from-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ case_id: currentRegulatoryDetailCaseId || selectedCaseId }),
      });
      renderRegulatoryDetail();
      showToast(`已使用当前任务真实原文执行监管解读：${regulatoryDecomposerRun.run_id}`);
    } finally {
      trigger.disabled = false;
      trigger.textContent = "使用当前任务监管原文执行";
    }
  }
  if (action === "run-regulatory-mapping") {
    if (!regulatoryDecomposerRun || !regulatoryDecomposerRun.run_id) {
      showToast("请先在“监管解读”页签执行监管解读，作为外规义务上游输入。");
      return;
    }
    const input = document.getElementById("regulatory-mapping-file");
    const file = input?.files?.[0];
    if (!file) {
      showToast("请先上传一份 .docx / .txt / .md 内规制度文件。");
      return;
    }
    const label = trigger.textContent;
    trigger.disabled = true;
    trigger.textContent = "执行中...";
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("task_id", currentRegulatoryDetailCaseId || selectedCaseId);
      form.append("decomposer_run_id", regulatoryDecomposerRun.run_id);
      regulatoryMappingRun = await fetchJson("/api/skills/regulatory-mapping/runs", { method: "POST", body: form });
      renderRegulatoryDetail();
      showToast(`内规映射完成：${regulatoryMappingRun.run_id || regulatoryMappingRun.status}`);
    } finally {
      trigger.disabled = false;
      trigger.textContent = label;
    }
  }
  if (action === "run-gap-analysis") {
    if (!regulatoryDecomposerRun?.run_id || !regulatoryMappingRun?.run_id) {
      showToast("制度差距分析需要监管解读与内规映射的运行结果，请先完成上游步骤。");
      return;
    }
    const label = trigger.textContent;
    trigger.disabled = true;
    trigger.textContent = "执行中...";
    try {
      regulatoryGapRun = await fetchJson("/api/skills/regulation-gap-analysis/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: currentRegulatoryDetailCaseId || selectedCaseId,
          decomposer_run_id: regulatoryDecomposerRun.run_id,
          mapping_run_id: regulatoryMappingRun.run_id,
        }),
      });
      renderRegulatoryDetail();
      showToast(`制度差距分析完成：${regulatoryGapRun.run_id || regulatoryGapRun.status}`);
    } finally {
      trigger.disabled = false;
      trigger.textContent = label;
    }
  }
  if (action === "run-remediation") {
    if (!regulatoryGapRun?.run_id) {
      showToast("请先执行制度差距分析，再生成整改方案。");
      return;
    }
    const label = trigger.textContent;
    trigger.disabled = true;
    trigger.textContent = "生成中...";
    try {
      regulatoryRemediationRun = await fetchJson("/api/skills/remediation-implementation/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: currentRegulatoryDetailCaseId || selectedCaseId,
          gap_run_id: regulatoryGapRun.run_id,
        }),
      });
      renderRegulatoryDetail();
      showToast(`整改方案生成完成：${regulatoryRemediationRun.run_id || regulatoryRemediationRun.status}`);
    } finally {
      trigger.disabled = false;
      trigger.textContent = label;
    }
  }
  if (action === "generate-artifacts") {
    const runId = trigger.dataset.runId;
    if (!runId) return;
    const label = trigger.textContent;
    trigger.disabled = true;
    trigger.textContent = "生成中...";
    try {
      await fetchJson(`/api/skills/runs/${encodeURIComponent(runId)}/artifacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ types: ["html", "docx", "xlsx", "json", "md"] }),
      });
      await refreshSkillRunsForTask(currentRegulatoryDetailCaseId || selectedCaseId);
      showToast("交付物已生成：HTML / Word / Excel / JSON / Markdown。");
    } finally {
      trigger.disabled = false;
      trigger.textContent = label;
    }
  }
  if (action === "approve-review" || action === "request-changes") {
    const runId = trigger.dataset.runId;
    if (!runId) return;
    const status = action === "approve-review" ? "approved" : "changes_requested";
    await fetchJson(`/api/skills/runs/${encodeURIComponent(runId)}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, reviewer: "合规复核人", items: [] }),
    });
    await refreshSkillRunsForTask(currentRegulatoryDetailCaseId || selectedCaseId);
    showToast(status === "approved" ? "已标记复核通过。" : "已记录“要求修改”。");
  }
}

async function runRegulatoryScanner() {
  const status = document.getElementById("scanner-status");
  const sourceSelect = document.getElementById("scanner-sources");
  const typeSelect = document.getElementById("scanner-doc-types");
  const sourceIds = Array.from(sourceSelect?.selectedOptions || []).map((item) => item.value);
  const documentTypes = Array.from(typeSelect?.selectedOptions || []).map((item) => item.value);
  const days = Number(document.getElementById("scanner-days")?.value || 30);
  const businessDomain = document.getElementById("scanner-domain")?.value || "托管业务";
  const custodyOnly = Boolean(document.getElementById("scanner-custody-only")?.checked);
  if (status) status.textContent = "扫描中：正在访问官方监管网站并获取详情页...";
  const payload = await fetchJson("/api/regulatory/scanner/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_ids: sourceIds,
      days,
      business_domain: businessDomain,
      document_types: documentTypes,
      custody_only: custodyOnly,
      limit_per_source: 5,
    }),
  });
  regulatoryScannerLastRun = {
    scan_run_id: payload.scan_run_id,
    started_at: payload.started_at,
    status: payload.status,
    official_raw_candidate_count: payload.summary?.official_raw_candidates || 0,
    date_filter_count: payload.summary?.date_filtered || 0,
    document_type_filter_count: payload.summary?.document_type_filtered || 0,
    custody_filter_before_count: payload.summary?.custody_filter_before || 0,
    custody_filter_after_count: payload.summary?.custody_filter_after || 0,
    dedupe_candidate_count: payload.summary?.dedupe_count || 0,
    detail_fetch_success_count: payload.summary?.detail_fetch_success || 0,
    discovered_count: payload.summary?.discovered || 0,
    new_count: payload.summary?.new || 0,
    deduplicated_count: payload.summary?.deduplicated || 0,
    text_success_count: payload.summary?.text_success || 0,
    attachment_success_count: payload.summary?.attachment_success || 0,
  };
  regulatoryScannerDiagnostics = payload.source_diagnostics || [];
  await loadRegulatoryScanner();
  showToast(`真实扫描完成：发现 ${payload.summary?.discovered || 0}，新增 ${payload.summary?.new || 0}。`);
}

async function handleDocumentAction(action, documentId) {
  if (!documentId) return;
  if (action === "create-task") {
    const payload = await fetchJson(`/api/regulatory/documents/${encodeURIComponent(documentId)}/create-task`, {
      method: "POST",
    });
    if (payload.case) {
      const index = regulatoryCases.findIndex((item) => item.case_id === payload.case.case_id);
      if (index >= 0) regulatoryCases[index] = payload.case;
      else regulatoryCases.unshift(payload.case);
      selectedCaseId = payload.case.case_id;
      renderCaseSelect();
      renderRegulatoryTaskList();
      await loadRegulatoryScanner();
      showToast("已纳入外规内化任务，可进入任务详情执行监管解读。");
    }
    return;
  }
  if (action === "mark-irrelevant") {
    await fetchJson(`/api/regulatory/documents/${encodeURIComponent(documentId)}/mark-irrelevant`, {
      method: "POST",
    });
    await loadRegulatoryScanner();
    showToast("已标记为不相关。");
  }
}

document.addEventListener("click", (event) => {
  const regulatoryTab = event.target.closest("[data-regulatory-tab]");
  if (regulatoryTab) {
    event.preventDefault();
    regulatoryTab.blur();
    currentRegulatoryTab = internalTabId(regulatoryTab.dataset.regulatoryTab || "overview");
    const nextRoute = routeForCurrentCase(currentRegulatoryTab);
    if (`${window.location.pathname}${window.location.search}` !== nextRoute) {
      window.history.pushState({}, "", nextRoute);
    }
    renderRegulatoryDetail();
    return;
  }

  // 外规内化 ↔ 尽职调查 桥接：执行型监管义务跳转到尽职调查模块落地执行。
  const bridgeTarget = event.target.closest("[data-bridge-action]");
  if (bridgeTarget) {
    event.preventDefault();
    if (bridgeTarget.dataset.bridgeAction === "to-diligence") {
      const concern = (bridgeTarget.dataset.concern || "").trim();
      diligenceState.activeTab = "custody-admittance";
      navigateTo("/diligence");
      const short = concern.length > 40 ? `${concern.slice(0, 40)}…` : concern;
      showToast(short ? `已进入尽职调查：建议对相关交易对手/发行人发起尽调，重点关注「${short}」` : "已进入尽职调查模块。");
    } else if (bridgeTarget.dataset.bridgeAction === "noop") {
      showToast("演示样本：报告生成 / 下载为占位操作。");
    }
    return;
  }

  const routeTarget = event.target.closest("[data-route]");
  if (routeTarget) {
    event.preventDefault();
    const route = routeTarget.dataset.route || "/";
    navigateTo(route);
    return;
  }

  const skillAction = event.target.closest("[data-skill-action]");
  if (skillAction) {
    event.preventDefault();
    handleSkillAction(skillAction.dataset.skillAction, skillAction).catch((error) => {
      showToast(error.message || "执行失败。");
      renderRegulatoryDetail();
    });
    return;
  }

  const documentAction = event.target.closest("[data-document-action]");
  if (documentAction) {
    event.preventDefault();
    handleDocumentAction(documentAction.dataset.documentAction, documentAction.dataset.documentId).catch((error) => {
      showToast(error.message || "监管文件操作失败。");
    });
    return;
  }

  const scannerAction = event.target.closest("[data-scanner-action]");
  if (scannerAction?.dataset.scannerAction === "toggle-diagnostics") {
    const panel = document.getElementById("scanner-diagnostics-panel");
    if (panel) panel.hidden = !panel.hidden;
    return;
  }

  const openCurrentCase = event.target.closest("#open-current-case-button");
  if (openCurrentCase) {
    event.preventDefault();
    navigateTo(routeForCurrentCase("overview"));
    return;
  }

  const scannerRun = event.target.closest("#scanner-run-button");
  if (scannerRun) {
    event.preventDefault();
    const button = scannerRun;
    button.disabled = true;
    button.textContent = "扫描中...";
    runRegulatoryScanner()
      .catch((error) => {
        showToast(error.message || "真实扫描失败。");
        const status = document.getElementById("scanner-status");
        if (status) status.textContent = `扫描失败：${error.message}`;
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = "执行真实扫描";
      });
    return;
  }

  const refreshCases = event.target.closest("#refresh-cases-button");
  if (refreshCases) {
    event.preventDefault();
    loadRegulatoryCases();
    return;
  }

  const reanalyzeButton = event.target.closest("#reanalyze-button");
  if (reanalyzeButton) {
    event.preventDefault();
    const status = document.getElementById("case-status");
    if (status) status.textContent = "正在重新分析当前新规...";
    fetchJson(`/api/regulatory/cases/${encodeURIComponent(selectedCaseId)}/reanalyze`, { method: "POST" })
      .then((updated) => {
        const index = regulatoryCases.findIndex((item) => item.case_id === updated.case_id);
        if (index >= 0) regulatoryCases[index] = updated;
        else regulatoryCases.unshift(updated);
        applySelectedCase(updated);
        if (status) status.textContent = "重新分析完成：五步分析状态已更新。";
        showToast("重新分析完成。");
      })
      .catch((error) => showToast(error.message || "重新分析失败。"));
    return;
  }

  const legacyScan = event.target.closest("[data-regulatory-extra-action='legacy-scan']");
  if (legacyScan) {
    event.preventDefault();
    fetchJson("/api/regulatory/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days: 14 }),
    })
      .then((payload) => {
        regulatoryCases = payload.cases || regulatoryCases;
        renderRegulatoryTaskList();
        showToast(payload.status === "running" ? "真实抓取任务已进入后台。" : "新规抓取完成。");
      })
      .catch((error) => showToast(error.message || "真实抓取失败。"));
    return;
  }

  const navItem = event.target.closest("[data-view]");
  if (navItem) {
    setView(navItem.dataset.view);
    return;
  }

  const openCard = event.target.closest("[data-open-view]");
  if (openCard) {
    setView(openCard.dataset.openView);
    return;
  }

  const stepCard = event.target.closest("[data-step-id]");
  if (stepCard) {
    event.preventDefault();
    stepCard.blur();
    const tab = stepToDetailTab[stepCard.dataset.stepId] || "overview";
    navigateTo(routeForCurrentCase(tab));
    return;
  }

  const diligenceTab = event.target.closest("[data-diligence-tab]");
  if (diligenceTab) {
    event.preventDefault();
    diligenceTab.blur();
    diligenceState.activeTab = diligenceTab.dataset.diligenceTab;
    renderDiligence();
    return;
  }

  const diligenceAction = event.target.closest("[data-diligence-action]");
  if (diligenceAction) {
    event.preventDefault();
    diligenceAction.blur();
    handleDiligenceAction(diligenceAction.dataset.diligenceAction, diligenceAction).catch((error) => {
      showToast(error.message || "尽职调查操作失败。");
    });
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "case-select") {
    const selected = regulatoryCases.find((item) => item.case_id === event.target.value);
    applySelectedCase(selected || SAMPLE_CASE_OPTION);
    return;
  }

  if (event.target.id === "diligence-company-select") {
    diligenceState.selectedCompanyCode = event.target.value;
    diligenceState.reportVersionId = null;
    loadDiligenceCompany().catch((error) => showToast(error.message || "企业画像加载失败。"));
    return;
  }

  if (event.target.id === "report-version-select") {
    diligenceState.reportVersionId = event.target.value;
    renderDiligence();
    return;
  }

  if (event.target.matches("input[data-report-knowledge-id]")) {
    diligenceState.reportKnowledgeFileIds = Array.from(document.querySelectorAll("input[data-report-knowledge-id]:checked")).map(
      (input) => input.dataset.reportKnowledgeId
    );
    renderDiligence();
    return;
  }

  if (event.target.matches("input[data-report-source-id]")) {
    diligenceState.reportDataSourceIds = Array.from(document.querySelectorAll("input[data-report-source-id]:checked")).map(
      (input) => input.dataset.reportSourceId
    );
    renderDiligence();
    return;
  }

  if (event.target.matches("input[data-upload-kind]")) {
    const count = event.target.files?.length || 0;
    if (count > 0) {
      const kind = event.target.dataset.uploadKind || "external";
      const form = new FormData();
      form.append("file", event.target.files[0]);
      fetch(`/api/regulatory/upload?kind=${kind}`, { method: "POST", body: form })
        .then((response) => response.json())
        .then((payload) => {
          if (payload.error) throw new Error(payload.error);
          showToast(`已上传 ${payload.filename}，文件已存入平台上传区。`);
        })
        .catch(() => {
          showToast(`已接收 ${count} 个文件。后端不可用时将优先加载样例数据兜底。`);
        });
    }
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "diligence-report-editor") {
    const latest = latestReportVersion();
    if (latest?.id) diligenceState.reportDrafts[latest.id] = event.target.value;
  }
});

document.getElementById("scan-button")?.addEventListener("click", async () => {
  const status = document.getElementById("case-status");
  try {
    if (status) status.textContent = "正在真实抓取监管网站，请稍候...";
    showToast("真实抓取任务已启动。");
    const payload = await fetchJson("/api/regulatory/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days: 14 }),
    });
    regulatoryCases = payload.cases || [];
    const selected = regulatoryCases[0] || SAMPLE_CASE_OPTION;
    selectedCaseId = selected.case_id;
    renderCaseSelect();
    applySelectedCase(selected);
    if (status) {
      status.textContent =
        payload.status === "running"
          ? `真实抓取任务已创建：Run #${payload.run_id}，后台正在写入新规库。`
          : `抓取完成：新增 ${payload.inserted_count} 条，更新 ${payload.updated_count} 条。`;
    }
    if (payload.run_id) pollScrapeRun(payload.run_id);
    showToast(payload.status === "running" ? "真实抓取任务已进入后台。" : "新规抓取完成，已写入 SQLite 新规库。");
  } catch (error) {
    if (status) status.textContent = "真实抓取失败，已保留内置样例兜底。";
    showToast(error.message || "真实抓取失败，已回退到样例数据。");
  }
});

document.getElementById("refresh-cases-button")?.addEventListener("click", () => {
  loadRegulatoryCases();
});

document.getElementById("scanner-run-button")?.addEventListener("click", async () => {
  const button = document.getElementById("scanner-run-button");
  try {
    button.disabled = true;
    button.textContent = "扫描中...";
    await runRegulatoryScanner();
  } catch (error) {
    showToast(error.message || "真实扫描失败。");
    const status = document.getElementById("scanner-status");
    if (status) status.textContent = `扫描失败：${error.message}`;
  } finally {
    button.disabled = false;
    button.textContent = "立即执行真实扫描";
  }
});

document.getElementById("reanalyze-button")?.addEventListener("click", async () => {
  const status = document.getElementById("case-status");
  try {
    if (status) status.textContent = "正在重新分析当前新规...";
    const updated = await fetchJson(`/api/regulatory/cases/${encodeURIComponent(selectedCaseId)}/reanalyze`, {
      method: "POST",
    });
    const index = regulatoryCases.findIndex((item) => item.case_id === updated.case_id);
    if (index >= 0) regulatoryCases[index] = updated;
    else regulatoryCases.unshift(updated);
    applySelectedCase(updated);
    if (status) status.textContent = "重新分析完成：五步 Agent 状态已更新。";
    showToast("重新分析完成。");
  } catch (error) {
    showToast(error.message || "重新分析失败。");
  }
});

window.addEventListener("popstate", () => applyRoute({ scroll: true, replace: true }));

renderPipeline();
renderRegulatoryTaskList();
loadRegulatoryCases().finally(() => {
  loadRegulatoryScanner();
  applyRoute({ replace: true });
});
