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
  publishDate: Date; // ?¨æ–¼?’å?
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "AI Formula å¦‚ä?å¹«åŠ©é¦™æ¸¯ä¸­å?ä¼å¯¦?¾æ¥­?™è‡ª?•å?è½‰å?",
    titleEn: "How AI Formula Helps Hong Kong SMEs Achieve Business Automation Transformation",
    excerpt: "æ·±å…¥äº†è§£AI Formula?„æ??™ç?å¿µå??¹æ?è«–ï??‘å€‘å?ä½•ç‚ºé¦™æ¸¯ä¸­å?ä¼æ¥­?ä??èº«å®šåˆ¶?„AI?ªå??–è§£æ±ºæ–¹æ¡ˆï?å¾è«®è©¢åˆ°å¯¦æ–½?„å??´æ??™æ?ç¨‹ã€?,
    excerptEn: "Learn about AI Formula's service philosophy and methodology, how we provide customized AI automation solutions for Hong Kong SMEs, from consultation to implementation.",
    author: "Kenneth",
    date: "2025å¹???5??,
    dateEn: "May 15, 2025",
    readTime: "8?†é??±è?",
    readTimeEn: "8 min read",
    category: "?¬å¸ä»‹ç´¹",
    categoryEn: "Company Introduction",
    image: "??",
    featured: true,
    tags: ["AI Formula", "?†æ¥­?ªå???, "é¦™æ¸¯ä¸­å?ä¼?, "?¸ä?è½‰å?"],
    tagsEn: ["AI Formula", "Business Automation", "Hong Kong SME", "Digital Transformation"],
    views: "156",
    publishDate: new Date('2025-05-15')
  },
  {
    id: 2,
    title: "?¸æ?AI Formula?„ä?å¤§ç??±ï??ºä??‘å€‘æ˜¯é¦™æ¸¯?€ä½³AI?ªå??–å¤¥ä¼?,
    titleEn: "5 Reasons to Choose AI Formula: Why We're Hong Kong's Best AI Automation Partner",
    excerpt: "?¢ç´¢AI Formula?„æ ¸å¿ƒå„ª?¢ï??¬åœ°?–æ??™ã€å?æ¥­å??Šã€æ??Ÿæ?ä¾‹ã€æ?çºŒæ”¯?´å??ˆç??¹æ ¼?‚ä?è§?‚ºä½•è?ä¾†è?å¤šé?æ¸¯ä?æ¥­é¸?‡æ??‘ä??ºAIè½‰å?å¤¥ä¼´??,
    excerptEn: "Discover AI Formula's core advantages: localized service, professional team, success stories, ongoing support and reasonable pricing. Learn why more Hong Kong businesses choose us as their AI transformation partner.",
    author: "David",
    date: "2025å¹???2??,
    dateEn: "May 12, 2025",
    readTime: "12?†é??±è?",
    readTimeEn: "12 min read",
    category: "?¬å¸?ªå‹¢",
    categoryEn: "Company Advantages",
    image: "â­?,
    featured: true,
    tags: ["AI Formula", "?å??ªå‹¢", "å°ˆæ¥­?˜é?", "å®¢æˆ¶?å?"],
    tagsEn: ["AI Formula", "Service Advantages", "Professional Team", "Customer Success"],
    views: "143",
    publishDate: new Date('2025-05-12')
  },
  {
    id: 3,
    title: "Make.com?¯ä?éº¼ï?é¦™æ¸¯ä¼æ¥­å¦‚ä?ä½¿ç”¨å®ƒå¯¦?¾è‡ª?•å?",
    titleEn: "What is Make.com? How Hong Kong Businesses Can Use It for Automation",
    excerpt: "?¨é¢ä»‹ç´¹Make.com?™å€‹å¼·å¤§ç??ªå??–å¹³?°ï?å¾åŸº?¬æ?å¿µåˆ°å¯¦é??‰ç”¨ï¼Œå¹«?©é?æ¸¯ä?æ¥­ä?è§??ä½•é€é?Make.com?å?å·¥ä??ˆç??Œæ¥­?™æ?ç¨‹ã€?,
    excerptEn: "Comprehensive introduction to Make.com, a powerful automation platform. From basic concepts to practical applications, helping Hong Kong businesses understand how to improve work efficiency and business processes through Make.com.",
    author: "David",
    date: "2025å¹???0??,
    dateEn: "May 20, 2025",
    readTime: "10?†é??±è?",
    readTimeEn: "10 min read",
    category: "å·¥å…·?‡å?",
    categoryEn: "Tool Guide",
    image: "?”§",
    featured: false,
    tags: ["Make.com", "?ªå??–å·¥??, "å·¥ä?æµç?", "é¦™æ¸¯ä¼æ¥­"],
    tagsEn: ["Make.com", "Automation Tools", "Workflow", "Hong Kong Business"],
    views: "0",
    publishDate: new Date('2025-05-20')
  },
  {
    id: 4,
    title: "n8n?¯ä?éº¼ï??‹æ??ªå??–å¹³?°ç?çµ‚æ¥µ?‡å?",
    titleEn: "What is n8n? The Ultimate Guide to Open Source Automation Platform",
    excerpt: "æ·±å…¥?¢ç´¢n8n?™å€‹å¼·å¤§ç??‹æ??ªå??–å¹³?°ï?äº†è§£å®ƒå?ä½•å¹«?©ä?æ¥­å¯¦?¾å·¥ä½œæ?ç¨‹è‡ª?•å?ï¼Œä»¥?Šå??‡å…¶ä»–è‡ª?•å?å·¥å…·?„å??¥ã€‚é©?ˆæƒ³è¦æ›´å¤šæ§?¶æ??Œè‡ªå®šç¾©?¸é??„é?æ¸¯ä?æ¥­ã€?,
    excerptEn: "Dive deep into n8n, a powerful open-source automation platform. Learn how it helps businesses achieve workflow automation and its differences from other automation tools. Perfect for Hong Kong businesses seeking more control and customization options.",
    author: "Kenneth",
    date: "2025å¹???5??,
    dateEn: "May 25, 2025",
    readTime: "12?†é??±è?",
    readTimeEn: "12 min read",
    category: "å·¥å…·?‡å?",
    categoryEn: "Tool Guide",
    image: "?™ï?",
    featured: false,
    tags: ["n8n", "?‹æ??ªå???, "å·¥ä?æµç?", "?ªä¸»è¨—ç®¡"],
    tagsEn: ["n8n", "Open Source Automation", "Workflow", "Self-hosted"],
    views: "0",
    publishDate: new Date('2025-05-25')
  },
  {
    id: 5,
    title: "?ªå??–æ˜¯ä»€éº¼ï??ºä??‘å€‘é?è¦å?ï¼?,
    titleEn: "What is Automation? Why Do We Need It?",
    excerpt: "?¨é¢è§???ªå??–ç??ºæœ¬æ¦‚å¿µ?ç™¼å±•æ­·ç¨‹å??è??§ã€‚ä?è§?‡ª?•å?å¦‚ä??¹è??‘å€‘ç?å·¥ä??¹å?ï¼Œç‚ºä½•æ??‹ä?æ¥­éƒ½?‰è©²?ƒæ…®å¯¦æ–½?ªå??–è§£æ±ºæ–¹æ¡ˆä??å??ˆç??Œç«¶?­å???,
    excerptEn: "Comprehensive analysis of automation's basic concepts, development history, and importance. Understand how automation changes our work methods and why every business should consider implementing automation solutions to improve efficiency and competitiveness.",
    author: "David",
    date: "2025å¹???8??,
    dateEn: "May 28, 2025",
    readTime: "9?†é??±è?",
    readTimeEn: "9 min read",
    category: "?ºç??¥è?",
    categoryEn: "Fundamentals",
    image: "??",
    featured: false,
    tags: ["?ªå???, "?ºç?æ¦‚å¿µ", "ä¼æ¥­?ˆç?", "?¸ä?è½‰å?"],
    tagsEn: ["Automation", "Basic Concepts", "Business Efficiency", "Digital Transformation"],
    views: "0",
    publishDate: new Date('2025-05-28')
  },
  {
    id: 6,
    title: "Neuralink ?„ä?ä¸€æ­¥ï?å¾æ?å¿µæ?æ©Ÿåˆ°äººæ??å?ï¼Œæ??‘é›¢ç§‘å¹»?ªä??„æ?å¤šé?ï¼?,
    titleEn: "Neuralink's Next Step: From Mind Gaming to Human-Machine Fusion, How Far Are We from a Sci-Fi Future?",
    excerpt: "æ·±å…¥?–æ? Neuralink ?€?°ç??¦æ?ä»‹é¢?€è¡“ç??´ï?å¾ç›®?ä??å?é¡˜è€…ç??å?æ¡ˆä???028å¹´äºº?¦è?AIé«˜é€Ÿæ•´?ˆç?å®å¤§é¡˜æ™¯ï¼Œæ¢è¨é€™é?é¡›è??§æ?è¡“è?å¾Œç?æ©Ÿé??Œå€«ç??‘æˆ°??,
    excerptEn: "In-depth analysis of Neuralink's latest brain-computer interface breakthroughs, from current success stories of seven volunteers to the grand vision of high-speed brain-AI integration by 2028, exploring the opportunities and ethical challenges behind this disruptive technology.",
    author: "Kenneth",
    date: "2025å¹???9??,
    dateEn: "June 29, 2025",
    readTime: "15?†é??±è?",
    readTimeEn: "15 min read",
    category: "ç§‘æ??ç»",
    categoryEn: "Tech Innovation",
    image: "??",
    featured: false,
    tags: ["Neuralink", "?¦æ?ä»‹é¢", "äººå·¥?ºèƒ½", "ç§‘æ??«ç?", "?ªä?ç§‘æ?"],
    tagsEn: ["Neuralink", "Brain-Computer Interface", "Artificial Intelligence", "Tech Ethics", "Future Technology"],
    views: "0",
    publishDate: new Date('2025-06-29')
  }
];

// ?’å??½æ•¸ï¼šç”±?Šåˆ°??
export const getSortedPosts = () => {
  return [...blogPosts].sort((a, b) => a.publishDate.getTime() - b.publishDate.getTime());
};

// ?’å??½æ•¸ï¼šç”±?°åˆ°??
export const getSortedPostsNewest = () => {
  return [...blogPosts].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
};

// ?²å?ç²¾é¸?‡ç?
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

// ?²å??€?°æ?ç« ï??ç²¾?¸ï?
export const getRecentPosts = () => {
  return blogPosts.filter(post => !post.featured);
}; 
