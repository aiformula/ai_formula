export interface CourseModule {
  id: number;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  duration: string;
  videoCount: number;
  completed: boolean;
}

export interface Course {
  id: number;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  longDescription: string;
  longDescriptionCht: string;
  instructor: string;
  instructorCht: string;
  duration: string;
  durationCht: string;
  students: number;
  rating: number;
  reviewCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  levelCht: '初級' | '中級' | '高級';
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  category: string;
  categoryCht: string;
  tags: string[];
  tagsCht: string[];
  featured: boolean;
  bestseller: boolean;
  newCourse: boolean;
  modules: CourseModule[];
  requirements: string[];
  requirementsCht: string[];
  whatYouWillLearn: string[];
  whatYouWillLearnCht: string[];
  targetAudience: string[];
  targetAudienceCht: string[];
  createdDate: Date;
  lastUpdated: Date;
}

export interface LearningPath {
  id: number;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  icon: string;
  duration: string;
  durationCht: string;
  courseIds: number[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  levelCht: '初級' | '中級' | '高級';
  price: number;
  originalPrice?: number;
  featured: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "AI Fundamentals for Hong Kong Business",
    titleCht: "香港企業AI基礎課程",
    description: "Learn the essential AI concepts and how to apply them in Hong Kong business context.",
    descriptionCht: "學習AI基本概念，了解如何在香港商業環境中應用人工智能技術。",
    longDescription: "This comprehensive course is designed specifically for Hong Kong business professionals who want to understand and leverage AI technologies. You'll learn practical AI applications, implementation strategies, and how to identify opportunities for AI integration in your business processes.",
    longDescriptionCht: "這個全面的課程專為想要理解和運用AI技術的香港商業專業人士而設計。你將學習實用的AI應用、實施策略，以及如何識別在業務流程中整合AI的機會。",
    instructor: "Kenneth Wong",
    instructorCht: "黃志明",
    duration: "8 weeks",
    durationCht: "8週",
    students: 1247,
    rating: 4.8,
    reviewCount: 234,
    level: "Beginner",
    levelCht: "初級",
    price: 2999,
    originalPrice: 3999,
    currency: "HKD",
    image: "🤖",
    category: "AI Fundamentals",
    categoryCht: "AI基礎",
    tags: ["AI", "Business", "Hong Kong", "Automation"],
    tagsCht: ["人工智能", "商業", "香港", "自動化"],
    featured: true,
    bestseller: true,
    newCourse: false,
    modules: [
      {
        id: 1,
        title: "Introduction to AI for Business",
        titleCht: "商業AI入門",
        description: "Understanding AI basics and business applications",
        descriptionCht: "理解AI基礎知識和商業應用",
        duration: "2 hours",
        videoCount: 8,
        completed: false
      },
      {
        id: 2,
        title: "AI Tools and Platforms",
        titleCht: "AI工具和平台",
        description: "Overview of popular AI tools and how to choose the right ones",
        descriptionCht: "熱門AI工具概覽以及如何選擇合適的工具",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 3,
        title: "Implementation Strategies",
        titleCht: "實施策略",
        description: "Step-by-step guide to implementing AI in your business",
        descriptionCht: "在企業中實施AI的逐步指南",
        duration: "2.5 hours",
        videoCount: 10,
        completed: false
      },
      {
        id: 4,
        title: "ROI and Performance Measurement",
        titleCht: "投資回報率和績效測量",
        description: "How to measure the success of your AI initiatives",
        descriptionCht: "如何衡量AI項目的成功",
        duration: "1.5 hours",
        videoCount: 6,
        completed: false
      }
    ],
    requirements: [
      "Basic computer skills",
      "No prior AI experience needed",
      "Business or management background preferred"
    ],
    requirementsCht: [
      "基本電腦技能",
      "無需AI經驗",
      "商業或管理背景優先"
    ],
    whatYouWillLearn: [
      "Understand core AI concepts and terminology",
      "Identify AI opportunities in your business",
      "Choose the right AI tools and platforms",
      "Develop an AI implementation strategy",
      "Measure ROI of AI initiatives"
    ],
    whatYouWillLearnCht: [
      "理解核心AI概念和術語",
      "識別企業中的AI機會",
      "選擇合適的AI工具和平台",
      "制定AI實施策略",
      "衡量AI項目的投資回報率"
    ],
    targetAudience: [
      "Business owners and entrepreneurs",
      "Managers and executives",
      "Consultants and advisors",
      "Anyone interested in AI for business"
    ],
    targetAudienceCht: [
      "企業主和創業者",
      "經理和高管",
      "顧問和顧問",
      "對商業AI感興趣的任何人"
    ],
    createdDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-12-01')
  },
  {
    id: 2,
    title: "Advanced Automation with Make.com & n8n",
    titleCht: "Make.com與n8n高級自動化",
    description: "Master advanced automation techniques using Make.com and n8n for complex business workflows.",
    descriptionCht: "掌握使用Make.com和n8n進行複雜業務工作流程的高級自動化技術。",
    longDescription: "Take your automation skills to the next level with this advanced course covering both Make.com and n8n platforms. Learn to create sophisticated workflows, integrate multiple systems, and build scalable automation solutions that can handle complex business processes.",
    longDescriptionCht: "通過這個涵蓋Make.com和n8n平台的高級課程，將你的自動化技能提升到新的水平。學習創建複雜的工作流程、整合多個系統，並構建能夠處理複雜業務流程的可擴展自動化解決方案。",
    instructor: "David Chen",
    instructorCht: "陳志華",
    duration: "12 weeks",
    durationCht: "12週",
    students: 892,
    rating: 4.9,
    reviewCount: 156,
    level: "Advanced",
    levelCht: "高級",
    price: 4999,
    originalPrice: 6999,
    currency: "HKD",
    image: "⚡",
    category: "Automation",
    categoryCht: "自動化",
    tags: ["Make.com", "n8n", "Automation", "Workflows", "Integration"],
    tagsCht: ["Make.com", "n8n", "自動化", "工作流程", "整合"],
    featured: true,
    bestseller: false,
    newCourse: true,
    modules: [
      {
        id: 1,
        title: "Make.com Advanced Features",
        titleCht: "Make.com高級功能",
        description: "Deep dive into Make.com's advanced capabilities",
        descriptionCht: "深入了解Make.com的高級功能",
        duration: "4 hours",
        videoCount: 16,
        completed: false
      },
      {
        id: 2,
        title: "n8n Self-hosted Setup & Management",
        titleCht: "n8n自主託管設置和管理",
        description: "Learn to set up and manage your own n8n instance",
        descriptionCht: "學習設置和管理自己的n8n實例",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 3,
        title: "Complex Workflow Design",
        titleCht: "複雜工作流程設計",
        description: "Design and implement complex multi-step workflows",
        descriptionCht: "設計和實施複雜的多步驟工作流程",
        duration: "5 hours",
        videoCount: 20,
        completed: false
      },
      {
        id: 4,
        title: "System Integration & APIs",
        titleCht: "系統整合與API",
        description: "Connect different systems using APIs and webhooks",
        descriptionCht: "使用API和webhook連接不同的系統",
        duration: "4 hours",
        videoCount: 15,
        completed: false
      },
      {
        id: 5,
        title: "Error Handling & Monitoring",
        titleCht: "錯誤處理和監控",
        description: "Implement robust error handling and monitoring systems",
        descriptionCht: "實施強大的錯誤處理和監控系統",
        duration: "2 hours",
        videoCount: 8,
        completed: false
      }
    ],
    requirements: [
      "Basic understanding of automation concepts",
      "Experience with Make.com or similar tools",
      "Technical background preferred",
      "Understanding of APIs and webhooks"
    ],
    requirementsCht: [
      "基本的自動化概念理解",
      "使用Make.com或類似工具的經驗",
      "技術背景優先",
      "理解API和webhook"
    ],
    whatYouWillLearn: [
      "Master advanced Make.com features",
      "Set up and manage n8n self-hosted instances",
      "Design complex multi-system workflows",
      "Implement robust error handling",
      "Monitor and optimize automation performance",
      "Integrate with custom APIs and services"
    ],
    whatYouWillLearnCht: [
      "掌握Make.com高級功能",
      "設置和管理n8n自主託管實例",
      "設計複雜的多系統工作流程",
      "實施強大的錯誤處理",
      "監控和優化自動化性能",
      "與自定義API和服務整合"
    ],
    targetAudience: [
      "Automation specialists",
      "Technical business analysts",
      "Developers and IT professionals",
      "Advanced Make.com users"
    ],
    targetAudienceCht: [
      "自動化專家",
      "技術業務分析師",
      "開發人員和IT專業人士",
      "高級Make.com用戶"
    ],
    createdDate: new Date('2024-11-01'),
    lastUpdated: new Date('2024-12-15')
  },
  {
    id: 3,
    title: "AI-Powered Data Analytics for SMEs",
    titleCht: "中小企AI數據分析",
    description: "Transform your business data into actionable insights using AI and machine learning techniques.",
    descriptionCht: "使用AI和機器學習技術將企業數據轉化為可操作的洞察。",
    longDescription: "This course is specifically designed for small and medium enterprises (SMEs) in Hong Kong. Learn how to collect, analyze, and interpret business data using AI-powered tools. No advanced technical skills required - we focus on practical applications that can immediately benefit your business.",
    longDescriptionCht: "這個課程專為香港的中小企業而設計。學習如何使用AI工具收集、分析和解釋業務數據。無需高級技術技能 - 我們專注於能立即為你的企業帶來好處的實用應用。",
    instructor: "Sarah Lam",
    instructorCht: "林美玲",
    duration: "10 weeks",
    durationCht: "10週",
    students: 1563,
    rating: 4.7,
    reviewCount: 298,
    level: "Intermediate",
    levelCht: "中級",
    price: 3999,
    originalPrice: 4999,
    currency: "HKD",
    image: "📊",
    category: "Data Analytics",
    categoryCht: "數據分析",
    tags: ["Data Analytics", "AI", "SME", "Business Intelligence", "Hong Kong"],
    tagsCht: ["數據分析", "人工智能", "中小企", "商業智能", "香港"],
    featured: true,
    bestseller: true,
    newCourse: false,
    modules: [
      {
        id: 1,
        title: "Data Collection and Preparation",
        titleCht: "數據收集和準備",
        description: "Learn to collect and clean business data effectively",
        descriptionCht: "學習有效收集和清理業務數據",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 2,
        title: "AI Analytics Tools Overview",
        titleCht: "AI分析工具概覽",
        description: "Introduction to popular AI analytics platforms",
        descriptionCht: "熱門AI分析平台介紹",
        duration: "2.5 hours",
        videoCount: 10,
        completed: false
      },
      {
        id: 3,
        title: "Predictive Analytics for Business",
        titleCht: "商業預測分析",
        description: "Use AI to predict business trends and outcomes",
        descriptionCht: "使用AI預測商業趨勢和結果",
        duration: "4 hours",
        videoCount: 16,
        completed: false
      },
      {
        id: 4,
        title: "Customer Analytics and Segmentation",
        titleCht: "客戶分析和細分",
        description: "Understand your customers better with AI analytics",
        descriptionCht: "通過AI分析更好地了解你的客戶",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 5,
        title: "Visualization and Reporting",
        titleCht: "可視化和報告",
        description: "Create compelling data visualizations and reports",
        descriptionCht: "創建引人注目的數據可視化和報告",
        duration: "2 hours",
        videoCount: 8,
        completed: false
      }
    ],
    requirements: [
      "Basic computer and spreadsheet skills",
      "Access to business data (sales, customer, etc.)",
      "No prior analytics experience needed",
      "Willingness to learn new tools"
    ],
    requirementsCht: [
      "基本電腦和電子表格技能",
      "可訪問業務數據（銷售、客戶等）",
      "無需分析經驗",
      "願意學習新工具"
    ],
    whatYouWillLearn: [
      "Collect and prepare business data for analysis",
      "Use AI tools for data analysis and insights",
      "Create predictive models for business forecasting",
      "Segment customers using AI techniques",
      "Build interactive dashboards and reports",
      "Make data-driven business decisions"
    ],
    whatYouWillLearnCht: [
      "收集和準備業務數據進行分析",
      "使用AI工具進行數據分析和洞察",
      "為業務預測創建預測模型",
      "使用AI技術進行客戶細分",
      "構建交互式儀表板和報告",
      "做出數據驅動的業務決策"
    ],
    targetAudience: [
      "SME owners and managers",
      "Marketing professionals",
      "Business analysts",
      "Anyone working with business data"
    ],
    targetAudienceCht: [
      "中小企業主和經理",
      "營銷專業人士",
      "業務分析師",
      "任何處理業務數據的人"
    ],
    createdDate: new Date('2024-03-01'),
    lastUpdated: new Date('2024-11-20')
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Business AI Transformation Track",
    titleCht: "商業AI轉型軌道",
    description: "Complete path for business professionals to understand and implement AI solutions",
    descriptionCht: "為商業專業人士理解和實施AI解決方案的完整路徑",
    icon: "🚀",
    duration: "6 months",
    durationCht: "6個月",
    courseIds: [1, 3],
    level: "Beginner",
    levelCht: "初級",
    price: 5999,
    originalPrice: 7998,
    featured: true
  },
  {
    id: 2,
    title: "Technical AI Specialist Track",
    titleCht: "技術AI專家軌道",
    description: "Advanced track for technical professionals and developers",
    descriptionCht: "為技術專業人士和開發人員設計的高級軌道",
    icon: "⚙️",
    duration: "10 months",
    durationCht: "10個月",
    courseIds: [2],
    level: "Advanced",
    levelCht: "高級",
    price: 4999,
    originalPrice: 6999,
    featured: true
  },
  {
    id: 3,
    title: "Complete AI Mastery Track",
    titleCht: "完整AI精通軌道",
    description: "Comprehensive journey covering all aspects of AI for business",
    descriptionCht: "涵蓋商業AI所有方面的全面學習之旅",
    icon: "🎯",
    duration: "12 months",
    durationCht: "12個月",
    courseIds: [1, 2, 3],
    level: "Intermediate",
    levelCht: "中級",
    price: 9999,
    originalPrice: 11997,
    featured: true
  }
];

// Utility functions
export const getFeaturedCourses = () => {
  return courses.filter(course => course.featured);
};

export const getCoursesByLevel = (level: string) => {
  return courses.filter(course => course.level === level);
};

export const getCoursesByCategory = (category: string) => {
  return courses.filter(course => course.category === category);
};

export const getBestsellerCourses = () => {
  return courses.filter(course => course.bestseller);
};

export const getNewCourses = () => {
  return courses.filter(course => course.newCourse);
};

export const getCourseById = (id: number) => {
  return courses.find(course => course.id === id);
};

export const getFeaturedLearningPaths = () => {
  return learningPaths.filter(path => path.featured);
};

export const getLearningPathById = (id: number) => {
  return learningPaths.find(path => path.id === id);
};

export const getCoursesForLearningPath = (pathId: number) => {
  const path = getLearningPathById(pathId);
  if (!path) return [];
  return courses.filter(course => path.courseIds.includes(course.id));
}; 