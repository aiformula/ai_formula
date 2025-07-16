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
  id: string;  // 改為string類型
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

export const courses: Course[] = [
  {
    id: "ai-business-automation",  // 改為字符串ID
    title: "AI Business Automation",
    titleCht: "AI 商業自動化",
    description: "Learn AI automation for business",
    descriptionCht: "學習商業AI自動化",
    longDescription: "Comprehensive AI automation course",
    longDescriptionCht: "全面的AI自動化課程",
    instructor: "Kenneth",
    instructorCht: "Kenneth",
    duration: "12 weeks",
    durationCht: "12週",
    students: 1000,
    rating: 4.8,
    reviewCount: 200,
    level: "Intermediate",
    levelCht: "中級",
    price: 3999,
    originalPrice: 4999,
    currency: "HKD",
    image: "🤖",
    category: "AI Automation",
    categoryCht: "AI自動化",
    tags: ["AI", "Automation", "Business"],
    tagsCht: ["人工智能", "自動化", "商業"],
    featured: true,
    bestseller: true,
    newCourse: false,
    modules: [],
    requirements: [],
    requirementsCht: [],
    whatYouWillLearn: [],
    whatYouWillLearnCht: [],
    targetAudience: [],
    targetAudienceCht: [],
    createdDate: new Date("2024-01-01"),
    lastUpdated: new Date("2024-12-01")
  }
];

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