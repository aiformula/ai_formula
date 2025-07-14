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

  // 課�??�本信息
  const courseInfo = {
    badge: isZhTW ? "成為職場AI達人" : "Master ChatGPT in 5 hours, from complete beginner to workplace AI expert",
    title: isZhTW ? "?ChatGPT 精通班??小�? ?�握AI對話?��??�為?��?�??家』�?" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
    subtitle: isZhTW ? "5小�?深度?�握ChatGPT，�?對話?��??�AI專家！涵?��?示工程、創?�寫作、�?業�??�、API?��?，全?��??��?你�?AI?�用?��?，�?你�??�職?�AI?�人?? : "Master ChatGPT in 5 hours, from conversation novice to AI expert! Covering prompt engineering, creative writing, business applications, API integration.",
    instructor: "David | AI ?��??��?�?,
    instructorTitle: isZhTW ? "資深導師" : "Senior Instructor"
  };

  // 課�?統�?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "學�??�數" : "Learning Hours",
      value: isZhTW ? "5小�?" : "5 Hours"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "課�??��?" : "Course Modules",
      value: isZhTW ? "4?? : "4 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "學�?福利" : "Learning Benefits",
      value: isZhTW ? "終身?�員＋AI工具?��?專家社群" : "Lifetime membership + AI toolkit + expert community"
    }
  ];

  // 課�?資�?標籤
  const courseInfoTags = [
    { name: isZhTW ? "?�基礎可�? : "Zero Experience OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "?��??�課" : "Bilingual Teaching", icon: <Globe className="w-4 h-4 text-blue-400" />, status: 'available' as const },
    { name: isZhTW ? "?��?寫�?" : "Creative Writing", icon: <Wand2 className="w-4 h-4 text-purple-400" />, status: 'featured' as const },
    { name: isZhTW ? "?�業?�用" : "Business Applications", icon: <Briefcase className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "API?��?" : "API Integration", icon: <Code className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "模板�? : "Template Library", icon: <Database className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "專家認�?" : "Expert Certification", icon: <Award className="w-4 h-4 text-indigo-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "?��??�能" : "Advanced Features", icon: <Brain className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "?��??�新" : "Continuous Updates", icon: <TrendingUp className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // ?�選課�?
  const availableCourses = [
    {
      title: isZhTW ? "?�AI 主�??��?小�? ?��??��?你�?步步?�出?��?�?��得』�?�?AI App�? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "學�?建�?實用?�AI?��??�用程�?" : "Learn to build practical AI mobile applications",
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

  // ?�?��???  const latestNews = {
    date: "2025�???5??,
    title: isZhTW ? "9???�ChatGPT精通班?�課，早鳥優?�進�?�? : "September 1st ChatGPT Mastery Class, Early Bird Offer Available",
    details: [
      { icon: "??", text: isZhTW ? "?��?�?025�?????(?��?一)" : "Date: September 1, 2025 (Monday)" },
      { icon: "??", text: isZhTW ? "?��?：�???9:00 - 下�? 2:00 (5小�?)" : "Time: 9:00 AM - 2:00 PM (5 hours)" },
      { icon: "?��", text: isZhTW ? "實�?＋�?上�?步�?�? : "Physical + Online Sync Teaching" },
      { icon: "?��", text: isZhTW ? "小班?�學｜�???20 �? : "Small Class Teaching | Limited to 20 seats" },
      { icon: "??, text: isZhTW ? "專家級�?示工程�?巧傳?? : "Expert-level prompt engineering techniques" },
      { icon: "??", text: isZhTW ? "?�鳥?��?$3,800 (?�價 $4,500)" : "Early Bird Price: $3,800 (Original $4,500)" }
    ],
    note: isZhTW ? "?��??��?，�??�報?? : "Limited seats, register now"
  };

  // ?�格信息
  const pricingInfo = {
    series: isZhTW ? "ChatGPT專精?? : "ChatGPT Specialty Price",
    price: "$3,800",
    originalPrice: "$4,500",
    aiInOne: isZhTW ? "AI in one 學員?? : "AI in one Student Price",
    studentPrice: "$2,800",
    enterprise: isZhTW ? "企業?��??��??��??��?" : "Corporate group training discounts available"
  };

  // 課�??�色
  const courseFeatures = [
    {
      icon: <MessageSquare className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "對話?��?精�? : "Conversation Art Mastery",
      description: isZhTW ? "?�握?�AI?��?高�?對話?��?巧�??��?" : "Master techniques and methods for efficient AI conversations",
      highlight: isZhTW ? "對話?��? : "Conversation Skills"
    },
    {
      icon: <Wand2 className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?��?寫�??��?" : "Creative Writing Assistant",
      description: isZhTW ? "學�?使用ChatGPT?��??��?寫�??�內容創�? : "Learn to use ChatGPT for creative writing and content creation",
      highlight: isZhTW ? "?��?寫�?" : "Creative Writing"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "?�業?�用實戰" : "Business Application Practice",
      description: isZhTW ? "將ChatGPT?��??�日常�?業工作�?程中" : "Integrate ChatGPT into daily business workflows",
      highlight: isZhTW ? "?�業?��?" : "Business Integration"
    },
    {
      icon: <Code className="w-12 h-12 text-orange-400 mx-auto" />,
      title: isZhTW ? "API 高�??�用" : "Advanced API Applications",
      description: isZhTW ? "學�?ChatGPT API?��?級使?��?�? : "Learn advanced ChatGPT API usage techniques",
      highlight: isZhTW ? "API?��?" : "API Integration"
    }
  ];

  // ?��?學員
  const targetAudience = {
    title: isZhTW ? "?��?人適?�學習ChatGPT精通課程�?" : "Who Should Take This ChatGPT Mastery Course?",
    description: isZhTW ? "?��?你是?�學?��??��?經�??�用?��??�課程�?幫助你�??��??��?級全?��??�ChatGPT，�??��?�??AI對話專家?? : "Whether you're a beginner or experienced user, this course will help you master ChatGPT from basics to advanced levels, becoming a true AI conversation expert.",
    audiences: [
      {
        icon: <Sparkles className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "?�容?��??? : "Content Creators",
        description: isZhTW ? "?�落客、自媒�?工�??�、社群�??�者�??�要大?�內容產?��??��??? : "Bloggers, social media workers, community managers who need massive content output"
      },
      {
        icon: <Briefcase className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "企業專業人士" : "Business Professionals",
        description: isZhTW ? "希�??��?工�??��??�自?��??�常任�??��?業員工�?管�??? : "Business employees and managers who want to improve work efficiency and automate daily tasks"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "?��?工�??? : "Creative Workers",
        description: isZhTW ? "設�?師、廣?�人?��??��??��??�要創?��??��?�?��?��??��?業人�? : "Designers, advertisers, marketing specialists who need creative inspiration and solutions"
      },
      {
        icon: <Users className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "學�??��?究�? : "Students & Researchers",
        description: isZhTW ? "?�要�?究�??�、學習支?��??��??��??�學?��??�究人員" : "Students and researchers who need research assistance, learning support, and knowledge organization"
      }
    ]
  };

  // FAQ?��?
  const faqData = [
    {
      question: isZhTW ? "?��??��??�使?��?ChatGPT，能跟�?上�?�? : "I've never used ChatGPT before, can I keep up?",
      answer: isZhTW ? "?�然?�以！�??��?課�?從�??��??��?念�?始�??�步引�?你�??�ChatGPT?��?種�??�。即使是?�基礎�?學員也能?�利學�??? : "Absolutely! Our course starts with the most basic concepts and gradually guides you to master various ChatGPT functions. Even zero-experience students can learn successfully."
    },
    {
      question: isZhTW ? "?�個課程�??�費使用ChatGPT?��?麼�??��?" : "How is this course different from using ChatGPT for free?",
      answer: isZhTW ? "?�們�??��?你�?何使?�ChatGPT，更?��??�是?��?如�??��??�好?�更?��??�。�??��?級�?示�?巧、API?��??��?業�??��?深度?�容?? : "We don't just teach you how to use ChatGPT, but more importantly, how to use it better and more efficiently. Including advanced prompting techniques, API integration, and business applications."
    },
    {
      question: isZhTW ? "完�?課�?後�??��??��?麼水準�?" : "What level can I achieve after completing the course?",
      answer: isZhTW ? "完�?課�?後�?你�??��??�練?�用ChatGPT?��??�種任�?，�??�創?�寫作、�?業�??�、�?式�??��?，�?�???�AI對話專家?? : "After completing the course, you'll be able to skillfully use ChatGPT for various tasks including creative writing, business analysis, programming assistance, truly becoming an AI conversation expert."
    },
    {
      question: isZhTW ? "課�??�否涵�??�?��?ChatGPT?�能�? : "Does the course cover the latest ChatGPT features?",
      answer: isZhTW ? "?��?！�??��?續更?�課程內容�?確�?涵�?ChatGPT?��??��??��??�佳實踐�?讓�?始�??�握?�?�沿?�AI?�術�? : "Yes! We continuously update course content to ensure it covers the latest ChatGPT features and best practices, keeping you at the forefront of AI technology."
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
    window.open('https://wa.me/85298765432?text=?�想了解ChatGPT Mastery課�?', '_blank');
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
