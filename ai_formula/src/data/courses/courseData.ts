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
    titleCht: "編�??��? - 程�?設�??��?",
    description: "Learn programming fundamentals with hands-on examples and interactive coding exercises.",
    descriptionCht: "?��?實�?例�??��??�編程練習學習�?式設計基礎�?,
    duration: "4 lessons + code examples",
    durationCht: "4?�課�?+ 程�?碼�?�?,
    downloads: 234,
    rating: 4.8,
    level: "Beginner",
    levelCht: "?��?",
    price: "HK$199",
    originalPrice: "HK$299",
    image: "?��",
    type: "Programming",
    typeCht: "程�?設�?",
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
      "4?��??�課�?,
      "程�?碼�?例�?練�?",
      "JavaScript?��?",
      "HTML?�CSS?��?",
      "簡單計�??��???,
      "?�度追蹤"
    ]
  },
  // AI Tools Category - Perplexity Tools
  {
    id: 12,
    title: "Perplexity Tools Mastery",
    titleCht: "Perplexity 工具精�?,
    description: "Professional research and analysis with Perplexity AI tools",
    descriptionCht: "使用 Perplexity AI 工具?��?專業?�究?��???,
    duration: "5 modules + practice dashboard",
    durationCht: "5?�模�?+ 練�??�表板",
    downloads: 1456,
    rating: 4.7,
    level: "Intermediate",
    levelCht: "中�?",
    price: "HK$249",
    originalPrice: "HK$349",
    image: "??",
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
      "5?��?業模�?,
      "?�表板式學習�???,
      "高�??�索?��?,
      "?�究?��?論培�?,
      "實�?練�??��?",
      "學�??��??�統�?
    ]
  }
];

// Learning Plans Data
export const learningPlans: LearningPlan[] = [
  {
    id: "ai-image-video-creation",
    title: "AI Image & Video Creation",
    titleCht: "AI?��?影�??��?",
    description: "Master AI tools for creating stunning visuals and videos for your business",
    descriptionCht: "學�??�AI工具?��??��??�製作�?亮�??��??�影??,
    freeIncludes: ["Basic Midjourney Guide", "5 Video Templates", "Getting Started Tutorial"],
    freeIncludesCht: ["?��?Midjourney?��?", "5?�影?�模??, "?��??�學"],
    proIncludes: ["Midjourney Pro Techniques", "Runway ML Video Creation", "Stable Diffusion Workflows", "Commercial Usage Rights Guide"],
    proIncludesCht: ["Midjourney專業?��?, "Runway ML影�??��?", "Stable Diffusion工�?流�?", "?�業使用權�???],
    freePrice: "?�費",
    freePriceEn: "Free",
    proPrice: "HK$699",
    originalPrice: "HK$1,299",
    savings: "46%",
    icon: "?��",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "ai-llm-chatgpt-business",
    title: "AI LLM & ChatGPT Business",
    titleCht: "AI大�?言模�??�ChatGPT?�業?�用",
    description: "Comprehensive training on leveraging LLMs for business automation and growth",
    descriptionCht: "?�面?��?點樣?�大語�?模�??��??��??��??��?增長",
    freeIncludes: ["Basic Prompt Templates", "ChatGPT Quick Start", "10 Business Prompts"],
    freeIncludesCht: ["?��??�示模板", "ChatGPT快速入?�", "10?��?業�?�?],
    proIncludes: ["Advanced Prompt Engineering", "Custom GPT Development", "API Integration Guide", "Business Case Studies"],
    proIncludesCht: ["高�??�示工�?", "?��?義GPT?�發", "API?��??��?", "?�業案�??�究"],
    freePrice: "?�費",
    freePriceEn: "Free",
    proPrice: "HK$899",
    originalPrice: "HK$1,599",
    savings: "44%",
    icon: "??",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "business-automation-suite",
    title: "Business Automation Suite",
    titleCht: "?�業?��??��?�?,
    description: "End-to-end automation solutions using Make.com, n8n, and Zapier",
    descriptionCht: "?�Make.com?�n8n?�Zapier?��??�方位自?��?�?��?��?",
    freeIncludes: ["Basic Automation Guide", "3 Workflow Templates", "Setup Instructions"],
    freeIncludesCht: ["?��??��??��???, "3?�工作�?程模??, "設置說�?"],
    proIncludes: ["Make.com Advanced Workflows", "n8n Self-hosted Setup", "Zapier Integration", "ROI Tracking Templates"],
    proIncludesCht: ["Make.com高�?工�?流�?", "n8n?�主託管設置", "Zapier?��?", "?��??�報?�追蹤模??],
    freePrice: "?�費",
    freePriceEn: "Free",
    proPrice: "HK$999",
    originalPrice: "HK$1,799",
    savings: "44%",
    icon: "??,
    gradient: "from-green-500 to-emerald-500"
  }
];

// Category Filters Data
export const categoryFilters: CategoryFilter[] = [
  {
    key: 'all',
    label: 'All',
    labelCht: '?�部',
    emoji: '??',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    key: 'design',
    label: 'Creative Design',
    labelCht: '?��?設�?',
    emoji: '?��',
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    key: 'ai',
    label: 'AI Applications',
    labelCht: 'AI?�用',
    emoji: '??',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    key: 'automation',
    label: 'Automation',
    labelCht: '?��???,
    emoji: '??,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    key: 'analytics',
    label: 'Data Analytics',
    labelCht: '?��??��?',
    emoji: '??',
    color: 'bg-yellow-500 hover:bg-yellow-600'
  },
  {
    key: 'prompt-engineering',
    label: 'Prompt Engineering',
    labelCht: '?�示工�?',
    emoji: '?��',
    color: 'bg-pink-500 hover:bg-pink-600'
  },
  {
    key: 'programming',
    label: 'Programming',
    labelCht: '程�?設�?',
    emoji: '?��',
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
