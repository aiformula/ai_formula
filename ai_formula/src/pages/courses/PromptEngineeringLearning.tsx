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
  AlertCircle,
  TrendingUp,
  BookMarked,
  Lightbulb,
  Target,
  Calendar,
  Trophy,
  Flame
} from 'lucide-react'

// ?��?載�?�?
const ProgressTracker = React.lazy(() => import('@/components/course/ProgressTracker'))
const LearningNotes = React.lazy(() => import('@/components/course/LearningNotes'))
const LearningRecommendations = React.lazy(() => import('@/components/course/LearningRecommendations'))

// 類�?定義 / Type Definitions
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

}

interface TimelineItem {
  label: string
  labelZh: string
  value: string
  type: 'start' | 'due' | 'end'
  status: 'completed' | 'current' | 'upcoming'
}

interface NavigationItem {
  type: 'module' | 'grades' | 'notes' | 'messages' | 'info' | 'progress' | 'recommendations'
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

// 常�?定義 / Constants
const STORAGE_KEY = 'prompt_engineering_progress'

// 輔助?�數：根?�localStorage檢查課�??�目?�否完�?
const isLessonItemCompleted = (lessonId: string, itemKey: string): boolean => {
  try {
    const stored = localStorage.getItem(`pe_${lessonId}_completed`)
    if (!stored) return false
    const completed = JSON.parse(stored)
    return Array.isArray(completed) && completed.includes(itemKey)
  } catch {
    return false
  }
}

// 輔助?�數：獲?�課程�??��?中�??�稱
const getTypeDisplayName = (type: Lesson['type'], isZhTW: boolean): string => {
  if (!isZhTW) return type
  
  switch (type) {
    case 'reading':
      return '?��?'
    case 'practice':
      return '練�?'
    case 'quiz':
      return '測�?'
    case 'video':
      return '影�?'
    default:
      return type
  }
}

// 課�??��? / Course Data - ?��?實�?lesson 1?�lesson 2?��??�更??
const getModuleData = (): Module[] => [
  {
    id: 1,
    title: 'Lesson 1: Foundations of Prompt Engineering',
    titleZh: '第�?課�??�示工�??��?',
    estimatedTime: '25 minutes',
    estimatedTimeZh: '25?��?',
    difficulty: 'beginner',
    lessons: [
      {
        id: 1,
        title: 'What is Prompt Engineering?',
        titleZh: '什麼是?�示工�?�?,
        type: 'reading',
        duration: '4 min',
        durationZh: '4?��?',
        content: 'Introduction to the concept and importance of prompt engineering.',
        contentZh: '?�示工�?概念?��?要性�?紹�?,
        completed: isLessonItemCompleted('lesson1', 'what-is-prompt-engineering')
      },
      {
        id: 2,
        title: 'Core Principles',
        titleZh: '?��??��?',
        type: 'reading',
        duration: '5 min',
        durationZh: '5?��?',
        content: 'Essential principles that make prompts effective.',
        contentZh: '讓�?示�??��??�本?��???,
        completed: isLessonItemCompleted('lesson1', 'core-principles')
      },
      {
        id: 3,
        title: 'Types of Prompts',
        titleZh: '?�示類�?',
        type: 'reading',
        duration: '4 min',
        durationZh: '4?��?',
        content: 'Different categories of prompts and their applications.',
        contentZh: '不�?類別?��?示�??��??��?,
        completed: isLessonItemCompleted('lesson1', 'types-of-prompts')
      },
      {
        id: 4,
        title: 'Best Practices',
        titleZh: '?�佳實�?,
        type: 'reading',
        duration: '5 min',
        durationZh: '5?��?',
        content: 'Proven strategies for crafting effective prompts.',
        contentZh: '?��??��??�示?��?驗�?策略??,
        completed: isLessonItemCompleted('lesson1', 'best-practices')
      },
      {
        id: 5,
        title: 'Common Mistakes',
        titleZh: '常�??�誤',
        type: 'reading',
        duration: '3 min',
        durationZh: '3?��?',
        content: 'Typical pitfalls in prompt engineering and how to avoid them.',
        contentZh: '?�示工�?中�??��??�阱?��?何避?��?,
        completed: isLessonItemCompleted('lesson1', 'common-mistakes')
      },
      {
        id: 6,
        title: 'Practice Quiz',
        titleZh: '練�?測�?',
        type: 'quiz',
        duration: '4 min',
        durationZh: '4?��?',
        content: 'Test your understanding of prompt engineering fundamentals.',
        contentZh: '測試?��??�示工�??��??��?�?�?,
        completed: isLessonItemCompleted('lesson1', 'quiz')
      }
    ]
  },
  {
    id: 2,
    title: 'Lesson 2: Prompt Structure & Components',
    titleZh: '第�?課�??�質?�示?��?�?,
    estimatedTime: '18 minutes',
    estimatedTimeZh: '18?��?',
    difficulty: 'intermediate',
    lessons: [
      {
        id: 1,
        title: 'Instruction',
        titleZh: '?�令',
        type: 'reading',
        duration: '3 min',
        durationZh: '3?��?',
        description: 'Tell the AI what to do, clearly define action requirements and goals.',
        descriptionZh: '?�訴AI要�?什麼�?清晰定義?��?要�??�目標�?,
        completed: isLessonItemCompleted('lesson2', 'instruction')
      },
      {
        id: 2,
        title: 'Context',
        titleZh: '?�景',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?��?',
        description: 'Provide background information to help the AI understand the situation.',
        descriptionZh: '?��??�景資�?以幫?�AI?�解?��???,
        completed: isLessonItemCompleted('lesson2', 'context')
      },
      {
        id: 3,
        title: 'Input Data',
        titleZh: '輸入?��?',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?��?',
        description: 'Provide specific information or data to help the AI generate more precise content.',
        descriptionZh: '?��??��?資�??�數?�以幫助AI?��??�精確�??�容??,
        completed: isLessonItemCompleted('lesson2', 'input-data')
      },
      {
        id: 4,
        title: 'Output Indicator',
        titleZh: '輸出?��?',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?��?',
        description: 'Define the format, tone, length, and other requirements for the answer.',
        descriptionZh: '定義答�??�格式、�?調、長度�??��?要�???,
        completed: isLessonItemCompleted('lesson2', 'output-indicator')
      },
      {
        id: 5,
        title: 'Complete Example',
        titleZh: '綜�?範�?',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?��?',
        description: 'Analyze a comprehensive prompt example incorporating all elements.',
        descriptionZh: '?��?一?��??��??��?素�??�面?�示範�???,
        completed: isLessonItemCompleted('lesson2', 'complete-example')
      },
      {
        id: 6,
        title: 'Advanced Techniques',
        titleZh: '?��??��?,
        type: 'reading',
        duration: '2 min',
        durationZh: '2?��?',
        description: 'Explore advanced prompting techniques for complex scenarios.',
        descriptionZh: '?�索複�??�景?�進�??�示?�巧�?,
        completed: isLessonItemCompleted('lesson2', 'advanced-techniques')
      },
      {
        id: 7,
        title: 'Assessment Quiz',
        titleZh: '評估測�?',
        type: 'quiz',
        duration: '5 min',
        durationZh: '5?��?',
        description: 'Test your understanding of prompt structure and components.',
        descriptionZh: '測試?��??�示結�??��?件�??�解??,
        completed: isLessonItemCompleted('lesson2', 'quiz')
      }
    ]
  }
]

// 課�??�績?��? / Course Grades Data
const gradesData: Grade[] = [
  {
    id: '1',
    item: 'Quiz 1: Prompt Basics',
    itemZh: '測�? 1：�?示基�?,
    due: 'Mar 20, 2024',
    weight: '15%',
    grade: '92%',
    status: 'completed'
  },
  {
    id: '2',
    item: 'Assignment: Prompt Structure',
    itemZh: '作業：�?示�?�?,
    due: 'Mar 30, 2024',
    weight: '25%',
    grade: '--',
    status: 'pending'
  },
  {
    id: '3',
    item: 'Final Project',
    itemZh: '?�末專�?',
    due: 'Apr 10, 2024',
    weight: '40%',
    grade: '--',
    status: 'pending'
  }
]

// 課�??��?線數??/ Course Timeline Data - ?��??�實課�??��??�新
const courseTimeline: TimelineItem[] = [
  {
    label: 'Course Start',
    labelZh: '課�??��?',
    value: 'Mar 15, 2024',
    type: 'start',
    status: 'completed'
  },
  {
    label: 'Assignment Due',
    labelZh: '作業?�止',
    value: 'Mar 30, 2024',
    type: 'due',
    status: 'current'
  },
  {
    label: 'Course End',
    labelZh: '課�?結�?',
    value: 'Apr 15, 2024',
    type: 'end',
    status: 'upcoming'
  }
]

const courseInfo: CourseInfo = {
  title: 'Prompt Engineering Mastery - AI Communication Skills',
  titleZh: '?�示工�?精�?- AI溝通�?�?,
  instructor: 'AI Formula Expert Team',
  instructorZh: 'AI Formula 專家?��?',
  level: 'Intermediate',
  levelZh: '中�?',
  duration: '43 minutes total, 2 lessons',
  durationZh: '總共43?��?�??�課�?,
  language: 'English / Traditional Chinese',
  languageZh: '?��? / 繁�?中�?',
  description: 'Master the art and science of prompt engineering to effectively communicate with AI models and achieve consistent, high-quality results across various applications.',
  descriptionZh: '精通�?示工程�??��??��?學�??��??��?AI模�?溝通�??��?種�??�中?��?一?�、�?質�??��??��?,
  rating: 4.9,
  totalStudents: 1247,
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
        // 計�?總課程數 / Calculate total lessons
        const moduleData = getModuleData()
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
          {language === 'zh-HK' ? '?�試' : 'Retry'}
        </Button>
      )}
    </div>
  )
})

