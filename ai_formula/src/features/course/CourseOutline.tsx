/**
 * 可重用課程大綱組件
 * @fileoverview 通用的課程介紹頁面組件，支援免費和付費課程
 * @author AI Formula Team
 * @version 1.0.0
 */

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

// 類型定義
interface CourseInfo {
  badge?: string;
  badgeEn?: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  description?: string; // 新增字段
  descriptionEn?: string;
  instructor: string;
  instructorTitle: string;
  instructorTitleEn?: string;
  rating?: number;
  students?: number;
  duration?: string;
  lastUpdated?: string;
}

interface CourseStat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface CourseInfoTag {
  name: string;
  icon: React.ReactNode;
  status: 'available' | 'featured' | 'premium';
}

interface AvailableCourse {
  title: string;
  description: string;
  color: 'green' | 'blue' | 'purple' | 'yellow';
  available: boolean;
}

interface LatestNews {
  date: string;
  title: string;
  details: Array<{
    icon: string;
    text: string;
  }>;
  note: string;
}

interface PricingInfo {
  series: string;
  price: string;
  originalPrice?: string;
  aiInOne: string;
  studentPrice?: string;
  enterprise: string;
}

interface CourseFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TargetAudience {
  title: string;
  description: string;
  audiences: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

interface CourseModule {
  id: number;
  title: string;
  description: string;
  lessons: Array<{
    id: number;
    title: string;
    duration: string;
    type: 'video' | 'reading' | 'practice';
    isPreview?: boolean;
  }>;
}

interface CourseOutlineProps {
  // 課程基本信息
  courseInfo: CourseInfo;
  
  // 課程統計
  courseStats: CourseStat[];
  
  // 課程信息標籤
  courseInfoTags: CourseInfoTag[];
  
  // 可選課程
  availableCourses: AvailableCourse[];
  
  // 最新消息
  latestNews: LatestNews;
  
  // 價格信息
  pricingInfo: PricingInfo;
  
  // 課程特色
  courseFeatures: CourseFeature[];
  
  // FAQ
  faqData: FAQ[];
  
  // 目標受眾
  targetAudience: TargetAudience;
  
  // 課程模組 (免費課程使用)
  courseModules?: CourseModule[];
  
  // 免費課程標識
  isFree: boolean;
  
  // 事件處理
  onStartLearning: () => void;
  onWhatsApp?: () => void;
  
