import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CourseOutlineTemplate } from '@/components/templates';
import { 
  Clock, 
  Code, 
  Repeat, 
  Brain, 
  Target, 
  Lightbulb,
  Database,
  Smartphone,
  Heart,
  Shield,
  Star,
  TrendingUp,
  BookOpen,
  Search,
  Users,
  Cpu,
  Globe,
  Layers,
  Zap,
  Briefcase
} from 'lucide-react';

const CodingBasicsOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // 課程基本信息
  const courseInfo = {
    badge: isZhTW ? "編程基礎班" : "Coding Basics Class",
    title: isZhTW ? "『編程基礎班』4小時 從基礎學會『真正實用』的程式設計！" : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
    subtitle: isZhTW ? "4小時掌握程式設計基礎，建構您的第一個完整網站！包含HTML+CSS+JavaScript+後端整合，全方位開發體驗，讓您從零基礎變身程式設計師！" : "Master programming fundamentals in 4 hours, build your first complete website! Including HTML+CSS+JavaScript+backend integration, full-stack development experience.",
    instructor: "Ken | 客製化業務開發專家",
    instructorTitle: isZhTW ? "首席導師" : "Chief Instructor"
  };

  // 課程統計
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "學習時數" : "Learning Hours",
      value: isZhTW ? "4小時" : "4 Hours"
    },
    {
      icon: <Code className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "課程模組" : "Course Modules",
      value: isZhTW ? "3個 : "3 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "學習福利" : "Learning Benefits",
      value: isZhTW ? "終身學習支援＋永久程式碼存取" : "Lifetime learning support + permanent code access"
    }
  ];

  // 課程資訊標籤
  const courseInfoTags = [
    { name: isZhTW ? "零經驗可學" : "Zero Experience OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "全棧開發" : "Full-Stack Development", icon: <Layers className="w-4 h-4 text-blue-400" />, status: 'featured' as const },
    { name: isZhTW ? "實戰專案" : "Real Projects", icon: <Zap className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "現代工具" : "Modern Tools", icon: <Code className="w-4 h-4 text-purple-400" />, status: 'available' as const },
    { name: isZhTW ? "互動學習" : "Interactive Learning", icon: <Users className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "作品集建立" : "Portfolio Building", icon: <Globe className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "求職諮詢" : "Job Guidance", icon: <Briefcase className="w-4 h-4 text-indigo-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "終身支援" : "Lifetime Support", icon: <Heart className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "業界實務" : "Industry Practice", icon: <TrendingUp className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // 可選課程
  const availableCourses = [
    {
      title: isZhTW ? "『AI 主導班』3小時 從零開始帶你步步掌握『真正實用』的行動AI應用程式！" : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "進階AI應用開發，結合程式設計基礎知識" : "Advanced AI application development, combining programming fundamentals",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "『ChatGPT 精通班』5小時 從零開始帶你掌握AI對話藝術，成為『真正專家』！" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
      description: isZhTW ? "深度掌握ChatGPT對話技巧與商業應用" : "Deep mastery of ChatGPT conversation skills and business applications",
      color: "orange" as const,
      available: true
    }
  ];

  // 最新消息
  const latestNews = {
    date: "2025年5月,
    title: isZhTW ? "8月10日編程基礎班開課，零基礎程式設計入門" : "August 10th Coding Basics Class, Programming for Absolute Beginners",
    details: [
      { icon: "日期", text: isZhTW ? "2025年8月10日 (星期六)" : "Date: August 10, 2025 (Saturday)" },
      { icon: "時間", text: isZhTW ? "上午9:00 - 下午1:00 (4小時)" : "Time: 9:00 AM - 1:00 PM (4 hours)" },
      { icon: "教學方式", text: isZhTW ? "實體教學 + 線上同步" : "Teaching Method: Physical teaching + online sync" },
      { icon: "小班制", text: isZhTW ? "小班教學｜限額18人" : "Class Size: Small class teaching | Limited to 18 seats" },
      { icon: "完整網站專案實作", text: isZhTW ? "完整網站專案實作，即學即用" : "Complete website project implementation, learn and apply immediately" },
      { icon: "早鳥價", text: isZhTW ? "早鳥價 $3,200 (原價 $4,000)" : "Early Bird Price: $3,200 (Original $4,000)" }
    ],
    note: isZhTW ? "程式設計零基礎入門，最後機會！" : "Programming zero-to-hero, last chance!"
  };

  // 價格資訊
  const pricingInfo = {
    series: isZhTW ? "編程初學者專精價" : "Programming Beginner Specialty Price",
    price: "$3,200",
    originalPrice: "$4,000",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$2,400",
    enterprise: isZhTW ? "企業程式訓練方案" : "Corporate programming training program"
  };

  // 課程特色
  const courseFeatures = [
    {
      icon: <Code className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "程式設計基礎" : "Programming Fundamentals",
      description: isZhTW ? "從零開始學習HTML、CSS、JavaScript核心概念" : "Learn HTML, CSS, JavaScript core concepts from scratch",
      highlight: isZhTW ? "零基礎友好" : "Beginner Friendly"
    },
    {
      icon: <Layers className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "全棧開發體驗" : "Full-Stack Experience",
      description: isZhTW ? "從前端設計到後端數據處理，完整流程學習" : "Learn complete process from frontend design to backend data processing",
      highlight: isZhTW ? "全棧開發" : "Full-Stack Development"
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-400 mx-auto" />,
      title: isZhTW ? "實戰專案導向" : "Project-Oriented Practice",
      description: isZhTW ? "透過實際專案學習，建構您的第一個完整網站" : "Learn through real projects, build your first complete website",
      highlight: isZhTW ? "實戰學習" : "Hands-on Learning"
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "現代開發工具" : "Modern Development Tools",
      description: isZhTW ? "掌握業界標準開發工具與最佳實踐" : "Master industry-standard development tools and best practices",
      highlight: isZhTW ? "專業工具" : "Professional Tools"
    }
  ];

  // 目標學員
  const targetAudience = {
    title: isZhTW ? "誰適合學習編程基礎課程？" : "Who Should Take This Coding Basics Course?",
    description: isZhTW ? "您是完全沒有程式設計經驗的新手，或是想要轉職進入科技領域的專業人士，這門課程都能提供紮實的程式設計基礎。" : "Whether you're a complete beginner with no programming experience or a professional looking to transition into the tech field, this course provides a solid programming foundation.",
    audiences: [
      {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "程式設計新手" : "Programming Beginners",
        description: isZhTW ? "完全沒有編程經驗，但對程式設計有興趣想要學習" : "Complete beginners with no programming experience but interested in coding"
      },
      {
        icon: <Briefcase className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "轉職人士" : "Career Changers",
        description: isZhTW ? "希望轉入科技產業，需要程式設計技能的專業人士" : "Professionals looking to transition into tech industry and need programming skills"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "創業者" : "Entrepreneurs",
        description: isZhTW ? "想要自行開發產品原型或了解技術實作的創業者" : "Entrepreneurs who want to develop product prototypes or understand technical implementation"
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "職場競爭力提升" : "Career Enhancers",
        description: isZhTW ? "希望透過程式設計技能提升職場競爭力的在職專業人士" : "Working professionals who want to enhance career competitiveness through programming skills"
      }
    ]
  };

  // FAQ
  const faqData = [
    {
      question: isZhTW ? "我完全沒有程式設計經驗，可以學嗎？" : "I have no programming experience at all, can I learn?",
      answer: isZhTW ? "絕對可以！我們的課程專為零經驗學生設計，從最基本的概念開始，循序漸進引導您掌握核心程式設計技能。" : "Absolutely! Our course is designed for zero-experience students, starting from the most basic concepts and gradually guiding you to master core programming skills."
    },
    {
      question: isZhTW ? "4小時真的可以學會網頁開發嗎？" : "Can I really learn web development in 4 hours?",
      answer: isZhTW ? "4小時可以幫助您掌握基礎概念並完成第一個網站專案。雖然成為專業開發者需要更多時間，但這門課程能為您打下紮實的基礎。" : "4 hours will help you master basic concepts and complete your first website project. While becoming a professional developer takes more time, this course gives you a solid starting point."
    },
    {
      question: isZhTW ? "課程結束後可以找到程式設計工作嗎？" : "Can I find a programming job after the course?",
      answer: isZhTW ? "這門課程是您程式設計旅程的起點。完成後，您將具備基礎技能，但尋找工作需要進一步學習和實踐。我們會提供後續學習建議。" : "This course is the starting point of your programming journey. After completion, you'll have basic skills, but finding a job requires further learning and practice. We'll provide follow-up learning recommendations."
    },
    {
      question: isZhTW ? "需要準備什麼設備或軟體嗎？" : "Do I need to prepare any equipment or software?",
      answer: isZhTW ? "只需要一台有網路連線的電腦！我們會在課程中引導您安裝所需的免費開發工具，不需要額外購買任何實體設備。" : "Just need a computer with internet access! We'll guide you through installing the required free development tools during the course, no additional software purchase needed."
    }
  ];

  // 開始學習
  const handleStartLearning = () => {
    navigate('/courses/free-plan');
  };

  const handleRegister = () => {
    // 導航課程學習頁面
    navigate('/courses/free-plan');
  };

  const handleWhatsApp = () => {
    // 聯絡WhatsApp
    window.open('https://wa.me/85298765432?text=我想了解編程基礎班課程，請聯絡我', '_blank');
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

export default CodingBasicsOutline; 
