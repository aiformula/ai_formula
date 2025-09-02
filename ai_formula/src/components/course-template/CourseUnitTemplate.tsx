/**
 * Course Unit Template
 * @fileoverview 通用的課程單元頁面模板
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  MessageSquare, Bookmark, ThumbsUp, Share2, FileText, Video,
  Star, Target, Download, Save, Volume2, Maximize, Lightbulb, 
  TrendingUp, Users, Globe, Zap, AlertTriangle, BarChart3, Trophy
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseConfigs } from './courseRegistry';
import '@/styles/design-system.css';

interface CourseUnitTemplateProps {
  courseId: string;
}

const CourseUnitTemplate: React.FC<CourseUnitTemplateProps> = ({ courseId }) => {
  const { themeId: themeIdStr, unitId: unitIdStr } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  // 🎯 核心修正：立即將字串轉換為數字
  const themeId = parseInt(themeIdStr || '', 10);
  const unitId = parseInt(unitIdStr || '', 10);
  
  const [learningSeconds, setLearningSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  const [forceTimerForTesting, setForceTimerForTesting] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [completionAnimation, setCompletionAnimation] = useState(false);
  const [realTimeDisplay, setRealTimeDisplay] = useState('00:00:00');
  
  // 🎯 新增：兩步式按鈕互動狀態
  const [isMarkedComplete, setIsMarkedComplete] = useState(false);
  
  const isDevelopment = process.env.NODE_ENV === 'development';

  // 獲取課程配置
  const courseConfig = courseConfigs[courseId];
  if (!courseConfig) {
    return <div>Course not found</div>;
  }

  const { dataSource, progressHook, themeColor, accentColor, baseRoute, cssPrefix } = courseConfig;

  // Progress tracking hooks
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    themeProgress
  } = progressHook();

  // 🎯 徹底重構：正確的兩步式搜尋邏輯 (使用數字ID匹配)
  const currentUnit = useMemo(() => {
    if (!themeId || !unitId || isNaN(themeId) || isNaN(unitId)) {
      console.warn('Missing or invalid themeId/unitId in URL parameters');
      return null;
    }

    console.log(`🔍 Searching for theme ${themeId}, unit ${unitId}`);

    // 🎯 第一步：根據themeId找出正確的主題 (數字比較)
    const currentModule = dataSource.courseModules.find(
      module => module.id === themeId
    );

    if (!currentModule) {
      console.error(`❌ Theme ${themeId} not found in courseModules`);
      return null;
    }

    console.log(`✅ Found theme: ${currentModule.title}`);
    console.log(`📚 Theme has ${currentModule.lessons.length} lessons`);

    // 🎯 第二步：根據unitId在主題的lessons陣列中找出正確的單元 (ID匹配)
    const currentLesson = currentModule.lessons.find(
      lesson => lesson.id === unitId
    );

    if (!currentLesson) {
      console.error(`❌ Unit ${unitId} not found in theme ${themeId}`);
      console.log(`📋 Available lesson IDs in theme ${themeId}:`, currentModule.lessons.map(l => l.id));
      return null;
    }
    
    console.log(`✅ Found lesson: ${currentLesson.title}`);
    console.log(`📖 Lesson ID: ${currentLesson.id}, Duration: ${currentLesson.duration}`);
    console.log(`🖼️ Lesson image: ${currentLesson.image}`);

    // 返回包含完整信息的單元對象
    return {
      ...currentLesson,
      themeId: themeId,
      themeTitle: currentModule.title,
      themeDescription: currentModule.description,
      absoluteLessonId: currentLesson.id // 保存絕對課程ID
    };
  }, [themeId, unitId, dataSource]);

  // 🎯 導航資訊計算
  const navigationInfo = useMemo(() => {
    if (!currentUnit || !dataSource) return null;

    const currentModuleIndex = dataSource.courseModules.findIndex(
      (module: any) => module.id === currentUnit.themeId
    );
    const currentModule = dataSource.courseModules[currentModuleIndex];
    
    if (!currentModule) return null;

    const currentUnitIndex = currentModule.lessons.findIndex(
      (lesson: any) => lesson.id === currentUnit.id
    );

    // 計算總單元數
    const totalUnits = dataSource.courseModules.reduce(
      (total: number, module: any) => total + module.lessons.length, 
      0
    );

    // 計算當前位置
    let currentPosition = 0;
    for (let i = 0; i < currentModuleIndex; i++) {
      currentPosition += dataSource.courseModules[i].lessons.length;
    }
    currentPosition += currentUnitIndex + 1;

    // 查找上一個單元
    let prevUnit = null;
    if (currentUnitIndex > 0) {
      // 同主題內的上一個單元
      const prevLesson = currentModule.lessons[currentUnitIndex - 1];
      prevUnit = {
        themeId: currentUnit.themeId,
        unitId: prevLesson.id
      };
    } else if (currentModuleIndex > 0) {
      // 上一個主題的最後一個單元
      const prevModule = dataSource.courseModules[currentModuleIndex - 1];
      const lastLessonInPrevModule = prevModule.lessons[prevModule.lessons.length - 1];
      prevUnit = {
        themeId: prevModule.id,
        unitId: lastLessonInPrevModule.id
      };
    }

    // 查找下一個單元
    let nextUnit = null;
    if (currentUnitIndex < currentModule.lessons.length - 1) {
      // 同主題內的下一個單元
      const nextLesson = currentModule.lessons[currentUnitIndex + 1];
      nextUnit = {
        themeId: currentUnit.themeId,
        unitId: nextLesson.id
      };
    } else if (currentModuleIndex < dataSource.courseModules.length - 1) {
      // 下一個主題的第一個單元
      const nextModule = dataSource.courseModules[currentModuleIndex + 1];
      const firstLessonInNextModule = nextModule.lessons[0];
      nextUnit = {
        themeId: nextModule.id,
        unitId: firstLessonInNextModule.id
      };
    }

    // 判斷是否是主題的最後一課
    const isLastUnitOfTheme = currentUnitIndex === currentModule.lessons.length - 1;
    
    // 判斷是否是課程的最後一課
    const isLastUnitOfCourse = (currentModuleIndex === dataSource.courseModules.length - 1) && isLastUnitOfTheme;

    return {
      currentPosition,
      totalUnits,
      prevUnit,
      nextUnit,
      isFirstUnitInCourse: currentPosition === 1,
      isLastUnitOfTheme,
      isLastUnitOfCourse
    };
  }, [currentUnit, dataSource]);

  // 🎯 計時器邏輯 - 完全複製 ChatGPT
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive || forceTimerForTesting) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = timerStartTime ? Math.floor((now - timerStartTime) / 1000) : 0;
        const totalSeconds = learningSeconds + elapsed;
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        setRealTimeDisplay(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, forceTimerForTesting, timerStartTime, learningSeconds]);

  useEffect(() => {
    if (!isTimerActive && !timerStartTime) {
      setTimerStartTime(Date.now());
      setIsTimerActive(true);
    }

    return () => {
      if (isTimerActive && timerStartTime) {
        const now = Date.now();
        const sessionTime = Math.floor((now - timerStartTime) / 1000);
        setLearningSeconds(prev => prev + sessionTime);
        setIsTimerActive(false);
        setTimerStartTime(null);
      }
    };
  }, []);

  const stats = getProgressStats();

  // 🎯 完成單元處理
  const handleCompleteUnit = useCallback(() => {
    if (!currentUnit) return;
    
    setCompletionAnimation(true);
    completeUnit(currentUnit.themeId, currentUnit.id);
    setIsMarkedComplete(true);
    
    setTimeout(() => {
      setCompletionAnimation(false);
    }, 2000);
  }, [currentUnit, completeUnit]);

  // 🎯 導航處理
  const handleNavigateBack = () => {
    navigate(`${baseRoute}/learning`);
  };

  const handleNavigatePrev = () => {
    if (navigationInfo?.prevUnit) {
      navigate(`${baseRoute}/theme/${navigationInfo.prevUnit.themeId}/unit/${navigationInfo.prevUnit.unitId}`);
    }
  };

  const handleNavigateNext = () => {
    if (navigationInfo?.nextUnit) {
      navigate(`${baseRoute}/theme/${navigationInfo.nextUnit.themeId}/unit/${navigationInfo.nextUnit.unitId}`);
    }
  };

  // 檢查單元是否已完成
  const isCompleted = isMarkedComplete;

  // 固定顏色（100%匹配ChatGPT，不使用動態主題色）
  const getThemeColor = () => {
    return 'text-green-400'; // 固定使用ChatGPT的綠色
  };

  const getBadgeColor = () => {
    return 'bg-green-500/20 text-green-300'; // 固定使用ChatGPT的綠色
  };

  const getKeyPointColor = () => {
    return 'text-green-400'; // 固定使用ChatGPT的綠色
  };

  if (!currentUnit) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isZhHK ? '找不到課程單元' : 'Unit Not Found'}</h1>
          <Button onClick={handleNavigateBack}>
            {isZhHK ? '返回學習頁面' : 'Back to Learning'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navigation />
      
      {/* Main Content */}
      <div className="page-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
          {/* Header Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <Button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isZhHK ? '返回學習頁面' : 'Back to Learning'}</span>
              </Button>
              
              <div className="text-right">
                <div className="text-sm text-gray-400">{isZhHK ? '進度' : 'Progress'}</div>
                <div className={`text-lg font-semibold ${getThemeColor()}`}>
                  {navigationInfo?.currentPosition}/{navigationInfo?.totalUnits}
                </div>
              </div>
            </div>
              
            <div className="text-center">
              <Badge className={`${getBadgeColor()} mb-4`}>
                {isZhHK ? `第 ${currentUnit.themeId} 章` : `Chapter ${currentUnit.themeId}`}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {isZhHK ? currentUnit.title : ((currentUnit as any).titleEn || currentUnit.title)}
              </h1>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                {isZhHK ? currentUnit.description : ((currentUnit as any).descriptionEn || currentUnit.description)}
              </p>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 lg:p-8 border border-gray-700/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Content Display */}
                <div className="space-y-6">
                  
                  {/* Main Transcript */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-400" />
                      {isZhHK ? '主要內容' : 'Main Content'}
                    </h3>
                    
                    {/* Unit Image - if available */}
                    {currentUnit.image && !String(currentUnit.image).includes('placeholder') && (
                      <div className="mb-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700"
                        >
                          <img
                            src={currentUnit.image}
                            alt={isZhHK ? currentUnit.imageAlt : ((currentUnit as any).imageAltEn || currentUnit.imageAlt) || (isZhHK ? '課程相關圖片' : 'Course related image')}
                            className="w-full h-auto object-cover"
                            style={{ maxHeight: '500px' }}
                            onError={(e) => {
                              // 如果圖片載入失敗，隱藏圖片容器
                              const target = e.target as HTMLImageElement;
                              const container = target.closest('div');
                              if (container) {
                                container.style.display = 'none';
                              }
                            }}
                          />
                          {/* Image overlay with subtle gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </motion.div>
                      </div>
                    )}
                    
                    <div className="prose prose-invert prose-lg max-w-none">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {isZhHK ? currentUnit.transcript : ((currentUnit as any).transcriptEn || currentUnit.transcript)}
                      </p>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                      {isZhHK ? '重點整理' : 'Key Points'}
                    </h3>
                    <ul className="space-y-3">
                      {(isZhHK ? currentUnit.keyPoints : ((currentUnit as any).keyPointsEn || currentUnit.keyPoints))?.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`${getKeyPointColor()} mr-3 mt-1`}>•</span>
                          <span className="text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* 🎯 徹底重構：兩步式導航按鈕系統 - 100%複製ChatGPT */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  
                  {/* 🎯 主要導航列 - justify-between 佈局 */}
                  <div className="flex justify-between items-center gap-4">
                    
                    {/* 🎯 左側：上一單元按鈕 */}
                    <div className="flex-shrink-0">
                      {navigationInfo?.prevUnit ? (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button 
                            onClick={handleNavigatePrev}
                            variant="outline"
                            className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-all duration-200"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {isZhHK ? '上一單元' : 'Previous'}
                          </Button>
                        </motion.div>
                      ) : (
                        <div className="w-24"></div>
                      )}
                    </div>

                    {/* 🎯 中間：完成狀態指示 */}
                    {(isCompleted || isMarkedComplete) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className={`flex items-center space-x-2 ${getThemeColor()}`}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                        <span className="font-medium text-sm">
                          {isZhHK ? '已完成' : 'Completed'}
                        </span>
                      </motion.div>
                    )}

                    {/* 🎯 右側：主要操作按鈕 */}
                    <div className="flex-shrink-0">
                      
                      {/* 情況A: 用戶未完成且未標記完成 - 顯示標記完成按鈕 */}
                      {!isCompleted && !isMarkedComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button 
                            onClick={handleCompleteUnit}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold px-6 py-2 text-base relative overflow-hidden group border-none"
                          >
                            {/* 按鈕動畫背景 */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            
                            <div className="relative z-10 flex items-center space-x-2">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <CheckCircle className="w-5 h-5" />
                              </motion.div>
                              <span>{isZhHK ? '標記完成' : 'Mark Complete'}</span>
                            </div>
                            
                            {/* 脈動效果 */}
                            <motion.div
                              className="absolute inset-0 border-2 border-yellow-400 rounded-md"
                              animate={{ 
                                opacity: [0, 0.6, 0],
                                scale: [1, 1.05, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </Button>
                        </motion.div>
                      )}

                      {/* 情況B-D: 用戶已完成 - 顯示對應的前進按鈕 */}
                      {(isCompleted || isMarkedComplete) && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                        >
                          {/* 情況B: 不是主題最後一課 - 下一單元 */}
                          {!navigationInfo?.isLastUnitOfTheme && navigationInfo?.nextUnit && (
                            <Button 
                              onClick={handleNavigateNext}
                              className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold px-6 py-2 text-base relative overflow-hidden group border-none"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                              
                              <div className="relative z-10 flex items-center space-x-2">
                                <span>{isZhHK ? '下一單元' : 'Next Unit'}</span>
                                <motion.div
                                  whileHover={{ x: 3 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <ArrowRight className="w-5 h-5" />
                                </motion.div>
                              </div>
                            </Button>
                          )}

                          {/* 情況C: 主題最後一課但不是課程最後一課 - 前往測驗 */}
                          {navigationInfo?.isLastUnitOfTheme && !navigationInfo?.isLastUnitOfCourse && (
                            <Button 
                              onClick={() => navigate(`${baseRoute}/theme/${currentUnit.themeId}/quiz`)}
                              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2 text-base relative overflow-hidden group border-none"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-400"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                              
                              <div className="relative z-10 flex items-center space-x-2">
                                <span>{isZhHK ? '章節測驗' : 'Chapter Quiz'}</span>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <Trophy className="w-5 h-5" />
                                </motion.div>
                              </div>
                            </Button>
                          )}

                          {/* 情況D: 課程最後一課 - 恭喜完成 */}
                          {navigationInfo?.isLastUnitOfCourse && (
                            <Button 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold px-6 py-2 text-base relative overflow-hidden group border-none"
                              disabled
                            >
                              <div className="relative z-10 flex items-center space-x-2">
                                <Trophy className="w-5 h-5 text-yellow-300" />
                                <span>{isZhHK ? '課程完成！' : 'Course Complete!'}</span>
                              </div>
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Unit Info Card */}
              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                  {isZhHK ? '單元資訊' : 'Unit Info'}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isZhHK ? '預估時長' : 'Duration'}</span>
                    <span className="text-white font-medium">{isZhHK ? currentUnit.duration : ((currentUnit as any).durationEn || currentUnit.duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isZhHK ? '學習時間' : 'Study Time'}</span>
                    <span className="text-white font-medium">{realTimeDisplay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isZhHK ? '單元類型' : 'Type'}</span>
                    <Badge variant="outline" className="text-gray-300 border-gray-600">
                      {currentUnit.type === 'video'
                        ? (isZhHK ? '影片' : 'Video')
                        : currentUnit.type === 'interactive'
                          ? (isZhHK ? '互動' : 'Interactive')
                          : (isZhHK ? '文字' : 'Text')}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              {/* Progress Stats */}
              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-gray-400" />
                  {isZhHK ? '進度統計' : 'Progress Stats'}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{isZhHK ? '總體進度' : 'Overall Progress'}</span>
                    <span className="text-white font-bold">{stats.overallProgress}%</span>
                  </div>
                  <Progress value={stats.overallProgress} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{isZhHK ? '已完成單元' : 'Completed Units'}</span>
                    <span className="text-white font-bold">{stats.completedUnits}/{stats.totalUnits}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{isZhHK ? '完成測驗' : 'Completed Quizzes'}</span>
                    <span className="text-white font-bold">{stats.completedQuizzes}/{stats.totalQuizzes}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Animation - 100%複製ChatGPT設計 */}
      <AnimatePresence>
        {completionAnimation && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-green-600 text-white px-8 py-6 rounded-2xl flex items-center space-x-4"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <CheckCircle className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">{isZhHK ? '完成！' : 'Completed!'}</h3>
                <p className="text-green-100">{isZhHK ? '學習時間' : 'Study Time'}: 00:00:02</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseUnitTemplate; 