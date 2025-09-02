import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LearningButton } from '@/components/ui/learning-button'
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Star,
  Award,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  User,
  Settings,
  LogOut
} from 'lucide-react'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { user, signOut } = useAuth()
  
  // 多語言內容
  const text = {
    en: {
      welcome: 'Welcome back',
      learningProgress: 'Learning Progress',
      coursesCompleted: 'Courses Completed',
      totalStudyTime: 'Total Study Time',
      averageScore: 'Average Score',
      currentCourses: 'Current Courses',
      recommendedCourses: 'Recommended Courses',
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      continueLearning: 'Continue Learning',
      startCourse: 'Start Course',
      viewCourse: 'View Course',
      profile: 'Profile',
      settings: 'Settings',
      signOut: 'Sign Out',
      hours: 'hours',
      minutes: 'minutes',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    zh: {
      welcome: '歡迎回來',
      learningProgress: '學習進度',
      coursesCompleted: '已完成課程',
      totalStudyTime: '總學習時間',
      averageScore: '平均分數',
      currentCourses: '當前課程',
      recommendedCourses: '推薦課程',
      recentActivity: '最近活動',
      viewAll: '查看全部',
      continueLearning: '繼續學習',
      startCourse: '開始課程',
      viewCourse: '查看課程',
      profile: '個人資料',
      settings: '設定',
      signOut: '登出',
      hours: '小時',
      minutes: '分鐘',
      completed: '已完成',
      inProgress: '進行中',
      notStarted: '未開始',
      beginner: '初級',
      intermediate: '中級',
      advanced: '高級'
    }
  }

  const isZhHK = language === 'zh-HK'
  const t = text[isZhHK ? 'zh' : 'en']

  // 用戶學習統計
  const [learningStats, setLearningStats] = useState({
    coursesCompleted: 3,
    totalStudyTime: 24.5,
    averageScore: 87,
    currentStreak: 7,
    totalCourses: 12
  })

  // 當前課程資料
  const currentCourses = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering Mastery',
      titleZh: '提示工程精通課程',
      progress: 65,
      status: 'inProgress',
      nextLesson: 'Advanced Techniques',
      nextLessonZh: '高級技巧',
      estimatedTime: '2h 15m',
      difficulty: 'intermediate'
    },
    {
      id: 'ai-ethics',
      title: 'AI Ethics and Responsibility',
      titleZh: 'AI倫理與責任',
      progress: 30,
      status: 'inProgress',
      nextLesson: 'Bias in AI Systems',
      nextLessonZh: 'AI系統中的偏見',
      estimatedTime: '1h 45m',
      difficulty: 'beginner'
    }
  ]

  // 推薦課程
  const recommendedCourses = [
    {
      id: 'machine-learning-basics',
      title: 'Machine Learning Fundamentals',
      titleZh: '機器學習基礎',
      description: 'Learn the core concepts of machine learning',
      descriptionZh: '學習機器學習的核心概念',
      duration: '8 hours',
      durationZh: '8小時',
      difficulty: 'beginner',
      rating: 4.8,
      students: 15420
    },
    {
      id: 'neural-networks',
      title: 'Neural Networks Deep Dive',
      titleZh: '神經網絡深度探索',
      description: 'Advanced neural network architectures and applications',
      descriptionZh: '高級神經網絡架構和應用',
      duration: '12 hours',
      durationZh: '12小時',
      difficulty: 'advanced',
      rating: 4.9,
      students: 8750
    }
  ]

  // 最近活動
  const recentActivity = [
    {
      id: 1,
      type: 'completed',
      title: 'Introduction to Prompt Engineering',
      titleZh: '提示工程介紹',
      time: '2 hours ago',
      timeZh: '2小時前'
    },
    {
      id: 2,
      type: 'started',
      title: 'Advanced Prompt Techniques',
      titleZh: '高級提示技巧',
      time: '1 day ago',
      timeZh: '1天前'
    },
    {
      id: 3,
      type: 'quiz',
      title: 'Quiz: Prompt Structure',
      titleZh: '測驗：提示結構',
      time: '2 days ago',
      timeZh: '2天前',
      score: 92
    }
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const progressPercentage = Math.round((learningStats.coursesCompleted / learningStats.totalCourses) * 100)

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 page-content-with-nav pb-8">
        {/* 用戶歡迎區塊 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-white">
                {t.welcome}, {user?.email?.split('@')[0] || 'Student'}!
              </h1>
              <p className="text-gray-400 mt-1">
                {isZhHK ? '繼續你的學習之旅' : 'Continue your learning journey'}
              </p>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <User className="h-5 w-5 text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/settings')}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5 text-gray-400" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* 學習統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 stat-card-icon-text-container">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="stat-card-title">{t.coursesCompleted}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {learningStats.coursesCompleted}
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-gray-400 mt-2">
                  {progressPercentage}% {t.completed}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 stat-card-icon-text-container">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="stat-card-title">{t.totalStudyTime}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {learningStats.totalStudyTime}
                </div>
                <p className="text-xs text-gray-400">
                  {t.hours}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 stat-card-icon-text-container">
                  <Target className="h-4 w-4 mr-2" />
                  <span className="stat-card-title">{t.averageScore}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {learningStats.averageScore}%
                </div>
                <p className="text-xs text-gray-400">
                  {isZhHK ? '優秀表現' : 'Excellent performance'}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 stat-card-icon-text-container">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span className="stat-card-title">{isZhHK ? '學習連續天數' : 'Current Streak'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {learningStats.currentStreak}
                </div>
                <p className="text-xs text-gray-400">
                  {isZhHK ? '天' : 'days'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 主要內容區域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 當前課程 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <PlayCircle className="h-5 w-5 mr-2" />
                      {t.currentCourses}
                    </span>
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      {t.viewAll}
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white mb-1">
                            {isZhHK ? course.titleZh : course.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {isZhHK ? '下一課：' : 'Next lesson: '}
                            {isZhHK ? course.nextLessonZh : course.nextLesson}
                          </p>
                        </div>
                        <Badge 
                          variant={course.difficulty === 'beginner' ? 'default' : 
                                 course.difficulty === 'intermediate' ? 'secondary' : 'destructive'}
                        >
                          {t[course.difficulty as keyof typeof t]}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">{t.learningProgress}</span>
                          <span className="text-white">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.estimatedTime}
                        </span>
                        <LearningButton
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {t.continueLearning}
                        </LearningButton>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* 側邊欄 */}
          <div className="space-y-6">
            {/* 推薦課程 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    {t.recommendedCourses}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="border border-gray-700 rounded-lg p-3 hover:bg-gray-700/30 transition-colors"
                    >
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {isZhHK ? course.titleZh : course.title}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        {isZhHK ? course.descriptionZh : course.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">
                          {isZhHK ? course.durationZh : course.duration}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-white">{course.rating}</span>
                        </div>
                      </div>
                      <LearningButton
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-sm"
                      >
                        {t.startCourse}
                      </LearningButton>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* 最近活動 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {t.recentActivity}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                        {activity.type === 'started' && (
                          <PlayCircle className="h-4 w-4 text-blue-400" />
                        )}
                        {activity.type === 'quiz' && (
                          <Award className="h-4 w-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {isZhHK ? activity.titleZh : activity.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {isZhHK ? activity.timeZh : activity.time}
                        </p>
                        {activity.score && (
                          <p className="text-xs text-green-400">
                            {isZhHK ? '得分：' : 'Score: '}{activity.score}%
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 
