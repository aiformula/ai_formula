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

// ?��??�覽計數?��?�?- ?�於?��?詳�??��?統�?使用ViewCountContext
const ArticleViewCounter = ({ initialViews, postId }: { initialViews: string, postId: number }) => {
  const { language } = useLanguage();
  const { getViewCount, incrementView } = useViewCount();
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [hasIncremented, setHasIncremented] = useState(false);

  // ?��??��??�覽次數（�?Blog?�面?�步�?
  const currentViews = getViewCount(postId, initialViews);

  // 增�??�覽次數?�函??
  const handleIncrementView = useCallback(() => {
    if (!hasIncremented) {
      incrementView(postId);
      setIsIncreasing(true);
      setHasIncremented(true);
      setTimeout(() => setIsIncreasing(false), 1000);
    }
  }, [hasIncremented, incrementView, postId]);

  // ??��?�面?��??��???
  const handleVisibilityChange = () => {
    setPageVisible(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!pageVisible) return;

    // 立即增�?一次瀏覽（�??��??��?�?
    if (!hasIncremented) {
      handleIncrementView();
    }

    // 計�??��?每�?增�??��??��??��?
    const timeInterval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    // �?0秒�??��?次瀏覽次數（模?�用?��??��?
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
        {currentViews} {language === 'zh-HK' ? '次瀏覽' : 'views'}
      </span>
    </div>
  );
};

