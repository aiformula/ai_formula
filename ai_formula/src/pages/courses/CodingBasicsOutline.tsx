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
  Code, 
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
  Terminal,
  Database,
  Cpu,
  Search,
  Tag,
  Heart
} from 'lucide-react';

const CodingBasicsOutline: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const courseInfo = {
    badge: isZhTW ? "編程基礎班" : "Coding Basics Class",
    title: isZhTW ? "『編程基礎班』4小時 零基礎學會『真正實用』的程式設計！" : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
    subtitle: isZhTW ? "4小時掌握程式設計核心，建構你的第一個完整網站！包含HTML+CSS+JavaScript+後端整合，完整全棧開發體驗，讓你從零基礎變成程式設計師。" : "Master programming fundamentals in 4 hours, build your first complete website! Including HTML+CSS+JavaScript+backend integration, full-stack development experience.",
    instructor: "Alex Wong | 資深開發者",
    instructorTitle: isZhTW ? "首席導師" : "Chief Instructor"
  };

  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "4小時" : "4 Hours"
    },
    {
      icon: <Code className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "課程數量" : "Course Modules",
      value: isZhTW ? "3個" : "3 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "終身學習支援＋程式碼永久存取" : "Lifetime learning support + permanent code access"
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
    date: "2025年8月5日",
    title: isZhTW ? "9月15日編程馬拉松，現正接受報名" : "September 15th Coding Marathon, Now Accepting Registration",
    details: [
      { icon: "📅", text: isZhTW ? "日期：2025年9月15日 (星期六)" : "Date: September 15, 2025 (Saturday)" },
      { icon: "🕐", text: isZhTW ? "時間：上午 9:00 - 下午 1:00 (4小時)" : "Time: 9:00 AM - 1:00 PM (4 hours)" },
      { icon: "🎯", text: isZhTW ? "編程實驗室+雲端協作 (報名確認)" : "Coding Lab + Cloud Collaboration (Registration Confirmation)" },
      { icon: "👥", text: isZhTW ? "專業編程教學｜限額 12 位" : "Professional Coding Teaching | Limited to 12 seats" },
      { icon: "✅", text: isZhTW ? "導師一對一指導，確保每位學員完成項目" : "One-on-one instructor guidance, ensure project completion" },
      { icon: "🎁", text: isZhTW ? "程式設計優惠：$3,800 (原價 $4,800)" : "Coding Special: $3,800 (Original $4,800)" }
    ],
    note: isZhTW ? "小班教學，報名從速" : "Small class teaching, register quickly"
  };

  const pricingInfo = {
    series: isZhTW ? "全系列優惠價" : "Full Series Special Price",
    price: "$3,800",
    originalPrice: "$4,800",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$2,800",
    enterprise: isZhTW ? "我們亦提供企業培訓服務" : "We also provide enterprise training services"
  };

  const courseFeatures = [
    {
      icon: <Code className="w-8 h-8 text-green-400" />,
      title: isZhTW ? "零基礎友善" : "Beginner Friendly",
      description: isZhTW ? "從最基礎開始，循序漸進學習程式設計" : "Start from basics, gradually learn programming",
      highlight: isZhTW ? "HTML/CSS/JS" : "HTML/CSS/JS"
    },
    {
      icon: <Terminal className="w-8 h-8 text-blue-400" />,
      title: isZhTW ? "實際動手做" : "Hands-on Practice",
      description: isZhTW ? "每個概念都配合實際編程練習" : "Every concept paired with actual coding practice",
      highlight: isZhTW ? "實戰項目" : "Real Projects"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "全棧開發" : "Full-Stack Development",
      description: isZhTW ? "涵蓋前端、後端、資料庫完整開發流程" : "Cover frontend, backend, database complete development",
      highlight: isZhTW ? "Node.js" : "Node.js"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "項目導向" : "Project-Based",
      description: isZhTW ? "建構真實項目，學習更有成就感" : "Build real projects, learning with achievement",
      highlight: isZhTW ? "個人作品集" : "Portfolio"
    }
  ];

  const faqData = [
    {
      question: isZhTW ? "完全沒有程式設計經驗可以參加嗎？" : "Can I join with no programming experience?",
      answer: isZhTW ? "完全可以！我們的課程專為初學者設計，從最基礎的概念開始教學，並提供充足的練習時間。導師會逐步引導每位學員，確保大家都能跟上進度。" : "Absolutely! Our course is designed for beginners, starting from basic concepts with plenty of practice time."
    },
    {
      question: isZhTW ? "課程結束後我能獨立開發網站嗎？" : "Can I develop websites independently after the course?",
      answer: isZhTW ? "是的！課程結束後你將擁有完整的程式設計基礎，能夠獨立建構簡單的網站。我們也提供後續的進階課程和技術支援。" : "Yes! After the course, you'll have complete programming fundamentals to independently build simple websites."
    },
    {
      question: isZhTW ? "需要準備什麼設備或軟體嗎？" : "What equipment or software do I need to prepare?",
      answer: isZhTW ? "只需要帶上你的筆記本電腦即可！我們會在課程開始前協助大家安裝必要的開發工具，並提供詳細的設置指南。" : "Just bring your laptop! We'll help install necessary development tools before the course starts."
    }
  ];

  const handleStartLearning = () => {
    navigate('/coding-basics/lesson/1');
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
              <Badge className="bg-green-900 text-green-300 hover:bg-green-800 mb-4">
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
                  <Code className="w-5 h-5 text-green-400" />
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
                  <Tag className="w-5 h-5 text-green-400" />
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
                  <BookOpen className="w-5 h-5 text-green-400" />
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
            <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">{courseInfo.instructorTitle}</div>
                    <div className="font-semibold">{courseInfo.instructor}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-3">
                  {isZhTW ? "零基礎學會『真正實用』的程式設計" : "Learn 'Truly Practical' Programming from Zero"}
                </h3>
                
                <div className="text-sm opacity-90 mb-4">
                  {isZhTW ? "4小時完成：網站前端+後端+資料庫=完整Web App" : "4 Hours Complete: Frontend + Backend + Database = Complete Web App"}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "全程實戰編程，邊學邊做，立即看到成果" : "Full hands-on coding practice"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "學會現代開發工具，提升工作效率" : "Learn modern development tools"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "建立個人作品集，展示編程能力" : "Build personal portfolio"}</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">Web Development</div>
                  <div className="text-sm opacity-90">{isZhTW ? "全棧開發實戰" : "Full-Stack Practice"}</div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="mb-6 bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400 mb-1">{isZhTW ? "距離最新一期開班還有" : "Next Class Starts In"}</div>
                  <div className="text-2xl font-bold text-green-400">32 {isZhTW ? "日" : "Days"}</div>
                  <div className="text-sm text-gray-400">{isZhTW ? "4小時" : "4 Hours"}</div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mb-4"
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
                      <span className="text-2xl font-bold text-green-400">{pricingInfo.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pricingInfo.originalPrice}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isZhTW ? "立即線上報名" : "Online Registration"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button variant="ghost" className="w-full text-green-400 hover:bg-gray-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "透過 WhatsApp 查詢/報名" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="text-center py-2">
                    <div className="text-sm text-gray-400">{pricingInfo.aiInOne}</div>
                    <div className="text-xl font-bold text-green-400">{pricingInfo.studentPrice}</div>
                    <div className="text-xs text-green-400 cursor-pointer">{isZhTW ? "如何成為學員？" : "How to become a student?"} →</div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">{pricingInfo.enterprise}</div>
                    <div className="text-xs text-green-400 cursor-pointer">{isZhTW ? "了解更多" : "Learn More"} →</div>
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
            {isZhTW ? "💡 你會獲得什麼？" : "💡 What You'll Gain"}
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
                  <Badge variant="outline" className="text-green-400 border-green-400">
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

export default CodingBasicsOutline; 