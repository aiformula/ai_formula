import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Target, 
  Calendar,
  Trophy,
  Flame,
  CheckCircle,
  Star,
  BookOpen,
  Timer,
  BarChart3
} from 'lucide-react'

interface LearningProgress {
  totalLessons: number
  completedLessons: number
  totalTime: number // in minutes
  averageScore: number
  currentStreak: number
  longestStreak: number
  lastStudyDate: string
  weeklyGoal: number
  weeklyProgress: number
  achievements: Achievement[]
  studyDays: string[] // dates when user studied
  topicProgress: TopicProgress[]
}

interface Achievement {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  icon: string
  unlockedAt: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface TopicProgress {
  topic: string
  topicZh: string
  progress: number
  lessons: number
  completedLessons: number
}

const useProgressTracking = () => {
  const [progress, setProgress] = useState<LearningProgress>(() => {
    const saved = localStorage.getItem('learning_progress_tracker')
    return saved ? JSON.parse(saved) : {
      totalLessons: 10,
      completedLessons: 3,
      totalTime: 180, // 3 hours
      averageScore: 87,
      currentStreak: 5,
      longestStreak: 12,
      lastStudyDate: new Date().toISOString().split('T')[0],
      weeklyGoal: 300, // 5 hours
      weeklyProgress: 180,
      achievements: [
        {
          id: 'first-lesson',
          title: 'First Steps',
          titleZh: '第�?�?,
          description: 'Complete your first lesson',
          descriptionZh: '完�?第�??�課',
          icon: '?��',
          unlockedAt: '2024-01-15',
          rarity: 'common'
        },
        {
          id: 'week-streak',
          title: 'Week Warrior',
          titleZh: '一?�戰�?,
          description: 'Study for 7 consecutive days',
          descriptionZh: '???學�?7�?,
          icon: '?��',
          unlockedAt: '2024-01-20',
          rarity: 'rare'
        },
        {
          id: 'perfect-score',
          title: 'Perfectionist',
          titleZh: '完�?主義??,
          description: 'Score 100% on a quiz',
          descriptionZh: '測�?得到100??,
          icon: '�?,
          unlockedAt: '2024-01-18',
          rarity: 'epic'
        }
      ],
      studyDays: [
        '2024-01-15', '2024-01-16', '2024-01-17', 
        '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21'
      ],
      topicProgress: [
        {
          topic: 'Prompt Engineering Basics',
          topicZh: '?�示工�??��?',
          progress: 75,
          lessons: 4,
          completedLessons: 3
        },
        {
          topic: 'Advanced Techniques',
          topicZh: '?��??��?,
          progress: 40,
          lessons: 5,
          completedLessons: 2
        },
        {
          topic: 'Real-world Applications',
          topicZh: '實�??�用',
          progress: 20,
          lessons: 3,
          completedLessons: 1
        }
      ]
    }
  })

  const updateProgress = (updates: Partial<LearningProgress>) => {
    const newProgress = { ...progress, ...updates }
    setProgress(newProgress)
    localStorage.setItem('learning_progress_tracker', JSON.stringify(newProgress))
  }

  const getProgressPercentage = () => {
    return Math.round((progress.completedLessons / progress.totalLessons) * 100)
  }

  const getWeeklyProgressPercentage = () => {
    return Math.min(100, Math.round((progress.weeklyProgress / progress.weeklyGoal) * 100))
  }

  const getEstimatedTimeRemaining = () => {
    const remainingLessons = progress.totalLessons - progress.completedLessons
    const averageTimePerLesson = progress.totalTime / progress.completedLessons || 30
    return Math.round(remainingLessons * averageTimePerLesson)
  }

  return {
    progress,
    updateProgress,
    getProgressPercentage,
    getWeeklyProgressPercentage,
    getEstimatedTimeRemaining
  }
}

const ProgressTracker: React.FC = () => {
  const { language } = useLanguage()
  const { 
    progress, 
    getProgressPercentage, 
    getWeeklyProgressPercentage, 
    getEstimatedTimeRemaining 
  } = useProgressTracking()

  const isZhTW = language === 'zh-HK'
  const overallProgress = getProgressPercentage()
  const weeklyProgress = getWeeklyProgressPercentage()
  const estimatedTimeRemaining = getEstimatedTimeRemaining()

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10'
      case 'rare': return 'border-blue-500 bg-blue-500/10'
      case 'epic': return 'border-purple-500 bg-purple-500/10'
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10'
      default: return 'border-gray-500 bg-gray-500/10'
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
      {/* 總進度概覽 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
              {isZhTW ? '學�??�度總覽' : 'Learning Progress Overview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 總進度 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{overallProgress}%</div>
                <Progress value={overallProgress} className="mb-2" />
                <p className="text-sm text-gray-300">
                  {progress.completedLessons} / {progress.totalLessons} {isZhTW ? '課�?完�?' : 'lessons completed'}
                </p>
              </div>

              {/* 學�??��? */}
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{formatTime(progress.totalTime)}</div>
                <div className="text-sm text-gray-300">{isZhTW ? '總學習�??? : 'Total study time'}</div>
                <p className="text-xs text-gray-400 mt-1">
                  {isZhTW ? `?��??��?�?{formatTime(estimatedTimeRemaining)}` : `Est. remaining: ${formatTime(estimatedTimeRemaining)}`}
                </p>
              </div>

              {/* ???學�?天數 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                  <Flame className="h-8 w-8 text-orange-400 mr-2" />
                  {progress.currentStreak}
                </div>
                <div className="text-sm text-gray-300">{isZhTW ? '???學�?天數' : 'Study streak'}</div>
                <p className="text-xs text-gray-400 mt-1">
                  {isZhTW ? `?�?��??��?${progress.longestStreak}天` : `Best: ${progress.longestStreak} days`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ?�目標進度 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-400" />
              {isZhTW ? '?�週目�? : 'Weekly Goal'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">
                {formatTime(progress.weeklyProgress)} / {formatTime(progress.weeklyGoal)}
              </span>
              <span className="text-green-400 font-bold">{weeklyProgress}%</span>
            </div>
            <Progress value={weeklyProgress} className="mb-4" />
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{isZhTW ? '?�週已學�?' : 'This week'}</span>
              <span>
                {weeklyProgress >= 100 ? (
                  <Badge className="bg-green-500/20 text-green-400">
                    {isZhTW ? '?��??��?�? : 'Goal achieved!'}
                  </Badge>
                ) : (
                  `${formatTime(progress.weeklyGoal - progress.weeklyProgress)} ${isZhTW ? '?��?' : 'remaining'}`
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 主�??�度 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
              {isZhTW ? '主�??�度' : 'Topic Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progress.topicProgress.map((topic, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">
                      {isZhTW ? topic.topicZh : topic.topic}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {topic.completedLessons}/{topic.lessons} {isZhTW ? '課�?' : 'lessons'}
                    </span>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ?�就徽�? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
              {isZhTW ? '?�就徽�?' : 'Achievements'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {progress.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)} transition-all duration-200`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      {isZhTW ? achievement.titleZh : achievement.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      {isZhTW ? achievement.descriptionZh : achievement.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {achievement.rarity}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 學�?統�? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
              {isZhTW ? '學�?統�?' : 'Learning Statistics'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{progress.averageScore}%</div>
                <div className="text-sm text-gray-400">{isZhTW ? '平�??�數' : 'Avg Score'}</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-green-400">{progress.studyDays.length}</div>
                <div className="text-sm text-gray-400">{isZhTW ? '學�?天數' : 'Study Days'}</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(progress.totalTime / progress.completedLessons || 0)}m
                </div>
                <div className="text-sm text-gray-400">{isZhTW ? '平�?課�?' : 'Avg/Lesson'}</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-yellow-400">{progress.achievements.length}</div>
                <div className="text-sm text-gray-400">{isZhTW ? '?��??�就' : 'Achievements'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ProgressTracker 
