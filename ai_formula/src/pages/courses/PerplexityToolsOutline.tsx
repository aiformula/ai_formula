import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CourseOutlineTemplate } from '@/components/templates';
import { 
  Clock, 
  Search, 
  Repeat, 
  Brain, 
  Target, 
  Lightbulb,
  Code,
  Database,
  FileText,
  Heart,
  Shield,
  Star,
  TrendingUp,
  BookOpen,
  Users,
  BarChart3,
  Eye,
  Filter,
  ScanLine
} from 'lucide-react';

const PerplexityToolsOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // 課程基本信息
  const courseInfo = {
    badge: isZhTW ? "Perplexity 工具班" : "Perplexity Tools Class",
    title: isZhTW ? "『Perplexity 工具班』3小時 成為AI搜尋研究『超級專家』！" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
    subtitle: isZhTW ? "3小時精通Perplexity AI搜尋引擎，從搜尋小白到研究達人！掌握高級搜尋技巧、資料分析、學術研究、商業調查，讓你的搜尋效率提升1000%。" : "Master Perplexity AI search engine in 3 hours, from search novice to research expert! Master advanced search techniques, data analysis, academic research, business investigation.",
    instructor: "Jason | 專業開發與自動化專家",
    instructorTitle: isZhTW ? "專業導師" : "Professional Instructor"
  };

  // 課程統計
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "3小時" : "3 Hours"
    },
    {
      icon: <Search className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "課程數量" : "Course Modules",
      value: isZhTW ? "2個" : "2 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "Pro帳戶試用＋搜尋模板＋專家群組" : "Pro account trial + search templates + expert group"
    }
  ];

  // 課程資訊標籤
  const courseInfoTags = [
    { name: isZhTW ? "搜尋新手可學" : "Search Beginner OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "免費試用" : "Free Trial", icon: <Search className="w-4 h-4 text-blue-400" />, status: 'featured' as const },
    { name: isZhTW ? "學術研究" : "Academic Research", icon: <BookOpen className="w-4 h-4 text-purple-400" />, status: 'available' as const },
    { name: isZhTW ? "商業分析" : "Business Analysis", icon: <BarChart3 className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "搜尋模板" : "Search Templates", icon: <FileText className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "專家群組" : "Expert Group", icon: <Users className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "高級功能" : "Advanced Features", icon: <Filter className="w-4 h-4 text-indigo-400" />, status: 'available' as const },
    { name: isZhTW ? "實時更新" : "Real-time Updates", icon: <TrendingUp className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "AI洞察" : "AI Insights", icon: <Brain className="w-4 h-4 text-red-400" />, status: 'coming-soon' as const }
  ];

  // 可選課程
  const availableCourses = [
    {
      title: isZhTW ? "『ChatGPT 精通班』5小時 掌握AI對話藝術成為『真正專家』！" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
      description: isZhTW ? "深度掌握ChatGPT對話技巧和商業應用" : "Deep mastery of ChatGPT conversation skills and business applications",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "『AI 主題班』3小時 手把手教你一步步做出『真正用得』手機 AI App！" : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "學習建構實用的AI手機應用程式" : "Learn to build practical AI mobile applications",
      color: "orange" as const,
      available: true
    }
  ];

  // 最新消息
  const latestNews = {
    date: "2025年7月20日",
    title: isZhTW ? "8月15日Perplexity工具班開課，搜尋專家養成計畫" : "August 15th Perplexity Tools Class, Search Expert Development Program",
    details: [
      { icon: "📅", text: isZhTW ? "日期：2025年8月15日 (星期五)" : "Date: August 15, 2025 (Friday)" },
      { icon: "🕔", text: isZhTW ? "時間：下午 1:00 - 4:00 (3小時)" : "Time: 1:00 PM - 4:00 PM (3 hours)" },
      { icon: "🎯", text: isZhTW ? "線上直播＋實戰練習" : "Live streaming + practical exercises" },
      { icon: "👥", text: isZhTW ? "小班教學｜僅限 25 位" : "Small Class Teaching | Limited to 25 seats" },
      { icon: "✅", text: isZhTW ? "免費Perplexity Pro試用1個月" : "Free Perplexity Pro trial for 1 month" },
      { icon: "🎁", text: isZhTW ? "早鳥價：$2,800 (原價 $3,500)" : "Early Bird Price: $2,800 (Original $3,500)" }
    ],
    note: isZhTW ? "搜尋達人速成班，機會難得" : "Search expert crash course, rare opportunity"
  };

  // 價格信息
  const pricingInfo = {
    series: isZhTW ? "搜尋工具專精價" : "Search Tools Specialty Price",
    price: "$2,800",
    originalPrice: "$3,500",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$2,200",
    enterprise: isZhTW ? "企業資料搜尋培訓方案" : "Corporate data search training program"
  };

  // 課程特色
  const courseFeatures = [
    {
      icon: <Search className="w-12 h-12 text-orange-400 mx-auto" />,
      title: isZhTW ? "高級搜尋技巧" : "Advanced Search Techniques",
      description: isZhTW ? "掌握Perplexity的所有搜尋功能和技巧" : "Master all Perplexity search functions and techniques",
      highlight: isZhTW ? "搜尋專精" : "Search Specialization"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "資料分析能力" : "Data Analysis Skills",
      description: isZhTW ? "學會從搜尋結果中提取有價值的資訊" : "Learn to extract valuable information from search results",
      highlight: isZhTW ? "數據洞察" : "Data Insights"
    },
    {
      icon: <FileText className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "學術研究應用" : "Academic Research Application",
      description: isZhTW ? "應用AI搜尋工具進行專業學術研究" : "Apply AI search tools for professional academic research",
      highlight: isZhTW ? "學術專業" : "Academic Professional"
    },
    {
      icon: <Eye className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "商業情報收集" : "Business Intelligence Gathering",
      description: isZhTW ? "利用AI搜尋進行市場研究和競爭分析" : "Use AI search for market research and competitive analysis",
      highlight: isZhTW ? "商業洞察" : "Business Insights"
    }
  ];

  // 目標學員
  const targetAudience = {
    title: isZhTW ? "哪些人適合學習Perplexity工具課程？" : "Who Should Take This Perplexity Tools Course?",
    description: isZhTW ? "無論你是學術研究者、商業分析師還是內容創作者，這門課程都能幫助你掌握AI搜尋的核心技能，大幅提升資訊搜集和分析效率。" : "Whether you're an academic researcher, business analyst, or content creator, this course helps you master core AI search skills and dramatically improve information gathering and analysis efficiency.",
    audiences: [
      {
        icon: <BookOpen className="w-8 h-8 text-orange-400" />,
        title: isZhTW ? "學術研究者" : "Academic Researchers",
        description: isZhTW ? "學生、教授、研究員等需要進行文獻搜尋和學術研究的人員" : "Students, professors, researchers who need to conduct literature searches and academic research"
      },
      {
        icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "商業分析師" : "Business Analysts",
        description: isZhTW ? "市場研究員、商業顧問、投資分析師等需要深度市場洞察的專業人士" : "Market researchers, business consultants, investment analysts who need deep market insights"
      },
      {
        icon: <FileText className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "內容創作者" : "Content Creators",
        description: isZhTW ? "記者、作家、部落客等需要快速收集準確資訊的內容工作者" : "Journalists, writers, bloggers who need to quickly gather accurate information for content work"
      },
      {
        icon: <Users className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "專業工作者" : "Professional Workers",
        description: isZhTW ? "律師、醫生、顧問等需要高效資訊搜尋能力的專業人士" : "Lawyers, doctors, consultants who need efficient information search capabilities"
      }
    ]
  };

  // FAQ數據
  const faqData = [
    {
      question: isZhTW ? "是否需要有Perplexity Pro帳戶？" : "Do I need a Perplexity Pro account?",
      answer: isZhTW ? "不需要！課程包含1個月免費Pro試用，讓你體驗所有高級功能。課程會教你如何最大化免費版本的使用效果。" : "No! The course includes a 1-month free Pro trial for you to experience all premium features. We'll teach you how to maximize the free version's effectiveness."
    },
    {
      question: isZhTW ? "這個課程適合研究新手嗎？" : "Is this course suitable for research beginners?",
      answer: isZhTW ? "絕對適合！課程從基礎搜尋開始，逐步教授高級技巧。無論你是學生、研究員還是商業人士，都能快速上手。" : "Absolutely! The course starts from basic search and gradually teaches advanced techniques. Whether you're a student, researcher, or business professional, you can quickly get started."
    },
    {
      question: isZhTW ? "課程結束後還能獲得什麼支援？" : "What support will I receive after the course?",
      answer: isZhTW ? "你將獲得搜尋模板庫、最佳實踐指南，並加入我們的搜尋專家交流群組，持續學習最新的搜尋技巧。" : "You'll receive a search template library, best practices guide, and join our search expert community group for continuous learning of the latest search techniques."
    },
    {
      question: isZhTW ? "Perplexity與Google搜尋有什麼不同？" : "What's the difference between Perplexity and Google search?",
      answer: isZhTW ? "Perplexity是AI驅動的搜尋引擎，能提供更精準的答案和來源引用。我們會教你如何結合兩者的優勢，進行更有效的資訊搜尋。" : "Perplexity is an AI-powered search engine that provides more precise answers and source citations. We'll teach you how to combine the advantages of both for more effective information search."
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
    window.open('https://wa.me/85298765432?text=我想了解Perplexity工具班課程', '_blank');
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

export default PerplexityToolsOutline; 