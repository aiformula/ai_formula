import { CourseData } from '@/components/course-template/types';

export const promptEngineeringExpertCourseData: CourseData = {
  courseInfo: {
    badge: '付費・高階',
    badgeEn: 'Paid · Expert',
    title: '精通提示工程：專家級應用的終極課程',
    titleEn: 'Prompt Engineering Mastery: Ultimate Expert Course',
    subtitle: '以導演級心智模型構建系統級提示，掌握推理、安全與智能體工作流',
    subtitleEn: 'Build system‑level prompts with a director‑level mental model; master reasoning, safety and agentic workflows',
    description: '本課程面向高階用戶，從心智模型、系統提示、進階推理到治理與評測，完整打造「可控、可靠、可擴展」的企業級提示工程能力。',
    descriptionEn: 'For expert users: from mental models and system prompts to advanced reasoning, governance and evaluation, build controllable, reliable and scalable enterprise‑grade prompting capability.',
    instructor: 'AI Formula 專家團隊',
    instructorEn: 'AI Formula Expert Team',
    instructorTitle: '提示工程與智能體系統',
    instructorTitleEn: 'Prompt Engineering & Agent Systems',
    language: 'zh-HK',
    level: 'expert',
    levelEn: 'Expert',
    duration: '10+ 小時',
    durationEn: '10+ hours',
    totalLessons: 22,
    totalHours: 10,
    students: 0,
    tags: ['提示工程', '系統提示', '智能體', '安全與治理'],
    tagsEn: ['Prompt Engineering', 'System Prompting', 'Agents', 'Safety & Governance'],
    prerequisites: ['完成基礎課程或具相當經驗', '熟悉 ChatGPT/Perplexity 等工具'],
    prerequisitesEn: ['Complete foundations or equivalent experience', 'Familiar with ChatGPT/Perplexity'],
    learningOutcomes: [
      '以導演視角設計系統提示與範本',
      '運用 CoT/ToT/自我一致性打造可靠推理',
      '建立安全護欄與評測體系，降低幻覺風險',
      '設計 Agent 工作流與工具調用策略'
    ],
    learningOutcomesEn: [
      'Design system prompts and templates with a director mindset',
      'Use CoT/ToT/Self‑Consistency for reliable reasoning',
      'Build guardrails and evaluation to reduce hallucinations',
      'Design agent workflows and tool‑use strategies'
    ]
  },

  courseStats: { totalHours: 10, totalLessons: 22, totalQuizzes: 4, completionRate: 90 },

  targetAudience: ['高階個人用戶', '企業內 AI 項目負責人', '產品經理／資料科學家'],
  targetAudienceEn: ['Advanced individuals', 'Enterprise AI leads', 'PMs / Data Scientists'],

  courseModules: [
    {
      id: 1,
      title: '第一部分：提示工程基礎 — 與AI溝通的藝術與科學',
      titleEn: 'Part 1: Foundations — The Art and Science of Prompting',
      description: '以心智模型理解 LLM；從場記到導演的轉變；基礎到工程化的提示對比與範例。',
      descriptionEn: 'Mental models for LLMs; from runner to director; engineered prompts vs naïve prompts with examples.',
      duration: '120 分鐘',
      durationEn: '120 minutes',
      lessons: [
        {
          id: 101,
          title: '1.1 什麼是提示工程？（導演級心智模型）',
          titleEn: '1.1 What is Prompt Engineering? (Director‑level Mental Model)',
          duration: '45 分鐘',
          durationEn: '45 minutes',
          type: 'interactive',
          description: '把提示視為「設定系統初始條件」；從場記到導演的類比；示範初階 vs 工程化提示。',
          descriptionEn: 'View prompts as initial condition setting; runner→director analogy; naïve vs engineered prompts.',
          image: '/images/courses/prompt-engineering/unit-images/foundations.png',
          imageAlt: '提示工程基礎',
          transcript: '核心心智模型：LLM 並唔係全知全能嘅「神諗」，而係一個按機率續寫嘅語言系統。Prompt = 設定系統嘅初始條件，同故事開頭一樣，會主導之後風格與走向。好嘅提示工程師，就似導演——提供劇本（指令）、場景（情境）、角色（Persona）同示範（範例），而唔係一句「隨便演」。\n\n範例對比：\n[初階/模糊提示]：\n「請寫一些關於電動車的內容。」→ 可能輸出正確但冇重點，價值密度低。\n\n[工程化/導演式提示]：\n# 角色：你係生活風格雜誌嘅專業汽車評論家\n# 任務：500字，向未接觸過電動車嘅讀者介紹三大優勢＋三大挑戰\n# 寫作要求：語氣輕鬆；先優勢後挑戰；Markdown 標題＋項目符號\n→ 輸出結構清晰、針對性強、可直接使用。\n\n表格示例：\n| 要素 | 比喻 | 作用 |\n| --- | --- | --- |\n| 指令 | 劇本 | 定義任務與交付 |\n| 情境 | 場景 | 提供上下文與限制 |\n| 角色 | 演員設定 | 錨定語氣與風格 |\n| 範例 | 樣板戲 | 規範結構與格式 |\n| 格式 | 舞台規格 | 提升可用度與一致性 |',
          keyPoints: [
            'LLM 係機率續寫系統；Prompt = 設定初始條件',
            '由「場記」變做「導演」：清楚定義指令、情境、角色、範例同格式',
            '工程化提示帶嚟：結構明確、輸出可控、即用型價值',
            '任務前定準則＞事後修飾'
          ]
        },
        {
          id: 102,
          title: '1.2 為何提示工程至關重要？（商業價值與安全）',
          titleEn: '1.2 Why Prompt Engineering Matters (Business Value & Safety)',
          duration: '40 分鐘',
          durationEn: '40 minutes',
          type: 'interactive',
          description: '精準可控、釋放潛能、人機協作、倫理與護欄；防幻覺與引用要求範例。',
          descriptionEn: 'Precision/control, potential, HCI, ethics/guardrails; anti‑hallucination with citation requirements.',
          image: '/images/courses/prompt-engineering/unit-images/value-safety.png',
          imageAlt: '價值與安全',
          transcript: '商業價值：喺企業環境，「差不多」=「唔啱」。提示工程令輸出由隨意創作變為可以驗收嘅交付。透過 CoT/自我一致性等進階策略，可以釋放 LLM 隱藏能力（推理、規劃、創造）。人機協作方面，提示模板令唔識寫程式嘅專家（律師/醫生/營銷）都可以高效使用 AI。\n\n安全與倫理：提示工程係第一道護欄。\n[防幻覺範例]：\n不安全：『總結 ACME 2024 Q1 財報。』→ 可能亂編。\n安全：『根據以下 ACME 2024 Q1 財報原文，總結營收/淨利/毛利率；如未提及，請標示「資訊未提供」。\n\n[倫理範例]：\n有偏見：『典型電腦工程師係點？』→ 或觸發刻板印象。\n安全：『請描述成功電腦工程師需要嘅專業技能與個人特質（性別與背景中立）。』\n\n表格示例：\n| 目標 | 風險 | 提示對策 |\n| --- | --- | --- |\n| 提高精準度 | 幻覺 | 僅限提供資料作答＋引用 |\n| 提升可用性 | 結構混亂 | 指定格式/模板/字數 |\n| 符合倫理 | 偏見/不當 | 設定角色＋中立原則 |',
          keyPoints: [
            '提高精準度與可控性，從「創作」變「交付」',
            '進階提示策略釋放模型潛能（CoT/一致性等）',
            '提示模板＝非程式人員嘅工作橋樑',
            '提示工程係安全與倫理嘅第一道護欄'
          ]
        },
        {
          id: 103,
          title: '1.3 發展簡史：從指令到對話，再到智能體',
          titleEn: '1.3 Brief History: From Instructions to Dialogue to Agents',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive',
          description: 'Transformer、GPT‑3、CoT、ReAct/Agents 時軸與關鍵詞變遷。',
          descriptionEn: 'Timeline of Transformer, GPT‑3, CoT, ReAct/Agents with interaction pattern keywords.',
          image: '/images/courses/prompt-engineering/unit-images/history.png',
          imageAlt: '發展簡史',
          transcript: '人機互動範式轉變：\n• 規則/統計時代：人寫晒規則，機器被動執行。\n• Transformer（2017）：學懂語言深層結構，成為轉折點。\n• 微調時代：用大量標註數據改造模型，成本高。\n• GPT‑3 與上下文學習：喺對話框示範幾個例子就能學，門檻大降。\n• 智能體：不只回應，仲會「行動」（工具調用/檢索/上網）。\n建議畫一條時間軸：ELIZA → Transformer → BERT → GPT‑3 → CoT → ReAct/Agents，並標註每個時期核心互動模式關鍵詞。\n\n表格示例：\n| 時期 | 代表技術 | 互動模式關鍵詞 |\n| --- | --- | --- |\n| 規則/統計 | ELIZA/規則庫 | 匹配/模板 |\n| 深度表徵 | Transformer/BERT | 表徵學習 |\n| 上下文學習 | GPT‑3 | Few‑shot/指令跟隨 |\n| 推理與行動 | CoT/ReAct/Agents | 分步推理/工具使用 |',
          keyPoints: [
            '由規則驅動到深度學習的語言理解',
            '從微調到上下文學習，部署成本大降',
            '近年重點：推理與行動（Agents, Tool Use）'
          ]
        },
        {
          id: 104,
          title: '1.4 提示的基本構成：指令／情境／角色／範例／格式',
          titleEn: '1.4 Prompt Components: Instruction/Context/Persona/Examples/Format',
          duration: '15 分鐘',
          durationEn: '15 minutes',
          type: 'interactive',
          description: '以房屋比喻拆解提示食譜；逐步構建與對照示例。',
          descriptionEn: 'House analogy; step‑by‑step recipe with contrasted examples.',
          image: '/images/courses/prompt-engineering/unit-images/components.png',
          imageAlt: '提示構成',
          transcript: '提示食譜（房屋比喻）：\n• 指令＝設計藍圖（要做咩）\n• 情境＝地基/材料（根據乜嘢）\n• 角色＝施工團隊專業（由邊個做）\n• 範例＝樣板屋（做出嚟應該點）\n• 格式＝交付規格（以乜形式出）\n\n逐步構建例子（總結任務）：\n1) 只有指令：「總結一下」→ 模型困惑\n2) 加情境：提供文章 → 得到通用摘要\n3) 加角色：環保活動家語氣 → 焦點與語氣改變\n4) 加格式：三點條列，每點<30字 → 可用性提升\n5) 加範例：指定「問題-影響-行動」結構 → 完全遵循新格式\n\n表格示例：\n| 元素 | 問題 | 好做法 |\n| --- | --- | --- |\n| 指令 | 模糊 | 具體動詞＋交付標準 |\n| 情境 | 缺上下文 | 提供來源/限制 |\n| 角色 | 泛化 | 精準 persona |\n| 範例 | 無示範 | 1–3 個高質例子 |\n| 格式 | 無規格 | JSON/表格/條列 |',
          keyPoints: [
            '五大元素齊備先至穩定可控',
            '格式化輸出＝可用度倍增',
            '範例能處理新穎/複雜格式'
          ]
        },
        {
          id: 105,
          title: '1.5 提示工程 vs. 模型微調：決策指南',
          titleEn: '1.5 Prompting vs Fine‑tuning: Decision Guide',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive',
          description: '速度／成本／數據量／穩定性／知識更新；混合策略案例（律所）。',
          descriptionEn: 'Speed/cost/data/stability/knowledge update; hybrid strategy case (law firm).',
          image: '/images/courses/prompt-engineering/unit-images/prompt-vs-finetune.png',
          imageAlt: '提示 vs 微調',
          transcript: '策略選擇心法：\n• 提示工程＝俾全能助理清晰指令：快、平、靈活；適合通用知識、快速迭代、數據少或無、需結合最新外部資料（RAG）。\n• 微調＝送助理去長期內訓：穩定、專業；適合大量私有術語、固定風格、數據充足、週期較長嘅任務。\n\n決策表：\n任務類型｜多樣創意/原型→Prompt；大量專有術語/固定風格→Finetune\n數據量｜少→Prompt；多（千級以上）→Finetune\n速度｜要即時→Prompt；可接受數天/週→Finetune\n成本｜有限→Prompt；有 GPU/標註預算→Finetune\n知識更新｜要用最新資訊/可用 RAG→Prompt；知識穩定→Finetune\n\n混合策略：律所微調模型內化多年案例與術語；日常由提示工程驅動，按「專精於專利侵權」等 Persona 與範本快速出稿。\n\n表格示例：\n| 場景 | 更適合 | 核心原因 |\n| --- | --- | --- |\n| 無大量標註數據、要快嘗試 | Prompt | 低成本、快迭代 |\n| 需固定專業風格/術語 | Finetune | 穩定一致、內化知識 |\n| 要最新外部信息 | Prompt+RAG | 檢索增強、避免過時 |',
          keyPoints: [
            'Prompt：快、平、數據少、要最新資訊',
            'Finetune：穩定、專業、數據多、風格固定',
            'RAG/Prompt/Finetune 可混搭落地'
          ]
        }
      ]
    },
    {
      id: 2,
      title: '第二部分：核心提示技巧與最佳實踐 — 精準駕馭語言模型',
      titleEn: 'Part 2: Core Prompting Techniques & Best Practices — Precisely Steering LLMs',
      description: '把第一部分的「道」落地成可操作的「術」：零/單/少樣本、清晰指令、結構化輸出、角色扮演與參數控制。',
      descriptionEn: 'Turn principles into practice: zero/one/few‑shot, clear instructions, structured outputs, persona prompting and parameter control.',
      duration: '160 分鐘',
      durationEn: '160 minutes',
      lessons: [
        {
          id: 201,
          title: '2.1 基礎提示法：零樣本、單樣本與少樣本',
          titleEn: '2.1 Zero‑shot, One‑shot and Few‑shot Prompting',
          duration: '35 分鐘',
          durationEn: '35 minutes',
          type: 'interactive',
          description: '理解示範數量如何改變模型行為；用高質多樣的範例定義任務邊界。',
          descriptionEn: 'Understand how number/quality of demonstrations shape behaviour; define task boundaries via diverse exemplars.',
          image: '/images/courses/prompt-engineering/unit-images/shot-strategies.png',
          imageAlt: '零/單/少樣本策略',
          imageAltEn: 'Zero/One/Few‑shot strategies',
          transcript: `核心觀念：LLM 是強大的模式學習者。與其長篇描述，不如直接示範。\n\n• 零樣本：純指令，適合簡單通用任務。\n• 單樣本：用一個例子「校準」格式與風格。\n• 少樣本：以多例沉浸式示範，明確規則、邊界與輸出樣態。\n\n情感分析範例：\n(零樣本) 指令：將下列句子分類為「正面/負面/中立」。句子：「這家餐廳的服務態度還有很大的進步空間。」→ 負面\n(單樣本) 先給「今天的陽光真好。」→ 正面，再給目標句 → 負面\n(少樣本) 擴展標籤為「非常滿意/基本滿意/中立/有點不滿/極度不滿」，用多例校準，目標句「特效還行吧。」→ 基本滿意。\n\n表格示例：\n| 策略 | 示範數量 | 典型用途 | 輸出穩定度 |\n| --- | --- | --- | --- |\n| 零樣本 | 0 | 簡單通用任務 | 中 |\n| 單樣本 | 1 | 校準輸出格式 | 中高 |\n| 少樣本 | 2–5 | 定義規則/風格/邊界 | 高 |`,
          transcriptEn: `Core idea: LLMs are pattern learners. Prefer showing over telling.\n\n• Zero‑shot: instruction only for simple, generic tasks.\n• One‑shot: one exemplar to calibrate format/tone.\n• Few‑shot: multiple diverse exemplars to define rules and task boundaries.\n\nSentiment examples: zero‑shot (negative), one‑shot (calibrates format), few‑shot (finer labels; "effects are okay" → mildly positive).`,
          keyPoints: [
            '示範數量與質量直接影響輸出品質',
            '單樣本可快速校準輸出格式',
            '少樣本用多樣例定義更細緻的標準'
          ],
          keyPointsEn: [
            'Number/quality of exemplars drive output quality',
            'One‑shot quickly calibrates output format',
            'Few‑shot defines fine‑grained criteria via diverse examples'
          ]
        },
        {
          id: 202,
          title: '2.2 清晰指令的黃金法則',
          titleEn: '2.2 Golden Rules for Clear Instructions',
          duration: '30 分鐘',
          durationEn: '30 minutes',
          type: 'interactive',
          description: '以具體、正向、可執行的語言消除歧義；把複雜任務拆成可檢查的步驟。',
          descriptionEn: 'Eliminate ambiguity with specific, positive, actionable language; decompose complex tasks into checkable steps.',
          image: '/images/courses/prompt-engineering/unit-images/clarity.png',
          imageAlt: '清晰指令原則',
          imageAltEn: 'Clarity principles',
          transcript: `法則一：具體、明確、直接。例：明確產品、結構、語氣與 CTA。\n法則二：用「要做什麼」取代「不要做什麼」。例：用「謙虛誠懇、讓大學生能懂」取代「不要太驕傲」。\n法則三：任務分解。將「找對手＋分析＋擬口號」切成三步鏈式執行。\n\n表格示例：\n| 反面指令 | 問題 | 正面改寫 |\n| --- | --- | --- |\n| 不要太專業 | 含糊 | 用淺白語言，避免行業術語 |\n| 寫啲文案 | 目標不清 | 為產品X寫三段式貼文（痛點/成分/CTA） |\n| 不要長 | 評估困難 | 每段≤60字，總長≤180字 |`,
          transcriptEn: `Rule 1: Be specific and direct (product, structure, tone, CTA).\nRule 2: Prefer positive do‑instructions over negative don’ts.\nRule 3: Decompose into steps (list competitors → analyse pros/cons → craft differentiated slogan).`,
          keyPoints: ['用正向指令降低歧義', '提供評估標準與交付格式', '鏈式任務更穩定可控'],
          keyPointsEn: ['Use positive directives', 'Provide evaluation criteria and format', 'Chained subtasks improve stability']
        },
        {
          id: 203,
          title: '2.3 格式化與結構化：分隔符、標籤與範本',
          titleEn: '2.3 Formatting & Structuring: Delimiters, Tags and Templates',
          duration: '35 分鐘',
          durationEn: '35 minutes',
          type: 'interactive',
          description: '用 Markdown/XML/JSON 等結構為模型提供「元信息」，提升理解與可控性。',
          descriptionEn: 'Use Markdown/XML/JSON to convey meta‑information for better understanding and controllability.',
          image: '/images/courses/prompt-engineering/unit-images/structure.png',
          imageAlt: '結構化提示',
          imageAltEn: 'Structured prompting',
          transcript: `示例：\n• 分隔符：\n### 指令 ### / ### 上下文 ### / ### 問題 ### → 更清晰的訊號。\n• XML 標籤：<task>/<document>/<question> 明確責任段落。\n• 預填充：先輸出「這是您要求的 JSON：{」提高 JSON 成功率。\n\n表格示例：\n| 元素 | 用途 | 小貼士 |\n| --- | --- | --- |\n| ### 區塊 | 分隔任務段落 | 固定順序：指令→上下文→問題 |\n| XML 標籤 | 嚴格結構 | 嵌套時保持閉合 |\n| JSON 預填 | 穩定機器可讀 | 先輸出鍵名骨架 |`,
          transcriptEn: `Examples:\n• Delimiters: headings for Instruction/Context/Question.\n• XML tags to scope responsibilities.\n• Prefill: start the JSON skeleton to increase valid JSON completion rates.`,
          keyPoints: ['結構化等同於向模型加粗重點', '標籤可隔離來源與任務', '預填充可提升格式穩定性'],
          keyPointsEn: ['Structure highlights intent', 'Tags isolate sources/tasks', 'Prefill boosts format stability']
        },
        {
          id: 204,
          title: '2.4 角色扮演：最大化情境相關性',
          titleEn: '2.4 Persona Prompting: Maximising Context Relevance',
          duration: '30 分鐘',
          durationEn: '30 minutes',
          type: 'interactive',
          description: '用情境錨定激活特定知識子集；角色越具體，輸出越可控。',
          descriptionEn: 'Use contextual anchoring to activate domain subsets; more specific persona → more controllable outputs.',
          image: '/images/courses/prompt-engineering/unit-images/persona.png',
          imageAlt: '角色扮演提示',
          imageAltEn: 'Persona prompting',
          transcript: `無角色→通用定義；老師→比喻增多；精準角色（例如「用樂高解釋區塊鏈給行銷人」）→ 高度貼合、語氣一致、可控性強。\n\n表格示例：\n| 角色 | 受眾 | 語氣 | 成果格式 |\n| --- | --- | --- | --- |\n| 科普作家 | 大眾 | 親切易明 | 條列摘要 |\n| 資深工程師 | 技術 | 精準嚴謹 | 架構圖＋代碼片段 |\n| 管理顧問 | CEO | 簡潔決策導向 | 3要點執行摘要 |`,
          transcriptEn: `No persona → generic; teacher → more analogies; precise persona (e.g., "explain blockchain with LEGO to marketers") → highly aligned and controllable.`,
          keyPoints: ['角色=情境錨定', '指定受眾/語氣/比喻', '越具體越好'],
          keyPointsEn: ['Persona = contextual anchoring', 'Specify audience/tone/metaphor', 'Specificity wins']
        },
        {
          id: 205,
          title: '2.5 參數控制：Temperature、Top_p、Stop、Penalty',
          titleEn: '2.5 Parameter Control: Temperature, Top_p, Stop, Penalties',
          duration: '30 分鐘',
          durationEn: '30 minutes',
          type: 'interactive',
          description: '把「方向」與「方式」分離：提示定方向，參數控風險/多樣性/長度/重複度。',
          descriptionEn: 'Separate direction vs style: prompts set direction; parameters control risk/diversity/length/repetition.',
          image: '/images/courses/prompt-engineering/unit-images/parameters.png',
          imageAlt: '生成參數',
          imageAltEn: 'Generation parameters',
          transcript: `• Temperature：創意旋鈕（低=穩定；高=發散）。\n• Top_p：核心採樣（候選池大小）。\n• Stop：遇到序列即停止。\n• Frequency/Presence penalty：抑制重複。\n示例：固定提示下，T=0.1 → 標準口號；T=1.2 → 具詩意創意。Stop=['4.'] 限制清單長度。\n\n表格示例：\n| 參數 | 功能 | 低值效果 | 高值效果 | 推薦用途 |\n| --- | --- | --- | --- | --- |\n| Temperature | 隨機性/創意 | 保守穩定 | 多樣創意 | 腦暴↑/事實↓ |\n| Top_p | 候選池大小 | 嚴選 | 多樣但可控 | 安全創意 |\n| Stop | 早停控制 | 精準止出 | — | 控格式/長度 |\n| Penalties | 反重複 | 允許重複 | 抑制重複 | 長文避免囉嗦 |`,
          transcriptEn: `• Temperature: creativity knob (low=stable; high=diverse).\n• Top_p: nucleus sampling (candidate pool).\n• Stop: halt on sequence.\n• Frequency/Presence penalties: reduce repetition.\nExample: same prompt, T=0.1 → safe slogan; T=1.2 → poetic; Stop=['4.'] to cap list length.`,
          keyPoints: ['提示定方向、參數定風格', '以實驗曲線找到任務最佳區間', '與產品環境一致化設定'],
          keyPointsEn: ['Prompts set direction, params set style', 'Find task‑optimal ranges empirically', 'Align settings with production']
        }
      ],
      quiz: {
        title: '第二部分測驗：核心技巧與最佳實踐',
        titleEn: 'Part 2 Quiz: Core Techniques & Best Practices',
        description: '評估你對零/單/少樣本、清晰指令、結構化、角色與參數的掌握。',
        descriptionEn: 'Assess mastery of shot strategies, clarity, structuring, persona and parameters.',
        timeLimit: 20,
        passingScore: 80,
        questions: [
          {
            id: 2011,
            question: '何時應優先使用「少樣本」？',
            questionEn: 'When should you prefer few‑shot?',
            type: 'single',
            options: [
              '任務極為簡單，無需示範',
              '需要更細緻標準與固定格式的任務',
              '只想提高隨機性',
              '限制輸出長度'
            ],
            optionsEn: [
              'Task is trivial; no demo needed',
              'Tasks needing fine‑grained criteria and fixed formats',
              'Only to increase randomness',
              'To limit output length'
            ],
            correctAnswer: 1,
            explanation: '少樣本可用多例定義規則與格式，明確任務邊界。',
            explanationEn: 'Few‑shot defines rules and formats with multiple examples, clarifying boundaries.'
          },
          {
            id: 2012,
            question: '以下哪一項屬於「清晰指令」原則？',
            questionEn: 'Which aligns with “clear instructions”?',
            type: 'single',
            options: ['多用否定式避免錯誤', '把複雜任務拆解為多步', '完全不指定輸出格式', '避免提供任何上下文'],
            optionsEn: ['Use negatives extensively', 'Decompose complex tasks', 'Never specify output format', 'Avoid any context'],
            correctAnswer: 1,
            explanation: '將任務鏈式拆解能提升可控性與成功率。',
            explanationEn: 'Chaining subtasks improves controllability and success.'
          },
          {
            id: 2013,
            question: 'Top_p 與 Temperature 的差異是？',
            questionEn: 'Difference between Top_p and Temperature?',
            type: 'single',
            options: ['兩者完全相同', 'Top_p 定義候選池、Temperature 控制風險/發散', 'Top_p 只控制長度', 'Temperature 只限制重複'],
            optionsEn: ['Identical', 'Top_p sets candidate pool; Temperature controls risk/diversity', 'Top_p controls length only', 'Temperature only reduces repetition'],
            correctAnswer: 1,
            explanation: 'Top_p 為核心採樣門檻；Temperature 為隨機性調節。',
            explanationEn: 'Top_p is a nucleus threshold; Temperature adjusts randomness.'
          }
        ]
      }
    }
    ,
    {
      id: 4,
      title: '第四部分：提示工程的實踐應用',
      titleEn: 'Part 4: Practical Applications',
      description: '文本摘要、問答系統、代碼生成三大高頻場景；附 CEO 摘要 DEMO 與技術表格 Markdown 範例。',
      descriptionEn: 'Summarisation, QA and code generation with CEO summary demo and technical Markdown tables.',
      duration: '180 分鐘',
      durationEn: '180 minutes',
      lessons: [
        {
          id: 401,
          title: '4.1 文本摘要：從提煉要點到定製化報告',
          titleEn: '4.1 Summarisation: From Key Points to Tailored Briefs',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: '針對不同受眾設計摘要：Persona／指令密集／格式化／Few‑shot／CoT；含 CEO 執行摘要 DEMO 與技術表格範例。',
          descriptionEn: 'Design audience‑specific summaries using persona, instruction‑heavy prompts, formatting, few‑shot, and CoT; includes CEO and technical demos.',
          image: '/images/courses/prompt-engineering/unit-images/summary.png',
          imageAlt: '文本摘要',
          transcript: '摘要唔只係縮短文字，而係為特定目的/受眾做信息再加工。關鍵策略：Persona、指令密集、格式化、Few‑shot、CoT。\n\nCEO 執行摘要 DEMO（≤200字，三要點）：\n| 要點 | 內容 |\n| --- | --- |\n| 成本節約 | 導入 AI 客服後，單筆工單成本平均下降 22–28%，高峰時段外包費用近乎歸零。 |\n| 客滿提升 | CSAT 平均提升 7–10pp；首次回覆時間縮短 65%。 |\n| 下一步 | 先在帳單/退貨場景擴容；設置人工覆核閥值與質檢抽樣。 |\n\n技術團隊表格 DEMO（Markdown）：\n| 技術名稱 | 核心功能 | 整合複雜度 | 備註 |\n| --- | --- | --- | --- |\n| 聊天機器人 | FAQ/任務型對話 | 中 | 需冷啟語料與意圖路由 |\n| 語音分析 | 通話轉寫/情緒分析 | 高 | 依賴 ASR/標點與領域詞庫 |\n| 工作流程編排 | 工單分流/升級 | 中低 | 可與 CRM/Webhook 串接 |',
          keyPoints: [
            '按受眾設計摘要（CEO/技術/行銷）',
            '表格化輸出便於決策與執行',
            'Few‑shot 與 CoT 提升一致性'
          ]
        },
        {
          id: 402,
          title: '4.2 問答系統：從開放式到基於上下文嘅精準回答',
          titleEn: '4.2 QA: From Open‑ended to Context‑grounded',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: 'Grounding 核心做法：提供上下文、分隔符、處理不確定性、鼓勵推理；含 QA 提示結構表格 DEMO。',
          descriptionEn: 'Grounding with context, delimiters, uncertainty handling and inference; includes QA prompt structure table demo.',
          image: '/images/courses/prompt-engineering/unit-images/qa.png',
          imageAlt: '問答系統',
          transcript: '可靠 QA 要求答案嚴格受提供上下文約束，並在找不到時明確說明。常見結構：指令/上下文/問題/限制。\n\nQA 提示結構 DEMO：\n| 區塊 | 內容示例 | 目的 |\n| --- | --- | --- |\n| 指令 | 僅根據下列「產品手冊」回答用戶問題；若找不到，請回覆「對不起…」。 | 設置安全閥與範圍 |\n| 上下文 | ProVac 9000：標準 120 分鐘；強力 60 分鐘；充滿需 4 小時；保固 2 年（不含水損）。 | 提供依據 |\n| 問題 | 標準模式下能用多久？ | 明確查詢 |\n| 預期輸出 | 120 分鐘。 | 驗收標準 |',
          keyPoints: [
            '上下文接地（Grounding）防幻覺',
            '分隔符結構清晰可驗收',
            '找不到＝明確回覆避免編造'
          ]
        },
        {
          id: 403,
          title: '4.3 代碼生成：從片段到可投產嘅組件',
          titleEn: '4.3 Code Generation: From Snippets to Production‑ready',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: '提示＝規格書：語言/框架、風格規範、依賴、性能、錯誤處理、邊界、文檔；含 API 規格表 DEMO。',
          descriptionEn: 'Prompts as specs: language/framework, style, deps, performance, errors, edges, docs; includes API spec table demo.',
          image: '/images/courses/prompt-engineering/unit-images/code.png',
          imageAlt: '代碼生成',
          transcript: '從「下命令」升級到「寫規格」。先生成基礎版本，再迭代細化驗收。\n\nAPI 規格 DEMO（/api/v1/register）：\n| 項目 | 約束/值 | 備註 |\n| --- | --- | --- |\n| 方法 | POST | JSON 請求 |\n| 請求 | username:string, password:string(≥8) | 驗證失敗回 400 |\n| 安全 | generate_password_hash | 絕不存明文 |\n| 響應 | {"status":"success"} | 成功 200 |\n| 錯誤處理 | try/except DB 寫入 | 返回清晰錯誤 |\n\n驗收清單（Validation/Errors） DEMO：\n| 類別 | 檢查 | 期望 |\n| --- | --- | --- |\n| 驗證 | 缺字段 | 400 + 訊息 |\n| 安全 | 密碼加鹽哈希 | 無明文 |\n| 風格 | PEP8 + Docstring | 乾淨可讀 |',
          keyPoints: [
            '將需求轉成可驗收規格表',
            '功能分解＋迭代優化',
            '生成×解釋×重構三合一'
          ]
        }
      ]
    }
    ,
    {
      id: 3,
      title: '第三部分：進階提示策略 — 釋放模型的推理潛能',
      titleEn: 'Part 3: Advanced Prompting Strategies — Unlocking Reasoning',
      description: '當任務需要邏輯、規劃與多步推理，用 CoT／自我一致性／思維樹／ReAct 等策略，令模型「可解釋」且更可靠。',
      descriptionEn: 'For tasks requiring logic, planning and multi‑step reasoning, use CoT, self‑consistency, ToT and ReAct to make reasoning explicit and reliable.',
      duration: '180 分鐘',
      durationEn: '180 minutes',
      lessons: [
        {
          id: 301,
          title: '3.1 思維鏈（CoT）：引導模型分步思考',
          titleEn: '3.1 Chain‑of‑Thought (CoT): Step‑by‑step Reasoning',
          duration: '40 分鐘',
          durationEn: '40 minutes',
          type: 'interactive',
          description: '讓模型把推理步驟寫出來；以示例建立「過程即上下文」嘅腳手架，顯著降低錯誤率。',
          descriptionEn: 'Make the model write out intermediate steps; the process becomes contextual scaffolding that reduces errors.',
          image: '/images/courses/prompt-engineering/unit-images/cot.png',
          imageAlt: 'Chain-of-Thought',
          transcript: '核心洞察：複雜問題直接跳到結論容易錯，但每一小步相對簡單。CoT 要求模型「寫出」過程，讓每步建立喺上一步之上，形成可檢查嘅腳手架。\n\n少樣本 CoT 範例：\n問：羅傑有5個網球，他又買咗2罐，每罐3個，依家有幾多個？\n答：先計新買嘅 2*3=6，再同原本 5 相加，5+6=11。最終答案係 11。\n---\n問：餐廳有23個蘋果，用咗20個再買6個，依家有幾多？\n答：23-20=3；3+6=9；最終答案係 9。\n\n零樣本 CoT（對強模型）：加上一句「讓我們一步一步地思考」，亦可誘發分步推理。\n\n表格示例：\n| 提示類型 | 是否含示例 | 觸發效果 | 適用任務 |\n| --- | --- | --- | --- |\n| 標準 | 否 | 直接求解 | 簡單題 |\n| 少樣本 CoT | 是 | 分步推理 | 計算/邏輯 |\n| 零樣本 CoT | 否（魔法句） | 自發分步 | 強模型/簡中等難度 |',
          keyPoints: [
            '把「過程」變成上下文，顯著降錯',
            '少樣本 CoT：用示例教格式與步驟',
            '零樣本 CoT：對強模型可直接誘發'
          ]
        },
        {
          id: 302,
          title: '3.2 自我一致性：多路徑投票提升可靠性',
          titleEn: '3.2 Self‑Consistency: Multi‑path Voting',
          duration: '35 分鐘',
          durationEn: '35 minutes',
          type: 'interactive',
          description: '以較高溫度生成多條 CoT 路徑，對最終答案投票揀最多數，降低偶發性錯誤。',
          descriptionEn: 'Generate multiple CoT paths with higher temperature and vote on final answers to reduce stochastic errors.',
          image: '/images/courses/prompt-engineering/unit-images/self-consistency.png',
          imageAlt: 'Self‑Consistency',
          transcript: '方法：保持同一 CoT 提示，將 temperature（如 0.7）拉高，引入隨機性，重複運行多次。收集各自結論，對最終答案投票。\n例：5次運行得出結論 15、25、15、15、20 → 多數票為 15。比單一路徑更穩健。\n\n表格示例：\n| 運行 | 結論 | 備註 |\n| --- | --- | --- |\n| 1 | 15 | 合理推導 |\n| 2 | 25 | 中途計算誤差 |\n| 3 | 15 | 不同路徑同結論 |\n| 4 | 15 | 另一路徑一致 |\n| 5 | 20 | 偏差 |\n| 多數票 | 15 | 最終輸出 |',
          keyPoints: [
            '用溫度製造多路徑，再投票取勝',
            '顯著降低單一路徑偶發錯誤',
            '與 CoT 結合使用效果最佳'
          ]
        },
        {
          id: 303,
          title: '3.3 思維樹（ToT）：探索與評估多種解法',
          titleEn: '3.3 Tree‑of‑Thought (ToT): Search & Evaluate',
          duration: '55 分鐘',
          durationEn: '55 minutes',
          type: 'interactive',
          description: '在每一步產生多個分支，為分支打分，按得分搜尋與回溯；由線性思考升級為策略規劃。',
          descriptionEn: 'At each step, branch, score, search and backtrack; upgrade from linear reasoning to strategic planning.',
          image: '/images/courses/prompt-engineering/unit-images/tot.png',
          imageAlt: 'Tree-of-Thought',
          transcript: '核心：廣度探索（多分支）＋自我評估（打分）＋決策與回溯（Search）。以 24 點為例，嘗試多個運算分支，遇到死胡同就回溯改路，直到找到 (5-2)*8=24 等有效解。實作上通常要用程式控制循環及評分策略。\n\n表格示例：\n| 節點 | 狀態 | 評分 | 備註 |\n| --- | --- | --- | --- |\n| 根 {2,3,5,8} | 展開 | — | 初始 |\n| 分支C: 8*2=16 → {16,3,5} | 繼續 | 0.7 | 接近目標 |\n| C-1: 16+3=19 → {19,5} | 回溯 | 0.3 | 遠離 24 |\n| C-2: 5-3=2 → {16,2} | 繼續 | 0.5 | 尚可 |\n| … | … | … | 搜索直至解 |',
          keyPoints: [
            '分支→評分→決策→回溯嘅循環',
            '由線性變成搜索式推理',
            '實務常需程式化控制'
          ]
        },
        {
          id: 304,
          title: '3.4 ReAct 框架：結合推理與行動',
          titleEn: '3.4 ReAct: Reasoning + Acting',
          duration: '50 分鐘',
          durationEn: '50 minutes',
          type: 'interactive',
          description: '以「思考→行動→觀察」循環，結合外部工具（搜尋／計算器等）完成需要即時資料與計算嘅任務。',
          descriptionEn: 'Use a Thought→Action→Observation loop with tools (search/calculator) to handle live info and calculations.',
          image: '/images/courses/prompt-engineering/unit-images/react.png',
          imageAlt: 'ReAct Framework',
          transcript: '流程：\nThought：我需要咩資訊？下一步做咩？\nAction：調用工具（如 Search[問題]、Calculator[算式]）\nObservation：工具返回結果，成為下一步思考嘅新已知。\n循環直至完成。\n\n例：計算 Apple 現時市值相對 2011 年嘅倍數：Search 現時市值→Search 2011 市值→Calculator 相除→得出約 8 倍。\n\n表格示例：\n| 迭代 | Thought | Action | Observation | 狀態 |\n| --- | --- | --- | --- | --- |\n| 1 | 需要現在市值 | Search[Apple market cap today] | 2.8T | 進行 |\n| 2 | 需要2011市值 | Search[Apple market cap 2011] | 350B | 進行 |\n| 3 | 計倍數 | Calculator[2800/350] | 8 | 完成 |',
          keyPoints: [
            '把模型由「知識庫」升級為「行動者」',
            'Thought→Action→Observation 閉環',
            '適合需要檢索與計算嘅任務'
          ]
        }
      ]
    }
    ,
    {
      id: 5,
      title: '第五部分：前沿領域與高級主題',
      titleEn: 'Part 5: Frontier Areas & Advanced Topics',
      description: '從 RAG、提示鏈到智能體，將 LLM 由「響應式工具」進化為「主動式夥伴」，構建可落地嘅 AI 系統。',
      descriptionEn: 'From RAG and prompt chaining to LLM agents, evolve LLMs from reactive tools to proactive partners and build production systems.',
      duration: '180 分鐘',
      durationEn: '180 minutes',
      lessons: [
        {
          id: 501,
          title: '5.1 檢索增強生成（RAG）：連接外部實時知識庫',
          titleEn: '5.1 Retrieval‑Augmented Generation (RAG)',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: '用檢索（向量搜索）+ 生成，解決知識陳舊與幻覺；回答嚴格受提供上下文約束。',
          descriptionEn: 'Combine retrieval (vector search) with generation to fix staleness and hallucination; answers must be constrained to provided context.',
          image: '/images/courses/prompt-engineering/unit-images/rag.png',
          imageAlt: 'RAG 架構',
          transcript: '比喻：閉卷（純 LLM）vs 開卷（RAG）。流程三步：\n1) 檢索 Retrieve：用向量搜索喺知識庫揾相關 chunks。\n2) 增強 Augment：將「相關片段 + 原問題」包成新 Prompt。\n3) 生成 Generate：交畀 LLM，並加關鍵指令「只能根據上下文作答；冇就明確表示找唔到」。\n\n實戰例：金融產品 FinFlow v3.0。透過檢索文檔片段（收益率區間 6–8%、風險 R3），合成提示，最終答案準確覆述。RAG 將模型由「記憶者」變成「理解＋總結者」。\n\n表格示例：\n| 階段 | 輸入 | 輸出 | 核心風險 | 提示要點 |\n| --- | --- | --- | --- | --- |\n| 檢索 | 問題 | 相關片段 | 檢索偏差 | 嵌入/相似度/切塊 |\n| 增強 | 片段＋問題 | 增強提示 | 泄漏/混亂 | 分隔符/來源註記 |\n| 生成 | 增強提示 | 最終答案 | 幻覺 | 僅限上下文/不足則明示 |',
          keyPoints: [
            '向量搜索 + Chunking + 提示約束',
            '只可根據上下文作答，防幻覺',
            '解決知識時效與可靠性問題'
          ]
        },
        {
          id: 502,
          title: '5.2 提示鏈（Prompt Chaining）：構建多步工作流',
          titleEn: '5.2 Prompt Chaining: Multi‑step Workflows',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: '化繁為簡、分而治之：用多個子提示串聯（可分支／聚合／逐步精煉）提高準確率與可調試性。',
          descriptionEn: 'Decompose tasks into chained sub‑prompts with branching/aggregation/refinement for accuracy and debuggability.',
          image: '/images/courses/prompt-engineering/unit-images/chaining.png',
          imageAlt: 'Prompt Chaining',
          transcript: '核心：將複雜任務拆成流水線。例：投訴郵件處理→\n(1) 信息提取 JSON（情緒/客名/單號/主題）\n(2) 依主題查 SOP（可結合 RAG）\n(3) 以模板生成個性化回覆。\n好處：每步目標單一、可控、易定位錯誤；可加條件分支（緊急走 A、否則走 B）。\n\n表格示例：\n| 步驟 | 輸入 | 輸出 | 工具/方法 | 驗收標準 |\n| --- | --- | --- | --- | --- |\n| 提取 | 原始郵件 | JSON(情緒/姓名/單號/主題) | 結構化提示 | 欄位齊全/型別正確 |\n| 查詢 | 主題 | SOP 文本 | RAG/檢索 | 命中度/可追溯 |\n| 生成 | JSON+SOP | 回覆草稿 | 模板/Persona | 可直接發送/客製化 |',
          keyPoints: [
            '任務拆解→鏈式組裝',
            '可控、可測、易定位',
            '支援條件分支與聚合'
          ]
        },
        {
          id: 503,
          title: '5.3 LLM 智能體（Agents）：賦予記憶、規劃與行動',
          titleEn: '5.3 LLM‑based Agents: Memory, Planning and Action',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: '以「規劃＋工具＋記憶」實現目標導向；使用 ReAct 做工具調用閉環。',
          descriptionEn: 'Goal‑oriented systems via planning, tools and memory; use ReAct loops for tool use.',
          image: '/images/courses/prompt-engineering/unit-images/agent.png',
          imageAlt: 'LLM Agents',
          transcript: '智能體 = 大腦(LLM) + 工具 + 記憶 + 規劃。流程（簡化）：\n規劃：將大目標拆成子任務；\n行動：調用工具（地圖/搜尋/日曆/計算器/API）；\n觀察：獲取結果寫入記憶；循環直至完成。\n例：晚餐預訂助理：定位→搜尋餐廳→查菜單→比較→日曆預訂→發送確認。\n\n表格示例：\n| 組件 | 職責 | 例子 | 風險 | 緩解 |\n| --- | --- | --- | --- | --- |\n| 規劃器 | 任務分解 | 任務樹/優先級 | 過度分解 | 步數上限/回溯 |\n| 工具層 | 連接外部 | 搜索/日曆/DB | 失敗/超時 | 超時重試/降級 |\n| 記憶 | 狀態保存 | 上下文/長期記憶 | 污染/遺漏 | 審核/摘要化 |',
          keyPoints: [
            'Planning × Tools × Memory',
            'ReAct：Thought→Action→Observation 閉環',
            '將意圖轉化為可執行動作'
          ]
        }
      ]
    }
    ,
    {
      id: 6,
      title: '第六部分：提示工程中的人文因素',
      titleEn: 'Part 6: Human Factors in Prompt Engineering',
      description: '由「術」到「道」：倫理、安全、事實核查，以及職涯與工具趨勢；成為有遠見、有溫度嘅 AI 引導者。',
      descriptionEn: 'From techniques to principles: ethics, safety, fact‑checking, and career/tool trends; become an AI leader with vision and empathy.',
      duration: '120 分鐘',
      durationEn: '120 minutes',
      lessons: [
        {
          id: 601,
          title: '6.1 倫理考量：偏見、錯誤信息與有害內容',
          titleEn: '6.1 Ethics: Bias, Misinformation and Harmful Content',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: '把偏見最小化、避免誤導、建立安全護欄；將主觀評判轉為事實核對。',
          descriptionEn: 'Minimise bias, avoid misinformation and build safety guardrails; shift subjective judgments to factual checks.',
          image: '/images/courses/prompt-engineering/unit-images/ethics.png',
          imageAlt: 'AI 倫理',
          transcript: '核心：LLM 反映人類數據嘅偏見與謬誤。提示工程師需要在設計中內建倫理。\n\n場景一【偏見強化】：履歷篩選。危險做法：籠統「潛質評估」。負責任做法：設定「客觀事實匹配」角色與原則（忽略姓名/性別/年齡），按職位硬性要求逐項核對並以表格輸出。\n\n場景二【錯誤信息】：健康偽科普。危險做法：預設有效。負責任做法：以「科學記者」角色，分三段：主流科學觀點、商業宣稱、事實核查與結論。\n\n場景三【有害內容】：用系統級憲法提示（Constitution）建立紅線：拒絕仇恨/暴力/歧視；對不當請求禮貌拒絕並引導正向創作；憲法優先級高於任何用戶請求。\n\n表格示例：\n| 風險 | 觸發 | 安全對策 | 驗證方式 |\n| --- | --- | --- | --- |\n| 偏見 | 主觀評價 | 角色＋原則＋結構化比對 | 移除身份資訊/證據鏈 |\n| 幻覺 | 無上下文 | 僅限提供資料作答 | 引用/來源標註 |\n| 有害內容 | 惡意請求 | 憲法提示/拒絕策略 | 稽核樣本/紅隊測試 |',
          keyPoints: [
            '將主觀評估→事實核對（角色＋原則＋結構化）',
            '明確處理不確定性與來源可靠性',
            '系統級安全提示/憲法 AI 建立紅線'
          ]
        },
        {
          id: 602,
          title: '6.2 提示工程的未來：趨勢、工具與職業發展',
          titleEn: '6.2 The Future: Trends, Tools and Careers',
          duration: '60 分鐘',
          durationEn: '60 minutes',
          type: 'interactive',
          description: '自適應提示、多模態交互、設計模式與工具工作台；AI 交互策略師與 T 型人才之路。',
          descriptionEn: 'Adaptive prompting, multimodal interaction, design patterns and tool workbenches; AI interaction strategists and T‑shaped talent.',
          image: '/images/courses/prompt-engineering/unit-images/future.png',
          imageAlt: '未來趨勢',
          transcript: '趨勢：\n1) 自適應/對話式提示：AI 主動澄清意圖（從「獨白」到「對話」）。\n2) 多模態提示：圖像+音頻+文本合流，跨媒體協作（如建築渲染任務）。\n3) 提示設計模式與框架：RAG 問答、CoT 推理、多角色辯論等模式沉澱，走向工程化。\n工具生態：可視化鏈式編輯器、版本控制/A-B 測試、幻覺檢測、成本/延遲估算。\n職涯：提示工程滲透各行業；「AI 交互策略師」將增；T 型人才（領域×提示工程）最具價值；基礎提示將成為全民數字素養。建議：持續動手＋深耕一個領域，用 AI 解決真實問題。\n\n表格示例：\n| 趨勢 | 典型場景 | 影響 | 所需能力 |\n| --- | --- | --- | --- |\n| 自適應提示 | 互動澄清 | 需求對齊↑ | 提問設計/會話設計 |\n| 多模態 | 設計/醫療/工業 | 表達力↑ | 資料整合/標註 |\n| 設計模式 | 產品工程 | 穩定性↑ | 模式庫/評測框架 |',
          keyPoints: [
            '自適應提示與多模態交互',
            '設計模式工程化與評測工具鏈',
            'AI 交互策略師／T 型人才／全民技能化'
          ]
        }
      ]
    }
  ],

  faqData: []
};


