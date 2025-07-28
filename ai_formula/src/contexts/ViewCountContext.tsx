import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ViewCounts {
  [key: number]: number;
}

interface ViewCountContextType {
  viewCounts: ViewCounts;
  incrementView: (postId: number) => void;
  getViewCount: (postId: number) => number;
}

const ViewCountContext = createContext<ViewCountContextType | undefined>(undefined);

export const ViewCountProvider = ({ children }: { children: ReactNode }) => {
  const [viewCounts, setViewCounts] = useState<ViewCounts>({});

  // 從localStorage載入?��?
  useEffect(() => {
    const savedCounts = localStorage.getItem('blogViewCounts');
    if (savedCounts) {
      try {
        setViewCounts(JSON.parse(savedCounts));
      } catch (error) {
        console.error('Error loading view counts:', error);
      }
    }
  }, []);

  // 保�??�localStorage
  useEffect(() => {
    if (Object.keys(viewCounts).length > 0) {
      localStorage.setItem('blogViewCounts', JSON.stringify(viewCounts));
    }
  }, [viewCounts]);

  const incrementView = (postId: number) => {
    setViewCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  const getViewCount = (postId: number): number => {
    return viewCounts[postId] || 0;
  };

  return (
    <ViewCountContext.Provider value={{ viewCounts, incrementView, getViewCount }}>
      {children}
    </ViewCountContext.Provider>
  );
};

export const useViewCount = () => {
  const context = useContext(ViewCountContext);
  if (context === undefined) {
    // 提供 fallback 而不是拋出錯誤
    console.warn('useViewCount must be used within a ViewCountProvider. Using fallback values.');
    return {
      viewCounts: {},
      incrementView: () => {},
      getViewCount: () => 0
    };
  }
  return context;
}; 
