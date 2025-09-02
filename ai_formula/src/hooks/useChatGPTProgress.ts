/**
 * ChatGPT Course Progress Tracking Hook
 * @fileoverview ChatGPT 課程進度追蹤功能
 * @author AI Formula Team
 * @version 1.0.0
 */

import { useState, useCallback, useEffect } from 'react';

// 進度數據類型定義
export interface ThemeProgress {
  themeId: number;
  completed: boolean;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
  completedUnits: number[];
  quizScore?: number;
  timeSpent: number; // 分鐘
}

export interface CourseProgressStats {
  totalProgress: number;
  completedThemes: number;
  totalThemes: number;
  totalTimeSpent: number;
  lastActivity: string;
  currentTheme: number;
  achievements: string[];
}

// localStorage 鍵值
const CHATGPT_PROGRESS_KEY = 'chatgpt_course_progress';
const CHATGPT_STATS_KEY = 'chatgpt_course_stats';

// 預設課程結構
const COURSE_STRUCTURE = {
  totalThemes: 6,
  themes: [
    { id: 1, totalLessons: 5, totalUnits: 5 }, // AI 革命的開端 — 重新認識 ChatGPT (1.1-1.5)
    { id: 2, totalLessons: 5, totalUnits: 5 }, // 初探門徑 — 帳戶設定與介面導覽 (2.1-2.5)
    { id: 3, totalLessons: 6, totalUnits: 6 }, // 指令的藝術 (Prompt Engineering) (3.1-3.6)
    { id: 4, totalLessons: 5, totalUnits: 5 }, // 精通之道 — 高級提示工程 (Prompt Engineering) (4.1-4.5)
    { id: 5, totalLessons: 5, totalUnits: 5 }, // 打造專屬 AI — 個人化與 GPT 商店 (5.1-5.5)
    { id: 6, totalLessons: 5, totalUnits: 5 }  // 展望未來 — 應用、倫理與挑戰 (6.1-6.5)
  ]
};

