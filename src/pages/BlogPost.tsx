import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Eye, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useViewCount } from '@/contexts/ViewCountContext';
import { getSortedPostsNewest } from '@/data/blogPosts';

interface ArticleViewCounterProps {
  initialViews: string;
  postId: number;
}

// Article View Counter Component
const ArticleViewCounter: React.FC<ArticleViewCounterProps> = ({ initialViews, postId }) => {
  const { getViewCount, incrementView } = useViewCount();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentViews = getViewCount(postId);
  const displayViews = currentViews > 0 ? currentViews.toString() : initialViews;
  
  useEffect(() => {
    incrementView(postId);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [incrementView, postId]);

  return (
    <motion.div 
      className="flex items-center text-gray-400"
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Eye className="h-4 w-4 mr-1" />
      <span className="text-sm font-medium">{displayViews}</span>
    </motion.div>
  );
};

// Share Button Component
const ShareButton: React.FC<{ post: any; isZhHK: boolean }> = ({ post, isZhHK }) => {
  const handleShare = useCallback(async () => {
    const shareData = {
      title: isZhHK ? post.title : post.titleEn,
      text: isZhHK ? post.excerpt : post.excerptEn,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert(isZhHK ? '連結已複製到剪貼板' : 'Link copied to clipboard');
    }
  }, [post, isZhHK]);

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleShare}
      className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
    >
      <Share2 className="h-4 w-4 mr-2" />
      {isZhHK ? '分享' : 'Share'}
    </Button>
  );
};