  // 可選配置
  learningPathExtended?: boolean;
  showRelatedBlog?: boolean;
}

const CourseOutline: React.FC<CourseOutlineProps> = ({
  courseInfo,
  courseStats,
  courseInfoTags,
  availableCourses,
  latestNews,
  pricingInfo,
  courseFeatures,
  faqData,
  targetAudience,
  courseModules = [],
  isFree,
  onStartLearning,
  onWhatsApp,
  learningPathExtended = false,
  showRelatedBlog = true
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhHK = language === 'zh-HK';
  const [activeTab, setActiveTab] = useState<string>('course-intro');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // 根據免費/付費課程和導師名稱定義顏色主題
  const getInstructorTheme = () => {
    // Debug current course info
    console.log('CourseOutline Debug:', {
      title: courseInfo?.title,
      subtitle: courseInfo?.subtitle,
      instructor: courseInfo?.instructor,
      pathname: window.location.pathname,
      isFree: isFree
    });
    
    // Perplexity 課程檢測 - 暗黑主題（最高優先級，必須非常具體）
    const isPerplexityCourse = 
      (courseInfo?.title && courseInfo.title.includes('Perplexity')) ||
      (courseInfo?.subtitle && courseInfo.subtitle.includes('Perplexity')) ||
      window.location.pathname.includes('perplexity-complete-course');
    
    console.log('Perplexity Detection Result:', isPerplexityCourse);
    
    // 只有 Perplexity 課程使用暗黑主題
    if (isPerplexityCourse) {
      console.log('Using Perplexity Dark Theme');
      return {
        gradient: 'from-[#121212] to-[#1F1F1F]',           // 深灰到炭灰的漸變
        primary: 'text-white',                             // 主要文字用白色
        secondary: 'bg-[#1F1F1F] hover:bg-[#2A2A2A]',     // 點綴色：深炭灰 + hover稍亮
        accent: 'text-white border-[#1F1F1F]',             // 邊框和強調文字用白色
        badge: 'bg-[#1F1F1F] text-white',                  // 藥丸形標籤：深炭灰背景+白字
        numberCircle: 'bg-[#1F1F1F] text-white'           // 數字圓圈：深炭灰背景+白字
      };
    }
    
    // Midjourney 課程檢測 - 白色主題
    const isMidjourneyCourse = 
      (courseInfo?.title && courseInfo.title.includes('Midjourney')) ||
      (courseInfo?.subtitle && courseInfo.subtitle.includes('Midjourney')) ||
      window.location.pathname.includes('midjourney-course');
    
    console.log('Midjourney Detection Result:', isMidjourneyCourse);
    
    if (isMidjourneyCourse) {
      console.log('Using Midjourney Warm Gold Theme');
      return {
        gradient: 'from-[#c2b280] to-[#d4c4a0]',            // 暖金色到淺金色的漸變
        primary: 'text-[#8b7355]',                           // 主要文字用深棕金色
        secondary: 'bg-[#c2b280] hover:bg-[#d4c4a0] border border-[#a0956b]', // 點綴色：暖金色背景 + 邊框
        accent: 'text-[#8b7355] border-[#8b7355]',           // 邊框和強調文字用深棕金色
        badge: 'bg-[#8b7355] text-white',                    // 藥丸形標籤：深棕金色背景+白字
        numberCircle: 'bg-[#8b7355] text-white'             // 數字圓圈：深棕金色背景+白字
      };
    }
    
    // Prompt Engineering 課程檢測 - 紫色主題
    const isPromptEngineeringCourse = 
      (courseInfo?.title && courseInfo.title.includes('提示工程')) ||
      (courseInfo?.title && courseInfo.title.includes('Prompt Engineering')) ||
      (courseInfo?.subtitle && courseInfo.subtitle.includes('提示工程')) ||
      window.location.pathname.includes('prompt-engineering-course');
    
    console.log('Prompt Engineering Detection Result:', isPromptEngineeringCourse);
    
    if (isPromptEngineeringCourse) {
      console.log('Using Prompt Engineering Purple Theme');
      return {
        gradient: 'from-[#9E768F] to-[#9FA4C4]',            // 紫色到淡紫色的漸變
        primary: 'text-[#9E768F]',                           // 主要文字用深紫色
        secondary: 'bg-[#9E768F] hover:bg-[#9FA4C4]',       // 點綴色：深紫色背景 + hover淡紫色
        accent: 'text-[#9E768F] border-[#9E768F]',           // 邊框和強調文字用深紫色
        badge: 'bg-[#9E768F] text-white',                    // 藥丸形標籤：深紫色背景+白字
        numberCircle: 'bg-[#9E768F] text-white'             // 數字圓圈：深紫色背景+白字
      };
    }
    
    // ChatGPT 和其他免費課程使用綠色主題
    if (isFree) {
      console.log('Using Free Course Theme (Green)');
      return {
        gradient: 'from-[#10a37f] to-[#0d8a69]',
        primary: 'text-[#10a37f]',
        secondary: 'bg-[#10a37f] hover:bg-[#0d8a69]',
        accent: 'text-[#10a37f] border-[#10a37f]'
      };
    }
    
    // 付費課程可以根據講師名稱或其他條件設定不同主題
    console.log('Using Paid Course Theme');
    switch (courseInfo.instructor.toLowerCase()) {
      case 'kenneth':
        return {
          gradient: 'from-blue-600 to-purple-800',
          primary: 'text-blue-400',
          secondary: 'bg-blue-600 hover:bg-blue-700',
          accent: 'text-blue-400 border-blue-400'
        };
      default:
        return {
          gradient: 'from-purple-600 to-pink-800',
          primary: 'text-purple-400',
          secondary: 'bg-purple-600 hover:bg-purple-700',
          accent: 'text-purple-400 border-purple-400'
        };
    }
  };

  const instructorTheme = getInstructorTheme();

  // Tab定義
  const tabs = [
    {
      id: 'course-intro',
      label: isZhHK ? '課程介紹' : 'Course Introduction',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'learning-content',
      label: isZhHK ? '學習內容' : 'Learning Content',
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      id: 'faq',
      label: isZhHK ? '常見問題' : 'FAQ',
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
      window.open('https://wa.me/85293816674', '_blank');
    }
  };

  // 渲染不同tab的內容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'course-intro':
        return (
          <div className="space-y-8">
            {/* Course Overview */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${instructorTheme.gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${instructorTheme.gradient}`}>
                      {isFree ? <Gift className="w-6 h-6 text-white" /> : <Star className="w-6 h-6 text-white" />}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {isFree ? 
                        (isZhHK ? "免費課程總覽" : "Free Course Overview") :
                        (isZhHK ? "課程總覽" : "Course Overview")
                      }
                    </h2>
                  </div>

                  {/* 課程統計數據 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {courseStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="mb-2">{stat.icon}</div>
                        <div className={`text-lg font-bold ${instructorTheme.primary} mb-1`}>{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* 詳細課程特色 */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhHK ? "學習安排" : "Learning Schedule"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhHK ? "課程總長度" : "Total Duration"}</span>
                          <span className="text-white font-semibold">{courseInfo.duration || "4.2 小時"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhHK ? "學習模式" : "Learning Mode"}</span>
                          <span className="text-white font-semibold">{isZhHK ? "線上自學" : "Self-Paced"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhHK ? "語言" : "Language"}</span>
                          <span className="text-white font-semibold">{isZhHK ? "繁體中文" : "Traditional Chinese"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhHK ? "費用" : "Price"}</span>
                          <span className={`font-semibold ${instructorTheme.primary}`}>
                            {isFree ? (isZhHK ? "完全免費" : "Completely Free") : (pricingInfo?.price || (isZhHK ? "請聯繫我們" : "Contact Us"))}
                          </span>
                        </div>
                        {courseInfo.lastUpdated && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {isZhHK ? "最後更新" : "Last Updated"}
                            </span>
                            <span className="text-white font-semibold">{courseInfo.lastUpdated}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Award className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhHK ? "課程特色" : "Course Features"}
                      </h3>
                      <div className="space-y-3">
                        {courseInfoTags.map((tag, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`${instructorTheme.primary}`}>{tag.icon}</div>
                            <span className="text-gray-300">{tag.name}</span>
                            {tag.status === 'featured' && (
                              <Badge className={instructorTheme.secondary}>{isZhHK ? '特色' : 'Featured'}</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 課程價值展示 - 半透明玻璃設計 */}
              {courseFeatures.length > 0 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* 標題區域 */}
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {isFree ? 
                          <Gift className={`w-8 h-8 ${instructorTheme.primary}`} /> : 
                          <Star className={`w-8 h-8 ${instructorTheme.primary}`} />
                        }
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white">
                        {isFree ? 
                          (isZhHK ? "免費課程價值" : "Free Course Value") :
                          (isZhHK ? "課程價值" : "Course Value")
                        }
                      </h2>
                    </div>
                    <motion.p 
                      className="text-gray-300 max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {isZhHK ? 
                        "專業設計的學習模組，從基礎到進階，全方位提升您的 AI 應用能力" :
                        "Professionally designed learning modules, from basics to advanced, comprehensively enhancing your AI application capabilities"
                      }
                    </motion.p>
                  </motion.div>

                  {/* 玻璃卡片網格 */}
                  <motion.div 
                    className="glass-cards-grid"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.15,
                          delayChildren: 0.2
                        }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {courseFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="glass-card"
                        variants={{
                          hidden: { 
                            opacity: 0, 
                            y: 30,
                            scale: 0.95
                          },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 100,
                              damping: 12,
                              duration: 0.6
                            }
                          }
                        }}
                        whileHover={{
                          y: -8,
                          scale: 1.02,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 17
                          }
                        }}
                        whileTap={{
                          scale: 0.98,
                          transition: { duration: 0.1 }
                        }}
                      >
                        <div className="glass-card-header">
                          {/* 玻璃圖標容器 */}
                          <motion.div 
                            className="glass-card-icon"
                            whileHover={{
                              rotate: 360,
                              transition: { duration: 0.8, ease: "easeInOut" }
                            }}
                          >
                            {feature.icon}
                          </motion.div>
                          
                          {/* 標題 */}
                          <h3 className="glass-card-title">
                            {feature.title}
                          </h3>
                          
                          {/* 描述 */}
                          <p className="glass-card-description">
                            {feature.description}
                          </p>
                        </div>

                        {/* 玻璃標籤 */}
                        <motion.div
                          className="text-center"
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <span className="glass-card-badge">
                            {feature.highlight}
                          </span>
                        </motion.div>

                        {/* 背景光暈效果 */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl opacity-0"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 163, 127, 0.1) 0%, transparent 70%)`,
                            pointerEvents: 'none'
                          }}
                          whileHover={{
                            opacity: 1,
                            scale: 1.1,
                            transition: { duration: 0.3 }
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* 底部裝飾性元素 */}
                  <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <motion.div
                      className="w-16 h-1 bg-gradient-to-r from-transparent via-[#10a37f] to-transparent rounded-full"
                      animate={{
                        scaleX: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* 適合對象 - 移到課程介紹中 */}
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
          </div>
        );

      case 'learning-content':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6 text-white">
              {isZhHK ? "🎯 課程大綱" : "🎯 Course Modules"}
            </h3>
            
            {/* 如果是免費課程且有模組數據，顯示詳細模組 */}
            {isFree && courseModules.length > 0 ? (
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
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                              courseInfo?.title?.includes('Perplexity')
                                ? 'bg-[#1F1F1F]' // Perplexity暗黑主題：深炭灰背景
                                : `bg-gradient-to-br ${instructorTheme.gradient}` // 其他課程使用漸變
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {isZhHK ? module.title : (module.titleEn || module.title)}
                              </h3>
                              <p className="text-gray-400 mt-1">
                                {isZhHK ? module.description : (module.descriptionEn || module.description)}
                              </p>
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
                                  <p className="text-white font-medium">
                                    {isZhHK ? lesson.title : (lesson.titleEn || lesson.title)}
                                  </p>
                                  <p className="text-gray-400 text-sm">{lesson.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.isPreview && (
                                  <Badge className="bg-blue-600 text-white text-xs">
                                    {isZhHK ? '預覽' : 'Preview'}
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs text-[#10a37f] border-[#10a37f]">
                                  {isZhHK ? '免費' : 'Free'}
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
            ) : (
              /* 顯示簡化的課程特色 */
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
            )}



            {/* 導師介紹 - 移到學習內容中 */}
            <div className="space-y-6">
              {/* 導師基本信息 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-white mb-2">{courseInfo.instructor}</h2>
                      <p className="text-xl text-gray-300 mb-4">
                        {isZhHK ? courseInfo.instructorTitle : (courseInfo.instructorTitleEn || courseInfo.instructorTitle)}
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                        <Badge className={`${instructorTheme.secondary} text-white`}>
                          {isZhHK ? "AI 專家" : "AI Expert"}
                        </Badge>
                        <Badge className={`${instructorTheme.secondary} text-white`}>
                          {isZhHK ? "資深導師" : "Senior Instructor"}
                        </Badge>
                        {isFree && (
                          <Badge className={`${instructorTheme.secondary} text-white`}>
                            {isZhHK ? "免費教育推廣者" : "Free Education Advocate"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {isZhHK 
                          ? `擁有超過 8 年 AI 技術應用經驗，專精於 AI 工具在${isFree ? '基礎教育' : '商業'}的實務應用。曾協助超過 200 家企業導入 AI 自動化流程，學員遍佈全球，累計培養超過 3,000 名 AI 應用專才。${isFree ? '致力於推廣免費 AI 教育，讓更多人能夠掌握 AI 技能。' : '專注於企業級 AI 解決方案設計與實施。'}`
                          : `With over 8 years of AI technology application experience, specializing in practical AI tool applications in ${isFree ? 'basic education' : 'business'}. Has successfully helped over 200 companies implement AI automation processes, with students worldwide and over 3,000 AI application specialists trained. ${isFree ? 'Dedicated to promoting free AI education for everyone.' : 'Focusing on enterprise-level AI solution design and implementation.'}`
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 為什麼提供免費課程 / 課程理念 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Heart className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isFree ? (isZhHK ? "為什麼提供免費課程" : "Why Free Course") : (isZhHK ? "課程理念" : "Course Philosophy")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-6 bg-gradient-to-r ${instructorTheme.gradient} rounded-lg`}>
                    <blockquote className="text-white text-lg leading-relaxed italic">
                      {isFree ? (
                        isZhHK 
                          ? "「我相信知識應該是人人都能獲得的。AI 技術正在改變世界，但不應該只是少數人的特權。通過這個免費課程，我希望能夠幫助更多人了解和掌握 AI 工具，讓科技真正為所有人服務。每個人都應該有機會學習和成長，不應該被經濟條件所限制。」"
                          : "\"I believe knowledge should be accessible to everyone. AI technology is changing the world, but it shouldn't be a privilege for just a few. Through this free course, I hope to help more people understand and master AI tools, making technology truly serve everyone. Everyone should have the opportunity to learn and grow, without being limited by economic conditions.\""
                      ) : (
                        isZhHK 
                          ? "「AI 技術的快速發展為企業帶來了前所未有的機遇。我致力於將最前沿的 AI 應用技術，轉化為實用的商業解決方案。每個企業都應該能夠利用 AI 的力量，提升效率、降低成本、創造價值。這不僅是技術的革命，更是思維的轉變。」"
                          : "\"The rapid development of AI technology brings unprecedented opportunities for businesses. I am dedicated to transforming cutting-edge AI application technologies into practical business solutions. Every business should be able to harness the power of AI to improve efficiency, reduce costs, and create value. This is not just a technological revolution, but a transformation of mindset.\""
                      )}
                    </blockquote>
                    <div className="flex items-center gap-3 mt-6">
                      <div>
                        <div className="font-semibold text-white">{courseInfo.instructor}</div>
                        <div className="text-sm text-white/80">
                          {isZhHK ? courseInfo.instructorTitle : (courseInfo.instructorTitleEn || courseInfo.instructorTitle)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );



      case 'faq':
        return (
          <AnimatedFAQ
            faqData={faqData}
            themeColors={instructorTheme}
            isZhTW={isZhHK}
            className="max-w-none"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white hide-scrollbar course-outline-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 page-content hide-scrollbar">
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
                    <div className="text-sm opacity-90">
                      {isZhHK ? courseInfo.instructorTitle : (courseInfo.instructorTitleEn || courseInfo.instructorTitle)}
                    </div>
                    <div className="font-semibold">{courseInfo.instructor}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-3">
                  {isZhHK ? courseInfo.title : (courseInfo.titleEn || courseInfo.title)}
                </h3>
                
                <div className="text-sm opacity-90">
                  {(() => {
                    const subtitle = isZhHK ? courseInfo.subtitle : (courseInfo.subtitleEn || courseInfo.subtitle);
                    const description = isZhHK ? courseInfo.description : (courseInfo.descriptionEn || courseInfo.description);
                    return subtitle ? subtitle.slice(0, 120) + '...' : (description ? description.slice(0, 120) + '...' : '');
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Course Price Card */}
            <Card className="mb-6 bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-white">
                    {isZhHK ? courseInfo.title : (courseInfo.titleEn || courseInfo.title)}
                  </div>
                  {courseInfo.rating && courseInfo.students && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{courseInfo.rating}</span>
                      <span className="text-gray-400">
                        ({courseInfo.students >= 300 ? '300+' : courseInfo.students} {isZhHK ? '學員' : 'students'})
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className={`text-center p-4 ${isFree ? 'bg-gray-700 border border-gray-600' : instructorTheme.secondary} rounded-lg`}>
                    <div className="text-2xl font-bold text-white mb-1">
                      {isFree ? (isZhHK ? "完全免費" : "Completely Free") : (pricingInfo?.price || (isZhHK ? "請聯繫我們" : "Contact Us"))}
                    </div>
                    <div className="text-sm text-white/80">
                      {isFree ? (isZhHK ? "永久觀看權限" : "Lifetime Access") : (pricingInfo?.aiInOne || (isZhHK ? "專業版權限" : "Professional Access"))}
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${
                      courseInfo?.title?.includes('Perplexity') 
                        ? 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white' // 只有 Perplexity 用暗黑主題
                        : instructorTheme.secondary // ChatGPT 和其他課程用正常主題
                    } text-white py-3 mb-4`}
                    onClick={onStartLearning}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {isFree ? 
                      (isZhHK ? "立即開始免費學習" : "Start Free Learning Now") :
                      (isZhHK ? "立即報名學習" : "Enroll Now")
                    }
                  </Button>

                  <Button variant="ghost" className={`w-full ${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhHK ? "WhatsApp 諮詢" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Value Proposition */}
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="text-sm font-semibold text-white mb-3">
                      {isFree ? 
                        (isZhHK ? "🎁 免費課程包含" : "🎁 Free Course Includes") :
                        (isZhHK ? "💎 課程包含" : "💎 Course Includes")
                      }
                    </div>
                    <div className="space-y-2">
                      {courseInfoTags.slice(0, 4).map((tag, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className={`w-4 h-4 ${instructorTheme.primary}`} />
                          <span>{tag.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isFree && (
                    <div className="text-center pt-4 border-t border-gray-600">
                      <div className="text-sm text-gray-400">
                        {isZhHK ? "企業培訓方案" : "Enterprise Training"}
                      </div>
                      <div className="text-xs text-blue-400 cursor-pointer" onClick={handleWhatsApp}>
                        {pricingInfo?.enterprise || (isZhHK ? "聯繫我們了解更多" : "Contact us for more")} →
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Blog List Section */}
            {showRelatedBlog && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    {isZhHK ? "📚 相關文章" : "📚 Related Articles"}
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
                              <Badge variant="outline" className={`${instructorTheme.accent} text-xs`}>
                                {isZhHK ? post.category : post.categoryEn}
                              </Badge>
                              <span className="text-xs text-gray-400">{isZhHK ? post.readTime : post.readTimeEn}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                              {isZhHK ? post.title : post.titleEn}
                            </h3>
                            <p className="text-gray-400 text-xs line-clamp-1 mb-1">
                              {isZhHK ? post.excerpt : post.excerptEn}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{post.author}</span>
                              <span>{isZhHK ? post.date : post.dateEn}</span>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="mb-6">
              <Badge className={`${
                courseInfo?.title?.includes('Perplexity') 
                  ? 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white' // 只有 Perplexity 用暗黑主題
                  : instructorTheme.secondary // ChatGPT 和其他課程用正常主題
              } text-white mb-4`}>
                {isZhHK ? courseInfo.badge : (courseInfo.badgeEn || courseInfo.badge)}
                {isFree && (
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    courseInfo?.title?.includes('Perplexity')
                      ? 'bg-white/20 text-white' // Perplexity的"免費"標籤
                      : 'bg-white/20 text-white'  // 其他免費課程的"免費"標籤
                  }`}>
                    {isZhHK ? '免費' : 'FREE'}
                  </span>
                )}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isZhHK ? courseInfo.title : (courseInfo.titleEn || courseInfo.title)}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {(() => {
                  const subtitle = isZhHK ? courseInfo.subtitle : (courseInfo.subtitleEn || courseInfo.subtitle);
                  const description = isZhHK ? courseInfo.description : (courseInfo.descriptionEn || courseInfo.description);
                  return subtitle || description || '';
                })()}
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
                        ? courseInfo?.title?.includes('Perplexity') 
                          ? 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white shadow-md' // 只有 Perplexity 用暗黑主題
                          : `${instructorTheme.secondary} text-white shadow-md` // ChatGPT 和其他課程用正常主題
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
            <div className={`flex-1 min-h-[700px] ${learningPathExtended ? 'max-h-[calc(100vh-12rem)]' : 'max-h-[calc(100vh-16rem)]'} overflow-y-auto pl-2 hide-scrollbar`}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOutline; 