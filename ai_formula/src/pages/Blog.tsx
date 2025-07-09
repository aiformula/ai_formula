import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, User, Search, Tag, TrendingUp, Eye, Rocket, Star, Settings, Package, RotateCcw, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewCount } from "@/contexts/ViewCountContext";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { getFeaturedPosts, getRecentPosts, type BlogPost } from "@/data/blogPosts";

// Types
interface Category {
  name: string;
  nameEn: string;
  count: number;
}

interface GlobalViewCounterProps {
  postId: number;
  initialViews: string;
}

interface WhiteTagWithHoverProps {
  children: React.ReactNode;
  className?: string;
}

interface PostCardProps {
  post: BlogPost;
  index: number;
  isZhTW: boolean;
  variant?: 'featured' | 'recent';
}

interface SearchState {
  query: string;
  isLoading: boolean;
}

interface NewsletterState {
  email: string;
  isLoading: boolean;
  isSubscribed: boolean;
}

// Constants
const ICON_MAP: Record<string, JSX.Element> = {
  "🚀": <Rocket className="h-8 w-8 text-blue-400" />,
  "⭐": <Star className="h-8 w-8 text-yellow-400" />,
  "⚙️": <Settings className="h-8 w-8 text-gray-400" />,
  "🔧": <Settings className="h-8 w-8 text-gray-400" />,
  "📦": <Package className="h-8 w-8 text-green-400" />,
  "🔄": <RotateCcw className="h-8 w-8 text-purple-400" />,
  "⚡": <Zap className="h-8 w-8 text-orange-400" />,
  "🤖": <Settings className="h-8 w-8 text-cyan-400" />,
  "🧠": <Settings className="h-8 w-8 text-pink-400" />
};

const TAG_HOVER_COLORS = [
  'hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200',
  'hover:bg-green-500/20 hover:border-green-400 hover:text-green-200',
  'hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200',
  'hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-200',
  'hover:bg-pink-500/20 hover:border-pink-400 hover:text-pink-200',
  'hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200',
  'hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-200',
  'hover:bg-red-500/20 hover:border-red-400 hover:text-red-200',
];

const CATEGORIES: Category[] = [
  { name: "公司介紹", nameEn: "Company Introduction", count: 1 },
  { name: "公司優勢", nameEn: "Company Advantages", count: 1 },
  { name: "工具指南", nameEn: "Tool Guide", count: 1 },
  { name: "科技前瞻", nameEn: "Tech Innovation", count: 1 },
  { name: "基礎知識", nameEn: "Fundamentals", count: 1 }
];

const POPULAR_TAGS = [
  "AI Formula", "商業自動化", "香港中小企", "數位轉型", 
  "服務優勢", "專業團隊", "Make.com", "自動化工具"
];

const POPULAR_TAGS_EN = [
  "AI Formula", "Business Automation", "Hong Kong SME", "Digital Transformation", 
  "Service Advantages", "Professional Team", "Make.com", "Automation Tools"
];

// Animation configurations
const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
} as const;

// Utility functions
const getPostIcon = (image: string): JSX.Element => {
  return ICON_MAP[image] || <Star className="h-8 w-8 text-blue-400" />;
};

const getRandomHoverColor = (): string => {
  return TAG_HOVER_COLORS[Math.floor(Math.random() * TAG_HOVER_COLORS.length)];
};

// Components
const GlobalViewCounter: React.FC<GlobalViewCounterProps> = ({ postId, initialViews }) => {
  const { getViewCount } = useViewCount();
  const currentViews = getViewCount(postId, initialViews);

  return (
    <Badge variant="outline" className="text-xs border-gray-400 text-gray-200">
      <Eye className="h-3 w-3 mr-1" />
      {currentViews}
    </Badge>
  );
};

const WhiteTagWithHover: React.FC<WhiteTagWithHoverProps> = ({ children, className = "" }) => {
  const hoverColor = useMemo(() => getRandomHoverColor(), []);
  
  return (
    <Badge 
      variant="outline" 
      className={`text-xs border-gray-500 text-white transition-all duration-300 ${hoverColor} ${className}`}
    >
      {children}
    </Badge>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post, index, isZhTW, variant = 'recent' }) => {
  const isFeatured = variant === 'featured';
  const hoverColor = isFeatured ? 'hover:border-blue-400 hover:shadow-blue-500/20' : 'hover:border-purple-400 hover:shadow-purple-500/20';
  const titleColor = isFeatured ? 'group-hover:text-blue-300' : 'group-hover:text-purple-300';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
      whileHover={{ y: -3 }}
    >
      <Card className={`bg-gray-900/50 border-gray-700 h-full ${hoverColor} transition-all duration-300 hover:shadow-lg group`}>
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-gray-800/50 rounded-lg" role="img" aria-label={`${post.category} icon`}>
              {getPostIcon(post.image)}
            </div>
            <div className="flex items-center gap-2">
              <WhiteTagWithHover>{isZhTW ? post.category : post.categoryEn}</WhiteTagWithHover>
              <GlobalViewCounter postId={post.id} initialViews={post.views} />
            </div>
          </div>
          <CardTitle className={`${isFeatured ? 'text-2xl' : 'text-lg'} mb-3 leading-tight text-white ${titleColor} transition-colors duration-300`}>
            {isZhTW ? post.title : post.titleEn}
          </CardTitle>
          <CardDescription className={`text-gray-200 ${isFeatured ? 'text-base' : 'text-sm'} leading-relaxed`}>
            {isZhTW ? post.excerpt : post.excerptEn}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={`flex items-center gap-4 ${isFeatured ? 'text-sm' : 'text-xs'} text-gray-300`}>
              <div className="flex items-center gap-1">
                <User className={`${isFeatured ? 'h-4 w-4' : 'h-3 w-3'}`} />
                <span className="text-gray-200">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className={`${isFeatured ? 'h-4 w-4' : 'h-3 w-3'}`} />
                <span className="text-gray-200">{isZhTW ? post.date : post.dateEn}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className={`${isFeatured ? 'h-4 w-4' : 'h-3 w-3'}`} />
                <span className="text-gray-200">{isZhTW ? post.readTime : post.readTimeEn}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(isZhTW ? post.tags : post.tagsEn).slice(0, isFeatured ? 4 : 2).map((tag, idx) => (
                <WhiteTagWithHover key={idx}>
                  {tag}
                </WhiteTagWithHover>
              ))}
            </div>

            <div className={`${isFeatured ? 'pt-4' : 'pt-3'}`}>
              <Link to={`/blog/${post.id}`}>
                <Button 
                  size={isFeatured ? "default" : "sm"}
                  className="w-full group bg-white text-black hover:bg-gray-100 border-0 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 font-semibold"
                >
                  {isZhTW ? (isFeatured ? '閱讀文章' : '閱讀更多') : (isFeatured ? 'Read Article' : 'Read More')}
                  <ArrowRight className={`ml-2 ${isFeatured ? 'h-4 w-4' : 'h-3 w-3'} group-hover:translate-x-1 transition-transform`} />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SearchBar: React.FC<{ searchState: SearchState; onSearchChange: (query: string) => void; isZhTW: boolean }> = ({ 
  searchState, 
  onSearchChange, 
  isZhTW 
}) => (
  <div className="max-w-md mx-auto relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
    <Input
      placeholder={isZhTW ? "搜尋文章..." : "Search articles..."}
      value={searchState.query}
      onChange={(e) => onSearchChange(e.target.value)}
      className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-300 focus:border-blue-400"
      disabled={searchState.isLoading}
    />
  </div>
);

