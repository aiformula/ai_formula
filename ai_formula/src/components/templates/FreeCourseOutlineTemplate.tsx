import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRecentPosts } from '@/data/blog/blogPosts';
import AnimatedFAQ from '@/components/AnimatedFAQ';
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
  GraduationCap,
  Briefcase,
  UserCheck,
  Code,
  Search,
  Tag,
  Heart,
  Database
} from 'lucide-react';

// 定義免費課程基本信息接口
interface FreeCourseInfo {
  badge: string;
  title: string;
  subtitle: string;
  instructor: string;
  instructorTitle: string;
  rating: number;
  students: number;
  duration: string;
}

// 定義免費課程統計接口
interface FreeCourseStat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// 定義免費課程模組接口
interface FreeCourseModule {
  id: number;
  title: string;
  description: string;
  lessons: Array<{
    id: number;
    title: string;
    duration: string;
    type: 'video' | 'reading' | 'practice';
    isPreview: boolean;
  }>;
}

// 定義免費課程特色接口
interface FreeCourseFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

// 定義免費課程 FAQ 接口
interface FreeFAQ {
  question: string;
  answer: string;
}

// 定義免費課程目標學員接口
interface FreeTargetAudience {
  title: string;
  description: string;
  audiences: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

// 定義主模組 Props 接口
interface FreeCourseOutlineTemplateProps {
  courseInfo: FreeCourseInfo;
  courseStats: FreeCourseStat[];
  courseModules: FreeCourseModule[];
  courseFeatures: FreeCourseFeature[];
  faqData: FreeFAQ[];
  targetAudience: FreeTargetAudience;
  onStartLearning: () => void;
  onWhatsApp?: () => void;
}

const FreeCourseOutlineTemplate: React.FC<FreeCourseOutlineTemplateProps> = ({
  courseInfo,
  courseStats,
  courseModules,
  courseFeatures,
  faqData,
  targetAudience,
  onStartLearning,
  onWhatsApp
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-HK';
  const [activeTab, setActiveTab] = useState<string>('course-intro');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // 根據導師名稱定義顏色主題 - 免費課程使用綠色主題
  const instructorTheme = {
    gradient: 'from-green-600 to-green-800',
    primary: 'text-green-400',
    secondary: 'bg-green-600 hover:bg-green-700',
    accent: 'text-green-400 border-green-400'
  };

  // Tab定義
  const tabs = [
    {
      id: 'course-intro',
      label: isZhTW ? '課程介紹' : 'Course Introduction',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'learning-content',
      label: isZhTW ? '學習內容' : 'Learning Content',
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      id: 'target-audience',
      label: isZhTW ? '適合對象' : 'Target Audience',
      icon: <UserCheck className="w-4 h-4" />
    },
    {
      id: 'instructor-profile',
      label: isZhTW ? '導師介紹' : 'Meet Your Instructor',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'faq',
      label: isZhTW ? '常見問題' : 'FAQ',
      icon: <MessageCircle className="w-4 h-4" />
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp();
    } else {
      console.log('WhatsApp inquiry');
    }
  };

  // 渲染不同tab的內容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'course-intro':
        return (
          <div className="space-y-8">
            {/* Course Overview - Enhanced */}
            <div className="space-y-6">
              {/* 主要課程信息卡片 */}
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${instructorTheme.gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${instructorTheme.gradient}`}>
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {isZhTW ? "免費課程總覽" : "Free Course Overview"}
                    </h2>
                  </div>

                  {/* 課程統計數據 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {courseStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* 詳細課程特色 */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhTW ? "學習安排" : "Learning Schedule"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "課程總長度" : "Total Duration"}</span>
                          <span className="text-white font-semibold">{courseInfo.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "學習模式" : "Learning Mode"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "線上自學" : "Self-Paced"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "語言" : "Language"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "繁體中文" : "Traditional Chinese"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "費用" : "Price"}</span>
                          <span className={`font-semibold ${instructorTheme.primary}`}>{isZhTW ? "完全免費" : "Completely Free"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Award className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhTW ? "課程特色" : "Course Features"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "實戰項目導向" : "Project-Based Learning"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "永久觀看權限" : "Lifetime Access"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "業界最新工具" : "Latest Industry Tools"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "完成證書頒發" : "Certificate of Completion"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 免費課程價值展示 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Gift className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "免費課程價值" : "Free Course Value"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-1">{isZhTW ? "快速上手" : "Quick Start"}</h4>
                      <p className="text-xs text-gray-400">{isZhTW ? "30分鐘內掌握核心概念" : "Master core concepts in 30 minutes"}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-1">{isZhTW ? "實際應用" : "Practical Application"}</h4>
                      <p className="text-xs text-gray-400">{isZhTW ? "學完即可應用到工作中" : "Apply immediately to work"}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-1">{isZhTW ? "社群支持" : "Community Support"}</h4>
                      <p className="text-xs text-gray-400">{isZhTW ? "加入學習社群互相交流" : "Join learning community"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'learning-content':
        return (
          <div className="space-y-8">
            {/* Course Modules */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "🎯 課程大綱" : "🎯 Course Modules"}
              </h3>
              
              {/* Module Accordion */}
              <div className="space-y-4 mb-8">
                {courseModules.map((module, index) => (
                  <Card key={module.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleAccordion(module.id)}
                        className="w-full p-6 text-left hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center text-white font-bold`}>
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{module.title}</h3>
                              <p className="text-gray-400 mt-1">{module.description}</p>
                            </div>
                          </div>
                          {openAccordion === module.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      {openAccordion === module.id && (
                        <div className="px-6 pb-6 space-y-3">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                  {lesson.type === 'video' && <PlayCircle className="h-4 w-4 text-white" />}
                                  {lesson.type === 'reading' && <BookOpen className="h-4 w-4 text-white" />}
                                  {lesson.type === 'practice' && <Target className="h-4 w-4 text-white" />}
                                </div>
                                <div>
                                  <p className="text-white font-medium">{lesson.title}</p>
                                  <p className="text-gray-400 text-sm">{lesson.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.isPreview && (
                                  <Badge className="bg-green-600 text-white text-xs">
                                    {isZhTW ? '預覽' : 'Preview'}
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                                  {isZhTW ? '免費' : 'Free'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Course Features */}
              <div className="grid md:grid-cols-2 gap-6">
                {courseFeatures.map((feature, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-white">{feature.title}</h4>
                          <p className="text-gray-300 mb-3">{feature.description}</p>
                          <Badge variant="outline" className={instructorTheme.accent}>
                            {feature.highlight}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'target-audience':
        return (
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {targetAudience.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">{targetAudience.description}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {targetAudience.audiences.map((audience, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        {audience.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{audience.title}</h4>
                        <p className="text-sm text-gray-300">{audience.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'instructor-profile':
        return (
          <div className="space-y-8">
            {/* 導師基本信息 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center flex-shrink-0`}>
                    <div className="text-white text-center">
                      <div className="text-4xl font-bold mb-1">{courseInfo.instructor.charAt(0)}</div>
                      <div className="text-sm opacity-90">導師</div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">{courseInfo.instructor}</h2>
                    <p className="text-xl text-gray-300 mb-4">{courseInfo.instructorTitle}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <Badge className={`${instructorTheme.secondary} text-white`}>
                        {isZhTW ? "AI 專家" : "AI Expert"}
                      </Badge>
                      <Badge className={`${instructorTheme.secondary} text-white`}>
                        {isZhTW ? "資深導師" : "Senior Instructor"}
                      </Badge>
                      <Badge className={`${instructorTheme.secondary} text-white`}>
                        {isZhTW ? "免費教育推廣者" : "Free Education Advocate"}
                      </Badge>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {isZhTW 
                        ? `擁有超過 8 年AI 技術應用經驗，專精於 AI 工具在創意產業的實務應用。曾協助超過 200 家企業導入 AI 自動化流程，學員遍佈全球，累計培養超過 3,000 名 AI 應用專才。致力於推廣免費 AI 教育，讓更多人能夠掌握 AI 技能。`
                        : `With over 8 years of AI technology application experience, specializing in practical AI tool applications in creative industries. Has successfully helped over 200 companies implement AI automation processes, with students worldwide and over 3,000 AI application specialists trained. Dedicated to promoting free AI education for everyone.`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 為什麼提供免費課程 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Heart className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "為什麼提供免費課程" : "Why Free Course"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-6 bg-gradient-to-r ${instructorTheme.gradient} rounded-lg`}>
                  <blockquote className="text-white text-lg leading-relaxed italic">
                    {isZhTW 
                      ? "「我相信知識應該是人人都能獲得的。AI 技術正在改變世界，但不應該只是少數人的特權。通過這個免費課程，我希望能夠幫助更多人了解和掌握 AI 工具，讓科技真正為所有人服務。每個人都應該有機會學習和成長，不應該被經濟條件所限制。」"
                      : "\"I believe knowledge should be accessible to everyone. AI technology is changing the world, but it shouldn't be a privilege for just a few. Through this free course, I hope to help more people understand and master AI tools, making technology truly serve everyone. Everyone should have the opportunity to learn and grow, without being limited by economic conditions.\""
                    }
                  </blockquote>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{courseInfo.instructor.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{courseInfo.instructor}</div>
                      <div className="text-sm text-white/80">{courseInfo.instructorTitle}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'faq':
        return (
          <AnimatedFAQ
            faqData={faqData}
            themeColors={instructorTheme}
            isZhTW={isZhTW}
            className="max-w-none"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 page-content">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12 lg:items-start">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 flex flex-col h-fit sticky top-24">
            {/* Instructor Info Card */}
            <Card className={`bg-gradient-to-br ${instructorTheme.gradient} text-white mb-6`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{courseInfo.instructor.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">{courseInfo.instructorTitle}</div>
                    <div className="font-semibold">{courseInfo.instructor}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-3">
                  {courseInfo.title}
                </h3>
                
                <div className="text-sm opacity-90">
                  {courseInfo.subtitle.slice(0, 120)}...
                </div>
              </CardContent>
            </Card>

            {/* Free Course Card */}
            <Card className="mb-6 bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-white">{courseInfo.title}</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{courseInfo.rating}</span>
                    <span className="text-gray-400">({courseInfo.students} 學員)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-center p-4 bg-green-600 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">
                      {isZhTW ? "完全免費" : "Completely Free"}
                    </div>
                    <div className="text-sm text-green-100">
                      {isZhTW ? "永久觀看權限" : "Lifetime Access"}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mb-4"
                    onClick={onStartLearning}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "立即開始免費學習" : "Start Free Learning Now"}
                  </Button>

                  <Button variant="ghost" className="w-full text-green-400 border-green-400 hover:bg-gray-700" onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "WhatsApp 諮詢" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Value Proposition */}
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="text-sm font-semibold text-white mb-3">
                      {isZhTW ? "🎁 免費課程包含" : "🎁 Free Course Includes"}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "永久觀看權限" : "Lifetime Access"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "課程資源下載" : "Course Resources Download"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "學習社群參與" : "Learning Community Access"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "證書頒發" : "Certificate of Completion"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">
                      {isZhTW ? "需要更進階的課程？" : "Need advanced courses?"}
                    </div>
                    <div className="text-xs text-green-400 cursor-pointer" onClick={() => navigate('/courses')}>
                      {isZhTW ? "查看付費課程" : "View Premium Courses"} →
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog List Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  {isZhTW ? "📚 相關文章" : "📚 Related Articles"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {(() => {
                    const realBlogPosts = getRecentPosts().slice(0, 3);
                    return realBlogPosts.map((post, index) => (
                      <div 
                        key={post.id} 
                        className={`p-4 hover:bg-gray-700 transition-colors cursor-pointer ${index !== realBlogPosts.length - 1 ? 'border-b border-gray-700' : ''}`}
                        onClick={() => navigate(`/blog/${post.id}`)}
                      >
                        <div className="w-full">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                              {isZhTW ? post.category : post.categoryEn}
                            </Badge>
                            <span className="text-xs text-gray-400">{isZhTW ? post.readTime : post.readTimeEn}</span>
                          </div>
                          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                            {isZhTW ? post.title : post.titleEn}
                          </h3>
                          <p className="text-gray-400 text-xs line-clamp-1 mb-1">
                            {isZhTW ? post.excerpt : post.excerptEn}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{post.author}</span>
                            <span>{isZhTW ? post.date : post.dateEn}</span>
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="mb-6">
              <Badge className="bg-green-600 text-white hover:bg-green-700 mb-4">
                {courseInfo.badge}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {courseInfo.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {courseInfo.subtitle}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 bg-gray-800 p-2 rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      activeTab === tab.id
                        ? `${instructorTheme.secondary} text-white shadow-md`
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-[500px] max-h-[calc(100vh-24rem)] overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-track-gray-800/50">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCourseOutlineTemplate; 