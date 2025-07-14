import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DigitalProduct, 
  LearningPlan, 
  CategoryType
} from '@/data/courseData';

// Type definitions for navigation handlers
export type NavigationHandler = (planId: string, planType: 'free' | 'pro') => void;
export type ProductClickHandler = (product: DigitalProduct) => void;

export interface CourseStats {
  totalProducts: number;
  totalDownloads: number;
  averageRating: number;
  categories: number;
}
import { 
  digitalProducts, 
  learningPlans, 
  categoryFilters,
  shuffleArray,
  filterProductsByCategory,
  getTotalDownloads,
  getAverageRating
} from '@/data/courseData';

// Custom hook for course data management
export const useCourseData = (isZhTW: boolean) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized filtered and shuffled products
  const filteredProducts = useMemo(() => {
    try {
      const filtered = filterProductsByCategory(digitalProducts, selectedCategory);
      return shuffleArray(filtered);
    } catch (err) {
      setError('Failed to filter products');
      return [];
    }
  }, [selectedCategory]);

  // Memoized course statistics
  const courseStats = useMemo((): CourseStats => {
    return {
      totalProducts: digitalProducts.length,
      totalDownloads: getTotalDownloads(digitalProducts),
      averageRating: getAverageRating(digitalProducts),
      categories: categoryFilters.length - 1 // Exclude 'all' category
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
        // For other plans, show coming soon message
        const message = isZhTW ? '此課程即將推?��?' : 'This course is coming soon!';
        alert(message);
      }
    } catch (err) {
      setError('Navigation failed');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, isZhTW]);

  // Optimized product click handler
  const handleProductClick = useCallback<ProductClickHandler>((product: DigitalProduct) => {
    try {
      setIsLoading(true);
      
      if (product.category === 'prompt-engineering') {
        navigate('/prompt-engineering/overview');
      } else if (product.category === 'programming') {
        navigate('/coding-basics/overview');
      } else if (product.id === 11) { // ChatGPT Mastery
        navigate('/chatgpt-mastery/overview');
      } else if (product.id === 12) { // Perplexity Tools
        navigate('/perplexity-tools/overview');
      } else {
        navigate(`/course/${product.category}`);
      }
    } catch (err) {
      setError('Product navigation failed');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Optimized category change handler
  const handleCategoryChange = useCallback((category: CategoryType) => {
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

  return {
    // Data
    digitalProducts,
    learningPlans,
    categoryFilters,
    filteredProducts,
    courseStats,
    
    // State
    selectedCategory,
    error,
    isLoading,
    
    // Handlers
    handlePlanClick,
    handleProductClick,
    handleCategoryChange,
    clearError
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