/**
 * Course Data Manager
 * @fileoverview Centralized course data management with validation and i18n support
 * @author AI Formula Team
 * @version 2.0.0
 */

import { 
  CourseDetail, 
  CourseModule, 
  CourseLesson, 
  LocalizedContent, 
  SupportedLanguage,
  CourseValidationError,
  CourseApiResponse,
  CourseSummary,
  CourseFilters,
  CourseSearchResult,
  COURSE_VALIDATION,
  COURSE_CONSTANTS,
  isCourseDetail,
  isCourseModule,
  isCourseLesson
} from '../../types/courseTypes';

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
 * Course data manager class
 */
export class CourseManager {
  private cache: CourseCache = {};
  private readonly CACHE_TTL = 3600000; // 1 hour
  
  /**
   * Create localized content object
   */
  private createLocalizedContent(en: string, zhHK: string): LocalizedContent {
    return {
      en: en.trim(),
      'zh-HK': zhHK.trim()
    };
  }
  
  /**
   * Get localized text based on language
   */
  public getLocalizedText(content: LocalizedContent, language: SupportedLanguage): string {
    return content[language] || content.en;
  }
  
  /**
   * Validate course data
   */
  public validateCourse(course: any): CourseValidationError[] {
    const errors: CourseValidationError[] = [];
    
    // Check required fields
    COURSE_VALIDATION.REQUIRED_FIELDS.forEach(field => {
      if (!course[field]) {
        errors.push({
          field,
          message: `${field} is required`,
          severity: 'error'
        });
      }
    });
    
    // Validate title length
    if (course.title?.en) {
      const titleLength = course.title.en.length;
      if (titleLength < COURSE_VALIDATION.TITLE_MIN_LENGTH) {
        errors.push({
          field: 'title',
          message: `Title must be at least ${COURSE_VALIDATION.TITLE_MIN_LENGTH} characters`,
          severity: 'error'
        });
      }
      if (titleLength > COURSE_VALIDATION.TITLE_MAX_LENGTH) {
        errors.push({
          field: 'title',
          message: `Title must be less than ${COURSE_VALIDATION.TITLE_MAX_LENGTH} characters`,
          severity: 'error'
        });
      }
    }
    
    // Validate description length
    if (course.description?.en) {
      const descLength = course.description.en.length;
      if (descLength < COURSE_VALIDATION.DESCRIPTION_MIN_LENGTH) {
        errors.push({
          field: 'description',
          message: `Description must be at least ${COURSE_VALIDATION.DESCRIPTION_MIN_LENGTH} characters`,
          severity: 'error'
        });
      }
      if (descLength > COURSE_VALIDATION.DESCRIPTION_MAX_LENGTH) {
        errors.push({
          field: 'description',
          message: `Description must be less than ${COURSE_VALIDATION.DESCRIPTION_MAX_LENGTH} characters`,
          severity: 'warning'
        });
      }
    }
    
    // Validate modules
    if (course.freeModules && Array.isArray(course.freeModules)) {
      course.freeModules.forEach((module: any, index: number) => {
        if (!isCourseModule(module)) {
          errors.push({
            field: `freeModules[${index}]`,
            message: 'Invalid module structure',
            severity: 'error'
          });
        }
      });
    }
    
    if (course.proModules && Array.isArray(course.proModules)) {
      course.proModules.forEach((module: any, index: number) => {
        if (!isCourseModule(module)) {
          errors.push({
            field: `proModules[${index}]`,
            message: 'Invalid module structure',
            severity: 'error'
          });
        }
      });
    }
    
    return errors;
  }
  
  /**
   * Create course lesson with validation
   */
  public createLesson(data: {
    id: number;
    title: { en: string; zhHK: string };
    duration: { en: string; zhHK: string };
    description: { en: string; zhHK: string };
    videoUrl?: string;
    downloadUrl?: string;
    isLocked: boolean;
    textContent?: { en: string; zhHK: string };
    estimatedMinutes?: number;
    tags?: string[];
  }): CourseLesson {
    const lesson: CourseLesson = {
      id: data.id,
      title: this.createLocalizedContent(data.title.en, data.title.zhHK),
      duration: this.createLocalizedContent(data.duration.en, data.duration.zhHK),
      description: this.createLocalizedContent(data.description.en, data.description.zhHK),
      videoUrl: data.videoUrl,
      downloadUrl: data.downloadUrl,
      isLocked: data.isLocked,
      estimatedMinutes: data.estimatedMinutes || COURSE_CONSTANTS.DEFAULT_LESSON_DURATION,
      tags: data.tags || []
    };
    
    if (data.textContent) {
      lesson.textContent = this.createLocalizedContent(data.textContent.en, data.textContent.zhHK);
    }
    
    return lesson;
  }
  
