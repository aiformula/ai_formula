import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Eye, Share2, Bookmark } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewCount } from "@/contexts/ViewCountContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { blogPosts, getSortedPostsNewest, type BlogPost } from "@/data/blog/blogPosts";
import { getArticleContent } from "@/data/blog/articleContent";
import ArticleContentRenderer from "@/components/ArticleContentRenderer";

// Types
interface ArticleViewCounterProps {
  initialViews: string;
  postId: number;
}

interface BlogPostPageProps {
  post: BlogPost;
  isZhTW: boolean;
}

interface ShareData {
  title: string;
  text: string;
  url: string;
}

// Animation configurations
const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const
};

// Utility functions
const generateShareData = (post: BlogPost, isZhTW: boolean): ShareData => ({
  title: isZhTW ? post.title : post.titleEn,
  text: isZhTW ? post.excerpt : post.excerptEn,
  url: window.location.href
});

// Components
const ArticleViewCounter: React.FC<ArticleViewCounterProps> = ({ initialViews, postId }) => {
  const { language } = useLanguage();
  const { getViewCount, incrementView } = useViewCount();
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInitialIncrement, setHasInitialIncrement] = useState(false);

  const currentViews = getViewCount(postId, initialViews);

  const handleViewIncrement = useCallback(() => {
    if (!hasInitialIncrement) {
      incrementView(postId);
      setIsAnimating(true);
      setHasInitialIncrement(true);
      
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasInitialIncrement, incrementView, postId]);

  // Only increment view once when component mounts
  useEffect(() => {
    handleViewIncrement();
  }, [handleViewIncrement]);

  return (
    <div className={`flex items-center gap-1 text-gray-300 transition-all duration-500 ${
      isAnimating ? 'text-blue-300 scale-110' : ''
    }`}>
      <Eye className={`h-4 w-4 transition-all duration-500 ${
        isAnimating ? 'text-blue-400' : ''
      }`} />
      <span className={`transition-all duration-500 ${
        isAnimating ? 'text-blue-300 font-semibold' : ''
      }`}>
        {currentViews} {language === 'zh-HK' ? '次瀏覽' : 'views'}
      </span>
    </div>
  );
};

const ArticleHeader: React.FC<{ post: BlogPost; isZhTW: boolean }> = ({ post, isZhTW }) => {
  const shareData = useMemo(() => generateShareData(post, isZhTW), [post, isZhTW]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareData.url);
      alert(isZhTW ? '連結已複製到剪貼簿' : 'Link copied to clipboard');
    }
  }, [shareData, isZhTW]);

  const handleBookmark = useCallback(() => {
    // Future Enhancement: Implement bookmark functionality with user accounts
    // This will allow users to save and organize their favorite articles
  }, [post.id]);

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...ANIMATION_CONFIG.slideInLeft}
          className="mb-8"
        >
          <Link to="/blog">
            <Button 
              variant="outline" 
              className="bg-white text-black border-white hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isZhTW ? '返回部落格' : 'Back to Blog'}
            </Button>
          </Link>
        </motion.div>

        <motion.article
          {...ANIMATION_CONFIG.fadeIn}
          className="mb-8"
        >
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-400">
                {isZhTW ? post.category : post.categoryEn}
              </Badge>
              <ArticleViewCounter initialViews={post.views} postId={post.id} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
              {isZhTW ? post.title : post.titleEn}
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {isZhTW ? post.excerpt : post.excerptEn}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-700">
              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="text-gray-200 font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{isZhTW ? post.date : post.dateEn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{isZhTW ? post.readTime : post.readTimeEn}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className="bg-white text-black border-white hover:bg-gray-100 hover:text-black font-medium"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  {isZhTW ? '分享' : 'Share'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBookmark}
                  className="bg-white text-black border-white hover:bg-gray-100 hover:text-black font-medium"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  {isZhTW ? '收藏' : 'Bookmark'}
                </Button>
              </div>
            </div>
          </header>
        </motion.article>
      </div>
    </section>
  );
};

const ArticleContent: React.FC<{ post: BlogPost; isZhTW: boolean }> = ({ post, isZhTW }) => {
  const articleContent = useMemo(() => getArticleContent(post.id), [post.id]);

  return (
    <section className="pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          {articleContent ? (
            <ArticleContentRenderer sections={articleContent.sections} isZhTW={isZhTW} />
          ) : (
            <div className="text-gray-200 leading-relaxed space-y-8">
              {/* Fallback content for articles without detailed content */}
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {isZhTW ? '文章內容' : 'Article Content'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isZhTW ? post.excerpt : post.excerptEn}
                </p>
                <p className="text-gray-300 mb-4">
                  {isZhTW ? 
                    '這篇文章的詳細內容正在準備中。請關注我們的更新獲取更多精彩內容。' :
                    'The detailed content for this article is being prepared. Please follow our updates for more exciting content.'
                  }
                </p>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg">
                <p className="text-gray-300">
                  {isZhTW ? 
                    <>想了解更多關於AI和科技發展的最新資訊？關注我們的 Instagram <strong className="text-blue-300">@ai_formula_</strong> 獲取更多深度分析和見解。</> :
                    <>Want to learn more about the latest information on AI and technology development? Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more in-depth analysis and insights.</>
                  }
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const RelatedArticles: React.FC<{ currentPost: BlogPost; isZhTW: boolean }> = ({ currentPost, isZhTW }) => {
  const relatedPosts = useMemo(() => {
    const allPosts = getSortedPostsNewest();
    return allPosts.filter(p => p.id !== currentPost.id).slice(0, 2);
  }, [currentPost.id]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          {isZhTW ? '相關文章' : 'Related Articles'}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {relatedPosts.map((relatedPost) => (
            <motion.div
              key={relatedPost.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 hover:border-blue-400 transition-all duration-300">
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-purple-500/20 text-purple-200 border-purple-400">
                    {isZhTW ? relatedPost.category : relatedPost.categoryEn}
                  </Badge>
                  <h4 className="text-lg font-semibold text-white mb-3 leading-tight">
                    {isZhTW ? relatedPost.title : relatedPost.titleEn}
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    {((isZhTW ? relatedPost.excerpt : relatedPost.excerptEn) || '').substring(0, 100)}...
                  </p>
                  <Link to={`/blog/${relatedPost.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white text-black border-white hover:bg-gray-100 hover:text-black font-medium"
                    >
                      {isZhTW ? '閱讀更多' : 'Read More'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogPost: React.FC = () => {
  const { language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const isZhTW = language === 'zh-HK';

  const post = useMemo(() => {
    const allPosts = getSortedPostsNewest();
    const postId = parseInt(id || '1');
    return allPosts.find(p => p.id === postId) || allPosts[0];
  }, [id]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Update document title
  useEffect(() => {
    const title = isZhTW ? post.title : post.titleEn;
    document.title = `${title} - AI Formula`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', isZhTW ? post.excerpt : post.excerptEn);
    }
  }, [post, isZhTW]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Navigation />
      <ArticleHeader post={post} isZhTW={isZhTW} />
      <ArticleContent post={post} isZhTW={isZhTW} />
      <RelatedArticles currentPost={post} isZhTW={isZhTW} />
      <Footer />
    </div>
  );
};

export default BlogPost; 