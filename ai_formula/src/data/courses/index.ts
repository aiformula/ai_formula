/**
 * Course Modules Index
 * @fileoverview Unified export for all course modules
 * @author AI Formula Team
 * @version 2.0.0
 */

// Re-export types for convenience
export * from '../../types/courseTypes';

// Course registry for easy access
export const ALL_COURSES = {
  'chatgpt-complete-course': async () => {
    // For now, return a placeholder since we have the UI components but need course data structure
    return {
      id: 'chatgpt-complete-course',
      title: { en: 'ChatGPT Complete Course', 'zh-HK': 'ChatGPT 完整課程' },
      category: 'AI Communication',
      difficulty: 'Beginner'
    };
  },
} as const;

// Course metadata
export const COURSE_METADATA = {
  'chatgpt-complete-course': {
    id: 'chatgpt-complete-course',
    title: {
      en: 'ChatGPT Complete Course',
      'zh-HK': 'ChatGPT 完整課程'
    },
    category: 'AI Communication',
    difficulty: 'Beginner',
    estimatedDuration: '6 hours',
    moduleCount: 6,
    lessonCount: 12
  }
} as const;

// Utility functions
export function getCourseIds(): string[] {
  return Object.keys(ALL_COURSES);
}

/**
 * Get a specific course metadata by ID
 */
export function getCourseMetadata(courseId: string) {
  return COURSE_METADATA[courseId as keyof typeof COURSE_METADATA];
}

/**
 * Get all course metadata
 */
export function getAllCourseMetadata() {
  return Object.values(COURSE_METADATA);
}

/**
 * Check if a course exists
 */
export function courseExists(courseId: string): boolean {
  return courseId in ALL_COURSES;
}

/**
 * Get course by ID
 */
export async function getCourseById(courseId: string) {
  const loader = ALL_COURSES[courseId as keyof typeof ALL_COURSES];
  if (!loader) {
    return null;
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

/**
 * Get featured courses (all available courses for now)
 */
export async function getFeaturedCourses() {
  const { successful } = await loadAllCourses();
  return successful.map(item => item.course);
} 
