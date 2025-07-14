import React, { useEffect, useCallback, useState, memo } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Home, 
  Search, 
  ArrowLeft, 
  BookOpen, 
  Mail, 
  AlertTriangle,
  Navigation,
  Clock,
  HelpCircle,
  FileText,
  Users
} from 'lucide-react'

// 類�?定義 / Type Definitions
interface NotFoundProps {
  statusCode?: number
  customMessage?: string
}

interface SuggestedRoute {
  path: string
  name: { en: string; zh: string }
  icon: React.ReactNode
  description: { en: string; zh: string }
}

interface ErrorReport {
  path: string
  timestamp: string
  userAgent: string
  referrer: string
}

interface QuickLink {
  href: string
  icon: React.ComponentType<{ className?: string }>
  name: { en: string; 'zh-HK': string }
  badge?: { text: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
  description: { en: string; 'zh-HK': string }
}

interface NotFoundTexts {
  title: string
  subtitle: string
  description: string
  quickLinks: string
  backToHome: string
  contactSupport: string
  error404: string
  pageNotFound: string
}

// 建議路由 / Suggested Routes
const suggestedRoutes: SuggestedRoute[] = [
  {
    path: '/',
    name: { en: 'Home', zh: '首�?' },
    icon: <Home className="h-5 w-5" />,
    description: { en: 'Return to homepage', zh: '返�?首�?' }
  },
  {
    path: '/course',
    name: { en: 'Courses', zh: '課�?' },
    icon: <BookOpen className="h-5 w-5" />,
    description: { en: 'Browse our courses', zh: '?�覽?�們�?課�?' }
  },
  {
    path: '/blog',
    name: { en: 'Blog', zh: '網�?' },
    icon: <BookOpen className="h-5 w-5" />,
    description: { en: 'Read our articles', zh: '?��??�們�??��?' }
  },
  {
    path: '/about',
    name: { en: 'About', zh: '關於我們' },
    icon: <HelpCircle className="h-5 w-5" />,
    description: { en: 'Learn about us', zh: '了解我們' }
  }
]

// ?�誤?��??�數 / Error Reporting Function
const reportError = (errorData: ErrorReport): void => {
  // ?��??�環境中，這裡?�發?�到?�誤追蹤?��?
  // In production, this would send to error tracking service
  if (process.env.NODE_ENV === 'development') {
    console.warn('404 Error Report:', errorData)
  }
  
  // ?�以?��??��??�工??
  // Could integrate with analytics tools
  try {
    // 例�?: analytics.track('404_error', errorData)
  } catch (error) {
    // ?��??��??��??�誤
    // Silently handle analytics errors
  }
}

// 快速�???�置 / Quick Links Configuration
const quickLinks: QuickLink[] = [
  {
    href: '/',
    icon: Home,
    name: { en: 'Home', 'zh-HK': '首�?' },
    badge: { text: 'Popular', variant: 'default' },
    description: { en: 'Return to homepage', 'zh-HK': '返�?首�?' }
  },
  {
    href: '/courses',
    icon: BookOpen,
    name: { en: 'Courses', 'zh-HK': '課�?' },
    badge: { text: 'New', variant: 'secondary' },
    description: { en: 'Browse our courses', 'zh-HK': '?�覽?�們�?課�?' }
  },
  {
    href: '/blog',
    icon: FileText,
    name: { en: 'Blog', 'zh-HK': '網�?' },
    badge: { text: 'Updated', variant: 'outline' },
    description: { en: 'Read our articles', 'zh-HK': '?��??�們�??��?' }
  },
  {
    href: '/about',
    icon: Users,
    name: { en: 'About', 'zh-HK': '關於我們' },
    badge: { text: 'Team', variant: 'secondary' },
    description: { en: 'Learn about us', 'zh-HK': '了解我們' }
  }
]

// 主�? NotFound 組件 / Main NotFound Component
const NotFound: React.FC<NotFoundProps> = ({ statusCode = 404, customMessage }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { language } = useLanguage()
  
  // ?�?�管??/ State Management
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const notFoundTexts: Record<string, NotFoundTexts> = {
    en: {
      title: 'Oops! Page Not Found',
      subtitle: 'The page you\'re looking for doesn\'t exist.',
      description: 'Don\'t worry, it happens to the best of us. The page might have been moved, deleted, or you might have mistyped the URL.',
      quickLinks: 'Quick Links',
      backToHome: 'Back to Home',
      contactSupport: 'Contact Support',
      error404: '404',
      pageNotFound: 'Page Not Found'
    },
    'zh-HK': {
      title: '糟糕！找不到頁面',
      subtitle: '您所尋找的頁面不存在',
      description: '很抱歉，這種情況可能發生。頁面可能已移動或刪除，或您可能輸入了錯誤的網址。',
      quickLinks: '快速連結',
      backToHome: '返回首頁',
      contactSupport: '聯繫支援',
      error404: '404',
      pageNotFound: '頁面未找到'
    }
  }

  const t = notFoundTexts[language] || notFoundTexts.en

  // 設置?�面標�??��??�碼 / Set page title and status code
  useEffect(() => {
    document.title = `${statusCode} - ${t.title} | AI Formula`
    
    // 設置 meta ?�述 / Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t.description)
    }
    
    // ?�誤?��? / Error reporting
    const errorData: ErrorReport = {
      path: location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    }
    
    reportError(errorData)
  }, [statusCode, t.title, t.description, location.pathname])

  // ?�索?��? / Search handling
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return
    
    setIsSearching(true)
    
    try {
      // 模擬?�索延遲 / Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // ?�實?��??�中，這裡?�調?��?�?API
      // In real application, this would call search API
      
      // ?�於?�詢?�簡?�路?�建�?/ Simple route suggestions based on query
      const query_lower = query.toLowerCase()
      const matchingRoutes = suggestedRoutes.filter(route => 
        route.name.en.toLowerCase().includes(query_lower) ||
        route.name.zh.includes(query_lower) ||
        route.path.includes(query_lower)
      )
      
      if (matchingRoutes.length > 0) {
        setShowSuggestions(true)
      }
      
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }, [])

  // ?�盤事件?��? / Keyboard event handling
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery)
    }
  }, [searchQuery, handleSearch])

  // 返�?上�???/ Go back
  const handleGoBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }, [navigate])

  // ?�畫變�? / Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* ?�景裝飾 / Background decoration */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full relative z-10"
      >
        {/* 主�??�誤?��? / Main error card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-900 border-gray-700 mb-8">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <AlertTriangle className="h-24 w-24 text-red-400" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {statusCode}
                  </div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {t.title}
              </CardTitle>
              <CardDescription className="text-xl text-gray-300 mb-4">
                {customMessage || t.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                {t.description}
              </p>
              
              {/* ?�誤詳�? / Error details */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400">?�找?�於:</span>
                    <code className="ml-2 text-red-300 bg-gray-700 px-2 py-1 rounded">
                      {location.pathname}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-400">?��???</span>
                    <span className="ml-2 text-gray-300">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* ?�索?�??/ Search area */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="?�索?�面..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    disabled={isSearching}
                  />
                  <Button
                    onClick={() => handleSearch(searchQuery)}
                    disabled={isSearching || !searchQuery.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isSearching ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        ?�索�?..
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        ?�索
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* ?��??��? / Action buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返�?
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    返�?首�?
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 建議?�面 / Suggested pages */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Card className="bg-gray-900 border-gray-700 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Navigation className="h-5 w-5 mr-2 text-blue-400" />
                    建議?�面
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    ?�可?�正?��??�以下�??��?一
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestedRoutes.map((route, index) => (
                      <motion.div
                        key={route.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          asChild
                          variant="outline"
                          className="w-full h-auto p-4 border-gray-600 hover:border-gray-500 hover:bg-gray-800 text-left"
                        >
                          <Link to={route.path}>
                            <div className="flex items-center space-x-3">
                              <div className="text-purple-400">
                                {route.icon}
                              </div>
                              <div>
                                <div className="font-semibold text-white">
                                  {route.name[language]}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {route.description[language]}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ?�援?�??/ Support area */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                ?�要幫?��?
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-400 hover:bg-green-900/20"
                  onClick={() => {
                    // 在實際應用中，這將會開啟報告表單
                    // In real application, this would open a report form
                    alert('報告功能將在此實現')
                  }}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  報告問題
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                  onClick={() => {
                    // 在實際應用中，這將會開啟聯繫表單
                    // In real application, this would open contact form
                    window.location.href = 'mailto:support@aiformula.com'
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  ?�繫?�援
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

// 記憶?��?�?/ Memoized component
export default NotFound;