const NewsletterSection: React.FC<{ 
  newsletterState: NewsletterState; 
  onEmailChange: (email: string) => void; 
  onSubscribe: () => void; 
  isZhTW: boolean 
}> = ({ newsletterState, onEmailChange, onSubscribe, isZhTW }) => (
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
        {!newsletterState.isSubscribed ? (
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder={isZhTW ? "輸入您的電子郵件地址" : "Enter your email address"}
              value={newsletterState.email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-300 focus:border-blue-400"
              disabled={newsletterState.isLoading}
            />
            <Button 
              onClick={onSubscribe}
              disabled={newsletterState.isLoading || !newsletterState.email}
              className="bg-white text-black hover:bg-gray-100 font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300"
            >
              {newsletterState.isLoading ? (isZhTW ? '處理中...' : 'Processing...') : (isZhTW ? '訂閱' : 'Subscribe')}
            </Button>
          </div>
        ) : (
          <div className="text-green-400 font-semibold">
            {isZhTW ? '✅ 訂閱成功！感謝您的關注。' : '✅ Successfully subscribed! Thank you for your interest.'}
          </div>
        )}
      </motion.div>
    </div>
  </section>
);

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-TW';
  
  // States
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    isLoading: false
  });
  
  const [newsletterState, setNewsletterState] = useState<NewsletterState>({
    email: '',
    isLoading: false,
    isSubscribed: false
  });
  
  // Memoized data
  const featuredPosts = useMemo(() => getFeaturedPosts(), []);
  const recentPosts = useMemo(() => getRecentPosts(), []);
  
  // Handlers
  const handleSearchChange = useCallback((query: string) => {
    setSearchState(prev => ({ ...prev, query }));
    // Future Enhancement: Implement search functionality with backend integration
    // This will enable filtering posts by title, content, and tags
  }, []);
  
  const handleEmailChange = useCallback((email: string) => {
    setNewsletterState(prev => ({ ...prev, email }));
  }, []);
  
  const handleSubscribe = useCallback(async () => {
    setNewsletterState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Future Enhancement: Implement newsletter subscription with email service
      // This will integrate with a proper email marketing service like Mailchimp or ConvertKit
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewsletterState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isSubscribed: true 
      }));
    } catch (error) {
      setNewsletterState(prev => ({ ...prev, isLoading: false }));
      console.error('Newsletter subscription failed:', error);
    }
  }, []);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

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
            
            <SearchBar 
              searchState={searchState} 
              onSearchChange={handleSearchChange} 
              isZhTW={isZhTW} 
            />
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
              <PostCard 
                key={post.id}
                post={post}
                index={index}
                isZhTW={isZhTW}
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.aside
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
                  <nav className="space-y-3" role="navigation" aria-label="文章分類">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.name}
                        className="w-full flex items-center justify-between hover:text-blue-300 cursor-pointer transition-colors text-gray-200 text-left"
                        onClick={() => {
                          // Future Enhancement: Implement category filtering functionality
                          // This will enable filtering posts by selected category
                        }}
                      >
                        <span>{isZhTW ? category.name : category.nameEn}</span>
                        <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-200">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </nav>
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
                    {(isZhTW ? POPULAR_TAGS : POPULAR_TAGS_EN).map((tag) => (
                      <WhiteTagWithHover 
                        key={tag} 
                        className="cursor-pointer hover:scale-105 transition-transform"
                      >
                        {tag}
                      </WhiteTagWithHover>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.aside>

            {/* Recent Posts */}
            <motion.main
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
                  <PostCard 
                    key={post.id}
                    post={post}
                    index={index}
                    isZhTW={isZhTW}
                    variant="recent"
                  />
                ))}
              </div>
            </motion.main>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSection 
        newsletterState={newsletterState}
        onEmailChange={handleEmailChange}
        onSubscribe={handleSubscribe}
        isZhTW={isZhTW}
      />
    </div>
  );
};

export default Blog; 