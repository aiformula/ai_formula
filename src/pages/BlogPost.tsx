import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Eye, Share2, Bookmark } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useViewCount } from "@/contexts/ViewCountContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { blogPosts, getSortedPostsNewest } from "@/data/blogPosts";

// ?•æ??è¦½è¨ˆæ•¸?¨ç?ä»?- ?¨æ–¼?‡ç?è©³æ??ï?çµ±ä?ä½¿ç”¨ViewCountContext
const ArticleViewCounter = ({ initialViews, postId }: { initialViews: string, postId: number }) => {
  const { language } = useLanguage();
  const { getViewCount, incrementView } = useViewCount();
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [hasIncremented, setHasIncremented] = useState(false);

  // ?²å??¶å??è¦½æ¬¡æ•¸ï¼ˆè?Blog?é¢?Œæ­¥ï¼?
  const currentViews = getViewCount(postId, initialViews);

  // å¢å??è¦½æ¬¡æ•¸?„å‡½??
  const handleIncrementView = useCallback(() => {
    if (!hasIncremented) {
      incrementView(postId);
      setIsIncreasing(true);
      setHasIncremented(true);
      setTimeout(() => setIsIncreasing(false), 1000);
    }
  }, [hasIncremented, incrementView, postId]);

  // ??½?é¢?¯è??§è???
  const handleVisibilityChange = () => {
    setPageVisible(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!pageVisible) return;

    // ç«‹å³å¢å?ä¸€æ¬¡ç€è¦½ï¼ˆé??¢è??¥æ?ï¼?
    if (!hasIncremented) {
      handleIncrementView();
    }

    // è¨ˆæ??¨ï?æ¯ç?å¢å??¨é??¢ç??‚é?
    const timeInterval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    // æ¯?0ç§’å?? ä?æ¬¡ç€è¦½æ¬¡æ•¸ï¼ˆæ¨¡?¬ç”¨?¶ä??•ï?
    const viewInterval = setInterval(() => {
      incrementView(postId);
      setIsIncreasing(true);
      setTimeout(() => setIsIncreasing(false), 1000);
    }, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(viewInterval);
    };
  }, [pageVisible, timeOnPage, postId, hasIncremented, handleIncrementView, incrementView]);

  return (
    <div className={`flex items-center gap-1 text-gray-300 transition-all duration-500 ${isIncreasing ? 'text-blue-300 scale-110' : ''}`}>
      <Eye className={`h-4 w-4 transition-all duration-500 ${isIncreasing ? 'text-blue-400' : ''}`} />
      <span className={`transition-all duration-500 ${isIncreasing ? 'text-blue-300 font-semibold' : ''}`}>
        {currentViews} {language === 'zh-HK' ? 'æ¬¡ç€è¦½' : 'views'}
      </span>
    </div>
  );
};

