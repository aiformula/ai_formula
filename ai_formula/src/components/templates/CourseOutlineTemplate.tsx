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

// å®šç¾©èª²ç??ºæœ¬ä¿¡æ¯?¥å£
interface CourseInfo {
  badge: string;
  title: string;
  subtitle: string;
  instructor: string;
  instructorTitle: string;
}

// å®šç¾©èª²ç?çµ±è??¥å£
interface CourseStat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// å®šç¾©èª²ç?è³‡è?æ¨™ç±¤?¥å£
interface CourseInfoTag {
  name: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon' | 'featured';
}

// å®šç¾©?¯é¸èª²ç??¥å£
interface AvailableCourse {
  title: string;
  description: string;
  color: 'green' | 'orange';
  available: boolean;
}

// å®šç¾©?€?°æ??¯æ¥??interface LatestNews {
  date: string;
  title: string;
  details: Array<{
    icon: string;
    text: string;
  }>;
  note: string;
}

// å®šç¾©?¹æ ¼ä¿¡æ¯?¥å£
interface PricingInfo {
  series: string;
  price: string;
  originalPrice: string;
  aiInOne: string;
  studentPrice: string;
  enterprise: string;
}

// å®šç¾©èª²ç??¹è‰²?¥å£
interface CourseFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

// å®šç¾©FAQ?¥å£
interface FAQ {
  question: string;
  answer: string;
}

// å®šç¾©?®æ?å­¸å“¡?¥å£
interface TargetAudience {
  title: string;
  description: string;
  audiences: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

// å®šç¾©ä¸»æ¨¡?¿Props?¥å£
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



