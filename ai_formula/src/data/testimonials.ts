export interface Testimonial {
  id: number;
  category: 'learning' | 'n8n' | 'code';
  content: string;
  contentEn: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  company: string;
  companyEn: string;
  rating: number;
  location: string;
  locationEn: string;
}

// 個人資料生成器數據
export const profileGenerator = {
  firstNames: ['Ken', 'Sam', 'Louis', 'David', 'Jason', 'Chris', 'Emily', 'Sarah', 'Michelle', 'Alex', 'Kevin', 'Daniel', 'Grace', 'Amy', 'Lisa'],
  lastNames: ['Chan', 'Wong', 'Lee', 'Leung', 'Ng', 'Cheung', 'Ho', 'Lam', 'Ma', 'Tsang', 'Tam', 'Chow', 'Liu', 'Yip'],
  titles: {
    zh: ['客戶服務經理', '數碼營銷總監', '項目總監', '創辦人', '業務發展經理', '技術總監', '營運經理', '產品經理'],
    en: ['Customer Service Manager', 'Digital Marketing Director', 'Project Director', 'Founder', 'Business Development Manager', 'Technical Director', 'Operations Manager', 'Product Manager']
  },
  companies: {
    zh: ['創新科技有限公司', '旅遊服務公司', '本地貿易公司', '數碼媒體集團', '金融服務公司', '製造業集團', '零售連鎖店', '諮詢服務公司'],
    en: ['Innovate Tech Ltd', 'Travel Services Co.', 'Local Trading Corp.', 'Digital Media Group', 'Financial Services Co.', 'Manufacturing Group', 'Retail Chain Store', 'Consulting Services Ltd']
  }
};

// 個人資料生成器接口
export interface GeneratedProfile {
  fullName: string; // 只保留英文全名
  title: string;
  titleEn: string;
  company: string;
  companyEn: string;
}

// 隨機生成個人資料函數
export const generateRandomProfile = (): GeneratedProfile => {
  const firstName = profileGenerator.firstNames[Math.floor(Math.random() * profileGenerator.firstNames.length)];
  const lastName = profileGenerator.lastNames[Math.floor(Math.random() * profileGenerator.lastNames.length)];
  const titleIndex = Math.floor(Math.random() * profileGenerator.titles.zh.length);
  const companyIndex = Math.floor(Math.random() * profileGenerator.companies.zh.length);

  return {
    fullName: `${firstName} ${lastName}`, // 統一英文格式
    title: profileGenerator.titles.zh[titleIndex],
    titleEn: profileGenerator.titles.en[titleIndex],
    company: profileGenerator.companies.zh[companyIndex],
    companyEn: profileGenerator.companies.en[companyIndex]
  };
};

