/**
 * AI Business Automation Course Outline Page
 * @fileoverview 使用 CourseOutlineTemplate 構建的 AI 商業自動化課程頁面
 * @author AI Formula Team
 * @version 3.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseOutlineTemplate from '@/components/templates/CourseOutlineTemplate';
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
  Globe
} from 'lucide-react';

const AIBusinessAutomationOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // Step 1: 定義課程基本信息
  const courseInfo = {
    badge: isZhHK ? "免費課程總覽" : "Free Course Preview",
    title: isZhHK ? "AI 商業自動化實戰課程" : "AI Business Automation Practice Course",
    subtitle: isZhHK ? "掌握實用的 AI 自動化技術，透過智能自動化解決方案轉型您的業務營運並推動增長。" : "Master practical AI automation techniques to transform your business operations and drive growth through intelligent automation solutions.",
    instructor: "Kenneth Wong",
    instructorTitle: isZhHK ? "AI 自動化專家" : "AI Automation Expert"
  };

  // Step 2: 定義課程統計
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      label: isZhHK ? "課程總長度" : "Course Duration",
      value: isZhHK ? "4.2 小時綜合培訓" : "4.2 Hours Comprehensive Training"
    },
    {
      icon: <Monitor className="w-6 h-6 text-green-400" />,
      label: isZhHK ? "學習模式" : "Learning Mode",
      value: isZhHK ? "線上自學" : "Online Self-Study"
    },
    {
      icon: <Users className="w-6 h-6 text-green-400" />,
      label: isZhHK ? "語言" : "Language",
      value: isZhHK ? "繁體中文" : "Traditional Chinese"
    }
  ];

  // Step 3: 定義課程信息標籤
  const courseInfoTags = [
    { 
      name: isZhHK ? "學習安排" : "Learning Schedule", 
      icon: <BookOpen className="w-4 h-4" />, 
      status: 'available' as const 
    },
    { 
      name: isZhHK ? "課程特色" : "Course Features", 
      icon: <Star className="w-4 h-4" />, 
      status: 'featured' as const 
    },
    { 
      name: isZhHK ? "永久觀看權限" : "Lifetime Access", 
      icon: <Shield className="w-4 h-4" />, 
      status: 'available' as const 
    },
    { 
      name: isZhHK ? "業界最新工具" : "Latest Industry Tools", 
      icon: <Rocket className="w-4 h-4" />, 
      status: 'featured' as const 
    },
    { 
      name: isZhHK ? "完成證書頒發" : "Completion Certificate", 
      icon: <Award className="w-4 h-4" />, 
      status: 'available' as const 
    }
  ];

  // Step 4: 定義可選課程
  const availableCourses = [
    {
      title: isZhHK ? "快捷上手" : "Quick Start",
      description: isZhHK ? "30分鐘學會基本概念" : "Learn basic concepts in 30 minutes",
      color: "green" as const,
      available: true
    },
    {
      title: isZhHK ? "實際應用" : "Practical Application", 
      description: isZhHK ? "學習如何應用到工作中" : "Learn how to apply to work",
      color: "green" as const,
      available: true
    }
  ];

  // Step 5: 定義最新消息
  const latestNews = {
    date: isZhHK ? "2024年12月" : "December 2024",
    title: isZhHK ? "需要更複雜的課程？" : "Need More Advanced Courses?",
    details: [
      { 
        icon: "💼", 
        text: isZhHK ? "我們提供企業專屬的 AI 自動化顧問服務" : "We provide enterprise AI automation consulting" 
      },
      { 
        icon: "📞", 
        text: isZhHK ? "一對一專業諮詢，為您量身定制解決方案" : "One-on-one professional consultation" 
      },
      { 
        icon: "🚀", 
        text: isZhHK ? "實際案例分析與實作指導" : "Real case analysis and hands-on guidance" 
      },
      { 
        icon: "📋", 
        text: isZhHK ? "完整的自動化系統建置" : "Complete automation system setup" 
      },
      { 
        icon: "🎯", 
        text: isZhHK ? "ROI 評估與效益分析" : "ROI assessment and benefit analysis" 
      }
    ],
    note: isZhHK ? "或者咨詢我們的 →" : "Or consult our experts →"
  };

  // Step 6: 定義價格信息
  const pricingInfo = {
    series: isZhHK ? "免費" : "Free",
    price: isZhHK ? "HK$4,990" : "HK$4,990",
    originalPrice: "",
    aiInOne: isZhHK ? "完全免費" : "Completely Free",
    studentPrice: "",
    enterprise: isZhHK ? "企業培訓服務請聯繫我們" : "Contact us for enterprise training"
  };

  // Step 7: 定義免費課程價值
  const courseFeatures = [
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "快捷上手" : "Quick Start",
      description: isZhHK ? "30分鐘學會基本概念" : "Learn basics in 30 minutes",
      highlight: isZhHK ? "立即開始" : "Start Now"
    },
    {
      icon: <Target className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "實際應用" : "Practical Application",
      description: isZhHK ? "學習如何應用到工作中" : "Learn work applications",
      highlight: isZhHK ? "真實案例" : "Real Cases"
    },
    {
      icon: <Heart className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "社群支持" : "Community Support",
      description: isZhHK ? "加入學員社群獲得支援" : "Join student community",
      highlight: isZhHK ? "終身支援" : "Lifetime Support"
    }
  ];

  // Step 8: 定義FAQ
  const faqData = [
    {
      question: isZhHK ? "這個課程真的免費嗎？" : "Is this course really free?",
      answer: isZhHK ? "是的！這是我們為初學者提供的完全免費入門課程，沒有任何隱藏費用。" : "Yes! This is a completely free introductory course for beginners with no hidden fees."
    },
    {
      question: isZhHK ? "我需要有程式設計基礎嗎？" : "Do I need programming background?",
      answer: isZhHK ? "不需要！本課程專為業務人員設計，重點在於如何使用現有工具來自動化工作流程。" : "No! This course is designed for business professionals focusing on using existing tools."
    },
    {
      question: isZhHK ? "完成課程後我會得到什麼？" : "What will I get after completing the course?",
      answer: isZhHK ? "您將獲得結業證書，並掌握基本的 AI 自動化概念，能夠識別並應用簡單的自動化解決方案。" : "You'll receive a completion certificate and master basic AI automation concepts."
    },
    {
      question: isZhHK ? "如果我想要更深入的學習怎麼辦？" : "What if I want more advanced learning?",
      answer: isZhHK ? "我們提供進階的付費課程和企業顧問服務，您可以透過 WhatsApp 聯繫我們了解更多詳情。" : "We offer advanced paid courses and enterprise consulting services."
    }
  ];

  // Step 9: 定義目標受眾
  const targetAudience = {
    title: isZhHK ? "適合對象" : "Target Audience",
    description: isZhHK ? "本課程專為以下人群設計" : "This course is designed for",
    audiences: [
      {
        icon: <Users className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "企業主管" : "Business Executives",
        description: isZhHK ? "想要了解 AI 自動化如何提升業務效率" : "Want to understand how AI automation improves efficiency"
      },
      {
        icon: <Brain className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "中小企業老闆" : "SME Owners",
        description: isZhHK ? "尋求降低成本、提高競爭力的解決方案" : "Seeking cost reduction and competitive advantage"
      },
      {
        icon: <Rocket className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "職場工作者" : "Working Professionals",
        description: isZhHK ? "希望學習新技能、提升個人價值" : "Want to learn new skills and enhance personal value"
      }
    ]
  };

  // Step 10: 定義回調函數
  const handleStartLearning = () => {
    navigate('/courses/ai-business-automation/learning');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/85293816674', '_blank');
  };

  // Step 11: 渲染模板
  return (
    <CourseOutlineTemplate
      courseInfo={courseInfo}
      courseStats={courseStats}
      courseInfoTags={courseInfoTags}
      availableCourses={availableCourses}
      latestNews={latestNews}
      pricingInfo={pricingInfo}
      courseFeatures={courseFeatures}
      faqData={faqData}
      targetAudience={targetAudience}
      onStartLearning={handleStartLearning}
      onWhatsApp={handleWhatsApp}
    />
  );
};

export default AIBusinessAutomationOutline; 