import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, User, Search, Tag, TrendingUp, Eye, Rocket, Star, Settings, Package, RotateCcw, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewCount } from "@/contexts/ViewCountContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedPosts, getRecentPosts, getSortedPostsNewest } from "@/data/blogPosts";

// 圖標映射 - 用Lucide圖標替代emoji
const getPostIcon = (image: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "🚀": <Rocket className="h-8 w-8 text-blue-400" />,
    "⭐": <Star className="h-8 w-8 text-yellow-400" />,
    "⚙️": <Settings className="h-8 w-8 text-gray-400" />,
    "📦": <Package className="h-8 w-8 text-green-400" />,
    "🔄": <RotateCcw className="h-8 w-8 text-purple-400" />,
    "⚡": <Zap className="h-8 w-8 text-orange-400" />
  };
  
  return iconMap[image] || <Star className="h-8 w-8 text-blue-400" />;
};

// 隨機顏色配置 - 只用於hover效果
const tagHoverColors = [
  'hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200',
  'hover:bg-green-500/20 hover:border-green-400 hover:text-green-200',
  'hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200',
  'hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-200',
  'hover:bg-pink-500/20 hover:border-pink-400 hover:text-pink-200',
  'hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200',
  'hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-200',
  'hover:bg-red-500/20 hover:border-red-400 hover:text-red-200',
];

// 獲取隨機hover顏色
const getRandomHoverColor = () => {
  return tagHoverColors[Math.floor(Math.random() * tagHoverColors.length)];
};

// 全局瀏覽計數器組件
const GlobalViewCounter = ({ postId, initialViews }: { postId: number, initialViews: string }) => {
  const { getViewCount } = useViewCount();
  const currentViews = getViewCount(postId, initialViews);

  return (
    <Badge variant="outline" className="text-xs border-gray-400 text-gray-200">
      <Eye className="h-3 w-3 mr-1" />
      {currentViews}
    </Badge>
  );
};

// 白色標籤組件配隨機hover效果
const WhiteTagWithHover = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [hoverColor] = useState(() => getRandomHoverColor());
  
  return (
    <Badge 
      variant="outline" 
      className={`text-xs border-gray-500 text-white transition-all duration-300 ${hoverColor} ${className}`}
    >
      {children}
    </Badge>
  );
};

