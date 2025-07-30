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
  themeColor?: string; // 新增動態主題顏色屬性
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
    themeColor: "#10a37f", // ChatGPT 綠色
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
    title: "Midjourney AI Art Mastery",
    titleCht: "Midjourney AI 繪圖精通",
    description: "Learn to create stunning AI artwork with Midjourney, from basic prompts to advanced techniques.",
    descriptionCht: "學習使用 Midjourney 創作令人驚豔的AI藝術作品，從基礎提示到進階技巧。",
    duration: "6 hours comprehensive training",
    durationCht: "6 小時",
    downloads: 25,
    rating: 4.8,
    level: "Beginner to Advanced",
    levelCht: "初學者到進階",
    price: "HK$899",
    originalPrice: "HK$1299",
    image: "🎨",
    type: "AI Art",
    typeCht: "AI 藝術",
    category: "midjourney-course",
    themeColor: "#8A2BE2", // Midjourney 紫色
    newProduct: false,
    featured: true,
    bestseller: true,
    hotSelling: false,
    includes: [
      "Advanced Prompt Engineering",
      "Style Reference Guide",
      "Commercial Usage Rights",
      "+3 More Items"
    ],
    includesCht: [
      "進階提示工程",
      "風格參考指南",
      "商業使用權限",
      "+3 更多項目"
    ]
  },
  {
    id: 3,
    title: "Claude 3 API Development",
    titleCht: "Claude 3 API 應用開發",
    description: "Build powerful applications using Claude 3 API with practical examples and best practices.",
    descriptionCht: "使用 Claude 3 API 構建強大的應用程序，包含實用範例和最佳實踐。",
    duration: "8 hours comprehensive training",
    durationCht: "8 小時",
    downloads: 15,
    rating: 4.9,
    level: "Intermediate to Advanced",
    levelCht: "中級到進階",
    price: "免費",
    originalPrice: "",
    image: "🤖",
    type: "API Development",
    typeCht: "API 開發",
    category: "claude-api-course",
    themeColor: "#FF6B35", // Claude 橙色
    newProduct: true,
    featured: true,
    bestseller: false,
    hotSelling: true,
    includes: [
      "API Integration Guide",
      "Code Examples & Templates",
      "Best Practices Manual",
      "+5 More Items"
    ],
    includesCht: [
      "API 整合指南",
      "程式碼範例與模板",
      "最佳實踐手冊",
      "+5 更多項目"
    ]
  },
  {
    id: 4,
    title: "AI Business Automation",
    titleCht: "AI 商業自動化",
    description: "Automate your business processes with AI tools and increase efficiency dramatically.",
    descriptionCht: "使用 AI 工具自動化您的商業流程，大幅提升工作效率。",
    duration: "5 hours comprehensive training",
    durationCht: "5 小時",
    downloads: 20,
    rating: 4.7,
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "HK$699",
    originalPrice: "HK$999",
    image: "⚡",
    type: "Business Automation",
    typeCht: "商業自動化",
    category: "ai-automation-course",
    themeColor: "#FBBF24", // 預設金色
    newProduct: false,
    featured: false,
    bestseller: true,
    hotSelling: true,
    includes: [
      "Automation Workflow Design",
      "Tool Integration Guide",
      "ROI Calculation Methods",
      "+4 More Items"
    ],
    includesCht: [
      "自動化工作流程設計",
      "工具整合指南",
      "投資回報率計算方法",
      "+4 更多項目"
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
