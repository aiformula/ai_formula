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

  // èª²ç??ºæœ¬ä¿¡æ¯
  const courseInfo = {
    badge: isZhTW ? "Perplexity å·¥å…·?? : "Perplexity Tools Class",
    title: isZhTW ? "?Perplexity å·¥å…·?­ã€?å°æ? ?ç‚ºAI?œå??”ç©¶?è?ç´šå?å®¶ã€ï?" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
    subtitle: isZhTW ? "3å°æ?ç²¾é€šPerplexity AI?œå?å¼•æ?ï¼Œå??œå?å°ç™½?°ç?ç©¶é?äººï??Œæ¡é«˜ç??œå??€å·§ã€è??™å??ã€å­¸è¡“ç?ç©¶ã€å?æ¥­èª¿?¥ï?è®“ä??„æ?å°‹æ??‡æ???000%?? : "Master Perplexity AI search engine in 3 hours, from search novice to research expert! Master advanced search techniques, data analysis, academic research, business investigation.",
    instructor: "Jason | å°ˆæ¥­?‹ç™¼?‡è‡ª?•å?å°ˆå®¶",
    instructorTitle: isZhTW ? "å°ˆæ¥­å°å¸«" : "Professional Instructor"
  };

  // èª²ç?çµ±è?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "å­¸ç??‚æ•¸" : "Learning Hours",
      value: isZhTW ? "3å°æ?" : "3 Hours"
    },
    {
      icon: <Search className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "èª²ç??¸é?" : "Course Modules",
      value: isZhTW ? "2?? : "2 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-orange-400" />,
      label: isZhTW ? "å­¸ç?ç¦åˆ©" : "Learning Benefits",
      value: isZhTW ? "Proå¸³æˆ¶è©¦ç”¨ï¼‹æ?å°‹æ¨¡?¿ï?å°ˆå®¶ç¾¤ç?" : "Pro account trial + search templates + expert group"
    }
  ];

  // èª²ç?è³‡è?æ¨™ç±¤
  const courseInfoTags = [
    { name: isZhTW ? "?œå??°æ??¯å­¸" : "Search Beginner OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "?è²»è©¦ç”¨" : "Free Trial", icon: <Search className="w-4 h-4 text-blue-400" />, status: 'featured' as const },
    { name: isZhTW ? "å­¸è??”ç©¶" : "Academic Research", icon: <BookOpen className="w-4 h-4 text-purple-400" />, status: 'available' as const },
    { name: isZhTW ? "?†æ¥­?†æ?" : "Business Analysis", icon: <BarChart3 className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "?œå?æ¨¡æ¿" : "Search Templates", icon: <FileText className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "å°ˆå®¶ç¾¤ç?" : "Expert Group", icon: <Users className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "é«˜ç??Ÿèƒ½" : "Advanced Features", icon: <Filter className="w-4 h-4 text-indigo-400" />, status: 'available' as const },
    { name: isZhTW ? "å¯¦æ??´æ–°" : "Real-time Updates", icon: <TrendingUp className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "AIæ´å?" : "AI Insights", icon: <Brain className="w-4 h-4 text-red-400" />, status: 'coming-soon' as const }
  ];

  // ?¯é¸èª²ç?
  const availableCourses = [
    {
      title: isZhTW ? "?ChatGPT ç²¾é€šç­??å°æ? ?Œæ¡AIå°è©±?è??ç‚º?ç?æ­??å®¶ã€ï?" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
      description: isZhTW ? "æ·±åº¦?Œæ¡ChatGPTå°è©±?€å·§å??†æ¥­?‰ç”¨" : "Deep mastery of ChatGPT conversation skills and business applications",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "?AI ä¸»é??­ã€?å°æ? ?‹æ??‹æ?ä½ ä?æ­¥æ­¥?šå‡º?ç?æ­?”¨å¾—ã€æ?æ©?AI Appï¼? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "å­¸ç?å»ºæ?å¯¦ç”¨?„AI?‹æ??‰ç”¨ç¨‹å?" : "Learn to build practical AI mobile applications",
      color: "orange" as const,
      available: true
    }
  ];

  // ?€?°æ???  const latestNews = {
    date: "2025å¹???0??,
    title: isZhTW ? "8??5?¥Perplexityå·¥å…·?­é?èª²ï??œå?å°ˆå®¶é¤Šæ?è¨ˆç•«" : "August 15th Perplexity Tools Class, Search Expert Development Program",
    details: [
      { icon: "??", text: isZhTW ? "?¥æ?ï¼?025å¹???5??(?Ÿæ?äº?" : "Date: August 15, 2025 (Friday)" },
      { icon: "??", text: isZhTW ? "?‚é?ï¼šä???1:00 - 4:00 (3å°æ?)" : "Time: 1:00 PM - 4:00 PM (3 hours)" },
      { icon: "?¯", text: isZhTW ? "ç·šä??´æ’­ï¼‹å¯¦?°ç·´ç¿? : "Live streaming + practical exercises" },
      { icon: "?‘¥", text: isZhTW ? "å°ç­?™å­¸ï½œå???25 ä½? : "Small Class Teaching | Limited to 25 seats" },
      { icon: "??, text: isZhTW ? "?è²»Perplexity Proè©¦ç”¨1?‹æ?" : "Free Perplexity Pro trial for 1 month" },
      { icon: "??", text: isZhTW ? "?©é³¥?¹ï?$2,800 (?Ÿåƒ¹ $3,500)" : "Early Bird Price: $2,800 (Original $3,500)" }
    ],
    note: isZhTW ? "?œå??”äºº?Ÿæ??­ï?æ©Ÿæ????" : "Search expert crash course, rare opportunity"
  };

  // ?¹æ ¼ä¿¡æ¯
  const pricingInfo = {
    series: isZhTW ? "?œå?å·¥å…·å°ˆç²¾?? : "Search Tools Specialty Price",
    price: "$2,800",
    originalPrice: "$3,500",
    aiInOne: isZhTW ? "AI in one å­¸å“¡?? : "AI in one Student Price",
    studentPrice: "$2,200",
    enterprise: isZhTW ? "ä¼æ¥­è³‡æ??œå??¹è??¹æ?" : "Corporate data search training program"
  };

  // èª²ç??¹è‰²
  const courseFeatures = [
    {
      icon: <Search className="w-12 h-12 text-orange-400 mx-auto" />,
      title: isZhTW ? "é«˜ç??œå??€å·? : "Advanced Search Techniques",
      description: isZhTW ? "?Œæ¡Perplexity?„æ??‰æ?å°‹å??½å??€å·? : "Master all Perplexity search functions and techniques",
      highlight: isZhTW ? "?œå?å°ˆç²¾" : "Search Specialization"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "è³‡æ??†æ??½å?" : "Data Analysis Skills",
      description: isZhTW ? "å­¸æ?å¾æ?å°‹ç??œä¸­?å??‰åƒ¹?¼ç?è³‡è?" : "Learn to extract valuable information from search results",
      highlight: isZhTW ? "?¸æ?æ´å?" : "Data Insights"
    },
    {
      icon: <FileText className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "å­¸è??”ç©¶?‰ç”¨" : "Academic Research Application",
      description: isZhTW ? "?‰ç”¨AI?œå?å·¥å…·?²è?å°ˆæ¥­å­¸è??”ç©¶" : "Apply AI search tools for professional academic research",
      highlight: isZhTW ? "å­¸è?å°ˆæ¥­" : "Academic Professional"
    },
    {
      icon: <Eye className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?†æ¥­?…å ±?¶é?" : "Business Intelligence Gathering",
      description: isZhTW ? "?©ç”¨AI?œå??²è?å¸‚å ´?”ç©¶?Œç«¶?­å??? : "Use AI search for market research and competitive analysis",
      highlight: isZhTW ? "?†æ¥­æ´å?" : "Business Insights"
    }
  ];

  // ?®æ?å­¸å“¡
  const targetAudience = {
    title: isZhTW ? "?ªä?äººé©?ˆå­¸ç¿’Perplexityå·¥å…·èª²ç?ï¼? : "Who Should Take This Perplexity Tools Course?",
    description: isZhTW ? "?¡è?ä½ æ˜¯å­¸è??”ç©¶?…ã€å?æ¥­å??å¸«?„æ˜¯?§å®¹?µä??…ï??™é?èª²ç??½èƒ½å¹«åŠ©ä½ æ??¡AI?œå??„æ ¸å¿ƒæ??½ï?å¤§å??å?è³‡è??œé??Œå??æ??‡ã€? : "Whether you're an academic researcher, business analyst, or content creator, this course helps you master core AI search skills and dramatically improve information gathering and analysis efficiency.",
    audiences: [
      {
        icon: <BookOpen className="w-8 h-8 text-orange-400" />,
        title: isZhTW ? "å­¸è??”ç©¶?? : "Academic Researchers",
        description: isZhTW ? "å­¸ç??æ??ˆã€ç?ç©¶å“¡ç­‰é?è¦é€²è??‡ç»?œå??Œå­¸è¡“ç?ç©¶ç?äººå“¡" : "Students, professors, researchers who need to conduct literature searches and academic research"
      },
      {
        icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "?†æ¥­?†æ?å¸? : "Business Analysts",
        description: isZhTW ? "å¸‚å ´?”ç©¶?¡ã€å?æ¥­é¡§?ã€æ?è³‡å??å¸«ç­‰é?è¦æ·±åº¦å??´æ?å¯Ÿç?å°ˆæ¥­äººå£«" : "Market researchers, business consultants, investment analysts who need deep market insights"
      },
      {
        icon: <FileText className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "?§å®¹?µä??? : "Content Creators",
        description: isZhTW ? "è¨˜è€…ã€ä?å®¶ã€éƒ¨?½å®¢ç­‰é?è¦å¿«?Ÿæ”¶?†æ?ç¢ºè?è¨Šç??§å®¹å·¥ä??? : "Journalists, writers, bloggers who need to quickly gather accurate information for content work"
      },
      {
        icon: <Users className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "å°ˆæ¥­å·¥ä??? : "Professional Workers",
        description: isZhTW ? "å¾‹å¸«?é†«?Ÿã€é¡§?ç??€è¦é??ˆè?è¨Šæ?å°‹èƒ½?›ç?å°ˆæ¥­äººå£«" : "Lawyers, doctors, consultants who need efficient information search capabilities"
      }
    ]
  };

  // FAQ?¸æ?
  const faqData = [
    {
      question: isZhTW ? "?¯å¦?€è¦æ?Perplexity Proå¸³æˆ¶ï¼? : "Do I need a Perplexity Pro account?",
      answer: isZhTW ? "ä¸é?è¦ï?èª²ç??…å«1?‹æ??è²»Proè©¦ç”¨ï¼Œè?ä½ é?é©—æ??‰é?ç´šå??½ã€‚èª²ç¨‹æ??™ä?å¦‚ä??€å¤§å??è²»?ˆæœ¬?„ä½¿?¨æ??œã€? : "No! The course includes a 1-month free Pro trial for you to experience all premium features. We'll teach you how to maximize the free version's effectiveness."
    },
    {
      question: isZhTW ? "?™å€‹èª²ç¨‹é©?ˆç?ç©¶æ–°?‹å?ï¼? : "Is this course suitable for research beginners?",
      answer: isZhTW ? "çµ•å??©å?ï¼èª²ç¨‹å??ºç??œå??‹å?ï¼Œé€æ­¥?™æ?é«˜ç??€å·§ã€‚ç„¡è«–ä??¯å­¸?Ÿã€ç?ç©¶å“¡?„æ˜¯?†æ¥­äººå£«ï¼Œéƒ½?½å¿«?Ÿä??‹ã€? : "Absolutely! The course starts from basic search and gradually teaches advanced techniques. Whether you're a student, researcher, or business professional, you can quickly get started."
    },
    {
      question: isZhTW ? "èª²ç?çµæ?å¾Œé??½ç²å¾—ä?éº¼æ”¯?´ï?" : "What support will I receive after the course?",
      answer: isZhTW ? "ä½ å??²å??œå?æ¨¡æ¿åº«ã€æ?ä½³å¯¦è¸æ??—ï?ä¸¦å??¥æ??‘ç??œå?å°ˆå®¶äº¤æ?ç¾¤ç?ï¼Œæ?çºŒå­¸ç¿’æ??°ç??œå??€å·§ã€? : "You'll receive a search template library, best practices guide, and join our search expert community group for continuous learning of the latest search techniques."
    },
    {
      question: isZhTW ? "Perplexity?‡Google?œå??‰ä?éº¼ä??Œï?" : "What's the difference between Perplexity and Google search?",
      answer: isZhTW ? "Perplexity?¯AIé©…å??„æ?å°‹å??ï??½æ?ä¾›æ›´ç²¾æ??„ç?æ¡ˆå?ä¾†æ?å¼•ç”¨?‚æ??‘æ??™ä?å¦‚ä?çµå??©è€…ç??ªå‹¢ï¼Œé€²è??´æ??ˆç?è³‡è??œå??? : "Perplexity is an AI-powered search engine that provides more precise answers and source citations. We'll teach you how to combine the advantages of both for more effective information search."
    }
  ];

  // ?èª¿?½æ•¸
  const handleStartLearning = () => {
    navigate('/courses/free-plan');
  };

  const handleRegister = () => {
    // å°èˆª?°èª²ç¨‹å­¸ç¿’é???    navigate('/courses/free-plan');
  };

  const handleWhatsApp = () => {
    // ?“é?WhatsApp?¯çµ¡
    window.open('https://wa.me/85298765432?text=?‘æƒ³äº†è§£Perplexityå·¥å…·?­èª²ç¨?, '_blank');
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