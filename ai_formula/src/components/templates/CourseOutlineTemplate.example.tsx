// ?�� CourseOutlineTemplate 使用範�?
// ?? ?�個�?件�?示�?�?��?��?CourseOutlineTemplate

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

  // ?? Step 1: 定義課�??�本信息
  const courseInfo = {
    badge: isZhTW ? "AI 主�??? : "AI Master Class",
    title: isZhTW ? "?�AI 主�??��?小�? ?��??��?你�?步步?�出?��?�?��得』�?�?AI App�? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
    subtitle: isZhTW ? "3小�?完�??�個�?�?App，含?�入+?�端資�?�?AI?�能！《AI App MVP 實戰?�》由?��?始�??��??��?你建構�?中�??��?讓�?帶走歷練硬編碼�?模�??? : "Complete 2 mobile apps in 3 hours, including login + cloud database + AI features! 'AI App MVP Bootcamp' from zero to hero.",
    instructor: "Calpa Liu | ?�端工�?�?,
    instructorTitle: isZhTW ? "?�貴�?�? : "Premium Instructor"
  };

  // ?? Step 2: 定義課�?統�?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "學�??�數" : "Learning Hours",
      value: isZhTW ? "3小�?" : "3 Hours"
    },
    {
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "課�??��?" : "Course Modules",
      value: isZhTW ? "1?? : "1 Module"
    },
    {
      icon: <Repeat className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "學�?福利" : "Learning Benefits",
      value: isZhTW ? "一次報?��??��?複�??�實體課程�?永�?線�??�溫" : "One registration, unlimited physical + online access"
    }
  ];

  // ?���?Step 3: 定義行業標籤
  const industryTags = [
    { name: isZhTW ? "?�常?�活" : "Daily Life", icon: <Lightbulb className="w-4 h-4" />, available: true },
    { name: isZhTW ? "保險�? : "Insurance", icon: <Shield className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?�售�? : "Retail", icon: <Star className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?��?�? : "Finance", icon: <TrendingUp className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?�育�? : "Education", icon: <BookOpen className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?��?�? : "Healthcare", icon: <Heart className="w-4 h-4" />, available: false }
  ];

  // ?? Step 4: 定義?�選課�?
  const availableCourses = [
    {
      title: isZhTW ? "?�編程基礎班??小�? ?�基礎學?�『�?�?��?�』�?程�?設�?�? : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
      description: isZhTW ? "?�基礎學?��?式設計�?完整課�?" : "Complete course for learning programming from zero",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "?�Perplexity 工具?��?小�? ?�為AI?��??�究?��?級�?家』�?" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
      description: isZhTW ? "?�握AI?��?工具?��?業�??? : "Master professional skills of AI search tools",
      color: "orange" as const,
      available: true
    }
  ];

  // ?�� Step 5: 定義?�?��???
  const latestNews = {
    date: "2025�???0??,
    title: isZhTW ? "8??4?�現?��??��??��??��??��?�? : "August 24th Live Class, Limited Time Registration Offer",
    details: [
      { icon: "??", text: isZhTW ? "?��?�?025�???4??(?��???" : "Date: August 24, 2025 (Sunday)" },
      { icon: "??", text: isZhTW ? "?��?：�???2:30 - 5:30 (3小�?)" : "Time: 2:30 PM - 5:30 PM (3 hours)" },
      { icon: "?��", text: isZhTW ? "實�??�學+線�??�步 (?�端)" : "Physical + Online Sync (Registration)" },
      { icon: "?��", text: isZhTW ? "小班實�??�學｜�???15 �? : "Small Class Hands-on Teaching | Limited to 15 seats" },
      { icon: "??, text: isZhTW ? "導師?�場?��?，親?��???App ?��?" : "Instructor guidance, hands-on App completion" },
      { icon: "??", text: isZhTW ? "?�鳥?��??��?$4,500 (?�價 $5,350)" : "Early Bird Price: $4,500 (Original $5,350)" }
    ],
    note: isZhTW ? "?��??��?，報?�即�? : "Limited seats, register now"
  };

  // ?�� Step 6: 定義?�格信息
  const pricingInfo = {
    series: isZhTW ? "?�系?�優?�價" : "Full Series Special Price",
    price: "$4,500",
    originalPrice: "$5,250",
    aiInOne: isZhTW ? "AI in one 學員?? : "AI in one Student Price",
    studentPrice: "$3,500",
    enterprise: isZhTW ? "?�們亦?��?企業?��??��?" : "We also provide enterprise training services"
  };

  // ?? Step 7: 定義課�??�色
  const courseFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: isZhTW ? "AI ?�術整?? : "AI Technology Integration",
      description: isZhTW ? "學�??�??AI ?�術整?�到?��??�用" : "Learn to integrate latest AI technology into mobile apps",
      highlight: isZhTW ? "ChatGPT API" : "ChatGPT API"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: isZhTW ? "?��? App ?�發" : "Mobile App Development",
      description: isZhTW ? "從零?��?建�?完整?��?機�??��?�? : "Build complete mobile applications from scratch",
      highlight: isZhTW ? "React Native" : "React Native"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "?�端資�?�? : "Cloud Database",
      description: isZhTW ? "?��??�端資�?庫�??�戶認�?系統" : "Integrate cloud database and user authentication",
      highlight: isZhTW ? "Firebase" : "Firebase"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "小班?�學" : "Small Class Teaching",
      description: isZhTW ? "?�制15人�?確�?每�?學員?�能完�?" : "Limited to 15 students, ensure everyone completes",
      highlight: isZhTW ? "1�??��?" : "1-on-1 Guidance"
    }
  ];

  // ??Step 8: 定義FAQ
  const faqData = [
    {
      question: isZhTW ? "?�報?��?，可以無?��?複�??�實體課程�?" : "After registration, can I attend physical classes unlimited times?",
      answer: isZhTW ? "?��?！�??�承諾為?�課完整課�??�學?��?供�?年內?��?次�??��?課�??��??��?確�?你�??�足?��??�深?�學習�??�握每�??��??��? : "Yes! We promise students who complete the full course can attend the same course unlimited times within half a year."
    },
    {
      question: isZhTW ? "?�可以用?��??��??��?課�?費用?��?" : "Can I pay course fees by other methods?",
      answer: isZhTW ? "?�以！�??�?��??��??��?，�? WhatsApp ?�們�??�們�??�為你�?供�??��? : "Yes! If you need other payment methods, please WhatsApp us for assistance."
    },
    {
      question: isZhTW ? "課�??�否?��?學�?資�?�? : "Does the course provide learning materials?",
      answer: isZhTW ? "?��?，�??��?供�??��?大書?�AI?��?，整?�課程�?記�?課�?筆音，方便您?��?複�??? : "Yes, we provide interactive materials and AI assistants with integrated course notes."
    }
  ];

  // ?�� Step 9: 定義?�廣橫�?
  const promotionalBanner = {
    title: isZhTW ? "?��??��?你�?步步?�出?��?�?��得』�?�?AI App" : "Step-by-Step Guide to Building 'Truly Useful' Mobile AI App",
    subtitle: isZhTW ? "3小�?完�?：�??�員?�入?��?後台＋�??�庫=AI App" : "3 Hours Complete: Member login + Backend + Database = AI App",
    features: [
      isZhTW ? "?��?�?AI App ?�發實戰，�?學�?端現?��?實戰?��?例�?結�??��??��?" : "Full AI App development hands-on",
      isZhTW ? "學�? No-Code 工具?�建 AI �??，目?�正?�是精簡?��?業工?��?" : "Learn No-Code AI tools",
      isZhTW ? "?�們亦?�女?��??��?，�??��??�鮮?�JSON?��?業精演�??��?你探訪�?等�?" : "Enterprise-level solutions"
    ],
    ctaText: "AI App MVP"
  };

  // ?�� Step 10: 定義?�調?�數
  const handleStartLearning = () => {
    navigate('/courses/prompt-engineering-learning');
  };

  const handleRegister = () => {
    console.log('?�戶點�??��?');
    // ?�以導航?�報?��??��??��??��?表單
  };

  const handleWhatsApp = () => {
    console.log('?�戶點�?WhatsApp?�詢');
    // ?�以?��?WhatsApp?��??�到?�繫?�面
  };

  // ?�� Step 11: 渲�?模板
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
?�� 使用?��?�?

1. ?? 複製?�個�?件到?��?課�?大綱?�面
2. ?�� 修改?�?�數??(courseInfo, courseStats, etc.)
3. ?�� 保�??��??�樣式�?結�?
4. ?�� ?�新?�調?�數 (handleStartLearning, handleRegister, etc.)
5. ?? 完�?！�??�新課�?大綱?�面就�??�好�?

?? ?��?結�?�?
- courseInfo: 課�??�本信息
- courseStats: 課�?統�?（�??�、模組、�??��?
- industryTags: 行業?�用標籤
- availableCourses: ?�選課�?
- latestNews: ?�?��???
- pricingInfo: ?�格信息
- courseFeatures: 課�??�色
- faqData: 常�??��?
- promotionalBanner: ?�廣橫�?

?�� ?��?義�?
- ?�選??onRegister ??onWhatsApp ?�調
- ?�?��?字都?�援中英??
- ?�?��?標都?�以?��?�?
- ?�?��??�都?�以?��? Tailwind classes 調整
*/ 