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
    title: "AI Formula：引領香港中小企邁向業務自動化新紀元，釋放無限潛能",
    titleEn: "AI Formula: Empowering Hong Kong SMEs with Business Automation Transformation",
    excerpt: "在瞬息萬變的數碼化浪潮中，香港中小企業正站在一個充滿挑戰與機遇的十字路口。面對日益激烈的市場競爭和不斷上漲的營運成本，如何利用尖端科技實現轉型升級，已成為企業可持續發展的關鍵。AI Formula 正是您最值得信賴的合作夥伴，我們專注為香港中小企提供量身定制的 AI 自動化解決方案，助您化挑戰為機遇。",
    excerptEn: "In the dynamic digital era, Small and Medium-sized Enterprises (SMEs) in Hong Kong stand at a crossroads of unprecedented challenges and opportunities. AI Formula is your trusted partner on this journey, specialising in bespoke AI automation solutions tailored for Hong Kong SMEs to boost efficiency, reduce costs, and secure a competitive edge.",
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
    title: "選擇 AI Formula 的五大理由：為什麼我們是香港中小企最信賴的 AI 自動化合作夥伴",
    titleEn: "The Five Core Reasons to Choose AI Formula: Why We Are Hong Kong's Premier AI Automation Partner",
    excerpt: "在芸芸 AI 自動化服務供應商中，為何越來越多具前瞻視野的香港企業，從初創公司到行業翹楚，都選擇 AI Formula 作為他們數碼轉型的領航員？答案不僅在於我們領先的技術，更在於我們植根香港、與客戶並肩作戰的核心價值。",
    excerptEn: "Among a sea of AI automation providers, why is it that a growing number of forward-thinking Hong Kong enterprises, from agile startups to established industry leaders, choose AI Formula to navigate their digital transformation? The answer lies not just in our advanced technology, but in our core values: a deep-rooted local presence and a commitment to walking alongside our clients.",
    author: "Ken",
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
    title: "Make.com 全面解析：香港中小企必學的「零編程」自動化神器",
    titleEn: "A Complete Guide to Make.com: The No-Code Automation Powerhouse for Hong Kong SMEs",
    excerpt: "在今日分秒必爭的商業環境中，您是否仍將寶貴的人力浪費在重複性的手動工作上？是時候認識 Make (前身為 Integromat)，這個正徹底改變香港中小企工作模式的強大自動化平台。本篇指南將全面介紹 Make 的核心功能，並透過大量香港本地化的應用案例，向您展示如何輕鬆上手，將業務流程化繁為簡。",
    excerptEn: "In today's fast-paced business world, are you still dedicating precious human hours to repetitive manual tasks? It's time to get acquainted with Make (formerly Integromat), the powerful automation platform that is revolutionising how Hong Kong SMEs operate. This guide demonstrates how to simplify complex business processes, even with zero programming knowledge.",
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
    title: "n8n 終極指南：解鎖開源自動化，為香港企業賦予極致控制權",
    titleEn: "The Ultimate Guide to n8n: Unleashing Open-Source Automation for Hong Kong's Power Users",
    excerpt: "當 Make.com 和 Zapier 等雲端平台讓「自動化」變得普及，一群對數據安全、成本控制和功能自訂有著更高要求的企業和開發者，正將目光投向一個更強大的選擇——n8n。本指南將深入探索 n8n 的世界，展示為何許多追求極致效能的香港企業，最終選擇了 n8n。",
    excerptEn: "While cloud platforms like Make.com and Zapier have made automation accessible to the masses, a distinct group of businesses and developers with higher demands for data security, cost control, and deep customisation are turning to a more powerful alternative: n8n. This guide delves into the world of n8n, explaining why it's the 'developer's choice' for automation.",
    author: "Jason",
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
