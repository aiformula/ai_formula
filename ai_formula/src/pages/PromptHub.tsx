import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Search, Filter, BookOpen, Briefcase, Palette, GraduationCap, Users, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PromptCard {
  id: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  textEn: string;
  textZh: string;
  category: 'daily' | 'workplace' | 'creative';
  level: 'beginner' | 'intermediate' | 'expert';
  userTags: string[];
  featured?: boolean;
}

interface FilterCategory {
  id: string;
  nameEn: string;
  nameZh: string;
  icon: React.ReactNode;
  count: number;
}

interface UserRole {
  id: string;
  nameEn: string;
  nameZh: string;
  count: number;
}

const PromptHub: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedUserRole, setSelectedUserRole] = useState('all');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;
  const topRef = useRef<HTMLDivElement | null>(null);

  // Map user tag (stored mainly in zh) to UK English for the English UI
  const userTagTranslations: Record<string, string> = {
    '學生': 'Students',
    '保險及理財策劃業': 'Insurance & Financial Planning',
    '市場營銷': 'Marketing Professional',
    '商業專業人士': 'Business Professional',
    '策略顧問': 'Strategy Consultant',
    '數據分析師': 'Data Analyst',
    '品牌策略師': 'Brand Strategist',
    '創意總監': 'Creative Director',
    '數字營銷專家': 'Digital Marketing Specialist',
    '創意': 'Creative',
    '創作者': 'Creator',
    '家長': 'Parents',
    '自由工作者': 'Freelancers',
    '初創創業者': 'Startup Founders',
    '退休人士': 'Retirees',
    '研究人員': 'Researcher',
    '學者': 'Academic',
    '進階學習者': 'Advanced Learner',
    // extra tags produced by augmentation
    '學習者': 'Learner',
    '自學者': 'Self‑learner',
    '老師': 'Teacher',
    '專業人士': 'Professional',
    '創意專業人士': 'Creative Professional',
    '內容創作者': 'Content Creator',
    '設計師': 'Designer',
    '考試準備': 'Exam Prep',
    '金融服務從業員': 'Financial Services Professional',
    '客戶顧問': 'Client Advisor',
    '銷售團隊': 'Sales Team',
    '照顧者': 'Caregiver',
    '家庭管理': 'Family Management',
    '個體戶': 'Sole Proprietor',
    '創業者': 'Entrepreneur',
    '產品經理': 'Product Manager',
    '增長營銷': 'Growth Marketing',
    '長者': 'Senior',
    '社區志工': 'Community Volunteer',
    '社群經理': 'Community Manager'
  };

  // Synonyms (EN <-> ZH‑HK) for search expansion
  const searchSynonyms: Record<string, string[]> = {
    'marketing': ['市場營銷', '行銷', '營銷', '社群經理', '品牌', '品牌策略師', '數字營銷', '內容創作者', '社群'],
    'marketing professional': ['市場營銷', '行銷', '營銷', '品牌策略師', '社群經理'],
    'student': ['學生', '學習者', '自學者', '考試', '考試準備'],
    'business': ['商業', '商務', '企業', '商業專業人士', '策略顧問'],
    'creative': ['創意', '設計', '設計師', '創意專業人士', '創作者', '品牌策略師'],
    'insurance': ['保險', '保險及理財策劃業', '理財', '金融服務', '財務顧問'],
    'parent': ['家長', '照顧者', '家庭'],
    'freelancer': ['自由工作者', '個體戶', '自由職業'],
    'startup': ['初創', '創業', '初創創業者', '創業者'],
    'retiree': ['退休', '退休人士', '長者'],
    'researcher': ['研究', '研究人員', '學者', '學術'],
    'data analyst': ['數據分析', '數據分析師', '分析師'],
    'brand strategist': ['品牌策略師', '品牌'],
    'community manager': ['社群經理', '社群', '社群營運'],
    // Chinese entries as keys (ensure reverse hits)
    '學生': ['student', '學習者', '自學者', '考試', 'exam', '考試準備'],
    '學習者': ['student', '自學者', 'learner', '考試準備'],
    '自學者': ['student', 'learner', '學習者', '考試準備'],
    '老師': ['teacher', 'educator', '講師', '導師'],
    '市場營銷': ['marketing', '行銷', '營銷', '品牌', '品牌策略師', '社群經理', 'digital marketing'],
    '保險及理財策劃業': ['insurance', 'financial planning', '金融服務', '理財', '財務顧問'],
    '商業專業人士': ['business professional', 'professional', '專業人士', '策略顧問', 'manager'],
    '創意專業人士': ['creative professional', '設計師', '內容創作者', 'creator', 'designer'],
    '家長': ['parent', '照顧者', '家庭'],
    '自由工作者': ['freelancer', 'consultant', '個體戶', '自由職業'],
    '初創創業者': ['startup founder', 'entrepreneur', '創業者', '產品經理', 'growth'],
    '退休人士': ['retiree', 'senior', '長者'],
    '品牌策略師': ['brand strategist', '品牌', 'marketing'],
    '社群經理': ['community manager', '社群', '社群營運']
  };

  const normalize = (text: string): string => text.toLowerCase().trim();
  const expandQuery = (query: string): string[] => {
    const q = normalize(query);
    if (!q) return [];
    const tokens = new Set<string>([q]);
    for (const [key, vals] of Object.entries(searchSynonyms)) {
      const nk = normalize(key);
      const matchedKey = nk.includes(q) || q.includes(nk);
      const matchedVal = vals.some(v => normalize(v).includes(q) || q.includes(normalize(v)));
      if (matchedKey || matchedVal) {
        tokens.add(nk);
        vals.forEach(v => tokens.add(normalize(v)));
      }
    }
    return Array.from(tokens);
  };

  // Build augmented tags (4–6) per prompt based on existing tags and category
  const buildAugmentedTags = (prompt: PromptCard): string[] => {
    const base = new Set<string>(prompt.userTags);
    // Category-based generic tags
    if (prompt.category === 'daily') {
      base.add('學習者');
      base.add('自學者');
      base.add('老師');
    }
    if (prompt.category === 'workplace') {
      base.add('專業人士');
      base.add('商業專業人士');
    }
    if (prompt.category === 'creative') {
      base.add('創意專業人士');
      base.add('內容創作者');
      base.add('設計師');
    }

    // Tag-specific expansions
    const tagsJoined = prompt.userTags.join('、');
    if (tagsJoined.includes('學生')) {
      base.add('學習者');
      base.add('自學者');
      base.add('考試準備');
    }
    if (tagsJoined.includes('市場營銷')) {
      base.add('品牌策略師');
      base.add('社群經理');
      base.add('內容創作者');
    }
    if (tagsJoined.includes('保險及理財策劃業')) {
      base.add('金融服務從業員');
      base.add('客戶顧問');
      base.add('銷售團隊');
    }
    if (tagsJoined.includes('家長')) {
      base.add('照顧者');
      base.add('家庭管理');
    }
    if (tagsJoined.includes('自由工作者')) {
      base.add('個體戶');
      base.add('創業者');
    }
    if (tagsJoined.includes('初創創業者')) {
      base.add('產品經理');
      base.add('增長營銷');
      base.add('創業者');
    }
    if (tagsJoined.includes('退休人士')) {
      base.add('長者');
      base.add('社區志工');
    }

    // Return at most 6
    return Array.from(base).slice(0, 6);
  };

  // Reset to first page when filters/search/language change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLevel, selectedUserRole, language]);

  // Scroll to top when page changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // 所有Prompt卡片數據
  const allPrompts: PromptCard[] = [
    // 學生專業Prompts
    {
      id: 'student-summary',
      titleEn: 'Article Summary Generator',
      titleZh: '文章摘要生成器',
      descriptionEn: 'Quickly summarize long articles or textbook chapters for study notes',
      descriptionZh: '快速掌握長篇文章或課本章節重點，製作摘要筆記',
      textEn: 'Please help me summarize this article about [topic] ([paste article link or content]) into a 500-word summary. Use bullet points to list the core arguments, main evidence, and final conclusions of the article.',
      textZh: '請幫我將呢篇關於 [主題] 嘅文章（[請貼上文章連結或內文]）撮要成一份 500 字嘅摘要，需要用點列方式，列出文章嘅核心論點、主要證據同最終結論。',
      category: 'daily',
      level: 'beginner',
      userTags: ['學生'],
      featured: true
    },
    // ——— Expert: Live Chat Support Integration Plan ———
    {
      id: 'live-chat-support-plan',
      titleEn: 'Live Chat Support Integration (Numbered Plan + Dependency Grammar Scripts)',
      titleZh: '即時客服整合方案（編號清單 + 依存語法話術）',
      descriptionEn: 'A step‑by‑step plan covering widget placement, SLAs, KPIs and scripts built with dependency grammar.',
      descriptionZh: '涵蓋元件擺放、SLA、KPI 與依存語法撰寫話術的逐步整合計畫。',
      textEn: `Role: expert customer support strategist. Create a comprehensive plan to implement live chat for higher engagement and sales. Use a dependency grammar framework to craft professional chat scripts.

#INFO
Website: [INSERT WEBSITE URL]
Business type: [DESCRIBE]
Target audience: [DESCRIBE]
Key products/services: [LIST]
Existing support channels: [LIST]

MOST IMPORTANT: Output as a numbered list (1., 2., 3., …). Use sub‑points (a, b, c) for details.

Plan must include:
1. Objectives & KPIs (a) engagement, (b) CSAT, (c) conversion uplift
2. Widget Strategy (a) placement on pages, (b) trigger rules, (c) proactive vs. reactive
3. Team & SLA (a) staffing model, (b) routing/priority, (c) response time targets
4. Scripts (dependency grammar):
   a) Greeting → Reason → Probe → Resolution → CTA
   b) Objection handling: Concern → Evidence → Benefit → CTA
   c) Escalation: Condition → Action → Confirmation → Follow‑up
5. Knowledge Base & Macros (a) structure, (b) tagging, (c) update cadence
6. Tech Implementation (a) vendor options, (b) data capture/consent, (c) CRM/GA integration
7. Performance Tracking (a) dashboards, (b) A/B tests, (c) weekly review loop
8. Rollout Roadmap (a) pilot, (b) training, (c) go‑live checklist`,
      textZh: `角色：客服策略專家。為網站導入即時客服，並用「依存語法」撰寫專業對話話術。

#關於我
網站：[填寫]
業務類型：[填寫]
目標受眾：[填寫]
核心產品/服務：[列出]
現行客服管道：[列出]

最重要：請以「編號清單」輸出（1., 2., 3.），細節使用 (a)(b)(c) 子項。

內容必須包含：
1. 目標與 KPI（a 互動、b 滿意度、c 轉換提升）
2. 小工具策略（a 擺放頁面、b 觸發規則、c 主動/被動）
3. 團隊與 SLA（a 編制、b 轉接與優先、c 回覆時限）
4. 話術（依存語法）：
   a 問候→理由→探詢→解法→CTA
   b 反對處理：疑慮→證據→效益→CTA
   c 升級轉接：條件→動作→確認→追蹤
5. 知識庫與巨集（a 架構、b 標籤、c 更新頻率）
6. 技術實作（a 供應商、b 資料/同意、c CRM/GA 串接）
7. 成效追蹤（a 儀表板、b A/B、c 週檢視）
8. 上線時程（a 試點、b 訓練、c 上線清單）`,
      category: 'workplace',
      level: 'expert',
      userTags: ['客服', '數字營銷專家', '產品經理']
    },
    // ——— Expert: CRO Strategy ———
    {
      id: 'cro-strategy-expert',
      titleEn: 'CRO Strategy Blueprint (Headings + Bullet Actions)',
      titleZh: 'CRO 轉換優化藍圖（標題 + 要點）',
      descriptionEn: 'Data‑driven CRO plan focusing on UX, persuasive design and funnel optimisation.',
      descriptionZh: '以數據驅動的 CRO 計畫，聚焦體驗、說服設計與漏斗優化。',
      textEn: `Role: seasoned CRO specialist. Build a clear strategy to increase online sales.

#INFO
Business type: [INSERT]
Current conversion rate: [INSERT]
Target conversion rate: [INSERT]
Primary product/service: [INSERT]
Target audience: [INSERT]

MOST IMPORTANT: Provide a structured document with main headings and sub‑headings; use bullet points for tactics.

Sections:
H1: Current State (analytics review, benchmarks)
H1: Opportunities (speed, clarity, trust, friction removal)
H1: Experiments (hypothesis, variant, metric, expected lift)
H1: Implementation Plan (priorities, owners, timeline)
H1: Measurement (dashboard, cadence, success criteria)`,
      textZh: `角色：資深 CRO 專家。請產出清晰可執行的轉換優化策略。

#資料
業務型態：[填寫]
目前轉換率：[填寫]
目標轉換率：[填寫]
主要產品/服務：[填寫]
目標受眾：[填寫]

最重要：以「主標題/小標題」結構輸出，策略與建議使用條列。內容包含：
— 現況盤點（數據與對標）
— 優化機會（速度、清晰度、信任、移除摩擦）
— 實驗清單（假設、版本、指標、預期提升）
— 落地計畫（優先級、責任人、時程）
— 衡量方式（儀表板、節奏、成功標準）`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '產品經理']
    },
    // ——— Expert: CRM Dashboard Customisation ———
    {
      id: 'crm-dashboard-customisation',
      titleEn: 'CRM Dashboard Customisation (Dynamic Markdown Table)',
      titleZh: 'CRM 儀表板客製化（動態 Markdown 表格）',
      descriptionEn: 'Guide users to tailor KPI dashboards: relevant metrics, visuals, layout, refresh and interactivity.',
      descriptionZh: '指導使用者客製 KPI 儀表板：指標相關性、視覺化、版面、刷新與互動。',
      textEn: `Role: CRM expert for dashboard customisation. Provide a full plan: metric selection, best visual type, colour scheme, layout, auto‑refresh and interactive elements.

#ABOUT ME
Specific metrics: [INSERT]
Business type: [INSERT]
Column count: [INSERT NUMBER]
Column names: [INSERT AS A COMMA‑SEPARATED LIST]

MOST IMPORTANT: Return a Markdown table using the provided number of columns and names. After the table, include bullet guidance on charts, colours, layout, auto‑refresh, and interactions (filters, drill‑downs, tooltips).`,
      textZh: `角色：擅長儀表板客製化的 CRM 專家。請提供完整計畫：
— 指標挑選與定義、最佳圖表型態、配色與版面
— 自動資料刷新與互動元素（篩選、鑽取、提示）

#關於我
特定指標：[填寫]
業務類型：[填寫]
列數：[填寫]
列名：[以逗號分隔]

最重要：以 Markdown 表格輸出，欄數與欄名須符合使用者提供的設定；表格後以條列提供圖表/配色/版面/刷新/互動建議。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['CRM', '數據分析師', '產品經理']
    },
    // ——— Expert: Sales Funnel Analysis Table ———
    {
      id: 'sales-funnel-analysis-table',
      titleEn: 'Sales Funnel Conversion Analysis (Table with Actions)',
      titleZh: '銷售漏斗轉換分析（含行動建議表）',
      descriptionEn: 'Analyse each funnel stage and provide specific, actionable recommendations in a table.',
      descriptionZh: '逐一分析漏斗各階段，並以表格提供具體可行的建議。',
      textEn: `Role: expert sales funnel analyst.

#INFO
Funnel stages: [INSERT]
Industry: [INSERT]
Target audience: [INSERT]
Overall conversion: [INSERT]

MOST IMPORTANT: Output a Markdown table with columns: Funnel Stage | Conversion Rate | Recommendations (concise, actionable).`,
      textZh: `角色：銷售漏斗分析專家。

#資訊
漏斗階段：[填寫]
產業：[填寫]
目標受眾：[填寫]
整體轉換率：[填寫]

最重要：以 Markdown 表格輸出三欄：Funnel Stage｜Conversion Rate｜Recommendations（明確可行）。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '策略顧問']
    },
    // ——— Expert: Market Personas for Sales Dept ———
    {
      id: 'market-personas-sales-table',
      titleEn: 'Market Personas for Sales (Tabular Personas)',
      titleZh: '銷售部門用客群人物誌（表格）',
      descriptionEn: 'Create detailed, realistic personas with demographics, pain points, goals, buying behaviour.',
      descriptionZh: '產出可行且貼近真實的客群人物誌，利於銷售使用。',
      textEn: `Role: expert market analyst. Build personas for a sales department.

#INFO
Sales department: [INSERT]
Company: [INSERT]
Number of personas: [INSERT]

MOST IMPORTANT: Provide a brief introduction, then a Markdown table with columns: Persona Name | Demographics | Pain Points | Goals | Buying Behavior.`,
      textZh: `角色：市場分析專家。為銷售部門建立人物誌。

#資料
銷售部門：[填寫]
公司：[填寫]
所需人物誌數量：[填寫]

最重要：先簡短說明每個人物誌對銷售的重要性，接著以 Markdown 表格輸出五欄：Persona Name｜Demographics｜Pain Points｜Goals｜Buying Behavior。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['策略顧問', '銷售團隊']
    },
    // ——— Expert: Affiliate Video Script (Dependency Grammar) ———
    {
      id: 'affiliate-video-script-dg',
      titleEn: 'Affiliate Video Script (Dependency Grammar Framework)',
      titleZh: '聯盟行銷影片腳本（依存語法框架）',
      descriptionEn: 'Research TA, map benefits/USPs, script intro→body→CTA using a dependency grammar structure.',
      descriptionZh: '研究受眾與產品賣點，依「依存語法」組織 Intro→Content→CTA 的完整影片腳本。',
      textEn: `Adopt the role of an expert video script writer for affiliate marketing.

Goal: create an engaging, persuasive script using a dependency grammar framework (Head → Dependents with clear relations: Reason, Evidence, Benefit, CTA modifiers).

Deliver a SCRIPT with section headings:
1) Research Summary (audience needs/pain points)
2) Dependency Plan (root claim + dependents)
3) Introduction (hook + purpose)
4) Main Content (benefits, USPs, objections handling)
5) CTAs (distributed)
6) Conclusion (recap + final CTA)

#ABOUT ME
Topic: [INSERT TOPIC]
Target audience: [INSERT TARGET AUDIENCE]
Affiliate product/service: [INSERT]
Key benefits: [INSERT]
Desired action: [INSERT]

IMPORTANT: Output in script format with headings (Introduction, Main Content, Conclusion) and explicitly show the dependency grammar links (e.g., Claim → Evidence → Benefit → CTA).`,
      textZh: `請以「聯盟行銷影片腳本」專家的身份，使用依存語法（主幹主張 → 依屬元素：理由/證據/效益/CTA 修飾）來撰寫腳本。

請輸出完整腳本並包含以下區塊：
1）研究摘要（受眾需求/痛點）
2）依存語法規劃（核心主張與依附關係）
3）Introduction（開場鉤子 + 影片目的）
4）Main Content（賣點、效益、反對意見處理）
5）CTA（分散式呼籲）
6）Conclusion（重點回顧 + 最終 CTA）

#關於我：
主題：[填寫]
目標受眾：[填寫]
聯盟產品/服務：[填寫]
關鍵效益：[填寫]
期望行動：[填寫]

