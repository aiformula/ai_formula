/**
 * AI Business Automation Practice Course
 * @fileoverview High-quality course on AI business automation with comprehensive content
 * @author AI Formula Team
 * @version 1.0.0
 */

import { CourseDetail, CourseModule, CourseLesson } from '../../types/courseTypes';

/**
 * Create localized content helper
 */
function createLocalizedContent(en: string, zhHK: string) {
  return {
    en: en.trim(),
    'zh-HK': zhHK.trim()
  };
}

/**
 * Course lessons data - Comprehensive AI automation lessons
 */
const courseLessons: CourseLesson[] = [
  {
    id: 1,
    title: createLocalizedContent(
      "AI Automation Fundamentals",
      "AI 自動化基礎概念"
    ),
    duration: createLocalizedContent("45 minutes", "45 分鐘"),
    description: createLocalizedContent(
      "Understand the core principles of AI-powered business automation and identify automation opportunities",
      "理解 AI 驅動的商業自動化核心原理，識別自動化機會"
    ),
    videoUrl: "/videos/ai-automation-fundamentals.mp4",
    textContent: createLocalizedContent(
      "This foundational lesson introduces AI automation concepts, covering process analysis, automation readiness assessment, ROI calculation methods, and strategic planning for business automation initiatives.",
      "本基礎課程介紹 AI 自動化概念，涵蓋流程分析、自動化準備度評估、ROI 計算方法，以及商業自動化計劃的策略規劃。"
    ),
    isLocked: false,
    estimatedMinutes: 45,
    tags: ["fundamentals", "strategy", "ROI", "process-analysis"]
  },
  {
    id: 2,
    title: createLocalizedContent(
      "Customer Service Automation",
      "客戶服務自動化"
    ),
    duration: createLocalizedContent("50 minutes", "50 分鐘"),
    description: createLocalizedContent(
      "Build intelligent chatbots and automated customer service systems using AI tools",
      "使用 AI 工具構建智能聊天機器人和自動化客戶服務系統"
    ),
    videoUrl: "/videos/customer-service-automation.mp4",
    textContent: createLocalizedContent(
      "Learn to design and implement AI-powered customer service solutions. Covers chatbot development, natural language processing, customer journey mapping, and integration with existing CRM systems.",
      "學習設計和實施 AI 驅動的客戶服務解決方案。涵蓋聊天機器人開發、自然語言處理、客戶旅程映射，以及與現有 CRM 系統的整合。"
    ),
    isLocked: false,
    estimatedMinutes: 50,
    tags: ["chatbot", "customer-service", "NLP", "CRM-integration"]
  },
  {
    id: 3,
    title: createLocalizedContent(
      "Marketing Automation with AI",
      "AI 營銷自動化"
    ),
    duration: createLocalizedContent("55 minutes", "55 分鐘"),
    description: createLocalizedContent(
      "Automate marketing campaigns, content generation, and lead nurturing using AI technologies",
      "使用 AI 技術自動化營銷活動、內容生成和潛在客戶培育"
    ),
    videoUrl: "/videos/marketing-automation.mp4",
    textContent: createLocalizedContent(
      "Master AI-powered marketing automation including personalized email campaigns, content generation, social media management, lead scoring, and conversion optimization strategies.",
      "掌握 AI 驅動的營銷自動化，包括個性化電子郵件活動、內容生成、社交媒體管理、潛在客戶評分和轉換優化策略。"
    ),
    isLocked: false,
    estimatedMinutes: 55,
    tags: ["marketing", "personalization", "lead-generation", "content-automation"]
  },
  {
    id: 4,
    title: createLocalizedContent(
      "Sales Process Automation",
      "銷售流程自動化"
    ),
    duration: createLocalizedContent("40 minutes", "40 分鐘"),
    description: createLocalizedContent(
      "Streamline sales processes with AI-powered lead qualification, follow-up automation, and pipeline management",
      "使用 AI 驅動的潛在客戶資格審查、後續跟進自動化和管道管理來簡化銷售流程"
    ),
    videoUrl: "/videos/sales-automation.mp4",
    textContent: createLocalizedContent(
      "Optimize sales workflows using AI automation. Learn lead scoring algorithms, automated follow-up sequences, proposal generation, and sales performance analytics.",
      "使用 AI 自動化優化銷售工作流程。學習潛在客戶評分算法、自動化後續跟進序列、提案生成和銷售績效分析。"
    ),
    isLocked: false,
    estimatedMinutes: 40,
    tags: ["sales-automation", "lead-scoring", "pipeline-management", "analytics"]
  },
  {
    id: 5,
    title: createLocalizedContent(
      "Operations & Data Analytics Automation",
      "營運與數據分析自動化"
    ),
    duration: createLocalizedContent("60 minutes", "60 分鐘"),
    description: createLocalizedContent(
      "Automate business operations, reporting, and data analysis using AI-powered tools and workflows",
      "使用 AI 驅動的工具和工作流程自動化商業營運、報告和數據分析"
    ),
    videoUrl: "/videos/operations-automation.mp4",
    textContent: createLocalizedContent(
      "Transform business operations with AI automation. Covers automated reporting, predictive analytics, inventory management, quality control, and real-time business intelligence dashboards.",
      "使用 AI 自動化轉型商業營運。涵蓋自動化報告、預測分析、庫存管理、質量控制和實時商業智能儀表板。"
    ),
    isLocked: false,
    estimatedMinutes: 60,
    tags: ["operations", "analytics", "reporting", "business-intelligence"]
  }
];

