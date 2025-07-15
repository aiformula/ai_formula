/**
 * Prompt Engineering Learning by Leung Ming
 * @fileoverview Clean course data with proper Traditional Chinese localization
 * @author Leung Ming
 * @version 1.0.0
 */

import { CourseDetail, CourseModule, CourseLesson } from '../../types/courseTypes';

/**
 * Create localized content helper
 */
function createLocalizedContent(en: string, zhHK: string) {
  return {
    en: en.trim(),
    'zh-HK': zhHK.trim()
  };
}

/**
 * Course lessons data - Single lesson only
 */
const courseLessons: CourseLesson[] = [
  {
    id: 1,
    title: createLocalizedContent(
      "Prompt Best Practices",
      "提示最佳實踐"
    ),
    duration: createLocalizedContent("60 minutes", "60 分鐘"),
    description: createLocalizedContent(
      "Master prompt engineering best practices with hands-on exercises and real-world examples",
      "通過動手練習和實際範例，掌握提示工程的最佳實踐"
    ),
    videoUrl: "/videos/prompt-engineering-learning.mp4",
    textContent: createLocalizedContent(
      "This lesson covers prompt engineering best practices with hands-on exercises. Content includes clarity principles, specificity requirements, iterative optimization methods, and practical templates for business analysis, content creation, and problem-solving.",
      "本課程涵蓋提示工程最佳實踐與動手練習。內容包括清晰性原則、具體性要求、迭代優化方法，以及商業分析、內容創作和問題解決的實用模板。"
    ),
    isLocked: false,
    estimatedMinutes: 60,
    tags: ["best-practices", "hands-on", "templates", "optimization"]
  }
];

/**
 * Course modules data - Single module only
 */
const courseModules: CourseModule[] = [
  {
    id: 1,
    title: createLocalizedContent("Prompt Best Practices", "提示最佳實踐"),
    description: createLocalizedContent(
      "Master prompt engineering best practices with hands-on exercises and practical templates",
      "通過動手練習和實用模板掌握提示工程的最佳實踐"
    ),
    lessons: courseLessons
  }
];

/**
 * Main course data export
 */
export const promptEngineeringLeungMingCourse: CourseDetail = {
  id: "prompt-engineering-learning",
  title: createLocalizedContent(
    "Prompt Engineering Learning",
    "提示工程學習課程"
  ),
  description: createLocalizedContent(
    "Learn the fundamentals of AI communication and prompt engineering through this comprehensive free course.",
    "通過這門綜合免費課程，學習 AI 溝通和提示工程的基礎知識。"
  ),
  category: "Prompt Engineering",
  difficulty: "Beginner",
  instructor: createLocalizedContent("AI Formula Expert", "AI Formula 專家"),
  totalDuration: createLocalizedContent("1 hour", "1 小時"),
  language: ["English", "Traditional Chinese"],
  requirements: [
    createLocalizedContent(
      "Basic computer literacy",
      "基本電腦使用能力"
    ),
    createLocalizedContent(
      "Interest in learning AI tools",
      "對學習 AI 工具有興趣"
    )
  ],
  learningOutcomes: [
    createLocalizedContent(
      "Understand the fundamentals of prompt engineering",
      "理解提示工程的基礎知識"
    ),
    createLocalizedContent(
      "Write basic effective prompts for AI systems",
      "為 AI 系統撰寫基本有效的提示"
    ),
    createLocalizedContent(
      "Apply prompt engineering to simple tasks",
      "將提示工程應用於簡單任務"
    )
  ],
  freeModules: courseModules,
  proModules: [],
  freeBonuses: [
    createLocalizedContent(
      "Basic prompt template library",
      "基礎提示模板庫"
    ),
    createLocalizedContent(
      "Quick start guide",
      "快速入門指南"
    ),
    createLocalizedContent(
      "Community access for questions",
      "社群提問權限"
    )
  ],
  proBonuses: [],
  pricing: {
    free: "免費",
    pro: "免費",
    original: "免費",
    savings: "0%"
  },
  stats: {
    enrollmentCount: 2847,
    rating: 4.9,
    reviews: 156
  },
  metadata: {
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    version: '1.0.0',
    author: 'AI Formula'
  }
};

export default promptEngineeringLeungMingCourse; 