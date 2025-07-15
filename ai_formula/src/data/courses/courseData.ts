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

export interface ProductGridProps {
  products: DigitalProduct[];
  isZhTW: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProductClick: (product: DigitalProduct) => void;
}

// Featured Courses Data - High-quality learning content
export const digitalProducts: DigitalProduct[] = [
  {
    id: 1,
    title: "Prompt Engineering Learning with Leung Ming",
    titleCht: "Leung Ming 的提示工程學習課程",
    description: "Learn the fundamentals of AI communication and prompt engineering through this comprehensive free course.",
    descriptionCht: "通過這門綜合免費課程，學習 AI 溝通和提示工程的基礎知識。",
    duration: "1 hour comprehensive lesson",
    durationCht: "1 小時綜合課程",
    downloads: 2847,
    rating: 4.9,
    level: "Beginner",
    levelCht: "初級",
    price: "免費",
    originalPrice: "免費",
    image: "🎯",
    type: "AI Learning",
    typeCht: "AI 學習",
    category: "prompt-engineering",
    newProduct: true,
    featured: true,
    bestseller: false,
    includes: [
      "1 Comprehensive Lesson",
      "Basic Prompt Template Library", 
      "Quick Start Guide",
      "Community Access",
      "Beginner-Friendly Content",
      "Free Forever"
    ],
    includesCht: [
      "1 堂綜合課程",
      "基礎提示模板庫",
      "快速入門指南", 
      "社群訪問權限",
      "初學者友好內容",
      "永久免費"
    ]
  },
  {
    id: 2,
    title: "AI Business Automation Practice",
    titleCht: "AI 商業自動化實戰課程",
    description: "Master practical AI automation techniques to transform your business operations and drive growth through intelligent automation solutions.",
    descriptionCht: "掌握實用的 AI 自動化技術，通過智能自動化解決方案轉型您的商業營運並推動增長。",
    duration: "4.2 hours comprehensive training",
    durationCht: "4.2 小時綜合培訓",
    downloads: 1247,
    rating: 4.8,
    level: "Intermediate",
    levelCht: "中級",
    price: "免費",
    originalPrice: "HK$4,980",
    image: "🤖",
    type: "Business Automation",
    typeCht: "商業自動化",
    category: "business-automation",
    newProduct: true,
    featured: true,
    bestseller: true,
    hotSelling: true,
    includes: [
      "5 Comprehensive Modules",
      "Automation Implementation Playbook",
      "AI Tool Integration Guides",
      "1-on-1 Strategy Consultation",
      "Private Community Access",
      "Monthly Live Q&A Sessions",
      "Advanced Templates & Scripts"
    ],
    includesCht: [
      "5 個綜合模組",
      "自動化實施手冊",
      "AI 工具整合指南",
      "一對一策略諮詢",
      "私人社群訪問",
      "每月實時問答",
      "高級模板和腳本"
    ]
  }
];

// Learning Plans Data - Focused on Prompt Engineering Learning
export const learningPlans: LearningPlan[] = [
  {
    id: "prompt-engineering-learning",
    title: "Prompt Engineering Learning",
    titleCht: "提示工程學習",
    description: "Learn AI communication fundamentals with expert guidance from Leung Ming",
    descriptionCht: "在 Leung Ming 專家指導下學習 AI 溝通基礎知識",
    freeIncludes: [
      "1 Comprehensive Lesson", 
      "Basic Prompt Templates", 
      "Quick Start Guide",
      "Community Access",
      "Beginner-Friendly Content"
    ],
    freeIncludesCht: [
      "1 堂綜合課程", 
      "基礎提示模板", 
      "快速入門指南",
      "社群訪問權限",
      "初學者友好內容"
    ],
    proIncludes: [],
    proIncludesCht: [],
    freePrice: "免費",
    freePriceEn: "Free",
    proPrice: "免費",
    originalPrice: "免費",
    savings: "0%",
    icon: "🎯",
    gradient: "from-green-500 to-blue-600"
  }
];

// Category Filters Data
export const categoryFilters: CategoryFilter[] = [
  {
    key: 'all',
    label: 'All',
    labelCht: '全部',
    emoji: '📚',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    key: 'prompt-engineering',
    label: 'Prompt Engineering',
    labelCht: '提示工程',
    emoji: '🎯',
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    key: 'ai',
    label: 'AI Applications',
    labelCht: 'AI 應用',
    emoji: '🤖',
    color: 'bg-blue-500 hover:bg-blue-600'
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

export const getProductsByCategory = (category: string): DigitalProduct[] => {
  if (category === 'all') return digitalProducts;
  return digitalProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): DigitalProduct[] => {
  return digitalProducts.filter(product => product.featured);
};

export const getBestsellerProducts = (): DigitalProduct[] => {
  return digitalProducts.filter(product => product.bestseller);
}; 
