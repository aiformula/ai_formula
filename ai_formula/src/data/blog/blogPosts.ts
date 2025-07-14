export interface BlogPost {
  id: number;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  author: string;
  date: string;
  dateEn: string;
  readTime: string;
  readTimeEn: string;
  category: string;
  categoryEn: string;
  image: string;
  featured: boolean;
  tags: string[];
  tagsEn: string[];
  views: string;
  publishDate: Date; // ?�於?��?
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "AI Formula 如何幫助香港中小企實現業務自動化轉型",
    titleEn: "How AI Formula Helps Hong Kong SMEs Achieve Business Automation Transformation",
    excerpt: "深入了解AI Formula的服務理念和方法論，我們如何為香港中小企業提供量身定制的AI自動化解決方案，從諮詢到實施的完整流程。",
    excerptEn: "Learn about AI Formula's service philosophy and methodology, how we provide customized AI automation solutions for Hong Kong SMEs, from consultation to implementation.",
    author: "Kenneth",
    date: "2025年5月15日",
    dateEn: "May 15, 2025",
    readTime: "8分鐘閱讀",
    readTimeEn: "8 min read",
    category: "公司介紹",
    categoryEn: "Company Introduction",
    image: "/images/blog/ai-formula-intro.jpg",
    featured: true,
    tags: ["AI Formula", "業務自動化", "香港中小企", "數字轉型"],
    tagsEn: ["AI Formula", "Business Automation", "Hong Kong SME", "Digital Transformation"],
    views: "156",
    publishDate: new Date('2025-05-15')
  },
  {
    id: 2,
    title: "選擇AI Formula的五大理由：為什麼我們是香港最佳AI自動化夥伴",
    titleEn: "5 Reasons to Choose AI Formula: Why We're Hong Kong's Best AI Automation Partner",
    excerpt: "探索AI Formula的核心優勢：本地化服務、專業團隊、成功案例、持續支援和合理定價。了解為何愈來愈多香港企業選擇我們作為AI轉型夥伴。",
    excerptEn: "Discover AI Formula's core advantages: localized service, professional team, success stories, ongoing support and reasonable pricing. Learn why more Hong Kong businesses choose us as their AI transformation partner.",
    author: "David",
    date: "2025年5月2日",
    dateEn: "May 12, 2025",
    readTime: "12分鐘閱讀",
    readTimeEn: "12 min read",
    category: "公司優勢",
    categoryEn: "Company Advantages",
    image: "??",
    featured: true,
    tags: ["AI Formula", "公司優勢", "專業團隊", "客戶成功"],
    tagsEn: ["AI Formula", "Service Advantages", "Professional Team", "Customer Success"],
    views: "143",
    publishDate: new Date('2025-05-12')
  },
  {
    id: 3,
    title: "Make.com是什麼？香港企業如何使用它實現自動化",
    titleEn: "What is Make.com? How Hong Kong Businesses Can Use It for Automation",
    excerpt: "面介紹Make.com是一個強大的自動化平台，從基礎概念到實際應用，幫助香港企業理解如何通過Make.com提高工作效率和業務流程。",
    excerptEn: "Comprehensive introduction to Make.com, a powerful automation platform. From basic concepts to practical applications, helping Hong Kong businesses understand how to improve work efficiency and business processes through Make.com.",
    author: "David",
    date: "2025年5月20日",
    dateEn: "May 20, 2025",
    readTime: "10分鐘閱讀",
    readTimeEn: "10 min read",
    category: "工具指南",
    categoryEn: "Tool Guide",
    image: "??",
    featured: false,
    tags: ["Make.com", "自動化工具", "工作流程", "香港企業"],
    tagsEn: ["Make.com", "Automation Tools", "Workflow", "Hong Kong Business"],
    views: "0",
    publishDate: new Date('2025-05-20')
  },
  {
    id: 4,
    title: "n8n是什麼？開源自動化平台的終極指南",
    titleEn: "What is n8n? The Ultimate Guide to Open Source Automation Platform",
    excerpt: "深入探索n8n是一個強大的開源自動化平台，了解它如何幫助企業實現工作流程自動化，以及與其他自動化工具的差異。適合尋求更多控制和自定義選項的香港企業。",
    excerptEn: "Dive deep into n8n, a powerful open-source automation platform. Learn how it helps businesses achieve workflow automation and its differences from other automation tools. Perfect for Hong Kong businesses seeking more control and customization options.",
    author: "Kenneth",
    date: "2025年5月25日",
    dateEn: "May 25, 2025",
    readTime: "12分鐘閱讀",
    readTimeEn: "12 min read",
    category: "工具指南",
    categoryEn: "Tool Guide",
    image: "??",
    featured: false,
    tags: ["n8n", "開源自動化", "工作流程", "自托管"],
    tagsEn: ["n8n", "Open Source Automation", "Workflow", "Self-hosted"],
    views: "0",
    publishDate: new Date('2025-05-25')
  },
  {
    id: 5,
    title: "什麼是自動化？我們為什麼需要它？",
    titleEn: "What is Automation? Why Do We Need It?",
    excerpt: "面探討自動化的基本概念、發展歷程及其重要性。了解自動化如何改變我們的工作方式，為什麼每個企業都應該考慮實施自動化解決方案，以提高效率和競爭力。",
    excerptEn: "Comprehensive analysis of automation's basic concepts, development history, and importance. Understand how automation changes our work methods and why every business should consider implementing automation solutions to improve efficiency and competitiveness.",
    author: "David",
    date: "2025年5月28日",
    dateEn: "May 28, 2025",
    readTime: "9分鐘閱讀",
    readTimeEn: "9 min read",
    category: "基礎知識",
    categoryEn: "Fundamentals",
    image: "??",
    featured: false,
    tags: ["自動化", "基本概念", "企業效率", "數字轉型"],
    tagsEn: ["Automation", "Basic Concepts", "Business Efficiency", "Digital Transformation"],
    views: "0",
    publishDate: new Date('2025-05-28')
  },
  {
    id: 6,
    title: "Neuralink的下一步：從腦機介面到人機融合，我們離科幻有多遠？",
    titleEn: "Neuralink's Next Step: From Mind Gaming to Human-Machine Fusion, How Far Are We from a Sci-Fi Future?",
    excerpt: "深入分析Neuralink最新的腦機介面突破，從七名志願者目前的成功案例到2028年實現腦-AI高速整合的宏大願景，探討這項顛覆性技術背後的機遇和倫理挑戰。",
    excerptEn: "In-depth analysis of Neuralink's latest brain-computer interface breakthroughs, from current success stories of seven volunteers to the grand vision of high-speed brain-AI integration by 2028, exploring the opportunities and ethical challenges behind this disruptive technology.",
    author: "Kenneth",
    date: "2025年6月29日",
    dateEn: "June 29, 2025",
    readTime: "15分鐘閱讀",
    readTimeEn: "15 min read",
    category: "科技創新",
    categoryEn: "Tech Innovation",
    image: "??",
    featured: false,
    tags: ["Neuralink", "腦機介面", "人工智慧", "科技倫理", "未來科技"],
    tagsEn: ["Neuralink", "Brain-Computer Interface", "Artificial Intelligence", "Tech Ethics", "Future Technology"],
    views: "0",
    publishDate: new Date('2025-06-29')
  }
];

// ???數：由?到??
export const getSortedPosts = () => {
  return [...blogPosts].sort((a, b) => a.publishDate.getTime() - b.publishDate.getTime());
};

// ?��??�數：由?�到??
export const getSortedPostsNewest = () => {
  return [...blogPosts].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
};

// ?��?精選?��?
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

// ?��??�?��?章�??�精?��?
export const getRecentPosts = () => {
  return blogPosts.filter(post => !post.featured);
}; 
