import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Eye, Calendar, Clock, User, Tag, AlertTriangle, RefreshCw } from 'lucide-react';
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

// Components
const ArticleViewCounter: React.FC<ArticleViewCounterProps> = ({ initialViews, postId }) => {
  const { language } = useLanguage();
  const { getViewCount, incrementView } = useSafeViewCount();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentViews = getViewCount(postId);
  const baseViews = parseInt(initialViews) || 0;
  const displayViews = (baseViews + currentViews).toString();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      incrementView(postId);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [postId, incrementView]);

  return (
    <motion.div 
      className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
      animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Eye className="h-4 w-4" />
      <span className="font-medium">{displayViews}</span>
      <span className="text-sm opacity-75">
        {language === 'zh-HK' ? '次瀏覽' : 'views'}
      </span>
    </motion.div>
  );
};

// Simple BlogPost Page Component
const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, isZhHK, content }) => {
  const navigate = useNavigate();
  const [shareData, setShareData] = useState<ShareData | null>(null);

  useEffect(() => {
    setShareData(generateShareData(post, isZhHK));
  }, [post, isZhHK]);

  const handleShare = useCallback(async () => {
    if (!shareData) return;

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert(isZhHK ? '連結已複製到剪貼板' : 'Link copied to clipboard');
    }
  }, [shareData, isZhHK]);

  const handleBookmark = useCallback(() => {
    console.log('Bookmark functionality will be implemented with user accounts');
  }, []);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return isZhHK ? '未知日期' : 'Unknown Date';
    const d = typeof date === 'string' ? new Date(date) : date;
    return isZhHK 
      ? d.toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric' })
      : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const title = isZhHK ? post.title : post.titleEn;
  const excerpt = isZhHK ? post.excerpt : post.excerptEn;

  // 渲染內容
  const renderSections = (contentObj) => {
    if (!contentObj || !contentObj.sections || !Array.isArray(contentObj.sections)) {
      return <p className="text-gray-500 italic">Content not available.</p>;
    }
    
    try {
      return contentObj.sections.map((section, idx) => {
        if (!section || typeof section !== 'object') {
          return <p key={idx} className="text-red-500">Invalid section data</p>;
        }
        
        const text = isZhHK ? (section.content || '') : (section.contentEn || section.content || '');
        
        // 保證 items 一定是陣列
        let safeItems = [];
        try {
          const rawItems = isZhHK ? section.items : (section.itemsEn || section.items);
          safeItems = Array.isArray(rawItems) ? rawItems : [];
        } catch (error) {
          console.error('Error processing section items:', error);
          safeItems = [];
        }
        
        if (section.type === 'heading') {
          const Tag = `h${section.level || 2}`;
          return React.createElement(Tag, { key: idx, className: 'font-bold mt-8 mb-4 text-2xl' }, text);
        }
        if (section.type === 'paragraph') {
          return <p key={idx} className="mb-4 text-lg leading-relaxed">{text}</p>;
        }
        if (section.type === 'card') {
          return (
            <div key={idx} className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 rounded-lg p-4 mb-4">
              <div className="font-semibold mb-2">{text}</div>
              <ul className="list-disc pl-6">
                {safeItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          );
        }
        if (section.type === 'highlight') {
          return (
            <div key={idx} className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-400 rounded-lg p-4 mb-4">
              <div className="font-semibold mb-2">{text}</div>
              <ul className="list-disc pl-6">
                {safeItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          );
        }
        if (section.type === 'steps' || section.type === 'list') {
          return (
            <ol key={idx} className="list-decimal pl-6 mb-4">
              {safeItems.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
          );
        }
        if (section.type === 'conclusion') {
          return (
            <div key={idx} className="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-400 rounded-lg p-4 mb-4">
              <div className="font-semibold mb-2">{text}</div>
              <ul className="list-disc pl-6">
                {safeItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          );
        }
        return <p key={idx}>{text}</p>;
      });
    } catch (error) {
      console.error('Error rendering sections:', error);
      return <p className="text-red-500">Error loading content. Please try again later.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
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

      <div className="container mx-auto px-4 py-8">
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
              className="mb-4 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isZhHK ? '返回部落格' : 'Back to Blog'}
            </Button>
          </Link>
        </motion.div>

        {/* 簡化的單欄佈局 */}
        <div className="max-w-4xl mx-auto">
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Hero Image */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
              <img
                src={post.image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge variant="secondary" className="mb-3">
                  {isZhHK ? post.category : post.categoryEn}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {title}
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-2xl">
                  {excerpt}
                </p>
              </div>
            </div>

            {/* Article Meta */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} {isZhHK ? '分鐘閱讀' : 'min read'}</span>
                </div>
                <ArticleViewCounter initialViews={post.views} postId={post.id} />
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {renderSections(content)}
              </div>
            </div>

            {/* Article Actions */}
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <Separator className="mb-6" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    {isZhHK ? '分享' : 'Share'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    className="flex items-center gap-2"
                  >
                    <Bookmark className="h-4 w-4" />
                    {isZhHK ? '收藏' : 'Bookmark'}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isZhHK ? post.category : post.categoryEn}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
};

// Error Boundary for Blog
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
      const isContextError = errorMessage.includes('undefined') || errorMessage.includes('null');
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <div className="max-w-xl mx-auto py-24 text-center">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-2">
                {isViewCountError ? 'ViewCount Context Error' : 
                 isContextError ? 'Missing Context Provider' : 
                 'Blog Loading Error'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {isViewCountError ? 
                  'The view counting system encountered an error.' :
                  isContextError ?
                  'A required context provider is missing.' :
                  'There was an error loading this blog post.'}
              </p>
              {this.state.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-800 dark:text-red-400 font-medium">Technical Details:</p>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1 font-mono break-all">
                    {errorMessage}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/blog'}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const BlogPost: React.FC = () => {
  const { language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const isZhHK = language === 'zh-HK';
  
  // 正確的hook調用位置 - 在組件頂層
  const { getViewCount } = useSafeViewCount();

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="max-w-xl mx-auto py-24 text-center text-red-500 text-xl font-bold">
          Blog post not found.
        </div>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="max-w-xl mx-auto py-24 text-center text-yellow-500 text-lg font-semibold">
          Blog content is loading or not yet published. Please try again later.
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
