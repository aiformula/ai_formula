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

  // èª²ç??ºæœ¬ä¿¡æ¯
  const courseInfo = {
    badge: isZhTW ? "ChatGPT ç²¾é€šç­" : "ChatGPT Mastery Class",
    title: isZhTW ? "?ChatGPT ç²¾é€šç­??å°æ? ?Œæ¡AIå°è©±?è??ç‚º?ç?æ­??å®¶ã€ï?" : "'ChatGPT Mastery Class' 5 Hours Master AI Conversation Art to Become a 'True Expert'!",
    subtitle: isZhTW ? "5å°æ?æ·±åº¦?Œæ¡ChatGPTï¼Œå?å°è©±?°æ??°AIå°ˆå®¶ï¼æ¶µ?‹æ?ç¤ºå·¥ç¨‹ã€å‰µ?å¯«ä½œã€å?æ¥­æ??¨ã€API?´å?ï¼Œå…¨?¹ä??å?ä½ ç?AI?‹ç”¨?½å?ï¼Œè?ä½ æ??ºè·?´AI?”äºº?? : "Master ChatGPT in 5 hours, from conversation novice to AI expert! Covering prompt engineering, creative writing, business applications, API integration.",
    instructor: "David | AI ?ªå??–å?å®?,
    instructorTitle: isZhTW ? "è³‡æ·±å°å¸«" : "Senior Instructor"
  };

  // èª²ç?çµ±è?
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "å­¸ç??‚æ•¸" : "Learning Hours",
      value: isZhTW ? "5å°æ?" : "5 Hours"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "èª²ç??¸é?" : "Course Modules",
      value: isZhTW ? "4?? : "4 Modules"
    },
    {
      icon: <Repeat className="w-6 h-6 text-purple-400" />,
      label: isZhTW ? "å­¸ç?ç¦åˆ©" : "Learning Benefits",
      value: isZhTW ? "çµ‚èº«?ƒå“¡ï¼‹AIå·¥å…·?…ï?å°ˆå®¶ç¤¾ç¾¤" : "Lifetime membership + AI toolkit + expert community"
    }
  ];

  // èª²ç?è³‡è?æ¨™ç±¤
  const courseInfoTags = [
    { name: isZhTW ? "?¶åŸºç¤å¯å­? : "Zero Experience OK", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "?™è??ˆèª²" : "Bilingual Teaching", icon: <Globe className="w-4 h-4 text-blue-400" />, status: 'available' as const },
    { name: isZhTW ? "?µæ?å¯«ä?" : "Creative Writing", icon: <Wand2 className="w-4 h-4 text-purple-400" />, status: 'featured' as const },
    { name: isZhTW ? "?†æ¥­?‰ç”¨" : "Business Applications", icon: <Briefcase className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "API?´å?" : "API Integration", icon: <Code className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "æ¨¡æ¿åº? : "Template Library", icon: <Database className="w-4 h-4 text-cyan-400" />, status: 'available' as const },
    { name: isZhTW ? "å°ˆå®¶èªè?" : "Expert Certification", icon: <Award className="w-4 h-4 text-indigo-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "?²é??Ÿèƒ½" : "Advanced Features", icon: <Brain className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "?ç??´æ–°" : "Continuous Updates", icon: <TrendingUp className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // ?¯é¸èª²ç?
  const availableCourses = [
    {
      title: isZhTW ? "?AI ä¸»é??­ã€?å°æ? ?‹æ??‹æ?ä½ ä?æ­¥æ­¥?šå‡º?ç?æ­?”¨å¾—ã€æ?æ©?AI Appï¼? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
      description: isZhTW ? "å­¸ç?å»ºæ?å¯¦ç”¨?„AI?‹æ??‰ç”¨ç¨‹å?" : "Learn to build practical AI mobile applications",
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
    date: "2025å¹???5??,
    title: isZhTW ? "9???¥ChatGPTç²¾é€šç­?‹èª²ï¼Œæ—©é³¥å„ª? é€²è?ä¸? : "September 1st ChatGPT Mastery Class, Early Bird Offer Available",
    details: [
      { icon: "??", text: isZhTW ? "?¥æ?ï¼?025å¹?????(?Ÿæ?ä¸€)" : "Date: September 1, 2025 (Monday)" },
      { icon: "??", text: isZhTW ? "?‚é?ï¼šä???9:00 - ä¸‹å? 2:00 (5å°æ?)" : "Time: 9:00 AM - 2:00 PM (5 hours)" },
      { icon: "?¯", text: isZhTW ? "å¯¦é?ï¼‹ç?ä¸Šå?æ­¥æ?å­? : "Physical + Online Sync Teaching" },
      { icon: "?‘¥", text: isZhTW ? "å°ç­?™å­¸ï½œå???20 ä½? : "Small Class Teaching | Limited to 20 seats" },
      { icon: "??, text: isZhTW ? "å°ˆå®¶ç´šæ?ç¤ºå·¥ç¨‹æ?å·§å‚³?? : "Expert-level prompt engineering techniques" },
      { icon: "??", text: isZhTW ? "?©é³¥?¹ï?$3,800 (?Ÿåƒ¹ $4,500)" : "Early Bird Price: $3,800 (Original $4,500)" }
    ],
    note: isZhTW ? "?é??‰é?ï¼Œç??³å ±?? : "Limited seats, register now"
  };

  // ?¹æ ¼ä¿¡æ¯
  const pricingInfo = {
    series: isZhTW ? "ChatGPTå°ˆç²¾?? : "ChatGPT Specialty Price",
    price: "$3,800",
    originalPrice: "$4,500",
    aiInOne: isZhTW ? "AI in one å­¸å“¡?? : "AI in one Student Price",
    studentPrice: "$2,800",
    enterprise: isZhTW ? "ä¼æ¥­?˜é??¹è??¦æ??ªæ?" : "Corporate group training discounts available"
  };

  // èª²ç??¹è‰²
  const courseFeatures = [
    {
      icon: <MessageSquare className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "å°è©±?è?ç²¾é€? : "Conversation Art Mastery",
      description: isZhTW ? "?Œæ¡?‡AI?²è?é«˜æ?å°è©±?„æ?å·§å??¹æ?" : "Master techniques and methods for efficient AI conversations",
      highlight: isZhTW ? "å°è©±?€å·? : "Conversation Skills"
    },
    {
      icon: <Wand2 className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?µæ?å¯«ä??©æ?" : "Creative Writing Assistant",
      description: isZhTW ? "å­¸æ?ä½¿ç”¨ChatGPT?²è??µæ?å¯«ä??Œå…§å®¹å‰µä½? : "Learn to use ChatGPT for creative writing and content creation",
      highlight: isZhTW ? "?µæ?å¯«ä?" : "Creative Writing"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "?†æ¥­?‰ç”¨å¯¦æˆ°" : "Business Application Practice",
      description: isZhTW ? "å°‡ChatGPT?´å??°æ—¥å¸¸å?æ¥­å·¥ä½œæ?ç¨‹ä¸­" : "Integrate ChatGPT into daily business workflows",
      highlight: isZhTW ? "?†æ¥­?´å?" : "Business Integration"
    },
    {
      icon: <Code className="w-12 h-12 text-orange-400 mx-auto" />,
      title: isZhTW ? "API é«˜ç??‰ç”¨" : "Advanced API Applications",
      description: isZhTW ? "å­¸ç?ChatGPT API?„é?ç´šä½¿?¨æ?å·? : "Learn advanced ChatGPT API usage techniques",
      highlight: isZhTW ? "API?´å?" : "API Integration"
    }
  ];

  // ?®æ?å­¸å“¡
  const targetAudience = {
    title: isZhTW ? "?ªä?äººé©?ˆå­¸ç¿’ChatGPTç²¾é€šèª²ç¨‹ï?" : "Who Should Take This ChatGPT Mastery Course?",
    description: isZhTW ? "?¡è?ä½ æ˜¯?å­¸?…é??¯æ?ç¶“é??„ç”¨?¶ï??¬èª²ç¨‹å?å¹«åŠ©ä½ å??ºç??°é?ç´šå…¨?¢æ??¡ChatGPTï¼Œæ??ºç?æ­??AIå°è©±å°ˆå®¶?? : "Whether you're a beginner or experienced user, this course will help you master ChatGPT from basics to advanced levels, becoming a true AI conversation expert.",
    audiences: [
      {
        icon: <Sparkles className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "?§å®¹?µä??? : "Content Creators",
        description: isZhTW ? "?¨è½å®¢ã€è‡ªåª’é?å·¥ä??…ã€ç¤¾ç¾¤ç??Ÿè€…ç??€è¦å¤§?å…§å®¹ç”¢?ºç??µä??? : "Bloggers, social media workers, community managers who need massive content output"
      },
      {
        icon: <Briefcase className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "ä¼æ¥­å°ˆæ¥­äººå£«" : "Business Professionals",
        description: isZhTW ? "å¸Œæ??å?å·¥ä??ˆç??è‡ª?•å??¥å¸¸ä»»å??„ä?æ¥­å“¡å·¥å?ç®¡ç??? : "Business employees and managers who want to improve work efficiency and automate daily tasks"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "?µæ?å·¥ä??? : "Creative Workers",
        description: isZhTW ? "è¨­è?å¸«ã€å»£?Šäºº?ç??·å??¡ç??€è¦å‰µ?é??Ÿå?è§?±º?¹æ??„å?æ¥­äººå£? : "Designers, advertisers, marketing specialists who need creative inspiration and solutions"
      },
      {
        icon: <Users className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "å­¸ç??‡ç?ç©¶è€? : "Students & Researchers",
        description: isZhTW ? "?€è¦ç?ç©¶è??©ã€å­¸ç¿’æ”¯?´å??¥è??´ç??„å­¸?Ÿå??”ç©¶äººå“¡" : "Students and researchers who need research assistance, learning support, and knowledge organization"
      }
    ]
  };

  // FAQ?¸æ?
  const faqData = [
    {
      question: isZhTW ? "?‘å??¨æ??‰ä½¿?¨é?ChatGPTï¼Œèƒ½è·Ÿå?ä¸Šå?ï¼? : "I've never used ChatGPT before, can I keep up?",
      answer: isZhTW ? "?¶ç„¶?¯ä»¥ï¼æ??‘ç?èª²ç?å¾æ??ºç??„æ?å¿µé?å§‹ï??æ­¥å¼•å?ä½ æ??¡ChatGPT?„å?ç¨®å??½ã€‚å³ä½¿æ˜¯?¶åŸºç¤ç?å­¸å“¡ä¹Ÿèƒ½?†åˆ©å­¸æ??? : "Absolutely! Our course starts with the most basic concepts and gradually guides you to master various ChatGPT functions. Even zero-experience students can learn successfully."
    },
    {
      question: isZhTW ? "?™å€‹èª²ç¨‹è??è²»ä½¿ç”¨ChatGPT?‰ä?éº¼ä??Œï?" : "How is this course different from using ChatGPT for free?",
      answer: isZhTW ? "?‘å€‘ä??…æ?ä½ å?ä½•ä½¿?¨ChatGPTï¼Œæ›´?è??„æ˜¯?™ä?å¦‚ä??¨å??´å¥½?æ›´?‰æ??‡ã€‚å??¬é?ç´šæ?ç¤ºæ?å·§ã€API?´å??å?æ¥­æ??¨ç?æ·±åº¦?§å®¹?? : "We don't just teach you how to use ChatGPT, but more importantly, how to use it better and more efficiently. Including advanced prompting techniques, API integration, and business applications."
    },
    {
      question: isZhTW ? "å®Œæ?èª²ç?å¾Œæ??½é??°ä?éº¼æ°´æº–ï?" : "What level can I achieve after completing the course?",
      answer: isZhTW ? "å®Œæ?èª²ç?å¾Œï?ä½ å??½å??Ÿç·´?‹ç”¨ChatGPT?²è??„ç¨®ä»»å?ï¼Œå??¬å‰µ?å¯«ä½œã€å?æ¥­å??ã€ç?å¼å??©ç?ï¼Œç?æ­???ºAIå°è©±å°ˆå®¶?? : "After completing the course, you'll be able to skillfully use ChatGPT for various tasks including creative writing, business analysis, programming assistance, truly becoming an AI conversation expert."
    },
    {
      question: isZhTW ? "èª²ç??¯å¦æ¶µè??€?°ç?ChatGPT?Ÿèƒ½ï¼? : "Does the course cover the latest ChatGPT features?",
      answer: isZhTW ? "?¯ç?ï¼æ??‘æ?çºŒæ›´?°èª²ç¨‹å…§å®¹ï?ç¢ºä?æ¶µè?ChatGPT?„æ??°å??½å??€ä½³å¯¦è¸ï?è®“ä?å§‹ç??Œæ¡?€?æ²¿?„AI?€è¡“ã€? : "Yes! We continuously update course content to ensure it covers the latest ChatGPT features and best practices, keeping you at the forefront of AI technology."
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
    window.open('https://wa.me/85298765432?text=?‘æƒ³äº†è§£ChatGPT Masteryèª²ç?', '_blank');
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
