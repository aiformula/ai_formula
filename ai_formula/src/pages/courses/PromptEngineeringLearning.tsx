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

// ?∂Â?ËºâÁ?‰ª?
const ProgressTracker = React.lazy(() => import('@/components/course/ProgressTracker'))
const LearningNotes = React.lazy(() => import('@/components/course/LearningNotes'))
const LearningRecommendations = React.lazy(() => import('@/components/course/LearningRecommendations'))

// È°ûÂ?ÂÆöÁæ© / Type Definitions
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

// Â∏∏È?ÂÆöÁæ© / Constants
const STORAGE_KEY = 'prompt_engineering_progress'

// ËºîÂä©?ΩÊï∏ÔºöÊ†π?ölocalStorageÊ™¢Êü•Ë™≤Á??ÖÁõÆ?ØÂê¶ÂÆåÊ?
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

// ËºîÂä©?ΩÊï∏ÔºöÁç≤?ñË™≤Á®ãÈ??ãÁ?‰∏≠Ê??çÁ®±
const getTypeDisplayName = (type: Lesson['type'], isZhTW: boolean): string => {
  if (!isZhTW) return type
  
  switch (type) {
    case 'reading':
      return '?±Ë?'
    case 'practice':
      return 'Á∑¥Á?'
    case 'quiz':
      return 'Ê∏¨È?'
    case 'video':
      return 'ÂΩ±Á?'
    default:
      return type
  }
}

