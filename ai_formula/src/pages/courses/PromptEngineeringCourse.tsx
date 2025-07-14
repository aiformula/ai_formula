import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'
import Navigation from '@/components/Navigation'
import { LearningButton } from '@/components/ui/learning-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowRight, 
  ArrowLeft,
  Play, 
  BookOpen, 
  CheckCircle,
  Clock,
  Star,
  Users,
  Trophy,
  Home,
  RotateCcw,
  Target,
  Lightbulb,
  Award,
  Timer,
  BookOpenCheck,
  Sparkles
} from 'lucide-react'

// Ë™≤Á?‰ø°ÊÅØÁµêÊ? - ?∫Êñº?üÊú¨??PromptEngineeringLearning.tsx
interface CourseInfo {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  duration: string
  durationZh: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  instructor: string
  instructorZh: string
  rating: number
  students: number
  objectives: string[]
  objectivesZh: string[]
  prerequisites: string[]
  prerequisitesZh: string[]
  outcomes: string[]
  outcomesZh: string[]
  lessons: LessonItem[]
}

// Ë™≤Á??ÖÁõÆÁµêÊ?
interface LessonItem {
  id: string
  title: string
  titleZh: string
  type: 'reading' | 'practice' | 'quiz' | 'video' | 'summary'
  duration: string
  durationZh: string
  description: string
  descriptionZh: string
  path: string
  completed: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  icon: string
}

// Ë™≤Á??≤Â∫¶?Ä??
interface CourseProgress {
  currentLesson: string
  completedLessons: string[]
  totalLessons: number
  timeSpent: number
  lastAccessed: string
  quizScores: Record<string, number>
}

// ‰ΩøÁî®?üÊú¨ PromptEngineeringLearning.tsx ?ÖË™≤Á®ãÊï∏??
const courseInfo: CourseInfo = {
  id: 'prompt-engineering-mastery',
  title: 'Prompt Engineering Mastery',
  titleZh: '?êÁ§∫Â∑•Á?Á≤æÈÄöË™≤Á®?,
  description: 'Master the art of communicating with AI through effective prompt engineering techniques',
  descriptionZh: '?öÈ??âÊ??ÑÊ?Á§∫Â∑•Á®ãÊ?Â∑ßÔ??åÊè°?áAIÊ∫ùÈÄöÁ??ùË?',
  duration: '2 hours',
  durationZh: '2Â∞èÊ?',
  difficulty: 'intermediate',
  instructor: 'Dr. Sarah Chen',
  instructorZh: '?≥Ë??âÂ?Â£?,
  rating: 4.8,
  students: 12543,
  objectives: [
    'Understand the fundamentals of prompt engineering',
    'Learn to craft effective prompts for different AI models',
    'Master advanced techniques for complex tasks',
    'Apply prompt engineering in real-world scenarios'
  ],
  objectivesZh: [
    '?ÜËß£?êÁ§∫Â∑•Á??ÑÂü∫?¨Â???,
    'Â≠∏Á??∫‰??åAIÊ®°Â??∂‰??âÊ??êÁ§∫',
    '?åÊè°Ë§áÈ?‰ªªÂ??ÑÈ?Á¥öÊ?Â∑?,
    '?®ÂØ¶?õÂ†¥?Ø‰∏≠?âÁî®?êÁ§∫Â∑•Á?'
  ],
  prerequisites: [
    'Basic understanding of AI and machine learning',
    'Familiarity with text-based AI tools',
    'Problem-solving mindset'
  ],
  prerequisitesZh: [
    'Â∞çAI?åÊ??®Â≠∏ÁøíÁ??∫Êú¨‰∫ÜËß£',
    '?üÊ??∫Êñº?áÊú¨?ÑAIÂ∑•ÂÖ∑',
    'Ëß?±∫?èÈ??ÑÊÄùÁ∂≠?πÂ?'
  ],
  outcomes: [
    'Craft prompts that consistently produce desired results',
    'Troubleshoot and improve prompt effectiveness',
    'Adapt prompting strategies to different AI models',
    'Build systematic approaches to complex prompting tasks'
  ],
  outcomesZh: [
    '?∂‰??ΩÊ?Á∫åÁî¢?üÈ??üÁ??úÁ??êÁ§∫',
    '?íÈô§?ÖÈ?‰∏¶Ê?È´òÊ?Á§∫Ê???,
    '?ùÂ?‰∏çÂ?AIÊ®°Â?Ë™øÊï¥?êÁ§∫Á≠ñÁï•',
    'Âª∫Á??ïÁ?Ë§áÈ??êÁ§∫‰ªªÂ??ÑÁ≥ªÁµ±ÊñπÊ≥?
  ],
  lessons: [
    {
      id: 'lesson-1',
      title: 'Foundations of Prompt Engineering',
      titleZh: '?êÁ§∫Â∑•Á??∫Á?',
      type: 'reading',
      duration: '45 min',
      durationZh: '45?ÜÈ?',
      description: 'Learn the core principles and concepts of effective prompt engineering',
      descriptionZh: 'Â≠∏Á??âÊ??êÁ§∫Â∑•Á??ÑÊ†∏ÂøÉÂ??ÜÂ?Ê¶ÇÂøµ',
      path: '/prompt-engineering/lesson/1',
      completed: false,
      difficulty: 'beginner',
      icon: '??'
    },
    {
      id: 'lesson-2',
      title: 'Prompt Structure & Components',
      titleZh: '?™Ë≥™?êÁ§∫?ÑÁ?Êß?,
      type: 'reading',
      duration: '30 min',
      durationZh: '30?ÜÈ?',
      description: 'Understanding the key components that make prompts effective',
      descriptionZh: '‰∫ÜËß£ËÆìÊ?Á§∫Ê??àÁ??úÈçµÁµÑ‰ª∂',
      path: '/prompt-engineering/lesson/2',
      completed: false,
      difficulty: 'intermediate',
      icon: '??Ô∏?
    }
  ]
}

