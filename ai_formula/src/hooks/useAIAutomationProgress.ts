import { useState, useEffect, useCallback } from 'react';

// 定義課程結構
export interface UnitProgress {
  id: string;
  themeId: number;
  unitId: number;
  completed: boolean;
  completedAt?: string;
  timeSpent?: number; // 學習時間（分鐘）
  startTime?: string; // 開始學習時間
  isActive?: boolean; // 是否正在學習中
  activeStartTime?: number; // 當前學習開始時間戳
}

export interface ThemeProgress {
  id: number;
  completed: boolean;
  unitsCompleted: number;
  totalUnits: number;
  quizCompleted: boolean;
  quizScore?: number;
  totalTimeSpent?: number; // 主題總學習時間
}

export interface CourseProgress {
  courseId: string;
  totalProgress: number; // 總體進度百分比
  units: Record<string, UnitProgress>;
  themes: Record<number, ThemeProgress>;
  lastUpdated: string;
  totalTimeSpent?: number; // 課程總學習時間（分鐘）
  currentActiveUnit?: string; // 當前正在學習的單元
}

// AI 商業自動化課程的所有單元定義
const AI_AUTOMATION_UNITS = [
  // 主題 1
  { id: 't1-u1', themeId: 1, unitId: 1 },
  { id: 't1-u2', themeId: 1, unitId: 2 },
  { id: 't1-u3', themeId: 1, unitId: 3 },
  // 主題 2
  { id: 't2-u4', themeId: 2, unitId: 4 },
  { id: 't2-u5', themeId: 2, unitId: 5 },
  { id: 't2-u6', themeId: 2, unitId: 6 },
  // 主題 3
  { id: 't3-u7', themeId: 3, unitId: 7 },
  { id: 't3-u8', themeId: 3, unitId: 8 },
  { id: 't3-u9', themeId: 3, unitId: 9 }
];

const STORAGE_KEY = 'progress_ai_automation';
const COURSE_ID = 'ai-business-automation';

/**
 * AI 商業自動化課程專用進度追蹤 Hook
 */