// Main BlogPost Component
const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  const posts = getSortedPostsNewest();
  const post = useMemo(() => 
    posts.find(p => p.id.toString() === id), 
    [posts, id]
  );

  const relatedPosts = useMemo(() => 
    posts
      .filter(p => p.id.toString() !== id && p.category === post?.category)
      .slice(0, 3),
    [posts, id, post?.category]
  );

  if (!post) {
    return (
      <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
        <Navigation />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {isZhHK ? '找不到文章' : 'Article Not Found'}
            </h1>
            <Button onClick={() => navigate('/blog')}>
              {isZhHK ? '返回部落格' : 'Back to Blog'}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      {/* Article Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/blog">
              <Button variant="outline" className="mb-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isZhHK ? '返回部落格' : 'Back to Blog'}
              </Button>
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-600/30">
                {isZhHK ? post.category : post.categoryEn}
              </Badge>
              {(isZhHK ? post.tags : post.tagsEn).map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-white/10 border-white/20 text-white">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {isZhHK ? post.title : post.titleEn}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {isZhHK ? post.excerpt : post.excerptEn}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{isZhHK ? post.date : post.dateEn}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{isZhHK ? post.readTime : post.readTimeEn}</span>
              </div>
              <ArticleViewCounter postId={post.id} initialViews={post.views} />
              <ShareButton post={post} isZhHK={isZhHK} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Image */}
      {post.image && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <img
                src={post.image}
                alt={isZhHK ? post.title : post.titleEn}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto prose prose-lg prose-invert max-w-none"
          >
            <div className="text-gray-200 leading-relaxed space-y-8">
              {/* Sample Article Content */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {isZhHK ? 'Make.com 係乜嘢？香港企業點樣用佢去實現自動化' : 'What is Make.com? How Hong Kong Businesses Can Use It for Automation'}
                </h2>
                
                <p className="text-gray-300 leading-relaxed">
                  {isZhHK 
                    ? '喺數位化時代，自動化已經成為企業提升效率嘅關鍵工具。Make.com（前身係 Integromat）係一個強大嘅視覺化自動化平台，可以幫企業創建無代碼嘅工作流程，實現無縫嘅工作流程自動化。今日就深入了解下呢個平台，同埋佢點樣幫到香港嘅中小企業。'
                    : 'In the digital age, automation has become a key tool for businesses to improve efficiency. Make.com (formerly Integromat) is a powerful visual automation platform that helps businesses create no-code workflows and achieve seamless workflow automation. Today, let\'s dive deep into this platform and how it can help Hong Kong SMEs.'
                  }
                </p>

                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  {isZhHK ? 'Make.com 係乜嘢？' : 'What is Make.com?'}
                </h3>
                
                <p className="text-gray-300">
                  {isZhHK 
                    ? 'Make.com 係一個基於雲端嘅整合平台即服務（iPaaS），佢嘅核心概念係透過視覺化嘅方式，連接各種網絡應用程式同服務。用戶可以創建「情境」（Scenarios），呢啲情境就相當於自動化工作流程，可以喺特定條件觸發時自動執行一系列操作。'
                    : 'Make.com is a cloud-based integration platform as a service (iPaaS). Its core concept is to connect various web applications and services through visual methods. Users can create "Scenarios" which are equivalent to automated workflows that can automatically execute a series of operations when specific conditions are triggered.'
                  }
                </p>

                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  {isZhHK ? '主要特點同優勢' : 'Key Features and Advantages'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">
                        {isZhHK ? '🎯 無代碼設計' : '🎯 No-code Design'}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {isZhHK 
                          ? '用戶毋須編程知識就可以創建複雜嘅自動化流程。'
                          : 'Users can create complex automation processes without programming knowledge.'
                        }
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">
                        {isZhHK ? '🔗 豐富嘅整合選擇' : '🔗 Rich Integration Options'}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {isZhHK 
                          ? '支援超過1000種應用程式同服務，包括Google Workspace、Microsoft 365、Salesforce等。'
                          : 'Supports over 1000 applications and services, including Google Workspace, Microsoft 365, Salesforce, etc.'
                        }
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-purple-400 mb-2">
                        {isZhHK ? '⚡ 實時處理' : '⚡ Real-time Processing'}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {isZhHK 
                          ? '支援實時觸發同執行，確保數據同步同工作流程嘅即時性。'
                          : 'Supports real-time triggering and execution, ensuring data synchronization and workflow immediacy.'
                        }
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-orange-400 mb-2">
                        {isZhHK ? '📊 詳細監控' : '📊 Detailed Monitoring'}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {isZhHK 
                          ? '提供詳細嘅執行日誌同錯誤報告，方便監控同調試自動化流程。'
                          : 'Provides detailed execution logs and error reports for easy monitoring and debugging of automation processes.'
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                  {isZhHK ? '香港企業嘅實際應用場景' : 'Practical Use Cases for Hong Kong Businesses'}
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-400 mb-2">
                      {isZhHK ? '💼 客戶關係管理自動化' : '💼 CRM Automation'}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {isZhHK 
                        ? '自動將網站查詢表單嘅潛在客戶資料同步到CRM系統，同時發送歡迎電郵同安排跟進任務。'
                        : 'Automatically sync potential customer data from website inquiry forms to CRM systems, while sending welcome emails and scheduling follow-up tasks.'
                      }
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {isZhHK ? '應用：網站表單 → Google Sheets → HubSpot → Gmail' : 'Application: Website Form → Google Sheets → HubSpot → Gmail'}
                    </p>
                  </div>

                  <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-400 mb-2">
                      {isZhHK ? '📱 社交媒體管理' : '📱 Social Media Management'}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {isZhHK 
                        ? '自動將部落格文章同新產品資訊發布到多個社交媒體平台，並根據平台特性調整內容格式。'
                        : 'Automatically publish blog articles and new product information to multiple social media platforms, adjusting content format based on platform characteristics.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">
                {isZhHK ? '相關文章' : 'Related Articles'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${relatedPost.id}`}>
                      <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 h-full group">
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={isZhHK ? relatedPost.title : relatedPost.titleEn}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                            {isZhHK ? relatedPost.title : relatedPost.titleEn}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                            {isZhHK ? relatedPost.excerpt : relatedPost.excerptEn}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{isZhHK ? relatedPost.date : relatedPost.dateEn}</span>
                            <span>{isZhHK ? relatedPost.readTime : relatedPost.readTimeEn}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost; 