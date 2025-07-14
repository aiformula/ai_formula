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
    title: "AI Formula 如�?幫助香港中�?企實?�業?�自?��?轉�?",
    titleEn: "How AI Formula Helps Hong Kong SMEs Achieve Business Automation Transformation",
    excerpt: "深入了解AI Formula?��??��?念�??��?論�??�們�?何為香港中�?企業?��??�身定制?�AI?��??�解決方案�?從諮詢到實施?��??��??��?程�?,
    excerptEn: "Learn about AI Formula's service philosophy and methodology, how we provide customized AI automation solutions for Hong Kong SMEs, from consultation to implementation.",
    author: "Kenneth",
    date: "2025�???5??,
    dateEn: "May 15, 2025",
    readTime: "8?��??��?",
    readTimeEn: "8 min read",
    category: "?�司介紹",
    categoryEn: "Company Introduction",
    image: "??",
    featured: true,
    tags: ["AI Formula", "?�業?��???, "香港中�?�?, "?��?轉�?"],
    tagsEn: ["AI Formula", "Business Automation", "Hong Kong SME", "Digital Transformation"],
    views: "156",
    publishDate: new Date('2025-05-15')
  },
  {
    id: 2,
    title: "?��?AI Formula?��?大�??��??��??�們是香港?�佳AI?��??�夥�?,
    titleEn: "5 Reasons to Choose AI Formula: Why We're Hong Kong's Best AI Automation Partner",
    excerpt: "?�索AI Formula?�核心優?��??�地?��??�、�?業�??�、�??��?例、�?續支?��??��??�格?��?�?��何�?來�?多�?港�?業選?��??��??�AI轉�?夥伴??,
    excerptEn: "Discover AI Formula's core advantages: localized service, professional team, success stories, ongoing support and reasonable pricing. Learn why more Hong Kong businesses choose us as their AI transformation partner.",
    author: "David",
    date: "2025�???2??,
    dateEn: "May 12, 2025",
    readTime: "12?��??��?",
    readTimeEn: "12 min read",
    category: "?�司?�勢",
    categoryEn: "Company Advantages",
    image: "�?,
    featured: true,
    tags: ["AI Formula", "?��??�勢", "專業?��?", "客戶?��?"],
    tagsEn: ["AI Formula", "Service Advantages", "Professional Team", "Customer Success"],
    views: "143",
    publishDate: new Date('2025-05-12')
  },
  {
    id: 3,
    title: "Make.com?��?麼�?香港企業如�?使用它實?�自?��?",
    titleEn: "What is Make.com? How Hong Kong Businesses Can Use It for Automation",
    excerpt: "?�面介紹Make.com?�個強大�??��??�平?��?從基?��?念到實�??�用，幫?��?港�?業�?�??何透�?Make.com?��?工�??��??�業?��?程�?,
    excerptEn: "Comprehensive introduction to Make.com, a powerful automation platform. From basic concepts to practical applications, helping Hong Kong businesses understand how to improve work efficiency and business processes through Make.com.",
    author: "David",
    date: "2025�???0??,
    dateEn: "May 20, 2025",
    readTime: "10?��??��?",
    readTimeEn: "10 min read",
    category: "工具?��?",
    categoryEn: "Tool Guide",
    image: "?��",
    featured: false,
    tags: ["Make.com", "?��??�工??, "工�?流�?", "香港企業"],
    tagsEn: ["Make.com", "Automation Tools", "Workflow", "Hong Kong Business"],
    views: "0",
    publishDate: new Date('2025-05-20')
  },
  {
    id: 4,
    title: "n8n?��?麼�??��??��??�平?��?終極?��?",
    titleEn: "What is n8n? The Ultimate Guide to Open Source Automation Platform",
    excerpt: "深入?�索n8n?�個強大�??��??��??�平?��?了解它�?何幫?��?業實?�工作�?程自?��?，以?��??�其他自?��?工具?��??�。適?�想要更多控?��??�自定義?��??��?港�?業�?,
    excerptEn: "Dive deep into n8n, a powerful open-source automation platform. Learn how it helps businesses achieve workflow automation and its differences from other automation tools. Perfect for Hong Kong businesses seeking more control and customization options.",
    author: "Kenneth",
    date: "2025�???5??,
    dateEn: "May 25, 2025",
    readTime: "12?��??��?",
    readTimeEn: "12 min read",
    category: "工具?��?",
    categoryEn: "Tool Guide",
    image: "?��?",
    featured: false,
    tags: ["n8n", "?��??��???, "工�?流�?", "?�主託管"],
    tagsEn: ["n8n", "Open Source Automation", "Workflow", "Self-hosted"],
    views: "0",
    publishDate: new Date('2025-05-25')
  },
  {
    id: 5,
    title: "?��??�是什麼�??��??�們�?要�?�?,
    titleEn: "What is Automation? Why Do We Need It?",
    excerpt: "?�面�???��??��??�本概念?�發展歷程�??��??�。�?�?��?��?如�??��??�們�?工�??��?，為何�??��?業都?�該?�慮實施?��??�解決方案�??��??��??�競?��???,
    excerptEn: "Comprehensive analysis of automation's basic concepts, development history, and importance. Understand how automation changes our work methods and why every business should consider implementing automation solutions to improve efficiency and competitiveness.",
    author: "David",
    date: "2025�???8??,
    dateEn: "May 28, 2025",
    readTime: "9?��??��?",
    readTimeEn: "9 min read",
    category: "?��??��?",
    categoryEn: "Fundamentals",
    image: "??",
    featured: false,
    tags: ["?��???, "?��?概念", "企業?��?", "?��?轉�?"],
    tagsEn: ["Automation", "Basic Concepts", "Business Efficiency", "Digital Transformation"],
    views: "0",
    publishDate: new Date('2025-05-28')
  },
  {
    id: 6,
    title: "Neuralink ?��?一步�?從�?念�?機到人�??��?，�??�離科幻?��??��?多�?�?,
    titleEn: "Neuralink's Next Step: From Mind Gaming to Human-Machine Fusion, How Far Are We from a Sci-Fi Future?",
    excerpt: "深入?��? Neuralink ?�?��??��?介面?�術�??��?從目?��??��?願者�??��?案�???028年人?��?AI高速整?��?宏大願景，探討這�?顛�??��?術�?後�?機�??�倫�??�戰??,
    excerptEn: "In-depth analysis of Neuralink's latest brain-computer interface breakthroughs, from current success stories of seven volunteers to the grand vision of high-speed brain-AI integration by 2028, exploring the opportunities and ethical challenges behind this disruptive technology.",
    author: "Kenneth",
    date: "2025�???9??,
    dateEn: "June 29, 2025",
    readTime: "15?��??��?",
    readTimeEn: "15 min read",
    category: "科�??�瞻",
    categoryEn: "Tech Innovation",
    image: "??",
    featured: false,
    tags: ["Neuralink", "?��?介面", "人工?�能", "科�??��?", "?��?科�?"],
    tagsEn: ["Neuralink", "Brain-Computer Interface", "Artificial Intelligence", "Tech Ethics", "Future Technology"],
    views: "0",
    publishDate: new Date('2025-06-29')
  }
];

// ?��??�數：由?�到??
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