  // ?¹æ?å°å¸«?ç¨±å®šç¾©é¡è‰²ä¸»é?
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
      // ?è¨­ä½¿ç”¨é»ƒè‰²ä¸»é?
      return {
        gradient: 'from-yellow-600 to-yellow-800',
        primary: 'text-yellow-400',
        secondary: 'bg-yellow-600 hover:bg-yellow-700',
        accent: 'text-yellow-400 border-yellow-400'
      };
    }
  };

  const instructorTheme = getInstructorTheme(courseInfo.instructor);

  // Tabå®šç¾©
  const tabs = [
    {
      id: 'course-intro',
      label: isZhTW ? 'èª²ç?ä»‹ç´¹' : 'Course Introduction',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'learning-content',
      label: isZhTW ? 'å­¸ç??§å®¹' : 'Learning Content',
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      id: 'target-audience',
      label: isZhTW ? '?©å?å°è±¡' : 'Target Audience',
      icon: <UserCheck className="w-4 h-4" />
    },
    {
      id: 'instructor-profile',
      label: isZhTW ? 'å°å¸«ä»‹ç´¹' : 'Meet Your Instructor',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'student-testimonials',
      label: isZhTW ? 'å­¸å“¡å¿ƒè²' : 'Student Testimonials',
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'faq',
      label: isZhTW ? 'å¸¸è??é?' : 'FAQ',
      icon: <MessageCircle className="w-4 h-4" />
    }
  ];

  // ?¹æ??¶å?èª²ç?æ¨™ç±¤?•æ??²å??¸é?èª²ç?
  const getRelatedCourse = () => {
    const currentCourseBadge = courseInfo.badge;
    
    // ?œç´¢?¸å?æ¨™ç±¤?„èª²ç¨‹ï??ˆå?è©¦å??¨åŒ¹?ï?
    let sameCategoryCourses = courses.filter(course => {
      const courseCategory = isZhTW ? course.categoryCht : course.category;
      return courseCategory === currentCourseBadge;
    });
    
    // å¦‚æ?æ²’æ?å®Œå…¨?¹é?ï¼Œå?è©¦éƒ¨?†åŒ¹?æ?æ¨™ç±¤?¹é?
    if (sameCategoryCourses.length === 0) {
      sameCategoryCourses = courses.filter(course => {
        const courseTags = isZhTW ? course.tagsCht : course.tags;
        const courseCategory = isZhTW ? course.categoryCht : course.category;
        
        // æª¢æŸ¥æ¨™ç±¤?¯å¦?…å«èª²ç?æ¨™ç±¤?„é??µå?
        const badgeKeywords = currentCourseBadge.toLowerCase();
        
        return courseTags.some(tag => 
          tag.toLowerCase().includes(badgeKeywords) || 
          badgeKeywords.includes(tag.toLowerCase())
        ) || courseCategory.toLowerCase().includes(badgeKeywords);
      });
    }
    
    // å¦‚æ??¾åˆ°?¸å?æ¨™ç±¤?„èª²ç¨‹ï??‰æ??°æ›´?°æ??“æ?åº?    let relatedCourses = sameCategoryCourses.length > 0 
      ? sameCategoryCourses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      : courses.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
    
    // ?²å??€?°ç?èª²ç?ï¼ˆæ??¤ç•¶?èª²ç¨‹ï?
    return relatedCourses.find(course => {
      const courseTitle = isZhTW ? course.titleCht : course.title;
      return courseTitle !== courseInfo.title;
    }) || relatedCourses[0];
  };
  
  const relatedCourse = getRelatedCourse();
  
  // ?¹æ??¸é?èª²ç??Ÿæ??•æ??€?°æ???  const getDynamicLatestNews = () => {
    if (!relatedCourse) {
      return latestNews; // å¦‚æ?æ²’æ??¾åˆ°èª²ç?ï¼Œä½¿?¨å?ä¾†ç??€?°æ???    }
    
    const formatDate = (date: Date) => {
      return isZhTW 
        ? date.toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric' })
        : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    
    // è¨ˆç??˜æ‰£?¾å?æ¯?    const discountPercentage = relatedCourse.originalPrice 
      ? Math.round((1 - relatedCourse.price / relatedCourse.originalPrice) * 100)
      : 0;
    
    return {
      date: formatDate(relatedCourse.lastUpdated),
      title: isZhTW 
        ? `${relatedCourse.titleCht} - ?€?°èª²ç¨‹æ›´?°` 
        : `${relatedCourse.title} - Latest Course Update`,
      details: [
        {
          icon: "??",
          text: isZhTW 
            ? `èª²ç??‚é•·ï¼?{relatedCourse.durationCht}` 
            : `Duration: ${relatedCourse.duration}`
        },
        {
          icon: "?’°",
          text: isZhTW 
            ? `èª²ç?è²»ç”¨ï¼?{relatedCourse.currency}$${relatedCourse.price}${relatedCourse.originalPrice ? ` (?Ÿåƒ¹: ${relatedCourse.currency}$${relatedCourse.originalPrice}, ç¯€??${discountPercentage}%)` : ''}`
            : `Price: ${relatedCourse.currency}$${relatedCourse.price}${relatedCourse.originalPrice ? ` (Original: ${relatedCourse.currency}$${relatedCourse.originalPrice}, Save ${discountPercentage}%)` : ''}`
        },
        {
          icon: "â­?,
          text: isZhTW 
            ? `è©•å?ï¼?{relatedCourse.rating}/5 (${relatedCourse.reviewCount}æ¢è?è«?`
            : `Rating: ${relatedCourse.rating}/5 (${relatedCourse.reviewCount} reviews)`
        },
        {
          icon: "?‘¥",
          text: isZhTW 
            ? `å·²æ? ${relatedCourse.students} ?å­¸?Ÿå ±?`
            : `${relatedCourse.students} students enrolled`
        },
        {
          icon: "??",
          text: isZhTW 
            ? `èª²ç?ç­‰ç?ï¼?{relatedCourse.levelCht} | ??${relatedCourse.modules.length} ?‹æ¨¡çµ„`
            : `Level: ${relatedCourse.level} | ${relatedCourse.modules.length} modules`
        },
        ...(relatedCourse.featured || relatedCourse.bestseller || relatedCourse.newCourse ? [{
          icon: "??",
          text: isZhTW 
            ? `?¹è‰²æ¨™ç±¤ï¼?{[
                relatedCourse.featured ? 'ç²¾é¸èª²ç?' : '',
                relatedCourse.bestseller ? '?€?—æ­¡è¿? : '',
                relatedCourse.newCourse ? '?°èª²ç¨? : ''
              ].filter(Boolean).join(', ')}`
            : `Highlights: ${[
                relatedCourse.featured ? 'Featured' : '',
                relatedCourse.bestseller ? 'Bestseller' : '',
                relatedCourse.newCourse ? 'New Course' : ''
              ].filter(Boolean).join(', ')}`
        }] : [])
      ],
      note: isZhTW 
        ? `?™æ˜¯?‡ã€?{courseInfo.badge}?ç›¸?œç??€?°èª²ç¨‹æ›´?°ã€‚èª²ç¨‹å…§å®¹æ??¹æ?å­¸å“¡?é??Œå??´é?æ±‚æ?çºŒå„ª?–ã€‚é??ŠæŸ¥?‹æ›´å¤šèª²ç¨‹è©³?…ã€‚`
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

  // æ¸²æ?ä¸å?tab?„å…§å®?  const renderTabContent = () => {
    switch (activeTab) {
      case 'course-intro':
        return (
          <div className="space-y-8">
            {/* Course Overview - Enhanced */}
            <div className="space-y-6">
              {/* ä¸»è?èª²ç?ä¿¡æ¯?¡ç? */}
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${instructorTheme.gradient}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${instructorTheme.gradient}`}>
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {isZhTW ? "èª²ç?ç¸½è¦½" : "Course Overview"}
                    </h2>
                  </div>

                  {/* ?¸å?çµ±è??¸æ? */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>12</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "?±èª²ç¨? : "Weeks"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>24</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "å°æ??§å®¹" : "Hours"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>6</div>
                      <div className="text-sm text-gray-400">{isZhTW ? "?‹å?æ¡? : "Projects"}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>??/div>
                      <div className="text-sm text-gray-400">{isZhTW ? "æ°¸ä?è§€?? : "Lifetime"}</div>
                    </div>
                  </div>

                  {/* è©³ç´°èª²ç??¹è‰² */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhTW ? "å­¸ç??‚ç?" : "Learning Schedule"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "èª²ç?ç¸½é•·åº? : "Total Duration"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "12 ?? : "12 Weeks"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "æ¯é€±å­¸ç¿’æ??? : "Weekly Commitment"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "2-3 å°æ?" : "2-3 Hours"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "å­¸ç?æ¨¡å?" : "Learning Mode"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "ç·šä??ªå­¸" : "Self-Paced"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{isZhTW ? "èªè?" : "Language"}</span>
                          <span className="text-white font-semibold">{isZhTW ? "ç¹é?ä¸­æ?" : "Traditional Chinese"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Award className={`w-5 h-5 ${instructorTheme.primary}`} />
                        {isZhTW ? "èª²ç??¹è‰²" : "Course Features"}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "å¯¦æˆ°?…ç›®å°å?" : "Project-Based Learning"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "ä¸€å°ä?å°å¸«?‡å?" : "1-on-1 Mentorship"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "æ¥­ç??€?°å·¥?? : "Latest Industry Tools"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{isZhTW ? "å®Œæ?è­‰æ›¸?’ç™¼" : "Certificate of Completion"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* å­¸ç?è·¯å?å±•ç¤º */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "å­¸ç?è·¯å?" : "Learning Path"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        phase: isZhTW ? "ç¬?-3?? : "Week 1-3",
                        title: isZhTW ? "AI ?ºç??‡å‰µ?ç™¼?? : "AI Fundamentals & Creative Ideation",
                        description: isZhTW ? "å­¸ç? ChatGPT 4o ?„åŸº?¬æ?ä½œï??Œæ¡?µæ? Prompt è¨­è?" : "Learn ChatGPT 4o basics and master creative prompt design",
                        icon: <Lightbulb className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "ç¬?-6?? : "Week 4-6", 
                        title: isZhTW ? "è¦–è¦ºè¨­è??‡å??æ?å·? : "Visual Design & Composition",
                        description: isZhTW ? "?Œæ¡ Photoshop ?ˆæ??€è¡“ï?è£½ä?å°ˆæ¥­?¢å?å±•ç¤º?? : "Master Photoshop composition for professional product visuals",
                        icon: <Monitor className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "ç¬?-9?? : "Week 7-9",
                        title: isZhTW ? "AI ?•æ??¹æ?è£½ä?" : "AI Motion Effects",
                        description: isZhTW ? "ä½¿ç”¨ Kling AI ?µä??•æ??¹æ?ï¼Œå­¸ç¿?Minimax èªéŸ³?€è¡? : "Create motion effects with Kling AI and learn Minimax voice technology",
                        icon: <PlayCircle className="w-6 h-6" />
                      },
                      {
                        phase: isZhTW ? "ç¬?0-12?? : "Week 10-12",
                        title: isZhTW ? "å°ˆæ¥­å½±ç?è£½ä?" : "Professional Video Production",
                        description: isZhTW ? "?´å??€?‰æ??½ï?å®Œæ?å®Œæ•´?„å?æ¥­ç?å½±ç??…ç›®" : "Integrate all skills to complete commercial-grade video projects",
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

              {/* å·¥å…·?‡æ?è¡?*/}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "ä½¿ç”¨å·¥å…·?‡æ?è¡? : "Tools & Technologies"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "ChatGPT 4o", category: isZhTW ? "AI å°è©±" : "AI Chat" },
                      { name: "Kling AI", category: isZhTW ? "?•æ??¹æ?" : "Motion FX" },
                      { name: "Minimax AI", category: isZhTW ? "èªéŸ³?ˆæ?" : "Voice AI" },
                      { name: "Photoshop", category: isZhTW ? "?–å??•ç?" : "Image Edit" },
                      { name: "CapCut", category: isZhTW ? "å½±ç??ªè¼¯" : "Video Edit" },
                      { name: "AI å­—å?", category: isZhTW ? "?‡å??ªå??? : "Auto Subtitle" },
                      { name: "Figma", category: isZhTW ? "è¨­è??”ä?" : "Design" },
                      { name: "Canva", category: isZhTW ? "å¿«é€Ÿè¨­è¨? : "Quick Design" }
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
                  {isZhTW ? "èª²ç?è³‡è?" : "Course Information"}
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
                    // å°èˆª?°ç›¸?œèª²ç¨‹è©³?…é???                    if (relatedCourse) {
                      navigate(`/courses/${relatedCourse.id}`);
                    }
                  }}>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isZhTW ? "?€?°æ??? : "Latest News"}</span>
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
                {isZhTW ? "?¯ ä½ æ?å­¸åˆ°ä»€éº¼ï?" : "?¯ What You'll Learn"}
              </h3>
              
              {/* Detailed Learning Content - Accordion Format */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "AI å»???µæ?è¦å?",
                    sections: [
                      {
                        title: "AI ?¢å??ªå‹¢?†æ??‡å‰µ?ç™¼?³æ?å·?,
                        points: [
                          "å­¸è??©ç”¨ ChatGPT 4o å¿«é€Ÿå??ç¶²ä¸Šç”¢?è?è¨Šï?ç²¾æ?æ­¸ç??¢å??¨ç‰¹è³????,
                          "?Œæ¡å¦‚ä?å°‡ç”¢?å„ª?¢è??–ç‚º?µæ??†é¡ï¼Œå¿«?Ÿç”¢?ºæ?èªªæ??›ç?å»???µæ???
                        ]
                      },
                      {
                        title: "ChatGPT 4o å»???µæ??‡å??¡è£½ä½?,
                        points: [
                          "å­¸æ??©ç”¨ ChatGPT ?Ÿæ?ç²¾æ??„å‰µ??Promptï¼Œå¿«?Ÿç”¢?ºå¸?›ç”¢?å»£?Šè…³?¬ã€?,
                          "?Œæ¡?­ç??†é¡?è¼¯ï¼Œè¨­è¨ˆé?è½‰å??‡ç?è¦–è¦º?˜ä?çµæ???
                        ]
                      },
                      {
                        title: "Photoshop å°ˆæ¥­?¢å??ˆæ??€å·?,
                        points: [
                          "?Ÿç·´ä½¿ç”¨ Photoshop ?„é®ç½©ï?Maskï¼‰è??–å±¤?€è¡“ï?å®Œç??å??¢å??‡è??¯å???,
                          "å­¸è?å¾Œæ??•ç?ç´°ç?ï¼ˆä?å¦‚é™°å½±èª¿?´ã€å?æºçµ±ä¸€ï¼‰ï?é¡¯è??å??¢å?è¦–è¦º?Ÿå¯¦?Ÿã€?
                        ]
                      }
                    ]
                  },
                  {
                    title: "AI ?•æ??¹æ?è£½ä???AI ?éŸ³?‰ç”¨",
                    sections: [
                      {
                        title: "Kling AI å°ˆæ¥­?•æ??¹æ?å®Œæ•´è£½ä?æµç?",
                        points: [
                          "æ·±å…¥?Œæ¡ Kling AI é¦–å°¾å¹€è¨­å?ï¼Œè£½ä½œç”¢?å??‹å?ç¤ºã€æµª?±å??¸æ°£ç­‰é?è³ªç??•æ??¹æ???,
                          "å­¸ç?å¦‚ä?è¨­è?é«˜æ? Promptï¼Œç²¾ç¢ºæ§?¶ç‰¹?ˆå??¾æ??œï??“é€ å?æ¥­ç?è¦–è¦º?¸å??›ã€?,
                          "?Œæ¡ AI ?•æ??¹æ?è£½ä??„å¸¸è¦‹æ?å·§è?æ³¨æ?äº‹é?ï¼Œå¿«?Ÿæ??‡å½±?‡å?æ¥­æ???
                        ]
                      },
                      {
                        title: "Minimax AI èªéŸ³è¤‡è£½?Šæ•¸å­—äºº?éŸ³?€å·?,
                        points: [
                          "å­¸æ?ä½¿ç”¨ Minimax å¿«é€Ÿã€ç²¾ç¢ºè?è£½ä??„è²?³ï?è£½ä??ªç„¶æµæš¢å»?±è©±æ??½ã€?,
                          "?Œæ¡èªéŸ³?‡æ?è¨­è??€å·§ï??å??ç?å»??å°ˆæ¥­?Ÿå?èªªæ??›ã€?
                        ]
                      }
                    ]
                  },
                  {
                    title: "å½±ç??ªè¼¯?€è¡“è? AI å­—å??ªå???,
                    sections: [
                      {
                        title: "CapCut å°ˆæ¥­å½±ç??ªè¼¯?‡ç?å¥æ??§æ?å·?,
                        points: [
                          "å­¸ç? CapCut å¿«é??ªè¼¯?‡é??´ç‰¹?ˆæ??¨ï??å?å½±ç?æµæš¢åº¦è?è¦–è¦ºå°ˆæ¥­?Ÿã€?,
                          "?Œæ¡å½±ç?ç¯€å¥æ§?¶æ–¹æ³•ï?ä¾‹å??³ç•«?Œæ­¥ï¼‰ï?ç²¾æ?èª¿æ•´å½±ç??¸å?è§€?¾æ³¨?å???
                        ]
                      },
                      {
                        title: "AI ?ºèƒ½ç¹é?å­—å??Ÿæ??‡è??½ç‰¹?ˆè£½ä½?,
                        points: [
                          "?Ÿç·´ AI ?ªå??Ÿæ?ç¹é?å­—å??„æ?ä½œæ?ç¨‹è?ç²¾æ??¡æ­£?¹æ?ï¼Œæ?å°‘å?å¹•è£½ä½œæ??“ã€?,
                          "?Œæ¡å­—å??¹æ?æ¨??è¨­è?ï¼ˆå??•æ?å­—å??ç‰¹?ˆå…¥?´ï?ï¼Œæ??‡çŸ­?‡å?æ¥­è?è¦ºæ??œã€?
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
                  {isZhTW ? "?¯é¸èª²ç?" : "Available Courses"}
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
            {/* å°å¸«?­å??ŒåŸº?¬ä¿¡??*/}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center flex-shrink-0`}>
                    <div className="text-white text-center">
                      <div className="text-4xl font-bold mb-1">{courseInfo.instructor.charAt(0)}</div>
                      <div className="text-sm opacity-90">å°å¸«</div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">{courseInfo.instructor}</h2>
                    <p className="text-xl text-gray-300 mb-4">{courseInfo.instructorTitle}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <Badge className={`${instructorTheme.secondary} text-white`}>
                        {isZhTW ? "AI å°ˆå®¶" : "AI Expert"}
                      </Badge>
                      <Badge className={`${instructorTheme.secondary} text-white`}>
                        {isZhTW ? "è³‡æ·±å°å¸«" : "Senior Instructor"}
                      </Badge>
                      <Badge className={`${instructorTheme.secondary} text-white`}>
                        {isZhTW ? "æ¥­ç?é¡§å?" : "Industry Consultant"}
                      </Badge>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {isZhTW 
                        ? `?æ?è¶…é? 8 å¹?AI ?€è¡“æ??¨ç?é©—ï?å°ˆç²¾??AI å·¥å…·?¨å‰µ?ç”¢æ¥­ç?å¯¦é??‰ç”¨?‚æ›¾?”åŠ©è¶…é? 200 å®¶ä?æ¥­æ??Ÿå???AI ?ªå??–æ?ç¨‹ï?å­¸å“¡?ä??¨ç?ï¼Œç´¯è¨ˆåŸ¹é¤Šè???3,000 ??AI ?‰ç”¨å°ˆæ??‚`
                        : `With over 8 years of AI technology application experience, specializing in practical AI tool applications in creative industries. Has successfully helped over 200 companies implement AI automation processes, with students worldwide and over 3,000 AI application specialists trained.`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* å°ˆæ¥­?Œæ™¯?‡ç?é©?*/}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Briefcase className={`w-5 h-5 ${instructorTheme.primary}`} />
                    {isZhTW ? "å°ˆæ¥­ç¶“é?" : "Professional Experience"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "ç§‘æ??¬å¸ AI ?¢å?ç¸½ç›£" : "AI Product Director"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2019 - 2024</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "?˜å? AI ?¢å??‹ç™¼?˜é?ï¼Œæ??Ÿæ¨?ºå?æ¬¾å?æ¥?AI ?‰ç”¨ï¼Œæ??™è??ç™¾?¬ç”¨?¶ã€?
                        : "Led AI product development team, successfully launched multiple commercial AI applications serving over one million users."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "?µæ?å·¥ä?å®¤å‰µè¾¦äºº" : "Creative Studio Founder"}</h4>
                    <p className="text-sm text-gray-400 mb-2">2016 - 2019</p>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "?µè¾¦å°ˆæ¥­?µæ?å·¥ä?å®¤ï??ºå??Œæ?ä¾›å‰µ?°ç??¸ç¢¼?ŸéŠ·è§?±º?¹æ???
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
                    {isZhTW ? "å°ˆæ¥­èªè?" : "Certifications"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "Google AI èªè?å°ˆå®¶" : "Google AI Certified Expert"}</h4>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "Google å®˜æ–¹èªè???AI ?€è¡“å?å®¶ï?å°ˆç²¾æ©Ÿå™¨å­¸ç??Œæ·±åº¦å­¸ç¿’æ??¨ã€?
                        : "Google officially certified AI technology expert, specializing in machine learning and deep learning applications."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{isZhTW ? "Adobe èªè?å°ˆå®¶" : "Adobe Certified Expert"}</h4>
                    <p className="text-gray-300 text-sm">
                      {isZhTW 
                        ? "Adobe Creative Suite ?¨ç³»?—è?è­‰ï??…é•·å°?AI å·¥å…·?‡å‚³çµ±è¨­è¨ˆè?ä»¶ç??ˆã€?
                        : "Adobe Creative Suite full certification, excelling in combining AI tools with traditional design software."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ?™å­¸?†å¿µ */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Lightbulb className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "?™å­¸?†å¿µ" : "Teaching Philosophy"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {isZhTW ? '"è®“æ??‹äºº?½èƒ½é§•é¦­ AI ?„å???' : '"Empowering Everyone to Harness the Power of AI"'}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {isZhTW 
                        ? "?‘ç›¸ä¿?AI ä¸æ?è©²æ˜¯å°‘æ•¸?€è¡“å?å®¶ç?å°ˆåˆ©ï¼Œè€Œæ˜¯æ¯å€‹æ??µæ??Œæƒ³æ³•ç?äººéƒ½?½ä½¿?¨ç?å¼·å¤§å·¥å…·?‚é€šé?å¯¦æˆ°?™å­¸?Œç?å¯¦æ?ä¾‹ï??‘è?è®“å­¸?¡ä??ªå­¸?ƒæ?ä½?AI å·¥å…·ï¼Œæ›´è¦ç?è§??ä½•å??™ä?å·¥å…·?å…¥?°å¯¦?›å·¥ä½œä¸­ï¼Œå‰µ? ç?æ­???¹å€¼ã€?
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
                        {isZhTW ? "å¯¦æˆ°å°å?" : "Practice-Oriented"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "æ¯å€‹èª²ç¨‹éƒ½ä»¥å¯¦?›é??®ç‚º?ºç?ï¼Œå­¸å®Œå³?¯æ??¨åˆ°å·¥ä?ä¸? : "Every course is based on real projects, ready to apply to work immediately after learning"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {isZhTW ? "è²¼å??‡å?" : "Caring Guidance"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "?ä?ä¸€å°ä??‡å?ï¼Œç¢ºä¿æ?ä½å­¸?¡éƒ½?½è?ä¸Šå­¸ç¿’é€²åº¦" : "Provide one-on-one guidance to ensure every student can keep up with the learning progress"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center`}>
                        <Rocket className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {isZhTW ? "?ç??µæ–°" : "Continuous Innovation"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {isZhTW ? "ç·Šè? AI ?€è¡“ç™¼å±•ï?èª²ç??§å®¹?ç??´æ–°" : "Keep up with AI technology development, course content continuously updated"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ?ºä?éº¼é?è¨­é€™å€‹èª²ç¨?*/}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className={`w-5 h-5 ${instructorTheme.primary}`} />
                  {isZhTW ? "?‹èª²?Ÿå?" : "Why This Course"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-6 bg-gradient-to-r ${instructorTheme.gradient} rounded-lg`}>
                  <blockquote className="text-white text-lg leading-relaxed italic">
                    {isZhTW 
                      ? "?Œåœ¨?å»?©å¹´è£¡ï??‘ç??°å¤ªå¤šäººå°?AI ?…æ»¿å¥½å??»ä??¥é?å¾ä??‹å?ï¼Œä??‹åˆ°å¾ˆå?ä¼æ¥­?³è??‹ç”¨ AI ?»ç¼ºä¹å¯¦?™ç?é©—ã€‚æ??‹è¨­?™å€‹èª²ç¨‹ï?å°±æ˜¯è¦å¡«è£œé€™å€‹ç©º????è®“æ??‹äºº?½èƒ½è¼•é?ä¸Šæ? AI å·¥å…·ï¼Œä¸¦ä¸”ç?æ­???¨åˆ°å·¥ä??Œç?æ´»ä¸­ï¼Œå‰µ? å¯¦?›åƒ¹?¼ã€‚é€™ä??ªæ˜¯ä¸€?€?€è¡“èª²ç¨‹ï??´æ˜¯ä¸€?‹æ”¹è®Šä?å·¥ä??¹å??Œæ€ç¶­æ¨¡å??„æ?ç¨‹ã€‚ã€?
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

            {/* ?¯çµ¡?¹å? */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {isZhTW ? "?³è?äº†è§£?´å?ï¼? : "Want to Learn More?"}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {isZhTW 
                      ? "?‰ä»»ä½•èª²ç¨‹ç›¸?œå?é¡Œï?æ­¡è??¨æ??¯çµ¡?‘ã€‚æ??ƒè¦ª?ªå?è¦†æ?ä¸€ä½å­¸?¡ç??‘å???
                      : "If you have any course-related questions, feel free to contact me anytime. I personally respond to every student's inquiry."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="ghost" className={`${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {isZhTW ? "WhatsApp ?¯çµ¡" : "WhatsApp Contact"}
                    </Button>
                    <Button className={`${instructorTheme.secondary} text-white`} onClick={handleRegister}>
                      <Calendar className="w-4 h-4 mr-2" />
                      {isZhTW ? "ç«‹å³?±å?" : "Enroll Now"}
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
            {/* å­¸å“¡è©•åƒ¹ */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "â­?å­¸å“¡è©•åƒ¹" : "â­?Student Reviews"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Sarah L.",
                    role: "?¸ç¢¼?ŸéŠ·å°ˆå“¡",
                    avatar: "S",
                    rating: 5,
                    comment: "Kenneth å°å¸«?„æ?å­¸æ–¹å¼å?å¯¦ç”¨ï¼Œæ?å­¸æ?äº†ç”¨ AI å·¥å…·è£½ä?å°ˆæ¥­å»???‡ã€‚ç¾?¨æ??„å·¥ä½œæ??‡æ??‡ä? 300%ï¼?,
                    project: "?ºå…¬?¸è£½ä½œç? AI å»???‡ç²å¾—ä? 50 ?¬è??‹æ¬¡??
                  },
                  {
                    name: "Michael C.",
                    role: "?ªç”±?µä???,
                    avatar: "M",
                    rating: 5,
                    comment: "èª²ç??§å®¹å¾ˆå…¨?¢ï?å¾æ??åˆ°è£½ä??½æ?è©³ç´°?™å­¸?‚Kling AI ??Minimax ?„æ??¨è??‘ç??µä??´ä?ä¸€å±¤æ???,
                    project: "?¨èª²ç¨‹æ?å·§æ¥äº?3 ?‹å?æ¥­é??®ï??¶å…¥å¢å?äº?$15,000"
                  },
                  {
                    name: "Jenny W.",
                    role: "?§å®¹?µä???,
                    avatar: "J",
                    rating: 5,
                    comment: "?€?œæ­¡ Photoshop ?ˆæ??€å·§ç??¨å?ï¼å­¸?ƒå??‘å¯ä»¥å¿«?Ÿè£½ä½œå‡ºå°ˆæ¥­ç´šç??¢å?å±•ç¤º?–ã€?,
                    project: "Instagram ç²‰çµ²å¾?2K å¢é•·??25K"
                  },
                  {
                    name: "David K.",
                    role: "ä¸­å?ä¼è€é?",
                    avatar: "D",
                    rating: 5,
                    comment: "ä»¥å?è¦èŠ± $20,000 è«‹å»£?Šå…¬?¸ï??¾åœ¨?ªå·±å°±èƒ½?šå‡ºé«˜è³ª?ç?å»???‡ã€‚ç??¢å??‰æ?ï¼?,
                    project: "?ªè£½å»???‡å¸¶ä¾?$100,000 ?·å”®é¡?
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
                            ?? ?æ?ï¼š{testimonial.project}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* å­¸å“¡ä½œå???*/}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isZhTW ? "?¨ å­¸å“¡ä½œå??? : "?¨ Student Showcase"}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "AI ?¢å?å»????,
                    student: "Sarah L.",
                    description: "ä½¿ç”¨ Kling AI è£½ä??„è­·?šå?å»??ï¼Œç²å¾?50 ?¬è??‹æ¬¡??,
                    tech: ["Kling AI", "CapCut", "Photoshop"],
                    result: "50 ?¬è??‹æ¬¡??
                  },
                  {
                    title: "?ºèƒ½å®¶å??¢å?å±•ç¤º",
                    student: "Michael C.",
                    description: "çµå? AI ?¹æ??Œå?æ¥­é??³ç??ºèƒ½å®¶å??¢å?å®?‚³??,
                    tech: ["Minimax AI", "ChatGPT", "CapCut"],
                    result: "å®¢æˆ¶æ»¿æ?åº?95%"
                  },
                  {
                    title: "ç¾é?é¤å»³?¨å»£??,
                    student: "Jenny W.",
                    description: "?‹ç”¨ AI å­—å??Œå??‹ç‰¹?ˆç?ç¾é?é¤å»³å®?‚³?§å®¹",
                    tech: ["AI å­—å?", "Kling AI", "Photoshop"],
                    result: "é¤å»³è¨‚åº§å¢å? 40%"
                  },
                  {
                    title: "?»å??¢å??ˆæ???,
                    student: "David K.",
                    description: "ä½¿ç”¨ Photoshop ?ˆæ??€å·§è£½ä½œç??»å??¢å?å±•ç¤º??,
                    tech: ["Photoshop", "AI ?µæ?", "ChatGPT"],
                    result: "è½‰å??‡æ???25%"
                  },
                  {
                    title: "ä¼æ¥­?¹è??­ç?",
                    student: "Lisa T.",
                    description: "?ºä?æ¥­è£½ä½œç? AI ?¹è??­ç?ï¼Œç²å¾—ç®¡?†å±¤è®šè?",
                    tech: ["AI ?éŸ³", "CapCut", "AI å­—å?"],
                    result: "?²å?é¡å??…ç›®æ©Ÿæ?"
                  },
                  {
                    title: "?ç??…ä??­ç?",
                    student: "Alex R.",
                    description: "?‹ç”¨èª²ç??€å·§è£½ä½œç??ç??…ä??­ç?",
                    tech: ["Kling AI", "Minimax", "ChatGPT"],
                    result: "?ç??¥å?åº¦æ???60%"
                  }
                ].map((showcase, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`h-32 bg-gradient-to-br ${instructorTheme.gradient} rounded-lg mb-4 flex items-center justify-center`}>
                        <div className="text-white text-center">
                          <PlayCircle className="w-12 h-12 mx-auto mb-2" />
                          <div className="text-sm font-semibold">ä½œå?å±•ç¤º</div>
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

            {/* çµ±è??¸æ? */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  {isZhTW ? "?? èª²ç??æ?çµ±è?" : "?? Course Impact Statistics"}
                </h3>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>500+</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "å®Œæ?å­¸å“¡" : "Graduates"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>4.9/5</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "å¹³å?è©•å?" : "Average Rating"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>85%</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "å°±æ¥­?å??? : "Career Advancement"}</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${instructorTheme.primary} mb-2`}>300%</div>
                    <div className="text-sm text-gray-400">{isZhTW ? "å¹³å??ˆç??å?" : "Efficiency Improvement"}</div>
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
                    {isZhTW ? "ç«‹å³?±è?" : "Register Now"}
                  </Button>



                  <Button variant="ghost" className={`w-full ${instructorTheme.accent} hover:bg-gray-700`} onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isZhTW ? "?é? WhatsApp ?¥è©¢/?±å?" : "WhatsApp Inquiry"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Value Proposition */}
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="text-sm font-semibold text-white mb-3">
                      {isZhTW ? "?¯ èª²ç??¹å€? : "?¯ Course Value"}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "æ°¸ä?è§€?‹æ??? : "Lifetime Access"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "èª²ç?æºä»£ç¢?ç­†è?ä¸‹è?" : "Source Code & Notes Download"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "å°å¸«?ç??¯æ´" : "Instructor Q&A Support"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{isZhTW ? "è­‰æ›¸?’ç™¼" : "Certificate of Completion"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-600">
                    <div className="text-sm text-gray-400">{pricingInfo.enterprise}</div>
                    <div className={`text-xs ${instructorTheme.accent} cursor-pointer`}>{isZhTW ? "äº†è§£?´å?" : "Learn More"} ??/div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog List Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  {isZhTW ? "?? ?¸é??‡ç?" : "?? Related Articles"}
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
