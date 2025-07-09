import { DigitalProduct, LearningPlan, CategoryFilter, CategoryType } from '@/types/courseTypes';

// Digital Products Data
export const digitalProducts: DigitalProduct[] = [
  // Creative Design Category
  {
    id: 1,
    title: "Midjourney Beginner's Guide - Visual Creation Starter",
    titleCht: "Midjourney新手指南 - 視覺創作入門",
    description: "Learn the basics of AI image generation with Midjourney for business use.",
    descriptionCht: "學習用Midjourney做AI圖像生成的基礎知識，適合商業用途。",
    duration: "8 videos + 25-page guide",
    durationCht: "8個影片 + 25頁指南",
    downloads: 1847,
    rating: 4.6,
    level: "Beginner",
    levelCht: "新手",
    price: "HK$199",
    originalPrice: "HK$299",
    image: "🎨",
    type: "Creative Design",
    typeCht: "創意設計",
    category: "design",
    newProduct: true,
    includes: [
      "8 HD Video Tutorials",
      "25-page Beginner Guide",
      "50+ Prompt Templates",
      "Style Reference Library"
    ],
    includesCht: [
      "8個高清影片教學",
      "25頁新手指南",
      "50+提示模板",
      "風格參考庫"
    ]
  },
  {
    id: 2,
    title: "Advanced Visual AI Mastery - Pro Creator Suite",
    titleCht: "高級視覺AI精通 - 專業創作套件",
    description: "Master advanced AI visual creation with multiple tools and commercial applications.",
    descriptionCht: "精通高級AI視覺創作，包含多種工具同商業應用。",
    duration: "20 videos + 60-page manual",
    durationCht: "20個影片 + 60頁手冊",
    downloads: 923,
    rating: 4.9,
    level: "Advanced",
    levelCht: "高級",
    price: "HK$699",
    originalPrice: "HK$999",
    image: "🎭",
    type: "Creative Design",
    typeCht: "創意設計",
    category: "design",
    bestseller: true,
    includes: [
      "20 HD Video Tutorials",
      "60-page Advanced Manual",
      "Midjourney + DALL-E + Stable Diffusion",
      "Commercial License Guide",
      "Private Discord Community"
    ],
    includesCht: [
      "20個高清影片教學",
      "60頁高級手冊",
      "Midjourney + DALL-E + Stable Diffusion",
      "商業授權指南",
      "私人Discord社群"
    ]
  },
  // AI Applications Category
  {
    id: 3,
    title: "ChatGPT Business Basics - Quick Start Pack",
    titleCht: "ChatGPT商業基礎 - 快速入門套裝",
    description: "Essential ChatGPT prompts and strategies for Hong Kong businesses.",
    descriptionCht: "香港企業必備的ChatGPT提示和策略。",
    duration: "10 videos + prompt library",
    durationCht: "10個影片 + 提示庫",
    downloads: 2456,
    rating: 4.8,
    level: "Beginner",
    levelCht: "新手",
    price: "HK$199",
    originalPrice: "HK$299",
    image: "🤖",
    type: "AI Applications",
    typeCht: "AI應用",
    category: "ai",
    hotSelling: true,
    includes: [
      "10 HD Video Tutorials",
      "100+ Business Prompts",
      "Industry Templates",
      "Email Templates"
    ],
    includesCht: [
      "10個高清影片教學",
      "100+商業提示",
      "行業模板",
      "電郵模板"
    ]
  },
  {
    id: 4,
    title: "Advanced AI Integration - Enterprise Solutions",
    titleCht: "高級AI整合 - 企業解決方案",
    description: "Comprehensive AI integration strategies for serious business applications.",
    descriptionCht: "全面的AI整合策略，適合認真的商業應用。",
    duration: "25 videos + 80-page guide",
    durationCht: "25個影片 + 80頁指南",
    downloads: 1123,
    rating: 4.9,
    level: "Advanced",
    levelCht: "高級",
    price: "HK$899",
    originalPrice: "HK$1299",
    image: "🧠",
    type: "AI Applications",
    typeCht: "AI應用",
    category: "ai",
    featured: true,
    includes: [
      "25 HD Video Tutorials",
      "80-page Implementation Guide",
      "API Integration Tutorials",
      "Custom GPT Development",
      "1-on-1 Consultation Call"
    ],
    includesCht: [
      "25個高清影片教學",
      "80頁實施指南",
      "API整合教學",
      "自定義GPT開發",
      "一對一諮詢通話"
    ]
  },
  // Automation Category
  {
    id: 5,
    title: "Basic Automation Setup - Beginner's Toolkit",
    titleCht: "基礎自動化設置 - 新手工具包",
    description: "Simple automation workflows for small businesses using no-code tools.",
    descriptionCht: "用無代碼工具為小企業設置簡單的自動化工作流程。",
    duration: "12 videos + templates",
    durationCht: "12個影片 + 模板",
    downloads: 1789,
    rating: 4.7,
    level: "Beginner",
    levelCht: "新手",
    price: "HK$299",
    originalPrice: "HK$399",
    image: "⚡",
    type: "Automation",
    typeCht: "自動化",
    category: "automation",
    newProduct: true,
    includes: [
      "12 HD Video Tutorials",
      "10 Workflow Templates",
      "Zapier Setup Guide",
      "Email Automation Templates"
    ],
    includesCht: [
      "12個高清影片教學",
      "10個工作流程模板",
      "Zapier設置指南",
      "電郵自動化模板"
    ]
  },
  {
    id: 6,
    title: "Enterprise Automation Mastery - Advanced Systems",
    titleCht: "企業自動化精通 - 高級系統",
    description: "Complex automation systems using Make.com, n8n, and custom integrations.",
    descriptionCht: "用Make.com、n8n和自定義整合的複雜自動化系統。",
    duration: "30 videos + 100-page manual",
    durationCht: "30個影片 + 100頁手冊",
    downloads: 567,
    rating: 4.9,
    level: "Advanced",
    levelCht: "高級",
    price: "HK$999",
    originalPrice: "HK$1499",
    image: "🔧",
    type: "Automation",
    typeCht: "自動化",
    category: "automation",
    bestseller: true,
    includes: [
      "30 HD Video Tutorials",
      "100-page Advanced Manual",
      "Make.com + n8n + Zapier",
      "Custom API Integrations",
      "Private Support Channel"
    ],
    includesCht: [
      "30個高清影片教學",
      "100頁高級手冊",
      "Make.com + n8n + Zapier",
      "自定義API整合",
      "私人支援頻道"
    ]
  },
  // Data Analytics Category
  {
    id: 7,
    title: "Data Analytics Starter - Excel & Google Sheets",
    titleCht: "數據分析入門 - Excel同Google Sheets",
    description: "Basic data analysis using familiar tools with AI enhancement.",
    descriptionCht: "用熟悉的工具做基礎數據分析，加上AI增強功能。",
    duration: "15 videos + templates",
    durationCht: "15個影片 + 模板",
    downloads: 2134,
    rating: 4.6,
    level: "Beginner",
    levelCht: "新手",
    price: "HK$299",
    originalPrice: "HK$449",
    image: "📊",
    type: "Data Analytics",
    typeCht: "數據分析",
    category: "analytics",
    hotSelling: true,
    includes: [
      "15 HD Video Tutorials",
      "Excel/Sheets Templates",
      "Dashboard Templates",
      "Data Collection Guide"
    ],
    includesCht: [
      "15個高清影片教學",
      "Excel/Sheets模板",
      "儀表板模板",
      "數據收集指南"
    ]
  },
  {
    id: 8,
    title: "Advanced Analytics & AI - Professional Suite",
    titleCht: "高級分析同AI - 專業套件",
    description: "Professional data analytics with AI tools and advanced visualization.",
    descriptionCht: "用AI工具和高級視覺化的專業數據分析。",
    duration: "25 videos + software suite",
    durationCht: "25個影片 + 軟件套件",
    downloads: 834,
    rating: 4.8,
    level: "Advanced",
    levelCht: "高級",
    price: "HK$799",
    originalPrice: "HK$1199",
    image: "📈",
    type: "Data Analytics",
    typeCht: "數據分析",
    category: "analytics",
    featured: true,
    includes: [
      "25 HD Video Tutorials",
      "Power BI + Tableau Training",
      "Python Scripts Library",
      "AI Analytics Tools",
      "Live Data Projects"
    ],
    includesCht: [
      "25個高清影片教學",
      "Power BI + Tableau培訓",
      "Python腳本庫",
      "AI分析工具",
      "實時數據項目"
    ]
  },
  // Prompt Engineering Category
  {
    id: 9,
    title: "Prompt Engineering Mastery - AI Communication Skills",
    titleCht: "提示工程精通 - AI溝通技巧",
    description: "Master the art of prompt engineering to effectively communicate with AI models and get better results.",
    descriptionCht: "精通提示工程藝術，有效和AI模型溝通，獲得更好的結果。",
    duration: "7 modules + interactive practice",
    durationCht: "7個模組 + 互動練習",
    downloads: 1567,
    rating: 4.9,
    level: "Intermediate",
    levelCht: "中級",
    price: "HK$399",
    originalPrice: "HK$599",
    image: "💬",
    type: "Prompt Engineering",
    typeCht: "提示工程",
    category: "prompt-engineering",
    newProduct: true,
    featured: true,
    includes: [
      "7 Comprehensive Modules",
      "Interactive Practice Zone",
      "Quiz & Assessment",
      "Real-world Case Studies",
      "Prompt Template Library",
      "Certificate of Completion"
    ],
    includesCht: [
      "7個全面模組",
      "互動練習區",
      "測驗同評估",
      "真實案例研究",
      "提示模板庫",
      "完成證書"
    ]
  }
];