最重要：以腳本格式輸出，清楚標示各區段，並顯示依存語法的鏈接關係。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '內容創作者', '創意總監']
    },
    // ——— Expert: Social Captions with Dependency Grammar ———
    {
      id: 'social-captions-dg',
      titleEn: 'Social Media Captions (Dependency Grammar + CTA + Hashtags)',
      titleZh: '社群貼文文案（依存語法 + CTA + Hashtag）',
      descriptionEn: 'Generate bullet‑point captions per platform with emojis, hashtags and grammar explanation.',
      descriptionZh: '逐點產生各平台貼文文案，含表情符號/標籤與依存語法說明。',
      textEn: `Role: expert social media marketer. Create engaging captions structured with a dependency grammar (Claim → Support → CTA; optional modifiers: Emotion, Social Proof, Scarcity).

#INFO
Platform: [INSERT]
Product/Service: [INSERT]
Target audience: [INSERT]
Brand voice: [INSERT]
USPs: [LIST]

IMPORTANT: Return a bullet list. Each bullet = one caption with emojis/hashtags + a brief line explaining the dependency structure used.`,
      textZh: `請以資深社群行銷人身份撰寫貼文文案，採依存語法結構（主張 → 支援 → CTA；可加情緒/社會證明/稀缺修飾）。

#資訊：
平台：[填寫]
產品/服務：[填寫]
目標受眾：[填寫]
品牌語氣：[填寫]
獨特賣點：[列出]

最重要：以「清單項目」輸出，每一項為一段文案（含表情/Hashtag）並附一行說明使用的依存語法。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '品牌策略師', '內容創作者']
    },
    // ——— Expert: Automate YouTube Growth (Table) ———
    {
      id: 'youtube-growth-automation',
      titleEn: 'Automated YouTube Growth Strategy (Tactics/Platforms/Metrics)',
      titleZh: 'YouTube 自動化成長策略（戰術/平台/指標表）',
      descriptionEn: 'A table of tactics, platforms and metrics to automate growth using content, social and tools.',
      descriptionZh: '以表格輸出可自動化的成長策略：戰術、實施平台與成效指標。',
      textEn: `Role: digital marketing strategist for YouTube growth. Build a comprehensive plan that leverages automation tools, optimisation, and cross‑platform promotion.

#INFO
Channel name: [INSERT]
Content focus: [INSERT]
Audience: [INSERT]
Subscribers: [INSERT]
Growth challenges: [INSERT]

IMPORTANT: Present in a Markdown table: Tactics | Platforms | Metrics. Each row should provide an automatable approach with the tools/plugins or processes.`,
      textZh: `請以「YouTube 成長」數位行銷策略師身份，規劃一套可自動化的成長方案（工具、優化、跨平台）。

#資料：
頻道名稱：[填寫]
內容主題：[填寫]
受眾族群：[填寫]
訂閱數：[填寫]
成長障礙：[填寫]

最重要：以 Markdown 表格輸出三欄：Tactics｜Platforms｜Metrics；每列均需指出可自動化的作法（工具/流程）。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '內容創作者']
    },
    // ——— Expert: Comparative Infographic Brief ———
    {
      id: 'comparative-infographic-brief',
      titleEn: 'Comparative Infographic Brief (Two‑Product Comparison)',
      titleZh: '雙產品對比資訊圖表設計簡報',
      descriptionEn: 'Generate a detailed, designer‑ready brief of layout and content for a two‑product comparison.',
      descriptionZh: '輸出設計師可直接使用的對比資訊圖表內容與版式說明。',
      textEn: `Role: expert graphic designer. Produce a detailed description of the infographic layout and content.

Steps: analyse product info; list features/benefits/drawbacks; organise bullets; propose visual layout (grid, iconography, imagery), contrasts (colors/typography), headings/sub‑headings, balance, and QA checklist.

#INFO
Product 1: [INSERT]
Product 2: [INSERT]
Target audience: [INSERT]
Key comparison points: [UP TO 5]
Color scheme: [INSERT]

IMPORTANT: Output as a structured bullet list describing sections and layout decisions.`,
      textZh: `角色：資深視覺設計師。請產出可「直接交付設計」的對比資訊圖表說明：
— 內容：分析兩產品資訊，條列功能/效益/缺點，彙整比較重點；
— 版式：建議佈局（欄數/節點/圖示/圖片）、配色對比與字體層級；
— 結構：清楚的主標/小標、每節要點；
— 品質：字體尺寸可讀性、資訊平衡、審核清單。

#我的資料：
產品 1：[填寫]
產品 2：[填寫]
目標受眾：[填寫]
比較重點：[最多 5 項]
偏好配色：[填寫]

最重要：以條列方式，詳細描述各區段與版式安排。`,
      category: 'creative',
      level: 'expert',
      userTags: ['創意總監', '內容創作者', '設計師']
    },
    // ——— Expert: Anchor Text Diversification Strategy ———
    {
      id: 'seo-anchor-diversity',
      titleEn: 'Anchor Text Diversification Strategy (with Dependency Grammar Outreach)',
      titleZh: '錨文本多樣化策略（含依存語法框架外聯話術）',
      descriptionEn: 'Build a safe, diversified anchor profile to improve rankings while avoiding over‑optimization.',
      descriptionZh: '在避免過度優化的前提下，多樣化錨文本以提升排名，並提供與站長溝通的依存語法框架話術。',
      textEn: `Adopt the role of an SEO strategy expert. Optimize anchor text diversity to improve rankings while avoiding penalties.

Deep breath and solve step‑by‑step. Deliver a structured plan with H1/H2 headings and bullet points:
1) Current Distribution Analysis — how to export, segment (brand, URL, generic, topical partial match, exact match), and benchmark against competitors.
2) Risk Assessment — identify over‑optimization (e.g., >X% exact), money‑page clustering, toxic anchors.
3) Diversification Opportunities — what mixes to target by page type (home/category/article) and by funnel stage.
4) Implementation Roadmap — cadence per week/month, sources (digital PR, guest posts, resource pages), anchor mapping per target URL.
5) Outreach using a dependency‑grammar framework — provide message templates that map [Reason → Evidence → Request] with optional modifiers (deadline, incentive, mutual benefit).
6) Monitoring — KPIs (visibility, referring domains, anchor distribution drift) and rollback rules.

#MY INFO
Target keyword: [INSERT]
Niche: [INSERT]
Current backlink profile: [INSERT]
SEO goals: [INSERT]
Competitors: [INSERT]

IMPORTANT: Output with clear headings and bullets.`,
      textZh: `扮演 SEO 策略專家，優化錨文本多樣性，避免過度優化處罰。請以「主標題/副標題 + 項目符號」的結構輸出：
1）當前分佈分析——如何匯出與分組（品牌、URL、通用、主題相關部分匹配、精準匹配），並與競爭對手對標。
2）風險評估——辨識過度優化（如精準匹配比例過高）、金錢頁集中、可疑錨文本。
3）多樣化機會——按頁面類型（首頁/分類/文章）與漏斗階段規劃合適的錨文本比例與樣式。
4）實施路線——每週/每月節奏、來源（數位公關、來稿、資源頁）、按 URL 建立錨文本映射表。
5）依存語法框架外聯——提供【原因→證據→請求】可選修飾（時限/誘因/互利）的郵件模板。
6）監控與回退——KPI（能見度、引用網域、錨文本漂移）與回退規則。

#關於我的信息
目標關鍵字：[填寫]
網站利基：[填寫]
目前反向連結配置：[填寫]
SEO 目標：[填寫]
競爭對手：[填寫]

最重要：以結構化格式呈現，包含主標題/副標題與項目符號。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '策略顧問', '品牌策略師']
    },
    // ——— Expert: Site Architecture + Tech Audit with Table Output ———
    {
      id: 'seo-arch-audit-table',
      titleEn: 'Comprehensive Site Architecture & Technical Audit (Table Output)',
      titleZh: '網站架構深度體檢與技術 SEO 審核（表格輸出）',
      descriptionEn: 'Crawl, diagnose and recommend fixes; return a Markdown table: URL | Issue | Recommendation.',
      descriptionZh: '自動爬取並診斷，回傳 Markdown 表格：URL｜問題｜建議。',
      textEn: `Adopt the role of an expert SEO analyst. Perform a full site architecture + technical SEO audit.

Steps: crawl the site, review URL structure, internal linking, hierarchy, navigation, performance (Core Web Vitals), mobile responsiveness; detect duplicates, broken/orphan pages; check canonical, XML sitemaps, robots.txt; review headings/meta/title usage. Provide actionable fixes.

#INFORMATION
Website: [INSERT URL]
Target audience: [INSERT]
Primary keywords: [INSERT]
Business type: [INSERT]
Competitors: [INSERT]

MOST IMPORTANT: Return a Markdown table with 3 columns: URL | Issue | Recommendation.`,
      textZh: `請以資深 SEO 分析師身份，完成「網站架構 + 技術 SEO」全面審核：
— 先爬站，檢查 URL 結構、內部連結、層級與導航
— 速度與行動版（含 Core Web Vitals）
— 重複內容、斷鏈、孤兒頁
— Canonical、XML Sitemap、robots.txt
— H 標題、Meta Description、Title 使用
並逐項提出可執行的修正建議。

請以 Markdown 表格輸出三欄：URL｜問題｜建議。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '網站管理員', '產品經理']
    },
    // ——— Expert: Competitor Backlink Analysis ———
    {
      id: 'seo-competitor-backlinks',
      titleEn: 'Competitor Backlink Analysis (Opportunities Table)',
      titleZh: '競爭對手反向連結分析（機會清單）',
      descriptionEn: 'Identify quality backlink opportunities by dissecting competitors’ link profiles.',
      descriptionZh: '拆解競爭對手連結檔案，輸出高價值可行的連結機會清單。',
      textEn: `Act as an expert SEO analyst. Identify competitors, analyse their backlink profiles, score quality/relevance, and extract opportunities for our site.

#INFORMATION
My website: [INSERT]
Industry niche: [INSERT]
Top competitors: [LIST 3–5]
Current backlink profile: [BRIEF]
Link building goals: [DESCRIBE]

MOST IMPORTANT: Return a Markdown table with columns: Competitor | Backlink URL | Opportunity (brief rationale).`,
      textZh: `請以資深 SEO 分析師身份，完成競爭對手反向連結分析，評估連結品質與相關性，並找出我方可行機會。

#我的資料：
我的網站：[填寫]
產業利基：[填寫]
主要對手：[3–5 名]
目前連結概況：[簡述]
連結目標：[描述]

最重要：以 Markdown 表格輸出三欄：Competitor｜Backlink URL｜Opportunity（簡要理由）。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '策略顧問']
    },
    // ——— Expert: Infographic Link‑building Content ———
    {
      id: 'seo-infographic-linkbuilding',
      titleEn: 'Infographic Link‑Building Content (Dependency Grammar Planning)',
      titleZh: '資訊圖表鏈結誘因內容（依存語法規劃）',
      descriptionEn: 'Research data, structure with dependency grammar, and design a share‑ready infographic outline.',
      descriptionZh: '蒐集數據、用依存語法規劃內容邏輯，輸出可設計與分享的資訊圖表大綱。',
      textEn: `Role: expert content strategist & visual designer.

Steps: 1) Research relevant statistics for the niche. 2) Organise info with a dependency grammar framework for logical flow. 3) Propose a striking visual concept (color, layout, iconography). 4) Ensure web‑sharing/embedding optimisation.

#INFO
Niche: [INSERT]
Target audience: [INSERT]
Brand colors: [INSERT]
Key statistics: [INSERT 3–5]
Desired backlink sites: [INSERT 2–3]

IMPORTANT: Output as a structured outline with clear section headings (Introduction, Key Statistics, Method, Conclusion, Embed Instructions) and bullet points.`,
      textZh: `角色：資深內容策略師與視覺設計師。

請依步驟完成：
1）研究並彙整產業相關數據；
2）以依存語法框架組織內容，確保敘事邏輯；
3）提出具體的視覺概念（配色、版式、圖示）；
4）優化網頁分享與嵌入（檔案尺寸、嵌入碼、Open Graph）。

#我的資料：
產業利基：[填寫]
目標受眾：[填寫]
品牌色彩：[填寫]
關鍵統計：[3–5 項]
期望連結網站：[2–3 個]

