
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { LearningButton } from '@/components/ui/learning-button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Award, 
  ArrowRight,
  Filter,
  Search,
  Play,
  CheckCircle,
  Target,
  TrendingUp,
  Lightbulb
} from 'lucide-react'

interface LearningMaterial {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  category: 'course' | 'tutorial' | 'workshop' | 'webinar'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  durationZh: string
  rating: number
  students: number
  instructor: string
  instructorZh: string
  price: number
  originalPrice?: number
  tags: string[]
  tagsZh: string[]
  features: string[]
  featuresZh: string[]
  lessons: number
  progress?: number
  completed?: boolean
  thumbnail?: string
}

const LearningMaterials: React.FC = () => {
  const { language, t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const materials: LearningMaterial[] = [
    {
      id: 'prompt-engineering-mastery',
      title: 'Prompt Engineering Mastery',
      titleZh: '提示工程精通',
      description: 'Master the art of crafting effective prompts for AI models',
      descriptionZh: '掌握為AI模型製作有效提示的藝術',
      category: 'course',
      difficulty: 'intermediate',
      duration: '6 hours',
      durationZh: '6小時',
      rating: 4.8,
      students: 1234,
      instructor: 'Dr. Sarah Chen',
      instructorZh: '陳莎拉博士',
      price: 99,
      originalPrice: 149,
      tags: ['AI', 'Prompt Engineering', 'Machine Learning'],
      tagsZh: ['AI', '提示工程', '機器學習'],
      features: [
        'Interactive exercises',
        'Real-world examples',
        'Expert guidance',
        'Community support'
      ],
      featuresZh: [
        '互動練習',
        '真實案例',
        '專家指導',
        '社群支援'
      ],
      lessons: 25,
      progress: 65,
      completed: false
    },
    {
      id: 'ai-fundamentals',
      title: 'AI Fundamentals for Beginners',
      titleZh: 'AI基礎入門',
      description: 'Learn the basics of artificial intelligence and machine learning',
      descriptionZh: '學習人工智慧和機器學習的基礎知識',
      category: 'course',
      difficulty: 'beginner',
      duration: '4 hours',
      durationZh: '4小時',
      rating: 4.6,
      students: 2156,
      instructor: 'Prof. Michael Wong',
      instructorZh: '黃邁克教授',
      price: 79,
      tags: ['AI', 'Machine Learning', 'Beginner'],
      tagsZh: ['AI', '機器學習', '入門'],
      features: [
        'Step-by-step tutorials',
        'Hands-on projects',
        'Quiz assessments',
        'Progress tracking'
      ],
      featuresZh: [
        '逐步教學',
        '實作專案',
        '測驗評估',
        '進度追蹤'
      ],
      lessons: 18,
      progress: 100,
      completed: true
    },
    {
      id: 'advanced-ml-techniques',
      title: 'Advanced Machine Learning Techniques',
      titleZh: '進階機器學習技術',
      description: 'Deep dive into advanced ML algorithms and techniques',
      descriptionZh: '深入探討進階ML演算法和技術',
      category: 'workshop',
      difficulty: 'advanced',
      duration: '8 hours',
      durationZh: '8小時',
      rating: 4.9,
      students: 876,
      instructor: 'Dr. Lisa Wang',
      instructorZh: '王麗莎博士',
      price: 199,
      originalPrice: 299,
      tags: ['Machine Learning', 'Deep Learning', 'Advanced'],
      tagsZh: ['機器學習', '深度學習', '進階'],
      features: [
        'Advanced algorithms',
        'Research papers',
        'Industry case studies',
        'Peer collaboration'
      ],
      featuresZh: [
        '進階演算法',
        '研究論文',
        '業界案例',
        '同儕合作'
      ],
      lessons: 32,
      progress: 0,
      completed: false
    }
  ]

  const categories = [
    { id: 'all', label: 'All Categories', labelZh: '所有類別' },
    { id: 'course', label: 'Courses', labelZh: '課程' },
    { id: 'tutorial', label: 'Tutorials', labelZh: '教學' },
    { id: 'workshop', label: 'Workshops', labelZh: '工作坊' },
    { id: 'webinar', label: 'Webinars', labelZh: '網路研討會' }
  ]

  const difficulties = [
    { id: 'all', label: 'All Levels', labelZh: '所有程度' },
    { id: 'beginner', label: 'Beginner', labelZh: '初級' },
    { id: 'intermediate', label: 'Intermediate', labelZh: '中級' },
    { id: 'advanced', label: 'Advanced', labelZh: '進階' }
  ]

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || material.difficulty === selectedDifficulty
    const matchesSearch = searchTerm === '' || 
      (language === 'zh-TW' ? material.titleZh : material.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'zh-TW' ? material.descriptionZh : material.description).toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'course': return BookOpen
      case 'tutorial': return Play
      case 'workshop': return Users
      case 'webinar': return TrendingUp
      default: return BookOpen
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {language === 'zh-TW' ? '學習資源' : 'Learning Materials'}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'zh-TW' 
              ? '探索我們精心策劃的AI和機器學習課程，提升您的技能和知識'
              : 'Explore our carefully curated AI and machine learning courses to enhance your skills and knowledge'
            }
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Search */}
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={language === 'zh-TW' ? '搜尋課程...' : 'Search courses...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {language === 'zh-TW' ? category.labelZh : category.label}
                    </button>
                  ))}
                </div>

                {/* Difficulty Filter */}
                <div className="flex gap-2 flex-wrap">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDifficulty === difficulty.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {language === 'zh-TW' ? difficulty.labelZh : difficulty.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Materials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredMaterials.map((material, index) => {
            const CategoryIcon = getCategoryIcon(material.category)
            
            return (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-5 w-5 text-blue-400" />
                        <Badge variant="outline" className="text-xs">
                          {language === 'zh-TW' ? material.category : material.category}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${getDifficultyColor(material.difficulty)}`}>
                        {language === 'zh-TW' ? 
                          (material.difficulty === 'beginner' ? '初級' : 
                           material.difficulty === 'intermediate' ? '中級' : '進階') 
                          : material.difficulty}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                      {language === 'zh-TW' ? material.titleZh : material.title}
                    </CardTitle>
                    
                    <p className="text-gray-400 text-sm">
                      {language === 'zh-TW' ? material.descriptionZh : material.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Progress bar if enrolled */}
                    {material.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">
                            {language === 'zh-TW' ? '進度' : 'Progress'}
                          </span>
                          <span className="text-gray-400">{material.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${material.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {language === 'zh-TW' ? material.durationZh : material.duration}
                        </span>
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {material.rating}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {material.students.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="text-sm text-gray-400 mb-4">
                      <span className="text-gray-500">
                        {language === 'zh-TW' ? '講師：' : 'Instructor: '}
                      </span>
                      {language === 'zh-TW' ? material.instructorZh : material.instructor}
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        {language === 'zh-TW' ? '特色' : 'Features'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {(language === 'zh-TW' ? material.featuresZh : material.features).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">
                          ${material.price}
                        </span>
                        {material.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${material.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <LearningButton
                        intent={material.completed ? "success" : material.progress ? "primary" : "secondary"}
                        size="sm"
                        className="group-hover:scale-105 transition-transform"
                      >
                        {material.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {language === 'zh-TW' ? '已完成' : 'Completed'}
                          </>
                        ) : material.progress ? (
                          <>
                            {language === 'zh-TW' ? '繼續學習' : 'Continue Learning'}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          <>
                            {language === 'zh-TW' ? '開始學習' : 'Start Learning'}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </LearningButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Results */}
        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-lg">
              {language === 'zh-TW' ? '找不到符合條件的課程' : 'No courses found matching your criteria'}
            </div>
            <p className="text-gray-500 mt-2">
              {language === 'zh-TW' ? '請嘗試調整搜尋條件' : 'Try adjusting your search criteria'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default LearningMaterials
