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
    id: 'claude-course',
    title: 'Claude Mastery: From Fundamentals to Advanced Practice',
    titleCht: 'Claude 全方位精通課程：從入門到專業應用',
    description: 'Master Claude’s features, prompting and responsible use across 6 focused lessons.',
    descriptionCht: '以 6 節重點課程掌握 Claude 功能、提示工程與負責任使用。',
    longDescription: 'A complete Claude course covering Anthropic background, model family (3/3.5/3.7), web UI, files/vision/search, prompting techniques and responsible usage.',
    longDescriptionCht: '完整覆蓋 Anthropic 背景、模型家族（3/3.5/3.7）、網頁介面、檔案/視覺/搜尋、提示技巧與負責任使用。',
    instructor: 'AI Formula Team',
    instructorCht: 'AI Formula 團隊',
    duration: '6+ Hours',
    durationCht: '6+ 小時',
    students: 1200,
    rating: 4.9,
    reviewCount: 48,
    level: 'Beginner',
    levelCht: '初級',
    price: 0,
    currency: 'HKD',
    image: '/images/courses/claude-course-cover.jpg',
    category: 'AI Technology',
    categoryCht: 'AI 技術',
    tags: ['Claude', 'Anthropic', 'Prompt Engineering'],
    tagsCht: ['Claude', 'Anthropic', '提示工程'],
    featured: true,
    bestseller: false,
    newCourse: true,
    modules: [
      { id: 1, title: 'Introduction to Claude', titleCht: '導論', description: 'Overview', descriptionCht: '導覽', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 2, title: 'Model Family', titleCht: '模型家族', description: '3/3.5/3.7', descriptionCht: '3/3.5/3.7', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 3, title: 'Web Interface', titleCht: '介面', description: 'Projects & settings', descriptionCht: 'Projects 與設定', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 4, title: 'Core Features', titleCht: '核心功能', description: 'Files/Vision/Search', descriptionCht: '檔案/視覺/搜尋', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 5, title: 'Prompting Essentials', titleCht: '提示工程', description: 'XML/Few‑Shot/CoT', descriptionCht: 'XML/Few‑Shot/CoT', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 6, title: 'Responsible Use', titleCht: '負責任使用', description: 'Ethics & limits', descriptionCht: '倫理與局限', duration: '45 minutes', videoCount: 1, completed: false }
    ],
    requirements: ['Basic computer literacy'],
    requirementsCht: ['基本電腦操作能力'],
    whatYouWillLearn: ['Claude features and prompting techniques'],
    whatYouWillLearnCht: ['Claude 功能與提示工程技巧'],
    targetAudience: ['Beginners and professionals'],
    targetAudienceCht: ['初學者與專業人士'],
    createdDate: new Date('2025-08-01'),
    lastUpdated: new Date('2025-08-01')
  },
  {
    id: 'gemini-course',
    title: 'Gemini Mastery: From Fundamentals to Expert',
    titleCht: 'Gemini 權威大師班：從入門到精通的全方位指南',
    description: 'Master Gemini’s multimodal capabilities, UI, ecosystem, prompting and responsible use.',
    descriptionCht: '全面掌握 Gemini 的多模態能力、介面生態、提示工程與負責任使用。',
    longDescription: 'A complete Gemini course covering origins/mission, core tech (Ultra/Pro/Nano/Flash), product family and use‑cases, UI operations, prompting, and ethics/privacy.',
    longDescriptionCht: '完整涵蓋誕生與使命、核心技術（Ultra/Pro/Nano/Flash）、產品家族與應用、操作介面、提示工程與倫理/隱私。',
    instructor: 'AI Formula Team',
    instructorCht: 'AI Formula 團隊',
    duration: '6+ Hours',
    durationCht: '6+ 小時',
    students: 800,
    rating: 4.9,
    reviewCount: 32,
    level: 'Beginner',
    levelCht: '初級',
    price: 0,
    currency: 'HKD',
    image: '/images/courses/gemini-course-cover.jpg',
    category: 'AI Technology',
    categoryCht: 'AI 技術',
    tags: ['Gemini', 'Google', 'Multimodal'],
    tagsCht: ['Gemini', 'Google', '多模態'],
    featured: true,
    bestseller: false,
    newCourse: true,
    modules: [
      { id: 1, title: 'Origins & Mission', titleCht: '誕生與使命', description: 'From Bard to Gemini', descriptionCht: '從 Bard 到 Gemini', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 2, title: 'Core Tech', titleCht: '核心技術', description: 'Ultra/Pro/Nano/Flash', descriptionCht: 'Ultra/Pro/Nano/Flash', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 3, title: 'Products & Use', titleCht: '產品與應用', description: 'Workspace, coding, creative', descriptionCht: 'Workspace/程式/創意', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 4, title: 'UI Guide', titleCht: '介面攻略', description: 'Web/App operations', descriptionCht: 'Web/App 操作', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 5, title: 'Prompting', titleCht: '提示工程', description: 'Persona/Format/CoT', descriptionCht: '角色/格式/連鎖思考', duration: '45 minutes', videoCount: 1, completed: false },
      { id: 6, title: 'Future & Ethics', titleCht: '未來與倫理', description: 'Responsible AI & Agent', descriptionCht: 'Responsible AI 與 Agent', duration: '45 minutes', videoCount: 1, completed: false }
    ],
    requirements: ['Basic computer literacy'],
    requirementsCht: ['基本電腦操作能力'],
    whatYouWillLearn: ['Gemini multimodal capabilities and prompting techniques'],
    whatYouWillLearnCht: ['Gemini 多模態能力與提示工程技巧'],
    targetAudience: ['Beginners and professionals'],
    targetAudienceCht: ['初學者與專業人士'],
    createdDate: new Date('2025-08-01'),
    lastUpdated: new Date('2025-08-01')
  },
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