const BlogPost = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // ?��??�?��?章並?��?URL?�數?�到對�??��?�?
  const allPosts = getSortedPostsNewest();
  const post = allPosts.find(p => p.id === parseInt(id || '1')) || allPosts[0];

  // ?�面載入?�滾?�到?�部
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
                {isZhTW ? '返�??�落?? : 'Back to Blog'}
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
                  {isZhTW ? '?�享' : 'Share'}
                </Button>
                <Button variant="outline" size="sm" className="bg-white text-black border-white hover:bg-gray-100 hover:text-black font-medium">
                  <Bookmark className="h-4 w-4 mr-2" />
                  {isZhTW ? '?��?' : 'Bookmark'}
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
            {/* Article Content - ?��??��?ID顯示不�??�容 */}
            <div className="text-gray-200 leading-relaxed space-y-8">
              {/* �?篇�?章�?Make.com介紹 */}
              {post.id === 3 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'Make.com係�??��?香港企業點樣?�佢?�實?�自?��?' : 'What is Make.com? How Hong Kong Businesses Can Use It for Automation'}
                  </motion.h2>
                  
                  <p className="text-lg mb-6">
                    {language === 'zh-HK' ? 
                      '?�數位�??�代，自?��?已�??�為?��?業�??��??��??�鍵工具?�Make.com（�?身�?Integromat）�?一?�強大�?視覺?�自?��?平台，可以幫?��?業�??��??��??��?式�??��???��?��?齊�?實現?�縫?�工作�?程自?��??��??��??�就?�深?��?�???�個平?��??��?佢�?�?��以幫?��?港�?中�?企業?? :
                      'In the digital age, automation has become a key tool for businesses to improve efficiency. Make.com (formerly Integromat) is a powerful visual automation platform that helps businesses connect different applications and services to achieve seamless workflow automation. Today, let\'s dive deep into this platform and how it can help Hong Kong SMEs.'
                    }
                  </p>

                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-2xl font-bold text-white mb-4 mt-8"
                  >
                    {language === 'zh-HK' ? 'Make.com?�基?��?�? : 'Basic Concepts of Make.com'}
                  </motion.h3>

                  <p className="text-lg mb-6">
                    {language === 'zh-HK' ? 
                      'Make.com係�??�基?�雲端�??��?平台?��??��?iPaaS）�?佢�??��??�念係透�?視覺?��??��??��?，�??��??�網絡�??��??�用程�???��?��?齊。用?�可以創�??��?"（Scenarios）�??�啲?��?就�??��??��?工�?流�?，可以喺?��?條件觸發?�自?�執行�?系�??��?作�? :
                      'Make.com is a cloud-based Integration Platform as a Service (iPaaS). Its core concept is to connect different web services and applications through visual drag-and-drop methods. Users can create "Scenarios" - these are automated workflows that can automatically execute a series of actions when triggered by specific conditions.'
                    }
                  </p>

                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-2xl font-bold text-white mb-4 mt-8"
                  >
                    {language === 'zh-HK' ? 'Make.com?�主要特�? : 'Key Features of Make.com'}
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                    >
                      <h4 className="text-xl font-bold text-blue-400 mb-3">
                        {language === 'zh-HK' ? '?�� 視覺?�編輯器' : '?�� Visual Editor'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?��??��??��??��?毋�?編�??��?就可以創建�??��??��??��?程�? :
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
                        {language === 'zh-HK' ? '?? 豐�??�整?�選?? : '?? Rich Integration Options'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?�援超�?1000?��??��?式�??��?，�??�Google Workspace?�Microsoft 365?�Salesforce等�? :
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
                        {language === 'zh-HK' ? '??實�??��?' : '??Real-time Processing'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?�援實�?觸發?��??��?確�??��??�步?�工作�?程�??��??��? :
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
                        {language === 'zh-HK' ? '?? 詳細??��' : '?? Detailed Monitoring'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'zh-HK' ? 
                          '?��?詳細?�執行日誌�??�誤?��?，方便監?��?調試?��??��?程�? :
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
                    {language === 'zh-HK' ? '香港企業?�實?��??�場?? : 'Practical Use Cases for Hong Kong Businesses'}
                  </motion.h3>

                  <div className="space-y-6 mb-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.2 }}
                      className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/20"
                    >
                      <h4 className="text-xl font-bold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '?�� 客戶?��?管�??��??? : '?�� CRM Automation'}
                      </h4>
                      <p className="text-gray-300 mb-3">
                        {language === 'zh-HK' ? 
                          '?��?將網站查詢表?��?潛在客戶資�??�步?�CRM系統，�??�發?�歡迎電?��?安�?跟進�??��? :
                          'Automatically sync lead data from website inquiry forms to CRM systems, while sending welcome emails and scheduling follow-up reminders.'
                        }
                      </p>
                      <p className="text-sm text-blue-200">
                        {language === 'zh-HK' ? '?�用：網站表????Google Sheets ??HubSpot ??Gmail' : 'Application: Website Form ??Google Sheets ??HubSpot ??Gmail'}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.4 }}
                      className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/20"
                    >
                      <h4 className="text-xl font-bold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?�� 社交媒�?管�?' : '?�� Social Media Management'}
                      </h4>
                      <p className="text-gray-300 mb-3">
                        {language === 'zh-HK' ? 
                          '?��?將部?�格?��??��??��??��??�社交�?體平?��?並�??��?平台?�性調?�內容格式�? :
                          'Automatically publish blog posts to multiple social media platforms simultaneously, adjusting content format based on platform characteristics.'
                        }
                      </p>
                      <p className="text-sm text-green-200">
                        {language === 'zh-HK' ? '?�用：WordPress ??Facebook ??Instagram ??LinkedIn' : 'Application: WordPress ??Facebook ??Instagram ??LinkedIn'}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.6 }}
                      className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-lg border border-purple-500/20"
                    >
                      <h4 className="text-xl font-bold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?? ?��??�步?�報?? : '?? Data Sync and Reporting'}
                      </h4>
                      <p className="text-gray-300 mb-3">
                        {language === 'zh-HK' ? 
                          '?��??��??��?平台?�銷?�數?��??��??�統一?�報?�中，並定�??�送給管�?層�? :
                          'Automatically collect sales data from different platforms, integrate into unified reports, and regularly send to management.'
                        }
                      </p>
                      <p className="text-sm text-purple-200">
                        {language === 'zh-HK' ? '?�用：Shopify ??WooCommerce ??Google Sheets ??Slack' : 'Application: Shopify ??WooCommerce ??Google Sheets ??Slack'}
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                    className="text-2xl font-bold text-white mb-4 mt-8"
                  >
                    {language === 'zh-HK' ? '?��?使用Make.com?�步�? : 'Steps to Get Started with Make.com'}
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
                          {language === 'zh-HK' ? '註�??�探�? : 'Register and Explore'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            '註�??�費帳戶，�??��??��??�本概念?�Make.com?��??�費計�?，�??��???000次�?作�? :
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
                          {language === 'zh-HK' ? '識別?��??��??? : 'Identify Automation Opportunities'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            '?��?你�??�常工�?流�?，搵?��?複性�??�耗�??�任?��??�啲就�??��??��?好�??��? :
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
                          {language === 'zh-HK' ? '?�建第�??��?�? : 'Create Your First Scenario'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            '從簡?��??��??��?始�?例�?將電?��?件�?存到?�端硬�?，�??�自?��?覆查詢�? :
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
                          {language === 'zh-HK' ? '測試?�優?? : 'Test and Optimize'}
                        </h4>
                        <p className="text-gray-300">
                          {language === 'zh-HK' ? 
                            '仔細測試你�??��??��?程�???��?��?結�?，並?��??�要進�?調整?�優?��? :
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
                      {language === 'zh-HK' ? '?�� 專業建議' : '?�� Professional Tips'}
                    </h4>
                    <p className="text-gray-300 mb-3">
                      {language === 'zh-HK' ? 
                        '?�然Make.com?�能強大，�?實施?��??��?要�?細�??��?專業?��??�AI Formula?�以幫助香港企業�? :
                        'While Make.com is powerful, implementing automation requires careful planning and professional expertise. AI Formula can help Hong Kong businesses:'
                      }
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>{language === 'zh-HK' ? '評估?��??��?求�?機�?' : 'Assess automation needs and opportunities'}</li>
                      <li>{language === 'zh-HK' ? '設�??�實?�自?��?�?��?��?' : 'Design and implement automation solutions'}</li>
                      <li>{language === 'zh-HK' ? '?��??��??��?續支?? : 'Provide training and ongoing support'}</li>
                      <li>{language === 'zh-HK' ? '?��??��??�自?��?流�?' : 'Optimize existing automation processes'}</li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.0 }}
                    className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-lg border border-blue-500/20"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {language === 'zh-HK' ? '準�??��??��??��??��?' : 'Ready to Start Your Automation Journey?'}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {language === 'zh-HK' ? 
                        'Make.com係�??�強大�??��??�工?��?但�??��??�揮佢�?潛�?，�?要�?業�??��??�支?�。聯絡AI Formula，�??��?幫�??��??�?��??�自?��?策略?? :
                        'Make.com is a powerful automation tool, but to fully unleash its potential, you need professional guidance and support. Contact AI Formula and let us help you develop the most suitable automation strategy.'
                      }
                    </p>
                    <p className="text-sm text-blue-200">
                      {language === 'zh-HK' ? '立即?�絡?��?，�?始�??�數位�??��??��?' : 'Contact us now to start your digital transformation journey!'}
                    </p>
                  </motion.div>
                </>
              )}

              {/* �?篇�?章�??��?AI Formula?��?大�???*/}
              {post.id === 2 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?��?AI Formula?��?大�??��?香港?�佳AI?��??�夥�? : '5 Reasons to Choose AI Formula: Hong Kong\'s Best AI Automation Partner'}
                  </motion.h2>
                  
                  <p className="text-lg">
                    {language === 'zh-HK' ? 
                      '?��?港呢?�瞬?�萬變�??�業?��??�面，AI Formula已�??�為?�好多�?業數位�??��?首選夥伴?��??��??��?一?�AI?�司?�簡?��??��?係�??�自?��?路�??��??��??�戰?��?作夥伴。當你而家?��??��??��??��??��?AI Formula?��?業�??�正?�為香港?��??�業?��?業創?�價?��?幫佢?�實?�業?��?程自?��??�智?��??��??? :
                      'In Hong Kong\'s rapidly changing business environment, AI Formula has become the preferred partner for many enterprises\' digital transformation. We are not just an AI company, but your most reliable strategic partner on the automation journey. As you read this article, AI Formula\'s professional team is creating value for businesses across various industries in Hong Kong, helping them achieve business process automation and intelligent upgrades.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border-l-4 border-blue-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">
                      {language === 'zh-HK' ? '點解越�?越�?香港企業?��?AI Formula�? : 'Why Are More Hong Kong Businesses Choosing AI Formula?'}
                    </h4>
                    <p className="text-gray-200">
                      {language === 'zh-HK' ? 
                        '答�?就�??��??��??��?競爭?�勢：本?��??��??��?業�??�、�?富�?驗、�?續支?��??�新?�發?��??��??��?深入?��??��?大�?AI Formula?��??��??��? :
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
                    {language === 'zh-HK' ? '?�由一：深度本?��?專業?��?' : 'Reason 1: Deep Localized Professional Services'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula係由香港?�地專業?��?組�??��??��?深度?�解香港企業?��??�環境、�?業�??��?市場?�色?��?海�?AI?�司?��?，�??��??��??�術�??��??�簡?��??��?係�??��?業夥伴�??��??��??�正?��?香港市場?�求�?AI�?��?��??? :
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
                        {language === 'zh-HK' ? '香港?�業?��??�解' : 'Understanding Hong Kong Business Environment'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?��?香港法�??��?規�?�? : 'Familiar with Hong Kong regulations and compliance requirements'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?�解?�地?�業?��??��??? : 'Understanding local business culture and practices'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? '?��?香港企業?��?作模�? : 'Adapted to Hong Kong enterprise operating models'}
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '中英?��??��??�援' : 'Bilingual Service Support'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '流利?�廣?�話溝�? : 'Fluent Cantonese communication'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '專業?�英?��?術�?�? : 'Professional English technical documentation'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? '繁�?中�??�戶?�面設�?' : 'Traditional Chinese user interface design'}
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?�由二�?精英?�人專業?��?' : 'Reason 2: Elite Four-Member Professional Team'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?�核心�??��??��?位�?驗�?富�?AI專家組�?，�?位�??�都?��??��?專業?��??��?深�??��?驗�??��??��??�。�??��??��?規模?�然精簡，�??��?極�?，能夠為每個�??��?供個人?��?專業?��??? :
                      'AI Formula\'s core team consists of four experienced AI experts, each member possessing deep experience and exceptional skills in their respective professional fields. Although our team is streamlined, we are highly efficient and able to provide personalized professional services for each project.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-purple-300 mb-4">
                      {language === 'zh-HK' ? '?��??��?業�??��??��?' : 'Our Professional Team Composition:'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-400 pl-4">
                          <h5 className="font-semibold text-blue-300">
                            {language === 'zh-HK' ? '?�術�??��?�? : 'Technical Development Expert'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? '負責AI系統?��?設�??��?式�??? : 'Responsible for AI system architecture design and programming development'}
                          </p>
                        </div>
                        <div className="border-l-4 border-green-400 pl-4">
                          <h5 className="font-semibold text-green-300">
                            {language === 'zh-HK' ? '?�業?��?�? : 'Business Analyst'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? '?��?企業?�求�??��?�?��?��?' : 'Analyze business requirements and develop solutions'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="border-l-4 border-purple-400 pl-4">
                          <h5 className="font-semibold text-purple-300">
                            {language === 'zh-HK' ? '?�目管�?�? : 'Project Manager'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? '確�??�目?��??�質完�?' : 'Ensure projects are completed on time and with quality'}
                          </p>
                        </div>
                        <div className="border-l-4 border-orange-400 pl-4">
                          <h5 className="font-semibold text-orange-300">
                            {language === 'zh-HK' ? '客戶?��?專員' : 'Customer Service Specialist'}
                          </h5>
                          <p className="text-gray-200 text-sm">
                            {language === 'zh-HK' ? '?��??��??�援?�培訓�??? : 'Provide ongoing support and training services'}
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
                    {language === 'zh-HK' ? '?�由三�?豐�?實戰?��?案�?' : 'Reason 3: Rich Practical Success Stories'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula已�??��??��??��?港�?業�?供AI?��??��??��??��??��??��?例涵?��??��?業�?規模?��?業。�??��??�都係�??��?業能?��??��?質�??��?佳�??��? :
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
                        {language === 'zh-HK' ? '?? LLM?�能?�天機器人�??? : '?? LLM Intelligent Chatbot Development'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?��??��?業�??�基?�大?��?言模�??�智?��?天�??�人�?4小�??��??��?客戶?�詢，�??�常見�?題�??��??��??? :
                          'Developed intelligent chatbots based on Large Language Models for multiple enterprises, providing 24/7 automated customer inquiry responses, handling common questions and appointment bookings.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                          {language === 'zh-HK' ? 
                            '客戶?��??��??��?85%，客?�滿?�度?��?92%，人工客?�工作�?減�?70%' :
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
                        {language === 'zh-HK' ? '?�� 社交媒�??��??�發布系�? : '?�� Social Media Automation Publishing System'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�助企業建�??�能社交媒�?管�?系統，自?��??�創?�貼?�內容�?定�??��??��??�平?��?並�??��??�數?��? :
                          'Helped enterprises establish intelligent social media management systems that automatically generate creative post content, schedule publications across multiple platforms, and analyze engagement data.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                          {language === 'zh-HK' ? 
                            '社�?管�??��?節??0%，貼?��??��??��?65%，�??��??�度增�?150%' :
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
                        {language === 'zh-HK' ? '?��?��??AI?�擬秘書系統' : '?��?��??AI Virtual Assistant System'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�發?�能?�擬秘書，自?��??�日程�??�、郵件�?覆、�?議�??�、�??�整?��?行政工�?，�?企業主�?注核心業?��? :
                          'Developed intelligent virtual assistants that automatically handle administrative tasks such as scheduling, email replies, meeting minutes, and data organization, allowing business owners to focus on core operations.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                          {language === 'zh-HK' ? 
                            '行政工�??��??��?80%，�?業主?��?業�??��?增�?60%，�??��??��?�?0%' :
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
                    {language === 'zh-HK' ? '?�由?��??�方位�?續�?術支?? : 'Reason 4: Comprehensive Ongoing Technical Support'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?��??��??�在系統?�署後就結�??��??��?供全?��??��??�術支?��??��?確�?你�?AI系統始�?保�??�佳�??��?並隨?�業?�發展�??�優?��?級�? :
                      'AI Formula\'s service doesn\'t end after system deployment. We provide comprehensive ongoing technical support services to ensure your AI system always maintains optimal performance and continuously optimizes and upgrades as your business develops.'
                    }
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <Card className="bg-gray-900/50 border-gray-700 hover:border-orange-400 transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-orange-300 mb-4">
                          {language === 'zh-HK' ? '?�術維護�??? : 'Technical Maintenance Services'}
                        </h4>
                        <ul className="space-y-2 text-gray-200 text-sm">
                          <li>??{language === 'zh-HK' ? '24/7 系統??��?�維�? : '24/7 system monitoring and maintenance'}</li>
                          <li>??{language === 'zh-HK' ? '定�?系統?�新?��??��?�? : 'Regular system updates and security patches'}</li>
                          <li>??{language === 'zh-HK' ? '?��?快速診?��?修復' : 'Rapid fault diagnosis and repair'}</li>
                          <li>??{language === 'zh-HK' ? '?�能?��??�調?? : 'Performance optimization and tuning'}</li>
                          <li>??{language === 'zh-HK' ? '?��??�份?�災??���? : 'Data backup and disaster recovery'}</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-900/50 border-gray-700 hover:border-green-400 transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-green-300 mb-4">
                          {language === 'zh-HK' ? '專業線�??�學' : 'Professional Online Training'}
                        </h4>
                        <ul className="space-y-2 text-gray-200 text-sm">
                          <li>??{language === 'zh-HK' ? '系統?��??��?課�?' : 'System operation training courses'}</li>
                          <li>??{language === 'zh-HK' ? '視頻?�學?��?作�??? : 'Video tutorials and operation manuals'}</li>
                          <li>??{language === 'zh-HK' ? '一對�??�術�?�? : 'One-on-one technical guidance'}</li>
                          <li>??{language === 'zh-HK' ? '?��??�能使用?��?' : 'Advanced feature usage training'}</li>
                          <li>??{language === 'zh-HK' ? '定�??��??�新?�享' : 'Regular knowledge update sharing'}</li>
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
                    {language === 'zh-HK' ? '?�由五�??�新AI驅�??��??�方�? : 'Reason 5: Innovative AI-Driven Development Method'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?��?大競?�優?�在?��??�獨?��??�發?��?：�??�AI來�??�AI?�這種?�新?�方法�??�們能夠�??�統?�發?��??�快?�更準確?�交付解決方案�??��?確�?每個�??�都?��??��?高�?質�?標�??? :
                      'AI Formula\'s greatest competitive advantage lies in our unique development approach: using AI to develop AI. This innovative method allows us to deliver solutions faster and more accurately than traditional development teams, while ensuring every project meets the highest quality standards.'
                    }
                  </p>

                  <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-yellow-400 my-8">
                    <h4 className="font-semibold text-yellow-300 mb-4">
                      {language === 'zh-HK' ? '?�們�?AI驅�??�發?�勢�? : 'Our AI-Driven Development Advantages:'}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">
                          {language === 'zh-HK' ? '3?? : '3x'}
                        </div>
                        <p className="text-gray-200 text-sm">
                          {language === 'zh-HK' ? '?�發?�度比傳統方�? : 'Faster development than traditional methods'}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">50%</div>
                        <p className="text-gray-200 text-sm">
                          {language === 'zh-HK' ? '?�目完�??��?縮短' : 'Reduction in project completion time'}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">
                          {language === 'zh-HK' ? '24小�?' : '24 Hours'}
                        </div>
                        <p className="text-gray-200 text-sm">
                          {language === 'zh-HK' ? '?�求�??��??��??? : 'Requirements analysis response time'}
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
                        {language === 'zh-HK' ? '?? ?�能�?��?��?' : '?? Intelligent Code Generation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�用?�?��?AI?�術自?��??��?質�?�?��，大幅�?少�??��??��??��?確�?�?��?�穩定性�??�維護性�? :
                          'Utilizing the latest AI technology to automatically generate high-quality code, significantly reducing development time while ensuring code stability and maintainability.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?��?�? : 'Impact: '}</strong>
                          {language === 'zh-HK' ? 
                            '�?��?�發?�度?��?200%，錯誤�??��?80%' :
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
                        {language === 'zh-HK' ? '?�� ?��??�測試�??��?' : '?�� Automated Testing and Optimization'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          'AI系統?��??��??�面測試，�??��??��?題並?��??��?建議，確保�??�解決方案都?�到?�佳性能?? :
                          'AI systems automatically conduct comprehensive testing, identify potential issues and provide optimization recommendations, ensuring every solution achieves optimal performance.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?��?�? : 'Impact: '}</strong>
                          {language === 'zh-HK' ? 
                            '測試覆�???00%，系統穩定性�???0%' :
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
                        {language === 'zh-HK' ? '?�� ?�測?��?求�??? : '?�� Predictive Requirements Analysis'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�用機器學�?算�??��?客戶?�求模式�??�測?��??�能?��??��?求�??��?規�??�設計解決方案�? :
                          'Using machine learning algorithms to analyze customer requirement patterns, predict future possible functional needs, and plan and design solutions in advance.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '?��?�? : 'Impact: '}</strong>
                          {language === 'zh-HK' ? 
                            '?�求�?確�?95%，客?�滿?�度?��?85%' :
                            '95% requirement accuracy, 85% improvement in customer satisfaction'
                          }
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-gray-900/50 border-l-4 border-orange-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-orange-300 mb-4">
                      {language === 'zh-HK' ? '?��?麼這種?��?如此?��?�? : 'Why Is This Method So Important?'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?�快交�?�? : 'Faster Delivery: '}</strong>
                            {language === 'zh-HK' ? '縮短?�目?��?，�?客戶?�快?�到?��?' : 'Shortened project cycles, allowing clients to see results faster'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? '?��?質�?�? : 'Higher Quality: '}</strong>
                            {language === 'zh-HK' ? 'AI輔助確�?�?��質�??�系統穩定�? : 'AI assistance ensures code quality and system stability'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? '?��??�本�? : 'Lower Costs: '}</strong>
                            {language === 'zh-HK' ? '?��??��??�接?��??�發?�本' : 'Improved efficiency directly reduces development costs'}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?��??�新�? : 'Continuous Innovation: '}</strong>
                            {language === 'zh-HK' ? '始�??�用?�?�AI?�術�??��?' : 'Always adopting the latest AI technologies and methods'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? '?�擴展性�?' : 'Scalability: '}</strong>
                            {language === 'zh-HK' ? '系統設�??�慮?��??��??��? : 'System design considers future expansion needs'}
                          </li>
                          <li>??<strong>{language === 'zh-HK' ? '競爭?�勢�? : 'Competitive Advantage: '}</strong>
                            {language === 'zh-HK' ? '讓客?�在市場中�??��??�地�? : 'Helping clients maintain leading positions in the market'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? 準�??��?了�?�? : '?? Ready to Get Started?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        '?�繫AI Formula，�??�們�?專業?��??��??��??�費?��?求�??��?�?��?��?建議?��?住�??�質?�AI?��?不�?該�?待�??��??��?企業從�??�豫?? :
                        'Contact AI Formula and let our professional team provide you with free requirements analysis and solution recommendations. Remember, quality AI services shouldn\'t wait, and successful businesses never hesitate.'
                      }
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">?��</span>
                        <span className="text-sm">
                          {language === 'zh-HK' ? '?�費諮詢?��?' : 'Free Consultation Service'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">??/span>
                        <span className="text-sm">
                          {language === 'zh-HK' ? '24小�?快速�??? : '24-Hour Rapid Response'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">?��</span>
                        <span className="text-sm">
                          {language === 'zh-HK' ? '客製?�解決方�? : 'Customized Solutions'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>?�注?��??�Instagram <strong className="text-blue-300">@ai_formula_</strong> ?��??��?AI?��??��?訊�??��?案�??�享??/> :
                      <>Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more AI automation insights and success story sharing.</>
                    }
                  </p>
                </>
              )}

              {/* �?篇�?章�?AI Formula 如�?幫助香港中�?企實?�業?�自?��?轉�? */}
              {post.id === 1 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'AI Formula：�?港中小�?業�??��?轉�?夥伴' : 'AI Formula: Your Digital Transformation Partner for Hong Kong SMEs'}
                  </motion.h2>
                  
                  <p className="text-lg">
                    {language === 'zh-HK' ? 
                      '?��?港呢?�瞬?�萬變�??�業?��??�面，中小�?業面?��??��??��??��??��?機�??�AI Formula專�??��?港中小�?業�?供�?身�??��?AI?��??�解決方案�?從�?步諮詢到完整實施，�??��?專業?��??�伴企業走�?每�?步數位�??��??��??? :
                      'In Hong Kong\'s rapidly changing business environment, SMEs face unprecedented challenges and opportunities. AI Formula specializes in providing tailored AI automation solutions for Hong Kong SMEs, with our professional team accompanying businesses through every step of their digital transformation journey from initial consultation to complete implementation.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border-l-4 border-blue-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">
                      {language === 'zh-HK' ? '點解香港中�?企業?�要AI?��??��?' : 'Why Do Hong Kong SMEs Need AI Automation?'}
                    </h4>
                    <p className="text-gray-200">
                      {language === 'zh-HK' ? 
                        '?�競?��??��?香港市場?�面，�??��??�本?�制係�?業�?存�??�鍵?�AI?��??��??��?大�?業�?專利，而�?中�?企業保�?競爭?�、�??��??��??��?必�?工具?? :
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
                    {language === 'zh-HK' ? 'AI Formula?��??��?念�?以客?�為中�??�創?? : 'AI Formula\'s Service Philosophy: Customer-Centric Innovation'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?�信每�?企業?��?佢�??�特?��??�模式�??�戰?��??��??��??�念建�??�深度�?�?��?��?求�??��?上面，�??��??��?AI?�術為企業?�造實?�價?��??��?係為?��?術而�?術�? :
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
                        {language === 'zh-HK' ? '客戶?��??��??��?�? : 'Customer-First Service Approach'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '深入了解企業?�特?��? : 'Deep understanding of unique business needs'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?��??�人?�解決方案建�? : 'Provide personalized solution recommendations'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? '確�?每個�??�都?��??�造實?�價?? : 'Ensure every project creates real value'}
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '?�術創?��?實用?�並?? : 'Balance Innovation with Practicality'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '?�用?�?�AI?�術�?工具' : 'Adopt latest AI technologies and tools'}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        ??{language === 'zh-HK' ? '專注?�實?��?業�??? : 'Focus on practical business applications'}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ??{language === 'zh-HK' ? '確�??�術方案�??�使?��?維護' : 'Ensure solutions are user-friendly and maintainable'}
                      </p>
                    </motion.div>
                  </div>

                  <motion.h3 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-2xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '完整?��??��?程�?從諮詢到實施' : 'Complete Service Process: From Consultation to Implementation'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula?�用系統?��??��?段�??��?程�?確�?每個AI?��??��??�都?��??�利完�?並為企業帶�?實�??��??��??��?專業?��??�喺每個�?段�?供詳細�?導�??�援?? :
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
                        {language === 'zh-HK' ? '?? ?�段一：業?�診?��??�求�??? : '?? Stage 1: Business Diagnosis & Needs Analysis'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�們�?專業顧�??�深?��?�?��?��?業現?�業?��?程�?識別?��??��??�耗�??��?業環節，�?估自?��??�可行性�??��??��??? :
                          'Our professional consultants will thoroughly understand your existing business processes, identify repetitive and time-consuming operations, and assess automation feasibility and priorities.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '交�??��?�? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            '詳細?�業?��?程�??�報?�、自?��?機�?識別?�ROI?�估?��?' :
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
                        {language === 'zh-HK' ? '?�� ?�段二�?客製?�方案設�? : '?�� Stage 2: Customized Solution Design'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?��?企業?��??��?求�??�們�?設�??�?��??�AI�?��?��?，選?��??��??�術架構�?並制定詳細�?實施?��?表�? :
                          'Based on your budget and requirements, we design the most suitable AI solutions, select appropriate technical architecture, and create detailed implementation timelines.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '交�??��?�? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            '?�術方案設計書?�用?��??��??�、�??�實?��??�、�?算�?�? :
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
                        {language === 'zh-HK' ? '?��? ?�段三�?系統?�發?�部�? : '?��? Stage 3: System Development & Deployment'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�們�??�術�??��??��?系統?�發?�測試�??�現?�系統進�??��?，並?��??�面?�員工培訓�??��??��??? :
                          'Our technical team conducts system development and testing, integrates with existing systems, and provides comprehensive staff training and operation manuals.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '交�??��?�? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            '完整?�AI?��??�系統、系統整?�、員工培訓、�?作�??? :
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
                        {language === 'zh-HK' ? '?? ?�段?��???��?��??�維�? : '?? Stage 4: Monitoring, Optimization & Maintenance'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '系統上�?後�??�們�??��???��?��??�況�??��??�戶?��?並進�??�進�??��?定�??�新?��?術支?��??��? :
                          'After system launch, we continuously monitor operations, collect user feedback for improvements, and provide regular updates and technical support services.'
                        }
                      </p>
                      <div className="bg-gray-900/50 p-4 rounded">
                        <p className="text-sm text-gray-300">
                          <strong>{language === 'zh-HK' ? '交�??��?�? : 'Deliverables: '}</strong>
                          {language === 'zh-HK' ? 
                            '系統??��?��??�性能?��??��??�更?�、�?續�?術支?? :
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
                    {language === 'zh-HK' ? 'AI Formula?�核心�??��??? : 'AI Formula\'s Core Service Areas'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      '?�們�?供全?��??�AI?��??��??��?涵�?企業?��??��??�環節?��??��??�都經�?精�?設�?，確保能夠為香港中�?企業帶�?實�??��?業價?��? :
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
                        {language === 'zh-HK' ? '?? 專業?�學課�?' : '?? Professional Training Courses'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          '?��?線�?AI課�??�工作�?，�?企業?��??�握AI?�用?�?��?建�??�部AI?��?' :
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
                        {language === 'zh-HK' ? '??�?AI工具?�享' : '??�?AI Tools Sharing'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          '?�享?�?�AI工具?��?術趨?��?幫助企業?��??�?��??�解決方�? :
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
                        {language === 'zh-HK' ? '??流�??��??? : '??Process Automation'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          '設�??�實?�智?�自?��?流�?，解?�人?��?源�??��??��??��??��?' :
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
                        {language === 'zh-HK' ? '?�� 客製?�AI�?��?��?' : '?�� Customized AI Solutions'}
                      </h4>
                      <p className="text-gray-200 text-sm">
                        {language === 'zh-HK' ? 
                          '?��?企業?�特?�求�??�發專屬?�AI?��??�系統�??�用' :
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
                    {language === 'zh-HK' ? '?��?案�?：�?實�?轉�??��?' : 'Success Stories: Real Transformation Cases'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'AI Formula已�??��??�眾多�?港中小�?業實?�數位�??�。以下是?�們�?一些�??��?例�?展示AI?��??��?何為不�?行業?��?業創?�實?�價?��? :
                      'AI Formula has successfully helped numerous Hong Kong SMEs achieve digital transformation. Here are some of our success stories, demonstrating how AI automation creates real value for businesses across different industries.'
                    }
                  </p>

                  <div className="space-y-4 my-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-2">
                        {language === 'zh-HK' ? '?? ?�售業�??�能客戶?��?系統' : '?? Retail: Intelligent Customer Service System'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '?��?家�?港�?裝零?��??�發LLM?�天機器人�?24小�??��??��?客戶?�詢，�??��??�追蹤�??��??�薦?? :
                          'Developed an LLM chatbot for a Hong Kong fashion retailer, providing 24/7 automatic customer inquiry responses, order tracking, and product recommendations.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          '客戶?��??��??��?85%，客?�滿?�度?��?92%，人工客?�工作�?減�?70%' :
                          '85% improvement in customer service efficiency, 92% increase in customer satisfaction, 70% reduction in manual customer service workload'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-300 mb-2">
                        {language === 'zh-HK' ? '?�� 餐飲業�?社交媒�??��??�管?? : '?�� F&B: Social Media Automation Management'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '?�助一家�??餐廳建�??�能社交媒�?管�?系統，自?��??��??�推�?��容�?定�??��??�Facebook?�Instagram?? :
                          'Helped a restaurant chain establish an intelligent social media management system that automatically generates menu promotional content and schedules posts to Facebook and Instagram.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          '社�?管�??��?節??0%，貼?��??��??��?65%，新客戶增�?40%' :
                          '90% time savings in social media management, 65% increase in post engagement rates, 40% increase in new customers'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-2">
                        {language === 'zh-HK' ? '?�� 專業?��?：AI?�擬秘書系統' : '?�� Professional Services: AI Virtual Assistant System'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '?��?家�?計師事�??�?�發AI?�擬秘書，自?��??��?約�??�、�?件整?��?客戶溝通�? :
                          'Developed an AI virtual assistant for an accounting firm to automatically handle appointment scheduling, document organization, and client communication.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          '行政工�??��??��?80%，�?業�??��??��???0%，�??��??��?�?5%' :
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
                    {language === 'zh-HK' ? '?��?麼選?�AI Formula�? : 'Why Choose AI Formula?'}
                  </motion.h3>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      '?�眾多AI?��??��??�中，AI Formula以其?�特?�優?��??��?港中小�?業�?首選夥伴?��??��??�是?�術�??��?，更?��?業數位�??�路上�??��?顧�??? :
                      'Among many AI service providers, AI Formula stands out with unique advantages as the preferred partner for Hong Kong SMEs. We are not just technology suppliers, but reliable consultants on your digital transformation journey.'
                    }
                  </p>

                  <div className="bg-gray-900/50 border-l-4 border-blue-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">
                      {language === 'zh-HK' ? 'AI Formula ?�核心優?? : 'AI Formula\'s Core Advantages'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <ul className="space-y-3 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?�地專業?��?�? : 'Local Professional Team: '}</strong>{language === 'zh-HK' ? '深度?�解香港?�業?��?' : 'Deep understanding of Hong Kong business environment'}</li>
                          <li>??<strong>{language === 'zh-HK' ? 'AI?�術�??��?' : 'Leading AI Technology: '}</strong>{language === 'zh-HK' ? '?�用AI?�發AI，速度比競?��??�快3?? : 'Using AI to develop AI, 3x faster than competitors'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '實戰經�?豐�?�? : 'Rich Practical Experience: '}</strong>{language === 'zh-HK' ? '?��??��?多個�?業�?中�?企業' : 'Successfully serving SMEs across multiple industries'}</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?��??�援?��?�? : 'Full Support Service: '}</strong>{language === 'zh-HK' ? '從諮詢到維護?��??��??? : 'Complete service from consultation to maintenance'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '線�??�學課�?�? : 'Online Training Courses: '}</strong>{language === 'zh-HK' ? '確�?客戶?��??�握系統?��?' : 'Ensure client teams master system operations'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?�活�?��?��?�? : 'Flexible Solutions: '}</strong>{language === 'zh-HK' ? '?��??�種規模?��?算�?企業' : 'Suitable for businesses of all sizes and budgets'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? 準�??��?你�?AI轉�?之�??��?' : '?? Ready to Start Your AI Transformation Journey?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        '不�?讓�??��?業在?��?競爭中落後。�??�聯繫AI Formula，�??�們�?專業?��??��??��??�費?�業?�診?��?AI?��??�方案建議。�?住�??��??��?業�?不�?待�??�是主�??�抱變革?? :
                        'Don\'t let your business fall behind in the digital competition. Contact AI Formula immediately and let our professional team provide you with free business diagnosis and AI automation solution recommendations. Remember, successful businesses never wait, but actively embrace change.'
                      }
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">??</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?�費諮詢?��?' : 'Free Consultation Hotline'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">?��</span>
                        <span className="text-sm">{language === 'zh-HK' ? '專業?��?建議' : 'Professional Solution Recommendations'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">?��</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?�身定制�?��?��?' : 'Tailored Solutions'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>?�注?��??�Instagram <strong className="text-blue-300">@ai_formula_</strong> ?��??��?AI?��??��?訊�??��?案�??�享??/> :
                      <>Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more AI automation insights and success story sharing.</>
                    }
                  </p>
                </>
              )}

              {/* �?篇�?章�?n8n介紹 */}
              {post.id === 4 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? 'n8n係�??��?' : 'What is n8n?'}
                  </motion.h2>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      'n8n（發?�為"n-eight-n"）�?一?�強大�??��?工�?流�??��??�平?��?專�??��?業�??�發?��?供�?活�??��??�解決方案。�??��??��??�工?��??��?n8n俾�?完全?�控?��?，可以自主�?管�?並�??��?視覺?��?節點編輯器?�創建�??��?工�?流�??? :
                      'n8n (pronounced "n-eight-n") is a powerful open-source workflow automation platform designed to provide flexible automation solutions for businesses and developers. Unlike other automation tools, n8n gives you complete control, can be self-hosted, and provides a visual node editor to create complex workflows.'
                    }
                  </p>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-6 my-8">
                    <h3 className="text-xl font-semibold text-green-300 mb-4">
                      {language === 'zh-HK' ? '?�� n8n?�核心特�? : '?�� Core Features of n8n'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '?��??�費�? : 'Open Source & Free: '}</strong>{language === 'zh-HK' ? '完全?�費使用，無使用?�制' : 'Completely free to use with no usage restrictions'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?�主託管�? : 'Self-hosted: '}</strong>{language === 'zh-HK' ? '?��?完全?�控?�自己�?�? : 'Complete control over your data'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '視覺?�編輯�?' : 'Visual Editor: '}</strong>{language === 'zh-HK' ? '?��?式�??��??�於使用' : 'Drag-and-drop interface, easy to use'}</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2 text-gray-200">
                          <li>??<strong>{language === 'zh-HK' ? '豐�??��?�? : 'Rich Integrations: '}</strong>{language === 'zh-HK' ? '?�援200+?��??��?�? : 'Supports 200+ applications'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?��?義�?點�?' : 'Custom Nodes: '}</strong>{language === 'zh-HK' ? '?�以?�建專屬?�能' : 'Create your own custom functionality'}</li>
                          <li>??<strong>{language === 'zh-HK' ? '?�代�?低代碼�?' : 'No-code/Low-code: '}</strong>{language === 'zh-HK' ? '?��??�術�??��?術用?? : 'Suitable for both technical and non-technical users'}</li>
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
                    {language === 'zh-HK' ? 'n8n vs ?��??��??�工?? : 'n8n vs Other Automation Tools'}
                  </motion.h3>

                  <div className="overflow-x-auto my-8">
                    <table className="w-full border-collapse border border-gray-600 rounded-lg">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-3 text-left text-white">
                            {language === 'zh-HK' ? '?��?' : 'Feature'}
                          </th>
                          <th className="border border-gray-600 p-3 text-center text-green-300">n8n</th>
                          <th className="border border-gray-600 p-3 text-center text-blue-300">Make.com</th>
                          <th className="border border-gray-600 p-3 text-center text-purple-300">Zapier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?��?' : 'Open Source'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                        </tr>
                        <tr className="bg-gray-900/30">
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?�主託管' : 'Self-hosted'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-red-400">??/td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?�費使用' : 'Free Usage'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">??/td>
                          <td className="border border-gray-600 p-3 text-center text-yellow-400">?��?</td>
                          <td className="border border-gray-600 p-3 text-center text-yellow-400">?��?</td>
                        </tr>
                        <tr className="bg-gray-900/30">
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '?��?義�?�? : 'Customization'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-green-400">⭐�?⭐�?�?/td>
                          <td className="border border-gray-600 p-3 text-center text-blue-400">⭐�?⭐�?</td>
                          <td className="border border-gray-600 p-3 text-center text-purple-400">⭐�?�?/td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-3 text-gray-200">
                            {language === 'zh-HK' ? '學�???��' : 'Learning Curve'}
                          </td>
                          <td className="border border-gray-600 p-3 text-center text-yellow-400">?��?</td>
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
                    {language === 'zh-HK' ? 'n8n?�主要�??�場?? : 'Main Use Cases for n8n'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-cyan-400">
                      <h4 className="font-semibold text-cyan-300 mb-3">
                        {language === 'zh-HK' ? '?? ?��??�步?�整?? : '?? Data Synchronization & Integration'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '將�??�系統�??��??��??�步，�?如CRM?�ERP?�電?�平?��??��??��?交�??�n8n?�以幫助企業建�?統�??�數?��?，確保�??�系統都?��??��?資�??? :
                          'Synchronize data between different systems, such as data exchange between CRM, ERP, and e-commerce platforms. n8n helps businesses establish unified data flows, ensuring all systems have the latest information.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '常�?例�?�? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          'Shopify訂單?�步?�Google Sheets?�HubSpot?�絡人更?�到Mailchimp' :
                          'Sync Shopify orders to Google Sheets, update HubSpot contacts to Mailchimp'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?�� ?��??��??? : '?�� Marketing Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '建�??�能?��??�工作�?程�??��?客戶行為?��??�送個人?�郵件、更?�客?��?籤、觸?�特定�??�活?��? :
                          'Build intelligent marketing workflows that automatically send personalized emails, update customer tags, and trigger specific marketing campaigns based on customer behavior.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '常�?例�?�? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?�客?�歡迎郵件�??�、購?��??��??��??��??�優?�自?�發?? :
                          'New customer welcome email sequences, abandoned cart reminders, automatic birthday offers'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?? 客戶?��??��??? : '?? Customer Service Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?��??��?客戶?�詢?�建立�??�工?�、發?��??�更?�通知?��??�AI?�天機器人�??�以?��?24/7?�客?�支?��??��? :
                          'Automatically handle customer inquiries, create service tickets, and send status update notifications. Combined with AI chatbots, provide 24/7 customer support services.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '常�?例�?�? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?��??��?常�??��??�工?��??�更?�、客?�滿?�度調查' :
                          'Auto-reply to FAQs, ticket status updates, customer satisfaction surveys'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-semibold text-orange-300 mb-3">
                        {language === 'zh-HK' ? '?? ?��??�監?? : '?? Reporting & Monitoring'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?��??��?業�??��??�監?�系統�??�、發?�警?�通知?�幫?��?業�??��?�?��?��?況�?系統?�康度�? :
                          'Automatically generate business reports, monitor system status, and send alert notifications. Help businesses stay informed about business conditions and system health.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '常�?例�?�? : 'Common Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '每日?�售?��??�網站�?機警?�、庫存�?足通知' :
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
                    {language === 'zh-HK' ? '點樣?��?使用n8n�? : 'How to Get Started with n8n?'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-blue-300 mb-4">
                        {language === 'zh-HK' ? '?? 三種?�署?��?' : '?? Three Deployment Options'}
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-300 mb-2">
                            {language === 'zh-HK' ? '1. ?�端?�本（n8n.cloud�? : '1. Cloud Version (n8n.cloud)'}
                          </h5>
                          <p className="text-gray-200 text-sm mb-2">
                            {language === 'zh-HK' ? 
                              '?�簡單?��?始方式�??��?安�?，註?�即?�。適?��?學者�?小�??��??? :
                              'The easiest way to start, no installation required, sign up and use immediately. Perfect for beginners and small teams.'
                            }
                          </p>
                          <div className="text-xs text-gray-400">
                            <strong>{language === 'zh-HK' ? '?��?�? : 'Pros: '}</strong>
                            {language === 'zh-HK' ? '?��??�用?�自?�更?�、無?�維護' : 'Ready to use, automatic updates, no maintenance required'}
                          </div>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-300 mb-2">
                            {language === 'zh-HK' ? '2. ?�主託管（Self-hosted�? : '2. Self-hosted'}
                          </h5>
                          <p className="text-gray-200 text-sm mb-2">
                            {language === 'zh-HK' ? 
                              '?�自己�??��??��?安�?n8n，�??�控?�數?��?設�??�適?��??�術能?��??��??? :
                              'Install n8n on your own server with complete control over data and settings. Suitable for teams with technical capabilities.'
                            }
                          </p>
                          <div className="text-xs text-gray-400">
                            <strong>{language === 'zh-HK' ? '?��?�? : 'Pros: '}</strong>
                            {language === 'zh-HK' ? '完全?�制?�數?��??�、無使用?�制' : 'Complete control, data security, no usage restrictions'}
                          </div>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-300 mb-2">
                            {language === 'zh-HK' ? '3. ?�地安�?（Local Installation�? : '3. Local Installation'}
                          </h5>
                          <p className="text-gray-200 text-sm mb-2">
                            {language === 'zh-HK' ? 
                              '?�個人?�腦上�?裝n8n?��?測試?�學習。適?��??�者�??��?試用?�用?��? :
                              'Install n8n on your personal computer for testing and learning. Perfect for developers and users who want to try it out.'
                            }
                          </p>
                          <div className="text-xs text-gray-400">
                            <strong>{language === 'zh-HK' ? '?��?�? : 'Pros: '}</strong>
                            {language === 'zh-HK' ? '?�費測試?�學習環境、離線使?? : 'Free testing, learning environment, offline usage'}
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
                    {language === 'zh-HK' ? '香港企業使用n8n?�實?��?�? : 'Real Use Cases of n8n for Hong Kong Businesses'}
                  </motion.h3>

                  <div className="space-y-4 my-8">
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-semibold text-yellow-300 mb-2">
                        {language === 'zh-HK' ? '?�� ?�售業�?庫�?管�??��??? : '?�� Retail: Inventory Management Automation'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '一家�?港�?裝零?��?使用n8n??��POS系統?�網店�??�庫管�?系統，實?�即?�庫存�?步。當?�件?��?庫�?低於設�??��?，系統�??��??�送採購�??��? :
                          'A Hong Kong fashion retailer uses n8n to connect POS systems, online stores, and warehouse management systems for real-time inventory synchronization. When inventory falls below set levels, the system automatically sends purchase reminders.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          '庫�?準確度�???5%，缺貨�?況�?�?0%，人工核對�??��???0%' :
                          '95% improvement in inventory accuracy, 80% reduction in stockouts, 90% time savings in manual checking'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-2">
                        {language === 'zh-HK' ? '?�� 專業?��?：客?��?係管?? : '?�� Professional Services: Customer Relationship Management'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '一家�?計師事�??�使用n8n?��?客戶?�詢表單?�CRM系統?�郵件�??�平?�。新客戶?�詢?�自?�創建CRM記�?，並觸發?�人?��?跟進郵件�??��? :
                          'An accounting firm uses n8n to integrate customer inquiry forms, CRM systems, and email marketing platforms. New customer inquiries automatically create CRM records and trigger personalized follow-up email sequences.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          '客戶?��??��???0%，銷?��??��?增�?35%，客?�管?��??��???5%' :
                          '60% increase in customer response rate, 35% increase in sales conversion, 75% improvement in customer management efficiency'
                        }
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-300 mb-2">
                        {language === 'zh-HK' ? '?���?餐飲業�?訂單?��??��??? : '?���?F&B: Order Processing Automation'}
                      </h4>
                      <p className="text-gray-200 text-sm mb-2">
                        {language === 'zh-HK' ? 
                          '一家�??餐廳使用n8n??��外賣平台?�POS系統?��??�顯示系統。�??��??��??��??��??�統一?��??��?程�?並即?�更?�庫存�??�售?��??? :
                          'A restaurant chain uses n8n to connect delivery platforms, POS systems, and kitchen display systems. All orders are automatically integrated into a unified processing workflow with real-time inventory and sales data updates.'
                        }
                      </p>
                      <p className="text-gray-200 text-sm">
                        <strong>{language === 'zh-HK' ? '?��?�? : 'Results: '}</strong>
                        {language === 'zh-HK' ? 
                          '訂單?��??��?減�?50%，錯誤�??��?85%，�??��??��???0%' :
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
                    {language === 'zh-HK' ? 'n8n?�學習�?源�??�援' : 'n8n Learning Resources and Support'}
                  </motion.h3>

                  <div className="bg-gray-900/50 border-l-4 border-purple-400 p-6 my-8">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">
                      {language === 'zh-HK' ? '?? ?�薦學�?路�?' : '?? Recommended Learning Path'}
                    </h4>
                    <div className="space-y-3 text-gray-200">
                      <div className="flex items-start gap-3">
                        <span className="text-blue-400 font-bold">1.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? '官方?��?�? : 'Official Documentation: '}</strong>
                          <span>{language === 'zh-HK' ? '從基礎�?念�?始�?了解節點、工作�?程�???��?? : 'Start with basic concepts, understand nodes, workflows, and connectors'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-400 font-bold">2.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? '實�??�學�? : 'Hands-on Tutorials: '}</strong>
                          <span>{language === 'zh-HK' ? '跟�?官方?�學?�建你�?第�??�工作�?�? : 'Follow official tutorials to create your first workflow'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold">3.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? '社群?�援�? : 'Community Support: '}</strong>
                          <span>{language === 'zh-HK' ? '?�入Discord社群，�??��??�戶交�?經�?' : 'Join Discord community to exchange experiences with other users'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-orange-400 font-bold">4.</span>
                        <div>
                          <strong>{language === 'zh-HK' ? '?��??�用�? : 'Advanced Applications: '}</strong>
                          <span>{language === 'zh-HK' ? '學�?JavaScript表�?式�??��?義�?點�??? : 'Learn JavaScript expressions and custom node development'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? n8n?��?你�?企業?��?' : '?? Is n8n Right for Your Business?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        'n8n?�別?��??�以下�?求�?香港企業�? :
                        'n8n is particularly suitable for Hong Kong businesses with the following needs:'
                      }
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-cyan-300 mb-2">
                          {language === 'zh-HK' ? '???��?使用n8n?��?況�?' : '??Good fit for n8n:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? '?�要�?度自定義?�自?��?�?��?��?' : 'Need highly customized automation solutions'}</li>
                          <li>??{language === 'zh-HK' ? '?��??��?安全?�隱�? : 'Value data security and privacy'}</li>
                          <li>??{language === 'zh-HK' ? '?��?術�??�支?? : 'Have technical team support'}</li>
                          <li>??{language === 'zh-HK' ? '?��??��?但�?求�??? : 'Limited budget but complex requirements'}</li>
                          <li>??{language === 'zh-HK' ? '?�要整?��??�內?�系�? : 'Need to integrate multiple internal systems'}</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-300 mb-2">
                          {language === 'zh-HK' ? '?��? ?�能不適?��??��?�? : '?��? May not be suitable if:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? '?��?缺�??�術�??? : 'Team lacks technical background'}</li>
                          <li>??{language === 'zh-HK' ? '?�要即?��?線使?? : 'Need immediate deployment'}</li>
                          <li>??{language === 'zh-HK' ? '?��?要簡?��??��??��??? : 'Only need simple automation features'}</li>
                          <li>??{language === 'zh-HK' ? '?��??�入?��?學�?' : 'Cannot invest time in learning'}</li>
                          <li>??{language === 'zh-HK' ? '?�好完全託管?�解決方�? : 'Prefer fully managed solutions'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? 準�??��?你�?n8n?��??��??��?' : '?? Ready to Start Your n8n Automation Journey?'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        'n8n?��?港�?業�?供�?一?�強大而�?活�??��??�平?�。無論�?係想要�??�控?�自己�??��?，�?係�?要�?度自定義?�工作�?程�?n8n?�能夠滿足�??��?求。�??�學習曲線可?��??��?工具稍�?，�?一?��??��?你�??��??��??�自?��??�能?��? :
                        'n8n provides Hong Kong businesses with a powerful and flexible automation platform. Whether you want complete control over your data or need highly customized workflows, n8n can meet your needs. While the learning curve may be steeper than other tools, once mastered, you\'ll have unlimited automation possibilities.'
                      }
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">?��</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?�費?��?使用' : 'Free Open Source Usage'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">?���?/span>
                        <span className="text-sm">{language === 'zh-HK' ? '完全?��??�制' : 'Complete Data Control'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">?��?</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?��??��?義可?? : 'Unlimited Customization Possibilities'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>?��?�?��多�??�n8n?�其他自?��?工具?��?較�??�注?��??�Instagram <strong className="text-blue-300">@ai_formula_</strong> ?��??��?深度?�術�??��?實用?�學??/> :
                      <>Want to learn more about n8n and comparisons with other automation tools? Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more in-depth technical analysis and practical tutorials.</>
                    }
                  </p>
                </>
              )}

              {/* �?篇�?章�??��??�基礎知�?*/}
              {post.id === 5 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {language === 'zh-HK' ? '?��??��?乜嘢�? : 'What is Automation?'}
                  </motion.h2>
                  
                  <p className="mb-6">
                    {language === 'zh-HK' ? 
                      '?��??��??�使?��?術�??��?任�?，�?少�?消除人工干�??��?要。�?工業?�命?��?，自?��?一?��??��?社�??�步?��?要�??�。�??��??��?人工?�能?��??�學習�?術�??��?，自?��?已�?從簡?��?機械?��??��??��??��??�能決�?系統?? :
                      'Automation refers to the use of technology to perform tasks with reduced or eliminated human intervention. Since the Industrial Revolution, automation has been a crucial force driving social progress. Today, with the development of artificial intelligence and machine learning technologies, automation has evolved from simple mechanical operations to complex intelligent decision-making systems.'
                    }
                  </p>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">
                      {language === 'zh-HK' ? '?? ?��??��??��?定義' : '?? Core Definition of Automation'}
                    </h3>
                    <div className="space-y-4 text-gray-200">
                      <p>
                        <strong>{language === 'zh-HK' ? '?�術層?��?' : 'Technical Aspect: '}</strong>
                        {language === 'zh-HK' ? 
                          '?��?軟件?�硬件�??�兩?��??��??��??��??��??�、�??�性�??�可?�測?�任?��? :
                          'Through software, hardware, or a combination of both, automatically execute repetitive, rule-based, or predictable tasks.'
                        }
                      </p>
                      <p>
                        <strong>{language === 'zh-HK' ? '?�業層面�? : 'Business Aspect: '}</strong>
                        {language === 'zh-HK' ? 
                          '?��??��??��?少錯誤、�?低�??��??�放人�?資�??��??�更?�價?��?工�??? :
                          'Improve efficiency, reduce errors, lower costs, and free up human resources to handle more valuable work.'
                        }
                      </p>
                      <p>
                        <strong>{language === 'zh-HK' ? '社�?層面�? : 'Social Aspect: '}</strong>
                        {language === 'zh-HK' ? 
                          '?��?工�?模�?，�??��?活質?��??��?經�??��??��?術創?��? :
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
                    {language === 'zh-HK' ? '?��??��??��?歷�?' : 'Evolution of Automation'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-semibold text-orange-300 mb-3">
                        {language === 'zh-HK' ? '?�� 第�??�段：工業自?��?�?760-1840�? : '?�� Phase 1: Industrial Automation (1760-1840)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '工業?�命帶�??�第一波自?��?浪潮?�蒸汽�??�紡織�??��??��??�出?��?大大?��??�製?�業?��??�。呢?��??��??��??�主要�?機械?��??��??�代?�人?�進�??��??��?體�??��??? :
                          'The Industrial Revolution brought the first wave of automation. The emergence of steam engines, textile machines, and production lines greatly improved manufacturing efficiency. Automation during this period was mainly mechanization, using machines to replace human labor for repetitive physical work.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�鍵影響�? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          '大�?模�??�、�?市�??��??��?�? :
                          'Mass production, urbanization, division of labor'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-300 mb-3">
                        {language === 'zh-HK' ? '??第�??�段：電�???��??��?1870-1914�? : '??Phase 2: Electrical Automation (1870-1914)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?��??�普?�帶?��?第�?次工業革?�。電?��??�電?��??�話?�發?��?令自?��?系統?��?精確?�可?�。�?水�??�產?��??�出?��??��?步�??��??�產?��??? :
                          'The popularization of electricity brought the Second Industrial Revolution. The invention of electric motors, electric lights, and telephones made automation systems more precise and reliable. The emergence of assembly line production further improved production efficiency.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�鍵影響�? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          '標�??��??�、�?質控?�、�?模�?�? :
                          'Standardized production, quality control, economies of scale'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?�� 第�??�段：數位自?��?�?950-2000�? : '?�� Phase 3: Digital Automation (1950-2000)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�腦?�電子�?術�??��??��??�數位自?��??�代?�可編�??�輯?�制?��?PLC）、�??�人?�電?��??�製?��?CAM）�??�現，令?��??�系統更?�智?��??�活?? :
                          'The development of computers and electronic technology ushered in the digital automation era. The emergence of Programmable Logic Controllers (PLCs), robots, and Computer-Aided Manufacturing (CAM) made automation systems more intelligent and flexible.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�鍵影響�? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          '精�?製造、�??��??�、�?訊�?管�?' :
                          'Precision manufacturing, flexible production, information management'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?? 第�??�段：智?�自?��?�?000-?�在�? : '?? Phase 4: Intelligent Automation (2000-Present)'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '人工?�能?��??�學習�??�聯網�?術�?結�?，創?��??�能?��??��??��?�?��系統�??�止?��??��??�設任�?，仲?��?學�??�適?��??�出?�能決�??? :
                          'The combination of artificial intelligence, machine learning, and IoT technologies has created a new era of intelligent automation. Systems can not only execute preset tasks but also learn, adapt, and make intelligent decisions.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�鍵影響�? : 'Key Impact: '}</strong>
                        {language === 'zh-HK' ? 
                          '?�能決�??��?測�??�、個性�??��?' :
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
                    {language === 'zh-HK' ? '點解?��??�要自?��?�? : 'Why Do We Need Automation?'}
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-blue-300 mb-4">
                        {language === 'zh-HK' ? '?�� ?�業層面?��?�? : '?�� Business Level Needs'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? '?��??��?�? : 'Improve Efficiency: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '24/7不�??��?作�??��??�度比人工快?��? : '24/7 continuous operation, processing speed several times faster than manual work'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '減�??�誤�? : 'Reduce Errors: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '消除人為?�誤，確保�??�性�?準確?? : 'Eliminate human errors, ensure consistency and accuracy'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?��??�本�? : 'Lower Costs: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '減�?人�??�本，�??��?源利?��?' : 'Reduce labor costs, improve resource utilization'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?��??��?�? : 'Scale Capability: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '輕�??��?業�?增長，無?�大�?增�?人�?' : 'Easily handle business growth without significant staff increases'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-green-300 mb-4">
                        {language === 'zh-HK' ? '?�� 社�?層面?��?�? : '?�� Social Level Needs'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? '�?��?��??��?' : 'Free Up Labor: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '讓人類�?注於?��??��??�性工�? : 'Allow humans to focus on creative and strategic work'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?��?安全�? : 'Improve Safety: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '減�??�險?��?下�?人工?��?' : 'Reduce manual operations in hazardous environments'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '促進創?��?' : 'Foster Innovation: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?��??�術發展�??�產業�??�現' : 'Drive technological development and emergence of new industries'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?��??�活�? : 'Improve Life: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?��??�好?�產?��??��?體�?' : 'Provide better products and service experiences'}</span>
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
                    {language === 'zh-HK' ? '?��??��?類�??��??? : 'Types and Applications of Automation'}
                  </motion.h3>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-cyan-400">
                      <h4 className="font-semibold text-cyan-300 mb-3">
                        {language === 'zh-HK' ? '?�� 製造業?��??? : '?�� Manufacturing Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�括機器人�??��??�自?��??�儲系統?��?質檢測系統�??�幫?�製?��??��??��??�確保�?質�??�性�?並�?少�??��??��? :
                          'Includes robotic assembly lines, automated warehouse systems, quality inspection systems, etc. Helps manufacturers increase output, ensure quality consistency, and reduce production costs.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�用例�?�? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '汽�??�產線、電子產?��?裝、�??��?�? :
                          'Automotive production lines, electronic product assembly, food packaging'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-300 mb-3">
                        {language === 'zh-HK' ? '?�� 辦公室自?��?' : '?�� Office Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '涵�??��??��??�數?��??�、報?��??�、郵件管?��??�常辦公任�??�透�?軟件工具?�工作�?程自?��?，大幅�??�辦?��??��? :
                          'Covers daily office tasks such as document processing, data entry, report generation, email management, etc. Significantly improves office efficiency through software tools and workflow automation.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�用例�?�? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?��??��??�件?�數?��??�報?�、發票�??? :
                          'Auto-reply emails, data analysis reports, invoice processing'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-300 mb-3">
                        {language === 'zh-HK' ? '?? ?�售業自?��?' : '?? Retail Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '?�括庫�?管�??��??��??�、客?��??�、價?�優?��??�幫?�零?��??��?客戶體�?，優?��??��??��?並�??�銷?�收?��? :
                          'Includes inventory management, order processing, customer service, price optimization, etc. Helps retailers improve customer experience, optimize operational efficiency, and increase sales revenue.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�用例�?�? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '?�助結帳?�智?�推?�、庫存�?貨�??? :
                          'Self-checkout, intelligent recommendations, inventory restocking alerts'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-semibold text-orange-300 mb-3">
                        {language === 'zh-HK' ? '?�� ?��?業自?��?' : '?�� Service Industry Automation'}
                      </h4>
                      <p className="text-gray-200 mb-3">
                        {language === 'zh-HK' ? 
                          '涵�?客戶?��??��?約管?�、支付�??�、個人?��??��??�透�??�天機器人、自?��??�系統�?工具，�??��??�質?��?客戶滿�?度�? :
                          'Covers customer service, appointment management, payment processing, personalized services, etc. Improves service quality and customer satisfaction through chatbots, self-service systems, and other tools.'
                        }
                      </p>
                      <div className="text-sm text-gray-300">
                        <strong>{language === 'zh-HK' ? '?�用例�?�? : 'Application Examples: '}</strong>
                        {language === 'zh-HK' ? 
                          '24小�?客�?機器人、網上�?約系統、自?�支�? :
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
                    {language === 'zh-HK' ? '實施?��??��??�戰?�解決方�? : 'Challenges and Solutions in Implementing Automation'}
                  </motion.h3>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-red-300 mb-4">
                        {language === 'zh-HK' ? '?��? 常�??�戰' : '?��? Common Challenges'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? '?��??��?�? : 'Initial Investment: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?�要相?��?資�??�入購買設�??��?�? : 'Requires significant capital investment in equipment and software'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?�術�??�性�?' : 'Technical Complexity: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?�要�?業知識�?設�??�維護系�? : 'Requires professional knowledge to design and maintain systems'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?�工?��?�? : 'Employee Resistance: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?��?工�?被�?�???��??��?' : 'Fear of job displacement, resistance to change'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '系統?��?�? : 'System Integration: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?��?系統?�兼容性�?�? : 'Compatibility issues between new and existing systems'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-green-300 mb-4">
                        {language === 'zh-HK' ? '??�?��?��?' : '??Solutions'}
                      </h4>
                      <ul className="space-y-3 text-gray-200">
                        <li>
                          <strong>{language === 'zh-HK' ? '?��?段實?��?' : 'Phased Implementation: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '從�?規模?��?，逐步?��?' : 'Start small-scale, gradually expand'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '專業諮詢�? : 'Professional Consultation: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '尋�?專業?��??�幫?��??��?' : 'Seek help and guidance from professional teams'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?�工?��?�? : 'Employee Training: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?��??��?，幫?�員工適?�新?��? : 'Provide training to help employees adapt to new technologies'}</span>
                        </li>
                        <li>
                          <strong>{language === 'zh-HK' ? '?��??�適工具�? : 'Choose Right Tools: '}</strong>
                          <span className="text-sm">{language === 'zh-HK' ? '?��?實�??�求選?��??��??�解決方�? : 'Select the most suitable solutions based on actual needs'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?? ?��??��??��?趨勢' : '?? Future Trends of Automation'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-cyan-300 mb-2">
                          {language === 'zh-HK' ? '?�術發展方?��?' : 'Technology Development Directions:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? '人工?�能?��??�學習�?深度?��?' : 'Deep integration of AI and machine learning'}</li>
                          <li>??{language === 'zh-HK' ? '?�聯網�?IoT）設?��??��??�用' : 'Widespread application of IoT devices'}</li>
                          <li>??{language === 'zh-HK' ? '?�端?��??�平?��??��?' : 'Maturation of cloud automation platforms'}</li>
                          <li>??{language === 'zh-HK' ? '低代�??�代碼�??�工?? : 'Low-code/no-code development tools'}</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">
                          {language === 'zh-HK' ? '?�用趨勢�? : 'Application Trends:'}
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-200">
                          <li>??{language === 'zh-HK' ? '超�??��??��?Hyperautomation�? : 'Hyperautomation'}</li>
                          <li>??{language === 'zh-HK' ? '?�能流�??��??��?IPA�? : 'Intelligent Process Automation (IPA)'}</li>
                          <li>??{language === 'zh-HK' ? '?�適?�自?��?系統' : 'Adaptive automation systems'}</li>
                          <li>??{language === 'zh-HK' ? '人�??��??�新模�?' : 'New models of human-machine collaboration'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-6 my-8">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'zh-HK' ? '?�� ?��?你�??��??��??? : '?�� Start Your Automation Journey'}
                    </h4>
                    <p className="text-gray-200 mb-4">
                      {language === 'zh-HK' ? 
                        '?��??��?係�??�選?��??��??�代企業?��??�發展�?必�??�。無論�?係大企業?��?中�?企�??��?該�?始考慮點樣將自?��??�入?��??�業?��?程中?��?住�??��??��??��??��??�代人�?，而�?讓人類能夠�?注於?��??�值、更?�創?��?工�??? :
                        'Automation is not a choice, but a necessity for modern business survival and development. Whether you\'re a large enterprise or SME, you should start considering how to integrate automation into your business processes. Remember, the goal of automation is not to replace humans, but to allow humans to focus on more valuable and creative work.'
                      }
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-green-300">
                        <span className="text-sm">??</span>
                        <span className="text-sm">{language === 'zh-HK' ? '評估?��?流�?' : 'Assess Current Processes'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-300">
                        <span className="text-sm">?��</span>
                        <span className="text-sm">{language === 'zh-HK' ? '確�??��??�目�? : 'Define Automation Goals'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <span className="text-sm">??</span>
                        <span className="text-sm">{language === 'zh-HK' ? '?��??�適工具' : 'Choose Right Tools'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mt-8">
                    {language === 'zh-HK' ? 
                      <>準�??��?你�??��??��??��??�注?��??�Instagram <strong className="text-blue-300">@ai_formula_</strong> ?��??��??��??�知識�?實用?��???/> :
                      <>Ready to start your automation transformation? Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more automation knowledge and practical guides.</>
                    }
                  </p>
                </>
              )}

              {/* ?��??��??��?設內�?*/}
              {post.id !== 1 && post.id !== 2 && post.id !== 3 && post.id !== 4 && post.id !== 5 && post.id !== 6 && (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    ?��?麼選?�AI Formula�?
                  </motion.h2>
                  
                  <p className="text-lg">
                    ?��?�?��?��??��??��??��?AI Formula?�AI?�術已經在?�無?��?業創?�價?�。在香港?�個瞬?�萬變�??�業?��?中�??�度就是一?�。AI Formula 不只?��?家AI?�司，�??�是你在?��?轉�?路�??�?��??�夥伴�?專�??��?港�?業�?供�??��?AI?��??�解決方案�?
                  </p>
                </>
              )}

              {/* �?篇�?章�?Neuralink */}
              {post.id === 6 && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {isZhTW ? '?��?' : 'Introduction'}
                    </h2>
                    <p className="text-lg leading-relaxed">
                      {isZhTW ? 
                        'Elon Musk ?��??��??�目?��??��??�?�司 Neuralink，�?次�?科幻小說中�??��??��??�現實。�??��?該公?�公布�??�腦機�??��?Brain-Computer Interface, BCI）�?術�?一系�??�大?��?，�??��?示�?令人驚�??��??��??��??��??��?一份�?覆性�??��??��??��??�這�??��?將�?深入?��? Neuralink ?��??��?術�??�、未來�?宏大願景，以?�這�??��?後�?引發?�深?�倫�?討�??? :
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
                      {isZhTW ? '第�?章�??��??��??�——�??�如�??��??�賦予新?�能' : 'Chapter 1: Current Breakthroughs - How Technology Brings New Possibilities to Life'}
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                      {isZhTW ? 
                        '?��? Neuralink ?��??�報?��??��?已�?七�?志�??��??��??�其?��?介面?��??�呢?��??��?實�?室內?��?論�??��?已�??�人體�?實現?��?術。報?�中展示?��??��?清晰?��?繪出 BCI ?�術�??��??�用潛�?�? :
                        'According to reports released by Neuralink, seven volunteers have successfully implanted their brain-computer interface chips. This is no longer a laboratory theory, but a technology that has been realized in the human body. The results shown in the report clearly depict the initial application potential of BCI technology:'
                      }
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-8">
                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-300 mb-4">
                          {isZhTW ? '?? ?�念?�控' : '?? Mind Control'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '植入?�能夠單?�思想，就?��??�腦?�戲?�控?��?械�??��?精細?�書寫�??�至使用專業??3D 設�?軟件?�呢?��?作�??��?大腦?��?令�??�以繞�??�統?�身體�??��??�接轉�??�數碼�??�中?��??��? :
                            'Implant recipients can operate computer games, control robotic arms for precise writing, and even use professional 3D design software using thought alone. These operations mean that brain commands can bypass traditional physical limitations and be directly converted into actions in the digital world.'
                          }
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-300 mb-4">
                          {isZhTW ? '?�� ?��??�用' : '?�� Medical Applications'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?��??�術�?首�??��?，�??��??��??�傷?�漸?��?（ALS）�??��??��??�嚴?��??��?礙�???���??��?一?�全?��?溝通�?互�?渠�??��??�長年無法自?�活?��?表�??�人?��?，呢?��?術�??�止係恢復�??��??��??��??�拾尊嚴?��??��??��?次�???��??��? :
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
                      {isZhTW ? '第�?章�??��??��??�—通�??�全?�接??���?宏大願景' : 'Chapter 2: Future Blueprint - The Grand Vision Towards "Whole Brain Interface"'}
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                      {isZhTW ? 
                        'Neuralink ?�目?�顯?��?止於此。短?��??��??�用?��?第�?步�??��?終目標�?建�?一?�革?�性�??�全?�接??���?Whole Brain Interface）�?徹�??��?人�??��?訊、AI 之�??��?係。根?�佢?��??��?路�??��??��?幾年?��??��?點�??��?' :
                        'Neuralink\'s vision clearly extends beyond this. Short-term medical applications are just the first step, with the ultimate goal being to establish a revolutionary "Whole Brain Interface" that completely changes the relationship between humans, information, and AI. According to their proposed roadmap, key milestones in the coming years include:'
                      }
                    </p>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-orange-300 mb-4">
                          {isZhTW ? '??�?2026年�??�Blindsight?��??? : '??�?2026: "Blindsight" Project'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?�個�??��??��?極具?��?：�?讓失?�人士�?見�??�。透�?將�?覺�??�直?�傳?�到大腦?��?覺皮層�?Blindsight ?�單止�??�恢復基?��??��??�長?�目標更係�?實現超�?�?��人�?範�??�「�?人�?覺」�?例�??�知紅�?線�?紫�?線�? :
                            'This project has an extremely ambitious goal: to restore sight to the blind. By directly transmitting visual signals to the brain\'s visual cortex, Blindsight not only hopes to restore basic vision, but its long-term goal is to achieve "superhuman vision" beyond normal human range, such as perceiving infrared or ultraviolet light.'
                          }
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
                          {isZhTW ? '?? 2028年�?人腦??AI 高速整?? : '?? 2028: High-Speed Human Brain and AI Integration'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '路�??��?下�??��?程�?，�?要實?�人?��?人工?�能（AI）�??��?高速數?�傳輸。呢?��?念�??��?，人類�??�考速度將可以�?機器?��?算速度?��?，�??�徹底改變學習、數?��??��??��?溝通�??�本模�??�喺?�個設?�中，�?言?�至?�能變�?多�?，�??�思想?�以以�??��??�形式直?�共享�? :
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
                      {isZhTW ? '第�?章�?�???�迴?�——�??��?後�??��??�戰' : 'Chapter 3: Widespread Response - Ethical Challenges Behind Opportunities'}
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                      {isZhTW ? 
                        'Neuralink ?�繪?�未來無?�令人�?奮�?但�??�亦引發了�??�?�、學術�?以至?�個社?��?�??討�??��??�。當科�??�能?��??��??�改寫�??��?大腦?��?一系�?複�??�倫�??��?亦隨之浮?��?' :
                        'The future depicted by Neuralink is undoubtedly exciting, but it has also sparked widespread discussion and concern in the tech world, academia, and society as a whole. When technology has the ability to read or even rewrite our brains, a series of complex ethical issues emerge:'
                      }
                    </p>

                    <div className="grid md:grid-cols-1 gap-6">
                      <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-red-300 mb-4">
                          {isZhTW ? '?? 私隱?��??? : '?? Privacy and Security'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '如�??�想?�以被數?��?，�??�思想?��??�仲存�?存在？�??��?權�??��??�腦?�面?�數?��??�啲?��??��??�被黑客?�侵?�被濫用，�??�被?��???��工具�? :
                            'If thoughts can be digitized, does "mental privacy" still exist? Who has the right to access the data in our brains? Could this data be hacked, misused, or even used as surveillance tools?'
                          }
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-purple-300 mb-4">
                          {isZhTW ? '?? 人�??��?�? : '?? Definition of Humanity'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?��??��?大腦?�以?��?科�?不斷?��?，�??��? AI ?��?，人類�?機器之�??��?線�??�喺?�度？�??��??��??��??��??��??�由?��??��??��??�影?��?' :
                            'When our brains can be continuously upgraded through technology, even merged with AI, where will the boundary between humans and machines be? Will our self-consciousness, emotions, and free will be affected?'
                          }
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-yellow-300 mb-4">
                          {isZhTW ? '?��? 社�??�平?��?' : '?��? Social Equity Issues'}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {isZhTW ? 
                            '?��?尖端?�術喺?��?必然?�格不菲?�佢?��??��??�社?��?不平等�?製造出?��??�增強?�」�??�通人之�??�新?��?鴻�?�? :
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
                      {isZhTW ? '總�?：�?上新?�代?��?�? : 'Conclusion: Standing at the Threshold of a New Era'}
                    </h2>
                    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-lg p-8">
                      <p className="text-lg leading-relaxed mb-6">
                        {isZhTW ? 
                          '總括?��?，Neuralink ?�腦機�??��?術�??��??��??��?一?��?滿�??��??�無法忽視�??��?：�??�面，佢?�醫?�康復�??��??�出巨大?��??��??��?治�??�去?��??��??�疾?��??��??�面，佢對人類社?��??��?影響，亦帶�?了�??�?��??�倫�??�戰?? :
                          'In summary, Neuralink\'s brain-computer interface technology presents us with a future that is full of contradictions but cannot be ignored: on one hand, it shows enormous potential in the field of medical rehabilitation, promising to cure diseases that were previously unimaginable; on the other hand, its long-term impact on human society also brings unprecedented ethical challenges.'
                        }
                      </p>
                      <p className="text-lg leading-relaxed mb-6">
                        {isZhTW ? 
                          '?��??�以?��??��?，呢?��?係�?不可?��?科幻?��??��??�?��??�巨輪正?�度滾�?，而�??��??�人?�身?�其中。�?�?��?�思考佢，並且�??�到?��??��?論當中�?將�?係�??��??�呢?�新?�代?��?要�?步�? :
                          'What we can be certain of is that this is no longer a distant science fiction story. The wheels of technological development are rolling, and each of us is part of it. Understanding it, thinking about it, and participating in related discussions will be an important step for us to embrace this new era.'
                        }
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-600">
                        <span className="text-2xl">??</span>
                        <span className="text-lg font-semibold text-white">
                          {isZhTW ? '科�??��??��?，�??��??�好?��?' : 'Technology is changing the future, are we ready?'}
                        </span>
                        <span className="text-2xl">??</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg">
                    <p className="text-gray-300">
                      {isZhTW ? 
                        <>?��?�?��多�??�AI?��??�?��??��??��?訊�??�注?��???Instagram <strong className="text-blue-300">@ai_formula_</strong> ?��??��?深度?��??��?�?�?/> :
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
            {isZhTW ? '?��??��?' : 'Related Articles'}
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
                      {isZhTW ? '?��??��?' : 'Read More'}
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
