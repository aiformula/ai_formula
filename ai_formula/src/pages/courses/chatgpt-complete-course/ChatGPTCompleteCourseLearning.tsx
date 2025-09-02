/**
 * ChatGPT Complete Course Learning Module
 * @fileoverview ChatGPT 完整教學實戰課程學習頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  Target, TrendingUp, Award, Zap, Star, Trophy, Calendar,
  BarChart3, Users, MessageSquare, Bookmark, RotateCcw, ChevronDown, Lock
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress'; // ChatGPT 進度追蹤

const ChatGPTCompleteCourseLearning: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const isZhHK = language === 'zh-HK';
  
  // 獲取用戶顯示名稱嘅函數
  const getUserDisplayName = () => {
    if (!user?.email) return isZhHK ? '學習者' : 'Learner';
    const username = user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  // 🎯 手風琴狀態管理
  const [expandedThemes, setExpandedThemes] = useState<Set<number>>(new Set());
  
  // 🎯 使用進度追蹤 Hook
  const { 
    isThemeCompleted,
    getThemeProgress,
    getProgressStats,
    resetProgress,
    completeQuiz,
    completeUnit,
    themeProgress,
    courseStats
  } = useChatGPTProgress();

  // 獲取實時統計數據
  const stats = getProgressStats();

  // 🎯 獲取真實的學習時間數據
  const totalLearningMinutes = stats.totalTimeSpent;
  const formattedLearningTime = (() => {
    const totalSeconds = totalLearningMinutes * 60; // 將分鐘轉換為秒
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    // 選擇顯示格式：可以改為簡潔格式或保持 HH:MM:SS
    const useCompactFormat = true; // 設為 true 使用 "2h 32m" 格式
    
    if (useCompactFormat) {
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    } else {
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  })();

  // ChatGPT 完整教學課程規劃大綱
  const courseData = {
    title: isZhHK ? 'ChatGPT 完整教學實戰' : 'ChatGPT Complete Course',
    completedHours: totalLearningMinutes, // 🎯 使用真實的學習時間
    totalHours: 400, // 預估總課程時間（分鐘）
    actualLearningTime: formattedLearningTime, // 🎯 新增：格式化的真實學習時間
    totalThemes: stats.totalThemes,
    completedThemes: stats.completedThemes,
    learningStreak: 5,
    
    themes: [
      {
        id: 1,
        title: isZhHK ? 'AI 革命的開端 — 重新認識 ChatGPT' : 'The Beginning of AI Revolution — Rediscovering ChatGPT',
        description: isZhHK ? '這個單元為零基礎學員打好穩固根基，理解 ChatGPT 的運作原理與價值，並完成所有前置準備。' : 'This unit builds a solid foundation for beginners, understanding how ChatGPT works and its value.',
        progress: (() => {
          const progress = getThemeProgress(1);
          return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
        })(),
        units: [
    {
      id: 1,
            title: isZhHK ? '歡迎來到 AI 新紀元： 課程簡介與學習地圖' : 'Welcome to the New AI Era: Course Introduction & Learning Map',
            duration: isZhHK ? '15分鐘' : '15 minutes',
            completed: getThemeProgress(1)?.completedUnits.includes(1) || false,
            current: !getThemeProgress(1)?.completedUnits.includes(1)
          },
          {
            id: 2,
            title: isZhHK ? 'ChatGPT 是什麼？ 白話拆解大型語言模型 (LLM) 核心概念' : 'What is ChatGPT? Breaking Down Large Language Model (LLM) Core Concepts',
            duration: isZhHK ? '25分鐘' : '25 minutes',
            completed: getThemeProgress(1)?.completedUnits.includes(2) || false,
            current: (getThemeProgress(1)?.completedUnits.includes(1) || false) && !(getThemeProgress(1)?.completedUnits.includes(2) || false)
          },
          {
            id: 3,
            title: isZhHK ? 'GPT 的演進史： 從 GPT-3.5 到 GPT-4o 的關鍵差異' : 'Evolution of GPT: Key Differences from GPT-3.5 to GPT-4o',
            duration: isZhHK ? '20分鐘' : '20 minutes',
            completed: getThemeProgress(1)?.completedUnits.includes(3) || false,
            current: (getThemeProgress(1)?.completedUnits.includes(2) || false) && !(getThemeProgress(1)?.completedUnits.includes(3) || false)
          },
          {
            id: 4,
            title: isZhHK ? '免費版 vs. Plus 版： 功能比較與選擇策略，哪一個更適合你？' : 'Free vs. Plus: Feature Comparison & Selection Strategy',
            duration: isZhHK ? '18分鐘' : '18 minutes',
            completed: getThemeProgress(1)?.completedUnits.includes(4) || false,
            current: (getThemeProgress(1)?.completedUnits.includes(3) || false) && !(getThemeProgress(1)?.completedUnits.includes(4) || false)
          },
          {
            id: 5,
            title: isZhHK ? '帳戶註冊與安全設定： 逐步完成註冊，保障你的帳戶安全' : 'Account Registration & Security Settings: Step-by-step Registration',
            duration: isZhHK ? '12分鐘' : '12 minutes',
            completed: getThemeProgress(1)?.completedUnits.includes(5) || false,
            current: (getThemeProgress(1)?.completedUnits.includes(4) || false) && !(getThemeProgress(1)?.completedUnits.includes(5) || false)
          }
        ],
        completed: isThemeCompleted(1)
    },
    {
      id: 2,
        title: isZhHK ? '初探門徑 — 帳戶設定與介面導覽' : 'First Steps — Account Setup & Interface Navigation',
        description: isZhHK ? '在本章，我們將從最實際的操作入手，引導學員完成從註冊帳戶到熟悉 ChatGPT 各個介面元素的全部過程。本章的目標是消除新手的陌生感。' : 'In this chapter, we will start with the most practical operations, guiding students through the entire process from account registration to familiarizing themselves with all ChatGPT interface elements. The goal is to eliminate newcomer unfamiliarity.',
        progress: (() => {
          const progress = getThemeProgress(2);
          return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
        })(),
        units: [
          {
            id: 6,
            title: isZhHK ? '主介面深度導覽： 對話視窗、歷史紀錄 (History) 與設定區' : 'Main Interface Deep Tour: Chat Window, History & Settings',
            duration: isZhHK ? '30分鐘' : '30 minutes',
            completed: getThemeProgress(2)?.completedUnits.includes(6) || false,
            current: isThemeCompleted(1) && !(getThemeProgress(2)?.completedUnits.includes(6) || false)
          },
          {
            id: 7,
            title: isZhHK ? '對話管理技巧： 如何有效命名 (Rename)、分享 (Share) 與刪除 (Delete) 對話' : 'Conversation Management: Rename, Share & Delete Conversations',
            duration: isZhHK ? '22分鐘' : '22 minutes',
            completed: getThemeProgress(2)?.completedUnits.includes(7) || false,
            current: (getThemeProgress(2)?.completedUnits.includes(6) || false) && !(getThemeProgress(2)?.completedUnits.includes(7) || false)
          },
          {
            id: 8,
            title: isZhHK ? 'Custom Instructions (自訂指令)： 打造你的個人化 AI 助教，讓每次回答更貼心' : 'Custom Instructions: Create Your Personal AI Assistant',
            duration: isZhHK ? '28分鐘' : '28 minutes',
            completed: getThemeProgress(2)?.completedUnits.includes(8) || false,
            current: (getThemeProgress(2)?.completedUnits.includes(7) || false) && !(getThemeProgress(2)?.completedUnits.includes(8) || false)
          },
          {
            id: 9,
            title: isZhHK ? '手機 App 獨有功能： 語音對話與圖像辨識實戰' : 'Mobile App Exclusive Features: Voice Chat & Image Recognition',
            duration: isZhHK ? '35分鐘' : '35 minutes',
            completed: getThemeProgress(2)?.completedUnits.includes(9) || false,
            current: (getThemeProgress(2)?.completedUnits.includes(8) || false) && !(getThemeProgress(2)?.completedUnits.includes(9) || false)
          },
          {
            id: 10,
            title: isZhHK ? '探索 GPT Store： 如何尋找、評估及使用別人建立的優秀 GPTs' : 'Exploring GPT Store: Finding, Evaluating & Using GPTs',
            duration: isZhHK ? '25分鐘' : '25 minutes',
            completed: getThemeProgress(2)?.completedUnits.includes(10) || false,
            current: (getThemeProgress(2)?.completedUnits.includes(9) || false) && !(getThemeProgress(2)?.completedUnits.includes(10) || false)
          }
        ],
        completed: isThemeCompleted(2)
    },
    {
      id: 3,
        title: isZhHK ? '指令的藝術 (Prompt Engineering) — 讓 AI 精準聽懂你的話' : 'The Art of Prompting (Prompt Engineering) — Make AI Understand You Precisely',
        description: isZhHK ? '這是整個課程的核心，學會「提問」比擁有工具更重要。本單元將傳授從入門到高階的指令技巧。' : 'This is the core of the entire course. Learning to "ask questions" is more important than having tools.',
        progress: (() => {
          const progress = getThemeProgress(3);
          return progress ? Math.round((progress.completedUnits.length / 6) * 100) : 0;
        })(),
        units: [
          {
            id: 11,
            title: isZhHK ? '優質指令的四大基石： 角色 (Role)、任務 (Task)、脈絡 (Context)、格式 (Format)' : 'Four Pillars of Quality Prompts: Role, Task, Context, Format',
            duration: isZhHK ? '32分鐘' : '32 minutes',
            completed: getThemeProgress(3)?.completedUnits.includes(11) || false,
            current: isThemeCompleted(2) && !(getThemeProgress(3)?.completedUnits.includes(11) || false)
          },
          {
            id: 12,
            title: isZhHK ? '角色扮演法： 讓 ChatGPT 成為你的私人律師、程式設計師或行銷專家' : 'Role-Playing Method: Make ChatGPT Your Personal Lawyer, Programmer or Marketing Expert',
            duration: isZhHK ? '28分鐘' : '28 minutes',
            completed: getThemeProgress(3)?.completedUnits.includes(12) || false,
            current: (getThemeProgress(3)?.completedUnits.includes(11) || false) && !(getThemeProgress(3)?.completedUnits.includes(12) || false)
          },
          {
            id: 13,
            title: isZhHK ? '範例引導法 (Few-Shot Prompting)： 給予 AI 範例，讓它模仿你的風格與格式' : 'Few-Shot Prompting: Give AI Examples to Mimic Your Style',
            duration: isZhHK ? '26分鐘' : '26 minutes',
            completed: getThemeProgress(3)?.completedUnits.includes(13) || false,
            current: (getThemeProgress(3)?.completedUnits.includes(12) || false) && !(getThemeProgress(3)?.completedUnits.includes(13) || false)
          },
          {
            id: 14,
            title: isZhHK ? '思維鏈技巧 (Chain of Thought)： 引導 AI 一步步思考，解決複雜問題' : 'Chain of Thought: Guide AI to Think Step by Step',
            duration: isZhHK ? '30分鐘' : '30 minutes',
            completed: getThemeProgress(3)?.completedUnits.includes(14) || false,
            current: (getThemeProgress(3)?.completedUnits.includes(13) || false) && !(getThemeProgress(3)?.completedUnits.includes(14) || false)
          },
          {
            id: 15,
            title: isZhHK ? '迭代與追問： 如何透過追問，從 60 分的答案優化到 95 分' : 'Iteration & Follow-up: Optimise from 60-point to 95-point Answers',
            duration: isZhHK ? '24分鐘' : '24 minutes',
            completed: getThemeProgress(3)?.completedUnits.includes(15) || false,
            current: (getThemeProgress(3)?.completedUnits.includes(14) || false) && !(getThemeProgress(3)?.completedUnits.includes(15) || false)
          },
          {
            id: 16,
            title: isZhHK ? '指令範本庫： 提供 20+ 個常用高效指令範本，即學即用' : 'Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',
            duration: isZhHK ? '18分鐘' : '18 minutes',
            completed: getThemeProgress(3)?.completedUnits.includes(16) || false,
            current: (getThemeProgress(3)?.completedUnits.includes(15) || false) && !(getThemeProgress(3)?.completedUnits.includes(16) || false)
          }
        ],
        completed: isThemeCompleted(3)
    },
    {
      id: 4,
        title: isZhHK ? '精通之道 — 高級提示工程 (Prompt Engineering)' : 'Path to Mastery — Advanced Prompt Engineering',
                  description: isZhHK ? '掌握了 ChatGPT 的基本功能後，要真正發揮其潛力，關鍵在於學會如何「提問」。精通這門技藝，將使您從一個被動的 AI「使用者」蛻變為一個主動的「駕馭者」。' : 'After mastering ChatGPT basics, the key to unleashing its potential lies in learning how to "ask". Mastering this art will transform you from a passive AI "user" to an active "master".',
        progress: (() => {
          const progress = getThemeProgress(4);
          return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
        })(),
        units: [
          {
            id: 17,
            title: isZhHK ? '實戰項目 (一) 內容創作引擎： 自動生成高質素的社交媒體貼文、廣告文案與電子郵件' : 'Project 1: Content Creation Engine - Social Media, Ads & Email',
            duration: isZhHK ? '35分鐘' : '35 minutes',
            completed: getThemeProgress(4)?.completedUnits.includes(17) || false,
            current: isThemeCompleted(3) && !(getThemeProgress(4)?.completedUnits.includes(17) || false)
          },
          {
            id: 18,
            title: isZhHK ? '實戰項目 (二) 學習研究加速器： 快速總結論文、報告，並用簡單方式解釋複雜概念' : 'Project 2: Learning Research Accelerator - Summarize Papers & Reports',
            duration: isZhHK ? '28分鐘' : '28 minutes',
            completed: getThemeProgress(4)?.completedUnits.includes(18) || false,
            current: (getThemeProgress(4)?.completedUnits.includes(17) || false) && !(getThemeProgress(4)?.completedUnits.includes(18) || false)
          },
          {
            id: 19,
            title: isZhHK ? '實戰項目 (三) 創意腦震盪夥伴： 從零開始規劃旅行、活動流程或商業點子' : 'Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',
            duration: isZhHK ? '22分鐘' : '22 minutes',
            completed: getThemeProgress(4)?.completedUnits.includes(19) || false,
            current: (getThemeProgress(4)?.completedUnits.includes(18) || false) && !(getThemeProgress(4)?.completedUnits.includes(19) || false)
          },
          {
            id: 20,
            title: isZhHK ? '實戰項目 (四) 程式設計超級助手： 解釋程式碼、除錯 (Debug) 與編寫簡單腳本' : 'Project 4: Programming Super Assistant - Code Explanation & Debugging',
            duration: isZhHK ? '40分鐘' : '40 minutes',
            completed: getThemeProgress(4)?.completedUnits.includes(20) || false,
            current: (getThemeProgress(4)?.completedUnits.includes(19) || false) && !(getThemeProgress(4)?.completedUnits.includes(20) || false)
          },
          {
            id: 21,
            title: isZhHK ? '實戰項目 (五) 語言翻譯與潤飾大師： 進行多國語言精準翻譯與專業級文章校對' : 'Project 5: Language Translation & Polishing Master - Professional Translation & Proofreading',
            duration: isZhHK ? '25分鐘' : '25 minutes',
            completed: getThemeProgress(4)?.completedUnits.includes(21) || false,
            current: (getThemeProgress(4)?.completedUnits.includes(20) || false) && !(getThemeProgress(4)?.completedUnits.includes(21) || false)
          }
        ],
        completed: isThemeCompleted(4)
    },
    {
      id: 5,
        title: isZhHK ? '打造專屬 AI — 個人化與 GPT 商店' : 'Build Your Personal AI — Personalization & GPT Store',
        description: isZhHK ? '在掌握了通用的提示工程技巧後，本章將引導您進入 ChatGPT 的高階應用領域：個人化。我們將學習如何將 ChatGPT 從一個無所不知但對您一無所知的通用工具，轉變為一個真正懂您、為您量身定做的私人 AI 助手。' : 'After mastering general prompt engineering techniques, this chapter guides you into ChatGPT\'s advanced application area: personalization. We\'ll learn how to transform ChatGPT from a universal tool that knows everything but nothing about you, into a personal AI assistant that truly understands and is tailored for you.',
        progress: (() => {
          const progress = getThemeProgress(5);
          return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
        })(),
        units: [
          {
            id: 22,
            title: isZhHK ? 'Advanced Data Analysis (數據分析大師)： 上傳 Excel/CSV/PDF，進行數據分析與圖表製作' : 'Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',
            duration: isZhHK ? '38分鐘' : '38 minutes',
            completed: getThemeProgress(5)?.completedUnits.includes(22) || false,
            current: isThemeCompleted(4) && !(getThemeProgress(5)?.completedUnits.includes(22) || false)
          },
          {
            id: 23,
            title: isZhHK ? 'Web Browse (實時網路瀏覽)： 結合即時網路資訊，進行市場調查與新聞總結' : 'Web Browse: Real-time Web Information for Market Research',
            duration: isZhHK ? '20分鐘' : '20 minutes',
            completed: getThemeProgress(5)?.completedUnits.includes(23) || false,
            current: (getThemeProgress(5)?.completedUnits.includes(22) || false) && !(getThemeProgress(5)?.completedUnits.includes(23) || false)
          },
          {
            id: 24,
            title: isZhHK ? 'DALL-E 3 圖像生成： 用文字創造出專業級的商業插圖、簡報圖片與藝術作品' : 'DALL-E 3 Image Generation: Create Professional Business Illustrations',
            duration: isZhHK ? '32分鐘' : '32 minutes',
            completed: getThemeProgress(5)?.completedUnits.includes(24) || false,
            current: (getThemeProgress(5)?.completedUnits.includes(23) || false) && !(getThemeProgress(5)?.completedUnits.includes(24) || false)
          },
          {
            id: 25,
            title: isZhHK ? '創建你的第一個 Custom GPT： 無需編程，手把手教你打造個人專屬的 AI 應用' : 'Create Your First Custom GPT: Build Personal AI Applications Without Programming',
            duration: isZhHK ? '45分鐘' : '45 minutes',
            completed: getThemeProgress(5)?.completedUnits.includes(25) || false,
            current: (getThemeProgress(5)?.completedUnits.includes(24) || false) && !(getThemeProgress(5)?.completedUnits.includes(25) || false)
          },
          {
            id: 26,
            title: isZhHK ? 'GPTs 應用商店的秘密： 如何發佈你的 GPT，甚至未來可能從中獲利' : 'GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',
            duration: isZhHK ? '22分鐘' : '22 minutes',
            completed: getThemeProgress(5)?.completedUnits.includes(26) || false,
            current: (getThemeProgress(5)?.completedUnits.includes(25) || false) && !(getThemeProgress(5)?.completedUnits.includes(26) || false)
          }
        ],
        completed: isThemeCompleted(5)
    },
    {
      id: 6,
        title: isZhHK ? '展望未來 — 應用、倫理與挑戰' : 'Looking Forward — Applications, Ethics & Challenges',
        description: isZhHK ? '在本課程的最後一章，我們將跳出具體的操作技巧，從更宏觀的視角審視 ChatGPT 及其背後的技術。我們將探討其在各行各業的廣泛應用，同時也必須坦誠地面對其固有的局限性、深刻的倫理挑戰和不容忽視的隱私問題。理解這些宏觀背景，有助於我們更負責任、更具批判性地使用這一強大的工具。' : 'In the final chapter of this course, we will step beyond specific operational techniques to examine ChatGPT and its underlying technology from a more macro perspective. We will explore its widespread applications across industries while honestly confronting its inherent limitations, profound ethical challenges, and privacy concerns that cannot be ignored.',
        progress: (() => {
          const progress = getThemeProgress(6);
          return progress ? Math.round((progress.completedUnits.length / 5) * 100) : 0;
        })(),
        units: [
          {
            id: 27,
            title: isZhHK ? 'AI 的「幻覺」現象： 如何識別並查證 AI 生成的虛假資訊' : 'AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',
            duration: isZhHK ? '18分鐘' : '18 minutes',
            completed: getThemeProgress(6)?.completedUnits.includes(27) || false,
            current: isThemeCompleted(5) && !(getThemeProgress(6)?.completedUnits.includes(27) || false)
          },
          {
            id: 28,
            title: isZhHK ? '數據私隱與安全： 你的對話安全嗎？如何管理你的數據' : 'Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',
            duration: isZhHK ? '15分鐘' : '15 minutes',
            completed: getThemeProgress(6)?.completedUnits.includes(28) || false,
            current: (getThemeProgress(6)?.completedUnits.includes(27) || false) && !(getThemeProgress(6)?.completedUnits.includes(28) || false)
          },
          {
            id: 29,
            title: isZhHK ? 'AI 的偏見問題： 認識訓練數據帶來的潛在影響，並學習如何應對' : 'AI Bias Issues: Understanding Training Data Impact and How to Respond',
            duration: isZhHK ? '22分鐘' : '22 minutes',
            completed: getThemeProgress(6)?.completedUnits.includes(29) || false,
            current: (getThemeProgress(6)?.completedUnits.includes(28) || false) && !(getThemeProgress(6)?.completedUnits.includes(29) || false)
          },
          {
            id: 30,
            title: isZhHK ? '負責任地使用 AI： 在學術、工作與創作中應遵守的倫理界線' : 'Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',
            duration: isZhHK ? '20分鐘' : '20 minutes',
            completed: getThemeProgress(6)?.completedUnits.includes(30) || false,
            current: (getThemeProgress(6)?.completedUnits.includes(29) || false) && !(getThemeProgress(6)?.completedUnits.includes(30) || false)
          },
          {
            id: 31,
            title: isZhHK ? '人工智能的未來： 展望 GPT 的下一步發展與對社會的長遠影響' : 'The Future of AI: GPT\'s Next Development and Long-term Social Impact',
            duration: isZhHK ? '25分鐘' : '25 minutes',
            completed: getThemeProgress(6)?.completedUnits.includes(31) || false,
            current: (getThemeProgress(6)?.completedUnits.includes(30) || false) && !(getThemeProgress(6)?.completedUnits.includes(31) || false)
          }
        ],
        completed: isThemeCompleted(6)
      }
    ]
  };

  const skills = [
    { name: isZhHK ? '基礎操作' : 'Basic Operations', percentage: 85 },
    { name: isZhHK ? 'Prompt 設計' : 'Prompt Design', percentage: 70 },
    { name: isZhHK ? '工具整合' : 'Tool Integration', percentage: 60 },
    { name: isZhHK ? '商業應用' : 'Business Application', percentage: 55 },
    { name: isZhHK ? '創意發想' : 'Creative Thinking', percentage: 75 }
  ];

  const achievements = [
    { icon: Trophy, label: isZhHK ? 'ChatGPT 學習達人' : 'ChatGPT Learning Expert', type: 'gold' },
    { icon: Star, label: isZhHK ? 'Prompt 工程師' : 'Prompt Engineer', type: 'silver' }
  ];

  // 🎯 手風琴控制函數
  const toggleTheme = (themeId: number) => {
    setExpandedThemes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(themeId)) {
        newSet.delete(themeId);
      } else {
        newSet.add(themeId);
      }
      return newSet;
    });
  };

  // 🎯 初始化展開狀態 - 當前學習的主題自動展開
  React.useEffect(() => {
    const currentTheme = courseData.themes.find(theme => 
      theme.units.some(unit => unit.current)
    );
    if (currentTheme && !expandedThemes.has(currentTheme.id)) {
      setExpandedThemes(prev => new Set([...prev, currentTheme.id]));
    }
  }, [courseData.themes]);

  // 🎯 判斷單元是否被鎖定
  const isUnitLocked = (themeId: number, unitIndex: number) => {
    if (themeId === 1 && unitIndex === 0) return false; // 第一個單元永遠不鎖定
    
    const theme = courseData.themes.find(t => t.id === themeId);
    if (!theme) return true;
    
    if (unitIndex === 0) {
      // 主題的第一個單元，檢查前一個主題是否完成
      return !isThemeCompleted(themeId - 1);
    } else {
      // 主題內的其他單元，檢查前一個單元是否完成
      const prevUnit = theme.units[unitIndex - 1];
      return !prevUnit.completed;
    }
  };

  return (
    <div className="min-h-screen chatgpt-learning-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/courses/chatgpt-complete-course/outline')}
          className="breadcrumb-item mb-6 text-white/70 hover:text-white flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isZhHK ? '返回課程大綱' : 'Back to Course Overview'}</span>
        </motion.button>

        {/* Dashboard Header - Three-Section Layout */}
        <motion.div 
          className="bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Section - Identity & Status (30% width) */}
            <div className="lg:col-span-4">
              <div className="min-w-0">
                <h1 className="text-h1 mb-1 truncate">
                  {isZhHK ? 'ChatGPT 完整教學實戰課程' : 'ChatGPT Complete Practical Course'}
                </h1>
                <div className="flex items-center space-x-2 mb-1">
                  {stats.totalProgress === 100 ? (
                    <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  ) : stats.totalProgress > 0 ? (
                    <Zap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <Star className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-status">
                    {stats.totalProgress === 100 ? (
                      isZhHK ? '🎉 恭喜！課程完成！' : '🎉 Congratulations! Course Completed!'
                    ) : stats.totalProgress > 0 ? (
                      isZhHK ? `${getUserDisplayName()} 🚀 正在學習中` : `${getUserDisplayName()} 🚀 Learning in Progress`
                    ) : (
                      isZhHK ? '👋 歡迎開始學習！' : '👋 Welcome to Learning!'
                    )}
                  </span>
                </div>
                <p className="text-body">
                  {stats.totalProgress === 100 ? (
                    isZhHK ? '全部內容已解鎖' : 'All content unlocked'
                  ) : (
                    isZhHK ? '互動課程・隨時學習' : 'Interactive • Learn anytime'
                  )}
                </p>
              </div>
            </div>

            {/* Center Section - Core Metrics (45% width) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-4">
                
                {/* Progress Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <BarChart3 className="w-5 h-5 text-gray-400 mr-1" />
                    <span className="stat-card-title text-label">總進度</span>
                  </div>
                  <div className="text-2xl font-bold mb-1 text-white">{stats.totalProgress}%</div>
                  <div className="text-caption">
                    {stats.totalProgress === 100 ? (isZhHK ? '已達成目標' : 'Goal Achieved') : (isZhHK ? '持續進步中' : 'In Progress')}
                  </div>
                </div>

                {/* Learning Time Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <Clock className="w-5 h-5 text-green-400 mr-1" />
                    <span className="stat-card-title text-label">{isZhHK ? '學習時間' : 'Study Time'}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1 font-mono text-white">{formattedLearningTime || `${totalLearningMinutes}${isZhHK ? '分鐘' : ' min'}`}</div>
                  <div className="text-caption">{isZhHK ? '累積時長' : 'Total Time'}</div>
                </div>

                {/* Completed Themes Stat */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="stat-card-header mb-2">
                    <BookOpen className="w-5 h-5 text-gray-400 mr-1" />
                    <span className="stat-card-title text-label">{isZhHK ? '完成主題' : 'Completed Themes'}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1 text-white">
                    {stats.completedThemes}/{stats.totalThemes}
                  </div>
                  <div className="text-caption">
                    {stats.completedThemes === stats.totalThemes ? (isZhHK ? '全部完成' : 'All Complete') : (isZhHK ? '學習中' : 'Learning')}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Section - Primary Actions (25% width) */}
            <div className="lg:col-span-3 flex flex-col space-y-3">
              
              {/* Primary CTA Button */}
              {stats.totalProgress < 100 ? (
                <Button 
                  className="w-full btn-primary-action"
                  style={{ backgroundColor: 'var(--status-info)' }}
                  onClick={() => {
                    // 找到當前需要學習的單元
                    for (const theme of courseData.themes) {
                      const currentUnitIndex = theme.units.findIndex(unit => unit.current);
                      if (currentUnitIndex !== -1) {
                        console.log(`Header Continue: theme ${theme.id}, lesson ID ${currentUnitIndex + 1} (unit index ${currentUnitIndex})`);
                        navigate(`/courses/chatgpt-complete-course/theme/${theme.id}/unit/${currentUnitIndex + 1}`);
                        return;
                      }
                    }
                    // 如果沒有找到當前單元，導航到第一個主題的第一個課程
                    console.log('No current unit found, navigating to theme 1 lesson 1');
                    navigate('/courses/chatgpt-complete-course/theme/1/unit/1');
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {isZhHK ? '繼續學習' : 'Continue Learning'}
                </Button>
              ) : (
                <Button 
                  className="w-full btn-primary-action"
                  onClick={() => navigate('/courses/chatgpt-complete-course')}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  {isZhHK ? '查看課程證書' : 'View Certificate'}
                </Button>
              )}

              {/* Secondary Action - Reset Progress */}
              {process.env.NODE_ENV === 'development' && (
                <Button
                  className="w-full btn-secondary-action"
                  onClick={resetProgress}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isZhHK ? '重置進度' : 'Reset Progress'}
                </Button>
              )}

            </div>

          </div>

          {/* Progress Bar - Full Width at Bottom */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-body">
                {isZhHK ? '整體學習進度' : 'Overall Learning Progress'}
              </span>
              <span className="text-body">
                {stats.totalProgress}% {isZhHK ? '已完成' : 'completed'}
              </span>
            </div>
            <div className="progress-bar progress-bar-large">
              <div 
                className="progress-bar-fill transition-all duration-700 ease-out" 
                style={{width: `${stats.totalProgress}%`}}
              ></div>
            </div>
          </div>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Modules (NEW ACCORDION DESIGN) */}
          <div className="lg:col-span-2">
        <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="content-section-header">
                <BookOpen className="w-6 h-6 text-gray-400 mr-3" />
                <h3 className="text-h2">{isZhHK ? '課程模塊' : 'Course Modules'}</h3>
              </div>

              {/* 🎯 NEW: Accordion Style Course Modules */}
          <div className="space-y-4">
                {courseData.themes.map((theme, index) => (
                  <motion.section
                key={theme.id}
                    className={`theme-accordion bg-gray-800/30 rounded-xl border overflow-hidden transition-all duration-300 ${
                      theme.completed ? 'border-green-400/30 bg-green-400/5' : 
                      theme.units.some(unit => unit.current) ? 'border-gray-600/50 bg-gray-800/30' :
                      'border-gray-600/30'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.3 + index * 0.1, 
                      duration: 0.4
                    }}
                  >
                    {/* 🎯 Accordion Header (Theme Summary) */}
                    <header 
                      className="theme-header cursor-pointer p-6 hover:bg-white/5 transition-colors duration-200"
                      onClick={() => toggleTheme(theme.id)}
                      role="button" 
                      tabIndex={0}
                      aria-expanded={expandedThemes.has(theme.id)}
                      aria-controls={`theme-${theme.id}-content`}
                    >
                      <div className="flex items-start justify-between">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-3">
                            {/* Module Number Badge */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-data mr-4 ${
                              theme.completed ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'
                            }`}>
                              {theme.completed ? <CheckCircle className="w-6 h-6" /> : theme.id}
                            </div>
                            
                            {/* Module Title & Description */}
                            <div className="min-w-0 flex-1">
                                                      <h3 className="text-theme-title leading-tight mb-1">
                                {isZhHK ? `第${theme.id}大主題・${theme.title}` : `Chapter ${theme.id}・${theme.title}`}
                              </h3>
                              <p className="text-body leading-relaxed line-clamp-2">
                                {theme.description}
                              </p>
                        </div>
                      </div>
                      
                          {/* Progress Section */}
                          <div className="ml-16">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-label">{isZhHK ? '主題進度' : 'Theme Progress'}</span>
                              <span className="text-caption text-gray-400">
                                {theme.units.filter(u => u.completed).length}/{theme.units.length} {isZhHK ? '完成' : 'completed'} ({theme.progress}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gray-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${theme.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Chevron Icon */}
                        <div className="flex-shrink-0 ml-4">
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                              expandedThemes.has(theme.id) ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </header>

                    {/* 🎯 Accordion Content (Lesson List) */}
                    <AnimatePresence>
                      {expandedThemes.has(theme.id) && (
                        <motion.div 
                          id={`theme-${theme.id}-content`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            {/* 🎯 Compact Lesson List */}
                            <ul className="space-y-2">
                              {theme.units.map((unit, unitIndex) => {
                                const isLocked = isUnitLocked(theme.id, unitIndex);
                                
                                return (
                                  <motion.li
                                    key={unit.id}
                                    className={`lesson-item group ${
                                      isLocked ? 'lesson-locked' : 
                                      unit.completed ? 'lesson-completed' : 
                                      unit.current ? 'lesson-current' : 'lesson-todo'
                                    }`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: unitIndex * 0.05 }}
                                  >
                                    <div 
                                      className={`flex items-center p-4 rounded-lg border transition-all duration-150 ${
                                        isLocked ? 'border-gray-600 bg-gray-800/30 opacity-60 cursor-not-allowed' :
                                        unit.completed ? 'border-green-400/30 bg-green-400/5 hover:bg-green-400/10' : 
                                        unit.current ? 'border-gray-500/50 bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer' : 
                                        'border-gray-600/30 bg-gray-700/20 hover:bg-gray-600/20 cursor-pointer'
                                      }`}
                                      onClick={() => {
                                        if (!isLocked) {
                                          const actualLessonId = theme.units[unitIndex]?.id || unitIndex + 1;
                                          console.log(`Navigating to theme ${theme.id}, lesson ID ${actualLessonId} (unit index ${unitIndex})`);
                                          navigate(`/courses/chatgpt-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                                        }
                                      }}
                                    >
                                      {/* Status Icon */}
                                      <div className="flex-shrink-0 mr-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                          isLocked ? 'bg-gray-600' :
                                          unit.completed ? 'bg-green-500' : 
                                          unit.current ? 'bg-gray-600 animate-pulse' : 'bg-gray-500'
                                        }`}>
                                          {isLocked ? (
                                            <Lock className="w-4 h-4 text-gray-300" />
                                          ) : unit.completed ? (
                                            <CheckCircle className="w-5 h-5 text-white" />
                                          ) : unit.current ? (
                                            <Play className="w-4 h-4 text-white" />
                                          ) : (
                                            <Play className="w-4 h-4 text-white" />
                                          )}
                                        </div>
                                      </div>
                                      
                                      {/* Lesson Content */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center mb-1">
                                              <span className={`text-caption mr-3 ${
                                                isLocked ? 'text-gray-500' :
                                                unit.current ? 'text-gray-300' : 'text-gray-400'
                                              }`}>
                                                {theme.id}.{unitIndex + 1}
                          </span>
                                              <h4 className={`text-unit-title leading-tight ${
                                                isLocked ? 'text-gray-500' :
                                                unit.completed ? 'text-gray-300 line-through decoration-gray-500' : 
                                                unit.current ? 'text-white' : 'text-white group-hover:text-gray-200'
                                              }`}>
                                                {unit.title}
                                              </h4>
                                            </div>
                                            <div className={`flex items-center text-caption ${
                                              isLocked ? 'text-gray-600' : 'text-gray-400'
                                            }`}>
                                              <Clock className="w-4 h-4 mr-1" />
                                              <span>{unit.duration || (isZhHK ? '30分鐘' : '30 minutes')}</span>
                                              {unit.current && (
                                                <>
                                                  <span className="mx-2">•</span>
                                                  <span className="text-caption text-gray-300">{isZhHK ? '進行中' : 'In Progress'}</span>
                                                </>
                                              )}
                                            </div>
                        </div>
                        
                                          {/* Action Button */}
                                          <div className="flex-shrink-0 ml-4">
                                            {isLocked ? (
                                              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-caption bg-gray-700 text-gray-400">
                                                <Lock className="w-4 h-4 mr-1" />
                                                {isZhHK ? '已鎖定' : 'Locked'}
                              </span>
                                            ) : unit.completed ? (
                                              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-caption bg-green-100 text-green-700">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                {isZhHK ? '已完成' : 'Completed'}
                              </span>
                                            ) : unit.current ? (
                                              <Button
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const actualLessonId = theme.units[unitIndex]?.id || unitIndex + 1;
                                                  console.log(`Continue Learning: theme ${theme.id}, lesson ID ${actualLessonId} (unit index ${unitIndex})`);
                                                  navigate(`/courses/chatgpt-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                                                }}
                                              >
                                                <Play className="w-4 h-4 mr-2" />
                                                {isZhHK ? '繼續學習' : 'Continue Learning'}
                                              </Button>
                                            ) : (
                                              <Button
                                                variant="outline"
                                                className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 hover:text-gray-200 px-4 py-2"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const actualLessonId = theme.units[unitIndex]?.id || unitIndex + 1;
                                                  console.log(`Start Learning: theme ${theme.id}, lesson ID ${actualLessonId} (unit index ${unitIndex})`);
                                                  navigate(`/courses/chatgpt-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                                                }}
                                              >
                                                <Play className="w-4 h-4 mr-2" />
                                                開始學習
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                            </div>
                                  </motion.li>
                                );
                              })}
                            </ul>

                            {/* 🎯 Quiz Section - Added for ALL THEMES 1-6 */}
                            <motion.div
                              className="mt-6 p-5 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-lg border border-yellow-500/30"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="flex items-start space-x-4">
                                {/* Quiz Icon */}
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-white" />
                                  </div>
                                </div>
                                
                                {/* Quiz Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-h3 text-yellow-300">
                                      {theme.id === 1 ? (
                                        isZhHK ? '第一章測驗：初見 ChatGPT - 基礎入門' : 'Chapter 1 Quiz: First Encounter with ChatGPT - Basic Introduction'
                                      ) : theme.id === 2 ? (
                                        isZhHK ? '第二章測驗：提問的藝術 - 高效 Prompt Engineering' : 'Chapter 2 Quiz: The Art of Questioning - Efficient Prompt Engineering'
                                      ) : theme.id === 3 ? (
                                        isZhHK ? '第三章測驗：生活與工作 - 日常實用場景' : 'Chapter 3 Quiz: Life and Work - Daily Practical Scenarios'
                                      ) : theme.id === 4 ? (
                                        isZhHK ? '第四章測驗：釋放潛能 - 進階功能與技巧' : 'Chapter 4 Quiz: Unleashing Potential - Advanced Features and Techniques'
                                      ) : theme.id === 5 ? (
                                        isZhHK ? '第五章測驗：創意無限 - 探索娛樂與創作' : 'Chapter 5 Quiz: Unlimited Creativity - Exploring Entertainment and Creation'
                                      ) : (
                                        isZhHK ? '第六章測驗：智慧使用 - 限制、道德與未來' : 'Chapter 6 Quiz: Smart Usage - Limitations, Ethics and Future'
                                      )}
                                    </h4>
                                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                                      {isZhHK ? '測驗' : 'Quiz'}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-body text-yellow-100/80 mb-4 leading-relaxed">
                                    {theme.id === 1 ? (
                                      isZhHK ? 
                                        '測試您對 ChatGPT 基礎概念的理解，包括核心技術、使用方法和基本功能。' : 
                                        'Test your understanding of ChatGPT basic concepts, including core technology, usage methods and basic functions.'
                                    ) : theme.id === 2 ? (
                                      isZhHK ? 
                                        '測試您對 Prompt Engineering 的理解，包括有效提示詞的構建技巧和優化策略。' : 
                                        'Test your understanding of Prompt Engineering, including effective prompt construction techniques and optimisation strategies.'
                                    ) : theme.id === 3 ? (
                                      isZhHK ? 
                                        '測試您在日常生活和工作場景中應用 ChatGPT 的實際能力和技巧。' : 
                                        'Test your practical ability and skills in applying ChatGPT in daily life and work scenarios.'
                                    ) : theme.id === 4 ? (
                                      isZhHK ? 
                                        '測試您對 ChatGPT 進階功能的掌握程度，包括複雜任務處理和高級技巧。' : 
                                        'Test your mastery of ChatGPT advanced features, including complex task handling and advanced techniques.'
                                    ) : theme.id === 5 ? (
                                      isZhHK ? 
                                        '測試您運用 ChatGPT 進行創意創作和娛樂應用的技能和想像力。' : 
                                        'Test your skills and creativity in using ChatGPT for creative projects and entertainment applications.'
                                    ) : (
                                      isZhHK ? 
                                        '測試您對 ChatGPT 使用限制、道德考量和未來發展的深度理解。' : 
                                        'Test your deep understanding of ChatGPT usage limitations, ethical considerations and future developments.'
                                    )}
                                  </p>
                                  
                                  {/* Quiz Info */}
                                  <div className="flex items-center space-x-6 mb-4 text-caption text-yellow-200/70">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-4 h-4" />
                                      <span>
                                        {theme.id === 1 ? (isZhHK ? '15分鐘' : '15 minutes') : 
                                         theme.id === 2 ? (isZhHK ? '18分鐘' : '18 minutes') : 
                                         theme.id === 3 ? (isZhHK ? '20分鐘' : '20 minutes') : 
                                         theme.id === 4 ? (isZhHK ? '25分鐘' : '25 minutes') : 
                                         theme.id === 5 ? (isZhHK ? '20分鐘' : '20 minutes') : 
                                         (isZhHK ? '15分鐘' : '15 minutes')}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Target className="w-4 h-4" />
                                      <span>{isZhHK ? '5道題目' : '5 questions'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Award className="w-4 h-4" />
                                      <span>{isZhHK ? '60%及格' : '60% to pass'}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Action Button */}
                                  <Button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2"
                                    onClick={() => navigate(`/courses/chatgpt-complete-course/theme/${theme.id}/quiz`)}
                                  >
                                    <Target className="w-4 h-4 mr-2" />
                                    {isZhHK ? '開始測驗' : 'Start Quiz'}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills & Progress (UNCHANGED) */}
          <div className="space-y-6">
            {/* Skills Radar - IMPROVED */}
            <motion.div 
              className="skills-radar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-h2 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-gray-400" />
                  {isZhHK ? '技能發展追蹤' : 'Skills Development Tracking'}
                </h3>
                <div className="learning-progress-percentage text-white">
                  {stats.totalProgress}%
                </div>
              </div>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <span className="skill-name text-white/80">{skill.name}</span>
                    <div className="skill-progress">
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-bar-fill" 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                    <span className="skill-percentage text-white">{skill.percentage}%</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                  <Trophy className="w-4 h-4" />
                  <span className="text-h3">{isZhHK ? '學習成就' : 'Learning Achievements'}</span>
                </div>
                <p className="text-caption">
                  {isZhHK ? 'ChatGPT 完整教學實戰課程' : 'ChatGPT Complete Practical Course'}
                </p>
              </div>
            </motion.div>

            {/* Learning Progress Overview - IMPROVED */}
            <motion.div 
              className="learning-progress-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-h2 flex items-center mb-6">
                <Calendar className="w-5 h-5 mr-2 text-green-400" />
                {isZhHK ? '學習進度總覽' : 'Learning Progress Overview'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                                      <div className="text-data text-gray-300 mb-1">{stats.completedThemes}</div>
                  <div className="text-label">{isZhHK ? '已完成主題' : 'Completed Themes'}</div>
                </div>
                                  <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                                      <div className="text-data text-gray-300 mb-1">{stats.totalThemes - stats.completedThemes}</div>
                  <div className="text-label">{isZhHK ? '剩餘主題' : 'Remaining Themes'}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-caption">{isZhHK ? '學習時間' : 'Study Time'}</span>
                  <span className="text-body">{formattedLearningTime}</span>
                </div>
                
                <div className="learning-streak border border-orange-500/20 bg-orange-500/10">
                  <Zap className="learning-streak-icon text-orange-400" />
                  <span className="learning-streak-text text-orange-300">
                    {isZhHK ? '下一步' : 'Next Step'}
                  </span>
                    </div>
                    
                <div className="text-center pt-4">
                  <p className="text-caption mb-2">
                    {(() => {
                      // 找到當前學習的單元
                      for (const theme of courseData.themes) {
                        const currentUnit = theme.units.find(unit => unit.current);
                        if (currentUnit) {
                          return isZhHK ? 
                            `單元 ${currentUnit.id}：${currentUnit.title.slice(0, 15)}...` :
                            `Unit ${currentUnit.id}: ${currentUnit.title.slice(0, 15)}...`;
                        }
                      }
                      return '所有單元已完成！';
                    })()}
                  </p>
                      <Button
                    className="btn-accent w-full"
                    onClick={() => {
                      // 找到當前需要學習的單元
                      for (const theme of courseData.themes) {
                        const currentUnitIndex = theme.units.findIndex(unit => unit.current);
                        if (currentUnitIndex !== -1) {
                          const actualLessonId = theme.units[currentUnitIndex]?.id || currentUnitIndex + 1;
                          console.log(`Sidebar Continue: theme ${theme.id}, lesson ID ${actualLessonId} (unit index ${currentUnitIndex})`);
                          navigate(`/courses/chatgpt-complete-course/theme/${theme.id}/unit/${actualLessonId}`);
                          return;
                        }
                      }
                      console.log('Sidebar fallback: navigating to theme 1 lesson 1');
                      navigate('/courses/chatgpt-complete-course/theme/1/unit/1');
                    }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {isZhHK ? '繼續學習' : 'Continue Learning'}
                      </Button>
                    </div>
                  </div>

                              <div className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-gray-700/30 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2 text-green-400 text-caption">
                  <Target className="w-4 h-4" />
                  <span>{isZhHK ? '6大學習里程碑' : '6 Learning Milestones'}</span>
                </div>
          </div>
        </motion.div>

            {/* Achievement Badges */}
        <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-h2 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                {isZhHK ? '成就徽章' : 'Achievement Badges'}
              </h3>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className={`achievement-badge-${achievement.type} text-caption`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <achievement.icon className="w-4 h-4 mr-2" />
                    {achievement.label}
                  </motion.div>
                ))}
              </div>
        </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseLearning; 