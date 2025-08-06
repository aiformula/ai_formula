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
    id: 'prompt-engineering-course',
    title: 'Mastering Prompt Engineering: A Complete Practical Guide from Basics to Advanced',
    titleCht: '精通提示工程：從基礎到進階的完整實戰指南',
    description: 'Master the art of AI communication and unlock the full potential of artificial intelligence',
    descriptionCht: '掌握與 AI 溝通的藝術，釋放人工智能的全部潛能',
    longDescription: 'This comprehensive prompt engineering course breaks down complex AI communication techniques into clear steps. Whether you\'re a beginner or looking to systematically improve your skills, this course will help you communicate effectively with AI models and achieve precise, high-quality outputs.',
    longDescriptionCht: '這是一門全面的提示工程課程，將複雜的 AI 溝通技巧拆解成清晰的步驟。無論您是初學者還是希望系統化提升技能，本課程都將幫助您有效地與 AI 模型溝通，獲得精準、高質量的輸出結果。',
    instructor: 'AI Formula Team',
    instructorCht: 'AI Formula 團隊',
    duration: '6+ Hours',
    durationCht: '6+ 小時',
    students: 500,
    rating: 4.9,
    reviewCount: 89,
    level: 'Beginner',
    levelCht: '初級',
    price: 0,
    currency: 'HKD',
    image: '/images/courses/prompt-engineering-course-cover.jpg',
    category: 'AI Technology',
    categoryCht: 'AI 技術',
    tags: ['Prompt Engineering', 'AI Communication', 'Artificial Intelligence', 'Practical Guide'],
    tagsCht: ['提示工程', 'AI 溝通', '人工智能', '實戰指南'],
    featured: true,
    bestseller: false,
    newCourse: true,
    modules: [
      {
        id: 1,
        title: 'Foundations of Prompt Engineering',
        titleCht: '提示工程基礎',
        description: 'Understanding core concepts and basic components',
        descriptionCht: '理解核心概念和基本構成元素',
        duration: '80 minutes',
        videoCount: 5,
        completed: false
      },
      {
        id: 2,
        title: 'Core Techniques and Frameworks',
        titleCht: '核心技巧與框架',
        description: 'Learning practical techniques and proven frameworks',
        descriptionCht: '學習實用技巧和經過驗證的框架',
        duration: '150 minutes',
        videoCount: 6,
        completed: false
      },
      {
        id: 3,
        title: 'Advanced Strategies',
        titleCht: '進階策略',
        description: 'Mastering complex prompting strategies',
        descriptionCht: '掌握複雜的提示策略',
        duration: '120 minutes',
        videoCount: 4,
        completed: false
      },
      {
        id: 4,
        title: 'Practical Applications',
        titleCht: '實踐應用',
        description: 'Real-world applications and case studies',
        descriptionCht: '真實世界應用和案例研究',
        duration: '40 minutes',
        videoCount: 1,
        completed: false
      }
    ],
    requirements: [
      'Basic computer operation skills',
      'Basic understanding of artificial intelligence',
      'Experience with ChatGPT or similar AI tools (recommended but not required)'
    ],
    requirementsCht: [
      '基本電腦操作能力',
      '對人工智能的基本了解',
      'ChatGPT 或類似 AI 工具的使用經驗（建議但非必需）'
    ],
    whatYouWillLearn: [
      'Deep understanding of core concepts and principles of prompt engineering',
      'Master various practical prompting techniques and frameworks',
      'Learn to design and optimise complex prompt instructions',
      'Apply advanced strategies to solve real-world problems',
      'Develop independent prompt engineering capabilities for AI applications'
    ],
    whatYouWillLearnCht: [
      '深入理解提示工程的核心概念和原理',
      '掌握多種實用的提示技巧和框架',
      '學會設計和優化複雜的提示指令',
      '能夠應用進階策略解決實際問題',
      '具備獨立開發 AI 應用的提示能力'
    ],
    targetAudience: [
      'AI enthusiasts and beginners',
      'Business professionals looking to leverage AI',
      'Content creators and marketers',
      'Developers and technical professionals',
      'Students and researchers'
    ],
    targetAudienceCht: [
      'AI 愛好者和初學者',
      '希望運用 AI 的商業專業人士',
      '內容創作者和營銷人員',
      '開發者和技術專業人士',
      '學生和研究人員'
    ],
    createdDate: new Date('2024-12-20'),
    lastUpdated: new Date('2024-12-20')
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