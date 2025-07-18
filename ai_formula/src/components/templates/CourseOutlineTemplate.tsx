import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRecentPosts } from '@/data/blog/blogPosts';
import { courses } from '@/data/courses';
import TestimonialCarousel from '@/components/TestimonialCarousel';
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
  Repeat,
  CreditCard,
  Code,
  Search,
  Tag,
  Heart,
  Database,
  GraduationCap,
  Briefcase,
  UserCheck
} from 'lucide-react';

// 定義課程學員介面
interface CourseInfo {
  badge: string;
  title: string;
  subtitle: string;
  instructor: string;
  instructorTitle: string;
}

// 定義課程統計介面
interface CourseStat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// 定義課程資訊標籤介面
interface CourseInfoTag {
  name: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon' | 'featured';
}

// 定義可選課程介面
interface AvailableCourse {
  title: string;
  description: string;
  color: 'green' | 'orange';
  available: boolean;
}

// 定義最新消息接口
interface LatestNews {
  date: string;
  title: string;
  details: Array<{
    icon: string;
    text: string;
  }>;
  note: string;
}

// 定義價格信息接口
interface PricingInfo {
  series: string;
  price: string;
  originalPrice: string;
  aiInOne: string;
  studentPrice: string;
  enterprise: string;
}

// 定義課程特色介面
interface CourseFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

// 定義FAQ介面
interface FAQ {
  question: string;
  answer: string;
}

// 定義目標對象介面
interface TargetAudience {
  title: string;
  description: string;
  audiences: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

// 定義主模塊Props介面
interface CourseOutlineTemplateProps {
  courseInfo: {
    badge: string;
    title: string;
    subtitle: string;
    instructor: string;
    instructorTitle: string;
  };
  courseStats: any;
  courseInfoTags: any;
  availableCourses: any;
  latestNews: any;
  pricingInfo: any;
  courseFeatures: any;
  faqData: any;
  targetAudience: any;
  onStartLearning: () => void;
  onWhatsApp: () => void;
  learningPathExtended?: boolean; // 新增：控制學習路徑容器樣式
  hideSidebar?: boolean; // 新增：控制是否隱藏側邊欄
}

const CourseOutlineTemplate: React.FC<CourseOutlineTemplateProps> = ({
  courseInfo,
  courseStats,
  courseInfoTags,
  availableCourses,
  latestNews,
  pricingInfo,
  courseFeatures,
  faqData,
  targetAudience,
  onStartLearning,
  onRegister,
  onWhatsApp,
  learningPathExtended = false, // 默認為false
  hideSidebar = false // 默認為false
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-HK';
  const [activeTab, setActiveTab] = useState<string>('course-intro');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // 根據導師名稱定義顏色主題
  const getInstructorTheme = (instructorName: string) => {
    const name = instructorName.toLowerCase();
    
    if (name.includes('kenneth')) {
      return {
        gradient: 'from-blue-500 to-purple-600',
        primary: 'text-purple-400',
        secondary: 'bg-purple-600 hover:bg-purple-700',
        accent: 'text-purple-400 border-purple-400'
      };
    } else if (name.includes('calpa')) {
      return {
        gradient: 'from-blue-600 to-blue-800',
        primary: 'text-blue-400',
        secondary: 'bg-blue-600 hover:bg-blue-700',
        accent: 'text-blue-400 border-blue-400'
      };
    } else if (name.includes('sarah')) {
      return {
        gradient: 'from-pink-600 to-pink-800',
        primary: 'text-pink-400',
        secondary: 'bg-pink-600 hover:bg-pink-700',
        accent: 'text-pink-400 border-pink-400'
      };
    } else if (name.includes('alex')) {
      return {
        gradient: 'from-green-600 to-green-800',
        primary: 'text-green-400',
        secondary: 'bg-green-600 hover:bg-green-700',
        accent: 'text-green-400 border-green-400'
      };
    } else if (name.includes('michael')) {
      return {
        gradient: 'from-orange-600 to-orange-800',
        primary: 'text-orange-400',
        secondary: 'bg-orange-600 hover:bg-orange-700',
        accent: 'text-orange-400 border-orange-400'
      };
    } else {
      // 設定使用黃色主題
      return {
        gradient: 'from-yellow-600 to-yellow-800',
        primary: 'text-yellow-400',
        secondary: 'bg-yellow-600 hover:bg-yellow-700',
        accent: 'text-yellow-400 border-yellow-400'
      };
    }
  };

  const instructorTheme = getInstructorTheme(courseInfo.instructor);

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
    }
  ];

