/**
 * Course Learning Template
 * @description 通用課程學習頁面模板，100% 複製 ChatGPT 設計
 * @author AI Formula Team  
 * @version 3.1.0
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
  
  // 展開狀態管理
  const [expandedThemes, setExpandedThemes] = useState<Set<number>>(new Set([1]));

  // 獲取課程配置
  const courseConfig = courseConfigs[courseId];
  if (!courseConfig) {
    return <div>Course not found: {courseId}</div>;
  }

  const { dataSource, progressHook, themeColor, accentColor, baseRoute, cssPrefix } = courseConfig;

  // Progress tracking hooks
  const { 
    isThemeCompleted,
    getThemeProgress,
    getProgressStats,
    resetProgress,
    completeQuiz,
    completeUnit,
    themeProgress,
    courseStats,
    progressState
  } = progressHook();

  // 獲取用戶顯示名稱
  const getUserDisplayName = () => {
    if (!user?.email) return isZhHK ? '學習者' : 'Learner';
    const username = user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  // 獲取統計數據
  const stats = getProgressStats();
  
  // Debug: 檢查perplexity progress數據
  if (courseId === 'perplexity') {
    console.log('🔍 Perplexity Debug - Raw stats:', stats);
    console.log('🔍 Perplexity Debug - progressState:', progressState);
  }
  
  // 統一化進度字段名稱，確保template兼容所有課程
  const normalizedStats = {
    ...stats,
    overallProgress: stats.overallProgress || stats.totalProgress || 0,
    totalTimeSpent: stats.totalTimeSpent || 0,
    completedThemes: stats.completedThemes || 0,
    totalThemes: stats.totalThemes || 0,
    completedUnits: stats.completedUnits || 0,
    totalUnits: stats.totalUnits || 0
  };
  
  // Debug: 檢查normalized stats
  if (courseId === 'perplexity') {
    console.log('✅ Perplexity Debug - Normalized stats:', normalizedStats);
  }
  
  const totalLearningMinutes = normalizedStats.totalTimeSpent;

  // 格式化學習時間
  const formattedLearningTime = useMemo(() => {
    const totalSeconds = totalLearningMinutes * 60;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return hours + 'h ' + minutes + 'm';
    } else {
      return minutes + 'm';
    }
  }, [totalLearningMinutes]);

  // 課程數據結構
  const courseData = {
    title: isZhHK ? dataSource.courseInfo.title : (dataSource.courseInfo.titleEn || dataSource.courseInfo.title),
    completedHours: totalLearningMinutes,
    totalHours: 400,
    actualLearningTime: formattedLearningTime,
    totalThemes: normalizedStats.totalThemes,
    completedThemes: normalizedStats.completedThemes,
    learningStreak: 5,
    
    themes: dataSource.courseModules.map((module: any) => ({
      id: module.id,
      title: isZhHK ? module.title : (module.titleEn || module.title),
      description: isZhHK ? module.description : (module.descriptionEn || module.description),
      progress: (() => {
        const progress = getThemeProgress(module.id);
        return progress ? progress.progressPercentage : 0;
      })(),
      completed: isThemeCompleted(module.id),
      units: module.lessons.map((lesson: any, index: number) => {
        const themeUnits = progressState.completedUnits?.[module.id] || [];
        const isCompleted = Array.isArray(themeUnits) 
          ? themeUnits.includes(lesson.id)
          : false;
        
        return {
          id: lesson.id,
          title: isZhHK ? lesson.title : (lesson.titleEn || lesson.title),
          duration: isZhHK ? (lesson.duration || '30分鐘') : (lesson.durationEn || lesson.duration || '30 minutes'),
          completed: isCompleted,
          current: false,
          description: isZhHK ? lesson.description : (lesson.descriptionEn || lesson.description)
        };
      })
    }))
  };

  // 切換主題展開狀態
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
    <div className="min-h-screen chatgpt-learning-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          className="breadcrumb-item mb-6 text-white/70 hover:text-white flex items-center space-x-2"
          onClick={() => navigate(baseRoute)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isZhHK ? '返回課程大綱' : 'Back to Course Outline'}</span>
        </motion.button>

        {/* Dashboard Header - Three-Section Layout */}
        <motion.div 
          className="bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Section - Identity & Status (30% width) */}
            <div className="lg:col-span-4">
              <div className="min-w-0">
                <h1 className="text-h1 mb-1 truncate">
                  {courseData.title}
                </h1>
                <div className="flex items-center space-x-2 mb-1">
                  {normalizedStats.overallProgress === 100 ? (
                    <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  ) : normalizedStats.overallProgress > 0 ? (
                    <Zap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <Star className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-status">
                    {normalizedStats.overallProgress === 100 ? (
                      isZhHK ? '🎉 恭喜！課程完成！' : '🎉 Congratulations! Course Completed!'
                    ) : normalizedStats.overallProgress > 0 ? (
                      isZhHK ? '🚀 正在學習中' : '🚀 Learning in Progress'
                    ) : (
                      isZhHK ? '👋 歡迎開始學習！' : '👋 Welcome to Learning!'
                    )}
                  </span>
                </div>
                <p className="text-body">
                  {normalizedStats.overallProgress === 100 ? (
                    isZhHK ? '全部內容已解鎖' : 'All content unlocked'
                  ) : (
                    isZhHK ? '互動課程・隨時學習' : 'Interactive • Learn anytime'
                  )}
                </p>
              </div>
            </div>

            {/* Center Section - Core Metrics (45% width) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-4">
                
                {/* Progress Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <BarChart3 className="w-5 h-5 text-gray-400 mr-1" />
                    <span className="stat-card-title text-label">總進度</span>
                  </div>
                  <div className="text-2xl font-bold mb-1 text-white">{normalizedStats.overallProgress}%</div>
                  <div className="text-caption">
                    {normalizedStats.overallProgress === 100 ? (isZhHK ? '已達成目標' : 'Goal Achieved') : (isZhHK ? '持續進步中' : 'In Progress')}
                  </div>
                </div>

                {/* Learning Time Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <Clock className="w-5 h-5 text-green-400 mr-1" />
                    <span className="stat-card-title text-label">{isZhHK ? '學習時間' : 'Study Time'}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1 font-mono text-white">{formattedLearningTime}</div>
                  <div className="text-caption">{isZhHK ? '累積時長' : 'Total Time'}</div>
                </div>

                {/* Completed Themes Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <BookOpen className="w-5 h-5 text-gray-400 mr-1" />
                    <span className="stat-card-title text-label">{isZhHK ? '完成主題' : 'Completed Themes'}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1 text-white">
                    {normalizedStats.completedThemes}/{normalizedStats.totalThemes}
                  </div>
                  <div className="text-caption">
                    {normalizedStats.completedThemes === normalizedStats.totalThemes ? (isZhHK ? '全部完成' : 'All Complete') : (isZhHK ? '學習中' : 'Learning')}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Section - Primary Actions (25% width) */}
            <div className="lg:col-span-3 flex flex-col space-y-3">
              
              {/* Primary CTA Button */}
              {normalizedStats.overallProgress < 100 ? (
                <Button 
                  className="w-full btn-primary-action"
                  onClick={() => {
                    for (const theme of courseData.themes) {
                      for (const [unitIndex, unit] of theme.units.entries()) {
                        if (!unit.completed) {
                          navigate(baseRoute + '/theme/' + theme.id + '/unit/' + unit.id);
                          return;
                        }
                      }
                    }
                    navigate(baseRoute + '/theme/1/unit/1');
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {isZhHK ? '繼續學習' : 'Continue Learning'}
                </Button>
              ) : (
                <Button 
                  className="w-full btn-primary-action"
                  onClick={() => navigate(baseRoute)}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  {isZhHK ? '查看課程證書' : 'View Certificate'}
                </Button>
              )}

            </div>

          </div>

          {/* Progress Bar - Full Width at Bottom */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-body">
                {isZhHK ? '整體學習進度' : 'Overall Learning Progress'}
              </span>
              <span className="text-body">
                {normalizedStats.overallProgress}% {isZhHK ? '已完成' : 'completed'}
              </span>
            </div>
            <div className="progress-bar progress-bar-large">
              <div 
                className="progress-bar-fill transition-all duration-700 ease-out" 
                style={{width: normalizedStats.overallProgress + '%'}}
              ></div>
            </div>
          </div>

        </motion.div>

        {/* Course Modules */}
        <div className="grid lg:grid-cols-3 gap-8">
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

              <div className="space-y-4">
                {courseData.themes.map((theme, index) => (
                  <motion.section
                    key={theme.id}
                    className={'bg-gray-800/30 rounded-xl border overflow-hidden transition-all duration-300 ' + 
                      (theme.completed ? 'border-green-400/30 bg-green-400/5' : 
                      theme.units.some(unit => unit.current) ? 'border-gray-600/50 bg-gray-800/30' :
                      'border-gray-600/30')}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.3 + index * 0.1, 
                      duration: 0.4
                    }}
                  >
                    <header 
                      className="cursor-pointer p-6 hover:bg-white/5 transition-colors duration-200"
                      onClick={() => toggleTheme(theme.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-3">
                            <Badge className="bg-green-500/20 text-green-300 mr-3">
                              {isZhHK ? '第 ' + theme.id + ' 章' : 'Chapter ' + theme.id}
                            </Badge>
                            <span className="text-sm text-gray-400">
                              {theme.units.filter(u => u.completed).length}/{theme.units.length} {isZhHK ? '完成' : 'completed'}
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
                          
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-500">
                                {isZhHK ? '主題進度' : 'Theme Progress'}
                              </span>
                              <span className="text-xs text-gray-400">
                                {theme.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-green-400 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: theme.progress + '%' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 ml-4">
                          <ChevronDown 
                            className={'w-5 h-5 text-gray-400 transform transition-transform duration-200 ' + 
                              (expandedThemes.has(theme.id) ? 'rotate-180' : '')}
                          />
                        </div>
                      </div>
                    </header>

                    <AnimatePresence>
                      {expandedThemes.has(theme.id) && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            {/* Compact Lesson List */}
                            <ul className="space-y-2">
                              {theme.units.map((unit, unitIndex) => {
                                const isLocked = false; // Template doesn't use locking
                                
                                return (
                                  <motion.li
                                    key={unit.id}
                                    className={'lesson-item group ' + 
                                      (unit.completed ? 'lesson-completed' : 
                                      unit.current ? 'lesson-current' : 'lesson-todo')}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: unitIndex * 0.05 }}
                                  >
                                    <div 
                                      className={'flex items-center p-4 rounded-lg border transition-all duration-150 ' +
                                        (unit.completed ? 'border-green-400/30 bg-green-400/5 hover:bg-green-400/10' : 
                                        unit.current ? 'border-gray-500/50 bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer' : 
                                        'border-gray-600/30 bg-gray-700/20 hover:bg-gray-600/20 cursor-pointer')}
                                      onClick={() => {
                                        navigate(baseRoute + '/theme/' + theme.id + '/unit/' + unit.id);
                                      }}
                                    >
                                      {/* Status Icon */}
                                      <div className="flex-shrink-0 mr-4">
                                        <div className={'w-8 h-8 rounded-full flex items-center justify-center ' +
                                          (unit.completed ? 'bg-green-500' : 
                                          unit.current ? 'bg-gray-600 animate-pulse' : 'bg-gray-500')}>
                                          {unit.completed ? (
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
                                              <span className={'text-xs mr-3 ' +
                                                (unit.current ? 'text-gray-300' : 'text-gray-400')}>
                                                {theme.id}.{unitIndex + 1}
                                              </span>
                                              <h4 className={'text-sm font-medium leading-tight ' +
                                                (unit.completed ? 'text-gray-300 line-through decoration-gray-500' : 
                                                unit.current ? 'text-white' : 'text-white group-hover:text-gray-200')}>
                                                {unit.title}
                                              </h4>
                                            </div>
                                            <div className={'flex items-center text-xs ' +
                                              'text-gray-400'}>
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
                                            {unit.completed ? (
                                              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs bg-green-100 text-green-700">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                {isZhHK ? '已完成' : 'Completed'}
                                              </span>
                                            ) : unit.current ? (
                                              <Button
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  navigate(baseRoute + '/theme/' + theme.id + '/unit/' + unit.id);
                                                }}
                                              >
                                                <Play className="w-4 h-4 mr-2" />
                                                {isZhHK ? '繼續學習' : 'Continue Learning'}
                                              </Button>
                                            ) : (
                                              <Button
                                                variant="outline"
                                                className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 hover:text-gray-200 px-4 py-2"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  navigate(baseRoute + '/theme/' + theme.id + '/unit/' + unit.id);
                                                }}
                                              >
                                                <Play className="w-4 h-4 mr-2" />
                                                {isZhHK ? '開始學習' : 'Start Learning'}
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.li>
                                );
                              })}
                            </ul>

                            {/* Quiz Section - CRITICAL MISSING PART */}
                            <motion.div
                              className="mt-6 p-5 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-lg border border-yellow-500/30"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="flex items-start space-x-4">
                                {/* Quiz Icon */}
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-white" />
                                  </div>
                                </div>
                                
                                {/* Quiz Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-lg font-semibold text-yellow-300">
                                      {isZhHK ? '第' + theme.id + '章測驗：' + theme.title : 'Chapter ' + theme.id + ' Quiz: ' + theme.title}
                                    </h4>
                                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                                      {isZhHK ? '測驗' : 'Quiz'}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-sm text-yellow-100/80 mb-4 leading-relaxed">
                                    {isZhHK ? 
                                      '測試您對本章節內容的理解程度，鞏固所學知識並檢驗學習成果。' : 
                                      'Test your understanding of this chapter content, consolidate your knowledge and verify learning outcomes.'}
                                  </p>
                                  
                                  {/* Quiz Info */}
                                  <div className="flex items-center space-x-6 mb-4 text-xs text-yellow-200/70">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-4 h-4" />
                                      <span>{isZhHK ? '15分鐘' : '15 minutes'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Target className="w-4 h-4" />
                                      <span>{isZhHK ? '5道題目' : '5 questions'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Award className="w-4 h-4" />
                                      <span>{isZhHK ? '60%及格' : '60% to pass'}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Action Button */}
                                  <Button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2"
                                    onClick={() => navigate(baseRoute + '/theme/' + theme.id + '/quiz')}
                                  >
                                    <Target className="w-4 h-4 mr-2" />
                                    {isZhHK ? '開始測驗' : 'Start Quiz'}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Skills Development Tracking - 100% ChatGPT Design */}
              <motion.div 
                className="skills-radar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-h2 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-gray-400" />
                    {isZhHK ? '技能發展追蹤' : 'Skills Development Tracking'}
                  </h3>
                  <div className="learning-progress-percentage text-white">
                    {normalizedStats.overallProgress}%
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: isZhHK ? '基礎操作' : 'Basic Operations', percentage: Math.min(normalizedStats.overallProgress + 10, 100) },
                    { name: isZhHK ? 'Prompt 設計' : 'Prompt Design', percentage: Math.max(0, Math.min(normalizedStats.overallProgress - 5, 100)) },
                    { name: isZhHK ? '工具整合' : 'Tool Integration', percentage: Math.max(0, Math.min(normalizedStats.overallProgress - 15, 100)) },
                    { name: isZhHK ? '商業應用' : 'Business Application', percentage: Math.max(0, Math.min(normalizedStats.overallProgress - 20, 100)) },
                    { name: isZhHK ? '創意發想' : 'Creative Thinking', percentage: Math.max(0, Math.min(normalizedStats.overallProgress - 10, 100)) }
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <span className="skill-name text-white/80">{skill.name}</span>
                      <div className="skill-progress">
                        <div className="progress-bar">
                          <motion.div 
                            className="progress-bar-fill" 
                            initial={{ width: 0 }}
                            animate={{ width: skill.percentage + '%' }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                          ></motion.div>
                        </div>
                      </div>
                      <span className="skill-percentage text-white">{skill.percentage}%</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                    <Trophy className="w-4 h-4" />
                    <span className="text-h3">{isZhHK ? '學習成就' : 'Learning Achievements'}</span>
                  </div>
                  <p className="text-caption">
                    {isZhHK ? courseData.title + ' 完整教學實戰課程' : courseData.title + ' Complete Practical Course'}
                  </p>
                </div>
              </motion.div>

              {/* Learning Progress Overview - 100% ChatGPT Design */}
              <motion.div 
                className="learning-progress-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-h2 flex items-center mb-6">
                  <Calendar className="w-5 h-5 mr-2 text-green-400" />
                  {isZhHK ? '學習進度總覽' : 'Learning Progress Overview'}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                    <div className="text-data text-gray-300 mb-1">{normalizedStats.completedThemes}</div>
                    <div className="text-label">{isZhHK ? '已完成主題' : 'Completed Themes'}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                    <div className="text-data text-gray-300 mb-1">{normalizedStats.totalThemes - normalizedStats.completedThemes}</div>
                    <div className="text-label">{isZhHK ? '剩餘主題' : 'Remaining Themes'}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-caption">{isZhHK ? '學習時間' : 'Study Time'}</span>
                    <span className="text-body">{formattedLearningTime}</span>
                  </div>
                  
                  <div className="learning-streak border border-orange-500/20 bg-orange-500/10">
                    <Zap className="learning-streak-icon text-orange-400" />
                    <span className="learning-streak-text text-orange-300">
                      {isZhHK ? '下一步' : 'Next Step'}
                    </span>
                  </div>
                  
                  <div className="text-center pt-4">
                    <p className="text-caption mb-2">
                      {normalizedStats.overallProgress < 100 ? 
                        (isZhHK ? '繼續您的學習旅程' : 'Continue your learning journey') :
                        (isZhHK ? '恭喜完成所有課程！' : 'Congratulations on completing all courses!')
                      }
                    </p>
                    <Button 
                      className="w-full btn-primary-action"
                      onClick={() => {
                        for (const theme of courseData.themes) {
                          for (const [unitIndex, unit] of theme.units.entries()) {
                            if (!unit.completed) {
                              navigate(baseRoute + '/theme/' + theme.id + '/unit/' + unit.id);
                              return;
                            }
                          }
                        }
                        navigate(baseRoute + '/theme/1/unit/1');
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isZhHK ? '繼續學習' : 'Continue Learning'}
                    </Button>
                  </div>

                  <div className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-gray-700/30 rounded-lg border border-green-500/20">
                    <div className="flex items-center space-x-2 text-green-400 text-caption">
                      <Target className="w-4 h-4" />
                      <span>{isZhHK ? normalizedStats.totalThemes + '大學習里程碑' : normalizedStats.totalThemes + ' Learning Milestones'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Achievement Badges - 100% ChatGPT Design */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-h2 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  {isZhHK ? '成就徽章' : 'Achievement Badges'}
                </h3>
                
                <div className="space-y-3">
                  {[
                    { 
                      icon: Trophy, 
                      label: isZhHK ? courseData.title + ' 學習達人' : courseData.title + ' Learning Expert', 
                      type: 'gold',
                      unlocked: normalizedStats.overallProgress >= 80
                    },
                    { 
                      icon: Star, 
                      label: isZhHK ? 'Prompt 工程師' : 'Prompt Engineer', 
                      type: 'silver',
                      unlocked: normalizedStats.overallProgress >= 50
                    }
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      className={'achievement-badge-' + achievement.type + ' text-caption'}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <achievement.icon className="w-4 h-4 mr-2" />
                      {achievement.label}
                    </motion.div>
                  ))}
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