  /**
   * Create course module with validation
   */
  public createModule(data: {
    id: number;
    title: { en: string; zhHK: string };
    description: { en: string; zhHK: string };
    lessons: CourseLesson[];
    order?: number;
  }): CourseModule {
    if (data.lessons.length > COURSE_CONSTANTS.MAX_LESSONS_PER_MODULE) {
      throw new Error(`Module cannot have more than ${COURSE_CONSTANTS.MAX_LESSONS_PER_MODULE} lessons`);
    }
    
    return {
      id: data.id,
      title: this.createLocalizedContent(data.title.en, data.title.zhHK),
      description: this.createLocalizedContent(data.description.en, data.description.zhHK),
      lessons: data.lessons,
      order: data.order
    };
  }
  
  /**
   * Create complete course with validation
   */
  public createCourse(data: {
    id: string;
    title: { en: string; zhHK: string };
    description: { en: string; zhHK: string };
    category: string;
    difficulty: string;
    instructor: { en: string; zhHK: string };
    totalDuration: { en: string; zhHK: string };
    language: string[];
    requirements: Array<{ en: string; zhHK: string }>;
    learningOutcomes: Array<{ en: string; zhHK: string }>;
    freeModules: CourseModule[];
    proModules: CourseModule[];
    freeBonuses: Array<{ en: string; zhHK: string }>;
    proBonuses: Array<{ en: string; zhHK: string }>;
    pricing: {
      free: string;
      pro: string;
      original: string;
      savings: string;
    };
    stats: {
      enrollmentCount: number;
      rating: number;
      reviews: number;
    };
    metadata?: {
      createdAt?: Date;
      updatedAt?: Date;
      version?: string;
      author?: string;
    };
  }): CourseDetail {
    const course: CourseDetail = {
      id: data.id,
      title: this.createLocalizedContent(data.title.en, data.title.zhHK),
      description: this.createLocalizedContent(data.description.en, data.description.zhHK),
      category: data.category as any,
      difficulty: data.difficulty as any,
      instructor: this.createLocalizedContent(data.instructor.en, data.instructor.zhHK),
      totalDuration: this.createLocalizedContent(data.totalDuration.en, data.totalDuration.zhHK),
      language: data.language,
      requirements: data.requirements.map(req => this.createLocalizedContent(req.en, req.zhHK)),
      learningOutcomes: data.learningOutcomes.map(outcome => this.createLocalizedContent(outcome.en, outcome.zhHK)),
      freeModules: data.freeModules,
      proModules: data.proModules,
      freeBonuses: data.freeBonuses.map(bonus => this.createLocalizedContent(bonus.en, bonus.zhHK)),
      proBonuses: data.proBonuses.map(bonus => this.createLocalizedContent(bonus.en, bonus.zhHK)),
      pricing: data.pricing,
      stats: data.stats,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
        author: 'AI Formula Team',
        ...data.metadata
      }
    };
    
    // Validate course
    const errors = this.validateCourse(course);
    if (errors.some(e => e.severity === 'error')) {
      throw new Error(`Course validation failed: ${errors.map(e => e.message).join(', ')}`);
    }
    
