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

  // 課�??�本信息
  const courseInfo = {
    badge: isZhTW ? "AI 主�??? : "AI Master Class",
    title: isZhTW ? "?�AI 主�??��?小�? ?��??��?你�?步步?�出?��?�?��得』�?�?AI App�? : "'AI Master Class' 3 Hours Step-by-Step Guide to Building a 'Truly Useful' Mobile AI App!",
    subtitle: isZhTW ? "3小�?完�??�個�?�?App，含?�入+?�端資�?�?AI?�能！《AI App MVP 實戰?�》由?��?始�??��??��?你建構�?中�??��?讓�?帶走歷練硬編碼�?模�??? : "Complete 2 mobile apps in 3 hours, including login + cloud database + AI features! 'AI App MVP Bootcamp' from zero to hero, step-by-step guidance to build frontend, middleware, and backend.",
    instructor: "Kenneth | AI ?�示工�?專家",
    instructorTitle: isZhTW ? "?�貴�?�? : "Premium Instructor"
  };

  // 課�?統�?
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

  // 課�?資�?標籤
  const courseInfoTags = [
    { name: isZhTW ? "?�學?��??? : "Beginner Friendly", icon: <Star className="w-4 h-4 text-green-400" />, status: 'available' as const },
    { name: isZhTW ? "中�??�課" : "Chinese Instruction", icon: <Globe className="w-4 h-4 text-blue-400" />, status: 'available' as const },
    { name: isZhTW ? "實戰練�?" : "Hands-on Practice", icon: <Target className="w-4 h-4 text-yellow-400" />, status: 'available' as const },
    { name: isZhTW ? "小班?�學" : "Small Class", icon: <Users className="w-4 h-4 text-purple-400" />, status: 'featured' as const },
    { name: isZhTW ? "線�??�播" : "Live Online", icon: <Monitor className="w-4 h-4 text-orange-400" />, status: 'available' as const },
    { name: isZhTW ? "終身?��?" : "Lifetime Access", icon: <Repeat className="w-4 h-4 text-pink-400" />, status: 'available' as const },
    { name: isZhTW ? "證書?�發" : "Certificate", icon: <Award className="w-4 h-4 text-cyan-400" />, status: 'coming-soon' as const },
    { name: isZhTW ? "AI?��??�援" : "AI Assistant", icon: <Brain className="w-4 h-4 text-indigo-400" />, status: 'available' as const },
    { name: isZhTW ? "社群?�援" : "Community Support", icon: <Heart className="w-4 h-4 text-red-400" />, status: 'available' as const }
  ];

  // ?�選課�?
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

  // ?�?��???  const latestNews = {
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

  // ?�格信息
  const pricingInfo = {
    series: isZhTW ? "?�系?�優?�價" : "Full Series Special Price",
    price: "$4,500",
    originalPrice: "$5,250",
    aiInOne: isZhTW ? "AI in one 學員?? : "AI in one Student Price",
    studentPrice: "$3,500",
    enterprise: isZhTW ? "?�們亦?��?企業?��??��?" : "We also provide enterprise training services"
  };

  // 課�??�色
  const courseFeatures = [
    {
      icon: <Brain className="w-12 h-12 text-blue-400 mx-auto" />,
      title: isZhTW ? "?�慧?�示設�?" : "Smart Prompt Design",
      description: isZhTW ? "學�?設�?精確?�AI?�示，�?AI輸出?�符?��?�? : "Learn to design precise AI prompts for better outputs",
      highlight: isZhTW ? "?�示?��?" : "Prompt Optimization"
    },
    {
      icon: <Target className="w-12 h-12 text-green-400 mx-auto" />,
      title: isZhTW ? "?�景?��??? : "Scenario-based Applications",
      description: isZhTW ? "涵�??�業?�創?�、�?術�?多種實�??�用?�景" : "Covering business, creative, and technical application scenarios",
      highlight: isZhTW ? "實戰導�?" : "Practical Focus"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto" />,
      title: isZhTW ? "?��?突破" : "Creative Breakthroughs",
      description: isZhTW ? "?�握激?�AI?��?潛能?��?示�?�? : "Master prompt techniques to unlock AI's creative potential",
      highlight: isZhTW ? "?�新?�維" : "Innovative Thinking"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-purple-400 mx-auto" />,
      title: isZhTW ? "?��??��?" : "Efficiency Enhancement",
      description: isZhTW ? "學�?快速迭�???��??�示?�方�? : "Learn methods for rapid iteration and prompt optimization",
      highlight: isZhTW ? "快速迭�? : "Rapid Iteration"
    }
  ];

  // ?��?學員
  const targetAudience = {
    title: isZhTW ? "?��?人適?�學習這�?課�?�? : "Who Should Take This Course?",
    description: isZhTW ? "?��?你是AI?��??�是?��?驗�??�戶，這�?課�??�能幫助你�??��?示工程�??��??�?��??��?AI使用?��??? : "Whether you're an AI beginner or experienced user, this course will help you master prompt engineering skills and improve AI usage efficiency.",
    audiences: [
      {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: isZhTW ? "AI工具使用?? : "AI Tool Users",
        description: isZhTW ? "希�??��??�地使用ChatGPT?�Claude等AI工具?�用?? : "Users who want to use ChatGPT, Claude and other AI tools more effectively"
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: isZhTW ? "?��?工�??? : "Creative Workers",
        description: isZhTW ? "設�?師、�?家、�??�人?��??�要創?�輸?��?專業人士" : "Designers, writers, marketers and other professionals who need creative output"
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-green-400" />,
        title: isZhTW ? "?�業專業人士" : "Business Professionals",
        description: isZhTW ? "企業管�??�、�??�師?�顧?��??�要�??�工作�??��?人士" : "Business managers, analysts, consultants who need to improve work efficiency"
      },
      {
        icon: <Code className="w-8 h-8 text-purple-400" />,
        title: isZhTW ? "?�術�??��? : "Technical Developers",
        description: isZhTW ? "程�?設�?師、產?��??��??�要整?�AI?��??��?術人?? : "Programmers, product managers who need to integrate AI capabilities"
      }
    ]
  };

  // FAQ?��?
  const faqData = [
    {
      question: isZhTW ? "?��?課�??��?完全沒�?AI經�??�人?��?" : "Is this course suitable for people with no AI experience?",
      answer: isZhTW ? "絕�??��?！�??��??��?概念?��?，循序漸?�地介紹?�示工�??�核心�??�。無論�??�否?��?術�??��??�能輕�?跟�?課�??�容?? : "Absolutely! We start with basic concepts and gradually introduce core prompt engineering skills. Whether you have a technical background or not, you can easily follow the course content."
    },
    {
      question: isZhTW ? "完�?課�?後�??�獲得�?麼能?��?" : "What abilities will I gain after completing the course?",
      answer: isZhTW ? "你�??�握設�??��??�示?��?巧�??��?讓AI?��??�精準�??��?，�??�工作�??��?並能?�用?��?種實?�場?�中?? : "You'll master effective prompt design techniques, enabling AI to generate more precise responses, improve work efficiency, and apply these skills to various real-world scenarios."
    },
    {
      question: isZhTW ? "?��?課�??�其他AI課�??��?麼�??��?" : "What makes this course different from other AI courses?",
      answer: isZhTW ? "?�們�?注於?�示工�??��??��??�?��??��?實戰?��?訓練?��?，�?你能立即?�用?�學知識到實�?工�?中�? : "We focus on prompt engineering as a core skill, providing practical training methods that allow you to immediately apply what you learn to actual work."
    },
    {
      question: isZhTW ? "課�??�否?�含實�?練�?�? : "Does the course include practical exercises?",
      answer: isZhTW ? "?��?！課程�??�大?�實?�練習�?涵�?不�?行業?��??�場?��?讓�??��?中學，�?�???��?示工程�??��? : "Yes! The course includes extensive practical exercises covering different industries and application scenarios, allowing you to learn by doing and truly master prompt engineering skills."
    }
  ];

  // ?�調?�數
  const handleStartLearning = () => {
    navigate('/courses/prompt-engineering-learning');
  };

  const handleRegister = () => {
    // 導航?�課程報?��???    navigate('/courses/registration', {
      state: {
        courseTitle: courseInfo.title,
        coursePrice: pricingInfo.price,
        courseId: 'prompt-engineering'
      }
    });
  };

  const handleWhatsApp = () => {
    // ?��?WhatsApp?�絡
    window.open('https://wa.me/85298765432?text=?�想了解Prompt Engineering課�?', '_blank');
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