  // 根據課程標籤尋找相關課程
  const getRelatedCourse = () => {
    const currentCourseBadge = courseInfo.badge;
    
    // 搜索標籤包含課程的課程
    let sameCategoryCourses = courses.filter(course => {
      const courseCategory = isZhTW ? course.categoryCht : course.category;
      return courseCategory === currentCourseBadge;
    });
    
    // 如果沒有完全匹配，則搜索包含標籤的課程
    if (sameCategoryCourses.length === 0) {
      sameCategoryCourses = courses.filter(course => {
        const courseTags = isZhTW ? course.tagsCht : course.tags;
        const courseCategory = isZhTW ? course.categoryCht : course.category;
        
        // 檢查標籤是否包含課程標籤
        const badgeKeywords = currentCourseBadge.toLowerCase();
        
        return courseTags.some(tag => 
          tag.toLowerCase().includes(badgeKeywords) || 
          badgeKeywords.includes(tag.toLowerCase())
        ) || courseCategory.toLowerCase().includes(badgeKeywords);
      });
    }
    
    // 如果找到相同標籤的課程，按照更新時間排序
    let relatedCourses = sameCategoryCourses.length > 0 
      ? sameCategoryCourses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      : courses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
    
    // 返回第一個相關課程（排除當前課程）
    return relatedCourses.find(course => {
      const courseTitle = isZhTW ? course.titleCht : course.title;
      return courseTitle !== courseInfo.title;
    }) || relatedCourses[0];
  };
  
  const relatedCourse = getRelatedCourse();
  
