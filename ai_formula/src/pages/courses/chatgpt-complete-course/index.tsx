/**
 * ChatGPT Complete Course Module
 * @fileoverview ChatGPT 完整教學實戰課程的主入口文件
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, CheckCircle, Clock, BookOpen, ArrowRight,
  Target, TrendingUp, Award, Zap, Star, Trophy, Calendar,
  Brain, Users, MessageSquare, BarChart3, Rocket,
  ChevronRight, ExternalLink, Download, FileText, Lightbulb,
  Infinity, Globe, User
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatGPTCompleteCourseIndex: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  const handleStartCourse = () => {
    navigate('/courses/chatgpt-complete-course/outline');
  };

  const handleWhatsAppRegister = () => {
    const message = '我想報名參加 ChatGPT 完整教學實戰課程';
    window.open(`https://wa.me/85298765432?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 page-content-with-nav">
        {/* Main Grid Layout - 3 columns like image1 */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Left Column - Course Card (matches image1 design) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Course Registration Card */}
              <Card className="bg-gradient-to-br from-purple-600 to-blue-600 border-0 text-white">
                <CardHeader className="pb-4">
                  <div className="text-sm opacity-90 mb-2">
                    ChatGPT 完整教學實戰課程
                  </div>
                  <div className="text-base leading-relaxed">
                    學習實用的 AI 自動化技術，透過智能自動化解決方案系統來改善您的業務營運並推動增長。
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <div className="text-3xl font-bold">
                      免費
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleStartCourse}
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 mb-4"
                  >
                    <User className="w-4 h-4 mr-2" />
                    立即購買
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/courses/chatgpt-complete-course/outline')}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-purple-600 py-3 mb-4"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    查看課程大綱
                  </Button>
                  
                  <Button 
                    onClick={handleWhatsAppRegister}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-purple-600 py-3"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    透過 WhatsApp 查詢/報名
                  </Button>
                </CardContent>
              </Card>

              {/* Course Features Card */}
              <Card className="bg-gray-800 border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Award className="w-5 h-5" />
                    課程價值
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    '永久訪問',
                    '課程證書代碼註冊',
                    '專師網絡支援',
                    '培養演說'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Related Courses */}
              <Card className="bg-gray-800 border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-gray-300 text-sm">
                    相關文章
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Course Details (matches image1 layout) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              
              {/* Course Header */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  ChatGPT 完整教學實戰
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。
                </p>
                
                {/* Feature Icons Row */}
                <div className="grid grid-cols-6 gap-4 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">課程介紹</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">學習內容</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">適合對象</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">學習方針</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">學員心得</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">常見問題</span>
                  </div>
                </div>
              </div>

              {/* Course Overview Statistics (matching image1) */}
              <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Rocket className="w-5 h-5" />
                    課程總覽
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6 text-center mb-6">
                    <div>
                      <div className="text-3xl font-bold text-blue-400 mb-1">12</div>
                      <div className="text-sm text-gray-400">總課程</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400 mb-1">24</div>
                      <div className="text-sm text-gray-400">小時內容</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-400 mb-1">6</div>
                      <div className="text-sm text-gray-400">實戰項目</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-400 mb-1">∞</div>
                      <div className="text-sm text-gray-400">永久觀看</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Time & Course Features Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Learning Time */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-400" />
                      學習時間
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">課程總長度:</span>
                      <span className="text-white">12 週</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">每週學習時間:</span>
                      <span className="text-white">2-3 小時</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">學習模式:</span>
                      <span className="text-white">線上自學</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">語言:</span>
                      <span className="text-white">繁體中文</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Features */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-yellow-400" />
                      課程特色
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      '實戰項目專導',
                      '一對一專業指導',
                      '業界最新工具',
                      '永久課程支援'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Course Outline Section */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">課程主題</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Theme 1 */}
                  <div className="border-b border-gray-700 pb-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">ChatGPT 基礎入門</h3>
                          <p className="text-gray-400 text-sm">瞭解 ChatGPT 基本概念與註冊使用</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* More themes can be added here following the same pattern */}
                </CardContent>
              </Card>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseIndex; 