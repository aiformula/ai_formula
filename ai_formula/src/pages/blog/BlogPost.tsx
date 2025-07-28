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
import { useViewCount } from '@/contexts/ViewCountContext';
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
  content?: any; // ArticleContent 型別
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
  const { getViewCount, incrementView } = useViewCount(); // 現在有fallback，不會報錯
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentViews = getViewCount(postId);
  const baseViews = parseInt(initialViews) || 0;
  const displayViews = (baseViews + currentViews).toString();
  
  useEffect(() => {
    incrementView(postId);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
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

// BlogPostPage: 修正內容渲染，支援多 section
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
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareData.url);
      alert(isZhHK ? '連結已複製到剪貼板' : 'Link copied to clipboard');
    }
  }, [shareData, isZhHK]);

  const handleBookmark = useCallback(() => {
    // Future Enhancement: Implement bookmark functionality with user accounts
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

  // 渲染多 section 內容
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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
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
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-8 space-y-6"
            >
              {/* Author Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">
                    {isZhHK ? '關於作者' : 'About Author'}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isZhHK ? 'AI 專家' : 'AI Expert'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isZhHK 
                      ? '專注於人工智能技術研究與實用應用，致力於分享前沿的AI知識與見解。'
                      : 'Focused on AI research and practical applications, dedicated to sharing cutting-edge AI knowledge and insights.'
                    }
                  </p>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">
                    {isZhHK ? '相關文章' : 'Related Posts'}
                  </h3>
                  <div className="space-y-3">
                    {getSortedPostsNewest()
                      .filter(p => p.id !== post.id && p.category === post.category)
                      .slice(0, 3)
                      .map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.id}`}
                          className="block group"
                        >
                          <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <img
                              src={relatedPost.image}
                              alt={isZhHK ? relatedPost.title : relatedPost.titleEn}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {isZhHK ? relatedPost.title : relatedPost.titleEn}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {formatDate(relatedPost.publishDate)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 專門為Blog頁面的ErrorBoundary
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
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <div className="max-w-xl mx-auto py-24 text-center">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-2">
                Blog Loading Error
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                There was an error loading this blog post. This might be due to:
              </p>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-1">
                <li>• Missing ViewCountContext</li>
                <li>• Invalid blog post data</li>
                <li>• Content parsing errors</li>
                <li>• localStorage access issues</li>
              </ul>
              {this.state.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-800 dark:text-red-400 font-medium">Technical Details:</p>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1 font-mono">
                    {this.state.error.message}
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

  // 取得對應內容
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

  // Scroll to top when post changes
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

  // 傳遞 content 給 BlogPostPage（如需渲染內容）
  return (
    <BlogErrorBoundary>
      <BlogPostPage post={post} isZhHK={isZhHK} content={content} />
    </BlogErrorBoundary>
  );
};

export default BlogPost; 
