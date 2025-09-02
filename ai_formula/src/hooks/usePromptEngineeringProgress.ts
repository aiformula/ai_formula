/**
 * Prompt Engineering Course Progress Hook
 * @fileoverview 提示工程課程進度追蹤 Hook
 * @author AI Formula Team
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';

interface ProgressData {
  completedThemes: Set<number>;
  completedUnits: Set<string>;
  completedQuizzes: Set<number>;
  lastAccessed: string | null;
}

export const usePromptEngineeringProgress = () => {
  const [progressData, setProgressData] = useState<ProgressData>({
    completedThemes: new Set(),
    completedUnits: new Set(),
    completedQuizzes: new Set(),
    lastAccessed: null
  });

  // 從 localStorage 載入進度
  useEffect(() => {
    const savedProgress = localStorage.getItem('prompt-engineering-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgressData({
          completedThemes: new Set(parsed.completedThemes || []),
          completedUnits: new Set(parsed.completedUnits || []),
          completedQuizzes: new Set(parsed.completedQuizzes || []),
          lastAccessed: parsed.lastAccessed || null
        });
      } catch (error) {
        console.error('Failed to load prompt engineering progress:', error);
      }
    }
  }, []);

  // 保存進度到 localStorage
  const saveProgress = (newData: ProgressData) => {
    try {
      const toSave = {
        completedThemes: Array.from(newData.completedThemes),
        completedUnits: Array.from(newData.completedUnits),
        completedQuizzes: Array.from(newData.completedQuizzes),
        lastAccessed: newData.lastAccessed
      };
      localStorage.setItem('prompt-engineering-progress', JSON.stringify(toSave));
      setProgressData(newData);
    } catch (error) {
      console.error('Failed to save prompt engineering progress:', error);
    }
  };

  // 完成主題
  const completeTheme = (themeId: number) => {
    const newData = {
      ...progressData,
      completedThemes: new Set([...progressData.completedThemes, themeId]),
      lastAccessed: new Date().toISOString()
    };
    saveProgress(newData);
  };

  // 標記課程完成
  const markLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(progressData.completedUnits);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setProgressData(prev => ({ ...prev, completedUnits: newCompleted }));
  };
  
  // 完成單元（更新格式以匹配模板需求）
  const completeUnit = (unitId: string) => {
    const newData = {
      ...progressData,
      completedUnits: new Set([...progressData.completedUnits, unitId]),
      lastAccessed: new Date().toISOString()
    };
    saveProgress(newData);
  };

  // 完成測驗
  const completeQuiz = (themeId: number) => {
    const newData = {
      ...progressData,
      completedQuizzes: new Set([...progressData.completedQuizzes, themeId]),
      lastAccessed: new Date().toISOString()
    };
    saveProgress(newData);
  };

  // 檢查主題是否完成
  const isThemeCompleted = (themeId: number): boolean => {
    return progressData.completedThemes.has(themeId);
  };

  // 檢查單元是否完成
  const isUnitCompleted = (unitId: string): boolean => {
    return progressData.completedUnits.has(unitId);
  };

  // 檢查測驗是否完成
  const isQuizCompleted = (themeId: number): boolean => {
    return progressData.completedQuizzes.has(themeId);
  };

  // 獲取主題進度百分比
  const getThemeProgress = (themeId: number): any => {
    const isCompleted = isThemeCompleted(themeId);
    const completedUnits = Array.from(progressData.completedUnits).filter(id => String(id).startsWith(`${themeId}-`));
    
    // 根據課程模塊計算總單元數
    const totalUnitsPerTheme = 4; // 每個模塊大約4個單元
    const progressPercentage = Math.round((completedUnits.length / totalUnitsPerTheme) * 100);
    
    return {
      progressPercentage: isCompleted ? 100 : progressPercentage,
      completed: isCompleted,
      completedUnits: completedUnits,
      totalUnits: totalUnitsPerTheme
    };
  };

  // 獲取整體進度統計
  const getProgressStats = () => {
    // 這些數字應該根據實際的課程結構來計算
    const totalThemes = 4; // 4個模塊
    const totalUnits = 16; // 16個課程
    const totalQuizzes = 4; // 4個測驗

    return {
      completedThemes: progressData.completedThemes.size,
      totalThemes,
      completedUnits: progressData.completedUnits.size,
      totalUnits,
      completedQuizzes: progressData.completedQuizzes.size,
      totalQuizzes,
      overallProgress: Math.round(
        ((progressData.completedThemes.size + progressData.completedUnits.size + progressData.completedQuizzes.size) / 
         (totalThemes + totalUnits + totalQuizzes)) * 100
      )
    };
  };

  // 重置進度
  const resetProgress = () => {
    const newData: ProgressData = {
      completedThemes: new Set(),
      completedUnits: new Set(),
      completedQuizzes: new Set(),
      lastAccessed: null
    };
    saveProgress(newData);
  };

  return {
    // 狀態 - 保持原有格式和添加新的
    completedThemes: progressData.completedThemes,
    completedUnits: progressData.completedUnits,
    completedQuizzes: progressData.completedQuizzes,
    lastAccessed: progressData.lastAccessed,
    progressState: {
      // 構建模板期望的結構
      completedUnits: {
        // 將 Set 轉換為模板期望的對象結構
        1: Array.from(progressData.completedUnits).filter(id => String(id).startsWith('1-')).map(id => parseInt(String(id).split('-')[1])),
        2: Array.from(progressData.completedUnits).filter(id => String(id).startsWith('2-')).map(id => parseInt(String(id).split('-')[1])),
        3: Array.from(progressData.completedUnits).filter(id => String(id).startsWith('3-')).map(id => parseInt(String(id).split('-')[1])),
        4: Array.from(progressData.completedUnits).filter(id => String(id).startsWith('4-')).map(id => parseInt(String(id).split('-')[1]))
      }
    },
    themeProgress: progressData, // 添加 themeProgress 屬性
    courseStats: getProgressStats(), // 添加 courseStats 屬性
    
    // 動作
    completeTheme,
    completeUnit,
    completeQuiz,
    resetProgress,
    updateThemeProgress: (themeId: number, updates: any) => {
      // 簡單的更新函數，適配模板需求
      console.log('updateThemeProgress called:', themeId, updates);
    },
    
    // 查詢
    isThemeCompleted,
    isUnitCompleted,
    isQuizCompleted,
    getThemeProgress,
    getProgressStats,
    isThemeAccessible: (themeId: number) => {
      // 第一個主題總是可訪問，其他需要前一個完成
      if (themeId === 1) return true;
      return isThemeCompleted(themeId - 1);
    }
  };
}; 