/**
 * Course Registry
 * @fileoverview 課程註冊中心，管理所有課程的配置和數據
 * @author AI Formula Team
 * @version 1.0.0
 */

import { CourseConfig } from './types';
import { chatGPTCourseData } from '@/data/chatgpt-complete-course-data';
import { perplexityCourseData } from '@/data/perplexity-complete-course-data';
import { midjourneyCourseData } from '@/data/midjourney-course-data';
import { promptEngineeringCourseData } from '@/data/prompt-engineering-course-data';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress';
import { usePerplexityProgress } from '@/hooks/usePerplexityProgress';
import { useMidjourneyProgress } from '@/hooks/useMidjourneyProgress';
import { usePromptEngineeringProgress } from '@/hooks/usePromptEngineeringProgress';

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
};

// 工具函數：根據 courseId 獲取配置
export const getCourseConfig = (courseId: string): CourseConfig | null => {
  return courseConfigs[courseId] || null;
};

// 工具函數：根據路由路徑獲取課程ID
export const getCourseIdFromRoute = (route: string): string | null => {
  if (route.includes('chatgpt-complete-course')) return 'chatgpt';
  if (route.includes('perplexity-complete-course')) return 'perplexity';
  if (route.includes('midjourney-course')) return 'midjourney';
  if (route.includes('prompt-engineering-course')) return 'prompt-engineering';
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