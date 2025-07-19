import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  MessageSquare, Bookmark, ThumbsUp, Share2, FileText, Video,
  Star, Target, Download, Edit, Save, Volume2, Maximize, Lightbulb, TrendingUp, Users, Globe, Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress'; // ChatGPT 進度追蹤
import './ChatGPTCompleteCourseUnit.css'; // 🎨 課程頁面增強樣式
import '@/styles/design-system.css'; // 🎨 統一設計系統
import { LearningPageSkeleton, HeaderSkeleton, LearningContentSkeleton, SidebarSkeleton } from '@/components/ui/skeleton'; // 新增：骨架屏

const ChatGPTCompleteCourseUnit: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  const [notes, setNotes] = useState('');
  // 計時器狀態 - 簡化版
  const [learningSeconds, setLearningSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  
  // 🔧 調試模式：強制啟動計時器（測試用）
  const [forceTimerForTesting, setForceTimerForTesting] = useState(false); // 🎯 改為 false，生產環境不強制啟動

  // 🔧 調試面板控制 - 只在特定條件下顯示
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

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
  
  // 🎯 使用進度追蹤 Hook
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    themeProgress
  } = useChatGPTProgress();

  // 自定義單元完成檢查
  const isUnitCompleted = useCallback((unitKey: string): boolean => {
    // 從 unitKey 解析 themeId 和 unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return false;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    const progress = getThemeProgress(themeId);
    return progress ? progress.completedUnits.includes(unitId) : false;
  }, [getThemeProgress]);
  
  // 自定義單元完成功能
  const markUnitCompleted = useCallback((unitKey: string, timeSpent: number = 60) => {
    // 從 unitKey 解析 themeId 和 unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    // 將秒數轉換為分鐘
    const timeInMinutes = Math.ceil(timeSpent / 60);
    
    completeUnit(themeId, unitId, timeInMinutes);
  }, [completeUnit]);
  
  const [completionAnimation, setCompletionAnimation] = useState(false);
  const [realTimeDisplay, setRealTimeDisplay] = useState('00:00:00'); // 修正：統一初始化為 HH:MM:SS 格式

  // 根據 themeId 和 unitId 生成 unit key
  const getUnitKey = (themeId: string, unitId: string): string => {
    return `t${themeId}-u${unitId}`;
  };

  const currentUnitKey = getUnitKey(themeId || '1', unitId || '1');
  const isCompleted = isUnitCompleted(currentUnitKey);
  const stats = getProgressStats();

  // 🚀 性能優化：緩存事件處理函數
  const handleMarkComplete = useCallback(() => {
    console.log(`🎯 [FIXED] 標記完成 - 當前學習秒數:`, learningSeconds);
    
    // 🎯 重要：立即停止計時器
    setIsTimerActive(false);
    
    // 使用當前的 learningSeconds 作為最終時間
    const finalSeconds = Math.max(learningSeconds, 1); // 最少1秒
    
    console.log(`📊 [FIXED] 最終學習時間: ${finalSeconds}秒`);
    
    // 格式化最終顯示時間為 HH:MM:SS 格式
    const finalHours = Math.floor(finalSeconds / 3600);
    const finalMinutes = Math.floor((finalSeconds % 3600) / 60);
    const remainingSeconds = finalSeconds % 60;
    
    const formattedHours = finalHours.toString().padStart(2, '0');
    const formattedMinutes = finalMinutes.toString().padStart(2, '0');
    const formattedSecondsDisplay = remainingSeconds.toString().padStart(2, '0');
    const finalTimeDisplay = `${formattedHours}:${formattedMinutes}:${formattedSecondsDisplay}`;
    
    setRealTimeDisplay(finalTimeDisplay);
    
    // 🎯 重要修改：傳遞精確的學習秒數給 markUnitCompleted
    markUnitCompleted(currentUnitKey, finalSeconds);
    
    console.log(`🎉 [FIXED] 完成動畫將顯示:`, finalTimeDisplay);
    console.log(`💾 [STORAGE] 已儲存學習時間: ${finalSeconds}秒`);
    console.log(`⏹️ [TIMER] 計時器已停止，isCompleted 將變為 true`);
    
    // 顯示完成動畫
    setCompletionAnimation(true);
    
    setTimeout(() => {
      setCompletionAnimation(false);
    }, 2000);
  }, [learningSeconds, currentUnitKey, markUnitCompleted]);

  const handleSaveNotes = useCallback(() => {
    // 保存筆記的邏輯
    console.log('保存筆記:', notes);
  }, [notes]);

  const handleNavigateBack = useCallback(() => {
    navigate('/courses/chatgpt-complete-course/learning');
  }, [navigate]);

  const handleNavigateNext = useCallback((nextUnitId: number) => {
    // 判斷下一個單元屬於哪個主題
    let nextThemeId = themeId;
    if (nextUnitId >= 6 && nextUnitId <= 10) nextThemeId = '2';
    if (nextUnitId >= 11 && nextUnitId <= 16) nextThemeId = '3';
    if (nextUnitId >= 17 && nextUnitId <= 21) nextThemeId = '4';
    if (nextUnitId >= 22 && nextUnitId <= 26) nextThemeId = '5';
    if (nextUnitId >= 27 && nextUnitId <= 31) nextThemeId = '6';
    
    navigate(`/courses/chatgpt-complete-course/theme/${nextThemeId}/unit/${nextUnitId}`);
  }, [navigate, themeId]);

  const handleNavigatePrev = useCallback((prevUnitId: number) => {
    // 判斷上一個單元屬於哪個主題
    let prevThemeId = themeId;
    if (prevUnitId >= 1 && prevUnitId <= 5) prevThemeId = '1';
    if (prevUnitId >= 6 && prevUnitId <= 10) prevThemeId = '2';
    if (prevUnitId >= 11 && prevUnitId <= 16) prevThemeId = '3';
    if (prevUnitId >= 17 && prevUnitId <= 21) prevThemeId = '4';
    if (prevUnitId >= 22 && prevUnitId <= 26) prevThemeId = '5';
    if (prevUnitId >= 27 && prevUnitId <= 31) prevThemeId = '6';
    
    navigate(`/courses/chatgpt-complete-course/theme/${prevThemeId}/unit/${prevUnitId}`);
  }, [navigate, themeId]);

  const handleNavigateQuiz = useCallback(() => {
    navigate(`/courses/chatgpt-complete-course/theme/${themeId}/quiz`);
  }, [navigate, themeId]);

  // ChatGPT 課程單元數據 - 完整的 31 個單元
  const units = useMemo(() => ({
    // 第一章：解構 ChatGPT — 深入核心技術
    '1': {
          id: 1,
      themeId: 1,
      title: isZhHK ? '單元 1.1：什麼是大型語言模型 (LLM)？' : 'Unit 1.1: What is Large Language Model (LLM)?',
      duration: '15分鐘',
      type: 'text' as const,
      description: isZhHK ? '深入了解大型語言模型的核心概念，從基礎原理到技術架構，建立堅實的理論基礎。' : 'Dive deep into the core concepts of Large Language Models, from basic principles to technical architecture.',
      content: {
        transcript: isZhHK ? 
          '大型語言模型（Large Language Model, LLM）是一種尖端的人工智能（AI）程式，經過海量文本數據的訓練，從而學會了理解、生成、總結、翻譯人類語言以及執行其他複雜的文本相關任務。從根本上說，LLM 是一個深度學習模型，它並非真正地進行人類意義上的「思考」，而是基於極其複雜的概率計算，來預測一個文本序列中接下來最可能出現的詞語。\n\n「大型」這個詞彙主要體現在兩個維度：其一是訓練數據集的規模，這些數據集往往來源於互聯網的廣泛文本，例如包含數十億網頁的 Common Crawl 數據庫和擁有數千萬頁面的維基百科；其二是模型本身的複雜度，即其包含的「參數」數量，這些參數可視為模型在學習過程中調整的內部變量，數量可高達數千億甚至更多。\n\nLLM 與傳統 AI 最大的區別在於其驚人的通用性和靈活性。傳統的機器學習模型通常是為單一、特定的任務而設計，例如情感分析或垃圾郵件過濾。然而，一個 LLM 卻能憑藉其廣博的「知識」，執行多種截然不同的任務，從回答常識問題、撰寫專業文案，到生成電腦代碼，都可由同一個基礎模型完成。\n\n在人工智能的技術層級中，LLM 處於金字塔的頂端。它建立在機器學習的基礎之上，是深度學習的一個分支，並利用神經網絡作為其計算架構。作為生成式 AI 的一個高度專業化的子集，LLM 專注於理解、預測和生成類人文本。' :
          'A Large Language Model (LLM) is a cutting-edge artificial intelligence program trained on massive text data to understand, generate, summarize, translate human language and perform other complex text-related tasks.',
        keyPoints: isZhHK ? [
          'LLM 是基於深度學習的文本處理 AI 程式',
          '「大型」體現在數據規模和參數數量兩個維度',
          '具備驚人的通用性，可執行多種不同任務',
          '處於人工智能技術層級的金字塔頂端'
        ] : [
          'LLM is a deep learning-based AI program for text processing',
          '"Large" reflects both data scale and parameter count',
          'Remarkable versatility for various different tasks',
          'At the top of the AI technology hierarchy pyramid'
        ]
      },
      nextUnit: 2,
      nextTheme: null,
      completed: false
    },

    '2': {
          id: 2,
      themeId: 1,
      title: isZhHK ? '單元 1.2：Transformer 架構：神經網絡與自注意力機制 (Self-Attention)' : 'Unit 1.2: Transformer Architecture: Neural Networks & Self-Attention Mechanisms',
      duration: '12分鐘',
      type: 'text' as const,
      description: isZhHK ? '探索LLM的構建基石—神經網絡，以及revolutionaryTransformer架構的核心創新自注意力機制。' : 'Explore the building blocks of LLM—neural networks, and the core innovation of the revolutionary Transformer architecture: self-attention mechanisms.',
      content: {
        transcript: isZhHK ? 
          'LLM 的構建基石是人工神經網絡，這是一種模仿生物大腦中神經元相互連接和傳遞信號方式的計算模型。它由多個層級的節點組成，包括輸入層、輸出層以及一層或多層位於兩者之間的「隱藏層」。\n\n然而，LLM 能力實現質的飛躍，其真正的技術突破在於 2017 年被提出的 Transformer 架構。在 Transformer 出現之前，主流的序列處理模型（如循環神經網絡 RNN）必須按順序逐字處理文本，這極大地限制了訓練速度和處理長文本的能力。Transformer 架構則引入了並行處理機制，可以同時分析整個輸入序列，從而能夠利用現代 GPU 的強大並行計算能力，大幅縮短訓練時間。\n\nTransformer 架構的核心是其獨創的「自注意力機制」（Self-Attention Mechanism）。這個機制使得模型在處理序列中的某個單詞時，能夠權衡輸入文本中所有其他單詞對該單詞的重要性，並給予不同的「注意力」權重。這讓模型能夠捕捉到詞語之間複雜的、長距離的依賴關係，從而更深刻地理解上下文。例如，在句子「貓咪追著老鼠，因为它饿了」中，自注意力機制能幫助模型準確地將代詞「它」與主語「貓咪」聯繫起來，而不是「老鼠」。\n\n為了讓神經網絡能夠處理語言，LLM 採用了「詞嵌入」（Word Embeddings）技術來表示單詞。傳統的機器學習方法可能使用孤立的數字來代表每個詞，無法表達詞語間的語義關係。詞嵌入則將每個單詞映射到一個高維的向量空間中。在這個空間裡，意思或用法相近的詞語（例如「國王」與「女王」，或「走路」與「奔跑」）在向量上的距離會更近。這種表示方式使得模型能夠捕捉到單詞之間細微的語義和句法關係，為理解複雜語言奠定了數學基礎。\n\n這種從順序處理到並行處理的範式轉移，是近年來 AI 發展突然加速的根本原因。它使得在海量數據上訓練具有數千億參數的超大規模模型成為可能，最終催生了具備強大能力的 ChatGPT。' :
          'The building blocks of LLM are artificial neural networks, which are computational models that mimic the way neurons in biological brains interconnect and transmit signals.',
        keyPoints: isZhHK ? [
          '神經網絡：模仿生物大腦的計算模型，包含多層節點',
          'Transformer：2017年提出的革命性架構，支援並行處理',
          '自注意力機制：權衡詞語間重要性，捕捉長距離依賴關係',
          '詞嵌入技術：將單詞映射到高維向量空間表示語義關係',
          '並行處理：從順序到並行的範式轉移，加速AI發展'
        ] : [
          'Neural Networks: computational models mimicking biological brains with multi-layer nodes',
          'Transformer: revolutionary 2017 architecture supporting parallel processing',
          'Self-Attention: weighs word importance, captures long-distance dependencies',
          'Word Embeddings: maps words to high-dimensional vector space for semantic relations',
          'Parallel Processing: paradigm shift from sequential to parallel, accelerating AI development'
        ]
      },
      nextUnit: 3,
      nextTheme: null,
      completed: false
    },

    '3': {
      id: 3,
      themeId: 1,
      title: isZhHK ? '單元 1.3：GPT 的意義：生成式、預訓練、變壓器 (Generative, Pre-trained, Transformer)' : 'Unit 1.3: GPT Meaning: Generative, Pre-trained, Transformer',
      duration: '10分鐘',
      type: 'text' as const,
      description: isZhHK ? '解析ChatGPT核心技術的三大要素，理解其架構、訓練方法和核心功能的深層含義。' : 'Analyze the three core elements of ChatGPT technology, understanding the deep meaning of its architecture, training methods, and core functions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT 的核心技術可以從其全稱 GPT（Generative Pre-trained Transformer）中得到精確的解釋。這三個詞揭示了其架構、訓練方法和核心功能。\n\n變壓器 (Transformer)：這指明了其底層的技術架構，即前一節所詳述的、基於自注意力機制的 Transformer 模型。\n\n預訓練 (Pre-trained)：這是 GPT 模型訓練方法的第一個、也是最關鍵的階段。在這個階段，模型會進行所謂的「無監督學習」，消化來自互聯網、書籍、文章等海量的、未經標註的文本數據。其核心學習任務非常簡單：根據一段文本的上文，預測下一個最有可能出現的單詞或字符。通過在數以萬億計的句子上重複這個過程，模型不僅學會了語法規則和詞彙知識，還內化了大量的世界常識、語義關係，甚至初步的推理模式。這個階段為模型打下了一個廣博的知識基礎。\n\n生成式 (Generative)：這個詞描述了模型最核心的能力——創造（生成）全新的、原創的內容。這與另一類被稱為「判別式模型」（Discriminative Models）的 AI 形成對比。判別式模型（如用於文本分類的 BERT）的主要任務是進行分類或判斷，例如判斷一封郵件是否為垃圾郵件。而生成式模型則能夠從零開始創作，生成全新的句子、段落、代碼，甚至是圖像和音樂。\n\n在完成大規模的「預訓練」之後，模型通常會進入第二個訓練階段——「微調」（Fine-tuning）。在這個階段，開發者會使用一個規模小得多、但帶有特定任務標籤的數據集來進一步訓練模型。更重要的是，OpenAI 引入了「來自人類反饋的強化學習」（Reinforcement Learning from Human Feedback, RLHF）技術。在這個過程中，人類訓練員會對模型的不同回答進行評分和排序，模型則根據這些反饋來調整其行為，使其輸出更符合人類的期望，例如更準確地遵循指令、減少有害或帶有偏見的內容。' :
          'The core technology of ChatGPT can be precisely explained through its full name GPT (Generative Pre-trained Transformer). These three words reveal its architecture, training methods, and core functions.',
        keyPoints: isZhHK ? [
          'Transformer：基於自注意力機制的底層技術架構',
          '預訓練：無監督學習海量文本，預測下一個詞語',
          '生成式：創造全新原創內容，區別於判別式模型',
          '微調階段：使用特定任務數據集進一步優化',
          'RLHF：人類反饋強化學習，使輸出符合人類期望'
        ] : [
          'Transformer: underlying technical architecture based on self-attention mechanism',
          'Pre-trained: unsupervised learning on massive text, predicting next words',
          'Generative: creating new original content, different from discriminative models',
          'Fine-tuning stage: further optimisation using task-specific datasets',
          'RLHF: Reinforcement Learning from Human Feedback to align with human expectations'
        ]
      },
      nextUnit: 4,
      nextTheme: null,
      completed: false
    },

    '4': {
      id: 4,
      themeId: 1,
      title: isZhHK ? '單元 1.4：從 GPT-1 到 GPT-4o：模型的演進之路' : 'Unit 1.4: From GPT-1 to GPT-4o: The Evolution Path of Models',
      duration: '14分鐘',
      type: 'text' as const,
      description: isZhHK ? '追溯GPT模型的發展歷程，了解每一代模型的技術突破和能力提升的關鍵節點。' : 'Trace the development history of GPT models, understanding the technical breakthroughs and key capability improvements of each generation.',
      content: {
        transcript: isZhHK ? 
          'GPT 模型的發展歷程清晰地展示了 OpenAI 的技術演進路徑，每一代模型都在規模和能力上實現了顯著的飛躍。這條路徑不僅是技術的自然延伸，也反映了 OpenAI 的產品化戰略：首先建立一個知識淵博的「大腦」，然後教它「聽懂指令」，最後賦予它與世界多維度互動的「感官」。\n\nGPT-1 (2018)：作為開創者，GPT-1 首次成功地將 Transformer 架構應用於生成式預訓練任務。它擁有 1.17 億個參數，在當時的多個自然語言處理基準測試中取得了優異成績，驗證了這條技術路線的可行性。\n\nGPT-2 (2019)：參數規模和訓練數據量大幅提升，展現了令人驚訝的「零樣本學習」（Zero-shot learning）能力。這意味著它可以在沒有任何特定任務範例的情況下，僅憑指令就完成一些新任務，顯示出更強的泛化能力。\n\nGPT-3 (2020)：這是一個里程碑式的模型，擁有 1750 億個參數。其最顯著的突破是強大的「少樣本學習」（Few-shot learning）能力，即只需在提示中給出極少數（幾個）範例，模型就能迅速掌握新任務的模式並舉一反三。\n\nInstructGPT (2022)：與其說這是下一代模型，不如說是一次方向性的轉變。OpenAI 發現，僅僅「博學」的模型並不總是「有用」或「安全」。InstructGPT 重點引入了 RLHF 訓練方法，旨在解決 AI 的「對齊」（Alignment）問題，即使模型的行為和輸出更符合人類的意圖和價值觀。這使得模型極大地提升了遵循用戶指令的能力，為 ChatGPT 的誕生奠定了關鍵基礎。\n\nGPT-4 (2023)：GPT-4 不僅在語言理解、邏輯推理和準確性上相比 GPT-3.5 有了質的飛躍，更重要的是，它成為了一個「多模態」（multimodal）模型。它首次具備了處理文本以外信息的能力，能夠接收和理解圖像輸入，例如解釋一張圖表的內容或描述一張照片的場景。\n\nGPT-4o (2024)：o 代表 "omni"（全能），標誌著 OpenAI 在多模態交互上的又一重大突破。GPT-4o 是首個在單一神經網絡模型中原生整合了文本、音訊和視覺處理能力的模型。這使得它能夠實現近乎即時的、極其自然的實時語音對話，並能同時理解用戶的語音和攝像頭捕捉到的視覺信息，極大地拉近了 AI 交互與人類自然溝通的距離。' :
          'The development history of GPT models clearly demonstrates OpenAI\'s technical evolution path, with each generation achieving significant leaps in scale and capabilities.',
        keyPoints: isZhHK ? [
          'GPT-1 (2018)：開創者，首次將Transformer應用於生成式預訓練',
          'GPT-2 (2019)：展現零樣本學習能力，提升泛化性能',
          'GPT-3 (2020)：1750億參數里程碑，強大少樣本學習能力',
          'InstructGPT (2022)：引入RLHF，解決AI對齊問題',
          'GPT-4 (2023)：多模態突破，支援圖像理解',
          'GPT-4o (2024)：全能型模型，原生整合文本、音訊、視覺'
        ] : [
          'GPT-1 (2018): Pioneer, first to apply Transformer to generative pre-training',
          'GPT-2 (2019): Demonstrated zero-shot learning, improved generalization',
          'GPT-3 (2020): 175B parameter milestone, powerful few-shot learning',
          'InstructGPT (2022): Introduced RLHF, solved AI alignment problem',
          'GPT-4 (2023): Multimodal breakthrough, supports image understanding',
          'GPT-4o (2024): Omni model, natively integrates text, audio, visual'
        ]
      },
      nextUnit: 5,
      nextTheme: null,
      completed: false
    },

    '5': {
      id: 5,
      themeId: 1,
      title: isZhHK ? '單元 1.5：OpenAI 簡史：ChatGPT 的創造者' : 'Unit 1.5: Brief History of OpenAI: The Creator of ChatGPT',
      duration: '13分鐘',
      type: 'text' as const,
      description: isZhHK ? '了解OpenAI從非營利研究實驗室到AI巨頭的轉型歷程，以及關鍵人物和戰略決策。' : 'Understand OpenAI\'s transformation from a non-profit research lab to an AI giant, including key figures and strategic decisions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT 的橫空出世，讓其背後的開發機構 OpenAI 從一個在人工智能研究領域備受尊敬的名字，一躍成為全球科技界的焦點和家喻戶曉的品牌。\n\n創立與初衷 (2015)：OpenAI 於 2015 年由一群科技界的遠見者共同創立，其中包括 Sam Altman、Elon Musk、Greg Brockman 和 Ilya Sutskever 等人。其最初的形態是一個非營利研究實驗室，懷抱著一個宏大的使命：確保通用人工智能（Artificial General Intelligence, AGI）的發展能夠安全、負責任地造福全人類，而不是被少數巨頭壟斷或對人類構成威脅。\n\n轉型與微軟的戰略合作：隨著研究的深入，OpenAI 意識到訓練頂尖大型語言模型需要極其龐大的計算資源和資金投入，這遠非一個非營利組織所能負擔。為了應對這一挑戰，OpenAI 在 2019 年進行了結構重組，成立了一家名為 OpenAI LP 的「利潤上限」（capped-profit）公司。這一獨特的結構旨在平衡其追求科研使命與吸引商業投資的需求。同年，微軟向 OpenAI 進行了 10 億美元的初始投資，並在隨後的幾年裡追加了數十億美元，成為其最重要的戰略合作夥伴，為其提供了所需的 Azure 雲計算資源。\n\n關鍵人物：公司的靈魂人物是其聯合創始人兼行政總裁 Sam Altman。在執掌 OpenAI 之前，Altman 以其作為著名初創企業孵化器 Y Combinator 總裁的經歷而聞名，成功孵化了 Airbnb、Reddit 等眾多知名企業。他憑藉其在科技界的影響力和卓越的領導力，帶領 OpenAI 從一個研究機構轉型為估值數百億美元的 AI 巨頭。另一位備受關注的創始人 Elon Musk 則因對公司發展方向和安全問題的擔憂，於 2018 年離開了 OpenAI 董事會，並在之後創立了自己的 AI 公司 xAI。\n\nChatGPT 的引爆點 (2022)：儘管 OpenAI 在此之前已經發布了多個版本的 GPT 模型，並在學術界和開發者社區中享有盛譽，但真正讓其突破圈層、引發全球性關注的，是 2022 年 11 月發布的 ChatGPT。其極其易用的對話界面和強大的能力，迅速吸引了數以億計的用戶，引爆了全球範圍內的生成式 AI 熱潮，並促使 Google、Meta 等科技巨頭紛紛加速推出自己的競品。' :
          'The emergence of ChatGPT has transformed OpenAI from a respected name in AI research into a global tech focus and household brand.',
        keyPoints: isZhHK ? [
          '創立初衷 (2015)：非營利研究實驗室，確保AGI安全造福人類',
          '戰略轉型 (2019)：重組為利潤上限公司，平衡使命與投資',
          '微軟合作：10億美元初始投資，提供Azure雲計算資源',
          '關鍵人物：Sam Altman (CEO)、Elon Musk (已離開)、Ilya Sutskever',
          'ChatGPT引爆點 (2022)：突破圈層，引發全球生成式AI熱潮',
          '行業影響：促使Google、Meta等巨頭加速推出競品'
        ] : [
          'Founding mission (2015): Non-profit research lab ensuring AGI safely benefits humanity',
          'Strategic transformation (2019): Restructured as capped-profit company balancing mission and investment',
          'Microsoft partnership: $1B initial investment, providing Azure cloud computing resources',
          'Key figures: Sam Altman (CEO), Elon Musk (departed), Ilya Sutskever',
          'ChatGPT breakthrough (2022): Breaking barriers, triggering global generative AI boom',
          'Industry impact: Prompting Google, Meta and other giants to accelerate their competing products'
        ]
      },
      nextUnit: 6,
      nextTheme: 2,
      completed: false
    },

    // 第二章：初探門徑 — 帳戶設定與介面導覽
    '6': {
      id: 6,
      themeId: 2,
      title: isZhHK ? '單元 2.1：主介面深度導覽：對話視窗、歷史紀錄 (History) 與設定區' : 'Unit 2.1: Main Interface Deep Tour: Chat Window, History & Settings',
      duration: '12分鐘',
      type: 'text' as const,
      description: isZhHK ? '詳細介紹 ChatGPT 主介面的各個元素，包括對話視窗操作、歷史紀錄管理和設定區功能。' : 'Detailed introduction to ChatGPT main interface elements, including chat window operations, history management, and settings functionality.',
      content: {
        transcript: isZhHK ? 
          '當您首次登入 ChatGPT 時，您會看到一個簡潔而功能豐富的主介面。理解這個介面的每個元素將幫助您更有效地使用 ChatGPT。\n\n對話視窗是整個介面的核心，位於螢幕中央。這裡是您與 ChatGPT 進行對話的主要區域。在對話視窗的底部，您會找到文字輸入框，這是您輸入問題或指令的地方。輸入框支援多行文字，您可以按 Shift+Enter 來換行，而單純按 Enter 則會送出訊息。\n\n左側邊欄包含您的對話歷史紀錄。每次開始新對話時，ChatGPT 都會自動創建一個新的對話條目。這些對話會按時間順序排列，最新的對話顯示在最上方。您可以點擊任何一個歷史對話來重新打開它，繼續之前的討論。\n\n在左側邊欄的頂部，您會看到「New Chat」按鈕，點擊它可以開始全新的對話。記住，每個對話都是獨立的 - ChatGPT 不會記住其他對話中的內容。\n\n右上角的個人資料區域提供對您帳戶的存取。這裡您可以管理訂閱、查看使用情況，以及存取重要設定。對於 ChatGPT Plus 用戶，這裡還會顯示您的訂閱狀態和可用的高階功能。' :
          'When you first log into ChatGPT, you\'ll see a clean yet feature-rich main interface. Understanding each element of this interface will help you use ChatGPT more effectively.',
        keyPoints: isZhHK ? [
          '對話視窗：介面核心，進行 AI 對話的主要區域',
          '文字輸入框：支援多行輸入，Shift+Enter換行，Enter送出',
          '歷史紀錄：左側邊欄顯示所有對話，按時間排序',
          'New Chat 按鈕：開始全新獨立對話',
          '個人資料區：管理帳戶、訂閱和設定'
        ] : [
          'Chat Window: Interface core, main area for AI conversations',
          'Text Input Box: Supports multi-line input, Shift+Enter for new line, Enter to send',
          'History Records: Left sidebar shows all conversations, sorted by time',
          'New Chat Button: Start fresh independent conversations',
          'Profile Area: Manage account, subscription and settings'
        ]
      },
      nextUnit: 7,
      nextTheme: null,
      completed: false
    },

    '7': {
      id: 7,
      themeId: 2,
      title: isZhHK ? '單元 2.2：對話管理技巧：如何有效命名 (Rename)、分享 (Share) 與刪除 (Delete) 對話' : 'Unit 2.2: Conversation Management: Rename, Share & Delete Conversations',
      duration: '10分鐘',
      type: 'text' as const,
      description: isZhHK ? '學習如何有效管理您的 ChatGPT 對話，包括重新命名、分享連結和刪除不需要的對話。' : 'Learn how to effectively manage your ChatGPT conversations, including renaming, sharing links, and deleting unnecessary conversations.',
      content: {
        transcript: isZhHK ? 
          '有效的對話管理是提升 ChatGPT 使用體驗的關鍵。隨著您使用 ChatGPT 的時間增長，您會累積大量的對話記錄。學會管理這些對話將幫助您快速找到需要的資訊。\n\n重新命名對話是組織對話的第一步。預設情況下，ChatGPT 會根據對話的開頭幾句話自動命名對話。但是，您可以給對話取更有意義的名稱。要重新命名對話，只需將滑鼠懸停在左側邊欄的對話標題上，點擊出現的編輯圖示，然後輸入新的名稱。好的命名策略包括：使用專案名稱、主題關鍵字，或者日期標記。\n\n分享對話功能讓您可以與他人分享您的 ChatGPT 對話。這對於團隊協作、教學，或展示 AI 如何解決特定問題非常有用。要分享對話，點擊對話旁的分享圖示，ChatGPT 會生成一個公開連結。重要提醒：分享的對話將變成公開可見，任何擁有連結的人都可以查看，因此請確保不要分享包含敏感資訊的對話。\n\n刪除對話功能幫助您保持對話列表的整潔。要刪除對話，點擊對話旁的刪除圖示。請注意，一旦刪除對話，該操作無法撤銷，所有對話內容將永久消失。因此，在刪除重要對話之前，請三思而後行。\n\n建議的管理策略：為重要專案建立專門的對話並給予清晰的命名；定期清理測試性或臨時性的對話；將有價值的對話收藏或匯出重要內容。' :
          'Effective conversation management is key to enhancing your ChatGPT experience. As you use ChatGPT longer, you\'ll accumulate many conversation records.',
        keyPoints: isZhHK ? [
          '重新命名：使用專案名稱、主題關鍵字或日期標記',
          '分享功能：生成公開連結，適合團隊協作和教學',
          '注意隱私：分享的對話變成公開可見，避免敏感資訊',
          '刪除管理：操作無法撤銷，刪除前請三思',
          '管理策略：專門命名、定期清理、收藏重要內容'
        ] : [
          'Renaming: Use project names, topic keywords, or date markers',
          'Share Function: Generate public links, suitable for team collaboration and teaching',
          'Privacy Note: Shared conversations become publicly visible, avoid sensitive information',
          'Delete Management: Operation cannot be undone, think carefully before deleting',
          'Management Strategy: Dedicated naming, regular cleanup, bookmark important content'
        ]
      },
      nextUnit: 8,
      nextTheme: null,
      completed: false
    },

    '8': {
      id: 8,
      themeId: 2,
      title: isZhHK ? '單元 2.3：Custom Instructions (自訂指令)：打造你的個人化 AI 助教，讓每次回答更貼心' : 'Unit 2.3: Custom Instructions: Create Your Personal AI Assistant',
      duration: '15分鐘',
      type: 'text' as const,
      description: isZhHK ? '學習如何設定自訂指令，讓 ChatGPT 更了解您的需求和偏好，提供更個人化的回答。' : 'Learn how to set up custom instructions to make ChatGPT better understand your needs and preferences for more personalized responses.',
      content: {
        transcript: isZhHK ? 
          'Custom Instructions（自訂指令）是 ChatGPT Plus 用戶可使用的強大功能，它允許您為所有新對話設定預設的背景資訊和回答偏好。這個功能就像是給 ChatGPT 一份「使用手冊」，告訴它您是誰、您的工作性質，以及您希望它如何回答問題。\n\n設定自訂指令分為兩個主要部分：「關於您」和「您希望 ChatGPT 如何回應」。\n\n在「關於您」的部分，您可以提供個人背景資訊。例如：您的職業（「我是一名軟體工程師」）、專業領域（「專精於機器學習」）、當前專案（「正在開發一個電商平台」）、學習目標（「想要學習 Python 程式設計」）等。這些資訊幫助 ChatGPT 理解您的身份和需求。\n\n在「您希望 ChatGPT 如何回應」的部分，您可以設定回答的風格和格式偏好。例如：「請用繁體中文回答」、「回答要簡潔明瞭，不超過 200 字」、「在回答技術問題時，請提供實際的程式碼範例」、「使用友善但專業的語調」等。\n\n有效的自訂指令範例：\n對於學生：「我是資訊工程系二年級學生，正在學習資料結構與演算法。請用淺顯易懂的方式解釋概念，並提供 Python 程式碼範例。」\n對於專業人士：「我是產品經理，負責 B2B SaaS 產品。在討論商業策略時，請著重於實際執行性和投資報酬率分析。」\n\n記住，一旦設定了自訂指令，它會套用到所有新的對話中，但不會影響現有的對話。您可以隨時修改或停用這些指令。' :
          'Custom Instructions is a powerful feature available to ChatGPT Plus users, allowing you to set default background information and response preferences for all new conversations.',
        keyPoints: isZhHK ? [
          '兩大設定：「關於您」提供個人背景，「回應偏好」設定風格',
          '個人背景：職業、專業領域、當前專案、學習目標',
          '回應偏好：語言、長度、格式、語調等設定',
          '實際應用：為學生、專業人士等不同角色客製化',
          '使用範圍：僅套用到新對話，可隨時修改或停用'
        ] : [
          'Two Settings: "About You" provides personal background, "Response Preferences" sets style',
          'Personal Background: Profession, expertise, current projects, learning goals',
          'Response Preferences: Language, length, format, tone settings',
          'Practical Application: Customised for different roles like students, professionals',
          'Usage Scope: Only applies to new conversations, can be modified or disabled anytime'
        ]
      },
      nextUnit: 9,
      nextTheme: null,
      completed: false
    },

    '9': {
      id: 9,
      themeId: 2,
      title: isZhHK ? '單元 2.4：手機 App 獨有功能：語音對話與圖像辨識實戰' : 'Unit 2.4: Mobile App Exclusive Features: Voice Chat & Image Recognition',
      duration: '13分鐘',
      type: 'text' as const,
      description: isZhHK ? '探索 ChatGPT 手機應用程式的獨特功能，包括語音對話和圖像辨識，提升行動裝置使用體驗。' : 'Explore the unique features of ChatGPT mobile app, including voice conversations and image recognition, enhancing mobile device user experience.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT 手機應用程式提供了網頁版本沒有的獨特功能，讓您可以更自然、更便利地與 AI 互動。這些功能特別適合在移動中使用，或當您需要更即時、更直觀的交流方式時。\n\n語音對話功能是手機 App 的亮點之一。這個功能讓您可以直接與 ChatGPT 進行語音對話，就像與真人聊天一樣。要使用語音功能，只需點擊訊息輸入框旁的麥克風圖示，然後開始說話。ChatGPT 會將您的語音轉換成文字，處理後再以語音回應您。\n\n語音對話的優勢包括：解放雙手，適合駕駛或運動時使用；更自然的交流方式，特別適合練習語言或進行創意發想；提高效率，說話通常比打字更快；多語言支援，可以練習不同語言的發音和對話。\n\n圖像辨識功能讓您可以上傳照片並讓 ChatGPT 分析和描述圖像內容。這個功能在很多實際場景中都非常有用：識別植物、動物或物品；解讀圖表、文件或手寫筆記；分析藝術作品或建築；協助視覺障礙用戶理解圖像內容。\n\n要使用圖像功能，點擊訊息輸入框旁的相機圖示，然後選擇拍照或從相簿選擇照片。上傳後，您可以詢問 ChatGPT 關於圖像的任何問題，例如「這是什麼植物？」或「請描述這張圖片的內容」。\n\n使用技巧：確保照片清晰，避免模糊或光線不足；提供具體的問題，而不是只是「這是什麼？」；對於複雜圖像，可以指出您想了解的特定部分；利用圖像功能學習新知識，例如識別建築風格或藝術流派。' :
          'The ChatGPT mobile app provides unique features not available in the web version, allowing for more natural and convenient AI interaction.',
        keyPoints: isZhHK ? [
          '語音對話：麥克風圖示啟動，語音轉文字再語音回應',
          '語音優勢：解放雙手、自然交流、提高效率、多語言支援',
          '圖像辨識：上傳照片讓 ChatGPT 分析和描述內容',
          '實用場景：識別物品、解讀文件、分析藝術、輔助視障',
          '使用技巧：清晰照片、具體問題、指定部分、學習應用'
        ] : [
          'Voice Chat: Microphone icon activation, speech-to-text then voice response',
          'Voice Advantages: Hands-free, natural communication, efficiency boost, multilingual support',
          'Image Recognition: Upload photos for ChatGPT to analyze and describe content',
          'Practical Scenarios: Object identification, document interpretation, art analysis, accessibility aid',
          'Usage Tips: Clear photos, specific questions, designated parts, learning applications'
        ]
      },
      nextUnit: 10,
      nextTheme: null,
      completed: false
    },

    '10': {
      id: 10,
      themeId: 2,
      title: isZhHK ? '單元 2.5：探索 GPT Store：如何尋找、評估及使用別人建立的優秀 GPTs' : 'Unit 2.5: Exploring GPT Store: Finding, Evaluating & Using GPTs',
      duration: '14分鐘',
      type: 'text' as const,
      description: isZhHK ? '深入了解 GPT Store 的使用方法，學會如何找到適合的自訂 GPT，並有效評估和使用它們。' : 'Deep dive into GPT Store usage, learn how to find suitable custom GPTs and effectively evaluate and use them.',
      content: {
        transcript: isZhHK ? 
          'GPT Store 是 OpenAI 推出的一個市集平台，類似於手機的 App Store，但專門用於分享和發現自訂的 GPT 應用程式。這個平台讓全世界的開發者和創作者可以建立專門化的 AI 助手，並與其他用戶分享。\n\n要進入 GPT Store，您需要是 ChatGPT Plus 訂閱用戶。在 ChatGPT 介面中，點擊左上角的「Explore GPTs」或在新對話中選擇「GPT Store」選項。進入後，您會看到各種分類的 GPT，包括：生產力工具、教育助手、創意寫作、程式設計、語言學習等。\n\n尋找適合的 GPT 有幾個策略：\n\n使用搜尋功能：直接搜尋關鍵字，例如「Python 程式設計」、「簡歷撰寫」或「語言翻譯」。\n\n瀏覽分類：GPT Store 將 GPT 分為不同類別，您可以根據需求瀏覽相應分類。\n\n查看熱門和推薦：平台會推薦熱門和高品質的 GPT，這些通常是經過驗證的優秀應用。\n\n評估 GPT 品質的關鍵指標：\n\n用戶評分和評論：查看其他用戶的評價和使用經驗。\n\n開發者資訊：了解創建者的背景和專業程度。\n\n功能描述：仔細閱讀 GPT 的功能說明和使用案例。\n\n更新頻率：定期更新的 GPT 通常維護得更好。\n\n使用 GPT 的最佳實踐：\n\n先閱讀使用說明：每個 GPT 都有特定的使用方法和指令格式。\n\n測試基本功能：先用簡單的問題測試 GPT 的響應品質。\n\n了解限制：每個 GPT 都有其專長領域和限制，了解這些有助於更好地使用。\n\n提供清晰指令：就像使用標準 ChatGPT 一樣，清晰的指令會產生更好的結果。' :
          'GPT Store is a marketplace platform launched by OpenAI, similar to a mobile App Store, but specifically for sharing and discovering custom GPT applications.',
        keyPoints: isZhHK ? [
          'GPT Store：OpenAI 市集平台，需 ChatGPT Plus 訂閱',
          '尋找策略：搜尋關鍵字、瀏覽分類、查看熱門推薦',
          '評估指標：用戶評分、開發者資訊、功能描述、更新頻率',
          '使用實踐：閱讀說明、測試功能、了解限制、清晰指令',
          '分類範例：生產力、教育、創意、程式設計、語言學習'
        ] : [
          'GPT Store: OpenAI marketplace platform, requires ChatGPT Plus subscription',
          'Finding Strategies: Search keywords, browse categories, check popular recommendations',
          'Evaluation Criteria: User ratings, developer info, feature description, update frequency',
          'Usage Practices: Read instructions, test functions, understand limitations, clear commands',
          'Category Examples: Productivity, education, creativity, programming, language learning'
        ]
      },
      nextUnit: 11,
      nextTheme: 3,
      completed: false
    },

    // 第三主題：指令的藝術 (Prompt Engineering)
    '11': {
      id: 11,
      themeId: 3,
      title: isZhHK ? '單元 3.1：優質指令的四大基石：角色 (Role)、任務 (Task)、脈絡 (Context)、格式 (Format)' : 'Unit 3.1: Four Pillars of Quality Prompts: Role, Task, Context, Format',
      duration: '32分鐘',
      type: 'interactive' as const,
      description: isZhHK ? '學習構建高效提示詞的四大核心要素，建立系統性的 Prompt 設計框架。' : 'Learn the four core elements for building effective prompts and establish a systematic prompt design framework.',
      content: {
        transcript: isZhHK ? 
          '優質的 Prompt 設計有四個核心基石：角色 (Role)、任務 (Task)、脈絡 (Context) 和格式 (Format)，簡稱 RTCF 框架。\n\n**角色 (Role)**：明確定義 ChatGPT 應該扮演的角色和身份。例如：「你是一位資深的市場營銷專家」、「作為一名經驗豐富的程式設計師」或「扮演一位耐心的英語老師」。角色設定幫助 AI 以特定的專業視角和語調來回應。\n\n**任務 (Task)**：清楚說明你希望 AI 完成的具體任務。任務描述應該具體、明確，避免模糊的表達。例如：「幫我撰寫一份產品發布會的新聞稿」而非「幫我寫點東西」。\n\n**脈絡 (Context)**：提供相關的背景資訊、約束條件和具體要求。這包括目標受眾、使用場景、特殊要求等。例如：「這份新聞稿將發送給科技媒體，重點強調產品的創新性，字數控制在 500 字以內」。\n\n**格式 (Format)**：指定期望的輸出格式和結構。例如：「請以項目清單的形式」、「用表格形式整理」或「分為三個段落，每段不超過 100 字」。\n\n實例對比：\n\n**差的 Prompt**：「幫我寫個計劃」\n\n**好的 Prompt**：\n- **角色**：作為一位專業的項目管理顧問\n- **任務**：為我制定一個為期 3 個月的團隊技能提升計劃\n- **脈絡**：針對 10 人的軟體開發團隊，重點提升前端開發和用戶體驗設計能力，預算限制在 50,000 元內\n- **格式**：請以時間軸形式呈現，包含具體的培訓內容、時間安排和預算分配' :
          'Quality Prompt design has four core pillars: Role, Task, Context, and Format, known as the RTCF framework.',
        keyPoints: isZhHK ? [
          '角色 (Role)：明確定義 AI 應扮演的身份和專業視角',
          '任務 (Task)：清楚說明希望完成的具體任務',
          '脈絡 (Context)：提供背景資訊、約束條件和具體要求',
          '格式 (Format)：指定期望的輸出格式和結構',
          'RTCF 框架：系統性的 Prompt 設計方法'
        ] : [
          'Role: Clearly define the identity and professional perspective AI should take',
          'Task: Clearly explain the specific task to be completed',
          'Context: Provide background information, constraints and specific requirements',
          'Format: Specify expected output format and structure',
          'RTCF Framework: Systematic prompt design methodology'
        ]
      },
      nextUnit: 12,
      nextTheme: null,
      completed: false
    },

    '12': {
      id: 12,
      themeId: 3,
      title: isZhHK ? '單元 3.2：角色扮演法：讓 ChatGPT 成為你的私人律師、程式設計師或行銷專家' : 'Unit 3.2: Role-Playing Method: Make ChatGPT Your Personal Expert',
      duration: '28分鐘',
      type: 'interactive' as const,
      description: isZhHK ? '掌握角色設定技巧，讓 ChatGPT 以專業身份提供更精準的建議和解答。' : 'Master role-setting techniques to make ChatGPT provide more precise advice as a professional.',
      content: {
        transcript: isZhHK ? 
          '角色扮演是讓 ChatGPT 發揮專業能力的關鍵技巧。通過設定具體的角色，AI 會以該專業的視角、知識和語言風格來回應你的問題。\n\n**有效的角色設定要素：**\n\n1. **專業背景**：明確指出專業領域和經驗水平\n   - 「作為一位有 10 年經驗的心理治療師」\n   - 「以資深財務分析師的身份」\n\n2. **性格特質**：描述溝通風格和個性特點\n   - 「耐心且善於解釋複雜概念」\n   - 「直接且注重實用性」\n\n3. **工作方式**：說明處理問題的方法\n   - 「總是提供具體的步驟和範例」\n   - 「喜歡用類比來解釋抽象概念」\n\n**實用角色範例：**\n\n**商業顧問角色**：\n「你是一位經驗豐富的商業策略顧問，擅長幫助中小企業解決營運問題。你的回答總是結構清晰，會先分析問題，然後提供 2-3 個具體的解決方案，並評估每個方案的優缺點。」\n\n**程式設計導師角色**：\n「你是一位資深的軟體工程師和編程導師，專精於 Python 和網頁開發。你解釋程式碼時會由淺入深，先說明整體概念，再逐步解析細節，並會主動指出常見的錯誤和最佳實踐。」\n\n**創意寫作教練角色**：\n「你是一位獲獎的創意寫作教練，擅長激發靈感和改善文章結構。你會先了解寫作目的和目標讀者，然後提供具體的改進建議，並解釋每個建議背後的寫作原理。」' :
          'Role-playing is a key technique for unleashing ChatGPT\'s professional capabilities. By setting specific roles, AI will respond with that professional\'s perspective, knowledge, and communication style.',
        keyPoints: isZhHK ? [
          '專業背景：明確指出領域和經驗水平',
          '性格特質：描述溝通風格和個性特點',
          '工作方式：說明處理問題的方法',
          '角色一致性：確保整個對話中保持角色設定',
          '細節豐富：越具體的角色設定效果越好'
        ] : [
          'Professional Background: Clearly specify field and experience level',
          'Personality Traits: Describe communication style and characteristics',
          'Working Methods: Explain problem-solving approaches',
          'Role Consistency: Maintain role setting throughout conversation',
          'Rich Details: More specific role settings yield better results'
        ]
      },
      nextUnit: 13,
      nextTheme: null,
      completed: false
    },

    '13': {
      id: 13,
      themeId: 3,
      title: isZhHK ? '單元 3.3：範例引導法 (Few-Shot Prompting)：給予 AI 範例，讓它模仿你的風格' : 'Unit 3.3: Few-Shot Prompting: Give AI Examples to Mimic Your Style',
      duration: '26分鐘',
      type: 'interactive' as const,
      description: isZhHK ? '學習使用範例來引導 AI 產生符合特定風格和格式的內容。' : 'Learn to use examples to guide AI in generating content that matches specific styles and formats.',
      content: {
        transcript: isZhHK ? 
          'Few-Shot Prompting 是一種強大的技巧，通過提供少量（通常 1-3 個）高質量的範例，來引導 ChatGPT 理解你期望的輸出風格、格式和品質。\n\n**Few-Shot Prompting 的工作原理：**\n\nAI 模型擅長模式識別。當你提供具體範例時，模型會分析範例中的模式、結構、語調和內容特點，然後在新的情境中重現這些模式。\n\n**有效範例的特徵：**\n\n1. **代表性**：範例應該完全體現你想要的輸出特點\n2. **多樣性**：如果提供多個範例，應涵蓋不同情況\n3. **完整性**：範例應該是完整的，包含所有重要元素\n4. **清晰性**：範例的格式和結構要清楚易懂\n\n**實際應用範例：**\n\n**郵件寫作範例：**\n「請根據以下範例的風格和格式，為我寫一封客戶跟進郵件：\n\n範例：\n主旨：關於您的產品諮詢 - 後續討論\n\n親愛的張先生，\n\n感謝您昨天抽空與我討論貴公司的數位轉型需求。根據我們的談話，我整理了以下重點：\n\n• 目前挑戰：手動流程效率低下\n• 期望目標：自動化核心業務流程\n• 預算範圍：50-100萬元\n\n我們的解決方案可以幫助您：\n1. 減少 70% 的手動作業時間\n2. 提升數據準確性\n3. 降低長期營運成本\n\n建議下週安排具體的產品展示，您看如何？\n\n最佳問候，\n李經理」\n\n現在請為我寫一封給王總監的跟進郵件，內容是關於培訓服務的討論。」' :
          'Few-Shot Prompting is a powerful technique that uses a small number (usually 1-3) of high-quality examples to guide ChatGPT in understanding your expected output style, format, and quality.',
        keyPoints: isZhHK ? [
          '模式識別：AI 通過分析範例來理解期望的輸出模式',
          '範例質量：代表性、多樣性、完整性、清晰性',
          '數量適中：通常 1-3 個範例最有效',
          '風格一致：範例應該體現一致的風格和標準',
          '格式規範：清楚的結構讓 AI 更容易模仿'
        ] : [
          'Pattern Recognition: AI understands expected output patterns by analyzing examples',
          'Example Quality: Representative, diverse, complete, clear',
          'Appropriate Quantity: Usually 1-3 examples work best',
          'Style Consistency: Examples should reflect consistent style and standards',
          'Format Standards: Clear structure makes it easier for AI to imitate'
        ]
      },
      nextUnit: 14,
      nextTheme: null,
      completed: false
    },

    '14': {
      id: 14,
      themeId: 3,
      title: isZhHK ? '單元 3.4：思維鏈技巧 (Chain of Thought)：引導 AI 一步步思考，解決複雜問題' : 'Unit 3.4: Chain of Thought: Guide AI to Think Step by Step',
      duration: '30分鐘',
      type: 'interactive' as const,
      description: isZhHK ? '掌握思維鏈技巧，引導 AI 進行邏輯推理和複雜問題解決。' : 'Master chain of thought techniques to guide AI in logical reasoning and complex problem solving.',
      content: {
        transcript: isZhHK ? 
          '思維鏈 (Chain of Thought) 是一種引導 AI 展示推理過程的技巧，特別適用於需要多步驟思考的複雜問題。\n\n**思維鏈的核心概念：**\n\n不要求 AI 直接給出最終答案，而是要求它展示思考過程，逐步分析問題、考慮各種因素，最後得出結論。這種方法能顯著提高複雜問題的解決質量。\n\n**觸發思維鏈的關鍵詞句：**\n\n• 「請一步步分析」\n• 「讓我們逐步思考這個問題」\n• 「首先...然後...最後...」\n• 「請展示你的推理過程」\n• 「分步驟解決這個問題」\n\n**思維鏈的應用場景：**\n\n1. **數學和邏輯問題**\n2. **商業決策分析**\n3. **問題診斷和解決**\n4. **複雜的規劃任務**\n5. **多因素考量的選擇**\n\n**實際應用範例：**\n\n**商業問題分析：**\n「我的網路商店銷量下降了 30%，請一步步分析可能的原因，並提出解決方案。請展示你的完整思考過程。」\n\nAI 的思維鏈回應會包含：\n1. 問題界定和數據分析\n2. 可能原因的分類（內部/外部因素）\n3. 每個原因的可能性評估\n4. 解決方案的制定\n5. 實施優先順序的排列\n\n**技術問題解決：**\n「我的網站載入速度很慢，請一步步診斷問題並提供優化建議。」\n\n這種方法讓 AI 像專業顧問一樣思考，提供更有邏輯性和說服力的答案。' :
          'Chain of Thought is a technique that guides AI to show its reasoning process, particularly useful for complex problems requiring multi-step thinking.',
        keyPoints: isZhHK ? [
          '逐步推理：要求 AI 展示完整的思考過程',
          '觸發詞句：「一步步分析」、「展示推理過程」',
          '適用場景：數學邏輯、商業決策、問題診斷、複雜規劃',
          '提高質量：顯著提升複雜問題的解決品質',
          '邏輯性強：讓 AI 像專業顧問一樣思考'
        ] : [
          'Step-by-step Reasoning: Require AI to show complete thinking process',
          'Trigger Phrases: "analyze step by step", "show reasoning process"',
          'Use Cases: Math logic, business decisions, problem diagnosis, complex planning',
          'Quality Improvement: Significantly enhances complex problem-solving quality',
          'Strong Logic: Makes AI think like professional consultants'
        ]
      },
      nextUnit: 15,
      nextTheme: null,
      completed: false
    },

    '15': {
      id: 15,
      themeId: 3,
      title: isZhHK ? '單元 3.5：迭代與追問：如何透過追問，從 60 分的答案優化到 95 分' : 'Unit 3.5: Iteration & Follow-up: Optimise from 60-point to 95-point Answers',
      duration: '24分鐘',
      type: 'interactive' as const,
      description: isZhHK ? '學習如何通過有效的追問和迭代來不斷優化 AI 的回答質量。' : 'Learn how to continuously optimise AI response quality through effective follow-up and iteration.',
      content: {
        transcript: isZhHK ? 
          '很少有 AI 能在第一次回應中就給出完美的答案。迭代和追問是將普通答案提升為優秀答案的關鍵技巧。\n\n**迭代優化的基本原理：**\n\n第一次的回應通常是一個良好的起點，但往往缺乏深度、具體性或針對性。通過系統性的追問，可以引導 AI 深入挖掘、完善細節、調整角度。\n\n**有效追問的策略：**\n\n1. **深度挖掘**：「請更詳細地解釋第三點」\n2. **具體化要求**：「請提供具體的數字和範例」\n3. **不同角度**：「從用戶的角度來看，還有什麼考慮？」\n4. **實用性強化**：「請給出可立即執行的具體步驟」\n5. **品質提升**：「請讓這個建議更加專業和具說服力」\n\n**迭代優化的實際流程：**\n\n**初始問題**：「我想提升團隊的工作效率，有什麼建議？」\n\n**第一次回應**：AI 給出一般性的建議清單\n\n**追問 1**：「請針對軟體開發團隊，提供更具體的效率提升方法」\n\n**追問 2**：「請為每個方法提供實施的具體步驟和預期效果」\n\n**追問 3**：「考慮到我們是 10 人的小團隊，預算有限，請調整這些建議」\n\n**追問 4**：「請提供一個 3 個月的實施時間表」\n\n**高級追問技巧：**\n\n• **角色轉換**：「如果你是我們的競爭對手，會如何看待這個策略？」\n• **情境模擬**：「如果預算減少 50%，你會如何調整建議？」\n• **質量檢驗**：「請批判性地分析這個方案的潛在缺點」\n• **創新要求**：「請提供一些別人不太會想到的創新方法」' :
          'Rarely can AI provide perfect answers in the first response. Iteration and follow-up are key techniques for elevating ordinary answers to excellent ones.',
        keyPoints: isZhHK ? [
          '迭代原理：第一次回應是起點，需要系統性追問優化',
          '追問策略：深度挖掘、具體化、不同角度、實用性、品質提升',
          '優化流程：初始問題→一般回應→具體追問→細節完善',
          '高級技巧：角色轉換、情境模擬、質量檢驗、創新要求',
          '效果顯著：從 60 分答案提升到 95 分專業水準'
        ] : [
          'Iteration Principle: First response is starting point, requires systematic follow-up optimization',
          'Follow-up Strategies: Deep digging, specification, different angles, practicality, quality enhancement',
          'Optimization Process: Initial question → General response → Specific follow-up → Detail refinement',
          'Advanced Techniques: Role switching, scenario simulation, quality testing, innovation requirements',
          'Significant Results: Elevate from 60-point answers to 95-point professional level'
        ]
      },
      nextUnit: 16,
      nextTheme: null,
      completed: false
    },

    '16': {
      id: 16,
      themeId: 3,
      title: isZhHK ? '單元 3.6：指令範本庫：提供 20+ 個常用高效指令範本，即學即用' : 'Unit 3.6: Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',
      duration: '18分鐘',
      type: 'resource' as const,
      description: isZhHK ? '獲得精心設計的提示詞範本庫，涵蓋各種常見使用場景。' : 'Access a carefully designed prompt template library covering various common use cases.',
      content: {
        transcript: isZhHK ? 
          '這裡提供 20+ 個經過實戰驗證的 Prompt 範本，涵蓋商業、學習、創意、技術等各個領域。\n\n**商業場景範本：**\n\n**商業計劃書撰寫**：\n「作為一位經驗豐富的商業策略顧問，請為 [產品/服務名稱] 撰寫一份商業計劃書。包含：市場分析、競爭優勢、財務預測、營銷策略。目標讀者是 [投資者/銀行/合作夥伴]，請用專業且有說服力的語調，篇幅控制在 [字數] 字以內。」\n\n**市場研究分析**：\n「扮演資深市場研究分析師，針對 [產品類別/行業] 進行全面的市場分析。請包含：市場規模、增長趨勢、主要競爭者、目標客群特徵、機會和威脅。請用數據支持你的分析，並提供具體的市場進入建議。」\n\n**學習場景範本：**\n\n**概念解釋**：\n「你是一位擅長深入淺出的教育專家。請向 [目標受眾：如 12 歲學生/非技術背景的成年人] 解釋 [複雜概念]。使用生活化的比喻和範例，確保 95% 的人都能理解。解釋結構：基本定義→生活比喻→實際應用→常見誤解澄清。」\n\n**學習計劃制定**：\n「作為專業的學習規劃師，為我制定一個 [時間週期] 的 [技能/知識領域] 學習計劃。我的現況是 [當前水平]，目標是 [期望達到的水平]。請提供：具體學習內容、時間分配、資源推薦、進度檢核點。」\n\n**創意場景範本：**\n\n**創意文案**：\n「你是一位獲獎的創意總監，專精於 [品牌調性] 風格的文案創作。請為 [產品/服務] 創作 [社群媒體貼文/廣告標語/產品描述]。目標受眾是 [具體描述]，重點突出 [核心賣點]，語調要 [專業/活潑/溫馨]。」\n\n**技術場景範本：**\n\n**程式碼解釋**：\n「作為資深的程式設計導師，請詳細解釋這段 [程式語言] 程式碼的運作原理。解釋要包含：整體邏輯、關鍵函數作用、可能的優化建議、新手容易犯的錯誤。請用通俗易懂的語言，適合 [初學者/中級開發者] 理解。」' :
          'Here are 20+ battle-tested Prompt templates covering business, learning, creative, and technical domains.',
        keyPoints: isZhHK ? [
          '商業範本：商業計劃書、市場研究、策略分析',
          '學習範本：概念解釋、學習計劃、技能提升',
          '創意範本：文案創作、內容策劃、品牌建設',
          '技術範本：程式碼解釋、問題診斷、系統設計',
          '即學即用：拿來就能用的高效率範本'
        ] : [
          'Business Templates: Business plans, market research, strategy analysis',
          'Learning Templates: Concept explanation, study plans, skill improvement',
          'Creative Templates: Copywriting, content planning, brand building',
          'Technical Templates: Code explanation, problem diagnosis, system design',
          'Ready to Use: High-efficiency templates for immediate application'
        ]
      },
      nextUnit: 17,
      nextTheme: 4,
      completed: false
    },

    // 第四主題：精通之道 — 高級提示工程
    '17': {
      id: 17,
      themeId: 4,
      title: isZhHK ? '單元 4.1：實戰項目 (一) 內容創作引擎：自動生成高質素的社交媒體貼文、廣告文案與電子郵件' : 'Unit 4.1: Project 1: Content Creation Engine - Social Media, Ads & Email',
      duration: '35分鐘',
      type: 'project' as const,
      description: isZhHK ? '實戰演練：使用 ChatGPT 建立內容創作工作流程，批量生成高質量的行銷內容。' : 'Hands-on practice: Use ChatGPT to build content creation workflows and generate high-quality marketing content in batches.',
      content: {
        transcript: isZhHK ? 
          '內容創作是 ChatGPT 最實用的應用領域之一。通過系統化的方法，你可以建立高效的內容創作工作流程。\n\n**社交媒體貼文創作流程：**\n\n1. **品牌調性定義**：\n「作為我們品牌的社群管理專家，請先了解我們的品牌調性：[溫馨親和/專業權威/年輕活潑]，目標受眾是 [詳細描述]，核心價值是 [品牌價值]。」\n\n2. **內容主題規劃**：\n「基於我們的品牌調性，請為本月制定 20 個社群貼文主題，涵蓋：產品介紹(30%)、行業洞察(25%)、用戶故事(25%)、品牌文化(20%)。每個主題提供具體的執行角度。」\n\n3. **具體貼文創作**：\n「請為主題『[具體主題]』創作 3 個不同版本的 Instagram 貼文。要求：吸睛的開頭、清晰的價值點、行動呼籲。字數控制在 150 字以內，包含 3-5 個相關 hashtag。」\n\n**廣告文案創作系統：**\n\n**AIDA 框架應用**：\n「運用 AIDA 模型為 [產品名稱] 創作廣告文案：\n- Attention：用震撼的數據或問題抓住注意力\n- Interest：突出獨特賣點激發興趣\n- Desire：描繪使用後的美好情景\n- Action：清晰的行動呼籲\n字數控制在 100 字以內，語調要 [具體要求]。」\n\n**電子郵件行銷範本：**\n\n**歡迎信序列**：\n「為新訂閱用戶設計 5 封歡迎信序列，時間間隔：註冊當日、第3天、第7天、第14天、第30天。每封信的目的分別是：歡迎並介紹品牌、提供價值內容、建立信任、促進首次購買、培養長期關係。」' :
          'Content creation is one of the most practical applications of ChatGPT. Through systematic methods, you can build efficient content creation workflows.',
        keyPoints: isZhHK ? [
          '社群貼文：品牌調性定義、主題規劃、多版本創作',
          '廣告文案：AIDA 框架、獨特賣點、行動呼籲',
          '電子郵件：歡迎序列、價值內容、關係培養',
          '工作流程：系統化方法提升創作效率',
          '批量生產：一次性創作多個高質量內容'
        ] : [
          'Social Media: Brand tone definition, topic planning, multi-version creation',
          'Ad Copy: AIDA framework, unique selling points, call to action',
          'Email Marketing: Welcome sequences, value content, relationship building',
          'Workflow: Systematic methods to improve creation efficiency',
          'Batch Production: Create multiple high-quality content pieces at once'
        ]
      },
      nextUnit: 18,
      nextTheme: null,
      completed: false
    },

    '18': {
      id: 18,
      themeId: 4,
      title: isZhHK ? '單元 4.2：實戰項目 (二) 學習研究加速器：快速總結論文、報告，並用簡單方式解釋複雜概念' : 'Unit 4.2: Project 2: Learning Research Accelerator - Summarize Papers & Reports',
      duration: '28分鐘',
      type: 'project' as const,
      description: isZhHK ? '學習如何使用 ChatGPT 快速處理學術資料，提升學習和研究效率。' : 'Learn to use ChatGPT for rapid academic material processing, improving learning and research efficiency.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT 可以大幅提升學習和研究效率，特別是在處理大量文獻和複雜概念時。\n\n**學術論文總結流程：**\n\n1. **結構化總結**：\n「請按以下結構總結這篇論文：\n- 研究背景和問題\n- 研究方法和數據\n- 主要發現和結論\n- 實際應用和啟示\n- 研究限制和未來方向\n每部分用 2-3 句話概括，總字數控制在 300 字以內。」\n\n2. **關鍵概念提取**：\n「從這份研究中提取 5-8 個最重要的概念或術語，並為每個概念提供簡潔的定義。如果有相關的實際應用案例，請一併說明。」\n\n**複雜概念簡化技巧：**\n\n**層次化解釋法**：\n「請用三個層次解釋 [複雜概念]：\n- 給 10 歲孩子的解釋（用生活比喻）\n- 給高中生的解釋（加入基本原理）\n- 給大學生的解釋（包含技術細節）\n每個層次用 100 字以內說明。」\n\n**知識連結建構**：\n「請解釋 [新概念] 與以下已知概念的關係：[列出相關概念]。用圖像化的方式描述它們之間的連結，幫助建立知識網絡。」\n\n**研究報告快速分析：**\n\n**數據洞察提取**：\n「分析這份市場報告，提取 10 個最重要的數據洞察。每個洞察包含：具體數據、趨勢方向、可能原因、商業含義。按重要性排序。」\n\n**比較分析框架**：\n「比較這兩份研究報告的異同點，製作對比表格：\n- 研究方法差異\n- 結論一致性分析\n- 數據可信度評估\n- 實用性比較」' :
          'ChatGPT can dramatically improve learning and research efficiency, especially when processing large amounts of literature and complex concepts.',
        keyPoints: isZhHK ? [
          '論文總結：結構化摘要、關鍵概念提取',
          '概念簡化：層次化解釋、生活比喻、知識連結',
          '報告分析：數據洞察、趨勢識別、商業含義',
          '比較研究：異同分析、可信度評估',
          '效率提升：快速處理大量學術資料'
        ] : [
          'Paper Summarization: Structured abstracts, key concept extraction',
          'Concept Simplification: Layered explanations, life analogies, knowledge linking',
          'Report Analysis: Data insights, trend identification, business implications',
          'Comparative Research: Similarity analysis, credibility assessment',
          'Efficiency Boost: Rapid processing of large academic materials'
        ]
      },
      nextUnit: 19,
      nextTheme: null,
      completed: false
    },

    '19': {
      id: 19,
      themeId: 4,
      title: isZhHK ? '單元 4.3：實戰項目 (三) 創意腦震盪夥伴：從零開始規劃旅行、活動流程或商業點子' : 'Unit 4.3: Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',
      duration: '22分鐘',
      type: 'project' as const,
      description: isZhHK ? '發揮 ChatGPT 的創意潛能，協助您進行各種創意規劃和點子發想。' : 'Unleash ChatGPT\'s creative potential to assist in various creative planning and idea generation.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT 是出色的創意夥伴，能協助你從零開始規劃各種項目，激發創新思維。\n\n**旅行規劃助手：**\n\n**個人化行程設計**：\n「作為專業旅行規劃師，為我設計 [目的地] [天數] 的旅行行程。我的偏好：[文化探索/美食體驗/自然風光/冒險活動]，預算 [金額]，同行者 [情況]。請提供：\n- 每日詳細行程\n- 預算分配建議\n- 當地文化注意事項\n- 必備物品清單\n- 備選方案（應對天氣等變化）」\n\n**活動策劃專家：**\n\n**活動概念發想**：\n「為 [公司/組織] 策劃一場 [活動類型] 活動，目標是 [具體目標]，參與者約 [人數]，預算 [範圍]。請提供：\n- 3 個不同風格的活動概念\n- 詳細執行流程\n- 所需資源和人力\n- 風險評估和應對方案\n- 成功指標設定」\n\n**商業點子孵化器：**\n\n**市場機會識別**：\n「分析 [行業/市場] 中被忽視的機會，考慮以下趨勢：[列出相關趨勢]。請提供：\n- 5 個創新商業點子\n- 每個點子的目標市場\n- 競爭優勢分析\n- 初步商業模式\n- 驗證方法建議」\n\n**創意思維激發技巧：**\n\n**六頂思考帽方法**：\n「用愛德華·德博的六頂思考帽方法分析這個創意：[描述創意]\n- 白帽（事實數據）\n- 紅帽（情感直覺）\n- 黑帽（風險挑戰）\n- 黃帽（積極面向）\n- 綠帽（創新可能）\n- 藍帽（思維管理）」\n\n**SCAMPER 創新法**：\n「運用 SCAMPER 方法改善這個想法：[現有想法]\n- Substitute（替代）\n- Combine（結合）\n- Adapt（調整）\n- Modify（修改）\n- Put to other use（轉用）\n- Eliminate（消除）\n- Reverse（逆向）」' :
          'ChatGPT is an excellent creative partner that can help you plan various projects from scratch and stimulate innovative thinking.',
        keyPoints: isZhHK ? [
          '旅行規劃：個人化行程、預算分配、文化注意事項',
          '活動策劃：概念發想、執行流程、風險評估',
          '商業創新：市場機會、點子孵化、模式設計',
          '思維工具：六頂思考帽、SCAMPER 創新法',
          '創意激發：系統化方法提升創新效率'
        ] : [
          'Travel Planning: Personalized itineraries, budget allocation, cultural considerations',
          'Event Planning: Concept development, execution process, risk assessment',
          'Business Innovation: Market opportunities, idea incubation, model design',
          'Thinking Tools: Six Thinking Hats, SCAMPER innovation method',
          'Creative Stimulation: Systematic methods to enhance innovation efficiency'
        ]
      },
      nextUnit: 20,
      nextTheme: null,
      completed: false
    },

    '20': {
      id: 20,
      themeId: 4,
      title: isZhHK ? '單元 4.4：實戰項目 (四) 程式設計超級助手：解釋程式碼、除錯 (Debug) 與編寫簡單腳本' : 'Unit 4.4: Project 4: Programming Super Assistant - Code Explanation & Debugging',
      duration: '40分鐘',
      type: 'project' as const,
      description: isZhHK ? '即使不是程式設計師，也能利用 ChatGPT 處理基本的程式設計任務和技術問題。' : 'Even non-programmers can use ChatGPT to handle basic programming tasks and technical issues.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT 是強大的程式設計助手，無論你是新手還是專業開發者，都能從中獲得幫助。\n\n**程式碼解釋專家：**\n\n**逐行代碼解析**：\n「請詳細解釋這段 [程式語言] 程式碼：\n[貼上程式碼]\n\n請按以下格式解釋：\n1. 整體功能概述\n2. 逐行詳細說明\n3. 關鍵概念解釋\n4. 可能的改進建議\n5. 相關學習資源推薦\n\n解釋要適合 [初學者/中級/高級] 程度理解。」\n\n**演算法原理說明**：\n「解釋這個演算法的工作原理，包含：\n- 基本思路和邏輯\n- 時間複雜度分析\n- 空間複雜度分析\n- 適用場景\n- 優缺點比較\n- 實際應用範例」\n\n**除錯診斷助手：**\n\n**錯誤分析流程**：\n「我的程式出現以下錯誤：\n[錯誤訊息]\n\n程式碼：\n[相關程式碼]\n\n請幫我：\n1. 分析錯誤原因\n2. 提供具體的修復方案\n3. 解釋為什麼會出現這個錯誤\n4. 給出預防類似錯誤的建議\n5. 提供測試驗證的方法」\n\n**簡單腳本編寫：**\n\n**自動化任務腳本**：\n「請為我編寫一個 [Python/JavaScript] 腳本，功能是：[具體需求描述]。要求：\n- 程式碼要有詳細註釋\n- 包含錯誤處理\n- 提供使用說明\n- 給出執行範例\n- 說明所需的依賴套件」\n\n**數據處理腳本**：\n「編寫一個腳本來處理 [Excel/CSV/JSON] 文件，需要：\n- 讀取文件內容\n- 執行 [具體處理邏輯]\n- 輸出處理結果\n- 處理異常情況\n請包含完整的範例和使用指南。」' :
          'ChatGPT is a powerful programming assistant that can help both beginners and professional developers.',
        keyPoints: isZhHK ? [
          '程式解釋：逐行分析、演算法原理、概念說明',
          '除錯協助：錯誤診斷、修復方案、預防建議',
          '腳本編寫：自動化任務、數據處理、完整註釋',
          '學習支援：適應不同程度、提供學習資源',
          '實用導向：即學即用的程式設計解決方案'
        ] : [
          'Code Explanation: Line-by-line analysis, algorithm principles, concept clarification',
          'Debugging Assistance: Error diagnosis, fix solutions, prevention advice',
          'Script Writing: Automation tasks, data processing, complete documentation',
          'Learning Support: Adapt to different levels, provide learning resources',
          'Practical Focus: Ready-to-use programming solutions'
        ]
      },
      nextUnit: 21,
      nextTheme: null,
      completed: false
    },

    '21': {
      id: 21,
      themeId: 4,
      title: isZhHK ? '單元 4.5：實戰項目 (五) 語言翻譯與潤飾大師：進行多國語言精準翻譯與專業級文章校對' : 'Unit 4.5: Project 5: Language Translation & Polishing Master',
      duration: '25分鐘',
      type: 'project' as const,
      description: isZhHK ? '掌握 ChatGPT 的語言處理能力，實現專業級的翻譯和文案潤飾。' : 'Master ChatGPT\'s language processing capabilities for professional-level translation and copywriting.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT 在語言處理方面表現出色，能提供高質量的翻譯和文字潤飾服務。\n\n**專業翻譯技巧：**\n\n**情境化翻譯**：\n「請將以下 [源語言] 文字翻譯成 [目標語言]：\n[原文內容]\n\n翻譯要求：\n- 目標讀者：[具體描述]\n- 文體風格：[正式/非正式/技術性/文學性]\n- 文化適應：考慮目標文化的表達習慣\n- 術語處理：保持專業術語的準確性\n- 語調保持：與原文情感色彩一致\n\n請提供翻譯結果和重要翻譯說明。」\n\n**多版本翻譯比較**：\n「為這段文字提供 3 個不同風格的翻譯版本：\n- 版本 1：直譯版（忠實原文結構）\n- 版本 2：意譯版（流暢自然表達）\n- 版本 3：創意版（適應目標文化）\n並解釋每個版本的特點和適用場景。」\n\n**文章潤飾服務：**\n\n**全面校對流程**：\n「請對以下文章進行全面校對和潤飾：\n[文章內容]\n\n校對重點：\n1. 語法和拼寫檢查\n2. 句式結構優化\n3. 詞彙選擇改善\n4. 邏輯順序調整\n5. 整體可讀性提升\n\n請標示所有修改並解釋修改原因。」\n\n**風格調整專家**：\n「將這篇文章的風格從 [原風格] 調整為 [目標風格]：\n[原文內容]\n\n調整說明：\n- 目標讀者變化\n- 語調轉換要求\n- 專業程度調整\n- 情感色彩變化\n\n請提供調整後的版本和風格變化說明。」\n\n**多語言內容策略：**\n\n**本地化建議**：\n「為進入 [目標市場] 市場，請為我們的 [產品/服務] 提供內容本地化建議：\n- 文化敏感性考量\n- 語言表達習慣\n- 營銷信息調整\n- 視覺元素建議\n- 避免的文化禁忌」' :
          'ChatGPT excels in language processing, providing high-quality translation and text polishing services.',
        keyPoints: isZhHK ? [
          '專業翻譯：情境化處理、文化適應、術語準確',
          '多版本對比：直譯、意譯、創意版本選擇',
          '文章潤飾：語法校對、結構優化、可讀性提升',
          '風格調整：語調轉換、讀者適應、情感把控',
          '本地化策略：文化考量、市場適應、禁忌避免'
        ] : [
          'Professional Translation: Contextual processing, cultural adaptation, terminology accuracy',
          'Multi-version Comparison: Literal, interpretive, creative version selection',
          'Article Polishing: Grammar checking, structure optimization, readability improvement',
          'Style Adjustment: Tone conversion, audience adaptation, emotion control',
          'Localization Strategy: Cultural considerations, market adaptation, taboo avoidance'
        ]
      },
      nextUnit: 22,
      nextTheme: 5,
      completed: false
    },

    // 第五主題：打造專屬 AI — 個人化與 GPT 商店
    '22': {
      id: 22,
      themeId: 5,
      title: isZhHK ? '單元 5.1：Advanced Data Analysis (數據分析大師)：上傳 Excel/CSV/PDF，進行數據分析與圖表製作' : 'Unit 5.1: Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',
      duration: '35分鐘',
      type: 'advanced' as const,
      description: isZhHK ? '學習使用 ChatGPT 的 Advanced Data Analysis 功能，處理和分析各種數據文件。' : 'Learn to use ChatGPT\'s Advanced Data Analysis feature to process and analyze various data files.',
      content: {
        transcript: isZhHK ? 
          'Advanced Data Analysis 是 ChatGPT Plus 的強大功能，能夠處理 Excel、CSV、PDF 等多種文件格式，進行深度數據分析。\n\n**文件上傳與處理：**\n\n**Excel 文件分析**：\n「我上傳了一個銷售數據的 Excel 文件，請幫我：\n1. 分析數據的基本結構和統計資訊\n2. 識別銷售趨勢和季節性模式\n3. 找出表現最好和最差的產品類別\n4. 計算關鍵績效指標（KPI）\n5. 創建視覺化圖表展示主要發現\n6. 提供改善銷售的具體建議」\n\n**CSV 數據清理**：\n「這個 CSV 文件包含客戶數據，請協助：\n- 檢查數據完整性和一致性\n- 識別和處理缺失值\n- 發現重複記錄並建議處理方法\n- 標準化數據格式\n- 創建數據品質報告」\n\n**PDF 文件解析**：\n「請分析這份 PDF 報告：\n- 提取關鍵數據和統計資訊\n- 總結主要發現和結論\n- 識別重要趨勢和模式\n- 與歷史數據進行比較分析\n- 製作摘要和可視化圖表」\n\n**數據分析流程：**\n\n**探索性數據分析 (EDA)**：\n「對這個數據集進行全面的探索性分析：\n1. 數據概覽和基本統計\n2. 變量分佈分析\n3. 相關性分析\n4. 異常值檢測\n5. 缺失值模式分析\n6. 數據可視化\n7. 初步洞察和假設」\n\n**商業智能分析**：\n「基於這些業務數據，請提供：\n- 關鍵業務指標分析\n- 客戶細分和行為分析\n- 市場趨勢識別\n- 收入和成本分析\n- 預測和預警指標\n- 行動建議和策略方向」' :
          'Advanced Data Analysis is a powerful feature of ChatGPT Plus that can process Excel, CSV, PDF and other file formats for deep data analysis.',
        keyPoints: isZhHK ? [
          '文件支援：Excel、CSV、PDF 等多種格式處理',
          '數據清理：完整性檢查、缺失值處理、格式標準化',
          '分析功能：趨勢分析、統計計算、異常檢測',
          '視覺化：自動生成圖表和數據可視化',
          '商業洞察：KPI 計算、客戶分析、預測建議'
        ] : [
          'File Support: Processing Excel, CSV, PDF and other formats',
          'Data Cleaning: Integrity checking, missing value handling, format standardization',
          'Analysis Features: Trend analysis, statistical calculation, anomaly detection',
          'Visualization: Automatic chart generation and data visualization',
          'Business Insights: KPI calculation, customer analysis, predictive recommendations'
        ]
      },
      nextUnit: 23,
      nextTheme: null,
      completed: false
    },

    '23': {
      id: 23,
      themeId: 5,
      title: isZhHK ? '單元 5.2：Web Browse (實時網絡瀏覽)：結合即時網絡資訊，進行市場調查與新聞總結' : 'Unit 5.2: Web Browse: Real-time Web Information for Market Research',
      duration: '30分鐘',
      type: 'advanced' as const,
      description: isZhHK ? '掌握 ChatGPT 的網絡瀏覽功能，獲取最新資訊並進行分析。' : 'Master ChatGPT\'s web browsing feature to gather latest information and conduct analysis.',
      content: {
        transcript: isZhHK ? 
          'Web Browse 功能讓 ChatGPT 能夠訪問即時網絡資訊，大大擴展了其知識範圍和實用性。\n\n**實時資訊獲取：**\n\n**新聞監測與總結**：\n「請搜尋並總結今天關於 [特定主題/公司/行業] 的最新新聞：\n- 列出 5-10 條最重要的新聞\n- 每條新聞提供簡潔摘要\n- 分析整體趨勢和影響\n- 識別關鍵事件和轉折點\n- 預測可能的後續發展\n- 提供相關的投資或商業建議」\n\n**市場研究與競爭分析**：\n「針對 [產品/服務/行業] 進行市場調查：\n- 搜尋最新的市場報告和數據\n- 分析主要競爭對手的動態\n- 識別市場趨勢和機會\n- 收集客戶評價和反饋\n- 比較定價策略\n- 總結市場進入建議」\n\n**技術趨勢追蹤**：\n「研究 [技術領域] 的最新發展：\n- 搜尋最新的技術突破\n- 分析重要研究論文和專利\n- 識別領先的公司和研究機構\n- 評估技術成熟度和應用前景\n- 預測未來發展方向\n- 提供技術投資建議」\n\n**實用應用場景：**\n\n**投資決策支援**：\n「請幫我研究 [公司名稱/股票代碼]：\n- 搜尋最新的財務報告和新聞\n- 分析股價表現和市場反應\n- 收集分析師觀點和評級\n- 識別風險因素和機會\n- 比較同行業公司表現\n- 提供投資建議和風險評估」\n\n**旅行規劃更新**：\n「為我的 [目的地] 旅行計劃提供最新資訊：\n- 查詢當前的旅行限制和要求\n- 搜尋最新的景點開放情況\n- 收集當地天氣和季節資訊\n- 找到最新的活動和節慶\n- 獲取交通和住宿的最新價格\n- 提供安全提醒和注意事項」' :
          'The Web Browse feature allows ChatGPT to access real-time web information, greatly expanding its knowledge range and practicality.',
        keyPoints: isZhHK ? [
          '即時資訊：獲取最新新聞、報告、數據',
          '市場調查：競爭分析、趨勢識別、客戶反饋',
          '技術追蹤：最新突破、研究動態、發展預測',
          '投資支援：財務分析、風險評估、市場比較',
          '生活應用：旅行規劃、事件追蹤、實用資訊'
        ] : [
          'Real-time Info: Latest news, reports, data acquisition',
          'Market Research: Competitive analysis, trend identification, customer feedback',
          'Tech Tracking: Latest breakthroughs, research dynamics, development predictions',
          'Investment Support: Financial analysis, risk assessment, market comparison',
          'Life Applications: Travel planning, event tracking, practical information'
        ]
      },
      nextUnit: 24,
      nextTheme: null,
      completed: false
    },

    '24': {
      id: 24,
      themeId: 5,
      title: isZhHK ? '單元 5.3：DALL-E 3 圖像生成：用文字創造出專業級的商業插圖、簡報圖片與藝術作品' : 'Unit 5.3: DALL-E 3 Image Generation: Create Professional Business Illustrations',
      duration: '32分鐘',
      type: 'creative' as const,
      description: isZhHK ? '學習使用 DALL-E 3 創作高質量圖像，滿足各種商業和創意需求。' : 'Learn to use DALL-E 3 to create high-quality images for various business and creative needs.',
      content: {
        transcript: isZhHK ? 
          'DALL-E 3 是 ChatGPT 整合的強大圖像生成工具，能根據文字描述創造出令人驚豔的視覺內容。\n\n**專業圖像創作技巧：**\n\n**商業插圖設計**：\n「請為我創作一幅商業插圖：\n主題：[具體業務場景]\n風格：現代、簡潔、專業\n色彩：企業品牌色調 [具體顏色]\n元素：包含 [相關商業元素]\n用途：網站首頁、簡報、行銷材料\n尺寸建議：適合網頁和印刷使用\n情感基調：可信、創新、成功」\n\n**簡報視覺元素**：\n「為我的商業簡報創作配圖：\n簡報主題：[主題內容]\n目標受眾：[具體描述]\n設計要求：\n- 風格一致性\n- 清晰的視覺層次\n- 適合投影顯示\n- 支持核心訊息\n- 專業且吸引人\n請提供 3-5 個不同的設計概念」\n\n**品牌視覺識別**：\n「協助設計品牌相關圖像：\nBrand：[品牌名稱和定位]\n產品/服務：[具體描述]\n目標市場：[受眾特徵]\n品牌個性：[形容詞描述]\n視覺風格：[現代/經典/創新等]\n應用場景：Logo、包裝、廣告、社群媒體\n請創作體現品牌精神的視覺元素」\n\n**創意提示詞技巧：**\n\n**描述結構優化**：\n「有效的 DALL-E 3 提示詞結構：\n1. 主題描述（要創作什麼）\n2. 風格指定（藝術風格、視覺風格）\n3. 技術參數（光線、構圖、色彩）\n4. 情感基調（氛圍、感受）\n5. 品質要求（高解析度、專業級）\n6. 參考風格（著名藝術家、設計流派）」\n\n**常見應用場景**：\n\n**社群媒體內容**：\n「為社群媒體貼文創作吸睛圖像：\n平台：[Instagram/Facebook/LinkedIn]\n內容主題：[貼文內容]\n視覺風格：與品牌一致\n尺寸要求：適合各平台規範\n文字空間：預留標題和標語位置\n行動呼籲：視覺上支持 CTA」\n\n**教育培訓材料**：\n「創作教學用圖像：\n課程主題：[具體課程]\n學習目標：[教學重點]\n學員程度：[初級/中級/高級]\n視覺要求：清晰、易懂、記憶深刻\n風格偏好：友善、專業、啟發性」' :
          'DALL-E 3 is a powerful image generation tool integrated with ChatGPT that can create stunning visual content based on text descriptions.',
        keyPoints: isZhHK ? [
          '商業應用：插圖設計、簡報配圖、品牌視覺',
          '創意技巧：提示詞結構、風格指定、品質控制',
          '多元場景：社群媒體、教育培訓、行銷材料',
          '專業品質：高解析度、商業級別的視覺效果',
          '效率提升：快速產生多個設計概念和版本'
        ] : [
          'Business Applications: Illustration design, presentation graphics, brand visuals',
          'Creative Techniques: Prompt structure, style specification, quality control',
          'Multiple Scenarios: Social media, educational training, marketing materials',
          'Professional Quality: High resolution, commercial-grade visual effects',
          'Efficiency Boost: Rapidly generate multiple design concepts and versions'
        ]
      },
      nextUnit: 25,
      nextTheme: null,
      completed: false
    },

    '25': {
      id: 25,
      themeId: 5,
      title: isZhHK ? '單元 5.4：創建你的第一個 Custom GPT：無需編程，手把手教你打造個人專屬的 AI 應用' : 'Unit 5.4: Create Your First Custom GPT: Build Personal AI Applications Without Programming',
      duration: '28分鐘',
      type: 'practical' as const,
      description: isZhHK ? '學習創建自訂 GPT，打造專門化的 AI 助手來解決特定問題。' : 'Learn to create custom GPTs and build specialized AI assistants to solve specific problems.',
      content: {
        transcript: isZhHK ? 
          'Custom GPT 讓你能夠創建專門化的 AI 助手，無需編程知識就能打造個人專屬的 AI 應用。\n\n**Custom GPT 創建流程：**\n\n**概念設計階段**：\n「規劃你的 Custom GPT：\n目的：要解決什麼問題？\n目標用戶：誰會使用這個 GPT？\n核心功能：主要提供哪些服務？\n專業領域：需要什麼專業知識？\n互動風格：正式、友善、技術性？\n獨特價值：與其他 GPT 的差異化？」\n\n**知識庫建設**：\n「為 Custom GPT 準備知識內容：\n- 上傳相關文檔和資料\n- 整理常見問題和答案\n- 建立專業術語詞典\n- 收集最佳實踐案例\n- 準備範例對話和回應\n- 設定回應的語調和風格」\n\n**實用 Custom GPT 範例：**\n\n**商業顧問 GPT**：\n「創建企業專用顧問：\n角色：資深商業策略顧問\n專長：中小企業營運優化\n知識基礎：行業最佳實踐、案例研究\n服務範圍：策略規劃、營運改善、市場分析\n溝通風格：專業、結構化、行動導向\n特殊功能：SWOT 分析、商業模式設計」\n\n**學習輔導 GPT**：\n「打造個人化學習助手：\n專業領域：[特定學科或技能]\n教學風格：循序漸進、互動問答\n學習資源：教材、練習題、參考資料\n評估機制：進度追蹤、弱點識別\n激勵系統：鼓勵和建議\n適應性：根據學習進度調整難度」\n\n**Creative GPT**：\n「設計創意助手：\n創意領域：寫作、設計、音樂、影片\n靈感來源：大量創意作品案例\n創作流程：從構思到執行的完整指導\n風格多樣：不同流派和技法\n協作模式：與用戶共同創作\n品質控制：創意評估和改善建議」\n\n**GPT 優化技巧：**\n\n**提示詞優化**：\n「完善 Custom GPT 的系統提示：\n1. 清晰的角色定義\n2. 具體的行為指引\n3. 回應格式規範\n4. 專業知識邊界\n5. 錯誤處理機制\n6. 用戶體驗優化」\n\n**測試與改進**：\n「Custom GPT 品質保證：\n- 多場景測試對話\n- 收集用戶反饋\n- 持續優化回應品質\n- 擴充知識庫內容\n- 調整互動風格\n- 監控使用效果」' :
          'Custom GPT allows you to create specialized AI assistants and build personal AI applications without programming knowledge.',
        keyPoints: isZhHK ? [
          '創建流程：概念設計、知識建設、系統配置',
          '應用範例：商業顧問、學習輔導、創意助手',
          '優化技巧：提示詞完善、測試改進、用戶反饋',
          '無需編程：視覺化界面操作，簡單易用',
          '個人化定制：專屬功能、風格、知識領域'
        ] : [
          'Creation Process: Concept design, knowledge building, system configuration',
          'Application Examples: Business consulting, learning tutoring, creative assistance',
          'Optimization Tips: Prompt refinement, testing improvement, user feedback',
          'No Programming: Visual interface operation, simple and easy to use',
          'Personal Customization: Exclusive functions, styles, knowledge domains'
        ]
      },
      nextUnit: 26,
      nextTheme: null,
      completed: false
    },

    '26': {
      id: 26,
      themeId: 5,
      title: isZhHK ? '單元 5.5：GPTs 應用商店的秘密：如何發佈你的 GPT，甚至未來可能從中獲利' : 'Unit 5.5: GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',
      duration: '32分鐘',
      type: 'business' as const,
      description: isZhHK ? '了解 GPT Store 的運作機制，學習如何發佈和推廣你的 Custom GPT。' : 'Understand how GPT Store works and learn to publish and promote your Custom GPT.',
      content: {
        transcript: isZhHK ? 
          'GPT Store 為創作者提供了分享和潛在獲利的平台，了解其運作機制對成功發佈至關重要。\n\n**GPT Store 發佈流程：**\n\n**發佈前準備**：\n「準備發佈你的 Custom GPT：\n1. 完善 GPT 功能和性能\n2. 創建吸引人的名稱和描述\n3. 設計專業的圖標和視覺元素\n4. 撰寫清晰的使用說明\n5. 進行全面測試和優化\n6. 準備示範案例和範例對話\n7. 設定適當的類別和標籤」\n\n**市場定位策略**：\n「找到你的 GPT 獨特定位：\n目標用戶：明確定義使用者群體\n解決痛點：識別具體的用戶需求\n競爭分析：研究類似的 GPT 應用\n差異化優勢：突出獨特功能和價值\n市場空白：發現未被滿足的需求\n用戶體驗：優化互動流程和滿意度」\n\n**內容優化與 SEO**：\n\n**描述文案優化**：\n「撰寫吸引人的 GPT 描述：\n標題優化：包含關鍵詞，簡潔有力\n功能介紹：清楚說明核心功能和優勢\n使用場景：描述具體的應用情境\n用戶收益：強調使用者能獲得的價值\n關鍵詞策略：融入相關搜尋詞彙\n行動呼籲：引導用戶試用和互動」\n\n**視覺設計重要性**：\n「打造專業的 GPT 形象：\n圖標設計：簡潔、識別度高、符合功能\n色彩選擇：與品牌一致，吸引目標用戶\n視覺風格：專業性與親和力的平衡\n品牌一致性：所有視覺元素協調統一\n用戶認知：容易理解和記憶」\n\n**推廣與營銷策略：**\n\n**社群媒體推廣**：\n「有效推廣你的 Custom GPT：\n- 在 LinkedIn、Twitter 等平台分享\n- 創建使用教程和案例研究\n- 參與相關社群和討論\n- 與意見領袖和專家合作\n- 定期分享更新和改進\n- 收集和展示用戶見證」\n\n**內容行銷**：\n「建立 GPT 的權威性：\n- 撰寫相關領域的專業文章\n- 製作操作指南和最佳實踐\n- 舉辦線上研討會或培訓\n- 創建影片教程和演示\n- 建立用戶社群和支援系統\n- 持續優化和功能更新」\n\n**未來獲利機會**：\n\n**商業模式探索**：\n「GPT 變現的可能途徑：\n1. 直接收費模式（如果平台支援）\n2. 諮詢服務和客製化開發\n3. 培訓課程和教育內容\n4. 品牌合作和贊助機會\n5. 進階版本和專業服務\n6. 數據洞察和市場研究」' :
          'GPT Store provides creators with a platform for sharing and potential monetization, understanding its mechanisms is crucial for successful publishing.',
        keyPoints: isZhHK ? [
          '發佈準備：功能完善、描述優化、視覺設計',
          '市場定位：目標用戶、差異化、競爭分析',
          'SEO 優化：關鍵詞策略、描述文案、搜尋可見度',
          '推廣策略：社群媒體、內容行銷、用戶見證',
          '獲利機會：多元變現模式、商業合作可能'
        ] : [
          'Publishing Prep: Feature perfection, description optimization, visual design',
          'Market Positioning: Target users, differentiation, competitive analysis',
          'SEO Optimization: Keyword strategy, description copy, search visibility',
          'Promotion Strategy: Social media, content marketing, user testimonials',
          'Profit Opportunities: Multiple monetization models, business collaboration possibilities'
        ]
      },
      nextUnit: 27,
      nextTheme: 6,
      completed: false
    },

    // 第六主題：展望未來 — 應用、倫理與挑戰
    '27': {
      id: 27,
      themeId: 6,
      title: isZhHK ? '單元 6.1：AI 的「幻覺」現象：如何識別並查證 AI 生成的虛假資訊' : 'Unit 6.1: AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',
      duration: '25分鐘',
      type: 'critical' as const,
      description: isZhHK ? '了解 AI 幻覺現象的成因，學習識別和驗證 AI 輸出的真實性。' : 'Understand the causes of AI hallucination and learn to identify and verify the authenticity of AI outputs.',
      content: {
        transcript: isZhHK ? 
          'AI「幻覺」是指人工智能生成看似合理但實際錯誤或虛構的資訊，了解這個現象對負責任地使用 AI 至關重要。\n\n**AI 幻覺的定義與特徵：**\n\n**什麼是 AI 幻覺**：\nAI 幻覺指的是語言模型在沒有足夠或正確資訊的情況下，仍然會以高度自信的語調產生錯誤、誤導或完全虛構的內容。這些回應往往在語法和邏輯上都很通順，讓人難以立即識別其虛假性。\n\n**常見的幻覺類型**：\n1. **事實性錯誤**：錯誤的日期、人名、地點、數據\n2. **虛構引用**：不存在的研究、書籍、文章引用\n3. **邏輯矛盾**：前後不一致的陳述\n4. **過度外推**：基於有限資訊做出過於絕對的結論\n5. **混合真假**：將真實和虛假資訊混合呈現\n\n**幻覺產生的原因：**\n\n**技術層面原因**：\n- 訓練數據的限制和偏差\n- 模型對不確定性的處理不當\n- 生成機制的隨機性\n- 知識截止日期的限制\n- 長文本生成中的偏差累積\n\n**識別 AI 幻覺的技巧：**\n\n**批判性思維檢查**：\n「評估 AI 回應的可信度：\n1. 事實查證：重要數據和陳述需要獨立驗證\n2. 邏輯一致性：檢查前後陳述是否矛盾\n3. 來源追蹤：要求提供具體的資料來源\n4. 常識判斷：不合理的內容需要質疑\n5. 專業知識：在你熟悉的領域檢驗準確性\n6. 多重驗證：使用多個資訊來源交叉驗證」\n\n**實用驗證方法**：\n\n**事實查證流程**：\n「建立系統性的驗證習慣：\n- 對具體數據和統計資訊保持懷疑\n- 使用可信的事實查證網站\n- 查找原始資料來源\n- 諮詢領域專家意見\n- 比較多個 AI 工具的回應\n- 使用搜尋引擎獨立驗證\n- 特別注意敏感或爭議性話題」\n\n**風險評估策略**：\n\n**高風險應用場景**：\n「在以下情況下特別謹慎：\n- 醫療健康建議\n- 法律和監管事務\n- 財務投資決策\n- 學術研究引用\n- 新聞和時事資訊\n- 技術規格和操作指南\n- 安全相關指示」\n\n**最佳實踐建議**：\n\n**負責任使用原則**：\n「建立健康的 AI 使用習慣：\n1. 保持批判性思維\n2. 建立多重驗證機制\n3. 了解 AI 的限制\n4. 在重要決策中諮詢專家\n5. 持續學習和更新知識\n6. 教育他人識別 AI 幻覺」' :
          'AI "hallucination" refers to artificial intelligence generating seemingly reasonable but actually incorrect or fabricated information. Understanding this phenomenon is crucial for responsible AI use.',
        keyPoints: isZhHK ? [
          'AI 幻覺：虛假但看似合理的AI生成內容',
          '常見類型：事實錯誤、虛構引用、邏輯矛盾',
          '產生原因：訓練限制、不確定性處理、知識截止',
          '識別技巧：批判思維、事實查證、多重驗證',
          '風險管控：高風險場景謹慎、專家諮詢、持續學習'
        ] : [
          'AI Hallucination: False but seemingly reasonable AI-generated content',
          'Common Types: Factual errors, fictional citations, logical contradictions',
          'Causes: Training limitations, uncertainty handling, knowledge cutoffs',
          'Identification Skills: Critical thinking, fact-checking, multiple verification',
          'Risk Management: Caution in high-risk scenarios, expert consultation, continuous learning'
        ]
      },
      nextUnit: 28,
      nextTheme: null,
      completed: false
    },

    '28': {
      id: 28,
      themeId: 6,
      title: isZhHK ? '單元 6.2：數據私隱與安全：你的對話安全嗎？如何管理你的數據' : 'Unit 6.2: Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',
      duration: '22分鐘',
      type: 'security' as const,
      description: isZhHK ? '了解 AI 服務的隱私政策，學習保護個人和企業數據的最佳實踐。' : 'Understand AI service privacy policies and learn best practices for protecting personal and business data.',
      content: {
        transcript: isZhHK ? 
          '在使用 ChatGPT 等 AI 服務時，了解數據隱私和安全議題對個人和企業都至關重要。\n\n**數據收集與使用**：\n\n**OpenAI 的數據政策**：\nOpenAI 會收集用戶的對話內容用於改善服務品質，但有幾個重要考量：\n- 免費版用戶的對話可能用於模型訓練\n- ChatGPT Plus 用戶可以選擇退出數據收集\n- 企業版提供更嚴格的數據保護選項\n- API 使用的數據不會用於模型訓練\n\n**隱私風險評估**：\n\n**個人資訊洩露風險**：\n「識別潛在的隱私威脅：\n1. 個人身份資訊 (PII) 意外分享\n2. 敏感商業資訊洩露\n3. 客戶資料和聯絡方式\n4. 財務和醫療資訊\n5. 密碼和登入憑證\n6. 內部文件和策略」\n\n**數據保護最佳實踐**：\n\n**個人用戶指南**：\n「保護你的個人隱私：\n- 避免分享真實姓名、地址、電話\n- 不提供信用卡號碼或銀行資訊\n- 使用假名或代號替代真實身份\n- 定期檢查和清理對話歷史\n- 啟用隱私設定選項\n- 了解數據保留政策」\n\n**企業安全策略**：\n\n**商業數據保護**：\n「企業使用 AI 的安全準則：\n1. 建立明確的 AI 使用政策\n2. 訓練員工隱私意識\n3. 使用企業級服務方案\n4. 實施數據分類系統\n5. 定期進行安全審查\n6. 建立事故應對流程」\n\n**敏感資訊替代策略**：\n\n**資訊匿名化技巧**：\n「安全地使用 AI 服務：\n- 用 [公司A] 替代真實公司名稱\n- 用 [客戶B] 替代具體客戶信息\n- 使用示例數據而非真實數據\n- 描述情境而非具體案例\n- 聚焦方法而非敏感細節\n- 使用通用術語替代專有名詞」\n\n**法規遵循考量**：\n\n**全球隱私法規**：\n「了解相關法規要求：\n- GDPR（歐盟一般數據保護規則）\n- CCPA（加州消費者隱私法）\n- 個人資料保護法（台灣）\n- 數據安全法（中國）\n- 行業特定規範（金融、醫療等）」\n\n**安全工具與設定**：\n\n**隱私控制選項**：\n「優化你的隱私設定：\n1. 關閉對話歷史記錄\n2. 禁用數據收集用於訓練\n3. 定期刪除對話記錄\n4. 使用無痕瀏覽模式\n5. 考慮使用 VPN 服務\n6. 監控帳戶活動」\n\n**事故響應計劃**：\n\n**數據洩露應對**：\n「如果懷疑數據洩露：\n- 立即停止使用相關服務\n- 記錄和評估洩露範圍\n- 聯繫服務提供商\n- 通知相關持份者\n- 實施損害控制措施\n- 檢討和改善安全政策」' :
          'When using AI services like ChatGPT, understanding data privacy and security issues is crucial for both individuals and businesses.',
        keyPoints: isZhHK ? [
          '數據政策：了解AI服務的收集和使用規則',
          '風險評估：識別個人和商業資訊洩露威脅',
          '保護策略：匿名化、資訊替代、隱私設定',
          '企業安全：政策制定、員工培訓、服務選擇',
          '法規遵循：GDPR、CCPA等隱私法規要求'
        ] : [
          'Data Policies: Understanding AI service collection and usage rules',
          'Risk Assessment: Identifying personal and business information leak threats',
          'Protection Strategies: Anonymization, information substitution, privacy settings',
          'Enterprise Security: Policy formulation, employee training, service selection',
          'Regulatory Compliance: GDPR, CCPA and other privacy regulation requirements'
        ]
      },
      nextUnit: 29,
      nextTheme: null,
      completed: false
    },

    '29': {
      id: 29,
      themeId: 6,
      title: isZhHK ? '單元 6.3：AI 的偏見問題：認識訓練數據帶來的潜在影響，並學習如何應對' : 'Unit 6.3: AI Bias Issues: Understanding Training Data Impact and How to Respond',
      duration: '20分鐘',
      type: 'ethical' as const,
      description: isZhHK ? '探討 AI 偏見的來源和影響，學習識別和減少偏見的策略。' : 'Explore the sources and impacts of AI bias, learn strategies to identify and reduce bias.',
      content: {
        transcript: isZhHK ? 
          'AI 偏見是指人工智能系統在處理資訊時表現出不公平或歧視性的傾向，了解這個問題有助於更負責任地使用 AI。\n\n**AI 偏見的來源**：\n\n**訓練數據偏見**：\nAI 模型的訓練數據來自互聯網和各種文本資源，這些資料不可避免地包含了人類社會的偏見和刻板印象：\n- 歷史文獻中的性別和種族偏見\n- 地理和文化的代表性不均\n- 社會經濟地位的差異\n- 語言和表達方式的偏好\n- 價值觀和世界觀的局限性\n\n**常見的偏見類型**：\n\n**社會人口偏見**：\n「識別不同類型的 AI 偏見：\n1. 性別偏見：職業刻板印象、能力假設\n2. 種族偏見：文化誤解、歷史偏見\n3. 年齡偏見：世代差異、技術能力假設\n4. 地理偏見：西方中心主義、城鄉差異\n5. 語言偏見：英語優先、方言歧視\n6. 經濟偏見：階級假設、消費能力判斷」\n\n**認知偏見**：\n「AI 可能複製的人類認知偏見：\n- 確認偏誤：偏好支持既有觀點的資訊\n- 可得性偏誤：高估常見事件的機率\n- 代表性偏誤：過度概括小樣本特徵\n- 錨定偏誤：過度依賴首次獲得的資訊\n- 群體思維：盲從多數意見」\n\n**偏見識別技巧**：\n\n**批判性評估方法**：\n「檢測 AI 回應中的潛在偏見：\n1. 多角度測試：用不同身份和背景重複問題\n2. 反向驗證：測試相反或對立的情況\n3. 文化敏感性：檢查是否考慮不同文化觀點\n4. 語言分析：注意用詞是否暗示刻板印象\n5. 數據來源：質疑統計和事實的代表性\n6. 專家諮詢：在不熟悉領域尋求專業意見」\n\n**減少偏見的策略**：\n\n**提示詞優化**：\n「設計更公平的 AI 互動：\n- 明確要求多元化觀點\n- 避免使用可能暗示偏見的詞彙\n- 要求考慮不同文化和背景\n- 請求平衡和客觀的分析\n- 明確指出需要避免的偏見類型\n- 要求提供多種解決方案」\n\n**實例應用**：\n\n**改善提示詞範例**：\n\n**原始提示**：「描述一個成功的企業家」\n**改良提示**：「描述不同背景的成功企業家，包括不同性別、種族、年齡和地理位置的例子，避免刻板印象」\n\n**原始提示**：「解釋為什麼某些國家比較發達」\n**改良提示**：「從多個角度分析國家發展的複雜因素，避免簡化或偏見性的解釋，考慮歷史、地理、政治、經濟等多重因素」\n\n**組織層面的應對**：\n\n**企業 AI 治理**：\n「建立負責任的 AI 使用文化：\n1. 制定 AI 倫理政策\n2. 提供偏見意識培訓\n3. 建立多元化的 AI 使用團隊\n4. 定期審查 AI 產出品質\n5. 建立回饋和改進機制\n6. 與多元化社群保持對話」\n\n**持續改進**：\n\n**學習和適應**：\n「培養長期的偏見意識：\n- 定期更新對偏見問題的理解\n- 參與相關的教育和討論\n- 與不同背景的人交流經驗\n- 關注 AI 倫理的最新發展\n- 積極參與創建更公平的 AI 環境」' :
          'AI bias refers to unfair or discriminatory tendencies in AI systems when processing information. Understanding this issue helps use AI more responsibly.',
        keyPoints: isZhHK ? [
          '偏見來源：訓練數據中的歷史和社會偏見',
          '偏見類型：社會人口、認知、文化等多種偏見',
          '識別技巧：多角度測試、批判性評估、專家諮詢',
          '減少策略：提示詞優化、多元化要求、平衡分析',
          '組織治理：倫理政策、培訓教育、持續改進'
        ] : [
          'Bias Sources: Historical and social biases in training data',
          'Bias Types: Demographic, cognitive, cultural and other biases',
          'Identification Skills: Multi-angle testing, critical assessment, expert consultation',
          'Reduction Strategies: Prompt optimization, diversity requirements, balanced analysis',
          'Organizational Governance: Ethical policies, training education, continuous improvement'
        ]
      },
      nextUnit: 30,
      nextTheme: null,
      completed: false
    },

    '30': {
      id: 30,
      themeId: 6,
      title: isZhHK ? '單元 6.4：負責任地使用 AI：在學術、工作與創作中應遵守的倫理界線' : 'Unit 6.4: Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',
      duration: '18分鐘',
      type: 'ethical' as const,
      description: isZhHK ? '探討在不同領域使用 AI 的倫理準則和最佳實踐。' : 'Explore ethical guidelines and best practices for using AI in different fields.',
      content: {
        transcript: isZhHK ? 
          '負責任地使用 AI 需要在各個領域建立明確的倫理界線，平衡技術便利與道德責任。\n\n**學術研究倫理**：\n\n**AI 輔助研究的準則**：\n「在學術環境中使用 AI 的倫理考量：\n1. 透明度原則：明確聲明 AI 的使用範圍\n2. 原創性維護：確保研究的獨立思考價值\n3. 引用規範：適當標註 AI 協助的部分\n4. 品質控制：人工驗證 AI 生成的內容\n5. 學術誠信：避免將 AI 輸出直接作為自己的成果\n6. 同儕審查：接受對 AI 使用的監督和評估」\n\n**可接受的使用場景**：\n「學術研究中 AI 的適當應用：\n- 文獻搜尋和初步整理\n- 數據分析和模式識別\n- 語言潤飾和格式優化\n- 概念解釋和理論探討\n- 研究方法的建議和討論\n- 跨學科知識的整合」\n\n**應避免的行為**：\n「學術不當使用 AI 的例子：\n- 直接複製 AI 生成的論文段落\n- 用 AI 偽造實驗數據或結果\n- 不聲明 AI 輔助就提交作業\n- 讓 AI 代替完成核心創新工作\n- 使用 AI 進行不當的同儕評議」\n\n**職場應用倫理**：\n\n**專業責任界線**：\n「工作環境中的 AI 使用原則：\n1. 公司政策遵循：了解並遵守組織的 AI 使用規範\n2. 客戶利益保護：確保 AI 使用不損害客戶權益\n3. 專業能力維護：不讓 AI 替代核心專業判斷\n4. 資訊安全：避免洩露敏感的商業資訊\n5. 品質責任：對 AI 輔助的工作成果負責\n6. 持續學習：保持和提升個人專業能力」\n\n**不同職業的考量**：\n\n**法律專業**：\n「律師使用 AI 的倫理界線：\n- 法律研究和案例分析輔助\n- 文件起草的初步協助\n- 客戶諮詢的背景研究\n- 但不能完全依賴 AI 做法律判斷\n- 必須人工驗證所有法律建議\n- 保護客戶隱私和律師職業特權」\n\n**醫療健康**：\n「醫療專業 AI 使用的謹慎原則：\n- 教育和知識更新的輔助工具\n- 行政工作和文檔整理\n- 研究文獻的搜尋和總結\n- 絕不能替代臨床診斷判斷\n- 不提供具體的治療建議\n- 嚴格保護患者隱私資訊」\n\n**教育領域**：\n「教師和教育工作者的 AI 倫理：\n- 課程內容的準備和研究\n- 教學方法的創新探索\n- 學生評估的輔助工具\n- 培養學生的 AI 素養\n- 示範負責任的 AI 使用\n- 防止學生過度依賴 AI」\n\n**創作與智慧財產權**：\n\n**創意產業倫理**：\n「創作者使用 AI 的考量：\n1. 原創性聲明：明確標示 AI 參與的創作部分\n2. 智慧財產權：了解 AI 生成內容的版權狀況\n3. 藝術完整性：保持個人創作風格和理念\n4. 市場公平：避免不當競爭優勢\n5. 文化尊重：避免 AI 複製敏感文化元素\n6. 技能平衡：維持和發展個人創作能力」\n\n**商業創作應用**：\n「商業環境中的創作倫理：\n- 廣告和行銷內容的 AI 輔助\n- 產品設計和包裝的靈感來源\n- 品牌傳播的創意發想\n- 客戶體驗的優化建議\n- 但需保持品牌真實性\n- 避免誤導消費者」\n\n**建立個人倫理框架**：\n\n**自我評估問題**：\n「使用 AI 前的倫理檢視：\n1. 這種使用是否符合專業標準？\n2. 我是否能對結果承擔責任？\n3. 這樣做是否尊重他人權益？\n4. 我是否保持了學習和成長？\n5. 這種使用是否透明和誠實？\n6. 長期來看是否有益於社會？」' :
          'Responsible AI use requires establishing clear ethical boundaries in various fields, balancing technological convenience with moral responsibility.',
        keyPoints: isZhHK ? [
          '學術倫理：透明聲明、原創維護、品質控制',
          '職場責任：政策遵循、專業判斷、資訊安全',
          '專業界線：法律、醫療、教育等領域的特殊考量',
          '創作倫理：原創聲明、智慧財產權、文化尊重',
          '個人框架：自我評估、責任承擔、持續學習'
        ] : [
          'Academic Ethics: Transparent declaration, originality maintenance, quality control',
          'Workplace Responsibility: Policy compliance, professional judgment, information security',
          'Professional Boundaries: Special considerations for legal, medical, educational fields',
          'Creative Ethics: Originality declaration, intellectual property, cultural respect',
          'Personal Framework: Self-assessment, responsibility assumption, continuous learning'
        ]
      },
      nextUnit: 31,
      nextTheme: null,
      completed: false
    },

    '31': {
      id: 31,
      themeId: 6,
      title: isZhHK ? '單元 6.5：人工智能的未來：展望 GPT 的下一步發展與對社會的長遠影響' : 'Unit 6.5: The Future of AI: GPT\'s Next Development and Long-term Social Impact',
      duration: '25分鐘',
      type: 'future' as const,
      description: isZhHK ? '探討 AI 技術的未來發展趨勢和對社會各層面的潛在影響。' : 'Explore future trends in AI technology and potential impacts on various aspects of society.',
      content: {
        transcript: isZhHK ? 
          '人工智能正處於快速發展階段，了解其未來趨勢對個人和社會的規劃都具有重要意義。\n\n**技術發展趨勢**：\n\n**模型能力的演進**：\n「未來 GPT 和 AI 模型的可能發展：\n1. 推理能力增強：更複雜的邏輯思考和問題解決\n2. 多模態整合：文本、圖像、聲音、影片的無縫結合\n3. 實時學習：持續從新資訊中學習和適應\n4. 個人化程度：更深度的用戶個性化體驗\n5. 專業化分工：針對特定領域的深度專精\n6. 可解釋性：AI 決策過程的透明化」\n\n**技術整合趨勢**：\n「AI 與其他技術的融合：\n- 物聯網 (IoT)：智能家居和城市的全面覆蓋\n- 擴增實境 (AR/VR)：沉浸式 AI 交互體驗\n- 區塊鏈：去中心化的 AI 治理和激勵機制\n- 量子計算：突破性的計算能力提升\n- 邊緣計算：本地化的 AI 處理能力\n- 腦機介面：直接的思維-AI 交互」\n\n**社會影響預測**：\n\n**工作和就業變化**：\n「AI 對勞動市場的長期影響：\n正面影響：\n- 自動化重複性工作，釋放人力從事創意工作\n- 創造新的職業類別和工作機會\n- 提高整體生產力和經濟效率\n- 降低某些服務的成本和門檻\n\n挑戰：\n- 某些傳統職業可能被取代\n- 技能要求快速變化，需要持續學習\n- 數位鴻溝可能加劇社會不平等\n- 勞動價值和意義的重新定義」\n\n**教育體系轉型**：\n「AI 時代的教育變革：\n- 個人化學習路徑和節奏\n- AI 輔助的智能教學系統\n- 技能導向而非知識記憶的教育\n- 終身學習成為常態\n- 創意、批判思維、情感智能的重視\n- 跨學科整合能力的培養」\n\n**醫療健康革命**：\n「AI 在醫療領域的未來應用：\n- 精準醫學和個人化治療\n- 早期疾病檢測和預防\n- 藥物研發的加速\n- 遠程醫療和健康監測\n- 心理健康的 AI 支援\n- 醫療資源的優化配置」\n\n**倫理和治理挑戰**：\n\n**新興倫理議題**：\n「AI 發展帶來的倫理考驗：\n1. AI 權利：當 AI 更加智能時，是否需要法律保護？\n2. 人機關係：人類與 AI 的界線在哪裡？\n3. 決策責任：AI 做決定時，誰承擔後果？\n4. 數據主權：個人數據的控制權歸屬\n5. 算法透明：AI 決策過程的可理解性\n6. 數位人格：虛擬身份和真實身份的關係」\n\n**全球治理需求**：\n「國際合作與規範建立：\n- AI 安全的國際標準和協議\n- 跨國數據流動的規則制定\n- AI 軍事應用的限制共識\n- 技術轉移和知識共享機制\n- 發展中國家的 AI 能力建設\n- 全球 AI 倫理框架的建立」\n\n**個人和社會的準備**：\n\n**個人能力建設**：\n「在 AI 時代保持競爭力：\n1. 持續學習意願和能力\n2. 跨領域知識的整合\n3. 創意和創新思維\n4. 情感智能和人際技能\n5. 批判性思考和判斷力\n6. 適應變化的靈活性」\n\n**社會制度適應**：\n「社會層面的準備工作：\n- 教育制度的全面改革\n- 社會保障體系的重新設計\n- 法律框架的更新和完善\n- 經濟模式的創新探索\n- 文化價值的重新審視\n- 國際合作機制的加強」\n\n**積極參與未來**：\n\n**成為 AI 時代的積極參與者**：\n「如何在 AI 發展中發揮作用：\n- 保持對新技術的開放態度\n- 參與 AI 倫理和政策的討論\n- 支持負責任的 AI 發展\n- 培養下一代的 AI 素養\n- 在自己的領域探索 AI 應用\n- 促進包容性的技術發展」\n\n**結語：擁抱變化，塑造未來**：\n\n「人工智能的未來不是預定的命運，而是我們共同創造的結果。通過負責任的開發、明智的應用、和積極的參與，我們可以確保 AI 技術真正為人類福祉服務，創造一個更加智能、公平、和可持續的未來。」' :
          'Artificial intelligence is in a rapid development phase, and understanding its future trends is important for both personal and social planning.',
        keyPoints: isZhHK ? [
          '技術趨勢：模型能力增強、多模態整合、技術融合',
          '社會影響：就業變化、教育轉型、醫療革命',
          '倫理挑戰：新興議題、全球治理、責任歸屬',
          '個人準備：持續學習、跨領域能力、情感智能',
          '積極參與：開放態度、倫理討論、包容發展'
        ] : [
          'Tech Trends: Enhanced model capabilities, multimodal integration, technology convergence',
          'Social Impact: Employment changes, education transformation, healthcare revolution',
          'Ethical Challenges: Emerging issues, global governance, responsibility attribution',
          'Personal Preparation: Continuous learning, interdisciplinary skills, emotional intelligence',
          'Active Participation: Open attitude, ethical discussion, inclusive development'
        ]
      },
      nextUnit: null,
      nextTheme: null,
      completed: false
    }
  }), [isZhHK]);

  // 🚀 性能優化：緩存複雜計算
  const currentUnit = useMemo(() => {
    const unit = units[unitId as keyof typeof units];
    if (!unit) {
      // 提供一個默認的單元結構以防止錯誤
      return {
        id: parseInt(unitId || '1'),
        themeId: parseInt(themeId || '1'),
        title: '單元不存在',
        duration: '0分鐘',
        type: 'video' as const,
        description: '請檢查單元ID是否正確',
        content: {
          transcript: '單元內容不存在',
          keyPoints: ['請返回課程首頁']
        }
      };
    }
    return unit;
  }, [units, unitId]);

  if (!currentUnit || currentUnit.title === '單元不存在') {
    return (
      <div className="min-h-screen chatgpt-unit-page text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">單元不存在</h1>
          <button
            onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
            className="btn-ai-primary"
          >
            返回課程首頁
          </button>
        </div>
      </div>
    );
  }

  const navigationConfig = useMemo(() => {
    const unitNum = parseInt(unitId || '1');
    const isLastUnitOfTheme = (
      unitNum === 5 ||   // 主題1結束
      unitNum === 10 ||  // 主題2結束  
      unitNum === 16 ||  // 主題3結束
      unitNum === 21 ||  // 主題4結束
      unitNum === 26 ||  // 主題5結束
      unitNum === 31     // 主題6結束（課程結束）
    );
    
    return {
      unitNum,
      isLastUnitOfTheme,
      hasNextUnit: unitNum < 31,
      hasPrevUnit: unitNum > 1,
      nextUnitId: unitNum + 1,
      prevUnitId: unitNum - 1
    };
  }, [unitId]);

  const progressConfig = useMemo(() => {
    return {
      progressColorClass: stats.totalProgress >= 75 ? 'bg-gradient-to-r from-completed-400 to-completed-500' :
                         stats.totalProgress >= 50 ? 'bg-gradient-to-r from-important-400 to-important-500' :
                         stats.totalProgress >= 25 ? 'bg-gradient-to-r from-learning-400 to-learning-500' :
                         'bg-gradient-to-r from-gray-400 to-gray-500',
      timerStatusClass: isTimerActive && !isCompleted 
                       ? 'status-learning animate-learning-active' 
                       : isCompleted 
                       ? 'status-completed'
                       : 'bg-gray-500/20 text-gray-400'
    };
  }, [stats.totalProgress, isTimerActive, isCompleted]);

  // 🎯 修復版計時器 - 移除所有可能導致無限循環的依賴
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    console.log(`🔧 [FIXED] 計時器初始化`, {
      currentUnitKey,
      isCompleted,
      forceTimerForTesting,
      shouldStart: !isCompleted || forceTimerForTesting
    });
    
    // 🎯 重要修復：當單元已完成且不在測試模式時，立即停止計時器
    if (isCompleted && !forceTimerForTesting) {
      console.log(`⏹️ [FIXED] 單元已完成，立即停止計時器`);
      setIsTimerActive(false);
      setLearningSeconds(0);
      return; // 提早返回，不啟動新的計時器
    }
    
    // 決定是否啟動計時器 - 只有在未完成或測試模式時才啟動
    const shouldStart = !isCompleted || forceTimerForTesting;
    
    if (shouldStart) {
      console.log(`✅ [FIXED] 啟動計時器`);
      
      // 重置狀態
      setIsTimerActive(true);
      setLearningSeconds(0);
      setRealTimeDisplay('00:00:00');
      setTimerStartTime(Date.now());
      
      // 啟動計時器
      interval = setInterval(() => {
        setLearningSeconds(prev => {
          const newSeconds = prev + 1;
          console.log(`⏰ [FIXED] 計時器更新: ${newSeconds}秒`);
          
          // 格式化顯示為 MM:SS 格式
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const seconds = newSeconds % 60;
          
          // 格式化為 00:00:00 格式
          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
          const display = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          
          // 批量更新顯示
          setRealTimeDisplay(display);
          
          return newSeconds;
        });
      }, 1000);
      
      console.log(`🎯 [FIXED] 計時器創建成功`);
    } else {
      console.log(`⏸️ [FIXED] 計時器不啟動 - 單元已完成`);
      setIsTimerActive(false);
    }
    
    // 清理函數
    return () => {
      if (interval) {
        console.log(`🧹 [FIXED] 清理計時器`);
        clearInterval(interval);
      }
    };
  }, [currentUnitKey, isCompleted, forceTimerForTesting]); // 🎯 重要修復：添加 isCompleted 作為依賴

  return (
    <div className="min-h-screen chatgpt-unit-page" style={{ backgroundColor: '#121212' }}>
      {/* Skip Links for Keyboard Navigation */}
      <a href="#main-content" className="skip-link">
        跳至主要內容
      </a>
      <a href="#sidebar-content" className="skip-link">
        跳至學習輔助區
      </a>
      
      <Navigation />
      
      <div className="container mx-auto px-6 py-0 main-content-wrapper" role="main" aria-label="學習頁面主要內容">
        {/* 🎯 響應式智能Header - 移動端友善設計 */}
        <motion.header 
          className="header-ai-smart mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="banner"
          aria-label="課程導航和進度資訊"
        >
          {/* 桌面版Header */}
          <div className="hidden lg:flex items-center justify-between py-4 px-6">
            
            {/* 左側：返回導航 */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary hover-lift click-scale focus-visible-enhanced"
                aria-label="返回ChatGPT完整教學課程首頁"
              >
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">返回課程</span>
              </button>
              
              <button 
                onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                className="btn-ai-primary hover-lift click-scale focus-visible-enhanced"
                aria-label="返回學習概覽頁面"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">學習概覽</span>
              </button>
              
              <div className="text-gray-400 text-sm" aria-label="課程位置資訊">
                <span className="text-gray-300 font-medium">ChatGPT 完整教學</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>主題 {themeId}</span>
            </div>
          </div>
          
            {/* 中央：進度信息 + 計時器 */}
            <div className="flex items-center space-x-6" role="region" aria-label="學習進度和計時器">
              
              {/* 學習進度 */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400" aria-label={`目前單元：第${unitId}單元，共31個單元`}>單元 {unitId}/31</div>
                  <div className="text-lg font-bold text-white" aria-label={`總學習進度：${stats.totalProgress}%`}>{stats.totalProgress}%</div>
          </div>
                <div className="w-24 progress-ai-sm performance-optimized" role="progressbar" aria-valuenow={stats.totalProgress} aria-valuemin={0} aria-valuemax={100} aria-label="課程整體進度">
                  <motion.div 
                    className={`progress-ai-fill gpu-accelerated ${progressConfig.progressColorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.totalProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
              </div>

              {/* 計時器 - 極簡版 */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-ai-md transition-all duration-200 performance-optimized ${progressConfig.timerStatusClass}`} role="timer" aria-label={`本次學習時間：${realTimeDisplay}，${isTimerActive && !isCompleted ? '計時進行中' : isCompleted ? '學習已完成' : '計時器未啟動'}`}>
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="font-mono text-sm font-medium">{realTimeDisplay}</span>
                {isTimerActive && !isCompleted && (
                  <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse gpu-accelerated" aria-hidden="true"></div>
                )}
              </div>
            </div>

            {/* 右側：主要操作按鈕 */}
            <div className="flex items-center space-x-3" role="group" aria-label="學習操作按鈕">
              {(() => {
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`標記單元${unitId}為已完成`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                      完成學習
                    </Button>
                  );
                }
                
                if (navigationConfig.isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 performance-optimized"
                      aria-label={`進入主題${themeId}的測驗`}
                    >
                      開始測驗
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                } else {
                  return (
                    <Button 
                      onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                      className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`前往下一課：單元${navigationConfig.nextUnitId}`}
                    >
                      下一課
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                }
              })()}
              
              {/* 上一課按鈕 - 只在需要時顯示 */}
              {navigationConfig.hasPrevUnit && (
                      <button
                  onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-md duration-200 hover-lift click-scale focus-visible-enhanced performance-optimized"
                  aria-label={`返回上一課：單元${navigationConfig.prevUnitId}`}
                  title="上一課"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                          )}
                        </div>
          </div>

          {/* 移動端Header - 堆疊佈局 */}
          <div className="lg:hidden header-ai-mobile">
            {/* 第一行：返回 + 課程信息 */}
            <div className="header-row">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleNavigateBack}
                  className="btn-ai-secondary btn-mobile-compact hover-lift click-scale focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">返回</span>
                      </button>

                <button 
                  onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                  className="btn-ai-primary btn-mobile-compact hover-lift click-scale focus-ring"
                  aria-label="返回學習概覽頁面"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">概覽</span>
                </button>
                              </div>
              
              <div className="text-center flex-1 mx-4">
                <div className="text-white font-medium text-sm">單元 {unitId}</div>
                <div className="text-gray-400 text-xs">主題 {themeId}</div>
              </div>
              
              {/* 上一課/下一課導航 */}
              <div className="flex items-center space-x-2">
                {currentUnit.id > 1 && (
                  <button 
                    onClick={() => handleNavigatePrev(currentUnit.id - 1)}
                    className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-sm duration-200 focus-ring"
                    title="上一課"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 第二行：進度 + 計時器 */}
            <div className="header-progress">
              {/* 進度條 */}
              <div className="flex items-center space-x-3 flex-1">
                <div className="text-xs text-gray-400">{stats.totalProgress}%</div>
                <div className="flex-1 progress-ai-sm max-w-32">
                  <motion.div 
                    className={`progress-ai-fill gpu-accelerated ${
                      stats.totalProgress >= 75 ? 'bg-gradient-to-r from-completed-400 to-completed-500' :
                      stats.totalProgress >= 50 ? 'bg-gradient-to-r from-important-400 to-important-500' :
                      stats.totalProgress >= 25 ? 'bg-gradient-to-r from-learning-400 to-learning-500' :
                      'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.totalProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                                </div>
                              </div>

              {/* 計時器 */}
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-ai-sm text-xs ${
                isTimerActive && !isCompleted 
                  ? 'status-learning animate-learning-active' 
                  : isCompleted 
                  ? 'status-completed'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                <Clock className="w-3 h-3" />
                <span className="font-mono font-medium">{realTimeDisplay}</span>
                {isTimerActive && !isCompleted && (
                  <div className="w-1.5 h-1.5 bg-learning-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>

            {/* 第三行：主要操作按鈕 */}
            <div className="w-full">
              {(() => {
                const unitNum = parseInt(unitId);
                const isLastUnitOfTheme = (
                  unitNum === 5 ||   // 主題1結束
                  unitNum === 10 ||  // 主題2結束  
                  unitNum === 16 ||  // 主題3結束
                  unitNum === 21 ||  // 主題4結束
                  unitNum === 26 ||  // 主題5結束
                  unitNum === 31     // 主題6結束（課程結束）
                );
                
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success btn-mobile-full hover-lift click-scale focus-ring py-3"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      完成學習
                    </Button>
                  );
                }
                
                if (isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary btn-mobile-full hover-lift click-scale focus-ring py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                    >
                      開始測驗
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  );
                } else {
                  const nextUnitId = unitNum + 1;
                  return (
                    <Button 
                      onClick={() => handleNavigateNext(nextUnitId)}
                      className="btn-ai-primary btn-mobile-full hover-lift click-scale focus-ring py-3"
                    >
                      下一課
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  );
                }
              })()}
            </div>
          </div>
        </motion.header>

        {/* 🎯 簡化的單元標題區域 */}
                <motion.div 
          className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-xl ${
                              currentUnit.type === 'video' ? 'bg-gray-700/50 text-gray-300' :
              currentUnit.type === 'text' ? 'bg-green-500/20 text-green-300' :
              'bg-gray-500/20 text-gray-300'
            }`}>
              {currentUnit.type === 'video' ? <Video className="w-6 h-6" /> :
               currentUnit.type === 'text' ? <FileText className="w-6 h-6" /> :
               <BookOpen className="w-6 h-6" />}
                        </div>
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {currentUnit.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentUnit.duration}</span>
                </span>
                <Badge variant={currentUnit.type === 'video' ? 'default' : 'secondary'}>
                  {currentUnit.type === 'video' ? '影片課程' : 
                   currentUnit.type === 'text' ? '文本課程' : '閱讀材料'}
                </Badge>
                {isCompleted && (
                  <span className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">已完成</span>
                  </span>
                )}
                      </div>
                    </div>
          </div>

          {/* 學習狀態提示 - 簡化版 */}
          {isTimerActive && !isCompleted && (
            <motion.div 
              className="mt-4 card-ai-base border-learning-300/50 p-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse"></div>
                <span className="text-learning-300 text-sm">正在學習中，計時器已啟動</span>
              </div>
            </motion.div>
                  )}
                </motion.div>

        {/* 🎯 響應式學習佈局 - 移動優先設計 */}
        <div className="layout-learning-main desktop">
          
          {/* 主要學習區域 - 響應式 */}
          <div className="layout-main-content content-optimized" id="main-content" role="main" aria-label="課程主要內容">
            
            {/* 🔧 調試控制面板 - 只在開發模式顯示 */}
            {isDevelopment && showDebugPanel && (
                <motion.div 
                className="bg-yellow-900/90 border border-yellow-600 rounded-lg p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-yellow-200 text-sm space-y-2">
                  <div className="font-bold text-yellow-100 mb-2">🔧 計時器調試面板</div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>單元: {currentUnitKey}</div>
                    <div>已完成: {isCompleted ? '✅' : '❌'}</div>
                    <div>計時器活躍: {isTimerActive ? '🔵' : '⚪'}</div>
                    <div>學習秒數: {learningSeconds}</div>
                    <div>顯示時間: {realTimeDisplay}</div>
                    <div>強制測試: {forceTimerForTesting ? '✅' : '❌'}</div>
                      </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => setForceTimerForTesting(!forceTimerForTesting)}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        forceTimerForTesting 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {forceTimerForTesting ? '關閉測試模式' : '啟用測試模式'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setLearningSeconds(0);
                        setRealTimeDisplay('00:00:00');
                        console.log('🔄 [DEBUG] 手動重置計時器');
                      }}
                      className="px-3 py-1 rounded text-xs font-medium bg-gray-700 text-white"
                    >
                      重置計時器
                    </button>
                    </div>
                  
                  <div className="text-xs text-yellow-300 mt-2">
                    💡 開啟 Console (F12) 查看詳細日誌
                  </div>
                </div>
              </motion.div>
            )}

            {/* 主要課程內容 - 響應式優化 */}
            <motion.div 
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* 課程描述 */}
              <div className="text-responsive-body text-gray-300 leading-relaxed">
                {currentUnit.description}
              </div>

              {/* 主要內容文字 - 響應式字體 */}
              <div className="prose prose-invert prose-lg lg:prose-xl max-w-none">
                <div className="text-white/95 leading-loose space-y-6 lg:space-y-8">
                  {currentUnit.content.transcript.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-responsive-body leading-loose tracking-wide">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* 動態應用案例展示 - 響應式優化 */}
              <div className="mt-8 lg:mt-12 p-6 lg:p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl lg:rounded-2xl border border-gray-600/30">
                                  <h3 className="text-xl lg:text-2xl font-bold text-gray-200 mb-4 lg:mb-6 flex items-center">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                  {(() => {
                    switch(currentUnit.id) {
                      case 1:
                        return 'LLM 技術應用領域';
                      case 3:
                        return '多模態輸入實際應用場景';
                      case 4:
                        return '提示工程核心原則實例對比';
                      case 6:
                        return '註冊帳戶的主要優勢';
                      case 7:
                        return '對話管理最佳實踐';
                      case 8:
                        return '版本選擇決策指南';
                      case 9:
                        return '介面操作技巧總結';
                      case 10:
                        return '跨平台使用建議';
                      case 22:
                        return '自訂指令實際應用場景';
                      case 27:
                        return 'ChatGPT 在不同領域的實際應用';
                      default:
                        return '實際應用案例';
                    }
                  })()}
                </h3>
                {(() => {
                  switch(currentUnit.id) {
                    case 1:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🧠 自然語言理解</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">文本分類、情感分析、實體識別等複雜語言處理任務。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">✍️ 文本生成應用</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">自動摘要、機器翻譯、創意寫作和程式碼生成。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🔍 資訊檢索</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">智能搜尋、問答系統、知識圖譜構建。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🎯 個人化推薦</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">內容推薦、用戶畫像分析、個性化服務。</p>
                          </div>
                        </div>
                      );
                    case 6:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">💾 對話歷史保存</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">自動保存所有對話記錄，隨時回顧和繼續之前的討論。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">⚙️ 個人化設定</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">自訂指令、偏好設定和個人化的 AI 互動體驗。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🌐 跨平台同步</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">在手機、平板、電腦間無縫同步所有數據和設定。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🔒 隱私控制</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">臨時對話模式和更細緻的隱私保護選項。</p>
                          </div>
                        </div>
                      );
                    case 7:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">📝 命名策略</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">使用「項目+日期」、「主題關鍵詞」等策略，如「2024報告分析」、「Python學習筆記」。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🔍 搜尋技巧</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">利用側邊欄搜尋框，輸入關鍵詞快速定位相關對話記錄。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🔗 分享最佳實踐</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">分享前檢查敏感信息，了解分享鏈接是靜態快照。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🗂️ 分類管理</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">付費用戶可使用資料夾功能，按專案或主題分類管理對話。</p>
                          </div>
                        </div>
                      );
                    case 8:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">💡 初學者建議</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">偶爾使用、學習探索 → 免費版足夠，先熟悉基本功能再考慮升級。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">💼 專業用戶</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">內容創作、代碼開發、商務應用 → Plus版物超所值，享受無限制高品質體驗。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🏢 企業團隊</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">協作需求、數據安全 → Team/Enterprise版，專業管理工具和隱私保護。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">⚖️ 成本效益分析</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">每月20美元 vs 時間節省和工作效率提升，計算實際投資回報率。</p>
                          </div>
                        </div>
                      );
                    case 9:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">⌨️ 快捷操作</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">Shift+Enter換行、Ctrl+K新對話、編輯提示重新發送，提升操作效率。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🔄 模型切換</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">根據任務選擇模型：GPT-4o高質量分析，GPT-4o mini快速簡單問題。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🔒 隱私模式</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">處理敏感信息時使用臨時對話模式，不保存記錄。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">📊 專案管理</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">付費用戶善用專案功能，統一管理相關對話和文件。</p>
                          </div>
                        </div>
                      );
                    case 10:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">💻 辦公場景</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">桌面應用 + 全局快捷鍵，快速截圖討論，深度工作首選。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">📱 移動場景</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">手機App + 語音模式，免提對話，通勤路上或戶外使用。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🌐 嘗鮮體驗</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">網頁版率先體驗最新功能，如Sora影片生成等實驗性功能。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🔄 無縫切換</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">帳戶同步確保跨設備一致體驗，隨時隨地繼續對話。</p>
                          </div>
                        </div>
                      );
                    case 3:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">📄 文件處理</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">上傳合約、報告快速提取重點，自動總結長篇文檔內容。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🖼️ 圖像分析</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">解讀圖表數據、識別圖片文字、分析螢幕截圖內容。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🎤 語音互動</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">免提對話、移動場景使用、個性化語音體驗。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">💼 工作流整合</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">結合多種輸入方式，創建高效的智能工作流程。</p>
                          </div>
                        </div>
                      );
                    case 4:
                      return (
                        <div className="space-y-6">
                          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            <div className="space-y-3 p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
                              <h4 className="text-base lg:text-lg font-semibold text-red-300">❌ 模糊提示</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base font-mono bg-gray-800/50 p-2 rounded">「給我寫點關於車的東西」</p>
                              <p className="text-red-200 text-xs">缺乏具體性，AI 無法準確理解意圖</p>
                            </div>
                            <div className="space-y-3 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                              <h4 className="text-base lg:text-lg font-semibold text-green-300">✅ 清晰提示</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base font-mono bg-gray-800/50 p-2 rounded">「請為一款新型號的電動 SUV 撰寫一段 150 字的產品描述，重點突出其 500 公里的續航里程和豪華內飾」</p>
                              <p className="text-green-200 text-xs">具體明確，包含字數、重點和目標</p>
                            </div>
                          </div>
                          
                          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            <div className="space-y-3 p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
                              <h4 className="text-base lg:text-lg font-semibold text-red-300">❌ 負面指令</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base font-mono bg-gray-800/50 p-2 rounded">「不要使用技術術語」</p>
                              <p className="text-red-200 text-xs">告訴 AI 不要做什麼，效果不佳</p>
                            </div>
                            <div className="space-y-3 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                              <h4 className="text-base lg:text-lg font-semibold text-green-300">✅ 正面指令</h4>
                              <p className="text-gray-300 leading-relaxed text-sm lg:text-base font-mono bg-gray-800/50 p-2 rounded">「請使用普通大眾都能理解的簡單語言」</p>
                              <p className="text-green-200 text-xs">明確說明要做什麼，更容易理解</p>
                            </div>
                          </div>
                        </div>
                      );
                    case 22:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">👩‍💼 專業身份設定</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">「我是一名專注於數據可視化的產品經理，精通 Python 和 R 語言」- 讓 AI 了解您的專業背景。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">🎯 目標與需求</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">「我使用 ChatGPT 的主要目的是為了提高編程效率和學習新的數據分析技術」- 明確使用目標。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">📝 回應格式偏好</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">「請始終使用 Markdown 格式化您的回答，並將代碼塊包裹起來」- 設定輸出格式。</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">💬 語氣與風格</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">「請以專業、簡潔的語氣回答，在回答複雜問題時先列出思考步驟」- 個人化溝通風格。</p>
                          </div>
                                                 </div>
                       );
                     case 27:
                       return (
                         <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                           <div className="space-y-3">
                             <h4 className="text-base lg:text-lg font-semibold text-white">✍️ 內容創作</h4>
                             <p className="text-gray-300 leading-relaxed text-sm lg:text-base">商業郵件、博客文章、社交媒體帖子、廣告文案、詩歌創作 - 成為您的萬能寫作助手。</p>
                           </div>
                           <div className="space-y-3">
                             <h4 className="text-base lg:text-lg font-semibold text-white">📄 文本總結</h4>
                             <p className="text-gray-300 leading-relaxed text-sm lg:text-base">長篇文章、學術論文、會議記錄 - 數秒內提取核心論點，指定總結長度和要點數量。</p>
                           </div>
                           <div className="space-y-3">
                             <h4 className="text-base lg:text-lg font-semibold text-white">🌐 語言翻譯</h4>
                             <p className="text-gray-300 leading-relaxed text-sm lg:text-base">多語言翻譯，理解上下文和文化習語，產生自然流暢的譯文，減少機器翻譯腔。</p>
                           </div>
                           <div className="space-y-3">
                             <h4 className="text-base lg:text-lg font-semibold text-white">💻 編程輔助</h4>
                             <p className="text-gray-300 leading-relaxed text-sm lg:text-base">代碼生成、邏輯解釋、錯誤調試、語言轉換 - 成為您不知疲倦的編程夥伴。</p>
                           </div>
                         </div>
                       );
                     default:
                       return (
                         <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                           <div className="space-y-3">
                             <h4 className="text-base lg:text-lg font-semibold text-white">💡 學習重點</h4>
                             <p className="text-gray-300 leading-relaxed text-sm lg:text-base">根據本單元內容整理的核心概念和實踐要點。</p>
                           </div>
                           <div className="space-y-3">
                             <h4 className="text-base lg:text-lg font-semibold text-white">🎯 實際應用</h4>
                             <p className="text-gray-300 leading-relaxed text-sm lg:text-base">將所學知識應用到實際工作和生活場景中的具體方法。</p>
                           </div>
                         </div>
                       );
                   }
                 })()}
              </div>
                </motion.div>
          </div>

          {/* 學習輔助區域 - 響應式側邊欄 */}
          <div className="layout-sidebar-content content-optimized" id="sidebar-content" role="complementary" aria-label="學習輔助工具">
            
            {/* 移動端：重點摘要在前 */}
            <motion.div 
              className="card-ai-elevated card-responsive order-1 lg:order-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              role="region"
              aria-labelledby="key-points-heading"
            >
              <h3 id="key-points-heading" className="text-base lg:text-lg font-bold text-white flex items-center mb-4">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-yellow-400" aria-hidden="true" />
                重點摘要
              </h3>
              <ul className="space-y-3" role="list">
                {currentUnit.content.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 text-sm"
                  >
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-completed-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-white/90 leading-relaxed text-xs lg:text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 學習統計 - 移動端優先 */}
                  <motion.div
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-600/30 rounded-xl card-responsive order-2 lg:order-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              role="region"
              aria-labelledby="learning-stats-heading"
            >
              <h3 id="learning-stats-heading" className="text-base lg:text-lg font-bold text-white flex items-center mb-4">
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-gray-400" aria-hidden="true" />
                學習統計
              </h3>
              
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">本次時間</dt>
                  <dd className="text-gray-300 font-mono font-medium text-sm lg:text-base" aria-label={`本次學習時間：${realTimeDisplay}`}>{realTimeDisplay}</dd>
                    </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">總進度</dt>
                  <dd className="text-green-300 font-bold text-sm lg:text-base" aria-label={`總學習進度：${stats.totalProgress}%`}>{stats.totalProgress}%</dd>
              </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">完成主題</dt>
                  <dd className="text-gray-300 font-medium text-sm lg:text-base" aria-label={`已完成${stats.completedThemes}個主題，共${stats.totalThemes}個主題`}>{stats.completedThemes}/{stats.totalThemes}</dd>
          </div>
                
                {isCompleted && (
                  <div className="flex items-center space-x-2 mt-4 p-2 bg-green-500/20 border border-green-400/30 rounded-lg" role="status" aria-label="單元已完成">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" aria-hidden="true" />
                    <span className="text-green-300 text-xs lg:text-sm font-medium">已完成</span>
        </div>
                )}
              </dl>
            </motion.div>

            {/* 即時筆記 - 桌面版才顯示，移動端隱藏 */}
        <motion.div 
              className="hidden lg:block card-ai-elevated card-responsive order-3 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
              role="region"
              aria-labelledby="notes-heading"
            >
              <h3 id="notes-heading" className="text-lg font-bold text-white flex items-center mb-4">
                <Edit className="w-5 h-5 mr-2 text-completed-400" aria-hidden="true" />
                我的筆記
              </h3>
              <div className="space-y-2">
                <label htmlFor="learning-notes" className="sr-only">學習筆記輸入框</label>
                <textarea
                  id="learning-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="記錄學習心得..."
                  className="input-ai-base h-32 resize-none text-sm focus-visible-enhanced"
                  aria-describedby="notes-info"
                  maxLength={500}
                />
                <div id="notes-info" className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">自動保存</span>
                  <span className="text-xs text-gray-400" aria-label={`已輸入${notes.length}個字符，最多500個字符`}>{notes.length}/500</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
            </div>
            
      {/* 🎯 固定底部操作欄 - 確保按鈕始終可見 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 左側：學習進度信息 */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              單元 {unitId} / 31
            </div>
            <div className="text-sm text-gray-400">
              {isCompleted ? '已完成' : '進行中'}
            </div>
          </div>

          {/* 右側：操作按鈕 */}
          <div className="flex items-center space-x-3">
            {/* 上一課按鈕 */}
            {navigationConfig.hasPrevUnit && (
                <Button
                onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                className="btn-ai-secondary px-4 py-2"
                aria-label={`返回上一課：單元${navigationConfig.prevUnitId}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                上一課
                </Button>
              )}
              
            {/* 主要操作按鈕 */}
            {!isCompleted ? (
              // 未完成 - 顯示完成按鈕
                <Button
                onClick={handleMarkComplete}
                className="btn-ai-success px-6 py-3"
                aria-label={`標記單元${unitId}為已完成`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                完成學習
              </Button>
            ) : navigationConfig.isLastUnitOfTheme ? (
              // 已完成且是主題最後一課 - 顯示測驗按鈕
              <Button 
                onClick={handleNavigateQuiz}
                                        className="btn-ai-primary px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                aria-label={`進入主題${themeId}的測驗`}
              >
                開始測驗
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : navigationConfig.hasNextUnit ? (
              // 已完成且有下一課 - 顯示下一課按鈕
              <Button 
                onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                className="btn-ai-primary px-6 py-3"
                aria-label={`前往下一課：單元${navigationConfig.nextUnitId}`}
              >
                下一課
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              // 課程結束 - 返回課程總覽
              <Button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary px-6 py-3"
                aria-label="返回課程總覽"
              >
                課程完成
                <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
      </div>

      {/* 完成動畫彈窗 - 保持原樣 */}
      {completionAnimation && (
            <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
            className="bg-green-600 text-white px-8 py-6 rounded-2xl flex items-center space-x-4"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <CheckCircle className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">單元完成！</h3>
              <p className="text-green-100">學習時間: {realTimeDisplay}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 