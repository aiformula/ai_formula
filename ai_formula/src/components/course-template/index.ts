/**
 * Course Template System
 * @fileoverview 課程模板系統的主要導出
 * @author AI Formula Team
 * @version 1.0.0
 */

// 主要組件
export { default as CourseRouter } from './CourseRouter';
export { default as CourseOutlineTemplate } from './CourseOutlineTemplate';
export { default as CourseLearningTemplate } from './CourseLearningTemplate';
export { default as CourseThemeTemplate } from './CourseThemeTemplate';
export { default as CourseUnitTemplate } from './CourseUnitTemplate';
export { default as CourseQuizTemplate } from './CourseQuizTemplate';

// 配置和工具
export { 
  courseConfigs,
  getCourseConfig,
  getCourseIdFromRoute,
  getAllCourses,
  courseExists
} from './courseRegistry';

// 類型定義
export type {
  CourseConfig,
  CourseData,
  CourseModule,
  CourseLesson,
  QuizData,
  QuizQuestion,
  FAQItem,
  CourseStats,
  CourseFeature,
  TargetAudience
} from './types'; 