export const testimonialsData: Testimonial[] = [
  // Learning AI 知識相關評價
  {
    id: 1,
    category: "learning",
    content: "AI Formula 嘅課程內容非常紥實，由淺入深，真係幫我哋成個 marketing team 提升咗對 AI 工具嘅認知，而家我哋嘅工作效率高咗好多！",
    contentEn: "The course content from AI Formula is incredibly solid. It took us from basics to advanced concepts and genuinely upskilled our entire marketing team on AI tools. Our work efficiency has skyrocketed!",
    name: "陳美雯",
    nameEn: "Mei-Wen Chen",
    title: "數碼營銷總監",
    titleEn: "Digital Marketing Director",
    company: "創新科技有限公司",
    companyEn: "Innovation Tech Ltd",
    rating: 5,
    location: "香港",
    locationEn: "Hong Kong"
  },
  {
    id: 2,
    category: "learning",
    content: "ChatGPT 課程嘅實戰練習真係好有用，Kenneth 老師嘅教學方式好清晰，令我可以即刻應用喺日常工作上面，大大提升咗我哋 content creation 嘅質量。",
    contentEn: "The hands-on practice in the ChatGPT course is incredibly useful. Kenneth's teaching style is very clear, allowing me to immediately apply what I learned to my daily work, significantly improving our content creation quality.",
    name: "李志強",
    nameEn: "Chi-Keung Lee",
    title: "內容策略主管",
    titleEn: "Content Strategy Manager",
    company: "數碼媒體集團",
    companyEn: "Digital Media Group",
    rating: 5,
    location: "台北",
    locationEn: "Taipei"
  },
  {
    id: 3,
    category: "learning",
    content: "原本對 AI 工具完全唔識，上完課程之後，而家可以熟練使用 Claude、ChatGPT 同其他工具，工作效率提升咗最少 40%，投資回報率好高！",
    contentEn: "I knew absolutely nothing about AI tools before, but after the course, I can now proficiently use Claude, ChatGPT, and other tools. My work efficiency has improved by at least 40% - excellent ROI!",
    name: "王小明",
    nameEn: "Xiao-Ming Wang",
    title: "業務分析師",
    titleEn: "Business Analyst",
    company: "金融科技公司",
    companyEn: "FinTech Solutions",
    rating: 5,
    location: "深圳",
    locationEn: "Shenzhen"
  },
  {
    id: 4,
    category: "learning",
    content: "David 老師嘅自動化思維課程改變咗我對工作嘅睇法，學識咗點樣用 AI 去優化流程，而家可以將更多時間投放喺創意工作上面。",
    contentEn: "David's automation mindset course changed how I view work. Learning how to use AI to optimize processes means I can now invest more time in creative work.",
    name: "張麗華",
    nameEn: "Li-Hua Zhang",
    title: "項目經理",
    titleEn: "Project Manager",
    company: "設計工作室",
    companyEn: "Creative Design Studio",
    rating: 5,
    location: "廣州",
    locationEn: "Guangzhou"
  },
  {
    id: 5,
    category: "learning",
    content: "作為一個傳統行業嘅從業員，本來覺得 AI 離我哋好遠，但係 AI Formula 嘅課程設計得好貼地，令我明白點樣將 AI 融入到日常營運入面。",
    contentEn: "As someone from a traditional industry, I thought AI was far from our reality. But AI Formula's course design is very practical, helping me understand how to integrate AI into daily operations.",
    name: "林志明",
    nameEn: "Chi-Ming Lin",
    title: "營運主管",
    titleEn: "Operations Supervisor",
    company: "製造業公司",
    companyEn: "Manufacturing Corp",
    rating: 4,
    location: "台中",
    locationEn: "Taichung"
  },

  // n8n 自動化相關評價
  {
    id: 6,
    category: "n8n",
    content: "以前我哋每日要用兩個鐘手動處理 Shopify 訂單同更新存貨，AI Formula 幫我哋用 n8n 整咗個自動化流程，而家完全唔使人手操作，慳返好多時間。",
    contentEn: "We used to spend two hours a day manually processing Shopify orders and updating inventory. AI Formula built an n8n automation for us, and now it's completely hands-off. A massive time-saver.",
    name: "劉家豪",
    nameEn: "Jia-Hao Liu",
    title: "電商營運經理",
    titleEn: "E-commerce Operations Manager",
    company: "網上零售商店",
    companyEn: "Online Retail Store",
    rating: 5,
    location: "香港",
    locationEn: "Hong Kong"
  },
  {
    id: 7,
    category: "n8n",
    content: "Ken 老師用 n8n 幫我哋建立咗一個從 lead generation 到 follow-up 嘅完整自動化系統，轉換率提升咗 35%，而且客戶服務質量都有明顯改善。",
    contentEn: "Ken built us a complete automation system from lead generation to follow-up using n8n. Our conversion rate improved by 35%, and customer service quality also saw significant improvement.",
    name: "黃美珊",
    nameEn: "Mei-Shan Huang",
    title: "銷售總監",
    titleEn: "Sales Director",
    company: "諮詢服務公司",
    companyEn: "Consulting Services",
    rating: 5,
    location: "新加坡",
    locationEn: "Singapore"
  },
  {
    id: 8,
    category: "n8n",
    content: "我哋公司有好多重複性嘅數據處理工作，用 n8n 自動化之後，錯誤率降低咗 90%，員工可以專注喺更有價值嘅工作上面。",
    contentEn: "Our company had many repetitive data processing tasks. After automating with n8n, error rates dropped by 90%, and employees can focus on more valuable work.",
    name: "吳建華",
    nameEn: "Jian-Hua Wu",
    title: "資訊科技主管",
    titleEn: "IT Manager",
    company: "會計師事務所",
    companyEn: "Accounting Firm",
    rating: 5,
    location: "台北",
    locationEn: "Taipei"
  },
  {
    id: 9,
    category: "n8n",
    content: "原本我哋嘅客戶查詢處理流程好亂，David 用 n8n 整合咗我哋嘅 CRM、email 同 WhatsApp，而家所有查詢都可以自動分類同回覆。",
    contentEn: "Our customer inquiry process was chaotic before. David integrated our CRM, email, and WhatsApp using n8n, and now all inquiries are automatically categorized and responded to.",
    name: "陳志偉",
    nameEn: "Chi-Wai Chan",
    title: "客戶服務經理",
    titleEn: "Customer Service Manager",
    company: "旅遊服務公司",
    companyEn: "Travel Services Co",
    rating: 4,
    location: "澳門",
    locationEn: "Macau"
  },
  {
    id: 10,
    category: "n8n",
    content: "用 n8n 建立嘅報告自動化系統真係改變咗我哋嘅工作流程，每個月慳返最少 20 個工作小時，而且數據準確性大大提高。",
    contentEn: "The reporting automation system built with n8n truly transformed our workflow. We save at least 20 work hours every month, and data accuracy has greatly improved.",
    name: "鄭淑雯",
    nameEn: "Shu-Wen Zheng",
    title: "財務分析師",
    titleEn: "Financial Analyst",
    company: "投資公司",
    companyEn: "Investment Company",
    rating: 5,
    location: "深圳",
    locationEn: "Shenzhen"
  },

  // 客製化代碼自動化相關評價
  {
    id: 11,
    category: "code",
    content: "我哋需要一個連接內部 ERP 同 CRM 嘅客製化方案。AI Formula 嘅團隊寫嘅代碼好乾淨，整合過程好順利，解決咗我哋一個長期存在嘅數據孤島問題。",
    contentEn: "We needed a custom solution to connect our internal ERP and CRM. The AI Formula team wrote clean code, the integration was seamless, and it solved a long-standing data silo problem for us.",
    name: "周德明",
    nameEn: "De-Ming Zhou",
    title: "技術總監",
    titleEn: "Technical Director",
    company: "製造業集團",
    companyEn: "Manufacturing Group",
    rating: 5,
    location: "上海",
    locationEn: "Shanghai"
  },
  {
    id: 12,
    category: "code",
    content: "Jason 幫我哋開發嘅客製化 chatbot 真係好強大，可以處理 80% 嘅常見客戶查詢，而且會自動學習同改進，客戶滿意度提升咗好多。",
    contentEn: "The custom chatbot Jason developed for us is incredibly powerful. It handles 80% of common customer inquiries and automatically learns and improves. Customer satisfaction has increased significantly.",
    name: "葉淑敏",
    nameEn: "Shu-Min Ye",
    title: "數碼轉型經理",
    titleEn: "Digital Transformation Manager",
    company: "零售連鎖店",
    companyEn: "Retail Chain",
    rating: 5,
    location: "香港",
    locationEn: "Hong Kong"
  },
  {
    id: 13,
    category: "code",
    content: "我哋嘅庫存管理系統好舊，Ken 用最新嘅技術重新開發，加入咗 AI 預測功能，而家可以提前預測需求，減少咗 30% 嘅庫存成本。",
    contentEn: "Our inventory management system was outdated. Ken redeveloped it using the latest technology and added AI prediction features. Now we can forecast demand in advance, reducing inventory costs by 30%.",
    name: "梁志豪",
    nameEn: "Chi-Ho Leung",
    title: "供應鏈總監",
    titleEn: "Supply Chain Director",
    company: "電子產品公司",
    companyEn: "Electronics Company",
    rating: 5,
    location: "廣州",
    locationEn: "Guangzhou"
  },
  {
    id: 14,
    category: "code",
    content: "AI Formula 開發嘅客製化數據分析平台令我哋可以實時監控業務表現，自動生成洞察報告，幫助管理層做更好嘅決策。",
    contentEn: "The custom data analytics platform developed by AI Formula allows us to monitor business performance in real-time and automatically generate insight reports, helping management make better decisions.",
    name: "許雅婷",
    nameEn: "Ya-Ting Xu",
    title: "商業智能主管",
    titleEn: "Business Intelligence Manager",
    company: "金融服務公司",
    companyEn: "Financial Services",
    rating: 4,
    location: "台北",
    locationEn: "Taipei"
  },
  {
    id: 15,
    category: "code",
    content: "團隊幫我哋建立嘅 API 整合方案非常穩定，將我哋 5 個唔同嘅系統連接埋一齊，數據同步問題完全解決咗，工作效率提升好明顯。",
    contentEn: "The API integration solution the team built for us is incredibly stable. It connected our 5 different systems, completely solved data synchronization issues, and work efficiency improved significantly.",
    name: "蔡志強",
    nameEn: "Chi-Keung Tsai",
    title: "系統架構師",
    titleEn: "System Architect",
    company: "科技初創公司",
    companyEn: "Tech Startup",
    rating: 5,
    location: "深圳",
    locationEn: "Shenzhen"
  }
];

