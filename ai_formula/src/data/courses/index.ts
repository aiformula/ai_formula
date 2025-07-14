/**
 * Course Modules Index
 * @fileoverview Unified export for all course modules
 * @author AI Formula Team
 * @version 2.0.0
 */

// Re-export types for convenience
export * from '../../types/courseTypes';

// Re-export course manager
export { courseManager } from './courseManager';

// Individual course exports
export { aiImageVideoCreationCourse, getCourseData as getAIImageVideoCreationCourseData } from './aiImageVideoCreation';
export { promptEngineeringCourse, getCourseData as getPromptEngineeringCourseData } from './promptEngineering';

// Course registry for easy access
export const ALL_COURSES = {
  'ai-image-video-creation': () => import('./aiImageVideoCreation').then(m => m.aiImageVideoCreationCourse),
  'prompt-engineering': () => import('./promptEngineering').then(m => m.promptEngineeringCourse),
} as const;

// Course metadata
export const COURSE_METADATA = {
  'ai-image-video-creation': {
    id: 'ai-image-video-creation',
    title: {
      en: 'AI Image & Video Creation Mastery',
      'zh-HK': 'AI?–å?å½±ç??µä?ç²¾é€šèª²ç¨?
    },
    category: 'Creative Design',
    difficulty: 'Beginner',
    estimatedDuration: '8 hours',
    moduleCount: 7,
    lessonCount: 24
  },
  'prompt-engineering': {
    id: 'prompt-engineering',
    title: {
      en: 'Prompt Engineering Mastery - AI Communication Skills',
      'zh-HK': '?ç¤ºå·¥ç?ç²¾é€?- AIæºé€šæ?å·?
    },
    category: 'Prompt Engineering',
    difficulty: 'Intermediate',
    estimatedDuration: '6 hours',
    moduleCount: 2,
    lessonCount: 4
  }
} as const;

// Utility functions
export function getCourseIds(): string[] {
  return Object.keys(ALL_COURSES);
}

export function getCourseMetadata(courseId: string) {
  return COURSE_METADATA[courseId as keyof typeof COURSE_METADATA];
}

export function getAllCourseMetadata() {
  return Object.values(COURSE_METADATA);
}

/**
 * Load course by ID with error handling
 */
export async function loadCourseById(courseId: string) {
  const loader = ALL_COURSES[courseId as keyof typeof ALL_COURSES];
  if (!loader) {
    throw new Error(`Course "${courseId}" not found`);
  }
  return await loader();
}

/**
 * Load all courses
 */
export async function loadAllCourses() {
  const results = await Promise.allSettled(
    Object.entries(ALL_COURSES).map(async ([id, loader]) => {
      try {
        const course = await loader();
        return { id, course, success: true };
      } catch (error) {
        return { id, error, success: false };
      }
    })
  );

  const successful = results
    .filter((result): result is PromiseFulfilledResult<{id: string; course: any; success: true}> => 
      result.status === 'fulfilled' && result.value.success)
    .map(result => result.value);

  const failed = results
    .filter((result): result is PromiseFulfilledResult<{id: string; error: any; success: false}> => 
      result.status === 'fulfilled' && !result.value.success)
    .map(result => result.value);

  return { successful, failed };
} 