    return course;
  }
  
  /**
   * Get course by ID with caching
   */
  public async getCourse(id: string): Promise<CourseApiResponse<CourseDetail>> {
    try {
      // Check cache first
      const cached = this.cache[id];
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        return {
          success: true,
          data: cached.data,
          timestamp: new Date(),
          version: '2.0.0'
        };
      }
      
      // Load course data (this would typically be from an API or database)
      const course = await this.loadCourseData(id);
      
      if (!course) {
        return {
          success: false,
          error: `Course with ID ${id} not found`,
          timestamp: new Date(),
          version: '2.0.0'
        };
      }
      
      // Cache the result
      this.cache[id] = {
        data: course,
        timestamp: Date.now(),
        ttl: this.CACHE_TTL
      };
      
      return {
        success: true,
        data: course,
        timestamp: new Date(),
        version: '2.0.0'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
        version: '2.0.0'
      };
    }
  }
  
  /**
   * Get course summary for listings
   */
  public getCourseSummary(course: CourseDetail): CourseSummary {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      pricing: course.pricing,
      stats: course.stats,
      thumbnail: `https://images.aiformula.com/courses/${course.id}/thumbnail.jpg`
    };
  }
  
  /**
   * Search courses with filters
   */
  public async searchCourses(filters: CourseFilters, page: number = 1, limit: number = 10): Promise<CourseSearchResult> {
    try {
      // This would typically query a database
      const allCourses = await this.getAllCourses();
      
      let filteredCourses = allCourses;
      
      // Apply filters
      if (filters.category) {
        filteredCourses = filteredCourses.filter(course => course.category === filters.category);
      }
      
      if (filters.difficulty) {
        filteredCourses = filteredCourses.filter(course => course.difficulty === filters.difficulty);
      }
      
      if (filters.rating) {
        filteredCourses = filteredCourses.filter(course => course.stats.rating >= filters.rating!);
      }
      
      if (filters.priceRange) {
        if (filters.priceRange === 'free') {
          filteredCourses = filteredCourses.filter(course => course.pricing.free === '?�費');
        } else if (filters.priceRange === 'paid') {
          filteredCourses = filteredCourses.filter(course => course.pricing.free !== '?�費');
        }
      }
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
      
      return {
        courses: paginatedCourses.map(course => this.getCourseSummary(course)),
        total: filteredCourses.length,
        page,
        limit,
        filters
      };
    } catch (error) {
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache = {};
  }
  
  /**
   * Load course data (placeholder for actual data loading)
   */
  private async loadCourseData(id: string): Promise<CourseDetail | null> {
    // This would typically load from a database or API
    // Currently available courses: prompt engineering and AI business automation
    switch (id) {
      case 'ai-business-automation':
        // Import dynamically to avoid circular dependencies
        const { aiBusinessAutomationCourse } = await import('./aiBusinessAutomation');
        return aiBusinessAutomationCourse;
      default:
        return null;
    }
  }
  
  /**
   * Get all courses (prompt engineering and AI business automation)
   */
  private async getAllCourses(): Promise<CourseDetail[]> {
    const courses: CourseDetail[] = [];
    
    try {
      const promptCourse = await this.loadCourseData('prompt-engineering-learning');
      if (promptCourse) courses.push(promptCourse);
      
      const automationCourse = await this.loadCourseData('ai-business-automation');
      if (automationCourse) courses.push(automationCourse);
      
      return courses;
    } catch (error) {
      console.error('Error loading courses:', error);
      return [];
    }
  }
  
  /**
   * Calculate course statistics
   */
  public calculateCourseStats(course: CourseDetail): {
    totalLessons: number;
    totalDuration: number;
    freeContent: number;
    proContent: number;
  } {
    const freeLessons = course.freeModules.reduce((total, module) => total + module.lessons.length, 0);
    const proLessons = course.proModules.reduce((total, module) => total + module.lessons.length, 0);
    
    const freeDuration = course.freeModules.reduce((total, module) => 
      total + module.lessons.reduce((moduleTotal, lesson) => 
        moduleTotal + (lesson.estimatedMinutes || 0), 0), 0);
    
    const proDuration = course.proModules.reduce((total, module) => 
      total + module.lessons.reduce((moduleTotal, lesson) => 
        moduleTotal + (lesson.estimatedMinutes || 0), 0), 0);
    
    return {
      totalLessons: freeLessons + proLessons,
      totalDuration: freeDuration + proDuration,
      freeContent: freeLessons,
      proContent: proLessons
    };
  }
  
  /**
   * Export course data
   */
  public exportCourse(course: CourseDetail): string {
    return JSON.stringify({
      version: '2.0.0',
      exportedAt: new Date(),
      course,
      settings: {
        includeAnalytics: false,
        includeReviews: false,
        includeProgress: false
      }
    }, null, 2);
  }
  
  /**
   * Import course data
   */
  public importCourse(jsonData: string): CourseDetail {
    try {
      const parsed = JSON.parse(jsonData);
      if (!parsed.course || !isCourseDetail(parsed.course)) {
        throw new Error('Invalid course data format');
      }
      
      return parsed.course;
    } catch (error) {
      throw new Error(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

/**
 * Singleton instance
 */
export const courseManager = new CourseManager();

/**
 * Helper functions for backward compatibility
 */
export const getCourseById = (id: string) => courseManager.getCourse(id);
export const searchCourses = (filters: CourseFilters, page?: number, limit?: number) => 
  courseManager.searchCourses(filters, page, limit);
export const validateCourse = (course: any) => courseManager.validateCourse(course);
export const getLocalizedText = (content: LocalizedContent, language: SupportedLanguage) => 
  courseManager.getLocalizedText(content, language);

/**
 * Course factory functions
 */
export const createCourseLesson = (data: Parameters<CourseManager['createLesson']>[0]) => 
  courseManager.createLesson(data);
export const createCourseModule = (data: Parameters<CourseManager['createModule']>[0]) => 
  courseManager.createModule(data);
export const createCourse = (data: Parameters<CourseManager['createCourse']>[0]) => 
  courseManager.createCourse(data); 
