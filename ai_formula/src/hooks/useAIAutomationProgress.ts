import { useState, useEffect, useCallback, useRef } from 'react';

// 定義課程結構
export interface UnitProgress {
  id: string;
  themeId: number;
  unitId: number;
  completed: boolean;
  completedAt?: string;
  learningTimeSeconds?: number; // 學習時間（秒）- 精確記錄
  timeSpent?: number; // 保留舊字段兼容性（分鐘）
  startTime?: string; // 開始學習時間
  isActive?: boolean; // 是否正在學習中
  activeStartTime?: number; // 當前學習開始時間戳
  totalLearningTime?: number; // 🎯 新增：累計總學習時間（秒）
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

// 🔧 安全的 localStorage 操作工具類
class SafeLocalStorage {
  static isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static getItem(key: string): string | null {
    try {
      return this.isAvailable() ? localStorage.getItem(key) : null;
    } catch (error) {
      console.warn(`localStorage getItem failed for key "${key}":`, error);
      return null;
    }
  }

  static setItem(key: string, value: string): boolean {
    try {
      if (this.isAvailable()) {
        localStorage.setItem(key, value);
        return true;
      }
      return false;
    } catch (error) {
      console.warn(`localStorage setItem failed for key "${key}":`, error);
      return false;
    }
  }

  static removeItem(key: string): boolean {
    try {
      if (this.isAvailable()) {
        localStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (error) {
      console.warn(`localStorage removeItem failed for key "${key}":`, error);
      return false;
    }
  }
}

// 🎯 高精度計時器類 - 使用 Performance API
class HighPrecisionTimer {
  private startTime: number = 0;
  private pausedTime: number = 0;
  private isPaused: boolean = false;
  private isActive: boolean = false;

  start(): void {
    this.startTime = performance.now();
    this.pausedTime = 0;
    this.isPaused = false;
    this.isActive = true;
  }

  pause(): void {
    if (this.isActive && !this.isPaused) {
      this.pausedTime += performance.now() - this.startTime;
      this.isPaused = true;
    }
  }

  resume(): void {
    if (this.isActive && this.isPaused) {
      this.startTime = performance.now();
      this.isPaused = false;
    }
  }

  stop(): number {
    if (!this.isActive) return 0;
    
    let totalTime = this.pausedTime;
    if (!this.isPaused) {
      totalTime += performance.now() - this.startTime;
    }
    
    this.isActive = false;
    this.isPaused = false;
    this.pausedTime = 0;
    
    return Math.floor(totalTime / 1000); // 返回秒數
  }

  getCurrentTime(): number {
    if (!this.isActive) return 0;
    
    let totalTime = this.pausedTime;
    if (!this.isPaused) {
      totalTime += performance.now() - this.startTime;
    }
    
    return Math.floor(totalTime / 1000); // 返回秒數
  }

  isRunning(): boolean {
    return this.isActive && !this.isPaused;
  }
}

/**
 * 🎯 增強版 AI 商業自動化課程進度追蹤 Hook
 * 功能：穩健的學習時間追蹤、頁面可見性處理、錯誤恢復
 */
export const useAIAutomationProgress = () => {
  // 🎯 使用 ref 來避免不必要的重新渲染
  const timerRef = useRef<HighPrecisionTimer>(new HighPrecisionTimer());
  const visibilityAPISupported = useRef(typeof document !== 'undefined' && 'visibilityState' in document);
  
  const [progress, setProgress] = useState<CourseProgress>(() => {
    // 🔧 安全初始化進度數據
    const savedData = SafeLocalStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // 🔧 數據遷移：確保所有單元都有 totalLearningTime 字段
        Object.keys(parsed.units || {}).forEach(unitId => {
          if (!parsed.units[unitId].totalLearningTime) {
            parsed.units[unitId].totalLearningTime = parsed.units[unitId].learningTimeSeconds || 0;
          }
        });
        return parsed;
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
        learningTimeSeconds: 0,
        totalLearningTime: 0, // 🎯 新增累計時間
        timeSpent: 0,
        isActive: false
      };
    });

    return initialProgress;
  });

  // 實時秒數狀態
  const [realTimeSeconds, setRealTimeSeconds] = useState(0);

