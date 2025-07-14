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
    zhHK: '?�示工�?精�?- AI溝通�?�?
  },
  description: {
    en: 'Master the art of prompt engineering to effectively communicate with AI models and get better results.',
    zhHK: '精通�?示工程�?術�??��??�AI模�?溝通�??��??�好?��??��?
  },
  category: 'Prompt Engineering',
  difficulty: 'Intermediate',
  instructor: {
    en: 'AI Formula Team',
    zhHK: 'AI Formula ?��?'
  },
  totalDuration: {
    en: '7 modules + interactive practice',
    zhHK: '7?�模�?+ 互�?練�?'
  },
  language: ['English', 'Cantonese'],
  requirements: [
    {
      en: 'Basic computer skills',
      zhHK: '?�本?�腦?�??
    },
    {
      en: 'Internet connection',
      zhHK: '互聯網�?��'
    },
    {
      en: 'No prior AI experience needed',
      zhHK: '?��?AI經�?'
    }
  ],
  learningOutcomes: [
    {
      en: 'Write effective prompts for AI models',
      zhHK: '?�寫?��?AI?�示'
    },
    {
      en: 'Understand prompt structure and best practices',
      zhHK: '?�解?�示結�??��?佳實�?
    },
    {
      en: 'Apply prompt engineering in real-world scenarios',
      zhHK: '?�用?�示工�??�實?�場??
    },
    {
      en: 'Iterate and optimize prompts for better results',
      zhHK: '學�??��??�改?��?�?
    }
  ],
  freeModules: [],
  proModules: [
    courseManager.createModule({
      id: 1,
      title: {
        en: 'Fundamentals of Prompt Engineering',
        zhHK: '?�示工�??��?'
      },
      description: {
        en: 'Learn the core principles of effective prompt design',
        zhHK: '學�??��??�示設�??�核心�???
      },
      lessons: [
        courseManager.createLesson({
          id: 1,
          title: {
            en: 'Introduction to Prompt Engineering',
            zhHK: '?�示工�?介紹'
          },
          duration: {
            en: '25 min',
            zhHK: '25?��?'
          },
          description: {
            en: 'Understanding what prompt engineering is and why it matters',
            zhHK: '?�解?�示工�?係咩?��?�??�?
          },
          videoUrl: '/videos/prompt-intro.mp4',
          isLocked: true,
          estimatedMinutes: 25,
          tags: ['introduction', 'fundamentals'],
          hasQuiz: false  // 第�?課�??�測�?
        }),
        courseManager.createLesson({
          id: 2,
          title: {
            en: 'Anatomy of a Great Prompt',
            zhHK: '?��??�示?��?�?
          },
          duration: {
            en: '18 min',
            zhHK: '18?��?'
          },
          description: {
            en: 'Breaking down the components of effective prompts',
            zhHK: '?�解?��??�示?��??�部??
          },
          videoUrl: '/videos/prompt-anatomy.mp4',
          isLocked: true,
          estimatedMinutes: 18,
          tags: ['structure', 'components'],
          hasQuiz: true  // ?��?第�?課�?測�?
        })
      ],
      order: 1
    }),

    courseManager.createModule({
      id: 2,
      title: {
        en: 'Advanced Prompt Techniques',
        zhHK: '高�??�示?��?
      },
      description: {
        en: 'Master advanced strategies for complex prompt engineering',
        zhHK: '?�握複�??�示工�??��?級�???
      },
      lessons: [
        courseManager.createLesson({
          id: 3,
          title: {
            en: 'Context and Constraint Management',
            zhHK: '上�??��?約�?管�?'
          },
          duration: {
            en: '30 min',
            zhHK: '30?��?'
          },
          description: {
            en: 'Learn to manage context and constraints effectively',
            zhHK: '學�??��?管�?上�??��?約�?'
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
            zhHK: '?�維?��?�?
          },
          duration: {
            en: '35 min',
            zhHK: '35?��?'
          },
          description: {
            en: 'Master chain of thought and step-by-step reasoning',
            zhHK: '?�握?�維?��??�步?��?'
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
      zhHK: '範�??�示'
    },
    {
      en: 'Practice Templates',
      zhHK: '練�?模板'
    }
  ],
  proBonuses: [
    {
      en: 'Full Module Access',
      zhHK: '完整模�?存�?'
    },
    {
      en: 'Certificate of Completion',
      zhHK: '完�?證書'
    },
    {
      en: 'Advanced Prompt Library',
      zhHK: '高�??�示�?
    },
    {
      en: 'Real-world Case Studies',
      zhHK: '實�?案�??�究'
    }
  ],
  pricing: {
    free: '?�費',
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
