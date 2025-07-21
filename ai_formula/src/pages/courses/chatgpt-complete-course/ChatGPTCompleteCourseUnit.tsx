import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  MessageSquare, Bookmark, ThumbsUp, Share2, FileText, Video,
  Star, Target, Download, Volume2, Maximize, Lightbulb, TrendingUp, Users, Globe, Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress';
import './ChatGPTCompleteCourseUnit.css';
import '@/styles/design-system.css';
import { LearningPageSkeleton, HeaderSkeleton, LearningContentSkeleton, SidebarSkeleton } from '@/components/ui/skeleton';

const ChatGPTCompleteCourseUnit: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  // 計時器狀態
  const [learningSeconds, setLearningSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  const [forceTimerForTesting, setForceTimerForTesting] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  // 進度管理 - 簡化版本
  const progressHook = useChatGPTProgress();

  // 🔧 開發者快捷鍵：按 Ctrl+D 顯示/隱藏調試面板
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd' && isDevelopment) {
        e.preventDefault();
        setShowDebugPanel(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDevelopment]);

  // 計時器邏輯
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive || forceTimerForTesting) {
      interval = setInterval(() => {
        setLearningSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, forceTimerForTesting]);

  // 單元數據配置
  const unitsData = [
    // 第一單元：AI 革命的開端 — 重新認識 ChatGPT
    { 
      id: 1, 
      title: "單元 1.1：什麼是大型語言模型 (LLM)？", 
      duration: "25分鐘",
      transcript: `大型語言模型（Large Language Model, LLM）是一種尖端的人工智能（AI）程式，經過海量文本數據的訓練，從而學會了理解、生成、總結、翻譯人類語言以及執行其他複雜的文本相關任務。從根本上說，LLM 是一個深度學習模型，它並非真正地進行人類意義上的「思考」，而是基於極其複雜的概率計算，來預測一個文本序列中接下來最可能出現的詞語。

「大型」這個詞彙主要體現在兩個維度：其一是訓練數據集的規模，這些數據集往往來源於互聯網的廣泛文本，例如包含數十億網頁的 Common Crawl 數據庫和擁有數千萬頁面的維基百科；其二是模型本身的複雜度，即其包含的「參數」數量，這些參數可視為模型在學習過程中調整的內部變量，數量可高達數千億甚至更多。

LLM 與傳統 AI 最大的區別在於其驚人的通用性和靈活性。傳統的機器學習模型通常是為單一、特定的任務而設計，例如情感分析或垃圾郵件過濾。然而，一個 LLM 卻能憑藉其廣博的「知識」，執行多種截然不同的任務，從回答常識問題、撰寫專業文案，到生成電腦代碼，都可由同一個基礎模型完成。

在人工智能的技術層級中，LLM 處於金字塔的頂端。它建立在機器學習的基礎之上，是深度學習的一個分支，並利用神經網絡作為其計算架構。作為生成式 AI 的一個高度專業化的子集，LLM 專注於理解、預測和生成類人文本。`,
      keyPoints: [
        "理解LLM的基本工作原理：透過海量數據訓練預測下一個詞語",
        "掌握「大型」的兩個維度：數據規模和模型參數數量", 
        "認識LLM的通用性優勢：一個模型可以處理多種不同任務",
        "了解LLM在AI技術層級中的定位和重要性"
      ]
    },
    { 
      id: 2, 
      title: "單元 1.2：🧠 拆解 LLM", 
      duration: "22分鐘",
      transcript: `在這一節中，我們將深入探討大型語言模型的技術架構和運作機制...`,
      keyPoints: [
        "理解語言模型的基本概念和發展歷程",
        "掌握Transformer架構的核心組件",
        "了解注意力機制在語言理解中的作用",
        "認識預訓練和微調的重要性"
      ]
    },
    { 
      id: 3, 
      title: "單元 1.3：📈 GPT 演進史", 
      duration: "28分鐘",
      transcript: `GPT系列模型的發展歷程標誌著人工智能領域的重大突破...`,
      keyPoints: [
        "追溯GPT模型的發展脈絡",
        "比較不同版本GPT的能力差異",
        "理解模型規模擴展的重要性",
        "預測未來語言模型的發展趨勢"
      ]
    },
    { 
      id: 4, 
      title: "單元 1.4：💳 精明選擇", 
      duration: "20分鐘",
      transcript: `選擇合適的AI工具對於提高工作效率至關重要...`,
      keyPoints: [
        "評估不同AI平台的功能特點",
        "理解免費版本與付費版本的差異",
        "學會根據需求選擇合適的工具",
        "掌握成本效益分析的方法"
      ]
    },
    { 
      id: 5, 
      title: "單元 1.5：🛡️ 安全註冊", 
      duration: "18分鐘",
      transcript: `確保帳戶安全是使用任何在線服務的基本要求...`,
      keyPoints: [
        "學會安全註冊AI平台帳戶",
        "設置強密碼和雙重驗證",
        "了解隱私設置的重要性",
        "掌握帳戶管理的最佳實踐"
      ]
    },
    // 第二單元
    { 
      id: 6, 
      title: "單元 2.1：👆 介面快覽", 
      duration: "25分鐘",
      transcript: `熟悉ChatGPT的用戶界面是高效使用的第一步...`,
      keyPoints: [
        "了解ChatGPT界面的各個組件",
        "掌握基本導航和操作技巧",
        "學會自定義界面設置",
        "提高使用效率的小技巧"
      ]
    },
    { 
      id: 7, 
      title: "單元 2.2：📂 對話整理術", 
      duration: "22分鐘",
      transcript: `有效管理對話歷史對於長期使用AI助手非常重要...`,
      keyPoints: [
        "學會組織和分類對話記錄",
        "掌握重要對話的保存技巧",
        "了解對話搜索和檢索方法",
        "建立個人對話管理系統"
      ]
    },
    { 
      id: 8, 
      title: "單元 2.3：✍️ 個人化指令 (Custom Instructions)", 
      duration: "30分鐘",
      transcript: `個人化指令功能讓AI更好地理解你的需求和偏好...`,
      keyPoints: [
        "理解個人化指令的工作原理",
        "學會設置有效的個人化指令",
        "掌握優化指令的技巧",
        "應用個人化指令提高回答質量"
      ]
    },
    { 
      id: 9, 
      title: "單元 2.4：📱 手機實戰", 
      duration: "26分鐘",
      transcript: `移動設備上的AI使用體驗與桌面版本有所不同...`,
      keyPoints: [
        "掌握手機版ChatGPT的特殊功能",
        "學會語音輸入和輸出的使用",
        "了解移動端的最佳實踐",
        "提高移動使用效率"
      ]
    },
    { 
      id: 10, 
      title: "單元 2.5：🏪 探索 GPT 商店", 
      duration: "24分鐘",
      transcript: `GPT商店提供了豐富的專業化AI助手...`,
      keyPoints: [
        "探索GPT商店的功能和結構",
        "學會選擇和評估自定義GPT",
        "了解如何使用第三方GPT",
        "發現適合自己需求的專業工具"
      ]
    },
    // 第三單元
    { 
      id: 11, 
      title: "單元 3.1：🏛️ 指令四基石", 
      duration: "30分鐘",
      transcript: `一條好的指令就像一份清晰的工作簡報...`,
      keyPoints: [
        "理解CRPF指令框架的四大基石",
        "學會提供充分的背景脈絡",
        "掌握角色設定的重要性",
        "明確過程和格式要求"
      ]
    },
    { 
      id: 12, 
      title: "單元 3.2：🎭 角色扮演法", 
      duration: "25分鐘",
      transcript: `角色扮演是最簡單但最有效的技巧之一...`,
      keyPoints: [
        "理解角色設定對回答質量的影響",
        "學會使用專業角色引導AI",
        "掌握不同領域專家的設定技巧",
        "提升AI回答的專業度和準確性"
      ]
    },
    { 
      id: 13, 
      title: "單元 3.3：✨ 範例引導術 (Few-Shot Prompting)", 
      duration: "28分鐘",
      transcript: `通過提供範例來引導AI學習你想要的回答格式...`,
      keyPoints: [
        "理解Few-Shot Prompting的原理",
        "學會構建有效的範例",
        "掌握統一輸出格式的技巧",
        "應用範例引導提高一致性"
      ]
    },
    { 
      id: 14, 
      title: "單元 3.4：🔗 思維鏈技巧 (Chain of Thought)", 
      duration: "26分鐘",
      transcript: `引導AI逐步思考可以大幅提升複雜問題的解決能力...`,
      keyPoints: [
        "理解思維鏈推理的重要性",
        "學會引導AI逐步分析問題",
        "掌握複雜問題的分解技巧",
        "提高邏輯推理的準確性"
      ]
    },
    { 
      id: 15, 
      title: "單元 3.5：🎯 追問優化", 
      duration: "22分鐘",
      transcript: `對話是一個過程，追問是獲得完美答案的關鍵...`,
      keyPoints: [
        "建立對話思維而非一問一答",
        "掌握有效的追問策略",
        "學會指導AI改進回答",
        "提升回答質量到95分"
      ]
    },
    { 
      id: 16, 
      title: "單元 3.6：📚 指令範本庫", 
      duration: "20分鐘",
      transcript: `提供實用的指令範本庫，涵蓋工作生活各種場景...`,
      keyPoints: [
        "獲得20+精心設計的指令範本",
        "學會修改範本適應個人需求",
        "掌握範本變數的替換技巧",
        "建立個人化指令工具箱"
      ]
    }
    // 第四、五單元數據會在下一部分繼續添加
  ];

  // 當前單元
  const currentUnit = useMemo(() => {
    const unitIndex = parseInt(unitId || '1') - 1;
    return unitsData[unitIndex] || unitsData[0];
  }, [unitId]);

  // 保存進度
  const handleSaveProgress = useCallback(() => {
    const progress = {
      unitId: currentUnit.id,
      completed: true,
      timestamp: new Date().toISOString(),
      learningTime: learningSeconds
    };
    
    localStorage.setItem(`chatgpt-progress-${currentUnit.id}`, JSON.stringify(progress));
  }, [currentUnit.id, learningSeconds]);

  // 導航到下一單元
  const handleNextUnit = useCallback(() => {
    handleSaveProgress();
    const nextUnitId = currentUnit.id + 1;
    if (nextUnitId <= unitsData.length) {
      navigate(`/courses/chatgpt-complete-course/unit/${nextUnitId}`);
    } else {
      navigate('/courses/chatgpt-complete-course');
    }
  }, [currentUnit.id, navigate, handleSaveProgress, unitsData.length]);

  // 格式化時間
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 加載狀態
  if (!currentUnit) {
    return <LearningPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      {/* 主要內容區域 */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* 主要學習內容 */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* 課程標題和進度 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {currentUnit.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {currentUnit.duration}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        學習時間: {formatTime(learningSeconds)}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/courses/chatgpt-complete-course')}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回課程
                  </Button>
                </div>

                <Progress value={(currentUnit.id / unitsData.length) * 100} className="h-2" />
                <p className="text-sm text-gray-400 mt-2">
                  單元 {currentUnit.id} / {unitsData.length}
                </p>
              </motion.div>

              {/* 課程內容 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-400" />
                  課程內容
                </h2>
                
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {currentUnit.transcript}
                  </div>
                </div>
              </motion.div>

              {/* 學習重點 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-400" />
                  學習重點
                </h2>
                
                <div className="space-y-3">
                  {currentUnit.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 視覺卡片區域 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  視覺卡片區域
                </h2>
                
                {/* 視覺卡片內容 - 根據currentUnit.id動態顯示 */}
                <div className="text-gray-300">
                  {(() => {
                    switch(currentUnit.id) {
                      case 1: // 1.1 學習地圖
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🗺️ 學習地圖</h4>
                              <h4 className="text-base lg:text-lg font-semibold text-white">📚 主要內容</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                呢一節係整個課程嘅開端，我哋會介紹人工智能嘅基本概念，解釋呢個課程點解對你咁重要。你會得到一份清晰嘅學習路線圖，了解六大單元嘅結構，同埋點樣跟住課程嘅步伐，由零基礎一步步成為 AI 應用高手。
                              </p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🎯 學習重點</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">清晰了解課程六大單元嘅結構同埋關連。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">確立你學完之後可以達到嘅具體技能，例如：獨立寫出高效指令。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">掌握最有效嘅學習方法，點樣跟住課程嘅實戰項目一齊做，做到最好嘅效果。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                        
                      case 2: // 1.2 拆解 LLM
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">📚 主要內容</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                究竟大型語言模型 (Large Language Model) 係咩？呢一節會用最生活化、最簡單嘅比喻（例如將佢比喻成一個讀過晒全世界圖書館嘅實習生），徹底拆解 LLM 嘅核心運作原理，令你唔再覺得 AI 係一個遙不可及嘅黑盒。
                              </p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🎯 學習重點</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">用自己嘅說話解釋到咩係 LLM 同埋 GPT。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">理解「訓練數據 (Training Data)」點樣影響 AI 嘅回答。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">明白點解 AI 有時會「作故仔」，建立對 AI 能力嘅正確認知。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 3: // 1.3 GPT 演進史
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">📚 主要內容</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                由 GPT-3.5 到 GPT-4，再到最新嘅 GPT-4o，每一次升級都帶嚟革命性嘅改變。呢一節會帶你快速回顧 GPT 嘅發展歷史，重點比較唔同版本喺推理能力、速度、同埋多模態（識睇識聽識講）方面嘅關鍵差異。
                              </p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🎯 學習重點</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">講得出 GPT-3.5 同 GPT-4/4o 之間嘅主要能力差距。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">理解「多模態」對實際應用帶嚟嘅好處。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學識根據唔同嘅任務，判斷應該用邊個模型版本。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 4: // 1.4 精明選擇
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">📚 主要內容</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                免費版已經好好用，咁點解仲要俾錢升級 Plus 版？呢一節會並排比較免費版同 Plus 版嘅所有功能，包括速度、模型使用權、高階功能（數據分析、DALL-E 3）等等，再提供幾個典型嘅用戶場景，幫你做最精明嘅選擇。
                              </p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🎯 學習重點</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">掌握免費版同 Plus 版嘅完整功能分別列表。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">分析自己嘅使用需求，判斷自己需唔需要升級。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">了解 Plus 版獨有嘅高階功能可以點樣幫到你嘅工作同學習。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 5: // 1.5 安全註冊
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">📚 主要內容</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                工欲善其事，必先利其器。呢一節會提供最詳細嘅步驟，手把手帶你由零開始註冊一個 OpenAI 帳戶。同時，我哋會特別強調帳戶安全，教你點樣設定一個高強度密碼，同埋開啟「兩步驗證 (2FA)」功能，保障你嘅個人資料。
                              </p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🎯 學習重點</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">成功註冊並登入自己嘅 ChatGPT 帳戶。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學識點樣設定同開啟兩步驗證，提升帳戶安全性。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">了解基本嘅私隱設定，知道點樣管理你嘅對話歷史紀錄。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 6: // 2.1 介面快覽
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">📚 主要內容</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                呢一節會帶你進行一個完整嘅 ChatGPT 介面導覽，由左邊嘅歷史紀錄面板，到中間嘅主對話視窗，再到右下角嘅用戶設定，每一個按鈕、每一個選項嘅功能都會詳細解釋，確保你對操作環境瞭如指掌。
                              </p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🎯 學習重點</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">快速搵到並使用對話歷史紀錄、新增對話等核心功能。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">理解唔同設定選項（例如主題顏色、語言）嘅作用。</p>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">熟悉整個介面佈局，為之後嘅高效操作打好基礎。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                        
                      default:
                        return (
                          <div className="text-center py-8">
                            <p className="text-gray-400">此單元的視覺卡片內容正在準備中...</p>
                          </div>
                        );
                    }
                  })()}
                </div>
              </motion.div>

              {/* 導航按鈕 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between items-center"
              >
                <Button
                  onClick={() => {
                    const prevUnitId = currentUnit.id - 1;
                    if (prevUnitId >= 1) {
                      navigate(`/courses/chatgpt-complete-course/unit/${prevUnitId}`);
                    }
                  }}
                  variant="outline"
                  disabled={currentUnit.id === 1}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  上一單元
                </Button>

                <Button
                  onClick={handleNextUnit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {currentUnit.id >= unitsData.length ? '完成課程' : '下一單元'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* 右側邊欄 */}
            <div className="lg:col-span-1 space-y-6">
              {/* 課程進度卡片 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4">課程進度</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">當前單元</span>
                    <span className="text-white font-medium">{currentUnit.id}/{unitsData.length}</span>
                  </div>
                  
                  <Progress value={(currentUnit.id / unitsData.length) * 100} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">完成度</span>
                    <span className="text-white font-medium">
                      {Math.round((currentUnit.id / unitsData.length) * 100)}%
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 學習統計 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4">學習統計</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">學習時間</span>
                    <span className="text-white font-medium">{formatTime(learningSeconds)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">預計時長</span>
                    <span className="text-white font-medium">{currentUnit.duration}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 