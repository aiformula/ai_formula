import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import CourseOutlineTemplate from '../../../components/templates/CourseOutlineTemplate';
import { 
  Clock, 
  Monitor, 
  Users, 
  Brain, 
  Target, 
  Lightbulb,
  Zap,
  Database,
  Smartphone,
  Heart,
  Shield,
  Star,
  TrendingUp,
  BookOpen,
  Search,
  BarChart3,
  Rocket,
  Award,
  CheckCircle,
  Code,
  Globe
} from 'lucide-react';

const AIBusinessAutomationCoursePage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // Step 1: 定義課程基本信息
  const courseInfo = {
    badge: isZhHK ? "免費課程總覽" : "Free Course Preview",
    title: isZhHK ? "AI 商業自動化實戰課程" : "AI Business Automation Practice Course",
    subtitle: isZhHK ? "掌握實用的 AI 自動化技術，透過智能自動化解決方案轉型您的業務營運並推動增長。" : "Master practical AI automation techniques to transform your business operations and drive growth through intelligent automation solutions.",
    instructor: "Kenneth",
    instructorTitle: isZhHK ? "AI 行銷開發者與自動化專家" : "AI Marketing Developer & Automation Specialist"
  };

  // Step 2: 定義課程統計
  const courseStats = [
    {
      icon: <Clock className="w-5 h-5 text-green-400" />,
      label: isZhHK ? '總時長' : 'Duration',
      value: '4.2 小時'
    },
    {
      icon: <Users className="w-5 h-5 text-green-400" />,
      label: isZhHK ? '學員人數' : 'Students',
      value: '1,247'
    },
    {
      icon: <Award className="w-5 h-5 text-green-400" />,
      label: isZhHK ? '完成證書' : 'Certificate',
      value: isZhHK ? '免費獲得' : 'Free'
    }
  ];

  // Step 3: 定義課程信息標籤
  const courseInfoTags = [
    {
      name: isZhHK ? 'AI 自動化' : 'AI Automation',
      icon: <Brain className="w-4 h-4" />,
      status: 'featured' as const
    },
    {
      name: isZhHK ? '免費學習' : 'Free Learning',
      icon: <Star className="w-4 h-4" />,
      status: 'available' as const
    }
  ];

  // Step 4: 定義可選課程
  const availableCourses = [
    {
      title: isZhHK ? "快捷上手" : "Quick Start",
      description: isZhHK ? "30分鐘學會基本概念" : "Learn basic concepts in 30 minutes",
      color: "green" as const,
      available: true
    },
    {
      title: isZhHK ? "實際應用" : "Practical Application", 
      description: isZhHK ? "學習如何應用到工作中" : "Learn how to apply to work",
      color: "green" as const,
      available: true
    }
  ];

  // Step 5: 定義最新消息
  const latestNews = {
    date: isZhHK ? "2024年12月" : "December 2024",
    title: isZhHK ? "需要更複雜的課程？" : "Need More Advanced Courses?",
    details: [
      { 
        icon: "💼", 
        text: isZhHK ? "我們提供企業專屬的 AI 自動化顧問服務" : "We provide enterprise AI automation consulting" 
      },
      { 
        icon: "📞", 
        text: isZhHK ? "一對一專業諮詢，為您量身定制解決方案" : "One-on-one professional consultation" 
      },
      { 
        icon: "🚀", 
        text: isZhHK ? "實際案例分析與實作指導" : "Real case analysis and hands-on guidance" 
      },
      { 
        icon: "📋", 
        text: isZhHK ? "完整的自動化系統建置" : "Complete automation system setup" 
      },
      { 
        icon: "🎯", 
        text: isZhHK ? "ROI 評估與效益分析" : "ROI assessment and benefit analysis" 
      }
    ],
    note: isZhHK ? "或者咨詢我們的 →" : "Or consult our experts →"
  };

  // Step 6: 定義價格信息
  const pricingInfo = {
    series: isZhHK ? "免費課程" : "Free Course",
    price: isZhHK ? "免費" : "Free",
    originalPrice: "", // 免費課程不顯示原價
    aiInOne: isZhHK ? "完全免費" : "Completely Free",
    studentPrice: "",
    enterprise: isZhHK ? "企業培訓服務請聯繫我們" : "Contact us for enterprise training"
  };

  // Step 7: 定義課程特色
  const courseFeatures = [
    {
      icon: <Zap className="w-6 h-6 text-green-400" />,
      title: isZhHK ? '實戰導向' : 'Practical Focus',
      description: isZhHK ? '每個模組都包含實際操作練習，讓你能夠立即應用所學知識到實際業務中。' : 'Each module includes hands-on exercises for immediate application.',
      highlight: isZhHK ? '立即應用' : 'Immediate Application'
    },
    {
      icon: <Target className="w-6 h-6 text-green-400" />,
      title: isZhHK ? '個性化學習' : 'Personalized Learning',
      description: isZhHK ? '根據你的行業和業務需求，提供定制化的自動化解決方案和建議。' : 'Customized automation solutions based on your industry and business needs.',
      highlight: isZhHK ? '量身定制' : 'Customized'
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-green-400" />,
      title: isZhHK ? '創新工具' : 'Innovative Tools',
      description: isZhHK ? '學習使用最新的 AI 工具和平台，掌握前沿的自動化技術。' : 'Learn the latest AI tools and cutting-edge automation technologies.',
      highlight: isZhHK ? '前沿技術' : 'Cutting-edge'
    },
    {
      icon: <Rocket className="w-6 h-6 text-green-400" />,
      title: isZhHK ? '快速成果' : 'Quick Results',
      description: isZhHK ? '課程結束後，你將能夠在數週內實施自動化解決方案並看到效果。' : 'Implement automation solutions within weeks after course completion.',
      highlight: isZhHK ? '快速見效' : 'Quick Impact'
    }
  ];

  // Step 8: 定義FAQ
  const faqData = [
    {
      question: isZhHK ? '這個課程適合完全沒有技術背景的人嗎？' : 'Is this course suitable for people with no technical background?',
      answer: isZhHK ? '是的！課程專為商業人士設計，不需要編程背景。我們會從基礎概念開始，逐步引導你掌握實用的自動化技能。' : 'Yes! The course is designed for business professionals and requires no programming background.'
    },
    {
      question: isZhHK ? '課程完成後我能獲得什麼？' : 'What will I get after completing the course?',
      answer: isZhHK ? '你將獲得完整的自動化實施手冊、AI 工具整合指南、實戰模板庫，以及業界認可的課程完成證書。' : 'You will receive a complete automation implementation manual, AI tool integration guides, and an industry-recognized certificate.'
    },
    {
      question: isZhHK ? '課程內容會定期更新嗎？' : 'Will the course content be updated regularly?',
      answer: isZhHK ? '是的，我們會根據最新的 AI 技術發展和市場趨勢，定期更新課程內容，確保你學到的都是最前沿的知識。' : 'Yes, we regularly update the course content based on the latest AI technology developments and market trends.'
    },
    {
      question: isZhHK ? '如果我有問題可以獲得支援嗎？' : 'Can I get support if I have questions?',
      answer: isZhHK ? '當然！我們提供專屬社群論壇和每月實時問答環節，你可以隨時與講師和其他學員交流討論。' : 'Of course! We provide a dedicated community forum and monthly live Q&A sessions.'
    },
    {
      question: isZhHK ? '這個免費課程和付費版有什麼區別？' : 'What\'s the difference between the free course and paid version?',
      answer: isZhHK ? '免費版包含核心的理論知識和基礎實戰練習。付費版則包含高級模板、一對一諮詢和更深入的案例研究。' : 'The free version includes core theoretical knowledge and basic hands-on exercises.'
    }
  ];

  // Step 9: 定義目標受眾
  const targetAudience = {
    title: isZhHK ? "適合對象" : "Target Audience",
    description: isZhHK ? "本課程專為以下人群設計" : "This course is designed for",
    audiences: [
      {
        icon: <Users className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "企業主管" : "Business Executives",
        description: isZhHK ? "想要了解 AI 自動化如何提升業務效率" : "Want to understand how AI automation improves efficiency"
      },
      {
        icon: <Brain className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "中小企業老闆" : "SME Owners",
        description: isZhHK ? "尋求降低成本、提高競爭力的解決方案" : "Seeking cost reduction and competitive advantage"
      },
      {
        icon: <Rocket className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "職場工作者" : "Working Professionals",
        description: isZhHK ? "希望學習新技能、提升個人價值" : "Want to learn new skills and enhance personal value"
      }
    ]
  };

  // Step 10: 定義回調函數
  const handleStartLearning = () => {
    navigate('/courses/ai-business-automation/learning');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/85293816674', '_blank');
  };

  // Step 11: 渲染模板
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
      onWhatsApp={handleWhatsApp}
      learningPathExtended={true} // 啟用拉長的學習路徑容器
    />
  );
};

export default AIBusinessAutomationCoursePage; 