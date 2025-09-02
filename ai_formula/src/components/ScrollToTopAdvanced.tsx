import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  /**
   * 滾動行為：'smooth' 平滑滾動 | 'auto' 立即跳轉
   * 默認：'smooth'
   */
  behavior?: 'smooth' | 'auto';
  
  /**
   * 是否啟用滾動延遲（毫秒）
   * 某些情況下頁面還未完全加載，可能需要小延遲
   * 默認：0
   */
  delay?: number;
  
  /**
   * 排除不需要滾動到頂部的路徑
   * 例如：['/modal', '/popup'] 這些路徑切換時不滾動
   */
  excludePaths?: string[];
  
  /**
   * 是否在開發環境下顯示調試信息
   */
  debug?: boolean;
}

const ScrollToTopAdvanced: React.FC<ScrollToTopProps> = ({
  behavior = 'smooth',
  delay = 0,
  excludePaths = [],
  debug = false
}) => {
  const { pathname } = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // 清除之前的定時器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 檢查是否在排除列表中
    if (excludePaths.some(path => pathname.includes(path))) {
      if (debug) {
        console.log(`ScrollToTop: 跳過路徑 ${pathname} (在排除列表中)`);
      }
      return;
    }

    // 滾動函數
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior
      });
      
      if (debug) {
        console.log(`ScrollToTop: 已滾動到頂部 - 路徑: ${pathname}, 行為: ${behavior}`);
      }
    };

    // 如果有延遲，使用 setTimeout
    if (delay > 0) {
      timeoutRef.current = setTimeout(scrollToTop, delay);
    } else {
      scrollToTop();
    }

    // 清理函數
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, behavior, delay, excludePaths, debug]);

  return null;
};

export default ScrollToTopAdvanced; 