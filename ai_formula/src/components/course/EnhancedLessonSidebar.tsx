import React, { useState, useMemo } from 'react';
import { CheckCircle, Clock, BookOpen, ChevronDown, ChevronUp, Target, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface LessonItem {
  key: string;
  title: string;
  icon: string;
  duration: string;
  description: string;
  type: 'reading' | 'quiz' | 'video' | 'practice';
  content: React.ReactNode;
}

export interface LessonSection {
  group: string;
  groupIcon: string;
  items: LessonItem[];
}

interface EnhancedLessonSidebarProps {
  sections: LessonSection[];
  selectedKey: string;
  onSelectItem: (key: string) => void;
  completed: string[];
  progress: {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
  isZhTW: boolean;
}

const EnhancedLessonSidebar: React.FC<EnhancedLessonSidebarProps> = ({
  sections,
  selectedKey,
  onSelectItem,
  completed,
  progress,
  isZhTW
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionGroup: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionGroup)
        ? prev.filter(g => g !== sectionGroup)
        : [...prev, sectionGroup]
    );
  };

  const getItemTypeIcon = (type: LessonItem['type']) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'practice': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getItemTypeColor = (type: LessonItem['type']) => {
    switch (type) {
      case 'video': return 'border-l-red-500 bg-red-500/10';
      case 'quiz': return 'border-l-yellow-500 bg-yellow-500/10';
      case 'practice': return 'border-l-green-500 bg-green-500/10';
      default: return 'border-l-blue-500 bg-blue-500/10';
    }
  };

  // 默認展開第一個section
  React.useEffect(() => {
    if (sections.length > 0 && expandedSections.length === 0) {
      setExpandedSections([sections[0].group]);
    }
  }, [sections, expandedSections.length]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 sticky top-24 h-fit">
      {/* 課程標題和進度 */}
      <div className="p-6 border-b border-gray-700/50">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          {isZhTW ? '課程大綱' : 'Course Outline'}
        </h3>
        
        {/* 進度條 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {isZhTW ? '完成進度' : 'Progress'}
            </span>
            <span className="text-gray-300 font-medium">
              {progress.completedCount}/{progress.totalCount} ({progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 課程章節 */}
      <div className="p-4 max-h-[60vh] overflow-y-auto">
        {sections.map((section, sectionIndex) => {
          const isExpanded = expandedSections.includes(section.group);
          const sectionCompletedCount = section.items.filter(item => completed.includes(item.key)).length;
          const sectionProgress = section.items.length > 0 ? (sectionCompletedCount / section.items.length) * 100 : 0;

          return (
            <div key={section.group} className="mb-4">
              {/* 章節標題 */}
              <button
                onClick={() => toggleSection(section.group)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-700/30 hover:bg-gray-600/50 transition-all duration-200 border border-gray-600/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.groupIcon}</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-white text-sm">{section.group}</h4>
                    <p className="text-xs text-gray-400">
                      {sectionCompletedCount}/{section.items.length} {isZhTW ? '已完成' : 'completed'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-600/50 rounded-full flex items-center justify-center">
                    <div 
                      className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{ 
                        background: `conic-gradient(from 0deg, #10b981 0deg, #10b981 ${sectionProgress * 3.6}deg, transparent ${sectionProgress * 3.6}deg, transparent 360deg)`,
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {/* 章節內容 */}
              {isExpanded && (
                <div className="mt-2 space-y-2">
                  {section.items.map((item, itemIndex) => {
                    const isSelected = selectedKey === item.key;
                    const isCompleted = completed.includes(item.key);
                    const itemNumber = sections.slice(0, sectionIndex).reduce((acc, s) => acc + s.items.length, 0) + itemIndex + 1;

                    return (
                      <button
                        key={item.key}
                        onClick={() => onSelectItem(item.key)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 border-l-4 ${
                          isSelected 
                            ? 'bg-blue-500/20 border-l-blue-500 text-white shadow-lg' 
                            : getItemTypeColor(item.type)
                        } ${
                          isCompleted 
                            ? 'bg-green-500/10 border-l-green-500' 
                            : ''
                        } hover:bg-gray-700/30`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-400">
                              {itemNumber.toString().padStart(2, '0')}
                            </span>
                            <span className="text-lg">{item.icon}</span>
                            {getItemTypeIcon(item.type)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.duration}
                            </span>
                            {isCompleted && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                        </div>
                        
                        <h5 className="font-semibold text-sm text-white mb-1">{item.title}</h5>
                        <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部操作 */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">
            {isZhTW ? '學習統計' : 'Learning Stats'}
          </span>
          <span className="text-sm font-medium text-green-400">
            {progress.percentage}% {isZhTW ? '完成' : 'Complete'}
          </span>
        </div>
        
        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          disabled={progress.percentage < 100}
        >
          {progress.percentage >= 100 
            ? (isZhTW ? '課程完成!' : 'Course Complete!') 
            : (isZhTW ? '繼續學習' : 'Continue Learning')
          }
        </Button>
      </div>
    </div>
  );
};

export default React.memo(EnhancedLessonSidebar); 