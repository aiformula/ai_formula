import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight, TrendingUp, Brain, Zap, Users, Rocket, Star, Wrench, Settings, Bot, Building2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { blogPosts, getFeaturedPosts, getRecentPosts, type BlogPost } from '@/data/blog/blogPosts'

const BlogSection = () => {
  const { language } = useLanguage()
  const isZhTW = language === 'zh-HK'

  // ‰ΩøÁî®?üÂØ¶?ÑÈÉ®?ΩÊ†ºË≥áÊ?
  const featuredPosts = getFeaturedPosts()
  const recentPosts = getRecentPosts()
  const allPosts = [...blogPosts].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())

  const featuredPost = featuredPosts[0] // ?ñÁ¨¨‰∏ÄÁØáÁ≤æ?∏Ê?Á´?
  // ?≤Â?4?ãÈö®Ê©üÊ?Á´?  const getRandomPosts = (posts: BlogPost[], count: number) => {
    const shuffled = [...posts].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const randomPosts = getRandomPosts(allPosts, 4)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '?¨Âè∏‰ªãÁ¥π':
      case 'Company Introduction':
        return Rocket
      case '?¨Âè∏?™Âã¢':
      case 'Company Advantages':
        return Star
      case 'Â∑•ÂÖ∑?áÂ?':
      case 'Tool Guide':
        return Wrench
      case '?∫Á??•Ë?':
      case 'Fundamentals':
        return Bot
      case 'ÁßëÊ??çÁûª':
      case 'Tech Innovation':
        return Brain
      default:
        return Building2
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '?¨Âè∏‰ªãÁ¥π':
      case 'Company Introduction':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50'
      case '?¨Âè∏?™Âã¢':
      case 'Company Advantages':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
      case 'Â∑•ÂÖ∑?áÂ?':
      case 'Tool Guide':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      case '?∫Á??•Ë?':
      case 'Fundamentals':
        return 'bg-green-500/20 text-green-300 border-green-500/50'
      case 'ÁßëÊ??çÁûª':
      case 'Tech Innovation':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50'
    }
  }

  const getCategoryIconColor = (category: string) => {
    switch (category) {
      case '?¨Âè∏‰ªãÁ¥π':
      case 'Company Introduction':
        return 'text-orange-400'
      case '?¨Âè∏?™Âã¢':
      case 'Company Advantages':
        return 'text-yellow-400'
      case 'Â∑•ÂÖ∑?áÂ?':
      case 'Tool Guide':
        return 'text-blue-400'
      case '?∫Á??•Ë?':
      case 'Fundamentals':
        return 'text-green-400'
      case 'ÁßëÊ??çÁûª':
      case 'Tech Innovation':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  const getCategoryIconBackground = (category: string) => {
    switch (category) {
      case '?¨Âè∏‰ªãÁ¥π':
      case 'Company Introduction':
        return 'bg-gradient-to-br from-orange-500/20 to-red-500/20'
      case '?¨Âè∏?™Âã¢':
      case 'Company Advantages':
        return 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
      case 'Â∑•ÂÖ∑?áÂ?':
      case 'Tool Guide':
        return 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
      case '?∫Á??•Ë?':
      case 'Fundamentals':
        return 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
      case 'ÁßëÊ??çÁûª':
      case 'Tech Innovation':
        return 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20'
      default:
        return 'bg-gradient-to-br from-gray-500/20 to-slate-500/20'
    }
  }

  return (
    <section className="py-8 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {isZhTW ? 'AI ?ªÁï•?äË?Ë®? : 'AI Strategy & Information'}
            </h2>
            <p className="text-xl text-gray-300 lg:text-right">
              {isZhTW ? '?ÑÁ®ÆÂØ¶Áî® AI Ë≥áË?Ôºå‰??ÅÊ??°Ô?' : 'Various useful AI information, all in one page!'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Latest Articles - 4?ãÈö®Ê©üÊ?Á´?- 1/3 ÂØ¨Â∫¶ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="bg-gray-800/50 border-gray-700 h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                  {isZhTW ? '?Ä??AI Ë≥áË?' : 'Latest AI Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {/* 4?ãÈö®Ê©üÊ?Á´†Â??¥Ê???*/}
                <div className="grid grid-cols-1 gap-4">
                  {randomPosts.map((post, index) => {
                    const CategoryIcon = getCategoryIcon(post.category)
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex space-x-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
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
                          <h4 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-2">
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

          {/* Featured Article - 2/3 ÂØ¨Â∫¶ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {featuredPost && (
              <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <div className="text-6xl opacity-20">??</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(featuredPost.category)}`}>
                      {isZhTW ? featuredPost.category : featuredPost.categoryEn}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-300 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="mr-4">{isZhTW ? featuredPost.date : featuredPost.dateEn}</span>
                    <span>{isZhTW ? featuredPost.readTime : featuredPost.readTimeEn}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {isZhTW ? featuredPost.title : featuredPost.titleEn}
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed mb-6 flex-1">
                    {isZhTW ? featuredPost.excerpt : featuredPost.excerptEn}
                  </p>
                  <div className="flex items-center text-blue-300 font-medium group-hover:text-blue-200 transition-colors mt-auto">
                    <span className="mr-2">{isZhTW ? '?±Ë??¥Â?' : 'Read More'}</span>
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
