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
  Users,
  Globe,
  Award
} from 'lucide-react';

const PromptEngineeringOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // èª²ç??ºæœ¬ä¿¡æ¯
  const courseInfo = {
    badge: isZhTW ? "AI ä¸»é??? : "AI Master Class",
    title: isZhTW ? "?AI ä¸»é??­ã€?å°æ? ?‹æ??‹æ?ä½ ä?æ­¥æ­¥?šå‡º?ç?æ­?”¨å¾—ã€æ?æ©?AI Appï¼? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
    subtitle: isZhTW ? "3å°æ?å®Œæ??©å€‹æ?æ©?Appï¼Œå«?»å…¥+?²ç«¯è³‡æ?åº?AI?Ÿèƒ½ï¼ã€ŠAI App MVP å¯¦æˆ°?­ã€‹ç”±?¶é?å§‹ï??‹æ??‹æ?ä½ å»ºæ§‹å?ä¸­å??°ï?è®“ä?å¸¶èµ°æ­·ç·´ç¡¬ç·¨ç¢¼è?æ¨¡ç??? : "Complete 2 mobile apps in 3 hours, including login + cloud database + AI features! 'AI App MVP Bootcamp' from zero to hero, step-by-step guidance to build frontend, middleware, and backend.",
    instructor: "Kenneth | AI ?ç¤ºå·¥ç?å°ˆå®¶",
    instructorTitle: isZhTW ? "?€è²´å?å¸? : "Premium Instructor"
  };

  // èª²ç?çµ±è?
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

  // èª²ç?è³‡è?æ¨™ç±¤
  const courseInfoTags = [
    { name: isZhTW ? "?å­¸?…å??? : "Beginner Friendly", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "ä¸­æ??ˆèª²" : "Chinese Instruction", icon: <Globe className="w-4 h-4 text-blue-400" />, status: 'available' as const },
    { name: isZhTW ? "å¯¦æˆ°ç·´ç?" : "Hands-on Practice", icon: <Target className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "å°ç­?™å­¸" : "Small Class", icon: <Users className="w-4 h-4 text-purple-400" />, status: 'featured' as const },
    { name: isZhTW ? "ç·šä??´æ’­" : "Live Online", icon: <Monitor className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "çµ‚èº«?ç?" : "Lifetime Access", icon: <Repeat className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "è­‰æ›¸?’ç™¼" : "Certificate", icon: <Award className="w-4 h-4 text-cyan-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "AI?©æ??¯æ´" : "AI Assistant", icon: <Brain className="w-4 h-4 text-indigo-400" />, status: 'available' as const },
    { name: isZhTW ? "ç¤¾ç¾¤?¯æ´" : "Community Support", icon: <Heart className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // ?¯é¸èª²ç?
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

  // ?€?°æ???  const latestNews = {
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

  // ?¹æ ¼ä¿¡æ¯
  const pricingInfo = {
    series: isZhTW ? "?¨ç³»?—å„ª? åƒ¹" : "Full Series Special Price",
    price: "$4,500",
    originalPrice: "$5,250",
    aiInOne: isZhTW ? "AI in one å­¸å“¡?? : "AI in one Student Price",
    studentPrice: "$3,500",
    enterprise: isZhTW ? "?‘å€‘äº¦?ä?ä¼æ¥­?¹è??å?" : "We also provide enterprise training services"
  };

  // èª²ç??¹è‰²
  const courseFeatures = [
    {
      icon: <Brain className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "?ºæ…§?ç¤ºè¨­è?" : "Smart Prompt Design",
      description: isZhTW ? "å­¸æ?è¨­è?ç²¾ç¢º?„AI?ç¤ºï¼Œè?AIè¼¸å‡º?´ç¬¦?ˆé?æ±? : "Learn to design precise AI prompts for better outputs",
      highlight: isZhTW ? "?ç¤º?ªå?" : "Prompt Optimization"
    },
    {
      icon: <Target className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "?´æ™¯?–æ??? : "Scenario-based Applications",
      description: isZhTW ? "æ¶µè??†æ¥­?å‰µ?ã€æ?è¡“ç?å¤šç¨®å¯¦é??‰ç”¨?´æ™¯" : "Covering business, creative, and technical application scenarios",
      highlight: isZhTW ? "å¯¦æˆ°å°å?" : "Practical Focus"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto" />,
      title: isZhTW ? "?µæ?çªç ´" : "Creative Breakthroughs",
      description: isZhTW ? "?Œæ¡æ¿€?¼AI?µæ?æ½›èƒ½?„æ?ç¤ºæ?å·? : "Master prompt techniques to unlock AI's creative potential",
      highlight: isZhTW ? "?µæ–°?ç¶­" : "Innovative Thinking"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?ˆç??å?" : "Efficiency Enhancement",
      description: isZhTW ? "å­¸ç?å¿«é€Ÿè¿­ä»???ªå??ç¤º?„æ–¹æ³? : "Learn methods for rapid iteration and prompt optimization",
      highlight: isZhTW ? "å¿«é€Ÿè¿­ä»? : "Rapid Iteration"
    }
  ];

  // ?®æ?å­¸å“¡
  const targetAudience = {
    title: isZhTW ? "?ªä?äººé©?ˆå­¸ç¿’é€™é?èª²ç?ï¼? : "Who Should Take This Course?",
    description: isZhTW ? "?¡è?ä½ æ˜¯AI?°æ??„æ˜¯?‰ç?é©—ç??¨æˆ¶ï¼Œé€™é?èª²ç??½èƒ½å¹«åŠ©ä½ æ??¡æ?ç¤ºå·¥ç¨‹ç??¸å??€?½ï??å?AIä½¿ç”¨?ˆç??? : "Whether you're an AI beginner or experienced user, this course will help you master prompt engineering skills and improve AI usage efficiency.",
    audiences: [
      {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "AIå·¥å…·ä½¿ç”¨?? : "AI Tool Users",
        description: isZhTW ? "å¸Œæ??´æ??ˆåœ°ä½¿ç”¨ChatGPT?Claudeç­‰AIå·¥å…·?„ç”¨?? : "Users who want to use ChatGPT, Claude and other AI tools more effectively"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "?µæ?å·¥ä??? : "Creative Workers",
        description: isZhTW ? "è¨­è?å¸«ã€ä?å®¶ã€ç??·äºº?¡ç??€è¦å‰µ?è¼¸?ºç?å°ˆæ¥­äººå£«" : "Designers, writers, marketers and other professionals who need creative output"
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "?†æ¥­å°ˆæ¥­äººå£«" : "Business Professionals",
        description: isZhTW ? "ä¼æ¥­ç®¡ç??…ã€å??å¸«?é¡§?ç??€è¦æ??‡å·¥ä½œæ??‡ç?äººå£«" : "Business managers, analysts, consultants who need to improve work efficiency"
      },
      {
        icon: <Code className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "?€è¡“é??¼è€? : "Technical Developers",
        description: isZhTW ? "ç¨‹å?è¨­è?å¸«ã€ç”¢?ç??†ç??€è¦æ•´?ˆAI?½å??„æ?è¡“äºº?? : "Programmers, product managers who need to integrate AI capabilities"
      }
    ]
  };

  // FAQ?¸æ?
  const faqData = [
    {
      question: isZhTW ? "?™é?èª²ç??©å?å®Œå…¨æ²’æ?AIç¶“é??„äºº?ï?" : "Is this course suitable for people with no AI experience?",
      answer: isZhTW ? "çµ•å??©å?ï¼æ??‘å??ºç?æ¦‚å¿µ?‹å?ï¼Œå¾ªåºæ¼¸?²åœ°ä»‹ç´¹?ç¤ºå·¥ç??„æ ¸å¿ƒæ??½ã€‚ç„¡è«–ä??¯å¦?‰æ?è¡“è??¯ï??½èƒ½è¼•é?è·Ÿä?èª²ç??§å®¹?? : "Absolutely! We start with basic concepts and gradually introduce core prompt engineering skills. Whether you have a technical background or not, you can easily follow the course content."
    },
    {
      question: isZhTW ? "å®Œæ?èª²ç?å¾Œæ??½ç²å¾—ä?éº¼èƒ½?›ï?" : "What abilities will I gain after completing the course?",
      answer: isZhTW ? "ä½ å??Œæ¡è¨­è??‰æ??ç¤º?„æ?å·§ï??½å?è®“AI?¢ç??´ç²¾æº–ç??æ?ï¼Œæ??‡å·¥ä½œæ??‡ï?ä¸¦èƒ½?‰ç”¨?°å?ç¨®å¯¦?›å ´?¯ä¸­?? : "You'll master effective prompt design techniques, enabling AI to generate more precise responses, improve work efficiency, and apply these skills to various real-world scenarios."
    },
    {
      question: isZhTW ? "?™é?èª²ç??‡å…¶ä»–AIèª²ç??‰ä?éº¼ä??Œï?" : "What makes this course different from other AI courses?",
      answer: isZhTW ? "?‘å€‘å?æ³¨æ–¼?ç¤ºå·¥ç??™ä??¸å??€?½ï??ä?å¯¦æˆ°?–ç?è¨“ç·´?¹æ?ï¼Œè?ä½ èƒ½ç«‹å³?‰ç”¨?€å­¸çŸ¥è­˜åˆ°å¯¦é?å·¥ä?ä¸­ã€? : "We focus on prompt engineering as a core skill, providing practical training methods that allow you to immediately apply what you learn to actual work."
    },
    {
      question: isZhTW ? "èª²ç??¯å¦?…å«å¯¦é?ç·´ç?ï¼? : "Does the course include practical exercises?",
      answer: isZhTW ? "?¯ç?ï¼èª²ç¨‹å??«å¤§?å¯¦?°ç·´ç¿’ï?æ¶µè?ä¸å?è¡Œæ¥­?Œæ??¨å ´?¯ï?è®“ä??¨å?ä¸­å­¸ï¼Œç?æ­???¡æ?ç¤ºå·¥ç¨‹æ??½ã€? : "Yes! The course includes extensive practical exercises covering different industries and application scenarios, allowing you to learn by doing and truly master prompt engineering skills."
    }
  ];

  // ?èª¿?½æ•¸
  const handleStartLearning = () => {
    navigate('/courses/prompt-engineering-learning');
  };

  const handleRegister = () => {
    // å°èˆª?°èª²ç¨‹å ±?é???    navigate('/courses/registration', {
      state: {
        courseTitle: courseInfo.title,
        coursePrice: pricingInfo.price,
        courseId: 'prompt-engineering'
      }
    });
  };

  const handleWhatsApp = () => {
    // ?“é?WhatsApp?¯çµ¡
    window.open('https://wa.me/85298765432?text=?‘æƒ³äº†è§£Prompt Engineeringèª²ç?', '_blank');
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

export default PromptEngineeringOutline; 
