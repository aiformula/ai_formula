import { CourseData } from '@/components/course-template/types';

export const promptEngineeringExpertCourseData: CourseData = {
  courseInfo: {
    badge: '付費・高階',
    badgeEn: 'Paid · Expert',
    title: '精通提示工程：專家級應用的終極課程（擴展與詳解版）',
    titleEn: 'Prompt Engineering Mastery: Ultimate Expert Course (Expanded Edition)',
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
    totalLessons: 20,
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

  courseStats: { totalHours: 10, totalLessons: 20, totalQuizzes: 4, completionRate: 90 },

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
          descriptionEn: 'View prompts as initial condition setting; runner→director analogy; naïve vs engineered prompts.'
        },
        {
          id: 102,
          title: '1.2 為何提示工程至關重要？（商業價值與安全）',
          titleEn: '1.2 Why Prompt Engineering Matters (Business Value & Safety)',
          duration: '40 分鐘',
          durationEn: '40 minutes',
          type: 'interactive',
          description: '精準可控、釋放潛能、人機協作、倫理與護欄；防幻覺與引用要求範例。',
          descriptionEn: 'Precision/control, potential, HCI, ethics/guardrails; anti‑hallucination with citation requirements.'
        },
        {
          id: 103,
          title: '1.3 發展簡史：從指令到對話，再到智能體',
          titleEn: '1.3 Brief History: From Instructions to Dialogue to Agents',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive',
          description: 'Transformer、GPT‑3、CoT、ReAct/Agents 時軸與關鍵詞變遷。',
          descriptionEn: 'Timeline of Transformer, GPT‑3, CoT, ReAct/Agents with interaction pattern keywords.'
        },
        {
          id: 104,
          title: '1.4 提示的基本構成：指令／情境／角色／範例／格式',
          titleEn: '1.4 Prompt Components: Instruction/Context/Persona/Examples/Format',
          duration: '15 分鐘',
          durationEn: '15 minutes',
          type: 'interactive',
          description: '以房屋比喻拆解提示食譜；逐步構建與對照示例。',
          descriptionEn: 'House analogy; step‑by‑step recipe with contrasted examples.'
        },
        {
          id: 105,
          title: '1.5 提示工程 vs. 模型微調：決策指南',
          titleEn: '1.5 Prompting vs Fine‑tuning: Decision Guide',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive',
          description: '速度／成本／數據量／穩定性／知識更新；混合策略案例（律所）。',
          descriptionEn: 'Speed/cost/data/stability/knowledge update; hybrid strategy case (law firm).'
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
          transcript: `核心觀念：LLM 是強大的模式學習者。與其長篇描述，不如直接示範。\n\n• 零樣本：純指令，適合簡單通用任務。\n• 單樣本：用一個例子「校準」格式與風格。\n• 少樣本：以多例沉浸式示範，明確規則、邊界與輸出樣態。\n\n情感分析範例：\n(零樣本) 指令：將下列句子分類為「正面/負面/中立」。句子：「這家餐廳的服務態度還有很大的進步空間。」→ 負面\n(單樣本) 先給「今天的陽光真好。」→ 正面，再給目標句 → 負面\n(少樣本) 擴展標籤為「非常滿意/基本滿意/中立/有點不滿/極度不滿」，用多例校準，目標句「特效還行吧。」→ 基本滿意。`,
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
          transcript: `法則一：具體、明確、直接。例：明確產品、結構、語氣與 CTA。\n法則二：用「要做什麼」取代「不要做什麼」。例：用「謙虛誠懇、讓大學生能懂」取代「不要太驕傲」。\n法則三：任務分解。將「找對手＋分析＋擬口號」切成三步鏈式執行。`,
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
          transcript: `示例：\n• 分隔符：\n### 指令 ### / ### 上下文 ### / ### 問題 ### → 更清晰的訊號。\n• XML 標籤：<task>/<document>/<question> 明確責任段落。\n• 預填充：先輸出「這是您要求的 JSON：{」提高 JSON 成功率。`,
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
          transcript: `無角色→通用定義；老師→比喻增多；精準角色（例如「用樂高解釋區塊鏈給行銷人」）→ 高度貼合、語氣一致、可控性強。`,
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
          transcript: `• Temperature：創意旋鈕（低=穩定；高=發散）。\n• Top_p：核心採樣（候選池大小）。\n• Stop：遇到序列即停止。\n• Frequency/Presence penalty：抑制重複。\n示例：固定提示下，T=0.1 → 標準口號；T=1.2 → 具詩意創意。Stop=['4.'] 限制清單長度。`,
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
  ],

  faqData: []
};