export const useChatGPTProgress = () => {
  const [themeProgress, setThemeProgress] = useState<Record<number, ThemeProgress>>({});
  const [courseStats, setCourseStats] = useState<CourseProgressStats>({
    totalProgress: 0,
    completedThemes: 0,
    totalThemes: COURSE_STRUCTURE.totalThemes,
    totalTimeSpent: 0,
    lastActivity: '',
    currentTheme: 1,
    achievements: []
  });

  // 載入進度數據
  useEffect(() => {
    const savedProgress = localStorage.getItem(CHATGPT_PROGRESS_KEY);
    const savedStats = localStorage.getItem(CHATGPT_STATS_KEY);
    
    if (savedProgress) {
      try {
        setThemeProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Failed to load course progress:', error);
      }
    }
    
    if (savedStats) {
      try {
        setCourseStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Failed to load course stats:', error);
      }
    }
  }, []);

  // 保存進度數據
  const saveProgress = useCallback((progress: Record<number, ThemeProgress>, stats: CourseProgressStats) => {
    try {
      localStorage.setItem(CHATGPT_PROGRESS_KEY, JSON.stringify(progress));
      localStorage.setItem(CHATGPT_STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, []);

  // 更新主題進度
  const updateThemeProgress = useCallback((themeId: number, updates: Partial<ThemeProgress>) => {
    const currentTime = new Date().toISOString();
    const themeInfo = COURSE_STRUCTURE.themes.find(t => t.id === themeId);
    
    if (!themeInfo) return;

    setThemeProgress(prev => {
      const current = prev[themeId] || {
        themeId,
        completed: false,
        completedLessons: 0,
        totalLessons: themeInfo.totalLessons,
        lastAccessed: currentTime,
        completedUnits: [],
        timeSpent: 0
      };

      const updated = {
        ...current,
        ...updates,
        lastAccessed: currentTime
      };

      const newProgress = { ...prev, [themeId]: updated };
      
      // 更新總體統計
      const completedThemes = Object.values(newProgress).filter(t => t.completed).length;
      const totalProgress = Math.round((completedThemes / COURSE_STRUCTURE.totalThemes) * 100);
      const totalTimeSpent = Object.values(newProgress).reduce((total, t) => total + t.timeSpent, 0);
      
      const newStats: CourseProgressStats = {
        ...courseStats,
        totalProgress,
        completedThemes,
        totalTimeSpent,
        lastActivity: currentTime,
        currentTheme: themeId
      };

      setCourseStats(newStats);
      saveProgress(newProgress, newStats);
      
      return newProgress;
    });
  }, [courseStats, saveProgress]);

  // 完成單元
  const completeUnit = useCallback((themeId: number, unitId: number, timeSpent: number = 10) => {
    const themeInfo = COURSE_STRUCTURE.themes.find(t => t.id === themeId);
    if (!themeInfo) return;

    const current = themeProgress[themeId];
    const completedUnits = current ? [...current.completedUnits] : [];
    
    if (!completedUnits.includes(unitId)) {
      completedUnits.push(unitId);
    }

    const completedLessons = Math.min(Math.ceil(completedUnits.length / 2), themeInfo.totalLessons);
    const isCompleted = completedUnits.length >= themeInfo.totalUnits;

    updateThemeProgress(themeId, {
      completedUnits,
      completedLessons,
      completed: isCompleted,
      timeSpent: (current?.timeSpent || 0) + timeSpent
    });

    console.log(`✅ 完成單元 ${themeId}-${unitId}, 主題進度: ${completedUnits.length}/${themeInfo.totalUnits}`);
  }, [themeProgress, updateThemeProgress]);

  // 完成測驗
  const completeQuiz = useCallback((themeId: number, score: number, timeSpent: number = 15) => {
    updateThemeProgress(themeId, {
      quizScore: score,
      timeSpent: (themeProgress[themeId]?.timeSpent || 0) + timeSpent
    });

    if (score >= 80) {
      const current = themeProgress[themeId];
      if (current && current.completedUnits.length > 0) {
        updateThemeProgress(themeId, { completed: true });
      }
    }

    console.log(`✅ 完成測驗 ${themeId}, 分數: ${score}`);
  }, [themeProgress, updateThemeProgress]);

  // 獲取主題進度
  const getThemeProgress = useCallback((themeId: number): ThemeProgress | null => {
    return themeProgress[themeId] || null;
  }, [themeProgress]);

  // 檢查主題是否完成
  const isThemeCompleted = useCallback((themeId: number): boolean => {
    const progress = themeProgress[themeId];
    return progress ? progress.completed : false;
  }, [themeProgress]);

  // 檢查主題是否可訪問
  const isThemeAccessible = useCallback((themeId: number): boolean => {
    if (themeId === 1) return true;
    return isThemeCompleted(themeId - 1);
  }, [isThemeCompleted]);

  // 獲取進度統計
  const getProgressStats = useCallback((): CourseProgressStats => {
    return courseStats;
  }, [courseStats]);

  // 重置進度（開發用）
  const resetProgress = useCallback(() => {
    localStorage.removeItem(CHATGPT_PROGRESS_KEY);
    localStorage.removeItem(CHATGPT_STATS_KEY);
    setThemeProgress({});
    setCourseStats({
      totalProgress: 0,
      completedThemes: 0,
      totalThemes: COURSE_STRUCTURE.totalThemes,
      totalTimeSpent: 0,
      lastActivity: '',
      currentTheme: 1,
      achievements: []
    });
  }, []);

  return {
    // 數據
    themeProgress,
    courseStats,
    
    // 操作函數
    updateThemeProgress,
    completeUnit,
    completeQuiz,
    
    // 查詢函數
    getThemeProgress,
    isThemeCompleted,
    isThemeAccessible,
    getProgressStats,
    
    // 工具函數
    resetProgress
  };
};

export default useChatGPTProgress; 