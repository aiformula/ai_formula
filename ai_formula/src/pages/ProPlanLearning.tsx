import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Star, Users, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from '../components/Navigation';
import LessonNavigation from '../components/course/LessonNavigation';
import LessonContentDisplay from '../components/course/LessonContentDisplay';
import { beginnerCourse } from '../data/courseData/proPlanCourse';

const ProPlanLearning: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentPart, setCurrentPart] = useState(0);
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  // Memoized course data
  const courseData = useMemo(() => beginnerCourse, []);
  
  // Memoized current part content
  const currentPartContent = useMemo(() => 
    courseData.getPartContent(currentPart + 1), 
    [courseData, currentPart]
  );

  // Handlers
  const handlePartSelect = useCallback((partIndex: number) => {
    setCurrentPart(partIndex);
  }, []);

  const handleMarkComplete = useCallback((partNumber: number) => {
    if (!completedParts.includes(partNumber)) {
      setCompletedParts(prev => [...prev, partNumber]);
    }
  }, [completedParts]);

  const handleNextPart = useCallback(() => {
    setCurrentPart(prev => Math.min(prev + 1, courseData.parts.length - 1));
  }, [courseData.parts.length]);

  const handlePrevPart = useCallback(() => {
    setCurrentPart(prev => Math.max(prev - 1, 0));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <button
            onClick={() => navigate('/course')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? 'Back to Courses' : '返回課程'}
          </button>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              {language === 'en' ? courseData.title : courseData.titleCht}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold">
              {language === 'en' ? courseData.subtitle : courseData.subtitleCht}
            </p>
          </div>

          <div className="bg-blue-600/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300">{language === 'en' ? 'Beginner Friendly' : '初學者友好'}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300">{language === 'en' ? '4 Parts Total' : '總共4部分'}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">{language === 'en' ? 'Step by Step' : '逐步指導'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar - Lesson Navigation */}
          <div className="lg:col-span-1">
            <LessonNavigation
              parts={courseData.parts}
              currentPart={currentPart}
              completedParts={completedParts}
              onPartSelect={handlePartSelect}
              onMarkComplete={handleMarkComplete}
              language={language}
            />
          </div>

          {/* Main Content - Lesson Display */}
          <div className="lg:col-span-2">
            <LessonContentDisplay
              currentPart={courseData.parts[currentPart]}
              partContent={currentPartContent}
              currentPartIndex={currentPart}
              totalParts={courseData.parts.length}
              onNextPart={handleNextPart}
              onPrevPart={handlePrevPart}
              language={language}
            />
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center gap-2">
            <Lightbulb className="w-6 h-6" />
            {language === 'en' ? 'Quick Success Tips' : '快速成功貼士'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold mb-2 text-green-400">
                {language === 'en' ? 'Start Simple' : '從簡單開始'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Don\'t try to create complex images on day 1. Master the basics first!' :
                  '唔好第一日就試創造複雜圖像。先掌握基礎！'
                }
              </p>
            </div>
            
            <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400">
                {language === 'en' ? 'Practice Daily' : '每日練習'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Spend 15-30 minutes daily. Consistency beats intensity!' :
                  '每日花15-30分鐘。持續勝過強度！'
                }
              </p>
            </div>
            
            <div className="bg-yellow-500/20 rounded-2xl p-6 border border-yellow-500/30">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold mb-2 text-yellow-400">
                {language === 'en' ? 'Have Fun!' : '享受樂趣！'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Experiment, make mistakes, and enjoy the creative process!' :
                  '實驗、犯錯誤同享受創作過程！'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlanLearning; 