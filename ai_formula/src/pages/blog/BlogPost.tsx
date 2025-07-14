import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Eye, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet-async';

import { useLanguage } from '@/contexts/LanguageContext';
import { useViewCount } from '@/contexts/ViewCountContext';
import { getSortedPostsNewest } from '@/data/blog/blogPosts';
import { BlogPost as BlogPostType } from '@/data/blog/blogPosts';

interface ArticleViewCounterProps {
  initialViews: string;
  postId: number;
}

interface BlogPostPageProps {
  post: BlogPostType;
  isZhHK: boolean;
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
  const { getViewCount, incrementView } = useViewCount();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentViews = getViewCount(postId);
  const displayViews = currentViews > 0 ? currentViews.toString() : initialViews;
  
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

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, isZhHK }) => {
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return isZhHK 
      ? date.toLocaleDateString('zh-HK', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
  };

  const title = isZhHK ? post.title : post.titleEn;
  const excerpt = isZhHK ? post.excerpt : post.excerptEn;
  const content = isZhHK ? post.content : post.contentEn;

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
        <meta property="article:published_time" content={post.publishedAt} />
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
                  src={post.imageUrl}
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
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} {isZhHK ? '分鐘閱讀' : 'min read'}</span>
                  </div>
                  <ArticleViewCounter initialViews={post.views} postId={post.id} />
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
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
                              src={relatedPost.imageUrl}
                              alt={isZhHK ? relatedPost.title : relatedPost.titleEn}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {isZhHK ? relatedPost.title : relatedPost.titleEn}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {formatDate(relatedPost.publishedAt)}
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

const BlogPost: React.FC = () => {
  const { language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const isZhHK = language === 'zh-HK';

  const post = useMemo(() => {
    const allPosts = getSortedPostsNewest();
    const postId = parseInt(id || '1');
    return allPosts.find(p => p.id === postId) || allPosts[0];
  }, [id]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return <BlogPostPage post={post} isZhHK={isZhHK} />;
};

export default BlogPost; 
