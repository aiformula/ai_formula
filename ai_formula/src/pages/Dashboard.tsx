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
      dashboard: 'Dashboard',
      signOut: 'Sign Out',
      signOutConfirm: 'Confirm Sign Out',
      signOutMessage: 'Are you sure you want to sign out? You will need to login again to access your account.',
      cancel: 'Cancel',
      confirm: 'Sign Out',
      signingOut: 'Signing out...',
      profile: 'Profile',
      profileDesc: 'Your account information',
      email: 'Email',
      userId: 'User ID',
      welcome: 'Welcome!',
      welcomeDesc: 'You\'re successfully authenticated',
      welcomeMessage: 'This is a protected page that only authenticated users can access. Enjoy exploring your personalized dashboard.',
      nextSteps: 'Next Steps',
      nextStepsDesc: 'What you can do now',
      exploreFeatures: 'Explore platform features',
      updateProfile: 'Update your profile settings',
      accessCourses: 'Access your courses',
      viewProgress: 'View learning progress',
      errorOccurred: 'An error occurred',
      signOutError: 'Failed to sign out. Please try again.',
      loadingError: 'Unable to load user data. Please refresh the page.',
      userNotFound: 'User information not available'
    },
    zh: {
      dashboard: '控制台',
      signOut: '登出',
      signOutConfirm: '確認登出',
      signOutMessage: '您確定要登出嗎？您需要重新登入才能存取您的帳戶。',
      cancel: '取消',
      confirm: '登出',
      signingOut: '正在登出...',
      profile: '個人資料',
      profileDesc: '您的帳戶資訊',
      email: '電子郵件',
      userId: '用戶ID',
      welcome: '歡迎！',
      welcomeDesc: '您已成功驗證身份',
      welcomeMessage: '這是一個受保護的頁面，只有經過身份驗證的用戶才能存取。盡情探索您的個人化控制台。',
      nextSteps: '下一步',
      nextStepsDesc: '您現在可以做什麼',
      exploreFeatures: '探索平台功能',
      updateProfile: '更新個人資料設定',
      accessCourses: '存取您的課程',
      viewProgress: '查看學習進度',
      errorOccurred: '發生錯誤',
      signOutError: '登出失敗。請重試。',
      loadingError: '無法載入用戶資料。請重新整理頁面。',
      userNotFound: '用戶資訊不可用'
    }
  }

  const t = text[language]

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