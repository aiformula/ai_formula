/**
 * Perplexity Course Progress Hook
 * @fileoverview Perplexity 課程進度追蹤 Hook
 * @author AI Formula Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';

// 定義進度狀態介面
interface PerplexityProgressState {
  completedUnits: { [themeId: number]: number[] };
  completedQuizzes: number[];
  lastAccessed: {
    themeId: number;
    unitId: number;
    timestamp: number;
  } | null;
  totalStudyTime: number; // 以分鐘為單位
  startDate: string;
}

// 默認進度狀態
const defaultProgressState: PerplexityProgressState = {
  completedUnits: {},
  completedQuizzes: [],
  lastAccessed: null,
  totalStudyTime: 0,
  startDate: new Date().toISOString()
};

// 本地存儲鍵
const STORAGE_KEY = 'perplexity-course-progress';

export const usePerplexityProgress = () => {
  // 狀態管理
  const [progressState, setProgressState] = useState<PerplexityProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProgressState;
    } catch {
      return defaultProgressState;
    }
  });

  // 保存到本地存儲
  const saveProgress = useCallback((newState: PerplexityProgressState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      setProgressState(newState);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, []);

  // 完成單元
  const completeUnit = useCallback((themeId: number, unitId: number) => {
    setProgressState(prevState => {
      const newState = { ...prevState };
      
      // 初始化主題陣列如果不存在
      if (!newState.completedUnits[themeId]) {
        newState.completedUnits[themeId] = [];
      }
      
      // 添加單元ID如果尚未完成
      if (!newState.completedUnits[themeId].includes(unitId)) {
        newState.completedUnits[themeId].push(unitId);
      }
      
      // 更新最後訪問
      newState.lastAccessed = {
        themeId,
        unitId,
        timestamp: Date.now()
      };
      
      // 保存到本地存儲
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
      
      return newState;
    });
  }, []);

  // 完成測驗
  const completeQuiz = useCallback((themeId: number) => {
    setProgressState(prevState => {
      const newState = { ...prevState };
      
      // 添加測驗ID如果尚未完成
      if (!newState.completedQuizzes.includes(themeId)) {
        newState.completedQuizzes.push(themeId);
      }
      
      // 保存到本地存儲
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
      
      return newState;
    });
  }, []);

  // 檢查單元是否已完成
  const isUnitCompleted = useCallback((themeId: number, unitId: number) => {
    return progressState.completedUnits[themeId]?.includes(unitId) || false;
  }, [progressState.completedUnits]);

  // 檢查測驗是否已完成
  const isQuizCompleted = useCallback((themeId: number) => {
    return progressState.completedQuizzes.includes(themeId);
  }, [progressState.completedQuizzes]);

  // 檢查主題是否已完成
  const isThemeCompleted = useCallback((themeId: number) => {
    // 這裡需要根據實際的課程數據來判斷
    // 暫時簡化為檢查是否完成了測驗
    return isQuizCompleted(themeId);
  }, [isQuizCompleted]);

  // 獲取主題進度百分比
  const getThemeProgress = useCallback((themeId: number) => {
    // 根據實際課程數據計算單元數量
    const themeUnitsMap: { [key: number]: number } = {
      1: 5, // 第一章：5個單元
      2: 5, // 第二章：5個單元
      3: 5, // 第三章：5個單元
      4: 4, // 第四章：4個單元
      5: 4, // 第五章：4個單元
      6: 4  // 第六章：4個單元
    };
    
    const totalUnitsInTheme = themeUnitsMap[themeId] || 5;
    const completedUnitsCount = progressState.completedUnits[themeId]?.length || 0;
    const quizCompleted = isQuizCompleted(themeId) ? 1 : 0;
    
    // 單元完成度佔80%，測驗完成度佔20%
    const unitProgress = (completedUnitsCount / totalUnitsInTheme) * 80;
    const quizProgress = quizCompleted * 20;
    
    return Math.round(unitProgress + quizProgress);
  }, [progressState.completedUnits, isQuizCompleted]);

  // 獲取整體進度統計
  const getProgressStats = useCallback(() => {
    const totalThemes = 6; // 總共6個主題
    const totalUnits = 27; // 總共27個單元 (5+5+5+4+4+4)
    const totalQuizzes = 6; // 總共6個測驗
    
    // 計算完成的單元總數
    const completedUnitsCount = Object.values(progressState.completedUnits)
      .reduce((acc, units) => acc + units.length, 0);
    
    // 計算完成的測驗數量
    const completedQuizzesCount = progressState.completedQuizzes.length;
    
    // 計算完成的主題數量
    const completedThemesCount = Array.from({ length: totalThemes }, (_, i) => i + 1)
      .filter(themeId => isThemeCompleted(themeId)).length;
    
    // 計算總進度
    const totalProgress = Math.round(
      ((completedUnitsCount / totalUnits) * 60 + 
       (completedQuizzesCount / totalQuizzes) * 30 + 
       (completedThemesCount / totalThemes) * 10)
    );
    
    return {
      totalProgress,
      completedUnits: completedUnitsCount,
      completedQuizzes: completedQuizzesCount,
      completedThemes: completedThemesCount,
      totalThemes: totalThemes,
      totalTimeSpent: progressState.totalStudyTime,
      studyTime: `${Math.floor(progressState.totalStudyTime / 60)}h ${progressState.totalStudyTime % 60}m`
    };
  }, [progressState, isThemeCompleted]);

  // 重置進度
  const resetProgress = useCallback(() => {
    const newState = {
      ...defaultProgressState,
      startDate: new Date().toISOString()
    };
    saveProgress(newState);
  }, [saveProgress]);

  // 更新學習時間
  const updateStudyTime = useCallback((additionalMinutes: number) => {
    setProgressState(prevState => {
      const newState = {
        ...prevState,
        totalStudyTime: prevState.totalStudyTime + additionalMinutes
      };
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error('Failed to save study time:', error);
      }
      
      return newState;
    });
  }, []);

  // 獲取課程統計數據
  const courseStats = getProgressStats();

  // 主題進度數據
  const themeProgress = {
    1: getThemeProgress(1),
    2: getThemeProgress(2),
    3: getThemeProgress(3),
    4: getThemeProgress(4),
    5: getThemeProgress(5),
    6: getThemeProgress(6)
  };

  return {
    // 狀態
    progressState,
    themeProgress,
    courseStats,
    
    // 檢查函數
    isUnitCompleted,
    isQuizCompleted,
    isThemeCompleted,
    
    // 進度計算
    getThemeProgress,
    getProgressStats,
    
    // 操作函數
    completeUnit,
    completeQuiz,
    resetProgress,
    updateStudyTime
  };
}; 