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
    downloads: 163,
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
    title: "Perplexity AI Ultimate Master Course",
    titleCht: "Perplexity AI 終極大師課程",
    description: "From basic concepts to advanced applications, comprehensively master Perplexity core skills and practical techniques, becoming a digital expert in the AI era.",
    descriptionCht: "從基礎概念到高階應用，全面掌握 Perplexity 的核心技能與實戰技巧，成為 AI 時代的數位專家。",
    duration: "8+ hours comprehensive training",
    durationCht: "8+ 小時",
    downloads: 280,
    rating: 4.8,
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "免費",
    originalPrice: "", // 免費課程不顯示原價
    image: "🔍",
    type: "AI Search",
    typeCht: "AI 搜尋",
    category: "perplexity-complete-course",
    themeColor: "#1a1a1a", // Perplexity 黑色主題
    newProduct: true,
    featured: true,
    bestseller: true,
    hotSelling: true,
    includes: [
      "6 Major Chapters, 25+ Units",
      "Advanced Search Skills Practice",
      "AI Knowledge Management Guide",
      "+4 More Items"
    ],
    includesCht: [
      "6 大章節，25+ 單元",
      "高效搜索技能實戰",
      "AI 知識管理指南",
      "+4 更多項目"
    ]
  },
  {
    id: 3,
    title: "Midjourney AI Creative Master Course",
    titleCht: "Midjourney AI 創作大師課程",
    description: "From fundamental concepts to advanced creation, comprehensively master AI art generation core skills and creative techniques to become a digital art expert.",
    descriptionCht: "從基礎概念到高階創作，全面掌握 AI 繪圖的核心技能與創意技巧，成為數位藝術時代的創作專家。",
    duration: "6+ hours comprehensive training",
    durationCht: "6+ 小時",
    downloads: 180,
    rating: 4.9,
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "免費",
    originalPrice: "", // 免費課程不顯示原價
    image: "🎨",
    type: "AI Art",
    typeCht: "AI 藝術",
    category: "midjourney-course",
    themeColor: "#c2b280", // Midjourney 暖金色主題
    newProduct: true,
    featured: true,
    bestseller: true,
    hotSelling: true,
    includes: [
      "5 Major Chapters, 20+ Units",
      "Creative Prompt Engineering",
      "Advanced Style Guide",
      "+4 More Items"
    ],
    includesCht: [
      "5 大章節，20+ 單元",
      "創意提示工程",
      "高級風格指南",
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
