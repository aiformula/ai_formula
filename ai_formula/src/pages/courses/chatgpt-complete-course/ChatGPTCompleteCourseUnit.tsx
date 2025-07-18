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
  const [realTimeDisplay, setRealTimeDisplay] = useState('00:00'); // 修正：統一初始化為 MM:SS 格式

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
    
    // 格式化最終顯示時間為 MM:SS 格式
    const finalMinutes = Math.floor(finalSeconds / 60);
    const remainingSeconds = finalSeconds % 60;
    
    const formattedMinutes = finalMinutes.toString().padStart(2, '0');
    const formattedSecondsDisplay = remainingSeconds.toString().padStart(2, '0');
    const finalTimeDisplay = `${formattedMinutes}:${formattedSecondsDisplay}`;
    
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
          'Fine-tuning stage: further optimization using task-specific datasets',
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
          'Practical Application: Customized for different roles like students, professionals',
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
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
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
      setRealTimeDisplay('00:00');
      setTimerStartTime(Date.now());
      
      // 啟動計時器
      interval = setInterval(() => {
        setLearningSeconds(prev => {
          const newSeconds = prev + 1;
          console.log(`⏰ [FIXED] 計時器更新: ${newSeconds}秒`);
          
          // 格式化顯示為 MM:SS 格式
          const minutes = Math.floor(newSeconds / 60);
          const seconds = newSeconds % 60;
          
          // 格式化為 00:00 格式
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
          const display = `${formattedMinutes}:${formattedSeconds}`;
          
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
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
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
                      className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 performance-optimized"
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
                      className="btn-ai-primary btn-mobile-full hover-lift click-scale focus-ring py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400"
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
              currentUnit.type === 'video' ? 'bg-purple-500/20 text-purple-300' :
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
                        setRealTimeDisplay('00:00');
                        console.log('🔄 [DEBUG] 手動重置計時器');
                      }}
                      className="px-3 py-1 rounded text-xs font-medium bg-blue-600 text-white"
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
              <div className="mt-8 lg:mt-12 p-6 lg:p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl lg:rounded-2xl border border-blue-500/20">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-200 mb-4 lg:mb-6 flex items-center">
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
              className="bg-gradient-to-br from-indigo-600/15 to-purple-600/15 backdrop-blur-sm border border-indigo-500/20 rounded-xl card-responsive order-2 lg:order-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              role="region"
              aria-labelledby="learning-stats-heading"
            >
              <h3 id="learning-stats-heading" className="text-base lg:text-lg font-bold text-white flex items-center mb-4">
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-indigo-400" aria-hidden="true" />
                學習統計
              </h3>
              
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">本次時間</dt>
                  <dd className="text-blue-300 font-mono font-medium text-sm lg:text-base" aria-label={`本次學習時間：${realTimeDisplay}`}>{realTimeDisplay}</dd>
                    </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">總進度</dt>
                  <dd className="text-green-300 font-bold text-sm lg:text-base" aria-label={`總學習進度：${stats.totalProgress}%`}>{stats.totalProgress}%</dd>
              </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">完成主題</dt>
                  <dd className="text-purple-300 font-medium text-sm lg:text-base" aria-label={`已完成${stats.completedThemes}個主題，共${stats.totalThemes}個主題`}>{stats.completedThemes}/{stats.totalThemes}</dd>
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
                className="btn-ai-primary px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400"
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