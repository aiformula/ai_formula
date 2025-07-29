import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Eye, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  AlertTriangle, 
  RefreshCw,
  Globe,
  Copy,
  ExternalLink,
  Heart,
  ChevronRight,
  BookOpen,
  Star,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet-async';

import { useLanguage } from '@/contexts/LanguageContext';
import { useSafeViewCount } from '@/contexts/ViewCountContext';
import { getSortedPostsNewest } from '@/data/blog/blogPosts';
import { BlogPost as BlogPostType } from '@/data/blog/blogPosts';
import { articleContents } from '@/data/blog/articleContent';
import { digitalProducts } from '@/data/courses/courseData'; // 導入實際課程數據

interface ArticleViewCounterProps {
  initialViews: string;
  postId: number;
}

interface BlogPostPageProps {
  post: BlogPostType;
  isZhHK: boolean;
  content?: any;
}

interface ShareData {
  title: string;
  text: string;
  url: string;
}

// Utility functions
const generateShareData = (post: BlogPostType, isZhHK: boolean): ShareData => ({
  title: isZhHK ? post.title : post.titleEn,
  text: isZhHK ? post.excerpt : post.excerptEn,
  url: window.location.href
});

// Modern ArticleViewCounter with animations
const ArticleViewCounter: React.FC<ArticleViewCounterProps> = ({ initialViews, postId }) => {
  const { language } = useLanguage();
  const { getViewCount, incrementView } = useSafeViewCount();
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasIncremented, setHasIncremented] = useState(false);
  
  const currentViews = getViewCount(postId);
  const baseViews = parseInt(initialViews) || 0;
  const displayViews = (baseViews + currentViews).toString();
  
  useEffect(() => {
    if (typeof window !== 'undefined' && !hasIncremented) {
      setHasIncremented(true);
      incrementView(postId);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [postId, incrementView, hasIncremented]);

  return (
    <motion.div 
      className="flex items-center gap-2 text-yellow-400 font-medium"
      animate={{ 
        scale: isAnimating ? [1, 1.1, 1] : 1,
        color: isAnimating ? '#FFD700' : '#FBBF24'
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Eye className="h-4 w-4" />
      <span className="font-semibold">{displayViews}</span>
      <span className="text-sm text-yellow-300/80">
        {language === 'zh-HK' ? '次瀏覽' : 'views'}
      </span>
    </motion.div>
  );
};

// Sticky Share Button Component
const StickyShareButton: React.FC<{ shareData: ShareData | null; isZhHK: boolean }> = ({ shareData, isZhHK }) => {
  const [showOptions, setShowOptions] = useState(false);
  
  const handleShare = useCallback(async () => {
    if (!shareData) return;

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowOptions(!showOptions);
    }
  }, [shareData, showOptions]);

  const copyToClipboard = useCallback(async () => {
    if (shareData) {
      await navigator.clipboard.writeText(shareData.url);
      setShowOptions(false);
      // Simple feedback could be added here
    }
  }, [shareData]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        <Button
          onClick={handleShare}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full w-14 h-14 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-16 right-0 bg-black/95 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-2 min-w-48"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="w-full justify-start text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
              >
                <Copy className="h-4 w-4 mr-2" />
                {isZhHK ? '複製連結' : 'Copy Link'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// AI Course Recommendation Component - 琥珀黃未來科技風格設計
const CourseRecommendation: React.FC<{ isZhHK: boolean }> = ({ isZhHK }) => {
  const randomCourse = useMemo(() => {
    // 從實際的課程數據中隨機選擇
    if (digitalProducts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * digitalProducts.length);
    return digitalProducts[randomIndex];
  }, []);

  if (!randomCourse) return null;

  // 課程標籤生成邏輯和霓虹發光顏色 - 琥珀黃主題
  const getCourseTagsContent = (course: any) => {
    const tagConfigs = [];
    if (course.newProduct) tagConfigs.push({ 
      text: isZhHK ? '新品' : 'New', 
      color: '#F6B73C',
      glowColor: '#F6B73C'
    });
    if (course.bestseller) tagConfigs.push({ 
      text: isZhHK ? '暢銷' : 'Best Seller', 
      color: '#FF9800',
      glowColor: '#FF9800'
    });
    if (course.featured) tagConfigs.push({ 
      text: isZhHK ? '精選' : 'Featured', 
      color: '#FFC857',
      glowColor: '#FFC857'
    });
    if (course.hotSelling) tagConfigs.push({ 
      text: isZhHK ? '熱銷' : 'Hot', 
      color: '#E6A700',
      glowColor: '#E6A700'
    });
    return tagConfigs;
  };

  const courseTags = getCourseTagsContent(randomCourse);
  const courseTitle = isZhHK ? randomCourse.titleCht : randomCourse.title;
  const courseDuration = isZhHK ? randomCourse.durationCht : randomCourse.duration;
  const courseLevel = isZhHK ? randomCourse.levelCht : randomCourse.level;
  const coursePrice = randomCourse.price;
  const courseRating = randomCourse.rating;
  const isFree = coursePrice === '免費' || coursePrice === 'Free';

  // 導航到課程頁面
  const handleCourseClick = () => {
    if (randomCourse.category === 'chatgpt-complete-course') {
      window.open('/courses/chatgpt-complete-course/outline', '_blank');
    } else {
      window.open('/courses', '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-yellow-400/20 p-6 mb-6"
    >
      <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5" />
        {isZhHK ? 'AI 課程推薦' : 'AI Course Recommendation'}
      </h3>
      
      <motion.div
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 8px 20px rgba(0,0,0,0.25), 0 0 30px rgba(246, 183, 60, 0.15)'
        }}
        transition={{ duration: 0.3 }}
        onClick={handleCourseClick}
        className="cursor-pointer rounded-xl overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(135deg, #1C1C1C 0%, #0D0D0D 100%)',
          border: '1px solid rgba(246, 183, 60, 0.2)'
        }}
      >
        {/* 動畫背景粒子效果 - 琥珀黃主題 */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-float"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(246, 183, 60, 0.3) 1px, transparent 1px),
                radial-gradient(circle at 60% 70%, rgba(255, 152, 0, 0.3) 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, rgba(255, 200, 87, 0.3) 1px, transparent 1px),
                linear-gradient(45deg, transparent 24%, rgba(246, 183, 60, 0.1) 25%, rgba(246, 183, 60, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 152, 0, 0.1) 75%, rgba(255, 152, 0, 0.1) 76%, transparent 77%)
              `,
              backgroundSize: '50px 50px, 80px 80px, 60px 60px, 20px 20px'
            }}
          />
        </div>

        <div className="relative p-6 z-10">
          {/* 課程標籤 - 琥珀黃霓虹發光效果 */}
          {courseTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {courseTags.map((tag, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white border"
                  style={{ 
                    backgroundColor: `${tag.color}20`,
                    borderColor: tag.color,
                    boxShadow: `0 0 10px ${tag.glowColor}40, inset 0 0 10px ${tag.glowColor}20`,
                    color: tag.color
                  }}
                >
                  {tag.text}
                </motion.span>
              ))}
            </div>
          )}
          
          {/* 課程名稱 - 琥珀黃漸變文字 */}
          <h4 
            className="font-bold mb-6 text-lg leading-tight text-center"
            style={{
              background: 'linear-gradient(135deg, #F6B73C 0%, #FF9800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {courseTitle}
          </h4>
          
          {/* 課程詳細資訊 - 向量圖示 + 琥珀黃霓虹發光 */}
          <div className="space-y-4 mb-6">
            {/* 時長 */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-5 h-5 flex items-center justify-center"
              >
                <Clock 
                  className="w-4 h-4 text-amber-400" 
                  style={{ 
                    filter: 'drop-shadow(0 0 6px #F6B73C)',
                    stroke: '#FFC857'
                  }} 
                />
              </motion.div>
              <span className="text-gray-300 min-w-0 flex-1 text-center">
                {courseDuration}
              </span>
            </div>
            
            {/* 難度 */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-5 h-5 flex items-center justify-center"
              >
                <User 
                  className="w-4 h-4 text-yellow-500" 
                  style={{ 
                    filter: 'drop-shadow(0 0 6px #FF9800)',
                    stroke: '#FFC857'
                  }} 
                />
              </motion.div>
              <span className="text-gray-300 min-w-0 flex-1 text-center">
                {courseLevel}
              </span>
            </div>
            
            {/* 評分 */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-5 h-5 flex items-center justify-center"
              >
                <Star 
                  className="w-4 h-4 text-amber-500 fill-current" 
                  style={{ 
                    filter: 'drop-shadow(0 0 6px #E6A700)',
                    stroke: '#F6B73C'
                  }} 
                />
              </motion.div>
              <span className="text-gray-300 min-w-0 flex-1 text-center">
                {courseRating} / 5.0
              </span>
            </div>
            
            {/* 價格 - 琥珀黃發光 */}
            <div className="flex items-center justify-center gap-3 text-sm">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-5 h-5 flex items-center justify-center"
              >
                {isFree ? (
                  <BookOpen 
                    className="w-4 h-4" 
                    style={{ 
                      filter: 'drop-shadow(0 0 6px #FFD95C)',
                      stroke: '#FFD95C',
                      color: '#FFD95C'
                    }} 
                  />
                ) : (
                  <span 
                    className="text-lg font-bold"
                    style={{ 
                      filter: 'drop-shadow(0 0 6px #FFD95C)',
                      color: '#FFD95C'
                    }}
                  >
                    $
                  </span>
                )}
              </motion.div>
              <span 
                className="min-w-0 flex-1 text-center font-bold text-lg"
                style={{
                  color: '#FFD95C',
                  textShadow: '0 0 10px #FFD95C40',
                  filter: 'drop-shadow(0 0 4px #FFD95C)'
                }}
              >
                {coursePrice}
              </span>
            </div>
          </div>
          
          {/* ⚡ 開始課程按鈕 - 琥珀黃漸變 + 發光效果 */}
          <motion.button
            onClick={handleCourseClick}
            className="w-full py-3 rounded-lg text-white font-bold text-sm transition-all duration-300 border relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #F6B73C 0%, #FF9800 100%)',
              borderColor: 'transparent'
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 20px rgba(246, 183, 60, 0.5), 0 0 40px rgba(255, 152, 0, 0.3)',
              filter: 'brightness(1.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ⚡ {isZhHK ? '開始課程' : 'Start Course'}
            </span>
            {/* 按鈕內部光效 */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
              }}
            />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Single Related Article Component
const SingleRelatedArticle: React.FC<{ currentPost: BlogPostType; isZhHK: boolean }> = ({ currentPost, isZhHK }) => {
  const relatedPosts = useMemo(() => {
    try {
      const allPosts = getSortedPostsNewest();
      const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
      if (otherPosts.length === 0) return [];
      
      // 隨機選擇3篇文章
      const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    } catch (error) {
      console.error('Error getting related posts:', error);
      return [];
    }
  }, [currentPost.id]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-yellow-400/20 p-6"
    >
      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        {isZhHK ? '其他文章' : 'Other Articles'}
      </h3>
      
      <div className="space-y-4">
        {relatedPosts.map((relatedPost, index) => (
          <motion.div
            key={relatedPost.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Link to={`/blog/${relatedPost.id}`}>
              <Card className="bg-gray-800/30 border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:bg-gray-800/50 group">
                <CardContent className="p-4">
                  {/* 分類標籤 */}
                  <Badge 
                    variant="secondary" 
                    className="mb-3 bg-yellow-400/10 text-yellow-400 border-yellow-400/30 text-xs"
                  >
                    {isZhHK ? relatedPost.category : relatedPost.categoryEn}
                  </Badge>
                  
                  {/* 文章標題 - 允許換行 */}
                  <h4 className="font-semibold text-white mb-2 leading-tight group-hover:text-yellow-300 transition-colors">
                    {isZhHK ? relatedPost.title : relatedPost.titleEn}
                  </h4>
                  
                  {/* 文章描述 - 截斷顯示 */}
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3 leading-relaxed">
                    {isZhHK ? relatedPost.excerpt : relatedPost.excerptEn}
                  </p>
                  
                  {/* 文章資訊 */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{relatedPost.readTime} {isZhHK ? '分鐘' : 'min'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400/70 group-hover:text-yellow-400 transition-colors">
                      <span>{isZhHK ? '閱讀更多' : 'Read more'}</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* 查看更多按鈕 */}
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <Link to="/blog">
          <Button 
            variant="outline" 
            className="w-full text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
          >
            {isZhHK ? '查看所有文章' : 'View All Articles'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

// Combined Sidebar Component - AI課程推薦在上，其他文章在下
const BlogSidebar: React.FC<{ currentPost: BlogPostType; isZhHK: boolean }> = ({ currentPost, isZhHK }) => {
  return (
    <div className="sticky top-8 space-y-6">
      {/* AI 課程推薦 */}
      <CourseRecommendation isZhHK={isZhHK} />
      
      {/* 其他文章 */}
      <SingleRelatedArticle currentPost={currentPost} isZhHK={isZhHK} />
    </div>
  );
};

// Modern BlogPost Page Component with Black Theme
const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, isZhHK, content }) => {
  const navigate = useNavigate();
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setShareData(generateShareData(post, isZhHK));
  }, [post, isZhHK]);

  const handleBookmark = useCallback(() => {
    setIsLiked(!isLiked);
    // Future: implement actual bookmark functionality
  }, [isLiked]);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return isZhHK ? '未知日期' : 'Unknown Date';
    const d = typeof date === 'string' ? new Date(date) : date;
    return isZhHK 
      ? d.toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric' })
      : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const title = isZhHK ? post.title : post.titleEn;
  const excerpt = isZhHK ? post.excerpt : post.excerptEn;

  // Enhanced content rendering with better error handling
  const renderSections = useCallback((contentObj) => {
    if (!contentObj || !contentObj.sections || !Array.isArray(contentObj.sections)) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400 italic text-lg">
            {isZhHK ? '內容載入中...' : 'Content loading...'}
          </p>
        </div>
      );
    }
    
    try {
      return contentObj.sections.map((section, idx) => {
        if (!section || typeof section !== 'object') {
          return <div key={idx} className="text-red-400">Invalid section data</div>;
        }
        
        const text = isZhHK ? (section.content || '') : (section.contentEn || section.content || '');
        
        let safeItems = [];
        try {
          const rawItems = isZhHK ? section.items : (section.itemsEn || section.items);
          safeItems = Array.isArray(rawItems) ? rawItems : [];
        } catch (error) {
          console.error('Error processing section items:', error);
          safeItems = [];
        }
        
        const sectionAnimation = {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: idx * 0.1 }
        };
        
        if (section.type === 'heading') {
          const Tag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
          return (
            <motion.div key={idx} {...sectionAnimation}>
              {React.createElement(Tag, { 
                className: 'font-bold mt-12 mb-6 text-3xl text-yellow-400 leading-tight'
              }, text)}
            </motion.div>
          );
        }
        
        if (section.type === 'paragraph') {
          return (
            <motion.p key={idx} {...sectionAnimation} className="mb-6 text-lg leading-relaxed text-gray-200">
              {text}
            </motion.p>
          );
        }
        
        if (section.type === 'card') {
          return (
            <motion.div key={idx} {...sectionAnimation} className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/5 border-l-4 border-yellow-400 rounded-lg p-6 mb-8 shadow-lg">
              <div className="font-bold mb-4 text-yellow-400 text-xl">{text}</div>
              <ul className="list-disc pl-6 space-y-2">
                {safeItems.map((item, i) => (
                  <li key={i} className="text-gray-200 leading-relaxed">{item}</li>
                ))}
              </ul>
            </motion.div>
          );
        }
        
        if (section.type === 'highlight') {
          return (
            <motion.div key={idx} {...sectionAnimation} className="bg-gradient-to-r from-blue-400/10 to-purple-600/5 border-l-4 border-blue-400 rounded-lg p-6 mb-8 shadow-lg">
              <div className="font-bold mb-4 text-blue-400 text-xl">{text}</div>
              <ul className="list-disc pl-6 space-y-2">
                {safeItems.map((item, i) => (
                  <li key={i} className="text-gray-200 leading-relaxed">{item}</li>
                ))}
              </ul>
            </motion.div>
          );
        }
        
        if (section.type === 'steps' || section.type === 'list') {
          return (
            <motion.ol key={idx} {...sectionAnimation} className="list-decimal pl-6 mb-8 space-y-3">
              {safeItems.map((item, i) => (
                <li key={i} className="text-gray-200 leading-relaxed text-lg">{item}</li>
              ))}
            </motion.ol>
          );
        }
        
        if (section.type === 'conclusion') {
          return (
            <motion.div key={idx} {...sectionAnimation} className="bg-gradient-to-r from-green-400/10 to-emerald-600/5 border-l-4 border-green-400 rounded-lg p-6 mb-8 shadow-lg">
              <div className="font-bold mb-4 text-green-400 text-xl">{text}</div>
              <ul className="list-disc pl-6 space-y-2">
                {safeItems.map((item, i) => (
                  <li key={i} className="text-gray-200 leading-relaxed">{item}</li>
                ))}
              </ul>
            </motion.div>
          );
        }
        
        return (
          <motion.p key={idx} {...sectionAnimation} className="text-gray-200 mb-4">
            {text}
          </motion.p>
        );
      });
    } catch (error) {
      console.error('Error rendering sections:', error);
      return (
        <div className="text-center py-8">
          <p className="text-red-400">
            {isZhHK ? '內容載入錯誤，請稍後再試。' : 'Error loading content. Please try again later.'}
          </p>
        </div>
      );
    }
  }, [isZhHK]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>{title} - AI Formula</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.publishDate ? post.publishDate.toISOString() : ''} />
        <meta property="article:tag" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Sticky Share Button */}
      <StickyShareButton shareData={shareData} isZhHK={isZhHK} />

      {/* Main Content */}
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-black"
        >
          <div className="container mx-auto px-6 py-8">
            {/* Back Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link to="/blog">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mb-6 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {isZhHK ? '返回部落格' : 'Back to Blog'}
                </Button>
              </Link>
            </motion.div>

            {/* Article Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-7xl mx-auto mb-12"
            >
              {/* Hero Image */}
              <div className="relative h-[50vh] md:h-[60vh] overflow-hidden rounded-3xl mb-8">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  src={post.image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              
              {/* Title and Meta Info */}
              <div className="text-center max-w-4xl mx-auto">
                <Badge 
                  variant="secondary" 
                  className="mb-4 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 backdrop-blur-sm"
                >
                  {isZhHK ? post.category : post.categoryEn}
                </Badge>
                
                {/* Large Title */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {title}
                </h1>
                
                <p className="text-gray-300 text-xl md:text-2xl mb-8 leading-relaxed">
                  {excerpt}
                </p>
                
                {/* Author Info */}
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} {isZhHK ? '分鐘閱讀' : 'min read'}</span>
                  </div>
                  <ArticleViewCounter initialViews={post.views} postId={post.id} />
                </div>
              </div>
            </motion.div>

            {/* Content Layout: Article + Sidebar */}
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Article Content */}
                <div className="lg:col-span-8">
                  <motion.article 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="bg-gray-900/30 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-400/20 overflow-hidden"
                  >
                    {/* Article Content */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="p-8 md:p-12 lg:p-16"
                    >
                      <div className="prose prose-lg prose-invert max-w-none">
                        {renderSections(content)}
                      </div>
                    </motion.div>

                    {/* Article Actions */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="px-8 md:px-12 lg:px-16 pb-8 md:pb-12"
                    >
                      <Separator className="mb-8 bg-yellow-400/20" />
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBookmark}
                            className={`flex items-center gap-2 transition-all duration-300 ${
                              isLiked 
                                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' 
                                : 'text-gray-400 border-gray-600 hover:text-yellow-400 hover:border-yellow-400/50'
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                            {isZhHK ? '收藏' : 'Like'}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Tag className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {isZhHK ? post.category : post.categoryEn}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4">
                  <BlogSidebar currentPost={post} isZhHK={isZhHK} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Error Boundary for Blog
class BlogErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Blog page error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Unknown error';
      const isViewCountError = errorMessage.includes('add') || errorMessage.includes('ViewCount');
      const isHookError = errorMessage.includes('hook') || errorMessage.includes('Hook');
      
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="max-w-xl mx-auto p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-2xl shadow-2xl border border-red-400/30 p-8"
            >
              <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              
              <h1 className="text-2xl font-bold text-red-400 mb-4 text-center">
                {isHookError ? 'Hook Error' : 
                 isViewCountError ? 'ViewCount Error' : 
                 'Blog Loading Error'}
              </h1>
              
              <p className="text-gray-300 mb-6 text-center leading-relaxed">
                {isHookError ? 
                  'There was a React Hook usage error. This usually happens when hooks are called outside of React components.' :
                  isViewCountError ?
                  'The view counting system encountered an error.' :
                  'There was an error loading this blog post.'}
              </p>
              
              {this.state.error && (
                <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-400 font-medium mb-2">Technical Details:</p>
                  <p className="text-xs text-red-300 font-mono break-all leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/blog'}
                  className="flex-1 border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main BlogPost Component with proper hook usage
const BlogPost: React.FC = () => {
  const { language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const isZhHK = language === 'zh-HK';
  
  // Proper hook call at component top level - no conditional usage
  const { getViewCount } = useSafeViewCount();

  // Memoized post data
  const post = useMemo(() => {
    try {
      const allPosts = getSortedPostsNewest();
      if (!Array.isArray(allPosts) || allPosts.length === 0) {
        console.error('No posts available');
        return null;
      }
      
      const postId = parseInt(id || '1');
      if (isNaN(postId)) {
        console.error('Invalid post ID:', id);
        return allPosts[0] || null;
      }
      
      return allPosts.find(p => p.id === postId) || allPosts[0] || null;
    } catch (error) {
      console.error('Error finding post:', error);
      return null;
    }
  }, [id]);

  // Memoized content data
  const content = useMemo(() => {
    if (!post) return null;
    try {
      if (!Array.isArray(articleContents)) {
        console.error('articleContents is not an array');
        return null;
      }
      return articleContents.find(a => a && a.id === post.id) || null;
    } catch (error) {
      console.error('Error finding content:', error);
      return null;
    }
  }, [post]);

  // Scroll to top effect
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-md mx-auto"
          >
            <h1 className="text-2xl font-bold text-red-400 mb-4">Blog Not Found</h1>
            <p className="text-gray-300 mb-6">The requested blog post could not be found.</p>
            <Link to="/blog">
              <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-md mx-auto"
          >
            <h1 className="text-2xl font-bold text-yellow-400 mb-4">Content Loading</h1>
            <p className="text-gray-300 mb-6">Blog content is loading or not yet published. Please try again later.</p>
            <Link to="/blog">
              <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <BlogErrorBoundary>
      <BlogPostPage post={post} isZhHK={isZhHK} content={content} />
    </BlogErrorBoundary>
  );
};

export default BlogPost; 
