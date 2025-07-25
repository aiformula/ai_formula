import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Target, 
  Users, 
  ArrowRight,
  Star,
  Zap,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Trophy,
  Brain,
  Rocket
} from 'lucide-react'

interface LearningRecommendation {
  id: string
  type: 'next-lesson' | 'review' | 'practice' | 'skill-gap' | 'trending' | 'personalized'
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  reason: string
  reasonZh: string
  priority: 'high' | 'medium' | 'low'
  estimatedTime: number // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  categoryZh: string
  actionUrl: string
  progress?: number
  isCompleted?: boolean
  tags: string[]
  relatedLessons: string[]
}

interface LearningProfile {
  currentLevel: string
  strongAreas: string[]
  improvementAreas: string[]
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed'
  studyTime: number // minutes per day
  goals: string[]
  completedLessons: string[]
  averageScore: number
  lastActiveDate: string
}

const useLearningRecommendations = () => {
  const [profile, setProfile] = useState<LearningProfile>(() => {
    const saved = localStorage.getItem('learning_profile')
    return saved ? JSON.parse(saved) : {
      currentLevel: 'intermediate',
      strongAreas: ['?��?概念', '範�??��?'],
      improvementAreas: ['?��??��?, '實�??�用'],
      learningStyle: 'mixed',
      studyTime: 45,
      goals: ['?�握?�示工�?', '?��?AI對話?�??, '?�場?�用'],
      completedLessons: ['lesson-1'],
      averageScore: 87,
      lastActiveDate: new Date().toISOString()
    }
  })

  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([
    {
      id: 'next-1',
      type: 'next-lesson',
      title: 'Advanced Prompt Techniques',
      titleZh: '?��??�示?��?,
      description: 'Learn advanced techniques like chain-of-thought prompting and few-shot learning',
      descriptionZh: '學�??��??�考�?示�?少樣?�學習�??��??��?,
      reason: 'Based on your current progress, this is the next logical step',
      reasonZh: '?��??�目?��??�度，這是下�??��??��?學�?步�?',
      priority: 'high',
      estimatedTime: 35,
      difficulty: 'intermediate',
      category: 'Core Learning',
      categoryZh: '?��?學�?',
      actionUrl: '/prompt-engineering/lesson/3',
      progress: 0,
      isCompleted: false,
      tags: ['?��?', '?��?, '實�?'],
      relatedLessons: ['lesson-1', 'lesson-2']
    },
    {
      id: 'review-1',
      type: 'review',
      title: 'Review: Prompt Structure Fundamentals',
      titleZh: '複�?：�?示�?構基�?,
      description: 'Reinforce your understanding of prompt structure components',
      descriptionZh: '?�固對�?示�?構�?件�??�解',
      reason: 'Your last quiz score was 78%, reviewing this topic could improve your foundation',
      reasonZh: '?��?次測驗�???8%，�?習此主�??�以?�強?��?',
      priority: 'medium',
      estimatedTime: 20,
      difficulty: 'beginner',
      category: 'Review',
      categoryZh: '複�?',
      actionUrl: '/prompt-engineering/lesson/2',
      progress: 100,
      isCompleted: true,
      tags: ['複�?', '?��?', '?�固'],
      relatedLessons: ['lesson-2']
    },
    {
      id: 'practice-1',
      type: 'practice',
      title: 'Interactive Prompt Writing Exercise',
      titleZh: '互�?式�?示寫作練�?,
      description: 'Practice writing effective prompts with real-time feedback',
      descriptionZh: '?��??��??��?練�??�寫?��??�示',
      reason: 'Hands-on practice will help solidify your theoretical knowledge',
      reasonZh: '實�?練�?將�??�於?�固?��??��?',
      priority: 'high',
      estimatedTime: 30,
      difficulty: 'intermediate',
      category: 'Practice',
      categoryZh: '練�?',
      actionUrl: '/prompt-engineering/practice/1',
      progress: 0,
      isCompleted: false,
      tags: ['練�?', '互�?', '實�?'],
      relatedLessons: ['lesson-1', 'lesson-2']
    },
    {
      id: 'skill-gap-1',
      type: 'skill-gap',
      title: 'API Integration for Prompts',
      titleZh: 'API?��??�示?�用',
      description: 'Learn how to integrate prompts with APIs for real-world applications',
      descriptionZh: '學�?如�?將�?示�?API?��?以實?�實?��???,
      reason: 'This addresses your identified improvement area: practical applications',
      reasonZh: '?��?對您?��??�進�??��?實�??�用',
      priority: 'medium',
      estimatedTime: 45,
      difficulty: 'advanced',
      category: 'Skill Building',
      categoryZh: '?�?�建�?,
      actionUrl: '/prompt-engineering/advanced/api-integration',
      progress: 0,
      isCompleted: false,
      tags: ['API', '?��?', '實�??�用'],
      relatedLessons: ['lesson-2']
    },
    {
      id: 'trending-1',
      type: 'trending',
      title: 'ChatGPT-4 Latest Features',
      titleZh: 'ChatGPT-4?�?��???,
      description: 'Explore the latest features and improvements in ChatGPT-4',
      descriptionZh: '?�索ChatGPT-4?��??��??��??��?,
      reason: 'Stay updated with the latest AI developments in your field',
      reasonZh: '保�?對您?��??�?�AI?��??��?�?,
      priority: 'low',
      estimatedTime: 25,
      difficulty: 'intermediate',
      category: 'Trending',
      categoryZh: '趨勢',
      actionUrl: '/ai-updates/chatgpt-4',
      progress: 0,
      isCompleted: false,
      tags: ['趨勢', '?��???, 'ChatGPT'],
      relatedLessons: []
    },
    {
      id: 'personalized-1',
      type: 'personalized',
      title: 'Visual Learning: Prompt Engineering Diagrams',
      titleZh: '視覺學�?：�?示工程�?�?,
      description: 'Visual representations of prompt engineering concepts and workflows',
      descriptionZh: '?�示工�?概念?�工作�?程�?視覺?�表�?,
      reason: 'Matches your mixed learning style preference with visual elements',
      reasonZh: '符�??�混?�學習風?��?好�?視覺?��?',
      priority: 'medium',
      estimatedTime: 30,
      difficulty: 'intermediate',
      category: 'Personalized',
      categoryZh: '?�人??,
      actionUrl: '/prompt-engineering/visual-guide',
      progress: 0,
      isCompleted: false,
      tags: ['視覺', '?�表', '?�人??],
      relatedLessons: ['lesson-1', 'lesson-2']
    }
  ])

  const updateProfile = (updates: Partial<LearningProfile>) => {
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    localStorage.setItem('learning_profile', JSON.stringify(newProfile))
  }

  const markRecommendationCompleted = (id: string) => {
    setRecommendations(prev => prev.map(rec => 
      rec.id === id ? { ...rec, isCompleted: true, progress: 100 } : rec
    ))
  }

  const getRecommendationsByType = (type: LearningRecommendation['type']) => {
    return recommendations.filter(rec => rec.type === type)
  }

  const getHighPriorityRecommendations = () => {
    return recommendations.filter(rec => rec.priority === 'high' && !rec.isCompleted)
  }

  return {
    profile,
    recommendations,
    updateProfile,
    markRecommendationCompleted,
    getRecommendationsByType,
    getHighPriorityRecommendations
  }
}

const LearningRecommendations: React.FC = () => {
  const { language } = useLanguage()
  const {
    profile,
    recommendations,
    markRecommendationCompleted,
    getHighPriorityRecommendations
  } = useLearningRecommendations()

  const isZhTW = language === 'zh-HK'
  const highPriorityRecs = getHighPriorityRecommendations()

  const getTypeIcon = (type: LearningRecommendation['type']) => {
    switch (type) {
      case 'next-lesson': return <ArrowRight className="h-4 w-4" />
      case 'review': return <CheckCircle className="h-4 w-4" />
      case 'practice': return <Target className="h-4 w-4" />
      case 'skill-gap': return <AlertCircle className="h-4 w-4" />
      case 'trending': return <TrendingUp className="h-4 w-4" />
      case 'personalized': return <Sparkles className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: LearningRecommendation['type']) => {
    switch (type) {
      case 'next-lesson': return 'bg-blue-500/20 text-blue-400 border-blue-400'
      case 'review': return 'bg-green-500/20 text-green-400 border-green-400'
      case 'practice': return 'bg-purple-500/20 text-purple-400 border-purple-400'
      case 'skill-gap': return 'bg-orange-500/20 text-orange-400 border-orange-400'
      case 'trending': return 'bg-red-500/20 text-red-400 border-red-400'
      case 'personalized': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400'
    }
  }

  const getPriorityColor = (priority: LearningRecommendation['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'low': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return isZhTW ? `${hours}小�? ${mins}?��?` : `${hours}h ${mins}m`
    }
    return isZhTW ? `${mins}?��?` : `${mins}m`
  }

  return (
    <div className="space-y-6">
      {/* ?�人?�學習�?�?*/}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              {isZhTW ? '?�人?�學習�?�? : 'Personalized Learning Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{profile.averageScore}%</div>
                <div className="text-sm text-gray-300 mb-2">{isZhTW ? '平�??�數' : 'Average Score'}</div>
                <Progress value={profile.averageScore} className="h-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{profile.completedLessons.length}</div>
                <div className="text-sm text-gray-300">{isZhTW ? '已�??�課�? : 'Completed Lessons'}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {isZhTW ? `每日學�?�?{formatTime(profile.studyTime)}` : `Daily study: ${formatTime(profile.studyTime)}`}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{highPriorityRecs.length}</div>
                <div className="text-sm text-gray-300">{isZhTW ? '高優?��??�薦' : 'High Priority Recs'}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {isZhTW ? '待�??? : 'Pending'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 高優?��??�薦 */}
      {highPriorityRecs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-red-400" />
                {isZhTW ? '?��??�薦' : 'Priority Recommendations'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highPriorityRecs.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(rec.type)}`}>
                        {getTypeIcon(rec.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {isZhTW ? rec.titleZh : rec.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {isZhTW ? rec.reasonZh : rec.reason}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {formatTime(rec.estimatedTime)}
                      </span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        {isZhTW ? '?��?' : 'Start'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ?�?�推??*/}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
              {isZhTW ? '?�?�學習推?? : 'All Learning Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-lg border transition-all duration-200 hover:border-gray-600 ${
                    rec.isCompleted 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-gray-700/50 border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(rec.type)}`}>
                          {getTypeIcon(rec.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">
                            {isZhTW ? rec.titleZh : rec.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className={getTypeColor(rec.type)}>
                              {isZhTW ? rec.categoryZh : rec.category}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                              {rec.priority}
                            </Badge>
                            <span className="text-sm text-gray-400">
                              {rec.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-3">
                        {isZhTW ? rec.descriptionZh : rec.description}
                      </p>
                      
                      <p className="text-sm text-gray-400 mb-4">
                        <Lightbulb className="h-4 w-4 inline mr-1" />
                        {isZhTW ? rec.reasonZh : rec.reason}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {rec.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {rec.progress !== undefined && rec.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>{isZhTW ? '?�度' : 'Progress'}</span>
                            <span>{rec.progress}%</span>
                          </div>
                          <Progress value={rec.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(rec.estimatedTime)}
                        </span>
                        {rec.relatedLessons.length > 0 && (
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {rec.relatedLessons.length} {isZhTW ? '?��?課�?' : 'related lessons'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      {rec.isCompleted ? (
                        <Badge className="bg-green-500/20 text-green-400">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {isZhTW ? '已�??? : 'Completed'}
                        </Badge>
                      ) : (
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => markRecommendationCompleted(rec.id)}
                        >
                          {isZhTW ? '?��?學�?' : 'Start Learning'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 學�?建議 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
              {isZhTW ? '學�?建議' : 'Learning Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">
                  {isZhTW ? '強�??��?' : 'Strength Areas'}
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {profile.strongAreas.map((area, index) => (
                    <li key={index} className="flex items-center">
                      <Star className="h-3 w-3 mr-2 text-yellow-400" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-2">
                  {isZhTW ? '?�進�??? : 'Improvement Areas'}
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {profile.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-center">
                      <Target className="h-3 w-3 mr-2 text-orange-400" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LearningRecommendations 