  // 🎯 頁面可見性監控
  useEffect(() => {
    if (!visibilityAPISupported.current) return;

    const handleVisibilityChange = () => {
      const timer = timerRef.current;
      
      if (document.visibilityState === 'hidden') {
        // 頁面隱藏時暫停計時器
        if (timer.isRunning()) {
          timer.pause();
          console.log('📱 [VISIBILITY] 頁面隱藏，計時器暫停');
        }
      } else if (document.visibilityState === 'visible') {
        // 頁面顯示時恢復計時器
        if (timer.isRunning() || progress.currentActiveUnit) {
          timer.resume();
          console.log('📱 [VISIBILITY] 頁面顯示，計時器恢復');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [progress.currentActiveUnit]);

  // 🎯 實時計時器更新
  useEffect(() => {
    if (!progress.currentActiveUnit) return;

    const interval = setInterval(() => {
      const currentTime = timerRef.current.getCurrentTime();
      setRealTimeSeconds(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [progress.currentActiveUnit]);

  // 🔧 安全保存進度
  const saveProgress = useCallback((newProgress: CourseProgress) => {
    try {
      const success = SafeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      if (success) {
        setProgress(newProgress);
      } else {
        console.warn('⚠️ localStorage 不可用，進度無法保存');
        // 即使無法保存，也更新內存中的狀態
        setProgress(newProgress);
      }
    } catch (error) {
      console.error('保存進度失敗:', error);
      setProgress(newProgress); // 至少更新內存狀態
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
    
    // 計算主題總學習時間（使用累計時間）
    const themeTimeSpent = themeUnits.reduce((total, unit) => {
      return total + Math.ceil((progressData.units[unit.id]?.totalLearningTime || 0) / 60);
    }, 0);
    
    progressData.themes[themeId] = {
      ...progressData.themes[themeId],
      unitsCompleted: completedUnits,
      totalTimeSpent: themeTimeSpent,
      completed: completedUnits === themeUnits.length && progressData.themes[themeId].quizCompleted
    };
  }, []);

  // 🎯 開始學習單元（增強版）
  const startUnitLearning = useCallback((unitId: string) => {
    console.log(`🚀 [TIMER] 開始學習單元: ${unitId}`);
    
    // 啟動高精度計時器
    timerRef.current.start();
    
    const newProgress = { ...progress };
    
    // 停止之前的活動單元
    if (newProgress.currentActiveUnit && newProgress.currentActiveUnit !== unitId) {
      const previousUnit = newProgress.units[newProgress.currentActiveUnit];
      if (previousUnit?.isActive) {
        previousUnit.isActive = false;
        previousUnit.activeStartTime = undefined;
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

  // 🎯 停止學習單元（增強版）
  const stopUnitLearning = useCallback((unitId: string) => {
    console.log(`⏹️ [TIMER] 停止學習單元: ${unitId}`);
    
    // 停止高精度計時器並獲取精確時間
    const sessionTimeSeconds = timerRef.current.stop();
    
    const newProgress = { ...progress };
    const unit = newProgress.units[unitId];
    
    if (unit?.isActive) {
      // 🎯 關鍵修復：累加學習時間而非覆蓋
      const previousTotalTime = unit.totalLearningTime || 0;
      const newTotalTime = previousTotalTime + sessionTimeSeconds;
      
      newProgress.units[unitId] = {
        ...unit,
        isActive: false,
        totalLearningTime: newTotalTime, // 累計總時間
        learningTimeSeconds: sessionTimeSeconds, // 本次學習時間
        timeSpent: Math.ceil(newTotalTime / 60), // 兼容字段（分鐘）
        activeStartTime: undefined
      };
      
      console.log(`📊 [ACCUMULATE] 單元 ${unitId}: 本次 ${sessionTimeSeconds}秒, 累計 ${newTotalTime}秒`);
      
      if (newProgress.currentActiveUnit === unitId) {
        newProgress.currentActiveUnit = undefined;
      }
      
      // 更新主題時間
      const unitData = AI_AUTOMATION_UNITS.find(u => u.id === unitId);
      if (unitData) {
        updateThemeProgress(newProgress, unitData.themeId);
      }
      
      // 更新總時間（使用累計時間）
      newProgress.totalTimeSpent = Object.values(newProgress.units)
        .reduce((total, u) => total + Math.ceil((u.totalLearningTime || 0) / 60), 0);
    }

    newProgress.lastUpdated = new Date().toISOString();
    saveProgress(newProgress);
    setRealTimeSeconds(0);
  }, [progress, saveProgress, updateThemeProgress]);

  // 🎯 標記單元完成（增強版 - 支持累加邏輯）
  const markUnitCompleted = useCallback((unitId: string, sessionLearningTimeSeconds?: number) => {
    const newProgress = { ...progress };
    const unit = newProgress.units[unitId];
    
    if (unit) {
      // 停止計時器並獲取時間
      let actualSessionTime = sessionLearningTimeSeconds || 0;
      if (unit.isActive) {
        actualSessionTime = timerRef.current.stop();
      }

      // 🎯 核心邏輯：累加學習時間
      const previousTotalTime = unit.totalLearningTime || 0;
      const newTotalTime = previousTotalTime + actualSessionTime;

      // 更新單元數據
      newProgress.units[unitId] = {
        ...unit,
        completed: true,
        completedAt: new Date().toISOString(),
        totalLearningTime: newTotalTime, // 🎯 累計總學習時間
        learningTimeSeconds: actualSessionTime, // 本次學習時間
        timeSpent: Math.ceil(newTotalTime / 60), // 兼容性字段
        isActive: false,
        activeStartTime: undefined
      };

      console.log(`✅ [COMPLETE] 單元 ${unitId} 完成 - 本次: ${actualSessionTime}秒, 累計: ${newTotalTime}秒`);

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
        .reduce((total, u) => total + Math.ceil((u.totalLearningTime || 0) / 60), 0);
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

  // 🎯 新增：獲取總學習時間（秒）- 使用累計時間
  const getTotalLearningTimeInSeconds = useCallback((): number => {
    const totalSeconds = Object.values(progress.units)
      .reduce((total, unit) => total + (unit.totalLearningTime || 0), 0);
    
    return totalSeconds;
  }, [progress.units]);

  // 🎯 新增：格式化總學習時間為友好顯示
  const formatTotalLearningTime = useCallback((): string => {
    const totalSeconds = getTotalLearningTimeInSeconds();
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (totalSeconds === 0) return '0秒';
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [getTotalLearningTimeInSeconds]);

  // 獲取當前學習時間（實時）
  const getCurrentLearningTime = useCallback((unitId: string): number => {
    const unit = progress.units[unitId];
    if (!unit) return 0;
    
    const baseTime = Math.ceil((unit.totalLearningTime || 0) / 60); // 使用累計時間
    if (unit.isActive && progress.currentActiveUnit === unitId) {
      return baseTime + Math.floor(realTimeSeconds / 60);
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

  // 🔧 進度修復函數
  const fixProgressCalculation = useCallback(() => {
    const newProgress = { ...progress };
    
    // 重新計算所有主題進度
    [1, 2, 3].forEach(themeId => {
      updateThemeProgress(newProgress, themeId);
    });
    
    // 重新計算總進度
    const recalculatedProgress = calculateTotalProgress(newProgress);
    
    if (newProgress.totalProgress !== recalculatedProgress) {
      console.log('⚠️ 發現進度不一致，正在修復...');
      newProgress.totalProgress = recalculatedProgress;
      newProgress.lastUpdated = new Date().toISOString();
      saveProgress(newProgress);
      return true;
    }
    
    return false;
  }, [progress, updateThemeProgress, calculateTotalProgress, saveProgress]);

  // 🔧 重置進度
  const resetProgress = useCallback(() => {
    SafeLocalStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }, []);

  // 🎯 獲取統計數據（自動同步版本）
  const getProgressStats = useCallback(() => {
    const completedUnits = Object.values(progress.units).filter(unit => unit.completed).length;
    const completedQuizzes = Object.values(progress.themes).filter(theme => theme.quizCompleted).length;
    const expectedProgress = Math.round((completedUnits + completedQuizzes) / (AI_AUTOMATION_UNITS.length + 3) * 100);
    
    // 自動同步進度
    if (progress.totalProgress !== expectedProgress) {
      const newProgress = { ...progress };
      newProgress.totalProgress = expectedProgress;
      newProgress.lastUpdated = new Date().toISOString();
      
      SafeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    }
    
    return {
      totalProgress: expectedProgress,
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
    // 🎯 增強的計時功能
    startUnitLearning,
    stopUnitLearning,
    getCurrentLearningTime,
    getRealTimeSeconds,
    formatLearningTime,
    realTimeSeconds,
    fixProgressCalculation,
    // 🎯 新增的總時間功能
    getTotalLearningTimeInSeconds,
    formatTotalLearningTime,
    // 🔧 調試信息
    getDetailedDebugInfo: useCallback(() => ({
      isLocalStorageAvailable: SafeLocalStorage.isAvailable(),
      visibilityAPISupported: visibilityAPISupported.current,
      currentTimerState: {
        isRunning: timerRef.current.isRunning(),
        currentTime: timerRef.current.getCurrentTime()
      }
    }), [])
  };
}; 