  // 動態生成課程相關最新消息
  const getDynamicLatestNews = () => {
    if (!relatedCourse) {
      return latestNews; // 如果沒有找到課程，使用預設的最新消息
    }
    
    const formatDate = (date: Date) => {
      return isZhTW 
        ? date.toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric' })
        : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    
    // 計算折扣百分比
    const discountPercentage = relatedCourse.originalPrice 
      ? Math.round((1 - relatedCourse.price / relatedCourse.originalPrice) * 100)
      : 0;
    
    return {
      date: formatDate(relatedCourse.lastUpdated),
      title: isZhTW 
        ? `${relatedCourse.titleCht} - 最新課程更新` 
        : `${relatedCourse.title} - Latest Course Update`,
      details: [
        {
          icon: "⏱️",
          text: isZhTW 
            ? `課程時長：${relatedCourse.durationCht}` 
            : `Duration: ${relatedCourse.duration}`
        },
        {
          icon: "💰",
          text: isZhTW 
            ? `課程費用：${relatedCourse.currency}$${relatedCourse.price}${relatedCourse.originalPrice ? ` (原價: ${relatedCourse.currency}$${relatedCourse.originalPrice}, 節省${discountPercentage}%)` : ''}`
            : `Price: ${relatedCourse.currency}$${relatedCourse.price}${relatedCourse.originalPrice ? ` (Original: ${relatedCourse.currency}$${relatedCourse.originalPrice}, Save ${discountPercentage}%)` : ''}`
        },
        {
          icon: "⭐",
          text: isZhTW 
            ? `評分：${relatedCourse.rating}/5 (${relatedCourse.reviewCount}條評論)`
            : `Rating: ${relatedCourse.rating}/5 (${relatedCourse.reviewCount} reviews)`
        },
        {
          icon: "👥",
          text: isZhTW 
            ? `已有 ${relatedCourse.students} 位學員報名`
            : `${relatedCourse.students} students enrolled`
        },
        {
          icon: "📚",
          text: isZhTW 
            ? `課程等級：${relatedCourse.levelCht} | 共${relatedCourse.modules.length}個模組`
            : `Level: ${relatedCourse.level} | ${relatedCourse.modules.length} modules`
        },
        ...(relatedCourse.featured || relatedCourse.bestseller || relatedCourse.newCourse ? [{
          icon: "🏆",
          text: isZhTW 
            ? `特色標籤：${[
                relatedCourse.featured ? '精選課程' : '',
                relatedCourse.bestseller ? '最受歡迎' : '',
                relatedCourse.newCourse ? '新課程' : ''
              ].filter(Boolean).join(', ')}`
            : `Highlights: ${[
                relatedCourse.featured ? 'Featured' : '',
                relatedCourse.bestseller ? 'Bestseller' : '',
                relatedCourse.newCourse ? 'New Course' : ''
              ].filter(Boolean).join(', ')}`
        }] : [])
      ],
      note: isZhTW 
        ? `這是關於${courseInfo.badge}相關的最新課程更新。課程內容會根據學員反饋和市場需求持續優化。點擊查看更多課程詳情。`
        : `This is the latest course update related to "${courseInfo.badge}". Course content is continuously optimized based on student feedback and market demand. Click to view more course details.`
    };
  };

  const dynamicLatestNews = getDynamicLatestNews();

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      onStartLearning();
    }
  };

  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp();
    } else {
      console.log('WhatsApp inquiry');
    }
  };

  // 渲染不同 tab 的內容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'course-intro':
        return (
          <div className="space-y-6">
            {/* Course Overview - Enhanced */}
            <div className="space-y-4">
              {/* 主課程信息 */}
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${instructorTheme.gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${instructorTheme.gradient}`}>
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {isZhTW ? "課程總覽" : "Course Overview"}
                    </h2>
                  </div>

                  {/* 課程統計數據 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>12</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "週課程" : "Weeks"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>24</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "小時內容" : "Hours"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>6</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "實戰項目" : "Projects"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>∞</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "永久觀看" : "Lifetime"}</div>
                    </div>
                  </div>

                  {/* 詳細課程特色 */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhTW ? "學習時間" : "Learning Schedule"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "課程總長度" : "Total Duration"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "12 週" : "12 Weeks"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "每週學習時間" : "Weekly Commitment"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "2-3 小時" : "2-3 Hours"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "學習模式" : "Learning Mode"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "線上自學" : "Self-Paced"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "語言" : "Language"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "繁體中文" : "Traditional Chinese"}</span>
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
                          <span className="text-gray-300">{isZhTW ? "實戰項目導學" : "Project-Based Learning"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "一對一導師指導" : "1-on-1 Mentorship"}</span>
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

              {/* 學習路徑展示 */}
              <Card className={`bg-gray-800 border-gray-700 ${learningPathExtended ? 'h-full flex flex-col' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "學習路徑" : "Learning Path"}
                  </CardTitle>
                </CardHeader>
                <CardContent className={learningPathExtended ? 'flex-1 flex flex-col' : ''}>
                  <div className={`${learningPathExtended ? 'space-y-6 flex-1' : 'space-y-4'}`}>
                    {[
                      {
                        phase: isZhTW ? "第1-2週" : "Week 1-2",
                        title: isZhTW ? "AI 自動化基礎概念" : "AI Automation Fundamentals",
                        description: isZhTW ? "理解 AI 驅動的商業自動化核心原理，識別自動化機會與評估框架" : "Understanding AI-driven business automation principles and identifying automation opportunities",
                        icon: <Lightbulb className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "第3-4週" : "Week 3-4", 
                        title: isZhTW ? "客戶服務自動化" : "Customer Service Automation",
                        description: isZhTW ? "構建智能聊天機器人和自動化客戶服務系統，實現24小時客戶支援" : "Building intelligent chatbots and automated customer service systems for 24/7 support",
                        icon: <Monitor className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "第5-6週" : "Week 5-6",
                        title: isZhTW ? "AI 營銷與銷售自動化" : "AI Marketing & Sales Automation",
                        description: isZhTW ? "自動化營銷活動、內容生成和潛在客戶培育系統" : "Automate marketing campaigns, content generation and lead nurturing systems",
                        icon: <PlayCircle className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "第7-8週" : "Week 7-8",
                        title: isZhTW ? "營運與數據分析自動化" : "Operations & Analytics Automation",
                        description: isZhTW ? "建立自動化報告系統與商業智能儀表板，實現數據驅動決策" : "Build automated reporting systems and business intelligence dashboards for data-driven decisions",
                        icon: <Rocket className="w-6 h-6" />
                      }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-start gap-4 ${learningPathExtended ? 'p-6 bg-gray-700/50 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300' : 'p-4 bg-gray-700 rounded-lg'}`}>
                        <div className={`${learningPathExtended ? 'p-3 rounded-xl' : 'p-2 rounded-lg'} bg-gradient-to-br ${instructorTheme.gradient} text-white ${learningPathExtended ? 'shadow-lg' : ''}`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`flex items-center gap-3 ${learningPathExtended ? 'mb-3' : 'mb-2'}`}>
                            <Badge variant="outline" className={`${instructorTheme.accent} ${learningPathExtended ? 'text-sm px-3 py-1' : 'text-xs'}`}>
                              {item.phase}
                            </Badge>
                            {!learningPathExtended && <h4 className="font-semibold text-white">{item.title}</h4>}
                          </div>
                          {learningPathExtended && <h4 className="font-bold text-white text-lg mb-3 leading-tight">{item.title}</h4>}
                          <p className={`text-gray-300 ${learningPathExtended ? 'text-base leading-relaxed' : 'text-sm'}`}>{item.description}</p>
                          {learningPathExtended && (
                            <div className="mt-4 pt-3 border-t border-gray-600/30">
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>{isZhTW ? "實戰項目包含" : "Includes hands-on projects"}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {learningPathExtended && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        {isZhTW ? "學習成果預期" : "Expected Learning Outcomes"}
                      </h4>
                      <div className="space-y-3">
                        {[
                          isZhTW ? "掌握AI自動化核心技術" : "Master AI automation core technologies",
                          isZhTW ? "建立完整自動化工作流程" : "Build complete automation workflows", 
                          isZhTW ? "提升業務效率300%" : "Improve business efficiency by 300%",
                          isZhTW ? "獲得實戰項目經驗" : "Gain hands-on project experience"
                        ].map((outcome, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-gray-300 text-sm">{outcome}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-600/30">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-400">12</div>
                            <div className="text-xs text-gray-400">{isZhTW ? "週完整課程" : "Week Course"}</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-400">8+</div>
                            <div className="text-xs text-gray-400">{isZhTW ? "實戰項目" : "Projects"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 工具與技術*/}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "使用工具與技術" : "Tools & Technologies"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Zapier", category: isZhTW ? "無代碼自動化" : "No-Code Automation" },
                      { name: "Make.com", category: isZhTW ? "工作流程整合" : "Workflow Integration" },
                      { name: "ChatGPT API", category: isZhTW ? "AI 對話系統" : "AI Chat System" },
                      { name: "n8n", category: isZhTW ? "開源自動化" : "Open Source Automation" },
                      { name: "Google Sheets", category: isZhTW ? "數據管理" : "Data Management" },
                      { name: "Slack API", category: isZhTW ? "團隊協作" : "Team Collaboration" },
                      { name: "Airtable", category: isZhTW ? "智能數據庫" : "Smart Database" },
                      { name: "Webhooks", category: isZhTW ? "系統整合" : "System Integration" }
                    ].map((tool, index) => (
                      <div key={index} className="text-center p-4 bg-gray-700 rounded-lg">
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                          <Code className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white text-sm mb-1">{tool.name}</h4>
                        <p className="text-xs text-gray-400">{tool.category}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Tag className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "課程資訊" : "Course Information"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {courseInfoTags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
                      {tag.icon}
                      <span className="text-gray-300 flex-1">{tag.name}</span>
                      {tag.status === 'coming-soon' && (
                        <Badge variant="outline" className="text-xs text-gray-500 border-gray-600">
                          Coming Soon
                        </Badge>
                      )}
                      {tag.status === 'featured' && (
                        <Badge variant="outline" className={`text-xs ${instructorTheme.accent}`}>
                          Featured
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer" 
                  onClick={() => {
                    // 導航到相關課程詳情頁面
                    if (relatedCourse) {
                      navigate(`/courses/${relatedCourse.id}`);
                    }
                  }}>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isZhTW ? "最新消息" : "Latest News"}</span>
                  <span>{dynamicLatestNews.date}</span>
                </div>
                <CardTitle className="text-xl text-white flex items-center justify-between">
                  {dynamicLatestNews.title}
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-2" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dynamicLatestNews.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span>{detail.icon}</span>
                      <span className="text-gray-300">{detail.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  {dynamicLatestNews.note}
                </div>
              </CardContent>
            </Card>
            
            {/* 適合對象內容 */}
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

      case 'learning-content':
        return (
          <div className="space-y-8">
            {/* Course Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "你將學到什麼？" : "What You'll Learn"}
              </h3>
              
              {/* Detailed Learning Content - Accordion Format */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "AI 自動化基礎概念",
                    sections: [
                      {
                        title: "什麼是 AI 商業自動化？",
                        points: [
                          "理解 AI 驅動的商業自動化核心原理",
                          "學習識別自動化機會和評估框架",
                          "掌握投資回報率(ROI)計算方法"
                        ]
                      },
                      {
                        title: "自動化工具入門",
                        points: [
                          "認識 Zapier、Make.com 等無代碼自動化平台",
                          "學習 API 整合基礎概念",
                          "實戰：搭建第一個自動化工作流程"
                        ]
                      }
                    ]
                  },
                  {
                    title: "客戶服務與營銷自動化",
                    sections: [
                      {
                        title: "智能聊天機器人設計",
                        points: [
                          "學習構建24小時智能客服系統",
                          "掌握自然語言處理技術應用",
                          "實戰：將FAQ訓練成AI知識庫"
                        ]
                      },
                      {
                        title: "AI 營銷自動化",
                        points: [
                          "設計個性化營銷活動工作流程",
                          "學習AI內容生成與社群媒體自動發布",
                          "掌握潛在客戶評分與培育系統"
                        ]
                      }
                    ]
                  },
                  {
                    title: "銷售與營運自動化",
                    sections: [
                      {
                        title: "銷售流程自動化",
                        points: [
                          "設計自動化銷售漏斗與管道管理",
                          "學習銷售數據分析與預測技術",
                          "實戰：建立提案自動生成系統"
                        ]
                      },
                      {
                        title: "營運與數據分析自動化",
                        points: [
                          "建立自動化報告與商業智能儀表板",
                          "掌握預測分析在營運中的實戰應用",
                          "學習跨系統工作流程整合技巧"
                        ]
                      }
                    ]
                  }
                ].map((module, moduleIndex) => (
                  <Card key={moduleIndex} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleAccordion(moduleIndex)}
                        className="w-full p-6 text-left hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-white">{module.title}</h3>
                          {openAccordion === moduleIndex ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      {openAccordion === moduleIndex && (
                        <div className="px-6 pb-6 space-y-4">
                          {module.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h4 className="text-lg font-semibold text-white mb-2">{section.title}</h4>
                              <ul className="space-y-2 text-gray-300">
                                {section.points.map((point, pointIndex) => (
                                  <li key={pointIndex} className="flex items-start gap-2">
                                    <span className={`${instructorTheme.primary} mt-1`}>•</span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Original Course Features */}
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

            {/* Available Courses */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BookOpen className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "選課" : "Available Courses"}
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
            
            {/* 導師介紹內容 */}
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
                        {isZhTW ? "業界顧問" : "Industry Consultant"}
                      </Badge>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {isZhTW 
                        ? `擁有超過4年AI技術應用經驗，專精於AI工具在創意產業的實戰應用。曾協助超過200家企業成功實施AI自動化流程，學員遍布全球，累計培養超過3,000名AI應用專家。`
                        : `With over 4 years of AI technology application experience, specializing in practical AI tool applications in creative industries. Has successfully helped over 200 companies implement AI automation processes, with students worldwide and over 3,000 AI application specialists trained.`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 專業背景經歷*/}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Briefcase className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "專業經歷" : "Professional Experience"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "科技公司 AI 產品總監" : "AI Product Director"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2019 - 2024</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "領導 AI 產品開發團隊，成功推出多款商業 AI 應用，服務超過百萬用戶"
                        : "Led AI product development team, successfully launched multiple commercial AI applications serving over one million users."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "創意工作室創辦人" : "Creative Studio Founder"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2016 - 2019</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "創辦專業創意工作室，為品牌提供創新數碼行銷解決方案"
                        : "Founded professional creative studio, providing innovative digital marketing solutions for brands."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Award className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "專業認證" : "Certifications"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "Google AI 認證專家" : "Google AI Certified Expert"}</h4>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "Google 官方認證 AI 技術專家，專精機器學習與深度學習應用"
                        : "Google officially certified AI technology expert, specializing in machine learning and deep learning applications."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "Adobe 認證專家" : "Adobe Certified Expert"}</h4>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "Adobe Creative Suite 全系列認證，擅長將 AI 工具與傳統設計軟件整合"
                        : "Adobe Creative Suite full certification, excelling in combining AI tools with traditional design software."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 學習理念 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Lightbulb className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "學習理念" : "Teaching Philosophy"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {isZhTW ? '"讓每個人都能駕馭 AI 的力量"' : '"Empowering Everyone to Harness the Power of AI"'}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {isZhTW 
                        ? "我相信 AI 不應該是少數技術專家的專利，而是每個有創意和想法的人都能使用的強大工具。通過實戰式教學和真實案例分析，讓學員不只學會操作 AI 工具，更要了解如何將這些工具融入實際工作中，創造真正價值。這不只是一個技術課程，而是一個改變你工作和思維模式的旅程。"
                        : "I believe AI should not be the exclusive domain of a few technical experts, but a powerful tool that anyone with creativity and ideas can use. Through hands-on teaching and real case studies, I want students to not only learn to operate AI tools, but also understand how to integrate these tools into actual work to create real value. This is not just a technical course, but a journey that will change your way of working and thinking."
                      }
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {isZhTW ? "實戰導向" : "Practice-Oriented"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "每個課程都以實戰項目為基礎，學完即可應用到工作上" : "Every course is based on real projects, ready to apply to work immediately after learning"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {isZhTW ? "貼心指導" : "Caring Guidance"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "提供一對一指導，確保每位學員都能跟上學習進度" : "Provide one-on-one guidance to ensure every student can keep up with the learning progress"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Rocket className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {isZhTW ? "持續創新" : "Continuous Innovation"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "緊跟 AI 技術發展，課程內容持續更新" : "Keep up with AI technology development, course content continuously updated"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 為什麼開設這個課程*/}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "開課理念" : "Why This Course"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-6 bg-gradient-to-r ${instructorTheme.gradient} rounded-lg`}>
                  <blockquote className="text-white text-lg leading-relaxed italic">
                    {isZhTW 
                      ? "「在過去兩年裡，我見過太多人對AI充滿好奇但不知從何開始，也看到很多企業想要使用 AI 但缺乏實戰經驗。我創設這個課程，就是要填補這個空缺——讓每個人都能輕鬆上手 AI 工具，並且真正應用到工作和生活中，創造實際價值。這不只是一個技術課程，而是一個改變你工作和思維模式的旅程。」"
                      : "\"In the past two years, I've seen too many people curious about AI but not knowing where to start, and many companies wanting to use AI but lacking practical experience. I created this course to fill this gap – to make AI tools accessible to everyone and truly applicable to work and life, creating real value. This is not just a technical course, but a journey that will change your way of working and thinking.\""
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 page-content">
        {/* Hero Section */}
        <div className={`${hideSidebar ? 'max-w-4xl mx-auto' : `grid lg:grid-cols-3 gap-8 ${learningPathExtended ? 'lg:items-stretch' : 'lg:items-start'}`} mb-12`}>
          {/* Left Sidebar - 只有在不隱藏側邊欄時才顯示 */}
          {!hideSidebar && (
          <div className="lg:col-span-1 flex flex-col h-fit sticky top-24">
            {/* Instructor Info Card */}
            <Card className={`bg-gradient-to-br ${instructorTheme.gradient} text-white mb-4`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
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

            {/* Pricing Card */}
            <Card className="mb-4 bg-gray-800 border-gray-700">
              <CardContent className="p-6">

                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-white">{courseInfo.title}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{pricingInfo.series}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${instructorTheme.primary}`}>{pricingInfo.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pricingInfo.originalPrice}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${instructorTheme.secondary} text-white py-3 mb-4`}
                    onClick={handleRegister}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {isZhTW ? "立即報名" : "Register Now"}
                  </Button>



                  <Button variant="ghost" className={`w-full ${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "透過 WhatsApp 查詢/報名" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Value Proposition */}
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="text-sm font-semibold text-white mb-3">
                      {isZhTW ? "🎁 課程價值" : "🎁 Course Value"}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "永久觀看" : "Lifetime Access"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "課程源代碼筆記下載" : "Source Code & Notes Download"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "導師問答支援" : "Instructor Q&A Support"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "證書頒發" : "Certificate of Completion"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">{pricingInfo.enterprise}</div>
                    <div className={`text-xs ${instructorTheme.accent} cursor-pointer`}>{isZhTW ? "了解更多" : "Learn More"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog List Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  {isZhTW ? "相關文章" : "Related Articles"}
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
          )}

          {/* Right Content */}
          <div className={`${hideSidebar ? '' : 'lg:col-span-2'} flex flex-col ${learningPathExtended ? 'h-full' : ''}`}>
            <div className="mb-6">
              <Badge className={`bg-gray-800 ${instructorTheme.accent} hover:bg-gray-700 mb-4`}>
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
            <div className={`flex-1 ${learningPathExtended ? 'min-h-[1200px]' : ''} ${learningPathExtended ? '' : 'overflow-y-auto'} pl-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-track-gray-800/50`}>
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* 學員心聲區域 - 無限循環跑馬燈 */}
        <div className="mt-20">
          <TestimonialCarousel
            testimonials={[
              {
                name: "Sarah",
                position: "數碼行銷經理",
                rating: 5,
                comment: "課程講解得好清楚，我依家識得點樣同ChatGPT傾偈喇！之前唔知點問問題，而家學識咗寫prompt嘅技巧。"
              },
              {
                name: "Michael",
                position: "產品設計師",
                rating: 5,
                comment: "Finally understand how to write effective prompts! The course is practical and easy to follow."
              },
              {
                name: "Jenny",
                position: "內容創作者",
                rating: 4,
                comment: "原來ChatGPT可以幫手寫報告！學咗呢個課程之後，我嘅工作效率真係提升咗好多。"
              },
              {
                name: "David",
                position: "IT顧問",
                rating: 5,
                comment: "Great course for beginners. I learned how to use ChatGPT for content creation and it saves me so much time."
              },
              {
                name: "Lisa",
                position: "市場推廣經理",
                rating: 4,
                comment: "上堂之前我都係亂咁問ChatGPT，而家識得點樣設定角色同情境，答案準確咗好多。"
              },
              {
                name: "Alex",
                position: "Business Analyst",
                rating: 5,
                comment: "The examples are very practical. Now I can use ChatGPT to help with my daily work tasks."
              },
              {
                name: "Kevin",
                position: "創業家",
                rating: 4,
                comment: "好實用嘅課程！學識咗點樣用ChatGPT嚟做market research同competitor analysis。"
              },
              {
                name: "Emma",
                position: "Project Manager",
                rating: 5,
                comment: "Love how the instructor explains everything step by step. ChatGPT has become my daily work assistant now!"
              },
              {
                name: "Tony",
                position: "自由工作者",
                rating: 5,
                comment: "學完課程後，我用 ChatGPT 幫手做 freelance project，工作效率提升左好多，而家可以接更多case！"
              },
              {
                name: "Rachel",
                position: "Content Writer",
                rating: 4,
                comment: "The prompt techniques taught in this course revolutionized my writing process. I can now create better content in half the time!"
              }
            ]}
            themeColors={instructorTheme}
            isZhTW={isZhTW}
          />
        </div>

        {/* 常見問題區域 - 世界級動效體驗 */}
        <div className="mt-16">
          <AnimatedFAQ
            faqData={faqData}
            themeColors={instructorTheme}
            isZhTW={isZhTW}
            className="px-4"
          />
        </div>

      </div>
    </div>
  );
};

export default CourseOutlineTemplate; 
