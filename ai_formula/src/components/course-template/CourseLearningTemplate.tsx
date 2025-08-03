/**
 * Course Learning Template
 * @description 通用課程學習頁面模板，100% 複製 ChatGPT 設計
 * @author AI Formula Team  
 * @version 3.0.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Lock, 
  Calendar,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Users,
  Trophy,
  Star,
  ArrowRight,
  BookOpen,
  Target,
  Zap,
  Award,
  Brain,
  ChevronDown,
  ChevronUp,
  User,
  RotateCcw
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { courseConfigs } from './courseRegistry';

interface CourseLearningTemplateProps {
  courseId: string;
}

const CourseLearningTemplate: React.FC<CourseLearningTemplateProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const isZhHK = language === 'zh-HK';

  // 🎯 展開狀態管理 - 默認展開第一個主題
  const [expandedThemes, setExpandedThemes] = useState<Set<number>>(new Set([1]));

  // 獲取課程配置
  const courseConfig = courseConfigs[courseId];
  if (!courseConfig) {
    return <div>Course not found: {courseId}</div>;
  }

  const { dataSource, progressHook, baseRoute } = courseConfig;

  // Progress tracking hooks
  const { 
    getThemeProgress,
    getProgressStats,
    progressState,
    isThemeCompleted,
    resetProgress,
    completeUnit,
    completeQuiz
  } = progressHook();

  const stats = getProgressStats();

  // 🎯 獲取用戶顯示名稱
  const getUserDisplayName = () => {
    if (!user?.email) return isZhHK ? '學習者' : 'Learner';
    const username = user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  // 🎯 模擬學習時間計算（完全匹配ChatGPT）
  const totalLearningMinutes = useMemo(() => {
    return stats.totalTimeSpent || Math.floor(stats.overallProgress * 4);
  }, [stats.overallProgress, stats.totalTimeSpent]);

  const formattedLearningTime = useMemo(() => {
    const totalSeconds = totalLearningMinutes * 60;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    const useCompactFormat = true;
    
    if (useCompactFormat) {
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    } else {
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }, [totalLearningMinutes]);

  // 課程數據結構 - 完全複製 ChatGPT 格式
  const courseData = {
    title: isZhHK ? dataSource.courseInfo.title : (dataSource.courseInfo.titleEn || dataSource.courseInfo.title),
    completedHours: totalLearningMinutes,
    totalHours: 400,
    actualLearningTime: formattedLearningTime,
    totalThemes: stats.totalThemes,
    completedThemes: stats.completedThemes,
    learningStreak: 5,
    
    themes: dataSource.courseModules.map((module: any) => ({
      id: module.id,
      title: module.title,
      description: module.description,
      progress: (() => {
        const progress = getThemeProgress(module.id);
        return progress ? progress.progressPercentage : 0;
      })(),
      completed: isThemeCompleted(module.id),
      units: module.lessons.map((lesson: any, index: number) => {
        // 檢查單元是否完成
        const themeUnits = progressState.completedUnits?.[module.id] || [];
        const isCompleted = Array.isArray(themeUnits) 
          ? themeUnits.includes(lesson.id)
          : false;
        
        return {
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration || '30分鐘',
          completed: isCompleted,
          current: false, // Will be calculated below
          description: lesson.description
        };
      })
    }))
  };

  // 🎯 切換主題展開狀態
  const toggleTheme = useCallback((themeId: number) => {
    setExpandedThemes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(themeId)) {
        newSet.delete(themeId);
      } else {
        newSet.add(themeId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="page-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <motion.button
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6"
            onClick={() => navigate(baseRoute)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isZhHK ? '返回課程大綱' : 'Back to Course Outline'}</span>
          </motion.button>

          {/* Dashboard Header - 完全複製 ChatGPT 三部分佈局 */}
          <motion.div 
            className="bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Section - 課程標題和狀態 */}
              <div className="lg:col-span-4">
                <div className="min-w-0">
                  <h1 className="text-3xl font-bold text-white mb-1 truncate">
                    {courseData.title}
                  </h1>
                  <div className="flex items-center space-x-2 mb-1">
                    {stats.overallProgress === 100 ? (
                      <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    ) : stats.overallProgress > 0 ? (
                      <Zap className="w-4 h-4 flex-shrink-0 text-green-400" />
                    ) : (
                      <Star className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className="text-gray-300">
                      {stats.overallProgress === 100 ? (
                        isZhHK ? '🎉 恭喜！課程完成！' : '🎉 Congratulations! Course Completed!'
                      ) : stats.overallProgress > 0 ? (
                        isZhHK ? '🚀 正在學習中' : '🚀 Learning in Progress'
                      ) : (
                        isZhHK ? '👋 歡迎開始學習！' : '👋 Welcome to Learning!'
                      )}
                    </span>
                  </div>
                  <p className="text-gray-400">
                    {isZhHK ? '互動課程・隨時學習' : 'Interactive • Learn anytime'}
                  </p>
                </div>
              </div>

              {/* Center Section - 三個統計卡片 */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* 總進度 */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BarChart3 className="w-5 h-5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">{isZhHK ? '總進度' : 'Progress'}</span>
                    </div>
                    <div className="text-2xl font-bold text-green-400">
                      {stats.overallProgress}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {isZhHK ? '已完成課程' : 'Course Progress'}
                    </div>
                  </div>

                  {/* 學習時間 */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">{isZhHK ? '學習時間' : 'Study Time'}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formattedLearningTime}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {isZhHK ? '實際時間' : 'Time Spent'}
                    </div>
                  </div>

                  {/* 完成單元 */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="w-5 h-5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">{isZhHK ? '完成單元' : 'Units'}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {stats.completedUnits}/{stats.totalUnits}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {isZhHK ? '學習單元' : 'Learning Units'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - 行動按鈕 */}
              <div className="lg:col-span-3">
                <div className="flex flex-col space-y-3">
                  {stats.overallProgress < 100 ? (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        // Find current or next unit to continue
                        for (const theme of courseData.themes) {
                          for (const [unitIndex, unit] of theme.units.entries()) {
                            if (!unit.completed) {
                              navigate(`${baseRoute}/theme/${theme.id}/unit/${unit.id}`);
                              return;
                            }
                          }
                        }
                        // If no current unit found, navigate to first theme first unit
                        navigate(`${baseRoute}/theme/1/unit/1`);
                      }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {isZhHK ? '繼續學習' : 'Continue Learning'}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => navigate(baseRoute)}
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      {isZhHK ? '查看課程證書' : 'View Certificate'}
                    </Button>
                  )}

                  {/* Secondary Action - Reset Progress */}
                  {process.env.NODE_ENV === 'development' && (
                    <Button
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={resetProgress}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {isZhHK ? '重置進度' : 'Reset Progress'}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar - Full Width at Bottom */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">
                  {isZhHK ? '整體學習進度' : 'Overall Learning Progress'}
                </span>
                <span className="text-sm text-gray-300">
                  {stats.overallProgress}% {isZhHK ? '已完成' : 'completed'}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-700 ease-out" 
                  style={{width: `${stats.overallProgress}%`}}
                ></div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Course Modules (NEW ACCORDION DESIGN) */}
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-gray-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">{isZhHK ? '課程模塊' : 'Course Modules'}</h3>
                </div>

                {/* 🎯 NEW: Accordion Style Course Modules */}
                <div className="space-y-4">
                  {courseData.themes.map((theme, index) => (
                    <motion.section
                      key={theme.id}
                      className={`bg-gray-800/30 rounded-xl border overflow-hidden transition-all duration-300 ${
                        theme.completed ? 'border-green-400/30 bg-green-400/5' : 
                        theme.units.some(unit => unit.current) ? 'border-gray-600/50 bg-gray-800/30' :
                        'border-gray-600/30'
                      }`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1, 
                        duration: 0.4
                      }}
                    >
                      {/* 🎯 Accordion Header (Theme Summary) */}
                      <header 
                        className="cursor-pointer p-6 hover:bg-white/5 transition-colors duration-200"
                        onClick={() => toggleTheme(theme.id)}
                        role="button" 
                        tabIndex={0}
                        aria-expanded={expandedThemes.has(theme.id)}
                        aria-controls={`theme-${theme.id}-content`}
                      >
                        <div className="flex items-start justify-between">
                          {/* Left Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-3">
                              <Badge className="bg-green-500/20 text-green-300 mr-3">
                                {isZhHK ? `第 ${theme.id} 章` : `Chapter ${theme.id}`}
                              </Badge>
                              <span className="text-sm text-gray-400">
                                {theme.units.filter(u => u.completed).length} / {theme.units.length} {isZhHK ? '已完成' : 'completed'}
                              </span>
                              {theme.completed && (
                                <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                              {theme.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {theme.description}
                            </p>
                            
                            {/* Progress Bar */}
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500">
                                  {isZhHK ? '章節進度' : 'Chapter Progress'}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {theme.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div 
                                  className="bg-green-400 h-1.5 rounded-full transition-all duration-500" 
                                  style={{ width: `${theme.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Content - Expand Icon */}
                          <div className="flex-shrink-0 ml-4">
                            <motion.div
                              animate={{ rotate: expandedThemes.has(theme.id) ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            </motion.div>
                          </div>
                        </div>
                      </header>

                      {/* 🎯 Accordion Content (Units List) */}
                      <AnimatePresence>
                        {expandedThemes.has(theme.id) && (
                          <motion.div
                            id={`theme-${theme.id}-content`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 border-t border-gray-700/50">
                              <div className="space-y-3 mt-4">
                                {theme.units.map((unit, unitIndex) => {
                                  const isLocked = false; // For now, no locking logic
                                  
                                  return (
                                    <motion.div
                                      key={`${theme.id}-${unit.id}`}
                                      className={`${
                                        isLocked ? 'lesson-locked' : 
                                        unit.completed ? 'lesson-completed' : 
                                        unit.current ? 'lesson-current' : 'lesson-todo'
                                      }`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: unitIndex * 0.05 }}
                                    >
                                      <div 
                                        className={`flex items-center p-4 rounded-lg border transition-all duration-150 ${
                                          isLocked ? 'border-gray-600 bg-gray-800/30 opacity-60 cursor-not-allowed' :
                                          unit.completed ? 'border-green-400/30 bg-green-400/5 hover:bg-green-400/10' : 
                                          unit.current ? 'border-gray-500/50 bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer' : 
                                          'border-gray-600/30 bg-gray-700/20 hover:bg-gray-600/20 cursor-pointer'
                                        }`}
                                        onClick={() => {
                                          if (!isLocked) {
                                            navigate(`${baseRoute}/theme/${theme.id}/unit/${unit.id}`);
                                          }
                                        }}
                                      >
                                        {/* Status Icon */}
                                        <div className="flex-shrink-0 mr-4">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            isLocked ? 'bg-gray-600' :
                                            unit.completed ? 'bg-green-500' : 
                                            unit.current ? 'bg-gray-600 animate-pulse' : 'bg-gray-500'
                                          }`}>
                                            {isLocked ? (
                                              <Lock className="w-4 h-4 text-gray-300" />
                                            ) : unit.completed ? (
                                              <CheckCircle className="w-5 h-5 text-white" />
                                            ) : unit.current ? (
                                              <Play className="w-4 h-4 text-white" />
                                            ) : (
                                              <Play className="w-4 h-4 text-white" />
                                            )}
                                          </div>
                                        </div>
                                        
                                        {/* Lesson Content */}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-center mb-1">
                                                <span className={`text-xs mr-3 ${
                                                  isLocked ? 'text-gray-500' :
                                                  unit.current ? 'text-gray-300' : 'text-gray-400'
                                                }`}>
                                                  {theme.id}.{unitIndex + 1}
                                                </span>
                                                <h4 className={`text-sm font-medium leading-tight ${
                                                  isLocked ? 'text-gray-500' :
                                                  unit.completed ? 'text-gray-300 line-through decoration-gray-500' : 
                                                  unit.current ? 'text-white' : 'text-white group-hover:text-gray-200'
                                                }`}>
                                                  {unit.title}
                                                </h4>
                                              </div>
                                              <div className={`flex items-center text-xs ${
                                                isLocked ? 'text-gray-600' : 'text-gray-400'
                                              }`}>
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>{unit.duration}</span>
                                                {unit.current && (
                                                  <>
                                                    <span className="mx-2">•</span>
                                                    <span className="text-xs text-gray-300">{isZhHK ? '進行中' : 'In Progress'}</span>
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                            
                                            {/* Action Button */}
                                            <div className="flex-shrink-0 ml-4">
                                              {isLocked ? (
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs bg-gray-700 text-gray-400">
                                                  <Lock className="w-4 h-4 mr-1" />
                                                  {isZhHK ? '已鎖定' : 'Locked'}
                                                </span>
                                              ) : unit.completed ? (
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs bg-green-100 text-green-700">
                                                  <CheckCircle className="w-4 h-4 mr-1" />
                                                  {isZhHK ? '已完成' : 'Completed'}
                                                </span>
                                              ) : unit.current ? (
                                                <Button
                                                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-xs"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`${baseRoute}/theme/${theme.id}/unit/${unit.id}`);
                                                  }}
                                                >
                                                  <Play className="w-4 h-4 mr-2" />
                                                  {isZhHK ? '繼續學習' : 'Continue'}
                                                </Button>
                                              ) : (
                                                <Button
                                                  variant="outline"
                                                  className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 px-4 py-2 text-xs"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`${baseRoute}/theme/${theme.id}/unit/${unit.id}`);
                                                  }}
                                                >
                                                  <Play className="w-4 h-4 mr-2" />
                                                  {isZhHK ? '開始學習' : 'Start'}
                                                </Button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.section>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Statistics and Achievements */}
            <div className="space-y-6">
              {/* Skills Development */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <Target className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">
                    {isZhHK ? '技能發展' : 'Skill Development'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: isZhHK ? '基礎技能' : 'Foundation', level: Math.min(stats.overallProgress, 100) },
                    { name: isZhHK ? 'Prompt 設計' : 'Prompt Design', level: Math.max(0, Math.min(stats.overallProgress - 20, 100)) },
                    { name: isZhHK ? '工具整合' : 'Tool Integration', level: Math.max(0, Math.min(stats.overallProgress - 40, 100)) },
                    { name: isZhHK ? '實戰應用' : 'Practical Application', level: Math.max(0, Math.min(stats.overallProgress - 60, 100)) }
                  ].map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <span className="font-bold text-green-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div 
                          className="bg-green-400 h-2 rounded-full transition-all duration-1000 ease-out"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">
                    {isZhHK ? '成就徽章' : 'Achievements'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className={`text-center p-4 rounded-lg border transition-all duration-200 ${
                    stats.overallProgress >= 25 ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-gray-600 bg-gray-800/50'
                  }`}>
                    <Star className={`w-8 h-8 mx-auto mb-2 ${stats.overallProgress >= 25 ? 'text-yellow-400' : 'text-gray-500'}`} />
                    <div className={`text-xs font-medium ${stats.overallProgress >= 25 ? 'text-yellow-300' : 'text-gray-400'}`}>
                      {isZhHK ? '初學者' : 'Beginner'}
                    </div>
                    <div className={`text-xs ${stats.overallProgress >= 25 ? 'text-yellow-200' : 'text-gray-500'}`}>
                      25%
                    </div>
                  </div>
                  
                  <div className={`text-center p-4 rounded-lg border transition-all duration-200 ${
                    stats.overallProgress >= 100 ? 'border-green-500/30 bg-green-500/10' : 'border-gray-600 bg-gray-800/50'
                  }`}>
                    <Trophy className={`w-8 h-8 mx-auto mb-2 ${stats.overallProgress >= 100 ? 'text-green-400' : 'text-gray-500'}`} />
                    <div className={`text-xs font-medium ${stats.overallProgress >= 100 ? 'text-green-300' : 'text-gray-400'}`}>
                      {isZhHK ? '大師' : 'Master'}
                    </div>
                    <div className={`text-xs ${stats.overallProgress >= 100 ? 'text-green-200' : 'text-gray-500'}`}>
                      100%
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningTemplate; 