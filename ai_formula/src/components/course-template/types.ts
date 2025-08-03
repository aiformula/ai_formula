/**
 * Course Template Types
 * @fileoverview 通用課程模板的類型定義
 * @author AI Formula Team
 * @version 1.0.0
 */

export interface CourseConfig {
  // 基本配置
  courseId: string; // e.g., 'chatgpt', 'perplexity'
  courseName: string; // e.g., 'ChatGPT Complete Course', 'Perplexity AI Ultimate Master Course'
  
  // 主題配色
  themeColor: string; // e.g., '#10a37f', '#1a1a1a'
  accentColor?: string; // 次要顏色
  
  // 路由配置
  baseRoute: string; // e.g., '/courses/chatgpt-complete-course', '/courses/perplexity-complete-course'
  
  // 數據來源
  dataSource: any; // 課程數據對象
  
  // 進度追蹤 Hook
  progressHook: () => any; // e.g., useChatGPTProgress, usePerplexityProgress
  
  // CSS 類名前綴
  cssPrefix: string; // e.g., 'chatgpt', 'perplexity'
}

export interface CourseData {
  courseInfo: {
    // 基本資訊 - 支持新格式
    badge?: string;
    badgeEn?: string;
    title: string;
    titleEn?: string;
    subtitle?: string;
    subtitleEn?: string;
    description?: string; // 新增支持
    descriptionEn?: string; // 新增支持
    instructor: string;
    instructorEn?: string;
    instructorTitle: string;
    instructorTitleEn?: string;
    rating?: number;
    students?: number;
    duration: string;
    durationEn?: string;
    lastUpdated?: string;
    
    // 新增字段
    level?: string;
    levelEn?: string;
    totalLessons?: number;
    totalHours?: number;
    language?: string;
    tags?: string[];
    tagsEn?: string[];
    prerequisites?: string[];
    prerequisitesEn?: string[];
    learningOutcomes?: string[];
    learningOutcomesEn?: string[];
  };
  courseStats?: {
    totalHours: number;
    totalLessons: number;
    totalQuizzes: number;
    completionRate: number;
  };
  courseFeatures?: string[];
  courseFeaturesEn?: string[];
  targetAudience: string[];
  targetAudienceEn?: string[];
  courseModules: CourseModule[];
  faqData?: FAQItem[];
  isFree?: boolean;
}

export interface CourseModule {
  id: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  duration?: string;
  durationEn?: string;
  lessons: CourseLesson[];
  quiz?: QuizData;
}

export interface CourseLesson {
  id: number;
  title: string;
  titleEn?: string;
  duration: string;
  durationEn?: string;
  type: 'text' | 'video' | 'interactive';
  description: string;
  descriptionEn?: string;
  image: string;
  imageAlt: string;
  imageAltEn?: string;
  transcript: string;
  transcriptEn?: string;
  keyPoints: string[];
  keyPointsEn?: string[];
  completed?: boolean;
}

export interface QuizData {
  title: string;
  titleEn?: string;
  description?: string; // 新增支持
  descriptionEn?: string;
  timeLimit?: number; // 新增支持
  passingScore?: number; // 新增支持
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionEn?: string;
  type: 'single' | 'multiple' | 'boolean';
  options: string[];
  optionsEn?: string[];
  correctAnswer: number | number[];
  explanation: string;
  explanationEn?: string;
}

export interface FAQItem {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
}

// Lesson 類型（用於進度追蹤）
export interface Lesson {
  id: number;
  title: string;
  titleEn?: string;
  duration?: string;
  durationEn?: string;
  description?: string;
  descriptionEn?: string;
  completed?: boolean;
}

// 主題進度資訊類型
export interface ThemeProgressInfo {
  completedUnits: number[];
  totalUnits: number;
  progressPercentage: number;
} 