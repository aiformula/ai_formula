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
    titleCht: "ç·¨ç??ºç? - ç¨‹å?è¨­è??¥é?",
    description: "Learn programming fundamentals with hands-on examples and interactive coding exercises.",
    descriptionCht: "?é?å¯¦è?ä¾‹å??Œä??•ç·¨ç¨‹ç·´ç¿’å­¸ç¿’ç?å¼è¨­è¨ˆåŸºç¤ã€?,
    duration: "4 lessons + code examples",
    durationCht: "4?‹èª²ç¨?+ ç¨‹å?ç¢¼ç?ä¾?,
    downloads: 234,
    rating: 4.8,
    level: "Beginner",
    levelCht: "?°æ?",
    price: "HK$199",
    originalPrice: "HK$299",
    image: "?’»",
    type: "Programming",
    typeCht: "ç¨‹å?è¨­è?",
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
      "4?‹ä??•èª²ç¨?,
      "ç¨‹å?ç¢¼ç?ä¾‹å?ç·´ç?",
      "JavaScript?ºç?",
      "HTML?ŒCSS?ºç?",
      "ç°¡å–®è¨ˆç??¨é???,
      "?²åº¦è¿½è¹¤"
    ]
  },
  // AI Tools Category - Perplexity Tools
  {
    id: 12,
    title: "Perplexity Tools Mastery",
    titleCht: "Perplexity å·¥å…·ç²¾é€?,
    description: "Professional research and analysis with Perplexity AI tools",
    descriptionCht: "ä½¿ç”¨ Perplexity AI å·¥å…·?²è?å°ˆæ¥­?”ç©¶?‡å???,
    duration: "5 modules + practice dashboard",
    durationCht: "5?‹æ¨¡çµ?+ ç·´ç??€è¡¨æ¿",
    downloads: 1456,
    rating: 4.7,
    level: "Intermediate",
    levelCht: "ä¸­ç?",
    price: "HK$249",
    originalPrice: "HK$349",
    image: "??",
    type: "AI Tools",
    typeCht: "AIå·¥å…·",
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
      "5?‹å?æ¥­æ¨¡çµ?,
      "?€è¡¨æ¿å¼å­¸ç¿’ä???,
      "é«˜ç??œç´¢?€å·?,
      "?”ç©¶?¹æ?è«–åŸ¹è¨?,
      "å¯¦æ?ç·´ç??°å?",
      "å­¸ç??†æ??Œçµ±è¨?
    ]
  }
];

// Learning Plans Data
export const learningPlans: LearningPlan[] = [
  {
    id: "ai-image-video-creation",
    title: "AI Image & Video Creation",
    titleCht: "AI?–å?å½±ç??µä?",
    description: "Master AI tools for creating stunning visuals and videos for your business",
    descriptionCht: "å­¸è??¨AIå·¥å…·?ºä??„ç??è£½ä½œæ?äº®ç??–ç??Œå½±??,
    freeIncludes: ["Basic Midjourney Guide", "5 Video Templates", "Getting Started Tutorial"],
    freeIncludesCht: ["?ºç?Midjourney?‡å?", "5?‹å½±?‡æ¨¡??, "?°æ??™å­¸"],
    proIncludes: ["Midjourney Pro Techniques", "Runway ML Video Creation", "Stable Diffusion Workflows", "Commercial Usage Rights Guide"],
    proIncludesCht: ["Midjourneyå°ˆæ¥­?€å·?, "Runway MLå½±ç??µä?", "Stable Diffusionå·¥ä?æµç?", "?†æ¥­ä½¿ç”¨æ¬Šæ???],
    freePrice: "?è²»",
    freePriceEn: "Free",
    proPrice: "HK$699",
    originalPrice: "HK$1,299",
    savings: "46%",
    icon: "?¨",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "ai-llm-chatgpt-business",
    title: "AI LLM & ChatGPT Business",
    titleCht: "AIå¤§è?è¨€æ¨¡å??ŒChatGPT?†æ¥­?‰ç”¨",
    description: "Comprehensive training on leveraging LLMs for business automation and growth",
    descriptionCht: "?¨é¢?™ä?é»æ¨£?¨å¤§èªè?æ¨¡å??Ÿå??Ÿæ??ªå??–å?å¢é•·",
    freeIncludes: ["Basic Prompt Templates", "ChatGPT Quick Start", "10 Business Prompts"],
    freeIncludesCht: ["?ºç??ç¤ºæ¨¡æ¿", "ChatGPTå¿«é€Ÿå…¥?€", "10?‹å?æ¥­æ?ç¤?],
    proIncludes: ["Advanced Prompt Engineering", "Custom GPT Development", "API Integration Guide", "Business Case Studies"],
    proIncludesCht: ["é«˜ç??ç¤ºå·¥ç?", "?ªå?ç¾©GPT?‹ç™¼", "API?´å??‡å?", "?†æ¥­æ¡ˆä??”ç©¶"],
    freePrice: "?è²»",
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
    titleCht: "?†æ¥­?ªå??–å?ä»?,
    description: "End-to-end automation solutions using Make.com, n8n, and Zapier",
    descriptionCht: "?¨Make.com?n8n?ŒZapier?Ÿå??¨æ–¹ä½è‡ª?•å?è§?±º?¹æ?",
    freeIncludes: ["Basic Automation Guide", "3 Workflow Templates", "Setup Instructions"],
    freeIncludesCht: ["?ºç??ªå??–æ???, "3?‹å·¥ä½œæ?ç¨‹æ¨¡??, "è¨­ç½®èªªæ?"],
    proIncludes: ["Make.com Advanced Workflows", "n8n Self-hosted Setup", "Zapier Integration", "ROI Tracking Templates"],
    proIncludesCht: ["Make.comé«˜ç?å·¥ä?æµç?", "n8n?ªä¸»è¨—ç®¡è¨­ç½®", "Zapier?´å?", "?•è??å ±?‡è¿½è¹¤æ¨¡??],
    freePrice: "?è²»",
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
    labelCht: '?¨éƒ¨',
    emoji: '??',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    key: 'design',
    label: 'Creative Design',
    labelCht: '?µæ?è¨­è?',
    emoji: '?¨',
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    key: 'ai',
    label: 'AI Applications',
    labelCht: 'AI?‰ç”¨',
    emoji: '??',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    key: 'automation',
    label: 'Automation',
    labelCht: '?ªå???,
    emoji: '??,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    key: 'analytics',
    label: 'Data Analytics',
    labelCht: '?¸æ??†æ?',
    emoji: '??',
    color: 'bg-yellow-500 hover:bg-yellow-600'
  },
  {
    key: 'prompt-engineering',
    label: 'Prompt Engineering',
    labelCht: '?ç¤ºå·¥ç?',
    emoji: '?’¬',
    color: 'bg-pink-500 hover:bg-pink-600'
  },
  {
    key: 'programming',
    label: 'Programming',
    labelCht: 'ç¨‹å?è¨­è?',
    emoji: '?’»',
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
