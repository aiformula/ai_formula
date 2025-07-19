import React from 'react';
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

// 類型定義
interface Unit {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
  duration?: string;
  type?: string;
}

interface Theme {
  id: number;
  title: string;
  description: string;
  progress: number;
  units: Unit[];
  completed: boolean;
}

interface Skill {
  name: string;
  percentage: number;
}

interface Achievement {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: 'gold' | 'silver' | 'bronze';
}

interface ProgressStats {
  totalProgress: number;
  completedUnits: number;
  totalUnits: number;
  completedQuizzes: number;
  totalQuizzes: number;
  totalThemes: number;
}

interface CourseData {
  title: string;
  completedHours: number;
  totalHours: number;
  totalThemes: number;
  completedUnits: number;
  learningStreak: number;
  themes: Theme[];
}

interface CourseLayoutProps {
  // 核心課程數據
  courseData: CourseData;
  
  // 進度統計
  progressStats: ProgressStats;
  
  // 技能數據
  skills: Skill[];
  
  // 成就數據
  achievements: Achievement[];
  
  // 導航相關
  backNavigationPath: string;
  backNavigationLabel?: string;
  
  // 事件處理
  onContinueLearning: () => void;
  onUnitClick: (themeId: number, unitId: number) => void;
  onThemeQuizClick?: (themeId: number) => void;
  onResetProgress?: () => void;
  
  // 可選配置
  showResetProgress?: boolean;
  welcomeTitle?: string;
  currentLearningTitle?: string;
  
  // 自訂內容區域
  children?: React.ReactNode;
  
  // 進度分析相關
  showProgressAnalysis?: boolean;
  getThemeProgress?: (themeId: number) => { unitsCompleted: number; quizCompleted: boolean };
}

