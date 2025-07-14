import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRecentPosts } from '@/data/blog/blogPosts';
import { courses } from '@/data/courses/courses';
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

// 定義課程基本信息接口
interface CourseInfo {
  badge: string;
  title: string;
  subtitle: string;
  instructor: string;
  instructorTitle: string;
}

// 定義課程統計接口
interface CourseStat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// 定義課程資訊標籤接口
interface CourseInfoTag {
  name: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon' | 'featured';
}

// 定義可選課程接口
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

// 定義課程特色接口
interface CourseFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

// 定義FAQ接口
interface FAQ {
  question: string;
  answer: string;
}

// 定義目標學員接口
interface TargetAudience {
  title: string;
  description: string;
  audiences: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

// 定義主模板Props接口
interface CourseOutlineTemplateProps {
  courseInfo: CourseInfo;
  courseStats: CourseStat[];
  courseInfoTags: CourseInfoTag[];
  availableCourses: AvailableCourse[];
  latestNews: LatestNews;
  pricingInfo: PricingInfo;
  courseFeatures: CourseFeature[];
  faqData: FAQ[];
  targetAudience: TargetAudience;
  onStartLearning: () => void;
  onRegister?: () => void;
  onWhatsApp?: () => void;
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
  onWhatsApp
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-HK';
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('course-intro');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);



