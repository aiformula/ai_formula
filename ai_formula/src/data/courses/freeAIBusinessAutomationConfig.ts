import React from 'react';
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

// 免費課程設定 - AI 商業自動化課程
export const freeAIBusinessAutomationConfig = {
  // Step 1: 課程基本信息 (100% same as original)
  courseInfo: {
    badge: {
      zhHK: "免費課程總覽",
      en: "Free Course Preview"
    },
    title: {
      zhHK: "AI 商業自動化實戰課程",
      en: "AI Business Automation Practice Course"
    },
    subtitle: {
      zhHK: "掌握實用的 AI 自動化技術，透過智能自動化解決方案轉型您的業務營運並推動增長。",
      en: "Master practical AI automation techniques to transform your business operations and drive growth through intelligent automation solutions."
    },
    instructor: "Kenneth",
    instructorTitle: {
      zhHK: "AI 行銷開發者與自動化專家",
      en: "AI Marketing Developer & Automation Specialist"
    },
    rating: 4.9,
    students: 1247,
    duration: "4.2 小時"
  },

  // Step 2: 課程統計 (100% same as original)
  courseStats: [
    {
      icon: <Clock className="w-5 h-5 text-green-400" />,
      label: {
        zhHK: '總時長',
        en: 'Duration'
      },
      value: '4.2 小時'
    },
    {
      icon: <Users className="w-5 h-5 text-green-400" />,
      label: {
        zhHK: '學員人數',
        en: 'Students'
      },
      value: '1,247'
    },
    {
      icon: <Award className="w-5 h-5 text-green-400" />,
      label: {
        zhHK: '完成證書',
        en: 'Certificate'
      },
      value: {
        zhHK: '免費獲得',
        en: 'Free'
      }
    }
  ],

  // Step 3: 課程模組 (100% same structure, adapted for FreeCourseOutlineTemplate)
  courseModules: [
    {
      id: 1,
      title: "AI 自動化基礎概念",
      description: "了解 AI 自動化的核心原理和應用場景",
      lessons: [
        {
          id: 1,
          title: "什麼是 AI 商業自動化",
          duration: "15分鐘",
          type: "video" as const,
          isPreview: true
        },
        {
          id: 2,
          title: "自動化工具選擇指南",
          duration: "20分鐘", 
          type: "reading" as const,
          isPreview: true
        },
        {
          id: 3,
          title: "建立自動化思維",
          duration: "25分鐘",
          type: "practice" as const,
          isPreview: false
        }
      ]
    },
    {
      id: 2,
      title: "實用自動化工具",
      description: "掌握主流的 AI 自動化平台和工具",
      lessons: [
        {
          id: 4,
          title: "Zapier 自動化設定",
          duration: "30分鐘",
          type: "video" as const,
          isPreview: true
        },
        {
          id: 5,
          title: "AI 聊天機器人建置",
          duration: "45分鐘",
          type: "practice" as const,
          isPreview: false
        },
        {
          id: 6,
          title: "電子郵件自動化",
          duration: "35分鐘",
          type: "video" as const,
          isPreview: false
        }
      ]
    },
    {
      id: 3,
      title: "實戰案例分析",
      description: "通過真實案例學習自動化實施",
      lessons: [
        {
          id: 7,
          title: "客戶服務自動化案例",
          duration: "40分鐘",
          type: "video" as const,
          isPreview: false
        },
        {
          id: 8,
          title: "銷售流程自動化",
          duration: "50分鐘",
          type: "practice" as const,
          isPreview: false
        },
        {
          id: 9,
          title: "數據分析自動化",
          duration: "30分鐘",
          type: "reading" as const,
          isPreview: false
        }
      ]
    }
  ],

  // Step 4: 課程特色 (100% same as original)
  courseFeatures: [
    {
      icon: <Zap className="w-6 h-6 text-green-400" />,
      title: {
        zhHK: '實戰導向',
        en: 'Practical Focus'
      },
      description: {
        zhHK: '每個模組都包含實際操作練習，讓你能夠立即應用所學知識到實際業務中。',
        en: 'Each module includes hands-on exercises for immediate application.'
      },
      highlight: {
        zhHK: '立即應用',
        en: 'Immediate Application'
      }
    },
    {
      icon: <Target className="w-6 h-6 text-green-400" />,
      title: {
        zhHK: '個性化學習',
        en: 'Personalized Learning'
      },
      description: {
        zhHK: '根據你的行業和業務需求，提供定制化的自動化解決方案和建議。',
        en: 'Customized automation solutions based on your industry and business needs.'
      },
      highlight: {
        zhHK: '量身定制',
        en: 'Customized'
      }
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-green-400" />,
      title: {
        zhHK: '創新工具',
        en: 'Innovative Tools'
      },
      description: {
        zhHK: '學習使用最新的 AI 工具和平台，掌握前沿的自動化技術。',
        en: 'Learn the latest AI tools and cutting-edge automation technologies.'
      },
      highlight: {
        zhHK: '前沿技術',
        en: 'Cutting-edge'
      }
    },
    {
      icon: <Rocket className="w-6 h-6 text-green-400" />,
      title: {
        zhHK: '快速成果',
        en: 'Quick Results'
      },
      description: {
        zhHK: '課程結束後，你將能夠在數週內實施自動化解決方案並看到效果。',
        en: 'Implement automation solutions within weeks after course completion.'
      },
      highlight: {
        zhHK: '快速見效',
        en: 'Quick Impact'
      }
    }
  ],

  // Step 5: FAQ (100% same as original)
  faqData: [
    {
      question: {
        zhHK: '這個課程適合完全沒有技術背景的人嗎？',
        en: 'Is this course suitable for people with no technical background?'
      },
      answer: {
        zhHK: '是的！課程專為商業人士設計，不需要編程背景。我們會從基礎概念開始，逐步引導你掌握實用的自動化技能。',
        en: 'Yes! The course is designed for business professionals and requires no programming background.'
      }
    },
    {
      question: {
        zhHK: '課程完成後我能獲得什麼？',
        en: 'What will I get after completing the course?'
      },
      answer: {
        zhHK: '你將獲得完整的自動化實施手冊、AI 工具整合指南、實戰模板庫，以及業界認可的課程完成證書。',
        en: 'You will receive a complete automation implementation manual, AI tool integration guides, and an industry-recognized certificate.'
      }
    },
    {
      question: {
        zhHK: '課程內容會定期更新嗎？',
        en: 'Will the course content be updated regularly?'
      },
      answer: {
        zhHK: '是的，我們會根據最新的 AI 技術發展和市場趨勢，定期更新課程內容，確保你學到的都是最前沿的知識。',
        en: 'Yes, we regularly update the course content based on the latest AI technology developments and market trends.'
      }
    },
    {
      question: {
        zhHK: '如果我有問題可以獲得支援嗎？',
        en: 'Can I get support if I have questions?'
      },
      answer: {
        zhHK: '當然！我們提供專屬社群論壇和每月實時問答環節，你可以隨時與講師和其他學員交流討論。',
        en: 'Of course! We provide a dedicated community forum and monthly live Q&A sessions.'
      }
    },
    {
      question: {
        zhHK: '這個免費課程和付費版有什麼區別？',
        en: 'What\'s the difference between the free course and paid version?'
      },
      answer: {
        zhHK: '免費版包含核心的理論知識和基礎實戰練習。付費版則包含高級模板、一對一諮詢和更深入的案例研究。',
        en: 'The free version includes core theoretical knowledge and basic hands-on exercises.'
      }
    }
  ],

  // Step 6: 目標受眾 (100% same as original)
  targetAudience: {
    title: {
      zhHK: "適合對象",
      en: "Target Audience"
    },
    description: {
      zhHK: "本課程專為以下人群設計",
      en: "This course is designed for"
    },
    audiences: [
      {
        icon: <Users className="w-6 h-6 text-green-400" />,
        title: {
          zhHK: "企業主管",
          en: "Business Executives"
        },
        description: {
          zhHK: "想要了解 AI 自動化如何提升業務效率",
          en: "Want to understand how AI automation improves efficiency"
        }
      },
      {
        icon: <Brain className="w-6 h-6 text-green-400" />,
        title: {
          zhHK: "中小企業老闆",
          en: "SME Owners"
        },
        description: {
          zhHK: "尋求降低成本、提高競爭力的解決方案",
          en: "Seeking cost reduction and competitive advantage"
        }
      },
      {
        icon: <Rocket className="w-6 h-6 text-green-400" />,
        title: {
          zhHK: "職場工作者",
          en: "Working Professionals"
        },
        description: {
          zhHK: "希望學習新技能、提升個人價值",
          en: "Want to learn new skills and enhance personal value"
        }
      }
    ]
  },

  // Step 7: 免費課程專屬設定 (100% same as original)
  freeCourseSettings: {
    theme: "green", // 免費課程使用綠色主題
    pricing: {
      series: {
        zhHK: "免費課程",
        en: "Free Course"
      },
      price: {
        zhHK: "免費",
        en: "Free"
      },
      originalPrice: "", // 免費課程不顯示原價
      aiInOne: {
        zhHK: "完全免費",
        en: "Completely Free"
      },
      studentPrice: "",
      enterprise: {
        zhHK: "企業培訓服務請聯繫我們",
        en: "Contact us for enterprise training"
      }
    },
    learningPathExtended: true, // 啟用拉長的學習路徑容器
    badges: {
      courseType: {
        zhHK: "免費課程總覽",
        en: "Free Course Preview"
      },
      freeAccess: {
        zhHK: "免費學習",
        en: "Free Learning"
      }
    }
  },

  // Step 8: 導航和動作 (100% same as original)
  navigation: {
    learningPath: '/courses/ai-business-automation/learning',
    whatsappUrl: 'https://wa.me/85293816674'
  }
};