const BlogPost = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // ?²å??€?‰æ?ç« ä¸¦?¹æ?URL?ƒæ•¸?¾åˆ°å°æ??„æ?ç«?
  const allPosts = getSortedPostsNewest();
  const post = allPosts.find(p => p.id === parseInt(id || '1')) || allPosts[0];

  // ?é¢è¼‰å…¥?‚æ»¾?•åˆ°?‚éƒ¨
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Article Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/blog">
              <Button variant="outline" className="bg-white text-black border-white hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isZhTW ? 'è¿”å??¨è½?? : 'Back to Blog'}
              </Button>
            </Link>
          </motion.div>

          {/* Article Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
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

            {/* Author & Date Info */}
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

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="bg-white text-black border-white hover:bg-gray-100 hover:text-black font-medium">
                  <Share2 className="h-4 w-4 mr-2" />
                  {isZhTW ? '?†äº«' : 'Share'}
                </Button>
                <Button variant="outline" size="sm" className="bg-white text-black border-white hover:bg-gray-100 hover:text-black font-medium">
                  <Bookmark className="h-4 w-4 mr-2" />
                  {isZhTW ? '?¶è?' : 'Bookmark'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            {/* Article Content - ?¹æ??‡ç?IDé¡¯ç¤ºä¸å??§å®¹ */}
            <div className="text-gray-200 leading-relaxed space-y-8">
              {/* ç¬?ç¯‡æ?ç« ï?Make.comä»‹ç´¹ */}
              {post.id === 3 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'Make.comä¿‚ä??¢ï?é¦™æ¸¯ä¼æ¥­é»æ¨£?¨ä½¢?Ÿå¯¦?¾è‡ª?•å?' : 'What is Make.com? How Hong Kong Businesses Can Use It for Automation'}
                  </motion.h2>
                  
                  <p className="text-lg mb-6">
                    {language === 'zh-HK' ? 
                      '?ºæ•¸ä½å??‚ä»£ï¼Œè‡ª?•å?å·²ç??ç‚º?—ä?æ¥­æ??‡æ??‡å??œéµå·¥å…·?‚Make.comï¼ˆå?èº«ä?Integromatï¼‰ä?ä¸€?‹å¼·å¤§å?è¦–è¦º?–è‡ª?•å?å¹³å°ï¼Œå¯ä»¥å¹«?©ä?æ¥­å??”å??…æ??¨ç?å¼å??å???¥?‹ä?é½Šï?å¯¦ç¾?¡ç¸«?…å·¥ä½œæ?ç¨‹è‡ª?•å??‚ä??¥æ??‹å°±?Ÿæ·±?¥ä?è§???¢å€‹å¹³?°ï??Œå?ä½¢é?æ¨?¯ä»¥å¹«?°é?æ¸¯å?ä¸­å?ä¼æ¥­?? :
                      'In the digital age, automation has become a key tool for businesses to improve efficiency. Make.com (formerly Integromat) is a powerful visual automation platform that helps businesses connect different applications and services to achieve seamless workflow automation. Today, let\'s dive deep into this platform and how it can help Hong Kong SMEs.'
                    }
                  </p>

                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-2xl font-bold text-white mb-4 mt-8"
                  >
                    {language === 'zh-HK' ? 'Make.com?…åŸº?¬æ?å¿? : 'Basic Concepts of Make.com'}
                  </motion.h3>

                  <p className="text-lg mb-6">
                    {language === 'zh-HK' ? 
                      'Make.comä¿‚ä??‹åŸº?¼é›²ç«¯å??´å?å¹³å°?³æ??™ï?iPaaSï¼‰ï?ä½¢å??¸å??†å¿µä¿‚é€é?è¦–è¦º?–å??–æ??¹å?ï¼Œå??”å??…ç¶²çµ¡æ??™å??‰ç”¨ç¨‹å???¥?‹ä?é½Šã€‚ç”¨?¶å¯ä»¥å‰µå»??…å?"ï¼ˆScenariosï¼‰ï??¢å•²?…å?å°±ä??ªå??–å?å·¥ä?æµç?ï¼Œå¯ä»¥å–º?¹å?æ¢ä»¶è§¸ç™¼?‚è‡ª?•åŸ·è¡Œä?ç³»å??…å?ä½œã€? :
                      'Make.com is a cloud-based Integration Platform as a Service (iPaaS). Its core concept is to connect different web services and applications through visual drag-and-drop methods. Users can create "Scenarios" - these are automated workflows that can automatically execute a series of actions when triggered by specific conditions.'
                    }
                  </p>

                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-2xl font-bold text-white mb-4 mt-8"
                  >
                    {language === 'zh-HK' ? 'Make.com?…ä¸»è¦ç‰¹é»? : 'Key Features of Make.com'}
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                    >
                      <h4 className="text-xl font-bold text-blue-400 mb-3">
                        {language === 'zh-HK' ? '?¨ è¦–è¦º?–ç·¨è¼¯å™¨' : '?¨ Visual Editor'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?´è??…æ??‰ä??¢ï?æ¯‹é?ç·¨ç??¥è?å°±å¯ä»¥å‰µå»ºè??œå??ªå??–æ?ç¨‹ã€? :
                          'Intuitive drag-and-drop interface that allows creating complex automation flows without programming knowledge.'
                        }
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                    >
                      <h4 className="text-xl font-bold text-green-400 mb-3">
                        {language === 'zh-HK' ? '?? è±å??…æ•´?ˆé¸?? : '?? Rich Integration Options'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?¯æ´è¶…é?1000?‹æ??¨ç?å¼å??å?ï¼Œå??¬Google Workspace?Microsoft 365?Salesforceç­‰ã€? :
                          'Supports over 1000 applications and services, including Google Workspace, Microsoft 365, Salesforce, and more.'
                        }
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                    >
                      <h4 className="text-xl font-bold text-purple-400 mb-3">
                        {language === 'zh-HK' ? '??å¯¦æ??•ç?' : '??Real-time Processing'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?¯æ´å¯¦æ?è§¸ç™¼?Œè??†ï?ç¢ºä??¸æ??Œæ­¥?Œå·¥ä½œæ?ç¨‹å??³æ??§ã€? :
                          'Supports real-time triggers and processing, ensuring data synchronization and workflow immediacy.'
                        }
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                    >
                      <h4 className="text-xl font-bold text-orange-400 mb-3">
                        {language === 'zh-HK' ? '?? è©³ç´°??§' : '?? Detailed Monitoring'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?ä?è©³ç´°?…åŸ·è¡Œæ—¥èªŒå??¯èª¤?±å?ï¼Œæ–¹ä¾¿ç›£?§å?èª¿è©¦?ªå??–æ?ç¨‹ã€? :
                          'Provides detailed execution logs and error reports for easy monitoring and debugging of automation processes.'
                        }
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                    className="text-2xl font-bold text-white mb-4 mt-8"
                  >
                    {language === 'zh-HK' ? 'é¦™æ¸¯ä¼æ¥­?…å¯¦?›æ??¨å ´?? : 'Practical Use Cases for Hong Kong Businesses'}
                  </motion.h3>

                  <div className="space-y-6 mb-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.2 }}
                      className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/20"
                    >
                      <h4 className="text-xl font-bold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '?’¼ å®¢æˆ¶?œä?ç®¡ç??ªå??? : '?’¼ CRM Automation'}
                      </h4>
                      <p className="text-gray-300 mb-3">
                        {language === 'zh-HK' ? 
                          '?ªå?å°‡ç¶²ç«™æŸ¥è©¢è¡¨?®å?æ½›åœ¨å®¢æˆ¶è³‡æ??Œæ­¥?°CRMç³»çµ±ï¼Œå??‚ç™¼?æ­¡è¿é›»?µå?å®‰æ?è·Ÿé€²æ??’ã€? :
                          'Automatically sync lead data from website inquiry forms to CRM systems, while sending welcome emails and scheduling follow-up reminders.'
                        }
                      </p>
                      <p className="text-sm text-blue-200">
                        {language === 'zh-HK' ? '?‰ç”¨ï¼šç¶²ç«™è¡¨????Google Sheets ??HubSpot ??Gmail' : 'Application: Website Form ??Google Sheets ??HubSpot ??Gmail'}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.4 }}
                      className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/20"
                    >
                      <h4 className="text-xl font-bold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?“± ç¤¾äº¤åª’é?ç®¡ç?' : '?“± Social Media Management'}
                      </h4>
                      <p className="text-gray-300 mb-3">
                        {language === 'zh-HK' ? 
                          '?ªå?å°‡éƒ¨?½æ ¼?‡ç??Œæ??¼ä??°å??‹ç¤¾äº¤å?é«”å¹³?°ï?ä¸¦ä??¹æ?å¹³å°?¹æ€§èª¿?´å…§å®¹æ ¼å¼ã€? :
                          'Automatically publish blog posts to multiple social media platforms simultaneously, adjusting content format based on platform characteristics.'
                        }
                      </p>
                      <p className="text-sm text-green-200">
                        {language === 'zh-HK' ? '?‰ç”¨ï¼šWordPress ??Facebook ??Instagram ??LinkedIn' : 'Application: WordPress ??Facebook ??Instagram ??LinkedIn'}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.6 }}
                      className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-lg border border-purple-500/20"
                    >
                      <h4 className="text-xl font-bold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?? ?¸æ??Œæ­¥?Œå ±?? : '?? Data Sync and Reporting'}
                      </h4>
                      <p className="text-gray-300 mb-3">
                        {language === 'zh-HK' ? 
                          '?ªå??¶é??”å?å¹³å°?…éŠ·?®æ•¸?šï??´å??°çµ±ä¸€?…å ±?Šä¸­ï¼Œä¸¦å®šæ??¼é€çµ¦ç®¡ç?å±¤ã€? :
                          'Automatically collect sales data from different platforms, integrate into unified reports, and regularly send to management.'
                        }
                      </p>
                      <p className="text-sm text-purple-200">
                        {language === 'zh-HK' ? '?‰ç”¨ï¼šShopify ??WooCommerce ??Google Sheets ??Slack' : 'Application: Shopify ??WooCommerce ??Google Sheets ??Slack'}
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                    className="text-2xl font-bold text-white mb-4 mt-8"
                  >
                    {language === 'zh-HK' ? '?‹å?ä½¿ç”¨Make.com?…æ­¥é©? : 'Steps to Get Started with Make.com'}
                  </motion.h3>

                  <div className="space-y-4 mb-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 3.0 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {language === 'zh-HK' ? 'è¨»å??Œæ¢ç´? : 'Register and Explore'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            'è¨»å??è²»å¸³æˆ¶ï¼Œç??‰ä??¢å??ºæœ¬æ¦‚å¿µ?‚Make.com?ä??è²»è¨ˆå?ï¼Œæ??ˆå???000æ¬¡æ?ä½œã€? :
                            'Register for a free account and familiarize yourself with the interface and basic concepts. Make.com offers a free plan with 1000 operations per month.'
                          }
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 3.2 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {language === 'zh-HK' ? 'è­˜åˆ¥?ªå??–æ??? : 'Identify Automation Opportunities'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            '?†æ?ä½ å??¥å¸¸å·¥ä?æµç?ï¼Œæµ?ºé?è¤‡æ€§é??è€—æ??…ä»»?™ï??¢å•²å°±ä??ªå??–å?å¥½æ??ƒã€? :
                            'Analyze your daily workflows and identify repetitive, time-consuming tasks - these are great automation opportunities.'
                          }
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 3.4 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {language === 'zh-HK' ? '?µå»ºç¬¬ä??‹æ?å¢? : 'Create Your First Scenario'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            'å¾ç°¡?®å??ªå??–é?å§‹ï?ä¾‹å?å°‡é›»?µé?ä»¶ä?å­˜åˆ°?²ç«¯ç¡¬ç?ï¼Œæ??…è‡ª?•å?è¦†æŸ¥è©¢ã€? :
                            'Start with simple automation, such as saving email attachments to cloud storage or automatically replying to inquiries.'
                          }
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 3.6 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {language === 'zh-HK' ? 'æ¸¬è©¦?Œå„ª?? : 'Test and Optimize'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            'ä»”ç´°æ¸¬è©¦ä½ å??ªå??–æ?ç¨‹ï???§?·è?çµæ?ï¼Œä¸¦?¹æ??€è¦é€²è?èª¿æ•´?Œå„ª?–ã€? :
                            'Thoroughly test your automation workflows, monitor execution results, and make adjustments and optimizations as needed.'
                          }
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.8 }}
                    className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-lg border border-yellow-500/20 mb-8"
                  >
                    <h4 className="text-xl font-bold text-yellow-300 mb-3">
                      {language === 'zh-HK' ? '?’¡ å°ˆæ¥­å»ºè­°' : '?’¡ Professional Tips'}
                    </h4>
                    <p className="text-gray-300 mb-3">
                      {language === 'zh-HK' ? 
                        '?–ç„¶Make.com?Ÿèƒ½å¼·å¤§ï¼Œä?å¯¦æ–½?ªå??–é?è¦ä?ç´°è??ƒå?å°ˆæ¥­?¥è??‚AI Formula?¯ä»¥å¹«åŠ©é¦™æ¸¯ä¼æ¥­ï¼? :
                        'While Make.com is powerful, implementing automation requires careful planning and professional expertise. AI Formula can help Hong Kong businesses:'
                      }
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>{language === 'zh-HK' ? 'è©•ä¼°?ªå??–é?æ±‚å?æ©Ÿæ?' : 'Assess automation needs and opportunities'}</li>
                      <li>{language === 'zh-HK' ? 'è¨­è??Œå¯¦?½è‡ª?•å?è§?±º?¹æ?' : 'Design and implement automation solutions'}</li>
                      <li>{language === 'zh-HK' ? '?ä??¹è??Œæ?çºŒæ”¯?? : 'Provide training and ongoing support'}</li>
                      <li>{language === 'zh-HK' ? '?ªå??¾æ??…è‡ª?•å?æµç?' : 'Optimize existing automation processes'}</li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.0 }}
                    className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-lg border border-blue-500/20"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {language === 'zh-HK' ? 'æº–å??‹å??ªå??–ä??…ï?' : 'Ready to Start Your Automation Journey?'}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {language === 'zh-HK' ? 
                        'Make.comä¿‚ä??‹å¼·å¤§å??ªå??–å·¥?·ï?ä½†è??…å??¼æ®ä½¢å?æ½›å?ï¼Œé?è¦å?æ¥­å??‡å??Œæ”¯?´ã€‚è¯çµ¡AI Formulaï¼Œè??‘å?å¹«ä??¶å??€?©å??…è‡ª?•å?ç­–ç•¥?? :
                        'Make.com is a powerful automation tool, but to fully unleash its potential, you need professional guidance and support. Contact AI Formula and let us help you develop the most suitable automation strategy.'
                      }
                    </p>
                    <p className="text-sm text-blue-200">
                      {language === 'zh-HK' ? 'ç«‹å³?¯çµ¡?‘å?ï¼Œé?å§‹ä??…æ•¸ä½è??‹ä??…ï?' : 'Contact us now to start your digital transformation journey!'}
                    </p>
                  </motion.div>
                </>
              )}

              {/* ç¬?ç¯‡æ?ç« ï??¸æ?AI Formula?„ä?å¤§ç???*/}
              {post.id === 2 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?¸æ?AI Formula?„ä?å¤§ç??±ï?é¦™æ¸¯?€ä½³AI?ªå??–å¤¥ä¼? : '5 Reasons to Choose AI Formula: Hong Kong\'s Best AI Automation Partner'}
                  </motion.h2>
                  
                  <p className="text-lg">
                    {language === 'zh-HK' ? 
                      '?ºé?æ¸¯å‘¢?‹ç¬?¯è¬è®Šå??†æ¥­?°å??¥é¢ï¼ŒAI Formulaå·²ç??ç‚º?—å¥½å¤šä?æ¥­æ•¸ä½è??‹å?é¦–é¸å¤¥ä¼´?‚æ??‹å??ªä?ä¸€?“AI?¬å¸?ç°¡?®ï??´å?ä¿‚ä??ºè‡ª?•å?è·¯ä??¢æ??¯é??…æˆ°?¥å?ä½œå¤¥ä¼´ã€‚ç•¶ä½ è€Œå®¶?‡ç??¢ç??‡ç??…æ??™ï?AI Formula?…å?æ¥­å??Šæ­£?¨ç‚ºé¦™æ¸¯?„è??„æ¥­?…ä?æ¥­å‰µ? åƒ¹?¼ï?å¹«ä½¢?‹å¯¦?¾æ¥­?™æ?ç¨‹è‡ª?•å??Œæ™º?½å??‡ç??? :
                      'In Hong Kong\'s rapidly changing business environment, AI Formula has become the preferred partner for many enterprises\' digital transformation. We are not just an AI company, but your most reliable strategic partner on the automation journey. As you read this article, AI Formula\'s professional team is creating value for businesses across various industries in Hong Kong, helping them achieve business process automation and intelligent upgrades.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border-l-4 border-blue-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">
                      {language === 'zh-HK' ? 'é»è§£è¶Šå?è¶Šå?é¦™æ¸¯ä¼æ¥­?ƒæ?AI Formulaï¼? : 'Why Are More Hong Kong Businesses Choosing AI Formula?'}
                    </h4>
                    <p className="text-gray-200">
                      {language === 'zh-HK' ? 
                        'ç­”æ?å°±ä??ºæ??‹å??¸å?ç«¶çˆ­?ªå‹¢ï¼šæœ¬?°å??å??å?æ¥­å??Šã€è?å¯Œç?é©—ã€æ?çºŒæ”¯?´å??µæ–°?‹ç™¼?¹æ??‚ç??‘å?æ·±å…¥?¢è??¢ä?å¤§æ?AI Formula?…é??µç??±ã€? :
                        'The answer lies in our core competitive advantages: localized services, professional team, rich experience, continuous support, and innovative development methods. Let us explore these five key reasons to choose AI Formula in depth.'
                      }
                    </p>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?†ç”±ä¸€ï¼šæ·±åº¦æœ¬?°å?å°ˆæ¥­?å?' : 'Reason 1: Deep Localized Professional Services'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formulaä¿‚ç”±é¦™æ¸¯?¬åœ°å°ˆæ¥­?˜é?çµ„æ??…ï??‘å?æ·±åº¦?†è§£é¦™æ¸¯ä¼æ¥­?…ç??‹ç’°å¢ƒã€å?æ¥­æ??–å?å¸‚å ´?¹è‰²?‚å?æµ·å?AI?¬å¸?”å?ï¼Œæ??‹å??ªä??€è¡“ä??‰å??ç°¡?®ï??´å?ä¿‚ä??…å?æ¥­å¤¥ä¼´ï??½å??ä??Ÿæ­£?‡å?é¦™æ¸¯å¸‚å ´?€æ±‚å?AIè§?±º?¹æ??? :
                      'AI Formula consists of Hong Kong local professional teams who deeply understand the operating environment, business culture, and market characteristics of Hong Kong enterprises. Unlike overseas AI companies, we are not just technology suppliers, but your business partners, capable of providing AI solutions that truly meet Hong Kong market needs.'
                    }
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-green-400"
                    >
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? 'é¦™æ¸¯?†æ¥­?°å??†è§£' : 'Understanding Hong Kong Business Environment'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?Ÿæ?é¦™æ¸¯æ³•è??Œå?è¦è?æ±? : 'Familiar with Hong Kong regulations and compliance requirements'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?†è§£?¬åœ°?†æ¥­?‡å??Œç??? : 'Understanding local business culture and practices'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? '?©æ?é¦™æ¸¯ä¼æ¥­?…é?ä½œæ¨¡å¼? : 'Adapted to Hong Kong enterprise operating models'}
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? 'ä¸­è‹±?™è??å??¯æ´' : 'Bilingual Service Support'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? 'æµåˆ©?…å»£?±è©±æºé€? : 'Fluent Cantonese communication'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? 'å°ˆæ¥­?…è‹±?‡æ?è¡“æ?æª? : 'Professional English technical documentation'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? 'ç¹é?ä¸­æ??¨æˆ¶?Œé¢è¨­è?' : 'Traditional Chinese user interface design'}
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?†ç”±äºŒï?ç²¾è‹±?›äººå°ˆæ¥­?˜é?' : 'Reason 2: Elite Four-Member Professional Team'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?…æ ¸å¿ƒå??Šä??±å?ä½ç?é©—è?å¯Œå?AIå°ˆå®¶çµ„æ?ï¼Œæ?ä½æ??¡éƒ½?ºå??ªå?å°ˆæ¥­?˜å??æ?æ·±å??…ç?é©—å??“è??…æ??½ã€‚æ??‹å??˜é?è¦æ¨¡?–ç„¶ç²¾ç°¡ï¼Œä??ˆç?æ¥µé?ï¼Œèƒ½å¤ ç‚ºæ¯å€‹é??®æ?ä¾›å€‹äºº?–å?å°ˆæ¥­?å??? :
                      'AI Formula\'s core team consists of four experienced AI experts, each member possessing deep experience and exceptional skills in their respective professional fields. Although our team is streamlined, we are highly efficient and able to provide personalized professional services for each project.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-purple-300 mb-4">
                      {language === 'zh-HK' ? '?‘å??…å?æ¥­å??Šæ??ï?' : 'Our Professional Team Composition:'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-400 pl-4">
                          <h5 className="font-semibold text-blue-300">
                            {language === 'zh-HK' ? '?€è¡“é??¼å?å®? : 'Technical Development Expert'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? 'è² è²¬AIç³»çµ±?¶æ?è¨­è??Œç?å¼é??? : 'Responsible for AI system architecture design and programming development'}
                          </p>
                        </div>
                        <div className="border-l-4 border-green-400 pl-4">
                          <h5 className="font-semibold text-green-300">
                            {language === 'zh-HK' ? '?†æ¥­?†æ?å¸? : 'Business Analyst'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? '?†æ?ä¼æ¥­?€æ±‚å??¶å?è§?±º?¹æ?' : 'Analyze business requirements and develop solutions'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="border-l-4 border-purple-400 pl-4">
                          <h5 className="font-semibold text-purple-300">
                            {language === 'zh-HK' ? '?…ç›®ç®¡ç?å¸? : 'Project Manager'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? 'ç¢ºä??…ç›®?‰æ??‰è³ªå®Œæ?' : 'Ensure projects are completed on time and with quality'}
                          </p>
                        </div>
                        <div className="border-l-4 border-orange-400 pl-4">
                          <h5 className="font-semibold text-orange-300">
                            {language === 'zh-HK' ? 'å®¢æˆ¶?å?å°ˆå“¡' : 'Customer Service Specialist'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? '?ä??ç??¯æ´?ŒåŸ¹è¨“æ??? : 'Provide ongoing support and training services'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?†ç”±ä¸‰ï?è±å?å¯¦æˆ°?å?æ¡ˆä?' : 'Reason 3: Rich Practical Success Stories'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formulaå·²ç??å??ºå??“é?æ¸¯ä?æ¥­æ?ä¾›AI?ªå??–æ??™ï??‘å??…æ??Ÿæ?ä¾‹æ¶µ?‹å??Œè?æ¥­å?è¦æ¨¡?…ä?æ¥­ã€‚æ??‹é??®éƒ½ä¿‚æ??‹å?æ¥­èƒ½?›å??å?è³ªé??…æ?ä½³è??ã€? :
                      'AI Formula has successfully provided AI automation services to numerous Hong Kong enterprises. Our success stories span across different industries and business sizes. Each project serves as the best testament to our professional capabilities and service quality.'
                    }
                  </p>

                  <div className="space-y-6 my-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400"
                    >
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?? LLM?ºèƒ½?Šå¤©æ©Ÿå™¨äººé??? : '?? LLM Intelligent Chatbot Development'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?ºå??“ä?æ¥­é??¼åŸº?¼å¤§?‹è?è¨€æ¨¡å??…æ™º?½è?å¤©æ??¨äººï¼?4å°æ??ªå??æ?å®¢æˆ¶?¥è©¢ï¼Œè??†å¸¸è¦‹å?é¡Œå??ç??å??? :
                          'Developed intelligent chatbots based on Large Language Models for multiple enterprises, providing 24/7 automated customer inquiry responses, handling common questions and appointment bookings.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                          {language === 'zh-HK' ? 
                            'å®¢æˆ¶?å??ˆç??å?85%ï¼Œå®¢?¶æ»¿?åº¦?é?92%ï¼Œäººå·¥å®¢?å·¥ä½œé?æ¸›å?70%' :
                            '85% improvement in customer service efficiency, 92% increase in customer satisfaction, 70% reduction in manual customer service workload'
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '?“± ç¤¾äº¤åª’é??ªå??–ç™¼å¸ƒç³»çµ? : '?“± Social Media Automation Publishing System'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?”åŠ©ä¼æ¥­å»ºç??ºèƒ½ç¤¾äº¤åª’é?ç®¡ç?ç³»çµ±ï¼Œè‡ª?•ç??å‰µ?è²¼?‡å…§å®¹ï?å®šæ??¼å??°å??‹å¹³?°ï?ä¸¦å??ä??•æ•¸?šã€? :
                          'Helped enterprises establish intelligent social media management systems that automatically generate creative post content, schedule publications across multiple platforms, and analyze engagement data.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                          {language === 'zh-HK' ? 
                            'ç¤¾å?ç®¡ç??‚é?ç¯€??0%ï¼Œè²¼?‡ä??•ç??å?65%ï¼Œå??Œæ??‰åº¦å¢å?150%' :
                            '90% time savings in social media management, 65% increase in post engagement rates, 150% increase in brand exposure'
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400"
                    >
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?‘©?ğ??AI?›æ“¬ç§˜æ›¸ç³»çµ±' : '?‘©?ğ??AI Virtual Assistant System'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?‹ç™¼?ºèƒ½?›æ“¬ç§˜æ›¸ï¼Œè‡ª?•è??†æ—¥ç¨‹å??’ã€éƒµä»¶å?è¦†ã€æ?è­°è??„ã€è??™æ•´?†ç?è¡Œæ”¿å·¥ä?ï¼Œè?ä¼æ¥­ä¸»å?æ³¨æ ¸å¿ƒæ¥­?™ã€? :
                          'Developed intelligent virtual assistants that automatically handle administrative tasks such as scheduling, email replies, meeting minutes, and data organization, allowing business owners to focus on core operations.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                          {language === 'zh-HK' ? 
                            'è¡Œæ”¿å·¥ä??ˆç??å?80%ï¼Œä?æ¥­ä¸»?¸å?æ¥­å??‚é?å¢å?60%ï¼Œç??‹æ??¬é?ä½?0%' :
                            '80% improvement in administrative work efficiency, 60% increase in core business time for business owners, 40% reduction in operational costs'
                          }
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?†ç”±?›ï??¨æ–¹ä½æ?çºŒæ?è¡“æ”¯?? : 'Reason 4: Comprehensive Ongoing Technical Support'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?„æ??™ä??ƒåœ¨ç³»çµ±?¨ç½²å¾Œå°±çµæ??‚æ??‘æ?ä¾›å…¨?¢ç??ç??€è¡“æ”¯?´æ??™ï?ç¢ºä?ä½ ç?AIç³»çµ±å§‹ç?ä¿æ??€ä½³ç??‹ï?ä¸¦éš¨?—æ¥­?™ç™¼å±•ä??·å„ª?–å?ç´šã€? :
                      'AI Formula\'s service doesn\'t end after system deployment. We provide comprehensive ongoing technical support services to ensure your AI system always maintains optimal performance and continuously optimizes and upgrades as your business develops.'
                    }
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <Card className="bg-gray-900/50 border-gray-700 hover:border-orange-400 transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-orange-300 mb-4">
                          {language === 'zh-HK' ? '?€è¡“ç¶­è­·æ??? : 'Technical Maintenance Services'}
                        </h4>
                        <ul className="space-y-2 text-gray-200 text-sm">
                          <li>??{language === 'zh-HK' ? '24/7 ç³»çµ±??§?Œç¶­è­? : '24/7 system monitoring and maintenance'}</li>
                          <li>??{language === 'zh-HK' ? 'å®šæ?ç³»çµ±?´æ–°?Œå??¨è?ä¸? : 'Regular system updates and security patches'}</li>
                          <li>??{language === 'zh-HK' ? '?…é?å¿«é€Ÿè¨º?·å?ä¿®å¾©' : 'Rapid fault diagnosis and repair'}</li>
                          <li>??{language === 'zh-HK' ? '?§èƒ½?ªå??Œèª¿?? : 'Performance optimization and tuning'}</li>
                          <li>??{language === 'zh-HK' ? '?¸æ??™ä»½?Œç½??¢å¾? : 'Data backup and disaster recovery'}</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-900/50 border-gray-700 hover:border-green-400 transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-green-300 mb-4">
                          {language === 'zh-HK' ? 'å°ˆæ¥­ç·šä??™å­¸' : 'Professional Online Training'}
                        </h4>
                        <ul className="space-y-2 text-gray-200 text-sm">
                          <li>??{language === 'zh-HK' ? 'ç³»çµ±?ä??¹è?èª²ç?' : 'System operation training courses'}</li>
                          <li>??{language === 'zh-HK' ? 'è¦–é »?™å­¸?Œæ?ä½œæ??? : 'Video tutorials and operation manuals'}</li>
                          <li>??{language === 'zh-HK' ? 'ä¸€å°ä??€è¡“æ?å°? : 'One-on-one technical guidance'}</li>
                          <li>??{language === 'zh-HK' ? '?²é??Ÿèƒ½ä½¿ç”¨?¹è?' : 'Advanced feature usage training'}</li>
                          <li>??{language === 'zh-HK' ? 'å®šæ??¥è??´æ–°?†äº«' : 'Regular knowledge update sharing'}</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?†ç”±äº”ï??µæ–°AIé©…å??„é??¼æ–¹æ³? : 'Reason 5: Innovative AI-Driven Development Method'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?„æ?å¤§ç«¶?­å„ª?¢åœ¨?¼æ??‘ç¨?¹ç??‹ç™¼?¹æ?ï¼šé??¨AIä¾†é??¼AI?‚é€™ç¨®?µæ–°?„æ–¹æ³•è??‘å€‘èƒ½å¤ æ??³çµ±?‹ç™¼?˜é??´å¿«?æ›´æº–ç¢º?°äº¤ä»˜è§£æ±ºæ–¹æ¡ˆï??Œæ?ç¢ºä?æ¯å€‹é??®éƒ½?½é??°æ?é«˜ç?è³ªé?æ¨™æ??? :
                      'AI Formula\'s greatest competitive advantage lies in our unique development approach: using AI to develop AI. This innovative method allows us to deliver solutions faster and more accurately than traditional development teams, while ensuring every project meets the highest quality standards.'
                    }
                  </p>

                  <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-yellow-400 my-8">
                    <h4 className="font-semibold text-yellow-300 mb-4">
                      {language === 'zh-HK' ? '?‘å€‘ç?AIé©…å??‹ç™¼?ªå‹¢ï¼? : 'Our AI-Driven Development Advantages:'}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">
                          {language === 'zh-HK' ? '3?? : '3x'}
                        </div>
                        <p className="text-gray-200 text-sm">
                          {language === 'zh-HK' ? '?‹ç™¼?Ÿåº¦æ¯”å‚³çµ±æ–¹æ³? : 'Faster development than traditional methods'}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">50%</div>
                        <p className="text-gray-200 text-sm">
                          {language === 'zh-HK' ? '?…ç›®å®Œæ??‚é?ç¸®çŸ­' : 'Reduction in project completion time'}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">
                          {language === 'zh-HK' ? '24å°æ?' : '24 Hours'}
                        </div>
                        <p className="text-gray-200 text-sm">
                          {language === 'zh-HK' ? '?€æ±‚å??å??‰æ??? : 'Requirements analysis response time'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 my-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 3.0 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '?? ?ºèƒ½ä»?¢¼?Ÿæ?' : '?? Intelligent Code Generation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?©ç”¨?€?°ç?AI?€è¡“è‡ª?•ç??é?è³ªé?ä»?¢¼ï¼Œå¤§å¹…æ?å°‘é??¼æ??“ï??Œæ?ç¢ºä?ä»?¢¼?„ç©©å®šæ€§å??¯ç¶­è­·æ€§ã€? :
                          'Utilizing the latest AI technology to automatically generate high-quality code, significantly reducing development time while ensuring code stability and maintainability.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?ˆæ?ï¼? : 'Impact: '}</strong>
                          {language === 'zh-HK' ? 
                            'ä»?¢¼?‹ç™¼?Ÿåº¦?å?200%ï¼ŒéŒ¯èª¤ç??ä?80%' :
                            '200% improvement in code development speed, 80% reduction in error rates'
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 3.2 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400"
                    >
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?¯ ?ªå??–æ¸¬è©¦å??ªå?' : '?¯ Automated Testing and Optimization'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'AIç³»çµ±?ªå??²è??¨é¢æ¸¬è©¦ï¼Œè??¥æ??¨å?é¡Œä¸¦?ä??ªå?å»ºè­°ï¼Œç¢ºä¿æ??‹è§£æ±ºæ–¹æ¡ˆéƒ½?”åˆ°?€ä½³æ€§èƒ½?? :
                          'AI systems automatically conduct comprehensive testing, identify potential issues and provide optimization recommendations, ensuring every solution achieves optimal performance.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?ˆæ?ï¼? : 'Impact: '}</strong>
                          {language === 'zh-HK' ? 
                            'æ¸¬è©¦è¦†è???00%ï¼Œç³»çµ±ç©©å®šæ€§æ???0%' :
                            '100% test coverage, 90% improvement in system stability'
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 3.4 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400"
                    >
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?”® ?æ¸¬?§é?æ±‚å??? : '?”® Predictive Requirements Analysis'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?‹ç”¨æ©Ÿå™¨å­¸ç?ç®—æ??†æ?å®¢æˆ¶?€æ±‚æ¨¡å¼ï??æ¸¬?ªä??¯èƒ½?„å??½é?æ±‚ï??å?è¦å??Œè¨­è¨ˆè§£æ±ºæ–¹æ¡ˆã€? :
                          'Using machine learning algorithms to analyze customer requirement patterns, predict future possible functional needs, and plan and design solutions in advance.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?ˆæ?ï¼? : 'Impact: '}</strong>
                          {language === 'zh-HK' ? 
                            '?€æ±‚æ?ç¢ºç?95%ï¼Œå®¢?¶æ»¿?åº¦?å?85%' :
                            '95% requirement accuracy, 85% improvement in customer satisfaction'
                          }
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-gray-900/50 border-l-4 border-orange-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-orange-300 mb-4">
                      {language === 'zh-HK' ? '?ºä?éº¼é€™ç¨®?¹æ?å¦‚æ­¤?è?ï¼? : 'Why Is This Method So Important?'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?´å¿«äº¤ä?ï¼? : 'Faster Delivery: '}</strong>
                            {language === 'zh-HK' ? 'ç¸®çŸ­?…ç›®?±æ?ï¼Œè?å®¢æˆ¶?´å¿«?‹åˆ°?æ?' : 'Shortened project cycles, allowing clients to see results faster'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? '?´é?è³ªé?ï¼? : 'Higher Quality: '}</strong>
                            {language === 'zh-HK' ? 'AIè¼”åŠ©ç¢ºä?ä»?¢¼è³ªé??Œç³»çµ±ç©©å®šæ€? : 'AI assistance ensures code quality and system stability'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? '?´ä??æœ¬ï¼? : 'Lower Costs: '}</strong>
                            {language === 'zh-HK' ? '?é??ˆç??´æ¥?ä??‹ç™¼?æœ¬' : 'Improved efficiency directly reduces development costs'}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?ç??µæ–°ï¼? : 'Continuous Innovation: '}</strong>
                            {language === 'zh-HK' ? 'å§‹ç??¡ç”¨?€?°AI?€è¡“å??¹æ?' : 'Always adopting the latest AI technologies and methods'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? '?¯æ“´å±•æ€§ï?' : 'Scalability: '}</strong>
                            {language === 'zh-HK' ? 'ç³»çµ±è¨­è??ƒæ…®?ªä??´å??€æ±? : 'System design considers future expansion needs'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? 'ç«¶çˆ­?ªå‹¢ï¼? : 'Competitive Advantage: '}</strong>
                            {language === 'zh-HK' ? 'è®“å®¢?¶åœ¨å¸‚å ´ä¸­ä??é??ˆåœ°ä½? : 'Helping clients maintain leading positions in the market'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? æº–å??‹å?äº†å?ï¼? : '?? Ready to Get Started?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        '?¯ç¹«AI Formulaï¼Œè??‘å€‘ç?å°ˆæ¥­?˜é??ºä??ä??è²»?„é?æ±‚å??å?è§?±º?¹æ?å»ºè­°?‚è?ä½ï??ªè³ª?„AI?å?ä¸æ?è©²ç?å¾…ï??Œæ??Ÿç?ä¼æ¥­å¾ä??¶è±«?? :
                        'Contact AI Formula and let our professional team provide you with free requirements analysis and solution recommendations. Remember, quality AI services shouldn\'t wait, and successful businesses never hesitate.'
                      }
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">?“§</span>
                        <span className="text-sm">
                          {language === 'zh-HK' ? '?è²»è«®è©¢?å?' : 'Free Consultation Service'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">??/span>
                        <span className="text-sm">
                          {language === 'zh-HK' ? '24å°æ?å¿«é€Ÿå??? : '24-Hour Rapid Response'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">?¯</span>
                        <span className="text-sm">
                          {language === 'zh-HK' ? 'å®¢è£½?–è§£æ±ºæ–¹æ¡? : 'Customized Solutions'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>?œæ³¨?‘å??…Instagram <strong className="text-blue-300">@ai_formula_</strong> ?²å??´å?AI?ªå??–è?è¨Šå??å?æ¡ˆä??†äº«??/> :
                      <>Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more AI automation insights and success story sharing.</>
                    }
                  </p>
                </>
              )}

              {/* ç¬?ç¯‡æ?ç« ï?AI Formula å¦‚ä?å¹«åŠ©é¦™æ¸¯ä¸­å?ä¼å¯¦?¾æ¥­?™è‡ª?•å?è½‰å? */}
              {post.id === 1 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'AI Formulaï¼šé?æ¸¯ä¸­å°ä?æ¥­ç??¸ä?è½‰å?å¤¥ä¼´' : 'AI Formula: Your Digital Transformation Partner for Hong Kong SMEs'}
                  </motion.h2>
                  
                  <p className="text-lg">
                    {language === 'zh-HK' ? 
                      '?ºé?æ¸¯å‘¢?‹ç¬?¯è¬è®Šå??†æ¥­?°å??¥é¢ï¼Œä¸­å°ä?æ¥­é¢?¨ä??æ??ªæ??…æ??°å?æ©Ÿé??‚AI Formulaå°ˆé??ºé?æ¸¯ä¸­å°ä?æ¥­æ?ä¾›é?èº«å??¶å?AI?ªå??–è§£æ±ºæ–¹æ¡ˆï?å¾å?æ­¥è«®è©¢åˆ°å®Œæ•´å¯¦æ–½ï¼Œæ??‹å?å°ˆæ¥­?˜é??ªä¼´ä¼æ¥­èµ°é?æ¯ä?æ­¥æ•¸ä½è??‹å??…ç??? :
                      'In Hong Kong\'s rapidly changing business environment, SMEs face unprecedented challenges and opportunities. AI Formula specializes in providing tailored AI automation solutions for Hong Kong SMEs, with our professional team accompanying businesses through every step of their digital transformation journey from initial consultation to complete implementation.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border-l-4 border-blue-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">
                      {language === 'zh-HK' ? 'é»è§£é¦™æ¸¯ä¸­å?ä¼æ¥­?€è¦AI?ªå??–ï?' : 'Why Do Hong Kong SMEs Need AI Automation?'}
                    </h4>
                    <p className="text-gray-200">
                      {language === 'zh-HK' ? 
                        '?ºç«¶?­æ??ˆå?é¦™æ¸¯å¸‚å ´?¥é¢ï¼Œæ??‡å??æœ¬?§åˆ¶ä¿‚ä?æ¥­ç?å­˜å??œéµ?‚AI?ªå??–å??ä?å¤§ä?æ¥­å?å°ˆåˆ©ï¼Œè€Œä?ä¸­å?ä¼æ¥­ä¿æ?ç«¶çˆ­?›ã€æ??‡ç??‹æ??‡å?å¿…è?å·¥å…·?? :
                        'In Hong Kong\'s competitive market, efficiency and cost control are key to business survival. AI automation is no longer exclusive to large enterprises, but an essential tool for SMEs to maintain competitiveness and improve operational efficiency.'
                      }
                    </p>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'AI Formula?„æ??™ç?å¿µï?ä»¥å®¢?¶ç‚ºä¸­å??„å‰µ?? : 'AI Formula\'s Service Philosophy: Customer-Centric Innovation'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?¸ä¿¡æ¯é?ä¼æ¥­?½æ?ä½¢å??¨ç‰¹?…ç??‹æ¨¡å¼å??‘æˆ°?‚æ??‹å??å??†å¿µå»ºç??ºæ·±åº¦ç?è§?®¢?¶é?æ±‚å??ºç?ä¸Šé¢ï¼Œé??¨æ??°å?AI?€è¡“ç‚ºä¼æ¥­?µé€ å¯¦?›åƒ¹?¼ï??Œå?ä¿‚ç‚º?—æ?è¡“è€Œæ?è¡“ã€? :
                      'AI Formula believes that every business has its unique operational model and challenges. Our service philosophy is built on deeply understanding client needs, using the latest AI technology to create real value for businesses, not technology for technology\'s sake.'
                    }
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-green-400"
                    >
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? 'å®¢æˆ¶?³ä??„æ??™æ?åº? : 'Customer-First Service Approach'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? 'æ·±å…¥äº†è§£ä¼æ¥­?¨ç‰¹?€æ±? : 'Deep understanding of unique business needs'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?ä??‹äºº?–è§£æ±ºæ–¹æ¡ˆå»ºè­? : 'Provide personalized solution recommendations'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? 'ç¢ºä?æ¯å€‹é??®éƒ½?½å??µé€ å¯¦?›åƒ¹?? : 'Ensure every project creates real value'}
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '?€è¡“å‰µ?°è?å¯¦ç”¨?§ä¸¦?? : 'Balance Innovation with Practicality'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?¡ç”¨?€?°AI?€è¡“å?å·¥å…·' : 'Adopt latest AI technologies and tools'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? 'å°ˆæ³¨?¼å¯¦?›å?æ¥­æ??? : 'Focus on practical business applications'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? 'ç¢ºä??€è¡“æ–¹æ¡ˆæ??¼ä½¿?¨å?ç¶­è­·' : 'Ensure solutions are user-friendly and maintainable'}
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'å®Œæ•´?„æ??™æ?ç¨‹ï?å¾è«®è©¢åˆ°å¯¦æ–½' : 'Complete Service Process: From Consultation to Implementation'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?¡ç”¨ç³»çµ±?§å??›é?æ®µæ??™æ?ç¨‹ï?ç¢ºä?æ¯å€‹AI?ªå??–é??®éƒ½?½å??†åˆ©å®Œæ?ä¸¦ç‚ºä¼æ¥­å¸¶å?å¯¦é??ˆç??‚æ??‹å?å°ˆæ¥­?˜é??ƒå–ºæ¯å€‹é?æ®µæ?ä¾›è©³ç´°æ?å°å??¯æ´?? :
                      'AI Formula adopts a systematic four-stage service process to ensure every AI automation project is completed successfully and brings real benefits to businesses. Our professional team provides detailed guidance and support at every stage.'
                    }
                  </p>

                  <div className="space-y-6 my-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '?? ?æ®µä¸€ï¼šæ¥­?™è¨º?·è??€æ±‚å??? : '?? Stage 1: Business Diagnosis & Needs Analysis'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?‘å€‘ç?å°ˆæ¥­é¡§å??ƒæ·±?¥ä?è§?‚¨?„ä?æ¥­ç¾?‰æ¥­?™æ?ç¨‹ï?è­˜åˆ¥?è??§é??è€—æ??„ä?æ¥­ç’°ç¯€ï¼Œè?ä¼°è‡ª?•å??„å¯è¡Œæ€§å??ªå??†å??? :
                          'Our professional consultants will thoroughly understand your existing business processes, identify repetitive and time-consuming operations, and assess automation feasibility and priorities.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? 'äº¤ä??æ?ï¼? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            'è©³ç´°?„æ¥­?™æ?ç¨‹å??å ±?Šã€è‡ª?•å?æ©Ÿæ?è­˜åˆ¥?ROI?ä¼°?†æ?' :
                            'Detailed business process analysis report, automation opportunity identification, ROI estimation analysis'
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400"
                    >
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?¯ ?æ®µäºŒï?å®¢è£½?–æ–¹æ¡ˆè¨­è¨? : '?¯ Stage 2: Customized Solution Design'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?¹æ?ä¼æ¥­?ç??Œé?æ±‚ï??‘å€‘æ?è¨­è??€?©å??„AIè§?±º?¹æ?ï¼Œé¸?‡å??©ç??€è¡“æ¶æ§‹ï?ä¸¦åˆ¶å®šè©³ç´°ç?å¯¦æ–½?‚é?è¡¨ã€? :
                          'Based on your budget and requirements, we design the most suitable AI solutions, select appropriate technical architecture, and create detailed implementation timelines.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? 'äº¤ä??æ?ï¼? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            '?€è¡“æ–¹æ¡ˆè¨­è¨ˆæ›¸?ç”¨?¶ç??¢å??‹ã€é??®å¯¦?½è??ƒã€é?ç®—æ?ç´? :
                            'Technical solution design document, UI prototypes, project implementation plan, budget breakdown'
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400"
                    >
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?™ï? ?æ®µä¸‰ï?ç³»çµ±?‹ç™¼?‡éƒ¨ç½? : '?™ï? Stage 3: System Development & Deployment'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?‘å€‘ç??€è¡“å??Šæ??²è?ç³»çµ±?‹ç™¼?Œæ¸¬è©¦ï??‡ç¾?‰ç³»çµ±é€²è??´å?ï¼Œä¸¦?ä??¨é¢?„å“¡å·¥åŸ¹è¨“å??ä??‹å??? :
                          'Our technical team conducts system development and testing, integrates with existing systems, and provides comprehensive staff training and operation manuals.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? 'äº¤ä??æ?ï¼? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            'å®Œæ•´?„AI?ªå??–ç³»çµ±ã€ç³»çµ±æ•´?ˆã€å“¡å·¥åŸ¹è¨“ã€æ?ä½œæ??? :
                            'Complete AI automation system, system integration, staff training, operation manual'
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                      className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-400"
                    >
                      <h4 className="font-semibold text-orange-300 mb-3">
                        {language === 'zh-HK' ? '?? ?æ®µ?›ï???§?ªå??‡ç¶­è­? : '?? Stage 4: Monitoring, Optimization & Maintenance'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'ç³»çµ±ä¸Šç?å¾Œï??‘å€‘æ??ç???§?‹è??€æ³ï??¶é??¨æˆ¶?é?ä¸¦é€²è??¹é€²ï??ä?å®šæ??´æ–°?Œæ?è¡“æ”¯?´æ??™ã€? :
                          'After system launch, we continuously monitor operations, collect user feedback for improvements, and provide regular updates and technical support services.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? 'äº¤ä??æ?ï¼? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            'ç³»çµ±??§?±å??æ€§èƒ½?ªå??å??½æ›´?°ã€æ?çºŒæ?è¡“æ”¯?? :
                            'System monitoring reports, performance optimization, feature updates, ongoing technical support'
                          }
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'AI Formula?„æ ¸å¿ƒæ??™é??? : 'AI Formula\'s Core Service Areas'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      '?‘å€‘æ?ä¾›å…¨?¹ä??„AI?ªå??–æ??™ï?æ¶µè?ä¼æ¥­?Ÿé??„å??‹ç’°ç¯€?‚æ??…æ??™éƒ½ç¶“é?ç²¾å?è¨­è?ï¼Œç¢ºä¿èƒ½å¤ ç‚ºé¦™æ¸¯ä¸­å?ä¼æ¥­å¸¶ä?å¯¦é??„å?æ¥­åƒ¹?¼ã€? :
                      'We provide comprehensive AI automation services covering all aspects of business operations. Each service is carefully designed to ensure real business value for Hong Kong SMEs.'
                    }
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.6 }}
                      className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-2">
                        {language === 'zh-HK' ? '?? å°ˆæ¥­?™å­¸èª²ç?' : '?? Professional Training Courses'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          '?ä?ç·šä?AIèª²ç??Œå·¥ä½œå?ï¼Œè?ä¼æ¥­?˜é??Œæ¡AI?‰ç”¨?€?½ï?å»ºç??§éƒ¨AI?½å?' :
                          'Provide online AI courses and workshops to help business teams master AI application skills and build internal AI capabilities'
                        }
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.8 }}
                      className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-green-400"
                    >
                      <h4 className="font-semibold text-green-300 mb-2">
                        {language === 'zh-HK' ? '??ï¸?AIå·¥å…·?†äº«' : '??ï¸?AI Tools Sharing'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          '?†äº«?€?°AIå·¥å…·?Œæ?è¡“è¶¨?¢ï?å¹«åŠ©ä¼æ¥­?¸æ??€?©å??„è§£æ±ºæ–¹æ¡? :
                          'Share the latest AI tools and technology trends to help businesses choose the most suitable solutions'
                        }
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 3.0 }}
                      className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-purple-400"
                    >
                      <h4 className="font-semibold text-purple-300 mb-2">
                        {language === 'zh-HK' ? '??æµç??ªå??? : '??Process Automation'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          'è¨­è??Œå¯¦?½æ™º?½è‡ª?•å?æµç?ï¼Œè§£?¾äºº?›è?æºï??å??´é??Ÿé??ˆç?' :
                          'Design and implement intelligent automation processes to free up human resources and improve overall operational efficiency'
                        }
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 3.2 }}
                      className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-orange-400"
                    >
                      <h4 className="font-semibold text-orange-300 mb-2">
                        {language === 'zh-HK' ? '?¯ å®¢è£½?–AIè§?±º?¹æ?' : '?¯ Customized AI Solutions'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          '?¹æ?ä¼æ¥­?¨ç‰¹?€æ±‚ï??‹ç™¼å°ˆå±¬?„AI?ªå??–ç³»çµ±å??‰ç”¨' :
                          'Develop exclusive AI automation systems and applications based on unique business requirements'
                        }
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?å?æ¡ˆä?ï¼šç?å¯¦ç?è½‰å??…ä?' : 'Success Stories: Real Transformation Cases'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formulaå·²æ??Ÿå??©çœ¾å¤šé?æ¸¯ä¸­å°ä?æ¥­å¯¦?¾æ•¸ä½è??‹ã€‚ä»¥ä¸‹æ˜¯?‘å€‘ç?ä¸€äº›æ??Ÿæ?ä¾‹ï?å±•ç¤ºAI?ªå??–å?ä½•ç‚ºä¸å?è¡Œæ¥­?„ä?æ¥­å‰µ? å¯¦?›åƒ¹?¼ã€? :
                      'AI Formula has successfully helped numerous Hong Kong SMEs achieve digital transformation. Here are some of our success stories, demonstrating how AI automation creates real value for businesses across different industries.'
                    }
                  </p>

                  <div className="space-y-4 my-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-2">
                        {language === 'zh-HK' ? '?? ?¶å”®æ¥­ï??ºèƒ½å®¢æˆ¶?å?ç³»çµ±' : '?? Retail: Intelligent Customer Service System'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '?ºä?å®¶é?æ¸¯æ?è£é›¶?®å??‹ç™¼LLM?Šå¤©æ©Ÿå™¨äººï?24å°æ??ªå??æ?å®¢æˆ¶?¥è©¢ï¼Œè??†è??®è¿½è¹¤å??¢å??¨è–¦?? :
                          'Developed an LLM chatbot for a Hong Kong fashion retailer, providing 24/7 automatic customer inquiry responses, order tracking, and product recommendations.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          'å®¢æˆ¶?å??ˆç??å?85%ï¼Œå®¢?¶æ»¿?åº¦?é?92%ï¼Œäººå·¥å®¢?å·¥ä½œé?æ¸›å?70%' :
                          '85% improvement in customer service efficiency, 92% increase in customer satisfaction, 70% reduction in manual customer service workload'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-300 mb-2">
                        {language === 'zh-HK' ? '?“± é¤é£²æ¥­ï?ç¤¾äº¤åª’é??ªå??–ç®¡?? : '?“± F&B: Social Media Automation Management'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '?”åŠ©ä¸€å®¶é€??é¤å»³å»ºç??ºèƒ½ç¤¾äº¤åª’é?ç®¡ç?ç³»çµ±ï¼Œè‡ª?•ç??è??®æ¨å»?…§å®¹ï?å®šæ??¼å??°Facebook?ŒInstagram?? :
                          'Helped a restaurant chain establish an intelligent social media management system that automatically generates menu promotional content and schedules posts to Facebook and Instagram.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          'ç¤¾å?ç®¡ç??‚é?ç¯€??0%ï¼Œè²¼?‡ä??•ç??å?65%ï¼Œæ–°å®¢æˆ¶å¢å?40%' :
                          '90% time savings in social media management, 65% increase in post engagement rates, 40% increase in new customers'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-2">
                        {language === 'zh-HK' ? '?’¼ å°ˆæ¥­?å?ï¼šAI?›æ“¬ç§˜æ›¸ç³»çµ±' : '?’¼ Professional Services: AI Virtual Assistant System'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '?ºä?å®¶æ?è¨ˆå¸«äº‹å??€?‹ç™¼AI?›æ“¬ç§˜æ›¸ï¼Œè‡ª?•è??†é?ç´„å??’ã€æ?ä»¶æ•´?†å?å®¢æˆ¶æºé€šã€? :
                          'Developed an AI virtual assistant for an accounting firm to automatically handle appointment scheduling, document organization, and client communication.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          'è¡Œæ”¿å·¥ä??ˆç??å?80%ï¼Œå?æ¥­æ??™æ??“å???0%ï¼Œç??‹æ??¬é?ä½?5%' :
                          '80% improvement in administrative work efficiency, 60% increase in professional service time, 35% reduction in operational costs'
                        }
                      </p>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.6 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?ºä?éº¼é¸?‡AI Formulaï¼? : 'Why Choose AI Formula?'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      '?¨çœ¾å¤šAI?å??ä??†ä¸­ï¼ŒAI Formulaä»¥å…¶?¨ç‰¹?„å„ª?¢æ??ºé?æ¸¯ä¸­å°ä?æ¥­ç?é¦–é¸å¤¥ä¼´?‚æ??‘ä??ªæ˜¯?€è¡“ä??‰å?ï¼Œæ›´?¯ä?æ¥­æ•¸ä½è??‹è·¯ä¸Šç??¯é?é¡§å??? :
                      'Among many AI service providers, AI Formula stands out with unique advantages as the preferred partner for Hong Kong SMEs. We are not just technology suppliers, but reliable consultants on your digital transformation journey.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border-l-4 border-blue-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">
                      {language === 'zh-HK' ? 'AI Formula ?„æ ¸å¿ƒå„ª?? : 'AI Formula\'s Core Advantages'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <ul className="space-y-3 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?¬åœ°å°ˆæ¥­?˜é?ï¼? : 'Local Professional Team: '}</strong>{language === 'zh-HK' ? 'æ·±åº¦?†è§£é¦™æ¸¯?†æ¥­?°å?' : 'Deep understanding of Hong Kong business environment'}</li>
                          <li>??<strong>{language === 'zh-HK' ? 'AI?€è¡“é??ˆï?' : 'Leading AI Technology: '}</strong>{language === 'zh-HK' ? '?‹ç”¨AI?‹ç™¼AIï¼Œé€Ÿåº¦æ¯”ç«¶?­å??‹å¿«3?? : 'Using AI to develop AI, 3x faster than competitors'}</li>
                          <li>??<strong>{language === 'zh-HK' ? 'å¯¦æˆ°ç¶“é?è±å?ï¼? : 'Rich Practical Experience: '}</strong>{language === 'zh-HK' ? '?å??å?å¤šå€‹è?æ¥­ç?ä¸­å?ä¼æ¥­' : 'Successfully serving SMEs across multiple industries'}</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?¨ç??¯æ´?å?ï¼? : 'Full Support Service: '}</strong>{language === 'zh-HK' ? 'å¾è«®è©¢åˆ°ç¶­è­·?„å??´æ??? : 'Complete service from consultation to maintenance'}</li>
                          <li>??<strong>{language === 'zh-HK' ? 'ç·šä??™å­¸èª²ç?ï¼? : 'Online Training Courses: '}</strong>{language === 'zh-HK' ? 'ç¢ºä?å®¢æˆ¶?˜é??Œæ¡ç³»çµ±?ä?' : 'Ensure client teams master system operations'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?ˆæ´»è§?±º?¹æ?ï¼? : 'Flexible Solutions: '}</strong>{language === 'zh-HK' ? '?©å??„ç¨®è¦æ¨¡?Œé?ç®—ç?ä¼æ¥­' : 'Suitable for businesses of all sizes and budgets'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? æº–å??‹å?ä½ ç?AIè½‰å?ä¹‹æ??ï?' : '?? Ready to Start Your AI Transformation Journey?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        'ä¸è?è®“ä??„ä?æ¥­åœ¨?¸ä?ç«¶çˆ­ä¸­è½å¾Œã€‚ç??³è¯ç¹«AI Formulaï¼Œè??‘å€‘ç?å°ˆæ¥­?˜é??ºä??ä??è²»?„æ¥­?™è¨º?·å?AI?ªå??–æ–¹æ¡ˆå»ºè­°ã€‚è?ä½ï??å??„ä?æ¥­å?ä¸ç?å¾…ï??Œæ˜¯ä¸»å??æŠ±è®Šé©?? :
                        'Don\'t let your business fall behind in the digital competition. Contact AI Formula immediately and let our professional team provide you with free business diagnosis and AI automation solution recommendations. Remember, successful businesses never wait, but actively embrace change.'
                      }
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">??</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?è²»è«®è©¢?±ç?' : 'Free Consultation Hotline'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">?“§</span>
                        <span className="text-sm">{language === 'zh-HK' ? 'å°ˆæ¥­?¹æ?å»ºè­°' : 'Professional Solution Recommendations'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">?¯</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?èº«å®šåˆ¶è§?±º?¹æ?' : 'Tailored Solutions'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>?œæ³¨?‘å??…Instagram <strong className="text-blue-300">@ai_formula_</strong> ?²å??´å?AI?ªå??–è?è¨Šå??å?æ¡ˆä??†äº«??/> :
                      <>Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more AI automation insights and success story sharing.</>
                    }
                  </p>
                </>
              )}

              {/* ç¬?ç¯‡æ?ç« ï?n8nä»‹ç´¹ */}
              {post.id === 4 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'n8nä¿‚ä??¢ï?' : 'What is n8n?'}
                  </motion.h2>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'n8nï¼ˆç™¼?³ç‚º"n-eight-n"ï¼‰ä?ä¸€?‹å¼·å¤§å??‹æ?å·¥ä?æµç??ªå??–å¹³?°ï?å°ˆé??ºä?æ¥­å??‹ç™¼?…æ?ä¾›é?æ´»å??ªå??–è§£æ±ºæ–¹æ¡ˆã€‚è??¶ä??ªå??–å·¥?·ä??Œï?n8nä¿¾ä?å®Œå…¨?…æ§?¶æ?ï¼Œå¯ä»¥è‡ªä¸»è?ç®¡ï?ä¸¦ä??ä?è¦–è¦º?–å?ç¯€é»ç·¨è¼¯å™¨?Ÿå‰µå»ºè??œå?å·¥ä?æµç??? :
                      'n8n (pronounced "n-eight-n") is a powerful open-source workflow automation platform designed to provide flexible automation solutions for businesses and developers. Unlike other automation tools, n8n gives you complete control, can be self-hosted, and provides a visual node editor to create complex workflows.'
                    }
                  </p>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-6 my-8">
                    <h3 className="text-xl font-semibold text-green-300 mb-4">
                      {language === 'zh-HK' ? '?”§ n8n?…æ ¸å¿ƒç‰¹é»? : '?”§ Core Features of n8n'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?‹æ??è²»ï¼? : 'Open Source & Free: '}</strong>{language === 'zh-HK' ? 'å®Œå…¨?è²»ä½¿ç”¨ï¼Œç„¡ä½¿ç”¨?åˆ¶' : 'Completely free to use with no usage restrictions'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?ªä¸»è¨—ç®¡ï¼? : 'Self-hosted: '}</strong>{language === 'zh-HK' ? '?¸æ?å®Œå…¨?Œæ§?¨è‡ªå·±æ?ä¸? : 'Complete control over your data'}</li>
                          <li>??<strong>{language === 'zh-HK' ? 'è¦–è¦º?–ç·¨è¼¯ï?' : 'Visual Editor: '}</strong>{language === 'zh-HK' ? '?–æ?å¼ç??¢ï??“æ–¼ä½¿ç”¨' : 'Drag-and-drop interface, easy to use'}</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? 'è±å??´å?ï¼? : 'Rich Integrations: '}</strong>{language === 'zh-HK' ? '?¯æ´200+?‹æ??¨ç?å¼? : 'Supports 200+ applications'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?ªå?ç¾©ç?é»ï?' : 'Custom Nodes: '}</strong>{language === 'zh-HK' ? '?¯ä»¥?µå»ºå°ˆå±¬?Ÿèƒ½' : 'Create your own custom functionality'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?¡ä»£ç¢?ä½ä»£ç¢¼ï?' : 'No-code/Low-code: '}</strong>{language === 'zh-HK' ? '?©å??€è¡“å??æ?è¡“ç”¨?? : 'Suitable for both technical and non-technical users'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'n8n vs ?¶ä??ªå??–å·¥?? : 'n8n vs Other Automation Tools'}
                  </motion.h3>

                  <div className="overflow-x-auto my-8">
                    <table className="w-full border-collapse border border-gray-600 rounded-lg">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-3 text-left text-white">
                            {language === 'zh-HK' ? '?¹é?' : 'Feature'}
                          </th>
                          <th className="border border-gray-600 p-3 text-center text-green-300">n8n</th>
                          <th className="border border-gray-600 p-3 text-center text-blue-300">Make.com</th>
                          <th className="border border-gray-600 p-3 text-center text-purple-300">Zapier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?‹æ?' : 'Open Source'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                        </tr>
                        <tr className="bg-gray-900/30">
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?ªä¸»è¨—ç®¡' : 'Self-hosted'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?è²»ä½¿ç”¨' : 'Free Usage'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-yellow-400">? ï?</td>
                          <td className="border border-gray-600 p-3 text-center text-yellow-400">? ï?</td>
                        </tr>
                        <tr className="bg-gray-900/30">
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?ªå?ç¾©ç?åº? : 'Customization'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">â­â?â­â?â­?/td>
                          <td className="border border-gray-600 p-3 text-center text-blue-400">â­â?â­â?</td>
                          <td className="border border-gray-600 p-3 text-center text-purple-400">â­â?â­?/td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? 'å­¸ç???º¦' : 'Learning Curve'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-yellow-400">? ï?</td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'n8n?…ä¸»è¦æ??¨å ´?? : 'Main Use Cases for n8n'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-cyan-400">
                      <h4 className="font-semibold text-cyan-300 mb-3">
                        {language === 'zh-HK' ? '?? ?¸æ??Œæ­¥?‡æ•´?? : '?? Data Synchronization & Integration'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'å°‡ä??Œç³»çµ±å??¸æ??²è??Œæ­¥ï¼Œä?å¦‚CRM?ERP?é›»?†å¹³?°ä??“å??¸æ?äº¤æ??‚n8n?¯ä»¥å¹«åŠ©ä¼æ¥­å»ºç?çµ±ä??…æ•¸?šæ?ï¼Œç¢ºä¿æ??‰ç³»çµ±éƒ½?‰æ??°å?è³‡è??? :
                          'Synchronize data between different systems, such as data exchange between CRM, ERP, and e-commerce platforms. n8n helps businesses establish unified data flows, ensuring all systems have the latest information.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? 'å¸¸è?ä¾‹å?ï¼? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          'Shopifyè¨‚å–®?Œæ­¥?°Google Sheets?HubSpot?¯çµ¡äººæ›´?°åˆ°Mailchimp' :
                          'Sync Shopify orders to Google Sheets, update HubSpot contacts to Mailchimp'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?“§ ?ªå??–ç??? : '?“§ Marketing Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'å»ºç??ºèƒ½?…ç??·å·¥ä½œæ?ç¨‹ï??¹æ?å®¢æˆ¶è¡Œç‚º?ªå??¼é€å€‹äºº?–éƒµä»¶ã€æ›´?°å®¢?¶æ?ç±¤ã€è§¸?¼ç‰¹å®šç??·æ´»?•ã€? :
                          'Build intelligent marketing workflows that automatically send personalized emails, update customer tags, and trigger specific marketing campaigns based on customer behavior.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? 'å¸¸è?ä¾‹å?ï¼? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?°å®¢?¶æ­¡è¿éƒµä»¶å??—ã€è³¼?©è??¾æ??é??ç??¥å„ª? è‡ª?•ç™¼?? :
                          'New customer welcome email sequences, abandoned cart reminders, automatic birthday offers'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?? å®¢æˆ¶?å??ªå??? : '?? Customer Service Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?ªå??•ç?å®¢æˆ¶?¥è©¢?å»ºç«‹æ??™å·¥?®ã€ç™¼?ç??‹æ›´?°é€šçŸ¥?‚ç??ˆAI?Šå¤©æ©Ÿå™¨äººï??¯ä»¥?ä?24/7?…å®¢?¶æ”¯?´æ??™ã€? :
                          'Automatically handle customer inquiries, create service tickets, and send status update notifications. Combined with AI chatbots, provide 24/7 customer support services.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? 'å¸¸è?ä¾‹å?ï¼? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?ªå??è?å¸¸è??é??å·¥?®ç??‹æ›´?°ã€å®¢?¶æ»¿?åº¦èª¿æŸ¥' :
                          'Auto-reply to FAQs, ticket status updates, customer satisfaction surveys'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-semibold text-orange-300 mb-3">
                        {language === 'zh-HK' ? '?? ?±å??‡ç›£?? : '?? Reporting & Monitoring'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?ªå??Ÿæ?æ¥­å??±å??ç›£?§ç³»çµ±ç??‹ã€ç™¼?è­¦?±é€šçŸ¥?‚å¹«?©ä?æ¥­å??‚ä?è§?¥­?™ç?æ³å?ç³»çµ±?¥åº·åº¦ã€? :
                          'Automatically generate business reports, monitor system status, and send alert notifications. Help businesses stay informed about business conditions and system health.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? 'å¸¸è?ä¾‹å?ï¼? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          'æ¯æ—¥?·å”®?±å??ç¶²ç«™å?æ©Ÿè­¦?±ã€åº«å­˜ä?è¶³é€šçŸ¥' :
                          'Daily sales reports, website downtime alerts, low inventory notifications'
                        }
                      </div>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'é»æ¨£?‹å?ä½¿ç”¨n8nï¼? : 'How to Get Started with n8n?'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-blue-300 mb-4">
                        {language === 'zh-HK' ? '?? ä¸‰ç¨®?¨ç½²?¹å?' : '?? Three Deployment Options'}
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-300 mb-2">
                            {language === 'zh-HK' ? '1. ?²ç«¯?ˆæœ¬ï¼ˆn8n.cloudï¼? : '1. Cloud Version (n8n.cloud)'}
                          </h5>
                          <p className="text-gray-200 text-sm mb-2">
                            {language === 'zh-HK' ? 
                              '?€ç°¡å–®?…é?å§‹æ–¹å¼ï??¡é?å®‰è?ï¼Œè¨»?Šå³?¨ã€‚é©?ˆå?å­¸è€…å?å°å??˜é??? :
                              'The easiest way to start, no installation required, sign up and use immediately. Perfect for beginners and small teams.'
                            }
                          </p>
                          <div className="text-xs text-gray-400">
                            <strong>{language === 'zh-HK' ? '?ªé?ï¼? : 'Pros: '}</strong>
                            {language === 'zh-HK' ? '?³æ??¯ç”¨?è‡ª?•æ›´?°ã€ç„¡?€ç¶­è­·' : 'Ready to use, automatic updates, no maintenance required'}
                          </div>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-300 mb-2">
                            {language === 'zh-HK' ? '2. ?ªä¸»è¨—ç®¡ï¼ˆSelf-hostedï¼? : '2. Self-hosted'}
                          </h5>
                          <p className="text-gray-200 text-sm mb-2">
                            {language === 'zh-HK' ? 
                              '?¨è‡ªå·±å??å??¨ä?å®‰è?n8nï¼Œå??¨æ§?¶æ•¸?šå?è¨­å??‚é©?ˆæ??€è¡“èƒ½?›å??˜é??? :
                              'Install n8n on your own server with complete control over data and settings. Suitable for teams with technical capabilities.'
                            }
                          </p>
                          <div className="text-xs text-gray-400">
                            <strong>{language === 'zh-HK' ? '?ªé?ï¼? : 'Pros: '}</strong>
                            {language === 'zh-HK' ? 'å®Œå…¨?§åˆ¶?æ•¸?šå??¨ã€ç„¡ä½¿ç”¨?åˆ¶' : 'Complete control, data security, no usage restrictions'}
                          </div>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-300 mb-2">
                            {language === 'zh-HK' ? '3. ?¬åœ°å®‰è?ï¼ˆLocal Installationï¼? : '3. Local Installation'}
                          </h5>
                          <p className="text-gray-200 text-sm mb-2">
                            {language === 'zh-HK' ? 
                              '?¨å€‹äºº?»è…¦ä¸Šå?è£n8n?²è?æ¸¬è©¦?Œå­¸ç¿’ã€‚é©?ˆé??¼è€…å??³è?è©¦ç”¨?…ç”¨?¶ã€? :
                              'Install n8n on your personal computer for testing and learning. Perfect for developers and users who want to try it out.'
                            }
                          </p>
                          <div className="text-xs text-gray-400">
                            <strong>{language === 'zh-HK' ? '?ªé?ï¼? : 'Pros: '}</strong>
                            {language === 'zh-HK' ? '?è²»æ¸¬è©¦?å­¸ç¿’ç’°å¢ƒã€é›¢ç·šä½¿?? : 'Free testing, learning environment, offline usage'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.0 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'é¦™æ¸¯ä¼æ¥­ä½¿ç”¨n8n?…å¯¦?›æ?ä¾? : 'Real Use Cases of n8n for Hong Kong Businesses'}
                  </motion.h3>

                  <div className="space-y-4 my-8">
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-semibold text-yellow-300 mb-2">
                        {language === 'zh-HK' ? '?ª ?¶å”®æ¥­ï?åº«å?ç®¡ç??ªå??? : '?ª Retail: Inventory Management Automation'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          'ä¸€å®¶é?æ¸¯æ?è£é›¶?®å?ä½¿ç”¨n8n??¥POSç³»çµ±?ç¶²åº—å??‰åº«ç®¡ç?ç³»çµ±ï¼Œå¯¦?¾å³?‚åº«å­˜å?æ­¥ã€‚ç•¶?ä»¶?†å?åº«å?ä½æ–¼è¨­å??¼æ?ï¼Œç³»çµ±æ??ªå??¼é€æ¡è³¼æ??’ã€? :
                          'A Hong Kong fashion retailer uses n8n to connect POS systems, online stores, and warehouse management systems for real-time inventory synchronization. When inventory falls below set levels, the system automatically sends purchase reminders.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          'åº«å?æº–ç¢ºåº¦æ???5%ï¼Œç¼ºè²¨æ?æ³æ?å°?0%ï¼Œäººå·¥æ ¸å°æ??“ç???0%' :
                          '95% improvement in inventory accuracy, 80% reduction in stockouts, 90% time savings in manual checking'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-2">
                        {language === 'zh-HK' ? '?¢ å°ˆæ¥­?å?ï¼šå®¢?¶é?ä¿‚ç®¡?? : '?¢ Professional Services: Customer Relationship Management'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          'ä¸€å®¶æ?è¨ˆå¸«äº‹å??€ä½¿ç”¨n8n?´å?å®¢æˆ¶?¥è©¢è¡¨å–®?CRMç³»çµ±?Œéƒµä»¶ç??·å¹³?°ã€‚æ–°å®¢æˆ¶?¥è©¢?ƒè‡ª?•å‰µå»ºCRMè¨˜é?ï¼Œä¸¦è§¸ç™¼?‹äºº?–å?è·Ÿé€²éƒµä»¶å??—ã€? :
                          'An accounting firm uses n8n to integrate customer inquiry forms, CRM systems, and email marketing platforms. New customer inquiries automatically create CRM records and trigger personalized follow-up email sequences.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          'å®¢æˆ¶?æ??‡æ???0%ï¼ŒéŠ·?®è??›ç?å¢å?35%ï¼Œå®¢?¶ç®¡?†æ??‡æ???5%' :
                          '60% increase in customer response rate, 35% increase in sales conversion, 75% improvement in customer management efficiency'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-300 mb-2">
                        {language === 'zh-HK' ? '?½ï¸?é¤é£²æ¥­ï?è¨‚å–®?•ç??ªå??? : '?½ï¸?F&B: Order Processing Automation'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          'ä¸€å®¶é€??é¤å»³ä½¿ç”¨n8n??¥å¤–è³£å¹³å°?POSç³»çµ±?Œå??¿é¡¯ç¤ºç³»çµ±ã€‚æ??‰è??®æ??ªå??´å??°çµ±ä¸€?…è??†æ?ç¨‹ï?ä¸¦å³?‚æ›´?°åº«å­˜å??·å”®?¸æ??? :
                          'A restaurant chain uses n8n to connect delivery platforms, POS systems, and kitchen display systems. All orders are automatically integrated into a unified processing workflow with real-time inventory and sales data updates.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?æ?ï¼? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          'è¨‚å–®?•ç??‚é?æ¸›å?50%ï¼ŒéŒ¯èª¤ç??ä?85%ï¼Œç??‹æ??‡æ???0%' :
                          '50% reduction in order processing time, 85% decrease in error rate, 70% improvement in operational efficiency'
                        }
                      </p>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.6 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'n8n?…å­¸ç¿’è?æºå??¯æ´' : 'n8n Learning Resources and Support'}
                  </motion.h3>

                  <div className="bg-gray-900/50 border-l-4 border-purple-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">
                      {language === 'zh-HK' ? '?? ?¨è–¦å­¸ç?è·¯å?' : '?? Recommended Learning Path'}
                    </h4>
                    <div className="space-y-3 text-gray-200">
                      <div className="flex items-start gap-3">
                        <span className="text-blue-400 font-bold">1.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? 'å®˜æ–¹?‡æ?ï¼? : 'Official Documentation: '}</strong>
                          <span>{language === 'zh-HK' ? 'å¾åŸºç¤æ?å¿µé?å§‹ï?äº†è§£ç¯€é»ã€å·¥ä½œæ?ç¨‹å???¥?? : 'Start with basic concepts, understand nodes, workflows, and connectors'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-400 font-bold">2.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? 'å¯¦ä??™å­¸ï¼? : 'Hands-on Tutorials: '}</strong>
                          <span>{language === 'zh-HK' ? 'è·Ÿä?å®˜æ–¹?™å­¸?µå»ºä½ å?ç¬¬ä??‹å·¥ä½œæ?ç¨? : 'Follow official tutorials to create your first workflow'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold">3.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? 'ç¤¾ç¾¤?¯æ´ï¼? : 'Community Support: '}</strong>
                          <span>{language === 'zh-HK' ? '? å…¥Discordç¤¾ç¾¤ï¼Œè??¶ä??¨æˆ¶äº¤æ?ç¶“é?' : 'Join Discord community to exchange experiences with other users'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-orange-400 font-bold">4.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? '?²é??‰ç”¨ï¼? : 'Advanced Applications: '}</strong>
                          <span>{language === 'zh-HK' ? 'å­¸ç?JavaScriptè¡¨é?å¼å??ªå?ç¾©ç?é»é??? : 'Learn JavaScript expressions and custom node development'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? n8n?©å?ä½ å?ä¼æ¥­?ï?' : '?? Is n8n Right for Your Business?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        'n8n?¹åˆ¥?©å??‰ä»¥ä¸‹é?æ±‚å?é¦™æ¸¯ä¼æ¥­ï¼? :
                        'n8n is particularly suitable for Hong Kong businesses with the following needs:'
                      }
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-cyan-300 mb-2">
                          {language === 'zh-HK' ? '???©å?ä½¿ç”¨n8n?…æ?æ³ï?' : '??Good fit for n8n:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? '?€è¦é?åº¦è‡ªå®šç¾©?…è‡ª?•å?è§?±º?¹æ?' : 'Need highly customized automation solutions'}</li>
                          <li>??{language === 'zh-HK' ? '?è??¸æ?å®‰å…¨?Œéš±ç§? : 'Value data security and privacy'}</li>
                          <li>??{language === 'zh-HK' ? '?‰æ?è¡“å??Šæ”¯?? : 'Have technical team support'}</li>
                          <li>??{language === 'zh-HK' ? '?ç??‰é?ä½†é?æ±‚è??? : 'Limited budget but complex requirements'}</li>
                          <li>??{language === 'zh-HK' ? '?€è¦æ•´?ˆå??‹å…§?¨ç³»çµ? : 'Need to integrate multiple internal systems'}</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-300 mb-2">
                          {language === 'zh-HK' ? '? ï? ?¯èƒ½ä¸é©?ˆå??…æ?ï¼? : '? ï? May not be suitable if:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? '?˜é?ç¼ºä??€è¡“è??? : 'Team lacks technical background'}</li>
                          <li>??{language === 'zh-HK' ? '?€è¦å³?‚ä?ç·šä½¿?? : 'Need immediate deployment'}</li>
                          <li>??{language === 'zh-HK' ? '?ªé?è¦ç°¡?®å??ªå??–å??? : 'Only need simple automation features'}</li>
                          <li>??{language === 'zh-HK' ? '?¡æ??•å…¥?‚é?å­¸ç?' : 'Cannot invest time in learning'}</li>
                          <li>??{language === 'zh-HK' ? '?å¥½å®Œå…¨è¨—ç®¡?…è§£æ±ºæ–¹æ¡? : 'Prefer fully managed solutions'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? æº–å??‹å?ä½ å?n8n?ªå??–ä??…ï?' : '?? Ready to Start Your n8n Automation Journey?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        'n8n?ºé?æ¸¯ä?æ¥­æ?ä¾›å?ä¸€?‹å¼·å¤§è€Œé?æ´»å??ªå??–å¹³?°ã€‚ç„¡è«–ä?ä¿‚æƒ³è¦å??¨æ§?¶è‡ªå·±å??¸æ?ï¼Œé?ä¿‚é?è¦é?åº¦è‡ªå®šç¾©?…å·¥ä½œæ?ç¨‹ï?n8n?½èƒ½å¤ æ»¿è¶³ä??…é?æ±‚ã€‚é??¶å­¸ç¿’æ›²ç·šå¯?½æ??¶ä?å·¥å…·ç¨é?ï¼Œä?ä¸€?¦æ??¡ï?ä½ å??æ??¡é??…è‡ª?•å??¯èƒ½?§ã€? :
                        'n8n provides Hong Kong businesses with a powerful and flexible automation platform. Whether you want complete control over your data or need highly customized workflows, n8n can meet your needs. While the learning curve may be steeper than other tools, once mastered, you\'ll have unlimited automation possibilities.'
                      }
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">?”§</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?è²»?‹æ?ä½¿ç”¨' : 'Free Open Source Usage'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">?›¡ï¸?/span>
                        <span className="text-sm">{language === 'zh-HK' ? 'å®Œå…¨?¸æ??§åˆ¶' : 'Complete Data Control'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">?™ï?</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?¡é??ªå?ç¾©å¯?? : 'Unlimited Customization Possibilities'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>?³ä?è§?›´å¤šé??¼n8n?Œå…¶ä»–è‡ª?•å?å·¥å…·?…æ?è¼ƒï??œæ³¨?‘å??…Instagram <strong className="text-blue-300">@ai_formula_</strong> ?²å??´å?æ·±åº¦?€è¡“å??å?å¯¦ç”¨?™å­¸??/> :
                      <>Want to learn more about n8n and comparisons with other automation tools? Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more in-depth technical analysis and practical tutorials.</>
                    }
                  </p>
                </>
              )}

              {/* ç¬?ç¯‡æ?ç« ï??ªå??–åŸºç¤çŸ¥è­?*/}
              {post.id === 5 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?ªå??–ä?ä¹œå˜¢ï¼? : 'What is Automation?'}
                  </motion.h2>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      '?ªå??–ä??‡ä½¿?¨æ?è¡“å??·è?ä»»å?ï¼Œæ?å°‘æ?æ¶ˆé™¤äººå·¥å¹²é??…é?è¦ã€‚å?å·¥æ¥­?©å‘½?‹å?ï¼Œè‡ª?•å?ä¸€?´ä??¨å?ç¤¾æ??²æ­¥?…é?è¦å??ã€‚ä??¥ï??¨ä?äººå·¥?ºèƒ½?Œæ??¨å­¸ç¿’æ?è¡“å??¼å?ï¼Œè‡ª?•å?å·²ç?å¾ç°¡?®å?æ©Ÿæ¢°?ä??¼å??°è??œå??ºèƒ½æ±ºç?ç³»çµ±?? :
                      'Automation refers to the use of technology to perform tasks with reduced or eliminated human intervention. Since the Industrial Revolution, automation has been a crucial force driving social progress. Today, with the development of artificial intelligence and machine learning technologies, automation has evolved from simple mechanical operations to complex intelligent decision-making systems.'
                    }
                  </p>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">
                      {language === 'zh-HK' ? '?? ?ªå??–å??¸å?å®šç¾©' : '?? Core Definition of Automation'}
                    </h3>
                    <div className="space-y-4 text-gray-200">
                      <p>
                        <strong>{language === 'zh-HK' ? '?€è¡“å±¤?¢ï?' : 'Technical Aspect: '}</strong>
                        {language === 'zh-HK' ? 
                          '?é?è»Ÿä»¶?ç¡¬ä»¶æ??…å…©?…ç??ˆï??ªå??·è??è??§ã€è??‡æ€§æ??…å¯?æ¸¬?…ä»»?™ã€? :
                          'Through software, hardware, or a combination of both, automatically execute repetitive, rule-based, or predictable tasks.'
                        }
                      </p>
                      <p>
                        <strong>{language === 'zh-HK' ? '?†æ¥­å±¤é¢ï¼? : 'Business Aspect: '}</strong>
                        {language === 'zh-HK' ? 
                          '?å??ˆç??æ?å°‘éŒ¯èª¤ã€é?ä½æ??¬ï??‹æ”¾äººå?è³‡æ??»è??†æ›´?‰åƒ¹?¼å?å·¥ä??? :
                          'Improve efficiency, reduce errors, lower costs, and free up human resources to handle more valuable work.'
                        }
                      </p>
                      <p>
                        <strong>{language === 'zh-HK' ? 'ç¤¾æ?å±¤é¢ï¼? : 'Social Aspect: '}</strong>
                        {language === 'zh-HK' ? 
                          '?¹è?å·¥ä?æ¨¡å?ï¼Œæ??‡ç?æ´»è³ª?ï??¨å?ç¶“æ??¼å??Œæ?è¡“å‰µ?°ã€? :
                          'Transform work patterns, improve quality of life, and drive economic development and technological innovation.'
                        }
                      </p>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?ªå??–å??¼å?æ­·ç?' : 'Evolution of Automation'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-semibold text-orange-300 mb-3">
                        {language === 'zh-HK' ? '?­ ç¬¬ä??æ®µï¼šå·¥æ¥­è‡ª?•å?ï¼?760-1840ï¼? : '?­ Phase 1: Industrial Automation (1760-1840)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'å·¥æ¥­?©å‘½å¸¶å??—ç¬¬ä¸€æ³¢è‡ª?•å?æµªæ½®?‚è’¸æ±½æ??ç´¡ç¹”æ??Œç??¢ç??…å‡º?¾ï?å¤§å¤§?å??—è£½? æ¥­?…æ??‡ã€‚å‘¢?‹æ??Ÿå??ªå??–ä¸»è¦ä?æ©Ÿæ¢°?–ï??¨æ??¨ä»£?¿äºº?›é€²è??è??§å?é«”å??å??? :
                          'The Industrial Revolution brought the first wave of automation. The emergence of steam engines, textile machines, and production lines greatly improved manufacturing efficiency. Automation during this period was mainly mechanization, using machines to replace human labor for repetitive physical work.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?œéµå½±éŸ¿ï¼? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          'å¤§è?æ¨¡ç??¢ã€å?å¸‚å??å??•å?å·? :
                          'Mass production, urbanization, division of labor'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '??ç¬¬ä??æ®µï¼šé›»æ°???ªå??–ï?1870-1914ï¼? : '??Phase 2: Electrical Automation (1870-1914)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?»å??…æ™®?Šå¸¶?Ÿå?ç¬¬ä?æ¬¡å·¥æ¥­é©?½ã€‚é›»?•æ??é›»?ˆå??»è©±?…ç™¼?ï?ä»¤è‡ª?•å?ç³»çµ±?´å?ç²¾ç¢º?Œå¯? ã€‚æ?æ°´ç??Ÿç”¢?¹å??…å‡º?¾ï??²ä?æ­¥æ??‡å??Ÿç”¢?ˆç??? :
                          'The popularization of electricity brought the Second Industrial Revolution. The invention of electric motors, electric lights, and telephones made automation systems more precise and reliable. The emergence of assembly line production further improved production efficiency.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?œéµå½±éŸ¿ï¼? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          'æ¨™æ??–ç??¢ã€å?è³ªæ§?¶ã€è?æ¨¡ç?æ¿? :
                          'Standardized production, quality control, economies of scale'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?’» ç¬¬ä??æ®µï¼šæ•¸ä½è‡ª?•å?ï¼?950-2000ï¼? : '?’» Phase 3: Digital Automation (1950-2000)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?»è…¦?Œé›»å­æ?è¡“å??¼å??‹å??—æ•¸ä½è‡ª?•å??‚ä»£?‚å¯ç·¨ç??è¼¯?§åˆ¶?¨ï?PLCï¼‰ã€æ??¨äºº?Œé›»?¦è??©è£½? ï?CAMï¼‰å??ºç¾ï¼Œä»¤?ªå??–ç³»çµ±æ›´? æ™º?½å??ˆæ´»?? :
                          'The development of computers and electronic technology ushered in the digital automation era. The emergence of Programmable Logic Controllers (PLCs), robots, and Computer-Aided Manufacturing (CAM) made automation systems more intelligent and flexible.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?œéµå½±éŸ¿ï¼? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          'ç²¾å?è£½é€ ã€æ??§ç??¢ã€è?è¨Šå?ç®¡ç?' :
                          'Precision manufacturing, flexible production, information management'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?? ç¬¬å??æ®µï¼šæ™º?½è‡ª?•å?ï¼?000-?¾åœ¨ï¼? : '?? Phase 4: Intelligent Automation (2000-Present)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'äººå·¥?ºèƒ½?æ??¨å­¸ç¿’å??©è¯ç¶²æ?è¡“å?çµå?ï¼Œå‰µ? å??ºèƒ½?ªå??–å??°æ?ä»?€‚ç³»çµ±å??®æ­¢?½å??·è??è¨­ä»»å?ï¼Œä»²?½å?å­¸ç??é©?‰å??šå‡º?ºèƒ½æ±ºç??? :
                          'The combination of artificial intelligence, machine learning, and IoT technologies has created a new era of intelligent automation. Systems can not only execute preset tasks but also learn, adapt, and make intelligent decisions.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?œéµå½±éŸ¿ï¼? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          '?ºèƒ½æ±ºç??é?æ¸¬å??ã€å€‹æ€§å??å?' :
                          'Intelligent decision-making, predictive analytics, personalized services'
                        }
                      </div>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'é»è§£?‘å??€è¦è‡ª?•å?ï¼? : 'Why Do We Need Automation?'}
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-blue-300 mb-4">
                        {language === 'zh-HK' ? '?’¼ ?†æ¥­å±¤é¢?…é?è¦? : '?’¼ Business Level Needs'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? '?å??ˆç?ï¼? : 'Improve Efficiency: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '24/7ä¸é??·é?ä½œï??•ç??Ÿåº¦æ¯”äººå·¥å¿«?¸å€? : '24/7 continuous operation, processing speed several times faster than manual work'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? 'æ¸›å??¯èª¤ï¼? : 'Reduce Errors: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? 'æ¶ˆé™¤äººç‚º?¯èª¤ï¼Œç¢ºä¿ä??´æ€§å?æº–ç¢º?? : 'Eliminate human errors, ensure consistency and accuracy'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?ä??æœ¬ï¼? : 'Lower Costs: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? 'æ¸›å?äººå??æœ¬ï¼Œæ??‡è?æºåˆ©?¨ç?' : 'Reduce labor costs, improve resource utilization'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?´å??½å?ï¼? : 'Scale Capability: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? 'è¼•é??‰å?æ¥­å?å¢é•·ï¼Œç„¡?€å¤§é?å¢å?äººæ?' : 'Easily handle business growth without significant staff increases'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-green-300 mb-4">
                        {language === 'zh-HK' ? '?‘¥ ç¤¾æ?å±¤é¢?…é?è¦? : '?‘¥ Social Level Needs'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? 'è§?”¾?å??›ï?' : 'Free Up Labor: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? 'è®“äººé¡å?æ³¨æ–¼?µæ??Œç??¥æ€§å·¥ä½? : 'Allow humans to focus on creative and strategic work'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?å?å®‰å…¨ï¼? : 'Improve Safety: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? 'æ¸›å??±éšª?°å?ä¸‹å?äººå·¥?ä?' : 'Reduce manual operations in hazardous environments'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? 'ä¿ƒé€²å‰µ?°ï?' : 'Foster Innovation: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?¨å??€è¡“ç™¼å±•å??°ç”¢æ¥­å??ºç¾' : 'Drive technological development and emergence of new industries'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?¹å??Ÿæ´»ï¼? : 'Improve Life: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?ä??´å¥½?…ç”¢?å??å?é«”é?' : 'Provide better products and service experiences'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?ªå??–å?é¡å??Œæ??? : 'Types and Applications of Automation'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-cyan-400">
                      <h4 className="font-semibold text-cyan-300 mb-3">
                        {language === 'zh-HK' ? '?­ è£½é€ æ¥­?ªå??? : '?­ Manufacturing Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?…æ‹¬æ©Ÿå™¨äººè??ç??è‡ª?•å??‰å„²ç³»çµ±?å?è³ªæª¢æ¸¬ç³»çµ±ç??‚å¹«?©è£½? å??å??¢é??ç¢ºä¿å?è³ªä??´æ€§ï?ä¸¦æ?å°‘ç??¢æ??¬ã€? :
                          'Includes robotic assembly lines, automated warehouse systems, quality inspection systems, etc. Helps manufacturers increase output, ensure quality consistency, and reduce production costs.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?‰ç”¨ä¾‹å?ï¼? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          'æ±½è??Ÿç”¢ç·šã€é›»å­ç”¢?ç?è£ã€é??å?è£? :
                          'Automotive production lines, electronic product assembly, food packaging'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?’¼ è¾¦å…¬å®¤è‡ª?•å?' : '?’¼ Office Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'æ¶µè??‡æ??•ç??æ•¸?šé??¥ã€å ±?Šç??ã€éƒµä»¶ç®¡?†ç??¥å¸¸è¾¦å…¬ä»»å??‚é€é?è»Ÿä»¶å·¥å…·?Œå·¥ä½œæ?ç¨‹è‡ª?•å?ï¼Œå¤§å¹…æ??‡è¾¦?¬æ??‡ã€? :
                          'Covers daily office tasks such as document processing, data entry, report generation, email management, etc. Significantly improves office efficiency through software tools and workflow automation.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?‰ç”¨ä¾‹å?ï¼? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?ªå??è??µä»¶?æ•¸?šå??å ±?Šã€ç™¼ç¥¨è??? :
                          'Auto-reply emails, data analysis reports, invoice processing'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?? ?¶å”®æ¥­è‡ª?•å?' : '?? Retail Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?…æ‹¬åº«å?ç®¡ç??è??®è??†ã€å®¢?¶æ??™ã€åƒ¹?¼å„ª?–ç??‚å¹«?©é›¶?®å??å?å®¢æˆ¶é«”é?ï¼Œå„ª?–ç??‹æ??‡ï?ä¸¦å?? éŠ·?®æ”¶?¥ã€? :
                          'Includes inventory management, order processing, customer service, price optimization, etc. Helps retailers improve customer experience, optimize operational efficiency, and increase sales revenue.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?‰ç”¨ä¾‹å?ï¼? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?ªåŠ©çµå¸³?æ™º?½æ¨?¦ã€åº«å­˜è?è²¨æ??? :
                          'Self-checkout, intelligent recommendations, inventory restocking alerts'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-semibold text-orange-300 mb-3">
                        {language === 'zh-HK' ? '?¥ ?å?æ¥­è‡ª?•å?' : '?¥ Service Industry Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'æ¶µè?å®¢æˆ¶?å??é?ç´„ç®¡?†ã€æ”¯ä»˜è??†ã€å€‹äºº?–æ??™ç??‚é€é??Šå¤©æ©Ÿå™¨äººã€è‡ª?©æ??™ç³»çµ±ç?å·¥å…·ï¼Œæ??‡æ??™è³ª?å?å®¢æˆ¶æ»¿æ?åº¦ã€? :
                          'Covers customer service, appointment management, payment processing, personalized services, etc. Improves service quality and customer satisfaction through chatbots, self-service systems, and other tools.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?‰ç”¨ä¾‹å?ï¼? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '24å°æ?å®¢æ?æ©Ÿå™¨äººã€ç¶²ä¸Šé?ç´„ç³»çµ±ã€è‡ª?•æ”¯ä»? :
                          '24-hour customer service bots, online booking systems, automatic payments'
                        }
                      </div>
                    </div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.0 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'å¯¦æ–½?ªå??–å??‘æˆ°?Œè§£æ±ºæ–¹æ¡? : 'Challenges and Solutions in Implementing Automation'}
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-red-300 mb-4">
                        {language === 'zh-HK' ? '? ï? å¸¸è??‘æˆ°' : '? ï? Common Challenges'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? '?æ??•è?ï¼? : 'Initial Investment: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?€è¦ç›¸?¶å?è³‡é??•å…¥è³¼è²·è¨­å??Œè?ä»? : 'Requires significant capital investment in equipment and software'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?€è¡“è??œæ€§ï?' : 'Technical Complexity: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?€è¦å?æ¥­çŸ¥è­˜å?è¨­è??Œç¶­è­·ç³»çµ? : 'Requires professional knowledge to design and maintain systems'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?¡å·¥?—æ?ï¼? : 'Employee Resistance: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?”å?å·¥ä?è¢«å?ä»???—æ??¹è?' : 'Fear of job displacement, resistance to change'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? 'ç³»çµ±?´å?ï¼? : 'System Integration: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?°è?ç³»çµ±?…å…¼å®¹æ€§å?é¡? : 'Compatibility issues between new and existing systems'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-green-300 mb-4">
                        {language === 'zh-HK' ? '??è§?±º?¹æ?' : '??Solutions'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? '?†é?æ®µå¯¦?½ï?' : 'Phased Implementation: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? 'å¾å?è¦æ¨¡?‹å?ï¼Œé€æ­¥?´å?' : 'Start small-scale, gradually expand'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? 'å°ˆæ¥­è«®è©¢ï¼? : 'Professional Consultation: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? 'å°‹æ?å°ˆæ¥­?˜é??…å¹«?©å??‡å?' : 'Seek help and guidance from professional teams'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?¡å·¥?¹è?ï¼? : 'Employee Training: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?ä??¹è?ï¼Œå¹«?©å“¡å·¥é©?‰æ–°?€è¡? : 'Provide training to help employees adapt to new technologies'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?¸æ??ˆé©å·¥å…·ï¼? : 'Choose Right Tools: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?¹æ?å¯¦é??€æ±‚é¸?‡æ??©å??…è§£æ±ºæ–¹æ¡? : 'Select the most suitable solutions based on actual needs'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? ?ªå??–å??ªä?è¶¨å‹¢' : '?? Future Trends of Automation'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-cyan-300 mb-2">
                          {language === 'zh-HK' ? '?€è¡“ç™¼å±•æ–¹?‘ï?' : 'Technology Development Directions:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? 'äººå·¥?ºèƒ½?Œæ??¨å­¸ç¿’å?æ·±åº¦?´å?' : 'Deep integration of AI and machine learning'}</li>
                          <li>??{language === 'zh-HK' ? '?©è¯ç¶²ï?IoTï¼‰è¨­?™å??®å??‰ç”¨' : 'Widespread application of IoT devices'}</li>
                          <li>??{language === 'zh-HK' ? '?²ç«¯?ªå??–å¹³?°å??ç?' : 'Maturation of cloud automation platforms'}</li>
                          <li>??{language === 'zh-HK' ? 'ä½ä»£ç¢??¡ä»£ç¢¼é??¼å·¥?? : 'Low-code/no-code development tools'}</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">
                          {language === 'zh-HK' ? '?‰ç”¨è¶¨å‹¢ï¼? : 'Application Trends:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? 'è¶…ç??ªå??–ï?Hyperautomationï¼? : 'Hyperautomation'}</li>
                          <li>??{language === 'zh-HK' ? '?ºèƒ½æµç??ªå??–ï?IPAï¼? : 'Intelligent Process Automation (IPA)'}</li>
                          <li>??{language === 'zh-HK' ? '?ªé©?‰è‡ª?•å?ç³»çµ±' : 'Adaptive automation systems'}</li>
                          <li>??{language === 'zh-HK' ? 'äººæ??”ä??…æ–°æ¨¡å?' : 'New models of human-machine collaboration'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?’¡ ?‹å?ä½ å??ªå??–ä??? : '?’¡ Start Your Automation Journey'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        '?ªå??–å?ä¿‚ä??‹é¸?‡ï??Œä??¾ä»£ä¼æ¥­?Ÿå??Œç™¼å±•å?å¿…é??ã€‚ç„¡è«–ä?ä¿‚å¤§ä¼æ¥­?„ä?ä¸­å?ä¼ï??½æ?è©²é?å§‹è€ƒæ…®é»æ¨£å°‡è‡ª?•å??å…¥?°ä??…æ¥­?™æ?ç¨‹ä¸­?‚è?ä½ï??ªå??–å??®æ??”ä??–ä»£äººé?ï¼Œè€Œä?è®“äººé¡èƒ½å¤ å?æ³¨æ–¼?´æ??¹å€¼ã€æ›´?‰å‰µ?å?å·¥ä??? :
                        'Automation is not a choice, but a necessity for modern business survival and development. Whether you\'re a large enterprise or SME, you should start considering how to integrate automation into your business processes. Remember, the goal of automation is not to replace humans, but to allow humans to focus on more valuable and creative work.'
                      }
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">??</span>
                        <span className="text-sm">{language === 'zh-HK' ? 'è©•ä¼°?¾æ?æµç?' : 'Assess Current Processes'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">?¯</span>
                        <span className="text-sm">{language === 'zh-HK' ? 'ç¢ºå??ªå??–ç›®æ¨? : 'Define Automation Goals'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">??</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?¸æ??ˆé©å·¥å…·' : 'Choose Right Tools'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>æº–å??‹å?ä½ å??ªå??–è??‹ï??œæ³¨?‘å??…Instagram <strong className="text-blue-300">@ai_formula_</strong> ?²å??´å??ªå??–çŸ¥è­˜å?å¯¦ç”¨?‡å???/> :
                      <>Ready to start your automation transformation? Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more automation knowledge and practical guides.</>
                    }
                  </p>
                </>
              )}

              {/* ?¶ä??‡ç??„é?è¨­å…§å®?*/}
              {post.id !== 1 && post.id !== 2 && post.id !== 3 && post.id !== 4 && post.id !== 5 && post.id !== 6 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    ?ºä?éº¼é¸?‡AI Formulaï¼?
                  </motion.h2>
                  
                  <p className="text-lg">
                    ?¶ä?æ­?œ¨?±è??™ç??‡ç??‚ï?AI Formula?„AI?€è¡“å·²ç¶“åœ¨?ºç„¡?¸ä?æ¥­å‰µ? åƒ¹?¼ã€‚åœ¨é¦™æ¸¯?™å€‹ç¬?¯è¬è®Šç??†æ¥­?°å?ä¸­ï??Ÿåº¦å°±æ˜¯ä¸€?‡ã€‚AI Formula ä¸åª?¯ä?å®¶AI?¬å¸ï¼Œæ??‘æ˜¯ä½ åœ¨?¸ä?è½‰å?è·¯ä??€?¯é??„å¤¥ä¼´ï?å°ˆé??ºé?æ¸¯ä?æ¥­æ?ä¾›é??ˆç?AI?ªå??–è§£æ±ºæ–¹æ¡ˆã€?
                  </p>
                </>
              )}

              {/* ç¬?ç¯‡æ?ç« ï?Neuralink */}
              {post.id === 6 && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {isZhTW ? '?è?' : 'Introduction'}
                    </h2>
                    <p className="text-lg leading-relaxed">
                      {isZhTW ? 
                        'Elon Musk ?—ä??™å??šç›®?…ç??©ç??€?¬å¸ Neuralinkï¼Œå?æ¬¡å?ç§‘å¹»å°èªªä¸­å??…ç??‰è??°ç¾å¯¦ã€‚è??Ÿï?è©²å…¬?¸å…¬å¸ƒä??¶è…¦æ©Ÿä??¢ï?Brain-Computer Interface, BCIï¼‰æ?è¡“å?ä¸€ç³»å??å¤§?²å?ï¼Œä??…å?ç¤ºä?ä»¤äººé©šè??…æ??¨æ??›ï??´æ??ºä?ä¸€ä»½é?è¦†æ€§å??·é??¼å??å??‚é€™ç??‡ç?å°‡æ?æ·±å…¥?–æ? Neuralink ?®å??…æ?è¡“ç??´ã€æœªä¾†å?å®å¤§é¡˜æ™¯ï¼Œä»¥?Šé€™ä??‡è?å¾Œæ?å¼•ç™¼?…æ·±?»å€«ç?è¨è??? :
                        'Elon Musk\'s highly anticipated biotech company Neuralink has once again brought science fiction scenarios closer to reality. Recently, the company announced a series of major breakthroughs in its Brain-Computer Interface (BCI) technology, not only demonstrating surprising application potential but also presenting a disruptive long-term development blueprint. This article will deeply analyze Neuralink\'s current technological breakthroughs, future grand vision, and the profound ethical discussions triggered by all of this.'
                      }
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {isZhTW ? 'ç¬¬ä?ç« ï??¶ä??…ç??´â€”â€”ç??€å¦‚ä??ºç??½è³¦äºˆæ–°?¯èƒ½' : 'Chapter 1: Current Breakthroughs - How Technology Brings New Possibilities to Life'}
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                      {isZhTW ? 
                        '?¹æ? Neuralink ?¼å??…å ±?Šï??®å?å·²æ?ä¸ƒå?å¿—é??…æ??Ÿæ??¥å…¶?¦æ?ä»‹é¢?¶ç??‚å‘¢?‹å??ä?å¯¦é?å®¤å…§?…ç?è«–ï??Œä?å·²ç??ºäººé«”ä?å¯¦ç¾?…æ?è¡“ã€‚å ±?Šä¸­å±•ç¤º?…æ??œï?æ¸…æ™°?°æ?ç¹ªå‡º BCI ?€è¡“å??æ??‰ç”¨æ½›å?ï¼? :
                        'According to reports released by Neuralink, seven volunteers have successfully implanted their brain-computer interface chips. This is no longer a laboratory theory, but a technology that has been realized in the human body. The results shown in the report clearly depict the initial application potential of BCI technology:'
                      }
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-8">
                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-300 mb-4">
                          {isZhTW ? '?? ?å¿µ?æ§' : '?? Mind Control'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            'æ¤å…¥?…èƒ½å¤ å–®?‘æ€æƒ³ï¼Œå°±?ä??»è…¦?Šæˆ²?æ§?¶æ?æ¢°è??²è?ç²¾ç´°?…æ›¸å¯«ï??šè‡³ä½¿ç”¨å°ˆæ¥­??3D è¨­è?è»Ÿä»¶?‚å‘¢?²æ?ä½œæ??³è?å¤§è…¦?…æ?ä»¤ï??¯ä»¥ç¹é??³çµ±?…èº«é«”é??¶ï??´æ¥è½‰å??ºæ•¸ç¢¼ä??Œä¸­?…è??•ã€? :
                            'Implant recipients can operate computer games, control robotic arms for precise writing, and even use professional 3D design software using thought alone. These operations mean that brain commands can bypass traditional physical limitations and be directly converted into actions in the digital world.'
                          }
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-300 mb-4">
                          {isZhTW ? '?¥ ?«ç??‰ç”¨' : '?¥ Medical Applications'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?®å??€è¡“å?é¦–è??®æ?ï¼Œä??ºå??Šé??å‚·?–æ¼¸?ç?ï¼ˆALSï¼‰ç??¾ç??Œå??´åš´?é??•é?ç¤™å???€…ï??ä?ä¸€?‹å…¨?°å?æºé€šå?äº’å?æ¸ é??‚å??¼é•·å¹´ç„¡æ³•è‡ª?±æ´»?•æ?è¡¨é??…äºº?Ÿè?ï¼Œå‘¢?…æ?è¡“å??®æ­¢ä¿‚æ¢å¾©å??½ï??´æ??³è??æ‹¾å°Šåš´?Œå??Œä??Œå?æ¬¡é€???…å??›ã€? :
                            'The primary goal of current technology is to provide a completely new communication and interaction channel for patients with severe motor disabilities caused by spinal cord injuries or diseases like ALS. For people who have been unable to move freely or express themselves for years, this technology is not just about restoring function, but also represents hope for regaining dignity and reconnecting with the world.'
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {isZhTW ? 'ç¬¬ä?ç« ï??ªä??å??”â€”é€šå??Œå…¨?¦æ¥??€å?å®å¤§é¡˜æ™¯' : 'Chapter 2: Future Blueprint - The Grand Vision Towards "Whole Brain Interface"'}
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                      {isZhTW ? 
                        'Neuralink ?„ç›®?‰é¡¯?¶ä?æ­¢æ–¼æ­¤ã€‚çŸ­?Ÿå??«ç??‰ç”¨?ªä?ç¬¬ä?æ­¥ï??¶æ?çµ‚ç›®æ¨™ä?å»ºç?ä¸€?‹é©?½æ€§å??Œå…¨?¦æ¥??€ï?Whole Brain Interfaceï¼‰ï?å¾¹å??¹è?äººé??Œè?è¨Šã€AI ä¹‹é??…é?ä¿‚ã€‚æ ¹?šä½¢?‹æ??ºå?è·¯ç??–ï??ªä?å¹¾å¹´?…é??µç?é»å??¬ï?' :
                        'Neuralink\'s vision clearly extends beyond this. Short-term medical applications are just the first step, with the ultimate goal being to establish a revolutionary "Whole Brain Interface" that completely changes the relationship between humans, information, and AI. According to their proposed roadmap, key milestones in the coming years include:'
                      }
                    </p>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-orange-300 mb-4">
                          {isZhTW ? '??ï¸?2026å¹´ï??ŒBlindsight?è??? : '??ï¸?2026: "Blindsight" Project'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?¢å€‹è??ƒå??®æ?æ¥µå…·?å?ï¼šè?è®“å¤±?äººå£«é?è¦‹å??ã€‚é€é?å°‡è?è¦ºè??Ÿç›´?¥å‚³?åˆ°å¤§è…¦?…è?è¦ºçš®å±¤ï?Blindsight ?”å–®æ­¢å??›æ¢å¾©åŸº?¬è??›ï??¶é•·? ç›®æ¨™æ›´ä¿‚è?å¯¦ç¾è¶…è?æ­?¸¸äººé?ç¯„å??…ã€Œè?äººè?è¦ºã€ï?ä¾‹å??ŸçŸ¥ç´…å?ç·šæ?ç´«å?ç·šã€? :
                            'This project has an extremely ambitious goal: to restore sight to the blind. By directly transmitting visual signals to the brain\'s visual cortex, Blindsight not only hopes to restore basic vision, but its long-term goal is to achieve "superhuman vision" beyond normal human range, such as perceiving infrared or ultraviolet light.'
                          }
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
                          {isZhTW ? '?? 2028å¹´ï?äººè…¦??AI é«˜é€Ÿæ•´?? : '?? 2028: High-Speed Human Brain and AI Integration'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            'è·¯ç??–å?ä¸‹ä??‹é?ç¨‹ç?ï¼Œä?è¦å¯¦?¾äºº?¦å?äººå·¥?ºèƒ½ï¼ˆAIï¼‰ä??“å?é«˜é€Ÿæ•¸?šå‚³è¼¸ã€‚å‘¢?‹æ?å¿µæ??³è?ï¼Œäººé¡å??è€ƒé€Ÿåº¦å°‡å¯ä»¥å?æ©Ÿå™¨?…é?ç®—é€Ÿåº¦?‡é?ï¼Œå??Œå¾¹åº•æ”¹è®Šå­¸ç¿’ã€æ•¸?šè??†ç??³ä?æºé€šå??¹æœ¬æ¨¡å??‚å–º?¢å€‹è¨­?³ä¸­ï¼Œè?è¨€?šè‡³?¯èƒ½è®Šå?å¤šé?ï¼Œå??ºæ€æƒ³?¯ä»¥ä»¥ç??¸æ??…å½¢å¼ç›´?¥å…±äº«ã€? :
                            'The next milestone in the roadmap is to achieve high-speed data transmission between the human brain and artificial intelligence (AI). This concept means that human thinking speed could match machine computing speed, fundamentally changing the basic patterns of learning, data processing, and even communication. In this vision, language might even become redundant, as thoughts could be directly shared in pure data form.'
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      {isZhTW ? 'ç¬¬ä?ç« ï?å»???…è¿´?¿â€”â€”æ??‡è?å¾Œå??«ç??‘æˆ°' : 'Chapter 3: Widespread Response - Ethical Challenges Behind Opportunities'}
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                      {isZhTW ? 
                        'Neuralink ?ç¹ª?…æœªä¾†ç„¡?‘ä»¤äººè?å¥®ï?ä½†å??‚äº¦å¼•ç™¼äº†ç??€?Œã€å­¸è¡“ç?ä»¥è‡³?´å€‹ç¤¾?ƒå?å»??è¨è??Œæ??‚ã€‚ç•¶ç§‘æ??‰èƒ½?›è??–ç??³æ”¹å¯«æ??‹å?å¤§è…¦?‚ï?ä¸€ç³»å?è¤‡é??…å€«ç??é?äº¦éš¨ä¹‹æµ®?¾ï?' :
                        'The future depicted by Neuralink is undoubtedly exciting, but it has also sparked widespread discussion and concern in the tech world, academia, and society as a whole. When technology has the ability to read or even rewrite our brains, a series of complex ethical issues emerge:'
                      }
                    </p>

                    <div className="grid md:grid-cols-1 gap-6">
                      <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-red-300 mb-4">
                          {isZhTW ? '?? ç§éš±?‡å??? : '?? Privacy and Security'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            'å¦‚æ??æƒ³?¯ä»¥è¢«æ•¸?šå?ï¼Œå??Œæ€æƒ³?±ç??ä»²å­˜å?å­˜åœ¨ï¼Ÿé??‹æ?æ¬Šå??–æ??‹è…¦?¥é¢?…æ•¸?šï??¢å•²?¸æ??ƒå??ƒè¢«é»‘å®¢?¥ä¾µ?è¢«æ¿«ç”¨ï¼Œç??³è¢«?¨ä???§å·¥å…·ï¼? :
                            'If thoughts can be digitized, does "mental privacy" still exist? Who has the right to access the data in our brains? Could this data be hacked, misused, or even used as surveillance tools?'
                          }
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-purple-300 mb-4">
                          {isZhTW ? '?? äººé??…å?ç¾? : '?? Definition of Humanity'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?¶æ??‹å?å¤§è…¦?¯ä»¥?é?ç§‘æ?ä¸æ–·?‡ç?ï¼Œç??³å? AI ?å?ï¼Œäººé¡å?æ©Ÿå™¨ä¹‹é??…ç?ç·šå??ƒå–º?Šåº¦ï¼Ÿæ??‹å??ªæ??è??æ??Ÿå??ªç”±?å??ƒå??ƒå??°å½±?¿ï?' :
                            'When our brains can be continuously upgraded through technology, even merged with AI, where will the boundary between humans and machines be? Will our self-consciousness, emotions, and free will be affected?'
                          }
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-yellow-300 mb-4">
                          {isZhTW ? '?–ï? ç¤¾æ??¬å¹³?é?' : '?–ï? Social Equity Issues'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?¢é?å°–ç«¯?€è¡“å–º?æ?å¿…ç„¶?¹æ ¼ä¸è²?‚ä½¢?ƒå??ƒå??‡ç¤¾?ƒå?ä¸å¹³ç­‰ï?è£½é€ å‡º?Œç??€å¢å¼·?…ã€å??®é€šäººä¹‹é??…æ–°?ç?é´»æ?ï¼? :
                            'Such cutting-edge technology will inevitably be expensive in its early stages. Could it exacerbate social inequality, creating a new class divide between "technologically enhanced" individuals and ordinary people?'
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {isZhTW ? 'ç¸½ç?ï¼šè?ä¸Šæ–°?‚ä»£?…é?æª? : 'Conclusion: Standing at the Threshold of a New Era'}
                    </h2>
                    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-lg p-8">
                      <p className="text-lg leading-relaxed mb-6">
                        {isZhTW ? 
                          'ç¸½æ‹¬?Œè?ï¼ŒNeuralink ?…è…¦æ©Ÿä??¢æ?è¡“ï??ºæ??‹å??¾å?ä¸€?‹å?æ»¿ç??¾ä??ˆç„¡æ³•å¿½è¦–å??ªä?ï¼šä??¹é¢ï¼Œä½¢?ºé†«?‚åº·å¾©é??Ÿå??¾å‡ºå·¨å¤§?…æ??›ï??‰æ?æ²»ç??å»?¡æ??³å??…ç–¾?…ï??¦ä??¹é¢ï¼Œä½¢å°äººé¡ç¤¾?ƒå??·é?å½±éŸ¿ï¼Œäº¦å¸¶ä?äº†å??€?ªæ??…å€«ç??‘æˆ°?? :
                          'In summary, Neuralink\'s brain-computer interface technology presents us with a future that is full of contradictions but cannot be ignored: on one hand, it shows enormous potential in the field of medical rehabilitation, promising to cure diseases that were previously unimaginable; on the other hand, its long-term impact on human society also brings unprecedented ethical challenges.'
                        }
                      </p>
                      <p className="text-lg leading-relaxed mb-6">
                        {isZhTW ? 
                          '?‘å??¯ä»¥?¯å??…ä?ï¼Œå‘¢?”å?ä¿‚é?ä¸å¯?Šå?ç§‘å¹»?…ä??‚ç??€?¼å??…å·¨è¼ªæ­£?ºåº¦æ»¾å?ï¼Œè€Œæ??‹æ??‹äºº?½èº«?•å…¶ä¸­ã€‚ä?è§?½¢?æ€è€ƒä½¢ï¼Œä¸¦ä¸”å??‡åˆ°?¸é??…è?è«–ç•¶ä¸­ï?å°‡æ?ä¿‚æ??‹è??¥å‘¢?‹æ–°?‚ä»£?…é?è¦ä?æ­¥ã€? :
                          'What we can be certain of is that this is no longer a distant science fiction story. The wheels of technological development are rolling, and each of us is part of it. Understanding it, thinking about it, and participating in related discussions will be an important step for us to embrace this new era.'
                        }
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-600">
                        <span className="text-2xl">??</span>
                        <span className="text-lg font-semibold text-white">
                          {isZhTW ? 'ç§‘æ??¹è??ªä?ï¼Œæ??‹æ??™å¥½?ªï?' : 'Technology is changing the future, are we ready?'}
                        </span>
                        <span className="text-2xl">??</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg">
                    <p className="text-gray-300">
                      {isZhTW ? 
                        <>?³ä?è§?›´å¤šé??¼AI?Œç??€?¼å??…æ??°è?è¨Šï??œæ³¨?‘å???Instagram <strong className="text-blue-300">@ai_formula_</strong> ?²å??´å?æ·±åº¦?†æ??Œè?è§?€?/> :
                        <>Want to learn more about the latest information on AI and technology development? Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more in-depth analysis and insights.</>
                      }
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {isZhTW ? '?¸é??‡ç?' : 'Related Articles'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {allPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <Card key={relatedPost.id} className="bg-gray-900/50 border-gray-700 hover:border-blue-400 transition-all duration-300">
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-purple-500/20 text-purple-200 border-purple-400">
                    {isZhTW ? relatedPost.category : relatedPost.categoryEn}
                  </Badge>
                  <h4 className="text-lg font-semibold text-white mb-3 leading-tight">
                    {isZhTW ? relatedPost.title : relatedPost.titleEn}
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    {(isZhTW ? relatedPost.excerpt : relatedPost.excerptEn).substring(0, 100)}...
                  </p>
                  <Link to={`/blog/${relatedPost.id}`}>
                    <Button variant="outline" size="sm" className="bg-white text-black border-white hover:bg-gray-100 hover:text-black font-medium">
                      {isZhTW ? '?±è??´å?' : 'Read More'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost; 