const Blog = () => {
  const { t } = useLanguage();
  
  // 頁面載入時滾動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 使用新嘅數據文件
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts();

  const categories = [
    { name: "公司介紹", nameEn: "Company Introduction", count: 1 },
    { name: "公司優勢", nameEn: "Company Advantages", count: 1 },
    { name: "工具指南", nameEn: "Tool Guide", count: 1 }
  ];

  const popularTags = [
    "AI Formula", "商業自動化", "香港中小企", "數位轉型", 
    "服務優勢", "專業團隊", "Make.com", "自動化工具"
  ];

  const popularTagsEn = [
    "AI Formula", "Business Automation", "Hong Kong SME", "Digital Transformation", 
    "Service Advantages", "Professional Team", "Make.com", "Automation Tools"
  ];

  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* SEO Meta Tags would go here in a real implementation */}
      <title>{isZhTW ? 'AI Formula 部落格 - 香港AI自動化與商業應用指南' : 'AI Formula Blog - Hong Kong AI Automation & Business Application Guide'}</title>
      
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border-blue-400">
              {isZhTW ? '最新見解與更新' : 'Latest Insights & Updates'}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {isZhTW ? 'AI Formula 專家見解' : 'AI Formula Expert Insights'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              {isZhTW 
                ? '探索AI Formula的專業見解，掌握最新AI自動化趨勢，獲得實用的商業應用指南。' 
                : 'Explore AI Formula\'s professional insights, master the latest AI automation trends and get practical business application guides.'
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
              <Input
                placeholder={isZhTW ? "搜尋文章..." : "Search articles..."}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-300 focus:border-blue-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-bold mb-12 text-center text-white"
          >
            {isZhTW ? '精選文章' : 'Featured Articles'}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gray-900/50 border-gray-700 h-full hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-gray-800/50 rounded-lg">
                        {getPostIcon(post.image)}
                      </div>
                      <div className="flex items-center gap-2">
                        <WhiteTagWithHover>{isZhTW ? post.category : post.categoryEn}</WhiteTagWithHover>
                        <GlobalViewCounter postId={post.id} initialViews={post.views} />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-3 leading-tight text-white group-hover:text-blue-300 transition-colors duration-300">
                      {isZhTW ? post.title : post.titleEn}
                    </CardTitle>
                    <CardDescription className="text-gray-200 text-base leading-relaxed">
                      {isZhTW ? post.excerpt : post.excerptEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span className="text-gray-200">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-gray-200">{isZhTW ? post.date : post.dateEn}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-gray-200">{isZhTW ? post.readTime : post.readTimeEn}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {(isZhTW ? post.tags : post.tagsEn).map((tag, idx) => (
                          <WhiteTagWithHover key={idx}>
                            {tag}
                          </WhiteTagWithHover>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Link to={`/blog/${post.id}`}>
                          <Button className="w-full group bg-white text-black hover:bg-gray-100 border-0 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 font-semibold">
                            {isZhTW ? '閱讀文章' : 'Read Article'}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              {/* Categories */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Tag className="h-5 w-5" />
                    {isZhTW ? '文章分類' : 'Categories'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between hover:text-blue-300 cursor-pointer transition-colors text-gray-200">
                        <span>{isZhTW ? category.name : category.nameEn}</span>
                        <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-200">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    {isZhTW ? '熱門標籤' : 'Popular Tags'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(isZhTW ? popularTags : popularTagsEn).map((tag) => (
                      <WhiteTagWithHover key={tag} className="cursor-pointer hover:scale-105 transition-transform">
                        {tag}
                      </WhiteTagWithHover>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:col-span-3"
            >
              <h3 className="text-2xl font-bold mb-8 text-white">
                {isZhTW ? '最新文章' : 'Recent Articles'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <Card className="bg-gray-900/50 border-gray-700 h-full hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-gray-800/50 rounded-lg">
                            {getPostIcon(post.image)}
                          </div>
                          <div className="flex items-center gap-2">
                            <WhiteTagWithHover>
                              {isZhTW ? post.category : post.categoryEn}
                            </WhiteTagWithHover>
                            <GlobalViewCounter postId={post.id} initialViews={post.views} />
                          </div>
                        </div>
                        <CardTitle className="text-lg mb-2 leading-tight text-white group-hover:text-purple-300 transition-colors duration-300">
                          {isZhTW ? post.title : post.titleEn}
                        </CardTitle>
                        <CardDescription className="text-gray-200 text-sm leading-relaxed">
                          {isZhTW ? post.excerpt : post.excerptEn}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-xs text-gray-300">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span className="text-gray-200">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className="text-gray-200">{isZhTW ? post.date : post.dateEn}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-gray-200">{isZhTW ? post.readTime : post.readTimeEn}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {(isZhTW ? post.tags : post.tagsEn).slice(0, 2).map((tag, idx) => (
                              <WhiteTagWithHover key={idx}>
                                {tag}
                              </WhiteTagWithHover>
                            ))}
                          </div>

                          <div className="pt-3">
                            <Link to={`/blog/${post.id}`}>
                              <Button size="sm" className="w-full group bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:shadow-md font-medium border-0">
                                {isZhTW ? '閱讀更多' : 'Read More'}
                                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-white">
              {isZhTW ? '訂閱AI Formula電子報' : 'Subscribe to AI Formula Newsletter'}
            </h3>
            <p className="text-gray-200 mb-8">
              {isZhTW 
                ? '獲得AI Formula最新的專業見解、實用教學和香港商業案例分析，助力您的AI轉型之路。'
                : 'Get AI Formula\'s latest professional insights, practical tutorials and Hong Kong business case studies to accelerate your AI transformation journey.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder={isZhTW ? "輸入您的電子郵件地址" : "Enter your email address"}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-300 focus:border-blue-400"
              />
              <Button className="bg-white text-black hover:bg-gray-100 font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300">
                {isZhTW ? '訂閱' : 'Subscribe'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 