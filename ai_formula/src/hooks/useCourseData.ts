import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DigitalProduct, 
  LearningPlan, 
  digitalProducts, 
  learningPlans, 
  categoryFilters,
  shuffleArray,
  getProductsByCategory
} from '@/data/courses/courseData';

// Type definitions for navigation handlers
export type NavigationHandler = (planId: string, planType: 'free' | 'pro') => void;
export type ProductClickHandler = (product: DigitalProduct) => void;

// 新增：學員統計數據類型
export interface EnrollmentData {
  courseId: number;
  count: number;
  lastEnrollment: string;
  enrollmentDates: string[];
}

export interface CourseStats {
  totalProducts: number;
  totalDownloads: number;
  averageRating: number;
  categories: number;
}

// 新增：學員數管理工具
const ENROLLMENT_STORAGE_KEY = 'course_enrollments';

const getStoredEnrollments = (): Record<number, EnrollmentData> => {
  try {
    const stored = localStorage.getItem(ENROLLMENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load enrollment data:', error);
    return {};
  }
};

const saveEnrollmentData = (data: Record<number, EnrollmentData>) => {
  try {
    localStorage.setItem(ENROLLMENT_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save enrollment data:', error);
  }
};

const incrementEnrollment = (courseId: number): number => {
  const enrollments = getStoredEnrollments();
  const currentDate = new Date().toISOString();
  
  if (enrollments[courseId]) {
    enrollments[courseId].count += 1;
    enrollments[courseId].lastEnrollment = currentDate;
    enrollments[courseId].enrollmentDates.push(currentDate);
  } else {
    enrollments[courseId] = {
      courseId,
      count: 1,
      lastEnrollment: currentDate,
      enrollmentDates: [currentDate]
    };
  }
  
  saveEnrollmentData(enrollments);
  return enrollments[courseId].count;
};

// Custom hook for course data management
export const useCourseData = (isZhHK: boolean) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState<Record<number, EnrollmentData>>({});

  // 載入學員數據
  useEffect(() => {
    setEnrollmentData(getStoredEnrollments());
  }, []);

  // Memoized filtered and shuffled products
  const filteredProducts = useMemo(() => {
    try {
      // 先獲取基礎過濾結果
      const baseFiltered = getProductsByCategory(selectedCategory);
      // 然後更新為動態數據
      const dynamicFiltered = baseFiltered.map(product => {
        const enrollment = enrollmentData[product.id];
        const baseDownloads = product.downloads;
        const additionalEnrollments = enrollment ? enrollment.count : 0;
        
        return {
          ...product,
          downloads: baseDownloads + additionalEnrollments
        };
      });
      return shuffleArray(dynamicFiltered);
    } catch (err) {
      setError('Failed to filter products');
      return [];
    }
  }, [selectedCategory, enrollmentData]);

  // 動態課程數據
  const dynamicProducts = useMemo(() => {
    return digitalProducts.map(product => {
      const enrollment = enrollmentData[product.id];
      const baseDownloads = product.downloads;
      const additionalEnrollments = enrollment ? enrollment.count : 0;
      
      return {
        ...product,
        downloads: baseDownloads + additionalEnrollments
      };
    });
  }, [enrollmentData]);

  // Memoized course statistics
  const courseStats = useMemo((): CourseStats => {
    return {
      totalProducts: digitalProducts.length,
      totalDownloads: 0,
      averageRating: 0,
      categories: categoryFilters.length - 1
    };
  }, []);

  // Optimized navigation handler
  const handlePlanClick = useCallback<NavigationHandler>((planId: string, planType: 'free' | 'pro') => {
    try {
      setIsLoading(true);
      
      if (planId === 'ai-image-video-creation') {
        if (planType === 'free') {
          navigate(`/course/${planId}/free`);
        } else {
          navigate(`/course/${planId}`);
        }
      } else {
        const message = isZhHK ? '此課程即將推自動化' : 'This course is coming soon!';
        alert(message);
      }
    } catch (err) {
      setError('Navigation failed');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, isZhHK]);

  // Optimized product click handler
  const handleProductClick = useCallback<ProductClickHandler>((product: DigitalProduct) => {
    try {
      setIsLoading(true);
      
      // 增加學員數統計
      const newCount = incrementEnrollment(product.id);
      
      // 更新本地狀態
      setEnrollmentData(prev => ({
        ...prev,
        [product.id]: {
          courseId: product.id,
          count: prev[product.id] ? prev[product.id].count + 1 : 1,
          lastEnrollment: new Date().toISOString(),
          enrollmentDates: prev[product.id] 
            ? [...prev[product.id].enrollmentDates, new Date().toISOString()]
            : [new Date().toISOString()]
        }
      }));
      
      // 導航邏輯
      if (product.category === 'business-automation') {
        navigate('/courses/ai-business-automation');
      } else if (product.category === 'prompt-engineering') {
        navigate('/prompt-engineering/overview');
      } else if (product.category === 'programming') {
        navigate('/coding-basics/overview');
      } else if (product.id === 11) {
        navigate('/chatgpt-mastery/overview');
      } else if (product.id === 12) {
        navigate('/perplexity-tools/overview');
      } else if (product.category === 'chatgpt-complete-course') {
        navigate('/courses/chatgpt-complete-course');
      } else {
        navigate(`/course/${product.category}`);
      }
      
      console.log(`✅ 課程 "${product.titleCht}" 學員數增加到: ${newCount}`);
    } catch (err) {
      setError('Product navigation failed');
      console.error('Failed to increment enrollment:', err);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Optimized category change handler
  const handleCategoryChange = useCallback((category: string) => {
    try {
      setSelectedCategory(category);
      setError(null);
    } catch (err) {
      setError('Failed to change category');
    }
  }, []);

  // Clear error handler
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 獲取課程學員數據的函數
  const getCourseEnrollmentData = useCallback((courseId: number): EnrollmentData | null => {
    return enrollmentData[courseId] || null;
  }, [enrollmentData]);

  // 重置學員數據的函數（開發用）
  const resetEnrollmentData = useCallback(() => {
    localStorage.removeItem(ENROLLMENT_STORAGE_KEY);
    setEnrollmentData({});
  }, []);

  return {
    // Data
    digitalProducts: dynamicProducts,
    learningPlans,
    categoryFilters,
    filteredProducts,
    courseStats,
    
    // State
    selectedCategory,
    error,
    isLoading,
    enrollmentData,
    
    // Handlers
    handlePlanClick,
    handleProductClick,
    handleCategoryChange,
    clearError,
    getCourseEnrollmentData,
    resetEnrollmentData
  };
};

// Custom hook for animation delays
export const useAnimationConfig = () => {
  return useMemo(() => ({
    hero: { duration: 0.8, delay: 0 },
    learningPlans: { duration: 0.8, delay: 0.2 },
    productGrid: { duration: 0.8, delay: 0.4 },
    cta: { duration: 0.8, delay: 0.6 }
  }), []);
};

// Custom hook for responsive design
export const useResponsiveConfig = () => {
  return useMemo(() => ({
    hero: {
      title: "text-4xl md:text-6xl",
      subtitle: "text-xl",
      container: "max-w-7xl mx-auto"
    },
    cards: {
      grid: "grid md:grid-cols-2 lg:grid-cols-2 gap-8",
      planGrid: "grid md:grid-cols-3 gap-8"
    },
    padding: {
      section: "py-16 px-4 sm:px-6 lg:px-8",
      container: "pt-32 pb-16 px-4 sm:px-6 lg:px-8"
    }
  }), []);
};