// Ë™≤Á??∏Ê? / Course Data - ?πÊ?ÂØ¶È?lesson 1?ålesson 2?ÑÊ??ìÊõ¥??
const getModuleData = (): Module[] => [
  {
    id: 1,
    title: 'Lesson 1: Foundations of Prompt Engineering',
    titleZh: 'Á¨¨‰?Ë™≤Ô??êÁ§∫Â∑•Á??∫Á?',
    estimatedTime: '25 minutes',
    estimatedTimeZh: '25?ÜÈ?',
    difficulty: 'beginner',
    lessons: [
      {
        id: 1,
        title: 'What is Prompt Engineering?',
        titleZh: '‰ªÄÈ∫ºÊòØ?êÁ§∫Â∑•Á?Ôº?,
        type: 'reading',
        duration: '4 min',
        durationZh: '4?ÜÈ?',
        content: 'Introduction to the concept and importance of prompt engineering.',
        contentZh: '?êÁ§∫Â∑•Á?Ê¶ÇÂøµ?äÈ?Ë¶ÅÊÄß‰?Á¥π„Ä?,
        completed: isLessonItemCompleted('lesson1', 'what-is-prompt-engineering')
      },
      {
        id: 2,
        title: 'Core Principles',
        titleZh: '?∏Â??üÂ?',
        type: 'reading',
        duration: '5 min',
        durationZh: '5?ÜÈ?',
        content: 'Essential principles that make prompts effective.',
        contentZh: 'ËÆìÊ?Á§∫Ê??àÁ??∫Êú¨?üÂ???,
        completed: isLessonItemCompleted('lesson1', 'core-principles')
      },
      {
        id: 3,
        title: 'Types of Prompts',
        titleZh: '?êÁ§∫È°ûÂ?',
        type: 'reading',
        duration: '4 min',
        durationZh: '4?ÜÈ?',
        content: 'Different categories of prompts and their applications.',
        contentZh: '‰∏çÂ?È°ûÂà•?ÑÊ?Á§∫Â??∂Ê??®„Ä?,
        completed: isLessonItemCompleted('lesson1', 'types-of-prompts')
      },
      {
        id: 4,
        title: 'Best Practices',
        titleZh: '?Ä‰Ω≥ÂØ¶Ë∏?,
        type: 'reading',
        duration: '5 min',
        durationZh: '5?ÜÈ?',
        content: 'Proven strategies for crafting effective prompts.',
        contentZh: '?∂‰??âÊ??êÁ§∫?ÑÁ?È©óË?Á≠ñÁï•??,
        completed: isLessonItemCompleted('lesson1', 'best-practices')
      },
      {
        id: 5,
        title: 'Common Mistakes',
        titleZh: 'Â∏∏Ë??ØË™§',
        type: 'reading',
        duration: '3 min',
        durationZh: '3?ÜÈ?',
        content: 'Typical pitfalls in prompt engineering and how to avoid them.',
        contentZh: '?êÁ§∫Â∑•Á?‰∏≠Á??∏Â??∑Èò±?äÂ?‰ΩïÈÅø?ç„Ä?,
        completed: isLessonItemCompleted('lesson1', 'common-mistakes')
      },
      {
        id: 6,
        title: 'Practice Quiz',
        titleZh: 'Á∑¥Á?Ê∏¨È?',
        type: 'quiz',
        duration: '4 min',
        durationZh: '4?ÜÈ?',
        content: 'Test your understanding of prompt engineering fundamentals.',
        contentZh: 'Ê∏¨Ë©¶?®Â??êÁ§∫Â∑•Á??∫Á??ÑÁ?Ëß?Ä?,
        completed: isLessonItemCompleted('lesson1', 'quiz')
      }
    ]
  },
  {
    id: 2,
    title: 'Lesson 2: Prompt Structure & Components',
    titleZh: 'Á¨¨‰?Ë™≤Ô??™Ë≥™?êÁ§∫?ÑÁ?Êß?,
    estimatedTime: '18 minutes',
    estimatedTimeZh: '18?ÜÈ?',
    difficulty: 'intermediate',
    lessons: [
      {
        id: 1,
        title: 'Instruction',
        titleZh: '?á‰ª§',
        type: 'reading',
        duration: '3 min',
        durationZh: '3?ÜÈ?',
        description: 'Tell the AI what to do, clearly define action requirements and goals.',
        descriptionZh: '?äË®¥AIË¶ÅÂ?‰ªÄÈ∫ºÔ?Ê∏ÖÊô∞ÂÆöÁæ©?ï‰?Ë¶ÅÊ??åÁõÆÊ®ô„Ä?,
        completed: isLessonItemCompleted('lesson2', 'instruction')
      },
      {
        id: 2,
        title: 'Context',
        titleZh: '?åÊôØ',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?ÜÈ?',
        description: 'Provide background information to help the AI understand the situation.',
        descriptionZh: '?ê‰??åÊôØË≥áË?‰ª•Âπ´?©AI?ÜËß£?ÖÊ???,
        completed: isLessonItemCompleted('lesson2', 'context')
      },
      {
        id: 3,
        title: 'Input Data',
        titleZh: 'Ëº∏ÂÖ•?∏Ê?',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?ÜÈ?',
        description: 'Provide specific information or data to help the AI generate more precise content.',
        descriptionZh: '?ê‰??πÂ?Ë≥áË??ñÊï∏?ö‰ª•Âπ´Âä©AI?üÊ??¥Á≤æÁ¢∫Á??ßÂÆπ??,
        completed: isLessonItemCompleted('lesson2', 'input-data')
      },
      {
        id: 4,
        title: 'Output Indicator',
        titleZh: 'Ëº∏Âá∫?áÊ?',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?ÜÈ?',
        description: 'Define the format, tone, length, and other requirements for the answer.',
        descriptionZh: 'ÂÆöÁæ©Á≠îÊ??ÑÊ†ºÂºè„ÄÅË?Ë™ø„ÄÅÈï∑Â∫¶Â??∂‰?Ë¶ÅÊ???,
        completed: isLessonItemCompleted('lesson2', 'output-indicator')
      },
      {
        id: 5,
        title: 'Complete Example',
        titleZh: 'Á∂úÂ?ÁØÑ‰?',
        type: 'reading',
        duration: '2 min',
        durationZh: '2?ÜÈ?',
        description: 'Analyze a comprehensive prompt example incorporating all elements.',
        descriptionZh: '?ÜÊ?‰∏Ä?ãÂ??´Ê??âÂ?Á¥†Á??®Èù¢?êÁ§∫ÁØÑ‰???,
        completed: isLessonItemCompleted('lesson2', 'complete-example')
      },
      {
        id: 6,
        title: 'Advanced Techniques',
        titleZh: '?≤È??ÄÂ∑?,
        type: 'reading',
        duration: '2 min',
        durationZh: '2?ÜÈ?',
        description: 'Explore advanced prompting techniques for complex scenarios.',
        descriptionZh: '?¢Á¥¢Ë§áÈ??¥ÊôØ?ÑÈÄ≤È??êÁ§∫?ÄÂ∑ß„Ä?,
        completed: isLessonItemCompleted('lesson2', 'advanced-techniques')
      },
      {
        id: 7,
        title: 'Assessment Quiz',
        titleZh: 'Ë©ï‰º∞Ê∏¨È?',
        type: 'quiz',
        duration: '5 min',
        durationZh: '5?ÜÈ?',
        description: 'Test your understanding of prompt structure and components.',
        descriptionZh: 'Ê∏¨Ë©¶?®Â??êÁ§∫ÁµêÊ??åÁ?‰ª∂Á??ÜËß£??,
        completed: isLessonItemCompleted('lesson2', 'quiz')
      }
    ]
  }
]