export const useAIAutomationProgress = () => {
  const [progress, setProgress] = useState<CourseProgress>(() => {
    // 初始化進度數據
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    
    if (savedProgress) {
      try {
        return JSON.parse(savedProgress);
      } catch (error) {
        console.error('解析進度數據失敗:', error);
      }
    }

    // 創建默認進度數據
    const initialProgress: CourseProgress = {
      courseId: COURSE_ID,
      totalProgress: 0,
      units: {},
      themes: {
        1: { id: 1, completed: false, unitsCompleted: 0, totalUnits: 3, quizCompleted: false, totalTimeSpent: 0 },
        2: { id: 2, completed: false, unitsCompleted: 0, totalUnits: 3, quizCompleted: false, totalTimeSpent: 0 },
        3: { id: 3, completed: false, unitsCompleted: 0, totalUnits: 3, quizCompleted: false, totalTimeSpent: 0 }
      },
      lastUpdated: new Date().toISOString(),
      totalTimeSpent: 0
    };

    // 初始化所有單元
    AI_AUTOMATION_UNITS.forEach(unit => {
      initialProgress.units[unit.id] = {
        id: unit.id,
        themeId: unit.themeId,
        unitId: unit.unitId,
        completed: false,
        timeSpent: 0,
        isActive: false
      };
    });

    return initialProgress;
  });

  // 實時時間追蹤狀態
  const [realTimeSeconds, setRealTimeSeconds] = useState(0);

  // 實時時間更新效果
  useEffect(() => {
    const activeUnit = progress.currentActiveUnit;
    if (!activeUnit || !progress.units[activeUnit]?.isActive) {
      return;
    }

    const interval = setInterval(() => {
      setRealTimeSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [progress.currentActiveUnit, progress.units]);

  // 保存進度到 localStorage
  const saveProgress = useCallback((newProgress: CourseProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('保存進度失敗:', error);
    }
  }, []);

  // 計算總體進度
  const calculateTotalProgress = useCallback((progressData: CourseProgress): number => {
    const totalUnits = AI_AUTOMATION_UNITS.length;
    const totalQuizzes = 3;
    const totalItems = totalUnits + totalQuizzes;

    let completedItems = 0;

    // 計算完成的單元數
    Object.values(progressData.units).forEach(unit => {
      if (unit.completed) completedItems++;
    });

    // 計算完成的測驗數
    Object.values(progressData.themes).forEach(theme => {
      if (theme.quizCompleted) completedItems++;
    });

    return Math.round((completedItems / totalItems) * 100);
  }, []);

  // 更新主題進度
  const updateThemeProgress = useCallback((progressData: CourseProgress, themeId: number) => {
    const themeUnits = AI_AUTOMATION_UNITS.filter(unit => unit.themeId === themeId);
    const completedUnits = themeUnits.filter(unit => progressData.units[unit.id]?.completed).length;
    
    // 計算主題總學習時間
    const themeTimeSpent = themeUnits.reduce((total, unit) => {
      return total + (progressData.units[unit.id]?.timeSpent || 0);
    }, 0);
    
    progressData.themes[themeId] = {
      ...progressData.themes[themeId],
      unitsCompleted: completedUnits,
      totalTimeSpent: themeTimeSpent,
      completed: completedUnits === themeUnits.length && progressData.themes[themeId].quizCompleted
    };
  }, []);

  // 開始學習單元（開始計時）
  const startUnitLearning = useCallback((unitId: string) => {
    const newProgress = { ...progress };
    
    // 停止之前的活動單元
    if (newProgress.currentActiveUnit && newProgress.currentActiveUnit !== unitId) {
      const previousUnit = newProgress.units[newProgress.currentActiveUnit];
      if (previousUnit?.isActive && previousUnit.activeStartTime) {
        const timeSpent = Math.floor((Date.now() - previousUnit.activeStartTime) / 1000 / 60); // 轉換為分鐘
        newProgress.units[newProgress.currentActiveUnit] = {
          ...previousUnit,
          isActive: false,
          timeSpent: (previousUnit.timeSpent || 0) + timeSpent,
          activeStartTime: undefined
        };
      }
    }
    
    // 開始新的學習會話
    if (newProgress.units[unitId]) {
      newProgress.units[unitId] = {
        ...newProgress.units[unitId],
        isActive: true,
        activeStartTime: Date.now(),
        startTime: newProgress.units[unitId].startTime || new Date().toISOString()
      };
      newProgress.currentActiveUnit = unitId;
      setRealTimeSeconds(0);
    }

    newProgress.lastUpdated = new Date().toISOString();
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  // 停止學習單元（停止計時）
  const stopUnitLearning = useCallback((unitId: string) => {
    const newProgress = { ...progress };
    const unit = newProgress.units[unitId];
    
    if (unit?.isActive && unit.activeStartTime) {
      const sessionTime = Math.floor((Date.now() - unit.activeStartTime) / 1000 / 60); // 轉換為分鐘
      newProgress.units[unitId] = {
        ...unit,
        isActive: false,
        timeSpent: (unit.timeSpent || 0) + sessionTime,
        activeStartTime: undefined
      };
      
      if (newProgress.currentActiveUnit === unitId) {
        newProgress.currentActiveUnit = undefined;
      }
      
      // 更新主題時間
      const unitData = AI_AUTOMATION_UNITS.find(u => u.id === unitId);
      if (unitData) {
        updateThemeProgress(newProgress, unitData.themeId);
      }
      
      // 更新總時間
      newProgress.totalTimeSpent = Object.values(newProgress.units)
        .reduce((total, u) => total + (u.timeSpent || 0), 0);
    }

    newProgress.lastUpdated = new Date().toISOString();
    saveProgress(newProgress);
    setRealTimeSeconds(0);
  }, [progress, saveProgress, updateThemeProgress]);

  // 標記單元為完成
  const markUnitCompleted = useCallback((unitId: string, timeSpent?: number) => {
    const newProgress = { ...progress };
    const unit = newProgress.units[unitId];
    
    if (unit) {
      // 如果單元正在學習中，先停止計時
      let finalTimeSpent = timeSpent || unit.timeSpent || 0;
      if (unit.isActive && unit.activeStartTime) {
        const sessionTime = Math.floor((Date.now() - unit.activeStartTime) / 1000 / 60);
        finalTimeSpent = (unit.timeSpent || 0) + sessionTime;
      }

      newProgress.units[unitId] = {
        ...unit,
        completed: true,
        completedAt: new Date().toISOString(),
        timeSpent: finalTimeSpent,
        isActive: false,
        activeStartTime: undefined
      };

      // 停止當前活動
      if (newProgress.currentActiveUnit === unitId) {
        newProgress.currentActiveUnit = undefined;
        setRealTimeSeconds(0);
      }

      // 更新對應主題的進度
      const unitData = AI_AUTOMATION_UNITS.find(u => u.id === unitId);
      if (unitData) {
        updateThemeProgress(newProgress, unitData.themeId);
      }

      // 計算總體進度和總時間
      newProgress.totalProgress = calculateTotalProgress(newProgress);
      newProgress.totalTimeSpent = Object.values(newProgress.units)
        .reduce((total, u) => total + (u.timeSpent || 0), 0);
      newProgress.lastUpdated = new Date().toISOString();

      saveProgress(newProgress);
    }
  }, [progress, saveProgress, calculateTotalProgress, updateThemeProgress]);

  // 標記測驗為完成
  const markQuizCompleted = useCallback((themeId: number, score: number) => {
    const newProgress = { ...progress };
    
    newProgress.themes[themeId] = {
      ...newProgress.themes[themeId],
      quizCompleted: true,
      quizScore: score
    };

    // 更新主題完成狀態
    updateThemeProgress(newProgress, themeId);

    // 計算總體進度
    newProgress.totalProgress = calculateTotalProgress(newProgress);
    newProgress.lastUpdated = new Date().toISOString();

    saveProgress(newProgress);
  }, [progress, saveProgress, calculateTotalProgress, updateThemeProgress]);

  // 獲取當前學習時間（實時）
  const getCurrentLearningTime = useCallback((unitId: string): number => {
    const unit = progress.units[unitId];
    if (!unit) return 0;
    
    const baseTime = unit.timeSpent || 0;
    if (unit.isActive && progress.currentActiveUnit === unitId) {
      return baseTime + Math.floor(realTimeSeconds / 60); // 轉換為分鐘
    }
    return baseTime;
  }, [progress, realTimeSeconds]);

  // 獲取實時秒數顯示
  const getRealTimeSeconds = useCallback((unitId: string): number => {
    if (progress.currentActiveUnit === unitId && progress.units[unitId]?.isActive) {
      return realTimeSeconds % 60;
    }
    return 0;
  }, [progress.currentActiveUnit, realTimeSeconds]);

  // 格式化時間顯示
  const formatLearningTime = useCallback((minutes: number, seconds?: number): string => {
    if (minutes === 0 && (!seconds || seconds === 0)) return '0分鐘';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    let result = '';
    if (hours > 0) result += `${hours}小時`;
    if (mins > 0) result += `${mins}分鐘`;
    if (seconds !== undefined && seconds > 0) result += `${seconds}秒`;
    
    return result || '0分鐘';
  }, []);

  // 檢查單元是否完成
  const isUnitCompleted = useCallback((unitId: string): boolean => {
    return progress.units[unitId]?.completed || false;
  }, [progress]);

  // 檢查主題是否完成
  const isThemeCompleted = useCallback((themeId: number): boolean => {
    return progress.themes[themeId]?.completed || false;
  }, [progress]);

  // 獲取主題進度
  const getThemeProgress = useCallback((themeId: number) => {
    return progress.themes[themeId] || {
      id: themeId,
      completed: false,
      unitsCompleted: 0,
      totalUnits: 3,
      quizCompleted: false,
      totalTimeSpent: 0
    };
  }, [progress]);

  // 重置進度（用於測試或重新開始）
  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }, []);

  // 導出統計數據
  const getProgressStats = useCallback(() => {
    const completedUnits = Object.values(progress.units).filter(unit => unit.completed).length;
    const completedQuizzes = Object.values(progress.themes).filter(theme => theme.quizCompleted).length;
    
    return {
      totalProgress: progress.totalProgress,
      completedUnits,
      totalUnits: AI_AUTOMATION_UNITS.length,
      completedQuizzes,
      totalQuizzes: 3,
      completedThemes: Object.values(progress.themes).filter(theme => theme.completed).length,
      totalThemes: 3,
      totalTimeSpent: progress.totalTimeSpent || 0,
      currentActiveUnit: progress.currentActiveUnit
    };
  }, [progress]);

  return {
    progress,
    markUnitCompleted,
    markQuizCompleted,
    isUnitCompleted,
    isThemeCompleted,
    getThemeProgress,
    getProgressStats,
    resetProgress,
    courseUnits: AI_AUTOMATION_UNITS,
    // 新增的實時計時功能
    startUnitLearning,
    stopUnitLearning,
    getCurrentLearningTime,
    getRealTimeSeconds,
    formatLearningTime,
    realTimeSeconds
  };
}; 