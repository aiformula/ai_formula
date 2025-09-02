/**
 * useGeminiProgress
 * Course‑specific progress tracker for the Gemini course (real unit counts)
 */
import { useEffect, useMemo, useState } from 'react';
import { geminiCourseData } from '@/data/gemini-course-data';

type ProgressData = {
  completedThemes: Set<number>;
  completedUnits: Set<string>; // composite key: `${themeId}-${unitId}`
  completedQuizzes: Set<number>; // theme ids
  lastAccessed: string | null;
};

const STORAGE_KEY = 'gemini-course-progress';

export const useGeminiProgress = () => {
  const [progressData, setProgressData] = useState<ProgressData>({
    completedThemes: new Set(),
    completedUnits: new Set(),
    completedQuizzes: new Set(),
    lastAccessed: null
  });

  // derive totals from data
  const totals = useMemo(() => {
    const totalThemes = geminiCourseData.courseModules.length;
    const totalUnits = geminiCourseData.courseModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
    const totalQuizzes = geminiCourseData.courseModules.reduce((acc, m) => acc + (m.quiz ? 1 : 0), 0);
    const unitsPerTheme: Record<number, number> = {};
    geminiCourseData.courseModules.forEach(m => {
      unitsPerTheme[m.id] = m.lessons?.length || 0;
    });
    return { totalThemes, totalUnits, totalQuizzes, unitsPerTheme };
  }, []);

  // load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setProgressData({
        completedThemes: new Set(parsed.completedThemes || []),
        completedUnits: new Set(parsed.completedUnits || []),
        completedQuizzes: new Set(parsed.completedQuizzes || []),
        lastAccessed: parsed.lastAccessed || null
      });
    } catch (e) {
      console.warn('Failed to load Gemini progress:', e);
    }
  }, []);

  const save = (next: ProgressData) => {
    const payload = {
      completedThemes: Array.from(next.completedThemes),
      completedUnits: Array.from(next.completedUnits),
      completedQuizzes: Array.from(next.completedQuizzes),
      lastAccessed: next.lastAccessed
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setProgressData(next);
  };

  // actions
  const completeUnit = (themeId: number | string, unitId: number | string) => {
    const key = `${themeId}-${unitId}`;
    const next: ProgressData = {
      ...progressData,
      completedUnits: new Set([...progressData.completedUnits, key]),
      lastAccessed: new Date().toISOString()
    };
    save(next);
  };

  const completeQuiz = (themeId: number | string) => {
    const t = Number(themeId);
    const next: ProgressData = {
      ...progressData,
      completedQuizzes: new Set([...progressData.completedQuizzes, t]),
      lastAccessed: new Date().toISOString()
    };
    save(next);
  };

  const resetProgress = () => {
    save({ completedThemes: new Set(), completedUnits: new Set(), completedQuizzes: new Set(), lastAccessed: null });
  };

  // queries
  const isThemeCompleted = (themeId: number | string) => progressData.completedThemes.has(Number(themeId));
  const isQuizCompleted = (themeId: number | string) => progressData.completedQuizzes.has(Number(themeId));
  const isUnitCompleted = (themeId: number | string, unitId?: number | string) => {
    // accept either composite or plain key
    if (unitId === undefined) return progressData.completedUnits.has(String(themeId));
    return progressData.completedUnits.has(`${themeId}-${unitId}`);
  };

  const getThemeProgress = (themeId: number | string) => {
    const id = Number(themeId);
    const totalUnitsPerTheme = totals.unitsPerTheme[id] || 0;
    const completed = Array.from(progressData.completedUnits).filter(k => String(k).startsWith(`${id}-`));
    const pct = totalUnitsPerTheme === 0 ? 0 : Math.round((completed.length / totalUnitsPerTheme) * 100);
    return {
      progressPercentage: pct,
      completed: progressData.completedThemes.has(id),
      completedUnits: completed,
      totalUnits: totalUnitsPerTheme
    };
  };

  const getProgressStats = () => {
    const overallProgress = Math.round(
      ((progressData.completedThemes.size + progressData.completedUnits.size + progressData.completedQuizzes.size) /
        (totals.totalThemes + totals.totalUnits + totals.totalQuizzes)) * 100
    );
    return {
      completedThemes: progressData.completedThemes.size,
      totalThemes: totals.totalThemes,
      completedUnits: progressData.completedUnits.size,
      totalUnits: totals.totalUnits,
      completedQuizzes: progressData.completedQuizzes.size,
      totalQuizzes: totals.totalQuizzes,
      overallProgress
    };
  };

  return {
    // state-like fields used by templates
    themeProgress: progressData,
    courseStats: getProgressStats(),
    progressState: {
      completedUnits: Object.fromEntries(
        Object.entries(totals.unitsPerTheme).map(([theme, _]) => [
          Number(theme),
          Array.from(progressData.completedUnits)
            .filter(k => String(k).startsWith(`${theme}-`))
            .map(k => Number(String(k).split('-')[1]))
        ])
      )
    },

    // actions
    completeUnit,
    completeQuiz,
    resetProgress,
    completeTheme: (themeId: number | string) => {
      const t = Number(themeId);
      save({ ...progressData, completedThemes: new Set([...progressData.completedThemes, t]) , lastAccessed: new Date().toISOString() });
    },
    updateThemeProgress: (_themeId: number, _updates: any) => {},

    // queries
    isThemeCompleted,
    isUnitCompleted,
    isQuizCompleted,
    getThemeProgress,
    getProgressStats,
    isThemeAccessible: (themeId: number) => (themeId === 1 ? true : isThemeCompleted(themeId - 1))
  };
};

export default useGeminiProgress;


