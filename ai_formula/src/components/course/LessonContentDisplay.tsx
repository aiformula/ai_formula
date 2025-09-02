import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
// import TemplateSection from './TemplateSection'; // Temporarily removed - file corrupted
import { CourseModule, CourseLesson } from '@/types/courseTypes';
import { useLanguage } from '@/contexts/LanguageContext';

interface LessonContentDisplayProps {
  module: CourseModule;
  lesson?: CourseLesson;
  lessonIndex?: number;
  totalLessons?: number;
  onLessonComplete?: (lessonId: number) => void;
  onNextLesson?: () => void;
  onPreviousLesson?: () => void;
}

const LessonContentDisplay: React.FC<LessonContentDisplayProps> = ({
  module,
  lesson,
  lessonIndex = 0,
  totalLessons = 1,
  onLessonComplete,
  onNextLesson,
  onPreviousLesson
}) => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = useCallback(() => {
    if (lesson && !isCompleted) {
      setIsCompleted(true);
      onLessonComplete?.(lesson.id);
    }
  }, [lesson, isCompleted, onLessonComplete]);

  const progressPercentage = useMemo(() => {
    return Math.round(((lessonIndex + 1) / totalLessons) * 100);
  }, [lessonIndex, totalLessons]);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">
          {isZhTW ? '選擇課程開始學習' : 'Select a lesson to start learning'}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Lesson Header */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">
              {isZhTW ? lesson.title['zh-HK'] : lesson.title.en}
            </h1>
            <span className="text-sm text-gray-400">
              {lessonIndex + 1} / {totalLessons}
            </span>
          </div>
          <p className="text-gray-300 mb-4">
            {isZhTW ? lesson.description['zh-HK'] : lesson.description.en}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Video/Content Area */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              {lesson.videoUrl ? (
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-400">
                    {isZhTW ? '影片播放器' : 'Video Player'}
                  </p>
                </div>
              ) : (
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-400">
                    {isZhTW ? '無影片內容' : 'No video content'}
                  </p>
                </div>
              )}
              
              {lesson.textContent && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">
                    {isZhTW ? lesson.textContent['zh-HK'] : lesson.textContent.en}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Template Section - Only show if lesson includes templates */}
          {/* <TemplateSection 
            templates={[]}
            isZhTW={isZhTW}
          /> */}
          {/* Temporarily removed TemplateSection due to file corruption */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {isZhTW ? '課程進度' : 'Lesson Progress'}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {isZhTW ? '完成度' : 'Completion'}
                  </span>
                  <span className="text-blue-400">{progressPercentage}%</span>
                </div>
                <button
                  onClick={handleComplete}
                  disabled={isCompleted}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCompleted 
                    ? (isZhTW ? '已完成' : 'Completed')
                    : (isZhTW ? '標記完成' : 'Mark Complete')
                  }
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {isZhTW ? '課程導航' : 'Navigation'}
              </h3>
              <div className="space-y-3">
                <button
                  onClick={onPreviousLesson}
                  disabled={lessonIndex === 0}
                  className="w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-600 text-white"
                >
                  {isZhTW ? '上一課' : 'Previous Lesson'}
                </button>
                <button
                  onClick={onNextLesson}
                  disabled={lessonIndex >= totalLessons - 1}
                  className="w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isZhTW ? '下一課' : 'Next Lesson'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(LessonContentDisplay); 