// 根據類別篩選評價的輔助函數
export const getTestimonialsByCategory = (category?: 'learning' | 'n8n' | 'code'): Testimonial[] => {
  if (!category) return testimonialsData;
  return testimonialsData.filter(testimonial => testimonial.category === category);
};

// 隨機選擇指定數量的評價
export const getRandomTestimonials = (count: number = 6, category?: 'learning' | 'n8n' | 'code'): Testimonial[] => {
  const filteredTestimonials = getTestimonialsByCategory(category);
  const shuffled = [...filteredTestimonials].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// 確保每個類別都有代表的混合選擇
export const getMixedTestimonials = (count: number = 6): Testimonial[] => {
  const learningCount = Math.ceil(count * 0.4); // 40% learning
  const n8nCount = Math.ceil(count * 0.3); // 30% n8n
  const codeCount = count - learningCount - n8nCount; // 剩餘為 code

  const learning = getRandomTestimonials(learningCount, 'learning');
  const n8n = getRandomTestimonials(n8nCount, 'n8n');
  const code = getRandomTestimonials(codeCount, 'code');

  const mixed = [...learning, ...n8n, ...code];
  return mixed.sort(() => Math.random() - 0.5); // 隨機打亂順序
};

// 專門為新設計的隨機選擇3個不重複評價
export const getRandomThreeTestimonials = (): Testimonial[] => {
  const shuffled = [...testimonialsData].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}; 