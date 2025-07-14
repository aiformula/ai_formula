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

  // èª²ç??ºæœ¬ä¿¡æ¯
  const courseInfo = {
    badge: isZhTW ? "ç·¨ç??ºç??? : "Coding Basics Class",
    title: isZhTW ? "?ç·¨ç¨‹åŸºç¤ç­??å°æ? ?¶åŸºç¤å­¸?ƒã€ç?æ­?¯¦?¨ã€ç?ç¨‹å?è¨­è?ï¼? : "'Coding Basics Class' 4 Hours Learn 'Truly Practical' Programming from Zero!",
    subtitle: isZhTW ? "4å°æ??Œæ¡ç¨‹å?è¨­è??¸å?ï¼Œå»ºæ§‹ä??„ç¬¬ä¸€?‹å??´ç¶²ç«™ï??…å«HTML+CSS+JavaScript+å¾Œç«¯?´å?ï¼Œå??´å…¨æ£§é??¼é?é©—ï?è®“ä?å¾é›¶?ºç?è®Šæ?ç¨‹å?è¨­è?å¸«ã€? : "Master programming fundamentals in 4 hours, build your first complete website! Including HTML+CSS+JavaScript+backend integration, full-stack development experience.",
    instructor: "Ken | ?ªè?æ¥­å??‹ç™¼å°ˆå®¶",
    instructorTitle: isZhTW ? "é¦–å¸­å°å¸«" : "Chief Instructor"
  };

  // èª²ç?çµ±è?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "å­¸ç??‚æ•¸" : "Learning Hours",
      value: isZhTW ? "4å°æ?" : "4 Hours"
    },
    {
      icon: <Code className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "èª²ç??¸é?" : "Course Modules",
      value: isZhTW ? "3?? : "3 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-green-400" />,
      label: isZhTW ? "å­¸ç?ç¦åˆ©" : "Learning Benefits",
      value: isZhTW ? "çµ‚èº«å­¸ç??¯æ´ï¼‹ç?å¼ç¢¼æ°¸ä?å­˜å?" : "Lifetime learning support + permanent code access"
    }
  ];

  // èª²ç?è³‡è?æ¨™ç±¤
  const courseInfoTags = [
    { name: isZhTW ? "?¶åŸºç¤å??? : "Zero Experience OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "?¨æ£§?‹ç™¼" : "Full-Stack Development", icon: <Layers className="w-4 h-4 text-blue-400" />, status: 'featured' as const },
    { name: isZhTW ? "å¯¦æˆ°?…ç›®" : "Real Projects", icon: <Zap className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "?¾ä»£å·¥å…·" : "Modern Tools", icon: <Code className="w-4 h-4 text-purple-400" />, status: 'available' as const },
    { name: isZhTW ? "äº’å??™å­¸" : "Interactive Learning", icon: <Users className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "ä½œå??? : "Portfolio Building", icon: <Globe className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "æ±‚è·?‡å?" : "Job Guidance", icon: <Briefcase className="w-4 h-4 text-indigo-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "çµ‚èº«?¯æ´" : "Lifetime Support", icon: <Heart className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "æ¥­ç?å¯¦è?" : "Industry Practice", icon: <TrendingUp className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // ?¯é¸èª²ç?
  const availableCourses = [
    {
      title: isZhTW ? "?AI ä¸»é??­ã€?å°æ? ?‹æ??‹æ?ä½ ä?æ­¥æ­¥?šå‡º?ç?æ­?”¨å¾—ã€æ?æ©?AI Appï¼? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "?²é?AI?‰ç”¨?‹ç™¼ï¼Œç??ˆç·¨ç¨‹åŸºç¤çŸ¥è­? : "Advanced AI application development, combining programming fundamentals",
      color: "green" as const,
      available: true
    },
    {
      title: isZhTW ? "?ChatGPT ç²¾é€šç­??å°æ? ?Œæ¡AIå°è©±?è??ç‚º?ç?æ­??å®¶ã€ï?" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
      description: isZhTW ? "æ·±åº¦?Œæ¡ChatGPTå°è©±?€å·§å??†æ¥­?‰ç”¨" : "Deep mastery of ChatGPT conversation skills and business applications",
      color: "orange" as const,
      available: true
    }
  ];

  // ?€?°æ???  const latestNews = {
    date: "2025å¹???5??,
    title: isZhTW ? "8??0?¥ç·¨ç¨‹åŸºç¤ç­?‹èª²ï¼Œé›¶?ºç?ç¨‹å?è¨­è??¥é?" : "August 10th Coding Basics Class, Programming for Absolute Beginners",
    details: [
      { icon: "??", text: isZhTW ? "?¥æ?ï¼?025å¹???0??(?Ÿæ???" : "Date: August 10, 2025 (Saturday)" },
      { icon: "??", text: isZhTW ? "?‚é?ï¼šä???9:00 - ä¸‹å? 1:00 (4å°æ?)" : "Time: 9:00 AM - 1:00 PM (4 hours)" },
      { icon: "?¯", text: isZhTW ? "å¯¦é??™å­¸ï¼‹ç?ä¸Šå?æ­? : "Physical teaching + online sync" },
      { icon: "?‘¥", text: isZhTW ? "å°ç­?™å­¸ï½œå???18 ä½? : "Small Class Teaching | Limited to 18 seats" },
      { icon: "??, text: isZhTW ? "å®Œæ•´ç¶²ç?å°ˆæ?å¯¦ä?ï¼Œå³å­¸å³?? : "Complete website project implementation, learn and apply immediately" },
      { icon: "??", text: isZhTW ? "?©é³¥?¹ï?$3,200 (?Ÿåƒ¹ $4,000)" : "Early Bird Price: $3,200 (Original $4,000)" }
    ],
    note: isZhTW ? "ç¨‹å?è¨­è??¶åŸºç¤å…¥?€ï¼Œæ?å¾Œæ??? : "Programming zero-to-hero, last chance"
  };

  // ?¹æ ¼ä¿¡æ¯
  const pricingInfo = {
    series: isZhTW ? "ç·¨ç??¥é?å°ˆç²¾?? : "Programming Beginner Specialty Price",
    price: "$3,200",
    originalPrice: "$4,000",
    aiInOne: isZhTW ? "AI in one å­¸å“¡?? : "AI in one Student Price",
    studentPrice: "$2,400",
    enterprise: isZhTW ? "ä¼æ¥­ç¨‹å??¹è??¹æ?" : "Corporate programming training program"
  };

  // èª²ç??¹è‰²
  const courseFeatures = [
    {
      icon: <Code className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "ç¨‹å?è¨­è??ºç?" : "Programming Fundamentals",
      description: isZhTW ? "å¾é›¶?‹å?å­¸ç?HTML?CSS?JavaScript?¸å?æ¦‚å¿µ" : "Learn HTML, CSS, JavaScript core concepts from scratch",
      highlight: isZhTW ? "?¶åŸºç¤å??? : "Beginner Friendly"
    },
    {
      icon: <Layers className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "?¨æ£§?‹ç™¼é«”é?" : "Full-Stack Experience",
      description: isZhTW ? "å­¸ç??ç«¯?Œé¢è¨­è??°å?ç«¯è??™è??†ç?å®Œæ•´æµç?" : "Learn complete process from frontend design to backend data processing",
      highlight: isZhTW ? "?¨æ£§?‹ç™¼" : "Full-Stack Development"
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-400 mx-auto" />,
      title: isZhTW ? "å¯¦æˆ°?…ç›®å°å?" : "Project-Oriented Practice",
      description: isZhTW ? "?šé?å¯¦é??…ç›®å­¸ç?ï¼Œå»ºæ§‹ä??„ç¬¬ä¸€?‹å??´ç¶²ç«? : "Learn through real projects, build your first complete website",
      highlight: isZhTW ? "å¯¦æˆ°å­¸ç?" : "Hands-on Learning"
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?¾ä»£?‹ç™¼å·¥å…·" : "Modern Development Tools",
      description: isZhTW ? "?Œæ¡æ¥­ç?å¸¸ç”¨?„é??¼å·¥?·å??€ä½³å¯¦è¸? : "Master industry-standard development tools and best practices",
      highlight: isZhTW ? "å°ˆæ¥­å·¥å…·" : "Professional Tools"
    }
  ];

  // ?®æ?å­¸å“¡
  const targetAudience = {
    title: isZhTW ? "?ªä?äººé©?ˆå­¸ç¿’ç·¨ç¨‹åŸºç¤èª²ç¨‹ï?" : "Who Should Take This Coding Basics Course?",
    description: isZhTW ? "?¡è?ä½ æ˜¯å®Œå…¨æ²’æ?ç¨‹å?è¨­è?ç¶“é??„æ–°?‹ï??„æ˜¯?³è?è½‰è??²å…¥ç§‘æ??˜å??„å?æ¥­äººå£«ï??™é?èª²ç??½èƒ½?ºä??ä?ç´®å¯¦?„ç?å¼è¨­è¨ˆåŸºç¤ã€? : "Whether you're a complete beginner with no programming experience or a professional looking to transition into the tech field, this course provides a solid programming foundation.",
    audiences: [
      {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "ç¨‹å?è¨­è??°æ?" : "Programming Beginners",
        description: isZhTW ? "å®Œå…¨æ²’æ?ç·¨ç?ç¶“é?ï¼Œä?å°ç?å¼è¨­è¨ˆæ??ˆè¶£?„å­¸ç¿’è€? : "Complete beginners with no programming experience but interested in coding"
      },
      {
        icon: <Briefcase className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "è½‰è?äººå£«" : "Career Changers",
        description: isZhTW ? "å¸Œæ?è½‰å…¥ç§‘æ?è¡Œæ¥­ï¼Œé?è¦ç?å¼è¨­è¨ˆæ??½ç?å°ˆæ¥­äººå£«" : "Professionals looking to transition into tech industry and need programming skills"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "?µæ¥­?? : "Entrepreneurs",
        description: isZhTW ? "?³è??ªå·±?‹ç™¼?¢å??Ÿå??–ä?è§??è¡“å¯¦?¾ç??µæ¥­?? : "Entrepreneurs who want to develop product prototypes or understand technical implementation"
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "?·å ´?å??? : "Career Enhancers",
        description: isZhTW ? "å¸Œæ??šé?å­¸ç?ç·¨ç??€?½æ??‡è·?´ç«¶?­å??„åœ¨?·äººå£? : "Working professionals who want to enhance career competitiveness through programming skills"
      }
    ]
  };

  // FAQ?¸æ?
  const faqData = [
    {
      question: isZhTW ? "?‘å??¨æ??‰ç?å¼è¨­è¨ˆç?é©—ï??½å­¸?ƒå?ï¼? : "I have no programming experience at all, can I learn?",
      answer: isZhTW ? "çµ•å??¯ä»¥ï¼æ??‘ç?èª²ç?å°ˆç‚º?¶åŸºç¤å­¸?¡è¨­è¨ˆï?å¾æ??ºæœ¬?„æ?å¿µé?å§‹ï?å¾ªå?æ¼¸é€²åœ°å¼•å?ä½ æ??¡ç?å¼è¨­è¨ˆç??¸å??€?½ã€? : "Absolutely! Our course is designed for zero-experience students, starting from the most basic concepts and gradually guiding you to master core programming skills."
    },
    {
      question: isZhTW ? "4å°æ??Ÿç??½å­¸?ƒç¶²ç«™é??¼å?ï¼? : "Can I really learn web development in 4 hours?",
      answer: isZhTW ? "4å°æ??½è?ä½ æ??¡åŸºç¤æ?å¿µä¸¦å®Œæ?ç¬¬ä??‹ç¶²ç«™é??®ã€‚é??¶æ??ºå?æ¥­é??¼è€…é?è¦æ›´å¤šæ??“ï?ä½†é€™é?èª²ç??ƒçµ¦ä½ ä??‹ç´®å¯¦ç?èµ·é??? : "4 hours will help you master basic concepts and complete your first website project. While becoming a professional developer takes more time, this course gives you a solid starting point."
    },
    {
      question: isZhTW ? "èª²ç?çµæ?å¾Œæ??½æ‰¾?°ç?å¼è¨­è¨ˆå·¥ä½œå?ï¼? : "Can I find a programming job after the course?",
      answer: isZhTW ? "?™é?èª²ç??¯ä?ç¨‹å?è¨­è?å­¸ç?ä¹‹æ??„èµ·é»ã€‚å??å?ï¼Œä?å°‡å…·?™åŸºç¤æ??½ï?ä½†è??¾åˆ°å·¥ä??„é?è¦é€²ä?æ­¥ç?å­¸ç??Œå¯¦è¸ã€‚æ??‘æ??ä?å¾Œç?å­¸ç?å»ºè­°?? : "This course is the starting point of your programming journey. After completion, you'll have basic skills, but finding a job requires further learning and practice. We'll provide follow-up learning recommendations."
    },
    {
      question: isZhTW ? "?€è¦æ??™ä?éº¼è¨­?™æ?è»Ÿé??ï?" : "Do I need to prepare any equipment or software?",
      answer: isZhTW ? "?ªé?è¦ä??°èƒ½ä¸Šç¶²?„é›»?¦å³?¯ï??‘å€‘æ??¨èª²ç¨‹ä¸­?‡å?ä½ å?è£æ??€?„å?è²»é??¼å·¥?·ï?ä¸é?è¦é?å¤–è³¼è²·ä»»ä½•è?é«”ã€? : "Just need a computer with internet access! We'll guide you through installing the required free development tools during the course, no additional software purchase needed."
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
    window.open('https://wa.me/85298765432?text=?‘æƒ³äº†è§£ç·¨ç??ºç??­èª²ç¨?, '_blank');
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
