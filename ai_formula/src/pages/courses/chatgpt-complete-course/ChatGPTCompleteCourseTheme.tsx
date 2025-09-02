/**
 * ChatGPT Complete Course Theme Module
 * @fileoverview ChatGPT 完整教學實戰課程主題頁面 - 跟隨 AI 商業自動化設計
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
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress';

const ChatGPTCompleteCourseTheme: React.FC = () => {
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
    courseStats
  } = useChatGPTProgress();

  // 主題數據 - 根據 AI 商業自動化模式重新設計
  const themes = {
    '1': {
      id: 1,
      title: isZhHK ? 'AI 革命的開端：重新認識 ChatGPT' : 'The Beginning of AI Revolution: Rediscovering ChatGPT',
      description: isZhHK ? '這個單元為零基礎學員打好穩固根基，理解 ChatGPT 的運作原理與價值，並完成所有前置準備。' : 'This unit builds a solid foundation for beginners, understanding how ChatGPT works and its value.',
      progress: (() => {
        const progress = getThemeProgress(1);
        return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
      })(),
      estimatedTime: '240分鐘',
      totalUnits: 5,
      completedUnits: (() => {
        const progress = getThemeProgress(1);
        return progress ? progress.completedUnits.length : 0;
      })(),
      units: [
        {
          id: 1,
          title: isZhHK ? '歡迎來到 AI 新紀元：課程簡介與學習地圖' : 'Welcome to the New AI Era: Course Introduction & Learning Map',
          duration: '15分鐘',
          type: 'video',
          completed: getThemeProgress(1)?.completedUnits.includes(1) || false,
          current: !getThemeProgress(1)?.completedUnits.includes(1),
          description: isZhHK ? '全面了解課程架構，建立正確的 AI 學習心態，掌握高效學習方法，為接下來的學習旅程做好準備。' : 'Comprehensive course overview and establishing the right AI learning mindset.'
        },
        {
          id: 2,
          title: isZhHK ? 'ChatGPT 是什麼？白話拆解大型語言模型 (LLM) 核心概念' : 'What is ChatGPT? Breaking Down Large Language Model (LLM) Core Concepts',
          duration: '25分鐘',
          type: 'interactive',
          completed: getThemeProgress(1)?.completedUnits.includes(2) || false,
          current: (getThemeProgress(1)?.completedUnits.includes(1) || false) && !(getThemeProgress(1)?.completedUnits.includes(2) || false),
          description: isZhHK ? '深入淺出解析 ChatGPT 的技術原理，理解大型語言模型的運作機制，建立正確的技術認知基礎。' : 'In-depth analysis of ChatGPT technical principles and LLM operational mechanisms.'
        },
        {
          id: 3,
          title: isZhHK ? 'GPT 的演進史：從 GPT-3.5 到 GPT-4o 的關鍵差異' : 'Evolution of GPT: Key Differences from GPT-3.5 to GPT-4o',
          duration: '20分鐘',
          type: 'interactive',
          completed: getThemeProgress(1)?.completedUnits.includes(3) || false,
          current: (getThemeProgress(1)?.completedUnits.includes(2) || false) && !(getThemeProgress(1)?.completedUnits.includes(3) || false),
          description: isZhHK ? '詳細比較各版本 GPT 的功能差異，了解技術演進軌跡，選擇最適合的版本進行學習和應用。' : 'Detailed comparison of GPT versions and understanding technical evolution trajectory.'
        },
        {
          id: 4,
          title: isZhHK ? '免費版 vs. Plus 版：功能比較與選擇策略，哪一個更適合你？' : 'Free vs. Plus: Feature Comparison & Selection Strategy',
          duration: '18分鐘',
          type: 'interactive',
          completed: getThemeProgress(1)?.completedUnits.includes(4) || false,
          current: (getThemeProgress(1)?.completedUnits.includes(3) || false) && !(getThemeProgress(1)?.completedUnits.includes(4) || false),
          description: isZhHK ? '全面分析免費版與付費版的功能差異，根據個人需求制定最佳的版本選擇策略。' : 'Comprehensive analysis of free vs. paid versions and optimal selection strategies.'
        },
        {
          id: 5,
          title: isZhHK ? '帳戶註冊與安全設定：逐步完成註冊，保障你的帳戶安全' : 'Account Registration & Security Settings: Step-by-step Registration',
          duration: '12分鐘',
          type: 'interactive',
          completed: getThemeProgress(1)?.completedUnits.includes(5) || false,
          current: (getThemeProgress(1)?.completedUnits.includes(4) || false) && !(getThemeProgress(1)?.completedUnits.includes(5) || false),
          description: isZhHK ? '詳細的帳戶註冊流程指導，完整的安全設定教學，確保帳戶安全並開始正式的學習旅程。' : 'Detailed account registration process and comprehensive security settings tutorial.'
        }
      ],
      quiz: {
        title: isZhHK ? '第一章測驗：初見 ChatGPT - 基礎入門' : 'Chapter 1 Quiz: First Encounter with ChatGPT - Basic Introduction',
        description: isZhHK ? '測試您對 ChatGPT 基礎概念的理解，包括核心技術、使用方法和基本功能。' : 'Test your understanding of ChatGPT basic concepts, including core technology, usage methods and basic functions.',
        questions: 5,
        timeLimit: '15分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '學習心態很重要：ChatGPT 不是要取代你，而是要成為你最得力的助手。保持開放的心態，從「學習如何與 AI 協作」的角度來學習。' : 'Learning mindset is important: ChatGPT is not here to replace you, but to become your most capable assistant.',
        isZhHK ? '從「小問題」開始：不要一開始就想解決複雜的問題。先從簡單的日常對話開始，逐步建立信心和技巧。' : 'Start with "small problems": Don\'t try to solve complex problems right away. Start with simple daily conversations.',
        isZhHK ? '記錄你的發現：在學習過程中，記下特別有用的提示詞或對話技巧，建立你的個人 ChatGPT 使用手冊。' : 'Record your discoveries: During the learning process, note down particularly useful prompts or conversation techniques.'
      ]
    },
    '2': {
      id: 2,
      title: isZhHK ? '高效 Prompt 實戰手冊：掌握與 AI 對話的藝術' : 'Efficient Prompt Practical Manual: Master the Art of AI Conversation',
      description: isZhHK ? '掌握 Prompt 工程技巧，提升回答質量和準確性，學會如何與 ChatGPT 進行更有效的溝通。' : 'Master prompt engineering techniques for better responses and learn how to communicate more effectively with ChatGPT.',
      progress: (() => {
        const progress = getThemeProgress(2);
        return progress ? Math.round((progress.completedUnits.length / 4) * 100) : 0;
      })(),
      estimatedTime: '200分鐘',
      totalUnits: 4,
      completedUnits: (() => {
        const progress = getThemeProgress(2);
        return progress ? progress.completedUnits.length : 0;
      })(),
      units: [
        {
          id: 6,
          title: isZhHK ? 'Prompt 基礎結構：建立有效提示詞的黃金框架' : 'Basic Prompt Structure: Building the Golden Framework',
          duration: '30分鐘',
          type: 'interactive',
          completed: getThemeProgress(2)?.completedUnits.includes(6) || false,
          current: !getThemeProgress(2)?.completedUnits.includes(6),
          description: isZhHK ? '學習 Prompt 的基本結構和組成要素，掌握構建高效提示詞的核心方法和最佳實踐。' : 'Learn the basic structure and components of prompts, mastering core methods for building effective prompts.'
        },
        {
          id: 7,
          title: isZhHK ? '角色設定技巧：讓 ChatGPT 變身專業顧問' : 'Role Setting Techniques: Transform ChatGPT into Professional Consultants',
          duration: '22分鐘',
          type: 'interactive',
          completed: getThemeProgress(2)?.completedUnits.includes(7) || false,
          current: (getThemeProgress(2)?.completedUnits.includes(6) || false) && !(getThemeProgress(2)?.completedUnits.includes(7) || false),
          description: isZhHK ? '學習如何為 ChatGPT 設定特定角色，讓它以專家身份提供更專業、更精準的建議和解答。' : 'Learn how to set specific roles for ChatGPT to provide more professional and precise advice.'
        },
        {
          id: 8,
          title: isZhHK ? '情境描述方法：精確傳達你的需求和背景' : 'Context Description Methods: Precisely Convey Your Needs',
          duration: '28分鐘',
          type: 'interactive',
          completed: getThemeProgress(2)?.completedUnits.includes(8) || false,
          current: (getThemeProgress(2)?.completedUnits.includes(7) || false) && !(getThemeProgress(2)?.completedUnits.includes(8) || false),
          description: isZhHK ? '掌握有效的情境描述技巧，讓 ChatGPT 更準確理解你的需求背景，提供更符合期待的回答。' : 'Master effective context description techniques for ChatGPT to better understand your needs.'
        },
        {
          id: 9,
          title: isZhHK ? '進階 Prompt 策略：多輪對話與複雜任務處理' : 'Advanced Prompt Strategies: Multi-turn Conversations',
          duration: '35分鐘',
          type: 'interactive',
          completed: getThemeProgress(2)?.completedUnits.includes(9) || false,
          current: (getThemeProgress(2)?.completedUnits.includes(8) || false) && !(getThemeProgress(2)?.completedUnits.includes(9) || false),
          description: isZhHK ? '學習進階的 Prompt 策略，包括多輪對話管理、複雜任務分解，以及連續性思考引導技巧。' : 'Learn advanced prompt strategies including multi-turn conversation management and complex task decomposition.'
        }
      ],
      quiz: {
        title: isZhHK ? '第二章測驗：提問的藝術 - 高效 Prompt Engineering' : 'Chapter 2 Quiz: The Art of Questioning - Efficient Prompt Engineering',
        description: isZhHK ? '測試您對 Prompt Engineering 的理解，包括有效提示詞的構建技巧和優化策略。' : 'Test your understanding of Prompt Engineering, including effective prompt construction techniques and optimisation strategies.',
        questions: 5,
        timeLimit: '18分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '具體化是關鍵：越具體的描述，越能得到精準的回答。避免模糊的表達，多提供背景資訊和具體要求。' : 'Specificity is key: The more specific the description, the more accurate the answer.',
        isZhHK ? '善用範例引導：在提示詞中提供好的範例，能幫助 ChatGPT 更好理解你期望的輸出格式和品質。' : 'Use examples effectively: Providing good examples in prompts helps ChatGPT better understand expected output format.',
        isZhHK ? '迭代優化思維：好的 Prompt 往往需要多次調整。記錄什麼有效、什麼無效，不斷優化你的提示技巧。' : 'Iterative optimisation mindset: Good prompts often require multiple adjustments.'
      ]
    },
    '3': {
      id: 3,
      title: isZhHK ? '指令的藝術 (Prompt Engineering) — 讓 AI 精準聽懂你的話' : 'The Art of Prompts (Prompt Engineering) — Making AI Understand You Precisely',
      description: isZhHK ? '這是整個課程的核心，學會「提問」比擁有工具更重要。本單元將傳授從入門到高階的指令技巧。' : 'This is the core of the entire course. Learning to "ask questions" is more important than having tools.',
      progress: (() => {
        const progress = getThemeProgress(3);
        return progress ? Math.round((progress.completedUnits.length / 6) * 100) : 0;
      })(),
      estimatedTime: '158分鐘',
      totalUnits: 6,
      completedUnits: (() => {
        const progress = getThemeProgress(3);
        return progress ? progress.completedUnits.length : 0;
      })(),
      units: [
        {
          id: 11,
          title: isZhHK ? '優質指令的四大基石： 角色 (Role)、任務 (Task)、脈絡 (Context)、格式 (Format)' : 'Four Pillars of Quality Prompts: Role, Task, Context, Format',
          duration: '32分鐘',
          type: 'interactive',
          completed: getThemeProgress(3)?.completedUnits.includes(11) || false,
          current: !getThemeProgress(3)?.completedUnits.includes(11),
          description: isZhHK ? '學習構建高效提示詞的四大核心要素，建立系統性的 Prompt 設計框架。' : 'Learn the four core elements for building effective prompts and establish a systematic prompt design framework.'
        },
        {
          id: 12,
          title: isZhHK ? '角色扮演法： 讓 ChatGPT 成為你的私人律師、程式設計師或行銷專家' : 'Role-Playing Method: Make ChatGPT Your Personal Lawyer, Programmer or Marketing Expert',
          duration: '28分鐘',
          type: 'interactive',
          completed: getThemeProgress(3)?.completedUnits.includes(12) || false,
          current: (getThemeProgress(3)?.completedUnits.includes(11) || false) && !(getThemeProgress(3)?.completedUnits.includes(12) || false),
          description: isZhHK ? '掌握角色設定技巧，讓 ChatGPT 以專業身份提供更精準的建議和解答。' : 'Master role-setting techniques to make ChatGPT provide more precise advice as a professional.'
        },
        {
          id: 13,
          title: isZhHK ? '範例引導法 (Few-Shot Prompting)： 給予 AI 範例，讓它模仿你的風格與格式' : 'Few-Shot Prompting: Give AI Examples to Mimic Your Style',
          duration: '26分鐘',
          type: 'interactive',
          completed: getThemeProgress(3)?.completedUnits.includes(13) || false,
          current: (getThemeProgress(3)?.completedUnits.includes(12) || false) && !(getThemeProgress(3)?.completedUnits.includes(13) || false),
          description: isZhHK ? '學習使用範例來引導 AI 產生符合特定風格和格式的內容。' : 'Learn to use examples to guide AI in generating content that matches specific styles and formats.'
        },
        {
          id: 14,
          title: isZhHK ? '思維鏈技巧 (Chain of Thought)： 引導 AI 一步步思考，解決複雜問題' : 'Chain of Thought: Guide AI to Think Step by Step',
          duration: '30分鐘',
          type: 'interactive',
          completed: getThemeProgress(3)?.completedUnits.includes(14) || false,
          current: (getThemeProgress(3)?.completedUnits.includes(13) || false) && !(getThemeProgress(3)?.completedUnits.includes(14) || false),
          description: isZhHK ? '掌握思維鏈技巧，引導 AI 進行邏輯推理和複雜問題解決。' : 'Master chain of thought techniques to guide AI in logical reasoning and complex problem solving.'
        },
        {
          id: 15,
          title: isZhHK ? '迭代與追問： 如何透過追問，從 60 分的答案優化到 95 分' : 'Iteration & Follow-up: Optimise from 60-point to 95-point Answers',
          duration: '24分鐘',
          type: 'interactive',
          completed: getThemeProgress(3)?.completedUnits.includes(15) || false,
          current: (getThemeProgress(3)?.completedUnits.includes(14) || false) && !(getThemeProgress(3)?.completedUnits.includes(15) || false),
          description: isZhHK ? '學習如何通過有效的追問和迭代來不斷優化 AI 的回答質量。' : 'Learn how to continuously optimise AI response quality through effective follow-up and iteration.'
        },
        {
          id: 16,
          title: isZhHK ? '指令範本庫： 提供 20+ 個常用高效指令範本，即學即用' : 'Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',
          duration: '18分鐘',
          type: 'resource',
          completed: getThemeProgress(3)?.completedUnits.includes(16) || false,
          current: (getThemeProgress(3)?.completedUnits.includes(15) || false) && !(getThemeProgress(3)?.completedUnits.includes(16) || false),
          description: isZhHK ? '獲得精心設計的提示詞範本庫，涵蓋各種常見使用場景。' : 'Access a carefully designed prompt template library covering various common use cases.'
        }
      ],
      quiz: {
        title: isZhHK ? '第三章測驗：生活與工作 - 日常實用場景' : 'Chapter 3 Quiz: Life and Work - Daily Practical Scenarios',
        description: isZhHK ? '測試您在日常生活和工作中應用 ChatGPT 的實用技巧。' : 'Test your practical skills in applying ChatGPT in daily life and work.',
        questions: 5,
        timeLimit: '20分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '結構化思考：學會將複雜的需求分解成明確的角色、任務、脈絡和格式四個部分。' : 'Structured thinking: Learn to break down complex requirements into clear role, task, context and format components.',
        isZhHK ? '範例的力量：提供1-3個好範例往往比長篇大論的解釋更有效果。' : 'Power of examples: Providing 1-3 good examples is often more effective than lengthy explanations.',
        isZhHK ? '追問的藝術：第一次回答通常只有70分，學會追問才能達到95分的完美答案。' : 'Art of follow-up: First responses are usually 70%, learning to follow up can achieve 95% perfect answers.'
      ]
    },
    '4': {
      id: 4,
      title: isZhHK ? '精通之道 — 高級提示工程 (Prompt Engineering)' : 'Path to Mastery — Advanced Prompt Engineering',
      description: isZhHK ? '掌握了 ChatGPT 的基本功能後，要真正發揮其潛力，關鍵在於學會如何「提問」。精通這門技藝，將使您從一個被動的 AI「使用者」蛻變為一個主動的「駕馭者」。' : 'After mastering ChatGPT basics, the key to unleashing its potential lies in learning how to "ask". Mastering this art will transform you from a passive AI "user" to an active "master".',
      progress: (() => {
        const progress = getThemeProgress(4);
        return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
      })(),
      estimatedTime: '150分鐘',
      totalUnits: 5,
      completedUnits: (() => {
        const progress = getThemeProgress(4);
        return progress ? progress.completedUnits.length : 0;
      })(),
      units: [
        {
          id: 17,
          title: isZhHK ? '實戰項目 (一) 內容創作引擎： 自動生成高質素的社交媒體貼文、廣告文案與電子郵件' : 'Project 1: Content Creation Engine - Social Media, Ads & Email',
          duration: '35分鐘',
          type: 'project',
          completed: getThemeProgress(4)?.completedUnits.includes(17) || false,
          current: !getThemeProgress(4)?.completedUnits.includes(17),
          description: isZhHK ? '實戰演練：使用 ChatGPT 建立內容創作工作流程，批量生成高質量的行銷內容。' : 'Hands-on practice: Use ChatGPT to build content creation workflows and generate high-quality marketing content in batches.'
        },
        {
          id: 18,
          title: isZhHK ? '實戰項目 (二) 學習研究加速器： 快速總結論文、報告，並用簡單方式解釋複雜概念' : 'Project 2: Learning Research Accelerator - Summarize Papers & Reports',
          duration: '28分鐘',
          type: 'project',
          completed: getThemeProgress(4)?.completedUnits.includes(18) || false,
          current: (getThemeProgress(4)?.completedUnits.includes(17) || false) && !(getThemeProgress(4)?.completedUnits.includes(18) || false),
          description: isZhHK ? '學習如何使用 ChatGPT 快速處理學術資料，提升學習和研究效率。' : 'Learn to use ChatGPT for rapid academic material processing, improving learning and research efficiency.'
        },
        {
          id: 19,
          title: isZhHK ? '實戰項目 (三) 創意腦震盪夥伴： 從零開始規劃旅行、活動流程或商業點子' : 'Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',
          duration: '22分鐘',
          type: 'project',
          completed: getThemeProgress(4)?.completedUnits.includes(19) || false,
          current: (getThemeProgress(4)?.completedUnits.includes(18) || false) && !(getThemeProgress(4)?.completedUnits.includes(19) || false),
          description: isZhHK ? '發揮 ChatGPT 的創意潛能，協助您進行各種創意規劃和點子發想。' : 'Unleash ChatGPT\'s creative potential to assist in various creative planning and idea generation.'
        },
        {
          id: 20,
          title: isZhHK ? '實戰項目 (四) 程式設計超級助手： 解釋程式碼、除錯 (Debug) 與編寫簡單腳本' : 'Project 4: Programming Super Assistant - Code Explanation & Debugging',
          duration: '40分鐘',
          type: 'project',
          completed: getThemeProgress(4)?.completedUnits.includes(20) || false,
          current: (getThemeProgress(4)?.completedUnits.includes(19) || false) && !(getThemeProgress(4)?.completedUnits.includes(20) || false),
          description: isZhHK ? '即使不是程式設計師，也能利用 ChatGPT 處理基本的程式設計任務和技術問題。' : 'Even non-programmers can use ChatGPT to handle basic programming tasks and technical issues.'
        },
        {
          id: 21,
          title: isZhHK ? '實戰項目 (五) 語言翻譯與潤飾大師： 進行多國語言精準翻譯與專業級文章校對' : 'Project 5: Language Translation & Polishing Master - Professional Translation & Proofreading',
          duration: '25分鐘',
          type: 'project',
          completed: getThemeProgress(4)?.completedUnits.includes(21) || false,
          current: (getThemeProgress(4)?.completedUnits.includes(20) || false) && !(getThemeProgress(4)?.completedUnits.includes(21) || false),
          description: isZhHK ? '掌握 ChatGPT 的語言處理能力，實現專業級的翻譯和文案潤飾。' : 'Master ChatGPT\'s language processing capabilities for professional-level translation and copywriting.'
        }
      ],
      quiz: {
        title: isZhHK ? '第四章測驗：釋放潛能 - 進階功能與技巧' : 'Chapter 4 Quiz: Unleashing Potential - Advanced Features and Techniques',
        description: isZhHK ? '測試您對 ChatGPT 進階功能和高級應用技巧的掌握程度。' : 'Test your mastery of ChatGPT advanced features and high-level application techniques.',
        questions: 5,
        timeLimit: '25分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '實戰出真知：理論學習固然重要，但只有在實際應用中才能真正掌握 ChatGPT 的精髓。' : 'Practice makes perfect: Theoretical learning is important, but true mastery comes from practical application.',
        isZhHK ? '建立個人工作流程：為每種常用任務建立標準化的 Prompt 模板，提升工作效率。' : 'Build personal workflows: Create standardized prompt templates for common tasks to improve efficiency.',
        isZhHK ? '記錄成功案例：將成功的對話和 Prompt 保存下來，建立個人的最佳實踐資料庫。' : 'Document success cases: Save successful conversations and prompts to build your personal best practices database.'
      ]
    },
    '5': {
      id: 5,
      title: isZhHK ? '打造專屬 AI — 個人化與 GPT 商店' : 'Build Your Personal AI — Personalization & GPT Store',
      description: isZhHK ? '在掌握了通用的提示工程技巧後，本章將引導您進入 ChatGPT 的高階應用領域：個人化。我們將學習如何將 ChatGPT 從一個無所不知但對您一無所知的通用工具，轉變為一個真正懂您、為您量身定做的私人 AI 助手。' : 'After mastering general prompt engineering techniques, this chapter guides you into ChatGPT\'s advanced application area: personalization.',
      progress: (() => {
        const progress = getThemeProgress(5);
        return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
      })(),
      estimatedTime: '157分鐘',
      totalUnits: 5,
      completedUnits: (() => {
        const progress = getThemeProgress(5);
        return progress ? progress.completedUnits.length : 0;
      })(),
      units: [
        {
          id: 22,
          title: isZhHK ? 'Advanced Data Analysis (數據分析大師)： 上傳 Excel/CSV/PDF，進行數據分析與圖表製作' : 'Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',
          duration: '38分鐘',
          type: 'interactive',
          completed: getThemeProgress(5)?.completedUnits.includes(22) || false,
          current: !getThemeProgress(5)?.completedUnits.includes(22),
          description: isZhHK ? '學習使用 ChatGPT 的數據分析功能，處理複雜的數據集並生成專業報告。' : 'Learn to use ChatGPT\'s data analysis features to process complex datasets and generate professional reports.'
        },
        {
          id: 23,
          title: isZhHK ? 'Web Browse (實時網路瀏覽)： 結合即時網路資訊，進行市場調查與新聞總結' : 'Web Browse: Real-time Web Information for Market Research',
          duration: '20分鐘',
          type: 'interactive',
          completed: getThemeProgress(5)?.completedUnits.includes(23) || false,
          current: (getThemeProgress(5)?.completedUnits.includes(22) || false) && !(getThemeProgress(5)?.completedUnits.includes(23) || false),
          description: isZhHK ? '掌握 ChatGPT 的實時網路瀏覽能力，獲取最新資訊並進行分析。' : 'Master ChatGPT\'s real-time web browsing capabilities to obtain latest information and analysis.'
        },
        {
          id: 24,
          title: isZhHK ? 'DALL-E 3 圖像生成： 用文字創造出專業級的商業插圖、簡報圖片與藝術作品' : 'DALL-E 3 Image Generation: Create Professional Business Illustrations',
          duration: '32分鐘',
          type: 'interactive',
          completed: getThemeProgress(5)?.completedUnits.includes(24) || false,
          current: (getThemeProgress(5)?.completedUnits.includes(23) || false) && !(getThemeProgress(5)?.completedUnits.includes(24) || false),
          description: isZhHK ? '學習使用 DALL-E 3 創建專業級的視覺內容和藝術作品。' : 'Learn to use DALL-E 3 to create professional visual content and artwork.'
        },
        {
          id: 25,
          title: isZhHK ? '創建你的第一個 Custom GPT： 無需編程，手把手教你打造個人專屬的 AI 應用' : 'Create Your First Custom GPT: Build Personal AI Applications Without Programming',
          duration: '45分鐘',
          type: 'project',
          completed: getThemeProgress(5)?.completedUnits.includes(25) || false,
          current: (getThemeProgress(5)?.completedUnits.includes(24) || false) && !(getThemeProgress(5)?.completedUnits.includes(25) || false),
          description: isZhHK ? '實戰演練：從零開始創建個人專屬的 Custom GPT，無需任何編程經驗。' : 'Hands-on practice: Create your personal Custom GPT from scratch without any programming experience.'
        },
        {
          id: 26,
          title: isZhHK ? 'GPTs 應用商店的秘密： 如何發佈你的 GPT，甚至未來可能從中獲利' : 'GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',
          duration: '22分鐘',
          type: 'interactive',
          completed: getThemeProgress(5)?.completedUnits.includes(26) || false,
          current: (getThemeProgress(5)?.completedUnits.includes(25) || false) && !(getThemeProgress(5)?.completedUnits.includes(26) || false),
          description: isZhHK ? '了解 GPT 商店的運作機制，學習如何發佈和優化您的 Custom GPT。' : 'Understand the GPT Store mechanics and learn how to publish and optimize your Custom GPT.'
        }
      ],
      quiz: {
        title: isZhHK ? '第五章測驗：創意無限 - 探索娛樂與創作' : 'Chapter 5 Quiz: Unlimited Creativity - Exploring Entertainment and Creation',
        description: isZhHK ? '測試您在創意寫作、娛樂互動和藝術創作方面的 ChatGPT 應用技巧。' : 'Test your ChatGPT application skills in creative writing, entertainment interaction, and artistic creation.',
        questions: 5,
        timeLimit: '20分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '功能組合的威力：學會將不同功能組合使用，創造出更強大的應用場景。' : 'Power of feature combination: Learn to combine different features for more powerful application scenarios.',
        isZhHK ? 'Custom GPT 設計思維：先明確目標用戶和使用場景，再設計相應的功能和介面。' : 'Custom GPT design thinking: First clarify target users and use cases, then design corresponding features and interfaces.',
        isZhHK ? '迭代改進：Custom GPT 的完善需要時間和用戶反饋，持續優化是關鍵。' : 'Iterative improvement: Custom GPT refinement requires time and user feedback, continuous optimization is key.'
      ]
    },
    '6': {
      id: 6,
      title: isZhHK ? '展望未來 — 應用、倫理與挑戰' : 'Looking Forward — Applications, Ethics & Challenges',
      description: isZhHK ? '在本課程的最後一章，我們將跳出具體的操作技巧，從更宏觀的視角審視 ChatGPT 及其背後的技術。我們將探討其在各行各業的廣泛應用，同時也必須坦誠地面對其固有的局限性、深刻的倫理挑戰和不容忽視的隱私問題。' : 'In the final chapter, we step beyond specific operational techniques to examine ChatGPT from a macro perspective.',
      progress: (() => {
        const progress = getThemeProgress(6);
        return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
      })(),
      estimatedTime: '100分鐘',
      totalUnits: 5,
      completedUnits: (() => {
        const progress = getThemeProgress(6);
        return progress ? progress.completedUnits.length : 0;
      })(),
      units: [
        {
          id: 27,
          title: isZhHK ? 'AI 的「幻覺」現象： 如何識別並查證 AI 生成的虛假資訊' : 'AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',
          duration: '18分鐘',
          type: 'interactive',
          completed: getThemeProgress(6)?.completedUnits.includes(27) || false,
          current: !getThemeProgress(6)?.completedUnits.includes(27),
          description: isZhHK ? '學習識別和應對 AI 幻覺現象，確保獲得可靠的資訊。' : 'Learn to identify and deal with AI hallucination phenomena to ensure reliable information.'
        },
        {
          id: 28,
          title: isZhHK ? '數據私隱與安全： 你的對話安全嗎？如何管理你的數據' : 'Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',
          duration: '15分鐘',
          type: 'interactive',
          completed: getThemeProgress(6)?.completedUnits.includes(28) || false,
          current: (getThemeProgress(6)?.completedUnits.includes(27) || false) && !(getThemeProgress(6)?.completedUnits.includes(28) || false),
          description: isZhHK ? '了解數據隱私保護措施，學會安全地使用 ChatGPT。' : 'Understand data privacy protection measures and learn to use ChatGPT safely.'
        },
        {
          id: 29,
          title: isZhHK ? 'AI 的偏見問題： 認識訓練數據帶來的潛在影響，並學習如何應對' : 'AI Bias Issues: Understanding Training Data Impact and How to Respond',
          duration: '22分鐘',
          type: 'interactive',
          completed: getThemeProgress(6)?.completedUnits.includes(29) || false,
          current: (getThemeProgress(6)?.completedUnits.includes(28) || false) && !(getThemeProgress(6)?.completedUnits.includes(29) || false),
          description: isZhHK ? '認識 AI 偏見的成因和影響，學習如何減少偏見的負面影響。' : 'Understand the causes and effects of AI bias and learn how to reduce negative impacts of bias.'
        },
        {
          id: 30,
          title: isZhHK ? '負責任地使用 AI： 在學術、工作與創作中應遵守的倫理界線' : 'Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',
          duration: '20分鐘',
          type: 'interactive',
          completed: getThemeProgress(6)?.completedUnits.includes(30) || false,
          current: (getThemeProgress(6)?.completedUnits.includes(29) || false) && !(getThemeProgress(6)?.completedUnits.includes(30) || false),
          description: isZhHK ? '建立 AI 使用的倫理框架，在各種場景中負責任地應用 AI 技術。' : 'Establish ethical frameworks for AI use and apply AI technology responsibly in various scenarios.'
        },
        {
          id: 31,
          title: isZhHK ? '人工智能的未來： 展望 GPT 的下一步發展與對社會的長遠影響' : 'The Future of AI: GPT\'s Next Development and Long-term Social Impact',
          duration: '25分鐘',
          type: 'interactive',
          completed: getThemeProgress(6)?.completedUnits.includes(31) || false,
          current: (getThemeProgress(6)?.completedUnits.includes(30) || false) && !(getThemeProgress(6)?.completedUnits.includes(31) || false),
          description: isZhHK ? '探討 AI 技術的未來發展趨勢和對社會的深遠影響。' : 'Explore future trends in AI technology and its profound impact on society.'
        }
      ],
      quiz: {
        title: isZhHK ? '第六章測驗：智慧使用 - 限制、道德與未來' : 'Chapter 6 Quiz: Smart Usage - Limitations, Ethics and Future',
        description: isZhHK ? '測試您對 AI 限制、使用道德和負責任應用的理解。' : 'Test your understanding of AI limitations, usage ethics, and responsible application.',
        questions: 5,
        timeLimit: '15分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '批判性思考：對 AI 生成的內容保持理性和批判的態度，始終進行驗證。' : 'Critical thinking: Maintain rational and critical attitude towards AI-generated content, always verify.',
        isZhHK ? '倫理優先：在追求效率的同時，不要忽視倫理和道德的重要性。' : 'Ethics first: While pursuing efficiency, don\'t ignore the importance of ethics and morality.',
        isZhHK ? '持續學習：AI 技術發展迅速，保持學習和適應的心態是關鍵。' : 'Continuous learning: AI technology develops rapidly, maintaining a learning and adaptive mindset is key.'
      ]
    }
  };

  const currentTheme = themes[themeId as keyof typeof themes];

  if (!currentTheme) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{isZhHK ? '主題不存在' : 'Theme not found'}</h1>
        <Button onClick={() => navigate('/courses/chatgpt-complete-course/learning')}>
          {isZhHK ? '返回課程總覽' : 'Back to Course Overview'}
        </Button>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen chatgpt-theme-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="ai-container pt-40 pb-8">
        {/* Breadcrumb */}
        <motion.div 
          className="breadcrumb mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
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
                      navigate(`/courses/chatgpt-complete-course/theme/${themeId}/unit/${actualLessonId}`);
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
                  onClick={() => navigate(`/courses/chatgpt-complete-course/theme/${themeId}/quiz`)}
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

export default ChatGPTCompleteCourseTheme; 