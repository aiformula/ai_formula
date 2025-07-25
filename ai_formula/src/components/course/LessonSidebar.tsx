import React, { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, CheckCircle } from 'lucide-react';

// TypeScript ?�口定義
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

interface LessonSidebarProps {
  sections: LessonSection[];
  selectedKey: string;
  onSelectItem: (key: string) => void;
  isZhTW: boolean;
  isCompleted: (key: string) => boolean;
}

// Hook: 管�??��?式側?��?
const useResponsiveSidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDrawerOpen(true);
      } else {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // ?��??�檢??
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return {
    drawerOpen,
    toggleDrawer,
    closeDrawer,
    isMobile: window.innerWidth < 768
  };
};

// ?��?欄�??��?�?
const SidebarNavigation: React.FC<LessonSidebarProps> = memo(({ 
  sections, 
  selectedKey, 
  onSelectItem, 
  isZhTW,
  isCompleted 
}) => {
  const handleItemClick = useCallback((key: string) => {
    onSelectItem(key);
  }, [onSelectItem]);

  return (
    <>
      {/* ?�單icon+主目?��?�?*/}
      <div className="flex items-center gap-3 mb-6">
        <Menu className="w-7 h-7 ai-text-primary" />
        <span className="text-lg font-bold ai-text-primary tracking-wide">
          {isZhTW ? '主目錄' : 'Main'}
        </span>
      </div>
      
      {sections.map((section: LessonSection) => (
        <div key={section.group} className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-gray-300 text-lg font-bold tracking-wide">
            <span className="text-2xl">{section.groupIcon}</span>
            <span>{section.group}</span>
          </div>
          <div className="flex flex-col gap-1">
            {section.items.map((item: LessonItem) => (
              <button
                key={item.key}
                className={`group flex flex-col items-start w-full px-3 py-2 rounded-lg text-left font-medium transition-all duration-200 relative overflow-hidden
                  ${selectedKey === item.key
                    ? 'ai-bg-dark-medium ai-text-info border-l-8 border-blue-500 shadow-[0_0_12px_2px_var(--ai-formula-info)] ring-2 ring-blue-400 ring-opacity-60 z-10'
                    : 'bg-gray-900 text-gray-200 hover:bg-gray-800 hover:text-blue-200 border-l-4 border-transparent'}
                `}
                onClick={() => handleItemClick(item.key)}
              >
                <div className="flex items-center w-full">
                  <span className="mr-3 text-xl">
                    {/* Only show CheckCircle for quiz if completed and passed */}
                    {item.key === 'quiz'
                      ? (() => {
                          const isZhQuiz = isZhTW;
                          const scoreKey = isZhQuiz ? 'pe_lesson2_quiz_score_zh' : 'pe_lesson2_quiz_score_en';
                          const scoreRaw = localStorage.getItem(scoreKey);
                          const score = scoreRaw ? Number(scoreRaw) : null;
                          const percent = score !== null ? Math.round((score / 5) * 100) : null;
                          const passed = percent !== null && percent >= 70;
                          return (isCompleted('quiz') && passed)
                            ? <CheckCircle className="w-7 h-7 text-green-400" />
                            : item.icon;
                        })()
                      : (isCompleted(item.key)
                          ? <CheckCircle className="w-7 h-7 text-green-400" />
                          : item.icon)
                    }
                  </span>
                  <span className="flex-1">{item.title}</span>
                  <span className="ml-2 text-xs text-gray-400 group-hover:text-blue-300">
                    {item.type === 'reading' ? (isZhTW ? '?��?' : 'Reading') : item.type === 'quiz' ? (isZhTW ? '測�?' : 'Quiz') : ''}
                  </span>
                  <span className="ml-4 text-xs text-gray-500 group-hover:text-blue-200">{item.duration}</span>
                </div>
                {item.description && (
                  <span className="mt-1 ml-9 text-xs text-gray-400 group-hover:text-blue-200 whitespace-pre-line">
                    {item.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
});

SidebarNavigation.displayName = 'SidebarNavigation';

// 主側?��?組件
const LessonSidebar: React.FC<LessonSidebarProps> = memo(({ 
  sections, 
  selectedKey, 
  onSelectItem, 
  isZhTW,
  isCompleted 
}) => {
  const sidebarState = useResponsiveSidebar();

  const handleItemSelect = useCallback((key: string) => {
    onSelectItem(key);
    sidebarState.closeDrawer();
  }, [onSelectItem, sidebarState]);

  return (
    <>
      {/* 桌面 sidebar：md 以�?永�?顯示，mobile ?��? */}
      <div className="hidden md:flex w-72 bg-gray-950 border-r border-gray-800 flex-col py-8 px-4 gap-2 min-h-screen">
        <SidebarNavigation
          sections={sections}
          selectedKey={selectedKey}
          onSelectItem={handleItemSelect}
          isZhTW={isZhTW}
          isCompleted={isCompleted}
        />
      </div>
      
      {/* Drawer for mobile：細屏�??��??��?，可?��? */}
      {sidebarState.drawerOpen && sidebarState.isMobile && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200" 
            onClick={sidebarState.closeDrawer} 
          />
          {/* Drawer panel */}
          <div className="relative w-64 max-w-[80vw] h-full bg-gray-950 border-r border-gray-800 flex flex-col py-8 px-4 gap-2 min-h-screen shadow-2xl animate-fade-in-left z-50">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-all duration-200" 
              onClick={sidebarState.closeDrawer} 
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            <SidebarNavigation
              sections={sections}
              selectedKey={selectedKey}
              onSelectItem={handleItemSelect}
              isZhTW={isZhTW}
              isCompleted={isCompleted}
            />
          </div>
        </div>
      )}
    </>
  );
});

LessonSidebar.displayName = 'LessonSidebar';

export default React.memo(LessonSidebar);
export type { LessonItem, LessonSection, LessonSidebarProps };
export { useResponsiveSidebar }; 