  // 根據導師名稱定義顏色主題
  const getInstructorTheme = (instructorName: string) => {
    const name = instructorName.toLowerCase();
    
    if (name.includes('kenneth')) {
      return {
        gradient: 'from-purple-600 to-purple-800',
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
      // 預設使用黃色主題
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
      id: 'student-testimonials',
      label: isZhTW ? '學員心聲' : 'Student Testimonials',
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'faq',
      label: isZhTW ? '常見問題' : 'FAQ',
      icon: <MessageCircle className="w-4 h-4" />
    }
  ];

  // 根據當前課程標籤動態獲取相關課程
  const getRelatedCourse = () => {
    const currentCourseBadge = courseInfo.badge;
    
    // 搜索相同標籤的課程（先嘗試完全匹配）
    let sameCategoryCourses = courses.filter(course => {
      const courseCategory = isZhTW ? course.categoryCht : course.category;
      return courseCategory === currentCourseBadge;
    });
    
    // 如果沒有完全匹配，嘗試部分匹配或標籤匹配
    if (sameCategoryCourses.length === 0) {
      sameCategoryCourses = courses.filter(course => {
        const courseTags = isZhTW ? course.tagsCht : course.tags;
        const courseCategory = isZhTW ? course.categoryCht : course.category;
        
        // 檢查標籤是否包含課程標籤的關鍵字
        const badgeKeywords = currentCourseBadge.toLowerCase();
        
        return courseTags.some(tag => 
          tag.toLowerCase().includes(badgeKeywords) || 
          badgeKeywords.includes(tag.toLowerCase())
        ) || courseCategory.toLowerCase().includes(badgeKeywords);
      });
    }
    
    // 如果找到相同標籤的課程，按最新更新時間排序
    let relatedCourses = sameCategoryCourses.length > 0 
      ? sameCategoryCourses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      : courses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
    
    // 獲取最新的課程（排除當前課程）
    return relatedCourses.find(course => {
      const courseTitle = isZhTW ? course.titleCht : course.title;
      return courseTitle !== courseInfo.title;
    }) || relatedCourses[0];
  };
  
  const relatedCourse = getRelatedCourse();
  
  // 根據相關課程生成動態最新消息
  const getDynamicLatestNews = () => {
    if (!relatedCourse) {
      return latestNews; // 如果沒有找到課程，使用原來的最新消息
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
          icon: "📚",
          text: isZhTW 
            ? `課程時長：${relatedCourse.durationCht}` 
            : `Duration: ${relatedCourse.duration}`
        },
        {
          icon: "💰",
          text: isZhTW 
            ? `課程費用：${relatedCourse.currency}$${relatedCourse.price}${relatedCourse.originalPrice ? ` (原價: ${relatedCourse.currency}$${relatedCourse.originalPrice}, 節省 ${discountPercentage}%)` : ''}`
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
            ? `已有 ${relatedCourse.students} 名學生報名`
            : `${relatedCourse.students} students enrolled`
        },
        {
          icon: "📖",
          text: isZhTW 
            ? `課程等級：${relatedCourse.levelCht} | 共 ${relatedCourse.modules.length} 個模組`
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
        ? `這是與「${courseInfo.badge}」相關的最新課程更新。課程內容會根據學員反饋和市場需求持續優化。點擊查看更多課程詳情。`
        : `This is the latest course update related to "${courseInfo.badge}". Course content is continuously optimized based on student feedback and market demand. Click to view more course details.`
    };
  };

  const dynamicLatestNews = getDynamicLatestNews();

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {isZhTW ? "課程總覽" : "Course Overview"}
                    </h2>
                  </div>

                  {/* 核心統計數據 */}
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
                      <div className="text-sm text-gray-400">{isZhTW ? "個專案" : "Projects"}</div>
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
                        {isZhTW ? "學習時程" : "Learning Schedule"}
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
                          <span className="text-gray-300">{isZhTW ? "實戰項目導向" : "Project-Based Learning"}</span>
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
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "學習路徑" : "Learning Path"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        phase: isZhTW ? "第1-3週" : "Week 1-3",
                        title: isZhTW ? "AI 基礎與創意發想" : "AI Fundamentals & Creative Ideation",
                        description: isZhTW ? "學習 ChatGPT 4o 的基本操作，掌握創意 Prompt 設計" : "Learn ChatGPT 4o basics and master creative prompt design",
                        icon: <Lightbulb className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "第4-6週" : "Week 4-6", 
                        title: isZhTW ? "視覺設計與合成技巧" : "Visual Design & Composition",
                        description: isZhTW ? "掌握 Photoshop 合成技術，製作專業產品展示圖" : "Master Photoshop composition for professional product visuals",
                        icon: <Monitor className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "第7-9週" : "Week 7-9",
                        title: isZhTW ? "AI 動態特效製作" : "AI Motion Effects",
                        description: isZhTW ? "使用 Kling AI 創作動態特效，學習 Minimax 語音技術" : "Create motion effects with Kling AI and learn Minimax voice technology",
                        icon: <PlayCircle className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "第10-12週" : "Week 10-12",
                        title: isZhTW ? "專業影片製作" : "Professional Video Production",
                        description: isZhTW ? "整合所有技能，完成完整的商業級影片項目" : "Integrate all skills to complete commercial-grade video projects",
                        icon: <Rocket className="w-6 h-6" />
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-700 rounded-lg">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${instructorTheme.gradient} text-white`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className={`${instructorTheme.accent} text-xs`}>
                              {item.phase}
                            </Badge>
                            <h4 className="font-semibold text-white">{item.title}</h4>
                          </div>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 工具與技術 */}
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
                      { name: "ChatGPT 4o", category: isZhTW ? "AI 對話" : "AI Chat" },
                      { name: "Kling AI", category: isZhTW ? "動態特效" : "Motion FX" },
                      { name: "Minimax AI", category: isZhTW ? "語音合成" : "Voice AI" },
                      { name: "Photoshop", category: isZhTW ? "圖像處理" : "Image Edit" },
                      { name: "CapCut", category: isZhTW ? "影片剪輯" : "Video Edit" },
                      { name: "AI 字幕", category: isZhTW ? "文字自動化" : "Auto Subtitle" },
                      { name: "Figma", category: isZhTW ? "設計協作" : "Design" },
                      { name: "Canva", category: isZhTW ? "快速設計" : "Quick Design" }
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
          </div>
        );

      case 'learning-content':
        return (
          <div className="space-y-8">
            {/* Course Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "🎯 你會學到什麼？" : "🎯 What You'll Learn"}
              </h3>
              
              {/* Detailed Learning Content - Accordion Format */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "AI 廣告創意規劃",
                    sections: [
                      {
                        title: "AI 產品優勢分析與創意發想技巧",
                        points: [
                          "學識利用 ChatGPT 4o 快速分析網上產品資訊，精準歸納產品獨特賣點。",
                          "掌握如何將產品優勢轉化為創意分鏡，快速產出有說服力的廣告創意。"
                        ]
                      },
                      {
                        title: "ChatGPT 4o 廣告創意與分鏡製作",
                        points: [
                          "學會利用 ChatGPT 生成精準的創意 Prompt，快速產出吸睛產品廣告腳本。",
                          "掌握短片分鏡邏輯，設計高轉化率的視覺敘事結構。"
                        ]
                      },
                      {
                        title: "Photoshop 專業產品合成技巧",
                        points: [
                          "熟練使用 Photoshop 的遮罩（Mask）與圖層技術，完美融合產品與背景圖。",
                          "學識後期處理細節（例如陰影調整、光源統一），顯著提升產品視覺真實感。"
                        ]
                      }
                    ]
                  },
                  {
                    title: "AI 動態特效製作與 AI 配音應用",
                    sections: [
                      {
                        title: "Kling AI 專業動態特效完整製作流程",
                        points: [
                          "深入掌握 Kling AI 首尾幀設定，製作產品動態展示、浪花及蒸氣等高質素動態特效。",
                          "學習如何設計高效 Prompt，精確控制特效呈現效果，打造專業級視覺吸引力。",
                          "掌握 AI 動態特效製作的常見技巧與注意事項，快速提升影片專業感。"
                        ]
                      },
                      {
                        title: "Minimax AI 語音複製及數字人配音技巧",
                        points: [
                          "學會使用 Minimax 快速、精確複製你的聲音，製作自然流暢廣東話旁白。",
                          "掌握語音文案設計技巧，提升品牌廣告專業感及說服力。"
                        ]
                      }
                    ]
                  },
                  {
                    title: "影片剪輯技術與 AI 字幕自動化",
                    sections: [
                      {
                        title: "CapCut 專業影片剪輯與節奏掌控技巧",
                        points: [
                          "學習 CapCut 快閃剪輯與過場特效應用，提升影片流暢度與視覺專業感。",
                          "掌握影片節奏控制方法（例如音畫同步），精準調整影片吸引觀眾注意力。"
                        ]
                      },
                      {
                        title: "AI 智能繁體字幕生成與視聽特效製作",
                        points: [
                          "熟練 AI 自動生成繁體字幕的操作流程與精準校正方法，減少字幕製作時間。",
                          "掌握字幕特效樣式設計（如動態字型、特效入場），提升短片專業視覺效果。"
                        ]
                      }
                    ]
                  }
                ].map((module, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full p-6 text-left hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-white">{module.title}</h3>
                          {openAccordion === index ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      {openAccordion === index && (
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
            {/* 導師頭像和基本信息 */}
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
                        ? `擁有超過 8 年 AI 技術應用經驗，專精於 AI 工具在創意產業的實際應用。曾協助超過 200 家企業成功導入 AI 自動化流程，學員遍佈全球，累計培養超過 3,000 名 AI 應用專才。`
                        : `With over 8 years of AI technology application experience, specializing in practical AI tool applications in creative industries. Has successfully helped over 200 companies implement AI automation processes, with students worldwide and over 3,000 AI application specialists trained.`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 專業背景與經驗 */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Briefcase className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "專業經驗" : "Professional Experience"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "科技公司 AI 產品總監" : "AI Product Director"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2019 - 2024</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "領導 AI 產品開發團隊，成功推出多款商業 AI 應用，服務超過百萬用戶。"
                        : "Led AI product development team, successfully launched multiple commercial AI applications serving over one million users."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "創意工作室創辦人" : "Creative Studio Founder"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2016 - 2019</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "創辦專業創意工作室，為品牌提供創新的數碼營銷解決方案。"
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
                        ? "Google 官方認證的 AI 技術專家，專精機器學習和深度學習應用。"
                        : "Google officially certified AI technology expert, specializing in machine learning and deep learning applications."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "Adobe 認證專家" : "Adobe Certified Expert"}</h4>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "Adobe Creative Suite 全系列認證，擅長將 AI 工具與傳統設計軟件結合。"
                        : "Adobe Creative Suite full certification, excelling in combining AI tools with traditional design software."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 教學理念 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Lightbulb className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "教學理念" : "Teaching Philosophy"}
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
                        ? "我相信 AI 不應該是少數技術專家的專利，而是每個有創意和想法的人都能使用的強大工具。通過實戰教學和真實案例，我要讓學員不只學會操作 AI 工具，更要理解如何將這些工具融入到實際工作中，創造真正的價值。"
                        : "I believe AI should not be the exclusive domain of a few technical experts, but a powerful tool that anyone with creativity and ideas can use. Through hands-on teaching and real case studies, I want students to not only learn to operate AI tools, but also understand how to integrate these tools into actual work to create real value."
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
                        {isZhTW ? "每個課程都以實際項目為基礎，學完即可應用到工作中" : "Every course is based on real projects, ready to apply to work immediately after learning"}
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

            {/* 為什麼開設這個課程 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "開課原因" : "Why This Course"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-6 bg-gradient-to-r ${instructorTheme.gradient} rounded-lg`}>
                  <blockquote className="text-white text-lg leading-relaxed italic">
                    {isZhTW 
                      ? "「在過去兩年裡，我看到太多人對 AI 充滿好奇卻不知道從何開始，也看到很多企業想要運用 AI 卻缺乏實務經驗。我開設這個課程，就是要填補這個空白 — 讓每個人都能輕鬆上手 AI 工具，並且真正應用到工作和生活中，創造實際價值。這不只是一門技術課程，更是一個改變你工作方式和思維模式的旅程。」"
                      : "\"In the past two years, I've seen too many people curious about AI but not knowing where to start, and many companies wanting to use AI but lacking practical experience. I created this course to fill this gap — to make AI tools accessible to everyone and truly applicable to work and life, creating real value. This is not just a technical course, but a journey that will change your way of working and thinking.\""
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

            {/* 聯絡方式 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {isZhTW ? "想要了解更多？" : "Want to Learn More?"}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {isZhTW 
                      ? "有任何課程相關問題，歡迎隨時聯絡我。我會親自回覆每一位學員的疑問。"
                      : "If you have any course-related questions, feel free to contact me anytime. I personally respond to every student's inquiry."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="ghost" className={`${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {isZhTW ? "WhatsApp 聯絡" : "WhatsApp Contact"}
                    </Button>
                    <Button className={`${instructorTheme.secondary} text-white`} onClick={handleRegister}>
                      <Calendar className="w-4 h-4 mr-2" />
                      {isZhTW ? "立即報名" : "Enroll Now"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'student-testimonials':
        return (
          <div className="space-y-8">
            {/* 學員評價 */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "⭐ 學員評價" : "⭐ Student Reviews"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Sarah L.",
                    role: "數碼營銷專員",
                    avatar: "S",
                    rating: 5,
                    comment: "Kenneth 導師的教學方式很實用，我學會了用 AI 工具製作專業廣告片。現在我的工作效率提升了 300%！",
                    project: "為公司製作的 AI 廣告片獲得了 50 萬觀看次數"
                  },
                  {
                    name: "Michael C.",
                    role: "自由創作者",
                    avatar: "M",
                    rating: 5,
                    comment: "課程內容很全面，從構思到製作都有詳細教學。Kling AI 和 Minimax 的應用讓我的創作更上一層樓。",
                    project: "用課程技巧接了 3 個商業項目，收入增加了 $15,000"
                  },
                  {
                    name: "Jenny W.",
                    role: "內容創作者",
                    avatar: "J",
                    rating: 5,
                    comment: "最喜歡 Photoshop 合成技巧的部分！學會後我可以快速製作出專業級的產品展示圖。",
                    project: "Instagram 粉絲從 2K 增長到 25K"
                  },
                  {
                    name: "David K.",
                    role: "中小企老闆",
                    avatar: "D",
                    rating: 5,
                    comment: "以前要花 $20,000 請廣告公司，現在自己就能做出高質量的廣告片。省錢又有效！",
                    project: "自製廣告片帶來 $100,000 銷售額"
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                          {testimonial.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-white">{testimonial.name}</h4>
                            <span className="text-sm text-gray-400">• {testimonial.role}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${instructorTheme.primary} fill-current`} />
                            ))}
                          </div>
                          <p className="text-gray-300 mb-3 leading-relaxed">"{testimonial.comment}"</p>
                          <div className={`text-sm ${instructorTheme.primary} font-semibold`}>
                            📈 成果：{testimonial.project}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 學員作品集 */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "🎨 學員作品集" : "🎨 Student Showcase"}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "AI 產品廣告片",
                    student: "Sarah L.",
                    description: "使用 Kling AI 製作的護膚品廣告，獲得 50 萬觀看次數",
                    tech: ["Kling AI", "CapCut", "Photoshop"],
                    result: "50 萬觀看次數"
                  },
                  {
                    title: "智能家居產品展示",
                    student: "Michael C.",
                    description: "結合 AI 特效和專業配音的智能家居產品宣傳片",
                    tech: ["Minimax AI", "ChatGPT", "CapCut"],
                    result: "客戶滿意度 95%"
                  },
                  {
                    title: "美食餐廳推廣片",
                    student: "Jenny W.",
                    description: "運用 AI 字幕和動態特效的美食餐廳宣傳內容",
                    tech: ["AI 字幕", "Kling AI", "Photoshop"],
                    result: "餐廳訂座增加 40%"
                  },
                  {
                    title: "電商產品合成圖",
                    student: "David K.",
                    description: "使用 Photoshop 合成技巧製作的電商產品展示圖",
                    tech: ["Photoshop", "AI 創意", "ChatGPT"],
                    result: "轉化率提升 25%"
                  },
                  {
                    title: "企業培訓短片",
                    student: "Lisa T.",
                    description: "為企業製作的 AI 培訓短片，獲得管理層讚賞",
                    tech: ["AI 配音", "CapCut", "AI 字幕"],
                    result: "獲得額外項目機會"
                  },
                  {
                    title: "品牌故事短片",
                    student: "Alex R.",
                    description: "運用課程技巧製作的品牌故事短片",
                    tech: ["Kling AI", "Minimax", "ChatGPT"],
                    result: "品牌知名度提升 60%"
                  }
                ].map((showcase, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`h-32 bg-gradient-to-br ${instructorTheme.gradient} rounded-lg mb-4 flex items-center justify-center`}>
                        <div className="text-white text-center">
                          <PlayCircle className="w-12 h-12 mx-auto mb-2" />
                          <div className="text-sm font-semibold">作品展示</div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-white mb-2">{showcase.title}</h4>
                      <p className="text-sm text-gray-400 mb-3">by {showcase.student}</p>
                      <p className="text-sm text-gray-300 mb-3">{showcase.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {showcase.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className={`${instructorTheme.accent} text-xs`}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className={`text-sm ${instructorTheme.primary} font-semibold`}>
                        📊 {showcase.result}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 統計數據 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  {isZhTW ? "📊 課程成效統計" : "📊 Course Impact Statistics"}
                </h3>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>500+</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "完成學員" : "Graduates"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>4.9/5</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "平均評分" : "Average Rating"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>85%</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "就業提升率" : "Career Advancement"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>300%</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "平均效率提升" : "Efficiency Improvement"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12 lg:items-start">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 flex flex-col h-fit sticky top-24">
            {/* Instructor Info Card */}
            <Card className={`bg-gradient-to-br ${instructorTheme.gradient} text-white mb-6`}>
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
            <Card className="mb-6 bg-gray-800 border-gray-700">
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
                    {isZhTW ? "立即報讀" : "Register Now"}
                  </Button>



                  <Button variant="ghost" className={`w-full ${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "透過 WhatsApp 查詢/報名" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Value Proposition */}
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="text-sm font-semibold text-white mb-3">
                      {isZhTW ? "🎯 課程價值" : "🎯 Course Value"}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "永久觀看權限" : "Lifetime Access"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "課程源代碼/筆記下載" : "Source Code & Notes Download"}</span>
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
                    <div className={`text-xs ${instructorTheme.accent} cursor-pointer`}>{isZhTW ? "了解更多" : "Learn More"} →</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog List Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  {isZhTW ? "📝 相關文章" : "📝 Related Articles"}
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

          {/* Right Content */}
          <div className="lg:col-span-2 flex flex-col">
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
            <div className="flex-1 min-h-[500px] max-h-[calc(100vh-24rem)] overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-track-gray-800/50">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOutlineTemplate; 