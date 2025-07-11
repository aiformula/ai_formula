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
  Brain, 
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
  Code,
  Search,
  Tag,
  Heart,
  Database
} from 'lucide-react';

const PromptEngineeringOutline: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const courseInfo = {
    badge: isZhTW ? "AI 主題班" : "AI Master Class",
    title: isZhTW ? "『AI 主題班』3小時 手把手教你一步步做出『真正用得』手機 AI App！" : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
    subtitle: isZhTW ? "3小時完成兩個手機 App，含登入+雲端資料庫+AI功能！《AI App MVP 實戰班》由零開始，手把手教你建構前中後台，讓你帶走歷練硬編碼與模版。" : "Complete 2 mobile apps in 3 hours, including login + cloud database + AI features! 'AI App MVP Bootcamp' from zero to hero, step-by-step guidance to build frontend, middleware, and backend.",
    instructor: "Calpa Liu | 全端工程師",
    instructorTitle: isZhTW ? "最貴導師" : "Premium Instructor"
  };

  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "3小時" : "3 Hours"
    },
    {
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "課程數量" : "Course Modules",
      value: isZhTW ? "1個" : "1 Module"
    },
    {
      icon: <Repeat className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "一次報名，可重複參與實體課程＋永久線上重溫" : "One registration, unlimited physical + online access"
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
    date: "2025年7月10日",
    title: isZhTW ? "8月24日現場開班，限時報名優惠中" : "August 24th Live Class, Limited Time Registration Offer",
    details: [
      { icon: "📅", text: isZhTW ? "日期：2025年8月24日 (星期日)" : "Date: August 24, 2025 (Sunday)" },
      { icon: "🕐", text: isZhTW ? "時間：下午 2:30 - 5:30 (3小時)" : "Time: 2:30 PM - 5:30 PM (3 hours)" },
      { icon: "🎯", text: isZhTW ? "實體教學+線上同步 (報端)" : "Physical + Online Sync (Registration)" },
      { icon: "👥", text: isZhTW ? "小班實作教學｜僅限 15 位" : "Small Class Hands-on Teaching | Limited to 15 seats" },
      { icon: "✅", text: isZhTW ? "導師即場指導，親手完成 App 成品" : "Instructor guidance, hands-on App completion" },
      { icon: "🎁", text: isZhTW ? "早鳥優惠價：$4,500 (原價 $5,350)" : "Early Bird Price: $4,500 (Original $5,350)" }
    ],
    note: isZhTW ? "名額有限，報名即止" : "Limited seats, register now"
  };

  const pricingInfo = {
    series: isZhTW ? "全系列優惠價" : "Full Series Special Price",
    price: "$4,500",
    originalPrice: "$5,250",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$3,500",
    enterprise: isZhTW ? "我們亦提供企業培訓服務" : "We also provide enterprise training services"
  };

  const courseFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: isZhTW ? "AI 技術整合" : "AI Technology Integration",
      description: isZhTW ? "學習最新 AI 技術整合到手機應用" : "Learn to integrate latest AI technology into mobile apps",
      highlight: isZhTW ? "ChatGPT API" : "ChatGPT API"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: isZhTW ? "手機 App 開發" : "Mobile App Development",
      description: isZhTW ? "從零開始建構完整的手機應用程式" : "Build complete mobile applications from scratch",
      highlight: isZhTW ? "React Native" : "React Native"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "雲端資料庫" : "Cloud Database",
      description: isZhTW ? "整合雲端資料庫與用戶認證系統" : "Integrate cloud database and user authentication",
      highlight: isZhTW ? "Firebase" : "Firebase"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "小班教學" : "Small Class Teaching",
      description: isZhTW ? "限制15人，確保每位學員都能完成" : "Limited to 15 students, ensure everyone completes",
      highlight: isZhTW ? "1對1指導" : "1-on-1 Guidance"
    }
  ];

  const faqData = [
    {
      question: isZhTW ? "我報名後，可以無限重複參與實體課程？" : "After registration, can I attend physical classes unlimited times?",
      answer: isZhTW ? "是的！我們承諾為報課完整課程的學員提供半年內無限次參加同課程的待遇，確保你有充足的時間深入學習，掌握每一項技能。" : "Yes! We promise students who complete the full course can attend the same course unlimited times within half a year."
    },
    {
      question: isZhTW ? "我可以用其他方法支付課程費用嗎？" : "Can I pay course fees by other methods?",
      answer: isZhTW ? "可以！如需其他支付方法，請 WhatsApp 我們，我們樂意為你提供協助。" : "Yes! If you need other payment methods, please WhatsApp us for assistance."
    },
    {
      question: isZhTW ? "課程是否提供學習資料？" : "Does the course provide learning materials?",
      answer: isZhTW ? "是的，我們提供互動式大書和AI助手，整合課程筆記和課堂筆音，方便您隨時複習。" : "Yes, we provide interactive materials and AI assistants with integrated course notes."
    }
  ];

  const handleStartLearning = () => {
    navigate('/prompt-engineering/lesson1');
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
              <Badge className="bg-blue-900 text-blue-300 hover:bg-blue-800 mb-4">
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
                  <Rocket className="w-5 h-5 text-blue-400" />
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
                  <Tag className="w-5 h-5 text-blue-400" />
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
                  <BookOpen className="w-5 h-5 text-blue-400" />
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
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">{courseInfo.instructorTitle}</div>
                    <div className="font-semibold">{courseInfo.instructor}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-3">
                  {isZhTW ? "手把手教你一步步做出『真正用得』手機 AI App" : "Step-by-Step Guide to Building 'Truly Useful' Mobile AI App"}
                </h3>
                
                <div className="text-sm opacity-90 mb-4">
                  {isZhTW ? "3小時完成：有會員登入、有後台＋資料庫=AI App" : "3 Hours Complete: Member login + Backend + Database = AI App"}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "全程辦 AI App 開發實戰，邊學前端現場，實戰問案例與結果分類整理" : "Full AI App development hands-on"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "學會 No-Code 工具搭建 AI 解付，目前正在是精簡的企業工具包" : "Learn No-Code AI tools"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "我們亦友女性上班族，消除，新鮮、JSON、呈業精演，圍讓你探訪的等級" : "Enterprise-level solutions"}</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">AI App MVP</div>
                  <div className="text-sm opacity-90">{isZhTW ? "數字實戰2課" : "Digital Practice 2 Sessions"}</div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="mb-6 bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400 mb-1">{isZhTW ? "距離最新一期開班還有" : "Next Class Starts In"}</div>
                  <div className="text-2xl font-bold text-blue-400">45 {isZhTW ? "日" : "Days"}</div>
                  <div className="text-sm text-gray-400">{isZhTW ? "8小時" : "8 Hours"}</div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mb-4"
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
                      <span className="text-2xl font-bold text-blue-400">{pricingInfo.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pricingInfo.originalPrice}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isZhTW ? "立即線上報名" : "Online Registration"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button variant="ghost" className="w-full text-blue-400 hover:bg-gray-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "透過 WhatsApp 查詢/報名" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="text-center py-2">
                    <div className="text-sm text-gray-400">{pricingInfo.aiInOne}</div>
                    <div className="text-xl font-bold text-blue-400">{pricingInfo.studentPrice}</div>
                    <div className="text-xs text-blue-400 cursor-pointer">{isZhTW ? "如何成為學員？" : "How to become a student?"} →</div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">{pricingInfo.enterprise}</div>
                    <div className="text-xs text-blue-400 cursor-pointer">{isZhTW ? "了解更多" : "Learn More"} →</div>
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
            {isZhTW ? "🎯 你會學到什麼？" : "🎯 What You'll Learn"}
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
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
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

export default PromptEngineeringOutline; 