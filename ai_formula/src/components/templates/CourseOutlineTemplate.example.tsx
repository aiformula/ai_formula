// 🎯 CourseOutlineTemplate 使用範例
// 📄 這個文件展示點樣用新嘅CourseOutlineTemplate

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
  Users
} from 'lucide-react';

const ExampleCourseOutline = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // 📝 Step 1: 定義課程基本信息
  const courseInfo = {
    badge: isZhTW ? "AI 主題班" : "AI Master Class",
    title: isZhTW ? "『AI 主題班』3小時 手把手教你一步步做出『真正用得』手機 AI App！" : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
    subtitle: isZhTW ? "3小時完成兩個手機 App，含登入+雲端資料庫+AI功能！《AI App MVP 實戰班》由零開始，手把手教你建構前中後台，讓你帶走歷練硬編碼與模版。" : "Complete 2 mobile apps in 3 hours, including login + cloud database + AI features! 'AI App MVP Bootcamp' from zero to hero.",
    instructor: "Calpa Liu | 全端工程師",
    instructorTitle: isZhTW ? "最貴導師" : "Premium Instructor"
  };

  // 📊 Step 2: 定義課程統計
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

  // 🏷️ Step 3: 定義行業標籤
  const industryTags = [
    { name: isZhTW ? "日常生活" : "Daily Life", icon: <Lightbulb className="w-4 h-4" />, available: true },
    { name: isZhTW ? "保險業" : "Insurance", icon: <Shield className="w-4 h-4" />, available: false },
    { name: isZhTW ? "零售業" : "Retail", icon: <Star className="w-4 h-4" />, available: false },
    { name: isZhTW ? "金融業" : "Finance", icon: <TrendingUp className="w-4 h-4" />, available: false },
    { name: isZhTW ? "教育業" : "Education", icon: <BookOpen className="w-4 h-4" />, available: false },
    { name: isZhTW ? "醫療業" : "Healthcare", icon: <Heart className="w-4 h-4" />, available: false }
  ];

  // 📚 Step 4: 定義可選課程
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

  // 📰 Step 5: 定義最新消息
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

  // 💰 Step 6: 定義價格信息
  const pricingInfo = {
    series: isZhTW ? "全系列優惠價" : "Full Series Special Price",
    price: "$4,500",
    originalPrice: "$5,250",
    aiInOne: isZhTW ? "AI in one 學員價" : "AI in one Student Price",
    studentPrice: "$3,500",
    enterprise: isZhTW ? "我們亦提供企業培訓服務" : "We also provide enterprise training services"
  };

  // 🌟 Step 7: 定義課程特色
  const courseFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: isZhTW ? "AI 技術整合" : "AI Technology Integration",
      description: isZhTW ? "學習最新 AI 技術整合到手機應用" : "Learn to integrate latest AI technology into mobile apps",
      highlight: isZhTW ? "ChatGPT API" : "ChatGPT API"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: isZhTW ? "手機 App 開發" : "Mobile App Development",
      description: isZhTW ? "從零開始建構完整的手機應用程式" : "Build complete mobile applications from scratch",
      highlight: isZhTW ? "React Native" : "React Native"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "雲端資料庫" : "Cloud Database",
      description: isZhTW ? "整合雲端資料庫與用戶認證系統" : "Integrate cloud database and user authentication",
      highlight: isZhTW ? "Firebase" : "Firebase"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "小班教學" : "Small Class Teaching",
      description: isZhTW ? "限制15人，確保每位學員都能完成" : "Limited to 15 students, ensure everyone completes",
      highlight: isZhTW ? "1對1指導" : "1-on-1 Guidance"
    }
  ];

  // ❓ Step 8: 定義FAQ
  const faqData = [
    {
      question: isZhTW ? "我報名後，可以無限重複參與實體課程？" : "After registration, can I attend physical classes unlimited times?",
      answer: isZhTW ? "是的！我們承諾為報課完整課程的學員提供半年內無限次參加同課程的待遇，確保你有充足的時間深入學習，掌握每一項技能。" : "Yes! We promise students who complete the full course can attend the same course unlimited times within half a year."
    },
    {
      question: isZhTW ? "我可以用其他方法支付課程費用嗎？" : "Can I pay course fees by other methods?",
      answer: isZhTW ? "可以！如需其他支付方法，請 WhatsApp 我們，我們樂意為你提供協助。" : "Yes! If you need other payment methods, please WhatsApp us for assistance."
    },
    {
      question: isZhTW ? "課程是否提供學習資料？" : "Does the course provide learning materials?",
      answer: isZhTW ? "是的，我們提供互動式大書和AI助手，整合課程筆記和課堂筆音，方便您隨時複習。" : "Yes, we provide interactive materials and AI assistants with integrated course notes."
    }
  ];

  // 📢 Step 9: 定義推廣橫幅
  const promotionalBanner = {
    title: isZhTW ? "手把手教你一步步做出『真正用得』手機 AI App" : "Step-by-Step Guide to Building 'Truly Useful' Mobile AI App",
    subtitle: isZhTW ? "3小時完成：有會員登入、有後台＋資料庫=AI App" : "3 Hours Complete: Member login + Backend + Database = AI App",
    features: [
      isZhTW ? "全程辦 AI App 開發實戰，邊學前端現場，實戰問案例與結果分類整理" : "Full AI App development hands-on",
      isZhTW ? "學會 No-Code 工具搭建 AI 解付，目前正在是精簡的企業工具包" : "Learn No-Code AI tools",
      isZhTW ? "我們亦友女性上班族，消除，新鮮、JSON、呈業精演，圍讓你探訪的等級" : "Enterprise-level solutions"
    ],
    ctaText: "AI App MVP"
  };

  // 🎯 Step 10: 定義回調函數
  const handleStartLearning = () => {
    navigate('/courses/prompt-engineering-learning');
  };

  const handleRegister = () => {
    console.log('用戶點擊報名');
    // 可以導航到報名頁面或打開報名表單
  };

  const handleWhatsApp = () => {
    console.log('用戶點擊WhatsApp查詢');
    // 可以打開WhatsApp或導航到聯繫頁面
  };

  // 📱 Step 11: 渲染模板
  return (
    <CourseOutlineTemplate
      courseInfo={courseInfo}
      courseStats={courseStats}
      industryTags={industryTags}
      availableCourses={availableCourses}
      latestNews={latestNews}
      pricingInfo={pricingInfo}
      courseFeatures={courseFeatures}
      faqData={faqData}
      promotionalBanner={promotionalBanner}
      onStartLearning={handleStartLearning}
      onRegister={handleRegister}
      onWhatsApp={handleWhatsApp}
    />
  );
};

export default ExampleCourseOutline;

/*
🎯 使用指南：

1. 📝 複製呢個文件到新嘅課程大綱頁面
2. 🔧 修改所有數據 (courseInfo, courseStats, etc.)
3. 🎨 保持現有嘅樣式和結構
4. 📱 更新回調函數 (handleStartLearning, handleRegister, etc.)
5. 🚀 完成！你嘅新課程大綱頁面就準備好了

📊 數據結構：
- courseInfo: 課程基本信息
- courseStats: 課程統計（時長、模組、福利）
- industryTags: 行業應用標籤
- availableCourses: 可選課程
- latestNews: 最新消息
- pricingInfo: 價格信息
- courseFeatures: 課程特色
- faqData: 常見問題
- promotionalBanner: 推廣橫幅

🔧 自定義：
- 可選的 onRegister 和 onWhatsApp 回調
- 所有文字都支援中英文
- 所有圖標都可以自定義
- 所有顏色都可以通過 Tailwind classes 調整
*/ 