import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// TypeScript 接口定義
interface LessonItem {
  key: string;
  title: string;
  icon: string;
  duration: string;
  description: string;
  type: 'reading' | 'quiz';
  content: React.ReactNode;
}

interface LessonSection {
  group: string;
  groupIcon: string;
  items: LessonItem[];
}

interface LessonContentProps {
  sections: LessonSection[];
  selectedKey: string;
  onSelectItem: (key: string) => void;
  isZhTW: boolean;
}

// Hook: 管理課程完成狀態
const useLessonCompletion = (lessonId: string = 'lesson2', sections: LessonSection[] = []) => {
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(`pe_${lessonId}_completed`) || '[]');
    } catch {
      return [];
    }
  });

  // 監聽localStorage變化，實現實時同步
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `pe_${lessonId}_completed` && e.newValue) {
        try {
          setCompleted(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Failed to parse completion state:', error);
        }
      }
    };

    // 監聽localStorage變化
    window.addEventListener('storage', handleStorageChange);
    
    // 定期檢查localStorage變化（用於同一頁面內的同步）
    const interval = setInterval(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(`pe_${lessonId}_completed`) || '[]');
        if (JSON.stringify(stored) !== JSON.stringify(completed)) {
          setCompleted(stored);
        }
      } catch (error) {
        console.error('Failed to sync completion state:', error);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [lessonId, completed]);

  useEffect(() => {
    try {
      localStorage.setItem(`pe_${lessonId}_completed`, JSON.stringify(completed));
      // 觸發課程進度更新
      const globalProgressEvent = new CustomEvent('courseProgressUpdate', {
        detail: { lessonId, completed }
      });
      window.dispatchEvent(globalProgressEvent);
    } catch (error) {
      console.error('Failed to save completion state:', error);
    }
  }, [completed, lessonId]);

  const markAsCompleted = useCallback((itemKey: string) => {
    setCompleted(prev => {
      if (prev.includes(itemKey)) return prev;
      const newCompleted = [...prev, itemKey];
      
      // 立即更新localStorage
      try {
        localStorage.setItem(`pe_${lessonId}_completed`, JSON.stringify(newCompleted));
      } catch (error) {
        console.error('Failed to save completion state:', error);
      }
      
      return newCompleted;
    });
  }, [lessonId]);

  const isCompleted = useCallback((itemKey: string) => {
    return completed.includes(itemKey);
  }, [completed]);

  const progress = useMemo(() => {
    if (!sections || sections.length === 0) return { completedCount: 0, totalCount: 0, percentage: 0 };
    
    const allItems = sections.flatMap(s => s.items || []);
    const completedCount = allItems.filter(item => completed.includes(item.key)).length;
    const totalCount = allItems.length;
    
    return {
      completedCount,
      totalCount,
      percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
    };
  }, [sections, completed]);

  return {
    completed,
    markAsCompleted,
    isCompleted,
    progress
  };
};

// 新增輔助函數：檢查課程項目是否完成
const isLessonItemCompleted = (lessonId: string, itemKey: string): boolean => {
  try {
    const completed = JSON.parse(localStorage.getItem(`pe_${lessonId}_completed`) || '[]');
    return completed.includes(itemKey);
  } catch {
    return false;
  }
};

// 新增輔助函數：標記課程項目為完成
const markLessonItemCompleted = (lessonId: string, itemKey: string): void => {
  try {
    const completed = JSON.parse(localStorage.getItem(`pe_${lessonId}_completed`) || '[]');
    if (!completed.includes(itemKey)) {
      const newCompleted = [...completed, itemKey];
      localStorage.setItem(`pe_${lessonId}_completed`, JSON.stringify(newCompleted));
      
      // 觸發全局進度更新事件
      const globalProgressEvent = new CustomEvent('courseProgressUpdate', {
        detail: { lessonId, completed: newCompleted }
      });
      window.dispatchEvent(globalProgressEvent);
    }
  } catch (error) {
    console.error('Failed to mark item as completed:', error);
  }
};

// 新增輔助函數：獲取課程完成進度
const getLessonProgress = (lessonId: string, totalItems: number): number => {
  try {
    const completed = JSON.parse(localStorage.getItem(`pe_${lessonId}_completed`) || '[]');
    return totalItems > 0 ? Math.round((completed.length / totalItems) * 100) : 0;
  } catch {
    return 0;
  }
};

// Hook: 管理課程導航
const useLessonNavigation = (sections: LessonSection[], initialKey: string) => {
  const [selected, setSelected] = useState(initialKey);

  const allItems = useMemo(() => {
    if (!sections || sections.length === 0) return [];
    return sections.flatMap(s => s.items || []);
  }, [sections]);

  const currentSection = useMemo(() =>
    sections?.find(s => s.items?.some(i => i.key === selected)),
    [sections, selected]
  );

  const currentItem = useMemo(() =>
    currentSection?.items?.find(i => i.key === selected),
    [currentSection, selected]
  );

  const currentIndex = useMemo(() =>
    allItems.findIndex(i => i.key === selected),
    [allItems, selected]
  );

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < allItems.length - 1;

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setSelected(allItems[currentIndex - 1].key);
    }
  }, [canGoPrevious, allItems, currentIndex]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setSelected(allItems[currentIndex + 1].key);
    }
  }, [canGoNext, allItems, currentIndex]);

  return {
    selected,
    setSelected,
    currentSection,
    currentItem,
    currentIndex,
    allItems,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext
  };
};

