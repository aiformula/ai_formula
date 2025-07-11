// Digital Product Types
export interface DigitalProduct {
  id: number;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  duration: string;
  durationCht: string;
  downloads: number;
  rating: number;
  level: string;
  levelCht: string;
  price: string;
  originalPrice: string;
  image: string;
  type: string;
  typeCht: string;
  category: string;
  newProduct?: boolean;
  bestseller?: boolean;
  featured?: boolean;
  hotSelling?: boolean;
  includes: string[];
  includesCht: string[];
}

export interface LearningPlan {
  id: string;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  freeIncludes: string[];
  freeIncludesCht: string[];
  proIncludes: string[];
  proIncludesCht: string[];
  freePrice: string;
  freePriceEn: string;
  proPrice: string;
  originalPrice: string;
  savings: string;
  icon: string;
  gradient: string;
}

export interface CategoryFilter {
  key: string;
  label: string;
  labelCht: string;
  emoji: string;
  color: string;
}

export type CategoryType = 'all' | 'design' | 'ai' | 'automation' | 'analytics' | 'prompt-engineering' | 'programming';

// Component Props Types
export interface ProductGridProps {
  products: DigitalProduct[];
  isZhTW: boolean;
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  onProductClick: (product: DigitalProduct) => void;
}

export interface ProductCardProps {
  product: DigitalProduct;
  isZhTW: boolean;
  onProductClick: (product: DigitalProduct) => void;
  index: number;
}

// Digital Products Data
export const digitalProducts: DigitalProduct[] = [
  // Programming Category
  {
    id: 10,
    title: "Coding Basics - Introduction to Programming",
    titleCht: "編程基礎 - 程式設計入門",
    description: "Learn programming fundamentals with hands-on examples and interactive coding exercises.",
    descriptionCht: "透過實踐例子和互動編程練習學習程式設計基礎。",
    duration: "4 lessons + code examples",
    durationCht: "4個課程 + 程式碼範例",
    downloads: 234,
    rating: 4.8,
    level: "Beginner",
    levelCht: "新手",
    price: "HK$199",
    originalPrice: "HK$299",
    image: "💻",
    type: "Programming",
    typeCht: "程式設計",
    category: "programming",
    newProduct: true,
    featured: true,
    includes: [
      "4 Interactive Lessons",
      "Code Examples & Exercises",
      "JavaScript Fundamentals",
      "HTML & CSS Basics",
      "Simple Calculator Project",
      "Progress Tracking"
    ],
    includesCht: [
      "4個互動課程",
      "程式碼範例和練習",
      "JavaScript基礎",
      "HTML和CSS基礎",
      "簡單計算器項目",
      "進度追蹤"
    ]
  },
  // AI Tools Category - Perplexity Tools
  {
    id: 12,
    title: "Perplexity Tools Mastery",
    titleCht: "Perplexity 工具精通",
    description: "Professional research and analysis with Perplexity AI tools",
    descriptionCht: "使用 Perplexity AI 工具進行專業研究與分析",
    duration: "5 modules + practice dashboard",
    durationCht: "5個模組 + 練習儀表板",
    downloads: 1456,
    rating: 4.7,
    level: "Intermediate",
    levelCht: "中級",
    price: "HK$249",
    originalPrice: "HK$349",
    image: "📊",
    type: "AI Tools",
    typeCht: "AI工具",
    category: "ai",
    newProduct: true,
    featured: true,
    includes: [
      "5 Professional Modules",
      "Dashboard-style Learning Interface",
      "Advanced Search Techniques",
      "Research Methodology Training",
      "Real-time Practice Environment",
      "Learning Analytics & Stats"
    ],
    includesCht: [
      "5個專業模組",
      "儀表板式學習介面",
      "高級搜索技巧",
      "研究方法論培訓",
      "實時練習環境",
      "學習分析和統計"
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
  },
  {
    key: 'programming',
    label: 'Programming',
    labelCht: '程式設計',
    emoji: '💻',
    color: 'bg-indigo-500 hover:bg-indigo-600'
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