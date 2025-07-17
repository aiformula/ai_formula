/**
 * ChatGPT Complete Course Outline Page
 * @fileoverview 使用 CourseOutlineTemplate 構建的 ChatGPT 完整教學實戰課程頁面
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
  Globe,
  MessageSquare,
  Edit3,
  FileText,
  Briefcase
} from 'lucide-react';

const ChatGPTCompleteCourseOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // Step 1: 定義課程基本信息
  const courseInfo = {
    badge: isZhHK ? "免費課程總覽" : "Free Course Preview",
    title: isZhHK ? "ChatGPT 完整教學實戰" : "ChatGPT Complete Practical Course",
    subtitle: isZhHK ? "掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。" : "Master the complete application of ChatGPT, from daily office work to creative projects, comprehensively enhancing your digital capabilities.",
    instructor: "AI Formula Team",
    instructorTitle: isZhHK ? "AI 溝通專家與提示工程師" : "AI Communication Expert & Prompt Engineer"
  };

  // Step 2: 定義課程統計
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      label: isZhHK ? "課程總長度" : "Course Duration",
      value: isZhHK ? "4 小時綜合培訓" : "4 Hours Comprehensive Training"
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
      name: isZhHK ? "提示工程技術" : "Prompt Engineering", 
      icon: <Edit3 className="w-4 h-4" />, 
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
      description: isZhHK ? "30分鐘學會基本對話技巧" : "Learn basic conversation skills in 30 minutes",
      color: "green" as const,
      available: true
    },
    {
      title: isZhHK ? "實際應用" : "Practical Application", 
      description: isZhHK ? "學習如何應用到日常工作" : "Learn how to apply to daily work",
      color: "green" as const,
      available: true
    }
  ];

  // Step 5: 定義最新消息
  const latestNews = {
    date: isZhHK ? "2024年12月" : "December 2024",
    title: isZhHK ? "需要更進階的 AI 技能？" : "Need More Advanced AI Skills?",
    details: [
      { 
        icon: "🤖", 
        text: isZhHK ? "我們提供企業專屬的 ChatGPT 應用顧問服務" : "We provide enterprise ChatGPT application consulting" 
      },
      { 
        icon: "📞", 
        text: isZhHK ? "一對一專業諮詢，提升您的 AI 溝通技能" : "One-on-one professional consultation for AI communication skills" 
      },
      { 
        icon: "🚀", 
        text: isZhHK ? "實際案例分析與提示工程指導" : "Real case analysis and prompt engineering guidance" 
      },
      { 
        icon: "📋", 
        text: isZhHK ? "完整的 ChatGPT 工作流程建置" : "Complete ChatGPT workflow setup" 
      },
      { 
        icon: "🎯", 
        text: isZhHK ? "效率提升評估與應用分析" : "Efficiency improvement assessment and application analysis" 
      }
    ],
    note: isZhHK ? "或者咨詢我們的 →" : "Or consult our experts →"
  };

  // Step 6: 定義價格信息
  const pricingInfo = {
    series: isZhHK ? "免費課程" : "Free Course",
    price: isZhHK ? "免費" : "Free",
    originalPrice: "", // 免費課程不顯示原價
    aiInOne: isZhHK ? "完全免費" : "Completely Free",
    studentPrice: "",
    enterprise: isZhHK ? "企業培訓服務請聯繫我們" : "Contact us for enterprise training"
  };

  // Step 7: 定義免費課程價值
  const courseFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "對話技巧" : "Conversation Skills",
      description: isZhHK ? "掌握有效的 ChatGPT 對話方法" : "Master effective ChatGPT conversation methods",
      highlight: isZhHK ? "立即學習" : "Learn Now"
    },
    {
      icon: <FileText className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "提示工程" : "Prompt Engineering",
      description: isZhHK ? "學習撰寫高效的提示指令" : "Learn to write effective prompts",
      highlight: isZhHK ? "實用技巧" : "Practical Tips"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "商業應用" : "Business Applications",
      description: isZhHK ? "將 ChatGPT 應用到工作場景" : "Apply ChatGPT to work scenarios",
      highlight: isZhHK ? "真實案例" : "Real Cases"
    }
  ];

  // Step 8: 定義FAQ
  const faqData = [
    {
      question: isZhHK ? "這個 ChatGPT 課程真的免費嗎？" : "Is this ChatGPT course really free?",
      answer: isZhHK ? "是的！這是我們為初學者提供的完全免費入門課程，讓您掌握 ChatGPT 的基本使用方法。" : "Yes! This is a completely free introductory course for beginners to master basic ChatGPT usage."
    },
    {
      question: isZhHK ? "我需要有技術背景嗎？" : "Do I need technical background?",
      answer: isZhHK ? "不需要！本課程專為一般用戶設計，重點在於如何有效使用 ChatGPT 提升工作效率。" : "No! This course is designed for general users, focusing on effective ChatGPT usage for productivity."
    },
    {
      question: isZhHK ? "完成課程後我能做什麼？" : "What can I do after completing the course?",
      answer: isZhHK ? "您將能夠熟練使用 ChatGPT 進行寫作、分析、創意發想等各種任務，大幅提升工作效率。" : "You'll be able to use ChatGPT proficiently for writing, analysis, creative thinking and various tasks."
    },
    {
      question: isZhHK ? "如果我想要更深入的 AI 學習怎麼辦？" : "What if I want more advanced AI learning?",
      answer: isZhHK ? "我們提供進階的 AI 應用課程和企業顧問服務，您可以透過 WhatsApp 聯繫我們了解更多。" : "We offer advanced AI application courses and enterprise consulting services."
    }
  ];

  // Step 9: 定義目標受眾
  const targetAudience = {
    title: isZhHK ? "適合對象" : "Target Audience",
    description: isZhHK ? "本課程專為以下人群設計" : "This course is designed for",
    audiences: [
      {
        icon: <Briefcase className="w-6 h-6 text-blue-400" />,
        title: isZhHK ? "職場工作者" : "Working Professionals",
        description: isZhHK ? "想要提升工作效率的上班族" : "Office workers wanting to improve productivity"
      },
      {
        icon: <Edit3 className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "內容創作者" : "Content Creators",
        description: isZhHK ? "需要創意發想和寫作協助的創作者" : "Creators needing creative inspiration and writing assistance"
      },
      {
        icon: <Users className="w-6 h-6 text-purple-400" />,
        title: isZhHK ? "學生群體" : "Students",
        description: isZhHK ? "想要學習 AI 工具的學生" : "Students wanting to learn AI tools"
      },
      {
        icon: <Target className="w-6 h-6 text-orange-400" />,
        title: isZhHK ? "AI 初學者" : "AI Beginners",
        description: isZhHK ? "對 AI 工具感興趣的初學者" : "Beginners interested in AI tools"
      }
    ]
  };

  // Step 10: 定義課程模組
  const courseModules = [
    {
      id: 1,
      title: isZhHK ? "ChatGPT 基礎入門" : "ChatGPT Fundamentals",
      description: isZhHK ? "瞭解 ChatGPT 基本概念與註冊使用" : "Understanding ChatGPT basics and getting started",
      duration: isZhHK ? "45分鐘" : "45 minutes",
      lessons: 3,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "什麼是 ChatGPT" : "What is ChatGPT",
        isZhHK ? "如何註冊與設定" : "How to register and set up",
        isZhHK ? "基本介面操作" : "Basic interface operation"
      ]
    },
    {
      id: 2,
      title: isZhHK ? "高效 Prompt 實戰手冊" : "Efficient Prompt Practical Manual",
      description: isZhHK ? "掌握 Prompt 工程技巧，提升回答質量" : "Master prompt engineering techniques for better responses",
      duration: isZhHK ? "60分鐘" : "60 minutes",
      lessons: 4,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "提示詞基本原則" : "Basic prompt principles",
        isZhHK ? "角色設定技巧" : "Role-setting techniques",
        isZhHK ? "情境描述方法" : "Context description methods",
        isZhHK ? "結果優化策略" : "Result optimization strategies"
      ]
    },
    {
      id: 3,
      title: isZhHK ? "AI 工具整合指南" : "AI Tools Integration Guide",
      description: isZhHK ? "學習與其他 AI 工具的協同使用" : "Learn to integrate with other AI tools",
      duration: isZhHK ? "50分鐘" : "50 minutes",
      lessons: 3,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "常用 AI 工具介紹" : "Introduction to common AI tools",
        isZhHK ? "工具間的協作流程" : "Collaborative processes between tools",
        isZhHK ? "效率提升實例" : "Efficiency improvement examples"
      ]
    },
    {
      id: 4,
      title: isZhHK ? "商業應用實例" : "Business Application Cases",
      description: isZhHK ? "真實商業場景的 ChatGPT 應用" : "Real business scenarios using ChatGPT",
      duration: isZhHK ? "65分鐘" : "65 minutes",
      lessons: 4,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "郵件撰寫自動化" : "Email writing automation",
        isZhHK ? "市場分析報告" : "Market analysis reports",
        isZhHK ? "客戶服務應用" : "Customer service applications",
        isZhHK ? "會議記錄整理" : "Meeting notes organization"
      ]
    },
    {
      id: 5,
      title: isZhHK ? "創意專案開發" : "Creative Project Development",
      description: isZhHK ? "使用 ChatGPT 進行創意內容創作" : "Creative content creation with ChatGPT",
      duration: isZhHK ? "55分鐘" : "55 minutes",
      lessons: 3,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "創意發想技巧" : "Creative brainstorming techniques",
        isZhHK ? "內容創作流程" : "Content creation process",
        isZhHK ? "多媒體整合應用" : "Multimedia integration applications"
      ]
    },
    {
      id: 6,
      title: isZhHK ? "進階技巧與優化" : "Advanced Techniques & Optimization",
      description: isZhHK ? "高級使用技巧與效率優化策略" : "Advanced usage tips and efficiency optimization",
      duration: isZhHK ? "45分鐘" : "45 minutes",
      lessons: 3,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "進階提示技巧" : "Advanced prompt techniques",
        isZhHK ? "自動化工作流程" : "Automated workflows",
        isZhHK ? "持續學習策略" : "Continuous learning strategies"
      ]
    }
  ];

  const handleStartLearning = () => {
    navigate('/courses/chatgpt-complete-course/learning');
  };

  const handleContactWhatsApp = () => {
    const message = '我想報名參加 ChatGPT 完整教學實戰課程';
    window.open(`https://wa.me/85298765432?text=${encodeURIComponent(message)}`, '_blank');
  };

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
      onContactWhatsApp={handleContactWhatsApp}
    />
  );
};

export default ChatGPTCompleteCourseOutline; 