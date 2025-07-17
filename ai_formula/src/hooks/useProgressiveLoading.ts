import { useState, useEffect, useCallback } from 'react';

interface ProgressiveLoadingOptions {
  initialDelay?: number;
  staggerDelay?: number;
  enableStagger?: boolean;
}

interface LoadingStage {
  header: boolean;
  mainContent: boolean;
  sidebar: boolean;
  interactions: boolean;
}

export const useProgressiveLoading = (options: ProgressiveLoadingOptions = {}) => {
  const {
    initialDelay = 100,
    staggerDelay = 200,
    enableStagger = true
  } = options;

  // 加載階段狀態
  const [loadingStages, setLoadingStages] = useState<LoadingStage>({
    header: false,
    mainContent: false,
    sidebar: false,
    interactions: false
  });

  // 整體加載狀態
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 漸進式加載邏輯
  useEffect(() => {
    if (!enableStagger) {
      // 如果不啟用漸進式，直接全部加載
      setTimeout(() => {
        setLoadingStages({
          header: true,
          mainContent: true,
          sidebar: true,
          interactions: true
        });
        setLoadingProgress(100);
        setIsLoading(false);
      }, initialDelay);
      return;
    }

    // 漸進式加載時間序列
    const timeouts: NodeJS.Timeout[] = [];

    // 階段1：Header (立即顯示)
    timeouts.push(setTimeout(() => {
      setLoadingStages(prev => ({ ...prev, header: true }));
      setLoadingProgress(25);
    }, initialDelay));

    // 階段2：主要內容 (延遲顯示)
    timeouts.push(setTimeout(() => {
      setLoadingStages(prev => ({ ...prev, mainContent: true }));
      setLoadingProgress(50);
    }, initialDelay + staggerDelay));

    // 階段3：側邊欄 (再延遲顯示)
    timeouts.push(setTimeout(() => {
      setLoadingStages(prev => ({ ...prev, sidebar: true }));
      setLoadingProgress(75);
    }, initialDelay + staggerDelay * 2));

    // 階段4：交互功能 (最後顯示)
    timeouts.push(setTimeout(() => {
      setLoadingStages(prev => ({ ...prev, interactions: true }));
      setLoadingProgress(100);
      setIsLoading(false);
    }, initialDelay + staggerDelay * 3));

    // 清理函數
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [initialDelay, staggerDelay, enableStagger]);

  // 重置加載狀態
  const resetLoading = useCallback(() => {
    setLoadingStages({
      header: false,
      mainContent: false,
      sidebar: false,
      interactions: false
    });
    setLoadingProgress(0);
    setIsLoading(true);
  }, []);

  // 手動完成某個階段
  const completeStage = useCallback((stage: keyof LoadingStage) => {
    setLoadingStages(prev => ({ ...prev, [stage]: true }));
  }, []);

  return {
    loadingStages,
    isLoading,
    loadingProgress,
    resetLoading,
    completeStage,
    // 便捷的階段檢查
    isHeaderReady: loadingStages.header,
    isMainContentReady: loadingStages.mainContent,
    isSidebarReady: loadingStages.sidebar,
    isInteractionsReady: loadingStages.interactions,
    // 整體完成狀態
    isFullyLoaded: Object.values(loadingStages).every(Boolean)
  };
};

// 組件可見性Hook - 用於懶加載
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
};

// 內容淡入動畫Hook
export const useFadeInAnimation = (isReady: boolean, delay: number = 0) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timeout = setTimeout(() => {
        setShouldRender(true);
        setIsAnimating(true);
        
        // 動畫完成後停止動畫狀態
        const animationTimeout = setTimeout(() => {
          setIsAnimating(false);
        }, 300);

        return () => clearTimeout(animationTimeout);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isReady, delay]);

  return {
    shouldRender,
    isAnimating,
    className: `smooth-appear ${shouldRender ? 'visible' : ''}`
  };
}; 