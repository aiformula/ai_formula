/**
 * Perplexity Complete Course Theme Module
 * @fileoverview Perplexity 完整教學實戰課程主題頁面 - 100% ChatGPT 設計複製
 * @author AI Formula Team
 * @version 2.0.0
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  Target, Trophy, Star, Lightbulb, Users, Award,
  TrendingUp, Zap, BarChart3, AlertCircle, ChevronRight, Video
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerplexityProgress } from '@/hooks/usePerplexityProgress';

const PerplexityCompleteCourseTheme: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 使用進度追蹤 Hook
  const { 
    isThemeCompleted,
    getThemeProgress,
    getProgressStats,
    completeUnit,
    themeProgress,
    courseStats,
    progressState
  } = usePerplexityProgress();

  // 主題數據 - 根據 Perplexity 課程設計
  const themes = {
    '1': {
      id: 1,
      title: isZhHK ? 'Perplexity AI 入門 — 重新定義資訊搜索' : 'Perplexity AI Fundamentals — Redefining Information Search',
      description: isZhHK ? '這個單元為零基礎學員打好穩固根基，理解 Perplexity AI 的運作原理與價值，並完成所有前置準備。' : 'This unit builds a solid foundation for beginners, understanding how Perplexity AI works and its value.',
      progress: getThemeProgress(1),
      estimatedTime: '90分鐘',
      totalUnits: 5,
      completedUnits: progressState.completedUnits[1]?.length || 0,
      units: [
        {
          id: 1,
          title: isZhHK ? '什麼是 Perplexity AI？——「答案引擎」vs 搜索引擎' : 'What is Perplexity AI? — "Answer Engine" vs Search Engine',
          duration: '15分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[1]?.includes(1) || false,
          current: !progressState.completedUnits[1]?.includes(1),
          description: isZhHK ? '深入了解 Perplexity AI 的核心概念、工作原理和獨特定位，理解它與傳統搜索引擎的根本差異。' : 'Understand Perplexity AI core concepts and fundamental differences from traditional search engines.'
        },
        {
          id: 2,
          title: isZhHK ? 'Perplexity 的核心使命：知識民主化' : 'Perplexity Core Mission: Knowledge Democratization',
          duration: '18分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[1]?.includes(2) || false,
          current: (progressState.completedUnits[1]?.includes(1) || false) && !(progressState.completedUnits[1]?.includes(2) || false),
          description: isZhHK ? '探討 Perplexity 的願景和使命，理解它如何通過技術創新實現知識獲取的民主化。' : 'Explore Perplexity vision and how it democratizes knowledge access through innovation.'
        },
        {
          id: 3,
          title: isZhHK ? '與 ChatGPT、Google 的差異化競爭優勢' : 'Competitive Advantages vs ChatGPT and Google',
          duration: '20分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[1]?.includes(3) || false,
          current: (progressState.completedUnits[1]?.includes(2) || false) && !(progressState.completedUnits[1]?.includes(3) || false),
          description: isZhHK ? '深入比較 Perplexity AI 與主流競爭對手的核心差異，理解各自的優勢和適用場景。' : 'Compare Perplexity AI with major competitors and understand unique advantages.'
        },
        {
          id: 4,
          title: isZhHK ? 'Citations 的重要性：建立可信的資訊來源' : 'Importance of Citations: Building Trustworthy Information Sources',
          duration: '17分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[1]?.includes(4) || false,
          current: (progressState.completedUnits[1]?.includes(3) || false) && !(progressState.completedUnits[1]?.includes(4) || false),
          description: isZhHK ? '深入了解 Perplexity 的引用系統如何確保資訊可靠性，以及如何有效利用這個功能。' : 'Understand how Perplexity citation system ensures information reliability.'
        },
        {
          id: 5,
          title: isZhHK ? '適用場景分析：何時選擇 Perplexity？' : 'Use Case Analysis: When to Choose Perplexity?',
          duration: '20分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[1]?.includes(5) || false,
          current: (progressState.completedUnits[1]?.includes(4) || false) && !(progressState.completedUnits[1]?.includes(5) || false),
          description: isZhHK ? '掌握 Perplexity AI 的最佳使用場景，學會在不同情況下選擇最合適的 AI 工具。' : 'Master optimal use scenarios for Perplexity AI and tool selection strategies.'
        }
      ],
      quiz: {
        title: isZhHK ? '第一章測驗：Perplexity AI 入門' : 'Chapter 1 Quiz: Perplexity AI Fundamentals',
        description: isZhHK ? '測試您對 Perplexity AI 基礎概念的理解。' : 'Test your understanding of Perplexity AI fundamental concepts.',
        questions: 6,
        timeLimit: '15分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '理解核心：Perplexity 是答案引擎，不是搜索引擎，它直接提供整合答案。' : 'Core Understanding: Perplexity is an answer engine, not a search engine, providing integrated answers directly.',
        isZhHK ? '引用價值：每個答案都有可驗證的來源，這是 Perplexity 的核心競爭力。' : 'Citation Value: Every answer has verifiable sources, which is Perplexity core competitive advantage.',
        isZhHK ? '場景選擇：最適合事實密集型、需要最新資訊的研究任務。' : 'Scenario Selection: Best suited for fact-intensive research requiring up-to-date information.'
      ]
    },
    '2': {
      id: 2,
      title: isZhHK ? '掌握介面 — 全面功能導覽' : 'Mastering the Interface — Comprehensive Feature Tour',
      description: isZhHK ? '系統性地學習 Perplexity 的各項功能和介面設計，為高效使用打下堅實基礎。' : 'Systematically learn Perplexity features and interface design for efficient usage.',
      progress: getThemeProgress(2),
      estimatedTime: '72分鐘',
      totalUnits: 5,
      completedUnits: progressState.completedUnits[2]?.length || 0,
      units: [
        {
          id: 6,
          title: isZhHK ? '主介面導覽：搜索框、側邊欄與功能區' : 'Main Interface Tour: Search Box, Sidebar & Function Areas',
          duration: '15分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[2]?.includes(6) || false,
          current: !progressState.completedUnits[2]?.includes(6),
          description: isZhHK ? '熟悉 Perplexity 的主要介面元素，掌握基本操作流程。' : 'Familiarize with Perplexity main interface elements and basic operations.'
        },
        {
          id: 7,
          title: isZhHK ? '帳戶設定與個人化選項' : 'Account Settings & Personalization Options',
          duration: '12分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[2]?.includes(7) || false,
          current: (progressState.completedUnits[2]?.includes(6) || false) && !(progressState.completedUnits[2]?.includes(7) || false),
          description: isZhHK ? '配置個人偏好設定，優化使用體驗。' : 'Configure personal preferences and optimize user experience.'
        },
        {
          id: 8,
          title: isZhHK ? '免費 vs Pro 功能對比一覽' : 'Free vs Pro Feature Comparison Overview',
          duration: '18分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[2]?.includes(8) || false,
          current: (progressState.completedUnits[2]?.includes(7) || false) && !(progressState.completedUnits[2]?.includes(8) || false),
          description: isZhHK ? '了解不同版本的功能差異，制定最佳訂閱策略。' : 'Understand version differences and develop optimal subscription strategies.'
        },
        {
          id: 9,
          title: isZhHK ? '快捷鍵與效率技巧' : 'Shortcuts & Efficiency Tips',
          duration: '15分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[2]?.includes(9) || false,
          current: (progressState.completedUnits[2]?.includes(8) || false) && !(progressState.completedUnits[2]?.includes(9) || false),
          description: isZhHK ? '提升操作效率的實用技巧和快捷方式。' : 'Practical tips and shortcuts for improved operational efficiency.'
        },
        {
          id: 10,
          title: isZhHK ? '移動端 vs 桌面端體驗差異' : 'Mobile vs Desktop Experience Differences',
          duration: '12分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[2]?.includes(10) || false,
          current: (progressState.completedUnits[2]?.includes(9) || false) && !(progressState.completedUnits[2]?.includes(10) || false),
          description: isZhHK ? '跨平台使用經驗分享，優化多端體驗。' : 'Cross-platform usage experience and multi-device optimization.'
        }
      ],
      quiz: {
        title: isZhHK ? '第二章測驗：掌握介面' : 'Chapter 2 Quiz: Mastering the Interface',
        description: isZhHK ? '測試您對 Perplexity 介面和功能的掌握程度。' : 'Test your mastery of Perplexity interface and features.',
        questions: 5,
        timeLimit: '10分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '介面熟悉：花時間熟悉各個功能區，這將大大提升後續使用效率。' : 'Interface Familiarity: Spend time familiarizing with function areas for improved efficiency.',
        isZhHK ? '個人化設定：根據使用習慣調整設定，打造專屬的使用體驗。' : 'Personalization: Adjust settings according to usage habits for a customized experience.',
        isZhHK ? '跨平台思維：不同平台有不同優勢，學會靈活切換使用。' : 'Cross-platform Thinking: Different platforms have different advantages, learn to switch flexibly.'
      ]
    },
    '3': {
      id: 3,
      title: isZhHK ? '核心搜索功能詳解 — 精準獲取答案的藝術' : 'Core Search Features Explained — The Art of Getting Precise Answers',
      description: isZhHK ? '深入學習 Perplexity 的核心搜索功能，掌握精準提問技巧和高級搜索策略。' : 'Deep dive into Perplexity core search features, mastering precise questioning and advanced search strategies.',
      progress: getThemeProgress(3),
      estimatedTime: '100分鐘',
      totalUnits: 5,
      completedUnits: progressState.completedUnits[3]?.length || 0,
      units: [
        {
          id: 11,
          title: isZhHK ? '有效提問的藝術：如何與 AI 對話' : 'The Art of Effective Questioning: How to Communicate with AI',
          duration: '20分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[3]?.includes(11) || false,
          current: !progressState.completedUnits[3]?.includes(11),
          description: isZhHK ? '學習如何構建有效的問題，提升 AI 回答的準確性和實用性。' : 'Learn how to construct effective questions to improve AI response accuracy and usefulness.'
        },
        {
          id: 12,
          title: isZhHK ? 'Focus 模式詳解：Academic、Writing、Math 等專業場景' : 'Focus Modes Explained: Academic, Writing, Math and Professional Scenarios',
          duration: '25分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[3]?.includes(12) || false,
          current: (progressState.completedUnits[3]?.includes(11) || false) && !(progressState.completedUnits[3]?.includes(12) || false),
          description: isZhHK ? '深入了解各種 Focus 模式的特點和最佳應用場景。' : 'Deep understanding of various Focus modes characteristics and optimal application scenarios.'
        },
        {
          id: 13,
          title: isZhHK ? '檔案上傳與分析：PDF、圖片、文件智能解析' : 'File Upload and Analysis: PDF, Images, and Document Intelligence',
          duration: '18分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[3]?.includes(13) || false,
          current: (progressState.completedUnits[3]?.includes(12) || false) && !(progressState.completedUnits[3]?.includes(13) || false),
          description: isZhHK ? '掌握檔案上傳功能，讓 AI 智能分析各種文檔內容。' : 'Master file upload functionality for AI-powered analysis of various document types.'
        },
        {
          id: 14,
          title: isZhHK ? 'Copilot 建議系統：發現「未知的未知」' : 'Copilot Suggestion System: Discovering "Unknown Unknowns"',
          duration: '22分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[3]?.includes(14) || false,
          current: (progressState.completedUnits[3]?.includes(13) || false) && !(progressState.completedUnits[3]?.includes(14) || false),
          description: isZhHK ? '善用 Copilot 建議，拓展思考邊界，發現更多探索角度。' : 'Leverage Copilot suggestions to expand thinking boundaries and discover new exploration angles.'
        },
        {
          id: 15,
          title: isZhHK ? '高級搜索策略：時間、來源、語言等多維度限制' : 'Advanced Search Strategies: Multi-dimensional Constraints Including Time, Sources, and Languages',
          duration: '15分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[3]?.includes(15) || false,
          current: (progressState.completedUnits[3]?.includes(14) || false) && !(progressState.completedUnits[3]?.includes(15) || false),
          description: isZhHK ? '學習運用各種搜索限制條件，精確定位所需資訊。' : 'Learn to use various search constraints to precisely locate required information.'
        }
      ],
      quiz: {
        title: isZhHK ? '第三章測驗：核心搜索功能' : 'Chapter 3 Quiz: Core Search Features',
        description: isZhHK ? '測試您對核心搜索功能的掌握程度。' : 'Test your mastery of core search features.',
        questions: 6,
        timeLimit: '15分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '提問技巧：詳細描述背景脈絡，提供身份和目標資訊，能獲得更精準的答案。' : 'Questioning Skills: Provide detailed background context and identity/goal information for more precise answers.',
        isZhHK ? 'Focus 選擇：不同模式有不同優勢，Academic 適合學術、Writing 適合創作、Math 適合計算。' : 'Focus Selection: Different modes have different advantages - Academic for research, Writing for creation, Math for calculations.',
        isZhHK ? '檔案分析：善用上傳功能分析複雜文檔，提問時要明確具體，避免籠統的「分析這個檔案」。' : 'File Analysis: Leverage upload feature for complex document analysis with specific questions, avoid vague "analyze this file".'
      ]
    },
    '4': {
      id: 4,
      title: isZhHK ? '知識管理與分享 — 善用 Library、Spaces 與 Pages' : 'Knowledge Management & Sharing — Mastering Library, Spaces & Pages',
      description: isZhHK ? '學習 Perplexity 的知識組織和分享功能，建立高效的個人研究工作流程。' : 'Learn Perplexity knowledge organization and sharing features to build efficient personal research workflows.',
      progress: getThemeProgress(4),
      estimatedTime: '90分鐘',
      totalUnits: 4,
      completedUnits: progressState.completedUnits[4]?.length || 0,
      units: [
        {
          id: 16,
          title: isZhHK ? '「Library」入門：你的個人研究資料庫' : 'Library Basics: Your Personal Research Database',
          duration: '20分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[4]?.includes(16) || false,
          current: !progressState.completedUnits[4]?.includes(16),
          description: isZhHK ? '了解 Library 的核心功能，建立個人知識中心。' : 'Understand Library core functionality and build your personal knowledge center.'
        },
        {
          id: 17,
          title: isZhHK ? '從「Collections」到「Spaces」：項目式研究的演進' : 'From Collections to Spaces: Evolution of Project-based Research',
          duration: '25分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[4]?.includes(17) || false,
          current: (progressState.completedUnits[4]?.includes(16) || false) && !(progressState.completedUnits[4]?.includes(17) || false),
          description: isZhHK ? '理解 Spaces 的設計理念和項目式研究的優勢。' : 'Understand Spaces design philosophy and advantages of project-based research.'
        },
        {
          id: 18,
          title: isZhHK ? '如何建立與管理 Spaces：設定專屬指令與協作' : 'Creating and Managing Spaces: Custom Instructions and Collaboration',
          duration: '22分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[4]?.includes(18) || false,
          current: (progressState.completedUnits[4]?.includes(17) || false) && !(progressState.completedUnits[4]?.includes(18) || false),
          description: isZhHK ? '掌握 Spaces 的創建、管理和協作功能。' : 'Master Spaces creation, management, and collaboration features.'
        },
        {
          id: 19,
          title: isZhHK ? 'Pages 深度應用：從研究到報告的無縫轉換' : 'Pages Advanced Applications: Seamless Transition from Research to Reports',
          duration: '23分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[4]?.includes(19) || false,
          current: (progressState.completedUnits[4]?.includes(18) || false) && !(progressState.completedUnits[4]?.includes(19) || false),
          description: isZhHK ? '學習使用 Pages 創建專業報告和分享研究成果。' : 'Learn to use Pages for creating professional reports and sharing research results.'
        }
      ],
      quiz: {
        title: isZhHK ? '第四章測驗：知識管理與分享' : 'Chapter 4 Quiz: Knowledge Management & Sharing',
        description: isZhHK ? '測試您對知識管理功能的理解。' : 'Test your understanding of knowledge management features.',
        questions: 6,
        timeLimit: '12分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? 'Library 策略：將所有對話視為知識資產，定期整理和分類，建立個人知識庫。' : 'Library Strategy: Treat all conversations as knowledge assets, regularly organize and categorize to build personal knowledge base.',
        isZhHK ? 'Spaces 管理：明確命名規範，設定專屬指令，善用協作功能進行團隊研究。' : 'Spaces Management: Clear naming conventions, custom instructions, leverage collaboration for team research.',
        isZhHK ? 'Pages 創作：從 Spaces 到 Pages 的轉換是關鍵技能，學會將研究轉化為可分享的內容。' : 'Pages Creation: Spaces-to-Pages conversion is a key skill - learn to transform research into shareable content.'
      ]
    },
    '5': {
      id: 5,
      title: isZhHK ? '釋放全部潛力 — Perplexity Pro 進階功能與訂閱方案' : 'Unlocking Full Potential — Perplexity Pro Advanced Features & Subscription Plans',
      description: isZhHK ? '深入了解 Perplexity Pro 的進階功能，學習如何最大化投資回報。' : 'Deep dive into Perplexity Pro advanced features and learn how to maximize return on investment.',
      progress: getThemeProgress(5),
      estimatedTime: '80分鐘',
      totalUnits: 4,
      completedUnits: progressState.completedUnits[5]?.length || 0,
      units: [
        {
          id: 20,
          title: isZhHK ? 'Pro 訂閱方案詳解：費用、功能與價值分析' : 'Pro Subscription Details: Cost, Features & Value Analysis',
          duration: '18分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[5]?.includes(20) || false,
          current: !progressState.completedUnits[5]?.includes(20),
          description: isZhHK ? '全面分析 Pro 訂閱的成本效益和核心價值。' : 'Comprehensive analysis of Pro subscription cost-effectiveness and core value.'
        },
        {
          id: 21,
          title: isZhHK ? 'Pro Search 與 AI 模型選擇：GPT-4、Claude、Gemini 比較' : 'Pro Search & AI Model Selection: GPT-4, Claude, Gemini Comparison',
          duration: '25分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[5]?.includes(21) || false,
          current: (progressState.completedUnits[5]?.includes(20) || false) && !(progressState.completedUnits[5]?.includes(21) || false),
          description: isZhHK ? '了解不同 AI 模型的特點和最佳應用場景。' : 'Understand different AI models characteristics and optimal application scenarios.'
        },
        {
          id: 22,
          title: isZhHK ? '個人化設定與偏好：打造專屬的 AI 助手' : 'Personalization Settings & Preferences: Creating Your Custom AI Assistant',
          duration: '20分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[5]?.includes(22) || false,
          current: (progressState.completedUnits[5]?.includes(21) || false) && !(progressState.completedUnits[5]?.includes(22) || false),
          description: isZhHK ? '學習個人化設定，打造符合個人需求的 AI 體驗。' : 'Learn personalization settings to create AI experience tailored to personal needs.'
        },
        {
          id: 23,
          title: isZhHK ? 'API 整合與自動化：企業級應用的可能性' : 'API Integration & Automation: Enterprise-level Application Possibilities',
          duration: '17分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[5]?.includes(23) || false,
          current: (progressState.completedUnits[5]?.includes(22) || false) && !(progressState.completedUnits[5]?.includes(23) || false),
          description: isZhHK ? '探索 Perplexity API 的企業應用和自動化整合可能性。' : 'Explore Perplexity API enterprise applications and automation integration possibilities.'
        }
      ],
      quiz: {
        title: isZhHK ? '第五章測驗：Pro 進階功能' : 'Chapter 5 Quiz: Pro Advanced Features',
        description: isZhHK ? '測試您對 Pro 功能的掌握程度。' : 'Test your mastery of Pro features.',
        questions: 7,
        timeLimit: '15分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? 'Pro 投資：對於重度使用者，每天節省 30 分鐘的研究時間就能創造遠超 $20 的價值。' : 'Pro Investment: For heavy users, saving 30 minutes of research time daily creates value far exceeding $20.',
        isZhHK ? '模型選擇：GPT-4 適合創意和複雜推理，Claude 適合文檔分析，Gemini 適合數據處理。' : 'Model Selection: GPT-4 for creativity and complex reasoning, Claude for document analysis, Gemini for data processing.',
        isZhHK ? 'API 應用：考慮將 Perplexity 整合到現有工作流程中，實現研究和分析的自動化。' : 'API Applications: Consider integrating Perplexity into existing workflows for automated research and analysis.'
      ]
    },
    '6': {
      id: 6,
      title: isZhHK ? '實戰與比較 — Perplexity 在 AI 工具生態中的定位' : 'Practice & Comparison — Perplexity Position in AI Tools Ecosystem',
      description: isZhHK ? '通過實戰案例學習 Perplexity 的最佳應用場景，以及與其他 AI 工具的協同策略。' : 'Learn Perplexity optimal application scenarios through practical cases and collaboration strategies with other AI tools.',
      progress: getThemeProgress(6),
      estimatedTime: '102分鐘',
      totalUnits: 4,
      completedUnits: progressState.completedUnits[6]?.length || 0,
      units: [
        {
          id: 24,
          title: isZhHK ? '學術研究實戰：文獻綜述與論文寫作' : 'Academic Research Practice: Literature Review & Paper Writing',
          duration: '28分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[6]?.includes(24) || false,
          current: !progressState.completedUnits[6]?.includes(24),
          description: isZhHK ? '實戰演練如何使用 Perplexity 進行學術研究和論文寫作。' : 'Practical demonstration of using Perplexity for academic research and paper writing.'
        },
        {
          id: 25,
          title: isZhHK ? '商業應用案例：市場分析與競爭對手研究' : 'Business Application Cases: Market Analysis & Competitor Research',
          duration: '26分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[6]?.includes(25) || false,
          current: (progressState.completedUnits[6]?.includes(24) || false) && !(progressState.completedUnits[6]?.includes(25) || false),
          description: isZhHK ? '學習在商業環境中應用 Perplexity 進行市場和競爭分析。' : 'Learn to apply Perplexity in business environments for market and competitive analysis.'
        },
        {
          id: 26,
          title: isZhHK ? '與 ChatGPT、Google 的協同工作流程設計' : 'Collaborative Workflow Design with ChatGPT and Google',
          duration: '25分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[6]?.includes(26) || false,
          current: (progressState.completedUnits[6]?.includes(25) || false) && !(progressState.completedUnits[6]?.includes(26) || false),
          description: isZhHK ? '設計高效的多工具協同工作流程，發揮各工具優勢。' : 'Design efficient multi-tool collaborative workflows leveraging each tool advantages.'
        },
        {
          id: 27,
          title: isZhHK ? '未來展望：答案引擎時代的機遇與挑戰' : 'Future Outlook: Opportunities and Challenges in the Answer Engine Era',
          duration: '23分鐘',
          type: 'interactive',
          completed: progressState.completedUnits[6]?.includes(27) || false,
          current: (progressState.completedUnits[6]?.includes(26) || false) && !(progressState.completedUnits[6]?.includes(27) || false),
          description: isZhHK ? '探討答案引擎對未來工作和學習方式的深遠影響。' : 'Explore the profound impact of answer engines on future work and learning methods.'
        }
      ],
      quiz: {
        title: isZhHK ? '第六章測驗：實戰與比較' : 'Chapter 6 Quiz: Practice & Comparison',
        description: isZhHK ? '測試您對實戰應用的理解程度。' : 'Test your understanding of practical applications.',
        questions: 8,
        timeLimit: '18分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '實戰關鍵：理論學習後必須進行實際操練，將 Perplexity 融入日常工作流程。' : 'Practice Key: Must conduct actual practice after theoretical learning, integrate Perplexity into daily workflows.',
        isZhHK ? '工具協同：Perplexity 擅長資訊收集，ChatGPT 擅長內容創作，組合使用效果最佳。' : 'Tool Synergy: Perplexity excels at information gathering, ChatGPT at content creation - combination works best.',
        isZhHK ? '未來準備：培養批判思維、提升 AI 素養、持續學習是應對答案引擎時代的關鍵。' : 'Future Preparation: Developing critical thinking, improving AI literacy, and continuous learning are key to the answer engine era.'
      ]
    }
  };

  // 獲取當前主題
  const currentThemeId = parseInt(themeId || '1');
  const currentTheme = themes[themeId as keyof typeof themes];

  if (!currentTheme) {
    return <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{isZhHK ? '主題不存在' : 'Theme not found'}</h1>
        <Button onClick={() => navigate('/courses/perplexity-complete-course/learning')}>
          {isZhHK ? '返回課程總覽' : 'Back to Course Overview'}
        </Button>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen perplexity-theme-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="ai-container pt-40 pb-8">
        {/* Breadcrumb */}
        <motion.div 
          className="breadcrumb mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/courses/perplexity-complete-course/learning')}
            className="breadcrumb-item text-gray-400 hover:text-gray-300 transition-colors"
          >
            {isZhHK ? '返回課程總覽' : 'Back to Course Overview'}
          </button>
          <span className="breadcrumb-separator text-gray-500 mx-2">/</span>
          <span className="breadcrumb-current text-white">
            {isZhHK ? `第${themeId}大主題` : `Theme ${themeId}`}
          </span>
        </motion.div>

        {/* Theme Header - IMPROVED */}
        <motion.div 
          className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 mb-8 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center">
                <span className="text-data text-white">{currentTheme.id}</span>
              </div>
              <div>
                <Badge className="badge-primary mb-2 bg-gray-700 text-white">
                  {isZhHK ? `第${currentTheme.id}大主題` : `Theme ${currentTheme.id}`}
                </Badge>
                <h1 className="text-h1 leading-tight mb-2">
                  {currentTheme.title}
                </h1>
                <p className="text-body">{currentTheme.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-data text-gray-300 mb-1">{currentTheme.progress}%</div>
              <div className="text-caption">{isZhHK ? '完成進度' : 'Progress'}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-caption">
                {currentTheme.completedUnits} / {currentTheme.totalUnits} {isZhHK ? '單元完成' : 'units completed'}
              </span>
              <span className="text-caption">{currentTheme.estimatedTime}</span>
            </div>
            <div className="progress-bar progress-bar-large bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="progress-bar-fill bg-gradient-to-r from-gray-600 to-gray-800 h-full rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${currentTheme.progress}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Units */}
          <div className="lg:col-span-2">
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 mb-8 rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="content-section-header flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-gray-400 mr-3" />
                <h2 className="text-h2">{isZhHK ? '課程單元' : 'Course Units'}</h2>
              </div>

              <div className="space-y-4">
                {currentTheme.units.map((unit, index) => (
                  <motion.div
                    key={unit.id}
                    className={`unit-card p-6 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      unit.completed ? 'border-green-400/30 bg-green-400/10' : 
                      unit.current ? 'border-gray-500/50 bg-gray-800/50' : 
                      'border-gray-600/30 bg-gray-700/20'
                    }`}
                    onClick={() => {
                      const actualLessonId = unit.id || index + 1;
                      console.log(`Theme page navigation: theme ${themeId}, lesson ID ${actualLessonId} (unit index ${index})`);
                      navigate(`/courses/perplexity-complete-course/theme/${themeId}/unit/${actualLessonId}`);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                          unit.completed ? 'bg-green-500' : 
                          unit.current ? 'bg-gray-600' : 'bg-gray-600'
                        }`}>
                          {unit.completed ? <CheckCircle className="w-6 h-6" /> : 
                           unit.current ? <Play className="w-6 h-6" /> : unit.id}
                        </div>
                        <div>
                          <h3 className="text-unit-title mb-1">{unit.title}</h3>
                          <div className="flex items-center space-x-4 text-caption">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{unit.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              {unit.type === 'video' ? <Video className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                              <span>{unit.type === 'video' ? (isZhHK ? '影片' : 'Video') : (isZhHK ? '互動' : 'Interactive')}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                    
                    <p className="text-body leading-relaxed mb-4">
                      {unit.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-caption px-3 py-1 rounded-full ${
                        unit.completed ? 'bg-green-400/20 text-green-300' : 
                        unit.current ? 'bg-gray-600/50 text-gray-300' : 
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {unit.completed ? (isZhHK ? '已完成' : 'Completed') : 
                         unit.current ? (isZhHK ? '進行中' : 'In Progress') : 
                         (isZhHK ? '待開始' : 'Not Started')}
                      </span>
                      {unit.current && (
                        <Button className="btn-primary px-4 py-2">
                          {isZhHK ? '繼續學習' : 'Continue'}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quiz Section - HEAVILY IMPROVED */}
            <motion.div 
              className="quiz-container bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="quiz-header text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-h3 text-yellow-300 mb-2">{currentTheme.quiz.title}</h2>
                <p className="text-body text-white/80 mb-6">{currentTheme.quiz.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-data text-yellow-400 mb-1">{currentTheme.quiz.questions}</div>
                  <div className="text-label">{isZhHK ? '題目數量' : 'Questions'}</div>
                </div>
                <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="text-data text-orange-400 mb-1">{currentTheme.quiz.timeLimit}</div>
                  <div className="text-label">{isZhHK ? '建議時間' : 'Time Limit'}</div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  className="btn-primary-action px-8 py-4 transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate(`/courses/perplexity-complete-course/theme/${themeId}/quiz`)}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  {isZhHK ? '開始測驗' : 'Start Quiz'}
                </Button>
                <p className="text-caption mt-3">
                  {isZhHK ? '完成所有單元後建議進行測驗' : 'Complete all units before taking the quiz'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Tips & Progress */}
          <div className="space-y-6">
            {/* Tips Section - CLEAN TEXT-FOCUSED DESIGN */}
            <motion.div 
              className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 backdrop-blur-lg border border-gray-700/60 rounded-3xl p-8 shadow-2xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Enhanced Header */}
              <div className="flex items-center mb-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-5 shadow-xl">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isZhHK ? '學習要訣' : 'Key Learning Points'}
                  </h3>
                  <p className="text-base text-gray-300 font-medium">
                    {isZhHK ? '本章核心提示' : 'Essential chapter tips'}
                  </p>
                </div>
              </div>

              {/* Clean Text-Based Tips */}
              <div className="space-y-6">
                {currentTheme.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.15 }}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    
                    {/* Clean Card Design */}
                    <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 border border-gray-600/30 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                      {/* Simple Left-Aligned Content */}
                      <div className="flex items-start">
                        {/* Minimal Bullet Point */}
                        <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        
                        {/* Clean Text Content */}
                        <div className="flex-1">
                          <p className="text-gray-100 text-lg leading-relaxed font-medium text-left">
                            {tip}
                          </p>
                        </div>
                      </div>
                      
                      {/* Subtle Left Border Accent */}
                      <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-yellow-400/0 via-yellow-400/40 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-full"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Simple Bottom Section */}
              <div className="mt-10 pt-6 border-t border-gray-700/40">
                <p className="text-center text-gray-400 text-sm font-medium">
                  {isZhHK ? '掌握這些要點，學習更有效率' : 'Master these points for better learning'}
                </p>
              </div>
            </motion.div>

            {/* Progress Summary */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-h3 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                {isZhHK ? '學習進度' : 'Learning Progress'}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-caption">主題完成度</span>
                  <span className="text-body">{currentTheme.progress}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-caption">完成單元</span>
                  <span className="text-body">{currentTheme.completedUnits}/{currentTheme.totalUnits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-caption">預估時間</span>
                  <span className="text-body">{currentTheme.estimatedTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerplexityCompleteCourseTheme; 