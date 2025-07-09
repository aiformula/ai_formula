import React, { useState, useEffect, useCallback, useMemo, memo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CardLoadingSpinner } from '@/components/ui/LoadingSpinner'
import { 
  ArrowRight, 
  Play, 
  BookOpen, 
  FileText, 
  MessageCircle, 
  Info, 
  CheckCircle,
  Clock,
  Star,
  Users,
  Award,
  Loader2,
  AlertCircle
} from 'lucide-react'

// 類型定義 / Type Definitions
interface Lesson {
  id: number
  title: string
  titleZh: string
  type: 'reading' | 'practice' | 'quiz' | 'video'
  duration?: string
  durationZh?: string
  content?: string
  contentZh?: string
  description?: string
  descriptionZh?: string
  completed?: boolean
}

interface Module {
  id: number
  title: string
  titleZh: string
  lessons: Lesson[]
  estimatedTime: string
  estimatedTimeZh: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface Grade {
  id: string
  item: string
  itemZh: string
  due: string
  weight: string
  grade: string
  status: 'completed' | 'pending' | 'overdue'
}

interface CourseInfo {
  title: string
  titleZh: string
  instructor: string
  instructorZh: string
  level: string
  levelZh: string
  duration: string
  durationZh: string
  language: string
  languageZh: string
  description: string
  descriptionZh: string
  rating: number
  totalStudents: number
  certificateAvailable: boolean
}

interface TimelineItem {
  label: string
  labelZh: string
  value: string
  type: 'start' | 'due' | 'end'
  status: 'completed' | 'current' | 'upcoming'
}

interface NavigationItem {
  type: 'module' | 'grades' | 'notes' | 'messages' | 'info'
  label: string
  labelZh: string
  icon: React.ReactNode
  badge?: number
}

interface LearningProgress {
  totalLessons: number
  completedLessons: number
  percentage: number
  currentModule: number
  currentLesson: number
  timeSpent: number // in minutes
  lastAccessed: string
}

// 常量定義 / Constants
const STORAGE_KEY = 'prompt_engineering_progress'

// 課程數據 / Course Data
const moduleData: Module[] = [
  {
    id: 1,
    title: 'Lesson 1: Prompt Engineering Basics',
    titleZh: '課程 1: 提示工程基礎',
    estimatedTime: '45 minutes',
    estimatedTimeZh: '45分鐘',
    difficulty: 'beginner',
    lessons: [
      {
        id: 1,
        title: 'Welcome to Prompt Engineering Mastery!',
        titleZh: '歡迎來到提示工程精通課程！',
        type: 'reading',
        duration: '5 min',
        durationZh: '5分鐘',
        content: 'This comprehensive course will teach you the fundamentals, structure, and best practices of AI prompt engineering. You\'ll learn how to communicate effectively with AI models to achieve better, more consistent results.',
        contentZh: '本全面課程會教你AI提示工程的基礎、結構和最佳實踐。你會學到如何有效地和AI模型溝通，獲得更好、更一致的結果。'
      },
      {
        id: 2,
        title: 'What is Prompt Engineering?',
        titleZh: '什麼是提示工程？',
        type: 'reading',
        duration: '8 min',
        durationZh: '8分鐘',
        content: 'Prompt engineering is the art and science of crafting inputs that guide AI models to produce desired outputs. It combines understanding of language, psychology, and technology to optimize AI interactions.',
        contentZh: '提示工程是製作輸入指令的藝術和科學，用來指導AI模型產生想要的輸出。它結合了語言學、心理學和技術的理解，來優化AI互動。'
      },
      {
        id: 3,
        title: 'Understanding Prompts',
        titleZh: '理解提示',
        type: 'reading',
        duration: '10 min',
        durationZh: '10分鐘',
        content: 'A prompt is any input you give to a generative AI model to guide its response. Prompts can be questions, statements, instructions, examples, or combinations of these elements.',
        contentZh: '提示是你給生成式AI模型的任何輸入，用來指導它的回應。提示可以是問題、陳述、指令、例子，或這些元素的組合。'
      },
      {
        id: 4,
        title: 'The Four Elements of Effective Prompts',
        titleZh: '有效提示的四大元素',
        type: 'reading',
        duration: '15 min',
        durationZh: '15分鐘',
        content: 'Effective prompts typically include four key elements: Role Setting (who the AI should be), Task Description (what to do), Output Format (how to respond), and Context (background information).',
        contentZh: '有效的提示通常包含四個關鍵元素：角色設定（AI應該是誰）、任務描述（要做什麼）、輸出格式（如何回應）、和上下文（背景資訊）。'
      },
      {
        id: 5,
        title: 'Practice: Basic Prompt Creation',
        titleZh: '練習：基本提示創建',
        type: 'practice',
        duration: '7 min',
        durationZh: '7分鐘',
        content: 'Apply what you\'ve learned by creating your first structured prompt using the four essential elements.',
        contentZh: '運用你學到的知識，使用四個基本元素創建你的第一個結構化提示。'
      }
    ]
  },
  {
    id: 2,
    title: 'Lesson 2: Anatomy of a Well-Crafted Prompt',
    titleZh: '課程 2: 優質提示的結構',
    estimatedTime: '60 minutes',
    estimatedTimeZh: '60分鐘',
    difficulty: 'intermediate',
    lessons: [
      {
        id: 1,
        title: 'Instruction Components',
        titleZh: '指令組件',
        type: 'reading',
        duration: '10 min',
        durationZh: '10分鐘',
        description: 'Learn how to craft clear, actionable instructions for AI models.',
        descriptionZh: '學習如何為AI模型製作清晰、可操作的指令。'
      },
      {
        id: 2,
        title: 'Context and Background',
        titleZh: '上下文和背景',
        type: 'reading',
        duration: '8 min',
        durationZh: '8分鐘',
        description: 'Understand how to provide effective context for better AI understanding.',
        descriptionZh: '了解如何提供有效的上下文，讓AI更好地理解。'
      },
      {
        id: 3,
        title: 'Input Data Formatting',
        titleZh: '輸入數據格式化',
        type: 'reading',
        duration: '12 min',
        durationZh: '12分鐘',
        description: 'Master the art of structuring input data for optimal AI processing.',
        descriptionZh: '掌握結構化輸入數據的藝術，實現最佳AI處理效果。'
      },
      {
        id: 4,
        title: 'Output Specifications',
        titleZh: '輸出規格',
        type: 'reading',
        duration: '10 min',
        durationZh: '10分鐘',
        description: 'Define precise output requirements including format, tone, and length.',
        descriptionZh: '定義精確的輸出要求，包括格式、語調和長度。'
      },
      {
        id: 5,
        title: 'Complete Example Analysis',
        titleZh: '完整範例分析',
        type: 'reading',
        duration: '15 min',
        durationZh: '15分鐘',
        description: 'Analyze a comprehensive prompt example incorporating all elements.',
        descriptionZh: '分析一個包含所有元素的全面提示範例。'
      },
      {
        id: 6,
        title: 'Hands-on Practice',
        titleZh: '實踐練習',
        type: 'practice',
        duration: '20 min',
        durationZh: '20分鐘',
        description: 'Create complex prompts using all four structural elements.',
        descriptionZh: '使用所有四個結構元素創建複雜的提示。'
      },
      {
        id: 7,
        title: 'Assessment Quiz',
        titleZh: '評估測驗',
        type: 'quiz',
        duration: '15 min',
        durationZh: '15分鐘',
        description: 'Test your understanding of prompt structure and components.',
        descriptionZh: '測試你對提示結構和組件的理解。'
      }
    ]
  }
]

// 課程成績數據 / Course Grades Data
const gradesData: Grade[] = [
  {
    id: '1',
    item: 'Quiz 1: Prompt Basics',
    itemZh: '測驗 1：提示基礎',
    due: 'Mar 20, 2024',
    weight: '15%',
    grade: '92%',
    status: 'completed'
  },
  {
    id: '2',
    item: 'Assignment: Prompt Structure',
    itemZh: '作業：提示結構',
    due: 'Mar 30, 2024',
    weight: '25%',
    grade: '--',
    status: 'pending'
  },
  {
    id: '3',
    item: 'Final Project',
    itemZh: '期末專案',
    due: 'Apr 10, 2024',
    weight: '40%',
    grade: '--',
    status: 'pending'
  }
]

// 課程時間線數據 / Course Timeline Data
const courseTimeline: TimelineItem[] = [
  {
    label: 'Course Start',
    labelZh: '課程開始',
    value: 'Mar 15, 2024',
    type: 'start',
    status: 'completed'
  },
  {
    label: 'Assignment Due',
    labelZh: '作業截止',
    value: 'Mar 30, 2024',
    type: 'due',
    status: 'current'
  },
  {
    label: 'Course End',
    labelZh: '課程結束',
    value: 'Apr 15, 2024',
    type: 'end',
    status: 'upcoming'
  }
]

const courseInfo: CourseInfo = {
  title: 'Prompt Engineering Mastery - AI Communication Skills',
  titleZh: '提示工程精通 - AI溝通技巧',
  instructor: 'AI Formula Expert Team',
  instructorZh: 'AI Formula 專家團隊',
  level: 'Intermediate',
  levelZh: '中級',
  duration: '8 weeks, 2-3 hours per week',
  durationZh: '8週，每週2-3小時',
  language: 'English / Traditional Chinese',
  languageZh: '英文 / 繁體中文',
  description: 'Master the art and science of prompt engineering to effectively communicate with AI models and achieve consistent, high-quality results across various applications.',
  descriptionZh: '精通提示工程的藝術和科學，有效地與AI模型溝通，在各種應用中獲得一致、高質量的結果。',
  rating: 4.9,
  totalStudents: 1247,
  certificateAvailable: true
}

// Custom Hooks
const useProgressTracking = () => {
  const [progress, setProgress] = useState<LearningProgress>({
    totalLessons: 0,
    completedLessons: 0,
    percentage: 0,
    currentModule: 1,
    currentLesson: 1,
    timeSpent: 0,
    lastAccessed: new Date().toISOString()
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true)
      const stored = localStorage.getItem(STORAGE_KEY)
      
      if (stored) {
        const parsed = JSON.parse(stored)
        setProgress(parsed)
      } else {
        // 計算總課程數 / Calculate total lessons
        const totalLessons = moduleData.reduce((sum, module) => sum + module.lessons.length, 0)
        setProgress(prev => ({ ...prev, totalLessons }))
      }
    } catch (err) {
      console.error('Failed to load progress:', err)
      setError('Failed to load learning progress')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProgress = useCallback((newProgress: Partial<LearningProgress>) => {
    try {
      setProgress(prev => {
        const updated = { ...prev, ...newProgress, lastAccessed: new Date().toISOString() }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      console.error('Failed to save progress:', err)
      setError('Failed to save progress')
    }
  }, [])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  return { progress, updateProgress, loading, error }
}

// 組件定義 / Component Definitions
const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = memo(({ message, onRetry }) => {
  const { language } = useLanguage()
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
      <p className="text-gray-300 text-center mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          {language === 'zh-TW' ? '重試' : 'Retry'}
        </Button>
      )}
    </div>
  )
})

ErrorMessage.displayName = 'ErrorMessage'

const ModuleCard: React.FC<{ 
  module: Module
  progress: number
  isActive: boolean
  onClick: () => void
}> = memo(({ module, progress, isActive, onClick }) => {
  const { language } = useLanguage()
  
  const difficultyColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 ${
          isActive 
            ? 'bg-blue-900/50 border-blue-500' 
            : 'bg-gray-900 border-gray-700 hover:border-gray-600'
        }`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg font-semibold text-white">
              {language === 'zh-TW' ? module.titleZh : module.title}
            </CardTitle>
            <Badge 
              className={`${difficultyColors[module.difficulty]} text-white text-xs`}
            >
              {language === 'zh-TW' 
                ? module.difficulty === 'beginner' ? '初級' : module.difficulty === 'intermediate' ? '中級' : '高級'
                : module.difficulty
              }
            </Badge>
          </div>
          <CardDescription className="text-gray-400">
            <Clock className="inline h-4 w-4 mr-1" />
            {language === 'zh-TW' ? module.estimatedTimeZh : module.estimatedTime}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-400 mt-1">
              {language === 'zh-TW' ? `進度 ${progress}%` : `${progress}% Complete`}
            </p>
          </div>
          <p className="text-sm text-gray-300">
            {language === 'zh-TW' ? `${module.lessons.length} 個課程` : `${module.lessons.length} lessons`}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
})

ModuleCard.displayName = 'ModuleCard'

const LessonList: React.FC<{ 
  module: Module
  selectedLesson: number
  onLessonSelect: (index: number) => void
}> = memo(({ module, selectedLesson, onLessonSelect }) => {
  const { language } = useLanguage()
  
  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'reading': return <BookOpen className="h-4 w-4" />
      case 'practice': return <FileText className="h-4 w-4" />
      case 'quiz': return <Award className="h-4 w-4" />
      case 'video': return <Play className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: Lesson['type']) => {
    switch (type) {
      case 'reading': return 'text-blue-400'
      case 'practice': return 'text-green-400'
      case 'quiz': return 'text-yellow-400'
      case 'video': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-2">
      {module.lessons.map((lesson, index) => (
        <motion.button
          key={lesson.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
            selectedLesson === index
              ? 'bg-blue-700 text-white shadow-lg'
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          }`}
          onClick={() => onLessonSelect(index)}
        >
          <div className={`flex-shrink-0 ${getTypeColor(lesson.type)}`}>
            {getTypeIcon(lesson.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">
              {language === 'zh-TW' ? lesson.titleZh : lesson.title}
            </h4>
            {lesson.duration && (
              <p className="text-sm opacity-75">
                {language === 'zh-TW' ? lesson.durationZh : lesson.duration}
              </p>
            )}
          </div>
          {lesson.completed && (
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          )}
        </motion.button>
      ))}
    </div>
  )
})

