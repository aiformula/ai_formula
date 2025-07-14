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

  // 課�??�本信息
  const courseInfo = {
    badge: isZhTW ? "編�??��??? : "Coding Basics Class",
    title: isZhTW ? "?�編程基礎班??小�? ?�基礎學?�『�?�?��?�』�?程�?設�?�? : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
    subtitle: isZhTW ? "4小�??�握程�?設�??��?，建構�??�第一?��??�網站�??�含HTML+CSS+JavaScript+後端?��?，�??�全棧�??��?驗�?讓�?從零?��?變�?程�?設�?師�? : "Master programming fundamentals in 4 hours, build your first complete website! Including HTML+CSS+JavaScript+backend integration, full-stack development experience.",
    instructor: "Ken | ?��?業�??�發專家",
    instructorTitle: isZhTW ? "首席導師" : "Chief Instructor"
  };

  // 課�?統�?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "學�??�數" : "Learning Hours",
      value: isZhTW ? "4小�?" : "4 Hours"
    },
    {
      icon: <Code className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "課�??��?" : "Course Modules",
      value: isZhTW ? "3?? : "3 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "學�?福利" : "Learning Benefits",
      value: isZhTW ? "終身學�??�援＋�?式碼永�?存�?" : "Lifetime learning support + permanent code access"
    }
  ];

  // 課�?資�?標籤
  const courseInfoTags = [
    { name: isZhTW ? "?�基礎�??? : "Zero Experience OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "?�棧?�發" : "Full-Stack Development", icon: <Layers className="w-4 h-4 text-blue-400" />, status: 'featured' as const },
    { name: isZhTW ? "實戰?�目" : "Real Projects", icon: <Zap className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "?�代工具" : "Modern Tools", icon: <Code className="w-4 h-4 text-purple-400" />, status: 'available' as const },
    { name: isZhTW ? "互�??�學" : "Interactive Learning", icon: <Users className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "作�??? : "Portfolio Building", icon: <Globe className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "求職?��?" : "Job Guidance", icon: <Briefcase className="w-4 h-4 text-indigo-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "終身?�援" : "Lifetime Support", icon: <Heart className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "業�?實�?" : "Industry Practice", icon: <TrendingUp className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // ?�選課�?
  const availableCourses = [
    {
      title: isZhTW ? "?�AI 主�??��?小�? ?��??��?你�?步步?�出?��?�?��得』�?�?AI App�? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "?��?AI?�用?�發，�??�編程基礎知�? : "Advanced AI application development, combining programming fundamentals",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "?�ChatGPT 精通班??小�? ?�握AI對話?��??�為?��?�??家』�?" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
      description: isZhTW ? "深度?�握ChatGPT對話?�巧�??�業?�用" : "Deep mastery of ChatGPT conversation skills and business applications",
      color: "orange" as const,
      available: true
    }
  ];

  // ?�?��???  const latestNews = {
    date: "2025�???5??,
    title: isZhTW ? "8??0?�編程基礎班?�課，零?��?程�?設�??��?" : "August 10th Coding Basics Class, Programming for Absolute Beginners",
    details: [
      { icon: "??", text: isZhTW ? "?��?�?025�???0??(?��???" : "Date: August 10, 2025 (Saturday)" },
      { icon: "??", text: isZhTW ? "?��?：�???9:00 - 下�? 1:00 (4小�?)" : "Time: 9:00 AM - 1:00 PM (4 hours)" },
      { icon: "?��", text: isZhTW ? "實�??�學＋�?上�?�? : "Physical teaching + online sync" },
      { icon: "?��", text: isZhTW ? "小班?�學｜�???18 �? : "Small Class Teaching | Limited to 18 seats" },
      { icon: "??, text: isZhTW ? "完整網�?專�?實�?，即學即?? : "Complete website project implementation, learn and apply immediately" },
      { icon: "??", text: isZhTW ? "?�鳥?��?$3,200 (?�價 $4,000)" : "Early Bird Price: $3,200 (Original $4,000)" }
    ],
    note: isZhTW ? "程�?設�??�基礎入?�，�?後�??? : "Programming zero-to-hero, last chance"
  };

  // ?�格信息
  const pricingInfo = {
    series: isZhTW ? "編�??��?專精?? : "Programming Beginner Specialty Price",
    price: "$3,200",
    originalPrice: "$4,000",
    aiInOne: isZhTW ? "AI in one 學員?? : "AI in one Student Price",
    studentPrice: "$2,400",
    enterprise: isZhTW ? "企業程�??��??��?" : "Corporate programming training program"
  };

  // 課�??�色
  const courseFeatures = [
    {
      icon: <Code className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "程�?設�??��?" : "Programming Fundamentals",
      description: isZhTW ? "從零?��?學�?HTML?�CSS?�JavaScript?��?概念" : "Learn HTML, CSS, JavaScript core concepts from scratch",
      highlight: isZhTW ? "?�基礎�??? : "Beginner Friendly"
    },
    {
      icon: <Layers className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "?�棧?�發體�?" : "Full-Stack Experience",
      description: isZhTW ? "學�??�端?�面設�??��?端�??��??��?完整流�?" : "Learn complete process from frontend design to backend data processing",
      highlight: isZhTW ? "?�棧?�發" : "Full-Stack Development"
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-400 mx-auto" />,
      title: isZhTW ? "實戰?�目導�?" : "Project-Oriented Practice",
      description: isZhTW ? "?��?實�??�目學�?，建構�??�第一?��??�網�? : "Learn through real projects, build your first complete website",
      highlight: isZhTW ? "實戰學�?" : "Hands-on Learning"
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?�代?�發工具" : "Modern Development Tools",
      description: isZhTW ? "?�握業�?常用?��??�工?��??�佳實�? : "Master industry-standard development tools and best practices",
      highlight: isZhTW ? "專業工具" : "Professional Tools"
    }
  ];

  // ?��?學員
  const targetAudience = {
    title: isZhTW ? "?��?人適?�學習編程基礎課程�?" : "Who Should Take This Coding Basics Course?",
    description: isZhTW ? "?��?你是完全沒�?程�?設�?經�??�新?��??�是?��?轉�??�入科�??��??��?業人士�??��?課�??�能?��??��?紮實?��?式設計基礎�? : "Whether you're a complete beginner with no programming experience or a professional looking to transition into the tech field, this course provides a solid programming foundation.",
    audiences: [
      {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "程�?設�??��?" : "Programming Beginners",
        description: isZhTW ? "完全沒�?編�?經�?，�?對�?式設計�??�趣?�學習�? : "Complete beginners with no programming experience but interested in coding"
      },
      {
        icon: <Briefcase className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "轉�?人士" : "Career Changers",
        description: isZhTW ? "希�?轉入科�?行業，�?要�?式設計�??��?專業人士" : "Professionals looking to transition into tech industry and need programming skills"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "?�業?? : "Entrepreneurs",
        description: isZhTW ? "?��??�己?�發?��??��??��?�??術實?��??�業?? : "Entrepreneurs who want to develop product prototypes or understand technical implementation"
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "?�場?��??? : "Career Enhancers",
        description: isZhTW ? "希�??��?學�?編�??�?��??�職?�競?��??�在?�人�? : "Working professionals who want to enhance career competitiveness through programming skills"
      }
    ]
  };

  // FAQ?��?
  const faqData = [
    {
      question: isZhTW ? "?��??��??��?式設計�?驗�??�學?��?�? : "I have no programming experience at all, can I learn?",
      answer: isZhTW ? "絕�??�以！�??��?課�?專為?�基礎學?�設計�?從�??�本?��?念�?始�?循�?漸進地引�?你�??��?式設計�??��??�?��? : "Absolutely! Our course is designed for zero-experience students, starting from the most basic concepts and gradually guiding you to master core programming skills."
    },
    {
      question: isZhTW ? "4小�??��??�學?�網站�??��?�? : "Can I really learn web development in 4 hours?",
      answer: isZhTW ? "4小�??��?你�??�基礎�?念並完�?第�??�網站�??�。�??��??��?業�??�者�?要更多�??��?但這�?課�??�給你�??�紮實�?起�??? : "4 hours will help you master basic concepts and complete your first website project. While becoming a professional developer takes more time, this course gives you a solid starting point."
    },
    {
      question: isZhTW ? "課�?結�?後�??�找?��?式設計工作�?�? : "Can I find a programming job after the course?",
      answer: isZhTW ? "?��?課�??��?程�?設�?學�?之�??�起點。�??��?，�?將具?�基礎�??��?但�??�到工�??��?要進�?步�?學�??�實踐。�??��??��?後�?學�?建議?? : "This course is the starting point of your programming journey. After completion, you'll have basic skills, but finding a job requires further learning and practice. We'll provide follow-up learning recommendations."
    },
    {
      question: isZhTW ? "?�要�??��?麼設?��?軟�??��?" : "Do I need to prepare any equipment or software?",
      answer: isZhTW ? "?��?要�??�能上網?�電?�即?��??�們�??�課程中?��?你�?裝�??�?��?費�??�工?��?不�?要�?外購買任何�?體�? : "Just need a computer with internet access! We'll guide you through installing the required free development tools during the course, no additional software purchase needed."
    }
  ];

  // ?�調?�數
  const handleStartLearning = () => {
    navigate('/courses/free-plan');
  };

  const handleRegister = () => {
    // 導航?�課程學習�???    navigate('/courses/free-plan');
  };

  const handleWhatsApp = () => {
    // ?��?WhatsApp?�絡
    window.open('https://wa.me/85298765432?text=?�想了解編�??��??�課�?, '_blank');
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
