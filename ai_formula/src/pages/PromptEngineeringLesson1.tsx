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
  ArrowLeft, 
  CheckCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  BookOpen,
  Play,
  Award,
  Clock,
  ArrowRight,
  Loader2,
  AlertCircle,
  Home
} from 'lucide-react'

// 類型定義 / Type Definitions
interface LessonContent {
  title: string
  titleZh: string
  content: React.ReactNode
  contentZh: React.ReactNode
}

interface LessonItem {
  key: string
  title: string
  titleZh: string
  type: 'reading' | 'practice' | 'quiz' | 'video' | 'summary'
  icon: string
  duration: string
  durationZh: string
  description: string
  descriptionZh: string
  content: LessonContent['content']
  contentZh: LessonContent['contentZh']
  estimatedMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prerequisites?: string[]
  learningObjectives: string[]
  learningObjectivesZh: string[]
}

interface LessonSection {
  group: string
  groupZh: string
  groupIcon: string
  items: LessonItem[]
  estimatedTotalMinutes: number
  description: string
  descriptionZh: string
}

interface LessonProgress {
  completedItems: string[]
  currentItem: string
  timeSpent: number // in minutes
  lastAccessed: string
  ratings: Record<string, 'like' | 'dislike'>
  notes: Record<string, string>
}

interface NavigationState {
  canGoPrevious: boolean
  canGoNext: boolean
  previousItem?: LessonItem
  nextItem?: LessonItem
  currentIndex: number
  totalItems: number
}

interface LessonFeedback {
  type: 'like' | 'dislike' | 'report'
  itemKey: string
  message?: string
  timestamp: string
}

// 常量定義 / Constants
const STORAGE_KEY = 'prompt_engineering_lesson1_progress'
const FEEDBACK_STORAGE_KEY = 'prompt_engineering_lesson1_feedback'

