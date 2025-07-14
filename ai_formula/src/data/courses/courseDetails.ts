/**
 * Course Details Index
 * @fileoverview Centralized course data access with lazy loading and caching
 * @author AI Formula Team
 * @version 2.0.0
 * @description This is the refactored version of the original 3088-line file,
 * now split into manageable modules with proper type safety and performance optimization
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
  'ai-image-video-creation': {
    loader: async () => {
      const module = await import('./aiImageVideoCreation');
      return module.aiImageVideoCreationCourse;
    },
    summary: {
      id: 'ai-image-video-creation',
      title: {
        en: 'AI Image & Video Creation Mastery',
        'zh-HK': 'AI?ñÂ?ÂΩ±Á??µ‰?Á≤æÈÄöË™≤Á®?
      },
      category: 'Creative Design',
      difficulty: 'Beginner'
    }
  },
  'prompt-engineering': {
    loader: async () => {
      const module = await import('./promptEngineering');
      return module.promptEngineeringCourse;
    },
    summary: {
      id: 'prompt-engineering',
      title: {
        en: 'Prompt Engineering Mastery - AI Communication Skills',
        'zh-HK': '?êÁ§∫Â∑•Á?Á≤æÈÄ?- AIÊ∫ùÈÄöÊ?Â∑?
      },
      category: 'Prompt Engineering',
      difficulty: 'Intermediate'
    }
  }
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
 * Get all available course IDs
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
 * Main course details export (for backward compatibility)
 */
export const courseDetails = {
  // Lazy getters for each course
  get 'ai-image-video-creation'() {
    return loadCourse('ai-image-video-creation').then(response => {
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    });
  },

  get 'prompt-engineering'() {
    return loadCourse('prompt-engineering').then(response => {
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    });
  }
};

/**
 * Async function to get course by ID
 */
export async function getCourseById(courseId: string): Promise<CourseDetail | null> {
  const response = await loadCourse(courseId);
  return response.success ? response.data : null;
}

/**
 * Async function to get course with error handling
 */
export async function getCourseWithErrorHandling(courseId: string): Promise<CourseApiResponse<CourseDetail>> {
  return loadCourse(courseId);
}

/**
 * Preload course data for better performance
 */
export async function preloadCourse(courseId: string): Promise<void> {
  try {
    await loadCourse(courseId);
  } catch (error) {
    console.warn(`Failed to preload course ${courseId}:`, error);
  }
}

/**
 * Preload all courses
 */
export async function preloadAllCourses(): Promise<void> {
  const courseIds = getAvailableCourseIds();
  await Promise.allSettled(courseIds.map(id => preloadCourse(id)));
}

/**
 * Clear course cache
 */
export function clearCourseCache(): void {
  Object.keys(courseCache).forEach(key => delete courseCache[key]);
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  totalCached: number;
  cacheSize: number;
  oldestEntry: Date | null;
  newestEntry: Date | null;
} {
  const entries = Object.values(courseCache);
  const timestamps = entries.map(entry => entry.timestamp);
  
  return {
    totalCached: entries.length,
    cacheSize: JSON.stringify(courseCache).length,
    oldestEntry: timestamps.length > 0 ? new Date(Math.min(...timestamps)) : null,
    newestEntry: timestamps.length > 0 ? new Date(Math.max(...timestamps)) : null
  };
}

/**
 * Backward compatibility exports
 * These maintain compatibility with existing code while providing improved functionality
 */

// Legacy course data exports (now async)
export const aiImageVideoCreationCourse = loadCourse('ai-image-video-creation').then(response => {
  if (!response.success) {
    throw new Error(response.error || 'Failed to load AI Image Video Creation course');
  }
  return response.data;
});

export const promptEngineeringCourse = loadCourse('prompt-engineering').then(response => {
  if (!response.success) {
    throw new Error(response.error || 'Failed to load Prompt Engineering course');
  }
  return response.data;
});

/**
 * Error boundary for course loading
 */
export class CourseLoadError extends Error {
  constructor(
    public courseId: string,
    message: string,
    public originalError?: Error
  ) {
    super(`Failed to load course "${courseId}": ${message}`);
    this.name = 'CourseLoadError';
  }
}

/**
 * Safe course loader with error boundary
 */
