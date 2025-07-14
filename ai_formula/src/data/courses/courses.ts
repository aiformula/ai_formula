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
  levelCht: '?��?' | '中�?' | '高�?';
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
  levelCht: '?��?' | '中�?' | '高�?';
  price: number;
  originalPrice?: number;
  featured: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "AI Fundamentals for Hong Kong Business",
    titleCht: "香港企業AI?��?課�?",
    description: "Learn the essential AI concepts and how to apply them in Hong Kong business context.",
    descriptionCht: "學�?AI?�本概念，�?�??何在香港?�業?��?中�??�人工智?��?術�?,
    longDescription: "This comprehensive course is designed specifically for Hong Kong business professionals who want to understand and leverage AI technologies. You'll learn practical AI applications, implementation strategies, and how to identify opportunities for AI integration in your business processes.",
    longDescriptionCht: "?�個全?��?課�?專為?��??�解?��??�AI?�術�?香港?�業專業人士?�設計。�?將學習實?��?AI?�用?�實?��??��?以�?如�?識別?�業?��?程中?��?AI?��??��?,
    instructor: "Kenneth Wong",
    instructorCht: "黃�???,
    duration: "8 weeks",
    durationCht: "8??,
    students: 1247,
    rating: 4.8,
    reviewCount: 234,
    level: "Beginner",
    levelCht: "?��?",
    price: 2999,
    originalPrice: 3999,
    currency: "HKD",
    image: "??",
    category: "AI Fundamentals",
    categoryCht: "AI?��?",
    tags: ["AI", "Business", "Hong Kong", "Automation"],
    tagsCht: ["人工?�能", "?�業", "香港", "?��???],
    featured: true,
    bestseller: true,
    newCourse: false,
    modules: [
      {
        id: 1,
        title: "Introduction to AI for Business",
        titleCht: "?�業AI?��?",
        description: "Understanding AI basics and business applications",
        descriptionCht: "?�解AI?��??��??��?業�???,
        duration: "2 hours",
        videoCount: 8,
        completed: false
      },
      {
        id: 2,
        title: "AI Tools and Platforms",
        titleCht: "AI工具?�平??,
        description: "Overview of popular AI tools and how to choose the right ones",
        descriptionCht: "?��?AI工具概覽以�?如�??��??�適?�工??,
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 3,
        title: "Implementation Strategies",
        titleCht: "實施策略",
        description: "Step-by-step guide to implementing AI in your business",
        descriptionCht: "?��?業中實施AI?�逐步?��?",
        duration: "2.5 hours",
        videoCount: 10,
        completed: false
      },
      {
        id: 4,
        title: "ROI and Performance Measurement",
        titleCht: "?��??�報?��?績�?測�?",
        description: "How to measure the success of your AI initiatives",
        descriptionCht: "如�?衡�?AI?�目?��???,
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
      "?�本?�腦?�??,
      "?��?AI經�?",
      "?�業?�管?��??�優??
    ],
    whatYouWillLearn: [
      "Understand core AI concepts and terminology",
      "Identify AI opportunities in your business",
      "Choose the right AI tools and platforms",
      "Develop an AI implementation strategy",
      "Measure ROI of AI initiatives"
    ],
    whatYouWillLearnCht: [
      "?�解?��?AI概念?��?�?,
      "識別企業中�?AI機�?",
      "?��??�適?�AI工具?�平??,
      "?��?AI實施策略",
      "衡�?AI?�目?��?資�??��?"
    ],
    targetAudience: [
      "Business owners and entrepreneurs",
      "Managers and executives",
      "Consultants and advisors",
      "Anyone interested in AI for business"
    ],
    targetAudienceCht: [
      "企業主�??�業??,
      "經�??��?�?,
      "顧�??�顧??,
      "對�?業AI?��?�??任�?�?
    ],
    createdDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-12-01')
  },
  {
    id: 2,
    title: "Advanced Automation with Make.com & n8n",
    titleCht: "Make.com?�n8n高�??��???,
    description: "Master advanced automation techniques using Make.com and n8n for complex business workflows.",
    descriptionCht: "?�握使用Make.com?�n8n?��?複�?業�?工�?流�??��?級自?��??�術�?,
    longDescription: "Take your automation skills to the next level with this advanced course covering both Make.com and n8n platforms. Learn to create sophisticated workflows, integrate multiple systems, and build scalable automation solutions that can handle complex business processes.",
    longDescriptionCht: "?��??�個涵?�Make.com?�n8n平台?��?級課程�?將�??�自?��??�?��??�到?��?水平?�學習創建�??��?工�?流�??�整?��??�系統�?並�?建能夠�??��??�業?��?程�??�擴展自?��?�?��?��???,
    instructor: "David Chen",
    instructorCht: "?��???,
    duration: "12 weeks",
    durationCht: "12??,
    students: 892,
    rating: 4.9,
    reviewCount: 156,
    level: "Advanced",
    levelCht: "高�?",
    price: 4999,
    originalPrice: 6999,
    currency: "HKD",
    image: "??,
    category: "Automation",
    categoryCht: "?��???,
    tags: ["Make.com", "n8n", "Automation", "Workflows", "Integration"],
    tagsCht: ["Make.com", "n8n", "?��???, "工�?流�?", "?��?"],
    featured: true,
    bestseller: false,
    newCourse: true,
    modules: [
      {
        id: 1,
        title: "Make.com Advanced Features",
        titleCht: "Make.com高�??�能",
        description: "Deep dive into Make.com's advanced capabilities",
        descriptionCht: "深入了解Make.com?��?級�???,
        duration: "4 hours",
        videoCount: 16,
        completed: false
      },
      {
        id: 2,
        title: "n8n Self-hosted Setup & Management",
        titleCht: "n8n?�主託管設置?�管??,
        description: "Learn to set up and manage your own n8n instance",
        descriptionCht: "學�?設置?�管?�自己�?n8n實�?",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 3,
        title: "Complex Workflow Design",
        titleCht: "複�?工�?流�?設�?",
        description: "Design and implement complex multi-step workflows",
        descriptionCht: "設�??�實?��??��?多步驟工作�?�?,
        duration: "5 hours",
        videoCount: 20,
        completed: false
      },
      {
        id: 4,
        title: "System Integration & APIs",
        titleCht: "系統?��??�API",
        description: "Connect different systems using APIs and webhooks",
        descriptionCht: "使用API?�webhook??��不�??�系�?,
        duration: "4 hours",
        videoCount: 15,
        completed: false
      },
      {
        id: 5,
        title: "Error Handling & Monitoring",
        titleCht: "?�誤?��??�監??,
        description: "Implement robust error handling and monitoring systems",
        descriptionCht: "實施強大?�錯誤�??��???��系統",
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
      "?�本?�自?��?概念?�解",
      "使用Make.com?��?似工?��?經�?",
      "?�術�??�優??,
      "?�解API?�webhook"
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
      "?�握Make.com高�??�能",
      "設置?�管?�n8n?�主託管實�?",
      "設�?複�??��?系統工�?流�?",
      "實施強大?�錯誤�???,
      "??��?�優?�自?��??�能",
      "?�自定義API?��??�整??
    ],
    targetAudience: [
      "Automation specialists",
      "Technical business analysts",
      "Developers and IT professionals",
      "Advanced Make.com users"
    ],
    targetAudienceCht: [
      "?��??��?�?,
      "?�術業?��??�師",
      "?�發人員?�IT專業人士",
      "高�?Make.com?�戶"
    ],
    createdDate: new Date('2024-11-01'),
    lastUpdated: new Date('2024-12-15')
  },
  {
    id: 3,
    title: "AI-Powered Data Analytics for SMEs",
    titleCht: "中�?企AI?��??��?",
    description: "Transform your business data into actionable insights using AI and machine learning techniques.",
    descriptionCht: "使用AI?��??�學習�?術�?企業?��?轉�??�可?��??��?察�?,
    longDescription: "This course is specifically designed for small and medium enterprises (SMEs) in Hong Kong. Learn how to collect, analyze, and interpret business data using AI-powered tools. No advanced technical skills required - we focus on practical applications that can immediately benefit your business.",
    longDescriptionCht: "?�個課程�??��?港�?中�?企業?�設計。學習�?何使?�AI工具?��??��??��?�??業�??��??�無?�高�??�術�???- ?�們�?注於?��??�為你�?企業帶�?好�??�實?��??��?,
    instructor: "Sarah Lam",
    instructorCht: "?��???,
    duration: "10 weeks",
    durationCht: "10??,
    students: 1563,
    rating: 4.7,
    reviewCount: 298,
    level: "Intermediate",
    levelCht: "中�?",
    price: 3999,
    originalPrice: 4999,
    currency: "HKD",
    image: "??",
    category: "Data Analytics",
    categoryCht: "?��??��?",
    tags: ["Data Analytics", "AI", "SME", "Business Intelligence", "Hong Kong"],
    tagsCht: ["?��??��?", "人工?�能", "中�?�?, "?�業?�能", "香港"],
    featured: true,
    bestseller: true,
    newCourse: false,
    modules: [
      {
        id: 1,
        title: "Data Collection and Preparation",
        titleCht: "?��??��??��???,
        description: "Learn to collect and clean business data effectively",
        descriptionCht: "學�??��??��??��??�業?�數??,
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 2,
        title: "AI Analytics Tools Overview",
        titleCht: "AI?��?工具概覽",
        description: "Introduction to popular AI analytics platforms",
        descriptionCht: "?��?AI?��?平台介紹",
        duration: "2.5 hours",
        videoCount: 10,
        completed: false
      },
      {
        id: 3,
        title: "Predictive Analytics for Business",
        titleCht: "?�業?�測?��?",
        description: "Use AI to predict business trends and outcomes",
        descriptionCht: "使用AI?�測?�業趨勢?��???,
        duration: "4 hours",
        videoCount: 16,
        completed: false
      },
      {
        id: 4,
        title: "Customer Analytics and Segmentation",
        titleCht: "客戶?��??�細??,
        description: "Understand your customers better with AI analytics",
        descriptionCht: "?��?AI?��??�好?��?�???�客??,
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 5,
        title: "Visualization and Reporting",
        titleCht: "?��??��??��?",
        description: "Create compelling data visualizations and reports",
        descriptionCht: "?�建引人注目?�數?�可視�??�報??,
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
      "?�本?�腦?�電子表?��???,
      "?�訪?�業?�數?��??�售?�客?��?�?,
      "?��??��?經�?",
      "願�?學�??�工??
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
      "?��??��??�業?�數?�進�??��?",
      "使用AI工具?��??��??��??��?�?,
      "?�業?��?測創建�?測模??,
      "使用AI?�術進�?客戶細�?",
      "構建交�?式�?表板?�報??,
      "?�出?��?驅�??�業?�決�?
    ],
    targetAudience: [
      "SME owners and managers",
      "Marketing professionals",
      "Business analysts",
      "Anyone working with business data"
    ],
    targetAudienceCht: [
      "中�?企業主�?經�?",
      "?�銷專業人士",
      "業�??��?�?,
      "任�??��?業�??��??�人"
    ],
    createdDate: new Date('2024-03-01'),
    lastUpdated: new Date('2024-11-20')
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Business AI Transformation Track",
    titleCht: "?�業AI轉�?軌�?",
    description: "Complete path for business professionals to understand and implement AI solutions",
    descriptionCht: "?��?業�?業人士�?�??實施AI�?��?��??��??�路�?,
    icon: "??",
    duration: "6 months",
    durationCht: "6?��?",
    courseIds: [1, 3],
    level: "Beginner",
    levelCht: "?��?",
    price: 5999,
    originalPrice: 7998,
    featured: true
  },
  {
    id: 2,
    title: "Technical AI Specialist Track",
    titleCht: "?�術AI專家軌�?",
    description: "Advanced track for technical professionals and developers",
    descriptionCht: "?��?術�?業人士�??�發人員設�??��?級�???,
    icon: "?��?",
    duration: "10 months",
    durationCht: "10?��?",
    courseIds: [2],
    level: "Advanced",
    levelCht: "高�?",
    price: 4999,
    originalPrice: 6999,
    featured: true
  },
  {
    id: 3,
    title: "Complete AI Mastery Track",
    titleCht: "完整AI精通�???,
    description: "Comprehensive journey covering all aspects of AI for business",
    descriptionCht: "涵�??�業AI?�?�方?��??�面學�?之�?",
    icon: "?��",
    duration: "12 months",
    durationCht: "12?��?",
    courseIds: [1, 2, 3],
    level: "Intermediate",
    levelCht: "中�?",
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