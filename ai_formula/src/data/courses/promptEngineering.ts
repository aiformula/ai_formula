/**
 * Prompt Engineering Course Data
 * @fileoverview Course data for Prompt Engineering Mastery
 * @author AI Formula Team
 * @version 2.0.0
 */

import { CourseDetail } from '../../types/courseTypes';
import { courseManager } from './courseManager';

/**
 * Prompt Engineering Course Data
 */
export const promptEngineeringCourse: CourseDetail = courseManager.createCourse({
  id: 'prompt-engineering',
  title: {
    en: 'Prompt Engineering Mastery - AI Communication Skills',
    zhHK: '提示工程精通 - AI溝通技巧'
  },
  description: {
    en: 'Master the art of prompt engineering to effectively communicate with AI models and get better results.',
    zhHK: '精通提示工程藝術，有效同AI模型溝通，獲得更好嘅結果。'
  },
  category: 'Prompt Engineering',
  difficulty: 'Intermediate',
  instructor: {
    en: 'AI Formula Team',
    zhHK: 'AI Formula 團隊'
  },
  totalDuration: {
    en: '7 modules + interactive practice',
    zhHK: '7個模組 + 互動練習'
  },
  language: ['English', 'Cantonese'],
  requirements: [
    {
      en: 'Basic computer skills',
      zhHK: '基本電腦技能'
    },
    {
      en: 'Internet connection',
      zhHK: '互聯網連接'
    },
    {
      en: 'No prior AI experience needed',
      zhHK: '無需AI經驗'
    }
  ],
  learningOutcomes: [
    {
      en: 'Write effective prompts for AI models',
      zhHK: '撰寫有效AI提示'
    },
    {
      en: 'Understand prompt structure and best practices',
      zhHK: '理解提示結構同最佳實踐'
    },
    {
      en: 'Apply prompt engineering in real-world scenarios',
      zhHK: '應用提示工程於實際場景'
    },
    {
      en: 'Iterate and optimize prompts for better results',
      zhHK: '學識優化同改進提示'
    }
  ],
  freeModules: [],
  proModules: [
    courseManager.createModule({
      id: 1,
      title: {
        en: 'Fundamentals of Prompt Engineering',
        zhHK: '提示工程基礎'
      },
      description: {
        en: 'Learn the core principles of effective prompt design',
        zhHK: '學習有效提示設計嘅核心原理'
      },
      lessons: [
        courseManager.createLesson({
          id: 1,
          title: {
            en: 'Introduction to Prompt Engineering',
            zhHK: '提示工程介紹'
          },
          duration: {
            en: '25 min',
            zhHK: '25分鐘'
          },
          description: {
            en: 'Understanding what prompt engineering is and why it matters',
            zhHK: '理解提示工程係咩同點解重要'
          },
          videoUrl: '/videos/prompt-intro.mp4',
          isLocked: true,
          estimatedMinutes: 25,
          tags: ['introduction', 'fundamentals'],
          hasQuiz: false  // 第一課沒有測驗
        }),
        courseManager.createLesson({
          id: 2,
          title: {
            en: 'Anatomy of a Great Prompt',
            zhHK: '優秀提示嘅結構'
          },
          duration: {
            en: '18 min',
            zhHK: '18分鐘'
          },
          description: {
            en: 'Breaking down the components of effective prompts',
            zhHK: '分解有效提示嘅組成部分'
          },
          videoUrl: '/videos/prompt-anatomy.mp4',
          isLocked: true,
          estimatedMinutes: 18,
          tags: ['structure', 'components'],
          hasQuiz: true  // 只有第二課有測驗
        })
      ],
      order: 1
    }),

    courseManager.createModule({
      id: 2,
      title: {
        en: 'Advanced Prompt Techniques',
        zhHK: '高級提示技巧'
      },
      description: {
        en: 'Master advanced strategies for complex prompt engineering',
        zhHK: '掌握複雜提示工程嘅高級策略'
      },
      lessons: [
        courseManager.createLesson({
          id: 3,
          title: {
            en: 'Context and Constraint Management',
            zhHK: '上下文同約束管理'
          },
          duration: {
            en: '30 min',
            zhHK: '30分鐘'
          },
          description: {
            en: 'Learn to manage context and constraints effectively',
            zhHK: '學習有效管理上下文同約束'
          },
          videoUrl: '/videos/context-management.mp4',
          isLocked: true,
          estimatedMinutes: 30,
          tags: ['context', 'constraints', 'advanced']
        }),
        courseManager.createLesson({
          id: 4,
          title: {
            en: 'Chain of Thought Prompting',
            zhHK: '思維鏈提示'
          },
          duration: {
            en: '35 min',
            zhHK: '35分鐘'
          },
          description: {
            en: 'Master chain of thought and step-by-step reasoning',
            zhHK: '掌握思維鏈同逐步推理'
          },
          videoUrl: '/videos/chain-of-thought.mp4',
          isLocked: true,
          estimatedMinutes: 35,
          tags: ['chain-of-thought', 'reasoning', 'advanced']
        })
      ],
      order: 2
    })
  ],
  freeBonuses: [
    {
      en: 'Sample Prompts',
      zhHK: '範例提示'
    },
    {
      en: 'Practice Templates',
      zhHK: '練習模板'
    }
  ],
  proBonuses: [
    {
      en: 'Full Module Access',
      zhHK: '完整模組存取'
    },
    {
      en: 'Certificate of Completion',
      zhHK: '完成證書'
    },
    {
      en: 'Advanced Prompt Library',
      zhHK: '高級提示庫'
    },
    {
      en: 'Real-world Case Studies',
      zhHK: '實際案例研究'
    }
  ],
  pricing: {
    free: '免費',
    pro: 'HK$399',
    original: 'HK$599',
    savings: '33%'
  },
  stats: {
    enrollmentCount: 1567,
    rating: 4.9,
    reviews: 120
  },
  metadata: {
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-12-20'),
    version: '2.0.0',
    author: 'AI Formula Team'
  }
});

/**
 * Export course data with error handling
 */
export const getCourseData = async (): Promise<CourseDetail> => {
  try {
    // Validate course data
    const validationErrors = courseManager.validateCourse(promptEngineeringCourse);
    if (validationErrors.some(error => error.severity === 'error')) {
      throw new Error(`Course validation failed: ${validationErrors.map(e => e.message).join(', ')}`);
    }

    return promptEngineeringCourse;
  } catch (error) {
    console.error('Error loading Prompt Engineering course:', error);
    throw error;
  }
};

/**
 * Export course statistics
 */
export const getCourseStats = () => courseManager.calculateCourseStats(promptEngineeringCourse);

/**
 * Export course summary
 */
export const getCourseSummary = () => courseManager.getCourseSummary(promptEngineeringCourse); 