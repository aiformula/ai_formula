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
const useLessonCompletion = () => {
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pe_lesson2_completed') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pe_lesson2_completed', JSON.stringify(completed));
    } catch (error) {
      console.error('Failed to save completion state:', error);
    }
  }, [completed]);

  const markAsCompleted = useCallback((itemKey: string) => {
    setCompleted(prev => 
      prev.includes(itemKey) ? prev : [...prev, itemKey]
    );
  }, []);

  const isCompleted = useCallback((itemKey: string) => {
    return completed.includes(itemKey);
  }, [completed]);

  return {
    completed,
    markAsCompleted,
    isCompleted
  };
};

// Hook: 管理課程導航
const useLessonNavigation = (sections: LessonSection[], initialKey: string) => {
  const [selected, setSelected] = useState(initialKey);

  const allItems = useMemo(() => 
    sections.flatMap(s => s.items), 
    [sections]
  );

  const currentSection = useMemo(() =>
    sections.find(s => s.items.some(i => i.key === selected)),
    [sections, selected]
  );

  const currentItem = useMemo(() =>
    currentSection?.items.find(i => i.key === selected),
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

// 主內容組件
const LessonContent: React.FC<LessonContentProps> = memo(({ 
  sections, 
  selectedKey, 
  onSelectItem, 
  isZhTW 
}) => {
  const navigate = useNavigate();
  const lessonCompletion = useLessonCompletion();
  const navigation = useLessonNavigation(sections, selectedKey);

  // 同步 selectedKey 和 navigation.selected
  useEffect(() => {
    if (selectedKey !== navigation.selected) {
      navigation.setSelected(selectedKey);
    }
  }, [selectedKey, navigation]);

  // 導航回調
  const handleNavigateToHome = useCallback(() => {
    navigate('/prompt-engineering/learning');
  }, [navigate]);

  const handleNavigateToLesson = useCallback(() => {
    const firstItem = sections[0]?.items?.[0]?.key;
    if (firstItem) {
      onSelectItem(firstItem);
    }
  }, [sections, onSelectItem]);

  const handlePrevious = useCallback(() => {
    if (navigation.canGoPrevious) {
      const prevKey = navigation.allItems[navigation.currentIndex - 1]?.key;
      if (prevKey) {
        onSelectItem(prevKey);
      }
    }
  }, [navigation, onSelectItem]);

  const handleNext = useCallback(() => {
    if (navigation.canGoNext) {
      const nextKey = navigation.allItems[navigation.currentIndex + 1]?.key;
      if (nextKey) {
        onSelectItem(nextKey);
      }
    }
  }, [navigation, onSelectItem]);

  return (
    <div className="flex-1 px-2 sm:px-4 md:px-0 py-6 sm:py-8 md:py-10 flex flex-col items-center">
      {/* Breadcrumbs + Prev/Next */}
      <BreadcrumbNavigation
        isZhTW={isZhTW}
        currentItem={navigation.currentItem}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToLesson={handleNavigateToLesson}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={navigation.canGoPrevious}
        canGoNext={navigation.canGoNext}
      />
      
      {/* 主內容 */}
      <div className="w-full max-w-5xl mx-auto bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl flex flex-col min-h-[300px]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-blue-300">
          {navigation.currentItem?.title}
        </h1>
        <div className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-10">
          {navigation.currentItem?.content}
        </div>
        
        {/* 完成按鈕 */}
        <div className="mt-auto">
          <CompletionButton
            currentItem={navigation.currentItem}
            isCompleted={lessonCompletion.isCompleted}
            markAsCompleted={lessonCompletion.markAsCompleted}
            isZhTW={isZhTW}
          />
        </div>
      </div>
    </div>
  );
});

LessonContent.displayName = 'LessonContent';

export default React.memo(LessonContent);
export type { LessonContentProps };
export { useLessonCompletion, useLessonNavigation }; 