// Ë™≤Á??êÁ∏æ?∏Ê? / Course Grades Data
const gradesData: Grade[] = [
  {
    id: '1',
    item: 'Quiz 1: Prompt Basics',
    itemZh: 'Ê∏¨È? 1ÔºöÊ?Á§∫Âü∫Á§?,
    due: 'Mar 20, 2024',
    weight: '15%',
    grade: '92%',
    status: 'completed'
  },
  {
    id: '2',
    item: 'Assignment: Prompt Structure',
    itemZh: '‰ΩúÊ•≠ÔºöÊ?Á§∫Á?Êß?,
    due: 'Mar 30, 2024',
    weight: '25%',
    grade: '--',
    status: 'pending'
  },
  {
    id: '3',
    item: 'Final Project',
    itemZh: '?üÊú´Â∞àÊ?',
    due: 'Apr 10, 2024',
    weight: '40%',
    grade: '--',
    status: 'pending'
  }
]

// Ë™≤Á??ÇÈ?Á∑öÊï∏??/ Course Timeline Data - ?πÊ??üÂØ¶Ë™≤Á??ÇÈ??¥Êñ∞
const courseTimeline: TimelineItem[] = [
  {
    label: 'Course Start',
    labelZh: 'Ë™≤Á??ãÂ?',
    value: 'Mar 15, 2024',
    type: 'start',
    status: 'completed'
  },
  {
    label: 'Assignment Due',
    labelZh: '‰ΩúÊ•≠?™Ê≠¢',
    value: 'Mar 30, 2024',
    type: 'due',
    status: 'current'
  },
  {
    label: 'Course End',
    labelZh: 'Ë™≤Á?ÁµêÊ?',
    value: 'Apr 15, 2024',
    type: 'end',
    status: 'upcoming'
  }
]