LessonList.displayName = 'LessonList'

const ProgressSidebar: React.FC<{ 
  progress: LearningProgress
  timeline: TimelineItem[]
}> = memo(({ progress, timeline }) => {
  const { language } = useLanguage()

  return (
    <div className="space-y-6">
      {/* 進度追蹤 / Progress Tracking */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-400">
            <Award className="h-5 w-5 mr-2" />
            {language === 'zh-TW' ? '學習進度' : 'Learning Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Progress value={progress.percentage} className="h-3 mb-2" />
            <p className="text-sm text-gray-300">
              {language === 'zh-TW' 
                ? `已完成 ${progress.completedLessons} / ${progress.totalLessons} 課程`
                : `${progress.completedLessons} / ${progress.totalLessons} lessons completed`
              }
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">{language === 'zh-TW' ? '學習時間' : 'Time Spent'}</p>
              <p className="text-white font-medium">
                {Math.floor(progress.timeSpent / 60)}h {progress.timeSpent % 60}m
              </p>
            </div>
            <div>
              <p className="text-gray-400">{language === 'zh-TW' ? '當前模組' : 'Current Module'}</p>
              <p className="text-white font-medium">{progress.currentModule}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 課程時間線 / Course Timeline */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-green-400">
            <Clock className="h-5 w-5 mr-2" />
            {language === 'zh-TW' ? '課程時間線' : 'Course Timeline'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'current' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">
                    {language === 'zh-TW' ? item.labelZh : item.label}
                  </p>
                  <p className="text-xs text-gray-400">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 課程統計 / Course Stats */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-400">
            <Users className="h-5 w-5 mr-2" />
            {language === 'zh-TW' ? '課程統計' : 'Course Stats'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">{language === 'zh-TW' ? '評分' : 'Rating'}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-white">{courseInfo.rating}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{language === 'zh-TW' ? '學生數' : 'Students'}</span>
            <span className="text-white">{courseInfo.totalStudents.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{language === 'zh-TW' ? '證書' : 'Certificate'}</span>
            <span className="text-green-400">
              {courseInfo.certificateAvailable 
                ? (language === 'zh-TW' ? '可獲得' : 'Available')
                : (language === 'zh-TW' ? '不可用' : 'N/A')
              }
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

ProgressSidebar.displayName = 'ProgressSidebar'

// 主組件 / Main Component
const PromptEngineeringLearning: React.FC = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { progress, updateProgress, loading, error } = useProgressTracking()
  
  // 狀態管理 / State Management
  const [selectedModule, setSelectedModule] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(0)
  const [activeTab, setActiveTab] = useState('modules')

  // 導航項目 / Navigation Items
  const navigationItems: NavigationItem[] = useMemo(() => [
    {
      type: 'module',
      label: 'Modules',
      labelZh: '模組',
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      type: 'grades',
      label: 'Grades',
      labelZh: '成績',
      icon: <Award className="h-4 w-4" />,
      badge: gradesData.filter(g => g.status === 'pending').length
    },
    {
      type: 'notes',
      label: 'Notes',
      labelZh: '筆記',
      icon: <FileText className="h-4 w-4" />
    },
    {
      type: 'messages',
      label: 'Messages',
      labelZh: '訊息',
      icon: <MessageCircle className="h-4 w-4" />,
      badge: 2
    },
    {
      type: 'info',
      label: 'Course Info',
      labelZh: '課程資訊',
      icon: <Info className="h-4 w-4" />
    }
  ], [])

  // 設置頁面標題 / Set page title
  useEffect(() => {
    const title = language === 'zh-TW' 
      ? `${courseInfo.titleZh} | AI Formula`
      : `${courseInfo.title} | AI Formula`
    document.title = title
  }, [language])

  // 事件處理器 / Event Handlers
  const handleModuleSelect = useCallback((moduleIndex: number) => {
    setSelectedModule(moduleIndex)
    setSelectedLesson(0)
    setActiveTab('modules')
  }, [])

  const handleLessonSelect = useCallback((lessonIndex: number) => {
    setSelectedLesson(lessonIndex)
  }, [])

  const handleStartLesson = useCallback(() => {
    const currentModule = moduleData[selectedModule]
    navigate(`/prompt-engineering/lesson/${currentModule.id}`)
  }, [selectedModule, navigate])

  const calculateModuleProgress = useCallback((moduleIndex: number) => {
    const module = moduleData[moduleIndex]
    const completedLessons = module.lessons.filter(lesson => lesson.completed).length
    return Math.round((completedLessons / module.lessons.length) * 100)
  }, [])

  // 如果載入中 / If loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-20">
          <CardLoadingSpinner />
        </div>
      </div>
    )
  }

  // 如果有錯誤 / If error
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-20">
          <ErrorMessage message={error} />
        </div>
      </div>
    )
  }

  const currentModule = moduleData[selectedModule]
  const currentLesson = currentModule?.lessons[selectedLesson]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        
        <div className="flex pt-20">
          {/* 左側導航 / Left Navigation */}
          <motion.aside
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col"
          >
            <div className="p-6 border-b border-gray-800">
              <h1 className="text-2xl font-bold text-blue-400">
                {language === 'zh-TW' ? '提示工程精通' : 'Prompt Engineering Mastery'}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {language === 'zh-TW' ? 'AI溝通技巧課程' : 'AI Communication Skills Course'}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 m-4">
                <TabsTrigger value="modules" className="text-xs">
                  {language === 'zh-TW' ? '課程' : 'Course'}
                </TabsTrigger>
                <TabsTrigger value="other" className="text-xs">
                  {language === 'zh-TW' ? '其他' : 'Other'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="px-4 pb-4 space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {language === 'zh-TW' ? '課程模組' : 'Course Modules'}
                </h3>
                {moduleData.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    progress={calculateModuleProgress(index)}
                    isActive={selectedModule === index}
                    onClick={() => handleModuleSelect(index)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="other" className="px-4 pb-4 space-y-2">
                {navigationItems.slice(1).map((item) => (
                  <Button
                    key={item.type}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={() => setActiveTab(item.type)}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{language === 'zh-TW' ? item.labelZh : item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </TabsContent>
            </Tabs>
          </motion.aside>

          {/* 主要內容 / Main Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-8"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'modules' && currentModule && (
                <motion.div
                  key="modules"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* 模組標題 / Module Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {language === 'zh-TW' ? currentModule.titleZh : currentModule.title}
                      </h2>
                      <p className="text-gray-400">
                        {language === 'zh-TW' 
                          ? `${currentModule.lessons.length} 個課程 • ${currentModule.estimatedTimeZh}`
                          : `${currentModule.lessons.length} lessons • ${currentModule.estimatedTime}`
                        }
                      </p>
                    </div>
                    <Button
                      onClick={handleStartLesson}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {language === 'zh-TW' ? '開始學習' : 'Start Learning'}
                    </Button>
                  </div>

                  {/* 課程列表 / Lesson List */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {language === 'zh-TW' ? '課程內容' : 'Lesson Content'}
                      </h3>
                      <LessonList
                        module={currentModule}
                        selectedLesson={selectedLesson}
                        onLessonSelect={handleLessonSelect}
                      />
                    </div>

                    {/* 課程詳情 / Lesson Details */}
                    <div>
                      {currentLesson && (
                        <Card className="bg-gray-900 border-gray-700 sticky top-8">
                          <CardHeader>
                            <CardTitle className="text-lg text-white">
                              {language === 'zh-TW' ? currentLesson.titleZh : currentLesson.title}
                            </CardTitle>
                            {currentLesson.duration && (
                              <CardDescription className="flex items-center text-gray-400">
                                <Clock className="h-4 w-4 mr-1" />
                                {language === 'zh-TW' ? currentLesson.durationZh : currentLesson.duration}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {language === 'zh-TW' 
                                ? (currentLesson.contentZh || currentLesson.descriptionZh)
                                : (currentLesson.content || currentLesson.description)
                              }
                            </p>
                            <Button
                              onClick={handleStartLesson}
                              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                            >
                              <ArrowRight className="mr-2 h-4 w-4" />
                              {language === 'zh-TW' ? '開始課程' : 'Start Lesson'}
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 其他標籤內容可以在這裡添加 */}
              {/* Other tab content can be added here */}
            </AnimatePresence>
          </motion.main>

          {/* 右側進度欄 / Right Progress Sidebar */}
          <motion.aside
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-80 bg-gray-950 border-l border-gray-800 p-6"
          >
            <Suspense fallback={<CardLoadingSpinner />}>
              <ProgressSidebar 
                progress={progress} 
                timeline={courseTimeline}
              />
            </Suspense>
          </motion.aside>
        </div>
      </div>
    </ErrorBoundary>
  )
}

// 記憶化主組件 / Memoized Main Component
export default PromptEngineeringLearning; 