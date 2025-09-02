/**
 * useClaudeProgress
 * Simple progress tracker for the Claude course (6 themes)
 */
import { usePromptEngineeringProgress } from './usePromptEngineeringProgress';

// Reuse the generic prompt engineering progress hook structure for simplicity
export const useClaudeProgress = () => {
  // The reused hook already provides template-compatible API
  const base = usePromptEngineeringProgress();

  // Patch counts to reflect 6 themes instead of 4
  const getThemeProgress = (themeId: number) => {
    return base.getThemeProgress(themeId);
  };

  const getProgressStats = () => {
    const stats = base.getProgressStats();
    return {
      ...stats,
      totalThemes: 6
    };
  };

  return {
    ...base,
    getThemeProgress,
    getProgressStats
  };
};

export default useClaudeProgress;


