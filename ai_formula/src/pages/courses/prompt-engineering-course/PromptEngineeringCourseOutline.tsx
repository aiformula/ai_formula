import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseOutline from '@/features/course/CourseOutline';
import { Tag } from 'lucide-react';
import { promptEngineeringCourseData } from '@/data/prompt-engineering-course-data';
import { 
  Brain, 
  Users, 
  Target, 
  TrendingUp,
  UserCheck,
  Briefcase,
  BookOpen,
  Lightbulb,
  Zap,
  MessageSquare,
  Code,
  Clock,
  GraduationCap,
  Rocket
} from 'lucide-react';

const PromptEngineeringCourseOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 處理開始學習
  const handleStartLearning = () => {
    navigate('/courses/prompt-engineering-course/learning');
  };

  // 處理WhatsApp聯繫
  const handleContactWhatsApp = () => {
    const message = isZhHK 
      ? '我想了解更多關於提示工程課程的信息' 
      : 'I want to learn more about the Prompt Engineering Course';
    window.open(`https://wa.me/85293816674?text=${encodeURIComponent(message)}`, '_blank');
  };

  // 將課程模塊數據轉換為CourseOutline期望的格式
  const adaptedCourseModules = promptEngineeringCourseData.courseModules.map(module => ({
    ...module,
    lessons: module.lessons.map(lesson => ({
      id: lesson.id,
      title: isZhHK ? lesson.title : lesson.titleEn,
      duration: isZhHK ? lesson.duration : lesson.durationEn,
      type: 'reading' as const,
      isPreview: lesson.id <= 2
    }))
  }));

  // 適配 courseInfo 以匹配 CourseOutline 期望的格式
  const adaptedCourseInfo = {
    badge: isZhHK ? promptEngineeringCourseData.courseInfo.badge : promptEngineeringCourseData.courseInfo.badgeEn,
    title: isZhHK ? promptEngineeringCourseData.courseInfo.title : promptEngineeringCourseData.courseInfo.titleEn,
    subtitle: isZhHK ? promptEngineeringCourseData.courseInfo.subtitle : promptEngineeringCourseData.courseInfo.subtitleEn,
    description: isZhHK ? promptEngineeringCourseData.courseInfo.description : promptEngineeringCourseData.courseInfo.descriptionEn,
    instructor: isZhHK ? promptEngineeringCourseData.courseInfo.instructor : promptEngineeringCourseData.courseInfo.instructorEn,
    instructorTitle: isZhHK ? promptEngineeringCourseData.courseInfo.instructorTitle : promptEngineeringCourseData.courseInfo.instructorTitleEn,
    rating: 4.9,
    students: promptEngineeringCourseData.courseInfo.students,
    duration: isZhHK ? promptEngineeringCourseData.courseInfo.duration : promptEngineeringCourseData.courseInfo.durationEn
  };

  // 課程特色
  const courseFeatures = [
    {
      icon: React.createElement(Brain, { className: "w-8 h-8", style: { color: "#9E768F" } }),
      title: isZhHK ? "系統化提示框架" : "Systematic Prompt Frameworks",
      description: isZhHK ? "掌握 RTF、TAG、BAB 等經過驗證的提示工程框架" : "Master proven prompt engineering frameworks like RTF, TAG, BAB",
      highlight: isZhHK ? "掌握 RTF、TAG、BAB 等經過驗證的提示工程框架" : "Master proven prompt engineering frameworks like RTF, TAG, BAB"
    },
    {
      icon: React.createElement(MessageSquare, { className: "w-8 h-8", style: { color: "#9FA4C4" } }),
      title: isZhHK ? "實戰技巧演練" : "Practical Skills Training",
      description: isZhHK ? "從零樣本到少樣本，涵蓋所有核心提示技術" : "From zero-shot to few-shot, covering all core prompting techniques",
      highlight: isZhHK ? "從零樣本到少樣本，涵蓋所有核心提示技術" : "From zero-shot to few-shot, covering all core prompting techniques"
    },
    {
      icon: React.createElement(Target, { className: "w-8 h-8", style: { color: "#9E768F" } }),
      title: isZhHK ? "進階策略揭秘" : "Advanced Strategies Revealed",
      description: isZhHK ? "思維鏈、自我一致性等前沿提示工程技術" : "Cutting-edge techniques like Chain-of-Thought, Self-Consistency",
      highlight: isZhHK ? "思維鏈、自我一致性等前沿提示工程技術" : "Cutting-edge techniques like Chain-of-Thought, Self-Consistency"
    },
    {
      icon: React.createElement(Rocket, { className: "w-8 h-8", style: { color: "#9FA4C4" } }),
      title: isZhHK ? "實際應用案例" : "Real-world Applications",
      description: isZhHK ? "涵蓋內容創作、數據分析、客戶服務等多個領域" : "Covers content creation, data analysis, customer service and more",
      highlight: isZhHK ? "涵蓋內容創作、數據分析、客戶服務等多個領域" : "Covers content creation, data analysis, customer service and more"
    }
  ];

  // 目標受眾
  const targetAudience = {
    title: isZhHK ? "適合學習對象" : "Target Audience",
    subtitle: isZhHK ? "無論您是 AI 新手還是想要深化提示技能的專業人士，這門課程都能為您提供價值" : "Whether you're an AI beginner or a professional looking to deepen your prompting skills, this course provides value",
    description: isZhHK ? "無論您是 AI 新手還是想要深化提示技能的專業人士，這門課程都能為您提供價值" : "Whether you're an AI beginner or a professional looking to deepen your prompting skills, this course provides value",
    audiences: [
      {
        icon: React.createElement(UserCheck, { className: "w-8 h-8", style: { color: "#9E768F" } }),
        title: isZhHK ? "商業專業人士" : "Business Professionals",
        description: isZhHK ? "希望運用 AI 提升工作效率，在職場中獲得競爭優勢的專業人士" : "Professionals hoping to use AI to improve work efficiency and gain competitive advantage"
      },
      {
        icon: React.createElement(Briefcase, { className: "w-8 h-8", style: { color: "#9FA4C4" } }),
        title: isZhHK ? "內容創作者" : "Content Creators",
        description: isZhHK ? "需要利用 AI 技術提升創作效率和質量的創作者和營銷人員" : "Creators and marketers who need to use AI technology to improve creation efficiency and quality"
      },
      {
        icon: React.createElement(BookOpen, { className: "w-8 h-8", style: { color: "#9E768F" } }),
        title: isZhHK ? "學生與研究者" : "Students & Researchers",
        description: isZhHK ? "對 AI 技術感興趣，希望深入了解提示工程的學生與研究人員" : "Students and researchers interested in AI technology and seeking deep understanding of prompt engineering"
      },
      {
        icon: React.createElement(Lightbulb, { className: "w-8 h-8", style: { color: "#9FA4C4" } }),
        title: isZhHK ? "開發者與技術專家" : "Developers & Tech Experts",
        description: isZhHK ? "希望將提示工程整合到產品和服務中的技術專業人士" : "Tech professionals wanting to integrate prompt engineering into products and services"
      }
    ]
  };

  // 課程統計（統一圖示風格）
  const accent = '#9E768F';
  const courseStats = [
    {
      icon: React.createElement(BookOpen, { className: 'w-6 h-6', style: { color: accent } }),
      label: isZhHK ? '模組' : 'Modules',
      value: promptEngineeringCourseData.courseModules.length.toString()
    },
    {
      icon: React.createElement(GraduationCap, { className: 'w-6 h-6', style: { color: accent } }),
      label: isZhHK ? '課程' : 'Lessons',
      value: promptEngineeringCourseData.courseInfo.totalLessons.toString()
    },
    {
      icon: React.createElement(Clock, { className: 'w-6 h-6', style: { color: accent } }),
      label: isZhHK ? '時長' : 'Duration',
      value: `${promptEngineeringCourseData.courseInfo.totalHours}+ ${isZhHK ? '小時' : 'hours'}`
    },
    {
      icon: React.createElement(TrendingUp, { className: 'w-6 h-6', style: { color: accent } }),
      label: isZhHK ? '難度' : 'Level',
      value: isZhHK ? '初級到進階' : 'Beginner to Advanced'
    }
  ];

  // 課程標籤（加入圖示與精簡說明，供「免費課程總覽」右側展示）
  const tagDescMapZh: Record<string, string> = {
    '提示工程': '核心技巧與系統級提示範本',
    'AI 溝通': '以結構化框架提升對答品質',
    '人工智能': '理解模型運作與注意事項',
    '實戰指南': '真實情境範例與落地教學'
  };
  const tagDescMapEn: Record<string, string> = {
    'Prompt Engineering': 'Core tactics with system‑level templates',
    'AI Communication': 'Structured frameworks for higher quality outputs',
    'Artificial Intelligence': 'Model mechanics and caveats',
    'Practical Guide': 'Real scenarios and hands‑on walkthroughs'
  };

  const courseInfoTags = (isZhHK ? promptEngineeringCourseData.courseInfo.tags : promptEngineeringCourseData.courseInfo.tagsEn).map((tag, index) => ({
    id: index,
    name: tag,
    icon: <Tag className="w-4 h-4 text-gray-400" />,
    description: (isZhHK ? tagDescMapZh[tag] : tagDescMapEn[tag]) || '',
    status: 'available' as const
  }));

  // 可選課程
  const availableCourses = [
    {
      title: isZhHK ? 'ChatGPT 完整課程' : 'Complete ChatGPT Course',
      description: isZhHK ? 'AI 應用' : 'AI Applications',
      color: 'blue' as const,
      available: true
    },
    {
      title: isZhHK ? 'Midjourney 課程' : 'Midjourney Course',
      description: isZhHK ? 'AI 藝術' : 'AI Art',
      color: 'purple' as const,
      available: true
    }
  ];

  // 最新消息
  const latestNews = {
    date: isZhHK ? '2024年12月' : 'December 2024',
    title: isZhHK ? '🎉 提示工程課程全新發布' : '🎉 Prompt Engineering Course Newly Released',
    details: [
      { icon: 'star', text: isZhHK ? '16個詳細課程單元' : '16 detailed lesson units' },
      { icon: 'clock', text: isZhHK ? '6+小時完整內容' : '6+ hours of complete content' },
      { icon: 'user', text: isZhHK ? '專業團隊製作' : 'Professional team production' }
    ],
    note: isZhHK ? '立即開始學習' : 'Start Learning Now'
  };

  // 定價信息
  const pricingInfo = {
    price: "HK$980",
    aiInOne: isZhHK ? "高階版權限" : "Advanced Access",
    series: isZhHK ? "高階版" : "Advanced",
    enterprise: isZhHK ? "聯繫我們了解更多" : "Contact us for more"
  };

  return (
    <CourseOutline
      courseInfo={adaptedCourseInfo}
      courseStats={courseStats}
      courseInfoTags={courseInfoTags}
      availableCourses={availableCourses}
      latestNews={latestNews}
      pricingInfo={pricingInfo}
      faqData={promptEngineeringCourseData.faqData}
      courseModules={adaptedCourseModules}
      isFree={false}
      onStartLearning={handleStartLearning}
      onWhatsApp={handleContactWhatsApp}
      learningPathExtended={true}
      showRelatedBlog={true}
      courseFeatures={courseFeatures}
      targetAudience={targetAudience}
    />
  );
};

export default PromptEngineeringCourseOutline; 