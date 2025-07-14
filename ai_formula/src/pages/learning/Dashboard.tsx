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
  
  // å¤šè?è¨€?‡å?
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
      welcome: 'æ­¡è??žä?',
      learningProgress: 'å­¸ç??²åº¦',
      coursesCompleted: 'å·²å??èª²ç¨?,
      totalStudyTime: 'ç¸½å­¸ç¿’æ???,
      averageScore: 'å¹³å??†æ•¸',
      currentCourses: '?¶å?èª²ç?',
      recommendedCourses: '?¨è–¦èª²ç?',
      recentActivity: '?€è¿‘æ´»??,
      viewAll: '?¥ç??¨éƒ¨',
      continueLearning: 'ç¹¼ç?å­¸ç?',
      startCourse: '?‹å?èª²ç?',
      viewCourse: '?¥ç?èª²ç?',
      profile: '?‹äººè³‡æ?',
      settings: 'è¨­å?',
      signOut: '?»å‡º',
      hours: 'å°æ?',
      minutes: '?†é?',
      completed: 'å·²å???,
      inProgress: '?²è?ä¸?,
      notStarted: '?ªé?å§?,
      beginner: '?ç?',
      intermediate: 'ä¸­ç?',
      advanced: 'é«˜ç?'
    }
  }

  const t = text[language === 'zh-HK' ? 'zh' : 'en']

  // ?¨æˆ¶å­¸ç??¸æ?
  const [learningStats, setLearningStats] = useState({
    coursesCompleted: 3,
    totalStudyTime: 24.5,
    averageScore: 87,
    currentStreak: 7,
    totalCourses: 12
  })

  // ?¶å?èª²ç??¸æ?
  const currentCourses = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering Mastery',
      titleZh: '?ç¤ºå·¥ç?ç²¾é€šèª²ç¨?,
      progress: 65,
      status: 'inProgress',
      nextLesson: 'Advanced Techniques',
      nextLessonZh: 'é«˜ç??€å·?,
      estimatedTime: '2h 15m',
      difficulty: 'intermediate'
    },
    {
      id: 'ai-ethics',
      title: 'AI Ethics and Responsibility',
      titleZh: 'AI?«ç??‡è²¬ä»?,
      progress: 30,
      status: 'inProgress',
      nextLesson: 'Bias in AI Systems',
      nextLessonZh: 'AIç³»çµ±ä¸­ç??è?',
      estimatedTime: '1h 45m',
      difficulty: 'beginner'
    }
  ]

  // ?¨è–¦èª²ç?
  const recommendedCourses = [
    {
      id: 'machine-learning-basics',
      title: 'Machine Learning Fundamentals',
      titleZh: 'æ©Ÿå™¨å­¸ç??ºç?',
      description: 'Learn the core concepts of machine learning',
      descriptionZh: 'å­¸ç?æ©Ÿå™¨å­¸ç??„æ ¸å¿ƒæ?å¿?,
      duration: '8 hours',
      durationZh: '8å°æ?',
      difficulty: 'beginner',
      rating: 4.8,
      students: 15420
    },
    {
      id: 'neural-networks',
      title: 'Neural Networks Deep Dive',
      titleZh: 'ç¥žç?ç¶²çµ¡æ·±åº¦?¢ç´¢',
      description: 'Advanced neural network architectures and applications',
      descriptionZh: 'é«˜ç?ç¥žç?ç¶²çµ¡?¶æ??Œæ???,
      duration: '12 hours',
      durationZh: '12å°æ?',
      difficulty: 'advanced',
      rating: 4.9,
      students: 8750
    }
  ]

  // ?€è¿‘æ´»??
  const recentActivity = [
    {
      id: 1,
      type: 'completed',
      title: 'Introduction to Prompt Engineering',
      titleZh: '?ç¤ºå·¥ç?ä»‹ç´¹',
      time: '2 hours ago',
      timeZh: '2å°æ???
    },
    {
      id: 2,
      type: 'started',
      title: 'Advanced Prompt Techniques',
      titleZh: 'é«˜ç??ç¤º?€å·?,
      time: '1 day ago',
      timeZh: '1å¤©å?'
    },
    {
      id: 3,
      type: 'quiz',
      title: 'Quiz: Prompt Structure',
      titleZh: 'æ¸¬é?ï¼šæ?ç¤ºç?æ§?,
      time: '2 days ago',
      timeZh: '2å¤©å?',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* ?¨æˆ¶æ­¡è??€??*/}
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
                {language === 'zh-HK' ? 'ç¹¼ç?ä½ ç?å­¸ç?ä¹‹æ?' : 'Continue your learning journey'}
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

        {/* å­¸ç?çµ±è??¡ç? */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t.learningProgress}</p>
                    <p className="text-2xl font-bold text-white">{progressPercentage}%</p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <Progress value={progressPercentage} className="mt-4" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t.coursesCompleted}</p>
                    <p className="text-2xl font-bold text-white">{learningStats.coursesCompleted}</p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t.totalStudyTime}</p>
                    <p className="text-2xl font-bold text-white">{learningStats.totalStudyTime}h</p>
                  </div>
                  <div className="p-3 bg-purple-500/20 rounded-full">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t.averageScore}</p>
                    <p className="text-2xl font-bold text-white">{learningStats.averageScore}%</p>
                  </div>
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <Star className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ?¶å?èª²ç? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{t.currentCourses}</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  {t.viewAll}
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {currentCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-500/20 rounded-full">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {language === 'zh-HK' ? course.titleZh : course.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {language === 'zh-HK' ? 'ä¸‹ä?èª²ï?' : 'Next: '}
                          {language === 'zh-HK' ? course.nextLessonZh : course.nextLesson}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">{course.progress}% {t.completed}</div>
                        <Progress value={course.progress} className="w-24 mt-1" />
                      </div>
                      
                      <LearningButton
                        intent="primary"
                        size="sm"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        {t.continueLearning}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </LearningButton>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ?¨è–¦èª²ç??Œæ?è¿‘æ´»??*/}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ?¨è–¦èª²ç? */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{t.recommendedCourses}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      className="p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">
                          {language === 'zh-HK' ? course.titleZh : course.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {t[course.difficulty]}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3">
                        {language === 'zh-HK' ? course.descriptionZh : course.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {language === 'zh-HK' ? course.durationZh : course.duration}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            {course.rating}
                          </span>
                        </div>
                        
                        <LearningButton
                          intent="secondary"
                          size="sm"
                          onClick={() => navigate(`/course/${course.id}`)}
                        >
                          {t.startCourse}
                        </LearningButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ?€è¿‘æ´»??*/}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{t.recentActivity}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`p-2 rounded-full ${
                        activity.type === 'completed' ? 'bg-green-500/20' :
                        activity.type === 'started' ? 'bg-blue-500/20' :
                        'bg-yellow-500/20'
                      }`}>
                        {activity.type === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : activity.type === 'started' ? (
                          <PlayCircle className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Award className="h-4 w-4 text-yellow-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">
                          {language === 'zh-HK' ? activity.titleZh : activity.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {language === 'zh-HK' ? activity.timeZh : activity.time}
                          {activity.score && (
                            <span className="ml-2 text-green-400">
                              {activity.score}%
                            </span>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 