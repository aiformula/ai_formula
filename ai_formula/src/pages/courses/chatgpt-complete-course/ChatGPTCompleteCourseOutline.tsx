/**
 * ChatGPT Complete Course Outline Page
 * @fileoverview 使用真實數據的 ChatGPT 完整教學實戰課程頁面
 * @author AI Formula Team
 * @version 4.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseOutline from '@/features/course/CourseOutline';
import { chatGPTCourseData } from '@/data/chatgpt-complete-course-data';
import { 
  Clock, 
  Monitor, 
  Users, 
  Brain, 
  Target, 
  Lightbulb,
  Zap,
  Database,
  Smartphone,
  Heart,
  Shield,
  Star,
  TrendingUp,
  BookOpen,
  Search,
  BarChart3,
  Rocket,
  Award,
  CheckCircle,
  Code,
  Globe,
  MessageSquare,
  Edit3,
  FileText,
  Briefcase,
  GraduationCap,
  UserCheck,
  Wand2
} from 'lucide-react';

const ChatGPTCompleteCourseOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 課程統計 - 動態圖標
  const courseStats = [
    {
      icon: React.createElement(Clock, { className: "w-6 h-6 text-[#10a37f]" }),
      label: isZhHK ? "課程總長度" : "Course Duration",
      value: isZhHK ? "8+ 小時深度學習" : "8+ Hours Deep Learning"
    },
    {
      icon: React.createElement(Monitor, { className: "w-6 h-6 text-[#10a37f]" }),
      label: isZhHK ? "學習模式" : "Learning Mode",
      value: isZhHK ? "線上自學" : "Online Self-Study"
    },
    {
      icon: React.createElement(Users, { className: "w-6 h-6 text-[#10a37f]" }),
      label: isZhHK ? "多小時深度學習" : "Multi-Hour Deep Learning",
      value: isZhHK ? "專業深度內容" : "Professional Deep Content"
    },
    {
      icon: React.createElement(BookOpen, { className: "w-6 h-6 text-[#10a37f]" }),
      label: isZhHK ? "章節" : "Chapters",
      value: isZhHK ? "6大章節 31單元" : "6 Chapters 31 Units"
    }
  ];

  // 課程信息標籤 - 動態圖標
  const courseInfoTags = [
    { 
      icon: React.createElement(Brain, { className: "w-8 h-8 text-blue-400" }),
      title: isZhHK ? "深度理論基礎" : "Deep Theoretical Foundation",
      description: isZhHK ? "從LLM到Transformer架構，建立扎實的AI知識基礎" : "From LLM to Transformer architecture, build solid AI knowledge foundation"
    },
    {
      icon: React.createElement(Zap, { className: "w-8 h-8 text-yellow-400" }),
      title: isZhHK ? "實戰技能訓練" : "Practical Skills Training",
      description: isZhHK ? "掌握提示工程、多模態應用等核心實戰技能" : "Master prompt engineering, multimodal applications and core practical skills"
    },
    {
      icon: React.createElement(Wand2, { className: "w-8 h-8 text-purple-400" }),
      title: isZhHK ? "個人化應用" : "Personalized Applications",
      description: isZhHK ? "學習創建自訂GPT，打造專屬AI助手" : "Learn to create custom GPTs and build personal AI assistants"
    },
    {
      icon: React.createElement(Globe, { className: "w-8 h-8 text-[#10a37f]" }),
      title: isZhHK ? "未來趨勢洞察" : "Future Trends Insight",
      description: isZhHK ? "深入了解AI倫理、隱私與未來發展方向" : "Deep understanding of AI ethics, privacy and future development"
    }
  ];

  // 課程特色 - 動態圖標
  const courseFeatures = [
    {
      icon: React.createElement(GraduationCap, { className: "w-8 h-8 text-blue-400" }),
      title: isZhHK ? "系統化學習路徑" : "Systematic Learning Path",
      description: isZhHK ? "從基礎到進階，循序漸進的完整學習體系" : "From basics to advanced, progressive complete learning system"
    },
    {
      icon: React.createElement(Code, { className: "w-8 h-8 text-[#10a37f]" }),
      title: isZhHK ? "豐富實戰案例" : "Rich Practical Cases",
      description: isZhHK ? "涵蓋內容創作、數據分析、編程輔助等多個領域" : "Covers content creation, data analysis, programming assistance and more"
    },
    {
      icon: React.createElement(Target, { className: "w-8 h-8 text-purple-400" }),
      title: isZhHK ? "高級技巧揭秘" : "Advanced Techniques Revealed",
      description: isZhHK ? "掌握提示工程、角色扮演、思維鏈等專業技巧" : "Master prompt engineering, role-playing, chain-of-thought and professional techniques"
    },
    {
      icon: React.createElement(Rocket, { className: "w-8 h-8 text-red-400" }),
      title: isZhHK ? "前沿趨勢分析" : "Cutting-edge Trend Analysis",
      description: isZhHK ? "深入探討AI倫理、隱私保護與未來發展趨勢" : "Deep exploration of AI ethics, privacy protection and future development trends"
    }
  ];

  // 目標受眾 - 動態圖標
  const targetAudience = {
    title: isZhHK ? "適合學習對象" : "Target Audience",
    subtitle: isZhHK ? "無論您是AI新手還是想要深化技能的專業人士，這門課程都能為您提供價值" : "Whether you're an AI beginner or a professional looking to deepen your skills, this course provides value",
    groups: [
      {
        icon: React.createElement(UserCheck, { className: "w-8 h-8 text-blue-400" }),
        title: isZhHK ? "職場工作者" : "Working Professionals",
        description: isZhHK ? "希望運用AI工具提升工作效率，在職場中獲得競爭優勢的專業人士" : "Professionals hoping to use AI tools to improve work efficiency and gain competitive advantage"
      },
      {
        icon: React.createElement(Briefcase, { className: "w-8 h-8 text-[#10a37f]" }),
        title: isZhHK ? "創業者與自由工作者" : "Entrepreneurs & Freelancers",
        description: isZhHK ? "需要利用AI技術降低成本、提高生產力的創業者和獨立工作者" : "Entrepreneurs and independent workers who need to use AI technology to reduce costs and improve productivity"
      },
      {
        icon: React.createElement(BookOpen, { className: "w-8 h-8 text-purple-400" }),
        title: isZhHK ? "學生與研究者" : "Students & Researchers",
        description: isZhHK ? "對AI技術感興趣，希望深入了解和應用的學生與學術研究人員" : "Students and academic researchers interested in AI technology and seeking deep understanding and application"
      },
      {
        icon: React.createElement(Lightbulb, { className: "w-8 h-8 text-yellow-400" }),
        title: isZhHK ? "技術愛好者" : "Tech Enthusiasts",
        description: isZhHK ? "對新興技術充滿好奇，希望掌握最新AI應用的科技愛好者" : "Tech enthusiasts curious about emerging technologies and wanting to master the latest AI applications"
      }
    ]
  };

  // 價格信息
  const pricingInfo = {
    price: isZhHK ? "完全免費" : "Completely Free",
    aiInOne: isZhHK ? "永久觀看權限" : "Lifetime Access"
  };

  // 可選課程（相關推薦）
  const availableCourses = [
    // 已移除 AI 商業自動化課程
  ];

  // 最新消息
  const latestNews = {
    title: isZhHK ? "🎉 課程全面更新" : "🎉 Course Fully Updated",
    description: isZhHK ? "基於最新的ChatGPT-4o和GPT商店功能，課程內容已全面更新" : "Based on the latest ChatGPT-4o and GPT Store features, course content has been fully updated",
    features: [
      isZhHK ? "新增GPT-4o多模態功能詳解" : "Added GPT-4o multimodal feature explanation",
      isZhHK ? "增加自訂GPT創建實戰案例" : "Added custom GPT creation practical cases",
      isZhHK ? "更新隱私設定與數據保護內容" : "Updated privacy settings and data protection content",
      isZhHK ? "添加最新的提示工程技巧" : "Added latest prompt engineering techniques"
    ],
    ctaText: isZhHK ? "立即學習最新內容" : "Learn Latest Content Now"
  };

  // 處理開始學習
  const handleStartLearning = () => {
    navigate('/courses/chatgpt-complete-course/learning');
  };

  // 處理WhatsApp聯繫
  const handleContactWhatsApp = () => {
    const message = isZhHK 
      ? '我想了解更多關於ChatGPT完整教學實戰課程的信息' 
      : 'I want to learn more about the ChatGPT Complete Practical Course';
    window.open(`https://wa.me/85293816674?text=${encodeURIComponent(message)}`, '_blank');
  };

  // 將課程模塊數據轉換為CourseOutline期望的格式
  const adaptedCourseModules = chatGPTCourseData.courseModules.map(module => ({
    ...module,
    lessons: module.lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      type: 'reading' as const, // 將 'text' 轉換為 'reading'
      isPreview: lesson.id <= 2 // 前兩個課程作為預覽
    }))
  }));

  // 修正其他數據結構
  const adaptedCourseInfoTags = courseInfoTags.map(tag => ({
    ...tag,
    name: tag.title,
    status: 'available' as const
  }));

  const adaptedAvailableCourses = availableCourses.map(course => ({
    title: course.title,
    description: course.category, // 使用 category 作為 description
    color: 'blue' as const,
    available: true
  }));

  const adaptedLatestNews = {
    ...latestNews,
    date: '2024年1月',
    details: [
      { icon: 'star', text: latestNews.features[0] },
      { icon: 'clock', text: latestNews.features[1] },
      { icon: 'user', text: latestNews.features[2] }
    ],
    note: latestNews.ctaText
  };

  const adaptedPricingInfo = {
    ...pricingInfo,
    series: '免費版',
    enterprise: '聯繫我們'
  };

  const adaptedCourseFeatures = courseFeatures.map(feature => ({
    ...feature,
    highlight: feature.description
  }));

  const adaptedTargetAudience = {
    ...targetAudience,
    description: targetAudience.subtitle,
    audiences: targetAudience.groups
  };

  return (
    <CourseOutline
      courseInfo={chatGPTCourseData.courseInfo}
      courseStats={courseStats}
      courseInfoTags={adaptedCourseInfoTags}
      availableCourses={adaptedAvailableCourses}
      latestNews={adaptedLatestNews}
      pricingInfo={adaptedPricingInfo}
      courseFeatures={adaptedCourseFeatures}
      faqData={chatGPTCourseData.faqData}
      targetAudience={adaptedTargetAudience}
      courseModules={adaptedCourseModules}
      isFree={chatGPTCourseData.isFree}
      onStartLearning={handleStartLearning}
      onWhatsApp={handleContactWhatsApp}
      learningPathExtended={true}
      showRelatedBlog={true}
    />
  );
};

export default ChatGPTCompleteCourseOutline; 