// Ë™≤Á??≤Â∫¶ÁÆ°Á?
const usePromptEngineeringProgress = () => {
  const [progress, setProgress] = useState<CourseProgress>(() => {
    const saved = localStorage.getItem('prompt_engineering_progress')
    return saved ? JSON.parse(saved) : {
      currentLesson: 'lesson-1',
      completedLessons: [],
      totalLessons: courseInfo.lessons.length,
      timeSpent: 0,
      lastAccessed: new Date().toISOString(),
      quizScores: {}
    }
  })

  const updateProgress = (updates: Partial<CourseProgress>) => {
    const newProgress = { ...progress, ...updates, lastAccessed: new Date().toISOString() }
    setProgress(newProgress)
    localStorage.setItem('prompt_engineering_progress', JSON.stringify(newProgress))
  }

  const completeLesson = (lessonId: string) => {
    const completedLessons = [...progress.completedLessons]
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId)
      updateProgress({ completedLessons })
    }
  }

  const getProgressPercentage = () => {
    return Math.round((progress.completedLessons.length / progress.totalLessons) * 100)
  }

  return {
    progress,
    updateProgress,
    completeLesson,
    getProgressPercentage
  }
}

const PromptEngineeringCourse: React.FC = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { progress, updateProgress, completeLesson, getProgressPercentage } = usePromptEngineeringProgress()
  
  const isZhTW = language === 'zh-HK'
  const progressPercentage = getProgressPercentage()

  const handleStartLesson = (lesson: LessonItem) => {
    updateProgress({ currentLesson: lesson.id })
    navigate(lesson.path)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-400'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400'
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-400'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reading': return BookOpen
      case 'practice': return Target
      case 'quiz': return Award
      case 'video': return Play
      case 'summary': return BookOpenCheck
      default: return BookOpen
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Ë™≤Á?Ê®ôÈ??åÁ∏ΩË¶?*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {isZhTW ? courseInfo.titleZh : courseInfo.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {isZhTW ? courseInfo.descriptionZh : courseInfo.description}
          </p>
          
          {/* ?≤Â∫¶È°ØÁ§∫ */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{isZhTW ? 'Â≠∏Á??≤Â∫¶' : 'Learning Progress'}</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </motion.div>

        {/* Ë™≤Á?Áµ±Ë?‰ø°ÊÅØ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{isZhTW ? courseInfo.durationZh : courseInfo.duration}</div>
              <div className="text-gray-400">{isZhTW ? 'Á∏ΩÊ??? : 'Duration'}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{courseInfo.rating}</div>
              <div className="text-gray-400">{isZhTW ? 'Ë©ïÂ?' : 'Rating'}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{courseInfo.students.toLocaleString()}</div>
              <div className="text-gray-400">{isZhTW ? 'Â≠∏Á?' : 'Students'}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{courseInfo.lessons.length}</div>
              <div className="text-gray-400">{isZhTW ? 'Ë™≤Á?' : 'Lessons'}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ë™≤Á??ßÂÆπ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-blue-400" />
            {isZhTW ? 'Ë™≤Á??ßÂÆπ' : 'Course Content'}
          </h2>
          
          <div className="space-y-4">
            {courseInfo.lessons.map((lesson, index) => {
              const isCompleted = progress.completedLessons.includes(lesson.id)
              const isCurrent = progress.currentLesson === lesson.id
              const TypeIcon = getTypeIcon(lesson.type)
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 ${
                    isCurrent ? 'border-blue-500/70 bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-700'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <span className="text-lg">{lesson.icon}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {isZhTW ? lesson.titleZh : lesson.title}
                          </h3>
                          <Badge variant="outline" className={getDifficultyColor(lesson.difficulty)}>
                            {isZhTW ? 
                              (lesson.difficulty === 'beginner' ? '?ùÁ?' : lesson.difficulty === 'intermediate' ? '‰∏≠Á?' : 'È´òÁ?') 
                              : lesson.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-400 mb-2">
                          {isZhTW ? lesson.descriptionZh : lesson.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <TypeIcon className="h-4 w-4 mr-1" />
                            {lesson.type}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {isZhTW ? lesson.durationZh : lesson.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {isCompleted && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-400">
                          {isZhTW ? 'Â∑≤Â??? : 'Completed'}
                        </Badge>
                      )}
                      
                      <LearningButton
                        intent={isCompleted ? "success" : isCurrent ? "primary" : "secondary"}
                        size="md"
                        onClick={() => handleStartLesson(lesson)}
                        className="min-w-[120px]"
                      >
                        {isCompleted ? (
                          <>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            {isZhTW ? '?çÊñ∞Â≠∏Á?' : 'Review'}
                          </>
                        ) : isCurrent ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            {isZhTW ? 'ÁπºÁ?Â≠∏Á?' : 'Continue'}
                          </>
                        ) : (
                          <>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            {isZhTW ? '?ãÂ?Â≠∏Á?' : 'Start Learning'}
                          </>
                        )}
                      </LearningButton>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Ë™≤Á??ÆÊ??åÁ???*/}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-400" />
                  {isZhTW ? 'Â≠∏Á??ÆÊ?' : 'Learning Objectives'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(isZhTW ? courseInfo.objectivesZh : courseInfo.objectives).map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                  {isZhTW ? 'Â≠∏Á??êÊ?' : 'Learning Outcomes'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(isZhTW ? courseInfo.outcomesZh : courseInfo.outcomes).map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-5 w-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PromptEngineeringCourse 
