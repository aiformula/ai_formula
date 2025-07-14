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
  levelCht: '?ç?' | 'ä¸­ç?' | 'é«˜ç?';
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
  levelCht: '?ç?' | 'ä¸­ç?' | 'é«˜ç?';
  price: number;
  originalPrice?: number;
  featured: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "AI Fundamentals for Hong Kong Business",
    titleCht: "é¦™æ¸¯ä¼æ¥­AI?ºç?èª²ç?",
    description: "Learn the essential AI concepts and how to apply them in Hong Kong business context.",
    descriptionCht: "å­¸ç?AI?ºæœ¬æ¦‚å¿µï¼Œä?è§??ä½•åœ¨é¦™æ¸¯?†æ¥­?°å?ä¸­æ??¨äººå·¥æ™º?½æ?è¡“ã€?,
    longDescription: "This comprehensive course is designed specifically for Hong Kong business professionals who want to understand and leverage AI technologies. You'll learn practical AI applications, implementation strategies, and how to identify opportunities for AI integration in your business processes.",
    longDescriptionCht: "?™å€‹å…¨?¢ç?èª²ç?å°ˆç‚º?³è??†è§£?Œé??¨AI?€è¡“ç?é¦™æ¸¯?†æ¥­å°ˆæ¥­äººå£«?Œè¨­è¨ˆã€‚ä?å°‡å­¸ç¿’å¯¦?¨ç?AI?‰ç”¨?å¯¦?½ç??¥ï?ä»¥å?å¦‚ä?è­˜åˆ¥?¨æ¥­?™æ?ç¨‹ä¸­?´å?AI?„æ??ƒã€?,
    instructor: "Kenneth Wong",
    instructorCht: "é»ƒå???,
    duration: "8 weeks",
    durationCht: "8??,
    students: 1247,
    rating: 4.8,
    reviewCount: 234,
    level: "Beginner",
    levelCht: "?ç?",
    price: 2999,
    originalPrice: 3999,
    currency: "HKD",
    image: "??",
    category: "AI Fundamentals",
    categoryCht: "AI?ºç?",
    tags: ["AI", "Business", "Hong Kong", "Automation"],
    tagsCht: ["äººå·¥?ºèƒ½", "?†æ¥­", "é¦™æ¸¯", "?ªå???],
    featured: true,
    bestseller: true,
    newCourse: false,
    modules: [
      {
        id: 1,
        title: "Introduction to AI for Business",
        titleCht: "?†æ¥­AI?¥é?",
        description: "Understanding AI basics and business applications",
        descriptionCht: "?†è§£AI?ºç??¥è??Œå?æ¥­æ???,
        duration: "2 hours",
        videoCount: 8,
        completed: false
      },
      {
        id: 2,
        title: "AI Tools and Platforms",
        titleCht: "AIå·¥å…·?Œå¹³??,
        description: "Overview of popular AI tools and how to choose the right ones",
        descriptionCht: "?±é?AIå·¥å…·æ¦‚è¦½ä»¥å?å¦‚ä??¸æ??ˆé©?„å·¥??,
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 3,
        title: "Implementation Strategies",
        titleCht: "å¯¦æ–½ç­–ç•¥",
        description: "Step-by-step guide to implementing AI in your business",
        descriptionCht: "?¨ä?æ¥­ä¸­å¯¦æ–½AI?„é€æ­¥?‡å?",
        duration: "2.5 hours",
        videoCount: 10,
        completed: false
      },
      {
        id: 4,
        title: "ROI and Performance Measurement",
        titleCht: "?•è??žå ±?‡å?ç¸¾æ?æ¸¬é?",
        description: "How to measure the success of your AI initiatives",
        descriptionCht: "å¦‚ä?è¡¡é?AI?…ç›®?„æ???,
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
      "?ºæœ¬?»è…¦?€??,
      "?¡é?AIç¶“é?",
      "?†æ¥­?–ç®¡?†è??¯å„ª??
    ],
    whatYouWillLearn: [
      "Understand core AI concepts and terminology",
      "Identify AI opportunities in your business",
      "Choose the right AI tools and platforms",
      "Develop an AI implementation strategy",
      "Measure ROI of AI initiatives"
    ],
    whatYouWillLearnCht: [
      "?†è§£?¸å?AIæ¦‚å¿µ?Œè?èª?,
      "è­˜åˆ¥ä¼æ¥­ä¸­ç?AIæ©Ÿæ?",
      "?¸æ??ˆé©?„AIå·¥å…·?Œå¹³??,
      "?¶å?AIå¯¦æ–½ç­–ç•¥",
      "è¡¡é?AI?…ç›®?„æ?è³‡å??±ç?"
    ],
    targetAudience: [
      "Business owners and entrepreneurs",
      "Managers and executives",
      "Consultants and advisors",
      "Anyone interested in AI for business"
    ],
    targetAudienceCht: [
      "ä¼æ¥­ä¸»å??µæ¥­??,
      "ç¶“ç??Œé?ç®?,
      "é¡§å??Œé¡§??,
      "å°å?æ¥­AI?Ÿè?è¶??ä»»ä?äº?
    ],
    createdDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-12-01')
  },
  {
    id: 2,
    title: "Advanced Automation with Make.com & n8n",
    titleCht: "Make.com?‡n8né«˜ç??ªå???,
    description: "Master advanced automation techniques using Make.com and n8n for complex business workflows.",
    descriptionCht: "?Œæ¡ä½¿ç”¨Make.com?Œn8n?²è?è¤‡é?æ¥­å?å·¥ä?æµç??„é?ç´šè‡ª?•å??€è¡“ã€?,
    longDescription: "Take your automation skills to the next level with this advanced course covering both Make.com and n8n platforms. Learn to create sophisticated workflows, integrate multiple systems, and build scalable automation solutions that can handle complex business processes.",
    longDescriptionCht: "?šé??™å€‹æ¶µ?‹Make.com?Œn8nå¹³å°?„é?ç´šèª²ç¨‹ï?å°‡ä??„è‡ª?•å??€?½æ??‡åˆ°?°ç?æ°´å¹³?‚å­¸ç¿’å‰µå»ºè??œç?å·¥ä?æµç??æ•´?ˆå??‹ç³»çµ±ï?ä¸¦æ?å»ºèƒ½å¤ è??†è??œæ¥­?™æ?ç¨‹ç??¯æ“´å±•è‡ª?•å?è§?±º?¹æ???,
    instructor: "David Chen",
    instructorCht: "?³å???,
    duration: "12 weeks",
    durationCht: "12??,
    students: 892,
    rating: 4.9,
    reviewCount: 156,
    level: "Advanced",
    levelCht: "é«˜ç?",
    price: 4999,
    originalPrice: 6999,
    currency: "HKD",
    image: "??,
    category: "Automation",
    categoryCht: "?ªå???,
    tags: ["Make.com", "n8n", "Automation", "Workflows", "Integration"],
    tagsCht: ["Make.com", "n8n", "?ªå???, "å·¥ä?æµç?", "?´å?"],
    featured: true,
    bestseller: false,
    newCourse: true,
    modules: [
      {
        id: 1,
        title: "Make.com Advanced Features",
        titleCht: "Make.comé«˜ç??Ÿèƒ½",
        description: "Deep dive into Make.com's advanced capabilities",
        descriptionCht: "æ·±å…¥äº†è§£Make.com?„é?ç´šå???,
        duration: "4 hours",
        videoCount: 16,
        completed: false
      },
      {
        id: 2,
        title: "n8n Self-hosted Setup & Management",
        titleCht: "n8n?ªä¸»è¨—ç®¡è¨­ç½®?Œç®¡??,
        description: "Learn to set up and manage your own n8n instance",
        descriptionCht: "å­¸ç?è¨­ç½®?Œç®¡?†è‡ªå·±ç?n8nå¯¦ä?",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 3,
        title: "Complex Workflow Design",
        titleCht: "è¤‡é?å·¥ä?æµç?è¨­è?",
        description: "Design and implement complex multi-step workflows",
        descriptionCht: "è¨­è??Œå¯¦?½è??œç?å¤šæ­¥é©Ÿå·¥ä½œæ?ç¨?,
        duration: "5 hours",
        videoCount: 20,
        completed: false
      },
      {
        id: 4,
        title: "System Integration & APIs",
        titleCht: "ç³»çµ±?´å??‡API",
        description: "Connect different systems using APIs and webhooks",
        descriptionCht: "ä½¿ç”¨API?Œwebhook??Ž¥ä¸å??„ç³»çµ?,
        duration: "4 hours",
        videoCount: 15,
        completed: false
      },
      {
        id: 5,
        title: "Error Handling & Monitoring",
        titleCht: "?¯èª¤?•ç??Œç›£??,
        description: "Implement robust error handling and monitoring systems",
        descriptionCht: "å¯¦æ–½å¼·å¤§?„éŒ¯èª¤è??†å???Ž§ç³»çµ±",
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
      "?ºæœ¬?„è‡ª?•å?æ¦‚å¿µ?†è§£",
      "ä½¿ç”¨Make.com?–é?ä¼¼å·¥?·ç?ç¶“é?",
      "?€è¡“è??¯å„ª??,
      "?†è§£API?Œwebhook"
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
      "?Œæ¡Make.comé«˜ç??Ÿèƒ½",
      "è¨­ç½®?Œç®¡?†n8n?ªä¸»è¨—ç®¡å¯¦ä?",
      "è¨­è?è¤‡é??„å?ç³»çµ±å·¥ä?æµç?",
      "å¯¦æ–½å¼·å¤§?„éŒ¯èª¤è???,
      "??Ž§?Œå„ª?–è‡ª?•å??§èƒ½",
      "?‡è‡ªå®šç¾©API?Œæ??™æ•´??
    ],
    targetAudience: [
      "Automation specialists",
      "Technical business analysts",
      "Developers and IT professionals",
      "Advanced Make.com users"
    ],
    targetAudienceCht: [
      "?ªå??–å?å®?,
      "?€è¡“æ¥­?™å??å¸«",
      "?‹ç™¼äººå“¡?ŒITå°ˆæ¥­äººå£«",
      "é«˜ç?Make.com?¨æˆ¶"
    ],
    createdDate: new Date('2024-11-01'),
    lastUpdated: new Date('2024-12-15')
  },
  {
    id: 3,
    title: "AI-Powered Data Analytics for SMEs",
    titleCht: "ä¸­å?ä¼AI?¸æ??†æ?",
    description: "Transform your business data into actionable insights using AI and machine learning techniques.",
    descriptionCht: "ä½¿ç”¨AI?Œæ??¨å­¸ç¿’æ?è¡“å?ä¼æ¥­?¸æ?è½‰å??ºå¯?ä??„æ?å¯Ÿã€?,
    longDescription: "This course is specifically designed for small and medium enterprises (SMEs) in Hong Kong. Learn how to collect, analyze, and interpret business data using AI-powered tools. No advanced technical skills required - we focus on practical applications that can immediately benefit your business.",
    longDescriptionCht: "?™å€‹èª²ç¨‹å??ºé?æ¸¯ç?ä¸­å?ä¼æ¥­?Œè¨­è¨ˆã€‚å­¸ç¿’å?ä½•ä½¿?¨AIå·¥å…·?¶é??å??å?è§??æ¥­å??¸æ??‚ç„¡?€é«˜ç??€è¡“æ???- ?‘å€‘å?æ³¨æ–¼?½ç??³ç‚ºä½ ç?ä¼æ¥­å¸¶ä?å¥½è??„å¯¦?¨æ??¨ã€?,
    instructor: "Sarah Lam",
    instructorCht: "?—ç???,
    duration: "10 weeks",
    durationCht: "10??,
    students: 1563,
    rating: 4.7,
    reviewCount: 298,
    level: "Intermediate",
    levelCht: "ä¸­ç?",
    price: 3999,
    originalPrice: 4999,
    currency: "HKD",
    image: "??",
    category: "Data Analytics",
    categoryCht: "?¸æ??†æ?",
    tags: ["Data Analytics", "AI", "SME", "Business Intelligence", "Hong Kong"],
    tagsCht: ["?¸æ??†æ?", "äººå·¥?ºèƒ½", "ä¸­å?ä¼?, "?†æ¥­?ºèƒ½", "é¦™æ¸¯"],
    featured: true,
    bestseller: true,
    newCourse: false,
    modules: [
      {
        id: 1,
        title: "Data Collection and Preparation",
        titleCht: "?¸æ??¶é??Œæ???,
        description: "Learn to collect and clean business data effectively",
        descriptionCht: "å­¸ç??‰æ??¶é??Œæ??†æ¥­?™æ•¸??,
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 2,
        title: "AI Analytics Tools Overview",
        titleCht: "AI?†æ?å·¥å…·æ¦‚è¦½",
        description: "Introduction to popular AI analytics platforms",
        descriptionCht: "?±é?AI?†æ?å¹³å°ä»‹ç´¹",
        duration: "2.5 hours",
        videoCount: 10,
        completed: false
      },
      {
        id: 3,
        title: "Predictive Analytics for Business",
        titleCht: "?†æ¥­?æ¸¬?†æ?",
        description: "Use AI to predict business trends and outcomes",
        descriptionCht: "ä½¿ç”¨AI?æ¸¬?†æ¥­è¶¨å‹¢?Œç???,
        duration: "4 hours",
        videoCount: 16,
        completed: false
      },
      {
        id: 4,
        title: "Customer Analytics and Segmentation",
        titleCht: "å®¢æˆ¶?†æ??Œç´°??,
        description: "Understand your customers better with AI analytics",
        descriptionCht: "?šé?AI?†æ??´å¥½?°ä?è§???„å®¢??,
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 5,
        title: "Visualization and Reporting",
        titleCht: "?¯è??–å??±å?",
        description: "Create compelling data visualizations and reports",
        descriptionCht: "?µå»ºå¼•äººæ³¨ç›®?„æ•¸?šå¯è¦–å??Œå ±??,
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
      "?ºæœ¬?»è…¦?Œé›»å­è¡¨?¼æ???,
      "?¯è¨ª?æ¥­?™æ•¸?šï??·å”®?å®¢?¶ç?ï¼?,
      "?¡é??†æ?ç¶“é?",
      "é¡˜æ?å­¸ç??°å·¥??
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
      "?¶é??Œæ??™æ¥­?™æ•¸?šé€²è??†æ?",
      "ä½¿ç”¨AIå·¥å…·?²è??¸æ??†æ??Œæ?å¯?,
      "?ºæ¥­?™é?æ¸¬å‰µå»ºé?æ¸¬æ¨¡??,
      "ä½¿ç”¨AI?€è¡“é€²è?å®¢æˆ¶ç´°å?",
      "æ§‹å»ºäº¤ä?å¼å?è¡¨æ¿?Œå ±??,
      "?šå‡º?¸æ?é©…å??„æ¥­?™æ±ºç­?
    ],
    targetAudience: [
      "SME owners and managers",
      "Marketing professionals",
      "Business analysts",
      "Anyone working with business data"
    ],
    targetAudienceCht: [
      "ä¸­å?ä¼æ¥­ä¸»å?ç¶“ç?",
      "?ŸéŠ·å°ˆæ¥­äººå£«",
      "æ¥­å??†æ?å¸?,
      "ä»»ä??•ç?æ¥­å??¸æ??„äºº"
    ],
    createdDate: new Date('2024-03-01'),
    lastUpdated: new Date('2024-11-20')
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Business AI Transformation Track",
    titleCht: "?†æ¥­AIè½‰å?è»Œé?",
    description: "Complete path for business professionals to understand and implement AI solutions",
    descriptionCht: "?ºå?æ¥­å?æ¥­äººå£«ç?è§??å¯¦æ–½AIè§?±º?¹æ??„å??´è·¯å¾?,
    icon: "??",
    duration: "6 months",
    durationCht: "6?‹æ?",
    courseIds: [1, 3],
    level: "Beginner",
    levelCht: "?ç?",
    price: 5999,
    originalPrice: 7998,
    featured: true
  },
  {
    id: 2,
    title: "Technical AI Specialist Track",
    titleCht: "?€è¡“AIå°ˆå®¶è»Œé?",
    description: "Advanced track for technical professionals and developers",
    descriptionCht: "?ºæ?è¡“å?æ¥­äººå£«å??‹ç™¼äººå“¡è¨­è??„é?ç´šè???,
    icon: "?™ï?",
    duration: "10 months",
    durationCht: "10?‹æ?",
    courseIds: [2],
    level: "Advanced",
    levelCht: "é«˜ç?",
    price: 4999,
    originalPrice: 6999,
    featured: true
  },
  {
    id: 3,
    title: "Complete AI Mastery Track",
    titleCht: "å®Œæ•´AIç²¾é€šè???,
    description: "Comprehensive journey covering all aspects of AI for business",
    descriptionCht: "æ¶µè??†æ¥­AI?€?‰æ–¹?¢ç??¨é¢å­¸ç?ä¹‹æ?",
    icon: "?Ž¯",
    duration: "12 months",
    durationCht: "12?‹æ?",
    courseIds: [1, 2, 3],
    level: "Intermediate",
    levelCht: "ä¸­ç?",
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