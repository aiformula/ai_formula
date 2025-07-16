import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UseScrollToTopOptions {
  behavior?: 'smooth' | 'auto';
  delay?: number;
  enabled?: boolean;
}

/**
 * 自定義 Hook：useScrollToTop
 * 在路由變化時自動滾動到頁面頂部
 * 
 * @param options 配置選項
 * @returns void
 * 
 * 使用範例：
 * ```tsx
 * function MyComponent() {
 *   useScrollToTop({ behavior: 'smooth', delay: 100 });
 *   
 *   return <div>My content</div>;
 * }
 * ```
 */
export const useScrollToTop = (options: UseScrollToTopOptions = {}) => {
  const {
    behavior = 'smooth',
    delay = 0,
    enabled = true
  } = options;
  
  const { pathname } = useLocation();

  useEffect(() => {
    if (!enabled) return;

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior
      });
    };

    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [pathname, behavior, delay, enabled]);
};

/**
 * 手動滾動到頂部的函數
 * 可以在任何地方調用
 */
export const scrollToTop = (behavior: 'smooth' | 'auto' = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};

export default useScrollToTop; 