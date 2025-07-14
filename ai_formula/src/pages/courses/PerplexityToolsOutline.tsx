import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Users, 
  Target, 
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  PlayCircle,
  Star,
  Calendar,
  BookOpen,
  Zap,
  ArrowRight,
  MessageCircle,
  Shield,
  Globe,
  Rocket,
  ChevronDown,
  ChevronUp,
  Download,
  Monitor,
  Smartphone,
  Lightbulb,
  Gift,
  AlertCircle,
  ExternalLink,
  Repeat,
  CreditCard,
  Database,
  FileText,
  BarChart3,
  TrendingUp as TrendingUpIcon,
  Eye,
  Brain,
  Filter,
  ScanLine,
  Code,
  Tag,
  Heart
} from 'lucide-react';

const PerplexityToolsOutline: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const courseInfo = {
    badge: isZhTW ? "Perplexity 工具班" : "Perplexity Tools Class",
    title: isZhTW ? "『Perplexity 工具班』3小時 成為AI搜尋研究『超級專家』！" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
    subtitle: isZhTW ? "3小時精通Perplexity AI搜尋引擎，從搜尋小白到研究達人！掌握高級搜尋技巧、資料分析、學術研究、商業調查，讓你的搜尋效率提升1000%。" : "Master Perplexity AI search engine in 3 hours, from search novice to research expert! Master advanced search techniques, data analysis, academic research, business investigation.",
    instructor: "Dr. Michael Liu | 資訊研究專家",
    instructorTitle: isZhTW ? "專業導師" : "Professional Instructor"
  };

  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "3小時" : "3 Hours"
    },
    {
      icon: <Search className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "課程數量" : "Course Modules",
      value: isZhTW ? "2個" : "2 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "Pro帳戶試用＋搜尋模板＋專家群組" : "Pro account trial + search templates + expert group"
    }
  ];

  const industryTags = [
    { 
      name: isZhTW ? "日常生活" : "Daily Life", 
      icon: <Lightbulb className="w-4 h-4" />,
      available: true 
    },
    { 
      name: isZhTW ? "保險業" : "Insurance", 
      icon: <Shield className="w-4 h-4" />,
      available: false 
    },
    { 
      name: isZhTW ? "零售業" : "Retail", 
      icon: <Star className="w-4 h-4" />,
      available: false 
    },
    { 
      name: isZhTW ? "金融業" : "Finance", 
      icon: <TrendingUp className="w-4 h-4" />,
      available: false 
    },
    { 
      name: isZhTW ? "教育業" : "Education", 
      icon: <BookOpen className="w-4 h-4" />,
      available: false 
    },
    { 
      name: isZhTW ? "醫療業" : "Healthcare", 
      icon: <Heart className="w-4 h-4" />,
      available: false 
    }
  ];

  const availableCourses = [
    {
      title: isZhTW ? "『編程基礎班』4小時 零基礎學會『真正實用』的程式設計！" : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
      description: isZhTW ? "零基礎學會程式設計的完整課程" : "Complete course for learning programming from zero",
      color: "green",
      available: true
    },
    {
      title: isZhTW ? "『Perplexity 工具班』3小時 成為AI搜尋研究『超級專家』！" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
      description: isZhTW ? "掌握AI搜尋工具的專業技能" : "Master professional skills of AI search tools",
      color: "orange",
      available: true
    }
  ];

  const latestNews = {
    date: "2025年8月15日",
    title: isZhTW ? "9月5日AI搜尋工作坊，專業研究技巧" : "September 5th AI Search Workshop, Professional Research Skills",
    details: [
      { icon: "📅", text: isZhTW ? "日期：2025年9月5日 (星期四)" : "Date: September 5, 2025 (Thursday)" },
      { icon: "🕐", text: isZhTW ? "時間：晚上 7:30 - 10:30 (3小時)" : "Time: 7:30 PM - 10:30 PM (3 hours)" },
      { icon: "🎯", text: isZhTW ? "線上工作坊+實時互動 (Zoom連線)" : "Online Workshop + Real-time Interaction (Zoom)" },
      { icon: "👥", text: isZhTW ? "搜尋專家訓練｜限額 8 位" : "Search Expert Training | Limited to 8 seats" },
      { icon: "✅", text: isZhTW ? "每位學員獲得個人化搜尋策略指導" : "Each student receives personalized search strategy guidance" },
      { icon: "🎁", text: isZhTW ? "搜尋專家價：$1,980 (原價 $2,800)" : "Search Expert Price: $1,980 (Original $2,800)" }
    ],
    note: isZhTW ? "專業搜尋技能，限量開班" : "Professional search skills, limited class"
  };

  const pricingInfo = {
    series: isZhTW ? "全系列優惠價" : "Full Series Special Price",
    price: "$1,980",
    originalPrice: "$2,800",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$1,480",
    enterprise: isZhTW ? "我們亦提供企業培訓服務" : "We also provide enterprise training services"
  };

  const courseFeatures = [
    {
      icon: <Search className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "高級搜尋" : "Advanced Search",
      description: isZhTW ? "掌握專業搜尋技巧與策略" : "Master professional search techniques and strategies",
      highlight: isZhTW ? "搜尋引擎" : "Search Engine"
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      title: isZhTW ? "資料分析" : "Data Analysis",
      description: isZhTW ? "學會從海量資訊中提取關鍵洞察" : "Learn to extract key insights from massive information",
      highlight: isZhTW ? "分析工具" : "Analysis Tools"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "學術研究" : "Academic Research",
      description: isZhTW ? "提升論文寫作與學術調查能力" : "Enhance paper writing and academic investigation skills",
      highlight: isZhTW ? "研究方法" : "Research Methods"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-400" />,
      title: isZhTW ? "商業調查" : "Business Investigation",
      description: isZhTW ? "掌握市場調查與競爭分析技巧" : "Master market research and competitive analysis skills",
      highlight: isZhTW ? "市場分析" : "Market Analysis"
    }
  ];

  const faqData = [
    {
      question: isZhTW ? "我需要有Perplexity Pro帳戶嗎？" : "Do I need a Perplexity Pro account?",
      answer: isZhTW ? "不需要！我們會提供課程期間的Pro帳戶試用，讓你體驗所有進階功能。課程結束後，你可以根據需要決定是否訂閱。" : "No need! We'll provide Pro account trial during the course to experience all advanced features. After the course, you can decide whether to subscribe based on your needs."
    },
    {
      question: isZhTW ? "這個課程適合什麼背景的人？" : "What background is this course suitable for?",
      answer: isZhTW ? "適合所有需要進行資料搜尋的人：學生、研究人員、記者、分析師、創業者、顧問等。無論你是寫論文、做市場調查還是日常研究，都能大幅提升效率。" : "Suitable for anyone who needs to conduct data searches: students, researchers, journalists, analysts, entrepreneurs, consultants, etc."
    },
    {
      question: isZhTW ? "和Google搜尋有什麼不同？" : "What's the difference from Google search?",
      answer: isZhTW ? "Perplexity是AI驅動的搜尋引擎，能夠理解複雜問題、提供摘要答案、引用可靠來源。我們會教你如何充分利用這些AI功能，進行更深入的研究。" : "Perplexity is an AI-driven search engine that can understand complex questions, provide summary answers, and cite reliable sources. We'll teach you how to fully utilize these AI features for deeper research."
    }
  ];

  const handleStartLearning = () => {
    navigate('/perplexity-tools/lesson/1');
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="bg-orange-900 text-orange-300 hover:bg-orange-800 mb-4">
                {courseInfo.badge}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {courseInfo.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {courseInfo.subtitle}
              </p>
            </div>

            {/* Course Overview */}
            <Card className="mb-8 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Search className="w-5 h-5 text-orange-400" />
                  {isZhTW ? "課程總覽" : "Course Overview"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {courseStats.map((stat, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{stat.label}</div>
                        <div className="text-sm text-gray-300 mt-1">{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Tags */}
            <Card className="mb-8 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Tag className="w-5 h-5 text-orange-400" />
                  {isZhTW ? "行業應用" : "Industry Applications"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industryTags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
                      {tag.icon}
                      <span className="text-gray-300">{tag.name}</span>
                      {!tag.available && (
                        <Badge variant="outline" className="ml-auto text-xs text-gray-500 border-gray-600">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Courses */}
            <Card className="mb-8 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BookOpen className="w-5 h-5 text-orange-400" />
                  {isZhTW ? "可選課程" : "Available Courses"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableCourses.map((course, index) => (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-start gap-3">
                        {course.color === 'green' ? (
                          <Code className="w-6 h-6 text-green-400 mt-1" />
                        ) : (
                          <Search className="w-6 h-6 text-orange-400 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-300">{course.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isZhTW ? "最新消息" : "Latest News"}</span>
                  <span>{latestNews.date}</span>
                </div>
                <CardTitle className="text-xl text-white">{latestNews.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {latestNews.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span>{detail.icon}</span>
                      <span className="text-gray-300">{detail.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  {latestNews.note}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Promotional Banner */}
            <Card className="bg-gradient-to-br from-orange-600 to-orange-800 text-white mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">{courseInfo.instructorTitle}</div>
                    <div className="font-semibold">{courseInfo.instructor}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-3">
                  {isZhTW ? "成為AI搜尋研究『超級專家』" : "Become AI Search Research 'Super Expert'"}
                </h3>
                
                <div className="text-sm opacity-90 mb-4">
                  {isZhTW ? "3小時精通：高級搜尋+資料分析+學術研究+商業調查" : "3 Hours Master: Advanced Search + Data Analysis + Academic Research + Business Investigation"}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "掌握AI搜尋引擎的所有進階功能" : "Master all advanced features of AI search engines"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "學會專業資料分析與洞察提取" : "Learn professional data analysis and insight extraction"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "提升搜尋效率1000%，成為資訊專家" : "Increase search efficiency by 1000%"}</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">Search Expert</div>
                  <div className="text-sm opacity-90">{isZhTW ? "AI搜尋專家認證" : "AI Search Expert Certification"}</div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="mb-6 bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400 mb-1">{isZhTW ? "距離最新一期開班還有" : "Next Class Starts In"}</div>
                  <div className="text-2xl font-bold text-orange-400">26 {isZhTW ? "日" : "Days"}</div>
                  <div className="text-sm text-gray-400">{isZhTW ? "3小時" : "3 Hours"}</div>
                </div>

                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 mb-4"
                  onClick={handleStartLearning}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {isZhTW ? "立即報讀" : "Register Now"}
                </Button>

                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-white">{courseInfo.title}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{pricingInfo.series}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-400">{pricingInfo.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pricingInfo.originalPrice}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isZhTW ? "立即線上報名" : "Online Registration"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button variant="ghost" className="w-full text-orange-400 hover:bg-gray-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "透過 WhatsApp 查詢/報名" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="text-center py-2">
                    <div className="text-sm text-gray-400">{pricingInfo.aiInOne}</div>
                    <div className="text-xl font-bold text-orange-400">{pricingInfo.studentPrice}</div>
                    <div className="text-xs text-orange-400 cursor-pointer">{isZhTW ? "如何成為學員？" : "How to become a student?"} →</div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">{pricingInfo.enterprise}</div>
                    <div className="text-xs text-orange-400 cursor-pointer">{isZhTW ? "了解更多" : "Learn More"} →</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            {isZhTW ? "🔍 你會掌握什麼？" : "🔍 What You'll Master"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300 mb-3">{feature.description}</p>
                  <Badge variant="outline" className="text-orange-400 border-orange-400">
                    {feature.highlight}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            {isZhTW ? "❓ 常見問題" : "❓ FAQ"}
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="bg-gray-800 text-white py-16 px-8 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">AI Formula</h2>
            <p className="text-xl text-gray-300">{isZhTW ? "致力推動香港 AI 發展" : "Dedicated to promoting Hong Kong AI development"}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">{isZhTW ? "實用課程" : "Practical Courses"}</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 hover:text-white cursor-pointer">{isZhTW ? "社群活動" : "Community Activities"}</li>
                <li className="text-gray-300 hover:text-white cursor-pointer">{isZhTW ? "部落格" : "Blog"}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">{isZhTW ? "企業培訓" : "Enterprise Training"}</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 hover:text-white cursor-pointer">{isZhTW ? "專業服務" : "Professional Services"}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">{isZhTW ? "關於我們" : "About Us"}</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 hover:text-white cursor-pointer">{isZhTW ? "聯絡我們" : "Contact Us"}</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-600">
            <p className="text-gray-300">© ai-formula.com 2025. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerplexityToolsOutline; 