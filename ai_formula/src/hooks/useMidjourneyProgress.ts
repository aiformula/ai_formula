/**
 * Midjourney Progress Hook
 * @fileoverview Midjourney 課程進度追蹤 Hook
 * @author AI Formula Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'midjourney-course-progress';

interface ProgressState {
  completedUnits: { [themeId: number]: number[] };
  completedQuizzes: { [themeId: number]: number };
  totalTimeSpent: number; // 分鐘
  lastActiveDate: string;
}

interface ThemeProgressInfo {
  completedUnits: number[];
  totalUnits: number;
  progressPercentage: number;
}

interface ProgressStats {
  totalUnits: number;
  completedUnits: number;
  totalQuizzes: number;
  completedQuizzes: number;
  overallProgress: number;
  totalTimeSpent: number;
  averageScore: number;
  completedThemes: number;
  totalThemes: number;
}

const useMidjourneyProgress = () => {
  const [progressState, setProgressState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
    return {
      completedUnits: {},
      completedQuizzes: {},
      totalTimeSpent: 0,
      lastActiveDate: new Date().toISOString()
    };
  });

  // 保存進度到本地存儲
  const saveProgress = useCallback((newState: ProgressState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setProgressState(newState);
  }, []);

  // 完成單元
  const completeUnit = useCallback((themeId: number, unitId: number) => {
    setProgressState(prev => {
      const themeUnits = prev.completedUnits[themeId] || [];
      if (!themeUnits.includes(unitId)) {
        const newState = {
          ...prev,
          completedUnits: {
            ...prev.completedUnits,
            [themeId]: [...themeUnits, unitId]
          },
          lastActiveDate: new Date().toISOString()
        };
        saveProgress(newState);
        return newState;
      }
      return prev;
    });
  }, [saveProgress]);

  // 完成測驗
  const completeQuiz = useCallback((themeId: number, score: number) => {
    setProgressState(prev => {
      const newState = {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [themeId]: score
        },
        lastActiveDate: new Date().toISOString()
      };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  // 檢查主題是否完成
  const isThemeCompleted = useCallback((themeId: number): boolean => {
    const themeUnits = progressState.completedUnits[themeId] || [];
    const hasQuiz = progressState.completedQuizzes[themeId] !== undefined;
    
    // 根據主題ID定義每個主題的單元數量
    const themeUnitCounts: { [key: number]: number } = {
      1: 5, // 第一章：5個單元
      2: 5, // 第二章：5個單元
      3: 5, // 第三章：5個單元
      4: 5, // 第四章：5個單元
      5: 15 // 第五章：15個單元
    };
    
    const requiredUnits = themeUnitCounts[themeId] || 0;
    const completedUnits = themeUnits.length;
    
    return completedUnits >= requiredUnits && hasQuiz;
  }, [progressState]);

  // 獲取主題進度
  const getThemeProgress = useCallback((themeId: number): ThemeProgressInfo | null => {
    const themeUnits = progressState.completedUnits[themeId] || [];
    
    // 根據主題ID定義每個主題的單元數量
    const themeUnitCounts: { [key: number]: number } = {
      1: 5, // 第一章：5個單元
      2: 5, // 第二章：5個單元
      3: 5, // 第三章：5個單元
      4: 5, // 第四章：5個單元
      5: 15 // 第五章：15個單元
    };
    
    const totalUnits = themeUnitCounts[themeId] || 0;
    const completedUnits = themeUnits;
    
    if (totalUnits === 0) return null;
    
    return {
      completedUnits,
      totalUnits,
      progressPercentage: Math.round((completedUnits.length / totalUnits) * 100)
    };
  }, [progressState]);

  // 檢查單元是否完成
  const isUnitCompleted = useCallback((themeId: number, unitId: number): boolean => {
    const themeUnits = progressState.completedUnits[themeId] || [];
    return themeUnits.includes(unitId);
  }, [progressState]);

  // 獲取整體進度統計
  const getProgressStats = useCallback((): ProgressStats => {
    const totalThemes = 5; // Midjourney 課程總主題數
    const totalUnitsPerTheme = { 1: 5, 2: 5, 3: 5, 4: 5, 5: 15 }; // 每個主題的單元數
    const totalUnits = Object.values(totalUnitsPerTheme).reduce((sum, count) => sum + count, 0);
    const totalQuizzes = totalThemes;

    let completedUnits = 0;
    let completedThemes = 0;
    let totalScores = 0;
    let scoredQuizzes = 0;

    // 計算完成的單元數
    for (const themeId in progressState.completedUnits) {
      completedUnits += progressState.completedUnits[parseInt(themeId)].length;
    }

    // 計算完成的主題和測驗分數
    for (let themeId = 1; themeId <= totalThemes; themeId++) {
      if (isThemeCompleted(themeId)) {
        completedThemes++;
      }
      
      const quizScore = progressState.completedQuizzes[themeId];
      if (quizScore !== undefined) {
        totalScores += quizScore;
        scoredQuizzes++;
      }
    }

    const completedQuizzes = Object.keys(progressState.completedQuizzes).length;
    const overallProgress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
    const averageScore = scoredQuizzes > 0 ? Math.round(totalScores / scoredQuizzes) : 0;

    return {
      totalUnits,
      completedUnits,
      totalQuizzes,
      completedQuizzes,
      overallProgress,
      totalTimeSpent: progressState.totalTimeSpent,
      averageScore,
      completedThemes,
      totalThemes
    };
  }, [progressState, isThemeCompleted]);

  // 重置進度
  const resetProgress = useCallback(() => {
    const newState: ProgressState = {
      completedUnits: {},
      completedQuizzes: {},
      totalTimeSpent: 0,
      lastActiveDate: new Date().toISOString()
    };
    saveProgress(newState);
  }, [saveProgress]);

  // 增加學習時間
  const addLearningTime = useCallback((minutes: number) => {
    setProgressState(prev => {
      const newState = {
        ...prev,
        totalTimeSpent: prev.totalTimeSpent + minutes,
        lastActiveDate: new Date().toISOString()
      };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  // 自動保存進度
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
    }, 30000); // 每30秒保存一次

    return () => clearInterval(saveInterval);
  }, [progressState]);

  return {
    progressState,
    completeUnit,
    completeQuiz,
    isThemeCompleted,
    getThemeProgress,
    isUnitCompleted,
    getProgressStats,
    resetProgress,
    addLearningTime,
    themeProgress: progressState,
    courseStats: getProgressStats()
  };
};

export { useMidjourneyProgress }; 