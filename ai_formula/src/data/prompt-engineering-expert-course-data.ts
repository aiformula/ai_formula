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
    }
  ],

  faqData: []
};


