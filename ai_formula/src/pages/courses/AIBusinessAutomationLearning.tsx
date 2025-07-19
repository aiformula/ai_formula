import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  Target, TrendingUp, Award, Zap, Star, Trophy, Calendar,
  BarChart3, Users, MessageSquare, Bookmark, RotateCcw
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAIAutomationProgress } from '@/hooks/useAIAutomationProgress'; // 新增：進度追蹤

const AIBusinessAutomationLearning: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  // 🎯 使用進度追蹤 Hook
  const { 
    isUnitCompleted,
    isThemeCompleted,
    getThemeProgress,
    getProgressStats,
    resetProgress,
    markQuizCompleted, // 新增：標記測驗完成
    markUnitCompleted, // 新增：標記單元完成
    progress, // 新增：獲取完整的progress對象用於調試
    fixProgressCalculation, // 新增：修復進度計算
    getDetailedDebugInfo, // 新增：獲取調試信息
    getTotalLearningTimeInSeconds, // 🎯 新增：獲取總學習時間（秒）
    formatTotalLearningTime // 🎯 新增：格式化總學習時間
  } = useAIAutomationProgress();

  // 獲取實時統計數據
  const stats = getProgressStats();

  // 🎯 獲取真實的學習時間數據
  const totalLearningTimeSeconds = getTotalLearningTimeInSeconds();
  const formattedLearningTime = formatTotalLearningTime();
  const totalLearningMinutes = Math.floor(totalLearningTimeSeconds / 60);

  // 模擬課程數據（更新為使用實際進度和學習時間）
  const courseData = {
    title: isZhHK ? 'AI 商業自動化實戰' : 'AI Business Automation',
    completedHours: totalLearningMinutes, // 🎯 使用真實的學習時間
    totalHours: 55, // 預估總課程時間
    actualLearningTime: formattedLearningTime, // 🎯 新增：格式化的真實學習時間
    totalThemes: stats.totalThemes,
    completedUnits: stats.completedUnits,
    learningStreak: 7,
    
    themes: [
      {
        id: 1,
        title: isZhHK ? 'AI 商業自動化基礎：為你的事業裝上智慧引擎' : 'AI Business Automation Basics',
        description: isZhHK ? '本章節將深入了解什麼是 AI 自動化，以及它如何為您的企業節省時間、降低成本，成為最聰明的競爭優勢。' : 'This chapter will help you understand what AI automation is.',
        progress: Math.round((getThemeProgress(1).unitsCompleted / 3) * 100),
        units: [
          {
            id: 1,
            title: isZhHK ? '什麼是「AI 商業自動化」？不只是取代人力，更是升級戰力！' : 'What is AI Business Automation?',
            completed: isUnitCompleted('t1-u1'),
            current: !isUnitCompleted('t1-u1') // 如果未完成就是當前
          },
          {
            id: 2,
            title: isZhHK ? '為什麼現在必須導入？三大核心優勢：省時、省錢、防錯' : 'Why implement now? Three core advantages',
            completed: isUnitCompleted('t1-u2'),
            current: isUnitCompleted('t1-u1') && !isUnitCompleted('t1-u2')
          },
          {
            id: 3,
            title: isZhHK ? '認識你的自動化工具箱：Zapier, Make 與 API 基礎' : 'Know your automation toolbox',
            completed: isUnitCompleted('t1-u3'),
            current: isUnitCompleted('t1-u2') && !isUnitCompleted('t1-u3')
          }
        ],
        completed: isThemeCompleted(1)
      },
      {
        id: 2,
        title: isZhHK ? '核心應用實戰：三大部門的 AI 自動化魔法' : 'Core Applications: AI Automation for Three Key Departments',
        description: isZhHK ? '本章節將深入行銷、客服、營運三大核心部門，提供可立即上手的 AI 自動化應用案例與流程。' : 'This chapter will dive deep into three core departments.',
        progress: Math.round((getThemeProgress(2).unitsCompleted / 3) * 100),
        units: [
          {
            id: 4,
            title: isZhHK ? '【行銷自動化】：從文案生成到社群發文，一條龍搞定' : 'Marketing Automation',
            completed: isUnitCompleted('t2-u4'),
            current: isThemeCompleted(1) && !isUnitCompleted('t2-u4')
          },
          {
            id: 5,
            title: isZhHK ? '【客服自動化】：打造 24H 智慧客服，提升客戶滿意度' : 'Customer Service Automation',
            completed: isUnitCompleted('t2-u5'),
            current: isUnitCompleted('t2-u4') && !isUnitCompleted('t2-u5')
          },
          {
            id: 6,
            title: isZhHK ? '【營運自動化】：報表整理與資訊擷取的智慧幫手' : 'Operations Automation',
            completed: isUnitCompleted('t2-u6'),
            current: isUnitCompleted('t2-u5') && !isUnitCompleted('t2-u6')
          }
        ],
        completed: isThemeCompleted(2)
      },
      {
        id: 3,
        title: isZhHK ? '進階整合與優化：打造你的 AI 自動化生態系' : 'Advanced Integration & Optimization',
        description: isZhHK ? '學習如何將多個自動化流程整合成一個完整的生態系統，並持續優化效能。' : 'Learn how to integrate multiple automation processes.',
        progress: Math.round((getThemeProgress(3).unitsCompleted / 3) * 100),
        units: [
          {
            id: 7,
            title: isZhHK ? '多系統整合：讓 AI 工具間完美協作' : 'Multi-system Integration',
            completed: isUnitCompleted('t3-u7'),
            current: isThemeCompleted(2) && !isUnitCompleted('t3-u7')
          },
          {
            id: 8,
            title: isZhHK ? '效能監控與優化：確保自動化系統穩定運行' : 'Performance Monitoring',
            completed: isUnitCompleted('t3-u8'),
            current: isUnitCompleted('t3-u7') && !isUnitCompleted('t3-u8')
          },
          {
            id: 9,
            title: isZhHK ? '未來趨勢與持續學習：跟上 AI 發展腳步' : 'Future Trends',
            completed: isUnitCompleted('t3-u9'),
            current: isUnitCompleted('t3-u8') && !isUnitCompleted('t3-u9')
          }
        ],
        completed: isThemeCompleted(3)
      }
    ]
  };

  const skills = [
    { name: isZhHK ? '重點技能掌握' : 'Key Skills', percentage: 25 },
    { name: isZhHK ? 'AI工具應用' : 'AI Tool Application', percentage: 75 },
    { name: isZhHK ? '自動化設計' : 'Automation Design', percentage: 60 },
    { name: isZhHK ? '流程優化' : 'Process Optimization', percentage: 55 },
    { name: isZhHK ? '客戶關聯人' : 'Customer Relations', percentage: 70 }
  ];

  const achievements = [
    { icon: Trophy, label: isZhHK ? '學習達人' : 'Learning Expert', type: 'gold' },
    { icon: Star, label: isZhHK ? '快速學習者' : 'Fast Learner', type: 'silver' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/courses/ai-business-automation')}
          className="breadcrumb-item mb-6 text-white/70 hover:text-white flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isZhHK ? '返回課程大綱' : 'Back to Course Overview'}</span>
        </motion.button>

        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">
              {isZhHK ? '歡迎您來・AI 學習者！' : 'Welcome, AI Learner!'}
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <span>{totalLearningMinutes}分鐘 已學習 / {courseData.totalHours}分鐘 總計</span>
            <span>{courseData.totalThemes}大主題・{courseData.completedUnits}單元</span>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>學習進度: {stats.totalProgress}%</span>
            </div>
            {/* 🎯 新增：詳細學習時間顯示 */}
            {totalLearningTimeSeconds > 0 && (
              <div className="flex items-center space-x-2 text-green-400">
                <Clock className="w-4 h-4" />
                <span>實際學習: {formattedLearningTime}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Learning Journey Banner - IMPROVED */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{stats.totalProgress}%</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isZhHK ? '您現在的學習旅程' : 'Your Current Learning Journey'}
                </h2>
                <p className="text-white/70 mb-1">
                  {(() => {
                    // 找到當前學習的主題和單元
                    for (const theme of courseData.themes) {
                      const currentUnit = theme.units.find(unit => unit.current);
                      if (currentUnit) {
                        return isZhHK 
                          ? `第${theme.id}大主題・${theme.title.slice(0, 20)}...`
                          : `Theme ${theme.id} • ${theme.title.slice(0, 20)}...`;
                      }
                    }
                    return isZhHK ? '所有課程已完成！' : 'All courses completed!';
                  })()}
                </p>
                <p className="text-sm text-white/60">
                  {stats.totalProgress < 100 ? (isZhHK ? '預計 45分鐘・互動課程' : 'Estimated 45min • Interactive') : (isZhHK ? '恭喜完成所有課程！' : 'Congratulations on completing all courses!')}
                </p>
              </div>
            </div>
            
            {stats.totalProgress < 100 ? (
              <Button 
                className="btn-primary px-8 py-4 text-lg"
                onClick={() => {
                  // 找到當前需要學習的單元
                  for (const theme of courseData.themes) {
                    const currentUnit = theme.units.find(unit => unit.current);
                    if (currentUnit) {
                      navigate(`/courses/ai-business-automation/theme/${theme.id}/unit/${currentUnit.id}`);
                      return;
                    }
                  }
                  // 如果沒有找到當前單元，導航到第一個主題
                  navigate('/courses/ai-business-automation/theme/1');
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                {isZhHK ? '立即繼續學習' : 'Continue Learning'}
              </Button>
            ) : (
              <Button 
                className="btn-success px-8 py-4 text-lg bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/courses/ai-business-automation')}
              >
                <Trophy className="w-5 h-5 mr-2" />
                {isZhHK ? '查看課程證書' : 'View Certificate'}
              </Button>
            )}
          </div>
          
          <div className="mt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">
                  {stats.totalProgress}% 已完成・{stats.completedUnits}/{stats.totalUnits} 單元・{stats.completedQuizzes}/{stats.totalQuizzes} 測驗
                </span>
                {process.env.NODE_ENV === 'development' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetProgress}
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    重置進度
                  </Button>
                )}
              </div>
              
              {/* Progress Analysis */}
              {stats.totalProgress < 100 && stats.completedUnits === stats.totalUnits && (
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                  <h4 className="text-yellow-400 text-sm font-medium mb-2">
                    🎯 只差最後一步！
                  </h4>
                  <div className="text-xs text-yellow-200 space-y-2">
                    <div>您已完成所有單元，只需完成剩餘的測驗即可達到100%</div>
                    
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3].map(themeId => !getThemeProgress(themeId).quizCompleted && (
                        <Button
                          key={themeId}
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500/10 text-xs"
                          onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}/quiz`)}
                        >
                          完成主題{themeId}測驗
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Show progress issues only if units are incomplete */}
              {stats.completedUnits < stats.totalUnits && stats.totalProgress > 0 && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-blue-200 text-xs">
                    還有 {stats.totalUnits - stats.completedUnits} 個單元待完成
                  </div>
                </div>
              )}
              
              {/* 100% 完成慶祝 */}
              {stats.totalProgress === 100 && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h4 className="text-green-400 font-medium">🎉 恭喜！課程完成！</h4>
                      <p className="text-green-200 text-sm">您已完成所有{stats.totalUnits}個單元和{stats.totalQuizzes}個測驗！</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="progress-bar progress-bar-large">
              <div 
                className="progress-bar-fill" 
                style={{width: `${stats.totalProgress}%`}}
              ></div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Modules */}
          <div className="lg:col-span-2">
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="content-section-header">
                <BookOpen className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="content-section-title text-white">課程模塊</h3>
              </div>

              <div className="space-y-6">
                {courseData.themes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    className={`theme-card course-card ${
                      theme.completed ? 'is-completed border-green-400/30 bg-green-400/5' : 
                      theme.units.some(unit => unit.current) ? 'is-current border-blue-400/30 bg-blue-400/5' :
                      'border-gray-600/30 bg-gray-700/20'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.3 + index * 0.2, 
                      duration: 0.5, 
                      ease: "easeOut" 
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                          theme.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {theme.id}
                        </div>
                        <h4 className="text-xl font-semibold text-white">第{theme.id}大主題</h4>
                      </div>
                      {theme.completed && <CheckCircle className="w-6 h-6 text-green-400" />}
                    </div>

                    <h5 className="text-lg font-medium text-white mb-3">{theme.title}</h5>
                    <p className="text-gray-300 text-sm mb-4">{theme.description}</p>
                    
                    <div className="space-y-3">
                      {theme.units.map((unit, unitIndex) => (
                        <motion.div
                          key={unit.id}
                          className={`unit-card relative p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer group ${
                            unit.completed ? 'is-completed border-green-400/30 bg-green-400/5 hover:border-green-400/50' : 
                            unit.current ? 'is-current border-blue-400/50 bg-blue-400/10 hover:border-blue-400/70 current-learning-item' : 
                            'border-gray-600/30 bg-gray-700/20 hover:border-gray-500/50'
                          }`}
                          onClick={() => navigate(`/courses/ai-business-automation/theme/${theme.id}/unit/${unit.id}`)}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: 0.5 + unitIndex * 0.15,
                            duration: 0.6,
                            ease: "easeOut"
                          }}
                          whileHover={{ 
                            scale: 1.008, 
                            y: -1,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                          whileTap={{ 
                            scale: 0.995,
                            transition: { duration: 0.2, ease: "easeInOut" }
                          }}
                        >
                          {/* Unit Status Indicator - Single checkmark for completed units */}
                          <div className="absolute top-3 right-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              unit.completed ? 'bg-green-500 text-white' : 
                              unit.current ? 'bg-blue-500 text-white status-badge-breathing' : 'bg-gray-600 text-gray-300'
                            }`}>
                              {unit.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : unit.current ? (
                                <Play className="w-4 h-4" />
                              ) : (
                                unit.id
                              )}
                            </div>
                          </div>

                          {/* Unit Content */}
                          <div className="pr-12">
                            <div className="mb-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                    unit.completed ? 'bg-green-500/20 text-green-400' :
                                    unit.current ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-gray-600/20 text-gray-400'
                                  }`}>
                                    {unit.id}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className={`unit-title font-medium leading-tight group-hover:text-blue-300 transition-colors ${
                                      unit.completed ? 'text-white' : 'text-white'
                                    }`}>
                                      {unit.title}
                  </h4>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    unit.completed ? 'bg-green-900/30 text-green-400' : 
                                    unit.current ? 'bg-blue-900/30 text-blue-400 status-badge-breathing' : 
                                    'bg-gray-800/30 text-gray-400'
                                  }`}>
                                    {unit.completed ? '已完成' : unit.current ? '進行中' : '待學習'}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-xs text-gray-400">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>45分鐘</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <BookOpen className="w-3 h-3" />
                                    <span>互動課程</span>
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center space-x-2">
                                  {/* Unified Smart Action Button */}
                                  <Button
                                    className={`text-xs px-3 py-1.5 ${
                                      unit.current ? 'nav-button-primary' : 
                                      unit.completed ? 'nav-button-secondary' : 'nav-button-secondary'
                                    }`}
                                    variant={unit.completed ? 'outline' : 'default'}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/courses/ai-business-automation/theme/${theme.id}/unit/${unit.id}`);
                                    }}
                                  >
                                    <Play className="w-3 h-3 mr-1" />
                                    {unit.current ? '繼續學習' : 
                                     unit.completed ? '重新學習' : '開始學習'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/70">主題進度</span>
                        <span className="text-sm font-semibold text-white">{theme.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-bar-fill" 
                          style={{width: `${theme.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills & Progress */}
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
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
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
                    <span className="skill-percentage text-white">{skill.percentage}%</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                  <Trophy className="w-4 h-4" />
                  <span className="text-h3">學習成就</span>
                </div>
                <p className="text-caption">AI 自動化基礎課程</p>
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
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-data text-blue-400 mb-1">2</div>
                  <div className="text-label">已完成單元</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-data text-purple-400 mb-1">7</div>
                  <div className="text-label">剩餘單元</div>
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
                  <p className="text-sm text-white/60 mb-2">單元 3：認識你的自動化工具箱</p>
                  <Button 
                    className="btn-accent w-full"
                    onClick={() => navigate('/courses/ai-business-automation/theme/1/unit/3')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    繼續學習
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <Target className="w-4 h-4" />
                  <span>3大學習里程碑</span>
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
                    className={`achievement-badge-${achievement.type} text-sm`}
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

export default AIBusinessAutomationLearning; 