// Learning Plans Data
export const learningPlans: LearningPlan[] = [
  {
    id: "ai-image-video-creation",
    title: "AI Image & Video Creation",
    titleCht: "AI圖像影片創作",
    description: "Master AI tools for creating stunning visuals and videos for your business",
    descriptionCht: "學識用AI工具為你的生意製作漂亮的圖片和影片",
    freeIncludes: ["Basic Midjourney Guide", "5 Video Templates", "Getting Started Tutorial"],
    freeIncludesCht: ["基礎Midjourney指南", "5個影片模板", "新手教學"],
    proIncludes: ["Midjourney Pro Techniques", "Runway ML Video Creation", "Stable Diffusion Workflows", "Commercial Usage Rights Guide"],
    proIncludesCht: ["Midjourney專業技巧", "Runway ML影片創作", "Stable Diffusion工作流程", "商業使用權指南"],
    freePrice: "免費",
    freePriceEn: "Free",
    proPrice: "HK$699",
    originalPrice: "HK$1,299",
    savings: "46%",
    icon: "🎨",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "ai-llm-chatgpt-business",
    title: "AI LLM & ChatGPT Business",
    titleCht: "AI大語言模型同ChatGPT商業應用",
    description: "Comprehensive training on leveraging LLMs for business automation and growth",
    descriptionCht: "全面教你點樣用大語言模型嚟做生意自動化同增長",
    freeIncludes: ["Basic Prompt Templates", "ChatGPT Quick Start", "10 Business Prompts"],
    freeIncludesCht: ["基礎提示模板", "ChatGPT快速入門", "10個商業提示"],
    proIncludes: ["Advanced Prompt Engineering", "Custom GPT Development", "API Integration Guide", "Business Case Studies"],
    proIncludesCht: ["高級提示工程", "自定義GPT開發", "API整合指南", "商業案例研究"],
    freePrice: "免費",
    freePriceEn: "Free",
    proPrice: "HK$899",
    originalPrice: "HK$1,599",
    savings: "44%",
    icon: "🤖",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "business-automation-suite",
    title: "Business Automation Suite",
    titleCht: "商業自動化套件",
    description: "End-to-end automation solutions using Make.com, n8n, and Zapier",
    descriptionCht: "用Make.com、n8n同Zapier嚟做全方位自動化解決方案",
    freeIncludes: ["Basic Automation Guide", "3 Workflow Templates", "Setup Instructions"],
    freeIncludesCht: ["基礎自動化指南", "3個工作流程模板", "設置說明"],
    proIncludes: ["Make.com Advanced Workflows", "n8n Self-hosted Setup", "Zapier Integration", "ROI Tracking Templates"],
    proIncludesCht: ["Make.com高級工作流程", "n8n自主託管設置", "Zapier整合", "投資回報率追蹤模板"],
    freePrice: "免費",
    freePriceEn: "Free",
    proPrice: "HK$999",
    originalPrice: "HK$1,799",
    savings: "44%",
    icon: "⚡",
    gradient: "from-green-500 to-emerald-500"
  }
];

