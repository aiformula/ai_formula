
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LearningButton } from '@/components/ui/learning-button'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Search, 
  BookOpen, 
  Play, 
  Users, 
  TrendingUp, 
  Clock, 
  Star, 
  ArrowRight, 
  CheckCircle,
  ChevronLeft,
  ChevronRight
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
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)

  const materials: LearningMaterial[] = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering Mastery',
      titleZh: '提示工程精通',
      description: 'Master the art of crafting effective prompts for AI systems',
      descriptionZh: '掌握為AI系統製作有效提示的藝術',
      category: 'course',
      difficulty: 'intermediate',
      duration: '6 hours',
      durationZh: '6小時',
      rating: 4.8,
      students: 1234,
      instructor: 'Kenneth',
      instructorZh: 'Kenneth',
      price: 99,
      originalPrice: 149,
      tags: ['AI', 'Prompt Engineering', 'Machine Learning'],
      tagsZh: ['AI', '提示工程', '機器學習'],
      features: [
        '🎯 新手友好：零基礎也能快速上手',
        '💬 提示工程：掌握AI對話技巧',
        '🤖 AI應用：實際商業案例演練',
        '🎓 適合學生：系統化學習路徑'
      ],
      featuresZh: [
        '🎯 新手友好：零基礎也能快速上手',
        '💬 提示工程：掌握AI對話技巧',
        '🤖 AI應用：實際商業案例演練',
        '🎓 適合學生：系統化學習路徑'
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
      instructor: 'David',
      instructorZh: 'David',
      price: 79,
      originalPrice: 129,
      tags: ['AI', 'Machine Learning', 'Beginner'],
      tagsZh: ['AI', '機器學習', '入門'],
      features: [
        '🎓 學生專屬：專為初學者設計',
        '🚀 新手起步：零基礎友好入門',
        '🤖 AI應用：生活化實例教學',
        '💡 基礎概念：深入淺出解釋'
      ],
      featuresZh: [
        '🎓 學生專屬：專為初學者設計',
        '🚀 新手起步：零基礎友好入門',
        '🤖 AI應用：生活化實例教學',
        '💡 基礎概念：深入淺出解釋'
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
      instructor: 'Ken',
      instructorZh: 'Ken',
      price: 199,
      originalPrice: 299,
      tags: ['Machine Learning', 'Deep Learning', 'Advanced'],
      tagsZh: ['機器學習', '深度學習', '進階'],
      features: [
        '🔬 進階算法：深度學習核心技術',
        '📊 數據分析：大數據處理技巧',
        '💻 程式設計：Python實戰演練',
        '🏢 企業應用：實際業務場景'
      ],
      featuresZh: [
        '🔬 進階算法：深度學習核心技術',
        '📊 數據分析：大數據處理技巧',
        '💻 程式設計：Python實戰演練',
        '🏢 企業應用：實際業務場景'
      ],
      lessons: 32,
      progress: 0,
      completed: false
    },
    {
      id: 'business-automation',
      title: 'Business Automation with AI',
      titleZh: '商業AI自動化',
      description: 'Automate business processes using AI tools and workflows',
      descriptionZh: '使用AI工具和工作流程自動化商業流程',
      category: 'course',
      difficulty: 'intermediate',
      duration: '5 hours',
      durationZh: '5小時',
      rating: 4.7,
      students: 1567,
      instructor: 'Jason',
      instructorZh: 'Jason',
      price: 129,
      originalPrice: 199,
      tags: ['Automation', 'Business', 'AI Tools'],
      tagsZh: ['自動化', '商業', 'AI工具'],
      features: [
        '⚡ 自動化：提升工作效率',
        '💰 金融業：銀行保險應用',
        '🛍️ 零售業：電商營運優化',
        '🏥 醫療業：流程數位轉型'
      ],
      featuresZh: [
        '⚡ 自動化：提升工作效率',
        '💰 金融業：銀行保險應用',
        '🛍️ 零售業：電商營運優化',
        '🏥 醫療業：流程數位轉型'
      ],
      lessons: 22,
      progress: 30,
      completed: false
    },
    {
      id: 'creative-ai-design',
      title: 'Creative AI Design',
      titleZh: '創意AI設計',
      description: 'Create stunning designs using AI-powered tools',
      descriptionZh: '使用AI工具創作出色的設計作品',
      category: 'workshop',
      difficulty: 'intermediate',
      duration: '6 hours',
      durationZh: '6小時',
      rating: 4.5,
      students: 892,
      instructor: 'Kenneth',
      instructorZh: 'Kenneth',
      price: 89,
      originalPrice: 149,
      tags: ['Design', 'Creative', 'AI Tools'],
      tagsZh: ['設計', '創意', 'AI工具'],
      features: [
        '🎨 創意設計：視覺藝術創作',
        '🖼️ 圖像生成：AI繪圖技術',
        '🏠 日常生活：個人創作應用',
        '🎭 藝術表現：風格化設計'
      ],
      featuresZh: [
        '🎨 創意設計：視覺藝術創作',
        '🖼️ 圖像生成：AI繪圖技術',
        '🏠 日常生活：個人創作應用',
        '🎭 藝術表現：風格化設計'
      ],
      lessons: 20,
      progress: 0,
      completed: false
    },
    {
      id: 'ai-for-education',
      title: 'AI for Education',
      titleZh: 'AI教育應用',
      description: 'Transform education with AI-powered learning tools',
      descriptionZh: '使用AI工具革新教育學習方式',
      category: 'course',
      difficulty: 'beginner',
      duration: '4 hours',
      durationZh: '4小時',
      rating: 4.4,
      students: 1345,
      instructor: 'David',
      instructorZh: 'David',
      price: 69,
      originalPrice: 129,
      tags: ['Education', 'AI', 'Learning'],
      tagsZh: ['教育', 'AI', '學習'],
      features: [
        '🎓 教育業：師生互動優化',
        '📚 個人化學習：因材施教',
        '🤖 AI應用：智能教學助手',
        '👨‍🎓 學生適用：提升學習效果'
      ],
      featuresZh: [
        '🎓 教育業：師生互動優化',
        '📚 個人化學習：因材施教',
        '🤖 AI應用：智能教學助手',
        '👨‍🎓 學生適用：提升學習效果'
      ],
      lessons: 15,
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

  const itemsPerPage = 3
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage)
  const currentMaterials = filteredMaterials.slice(currentIndex, currentIndex + itemsPerPage)

  const nextPage = () => {
    if (currentIndex + itemsPerPage < filteredMaterials.length) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }

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

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'course': return language === 'zh-TW' ? '課程' : 'Course'
      case 'tutorial': return language === 'zh-TW' ? '教學' : 'Tutorial'
      case 'workshop': return language === 'zh-TW' ? '工作坊' : 'Workshop'
      case 'webinar': return language === 'zh-TW' ? '網路研討會' : 'Webinar'
      default: return category
    }
  }

  const getDifficultyName = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return language === 'zh-TW' ? '初級' : 'Beginner'
      case 'intermediate': return language === 'zh-TW' ? '中級' : 'Intermediate'
      case 'advanced': return language === 'zh-TW' ? '進階' : 'Advanced'
      default: return difficulty
    }
  }

  const getInstructorStyle = (instructor: string) => {
    switch (instructor) {
      case 'Kenneth': return 'bg-blue-500/20'
      case 'David': return 'bg-green-500/20'
      case 'Ken': return 'bg-purple-500/20'
      case 'Jason': return 'bg-orange-500/20'
      default: return 'bg-gray-500/20'
    }
  }

  const getInstructorAvatarStyle = (instructor: string) => {
    switch (instructor) {
      case 'Kenneth': return 'bg-blue-600 text-white'
      case 'David': return 'bg-green-600 text-white'
      case 'Ken': return 'bg-purple-600 text-white'
      case 'Jason': return 'bg-orange-600 text-white'
      default: return 'bg-gray-600 text-white'
    }
  }

  const getInstructorAvatar = (instructor: string) => {
    switch (instructor) {
      case 'Kenneth': return 'K'
      case 'David': return 'D'
      case 'Ken': return 'K'
      case 'Jason': return 'J'
      default: return '?'
    }
  }

  const getInstructorSpecialty = (instructor: string) => {
    const specialties = {
      'Kenneth': {
        en: 'AI Marketing & Prompt Engineering',
        zh: 'AI行銷與提示工程專家'
      },
      'David': {
        en: 'Business Automation Expert',
        zh: '商業自動化專家'
      },
      'Ken': {
        en: 'Custom Development & Advanced ML',
        zh: '客制開發與進階機器學習'
      },
      'Jason': {
        en: 'Professional Developer & AI Integration',
        zh: '專業開發者與AI整合'
      }
    }
    
    const specialty = specialties[instructor as keyof typeof specialties]
    if (!specialty) return language === 'zh-TW' ? '專業講師' : 'Professional Instructor'
    
    return language === 'zh-TW' ? specialty.zh : specialty.en
  }

  return (
    <div className="bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {language === 'zh-TW' ? '免費資源 ' : 'Free Resources / Trial Offers'}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'zh-TW' 
              ? <>
                  免費下載：2025年十大必學AI工具懶人包 <br />
                  立即登記：免費試睇我哋皇牌課程嘅第一個單元！
                </>
              : 'Free Download: Top 10 AI Tools Cheat Sheet 2025 + Register Now for Free Trial of Our Premium Course First Module!'
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
          {currentMaterials.map((material, index) => {
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
                        <Badge className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/50">
                          {getCategoryName(material.category)}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${getDifficultyColor(material.difficulty)}`}>
                        {getDifficultyName(material.difficulty)}
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

                    {/* Instructor - Enhanced with colors */}
                    <div className="mb-4">
                      <div className={`p-3 rounded-lg transition-all ${getInstructorStyle(material.instructor)}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${getInstructorAvatarStyle(material.instructor)}`}>
                            {getInstructorAvatar(material.instructor)}
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">
                              {language === 'zh-TW' ? '講師' : 'Instructor'}
                            </div>
                            <div className="text-sm font-medium text-white">
                              {language === 'zh-TW' ? material.instructorZh : material.instructor}
                            </div>
                            <div className="text-xs text-gray-300">
                              {getInstructorSpecialty(material.instructor)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        {language === 'zh-TW' ? '課程特色' : 'Course Features'}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {(language === 'zh-TW' ? material.featuresZh : material.features).map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center p-2 rounded-lg bg-gray-700/30 hover:bg-gray-600/50 transition-colors cursor-pointer group"
                            onClick={() => {
                              // Handle feature click - could navigate to category or show more info
                              console.log('Feature clicked:', feature)
                            }}
                          >
                            <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Free Badge and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/50 text-lg px-3 py-1">
                          {language === 'zh-TW' ? '免費' : 'FREE'}
                        </Badge>
                        <span className="text-sm text-gray-400 line-through">
                          HK${material.originalPrice || material.price}
                        </span>
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
                            {language === 'zh-TW' ? '免費開始' : 'Start Free'}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-4 mt-12"
          >
            <button
              onClick={prevPage}
              disabled={currentIndex === 0}
              className="flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {language === 'zh-TW' ? '上一頁' : 'Previous'}
            </button>
            
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                {currentIndex / itemsPerPage + 1}
              </span>
              <span className="text-gray-400 text-sm">of</span>
              <span className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium">
                {totalPages}
              </span>
            </div>
            
            <button
              onClick={nextPage}
              disabled={currentIndex + itemsPerPage >= filteredMaterials.length}
              className="flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {language === 'zh-TW' ? '下一頁' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </motion.div>
        )}

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
