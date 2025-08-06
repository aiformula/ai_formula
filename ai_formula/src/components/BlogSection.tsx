import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight, TrendingUp, Brain, Zap, Users, Rocket, Star, Wrench, Settings, Bot, Building2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { blogPosts, getFeaturedPosts, getRecentPosts, type BlogPost } from '@/data/blog/blogPosts'

const BlogSection = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const isZhTW = language === 'zh-HK'

  // 使用真實的部落格資料
  const featuredPosts = getFeaturedPosts()
  const recentPosts = getRecentPosts()
  const allPosts = [...blogPosts].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())

  const featuredPost = featuredPosts[0] // 取第一篇精選文章
  
  // 獲取4個隨機文章
  const getRandomPosts = (posts: BlogPost[], count: number) => {
    const shuffled = [...posts].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const randomPosts = getRandomPosts(allPosts, 4)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '公司介紹':
      case 'Company Introduction':
        return Rocket
      case '公司優勢':
      case 'Company Advantages':
        return Star
      case '工具指南':
      case 'Tool Guide':
        return Wrench
      case '基礎知識':
      case 'Fundamentals':
        return Bot
      case '科技前瞻':
      case 'Tech Innovation':
        return Brain
      default:
        return Building2
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '公司介紹':
      case 'Company Introduction':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50'
      case '公司優勢':
      case 'Company Advantages':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
      case '工具指南':
      case 'Tool Guide':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
      case '基礎知識':
      case 'Fundamentals':
        return 'bg-green-500/20 text-green-300 border-green-500/50'
      case '科技前瞻':
      case 'Tech Innovation':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50'
    }
  }

  const getCategoryIconColor = (category: string) => {
    switch (category) {
      case '公司介紹':
      case 'Company Introduction':
        return 'text-orange-400'
      case '公司優勢':
      case 'Company Advantages':
        return 'text-yellow-400'
      case '工具指南':
      case 'Tool Guide':
        return 'text-yellow-400'
      case '基礎知識':
      case 'Fundamentals':
        return 'text-green-400'
      case '科技前瞻':
      case 'Tech Innovation':
        return 'text-orange-400'
      default:
        return 'text-gray-400'
    }
  }

  const getCategoryIconBackground = (category: string) => {
    switch (category) {
      case '公司介紹':
      case 'Company Introduction':
        return 'bg-gradient-to-br from-orange-500/20 to-red-500/20'
      case '公司優勢':
      case 'Company Advantages':
        return 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
      case '工具指南':
      case 'Tool Guide':
        return 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
      case '基礎知識':
      case 'Fundamentals':
        return 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
      case '科技前瞻':
      case 'Tech Innovation':
        return 'bg-gradient-to-br from-orange-500/20 to-red-500/20'
      default:
        return 'bg-gradient-to-br from-gray-500/20 to-slate-500/20'
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {isZhTW ? 'AI 策略資訊' : 'AI Strategy & Information'}
            </h2>
            <p className="text-xl text-gray-300 lg:text-right lg:max-w-md">
              {isZhTW ? '各種實用 AI 資訊，一頁看懂所有！' : 'Various useful AI information, all in one page!'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Latest Articles - 4篇隨機文章 - 1/3 寬度 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="bg-gray-800/50 border-gray-700 h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-yellow-400" />
                  {isZhTW ? '最新AI 資訊' : 'Latest AI Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {/* 4篇隨機文章列表 */}
                <div className="grid grid-cols-1 gap-5">
                  {randomPosts.map((post, index) => {
                    const CategoryIcon = getCategoryIcon(post.category)
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex space-x-4 p-4 rounded-lg bg-gray-700/30 hover:bg-yellow-500/10 transition-all duration-300 group cursor-pointer border border-gray-600/20 hover:border-yellow-500/40"
                        onClick={() => navigate(`/blog/${post.id}`)}
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 ${getCategoryIconBackground(post.category)} rounded-lg flex items-center justify-center`}>
                            <CategoryIcon className={`h-5 w-5 ${getCategoryIconColor(post.category)}`} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-2">
                            <Badge className={`text-xs mr-2 ${getCategoryColor(post.category)}`}>
                              {isZhTW ? post.category : post.categoryEn}
                            </Badge>
                          </div>
                          <h4 className="text-sm font-medium text-white group-hover:text-yellow-300 transition-colors line-clamp-2 mb-2">
                            {isZhTW ? post.title : post.titleEn}
                          </h4>
                          <p className="text-xs text-gray-300">
                            {isZhTW ? post.date : post.dateEn}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Article - 2/3 寬度 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {featuredPost && (
              <Card className="bg-gray-800/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 group overflow-hidden h-full flex flex-col cursor-pointer"
                    onClick={() => navigate(`/blog/${featuredPost.id}`)}>
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 flex items-center justify-center">
                    <div className="text-6xl opacity-20">📊</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(featuredPost.category)}`}>
                      {isZhTW ? featuredPost.category : featuredPost.categoryEn}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="mr-6">{isZhTW ? featuredPost.date : featuredPost.dateEn}</span>
                    <span>{isZhTW ? featuredPost.readTime : featuredPost.readTimeEn}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-yellow-300 transition-colors leading-tight">
                    {isZhTW ? featuredPost.title : featuredPost.titleEn}
                  </h3>
                  <p className="text-gray-200 text-lg leading-relaxed mb-8 flex-1">
                    {isZhTW ? featuredPost.excerpt : featuredPost.excerptEn}
                  </p>
                  <div className="flex items-center text-yellow-300 font-medium group-hover:text-yellow-200 transition-colors mt-auto pt-4">
                    <span className="mr-2">{isZhTW ? '閱讀更多' : 'Read More'}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>


      </div>
    </section>
  )
}

export default BlogSection 
