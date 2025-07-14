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

  // 課�??�本信息
  const courseInfo = {
    badge: isZhTW ? "Perplexity 工具?? : "Perplexity Tools Class",
    title: isZhTW ? "?�Perplexity 工具?��?小�? ?�為AI?��??�究?��?級�?家』�?" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
    subtitle: isZhTW ? "3小�?精通Perplexity AI?��?引�?，�??��?小白?��?究�?人�??�握高�??��??�巧、�??��??�、學術�?究、�?業調?��?讓�??��?尋�??��???000%?? : "Master Perplexity AI search engine in 3 hours, from search novice to research expert! Master advanced search techniques, data analysis, academic research, business investigation.",
    instructor: "Jason | 專業?�發?�自?��?專家",
    instructorTitle: isZhTW ? "專業導師" : "Professional Instructor"
  };

  // 課�?統�?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "學�??�數" : "Learning Hours",
      value: isZhTW ? "3小�?" : "3 Hours"
    },
    {
      icon: <Search className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "課�??��?" : "Course Modules",
      value: isZhTW ? "2?? : "2 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "學�?福利" : "Learning Benefits",
      value: isZhTW ? "Pro帳戶試用＋�?尋模?��?專家群�?" : "Pro account trial + search templates + expert group"
    }
  ];

  // 課�?資�?標籤
  const courseInfoTags = [
    { name: isZhTW ? "?��??��??�學" : "Search Beginner OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "?�費試用" : "Free Trial", icon: <Search className="w-4 h-4 text-blue-400" />, status: 'featured' as const },
    { name: isZhTW ? "學�??�究" : "Academic Research", icon: <BookOpen className="w-4 h-4 text-purple-400" />, status: 'available' as const },
    { name: isZhTW ? "?�業?��?" : "Business Analysis", icon: <BarChart3 className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "?��?模板" : "Search Templates", icon: <FileText className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "專家群�?" : "Expert Group", icon: <Users className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "高�??�能" : "Advanced Features", icon: <Filter className="w-4 h-4 text-indigo-400" />, status: 'available' as const },
    { name: isZhTW ? "實�??�新" : "Real-time Updates", icon: <TrendingUp className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "AI洞�?" : "AI Insights", icon: <Brain className="w-4 h-4 text-red-400" />, status: 'coming-soon' as const }
  ];

  // ?�選課�?
  const availableCourses = [
    {
      title: isZhTW ? "?�ChatGPT 精通班??小�? ?�握AI對話?��??�為?��?�??家』�?" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
      description: isZhTW ? "深度?�握ChatGPT對話?�巧�??�業?�用" : "Deep mastery of ChatGPT conversation skills and business applications",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "?�AI 主�??��?小�? ?��??��?你�?步步?�出?��?�?��得』�?�?AI App�? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "學�?建�?實用?�AI?��??�用程�?" : "Learn to build practical AI mobile applications",
      color: "orange" as const,
      available: true
    }
  ];

  // ?�?��???  const latestNews = {
    date: "2025�???0??,
    title: isZhTW ? "8??5?�Perplexity工具?��?課�??��?專家養�?計畫" : "August 15th Perplexity Tools Class, Search Expert Development Program",
    details: [
      { icon: "??", text: isZhTW ? "?��?�?025�???5??(?��?�?" : "Date: August 15, 2025 (Friday)" },
      { icon: "??", text: isZhTW ? "?��?：�???1:00 - 4:00 (3小�?)" : "Time: 1:00 PM - 4:00 PM (3 hours)" },
      { icon: "?��", text: isZhTW ? "線�??�播＋實?�練�? : "Live streaming + practical exercises" },
      { icon: "?��", text: isZhTW ? "小班?�學｜�???25 �? : "Small Class Teaching | Limited to 25 seats" },
      { icon: "??, text: isZhTW ? "?�費Perplexity Pro試用1?��?" : "Free Perplexity Pro trial for 1 month" },
      { icon: "??", text: isZhTW ? "?�鳥?��?$2,800 (?�價 $3,500)" : "Early Bird Price: $2,800 (Original $3,500)" }
    ],
    note: isZhTW ? "?��??�人?��??��?機�????" : "Search expert crash course, rare opportunity"
  };

  // ?�格信息
  const pricingInfo = {
    series: isZhTW ? "?��?工具專精?? : "Search Tools Specialty Price",
    price: "$2,800",
    originalPrice: "$3,500",
    aiInOne: isZhTW ? "AI in one 學員?? : "AI in one Student Price",
    studentPrice: "$2,200",
    enterprise: isZhTW ? "企業資�??��??��??��?" : "Corporate data search training program"
  };

  // 課�??�色
  const courseFeatures = [
    {
      icon: <Search className="w-12 h-12 text-orange-400 mx-auto" />,
      title: isZhTW ? "高�??��??��? : "Advanced Search Techniques",
      description: isZhTW ? "?�握Perplexity?��??��?尋�??��??��? : "Master all Perplexity search functions and techniques",
      highlight: isZhTW ? "?��?專精" : "Search Specialization"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "資�??��??��?" : "Data Analysis Skills",
      description: isZhTW ? "學�?從�?尋�??�中?��??�價?��?資�?" : "Learn to extract valuable information from search results",
      highlight: isZhTW ? "?��?洞�?" : "Data Insights"
    },
    {
      icon: <FileText className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "學�??�究?�用" : "Academic Research Application",
      description: isZhTW ? "?�用AI?��?工具?��?專業學�??�究" : "Apply AI search tools for professional academic research",
      highlight: isZhTW ? "學�?專業" : "Academic Professional"
    },
    {
      icon: <Eye className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?�業?�報?��?" : "Business Intelligence Gathering",
      description: isZhTW ? "?�用AI?��??��?市場?�究?�競?��??? : "Use AI search for market research and competitive analysis",
      highlight: isZhTW ? "?�業洞�?" : "Business Insights"
    }
  ];

  // ?��?學員
  const targetAudience = {
    title: isZhTW ? "?��?人適?�學習Perplexity工具課�?�? : "Who Should Take This Perplexity Tools Course?",
    description: isZhTW ? "?��?你是學�??�究?�、�?業�??�師?�是?�容?��??��??��?課�??�能幫助你�??�AI?��??�核心�??��?大�??��?資�??��??��??��??��? : "Whether you're an academic researcher, business analyst, or content creator, this course helps you master core AI search skills and dramatically improve information gathering and analysis efficiency.",
    audiences: [
      {
        icon: <BookOpen className="w-8 h-8 text-orange-400" />,
        title: isZhTW ? "學�??�究?? : "Academic Researchers",
        description: isZhTW ? "學�??��??�、�?究員等�?要進�??�獻?��??�學術�?究�?人員" : "Students, professors, researchers who need to conduct literature searches and academic research"
      },
      {
        icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "?�業?��?�? : "Business Analysts",
        description: isZhTW ? "市場?�究?�、�?業顧?�、�?資�??�師等�?要深度�??��?察�?專業人士" : "Market researchers, business consultants, investment analysts who need deep market insights"
      },
      {
        icon: <FileText className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "?�容?��??? : "Content Creators",
        description: isZhTW ? "記者、�?家、部?�客等�?要快?�收?��?確�?訊�??�容工�??? : "Journalists, writers, bloggers who need to quickly gather accurate information for content work"
      },
      {
        icon: <Users className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "專業工�??? : "Professional Workers",
        description: isZhTW ? "律師?�醫?�、顧?��??�要�??��?訊�?尋能?��?專業人士" : "Lawyers, doctors, consultants who need efficient information search capabilities"
      }
    ]
  };

  // FAQ?��?
  const faqData = [
    {
      question: isZhTW ? "?�否?�要�?Perplexity Pro帳戶�? : "Do I need a Perplexity Pro account?",
      answer: isZhTW ? "不�?要�?課�??�含1?��??�費Pro試用，�?你�?驗�??��?級�??�。課程�??��?如�??�大�??�費?�本?�使?��??��? : "No! The course includes a 1-month free Pro trial for you to experience all premium features. We'll teach you how to maximize the free version's effectiveness."
    },
    {
      question: isZhTW ? "?�個課程適?��?究新?��?�? : "Is this course suitable for research beginners?",
      answer: isZhTW ? "絕�??��?！課程�??��??��??��?，逐步?��?高�??�巧。無論�??�學?�、�?究員?�是?�業人士，都?�快?��??��? : "Absolutely! The course starts from basic search and gradually teaches advanced techniques. Whether you're a student, researcher, or business professional, you can quickly get started."
    },
    {
      question: isZhTW ? "課�?結�?後�??�獲得�?麼支?��?" : "What support will I receive after the course?",
      answer: isZhTW ? "你�??��??��?模板庫、�?佳實踐�??��?並�??��??��??��?專家交�?群�?，�?續學習�??��??��??�巧�? : "You'll receive a search template library, best practices guide, and join our search expert community group for continuous learning of the latest search techniques."
    },
    {
      question: isZhTW ? "Perplexity?�Google?��??��?麼�??��?" : "What's the difference between Perplexity and Google search?",
      answer: isZhTW ? "Perplexity?�AI驅�??��?尋�??��??��?供更精�??��?案�?來�?引用?��??��??��?如�?結�??�者�??�勢，進�??��??��?資�??��??? : "Perplexity is an AI-powered search engine that provides more precise answers and source citations. We'll teach you how to combine the advantages of both for more effective information search."
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
    window.open('https://wa.me/85298765432?text=?�想了解Perplexity工具?�課�?, '_blank');
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