const API_BASE = "";
const DEMO_COMPANY_CODE = "COMP-001";
const DILIGENCE_PERSONA_IMAGE = "./assets/agent-home-assistant.png";
const DILIGENCE_ASSISTANT_IMAGE = DILIGENCE_PERSONA_IMAGE;
const DILIGENCE_HOME_ASSISTANT_IMAGE = DILIGENCE_PERSONA_IMAGE;

const topSections = [
  { id: "home", title: "首页", summary: "以任务输入、企业风险提醒和尽调工作台构成首页首屏。" },
  { id: "risk-map", title: "风险地图", summary: "从全国热力分布进入省级风险详情，再下钻到企业尽调。" },
  { id: "due-task", title: "洞察任务", summary: "围绕数据搜集与报告生成两条主链，展示当前洞察任务进度。" },
  { id: "enterprise-library", title: "企业画像", summary: "先从企业清单选择目标企业，再查看二维风险矩阵和关键风险构面。" },
  { id: "report-center", title: "洞察报告", summary: "先展示各类报告入口与生成状态，再进入尽调报告详情。" },
  { id: "watchlist", title: "监控预警", summary: "持续监控尽调企业、识别预警信号并触发风险复核建议。" },
  { id: "knowledge-center", title: "知识中心", summary: "沉淀外部法规、内部制度和专家经验文件。" },
];

const sidebarItems = {
  home: [
    { id: "overview", title: "风险分析首页" },
    { id: "quick-start", title: "快捷任务" },
  ],
  "risk-map": [
    { id: "national", title: "全国地图" },
    { id: "industry", title: "行业热度" },
    { id: "company-risk", title: "重点企业" },
  ],
  "due-task": [
    { id: "execution", title: "执行进度" },
    { id: "findings", title: "关键发现" },
    { id: "materials", title: "材料状态" },
  ],
  "enterprise-library": [
    { id: "portrait", title: "企业风险画像" },
    { id: "companies", title: "企业列表" },
    { id: "data-coverage", title: "数据完整度" },
  ],
  watchlist: [
    { id: "live", title: "实时监控" },
    { id: "alerts", title: "预警动态" },
    { id: "recommendations", title: "风险分析建议" },
  ],
  "report-center": [
    { id: "generation", title: "报告生成" },
    { id: "review", title: "报告预审" },
    { id: "evidence", title: "证据溯源" },
  ],
  "knowledge-center": [
    { id: "laws", title: "外部法规" },
    { id: "policies", title: "内部制度" },
    { id: "experience", title: "专家经验" },
  ],
  "risk-view": [
    { id: "basic-info", title: "基本信息" },
    { id: "operation-info", title: "经营情况" },
    { id: "shareholder-related", title: "股东及关联方" },
    { id: "financial-status", title: "财务状况" },
    { id: "external-industry", title: "外部环境与行业" },
    { id: "guarantor-info", title: "担保人信息" },
    { id: "collateral-info", title: "抵质押物" },
    { id: "other-risk", title: "其他" },
  ],
  "process-engine": [
    { id: "due-diligence", title: "尽职调查" },
    { id: "credit-rating", title: "信用评级" },
    { id: "credit-plan", title: "授信方案" },
    { id: "investigation-report", title: "授信调查报告" },
    { id: "contract-loan", title: "合同与放款" },
    { id: "post-loan", title: "贷后管理" },
  ],
  "knowledge-base": [
    { id: "laws", title: "外部法规" },
    { id: "policies", title: "内部制度" },
    { id: "experience", title: "专家经验" },
  ],
  "system-admin": [
    { id: "users", title: "用户管理" },
    { id: "roles", title: "角色管理" },
    { id: "permissions", title: "权限管理" },
    { id: "menus", title: "菜单配置" },
    { id: "knowledge-permissions", title: "知识库权限" },
    { id: "logs", title: "操作日志" },
  ],
};

const dueDiligenceTabs = [
  { id: "report-generate", title: "尽调报告生成" },
  { id: "report-review", title: "报告预审" },
];

const dueTaskStepBlueprints = [
  { weight: 20, title: "工商/司法数据归集", tasks: ["工商数据", "司法风险", "经营异常"], runningDesc: "数据归集中" },
  { weight: 18, title: "主体与股权核验", tasks: ["工商信息核验", "股权穿透", "实际控制人确认"], runningDesc: "核验推进中" },
  { weight: 18, title: "财务与现金流分析", tasks: ["财务报表分析", "现金流健康度", "偿债能力评估"], runningDesc: "模型分析中" },
  { weight: 14, title: "舆情与事件扫描", tasks: ["舆情监测", "重大事件", "负面信息识别"], runningDesc: "扫描处理中" },
  { weight: 14, title: "关联网络穿透", tasks: ["关联企业识别", "关联交易挖掘", "复杂关系图谱"], runningDesc: "图谱构建中" },
  { weight: 16, title: "生成初步结论", tasks: ["综合风险评估", "尽调初步结论", "建议与提示"], runningDesc: "结论整理中" },
];

const reportCenterCatalog = [
  {
    id: "due-diligence",
    title: "尽调报告",
    shortTitle: "尽调报告",
    statusLabel: "已生成",
    statusClass: "is-ready",
    cardClass: "report-hub-primary",
    companyListTitle: "尽调报告企业清单",
    companyListSummary: "先选企业，再进入完整的尽调报告生成、编辑与预审工作台。",
    detailSummary: "这是当前可编辑、可预审、可导出的完整报告链路。",
  },
  {
    id: "credit-rating",
    title: "信用评级",
    shortTitle: "信用评级",
    statusLabel: "生成中",
    statusClass: "is-running",
    cardClass: "report-hub-blue",
    companyListTitle: "信用评级企业清单",
    companyListSummary: "先选企业，再查看评级生成状态、风险分层和输出依据。",
    detailSummary: "用于承接尽调结果，形成评级结论与评分解释。",
  },
  {
    id: "credit-plan",
    title: "授信方案",
    shortTitle: "授信方案",
    statusLabel: "待生成",
    statusClass: "is-pending",
    cardClass: "report-hub-purple",
    companyListTitle: "授信方案企业清单",
    companyListSummary: "先选企业，再查看额度建议、期限建议与缓释方案。",
    detailSummary: "授信方案会基于评级和尽调结论联动额度、期限与缓释建议。",
  },
  {
    id: "investigation-report",
    title: "授信调查报告",
    shortTitle: "调查报告",
    statusLabel: "待生成",
    statusClass: "is-pending",
    cardClass: "report-hub-amber",
    companyListTitle: "授信调查报告企业清单",
    companyListSummary: "先选企业，再进入正式上报版调查报告的企业工作区。",
    detailSummary: "作为正式上报版本，待尽调报告定稿后自动生成和编排。",
  },
  {
    id: "contract-loan",
    title: "合同与放款",
    shortTitle: "合同放款",
    statusLabel: "待生成",
    statusClass: "is-pending",
    cardClass: "report-hub-cyan",
    companyListTitle: "合同与放款企业清单",
    companyListSummary: "先选企业，再查看合同包、放款条件与核验清单。",
    detailSummary: "授信审批通过后，这里会联动生成合同包与放款校验清单。",
  },
];

const customerSections = [
  { id: "basic", title: "基本信息" },
  { id: "operation", title: "经营情况" },
  { id: "financial", title: "财务情况" },
  { id: "industry", title: "行业与外部环境信息" },
  { id: "collateral", title: "抵质押物" },
  { id: "other", title: "其他" },
];

const materialBucketDescriptions = {
  application: ["授信申请书", "融资用途说明", "用款计划"],
  financial: ["财务报表", "银行流水", "纳税/发票材料", "销售合同/订单/回款材料"],
  governance: ["营业执照", "公司章程", "股东结构材料", "法人/实控人材料"],
  collateral: ["担保承诺", "抵押物权属材料", "评估报告", "质押清单"],
  external: ["行业研究", "舆情/处罚/涉诉材料", "外部数据平台截图或报告"],
  "manager-notes": ["现场尽调记录", "电话访谈纪要", "特殊风险说明", "其他补充备注"],
};

const reportDataSourceGroups = [
  {
    id: "customer-base",
    title: "客户与案例基础",
    description: "主体、案例、人员和企业画像基础数据。",
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
    description: "主营经营、合同订单、开票和回款链路。",
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
    description: "财务指标、勾稽核验、税票和征信摘要。",
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
    description: "股权治理、行业外部环境、同业和公开风险。",
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
    description: "担保缓释、补件资料和风险建议。",
    items: [
      { id: "guarantees", label: "担保与抵质押信息" },
      { id: "due_diligence_materials", label: "尽调补充材料" },
      { id: "validation_findings", label: "核验发现" },
      { id: "recommendation", label: "授信建议与缓释要求" },
    ],
  },
];

const processPlaceholderMap = {
  "credit-rating": {
    title: "信用评级",
    metrics: ["评级要素", "评级结果", "评级说明"],
    cards: ["财务指标评分", "行业景气度评分", "行为与合规评分", "最终评级与敏感项说明"],
  },
  "credit-plan": {
    title: "授信方案",
    metrics: ["授信额度", "产品结构", "缓释措施"],
    cards: ["额度与期限设计", "产品与用途匹配", "第一/第二还款来源", "担保与抵质押配置"],
  },
  "investigation-report": {
    title: "授信调查报告",
    metrics: ["报告结构", "引用材料", "调查结论"],
    cards: ["调查报告草案", "引用材料汇总", "调查意见校验", "上报版结论摘要"],
  },
  "contract-loan": {
    title: "合同与放款",
    metrics: ["合同包", "条件落实", "放款校验"],
    cards: ["合同签署资料", "放款前条件清单", "受托支付/资金流向校验", "台账登记与放款结果"],
  },
  "post-loan": {
    title: "贷后管理",
    metrics: ["贷后监测", "预警事件", "整改跟踪"],
    cards: ["经营与财务监测", "风险预警时间线", "整改闭环记录", "贷后检查计划"],
  },
};

const statusPalette = {
  stable: { label: "稳定", className: "status-stable" },
  watch: { label: "关注", className: "status-watch" },
  pressure: { label: "高风险", className: "status-pressure" },
  open: { label: "已开放", className: "status-stable" },
  placeholder: { label: "框架中", className: "status-blue" },
  processing: { label: "生成中", className: "status-blue" },
  generated: { label: "已生成", className: "status-stable" },
  reviewed: { label: "已预审", className: "status-blue" },
  pending: { label: "待预审", className: "status-watch" },
  draft: { label: "草稿", className: "status-watch" },
};

const homeQuickActions = [
  {
    title: "风险洞察",
    subtitle: "对企业发起风险洞察任务",
    icon: "risk",
    action: "go-section",
    topSection: "due-task",
  },
  {
    title: "企业画像",
    subtitle: "对目标企业进行投资尽调",
    icon: "profile",
    action: "go-section",
    topSection: "enterprise-library",
  },
  {
    title: "存量巡检",
    subtitle: "定期更新客户风险与经营状况",
    icon: "watch",
    action: "go-section",
    topSection: "watchlist",
  },
  {
    title: "报告预审",
    subtitle: "上传尽调材料，AI 生成报告",
    icon: "report",
    action: "go-section",
    topSection: "report-center",
  },
];

const homeToolRailItems = [
  { label: "智能问答", icon: "💬", action: "start-demo" },
  { label: "行业洞察", icon: "📊", action: "go-section", topSection: "watchlist" },
  { label: "政策法规", icon: "🔖", action: "go-section", topSection: "knowledge-center" },
  { label: "更多工具", icon: "◫", action: "go-section", topSection: "report-center" },
];

const smartNavRouteMeta = {
  "company-profile": {
    sectionId: "enterprise-library",
    sidebarId: "portrait",
    label: "企业画像",
  },
  "insight-tasks": {
    sectionId: "due-task",
    sidebarId: "execution",
    label: "洞察任务",
  },
  "due-diligence-report": {
    sectionId: "report-center",
    sidebarId: "generation",
    label: "尽调报告",
  },
  "watchlist-detail": {
    sectionId: "watchlist",
    sidebarId: "alerts",
    label: "风险预警",
  },
};

const smartNavActionCatalog = [
  { routeKey: "insight-tasks", label: "查看洞察任务", description: "进入洞察任务详情页" },
  { routeKey: "company-profile", label: "查看企业画像", description: "进入企业画像详情页" },
  { routeKey: "due-diligence-report", label: "查看尽调报告", description: "进入尽调报告详情页" },
  { routeKey: "watchlist-detail", label: "查看风险预警", description: "进入监控预警详情页" },
];

const smartNavIntentKeywords = {
  "due-diligence-report": ["报告", "尽调报告", "授信报告"],
  "watchlist-detail": ["风险", "预警", "监控"],
  "insight-tasks": ["洞察", "任务", "调查", "尽调任务", "授信尽调"],
};

const smartNavCompanies = [
  {
    id: "lingxi",
    companyCode: "COMP-001",
    name: "深圳市灵犀微传感科技有限公司",
    aliases: ["深圳灵犀微传感", "灵犀微传感", "灵犀微传感科技", "灵犀微传感公司", "灵犀"],
    industry: "工业传感器 / 智能制造",
    region: "深圳 · 南山区",
    summary: "聚焦工业微型传感器、智能检测模组与制造现场感知系统。",
    riskLevel: "高风险",
    riskScore: 82,
    profile: {
      dataCompleteness: "89%",
      updatedAt: "2026-05-15 10:20",
      tags: ["现金流承压", "关联穿透", "授信尽调高频样本"],
      highlights: [
        "主营收入集中在工业传感器与检测模组，客户验证周期较长。",
        "近一年存在回款拉长与短债承接压力，需要同步核验订单兑现质量。",
        "关联网络较复杂，建议在尽调中优先复核实际控制链与担保线索。",
      ],
      dimensions: [
        { title: "主体与治理", desc: "主体状态正常，实控链较清晰，但近两年有外部股东进入。" },
        { title: "经营与订单", desc: "头部客户集中度偏高，订单延迟会直接影响收入与现金回笼。" },
        { title: "财务与回款", desc: "利润与经营现金流存在偏离，回款节奏是当前最重要的验证点。" },
      ],
    },
    tasks: {
      status: "进行中",
      progress: 72,
      phase: "数据归集与交叉验证",
      steps: [
        { title: "主体与股权核验", status: "已完成", note: "工商、股东与实控链已完成初步穿透。" },
        { title: "财务与回款验证", status: "进行中", note: "正在核验回款、应收账龄与现金流匹配度。" },
        { title: "风险结论生成", status: "待开始", note: "待关键证据补齐后输出授信尽调结论。" },
      ],
      findings: ["回款周期拉长", "短债覆盖压力", "关联交易说明待补"],
    },
    report: {
      status: "可查看",
      updatedAt: "2026-05-15 10:35",
      summary: "尽调报告已生成草稿，可继续编辑、预审与导出。",
      sections: ["企业概况", "经营分析", "财务分析", "风险事项", "授信建议"],
      highlights: ["已形成初步授信建议", "税票与回款差异需要补充说明", "担保线索已列入附注"],
    },
    watchlist: {
      level: "高风险",
      updatedAt: "2026-05-15 10:42",
      summary: "已进入持续监测名单，重点观察回款、担保与舆情事件。",
      alerts: [
        { time: "10:16", title: "担保风险待核验", detail: "发现新增连带担保线索，需核验责任边界。" },
        { time: "09:48", title: "回款周期拉长", detail: "核心客户回款较上月继续延后，建议关注现金回收。" },
        { time: "08:35", title: "订单波动预警", detail: "新签订单节奏放缓，需结合产能利用率解释。" },
      ],
    },
  },
  {
    id: "qimai",
    companyCode: "COMP-004",
    name: "杭州启脉能源物联科技有限公司",
    aliases: ["杭州启脉能源", "启脉能源", "启脉能源物联", "启脉物联", "启脉"],
    industry: "能源物联 / 工业软件",
    region: "杭州 · 余杭区",
    summary: "提供储能场站监控、能源数据采集与设备联网运营服务。",
    riskLevel: "中风险",
    riskScore: 68,
    profile: {
      dataCompleteness: "84%",
      updatedAt: "2026-05-15 09:50",
      tags: ["项目制收入", "客户集中", "软件服务"],
      highlights: [
        "收入依赖项目交付与后续运维续费，季度波动相对明显。",
        "能源数字化赛道景气度较高，但部分项目回款验收周期较长。",
        "适合重点核验合同条款、项目验收与续费稳定性。",
      ],
      dimensions: [
        { title: "业务模式", desc: "软硬件结合，项目交付与持续运维并行，收入确认口径要重点核验。" },
        { title: "客户结构", desc: "客户集中在能源场站与工业园区，单一大客户影响较大。" },
        { title: "经营稳定性", desc: "整体风险可控，但需要关注项目验收与回款节奏同步性。" },
      ],
    },
    tasks: {
      status: "待发起",
      progress: 18,
      phase: "任务待确认",
      steps: [
        { title: "任务创建", status: "待开始", note: "可直接发起授信尽调任务并带入企业参数。" },
        { title: "材料归集", status: "待开始", note: "建议优先收集合同比对、验收单与回款摘要。" },
        { title: "洞察结论", status: "待开始", note: "待任务启动后自动生成阶段性发现。" },
      ],
      findings: ["建议先核验项目回款", "关注单一客户依赖", "补充验收资料"],
    },
    report: {
      status: "待生成",
      updatedAt: "2026-05-15 09:40",
      summary: "当前尚未生成正式尽调报告，建议先发起洞察任务。",
      sections: ["企业概况", "项目结构", "客户与回款", "风险结论"],
      highlights: ["报告模板已就绪", "需补充项目验收材料", "建议先完成基础尽调任务"],
    },
    watchlist: {
      level: "中风险",
      updatedAt: "2026-05-15 09:58",
      summary: "建议纳入跟踪名单，持续观察项目验收与大客户续费情况。",
      alerts: [
        { time: "09:12", title: "验收进度提醒", detail: "两个重点项目尚未完成终验，影响确认回款节奏。" },
        { time: "08:44", title: "客户集中监测", detail: "前两大客户占比偏高，建议持续观察续费稳定性。" },
      ],
    },
  },
  {
    id: "huafeng",
    companyCode: null,
    name: "华丰电气集团有限公司",
    aliases: ["华丰电气", "华丰集团", "华丰电气集团", "华丰"],
    industry: "电气设备 / 工程集成",
    region: "华东 · 制造基地",
    summary: "从事成套电气设备、工程集成与工业配电系统交付。",
    riskLevel: "高风险",
    riskScore: 86,
    profile: {
      dataCompleteness: "81%",
      updatedAt: "2026-05-15 09:18",
      tags: ["工程回款慢", "杠杆偏高", "涉诉关注"],
      highlights: [
        "工程类项目账期长，资金占用与回款不确定性较高。",
        "债务结构偏紧，需重点验证短债到期安排与续贷能力。",
        "若用于授信审批，建议先完成诉讼与担保事项专项核验。",
      ],
      dimensions: [
        { title: "订单与履约", desc: "工程项目周期长，合同执行与验收节点直接影响现金流。" },
        { title: "财务与偿债", desc: "整体杠杆偏高，应重点看短债结构与经营现金回收。" },
        { title: "公开风险", desc: "存在涉诉与工程争议线索，建议进入重点复核名单。" },
      ],
    },
    tasks: {
      status: "进行中",
      progress: 64,
      phase: "风险事项穿透",
      steps: [
        { title: "公开风险筛查", status: "已完成", note: "已识别涉诉与工程争议事件。" },
        { title: "偿债压力评估", status: "进行中", note: "正在复核短债、续贷与工程回款承接情况。" },
        { title: "授信建议形成", status: "待开始", note: "待风险事项确认后输出授信意见。" },
      ],
      findings: ["工程回款偏慢", "短债压力较高", "涉诉事项需专项说明"],
    },
    report: {
      status: "预审中",
      updatedAt: "2026-05-15 09:26",
      summary: "尽调报告已进入预审，重点核对偿债分析与涉诉影响表述。",
      sections: ["主体画像", "工程业务分析", "偿债能力", "风险事项", "预审意见"],
      highlights: ["需补充涉诉金额口径", "缓释措施待补", "授信建议暂未定稿"],
    },
    watchlist: {
      level: "高风险",
      updatedAt: "2026-05-15 09:31",
      summary: "属于重点监测样本，建议持续跟踪工程履约、涉诉与短债变化。",
      alerts: [
        { time: "09:05", title: "涉诉动态更新", detail: "新增工程结算争议，建议同步核验涉案金额。" },
        { time: "08:27", title: "债务压力预警", detail: "短期债务集中到期，需关注续贷与现金归集安排。" },
      ],
    },
  },
];

const homeRiskHotspots = [
  {
    id: "beijing",
    label: "北京",
    x: "73%",
    y: "29%",
    title: "北京区域风险扫描",
    score: "62.4 / 100",
    tone: "中等风险",
    summary: "政策敏感行业融资活跃，但城投链条与房地产关联样本的解释压力上升。",
    cities: [
      { name: "朝阳区", value: "89.2" },
      { name: "海淀区", value: "76.8" },
      { name: "丰台区", value: "72.1" },
    ],
    industries: [
      { name: "科技服务", value: "81.4" },
      { name: "地产链", value: "73.2" },
      { name: "供应链金融", value: "68.5" },
    ],
  },
  {
    id: "shenzhen",
    label: "深圳",
    x: "66%",
    y: "68%",
    title: "深圳尽调热点",
    score: "78.9 / 100",
    tone: "重点关注",
    summary: "灵犀微传感、电子制造与跨境贸易样本风险热度较高，适合作为尽调入口。",
    cities: [
      { name: "南山区", value: "91.6" },
      { name: "宝安区", value: "84.3" },
      { name: "龙岗区", value: "76.5" },
    ],
    industries: [
      { name: "电子元器件", value: "88.4" },
      { name: "智能制造", value: "79.8" },
      { name: "跨境贸易", value: "71.6" },
    ],
  },
  {
    id: "shanghai",
    label: "上海",
    x: "78%",
    y: "46%",
    title: "上海企业风险脉冲",
    score: "67.1 / 100",
    tone: "持续监测",
    summary: "医药、消费和平台型企业样本较多，舆情与现金流波动需要同步观察。",
    cities: [
      { name: "浦东新区", value: "83.5" },
      { name: "闵行区", value: "74.1" },
      { name: "嘉定区", value: "65.8" },
    ],
    industries: [
      { name: "医药制造", value: "82.1" },
      { name: "消费零售", value: "70.4" },
      { name: "平台服务", value: "66.7" },
    ],
  },
  {
    id: "chengdu",
    label: "成都",
    x: "45%",
    y: "53%",
    title: "成都区域预警",
    score: "58.6 / 100",
    tone: "平稳偏谨慎",
    summary: "装备制造与新能源配套企业增长快，但补贴依赖和订单集中度值得复核。",
    cities: [
      { name: "高新区", value: "77.9" },
      { name: "双流区", value: "69.2" },
      { name: "龙泉驿区", value: "61.3" },
    ],
    industries: [
      { name: "新能源配套", value: "79.6" },
      { name: "装备制造", value: "72.8" },
      { name: "汽车零部件", value: "63.9" },
    ],
  },
];

const riskMapRegionViews = {
  beijing: {
    id: "beijing",
    name: "北京",
    subtitle: "北京区域风险详情",
    index: "62.4",
    enterpriseCount: "1,248",
    heat: "68.7",
    alerts: "152",
    summary:
      "北京整体风险处于中高位，科技与地产相关样本的风险热度上升较快，朝阳区、海淀区聚集度更高。",
    districts: [
      { name: "朝阳区", score: "72.1", count: "412" },
      { name: "海淀区", score: "68.9", count: "328" },
      { name: "丰台区", score: "61.3", count: "214" },
      { name: "通州区", score: "58.7", count: "162" },
      { name: "昌平区", score: "55.2", count: "126" },
    ],
    industries: [
      { name: "科技", score: "71.3", delta: "+6.1" },
      { name: "房地产", score: "68.8", delta: "+5.4" },
      { name: "医药", score: "61.7", delta: "+2.8" },
      { name: "先进制造", score: "58.2", delta: "-1.3" },
    ],
    companies: [
      { name: "某科技股份有限公司", district: "海淀区", industry: "科技", score: "78.6", tags: ["经营异常", "可追风险"] },
      { name: "某置业集团有限公司", district: "朝阳区", industry: "房地产", score: "72.3", tags: ["债务逾期", "高杠杆"] },
      { name: "某生物医药有限公司", district: "海淀区", industry: "医药", score: "65.1", tags: ["监管关注", "经营波动"] },
      { name: "某智能制造有限公司", district: "通州区", industry: "先进制造", score: "59.4", tags: ["供应链风险", "涉诉"] },
    ],
    events: [
      { time: "05-24 09:18", text: "北京某科技企业发生经营异常", district: "海淀区", level: "高风险" },
      { time: "05-24 06:47", text: "朝阳区某房地产企业新增涉诉", district: "朝阳区", level: "高风险" },
      { time: "05-23 23:15", text: "丰台区供应链企业现金归集紧张", district: "丰台区", level: "中风险" },
      { time: "05-23 18:54", text: "昌平区部分企业涉及税务提示", district: "昌平区", level: "低风险" },
    ],
    guidance: "下一步可切换到企业尽调，对某个企业进行深入尽职调查并获取更全面的风险画像。",
  },
  shanghai: {
    id: "shanghai",
    name: "上海",
    subtitle: "上海区域风险详情",
    index: "67.1",
    enterpriseCount: "1,036",
    heat: "71.8",
    alerts: "138",
    summary:
      "上海区域风险由平台服务、医药制造和外贸链路共同驱动，浦东新区和闵行区风险热度较高。",
    districts: [
      { name: "浦东新区", score: "74.6", count: "386" },
      { name: "闵行区", score: "69.8", count: "242" },
      { name: "嘉定区", score: "63.5", count: "188" },
      { name: "徐汇区", score: "58.4", count: "142" },
      { name: "宝山区", score: "54.9", count: "119" },
    ],
    industries: [
      { name: "平台服务", score: "76.2", delta: "+4.8" },
      { name: "医药制造", score: "73.4", delta: "+3.1" },
      { name: "外贸供应链", score: "69.5", delta: "+5.2" },
      { name: "消费零售", score: "62.8", delta: "-0.6" },
    ],
    companies: [
      { name: "某平台科技有限公司", district: "浦东新区", industry: "平台服务", score: "79.2", tags: ["资金波动", "扩张压力"] },
      { name: "某创新药企", district: "闵行区", industry: "医药制造", score: "72.4", tags: ["监管关注", "现金消耗"] },
      { name: "某供应链集团", district: "嘉定区", industry: "外贸供应链", score: "67.8", tags: ["汇率风险", "涉诉"] },
      { name: "某消费品牌公司", district: "徐汇区", industry: "消费零售", score: "58.9", tags: ["库存波动"] },
    ],
    events: [
      { time: "05-24 10:01", text: "浦东新区平台企业新增资金链预警", district: "浦东新区", level: "高风险" },
      { time: "05-24 08:42", text: "闵行区医药企业补充监管说明", district: "闵行区", level: "中风险" },
      { time: "05-23 22:10", text: "嘉定区供应链企业出现跨境回款延迟", district: "嘉定区", level: "中风险" },
      { time: "05-23 17:26", text: "徐汇区消费企业库存周转偏慢", district: "徐汇区", level: "低风险" },
    ],
    guidance: "上海区域更适合从平台企业和医药企业切入企业尽调，优先核验资金与合规链路。",
  },
  shenzhen: {
    id: "shenzhen",
    name: "深圳",
    subtitle: "深圳区域风险详情",
    index: "78.9",
    enterpriseCount: "892",
    heat: "82.6",
    alerts: "166",
    summary:
      "深圳是当前最适合作为尽调入口的区域，电子制造、智能硬件和跨境贸易样本的风险强度最高。",
    districts: [
      { name: "南山区", score: "81.6", count: "298" },
      { name: "宝安区", score: "78.4", count: "226" },
      { name: "龙岗区", score: "72.9", count: "184" },
      { name: "福田区", score: "69.2", count: "118" },
      { name: "龙华区", score: "64.7", count: "96" },
    ],
    industries: [
      { name: "电子制造", score: "85.3", delta: "+6.8" },
      { name: "智能硬件", score: "80.7", delta: "+4.2" },
      { name: "跨境贸易", score: "76.4", delta: "+5.7" },
      { name: "新材料", score: "69.8", delta: "+2.3" },
    ],
    companies: [
      { name: "深圳市灵犀微传感科技有限公司", district: "南山区", industry: "电子制造", score: "88.6", tags: ["尽调样本", "高风险"] },
      { name: "某智能硬件公司", district: "宝安区", industry: "智能硬件", score: "77.2", tags: ["订单波动", "客户集中"] },
      { name: "某跨境供应链企业", district: "龙岗区", industry: "跨境贸易", score: "74.1", tags: ["回款延迟", "汇率波动"] },
      { name: "某新材料企业", district: "龙华区", industry: "新材料", score: "66.9", tags: ["毛利下滑"] },
    ],
    events: [
      { time: "05-24 10:16", text: "灵犀微传感新增担保风险待核验", district: "南山区", level: "高风险" },
      { time: "05-24 09:27", text: "宝安区硬件企业经营异常触发提醒", district: "宝安区", level: "高风险" },
      { time: "05-23 21:08", text: "龙岗区跨境企业回款周期拉长", district: "龙岗区", level: "中风险" },
      { time: "05-23 16:31", text: "龙华区材料企业客户集中度上升", district: "龙华区", level: "低风险" },
    ],
    guidance: "深圳详情页可直接联动到灵犀微传感尽调工作台，适合作为完整演示链路的起点。",
  },
  chengdu: {
    id: "chengdu",
    name: "成都",
    subtitle: "成都区域风险详情",
    index: "58.6",
    enterpriseCount: "674",
    heat: "63.2",
    alerts: "94",
    summary:
      "成都区域整体风险相对温和，但新能源配套和装备制造企业的订单兑现与补贴依赖需要持续关注。",
    districts: [
      { name: "高新区", score: "69.1", count: "204" },
      { name: "双流区", score: "63.8", count: "161" },
      { name: "龙泉驿区", score: "61.4", count: "148" },
      { name: "温江区", score: "55.2", count: "96" },
      { name: "郫都区", score: "49.7", count: "65" },
    ],
    industries: [
      { name: "新能源配套", score: "72.4", delta: "+3.6" },
      { name: "装备制造", score: "68.1", delta: "+2.4" },
      { name: "汽车零部件", score: "63.9", delta: "+1.8" },
      { name: "软件服务", score: "54.2", delta: "-0.4" },
    ],
    companies: [
      { name: "某新能源配套企业", district: "高新区", industry: "新能源配套", score: "73.4", tags: ["补贴依赖", "回款慢"] },
      { name: "某装备制造公司", district: "双流区", industry: "装备制造", score: "67.3", tags: ["订单集中"] },
      { name: "某汽车零部件企业", district: "龙泉驿区", industry: "汽车零部件", score: "62.6", tags: ["存货波动"] },
      { name: "某软件服务商", district: "温江区", industry: "软件服务", score: "53.1", tags: ["经营平稳"] },
    ],
    events: [
      { time: "05-24 08:36", text: "高新区新能源企业回款延迟", district: "高新区", level: "中风险" },
      { time: "05-23 20:11", text: "双流区装备企业合同履约放缓", district: "双流区", level: "中风险" },
      { time: "05-23 18:04", text: "龙泉驿区零部件企业库存上升", district: "龙泉驿区", level: "低风险" },
      { time: "05-23 15:29", text: "温江区软件服务企业经营稳定", district: "温江区", level: "低风险" },
    ],
    guidance: "成都区域更适合演示区域筛选与轻量下钻，企业尽调可以从高新区新能源样本切入。",
  },
};

const nationalRiskHotspots = [
  { id: "beijing", label: "北京", score: "62.4", level: "中高风险", companies: 1248, x: "64%", y: "32%", glow: "#ff9f68" },
  { id: "shanghai", label: "上海", score: "67.1", level: "中高风险", companies: 1036, x: "73%", y: "47%", glow: "#b788ff" },
  { id: "shenzhen", label: "深圳", score: "78.9", level: "高风险", companies: 892, x: "61%", y: "68%", glow: "#ff7d6d" },
  { id: "chengdu", label: "成都", score: "58.6", level: "中风险", companies: 674, x: "43%", y: "54%", glow: "#5fb8ff" },
];

const RISK_MAP_BASE_PATH = "/risk-map";
const PORTRAIT_DETAIL_LAYOUT_STORAGE_KEY = "agentPortraitDetailLayout";

const portraitRiskFilters = ["全部", "极高风险", "高风险", "中风险", "低风险", "信息不足"];

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

function readPortraitDetailLayoutPreference() {
  try {
    const raw = window.localStorage?.getItem(PORTRAIT_DETAIL_LAYOUT_STORAGE_KEY);
    if (!raw) return { mainPercent: 78, collapsed: false };
    const parsed = JSON.parse(raw);
    return {
      mainPercent: clampNumber(parsed?.mainPercent, 60, 85, 78),
      collapsed: Boolean(parsed?.collapsed),
    };
  } catch (error) {
    return { mainPercent: 78, collapsed: false };
  }
}

function savePortraitDetailLayoutPreference() {
  try {
    window.localStorage?.setItem(
      PORTRAIT_DETAIL_LAYOUT_STORAGE_KEY,
      JSON.stringify({
        mainPercent: clampNumber(state.portraitMainPercent, 60, 85, 78),
        collapsed: Boolean(state.portraitDetailCollapsed),
      }),
    );
  } catch (error) {
    // localStorage may be unavailable in restricted preview contexts.
  }
}

const portraitDetailLayoutPreference = readPortraitDetailLayoutPreference();

const riskSeverityMeta = {
  极高风险: { badgeClass: "risk-badge-extreme", toneClass: "severity-extreme", scoreClass: "score-extreme" },
  高风险: { badgeClass: "risk-badge-high", toneClass: "severity-high", scoreClass: "score-high" },
  中风险: { badgeClass: "risk-badge-medium", toneClass: "severity-medium", scoreClass: "score-medium" },
  低风险: { badgeClass: "risk-badge-low", toneClass: "severity-low", scoreClass: "score-low" },
  信息不足: { badgeClass: "risk-badge-unknown", toneClass: "severity-unknown", scoreClass: "score-unknown" },
};

const riskHouseBlueprint = [
  {
    id: "01",
    title: "主体身份与工商稳定性风险",
    layer: "micro",
    priority: 1,
    overview: "关注主体状态、统一社会信用代码、法定代表人和工商登记一致性。",
    defaultEvidence: ["工商登记", "营业执照", "历史变更记录"],
    defaultMetrics: ["主体状态", "工商变更次数", "信息一致性校验"],
    defaultAdvice: "仅在主体异常、注销吊销或信息冲突时上调优先级。",
  },
  {
    id: "02",
    title: "实控人与股权控制风险",
    layer: "micro",
    priority: 2,
    overview: "关注股权稳定性、实控链清晰度、控制权质押与代持疑点。",
    defaultEvidence: ["工商股权穿透", "股权变更记录", "股权质押公告"],
    defaultMetrics: ["股权变更次数", "实控链层级", "股权质押比例"],
    defaultAdvice: "关注控制权稳定性与关键股东资金压力，必要时补充穿透核验。",
  },
  {
    id: "03",
    title: "法律诉讼与执行风险",
    layer: "micro",
    priority: 3,
    overview: "关注诉讼、仲裁、执行、限制高消费与涉案金额传导。",
    defaultEvidence: ["中国裁判文书网", "中国执行信息公开网", "企查查诉讼快照"],
    defaultMetrics: ["涉诉案件数量", "涉案金额", "被执行信息数量"],
    defaultAdvice: "优先核验案件进展、执行状态与是否已形成实质性偿债压力。",
  },
  {
    id: "04",
    title: "经营异常与信用失范风险",
    layer: "micro",
    priority: 4,
    overview: "关注经营异常名录、严重违法失信、行政提示与税务异常。",
    defaultEvidence: ["国家企业信用信息公示系统", "行政处罚公开平台", "税务异常提示"],
    defaultMetrics: ["经营异常次数", "失信记录", "行政提示数量"],
    defaultAdvice: "核验异常是否已移出，评估异常对授信准入和合作稳定性的影响。",
  },
  {
    id: "05",
    title: "财务质量与盈利能力风险",
    layer: "micro",
    priority: 5,
    overview: "关注收入确认、税票回款勾稽、毛利波动与应收质量。",
    defaultEvidence: ["近三年报表", "增值税发票摘要", "回款勾稽结果"],
    defaultMetrics: ["毛利率波动", "应收账龄", "收入税票匹配度"],
    defaultAdvice: "补充税票、合同与回款链路，验证利润质量与会计一致性。",
  },
  {
    id: "06",
    title: "偿债能力与现金流风险",
    layer: "micro",
    priority: 6,
    overview: "关注短债覆盖、经营现金流、利息保障与流动性缺口。",
    defaultEvidence: ["财务报表", "银行流水", "授信台账"],
    defaultMetrics: ["经营现金流", "短期债务", "利息保障倍数"],
    defaultAdvice: "优先核验现金回收节奏和债务结构，判断短期流动性是否承压。",
  },
  {
    id: "07",
    title: "关联网络与隐性关系风险",
    layer: "meso",
    priority: 7,
    overview: "关注关联企业、资金往来、公允交易与隐性担保链条。",
    defaultEvidence: ["关联方穿透图谱", "关联交易摘要", "司法关联网络"],
    defaultMetrics: ["关联企业数量", "关联交易金额", "短期往来频次"],
    defaultAdvice: "识别是否存在利益输送、循环交易或隐性担保安排。",
  },
  {
    id: "08",
    title: "供应链与客户集中风险",
    layer: "meso",
    priority: 8,
    overview: "关注单一客户依赖、关键原料替代性与上游稳定性。",
    defaultEvidence: ["前五客户清单", "前五供应商清单", "采购结算摘要"],
    defaultMetrics: ["前五客户集中度", "前五供应商集中度", "关键材料替代周期"],
    defaultAdvice: "评估头部客户/供应商波动对收入兑现和生产连续性的影响。",
  },
  {
    id: "09",
    title: "合同履约与交易真实性风险",
    layer: "meso",
    priority: 9,
    overview: "关注合同违约、回款逾期、发货验收与历史争议。",
    defaultEvidence: ["合同台账", "订单与出货记录", "客户对账单"],
    defaultMetrics: ["逾期回款比例", "合同争议数量", "履约准时率"],
    defaultAdvice: "对重点客户与大额合同做穿透核验，确认真实履约质量。",
  },
  {
    id: "10",
    title: "业务资质与准入合规风险",
    layer: "meso",
    priority: 10,
    overview: "关注核心资质证照、行业许可、备案完整性与到期风险。",
    defaultEvidence: ["资质证照", "许可备案", "年审记录"],
    defaultMetrics: ["核心资质数量", "到期证照数量", "备案缺口"],
    defaultAdvice: "对关键经营资质做逐项核验，确认是否存在准入或续展风险。",
  },
  {
    id: "11",
    title: "行业与市场景气风险",
    layer: "macro",
    priority: 11,
    overview: "关注行业景气度、价格竞争、政策扰动与替代风险。",
    defaultEvidence: ["行业研究", "券商/咨询报告", "政策法规摘要"],
    defaultMetrics: ["行业景气度", "价格波动", "市场份额变化"],
    defaultAdvice: "结合行业周期与政策变化，判断企业中期增长与毛利空间。",
  },
  {
    id: "12",
    title: "区域政策与舆情声誉风险",
    layer: "macro",
    priority: 12,
    overview: "关注区域政策、媒体负面、社交平台扩散、客户投诉与品牌冲击。",
    defaultEvidence: ["区域政策", "新闻舆情", "投诉与公开问询"],
    defaultMetrics: ["区域政策信号", "负面舆情数量", "投诉趋势"],
    defaultAdvice: "持续跟踪区域政策和负面信息是否扩散为业务风险或合规事件。",
  },
];

const portraitLayerConfig = [
  {
    id: "micro",
    layerName: "微观层",
    label: "微观",
    shortDescription: "辨析细节，穿透隐患",
    description: "穿透单体企业风险，识别经营、财务、司法与治理隐患",
    moduleIds: ["01", "02", "03", "04", "05", "06"],
  },
  {
    id: "meso",
    layerName: "中观层",
    label: "中观",
    shortDescription: "管控全域，聚焦风险",
    description: "穿透关系网络与交易链条，识别供应链、关联方与履约风险",
    moduleIds: ["07", "08", "09", "10"],
  },
  {
    id: "macro",
    layerName: "宏观层",
    label: "宏观",
    shortDescription: "纵观市场，洞悉态势",
    description: "洞察行业、区域、政策与舆情趋势，辅助整体风险判断",
    moduleIds: ["11", "12"],
  },
];

const portraitLayerByModuleId = portraitLayerConfig.reduce((acc, layer) => {
  layer.moduleIds.forEach((moduleId) => {
    acc[moduleId] = layer;
  });
  return acc;
}, {});

function getPortraitLayerConfig(moduleOrLayer) {
  const moduleId = typeof moduleOrLayer === "string" ? moduleOrLayer : moduleOrLayer?.id;
  const declaredLayer = typeof moduleOrLayer === "object" ? moduleOrLayer?.layer : moduleOrLayer;
  return portraitLayerConfig.find((item) => item.id === declaredLayer || item.layerName === declaredLayer)
    || portraitLayerByModuleId[moduleId]
    || portraitLayerConfig[0];
}

function createRiskModule(companyName, config) {
  const blueprint = riskHouseBlueprint.find((item) => item.id === config.id);
  const layer = getPortraitLayerConfig({ ...blueprint, ...config });
  return {
    id: blueprint.id,
    title: blueprint.title,
    layer: layer.id,
    layerName: layer.layerName,
    priority: config.displayOrder || blueprint.priority,
    displayOrder: config.displayOrder || blueprint.priority,
    level: config.level,
    riskLevel: config.riskLevel || config.level,
    score: config.score,
    sufficiency: config.sufficiency,
    summary: config.summary || `${companyName} 在${blueprint.title}维度${blueprint.overview}`,
    evidenceSources: config.evidenceSources || blueprint.defaultEvidence,
    keyMetrics: config.keyMetrics || blueprint.defaultMetrics,
    aiInterpretation: config.aiInterpretation || `${companyName} 在${blueprint.title}维度呈现${config.level}特征，需要结合已归集证据持续校验。`,
    recommendedAction: config.recommendedAction || blueprint.defaultAdvice,
  };
}

const legacyRiskModuleIdMap = {
  "01": "03",
  "02": "04",
  "03": "02",
  "04": "06",
  "05": "05",
  "06": "07",
  "07": "09",
  "08": "08",
  "09": "11",
  "10": "01",
  "11": "10",
  "12": "12",
};

function normalizeLegacyPortraitModuleConfig(moduleConfig) {
  return {
    ...moduleConfig,
    id: legacyRiskModuleIdMap[moduleConfig.id] || moduleConfig.id,
  };
}

function createPortraitCompany(company) {
  return {
    ...company,
    modules: company.modules.map((item) => createRiskModule(company.name, normalizeLegacyPortraitModuleConfig(item))),
  };
}

const portraitWorkbenchCompanies = [
  createPortraitCompany({
    id: DEMO_COMPANY_CODE,
    companyCode: DEMO_COMPANY_CODE,
    name: "深圳市灵犀微传感科技有限公司",
    industry: "工业传感器 / 智能制造",
    riskLevel: "高风险",
    riskScore: 82,
    updatedAt: "2024-05-24 10:36",
    tags: ["法律诉讼", "现金流承压", "关联穿透"],
    modules: [
      { id: "01", level: "高风险", score: 88, sufficiency: 0.92, summary: "涉诉金额较大，部分案件已进入执行阶段，是当前最需要优先关注的构面。", keyMetrics: ["公开风险事件 2 条", "涉案金额 3,482.6 万元", "执行案件 1 起"], evidenceSources: ["中国裁判文书网", "中国执行信息公开网", "企业舆情快照"], aiInterpretation: "涉诉金额较大且存在执行风险，说明交易纠纷已开始向现金回收与信用稳定性传导。", recommendedAction: "优先核验案件进展、和解可能性与涉诉资金是否已形成实际占用。" },
      { id: "02", level: "中风险", score: 57, sufficiency: 0.74, summary: "暂无失信惩戒，但经营异常与税务提示仍需留档说明。", keyMetrics: ["经营异常 0 次", "税务提示 1 次", "行政提示 1 次"] },
      { id: "03", level: "中风险", score: 61, sufficiency: 0.82, summary: "实控链较清晰，但近两年存在股权稀释和新增外部股东。", keyMetrics: ["股权变更 2 次", "质押比例 18%", "实控链层级 3 层"] },
      { id: "04", level: "高风险", score: 84, sufficiency: 0.87, summary: "短期债务集中到期，经营现金流回正节奏慢，短债覆盖压力明显。", keyMetrics: ["经营现金流 -1,260 万元", "短期债务 5,400 万元", "利息保障倍数 1.3x"], evidenceSources: ["财务报表", "银行回款摘要", "授信台账"], aiInterpretation: "现金流风险高于利润表表现，说明企业可能依赖外部融资或延长付款周期维持周转。 " },
      { id: "05", level: "高风险", score: 76, sufficiency: 0.91, summary: "收入、税票与回款之间存在需要解释的偏差，应收质量承压。", keyMetrics: ["收入税票匹配度 78%", "应收账龄 180 天以上占比 22%", "毛利率波动 +7.4pct"] },
      { id: "06", level: "高风险", score: 79, sufficiency: 0.84, summary: "关联企业数量较多，短期资金往来和交叉担保线索需要继续穿透。", keyMetrics: ["关联企业 18 家", "短期往来 9 笔", "交叉担保线索 2 条"] },
      { id: "07", level: "中风险", score: 64, sufficiency: 0.78, summary: "大额客户履约基本正常，但两笔合同回款进度低于计划。", keyMetrics: ["逾期回款比例 13%", "合同争议 1 起", "履约准时率 89%"] },
      { id: "08", level: "中风险", score: 67, sufficiency: 0.8, summary: "核心客户和关键供应商集中度偏高，对回款和备货形成传导风险。", keyMetrics: ["前五客户集中度 71%", "前五供应商集中度 63%", "关键材料替代周期 5 个月"] },
      { id: "09", level: "中风险", score: 58, sufficiency: 0.76, summary: "赛道景气度尚可，但价格竞争加剧，对毛利修复构成压力。", keyMetrics: ["行业景气度 67", "价格波动 +4.2%", "市场份额变化 -1.1pct"] },
      { id: "10", level: "低风险", score: 29, sufficiency: 0.98, summary: "主体状态正常，工商登记与证照信息一致，不属于当前高优先级风险。", keyMetrics: ["主体状态 正常", "信息一致性 99%", "历史重大异常 0"] },
      { id: "11", level: "信息不足", score: 46, sufficiency: 0.48, summary: "部分行业资质和备案材料未在当前资料包中完整提供，需补件。", keyMetrics: ["核心资质已见 2 项", "待补备案 3 项", "到期证照 1 项"], evidenceSources: ["现有 VDR 材料", "资质证照扫描件"], aiInterpretation: "当前并非确定性高风险，但资料缺口会直接影响准入判断与后续授信审批。", recommendedAction: "尽快补充核心资质、备案回执与年审记录，先解决信息不完整问题。" },
      { id: "12", level: "低风险", score: 38, sufficiency: 0.7, summary: "舆情总体平稳，仅有零星行业性讨论，尚未形成持续负面冲击。", keyMetrics: ["负面舆情 3 条", "热度峰值 中", "客户投诉 0"] },
    ],
  }),
  createPortraitCompany({
    id: "RH-002",
    companyCode: "RH-002",
    name: "华星电气集团有限公司",
    industry: "电气设备 / 工程总包",
    riskLevel: "极高风险",
    riskScore: 91,
    updatedAt: "2024-05-24 10:12",
    tags: ["执行风险", "高杠杆", "失信扩散"],
    modules: [
      { id: "01", level: "极高风险", score: 95, sufficiency: 0.95, summary: "多起涉诉已进入执行，涉案金额大，对回款与新增授信形成直接压制。", keyMetrics: ["执行案件 4 起", "涉案金额 2.37 亿元", "限制高消费 1 次"] },
      { id: "02", level: "高风险", score: 84, sufficiency: 0.88, summary: "经营异常与行政提示并存，异常记录尚未完全消除。", keyMetrics: ["经营异常 2 次", "行政提示 3 次", "失信记录 1 条"] },
      { id: "03", level: "高风险", score: 81, sufficiency: 0.82, summary: "控股股东股权质押比例高，控制权稳定性存在波动。", keyMetrics: ["质押比例 78.6%", "股权冻结线索 1 条", "实控链层级 5 层"] },
      { id: "04", level: "高风险", score: 87, sufficiency: 0.9, summary: "短期债务高企，工程回款慢，流动性压力显著。", keyMetrics: ["经营现金流 -4,280 万元", "短债 3.1 亿元", "利息保障倍数 0.9x"] },
      { id: "05", level: "中风险", score: 69, sufficiency: 0.85 },
      { id: "06", level: "中风险", score: 63, sufficiency: 0.72 },
      { id: "07", level: "中风险", score: 61, sufficiency: 0.78 },
      { id: "08", level: "中风险", score: 66, sufficiency: 0.83 },
      { id: "09", level: "中风险", score: 54, sufficiency: 0.76 },
      { id: "10", level: "低风险", score: 33, sufficiency: 0.94 },
      { id: "11", level: "低风险", score: 37, sufficiency: 0.68 },
      { id: "12", level: "中风险", score: 57, sufficiency: 0.72 },
    ],
  }),
  createPortraitCompany({
    id: "RH-003",
    companyCode: "RH-003",
    name: "联创半导体（苏州）有限公司",
    industry: "半导体 / 芯片封测",
    riskLevel: "高风险",
    riskScore: 79,
    updatedAt: "2024-05-24 09:58",
    tags: ["股权质押", "客户集中", "关联交易"],
    modules: [
      { id: "01", level: "中风险", score: 58, sufficiency: 0.84 },
      { id: "02", level: "中风险", score: 55, sufficiency: 0.79 },
      { id: "03", level: "高风险", score: 82, sufficiency: 0.86, summary: "关联网络复杂，存在多层股东与交叉任职，关联交易金额较高。", keyMetrics: ["关联企业 26 家", "交叉任职 7 人", "关联交易占收入 19%"] },
      { id: "04", level: "中风险", score: 63, sufficiency: 0.82 },
      { id: "05", level: "中风险", score: 68, sufficiency: 0.87 },
      { id: "06", level: "高风险", score: 86, sufficiency: 0.9, summary: "关联网络风险是当前核心问题，多个关联节点同时参与采购与融资。 ", keyMetrics: ["核心关联节点 5 个", "短期往来 12 笔", "隐性担保线索 1 条"] },
      { id: "07", level: "中风险", score: 59, sufficiency: 0.8 },
      { id: "08", level: "高风险", score: 81, sufficiency: 0.88, summary: "前两大客户收入占比过高，一旦订单调整将直接压缩现金流。", keyMetrics: ["前两大客户占比 64%", "关键材料依赖 2 家", "替代周期 6 个月"] },
      { id: "09", level: "中风险", score: 62, sufficiency: 0.81 },
      { id: "10", level: "低风险", score: 31, sufficiency: 0.96 },
      { id: "11", level: "信息不足", score: 44, sufficiency: 0.42, keyMetrics: ["核心资质已见 1 项", "待补备案 2 项", "到期证照 0"] },
      { id: "12", level: "低风险", score: 35, sufficiency: 0.68 },
    ],
  }),
  createPortraitCompany({
    id: "RH-004",
    companyCode: "RH-004",
    name: "蓝海能源股份有限公司",
    industry: "新能源 / 储能系统",
    riskLevel: "高风险",
    riskScore: 76,
    updatedAt: "2024-05-24 08:44",
    tags: ["现金流吃紧", "财务波动", "资质缺口"],
    modules: [
      { id: "01", level: "中风险", score: 52, sufficiency: 0.78 },
      { id: "02", level: "低风险", score: 39, sufficiency: 0.74 },
      { id: "03", level: "中风险", score: 56, sufficiency: 0.71 },
      { id: "04", level: "极高风险", score: 92, sufficiency: 0.91, summary: "偿债与现金流风险显著偏高，经营现金流与短债覆盖严重不匹配。", keyMetrics: ["经营现金流 -8,600 万元", "短债 4.5 亿元", "货币资金/短债 0.34x"] },
      { id: "05", level: "高风险", score: 85, sufficiency: 0.89, summary: "财务质量波动大，应收与存货同步抬升，利润含金量不足。", keyMetrics: ["应收增长 32%", "存货增长 28%", "毛利率波动 9.1pct"] },
      { id: "06", level: "中风险", score: 61, sufficiency: 0.72 },
      { id: "07", level: "中风险", score: 58, sufficiency: 0.79 },
      { id: "08", level: "中风险", score: 65, sufficiency: 0.76 },
      { id: "09", level: "中风险", score: 63, sufficiency: 0.77 },
      { id: "10", level: "低风险", score: 27, sufficiency: 0.95 },
      { id: "11", level: "信息不足", score: 48, sufficiency: 0.45, summary: "部分项目备案和能评材料尚未完整入库，资质覆盖度不足。", keyMetrics: ["待补备案 4 项", "已见许可 2 项", "年审回执缺失 1 项"] },
      { id: "12", level: "中风险", score: 55, sufficiency: 0.73 },
    ],
  }),
  createPortraitCompany({
    id: "RH-005",
    companyCode: "RH-005",
    name: "云启智能装备有限公司",
    industry: "高端装备 / 自动化",
    riskLevel: "中风险",
    riskScore: 63,
    updatedAt: "2024-05-23 18:26",
    tags: ["客户集中", "行业波动", "资质待补"],
    modules: [
      { id: "01", level: "低风险", score: 28, sufficiency: 0.88 },
      { id: "02", level: "低风险", score: 31, sufficiency: 0.81 },
      { id: "03", level: "中风险", score: 52, sufficiency: 0.7 },
      { id: "04", level: "中风险", score: 59, sufficiency: 0.83 },
      { id: "05", level: "中风险", score: 57, sufficiency: 0.84 },
      { id: "06", level: "中风险", score: 54, sufficiency: 0.69 },
      { id: "07", level: "低风险", score: 43, sufficiency: 0.76 },
      { id: "08", level: "高风险", score: 74, sufficiency: 0.82, summary: "单一大客户依赖度偏高，若项目延期将影响收入兑现与产线开工。", keyMetrics: ["第一大客户占比 48%", "前五客户占比 79%", "关键供应商依赖 2 家"] },
      { id: "09", level: "中风险", score: 62, sufficiency: 0.8 },
      { id: "10", level: "低风险", score: 26, sufficiency: 0.94 },
      { id: "11", level: "信息不足", score: 42, sufficiency: 0.43 },
      { id: "12", level: "低风险", score: 37, sufficiency: 0.67 },
    ],
  }),
];

const localizedPhrases = {
  "Builds high-precision industrial sensors for battery and equipment clients.": "面向电池及装备客户提供高精度工业传感器。",
  "Industrial Sensors": "工业传感器",
  "Tech Manufacturing": "科技制造",
  "Leverage remains elevated for public-company sample": "公开资料样本显示杠杆水平仍然偏高",
  "Balance sheet equation": "资产负债平衡关系",
  "Revenue minus COGS equals gross profit": "营业收入减营业成本等于毛利",
  "Capex versus fixed asset roll-forward": "资本开支与固定资产滚动勾稽",
  "Cash roll-forward": "现金滚动勾稽",
  "Net profit to operating cash conversion": "净利润向经营现金流转化",
  "Listed balance sheet equation": "上市公司资产负债平衡关系",
  "Public balance-sheet totals should tie out.": "公开口径下总资产、总负债与权益关系应保持勾稽一致。",
  "Gross margin consistency": "毛利率一致性核验",
  "A loose bridge between disclosed gross margin and revenue-cost spread.": "披露毛利率与收入成本差额之间需要保持可解释的一致关系。",
  "Net cash flow bridge": "净现金流勾稽",
  "Net cash flow should broadly reconcile to the three cash flow sections.": "净现金流应与经营、投资、筹资三部分现金流总体勾稽。",
  "Profit to operating cash conversion": "利润向经营现金流转化",
  "Cash conversion below 0.8x or negative should trigger follow-up.": "当利润转现金能力低于 0.8 倍或为负时，应触发后续跟踪。",
  "Collections from top industrial clients": "头部工业客户回款",
  "Supported in domestic substitution and industrial upgrade.": "受益于国产替代与产业升级政策支持。",
  "Capital intensive with high customer verification requirements.": "资本投入相对较高，客户验收与核验要求严格。",
  "Former sales manager labor dispute": "原销售经理劳动争议",
  "Tax bureau requested supplementary filing explanation": "税务机关要求补充申报说明",
  "Controller dilution is acceptable but points to capital pressure.": "实控人股权被稀释尚可接受，但反映出一定资本压力。",
  "Shares controller family links and short-term advances.": "与实控人家庭存在关联，并发生过短期资金往来。",
  "Pricing and settlement need supplementary explanation": "定价与结算安排仍需补充说明。",
  "Monthly settlement summary derived from seeded bank statement behavior.": "根据示例银行流水行为提炼的月度结算摘要。",
  "Revenue, invoice, and bank receipt consistency summary for demo tax dimension.": "收入、发票与银行回款一致性核验摘要。",
  "Total assets should equal liabilities plus equity.": "总资产应与负债及所有者权益合计一致。",
  "Gross profit should bridge cleanly from revenue and cost.": "营业收入与营业成本勾稽后应能准确推导毛利。",
  "High variance suggests capex or fixed asset roll-forward needs manual support.": "波动较大，说明资本开支或固定资产滚动关系仍需人工补证。",
  "Cash flow statement roll-forward should fully tie.": "现金流量表滚动关系应完整勾稽。",
  "Large gaps between profit and operating cash need working-capital explanation.": "利润与经营现金流偏离较大，需要结合营运资本变化解释。",
  "If used in credit workflow, supplement shareholder, legal representative, and exposure structure from external enterprise data providers.":
    "如用于授信流程，建议补充股东、法定代表人及授信敞口结构等外部企业信息。",
};

const localizedTokens = {
  medium_high: "中高风险",
  medium: "中风险",
  high: "高风险",
  listed_company_public_pack: "上市公司公开资料包",
  listed: "上市公司",
  "Not applicable": "暂不适用",
  pass: "通过",
  fail: "未通过",
  warn: "预警",
  active: "正常经营",
  listed_active: "正常上市经营",
  small: "小型企业",
  medium_enterprise: "中型企业",
  micro_enterprise_credit: "小微企业授信",
  public_pack_analysis: "公开资料分析",
  CEO: "首席执行官",
  CTO: "首席技术官",
  Tech: "科技",
  Manufacturing: "制造",
  Industrial: "工业",
  Sensors: "传感器",
  Guangdong: "广东",
  Shenzhen: "深圳",
  growth: "成长期",
  affiliate_supplier: "关联供应商",
  legal_representative: "法定代表人",
  finance_controller: "财务负责人",
  core_executive: "核心高管",
  guarantor: "担保人",
  equity_transfer: "股权转让",
  purchase: "采购",
  submitted: "已申报",
  VAT_summary: "增值税申报摘要",
  controller_joint_guarantee: "实控人连带保证",
  monthly_interest_bullet_principal: "按月付息、到期还本",
  admin_notice: "行政提示",
  labour_dispute: "劳动争议",
  low: "低",
  none: "无",
};

const state = {
  topSectionId: "home",
  activeSidebarBySection: {
    home: "overview",
    "risk-map": "national",
    "due-task": "execution",
    "enterprise-library": "portrait",
    watchlist: "live",
    "report-center": "generation",
    "knowledge-center": "laws",
    "risk-view": "basic-info",
    "process-engine": "due-diligence",
    "knowledge-base": "laws",
    "system-admin": "users",
  },
  riskViewCompanyCode: null,
  processEngineCompanyCode: null,
  riskSearchKeyword: "",
  processSearchKeyword: "",
  knowledgeSearchKeyword: "",
  portraitSearchKeyword: "",
  portraitRiskFilter: "全部",
  portraitView: "list",
  portraitCompanyId: DEMO_COMPANY_CODE,
  portraitLoadingCompanyCode: null,
  portraitError: null,
  portraitMainPercent: portraitDetailLayoutPreference.mainPercent,
  portraitDetailCollapsed: portraitDetailLayoutPreference.collapsed,
  riskRecentCodes: [],
  processRecentCodes: [],
  dueDiligenceTabId: "report-generate",
  riskMapRegionId: null,
  taskBoardTab: "collection",
  taskBoardView: "list",
  taskBoardCompanyCode: DEMO_COMPANY_CODE,
  taskBoardSearchKeyword: "",
  reportCenterView: "hub",
  reportCenterReportTypeId: "due-diligence",
  reportCenterSearchKeyword: "",
  reportSearchKeyword: "",
  reportCenterLoadingCompanyCode: null,
  reportCenterError: null,
  riskHouseFocusId: "01",
  watchlistFocusCode: DEMO_COMPANY_CODE,
  watchlistPanelMode: "overview",
  customerSectionId: "basic",
  reportVersionId: null,
  previewOpen: false,
  previewSectionId: null,
  reportReferencesOpen: false,
  reportImmersiveMode: false,
  reportCanvasZoom: 100,
  activeReferenceId: null,
  reportKnowledgeCollapsed: false,
  reviewKnowledgeCollapsed: false,
  pendingDataSourceSelection: [],
  riskCompletionMode: null,
  riskCompletionMenuOpen: false,
  completionModalOpen: false,
  completionModalType: null,
  completionModalField: null,
  riskCompletionUploads: {},
  riskManualEdits: {},
  riskManualDirtyFields: {},
  activeEditableField: null,
  riskCompletionSnapshot: null,
  pendingKnowledgeSelection: [],
  pendingKnowledgeVersionId: null,
  reportEditorText: "",
  reviewEditorText: "",
  homeCommandInput: "",
  homeCommandMessage: "",
  homeCommandIsComposing: false,
  companies: [],
  meta: null,
  knowledgeBase: null,
  systemAdmin: null,
  homeFeed: null,
  companyDetailCache: {},
  dueTaskGenerationByCompany: {},
  isGeneratingVersion: false,
  isRunningReview: false,
  homeHotspotId: null,
  smartNavContext: null,
};

const topbarNavEl = document.getElementById("topbar-nav");
const topbarHeadingEl = document.getElementById("topbar-heading");
const appFrameEl = document.querySelector(".app-frame");
const workspaceEl = document.querySelector(".workspace");
const sidebarEl = document.querySelector(".sidebar");
const sidebarContextEl = document.getElementById("sidebar-context");
const sidebarNavEl = document.getElementById("sidebar-nav");
const sidebarNoteEl = document.getElementById("sidebar-note");
const sidebarFooterEl = document.getElementById("sidebar-footer");
const toolbarAreaEl = document.getElementById("toolbar-area");
const contentAreaEl = document.getElementById("content-area");
const previewOverlayEl = document.getElementById("preview-overlay");
const previewTitleEl = document.getElementById("preview-title");
const previewOutlineEl = document.getElementById("preview-outline");
const previewArticleEl = document.getElementById("preview-article");
const completionModalEl = document.getElementById("completion-modal");
const completionModalTitleEl = document.getElementById("completion-modal-title");
const completionModalBodyEl = document.getElementById("completion-modal-body");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fetchJson(url, options = {}) {
  return fetch(`${API_BASE}${url}`, options).then(async (response) => {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Request failed: ${response.status}`);
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return null;
    return response.json();
  });
}

async function uploadFile(url, file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetchJson(url, { method: "POST", body: formData });
}

function postJson(url, payload) {
  return fetchJson(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function renderShellIcon(key) {
  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13V10.5"/><path d="M9.5 20v-5h5v5"/></svg>',
    "risk-map": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14"/><path d="M15 6v14"/></svg>',
    "due-task": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>',
    "enterprise-library": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 4 8v8l8 4 8-4V8z"/><path d="M4 8l8 4 8-4"/><path d="M12 12v8"/></svg>',
    watchlist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a7 7 0 0 0-7 7c0 6-2 7-2 7h18s-2-1-2-7a7 7 0 0 0-7-7"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    "report-center": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v6h6"/><path d="M10 13h6"/><path d="M10 17h4"/></svg>',
    "knowledge-center": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H20v16H8.5A2.5 2.5 0 0 0 6 21z"/><path d="M6 5.5V21"/><path d="M10 7h6"/><path d="M10 11h6"/></svg>',
    "risk-view": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 2.8 8.6 7 10 4.2-1.4 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    "process-engine": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/><path d="M9 6.5h6"/><path d="M6.5 9v6"/><path d="m17.5 9 0 3.5-5 5"/></svg>',
  };
  return `<span class="shell-icon" aria-hidden="true">${icons[key] || icons.home}</span>`;
}

function renderSidebarUtilityIcon(kind) {
  const icons = {
    workspace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M16.5 13v7"/><path d="M13 16.5h7"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6z"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
    diamond: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12l4 5-10 11L2 9z"/><path d="m6 4 6 16 6-16"/><path d="M2 9h20"/></svg>',
  };
  return `<span class="sidebar-utility-icon" aria-hidden="true">${icons[kind] || icons.workspace}</span>`;
}

function renderFancyFeatureIcon(kind) {
  const icons = {
    risk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 2.8 8.6 7 10 4.2-1.4 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1.5"/><circle cx="12" cy="8" r="3.2"/><path d="M18.5 6.5h1.5"/><path d="M19.25 5.75v1.5"/></svg>',
    watch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a7 7 0 0 0-7 7c0 6-2 7-2 7h18s-2-1-2-7a7 7 0 0 0-7-7"/><path d="M10 20a2 2 0 0 0 4 0"/><path d="M12 8v3l2 1.5"/></svg>',
    report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v6h6"/><path d="M10 13h6"/><path d="M10 17h4"/></svg>',
    company: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="M6 18V9l6-4 6 4v9"/><path d="M9 11h.01"/><path d="M12 11h.01"/><path d="M15 11h.01"/><path d="M9 14h.01"/><path d="M12 14h.01"/><path d="M15 14h.01"/></svg>',
    attachment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 13.5 15 9a3 3 0 1 1 4.2 4.2l-7.1 7.1a5 5 0 1 1-7.1-7.1l8-8"/></svg>',
  };
  return `<span class="fancy-feature-icon" aria-hidden="true">${icons[kind] || icons.company}</span>`;
}

function createStatusPill(key) {
  const item = statusPalette[key] || { label: key, className: "status-blue" };
  return `<span class="status-pill risk-badge ${item.className}">${item.label}</span>`;
}

function renderKnowledgeFileOption(file, checked) {
  return `
    <label class="checkbox-item knowledge-file-option">
      <input
        type="checkbox"
        data-knowledge-file-id="${file.id}"
        ${checked ? "checked" : ""}
      />
      <div class="knowledge-file-copy">
        <strong class="knowledge-file-name">${escapeHtml(file.name)}</strong>
        <div class="knowledge-file-meta">
          <span class="knowledge-file-description">${escapeHtml(file.description || "无说明")}</span>
          <span class="knowledge-file-source">上传人 ${escapeHtml(file.owner)}</span>
        </div>
      </div>
    </label>
  `;
}

function compactText(value, fallback = "—") {
  if (!value) return fallback;
  return localizeText(String(value));
}

function localizeText(value) {
  let text = String(value ?? "");
  Object.entries(localizedPhrases).forEach(([source, target]) => {
    text = text.replaceAll(source, target);
  });
  Object.entries(localizedTokens).forEach(([source, target]) => {
    const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(`\\b${escaped}\\b`, "g"), target);
  });
  return text;
}

function formatCurrency(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const num = Number(value);
  if (Math.abs(num) >= 100000000) return `${(num / 100000000).toFixed(2)} 亿元`;
  if (Math.abs(num) >= 10000) return `${(num / 10000).toFixed(2)} 万元`;
  return `${num.toLocaleString("zh-CN", { maximumFractionDigits: 2 })} 元`;
}

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  return `${(Number(value) * 100).toFixed(2)}%`;
}

function formatRiskTier(value) {
  const mapping = {
    stable: "低风险",
    low: "低风险",
    medium: "中风险",
    medium_high: "中高风险",
    watch: "重点关注",
    high: "高风险",
    pressure: "高风险",
  };
  return mapping[String(value || "").toLowerCase()] || compactText(value, "未分层");
}

function formatOperatingStatus(value) {
  const text = compactText(localizeText(value), "—");
  if (text === "—") return text;
  if (/(开业|存续|在营|在册|正常经营|正常上市经营)/.test(text)) {
    return "存续（在营、开业、在册）";
  }
  return text;
}

function formatRecommendationStatus(value) {
  const mapping = {
    public_pack_only: "仅公开资料模式",
    approve: "建议通过",
    review_required: "需人工复核",
    reject: "建议拒绝",
  };
  return mapping[String(value || "").toLowerCase()] || compactText(value, "—");
}

function formatGenerationModeLabel(value) {
  const text = String(value || "").trim();
  if (!text) return "—";
  if (text === "skill_pipeline" || text.startsWith("skill_pipeline::")) return "双 Skill 生成";
  if (text === "template") return "模板生成";
  if (text.startsWith("deepseek")) return "DeepSeek 生成";
  return text;
}

function formatVersionDisplayLabel(version) {
  if (!version) return "—";
  return `${version.version_label} · ${formatGenerationModeLabel(version.generation_mode)}`;
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function formatNumber(value, digits = 2) {
  const num = toNumber(value);
  if (num === null) return "—";
  return num.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

function formatMultiple(value) {
  const num = toNumber(value);
  if (num === null) return "—";
  return `${num.toFixed(2)} 倍`;
}

function formatPeriodLabel(periodCode) {
  const text = String(periodCode || "");
  if (!text) return "—";
  if (text.endsWith("FY")) return `${text.slice(0, 4)}年`;
  const annualDateMatched = text.match(/^(\d{4})1231$/);
  if (annualDateMatched) return `${annualDateMatched[1]}年`;
  const matched = text.match(/^(\d{4})-(\d{2})$/);
  if (matched) return `${matched[1]}年${matched[2]}月`;
  const fullDateMatched = text.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (fullDateMatched) return `${fullDateMatched[1]}-${fullDateMatched[2]}-${fullDateMatched[3]}`;
  return text;
}

function normalizeRiskRegionId(value) {
  const key = String(value || "").trim().toLowerCase();
  return riskMapRegionViews[key] ? key : null;
}

function getRiskMapPath(regionId = state.riskMapRegionId) {
  const normalized = normalizeRiskRegionId(regionId);
  return normalized ? `${RISK_MAP_BASE_PATH}/${normalized}` : RISK_MAP_BASE_PATH;
}

function normalizeSmartSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[（()）·,，。、“”"'‘’:：;；!！?？\s\-_/]/g, "");
}

function buildSmartNavAliases(name = "") {
  const rawName = String(name || "").trim();
  if (!rawName) return [];

  const aliases = new Set([rawName]);
  const stripCorporateSuffix = (value) => value
    .replace(/（集团）股份有限公司$/g, "")
    .replace(/（集团）有限公司$/g, "")
    .replace(/集团股份有限公司$/g, "")
    .replace(/集团有限公司$/g, "")
    .replace(/股份有限公司$/g, "")
    .replace(/有限责任公司$/g, "")
    .replace(/有限公司$/g, "")
    .trim();

  const withoutSuffix = stripCorporateSuffix(rawName);
  if (withoutSuffix) aliases.add(withoutSuffix);

  const withoutRegion = rawName.replace(/^(北京|上海|天津|重庆|深圳市|广州市|杭州市|苏州市|成都市|武汉市|南京市|宁波市|无锡市|佛山市|东莞市|青岛市|厦门市|珠海市|合肥市|长沙市|郑州市|西安市|山东省|浙江省|江苏省|广东省|湖北省|四川省)/, "").trim();
  if (withoutRegion) aliases.add(withoutRegion);

  const withoutRegionSuffix = stripCorporateSuffix(withoutRegion);
  if (withoutRegionSuffix) aliases.add(withoutRegionSuffix);

  const compactName = rawName.replace(/[（）()]/g, "");
  if (compactName && compactName !== rawName) aliases.add(compactName);

  return Array.from(aliases).filter(Boolean);
}

function createSmartNavCompanyFromBackend(company) {
  if (!company) return null;
  const companyCode = company.company_code || company.companyCode || company.id;
  if (!companyCode) return null;
  return {
    id: `db-${String(companyCode).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    companyCode,
    name: company.name,
    aliases: buildSmartNavAliases(company.name),
    industry: formatCompanyIndustry(company),
    region: [company.region_province, company.region_city].filter(Boolean).join(" · ") || "企业库样本",
    summary: compactText(localizeText(company.overview), "已接入企业库，可直接进入画像、任务、报告和预警模块。"),
    riskLevel: getCompanyRiskLevelLabel(company) || "中风险",
    riskScore: getCompanyRiskScoreValue(company) ?? getRiskScore(company),
  };
}

function getSmartNavCompaniesSource() {
  const backendCompanies = (state.companies || [])
    .map(createSmartNavCompanyFromBackend)
    .filter(Boolean);

  const byCode = new Map(backendCompanies.map((item) => [item.companyCode, item]));
  const mergedPrimary = smartNavCompanies.map((item) => {
    const backendMatch = item.companyCode ? byCode.get(item.companyCode) : backendCompanies.find((company) => company.name === item.name);
    return {
      ...backendMatch,
      ...item,
      aliases: Array.from(new Set([...(backendMatch?.aliases || []), ...(item.aliases || [])])),
    };
  });

  const occupiedCodes = new Set(mergedPrimary.map((item) => item.companyCode).filter(Boolean));
  const remainder = backendCompanies.filter((item) => !occupiedCodes.has(item.companyCode));
  return [...mergedPrimary, ...remainder];
}

function getSmartNavCompanyById(companyId) {
  return getSmartNavCompaniesSource().find((item) => item.id === companyId) || null;
}

function resolveSmartNavCompany(input) {
  const normalizedInput = normalizeSmartSearchText(input);
  if (!normalizedInput) return null;

  let matched = null;
  let highestScore = 0;

  getSmartNavCompaniesSource().forEach((company) => {
    const searchTokens = [company.name, ...(company.aliases || [])]
      .map(normalizeSmartSearchText)
      .filter(Boolean);

    searchTokens.forEach((token) => {
      let score = 0;
      if (normalizedInput === token) score = token.length + 100;
      else if (normalizedInput.includes(token)) score = token.length + 40;
      else if (token.includes(normalizedInput) && normalizedInput.length >= 2) score = normalizedInput.length;

      if (score > highestScore) {
        highestScore = score;
        matched = company;
      }
    });
  });

  return matched;
}

function detectSmartNavRouteKey(input) {
  const text = String(input || "").trim();
  if (!text) return "company-profile";

  if (smartNavIntentKeywords["due-diligence-report"].some((keyword) => text.includes(keyword))) {
    return "due-diligence-report";
  }
  if (smartNavIntentKeywords["watchlist-detail"].some((keyword) => text.includes(keyword))) {
    return "watchlist-detail";
  }
  if (
    smartNavIntentKeywords["insight-tasks"].some((keyword) => text.includes(keyword))
    || (/发起/.test(text) && /尽调/.test(text))
    || (/尽调/.test(text) && !/报告/.test(text) && !/风险/.test(text) && !/预警/.test(text) && !/监控/.test(text))
  ) {
    return "insight-tasks";
  }
  return "company-profile";
}

function buildSmartNavActionSuggestions(company, preferredRouteKey = "company-profile") {
  return smartNavActionCatalog.map((item) => ({
    ...item,
    company,
    isPrimary: item.routeKey === preferredRouteKey,
  }));
}

function resolveHomeSmartCommand(input = state.homeCommandInput) {
  const trimmed = String(input || "").trim();
  if (!trimmed) {
    return {
      input: "",
      company: null,
      routeKey: "company-profile",
      suggestions: [],
      message: "",
    };
  }

  const company = resolveSmartNavCompany(trimmed);
  const routeKey = detectSmartNavRouteKey(trimmed);
  if (!company) {
    return {
      input: trimmed,
      company: null,
      routeKey,
      suggestions: [],
      message: "未找到匹配企业，请尝试输入企业全称或简称。",
    };
  }

  return {
    input: trimmed,
    company,
    routeKey,
    suggestions: buildSmartNavActionSuggestions(company, routeKey),
    message: "",
  };
}

function getSmartNavContextCompany() {
  if (!state.smartNavContext) return null;
  return getSmartNavCompanyById(state.smartNavContext.companyId);
}

function resolveExistingCompanyCode(company) {
  if (!company) return null;
  if (company.companyCode && getCompanySummary(company.companyCode)) return company.companyCode;
  const matched = state.companies.find((item) => item.name === company.name);
  return matched?.company_code || null;
}

function buildSmartNavSearch(context = state.smartNavContext) {
  if (!context) return "";
  const params = new URLSearchParams();
  if (context.sectionId) params.set("section", context.sectionId);
  if (context.routeKey) params.set("intent", context.routeKey);
  if (context.companyId) params.set("companyId", context.companyId);
  if (context.companyName) params.set("companyName", context.companyName);
  if (context.rawInput) params.set("q", context.rawInput);
  return params.toString() ? `?${params.toString()}` : "";
}

function getAppLocationFromState() {
  if (state.smartNavContext?.routeKey && smartNavRouteMeta[state.smartNavContext.routeKey]) {
    return { pathname: "/", search: buildSmartNavSearch() };
  }
  if (state.topSectionId === "risk-map") return getRiskMapPath();
  return { pathname: "/", search: "" };
}

function syncLocationFromState(replace = false) {
  if (typeof window === "undefined" || !window.history || !window.location) return;
  const targetLocation = getAppLocationFromState();
  const pathname = typeof targetLocation === "string" ? targetLocation : targetLocation.pathname;
  const search = typeof targetLocation === "string" ? "" : targetLocation.search;
  if (window.location.pathname === pathname && window.location.search === search) return;
  const method = replace ? "replaceState" : "pushState";
  window.history[method](
    {
      topSectionId: state.topSectionId,
      riskMapRegionId: state.riskMapRegionId,
      smartNavContext: state.smartNavContext,
    },
    "",
    `${pathname}${search}`,
  );
}

function applySmartSectionState(routeKey, company, options = {}) {
  const meta = smartNavRouteMeta[routeKey];
  if (!meta) return false;
  const companyCode = resolveExistingCompanyCode(company);
  if (!companyCode) return false;

  state.topSectionId = meta.sectionId;
  state.activeSidebarBySection[meta.sectionId] = meta.sidebarId;
  state.previewOpen = false;
  state.previewSectionId = null;
  state.riskMapRegionId = null;

  if (routeKey === "company-profile") {
    state.portraitCompanyId = companyCode;
    state.portraitView = "detail";
    state.portraitLoadingCompanyCode = options.loading ? companyCode : null;
    state.portraitError = null;
  }
  if (routeKey === "insight-tasks") {
    state.taskBoardCompanyCode = companyCode;
    state.taskBoardView = "detail";
  }
  if (routeKey === "due-diligence-report") {
    state.processEngineCompanyCode = companyCode;
    state.reportCenterReportTypeId = "due-diligence";
    state.reportCenterView = "detail";
    state.reportCenterLoadingCompanyCode = options.loading ? companyCode : null;
    state.reportCenterError = null;
    state.dueDiligenceTabId = "report-generate";
    rememberCompany("process-engine", companyCode);
  }
  if (routeKey === "watchlist-detail") {
    state.watchlistFocusCode = companyCode;
    state.watchlistPanelMode = "detail";
  }

  state.smartNavContext = {
    routeKey,
    sectionId: meta.sectionId,
    companyId: company.id,
    companyName: company.name,
    rawInput: options.rawInput ?? state.homeCommandInput,
  };
  return true;
}

async function hydrateSmartSectionState(routeKey, company) {
  const companyCode = resolveExistingCompanyCode(company);
  if (!companyCode) return;

  if (routeKey === "company-profile") {
    try {
      await ensureCompanyDetail(companyCode);
      const summary = mapCompanyToPortraitListItem(getRealCompanySummary(companyCode));
      if (summary) {
        state.riskHouseFocusId = getPortraitDefaultFocusId(buildPortraitCompanyDetail(summary, getCompanyDetail(companyCode)));
      }
    } catch (error) {
      state.portraitError = error.message || "企业画像详情加载失败";
    } finally {
      state.portraitLoadingCompanyCode = null;
    }
    return;
  }

  if (routeKey === "due-diligence-report") {
    try {
      await ensureCompanyDetail(companyCode);
      const reportDetail = getCompanyDetail(companyCode);
      syncSelectedVersion(reportDetail);
      syncKnowledgeSelection(reportDetail);
      state.reportCenterError = null;
    } catch (error) {
      state.reportCenterError = error.message || "加载企业报告失败";
      state.reportCenterView = "company-list";
    } finally {
      state.reportCenterLoadingCompanyCode = null;
    }
    return;
  }

  if (["insight-tasks", "watchlist-detail"].includes(routeKey)) {
    await ensureCompanyDetail(companyCode).catch(() => {});
  }
}

function applyRouteFromLocation(pathname = window.location.pathname, search = window.location.search) {
  const currentPath = String(pathname || "/");
  const params = new URLSearchParams(search || "");
  const routeKey = params.get("intent");
  const sectionId = params.get("section");
  const company = getSmartNavCompanyById(params.get("companyId")) || resolveSmartNavCompany(params.get("companyName"));

  if (currentPath === "/" && routeKey && smartNavRouteMeta[routeKey] && company) {
    if (applySmartSectionState(routeKey, company, { rawInput: params.get("q") || company.name })) {
      state.homeCommandInput = params.get("q") || company.name || "";
      state.homeCommandMessage = "";
      return;
    }
  }

  if (currentPath === "/" && sectionId && !routeKey) {
    state.topSectionId = sectionId;
    state.smartNavContext = null;
    state.riskMapRegionId = null;
    state.previewOpen = false;
    state.previewSectionId = null;
    return;
  }

  if (currentPath === RISK_MAP_BASE_PATH || currentPath.startsWith(`${RISK_MAP_BASE_PATH}/`)) {
    state.topSectionId = "risk-map";
    state.riskMapRegionId = normalizeRiskRegionId(currentPath.slice(RISK_MAP_BASE_PATH.length + 1));
    state.smartNavContext = null;
    state.previewOpen = false;
    state.previewSectionId = null;
    return;
  }

  state.smartNavContext = null;
  state.riskMapRegionId = null;
  if (currentPath === "/") {
    state.topSectionId = "home";
  }
}

function getMetricMap(detail) {
  return Object.fromEntries((detail.latest_metrics || []).map((item) => [item.metric_code, item.value]));
}

function getAnnualSeries(detail, metricCode) {
  const series = (detail.recent_metric_history || [])
    .filter((item) => item.metric_code === metricCode && (String(item.period_code || "").endsWith("FY") || /^\d{4}1231$/.test(String(item.period_code || ""))))
    .map((item) => ({ period: item.period_code, value: toNumber(item.value) ?? 0 }))
    .sort((a, b) => String(a.period).localeCompare(String(b.period)));
  return series;
}

function computeChangeRatio(current, previous) {
  const currentNum = toNumber(current);
  const previousNum = toNumber(previous);
  if (currentNum === null || previousNum === null || previousNum === 0) return null;
  return (currentNum - previousNum) / Math.abs(previousNum);
}

function getTrendLabel(changeRatio) {
  const value = toNumber(changeRatio);
  if (value === null) return "待观察";
  if (Math.abs(value) < 0.03) return "基本稳定";
  return value > 0 ? "上升" : "下降";
}

function getToneLabel(tone) {
  if (tone === "stable") return "稳健";
  if (tone === "watch") return "关注";
  return "承压";
}

function getToneByStatus(status) {
  const value = String(status || "").toLowerCase();
  if (!value) return "watch";
  if (value === "pass") return "stable";
  if (value === "warn") return "watch";
  return "pressure";
}

function renderToneBadge(label, tone) {
  return `<span class="analysis-badge risk-badge analysis-badge-${tone}">${escapeHtml(label)}</span>`;
}

function dedupeBy(items, getKey) {
  const seen = new Set();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getReceivableSnapshot(detail, recordType) {
  return (detail.receivables || []).find((item) => item.record_type === recordType) || null;
}

function buildFinancialSummary(detail) {
  const metrics = getMetricMap(detail);
  const revenueSeries = getAnnualSeries(detail, "revenue");
  const profitSeries = getAnnualSeries(detail, "net_profit");
  const revenueChange = computeChangeRatio(revenueSeries.at(-1)?.value, revenueSeries.at(-2)?.value);
  const profitChange = computeChangeRatio(profitSeries.at(-1)?.value, profitSeries.at(-2)?.value);
  const leverage = toNumber(metrics.asset_liability_ratio) ?? ((toNumber(metrics.total_assets) && toNumber(metrics.total_liabilities))
    ? toNumber(metrics.total_liabilities) / toNumber(metrics.total_assets)
    : null);
  const grossMargin = toNumber(metrics.gross_margin_pct) ?? ((toNumber(metrics.revenue) && toNumber(metrics.gross_profit))
    ? toNumber(metrics.gross_profit) / toNumber(metrics.revenue)
    : null);
  const cashFlowMargin = toNumber(metrics.operating_cash_flow_margin_pct) ?? ((toNumber(metrics.revenue) && toNumber(metrics.operating_cash_flow))
    ? toNumber(metrics.operating_cash_flow) / toNumber(metrics.revenue)
    : null);
  const receivable = getReceivableSnapshot(detail, "accounts_receivable");
  const bankSummary = detail.bank_summaries?.[0] || null;

  const dimensionCards = [
    {
      title: "偿债及杠杆",
      tone: leverage !== null && leverage <= 0.55 ? "stable" : leverage !== null && leverage <= 0.68 ? "watch" : "pressure",
      metrics: [
        { label: "资产负债率", value: formatPercent(leverage) },
        { label: "总负债", value: formatCurrency(metrics.total_liabilities) },
        { label: "经营现金流", value: formatCurrency(metrics.operating_cash_flow) },
      ],
      summary: leverage !== null && leverage <= 0.55 ? "整体杠杆仍在可接受区间，可重点跟踪债务结构与短债安排。" : "负债压力偏高，建议结合现金流与授信期限审慎判断承接能力。",
    },
    {
      title: "盈利能力",
      tone: grossMargin !== null && grossMargin >= 0.28 && toNumber(metrics.net_profit) > 0 ? "stable" : grossMargin !== null && grossMargin >= 0.2 ? "watch" : "pressure",
      metrics: [
        { label: "营业收入", value: formatCurrency(metrics.revenue) },
        { label: "净利润", value: formatCurrency(metrics.net_profit) },
        { label: "毛利率", value: formatPercent(grossMargin) },
      ],
      summary: toNumber(metrics.net_profit) > 0 ? "利润仍为正，但要继续确认利润增长是否真实转化为可回收现金。" : "利润表现偏弱，应优先关注毛利、费用和一次性收益的影响。",
    },
    {
      title: "营运能力",
      tone: receivable?.average_days && receivable.average_days <= 75 ? "stable" : receivable?.average_days && receivable.average_days <= 90 ? "watch" : "pressure",
      metrics: [
        { label: "应收账款", value: formatCurrency(metrics.accounts_receivable) },
        { label: "应收周转天数", value: receivable?.average_days ? `${formatNumber(receivable.average_days)} 天` : "—" },
        { label: "前五客户集中度", value: receivable?.top5_ratio_pct ? formatPercent(receivable.top5_ratio_pct) : "—" },
      ],
      summary: "回款链路是营运判断核心，建议联动合同、订单、发票和银行回款节奏一起看。",
    },
    {
      title: "规模",
      tone: toNumber(metrics.total_assets) >= 12000000 ? "stable" : "watch",
      metrics: [
        { label: "总资产", value: formatCurrency(metrics.total_assets) },
        { label: "固定资产", value: formatCurrency(metrics.fixed_assets) },
        { label: "资本开支", value: formatCurrency(metrics.capital_expenditure) },
      ],
      summary: "资产规模与产线投入已经形成一定底盘，后续重点看扩产是否继续沉淀为收入与现金。",
    },
    {
      title: "流动性",
      tone: cashFlowMargin !== null && cashFlowMargin >= 0.04 ? "stable" : cashFlowMargin !== null && cashFlowMargin >= 0 ? "watch" : "pressure",
      metrics: [
        { label: "经营现金流率", value: formatPercent(cashFlowMargin) },
        { label: "日均余额", value: formatCurrency(bankSummary?.average_daily_balance_cny) },
        { label: "月度净流量", value: formatCurrency(bankSummary?.net_flow_cny) },
      ],
      summary: cashFlowMargin !== null && cashFlowMargin >= 0 ? "现金流尚能覆盖经营需要，但仍需核验利润与回款转化质量。" : "流动性承压，应优先解释回款、备货和付款节奏的错配原因。",
    },
    {
      title: "成长性",
      tone: (revenueChange ?? -1) >= 0.08 && (profitChange ?? -1) >= 0.05 ? "stable" : (revenueChange ?? -1) >= 0 ? "watch" : "pressure",
      metrics: [
        { label: "收入同比", value: revenueChange === null ? "—" : formatPercent(revenueChange) },
        { label: "利润同比", value: profitChange === null ? "—" : formatPercent(profitChange) },
        { label: "收入趋势", value: getTrendLabel(revenueChange) },
      ],
      summary: revenueChange !== null && revenueChange > 0 ? "收入呈增长态势，但仍要确认增长质量与利润兑现程度是否同步。" : "增长动能偏弱，建议结合订单储备与客户结构继续判断可持续性。",
    },
  ];

  const highlightedChecks = dedupeBy(detail.reconciliation_checks || [], (item) => item.check_name).slice(0, 4);
  const taxCheck = detail.tax_invoice_checks?.[0] || null;

  const annualRevenue = revenueSeries.at(-1)?.value;
  const annualProfit = profitSeries.at(-1)?.value;
  const annualProfitPrev = profitSeries.at(-2)?.value;
  const annualRevenuePrev = revenueSeries.at(-2)?.value;

  return {
    dimensionCards,
    headline: {
      summary:
        highlightedChecks.some((item) => item.status === "fail")
          ? "当前财务页以“勾稽先看风险、指标再看支撑”为主线，重点提示利润与现金、资本开支与固定资产之间的解释压力。"
          : "当前财务页以“结论先行、指标支撑、趋势复核”为主线，整体财务表现可支撑基础授信判断。",
      chips: [
        { label: "最新报表", value: formatPeriodLabel(detail.latest_financial_period?.period_code) },
        { label: "收入同比", value: annualRevenue && annualRevenuePrev ? formatPercent(computeChangeRatio(annualRevenue, annualRevenuePrev)) : "—" },
        { label: "利润同比", value: annualProfit && annualProfitPrev ? formatPercent(computeChangeRatio(annualProfit, annualProfitPrev)) : "—" },
        { label: "勾稽异常", value: `${highlightedChecks.filter((item) => item.status !== "pass").length} 项` },
      ],
    },
    statementCards: [
      {
        title: "资产负债结构",
        tone: dimensionCards[0].tone,
        items: [
          `总资产：${formatCurrency(metrics.total_assets)}`,
          `总负债：${formatCurrency(metrics.total_liabilities)}`,
          `资产负债率：${formatPercent(leverage)}`,
          `固定资产：${formatCurrency(metrics.fixed_assets)}`,
        ],
      },
      {
        title: "损益质量",
        tone: dimensionCards[1].tone,
        items: [
          `营业收入：${formatCurrency(metrics.revenue)}`,
          `毛利：${formatCurrency(metrics.gross_profit)}`,
          `净利润：${formatCurrency(metrics.net_profit)}`,
          `毛利率：${formatPercent(grossMargin)}`,
        ],
      },
      {
        title: "现金回款与流水",
        tone: dimensionCards[4].tone,
        items: [
          `经营现金流：${formatCurrency(metrics.operating_cash_flow)}`,
          `月度流入：${formatCurrency(bankSummary?.inflow_total_cny)}`,
          `月度流出：${formatCurrency(bankSummary?.outflow_total_cny)}`,
          `日均余额：${formatCurrency(bankSummary?.average_daily_balance_cny)}`,
        ],
      },
      {
        title: "税票与一致性核验",
        tone: getToneByStatus(taxCheck?.status),
        items: [
          `收入申报：${formatCurrency(taxCheck?.declared_revenue_cny)}`,
          `开票金额：${formatCurrency(taxCheck?.invoiced_amount_cny)}`,
          `银行回款：${formatCurrency(taxCheck?.bank_receipts_cny)}`,
          `偏差比例：${formatPercent(taxCheck?.gap_ratio)}`,
        ],
      },
    ],
    trendCards: [
      {
        title: "收入与利润趋势",
        tone: dimensionCards[5].tone,
        series: [
          { label: "收入", data: revenueSeries, formatter: formatCurrency },
          { label: "净利润", data: profitSeries, formatter: formatCurrency },
        ],
        bullets: [
          `营业收入${annualRevenue && annualRevenuePrev ? `${formatPeriodLabel(revenueSeries.at(-1)?.period)}较上年${formatPercent(computeChangeRatio(annualRevenue, annualRevenuePrev))}` : "暂无完整同比口径"}`,
          `净利润${annualProfit && annualProfitPrev ? `${formatPeriodLabel(profitSeries.at(-1)?.period)}较上年${formatPercent(computeChangeRatio(annualProfit, annualProfitPrev))}` : "暂无完整同比口径"}`,
          "如收入增速明显快于利润兑现，需回看毛利率、费用率和回款节奏。",
        ],
      },
      {
        title: "营运资本与回款压力",
        tone: dimensionCards[2].tone,
        bullets: [
          `应收账款：${formatCurrency(metrics.accounts_receivable)}，其中逾期 90 天以上 ${formatCurrency(receivable?.overdue_over_90d_cny)}`,
          `前五客户集中度：${receivable?.top5_ratio_pct ? formatPercent(receivable.top5_ratio_pct) : "—"}，应重点观察单一客户延迟回款影响。`,
          `银行月度大额交易 ${bankSummary?.large_transaction_count ?? "—"} 笔，可结合合同与发票核验对应真实性。`,
        ],
      },
      {
        title: "勾稽与核验重点",
        tone: highlightedChecks.some((item) => item.status === "fail") ? "pressure" : highlightedChecks.some((item) => item.status === "warn") ? "watch" : "stable",
        checks: highlightedChecks,
      },
      {
        title: "阶段性结论",
        tone: highlightedChecks.some((item) => item.status === "fail") ? "pressure" : "watch",
        bullets: [
          dimensionCards.filter((item) => item.tone === "pressure").length
            ? `当前承压维度：${dimensionCards.filter((item) => item.tone === "pressure").map((item) => item.title).join("、")}`
            : "当前未出现明显失衡维度。",
          `重点补证方向：${taxCheck?.status === "warn" ? "税票与银行回款一致性、" : ""}资本开支与固定资产滚动、利润到现金的转化质量。`,
          "若进入授信审批，建议把回款监测、客户集中度和月度资金流水作为持续跟踪项。",
        ],
      },
    ],
  };
}

function renderFieldPanel(title, description, items, extraClass = "") {
  return `
    <article class="content-card ${extraClass}">
      <h3>${title}</h3>
      <p>${description}</p>
      ${renderFieldGrid(items)}
    </article>
  `;
}

function renderMiniTrend(series, formatter) {
  const values = series.map((item) => Math.abs(toNumber(item.value) ?? 0));
  const maxValue = Math.max(...values, 1);
  return `
    <div class="mini-trend">
      ${series
        .map((item) => {
          const width = `${Math.max((Math.abs(toNumber(item.value) ?? 0) / maxValue) * 100, 8)}%`;
          return `
            <div class="mini-trend-row">
              <span>${formatPeriodLabel(item.period)}</span>
              <div class="mini-trend-track"><i style="width:${width}"></i></div>
              <strong>${formatter(item.value)}</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderOwnershipMap(detail, company) {
  const peopleNodes = detail.people.slice(0, 6).map((item) => {
    const badges = [
      item.is_actual_controller ? renderToneBadge("实控", "pressure") : "",
      item.is_guarantor ? renderToneBadge("担保", "watch") : "",
      item.equity_ratio ? renderToneBadge(`持股 ${formatPercent(item.equity_ratio)}`, "stable") : "",
    ]
      .filter(Boolean)
      .join("");
    return `
      <div class="graph-node graph-node-person">
        <strong>${escapeHtml(item.full_name)}</strong>
        <span>${escapeHtml(localizeText(item.title || item.role_type || "关键人员"))}</span>
        <div class="graph-chip-row">${badges || renderToneBadge("治理角色", "stable")}</div>
      </div>
    `;
  });

  const relatedTransactions = detail.related_transactions || [];
  const relatedNodes = detail.related_companies.slice(0, 5).map((item) => {
    const tx = relatedTransactions.find((txItem) => txItem.related_party_name === item.related_company_name);
    return `
      <div class="graph-node graph-node-related">
        <strong>${escapeHtml(item.related_company_name)}</strong>
        <span>${escapeHtml(localizeText(item.relation_type || "关联方"))}</span>
        <p>${escapeHtml(compactText(item.note || tx?.pricing_comment || "关注交易定价、结算节奏与资金占用情况。"))}</p>
        <div class="graph-chip-row">
          ${renderToneBadge(tx?.transaction_type ? localizeText(tx.transaction_type) : "关系链路", tx?.risk_level === "high" ? "pressure" : "watch")}
          ${tx?.transaction_amount_cny ? renderToneBadge(formatCurrency(tx.transaction_amount_cny), "stable") : ""}
        </div>
      </div>
    `;
  });

  const changeNodes = detail.shareholding_changes.slice(0, 4).map((item) => `
    <div class="graph-node graph-node-change">
      <strong>${escapeHtml(item.change_date || "—")}</strong>
      <span>${escapeHtml(localizeText(item.change_type || "股权调整"))}</span>
      <p>${escapeHtml(compactText(item.risk_comment || item.declared_reason || "待补充说明"))}</p>
    </div>
  `);

  const controller = detail.people.find((item) => item.is_actual_controller);
  const guarantors = detail.people.filter((item) => item.is_guarantor);
  const controllerSummary = controller
    ? `${controller.full_name}｜${localizeText(controller.title || controller.role_type || "实控人")}`
    : "待补充实控人信息";

  return `
    <section class="ownership-map-panel" style="margin-top: 20px;">
      <div class="inline-head">
        <div>
          <h3>企业关系图谱</h3>
          <p>以主体公司为中心，串联实控、核心人员、关联交易与股权变化，突出可视化识别能力。</p>
        </div>
        <div class="graph-chip-row">
          ${renderToneBadge(`实控链 ${controller ? "已识别" : "待补充"}`, controller ? "pressure" : "watch")}
          ${renderToneBadge(`关联方 ${detail.related_companies.length} 家`, "stable")}
          ${renderToneBadge(`股权变更 ${detail.shareholding_changes.length} 条`, "watch")}
        </div>
      </div>
      <div class="ownership-map">
        <section class="graph-branch graph-branch-left">
          <div class="graph-branch-title">
            <h4>核心人物与控制链</h4>
            <p>重点看法人、实控人、财务负责人及担保关系。</p>
          </div>
          <div class="graph-node-stack">${peopleNodes.join("")}</div>
        </section>
        <div class="graph-core">
          <div class="graph-core-card">
            <span class="graph-core-kicker">主体公司</span>
            <h3>${escapeHtml(company.name)}</h3>
            <p>${escapeHtml(compactText(company.overview || "暂无企业摘要"))}</p>
            <div class="graph-core-metrics">
              <div><strong>${escapeHtml(controllerSummary)}</strong><span>控制核心</span></div>
              <div><strong>${guarantors.length} 名</strong><span>担保关联人</span></div>
              <div><strong>${detail.related_transactions.length} 条</strong><span>关联交易摘要</span></div>
            </div>
          </div>
        </div>
        <section class="graph-branch graph-branch-right">
          <div class="graph-cluster graph-cluster-related">
            <div class="graph-branch-title">
              <h4>关联企业与交易</h4>
              <p>观察交易类型、结算金额与关联路径。</p>
            </div>
            <div class="graph-node-stack">${relatedNodes.length ? relatedNodes.join("") : '<div class="graph-node graph-node-related"><strong>暂无数据</strong><p>可补充关联企业与交易摘要。</p></div>'}</div>
          </div>
          <div class="graph-cluster graph-cluster-change">
            <div class="graph-branch-title">
              <h4>股权变更与控制波动</h4>
              <p>突出持股变化、技术激励和资本压力信号。</p>
            </div>
            <div class="graph-node-stack">${changeNodes.length ? changeNodes.join("") : '<div class="graph-node graph-node-change"><strong>暂无变更</strong><p>当前未发现股权变更记录。</p></div>'}</div>
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderFinancialDashboard(detail) {
  const summary = buildFinancialSummary(detail);
  return `
    <section class="finance-dashboard" style="margin-top: 20px;">
      <article class="finance-headline-card">
        <div class="inline-head">
          <div>
            <h3>财务判断摘要</h3>
            <p>${summary.headline.summary}</p>
          </div>
          <div class="graph-chip-row">
            ${summary.headline.chips.map((item) => renderToneBadge(`${item.label}：${item.value}`, "stable")).join("")}
          </div>
        </div>
      </article>

      <section class="finance-section">
        <div class="finance-section-head">
          <div>
            <h3>六维财务体检</h3>
            <p>风控先看结论，再展开关键指标与解释方向。</p>
          </div>
        </div>
        <div class="finance-dimension-grid">
          ${summary.dimensionCards
            .map(
              (card) => `
                <article class="finance-dimension-card finance-dimension-card-${card.tone}">
                  <div class="dimension-head">
                    <h4>${card.title}</h4>
                    ${renderToneBadge(getToneLabel(card.tone), card.tone)}
                  </div>
                  <div class="dimension-metrics">
                    ${card.metrics
                      .map(
                        (item) => `
                          <div class="dimension-metric-row">
                            <span>${item.label}</span>
                            <strong>${item.value}</strong>
                          </div>
                        `,
                      )
                      .join("")}
                  </div>
                  <p>${card.summary}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="finance-section">
        <div class="finance-section-head">
          <div>
            <h3>当年财务数据分析</h3>
            <p>聚焦本期资产负债、损益质量、流水承接与税票一致性。</p>
          </div>
        </div>
        <div class="two-col-grid">
          ${summary.statementCards
            .map(
              (card) => `
                <article class="finance-panel-card finance-panel-card-${card.tone}">
                  <div class="dimension-head">
                    <h4>${card.title}</h4>
                    ${renderToneBadge(getToneLabel(card.tone), card.tone)}
                  </div>
                  <div class="finance-bullet-list">
                    ${card.items.map((item) => `<div class="finance-bullet-item">${escapeHtml(localizeText(item))}</div>`).join("")}
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="finance-section">
        <div class="finance-section-head">
          <div>
            <h3>趋势与勾稽分析</h3>
            <p>结合近年趋势、营运资本变化和勾稽检查，解释风险来源。</p>
          </div>
        </div>
        <div class="two-col-grid">
          ${summary.trendCards
            .map((card) => {
              const trendHtml = card.series
                ? card.series
                    .map(
                      (item) => `
                        <div class="trend-group">
                          <div class="trend-group-label">${item.label}</div>
                          ${renderMiniTrend(item.data, item.formatter)}
                        </div>
                      `,
                    )
                    .join("")
                : "";
              const checksHtml = card.checks
                ? card.checks
                    .map(
                      (item) => `
                        <div class="check-item">
                          <div class="check-item-head">
                            <strong>${escapeHtml(localizeText(item.check_name || "勾稽检查"))}</strong>
                            ${renderToneBadge(compactText(item.status), getToneByStatus(item.status))}
                          </div>
                          <p>${escapeHtml(compactText(item.interpretation || "待补充解释"))}</p>
                        </div>
                      `,
                    )
                    .join("")
                : "";
              const bulletsHtml = card.bullets
                ? `<div class="finance-bullet-list">${card.bullets.map((item) => `<div class="finance-bullet-item">${escapeHtml(localizeText(item))}</div>`).join("")}</div>`
                : "";
              return `
                <article class="finance-panel-card finance-panel-card-${card.tone}">
                  <div class="dimension-head">
                    <h4>${card.title}</h4>
                    ${renderToneBadge(getToneLabel(card.tone), card.tone)}
                  </div>
                  ${trendHtml}
                  ${checksHtml}
                  ${bulletsHtml}
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function formatDataMode(value) {
  if (value === "skill_pipeline" || value === "skill_poc") return "双 Skill 报告";
  return value === "public_pack" ? "原始资料清单" : "完整尽调案例";
}

function getRiskDataInventory(activeId, detail = {}) {
  const inventoryMap = {
    "basic-info": ["企业工商基础信息", "统一社会信用代码", "成立日期及注册资本", "注册地与所属行业", "风险标签与案例编号"],
    "operation-info": ["经营状态", "企业规模", "授信申请产品", "第一还款来源", "合同/订单/发票/银行流水摘要"],
    "shareholder-related": ["核心人员信息", "股东及实控关系", "关联企业清单", "股权变更记录", "关联交易摘要"],
    "financial-status": ["近年财务指标", "资产负债表关键科目", "利润与现金流指标", "银行流水摘要", "财务勾稽核验结果"],
    "external-industry": ["行业分类", "政策环境", "生命周期判断", "公开风险事件", "同业经营及财务对比"],
    "guarantor-info": ["担保人身份材料", "担保关系说明", "保证能力证明", "征信或负债摘要", "担保承诺文件"],
    "collateral-info": ["抵质押物权属材料", "评估报告", "质押/抵押清单", "押品状态说明", "可处置性补充材料"],
    "other-risk": ["人工补件说明", "现场尽调备注", "特殊事项说明", "核验发现", "报告章节引用信息"],
  };
  const base = inventoryMap[activeId] || [];
  const uploaded = detail.due_diligence_materials?.length ? [`已上传资料 ${detail.due_diligence_materials.length} 份`] : ["当前未读取到人工上传材料"];
  return [...base, uploaded];
}

function getRiskFieldKey(item) {
  return `${getActiveSidebarItem()?.id || "risk"}:${item.label}`;
}

function renderCompletionUploadSlot(fieldKey, compact = false) {
  const files = state.riskCompletionUploads[fieldKey] || [];
  return `
    <div class="${compact ? "field-upload-slot field-upload-slot-compact" : "field-upload-slot"}">
      <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" data-risk-completion-upload="${escapeHtml(fieldKey)}" />
      <span>${files.length ? files.map(escapeHtml).join("、") : "尚未上传佐证材料"}</span>
    </div>
  `;
}

function getAllReportDataSourceIds() {
  return reportDataSourceGroups.flatMap((group) => group.items.map((item) => item.id));
}

function getReportDataSourceGroups(detail) {
  return reportDataSourceGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const value = detail?.[item.id];
      const count = Array.isArray(value) ? value.length : value && typeof value === "object" ? Object.keys(value).length : value ? 1 : 0;
      return {
        ...item,
        countLabel: Array.isArray(value) ? `${count} 条` : count ? "已接入" : "待补充",
      };
    }),
  }));
}

function getSelectedKnowledgeFiles() {
  const fileMap = new Map((state.knowledgeBase?.files || []).map((item) => [item.id, item]));
  return state.pendingKnowledgeSelection.map((id) => fileMap.get(id)).filter(Boolean);
}

function renderDataCompletionControl() {
  if (state.topSectionId !== "risk-view" || !state.riskViewCompanyCode) return "";
  const modeLabel = state.riskCompletionMode === "manual" ? "手动修改中" : state.riskCompletionMode === "ai" ? "AI识别中" : "资料完善";
  return `
    <div class="completion-control">
      <div class="completion-action-row">
        <button class="secondary-action completion-trigger" type="button" data-action="toggle-completion-menu">${modeLabel}</button>
        ${state.riskCompletionMode ? '<button class="ghost-action completion-done" type="button" data-action="finish-completion-mode">完成修改</button>' : ""}
        ${state.riskCompletionMode ? '<button class="ghost-action completion-cancel" type="button" data-action="cancel-completion-mode">取消修改</button>' : ""}
      </div>
      <div class="completion-menu${state.riskCompletionMenuOpen ? " is-open" : ""}">
        <button type="button" data-action="set-completion-mode" data-mode="manual">手动修改</button>
        <button type="button" data-action="set-completion-mode" data-mode="ai">AI识别</button>
      </div>
    </div>
  `;
}

function getDirtyManualFieldsForSection(sectionId = getActiveSidebarItem()?.id) {
  if (!sectionId) return [];
  return Object.keys(state.riskManualDirtyFields).filter((key) => key.startsWith(`${sectionId}:`));
}

function promptManualEvidenceForSection(sectionId = getActiveSidebarItem()?.id, preferredFieldKey = null) {
  const dirtyFields = getDirtyManualFieldsForSection(sectionId);
  if (!dirtyFields.length) return false;
  state.completionModalOpen = true;
  state.completionModalType = "manual";
  state.completionModalField = preferredFieldKey && dirtyFields.includes(preferredFieldKey) ? preferredFieldKey : dirtyFields[0];
  renderCompletionModal();
  return true;
}

function createCompletionSnapshot() {
  return {
    riskCompletionUploads: { ...state.riskCompletionUploads },
    riskManualEdits: { ...state.riskManualEdits },
    riskManualDirtyFields: { ...state.riskManualDirtyFields },
    activeEditableField: state.activeEditableField,
  };
}

function restoreCompletionSnapshot() {
  const snapshot = state.riskCompletionSnapshot;
  state.riskCompletionUploads = snapshot ? { ...snapshot.riskCompletionUploads } : {};
  state.riskManualEdits = snapshot ? { ...snapshot.riskManualEdits } : {};
  state.riskManualDirtyFields = snapshot ? { ...snapshot.riskManualDirtyFields } : {};
  state.activeEditableField = snapshot?.activeEditableField || null;
}

function clearCompletionSession() {
  state.riskCompletionMode = null;
  state.riskCompletionMenuOpen = false;
  state.completionModalOpen = false;
  state.completionModalType = null;
  state.completionModalField = null;
  state.activeEditableField = null;
  state.riskCompletionSnapshot = null;
}

function getSectionHasCompany(sectionId) {
  return sectionId === "risk-view" ? Boolean(state.riskViewCompanyCode) : Boolean(state.processEngineCompanyCode);
}

function getCurrentTopSection() {
  return topSections.find((item) => item.id === state.topSectionId) || topSections[0];
}

function getPrimaryNavSections() {
  return topSections.filter((item) => item.id !== "risk-map");
}

function shouldHideGlobalSidebar() {
  return false;
}

function getSidebarItems() {
  return sidebarItems[state.topSectionId] || [];
}

function getActiveSidebarItem() {
  const currentId = state.activeSidebarBySection[state.topSectionId];
  return getSidebarItems().find((item) => item.id === currentId) || getSidebarItems()[0];
}

function getCurrentCompanyCode() {
  if (state.topSectionId === "risk-view") return state.riskViewCompanyCode;
  if (state.topSectionId === "process-engine") return state.processEngineCompanyCode;
  if (state.topSectionId === "enterprise-library") return state.portraitCompanyId;
  return null;
}

function getCurrentRecentCodes() {
  if (state.topSectionId === "risk-view") return state.riskRecentCodes;
  if (state.topSectionId === "process-engine") return state.processRecentCodes;
  return [];
}

function getCompanySummary(companyCode) {
  return state.companies.find((item) => item.company_code === companyCode)
    || portraitWorkbenchCompanies.find((item) => item.id === companyCode || item.companyCode === companyCode)
    || null;
}

function getRealCompanySummary(companyCode) {
  return getPortraitCompaniesSource().find((item) => item.company_code === companyCode || item.id === companyCode) || null;
}

function getCompanyDetail(companyCode) {
  return companyCode ? state.companyDetailCache[companyCode] || null : null;
}

async function ensureCompanyDetail(companyCode) {
  if (!companyCode) return null;
  if (state.companyDetailCache[companyCode]) return state.companyDetailCache[companyCode];
  const detail = await fetchJson(`/api/company/${encodeURIComponent(companyCode)}`);
  state.companyDetailCache[companyCode] = detail;
  return detail;
}

async function refreshCompanyDetail(companyCode) {
  if (!companyCode) return null;
  const detail = await fetchJson(`/api/company/${encodeURIComponent(companyCode)}`);
  state.companyDetailCache[companyCode] = detail;
  syncSelectedVersion(detail);
  syncKnowledgeSelection(detail);
  return detail;
}

function syncSelectedVersion(detail) {
  if (!detail?.report_versions?.length) {
    state.reportVersionId = null;
    return;
  }
  const matched = detail.report_versions.find((item) => item.id === state.reportVersionId);
  state.reportVersionId = matched ? matched.id : detail.report_versions[detail.report_versions.length - 1].id;
}

function getCurrentVersion(detail = getCompanyDetail(state.processEngineCompanyCode)) {
  if (!detail?.report_versions?.length) return null;
  return detail.report_versions.find((item) => item.id === state.reportVersionId) || detail.report_versions[detail.report_versions.length - 1];
}

function syncKnowledgeSelection(detail) {
  const version = getCurrentVersion(detail);
  if (!version) {
    state.pendingKnowledgeVersionId = null;
    state.pendingKnowledgeSelection = [];
    state.pendingDataSourceSelection = getAllReportDataSourceIds();
    state.reportEditorText = "";
    state.reviewEditorText = "";
    return;
  }
  if (state.pendingKnowledgeVersionId !== version.id) {
    state.pendingKnowledgeVersionId = version.id;
    state.pendingKnowledgeSelection = version.knowledge_files.map((item) => item.id);
    state.pendingDataSourceSelection = version.selected_data_source_ids?.length ? [...version.selected_data_source_ids] : getAllReportDataSourceIds();
    state.reportEditorText = version.full_text || "";
    state.reviewEditorText = version.review_edit_text || version.full_text || "";
  }
}

function rememberCompany(sectionId, companyCode) {
  const key = sectionId === "risk-view" ? "riskRecentCodes" : "processRecentCodes";
  state[key] = [companyCode, ...state[key].filter((item) => item !== companyCode)].slice(0, 6);
}

async function selectCompany(sectionId, companyCode) {
  if (sectionId === "risk-view") state.riskViewCompanyCode = companyCode;
  if (sectionId === "process-engine") state.processEngineCompanyCode = companyCode;
  rememberCompany(sectionId, companyCode);
  await ensureCompanyDetail(companyCode);
  if (sectionId === "process-engine") {
    const detail = getCompanyDetail(companyCode);
    syncSelectedVersion(detail);
    syncKnowledgeSelection(detail);
  }
}

async function searchCompany(sectionId) {
  const keyword = sectionId === "risk-view" ? state.riskSearchKeyword.trim() : state.processSearchKeyword.trim();
  if (!keyword) return;
  const normalized = keyword.toLowerCase();
  const matched = state.companies.find((item) => {
    const companyName = String(item.name || "").toLowerCase();
    const companyCode = String(item.company_code || "").toLowerCase();
    return companyName.includes(normalized) || companyCode.includes(normalized);
  });
  if (!matched) {
    window.alert("未找到匹配企业，请尝试点击下方示例企业。");
    return;
  }
  await selectCompany(sectionId, matched.company_code);
  render();
}

function renderTopbar() {
  topbarHeadingEl.innerHTML = `
    <div class="topbar-brand-heading">
      <img src="./assets/agent-topbar-logo.png" alt="尽职调查 Agent" class="topbar-brand-image" />
    </div>
  `;
  topbarNavEl.innerHTML = "";
}

function renderSidebar() {
  if (shouldHideGlobalSidebar()) {
    sidebarEl?.classList.add("is-hidden");
    workspaceEl?.classList.add("is-fullwidth");
    appFrameEl?.classList.add("app-frame-immersive");
    if (sidebarContextEl) sidebarContextEl.innerHTML = "";
    sidebarNavEl.innerHTML = "";
    if (sidebarNoteEl) sidebarNoteEl.innerHTML = "";
    if (sidebarFooterEl) sidebarFooterEl.innerHTML = "";
    return;
  }

  sidebarEl?.classList.remove("is-hidden");
  workspaceEl?.classList.remove("is-fullwidth");
  appFrameEl?.classList.remove("app-frame-immersive");
  if (sidebarContextEl) {
    sidebarContextEl.style.display = "none";
    sidebarContextEl.innerHTML = "";
  }
  if (sidebarNoteEl) {
    sidebarNoteEl.style.display = "none";
    sidebarNoteEl.innerHTML = "";
  }

  sidebarNavEl.innerHTML = getPrimaryNavSections()
    .map(
      (item) => `
        <div class="sidebar-nav-group${item.id === state.topSectionId ? " is-active" : ""}">
          <button
            class="sidebar-nav-item${item.id === state.topSectionId ? " is-active" : ""}"
            type="button"
            data-action="switch-top-section"
            data-top-section="${item.id}"
          >
            ${renderShellIcon(item.id)}
            <span class="sidebar-nav-item__label">${item.title}</span>
          </button>
          ${item.id === "knowledge-center" && state.topSectionId === "knowledge-center"
            ? `
              <div class="sidebar-subnav" aria-label="知识中心分类">
                ${getSidebarItems()
                  .map((subItem) => `
                    <button
                      class="sidebar-subnav-item${subItem.id === getActiveSidebarItem().id ? " is-active" : ""}"
                      type="button"
                      data-action="switch-sidebar-item"
                      data-sidebar-id="${subItem.id}"
                    >${subItem.title}</button>
                  `)
                  .join("")}
              </div>
            `
            : ""}
        </div>
      `,
    )
    .join("");

  if (sidebarFooterEl) {
    sidebarFooterEl.innerHTML = `
      <div class="sidebar-pro-card glass-card">
        <div class="sidebar-pro-card__head">
          ${renderSidebarUtilityIcon("diamond")}
          <div>
            <strong>尽职调查 Agent</strong>
            <span>智能洞察，高效先行</span>
          </div>
        </div>
      </div>
      <div class="sidebar-utility-row" aria-label="侧边栏工具按钮">
        <button class="sidebar-utility-button" type="button" aria-label="工作台">
          ${renderSidebarUtilityIcon("workspace")}
        </button>
        <button class="sidebar-utility-button" type="button" aria-label="设置">
          ${renderSidebarUtilityIcon("settings")}
        </button>
        <button class="sidebar-utility-button" type="button" aria-label="退出">
          ${renderSidebarUtilityIcon("logout")}
        </button>
      </div>
    `;
  }
}

function renderSearchToolbar(sectionId, title, subtitle) {
  const companyCode = sectionId === "risk-view" ? state.riskViewCompanyCode : state.processEngineCompanyCode;
  const company = getCompanySummary(companyCode);
  const recentCodes = sectionId === "risk-view" ? state.riskRecentCodes : state.processRecentCodes;
  const searchValue = sectionId === "risk-view" ? state.riskSearchKeyword : state.processSearchKeyword;
  const detail = getCompanyDetail(companyCode);
  const statCards = sectionId === "process-engine"
    ? []
    : company
    ? sectionId === "risk-view"
      ? [
          {
            value: formatDataMode(company.data_mode),
            label: "数据模式",
            inventory: getRiskDataInventory(getActiveSidebarItem().id, detail),
          },
        ]
      : [
          { value: formatRiskTier(company.risk_tier), label: "风险分层" },
          { value: detail?.report_versions?.length ? `${detail.report_versions.length} 个版本` : "待生成", label: "尽调报告" },
          { value: formatDataMode(company.data_mode), label: "数据模式" },
        ]
    : sectionId === "risk-view"
      ? []
      : [
          { value: "待选择", label: "当前企业" },
          { value: "流程工作区", label: "当前模式" },
          { value: "请输入企业名称", label: "下一步" },
        ];

  const companySummaryCard = company
    ? `
      <article class="panel-card company-summary-card">
        <div class="inline-head">
          <div>
            <h3>${escapeHtml(company.name)}</h3>
            <p>${escapeHtml(compactText(company.overview || "当前已选中企业，可继续查看右侧专题内容。"))}</p>
          </div>
          <button class="ghost-action" type="button" data-action="reset-company-search" data-section-id="${sectionId}">重新搜索</button>
        </div>
      </article>
    `
    : `
      <article class="panel-card">
        <h3>企业搜索</h3>
        <p>当前板块独立维护企业上下文，切换到另一个主栏不会自动带过去。</p>
        <div class="button-row" style="margin-top: 14px;">
          <input
            class="search-box"
            id="${sectionId}-search-input"
            placeholder="请输入企业名称，例如深圳市灵犀微传感科技有限公司"
            value="${escapeHtml(searchValue)}"
          />
          <button class="primary-action" type="button" data-action="search-company" data-section-id="${sectionId}">搜索企业</button>
        </div>
        <div class="pill-row" style="margin-top: 14px;">
          ${recentCodes.length
            ? recentCodes
                .map((code) => {
                  const item = getCompanySummary(code);
                  if (!item) return "";
                  return `
                    <button
                      class="pill-button${code === companyCode ? " is-active" : ""}"
                      type="button"
                      data-action="select-company"
                      data-section-id="${sectionId}"
                      data-company-code="${code}"
                    >${escapeHtml(item.name)}</button>
                  `;
                })
                .join("")
            : '<span class="muted-text">暂无最近查看企业</span>'}
        </div>
      </article>
    `;

  toolbarAreaEl.innerHTML = `
    <section class="hero-card">
      <div class="hero-head">
        <div>
          <p class="section-kicker">${sectionId === "risk-view" ? "风险洞察" : "全流程引擎"}</p>
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </div>
        ${sectionId === "risk-view" ? renderDataCompletionControl() : ""}
      </div>

      <div class="toolbar-grid${sectionId === "risk-view" && company ? " risk-toolbar-grid" : ""}${!statCards.length ? " toolbar-grid-no-stats" : ""}">
        ${companySummaryCard}

        ${statCards.length
          ? `<div class="stats-grid">
              ${statCards
                .map(
                  (item) => `
                    <article class="metric-card">
                      <strong class="metric-value">${escapeHtml(item.value)}</strong>
                      <span class="metric-label">${item.label}</span>
                      ${item.inventory
                        ? `<div class="inventory-popover">${item.inventory.map((entry) => `<span>${escapeHtml(entry)}</span>`).join("")}</div>`
                        : ""}
                    </article>
                  `,
                )
                .join("")}
            </div>`
          : ""}
      </div>
    </section>
  `;
}

function renderKnowledgeToolbar() {
  const active = getActiveSidebarItem();
  const categoryTitle = active.title;
  const total = (state.knowledgeBase?.files || []).filter((item) => item.category === active.id).length;
  toolbarAreaEl.innerHTML = `
    <section class="hero-card">
      <div class="hero-head">
        <div>
          <p class="section-kicker">知识库</p>
          <h2>${categoryTitle}</h2>
          <p>用于沉淀可被尽调报告生成引用的知识文件，支持 PDF / Word 上传与分类管理。</p>
        </div>
      </div>
      <div class="toolbar-grid">
        <article class="panel-card">
          <h3>文件检索</h3>
          <p>可按文件名快速过滤当前分类中的文件。</p>
          <div class="button-row" style="margin-top: 14px;">
            <input
              class="search-box"
              id="knowledge-search-input"
              placeholder="请输入文件名关键字"
              value="${escapeHtml(state.knowledgeSearchKeyword)}"
            />
          </div>
        </article>
        <div class="stats-grid">
          <article class="metric-card">
            <strong class="metric-value">${total}</strong>
            <span class="metric-label">当前分类文件数</span>
          </article>
          <article class="metric-card">
            <strong class="metric-value">${state.knowledgeBase?.categories?.length || 3}</strong>
            <span class="metric-label">知识分类</span>
          </article>
          <article class="metric-card">
            <strong class="metric-value">可引用</strong>
            <span class="metric-label">支持尽调报告生成引用</span>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderSystemToolbar() {
  const active = getActiveSidebarItem();
  toolbarAreaEl.innerHTML = `
    <section class="hero-card">
      <div class="hero-head">
        <div>
          <p class="section-kicker">系统管理</p>
          <h2>${active.title}</h2>
          <p>以基础后台视角展示用户、角色、权限、知识权限和操作日志等平台管理能力。</p>
        </div>
      </div>
      <div class="stats-grid" style="margin-top: 22px;">
        <article class="metric-card">
          <strong class="metric-value">${state.systemAdmin?.users?.length || 0}</strong>
          <span class="metric-label">用户数量</span>
        </article>
        <article class="metric-card">
          <strong class="metric-value">${state.systemAdmin?.roles?.length || 0}</strong>
          <span class="metric-label">角色数量</span>
        </article>
        <article class="metric-card">
          <strong class="metric-value">${state.systemAdmin?.logs?.length || 0}</strong>
          <span class="metric-label">近期操作日志</span>
        </article>
      </div>
    </section>
  `;
}

function renderToolbar() {
  if (["home", "risk-map", "due-task", "enterprise-library", "watchlist", "report-center"].includes(state.topSectionId)) {
    toolbarAreaEl.innerHTML = "";
    return;
  }
  if (state.topSectionId === "knowledge-center") {
    renderKnowledgeToolbar();
    return;
  }
  if (state.topSectionId === "risk-view") {
    renderSearchToolbar("risk-view", getActiveSidebarItem().title, "客户全景风险洞察，用于按专题查看主体、经营、财务、关联方和外部环境等风险信息。");
    return;
  }
  if (state.topSectionId === "process-engine") {
    renderSearchToolbar("process-engine", getActiveSidebarItem().title, "全流程引擎围绕授信节点组织作业，当前 POC 以“尽职调查”作为最深实现模块。");
    return;
  }
  if (state.topSectionId === "knowledge-base") {
    renderKnowledgeToolbar();
    return;
  }
  renderSystemToolbar();
}

function renderFieldGrid(items) {
  const editable = state.topSectionId === "risk-view" && state.riskCompletionMode === "manual";
  const aiMode = state.topSectionId === "risk-view" && state.riskCompletionMode === "ai";
  return `
    <div class="field-grid">
      ${items
        .map((item) => {
          const fieldKey = getRiskFieldKey(item);
          const displayValue = state.riskManualEdits[fieldKey] ?? item.value;
          return `
            <div class="field-item${editable ? " is-editable" : ""}">
              <strong>${escapeHtml(item.label)}</strong>
              <span
                ${editable ? 'contenteditable="true" spellcheck="false"' : ""}
                ${editable ? `data-editable-field="${escapeHtml(fieldKey)}"` : ""}
                ${editable ? `data-original-value="${escapeHtml(item.value)}"` : ""}
              >${escapeHtml(displayValue)}</span>
              ${aiMode ? renderCompletionUploadSlot(fieldKey, true) : ""}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderListStack(title, description, items) {
  return `
    <article class="content-card">
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="list-stack" style="margin-top: 16px;">
        ${items.length
          ? items.map((item) => `<div class="list-item">${item}</div>`).join("")
          : '<div class="list-item">暂无数据</div>'}
      </div>
    </article>
  `;
}

function renderBydIndustryAnalysis(detail) {
  const industryItems = [
    { label: "产业位置", value: "新能源汽车整车制造，覆盖乘用车、商用车、动力电池及储能，具备电池、电驱、电控等核心环节纵向一体化能力。" },
    { label: "行业周期", value: "行业已由高速渗透期进入规模化竞争和结构分化阶段，需求仍受以旧换新、出口、智能化配置升级支撑，但价格竞争和渠道库存管理压力上升。" },
    { label: "政策方向", value: "国家层面延续汽车以旧换新、新能源汽车购置税优惠、充换电基础设施完善与智能网联汽车试点等支持方向，政策重心从单纯补贴转向消费更新、技术安全和高质量出海。" },
    { label: "授信关注", value: "银行授信应重点观察销量增长质量、盈利韧性、经营现金流、海外扩张回款、供应链议价和研发资本化/费用化对利润的影响。" },
  ];
  const peerItems = [
    "AI分析｜比亚迪 2025 年新能源汽车销量约 460.2 万辆，规模优势和垂直整合能力突出，收入体量继续位居国内新能源车企前列。",
    "与特斯拉相比，比亚迪车型价格带更宽、插混与纯电并重，国内市场覆盖更深；特斯拉单车盈利和全球品牌溢价仍具优势。",
    "与吉利、长安、上汽等自主集团相比，比亚迪新能源转型更彻底，电池和电驱自研比例更高；但在白热化竞争下，盈利波动和经销/库存节奏需持续跟踪。",
    "同业比对结论：当前外部环境对头部新能源车企仍属支持，但风险从政策准入转向价格战、海外合规、产品迭代和现金流兑现能力。",
  ];
  return `
    <div class="two-col-grid" style="margin-top: 20px;">
      <article class="content-card industry-analysis-card">
        <div class="inline-head">
          <div>
            <h3>行业与政策环境</h3>
            <p>从政策、周期、竞争格局和授信影响四个维度观察外部环境。</p>
          </div>
          ${renderToneBadge("政策支持 / 竞争加剧", "watch")}
        </div>
        ${renderFieldGrid(industryItems)}
        <div class="divider"></div>
        <div class="finance-bullet-list">
          <div class="finance-bullet-item">汽车以旧换新政策继续拉动置换需求，新能源乘用车报废更新补贴仍是消费端重要支撑。</div>
          <div class="finance-bullet-item">行业竞争由“渗透率提升”转向“份额、成本、智能化和出海能力”综合竞争，价格战会压缩中短期利润空间。</div>
          <div class="finance-bullet-item">对授信而言，头部企业信用基础较强，但仍应把经营现金流、应收/存货周转和海外业务合规作为动态监测指标。</div>
        </div>
      </article>
      <article class="content-card peer-analysis-card">
        <div class="inline-head">
          <div>
            <h3>与同业比对</h3>
            <p>POC 阶段固定展示比亚迪同业分析，后续可接入公开数据自动更新。</p>
          </div>
          ${renderToneBadge("AI分析", "stable")}
        </div>
        <div class="list-stack" style="margin-top: 16px;">
          ${peerItems.map((item) => `<div class="list-item">${escapeHtml(item)}</div>`).join("")}
        </div>
      </article>
    </div>
  `;
}

function renderManualMaterialCard(title, suggestions, bucket) {
  const key = `${bucket}:手动补充材料`;
  return `
    <article class="upload-card manual-material-card">
      <h3>${title}</h3>
      <p>建议收集：${suggestions.join("、")}</p>
      <div class="divider"></div>
      ${renderCompletionUploadSlot(key)}
      <div class="upload-stack" style="margin-top: 16px;">
        <div class="upload-item">当前分组尚未上传文件</div>
      </div>
    </article>
  `;
}

function renderRiskView() {
  const companyCode = state.riskViewCompanyCode;
  const company = getCompanySummary(companyCode);
  const detail = getCompanyDetail(companyCode);
  const active = getActiveSidebarItem();

  if (!company || !detail) {
    contentAreaEl.innerHTML = `
      <div class="empty-state">
        <h3>请先在风险洞察中搜索企业</h3>
        <p>搜索后即可查看基本信息、经营情况、股东及关联方、财务状况、外部环境与行业、担保人信息、抵质押物等风险专题页面。</p>
      </div>
    `;
    return;
  }

  if (active.id === "basic-info") {
    const tags = [
      { value: company.company_code, label: "企业代码" },
      { value: formatRiskTier(company.risk_tier), label: "风险分层" },
      { value: compactText(detail.case_info?.case_no), label: "案例编号" },
      { value: formatDataMode(company.data_mode), label: "数据模式" },
    ];
    contentAreaEl.innerHTML = `
      <div class="two-col-grid" style="margin-top: 20px;">
        <article class="content-card">
          <h3>主体基础画像</h3>
          <p>用于识别企业主体、地区、行业与准入基础信息。</p>
          ${renderFieldGrid([
            { label: "企业名称", value: company.name },
            { label: "统一社会信用代码", value: compactText(detail.company.unified_social_credit_code) },
            { label: "成立时间", value: compactText(detail.company.established_on) },
            { label: "注册资本", value: formatCurrency(detail.company.registered_capital_cny) },
            { label: "地区", value: `${compactText(detail.company.region_province)}${detail.company.region_city || ""}` },
            { label: "行业", value: compactText(detail.company.subindustry || detail.company.industry_category) },
          ])}
        </article>
        <article class="summary-card">
          <h3>风险标签</h3>
          <p>当前企业在风险洞察中的基础标签。</p>
          <div class="tag-row" style="margin-top: 16px;">
            ${tags.map((tag) => `<span class="file-chip">${escapeHtml(tag.label)}：${escapeHtml(tag.value)}</span>`).join("")}
          </div>
          <div class="divider"></div>
          <p>${escapeHtml(company.overview || "暂无企业摘要。")}</p>
        </article>
      </div>
    `;
    return;
  }

  if (active.id === "operation-info") {
    contentAreaEl.innerHTML = `
      <div class="card-grid" style="margin-top: 20px;">
        ${renderFieldPanel(
          "经营能力",
          "围绕经营状态、企业规模和第一还款来源看经营稳定性。",
          [
            { label: "经营状态", value: formatOperatingStatus(detail.company.operating_status) },
            { label: "企业规模", value: compactText(detail.company.enterprise_scale || "—") },
            { label: "申请产品", value: compactText(detail.case_info?.product_type || "—") },
            { label: "第一还款来源", value: compactText(detail.case_info?.primary_repayment_source || "—") },
          ],
        )}
        ${renderFieldPanel(
          "交易闭环材料",
          "合同、订单、发票与回款材料可作为主营业务真实性判断依据。",
          [
            { label: "合同数量", value: `${detail.contracts.length} 份` },
            { label: "订单数量", value: `${detail.orders.length} 条` },
            { label: "发票数量", value: `${detail.invoices.length} 张` },
            { label: "银行摘要", value: `${detail.bank_summaries.length} 条` },
          ],
        )}
      </div>
    `;
    return;
  }

  if (active.id === "shareholder-related") {
    contentAreaEl.innerHTML = renderOwnershipMap(detail, company);
    return;
  }

  if (active.id === "financial-status") {
    contentAreaEl.innerHTML = renderFinancialDashboard(detail);
    return;
  }

  if (active.id === "external-industry") {
    contentAreaEl.innerHTML = renderBydIndustryAnalysis(detail);
    return;
  }

  if (active.id === "guarantor-info") {
    const guarantors = detail.people.filter((item) => item.is_guarantor);
    contentAreaEl.innerHTML = `
      <div class="card-grid" style="margin-top: 20px;">
        ${renderListStack(
          "担保人身份与关系",
          "查看担保人角色、身份与关联关系。",
          guarantors.map((item) => `${escapeHtml(item.full_name)}｜${escapeHtml(item.title || item.role_type)}`),
        )}
        ${renderListStack(
          "担保人相关信用摘要",
          "结合信用历史摘要判断代偿能力与外部负债压力。",
          detail.credit_history.slice(0, 6).map((item) => `${escapeHtml(item.subject_name)}｜余额 ${formatCurrency(item.outstanding_balance_cny)}`),
        )}
        ${renderManualMaterialCard("担保人材料补充", ["担保承诺", "担保人主体资格材料", "财务或征信材料", "与借款人关系说明"], "guarantor")}
      </div>
    `;
    return;
  }

  if (active.id === "collateral-info") {
    contentAreaEl.innerHTML = `
      <div class="card-grid" style="margin-top: 20px;">
        ${detail.guarantees.length
          ? detail.guarantees
              .map(
                (item) => `
                  <article class="section-card">
                    <h3>${escapeHtml(item.asset_name || item.guarantee_type)}</h3>
                    <p>类别：${escapeHtml(item.asset_category || item.guarantee_type || "—")}</p>
                    <p>评估值：${formatCurrency(item.appraised_value_cny)}</p>
                    <p>状态：${escapeHtml(item.guarantee_status || "—")}</p>
                  </article>
                `,
              )
              .join("")
          : '<div class="empty-state"><h3>暂无抵质押物信息</h3><p>可在全流程引擎 > 尽职调查 > 资料准备中补充抵质押材料。</p></div>'}
        ${renderManualMaterialCard("担保与抵质押材料", ["担保承诺", "抵押物权属材料", "评估报告", "质押清单"], "collateral")}
      </div>
    `;
    return;
  }

  contentAreaEl.innerHTML = `
    <div class="two-col-grid" style="margin-top: 20px;">
      ${renderListStack(
        "人工补件与特殊说明",
        "用于承接补件备注、特殊事项和人工判断。",
        [
          `建议状态：${escapeHtml(formatRecommendationStatus(detail.recommendation?.recommendation_status))}`,
          `补充要求：${escapeHtml(compactText(detail.recommendation?.supplemental_requirements))}`,
          `核验发现：${detail.validation_findings.length} 条`,
          `报告章节：${detail.report_sections.length} 段`,
        ],
      )}
      ${renderListStack(
        "重点发现",
        "当前需优先关注的风险或异常摘要。",
        detail.validation_findings.slice(0, 6).map((item) => `${escapeHtml(compactText(item.finding_title))}｜${escapeHtml(compactText(item.finding_summary))}`),
      )}
    </div>
  `;
}

function getCustomerSectionPayload(detail, sectionId) {
  const company = detail.company || {};
  const caseInfo = detail.case_info || {};
  const recommendation = detail.recommendation || {};
  const metrics = Object.fromEntries((detail.latest_metrics || []).map((item) => [item.metric_code, item.value]));
  const industry = detail.industry_profile || {};
  const guarantee = (detail.guarantees || [])[0] || {};
  const profile = detail.profile_attributes || [];
  const topFinding = (detail.validation_findings || [])[0] || {};

  const payloadMap = {
    basic: {
      title: "基本信息",
      items: [
        { label: "企业名称", value: company.name || "—" },
        { label: "统一社会信用代码", value: compactText(company.unified_social_credit_code) },
        { label: "成立时间", value: compactText(company.established_on) },
        { label: "风险分层", value: formatRiskTier(company.risk_tier) },
        { label: "案例编号", value: compactText(caseInfo.case_no) },
        { label: "申请产品", value: compactText(caseInfo.product_type || "—") },
      ],
      hints: ["检查企业主体画像是否完整。", "优先补充主体证照、成立时间与经营范围依据。", "该分组会直接进入报告“客户概况”章节。"],
    },
    operation: {
      title: "经营情况",
      items: [
        { label: "经营状态", value: formatOperatingStatus(company.operating_status) },
        { label: "企业规模", value: compactText(company.enterprise_scale || "—") },
        { label: "第一还款来源", value: compactText(caseInfo.primary_repayment_source || "—") },
        { label: "合同数量", value: `${detail.contracts.length} 份` },
        { label: "订单数量", value: `${detail.orders.length} 条` },
        { label: "发票数量", value: `${detail.invoices.length} 张` },
      ],
      hints: ["可补充主营产品、经营模式和上下游结构。", "建议核对合同、订单、发票、回款链路。", "如还款来源较弱，应在报告中突出风险点。"],
    },
    financial: {
      title: "财务情况",
      items: [
        { label: "营业收入", value: formatCurrency(metrics.revenue) },
        { label: "净利润", value: formatCurrency(metrics.net_profit) },
        { label: "货币资金", value: formatCurrency(metrics.cash) },
        { label: "应收账款", value: formatCurrency(metrics.accounts_receivable) },
        { label: "存货", value: formatCurrency(metrics.inventory) },
        { label: "银行摘要", value: `${detail.bank_summaries.length} 条` },
      ],
      hints: ["建议同时观察利润、现金和应收。", "如果流水和财务表现不一致，应作为预审重点。", "后续可增加派生比率指标。"],
    },
    industry: {
      title: "行业与外部环境信息",
      items: [
        { label: "行业分类", value: compactText(company.subindustry || company.industry_category) },
        { label: "生命周期", value: compactText(industry.lifecycle_stage) },
        { label: "政策方向", value: compactText(industry.policy_direction) },
        { label: "同业比较", value: `${detail.peer_comparisons.length} 条` },
        { label: "公开风险", value: `${detail.public_risks.length} 条` },
        { label: "关键外部事件", value: compactText(detail.public_risks[0]?.title, "暂无重大公开风险") },
      ],
      hints: ["建议至少覆盖政策、周期和外部风险。", "监管行业要优先补外规材料。", "可补充同业分位和行业波动说明。"],
    },
    collateral: {
      title: "抵质押物",
      items: [
        { label: "授信缓释要求", value: compactText(recommendation.guarantee_requirement) },
        { label: "担保方式", value: compactText(caseInfo.guarantee_mode) },
        { label: "担保记录", value: `${detail.guarantees.length} 项` },
        { label: "重点抵质押物", value: compactText(guarantee.asset_name || guarantee.guarantee_type, "待补充") },
        { label: "评估价值", value: formatCurrency(guarantee.appraised_value_cny) },
        { label: "状态", value: compactText(guarantee.guarantee_status) },
      ],
      hints: ["应重点补充权属、评估值和可执行性。", "依赖个人保证时需补代偿能力说明。", "可继续细化抵押率和权证状态。"],
    },
    other: {
      title: "其他",
      items: [
        { label: "画像属性", value: `${profile.length} 条` },
        { label: "核验发现", value: `${detail.validation_findings.length} 条` },
        { label: "建议状态", value: formatRecommendationStatus(recommendation.recommendation_status) },
        { label: "补充要求", value: compactText(recommendation.supplemental_requirements) },
        { label: "重点发现", value: compactText(topFinding.finding_title, "暂无重点异常") },
        { label: "报告章节", value: `${detail.report_sections.length} 段` },
      ],
      hints: ["这里适合放现场访谈、特殊事项和人工判断。", "建议把最需人工解释的风险点沉淀在此。", "后续 AI 生成报告时会优先吸收此处补充说明。"],
    },
  };

  return payloadMap[sectionId] || payloadMap.basic;
}

function renderDueDiligenceCustomerInfo(detail, company) {
  const payload = getCustomerSectionPayload(detail, state.customerSectionId);
  const currentIndex = customerSections.findIndex((item) => item.id === state.customerSectionId) + 1;
  return `
    <div class="two-col-grid" style="margin-top: 20px;">
      <article class="content-card">
        <div class="inline-head">
          <div>
            <h3>${payload.title}</h3>
            <p>案件编号 ${escapeHtml(compactText(detail.case_info?.case_no))}，当前正在整理客户基础输入信息。</p>
          </div>
          ${createStatusPill("open")}
        </div>
        <div class="tab-row" style="margin-top: 16px;">
          ${customerSections
            .map(
              (item) => `
                <button
                  class="tab-button${item.id === state.customerSectionId ? " is-active" : ""}"
                  type="button"
                  data-action="switch-customer-section"
                  data-customer-section="${item.id}"
                >${item.title}</button>
              `,
            )
            .join("")}
        </div>
        <div style="margin-top: 16px;">${renderFieldGrid(payload.items)}</div>
        <p style="margin-top: 16px;">当前进度：${currentIndex}/${customerSections.length}</p>
      </article>
      <article class="summary-card">
        <h3>AI 辅助提示</h3>
        <p>当前为后续接入 DeepSeek 预留智能提示位，先以静态建议方式展示。</p>
        <div class="summary-stack" style="margin-top: 16px;">
          ${payload.hints.map((item) => `<div class="summary-item"><strong>提示</strong><span>${escapeHtml(item)}</span></div>`).join("")}
        </div>
      </article>
    </div>
  `;
}

function renderDueDiligenceMaterials(detail) {
  const buckets = state.meta?.material_buckets || [];
  return `
    <div class="card-grid" style="margin-top: 20px;">
      ${buckets
        .map((bucket) => {
          const files = detail.due_diligence_materials.filter((item) => item.bucket === bucket.id);
          const hints = materialBucketDescriptions[bucket.id] || [];
          return `
            <article class="upload-card">
              <h3>${bucket.title}</h3>
              <p>建议收集：${hints.join("、")}</p>
              <div class="divider"></div>
              <input type="file" accept=".pdf,.doc,.docx" data-material-bucket="${bucket.id}" />
              <div class="upload-stack" style="margin-top: 16px;">
                ${files.length
                  ? files
                      .map(
                        (item) => `
                          <div class="upload-item">
                            <strong>${escapeHtml(item.name)}</strong>
                            <span>上传时间：${escapeHtml(item.uploaded_at)}</span><br />
                            <span>所属分组：${escapeHtml(item.bucket_title)}</span>
                          </div>
                        `,
                      )
                      .join("")
                  : '<div class="upload-item">当前分组尚未上传文件</div>'}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderKnowledgeChooser(version) {
  const categories = state.knowledgeBase?.categories || [];
  const files = state.knowledgeBase?.files || [];
  return categories
    .map((category) => {
      const categoryFiles = files.filter((item) => item.category === category.id);
      const selectedCount = categoryFiles.filter((item) => state.pendingKnowledgeSelection.includes(item.id)).length;
      return `
        <section class="knowledge-section-block">
          <div class="inline-head">
            <div>
              <h3>${category.title}</h3>
              <p>可从当前知识库中多选文件，作为尽调报告生成与预审的引用依据。</p>
            </div>
            <button class="ghost-action" type="button" data-action="toggle-knowledge-category" data-knowledge-category-toggle="${category.id}">
              ${selectedCount === categoryFiles.length && categoryFiles.length ? "取消全选" : "一键全选"}
            </button>
          </div>
          <div class="checkbox-group">
            ${categoryFiles.length
              ? categoryFiles
                  .map((file) => renderKnowledgeFileOption(file, state.pendingKnowledgeSelection.includes(file.id)))
                  .join("")
              : '<div class="list-item">当前分类暂无文件</div>'}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderDataSourceChooser(detail) {
  return getReportDataSourceGroups(detail)
    .map(
      (group) => `
        <article class="summary-card source-group-card">
          <div class="inline-head">
            <div>
              <h3>${group.title}</h3>
              <p>${group.description}</p>
            </div>
            <button class="ghost-action" type="button" data-action="toggle-source-group" data-source-group="${group.id}">
              ${group.items.every((item) => state.pendingDataSourceSelection.includes(item.id)) ? "取消全选" : "一键全选"}
            </button>
          </div>
          <div class="checkbox-group">
            ${group.items
              .map(
                (item) => `
                  <label class="checkbox-item">
                    <input
                      type="checkbox"
                      data-report-source-id="${item.id}"
                      ${state.pendingDataSourceSelection.includes(item.id) ? "checked" : ""}
                    />
                    <div>
                      <strong>${item.label}</strong>
                      <span>${item.countLabel}</span>
                    </div>
                  </label>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderReportReferencePanel(version, editorText, variant = "generated") {
  const references = getReportReferences(version);
  const usage = getReferenceUsageMap(editorText, version);
  return `
    <aside class="report-reference-panel${state.reportReferencesOpen ? " is-open" : ""}">
      <div class="inline-head">
        <div>
          <h3>溯源</h3>
          <p>查看当前版本关键判断对应的知识库、底稿与结构化数据来源。</p>
        </div>
        <button class="ghost-action" type="button" data-action="toggle-report-references">${state.reportReferencesOpen ? "收起" : "展开"}</button>
      </div>
      <div class="report-reference-list">
        ${references.length
          ? references
              .map((ref) => {
                const used = Boolean(usage[ref.id]);
                return `
                  <button
                    class="report-reference-item${state.activeReferenceId === ref.id ? " is-active" : ""}${used ? "" : " is-unused"}"
                    type="button"
                    data-action="focus-reference"
                    data-reference-id="${escapeHtml(ref.id)}"
                    data-report-variant="${variant}"
                  >
                    <span class="report-reference-id">${escapeHtml(ref.id)}</span>
                    <strong>${escapeHtml(ref.title || ref.id)}</strong>
                    <em>${escapeHtml(ref.source_type || "来源")}${ref.locator ? `｜${escapeHtml(ref.locator)}` : ""}</em>
                    <small>${escapeHtml(ref.excerpt || "暂无来源摘要。")}</small>
                    <span class="report-reference-state">${used ? `正文使用 ${usage[ref.id]} 次` : "未在正文使用"}</span>
                  </button>
                `;
              })
              .join("")
          : '<div class="empty-state"><h3>暂无结构化溯源</h3><p>历史版本会降级展示生成依据和知识库文件。</p></div>'}
      </div>
    </aside>
  `;
}

function renderDueDiligenceReportGenerate(detail) {
  const version = getCurrentVersion(detail);
  const selectedKnowledge = getSelectedKnowledgeFiles();
  const collapsed = state.reportKnowledgeCollapsed;
  const immersive = state.reportImmersiveMode;
  const sourceOpen = state.reportReferencesOpen;
  return `
    <div class="report-workspace-grid${collapsed || immersive ? " is-compact" : ""}${sourceOpen ? " has-reference-panel" : ""}${immersive ? " is-immersive" : ""}" style="margin-top: ${immersive ? "0" : "20px"};">
      ${collapsed || immersive
        ? ""
        : `
      <div class="list-grid report-left-column">
        <article class="content-card knowledge-unified-card">
          <div class="inline-head">
            <div>
              <h3>知识库引用依据</h3>
              <p>从左侧统一选择外部法规、内部制度和专家经验，作为尽调报告生成与预审时的参考口径和引用依据。</p>
            </div>
            <button class="ghost-action" type="button" data-action="toggle-knowledge-pane" data-pane="report">${collapsed ? "展开依据" : "收起依据"}</button>
          </div>
          <div class="knowledge-unified-scroll">
            <div class="summary-stack knowledge-unified-summary" style="margin-top: 16px;">
              <div class="summary-item summary-item--selected-count"><strong>已选知识文件</strong><span>${selectedKnowledge.length} 份</span></div>
              <div class="summary-item summary-item--helper"><strong>说明</strong><span>只会参考当前勾选的知识库文件，不会默认引用全部知识文件。</span></div>
            </div>
            <div class="divider"></div>
            <div class="knowledge-unified-sections">
              ${renderKnowledgeChooser(version)}
            </div>
          </div>
          <div class="divider"></div>
          <div class="inline-head">
            <div>
              <h3>生成动作</h3>
              <p>确认知识库引用后，生成新的尽调报告版本。</p>
            </div>
          </div>
          <div class="button-row" style="margin-top: 16px;">
            <button class="primary-action" type="button" data-action="generate-version" ${state.isGeneratingVersion ? "disabled" : ""}>
              ${state.isGeneratingVersion ? "生成中..." : "关联选定知识库生成尽调报告"}
            </button>
          </div>
        </article>
      </div>
      `}

      <article class="content-card report-editor-panel">
        <div class="inline-head">
          <div>
            <h3>尽调报告全览</h3>
            <p>右侧保留版本管理和可编辑画布，客户经理可直接修订报告正文。</p>
          </div>
          ${version ? createStatusPill(version.review_result ? "reviewed" : "generated") : createStatusPill("draft")}
        </div>
        ${version
          ? `
            <div class="button-row" style="margin-top: 16px;">
              <select class="form-select" id="report-version-select">
                ${detail.report_versions
                  .map(
                    (item) => `
                      <option value="${item.id}" ${item.id === version.id ? "selected" : ""}>${escapeHtml(formatVersionDisplayLabel(item))}</option>
                    `,
                  )
                  .join("")}
              </select>
              <input
                class="search-box report-document-search-input"
                id="report-search-input"
                type="search"
                placeholder="搜索章节或正文"
                value="${escapeHtml(state.reportSearchKeyword)}"
              />
              <button class="ghost-action" type="button" data-action="search-report" data-report-variant="generated">搜索</button>
              <button class="ghost-action" type="button" data-action="toggle-knowledge-pane" data-pane="report">${collapsed ? "展开知识库依据" : "收起知识库依据"}</button>
              <button class="ghost-action" type="button" data-action="toggle-report-references">${sourceOpen ? "收起溯源" : "展开溯源"}</button>
              <button class="ghost-action" type="button" data-action="toggle-report-immersive">${immersive ? "退出沉浸" : "沉浸模式"}</button>
              <button class="ghost-action" type="button" data-action="save-report-draft">保存修改</button>
              <a class="secondary-action" href="${version.pdf_url}" target="_blank" rel="noreferrer">导出</a>
            </div>
            ${renderDocumentWorkspace(version, state.reportEditorText, "report-editor-textarea", "generated", "尽调报告画布")}
          `
          : '<div class="empty-state"><h3>尚未生成报告</h3><p>请先在左侧勾选内容并生成新版本。</p></div>'}
      </article>
      ${version && sourceOpen ? renderReportReferencePanel(version, state.reportEditorText, "generated") : ""}
    </div>
  `;
}

function renderReviewInsightsPanel(version, collapsed) {
  const findings = version?.review_result?.findings || [];
  return `
    <article class="content-card review-insights-panel">
      <div class="inline-head">
        <div>
          <h3>预审风险分析</h3>
          <p>${version?.review_result ? "汇总预审结论与全部风险提示，便于客户经理集中查看与修改。" : "点击左侧底部按钮后，这里会输出预审总览与全部风险提示。"}</p>
        </div>
        <button class="ghost-action" type="button" data-action="toggle-knowledge-pane" data-pane="review">${collapsed ? "展开依据" : "收起依据"}</button>
      </div>
      ${version?.review_result
        ? `
          <div class="review-insights-scroll">
            <div class="summary-stack" style="margin-top: 16px;">
              <div class="summary-item"><strong>总体结论</strong><span>${escapeHtml(version.review_result.overall_result)}</span></div>
              <div class="summary-item"><strong>清单生成时间</strong><span>${escapeHtml(version.review_result.reviewed_at)}</span></div>
              <div class="summary-item"><strong>AI预审摘要</strong><span>${escapeHtml(version.review_result.review_summary || "已生成风险提示清单")}</span></div>
              <div class="summary-item"><strong>重点关注</strong><span>高风险 ${version.review_result.counts.high} 条 / 关注 ${version.review_result.counts.medium} 条</span></div>
            </div>
            <div class="divider"></div>
            <div class="review-findings-stack">
              ${findings.length
                ? findings
                    .map(
                      (item, index) => `
                        <article class="summary-card checklist-card">
                          <div class="finding-head">
                            <h3>提示 ${index + 1}</h3>
                            ${createStatusPill(item.severity === "high" ? "pressure" : item.severity === "medium" ? "watch" : "stable")}
                          </div>
                          <p>${escapeHtml(item.issue)}</p>
                          <div class="summary-stack" style="margin-top: 16px;">
                            <div class="summary-item"><strong>需要判断</strong><span>${escapeHtml(item.judgement_focus || item.section_title || "—")}</span></div>
                            <div class="summary-item"><strong>还需数据</strong><span>${escapeHtml(item.required_data || item.source_rule || "—")}</span></div>
                            <div class="summary-item"><strong>建议完善方向</strong><span>${escapeHtml(item.improvement_direction || item.suggestion)}</span></div>
                          </div>
                        </article>
                      `,
                    )
                    .join("")
                : '<div class="summary-card"><h3>问题清单</h3><p>当前没有问题清单。</p></div>'}
            </div>
          </div>
        `
        : '<div class="summary-card" style="margin-top:16px;"><h3>问题清单</h3><p>点击左侧底部“生成风险提示清单”后，这里会统一展示预审总览与全部提示。</p></div>'}
    </article>
  `;
}

function renderReviewKnowledgeGroup(categoryId, title, description) {
  const files = (state.knowledgeBase?.files || []).filter((item) => item.category === categoryId);
  const selectedCount = files.filter((item) => state.pendingKnowledgeSelection.includes(item.id)).length;
  return `
    <section class="review-knowledge-section">
      <div class="inline-head">
        <div>
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
        <button class="ghost-action" type="button" data-action="toggle-knowledge-category" data-knowledge-category-toggle="${categoryId}">
          ${selectedCount === files.length && files.length ? "取消全选" : "一键全选"}
        </button>
      </div>
      <div class="checkbox-group">
        ${files.length
          ? files.map((file) => renderKnowledgeFileOption(file, state.pendingKnowledgeSelection.includes(file.id))).join("")
          : '<div class="list-item">当前分类暂无文件</div>'}
      </div>
    </section>
  `;
}

function renderDueDiligenceReportReview(detail) {
  const version = getCurrentVersion(detail);
  const collapsed = state.reviewKnowledgeCollapsed;
  if (!version) {
    return '<div class="empty-state"><h3>当前企业尚未生成尽调报告版本</h3><p>请先生成报告版本后再执行预审。</p></div>';
  }

  return `
    <div class="review-workspace-grid${collapsed ? " is-compact" : ""}" style="margin-top: 20px;">
      ${collapsed
        ? ""
        : `
      <article class="content-card review-left-panel">
        <section class="review-left-panel-head">
          <div class="inline-head">
            <div>
              <h3>预审依据输入</h3>
              <p>从现有知识库中直接勾选外规、银行内规和专家经验，作为预审依据。</p>
            </div>
            <button class="ghost-action" type="button" data-action="toggle-knowledge-pane" data-pane="review">收起依据</button>
          </div>
        </section>
        <div class="divider"></div>
        <section class="review-knowledge-panel">
          ${renderReviewKnowledgeGroup("laws", "外部法规", "从现有知识库中勾选监管政策、行业规范和名单类文件，作为外规审查依据。")}
          <div class="divider"></div>
          ${renderReviewKnowledgeGroup("policies", "内部制度", "从现有知识库中勾选内部授信政策、准入标准和审批口径文件，作为内规审查依据。")}
          <div class="divider"></div>
          ${renderReviewKnowledgeGroup("experience", "专家经验", "从现有知识库中勾选专家经验文件，作为风险判断和完善方向的补充口径。")}
        </section>
        <div class="divider"></div>
        <div class="button-row">
          <button class="primary-action" type="button" data-action="run-review" ${state.isRunningReview ? "disabled" : ""}>
            ${state.isRunningReview ? "生成中..." : "生成风险提示清单"}
          </button>
        </div>
      </article>
      `}

      <div class="review-insights-column">
        ${renderReviewInsightsPanel(version, collapsed)}
      </div>

      <article class="content-card report-editor-panel">
        <div class="inline-head">
          <div>
            <h3>预审修订画布</h3>
            <p>客户经理可结合中间风险提示，继续修订当前尽调报告。</p>
          </div>
          ${version.review_saved_at ? createStatusPill("reviewed") : createStatusPill("draft")}
        </div>
        <div class="button-row" style="margin-top: 16px;">
          <button class="ghost-action" type="button" data-action="save-review-draft">保存修改</button>
          <a class="secondary-action" href="${version.pdf_url}?variant=review" target="_blank" rel="noreferrer">导出</a>
          <button class="secondary-action report-oa-action" type="button" data-action="send-review-to-oa">一键发送到 OA</button>
        </div>
        <div class="divider"></div>
        ${renderDocumentWorkspace(version, state.reviewEditorText, "review-editor-textarea", "review", "预审修订画布")}
      </article>
    </div>
  `;
}

function renderDueDiligence(detail) {
  const tabContent = state.dueDiligenceTabId === "report-generate" ? renderDueDiligenceReportGenerate(detail) : renderDueDiligenceReportReview(detail);
  contentAreaEl.innerHTML = `
    <div class="process-tab-strip" style="margin-top: 20px;">
      <div class="tab-row">
        ${dueDiligenceTabs
          .map(
            (item) => `
              <button
                class="tab-button${item.id === state.dueDiligenceTabId ? " is-active" : ""}"
                type="button"
                data-action="switch-dd-tab"
                data-dd-tab="${item.id}"
              >${item.title}</button>
            `,
          )
          .join("")}
      </div>
    </div>
    ${tabContent}
  `;
}

function renderProcessPlaceholder(detail) {
  const active = getActiveSidebarItem();
  const config = processPlaceholderMap[active.id];
  if (!config) {
    contentAreaEl.innerHTML = `<div class="empty-state"><h3>当前节点暂未配置</h3><p>请切换到其他流程节点。</p></div>`;
    return;
  }
  contentAreaEl.innerHTML = `
    <div class="stats-grid" style="margin-top: 20px;">
      ${config.metrics
        .map((item) => `<article class="metric-card"><strong class="metric-value">${item}</strong><span class="metric-label">POC 结构位</span></article>`)
        .join("")}
    </div>
    <div class="card-grid" style="margin-top: 18px;">
      ${config.cards
        .map(
          (item) => `
            <article class="section-card">
              <h3>${item}</h3>
              <p>当前节点已预留页面结构和文案空间，后续可继续接入真实流程能力与业务数据。</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderProcessEngine() {
  const companyCode = state.processEngineCompanyCode;
  const detail = getCompanyDetail(companyCode);
  const company = getCompanySummary(companyCode);
  const active = getActiveSidebarItem();

  if (!company || !detail) {
    contentAreaEl.innerHTML = `
      <div class="empty-state">
        <h3>请先在全流程引擎中搜索企业</h3>
        <p>搜索企业后即可进入尽职调查、信用评级、授信方案、授信调查报告、合同与放款和贷后管理工作区。</p>
      </div>
    `;
    return;
  }

  syncSelectedVersion(detail);
  syncKnowledgeSelection(detail);

  if (active.id === "due-diligence") {
    renderDueDiligence(detail);
    return;
  }
  renderProcessPlaceholder(detail);
}

function renderKnowledgeBase() {
  const active = getActiveSidebarItem();
  const search = state.knowledgeSearchKeyword.trim().toLowerCase();
  const files = (state.knowledgeBase?.files || []).filter((item) => item.category === active.id);
  const filtered = search ? files.filter((item) => item.name.toLowerCase().includes(search)) : files;

  contentAreaEl.innerHTML = `
    <div class="two-col-grid" style="margin-top: 20px;">
      <article class="upload-card">
        <h3>${active.title}上传</h3>
        <p>支持上传 PDF / Word 文件，上传后可在尽调报告生成页中被多选引用。</p>
        <input type="file" accept=".pdf,.doc,.docx" data-knowledge-category="${active.id}" />
        <div class="divider"></div>
        <div class="summary-stack">
          <div class="summary-item"><strong>当前分类</strong><span>${active.title}</span></div>
          <div class="summary-item"><strong>上传人</strong><span>系统管理员</span></div>
          <div class="summary-item"><strong>用途</strong><span>可用于尽调报告生成时引用知识依据</span></div>
        </div>
      </article>
      <article class="table-card">
        <h3>文件列表</h3>
        <p>文件状态、分类、上传时间和说明在此统一展示。</p>
        <div class="table-stack" style="margin-top: 16px;">
          <div class="table-head" style="--cols: 5;">
            <span>文件名</span>
            <span>上传时间</span>
            <span>上传人</span>
            <span>说明</span>
            <span>操作</span>
          </div>
          ${filtered.length
            ? filtered
                .map(
                  (item) => `
                    <div class="table-row" style="--cols: 5;">
                      <span>${escapeHtml(item.name)}</span>
                      <span>${escapeHtml(item.uploaded_at)}</span>
                      <span>${escapeHtml(item.owner)}</span>
                      <span>${escapeHtml(compactText(item.description))}</span>
                      <span class="button-row">
                        <a class="ghost-action" href="${item.view_url}" target="_blank" rel="noreferrer">查看</a>
                        <a class="secondary-action" href="${item.download_url}" target="_blank" rel="noreferrer">下载</a>
                      </span>
                    </div>
                  `,
                )
                .join("")
            : '<div class="table-row" style="--cols: 1;"><span>当前没有匹配文件</span></div>'}
        </div>
      </article>
    </div>
  `;
}

function renderSystemTable(columns, rows) {
  return `
    <div class="table-stack" style="margin-top: 16px;">
      <div class="table-head" style="--cols: ${columns.length};">
        ${columns.map((item) => `<span>${item}</span>`).join("")}
      </div>
      ${rows.join("")}
    </div>
  `;
}

function renderSystemAdmin() {
  const active = getActiveSidebarItem().id;
  const data = state.systemAdmin || {};
  let html = "";

  if (active === "users") {
    html = renderSystemTable(
      ["用户", "所属部门/岗位", "角色", "状态"],
      (data.users || []).map(
        (item) => `
          <div class="table-row" style="--cols: 4;">
            <span>${escapeHtml(item.name)}</span>
            <span>${escapeHtml(item.department)} / ${escapeHtml(item.job_title)}</span>
            <span>${escapeHtml(item.role)}</span>
            <span>${escapeHtml(item.status)}</span>
          </div>
        `,
      ),
    );
  } else if (active === "roles") {
    html = renderSystemTable(
      ["角色", "角色说明", "关联菜单"],
      (data.roles || []).map(
        (item) => `
          <div class="table-row" style="--cols: 3;">
            <span>${escapeHtml(item.name)}</span>
            <span>${escapeHtml(item.description)}</span>
            <span>${escapeHtml(item.menus)}</span>
          </div>
        `,
      ),
    );
  } else if (active === "permissions") {
    html = renderSystemTable(
      ["权限类型", "说明", "控制范围"],
      (data.permissions || []).map(
        (item) => `
          <div class="table-row" style="--cols: 3;">
            <span>${escapeHtml(item.name)}</span>
            <span>${escapeHtml(item.description)}</span>
            <span>${escapeHtml(item.scope)}</span>
          </div>
        `,
      ),
    );
  } else if (active === "menus") {
    html = renderSystemTable(
      ["菜单对象", "说明", "可见性"],
      (data.menus || []).map(
        (item) => `
          <div class="table-row" style="--cols: 3;">
            <span>${escapeHtml(item.name)}</span>
            <span>${escapeHtml(item.description)}</span>
            <span>${escapeHtml(item.visibility)}</span>
          </div>
        `,
      ),
    );
  } else if (active === "knowledge-permissions") {
    html = renderSystemTable(
      ["角色", "外部法规", "内部制度", "专家经验"],
      (data.knowledge_permissions || []).map(
        (item) => `
          <div class="table-row" style="--cols: 4;">
            <span>${escapeHtml(item.role)}</span>
            <span>${escapeHtml(item.laws)}</span>
            <span>${escapeHtml(item.policies)}</span>
            <span>${escapeHtml(item.experience)}</span>
          </div>
        `,
      ),
    );
  } else {
    html = renderSystemTable(
      ["时间", "用户", "动作", "对象"],
      (data.logs || []).map(
        (item) => `
          <div class="table-row" style="--cols: 4;">
            <span>${escapeHtml(item.time)}</span>
            <span>${escapeHtml(item.user)}</span>
            <span>${escapeHtml(item.action)}</span>
            <span>${escapeHtml(item.target)}</span>
          </div>
        `,
      ),
    );
  }

  contentAreaEl.innerHTML = `
    <article class="table-card" style="margin-top: 20px;">
      <h3>${getActiveSidebarItem().title}</h3>
      <p>当前为基础后台框架页，重点展示角色权限、知识库权限与近期操作留痕。</p>
      ${html}
    </article>
  `;
}

function getDemoCompany() {
  return getCompanySummary(DEMO_COMPANY_CODE) || state.companies[0] || null;
}

function getDemoDetail() {
  return getCompanyDetail(DEMO_COMPANY_CODE) || getCompanyDetail(state.processEngineCompanyCode) || null;
}

function getRiskSeverity(level) {
  return riskSeverityMeta[level] || riskSeverityMeta["中风险"];
}

function getCompanyRiskLevelLabel(company) {
  if (!company) return null;
  if (company.riskLevel) return compactText(company.riskLevel, null);
  if (company.risk_level) return compactText(company.risk_level, null);
  if (company.risk_level_label) return compactText(company.risk_level_label, null);
  if (company.risk_tier) return formatRiskTier(company.risk_tier);
  return null;
}

function getCompanyRiskScoreValue(company) {
  const direct = company?.riskScore ?? company?.risk_score;
  const num = toNumber(direct);
  return num === null ? null : Math.round(num);
}

function getCompanyUpdatedAtValue(company) {
  return company?.updatedAt || company?.updated_at || null;
}

function getCompanyRiskTags(company) {
  if (Array.isArray(company?.tags)) return company.tags.filter(Boolean);
  if (Array.isArray(company?.riskTags)) return company.riskTags.filter(Boolean);
  if (Array.isArray(company?.risk_tags)) return company.risk_tags.filter(Boolean);
  return [];
}

function getPortraitCompaniesSource() {
  return Array.isArray(state.companies) ? state.companies : [];
}

function mapCompanyToPortraitListItem(company) {
  if (!company) return null;
  return {
    ...company,
    id: company.company_code || company.id,
    companyCode: company.company_code || company.id,
    industry: formatCompanyIndustry(company),
    riskLevel: getCompanyRiskLevelLabel(company),
    riskScore: getCompanyRiskScoreValue(company),
    updatedAt: getCompanyUpdatedAtValue(company),
    tags: getCompanyRiskTags(company),
  };
}

function getPortraitModule(company, moduleId = state.riskHouseFocusId) {
  return company?.modules?.find((item) => item.id === moduleId) || company?.modules?.[0] || null;
}

function getPortraitDefaultFocusId(company) {
  if (!company?.modules?.length) return "01";
  return [...company.modules]
    .sort((a, b) => (b.score - a.score) || (a.priority - b.priority))[0]?.id || "01";
}

function getPortraitCompaniesFiltered() {
  const keyword = state.portraitSearchKeyword.trim().toLowerCase();
  return getPortraitCompaniesSource().map(mapCompanyToPortraitListItem).filter((item) => item).filter((item) => {
    const keywordMatch = !keyword
      || String(item.name || "").toLowerCase().includes(keyword)
      || String(item.industry || "").toLowerCase().includes(keyword);
    const riskMatch = state.portraitRiskFilter === "全部" || item.riskLevel === state.portraitRiskFilter;
    return keywordMatch && riskMatch;
  });
}

function estimatePortraitSufficiency(signals) {
  const validCount = signals.filter((item) => {
    if (item === null || item === undefined) return false;
    if (Array.isArray(item)) return item.length > 0;
    return true;
  }).length;
  return Number((validCount / Math.max(signals.length, 1)).toFixed(2));
}

function getPortraitLevelByScore(score, sufficiency = 1) {
  if (sufficiency < 0.35) return "信息不足";
  if (score >= 86) return "极高风险";
  if (score >= 72) return "高风险";
  if (score >= 55) return "中风险";
  return "低风险";
}

function clampPortraitScore(score) {
  return Math.max(26, Math.min(93, Math.round(score)));
}

function buildPortraitModulesFromDetail(company, detail) {
  const metrics = getMetricMap(detail);
  const publicRisks = detail.public_risks || [];
  const validationFindings = detail.validation_findings || [];
  const relatedCompanies = detail.related_companies || [];
  const relatedTransactions = detail.related_transactions || [];
  const shareholdingChanges = detail.shareholding_changes || [];
  const people = detail.people || [];
  const receivable = getReceivableSnapshot(detail, "accounts_receivable");
  const bankSummary = detail.bank_summaries?.[0] || null;
  const cases = detail.cases || [];
  const contracts = detail.contracts || [];
  const orders = detail.orders || [];
  const profileAttributes = detail.profile_attributes || [];

  const legalScore = clampPortraitScore(40 + publicRisks.length * 9 + cases.length * 6);
  const complianceScore = clampPortraitScore(34 + validationFindings.filter((item) => item.status === "warn").length * 8 + validationFindings.filter((item) => item.status === "fail").length * 12);
  const ownershipScore = clampPortraitScore(30 + relatedCompanies.length * 2 + shareholdingChanges.length * 6 + people.filter((item) => item.is_actual_controller).length * 8);
  const cashflowScore = clampPortraitScore(
    42
    + ((toNumber(metrics.operating_cash_flow) ?? 0) < 0 ? 24 : 0)
    + ((toNumber(metrics.asset_liability_ratio) ?? 0) > 0.65 ? 18 : 0)
    + ((toNumber(metrics.interest_coverage_ratio) ?? 3) < 1.5 ? 12 : 0),
  );
  const revenueScore = clampPortraitScore(
    38
    + ((receivable?.overdue_over_90d_cny ?? 0) > 0 ? 18 : 0)
    + ((receivable?.top5_ratio_pct ?? 0) > 0.6 ? 12 : 0)
    + ((toNumber(metrics.gross_margin_pct) ?? 0) < 0.18 ? 10 : 0),
  );
  const relatedScore = clampPortraitScore(35 + relatedTransactions.length * 4 + relatedCompanies.length * 2);
  const contractScore = clampPortraitScore(28 + Math.min(contracts.length, 6) * 5 + Math.min(orders.length, 6) * 3);
  const supplyScore = clampPortraitScore(30 + ((receivable?.top5_ratio_pct ?? 0) > 0.65 ? 18 : 8));
  const marketScore = clampPortraitScore(36 + (publicRisks.length ? 12 : 0));
  const identityScore = clampPortraitScore(company.operating_status ? 28 : 48);
  const licenseScore = clampPortraitScore(profileAttributes.length ? 44 : 56);
  const reputationScore = clampPortraitScore(32 + Math.min(publicRisks.length, 4) * 8);

  const configs = [
    {
      id: "03",
      score: legalScore,
      sufficiency: estimatePortraitSufficiency([publicRisks, cases]),
      summary: publicRisks.length || cases.length
        ? `共识别公开风险 ${publicRisks.length} 条、涉诉/案件 ${cases.length} 条，需要优先核验法律与执行风险。`
        : "当前未读取到公开风险或案件记录，法律风险信号相对有限。",
      keyMetrics: [`公开风险 ${publicRisks.length} 条`, `案件 ${cases.length} 条`, `重点核验 ${publicRisks[0]?.title || "暂无"}`],
      evidenceSources: ["公开风险信息", "案件/涉诉记录", "尽调案例信息"],
    },
    {
      id: "04",
      score: complianceScore,
      sufficiency: estimatePortraitSufficiency([validationFindings]),
      summary: validationFindings.length
        ? `共识别核验发现 ${validationFindings.length} 条，其中需关注或失败项 ${validationFindings.filter((item) => item.status !== "pass").length} 条。`
        : "当前未读取到专项核验发现，合规核验信息仍待补充。",
      keyMetrics: [`核验发现 ${validationFindings.length} 条`, `预警 ${validationFindings.filter((item) => item.status === "warn").length} 条`, `失败 ${validationFindings.filter((item) => item.status === "fail").length} 条`],
      evidenceSources: ["校验发现清单", "尽调底稿"],
    },
    {
      id: "02",
      score: ownershipScore,
      sufficiency: estimatePortraitSufficiency([relatedCompanies, shareholdingChanges, people]),
      summary: `已识别关联企业 ${relatedCompanies.length} 家、股权变更 ${shareholdingChanges.length} 条、关键人员 ${people.length} 名。`,
      keyMetrics: [`关联企业 ${relatedCompanies.length} 家`, `股权变更 ${shareholdingChanges.length} 条`, `关键人员 ${people.length} 名`],
      evidenceSources: ["关联企业清单", "股权变更记录", "人员角色信息"],
    },
    {
      id: "06",
      score: cashflowScore,
      sufficiency: estimatePortraitSufficiency([metrics.operating_cash_flow, metrics.asset_liability_ratio, metrics.interest_coverage_ratio]),
      summary: "根据经营现金流、杠杆与利息保障倍数综合判断当前偿债与现金流风险。",
      keyMetrics: [`经营现金流 ${formatCurrency(metrics.operating_cash_flow)}`, `资产负债率 ${formatPercent(metrics.asset_liability_ratio)}`, `利息保障倍数 ${formatMultiple(metrics.interest_coverage_ratio)}`],
      evidenceSources: ["财务指标", "银行结算摘要"],
    },
    {
      id: "05",
      score: revenueScore,
      sufficiency: estimatePortraitSufficiency([receivable, metrics.gross_margin_pct, metrics.net_profit]),
      summary: "根据应收质量、客户集中度和毛利波动判断收入质量与回款压力。",
      keyMetrics: [`应收账款 ${formatCurrency(metrics.accounts_receivable)}`, `前五客户集中度 ${formatPercent(receivable?.top5_ratio_pct)}`, `毛利率 ${formatPercent(metrics.gross_margin_pct)}`],
      evidenceSources: ["财务指标", "应收快照", "订单与发票"],
    },
    {
      id: "07",
      score: relatedScore,
      sufficiency: estimatePortraitSufficiency([relatedTransactions, relatedCompanies]),
      summary: relatedTransactions.length
        ? `已读取关联交易 ${relatedTransactions.length} 条，需重点核验关联往来与定价公允性。`
        : "当前未读取到关联交易摘要，关联交易风险识别信息较少。",
      keyMetrics: [`关联交易 ${relatedTransactions.length} 条`, `关联企业 ${relatedCompanies.length} 家`, `担保相关人员 ${people.filter((item) => item.is_guarantor).length} 名`],
      evidenceSources: ["关联交易摘要", "关联企业清单"],
    },
    {
      id: "09",
      score: contractScore,
      sufficiency: estimatePortraitSufficiency([contracts, orders]),
      summary: `已读取合同 ${contracts.length} 份、订单 ${orders.length} 条，可据此查看履约与回款链路。`,
      keyMetrics: [`合同 ${contracts.length} 份`, `订单 ${orders.length} 条`, `银行大额交易 ${bankSummary?.large_transaction_count ?? "—"} 笔`],
      evidenceSources: ["合同清单", "订单数据", "银行摘要"],
    },
    {
      id: "08",
      score: supplyScore,
      sufficiency: estimatePortraitSufficiency([receivable, orders]),
      summary: "根据客户集中度、订单数量和回款表现判断供应链与客户集中风险。",
      keyMetrics: [`前五客户集中度 ${formatPercent(receivable?.top5_ratio_pct)}`, `订单 ${orders.length} 条`, `回款异常 ${receivable?.overdue_over_90d_cny ? formatCurrency(receivable.overdue_over_90d_cny) : "—"}`],
      evidenceSources: ["应收快照", "订单数据"],
    },
    {
      id: "11",
      score: marketScore,
      sufficiency: estimatePortraitSufficiency([company.industry_category, publicRisks]),
      summary: `企业所属行业为 ${formatCompanyIndustry(company)}，市场与行业风险结合公开风险事件综合判断。`,
      keyMetrics: [`所属行业 ${formatCompanyIndustry(company)}`, `公开风险 ${publicRisks.length} 条`, `企业规模 ${compactText(localizeText(company.enterprise_scale), "—")}`],
      evidenceSources: ["企业主体信息", "公开风险信息"],
    },
    {
      id: "01",
      score: identityScore,
      sufficiency: estimatePortraitSufficiency([company.unified_social_credit_code, company.operating_status]),
      summary: `主体状态为 ${formatOperatingStatus(company.operating_status) === "—" ? "暂无数据" : formatOperatingStatus(company.operating_status)}，统一社会信用代码${company.unified_social_credit_code ? "已读取" : "未读取"}。`,
      keyMetrics: [`主体状态 ${formatOperatingStatus(company.operating_status) === "—" ? "暂无数据" : formatOperatingStatus(company.operating_status)}`, `统一社会信用代码 ${company.unified_social_credit_code ? "已读取" : "未读取"}`, `注册地 ${compactText(company.region_city || company.region_province, "暂无数据")}`],
      evidenceSources: ["企业主体信息"],
    },
    {
      id: "10",
      score: licenseScore,
      sufficiency: estimatePortraitSufficiency([profileAttributes]),
      summary: profileAttributes.length
        ? `已读取补充画像/资质属性 ${profileAttributes.length} 条，可继续核验资质许可与备案覆盖情况。`
        : "当前未读取到资质许可或补充画像属性，合规资质维度信息不足。",
      keyMetrics: [`画像属性 ${profileAttributes.length} 条`, `材料上传 ${detail.due_diligence_materials?.length ?? 0} 份`, `知识依据 ${state.knowledgeBase?.files?.length ?? 0} 份`],
      evidenceSources: ["画像属性", "材料上传清单"],
    },
    {
      id: "12",
      score: reputationScore,
      sufficiency: estimatePortraitSufficiency([publicRisks]),
      summary: publicRisks.length
        ? `当前根据公开风险与舆情类事件识别声誉影响，已归集 ${publicRisks.length} 条相关信息。`
        : "当前未读取到舆情或公开风险信息，声誉风险信号较少。",
      keyMetrics: [`公开风险 ${publicRisks.length} 条`, `重点事件 ${publicRisks[0]?.title || "暂无"}`, `最近更新 ${getCompanyUpdatedAtValue(company) || "暂无数据"}`],
      evidenceSources: ["公开风险信息"],
    },
  ];

  const modules = configs.map((config) => createRiskModule(company.name, {
    ...config,
    level: getPortraitLevelByScore(config.score, config.sufficiency),
  }));
  return modules;
}

function buildPortraitCompanyDetail(company, detail) {
  const modules = buildPortraitModulesFromDetail(company, detail);
  const derivedScore = modules.length ? Math.round(modules.reduce((sum, item) => sum + item.score, 0) / modules.length) : null;
  return {
    ...mapCompanyToPortraitListItem(company),
    modules,
    portraitScore: derivedScore,
    riskLevel: getCompanyRiskLevelLabel(company) || getPortraitLevelByScore(derivedScore || 45, 1),
  };
}

function renderRiskSeverityBadge(level) {
  const severity = getRiskSeverity(level);
  return `<span class="risk-badge ${severity.badgeClass}">${escapeHtml(level)}</span>`;
}

function formatCompanyIndustry(company) {
  return compactText(company?.industry_label || company?.industry || company?.subindustry || company?.industry_category, "待补行业");
}

function formatCurrentDisplayTime(index = 0) {
  const now = new Date();
  const display = new Date(now);
  display.setHours(9 + (index % 6), 8 + ((index * 11) % 50), 0, 0);
  const year = display.getFullYear();
  const month = String(display.getMonth() + 1).padStart(2, "0");
  const day = String(display.getDate()).padStart(2, "0");
  const hour = String(display.getHours()).padStart(2, "0");
  const minute = String(display.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function getCompanyTaskUpdatedAt(company, index = 0) {
  return company?.taskUpdatedAt
    || company?.task_updated_at
    || company?.lastUpdated
    || company?.last_updated
    || company?.reportUpdatedAt
    || company?.report_updated_at
    || company?.updatedAt
    || company?.updated_at
    || formatCurrentDisplayTime(index);
}

function getDueTaskGenerationState(companyCode) {
  if (!companyCode) return {};
  return state.dueTaskGenerationByCompany[companyCode] || {};
}

function updateDueTaskGenerationState(companyCode, patch) {
  if (!companyCode) return;
  state.dueTaskGenerationByCompany[companyCode] = {
    ...getDueTaskGenerationState(companyCode),
    ...patch,
  };
}

function hasCompletedDueTaskReport(company) {
  const companyCode = company?.company_code || company?.companyCode || company?.id;
  if (getDueTaskGenerationState(companyCode).reportGenerated) return true;
  const statusCandidates = [
    company?.reportStatus,
    company?.report_status,
    company?.taskStatus,
    company?.task_status,
  ]
    .filter(Boolean)
    .map((item) => String(item).toLowerCase());
  if (company?.reportGenerated === true || company?.report_generated === true || company?.hasReport === true || company?.has_report === true) {
    return true;
  }
  if (statusCandidates.some((item) => ["completed", "generated", "done", "ready"].includes(item))) {
    return true;
  }
  const detail = getCompanyDetail(companyCode);
  if (detail?.report_generated === true || detail?.has_report === true) {
    return true;
  }
  return false;
}

function getSelectionCompanies() {
  const source = state.companies?.length
    ? state.companies
    : portraitWorkbenchCompanies.map((item) => ({
        company_code: item.companyCode || item.id,
        name: item.name,
        overview: item.modules.find((module) => module.summary)?.summary || "",
        risk_tier: item.riskLevel,
        subindustry: item.industry,
        industry_category: item.industry,
      }));

  return dedupeBy(
    source.map((company, index) => {
      const companyCode = company.company_code || company.companyCode || company.id;
      const portraitCompany = portraitWorkbenchCompanies.find((item) => item.companyCode === companyCode || item.id === companyCode);
      return {
        ...company,
        company_code: companyCode,
        industry_label: portraitCompany?.industry || company.subindustry || company.industry_category || company.industry,
        risk_level_label: portraitCompany?.riskLevel || formatRiskTier(company.risk_tier),
        riskScore: portraitCompany?.riskScore || getRiskScore(company),
        updatedAt: getCompanyTaskUpdatedAt(company, index),
        tags: portraitCompany?.tags || [],
      };
    }),
    (item) => item.company_code,
  );
}

function buildDueTaskTimeline(taskState, company) {
  if (taskState.reportCompleted) {
    return [
      { time: "10:36:00", title: "尽调报告生成完成", note: "当前企业已进入可查看报告状态" },
      { time: "10:31:00", title: "生成初步结论完成", note: "综合风险结论与建议已输出" },
      { time: "10:26:00", title: "关联网络穿透完成", note: "关联企业、交易与担保链路已校验" },
      { time: "10:21:00", title: "财务与现金流分析完成", note: "关键财务指标与回款链路已整合" },
      { time: "10:16:00", title: "工商/司法数据归集完成", note: `${company?.name || "当前企业"} 相关主体底稿已归集` },
    ];
  }
  if (taskState.portraitGenerated) {
    return [
      { time: "10:34:00", title: "企业画像生成完成", note: "当前企业画像已就绪，等待生成尽调报告" },
      { time: "10:27:00", title: "关联网络穿透完成", note: "关联企业、交易与担保链路已校验" },
      { time: "10:22:00", title: "舆情与事件扫描完成", note: "外部公开风险与事件线索已同步" },
      { time: "10:17:00", title: "财务与现金流分析完成", note: "关键财务指标与现金流压力已评估" },
      { time: "10:12:00", title: "工商/司法数据归集完成", note: `${company?.name || "当前企业"} 主体与底稿资料已齐备` },
    ];
  }
  return [
    { time: "10:32:00", title: "生成初步结论处理中", note: "正在汇总前五步结论，等待生成最终报告" },
    { time: "10:27:00", title: "关联网络穿透完成", note: "关联企业、交易与担保链路已校验" },
    { time: "10:22:00", title: "舆情与事件扫描完成", note: "外部公开风险与事件线索已同步" },
    { time: "10:17:00", title: "财务与现金流分析完成", note: "关键财务指标与现金流压力已评估" },
    { time: "10:12:00", title: "工商/司法数据归集完成", note: `${company?.name || "当前企业"} 主体与底稿资料已齐备` },
  ];
}

function buildDueTaskState(company, index = 0) {
  const companyCode = company.company_code || company.companyCode || company.id;
  const generationState = getDueTaskGenerationState(companyCode);
  const portraitGenerated = Boolean(generationState.portraitGenerated);
  const reportCompleted = hasCompletedDueTaskReport(company);
  const riskScore = company.riskScore || 60;
  const progress = reportCompleted ? 100 : portraitGenerated ? 92 : 85;
  const phase = reportCompleted ? "生成报告完成" : portraitGenerated ? "企业画像已生成" : "生成初步结论中";
  const step6State = reportCompleted ? "done" : "running";
  const steps = dueTaskStepBlueprints.map((step, stepIndex) => {
    const stepNumber = stepIndex + 1;
    const stateName = stepNumber <= 5 ? "done" : step6State;
    const pct = stateName === "done" ? 100 : stepNumber === 6 && portraitGenerated ? 50 : 58;
    return {
      index: stepNumber,
      title: step.title,
      tasks: step.tasks,
      pct,
      state: stateName,
      status: stateName === "done" ? "已完成" : "运行中",
      desc: stateName === "done"
        ? (stepNumber === 6 ? "报告生成完成" : "核验完成")
        : stepNumber === 6 && portraitGenerated
          ? "企业画像已生成"
        : "结论整理中",
      portraitGenerated,
      reportGenerated: reportCompleted,
    };
  });
  return {
    ...company,
    company_code: companyCode,
    portraitGenerated,
    reportCompleted,
    progress,
    phase,
    highRiskCount: Math.max(1, Math.round(riskScore / 38)),
    updatedAt: getCompanyTaskUpdatedAt(company, index),
    actionLabel: reportCompleted ? "查看报告" : portraitGenerated ? "继续生成报告" : "进入任务",
    liveLabel: reportCompleted ? "报告已生成" : portraitGenerated ? "企业画像已生成" : "AI 自动尽调中",
    steps,
    timeline: buildDueTaskTimeline({ portraitGenerated, reportCompleted }, company),
  };
}

function getDueTaskCompanies() {
  return getSelectionCompanies().slice(0, 8).map((company, index) => buildDueTaskState(company, index));
}

function getDueTaskCompaniesFiltered() {
  const keyword = state.taskBoardSearchKeyword.trim().toLowerCase();
  return getDueTaskCompanies().filter((company) => {
    const name = String(company.name || "").toLowerCase();
    const industry = formatCompanyIndustry(company).toLowerCase();
    const code = String(company.company_code || "").toLowerCase();
    return !keyword || name.includes(keyword) || industry.includes(keyword) || code.includes(keyword);
  });
}

function getSelectedDueTaskCompany() {
  const companies = getDueTaskCompanies();
  return companies.find((item) => item.company_code === state.taskBoardCompanyCode) || companies[0] || null;
}

function getSelectedReportConfig() {
  return reportCenterCatalog.find((item) => item.id === state.reportCenterReportTypeId) || reportCenterCatalog[0];
}

function getReportCenterCompaniesFiltered() {
  const keyword = state.reportCenterSearchKeyword.trim().toLowerCase();
  const source = Array.isArray(state.companies) ? state.companies : [];
  return source.filter((company) => {
    const name = String(company.name || "").toLowerCase();
    const industry = formatCompanyIndustry(company).toLowerCase();
    const code = String(company.company_code || "").toLowerCase();
    return !keyword || name.includes(keyword) || industry.includes(keyword) || code.includes(keyword);
  });
}

function getReportCompanyStatus(config, company, index = 0) {
  const cachedDetail = getCompanyDetail(company.company_code);
  const hasReportVersion = Boolean(cachedDetail?.report_versions?.length);
  if (config.id === "due-diligence") {
    if (hasReportVersion) return { label: "已生成", className: "is-ready", note: "可编辑 / 可预审" };
    if (company.data_mode === "skill_pipeline" || company.data_mode === "skill_poc" || company.data_mode === "full_case") {
      return { label: "可生成", className: "is-running", note: "资料已就绪" };
    }
    return { label: "待生成", className: "is-pending", note: "待补资料" };
  }
  if (config.id === "credit-rating") {
    const score = getRiskScore(company);
    return score >= 78
      ? { label: "生成中", className: "is-running", note: "评分收敛中" }
      : { label: "待队列", className: "is-pending", note: "等待尽调输入" };
  }
  if (config.id === "credit-plan") {
    return company.recommendation_status === "approve"
      ? { label: "可输出", className: "is-ready", note: "额度联动就绪" }
      : { label: "待评级", className: "is-pending", note: "等待评级结果" };
  }
  if (config.id === "investigation-report") {
    return index === 0
      ? { label: "排版中", className: "is-running", note: "封面与目录生成中" }
      : { label: "待定稿", className: "is-pending", note: "等待尽调定稿" };
  }
  return getRiskScore(company) >= 70
    ? { label: "待校验", className: "is-running", note: "放款要件预组装" }
    : { label: "待审批", className: "is-pending", note: "等待授信审批" };
}

function renderReportTemplatePreview(company, statusMeta, options = {}) {
  const detailMode = Boolean(options.detail);
  const title = options.title || "尽调报告";
  const subtitle = options.subtitle || statusMeta.note || "待补资料";
  const companyName = company?.name || "目标企业";
  const industry = formatCompanyIndustry(company);
  return `
    <div class="report-template-preview${detailMode ? " report-template-preview--detail" : ""}">
      <div class="report-template-preview__ambient"></div>
      <div class="report-template-preview__glass">
        <div class="report-template-preview__head">
          <span class="report-template-preview__type">${escapeHtml(title)}</span>
          <span class="report-template-preview__status ${statusMeta.className}">${escapeHtml(statusMeta.label)}</span>
        </div>
        <div class="report-template-preview__body">
          <strong>${escapeHtml(companyName)}</strong>
          <p>${escapeHtml(subtitle)}</p>
          <div class="report-template-preview__lines">
            <i></i><i></i><i></i><i></i>
          </div>
        </div>
        <div class="report-template-preview__foot">
          <span>${escapeHtml(industry)}</span>
          ${company?.operating_status ? `<em>${escapeHtml(formatOperatingStatus(company.operating_status))}</em>` : ""}
        </div>
      </div>
    </div>
  `;
}

function renderReportCompanyCardSkeleton() {
  return `
    <div class="report-company-card report-company-card--skeleton" aria-hidden="true">
      <div class="report-template-preview report-template-preview--skeleton">
        <div class="report-template-preview__glass">
          <div class="report-skeleton-line report-skeleton-line--short"></div>
          <div class="report-skeleton-line report-skeleton-line--title"></div>
          <div class="report-skeleton-line report-skeleton-line--mid"></div>
          <div class="report-template-preview__lines">
            <i></i><i></i><i></i><i></i>
          </div>
        </div>
      </div>
      <div class="report-company-card__meta">
        <span class="report-skeleton-line report-skeleton-line--company"></span>
        <span class="report-skeleton-line report-skeleton-line--meta"></span>
      </div>
    </div>
  `;
}

function getRiskScore(company) {
  const tier = company?.risk_tier || "";
  if (tier === "medium_high" || tier === "high") return 88;
  if (tier === "medium") return 72;
  if (tier === "low") return 42;
  return 62;
}

function getRiskTone(company) {
  const tier = company?.risk_tier || "";
  if (tier === "medium_high" || tier === "high") return "pressure";
  if (tier === "medium") return "watch";
  return "stable";
}

function getWatchIndustryGroup(industry = "") {
  const text = String(industry || "");
  if (/医药|医疗|生物|药|Healthcare|Medical/i.test(text)) {
    return { label: "医药 / 生物医药", className: "industry-purple" };
  }
  if (/食品|酒|白酒|饮|Food|Beverage/i.test(text)) {
    return { label: "食品酒饮", className: "industry-orange" };
  }
  if (/能源|新能源|储能|材料|Energy|Material/i.test(text)) {
    return { label: "能源 / 材料", className: "industry-green" };
  }
  if (/工业|制造|传感|智能|装备|软件|半导体|芯片|汽车|Industrial|Manufacturing|Equipment|Software|SaaS|IoT/i.test(text)) {
    return { label: "工业传感器 / 智能制造", className: "industry-cyan" };
  }
  return { label: "其他行业", className: "industry-slate" };
}

function getWatchRiskLevel(company, portraitCompany) {
  if (portraitCompany?.riskLevel) return portraitCompany.riskLevel;
  return formatRiskTier(company?.risk_tier);
}

function getWatchLatestEvent(company, portraitCompany) {
  if (company?.company_code === DEMO_COMPANY_CODE) return "新增未披露担保风险待复核";
  if (portraitCompany?.tags?.length) return `${portraitCompany.tags[0]}信号持续监测`;
  const tier = company?.risk_tier || "";
  if (tier === "medium_high" || tier === "high") return "新增高优先级风险事件";
  if (tier === "medium") return "风险指标波动需跟踪";
  return "无重大变化";
}

function buildWatchlistCompanies() {
  const sourceCompanies = state.companies?.length
    ? state.companies
    : portraitWorkbenchCompanies.map((item) => ({
      company_code: item.companyCode,
      name: item.name,
      subindustry: item.industry,
      risk_tier: item.riskScore >= 80 ? "medium_high" : item.riskScore >= 60 ? "medium" : "low",
    }));
  const merged = sourceCompanies.map((company, index) => {
    const portraitCompany = portraitWorkbenchCompanies.find((item) => item.companyCode === company.company_code || item.id === company.company_code);
    const rawIndustry = portraitCompany?.industry || company.subindustry || company.industry_category || "其他行业";
    const industry = localizedPhrases[rawIndustry] || rawIndustry;
    const industryGroup = getWatchIndustryGroup(industry);
    const score = portraitCompany?.riskScore || getRiskScore(company);
    const radius = 12 + ((100 - score) * 0.46);
    const angle = (-90 + index * 47) * (Math.PI / 180);
    return {
      code: company.company_code || portraitCompany?.companyCode || `watch-${index}`,
      name: company.name || portraitCompany?.name || "未命名企业",
      industry,
      industryGroup,
      riskLevel: getWatchRiskLevel(company, portraitCompany),
      riskScore: score,
      riskTone: getRiskTone(company),
      latestEvent: getWatchLatestEvent(company, portraitCompany),
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius * 0.82,
    };
  });
  return merged.sort((a, b) => b.riskScore - a.riskScore).slice(0, 10);
}

function renderWatchlistRadarPoint(item) {
  const activeClass = item.code === state.watchlistFocusCode ? " is-active" : "";
  const dimmedClass = getWatchlistMode() !== "overview" && item.code !== state.watchlistFocusCode ? " is-dimmed" : "";
  const size = Math.max(13, Math.min(24, 10 + item.riskScore / 7));
  return `
    <button
      class="watch-radar-point ${item.industryGroup.className} ${item.riskTone}${activeClass}${dimmedClass}"
      type="button"
      style="--x:${item.x.toFixed(1)}%; --y:${item.y.toFixed(1)}%; --point-size:${size.toFixed(1)}px;"
      data-action="open-watchlist-company"
      data-company-code="${escapeHtml(item.code)}"
      aria-label="打开${escapeHtml(item.name)}风险详情"
    >
      <span class="watch-radar-point__core"></span>
      <span class="watch-radar-point__tooltip">
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml(item.industry)}</small>
        <em>${escapeHtml(item.riskLevel)} · ${escapeHtml(item.latestEvent)}</em>
      </span>
    </button>
  `;
}

function renderWatchlistIndustryGroups(items) {
  const groups = items.reduce((result, item) => {
    const key = item.industryGroup.label;
    if (!result.has(key)) result.set(key, { meta: item.industryGroup, items: [] });
    result.get(key).items.push(item);
    return result;
  }, new Map());
  return Array.from(groups.values())
    .map((group) => `
      <article class="watch-industry-group">
        <div class="watch-industry-group__head">
          <span class="watch-industry-dot ${group.meta.className}"></span>
          <strong>${escapeHtml(group.meta.label)}</strong>
        </div>
        <div class="watch-industry-group__list">
          ${group.items
            .map((item) => `
              <button
                class="watch-company-row${item.code === state.watchlistFocusCode ? " is-active" : ""}"
                type="button"
                data-action="focus-watchlist-company"
                data-company-code="${escapeHtml(item.code)}"
              >
                <span>
                  <strong>${escapeHtml(item.name)}</strong>
                  <small>${escapeHtml(item.latestEvent)}</small>
                </span>
                <em>${escapeHtml(item.riskLevel)}</em>
              </button>
            `)
            .join("")}
        </div>
      </article>
    `)
    .join("");
}

function getWatchlistBaseCompany(companyCode) {
  return getSelectionCompanies().find((item) => item.company_code === companyCode) || null;
}

function getWatchlistSeed(value = "") {
  return Array.from(String(value)).reduce((sum, char, index) => sum + (char.charCodeAt(0) * (index + 3)), 0);
}

function clampWatchlistNumber(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function offsetWatchlistDisplayTime(baseValue, hoursBack = 0) {
  const fallback = new Date();
  const baseDate = baseValue ? new Date(String(baseValue).replace(/-/g, "/")) : fallback;
  const safeDate = Number.isNaN(baseDate.getTime()) ? fallback : baseDate;
  safeDate.setHours(safeDate.getHours() - hoursBack);
  const month = String(safeDate.getMonth() + 1).padStart(2, "0");
  const day = String(safeDate.getDate()).padStart(2, "0");
  const hour = String(safeDate.getHours()).padStart(2, "0");
  const minute = String(safeDate.getMinutes()).padStart(2, "0");
  return `${month}/${day} ${hour}:${minute}`;
}

function getWatchlistLevelByScore(score) {
  return getPortraitLevelByScore(score, 1);
}

function getWatchlistPreviousLevel(currentScore, seed, alertCount = 0) {
  const previousScore = clampWatchlistNumber(currentScore - (8 + (seed % 9) + alertCount * 3), 24, 90);
  return getWatchlistLevelByScore(previousScore);
}

function buildWatchlistAlertFeed(item, baseCompany, detail, modules) {
  const alerts = [];
  const updatedAt = getCompanyUpdatedAtValue(baseCompany) || getCompanyTaskUpdatedAt(baseCompany);

  (detail?.public_risks || []).slice(0, 2).forEach((risk, index) => {
    alerts.push({
      time: offsetWatchlistDisplayTime(updatedAt, index * 3),
      severity: item.riskLevel,
      title: compactText(risk.title, "公开风险事件"),
      summary: compactText(risk.summary || risk.description || risk.source, item.latestEvent),
    });
  });

  (detail?.validation_findings || []).filter((finding) => finding.status !== "pass").slice(0, 2).forEach((finding, index) => {
    alerts.push({
      time: offsetWatchlistDisplayTime(updatedAt, 5 + index * 2),
      severity: finding.status === "fail" ? "高风险" : "中风险",
      title: compactText(finding.title || finding.field_label, "核验预警"),
      summary: compactText(finding.message || finding.description, "关键校验项出现异常，需要人工复核。"),
    });
  });

  if (!alerts.length && modules.length) {
    modules.slice(0, 3).forEach((module, index) => {
      alerts.push({
        time: offsetWatchlistDisplayTime(updatedAt, index * 4),
        severity: module.level || item.riskLevel,
        title: module.title,
        summary: compactText(module.summary, item.latestEvent),
      });
    });
  }

  if (!alerts.length) {
    alerts.push({
      time: offsetWatchlistDisplayTime(updatedAt, 0),
      severity: item.riskLevel,
      title: "风险状态更新",
      summary: item.latestEvent,
    });
  }

  return alerts.slice(0, 5);
}

function buildWatchlistTrendData(item, peerMedianScore) {
  const labels = ["3/25 - 3/31", "4/1 - 4/7", "4/8 - 4/14", "4/15 - 4/21", "4/22 - 4/28", "4/29 - 5/5", "5/6 - 5/12", "5/13 - 5/20"];
  const seed = getWatchlistSeed(item.code);
  const risk = labels.map((_, index) => {
    if (index === labels.length - 1) return item.riskScore;
    const drift = (labels.length - 1 - index) * 2.4;
    const wave = ((seed + index * 7) % 9) - 4;
    return clampWatchlistNumber(item.riskScore - drift + wave, 28, 96);
  });
  const alertHeat = labels.map((_, index) => {
    const base = item.riskScore >= 80 ? 5 : item.riskScore >= 60 ? 4 : 2;
    return clampWatchlistNumber(base + (((seed + index * 5) % 5) - 2), 1, 7);
  });
  const peer = labels.map((_, index) => clampWatchlistNumber(peerMedianScore + (((seed + index * 3) % 7) - 3), 24, 92));
  return { labels, risk, alertHeat, peer };
}

function buildWatchlistSuggestions(item, modules, alertFeed) {
  const moduleActions = modules.map((module) => ({
    title: module.title,
    text: compactText(module.recommendedAction || module.aiInterpretation, "建议围绕最新风险信号补充核验材料。"),
  }));
  const suggestions = [
    {
      title: "优先核验",
      text: alertFeed[0]?.summary || `${item.name} 当前存在${item.riskLevel}信号，建议先复核最新预警所涉材料。`,
    },
    ...moduleActions.slice(0, 2),
  ];
  return suggestions.slice(0, 3);
}

function buildWatchlistPeerSnapshot(item, watched) {
  const peers = watched.filter((peer) => peer.industryGroup.label === item.industryGroup.label);
  const distribution = {
    high: peers.filter((peer) => ["极高风险", "高风险"].includes(peer.riskLevel)).length,
    medium: peers.filter((peer) => peer.riskLevel === "中风险").length,
    low: peers.filter((peer) => ["低风险", "信息不足"].includes(peer.riskLevel)).length,
  };
  const peerMedianScore = peers.length
    ? Math.round(peers.reduce((sum, peer) => sum + peer.riskScore, 0) / peers.length)
    : item.riskScore;
  return {
    peers,
    peerMedianScore,
    ranking: `${peers.filter((peer) => peer.riskScore > item.riskScore).length + 1}/${peers.length || 1}`,
    distribution,
  };
}

function buildWatchlistInsight(item, watched) {
  if (!item) return null;
  const baseCompany = getWatchlistBaseCompany(item.code) || {
    company_code: item.code,
    name: item.name,
    industry_label: item.industry,
    risk_level_label: item.riskLevel,
    riskScore: item.riskScore,
    updatedAt: formatCurrentDisplayTime(),
  };
  const detail = getCompanyDetail(item.code);
  const portraitDetail = detail ? buildPortraitCompanyDetail(baseCompany, detail) : null;
  const modules = portraitDetail?.modules?.length
    ? [...portraitDetail.modules].sort((a, b) => b.score - a.score)
    : (portraitWorkbenchCompanies.find((company) => company.companyCode === item.code || company.id === item.code)?.modules || []);
  const peerSnapshot = buildWatchlistPeerSnapshot(item, watched);
  const alertFeed = buildWatchlistAlertFeed(item, baseCompany, detail, modules);
  const seed = getWatchlistSeed(item.code);
  const previousLevel = getWatchlistPreviousLevel(item.riskScore, seed, alertFeed.length);
  const trend = buildWatchlistTrendData(item, peerSnapshot.peerMedianScore);
  const reasons = modules.length
    ? modules.slice(0, 3).map((module) => ({
      title: module.title,
      text: compactText(module.summary, "该维度需要持续观察。"),
      severity: module.level || item.riskLevel,
    }))
    : [
      { title: "最新预警事件", text: item.latestEvent, severity: item.riskLevel },
      { title: "行业风险暴露", text: `${item.industry} 当前监测热度较高，需要同步观察同行业波动。`, severity: item.riskLevel },
      { title: "风险跟踪建议", text: "建议结合尽调底稿与最新经营数据，核验风险是否向现金流或治理层面传导。", severity: "中风险" },
    ];
  return {
    ...item,
    baseCompany,
    detail,
    modules,
    alertFeed,
    reasons,
    suggestions: buildWatchlistSuggestions(item, modules, alertFeed),
    previousLevel,
    levelChangeText: previousLevel === item.riskLevel ? `维持${item.riskLevel}` : `${previousLevel} → ${item.riskLevel}`,
    updatedAt: getCompanyUpdatedAtValue(baseCompany) || formatCurrentDisplayTime(),
    trend,
    peerSnapshot,
    riskBandLabel: item.riskScore >= 80 ? "中心高压区" : item.riskScore >= 60 ? "重点跟踪区" : "外围观察区",
  };
}

function getWatchlistMode() {
  return state.watchlistPanelMode || "overview";
}

function renderWatchlistCompanyList(items) {
  return items
    .map((item) => `
      <button
        class="watch-company-row${item.code === state.watchlistFocusCode ? " is-active" : ""}"
        type="button"
        data-action="expand-watchlist-analysis"
        data-company-code="${escapeHtml(item.code)}"
        aria-label="进入${escapeHtml(item.name)}预警详情页"
      >
        <span>
          <strong>${escapeHtml(item.name)}</strong>
          <small>${escapeHtml(item.latestEvent)}</small>
        </span>
        <span class="watch-company-row__side">
          <em>${escapeHtml(item.riskLevel)}</em>
          <span class="watch-row-action watch-row-action--accent">进入详情</span>
        </span>
      </button>
    `)
    .join("");
}

function renderWatchlistOverviewPanel(watched, focused) {
  const groups = watched.reduce((result, item) => {
    const key = item.industryGroup.label;
    if (!result.has(key)) result.set(key, { meta: item.industryGroup, items: [] });
    result.get(key).items.push(item);
    return result;
  }, new Map());
  return `
    <article class="glass-panel watchlist-side-panel watchlist-side-panel--overview watchlist-panel-enter">
      <div class="watch-side-head">
        <div>
          <p class="section-kicker">Industry Groups</p>
          <h3>行业企业清单</h3>
        </div>
        <span class="watch-side-count">共 ${watched.length} 家</span>
      </div>
      ${focused ? `
        <article class="watch-overview-focus-card">
          <div class="watch-overview-focus-card__head">
            <div>
              <span>当前高亮企业</span>
              <strong>${escapeHtml(focused.name)}</strong>
            </div>
            ${renderRiskSeverityBadge(focused.riskLevel)}
          </div>
          <p>${escapeHtml(focused.latestEvent)}</p>
          <div class="watch-overview-focus-card__actions">
            <button class="ghost-action" type="button" data-action="open-watchlist-company" data-company-code="${escapeHtml(focused.code)}">查看预警详情</button>
            <button class="primary-action" type="button" data-action="expand-watchlist-analysis" data-company-code="${escapeHtml(focused.code)}">展开完整预警分析</button>
          </div>
        </article>
      ` : ""}
      <div class="watchlist-side-scroll">
        ${Array.from(groups.values())
          .map((group) => `
            <article class="watch-industry-group">
              <div class="watch-industry-group__head">
                <span class="watch-industry-dot ${group.meta.className}"></span>
                <strong>${escapeHtml(group.meta.label)}</strong>
              </div>
              <div class="watch-industry-group__list">
                ${renderWatchlistCompanyList(group.items)}
              </div>
            </article>
          `)
          .join("")}
      </div>
    </article>
  `;
}

function renderWatchlistReasonRows(reasons) {
  return reasons
    .map((reason) => `
      <article class="watch-reason-row">
        <div class="watch-reason-row__head">
          <strong>${escapeHtml(reason.title)}</strong>
          ${renderRiskSeverityBadge(reason.severity)}
        </div>
        <p>${escapeHtml(reason.text)}</p>
      </article>
    `)
    .join("");
}

function renderWatchlistSuggestionRows(suggestions) {
  return suggestions
    .map((item) => `
      <article class="watch-suggestion-row">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `)
    .join("");
}

function buildWatchlistAssistantSnapshot(watched, insight) {
  const highRisk = watched.filter((item) => ["极高风险", "高风险"].includes(item.riskLevel));
  const mediumRisk = watched.filter((item) => item.riskLevel === "中风险");
  const focusItems = watched
    .slice()
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 2)
    .map((item, index) => ({
      ...item,
      previousLevel: getWatchlistPreviousLevel(item.riskScore, getWatchlistSeed(item.code), index + 1),
    }));
  const recommendations = [
    {
      title: "重新发起尽调",
      note: `针对 ${escapeHtml(insight?.name || focusItems[0]?.name || "当前企业")} 的新增风险信号快速发起复核。`,
    },
    {
      title: "查看风险变化",
      note: "查看企业风险趋势与关键事件的联动变化。",
    },
    {
      title: "订阅周报",
      note: "每周一 9:00 推送监控摘要与预警要点。",
    },
  ];
  return {
    reminderTitle: `已发现 ${focusItems.length} 家企业风险等级上升，建议优先复核`,
    reminderText: `其中 ${highRisk.length || 1} 家处于高风险区，${mediumRisk.length || 1} 家处于重点跟踪区。`,
    focusItems,
    recommendations,
  };
}

function renderWatchlistAssistantRail(watched, insight) {
  const snapshot = buildWatchlistAssistantSnapshot(watched, insight);
  return `
    <aside class="watchlist-assistant-rail">
      <article class="glass-panel watch-ai-card watch-ai-card--overview">
        <div class="watch-ai-card__head">
          <div>
            <p class="section-kicker">尽职调查风险分析</p>
            <h3>辅助监控</h3>
          </div>
          <span>实时监控中</span>
        </div>
        <div class="watch-ai-card__highlight">
          <strong>${snapshot.reminderTitle}</strong>
          <p>${snapshot.reminderText}</p>
        </div>
      </article>
      <article class="glass-panel watch-ai-card watch-ai-card--stack watch-ai-card--focus">
        <div class="watch-analysis-section-head">
          <div>
            <h3>重点关注</h3>
            <p>优先查看最新风险等级抬升的企业。</p>
          </div>
        </div>
        <div class="watch-ai-focus-list">
          ${snapshot.focusItems
            .map((item) => `
              <button class="watch-ai-focus-item" type="button" data-action="focus-watchlist-company" data-company-code="${escapeHtml(item.code)}">
                <div class="watch-ai-focus-item__head">
                  ${renderRiskSeverityBadge(item.riskLevel)}
                  <strong>${escapeHtml(item.name)}</strong>
                </div>
                <p>风险等级：${escapeHtml(item.previousLevel)} → ${escapeHtml(item.riskLevel)}</p>
                <p>最新事件：${escapeHtml(item.latestEvent)}</p>
              </button>
            `)
            .join("")}
        </div>
      </article>
      <article class="glass-panel watch-ai-card watch-ai-card--stack watch-ai-card--recommend">
        <div class="watch-analysis-section-head">
          <div>
            <h3>为你推荐</h3>
            <p>结合当前监控结果给出下一步动作入口。</p>
          </div>
        </div>
        <div class="watch-ai-recommend-list">
          ${snapshot.recommendations
            .map((item) => `
              <button class="watch-ai-recommend-item" type="button">
                <span class="watch-ai-recommend-item__icon">→</span>
                <span>
                  <strong>${item.title}</strong>
                  <em>${item.note}</em>
                </span>
              </button>
            `)
            .join("")}
        </div>
      </article>
      <article class="glass-panel watch-ai-input-card">
        <div class="watch-ai-input-shell">
          <span>输入尽调问题...</span>
          <button type="button" aria-label="发送问题">➜</button>
        </div>
        <p>内容由 AI 生成，仅供参考</p>
      </article>
    </aside>
  `;
}

function renderWatchlistDetailPanel(insight) {
  if (!insight) return "";
  return `
    <article class="glass-panel watchlist-side-panel watchlist-side-panel--detail watchlist-panel-enter">
      <div class="watch-detail-head">
        <div>
          <p class="section-kicker">Enterprise Focus</p>
          <h3>企业风险详情</h3>
        </div>
        <button class="ghost-action" type="button" data-action="watchlist-back-overview">返回清单</button>
      </div>
      <div class="watch-detail-hero">
        <div>
          <div class="watch-detail-hero__title">
            <strong>${escapeHtml(insight.name)}</strong>
            ${renderRiskSeverityBadge(insight.riskLevel)}
          </div>
          <p>${escapeHtml(insight.industry)} · ${escapeHtml(insight.riskBandLabel)}</p>
        </div>
        <div class="watch-detail-score">
          <span>风险指数</span>
          <strong>${insight.riskScore}</strong>
        </div>
      </div>
      <div class="summary-stack watch-detail-summary">
        <div class="summary-item"><strong>当前风险等级</strong><span>${escapeHtml(insight.riskLevel)}</span></div>
        <div class="summary-item"><strong>风险等级变化</strong><span>${escapeHtml(insight.levelChangeText)}</span></div>
        <div class="summary-item"><strong>最新预警事件</strong><span>${escapeHtml(insight.alertFeed[0]?.title || insight.latestEvent)}</span></div>
      </div>
      <div class="divider"></div>
      <section class="watch-detail-block">
        <div class="watch-detail-block__head">
          <h4>关键风险原因</h4>
          <span>最近更新 ${escapeHtml(insight.updatedAt)}</span>
        </div>
        <div class="watch-detail-reasons">
          ${renderWatchlistReasonRows(insight.reasons)}
        </div>
      </section>
      <section class="watch-detail-block">
        <div class="watch-detail-block__head">
          <h4>AI处置建议</h4>
          <span>聚焦最新预警链路</span>
        </div>
        <div class="watch-detail-suggestions">
          ${renderWatchlistSuggestionRows(insight.suggestions)}
        </div>
      </section>
      <div class="button-row watch-detail-actions">
        <button class="primary-action" type="button" data-action="expand-watchlist-analysis">展开完整预警分析</button>
      </div>
    </article>
  `;
}

function buildWatchlistChartLine(values, width, height, minValue, maxValue) {
  const step = values.length > 1 ? width / (values.length - 1) : width;
  return values
    .map((value, index) => {
      const x = Number((step * index).toFixed(2));
      const safeMax = maxValue === minValue ? maxValue + 1 : maxValue;
      const ratio = (value - minValue) / (safeMax - minValue);
      const y = Number((height - (ratio * height)).toFixed(2));
      return `${x},${y}`;
    })
    .join(" ");
}

function renderWatchlistTrendChart(insight) {
  const width = 560;
  const height = 220;
  const allValues = [...insight.trend.risk, ...insight.trend.peer, ...insight.trend.alertHeat.map((value) => value * 12)];
  const minValue = Math.min(...allValues, 0);
  const maxValue = Math.max(...allValues, 100);
  const riskPoints = buildWatchlistChartLine(insight.trend.risk, width, height, minValue, maxValue);
  const peerPoints = buildWatchlistChartLine(insight.trend.peer, width, height, minValue, maxValue);
  const alertPoints = buildWatchlistChartLine(insight.trend.alertHeat.map((value) => value * 12), width, height, minValue, maxValue);
  return `
    <div class="watch-trend-card">
      <div class="watch-trend-card__head">
        <div>
          <h4>风险演变趋势</h4>
          <p>近 8 周风险指数、预警强度与同行业中位风险走势。</p>
        </div>
        <div class="watch-trend-legend">
          <span><i class="watch-trend-dot watch-trend-dot--risk"></i>企业风险指数</span>
          <span><i class="watch-trend-dot watch-trend-dot--alert"></i>预警强度</span>
          <span><i class="watch-trend-dot watch-trend-dot--peer"></i>同行业中位值</span>
        </div>
      </div>
      <div class="watch-trend-chart-shell">
        <svg viewBox="0 0 ${width} ${height}" class="watch-trend-chart" aria-hidden="true">
          <g class="watch-trend-grid">
            <line x1="0" y1="${height}" x2="${width}" y2="${height}"></line>
            <line x1="0" y1="${height * 0.75}" x2="${width}" y2="${height * 0.75}"></line>
            <line x1="0" y1="${height * 0.5}" x2="${width}" y2="${height * 0.5}"></line>
            <line x1="0" y1="${height * 0.25}" x2="${width}" y2="${height * 0.25}"></line>
            <line x1="0" y1="0" x2="${width}" y2="0"></line>
          </g>
          <polyline class="watch-trend-path watch-trend-path--peer" points="${peerPoints}"></polyline>
          <polyline class="watch-trend-path watch-trend-path--alert" points="${alertPoints}"></polyline>
          <polyline class="watch-trend-path watch-trend-path--risk" points="${riskPoints}"></polyline>
        </svg>
        <div class="watch-trend-axis">
          ${insight.trend.labels.map((label) => `<span>${escapeHtml(label)}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderWatchlistAlertTimeline(alertFeed) {
  return `
    <div class="watch-alert-list">
      ${alertFeed
        .map((alert) => `
          <article class="watch-alert-item">
            <div class="watch-alert-item__meta">
              <span>${escapeHtml(alert.time)}</span>
              ${renderRiskSeverityBadge(alert.severity)}
            </div>
            <strong>${escapeHtml(alert.title)}</strong>
            <p>${escapeHtml(alert.summary)}</p>
          </article>
        `)
        .join("")}
    </div>
  `;
}

function renderWatchlistAnalysisLayout(insight, watched) {
  return `
    <section class="watchlist-analysis-shell watchlist-panel-enter">
      <div class="page-title-row watchlist-analysis-title">
        <div>
          <p class="section-kicker">Enterprise Warning Analysis</p>
          <h2>${escapeHtml(insight.name)} · 企业级风险预警详情</h2>
          <p>围绕当前企业呈现最新风险等级、预警动态、趋势变化和处置建议，保持与总览雷达联动。</p>
        </div>
        <div class="button-row">
          <button class="ghost-action" type="button" data-action="collapse-watchlist-analysis">收起完整分析</button>
          <button class="ghost-action" type="button" data-action="watchlist-back-overview">返回总览</button>
        </div>
      </div>
      <div class="watchlist-analysis-layout">
        <aside class="watchlist-analysis-left">
          <article class="glass-panel watch-radar-card watch-radar-card--compact">
            <div class="watch-radar-head">
              <div>
                <p class="section-kicker">Enterprise Locator</p>
                <h3>当前企业定位</h3>
              </div>
              <div class="watch-radar-focus">
                <span>所属行业</span>
                <strong>${escapeHtml(insight.industry)}</strong>
              </div>
            </div>
            <div class="watch-radar-stage watch-radar-stage--compact" aria-label="企业风险雷达缩略图">
              <div class="watch-radar-grid"></div>
              <div class="watch-radar-rings"><span></span><span></span><span></span><span></span></div>
              <div class="watch-radar-axis watch-radar-axis--x"></div>
              <div class="watch-radar-axis watch-radar-axis--y"></div>
              <div class="watch-radar-sweep"></div>
              <div class="watch-radar-center">
                <strong>${escapeHtml(insight.riskLevel)}</strong>
                <span>${escapeHtml(insight.riskBandLabel)}</span>
              </div>
              ${watched.map((peer) => renderWatchlistRadarPoint(peer)).join("")}
            </div>
          </article>
          <article class="glass-panel watch-analysis-side-card">
            <div class="watch-analysis-side-card__head">
              <h4>企业定位摘要</h4>
              <span>行业内排名 ${escapeHtml(insight.peerSnapshot.ranking)}</span>
            </div>
            <div class="summary-stack">
              <div class="summary-item"><strong>企业名称</strong><span>${escapeHtml(insight.name)}</span></div>
              <div class="summary-item"><strong>当前风险等级</strong><span>${escapeHtml(insight.riskLevel)}</span></div>
              <div class="summary-item"><strong>最近更新</strong><span>${escapeHtml(insight.updatedAt)}</span></div>
            </div>
          </article>
          <article class="glass-panel watch-analysis-side-card">
            <div class="watch-analysis-side-card__head">
              <h4>同行业风险分布</h4>
              <span>${escapeHtml(insight.peerSnapshot.peers.length)} 家样本</span>
            </div>
            <div class="watch-peer-distribution">
              <div class="watch-peer-distribution__row"><span>高风险</span><strong>${insight.peerSnapshot.distribution.high}</strong></div>
              <div class="watch-peer-distribution__row"><span>中风险</span><strong>${insight.peerSnapshot.distribution.medium}</strong></div>
              <div class="watch-peer-distribution__row"><span>低风险 / 观察</span><strong>${insight.peerSnapshot.distribution.low}</strong></div>
            </div>
          </article>
        </aside>
        <div class="watchlist-analysis-right">
          <div class="watchlist-analysis-main">
            <article class="glass-panel watch-analysis-overview-card">
              <div class="watch-analysis-overview-card__head">
                <div>
                  <p class="section-kicker">Risk Overview</p>
                  <h3>企业风险概览</h3>
                </div>
                ${renderRiskSeverityBadge(insight.riskLevel)}
              </div>
              <div class="watch-analysis-overview-grid">
                <div class="watch-overview-metric">
                  <span>风险等级变化</span>
                  <strong>${escapeHtml(insight.levelChangeText)}</strong>
                </div>
                <div class="watch-overview-metric">
                  <span>最新预警事件</span>
                  <strong>${escapeHtml(insight.alertFeed[0]?.title || insight.latestEvent)}</strong>
                </div>
                <div class="watch-overview-metric">
                  <span>关键风险原因</span>
                  <strong>${escapeHtml(insight.reasons[0]?.title || "持续跟踪")}</strong>
                </div>
              </div>
              <div class="watch-analysis-overview-note">
                <p>${escapeHtml(insight.alertFeed[0]?.summary || insight.latestEvent)}</p>
              </div>
            </article>
            <article class="glass-panel watch-analysis-events-card">
              <div class="watch-analysis-section-head">
                <div>
                  <h3>预警动态</h3>
                  <p>按最新时间汇总当前企业的关键预警事件与核验提示。</p>
                </div>
              </div>
              ${renderWatchlistAlertTimeline(insight.alertFeed)}
            </article>
            <article class="glass-panel watch-analysis-trend-card">
              ${renderWatchlistTrendChart(insight)}
            </article>
          </div>
          <aside class="watchlist-analysis-assistant">
            <article class="glass-panel watch-ai-card">
              <div class="watch-ai-card__head">
                <div>
                  <p class="section-kicker">尽职调查风险分析</p>
                  <h3>处置建议</h3>
                </div>
                <span>实时监控中</span>
              </div>
              <div class="watch-ai-card__highlight">
                <strong>${escapeHtml(insight.reasons[0]?.title || "当前风险已更新")}</strong>
                <p>${escapeHtml(insight.suggestions[0]?.text || "建议先补充最新异常所涉底稿，并复核影响范围。")}</p>
              </div>
            </article>
            <article class="glass-panel watch-ai-card watch-ai-card--stack">
              <div class="watch-analysis-section-head">
                <div>
                  <h3>AI建议面板</h3>
                  <p>围绕当前企业给出优先复核路径。</p>
                </div>
              </div>
              <div class="watch-detail-suggestions">
                ${renderWatchlistSuggestionRows(insight.suggestions)}
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function buildMacroSignals() {
  const companies = state.companies || [];
  const highRisk = companies.filter((item) => ["medium_high", "high"].includes(item.risk_tier)).length;
  const mediumRisk = companies.filter((item) => item.risk_tier === "medium").length;
  const listed = companies.filter((item) => item.enterprise_scale === "listed").length;
  const industries = Array.from(new Set(companies.map((item) => item.industry_category || item.subindustry).filter(Boolean)));
  return { total: companies.length, highRisk, mediumRisk, listed, industries };
}

function render尽调智能体Persona(size = "large") {
  return `
    <div class="agent-persona agent-persona-${size}">
      <img src="${DILIGENCE_ASSISTANT_IMAGE}" alt="尽职调查风险分析" />
      <div class="persona-orbit persona-orbit-one"></div>
      <div class="persona-orbit persona-orbit-two"></div>
    </div>
  `;
}

function renderHomeHotspotPanel(hotspot) {
  if (!hotspot) {
    return `
      <div class="macro-hover-empty">
        <p class="section-kicker">区域风险洞察</p>
        <h3>把鼠标移到地图热点上</h3>
        <p>这里会展示对应区域的风险指数、重点城市和行业趋势。</p>
      </div>
    `;
  }

  return `
    <div class="macro-hover-card">
      <div class="macro-hover-head">
        <div>
          <p class="section-kicker">${escapeHtml(hotspot.label)}</p>
          <h3>${escapeHtml(hotspot.title)}</h3>
        </div>
        <div class="macro-hover-score">
          <strong>${escapeHtml(hotspot.score)}</strong>
          <span>${escapeHtml(hotspot.tone)}</span>
        </div>
      </div>
      <p class="macro-hover-summary">${escapeHtml(hotspot.summary)}</p>
      <div class="macro-hover-lists">
        <div class="hover-list-card">
          <h4>高风险城市 TOP3</h4>
          ${hotspot.cities
            .map(
              (item, index) => `
                <div class="hover-rank-row">
                  <span>${index + 1}</span>
                  <strong>${escapeHtml(item.name)}</strong>
                  <em>${escapeHtml(item.value)}</em>
                </div>
              `,
            )
            .join("")}
        </div>
        <div class="hover-list-card">
          <h4>行业风险热度</h4>
          ${hotspot.industries
            .map(
              (item) => `
                <div class="hover-bar-row">
                  <span>${escapeHtml(item.name)}</span>
                  <div class="hover-bar-track"><i style="width:${escapeHtml(item.value)}%"></i></div>
                  <em>${escapeHtml(item.value)}</em>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderHomeCommandSuggestions(resolution) {
  if (!resolution.input) return "";

  if (!resolution.company) {
    const exampleCompanies = getSmartNavCompaniesSource().slice(0, 6);
    return `
      <div class="agent-command-suggestion-layer is-empty">
        <div class="agent-command-suggestion-layer__hint">
          <strong>未找到匹配企业</strong>
          <span>未找到匹配企业，请尝试输入企业全称或简称。</span>
        </div>
        <div class="agent-command-suggestion-layer__examples">
          ${exampleCompanies
            .map(
              (item) => `
                <button
                  class="agent-command-example"
                  type="button"
                  data-action="fill-home-command-example"
                  data-example="${escapeHtml(item.name)}"
                >${escapeHtml(item.name)}</button>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  return `
    <div class="agent-command-suggestion-layer">
      <div class="agent-command-suggestion-layer__company">
        <div>
          <span class="agent-command-suggestion-layer__label">识别企业</span>
          <strong>${escapeHtml(resolution.company.name)}</strong>
        </div>
        <span class="agent-command-company-chip">${escapeHtml(resolution.company.industry)}</span>
      </div>
      <div class="agent-command-suggestion-list">
        ${resolution.suggestions
          .map(
            (item) => `
              <button
                class="agent-command-suggestion${item.isPrimary ? " is-primary" : ""}"
                type="button"
                data-action="open-home-smart-route"
                data-route-key="${item.routeKey}"
                data-company-id="${resolution.company.id}"
              >
                <strong>${item.label}</strong>
                <span>${item.description}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderSmartRouteActionGrid(company, activeRouteKey) {
  return `
    <div class="smart-route-action-grid">
      ${buildSmartNavActionSuggestions(company, activeRouteKey)
        .map(
          (item) => `
            <button
              class="smart-route-action-card${item.isPrimary ? " is-primary" : ""}"
              type="button"
              data-action="open-home-smart-route"
              data-route-key="${item.routeKey}"
              data-company-id="${company.id}"
            >
              <strong>${item.label}</strong>
              <span>${item.description}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderSmartRouteHero(company, routeKey, subtitle) {
  const routeMeta = smartNavRouteMeta[routeKey];
  return `
    <section class="smart-route-hero glass-card neon-border">
      <div class="smart-route-hero__copy">
        <div class="smart-route-hero__eyebrow">
          <span>${escapeHtml(routeMeta.label)}</span>
          <span>${escapeHtml(company.region)}</span>
        </div>
        <h2>${escapeHtml(company.name)}</h2>
        <p>${escapeHtml(subtitle || company.summary)}</p>
        <div class="smart-route-hero__chips">
          <span class="smart-route-chip">${escapeHtml(company.industry)}</span>
          <span class="smart-route-chip">${escapeHtml(company.riskLevel)} · ${company.riskScore}/100</span>
          <span class="smart-route-chip">前端 Mock 智能导航</span>
        </div>
      </div>
      <div class="smart-route-hero__aside">
        <strong>${escapeHtml(routeMeta.label)}</strong>
        <span>基于企业别名与关键词规则匹配</span>
      </div>
    </section>
  `;
}

function renderSmartCompanyProfile(company) {
  return `
    <section class="smart-route-shell">
      ${renderSmartRouteHero(company, "company-profile", "已识别企业主体，默认进入企业画像详情页。")}
      <div class="stats-grid smart-route-stats">
        <article class="metric-card"><strong class="metric-value">${company.riskScore}</strong><span class="metric-label">画像评分</span></article>
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.profile.dataCompleteness)}</strong><span class="metric-label">资料完整度</span></article>
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.riskLevel)}</strong><span class="metric-label">风险等级</span></article>
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.profile.updatedAt)}</strong><span class="metric-label">最近更新</span></article>
      </div>
      <div class="smart-route-layout">
        <article class="glass-panel smart-route-main-panel">
          <div class="smart-route-section-head">
            <h3>画像摘要</h3>
            <p>当前企业画像以主体、经营和财务三条主线展开。</p>
          </div>
          <div class="alert-stack">
            ${company.profile.highlights
              .map((item) => `<div class="alert-item medium"><strong>画像洞察</strong><span>${escapeHtml(item)}</span></div>`)
              .join("")}
          </div>
          <div class="card-grid smart-route-dimension-grid">
            ${company.profile.dimensions
              .map(
                (item) => `
                  <article class="summary-card smart-route-summary-card">
                    <strong>${escapeHtml(item.title)}</strong>
                    <p>${escapeHtml(item.desc)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </article>
        <aside class="glass-panel smart-route-side-panel">
          <div class="smart-route-section-head">
            <h3>可执行操作</h3>
            <p>继续跳转到其他模块页面。</p>
          </div>
          <div class="smart-route-tag-list">
            ${company.profile.tags.map((item) => `<span class="mini-tag">${escapeHtml(item)}</span>`).join("")}
          </div>
          ${renderSmartRouteActionGrid(company, "company-profile")}
        </aside>
      </div>
    </section>
  `;
}

function renderSmartInsightTasks(company) {
  return `
    <section class="smart-route-shell">
      ${renderSmartRouteHero(company, "insight-tasks", `已识别为${smartNavRouteMeta["insight-tasks"].label}意图，系统会带入企业参数发起任务。`)}
      <div class="stats-grid smart-route-stats">
        <article class="metric-card"><strong class="metric-value">${company.tasks.progress}%</strong><span class="metric-label">任务进度</span></article>
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.tasks.status)}</strong><span class="metric-label">任务状态</span></article>
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.tasks.phase)}</strong><span class="metric-label">当前阶段</span></article>
        <article class="metric-card"><strong class="metric-value">${company.tasks.findings.length}</strong><span class="metric-label">重点发现</span></article>
      </div>
      <div class="smart-route-layout">
        <article class="glass-panel smart-route-main-panel">
          <div class="smart-route-section-head">
            <h3>任务步骤</h3>
            <p>当前首页输入已作为智能任务入口，企业与任务意图会一起带入。</p>
          </div>
          <div class="smart-route-step-list">
            ${company.tasks.steps
              .map(
                (item, index) => `
                  <article class="smart-route-step-card">
                    <span class="smart-route-step-card__index">${index + 1}</span>
                    <div>
                      <strong>${escapeHtml(item.title)}</strong>
                      <em>${escapeHtml(item.status)}</em>
                      <p>${escapeHtml(item.note)}</p>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </article>
        <aside class="glass-panel smart-route-side-panel">
          <div class="smart-route-section-head">
            <h3>当前发现</h3>
            <p>适合作为继续下钻报告与预警的起点。</p>
          </div>
          <div class="suggestion-stack">
            ${company.tasks.findings
              .map((item) => `<div class="suggestion-card"><strong>任务提示</strong><span>${escapeHtml(item)}</span></div>`)
              .join("")}
          </div>
          ${renderSmartRouteActionGrid(company, "insight-tasks")}
        </aside>
      </div>
    </section>
  `;
}

function renderSmartDueDiligenceReport(company) {
  return `
    <section class="smart-route-shell">
      ${renderSmartRouteHero(company, "due-diligence-report", "已识别为尽调报告 / 授信报告意图，默认进入报告详情页。")}
      <div class="stats-grid smart-route-stats">
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.report.status)}</strong><span class="metric-label">报告状态</span></article>
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.report.updatedAt)}</strong><span class="metric-label">最近更新时间</span></article>
        <article class="metric-card"><strong class="metric-value">${company.report.sections.length}</strong><span class="metric-label">报告章节</span></article>
        <article class="metric-card"><strong class="metric-value">${company.report.highlights.length}</strong><span class="metric-label">关键提示</span></article>
      </div>
      <div class="smart-route-layout">
        <article class="glass-panel smart-route-main-panel">
          <div class="smart-route-section-head">
            <h3>报告概览</h3>
            <p>${escapeHtml(company.report.summary)}</p>
          </div>
          <div class="smart-route-outline-grid">
            ${company.report.sections
              .map(
                (item, index) => `
                  <article class="summary-card smart-route-outline-card">
                    <span>第 ${index + 1} 节</span>
                    <strong>${escapeHtml(item)}</strong>
                  </article>
                `,
              )
              .join("")}
          </div>
        </article>
        <aside class="glass-panel smart-route-side-panel">
          <div class="smart-route-section-head">
            <h3>报告提示</h3>
            <p>当前为前端 mock 详情页，后续可再接真实报告工作台。</p>
          </div>
          <div class="alert-stack">
            ${company.report.highlights
              .map((item) => `<div class="alert-item medium"><strong>报告提示</strong><span>${escapeHtml(item)}</span></div>`)
              .join("")}
          </div>
          ${renderSmartRouteActionGrid(company, "due-diligence-report")}
        </aside>
      </div>
    </section>
  `;
}

function renderSmartWatchlist(company) {
  return `
    <section class="smart-route-shell">
      ${renderSmartRouteHero(company, "watchlist-detail", "已识别为风险 / 预警 / 监控意图，默认进入监控预警详情页。")}
      <div class="stats-grid smart-route-stats">
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.watchlist.level)}</strong><span class="metric-label">预警等级</span></article>
        <article class="metric-card"><strong class="metric-value">${escapeHtml(company.watchlist.updatedAt)}</strong><span class="metric-label">最近监测</span></article>
        <article class="metric-card"><strong class="metric-value">${company.watchlist.alerts.length}</strong><span class="metric-label">预警条目</span></article>
        <article class="metric-card"><strong class="metric-value">${company.riskScore}</strong><span class="metric-label">风险评分</span></article>
      </div>
      <div class="smart-route-layout">
        <article class="glass-panel smart-route-main-panel">
          <div class="smart-route-section-head">
            <h3>监控摘要</h3>
            <p>${escapeHtml(company.watchlist.summary)}</p>
          </div>
          <div class="smart-route-alert-list">
            ${company.watchlist.alerts
              .map(
                (item) => `
                  <article class="smart-route-alert-card">
                    <span>${escapeHtml(item.time)}</span>
                    <strong>${escapeHtml(item.title)}</strong>
                    <p>${escapeHtml(item.detail)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </article>
        <aside class="glass-panel smart-route-side-panel">
          <div class="smart-route-section-head">
            <h3>下一步建议</h3>
            <p>从监控预警可继续回到画像、任务或报告链路。</p>
          </div>
          <div class="suggestion-card">
            <strong>优先动作</strong>
            <span>建议先核验最新预警对应证据，再回到洞察任务或尽调报告完成闭环。</span>
          </div>
          ${renderSmartRouteActionGrid(company, "watchlist-detail")}
        </aside>
      </div>
    </section>
  `;
}

function renderSmartNavigationPage() {
  const context = state.smartNavContext;
  const company = getSmartNavContextCompany();
  if (!context || !company) {
    contentAreaEl.innerHTML = `
      <section class="smart-route-shell">
        <div class="empty-state">
          <h3>未找到匹配企业</h3>
          <p>未找到匹配企业，请尝试输入企业全称或简称。</p>
        </div>
      </section>
    `;
    return;
  }

  if (context.routeKey === "insight-tasks") {
    contentAreaEl.innerHTML = renderSmartInsightTasks(company);
    return;
  }
  if (context.routeKey === "due-diligence-report") {
    contentAreaEl.innerHTML = renderSmartDueDiligenceReport(company);
    return;
  }
  if (context.routeKey === "watchlist-detail") {
    contentAreaEl.innerHTML = renderSmartWatchlist(company);
    return;
  }
  contentAreaEl.innerHTML = renderSmartCompanyProfile(company);
}

async function navigateToSmartRoute(routeKey, company, rawInput = state.homeCommandInput, replace = false) {
  if (!company || !smartNavRouteMeta[routeKey]) return;
  if (!applySmartSectionState(routeKey, company, { rawInput: String(rawInput || "").trim(), loading: true })) {
    state.homeCommandMessage = "当前企业暂无可复用的模块数据，无法直接跳转到现有详情页。";
    rerenderHomeCommandCard();
    return;
  }
  state.homeCommandMessage = "";
  syncLocationFromState(replace);
  render();
  await hydrateSmartSectionState(routeKey, company);
  render();
}

function bindHomeHotspots() {
  const mapStage = contentAreaEl.querySelector(".macro-map-stage");
  const panel = contentAreaEl.querySelector("#home-map-panel");
  const hotspotButtons = [...contentAreaEl.querySelectorAll("[data-home-hotspot]")];
  if (!mapStage || !panel || !hotspotButtons.length) return;

  const renderPanel = (hotspotId) => {
    state.homeHotspotId = hotspotId || null;
    const hotspot = homeRiskHotspots.find((item) => item.id === state.homeHotspotId) || null;
    panel.innerHTML = renderHomeHotspotPanel(hotspot);
    hotspotButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.homeHotspot === state.homeHotspotId);
    });
  };

  hotspotButtons.forEach((button) => {
    const hotspotId = button.dataset.homeHotspot;
    button.addEventListener("mouseenter", () => renderPanel(hotspotId));
    button.addEventListener("focus", () => renderPanel(hotspotId));
    button.addEventListener("click", () => renderPanel(hotspotId));
  });

  mapStage.addEventListener("mouseleave", () => renderPanel(null));
  renderPanel(state.homeHotspotId);
}

function renderHome() {
  const company = getDemoCompany();
  const recentInvestigations = state.homeFeed?.recentInvestigations || [];
  const riskAlerts = state.homeFeed?.riskAlerts || [];
  const commandResolution = resolveHomeSmartCommand();
  contentAreaEl.innerHTML = `
    <section class="agent-home">
      <div class="agent-home-stage">
        <article class="agent-portrait-panel agent-portrait-panel--composite glass-card neon-border">
          <div class="agent-portrait-panel__orbit agent-portrait-panel__orbit--outer"></div>
          <div class="agent-portrait-panel__orbit agent-portrait-panel__orbit--inner"></div>
          <div class="agent-portrait-panel__signals">
            <span>风险评估</span>
            <span>金融机构</span>
            <span>尽职调查</span>
            <span>区块风险图谱</span>
          </div>
          <div class="agent-portrait-frame">
            <img src="${DILIGENCE_HOME_ASSISTANT_IMAGE}" alt="尽职调查 Agent" class="agent-portrait-image agent-portrait-image--uploaded" />
          </div>
          <div class="agent-portrait-copy">
            <h2><span class="agent-portrait-copy__wordmark">尽职调查 Agent</span></h2>
            <p>企业风险 · 资料核验 · 报告生成</p>
          </div>
        </article>

        <div class="agent-home-main">
          <div class="agent-home-hero">
            <div class="agent-home-copy">
              <h1>请告诉我您的输入目标企业或风控指令</h1>
              <p>围绕目标企业完成资料解析、外部风险核验、风险结论沉淀和尽职调查报告生成。</p>
            </div>

            <div class="agent-command-card glass-card neon-border">
              <div class="agent-command-input-wrap">
                <input
                  class="agent-command-input"
                  id="home-smart-nav-input"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="输入企业名称，或直接描述任务：如“对深圳灵犀微传感发起授信尽调”"
                  value="${escapeHtml(state.homeCommandInput)}"
                />
                <button class="agent-command-card__send" type="button" data-action="submit-home-command" aria-label="开始搜索">➜</button>
              </div>
              <div class="agent-command-card__helper">
                支持企业全称、简称、模糊名称与自然语言任务识别。
              </div>
              ${renderHomeCommandSuggestions(commandResolution)}
              <div class="agent-command-card__footer">
                <div class="agent-command-card__actions">
                  <button class="agent-command-card__icon" type="button" aria-label="上传链接">${renderFancyFeatureIcon("attachment")}</button>
                </div>
              </div>
            </div>

            <div class="agent-quick-grid">
              ${homeQuickActions
                .map(
                  (item) => `
                    <button
                      class="agent-quick-card glass-card"
                      type="button"
                      data-action="${item.action}"
                      ${item.topSection ? `data-top-section="${item.topSection}"` : ""}
                    >
                      <span class="agent-quick-card__icon agent-quick-card__icon--${item.icon}">${renderFancyFeatureIcon(item.icon)}</span>
                      <strong>${item.title}</strong>
                      <span class="agent-quick-card__arrow">→</span>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <aside class="agent-tool-rail glass-card">
          ${homeToolRailItems
            .map(
              (item) => `
                <button
                  class="agent-tool-rail__item"
                  type="button"
                  data-action="${item.action}"
                  ${item.topSection ? `data-top-section="${item.topSection}"` : ""}
                >
                  <span class="agent-tool-rail__icon">${item.icon}</span>
                  <span class="agent-tool-rail__label">${item.label}</span>
                </button>
              `,
            )
            .join("")}
        </aside>
      </div>

      <div class="agent-home-bottom">
        <section class="agent-list-panel glass-card">
          <div class="agent-list-panel__head">
            <h3>最近调查</h3>
            <button class="ghost-action" type="button" data-action="go-section" data-top-section="due-task">查看全部</button>
          </div>
          <div class="agent-investigation-list">
            ${recentInvestigations.length
              ? recentInvestigations
              .map(
                (item) => `
                  <article class="agent-investigation-row">
                    <div class="agent-investigation-row__identity">
                      <span class="agent-investigation-row__mark">${renderFancyFeatureIcon("company")}</span>
                      <div>
                        <strong>${item.company}</strong>
                        <div class="agent-investigation-row__meta">
                          <span class="risk-badge status-blue">${item.tag}</span>
                          <span>${item.industry}</span>
                        </div>
                      </div>
                    </div>
                    <div class="agent-investigation-row__status">
                      <span class="agent-status-dot${item.status.includes("已") ? " is-done" : ""}"></span>
                      <span>${item.status}</span>
                    </div>
                    <time>${item.time}</time>
                  </article>
                `,
              )
              .join("")
              : `<p class="agent-list-empty">暂无最近调查记录</p>`}
          </div>
        </section>

        <section class="agent-list-panel glass-card agent-list-panel--risk">
          <div class="agent-list-panel__head">
            <h3>风险提醒</h3>
            <button class="ghost-action" type="button" data-action="go-section" data-top-section="watchlist">查看全部</button>
          </div>
          <div class="agent-risk-list">
            ${riskAlerts.length
              ? riskAlerts
              .map(
                (item) => `
                  <article class="agent-risk-row">
                    <div class="agent-risk-row__head">
                      <span class="risk-badge ${item.levelClass}">${item.level}</span>
                      <strong>${item.company}</strong>
                      <time>${item.time}</time>
                    </div>
                    <p>${item.detail}</p>
                  </article>
                `,
              )
              .join("")
              : `<p class="agent-list-empty">暂无风险提醒</p>`}
          </div>
          <button class="agent-risk-link" type="button" data-action="go-section" data-top-section="watchlist">订阅更多风险监控</button>
        </section>
      </div>

      <div class="agent-home-caption">
        <span>推荐入口</span>
        <strong>${escapeHtml(company?.name || "深圳市灵犀微传感科技有限公司")}</strong>
        <p>已存在高风险预警与尽调报告样本，可直接进入完整演示链路。</p>
        <button class="glow-button" type="button" data-action="start-demo">开始企业分析</button>
      </div>
    </section>
  `;
}

function rerenderHomeCommandCard() {
  if (state.topSectionId !== "home" || state.smartNavContext?.routeKey) return;
  renderHome();
  requestAnimationFrame(() => {
    const input = document.getElementById("home-smart-nav-input");
    if (!input) return;
    const cursor = state.homeCommandInput.length;
    input.focus();
    input.setSelectionRange(cursor, cursor);
  });
}

function isEditableEventTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function renderChinaMapPlaceholder() {
  return `
    <svg class="china-map-visual" viewBox="0 0 960 720" aria-hidden="true">
      <defs>
        <linearGradient id="chinaStroke" x1="140" y1="110" x2="780" y2="590" gradientUnits="userSpaceOnUse">
          <stop stop-color="#79DEFF" />
          <stop offset="0.56" stop-color="#7EA3FF" />
          <stop offset="1" stop-color="#8D6CFF" />
        </linearGradient>
        <linearGradient id="chinaFill" x1="240" y1="120" x2="700" y2="580" gradientUnits="userSpaceOnUse">
          <stop stop-color="#6EA0FF" stop-opacity=".26" />
          <stop offset="1" stop-color="#162D6A" stop-opacity=".10" />
        </linearGradient>
        <filter id="chinaGlow" x="0" y="0" width="960" height="720" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#chinaGlow)">
        <path
          d="M167 323L214 156L296 122L354 165L411 138L499 180L593 244L636 220L705 257L761 339L731 460L669 531L555 587L422 611L314 576L223 515L181 432L167 323Z"
          fill="url(#chinaFill)"
          stroke="url(#chinaStroke)"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path d="M665 404L776 390L807 465L729 510L665 404Z" fill="rgba(56,94,194,.18)" stroke="rgba(111,179,255,.42)" stroke-width="2"/>
        <path d="M714 557L758 571L777 612L738 633L714 557Z" fill="rgba(56,94,194,.18)" stroke="rgba(111,179,255,.36)" stroke-width="2"/>
      </g>
    </svg>
  `;
}

function renderChinaMapAsset() {
  return `
    <div class="china-map-asset" data-missing="false">
      <img
        class="china-map-image"
        src="./assets/risk-map-china.png"
        alt="中国风险热力地图底图"
        onerror="this.parentElement.dataset.missing='true'"
      />
      <div class="china-map-image-overlay"></div>
      <div class="china-map-fallback">${renderChinaMapPlaceholder()}</div>
    </div>
  `;
}

function renderNationalRiskNode(city) {
  return `
    <button
      class="national-map-node"
      type="button"
      data-action="open-risk-region"
      data-region-id="${city.id}"
      style="left:${city.x}; top:${city.y}; --city-glow:${city.glow};"
      aria-label="查看${escapeHtml(city.label)}区域风险详情"
    >
      <span class="national-map-node-label">${escapeHtml(city.label)}</span>
      <span class="national-map-node-core"></span>
      <span class="national-map-node-pulse"></span>
      <span class="national-map-node-heat"></span>
      <span class="national-map-tooltip">
        <strong>${escapeHtml(city.label)}</strong>
        <em>风险指数 ${escapeHtml(city.score)}</em>
        <em>${escapeHtml(city.level)}</em>
        <em>高风险企业 ${escapeHtml(city.companies)}</em>
        <i>点击进入区域详情</i>
      </span>
    </button>
  `;
}

function renderRiskMapRegionDetail(region) {
  contentAreaEl.innerHTML = `
    <section class="risk-map-screen region-risk-screen">
      <div class="page-title-row">
        <div>
          <p class="section-kicker">全国风险地图 &gt; ${escapeHtml(region.name)}</p>
          <h2>宏观风险地图 / ${escapeHtml(region.subtitle)}</h2>
          <p>数据更新于 2024-05-24 10:30:00，可按区域、行业和风险等级进一步下钻。</p>
        </div>
        <div class="filter-pills">
          <span>时间范围：近 7 日</span>
          <span>行业：全部</span>
          <span>风险等级：全部</span>
          <button class="ghost-action" type="button" data-action="close-risk-region">返回全国</button>
        </div>
      </div>
      <div class="region-hero-stats">
        <article class="metric-card"><strong class="metric-value">${region.index}</strong><span class="metric-label">${escapeHtml(region.name)}区域风险指数</span></article>
        <article class="metric-card"><strong class="metric-value">${region.enterpriseCount}</strong><span class="metric-label">高风险企业数</span></article>
        <article class="metric-card"><strong class="metric-value">${region.heat}</strong><span class="metric-label">重点行业风险热度</span></article>
        <article class="metric-card"><strong class="metric-value">${region.alerts}</strong><span class="metric-label">近 7 日预警</span></article>
      </div>
      <div class="region-risk-layout">
        <article class="glass-panel region-map-card">
          <div class="region-map-board">
            ${renderChinaMapPlaceholder()}
            ${region.districts
              .map(
                (district, index) => `
                  <div class="region-node region-node-${index + 1}">
                    <strong>${escapeHtml(district.name)}</strong>
                    <span>风险指数 ${escapeHtml(district.score)}</span>
                    <em>风险企业 ${escapeHtml(district.count)}</em>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="region-map-footer">
            <button class="primary-action" type="button" data-action="start-demo">切换到企业尽调</button>
            <p>${escapeHtml(region.guidance)}</p>
          </div>
        </article>
        <aside class="region-analysis-stack">
          <article class="glass-panel region-overview-card">
            <div class="inline-head">
              <div>
                <h3>${escapeHtml(region.name)}风险概览</h3>
                <p>${escapeHtml(region.summary)}</p>
              </div>
              <div class="donut-score"><strong>${region.index}</strong><span>中高风险</span></div>
            </div>
          </article>
          <article class="glass-panel ranking-card">
            <h3>行业风险热度 TOP5</h3>
            <div class="region-industry-grid">
              ${region.industries
                .map(
                  (item) => `
                    <div class="region-industry-card">
                      <strong>${escapeHtml(item.name)}</strong>
                      <span>风险指数 ${escapeHtml(item.score)}</span>
                      <em>${escapeHtml(item.delta)}</em>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </article>
          <article class="glass-panel macro-trend-card">
            <h3>宏观风险趋势卡片</h3>
            <div class="macro-trend-mini">
              <div class="mini-trend-line"></div>
              <div class="mini-trend-metrics">
                <span>近7日波动 +5.2</span>
                <span>区域热度 ${escapeHtml(region.heat)}</span>
                <span>预警密度 ${escapeHtml(region.alerts)}</span>
              </div>
            </div>
          </article>
          <article class="glass-panel table-card">
            <h3>重点企业风险观察</h3>
            <div class="table-stack">
              <div class="table-head" style="--cols: 5;"><span>企业名称</span><span>区县</span><span>行业</span><span>风险指数</span><span>标签</span></div>
              ${region.companies
                .map(
                  (item) => `
                    <div class="table-row" style="--cols: 5;">
                      <span>${escapeHtml(item.name)}</span>
                      <span>${escapeHtml(item.district)}</span>
                      <span>${escapeHtml(item.industry)}</span>
                      <span>${escapeHtml(item.score)}</span>
                      <span>${item.tags.map((tag) => `<i class="mini-tag">${escapeHtml(tag)}</i>`).join("")}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </article>
        </aside>
      </div>
      <div class="region-bottom-grid">
        <article class="glass-panel trend-card">
          <div class="inline-head">
            <div>
              <h3>${escapeHtml(region.name)}区域风险趋势</h3>
              <p>按周观察风险指数与高风险企业数变化。</p>
            </div>
            <div class="filter-pills"><span>近7日</span><span>近30日</span><span>近90日</span></div>
          </div>
          <div class="long-trend-chart"></div>
        </article>
        <article class="glass-panel event-card">
          <div class="inline-head">
            <div>
              <h3>近期预警事件</h3>
              <p>区域事件可直接转入企业尽调与报告复核。</p>
            </div>
          </div>
          <div class="event-table">
            ${region.events
              .map(
                (event) => `
                  <div class="event-row">
                    <span>${escapeHtml(event.time)}</span>
                    <strong>${escapeHtml(event.text)}</strong>
                    <em>${escapeHtml(event.district)}</em>
                    <i>${escapeHtml(event.level)}</i>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderMacroRiskMap() {
  if (state.riskMapRegionId && riskMapRegionViews[state.riskMapRegionId]) {
    renderRiskMapRegionDetail(riskMapRegionViews[state.riskMapRegionId]);
    return;
  }

  const signals = buildMacroSignals();
  contentAreaEl.innerHTML = `
    <section class="risk-map-screen national-risk-screen">
      <div class="page-title-row">
        <div>
          <p class="section-kicker">Macro Risk View</p>
          <h2>全国风险地图</h2>
          <p>从全国热力分布筛选重点区域，再点击某个省市进入区域风险详情页。</p>
        </div>
        <div class="filter-pills"><span>近 7 日</span><span>行业：全部</span><span>风险等级：全部</span></div>
      </div>
      <div class="risk-map-layout">
        <article class="glass-panel china-map-card">
          <div class="national-map-board">
            <div class="national-map-grid"></div>
            <div class="national-map-noise"></div>
            <div class="national-map-radar-rings"><span></span><span></span><span></span></div>
            <div class="national-map-radar-sweep"></div>
            <div class="national-map-radar-glow national-map-radar-glow-a"></div>
            <div class="national-map-radar-glow national-map-radar-glow-b"></div>
            <div class="national-map-hud national-map-hud-left">
              <span>全国风险热力分布</span>
              <strong>4 个核心监测城市</strong>
              <em>Hover 查看城市风险快照</em>
            </div>
            <div class="national-map-hud national-map-hud-right">
              <span>风险情报雷达</span>
              <strong>62.4 / 100</strong>
              <em>热点沿京津冀、长三角与珠三角聚集</em>
            </div>
            <div class="national-map-spectrum">
              <span>低</span>
              <i></i>
              <span>高</span>
            </div>
            ${renderChinaMapAsset()}
            ${nationalRiskHotspots.map((city) => renderNationalRiskNode(city)).join("")}
          </div>
          <div class="national-map-footer">
            <p>默认仅展示全国风险热力分布，不默认选中城市，也不默认显示 tooltip；将鼠标移入热点后再查看轻量详情。</p>
            <button class="ghost-action" type="button" data-action="start-demo">直接进入企业尽调</button>
          </div>
        </article>
        <aside class="map-side-stack">
          <article class="glass-panel score-card">
            <h3>区域风险指数</h3>
            <div class="donut-score"><strong>62.4</strong><span>中高风险</span></div>
            <div class="score-card-copy">
              <p>全国风险热度主要集中于北京、上海与深圳三大经济带，成都作为中西部样本用于观察区域传导。</p>
              <div class="score-card-chips">
                <span>高风险企业 ${signals.highRisk}</span>
                <span>重点城市 4</span>
                <span>近7日升温</span>
              </div>
            </div>
          </article>
          <article class="glass-panel ranking-card">
            <h3>高风险地区 TOP5</h3>
            <div class="rank-list">
              ${nationalRiskHotspots
                .map(
                  (item, index) => `
                    <button class="rank-row" type="button" data-action="open-risk-region" data-region-id="${item.id}">
                      <span>${index + 1}</span><strong>${escapeHtml(item.label)}</strong><em>${escapeHtml(item.score)}</em>
                    </button>
                  `,
                )
                .join("")}
              <div class="rank-row rank-row-muted"><span>5</span><strong>武汉</strong><em>54.8</em></div>
            </div>
          </article>
          <article class="glass-panel national-analysis-card">
            <h3>行业风险热度 TOP5</h3>
            <div class="heat-top-list">
              <div class="heat-top-row"><strong>电子制造</strong><span>88.4</span><i style="width:88.4%"></i></div>
              <div class="heat-top-row"><strong>平台服务</strong><span>82.1</span><i style="width:82.1%"></i></div>
              <div class="heat-top-row"><strong>房地产链</strong><span>76.8</span><i style="width:76.8%"></i></div>
              <div class="heat-top-row"><strong>医药制造</strong><span>71.7</span><i style="width:71.7%"></i></div>
              <div class="heat-top-row"><strong>新能源配套</strong><span>69.6</span><i style="width:69.6%"></i></div>
            </div>
          </article>
          <article class="glass-panel national-trend-card">
            <h3>宏观风险趋势卡片</h3>
            <div class="macro-trend-mini">
              <div class="mini-trend-line"></div>
              <div class="mini-trend-metrics">
                <span>近7日预警升温</span>
                <span>高风险企业 ${signals.highRisk}</span>
                <span>行业覆盖 ${signals.industries.length}</span>
              </div>
            </div>
            <div class="trend-card-foot">
              <strong>情报判断</strong>
              <p>当前全国风险呈东部高压、中西部扩散态势，适合从北京、上海、深圳三地优先下钻。</p>
            </div>
          </article>
        </aside>
      </div>
      <div class="card-grid compact-grid">
        <article class="metric-card"><strong class="metric-value">${signals.total}</strong><span class="metric-label">监测企业</span></article>
        <article class="metric-card"><strong class="metric-value">${signals.highRisk}</strong><span class="metric-label">高风险企业</span></article>
        <article class="metric-card"><strong class="metric-value">${signals.listed}</strong><span class="metric-label">上市公司样本</span></article>
        <article class="metric-card"><strong class="metric-value">${signals.industries.length}</strong><span class="metric-label">行业分布</span></article>
      </div>
    </section>
  `;
}

function renderDueTask() {
  if (state.taskBoardView !== "detail") {
    const companies = getDueTaskCompaniesFiltered();
    contentAreaEl.innerHTML = `
      <section class="due-task-screen task-board-selector-screen">
        <div class="page-title-row report-title-row">
          <div>
            <p class="section-kicker">Task Board</p>
            <h2>洞察任务企业清单</h2>
            <p>先在任务清单中选择企业，再进入该企业的尽调执行工作台。</p>
          </div>
        </div>
        <article class="glass-panel task-board-table-panel">
          <div class="task-board-table-head">
            <div>
              <p class="section-kicker">Enterprise Queue</p>
              <h3>待跟进企业</h3>
              <p>支持按企业名或行业快速检索，列表直接展示任务进度与上次更新时间。</p>
            </div>
            <input
              class="search-box task-board-search-input"
              id="task-board-search-input"
              placeholder="搜索企业名称或行业"
              value="${escapeHtml(state.taskBoardSearchKeyword)}"
            />
          </div>
          <div class="task-board-table">
            <div class="task-board-table__header">
              <span>企业名称</span>
              <span>所属行业</span>
              <span>当前阶段</span>
              <span>上次更新时间</span>
              <span>操作</span>
            </div>
            ${companies.length
              ? companies
                  .map(
                    (company) => `
                      <button
                        class="task-board-table__row"
                        type="button"
                        data-action="open-task-company"
                        data-company-code="${company.company_code}"
                      >
                        <span class="task-board-company-cell">
                          <strong>${escapeHtml(company.name)}</strong>
                        </span>
                        <span>${escapeHtml(formatCompanyIndustry(company))}</span>
                        <span>${escapeHtml(company.phase)}</span>
                        <time>${company.updatedAt}</time>
                        <span class="task-board-enter-link">${company.actionLabel}</span>
                      </button>
                    `,
                  )
                  .join("")
              : '<div class="empty-state"><h3>未找到匹配企业</h3><p>请尝试调整搜索关键词。</p></div>'}
          </div>
        </article>
      </section>
    `;
    return;
  }

  const company = getSelectedDueTaskCompany() || getDemoCompany();
  const steps = company?.steps || [];
  const taskCompanyCode = escapeHtml(company?.company_code || DEMO_COMPANY_CODE);
  contentAreaEl.innerHTML = `
    <section class="due-task-screen task-journey-screen">
      <div class="task-detail-title">
        <p class="section-kicker">Mission Brief</p>
        <h2>尽调执行工作台</h2>
      </div>
      <div class="task-board-layout">
        <div class="task-main-column">
          <div class="task-board-hero glass-panel">
            <div>
              <h2>${escapeHtml(company?.name || "深圳市灵犀微传感科技有限公司")}</h2>
              <p>任务已启动，系统正在收集、分析与验证目标企业的关键经营、财务、司法与关联风险信息。</p>
              <button class="portrait-back-inline" type="button" data-action="back-task-board-list">返回企业清单</button>
            </div>
            <div class="mission-brief-grid">
              <div class="mission-brief-item"><span>任务类型</span><strong>授信尽调</strong></div>
              <div class="mission-brief-item"><span>当前阶段</span><strong>${escapeHtml(company?.phase || "数据归集与分析")}</strong></div>
              <div class="mission-brief-item"><span>知识依据</span><strong>${state.knowledgeBase?.files?.length || 0} 份</strong></div>
              <div class="mission-brief-item"><span>风险关注</span><strong>${company?.highRiskCount || 2} 项高风险</strong></div>
            </div>
          </div>
          <article class="glass-panel due-progress-workbench">
            <div class="due-progress-head">
              <div>
                <h3>尽调执行进度</h3>
                <p>尽职调查 Agent 正按最优路径推进尽调工作</p>
              </div>
              <span class="due-progress-live">${escapeHtml(company?.liveLabel || "AI 自动尽调中")}</span>
            </div>
            <div class="due-flow-track" aria-label="尽调执行进度">
              ${steps
                .map(
                  (step) => `
                    <article class="due-flow-step is-${step.state}">
                      <div class="due-flow-step__top">
                        <span class="due-flow-step__index">${step.index}</span>
                        <span class="due-flow-step__status">${step.status}</span>
                      </div>
                      <div class="due-flow-step__signal" style="--progress:${step.pct || 0}%;">
                        <span class="due-flow-step__signal-core">
                          ${step.state === "done" ? "✓" : step.state === "running" ? `${step.pct}%` : step.index === 4 ? "⌛" : step.index === 5 ? "◎" : "▤"}
                        </span>
                      </div>
                      <div class="due-flow-step__body">
                        <h3>${step.title}</h3>
                        <strong>${step.desc}</strong>
                        <ul>
                          ${step.tasks.map((task) => `<li>${task}</li>`).join("")}
                        </ul>
                        ${step.index === 6 ? `
                          <div class="button-row due-flow-step__actions">
                            <button
                              class="secondary-action"
                              type="button"
                              data-action="generate-task-portrait"
                              data-company-code="${taskCompanyCode}"
                            >生成企业画像</button>
                            <button
                              class="primary-action"
                              type="button"
                              data-action="generate-task-report"
                              data-company-code="${taskCompanyCode}"
                            >生成尽调报告</button>
                          </div>
                        ` : ""}
                      </div>
                    </article>
                  `,
                )
                .join("")}
            </div>
          </article>
          <div class="task-journey-bottom">
            <article class="glass-panel task-insight-card">
              <h3>关键发现</h3>
              <div class="alert-stack">
                <div class="alert-item high"><strong>${escapeHtml((company?.tags || [])[0] || "表外担保风险")}</strong><span>${escapeHtml(compactText(company?.overview || "存在未披露连带责任担保线索，需补充核验控保企业经营情况。"))}</span></div>
                <div class="alert-item medium"><strong>${escapeHtml((company?.tags || [])[1] || "现金流偏弱")}</strong><span>当前任务进度 ${company?.progress || 85}% ，建议优先核验回款、应收账龄和短债承接压力。</span></div>
                <div class="alert-item medium"><strong>${escapeHtml((company?.tags || [])[2] || "关联网络扩展")}</strong><span>当前阶段为「${escapeHtml(company?.phase || "生成初步结论中")}」，建议同步准备复核材料与结论口径。</span></div>
              </div>
            </article>
            <article class="glass-panel task-suggestion-card">
              <h3>尽职调查风险分析建议</h3>
                <div class="suggestion-card"><strong>优先核验高风险构面</strong><span>建议先围绕 ${escapeHtml((company?.tags || [])[0] || "高风险事项")} 补充关键证据，减少后续复核回退。</span></div>
                <div class="suggestion-card"><strong>补充经营与回款链路</strong><span>建议同步准备合同、订单、发票和银行流水，便于后续报告直接引用。</span></div>
              <div class="suggestion-card"><strong>${company?.reportCompleted ? "查看并复核报告" : "提前准备结论口径"}</strong><span>${company?.reportCompleted ? "当前企业尽调报告已生成，可直接进入报告工作台查看、编辑与预审。" : `当前任务已推进到 ${company?.phase || "生成初步结论中"}，可以同步整理风险结论与缓释建议草案。`}</span></div>
            </article>
          </div>
        </div>
        <aside class="task-side-column">
          <article class="glass-panel agent-assistant-panel">
            <div class="assistant-panel-head">
              <img src="${DILIGENCE_ASSISTANT_IMAGE}" alt="尽职调查风险分析头像" class="assistant-portrait-image" />
              <div>
                <h3>尽职调查 Agent</h3>
                <p>AI风险分析</p>
              </div>
            </div>
            <div class="assistant-quote-card">
              ${company?.reportCompleted
                ? "该企业尽调报告已生成，您现在可以直接查看报告内容，继续编辑、预审或导出。"
                : `我正在为您收集、分析与验证该企业的多维信息，当前处于 ${escapeHtml(company?.phase || "生成初步结论中")} 阶段，将尽快为您呈现关键发现。`}
            </div>
          </article>
          <article class="glass-panel task-side-timeline">
            <h3>尽调动态</h3>
            <div class="timeline-list">
              ${(company?.timeline || [])
                .map(
                  (item) => `
                    <div class="timeline-row">
                      <span>${escapeHtml(item.time)}</span>
                      <strong>${escapeHtml(item.title)}</strong>
                      <em>${escapeHtml(item.note)}</em>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </article>
        </aside>
      </div>
    </section>
  `;
}

function renderProcessEngineMaterials(detail, company) {
  if (!detail) {
    contentAreaEl.innerHTML = `<div class="empty-state"><h3>材料加载中</h3><p>请稍后重试。</p></div>`;
    return;
  }
  contentAreaEl.innerHTML = `
    <section class="due-task-screen">
      <div class="page-title-row">
        <div>
          <p class="section-kicker">材料状态</p>
          <h2>${escapeHtml(company?.name || "目标企业")} 尽调资料包</h2>
          <p>展示数据库、mock VDR、上传材料与知识库引用的来源关系。</p>
        </div>
      </div>
      ${renderDueDiligenceMaterials(detail)}
    </section>
  `;
}

function renderCompanyListPanel(selectedCompany, filteredCompanies, options = {}) {
  const isListPage = options.variant === "full";
  return `
    <aside class="glass-card company-list-panel${isListPage ? " company-list-panel--full" : ""}">
      <div class="company-list-panel__head">
        <div>
          <p class="section-kicker">Company List</p>
          <h3>企业清单</h3>
          <p>${isListPage ? "先选择需要查看的企业，进入后再查看风险矩阵与详情联动。" : "切换企业后查看二维风险矩阵与右侧风险详情。"}</p>
        </div>
      </div>
      <div class="company-list-panel__controls">
        <input
          class="search-box portrait-search-input"
          id="portrait-search-input"
          placeholder="搜索企业名称或行业"
          value="${escapeHtml(state.portraitSearchKeyword)}"
        />
        <div class="company-list-panel__filters">
          ${portraitRiskFilters
            .map(
              (item) => `
                <button
                  class="pill-button${state.portraitRiskFilter === item ? " is-active" : ""}"
                  type="button"
                  data-action="set-portrait-risk-filter"
                  data-risk-filter="${item}"
                >${item}</button>
              `,
            )
            .join("")}
        </div>
      </div>
      <div class="company-list-panel__list">
        ${filteredCompanies
          .map((item) => {
            const severity = item.riskLevel ? getRiskSeverity(item.riskLevel) : null;
            return `
              <button
                class="company-list-item${selectedCompany && item.companyCode === selectedCompany.companyCode ? " is-active" : ""}"
                type="button"
                data-action="select-portrait-company"
                data-portrait-company-id="${item.companyCode}"
              >
                <div class="company-list-item__row">
                  <strong>${escapeHtml(item.name)}</strong>
                  ${item.riskLevel ? renderRiskSeverityBadge(item.riskLevel) : ""}
                </div>
                <div class="company-list-item__row company-list-item__row--meta">
                  <span>${escapeHtml(item.industry || "暂无数据")}</span>
                  ${item.riskScore !== null && item.riskScore !== undefined
                    ? `<span class="${severity?.scoreClass || ""}">${item.riskScore}/100</span>`
                    : ""}
                </div>
                ${item.updatedAt
                  ? `
                    <div class="company-list-item__row company-list-item__row--time">
                      <span>最近更新</span>
                      <time>${item.updatedAt}</time>
                    </div>
                  `
                  : ""}
                ${item.tags.length
                  ? `
                    <div class="company-list-item__tags">
                      ${item.tags.map((tag) => `<span class="mini-tag">${escapeHtml(tag)}</span>`).join("")}
                    </div>
                  `
                  : ""}
              </button>
            `;
          })
          .join("")}
      </div>
    </aside>
  `;
}

function renderRiskMatrixBlock(module, activeModule) {
  const layer = getPortraitLayerConfig(module);
  const metrics = module.keyMetrics.slice(0, 2);
  return `
    <button
      class="risk-funnel-card risk-funnel-card--${layer.id}${module.id === activeModule.id ? " is-active" : ""}"
      type="button"
      style="opacity:${Math.max(0.42, module.sufficiency)};"
      data-action="focus-risk-house"
      data-risk-house-id="${module.id}"
      aria-label="查看${escapeHtml(module.title)}详情"
    >
      <span class="risk-funnel-card__top">
        <em>${module.id}</em>
        <i>${escapeHtml(layer.label)}</i>
      </span>
      <strong>${escapeHtml(module.title)}</strong>
      <span class="risk-funnel-card__meta">
        ${renderRiskSeverityBadge(module.level)}
        <small>评分 ${module.score}</small>
      </span>
      <span class="risk-funnel-card__metrics">
        ${metrics.map((item) => `<b>${escapeHtml(item)}</b>`).join("")}
      </span>
      <span class="risk-funnel-card__sufficiency">
        <i style="width:${Math.round(module.sufficiency * 100)}%;"></i>
      </span>
    </button>
  `;
}

function renderRiskMatrix2D(selectedCompany, activeModule) {
  const modules = [...selectedCompany.modules].sort((a, b) => (a.displayOrder || a.priority) - (b.displayOrder || b.priority));
  return `
    <article class="glass-card risk-workbench-stage">
      <div class="risk-workbench-stage__head">
        <div>
          <p class="section-kicker">Risk Insight Funnel</p>
          <h3>${escapeHtml(selectedCompany.name)}</h3>
          <p>12 个风险模块按微观、中观、宏观三层组织为倒三角漏斗，点击模块查看评分、证据来源与 AI 解读。</p>
        </div>
        <div class="risk-workbench-stage__meta">
          ${selectedCompany.riskLevel ? renderRiskSeverityBadge(selectedCompany.riskLevel) : ""}
          ${selectedCompany.portraitScore !== null && selectedCompany.portraitScore !== undefined ? `<span>画像评分 ${selectedCompany.portraitScore}</span>` : ""}
          ${selectedCompany.updatedAt ? `<span>更新于 ${selectedCompany.updatedAt}</span>` : ""}
        </div>
      </div>
      <div class="risk-funnel" aria-label="微观中观宏观三层风险漏斗">
        <div class="risk-funnel__outline" aria-hidden="true"></div>
        ${portraitLayerConfig.map((layer) => {
          const layerModules = modules.filter((item) => getPortraitLayerConfig(item).id === layer.id);
          if (!layerModules.length) return "";
          return `
            <section class="risk-funnel-layer risk-funnel-layer--${layer.id}" aria-label="${escapeHtml(layer.layerName)}">
              <div class="risk-funnel-layer__head">
                <div>
                  <span>${escapeHtml(layer.layerName)}</span>
                  <h4>${escapeHtml(layer.shortDescription)}</h4>
                </div>
                <p>${escapeHtml(layer.description)}</p>
              </div>
              <div class="risk-funnel-layer__grid">
                ${layerModules.map((item) => renderRiskMatrixBlock(item, activeModule)).join("")}
              </div>
            </section>
          `;
        }).join("")}
      </div>
      ${renderRiskLegend()}
    </article>
  `;
}

function renderRiskLegend() {
  return `
    <div class="risk-legend">
      <div class="risk-legend__group">
        <strong>风险等级</strong>
        <span class="risk-legend__item"><i class="severity-dot severity-dot--extreme"></i>极高风险</span>
        <span class="risk-legend__item"><i class="severity-dot severity-dot--high"></i>高风险</span>
        <span class="risk-legend__item"><i class="severity-dot severity-dot--medium"></i>中风险</span>
        <span class="risk-legend__item"><i class="severity-dot severity-dot--low"></i>低风险</span>
        <span class="risk-legend__item"><i class="severity-dot severity-dot--unknown"></i>信息不足</span>
      </div>
      <div class="risk-legend__group">
        <strong>数据充分度</strong>
        <span class="risk-legend__item">透明度越低，表示当前证据仍需补充。</span>
      </div>
      <div class="risk-legend__group">
        <strong>层级颜色</strong>
        <span class="risk-legend__item"><i class="layer-dot layer-dot--micro"></i>微观红</span>
        <span class="risk-legend__item"><i class="layer-dot layer-dot--meso"></i>中观紫</span>
        <span class="risk-legend__item"><i class="layer-dot layer-dot--macro"></i>宏观蓝</span>
      </div>
    </div>
  `;
}

function renderRiskDetailPanel(selectedCompany, activeModule) {
  return `
    <aside class="glass-card risk-detail-panel">
      <div class="risk-detail-panel__head">
        <div>
          <p class="section-kicker">Risk Detail Panel</p>
          <h3>${escapeHtml(selectedCompany.name)}</h3>
          <strong>${escapeHtml(activeModule.title)}</strong>
        </div>
        <button
          class="risk-detail-panel__collapse"
          type="button"
          data-action="toggle-portrait-detail-panel"
          aria-label="收起风险详情面板"
          title="收起详情"
        >›</button>
      </div>
      <div class="risk-detail-panel__score">
        <div>
          <span>风险评分</span>
          <strong>${activeModule.score}</strong>
          <small>/100</small>
        </div>
        ${renderRiskSeverityBadge(activeModule.level)}
      </div>
      <div class="risk-detail-panel__stack">
        <div class="risk-detail-card">
          <span>风险说明</span>
          <p>${escapeHtml(activeModule.summary)}</p>
        </div>
        <div class="risk-detail-card">
          <span>关键指标</span>
          <ul>${activeModule.keyMetrics.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div class="risk-detail-card">
          <span>主要证据来源</span>
          <ul>${activeModule.evidenceSources.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div class="risk-detail-card">
          <span>AI 风险解读</span>
          <p>${escapeHtml(activeModule.aiInterpretation)}</p>
        </div>
        <div class="risk-detail-card">
          <span>建议动作</span>
          <p>${escapeHtml(activeModule.recommendedAction)}</p>
        </div>
        <div class="risk-detail-card">
          <span>数据充分度</span>
          <p>${Math.round(activeModule.sufficiency * 100)}%</p>
        </div>
      </div>
    </aside>
  `;
}

function renderPortraitResizeHandle() {
  return `
    <button
      class="portrait-resize-handle"
      type="button"
      data-action="start-portrait-layout-resize"
      aria-label="拖动调整风险模型与详情面板比例"
      title="拖动调整左右比例"
    >
      <span></span>
    </button>
  `;
}

function renderCollapsedRiskDetailPanel(activeModule) {
  return `
    <aside class="glass-card risk-detail-rail">
      <button
        class="risk-detail-rail__button"
        type="button"
        data-action="toggle-portrait-detail-panel"
        aria-label="展开风险详情面板"
        title="展开详情"
      >
        <span>‹</span>
        <strong>风险详情</strong>
        <em>${escapeHtml(activeModule.title)}</em>
      </button>
    </aside>
  `;
}

function renderEnterpriseLibrary() {
  const allCompaniesLoaded = Boolean(state.meta && Array.isArray(state.companies));
  const filteredCompanies = getPortraitCompaniesFiltered();
  if (!allCompaniesLoaded) {
    contentAreaEl.innerHTML = `
      <section class="portrait-screen risk-house-workbench">
        <div class="page-title-row risk-workbench-title-row">
          <div>
            <p class="section-kicker">Enterprise List</p>
            <h2>企业画像</h2>
            <p>正在加载企业清单，请稍候。</p>
          </div>
        </div>
        <div class="portrait-list-layout">
          <aside class="glass-card company-list-panel company-list-panel--full">
            <div class="company-list-panel__head">
              <div>
                <p class="section-kicker">Company List</p>
                <h3>企业清单</h3>
                <p>正在从后端读取真实企业列表。</p>
              </div>
            </div>
            <div class="company-list-panel__list">
              ${Array.from({ length: 6 }, (_, index) => `
                <div class="company-list-item company-list-item--skeleton" aria-hidden="true">
                  <div class="report-skeleton-line report-skeleton-line--company"></div>
                  <div class="report-skeleton-line report-skeleton-line--meta"></div>
                  ${index % 2 === 0 ? '<div class="report-skeleton-line report-skeleton-line--meta"></div>' : ""}
                </div>
              `).join("")}
            </div>
          </aside>
        </div>
      </section>
    `;
    return;
  }

  if (state.portraitError && state.portraitView === "detail") {
    contentAreaEl.innerHTML = `
      <section class="portrait-screen risk-house-workbench">
        <div class="empty-state">
          <h3>企业画像加载失败</h3>
          <p>${escapeHtml(state.portraitError)}</p>
          <div class="button-row" style="margin-top: 16px;">
            <button class="primary-action" type="button" data-action="retry-portrait-company">重试</button>
            <button class="ghost-action" type="button" data-action="back-portrait-list">返回企业清单</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  if (!getPortraitCompaniesSource().length) {
    contentAreaEl.innerHTML = `
      <section class="portrait-screen risk-house-workbench">
        <div class="empty-state">
          <h3>暂无企业数据，请先完成企业录入或数据同步</h3>
          <p>当前后端未返回任何企业记录，因此不展示前端示例企业。</p>
        </div>
      </section>
    `;
    return;
  }

  if (!filteredCompanies.length) {
    contentAreaEl.innerHTML = `
      <section class="portrait-screen risk-house-workbench">
        <div class="empty-state">
          <h3>未找到匹配企业</h3>
          <p>请尝试调整企业名称关键字或风险等级筛选条件。</p>
        </div>
      </section>
    `;
    return;
  }

  const selectedCompany = filteredCompanies.find((item) => item.companyCode === state.portraitCompanyId)
    || filteredCompanies[0];
  if (state.portraitView !== "detail") {
    contentAreaEl.innerHTML = `
      <section class="portrait-screen risk-house-workbench">
        <div class="page-title-row risk-workbench-title-row">
          <div>
            <p class="section-kicker">Enterprise List</p>
            <h2>企业画像</h2>
            <p>先在企业清单中选择目标企业，进入后查看二维风险矩阵与风险详情。</p>
          </div>
          <button class="secondary-action" type="button" data-action="go-section" data-top-section="report-center">导出画像报告</button>
        </div>
        <div class="portrait-list-layout">
          ${renderCompanyListPanel(null, filteredCompanies, { variant: "full" })}
        </div>
      </section>
    `;
    return;
  }
  const detail = getCompanyDetail(selectedCompany.companyCode);
  if (!detail || state.portraitLoadingCompanyCode === selectedCompany.companyCode) {
    contentAreaEl.innerHTML = `
      <section class="portrait-screen risk-house-workbench">
        <div class="empty-state">
          <h3>企业画像加载中</h3>
          <p>正在根据企业真实 id 读取画像详情与风险矩阵。</p>
          <div class="button-row" style="margin-top: 16px;">
            <button class="ghost-action" type="button" data-action="back-portrait-list">返回企业清单</button>
          </div>
        </div>
      </section>
    `;
    return;
  }
  const portraitDetail = buildPortraitCompanyDetail(selectedCompany, detail);
  const activeModule = getPortraitModule(portraitDetail) || portraitDetail.modules[0];
  const portraitMainPercent = clampNumber(state.portraitMainPercent, 60, 85, 78);
  const detailCollapsed = Boolean(state.portraitDetailCollapsed);
  contentAreaEl.innerHTML = `
    <section class="portrait-screen risk-house-workbench">
      <div class="page-title-row risk-workbench-title-row">
        <div>
          <p class="section-kicker">Enterprise Risk Matrix</p>
          <h2>企业风险画像详情</h2>
          <button class="portrait-back-inline" type="button" data-action="back-portrait-list">返回上一级</button>
        </div>
        <div class="risk-workbench-title-actions">
          <button
            class="ghost-action"
            type="button"
            data-action="open-task-workbench"
            data-company-code="${escapeHtml(selectedCompany.companyCode)}"
          >返回尽调工作台</button>
          <button class="secondary-action" type="button" data-action="go-section" data-top-section="report-center">导出画像报告</button>
        </div>
      </div>
      <div
        class="risk-workbench-layout risk-workbench-layout--detail${detailCollapsed ? " is-detail-collapsed" : ""}"
        style="--portrait-main-percent: ${portraitMainPercent};"
      >
        ${renderRiskMatrix2D(portraitDetail, activeModule)}
        ${detailCollapsed ? "" : renderPortraitResizeHandle()}
        ${detailCollapsed ? renderCollapsedRiskDetailPanel(activeModule) : renderRiskDetailPanel(portraitDetail, activeModule)}
      </div>
    </section>
  `;
}

function renderWatchlist() {
  const watched = buildWatchlistCompanies();
  const focused = watched.find((item) => item.code === state.watchlistFocusCode) || watched[0];
  if (focused && focused.code !== state.watchlistFocusCode) state.watchlistFocusCode = focused.code;
  const mode = getWatchlistMode();
  const insight = buildWatchlistInsight(focused, watched);
  if (mode === "analysis" && insight) {
    contentAreaEl.innerHTML = `
      <section class="watchlist-screen watchlist-screen--analysis">
        ${renderWatchlistAnalysisLayout(insight, watched)}
      </section>
    `;
    return;
  }
  contentAreaEl.innerHTML = `
    <section class="watchlist-screen">
      <div class="watchlist-hero">
        <div>
          <p class="section-kicker">尽职调查 Watchlist</p>
          <h2>AI 风险雷达监测中心</h2>
          <p>以雷达距离表达风险强度，越靠近中心代表风险越高；行业用不同颜色区分，点击行业清单中的企业可直接进入预警详情。</p>
        </div>
      </div>
      <div class="card-grid compact-grid">
        <article class="metric-card"><strong class="metric-value">${watched.length}</strong><span class="metric-label">雷达监测企业</span></article>
        <article class="metric-card"><strong class="metric-value">${watched.filter((item) => item.riskScore >= 80).length}</strong><span class="metric-label">中心高压信号</span></article>
        <article class="metric-card"><strong class="metric-value">${watched.filter((item) => item.riskScore >= 60 && item.riskScore < 80).length}</strong><span class="metric-label">中圈跟踪信号</span></article>
        <article class="metric-card"><strong class="metric-value">${new Set(watched.map((item) => item.industryGroup.label)).size}</strong><span class="metric-label">行业监测分组</span></article>
      </div>
      <div class="watchlist-layout">
        <div class="watchlist-main-column">
          <article class="glass-panel watch-radar-card">
            <div class="watch-radar-head">
              <div>
                <p class="section-kicker">Risk Radar</p>
                <h3>企业风险雷达</h3>
              </div>
              <div class="watch-radar-focus">
              <span>当前高亮</span>
              <strong>${escapeHtml(focused?.name || "暂无企业")}</strong>
            </div>
          </div>
          <div class="watch-radar-stage" aria-label="企业风险雷达监测图">
              <div class="watch-radar-grid"></div>
              <div class="watch-radar-rings"><span></span><span></span><span></span><span></span></div>
              <div class="watch-radar-axis watch-radar-axis--x"></div>
              <div class="watch-radar-axis watch-radar-axis--y"></div>
              <div class="watch-radar-sweep"></div>
              <div class="watch-radar-center">
                <strong>高风险</strong>
                <span>中心区</span>
              </div>
              ${watched.map((item) => renderWatchlistRadarPoint(item)).join("")}
            </div>
            <div class="watch-radar-legend">
              <span><i class="watch-industry-dot industry-cyan"></i>工业传感器 / 智能制造</span>
              <span><i class="watch-industry-dot industry-purple"></i>医药 / 生物医药</span>
              <span><i class="watch-industry-dot industry-orange"></i>食品酒饮</span>
              <span><i class="watch-industry-dot industry-green"></i>能源 / 材料</span>
              <span><i class="watch-industry-dot industry-slate"></i>其他行业</span>
            </div>
          </article>
          <aside class="watchlist-main-lower watchlist-side watchlist-industry-side">
            ${mode === "detail" && insight ? renderWatchlistDetailPanel(insight) : renderWatchlistOverviewPanel(watched, focused)}
          </aside>
        </div>
        ${renderWatchlistAssistantRail(watched, insight)}
      </div>
    </section>
  `;
}

function renderReportCenter() {
  const selectedReport = getSelectedReportConfig();
  const allCompaniesLoaded = Boolean(state.meta && Array.isArray(state.companies));
  const reportCompanies = getReportCenterCompaniesFiltered();
  const company = getCompanySummary(state.processEngineCompanyCode);
  const detail = getCompanyDetail(state.processEngineCompanyCode);
  const hasSearchKeyword = Boolean(state.reportCenterSearchKeyword.trim());

  if (state.reportCenterView === "detail") {
    if (!company) {
      state.reportCenterView = "company-list";
      renderReportCenter();
      return;
    }

    if (selectedReport.id !== "due-diligence") {
      const statusMeta = getReportCompanyStatus(selectedReport, company, 0);
      contentAreaEl.innerHTML = `
        <section class="report-center-screen">
          <div class="page-title-row report-title-row">
            <div>
              <p class="section-kicker">洞察报告 / ${escapeHtml(selectedReport.title)}</p>
              <h2>${escapeHtml(company.name)} · ${escapeHtml(selectedReport.title)}</h2>
              <p>${escapeHtml(selectedReport.detailSummary)}</p>
            </div>
            <div class="button-row">
              <button
                class="secondary-action"
                type="button"
                data-action="open-task-workbench"
                data-company-code="${escapeHtml(company.company_code || company.companyCode || company.id || state.processEngineCompanyCode || DEMO_COMPANY_CODE)}"
              >返回尽调工作台</button>
              <button class="ghost-action" type="button" data-action="back-report-company-list">返回企业清单</button>
              <button class="ghost-action" type="button" data-action="back-report-hub">返回报告类型</button>
            </div>
          </div>
          <div class="report-company-detail-grid">
            <article class="glass-panel report-company-sheet-panel">
              ${renderReportTemplatePreview(company, statusMeta, {
                detail: true,
                title: selectedReport.title,
                subtitle: statusMeta.note,
              })}
            </article>
            <article class="glass-panel report-company-meta-panel">
              <div class="summary-stack">
                <div class="summary-item"><strong>当前状态</strong><span>${escapeHtml(statusMeta.label)} / ${escapeHtml(statusMeta.note)}</span></div>
                <div class="summary-item"><strong>企业名称</strong><span>${escapeHtml(company.name)}</span></div>
                ${formatCompanyIndustry(company) !== "待补行业" ? `<div class="summary-item"><strong>所属行业</strong><span>${escapeHtml(formatCompanyIndustry(company))}</span></div>` : ""}
                ${company.operating_status ? `<div class="summary-item"><strong>经营状态</strong><span>${escapeHtml(formatOperatingStatus(company.operating_status))}</span></div>` : ""}
              </div>
              <div class="alert-stack" style="margin-top: 18px;">
                <div class="alert-item medium"><strong>当前说明</strong><span>${escapeHtml(selectedReport.detailSummary)}</span></div>
                <div class="alert-item medium"><strong>下一步建议</strong><span>先完成该报告类型所需输入，再进入正式生成或审批流转。</span></div>
              </div>
            </article>
          </div>
        </section>
      `;
      return;
    }

    if (!detail) {
      const statusMeta = getReportCompanyStatus(selectedReport, company, 0);
      contentAreaEl.innerHTML = `
        <section class="report-center-screen">
          <div class="page-title-row report-title-row">
            <div>
              <p class="section-kicker">尽调报告 / 加载中</p>
              <h2>${escapeHtml(company.name)} 尽调报告</h2>
              <p>正在加载该企业的报告工作区，请稍候。</p>
            </div>
            <div class="button-row">
              <button
                class="secondary-action"
                type="button"
                data-action="open-task-workbench"
                data-company-code="${escapeHtml(company.company_code || company.companyCode || company.id || state.processEngineCompanyCode || DEMO_COMPANY_CODE)}"
              >返回尽调工作台</button>
              <button class="ghost-action" type="button" data-action="back-report-company-list">返回企业清单</button>
              <button class="ghost-action" type="button" data-action="back-report-hub">返回报告类型</button>
            </div>
          </div>
          <div class="report-company-detail-grid">
            <article class="glass-panel report-company-sheet-panel">
              ${renderReportTemplatePreview(company, statusMeta, { detail: true, title: "尽调报告", subtitle: "正在载入报告内容..." })}
            </article>
            <article class="glass-panel report-company-meta-panel">
              <div class="empty-state">
                <h3>报告数据加载中</h3>
                <p>正在从后端读取该企业的报告版本、知识库引用和正文内容。</p>
              </div>
            </article>
          </div>
        </section>
      `;
      return;
    }

    syncSelectedVersion(detail);
    syncKnowledgeSelection(detail);
    const active = state.dueDiligenceTabId === "report-review" ? "review" : "generation";
    const version = getCurrentVersion(detail);
    const immersive = active === "generation" && state.reportImmersiveMode && version;
    contentAreaEl.innerHTML = `
      <section class="report-center-screen${immersive ? " report-center-screen--immersive" : ""}">
        ${immersive ? "" : `
        <div class="page-title-row report-title-row">
          <div>
            <p class="section-kicker">洞察报告 / ${active === "review" ? "预审" : "尽调报告"}</p>
            <h2>${escapeHtml(company.name)} 尽调报告</h2>
            <p>这是当前唯一已开放的完整报告链路，支持生成、编辑、预审与证据溯源。</p>
          </div>
          <div class="button-row">
            <button
              class="secondary-action"
              type="button"
              data-action="open-task-workbench"
              data-company-code="${escapeHtml(company.company_code || company.companyCode || company.id || state.processEngineCompanyCode || DEMO_COMPANY_CODE)}"
            >返回尽调工作台</button>
            <button class="ghost-action" type="button" data-action="back-report-company-list">返回企业清单</button>
            <button class="ghost-action" type="button" data-action="back-report-hub">返回报告类型</button>
            ${render尽调智能体Persona("tiny")}
          </div>
        </div>
        `}
        ${immersive ? "" : `
        <div class="process-tab-strip">
          <div class="tab-row">
            <button class="tab-button${active === "generation" ? " is-active" : ""}" type="button" data-action="switch-report-pane" data-report-pane="generation">报告生成</button>
            <button class="tab-button${active === "review" ? " is-active" : ""}" type="button" data-action="switch-report-pane" data-report-pane="review">报告预审</button>
          </div>
        </div>
        `}
        ${active === "review" ? renderDueDiligenceReportReview(detail) : renderDueDiligenceReportGenerate(detail)}
        ${version ? "" : '<div class="empty-state"><h3>暂无报告版本</h3><p>请先生成尽调报告。</p></div>'}
      </section>
    `;
    return;
  }

  if (state.reportCenterView === "company-list") {
    contentAreaEl.innerHTML = `
      <section class="report-center-screen">
        <div class="page-title-row report-title-row">
          <div>
            <p class="section-kicker">Report Company List</p>
            <h2>${escapeHtml(selectedReport.companyListTitle)}</h2>
            <p>${escapeHtml(selectedReport.companyListSummary)}</p>
          </div>
          <div class="button-row">
            <button class="ghost-action" type="button" data-action="back-report-hub">返回报告类型</button>
            <input
              class="search-box report-center-search-input"
              id="report-center-search-input"
              placeholder="搜索企业名称或行业"
              value="${escapeHtml(state.reportCenterSearchKeyword)}"
            />
          </div>
        </div>
        <article class="glass-panel report-company-selector-panel">
          <div class="report-company-selector-head">
            <div>
              <p class="section-kicker">Enterprise Picker</p>
              <h3>选择企业</h3>
              <p>先选企业，再进入对应${escapeHtml(selectedReport.title)}工作区。清单顺序严格沿用后端接口返回顺序。</p>
            </div>
          </div>
          <div class="report-company-grid">
            ${!allCompaniesLoaded
              ? Array.from({ length: 8 }, () => renderReportCompanyCardSkeleton()).join("")
              : reportCompanies.length
                ? reportCompanies
                    .map((item, index) => {
                      const statusMeta = getReportCompanyStatus(selectedReport, item, index);
                      const isSelected = item.company_code === state.processEngineCompanyCode;
                      const isLoading = item.company_code === state.reportCenterLoadingCompanyCode;
                      return `
                        <button
                          class="report-company-card${isSelected ? " is-selected" : ""}${isLoading ? " is-loading" : ""}"
                          type="button"
                          data-action="open-report-company"
                          data-company-code="${item.company_code}"
                        >
                          ${renderReportTemplatePreview(item, statusMeta, {
                            title: selectedReport.title,
                            subtitle: isLoading ? "正在打开报告工作台..." : statusMeta.note,
                          })}
                          <div class="report-company-card__meta">
                            <strong>${escapeHtml(item.name)}</strong>
                            ${formatCompanyIndustry(item) !== "待补行业" ? `<span>${escapeHtml(formatCompanyIndustry(item))}</span>` : ""}
                            ${item.operating_status ? `<span class="report-company-card__aux">${escapeHtml(formatOperatingStatus(item.operating_status))}</span>` : ""}
                          </div>
                        </button>
                      `;
                    })
                    .join("")
                : hasSearchKeyword
                  ? '<div class="empty-state report-company-empty"><h3>未找到匹配企业</h3><p>请尝试更换公司名称或行业关键词。</p></div>'
                  : '<div class="empty-state report-company-empty"><h3>暂无可展示企业</h3><p>请先完成企业录入或数据同步。</p></div>'}
          </div>
          ${state.reportCenterError ? `<div class="empty-state report-company-error"><h3>加载失败</h3><p>${escapeHtml(state.reportCenterError)}</p></div>` : ""}
        </article>
      </section>
    `;
    return;
  }

  contentAreaEl.innerHTML = `
    <section class="report-center-screen">
      <div class="page-title-row report-title-row">
        <div>
          <p class="section-kicker">Insight Reports</p>
          <h2>洞察报告总览</h2>
          <p>先选择报告类型，再进入对应企业清单，最后打开具体企业的报告工作台。</p>
        </div>
      </div>
      <div class="report-hub-grid">
        ${reportCenterCatalog
          .map(
            (item) => `
              <button class="report-hub-card ${item.cardClass}" type="button" data-action="choose-report-type" data-report-type-id="${item.id}">
                <span class="report-hub-status ${item.statusClass}">${item.statusLabel}</span>
                <strong>${item.title}</strong>
                <p>${item.companyListSummary}</p>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderContent() {
  if (state.topSectionId === "home") {
    renderHome();
    return;
  }
  if (state.topSectionId === "risk-map") {
    renderMacroRiskMap();
    return;
  }
  if (state.topSectionId === "due-task") {
    renderDueTask();
    return;
  }
  if (state.topSectionId === "enterprise-library") {
    renderEnterpriseLibrary();
    return;
  }
  if (state.topSectionId === "watchlist") {
    renderWatchlist();
    return;
  }
  if (state.topSectionId === "report-center") {
    renderReportCenter();
    return;
  }
  if (state.topSectionId === "knowledge-center") {
    renderKnowledgeBase();
    return;
  }
  if (state.topSectionId === "risk-view") {
    renderRiskView();
    return;
  }
  if (state.topSectionId === "process-engine") {
    renderProcessEngine();
    return;
  }
  if (state.topSectionId === "knowledge-base") {
    renderKnowledgeBase();
    return;
  }
  renderSystemAdmin();
}

function createDocumentAnchor(prefix, title, index) {
  const slug = String(title || `section-${index + 1}`)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${prefix}-${slug || `section-${index + 1}`}-${index + 1}`;
}

function getReportReferences(version) {
  const references = Array.isArray(version?.references) ? version.references : [];
  if (references.length) return references;
  const fallback = [];
  (version?.knowledge_files || []).forEach((file, index) => {
    fallback.push({
      id: `R${fallback.length + 1}`,
      source_type: file.category_title || localizeText(file.category) || "知识库文件",
      title: file.name || `知识库文件 ${index + 1}`,
      locator: file.owner ? `上传人：${file.owner}` : "知识库文件",
      excerpt: file.description || file.content_text || "该文件已作为当前版本的知识库引用依据。",
      source_path: file.stored_name || "",
      source_id: file.id || "",
    });
  });
  (version?.based_on || []).forEach((item) => {
    if (/skill pipeline|mock vdr|deepseek|fallback|\.agent|模型|生成模式/i.test(String(item || ""))) return;
    fallback.push({
      id: `R${fallback.length + 1}`,
      source_type: "生成依据",
      title: item,
      locator: "历史版本降级来源",
      excerpt: item,
      source_path: "",
      source_id: "",
    });
  });
  return fallback;
}

function getReferenceById(referenceId, version = getCurrentVersion()) {
  return getReportReferences(version).find((item) => item.id === referenceId) || null;
}

function getReferenceAliasCandidates(value) {
  const raw = String(value || "").trim();
  if (!raw) return [];
  const withoutDot = raw.startsWith("./") ? raw.slice(2) : raw;
  const candidates = new Set([raw, withoutDot]);
  if (withoutDot.startsWith(".agent/")) candidates.add(`./${withoutDot}`);
  if (withoutDot.includes("/")) candidates.add(withoutDot.split("/").pop());
  return Array.from(candidates).filter(Boolean);
}

function buildReferenceAliasMap(version = getCurrentVersion()) {
  const aliasMap = new Map();
  getReportReferences(version).forEach((ref) => {
    [ref.id, ref.source_path, ref.source_id, ref.title].forEach((value) => {
      getReferenceAliasCandidates(value).forEach((alias) => aliasMap.set(alias, ref));
    });
  });
  return aliasMap;
}

function getReferenceByToken(token, version = getCurrentVersion()) {
  const raw = String(token || "").trim();
  if (!raw) return null;
  if (/^R\d+$/i.test(raw)) return getReferenceById(raw.toUpperCase(), version);
  const aliasMap = buildReferenceAliasMap(version);
  for (const alias of getReferenceAliasCandidates(raw)) {
    const ref = aliasMap.get(alias);
    if (ref) return ref;
  }
  return null;
}

function getReferenceUsageMap(text = "", version = getCurrentVersion()) {
  const usage = {};
  String(text || "").replace(/\[([^[\]]+)\]/g, (_, token) => {
    const ref = getReferenceByToken(token, version);
    if (!ref) return _;
    usage[ref.id] = (usage[ref.id] || 0) + 1;
    return _;
  });
  return usage;
}

function renderReferencePopover(ref) {
  if (!ref) return "";
  return `
    <span class="doc-citation-popover" role="tooltip">
      <strong>${escapeHtml(ref.title || ref.id)}</strong>
      <span>${escapeHtml(ref.source_type || "来源")}${ref.locator ? `｜${escapeHtml(ref.locator)}` : ""}</span>
      <em>${escapeHtml(ref.excerpt || "暂无来源摘要。")}</em>
    </span>
  `;
}

function renderRichInline(text) {
  let html = escapeHtml(text || "");
  const referenceTokens = [];
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  html = html.replace(/\+\+([^+\n]+)\+\+/g, "<u>$1</u>");
  html = html.replace(/==([^=\n]+)==/g, '<mark class="doc-highlight">$1</mark>');
  html = html.replace(/\[([^[\]]+)\]/g, (_match, rawToken) => {
    const ref = getReferenceByToken(rawToken);
    if (!ref) return `<span class="doc-citation">[${rawToken}]</span>`;
    const refId = ref.id;
    const title = `${ref.title || ref.id}：${ref.excerpt || ""}`;
    const token = `__REFERENCE_TOKEN_${referenceTokens.length}__`;
    referenceTokens.push(`<button class="doc-citation doc-citation--reference${state.activeReferenceId === refId ? " is-active" : ""}" type="button" data-action="focus-reference" data-reference-id="${refId}" title="${escapeHtml(title)}">[${refId}]${renderReferencePopover(ref)}</button>`);
    return token;
  });
  referenceTokens.forEach((markup, index) => {
    html = html.replace(`__REFERENCE_TOKEN_${index}__`, markup);
  });
  return html;
}

function parseMarkdownTableRows(lines) {
  const rows = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
  if (rows.length >= 2 && rows[1].every((cell) => /^:?-{3,}:?$/.test(cell))) {
    rows.splice(1, 1);
  }
  return rows;
}

function renderMarkdownTable(lines) {
  const rows = parseMarkdownTableRows(lines);
  if (!rows.length) return "";
  const [headers, ...bodyRows] = rows;
  return `
    <div class="doc-table-wrap">
      <table class="doc-table">
        <thead>
          <tr>${headers.map((cell) => `<th>${renderRichInline(cell)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${bodyRows
            .map(
              (row) => `
                <tr>${headers.map((_, index) => `<td>${renderRichInline(row[index] || "")}</td>`).join("")}</tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderBlockParagraph(lines) {
  return `<p>${renderRichInline(lines.join(" "))}</p>`;
}

function renderBlockList(items, ordered = false) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag}>${items.map((item) => `<li>${renderRichInline(item)}</li>`).join("")}</${tag}>`;
}

function renderMarkdownBody(text) {
  const lines = String(text || "").replace(/\r/g, "").split("\n");
  const parts = [];
  let paragraph = [];
  let listItems = [];
  let listOrdered = false;
  let tableLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    parts.push(renderBlockParagraph(paragraph));
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    parts.push(renderBlockList(listItems, listOrdered));
    listItems = [];
  };

  const flushTable = () => {
    if (!tableLines.length) return;
    parts.push(renderMarkdownTable(tableLines));
    tableLines = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      flushTable();
      return;
    }

    if (line.startsWith("|")) {
      flushParagraph();
      flushList();
      tableLines.push(line);
      return;
    }
    flushTable();

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      parts.push(`<h3>${renderRichInline(line.replace(/^###\s+/, ""))}</h3>`);
      return;
    }
    if (line.startsWith("#### ")) {
      flushParagraph();
      flushList();
      parts.push(`<h4>${renderRichInline(line.replace(/^####\s+/, ""))}</h4>`);
      return;
    }

    const orderedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listItems.length && !listOrdered) flushList();
      listOrdered = true;
      listItems.push(orderedMatch[2]);
      return;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listItems.length && listOrdered) flushList();
      listOrdered = false;
      listItems.push(unorderedMatch[1]);
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  flushTable();

  return parts.join("");
}

function buildDocumentSections(text, fallbackSections = [], anchorPrefix = "doc") {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  const lines = normalized ? normalized.split("\n") : [];
  const headingPattern = /^(第[一二三四五六七八九十百0-9]+章)/;
  const sections = [];
  let current = null;

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("# ")) return;
    const normalizedHeading = line.startsWith("## ") ? line.replace(/^##\s+/, "") : line;
    if (headingPattern.test(normalizedHeading)) {
      if (current) sections.push(current);
      current = {
        title: normalizedHeading,
        lines: [],
      };
      return;
    }
    if (!current) {
      current = {
        title: fallbackSections[0]?.title || "尽职调查报告正文",
        lines: [],
      };
    }
    current.lines.push(rawLine);
  });

  if (current) sections.push(current);

  if (!sections.length && fallbackSections.length) {
    return fallbackSections.map((section, index) => ({
      id: section.id || `fallback-${index + 1}`,
      title: section.title,
      anchor: createDocumentAnchor(anchorPrefix, section.title, index),
      html: renderMarkdownBody(section.content || ""),
    }));
  }

  return sections.map((section, index) => ({
    id: fallbackSections[index]?.id || `${anchorPrefix}-${index + 1}`,
    title: section.title,
    anchor: createDocumentAnchor(anchorPrefix, section.title, index),
    html: renderMarkdownBody(section.lines.join("\n").trim()),
  }));
}

function clampReportCanvasZoom(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 100;
  return Math.min(140, Math.max(80, numeric));
}

function getReportZoomStyle(variant = "generated") {
  if (variant !== "generated" || !state.reportImmersiveMode) return "";
  const zoom = clampReportCanvasZoom(state.reportCanvasZoom) / 100;
  const pageWidth = Math.round(1040 * zoom);
  const paddingY = Math.round(32 * zoom);
  const paddingX = Math.round(38 * zoom);
  const bodySize = Math.round(16 * zoom * 10) / 10;
  const titleSize = Math.round(30 * zoom * 10) / 10;
  const h3Size = Math.round(22 * zoom * 10) / 10;
  const h4Size = Math.round(18 * zoom * 10) / 10;
  const tablePaddingY = Math.round(13 * zoom);
  const tablePaddingX = Math.round(14 * zoom);
  return [
    `--report-page-width:${pageWidth}px`,
    `--report-page-max-width:${pageWidth}px`,
    `--report-page-padding-y:${paddingY}px`,
    `--report-page-padding-x:${paddingX}px`,
    `--report-body-font-size:${bodySize}px`,
    `--report-title-font-size:${titleSize}px`,
    `--report-h3-font-size:${h3Size}px`,
    `--report-h4-font-size:${h4Size}px`,
    `--report-table-padding-y:${tablePaddingY}px`,
    `--report-table-padding-x:${tablePaddingX}px`,
  ].join(";");
}

function renderReportZoomControl(variant = "generated") {
  if (variant !== "generated" || !state.reportImmersiveMode) return "";
  const zoom = clampReportCanvasZoom(state.reportCanvasZoom);
  return `
    <div class="report-zoom-control" role="group" aria-label="沉浸画布缩放">
      <button class="report-editor-command" type="button" data-action="adjust-report-zoom" data-zoom-command="out" title="缩小画布">-</button>
      <span class="report-zoom-value">${zoom}%</span>
      <button class="report-editor-command" type="button" data-action="adjust-report-zoom" data-zoom-command="in" title="放大画布">+</button>
      <button class="report-editor-command report-zoom-reset" type="button" data-action="adjust-report-zoom" data-zoom-command="reset" title="恢复默认比例">重置</button>
    </div>
  `;
}

function renderReportEditorToolbar(variant) {
  const toolbarId = `report-editor-toolbar-${variant}`;
  return `
    <div class="report-editor-toolbar" id="${toolbarId}" data-report-toolbar="${variant}" aria-label="报告排版工具栏">
      ${renderReportZoomControl(variant)}
      <select class="report-editor-select" data-report-command="formatBlock" data-report-variant="${variant}" title="标题级别">
        <option value="p">正文</option>
        <option value="h3">标题 1</option>
        <option value="h4">标题 2</option>
      </select>
      <select class="report-editor-select" data-report-command="fontSize" data-report-variant="${variant}" title="字体大小">
        <option value="3">16</option>
        <option value="2">14</option>
        <option value="4">18</option>
        <option value="5">22</option>
      </select>
      <div class="report-editor-group" role="group" aria-label="字体样式">
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="bold" data-report-variant="${variant}" title="加粗"><strong>B</strong></button>
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="italic" data-report-variant="${variant}" title="斜体"><em>I</em></button>
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="underline" data-report-variant="${variant}" title="下划线"><u>U</u></button>
      </div>
      <div class="report-editor-group" role="group" aria-label="列表和对齐">
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="insertUnorderedList" data-report-variant="${variant}" title="项目列表">•</button>
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="insertOrderedList" data-report-variant="${variant}" title="编号列表">1.</button>
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="justifyLeft" data-report-variant="${variant}" title="左对齐">L</button>
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="justifyCenter" data-report-variant="${variant}" title="居中">C</button>
        <button class="report-editor-command" type="button" data-action="apply-report-format" data-report-command="justifyRight" data-report-variant="${variant}" title="右对齐">R</button>
      </div>
      <label class="report-color-control" title="字体颜色">
        <span>A</span>
        <input type="color" value="#dbe8ff" data-report-command="foreColor" data-report-variant="${variant}" />
      </label>
      <label class="report-color-control" title="高亮色">
        <span>H</span>
        <input type="color" value="#3157ff" data-report-command="hiliteColor" data-report-variant="${variant}" />
      </label>
      <button class="report-editor-command report-editor-insert-table" type="button" data-action="apply-report-format" data-report-command="insertTable" data-report-variant="${variant}" title="插入表格">表格</button>
    </div>
  `;
}

function renderDocumentWorkspace(version, editorText, textareaId, variant = "generated", title = "报告编辑画布") {
  const sections = buildDocumentSections(editorText, version?.section_list || [], `report-${variant}`);
  const activeAnchor = sections.find((item) => item.anchor === state.previewSectionId)?.anchor || sections[0]?.anchor || "";
  const zoomStyle = getReportZoomStyle(variant);
  return `
    <div class="report-document-shell"${zoomStyle ? ` style="${zoomStyle}"` : ""}>
      <aside class="report-outline-panel" id="report-outline-${variant}">
        <div class="report-outline-head">
          <p class="section-kicker">目录导航</p>
          <h4>章节</h4>
        </div>
        <div class="report-outline-list">
          ${sections
            .map(
              (section) => `
                <button
                  class="report-outline-item${section.anchor === activeAnchor ? " is-active" : ""}"
                  type="button"
                  data-action="jump-report-section"
                  data-report-anchor="${section.anchor}"
                  data-report-variant="${variant}"
                >${escapeHtml(section.title)}</button>
              `,
            )
            .join("")}
        </div>
      </aside>
      <div class="report-canvas-stage">
        <div class="report-canvas-head">
          <div>
            <p class="section-kicker">文档画布</p>
            <h4>${title}</h4>
          </div>
          <span class="report-editor-count">${editorText.length.toLocaleString()} 字</span>
        </div>
        ${renderReportEditorToolbar(variant)}
        <article class="report-document-canvas" id="report-preview-${variant}">
          ${sections
            .map(
              (section) => `
                <section class="report-doc-section${section.anchor === activeAnchor ? " is-target" : ""}" id="${section.anchor}">
                  <h2>${escapeHtml(section.title)}</h2>
                  <div class="report-doc-body" contenteditable="true" spellcheck="false" data-report-body="true" data-report-variant="${variant}">${section.html || "<p>当前章节暂无正文。</p>"}</div>
                </section>
              `,
            )
            .join("")}
        </article>
      </div>
      <textarea class="form-textarea report-canvas report-canvas-hidden${variant === "review" ? " report-canvas-review" : ""}" id="${textareaId}">${escapeHtml(editorText)}</textarea>
    </div>
  `;
}

function serializeInlineMarkdownFromNode(node) {
  if (!node) return "";
  if (node.nodeType === Node.TEXT_NODE) return node.textContent || "";
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const element = node;
  const text = Array.from(element.childNodes).map((child) => serializeInlineMarkdownFromNode(child)).join("");
  if (element.classList.contains("doc-citation--reference")) return `[${element.dataset.referenceId || text.replace(/\[|\]/g, "")}]`;
  if (element.classList.contains("doc-citation")) return text;
  if (element.tagName === "STRONG" || element.tagName === "B") return `**${text}**`;
  if (element.tagName === "EM" || element.tagName === "I") return `*${text}*`;
  if (element.tagName === "U") return `++${text}++`;
  if (element.tagName === "MARK" || element.classList.contains("doc-highlight")) return `==${text}==`;
  if (element.tagName === "CODE") return `\`${text}\``;
  if (element.tagName === "BR") return "\n";
  return text;
}

function serializeTableMarkdown(tableEl) {
  const headerCells = Array.from(tableEl.querySelectorAll("thead th")).map((cell) => serializeInlineMarkdownFromNode(cell).trim());
  const bodyRows = Array.from(tableEl.querySelectorAll("tbody tr")).map((row) =>
    Array.from(row.querySelectorAll("td")).map((cell) => serializeInlineMarkdownFromNode(cell).trim()),
  );
  if (!headerCells.length) return "";
  const lines = [
    `| ${headerCells.join(" | ")} |`,
    `| ${headerCells.map(() => "---").join(" | ")} |`,
    ...bodyRows.map((row) => `| ${headerCells.map((_, index) => row[index] || "").join(" | ")} |`),
  ];
  return lines.join("\n");
}

function serializeBlockMarkdownFromElement(element) {
  if (!element) return "";
  const tag = element.tagName;
  if (tag === "P") return serializeInlineMarkdownFromNode(element).trim();
  if (tag === "H3") return `### ${serializeInlineMarkdownFromNode(element).trim()}`;
  if (tag === "H4") return `#### ${serializeInlineMarkdownFromNode(element).trim()}`;
  if (tag === "UL") {
    return Array.from(element.querySelectorAll(":scope > li"))
      .map((item) => `- ${serializeInlineMarkdownFromNode(item).trim()}`)
      .join("\n");
  }
  if (tag === "OL") {
    return Array.from(element.querySelectorAll(":scope > li"))
      .map((item, index) => `${index + 1}. ${serializeInlineMarkdownFromNode(item).trim()}`)
      .join("\n");
  }
  if (element.classList.contains("doc-table-wrap")) {
    const tableEl = element.querySelector("table");
    return tableEl ? serializeTableMarkdown(tableEl) : "";
  }
  if (tag === "TABLE") return serializeTableMarkdown(element);
  return serializeInlineMarkdownFromNode(element).trim();
}

function serializeDocumentWorkspaceToMarkdown(variant = "generated") {
  const previewEl = document.getElementById(`report-preview-${variant}`);
  if (!previewEl) return variant === "review" ? state.reviewEditorText : state.reportEditorText;
  const sections = Array.from(previewEl.querySelectorAll(".report-doc-section"));
  const blocks = sections.map((section) => {
    const title = section.querySelector("h2")?.textContent?.trim() || "尽职调查报告正文";
    const bodyEl = section.querySelector(".report-doc-body");
    const bodyBlocks = bodyEl
      ? Array.from(bodyEl.children)
          .map((child) => serializeBlockMarkdownFromElement(child))
          .filter(Boolean)
          .join("\n\n")
      : "";
    return `## ${title}\n${bodyBlocks}`.trim();
  });
  return blocks.join("\n\n").trim();
}

function syncReportEditorTextFromWorkspace(variant = "generated") {
  const markdown = serializeDocumentWorkspaceToMarkdown(variant);
  if (variant === "review") {
    state.reviewEditorText = markdown;
  } else {
    state.reportEditorText = markdown;
  }
  const textareaEl = document.getElementById(variant === "review" ? "review-editor-textarea" : "report-editor-textarea");
  if (textareaEl) textareaEl.value = markdown;
  const countEl = document.querySelector(`#report-editor-toolbar-${variant}`)?.previousElementSibling?.querySelector(".report-editor-count");
  if (countEl) countEl.textContent = `${markdown.length.toLocaleString()} 字`;
  if (state.previewOpen) renderPreviewDrawer();
}

function getActiveReportBody(variant = "generated") {
  const selection = window.getSelection();
  const selectedNode = selection?.anchorNode;
  const selectedElement = selectedNode?.nodeType === Node.ELEMENT_NODE ? selectedNode : selectedNode?.parentElement;
  const selectedBody = selectedElement?.closest?.(`[data-report-body="true"][data-report-variant="${variant}"]`);
  if (selectedBody) return selectedBody;
  const focusedBody = document.activeElement?.closest?.(`[data-report-body="true"][data-report-variant="${variant}"]`);
  if (focusedBody) return focusedBody;
  return document.querySelector(`[data-report-body="true"][data-report-variant="${variant}"]`);
}

function insertReportTable(variant = "generated") {
  const tableHtml = `
    <div class="doc-table-wrap">
      <table class="doc-table">
        <thead>
          <tr><th>项目</th><th>内容</th><th>核查说明</th></tr>
        </thead>
        <tbody>
          <tr><td>待补充</td><td>待补充</td><td>待补充</td></tr>
          <tr><td>待补充</td><td>待补充</td><td>待补充</td></tr>
        </tbody>
      </table>
    </div>
    <p><br></p>
  `;
  document.execCommand("insertHTML", false, tableHtml);
  syncReportEditorTextFromWorkspace(variant);
}

function applyReportEditorCommand(command, value, variant = "generated") {
  const body = getActiveReportBody(variant);
  if (!body) return;
  body.focus();
  if (command === "insertTable") {
    insertReportTable(variant);
    return;
  }
  if (command === "formatBlock") {
    document.execCommand(command, false, value === "p" ? "p" : value);
  } else {
    document.execCommand(command, false, value || null);
  }
  syncReportEditorTextFromWorkspace(variant);
}

function scrollToReportAnchor(anchor, behavior = "smooth") {
  if (!anchor) return;
  requestAnimationFrame(() => {
    const target = document.getElementById(anchor);
    if (target) target.scrollIntoView({ behavior, block: "start" });
  });
}

function syncReferenceHighlight(referenceId, variant = "generated") {
  document.querySelectorAll(".doc-citation--reference.is-active, .report-reference-item.is-active").forEach((item) => {
    item.classList.remove("is-active");
  });
  if (!referenceId) return;
  document.querySelectorAll(`[data-reference-id="${referenceId}"]`).forEach((item) => {
    if (item.classList.contains("doc-citation--reference") || item.classList.contains("report-reference-item")) {
      item.classList.add("is-active");
    }
  });
  const previewEl = document.getElementById(`report-preview-${variant}`);
  const firstCitation = previewEl?.querySelector(`.doc-citation--reference[data-reference-id="${referenceId}"]`);
  const section = firstCitation?.closest(".report-doc-section");
  if (section?.id) {
    state.previewSectionId = section.id;
    document.querySelectorAll(`#report-preview-${variant} .report-doc-section.is-target`).forEach((item) => item.classList.remove("is-target"));
    section.classList.add("is-target");
  }
}

function pulseElement(element, className = "is-pulsing", duration = 1400) {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  window.setTimeout(() => element.classList.remove(className), duration);
}

function runReportSearch(variant = "generated") {
  const inputEl = document.getElementById("report-search-input");
  const keyword = (inputEl?.value || state.reportSearchKeyword || "").trim().toLowerCase();
  state.reportSearchKeyword = inputEl?.value || state.reportSearchKeyword;
  if (!keyword) {
    inputEl?.focus();
    return;
  }

  syncReportEditorTextFromWorkspace(variant);
  const previewEl = document.getElementById(`report-preview-${variant}`);
  const sections = Array.from(previewEl?.querySelectorAll(".report-doc-section") || []);
  const matchedSection = sections.find((section) => (section.textContent || "").toLowerCase().includes(keyword));

  if (!matchedSection) {
    inputEl?.setCustomValidity(`未找到“${inputEl?.value || state.reportSearchKeyword}”`);
    inputEl?.reportValidity();
    window.setTimeout(() => inputEl?.setCustomValidity(""), 1800);
    return;
  }

  state.previewSectionId = matchedSection.id;
  updateDocumentWorkspace(variant);
  scrollToReportAnchor(matchedSection.id);
}

function focusReportReference(referenceId, variant = "generated", direction = "citation") {
  if (!referenceId) return;
  state.activeReferenceId = referenceId;
  state.reportReferencesOpen = true;
  syncReferenceHighlight(referenceId, variant);
  requestAnimationFrame(() => {
    const citations = Array.from(document.querySelectorAll(`#report-preview-${variant} .doc-citation--reference[data-reference-id="${referenceId}"]`));
    const referenceItem = document.querySelector(`.report-reference-item[data-reference-id="${referenceId}"]`);
    syncReferenceHighlight(referenceId, variant);
    if ((direction === "citation" || direction === "both") && referenceItem) {
      referenceItem.scrollIntoView({ behavior: "smooth", block: "center" });
      pulseElement(referenceItem);
      referenceItem.focus?.({ preventScroll: true });
    }
    if ((direction === "reference" || direction === "both") && citations.length) {
      const chip = citations[0];
      chip.scrollIntoView({ behavior: "smooth", block: "center" });
      citations.forEach((citation) => pulseElement(citation));
      chip.focus?.({ preventScroll: true });
    }
  });
}

function updateDocumentWorkspace(variant = "generated") {
  const detail = getCompanyDetail(state.processEngineCompanyCode);
  const version = getCurrentVersion(detail);
  if (!version) return;
  const editorText = variant === "review" ? state.reviewEditorText : state.reportEditorText;
  const sections = buildDocumentSections(editorText, version.section_list || [], `report-${variant}`);
  const outlineListEl = document.querySelector(`#report-outline-${variant} .report-outline-list`);
  const previewEl = document.getElementById(`report-preview-${variant}`);
  const textareaEl = document.getElementById(variant === "review" ? "review-editor-textarea" : "report-editor-textarea");
  if (!outlineListEl || !previewEl) return;
  const activeAnchor = sections.find((item) => item.anchor === state.previewSectionId)?.anchor || sections[0]?.anchor || "";
  if (!state.previewSectionId && activeAnchor) state.previewSectionId = activeAnchor;
  outlineListEl.innerHTML = sections
    .map(
      (section) => `
        <button
          class="report-outline-item${section.anchor === activeAnchor ? " is-active" : ""}"
          type="button"
          data-action="jump-report-section"
          data-report-anchor="${section.anchor}"
          data-report-variant="${variant}"
        >${escapeHtml(section.title)}</button>
      `,
    )
    .join("");
  previewEl.innerHTML = sections
    .map(
      (section) => `
        <section class="report-doc-section${section.anchor === activeAnchor ? " is-target" : ""}" id="${section.anchor}">
          <h2>${escapeHtml(section.title)}</h2>
          <div class="report-doc-body" contenteditable="true" spellcheck="false" data-report-body="true" data-report-variant="${variant}">${section.html || "<p>当前章节暂无正文。</p>"}</div>
        </section>
      `,
    )
    .join("");
  if (textareaEl) textareaEl.value = editorText;
  if (state.previewOpen) renderPreviewDrawer();
}

function renderPreviewDrawer() {
  const detail = getCompanyDetail(state.processEngineCompanyCode);
  const version = getCurrentVersion(detail);
  if (!state.previewOpen || !detail || !version) {
    previewOverlayEl.classList.add("is-hidden");
    return;
  }
  previewOverlayEl.classList.remove("is-hidden");
  previewTitleEl.textContent = `${detail.company.name} · ${formatVersionDisplayLabel(version)}`;
  const drawerText = state.dueDiligenceTabId === "report-review"
    ? state.reviewEditorText || version.review_edit_text || version.full_text || ""
    : state.reportEditorText || version.full_text || "";
  const sections = buildDocumentSections(drawerText, version.section_list || [], "preview");
  const activeAnchor = sections.find((item) => item.anchor === state.previewSectionId)?.anchor || sections[0]?.anchor || "";
  previewOutlineEl.innerHTML = sections
    .map(
      (section) => `
        <button
          class="preview-nav-item${section.anchor === activeAnchor ? " is-active" : ""}"
          type="button"
          data-action="jump-report-section"
          data-report-anchor="${section.anchor}"
          data-report-variant="preview"
        >${escapeHtml(section.title)}</button>
      `,
    )
    .join("");
  previewArticleEl.innerHTML = sections
    .map(
      (section, index) => `
        <section class="preview-section${section.anchor === activeAnchor ? " is-target" : ""}" id="preview-${section.anchor}">
          <h4>${index + 1}. ${escapeHtml(section.title)}</h4>
          <div class="preview-section-body">${section.html}</div>
        </section>
      `,
    )
    .join("");
  requestAnimationFrame(() => {
    const target = document.getElementById(`preview-${activeAnchor}`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderCompletionModal() {
  if (!state.completionModalOpen) {
    completionModalEl.classList.add("is-hidden");
    return;
  }

  completionModalEl.classList.remove("is-hidden");
  const activeTitle = getActiveSidebarItem()?.title || "当前维度";
  const field = state.completionModalField ? `「${state.completionModalField.split(":").at(-1)}」` : activeTitle;
  const dirtyFields = state.completionModalType === "manual" ? getDirtyManualFieldsForSection(state.completionModalField?.split(":")[0]) : [];

  if (state.completionModalType === "ai") {
    const inventory = getRiskDataInventory(getActiveSidebarItem()?.id, getCompanyDetail(state.riskViewCompanyCode));
    completionModalTitleEl.textContent = "AI识别材料上传";
    completionModalBodyEl.innerHTML = `
      <p class="muted-text">请按指标上传佐证材料。POC 阶段先展示上传入口，后续可接入 OCR、结构化抽取和字段回写。</p>
      <div class="summary-stack" style="margin-top: 16px;">
        ${inventory
          .map((item) => {
            const key = `${getActiveSidebarItem()?.id || "risk"}:${item}`;
            return `
              <div class="summary-item">
                <strong>${escapeHtml(item)}</strong>
                ${renderCompletionUploadSlot(key)}
              </div>
            `;
          })
          .join("")}
      </div>
    `;
    return;
  }

  completionModalTitleEl.textContent = "手动修改需要补充材料";
  completionModalBodyEl.innerHTML = `
    <p class="muted-text">你已修改 ${escapeHtml(field)}。离开当前板块前，请上传能证明字段变化的材料，例如证照、报表、合同、流水、评估报告或客户经理现场记录。</p>
    ${dirtyFields.length > 1 ? `<p class="muted-text" style="margin-top: 10px;">当前板块还有 ${dirtyFields.length - 1} 个字段存在修改，请逐项补充依据。</p>` : ""}
    <div class="divider"></div>
    ${renderCompletionUploadSlot(state.completionModalField || `${getActiveSidebarItem()?.id || "risk"}:人工修改材料`)}
  `;
}

function render() {
  renderTopbar();
  renderSidebar();
  renderToolbar();
  renderContent();
  renderPreviewDrawer();
  renderCompletionModal();
  syncLocationFromState(true);
}

async function handleGenerateVersion() {
  if (!state.processEngineCompanyCode) return;
  state.isGeneratingVersion = true;
  render();
  try {
    const createdVersion = await fetchJson(`/api/company/${encodeURIComponent(state.processEngineCompanyCode)}/report-versions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        knowledge_file_ids: state.pendingKnowledgeSelection,
        data_source_ids: state.pendingDataSourceSelection,
      }),
    });
    state.reportVersionId = createdVersion.id;
    await refreshCompanyDetail(state.processEngineCompanyCode);
  } catch (error) {
    console.error(error);
    window.alert(`生成尽调报告失败：${error.message}`);
  } finally {
    state.isGeneratingVersion = false;
    render();
  }
}

async function handleRunReview() {
  const version = getCurrentVersion();
  if (!state.processEngineCompanyCode || !version) return;
  state.isRunningReview = true;
  render();
  try {
    await fetchJson(
      `/api/company/${encodeURIComponent(state.processEngineCompanyCode)}/report-versions/${encodeURIComponent(version.id)}/review`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          knowledge_file_ids: state.pendingKnowledgeSelection,
          report_text: state.reviewEditorText || state.reportEditorText || version.review_edit_text || version.full_text || "",
        }),
      },
    );
    await refreshCompanyDetail(state.processEngineCompanyCode);
    window.alert("风险提示清单生成成功。");
  } catch (error) {
    console.error(error);
    window.alert(`生成风险提示清单失败：${error.message}`);
  } finally {
    state.isRunningReview = false;
    render();
  }
}

async function handleSaveKnowledgeLinks() {
  const version = getCurrentVersion();
  if (!state.processEngineCompanyCode || !version) return;
  await postJson(
    `/api/company/${encodeURIComponent(state.processEngineCompanyCode)}/report-versions/${encodeURIComponent(version.id)}/knowledge-links`,
    { file_ids: state.pendingKnowledgeSelection },
  );
  await refreshCompanyDetail(state.processEngineCompanyCode);
  render();
}

async function handleSaveReportDraft(variant = "generated") {
  const version = getCurrentVersion();
  if (!state.processEngineCompanyCode || !version) return;
  await postJson(
    `/api/company/${encodeURIComponent(state.processEngineCompanyCode)}/report-versions/${encodeURIComponent(version.id)}/draft`,
    { variant, full_text: variant === "review" ? state.reviewEditorText : state.reportEditorText },
  );
  await refreshCompanyDetail(state.processEngineCompanyCode);
  render();
}

let portraitResizeSession = null;

document.addEventListener("click", async (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
	  const resetTopLevelViews = () => {
	    state.previewOpen = false;
	    state.previewSectionId = null;
      state.reportReferencesOpen = false;
      state.reportImmersiveMode = false;
      state.activeReferenceId = null;
	    state.riskMapRegionId = null;
	    state.reportCenterView = "hub";
	    state.reportCenterLoadingCompanyCode = null;
      state.reportCenterError = null;
	    state.taskBoardView = "list";
	    state.portraitView = "list";
      state.watchlistPanelMode = "overview";
      state.smartNavContext = null;
	  };
  if (action === "submit-home-command") {
    if (state.homeCommandIsComposing) return;
    const resolution = resolveHomeSmartCommand();
    if (!resolution.company) {
      state.homeCommandMessage = "未找到匹配企业，请尝试输入企业全称或简称。";
      rerenderHomeCommandCard();
      return;
    }
    await navigateToSmartRoute(resolution.routeKey, resolution.company);
    return;
  }
  if (action === "open-home-smart-route") {
    const company = getSmartNavCompanyById(target.dataset.companyId);
    await navigateToSmartRoute(target.dataset.routeKey, company);
    return;
  }
  if (action === "fill-home-command-example") {
    state.homeCommandInput = target.dataset.example || "";
    state.homeCommandMessage = "";
    rerenderHomeCommandCard();
    return;
  }
  if (action === "go-section") {
    state.topSectionId = target.dataset.topSection;
    resetTopLevelViews();
    if (state.topSectionId === "report-center") state.reportCenterView = "hub";
    syncLocationFromState();
    render();
    return;
  }
  if (action === "start-demo") {
    state.riskViewCompanyCode = DEMO_COMPANY_CODE;
    state.processEngineCompanyCode = DEMO_COMPANY_CODE;
    state.taskBoardCompanyCode = DEMO_COMPANY_CODE;
    state.topSectionId = "due-task";
    state.taskBoardTab = "collection";
    resetTopLevelViews();
    state.taskBoardView = "detail";
    rememberCompany("risk-view", DEMO_COMPANY_CODE);
    rememberCompany("process-engine", DEMO_COMPANY_CODE);
    await ensureCompanyDetail(DEMO_COMPANY_CODE);
    syncLocationFromState();
    render();
    return;
  }
	  if (action === "open-company") {
	    const code = target.dataset.companyCode || DEMO_COMPANY_CODE;
	    state.topSectionId = "enterprise-library";
	    state.portraitCompanyId = code;
	    resetTopLevelViews();
	    state.portraitView = "detail";
      state.portraitLoadingCompanyCode = code;
      state.portraitError = null;
	    syncLocationFromState();
	    render();
      try {
        await ensureCompanyDetail(code);
        const company = mapCompanyToPortraitListItem(getRealCompanySummary(code));
        if (!company) throw new Error("当前企业不在后端企业清单中");
        state.riskHouseFocusId = getPortraitDefaultFocusId(buildPortraitCompanyDetail(company, getCompanyDetail(code)));
      } catch (error) {
        state.portraitError = error.message || "企业画像详情加载失败";
      } finally {
        state.portraitLoadingCompanyCode = null;
        render();
      }
	    return;
	  }
  if (action === "generate-task-portrait") {
    const code = target.dataset.companyCode || state.taskBoardCompanyCode || DEMO_COMPANY_CODE;
    updateDueTaskGenerationState(code, { portraitGenerated: true });
    state.taskBoardCompanyCode = code;
    state.topSectionId = "enterprise-library";
    state.portraitCompanyId = code;
    resetTopLevelViews();
    state.portraitView = "detail";
    state.portraitLoadingCompanyCode = code;
    state.portraitError = null;
    syncLocationFromState();
    render();
    try {
      await ensureCompanyDetail(code);
      const company = mapCompanyToPortraitListItem(getRealCompanySummary(code));
      if (!company) throw new Error("当前企业不在后端企业清单中");
      state.riskHouseFocusId = getPortraitDefaultFocusId(buildPortraitCompanyDetail(company, getCompanyDetail(code)));
    } catch (error) {
      state.portraitError = error.message || "企业画像详情加载失败";
    } finally {
      state.portraitLoadingCompanyCode = null;
      render();
    }
    return;
  }
  if (action === "generate-task-report") {
    const code = target.dataset.companyCode || state.taskBoardCompanyCode || DEMO_COMPANY_CODE;
    updateDueTaskGenerationState(code, { portraitGenerated: true, reportGenerated: true });
    state.taskBoardCompanyCode = code;
    state.topSectionId = "report-center";
    state.processEngineCompanyCode = code;
    state.reportCenterReportTypeId = "due-diligence";
    state.reportCenterView = "detail";
    state.reportCenterLoadingCompanyCode = code;
    state.reportCenterError = null;
    state.dueDiligenceTabId = "report-generate";
    state.reportImmersiveMode = false;
    state.reportReferencesOpen = false;
    state.activeReferenceId = null;
    syncLocationFromState();
    render();
    try {
      await ensureCompanyDetail(code);
      const reportDetail = getCompanyDetail(code);
      syncSelectedVersion(reportDetail);
      syncKnowledgeSelection(reportDetail);
      rememberCompany("process-engine", code);
    } catch (error) {
      state.reportCenterError = error.message || "加载企业报告失败";
      state.reportCenterView = "company-list";
    } finally {
      state.reportCenterLoadingCompanyCode = null;
      render();
    }
    return;
  }
  if (action === "switch-report-pane") {
    state.topSectionId = "report-center";
    state.reportCenterView = "detail";
    state.reportCenterReportTypeId = "due-diligence";
    state.dueDiligenceTabId = target.dataset.reportPane === "review" ? "report-review" : "report-generate";
    if (state.dueDiligenceTabId === "report-review") state.reportImmersiveMode = false;
    render();
    return;
  }
	  if (action === "open-risk-region") {
	    state.topSectionId = "risk-map";
	    state.riskMapRegionId = normalizeRiskRegionId(target.dataset.regionId) || "beijing";
    state.previewOpen = false;
    state.previewSectionId = null;
    syncLocationFromState();
	    render();
	    return;
	  }
	  if (action === "focus-watchlist-company") {
	    const code = target.dataset.companyCode || DEMO_COMPANY_CODE;
	    state.topSectionId = "watchlist";
	    state.watchlistFocusCode = code;
      state.watchlistPanelMode = "detail";
      render();
      await ensureCompanyDetail(code).catch(() => {});
      render();
	    return;
	  }
	  if (action === "open-watchlist-company") {
	    const code = target.dataset.companyCode || DEMO_COMPANY_CODE;
	    state.watchlistFocusCode = code;
	    state.topSectionId = "watchlist";
      state.watchlistPanelMode = "detail";
      render();
	    await ensureCompanyDetail(code).catch(() => {});
	    render();
	    return;
	  }
    if (action === "watchlist-back-overview") {
      state.topSectionId = "watchlist";
      state.watchlistPanelMode = "overview";
      render();
      return;
    }
    if (action === "expand-watchlist-analysis") {
      const companyCode = target.dataset.companyCode;
      if (companyCode) state.watchlistFocusCode = companyCode;
      state.topSectionId = "watchlist";
      state.watchlistPanelMode = "analysis";
      render();
      if (companyCode) {
        await ensureCompanyDetail(companyCode).catch(() => {});
        render();
      }
      return;
    }
    if (action === "collapse-watchlist-analysis") {
      state.topSectionId = "watchlist";
      state.watchlistPanelMode = "detail";
      render();
      return;
    }
	  if (action === "close-risk-region") {
	    state.topSectionId = "risk-map";
	    state.riskMapRegionId = null;
    syncLocationFromState();
    render();
    return;
  }
  if (action === "switch-task-board") {
    state.taskBoardTab = target.dataset.taskBoard || "collection";
    render();
    return;
  }
	  if (action === "focus-risk-house") {
	    state.topSectionId = "enterprise-library";
	    state.portraitView = "detail";
	    state.riskHouseFocusId = target.dataset.riskHouseId || "01";
	    render();
	    return;
	  }
  if (action === "toggle-portrait-detail-panel") {
    state.portraitDetailCollapsed = !state.portraitDetailCollapsed;
    savePortraitDetailLayoutPreference();
    render();
    return;
  }
  if (action === "start-portrait-layout-resize") {
    return;
  }
  if (action === "open-task-company") {
    state.topSectionId = "due-task";
    state.taskBoardCompanyCode = target.dataset.companyCode || DEMO_COMPANY_CODE;
    state.taskBoardView = "detail";
    state.previewOpen = false;
    state.previewSectionId = null;
    render();
    return;
  }
  if (action === "back-task-board-list") {
    state.topSectionId = "due-task";
    state.taskBoardView = "list";
    state.previewOpen = false;
    state.previewSectionId = null;
    render();
    return;
  }
  if (action === "open-task-workbench") {
    const code = target.dataset.companyCode
      || state.taskBoardCompanyCode
      || state.portraitCompanyId
      || state.processEngineCompanyCode
      || DEMO_COMPANY_CODE;
    state.topSectionId = "due-task";
    state.taskBoardCompanyCode = code;
    state.taskBoardView = "detail";
    state.previewOpen = false;
    state.previewSectionId = null;
    state.reportReferencesOpen = false;
    state.reportImmersiveMode = false;
    state.activeReferenceId = null;
    state.portraitView = "list";
    state.reportCenterLoadingCompanyCode = null;
    state.reportCenterError = null;
    syncLocationFromState();
    render();
    return;
  }
  if (action === "choose-report-type" || action === "open-report-detail") {
    state.topSectionId = "report-center";
    state.reportCenterReportTypeId = target.dataset.reportTypeId || "due-diligence";
    state.reportCenterView = "company-list";
    state.previewOpen = false;
    state.previewSectionId = null;
    render();
    return;
  }
  if (action === "open-report-company") {
    const companyCode = target.dataset.companyCode || DEMO_COMPANY_CODE;
    state.topSectionId = "report-center";
    state.processEngineCompanyCode = companyCode;
    state.reportCenterView = "detail";
    state.reportCenterLoadingCompanyCode = companyCode;
    state.reportCenterError = null;
    state.dueDiligenceTabId = "report-generate";
    state.reportImmersiveMode = false;
    state.reportReferencesOpen = false;
    state.activeReferenceId = null;
    render();
    try {
      await ensureCompanyDetail(companyCode);
      const reportDetail = getCompanyDetail(companyCode);
      syncSelectedVersion(reportDetail);
      syncKnowledgeSelection(reportDetail);
      rememberCompany("process-engine", companyCode);
    } catch (error) {
      state.reportCenterError = error.message || "加载企业报告失败";
      state.reportCenterView = "company-list";
    } finally {
      state.reportCenterLoadingCompanyCode = null;
      render();
    }
    return;
  }
  if (action === "back-report-company-list") {
    state.topSectionId = "report-center";
    state.reportCenterView = "company-list";
    state.previewOpen = false;
    state.previewSectionId = null;
    state.reportImmersiveMode = false;
    state.reportReferencesOpen = false;
    state.activeReferenceId = null;
    render();
    return;
  }
  if (action === "back-report-hub") {
    state.topSectionId = "report-center";
    state.reportCenterView = "hub";
    state.previewOpen = false;
    state.previewSectionId = null;
    state.reportImmersiveMode = false;
    state.reportReferencesOpen = false;
    state.activeReferenceId = null;
    syncLocationFromState();
    render();
    return;
  }
  if (action === "switch-top-section") {
    state.topSectionId = target.dataset.topSection;
    resetTopLevelViews();
    if (state.topSectionId === "report-center") state.reportCenterView = "hub";
    syncLocationFromState();
    render();
    return;
  }
  if (action === "switch-sidebar-item") {
    if (
      state.topSectionId === "risk-view" &&
      state.riskCompletionMode === "manual" &&
      target.dataset.sidebarId !== state.activeSidebarBySection[state.topSectionId] &&
      promptManualEvidenceForSection(state.activeSidebarBySection[state.topSectionId])
    ) {
      return;
    }
    state.activeSidebarBySection[state.topSectionId] = target.dataset.sidebarId;
    state.previewOpen = false;
    state.previewSectionId = null;
    state.riskCompletionMenuOpen = false;
    render();
    return;
  }
  if (action === "toggle-completion-menu") {
    state.riskCompletionMenuOpen = !state.riskCompletionMenuOpen;
    render();
    return;
  }
  if (action === "set-completion-mode") {
    state.riskCompletionSnapshot = createCompletionSnapshot();
    state.riskCompletionMode = target.dataset.mode;
    state.riskCompletionMenuOpen = false;
    state.completionModalOpen = target.dataset.mode === "ai";
    state.completionModalType = target.dataset.mode === "ai" ? "ai" : null;
    state.completionModalField = null;
    state.activeEditableField = null;
    render();
    return;
  }
  if (action === "finish-completion-mode") {
    if (state.riskCompletionMode === "manual" && promptManualEvidenceForSection()) {
      return;
    }
    clearCompletionSession();
    render();
    return;
  }
  if (action === "cancel-completion-mode") {
    restoreCompletionSnapshot();
    clearCompletionSession();
    render();
    return;
  }
  if (action === "close-completion-modal") {
    state.completionModalOpen = false;
    state.completionModalType = null;
    state.completionModalField = null;
    renderCompletionModal();
    return;
  }
  if (action === "search-company") {
    await searchCompany(target.dataset.sectionId);
    return;
  }
  if (action === "select-company") {
    await selectCompany(target.dataset.sectionId, target.dataset.companyCode);
    render();
    return;
  }
	  if (action === "select-portrait-company") {
	    state.topSectionId = "enterprise-library";
	    state.portraitView = "detail";
	    state.portraitCompanyId = target.dataset.portraitCompanyId || DEMO_COMPANY_CODE;
      state.portraitLoadingCompanyCode = state.portraitCompanyId;
      state.portraitError = null;
	    render();
      try {
        await ensureCompanyDetail(state.portraitCompanyId);
        const company = mapCompanyToPortraitListItem(getRealCompanySummary(state.portraitCompanyId));
        if (!company) throw new Error("当前企业不在后端企业清单中");
        state.riskHouseFocusId = getPortraitDefaultFocusId(buildPortraitCompanyDetail(company, getCompanyDetail(state.portraitCompanyId)));
      } catch (error) {
        state.portraitError = error.message || "企业画像详情加载失败";
      } finally {
        state.portraitLoadingCompanyCode = null;
        render();
      }
	    return;
	  }
	  if (action === "back-portrait-list") {
	    state.topSectionId = "enterprise-library";
	    state.portraitView = "list";
      state.portraitLoadingCompanyCode = null;
      state.portraitError = null;
	    render();
	    return;
	  }
  if (action === "retry-portrait-company") {
    const companyCode = state.portraitCompanyId;
    if (!companyCode) return;
    state.portraitLoadingCompanyCode = companyCode;
    state.portraitError = null;
    render();
    try {
      await refreshCompanyDetail(companyCode);
      const company = mapCompanyToPortraitListItem(getRealCompanySummary(companyCode));
      if (!company) throw new Error("当前企业不在后端企业清单中");
      state.riskHouseFocusId = getPortraitDefaultFocusId(buildPortraitCompanyDetail(company, getCompanyDetail(companyCode)));
    } catch (error) {
      state.portraitError = error.message || "企业画像详情加载失败";
    } finally {
      state.portraitLoadingCompanyCode = null;
      render();
    }
    return;
  }
  if (action === "set-portrait-risk-filter") {
    state.portraitRiskFilter = target.dataset.riskFilter || "全部";
    const candidates = getPortraitCompaniesFiltered();
    if (!candidates.some((item) => item.companyCode === state.portraitCompanyId)) {
      state.portraitCompanyId = candidates[0]?.companyCode || DEMO_COMPANY_CODE;
      state.riskHouseFocusId = getPortraitDefaultFocusId(candidates[0]);
    }
    render();
    return;
  }
  if (action === "reset-company-search") {
    if (target.dataset.sectionId === "risk-view") state.riskViewCompanyCode = null;
    if (target.dataset.sectionId === "process-engine") state.processEngineCompanyCode = null;
    if (target.dataset.sectionId === "risk-view") {
      clearCompletionSession();
      state.riskManualEdits = {};
      state.riskManualDirtyFields = {};
      state.riskCompletionUploads = {};
    }
    state.previewOpen = false;
    state.previewSectionId = null;
    render();
    return;
  }
  if (action === "switch-dd-tab") {
    state.dueDiligenceTabId = target.dataset.ddTab;
    state.previewOpen = false;
    state.previewSectionId = null;
    state.reportImmersiveMode = false;
    state.activeReferenceId = null;
    render();
    return;
  }
  if (action === "toggle-report-references") {
    state.reportReferencesOpen = !state.reportReferencesOpen;
    render();
    return;
  }
  if (action === "toggle-report-immersive") {
    state.reportImmersiveMode = !state.reportImmersiveMode;
    if (state.reportImmersiveMode) {
      state.dueDiligenceTabId = "report-generate";
      state.reportKnowledgeCollapsed = true;
      state.reportCanvasZoom = clampReportCanvasZoom(state.reportCanvasZoom);
    }
    render();
    return;
  }
  if (action === "adjust-report-zoom") {
    const command = target.dataset.zoomCommand;
    const current = clampReportCanvasZoom(state.reportCanvasZoom);
    if (command === "in") state.reportCanvasZoom = clampReportCanvasZoom(current + 10);
    if (command === "out") state.reportCanvasZoom = clampReportCanvasZoom(current - 10);
    if (command === "reset") state.reportCanvasZoom = 100;
    render();
    return;
  }
  if (action === "search-report") {
    runReportSearch(target.dataset.reportVariant || "generated");
    return;
  }
  if (action === "focus-reference") {
    const variant = target.dataset.reportVariant || "generated";
    const direction = target.classList.contains("report-reference-item") ? "reference" : "citation";
    state.activeReferenceId = target.dataset.referenceId || null;
    state.reportReferencesOpen = true;
    render();
    focusReportReference(target.dataset.referenceId, variant, direction);
    return;
  }
  if (action === "toggle-knowledge-pane") {
    if (target.dataset.pane === "review") {
      state.reviewKnowledgeCollapsed = !state.reviewKnowledgeCollapsed;
    } else {
      state.reportKnowledgeCollapsed = !state.reportKnowledgeCollapsed;
    }
    render();
    return;
  }
  if (action === "switch-customer-section") {
    state.customerSectionId = target.dataset.customerSection;
    render();
    return;
  }
  if (action === "generate-version") {
    await handleGenerateVersion();
    return;
  }
  if (action === "run-review") {
    await handleRunReview();
    return;
  }
  if (action === "save-knowledge-links") {
    await handleSaveKnowledgeLinks();
    return;
  }
  if (action === "save-report-draft") {
    await handleSaveReportDraft("generated");
    return;
  }
  if (action === "save-review-draft") {
    await handleSaveReportDraft("review");
    return;
  }
  if (action === "send-review-to-oa") {
    const detail = getCompanyDetail(state.processEngineCompanyCode);
    const version = getCurrentVersion(detail);
    const reportTitle = detail?.company?.name ? `${detail.company.name} 尽调报告` : "当前预审修订稿";
    window.alert(`${reportTitle}已提交至 OA 审批流程。${version?.version_label ? `\n版本：${version.version_label}` : ""}`);
    return;
  }
  if (action === "apply-report-format") {
    applyReportEditorCommand(target.dataset.reportCommand, target.dataset.reportValue, target.dataset.reportVariant || "generated");
    return;
  }
  if (action === "toggle-source-group") {
    const group = reportDataSourceGroups.find((item) => item.id === target.dataset.sourceGroup);
    if (!group) return;
    const groupIds = group.items.map((item) => item.id);
    const allSelected = groupIds.every((id) => state.pendingDataSourceSelection.includes(id));
    state.pendingDataSourceSelection = allSelected
      ? state.pendingDataSourceSelection.filter((id) => !groupIds.includes(id))
      : Array.from(new Set([...state.pendingDataSourceSelection, ...groupIds]));
    render();
    return;
  }
  if (action === "toggle-knowledge-category") {
    const files = (state.knowledgeBase?.files || []).filter((item) => item.category === target.dataset.knowledgeCategoryToggle);
    const fileIds = files.map((item) => item.id);
    const allSelected = fileIds.length && fileIds.every((id) => state.pendingKnowledgeSelection.includes(id));
    state.pendingKnowledgeSelection = allSelected
      ? state.pendingKnowledgeSelection.filter((id) => !fileIds.includes(id))
      : Array.from(new Set([...state.pendingKnowledgeSelection, ...fileIds]));
    render();
    return;
  }
  if (action === "open-preview") {
    const detail = getCompanyDetail(state.processEngineCompanyCode);
    const version = getCurrentVersion(detail);
    const currentText = state.dueDiligenceTabId === "report-review"
      ? state.reviewEditorText || version?.review_edit_text || version?.full_text || ""
      : state.reportEditorText || version?.full_text || "";
    const sections = buildDocumentSections(currentText, version?.section_list || [], "preview");
    state.previewOpen = true;
    state.previewSectionId = sections[0]?.anchor || null;
    renderPreviewDrawer();
    return;
  }
  if (action === "close-preview") {
    state.previewOpen = false;
    state.previewSectionId = null;
    renderPreviewDrawer();
    return;
  }
  if (action === "switch-preview-section") return;
  if (action === "jump-report-section") {
    state.previewSectionId = target.dataset.reportAnchor || null;
    const variant = target.dataset.reportVariant || "generated";
    if (variant === "preview") {
      renderPreviewDrawer();
      requestAnimationFrame(() => {
        const previewTarget = document.getElementById(`preview-${state.previewSectionId}`);
        if (previewTarget) previewTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      updateDocumentWorkspace(variant);
      scrollToReportAnchor(state.previewSectionId);
    }
    return;
  }
  if (action === "preview-finding") {
    state.previewOpen = true;
    state.previewSectionId = target.dataset.previewSection;
    renderPreviewDrawer();
  }
});

document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest('[data-action="start-portrait-layout-resize"]');
  if (!target) return;
  const layout = target.closest(".risk-workbench-layout--detail");
  if (!layout || state.portraitDetailCollapsed || window.matchMedia("(max-width: 1360px)").matches) return;
  event.preventDefault();
  const rect = layout.getBoundingClientRect();
  portraitResizeSession = { layout, rect };
  document.body.classList.add("is-portrait-resizing");
  target.setPointerCapture?.(event.pointerId);
});

document.addEventListener("pointermove", (event) => {
  if (!portraitResizeSession) return;
  event.preventDefault();
  const { layout, rect } = portraitResizeSession;
  const maxByDetailWidth = ((rect.width - 320) / Math.max(rect.width, 1)) * 100;
  const maxPercent = Math.min(85, Math.max(60, maxByDetailWidth));
  const nextPercent = clampNumber(((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100, 60, maxPercent, state.portraitMainPercent);
  state.portraitMainPercent = Number(nextPercent.toFixed(1));
  layout.style.setProperty("--portrait-main-percent", state.portraitMainPercent);
});

document.addEventListener("pointerup", () => {
  if (!portraitResizeSession) return;
  portraitResizeSession = null;
  document.body.classList.remove("is-portrait-resizing");
  savePortraitDetailLayoutPreference();
});

document.addEventListener("pointercancel", () => {
  if (!portraitResizeSession) return;
  portraitResizeSession = null;
  document.body.classList.remove("is-portrait-resizing");
  savePortraitDetailLayoutPreference();
});

document.addEventListener("mousedown", (event) => {
  if (event.target.closest(".report-editor-command")) {
    event.preventDefault();
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.id === "home-smart-nav-input") {
    state.homeCommandInput = target.value;
    state.homeCommandMessage = "";
    if (state.homeCommandIsComposing || event.isComposing) return;
    rerenderHomeCommandCard();
    return;
  }
  if (target.id === "portrait-search-input") {
    state.portraitSearchKeyword = target.value;
    const candidates = getPortraitCompaniesFiltered();
    if (candidates.length && !candidates.some((item) => item.companyCode === state.portraitCompanyId)) {
      state.portraitCompanyId = candidates[0].companyCode;
      state.riskHouseFocusId = getPortraitDefaultFocusId(candidates[0]);
    }
    render();
    return;
  }
  if (target.matches("[data-report-body='true']")) {
    const variant = target.dataset.reportVariant || "generated";
    syncReportEditorTextFromWorkspace(variant);
    return;
  }
  if (target.matches("[data-editable-field]")) {
    const value = target.textContent.trim();
    const originalValue = target.dataset.originalValue.trim();
    const fieldKey = target.dataset.editableField;
    state.riskManualEdits[fieldKey] = value;
    if (value !== originalValue) {
      state.riskManualDirtyFields[fieldKey] = true;
    } else {
      delete state.riskManualDirtyFields[fieldKey];
    }
    return;
  }
  if (target.id === "risk-view-search-input") {
    state.riskSearchKeyword = target.value;
    return;
  }
  if (target.id === "process-engine-search-input") {
    state.processSearchKeyword = target.value;
    return;
  }
  if (target.id === "task-board-search-input") {
    state.taskBoardSearchKeyword = target.value;
    renderDueTask();
    return;
  }
  if (target.id === "report-center-search-input") {
    state.reportCenterSearchKeyword = target.value;
    renderReportCenter();
    return;
  }
  if (target.id === "report-search-input") {
    state.reportSearchKeyword = target.value;
    return;
  }
  if (target.id === "knowledge-search-input") {
    state.knowledgeSearchKeyword = target.value;
    renderKnowledgeBase();
    return;
  }
  if (target.id === "report-editor-textarea") {
    state.reportEditorText = target.value;
    updateDocumentWorkspace("generated");
    return;
  }
  if (target.id === "review-editor-textarea") {
    state.reviewEditorText = target.value;
    updateDocumentWorkspace("review");
  }
});

document.addEventListener(
  "mousedown",
  (event) => {
    if (state.topSectionId !== "risk-view" || state.riskCompletionMode !== "manual" || state.completionModalOpen) return;
    const dirtyFields = getDirtyManualFieldsForSection();
    if (!dirtyFields.length) return;
    if (event.target.closest('[data-action="cancel-completion-mode"]')) return;

    const clickedEditable = event.target.closest("[data-editable-field]");
    const clickedFieldKey = clickedEditable?.dataset.editableField || null;
    const currentFieldKey = state.activeEditableField;

    if (clickedFieldKey && clickedFieldKey === currentFieldKey) return;
    if (event.target.closest("#completion-modal")) return;

    event.preventDefault();
    event.stopPropagation();
    promptManualEvidenceForSection(getActiveSidebarItem()?.id, currentFieldKey);
  },
  true,
);

document.addEventListener("focusin", (event) => {
  const target = event.target;
  if (!target.matches("[data-editable-field]")) return;
  state.activeEditableField = target.dataset.editableField;
});

document.addEventListener("change", async (event) => {
  const target = event.target;
  if (target.matches("[data-risk-completion-upload]")) {
    const [file] = target.files || [];
    if (!file) return;
    const key = target.dataset.riskCompletionUpload;
    state.riskCompletionUploads[key] = [file.name, ...(state.riskCompletionUploads[key] || []).filter((item) => item !== file.name)].slice(0, 3);
    if (state.riskManualDirtyFields[key]) delete state.riskManualDirtyFields[key];
    render();
    return;
  }

  if (target.id === "report-version-select") {
    state.reportVersionId = target.value;
    state.activeReferenceId = null;
    syncKnowledgeSelection(getCompanyDetail(state.processEngineCompanyCode));
    render();
    return;
  }

  if (target.matches("[data-report-command]")) {
    applyReportEditorCommand(target.dataset.reportCommand, target.value, target.dataset.reportVariant || "generated");
    return;
  }

  if (target.matches("[data-material-bucket]")) {
    const [file] = target.files || [];
    if (!file || !state.processEngineCompanyCode) return;
    await uploadFile(
      `/api/company/${encodeURIComponent(state.processEngineCompanyCode)}/due-diligence-materials?bucket=${encodeURIComponent(target.dataset.materialBucket)}`,
      file,
    );
    await refreshCompanyDetail(state.processEngineCompanyCode);
    render();
    return;
  }

  if (target.matches("[data-review-category]")) {
    const [file] = target.files || [];
    const version = getCurrentVersion();
    if (!file || !state.processEngineCompanyCode || !version) return;
    await uploadFile(
      `/api/company/${encodeURIComponent(state.processEngineCompanyCode)}/report-versions/${encodeURIComponent(version.id)}/review-files?category=${encodeURIComponent(target.dataset.reviewCategory)}`,
      file,
    );
    await refreshCompanyDetail(state.processEngineCompanyCode);
    render();
    return;
  }

  if (target.matches("[data-knowledge-category]")) {
    const [file] = target.files || [];
    if (!file) return;
    state.knowledgeBase = await uploadFile(`/api/knowledge-files?category=${encodeURIComponent(target.dataset.knowledgeCategory)}`, file);
    render();
    return;
  }

  if (target.matches("[data-knowledge-file-id]")) {
    const checkedIds = Array.from(document.querySelectorAll("[data-knowledge-file-id]:checked")).map((item) => item.dataset.knowledgeFileId);
    state.pendingKnowledgeSelection = checkedIds;
    return;
  }

  if (target.matches("[data-report-source-id]")) {
    const checkedIds = Array.from(document.querySelectorAll("[data-report-source-id]:checked")).map((item) => item.dataset.reportSourceId);
    state.pendingDataSourceSelection = checkedIds;
  }
});

document.addEventListener("compositionstart", (event) => {
  const target = event.target;
  if (target.id !== "home-smart-nav-input") return;
  state.homeCommandIsComposing = true;
});

document.addEventListener("compositionend", (event) => {
  const target = event.target;
  if (target.id !== "home-smart-nav-input") return;
  state.homeCommandIsComposing = false;
  state.homeCommandInput = target.value;
  state.homeCommandMessage = "";
  rerenderHomeCommandCard();
});

document.addEventListener("keydown", async (event) => {
  const target = event.target;
  const isImeComposition = state.homeCommandIsComposing || event.isComposing || event.keyCode === 229;

  if (target.id === "home-smart-nav-input") {
    if (event.key !== "Enter") return;
    if (isImeComposition) return;
    event.preventDefault();
    const resolution = resolveHomeSmartCommand(target.value);
    if (!resolution.company) {
      state.homeCommandMessage = "未找到匹配企业，请尝试输入企业全称或简称。";
      rerenderHomeCommandCard();
      return;
    }
    await navigateToSmartRoute(resolution.routeKey, resolution.company, target.value);
    return;
  }
  if (isEditableEventTarget(target) && !["risk-view-search-input", "process-engine-search-input", "task-board-search-input", "report-center-search-input", "report-search-input"].includes(target.id)) {
    return;
  }
  if (event.key !== "Enter") return;
  if (event.isComposing || event.keyCode === 229) return;
  if (target.id === "risk-view-search-input") {
    event.preventDefault();
    await searchCompany("risk-view");
  }
  if (target.id === "process-engine-search-input") {
    event.preventDefault();
    await searchCompany("process-engine");
  }
  if (target.id === "task-board-search-input" || target.id === "report-center-search-input") {
    event.preventDefault();
  }
  if (target.id === "report-search-input") {
    event.preventDefault();
    runReportSearch("generated");
  }
});

async function init() {
  render();
  const [meta, companies, knowledgeBase, systemAdmin, homeFeed] = await Promise.all([
    fetchJson("/api/meta"),
    fetchJson("/api/companies"),
    fetchJson("/api/knowledge-files"),
    fetchJson("/api/system-admin"),
    fetchJson("/api/home-feed"),
  ]);
  state.meta = meta;
  state.companies = companies;
  state.knowledgeBase = knowledgeBase;
  state.systemAdmin = systemAdmin;
  state.homeFeed = homeFeed;
  if (companies.length && !companies.some((item) => item.company_code === state.portraitCompanyId)) {
    state.portraitCompanyId = companies[0].company_code;
  }
  if (companies.some((item) => item.company_code === DEMO_COMPANY_CODE)) {
    state.riskViewCompanyCode = DEMO_COMPANY_CODE;
    state.processEngineCompanyCode = DEMO_COMPANY_CODE;
    state.taskBoardCompanyCode = DEMO_COMPANY_CODE;
    rememberCompany("risk-view", DEMO_COMPANY_CODE);
    rememberCompany("process-engine", DEMO_COMPANY_CODE);
    await ensureCompanyDetail(DEMO_COMPANY_CODE);
    syncSelectedVersion(getCompanyDetail(DEMO_COMPANY_CODE));
    syncKnowledgeSelection(getCompanyDetail(DEMO_COMPANY_CODE));
  }
  applyRouteFromLocation();
  if (state.smartNavContext?.routeKey) {
    const company = getSmartNavContextCompany();
    if (company) await hydrateSmartSectionState(state.smartNavContext.routeKey, company);
  }
  render();
}

window.addEventListener("popstate", async () => {
  if (!state.meta) return;
  applyRouteFromLocation();
  if (state.smartNavContext?.routeKey) {
    const company = getSmartNavContextCompany();
    if (company) await hydrateSmartSectionState(state.smartNavContext.routeKey, company);
  }
  render();
});

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `<pre style="padding:24px;color:#b44632;">前端初始化失败：${escapeHtml(error.message)}</pre>`;
});
