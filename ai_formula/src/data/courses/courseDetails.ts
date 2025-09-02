/**
 * Course Details Index
 * @fileoverview Centralized course data access with lazy loading and caching
 * @author AI Formula Team
 * @version 2.0.0
 * @description Clean course system with only the prompt engineering course by Leung Ming
 */

import { CourseDetail, CourseApiResponse } from '../../types/courseTypes';
import { courseManager } from './courseManager';

/**
 * Course cache for performance optimization
 */
interface CourseCache {
  [key: string]: {
    data: CourseDetail;
    timestamp: number;
    ttl: number;
  };
}

/**
 * Course registry with lazy loading
 */
interface CourseRegistry {
  [key: string]: {
    loader: () => Promise<CourseDetail>;
    summary: {
      id: string;
      title: { en: string; 'zh-HK': string };
      category: string;
      difficulty: string;
    };
  };
}

/**
 * Course registry with lazy loading configuration
 */
const courseRegistry: CourseRegistry = {
  // 移除了 ai-business-automation 課程
};

/**
 * Course cache instance
 */
const courseCache: CourseCache = {};
const CACHE_TTL = 3600000; // 1 hour

/**
 * Load course with caching and error handling
 */
async function loadCourse(courseId: string): Promise<CourseApiResponse<CourseDetail>> {
  try {
    // Check cache first
    const cached = courseCache[courseId];
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return {
        success: true,
        data: cached.data,
        timestamp: new Date(),
        version: '2.0.0'
      };
    }

    // Check if course exists in registry
    const courseConfig = courseRegistry[courseId];
    if (!courseConfig) {
      return {
        success: false,
        error: `Course with ID "${courseId}" not found`,
        timestamp: new Date(),
        version: '2.0.0'
      };
    }

    // Load course data
    const courseData = await courseConfig.loader();
    
    // Validate course data
    const validationErrors = courseManager.validateCourse(courseData);
    if (validationErrors.some(error => error.severity === 'error')) {
      return {
        success: false,
        error: `Course validation failed: ${validationErrors.map(e => e.message).join(', ')}`,
        timestamp: new Date(),
        version: '2.0.0'
      };
    }

    // Cache the result
    courseCache[courseId] = {
      data: courseData,
      timestamp: Date.now(),
      ttl: CACHE_TTL
    };

    return {
      success: true,
      data: courseData,
      timestamp: new Date(),
      version: '2.0.0'
    };
  } catch (error) {
    console.error(`Error loading course ${courseId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date(),
      version: '2.0.0'
    };
  }
}

/**
 * Get available course IDs
 */
export function getAvailableCourseIds(): string[] {
  return Object.keys(courseRegistry);
}

/**
 * Get course summaries without loading full data
 */
export function getCourseSummaries(): Array<{
  id: string;
  title: { en: string; 'zh-HK': string };
  category: string;
  difficulty: string;
}> {
  return Object.values(courseRegistry).map(config => config.summary);
}

/**
 * Get course by ID
 */
export async function getCourseById(courseId: string): Promise<CourseDetail | null> {
  const response = await loadCourse(courseId);
  return response.success ? response.data : null;
}

/**
 * Main course details export (for backward compatibility)
 */
export const courseDetails = {
  // Lazy getter for the prompt engineering learning course
  get 'prompt-engineering-learning'() {
    return loadCourse('prompt-engineering-learning').then(response => {
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    });
  }
};

/**
 * Get all available courses
 */
export async function getAllCourses(): Promise<CourseDetail[]> {
  const courseIds = getAvailableCourseIds();
  const courses: CourseDetail[] = [];
  
  for (const courseId of courseIds) {
    const course = await getCourseById(courseId);
    if (course) {
      courses.push(course);
    }
  }
  
  return courses;
}

/**
 * Preload course for performance
 */
export async function preloadCourse(courseId: string): Promise<boolean> {
  try {
    const response = await loadCourse(courseId);
    return response.success;
  } catch (error) {
    console.error(`Failed to preload course ${courseId}:`, error);
    return false;
  }
}

/**
 * Clear course cache
 */
export function clearCourseCache(courseId?: string): void {
  if (courseId) {
    delete courseCache[courseId];
  } else {
    Object.keys(courseCache).forEach(key => delete courseCache[key]);
  }
}

/**
 * Get featured courses
 */
export async function getFeaturedCourses(): Promise<CourseDetail[]> {
  // For now, return all available courses
  return await getAllCourses();
}

/**
 * Search courses by title or description
 */
export async function searchCourses(query: string, language: 'en' | 'zh-HK' = 'en'): Promise<CourseDetail[]> {
  const allCourses = await getAllCourses();
  const lowerQuery = query.toLowerCase();
  
  return allCourses.filter(course => {
    const title = course.title[language].toLowerCase();
    const description = course.description[language].toLowerCase();
    return title.includes(lowerQuery) || description.includes(lowerQuery);
  });
}

/**
 * Initialize course system
 */
export async function initializeCourseSystem(): Promise<{
  success: boolean;
  loadedCourses: string[];
  errors: string[];
}> {
  const loadedCourses: string[] = [];
  const errors: string[] = [];
  
  for (const courseId of getAvailableCourseIds()) {
    try {
      await preloadCourse(courseId);
      loadedCourses.push(courseId);
    } catch (error) {
      errors.push(`${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  return {
    success: errors.length === 0,
    loadedCourses,
    errors
  };
}

// Export the clean course for direct access
 