// 輔助函數：根據語言獲取課程信息
export const getFreeCourseInfo = (language: string) => {
  const isZhHK = language === 'zh-HK';
  const config = freeAIBusinessAutomationConfig;
  
  return {
    courseInfo: {
      badge: isZhHK ? config.courseInfo.badge.zhHK : config.courseInfo.badge.en,
      title: isZhHK ? config.courseInfo.title.zhHK : config.courseInfo.title.en,
      subtitle: isZhHK ? config.courseInfo.subtitle.zhHK : config.courseInfo.subtitle.en,
      instructor: config.courseInfo.instructor,
      instructorTitle: isZhHK ? config.courseInfo.instructorTitle.zhHK : config.courseInfo.instructorTitle.en,
      rating: config.courseInfo.rating,
      students: config.courseInfo.students,
      duration: config.courseInfo.duration
    },
    courseStats: config.courseStats.map(stat => ({
      icon: stat.icon,
      label: isZhHK ? stat.label.zhHK : stat.label.en,
      value: typeof stat.value === 'object' ? (isZhHK ? stat.value.zhHK : stat.value.en) : stat.value
    })),
    courseModules: config.courseModules,
    courseFeatures: config.courseFeatures.map(feature => ({
      icon: feature.icon,
      title: isZhHK ? feature.title.zhHK : feature.title.en,
      description: isZhHK ? feature.description.zhHK : feature.description.en,
      highlight: isZhHK ? feature.highlight.zhHK : feature.highlight.en
    })),
    faqData: config.faqData.map(faq => ({
      question: isZhHK ? faq.question.zhHK : faq.question.en,
      answer: isZhHK ? faq.answer.zhHK : faq.answer.en
    })),
    targetAudience: {
      title: isZhHK ? config.targetAudience.title.zhHK : config.targetAudience.title.en,
      description: isZhHK ? config.targetAudience.description.zhHK : config.targetAudience.description.en,
      audiences: config.targetAudience.audiences.map(audience => ({
        icon: audience.icon,
        title: isZhHK ? audience.title.zhHK : audience.title.en,
        description: isZhHK ? audience.description.zhHK : audience.description.en
      }))
    },
    freeCourseSettings: config.freeCourseSettings,
    navigation: config.navigation
  };
};

export default freeAIBusinessAutomationConfig; 