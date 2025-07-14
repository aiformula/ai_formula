import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CourseOutlineTemplate } from '@/components/templates';
import { 
  Clock, 
  Monitor, 
  Repeat, 
  Brain, 
  Target, 
  Lightbulb,
  Code,
  Database,
  Smartphone,
  Heart,
  Shield,
  Star,
  TrendingUp,
  BookOpen,
  Search,
  Users,
  Globe,
  Award
} from 'lucide-react';

const PromptEngineeringOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // 課程基本信息
  const courseInfo = {
    badge: isZhTW ? "AI 主題班" : "AI Master Class",
    title: isZhTW ? "『AI 主題班』3小時 手把手教你一步步做出『真正用得』手機 AI App！" : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
    subtitle: isZhTW ? "3小時完成兩個手機 App，含登入+雲端資料庫+AI功能！《AI App MVP 實戰班》由零開始，手把手教你建構前中後台，讓你帶走歷練硬編碼與模版。" : "Complete 2 mobile apps in 3 hours, including login + cloud database + AI features! 'AI App MVP Bootcamp' from zero to hero, step-by-step guidance to build frontend, middleware, and backend.",
    instructor: "Kenneth | AI 提示工程專家",
    instructorTitle: isZhTW ? "最貴導師" : "Premium Instructor"
  };

  // 課程統計
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "3小時" : "3 Hours"
    },
    {
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "課程數量" : "Course Modules",
      value: isZhTW ? "1個" : "1 Module"
    },
    {
      icon: <Repeat className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "一次報名，可重複參與實體課程＋永久線上重溫" : "One registration, unlimited physical + online access"
    }
  ];

  // 課程資訊標籤
  const courseInfoTags = [
    { name: isZhTW ? "初學者友善" : "Beginner Friendly", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "中文授課" : "Chinese Instruction", icon: <Globe className="w-4 h-4 text-blue-400" />, status: 'available' as const },
    { name: isZhTW ? "實戰練習" : "Hands-on Practice", icon: <Target className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "小班教學" : "Small Class", icon: <Users className="w-4 h-4 text-purple-400" />, status: 'featured' as const },
    { name: isZhTW ? "線上直播" : "Live Online", icon: <Monitor className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "終身回看" : "Lifetime Access", icon: <Repeat className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "證書頒發" : "Certificate", icon: <Award className="w-4 h-4 text-cyan-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "AI助手支援" : "AI Assistant", icon: <Brain className="w-4 h-4 text-indigo-400" />, status: 'available' as const },
    { name: isZhTW ? "社群支援" : "Community Support", icon: <Heart className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // 可選課程
  const availableCourses = [
    {
      title: isZhTW ? "『編程基礎班』4小時 零基礎學會『真正實用』的程式設計！" : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
      description: isZhTW ? "零基礎學會程式設計的完整課程" : "Complete course for learning programming from zero",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "『Perplexity 工具班』3小時 成為AI搜尋研究『超級專家』！" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
      description: isZhTW ? "掌握AI搜尋工具的專業技能" : "Master professional skills of AI search tools",
      color: "orange" as const,
      available: true
    }
  ];

  // 最新消息
  const latestNews = {
    date: "2025年7月10日",
    title: isZhTW ? "8月24日現場開班，限時報名優惠中" : "August 24th Live Class, Limited Time Registration Offer",
    details: [
      { icon: "📅", text: isZhTW ? "日期：2025年8月24日 (星期日)" : "Date: August 24, 2025 (Sunday)" },
      { icon: "🕐", text: isZhTW ? "時間：下午 2:30 - 5:30 (3小時)" : "Time: 2:30 PM - 5:30 PM (3 hours)" },
      { icon: "🎯", text: isZhTW ? "實體教學+線上同步 (報端)" : "Physical + Online Sync (Registration)" },
      { icon: "👥", text: isZhTW ? "小班實作教學｜僅限 15 位" : "Small Class Hands-on Teaching | Limited to 15 seats" },
      { icon: "✅", text: isZhTW ? "導師即場指導，親手完成 App 成品" : "Instructor guidance, hands-on App completion" },
      { icon: "🎁", text: isZhTW ? "早鳥優惠價：$4,500 (原價 $5,350)" : "Early Bird Price: $4,500 (Original $5,350)" }
    ],
    note: isZhTW ? "名額有限，報名即止" : "Limited seats, register now"
  };

  // 價格信息
  const pricingInfo = {
    series: isZhTW ? "全系列優惠價" : "Full Series Special Price",
    price: "$4,500",
    originalPrice: "$5,250",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$3,500",
    enterprise: isZhTW ? "我們亦提供企業培訓服務" : "We also provide enterprise training services"
  };

  // 課程特色
  const courseFeatures = [
    {
      icon: <Brain className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "智慧提示設計" : "Smart Prompt Design",
      description: isZhTW ? "學會設計精確的AI提示，讓AI輸出更符合需求" : "Learn to design precise AI prompts for better outputs",
      highlight: isZhTW ? "提示優化" : "Prompt Optimization"
    },
    {
      icon: <Target className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "場景化應用" : "Scenario-based Applications",
      description: isZhTW ? "涵蓋商業、創意、技術等多種實際應用場景" : "Covering business, creative, and technical application scenarios",
      highlight: isZhTW ? "實戰導向" : "Practical Focus"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto" />,
      title: isZhTW ? "創意突破" : "Creative Breakthroughs",
      description: isZhTW ? "掌握激發AI創意潛能的提示技巧" : "Master prompt techniques to unlock AI's creative potential",
      highlight: isZhTW ? "創新思維" : "Innovative Thinking"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "效率提升" : "Efficiency Enhancement",
      description: isZhTW ? "學習快速迭代和優化提示的方法" : "Learn methods for rapid iteration and prompt optimization",
      highlight: isZhTW ? "快速迭代" : "Rapid Iteration"
    }
  ];

  // 目標學員
  const targetAudience = {
    title: isZhTW ? "哪些人適合學習這門課程？" : "Who Should Take This Course?",
    description: isZhTW ? "無論你是AI新手還是有經驗的用戶，這門課程都能幫助你掌握提示工程的核心技能，提升AI使用效率。" : "Whether you're an AI beginner or experienced user, this course will help you master prompt engineering skills and improve AI usage efficiency.",
    audiences: [
      {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "AI工具使用者" : "AI Tool Users",
        description: isZhTW ? "希望更有效地使用ChatGPT、Claude等AI工具的用戶" : "Users who want to use ChatGPT, Claude and other AI tools more effectively"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "創意工作者" : "Creative Workers",
        description: isZhTW ? "設計師、作家、營銷人員等需要創意輸出的專業人士" : "Designers, writers, marketers and other professionals who need creative output"
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "商業專業人士" : "Business Professionals",
        description: isZhTW ? "企業管理者、分析師、顧問等需要提升工作效率的人士" : "Business managers, analysts, consultants who need to improve work efficiency"
      },
      {
        icon: <Code className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "技術開發者" : "Technical Developers",
        description: isZhTW ? "程式設計師、產品經理等需要整合AI能力的技術人員" : "Programmers, product managers who need to integrate AI capabilities"
      }
    ]
  };

  // FAQ數據
  const faqData = [
    {
      question: isZhTW ? "這門課程適合完全沒有AI經驗的人嗎？" : "Is this course suitable for people with no AI experience?",
      answer: isZhTW ? "絕對適合！我們從基礎概念開始，循序漸進地介紹提示工程的核心技能。無論你是否有技術背景，都能輕鬆跟上課程內容。" : "Absolutely! We start with basic concepts and gradually introduce core prompt engineering skills. Whether you have a technical background or not, you can easily follow the course content."
    },
    {
      question: isZhTW ? "完成課程後我能獲得什麼能力？" : "What abilities will I gain after completing the course?",
      answer: isZhTW ? "你將掌握設計有效提示的技巧，能夠讓AI產生更精準的回應，提升工作效率，並能應用到各種實際場景中。" : "You'll master effective prompt design techniques, enabling AI to generate more precise responses, improve work efficiency, and apply these skills to various real-world scenarios."
    },
    {
      question: isZhTW ? "這門課程與其他AI課程有什麼不同？" : "What makes this course different from other AI courses?",
      answer: isZhTW ? "我們專注於提示工程這一核心技能，提供實戰化的訓練方法，讓你能立即應用所學知識到實際工作中。" : "We focus on prompt engineering as a core skill, providing practical training methods that allow you to immediately apply what you learn to actual work."
    },
    {
      question: isZhTW ? "課程是否包含實際練習？" : "Does the course include practical exercises?",
      answer: isZhTW ? "是的！課程包含大量實戰練習，涵蓋不同行業和應用場景，讓你在做中學，真正掌握提示工程技能。" : "Yes! The course includes extensive practical exercises covering different industries and application scenarios, allowing you to learn by doing and truly master prompt engineering skills."
    }
  ];

  // 回調函數
  const handleStartLearning = () => {
    navigate('/courses/prompt-engineering-learning');
  };

  const handleRegister = () => {
    // 導航到課程報名頁面
    navigate('/courses/registration', {
      state: {
        courseTitle: courseInfo.title,
        coursePrice: pricingInfo.price,
        courseId: 'prompt-engineering'
      }
    });
  };

  const handleWhatsApp = () => {
    // 打開WhatsApp聯絡
    window.open('https://wa.me/85298765432?text=我想了解Prompt Engineering課程', '_blank');
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
      onRegister={handleRegister}
      onWhatsApp={handleWhatsApp}
    />
  );
};

export default PromptEngineeringOutline; 