/**
 * Course modules data
 */
const courseModules: CourseModule[] = [
  {
    id: 1,
    title: createLocalizedContent("AI Automation Foundation", "AI 自動化基礎"),
    description: createLocalizedContent(
      "Build a solid foundation in AI automation principles and strategic planning",
      "建立 AI 自動化原理和策略規劃的堅實基礎"
    ),
    lessons: [courseLessons[0]]
  },
  {
    id: 2,
    title: createLocalizedContent("Customer-Facing Automation", "客戶導向自動化"),
    description: createLocalizedContent(
      "Implement AI automation for customer service and sales processes",
      "為客戶服務和銷售流程實施 AI 自動化"
    ),
    lessons: [courseLessons[1], courseLessons[3]]
  },
  {
    id: 3,
    title: createLocalizedContent("Marketing & Operations Automation", "營銷與營運自動化"),
    description: createLocalizedContent(
      "Master advanced automation for marketing campaigns and business operations",
      "掌握營銷活動和商業營運的高級自動化"
    ),
    lessons: [courseLessons[2], courseLessons[4]]
  }
];

/**
 * Main course data export
 */
export const aiBusinessAutomationCourse: CourseDetail = {
  id: "ai-business-automation",
  title: createLocalizedContent(
    "AI Business Automation Practice",
    "AI 商業自動化實戰課程"
  ),
  description: createLocalizedContent(
    "Master practical AI automation techniques to transform your business operations, increase efficiency, and drive growth through intelligent automation solutions.",
    "掌握實用的 AI 自動化技術，通過智能自動化解決方案轉型您的商業營運、提高效率並推動增長。"
  ),
  category: "Business Automation",
  difficulty: "Intermediate",
  instructor: createLocalizedContent("Kenneth Wong - AI Business Strategist", "Kenneth Wong - AI 商業策略師"),
  totalDuration: createLocalizedContent("4.2 hours", "4.2 小時"),
  language: ["English", "Traditional Chinese"],
  requirements: [
    createLocalizedContent(
      "Basic understanding of business processes",
      "對商業流程有基本理解"
    ),
    createLocalizedContent(
      "Familiarity with digital tools and platforms",
      "熟悉數位工具和平台"
    ),
    createLocalizedContent(
      "Experience with AI tools (recommended)",
      "具有 AI 工具使用經驗（推薦）"
    )
  ],
  learningOutcomes: [
    createLocalizedContent(
      "Identify and prioritize automation opportunities in your business",
      "識別並優先考慮業務中的自動化機會"
    ),
    createLocalizedContent(
      "Design and implement customer service automation systems",
      "設計和實施客戶服務自動化系統"
    ),
    createLocalizedContent(
      "Create AI-powered marketing automation workflows",
      "創建 AI 驅動的營銷自動化工作流程"
    ),
    createLocalizedContent(
      "Build automated sales processes and lead management systems",
      "構建自動化銷售流程和潛在客戶管理系統"
    ),
    createLocalizedContent(
      "Implement operations automation and business intelligence solutions",
      "實施營運自動化和商業智能解決方案"
    ),
    createLocalizedContent(
      "Measure ROI and optimize automation performance",
      "測量 ROI 並優化自動化性能"
    )
  ],
  freeModules: [courseModules[0]], // First module free
  proModules: [courseModules[1], courseModules[2]], // Remaining modules for pro
  freeBonuses: [
    createLocalizedContent(
      "AI Automation Readiness Assessment Template",
      "AI 自動化準備度評估模板"
    ),
    createLocalizedContent(
      "Business Process Mapping Toolkit",
      "商業流程映射工具包"
    ),
    createLocalizedContent(
      "ROI Calculation Spreadsheet",
      "ROI 計算試算表"
    )
  ],
  proBonuses: [
    createLocalizedContent(
      "Complete Automation Implementation Playbook",
      "完整自動化實施手冊"
    ),
    createLocalizedContent(
      "AI Tool Integration Guide Library",
      "AI 工具整合指南庫"
    ),
    createLocalizedContent(
      "1-on-1 Automation Strategy Consultation (30 min)",
      "一對一自動化策略諮詢（30分鐘）"
    ),
    createLocalizedContent(
      "Access to Private Community Forum",
      "私人社群論壇訪問權限"
    ),
    createLocalizedContent(
      "Monthly Live Q&A Sessions",
      "每月實時問答環節"
    ),
    createLocalizedContent(
      "Advanced Automation Templates & Scripts",
      "高級自動化模板和腳本"
    )
  ],
  pricing: {
    free: "免費",
    pro: "HK$2,980",
    original: "HK$4,980",
    savings: "40%"
  },
  stats: {
    enrollmentCount: 1247,
    rating: 4.8,
    reviews: 186
  },
  metadata: {
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    version: '1.0.0',
    author: 'AI Formula Team'
  }
}; 