const courseInfo: CourseInfo = {
  title: 'Prompt Engineering Mastery - AI Communication Skills',
  titleZh: '?êÁ§∫Â∑•Á?Á≤æÈÄ?- AIÊ∫ùÈÄöÊ?Â∑?,
  instructor: 'AI Formula Expert Team',
  instructorZh: 'AI Formula Â∞àÂÆ∂?òÈ?',
  level: 'Intermediate',
  levelZh: '‰∏≠Á?',
  duration: '43 minutes total, 2 lessons',
  durationZh: 'Á∏ΩÂÖ±43?ÜÈ?Ôº??ãË™≤Á®?,
  language: 'English / Traditional Chinese',
  languageZh: '?±Ê? / ÁπÅÈ?‰∏≠Ê?',
  description: 'Master the art and science of prompt engineering to effectively communicate with AI models and achieve consistent, high-quality results across various applications.',
  descriptionZh: 'Á≤æÈÄöÊ?Á§∫Â∑•Á®ãÁ??ùË??åÁ?Â≠∏Ô??âÊ??∞Ë?AIÊ®°Â?Ê∫ùÈÄöÔ??®Â?Á®ÆÊ??®‰∏≠?≤Â?‰∏Ä?¥„ÄÅÈ?Ë≥™È??ÑÁ??ú„Ä?,
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
        // Ë®àÁ?Á∏ΩË™≤Á®ãÊï∏ / Calculate total lessons
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

// ÁµÑ‰ª∂ÂÆöÁæ© / Component Definitions
const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = memo(({ message, onRetry }) => {
  const { language } = useLanguage()
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
      <p className="text-gray-300 text-center mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          {language === 'zh-HK' ? '?çË©¶' : 'Retry'}
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
              (isZhTW ? '?çÊñ∞Â≠∏Á?' : 'Review') : 
              (isZhTW ? '?ãÂ?Â≠∏Á?' : 'Start Learning')
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
        return '?ùÁ?'
      case 'intermediate':
        return '‰∏≠Á?'
      case 'advanced':
        return 'È´òÁ?'
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
                  {completedLessons}/{module.lessons.length} {isZhTW ? 'Â∑≤Â??? : 'completed'}
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
              {isZhTW ? '?ÖÁõÆ' : 'Item'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '?™Ê≠¢?•Ê?' : 'Due Date'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? 'Ê¨äÈ?' : 'Weight'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '?êÁ∏æ' : 'Grade'}
            </th>
            <th className="text-left py-3 px-4 text-gray-300">
              {isZhTW ? '?Ä?? : 'Status'}
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
                    grade.status === 'completed' ? 'Â∑≤Â??? : 
                    grade.status === 'pending' ? 'ÂæÖÂ??? : '?æÊ?'
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
          {isZhTW ? 'Ë™≤Á??ÇÈ?Á∑? : 'Course Timeline'}
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
          {isZhTW ? 'Ë™≤Á?Ë≥áË?' : 'Course Information'}
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
              <div className="text-gray-400 text-sm">{isZhTW ? 'Ë¨õÂ∏´' : 'Instructor'}</div>
              <div className="text-white">{isZhTW ? courseInfo.instructorZh : courseInfo.instructor}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">{isZhTW ? '??∫¶' : 'Level'}</div>
              <div className="text-white">{isZhTW ? courseInfo.levelZh : courseInfo.level}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">{isZhTW ? 'Ë™≤Á??∑Â∫¶' : 'Duration'}</div>
              <div className="text-white">{isZhTW ? courseInfo.durationZh : courseInfo.duration}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">{isZhTW ? 'Ë™ûË?' : 'Language'}</div>
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
              <span className="text-white">{courseInfo.totalStudents.toLocaleString()} {isZhTW ? 'Â≠∏Á?' : 'students'}</span>
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
  const [activeTab, setActiveTab] = useState('Ë™≤Á?')
  
  // ‰ΩøÁî® useState ‰æÜÂº∑?∂È??∞Ê∏≤?ìÔ???localStorage ?¥Êñ∞??
  const [refreshKey, setRefreshKey] = useState(0)
  
  // ??ÅΩ localStorage ËÆäÂ?
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1)
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // ‰πüÁõ£?ΩÂ?‰∏Ä?ÅÈù¢?ßÁ? localStorage ËÆäÂ?
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
  
  // ?≤Â?ÂØ¶Ê?Ê®°Á??∏Ê?
  const moduleData = useMemo(() => getModuleData(), [refreshKey])
  
  // Ë®àÁ?Á∏ΩÈÄ≤Â∫¶
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
    
    // Â∞éËà™?∞Áõ∏?âÁ?Ë™≤Á??ÅÈù¢
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
      labelZh: 'Ë™≤Á?',
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      type: 'progress',
      label: 'Progress',
      labelZh: '?êÁ∏æ',
      icon: <TrendingUp className="h-4 w-4" />,
      badge: 2
    },
    {
      type: 'notes',
      label: 'Notes',
      labelZh: 'Á≠ÜË?',
      icon: <BookMarked className="h-4 w-4" />,
      badge: 2
    },
    {
      type: 'recommendations',
      label: 'Recommendations',
      labelZh: 'Ë®äÊÅØ',
      icon: <Lightbulb className="h-4 w-4" />,
      badge: 2
    },
    {
      type: 'info',
      label: 'Course Info',
      labelZh: 'Ë™≤Á?Ë≥áË?',
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
        {/* Ê®ôÈ??åÈÄ≤Â∫¶Ê¶ÇË¶Ω */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {isZhTW ? '?êÁ§∫Â∑•Á?Á≤æÈÄ? : 'Prompt Engineering Mastery'}
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {isZhTW ? 'AIÊ∫ùÈÄöÊ?Â∑ßË™≤Á®? : 'AI Communication Skills'}
          </p>
          
          {/* Á∏ΩÈÄ≤Â∫¶ */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{isZhTW ? 'Á∏ΩÈÄ≤Â∫¶' : 'Overall Progress'}</span>
              <span>{totalProgress.percentage}%</span>
            </div>
            <Progress value={totalProgress.percentage} className="h-3" />
            <p className="text-xs text-gray-500 mt-1">
              {totalProgress.completedLessons} / {totalProgress.totalLessons} {isZhTW ? 'Ë™≤Á?Â∑≤Â??? : 'lessons completed'}
            </p>
          </div>
        </motion.div>

        {/* ‰∏ªË??ßÂÆπ */}
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

          <TabsContent value="Ë™≤Á?" className="space-y-6">
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

          <TabsContent value="?êÁ∏æ" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-400" />
                    {isZhTW ? '?êÁ∏æÁ∞? : 'Grade Book'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GradesTable grades={gradesData} />
                </CardContent>
              </Card>
              
              <TimelineCard timeline={courseTimeline} />
            </div>
          </TabsContent>

          <TabsContent value="Á≠ÜË?" className="space-y-6">
            <Suspense fallback={<CardLoadingSpinner />}>
              <LearningNotes />
            </Suspense>
          </TabsContent>

          <TabsContent value="Ë®äÊÅØ" className="space-y-6">
            <Suspense fallback={<CardLoadingSpinner />}>
              <LearningRecommendations />
            </Suspense>
          </TabsContent>

          <TabsContent value="Ë™≤Á?Ë≥áË?" className="space-y-6">
            <CourseInfoCard courseInfo={courseInfo} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default PromptEngineeringLearning 