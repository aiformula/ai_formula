/**
 * Perplexity Complete Course Learning Module
 * @fileoverview Perplexity 完整教學實戰課程學習頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  Target, TrendingUp, Award, Zap, Star, Trophy, Calendar,
  BarChart3, Users, MessageSquare, Bookmark, RotateCcw, ChevronDown, Lock
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePerplexityProgress } from '@/hooks/usePerplexityProgress'; // Perplexity 進度追蹤
import { perplexityCourseData } from '@/data/perplexity-complete-course-data';

const PerplexityCompleteCourseLearning: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const isZhHK = language === 'zh-HK';
  
  // 獲取用戶顯示名稱嘅函數
  const getUserDisplayName = () => {
    if (!user?.email) return isZhHK ? '學習者' : 'Learner';
    const username = user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  // 🎯 手風琴狀態管理
  const [expandedThemes, setExpandedThemes] = useState<Set<number>>(new Set());
  
  // 🎯 使用進度追蹤 Hook
  const { 
    isThemeCompleted,
    getThemeProgress,
    getProgressStats,
    resetProgress,
    completeQuiz,
    completeUnit,
    themeProgress,
    courseStats
  } = usePerplexityProgress();

  // 獲取實時統計數據
  const stats = getProgressStats();

  // 🎯 獲取真實的學習時間數據
  const totalLearningMinutes = stats.totalTimeSpent;
  const formattedLearningTime = (() => {
    const totalSeconds = totalLearningMinutes * 60; // 將分鐘轉換為秒
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    // 選擇顯示格式：可以改為簡潔格式或保持 HH:MM:SS
    const useCompactFormat = true; // 設為 true 使用 "2h 32m" 格式
    
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
  })();

  // Perplexity 完整教學課程規劃大綱
  const courseData = {
    ...perplexityCourseData.courseInfo,
    themes: perplexityCourseData.courseModules,
    faqData: perplexityCourseData.faqData,
    isFree: perplexityCourseData.isFree
  };

  // 切換主題展開狀態 (EXACTLY like ChatGPT)
  const toggleTheme = (themeId: number) => {
    setExpandedThemes(prevSet => {
      const newSet = new Set(prevSet);
      if (newSet.has(themeId)) {
        newSet.delete(themeId);
      } else {
        newSet.add(themeId);
      }
      return newSet;
    });
  };

  // 🎯 初始化展開狀態 - 當前學習的主題自動展開
  React.useEffect(() => {
    const currentTheme = courseData.themes.find(theme => 
      theme.lessons.some(lesson => lesson.current)
    );
    if (currentTheme && !expandedThemes.has(currentTheme.id)) {
      setExpandedThemes(prev => new Set([...prev, currentTheme.id]));
    }
  }, [courseData.themes]);

  // 🎯 判斷單元是否被鎖定
  const isUnitLocked = (themeId: number, lessonIndex: number) => {
    if (themeId === 1 && lessonIndex === 0) return false; // 第一個單元永遠不鎖定
    
    const theme = courseData.themes.find(t => t.id === themeId);
    if (!theme) return true;
    
    if (lessonIndex === 0) {
      // 主題的第一個單元，檢查前一個主題是否完成
      return !isThemeCompleted(themeId - 1);
    } else {
      // 主題內的其他單元，檢查前一個單元是否完成
      const prevLesson = theme.lessons[lessonIndex - 1];
      return !prevLesson.completed;
    }
  };

  // 🎯 技能評估數據 (與 ChatGPT 結構相同)
  const skills = [
    { name: '搜尋策略設計', percentage: stats.totalProgress * 0.8 },
    { name: '資訊驗證能力', percentage: stats.totalProgress * 0.9 },
    { name: 'AI 工具整合', percentage: stats.totalProgress * 0.7 },
    { name: '知識管理技巧', percentage: stats.totalProgress * 0.85 },
    { name: '批判思維應用', percentage: stats.totalProgress * 0.75 }
  ];

  // 🎯 成就系統 - 100% ChatGPT Design
  const achievements = [
    { icon: Trophy, label: isZhHK ? 'Perplexity 學習達人' : 'Perplexity Learning Expert', type: 'gold' },
    { icon: Star, label: isZhHK ? '搜尋工程師' : 'Search Engineer', type: 'silver' }
  ];

  return (
    <div className="min-h-screen perplexity-learning-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/courses/perplexity-complete-course/outline')}
          className="breadcrumb-item mb-6 text-white/70 hover:text-white flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isZhHK ? '返回課程大綱' : 'Back to Course Overview'}</span>
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
                  Perplexity 完整教學實戰課程
                </h1>
                <div className="flex items-center space-x-2 mb-1">
                  {stats.totalProgress === 100 ? (
                    <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  ) : stats.totalProgress > 0 ? (
                    <Zap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <Star className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-status">
                    {stats.totalProgress === 100 ? (
                      isZhHK ? '🎉 恭喜！課程完成！' : '🎉 Congratulations! Course Completed!'
                    ) : stats.totalProgress > 0 ? (
                      isZhHK ? `${getUserDisplayName()} 🚀 正在學習中` : `${getUserDisplayName()} 🚀 Learning in Progress`
                    ) : (
                      isZhHK ? '👋 歡迎開始學習！' : '👋 Welcome to Learning!'
                    )}
                  </span>
                </div>
                <p className="text-body">
                  {stats.totalProgress === 100 ? (
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
                    <span className="text-label">總進度</span>
                  </div>
                  <div className="text-data text-white mb-1">{stats.totalProgress}%</div>
                  <div className="text-caption">已完成課程</div>
                </div>
                
                {/* Time Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <Clock className="w-5 h-5 text-gray-400 mr-1" />
                    <span className="text-label">學習時間</span>
                  </div>
                  <div className="text-data text-white mb-1">{formattedLearningTime}</div>
                  <div className="text-caption">累計時間</div>
                </div>
                
                {/* Themes Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <Users className="w-5 h-5 text-gray-400 mr-1" />
                    <span className="text-label">完成主題</span>
                  </div>
                  <div className="text-data text-white mb-1">{stats.completedThemes}/{stats.totalThemes}</div>
                  <div className="text-caption">主題進度</div>
                </div>
                
              </div>
            </div>

            {/* Right Section - Action Buttons (25% width) */}
            <div className="lg:col-span-3">
              <div className="space-y-3">
                
                {/* Primary Action - Continue Learning */}
                <Button
                  className="w-full btn-primary-action"
                  onClick={() => {
                    // 找到當前需要學習的單元
                    for (const theme of courseData.themes) {
                      const currentLessonIndex = theme.lessons.findIndex(lesson => lesson.current);
                      if (currentLessonIndex !== -1) {
                        const actualLessonId = theme.lessons[currentLessonIndex]?.id || currentLessonIndex + 1;
                        console.log(`Header Continue: theme ${theme.id}, lesson ID ${actualLessonId} (lesson index ${currentLessonIndex})`);
                        navigate(`/courses/perplexity-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                        return;
                      }
                    }
                    console.log('Header fallback: navigating to theme 1 lesson 1');
                    navigate('/courses/perplexity-complete-course/theme/1/unit/1');
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isZhHK ? '繼續學習' : 'Continue Learning'}
                </Button>

                {/* Secondary Action - Browse All */}
                {stats.totalProgress > 0 && (
                  <Button
                    variant="ghost"
                    className="w-full btn-secondary-action"
                    onClick={() => navigate('/courses/perplexity-complete-course/outline')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {isZhHK ? '瀏覽課程' : 'Browse Course'}
                  </Button>
                )}

                {/* Secondary Action - Reset Progress */}
                {process.env.NODE_ENV === 'development' && (
                  <Button
                    className="w-full btn-secondary-action"
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
              <span className="text-body">
                整體學習進度
              </span>
              <span className="text-body">
                {stats.totalProgress}% 已完成
              </span>
            </div>
            <div className="progress-bar progress-bar-large">
              <div 
                className="progress-bar-fill transition-all duration-700 ease-out" 
                style={{width: `${stats.totalProgress}%`}}
              ></div>
            </div>
          </div>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Modules (NEW ACCORDION DESIGN) */}
          <div className="lg:col-span-2">
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="content-section-header">
                <BookOpen className="w-6 h-6 text-gray-400 mr-3" />
                <h3 className="text-h2">課程模塊</h3>
              </div>

              {/* 🎯 NEW: Accordion Style Course Modules */}
              <div className="space-y-4">
                {courseData.themes.map((theme, index) => (
                  <motion.section
                    key={theme.id}
                    className={`theme-accordion bg-gray-800/30 rounded-xl border overflow-hidden transition-all duration-300 ${
                      theme.completed ? 'border-green-400/30 bg-green-400/5' : 
                      theme.lessons.some(lesson => lesson.current) ? 'border-gray-600/50 bg-gray-800/30' :
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
                      className="theme-header cursor-pointer p-6 hover:bg-white/5 transition-colors duration-200"
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
                            {/* Module Number Badge - Square like ChatGPT */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-data mr-4 ${
                              theme.completed ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'
                            }`}>
                              {theme.completed ? <CheckCircle className="w-6 h-6" /> : theme.id}
                            </div>
                            
                            {/* Module Title & Description */}
                            <div className="min-w-0 flex-1">
                              <h3 className="text-theme-title leading-tight mb-1">
                                第{theme.id}大主題・{theme.title}
                              </h3>
                              <p className="text-body leading-relaxed line-clamp-2">
                                {theme.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Progress Section */}
                          <div className="ml-16">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-label">主題進度</span>
                              <span className="text-caption text-gray-400">
                                {theme.lessons.filter(l => l.completed).length}/{theme.lessons.length} 完成 ({theme.progress}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gray-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${theme.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Chevron Icon */}
                        <div className="flex-shrink-0 ml-4">
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                              expandedThemes.has(theme.id) ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </header>

                    {/* 🎯 Accordion Content (Lesson List) - 100% ChatGPT Design */}
                    <AnimatePresence>
                      {expandedThemes.has(theme.id) && (
                        <motion.div
                          id={`theme-${theme.id}-content`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            {/* 🎯 Compact Lesson List */}
                            <ul className="space-y-2">
                              {theme.lessons.map((lesson, lessonIndex) => {
                                const isLocked = isUnitLocked(theme.id, lessonIndex);
                                
                                return (
                                  <motion.li
                                    key={lesson.id}
                                    className={`lesson-item group ${
                                      isLocked ? 'lesson-locked' : 
                                      lesson.completed ? 'lesson-completed' : 
                                      lesson.current ? 'lesson-current' : 'lesson-todo'
                                    }`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: lessonIndex * 0.05 }}
                                    onClick={() => {
                                      if (!isLocked) {
                                        const actualLessonId = lesson.id || lessonIndex + 1;
                                        console.log(`Unit Click: theme ${theme.id}, lesson ID ${actualLessonId} (lesson index ${lessonIndex})`);
                                        navigate(`/courses/perplexity-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center px-4 py-3 rounded-lg transition-all duration-200">
                                      {/* Lesson Status Icon */}
                                      <div className="flex-shrink-0 mr-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                          isLocked ? 'bg-gray-700 text-gray-500' :
                                          lesson.completed ? 'bg-green-500 text-white' : 
                                          lesson.current ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300'
                                        }`}>
                                          {isLocked ? (
                                            <Lock className="w-4 h-4" />
                                          ) : lesson.completed ? (
                                            <CheckCircle className="w-5 h-5 text-white" />
                                          ) : lesson.current ? (
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
                                              <span className={`text-caption mr-3 ${
                                                isLocked ? 'text-gray-500' :
                                                lesson.current ? 'text-gray-300' : 'text-gray-400'
                                              }`}>
                                                {theme.id}.{lessonIndex + 1}
                                              </span>
                                              <h4 className={`text-unit-title leading-tight ${
                                                isLocked ? 'text-gray-500' :
                                                lesson.completed ? 'text-gray-300 line-through decoration-gray-500' : 
                                                lesson.current ? 'text-white' : 'text-white group-hover:text-gray-200'
                                              }`}>
                                                {lesson.title}
                                              </h4>
                                            </div>
                                            <div className={`flex items-center text-caption ${
                                              isLocked ? 'text-gray-600' : 'text-gray-400'
                                            }`}>
                                              <Clock className="w-4 h-4 mr-1" />
                                              <span>{lesson.duration || '30分鐘'}</span>
                                              {lesson.current && (
                                                <>
                                                  <span className="mx-2">•</span>
                                                  <span className="text-caption text-gray-300">進行中</span>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                          
                                          {/* Action Button */}
                                          <div className="flex-shrink-0 ml-4">
                                            {isLocked ? (
                                              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-caption bg-gray-700 text-gray-400">
                                                <Lock className="w-4 h-4 mr-1" />
                                                已鎖定
                                              </span>
                                            ) : lesson.completed ? (
                                              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-caption bg-green-100 text-green-700">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                已完成
                                              </span>
                                            ) : lesson.current ? (
                                              <Button
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const actualLessonId = lesson.id || lessonIndex + 1;
                                                  console.log(`Continue Learning: theme ${theme.id}, lesson ID ${actualLessonId} (lesson index ${lessonIndex})`);
                                                  navigate(`/courses/perplexity-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                                                }}
                                              >
                                                <Play className="w-4 h-4 mr-2" />
                                                繼續學習
                                              </Button>
                                            ) : (
                                              <Button
                                                variant="outline"
                                                className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 hover:text-gray-200 px-4 py-2"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const actualLessonId = lesson.id || lessonIndex + 1;
                                                  console.log(`Start Learning: theme ${theme.id}, lesson ID ${actualLessonId} (lesson index ${lessonIndex})`);
                                                  navigate(`/courses/perplexity-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                                                }}
                                              >
                                                <Play className="w-4 h-4 mr-2" />
                                                開始學習
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

                            {/* 🎯 Quiz Section - Added for ALL THEMES 1-6 */}
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
                                    <h4 className="text-h3 text-yellow-300">
                                      {isZhHK ? `第${theme.id}章測驗：${theme.title.split('—')[0]}` : `Chapter ${theme.id} Quiz: ${theme.title.split('—')[0]}`}
                                    </h4>
                                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                                      {isZhHK ? '測驗' : 'Quiz'}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-body text-yellow-100/80 mb-4 leading-relaxed">
                                    {isZhHK ? 
                                      '測試您對本章節內容的理解程度，鞏固學習成果。' : 
                                      'Test your understanding of this chapter\'s content and consolidate learning outcomes.'
                                    }
                                  </p>
                                  
                                  <Button
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
                                    onClick={() => navigate(`/courses/perplexity-complete-course/theme/${theme.id}/quiz`)}
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

          {/* Right Column - Skills & Progress (UNCHANGED) */}
          <div className="space-y-6">
            {/* Skills Radar - IMPROVED */}
            <motion.div 
              className="skills-radar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-h2 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-gray-400" />
                  技能發展追蹤
                </h3>
                <div className="learning-progress-percentage text-white">
                  {stats.totalProgress}%
                </div>
              </div>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
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
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                    <span className="skill-percentage text-white">{Math.round(skill.percentage)}%</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                  <Trophy className="w-4 h-4" />
                  <span className="text-h3">學習成就</span>
                </div>
                <p className="text-caption">Perplexity 完整教學實戰課程</p>
              </div>
            </motion.div>

            {/* Learning Progress Overview - IMPROVED */}
            <motion.div 
              className="learning-progress-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-h2 flex items-center mb-6">
                <Calendar className="w-5 h-5 mr-2 text-green-400" />
                學習進度總覽
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <div className="text-data text-gray-300 mb-1">{stats.completedThemes}</div>
                  <div className="text-label">已完成主題</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <div className="text-data text-gray-300 mb-1">{stats.totalThemes - stats.completedThemes}</div>
                  <div className="text-label">剩餘主題</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-caption">學習時間</span>
                  <span className="text-body">{formattedLearningTime}</span>
                </div>
                
                <div className="learning-streak border border-orange-500/20 bg-orange-500/10">
                  <Zap className="learning-streak-icon text-orange-400" />
                  <span className="learning-streak-text text-orange-300">
                    下一步
                  </span>
                </div>
                    
                <div className="text-center pt-4">
                  <p className="text-caption mb-2">
                    {(() => {
                      // 找到當前學習的單元
                      for (const theme of courseData.themes) {
                        const currentLesson = theme.lessons.find(lesson => lesson.current);
                        if (currentLesson) {
                          return `單元 ${currentLesson.id}：${currentLesson.title.slice(0, 15)}...`;
                        }
                      }
                      return '所有單元已完成！';
                    })()}
                  </p>
                  <Button
                    className="btn-accent w-full"
                    onClick={() => {
                      // 找到當前需要學習的單元
                      for (const theme of courseData.themes) {
                        const currentLessonIndex = theme.lessons.findIndex(lesson => lesson.current);
                        if (currentLessonIndex !== -1) {
                          const actualLessonId = theme.lessons[currentLessonIndex]?.id || currentLessonIndex + 1;
                          console.log(`Sidebar Continue: theme ${theme.id}, lesson ID ${actualLessonId} (lesson index ${currentLessonIndex})`);
                          navigate(`/courses/perplexity-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                          return;
                        }
                      }
                      console.log('Sidebar fallback: navigating to theme 1 lesson 1');
                      navigate('/courses/perplexity-complete-course/theme/1/unit/1');
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    繼續學習
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-gray-700/30 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2 text-green-400 text-caption">
                  <Target className="w-4 h-4" />
                  <span>6大學習里程碑</span>
                </div>
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-h2 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                成就徽章
              </h3>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className={`achievement-badge-${achievement.type} text-caption`}
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
  );
};

export default PerplexityCompleteCourseLearning; 