ErrorMessage.displayName = 'ErrorMessage'

const LessonCard: React.FC<{ lesson: Lesson; moduleId: number; onStart: () => void }> = memo(({ lesson, moduleId, onStart }) => {
  const { language } = useLanguage()
  const isZhTW = language === 'zh-HK'
  
  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'reading':
        return <BookOpen className="h-4 w-4" />
      case 'practice':
        return <FileText className="h-4 w-4" />
      case 'quiz':
        return <MessageCircle className="h-4 w-4" />
      case 'video':
        return <Play className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: Lesson['type']) => {
    switch (type) {
      case 'reading':
        return 'bg-blue-500/20 text-blue-400'
      case 'practice':
        return 'bg-green-500/20 text-green-400'
      case 'quiz':
        return 'bg-purple-500/20 text-purple-400'
      case 'video':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getTypeColor(lesson.type)}`}>
                {getTypeIcon(lesson.type)}
              </div>
              <div>
                <CardTitle className="text-white text-sm">
                  {isZhTW ? lesson.titleZh : lesson.title}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {getTypeDisplayName(lesson.type, isZhTW)}
                  </Badge>
                  <span className="text-gray-400 text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {isZhTW ? lesson.durationZh : lesson.duration}
                  </span>
                </div>
              </div>
            </div>
            {lesson.completed && (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {isZhTW ? (lesson.descriptionZh || lesson.contentZh) : (lesson.description || lesson.content)}
          </p>
          <Button
            onClick={onStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            {lesson.completed ? 
              (isZhTW ? '?�新學�?' : 'Review') : 
              (isZhTW ? '?��?學�?' : 'Start Learning')
            }
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
})

LessonCard.displayName = 'LessonCard'

const ModuleCard: React.FC<{ module: Module; onLessonStart: (moduleId: number, lessonId: number) => void }> = memo(({ module, onLessonStart }) => {
  const { language } = useLanguage()
  const isZhTW = language === 'zh-HK'
  
  const completedLessons = module.lessons.filter(lesson => lesson.completed).length
  const progressPercentage = (completedLessons / module.lessons.length) * 100

  const getDifficultyColor = (difficulty: Module['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'advanced':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getDifficultyDisplayName = (difficulty: Module['difficulty'], isZhTW: boolean): string => {
    if (!isZhTW) return difficulty
    
    switch (difficulty) {
      case 'beginner':
        return '?��?'
      case 'intermediate':
        return '中�?'
      case 'advanced':
        return '高�?'
      default:
        return difficulty
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-xl mb-2">
                {isZhTW ? module.titleZh : module.title}
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                  {getDifficultyDisplayName(module.difficulty, isZhTW)}
                </Badge>
                <span className="text-gray-400 text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {isZhTW ? module.estimatedTimeZh : module.estimatedTime}
                </span>
                <span className="text-gray-400 text-sm">
                  {completedLessons}/{module.lessons.length} {isZhTW ? '已�??? : 'completed'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white mb-1">
                {Math.round(progressPercentage)}%
              </div>
              <Progress value={progressPercentage} className="w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {module.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                moduleId={module.id}
                onStart={() => onLessonStart(module.id, lesson.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

ModuleCard.displayName = 'ModuleCard'

const GradesTable: React.FC<{ grades: Grade[] }> = memo(({ grades }) => {
  const { language } = useLanguage()
  const isZhTW = language === 'zh-HK'
  
  const getStatusColor = (status: Grade['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'overdue':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '?�目' : 'Item'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '?�止?��?' : 'Due Date'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '權�?' : 'Weight'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '?�績' : 'Grade'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '?�?? : 'Status'}
            </th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id} className="border-b border-gray-800">
              <td className="py-3 px-4 text-white">
                {isZhTW ? grade.itemZh : grade.item}
              </td>
              <td className="py-3 px-4 text-gray-300">{grade.due}</td>
              <td className="py-3 px-4 text-gray-300">{grade.weight}</td>
              <td className="py-3 px-4 text-white font-semibold">{grade.grade}</td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={getStatusColor(grade.status)}>
                  {isZhTW ? (
                    grade.status === 'completed' ? '已�??? : 
                    grade.status === 'pending' ? '待�??? : '?��?'
                  ) : grade.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

GradesTable.displayName = 'GradesTable'

const TimelineCard: React.FC<{ timeline: TimelineItem[] }> = memo(({ timeline }) => {
  const { language } = useLanguage()
  const isZhTW = language === 'zh-HK'
  
  const getStatusColor = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'current':
        return 'bg-blue-500'
      case 'upcoming':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-400" />
          {isZhTW ? '課�??��?�? : 'Course Timeline'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
              <div className="flex-1">
                <div className="text-white font-medium">
                  {isZhTW ? item.labelZh : item.label}
                </div>
                <div className="text-gray-400 text-sm">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
})

TimelineCard.displayName = 'TimelineCard'

const CourseInfoCard: React.FC<{ courseInfo: CourseInfo }> = memo(({ courseInfo }) => {
  const { language } = useLanguage()
  const isZhTW = language === 'zh-HK'
  
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-400" />
          {isZhTW ? '課�?資�?' : 'Course Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {isZhTW ? courseInfo.titleZh : courseInfo.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isZhTW ? courseInfo.descriptionZh : courseInfo.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-gray-400 text-sm">{isZhTW ? '講師' : 'Instructor'}</div>
              <div className="text-white">{isZhTW ? courseInfo.instructorZh : courseInfo.instructor}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">{isZhTW ? '??��' : 'Level'}</div>
              <div className="text-white">{isZhTW ? courseInfo.levelZh : courseInfo.level}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">{isZhTW ? '課�??�度' : 'Duration'}</div>
              <div className="text-white">{isZhTW ? courseInfo.durationZh : courseInfo.duration}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">{isZhTW ? '語�?' : 'Language'}</div>
              <div className="text-white">{isZhTW ? courseInfo.languageZh : courseInfo.language}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">{courseInfo.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-white">{courseInfo.totalStudents.toLocaleString()} {isZhTW ? '學�?' : 'students'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

CourseInfoCard.displayName = 'CourseInfoCard'

const PromptEngineeringLearning: React.FC = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const isZhTW = language === 'zh-HK'
  
  const { progress, updateProgress, loading, error } = useProgressTracking()
  const [activeTab, setActiveTab] = useState('課�?')
  
  // 使用 useState 來強?��??�渲?��???localStorage ?�新??
  const [refreshKey, setRefreshKey] = useState(0)
  
  // ??�� localStorage 變�?
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1)
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // 也監?��?一?�面?��? localStorage 變�?
    const originalSetItem = localStorage.setItem
    localStorage.setItem = function(key: string, value: string) {
      originalSetItem.call(this, key, value)
      if (key.startsWith('pe_lesson')) {
        handleStorageChange()
      }
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      localStorage.setItem = originalSetItem
    }
  }, [])
  
  // ?��?實�?模�??��?
  const moduleData = useMemo(() => getModuleData(), [refreshKey])
  
  // 計�?總進度
  const totalProgress = useMemo(() => {
    const allLessons = moduleData.flatMap(module => module.lessons)
    const completedLessons = allLessons.filter(lesson => lesson.completed).length
    const totalLessons = allLessons.length
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    
    return {
      completedLessons,
      totalLessons,
      percentage
    }
  }, [moduleData])

  const handleLessonStart = useCallback((moduleId: number, lessonId: number) => {
    updateProgress({
      currentModule: moduleId,
      currentLesson: lessonId,
      timeSpent: progress.timeSpent + 1
    })
    
    // 導航?�相?��?課�??�面
    if (moduleId === 1) {
      navigate('/prompt-engineering/lesson/1')
    } else if (moduleId === 2) {
      navigate('/prompt-engineering/lesson/2')
    }
  }, [navigate, progress.timeSpent, updateProgress])

  const navigationItems: NavigationItem[] = useMemo(() => [
    {
      type: 'module',
      label: 'Modules',
      labelZh: '課�?',
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      type: 'progress',
      label: 'Progress',
      labelZh: '?�績',
      icon: <TrendingUp className="h-4 w-4" />,
      badge: 2
    },
    {
      type: 'notes',
      label: 'Notes',
      labelZh: '筆�?',
      icon: <BookMarked className="h-4 w-4" />,
      badge: 2
    },
    {
      type: 'recommendations',
      label: 'Recommendations',
      labelZh: '訊息',
      icon: <Lightbulb className="h-4 w-4" />,
      badge: 2
    },
    {
      type: 'info',
      label: 'Course Info',
      labelZh: '課�?資�?',
      icon: <Info className="h-4 w-4" />,
    },
  ], [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-8">
          <CardLoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-8">
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* 標�??�進度概覽 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {isZhTW ? '?�示工�?精�? : 'Prompt Engineering Mastery'}
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {isZhTW ? 'AI溝通�?巧課�? : 'AI Communication Skills'}
          </p>
          
          {/* 總進度 */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{isZhTW ? '總進度' : 'Overall Progress'}</span>
              <span>{totalProgress.percentage}%</span>
            </div>
            <Progress value={totalProgress.percentage} className="h-3" />
            <p className="text-xs text-gray-500 mt-1">
              {totalProgress.completedLessons} / {totalProgress.totalLessons} {isZhTW ? '課�?已�??? : 'lessons completed'}
            </p>
          </div>
        </motion.div>

        {/* 主�??�容 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 mb-8">
            {navigationItems.map((item) => (
              <TabsTrigger 
                key={item.type}
                value={isZhTW ? item.labelZh : item.label}
                className="flex items-center space-x-2 text-sm"
              >
                {item.icon}
                <span>{isZhTW ? item.labelZh : item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="課�?" className="space-y-6">
            <div className="space-y-6">
              {moduleData.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onLessonStart={handleLessonStart}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="?�績" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-400" />
                    {isZhTW ? '?�績�? : 'Grade Book'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GradesTable grades={gradesData} />
                </CardContent>
              </Card>
              
              <TimelineCard timeline={courseTimeline} />
            </div>
          </TabsContent>

          <TabsContent value="筆�?" className="space-y-6">
            <Suspense fallback={<CardLoadingSpinner />}>
              <LearningNotes />
            </Suspense>
          </TabsContent>

          <TabsContent value="訊息" className="space-y-6">
            <Suspense fallback={<CardLoadingSpinner />}>
              <LearningRecommendations />
            </Suspense>
          </TabsContent>

          <TabsContent value="課�?資�?" className="space-y-6">
            <CourseInfoCard courseInfo={courseInfo} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default PromptEngineeringLearning 