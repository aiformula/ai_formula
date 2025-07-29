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
  // AI 商業自動化課程已被移除
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