export async function safeLoadCourse(courseId: string): Promise<CourseDetail | null> {
  try {
    const response = await loadCourse(courseId);
    if (!response.success) {
      throw new CourseLoadError(courseId, response.error || 'Unknown error');
    }
    return response.data;
  } catch (error) {
    console.error('Safe course load failed:', error);
    return null;
  }
}

/**
 * Development utilities
 */
export const dev = {
  /**
   * Force reload course (bypass cache)
   */
  forceReloadCourse: async (courseId: string): Promise<CourseDetail | null> => {
    delete courseCache[courseId];
    return getCourseById(courseId);
  },

  /**
   * Get course registry info
   */
  getCourseRegistry: () => courseRegistry,

  /**
   * Validate all courses
   */
  validateAllCourses: async (): Promise<{ [courseId: string]: string[] }> => {
    const results: { [courseId: string]: string[] } = {};
    
    for (const courseId of getAvailableCourseIds()) {
      try {
        const course = await getCourseById(courseId);
        if (course) {
          const errors = courseManager.validateCourse(course);
          results[courseId] = errors.map(e => `${e.severity}: ${e.message}`);
        } else {
          results[courseId] = ['error: Failed to load course'];
        }
      } catch (error) {
        results[courseId] = [`error: ${error instanceof Error ? error.message : 'Unknown error'}`];
      }
    }
    
    return results;
  },

  /**
   * Export all courses data
   */
  exportAllCourses: async (): Promise<{ [courseId: string]: CourseDetail }> => {
    const results: { [courseId: string]: CourseDetail } = {};
    
    for (const courseId of getAvailableCourseIds()) {
      const course = await getCourseById(courseId);
      if (course) {
        results[courseId] = course;
      }
    }
    
    return results;
  }
};

/**
 * Performance monitoring
 */
let loadTimes: { [courseId: string]: number[] } = {};

const originalLoadCourse = loadCourse;
// Override loadCourse to monitor performance
const monitoredLoadCourse = async (courseId: string): Promise<CourseApiResponse<CourseDetail>> => {
  const startTime = performance.now();
  const result = await originalLoadCourse(courseId);
  const endTime = performance.now();
  
  if (!loadTimes[courseId]) {
    loadTimes[courseId] = [];
  }
  loadTimes[courseId].push(endTime - startTime);
  
  return result;
};

/**
 * Get performance statistics
 */
export function getPerformanceStats(): {
  averageLoadTimes: { [courseId: string]: number };
  totalLoads: { [courseId: string]: number };
  cacheStats: ReturnType<typeof getCacheStats>;
} {
  const averageLoadTimes: { [courseId: string]: number } = {};
  const totalLoads: { [courseId: string]: number } = {};
  
  Object.entries(loadTimes).forEach(([courseId, times]) => {
    totalLoads[courseId] = times.length;
    averageLoadTimes[courseId] = times.reduce((sum, time) => sum + time, 0) / times.length;
  });
  
  return {
    averageLoadTimes,
    totalLoads,
    cacheStats: getCacheStats()
  };
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

/**
 * Course system health check
 */
export async function healthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  details: {
    coursesAvailable: number;
    coursesLoaded: number;
    cacheSize: number;
    averageLoadTime: number;
    errors: string[];
  };
}> {
  const availableCourses = getAvailableCourseIds();
  const cacheStats = getCacheStats();
  const perfStats = getPerformanceStats();
  const errors: string[] = [];
  
  let loadedCourses = 0;
  for (const courseId of availableCourses) {
    try {
      const course = await getCourseById(courseId);
      if (course) loadedCourses++;
    } catch (error) {
      errors.push(`${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  const avgLoadTime = Object.values(perfStats.averageLoadTimes).reduce((sum, time) => sum + time, 0) / 
                     Object.keys(perfStats.averageLoadTimes).length || 0;
  
  let status: 'healthy' | 'degraded' | 'unhealthy';
  if (errors.length === 0 && loadedCourses === availableCourses.length) {
    status = 'healthy';
  } else if (loadedCourses > availableCourses.length / 2) {
    status = 'degraded';
  } else {
    status = 'unhealthy';
  }
  
  return {
    status,
    details: {
      coursesAvailable: availableCourses.length,
      coursesLoaded: loadedCourses,
      cacheSize: cacheStats.cacheSize,
      averageLoadTime: avgLoadTime,
      errors
    }
  };
} 
