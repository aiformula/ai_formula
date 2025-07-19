/**
 * ChatGPT Complete Course Outline Page
 * @fileoverview 使用 CourseOutlineTemplate 構建的 ChatGPT 完整教學實戰課程頁面
 * @author AI Formula Team
 * @version 3.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseOutlineTemplate from '@/components/templates/CourseOutlineTemplate';
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
  Globe,
  MessageSquare,
  Edit3,
  FileText,
  Briefcase
} from 'lucide-react';

const ChatGPTCompleteCourseOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // Step 1: 定義課程基本信息
  const courseInfo = {
    badge: isZhHK ? "免費課程總覽" : "Free Course Preview",
    title: isZhHK ? "ChatGPT 完整教學實戰" : "ChatGPT Complete Practical Course",
    subtitle: isZhHK ? "掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。" : "Master the complete application of ChatGPT, from daily office work to creative projects, comprehensively enhancing your digital capabilities.",
    instructor: "AI Formula Team",
    instructorTitle: isZhHK ? "AI 溝通專家與提示工程師" : "AI Communication Expert & Prompt Engineer"
  };

  // Step 2: 定義課程統計
  const courseStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      label: isZhHK ? "課程總長度" : "Course Duration",
      value: isZhHK ? "13+ 小時深度學習" : "13+ Hours Deep Learning"
    },
    {
      icon: <Monitor className="w-6 h-6 text-green-400" />,
      label: isZhHK ? "學習模式" : "Learning Mode",
      value: isZhHK ? "線上自學" : "Online Self-Study"
    },
    {
      icon: <Users className="w-6 h-6 text-green-400" />,
      label: isZhHK ? "語言" : "Language",
      value: isZhHK ? "繁體中文" : "Traditional Chinese"
    }
  ];

  // Step 3: 定義課程信息標籤
  const courseInfoTags = [
    { 
      name: isZhHK ? "學習安排" : "Learning Schedule", 
      icon: <BookOpen className="w-4 h-4" />, 
      status: 'available' as const 
    },
    { 
      name: isZhHK ? "課程特色" : "Course Features", 
      icon: <Star className="w-4 h-4" />, 
      status: 'featured' as const 
    },
    { 
      name: isZhHK ? "永久觀看權限" : "Lifetime Access", 
      icon: <Shield className="w-4 h-4" />, 
      status: 'available' as const 
    },
    { 
      name: isZhHK ? "提示工程技術" : "Prompt Engineering", 
      icon: <Edit3 className="w-4 h-4" />, 
      status: 'featured' as const 
    },
    { 
      name: isZhHK ? "完成證書頒發" : "Completion Certificate", 
      icon: <Award className="w-4 h-4" />, 
      status: 'available' as const 
    }
  ];

  // Step 4: 定義可選課程
  const availableCourses = [
    {
      title: isZhHK ? "快捷上手" : "Quick Start",
      description: isZhHK ? "30分鐘學會基本對話技巧" : "Learn basic conversation skills in 30 minutes",
      color: "green" as const,
      available: true
    },
    {
      title: isZhHK ? "實際應用" : "Practical Application", 
      description: isZhHK ? "學習如何應用到日常工作" : "Learn how to apply to daily work",
      color: "green" as const,
      available: true
    }
  ];

  // Step 5: 定義最新消息
  const latestNews = {
    date: isZhHK ? "2024年12月" : "December 2024",
    title: isZhHK ? "需要更進階的 AI 技能？" : "Need More Advanced AI Skills?",
    details: [
      { 
        icon: "🤖", 
        text: isZhHK ? "我們提供企業專屬的 ChatGPT 應用顧問服務" : "We provide enterprise ChatGPT application consulting" 
      },
      { 
        icon: "📞", 
        text: isZhHK ? "一對一專業諮詢，提升您的 AI 溝通技能" : "One-on-one professional consultation for AI communication skills" 
      },
      { 
        icon: "🚀", 
        text: isZhHK ? "實際案例分析與提示工程指導" : "Real case analysis and prompt engineering guidance" 
      },
      { 
        icon: "📋", 
        text: isZhHK ? "完整的 ChatGPT 工作流程建置" : "Complete ChatGPT workflow setup" 
      },
      { 
        icon: "🎯", 
        text: isZhHK ? "效率提升評估與應用分析" : "Efficiency improvement assessment and application analysis" 
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

  // Step 7: 定義免費課程價值
  const courseFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "對話技巧" : "Conversation Skills",
      description: isZhHK ? "掌握有效的 ChatGPT 對話方法" : "Master effective ChatGPT conversation methods",
      highlight: isZhHK ? "立即學習" : "Learn Now"
    },
    {
      icon: <FileText className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "提示工程" : "Prompt Engineering",
      description: isZhHK ? "學習撰寫高效的提示指令" : "Learn to write effective prompts",
      highlight: isZhHK ? "實用技巧" : "Practical Tips"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-400" />,
      title: isZhHK ? "商業應用" : "Business Applications",
      description: isZhHK ? "將 ChatGPT 應用到工作場景" : "Apply ChatGPT to work scenarios",
      highlight: isZhHK ? "真實案例" : "Real Cases"
    }
  ];

  // Step 8: 定義FAQ
  const faqData = [
    {
      question: isZhHK ? "這個 ChatGPT 課程真的免費嗎？" : "Is this ChatGPT course really free?",
      answer: isZhHK ? "是的！這是我們為初學者提供的完全免費入門課程，讓您掌握 ChatGPT 的基本使用方法。" : "Yes! This is a completely free introductory course for beginners to master basic ChatGPT usage."
    },
    {
      question: isZhHK ? "我需要有技術背景嗎？" : "Do I need technical background?",
      answer: isZhHK ? "不需要！本課程專為一般用戶設計，重點在於如何有效使用 ChatGPT 提升工作效率。" : "No! This course is designed for general users, focusing on effective ChatGPT usage for productivity."
    },
    {
      question: isZhHK ? "完成課程後我能做什麼？" : "What can I do after completing the course?",
      answer: isZhHK ? "您將能夠熟練使用 ChatGPT 進行寫作、分析、創意發想等各種任務，大幅提升工作效率。" : "You'll be able to use ChatGPT proficiently for writing, analysis, creative thinking and various tasks."
    },
    {
      question: isZhHK ? "如果我想要更深入的 AI 學習怎麼辦？" : "What if I want more advanced AI learning?",
      answer: isZhHK ? "我們提供進階的 AI 應用課程和企業顧問服務，您可以透過 WhatsApp 聯繫我們了解更多。" : "We offer advanced AI application courses and enterprise consulting services."
    }
  ];

  // Step 9: 定義目標受眾
  const targetAudience = {
    title: isZhHK ? "適合對象" : "Target Audience",
    description: isZhHK ? "本課程專為以下人群設計" : "This course is designed for",
    audiences: [
      {
        icon: <Briefcase className="w-6 h-6 text-gray-400" />,
        title: isZhHK ? "職場工作者" : "Working Professionals",
        description: isZhHK ? "想要提升工作效率的上班族" : "Office workers wanting to improve productivity"
      },
      {
        icon: <Edit3 className="w-6 h-6 text-green-400" />,
        title: isZhHK ? "內容創作者" : "Content Creators",
        description: isZhHK ? "需要創意發想和寫作協助的創作者" : "Creators needing creative inspiration and writing assistance"
      },
      {
        icon: <Users className="w-6 h-6 text-gray-400" />,
        title: isZhHK ? "學生群體" : "Students",
        description: isZhHK ? "想要學習 AI 工具的學生" : "Students wanting to learn AI tools"
      },
      {
        icon: <Target className="w-6 h-6 text-orange-400" />,
        title: isZhHK ? "AI 初學者" : "AI Beginners",
        description: isZhHK ? "對 AI 工具感興趣的初學者" : "Beginners interested in AI tools"
      }
    ]
  };

  // Step 10: 定義課程模組
  const courseModules = [
    {
      id: 1,
      title: isZhHK ? "AI 革命的開端：重新認識 ChatGPT" : "The Beginning of AI Revolution: Rediscovering ChatGPT",
      description: isZhHK ? "這個單元為零基礎學員打好穩固根基，理解 ChatGPT 的運作原理與價值，並完成所有前置準備。" : "This unit builds a solid foundation for beginners, understanding how ChatGPT works and its value.",
      duration: isZhHK ? "90分鐘" : "90 minutes",
      lessons: 5,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "歡迎來到 AI 新紀元：課程簡介與學習地圖" : "Welcome to the New AI Era: Course Introduction & Learning Map",
        isZhHK ? "ChatGPT 是什麼？白話拆解大型語言模型 (LLM) 核心概念" : "What is ChatGPT? Breaking Down Large Language Model (LLM) Core Concepts",
        isZhHK ? "GPT 的演進史：從 GPT-3.5 到 GPT-4o 的關鍵差異" : "Evolution of GPT: Key Differences from GPT-3.5 to GPT-4o",
        isZhHK ? "免費版 vs. Plus 版：功能比較與選擇策略" : "Free vs. Plus: Feature Comparison & Selection Strategy",
        isZhHK ? "帳戶註冊與安全設定：逐步完成註冊，保障帳戶安全" : "Account Registration & Security Settings: Step-by-step Registration"
      ]
    },
    {
      id: 2,
      title: isZhHK ? "高效 Prompt 實戰手冊：掌握與 AI 對話的藝術" : "Efficient Prompt Practical Manual: Master the Art of AI Conversation",
      description: isZhHK ? "掌握 Prompt 工程技巧，提升回答質量和準確性，學會如何與 ChatGPT 進行更有效的溝通。" : "Master prompt engineering techniques for better responses and learn how to communicate more effectively with ChatGPT.",
      duration: isZhHK ? "140分鐘" : "140 minutes",
      lessons: 5,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "主介面深度導覽：對話視窗、歷史紀錄與設定區" : "Main Interface Deep Tour: Chat Window, History & Settings",
        isZhHK ? "對話管理技巧：如何有效命名、分享與刪除對話" : "Conversation Management: Rename, Share & Delete Conversations",
        isZhHK ? "Custom Instructions (自訂指令)：打造個人化 AI 助教" : "Custom Instructions: Create Your Personal AI Assistant",
        isZhHK ? "手機 App 獨有功能：語音對話與圖像辨識實戰" : "Mobile App Exclusive Features: Voice Chat & Image Recognition",
        isZhHK ? "探索 GPT Store：如何尋找、評估及使用優秀 GPTs" : "Exploring GPT Store: Finding, Evaluating & Using GPTs"
      ]
    },
    {
      id: 3,
      title: isZhHK ? "指令的藝術 (Prompt Engineering) — 讓 AI 精準聽懂你的話" : "The Art of Prompts (Prompt Engineering) — Making AI Understand You Precisely",
      description: isZhHK ? "這是整個課程的核心，學會「提問」比擁有工具更重要。本單元將傳授從入門到高階的指令技巧。" : "This is the core of the entire course. Learning to 'ask questions' is more important than having tools.",
      duration: isZhHK ? "158分鐘" : "158 minutes",
      lessons: 6,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "優質指令的四大基石：角色 (Role)、任務 (Task)、脈絡 (Context)、格式 (Format)" : "Four Pillars of Quality Prompts: Role, Task, Context, Format",
        isZhHK ? "角色扮演法：讓 ChatGPT 成為你的私人律師、程式設計師或行銷專家" : "Role-Playing Method: Make ChatGPT Your Personal Expert",
        isZhHK ? "範例引導法 (Few-Shot Prompting)：給予 AI 範例，讓它模仿你的風格" : "Few-Shot Prompting: Give AI Examples to Mimic Your Style",
        isZhHK ? "思維鏈技巧 (Chain of Thought)：引導 AI 一步步思考，解決複雜問題" : "Chain of Thought: Guide AI to Think Step by Step",
        isZhHK ? "迭代與追問：如何透過追問，從 60 分的答案優化到 95 分" : "Iteration & Follow-up: Optimise from 60-point to 95-point Answers",
        isZhHK ? "指令範本庫：提供 20+ 個常用高效指令範本，即學即用" : "Prompt Template Library: 20+ High-Efficiency Templates Ready to Use"
      ]
    },
    {
      id: 4,
      title: isZhHK ? "精通之道 — 高級提示工程 (Prompt Engineering)" : "Path to Mastery — Advanced Prompt Engineering",
      description: isZhHK ? "掌握了 ChatGPT 的基本功能後，要真正發揮其潛力，關鍵在於學會如何「提問」。" : "After mastering ChatGPT basics, the key to unleashing its potential lies in learning how to 'ask'.",
      duration: isZhHK ? "150分鐘" : "150 minutes",
      lessons: 5,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "實戰項目 (一) 內容創作引擎：自動生成高質素的社交媒體貼文、廣告文案與電子郵件" : "Project 1: Content Creation Engine - Social Media, Ads & Email",
        isZhHK ? "實戰項目 (二) 學習研究加速器：快速總結論文、報告，並用簡單方式解釋複雜概念" : "Project 2: Learning Research Accelerator - Summarize Papers & Reports",
        isZhHK ? "實戰項目 (三) 創意腦震盪夥伴：從零開始規劃旅行、活動流程或商業點子" : "Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas",
        isZhHK ? "實戰項目 (四) 程式設計超級助手：解釋程式碼、除錯與編寫簡單腳本" : "Project 4: Programming Super Assistant - Code Explanation & Debugging",
        isZhHK ? "實戰項目 (五) 語言翻譯與潤飾大師：進行多國語言精準翻譯與專業級文章校對" : "Project 5: Language Translation & Polishing Master"
      ]
    },
    {
      id: 5,
      title: isZhHK ? "打造專屬 AI — 個人化與 GPT 商店" : "Build Your Personal AI — Personalization & GPT Store",
      description: isZhHK ? "學習如何將 ChatGPT 從一個通用工具，轉變為一個真正懂您、為您量身定做的私人 AI 助手。" : "Learn to transform ChatGPT from a universal tool into a personal AI assistant tailored for you.",
      duration: isZhHK ? "157分鐘" : "157 minutes",
      lessons: 5,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "Advanced Data Analysis (數據分析大師)：上傳 Excel/CSV/PDF，進行數據分析與圖表製作" : "Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis",
        isZhHK ? "Web Browse (實時網絡瀏覽)：結合即時網絡資訊，進行市場調查與新聞總結" : "Web Browse: Real-time Web Information for Market Research",
        isZhHK ? "DALL-E 3 圖像生成：用文字創造出專業級的商業插圖、簡報圖片與藝術作品" : "DALL-E 3 Image Generation: Create Professional Business Illustrations",
        isZhHK ? "創建你的第一個 Custom GPT：無需編程，手把手教你打造個人專屬的 AI 應用" : "Create Your First Custom GPT: Build Personal AI Applications Without Programming",
        isZhHK ? "GPTs 應用商店的秘密：如何發佈你的 GPT，甚至未來可能從中獲利" : "GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit"
      ]
    },
    {
      id: 6,
      title: isZhHK ? "展望未來 — 應用、倫理與挑戰" : "Looking Forward — Applications, Ethics & Challenges",
      description: isZhHK ? "從更宏觀的視角審視 ChatGPT，探討其廣泛應用，同時坦誠面對其局限性、倫理挑戰和隱私問題。" : "Examine ChatGPT from a macro perspective, exploring its applications while addressing limitations, ethics and privacy.",
      duration: isZhHK ? "100分鐘" : "100 minutes",
      lessons: 5,
      completed: false,
      locked: false,
      topics: [
        isZhHK ? "AI 的「幻覺」現象：如何識別並查證 AI 生成的虛假資訊" : "AI 'Hallucination' Phenomenon: Identify and Verify AI-generated False Information",
        isZhHK ? "數據私隱與安全：你的對話安全嗎？如何管理你的數據" : "Data Privacy & Security: Are Your Conversations Safe? Managing Your Data",
        isZhHK ? "AI 的偏見問題：認識訓練數據帶來的潛在影響，並學習如何應對" : "AI Bias Issues: Understanding Training Data Impact and How to Respond",
        isZhHK ? "負責任地使用 AI：在學術、工作與創作中應遵守的倫理界線" : "Responsible AI Use: Ethical Boundaries in Academia, Work & Creation",
        isZhHK ? "人工智能的未來：展望 GPT 的下一步發展與對社會的長遠影響" : "The Future of AI: GPT's Next Development and Long-term Social Impact"
      ]
    }
  ];

  const handleStartLearning = () => {
    navigate('/courses/chatgpt-complete-course/learning');
  };

  const handleContactWhatsApp = () => {
    const message = '我想報名參加 ChatGPT 完整教學實戰課程';
    window.open(`https://wa.me/85298765432?text=${encodeURIComponent(message)}`, '_blank');
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
      onWhatsApp={handleContactWhatsApp}
    />
  );
};

export default ChatGPTCompleteCourseOutline; 