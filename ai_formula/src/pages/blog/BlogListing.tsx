import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, User, Search, Tag, TrendingUp, Eye, Rocket, Star, Settings, Package, RotateCcw, Zap, BookOpen, PenTool, Lightbulb, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
// 移除 Footer 導入，因為 App.tsx 已經有全局 Footer
import { useLanguage } from "@/contexts/LanguageContext";
import { useSafeViewCount } from "@/contexts/ViewCountContext"; // 改為安全版本
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedPosts, getRecentPosts, getSortedPostsNewest } from "@/data/blog/blogPosts";

// 圖標映射 - 用Lucide圖標替代emoji
const getPostIcon = (image: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "🚀": <Rocket className="h-8 w-8 text-yellow-400" />,
    "⭐": <Star className="h-8 w-8 text-yellow-400" />,
    "⚙️": <Settings className="h-8 w-8 text-gray-400" />,
    "📦": <Package className="h-8 w-8 text-green-400" />,
    "🔄": <RotateCcw className="h-8 w-8 text-purple-400" />,
    "⚡": <Zap className="h-8 w-8 text-orange-400" />
  };
  
  return iconMap[image] || <Star className="h-8 w-8 text-yellow-400" />;
};

// Feature Cards Data
const featureCards = [
  {
    id: 1,
    icon: BookOpen,
    title: "深度學習指南",
    titleEn: "Deep Learning Guide",
    description: "專業AI知識分享，從基礎到進階的完整學習路徑",
    descriptionEn: "Professional AI knowledge sharing, complete learning path from basics to advanced",
    gradient: "from-yellow-400/20 to-amber-500/20"
  },
  {
    id: 2,
    icon: PenTool,
    title: "實戰案例分析",
    titleEn: "Practical Case Studies",
    description: "真實商業案例解析，讓您快速掌握AI應用精髓",
    descriptionEn: "Real business case analysis to help you quickly master AI application essentials",
    gradient: "from-amber-400/20 to-yellow-600/20"
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "創新思維啟發",
    titleEn: "Innovation Inspiration",
    description: "探索AI前沿趨勢，激發無限創意可能性",
    descriptionEn: "Explore cutting-edge AI trends and inspire unlimited creative possibilities",
    gradient: "from-yellow-500/20 to-amber-400/20"
  },
  {
    id: 4,
    icon: Target,
    title: "精準解決方案",
    titleEn: "Targeted Solutions",
    description: "針對具體業務需求，提供量身定制的AI解決方案",
    descriptionEn: "Provide customized AI solutions for specific business needs",
    gradient: "from-amber-500/20 to-yellow-500/20"
  }
];

// Feature Cards Component
const FeatureCards = ({ isZhTW }: { isZhTW: boolean }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            {isZhTW ? '功能模塊' : 'Feature Modules'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {isZhTW 
              ? '探索我們的核心功能，提升您的AI學習體驗'
              : 'Explore our core features to enhance your AI learning experience'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group perspective-1000"
            >
              <div className={`
                relative overflow-hidden rounded-2xl p-8 h-full
                bg-gradient-to-br ${feature.gradient}
                backdrop-blur-xl border border-yellow-400/30
                shadow-2xl shadow-yellow-500/10
                hover:shadow-yellow-400/20 hover:border-yellow-400/50
                transition-all duration-500 ease-out
                before:absolute before:inset-0 
                before:bg-gradient-to-br before:from-yellow-400/5 before:to-transparent
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
              `}>
                {/* Metallic border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-yellow-400/20 via-amber-500/30 to-yellow-600/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ 
                       mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       maskComposite: 'xor',
                       WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       WebkitMaskComposite: 'xor'
                     }} />

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="relative">
                      <feature.icon 
                        className="h-12 w-12 text-yellow-400 group-hover:text-yellow-300 transition-all duration-300"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.3)) drop-shadow(0 0 16px rgba(250, 204, 21, 0.1))',
                          stroke: 'url(#goldGradient)',
                          strokeWidth: '1.5px'
                        }}
                      />
                      {/* Icon glow */}
                      <div className="absolute inset-0">
                        <feature.icon 
                          className="h-12 w-12 text-yellow-400/30 blur-sm group-hover:text-yellow-400/50 transition-all duration-300" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-yellow-100 transition-colors duration-300">
                    {isZhTW ? feature.title : feature.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {isZhTW ? feature.description : feature.descriptionEn}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/50 rounded-full group-hover:bg-yellow-400 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-amber-400/50 rounded-full group-hover:bg-amber-400 transition-colors duration-300" />
                </div>

                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse" />
                  <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-amber-400/30 rounded-full animate-pulse delay-1000" />
                  <div className="absolute bottom-1/3 left-2/3 w-0.5 h-0.5 bg-yellow-500/25 rounded-full animate-pulse delay-2000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SVG Gradients for icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

// 隨機顏色配置 - 移除藍色，改為金色主題
const tagHoverColors = [
  'hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-200',
  'hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200',
  'hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-200',
  'hover:bg-green-500/20 hover:border-green-400 hover:text-green-200',
  'hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200',
  'hover:bg-pink-500/20 hover:border-pink-400 hover:text-pink-200',
  'hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200',
  'hover:bg-red-500/20 hover:border-red-400 hover:text-red-200',
];

// 獲取隨機hover顏色
const getRandomHoverColor = () => {
  return tagHoverColors[Math.floor(Math.random() * tagHoverColors.length)];
};

// 全局瀏覽計數器組件 - 改為金色主題
const GlobalViewCounter = ({ postId, initialViews }: { postId: number, initialViews: string }) => {
  const { getViewCount } = useSafeViewCount();
  const baseViews = parseInt(initialViews) || 0;
  const additionalViews = getViewCount(postId);
  const totalViews = baseViews + additionalViews;
  
  return (
    <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
      <Eye className="h-3 w-3" />
      <span className="text-xs font-medium">{totalViews.toString()}</span>
    </div>
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

const BlogListing = () => {
  const { t } = useLanguage();
  
  // 頁面載入時滾動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 使用正確的數據文件
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
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#121212' }}>
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
      <section className="page-content pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-200 border-yellow-400">
              {isZhTW ? '最新見解與更新' : 'Latest Insights & Updates'}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              {isZhTW ? 'AI Formula 博客' : 'AI Formula Blog'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              {isZhTW 
                ? '探索AI工具、自動化技巧和商業創新的最新資訊' 
                : 'Explore the latest in AI tools, automation techniques, and business innovation'
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
              <Input
                placeholder={isZhTW ? "搜尋文章..." : "Search articles..."}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-300 focus:border-yellow-400"
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
                <Card className="bg-gray-900/50 border-gray-700 h-full hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20 group">
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
                    <CardTitle className="text-2xl mb-3 leading-tight text-white group-hover:text-yellow-300 transition-colors duration-300">
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

      {/* Feature Cards Section */}
      <FeatureCards isZhTW={isZhTW} />

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
                      <div key={category.name} className="flex items-center justify-between hover:text-yellow-300 cursor-pointer transition-colors text-gray-200">
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
                    <Card className="bg-gray-900/50 border-gray-700 h-full hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 group">
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
                        <CardTitle className="text-lg mb-2 leading-tight text-white group-hover:text-amber-300 transition-colors duration-300">
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

      {/* 移除這裡的 Footer，因為 App.tsx 已經有全局 Footer */}
    </div>
  );
};

export default BlogListing; 