const CourseLayout: React.FC<CourseLayoutProps> = ({
  courseData,
  progressStats,
  skills,
  achievements,
  backNavigationPath,
  backNavigationLabel,
  onContinueLearning,
  onUnitClick,
  onThemeQuizClick,
  onResetProgress,
  showResetProgress = false,
  welcomeTitle,
  currentLearningTitle,
  children,
  showProgressAnalysis = false,
  getThemeProgress
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 找到當前學習的主題和單元
  const getCurrentLearningInfo = () => {
    for (const theme of courseData.themes) {
      const currentUnit = theme.units.find(unit => unit.current);
      if (currentUnit) {
        return { theme, unit: currentUnit };
      }
    }
    return null;
  };

  const currentLearning = getCurrentLearningInfo();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(backNavigationPath)}
          className="breadcrumb-item mb-6 text-white/70 hover:text-white flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backNavigationLabel || (isZhHK ? '返回課程大綱' : 'Back to Course Overview')}</span>
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
              {welcomeTitle || (isZhHK ? '歡迎您來・AI 學習者！' : 'Welcome, AI Learner!')}
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <span>{courseData.completedHours}分鐘 已學習 / {courseData.totalHours}分鐘 總計</span>
            <span>{courseData.totalThemes}大主題・{courseData.completedUnits}單元</span>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>學習進度: {progressStats.totalProgress}%</span>
            </div>
          </div>
        </motion.div>

        {/* Main Learning Journey Banner */}
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
                  <span className="text-xs font-bold text-white">{progressStats.totalProgress}%</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentLearningTitle || (isZhHK ? '您現在的學習旅程' : 'Your Current Learning Journey')}
                </h2>
                <p className="text-white/70 mb-1">
                  {currentLearning ? (
                    isZhHK 
                      ? `第${currentLearning.theme.id}大主題・${currentLearning.theme.title.slice(0, 20)}...`
                      : `Theme ${currentLearning.theme.id} • ${currentLearning.theme.title.slice(0, 20)}...`
                  ) : (
                    isZhHK ? '所有課程已完成！' : 'All courses completed!'
                  )}
                </p>
                <p className="text-sm text-white/60">
                  {progressStats.totalProgress < 100 ? (isZhHK ? '預計 45分鐘・互動課程' : 'Estimated 45min • Interactive') : (isZhHK ? '恭喜完成所有課程！' : 'Congratulations on completing all courses!')}
                </p>
              </div>
            </div>
            
            {progressStats.totalProgress < 100 ? (
              <Button 
                className="btn-primary px-8 py-4 text-lg"
                onClick={onContinueLearning}
              >
                <Play className="w-5 h-5 mr-2" />
                {isZhHK ? '立即繼續學習' : 'Continue Learning'}
              </Button>
            ) : (
              <Button 
                className="btn-success px-8 py-4 text-lg bg-green-600 hover:bg-green-700"
                onClick={() => navigate(backNavigationPath)}
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
                  {progressStats.totalProgress}% 已完成・{progressStats.completedUnits}/{progressStats.totalUnits} 單元・{progressStats.completedQuizzes}/{progressStats.totalQuizzes} 測驗
                </span>
                {showResetProgress && onResetProgress && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onResetProgress}
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    重置進度
                  </Button>
                )}
              </div>
              
              {/* Progress Analysis - 只有在提供相關函數時才顯示 */}
              {showProgressAnalysis && getThemeProgress && (
                <>
                  {progressStats.totalProgress < 100 && progressStats.completedUnits === progressStats.totalUnits && (
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                      <h4 className="text-yellow-400 text-sm font-medium mb-2">
                        🎯 只差最後一步！
                      </h4>
                      <div className="text-xs text-yellow-200 space-y-2">
                        <div>您已完成所有單元，只需完成剩餘的測驗即可達到100%</div>
                        
                        {onThemeQuizClick && (
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map(themeId => !getThemeProgress(themeId).quizCompleted && (
                              <Button
                                key={themeId}
                                size="sm"
                                variant="outline"
                                className="border-blue-500 text-blue-400 hover:bg-blue-500/10 text-xs"
                                onClick={() => onThemeQuizClick(themeId)}
                              >
                                完成主題{themeId}測驗
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {progressStats.completedUnits < progressStats.totalUnits && progressStats.totalProgress > 0 && (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                      <div className="text-blue-200 text-xs">
                        還有 {progressStats.totalUnits - progressStats.completedUnits} 個單元待完成
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* 100% 完成慶祝 */}
              {progressStats.totalProgress === 100 && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h4 className="text-green-400 font-medium">🎉 恭喜！課程完成！</h4>
                      <p className="text-green-200 text-sm">您已完成所有{progressStats.totalUnits}個單元和{progressStats.totalQuizzes}個測驗！</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="progress-bar progress-bar-large">
              <div 
                className="progress-bar-fill" 
                style={{width: `${progressStats.totalProgress}%`}}
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
                          onClick={() => onUnitClick(theme.id, unit.id)}
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
                          {/* Unit Status Indicator */}
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
                                    <span>{unit.duration || '45分鐘'}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <BookOpen className="w-3 h-3" />
                                    <span>{unit.type || '互動課程'}</span>
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center space-x-2">
                                  {unit.current && (
                                    <Button
                                      className="nav-button-primary text-xs px-3 py-1.5"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onUnitClick(theme.id, unit.id);
                                      }}
                                    >
                                      <Play className="w-3 h-3 mr-1" />
                                      繼續學習
                                    </Button>
                                  )}
                                  
                                  {unit.completed && (
                                    <Button 
                                      variant="outline"
                                      className="nav-button-secondary text-xs px-3 py-1.5"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onUnitClick(theme.id, unit.id);
                                      }}
                                    >
                                      <BookOpen className="w-3 h-3 mr-1" />
                                      重新學習
                                    </Button>
                                  )}
                                  
                                  {!unit.current && !unit.completed && (
                                    <Button
                                      variant="outline"
                                      className="nav-button-secondary text-xs px-3 py-1.5"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onUnitClick(theme.id, unit.id);
                                      }}
                                    >
                                      <Play className="w-3 h-3 mr-1" />
                                      開始學習
                                    </Button>
                                  )}
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
            {/* Skills Radar */}
            <motion.div 
              className="skills-radar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="skills-radar-title text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  技能發展追蹤
                </h3>
                <div className="learning-progress-percentage text-white">
                  {progressStats.totalProgress}%
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
                  <span className="text-sm font-medium">學習成就</span>
                </div>
                <p className="text-xs text-white/70">{courseData.title}</p>
              </div>
            </motion.div>

            {/* Learning Progress Overview */}
            <motion.div 
              className="learning-progress-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="learning-progress-title text-white flex items-center mb-6">
                <Calendar className="w-5 h-5 mr-2 text-green-400" />
                學習進度總覽
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{progressStats.completedUnits}</div>
                  <div className="text-xs text-white/70">已完成單元</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{progressStats.totalUnits - progressStats.completedUnits}</div>
                  <div className="text-xs text-white/70">剩餘單元</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">學習時間</span>
                  <span className="text-sm font-semibold text-white">
                    {(() => {
                      const totalSeconds = courseData.completedHours * 60; // 將分鐘轉換為秒
                      const hours = Math.floor(totalSeconds / 3600);
                      const minutes = Math.floor((totalSeconds % 3600) / 60);
                      const seconds = totalSeconds % 60;
                      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    })()}
                  </span>
                </div>
                
                <div className="learning-streak border border-orange-500/20 bg-orange-500/10">
                  <Zap className="learning-streak-icon text-orange-400" />
                  <span className="learning-streak-text text-orange-300">
                    下一步
                  </span>
                </div>
                
                {currentLearning && (
                  <div className="text-center pt-4">
                    <p className="text-sm text-white/60 mb-2">單元 {currentLearning.unit.id}：{currentLearning.unit.title.slice(0, 20)}...</p>
                    <Button 
                      className="btn-accent w-full"
                      onClick={onContinueLearning}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      繼續學習
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <Target className="w-4 h-4" />
                  <span>{courseData.totalThemes}大學習里程碑</span>
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
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
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

            {/* 自訂內容區域 */}
            {children && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLayout; 