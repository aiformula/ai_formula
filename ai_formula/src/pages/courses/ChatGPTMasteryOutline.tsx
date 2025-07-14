import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CourseOutlineTemplate } from '@/components/templates';
import { 
  Clock, 
  MessageSquare, 
  Repeat, 
  Brain, 
  Target, 
  Lightbulb,
  Code,
  Database,
  Sparkles,
  Heart,
  Shield,
  Star,
  TrendingUp,
  BookOpen,
  Search,
  Users,
  Wand2,
  Cpu,
  Mic,
  Briefcase,
  Globe,
  Award
} from 'lucide-react';

const ChatGPTMasteryOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // 課程基本信息
  const courseInfo = {
    badge: isZhTW ? "ChatGPT 精通班" : "ChatGPT Mastery Class",
    title: isZhTW ? "『ChatGPT 精通班』5小時 掌握AI對話藝術成為『真正專家』！" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
    subtitle: isZhTW ? "5小時深度掌握ChatGPT，從對話新手到AI專家！涵蓋提示工程、創意寫作、商業應用、API整合，全方位提升你的AI運用能力，讓你成為職場AI達人。" : "Master ChatGPT in 5 hours, from conversation novice to AI expert! Covering prompt engineering, creative writing, business applications, API integration.",
    instructor: "David | AI 自動化專家",
    instructorTitle: isZhTW ? "資深導師" : "Senior Instructor"
  };

  // 課程統計
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "5小時" : "5 Hours"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "課程數量" : "Course Modules",
      value: isZhTW ? "4個" : "4 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "終身會員＋AI工具包＋專家社群" : "Lifetime membership + AI toolkit + expert community"
    }
  ];

  // 課程資訊標籤
  const courseInfoTags = [
    { name: isZhTW ? "零基礎可學" : "Zero Experience OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "雙語授課" : "Bilingual Teaching", icon: <Globe className="w-4 h-4 text-blue-400" />, status: 'available' as const },
    { name: isZhTW ? "創意寫作" : "Creative Writing", icon: <Wand2 className="w-4 h-4 text-purple-400" />, status: 'featured' as const },
    { name: isZhTW ? "商業應用" : "Business Applications", icon: <Briefcase className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "API整合" : "API Integration", icon: <Code className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "模板庫" : "Template Library", icon: <Database className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "專家認證" : "Expert Certification", icon: <Award className="w-4 h-4 text-indigo-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "進階功能" : "Advanced Features", icon: <Brain className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "持續更新" : "Continuous Updates", icon: <TrendingUp className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // 可選課程
  const availableCourses = [
    {
      title: isZhTW ? "『AI 主題班』3小時 手把手教你一步步做出『真正用得』手機 AI App！" : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "學習建構實用的AI手機應用程式" : "Learn to build practical AI mobile applications",
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
    date: "2025年7月15日",
    title: isZhTW ? "9月1日ChatGPT精通班開課，早鳥優惠進行中" : "September 1st ChatGPT Mastery Class, Early Bird Offer Available",
    details: [
      { icon: "📅", text: isZhTW ? "日期：2025年9月1日 (星期一)" : "Date: September 1, 2025 (Monday)" },
      { icon: "🕘", text: isZhTW ? "時間：上午 9:00 - 下午 2:00 (5小時)" : "Time: 9:00 AM - 2:00 PM (5 hours)" },
      { icon: "🎯", text: isZhTW ? "實體＋線上同步教學" : "Physical + Online Sync Teaching" },
      { icon: "👥", text: isZhTW ? "小班教學｜僅限 20 位" : "Small Class Teaching | Limited to 20 seats" },
      { icon: "✅", text: isZhTW ? "專家級提示工程技巧傳授" : "Expert-level prompt engineering techniques" },
      { icon: "🎁", text: isZhTW ? "早鳥價：$3,800 (原價 $4,500)" : "Early Bird Price: $3,800 (Original $4,500)" }
    ],
    note: isZhTW ? "名額有限，立即報名" : "Limited seats, register now"
  };

  // 價格信息
  const pricingInfo = {
    series: isZhTW ? "ChatGPT專精價" : "ChatGPT Specialty Price",
    price: "$3,800",
    originalPrice: "$4,500",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$2,800",
    enterprise: isZhTW ? "企業團體培訓另有優惠" : "Corporate group training discounts available"
  };

  // 課程特色
  const courseFeatures = [
    {
      icon: <MessageSquare className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "對話藝術精通" : "Conversation Art Mastery",
      description: isZhTW ? "掌握與AI進行高效對話的技巧和方法" : "Master techniques and methods for efficient AI conversations",
      highlight: isZhTW ? "對話技巧" : "Conversation Skills"
    },
    {
      icon: <Wand2 className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "創意寫作助手" : "Creative Writing Assistant",
      description: isZhTW ? "學會使用ChatGPT進行創意寫作和內容創作" : "Learn to use ChatGPT for creative writing and content creation",
      highlight: isZhTW ? "創意寫作" : "Creative Writing"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "商業應用實戰" : "Business Application Practice",
      description: isZhTW ? "將ChatGPT整合到日常商業工作流程中" : "Integrate ChatGPT into daily business workflows",
      highlight: isZhTW ? "商業整合" : "Business Integration"
    },
    {
      icon: <Code className="w-12 h-12 text-orange-400 mx-auto" />,
      title: isZhTW ? "API 高級應用" : "Advanced API Applications",
      description: isZhTW ? "學習ChatGPT API的高級使用技巧" : "Learn advanced ChatGPT API usage techniques",
      highlight: isZhTW ? "API整合" : "API Integration"
    }
  ];

  // 目標學員
  const targetAudience = {
    title: isZhTW ? "哪些人適合學習ChatGPT精通課程？" : "Who Should Take This ChatGPT Mastery Course?",
    description: isZhTW ? "無論你是初學者還是有經驗的用戶，本課程將幫助你從基礎到高級全面掌握ChatGPT，成為真正的AI對話專家。" : "Whether you're a beginner or experienced user, this course will help you master ChatGPT from basics to advanced levels, becoming a true AI conversation expert.",
    audiences: [
      {
        icon: <Sparkles className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "內容創作者" : "Content Creators",
        description: isZhTW ? "部落客、自媒體工作者、社群經營者等需要大量內容產出的創作者" : "Bloggers, social media workers, community managers who need massive content output"
      },
      {
        icon: <Briefcase className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "企業專業人士" : "Business Professionals",
        description: isZhTW ? "希望提升工作效率、自動化日常任務的企業員工和管理者" : "Business employees and managers who want to improve work efficiency and automate daily tasks"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "創意工作者" : "Creative Workers",
        description: isZhTW ? "設計師、廣告人、營銷專員等需要創意靈感和解決方案的專業人士" : "Designers, advertisers, marketing specialists who need creative inspiration and solutions"
      },
      {
        icon: <Users className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "學生與研究者" : "Students & Researchers",
        description: isZhTW ? "需要研究輔助、學習支援和知識整理的學生和研究人員" : "Students and researchers who need research assistance, learning support, and knowledge organization"
      }
    ]
  };

  // FAQ數據
  const faqData = [
    {
      question: isZhTW ? "我完全沒有使用過ChatGPT，能跟得上嗎？" : "I've never used ChatGPT before, can I keep up?",
      answer: isZhTW ? "當然可以！我們的課程從最基礎的概念開始，逐步引導你掌握ChatGPT的各種功能。即使是零基礎的學員也能順利學會。" : "Absolutely! Our course starts with the most basic concepts and gradually guides you to master various ChatGPT functions. Even zero-experience students can learn successfully."
    },
    {
      question: isZhTW ? "這個課程與免費使用ChatGPT有什麼不同？" : "How is this course different from using ChatGPT for free?",
      answer: isZhTW ? "我們不僅教你如何使用ChatGPT，更重要的是教你如何用得更好、更有效率。包括高級提示技巧、API整合、商業應用等深度內容。" : "We don't just teach you how to use ChatGPT, but more importantly, how to use it better and more efficiently. Including advanced prompting techniques, API integration, and business applications."
    },
    {
      question: isZhTW ? "完成課程後我能達到什麼水準？" : "What level can I achieve after completing the course?",
      answer: isZhTW ? "完成課程後，你將能夠熟練運用ChatGPT進行各種任務，包括創意寫作、商業分析、程式協助等，真正成為AI對話專家。" : "After completing the course, you'll be able to skillfully use ChatGPT for various tasks including creative writing, business analysis, programming assistance, truly becoming an AI conversation expert."
    },
    {
      question: isZhTW ? "課程是否涵蓋最新的ChatGPT功能？" : "Does the course cover the latest ChatGPT features?",
      answer: isZhTW ? "是的！我們持續更新課程內容，確保涵蓋ChatGPT的最新功能和最佳實踐，讓你始終掌握最前沿的AI技術。" : "Yes! We continuously update course content to ensure it covers the latest ChatGPT features and best practices, keeping you at the forefront of AI technology."
    }
  ];

  // 回調函數
  const handleStartLearning = () => {
    navigate('/courses/free-plan');
  };

  const handleRegister = () => {
    // 導航到課程學習頁面
    navigate('/courses/free-plan');
  };

  const handleWhatsApp = () => {
    // 打開WhatsApp聯絡
    window.open('https://wa.me/85298765432?text=我想了解ChatGPT Mastery課程', '_blank');
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

export default ChatGPTMasteryOutline; 