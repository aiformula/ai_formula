import React, { useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { LogOut, User, Settings, BookOpen, AlertCircle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

// 類型定義 / Type Definitions
interface DashboardError {
  message: string
  type: 'error' | 'warning' | 'info'
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()
  const { language } = useLanguage()
  
  // 狀態管理 / State Management
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [error, setError] = useState<DashboardError | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  // 多語言文字 / Multilingual Text
  const text = {
    en: {
      title: 'Dashboard',
      subtitle: 'Welcome to AI Formula',
      description: 'Your personalized learning experience starts here',
      continueAbbr: 'Continue',
      startLearning: 'Start Learning',
      viewCourses: 'View All Courses',
      greeting: 'Hello',
      progress: 'Progress',
      assignments: 'Assignments',
      achievements: 'Achievements',
      recentActivity: 'Recent Activity',
      upcomingDeadlines: 'Upcoming Deadlines',
      quickActions: 'Quick Actions',
      enrolledCourses: 'Enrolled Courses',
      completedCourses: 'Completed Courses',
      totalHours: 'Total Hours',
      certificatesEarned: 'Certificates Earned',
      skillsLearned: 'Skills Learned',
      studyStreak: 'Study Streak',
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      dueDate: 'Due Date',
      priority: 'Priority',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      viewAll: 'View All',
      noData: 'No data available',
      loading: 'Loading...',
      error: 'Error loading data',
      retry: 'Retry',
      logout: 'Logout',
      profile: 'Profile',
      settings: 'Settings',
      notifications: 'Notifications',
      help: 'Help',
      feedback: 'Feedback',
      support: 'Support'
    },
    'zh-TW': {
      title: '儀表板',
      subtitle: '歡迎來到 AI Formula',
      description: '您的個人化學習體驗從這裡開始',
      continueAbbr: '繼續',
      startLearning: '開始學習',
      viewCourses: '查看所有課程',
      greeting: '你好',
      progress: '進度',
      assignments: '作業',
      achievements: '成就',
      recentActivity: '最近活動',
      upcomingDeadlines: '即將到期',
      quickActions: '快速操作',
      enrolledCourses: '已註冊課程',
      completedCourses: '已完成課程',
      totalHours: '總小時數',
      certificatesEarned: '獲得證書',
      skillsLearned: '學習技能',
      studyStreak: '學習連續天數',
      days: '天',
      hours: '小時',
      minutes: '分鐘',
      completed: '已完成',
      inProgress: '進行中',
      notStarted: '未開始',
      dueDate: '截止日期',
      priority: '優先級',
      high: '高',
      medium: '中',
      low: '低',
      viewAll: '查看全部',
      noData: '沒有資料',
      loading: '載入中...',
      error: '載入資料時發生錯誤',
      retry: '重試',
      logout: '登出',
      profile: '個人資料',
      settings: '設定',
      notifications: '通知',
      help: '說明',
      feedback: '反饋',
      support: '支援'
    }
  }

  const t = text[language] || text.en

  // 記憶化事件處理函數 / Memoized Event Handlers
  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true)
    setError(null)
    
    try {
      await signOut()
      // 成功登出後會自動重定向，無需額外處理
    } catch (err) {
      console.error('Sign out error:', err)
      setError({
        message: t.signOutError,
        type: 'error'
      })
    } finally {
      setIsSigningOut(false)
      setIsAlertOpen(false)
    }
  }, [signOut, t.signOutError])

  const handleCloseError = useCallback(() => {
    setError(null)
  }, [])

  // 如果用戶資料無效，顯示錯誤 / Show error if user data is invalid
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md bg-gray-900 border-gray-700">
            <CardHeader className="text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-white">{t.errorOccurred}</CardTitle>
              <CardDescription className="text-gray-300">
                {t.userNotFound}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-400 text-sm mb-4">{t.loadingError}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                重新載入 / Reload
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 頁面標題和登出按鈕 / Page Header and Sign Out Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.dashboard}
          </h1>
          
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                disabled={isSigningOut}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                aria-label={`${t.signOut} - ${user.email}`}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isSigningOut ? t.signingOut : t.signOut}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">{t.signOutConfirm}</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  {t.signOutMessage}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  disabled={isSigningOut}
                >
                  {t.cancel}
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isSigningOut ? t.signingOut : t.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>

        {/* 錯誤提示 / Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <Alert className="border-red-500 bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                {error.message}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCloseError}
                  className="ml-2 text-red-300 hover:text-red-100"
                >
                  ×
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {/* 儀表板卡片 / Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 用戶資料卡片 / User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="mr-2 h-5 w-5 text-purple-400" />
                  {t.profile}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t.profileDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-1">{t.email}:</p>
                    <p className="text-sm text-white bg-gray-800 px-2 py-1 rounded break-all">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-1">{t.userId}:</p>
                    <p className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded break-all font-mono">
                      {user.id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 歡迎卡片 / Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                  {t.welcome}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t.welcomeDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t.welcomeMessage}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* 下一步卡片 / Next Steps Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Settings className="mr-2 h-5 w-5 text-blue-400" />
                  {t.nextSteps}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t.nextStepsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                    {t.exploreFeatures}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span>
                    {t.updateProfile}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    {t.accessCourses}
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                    {t.viewProgress}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 快速動作區域 / Quick Actions Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BookOpen className="mr-2 h-5 w-5 text-yellow-400" />
                {language === 'en' ? 'Quick Actions' : '快速動作'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {language === 'en' ? 'Access key features quickly' : '快速存取主要功能'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-purple-900/20 hover:border-purple-400 hover:text-purple-300"
                  onClick={() => window.location.href = '/course'}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Browse Courses' : '瀏覽課程'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-pink-900/20 hover:border-pink-400 hover:text-pink-300"
                  onClick={() => window.location.href = '/blog'}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Read Blog' : '閱讀網誌'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-blue-900/20 hover:border-blue-400 hover:text-blue-300"
                  onClick={() => window.location.href = '/about'}
                >
                  <User className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'About Us' : '關於我們'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-green-900/20 hover:border-green-400 hover:text-green-300"
                  onClick={() => window.location.href = '/'}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Home' : '首頁'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard; 