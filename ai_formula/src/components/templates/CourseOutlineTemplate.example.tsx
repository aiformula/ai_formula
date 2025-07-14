// ?¯ CourseOutlineTemplate ä½¿ç”¨ç¯„ä?
// ?? ?™å€‹æ?ä»¶å?ç¤ºé?æ¨?”¨?°å?CourseOutlineTemplate

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

  // ?? Step 1: å®šç¾©èª²ç??ºæœ¬ä¿¡æ¯
  const courseInfo = {
    badge: isZhTW ? "AI ä¸»é??? : "AI Master Class",
    title: isZhTW ? "?AI ä¸»é??­ã€?å°æ? ?‹æ??‹æ?ä½ ä?æ­¥æ­¥?šå‡º?ç?æ­?”¨å¾—ã€æ?æ©?AI Appï¼? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
    subtitle: isZhTW ? "3å°æ?å®Œæ??©å€‹æ?æ©?Appï¼Œå«?»å…¥+?²ç«¯è³‡æ?åº?AI?Ÿèƒ½ï¼ã€ŠAI App MVP å¯¦æˆ°?­ã€‹ç”±?¶é?å§‹ï??‹æ??‹æ?ä½ å»ºæ§‹å?ä¸­å??°ï?è®“ä?å¸¶èµ°æ­·ç·´ç¡¬ç·¨ç¢¼è?æ¨¡ç??? : "Complete 2 mobile apps in 3 hours, including login + cloud database + AI features! 'AI App MVP Bootcamp' from zero to hero.",
    instructor: "Calpa Liu | ?¨ç«¯å·¥ç?å¸?,
    instructorTitle: isZhTW ? "?€è²´å?å¸? : "Premium Instructor"
  };

  // ?? Step 2: å®šç¾©èª²ç?çµ±è?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "å­¸ç??‚æ•¸" : "Learning Hours",
      value: isZhTW ? "3å°æ?" : "3 Hours"
    },
    {
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "èª²ç??¸é?" : "Course Modules",
      value: isZhTW ? "1?? : "1 Module"
    },
    {
      icon: <Repeat className="w-6 h-6 text-blue-400" />,
      label: isZhTW ? "å­¸ç?ç¦åˆ©" : "Learning Benefits",
      value: isZhTW ? "ä¸€æ¬¡å ±?ï??¯é?è¤‡å??‡å¯¦é«”èª²ç¨‹ï?æ°¸ä?ç·šä??æº«" : "One registration, unlimited physical + online access"
    }
  ];

  // ?·ï¸?Step 3: å®šç¾©è¡Œæ¥­æ¨™ç±¤
  const industryTags = [
    { name: isZhTW ? "?¥å¸¸?Ÿæ´»" : "Daily Life", icon: <Lightbulb className="w-4 h-4" />, available: true },
    { name: isZhTW ? "ä¿éšªæ¥? : "Insurance", icon: <Shield className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?¶å”®æ¥? : "Retail", icon: <Star className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?‘è?æ¥? : "Finance", icon: <TrendingUp className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?™è‚²æ¥? : "Education", icon: <BookOpen className="w-4 h-4" />, available: false },
    { name: isZhTW ? "?«ç?æ¥? : "Healthcare", icon: <Heart className="w-4 h-4" />, available: false }
  ];

  // ?? Step 4: å®šç¾©?¯é¸èª²ç?
  const availableCourses = [
    {
      title: isZhTW ? "?ç·¨ç¨‹åŸºç¤ç­??å°æ? ?¶åŸºç¤å­¸?ƒã€ç?æ­?¯¦?¨ã€ç?ç¨‹å?è¨­è?ï¼? : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
      description: isZhTW ? "?¶åŸºç¤å­¸?ƒç?å¼è¨­è¨ˆç?å®Œæ•´èª²ç?" : "Complete course for learning programming from zero",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "?Perplexity å·¥å…·?­ã€?å°æ? ?ç‚ºAI?œå??”ç©¶?è?ç´šå?å®¶ã€ï?" : "'Perplexity Tools Class' 3 Hours Become AI Search Research 'Super Expert'!",
      description: isZhTW ? "?Œæ¡AI?œå?å·¥å…·?„å?æ¥­æ??? : "Master professional skills of AI search tools",
      color: "orange" as const,
      available: true
    }
  ];

  // ?“° Step 5: å®šç¾©?€?°æ???
  const latestNews = {
    date: "2025å¹???0??,
    title: isZhTW ? "8??4?¥ç¾?´é??­ï??æ??±å??ªæ?ä¸? : "August 24th Live Class, Limited Time Registration Offer",
    details: [
      { icon: "??", text: isZhTW ? "?¥æ?ï¼?025å¹???4??(?Ÿæ???" : "Date: August 24, 2025 (Sunday)" },
      { icon: "??", text: isZhTW ? "?‚é?ï¼šä???2:30 - 5:30 (3å°æ?)" : "Time: 2:30 PM - 5:30 PM (3 hours)" },
      { icon: "?¯", text: isZhTW ? "å¯¦é??™å­¸+ç·šä??Œæ­¥ (?±ç«¯)" : "Physical + Online Sync (Registration)" },
      { icon: "?‘¥", text: isZhTW ? "å°ç­å¯¦ä??™å­¸ï½œå???15 ä½? : "Small Class Hands-on Teaching | Limited to 15 seats" },
      { icon: "??, text: isZhTW ? "å°å¸«?³å ´?‡å?ï¼Œè¦ª?‹å???App ?å?" : "Instructor guidance, hands-on App completion" },
      { icon: "??", text: isZhTW ? "?©é³¥?ªæ??¹ï?$4,500 (?Ÿåƒ¹ $5,350)" : "Early Bird Price: $4,500 (Original $5,350)" }
    ],
    note: isZhTW ? "?é??‰é?ï¼Œå ±?å³æ­? : "Limited seats, register now"
  };

  // ?’° Step 6: å®šç¾©?¹æ ¼ä¿¡æ¯
  const pricingInfo = {
    series: isZhTW ? "?¨ç³»?—å„ª? åƒ¹" : "Full Series Special Price",
    price: "$4,500",
    originalPrice: "$5,250",
    aiInOne: isZhTW ? "AI in one å­¸å“¡?? : "AI in one Student Price",
    studentPrice: "$3,500",
    enterprise: isZhTW ? "?‘å€‘äº¦?ä?ä¼æ¥­?¹è??å?" : "We also provide enterprise training services"
  };

  // ?? Step 7: å®šç¾©èª²ç??¹è‰²
  const courseFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: isZhTW ? "AI ?€è¡“æ•´?? : "AI Technology Integration",
      description: isZhTW ? "å­¸ç??€??AI ?€è¡“æ•´?ˆåˆ°?‹æ??‰ç”¨" : "Learn to integrate latest AI technology into mobile apps",
      highlight: isZhTW ? "ChatGPT API" : "ChatGPT API"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: isZhTW ? "?‹æ? App ?‹ç™¼" : "Mobile App Development",
      description: isZhTW ? "å¾é›¶?‹å?å»ºæ?å®Œæ•´?„æ?æ©Ÿæ??¨ç?å¼? : "Build complete mobile applications from scratch",
      highlight: isZhTW ? "React Native" : "React Native"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "?²ç«¯è³‡æ?åº? : "Cloud Database",
      description: isZhTW ? "?´å??²ç«¯è³‡æ?åº«è??¨æˆ¶èªè?ç³»çµ±" : "Integrate cloud database and user authentication",
      highlight: isZhTW ? "Firebase" : "Firebase"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "å°ç­?™å­¸" : "Small Class Teaching",
      description: isZhTW ? "?åˆ¶15äººï?ç¢ºä?æ¯ä?å­¸å“¡?½èƒ½å®Œæ?" : "Limited to 15 students, ensure everyone completes",
      highlight: isZhTW ? "1å°??‡å?" : "1-on-1 Guidance"
    }
  ];

  // ??Step 8: å®šç¾©FAQ
  const faqData = [
    {
      question: isZhTW ? "?‘å ±?å?ï¼Œå¯ä»¥ç„¡?é?è¤‡å??‡å¯¦é«”èª²ç¨‹ï?" : "After registration, can I attend physical classes unlimited times?",
      answer: isZhTW ? "?¯ç?ï¼æ??‘æ‰¿è«¾ç‚º?±èª²å®Œæ•´èª²ç??„å­¸?¡æ?ä¾›å?å¹´å…§?¡é?æ¬¡å?? å?èª²ç??„å??‡ï?ç¢ºä?ä½ æ??…è¶³?„æ??“æ·±?¥å­¸ç¿’ï??Œæ¡æ¯ä??…æ??½ã€? : "Yes! We promise students who complete the full course can attend the same course unlimited times within half a year."
    },
    {
      question: isZhTW ? "?‘å¯ä»¥ç”¨?¶ä??¹æ??¯ä?èª²ç?è²»ç”¨?ï?" : "Can I pay course fees by other methods?",
      answer: isZhTW ? "?¯ä»¥ï¼å??€?¶ä??¯ä??¹æ?ï¼Œè? WhatsApp ?‘å€‘ï??‘å€‘æ??ç‚ºä½ æ?ä¾›å??©ã€? : "Yes! If you need other payment methods, please WhatsApp us for assistance."
    },
    {
      question: isZhTW ? "èª²ç??¯å¦?ä?å­¸ç?è³‡æ?ï¼? : "Does the course provide learning materials?",
      answer: isZhTW ? "?¯ç?ï¼Œæ??‘æ?ä¾›ä??•å?å¤§æ›¸?ŒAI?©æ?ï¼Œæ•´?ˆèª²ç¨‹ç?è¨˜å?èª²å?ç­†éŸ³ï¼Œæ–¹ä¾¿æ‚¨?¨æ?è¤‡ç??? : "Yes, we provide interactive materials and AI assistants with integrated course notes."
    }
  ];

  // ?“¢ Step 9: å®šç¾©?¨å»£æ©«å?
  const promotionalBanner = {
    title: isZhTW ? "?‹æ??‹æ?ä½ ä?æ­¥æ­¥?šå‡º?ç?æ­?”¨å¾—ã€æ?æ©?AI App" : "Step-by-Step Guide to Building 'Truly Useful' Mobile AI App",
    subtitle: isZhTW ? "3å°æ?å®Œæ?ï¼šæ??ƒå“¡?»å…¥?æ?å¾Œå°ï¼‹è??™åº«=AI App" : "3 Hours Complete: Member login + Backend + Database = AI App",
    features: [
      isZhTW ? "?¨ç?è¾?AI App ?‹ç™¼å¯¦æˆ°ï¼Œé?å­¸å?ç«¯ç¾?´ï?å¯¦æˆ°?æ?ä¾‹è?çµæ??†é??´ç?" : "Full AI App development hands-on",
      isZhTW ? "å­¸æ? No-Code å·¥å…·?­å»º AI è§??ï¼Œç›®?æ­£?¨æ˜¯ç²¾ç°¡?„ä?æ¥­å·¥?·å?" : "Learn No-Code AI tools",
      isZhTW ? "?‘å€‘äº¦?‹å¥³?§ä??­æ?ï¼Œæ??¤ï??°é®®?JSON?å?æ¥­ç²¾æ¼”ï??è?ä½ æ¢è¨ªç?ç­‰ç?" : "Enterprise-level solutions"
    ],
    ctaText: "AI App MVP"
  };

  // ?¯ Step 10: å®šç¾©?èª¿?½æ•¸
  const handleStartLearning = () => {
    navigate('/courses/prompt-engineering-learning');
  };

  const handleRegister = () => {
    console.log('?¨æˆ¶é»æ??±å?');
    // ?¯ä»¥å°èˆª?°å ±?é??¢æ??“é??±å?è¡¨å–®
  };

  const handleWhatsApp = () => {
    console.log('?¨æˆ¶é»æ?WhatsApp?¥è©¢');
    // ?¯ä»¥?“é?WhatsApp?–å??ªåˆ°?¯ç¹«?é¢
  };

  // ?“± Step 11: æ¸²æ?æ¨¡æ¿
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
?¯ ä½¿ç”¨?‡å?ï¼?

1. ?? è¤‡è£½?¢å€‹æ?ä»¶åˆ°?°å?èª²ç?å¤§ç¶±?é¢
2. ?”§ ä¿®æ”¹?€?‰æ•¸??(courseInfo, courseStats, etc.)
3. ?¨ ä¿æ??¾æ??…æ¨£å¼å?çµæ?
4. ?“± ?´æ–°?èª¿?½æ•¸ (handleStartLearning, handleRegister, etc.)
5. ?? å®Œæ?ï¼ä??…æ–°èª²ç?å¤§ç¶±?é¢å°±æ??™å¥½äº?

?? ?¸æ?çµæ?ï¼?
- courseInfo: èª²ç??ºæœ¬ä¿¡æ¯
- courseStats: èª²ç?çµ±è?ï¼ˆæ??·ã€æ¨¡çµ„ã€ç??©ï?
- industryTags: è¡Œæ¥­?‰ç”¨æ¨™ç±¤
- availableCourses: ?¯é¸èª²ç?
- latestNews: ?€?°æ???
- pricingInfo: ?¹æ ¼ä¿¡æ¯
- courseFeatures: èª²ç??¹è‰²
- faqData: å¸¸è??é?
- promotionalBanner: ?¨å»£æ©«å?

?”§ ?ªå?ç¾©ï?
- ?¯é¸??onRegister ??onWhatsApp ?èª¿
- ?€?‰æ?å­—éƒ½?¯æ´ä¸­è‹±??
- ?€?‰å?æ¨™éƒ½?¯ä»¥?ªå?ç¾?
- ?€?‰é??²éƒ½?¯ä»¥?šé? Tailwind classes èª¿æ•´
*/ 