最重要：以結構化大綱輸出（如：Introduction、Key Statistics、Conclusion、Embed），各節使用項目符號。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '內容創作者', '品牌策略師']
    },
    // 專家級：SEO 高階提示組
    {
      id: 'seo-arch-blueprint',
      titleEn: 'SEO Site Architecture Blueprint',
      titleZh: 'SEO 網站結構藍圖規劃師',
      descriptionEn: 'From zero to launch: plan a scalable, SEO-friendly site map and navigation that converts.',
      descriptionZh: '由零開始，規劃可擴展、SEO 友善、具高轉換潛力的網站架構與導航。',
      textEn: `Act as a senior SEO strategist and information architect with 15 years of experience. My goal is to build a complete, scalable and SEO‑optimized site blueprint for a website: [describe your website type, e.g. an online yoga course platform for beginners].

Please provide the following in a clear nested structure:
- Core Pages (top navigation)
- Main Category/Service Pages (with head term and user intent for each)
- Content Hubs / Topic Clusters (3–5 core hubs, each with 5 long‑tail article ideas)
- Internal Linking Strategy between core > category > articles
- Required technical/legal pages (Privacy, T&C, FAQ, etc.)

Inputs:
- Core business/services: [list your main products/services]
- Primary audience: [describe TA]
- Main competitors: [2–3 URLs]
- Business goals: [e.g. registrations, newsletter sign‑ups, brand authority]`,
      textZh: `請你扮演一位擁有 15 年經驗的頂級 SEO 策略顧問與網站架構師。我的目標是為一個「[請描述你的網站類型，例如：專為初學者設計的線上瑜珈課程平台]」建立一個完整、具備高度擴展性且經過 SEO 優化的網站藍圖。

請以清晰的層級結構（巢狀列表）提供：
- 核心頁面（頂部導航列）
- 主要分類/服務頁面（每頁附目標核心關鍵字 Head Term 與使用者意圖）
- 內容中心/主題叢集（3–5 個核心主題；每個主題提供 5 個長尾關鍵字文章標題）
- 內部連結策略（核心 > 分類 > 文章 之間如何互鏈）
- 必要技術/法律頁面（隱私權、服務條款、FAQ 等）

背景輸入：
- 核心業務/服務： [請列出]
- 主要目標受眾： [請描述]
- 主要競爭對手： [2–3 個 URL]
- 商業目標： [例如：提升註冊、訂閱、品牌權威]`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '品牌策略師', '策略顧問', '產品經理']
    },
    {
      id: 'seo-tech-audit',
      titleEn: 'Full Technical SEO Audit Framework',
      titleZh: '全方位技術 SEO 審計框架',
      descriptionEn: 'Generate a professional technical SEO audit with findings, impact and next steps.',
      descriptionZh: '自動產生專業級技術 SEO 審計：列出問題、影響評級及後續步驟。',
      textEn: `Act as a senior technical SEO analyst. Produce a complete technical SEO audit for: [paste your site URL].

Return a Markdown table with columns: Issue, Findings/Status, Impact (High/Medium/Low), Recommended Next Steps.

Cover these domains:
1) Indexing & Crawlability (robots.txt, XML sitemaps, crawl budget, orphan pages)
2) Site Speed & Core Web Vitals (LCP, INP/FID, CLS; heavy assets; uncompressed JS/CSS)
3) Mobile‑Friendliness (RWD issues; UX like font size, tap targets)
4) Structured Data (existing schemas, errors, new schema to add: FAQ/HowTo/Product etc.)
5) Security (HTTPS, mixed content)
6) Duplicate Content (URL parameters, www vs non‑www, canonical usage)

Finish with a paragraph summarising the top 3 urgent issues to prioritise.`,
      textZh: `請你扮演一位資深的技術 SEO 分析師。請為我的網站：[請貼上你的網站 URL] 產生完整的技術 SEO 審計。

請以 Markdown 表格呈現，欄位包含：「檢測項目」、「狀態/發現」、「潛在影響評級（高/中/低）」、「建議的後續步驟」。

審計範圍必須涵蓋：
1）索引與爬取（robots.txt、XML sitemap、爬取預算、孤兒頁面）
2）網站速度與 Core Web Vitals（LCP、INP/FID、CLS；過重資產；未壓縮 JS/CSS）
3）行動裝置友善度（RWD 問題；字體太小/按鈕太近等 UX）
4）結構化資料（已用 Schema 與錯誤；建議新增 FAQ/HowTo/Product 等）
5）網站安全性（HTTPS、混合內容）
6）重複內容（參數/雙版本問題；Canonical 使用是否正確）

最後加上一段總結：目前最緊急、需優先處理的 3 個技術問題。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', 'SEO', '網站管理員', '產品經理']
    },
    {
      id: 'seo-keyword-warfare',
      titleEn: 'Keyword Warfare Plan',
      titleZh: '關鍵字競爭作戰計畫',
      descriptionEn: 'Deconstruct competitors, find gaps, and plan 6 months of attack topics.',
      descriptionZh: '拆解對手策略、發掘機會缺口，並制定 6 個月攻擊主題路線。',
      textEn: `Act as an elite competitive intelligence analyst for SEO.

My site: [your URL]
Core topic: [e.g. sustainable fashion]
Main competitor: [competitor URL]

Deliver:
- Competitor Strategy Breakdown (core and long‑tail keywords; winning content types; unique angles/value props)
- Opportunity Gaps (weak competitor pages; uncovered but relevant keywords; SERP features they ignore)
- 20 Attack Opportunities (Markdown table: Proposed Title | Target Keyword | Est. Volume/Difficulty | Content Type)
- 6‑Month Roadmap (prioritise low‑hanging fruit in first 2 months)`,
      textZh: `請你扮演一位頂級競爭情報分析師（SEO 領域）。

我的網站： [你的網站 URL]
核心關鍵字主題： [例如：永續時尚]
主要競爭對手： [對手 URL]

請提供：
- 對手策略拆解（核心/長尾關鍵字；哪些內容類型表現最好；獨特角度/主張）
- 機會缺口（內容品質較弱的關鍵字；尚未覆蓋但高度相關的關鍵字；他們忽略的 SERP 功能）
- 20 個可行攻擊機會（Markdown 表格：建議標題｜目標關鍵字｜預估量/難度｜內容類型）
- 6 個月攻擊路線圖（前兩個月優先處理低垂果實）`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '策略顧問', '內容創作者', '品牌策略師']
    },
    {
      id: 'lp-copy-conversion',
      titleEn: 'Landing Page Copy Conversion Wizard',
      titleZh: '登陸頁文案轉換魔法師',
      descriptionEn: 'Interview first, then deliver a full CRO‑ready landing page copy framework.',
      descriptionZh: '先訪談再輸出完整銷售頁文案，兼顧 SEO 與高轉換。',
      textEn: `Act as a world‑class direct‑response copywriter and CRO expert.

First, ask me a set of probing questions covering:
- Product (core features and unique problem solved)
- Audience (pain, desires, objections)
- Positioning (how we differ)
- Desired CTA

Then write the full landing copy using this structure:
- Headline
- Sub‑headline (amplify pain)
- Problem & Solution
- Features → Benefits
- Social Proof placeholders
- Objection Handling
- Clear CTA
- Risk Reversal (e.g. 30‑day guarantee)

Tone: [professional / empathetic / playful]. Target keyword: [your main keyword].`,
      textZh: `請你扮演世界級直效行銷文案與轉換率優化（CRO）專家。

第一步：先向我發問，徹底了解——
- 產品/服務（核心功能、解決何種獨特問題）
- 目標受眾（痛點、渴望、疑慮與反對意見）
- 市場定位（我們與競品有何不同）
- 期望行動（CTA）

第二步：根據回答撰寫完整登陸頁文案，框架包含——
- 主標題（Headline）
- 副標題（加強痛點）
- 問題與解決方案
- 功能 → 效益（Features → Benefits）
- 社會認同（預留見證/案例/媒體）
- 反對意見處理
- 明確 CTA
- 風險逆轉（例如 30 天無效退款）

語氣： [專業且權威 / 親切且具同理心 / 有趣且幽默]；主要關鍵字： [請填寫]。`,
      category: 'workplace',
      level: 'expert',
      userTags: ['數字營銷專家', '產品經理', 'UI/UX', '內容創作者']
    },
    {
      id: 'student-brainstorm',
      titleEn: 'Creative Topic Generator',
      titleZh: '創意主題生成器',
      descriptionEn: 'Brainstorm unique angles for creative writing or project reports',
      descriptionZh: '為創意寫作或專題報告腦力激盪，發掘別人想不到的切入點',
      textEn: 'I need to come up with a project topic for [subject] about [theme], but I don\'t want something too ordinary. Please provide 5 novel, controversial, or unexpected research angles or topic directions.',
      textZh: '我需要為 [科目] 課構思一個關於 [主題] 嘅專題報告題目，但唔想太普通。請提供 5 個比較新穎、有爭議性或意想不到嘅研究角度或題目方向。',
      category: 'daily',
      level: 'beginner',
      userTags: ['學生']
    },
    {
      id: 'student-flashcards',
      titleEn: 'Flashcard Creator',
      titleZh: '問答卡製作器',
      descriptionEn: 'Convert study materials into flashcard format for mobile apps or physical cards',
      descriptionZh: '將學習材料轉化為問答卡格式，方便用手機APP或實體卡進行背誦',
      textEn: 'I need to review [subject] for [unit name]. Please convert the following key content into 10 question-answer flashcard sets. Each set should have a "Question" and "Answer" section. Content: [paste your study materials]',
      textZh: '我需要溫習 [科目] 嘅 [單元名稱]。請將以下嘅重點內容，轉化為 10 組問答卡。每組需要有『問題』同『答案』兩部分。內容如下：『[請貼上你的學習材料]』',
      category: 'daily',
      level: 'beginner',
      userTags: ['學生']
    },
    {
      id: 'student-debate',
      titleEn: 'Debate Preparation Assistant',
      titleZh: '辯論準備助手',
      descriptionEn: 'Practice debate skills and critical thinking by simulating opponent arguments',
      descriptionZh: '練習辯論技巧及批判性思維，模擬對手的立論以作準備',
      textEn: 'I need to prepare for a debate on "[debate topic, e.g., AI brings more benefits than harm to humanity]". I am on the affirmative side. Please simulate the opposing side and provide three strong and compelling arguments with simple reasoning, so I can prepare counterarguments.',
      textZh: '我需要準備一個關於『[辯題，例如：人工智能對人類利多於弊]』嘅辯論。我係正方。請模擬反方，提出三個最強而有力嘅論點，並附上簡單理據，等我可以預備定點樣反駁。',
      category: 'daily',
      level: 'beginner',
      userTags: ['學生']
    },
    {
      id: 'student-math-solver',
      titleEn: 'Step-by-Step Math Solver',
      titleZh: '數理解題步驟助手',
      descriptionEn: 'Break down complex math problems with detailed step-by-step explanations',
      descriptionZh: '解構複雜的數理題目，要求分步解釋，確保自己能跟上',
      textEn: 'I don\'t understand how to solve this [subject, e.g., calculus] problem: "[paste problem]". Please provide detailed solution steps as if teaching a beginner, and explain the formulas or core principles used in each step.',
      textZh: '我唔明白呢條 [科目，例如：微積分] 嘅題目點樣解決：『[請貼上題目]』。請提供詳細嘅解題步驟，就好似教緊一個初學者一樣，並解釋每個步驟背後運用到嘅公式或核心原理。',
      category: 'daily',
      level: 'beginner',
      userTags: ['學生']
    },

    // 保險及理財策劃業 Prompts
    {
      id: 'insurance-followup-email',
      titleEn: 'Client Follow-up Email',
      titleZh: '客戶跟進電郵',
      descriptionEn: 'Draft professional follow-up emails after client meetings',
      descriptionZh: '會議後撰寫專業的跟進電郵，總結要點並安排下一步',
      textEn: 'I just completed a first financial meeting with client [client name]. Please help me draft a follow-up email that thanks them for their time, briefly reviews the [Goal A] and [Goal B] we discussed, and mentions that I will prepare a preliminary proposal within [timeframe, e.g., three days]. The tone should be professional, proactive, and reliable.',
      textZh: '我啱啱同客戶 [客戶名稱] 完成咗第一次財務會議。請幫我草擬一封跟進電郵，內容應感謝對方嘅時間，簡要重溫我哋討論過嘅 [目標A] 同 [目標B]，並提及我會喺 [時間，例如：三天內] 準備好一份初步建議書。語氣要專業、主動同可靠。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-annual-review',
      titleEn: 'Annual Financial Review',
      titleZh: '年度財務回顧',
      descriptionEn: 'Create personalized annual financial review summaries for clients',
      descriptionZh: '為客戶撰寫個人化的年度財務回顧摘要，展示持續服務的價值',
      textEn: 'Based on the following client information: [age, occupation, family status, existing policies, financial goals, etc.], please help me generate a draft annual financial review summary that includes: 1. Positive changes in financial status over the past year. 2. Strengths and potential gaps in current protection portfolio. 3. Key financial planning recommendations for the next year.',
      textZh: '根據以下客戶資料：[年齡、職業、家庭狀況、現有保單、理財目標等]，請幫我生成一段年度財務回顧摘要嘅草稿，內容應包括：1. 過去一年財務狀況嘅正面變化。 2. 現有保障組合嘅優點與潛在缺口。 3. 下一年度嘅理財建議重點。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-jargon-translator',
      titleEn: 'Insurance Jargon Translator',
      titleZh: '保險術語翻譯器',
      descriptionEn: 'Translate industry jargon into plain language clients can understand',
      descriptionZh: '將行內術語翻譯成客戶聽得懂的人話',
      textEn: 'Please explain "[insurance term, e.g., policy dividends/premium financing/waiting period]" in the simplest and most direct way, as if explaining to a friend who knows nothing about it, avoiding any other professional jargon.',
      textZh: '請用最簡單直接嘅方式，解釋『[保險術語，例如：保單紅利／保費融資／等待期]』呢個詞語係咩意思，就好似解釋俾一個完全唔識嘅朋友聽一樣，避免使用任何其他專業術語。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-webinar-planner',
      titleEn: 'Webinar Topic Generator',
      titleZh: '講座主題生成器',
      descriptionEn: 'Create engaging webinar topics to increase registration rates',
      descriptionZh: '為客戶講座或網上研討會構思吸引人的主題，增加報名率',
      textEn: 'I plan to host an online financial webinar for [target audience, e.g., young couples preparing to buy property]. Please suggest 3 topics they would be most interested in, and for each topic provide an attractive title, content outline, and a registration-encouraging question.',
      textZh: '我計劃舉辦一個面向 [目標客戶群，例如：準備置業嘅年輕夫婦] 嘅網上理財講座。請建議 3 個佢哋會最感興趣嘅講座主題，並為每個主題提供一個吸引嘅標題、內容大綱，同一個引導報名嘅問題。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-milestone-message',
      titleEn: 'Life Milestone Congratulations',
      titleZh: '人生里程碑祝賀',
      descriptionEn: 'Send congratulations for client life events while naturally introducing policy reviews',
      descriptionZh: '藉著客戶人生大事送上祝福，並自然地引出保單檢視的需要',
      textEn: 'My client [client name] just announced [life event, e.g., successful proposal/becoming parents] on social media. Please help me write a sincere, approximately 50-word congratulatory message (SMS/WhatsApp) that\'s not hard-sell, and at the end gently remind them that when they\'re settled, they can always contact me to discuss any updates needed for family protection.',
      textZh: '我嘅客戶 [客戶名稱] 啱啱喺社交媒體宣佈 [人生大事，例如：成功求婚／榮升父母]。請幫我寫一個約 50 字、誠摯又唔hard sell嘅祝賀訊息 (SMS/WhatsApp)，並喺結尾溫馨提示，當佢哋安頓好之後，可以隨時搵我傾傾，睇下家庭保障方面有咩需要更新。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },

    // 市場營銷 Prompts  
    {
      id: 'marketing-persona',
      titleEn: 'Customer Persona Builder',
      titleZh: '客戶畫像建立器',
      descriptionEn: 'Create detailed target customer personas for team alignment',
      descriptionZh: '建立詳細的目標客戶畫像，令整個團隊對目標客戶有更清晰的共識',
      textEn: 'Our product is [product name and description]. Our target customers are [brief description]. Please help me expand this concept to create a detailed customer persona, including: name, age, occupation, income level, main pain points, life goals, commonly used social media, and their most valued beliefs.',
      textZh: '我哋嘅產品係 [產品名稱及描述]。我哋嘅目標客戶係 [簡單描述]。請幫我擴展呢個概念，建立一個詳細嘅客戶畫像，需要包含：姓名、年齡、職業、收入水平、主要痛點、人生目標、常用嘅社交媒體，以及佢最重視嘅價值觀。',
      category: 'creative',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-product-description',
      titleEn: 'SEO Product Description',
      titleZh: 'SEO產品描述',
      descriptionEn: 'Write attractive and SEO-friendly product descriptions for online stores',
      descriptionZh: '為網店產品撰寫具吸引力且有利於搜尋引擎優化的描述',
      textEn: 'Please write a 150-word product description for our [product name, e.g., wireless noise-canceling headphones]. The description should use storytelling to emphasize its [main selling point A, e.g., immersive sound quality] and [main selling point B, e.g., ultra-long battery life], while naturally incorporating SEO keywords like [keyword A], [keyword B].',
      textZh: '請為我哋嘅 [產品名稱，例如：無線降噪耳機] 撰寫一段約 150 字嘅產品描述。描述需要用故事性嘅方式，強調佢嘅 [主要賣點A，如：沉浸式音質] 同 [主要賣點B，如：超長續航力]，並自然地包含 [關鍵字A]、[關鍵字B] 等SEO關鍵字。',
      category: 'creative',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-video-script',
      titleEn: 'Short Video Script Creator',
      titleZh: '短影片腳本創作器',
      descriptionEn: 'Create specific visual scripts for short video ads like TikTok/Reels',
      descriptionZh: '為短影片廣告構思一個具體的視覺劇本',
      textEn: 'I want to create a 15-second Instagram Reel for our [service, e.g., pet grooming service]. Please provide a three-shot script outline: [Shot 1 description], [Shot 2 description], [Shot 3 description]. For each shot, please design the visual scene, on-screen title text, and final call-to-action.',
      textZh: '我想為我哋嘅 [服務，例如：寵物美容服務] 製作一個 15 秒嘅 Instagram Reel。請提供一個三鏡頭嘅劇本大綱：[鏡頭1描述]、[鏡頭2描述]、[鏡頭3描述]。請為每個鏡頭構思視覺畫面、螢幕上嘅標題文字，以及最後嘅行動呼籲。',
      category: 'creative',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-social-response',
      titleEn: 'Social Media Response Templates',
      titleZh: '社交媒體回覆模板',
      descriptionEn: 'Draft responses to positive and negative customer comments on social media',
      descriptionZh: '快速草擬回覆社交媒體上的客戶留言，包括正面及負面，以維持品牌形象',
      textEn: 'A customer commented on our post. Please provide two standard response templates: 1. How to thank customers for positive praise: "[customer positive comment]". 2. How to professionally handle negative opinions or complaints: "[customer negative comment]". Responses should show empathy and guide to private communication.',
      textZh: '有客戶喺我哋嘅帖文下留言。請提供兩種標準回覆範本：1. 如何感謝客戶嘅正面讚賞：『[客戶正面留言]』。2. 如何專業地處理客戶嘅負面意見或投訴：『[客戶負面留言]』。回覆語氣要展現同理心，並引導至私下溝通。',
      category: 'creative',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-campaign-concept',
      titleEn: 'Campaign Creative Concept',
      titleZh: '推廣活動創意概念',
      descriptionEn: 'Develop core creative concepts and slogans for marketing campaigns',
      descriptionZh: '為一次完整的市場推廣活動構思一個核心創意概念及標語',
      textEn: 'Our company will conduct a [campaign theme, e.g., quarterly promotion] for [product/service]. The goal is [campaign objective, e.g., increase brand awareness]. Please help me brainstorm a core creative concept, and based on this concept, create 3 promotional slogans in different styles.',
      textZh: '我哋公司將會為 [產品/服務] 舉行一個 [活動主題，例如：季度促銷]。目標係 [活動目標，例如：提升品牌知名度]。請幫我發想一個核心創意概念，並基於此概念，創作 3 個唔同風格嘅宣傳標語。',
      category: 'creative',
      level: 'beginner',
      userTags: ['市場營銷']
    },

    // 原有的進階Prompts
    {
      id: 'daily-research',
      titleEn: 'Advanced Research Assistant',
      titleZh: '進階研究助手',
      descriptionEn: 'Conduct comprehensive academic research with critical analysis',
      descriptionZh: '對學術主題進行全面研究，包含批判性分析',
      textEn: 'Conduct an in-depth research analysis on [academic topic], including: 1) Current state of research and key debates, 2) Methodology comparison across major studies, 3) Identification of research gaps, 4) Future research directions, 5) Critical evaluation of conflicting viewpoints.',
      textZh: '為 [學術主題] 進行深入研究分析，包括：1) 研究現狀和主要爭議，2) 主要研究的方法論比較，3) 研究空白的識別，4) 未來研究方向，5) 對相互衝突觀點的批判性評估。',
      category: 'daily',
      level: 'intermediate',
      userTags: ['研究人員', '學者', '進階學習者']
    },
    {
      id: 'workplace-strategic-analysis',
      titleEn: 'Strategic Business Analysis',
      titleZh: '策略商業分析',
      descriptionEn: 'Perform comprehensive business analysis with strategic recommendations',
      descriptionZh: '執行全面的商業分析並提供策略建議',
      textEn: 'Analyze the business performance data: [data]. Provide: 1) Trend analysis with statistical significance, 2) Root cause analysis of performance gaps, 3) Competitive positioning assessment, 4) Strategic recommendations with implementation roadmap, 5) Risk mitigation strategies.',
      textZh: '分析商業績效數據：[數據]。提供：1) 具統計意義的趨勢分析，2) 績效差距的根本原因分析，3) 競爭定位評估，4) 策略建議和實施路線圖，5) 風險緩解策略。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['數據分析師', '商業專業人士', '策略顧問']
    },
    {
      id: 'creative-brand-strategy',
      titleEn: 'Comprehensive Brand Strategy',
      titleZh: '全面品牌策略',
      descriptionEn: 'Develop multi-channel brand strategy with creative execution',
      descriptionZh: '制定多渠道品牌策略及創意執行方案',
      textEn: 'Develop a comprehensive brand strategy for [brand/product] including: 1) Brand positioning and differentiation, 2) Multi-channel creative campaign concepts, 3) Content strategy across platforms, 4) Influencer collaboration framework, 5) Performance measurement metrics and optimization plans.',
      textZh: '為 [品牌/產品] 制定全面品牌策略，包括：1) 品牌定位和差異化，2) 多渠道創意活動概念，3) 跨平台內容策略，4) 影響者合作框架，5) 績效測量指標和優化計劃。',
      category: 'creative',
      level: 'intermediate',
      userTags: ['品牌策略師', '創意總監', '數字營銷專家']
    },

    // =========================
    // Students - Intermediate
    // =========================
    {
      id: 'student-outline-argument-map',
      titleEn: 'Argument Map for Essays',
      titleZh: '論文論證結構圖',
      descriptionEn: 'Produce a logical argument map and section outline before writing',
      descriptionZh: '寫作前建立清晰的論證結構與章節大綱',
      textEn: 'I need to write a [word count] report for [subject] on [topic]. Please create an argument map including: thesis statement, three main arguments with key evidence for each, likely counterarguments with rebuttals, and a conclusion angle. Provide the output as: 1) Outline headings, 2) Bullet-point argument map.',
      textZh: '我需要為 [科目] 撰寫一篇約 [字數] 字、主題為 [主題] 的報告。請先建立一個論證結構圖，包含：中心論題、三個主要論點（各自列出關鍵證據）、可能的反方觀點與反駁，以及結論方向。請以兩部分輸出：1) 章節大綱 2) 論證結構要點列表。',
      category: 'daily',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-concept-multi-analogy',
      titleEn: 'Explain Concept with Multiple Analogies',
      titleZh: '以多個比喻解釋概念',
      descriptionEn: 'Compare 2–3 analogies and choose the clearest explanation',
      descriptionZh: '提供2–3個比喻並比較，選出最清晰的解說',
      textEn: 'I am learning [subject] and struggle with the concept of [complex concept]. Please explain it using 2–3 different real-life analogies (e.g., [example]) and then compare them to select the clearest one. End with a concise explanation in plain language suitable for a secondary student.',
      textZh: '我在學習 [學科]，對 [複雜概念] 感到困難。請用 2–3 個不同的生活化比喻（例如：[例子]）來解釋，並比較這些比喻的優缺點，最後以中學生都明白的簡單語言作出最清晰的總結。',
      category: 'daily',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-adaptive-study-plan',
      titleEn: 'Adaptive Weekly Study Plan',
      titleZh: '自適應一週溫習計劃',
      descriptionEn: 'Build a study plan that adapts to weak topics and available time',
      descriptionZh: '根據弱項與可用時間自動調整的一週溫習計劃',
      textEn: 'My final exam is in [weeks] weeks for [subjects list]. I can study [hours] hours per day. Based on typical difficulty and my weak areas ([weak topics]), create a 7-day plan with daily focus, micro-goals, spaced-repetition slots, and a daily 15‑minute review checklist. Format clearly as a table.',
      textZh: '我將於 [幾多星期] 後考期末，科目包括 [科目清單]。我每天可用 [時數] 小時。請根據一般難度及我的弱項（[弱項]），設計 7 天計劃：每日重點、微目標、間隔重溫時段，以及每天 15 分鐘檢查清單。請用表格清晰呈現。',
      category: 'daily',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-english-style-improver',
      titleEn: 'English Style Improver with Explanations',
      titleZh: '英文潤飾與風格優化（附解說）',
      descriptionEn: 'Polish writing and explain grammar and tone changes',
      descriptionZh: '優化用詞語氣並解釋修改原因，幫助進步',
      textEn: 'Please rewrite my paragraph about [topic] to be more natural and academic. Then list the edits in a table with: original phrase, improved phrase, reason (grammar/clarity/tone), and a tip to remember. My original text: "[paste text]"',
      textZh: '請將我關於 [主題] 的英文段落潤飾成更自然、學術化的版本。之後用表格列出修改：原句、改寫、原因（文法/清晰度/語氣）及記憶小貼士。我的原文：『[請貼上原文]』',
      category: 'daily',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-presentation-script-cues',
      titleEn: 'Presentation Script with Speaker Cues',
      titleZh: '演講稿與演示提示',
      descriptionEn: 'Produce a 8–10 minute script with slide cues and timing',
      descriptionZh: '輸出 8–10 分鐘演講稿，含投影片提示與時間節奏',
      textEn: 'I will present on [topic] for [duration, e.g., 9 minutes] to [audience]. Create a script with: opening hook, 3–4 key sections, transitions, closing CTA. Add slide titles, bullet points per slide, and suggested timing per section. Include 3 audience questions for Q&A.',
      textZh: '我需要就 [主題] 作 [時間] 的報告，對象為 [聽眾]。請產生演講稿：開場引子、3–4 個重點段落、過場銜接、結尾行動呼籲。附上每張投影片標題與要點，以及各部分建議時間；並提供 3 條可用於答問環節的提問。',
      category: 'daily',
      level: 'intermediate',
      userTags: ['學生']
    },

    // =====================================
    // Insurance & Financial Planning - Intermediate
    // =====================================
    {
      id: 'insurance-cold-email-variants',
      titleEn: 'Professional Outreach Email Variants',
      titleZh: '專業外展電郵多版本',
      descriptionEn: 'Generate 3 tone variants for first-contact outreach with compliance-friendly wording',
      descriptionZh: '為首次接觸客戶生成 3 種語氣版本，符合合規用語',
      textEn: 'I am a financial planner reaching out to a [prospect profile]. Please draft three outreach email variants: 1) friendly, 2) analytical, 3) executive brief. Each should include a value statement, a 15‑minute discovery invite, and a soft CTA. Keep wording compliance-friendly and non-salesy.',
      textZh: '我是一名理財策劃師，對象為 [潛在客戶特徵]。請草擬三個首次外展電郵版本：1) 友善 2) 理性 3) 主管式精簡。每個版本需包含價值主張、邀請 15 分鐘了解及溫和 CTA，用語需合規且不硬銷。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-product-compare-plain',
      titleEn: 'Plain-Language Product Comparison',
      titleZh: '白話式產品比較說明',
      descriptionEn: "Compare two products with who-it's-for, pros/cons, and scenario fit",
      descriptionZh: '以「適合對象、優缺點、情境配搭」比較兩款產品',
      textEn: 'Please explain the differences between [product A] and [product B] to a layperson. Output sections: 1) Who it is for, 2) What it covers/benefits, 3) Pros and cons, 4) Typical scenarios when it fits, 5) Short disclaimer note.',
      textZh: '請用淺白語言比較 [產品A] 與 [產品B] 的差異。輸出段落：1) 適合對象 2) 保障/利益重點 3) 優缺點 4) 適用情境 5) 簡短免責提示。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-objection-script',
      titleEn: 'Objection Handling Script Builder',
      titleZh: '異議處理回應腳本',
      descriptionEn: 'Create 3 responses per objection using empathy, reframe, and future-cast',
      descriptionZh: '針對常見異議提供同理心、重構與未來願景三式回應',
      textEn: 'Client objection: "[objection]" about [proposal]. Provide three responses: 1) Empathy + clarify question, 2) Reframe with data point or analogy, 3) Future-cast the risk/benefit if no action is taken. End with a permission-based next step.',
      textZh: '客戶對 [建議方案] 的異議為：「[異議內容]」。請給出三種回應：1) 先表達同理並澄清問題 2) 以數據或比喻重構 3) 描述不採取行動的未來風險/利益。最後以「徵求同意」方式提出下一步。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-social-calendar',
      titleEn: '4-Week Social Content Calendar',
      titleZh: '四週社交內容行事曆',
      descriptionEn: 'Plan educational posts to build authority without hard selling',
      descriptionZh: '以教育為主建立專業形象，避免硬銷的四週排程',
      textEn: 'Create a 4‑week content calendar for [platforms e.g., Facebook/IG] aimed at [audience]. Include 3 posts per week: topic, hook/angle, key points, suggested visual, and CTA. Keep tone professional and helpful.',
      textZh: '為 [平台]、目標為 [受眾] 設計 4 週內容排程。每週 3 篇：主題、切入角度/引子、重點、建議視覺及 CTA。語氣專業、以助人為主。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'insurance-meeting-followup-brief',
      titleEn: 'Meeting Summary and Next Steps',
      titleZh: '會議摘要與下一步',
      descriptionEn: 'Summarize discovery meeting and propose clear follow-up actions',
      descriptionZh: '整理初次會面重點並提出明確後續行動',
      textEn: 'We just had a discovery meeting with [client]. Please draft a concise follow‑up note including: goals discussed, current policies/assets overview, identified gaps, proposed next steps with timeline, and documents needed from client.',
      textZh: '剛與 [客戶] 進行了解會議。請撰寫簡潔的跟進摘要：討論目標、現有保單/資產概況、識別的缺口、下一步計劃與時間表，以及客戶需提供的文件清單。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['保險及理財策劃業']
    },

    // =========================
    // Marketing - Intermediate
    // =========================
    {
      id: 'marketing-content-calendar-4w',
      titleEn: '4-Week Multi-Channel Content Calendar',
      titleZh: '四週多渠道內容日曆',
      descriptionEn: 'Plan topics across IG/FB/Blog with hooks and CTAs',
      descriptionZh: '針對 IG/FB/Blog 制定主題、切入點與 CTA 的四週計劃',
      textEn: 'For our product [product], build a 4‑week calendar across Instagram, Facebook, and Blog. Each entry should include: channel, post title, hook, 3–4 bullet points, visual idea, and CTA. Balance education, social proof, and promotion.',
      textZh: '針對我們的 [產品]，在 Instagram、Facebook 與 Blog 制定四週內容日曆。每則內容需包含：渠道、標題、引子、3–4 個要點、視覺構想與 CTA。教育、口碑與促銷比例需取得平衡。',
      category: 'creative',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-headline-frameworks',
      titleEn: 'Headline Ideas Using 5 Frameworks',
      titleZh: '套用5種框架的標題創意',
      descriptionEn: 'Generate headlines using question/benefit/urgency/how-to/story styles',
      descriptionZh: '以提問/利益/急迫感/教學/故事五種風格產生標題',
      textEn: 'We are promoting [product/service] to [audience]. Please provide 10 headline ideas using a mix of frameworks: question, benefit-led, urgency, how‑to, and storytelling. Return them in a table with the framework type column.',
      textZh: '我們要向 [目標受眾] 推廣 [產品/服務]。請以提問式、利益導向、急迫感、教學式與故事型混合，提供 10 個標題創意，並以表格呈現（包含框架類型欄位）。',
      category: 'creative',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-seo-blog-outline',
      titleEn: 'SEO Blog Outline with Meta Data',
      titleZh: '含SEO元素的部落格大綱',
      descriptionEn: 'Create an outline with H1–H3, keywords, and meta description',
      descriptionZh: '輸出 H1–H3 結構、關鍵字與 meta description 的大綱',
      textEn: 'Draft a 500–800 word blog outline titled "[title]" for [audience]. Include H1–H3 structure, primary/secondary keywords, internal link ideas, and a 155‑character meta description. Provide bullet points under each section.',
      textZh: '為題為「[標題]」、面向 [讀者] 的 500–800 字文章建立大綱。請包含 H1–H3 結構、主要/次要關鍵字、內部連結建議，以及一段 155 字內的 meta description。各節以要點列出。',
      category: 'creative',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-competitor-gap-audit',
      titleEn: 'Competitor Content Gap Audit',
      titleZh: '競品內容缺口審視',
      descriptionEn: 'Analyze competitor content and list gaps we can own',
      descriptionZh: '審視競品內容並列出可切入的主題缺口',
      textEn: 'Our business is [your business]. Competitor: [competitor]. Analyze their [platform] content and summarize: content pillars, tone of voice, best‑performing post types, and 5 under‑served topics where we can stand out with examples of angles.',
      textZh: '我們經營 [你的業務]。競爭對手為 [對手]。請分析其在 [平台] 的內容：核心內容支柱、語氣風格、表現最佳的帖文類型，並列出 5 個他們較少覆蓋而我們可突出的主題，附上切入角度示例。',
      category: 'creative',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-newsletter-segmentation',
      titleEn: 'Segmented Newsletter Draft',
      titleZh: '分眾電子報草稿',
      descriptionEn: 'Create a monthly newsletter with sections and CTAs for two segments',
      descriptionZh: '產生月刊電子報草稿，針對兩個分眾提供內容與 CTA',
      textEn: 'Theme: [theme]. Create a monthly newsletter draft with: opening hook, main article summary, product/offer section, and a CTA. Provide two versions tailored to segments [segment A] and [segment B] with wording differences highlighted.',
      textZh: '主題：[主題]。請草擬月度電子報：開場引子、主題短文摘要、產品/優惠區塊與 CTA。為 [分眾A] 與 [分眾B] 各提供一個版本，並標示兩者在用語上的差異。',
      category: 'creative',
      level: 'intermediate',
      userTags: ['市場營銷']
    },

    // =========================
    // Level 1 (Beginner) - Students
    // =========================
    {
      id: 's-beginner-opportunity-cost',
      titleEn: 'Explain Opportunity Cost Simply',
      titleZh: '用簡單語言解釋「機會成本」',
      descriptionEn: 'Daily learning: simple definition with an example.',
      descriptionZh: '日常學習：用例子作簡單解釋。',
      textEn: 'Explain in simple language what "opportunity cost" means. Give one everyday example to make it easy for a secondary student to understand.',
      textZh: '請用簡單語言解釋「機會成本」係咩，並提供一個生活化例子，讓中學生都容易明白。',
      category: 'daily',
      level: 'beginner',
      userTags: ['學生']
    },
    {
      id: 's-beginner-1h-study-plan',
      titleEn: '1-Hour-a-Day Study Timetable (High School)',
      titleZh: '高中生每日 1 小時溫習時間表',
      descriptionEn: 'Daily learning: simple weekly plan.',
      descriptionZh: '日常學習：簡單的一週計劃。',
      textEn: 'Create a weekly study timetable for a high school student who can study only 1 hour per day. Include daily focus and short review tips.',
      textZh: '請為高中生設計一份一週溫習時間表，每日只用 1 小時。列出每日重點與簡短覆習貼士。',
      category: 'daily',
      level: 'beginner',
      userTags: ['學生']
    },
    {
      id: 's-beginner-100w-story',
      titleEn: '100-Word Short Story: My Future Dream',
      titleZh: '100 字小故事：「我夢中的未來」',
      descriptionEn: 'Creative living: write a 100-word story.',
      descriptionZh: '創意生活：撰寫 100 字短篇。',
      textEn: 'Write a 100-word short story with the theme "My Dreamed Future". Keep it warm and inspiring.',
      textZh: '請以「我夢中的未來」為主題，寫一篇 100 字的小故事，文風溫暖而具啟發性。',
      category: 'creative',
      level: 'beginner',
      userTags: ['學生']
    },
    {
      id: 's-beginner-linkedin-about',
      titleEn: 'LinkedIn About (Student)',
      titleZh: 'LinkedIn 自我介紹（學生）',
      descriptionEn: 'Workplace: concise About section with study and future goal.',
      descriptionZh: '職場應用：包含所修讀學科與未來目標的 About。',
      textEn: 'Write a concise LinkedIn About for a student. Include current major/subject, key interests, simple achievements (optional), and future goals in 3–4 sentences.',
      textZh: '請為學生撰寫 LinkedIn 自我介紹（About），3–4 句，包含目前就讀學科、主要興趣、可選擇列出簡單成就，以及未來目標。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['學生']
    },

    // =====================================
    // Level 1 (Beginner) - Insurance & Financial Planning
    // =====================================
    {
      id: 'i-beginner-life-insurance-explain',
      titleEn: 'Plain Explain: What is Life Insurance',
      titleZh: '淺白解釋：什麼是人壽保險',
      descriptionEn: 'Workplace: client-friendly explanation.',
      descriptionZh: '職場應用：適合發給客戶的說明。',
      textEn: 'Explain in plain language what life insurance is, who it is for, and one simple example of how it helps a family.',
      textZh: '請用淺白方式解釋什麼是人壽保險、適合哪些人，以及一個幫助家庭的簡單例子。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'i-beginner-whatsapp-opening-retirement',
      titleEn: 'WhatsApp Opening Line: Retirement Consultation',
      titleZh: 'WhatsApp 銷售開場白：退休諮詢',
      descriptionEn: 'Workplace: soft and friendly opener.',
      descriptionZh: '職場應用：友善不硬銷的開場白。',
      textEn: 'Draft a soft, friendly WhatsApp opener to invite a contact to a retirement planning consultation, focusing on value and zero hard sell.',
      textZh: '請草擬一段友善、不硬銷的 WhatsApp 開場白，邀請對方參加退休計劃諮詢，重點放在價值與關心。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'i-beginner-workshop-game-idea',
      titleEn: 'Game Idea for Finance Workshop (10 people)',
      titleZh: '理財工作坊遊戲點子（10 人）',
      descriptionEn: 'Creative living: simple group activity idea.',
      descriptionZh: '創意生活：簡單團體小遊戲構想。',
      textEn: 'Give one fun and educational mini-game idea suitable for 10 participants in a finance workshop. Include steps and materials.',
      textZh: '請提供一個有趣且具教育性的理財小遊戲點子，適合 10 人參與，列出玩法步驟及所需物資。',
      category: 'creative',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    {
      id: 'i-beginner-3-books',
      titleEn: '3 Beginner Finance Books',
      titleZh: '3 本理財入門書',
      descriptionEn: 'Daily learning: curated starter list.',
      descriptionZh: '日常學習：為初學者準備的清單。',
      textEn: 'List 3 beginner-friendly books for learning personal finance. Add one-line why each is helpful.',
      textZh: '請列出 3 本適合初學者的理財入門書，並各附上一句為何值得推薦的理由。',
      category: 'daily',
      level: 'beginner',
      userTags: ['保險及理財策劃業']
    },
    // =========================
    // Level 1 (Beginner) - Marketing
    // =========================
    {
      id: 'm-beginner-ig-tagline',
      titleEn: 'Instagram Slogan for Fashion Brand',
      titleZh: '時尚品牌 Instagram 推廣標語',
      descriptionEn: 'Workplace: one-line slogan.',
      descriptionZh: '職場應用：一句式標語。',
      textEn: 'Write a catchy one-line slogan for a fashion brand to use on Instagram.',
      textZh: '請為一個時尚品牌寫一句吸引人的 Instagram 推廣標語。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-wfh-idea',
      titleEn: 'Content Idea: Stay Productive Working from Home',
      titleZh: '內容點子：在家工作如何保持效率',
      descriptionEn: 'Creative living: practical idea for content.',
      descriptionZh: '創意生活：可實踐的內容構想。',
      textEn: 'Give one content idea about how to stay productive when working from home. Include the key tips to cover.',
      textZh: '請提供一個內容創作點子，主題為「在家工作時如何保持效率」，並列出應涵蓋的重點貼士。',
      category: 'creative',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-user-journey-example',
      titleEn: 'Explain User Journey with an Example',
      titleZh: '用例子解釋用戶旅程（User Journey）',
      descriptionEn: 'Daily learning: simple example-based explanation.',
      descriptionZh: '日常學習：以例子簡單解釋。',
      textEn: 'Explain what a "user journey" is with a simple example from an e‑commerce store.',
      textZh: '請用一個網店的簡單例子，解釋什麼是「用戶旅程（User Journey）」。',
      category: 'daily',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-100w-summer-email',
      titleEn: '100-Word Summer Offer Email',
      titleZh: '100 字夏季優惠 Email 文案',
      descriptionEn: 'Workplace: concise promo email.',
      descriptionZh: '職場應用：簡潔的推廣電郵。',
      textEn: 'Write a 100‑word promotional email for a summer offer with a friendly tone and a clear call‑to‑action.',
      textZh: '請以友善語氣撰寫約 100 字的夏季優惠推廣電郵，包含明確的行動呼籲。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },

    // =========================
    // Level 1 (Beginner) - Business Professionals
    // =========================
    {
      id: 'b-beginner-meeting-opening',
      titleEn: '1-Minute Business Meeting Opening',
      titleZh: '商業會議 1 分鐘開場白',
      descriptionEn: 'Workplace: concise and professional opener.',
      descriptionZh: '職場應用：專業精簡的開場。',
      textEn: 'Draft a 1‑minute opening for a business meeting: greet, purpose, agenda bullets, and expected outcome.',
      textZh: '請撰寫一段約 1 分鐘的商業會議開場白：問候、目的、議程要點與期望成果。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-weekend-habit',
      titleEn: 'Weekend Wind-Down Habit Suggestion',
      titleZh: '週末放鬆小習慣建議',
      descriptionEn: 'Creative living: stress relief for busy professionals.',
      descriptionZh: '創意生活：紓壓點子，適合繁忙人士。',
      textEn: 'Suggest one simple weekend habit that helps busy professionals relax and reset. Include how-to steps.',
      textZh: '請提供一個簡單的週末放鬆小習慣建議，適合工作繁忙人士，並列出做法步驟。',
      category: 'creative',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-internal-talk-invite',
      titleEn: 'Internal Sharing Session Invite Email',
      titleZh: '內部分享會邀請 Email',
      descriptionEn: 'Workplace: polite invite to colleagues.',
      descriptionZh: '職場應用：禮貌邀請同事。',
      textEn: 'Write an email inviting colleagues to an internal sharing session. Include date/time, topic, speaker, and RSVP instruction.',
      textZh: '請撰寫一封邀請同事出席內部分享會的 email，包含日期時間、主題、講者，以及回覆出席的方法。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-explain-esg',
      titleEn: 'Explain ESG for Beginners',
      titleZh: '用簡單方式解釋 ESG',
      descriptionEn: 'Daily learning: simple definition and example.',
      descriptionZh: '日常學習：簡單定義加例子。',
      textEn: 'Explain what ESG means for a beginner and give one example of how a company practices it.',
      textZh: '請用容易明白的方式解釋 ESG 是什麼，並舉一個公司如何實踐的例子。',
      category: 'daily',
      level: 'beginner',
      userTags: ['商業專業人士']
    },

    // =========================
    // Level 1 (Beginner) - Creative Professionals
    // =========================
    {
      id: 'c-beginner-logo-nature',
      titleEn: 'Logo Concept with Nature Elements',
      titleZh: '結合自然元素的 Logo 靈感',
      descriptionEn: 'Creative living: provide one strong concept.',
      descriptionZh: '創意生活：提供一個有力概念。',
      textEn: 'Give one logo idea that combines nature elements with modern style. Describe shapes, colors, and usage mood.',
      textZh: '請提供一個結合自然元素與現代風格的 logo 構想，描述圖形、色彩與使用氛圍。',
      category: 'creative',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-3-steps-theme',
      titleEn: '3 Steps to Ideate a Creative Theme',
      titleZh: '3 步驟構思創作主題',
      descriptionEn: 'Daily learning: simple structured method.',
      descriptionZh: '日常學習：簡單結構化方法。',
      textEn: 'Teach me a 3-step method to ideate a creative theme, with a short example.',
      textZh: '請教我一個 3 個步驟的方式去構思創作主題，並附上一個簡短示例。',
      category: 'daily',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-3-video-ideas',
      titleEn: '3 Short-Video Content Ideas',
      titleZh: '3 個有趣的短影片內容點子',
      descriptionEn: 'Creative living: quick ideas for reels/shorts.',
      descriptionZh: '創意生活：適用於 Reels/Shorts 的快速點子。',
      textEn: 'Provide 3 interesting short‑video ideas (any theme). For each, include hook, scene outline, and CTA.',
      textZh: '請提供 3 個有趣的短影片內容點子（主題不限），每個包含開場引子、場景大綱與 CTA。',
      category: 'creative',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-brand-collab-email',
      titleEn: 'Brand Collaboration Proposal Email',
      titleZh: '品牌合作提案 Email',
      descriptionEn: 'Workplace: polite outreach with value.',
      descriptionZh: '職場應用：禮貌外展並強調價值。',
      textEn: 'Write an email to invite a brand for a collaboration proposal. Include the idea, value for the brand, and next step.',
      textZh: '請撰寫一封 email 邀請品牌合作提案，包含合作構想、對品牌的價值，以及下一步安排。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },

    // =========================
    // Level 1 (Beginner) - Marketing: additional set
    // =========================
    {
      id: 'm-beginner-ig-slogan-natural-skincare',
      titleEn: 'IG Ad Slogan for Natural Skincare',
      titleZh: 'Instagram 廣告標語：天然護膚品',
      descriptionEn: 'Workplace: one punchy line for IG ad.',
      descriptionZh: '職場應用：為 IG 廣告寫一句吸睛標語。',
      textEn: 'Write a catchy Instagram ad slogan for natural skincare [your product/brand]. Keep it 6–10 words and positive.',
      textZh: '為天然護膚品 [你的產品／品牌] 設計一句吸睛的 Instagram 廣告標語。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-fb-post-limited-offer',
      titleEn: 'Facebook Post for Limited-Time Offer',
      titleZh: 'Facebook 限時優惠貼文',
      descriptionEn: 'Workplace: promotional post copy.',
      descriptionZh: '職場應用：撰寫推廣貼文。',
      textEn: 'Draft a Facebook post to promote [your limited-time offer]. Include hook, key benefits, and clear call‑to‑action.',
      textZh: '撰寫一段 Facebook 貼文內容，推廣 [你的限時優惠]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-edm-new-product',
      titleEn: 'EDM Email Copy for New Product',
      titleZh: 'EDM 新產品電郵文案',
      descriptionEn: 'Workplace: email copy for launch.',
      descriptionZh: '職場應用：新產品 EDM 文案。',
      textEn: 'Write an email (EDM) promotional copy for [your new product]. Include subject line, preview text, body with benefits, and CTA button text.',
      textZh: '為 [你的新產品] 撰寫一封 EDM 電郵推廣文案，包含主旨、前導文字、重點內容與 CTA 按鈕文案。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-aida-copy',
      titleEn: 'AIDA Copy for Your Service',
      titleZh: 'AIDA 模型宣傳文案',
      descriptionEn: 'Workplace: AIDA framework version.',
      descriptionZh: '職場應用：用 AIDA 框架撰寫文案。',
      textEn: 'Use the AIDA model to write copy for [your service]: Attention hook, Interest (benefits), Desire (proof), Action (CTA).',
      textZh: '用 AIDA 模型撰寫 [你的服務] 的宣傳文案：吸引注意、引起興趣、激發慾望、行動呼籲。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-1week-content-calendar',
      titleEn: '1-Week Content Calendar',
      titleZh: '一週內容日曆',
      descriptionEn: 'Workplace: plan posts for a week.',
      descriptionZh: '職場應用：規劃一週內容。',
      textEn: 'Design a 1‑week content calendar for [your brand]: channel, topic, hook, visual idea, and CTA for each day.',
      textZh: '為 [你的品牌] 設計一個一週的內容日曆，列出每天的渠道、主題、引子、視覺構想與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-google-headline-tech',
      titleEn: 'Google Ad Headline for Tech Product',
      titleZh: 'Google 廣告標題：科技產品',
      descriptionEn: 'Workplace: concise PPC headline.',
      descriptionZh: '職場應用：PPC 簡潔標題。',
      textEn: 'Write a Google Ads headline to promote [your tech product]. Keep within character limits and be benefit‑led.',
      textZh: '撰寫一條 Google 廣告標題，推廣 [你的科技產品]，字數符合限制並以利益為導向。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-ig-reel-caption',
      titleEn: 'IG Reel Caption',
      titleZh: 'IG Reel 影片說明文字',
      descriptionEn: 'Workplace: click‑worthy caption.',
      descriptionZh: '職場應用：吸引點擊的 caption。',
      textEn: 'Write an engaging IG Reel caption for [your event/product] with a hook, 1–2 benefits, and CTA.',
      textZh: '撰寫一則吸引點擊的 IG Reel caption，主題是 [你的活動／產品]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-whatsapp-invite-event',
      titleEn: 'WhatsApp Invite Message for Event',
      titleZh: 'WhatsApp 活動邀請訊息',
      descriptionEn: 'Workplace: natural, friendly invite.',
      descriptionZh: '職場應用：自然親切的邀請。',
      textEn: 'Write a natural and friendly WhatsApp invitation for [your event]. Keep it short and human.',
      textZh: '為 [你的活動] 撰寫 WhatsApp 邀請訊息，語氣自然親切。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-youtube-shorts-desc',
      titleEn: 'YouTube Shorts Description: Brand Story',
      titleZh: 'YouTube Shorts 描述：品牌故事',
      descriptionEn: 'Workplace: short description with CTA.',
      descriptionZh: '職場應用：短描述與 CTA。',
      textEn: 'Write a YouTube Shorts description about [your brand story] with a single CTA and 3 suggested tags.',
      textZh: '撰寫一條 YouTube Shorts 的描述文字，內容關於 [你的品牌故事]，附一個 CTA 與 3 個建議標籤。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-co-branding-email-opener',
      titleEn: 'Co-branding Email Opener',
      titleZh: '品牌聯乘 Email 開場語',
      descriptionEn: 'Workplace: opening sentence for outreach.',
      descriptionZh: '職場應用：聯乘合作 email 開場。',
      textEn: 'Write an email opening line to invite [your prospective partner] for a co‑branding campaign. Keep it courteous and specific.',
      textZh: '設計一個品牌聯乘活動的 email 開場語，邀請 [你的合作對象]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-homepage-brand-intro',
      titleEn: 'Short Brand Intro for Homepage',
      titleZh: '網站首頁品牌簡介',
      descriptionEn: 'Workplace: concise brand paragraph.',
      descriptionZh: '職場應用：簡短品牌介紹。',
      textEn: 'Write a concise brand introduction for [your website homepage] in 2–3 sentences (UK English).',
      textZh: '寫一段簡短品牌介紹文案，用於 [你的網站首頁]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-survey-questions',
      titleEn: '3 Multiple-Choice Questions for Customer Survey',
      titleZh: '客戶問卷 3 條選擇題',
      descriptionEn: 'Workplace: simple MCQ survey items.',
      descriptionZh: '職場應用：簡單選擇題。',
      textEn: 'Write 3 multiple‑choice questions for [your customer survey], each with 4 options.',
      textZh: '為 [你的客戶問卷] 撰寫 3 條選擇題問題，每題 4 個選項。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-ig-caption-brand-values',
      titleEn: 'IG Caption about Brand Values',
      titleZh: 'IG caption：品牌價值介紹',
      descriptionEn: 'Workplace: short values statement.',
      descriptionZh: '職場應用：簡短價值宣言。',
      textEn: 'Write an Instagram caption introducing [your brand values] with a friendly voice and a soft CTA.',
      textZh: '撰寫一段介紹 [你的品牌價值] 的 IG caption，語氣親切自然。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-ad-slogan-feature-led',
      titleEn: 'Feature-led Advertising Slogan',
      titleZh: '產品特點主打廣告標語',
      descriptionEn: 'Workplace: one bold slogan.',
      descriptionZh: '職場應用：一句有力 slogan。',
      textEn: 'Create an advertising slogan focused on [your product feature]. Keep it bold and memorable.',
      textZh: '設計一條廣告 slogan，主打 [你的產品特點]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-kol-invite-email',
      titleEn: 'Invite Email to Brand KOL',
      titleZh: '邀請品牌 KOL 合作 Email',
      descriptionEn: 'Workplace: outreach email to KOL.',
      descriptionZh: '職場應用：KOL 外展電郵。',
      textEn: 'Write an email inviting [brand KOL] to collaborate. Include idea, expected deliverables, timeline and courtesy close.',
      textZh: '撰寫一封邀請 [品牌 KOL] 合作的電郵，包含構想、預期產出與時間安排。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-countdown-post',
      titleEn: 'Countdown Post for Launch',
      titleZh: '限時倒數貼文',
      descriptionEn: 'Workplace: countdown copy.',
      descriptionZh: '職場應用：新產品發布倒數。',
      textEn: 'Create a countdown post for [your new product launch] with day‑by‑day copy suggestions.',
      textZh: '設計一個限時倒數貼文，用於 [你的新產品發布]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-email-subject-lines',
      titleEn: '5 Subject Lines for Marketing Email',
      titleZh: '行銷 Email 主旨行（5 條）',
      descriptionEn: 'Workplace: subject ideas by audience.',
      descriptionZh: '職場應用：針對目標客群撰寫。',
      textEn: 'List 5 subject lines for [your audience] marketing email. Mix curiosity, benefit, urgency, and social proof styles.',
      textZh: '列出 5 條針對 [你的目標客群] 的行銷 email 主旨行，風格混合好奇、利益、急迫與口碑。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-event-scenic-slogan',
      titleEn: 'On-site Slogan for Brand Event',
      titleZh: '品牌活動現場布景口號',
      descriptionEn: 'Workplace: one-line scenic slogan.',
      descriptionZh: '職場應用：一句口號作現場布景。',
      textEn: 'Write a one‑line scenic slogan for [your brand event] to be used on-site visuals.',
      textZh: '為 [你的品牌活動] 設計一句現場布景口號。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-proposal-opening',
      titleEn: 'Opening for Collaboration Proposal',
      titleZh: '合作提案開場白',
      descriptionEn: 'Workplace: proposal opener paragraph.',
      descriptionZh: '職場應用：提案開場。',
      textEn: 'Write an opening paragraph for a proposal to [your target brand] that clearly states idea, value, and next step.',
      textZh: '撰寫一段合作提案開場白，用於向 [你的目標品牌] 展示想法。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    {
      id: 'm-beginner-analytics-cover-slide',
      titleEn: 'Cover Slide for Social Analytics Report',
      titleZh: '社群平台分析報告封面',
      descriptionEn: 'Workplace: title and visual direction.',
      descriptionZh: '職場應用：主題與視覺指引。',
      textEn: 'Design the cover slide copy for a social analytics report themed [your account performance], with title, subtitle, date and visual direction.',
      textZh: '設計一份社群平台分析報告的簡報封面，主題是 [你的社交帳號成效]，包含標題、副標、日期與視覺方向。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['市場營銷']
    },
    // =========================
    // Level 1 (Beginner) - Business Professionals: additional set
    // =========================
    {
      id: 'b-beginner-invite-to-event',
      titleEn: 'Formal Invite Email to Meeting/Event',
      titleZh: '正式邀請出席會議／活動 Email',
      descriptionEn: 'Workplace: formal RSVP invite.',
      descriptionZh: '職場應用：正式邀請與回覆方式。',
      textEn: 'Write a formal email inviting recipients to [your meeting/event name], including agenda highlight and RSVP instructions.',
      textZh: '撰寫一封正式 email，邀請參加 [你的會議／活動名稱]，並附上重點議程與回覆方式。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-opening-company-update',
      titleEn: 'Meeting Opening with Company Update',
      titleZh: '會議開場白：公司近況',
      descriptionEn: 'Workplace: concise opener with updates.',
      descriptionZh: '職場應用：簡短介紹近況與部門重點。',
      textEn: 'Draft an opening to introduce [your company current status/department focus] in a meeting, in under 60 seconds.',
      textZh: '撰寫一段會議開場白，介紹 [你的公司近況／部門重點]，時間約 60 秒內。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-followup-email',
      titleEn: 'Follow‑up Email after Meeting',
      titleZh: '會後跟進 Email',
      descriptionEn: 'Workplace: recap and next steps.',
      descriptionZh: '職場應用：摘要重點與下一步。',
      textEn: 'Write a follow‑up email summarising [your meeting highlights/partnership items] and proposing the next steps.',
      textZh: '撰寫一封 follow‑up email，跟進 [你的會議重點／合作事項]，並提出下一步建議。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-elevator-pitch-60s',
      titleEn: '60‑Second Elevator Pitch',
      titleZh: '60 秒電梯簡報',
      descriptionEn: 'Workplace: self‑intro with value.',
      descriptionZh: '職場應用：自我介紹與價值主張。',
      textEn: 'Write a 60‑second elevator pitch introducing [your role and services] with value proposition and CTA.',
      textZh: '撰寫一段 60 秒 elevator pitch，自我介紹 [你的職位與服務]，並提出價值主張與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-linkedin-about',
      titleEn: 'LinkedIn About Summary',
      titleZh: 'LinkedIn 自我介紹',
      descriptionEn: 'Workplace: background, strengths, goals.',
      descriptionZh: '職場應用：背景、強項與目標。',
      textEn: 'Write a LinkedIn About section covering [your professional background], strengths and goals in 3–4 sentences.',
      textZh: '撰寫一則 LinkedIn 自我介紹，內容包括 [你的專業背景]、強項與目標（3–4 句）。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-internal-email-team-update',
      titleEn: 'Internal Email: Team Update',
      titleZh: '內部 Email：團隊調整通知',
      descriptionEn: 'Workplace: clear internal comms.',
      descriptionZh: '職場應用：清楚內部溝通。',
      textEn: 'Write an internal email informing colleagues about [your team changes], with rationale and effective date.',
      textZh: '撰寫一封 internal email，通知同事有關 [你的團隊調整]，包含原因與生效日期。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-customer-reply',
      titleEn: 'Reply to Customer Enquiry',
      titleZh: '回覆客戶查詢 Email',
      descriptionEn: 'Workplace: polite, helpful reply.',
      descriptionZh: '職場應用：禮貌而有幫助的回覆。',
      textEn: 'Write an email replying to a customer question about [your product/service issue], offering solution and next steps.',
      textZh: '撰寫一封回覆客戶查詢的 email，主題是 [你的產品／服務問題]，提供解決方案與下一步。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-kpi-monthly-summary',
      titleEn: 'KPI Monthly Summary (Short)',
      titleZh: 'KPI 月報簡短摘要',
      descriptionEn: 'Workplace: brief KPI update.',
      descriptionZh: '職場應用：簡要 KPI 更新。',
      textEn: 'Write a short KPI monthly summary for [your manager briefing], highlighting 3 key numbers and one action.',
      textZh: '撰寫一段簡短的 KPI 月報摘要，用於 [你的主管簡報]，點出 3 個關鍵數字與一項行動。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-zoom-agenda',
      titleEn: 'Zoom Meeting Agenda',
      titleZh: 'Zoom 視像會議議程',
      descriptionEn: 'Workplace: agenda structure.',
      descriptionZh: '職場應用：議程結構。',
      textEn: 'Design a Zoom meeting agenda for [your discussion items], including timings and roles.',
      textZh: '設計一份 Zoom 視像會議議程，主題為 [你的討論項目]，包含時間與角色分配。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-company-intro-100w',
      titleEn: '100‑Word Company Introduction',
      titleZh: '100 字公司簡介',
      descriptionEn: 'Workplace: concise company intro.',
      descriptionZh: '職場應用：精簡介紹公司。',
      textEn: 'Write a company introduction under 100 words to present [your business scope].',
      textZh: '撰寫一段公司簡介，不超過 100 字，介紹 [你的業務範疇]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-invite-partner-expo',
      titleEn: 'Invite Partner to Exhibition',
      titleZh: '邀請合作夥伴參展 Email',
      descriptionEn: 'Workplace: friendly formal invite.',
      descriptionZh: '職場應用：友善而正式的邀請。',
      textEn: 'Write an email inviting [your partner] to join an exhibition together, stating benefits and logistics.',
      textZh: '撰寫一封 email，邀請 [你的合作夥伴] 一同參加展覽，說明好處與安排。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-quotation-email',
      titleEn: 'Quotation Email for Services',
      titleZh: '服務報價單 Email',
      descriptionEn: 'Workplace: price proposal.',
      descriptionZh: '職場應用：提出價格建議。',
      textEn: 'Write a quotation email providing prices for [your services/solutions], with scope, validity and next steps.',
      textZh: '撰寫一份報價單 email，提供 [你的服務／方案] 價格建議，列出範圍、有效期與下一步。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-thanks-note',
      titleEn: 'Thank‑You Note to Colleague/Partner',
      titleZh: '感謝同事／合作夥伴的謝函',
      descriptionEn: 'Workplace: concise appreciation note.',
      descriptionZh: '職場應用：簡短致謝內容。',
      textEn: 'Write a short appreciation message to thank [your colleague/partner] for their support on [matter].',
      textZh: '撰寫一段感謝信，感謝 [你的同事／合作夥伴] 的支持，並指出具體事項。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-finance-update',
      titleEn: 'Brief Financial Status Update',
      titleZh: '財務狀況更新（簡短）',
      descriptionEn: 'Workplace: internal finance digest.',
      descriptionZh: '職場應用：內部簡報用摘要。',
      textEn: 'Write a short internal update on financial status suitable for team sharing, focusing on 3 key points.',
      textZh: '撰寫一段簡短的財務狀況更新摘要，適合內部分享，聚焦三個重點。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-internal-notice-process',
      titleEn: 'Internal Notice: New Process/Policy',
      titleZh: '內部通告：新流程／政策',
      descriptionEn: 'Workplace: clear and actionable notice.',
      descriptionZh: '職場應用：清晰可行的內部通告。',
      textEn: 'Write an internal notice informing colleagues about [your new process/policy], including when it takes effect and whom to contact.',
      textZh: '撰寫一段內部通告，通知同事 [你的新流程／政策]，標明生效日期與聯絡人。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-invite-prospect-briefing',
      titleEn: 'Invite Prospects to Briefing/Consultation',
      titleZh: '邀請潛在客戶出席簡報／諮詢日',
      descriptionEn: 'Workplace: outreach invite.',
      descriptionZh: '職場應用：對外邀請。',
      textEn: 'Write an invite email asking prospects to attend [your briefing/consultation day], with agenda and CTA.',
      textZh: '撰寫一封邀請 email，邀請潛在客戶出席 [你的簡報會／諮詢日]，附上議程與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-negotiation-openers',
      titleEn: '3 Negotiation Opening Lines',
      titleZh: '談判開場說話（3 條）',
      descriptionEn: 'Workplace: polite collaborative tone.',
      descriptionZh: '職場應用：禮貌合作的語氣。',
      textEn: 'List 3 opening lines suitable for [your business negotiation] that set a cooperative and professional tone.',
      textZh: '列出 3 條適用於 [你的業務洽談] 的談判開場說話，語氣專業而合作。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-b2b-proposal',
      titleEn: 'B2B Partnership Proposal Summary',
      titleZh: 'B2B 業務合作建議',
      descriptionEn: 'Workplace: concise proposal points.',
      descriptionZh: '職場應用：精簡提案重點。',
      textEn: 'Draft a short business partnership proposal aimed at [potential B2B partner], listing idea, value, and next step.',
      textZh: '撰寫一段業務合作建議內容，目標對象為 [潛在 B2B 夥伴]，列出構想、價值與下一步。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-cross-dept-coordination',
      titleEn: 'Email to Coordinate Cross‑Department Project',
      titleZh: '跨部門專案協調 Email',
      descriptionEn: 'Workplace: clear responsibilities and timeline.',
      descriptionZh: '職場應用：清晰職責與時間表。',
      textEn: 'Write an email to coordinate [cross‑department project/collaboration], defining responsibilities, timeline and next check‑in.',
      textZh: '撰寫一封 email，協調 [跨部門專案／協作事項]，明確職責、時間表與下次跟進。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-weekly-huddle-opener',
      titleEn: 'Weekly Team Huddle Opener',
      titleZh: '團隊週會開場語',
      descriptionEn: 'Workplace: short motivating opener.',
      descriptionZh: '職場應用：簡短激勵開場。',
      textEn: 'Write a short opening to energise [your team] at the weekly huddle with a focus for the week.',
      textZh: '設計一段團隊週會的開場語，用來激勵 [你的團隊]，並提出本週焦點。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },

    // =========================
    // Level 1 (Beginner) - Creative Professionals: additional set
    // =========================
    {
      id: 'c-beginner-email-invite-dream-brand',
      titleEn: 'Invite Dream Brand to Co‑design',
      titleZh: '邀請夢想品牌參與聯名設計 Email',
      descriptionEn: 'Workplace: polite collaboration invite.',
      descriptionZh: '職場應用：禮貌的合作邀請。',
      textEn: 'Write an email inviting [your dream brand] to join a co‑design project. State concept, mutual value, and next step.',
      textZh: '撰寫一封 email，邀請 [你的夢想品牌] 參與聯名設計項目，說明概念、雙方價值與下一步。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-exhibition-slogan',
      titleEn: 'Exhibition Theme Slogan',
      titleZh: '展覽主題 slogan',
      descriptionEn: 'Workplace: one-line themed slogan.',
      descriptionZh: '職場應用：一句主題口號。',
      textEn: 'Write a one‑line slogan for an exhibition themed [your artistic concept].',
      textZh: '撰寫一句展覽主題 slogan，主題為 [你的藝術理念]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-100w-work-description',
      titleEn: '100‑Word Work Description (Competition)',
      titleZh: '100 字作品簡介（比賽）',
      descriptionEn: 'Workplace: concise entry description.',
      descriptionZh: '職場應用：投稿用簡介。',
      textEn: 'Write a 100‑word description of your work for [design competition submission].',
      textZh: '撰寫一段 100 字的作品簡介，用於 [你的設計比賽投稿]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-portfolio-home-intro',
      titleEn: 'Portfolio Homepage Self‑intro',
      titleZh: 'Portfolio 網站首頁自我介紹',
      descriptionEn: 'Workplace: short home intro.',
      descriptionZh: '職場應用：首頁簡介。',
      textEn: 'Write a brief self‑introduction for [your portfolio website] homepage, tone professional and personable.',
      textZh: '撰寫一段自我介紹，用於 [你的 portfolio 網站] 首頁，語氣專業而親切。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-email-pitch-creative-service',
      titleEn: 'Email to Pitch Photography/Design Service',
      titleZh: '向潛在客戶推介攝影／設計服務 Email',
      descriptionEn: 'Workplace: concise pitch email.',
      descriptionZh: '職場應用：簡潔服務推介。',
      textEn: 'Write an email to recommend your photography or design service to [your potential client], including portfolio link and CTA.',
      textZh: '撰寫一封 email，向 [你的潛在客戶] 推介攝影或設計服務，附上作品連結與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-ig-caption-inspiration',
      titleEn: 'IG Caption about Design Inspiration',
      titleZh: 'Instagram caption：設計靈感',
      descriptionEn: 'Workplace: reflective caption.',
      descriptionZh: '職場應用：分享靈感的貼文說明。',
      textEn: 'Write an Instagram caption about [your design inspiration], with 1–2 reflective lines and a soft CTA.',
      textZh: '撰寫一段關於 [你的設計靈感] 的 Instagram caption，加入 1–2 句反思與柔和 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-newsletter-opening',
      titleEn: 'Newsletter Opening for New Work/Show',
      titleZh: 'Newsletter 開場白（新作／展覽）',
      descriptionEn: 'Workplace: engaging newsletter intro.',
      descriptionZh: '職場應用：吸引人的電子報開場。',
      textEn: 'Write a newsletter opening to promote [your new work/exhibition], with a friendly UK English tone.',
      textZh: '撰寫一段 newsletter 開場白，用於推廣 [你的新作／展覽]，語氣友善。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-reply-revision-request',
      titleEn: 'Reply Email to Revision Request',
      titleZh: '回覆作品修訂請求 Email',
      descriptionEn: 'Workplace: polite and clear response.',
      descriptionZh: '職場應用：禮貌而清晰的回覆。',
      textEn: 'Write a polite email replying to [your client] regarding a revision request, confirming scope and timeline.',
      textZh: '撰寫一封回覆客戶的 email，回應 [你的作品修訂請求]，確認範圍與時間表。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-proposal-titles',
      titleEn: 'Three Proposal Titles for Your Concept',
      titleZh: '三個設計提案標題',
      descriptionEn: 'Workplace: title options for deck.',
      descriptionZh: '職場應用：簡報可用標題。',
      textEn: 'List three proposal titles suitable for presenting [your concept style].',
      textZh: '列出三個設計提案標題，適合呈現 [你的概念風格]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-email-self-recommend',
      titleEn: 'Self‑recommendation Email to Creative Lead',
      titleZh: '自薦參與設計合作 Email',
      descriptionEn: 'Workplace: concise value and ask.',
      descriptionZh: '職場應用：簡潔陳述價值與請求。',
      textEn: 'Write an email to [art director/brand manager] to self‑recommend for collaboration, highlighting fit and next step.',
      textZh: '撰寫一封 email，向 [藝術總監／品牌經理] 自薦參與設計合作，強調匹配度與下一步。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-ux-interview-opening',
      titleEn: 'UX Interview Opening Script',
      titleZh: 'UX 訪談開場稿',
      descriptionEn: 'Workplace: warm start and consent.',
      descriptionZh: '職場應用：溫暖開場與同意程序。',
      textEn: 'Write an opening script for [your product user interview] including welcome, consent note, and outline.',
      textZh: '撰寫一段 UX 訪談開場稿，用於 [你的產品用戶訪問]，包含歡迎、同意程序與流程大綱。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-open-presentation-process',
      titleEn: 'Opening Script: Introduce Creative Process',
      titleZh: '開場簡報稿：創作流程介紹',
      descriptionEn: 'Workplace: short presentation opener.',
      descriptionZh: '職場應用：簡報開場稿。',
      textEn: 'Write a short opening to introduce [your creative process] in a presentation.',
      textZh: '撰寫一段開場簡報稿，介紹 [你的創作流程]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-visual-plan-pitch',
      titleEn: 'Pitch Paragraph for Visual Plan',
      titleZh: '視覺企劃提案段落',
      descriptionEn: 'Workplace: short pitch.',
      descriptionZh: '職場應用：精簡推介段落。',
      textEn: 'Write a short pitch paragraph to present [your visual plan] to a potential client.',
      textZh: '撰寫一段 pitch 內容，推介 [你的視覺企劃] 給潛在客戶。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-quotation-freelance',
      titleEn: 'Quotation Content for Freelance Services',
      titleZh: '自由工作服務報價內容',
      descriptionEn: 'Workplace: clear scope and pricing.',
      descriptionZh: '職場應用：清楚範圍與價格。',
      textEn: 'Write quotation content for [your freelance service quote], including scope, deliverables, timeline and price.',
      textZh: '撰寫一段報價內容，用於 [你的自由工作服務報價單]，包含範圍、產出、時間與價格。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-caption-abstract-photo',
      titleEn: 'Caption for Abstract Photography',
      titleZh: '抽象攝影作品 caption',
      descriptionEn: 'Workplace: short art caption.',
      descriptionZh: '職場應用：簡短藝術說明。',
      textEn: 'Write a caption introducing [your abstract photography work], describing theme and feeling in 1–2 lines.',
      textZh: '撰寫一段 caption，介紹 [你的抽象攝影作品]，以 1–2 句描述主題與感受。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-logo-brief-form',
      titleEn: 'Logo Concept Brief Form',
      titleZh: 'Logo 概念表單',
      descriptionEn: 'Workplace: capture creative elements.',
      descriptionZh: '職場應用：記錄創意元素。',
      textEn: 'Design a logo concept brief form to record [your creative elements], including shapes, colours, references and usage.',
      textZh: '設計一份 logo 概念表單，用來記錄 [你的創意元素]，包含圖形、色彩、參考與用法。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-artist-statement-competition',
      titleEn: 'Artist Statement for Competition',
      titleZh: '創作理念說明（比賽）',
      descriptionEn: 'Workplace: concise statement.',
      descriptionZh: '職場應用：簡潔理念說明。',
      textEn: 'Write an artist statement describing [your creative concept] for [art competition submission].',
      textZh: '撰寫一段創作理念說明，用於提交 [你的藝術比賽作品]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-exhibition-invite',
      titleEn: 'Exhibition Invite Copy',
      titleZh: '展覽邀請文',
      descriptionEn: 'Workplace: invite audiences to show.',
      descriptionZh: '職場應用：邀請觀眾參觀展覽。',
      textEn: 'Write an invitation copy for audiences to visit [your exhibition], with date, venue and CTA.',
      textZh: '撰寫一段展覽邀請文，用於邀請觀眾參觀 [你的作品展]，附上日期、地點與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    {
      id: 'c-beginner-social-post-collab-series',
      titleEn: 'Social Post for Co‑branded/Limited Series',
      titleZh: '聯名系列／限量設計社交貼文',
      descriptionEn: 'Workplace: promo post.',
      descriptionZh: '職場應用：推廣貼文。',
      textEn: 'Write a social post to promote [your co‑branded/limited series], with hook, highlight and CTA.',
      textZh: '撰寫一段社交貼文，用來推廣 [你的聯名系列／限量設計]，包含引子、亮點與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    // =========================
    // Level 1 (Beginner) - Parents
    // =========================
    {
      id: 'p-beginner-email-teacher-enquiry',
      titleEn: "Email to Teacher about Child's Homework/Progress",
      titleZh: '致老師電郵：查詢小朋友功課／表現',
      descriptionEn: 'Workplace: polite parent enquiry.',
      descriptionZh: '職場應用：家長禮貌查詢。',
      textEn: "Write an email to the class teacher asking about [your child's homework/progress], keeping tone respectful and concise.",
      textZh: '撰寫一封 email，向學校老師查詢 [你的小朋友的功課／表現]，語氣尊重而簡潔。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-thank-you-teacher',
      titleEn: 'Thank‑You Letter to School/Tutor',
      titleZh: '致學校／補習老師感謝信',
      descriptionEn: 'Workplace: caring thank‑you letter.',
      descriptionZh: '職場應用：表達支持與關心。',
      textEn: "Write a thank‑you letter to [school/tutor] expressing appreciation and support for your child's learning.",
      textZh: '撰寫一封感謝信，致 [學校／補習老師] 表達支持和關心。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-weekly-timetable',
      titleEn: "Child's Weekly Timetable (Study & Rest)",
      titleZh: '小朋友一週時間表（學習與休息）',
      descriptionEn: 'Workplace: balanced weekly plan.',
      descriptionZh: '職場應用：均衡的一週時間表。',
      textEn: 'Create a one‑week timetable for [your child], balancing study and rest time each day.',
      textZh: '為 [你的小朋友] 安排一週時間表，包括學習與休息時間。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-email-leave',
      titleEn: "Email to Explain Child's Leave",
      titleZh: '致老師電郵：解釋請假原因',
      descriptionEn: 'Workplace: brief leave explanation.',
      descriptionZh: '職場應用：簡短請假說明。',
      textEn: "Write an email to the teacher explaining [your child's leave reason] and expected return date.",
      textZh: '撰寫一封電郵向老師解釋 [你的小朋友請假原因]，並說明預計回校日期。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-encourage-exam-stress',
      titleEn: 'Encouraging Note for Exam Stress',
      titleZh: '面對測驗壓力的鼓勵文字',
      descriptionEn: 'Workplace: supportive short text.',
      descriptionZh: '職場應用：簡短支持文字。',
      textEn: 'Write a short encouraging message to help [your child] cope with exam stress.',
      textZh: '撰寫一段鼓勵語句，幫助 [你的小朋友] 面對測驗壓力。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-self-intro-parent-meeting',
      titleEn: 'Parent Self‑intro for School Meeting',
      titleZh: '學校面談自我介紹（家長）',
      descriptionEn: 'Workplace: short meeting intro.',
      descriptionZh: '職場應用：會談可用自我介紹。',
      textEn: 'Write a self‑introduction for a school meeting about [your family background], 3–4 sentences.',
      textZh: '撰寫一段學校面談時可用的自我介紹，關於 [你的家庭背景]（3–4 句）。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-learning-log',
      titleEn: 'Short Learning Log (Parent)',
      titleZh: '家長學習記錄（簡短）',
      descriptionEn: 'Workplace: short daily record.',
      descriptionZh: '職場應用：家課簿／日報告用。',
      textEn: "Write a short learning log for [homework book/Parents' Day report] noting effort and progress.",
      textZh: '撰寫一段簡短的學習記錄，用於 [家課簿／家長日報告]，註明努力與進度。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-invite-graduation',
      titleEn: "Invitation to Child's Graduation",
      titleZh: '畢業禮邀請函',
      descriptionEn: 'Workplace: family invitation.',
      descriptionZh: '職場應用：邀請親友出席。',
      textEn: "Write an invitation letter inviting [relatives/friends] to your child's graduation ceremony.",
      textZh: '撰寫一封邀請函，邀請 [親戚／朋友] 出席子女的畢業禮。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-encourage-reading-habit',
      titleEn: 'Encourage Reading Habit',
      titleZh: '鼓勵培養閱讀習慣',
      descriptionEn: 'Workplace: supportive guidance.',
      descriptionZh: '職場應用：提供鼓勵方法。',
      textEn: 'Suggest ways to encourage [your child] to build a reading habit at home.',
      textZh: '撰寫一段內容，建議如何鼓勵 [你的小朋友] 培養閱讀習慣。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-parent-child-activity-note',
      titleEn: 'Parent‑Child Activity Notice (Weekend Outdoor)',
      titleZh: '親子活動通知書（週末戶外）',
      descriptionEn: 'Workplace: notice sheet.',
      descriptionZh: '職場應用：活動通知書。',
      textEn: 'Design a notice for a parent‑child activity themed [weekend outdoor experience] with time, location and things to bring.',
      textZh: '設計一張親子活動的通知書，主題是 [週末戶外體驗]，包含時間、地點及攜帶物品。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-class-performance-brief',
      titleEn: "Brief on Child's Class Performance",
      titleZh: '興趣班表現簡介',
      descriptionEn: 'Workplace: short performance note.',
      descriptionZh: '職場應用：簡短表現說明。',
      textEn: 'Write a brief introduction about [your child] and their performance in an interest class.',
      textZh: '撰寫一段簡介，介紹 [你的小朋友] 參加興趣班的表現。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-birthday-thanks-post',
      titleEn: 'Birthday Thank‑You Post for Child',
      titleZh: '小朋友生日感謝貼文',
      descriptionEn: 'Workplace: family social post.',
      descriptionZh: '職場應用：家庭社群貼文。',
      textEn: "Write a birthday thank‑you message to post on [family group/Facebook] for your child's birthday.",
      textZh: '撰寫一段小朋友生日時的感謝文，發佈在 [家庭群組／Facebook]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-remind-parents-activity-items',
      titleEn: 'Reminder to Parents about Activity Items',
      titleZh: '提醒家長準備活動用品',
      descriptionEn: 'Workplace: short reminder text.',
      descriptionZh: '職場應用：簡短提醒。',
      textEn: 'Write a short message reminding [other parents] to prepare items for a school activity.',
      textZh: '撰寫一段簡訊，提醒 [其他家長] 準備學校活動用品。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-letter-course-feedback',
      titleEn: 'Letter to School: Course Arrangement Suggestion',
      titleZh: '致學校建議信：課程安排',
      descriptionEn: 'Workplace: constructive suggestion letter.',
      descriptionZh: '職場應用：具建設性的建議信。',
      textEn: 'Write a letter to the school reflecting [your suggestion about course arrangement] in a constructive tone.',
      textZh: '撰寫一封信給學校，反映 [你對課程安排的建議]，語氣建設性。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-tutor-reminder',
      titleEn: 'Reminder for Home Tutor Lesson Time',
      titleZh: '提醒家中補習老師上堂時間',
      descriptionEn: 'Workplace: polite reminder.',
      descriptionZh: '職場應用：禮貌提醒。',
      textEn: 'Write a short message reminding the home tutor of the upcoming lesson time.',
      textZh: '撰寫一段提醒家中補習老師上堂時間的訊息。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-home-learning-progress',
      titleEn: 'Record of Home Learning Progress',
      titleZh: '在家學習進度記錄',
      descriptionEn: 'Workplace: brief progress note.',
      descriptionZh: '職場應用：簡短進度紀錄。',
      textEn: "Write a short note recording [your child's] learning progress at home.",
      textZh: '撰寫一段內容，記錄 [你的小朋友] 在家學習進度。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-email-cca-enquiry',
      titleEn: 'Email Enquiry about Extracurricular Activities',
      titleZh: '查詢課外活動報名詳情 Email',
      descriptionEn: 'Workplace: clear enquiry email.',
      descriptionZh: '職場應用：清晰詢問電郵。',
      textEn: 'Write an email asking about the enrolment details for [school extracurricular activity].',
      textZh: '撰寫一封 email，詢問 [學校課外活動] 的報名詳情。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },
    {
      id: 'p-beginner-exam-motivation-note',
      titleEn: 'Encouragement Note before Exams',
      titleZh: '考試前鼓勵文字',
      descriptionEn: 'Workplace: motivational message.',
      descriptionZh: '職場應用：考前打氣文字。',
      textEn: 'Write a short motivational message for [your child] before exams.',
      textZh: '撰寫一段鼓勵文字，給 [你的小朋友] 作為考試前動力。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['家長']
    },

    // =========================
    // Level 1 (Beginner) - Freelancers
    // =========================
    {
      id: 'f-beginner-email-service-intro',
      titleEn: 'Email to Pitch Freelance Services',
      titleZh: '向潛在客戶推介自由工作服務 Email',
      descriptionEn: 'Workplace: concise pitch.',
      descriptionZh: '職場應用：精簡推介。',
      textEn: 'Write an email to introduce your freelance services to [potential client], including offer, proof and CTA.',
      textZh: '撰寫一封 email，向 [潛在客戶] 推介你的自由工作服務，包含內容、證據與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-bio-skills',
      titleEn: 'Short Bio with Skills',
      titleZh: '個人簡介與專業技能',
      descriptionEn: 'Workplace: intro paragraph.',
      descriptionZh: '職場應用：簡短介紹。',
      textEn: 'Write a short introduction about [yourself] and [your professional skills] for a proposal or profile.',
      textZh: '撰寫一段簡介，介紹 [你自己] 和 [你的專業技能]，可用於提案或個人檔案。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-quote-reply',
      titleEn: 'Reply Email with Quotation',
      titleZh: '回覆報價 Email',
      descriptionEn: 'Workplace: price response.',
      descriptionZh: '職場應用：回覆報價。',
      textEn: 'Write a reply email quoting for [your design/consulting services], outlining scope, price and timeline.',
      textZh: '撰寫一封回覆 email，報價 [你的設計／顧問服務]，列出範圍、價格與時間表。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-collab-suggestion',
      titleEn: 'Collaboration Suggestion to Brand/Company',
      titleZh: '向品牌／公司提出合作建議',
      descriptionEn: 'Workplace: concise idea note.',
      descriptionZh: '職場應用：簡潔合作構思。',
      textEn: 'Write a short collaboration suggestion proposing an idea to [brand/company].',
      textZh: '撰寫一段合作建議內容，提出與 [品牌／公司] 的合作構思。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-quote-template',
      titleEn: 'Quotation Template for Project Type',
      titleZh: '報價單範本（專案類型）',
      descriptionEn: 'Workplace: reusable quote template.',
      descriptionZh: '職場應用：可重用的報價單。',
      textEn: 'Design a quotation template for [your project type], including sections for scope, timeline, deliverables and price.',
      textZh: '設計一份報價單範本，用於 [你的專案類型]，包含範圍、時程、交付與價格。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-whatsapp-intro',
      titleEn: 'WhatsApp Opening Message to New Client',
      titleZh: 'WhatsApp 開場訊息（新客戶）',
      descriptionEn: 'Workplace: friendly opener.',
      descriptionZh: '職場應用：友善開場白。',
      textEn: 'Write a WhatsApp opening message introducing [yourself] to a new client. Keep it warm and professional.',
      textZh: '撰寫一段 WhatsApp 開場訊息，介紹 [你自己] 給新客戶，語氣溫暖專業。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-project-closing-summary',
      titleEn: 'Project Closing Summary',
      titleZh: '結案報告總結',
      descriptionEn: 'Workplace: outcomes and learning.',
      descriptionZh: '職場應用：成果與學習點。',
      textEn: 'Write a closing summary about [your project outcomes], including highlights and lessons.',
      textZh: '撰寫一段結案報告總結，內容關於 [你的項目成果]，包含亮點與學習。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-ig-caption-recent-project',
      titleEn: 'Instagram Caption for Recent Project',
      titleZh: 'Instagram caption：最近完成的項目',
      descriptionEn: 'Workplace: social showcase.',
      descriptionZh: '職場應用：社群展示。',
      textEn: 'Write an Instagram caption introducing [your recently completed project] with key results and CTA.',
      textZh: '撰寫一段 Instagram caption，介紹 [你最近完成的項目]，包含成果與 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-caption-workshop-course',
      titleEn: 'Caption to Promote Workshop/Online Course',
      titleZh: '推廣工作坊／線上課程 caption',
      descriptionEn: 'Workplace: promo caption.',
      descriptionZh: '職場應用：推廣用說明文字。',
      textEn: 'Write a caption promoting [your workshop/online course] with clear benefits and sign‑up CTA.',
      textZh: '撰寫一段 caption，推廣 [你的工作坊／線上課程]，凸顯好處與報名 CTA。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-payment-reminder',
      titleEn: 'Payment Reminder Email',
      titleZh: '提醒客戶付款 Email',
      descriptionEn: 'Workplace: polite reminder.',
      descriptionZh: '職場應用：禮貌提醒。',
      textEn: 'Write a polite reminder email about payment for [your client], including invoice reference and due date.',
      textZh: '撰寫一封提醒 email，提醒 [你的客戶] 項目付款事項，附上發票編號與到期日。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-faq-service',
      titleEn: 'FAQ for Your Services',
      titleZh: '服務常見問題（FAQ）',
      descriptionEn: 'Workplace: concise Q&A list.',
      descriptionZh: '職場應用：精簡問答列表。',
      textEn: 'Write a brief FAQ to answer common questions about [your services].',
      textZh: '撰寫一段 FAQ，解答 [你提供的服務] 常見問題。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-process-description',
      titleEn: 'Describe Your Design/Work Process',
      titleZh: '描述設計／工作方式',
      descriptionEn: 'Workplace: clear process note.',
      descriptionZh: '職場應用：清晰說明流程。',
      textEn: 'Write a short description of [your design process/working method] for clients.',
      textZh: '撰寫一段內容，描述 [你的設計流程／工作方式]，作為客戶參考。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-confirmation-email',
      titleEn: 'Project Confirmation Email',
      titleZh: '合作確認 Email',
      descriptionEn: 'Workplace: confirm scope & delivery.',
      descriptionZh: '職場應用：確認範圍與交付。',
      textEn: 'Write a confirmation email including [scope and delivery time] for a project.',
      textZh: '撰寫一封合作確認 email，內容包括 [工作範圍及交付時間]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-first-video-call-opening',
      titleEn: 'Opening for First Video Call with New Client',
      titleZh: '第一次視像會議開場白',
      descriptionEn: 'Workplace: warm and professional.',
      descriptionZh: '職場應用：溫暖專業的開場。',
      textEn: 'Write an opening for the first video call with [new client], setting agenda and tone.',
      textZh: '撰寫一段開場白，用於與 [新客戶] 第一次視像會議，並訂立議程與語氣。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-portfolio-summary',
      titleEn: 'Portfolio Summary Intro',
      titleZh: '作品集簡介',
      descriptionEn: 'Workplace: showcase highlights.',
      descriptionZh: '職場應用：展示重點。',
      textEn: 'Write a short portfolio summary showcasing [your capabilities and style].',
      textZh: '撰寫一段作品集簡介，展示 [你的能力與風格]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-followup-quote-contract',
      titleEn: 'Follow‑up Email about Quote/Contract',
      titleZh: '跟進報價／合約 Email',
      descriptionEn: 'Workplace: polite follow‑up.',
      descriptionZh: '職場應用：禮貌跟進。',
      textEn: 'Write a follow‑up email asking about the progress of [quotation/contract].',
      textZh: '撰寫一封 follow‑up email，詢問 [報價／合約] 進度。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-linkedin-about-freelance',
      titleEn: 'LinkedIn About for Freelance Field',
      titleZh: 'LinkedIn 自我介紹（自由接案）',
      descriptionEn: 'Workplace: tailored About section.',
      descriptionZh: '職場應用：針對自由接案領域。',
      textEn: 'Write a LinkedIn About section tailored to [your freelance field], highlighting positioning and clients.',
      textZh: '撰寫一段 LinkedIn 自我介紹，針對 [自由接案領域]，強調定位與客戶。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-instagram-bio',
      titleEn: 'Instagram Bio for Personal Brand',
      titleZh: 'Instagram 個人品牌 Bio',
      descriptionEn: 'Workplace: clear one‑line bio.',
      descriptionZh: '職場應用：清楚一句式 Bio。',
      textEn: 'Write an Instagram bio suitable for promoting [your personal brand].',
      textZh: '撰寫一段 Instagram bio，適合推廣 [你個人品牌]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-caption-thanks',
      titleEn: 'Caption to Thank Client/Partner',
      titleZh: '感謝客戶／合作夥伴 caption',
      descriptionEn: 'Workplace: appreciation caption.',
      descriptionZh: '職場應用：致謝貼文說明。',
      textEn: 'Write a caption thanking [your client/partner] for support, tagging appropriately.',
      textZh: '撰寫一段 caption，感謝 [你的客戶／合作夥伴]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    {
      id: 'f-beginner-review-response',
      titleEn: 'Response to Reviews on Platform/Google',
      titleZh: '回應平台／Google 評論',
      descriptionEn: 'Workplace: professional reply.',
      descriptionZh: '職場應用：專業回覆。',
      textEn: 'Write a professional response to a review on [your portfolio platform/Google Reviews].',
      textZh: '撰寫一段回應評價的文字，用於 [你的作品平台／Google 評論]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['自由工作者']
    },
    // 初創創業者 (Startup Founders) - Level 1
    {
      id: 'startup-beginner-elevator-pitch',
      titleEn: 'Elevator Pitch for Startup',
      titleZh: '初創 Elevator Pitch',
      descriptionEn: 'Workplace: concise founder pitch.',
      descriptionZh: '職場應用：創辦人簡短介紹。',
      textEn: "Write an elevator pitch introducing [your startup project]. Keep it concise, clear, and compelling.",
      textZh: '撰寫一段 elevator pitch，介紹 [你的初創項目]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-investor-invite',
      titleEn: 'Email to Invite Investor for Next Round',
      titleZh: '邀請投資者參與下一輪募資 Email',
      descriptionEn: 'Workplace: investor outreach.',
      descriptionZh: '職場應用：投資者聯絡。',
      textEn: "Write an email inviting [investor] to participate in your next fundraising round, highlighting traction and vision.",
      textZh: '撰寫一封 email，邀請 [投資者] 參與你下一輪募資。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-team-intro',
      titleEn: 'Team Member Introduction',
      titleZh: '團隊成員簡介',
      descriptionEn: 'Workplace: introduce core team.',
      descriptionZh: '職場應用：介紹核心團隊。',
      textEn: "Write a short introduction presenting [your team member], covering role, strengths and past achievements.",
      textZh: '撰寫一段簡介，介紹 [你的團隊成員]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-pitchdeck-opening',
      titleEn: 'Pitch Deck Opening Slide Copy',
      titleZh: 'Pitch Deck 開場 Slide 文案',
      descriptionEn: 'Workplace: sharp opening lines.',
      descriptionZh: '職場應用：抓住注意的開場。',
      textEn: "Write copy for the opening slide of a pitch deck to position [your startup] and the problem you solve.",
      textZh: '撰寫一份 pitch deck 開場 slide 的說明文字。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-launch-notice-email',
      titleEn: 'Product Pre‑launch Notice Email',
      titleZh: '產品即將上線通知 Email',
      descriptionEn: 'Workplace: launch communication.',
      descriptionZh: '職場應用：上線通知。',
      textEn: "Write a notification email informing users that [product is launching soon], with timeline and call to action.",
      textZh: '撰寫一封通知 email，通知用戶 [產品即將上線]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-faq-features',
      titleEn: 'FAQ Explaining Product Features',
      titleZh: '產品特色 FAQ',
      descriptionEn: 'Workplace: short FAQ section.',
      descriptionZh: '職場應用：常見問題說明。',
      textEn: "Write a short FAQ explaining [your product features] using clear, user‑friendly language.",
      textZh: '撰寫一段 FAQ，用於解釋 [你的產品特色]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-instagram-milestone',
      titleEn: 'Instagram Post for Milestone',
      titleZh: 'Instagram 里程碑貼文',
      descriptionEn: 'Workplace: celebrate progress.',
      descriptionZh: '職場應用：慶祝里程碑。',
      textEn: "Write an Instagram post celebrating [milestone achieved], thanking users and inviting engagement.",
      textZh: '撰寫一段 Instagram 貼文，慶祝 [你達成的里程碑]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-waitlist-launch',
      titleEn: 'App Launch Notice for Waitlist',
      titleZh: '等待名單用戶 App 上線通知',
      descriptionEn: 'Workplace: notify waitlist.',
      descriptionZh: '職場應用：通知等待名單。',
      textEn: "Write a launch notification for [waitlist users], including access instructions and next steps.",
      textZh: '撰寫一段 App 推出通知，發送給 [等待名單用戶]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-kol-collab-invite',
      titleEn: 'Collaboration Invite Email to KOL/Brand',
      titleZh: '邀請 KOL／品牌合作 Email',
      descriptionEn: 'Workplace: co‑marketing outreach.',
      descriptionZh: '職場應用：聯合推廣洽談。',
      textEn: "Write a collaboration invitation email to [KOL or brand] to explore co‑marketing opportunities.",
      textZh: '撰寫一段合作邀請 email，邀請 [KOL 或品牌] 合作推廣。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-beta-invite',
      titleEn: 'Beta/User Testing Invitation',
      titleZh: '用戶測試／Beta 測試邀請',
      descriptionEn: 'Workplace: recruit testers.',
      descriptionZh: '職場應用：招募測試者。',
      textEn: "Write an invitation for [user testing/beta testing], stating objectives, duration and feedback channel.",
      textZh: '撰寫一段關於 [用戶測試 / beta 測試] 的邀請內容。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-intro-video-script',
      titleEn: 'Intro Video Script for Product',
      titleZh: '產品介紹影片腳本',
      descriptionEn: 'Workplace: short explainer.',
      descriptionZh: '職場應用：簡短解說。',
      textEn: "Write a short script explaining [your product use cases] for an intro video.",
      textZh: '撰寫一段介紹影片腳本，解釋 [你的產品用途]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-announcement-update',
      titleEn: 'Announcement: Platform Update/New Feature',
      titleZh: '公告：平台更新／新功能',
      descriptionEn: 'Workplace: announce update.',
      descriptionZh: '職場應用：更新公告。',
      textEn: "Write an announcement letter informing users about [platform update/new feature] and its benefits.",
      textZh: '撰寫一封公告信，通知 [你的平台更新 / 新功能推出]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-founder-daily-caption',
      titleEn: 'Caption: Founder Daily Persona',
      titleZh: '創辦人日常品牌人設 caption',
      descriptionEn: 'Workplace: humanise the brand.',
      descriptionZh: '職場應用：塑造人設。',
      textEn: "Write a caption that builds brand persona for [founder daily life], relatable and authentic.",
      textZh: '撰寫一段 caption，為 [你的創辦人日常] 打造品牌人設。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-faq-pricing',
      titleEn: 'FAQ: SaaS Pricing',
      titleZh: 'SaaS 方案價格 FAQ',
      descriptionEn: 'Workplace: pricing clarity.',
      descriptionZh: '職場應用：清楚定價。',
      textEn: "Write a concise FAQ explaining [your SaaS plan pricing], tiers and value.",
      textZh: '撰寫一段 FAQ，說明 [你的 SaaS 方案價格]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-user-testimonial',
      titleEn: 'User Testimonial Snippet',
      titleZh: '用戶推薦語',
      descriptionEn: 'Workplace: social proof.',
      descriptionZh: '職場應用：社會證明。',
      textEn: "Write a short user testimonial showcasing [your user success story].",
      textZh: '撰寫一段用戶推薦語，展示 [你的用戶成功故事]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-market-painpoints-summary',
      titleEn: 'Slide Summary: Market Size & Pain Points',
      titleZh: '簡報摘要：市場規模與痛點',
      descriptionEn: 'Workplace: crisp summary.',
      descriptionZh: '職場應用：清晰摘要。',
      textEn: "Write a presentation summary introducing [your market size and pain points] with numbers and sources.",
      textZh: '撰寫一段簡報摘要，介紹 [你的市場規模與痛點]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-progress-tweet',
      titleEn: 'Tweet: Startup Progress Update',
      titleZh: 'Tweet：創業進度更新',
      descriptionEn: 'Workplace: short social update.',
      descriptionZh: '職場應用：簡短社交更新。',
      textEn: "Write a tweet updating [your startup progress], including a call to follow or join the waitlist.",
      textZh: '撰寫一段 Tweet，更新 [你的創業進度]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-launch-post',
      titleEn: 'Launch Post for Product Release',
      titleZh: '產品正式上市發佈帖文',
      descriptionEn: 'Workplace: launch announcement.',
      descriptionZh: '職場應用：上市宣佈。',
      textEn: "Write a launch post for [your product official release] with key features and links.",
      textZh: '撰寫一段發佈帖文，用於 [你的產品正式上市]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },
    {
      id: 'startup-beginner-satisfaction-survey-email',
      titleEn: 'Email: Product Satisfaction Survey Invite',
      titleZh: '產品滿意度問卷邀請 Email',
      descriptionEn: 'Workplace: collect feedback.',
      descriptionZh: '職場應用：收集反饋。',
      textEn: "Write an email inviting users to fill in [your product satisfaction survey].",
      textZh: '撰寫一封 email，邀請使用者填寫 [你的產品滿意度問卷]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['初創創業者']
    },

    // 退休人士 (Retirees) - Level 1
    {
      id: 'retiree-beginner-self-intro',
      titleEn: 'Self‑introduction: Career and Life Update',
      titleZh: '自我介紹：過往職涯與生活近況',
      descriptionEn: 'Workplace: clear personal intro.',
      descriptionZh: '職場應用：清晰自我介紹。',
      textEn: "Write a self‑introduction sharing [your past career and recent life updates].",
      textZh: '撰寫一段自我介紹，介紹 [你的過往職涯與生活近況]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-reconnect-email',
      titleEn: 'Email to Reconnect with Old Colleague/Friend',
      titleZh: '聯絡舊同事／老朋友重聚 Email',
      descriptionEn: 'Workplace: warm reconnection.',
      descriptionZh: '職場應用：溫暖重聯。',
      textEn: "Write an email to reconnect with [old colleague/friend] and propose a catch‑up.",
      textZh: '撰寫一封 email，聯絡 [舊同事 / 老朋友] 重聚見面。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-thankyou-speech',
      titleEn: 'Thank‑you Speech for Retirement Dinner',
      titleZh: '退休晚宴／聚會感謝詞',
      descriptionEn: 'Workplace: short speech.',
      descriptionZh: '職場應用：簡短致辭。',
      textEn: "Write a thank‑you speech for [retirement dinner/gathering].",
      textZh: '撰寫一段感謝詞，用於 [退休晚宴 / 聚會] 致辭。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-fb-reflection-post',
      titleEn: 'Facebook Post: Reflections on Retirement',
      titleZh: 'Facebook 貼文：退休感想',
      descriptionEn: 'Workplace: reflective social post.',
      descriptionZh: '職場應用：回顧分享。',
      textEn: "Write a Facebook post sharing [your reflections on retirement].",
      textZh: '撰寫一段 Facebook 帖文，分享 [你的退休感想]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-daily-journal',
      titleEn: 'Daily Journal Entry: Retirement Routine',
      titleZh: '日記：每日退休生活節奏',
      descriptionEn: 'Workplace: reflective journal.',
      descriptionZh: '職場應用：生活記錄。',
      textEn: "Write a diary entry recording [your daily retirement routine].",
      textZh: '撰寫一段日記，記錄 [你每日的退休生活節奏]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-recommendation',
      titleEn: 'Recommendation for Junior/Former Colleague',
      titleZh: '推薦語：舊同事／後輩',
      descriptionEn: 'Workplace: referee note.',
      descriptionZh: '職場應用：職涯推薦。',
      textEn: "Write a recommendation note for [former colleague/junior] for their career advancement.",
      textZh: '撰寫一段推薦語，幫 [舊同事 / 後輩] 做職涯推薦。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-volunteer-enquiry',
      titleEn: 'Email Enquiry about Volunteer/Community Activities',
      titleZh: '查詢義工／社區活動 Email',
      descriptionEn: 'Workplace: activity enquiry.',
      descriptionZh: '職場應用：活動查詢。',
      textEn: "Write an email asking about opportunities to join [volunteer/community activities].",
      textZh: '撰寫一段 email，詢問 [義工 / 社區活動] 的參與機會。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-learning-caption',
      titleEn: 'Caption: Learning New Hobby/Skills',
      titleZh: '學習新興趣／技能 caption',
      descriptionEn: 'Workplace: inspire learning.',
      descriptionZh: '職場應用：學習分享。',
      textEn: "Write a caption showing that you are learning [a new hobby or skill] in daily life.",
      textZh: '撰寫一段 caption，展示 [你在學習新興趣或技能] 的日常。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-memorable-experience',
      titleEn: 'Retrospective: Most Memorable Work Experience',
      titleZh: '回顧：最難忘的職場經驗',
      descriptionEn: 'Workplace: reflection writing.',
      descriptionZh: '職場應用：經驗回顧。',
      textEn: "Write a retrospective describing [your most memorable work experience].",
      textZh: '撰寫一段回顧，描述 [你最難忘的職場經驗]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-letter-encourage-junior',
      titleEn: 'Letter to Encourage Grandchild/Young People',
      titleZh: '鼓勵信：孫兒／年輕後輩',
      descriptionEn: 'Workplace: encouraging letter.',
      descriptionZh: '職場應用：鼓勵支持。',
      textEn: "Write a letter encouraging [your grandchild/younger person] to pursue their dreams.",
      textZh: '撰寫一封信，鼓勵 [孫兒 / 年輕後輩] 努力追夢。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-finance-arrangement',
      titleEn: 'Overview: Post‑retirement Financial Arrangements',
      titleZh: '退休後理財安排介紹',
      descriptionEn: 'Workplace: financial overview.',
      descriptionZh: '職場應用：財務安排說明。',
      textEn: "Write content introducing [your financial arrangements after retirement].",
      textZh: '撰寫一段內容，介紹 [你退休後的理財安排]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-response-friend-plan',
      titleEn: "Response to Friend's Retirement Plan Suggestion",
      titleZh: '回應朋友退休計劃建議',
      descriptionEn: 'Workplace: thoughtful reply.',
      descriptionZh: '職場應用：貼心回應。',
      textEn: "Write a response expressing your thoughts on [a friend's retirement plan suggestion].",
      textZh: '撰寫一段回應，對於 [朋友的退休計劃建議] 表示想法。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-thanks-old-boss',
      titleEn: 'Thank‑you Letter to Former Boss/Company',
      titleZh: '感謝信：舊上司／老東家',
      descriptionEn: 'Workplace: gratitude letter.',
      descriptionZh: '職場應用：致謝來信。',
      textEn: "Write a thank‑you letter to [former boss/company] expressing appreciation.",
      textZh: '撰寫一封感謝信，致 [舊上司 / 老東家]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-travel-experience',
      titleEn: 'Share: Travel Experiences after Retirement',
      titleZh: '分享：退休後旅行體驗',
      descriptionEn: 'Workplace: travel sharing.',
      descriptionZh: '職場應用：旅遊分享。',
      textEn: "Write a post sharing [your travel experiences after retirement].",
      textZh: '撰寫一段分享，介紹 [你退休後旅行的體驗]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-medical-insurance-enquiry',
      titleEn: 'Email Enquiry: Senior Medical Insurance/Silver Services',
      titleZh: '查詢：長者醫療保險／銀髮服務',
      descriptionEn: 'Workplace: service enquiry.',
      descriptionZh: '職場應用：服務查詢。',
      textEn: "Write an email enquiring about [senior medical insurance/silver services].",
      textZh: '撰寫一封 email，查詢 [長者醫療保險 / 銀髮服務]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-daily-walk-caption',
      titleEn: 'Instagram Caption: Daily Walk',
      titleZh: 'Instagram caption：每日散步',
      descriptionEn: 'Workplace: wellness sharing.',
      descriptionZh: '職場應用：健康日常。',
      textEn: "Write an Instagram caption showcasing your daily walk and wellness mindset.",
      textZh: '撰寫一段 Instagram caption，展示你每日散步的生活。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-short-speech-meaning',
      titleEn: 'Short Speech: Retirement and Life Meaning',
      titleZh: '簡短演講：退休與人生意義',
      descriptionEn: 'Workplace: short speech.',
      descriptionZh: '職場應用：簡短演說。',
      textEn: "Write a short speech sharing thoughts on [retirement and the meaning of life].",
      textZh: '撰寫一段簡短演講，分享 [退休與人生意義]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-three-learnings',
      titleEn: 'Three Important Life Learnings',
      titleZh: '人生三個重要學習',
      descriptionEn: 'Workplace: reflective list.',
      descriptionZh: '職場應用：人生整理。',
      textEn: "Write content summarising [your three most important life learnings].",
      textZh: '撰寫一段內容，整理 [你的人生三個重要學習]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    {
      id: 'retiree-beginner-family-story',
      titleEn: 'Record: Family Story/Heritage',
      titleZh: '紀錄：家族故事／傳承經歷',
      descriptionEn: 'Workplace: legacy record.',
      descriptionZh: '職場應用：傳承紀錄。',
      textEn: "Write a record organising [your family story/heritage experience].",
      textZh: '撰寫一段紀錄，整理 [你的家族故事 / 傳承經歷]。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['退休人士']
    },
    // Students - Intermediate (additional requests)
    {
      id: 'student-intro-60s',
      titleEn: '60‑second Professional Self‑intro (University Student)',
      titleZh: '60 秒專業自我介紹（大學生）',
      descriptionEn: 'Workplace: concise, confident self‑introduction for workshops and networking.',
      descriptionZh: '職場應用：簡潔自信的自我介紹，適用於工作坊與社交場合。',
      textEn: "You are a university student preparing for a career workshop. Draft a 60‑second self‑introduction covering your major, extracurricular experience, personal skills and career interests. Tone should be natural yet professional, suitable for mock interviews or networking.",
      textZh: '你係一位大學生，正準備參加學校職涯工作坊，請撰寫一段長度為 60 秒的自我介紹，內容需涵蓋你的主修科目、課外活動經驗、個人技能與職業興趣。語氣自然而專業，可用於模擬面試或社交活動。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-personal-statement-comm',
      titleEn: 'Persuasive Personal Statement (Communication Studies)',
      titleZh: '具說服力的大學傳理學系個人陳述',
      descriptionEn: 'Workplace: admissions personal statement with goals and contribution.',
      descriptionZh: '職場應用：含學術目標與社會貢獻的大學申請文。',
      textEn: "You are a secondary‑school leaver applying for Communication Studies. Write a persuasive personal statement including your upbringing, academic goals, experiences that shaped your choice, and the social contribution you hope to make.",
      textZh: '你係一位高中畢業生，正申請大學傳理學系，請撰寫一封具說服力的個人陳述信，內容需包括你的成長背景、學術目標、影響你選科的經歷與你未來想實現的社會貢獻。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-debate-opening-ai-teachers',
      titleEn: 'Debate Opening: Should AI Replace Teachers?',
      titleZh: '辯論開場：AI 是否應全面取代教師？',
      descriptionEn: 'Workplace: 200‑word logical and persuasive opening statement.',
      descriptionZh: '職場應用：約 200 字、邏輯清晰且具說服力的開場陳詞。',
      textEn: "You are on the debating team. Write a ~200‑word opening speech for the motion \"Should AI fully replace teachers?\" Maintain a clear logical structure and persuasive tone.",
      textZh: '你係學校辯論隊的成員，將參加一場以「AI 是否應全面取代教師」為題的辯論比賽，請撰寫一段約 200 字的開場陳詞，需表現出邏輯清晰與說服力。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-thesis-proposal-outline',
      titleEn: 'Thesis Proposal Discussion Outline',
      titleZh: '畢業論文初步討論大綱',
      descriptionEn: 'Workplace: structured outline for supervisor meeting.',
      descriptionZh: '職場應用：與導師會議用的結構化大綱。',
      textEn: "You are a final‑year student drafting your dissertation. List your research topic, motivation, methodology, data sources, preliminary hypotheses and expected conclusion to guide an initial discussion with your supervisor.",
      textZh: '你係大學四年級學生，正撰寫畢業論文，請列出你的研究主題、動機、研究方法、資料來源、初步假設與預期結論，用作與導師進行初步討論之用。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-campus-elevator-pitch',
      titleEn: '1‑Minute Elevator Pitch (Campus Entrepreneurship)',
      titleZh: '校園創業比賽 1 分鐘 Elevator Pitch',
      descriptionEn: 'Workplace: clear concept, market and edge.',
      descriptionZh: '職場應用：清楚表達概念、市場與優勢。',
      textEn: "You lead a team in a tertiary entrepreneurship contest. Prepare a 1‑minute elevator pitch clearly introducing your product/service concept, target market and core advantages.",
      textZh: '你係一個大專創業比賽的參賽隊伍負責人，請準備一段 1 分鐘 elevator pitch，清晰介紹你們的產品或服務概念、目標市場與核心優勢。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-ig-caption-multicultural-week',
      titleEn: 'IG Caption for Multicultural Week',
      titleZh: '「多元文化週」IG 推廣文案',
      descriptionEn: 'Workplace: lively caption with theme, highlights and how‑to‑join.',
      descriptionZh: '職場應用：以輕鬆活潑語氣寫主題、亮點與參加方式。',
      textEn: "You are on the campus promo team. Write an Instagram caption to promote the upcoming \"Multicultural Week\". Use a light, upbeat tone and include the theme, highlights and how to join.",
      textZh: '你係校園活動宣傳小組成員，負責撰寫一段 IG caption，用以推廣即將舉辦的「多元文化週」活動，請以輕鬆活潑語氣寫出主題、亮點與參加方式。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-internship-application-email',
      titleEn: 'Internship Application Email',
      titleZh: '申請實習職位 Email',
      descriptionEn: 'Workplace: tailored email with fit and learning goals.',
      descriptionZh: '職場應用：展現匹配度與學習目標的電郵。',
      textEn: "You are a fresh graduate applying for an internship. Write a job application email that shows your understanding of the company and role, your fit, relevant experience and expected learning outcomes.",
      textZh: '你係一位應屆畢業生，正準備申請實習職位，請撰寫一封求職 email，內容需包含對公司與職位的理解、你與該職位的配對點、過去經驗與期望學習成果。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-design-work-description-150',
      titleEn: '150‑word Design Work Description',
      titleZh: '150 字作品說明（設計系）',
      descriptionEn: 'Workplace: concept, inspiration, medium and message.',
      descriptionZh: '職場應用：介紹概念、靈感、媒介與訊息。',
      textEn: "You are a design student preparing to showcase your term project. Write a 150‑word description covering concept, sources of inspiration, chosen medium and the message you wish to convey.",
      textZh: '你係設計系學生，正準備展示你的期末作品，請撰寫一段 150 字的作品說明文字，內容要介紹作品概念、靈感來源、選用媒介與想傳達的訊息。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    {
      id: 'student-class-lunch-report-slide',
      titleEn: 'One‑page Brief: School Lunch Arrangement Review',
      titleZh: '一頁簡報：學校午膳安排意見匯報',
      descriptionEn: 'Workplace: statistics, key feedback and constructive suggestions.',
      descriptionZh: '職場應用：含統計摘要、回應重點與具建設性建議。',
      textEn: "You are the class monitor reporting to the headteacher on school lunch arrangements. Consolidate survey highlights and write a one‑page slide including a statistics summary, key student feedback and constructive suggestions.",
      textZh: '你係班長，將向校長匯報全班對學校午膳安排的意見，請整理調查結果重點，撰寫一頁簡報內容，須包括統計摘要、學生回應重點與具建設性建議。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['學生']
    },
    // Marketing - Intermediate (additional requests)
    {
      id: 'marketing-bookstore-campaign-brief',
      titleEn: 'Brand Campaign Brief for New Bookstore',
      titleZh: '新書店品牌推廣活動企劃摘要',
      descriptionEn: 'Workplace: objectives, audience, channels, outcomes and KPIs.',
      descriptionZh: '職場應用：活動目標、受眾、渠道、成果與 KPI。',
      textEn: "You are a marketing manager designing a launch campaign for a newly opened bookstore. Draft a campaign summary with objectives, target audience, channels, expected outcomes and KPI metrics.",
      textZh: '你係一位市場營銷經理，負責為一家剛開幕的書店設計品牌推廣活動。請撰寫完整活動企劃摘要，包括活動目標、受眾、行銷渠道、預期成果與 KPI 指標。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-ig-caption-new-series',
      titleEn: 'Instagram Caption for New Product Series',
      titleZh: '新產品系列 Instagram Caption',
      descriptionEn: 'Workplace: features, usage scenarios and promo hook.',
      descriptionZh: '職場應用：產品特點、使用情境與促銷訊息。',
      textEn: "You are a social media executive launching a new product series. Write an eye‑catching Instagram caption summarising features, usage scenarios and promotional details, and encourage comments.",
      textZh: '你係一位社交媒體營銷專員，負責推出新產品系列，請撰寫一段引人注目的 Instagram caption，內容需簡要說明產品特點、使用情境與促銷訊息，並鼓勵用戶留言互動。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-linkedin-brand-transformation',
      titleEn: 'LinkedIn Post: Brand Transformation Case',
      titleZh: 'LinkedIn 專文：品牌轉型成功案例',
      descriptionEn: 'Workplace: narrative plus data to show impact and lessons.',
      descriptionZh: '職場應用：敘述加數據展示成效與策略啟示。',
      textEn: "You are a content marketing manager. Write a LinkedIn post titled 'Brand transformation success case', using narrative plus supporting data to show impact and the strategies learned.",
      textZh: '你係內容營銷經理，請撰寫一篇 LinkedIn 專業貼文，主題為「品牌轉型成功案例」，以敘述 + 數據支持形式撰寫，展現轉型成效與學到的行銷策略。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-5th-anniversary-flow',
      titleEn: 'Event Flow Brief for 5th Anniversary',
      titleZh: '品牌五週年活動流程簡報',
      descriptionEn: 'Workplace: theme, timetable, interactions and materials.',
      descriptionZh: '職場應用：主題、時間表、互動安排與物料。',
      textEn: "You are an event planner. Produce a flow brief for a brand's 5th anniversary event including theme, schedule, on‑site interaction plan and material checklist.",
      textZh: '你係活動策劃師，請為品牌五週年慶撰寫活動流程簡報，需包含活動主題、流程時間表、現場互動安排與現場物料規劃。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-energy-drink-slogan-copy',
      titleEn: 'Slogan + Short Copy for Natural Energy Drink',
      titleZh: '天然能量飲品標語與短宣傳文',
      descriptionEn: 'Workplace: 30‑second brand line and promo copy.',
      descriptionZh: '職場應用：30 秒內的品牌標語與宣傳文案。',
      textEn: "You are a brand manager launching a natural energy drink. Write a memorable slogan and a short promo copy (readable within 30 seconds) emphasising natural benefits and unique selling points.",
      textZh: '你係品牌經理，準備推出一款天然能量飲品，請撰寫一段 30 秒內的品牌 slogan + 宣傳文案，強調產品的自然健康特性與獨特賣點。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-tiktok-daily-use-scenes',
      titleEn: 'TikTok Script Outline: Daily Use Scenes',
      titleZh: 'TikTok 短片腳本概要：日常使用情境',
      descriptionEn: 'Workplace: outline with three scenes and hook.',
      descriptionZh: '職場應用：含引子與三個生活場景的腳本概要。',
      textEn: "You are a video marketing specialist. Write a TikTok script outline titled 'How many times do we use our product in a day?' and list three everyday scenes.",
      textZh: '你係一位影片行銷專員，請撰寫一段 TikTok 短片腳本概要，主題為「一日生活中有幾多時候會用到我哋嘅產品？」，並列出三個生活場景。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-crm-edm-repurchase',
      titleEn: 'CRM EDM to Drive Repeat Purchase',
      titleZh: '促動再購的 EDM 內容',
      descriptionEn: 'Workplace: incentive, limited‑time offer and personalisation.',
      descriptionZh: '職場應用：促銷誘因、限時優惠與個人化建議。',
      textEn: "You are on the CRM team. Draft an email to drive repeat purchase including incentive, limited‑time offer and personalised recommendations.",
      textZh: '你係 CRM 團隊一員，請撰寫一段客戶 EDM 電郵內容，用於推動再購行為，需包含促銷誘因、限時優惠與個人化推薦語句。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-ig-story-poll',
      titleEn: 'IG Story Poll Concept with Copy & Visuals',
      titleZh: 'IG Story 投票活動與文案/圖像說明',
      descriptionEn: 'Workplace: poll design to gauge expectations and preferences.',
      descriptionZh: '職場應用：用以了解粉絲對新產品的期待與偏好。',
      textEn: "You are a community manager. Design an IG Story poll with copy and visual guidance to learn fans' expectations and preferences for a new product.",
      textZh: '你係品牌社群經理，請設計一則 IG Story poll（投票活動），並撰寫配套文字與圖像說明，用作了解粉絲對新產品的期待與偏好。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-seo-outline-sensitive-skin',
      titleEn: 'SEO Blog Outline: 5 Summer Tips for Sensitive Skin',
      titleZh: 'SEO 大綱：夏天敏感肌保養 5 大技巧',
      descriptionEn: 'Workplace: H1–H3, keywords and meta description.',
      descriptionZh: '職場應用：含 H1–H3、關鍵字與 meta description。',
      textEn: "You are an SEO writer. Create a blog outline titled '5 tips for sensitive skin in summer' with H1–H3 structure, primary/secondary keywords and a 155‑character meta description.",
      textZh: '你係 SEO 內容撰稿人，請撰寫一篇題為「夏天敏感肌保養5大技巧」的 blog outline，包括標題、5 個重點段落標題與每段內容提要。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'marketing-before-after-video',
      titleEn: 'Before vs After Video: Short Script',
      titleZh: '「使用前 vs 使用後」影片短腳本',
      descriptionEn: 'Workplace: script with shot suggestions and soundtrack style.',
      descriptionZh: '職場應用：含畫面建議與配樂風格的腳本。',
      textEn: "You create brand videos. Write a short script for a 'before vs after' theme with suggested shots and soundtrack style.",
      textZh: '你係品牌影片內容創作人，請為一段「使用前 vs 使用後」主題的影片撰寫簡短腳本，並列出畫面建議與配樂風格。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    // =========================
    // Creative Professionals - Intermediate (expanded)
    // =========================
    {
      id: 'creator-illustrator-childhood-memories',
      titleEn: 'Illustration Book Intro: Childhood Memories',
      titleZh: '插畫作品簡介：《童年記憶》',
      descriptionEn: 'Workplace: cover + illustration intro with inspiration, composition, style and emotion.',
      descriptionZh: '職場應用：封面與插圖作品簡介，說明靈感、構圖、風格與情感。',
      textEn: 'You are a freelance illustrator designing the cover and illustrations for a book about "Childhood Memories". Write the work introduction explaining inspiration sources, composition plan, style choices, and the emotions you wish to convey.',
      textZh: '你係一位自由插畫師，準備為一本關於「童年記憶」的書籍設計封面與插圖，請撰寫作品簡介，內容需說明靈感來源、構圖安排、風格選擇及想傳達的情感。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-visual-series-proposal',
      titleEn: 'Proposal: Social Media Visual Series for New Product',
      titleZh: '社群宣傳圖像系列提案（新產品）',
      descriptionEn: 'Workplace: style positioning, design elements and application scenarios.',
      descriptionZh: '職場應用：風格定位、設計元素建議及應用場景。',
      textEn: 'You are a brand visual designer. Draft a proposal for a social media visual series for a new product launch, covering style positioning, key design elements, and application scenarios across platforms.',
      textZh: '你係品牌視覺設計師，客戶希望你為其新產品推出一套社群媒體宣傳圖像系列，請撰寫提案內容，包括風格定位、設計元素建議及應用場景。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-ngo-psa-animation',
      titleEn: '1‑min PSA Animation: Hidden Poverty in the City',
      titleZh: '公益動畫腳本概要：《城市中的隱性貧窮》',
      descriptionEn: 'Workplace: script outline and visual style recommendation.',
      descriptionZh: '職場應用：腳本概要與視覺風格建議。',
      textEn: 'You are a multimedia creator commissioned by an NGO to produce a 1‑minute public‑service animation on "Hidden Poverty in the City". Write a script outline and recommend the visual style.',
      textZh: '你係多媒體創作者，接到 NGO 委託製作 1 分鐘公益動畫，主題為「城市中的隱性貧窮」，請撰寫影片腳本概要與視覺風格建議。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-exhibition-4x4-echoes-of-time',
      titleEn: 'Exhibition Booth 4x4m: Echoes of Time — Design Rationale',
      titleZh: '展位設計說明（4x4米）：《時間的殘響》',
      descriptionEn: 'Workplace: concept, circulation and audience experience.',
      descriptionZh: '職場應用：概念、動線與觀者體驗設計。',
      textEn: 'You are an exhibition designer planning a 4x4 metre booth for the artist series "Echoes of Time". Write the design rationale covering concept, circulation planning, and audience‑experience design.',
      textZh: '你係展覽設計師，負責規劃一個 4x4 米展位，展出藝術家最新系列「時間的殘響」，請撰寫設計說明，內容要包括概念、動線與觀者體驗設計。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-photo-exhibition-industrial-aesthetics',
      titleEn: 'Photography Solo Show: Industrial Aesthetics — Intro & Guide',
      titleZh: '攝影展簡介與導賞：《工業美學》',
      descriptionEn: 'Workplace: intro and guided text incl. technique, subject and social view.',
      descriptionZh: '職場應用：展覽簡介與導賞文字，涵蓋技術、題材與社會觀點。',
      textEn: 'You are a freelance photographer holding a solo exhibition themed "Industrial Aesthetics". Write the exhibition introduction and guided‑tour text, covering technical choices, subject presentation and social perspective.',
      textZh: '你係自由攝影師，將舉辦以「工業美學」為主題的個人攝影展，請撰寫展覽簡介與作品導賞文字，內容需涵蓋技術選擇、題材呈現與社會觀點。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-fashion-perfume-campaign-brief',
      titleEn: 'Creative Brief: Fashion Perfume Campaign',
      titleZh: '創意構想簡介：時尚香水 Campaign',
      descriptionEn: 'Workplace: slogan, visual language and ad scenarios.',
      descriptionZh: '職場應用：slogan、視覺語言與廣告情境。',
      textEn: 'You are a brand creative director designing a campaign for a new fashion perfume. Write a creative brief including slogan, visual language and typical advertising scenarios.',
      textZh: '你係品牌創意總監，為即將推出的時尚香水設計 campaign，請撰寫完整創意構想簡介，包括 slogan、視覺語言與廣告情境描述。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-documentary-disappearing-street-culture',
      titleEn: 'Short Documentary Plan: Disappearing Street Culture',
      titleZh: '紀錄短片構想：《街頭文化的消逝》',
      descriptionEn: 'Workplace: content outline and filming style.',
      descriptionZh: '職場應用：內容構想與拍攝風格說明。',
      textEn: 'You are a film director invited to shoot a short documentary on "The Disappearing Street Culture". Write the content concept and describe the filming style.',
      textZh: '你係影片導演，受邀為一個本地文化單位拍攝紀錄短片，主題為「街頭文化的消逝」，請撰寫內容構想與拍攝風格說明。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-youth-workshop-outline',
      titleEn: 'Workshop Plan: Self‑exploration & Creation (Teens)',
      titleZh: '青少年創作工作坊大綱：《自我探索與創作》',
      descriptionEn: 'Workplace: outline, flow and output goals.',
      descriptionZh: '職場應用：活動大綱、流程與創作產出目標。',
      textEn: 'You are an art tutor designing a teen creative workshop themed "Self‑exploration and Creation". Write the activity outline, session flow and output goals.',
      textZh: '你係一位藝術導師，設計一場給青少年參與的創作工作坊，主題為「自我探索與創作」，請撰寫活動大綱、工作坊流程與創作產出目標。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-packaging-system-natural-care',
      titleEn: 'Packaging System Concept: Natural Personal Care',
      titleZh: '包裝系統設計理念：天然個人護理',
      descriptionEn: 'Workplace: material considerations and competitor comparison.',
      descriptionZh: '職場應用：材質考量與市場競爭對手對比。',
      textEn: 'You are a brand designer creating a new packaging system for a natural personal‑care line. Write the design philosophy including material choices and a comparison with competitors.',
      textZh: '你係品牌設計師，需設計一套新的包裝系統，應用於天然個人護理品牌系列產品，請撰寫設計理念簡介，包括使用材質考量與市場競爭對手對比。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },
    {
      id: 'creator-music-score-sci-fi',
      titleEn: 'Music Style Proposal: Sci‑fi Animation Background Score',
      titleZh: '配樂風格提案：科幻動畫背景音樂',
      descriptionEn: 'Workplace: rhythm, instruments and atmosphere with scene pairing.',
      descriptionZh: '職場應用：節奏、樂器與氛圍設計並配對場景。',
      textEn: 'You are a music designer composing for a sci‑fi animation. Propose the music style with rhythm, instrument choices and atmosphere, and suggest pairings for key scenes.',
      textZh: '你係音樂設計師，準備為一個科幻動畫創作背景配樂，請撰寫音樂風格提案與與場景配對建議，內容需包含節奏、樂器選擇與氛圍設計。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['創意專業人士']
    },

    // =========================
    // Business Professionals - Intermediate (expanded)
    // =========================
    {
      id: 'business-bd-partnership-email',
      titleEn: 'Partnership Proposal Email (Startup BD)',
      titleZh: '企業合作提案電郵（業務拓展）',
      descriptionEn: 'Workplace: highlights, win‑win benefits and meeting invite.',
      descriptionZh: '職場應用：合作亮點、雙贏效益與會議邀請。',
      textEn: 'You are a business development manager drafting a partnership proposal email for a startup. Include collaboration highlights, expected win‑win value, and an invitation to meet.',
      textZh: '你係業務拓展經理，需為一間初創公司擬定企業合作提案，請撰寫一封電郵草稿，內容包括合作亮點、預期雙贏效益及會議邀請。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-pm-internal-brief',
      titleEn: 'Internal Brief: New Product Plan',
      titleZh: '新產品內部簡報（產品經理）',
      descriptionEn: 'Workplace: market need, features, timeline and target users.',
      descriptionZh: '職場應用：市場需求、功能、時程與目標用戶。',
      textEn: 'You are a product manager. Draft an internal brief for a new product including market needs analysis, key features, development timeline and target users.',
      textZh: '你係產品經理，請撰寫一份新產品的內部簡報，內容包括市場需求分析、功能特點、開發時程與目標用戶群。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-dept-monthly-opening',
      titleEn: 'Monthly Meeting Opening (Head of Department)',
      titleZh: '月會開場白（部門主管）',
      descriptionEn: 'Workplace: summarise last month and motivate the team.',
      descriptionZh: '職場應用：總結上月成果並激勵團隊。',
      textEn: "You are a department head hosting a monthly meeting. Write the opening remarks summarising last month's results and motivating the team for new challenges.",
      textZh: '你係部門主管，將主持月會，請撰寫一段開場白，需總結上月部門成果並激勵團隊迎接新挑戰。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-founder-2min-intro',
      titleEn: '2‑minute Founder Intro for VC Pitch',
      titleZh: '創投簡報 2 分鐘創辦人自我介紹',
      descriptionEn: 'Workplace: company vision and founding story.',
      descriptionZh: '職場應用：公司願景與創業初衷。',
      textEn: 'You are a company founder preparing a VC pitch. Write a 2‑minute self‑introduction covering vision and founding motivation.',
      textZh: '你係企業創辦人，需準備一段 2 分鐘的自我介紹，用於創投簡報中介紹公司願景與創業初衷。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-consultant-comm-optimisation',
      titleEn: 'Consulting Deck: Internal Communication Optimisation',
      titleZh: '顧問簡報：優化內部溝通流程',
      descriptionEn: 'Workplace: outline pain points and recommendations.',
      descriptionZh: '職場應用：現況痛點與改進建議。',
      textEn: "You are a management consultant preparing a presentation to optimise a client's internal communication process. Summarise current pain points and actionable recommendations.",
      textZh: '你係管理顧問，需撰寫一份簡報，協助客戶優化內部溝通流程，請概述現況痛點與改進建議。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-project-collab-brief',
      titleEn: 'Cross‑department Collaboration Communication Brief',
      titleZh: '跨部門協作溝通提案摘要',
      descriptionEn: 'Workplace: objectives, division of work and schedule.',
      descriptionZh: '職場應用：項目目標、分工方式與時程。',
      textEn: 'You are a project manager preparing a cross‑department plan. Write a communication brief describing project objectives, division of responsibilities and timeline.',
      textZh: '你係項目經理，正籌備跨部門協作計劃，請撰寫一份溝通提案摘要，說明項目目標、分工方式與時程。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-leadership-talk-outline',
      titleEn: 'Talk Outline: Building a High‑performance Team Culture',
      titleZh: '講稿摘要：建立高效團隊文化',
      descriptionEn: 'Workplace: outline for leadership training day.',
      descriptionZh: '職場應用：領導力訓練日分享大綱。',
      textEn: 'You are an internal speaker invited to a leadership training day. Write a talk outline on "Building a High‑performance Team Culture".',
      textZh: '你係公司內部講者，受邀於領導力訓練日分享經驗，請撰寫講稿摘要，主題為「建立高效團隊文化」。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-crm-annual-service-report-opening',
      titleEn: 'Opening & Highlights: Annual Service Report for Premium Clients',
      titleZh: '年度服務報告開場與亮點（高端客戶）',
      descriptionEn: 'Workplace: intro and key highlights summary.',
      descriptionZh: '職場應用：開場內容與核心亮點提要。',
      textEn: 'You are a customer relationship manager introducing the annual service report to premium clients. Draft the opening section and summarise key highlights.',
      textZh: '你係客戶關係經理，需向高端客戶介紹年度服務報告，請撰寫報告開場內容與核心亮點提要。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-onboarding-outline-retail',
      titleEn: 'Onboarding Plan: New Retail Hires',
      titleZh: '新入職員工 Onboarding 計劃（零售）',
      descriptionEn: 'Workplace: course outline and objectives.',
      descriptionZh: '職場應用：課程大綱與學習目標。',
      textEn: 'You are a corporate training consultant designing an onboarding plan for a retail company. Provide the course outline and objectives.',
      textZh: '你係企業培訓顧問，為一間零售企業設計新入職員工 onboarding 計劃，請撰寫課程大綱與目標設計。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    {
      id: 'business-rebranding-brief',
      titleEn: 'Rebranding Proposal Summary',
      titleZh: '品牌重塑企劃書摘要',
      descriptionEn: 'Workplace: positioning change, identity update and internal launch plan.',
      descriptionZh: '職場應用：定位轉變、識別更新與內部啟動活動。',
      textEn: 'You are a brand strategist. Write a rebranding proposal summary covering positioning shift, identity system update and internal launch activities.',
      textZh: '你係品牌策略師，請撰寫一份品牌重塑企劃書摘要，涵蓋品牌定位轉變、識別系統更新與內部啟動活動規劃。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['商業專業人士']
    },
    // SEO - Intermediate (batch 1)
    {
      id: 'seo-intermediate-trends-2025-outline',
      titleEn: 'Blog Outline: 2025 SEO Trends',
      titleZh: '部落格大綱：2025 SEO 趨勢',
      descriptionEn: 'Workplace: three themes, core keywords, content frame and target readers.',
      descriptionZh: '職場應用：三大主題、核心關鍵字、內文框架與目標讀者。',
      textEn: "You are an SEO professional. Draft a blog outline for '2025 SEO Trends' with three main themes, core keywords per theme, a suggested content structure, and the target readers.",
      textZh: '你係 SEO 專業人員，請撰寫一篇針對「2025 SEO 趨勢」的部落格文章大綱，需包含三大主題、核心關鍵字及內文框架建議，並列出目標讀者。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-tech-audit-summary',
      titleEn: 'Technical SEO Audit Summary',
      titleZh: '技術 SEO 檢查報告摘要',
      descriptionEn: 'Workplace: speed, tags, structured data and sitemap highlights.',
      descriptionZh: '職場應用：網站速度、標籤結構、結構化數據與網站地圖重點。',
      textEn: "You are an SEO professional. Write a technical SEO audit summary covering site speed, tag hierarchy, structured data usage and sitemap status.",
      textZh: '你係 SEO 專業人員，請為品牌官網撰寫技術 SEO 檢查報告摘要，包括網站速度、標籤結構、結構化數據與網站地圖的分析。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-ecomm-product-optim',
      titleEn: 'Proposal: Optimise E‑commerce Product Page SEO',
      titleZh: '提案摘要：優化電商產品頁 SEO',
      descriptionEn: 'Workplace: meta tags, on‑page keywords and alt text.',
      descriptionZh: '職場應用：meta 標籤、內文關鍵字與圖片說明。',
      textEn: "You are an SEO professional. Write a proposal summary for improving product page SEO focusing on meta title/description, on‑page keywords and image alt text.",
      textZh: '你係 SEO 專業人員，請撰寫一份提案摘要，說明如何優化電商商品頁面的 meta 標籤、內文關鍵字與圖片說明。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-local-guide-smb',
      titleEn: 'Local SEO Guide for Small Businesses',
      titleZh: '在地 SEO 優化指南（小型企業）',
      descriptionEn: 'Workplace: local keywords and Google Business profile operations.',
      descriptionZh: '職場應用：在地關鍵字與 Google 商家操作。',
      textEn: "You are an SEO professional. Write a local SEO optimisation guide for small businesses focusing on local keywords and Google Business profile operations.",
      textZh: '你係 SEO 專業人員，請撰寫地區小型企業 SEO 優化指南內容，著重在地關鍵字與 Google 商家操作。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-faq-featured-snippet',
      titleEn: 'FAQ Content for Featured Snippets',
      titleZh: '搜尋引擎友善 FAQ：精選摘要結構',
      descriptionEn: 'Workplace: structure answers for Google featured snippet logic.',
      descriptionZh: '職場應用：符合 Google 精選摘要收錄邏輯的結構。',
      textEn: "You are an SEO professional. Draft FAQ Q&A content structured to align with featured snippet patterns (concise, scannable, question‑first).",
      textZh: '你係 SEO 專業人員，請撰寫 FAQ 問答內容，結構需符合 Google 精選摘要收錄邏輯。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-competitor-research',
      titleEn: 'SEO Competitor Research Summary',
      titleZh: 'SEO 競品研究分析摘要',
      descriptionEn: 'Workplace: compare SEO strategy and backlink approach.',
      descriptionZh: '職場應用：對比 SEO 策略與外部連結策略。',
      textEn: "You are an SEO professional. Write a competitor research summary comparing SEO strategies and backlink approaches of key competitors.",
      textZh: '你係 SEO 專業人員，請撰寫競爭對手分析報告摘要，對比 SEO 策略與外部連結策略。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-home-meta',
      titleEn: 'SEO Meta Title & Description for E‑commerce Homepage',
      titleZh: '電商品牌首頁 Meta Title 與 Description',
      descriptionEn: 'Workplace: draft search‑friendly tags.',
      descriptionZh: '職場應用：撰寫 SEO 友好的標籤內容。',
      textEn: "You are an SEO professional. Write a meta title and description for an e‑commerce brand homepage following best practices.",
      textZh: '你係 SEO 專業人員，請為電商品牌首頁撰寫 SEO 友好的 meta title 與 description。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-longform-gaming-chair',
      titleEn: 'Structured SEO Article: How to Choose a Gaming Chair',
      titleZh: '結構化長文：如何挑選電競椅',
      descriptionEn: 'Workplace: headings, sections and key points.',
      descriptionZh: '職場應用：標題、段落設計與內容重點。',
      textEn: "You are an SEO professional. Design an SEO‑optimised article 'How to choose a gaming chair' with title, section plan and key talking points.",
      textZh: '你係 SEO 專業人員，請設計「如何挑選電競椅」的 SEO 優化文章，包含標題、段落設計與內容重點。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-youtube-description',
      titleEn: 'SEO‑Optimised YouTube Description & Hashtags',
      titleZh: 'YouTube 影片說明與 Hashtag SEO 配置',
      descriptionEn: 'Workplace: improve discoverability for video content.',
      descriptionZh: '職場應用：提升影音內容的 SEO 表現。',
      textEn: "You are an SEO professional. Write an optimised YouTube description and a set of relevant hashtags for a video.",
      textZh: '你係 SEO 專業人員，請撰寫 SEO 優化的 YouTube 影片說明與 hashtag 配置。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-internal-linking',
      titleEn: 'Internal Linking Strategy Brief',
      titleZh: '網站內部連結策略說明',
      descriptionEn: 'Workplace: strengthen interlinking and rankings.',
      descriptionZh: '職場應用：提升頁面互聯與關鍵字排名。',
      textEn: "You are an SEO professional. Write a brief explaining an internal linking strategy to improve inter‑page connectivity and keyword rankings.",
      textZh: '你係 SEO 專業人員，請撰寫網站內部連結策略說明，用於提升頁面互聯與關鍵字排名。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'seo-intermediate-yoast-tutorial',
      titleEn: 'Yoast SEO Plugin Setup Tutorial',
      titleZh: 'Yoast SEO Plugin 設置教學',
      descriptionEn: 'Workplace: help beginners configure key settings.',
      descriptionZh: '職場應用：協助新手設置 SEO 工具。',
      textEn: "You are an SEO professional. Write a tutorial to help beginners configure Yoast SEO plugin for WordPress, covering the key settings.",
      textZh: '你係 SEO 專業人員，請撰寫 Yoast SEO Plugin 教學文案，協助新手設置 SEO 工具。',
      category: 'workplace',
      level: 'intermediate',
      userTags: ['市場營銷']
    },
    {
      id: 'b-beginner-fundraising-email-ngo',
      titleEn: 'Fundraising Email: Back Children to Classroom',
      titleZh: '籌款 Email：讓孩子在災區重返課室',
      descriptionEn: 'Workplace: compelling story with clear CTA.',
      descriptionZh: '職場應用：具感染力並有明確行動呼籲。',
      textEn: "You are a non‑profit copywriter. Write a fundraising email titled 'Let children return to classrooms in disaster areas' with an emotional story and a clear call‑to‑action.",
      textZh: '你係非牟利機構的文案人員，請撰寫一篇籌款 email，主題為「讓孩子在災區重返課室」，需具感染力與清晰 call-to-action。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-esg-netzero-brief',
      titleEn: 'Strategy Brief: Three Actions for Net‑zero Transition',
      titleZh: '策略簡報：碳中和轉型三大行動',
      descriptionEn: 'Workplace: actions and expected benefits.',
      descriptionZh: '職場應用：行動計劃與預期效益。',
      textEn: "You are an ESG consultant. Write a short strategy brief explaining three action plans for a company's net‑zero transition and expected benefits.",
      textZh: '你係一位 ESG 顧問，請撰寫一段策略簡報摘要，說明企業推動碳中和轉型的三大行動計劃與預期效益。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-analytics-findings-brief',
      titleEn: 'Internal Brief: User Behaviour Analysis Findings',
      titleZh: '內部簡報：使用者行為分析發現',
      descriptionEn: 'Workplace: summarise findings and recommendations.',
      descriptionZh: '職場應用：摘要發現與建議。',
      textEn: 'You are a data analyst. Write an internal brief summarising your latest user behaviour analysis findings and recommendations.',
      textZh: '你係數據分析師，請撰寫一份內部簡報內容，總結你最近一項使用者行為分析報告的發現與建議。',
      category: 'workplace',
      level: 'beginner',
      userTags: ['商業專業人士']
    },
    {
      id: 'b-beginner-fashion-series-plan',
      titleEn: 'Fashion Series Concept Plan',
      titleZh: '時裝系列企劃案',
      descriptionEn: 'Workplace: inspiration, theme style and positioning.',
      descriptionZh: '職場應用：靈感來源、主題風格與市場定位。',
      textEn: 'You are a fashion designer. Write a series concept plan for the new season: inspiration sources, theme style and market positioning.',
      textZh: '你係一位時裝設計師，請撰寫系列企劃案，介紹你新一季時裝設計靈感來源、主題風格與市場定位。',
      category: 'creative',
      level: 'beginner',
      userTags: ['創意專業人士']
    },
    // GEO Blog — Expert prompts
    {
      id: 'geo-expert-1500-ai-optimised-blog',
      titleEn: 'GEO‑Optimised 1,500‑Word Blog for AI Platforms',
      titleZh: 'GEO 優化 1,500 字 Blog（針對 AI 平台）',
      descriptionEn: 'Workplace: long‑tail Q&A subheads, FAQ schema and AI‑readable structure.',
      descriptionZh: '職場應用：長尾對話式小標、FAQ Schema、AI 易讀結構。',
      textEn: "Write a 1,500‑word GEO‑optimised blog on [topic/keyword]. Structure it for ChatGPT, Perplexity and Google SGE by: 1) using conversational, long‑tail question subheadings (H2/H3), 2) placing a concise answer preview at the start of each section, 3) adding an FAQ section formatted as Q&A suitable for FAQ schema, 4) surfacing key statistics/definitions in the first 150 words, 5) keeping sentences scannable for AI extraction.",
      textZh: '幫我寫一篇 1,500 字嘅 GEO 優化 Blog，主題係 [topic/keyword]，要針對 ChatGPT、Perplexity、Google SGE 設計：1）用對話式長尾問題做 H2/H3 小標，2）每段開頭先俾簡短答案，3）加入適合 FAQ Schema 嘅 Q&A 區，4）重要數據／定義放喺前 150 字，5）句子要易掃讀，方便 AI 抓取。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-brand-focused-blog',
      titleEn: 'GEO‑Focused Blog Balancing Authority and Snippets',
      titleZh: 'GEO 專注 Blog：兼顧權威長文與精華短答',
      descriptionEn: 'Workplace: mix in‑depth authority with short answers and schema tips.',
      descriptionZh: '職場應用：結合長篇權威內容、短答精華與結構化數據建議。',
      textEn: 'Write a GEO‑focused blog about [product/service]. Balance an authoritative longform body with concise answer snippets for AI. Include: 1) short, quotable answers ahead of detail, 2) suggestions for suitable structured data (e.g., Product/Article/FAQ schema), 3) clear brand mentions at natural points to improve attribution by AI systems.',
      textZh: '寫一篇關於 [product/service] 嘅 GEO 專注 Blog：同時包含權威長文與精華短答。要求：1）重點答案先行再解釋細節，2）提出可用嘅結構化數據建議（如 Product／Article／FAQ Schema），3）自然加入品牌提及，提升被 AI 引用機會。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-outline-multi-platform',
      titleEn: 'GEO Blog Outline for ChatGPT, Perplexity and Google SGE',
      titleZh: 'GEO Blog 大綱（對應 ChatGPT／Perplexity／Google SGE）',
      descriptionEn: 'Workplace: hook, platform‑specific strategies, sources and AI CTA.',
      descriptionZh: '職場應用：吸引開場、平台優化策略、權威來源、AI 曝光 CTA。',
      textEn: 'Create an outline for a GEO blog on [topic] including: 1) a compelling hook/opening, 2) optimisation strategy sections tailored to ChatGPT, Perplexity and Google SGE, 3) a list of authoritative sources to cite, 4) a call‑to‑action geared to improve visibility and citations across AI platforms.',
      textZh: '為 [topic] 整一個 GEO Blog 大綱：1）有吸引力嘅開場，2）分別針對 ChatGPT、Perplexity、Google SGE 嘅優化策略小節，3）權威來源引用清單，4）提高 AI 平台曝光與被引用嘅行動呼籲。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-audit-longtail-eat-schema',
      titleEn: 'GEO Audit: Long‑tail, Schema Opportunities and E‑A‑T',
      titleZh: 'GEO 檢查：長尾關鍵字／Schema 機會／E‑A‑T',
      descriptionEn: 'Workplace: produce a prioritised fix list for GEO quality.',
      descriptionZh: '職場應用：輸出優先修正清單，提升 GEO 質素。',
      textEn: 'Audit the following blog for GEO quality. Identify gaps in conversational long‑tail keyword usage, structured data opportunities (FAQ/Product/Article) and E‑A‑T signals (expertise, author credentials, citations). Provide a prioritised remediation list. Content: [paste blog].',
      textZh: '檢查以下 Blog 嘅 GEO 優化質素：找出對話式長尾關鍵字不足、可加入嘅結構化數據（FAQ／Product／Article）機會、同 E‑A‑T 訊號（專業度／作者資歷／引用）不足之處，並提供優先修正清單。內容：『[貼上 Blog]』。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-ai-citation-readiness',
      titleEn: 'AI Citation Readiness Review',
      titleZh: 'AI 引用準備程度檢查',
      descriptionEn: 'Workplace: direct answers, schema‑friendly Q&A and surfaced data.',
      descriptionZh: '職場應用：直接回答、Schema 兼容 Q&A、重要數據前置。',
      textEn: 'Analyse this blog for AI citation readiness: 1) Does it directly answer user questions? 2) Does it contain schema‑compatible Q&A? 3) Are key statistics/figures surfaced early for extraction? Conclude with pass/fail and improvement advice. Content: [paste blog].',
      textZh: '分析呢篇 Blog 嘅 AI 引用準備程度：1）有冇直接回答用戶問題？2）有冇包含兼容 Schema 嘅問答內容？3）有冇將重要數據／統計放前面方便 AI 提取？最後俾出通過／不通過評估與改善建議。內容：『[貼上 Blog]』。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-multi-platform-compliance',
      titleEn: 'GEO Compliance Across ChatGPT, Perplexity and Google SGE',
      titleZh: '跨平台 GEO 最佳實踐檢核（ChatGPT／Perplexity／SGE）',
      descriptionEn: 'Workplace: produce a summary score table and notes.',
      descriptionZh: '職場應用：輸出總結評分表與改善重點。',
      textEn: 'Evaluate this blog against GEO best practices per platform: 1) ChatGPT brand mention cadence, 2) Perplexity community relevance/coverage, 3) Google SGE structured content requirements. Produce a summary score table with notes. Content: [paste blog].',
      textZh: '評估呢篇 Blog 有冇符合不同平台嘅 GEO 最佳實踐：1）ChatGPT 品牌提及頻率，2）Perplexity 社群內容相關度，3）Google SGE 對結構化內容嘅要求。請輸出總結評分表與備註。內容：『[貼上 Blog]』。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-rewrite-to-geo-standard',
      titleEn: 'Rewrite Blog to GEO Standard (Question Subheads + Answers First)',
      titleZh: '改寫至 GEO 標準（問句小標＋答案先行）',
      descriptionEn: 'Workplace: convert headings, prepend answers and add FAQ schema content.',
      descriptionZh: '職場應用：小標改問句、段落前置答案、補 FAQ Schema 內容。',
      textEn: 'Rewrite the following blog to meet GEO standards: 1) convert subheadings into question form, 2) place a concise core answer at the start of each section, 3) add FAQ‑schema‑ready Q&A, 4) weave in natural brand mentions. Content: [paste blog].',
      textZh: '幫我將以下 Blog 改到符合 GEO 標準：1）小標改成問題形式，2）每段開頭先放核心答案，3）加入適合 FAQ Schema 嘅 Q&A，4）自然加入品牌提及。內容：『[貼上 Blog]』。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-boost-ai-visibility',
      titleEn: 'Boost AI Visibility: Stats, Expert Quotes and Freshness',
      titleZh: '提升 AI 可見度：數據、專家引述與新鮮度',
      descriptionEn: 'Workplace: add authoritative stats, quotes and recent updates.',
      descriptionZh: '職場應用：加入權威統計、專家引述與最新資料。',
      textEn: 'Enhance the following blog to increase AI visibility: add authoritative statistics, expert quotations and the latest updates; keep semantics clear and structure easy for AI to parse. Content: [paste blog].',
      textZh: '提升以下 Blog 嘅 AI 可見度：加多啲權威統計數據、專家引述同最新資料；同時保持語義清晰、版面結構易俾 AI 抓取。內容：『[貼上 Blog]』。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-structured-data-first150',
      titleEn: 'Structured Data + First‑150 Rule (Reduce JS Reliance)',
      titleZh: '結構化數據＋前 150 字重點（減少 JS 依賴）',
      descriptionEn: 'Workplace: expand structured data, surface key info and cut JS.',
      descriptionZh: '職場應用：強化 Schema、前置關鍵資訊、減少 JS 依賴。',
      textEn: 'Optimise this blog for GEO: 1) strengthen structured data (FAQ/Product/Review as applicable), 2) surface key information within the first 150 words of each section, 3) reduce reliance on JavaScript for rendering critical content. Content: [paste blog].',
      textZh: '優化以下 Blog 嘅 GEO 表現：1）加強結構化數據（依情況加入 FAQ／Product／Review），2）每段前 150 字放關鍵資訊，3）減少對 JavaScript 嘅依賴以輸出關鍵內容。內容：『[貼上 Blog]』。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    },
    {
      id: 'geo-expert-repackage-longtail-freshness',
      titleEn: 'Repackage with Long‑tail Questions and Fresh Updates',
      titleZh: '長尾問句重包裝＋更新過時資訊',
      descriptionEn: 'Workplace: short answer first, then detail; update and refresh.',
      descriptionZh: '職場應用：先短答後詳解，並更新過時內容保持新鮮。',
      textEn: 'Repackage the blog on [topic] to improve GEO: inject long‑tail conversational questions as subheads, place a brief answer before detailed explanation, and update any outdated information so AI search engines consider it fresh. Content: [paste blog].',
      textZh: '重新包裝關於 [topic] 嘅 Blog：加入長尾對話式關鍵字做小標，先俾簡短答案再解釋細節，並更新過時資訊，確保對 AI 搜尋引擎保持新鮮。內容：『[貼上 Blog]』。',
      category: 'workplace',
      level: 'expert',
      userTags: ['SEO 專業人員', '市場營銷']
    }
  ];

  // 篩選器分類
  const filterCategories: FilterCategory[] = [
    {
      id: 'all',
      nameEn: 'All Prompts',
      nameZh: '全部 Prompt',
      icon: <Target className="w-5 h-5" />,
      count: allPrompts.length
    },
    {
      id: 'daily',
      nameEn: 'Daily Learning',
      nameZh: '日常學習',
      icon: <BookOpen className="w-5 h-5" />,
      count: allPrompts.filter(p => p.category === 'daily').length
    },
    {
      id: 'workplace',
      nameEn: 'Workplace Use',
      nameZh: '職場應用',
      icon: <Briefcase className="w-5 h-5" />,
      count: allPrompts.filter(p => p.category === 'workplace').length
    },
    {
      id: 'creative',
      nameEn: 'Creative Living',
      nameZh: '創意生活',
      icon: <Palette className="w-5 h-5" />,
      count: allPrompts.filter(p => p.category === 'creative').length
    }
  ];

  // 使用者角色分類
  const userRoles: UserRole[] = [
    {
      id: 'all',
      nameEn: 'All Users',
      nameZh: '全部用戶',
      count: allPrompts.length
    },
    {
      id: 'student',
      nameEn: 'Students',
      nameZh: '學生',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('學生'))).length
    },
    {
      id: 'insurance',
      nameEn: 'Insurance & Financial Planning',
      nameZh: '保險及理財策劃業',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('保險及理財策劃業'))).length
    },
    {
      id: 'marketing',
      nameEn: 'Marketing Professional',
      nameZh: '市場營銷',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('市場營銷'))).length
    },
    {
      id: 'business',
      nameEn: 'Business Professional',
      nameZh: '商業專業人士',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('商業') || tag.includes('專業人士') || tag.includes('策略顧問'))).length
    },
    {
      id: 'creator',
      nameEn: 'Creative Professional',
      nameZh: '創意專業人士',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('創意') || tag.includes('創作者') || tag.includes('品牌策略師'))).length
    },
    {
      id: 'parents',
      nameEn: 'Parents',
      nameZh: '家長',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('家長'))).length
    },
    {
      id: 'freelancer',
      nameEn: 'Freelancers',
      nameZh: '自由工作者',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('自由工作者'))).length
    },
    {
      id: 'startup',
      nameEn: 'Startup Founders',
      nameZh: '初創創業者',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('初創創業者'))).length
    },
    {
      id: 'retiree',
      nameEn: 'Retirees',
      nameZh: '退休人士',
      count: allPrompts.filter(p => p.userTags.some(tag => tag.includes('退休人士'))).length
    }
  ];

  // 篩選邏輯
  const filteredPrompts = allPrompts.filter(prompt => {
    const categoryMatch = selectedCategory === 'all' || prompt.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || prompt.level === selectedLevel;
    
    const userRoleMatch = selectedUserRole === 'all' || 
      (selectedUserRole === 'student' && prompt.userTags.some(tag => tag.includes('學生'))) ||
      (selectedUserRole === 'insurance' && prompt.userTags.some(tag => tag.includes('保險及理財策劃業'))) ||
      (selectedUserRole === 'marketing' && prompt.userTags.some(tag => tag.includes('市場營銷'))) ||
      (selectedUserRole === 'business' && prompt.userTags.some(tag => tag.includes('商業') || tag.includes('專業人士') || tag.includes('策略顧問'))) ||
      (selectedUserRole === 'creator' && prompt.userTags.some(tag => tag.includes('創意') || tag.includes('創作者') || tag.includes('品牌策略師'))) ||
      (selectedUserRole === 'parents' && prompt.userTags.some(tag => tag.includes('家長'))) ||
      (selectedUserRole === 'freelancer' && prompt.userTags.some(tag => tag.includes('自由工作者'))) ||
      (selectedUserRole === 'startup' && prompt.userTags.some(tag => tag.includes('初創創業者'))) ||
      (selectedUserRole === 'retiree' && prompt.userTags.some(tag => tag.includes('退休人士')));
    
    // 搜尋同時比對：標題、描述、正文，以及用戶標籤（含同義詞、跨中英）
    const queries = expandQuery(searchTerm);
    const haystack = [
      (language === 'zh-HK' ? prompt.titleZh : prompt.titleEn),
      (language === 'zh-HK' ? prompt.descriptionZh : prompt.descriptionEn),
      (language === 'zh-HK' ? prompt.textZh : prompt.textEn),
      // 原始 zh 標籤
      ...buildAugmentedTags(prompt),
      // 英文標籤映射
      ...buildAugmentedTags(prompt).map(t => userTagTranslations[t] || t)
    ].map(normalize);

    const searchMatch = !searchTerm || queries.some(q => haystack.some(h => h.includes(q)));
    
    return categoryMatch && levelMatch && userRoleMatch && searchMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPrompts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const displayedPrompts = filteredPrompts.slice(startIndex, startIndex + pageSize);

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    const add = (v: number | string) => {
      if (pages[pages.length - 1] !== v) pages.push(v);
    };
    add(1);
    if (currentPage > 4) add('...');
    for (let p = currentPage - 1; p <= currentPage + 1; p++) {
      if (p > 1 && p < totalPages) add(p);
    }
    if (currentPage < totalPages - 3) add('...');
    add(totalPages - 1);
    add(totalPages);
    // Deduplicate and sort order
    const unique = Array.from(new Set(pages));
    return unique.sort((a, b) => (a === '...' ? 0 : b === '...' ? 0 : (a as number) - (b as number)));
  };
  const copyToClipboard = async (text: string, promptId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptId);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert(language === 'zh-HK' ? '複製失敗，請手動複製' : 'Copy failed, please copy manually');
    }
  };
  return (
    <div ref={topRef} className="min-h-screen bg-[#121212] text-white pt-20">
      {/* 標題區域 */}
      <div className="bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Prompt Hub
          </h1>
          <p className="text-xl text-yellow-400 mb-2">
            {language === 'zh-HK' ? '為你的AI技能注入新威力' : 'Enhance Your AI Skills'}
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {language === 'zh-HK' 
              ? '探索我們專業設計的AI提示詞庫，提升工作效率'
              : 'Explore our professionally designed AI prompt library to boost your productivity'
            }
          </p>
        </div>
      </div>

      {/* 主要內容區域 */}
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* 左側篩選器 */}
        <div className="w-full lg:w-96 space-y-6">
          {/* 搜尋欄 */}
          <div className="bg-[#202020] rounded-xl p-4">
            <div className="relative text-base">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder={language === 'zh-HK' ? '   搜尋提示詞...' : '   Search prompts...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-sm md:text-base bg-[#0f0f0f] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Prompt類型篩選 */}
          <div className="bg-[#202020] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-yellow-400">
                {language === 'zh-HK' ? 'Prompt類型' : 'Prompt Categories'}
              </h3>
            </div>
              <div className="space-y-2">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-start gap-4 px-4 py-4 rounded-lg transition-all min-w-0 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-400 text-black'
                      : 'bg-[#161616] text-gray-300 hover:bg-[#2a2a2a]'
                  }`}
                >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                    {category.icon}
                      <span className={`font-medium leading-snug block ${language === 'zh-HK' ? 'whitespace-nowrap' : 'truncate'}`}>
                        {language === 'zh-HK' ? category.nameZh : category.nameEn}
                      </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 用戶角色篩選 */}
          <div className="bg-[#202020] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-yellow-400">
                {language === 'zh-HK' ? '用戶角色' : 'User Roles'}
              </h3>
            </div>
              <div className="space-y-2">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedUserRole(role.id)}
                    className={`w-full flex items-center justify-start gap-4 px-4 py-4 rounded-lg transition-all min-w-0 ${
                    selectedUserRole === role.id
                      ? 'bg-yellow-400 text-black'
                      : 'bg-[#161616] text-gray-300 hover:bg-[#2a2a2a]'
                  }`}
                >
                    <span className={`font-medium leading-snug block ${language === 'zh-HK' ? 'whitespace-nowrap' : 'truncate'}`}>
                      {language === 'zh-HK' ? role.nameZh : role.nameEn}
                    </span>
                </button>
              ))}
            </div>
          </div>

          {/* 難度等級篩選 */}
          <div className="bg-[#202020] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-yellow-400">
                {language === 'zh-HK' ? '難度等級' : 'Difficulty Level'}
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { id: 'all', nameEn: 'All Levels', nameZh: '全部等級' },
                { id: 'beginner', nameEn: 'Beginner', nameZh: '入門' },
                { id: 'intermediate', nameEn: 'Intermediate', nameZh: '進階' },
                { id: 'expert', nameEn: 'Expert', nameZh: '專家' }
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedLevel === level.id
                      ? 'bg-yellow-400 text-black'
                      : 'bg-[#161616] text-gray-300 hover:bg-[#2a2a2a]'
                  }`}
                >
                  {language === 'zh-HK' ? level.nameZh : level.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* 右側卡片網格 */}
        <div className="flex-1">
          {/* 結果統計 */}
          <div className="mb-6">
            <p className="text-gray-400">
              {language === 'zh-HK' 
                ? `顯示 ${filteredPrompts.length} 個提示詞` 
                : `Showing ${filteredPrompts.length} prompts`
              }
              {searchTerm && (
                <span className="text-yellow-400 ml-2">
                  {language === 'zh-HK' 
                    ? `包含「${searchTerm}」` 
                    : `containing "${searchTerm}"`
                  }
                </span>
              )}
            </p>
          </div>
          {/* Prompt卡片列表 - Threads風格 */}
          <div className="space-y-4">
            {displayedPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-[#202020] rounded-xl p-4 md:p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
                {/* 上半部：標題、描述、標籤 - 緊湊排列 */}
                <div className="mb-4">
                  {/* 標題和特色標籤 */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-yellow-400 leading-tight pr-3">
                      {language === 'zh-HK' ? prompt.titleZh : prompt.titleEn}
                    </h3>
                    {prompt.featured && (
                      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                        {language === 'zh-HK' ? '推薦' : 'Featured'}
                      </span>
                    )}
                  </div>

                  {/* 描述 */}
                  <p className="text-gray-300 text-base mb-3 leading-relaxed">
                    {language === 'zh-HK' ? prompt.descriptionZh : prompt.descriptionEn}
                  </p>

                  {/* 用戶標籤 */}
                  <div className="flex flex-wrap gap-2">
                    {buildAugmentedTags(prompt).map((tag, index) => {
                      const tagText = language === 'zh-HK' ? tag : (userTagTranslations[tag] || tag);
                      return (
                        <span key={index} className="bg-[#161616] text-yellow-400 text-sm px-3 py-1 rounded-full border border-yellow-400/30">
                          {tagText}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Prompt文字完整顯示 */}
                <div className="bg-[#161616] p-5 md:p-6 rounded-lg border-l-4 border-yellow-400 mb-4">
                  <p className="text-gray-200 text-lg font-mono leading-relaxed whitespace-pre-wrap">
                    {language === 'zh-HK' ? prompt.textZh : prompt.textEn}
                  </p>
                </div>

                {/* 複製按鈕 - 位於prompt下方 */}
                <div className="flex justify-end">
                  <button
                    onClick={() => copyToClipboard(
                      language === 'zh-HK' ? prompt.textZh : prompt.textEn,
                      prompt.id
                    )}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      copiedPrompt === prompt.id
                        ? 'bg-green-600 text-white border-2 border-green-600'
                        : 'bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPrompt === prompt.id 
                      ? (language === 'zh-HK' ? '已複製!' : 'Copied!') 
                      : (language === 'zh-HK' ? '複製提示詞' : 'Copy Prompt')
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 分頁控制 */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3 select-none">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                  currentPage === 1
                    ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                    : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                }`}
              >
                ←
              </button>
              {/* Numbers with ellipsis */}
              {getVisiblePages().map((p, idx) =>
                p === '...'
                  ? (
                    <span key={`dots-${idx}`} className="px-2 text-gray-400">…</span>
                  ) : (
                    <button
                      key={`page-${p}`}
                      onClick={() => setCurrentPage(p as number)}
                      className={`min-w-[44px] h-11 px-4 rounded-xl border text-base font-medium transition-all duration-200 ${
                        currentPage === p
                          ? 'bg-yellow-400 text-black border-yellow-400'
                          : 'bg-transparent text-white border-gray-700 hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {p}
                    </button>
                  )
              )}
              {/* Next */}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                    : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                }`}
              >
                →
              </button>
            </div>
          )}

          {/* 無結果提示 */}
          {filteredPrompts.length === 0 && (
            <div className="text-center py-16">
              <Lightbulb className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {language === 'zh-HK' ? '沒有找到相關提示詞' : 'No prompts found'}
              </h3>
              <p className="text-gray-500">
                {language === 'zh-HK' ? '請嘗試調整篩選條件或搜尋關鍵字' : 'Try adjusting your filters or search terms'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptHub;