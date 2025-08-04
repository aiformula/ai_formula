/**
 * Course system type definitions
 * @fileoverview Comprehensive type definitions for the course management system
 * @author AI Formula Team
 * @version 2.0.0
 */

/**
 * Supported languages for course content
 */
export type SupportedLanguage = 'en' | 'zh-HK';

/**
 * Course difficulty levels
 */
export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Course categories
 */
export type CourseCategory = 
  | 'Creative Design' 
  | 'Prompt Engineering' 
  | 'Technical Skills' 
  | 'Business Applications'
  | 'Art & Design';

/**
 * Lesson status for tracking progress
 */
export type LessonStatus = 'locked' | 'available' | 'completed' | 'in_progress';

/**
 * Localized text content supporting multiple languages
 */
export interface LocalizedContent {
  en: string;
  'zh-HK': string;
}

/**
 * Course lesson with comprehensive metadata
 */
export interface CourseLesson {
  /** Unique lesson identifier */
  id: number;
  
  /** Lesson title in multiple languages */
  title: LocalizedContent;
  
  /** Estimated duration for completion */
  duration: LocalizedContent;
  
  /** Detailed lesson description */
  description: LocalizedContent;
  
  /** Optional video content URL */
  videoUrl?: string;
  
  /** Optional downloadable resources */
  downloadUrl?: string;
  
  /** Access control - whether lesson is locked behind paywall */
  isLocked: boolean;
  
  /** Current lesson status */
  status?: LessonStatus;
  
  /** Written lesson content */
  textContent?: LocalizedContent;
  
  /** Lesson prerequisites (other lesson IDs) */
  prerequisites?: number[];
  
  /** Estimated completion time in minutes */
  estimatedMinutes?: number;
  
  /** Lesson tags for categorization */
  tags?: string[];
}

/**
 * Course module containing related lessons
 */
export interface CourseModule {
  /** Unique module identifier */
  id: number;
  
  /** Module title in multiple languages */
  title: LocalizedContent;
  
  /** Module description */
  description: LocalizedContent;
  
  /** Lessons contained in this module */
  lessons: CourseLesson[];
  
  /** Module order/sequence */
  order?: number;
  
  /** Module completion status */
  completionStatus?: 'not_started' | 'in_progress' | 'completed';
  
  /** Module prerequisites */
  prerequisites?: number[];
}

/**
 * Complete course details with metadata
 */
export interface CourseDetail {
  /** Unique course identifier */
  id: string;
  
  /** Course title in multiple languages */
  title: LocalizedContent;
  
  /** Course description */
  description: LocalizedContent;
  
  /** Course category */
  category: CourseCategory;
  
  /** Course difficulty level */
  difficulty: CourseDifficulty;
  
  /** Course instructor information */
  instructor: LocalizedContent;
  
  /** Total course duration */
  totalDuration: LocalizedContent;
  
  /** Supported languages */
  language: string[];
  
  /** Course requirements */
  requirements: LocalizedContent[];
  
  /** Learning outcomes */
  learningOutcomes: LocalizedContent[];
  
  /** Free tier modules */
  freeModules: CourseModule[];
  
  /** Premium tier modules */
  proModules: CourseModule[];
  
  /** Free tier bonuses */
  freeBonuses: LocalizedContent[];
  
  /** Premium tier bonuses */
  proBonuses: LocalizedContent[];
  
  /** Pricing information */
  pricing: {
    free: string;
    pro: string;
    original: string;
    savings: string;
  };
  
  /** Course statistics */
  stats: {
    enrollmentCount: number;
    rating: number;
    reviews: number;
  };
  
  /** Course metadata */
  metadata: {
    createdAt?: Date;
    updatedAt?: Date;
    version?: string;
    author?: string;
  };
  
  /** SEO information */
  seo?: {
    keywords: string[];
    metaDescription: LocalizedContent;
  };
}

/**
 * Course summary for listing pages
 */
export interface CourseSummary {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  pricing: CourseDetail['pricing'];
  stats: CourseDetail['stats'];
  thumbnail?: string;
}

/**
 * Course filter options
 */
export interface CourseFilters {
  category?: CourseCategory;
  difficulty?: CourseDifficulty;
  priceRange?: 'free' | 'paid' | 'all';
  language?: SupportedLanguage;
  rating?: number;
}

/**
 * Course search result
 */
export interface CourseSearchResult {
  courses: CourseSummary[];
  total: number;
  page: number;
  limit: number;
  filters: CourseFilters;
}

/**
 * Course progress tracking
 */
export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: number[];
  currentLesson?: number;
  progressPercentage: number;
  lastAccessedAt: Date;
  completedAt?: Date;
}

/**
 * Course enrollment information
 */
export interface CourseEnrollment {
  courseId: string;
  userId: string;
  enrollmentType: 'free' | 'pro';
  enrolledAt: Date;
  expiresAt?: Date;
  progress: CourseProgress;
}

/**
 * Course review/rating
 */
export interface CourseReview {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  review: string;
  createdAt: Date;
  helpful?: number;
}

/**
 * Course analytics data
 */
export interface CourseAnalytics {
  courseId: string;
  views: number;
  enrollments: number;
  completions: number;
  averageRating: number;
  popularLessons: number[];
  dropoffPoints: number[];
}

/**
 * Course content validation schema
 */
export interface CourseValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Course import/export format
 */
export interface CourseExport {
  version: string;
  exportedAt: Date;
  course: CourseDetail;
  settings: {
    includeAnalytics: boolean;
    includeReviews: boolean;
    includeProgress: boolean;
  };
}

/**
 * Course configuration settings
 */
export interface CourseConfig {
  defaultLanguage: SupportedLanguage;
  maxLessonsPerModule: number;
  maxModulesPerCourse: number;
  allowedFileTypes: string[];
  maxFileSize: number;
  cacheExpiry: number;
}

/**
 * Course API response wrapper
 */
export interface CourseApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
  version: string;
}

/**
 * Course constants
 */
export const COURSE_CONSTANTS = {
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_LESSONS_PER_MODULE: 20,
  MAX_MODULES_PER_COURSE: 10,
  SUPPORTED_VIDEO_FORMATS: ['.mp4', '.webm', '.mov'],
  SUPPORTED_DOCUMENT_FORMATS: ['.pdf', '.doc', '.docx'],
  DEFAULT_LESSON_DURATION: 30, // minutes
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
} as const;

/**
 * Course validation rules
 */
export const COURSE_VALIDATION = {
  REQUIRED_FIELDS: ['id', 'title', 'description', 'category', 'difficulty'],
  TITLE_MIN_LENGTH: 10,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
  MIN_LESSONS_PER_MODULE: 1,
  MAX_LESSONS_PER_MODULE: 20,
} as const;

/**
 * Default course configuration
 */
export const DEFAULT_COURSE_CONFIG: CourseConfig = {
  defaultLanguage: 'en',
  maxLessonsPerModule: 20,
  maxModulesPerCourse: 10,
  allowedFileTypes: ['mp4', 'pdf', 'doc', 'docx'],
  maxFileSize: 100 * 1024 * 1024,
  cacheExpiry: 3600000, // 1 hour
};

/**
 * Course status enumeration
 */
export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  MAINTENANCE = 'maintenance',
}

/**
 * Course access levels
 */
export enum CourseAccessLevel {
  PUBLIC = 'public',
  REGISTERED = 'registered',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}

/**
 * Course event types for analytics
 */
export enum CourseEventType {
  VIEW = 'view',
  ENROLL = 'enroll',
  START_LESSON = 'start_lesson',
  COMPLETE_LESSON = 'complete_lesson',
  COMPLETE_MODULE = 'complete_module',
  COMPLETE_COURSE = 'complete_course',
  REVIEW = 'review',
  SHARE = 'share',
}

/**
 * Utility type for partial course updates
 */
export type PartialCourseDetail = Partial<CourseDetail> & {
  id: string;
};

/**
 * Type guard for CourseDetail
 */
export const isCourseDetail = (obj: any): obj is CourseDetail => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    obj.title &&
    obj.description &&
    obj.category &&
    obj.difficulty &&
    Array.isArray(obj.freeModules) &&
    Array.isArray(obj.proModules)
  );
};

/**
 * Type guard for CourseLesson
 */
export const isCourseLesson = (obj: any): obj is CourseLesson => {
  return (
    obj &&
    typeof obj.id === 'number' &&
    obj.title &&
    obj.description &&
    typeof obj.isLocked === 'boolean'
  );
};

/**
 * Type guard for CourseModule
 */
export const isCourseModule = (obj: any): obj is CourseModule => {
  return (
    obj &&
    typeof obj.id === 'number' &&
    obj.title &&
    obj.description &&
    Array.isArray(obj.lessons)
  );
}; 

export interface LessonTopic {
  name: string;
  nameCht: string;
}

export interface SampleContent {
  title: string;
  titleCht: string;
  prompt: string;
  promptCht: string;
  result: string;
  resultCht: string;
}

export interface ProTip {
  number: number;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  example: string;
  exampleCht: string;
}

export interface ProTipsSection {
  title: string;
  titleCht: string;
  tips: ProTip[];
}

export interface LessonPart {
  id: string;
  number: number;
  title: string;
  titleCht: string;
  icon: string;
  colour: string;
  description: string;
  descriptionCht: string;
  duration: string;
  durationCht: string;
  topics: LessonTopic[];
  sampleContent: SampleContent;
  proTips?: ProTipsSection;
}

export interface LessonContent {
  title: string;
  titleCht: string;
  content: string;
  contentCht: string;
}

export interface CourseData {
  id: string;
  title: string;
  titleCht: string;
  subtitle: string;
  subtitleCht: string;
  parts: LessonPart[];
  getPartContent: (partNumber: number) => LessonContent;
}

export interface VideoTemplateData {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  imageAlt: string;
  videoAlt: string;
  imagePrompt: string;
  videoPrompt: string;
}

export interface ContentRendererProps {
  content: string;
  language: 'en' | 'zh-HK';
  partNumber: number;
  onImageError?: (url: string) => void;
  onVideoError?: (url: string) => void;
} 