// Category Filters Data
export const categoryFilters: CategoryFilter[] = [
  {
    key: 'all',
    label: 'All',
    labelCht: '全部',
    emoji: '📋',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    key: 'design',
    label: 'Creative Design',
    labelCht: '創意設計',
    emoji: '🎨',
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    key: 'ai',
    label: 'AI Applications',
    labelCht: 'AI應用',
    emoji: '🤖',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    key: 'automation',
    label: 'Automation',
    labelCht: '自動化',
    emoji: '⚡',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    key: 'analytics',
    label: 'Data Analytics',
    labelCht: '數據分析',
    emoji: '📊',
    color: 'bg-yellow-500 hover:bg-yellow-600'
  },
  {
    key: 'prompt-engineering',
    label: 'Prompt Engineering',
    labelCht: '提示工程',
    emoji: '💬',
    color: 'bg-pink-500 hover:bg-pink-600'
  }
];

// Utility Functions
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const filterProductsByCategory = (products: DigitalProduct[], category: CategoryType): DigitalProduct[] => {
  return category === 'all' ? products : products.filter(product => product.category === category);
};

export const calculateSavingsPercentage = (originalPrice: string, currentPrice: string): number => {
  const original = parseInt(originalPrice.replace(/[^0-9]/g, ''));
  const current = parseInt(currentPrice.replace(/[^0-9]/g, ''));
  return Math.round(((original - current) / original) * 100);
};

export const getTotalDownloads = (products: DigitalProduct[]): number => {
  return products.reduce((total, product) => total + product.downloads, 0);
};

export const getAverageRating = (products: DigitalProduct[]): number => {
  const totalRating = products.reduce((total, product) => total + product.rating, 0);
  return Math.round((totalRating / products.length) * 10) / 10;
}; 