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

// Enhanced Course Recommendation Component
const CourseRecommendation: React.FC<{ isZhHK: boolean }> = ({ isZhHK }) => {
  const navigate = useNavigate();
  
  // Get random course from digitalProducts
  const randomCourse = useMemo(() => {
    if (!digitalProducts || digitalProducts.length === 0) return null;
    const availableCourses = digitalProducts.filter(product => product && product.id);
    if (availableCourses.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableCourses.length);
    return availableCourses[randomIndex];
  }, []);

  if (!randomCourse) return null;

  const courseTitle = isZhHK ? randomCourse.titleCht : randomCourse.title;
  const courseDescription = isZhHK ? randomCourse.descriptionCht : randomCourse.description;
  const isFree = randomCourse.price === '0' || randomCourse.price === 'Free' || randomCourse.price === '免費';
  const courseDuration = `${randomCourse.duration} ${isZhHK ? '小時' : 'hours'}`;
  const courseLevel = isZhHK ? randomCourse.levelCht : randomCourse.level;
  const courseRating = randomCourse.rating || 4.8;
  const coursePrice = isFree 
    ? (isZhHK ? '免費' : 'Free')
    : `${randomCourse.price}`;

  // Generate course tags
  const getCourseTagsContent = () => {
    const tagConfigs = [];
    if (randomCourse.newProduct) {
      tagConfigs.push({
        text: isZhHK ? '新品' : 'New',
        color: '#F6B73C',
        glowColor: 'rgba(246, 183, 60, 0.4)'
      });
    }
    if (randomCourse.bestseller) {
      tagConfigs.push({
        text: isZhHK ? '暢銷' : 'Best Seller',
        color: '#FF9800',
        glowColor: 'rgba(255, 152, 0, 0.4)'
      });
    }
    if (randomCourse.featured) {
      tagConfigs.push({
        text: isZhHK ? '精選' : 'Featured',
        color: '#FFC857',
        glowColor: 'rgba(255, 200, 87, 0.4)'
      });
    }
    if (randomCourse.hotSelling) {
      tagConfigs.push({
        text: isZhHK ? '熱銷' : 'Hot',
        color: '#E6A700',
        glowColor: 'rgba(230, 167, 0, 0.4)'
      });
    }
    return tagConfigs;
  };

  const courseTags = getCourseTagsContent();

  const handleCourseClick = () => {
    if (randomCourse.category === 'chatgpt-complete-course') {
      navigate('/courses/chatgpt-complete-course/outline');
    } else {
      navigate('/courses');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          {isZhHK ? 'AI 課程推薦' : 'AI Course Recommendation'}
        </h3>
        
        <motion.div
          className="relative overflow-hidden rounded-xl border cursor-pointer animate-float"
          style={{
            background: 'linear-gradient(135deg, #1C1C1C 0%, #0D0D0D 100%)',
            borderColor: 'rgba(246, 183, 60, 0.2)'
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 8px 20px rgba(246, 183, 60, 0.15)'
          }}
          onClick={handleCourseClick}
        >
          {/* Particle Background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(246, 183, 60, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 40% 80%, rgba(255, 200, 87, 0.1) 0%, transparent 50%)`,
            }}
          />
          
          <div className="relative p-6">
            {/* Course Tags */}
            {courseTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {courseTags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{
                      backgroundColor: tag.color,
                      borderColor: tag.color,
                      boxShadow: `0 0 10px ${tag.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag.text}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Course Title */}
            <h4 
              className="font-bold text-white mb-4 text-lg leading-tight text-center"
              style={{
                background: 'linear-gradient(135deg, #F6B73C 0%, #FF9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {courseTitle}
            </h4>

            {/* Course Details */}
            <div className="space-y-3 mb-6 text-center">
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Clock 
                  className="h-4 w-4" 
                  style={{ 
                    color: '#F6B73C',
                    filter: 'drop-shadow(0 0 4px rgba(246, 183, 60, 0.6))'
                  }} 
                />
                <span className="text-gray-300 text-sm">{courseDuration}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <User 
                  className="h-4 w-4" 
                  style={{ 
                    color: '#FF9800',
                    filter: 'drop-shadow(0 0 4px rgba(255, 152, 0, 0.6))'
                  }} 
                />
                <span className="text-gray-300 text-sm">{courseLevel}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Star 
                  className="h-4 w-4" 
                  style={{ 
                    color: '#E6A700',
                    filter: 'drop-shadow(0 0 4px rgba(230, 167, 0, 0.6))'
                  }} 
                />
                <span className="text-gray-300 text-sm">{courseRating}/5</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                {isFree ? (
                  <BookOpen 
                    className="h-4 w-4" 
                    style={{ 
                      color: '#FFD95C',
                      filter: 'drop-shadow(0 0 4px rgba(255, 217, 92, 0.8))'
                    }} 
                  />
                ) : (
                  <span 
                    className="text-sm font-bold"
                    style={{ 
                      color: '#FFD95C',
                      textShadow: '0 0 8px rgba(255, 217, 92, 0.8)',
                      filter: 'drop-shadow(0 0 4px rgba(255, 217, 92, 0.6))'
                    }}
                  >
                    $
                  </span>
                )}
                <span 
                  className={`text-sm font-bold ${isFree ? 'text-white' : 'text-white'}`}
                  style={{
                    color: isFree ? '#FFD95C' : '#FFD95C',
                    textShadow: isFree ? '0 0 8px rgba(255, 217, 92, 0.8)' : '0 0 8px rgba(255, 217, 92, 0.8)',
                    filter: 'drop-shadow(0 0 4px rgba(255, 217, 92, 0.6))'
                  }}
                >
                  {coursePrice}
                </span>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              className="w-full py-3 rounded-lg text-black font-semibold text-sm transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #F6B73C 0%, #FF9800 100%)'
              }}
              whileHover={{
                background: 'linear-gradient(135deg, #E6A700 0%, #F57C00 100%)',
                boxShadow: '0 4px 12px rgba(246, 183, 60, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {isZhHK ? '開始課程' : 'Start Course'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Related Articles Component - Show 2 articles
const RelatedArticles: React.FC<{ currentPost: BlogPostType; isZhHK: boolean }> = ({ currentPost, isZhHK }) => {
  const relatedPosts = useMemo(() => {
    try {
      const allPosts = getSortedPostsNewest();
      if (!Array.isArray(allPosts)) return [];
      
      const otherPosts = allPosts.filter(post => post && post.id !== currentPost.id);
      const shuffled = [...otherPosts].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 2); // Show 2 articles
    } catch (error) {
      console.error('Error getting related posts:', error);
      return [];
    }
  }, [currentPost.id]);

  if (relatedPosts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          {isZhHK ? '其他文章' : 'Other Articles'}
        </h3>
        
        <div className="space-y-4">
          {relatedPosts.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-yellow-400/20 p-4 hover:border-yellow-400/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="mb-2 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 text-xs"
                >
                  {isZhHK ? post.category : post.categoryEn}
                </Badge>
                
                <h4 className="font-semibold text-white mb-2 text-sm leading-tight hover:text-yellow-400 transition-colors">
                  {isZhHK ? post.title : post.titleEn}
                </h4>
                
                <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                  {isZhHK ? post.excerpt : post.excerptEn}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{isZhHK ? post.readTime : post.readTimeEn}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-yellow-400" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4">
          <Link to="/blog">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/10 hover:border-yellow-400/50"
            >
              {isZhHK ? '查看所有文章' : 'View All Articles'}
              <ChevronRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// New Enhanced Sidebar Component
const EnhancedSidebar: React.FC<{ currentPost: BlogPostType; isZhHK: boolean }> = ({ currentPost, isZhHK }) => {
  return (
    <div className="sticky top-8 space-y-8">
      <CourseRecommendation isZhHK={isZhHK} />
      <RelatedArticles currentPost={currentPost} isZhHK={isZhHK} />
    </div>
  );
};

// Enhanced BlogPost Page Component
const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, isZhHK, content }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { incrementView } = useSafeViewCount();
  
  // Increment view count on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      incrementView(post.id);
    }, 2000);
    return () => clearTimeout(timer);
  }, [post.id, incrementView]);

  const title = isZhHK ? post.title : post.titleEn;
  const excerpt = isZhHK ? post.excerpt : post.excerptEn;

  // Share functionality
  const shareData: ShareData = {
    title: title,
    text: excerpt,
    url: window.location.href
  };

  // Format date helper
  const formatDate = (date: Date): string => {
    if (!date || !(date instanceof Date)) return '';
    if (isZhHK) {
      return date.toLocaleDateString('zh-HK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      });
    }
  };

  // Render content sections with enhanced animations
  const renderSections = (sections: any[]) => {
    if (!Array.isArray(sections)) {
      console.warn('Sections is not an array:', sections);
      return null;
    }

    return sections.map((section, idx) => {
      if (!section) return null;
      
      const sectionAnimation = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.1 * idx }
      };

      const text = section.content || '';
      const safeItems = Array.isArray(section.items) ? section.items : [];
      
      if (section.type === 'heading') {
        const HeadingTag = section.level === 1 ? 'h1' : 
                          section.level === 2 ? 'h2' :
                          section.level === 3 ? 'h3' : 'h4';
        
        return (
          <motion.div key={idx} {...sectionAnimation}>
            {React.createElement(HeadingTag, {
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
          <motion.div key={idx} {...sectionAnimation} className="bg-gradient-to-r from-green-400/10 to-blue-600/5 border-l-4 border-green-400 rounded-lg p-6 mb-8 shadow-lg">
            <div className="font-bold mb-4 text-green-400 text-xl">{isZhHK ? '總結' : 'Conclusion'}</div>
            <div className="text-gray-200 leading-relaxed text-lg">{text}</div>
          </motion.div>
        );
      }
      
      return (
        <motion.div key={idx} {...sectionAnimation} className="mb-6 text-lg leading-relaxed text-gray-200">
          {text}
        </motion.div>
      );
    });
  };

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
      <div className="relative page-content">
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

            {/* Title Section - Moved directly after back button */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-4xl mx-auto mb-12 text-center"
            >
              <Badge 
                variant="secondary" 
                className="mb-6 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 backdrop-blur-sm"
              >
                {isZhHK ? post.category : post.categoryEn}
              </Badge>
              
              {/* Large Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {title}
              </h1>
              
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
                {excerpt}
              </p>
              
              {/* Author Info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm"
              >
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
                  <span>{isZhHK ? post.readTime : post.readTimeEn}</span>
                </div>
                <ArticleViewCounter initialViews={post.views} postId={post.id} />
              </motion.div>
            </motion.div>

            {/* Content Layout: Article + Sidebar */}
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Article Content */}
                <div className="lg:col-span-8">
                  <motion.article 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-900/30 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-400/20 overflow-hidden"
                  >
                    {/* Article Content */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="p-8 md:p-12 lg:p-16"
                    >
                      {content && content.sections ? renderSections(content.sections) : (
                        <div className="text-center py-12">
                          <p className="text-gray-400 text-lg">
                            {isZhHK ? '內容正在載入中...' : 'Content is loading...'}
                          </p>
                        </div>
                      )}
                    </motion.div>

                    {/* Article Actions */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="px-8 py-6 md:px-12 lg:px-16 border-t border-yellow-400/20 bg-black/20"
                    >
                      <Separator className="mb-6 bg-yellow-400/20" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsLiked(!isLiked)}
                            className={`transition-all duration-300 ${
                              isLiked 
                                ? 'text-red-400 hover:text-red-300' 
                                : 'text-gray-400 hover:text-red-400'
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

                {/* Enhanced Right Sidebar */}
                <div className="lg:col-span-4">
                  <EnhancedSidebar currentPost={post} isZhHK={isZhHK} />
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