// 麵包屑導航組件
const BreadcrumbNavigation: React.FC<{
  isZhTW: boolean;
  currentItem: LessonItem | undefined;
  onNavigateToHome: () => void;
  onNavigateToLesson: () => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}> = memo(({ 
  isZhTW, 
  currentItem, 
  onNavigateToHome, 
  onNavigateToLesson,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex items-center justify-between mb-4 px-4 md:px-0">
      <nav className="flex items-center text-sm text-blue-500 space-x-2">
        <span className="hover:underline cursor-pointer" onClick={onNavigateToHome}>
          {isZhTW ? '提示工程精通' : 'Prompt Engineering Mastery'}
        </span>
        <span>&gt;</span>
        <span className="hover:underline cursor-pointer" onClick={onNavigateToLesson}>
          {isZhTW ? '課堂 2' : 'Lesson 2'}
        </span>
        <span>&gt;</span>
        <span className="font-semibold text-blue-700">{currentItem?.title}</span>
      </nav>
      <div className="flex items-center space-x-4">
        <button
          className={`text-blue-500 hover:underline text-sm disabled:text-gray-500 disabled:cursor-not-allowed`}
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          &lt; {isZhTW ? '上一個' : 'Previous'}
        </button>
        <button
          className={`text-blue-500 hover:underline text-sm disabled:text-gray-500 disabled:cursor-not-allowed`}
          onClick={onNext}
          disabled={!canGoNext}
        >
          {isZhTW ? '下一個' : 'Next'} &gt;
        </button>
      </div>
    </div>
  );
});

BreadcrumbNavigation.displayName = 'BreadcrumbNavigation';

// 完成按鈕組件
const CompletionButton: React.FC<{
  currentItem: LessonItem | undefined;
  isCompleted: (key: string) => boolean;
  markAsCompleted: (key: string) => void;
  isZhTW: boolean;
}> = memo(({ currentItem, isCompleted, markAsCompleted, isZhTW }) => {
  const handleClick = useCallback(() => {
    if (currentItem) {
      if (currentItem.key === 'quiz') {
        // Quiz completion logic
        const isZhQuiz = isZhTW;
        const scoreKey = isZhQuiz ? 'pe_lesson2_quiz_score_zh' : 'pe_lesson2_quiz_score_en';
        const scoreRaw = localStorage.getItem(scoreKey);
        const score = scoreRaw ? Number(scoreRaw) : null;
        const percent = score !== null ? Math.round((score / 5) * 100) : null;
        const passed = percent !== null && percent >= 70;
        const completedQuiz = isCompleted('quiz');
        
        if (!completedQuiz && passed) {
          markAsCompleted('quiz');
        }
      } else {
        // Regular lesson completion
        if (!isCompleted(currentItem.key)) {
          markAsCompleted(currentItem.key);
        }
      }
    }
  }, [currentItem, isCompleted, markAsCompleted, isZhTW]);

  if (!currentItem) return null;

  if (currentItem.key === 'quiz') {
    const isZhQuiz = isZhTW;
    const scoreKey = isZhQuiz ? 'pe_lesson2_quiz_score_zh' : 'pe_lesson2_quiz_score_en';
    const scoreRaw = localStorage.getItem(scoreKey);
    const score = scoreRaw ? Number(scoreRaw) : null;
    const percent = score !== null ? Math.round((score / 5) * 100) : null;
    const passed = percent !== null && percent >= 70;
    const completedQuiz = isCompleted('quiz');

    return (
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-lg mb-8"
        onClick={handleClick}
        disabled={completedQuiz || !passed}
      >
        {(completedQuiz && passed)
          ? (isZhTW ? '已完成' : 'Completed')
          : (isZhTW ? '標記為已完成' : 'Mark as completed')}
      </Button>
    );
  }

  return (
    <Button
      className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-lg mb-8"
      onClick={handleClick}
      disabled={isCompleted(currentItem.key)}
    >
      {isCompleted(currentItem.key)
        ? (isZhTW ? '已完成' : 'Completed')
        : (isZhTW ? '標記為已完成' : 'Mark as completed')}
    </Button>
  );
});

CompletionButton.displayName = 'CompletionButton';

// 導出的LessonContent組件
const LessonContent: React.FC<{
  currentContent: React.ReactNode | null;
  showQuiz: boolean;
  quizComponent: React.ReactNode;
  onComplete: () => void;
}> = ({ currentContent, showQuiz, quizComponent, onComplete }) => {
  return (
    <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl p-8">
      <div className="prose prose-invert max-w-none">
        {showQuiz ? (
          <div>{quizComponent}</div>
        ) : (
          <div>{currentContent}</div>
        )}
      </div>
      
      {!showQuiz && (
        <div className="mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={onComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            標記為已完成
          </button>
        </div>
      )}
    </div>
  );
};

export { useLessonCompletion, useLessonNavigation };
export default LessonContent; 