// 課程內容數據 / Course Content Data
const createLessonContent = (language: 'en' | 'zh'): LessonSection[] => {
  const isZhTW = language === 'zh'
  
  return [
    {
      group: isZhTW ? '課堂 1：提示基礎' : 'Lesson 1: Prompt Fundamentals',
      groupZh: '課堂 1：提示基礎',
      groupIcon: '📚',
      estimatedTotalMinutes: 18,
      description: isZhTW ? '學習 AI 提示的基本概念和結構' : 'Learn fundamental concepts and structure of AI prompts',
      descriptionZh: '學習 AI 提示的基本概念和結構',
      items: [
        {
          key: 'intro',
          title: isZhTW ? '什麼是提示？' : 'What is a Prompt?',
          titleZh: '什麼是提示？',
          type: 'reading',
          icon: '📖',
          duration: isZhTW ? '5分鐘' : '5 min',
          durationZh: '5分鐘',
          estimatedMinutes: 5,
          difficulty: 'beginner',
          description: isZhTW ? '生成式AI中，提示的定義、重要性和例子。' : 'Definition, importance, and examples of prompts in generative AI.',
          descriptionZh: '生成式AI中，提示的定義、重要性和例子。',
          learningObjectives: [
            'Understand what a prompt is',
            'Learn why prompts are important',
            'See examples of different prompt types'
          ],
          learningObjectivesZh: [
            '理解什麼是提示',
            '了解為什麼提示很重要',
            '看到不同類型提示的例子'
          ],
          content: (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Welcome to AI Formula's Prompt Engineering Series</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  In this first lesson, we'll dive into a foundational question: <strong className="text-white">What is a prompt, and why does it matter in the world of generative AI?</strong>
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Understanding prompts — and learning how to write them effectively — is one of the most important skills when working with generative AI models like ChatGPT, Gemini, Claude, or Mistral.
                </p>
                <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-blue-200">
                    <strong>Key Insight:</strong> A well-crafted prompt can guide a model to generate clear, accurate, and useful output. A vague or poorly written prompt may result in irrelevant or confusing responses.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-400 flex items-center">
                  <span className="mr-2">🧠</span>
                  What is a Prompt?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  A <strong className="text-white">prompt</strong> is any input — typically in natural language — that you give to a generative AI model to guide its response. Think of it as an instruction, a task description, or a question that tells the AI what to do.
                </p>
                
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-white mb-2">Prompts can take many forms:</h4>
                  <ul className="list-disc ml-6 space-y-2 text-gray-300">
                    <li>A simple instruction: <em className="text-blue-300">"Translate this sentence into French."</em></li>
                    <li>A question: <em className="text-blue-300">"What are the benefits of renewable energy?"</em></li>
                    <li>A role assignment: <em className="text-blue-300">"Act as a career advisor and write a resume summary."</em></li>
                    <li>A set of constraints: <em className="text-blue-300">"Write a formal letter in 100 words."</em></li>
                  </ul>
                </div>
                
                <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-yellow-200">
                    <strong>Remember:</strong> These inputs are what drive the model's output. If your prompt is unclear or lacks context, the AI may struggle to generate helpful results.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400 flex items-center">
                  <span className="mr-2">🌟</span>
                  Why Prompts Matter
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Unlike traditional software, generative AI doesn't follow fixed logic trees. Instead, it uses patterns learned from massive amounts of data to predict the most likely output based on your input.
                </p>
                
                <div className="my-6 p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl text-center">
                  <p className="text-xl font-bold text-white">
                    The quality of the prompt = The quality of the response
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">A well-designed prompt:</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>Clearly communicates your task</li>
                    <li>Provides necessary context</li>
                    <li>Defines the output format (length, tone, structure)</li>
                    <li>May include role-based instructions to shape the AI's "persona"</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-orange-400 flex items-center">
                  <span className="mr-2">🎯</span>
                  Prompt Examples: Basic vs. Enhanced
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">Let's examine the difference between a basic and an enhanced prompt:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                    <h4 className="font-semibold text-red-300 mb-2 flex items-center">
                      <span className="mr-2">❌</span>
                      Basic Prompt
                    </h4>
                    <p className="text-gray-300 font-mono text-sm bg-gray-900 p-2 rounded">
                      "Write about climate change"
                    </p>
                    <p className="text-red-200 text-sm mt-2">
                      Too vague, no context or format specified
                    </p>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                    <h4 className="font-semibold text-green-300 mb-2 flex items-center">
                      <span className="mr-2">✅</span>
                      Enhanced Prompt
                    </h4>
                    <p className="text-gray-300 font-mono text-sm bg-gray-900 p-2 rounded">
                      "As an environmental scientist, write a 200-word summary explaining the main causes and effects of climate change for high school students, using simple language and bullet points."
                    </p>
                    <p className="text-green-200 text-sm mt-2">
                      Clear role, specific task, defined audience and format
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
          contentZh: (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-400">歡迎來到 AI Formula 提示工程系列</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  在第一課，我們會深入探討一個基礎問題：<strong className="text-white">什麼是提示？為什麼在生成式AI世界這麼重要？</strong>
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  學會如何寫好提示，是使用ChatGPT、Gemini、Claude、Mistral等生成式AI模型時最重要的技能之一。
                </p>
                <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-blue-200">
                    <strong>關鍵洞察：</strong> 一個寫得好的提示可以讓AI產生清晰、準確、有用的輸出；相反，模糊或不清楚的提示只會讓AI給你無關或隨意的答案。
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-400 flex items-center">
                  <span className="mr-2">🧠</span>
                  什麼是提示？
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-white">提示</strong>是你給生成式AI模型的任何輸入（通常是自然語言），用來指導它產生回應。你可以把它當作一個指令、一個任務描述，或者一個問題，告訴AI要做什麼。
                </p>
                
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-white mb-2">提示可以有很多種形式：</h4>
                  <ul className="list-disc ml-6 space-y-2 text-gray-300">
                    <li>簡單指令：<em className="text-blue-300">「將這句話翻譯成法文。」</em></li>
                    <li>問題：<em className="text-blue-300">「可再生能源有什麼好處？」</em></li>
                    <li>角色分配：<em className="text-blue-300">「扮演職業顧問，寫一段履歷簡介。」</em></li>
                    <li>加限制：<em className="text-blue-300">「用100字寫一封正式信件。」</em></li>
                  </ul>
                </div>
                
                <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-yellow-200">
                    <strong>記住：</strong> 這些輸入就是驅動AI產生輸出的關鍵。如果你的提示不清楚或者沒有上下文，AI就很難給到你有用的答案。
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400 flex items-center">
                  <span className="mr-2">🌟</span>
                  為什麼提示這麼重要
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  與傳統軟件不同，生成式AI不是按照固定規則運作。它是靠大量數據學習出來的模式，根據你的輸入預測最有可能的輸出。
                </p>
                
                <div className="my-6 p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl text-center">
                  <p className="text-xl font-bold text-white">
                    提示品質 = 輸出品質
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">一個設計得好的提示：</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>清楚說明你要AI做什麼</li>
                    <li>提供必要的背景或上下文</li>
                    <li>定義輸出格式（長度、語氣、結構）</li>
                    <li>可以加角色指令，讓AI「扮演」某個身份</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-orange-400 flex items-center">
                  <span className="mr-2">🎯</span>
                  提示例子：基本 vs 優化
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">一起看看基本提示和優化提示的分別：</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                    <h4 className="font-semibold text-red-300 mb-2 flex items-center">
                      <span className="mr-2">❌</span>
                      基本提示
                    </h4>
                    <p className="text-gray-300 font-mono text-sm bg-gray-900 p-2 rounded">
                      "寫一篇關於氣候變化的文章"
                    </p>
                    <p className="text-red-200 text-sm mt-2">
                      太模糊，沒有指定背景或格式
                    </p>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                    <h4 className="font-semibold text-green-300 mb-2 flex items-center">
                      <span className="mr-2">✅</span>
                      優化提示
                    </h4>
                    <p className="text-gray-300 font-mono text-sm bg-gray-900 p-2 rounded">
                      "你是一位環境科學家，請用200字、簡單易懂的語言和項目符號，為中學生解釋氣候變化的主要成因和影響。"
                    </p>
                    <p className="text-green-200 text-sm mt-2">
                      清楚的角色、具體任務、定義受眾和格式
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        // ... 其他課程項目會在下一個編輯中添加
      ]
    }
  ]
}

// Custom Hooks
const useProgressTracking = () => {
  const [progress, setProgress] = useState<LessonProgress>({
    completedItems: [],
    currentItem: '',
    timeSpent: 0,
    lastAccessed: new Date().toISOString(),
    ratings: {},
    notes: {}
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
      }
    } catch (err) {
      console.error('Failed to load progress:', err)
      setError('Failed to load learning progress')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProgress = useCallback((updates: Partial<LessonProgress>) => {
    try {
      setProgress(prev => {
        const updated = { 
          ...prev, 
          ...updates, 
          lastAccessed: new Date().toISOString() 
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      console.error('Failed to save progress:', err)
      setError('Failed to save progress')
    }
  }, [])

  const markAsCompleted = useCallback((itemKey: string) => {
    updateProgress({
      completedItems: [...progress.completedItems.filter(key => key !== itemKey), itemKey],
      currentItem: itemKey
    })
  }, [progress.completedItems, updateProgress])

  const submitFeedback = useCallback((feedback: Omit<LessonFeedback, 'timestamp'>) => {
    try {
      const fullFeedback: LessonFeedback = {
        ...feedback,
        timestamp: new Date().toISOString()
      }
      
      const existing = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]')
      existing.push(fullFeedback)
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existing))
      
      // Update ratings in progress
      if (feedback.type === 'like' || feedback.type === 'dislike') {
        updateProgress({
          ratings: {
            ...progress.ratings,
            [feedback.itemKey]: feedback.type
          }
        })
      }
    } catch (err) {
      console.error('Failed to submit feedback:', err)
      setError('Failed to submit feedback')
    }
  }, [progress.ratings, updateProgress])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  return {
    progress,
    updateProgress,
    markAsCompleted,
    submitFeedback,
    loading,
    error
  }
}

const useNavigation = (sections: LessonSection[], currentItemKey: string) => {
  return useMemo((): NavigationState => {
    const allItems = sections.flatMap(section => section.items)
    const currentIndex = allItems.findIndex(item => item.key === currentItemKey)
    
    return {
      canGoPrevious: currentIndex > 0,
      canGoNext: currentIndex < allItems.length - 1,
      previousItem: currentIndex > 0 ? allItems[currentIndex - 1] : undefined,
      nextItem: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined,
      currentIndex,
      totalItems: allItems.length
    }
  }, [sections, currentItemKey])
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

const LessonSidebar: React.FC<{
  sections: LessonSection[]
  selectedKey: string
  onSelect: (key: string) => void
  completedItems: string[]
}> = memo(({ sections, selectedKey, onSelect, completedItems }) => {
  const { language } = useLanguage()
  
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col py-8 px-4 gap-2 min-h-screen"
    >
      {sections.map(section => (
        <div key={section.group} className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-gray-300 text-lg font-bold tracking-wide">
            <span className="text-2xl">{section.groupIcon}</span>
            <span>{language === 'zh-TW' ? section.groupZh : section.group}</span>
          </div>
          <div className="text-xs text-gray-400 mb-3">
            {language === 'zh-TW' ? section.descriptionZh : section.description}
          </div>
          <div className="flex flex-col gap-1">
            {section.items.map(item => (
              <button
                key={item.key}
                className={`group flex flex-col items-start w-full px-4 py-3 rounded-lg text-left font-medium transition-all relative overflow-hidden
                  ${selectedKey === item.key 
                    ? 'bg-blue-700 text-white border-l-4 border-blue-400 shadow-lg' 
                    : 'bg-gray-900 text-gray-200 hover:bg-gray-800 hover:text-blue-200'
                  }`}
                onClick={() => onSelect(item.key)}
              >
                <div className="flex items-center w-full">
                  <span className="mr-3 text-xl">
                    {completedItems.includes(item.key) ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <span className="text-2xl">{item.icon}</span>
                    )}
                  </span>
                  <span className="flex-1 text-sm">
                    {language === 'zh-TW' ? item.titleZh : item.title}
                  </span>
                  <Badge 
                    variant={item.type === 'summary' ? 'default' : 'secondary'}
                    className="ml-2 text-xs"
                  >
                    {language === 'zh-TW' ? item.durationZh : item.duration}
                  </Badge>
                </div>
                {item.description && (
                  <span className="mt-1 ml-9 text-xs text-gray-400 group-hover:text-blue-200 line-clamp-2">
                    {language === 'zh-TW' ? item.descriptionZh : item.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </motion.aside>
  )
})

LessonSidebar.displayName = 'LessonSidebar'

const LessonNavigation: React.FC<{
  navigation: NavigationState
  onNavigate: (direction: 'previous' | 'next') => void
  onBackToLearning: () => void
}> = memo(({ navigation, onNavigate, onBackToLearning }) => {
  const { language } = useLanguage()
  
  return (
    <nav className="flex items-center justify-between mb-6 px-4">
      <div className="flex items-center text-sm text-blue-400 space-x-2">
        <button 
          onClick={onBackToLearning}
          className="hover:underline flex items-center gap-1"
        >
          <Home className="h-4 w-4" />
          {language === 'zh-TW' ? '提示工程精通' : 'Prompt Engineering Mastery'}
        </button>
        <span>&gt;</span>
        <span className="font-semibold text-blue-300">
          {language === 'zh-TW' ? '課堂 1' : 'Lesson 1'}
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-400">
          {navigation.currentIndex + 1} / {navigation.totalItems}
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('previous')}
            disabled={!navigation.canGoPrevious}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'zh-TW' ? '上一個' : 'Previous'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('next')}
            disabled={!navigation.canGoNext}
            className="flex items-center gap-1"
          >
            {language === 'zh-TW' ? '下一個' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
})

LessonNavigation.displayName = 'LessonNavigation'

const LessonContent: React.FC<{
  item: LessonItem
  isCompleted: boolean
  onComplete: () => void
  onFeedback: (type: 'like' | 'dislike' | 'report') => void
  userRating?: 'like' | 'dislike'
}> = memo(({ item, isCompleted, onComplete, onFeedback, userRating }) => {
  const { language } = useLanguage()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-xl flex flex-col min-h-[500px]"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {language === 'zh-TW' ? item.titleZh : item.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {language === 'zh-TW' ? item.durationZh : item.duration}
            </span>
            <Badge variant="outline">
              {language === 'zh-TW' 
                ? item.difficulty === 'beginner' ? '初級' : item.difficulty === 'intermediate' ? '中級' : '高級'
                : item.difficulty
              }
            </Badge>
          </div>
        </div>
        <div className="text-2xl">{item.icon}</div>
      </div>
      
      <div className="flex-1 text-lg leading-relaxed mb-10">
        {language === 'zh-TW' ? item.contentZh : item.content}
      </div>
      
      <div className="mt-auto space-y-6">
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={onComplete}
            disabled={isCompleted}
            className={`px-8 py-4 text-lg font-bold rounded-xl transition-all ${
              isCompleted 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                {language === 'zh-TW' ? '已完成' : 'Completed'}
              </>
            ) : (
              <>
                <Award className="mr-2 h-5 w-5" />
                {language === 'zh-TW' ? '標記為已完成' : 'Mark as Completed'}
              </>
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 border-t border-gray-700 pt-6">
          <button
            onClick={() => onFeedback('like')}
            className={`flex items-center gap-2 font-medium transition-colors ${
              userRating === 'like' 
                ? 'text-green-400' 
                : 'text-blue-400 hover:text-blue-300'
            }`}
          >
            <ThumbsUp className="h-5 w-5" />
            {language === 'zh-TW' ? '讚好' : 'Like'}
          </button>
          
          <button
            onClick={() => onFeedback('dislike')}
            className={`flex items-center gap-2 font-medium transition-colors ${
              userRating === 'dislike' 
                ? 'text-red-400' 
                : 'text-blue-400 hover:text-blue-300'
            }`}
          >
            <ThumbsDown className="h-5 w-5" />
            {language === 'zh-TW' ? '不喜歡' : 'Dislike'}
          </button>
          
          <button
            onClick={() => onFeedback('report')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            <Flag className="h-5 w-5" />
            {language === 'zh-TW' ? '報告問題' : 'Report Issue'}
          </button>
        </div>
      </div>
    </motion.div>
  )
})

LessonContent.displayName = 'LessonContent'

// 主組件 / Main Component
const PromptEngineeringLesson1: React.FC = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { progress, markAsCompleted, submitFeedback, loading, error } = useProgressTracking()
  
  // 生成課程內容 / Generate course content
  const sections = useMemo(() => createLessonContent(language === 'zh-TW' ? 'zh' : 'en'), [language])
  
  // 狀態管理 / State Management
  const [selectedKey, setSelectedKey] = useState(() => {
    const allItems = sections.flatMap(s => s.items)
    return progress.currentItem || allItems[0]?.key || 'intro'
  })
  
  // 導航狀態 / Navigation State
  const navigation = useNavigation(sections, selectedKey)
  
  // 當前項目 / Current Item
  const currentItem = useMemo(() => {
    const allItems = sections.flatMap(s => s.items)
    return allItems.find(item => item.key === selectedKey)
  }, [sections, selectedKey])
  
  // 設置頁面標題 / Set page title
  useEffect(() => {
    const title = language === 'zh-TW' 
      ? `課堂 1：提示基礎 | AI Formula`
      : `Lesson 1: Prompt Fundamentals | AI Formula`
    document.title = title
  }, [language])
  
  // 事件處理器 / Event Handlers
  const handleItemSelect = useCallback((key: string) => {
    setSelectedKey(key)
  }, [])
  
  const handleNavigation = useCallback((direction: 'previous' | 'next') => {
    if (direction === 'previous' && navigation.previousItem) {
      setSelectedKey(navigation.previousItem.key)
    } else if (direction === 'next' && navigation.nextItem) {
      setSelectedKey(navigation.nextItem.key)
    }
  }, [navigation])
  
  const handleComplete = useCallback(() => {
    if (currentItem) {
      markAsCompleted(currentItem.key)
    }
  }, [currentItem, markAsCompleted])
  
  const handleFeedback = useCallback((type: 'like' | 'dislike' | 'report') => {
    if (currentItem) {
      submitFeedback({
        type,
        itemKey: currentItem.key,
        message: type === 'report' ? 'User reported an issue' : undefined
      })
    }
  }, [currentItem, submitFeedback])
  
  const handleBackToLearning = useCallback(() => {
    navigate('/prompt-engineering/learning')
  }, [navigate])
  
  // 載入狀態 / Loading State
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
  
  // 錯誤狀態 / Error State
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
  
  // 如果沒有當前項目 / If no current item
  if (!currentItem) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-20">
          <ErrorMessage message="Lesson content not found" />
        </div>
      </div>
    )
  }
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        
        <div className="flex pt-20">
          {/* 左側課程導航 / Left Lesson Navigation */}
          <LessonSidebar
            sections={sections}
            selectedKey={selectedKey}
            onSelect={handleItemSelect}
            completedItems={progress.completedItems}
          />
          
          {/* 主要內容區域 / Main Content Area */}
          <div className="flex-1 px-0 py-10 flex flex-col items-center">
            {/* 頂部導航 / Top Navigation */}
            <div className="w-full max-w-5xl mx-auto mb-6">
              <LessonNavigation
                navigation={navigation}
                onNavigate={handleNavigation}
                onBackToLearning={handleBackToLearning}
              />
            </div>
            
            {/* 課程內容 / Lesson Content */}
            <Suspense fallback={<CardLoadingSpinner />}>
              <LessonContent
                item={currentItem}
                isCompleted={progress.completedItems.includes(currentItem.key)}
                onComplete={handleComplete}
                onFeedback={handleFeedback}
                userRating={progress.ratings[currentItem.key]}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

// 記憶化主組件 / Memoized Main Component
export default PromptEngineeringLesson1; 