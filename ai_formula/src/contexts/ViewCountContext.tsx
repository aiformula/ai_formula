import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ViewCounts {
  [key: number]: number;
}

interface ViewCountContextType {
  viewCounts: ViewCounts;
  incrementView: (postId: number) => void;
  getViewCount: (postId: number) => number;
}

// 安全的localStorage檢查
const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
};

const ViewCountContext = createContext<ViewCountContextType | undefined>(undefined);

export const ViewCountProvider = ({ children }: { children: ReactNode }) => {
  const [viewCounts, setViewCounts] = useState<ViewCounts>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // 安全地從localStorage載入數據
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      setIsInitialized(true);
      return;
    }

    try {
      const savedCounts = localStorage.getItem('blogViewCounts');
      if (savedCounts) {
        const parsed = JSON.parse(savedCounts);
        if (parsed && typeof parsed === 'object') {
          setViewCounts(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading view counts from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 安全地保存到localStorage
  useEffect(() => {
    if (!isInitialized || !isLocalStorageAvailable()) return;
    
    try {
      if (Object.keys(viewCounts).length > 0) {
        localStorage.setItem('blogViewCounts', JSON.stringify(viewCounts));
      }
    } catch (error) {
      console.error('Error saving view counts to localStorage:', error);
    }
  }, [viewCounts, isInitialized]);

  const incrementView = (postId: number) => {
    if (typeof postId !== 'number' || isNaN(postId)) {
      console.warn('Invalid postId for incrementView:', postId);
      return;
    }

    try {
      setViewCounts(prev => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1
      }));
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const getViewCount = (postId: number): number => {
    if (typeof postId !== 'number' || isNaN(postId)) {
      console.warn('Invalid postId for getViewCount:', postId);
      return 0;
    }

    try {
      return viewCounts[postId] || 0;
    } catch (error) {
      console.error('Error getting view count:', error);
      return 0;
    }
  };

  const contextValue = {
    viewCounts,
    incrementView,
    getViewCount
  };

  return (
    <ViewCountContext.Provider value={contextValue}>
      {children}
    </ViewCountContext.Provider>
  );
};

export const useViewCount = () => {
  const context = useContext(ViewCountContext);
  
  if (context === undefined) {
    // 提供完整的 fallback 而不是拋出錯誤
    console.warn('useViewCount must be used within a ViewCountProvider. Using fallback values.');
    return {
      viewCounts: {},
      incrementView: (postId: number) => {
        console.warn('ViewCount incrementView called outside of provider context');
      },
      getViewCount: (postId: number) => {
        console.warn('ViewCount getViewCount called outside of provider context');
        return 0;
      }
    };
  }
  
  return context;
}; 
