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
    title: "ChatGPT Complete Practical Course",
    titleCht: "ChatGPT 完整教學實戰",
    description: "Master the complete application of ChatGPT, from daily office work to creative projects, comprehensively enhancing your digital capabilities.",
    descriptionCht: "掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。",
    duration: "4 hours comprehensive training",
    durationCht: "4 小時",
    downloads: 30,
    rating: 4.9,
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "免費",
    originalPrice: "", // 免費課程不顯示原價
    image: "💬",
    type: "AI Application",
    typeCht: "AI 應用",
    category: "chatgpt-complete-course",
    newProduct: true,
    featured: true,
    bestseller: true,
    hotSelling: true,
    includes: [
      "6 Comprehensive Modules",
      "Efficient Prompt Practical Manual",
      "AI Tools Integration Guide",
      "+4 More Items"
    ],
    includesCht: [
      "6 個綜合模組",
      "高效 Prompt 實戰手冊",
      "AI 工具整合指南",
      "+4 更多項目"
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
    originalPrice: "", // 免費課程不顯示原價
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

// Learning Plans Data
export const learningPlans: LearningPlan[] = [];

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
