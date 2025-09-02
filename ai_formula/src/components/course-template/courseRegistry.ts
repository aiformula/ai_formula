/**
 * Course Registry
 * @fileoverview 課程註冊中心，管理所有課程的配置和數據
 * @author AI Formula Team
 * @version 1.0.0
 */

import type { CourseConfig as TemplateCourseConfig } from './types';
import { chatGPTCourseData } from '@/data/chatgpt-complete-course-data';
import { perplexityCourseData } from '@/data/perplexity-complete-course-data';
import { midjourneyCourseData } from '@/data/midjourney-course-data';
import { promptEngineeringCourseData } from '@/data/prompt-engineering-course-data';
import { promptEngineeringExpertCourseData } from '@/data/prompt-engineering-expert-course-data';
import { claudeCourseData } from '@/data/claude-course-data';
import { geminiCourseData } from '@/data/gemini-course-data';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress';
import { usePerplexityProgress } from '@/hooks/usePerplexityProgress';
import { useMidjourneyProgress } from '@/hooks/useMidjourneyProgress';
import { usePromptEngineeringProgress } from '@/hooks/usePromptEngineeringProgress';
import { useClaudeProgress } from '@/hooks/useClaudeProgress';
import { useGeminiProgress } from '@/hooks/useGeminiProgress';

// 統一嘅進度統計接口
export interface UnifiedProgressStats {
  overallProgress: number;    // 總進度 (0-100)
  totalProgress?: number;     // 備用字段，部分hook使用
  completedThemes: number;    // 完成嘅主題數
  totalThemes: number;        // 總主題數
  completedUnits: number;     // 完成嘅單元數
  totalUnits?: number;        // 總單元數
  totalTimeSpent: number;     // 總學習時間(分鐘)
  studyTime?: string;         // 格式化嘅學習時間
}

// 統一嘅Progress Hook接口
export interface UnifiedProgressHook {
  isThemeCompleted: (themeId: number | string) => boolean;
  getThemeProgress: (themeId: number | string) => any;
  getProgressStats: () => UnifiedProgressStats;
  resetProgress: () => void;
  completeQuiz: (themeId: number | string) => void;
  completeUnit: (themeId: number | string, unitId: number | string) => void;
  themeProgress: any;
  courseStats?: any;
  progressState?: any;
}

// 課程配置接口
export interface CourseConfig {
  courseId: string;
  courseName: string;
  themeColor: string;
  accentColor: string;
  baseRoute: string;
  dataSource: any;
  // 寬鬆處理各課程 Hook 差異，統一在模板內做適配
  progressHook: () => any;
  cssPrefix: string;
}

// 課程配置映射
export const courseConfigs: Record<string, CourseConfig> = {
  'chatgpt': {
    courseId: 'chatgpt',
    courseName: 'ChatGPT Complete Course',
    themeColor: '#10a37f',
    accentColor: '#0ea5e9',
    baseRoute: '/courses/chatgpt-complete-course',
    dataSource: chatGPTCourseData,
    progressHook: useChatGPTProgress,
    cssPrefix: 'chatgpt'
  },
  'perplexity': {
    courseId: 'perplexity',
    courseName: 'Perplexity AI Ultimate Master Course',
    themeColor: '#1a1a1a',
    accentColor: '#ffd700',
    baseRoute: '/courses/perplexity-complete-course',
    dataSource: perplexityCourseData,
    progressHook: usePerplexityProgress,
    cssPrefix: 'perplexity'
  },
  'midjourney': {
    courseId: 'midjourney',
    courseName: 'Midjourney AI Creative Master Course',
    themeColor: '#10a37f',
    accentColor: '#059669',
    baseRoute: '/courses/midjourney-course',
    dataSource: midjourneyCourseData,
    progressHook: useMidjourneyProgress,
    cssPrefix: 'midjourney'
  },
  'prompt-engineering': {
    courseId: 'prompt-engineering',
    courseName: 'Prompt Engineering Master Course',
    themeColor: '#9E768F',
    accentColor: '#9FA4C4',
    baseRoute: '/courses/prompt-engineering-course',
    dataSource: promptEngineeringCourseData,
    progressHook: usePromptEngineeringProgress,
    cssPrefix: 'prompt-engineering'
  }
  ,
  'prompt-engineering-expert-course': {
    courseId: 'prompt-engineering-expert-course',
    courseName: 'Prompt Engineering Mastery: Expert Edition',
    themeColor: '#7c3aed',
    accentColor: '#f59e0b',
    baseRoute: '/courses/prompt-engineering-expert-course',
    dataSource: promptEngineeringExpertCourseData,
    progressHook: usePromptEngineeringProgress,
    cssPrefix: 'prompt-engineering-expert-course'
  }
  ,
  'claude': {
    courseId: 'claude',
    courseName: 'Claude Mastery Course',
    themeColor: '#3b82f6',
    accentColor: '#f59e0b',
    baseRoute: '/courses/claude-course',
    dataSource: claudeCourseData,
    progressHook: useClaudeProgress,
    cssPrefix: 'claude'
  }
  ,
  'gemini': {
    courseId: 'gemini',
    courseName: 'Gemini Mastery Course',
    themeColor: '#1a73e8',
    accentColor: '#34a853',
    baseRoute: '/courses/gemini-course',
    dataSource: geminiCourseData,
    progressHook: useGeminiProgress,
    cssPrefix: 'gemini'
  }
};

// 工具函數：根據 courseId 獲取配置
export const getCourseConfig = (courseId: string): CourseConfig | null => {
  return courseConfigs[courseId] || null;
};

// 工具函數：根據路由路徑獲取課程ID
export const getCourseIdFromRoute = (route: string): string | null => {
  console.log('Getting course ID from route:', route);
  
  if (route.includes('chatgpt-complete-course')) return 'chatgpt';
  if (route.includes('perplexity-complete-course')) return 'perplexity';
  if (route.includes('midjourney-course')) return 'midjourney';
  if (route.includes('prompt-engineering-expert-course')) return 'prompt-engineering-expert-course';
  if (route.includes('prompt-engineering-course')) return 'prompt-engineering';
  if (route.includes('claude-course')) return 'claude';
  if (route.includes('gemini-course')) return 'gemini';
  
  console.log('No matching course ID found for route:', route);
  return null;
};

// 工具函數：獲取所有可用的課程
export const getAllCourses = (): CourseConfig[] => {
  return Object.values(courseConfigs);
};

// 工具函數：檢查課程是否存在
export const courseExists = (courseId: string): boolean => {
  return courseId in courseConfigs;
}; 