import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop 組件
 * 自動在路由切換時將頁面滾動到頂部
 * 
 * 使用方法：
 * 1. 將此組件放在 App.tsx 中的 <BrowserRouter> 內部
 * 2. 放在所有 <Routes> 之前
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 每當路由 pathname 改變時，滾動到頂部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 使用平滑滾動效果，你也可以改為 'auto' 來立即跳轉
    });
  }, [pathname]);

  // 這個組件不渲染任何內容
  return null;
};

export default ScrollToTop; 