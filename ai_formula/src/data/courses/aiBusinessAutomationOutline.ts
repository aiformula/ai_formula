/**
 * AI Business Automation Free Course Outline Data
 * @fileoverview Complete outline data for the AI Business Automation free course
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { 
  Clock, 
  Users, 
  Star, 
  Zap, 
  Target, 
  Lightbulb,
  Rocket,
  Shield,
  Award,
  GraduationCap,
  Briefcase,
  UserCheck
} from 'lucide-react';

// Course basic information
export const aiBusinessAutomationCourseInfo = {
  badge: '免費',
  title: 'AI 商業自動化實戰課程',
  subtitle: '掌握實用的 AI 自動化技術，通過智能自動化解決方案轉型您的商業營運並推動增長。',
  instructor: 'Kenneth Wong',
  instructorTitle: 'AI 商業策略師',
  rating: 4.8,
  students: 1247,
  duration: '4.2 小時綜合培訓'
};

// Course statistics
export const aiBusinessAutomationStats = [
  {
    icon: React.createElement(Clock, { className: "w-5 h-5 text-green-400" }),
    label: '小時',
    value: '4.2'
  },
  {
    icon: React.createElement(Users, { className: "w-5 h-5 text-green-400" }),
    label: '學員',
    value: '1,247'
  },
  {
    icon: React.createElement(Star, { className: "w-5 h-5 text-green-400" }),
    label: '評分',
    value: '4.8'
  }
];

// Course modules with detailed lessons
export const aiBusinessAutomationModules = [
  {
    id: 1,
    title: 'AI 自動化基礎概念',
    description: '理解 AI 驅動的商業自動化核心原理，識別自動化機會',
    lessons: [
      {
        id: 1,
        title: '什麼是 AI 商業自動化？',
        duration: '15 分鐘',
        type: 'video' as const,
        isPreview: true
      },
      {
        id: 2,
        title: '自動化機會評估框架',
        duration: '20 分鐘',
        type: 'reading' as const,
        isPreview: true
      },
      {
        id: 3,
        title: 'ROI 計算實戰練習',
        duration: '10 分鐘',
        type: 'practice' as const,
        isPreview: false
      }
    ]
  },
  {
    id: 2,
    title: '客戶服務自動化',
    description: '使用 AI 工具構建智能聊天機器人和自動化客戶服務系統',
    lessons: [
      {
        id: 4,
        title: '智能聊天機器人設計原理',
        duration: '25 分鐘',
        type: 'video' as const,
        isPreview: true
      },
      {
        id: 5,
        title: '客戶旅程映射技巧',
        duration: '15 分鐘',
        type: 'reading' as const,
        isPreview: false
      },
      {
        id: 6,
        title: '實戰：建立你的第一個客服機器人',
        duration: '20 分鐘',
        type: 'practice' as const,
        isPreview: false
      }
    ]
  },
  {
    id: 3,
    title: 'AI 營銷自動化',
    description: '使用 AI 技術自動化營銷活動、內容生成和潛在客戶培育',
    lessons: [
      {
        id: 7,
        title: '個性化營銷策略',
        duration: '30 分鐘',
        type: 'video' as const,
        isPreview: false
      },
      {
        id: 8,
        title: 'AI 內容生成工具使用指南',
        duration: '25 分鐘',
        type: 'reading' as const,
        isPreview: false
      },
      {
        id: 9,
        title: '潛在客戶評分系統設置',
        duration: '20 分鐘',
        type: 'practice' as const,
        isPreview: false
      }
    ]
  },
  {
    id: 4,
    title: '銷售流程自動化',
    description: '使用 AI 驅動的潛在客戶資格審查、後續跟進自動化和管道管理',
    lessons: [
      {
        id: 10,
        title: '自動化銷售漏斗設計',
        duration: '25 分鐘',
        type: 'video' as const,
        isPreview: false
      },
      {
        id: 11,
        title: '銷售數據分析與預測',
        duration: '20 分鐘',
        type: 'reading' as const,
        isPreview: false
      },
      {
        id: 12,
        title: '提案自動生成系統',
        duration: '15 分鐘',
        type: 'practice' as const,
        isPreview: false
      }
    ]
  },
  {
    id: 5,
    title: '營運與數據分析自動化',
    description: '使用 AI 驅動的工具和工作流程自動化商業營運、報告和數據分析',
    lessons: [
      {
        id: 13,
        title: '自動化報告系統建立',
        duration: '35 分鐘',
        type: 'video' as const,
        isPreview: false
      },
      {
        id: 14,
        title: '預測分析實戰應用',
        duration: '25 分鐘',
        type: 'reading' as const,
        isPreview: false
      },
      {
        id: 15,
        title: '實時商業智能儀表板製作',
        duration: '30 分鐘',
        type: 'practice' as const,
        isPreview: false
      }
    ]
  }
];

// Course features
export const aiBusinessAutomationFeatures = [
  {
    icon: React.createElement(Zap, { className: "w-6 h-6 text-green-400" }),
    title: '實戰導向',
    description: '每個模組都包含實際操作練習，讓你能夠立即應用所學知識到實際業務中。',
    highlight: '立即應用'
  },
  {
    icon: React.createElement(Target, { className: "w-6 h-6 text-green-400" }),
    title: '個性化學習',
    description: '根據你的行業和業務需求，提供定制化的自動化解決方案和建議。',
    highlight: '量身定制'
  },
  {
    icon: React.createElement(Lightbulb, { className: "w-6 h-6 text-green-400" }),
    title: '創新工具',
    description: '學習使用最新的 AI 工具和平台，掌握前沿的自動化技術。',
    highlight: '前沿技術'
  },
  {
    icon: React.createElement(Rocket, { className: "w-6 h-6 text-green-400" }),
    title: '快速成果',
    description: '課程結束後，你將能夠在數週內實施自動化解決方案並看到效果。',
    highlight: '快速見效'
  },
  {
    icon: React.createElement(Shield, { className: "w-6 h-6 text-green-400" }),
    title: '風險管控',
    description: '學習如何安全地實施自動化，避免常見陷阱和潛在風險。',
    highlight: '安全可靠'
  },
  {
    icon: React.createElement(Award, { className: "w-6 h-6 text-green-400" }),
    title: '專家認證',
    description: '獲得業界認可的 AI 自動化實戰證書，提升你的專業資歷。',
    highlight: '權威認證'
  }
];

// FAQ data
export const aiBusinessAutomationFAQ = [
  {
    question: '這個課程適合完全沒有技術背景的人嗎？',
    answer: '是的！課程專為商業人士設計，不需要編程背景。我們會從基礎概念開始，逐步引導你掌握實用的自動化技能。'
  },
  {
    question: '課程完成後我能獲得什麼？',
    answer: '你將獲得完整的自動化實施手冊、AI 工具整合指南、實戰模板庫，以及業界認可的課程完成證書。'
  },
  {
    question: '課程內容會定期更新嗎？',
    answer: '是的，我們會根據最新的 AI 技術發展和市場趨勢，定期更新課程內容，確保你學到的都是最前沿的知識。'
  },
  {
    question: '如果我有問題可以獲得支援嗎？',
    answer: '當然！我們提供專屬社群論壇和每月實時問答環節，你可以隨時與講師和其他學員交流討論。'
  },
  {
    question: '這個免費課程和付費版有什麼區別？',
    answer: '免費版包含核心的理論知識和基礎實戰練習。付費版則包含高級模板、一對一諮詢和更深入的案例研究。'
  }
];

// Target audience
export const aiBusinessAutomationTargetAudience = {
  title: '適合學習的對象',
  description: '無論你是企業主、管理者還是希望提升技能的專業人士，這門課程都能幫助你掌握 AI 自動化的實用技能。',
  audiences: [
    {
      icon: React.createElement(GraduationCap, { className: "w-8 h-8 text-green-400" }),
      title: '中小企業主',
      description: '希望通過自動化提升營運效率，降低成本，提高競爭力的企業主。'
    },
    {
      icon: React.createElement(Briefcase, { className: "w-8 h-8 text-green-400" }),
      title: '業務經理',
      description: '負責流程優化和效率提升的管理者，希望學習如何實施自動化解決方案。'
    },
    {
      icon: React.createElement(UserCheck, { className: "w-8 h-8 text-green-400" }),
      title: '專業人士',
      description: '希望提升職場競爭力，學習前沿技術的營銷、銷售和營運專業人士。'
    }
  ]
}; 