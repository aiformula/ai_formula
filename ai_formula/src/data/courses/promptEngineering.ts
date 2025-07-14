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
    zhHK: '?ç¤ºå·¥ç?ç²¾é€?- AIæºé€šæ?å·?
  },
  description: {
    en: 'Master the art of prompt engineering to effectively communicate with AI models and get better results.',
    zhHK: 'ç²¾é€šæ?ç¤ºå·¥ç¨‹è?è¡“ï??‰æ??ŒAIæ¨¡å?æºé€šï??²å??´å¥½?…ç??œã€?
  },
  category: 'Prompt Engineering',
  difficulty: 'Intermediate',
  instructor: {
    en: 'AI Formula Team',
    zhHK: 'AI Formula ?˜é?'
  },
  totalDuration: {
    en: '7 modules + interactive practice',
    zhHK: '7?‹æ¨¡çµ?+ äº’å?ç·´ç?'
  },
  language: ['English', 'Cantonese'],
  requirements: [
    {
      en: 'Basic computer skills',
      zhHK: '?ºæœ¬?»è…¦?€??
    },
    {
      en: 'Internet connection',
      zhHK: 'äº’è¯ç¶²é€?¥'
    },
    {
      en: 'No prior AI experience needed',
      zhHK: '?¡é?AIç¶“é?'
    }
  ],
  learningOutcomes: [
    {
      en: 'Write effective prompts for AI models',
      zhHK: '?°å¯«?‰æ?AI?ç¤º'
    },
    {
      en: 'Understand prompt structure and best practices',
      zhHK: '?†è§£?ç¤ºçµæ??Œæ?ä½³å¯¦è¸?
    },
    {
      en: 'Apply prompt engineering in real-world scenarios',
      zhHK: '?‰ç”¨?ç¤ºå·¥ç??¼å¯¦?›å ´??
    },
    {
      en: 'Iterate and optimize prompts for better results',
      zhHK: 'å­¸è??ªå??Œæ”¹?²æ?ç¤?
    }
  ],
  freeModules: [],
  proModules: [
    courseManager.createModule({
      id: 1,
      title: {
        en: 'Fundamentals of Prompt Engineering',
        zhHK: '?ç¤ºå·¥ç??ºç?'
      },
      description: {
        en: 'Learn the core principles of effective prompt design',
        zhHK: 'å­¸ç??‰æ??ç¤ºè¨­è??…æ ¸å¿ƒå???
      },
      lessons: [
        courseManager.createLesson({
          id: 1,
          title: {
            en: 'Introduction to Prompt Engineering',
            zhHK: '?ç¤ºå·¥ç?ä»‹ç´¹'
          },
          duration: {
            en: '25 min',
            zhHK: '25?†é?'
          },
          description: {
            en: 'Understanding what prompt engineering is and why it matters',
            zhHK: '?†è§£?ç¤ºå·¥ç?ä¿‚å’©?Œé?è§??è¦?
          },
          videoUrl: '/videos/prompt-intro.mp4',
          isLocked: true,
          estimatedMinutes: 25,
          tags: ['introduction', 'fundamentals'],
          hasQuiz: false  // ç¬¬ä?èª²æ??‰æ¸¬é©?
        }),
        courseManager.createLesson({
          id: 2,
          title: {
            en: 'Anatomy of a Great Prompt',
            zhHK: '?ªç??ç¤º?…ç?æ§?
          },
          duration: {
            en: '18 min',
            zhHK: '18?†é?'
          },
          description: {
            en: 'Breaking down the components of effective prompts',
            zhHK: '?†è§£?‰æ??ç¤º?…ç??éƒ¨??
          },
          videoUrl: '/videos/prompt-anatomy.mp4',
          isLocked: true,
          estimatedMinutes: 18,
          tags: ['structure', 'components'],
          hasQuiz: true  // ?ªæ?ç¬¬ä?èª²æ?æ¸¬é?
        })
      ],
      order: 1
    }),

    courseManager.createModule({
      id: 2,
      title: {
        en: 'Advanced Prompt Techniques',
        zhHK: 'é«˜ç??ç¤º?€å·?
      },
      description: {
        en: 'Master advanced strategies for complex prompt engineering',
        zhHK: '?Œæ¡è¤‡é??ç¤ºå·¥ç??…é?ç´šç???
      },
      lessons: [
        courseManager.createLesson({
          id: 3,
          title: {
            en: 'Context and Constraint Management',
            zhHK: 'ä¸Šä??‡å?ç´„æ?ç®¡ç?'
          },
          duration: {
            en: '30 min',
            zhHK: '30?†é?'
          },
          description: {
            en: 'Learn to manage context and constraints effectively',
            zhHK: 'å­¸ç??‰æ?ç®¡ç?ä¸Šä??‡å?ç´„æ?'
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
            zhHK: '?ç¶­?ˆæ?ç¤?
          },
          duration: {
            en: '35 min',
            zhHK: '35?†é?'
          },
          description: {
            en: 'Master chain of thought and step-by-step reasoning',
            zhHK: '?Œæ¡?ç¶­?ˆå??æ­¥?¨ç?'
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
      zhHK: 'ç¯„ä??ç¤º'
    },
    {
      en: 'Practice Templates',
      zhHK: 'ç·´ç?æ¨¡æ¿'
    }
  ],
  proBonuses: [
    {
      en: 'Full Module Access',
      zhHK: 'å®Œæ•´æ¨¡ç?å­˜å?'
    },
    {
      en: 'Certificate of Completion',
      zhHK: 'å®Œæ?è­‰æ›¸'
    },
    {
      en: 'Advanced Prompt Library',
      zhHK: 'é«˜ç??ç¤ºåº?
    },
    {
      en: 'Real-world Case Studies',
      zhHK: 'å¯¦é?æ¡ˆä??”ç©¶'
    }
  ],
  pricing: {
    free: '?è²»',
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
