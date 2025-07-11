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
  MessageSquare, 
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
  Bot,
  Brain,
  Sparkles,
  Wand2,
  Cpu,
  Mic,
  Code,
  Search,
  Tag,
  Heart
} from 'lucide-react';

const ChatGPTMasteryOutline: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const courseInfo = {
    badge: isZhTW ? "ChatGPT 精通班" : "ChatGPT Mastery Class",
    title: isZhTW ? "『ChatGPT 精通班』5小時 掌握AI對話藝術成為『真正專家』！" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
    subtitle: isZhTW ? "5小時深度掌握ChatGPT，從對話新手到AI專家！涵蓋提示工程、創意寫作、商業應用、API整合，全方位提升你的AI運用能力，讓你成為職場AI達人。" : "Master ChatGPT in 5 hours, from conversation novice to AI expert! Covering prompt engineering, creative writing, business applications, API integration.",
    instructor: "Sarah Chen | AI 對話專家",
    instructorTitle: isZhTW ? "資深導師" : "Senior Instructor"
  };

  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "5小時" : "5 Hours"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "課程數量" : "Course Modules",
      value: isZhTW ? "4個" : "4 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "終身會員＋AI工具包＋專家社群" : "Lifetime membership + AI toolkit + expert community"
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
    date: "2025年9月1日",
    title: isZhTW ? "10月1日AI大師班，ChatGPT-4專場" : "October 1st AI Master Class, ChatGPT-4 Special",
    details: [
      { icon: "📅", text: isZhTW ? "日期：2025年10月1日 (星期二)" : "Date: October 1, 2025 (Tuesday)" },
      { icon: "🕐", text: isZhTW ? "時間：晚上 7:00 - 12:00 (5小時)" : "Time: 7:00 PM - 12:00 AM (5 hours)" },
      { icon: "🎯", text: isZhTW ? "AI研究室+遠程參與 (確認後通知)" : "AI Lab + Remote Participation (Confirmation notification)" },
      { icon: "👥", text: isZhTW ? "AI精英訓練｜嚴格限制 10 位" : "AI Elite Training | Strictly Limited to 10 seats" },
      { icon: "✅", text: isZhTW ? "每位學員獲得個人AI助手設置指導" : "Each student receives personal AI assistant setup guidance" },
      { icon: "🎁", text: isZhTW ? "AI專家特價：$2,980 (原價 $4,200)" : "AI Expert Special: $2,980 (Original $4,200)" }
    ],
    note: isZhTW ? "頂級AI培訓，機會難得" : "Premium AI training, rare opportunity"
  };

  const pricingInfo = {
    series: isZhTW ? "全系列優惠價" : "Full Series Special Price",
    price: "$2,980",
    originalPrice: "$4,200",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$2,200",
    enterprise: isZhTW ? "我們亦提供企業培訓服務" : "We also provide enterprise training services"
  };

  const courseFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "對話大師" : "Conversation Master",
      description: isZhTW ? "學會與AI進行高效、創意的對話" : "Learn efficient, creative conversations with AI",
      highlight: isZhTW ? "提示工程" : "Prompt Engineering"
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: isZhTW ? "AI思維訓練" : "AI Thinking Training",
      description: isZhTW ? "掌握AI邏輯思維與問題解決方法" : "Master AI logical thinking and problem-solving methods",
      highlight: isZhTW ? "邏輯推理" : "Logical Reasoning"
    },
    {
      icon: <Wand2 className="w-8 h-8 text-pink-400" />,
      title: isZhTW ? "創意應用" : "Creative Applications",
      description: isZhTW ? "解鎖AI創意潛能，內容創作無極限" : "Unlock AI creative potential, unlimited content creation",
      highlight: isZhTW ? "內容創作" : "Content Creation"
    },
    {
      icon: <Cpu className="w-8 h-8 text-green-400" />,
      title: isZhTW ? "商業整合" : "Business Integration",
      description: isZhTW ? "將AI融入工作流程，提升職場效率" : "Integrate AI into workflows, enhance workplace efficiency",
      highlight: isZhTW ? "API整合" : "API Integration"
    }
  ];

  const faqData = [
    {
      question: isZhTW ? "我需要有技術背景才能學習嗎？" : "Do I need a technical background to learn?",
      answer: isZhTW ? "完全不需要！我們的課程從基礎開始，循序漸進。無論你是完全的初學者，還是已有一些經驗，都能在課程中找到適合自己的學習節奏。" : "Not at all! Our course starts from basics and progresses gradually. Whether you're a complete beginner or have some experience, you can find a learning pace that suits you."
    },
    {
      question: isZhTW ? "課程結束後我能達到什麼水平？" : "What level can I reach after the course?",
      answer: isZhTW ? "完成課程後，你將能夠：熟練使用ChatGPT進行各種任務、設計高效的提示詞、創建個人AI助手、將AI整合到工作流程中。" : "After completing the course, you'll be able to: proficiently use ChatGPT for various tasks, design efficient prompts, create personal AI assistants, integrate AI into workflows."
    },
    {
      question: isZhTW ? "ChatGPT Plus會員是必需的嗎？" : "Is ChatGPT Plus membership required?",
      answer: isZhTW ? "建議但非必須。我們會教授如何最大化免費版本的使用效果，同時也會展示Plus版本的進階功能。我們提供測試帳號供課程使用。" : "Recommended but not required. We'll teach how to maximize the free version's effectiveness while demonstrating Plus version's advanced features."
    }
  ];

  const handleStartLearning = () => {
    navigate('/chatgpt-mastery/lesson/1');
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
              <Badge className="bg-purple-900 text-purple-300 hover:bg-purple-800 mb-4">
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
                  <MessageSquare className="w-5 h-5 text-purple-400" />
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
                  <Tag className="w-5 h-5 text-purple-400" />
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
                  <BookOpen className="w-5 h-5 text-purple-400" />
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
            <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">{courseInfo.instructorTitle}</div>
                    <div className="font-semibold">{courseInfo.instructor}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-3">
                  {isZhTW ? "掌握AI對話藝術成為『真正專家』" : "Master AI Conversation Art to Become a 'True Expert'"}
                </h3>
                
                <div className="text-sm opacity-90 mb-4">
                  {isZhTW ? "5小時精通：提示工程+創意寫作+商業應用+API整合" : "5 Hours Master: Prompt Engineering + Creative Writing + Business Applications + API Integration"}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "掌握高級對話技巧，讓AI成為你的智能助手" : "Master advanced conversation techniques"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "學會創意內容生成，提升工作創造力" : "Learn creative content generation"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isZhTW ? "整合AI到業務流程，提升工作效率500%" : "Integrate AI into business processes"}</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">ChatGPT Expert</div>
                  <div className="text-sm opacity-90">{isZhTW ? "AI對話專家認證" : "AI Conversation Expert Certification"}</div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="mb-6 bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400 mb-1">{isZhTW ? "距離最新一期開班還有" : "Next Class Starts In"}</div>
                  <div className="text-2xl font-bold text-purple-400">19 {isZhTW ? "日" : "Days"}</div>
                  <div className="text-sm text-gray-400">{isZhTW ? "5小時" : "5 Hours"}</div>
                </div>

                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 mb-4"
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
                      <span className="text-2xl font-bold text-purple-400">{pricingInfo.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pricingInfo.originalPrice}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isZhTW ? "立即線上報名" : "Online Registration"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button variant="ghost" className="w-full text-purple-400 hover:bg-gray-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "透過 WhatsApp 查詢/報名" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="text-center py-2">
                    <div className="text-sm text-gray-400">{pricingInfo.aiInOne}</div>
                    <div className="text-xl font-bold text-purple-400">{pricingInfo.studentPrice}</div>
                    <div className="text-xs text-purple-400 cursor-pointer">{isZhTW ? "如何成為學員？" : "How to become a student?"} →</div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">{pricingInfo.enterprise}</div>
                    <div className="text-xs text-purple-400 cursor-pointer">{isZhTW ? "了解更多" : "Learn More"} →</div>
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
            {isZhTW ? "🎯 你會獲得什麼？" : "🎯 What You'll Gain"}
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
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
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

export default ChatGPTMasteryOutline; 