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

// 定義課�??�本信息?�口
interface CourseInfo {
  badge: string;
  title: string;
  subtitle: string;
  instructor: string;
  instructorTitle: string;
}

// 定義課�?統�??�口
interface CourseStat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// 定義課�?資�?標籤?�口
interface CourseInfoTag {
  name: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon' | 'featured';
}

// 定義?�選課�??�口
interface AvailableCourse {
  title: string;
  description: string;
  color: 'green' | 'orange';
  available: boolean;
}

// 定義?�?��??�接??interface LatestNews {
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

// 定義課�??�色?�口
interface CourseFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

// 定義FAQ?�口
interface FAQ {
  question: string;
  answer: string;
}

// 定義?��?學員?�口
interface TargetAudience {
  title: string;
  description: string;
  audiences: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

// 定義主模?�Props?�口
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



  // ?��?導師?�稱定義顏色主�?
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
      // ?�設使用黃色主�?
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
      label: isZhTW ? '課�?介紹' : 'Course Introduction',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'learning-content',
      label: isZhTW ? '學�??�容' : 'Learning Content',
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      id: 'target-audience',
      label: isZhTW ? '?��?對象' : 'Target Audience',
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
      label: isZhTW ? '常�??��?' : 'FAQ',
      icon: <MessageCircle className="w-4 h-4" />
    }
  ];

  // ?��??��?課�?標籤?��??��??��?課�?
  const getRelatedCourse = () => {
    const currentCourseBadge = courseInfo.badge;
    
    // ?�索?��?標籤?�課程�??��?試�??�匹?��?
    let sameCategoryCourses = courses.filter(course => {
      const courseCategory = isZhTW ? course.categoryCht : course.category;
      return courseCategory === currentCourseBadge;
    });
    
    // 如�?沒�?完全?��?，�?試部?�匹?��?標籤?��?
    if (sameCategoryCourses.length === 0) {
      sameCategoryCourses = courses.filter(course => {
        const courseTags = isZhTW ? course.tagsCht : course.tags;
        const courseCategory = isZhTW ? course.categoryCht : course.category;
        
        // 檢查標籤?�否?�含課�?標籤?��??��?
        const badgeKeywords = currentCourseBadge.toLowerCase();
        
        return courseTags.some(tag => 
          tag.toLowerCase().includes(badgeKeywords) || 
          badgeKeywords.includes(tag.toLowerCase())
        ) || courseCategory.toLowerCase().includes(badgeKeywords);
      });
    }
    
    // 如�??�到?��?標籤?�課程�??��??�更?��??��?�?    let relatedCourses = sameCategoryCourses.length > 0 
      ? sameCategoryCourses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      : courses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
    
    // ?��??�?��?課�?（�??�當?�課程�?
    return relatedCourses.find(course => {
      const courseTitle = isZhTW ? course.titleCht : course.title;
      return courseTitle !== courseInfo.title;
    }) || relatedCourses[0];
  };
  
  const relatedCourse = getRelatedCourse();
  
  // ?��??��?課�??��??��??�?��???  const getDynamicLatestNews = () => {
    if (!relatedCourse) {
      return latestNews; // 如�?沒�??�到課�?，使?��?來�??�?��???    }
    
    const formatDate = (date: Date) => {
      return isZhTW 
        ? date.toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric' })
        : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    
    // 計�??�扣?��?�?    const discountPercentage = relatedCourse.originalPrice 
      ? Math.round((1 - relatedCourse.price / relatedCourse.originalPrice) * 100)
      : 0;
    
    return {
      date: formatDate(relatedCourse.lastUpdated),
      title: isZhTW 
        ? `${relatedCourse.titleCht} - ?�?�課程更?�` 
        : `${relatedCourse.title} - Latest Course Update`,
      details: [
        {
          icon: "??",
          text: isZhTW 
            ? `課�??�長�?{relatedCourse.durationCht}` 
            : `Duration: ${relatedCourse.duration}`
        },
        {
          icon: "?��",
          text: isZhTW 
            ? `課�?費用�?{relatedCourse.currency}$${relatedCourse.price}${relatedCourse.originalPrice ? ` (?�價: ${relatedCourse.currency}$${relatedCourse.originalPrice}, 節??${discountPercentage}%)` : ''}`
            : `Price: ${relatedCourse.currency}$${relatedCourse.price}${relatedCourse.originalPrice ? ` (Original: ${relatedCourse.currency}$${relatedCourse.originalPrice}, Save ${discountPercentage}%)` : ''}`
        },
        {
          icon: "�?,
          text: isZhTW 
            ? `評�?�?{relatedCourse.rating}/5 (${relatedCourse.reviewCount}條�?�?`
            : `Rating: ${relatedCourse.rating}/5 (${relatedCourse.reviewCount} reviews)`
        },
        {
          icon: "?��",
          text: isZhTW 
            ? `已�? ${relatedCourse.students} ?�學?�報?�`
            : `${relatedCourse.students} students enrolled`
        },
        {
          icon: "??",
          text: isZhTW 
            ? `課�?等�?�?{relatedCourse.levelCht} | ??${relatedCourse.modules.length} ?�模組`
            : `Level: ${relatedCourse.level} | ${relatedCourse.modules.length} modules`
        },
        ...(relatedCourse.featured || relatedCourse.bestseller || relatedCourse.newCourse ? [{
          icon: "??",
          text: isZhTW 
            ? `?�色標籤�?{[
                relatedCourse.featured ? '精選課�?' : '',
                relatedCourse.bestseller ? '?�?�歡�? : '',
                relatedCourse.newCourse ? '?�課�? : ''
              ].filter(Boolean).join(', ')}`
            : `Highlights: ${[
                relatedCourse.featured ? 'Featured' : '',
                relatedCourse.bestseller ? 'Bestseller' : '',
                relatedCourse.newCourse ? 'New Course' : ''
              ].filter(Boolean).join(', ')}`
        }] : [])
      ],
      note: isZhTW 
        ? `?�是?��?{courseInfo.badge}?�相?��??�?�課程更?�。課程內容�??��?學員?��??��??��?求�?續優?�。�??�查?�更多課程詳?�。`
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

  // 渲�?不�?tab?�內�?  const renderTabContent = () => {
    switch (activeTab) {
      case 'course-intro':
        return (
          <div className="space-y-8">
            {/* Course Overview - Enhanced */}
            <div className="space-y-6">
              {/* 主�?課�?信息?��? */}
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${instructorTheme.gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${instructorTheme.gradient}`}>
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {isZhTW ? "課�?總覽" : "Course Overview"}
                    </h2>
                  </div>

                  {/* ?��?統�??��? */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>12</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "?�課�? : "Weeks"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>24</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "小�??�容" : "Hours"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>6</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "?��?�? : "Projects"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>??/div>
                      <div className="text-sm text-gray-400">{isZhTW ? "永�?觀?? : "Lifetime"}</div>
                    </div>
                  </div>

                  {/* 詳細課�??�色 */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhTW ? "學�??��?" : "Learning Schedule"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "課�?總長�? : "Total Duration"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "12 ?? : "12 Weeks"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "每週學習�??? : "Weekly Commitment"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "2-3 小�?" : "2-3 Hours"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "學�?模�?" : "Learning Mode"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "線�??�學" : "Self-Paced"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "語�?" : "Language"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "繁�?中�?" : "Traditional Chinese"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Award className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhTW ? "課�??�色" : "Course Features"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "實戰?�目導�?" : "Project-Based Learning"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "一對�?導師?��?" : "1-on-1 Mentorship"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "業�??�?�工?? : "Latest Industry Tools"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "完�?證書?�發" : "Certificate of Completion"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 學�?路�?展示 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "學�?路�?" : "Learning Path"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        phase: isZhTW ? "�?-3?? : "Week 1-3",
                        title: isZhTW ? "AI ?��??�創?�發?? : "AI Fundamentals & Creative Ideation",
                        description: isZhTW ? "學�? ChatGPT 4o ?�基?��?作�??�握?��? Prompt 設�?" : "Learn ChatGPT 4o basics and master creative prompt design",
                        icon: <Lightbulb className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "�?-6?? : "Week 4-6", 
                        title: isZhTW ? "視覺設�??��??��?�? : "Visual Design & Composition",
                        description: isZhTW ? "?�握 Photoshop ?��??�術�?製�?專業?��?展示?? : "Master Photoshop composition for professional product visuals",
                        icon: <Monitor className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "�?-9?? : "Week 7-9",
                        title: isZhTW ? "AI ?��??��?製�?" : "AI Motion Effects",
                        description: isZhTW ? "使用 Kling AI ?��??��??��?，學�?Minimax 語音?��? : "Create motion effects with Kling AI and learn Minimax voice technology",
                        icon: <PlayCircle className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "�?0-12?? : "Week 10-12",
                        title: isZhTW ? "專業影�?製�?" : "Professional Video Production",
                        description: isZhTW ? "?��??�?��??��?完�?完整?��?業�?影�??�目" : "Integrate all skills to complete commercial-grade video projects",
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

              {/* 工具?��?�?*/}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "使用工具?��?�? : "Tools & Technologies"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "ChatGPT 4o", category: isZhTW ? "AI 對話" : "AI Chat" },
                      { name: "Kling AI", category: isZhTW ? "?��??��?" : "Motion FX" },
                      { name: "Minimax AI", category: isZhTW ? "語音?��?" : "Voice AI" },
                      { name: "Photoshop", category: isZhTW ? "?��??��?" : "Image Edit" },
                      { name: "CapCut", category: isZhTW ? "影�??�輯" : "Video Edit" },
                      { name: "AI 字�?", category: isZhTW ? "?��??��??? : "Auto Subtitle" },
                      { name: "Figma", category: isZhTW ? "設�??��?" : "Design" },
                      { name: "Canva", category: isZhTW ? "快速設�? : "Quick Design" }
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
                  {isZhTW ? "課�?資�?" : "Course Information"}
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
                    // 導航?�相?�課程詳?��???                    if (relatedCourse) {
                      navigate(`/courses/${relatedCourse.id}`);
                    }
                  }}>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isZhTW ? "?�?��??? : "Latest News"}</span>
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
                {isZhTW ? "?�� 你�?學到什麼�?" : "?�� What You'll Learn"}
              </h3>
              
              {/* Detailed Learning Content - Accordion Format */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "AI �???��?規�?",
                    sections: [
                      {
                        title: "AI ?��??�勢?��??�創?�發?��?�?,
                        points: [
                          "學�??�用 ChatGPT 4o 快速�??�網上產?��?訊�?精�?歸�??��??�特�????,
                          "?�握如�?將產?�優?��??�為?��??�鏡，快?�產?��?說�??��?�???��???
                        ]
                      },
                      {
                        title: "ChatGPT 4o �???��??��??�製�?,
                        points: [
                          "學�??�用 ChatGPT ?��?精�??�創??Prompt，快?�產?�吸?�產?�廣?�腳?��?,
                          "?�握?��??�鏡?�輯，設計�?轉�??��?視覺?��?結�???
                        ]
                      },
                      {
                        title: "Photoshop 專業?��??��??��?,
                        points: [
                          "?�練使用 Photoshop ?�遮罩�?Mask）�??�層?�術�?完�??��??��??��??��???,
                          "學�?後�??��?細�?（�?如陰影調?�、�?源統一）�?顯�??��??��?視覺?�實?��?
                        ]
                      }
                    ]
                  },
                  {
                    title: "AI ?��??��?製�???AI ?�音?�用",
                    sections: [
                      {
                        title: "Kling AI 專業?��??��?完整製�?流�?",
                        points: [
                          "深入?�握 Kling AI 首尾幀設�?，製作產?��??��?示、浪?��??�氣等�?質�??��??��???,
                          "學�?如�?設�?高�? Prompt，精確控?�特?��??��??��??�造�?業�?視覺?��??��?,
                          "?�握 AI ?��??��?製�??�常見�?巧�?注�?事�?，快?��??�影?��?業�???
                        ]
                      },
                      {
                        title: "Minimax AI 語音複製?�數字人?�音?��?,
                        points: [
                          "學�?使用 Minimax 快速、精確�?製�??�聲?��?製�??�然流暢�?��話�??��?,
                          "?�握語音?��?設�??�巧�??��??��?�??專業?��?說�??��?
                        ]
                      }
                    ]
                  },
                  {
                    title: "影�??�輯?�術�? AI 字�??��???,
                    sections: [
                      {
                        title: "CapCut 專業影�??�輯?��?奏�??��?�?,
                        points: [
                          "學�? CapCut 快�??�輯?��??�特?��??��??��?影�?流暢度�?視覺專業?��?,
                          "?�握影�?節奏控?�方法�?例�??�畫?�步）�?精�?調整影�??��?觀?�注?��???
                        ]
                      },
                      {
                        title: "AI ?�能繁�?字�??��??��??�特?�製�?,
                        points: [
                          "?�練 AI ?��??��?繁�?字�??��?作�?程�?精�??�正?��?，�?少�?幕製作�??��?,
                          "?�握字�??��?�??設�?（�??��?字�??�特?�入?��?，�??�短?��?業�?覺�??��?
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
                                    <span className={`${instructorTheme.primary} mt-1`}>??/span>
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
                  {isZhTW ? "?�選課�?" : "Available Courses"}
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
            {/* 導師?��??�基?�信??*/}
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
                        {isZhTW ? "業�?顧�?" : "Industry Consultant"}
                      </Badge>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {isZhTW 
                        ? `?��?超�? 8 �?AI ?�術�??��?驗�?專精??AI 工具?�創?�產業�?實�??�用?�曾?�助超�? 200 家�?業�??��???AI ?��??��?程�?學員?��??��?，累計培養�???3,000 ??AI ?�用專�??�`
                        : `With over 8 years of AI technology application experience, specializing in practical AI tool applications in creative industries. Has successfully helped over 200 companies implement AI automation processes, with students worldwide and over 3,000 AI application specialists trained.`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 專業?�景?��?�?*/}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Briefcase className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "專業經�?" : "Professional Experience"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "科�??�司 AI ?��?總監" : "AI Product Director"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2019 - 2024</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "?��? AI ?��??�發?��?，�??�推?��?款�?�?AI ?�用，�??��??�百?�用?��?
                        : "Led AI product development team, successfully launched multiple commercial AI applications serving over one million users."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "?��?工�?室創辦人" : "Creative Studio Founder"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2016 - 2019</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "?�辦專業?��?工�?室�??��??��?供創?��??�碼?�銷�?��?��???
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
                    {isZhTW ? "專業認�?" : "Certifications"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "Google AI 認�?專家" : "Google AI Certified Expert"}</h4>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "Google 官方認�???AI ?�術�?家�?專精機器學�??�深度學習�??��?
                        : "Google officially certified AI technology expert, specializing in machine learning and deep learning applications."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "Adobe 認�?專家" : "Adobe Certified Expert"}</h4>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "Adobe Creative Suite ?�系?��?證�??�長�?AI 工具?�傳統設計�?件�??��?
                        : "Adobe Creative Suite full certification, excelling in combining AI tools with traditional design software."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ?�學?�念 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Lightbulb className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "?�學?�念" : "Teaching Philosophy"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {isZhTW ? '"讓�??�人?�能駕馭 AI ?��???' : '"Empowering Everyone to Harness the Power of AI"'}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {isZhTW 
                        ? "?�相�?AI 不�?該是少數?�術�?家�?專利，而是每個�??��??�想法�?人都?�使?��?強大工具?�通�?實戰?�學?��?實�?例�??��?讓學?��??�學?��?�?AI 工具，更要�?�??何�??��?工具?�入?�實?�工作中，創?��?�???�值�?
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
                        {isZhTW ? "實戰導�?" : "Practice-Oriented"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "每個課程都以實?��??�為?��?，學完即?��??�到工�?�? : "Every course is based on real projects, ready to apply to work immediately after learning"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {isZhTW ? "貼�??��?" : "Caring Guidance"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "?��?一對�??��?，確保�?位學?�都?��?上學習進度" : "Provide one-on-one guidance to ensure every student can keep up with the learning progress"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Rocket className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {isZhTW ? "?��??�新" : "Continuous Innovation"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "緊�? AI ?�術發展�?課�??�容?��??�新" : "Keep up with AI technology development, course content continuously updated"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ?��?麼�?設這個課�?*/}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "?�課?��?" : "Why This Course"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-6 bg-gradient-to-r ${instructorTheme.gradient} rounded-lg`}>
                  <blockquote className="text-white text-lg leading-relaxed italic">
                    {isZhTW 
                      ? "?�在?�去?�年裡�??��??�太多人�?AI ?�滿好�??��??��?從�??��?，�??�到很�?企業?��??�用 AI ?�缺乏實?��?驗。�??�設?�個課程�?就是要填補這個空????讓�??�人?�能輕�?上�? AI 工具，並且�?�???�到工�??��?活中，創?�實?�價?�。這�??�是一?�?�術課程�??�是一?�改變�?工�??��??�思維模�??��?程。�?
                      : "\"In the past two years, I've seen too many people curious about AI but not knowing where to start, and many companies wanting to use AI but lacking practical experience. I created this course to fill this gap ??to make AI tools accessible to everyone and truly applicable to work and life, creating real value. This is not just a technical course, but a journey that will change your way of working and thinking.\""
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

            {/* ?�絡?��? */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {isZhTW ? "?��?了解?��?�? : "Want to Learn More?"}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {isZhTW 
                      ? "?�任何課程相?��?題�?歡�??��??�絡?�。�??�親?��?覆�?一位學?��??��???
                      : "If you have any course-related questions, feel free to contact me anytime. I personally respond to every student's inquiry."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="ghost" className={`${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {isZhTW ? "WhatsApp ?�絡" : "WhatsApp Contact"}
                    </Button>
                    <Button className={`${instructorTheme.secondary} text-white`} onClick={handleRegister}>
                      <Calendar className="w-4 h-4 mr-2" />
                      {isZhTW ? "立即?��?" : "Enroll Now"}
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
                {isZhTW ? "�?學員評價" : "�?Student Reviews"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Sarah L.",
                    role: "?�碼?�銷專員",
                    avatar: "S",
                    rating: 5,
                    comment: "Kenneth 導師?��?學方式�?實用，�?學�?了用 AI 工具製�?專業�???�。現?��??�工作�??��??��? 300%�?,
                    project: "?�公?�製作�? AI �???�獲得�? 50 ?��??�次??
                  },
                  {
                    name: "Michael C.",
                    role: "?�由?��???,
                    avatar: "M",
                    rating: 5,
                    comment: "課�??�容很全?��?從�??�到製�??��?詳細?�學?�Kling AI ??Minimax ?��??��??��??��??��?一層�???,
                    project: "?�課程�?巧接�?3 ?��?業�??��??�入增�?�?$15,000"
                  },
                  {
                    name: "Jenny W.",
                    role: "?�容?��???,
                    avatar: "J",
                    rating: 5,
                    comment: "?�?�歡 Photoshop ?��??�巧�??��?！學?��??�可以快?�製作出專業級�??��?展示?��?,
                    project: "Instagram 粉絲�?2K 增長??25K"
                  },
                  {
                    name: "David K.",
                    role: "中�?企老�?",
                    avatar: "D",
                    rating: 5,
                    comment: "以�?要花 $20,000 請廣?�公?��??�在?�己就能?�出高質?��?�???�。�??��??��?�?,
                    project: "?�製�???�帶�?$100,000 ?�售�?
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
                            <span className="text-sm text-gray-400">??{testimonial.role}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${instructorTheme.primary} fill-current`} />
                            ))}
                          </div>
                          <p className="text-gray-300 mb-3 leading-relaxed">"{testimonial.comment}"</p>
                          <div className={`text-sm ${instructorTheme.primary} font-semibold`}>
                            ?? ?��?：{testimonial.project}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 學員作�???*/}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "?�� 學員作�??? : "?�� Student Showcase"}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "AI ?��?�????,
                    student: "Sarah L.",
                    description: "使用 Kling AI 製�??�護?��?�??，獲�?50 ?��??�次??,
                    tech: ["Kling AI", "CapCut", "Photoshop"],
                    result: "50 ?��??�次??
                  },
                  {
                    title: "?�能家�??��?展示",
                    student: "Michael C.",
                    description: "結�? AI ?��??��?業�??��??�能家�??��?�?��??,
                    tech: ["Minimax AI", "ChatGPT", "CapCut"],
                    result: "客戶滿�?�?95%"
                  },
                  {
                    title: "美�?餐廳?�廣??,
                    student: "Jenny W.",
                    description: "?�用 AI 字�??��??�特?��?美�?餐廳�?��?�容",
                    tech: ["AI 字�?", "Kling AI", "Photoshop"],
                    result: "餐廳訂座增�? 40%"
                  },
                  {
                    title: "?��??��??��???,
                    student: "David K.",
                    description: "使用 Photoshop ?��??�巧製作�??��??��?展示??,
                    tech: ["Photoshop", "AI ?��?", "ChatGPT"],
                    result: "轉�??��???25%"
                  },
                  {
                    title: "企業?��??��?",
                    student: "Lisa T.",
                    description: "?��?業製作�? AI ?��??��?，獲得管?�層讚�?",
                    tech: ["AI ?�音", "CapCut", "AI 字�?"],
                    result: "?��?額�??�目機�?"
                  },
                  {
                    title: "?��??��??��?",
                    student: "Alex R.",
                    description: "?�用課�??�巧製作�??��??��??��?",
                    tech: ["Kling AI", "Minimax", "ChatGPT"],
                    result: "?��??��?度�???60%"
                  }
                ].map((showcase, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`h-32 bg-gradient-to-br ${instructorTheme.gradient} rounded-lg mb-4 flex items-center justify-center`}>
                        <div className="text-white text-center">
                          <PlayCircle className="w-12 h-12 mx-auto mb-2" />
                          <div className="text-sm font-semibold">作�?展示</div>
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
                        ?? {showcase.result}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 統�??��? */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  {isZhTW ? "?? 課�??��?統�?" : "?? Course Impact Statistics"}
                </h3>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>500+</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "完�?學員" : "Graduates"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>4.9/5</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "平�?評�?" : "Average Rating"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>85%</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "就業?��??? : "Career Advancement"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>300%</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "平�??��??��?" : "Efficiency Improvement"}</div>
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
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
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
                    {isZhTW ? "立即?��?" : "Register Now"}
                  </Button>



                  <Button variant="ghost" className={`w-full ${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "?��? WhatsApp ?�詢/?��?" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Value Proposition */}
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="text-sm font-semibold text-white mb-3">
                      {isZhTW ? "?�� 課�??��? : "?�� Course Value"}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "永�?觀?��??? : "Lifetime Access"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "課�?源代�?筆�?下�?" : "Source Code & Notes Download"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "導師?��??�援" : "Instructor Q&A Support"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "證書?�發" : "Certificate of Completion"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">{pricingInfo.enterprise}</div>
                    <div className={`text-xs ${instructorTheme.accent} cursor-pointer`}>{isZhTW ? "了解?��?" : "Learn More"} ??/div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog List Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  {isZhTW ? "?? ?��??��?" : "?? Related Articles"}
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
