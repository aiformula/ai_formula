/**
 * Perplexity Complete Course Unit Component
 * @fileoverview Perplexity 完整教學實戰課程單元頁面 - 100% ChatGPT UI Copy
 * @author AI Formula Team
 * @version 2.0.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  MessageSquare, Bookmark, ThumbsUp, Share2, FileText, Video,
  Star, Target, Download, Save, Volume2, Maximize, Lightbulb, TrendingUp, Users, Globe, Zap, AlertTriangle
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerplexityProgress } from '@/hooks/usePerplexityProgress';
import { perplexityCourseData } from '@/data/perplexity-complete-course-data';
import './PerplexityCompleteCourseUnit.css';
import '@/styles/design-system.css';

const PerplexityCompleteCourseUnit: React.FC = () => {
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

  // Progress tracking hooks
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    themeProgress,
    isUnitCompleted
  } = usePerplexityProgress();

  // 🎯 徹底重構：正確的兩步式搜尋邏輯 (使用數字ID匹配)
  const currentUnit = useMemo(() => {
    if (!themeId || !unitId || isNaN(themeId) || isNaN(unitId)) {
      console.warn('Missing or invalid themeId/unitId in URL parameters');
      return null;
    }

    console.log(`🔍 Searching for theme ${themeId}, unit ${unitId}`);

    // 🎯 第一步：根據themeId找出正確的主題 (數字比較)
    const currentModule = perplexityCourseData.courseModules.find(
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
  }, [themeId, unitId]);

  // 🎯 重構：完整的導航信息計算
  const navigationInfo = useMemo(() => {
    if (!currentUnit) return null;

    console.log(`🧭 Calculating navigation for theme ${themeId}, unit ${unitId}`);

    const allModules = perplexityCourseData.courseModules;
    
    // 構建完整的課程單元列表
    const allUnits: Array<{themeId: number, unitId: number, title: string}> = [];
    
    allModules.forEach(module => {
      module.lessons.forEach(lesson => {
        allUnits.push({
          themeId: module.id,
          unitId: lesson.id,
          title: lesson.title
        });
      });
    });

    console.log(`📊 Total units across all themes: ${allUnits.length}`);
    
    // 找到當前單元的位置
    const currentIndex = allUnits.findIndex(
      unit => unit.themeId === themeId && unit.unitId === unitId
    );

    if (currentIndex === -1) {
      console.error(`❌ Current unit not found in navigation calculation`);
      return null;
    }

    console.log(`📍 Current unit position: ${currentIndex + 1}/${allUnits.length}`);

    const previousUnit = currentIndex > 0 ? allUnits[currentIndex - 1] : null;
    const nextUnit = currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : null;

    // 檢查是否為主題的最後一個單元
    const currentModule = allModules.find(module => module.id === themeId);
    const currentUnitIndexInTheme = currentModule?.lessons.findIndex(lesson => lesson.id === unitId) ?? -1;
    const isLastUnitOfTheme = currentUnitIndexInTheme === (currentModule?.lessons.length ?? 0) - 1;
    const isLastUnitOfCourse = currentIndex === allUnits.length - 1;

    console.log(`🏁 Navigation flags: lastOfTheme=${isLastUnitOfTheme}, lastOfCourse=${isLastUnitOfCourse}`);

    return {
      currentPosition: currentIndex + 1,
      totalUnits: allUnits.length,
      previousUnit,
      nextUnit,
      isLastUnitOfTheme,
      isLastUnitOfCourse,
      progressPercentage: Math.round(((currentIndex + 1) / allUnits.length) * 100)
    };
  }, [themeId, unitId, currentUnit]);

  // 🎯 檢查單元是否已完成
  const isCompleted = useMemo(() => {
    return isUnitCompleted(themeId, unitId);
  }, [themeId, unitId, isUnitCompleted]);

  // 🎯 獲取進度統計 (like ChatGPT)
  const stats = getProgressStats();

  // 🎯 處理單元完成
  const handleCompleteUnit = useCallback(() => {
    if (!currentUnit) return;

    console.log(`🎯 Completing unit: theme ${themeId}, unit ${unitId}`);
    
    // 設置動畫狀態
    setIsMarkedComplete(true);
    setCompletionAnimation(true);
    
    // 調用進度追蹤
    completeUnit(themeId, unitId);
    
    // 停止計時器
    setIsTimerActive(false);
    
    // 清除動畫狀態
    setTimeout(() => setCompletionAnimation(false), 1000);
  }, [themeId, unitId, currentUnit, completeUnit]);

  // 🎯 導航處理函數
  const handleNavigateBack = useCallback(() => {
    navigate('/courses/perplexity-complete-course/learning');
  }, [navigate]);

  const handleNavigatePrevious = useCallback(() => {
    if (navigationInfo?.previousUnit) {
      const { themeId: prevThemeId, unitId: prevUnitId } = navigationInfo.previousUnit;
      console.log(`🔙 Navigating to previous: theme ${prevThemeId}, unit ${prevUnitId}`);
      navigate(`/courses/perplexity-complete-course/theme/${prevThemeId}/unit/${prevUnitId}`);
    }
  }, [navigationInfo, navigate]);

  const handleNavigateNext = useCallback(() => {
    if (navigationInfo?.nextUnit) {
      const { themeId: nextThemeId, unitId: nextUnitId } = navigationInfo.nextUnit;
      console.log(`🔜 Navigating to next: theme ${nextThemeId}, unit ${nextUnitId}`);
      navigate(`/courses/perplexity-complete-course/theme/${nextThemeId}/unit/${nextUnitId}`);
    } else if (navigationInfo?.isLastUnitOfTheme && !navigationInfo?.isLastUnitOfCourse) {
      // 如果是主題的最後一個單元但不是整個課程的最後，導航到測驗
      console.log(`🧪 Navigating to theme ${themeId} quiz`);
      navigate(`/courses/perplexity-complete-course/theme/${themeId}/quiz`);
    }
  }, [navigationInfo, navigate, themeId]);

  // 🎯 學習計時器
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (!currentUnit) {
      setIsTimerActive(false);
      setLearningSeconds(0);
      return;
    }
    
    const shouldStart = !isCompleted || forceTimerForTesting;
    
    if (shouldStart && isTimerActive) {
      interval = setInterval(() => {
        setLearningSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const seconds = newSeconds % 60;
          
          const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          setRealTimeDisplay(display);
          
          return newSeconds;
        });
      }, 1000);
    } else {
      setIsTimerActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, isCompleted, forceTimerForTesting]);

  // Auto-start timer on component mount
  useEffect(() => {
    if (!isCompleted || forceTimerForTesting) {
      setIsTimerActive(true);
    }
  }, [isCompleted, forceTimerForTesting]);

  // 如果找不到對應的課程單元，顯示錯誤頁面
  if (!currentUnit) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
        <div className="pt-20 lg:pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AlertTriangle className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">
                {isZhHK ? '課程單元不存在' : 'Course Unit Not Found'}
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                {isZhHK 
                  ? `抱歉，我們找不到主題 ${themeId} 的單元 ${unitId}。請檢查網址是否正確，或返回課程列表選擇其他單元。`
                  : `Sorry, we couldn't find unit ${unitId} in theme ${themeId}. Please check the URL or return to the course list to select another unit.`
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                onClick={handleNavigateBack}
                  className="btn-ai-primary flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isZhHK ? '返回課程列表' : 'Back to Course List'}</span>
                </Button>
                
                <Button
                  onClick={() => navigate('/courses/perplexity-complete-course/theme/1/unit/1')}
                  className="btn-ai-secondary flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isZhHK ? '從第一課開始' : 'Start from First Lesson'}</span>
                </Button>
            </div>
            </motion.div>
          </div>
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
                <span>{isZhHK ? '返回課程大綱' : 'Back to Course Outline'}</span>
                    </Button>
              
              <div className="text-right">
                <div className="text-sm text-gray-400">{isZhHK ? '進度' : 'Progress'}</div>
                <div className="text-lg font-semibold text-white">
                  {navigationInfo?.currentPosition}/{navigationInfo?.totalUnits}
                        </div>
          </div>
                              </div>
              
            <div className="text-center">
              <Badge className="bg-[#1F1F1F] text-white mb-4">
                {isZhHK ? `第 ${currentUnit.themeId} 章` : `Chapter ${currentUnit.themeId}`}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {isZhHK ? currentUnit.title : ((currentUnit as any).titleEn || currentUnit.title)}
                </h1>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                {currentUnit.description}
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
                    {currentUnit.image && (
                      <div className="mb-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700"
                        >
                          <img
                            src={currentUnit.image}
                            alt={currentUnit.imageAlt || (isZhHK ? '課程相關圖片' : 'Course related image')}
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
                      {currentUnit.keyPoints && currentUnit.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-white mr-3 mt-1">•</span>
                          <span className="text-gray-300">
                            {isZhHK ? point : ((currentUnit as any).keyPointsEn?.[index] || point)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons Section - 100% ChatGPT Design */}
                  <div className="pt-6 border-t border-gray-700">
                    
                    {/* 🎯 主要導航列 - justify-between 佈局 */}
                    <div className="flex justify-between items-center gap-4">
                      
                      {/* 🎯 左側：上一單元按鈕 */}
                      <div className="flex-shrink-0">
                        {navigationInfo?.previousUnit ? (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Button 
                              onClick={handleNavigatePrevious}
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
                          className="flex items-center space-x-2 text-green-400"
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
                            {!navigationInfo?.isLastUnitOfTheme && (
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
                                  <BookOpen className="w-5 h-5" />
                                  <span>{isZhHK ? '下一單元' : 'Next Unit'}</span>
                                  <motion.div
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </motion.div>
                                </div>
                              </Button>
                            )}

                            {/* 情況C: 主題最後一課但不是課程最後一課 - 前往測驗 */}
                            {navigationInfo?.isLastUnitOfTheme && !navigationInfo?.isLastUnitOfCourse && (
                              <Button 
                                onClick={() => navigate(`/courses/perplexity-complete-course/theme/${themeId}/quiz`)}
                                className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold px-6 py-2 text-base relative overflow-hidden group border-none"
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400"
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                                
                                <div className="relative z-10 flex items-center space-x-2">
                                  <Target className="w-5 h-5" />
                                  <span>{isZhHK ? '前往測驗' : 'Take Quiz'}</span>
                                  <motion.div
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </motion.div>
                                </div>
                              </Button>
                            )}

                            {/* 情況D: 課程最後一課 - 恭喜完成 */}
                            {navigationInfo?.isLastUnitOfCourse && (
                              <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4 }}
                              >
                                <Button 
                                  onClick={() => {
                                    console.log('恭喜！您已完成所有課程！');
                                    navigate('/courses/perplexity-complete-course/learning');
                                  }}
                                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold px-8 py-3 text-base relative overflow-hidden group border-none"
                                >
                                  <div className="relative z-10 flex items-center space-x-2">
                                    <motion.div
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      <Star className="w-6 h-6" />
                                    </motion.div>
                                    <span>{isZhHK ? '🎉 恭喜完成課程！' : '🎉 Course Completed!'}</span>
                                  </div>
                                  
                                  {/* 慶祝動畫背景 */}
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500"
                                    animate={{ 
                                      opacity: [0, 0.3, 0],
                                      scale: [1, 1.1, 1]
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
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* 🎯 Test Timer Controls (Development Only) */}
                    {isDevelopment && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showDebugPanel ? 1 : 0 }}
                        className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-blue-300 font-semibold">🧪 開發者測試面板</h4>
                          <Button
                            onClick={() => setShowDebugPanel(!showDebugPanel)}
                            className="text-xs bg-blue-600 hover:bg-blue-700"
                          >
                            {showDebugPanel ? '隱藏' : '顯示'}
                          </Button>
                        </div>
                        
                        {showDebugPanel && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-blue-300">學習時間：</span>
                                <span className="text-white font-mono">{realTimeDisplay}</span>
                              </div>
                              <div>
                                <span className="text-blue-300">計時器狀態：</span>
                                <span className="text-white">{isTimerActive ? '運行中' : '已停止'}</span>
                              </div>
                              <div>
                                <span className="text-blue-300">完成狀態：</span>
                                <span className="text-white">{isCompleted ? '已完成' : '未完成'}</span>
                              </div>
                              <div>
                                <span className="text-blue-300">強制計時：</span>
                                <span className="text-white">{forceTimerForTesting ? '開啟' : '關閉'}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                onClick={() => setIsTimerActive(!isTimerActive)}
                                className="text-xs bg-orange-600 hover:bg-orange-700"
                              >
                                {isTimerActive ? '暫停計時' : '開始計時'}
                              </Button>
                              <Button
                                onClick={() => setForceTimerForTesting(!forceTimerForTesting)}
                                className="text-xs bg-purple-600 hover:bg-purple-700"
                              >
                                {forceTimerForTesting ? '關閉強制計時' : '開啟強制計時'}
                              </Button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                  </div>

                  {/* 🎯 學習提示文字 */}
                  {!isCompleted && !isMarkedComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="mt-6 text-center"
                    >
                      <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-400" />
                        {isZhHK 
                          ? '完成學習後，點擊「標記完成」即可解鎖下一課程' 
                          : 'After studying, click "Mark Complete" to unlock the next lesson'
                        }
                      </p>
                    </motion.div>
                  )}

                  {/* 🎯 完成後的鼓勵文字 */}
                  {(isCompleted || isMarkedComplete) && !navigationInfo?.isLastUnitOfCourse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="mt-6 text-center"
                    >
                      <p className="text-sm text-white flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {isZhHK 
                          ? `太棒了！繼續保持學習熱忱，${navigationInfo?.isLastUnitOfTheme ? '準備挑戰測驗' : '前往下一個單元'}！` 
                          : `Great job! Keep up the momentum and ${navigationInfo?.isLastUnitOfTheme ? 'prepare for the quiz' : 'move to the next unit'}!`
                        }
                      </p>
                    </motion.div>
                  )}

                  {/* 🎯 課程完成的特殊慶祝文字 */}
                  {(isCompleted || isMarkedComplete) && navigationInfo?.isLastUnitOfCourse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="mt-6 text-center p-4 bg-gradient-to-r from-gray-900/30 to-gray-800/30 rounded-lg border border-gray-500/30"
                    >
                      <p className="text-lg font-semibold text-white flex items-center justify-center gap-2 mb-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Star className="w-5 h-5" />
                        </motion.div>
                        {isZhHK ? '🏆 課程學習完成！' : '🏆 Course Complete!'}
                      </p>
                      <p className="text-sm text-gray-200">
                        {isZhHK 
                          ? '您已成功完成 Perplexity 完整教學實戰課程！現在您已具備運用 AI 搜尋工具的全面技能。' 
                          : 'You have successfully completed the Perplexity Complete Practical Course! You now have comprehensive AI search tool skills.'
                        }
                      </p>
                    </motion.div>
                  )}
                </div>

                </motion.div>
          </div>

            {/* Sidebar - 100% ChatGPT Design */}
            <div className="lg:col-span-1">
            <motion.div 
                className="sticky top-24 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              >
                
                {/* Unit Info */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold mb-4">
                    {isZhHK ? '單元資訊' : 'Unit Info'}
                  </h4>
                  <div className="space-y-3">
                <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '時長' : 'Duration'}</span>
                      <span className="text-white font-medium">{isZhHK ? currentUnit.duration : ((currentUnit as any).durationEn || currentUnit.duration)}</span>
                    </div>
                <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '類型' : 'Type'}</span>
                      <span className="text-white font-medium capitalize">{currentUnit.type}</span>
              </div>
                <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '學習時間' : 'Study Time'}</span>
                      <span className="text-white font-mono font-medium">{realTimeDisplay}</span>
                    </div>
                  </div>
          </div>
                
                {/* Progress Stats - 100% ChatGPT Design */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold mb-4">
                    {isZhHK ? '學習進度' : 'Progress'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '總進度' : 'Overall'}</span>
                      <span className="text-white font-bold">{stats.totalProgress}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '完成主題' : 'Themes'}</span>
                      <span className="text-white">{stats.completedThemes}/{stats.totalThemes}</span>
                    </div>
                {isCompleted && (
                      <div className="flex items-center space-x-2 mt-4 p-2 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 text-sm font-medium">{isZhHK ? '已完成' : 'Completed'}</span>
        </div>
                )}
        </div>
            </div>
            
              </motion.div>
          </div>
          </div>
        </div>
        </div>

      {/* Completion Animation - 100% ChatGPT Style */}
      {completionAnimation && (
            <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
            className="bg-gray-700 text-white px-8 py-6 rounded-2xl flex items-center space-x-4"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <CheckCircle className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">{isZhHK ? '完成！' : 'Completed!'}</h3>
              <p className="text-gray-200">{isZhHK ? '學習時間' : 'Study Time'}: {realTimeDisplay}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
    </div>
  );
};

export default PerplexityCompleteCourseUnit; 