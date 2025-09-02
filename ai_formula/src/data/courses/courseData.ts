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
  difficulty: string; // 新增：課程難度 (高階/中階/低階)
  difficultyCht: string; // 新增：課程難度中文
  isFree: boolean; // 新增：是否免費
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
    difficulty: "Intermediate", // 中階
    difficultyCht: "中階",
    isFree: true,
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
    difficulty: "Beginner", // 低階
    difficultyCht: "低階",
    isFree: true,
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
    difficulty: "Intermediate", // 中階
    difficultyCht: "中階",
    isFree: true,
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
  },
  {
    id: 4,
    title: "Mastering Prompt Engineering: A Complete Practical Guide from Basics to Advanced",
    titleCht: "精通提示工程：從基礎到進階的完整實戰指南",
    description: "Master the art of AI communication and unlock the full potential of artificial intelligence through comprehensive prompt engineering training.",
    descriptionCht: "掌握與 AI 溝通的藝術，釋放人工智能的全部潛能，通過全面的提示工程訓練提升您的技能。",
    duration: "6+ hours comprehensive training",
    durationCht: "6+ 小時",
    downloads: 89,
    rating: 4.9,
    level: "Beginner to Advanced",
    levelCht: "初級到進階",
    price: "免費",
    originalPrice: "", // 免費課程不顯示原價
    image: "🚀",
    type: "AI Communication",
    typeCht: "AI 溝通",
    category: "prompt-engineering-course",
    difficulty: "Beginner", // 低階
    difficultyCht: "低階",
    isFree: true,
    themeColor: "#9E768F", // 玫瑰紫主題
    newProduct: true,
    featured: true,
    bestseller: false,
    hotSelling: true,
    includes: [
      "4 Major Parts, 16 Units",
      "Core Techniques & Frameworks",
      "Advanced Strategies Guide",
      "+3 More Items"
    ],
    includesCht: [
      "4 大部分，16 個單元",
      "核心技巧與框架",
      "進階策略指南",
      "+3 更多項目"
    ]
  }
  ,
  {
    id: 5,
    title: "Prompt Engineering Mastery: Ultimate Expert Course",
    titleCht: "精通提示工程：專家級應用的終極課程",
    description: "Expert-level, paid programme focusing on high‑stakes prompting systems, safety, governance and agent workflows.",
    descriptionCht: "專為高階學員設計的付費課程，聚焦高強度提示系統、安全與治理、智能體工作流。",
    duration: "10+ hours expert training",
    durationCht: "10+ 小時",
    downloads: 0,
    rating: 5.0,
    level: "Expert",
    levelCht: "高階",
    price: "HK$480",
    originalPrice: "HK$680",
    image: "🧠",
    type: "AI Prompt Systems",
    typeCht: "AI 提示系統",
    category: "prompt-engineering-expert-course",
    difficulty: "Advanced",
    difficultyCht: "高階",
    isFree: false,
    themeColor: "#7c3aed",
    newProduct: true,
    featured: true,
    bestseller: false,
    hotSelling: false,
    includes: [
      "Expert foundations & mental models",
      "Risk, safety and governance playbook",
      "Agentic prompting + tool use",
      "System prompts, evaluators and guardrails"
    ],
    includesCht: [
      "專家級基礎與心智模型",
      "風險、安全與治理實戰手冊",
      "智能體提示＋工具使用",
      "系統提示、評測與護欄設計"
    ]
  }
  ,
  {
    id: 6,
    title: "Claude Mastery: From Fundamentals to Advanced Practice",
    titleCht: "Claude 全方位精通課程：從入門到專業應用",
    description: "Learn Claude’s model family, web UI, files/vision/search and prompting essentials with responsible use.",
    descriptionCht: "掌握 Claude 的模型家族、網頁介面、檔案/視覺/搜尋與提示工程精要，並建立負責任使用框架。",
    duration: "6+ hours comprehensive training",
    durationCht: "6+ 小時",
    downloads: 0,
    rating: 4.9,
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "免費",
    originalPrice: "",
    image: "🤖",
    type: "AI Assistant",
    typeCht: "AI 助手",
    category: "claude-course",
    difficulty: "Beginner",
    difficultyCht: "低階",
    isFree: true,
    themeColor: "#3b82f6",
    newProduct: true,
    featured: true,
    bestseller: false,
    hotSelling: true,
    includes: [
      "6 Focused Lessons",
      "Bilingual Quizzes (ZH + UK English)",
      "Artifacts, Files & Vision Practice",
      "+3 More Items"
    ],
    includesCht: [
      "6 節精要課程",
      "中英雙語測驗（繁中＋英式英語）",
      "神器/檔案/視覺 實戰",
      "+3 更多項目"
    ]
  }
  ,
  {
    id: 7,
    title: "Gemini Mastery: From Fundamentals to Expert",
    titleCht: "Gemini 權威大師班：從入門到精通的全方位指南",
    description: "Master Gemini’s multimodal capabilities, UI/ecosystem, prompting and responsible use.",
    descriptionCht: "全面掌握 Gemini 的多模態能力、介面與生態、提示工程與負責任使用。",
    duration: "6+ hours comprehensive training",
    durationCht: "6+ 小時",
    downloads: 0,
    rating: 4.9,
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "免費",
    originalPrice: "",
    image: "🌟",
    type: "Multimodal AI",
    typeCht: "多模態 AI",
    category: "gemini-course",
    difficulty: "Beginner",
    difficultyCht: "低階",
    isFree: true,
    themeColor: "#B0E0E6",
    newProduct: true,
    featured: true,
    bestseller: false,
    hotSelling: true,
    includes: [
      "6 Chapters + Quizzes",
      "Workspace, Coding & Mobile Use",
      "Multimodal (text/image/audio/video)",
      "+3 More Items"
    ],
    includesCht: [
      "6 章節＋測驗",
      "Workspace/程式/行動端應用",
      "多模態（文字/圖片/音訊/影片）",
      "+3 更多項目"
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
    key: 'advanced',
    label: 'Advanced',
    labelCht: '高階',
    emoji: '🎓',
    color: 'bg-red-500 hover:bg-red-600'
  },
  {
    key: 'intermediate',
    label: 'Intermediate',
    labelCht: '中階',
    emoji: '📖',
    color: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    key: 'beginner',
    label: 'Beginner',
    labelCht: '低階',
    emoji: '🌱',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    key: 'free',
    label: 'Free',
    labelCht: '免費',
    emoji: '🆓',
    color: 'bg-emerald-500 hover:bg-emerald-600'
  },
  {
    key: 'paid',
    label: 'Paid',
    labelCht: '付費',
    emoji: '💰',
    color: 'bg-yellow-500 hover:bg-yellow-600'
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
  
  // 按難度過濾
  if (category === 'advanced') {
    return digitalProducts.filter(product => product.difficulty.toLowerCase() === 'advanced');
  }
  if (category === 'intermediate') {
    return digitalProducts.filter(product => product.difficulty.toLowerCase() === 'intermediate');
  }
  if (category === 'beginner') {
    return digitalProducts.filter(product => product.difficulty.toLowerCase() === 'beginner');
  }
  
  // 按付費狀態過濾
  if (category === 'free') {
    return digitalProducts.filter(product => product.isFree === true);
  }
  if (category === 'paid') {
    return digitalProducts.filter(product => product.isFree === false);
  }
  
  // 按課程分類過濾（保持原有邏輯）
  return digitalProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): DigitalProduct[] => {
  return digitalProducts.filter(product => product.featured);
};

export const getBestsellerProducts = (): DigitalProduct[] => {
  return digitalProducts.filter(product => product.bestseller);
}; 
