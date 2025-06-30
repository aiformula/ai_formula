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
  publishDate: Date; // 用嚟排序
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "AI Formula 如何幫助香港中小企實現業務自動化轉型",
    titleEn: "How AI Formula Helps Hong Kong SMEs Achieve Business Automation Transformation",
    excerpt: "深入了解AI Formula嘅服務理念同方法論，我哋點樣為香港中小企業提供量身定制嘅AI自動化解決方案，從諮詢到實施嘅完整服務流程。",
    excerptEn: "Learn about AI Formula's service philosophy and methodology, how we provide customized AI automation solutions for Hong Kong SMEs, from consultation to implementation.",
    author: "Kenneth",
    date: "2025年5月15日",
    dateEn: "May 15, 2025",
    readTime: "8分鐘閱讀",
    readTimeEn: "8 min read",
    category: "公司介紹",
    categoryEn: "Company Introduction",
    image: "🚀",
    featured: true,
    tags: ["AI Formula", "商業自動化", "香港中小企", "數位轉型"],
    tagsEn: ["AI Formula", "Business Automation", "Hong Kong SME", "Digital Transformation"],
    views: "156",
    publishDate: new Date('2025-05-15')
  },
  {
    id: 2,
    title: "選擇AI Formula嘅五大理由：點解我哋係香港最佳AI自動化夥伴",
    titleEn: "5 Reasons to Choose AI Formula: Why We're Hong Kong's Best AI Automation Partner",
    excerpt: "探索AI Formula嘅核心優勢：本地化服務、專業團隊、成功案例、持續支援同合理價格。了解點解越嚟越多香港企業選擇我哋作為AI轉型夥伴。",
    excerptEn: "Discover AI Formula's core advantages: localized service, professional team, success stories, ongoing support and reasonable pricing. Learn why more Hong Kong businesses choose us as their AI transformation partner.",
    author: "David",
    date: "2025年5月12日",
    dateEn: "May 12, 2025",
    readTime: "12分鐘閱讀",
    readTimeEn: "12 min read",
    category: "公司優勢",
    categoryEn: "Company Advantages",
    image: "⭐",
    featured: true,
    tags: ["AI Formula", "服務優勢", "專業團隊", "客戶成功"],
    tagsEn: ["AI Formula", "Service Advantages", "Professional Team", "Customer Success"],
    views: "143",
    publishDate: new Date('2025-05-12')
  },
  {
    id: 3,
    title: "Make.com係乜嘢？香港企業點樣用佢嚟實現自動化",
    titleEn: "What is Make.com? How Hong Kong Businesses Can Use It for Automation",
    excerpt: "全面介紹Make.com呢個強大嘅自動化平台，從基本概念到實際應用，幫助香港企業了解點樣透過Make.com提升工作效率同業務流程。",
    excerptEn: "Comprehensive introduction to Make.com, a powerful automation platform. From basic concepts to practical applications, helping Hong Kong businesses understand how to improve work efficiency and business processes through Make.com.",
    author: "David",
    date: "2025年5月20日",
    dateEn: "May 20, 2025",
    readTime: "10分鐘閱讀",
    readTimeEn: "10 min read",
    category: "工具指南",
    categoryEn: "Tool Guide",
    image: "🔧",
    featured: false,
    tags: ["Make.com", "自動化工具", "工作流程", "香港企業"],
    tagsEn: ["Make.com", "Automation Tools", "Workflow", "Hong Kong Business"],
    views: "0",
    publishDate: new Date('2025-05-20')
  },
  {
    id: 4,
    title: "n8n係乜嘢？開源自動化平台嘅終極指南",
    titleEn: "What is n8n? The Ultimate Guide to Open Source Automation Platform",
    excerpt: "深入探索n8n呢個強大嘅開源自動化平台，了解佢點樣幫助企業實現工作流程自動化，同埋佢與其他自動化工具嘅分別。適合想要更多控制權同自定義選項嘅香港企業。",
    excerptEn: "Dive deep into n8n, a powerful open-source automation platform. Learn how it helps businesses achieve workflow automation and its differences from other automation tools. Perfect for Hong Kong businesses seeking more control and customization options.",
    author: "Kenneth",
    date: "2025年5月25日",
    dateEn: "May 25, 2025",
    readTime: "12分鐘閱讀",
    readTimeEn: "12 min read",
    category: "工具指南",
    categoryEn: "Tool Guide",
    image: "⚙️",
    featured: false,
    tags: ["n8n", "開源自動化", "工作流程", "自主託管"],
    tagsEn: ["n8n", "Open Source Automation", "Workflow", "Self-hosted"],
    views: "0",
    publishDate: new Date('2025-05-25')
  },
  {
    id: 5,
    title: "自動化係乜嘢？點解我哋需要佢？",
    titleEn: "What is Automation? Why Do We Need It?",
    excerpt: "全面解析自動化嘅基本概念、發展歷程同重要性。了解自動化點樣改變我哋嘅工作方式，為乜嘢每個企業都應該考慮實施自動化解決方案嚟提升效率同競爭力。",
    excerptEn: "Comprehensive analysis of automation's basic concepts, development history, and importance. Understand how automation changes our work methods and why every business should consider implementing automation solutions to improve efficiency and competitiveness.",
    author: "David",
    date: "2025年5月28日",
    dateEn: "May 28, 2025",
    readTime: "9分鐘閱讀",
    readTimeEn: "9 min read",
    category: "基礎知識",
    categoryEn: "Fundamentals",
    image: "🤖",
    featured: false,
    tags: ["自動化", "基礎概念", "企業效率", "數位轉型"],
    tagsEn: ["Automation", "Basic Concepts", "Business Efficiency", "Digital Transformation"],
    views: "0",
    publishDate: new Date('2025-05-28')
  },
  {
    id: 6,
    title: "Neuralink 的下一步：從意念打機到人機融合，我們離科幻未來還有多遠？",
    titleEn: "Neuralink's Next Step: From Mind Gaming to Human-Machine Fusion, How Far Are We from a Sci-Fi Future?",
    excerpt: "深入剖析 Neuralink 最新嘅腦機介面技術突破，從目前七名志願者嘅成功案例到2028年人腦與AI高速整合嘅宏大願景，探討呢項顛覆性技術背後嘅機遇同倫理挑戰。",
    excerptEn: "In-depth analysis of Neuralink's latest brain-computer interface breakthroughs, from current success stories of seven volunteers to the grand vision of high-speed brain-AI integration by 2028, exploring the opportunities and ethical challenges behind this disruptive technology.",
    author: "Kenneth",
    date: "2025年6月29日",
    dateEn: "June 29, 2025",
    readTime: "15分鐘閱讀",
    readTimeEn: "15 min read",
    category: "科技前瞻",
    categoryEn: "Tech Innovation",
    image: "🧠",
    featured: false,
    tags: ["Neuralink", "腦機介面", "人工智能", "科技倫理", "未來科技"],
    tagsEn: ["Neuralink", "Brain-Computer Interface", "Artificial Intelligence", "Tech Ethics", "Future Technology"],
    views: "0",
    publishDate: new Date('2025-06-29')
  }
];

// 排序函數：由舊到新
export const getSortedPosts = () => {
  return [...blogPosts].sort((a, b) => a.publishDate.getTime() - b.publishDate.getTime());
};

// 排序函數：由新到舊
export const getSortedPostsNewest = () => {
  return [...blogPosts].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
};

// 獲取精選文章
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

// 獲取最新文章（非精選）
export const getRecentPosts = () => {
  return blogPosts.filter(post => !post.featured);
}; 