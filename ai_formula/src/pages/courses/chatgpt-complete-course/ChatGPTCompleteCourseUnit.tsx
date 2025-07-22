import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  MessageSquare, Bookmark, ThumbsUp, Share2, FileText, Video,
  Star, Target, Download, Save, Volume2, Maximize, Lightbulb, TrendingUp, Users, Globe, Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress'; // ChatGPT ?�度追蹤
import './ChatGPTCompleteCourseUnit.css'; // ?�� 課�??�面增強�??
import '@/styles/design-system.css'; // ?�� 統�?設�?系統
import { LearningPageSkeleton, HeaderSkeleton, LearningContentSkeleton, SidebarSkeleton } from '@/components/ui/skeleton'; // ?��?：骨?��?

const ChatGPTCompleteCourseUnit: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  // 計�??��???- 簡�???  const [learningSeconds, setLearningSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  
  // ?�� 調試模�?：強?��??��??�器（測試用�?  const [forceTimerForTesting, setForceTimerForTesting] = useState(false); // ?�� ?�為 false，�??�環境�?強制?��?

  // ?�� 調試?�板?�制 - ?�在?��?條件下顯�?  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  // ?�� ?�發?�快?�鍵：�? Ctrl+D 顯示/?��?調試?�板
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
  
  // ?�� 使用?�度追蹤 Hook
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    themeProgress
  } = useChatGPTProgress();

  // 定義單元完成檢查
  const isUnitCompleted = useCallback((unitKey: string): boolean => {
    // �?unitKey �?? themeId ??unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return false;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    const progress = getThemeProgress(themeId);
    return progress ? progress.completedUnits.includes(unitId) : false;
  }, [getThemeProgress]);
  
  // ?��?義單?��??��???  const markUnitCompleted = useCallback((unitKey: string, timeSpent: number = 60) => {
    // �?unitKey �?? themeId ??unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    // 將�??��??�為?��?
    const timeInMinutes = Math.ceil(timeSpent / 60);
    
    completeUnit(themeId, unitId, timeInMinutes);
  }, [completeUnit]);
  
  const [completionAnimation, setCompletionAnimation] = useState(false);
  const [realTimeDisplay, setRealTimeDisplay] = useState('00:00:00'); // 修正：統一?��??�為 HH:MM:SS ?��?

  // ?��? themeId ??unitId ?��? unit key
  const getUnitKey = (themeId: string, unitId: string): string => {
    return `t${themeId}-u${unitId}`;
  };

  const currentUnitKey = getUnitKey(themeId || '1', unitId || '1');
  const isCompleted = isUnitCompleted(currentUnitKey);
  const stats = getProgressStats();

  // ?? ?�能?��?：緩存�?件�??�函??  const handleMarkComplete = useCallback(() => {
    console.log(`?�� [FIXED] 標�?完�? - ?��?學�?秒數:`, learningSeconds);
    
    // ?�� ?��?：�??��?止�??�器
    setIsTimerActive(false);
    
    // 使用?��???learningSeconds 作為?�終�???    const finalSeconds = Math.max(learningSeconds, 1); // ?��?�?    
    console.log(`?? [FIXED] ?�終學習�??? ${finalSeconds}秒`);
    
    // ?��??��?終顯示�??�為 HH:MM:SS ?��?
    const finalHours = Math.floor(finalSeconds / 3600);
    const finalMinutes = Math.floor((finalSeconds % 3600) / 60);
    const remainingSeconds = finalSeconds % 60;
    
    const formattedHours = finalHours.toString().padStart(2, '0');
    const formattedMinutes = finalMinutes.toString().padStart(2, '0');
    const formattedSecondsDisplay = remainingSeconds.toString().padStart(2, '0');
    const finalTimeDisplay = `${formattedHours}:${formattedMinutes}:${formattedSecondsDisplay}`;
    
    setRealTimeDisplay(finalTimeDisplay);
    
    // ?�� ?��?修改：傳?�精確�?學�?秒數�?markUnitCompleted
    markUnitCompleted(currentUnitKey, finalSeconds);
    
    console.log(`?? [FIXED] 完�??�畫將顯�?`, finalTimeDisplay);
    console.log(`?�� [STORAGE] 已儲存學習�??? ${finalSeconds}秒`);
    console.log(`?��? [TIMER] 計�??�已?�止，isCompleted 將�???true`);
    
    // 顯示完�??�畫
    setCompletionAnimation(true);
    
    setTimeout(() => {
      setCompletionAnimation(false);
    }, 2000);
  }, [learningSeconds, currentUnitKey, markUnitCompleted]);



  const handleNavigateBack = useCallback(() => {
    navigate('/courses/chatgpt-complete-course/learning');
  }, [navigate]);

  const handleNavigateNext = useCallback((nextUnitId: number) => {
    // ?�斷下�??�單?�屬?�哪?�主�?    let nextThemeId = themeId;
    if (nextUnitId >= 6 && nextUnitId <= 10) nextThemeId = '2';
    if (nextUnitId >= 11 && nextUnitId <= 16) nextThemeId = '3';
    if (nextUnitId >= 17 && nextUnitId <= 21) nextThemeId = '4';
    if (nextUnitId >= 22 && nextUnitId <= 26) nextThemeId = '5';
    if (nextUnitId >= 27 && nextUnitId <= 31) nextThemeId = '6';
    
    navigate(`/courses/chatgpt-complete-course/theme/${nextThemeId}/unit/${nextUnitId}`);
  }, [navigate, themeId]);

  const handleNavigatePrev = useCallback((prevUnitId: number) => {
    // ?�斷上�??�單?�屬?�哪?�主�?    let prevThemeId = themeId;
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

  // ChatGPT 課�??��??��? - 完整??31 ?�單??  const units = useMemo(() => ({
    // 第�?章�?�?? ChatGPT ??深入?��??��?    '1': {
      id: 1,
      themeId: 1,
      title: isZhHK ? '?��? 1.1：�?麼是大�?語�?模�? (LLM)�? : 'Unit 1.1: What is a Large Language Model (LLM)?',
      duration: '15?��?',
      type: 'text' as const,
      description: isZhHK ? '?�個課程�??�端，�?紹人工智?�基?��?念�?完整學�?路�??��?建�?學�??��??�方法�? : 'The beginning of the entire course, introducing basic AI concepts and complete learning roadmap, establishing learning goals and methods.',
      content: {
        transcript: isZhHK ? 
          '大�?語�?模�?（Large Language Model, LLM）是一種�?端�?人工?�能（AI）�?式�?經�?海�??�本?��??��?練�?從而學?��??�解?��??�、總結、翻譯人類�?言以�??��??��?複�??��??�相?�任?�。�??�本上說，LLM ?��??�深度學習模?��?它並?��?�?��?��?人�??�義上�??�思考」�??�是?�於極其複�??��??��?算�?來�?測�??��??��??�中?��?來�??�能?�現?��?語。\n\n?�大?�」這個�?彙主要�??�在?�個維度�??��??��?練數?��??��?模�??��??��??��?往來�??��??�網?�廣泛�??��?例�??�含?��??�網?��? Common Crawl ?��?庫�??��??��??��??��?維基?��?；其二是模�??�身?��??�度，即?��??��??��??�」數?��??��??�數?��??�模?�在學�??��?中調?��??�部變�?，數?�可高�??��??��??�更多。\n\nLLM ?�傳�?AI ?�大�??�?�在?�其驚人?�通用?��??�活?�。傳統�?機器學�?模�??�常?�為?��??�特定�?任�??�設計�?例�??��??��??��??�郵件�?濾。然?��?一??LLM ?�能?��??�廣?��??�知識」�??��?多種?�然不�??�任?��?從�?答常識�?題、撰寫�?業�?案�??��??�電?�代碼�??�可?��?一?�基礎模?��??�。\n\n?�人工智?��??�術層級中，LLM ?�於?��?塔�??�端?��?建�??��??�學習�??��?之�?，是深度學�??��??��??��?並利?��?經網絡�??�其計�??��??��??��??��? AI ?��??��?度�?業�??��??��?LLM 專注?��?�?���?測�??��?類人?�本?? :
          'A Large Language Model (LLM) is a cutting-edge artificial intelligence program trained on massive text data to understand, generate, summarize, translate human language and perform other complex text-related tasks.',
        keyPoints: isZhHK ? [
          '清晰了解課�??�大?��??��?構�??��???,
          '確�?你學完�?後可以�??��??��??�?��?例�?：獨立寫?��??��?�?,
          '?�握?�?��??�學習方法�?點樣跟�?課�??�實?��??��?齊�?，�??��?好�??��?'
        ] : [
          'Clearly understand the structure and connections of the six major course units',
          'Establish specific skills you can achieve after learning, such as: independently writing efficient prompts',
          'Master the most effective learning methods and follow practical projects to achieve the best results'
        ]
      },
      nextUnit: 2,
      nextTheme: null,
      completed: false
    },

    '2': {
      id: 2,
      themeId: 1,
      title: isZhHK ? '?��? 1.2：�??�解 LLM' : 'Unit 1.2: ?? Decoding LLM',
      duration: '12?��?',
      type: 'text' as const,
      description: isZhHK ? '?�索LLM?��?建基?�—�?經網絡�?以�?revolutionaryTransformer?��??�核心創?�自注�??��??��? : 'Explore the building blocks of LLM?�neural networks, and the core innovation of the revolutionary Transformer architecture: self-attention mechanisms.',
      content: {
        transcript: isZhHK ? 
          'LLM ?��?建基?�是人工神�?網絡，這是一種模仿�??�大?�中神�??�相互�?��?�傳?�信?�方式�?計�?模�??��??��??�層級�?節點�??��??�括輸入層、輸?�層以�?一層�?多層位於?�者�??��??�隱?�層?�。\n\n?�而�?LLM ?��?實現質�?飛�?，其?�正?��?術�??�在??2017 年被?�出??Transformer ?��??�在 Transformer ?�現之�?，主流�?序�??��?模�?（�?循環神�?網絡 RNN）�??��??��??��??��??�本，這極大地?�制了�?練速度?��??�長?�本?�能?�。Transformer ?��??��??��?並�??��?機制，可以�??��??�整?�輸?��??��?從而能夠利?�現�?GPU ?�強大並行�?算能?��?大�?縮短訓練?��??�\n\nTransformer ?��??�核心是?�獨?��??�自注�??��??�」�?Self-Attention Mechanism）。這個�??�使得模?�在?��?序�?中�??�個單詞�?，能夠�?衡輸?��??�中?�?�其他單詞�?該單詞�??��??��?並給予�??��??�注?��??��??�。這�?模�??��??��??��?語�??��??��??�長距離?��?賴�?係�?從而更深刻?��?�??下�??��?如�??�句子「�??�追?�老�?，�?为�?饿�??�中，自注�??��??�能幫助模�?準確?��?�???��??��?主�??��??�」聯繫起來�??��??�「老�??�。\n\n?��?讓�?經網絡能夠�??��?言，LLM ?�用了「�?嵌入?��?Word Embeddings）�?術�?表示?��??�傳統�?機器學�??��??�能使用孤�??�數字�?�?��每個�?，無法表?��?語�??��?義�?係。�?嵌入?��?每個單詞�?射到一?��?維�??��?空�?中。在?�個空?�裡，�??��??��??��??��?語�?例�??��??�」�??�女?�」�??�「走路」�??��?跑」�??��??��??��??��??��??�這種表示?��?使�?模�??��??��??�單詞�??�細微�?語義?�句法�?係�??��?�???��?言奠�?了數學基礎。\n\n?�種從�?序�??�到並�??��??��?式�?移�??��?年�? AI ?��?突然?�速�??�本?��??��?使�??�海?�數?��?訓練?��??��??��??��?超大規模模�??�為?�能，�?終催?��??��?強大?��???ChatGPT?? :
          'The building blocks of LLM are artificial neural networks, which are computational models that mimic the way neurons in biological brains interconnect and transmit signals.',
        keyPoints: isZhHK ? [
          '神�?網絡：模仿�??�大?��?計�?模�?，�??��?層�?�?,
          'Transformer�?017年�??��??�命?�架構�??�援並�??��?',
          '?�注?��?機制：�?衡�?語�??��??��??��??��??��?賴�?�?,
          '詞�??��?術�?將單詞�?射到高維?��?空�?表示語義?��?',
          '並�??��?：�??��??�並行�?範�?轉移，�??�AI?��?'
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
      title: isZhHK ? '?��? 1.3：�??GPT 演進史' : 'Unit 1.3: ?? GPT Evolution History',
      duration: '10?��?',
      type: 'text' as const,
      description: isZhHK ? '�??ChatGPT?��??�術�?三大要�?，�?�?��?��??��?練方法�??��??�能?�深層含義�? : 'Analyze the three core elements of ChatGPT technology, understanding the deep meaning of its architecture, training methods, and core functions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?�核心�?術可以�??�全�?GPT（Generative Pre-trained Transformer）中得到精確?�解?�。這�??��??�示了其?��??��?練方法�??��??�能?�\n\n變�???(Transformer)：這�??��??��?層�??�術架構�??��?一節?�詳述?�、基?�自注�??��??��? Transformer 模�??�\n\n?��?�?(Pre-trained)：這是 GPT 模�?訓練?��??�第一?�、�??��??�鍵?��?段。在?�個�?段�?模�??�進�??�謂�??�無??��學�??��?消�?來自互聯網、書籍、�?章�?海�??�、未經�?註�??�本?��??�其?��?學�?任�??�常簡單：根?��?段�??��?上�?，�?測�?一?��??�可?�出?��??��??��?符。通�??�數以萬?��??�句子�??��??�個�?程�?模�?不�?學�?了�?法�??��?詞�??��?，�??��?了大?��?世�?常�??��?義�?係�??�至?�步?�推?�模式。這個�?段為模�??��?了�??�廣?��??��??��??�\n\n?��?�?(Generative)：這個�??�述了模?��??��??�能?�——創?��??��?）全?��??��??��??�容?�這�??��?類被稱為?�判?��?模�??��?Discriminative Models）�? AI 形�?對�??�判?��?模�?（�??�於?�本?��???BERT）�?主�?任�??�進�??��??�判?��?例�??�斷一封郵件是?�為?�圾?�件?�而�??��?模�??�能夠�??��?始創作�??��??�新?�句子、段?�、代碼�??�至?��??��??��??�\n\n?��??�大規模?�「�?訓練?��?後�?模�??�常?�進入第�??��?練�?段——「微調」�?Fine-tuning）。在?�個�?段�??�發?��?使用一?��?模�?得�??��?帶�??��?任�?標籤?�數?��?來進�?步�?練模?�。更?��??�是，OpenAI 引入了「�??�人類�?饋�?強�?學�??��?Reinforcement Learning from Human Feedback, RLHF）�?術。在?�個�?程中，人類�?練員?��?模�??��??��?答進�?評�??��?序�?模�??�根?�這�??��?來調?�其行為，使?�輸?�更符�?人�??��??��?例�??��?確地?�循?�令?��?少�?害�?帶�??��??�內容�? :
          'The core technology of ChatGPT can be precisely explained through its full name GPT (Generative Pre-trained Transformer). These three words reveal its architecture, training methods, and core functions.',
        keyPoints: isZhHK ? [
          'Transformer：基?�自注�??��??��?底層?�術架�?,
          '?��?練�??�監??��習海?��??��??�測下�??��?�?,
          '?��?式�??�造全?��??�內容�??�?�於?�別式模??,
          '微調?�段：使?�特定任?�數?��??��?步優??,
          'RLHF：人類�?饋強?�學習�?使輸?�符?�人類�???
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
      title: isZhHK ? '?��? 1.4：�??精�??��?' : 'Unit 1.4: ?�� Smart Choice',
      duration: '14?��?',
      type: 'text' as const,
      description: isZhHK ? '追溯GPT模�??�發展歷程�?了解每�?�?��?��??�術�??��??��??��??��??��?點�? : 'Trace the development history of GPT models, understanding the technical breakthroughs and key capability improvements of each generation.',
      content: {
        transcript: isZhHK ? 
          'GPT 模�??�發展歷程�??�地展示�?OpenAI ?��?術�??�路徑�?每�?�?��?�都?��?模�??��?上實?��?顯�??��?躍。這�?路�?不�??��?術�??�然延伸，�??��?�?OpenAI ?�產?��??�略：�??�建立�??�知識淵?��??�大?�」�??��??��??�聽?��?令」�??�後賦予�??��??��?維度互�??�「�?官」。\n\nGPT-1 (2018)：�??��??�者�?GPT-1 首次?��??��? Transformer ?��??�用?��??��??��?練任?�。�??��? 1.17 ?�個�??��??�當?��?多個自?��?言?��??��?測試中�?得�??�異?�績，�?證�??��??�術路線�??��??�。\n\nGPT-2 (2019)：�??��?模�?訓練?��??�大幅�??��?展現了令人�?訝�??�零�?��學�??��?Zero-shot learning）能?�。這�??��?它可以在沒�?任�??��?任�?範�??��?況�?，�??��?令就完�?一些新任�?，顯示出?�強?��??�能?�。\n\nGPT-3 (2020)：這是一?��?程�?式�?模�?，�???1750 ?�個�??�。其?�顯�??��??�是強大?�「�?�?��學�??��?Few-shot learning）能?��??�只?�?��?示中給出極�??��?幾個�?範�?，模?�就?��??��??�新任�??�模式並?��??��??�\n\nInstructGPT (2022)：�??�說?�是下�?�?��?��?不�?說是一次方?�性�?轉�??�OpenAI ?�現，�??�「�?學」�?模�?並�?總是?��??�」�??��??�」。InstructGPT ?��?引入�?RLHF 訓練?��?，旨?�解�?AI ?�「�?齊」�?Alignment）�?題�??�使模�??��??��?輸出?�符?�人類�??��??�價?��??�這使得模?�極大地?��?了遵循用?��?令�??��?，為 ChatGPT ?��??��?定�??�鍵?��??�\n\nGPT-4 (2023)：GPT-4 不�??��?言?�解?��?輯推?��?準確?��??��? GPT-3.5 ?��?質�?飛�?，更?��??�是，�??�為了�??�「�?模�??��?multimodal）模?�。�?首次?��?了�??��??�以外信?��??��?，能夠接?��??�解?��?輸入，�?如解?��?張�?表�??�容?��?述�?張照?��??�景?�\n\nGPT-4o (2024)：o �?�� "omni"（全?��?，�?誌�? OpenAI ?��?模�?交�?上�??��??�大突破?�GPT-4o ?��??�在?��?神�?網絡模�?中�??�整?��??�本?�音訊�?視覺?��??��??�模?�。這使得�??��?實現近�??��??�、極?�自?��?實�?語音對話，並?��??��?�?��?��?語音?��??�頭?��??��?視覺信息，極大地?��?�?AI 交�??�人類自?��??��?距離?? :
          'The development history of GPT models clearly demonstrates OpenAI\'s technical evolution path, with each generation achieving significant leaps in scale and capabilities.',
        keyPoints: isZhHK ? [
          'GPT-1 (2018)：�??�者�?首次將Transformer?�用?��??��??��?�?,
          'GPT-2 (2019)：�??�零�?��學�??��?，�??��??�性能',
          'GPT-3 (2020)�?750?��??��?程�?，強大�?�?��學�??��?',
          'InstructGPT (2022)：�??�RLHF，解決AI對�??��?',
          'GPT-4 (2023)：�?模�?突破，支?��??��?�?,
          'GPT-4o (2024)：全?��?模�?，�??�整?��??�、音訊、�?�?
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
      title: isZhHK ? '?��? 1.5：�?��? 安全註�?' : 'Unit 1.5: ?���?Secure Registration',
      duration: '13?��?',
      type: 'text' as const,
      description: isZhHK ? '了解OpenAI從�??�利?�究實�?室到AI巨頭?��??�歷程�?以�??�鍵人物?�戰?�決策�? : 'Understand OpenAI\'s transformation from a non-profit research lab to an AI giant, including key figures and strategic decisions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?�橫空出世�?讓其?��??��??��?�?OpenAI 從�??�在人工?�能?�究?��??��?尊敬?��?字�?一躍�??�全?��??�?��??��??�家?�戶?��??��??�\n\n?��??��?�?(2015)：OpenAI ??2015 年由一群�??�?��??��??�共?�創立�??�中?�括 Sam Altman?�Elon Musk?�Greg Brockman ??Ilya Sutskever 等人?�其?�?��?形�??��??��??�利?�究實�?室�??�抱?��??��?大�?使命：確保通用人工?�能（Artificial General Intelligence, AGI）�??��??��?安全?��?責任?�造�??�人類�??��??�被少數巨頭壟斷?��?人�?構�?威�??�\n\n轉�??�微軟�??�略?��?：隨?��?究�?深入，OpenAI ?��??��?練�?尖大?��?言模�??�要極?��?大�?計�?資�??��??��??��??��??��??��??�利組�??�?��??�。為了�?對這�??�戰，OpenAI ??2019 年進�?了�?構�?組�??��?了�?家�???OpenAI LP ?�「利潤�??�」�?capped-profit）公?�。這�??�特?��?構旨?�平衡其追�?科�?使命?�吸引�?業�?資�??�求。�?年�?微�???OpenAI ?��?�?10 ?��??��??��??��?，並?�隨後�?幾年裡追?��??��??��??��??�為?��??��??�戰?��?作夥伴�??�其?��?了�??�??Azure ?��?算�?源。\n\n?�鍵人物：公?��??��?人物?�其?��??��?人兼行政總�? Sam Altman?�在?��? OpenAI 之�?，Altman 以其作為?��??�創企業孵�???Y Combinator 總�??��?歷而�??��??��?孵�?�?Airbnb?�Reddit 等眾多知?��?業。�??��??�在科�??��?影響?��??��??��?導�?，帶??OpenAI 從�??��?究�?構�??�為估值數?��?美�???AI 巨頭?�另一位�??��?注�??��?�?Elon Musk ?��?對公?�發展方?��?安全?��??��??��???2018 年離?��? OpenAI ????��?並在之�??��?了自己�? AI ?�司 xAI?�\n\nChatGPT ?��??��? (2022)：�?�?OpenAI ?�此之�?已�??��?了�??��??��? GPT 模�?，並?�學術�??��??�者社?�中享?��?譽�?但�?�???��??��?層、�??�全?�性�?注�?，是 2022 �?11 ?�發布�? ChatGPT?�其極其?�用?��?話�??��?強大?�能?��?迅速吸引�??�以?��??�用?��?引�?了全?��??�內?��??��? AI ?�潮，並促使 Google?�Meta 等�??�巨頭紛�??�速推?�自己�?競�??? :
          'The emergence of ChatGPT has transformed OpenAI from a respected name in AI research into a global tech focus and household brand.',
        keyPoints: isZhHK ? [
          '?��??�衷 (2015)：�??�利?�究實�?室�?確�?AGI安全?��?人�?',
          '?�略轉�? (2019)：�?組為?�潤上�??�司，平衡使?��??��?',
          '微�??��?�?0?��??��?始�?資�??��?Azure?��?算�?�?,
          '?�鍵人物：Sam Altman (CEO)?�Elon Musk (已離???�Ilya Sutskever',
          'ChatGPT引�?�?(2022)：�??��?層�?引發?��??��?式AI?�潮',
          '行業影響：�?使Google?�Meta等巨?��??�推?�競??
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

    // 第�?章�??�探?��???帳戶設�??��??��?�?    '6': {
      id: 6,
      themeId: 2,
      title: isZhHK ? '?��? 2.1：主介面深度導覽：�?話�?窗、歷?��???(History) ?�設定�?' : 'Unit 2.1: Main Interface Deep Tour: Chat Window, History & Settings',
      duration: '12?��?',
      type: 'text' as const,
      description: isZhHK ? '詳細介紹 ChatGPT 主�??��??�個�?素�??�括對話視�??��??�歷?��??�管?��?設�??�?�能?? : 'Detailed introduction to ChatGPT main interface elements, including chat window operations, history management, and settings functionality.',
      content: {
        transcript: isZhHK ? 
          '?�您首次?�入 ChatGPT ?��??��??�到一?�簡潔而�??��?富�?主�??�。�?�?��個�??��?每個�?素�?幫助?�更?��??�使??ChatGPT?�\n\n對話視�??�整?��??��??��?，�??�螢幕中央。這裡?�您??ChatGPT ?��?對話?�主要�??�。在對話視�??��??��??��??�到?��?輸入框�??�是?�輸?��?題�??�令?�地?�。輸?��??�援多�??��?，您?�以??Shift+Enter 來�?行�??�單純�? Enter ?��??�出訊息?�\n\n左側?��??�含?��?對話歷史紀?�。�?次�?始新對話?��?ChatGPT ?��??��??�建一?�新?��?話�??�。這�?對話?��??��??��??��?，�??��?對話顯示?��?上方?�您?�以點�?任�?一?�歷?��?話�??�新?��?它�?繼�?之�??��?論。\n\n?�左?��?欄�??�部，您?��??�「New Chat?��??��?點�?它可以�?始全?��?對話?��?住�?每個�?話都?�獨立�? - ChatGPT 不�?記�??��?對話中�??�容?�\n\n?��?角�??�人資�??�?��?供�??�帳?��?存�??�這裡?�可以管?��??�、查?�使?��?況�?以�?存�??��?設�??��???ChatGPT Plus ?�戶，這裡?��?顯示?��?訂閱?�?��??�用?��??��??��? :
          'When you first log into ChatGPT, you\'ll see a clean yet feature-rich main interface. Understanding each element of this interface will help you use ChatGPT more effectively.',
        keyPoints: isZhHK ? [
          '對話視�?：�??�核心�??��? AI 對話?�主要�???,
          '?��?輸入框�??�援多�?輸入，Shift+Enter?��?，Enter?�出',
          '歷史紀?��?左側?��?顯示?�?��?話�??��??��?�?,
          'New Chat ?��?：�?始全?�獨立�?�?,
          '?�人資�??�：管?�帳?�、�??��?設�?'
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
      title: isZhHK ? '?��? 2.2：�?話管?��?巧�?如�??��??��? (Rename)?��?�?(Share) ?�刪??(Delete) 對話' : 'Unit 2.2: Conversation Management: Rename, Share & Delete Conversations',
      duration: '10?��?',
      type: 'text' as const,
      description: isZhHK ? '學�?如�??��?管�??��? ChatGPT 對話，�??��??�命?�、�?享�???�刪?��??�要�?對話?? : 'Learn how to effectively manage your ChatGPT conversations, including renaming, sharing links, and deleting unnecessary conversations.',
      content: {
        transcript: isZhHK ? 
          '?��??��?話管?�是?��? ChatGPT 使用體�??��??�。隨?�您使用 ChatGPT ?��??��??��??��?累�?大�??��?話�??�。學?�管?�這�?對話將幫?�您快速找?��?要�?資�??�\n\n?�新?��?對話?��?織�?話�?第�?步。�?設�?況�?，ChatGPT ?�根?��?話�??�頭幾句話自?�命?��?話。�??��??�可以給對話?�更?��?義�??�稱?��??�新?��?對話，只?�將�?鼠懸?�在左側?��??��?話�?題�?，�??�出?��?編輯?�示，然後輸?�新?��?稱。好?�命?��??��??��?使用專�??�稱?�主題�??��?，�??�日?��?記。\n\n?�享對話?�能讓您?�以?��?人�?享您??ChatGPT 對話?�這�??��??��?作、�?學�??��?�?AI 如�?�?��?��??��??�常?�用?��??�享對話，�??��?話�??��?享�?示�?ChatGPT ?��??��??�公?��???��?要�??��??�享?��?話�?變�??��??��?，任何�??��???�人?�可以查?��??�此請確保�?要�?享�??��??��?訊�?對話?�\n\n?�除對話?�能幫助?��??��?話�?表�??��??��??�除對話，�??��?話�??�刪?��?示。�?注�?，�??�刪?��?話�?該�?作無法撤?��??�?��?話內容�?永�?消失?��?此�??�刪?��?要�?話�??��?請�??�而�?行。\n\n建議?�管?��??��??��?要�?案建立�??�?��?話並給�?清晰?�命?��?定�?清�?測試?��??��??��?對話；�??�價?��?對話?��??�匯?��?要內容�? :
          'Effective conversation management is key to enhancing your ChatGPT experience. As you use ChatGPT longer, you\'ll accumulate many conversation records.',
        keyPoints: isZhHK ? [
          '?�新?��?：使?��?案�?稱、主題�??��??�日?��?�?,
          '?�享?�能：�??�公?��??，適?��??��?作�??�學',
          '注�??��?：�?享�?對話變�??��??��?，避?��??��?�?,
          '?�除管�?：�?作無法撤?��??�除?��?三�?,
          '管�?策略：�??�?��??��??��??�、收?��?要內�?
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
      title: isZhHK ? '?��? 2.3：Custom Instructions (?��??�令)：�??��??�個人??AI ?��?，�?每次?��??�貼�? : 'Unit 2.3: Custom Instructions: Create Your Personal AI Assistant',
      duration: '15?��?',
      type: 'text' as const,
      description: isZhHK ? '學�?如�?設�??��??�令，�? ChatGPT ?��?�?��?��?求�??�好，�?供更?�人?��??��??? : 'Learn how to set up custom instructions to make ChatGPT better understand your needs and preferences for more personalized responses.',
      content: {
        transcript: isZhHK ? 
          'Custom Instructions（自訂�?令�???ChatGPT Plus ?�戶?�使?��?強大?�能，�??�許?�為?�?�新對話設�??�設?��??��?訊�??��??�好?�這個�??�就?�是�?ChatGPT 一份「使?��??�」�??�訴它您?�誰?�您?�工作性質，以?�您希�?它�?何�?答�?題。\n\n設�??��??�令?�為?�個主要部?��??��??�您?��??�您希�? ChatGPT 如�??��??�。\n\n?�「�??�您?��??��?，您?�以?��??�人?�景資�??��?如�??��??�業（「�??��??��?體工程師?��??��?業�??��??��?精於機器學�??��??�當?��?案�??�正?��??��??�電?�平?�」�??�學習目標�??�想要學�?Python 程�?設�??��?等。這�?資�?幫助 ChatGPT ?�解?��?身份?��?求。\n\n?�「您希�? ChatGPT 如�??��??��??��?，您?�以設�??��??�風?��??��??�好?��?如�??��??��?體中?��?答」、「�?答�?簡�??�瞭，�?超�? 200 字」、「在?��??�術�?題�?，�??��?實�??��?式碼範�??�、「使?��??��?專業?��?調」�??�\n\n?��??�自訂�?令�?例�?\n對於學�?：「�??��?訊工程系二年級學?��?�?��學�?資�?結�??��?算�??��??�淺顯�??��??��?�??概念，並?��? Python 程�?碼�?例。」\n對於專業人士：「�??�產?��??��?負責 B2B SaaS ?��??�在討�??�業策略?��?請�??�於實�??��??��??��??�酬?��??�。」\n\n記�?，�??�設定�??��??�令，�??��??�到?�?�新?��?話中，�?不�?影響?��??��?話。您?�以?��?修改?��??�這�??�令?? :
          'Custom Instructions is a powerful feature available to ChatGPT Plus users, allowing you to set default background information and response preferences for all new conversations.',
        keyPoints: isZhHK ? [
          '?�大設�?：「�??�您?��?供個人?�景，「�??��?好」設定風??,
          '?�人?�景：職業、�?業�??�、當?��?案、學習目�?,
          '?��??�好：�?言?�長度、格式、�?調�?設�?',
          '實�??�用：為學�??��?業人士�?不�?角色客製??,
          '使用範�?：�?套用?�新對話，可?��?修改?��???
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
      title: isZhHK ? '?��? 2.4：�?�?App ?��??�能：�??��?話�??��?辨�?實戰' : 'Unit 2.4: Mobile App Exclusive Features: Voice Chat & Image Recognition',
      duration: '13?��?',
      type: 'text' as const,
      description: isZhHK ? '?�索 ChatGPT ?��??�用程�??�獨?��??��??�括語音對話?��??�辨識�??��?行�?裝置使用體�??? : 'Explore the unique features of ChatGPT mobile app, including voice conversations and image recognition, enhancing mobile device user experience.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?��??�用程�??��?了網?��??��??��??�特?�能，�??�可以更?�然?�更便利?��? AI 互�??�這�??�能?�別?��??�移?�中使用，�??�您?�要更?��??�更?��??�交流方式�??�\n\n語音對話?�能?��?�?App ?�亮點�?一?�這個�??��??�可以直?��? ChatGPT ?��?語音對話，就?��??�人?�天一�?���?使用語音?�能，只?�點�?訊息輸入框�??�麥?�風?�示，然後�?始說話。ChatGPT ?��??��?語音轉�??��?字�??��?後�?以�??��??�您?�\n\n語音對話?�優?��??��?�?��?��?，適?��?駛�??��??�使?��??�自?��?交�??��?，特?�適?�練習�?言?�進�??��??�想；�?高�??��?說話?�常比�?字更快�?多�?言?�援，可以練習�??��?言?�發?��?對話?�\n\n?��?辨�??�能讓您?�以上傳?��?並�? ChatGPT ?��??��?述�??�內容。這個�??�在很�?實�??�景中都?�常?�用：�??��??�、�??��??��?；解讀?�表?��?件�??�寫筆�?；�??��?術�??��?建�?；�??��?覺�?礙用?��?�???�內容。\n\n要使?��??��??��?點�?訊息輸入框�??�相機�?示�??��??��??�照?��??�簿?��??��??��??��?，您?�以詢�? ChatGPT ?�於?��??�任何�?題�?例�??�這是什麼�??��??��??��??�述?�張?��??�內容」。\n\n使用?�巧�?確�??��?清晰，避?�模糊�??��?不足；�?供具體�??��?，而�??�只?�「這是什麼�??��?對於複�??��?，可以�??�您?��?�???��??��?；利?��??��??�學習新?��?，�?如�??�建築風?��??��?流派?? :
          'The ChatGPT mobile app provides unique features not available in the web version, allowing for more natural and convenient AI interaction.',
        keyPoints: isZhHK ? [
          '語音對話：麥?�風?�示?��?，�??��??��??��??��???,
          '語音?�勢：解?��??�、自?�交流、�?高�??�、�?語�??�援',
          '?��?辨�?：�??�照?��? ChatGPT ?��??��?述內�?,
          '實用?�景：�??�物?�、解讀?�件?��??��?術、�??��???,
          '使用?�巧�?清晰?��??�具體�?題、�?定部?�、學習�???
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
      title: isZhHK ? '?��? 2.5：探�?GPT Store：�?何�??�、�?估�?使用?�人建�??�優秀 GPTs' : 'Unit 2.5: Exploring GPT Store: Finding, Evaluating & Using GPTs',
      duration: '14?��?',
      type: 'text' as const,
      description: isZhHK ? '深入了解 GPT Store ?�使?�方法�?學�?如�??�到?��??�自�?GPT，並?��?評估?�使?��??��? : 'Deep dive into GPT Store usage, learn how to find suitable custom GPTs and effectively evaluate and use them.',
      content: {
        transcript: isZhHK ? 
          'GPT Store ??OpenAI ?�出?��??��??�平?��?類似?��?機�? App Store，�?專�??�於?�享?�發?�自訂�? GPT ?�用程�??�這個平?��??��??��??�發?��??��??�可以建立�??�?��? AI ?��?，並?�其他用?��?享。\n\n要進入 GPT Store，您?�要是 ChatGPT Plus 訂閱?�戶?�在 ChatGPT 介面中�?點�?左�?角�??�Explore GPTs?��??�新對話中選?�「GPT Store?�選?�。進入後�??��??�到?�種?��???GPT，�??��??�產?�工?�、�??�助?�、創?�寫作、�?式設計、�?言學�?等。\n\n尋找?��???GPT ?�幾?��??��?\n\n使用?��??�能：直?��?尋�??��?，�?如「Python 程�?設�??�、「簡歷撰寫」�??��?言翻譯?�。\n\n?�覽?��?：GPT Store �?GPT ?�為不�?類別，您?�以?��??�求瀏覽?��??��??�\n\n?��??��??�推?��?平台?�推?�熱?�?��??�質??GPT，這�??�常?��??��?證�??��??�用?�\n\n評估 GPT ?�質?��??��?標�?\n\n?�戶評�??��?論�??��??��??�戶?��??��?使用經�??�\n\n?�發?��?訊�?了解?�建?��??�景?��?業�?度。\n\n?�能?�述：�?細閱讀 GPT ?��??�說?��?使用案�??�\n\n?�新?��?：�??�更?��? GPT ?�常維護得更好。\n\n使用 GPT ?��?佳實踐�?\n\n?�閱讀使用說�?：�???GPT ?��??��??�使?�方法�??�令?��??�\n\n測試?�本?�能：�??�簡?��??��?測試 GPT ?�響?��?質。\n\n了解?�制：�???GPT ?��??��??��??��??�制，�?�?���??�助?�更好地使用?�\n\n?��?清晰?�令：就?�使?��?�?ChatGPT 一�??清晰?��?令�??��??�好?��??��? :
          'GPT Store is a marketplace platform launched by OpenAI, similar to a mobile App Store, but specifically for sharing and discovering custom GPT applications.',
        keyPoints: isZhHK ? [
          'GPT Store：OpenAI 市�?平台，�? ChatGPT Plus 訂閱',
          '尋找策略：�?尋�??��??�瀏覽?��??�查?�熱?�?�薦',
          '評估?��?：用?��??�、�??�者�?訊、�??��?述、更?�頻??,
          '使用實�?：閱讀說�??�測試�??�、�?�???�、�??��?�?,
          '?��?範�?：�??��??��??�、創?�、�?式設計、�?言學�?'
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

    // 第�?主�?：�?令�??��? (Prompt Engineering)
    '11': {
      id: 11,
      themeId: 3,
      title: isZhHK ? '?��? 3.1：優質�?令�??�大?�石：�???(Role)?�任??(Task)?��?�?(Context)?�格�?(Format)' : 'Unit 3.1: Four Pillars of Quality Prompts: Role, Task, Context, Format',
      duration: '32?��?',
      type: 'interactive' as const,
      description: isZhHK ? '學�?構建高�??�示詞�??�大?��?要�?，建立系統性�? Prompt 設�?框架?? : 'Learn the four core elements for building effective prompts and establish a systematic prompt design framework.',
      content: {
        transcript: isZhHK ? 
          '?�質??Prompt 設�??��??�核心基?��?角色 (Role)?�任??(Task)?��?�?(Context) ?�格�?(Format)，簡�?RTCF 框架?�\n\n**角色 (Role)**：�?確�?�?ChatGPT ?�該?��??��??��?身份?��?如�??��??��?位�?深�?市場?�銷專家?�、「�??��??��?驗�?富�?程�?設�?師」�??�扮演�?位耐�??�英語老師?�。�??�設定幫??AI 以特定�?專業視�??��?調�??��??�\n\n**任�? (Task)**：�?楚說?��?希�? AI 完�??�具體任?�。任?��?述�?該具體、�?確�??��?模�??�表?�。�?如�??�幫?�撰寫�?份產?�發布�??�新?�稿?�而�??�幫?�寫點東西」。\n\n**?�絡 (Context)**：�?供相?��??�景資�??��??��?件�??��?要�??�這�??�目標�??�、使?�場?�、特殊�?求�??��?如�??�這份?��?稿�??�送給科�?媒�?，�?點強調產?��??�新?��?字數?�制??500 字以?�」。\n\n**?��? (Format)**：�?定�??��?輸出?��??��?構。�?如�??��?以�??��??��?形�??�、「用表格形�??��??��??��??��??�段?��?每段不�???100 字」。\n\n實�?對�?：\n\n**差�? Prompt**：「幫?�寫?��??�」\n\n**好�? Prompt**：\n- **角色**：�??��?位�?業�??�目管�?顧�?\n- **任�?**：為?�制定�??�為??3 ?��??��??��??��??��??�\n- **?�絡**：�?�?10 人�?軟�??�發?��?，�?點�??��?端�??��??�戶體�?設�??��?，�?算�??�在 50,000 ?�內\n- **?��?**：�?以�??�軸形�??�現，�??�具體�??��??�容?��??��??��??��??��?' :
          'Quality Prompt design has four core pillars: Role, Task, Context, and Format, known as the RTCF framework.',
        keyPoints: isZhHK ? [
          '角色 (Role)：�?確�?�?AI ?�扮演�?身份?��?業�?�?,
          '任�? (Task)：�?楚說?��??��??��??��?任�?',
          '?�絡 (Context)：�?供�??��?訊、�??��?件�??��?要�?',
          '?��? (Format)：�?定�??��?輸出?��??��?�?,
          'RTCF 框架：系統性�? Prompt 設�??��?'
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
      title: isZhHK ? '?��? 3.2：�??�扮演�?：�? ChatGPT ?�為你�?私人律師?��?式設計師?��??��?�? : 'Unit 3.2: Role-Playing Method: Make ChatGPT Your Personal Expert',
      duration: '28?��?',
      type: 'interactive' as const,
      description: isZhHK ? '?�握角色設�??�巧�?�?ChatGPT 以�?業身份�?供更精�??�建議�?�???? : 'Master role-setting techniques to make ChatGPT provide more precise advice as a professional.',
      content: {
        transcript: isZhHK ? 
          '角色?��??��? ChatGPT ?�揮專業?��??��??��?巧。通�?設�??��??��??��?AI ?�以該�?業�?視�??�知識�?語�?風格來�??��??��?題。\n\n**?��??��??�設定�?素�?**\n\n1. **專業?�景**：�?確�??��?業�??��?經�?水平\n   - ?��??��?位�? 10 年�?驗�?心�?治�?師」\n   - ?�以資深財�??��?師�?身份?�\n\n2. **?�格?�質**：�?述�??�風?��??�性特點\n   - ?�耐�?且�??�解?��??��?念」\n   - ?�直?��?注�?實用?�」\n\n3. **工�??��?**：說?��??��?題�??��?\n   - ?�總?��?供具體�?步�??��?例」\n   - ?��?歡用類�?來解?�抽象�?念」\n\n**實用角色範�?�?*\n\n**?�業顧�?角色**：\n?��??��?位�?驗�?富�??�業策略顧�?，�??�幫?�中小�?業解決�??��?題。�??��?答總?��?構�??��??��??��??��?，然後�?�?2-3 ?�具體�?�?��?��?，並評估每個方案�??�缺點。」\n\n**程�?設�?導師角色**：\n?��??��?位�?深�?軟�?工�?師�?編�?導師，�?精於 Python ?�網?��??�。�?�??程�?碼�??�由淺入深�??�說?�整體�?念�??�逐步�??細�?，並?�主?��??�常見�??�誤?��?佳實踐。」\n\n**?��?寫�??�練角色**：\n?��??��?位獲?��??��?寫�??�練，�??��??��??��??��??��?結�??��??��?了解寫�??��??�目標�??��??��??��??��??�改?�建議�?並解?��??�建議�?後�?寫�??��??��? :
          'Role-playing is a key technique for unleashing ChatGPT\'s professional capabilities. By setting specific roles, AI will respond with that professional\'s perspective, knowledge, and communication style.',
        keyPoints: isZhHK ? [
          '專業?�景：�?確�??��??��?經�?水平',
          '?�格?�質：�?述�??�風?��??�性特�?,
          '工�??��?：說?��??��?題�??��?',
          '角色一?�性�?確�??�個�?話中保�?角色設�?',
          '細�?豐�?：�??��??��??�設定�??��?�?
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
      title: isZhHK ? '?��? 3.3：�?例�?導�? (Few-Shot Prompting)：給�?AI 範�?，�?它模仿�??�風?? : 'Unit 3.3: Few-Shot Prompting: Give AI Examples to Mimic Your Style',
      duration: '26?��?',
      type: 'interactive' as const,
      description: isZhHK ? '學�?使用範�?來�?�?AI ?��?符�??��?風格?�格式�??�容?? : 'Learn to use examples to guide AI in generating content that matches specific styles and formats.',
      content: {
        transcript: isZhHK ? 
          'Few-Shot Prompting ?��?種強大�??�巧�??��??��?少�?（通常 1-3 ?��?高質?��?範�?，�?引�? ChatGPT ?�解你�??��?輸出風格?�格式�??�質?�\n\n**Few-Shot Prompting ?�工作�??��?**\n\nAI 模�??�長模�?識別?�當你�?供具體�?例�?，模?��??��?範�?中�?模�??��?構、�?調�??�容?��?，然後在?��??��?中�??�這�?模�??�\n\n**?��?範�??�特徵�?**\n\n1. **�?��??*：�?例�?該�??��??��??��??�輸?�特點\n2. **多樣??*：�??��?供�??��?例�??�涵?��??��?況\n3. **完整??*：�?例�?該是完整?��??�含?�?��?要�?素\n4. **清晰??*：�?例�??��??��?構�?清�??��?\n\n**實�??�用範�?�?*\n\n**?�件寫�?範�?�?*\n?��??��?以�?範�??�風?��??��?，為?�寫一封客?��??�郵件�?\n\n範�?：\n主旨：�??�您?�產?�諮�?- 後�?討�?\n\n親�??�張?��?，\n\n?��??�昨天抽空�??��?論貴?�司?�數位�??��?求。根?��??��?談話，�??��?了以下�?點�?\n\n???��??�戰：�??��?程�??��?下\n???��??��?：自?��??��?業�?流�?\n???��?範�?�?0-100?��?\n\n?�們�?�?��?��??�以幫助?��?\n1. 減�? 70% ?��??��?業�??�\n2. ?��??��?準確?�\n3. ?��??��??��??�本\n\n建議下週�??�具體�??��?展示，您?��?何�?\n\n?�佳�??��?\n?��??�」\n\n?�在請為?�寫一封給?�總???跟進郵件�??�容?��??�培訓�??��?討�??��? :
          'Few-Shot Prompting is a powerful technique that uses a small number (usually 1-3) of high-quality examples to guide ChatGPT in understanding your expected output style, format, and quality.',
        keyPoints: isZhHK ? [
          '模�?識別：AI ?��??��?範�?來�?�???��?輸出模�?',
          '範�?質�?：代表性、�?�?��、�??�性、�??��?,
          '?��??�中：通常 1-3 ?��?例�??��?',
          '風格一?��?範�??�該體現一?��?風格?��?�?,
          '?��?規�?：�?楚�?結�?�?AI ?�容?�模�?
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
      title: isZhHK ? '?��? 3.4：思維?��?�?(Chain of Thought)：�?�?AI 一步步?�考�?�?��複�??��?' : 'Unit 3.4: Chain of Thought: Guide AI to Think Step by Step',
      duration: '30?��?',
      type: 'interactive' as const,
      description: isZhHK ? '?�握?�維?��?巧�?引�? AI ?��??�輯?��??��??��?題解決�? : 'Master chain of thought techniques to guide AI in logical reasoning and complex problem solving.',
      content: {
        transcript: isZhHK ? 
          '?�維??(Chain of Thought) ?��?種�?�?AI 展示?��??��??��?巧�??�別?�用?��?要�?步�??�考�?複�??��??�\n\n**?�維?��??��?概念�?*\n\n不�?�?AI ?�接給出?�終�?案�??�是要�?它�?示思考�?程�??�步?��??��??�考慮?�種?��?，�?後�??��?論。這種?��??�顯?��?高�??��?題�?�?��質�??�\n\n**觸發?�維?��??�鍵詞句�?*\n\n???��?一步步?��??�\n???��??�們逐步?�考這個�?題」\n???��???..?��?...?��?..?�\n???��?展示你�??��??��??�\n???��?步�?�?��?�個�?題」\n\n**?�維?��??�用?�景�?*\n\n1. **?�學?��?輯�?�?*\n2. **?�業決�??��?**\n3. **?��?診斷?�解�?*\n4. **複�??��??�任??*\n5. **多�?素考�??�選??*\n\n**實�??�用範�?�?*\n\n**?�業?��??��?�?*\n?��??�網路�?店銷?��??��? 30%，�?一步步?��??�能?��??��?並�??�解決方案。�?展示你�?完整?�考�?程。」\n\nAI ?�思維?��??��??�含：\n1. ?��??��??�數?��??�\n2. ?�能?��??��?類�??�部/外部?��?）\n3. 每個�??��??�能?��?估\n4. �?��?��??�制定\n5. 實施?��??��??��??�\n\n**?�術�?題解決�?**\n?��??�網站�??�速度很慢，�?一步步診斷?��?並�?供優?�建議。」\n\n?�種?��?�?AI ?��?業顧?��?�?��考�??��??��??�輯?��?說�??��?答�??? :
          'Chain of Thought is a technique that guides AI to show its reasoning process, particularly useful for complex problems requiring multi-step thinking.',
        keyPoints: isZhHK ? [
          '?�步?��?：�?�?AI 展示完整?�思考�?�?,
          '觸發詞句：「�?步步?��??�、「�?示推?��?程�?,
          '?�用?�景：數學�?輯、�?業決策、�?題診?�、�??��???,
          '?��?質�?：顯?��??��??��?題�?�?��?�質',
          '?�輯?�強：�? AI ?��?業顧?��?�?���?
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
      title: isZhHK ? '?��? 3.5：迭�??追�?：�?何透�?追�?，�? 60 ?��?答�??��???95 ?? : 'Unit 3.5: Iteration & Follow-up: Optimise from 60-point to 95-point Answers',
      duration: '24?��?',
      type: 'interactive' as const,
      description: isZhHK ? '學�?如�??��??��??�追?��?迭代來�??�優??AI ?��?答質?��? : 'Learn how to continuously optimise AI response quality through effective follow-up and iteration.',
      content: {
        transcript: isZhHK ? 
          '很�???AI ?�在第�?次�??�中就給?��?美�?答�??�迭�??追�??��??�通�?案�??�為?��?答�??��??��?巧。\n\n**迭代?��??�基?��??��?**\n\n第�?次�??��??�常?��??�良好�?起�?，�?往往缺�?深度?�具體性�??��??�。通�?系統?��?追�?，可以�?�?AI 深入?��??��??�細節?�調?��?度。\n\n**?��?追�??��??��?**\n\n1. **深度?��?**：「�??�詳細地�??第�?點」\n2. **?��??��?�?*：「�??��??��??�數字�?範�??�\n3. **不�?角度**：「�??�戶?��?度�??��??��?什麼考慮？」\n4. **實用?�強??*：「�?給出?��??�執行�??��?步�??�\n5. **?�質?��?**：「�?讓這個建議更?��?業�??�說?��??�\n\n**迭代?��??�實?��?程�?**\n\n**?��??��?**：「�??��??��??��?工�??��?，�?什麼建議�??�\n\n**第�?次�???*：AI 給出一?�性�?建議清單\n\n**追�? 1**：「�??��?軟�??�發?��?，�?供更?��??��??��??�方法」\n\n**追�? 2**：「�??��??�方法�?供實?��??��?步�??��??��??�」\n\n**追�? 3**：「考慮?��??�是 10 人�?小�??��??��??��?，�?調整?��?建議?�\n\n**追�? 4**：「�??��?一??3 ?��??�實?��??�表?�\n\n**高�?追�??�巧�?**\n\n??**角色轉�?**：「�??��??��??��?競爭對�?，�?如�??��??�個�??��??�\n??**?��?模擬**：「�??��?算�?�?50%，�??��?何調?�建議�??�\n??**質�?檢�?**：「�??�判?�地?��??�個方案�?潛在缺�??�\n??**?�新要�?**：「�??��?一些別人�?太�??�到?�創?�方法�? :
          'Rarely can AI provide perfect answers in the first response. Iteration and follow-up are key techniques for elevating ordinary answers to excellent ones.',
        keyPoints: isZhHK ? [
          '迭代?��?：第一次�??�是起�?，�?要系統性追?�優??,
          '追�?策略：深度�??�、具體�??��??��?度、實?�性、�?質�???,
          '?��?流�?：�?始�?題�?一?��??��??��?追�??�細節完�?',
          '高�??�巧�?角色轉�??��?境模?�、質?�檢驗、創?��?�?,
          '?��?顯�?：�? 60 ?��?案�??�到 95 ?��?業水�?
        ] : [
          'Iteration Principle: First response is starting point, requires systematic follow-up optimization',
          'Follow-up Strategies: Deep digging, specification, different angles, practicality, quality enhancement',
          'Optimization Process: Initial question ??General response ??Specific follow-up ??Detail refinement',
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
      title: isZhHK ? '?��? 3.6：�?令�??�庫：�?�?20+ ?�常?��??��?令�??��??�學?�用' : 'Unit 3.6: Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',
      duration: '18?��?',
      type: 'resource' as const,
      description: isZhHK ? '?��?精�?設�??��?示�?範本庫�?涵�??�種常�?使用?�景?? : 'Access a carefully designed prompt template library covering various common use cases.',
      content: {
        transcript: isZhHK ? 
          '?�裡?��? 20+ ?��??�實?��?證�? Prompt 範本，涵?��?業、學習、創?�、�?術�??�個�??�。\n\n**?�業?�景範本�?*\n\n**?�業計�??�撰�?*：\n?��??��?位�?驗�?富�??�業策略顧�?，�???[?��?/?��??�稱] ?�寫一份�?業�??�書?��??��?市場?��??�競?�優?�、財?��?測、�??��??�。目標�??�是 [?��????��??��?夥伴]，�??��?業�??�說?��??��?調�?篇�??�制??[字數] 字以?�。」\n\n**市場?�究?��?**：\n?�扮演�?深�??��?究�??�師，�?�?[?��?類別/行業] ?��??�面?��??��??�。�??�含：�??��?模、�??�趨?�、主要競?�者、目標客群特徵、�??��?威�??��??�數?�支?��??��??��?並�?供具體�?市場?�入建議?�」\n\n**學�??�景範本�?*\n\n**概念�??**：\n?��??��?位�??�深?�淺?��??�育專家?��???[?��??�眾：�? 12 歲學???��?術�??��??�年人] �?? [複�?概念]?�使?��?活�??��??��?範�?，確�?95% ?�人?�能?�解?�解?��?構�??�本定義?��?活�??��?實�??�用?�常見誤�??清。」\n\n**學�?計�??��?**：\n?��??��?業�?學�?規�?師�??��??��?一??[?��??��?] ??[?�???��??��?] 學�?計�??��??�現況是 [?��?水平]，目標是 [?��??�到?�水平]?��??��?：具體學習內容、�??��??�、�?源推?�、進度檢核點。」\n\n**?��??�景範本�?*\n\n**?��??��?**：\n?��??��?位獲?��??��?總監，�?精於 [?��?調性] 風格?��?案創作。�???[?��?/?��?] ?��? [社群媒�?貼�?/�??標�?/?��??�述]?�目標�??�是 [?��??�述]，�?點�???[?��?�??]，�?調�? [專業/活�?/溫馨]?�」\n\n**?�術場?��??��?**\n\n**程�?碼解??*：\n?��??��?深�?程�?設�?導師，�?詳細�???�段 [程�?語�?] 程�?碼�??��??��??�解?��??�含：整體�?輯、�??�函?��??�、可?��??��?建議?�新?�容?�犯?�錯誤。�??�通�??��??��?言，適??[?�學??中�??�發?�] ?�解?��? :
          'Here are 20+ battle-tested Prompt templates covering business, learning, creative, and technical domains.',
        keyPoints: isZhHK ? [
          '?�業範本：�?業�??�書?��??��?究、�??��???,
          '學�?範本：�?念解?�、學習�??�、�??��???,
          '?��?範本：�?案創作、內容�??�、�??�建�?,
          '?�術�??��?程�?碼解?�、�?題診?�、系統設�?,
          '?�學?�用：拿來就?�用?��??��?範本'
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

    // 第�?主�?：精?��?????高�??�示工�?
    '17': {
      id: 17,
      themeId: 4,
      title: isZhHK ? '?��? 4.1：實?��???(一) ?�容?��?引�?：自?��??��?質�??�社交�?體貼?�、廣?��?案�??��??�件' : 'Unit 4.1: Project 1: Content Creation Engine - Social Media, Ads & Email',
      duration: '35?��?',
      type: 'project' as const,
      description: isZhHK ? '實戰演練：使??ChatGPT 建�??�容?��?工�?流�?，批?��??��?質�??��??�內容�? : 'Hands-on practice: Use ChatGPT to build content creation workflows and generate high-quality marketing content in batches.',
      content: {
        transcript: isZhHK ? 
          '?�容?��???ChatGPT ?�實用?��??��??��?一?�通�?系統?��??��?，�??�以建�?高�??�內容創作工作�?程。\n\n**社交媒�?貼�??��?流�?�?*\n\n1. **?��?調性�?�?*：\n?��??��??��??��?社群管�?專家，�??��?�???��??��?調性�?[溫馨親�?/專業權�?/年�?活�?]，目標�??�是 [詳細?�述]，核心價?�是 [?��??�值]?�」\n\n2. **?�容主�?規�?**：\n?�基?��??��??��?調性�?請為?��??��? 20 ?�社群貼?�主題�?涵�?：產?��?�?30%)?��?業�?�?25%)?�用?��?�?25%)?��??��???20%)?��??�主題�?供具體�??��?角度?�」\n\n3. **?��?貼�??��?**：\n?��??�主題『[?��?主�?]?�創�?3 ?��??��??��? Instagram 貼�??��?求�??��??��??�、�??��??�值�??��??�呼籲。�??�控?�在 150 字以?��??�含 3-5 ?�相??hashtag?�」\n\n**�???��??��?系統�?*\n\n**AIDA 框架?�用**：\n?��???AIDA 模�???[?��??�稱] ?��?�???��?：\n- Attention：用?�撼?�數?��??��??��?注�??�\n- Interest：�??�獨?�賣點�??��?趣\n- Desire：�?繪使?��??��?好�??�\n- Action：�??��?行�??�籲\n字數?�制??100 字以?��?語調�?[?��?要�?]?�」\n\n**?��??�件行銷範本�?*\n\n**歡�?信�???*：\n?�為?��??�用?�設�?5 封歡迎信序�?，�??��??��?註�??�日?�第3天、第7天、第14天、第30天。�?封信?�目?��??�是：歡迎並介紹?��??��?供價?�內容、建立信任、�??��?次購買、培養長?��?係。�? :
          'Content creation is one of the most practical applications of ChatGPT. Through systematic methods, you can build efficient content creation workflows.',
        keyPoints: isZhHK ? [
          '社群貼�?：�??�調?��?義、主題�??�、�??�本?��?',
          '�???��?：AIDA 框架?�獨?�賣點、�??�呼�?,
          '?��??�件：歡迎�??�、價?�內容、�?係培�?,
          '工�?流�?：系統�??��??��??��??��?',
          '?��??�產：�?次性創作�??��?質�??�容'
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
      title: isZhHK ? '?��? 4.2：實?��???(�? 學�??�究?�速器：快?�總結�??�、報?��?並用簡單?��?�??複�?概念' : 'Unit 4.2: Project 2: Learning Research Accelerator - Summarize Papers & Reports',
      duration: '28?��?',
      type: 'project' as const,
      description: isZhHK ? '學�?如�?使用 ChatGPT 快速�??�學術�??��??��?學�??��?究�??��? : 'Learn to use ChatGPT for rapid academic material processing, improving learning and research efficiency.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?�以大�??��?學�??��?究�??��??�別?�在?��?大�??�獻?��??��?念�??�\n\n**學�?論�?總�?流�?�?*\n\n1. **結�??�總�?*：\n?��??�以下�?構總結這�?論�?：\n- ?�究?�景?��?題\n- ?�究?��??�數?�\n- 主�??�現?��?論\n- 實�??�用?��?示\n- ?�究?�制?�未來方?�\n每部?�用 2-3 ?�話概括，總字數?�制??300 字以?�。」\n\n2. **?�鍵概念?��?**：\n?��??�份?�究中�???5-8 ?��??��??��?念�?術�?，並?��??��?念�?供簡潔�?定義?��??��??��??�實?��??��?例�?請�?併說?�。」\n\n**複�?概念簡�??�巧�?**\n\n**層次?�解?��?**：\n?��??��??�層次解??[複�?概念]：\n- �?10 歲孩子�?�??（用?�活比喻）\n- 給�?中�??�解?��??�入?�本?��?）\n- 給大學�??�解?��??�含?�術細節）\n每個層次用 100 字以?�說?�。」\n\n**?��????建�?**：\n?��?�?? [?��?念] ?�以下已?��?念�??��?：[?�出?��?概念]?�用?��??��??��??�述它們�??��????，幫?�建立知識網絡。」\n\n**?�究?��?快速�??��?**\n\n**?��?洞�??��?**：\n?��??�這份市場?��?，�???10 ?��??��??�數?��?察。�??��?察�??��??��??��??�趨?�方?�、可?��??�、�?業含義。�??��??��?序。」\n\n**比�??��?框架**：\n?��?較這兩份�?究報?��??��?點�?製�?對�?表格：\n- ?�究?��?差異\n- 結�?一?�性�??�\n- ?��??�信度�?估\n- 實用?��?較�? :
          'ChatGPT can dramatically improve learning and research efficiency, especially when processing large amounts of literature and complex concepts.',
        keyPoints: isZhHK ? [
          '論�?總�?：�?構�??��??��??��?念�???,
          '概念簡�?：層次�?�???��?活�??�、知識�??',
          '?��??��?：數?��?察、趨?��??�、�?業含�?,
          '比�??�究：異?��??�、可信度評估',
          '?��??��?：快?��??�大?�學術�???
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
      title: isZhHK ? '?��? 4.3：實?��???(�? ?��??��??�夥伴�?從零?��?規�??��??�活?��?程�??�業點�?' : 'Unit 4.3: Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',
      duration: '22?��?',
      type: 'project' as const,
      description: isZhHK ? '?�揮 ChatGPT ?�創?��??��??�助?�進�??�種?��?規�??��?子發?��? : 'Unleash ChatGPT\'s creative potential to assist in various creative planning and idea generation.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?�出?��??��?夥伴，能?�助你�??��?始�??��?種�??��?激?�創?�思維?�\n\n**?��?規�??��?�?*\n\n**?�人?��?程設�?*：\n?��??��?業�?行�??�師，為?�設�?[?��??�] [天數] ?��?行�?程。�??��?好�?[?��??�索/美�?體�?/?�然風�?/?�險活�?]，�?�?[?��?]，�?行�?[?��?]?��??��?：\n- 每日詳細行�?\n- ?��??��?建議\n- ?�地?��?注�?事�?\n- 必�??��?清單\n- ?�選?��?（�?對天�??變�?）」\n\n**活�?策�?專家�?*\n\n**活�?概念?�想**：\n?�為 [?�司/組�?] 策�?一??[活�?類�?] 活�?，目標是 [?��??��?]，�??�者�? [人數]，�?�?[範�?]?��??��?：\n- 3 ?��??�風?��?活�?概念\n- 詳細?��?流�?\n- ?�?�資�??�人?�\n- 風險評估?��?對方案\n- ?��??��?設�??�\n\n**?�業點�?孵�??��?**\n\n**市場機�?識別**：\n?��???[行業/市場] 中被忽�??��??��??�慮以�?趨勢：[?�出?��?趨勢]?��??��?：\n- 5 ?�創?��?業�?子\n- 每個�?子�??��?市場\n- 競爭?�勢?��?\n- ?�步?�業模�?\n- 驗�??��?建議?�\n\n**?��??�維激?��?巧�?**\n\n**?��??�考帽?��?**：\n?�用?�德?�·德?��??��??�考帽?��??��??�個創?��?[?�述?��?]\n- ?�帽（�?實數?��?\n- 紅帽（�??�直覺�?\n- 黑帽（風?��??��?\n- 黃帽（�?極面?��?\n- 綠帽（創?�可?��?\n- ?�帽（思維管�?）」\n\n**SCAMPER ?�新�?*：\n?��???SCAMPER ?��??��??�個想法�?[?��??��?]\n- Substitute（替�??\n- Combine（�??��?\n- Adapt（調?��?\n- Modify（修?��?\n- Put to other use（�??��?\n- Eliminate（�??��?\n- Reverse（逆�?）�? :
          'ChatGPT is an excellent creative partner that can help you plan various projects from scratch and stimulate innovative thinking.',
        keyPoints: isZhHK ? [
          '?��?規�?：個人?��?程、�?算�??�、�??�注?��???,
          '活�?策�?：�?念發?�、執行�?程、風?��?�?,
          '?�業?�新：�??��??�、�?子孵?�、模式設�?,
          '?�維工具：六?�思考帽?�SCAMPER ?�新�?,
          '?��?激?��?系統?�方法�??�創?��???
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
      title: isZhHK ? '?��? 4.4：實?��???(?? 程�?設�?超�??��?：解?��?式碼?�除??(Debug) ?�編寫簡?�腳?? : 'Unit 4.4: Project 4: Programming Super Assistant - Code Explanation & Debugging',
      duration: '40?��?',
      type: 'project' as const,
      description: isZhHK ? '?�使不是程�?設�?師�?也能?�用 ChatGPT ?��??�本?��?式設計任?��??�術�?題�? : 'Even non-programmers can use ChatGPT to handle basic programming tasks and technical issues.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?�強大�?程�?設�??��?，無論�??�新?��??��?業�??�者�??�能從中?��?幫助?�\n\n**程�?碼解?��?家�?**\n\n**?��?�?���??**：\n?��?詳細�???�段 [程�?語�?] 程�?碼�?\n[貼�?程�?碼]\n\n請�?以�??��?�??：\n1. ?��??�能概述\n2. ?��?詳細說�?\n3. ?�鍵概念�??\n4. ?�能?�改?�建議\n5. ?��?學�?資�??�薦\n\n�??要適??[?�學??中�?/高�?] 程度?�解?�」\n\n**演�?法�??�說??*：\n?�解?�這個�?算�??�工作�??��??�含：\n- ?�本?�路?��?輯\n- ?��?複�?度�??�\n- 空�?複�?度�??�\n- ?�用?�景\n- ?�缺點�?較\n- 實�??�用範�??�\n\n**?�錯診斷?��?�?*\n\n**?�誤?��?流�?**：\n?��??��?式出?�以下錯誤�?\n[?�誤訊息]\n\n程�?碼�?\n[?��?程�?碼]\n\n請幫?��?\n1. ?��??�誤?��?\n2. ?��??��??�修復方案\n3. �???��?麼�??�現?�個錯誤\n4. 給出?�防類似?�誤?�建議\n5. ?��?測試驗�??�方法」\n\n**簡單?�本編寫�?*\n\n**?��??�任?�腳??*：\n?��??��?編寫一??[Python/JavaScript] ?�本，�??�是：[?��??�求�?述]?��?求�?\n- 程�?碼�??�詳細註?�\n- ?�含?�誤?��?\n- ?��?使用說�?\n- 給出?��?範�?\n- 說�??�?�?��?賴�?件」\n\n**?��??��??�本**：\n?�編寫�??�腳?��??��? [Excel/CSV/JSON] ?�件，�?要�?\n- 讀?��?件內容\n- ?��? [?��??��??�輯]\n- 輸出?��?結�?\n- ?��??�常?��?\n請�??��??��?範�??�使?��??�。�? :
          'ChatGPT is a powerful programming assistant that can help both beginners and professional developers.',
        keyPoints: isZhHK ? [
          '程�?�??：逐�??��??��?算�??��??��?念說??,
          '?�錯?�助：錯誤診?�、修復方案、�??�建�?,
          '?�本編寫：自?��?任�??�數?��??�、�??�註??,
          '學�??�援：適?��??��?度、�?供學習�?�?,
          '實用導�?：即學即?��?程�?設�?�?��?��?'
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
      title: isZhHK ? '?��? 4.5：實?��???(�? 語�?翻譯?�潤飾大師�??��?多�?語�?精�?翻譯?��?業�??��??��?' : 'Unit 4.5: Project 5: Language Translation & Polishing Master',
      duration: '25?��?',
      type: 'project' as const,
      description: isZhHK ? '?�握 ChatGPT ?��?言?��??��?，實?��?業�??�翻譯�??��?潤飾?? : 'Master ChatGPT\'s language processing capabilities for professional-level translation and copywriting.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?��?言?��??�面表現?�色，能?��?高質?��?翻譯?��?字潤飾�??�。\n\n**專業翻譯?�巧�?**\n\n**?��??�翻�?*：\n?��?將以�?[源�?言] ?��?翻譯??[?��?語�?]：\n[?��??�容]\n\n翻譯要�?：\n- ?��?讀?��?[?��??�述]\n- ?��?風格：[�??/?�正�??�術�??�學?�]\n- ?��??��?：考慮?��??��??�表?��??�\n- 術�??��?：�??��?業�?語�?準確?�\n- 語調保�?：�??��??��??�彩一?�\n\n請�?供翻譯�??��??��?翻譯說�??�」\n\n**多�??�翻譯�?�?*：\n?�為?�段?��??��? 3 ?��??�風?��?翻譯?�本：\n- ?�本 1：直譯�?（�?實�??��?構�?\n- ?�本 2：�?譯�?（�??�自?�表?��?\n- ?�本 3：創?��?（適?�目標�??��?\n並解?��??��??��??��??�適?�場?�。」\n\n**?��?潤飾?��?�?*\n\n**?�面?��?流�?**：\n?��?對以下�?章進�??�面?��??�潤飾�?\n[?��??�容]\n\n?��??��?：\n1. 語�??�拼寫檢?�\n2. ?��?結�??��?\n3. 詞�??��??��?\n4. ?�輯?��?調整\n5. ?��??��??��??�\n\n請�?示�??�修?�並�??修改?��??�」\n\n**風格調整專家**：\n?��??��??��??�風?��? [?�風?�] 調整??[?��?風格]：\n[?��??�容]\n\n調整說�?：\n- ?��?讀?��??�\n- 語調轉�?要�?\n- 專業程度調整\n- ?��??�彩變�?\n\n請�?供調?��??��??��?風格變�?說�??�」\n\n**多�?言?�容策略�?*\n\n**?�地?�建�?*：\n?�為?�入 [?��?市場] 市場，�??��??��? [?��?/?��?] ?��??�容?�地?�建議�?\n- ?��??��??�考�?\n- 語�?表�?習慣\n- ?�銷信息調整\n- 視覺?��?建議\n- ?��??��??��?忌�? :
          'ChatGPT excels in language processing, providing high-quality translation and text polishing services.',
        keyPoints: isZhHK ? [
          '專業翻譯：�?境�??��??��??�適?�、�?語�?�?,
          '多�??��?比�??�譯?��?譯、創?��??�選??,
          '?��?潤飾：�?法校對、�?構優?�、可讀?��???,
          '風格調整：�?調�??�、�??�適?�、�??��???,
          '?�地?��??��??��??��??��??�適?�、�?忌避??
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

    // 第�?主�?：�??��?�?AI ???�人?��? GPT ?��?
    '22': {
      id: 22,
      themeId: 5,
      title: isZhHK ? '?��? 5.1：Advanced Data Analysis (?��??��?大師)：�???Excel/CSV/PDF，進�??��??��??��?表製�? : 'Unit 5.1: Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',
      duration: '35?��?',
      type: 'advanced' as const,
      description: isZhHK ? '學�?使用 ChatGPT ??Advanced Data Analysis ?�能，�??��??��??�種?��??�件?? : 'Learn to use ChatGPT\'s Advanced Data Analysis feature to process and analyze various data files.',
      content: {
        transcript: isZhHK ? 
          'Advanced Data Analysis ??ChatGPT Plus ?�強大�??��??��??��? Excel?�CSV?�PDF 等�?種�?件格式�??��?深度?��??��??�\n\n**?�件上傳?��??��?**\n\n**Excel ?�件?��?**：\n?��?上傳了�??�銷?�數?��? Excel ?�件，�?幫�?：\n1. ?��??��??�基?��?構�?統�?資�?\n2. 識別?�售趨勢?�季節?�模式\n3. ?�出表現?�好�??�差�??��?類別\n4. 計�??�鍵績�??��?（KPI）\n5. ?�建視覺?��?表�?示主要發?�\n6. ?��??��??�售?�具體建議」\n\n**CSV ?��?清�?**：\n?�這�?CSV ?�件?�含客戶?��?，�??�助：\n- 檢查?��?完整?��?一?�性\n- 識別?��??�缺失值\n- ?�現?��?記�?並建議�??�方法\n- 標�??�數?�格式\n- ?�建?��??�質?��??�\n\n**PDF ?�件�??**：\n?��??��??�份 PDF ?��?：\n- ?��??�鍵?��??�統計�?訊\n- 總�?主�??�現?��?論\n- 識別?��?趨勢?�模式\n- ?�歷?�數?�進�?比�??��?\n- 製�??��??�可視�??�表?�\n\n**?��??��?流�?�?*\n\n**?�索?�數?��???(EDA)**：\n?��??�個數?��??��??�面?�探索性�??��?\n1. ?��?概覽?�基?�統計\n2. 變�??��??��?\n3. ?��??��??�\n4. ?�常?�檢測\n5. 缺失?�模式�??�\n6. ?��??��??�\n7. ?�步洞�??��?設」\n\n**?�業?�能?��?**：\n?�基?�這�?業�??��?，�??��?：\n- ?�鍵業�??��??��?\n- 客戶細�??��??��??�\n- 市場趨勢識別\n- ?�入?��??��??�\n- ?�測?��?警�?標\n- 行�?建議?��??�方?��? :
          'Advanced Data Analysis is a powerful feature of ChatGPT Plus that can process Excel, CSV, PDF and other file formats for deep data analysis.',
        keyPoints: isZhHK ? [
          '?�件?�援：Excel?�CSV?�PDF 等�?種格式�???,
          '?��?清�?：�??�性檢?�、缺失值�??�、格式�?準�?',
          '?��??�能：趨?��??�、統計�?算、異常檢�?,
          '視覺?��??��??��??�表?�數?�可視�?',
          '?�業洞�?：KPI 計�??�客?��??�、�?測建�?
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
      title: isZhHK ? '?��? 5.2：Web Browse (實�?網絡?�覽)：�??�即?�網絡�?訊�??��?市場調查?�新?�總�? : 'Unit 5.2: Web Browse: Real-time Web Information for Market Research',
      duration: '30?��?',
      type: 'advanced' as const,
      description: isZhHK ? '?�握 ChatGPT ?�網絡瀏覽?�能，獲?��??��?訊並?��??��??? : 'Master ChatGPT\'s web browsing feature to gather latest information and conduct analysis.',
      content: {
        transcript: isZhHK ? 
          'Web Browse ?�能�?ChatGPT ?��?訪�??��?網絡資�?，大大擴展�??�知識�??��?實用?�。\n\n**實�?資�??��?�?*\n\n**?��???��?�總�?*：\n?��??��?並總結�?天�???[?��?主�?/?�司/行業] ?��??�新?��?\n- ?�出 5-10 條�??��??�新?�\n- 每�??��??��?簡�??��?\n- ?��??��?趨勢?�影?�\n- 識別?�鍵事件?��??��?\n- ?�測?�能?��?續發展\n- ?��??��??��?資�??�業建議?�\n\n**市場?�究?�競?��???*：\n?��?�?[?��?/?��?/行業] ?��?市場調查：\n- ?��??�?��?市場?��??�數?�\n- ?��?主�?競爭對�??��??�\n- 識別市場趨勢?��??�\n- ?��?客戶評價?��?饋\n- 比�?定價策略\n- 總�?市場?�入建議?�\n\n**?�術趨?�追�?*：\n?��?�?[?�術�??�] ?��??�發展�?\n- ?��??�?��??�術�??�\n- ?��??��??�究論�??��??�\n- 識別?��??�公?��??�究機�?\n- 評估?�術�??�度?��??��??�\n- ?�測?��??��??��?\n- ?��??�術�?資建議」\n\n**實用?�用?�景�?*\n\n**?��?決�??�援**：\n?��?幫�??�究 [?�司?�稱/?�票�?��]：\n- ?��??�?��?財�??��??�新?�\n- ?��??�價表現?��??��??�\n- ?��??��?師�?點�?評�?\n- 識別風險?��??��??�\n- 比�??��?業公?�表?�\n- ?��??��?建議?�風?��?估」\n\n**?��?規�??�新**：\n?�為?��? [?��??�] ?��?計�??��??�?��?訊�?\n- ?�詢?��??��?行�??��?要�?\n- ?��??�?��??��??�放?��?\n- ?��??�地天氣?�季節資�?\n- ?�到?�?��?活�??��??�\n- ?��?交通�?住宿?��??�價?�\n- ?��?安全?��??�注?��??��? :
          'The Web Browse feature allows ChatGPT to access real-time web information, greatly expanding its knowledge range and practicality.',
        keyPoints: isZhHK ? [
          '?��?資�?：獲?��??�新?�、報?�、數??,
          '市場調查：競?��??�、趨?��??�、客?��?�?,
          '?�術追蹤�??�?��??�、�?究�??�、發展�?�?,
          '?��??�援：財?��??�、風?��?估、�??��?�?,
          '?�活?�用：�?行�??�、�?件追蹤、實?��?�?
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
      title: isZhHK ? '?��? 5.3：DALL-E 3 ?��??��?：用?��??�造出專業級�??�業?��??�簡?��??��??��?作�?' : 'Unit 5.3: DALL-E 3 Image Generation: Create Professional Business Illustrations',
      duration: '32?��?',
      type: 'creative' as const,
      description: isZhHK ? '學�?使用 DALL-E 3 ?��?高質?��??��?滿足?�種?�業?�創?��?求�? : 'Learn to use DALL-E 3 to create high-quality images for various business and creative needs.',
      content: {
        transcript: isZhHK ? 
          'DALL-E 3 ??ChatGPT ?��??�強大�??��??�工?��??�根?��?字�?述創?�出令人驚�??��?覺內容。\n\n**專業?��??��??�巧�?**\n\n**?�業?��?設�?**：\n?��??��??��?一幅�?業�??��?\n主�?：[?��?業�??�景]\n風格：現�?��簡潔、�?業\n?�彩：�?業�??�色�?[?��?顏色]\n?��?：�???[?��??�業?��?]\n?�途�?網�?首�??�簡?�、�??��??�\n尺寸建議：適?�網?��??�刷使用\n?��??�調：可信、創?�、�??�」\n\n**簡報視覺?��?**：\n?�為?��??�業簡報?��??��?：\n簡報主�?：[主�??�容]\n?��??�眾：[?��??�述]\n設�?要�?：\n- 風格一?�性\n- 清晰?��?覺層次\n- ?��??�影顯示\n- ?��??��?訊息\n- 專業且吸引人\n請�?�?3-5 ?��??��?設�?概念?�\n\n**?��?視覺識別**：\n?��??�設計�??�相?��??��?\nBrand：[?��??�稱?��?位]\n?��?/?��?：[?��??�述]\n?��?市場：[?�眾?�徵]\n?��??�性�?[形容詞�?述]\n視覺風格：[?�代/經典/?�新等]\n?�用?�景：Logo?��?裝、廣?�、社群�?體\n請創作�??��??�精神�?視覺?��??�\n\n**?��??�示詞�?巧�?**\n\n**?�述結�??��?**：\n?��??��? DALL-E 3 ?�示詞�?構�?\n1. 主�??�述（�??��?什麼�?\n2. 風格?��?（�?術風?�、�?覺風?��?\n3. ?�術�??��??��??��??�、色彩�?\n4. ?��??�調（�??�、�??��?\n5. ?�質要�?（�?�??度、�?業�?）\n6. ?�考風?��??��??��?家、設計�?派�??�\n\n**常�??�用?�景**：\n\n**社群媒�??�容**：\n?�為社群媒�?貼�??��??��??��?：\n平台：[Instagram/Facebook/LinkedIn]\n?�容主�?：[貼�??�容]\n視覺風格：�??��?一?�\n尺寸要�?：適?��?平台規�?\n?��?空�?：�??��?題�?標�?位置\n行�??�籲：�?覺�??��? CTA?�\n\n**?�育?��??��?**：\n?�創作�?學用?��?：\n課�?主�?：[?��?課�?]\n學�??��?：[?�學?��?]\n學員程度：[?��?/中�?/高�?]\n視覺要�?：�??�、�??�、�??�深?�\n風格?�好：�??�、�?業、�??�性�? :
          'DALL-E 3 is a powerful image generation tool integrated with ChatGPT that can create stunning visual content based on text descriptions.',
        keyPoints: isZhHK ? [
          '?�業?�用：�??�設計、簡?��??�、�??��?�?,
          '?��??�巧�??�示詞�?構、風?��?定、�?質控??,
          '多�??�景：社群�?體、�??�培訓、�??��???,
          '專業?�質：�?�??度、�?業�??��?視覺?��?',
          '?��??��?：快?�產?��??�設計�?念�??�本'
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
      title: isZhHK ? '?��? 5.4：創建�??�第一??Custom GPT：無?�編�?，�??��??��??�造個人專屬??AI ?�用' : 'Unit 5.4: Create Your First Custom GPT: Build Personal AI Applications Without Programming',
      duration: '28?��?',
      type: 'practical' as const,
      description: isZhHK ? '學�??�建?��? GPT，�??��??�?��? AI ?��?來解決特定�?題�? : 'Learn to create custom GPTs and build specialized AI assistants to solve specific problems.',
      content: {
        transcript: isZhHK ? 
          'Custom GPT 讓�??��??�建專�??��? AI ?��?，無?�編�??��?就能?�造個人專屬??AI ?�用?�\n\n**Custom GPT ?�建流�?�?*\n\n**概念設�??�段**：\n?��??��???Custom GPT：\n?��?：�?�?��什麼�?題�?\n?��??�戶：誰?�使?�這�?GPT？\n?��??�能：主要�?供哪些�??��?\n專業?��?：�?要�?麼�?業知識�?\n互�?風格：正式、�??�、�?術性�?\n?�特?�值�??�其�?GPT ?�差?��?？」\n\n**?��?庫建�?*：\n?�為 Custom GPT 準�??��??�容：\n- 上傳?��??��??��??�\n- ?��?常�??��??��?案\n- 建�?專業術�?詞典\n- ?��??�佳實踐�?例\n- 準�?範�?對話?��??�\n- 設�??��??��?調�?風格?�\n\n**實用 Custom GPT 範�?�?*\n\n**?�業顧�? GPT**：\n?�創建�?業�??�顧?��?\n角色：�?深�?業�??�顧?�\n專長：中小�?業�??�優?�\n?��??��?：�?業�?佳實踐、�?例�?究\n?��?範�?：�??��??�、�??�改?�、�??��??�\n溝通風?��?專業?��?構�??��??��??�\n?��??�能：SWOT ?��??��?業模式設計」\n\n**學�?輔�? GPT**：\n?��??�個人?�學習助?��?\n專業?��?：[?��?學�??��??�]\n?�學風格：循序漸?�、�??��?答\n學�?資�?：�??�、練習�??��??��??�\n評估機制：進度追蹤?�弱點�??�\n激?�系統�?鼓勵?�建議\n?��??��??��?學�??�度調整??��?�\n\n**Creative GPT**：\n?�設計創?�助?��?\n?��??��?：寫作、設計、音樂、影?�\n?��?來�?：大?�創?��??��?例\n?��?流�?：�?構思到?��??��??��?導\n風格多樣：�??��?派�??�法\n?��?模�?：�??�戶?��??��?\n?�質?�制：創?��?估�??��?建議?�\n\n**GPT ?��??�巧�?**\n\n**?�示詞優??*：\n?��???Custom GPT ?�系統�?示�?\n1. 清晰?��??��?義\n2. ?��??��??��?引\n3. ?��??��?規�?\n4. 專業?��??��?\n5. ?�誤?��?機制\n6. ?�戶體�??��??�\n\n**測試?�改??*：\n?�Custom GPT ?�質保�?：\n- 多場?�測試�?話\n- ?��??�戶?��?\n- ?��??��??��??�質\n- ?��??��?庫內容\n- 調整互�?風格\n- ??��使用?��??? :
          'Custom GPT allows you to create specialized AI assistants and build personal AI applications without programming knowledge.',
        keyPoints: isZhHK ? [
          '?�建流�?：�?念設計、知識建設、系統�?�?,
          '?�用範�?：�?業顧?�、學習�?導、創?�助??,
          '?��??�巧�??�示詞�??�、測試改?�、用?��?�?,
          '?��?編�?：�?覺�??�面?��?，簡?��???,
          '?�人?��??��?專屬?�能?�風?�、知識�???
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
      title: isZhHK ? '?��? 5.5：GPTs ?�用?��??��?密�?如�??��?你�? GPT，�??�未來可?��?中獲?? : 'Unit 5.5: GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',
      duration: '32?��?',
      type: 'business' as const,
      description: isZhHK ? '了解 GPT Store ?��?作�??��?學�?如�??��??�推�????Custom GPT?? : 'Understand how GPT Store works and learn to publish and promote your Custom GPT.',
      content: {
        transcript: isZhHK ? 
          'GPT Store ?�創作者�?供�??�享?��??�獲?��?平台，�?�?��?��?機制對�??�發佈至?��?要。\n\n**GPT Store ?��?流�?�?*\n\n**?��??��???*：\n?��??�發佈�???Custom GPT：\n1. 完�? GPT ?�能?�性能\n2. ?�建?��?人�??�稱?��?述\n3. 設�?專業?��?標�?視覺?��?\n4. ?�寫清晰?�使?�說?�\n5. ?��??�面測試?�優?�\n6. 準�?示�?案�??��?例�?話\n7. 設�??�當?��??��?標籤?�\n\n**市場定�?策略**：\n?�找?��???GPT ?�特定�?：\n?��??�戶：�?確�?義使?�者群體\n�?��?��?：�??�具體�??�戶?�求\n競爭?��?：�?究�?似�? GPT ?�用\n差異?�優?��?突出?�特?�能?�價?�\n市場空白：發?�未被滿足�??�求\n?�戶體�?：優?��??��?程�?滿�?度」\n\n**?�容?��???SEO**：\n\n**?�述?��??��?**：\n?�撰寫吸引人??GPT ?�述：\n標�??��?：�??��??��?，簡潔�??�\n?�能介紹：�?楚說?�核心�??��??�勢\n使用?�景：�?述具體�??�用?��?\n?�戶?��?：強調使?�者能?��??�價?�\n?�鍵詞�??��??�入?��??��?詞�?\n行�??�籲：�?導用?�試?��?互�??�\n\n**視覺設�??��???*：\n?��??��?業�? GPT 形象：\n?��?設�?：簡潔、�??�度高、符?��??�\n?�彩?��?：�??��?一?��??��??��??�戶\n視覺風格：�?業性�?親�??��?平衡\n?��?一?�性�??�?��?覺�?素�?調統一\n?�戶認知：容?��?�??記憶?�\n\n**?�廣?��??��??��?**\n\n**社群媒�??�廣**：\n?��??�推�????Custom GPT：\n- ??LinkedIn?�Twitter 等平?��?享\n- ?�建使用?��??��?例�?究\n- ?��??��?社群?��?論\n- ?��?見�?袖�?專家?��?\n- 定�??�享?�新?�改?�\n- ?��??��?示用?��?證」\n\n**?�容行銷**：\n?�建�?GPT ?��?威性�?\n- ?�寫?��??��??��?業�?章\n- 製�??��??��??��?佳實踐\n- ?�辦線�??��??��??��?\n- ?�建影�??��??��?示\n- 建�??�戶社群?�支?�系統\n- ?��??��??��??�更?�」\n\n**?��??�利機�?**：\n\n**?�業模�??�索**：\n?�GPT 變現?�可?�途�?：\n1. ?�接?�費模�?（�??�平?�支?��?\n2. 諮詢?��??�客製�??�發\n3. ?��?課�??��??�內容\n4. ?��??��??��??��??�\n5. ?��??�本?��?業�??�\n6. ?��?洞�??��??��?究�? :
          'GPT Store provides creators with a platform for sharing and potential monetization, understanding its mechanisms is crucial for successful publishing.',
        keyPoints: isZhHK ? [
          '?��?準�?：�??��??�、�?述優?�、�?覺設�?,
          '市場定�?：目標用?�、差?��??�競?��???,
          'SEO ?��?：�??��?策略?��?述�?案、�?尋可見度',
          '?�廣策略：社群�?體、內容�??�、用?��?�?,
          '?�利機�?：�??��??�模式、�?業�?作可??
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

    // 第六主�?：�??�未�????�用?�倫�??��???    '27': {
      id: 27,
      themeId: 6,
      title: isZhHK ? '?��? 6.1：AI ?�「幻覺」現象�?如�?識別並查�?AI ?��??��??��?�? : 'Unit 6.1: AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',
      duration: '25?��?',
      type: 'critical' as const,
      description: isZhHK ? '了解 AI 幻覺?�象?��??��?學�?識別?��?�?AI 輸出?��?實性�? : 'Understand the causes of AI hallucination and learn to identify and verify the authenticity of AI outputs.',
      content: {
        transcript: isZhHK ? 
          'AI?�幻覺」是?�人工智?��??��?似�??��?實�??�誤?��?構�?資�?，�?�?��個現象�?負責任地使用 AI ?��??��??�\n\n**AI 幻覺?��?義�??�徵�?*\n\n**什麼是 AI 幻覺**：\nAI 幻覺?��??��?言模�??��??�足夠�?�?��資�??��?況�?，�??��?以�?度自信�?語調?��??�誤?�誤導�?完全?��??�內容。這�??��?往往?��?法�??�輯上都很通�?，�?人難以�??��??�其?��??�。\n\n**常�??�幻覺�???*：\n1. **事實?�錯�?*：錯誤�??��??�人?�、地點、數?�\n2. **?��?引用**：�?存在?��?究、書籍、�?章�??�\n3. **?�輯?�盾**：�?後�?一?��??�述\n4. **?�度外推**：基?��??��?訊�??��??��?對�?結�?\n5. **混�??��?**：�??�實?��??��?訊混?��??�\n\n**幻覺?��??��??��?**\n\n**?�術層?��???*：\n- 訓練?��??��??��??�差\n- 模�?對�?確�??��??��?不當\n- ?��?機制?�隨機性\n- ?��??�止?��??��??�\n- ?��??��??�中?��?差累積\n\n**識別 AI 幻覺?��?巧�?**\n\n**?�判?�思維檢查**：\n?��?�?AI ?��??�可信度：\n1. 事實?��?：�?要數?��??�述?�要獨立�?證\n2. ?�輯一?�性�?檢查?��??�述?�否?�盾\n3. 來�?追蹤：�?求�?供具體�?資�?來�?\n4. 常�??�斷：�??��??�內容�?要質?�\n5. 專業?��?：在你�??��??��?檢�?準確?�\n6. 多�?驗�?：使?��??��?訊�?源交?��?證」\n\n**實用驗�??��?**：\n\n**事實?��?流�?**：\n?�建立系統性�?驗�?習慣：\n- 對具體數?��?統�?資�?保�??��?\n- 使用?�信?��?實查證網站\n- ?�找?��?資�?來�?\n- 諮詢?��?專家?��?\n- 比�?多�?AI 工具?��??�\n- 使用?��?引�??��?驗�?\n- ?�別注�??��??�爭議性話題」\n\n**風險評估策略**：\n\n**高風?��??�場??*：\n?�在以�??��?下特?�謹?��?\n- ?��??�康建議\n- 法�??�監管�??�\n- 財�??��?決�?\n- 學�??�究引用\n- ?��??��?事�?訊\n- ?�術�??��??��??��?\n- 安全?��??�示?�\n\n**?�佳實踐建�?*：\n\n**負責任使?��???*：\n?�建立健康�? AI 使用習慣：\n1. 保�??�判?�思維\n2. 建�?多�?驗�?機制\n3. 了解 AI ?��??�\n4. ?��?要決策中諮詢專家\n5. ?��?學�??�更?�知識\n6. ?�育他人識別 AI 幻覺?? :
          'AI "hallucination" refers to artificial intelligence generating seemingly reasonable but actually incorrect or fabricated information. Understanding this phenomenon is crucial for responsible AI use.',
        keyPoints: isZhHK ? [
          'AI 幻覺：�??��??�似?��??�AI?��??�容',
          '常�?類�?：�?實錯誤、�?構�??�、�?輯�???,
          '?��??��?：�?練�??�、�?確�??��??�、知識截�?,
          '識別?�巧�??�判?�維?��?實查證、�??��?�?,
          '風險管控：�?風險?�景謹�??��?家諮詢、�?續學�?
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
      title: isZhHK ? '?��? 6.2：數?��??��?安全：�??��?話�??��?？�?何管?��??�數?? : 'Unit 6.2: Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',
      duration: '22?��?',
      type: 'security' as const,
      description: isZhHK ? '了解 AI ?��??�隱私政策�?學�?保護?�人?��?業數?��??�佳實踐�? : 'Understand AI service privacy policies and learn best practices for protecting personal and business data.',
      content: {
        transcript: isZhHK ? 
          '?�使??ChatGPT �?AI ?��??��?了解?��??��??��??�議題�??�人?��?業都?��??��??�\n\n**?��??��??�使??*：\n\n**OpenAI ?�數?�政�?*：\nOpenAI ?�收?�用?��?對話?�容?�於?��??��??�質，�??�幾?��?要考�?：\n- ?�費?�用?��?對話?�能?�於模�?訓練\n- ChatGPT Plus ?�戶?�以?��??�?�數?�收?�\n- 企業?��?供更?�格?�數?��?護選?�\n- API 使用?�數?��??�用?�模?��?練\n\n**?��?風險評估**：\n\n**?�人資�?洩露風險**：\n?��??��??��??��?威�?：\n1. ?�人身份資�? (PII) ?��??�享\n2. ?��??�業資�?洩露\n3. 客戶資�??�聯絡方式\n4. 財�??�醫?��?訊\n5. 密碼?�登?��?證\n6. ?�部?�件?��??�」\n\n**?��?保護?�佳實�?*：\n\n**?�人?�戶?��?**：\n?��?護�??�個人?��?：\n- ?��??�享?�實姓�??�地?�?�電話\n- 不�?供信?�卡?�碼?��?行�?訊\n- 使用?��??�代?�替�??實身份\n- 定�?檢查?��??��?話歷?�\n- ?�用?��?設�??��?\n- 了解?��?保�??��??�\n\n**企業安全策略**：\n\n**?�業?��?保護**：\n?��?業使??AI ?��??��??��?\n1. 建�??�確??AI 使用?��?\n2. 訓練?�工?��??��?\n3. 使用企業級�??�方案\n4. 實施?��??��?系統\n5. 定�??��?安全審查\n6. 建�?事�??��?流�??�\n\n**?��?資�??�代策略**：\n\n**資�??��??��?�?*：\n?��??�地使用 AI ?��?：\n- ??[?�司A] ?�代?�實?�司?�稱\n- ??[客戶B] ?�代?��?客戶信息\n- 使用示�??��??��??�實?��?\n- ?�述?��??��??��?案�?\n- ?�焦?��??��??��?細�?\n- 使用?�用術�??�代專�??��??�\n\n**法�??�循?��?**：\n\n**?��??��?法�?**：\n?��?�?��?��?規�?求�?\n- GDPR（�??��??�數?��?護�??��?\n- CCPA（�?州�?費者隱私�?）\n- ?�人資�?保護法�??�灣）\n- ?��?安全法�?中�?）\n- 行業?��?規�?（�??�、醫?��?）」\n\n**安全工具?�設�?*：\n\n**?��??�制?��?**：\n?�優?��??�隱私設定�?\n1. ?��?對話歷史記�?\n2. 禁用?��??��??�於訓練\n3. 定�??�除對話記�?\n4. 使用?��??�覽模�?\n5. ?�慮使用 VPN ?��?\n6. ??��帳戶活�??�\n\n**事�??��?計�?**：\n\n**?��?洩露?��?**：\n?��??�懷?�數?�洩?��?\n- 立即?�止使用?��??��?\n- 記�??��?估洩?��??�\n- ?�繫?��??��??�\n- ?�知?��??�份?�\n- 實施?�害?�制?�施\n- 檢�??�改?��??�政策�? :
          'When using AI services like ChatGPT, understanding data privacy and security issues is crucial for both individuals and businesses.',
        keyPoints: isZhHK ? [
          '?��??��?：�?解AI?��??�收?��?使用規�?',
          '風險評估：�??�個人?��?業�?訊洩?��???,
          '保護策略：匿?��??��?訊替�?��隱私設�?,
          '企業安全：政策制定、員工培訓、�??�選??,
          '法�??�循：GDPR?�CCPA等隱私�?規�?�?
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
      title: isZhHK ? '?��? 6.3：AI ?��?見�?題�?認�?訓練?��?帶�??��??�影?��?並學習�?何�?�? : 'Unit 6.3: AI Bias Issues: Understanding Training Data Impact and How to Respond',
      duration: '20?��?',
      type: 'ethical' as const,
      description: isZhHK ? '?��? AI ?��??��?源�?影響，學習�??��?減�??��??��??��? : 'Explore the sources and impacts of AI bias, learn strategies to identify and reduce bias.',
      content: {
        transcript: isZhHK ? 
          'AI ?��??��?人工?�能系統?��??��?訊�?表現?��??�平?�歧視性�??��?，�?�?��個�?題�??�於?��?責任?�使??AI?�\n\n**AI ?��??��?�?*：\n\n**訓練?��??��?**：\nAI 模�??��?練數?��??��??�網?��?種�??��?源�??��?資�?不可?��??��??��?人�?社�??��?見�??�板?�象：\n- 歷史?�獻中�??�別?�種?��?見\n- ?��??��??��?�?��?��??�\n- 社�?經�??��??�差?�\n- 語�??�表?�方式�??�好\n- ?�值�??��??��??��??�性\n\n**常�??��?見�???*：\n\n**社�?人口?��?**：\n?��??��??��??��? AI ?��?：\n1. ?�別?��?：職業刻?�印象、能?��?設\n2. 種�??��?：�??�誤�?��歷?��?見\n3. 年齡?��?：�?�?��?�、�?術能?��?設\n4. ?��??��?：西?�中心主義、�??�差?�\n5. 語�??��?：英語優?�、方言歧�?\n6. 經�??��?：�?級�?設、�?費能?�判?�」\n\n**認知?��?**：\n?�AI ?�能複製?�人類�??��?見�?\n- 確�??�誤：�?好支?�既?��?點�?資�?\n- ?��??��?誤�?高估常�?事件?��??�\n- �?��?��?誤�??�度概括小樣?�特徵\n- ?��??�誤：�?度�?賴�?次獲得�?資�?\n- 群�??�維：盲從�??��?見」\n\n**?��?識別?��?*：\n\n**?�判?��?估方�?*：\n?�檢�?AI ?��?中�?潛在?��?：\n1. 多�?度測試�??��??�身份�??�景?��??��?\n2. ?��?驗�?：測試相?��?對�??��?況\n3. ?��??��??��?檢查?�否?�慮不�??��?觀點\n4. 語�??��?：注?�用詞是?��?示刻?�印象\n5. ?��?來�?：質?�統計�?事實?�代表性\n6. 專家諮詢：在不�??��??��?求�?業�?見」\n\n**減�??��??��???*：\n\n**?�示詞優??*：\n?�設計更?�平??AI 互�?：\n- ?�確要�?多�??��?點\n- ?��?使用?�能?�示?��??��?彙\n- 要�??�慮不�??��??��??�\n- 請�?平衡?�客觀?��??�\n- ?�確?�出?�要避?��??��?類�?\n- 要�??��?多種�?��?��??�\n\n**實�??�用**：\n\n**?��??�示詞�?�?*：\n\n**?��??�示**：「�?述�??��??��?企業家」\n**?�良?�示**：「�?述�??��??��??��?企業家�??�括不�??�別?�種?�、年齡�??��?位置?��?子�??��??�板?�象?�\n\n**?��??�示**：「解?�為什麼�?些�?家�?較發?�」\n**?�良?�示**：「�?多個�?度�??��?家發展�?複�??��?，避?�簡?��??��??��?�??，考慮歷史?�地?�、政治、�?濟�?多�??��??�\n\n**組�?層面?��?�?*：\n\n**企業 AI 治�?**：\n?�建立�?責任??AI 使用?��?：\n1. ?��? AI ?��??��?\n2. ?��??��??��??��?\n3. 建�?多�??��? AI 使用?��?\n4. 定�?審查 AI ?�出?�質\n5. 建�??��??�改?��??�\n6. ?��??��?社群保�?對話?�\n\n**?��??��?*：\n\n**學�??�適??*：\n?�培養長?��??��??��?：\n- 定�??�新對�?見�?題�??�解\n- ?��??��??��??��?討�?\n- ?��??��??��?人交流�?驗\n- ?�注 AI ?��??��??�發展\n- 積極?��??�建?�公平�? AI ?��??? :
          'AI bias refers to unfair or discriminatory tendencies in AI systems when processing information. Understanding this issue helps use AI more responsibly.',
        keyPoints: isZhHK ? [
          '?��?來�?：�?練數?�中?�歷?��?社�??��?',
          '?��?類�?：社?�人??���??�、�??��?多種?��?',
          '識別?�巧�?多�?度測試、批?�性�?估、�?家諮�?,
          '減�?策略：�?示�??��??��??��?要�??�平衡�???,
          '組�?治�?：倫�??��??�培訓�??�、�?續改??
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
      title: isZhHK ? '?��? 6.4：�?責任?�使??AI：在學�??�工作�??��?中�??��??�倫�??��?' : 'Unit 6.4: Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',
      duration: '18?��?',
      type: 'ethical' as const,
      description: isZhHK ? '?��??��??��??�使??AI ?�倫�?準�??��?佳實踐�? : 'Explore ethical guidelines and best practices for using AI in different fields.',
      content: {
        transcript: isZhHK ? 
          '負責任地使用 AI ?�要在?�個�??�建立�?確�??��??��?，平衡�?術便?��??�德責任?�\n\n**學�??�究?��?**：\n\n**AI 輔助?�究?��???*：\n?�在學�??��?中使??AI ?�倫�??��?：\n1. ?��?度�??��??�確?��? AI ?�使?��??�\n2. ?�創?�維護�?確�??�究?�獨立思考價?�\n3. 引用規�?：適?��?�?AI ?�助?�部?�\n4. ?�質?�制：人工�?�?AI ?��??�內容\n5. 學�?誠信：避?��? AI 輸出?�接作為?�己?��??�\n6. ?��?審查：接?��? AI 使用?�監???評估?�\n\n**?�接?��?使用?�景**：\n?�學術�?究中 AI ?�適?��??��?\n- ?�獻?��??��?步整?�\n- ?��??��??�模式�??�\n- 語�?潤飾?�格式優?�\n- 概念�???��?論探討\n- ?�究?��??�建議�?討�?\n- 跨學科知識�??��??�\n\n**?�避?��?行為**：\n?�學術�??�使??AI ?��?子�?\n- ?�接複製 AI ?��??��??�段?�\n- ??AI ?�造實驗數?��?結�?\n- 不聲??AI 輔助就�?交�?業\n- �?AI �?��完�??��??�新工�?\n- 使用 AI ?��?不當?��??��?議」\n\n**?�場?�用?��?**：\n\n**專業責任?��?**：\n?�工作環境中??AI 使用?��?：\n1. ?�司?��??�循：�?�?��?��?組�???AI 使用規�?\n2. 客戶?��?保護：確�?AI 使用不�?害客?��??�\n3. 專業?��?維護：�?�?AI ?�代?��?專業?�斷\n4. 資�?安全：避?�洩?��??��??�業資�?\n5. ?�質責任：�? AI 輔助?�工作�??��?責\n6. ?��?學�?：�??��??��??�人專業?��??�\n\n**不�??�業?�考�?**：\n\n**法�?專業**：\n?��?師使??AI ?�倫�??��?：\n- 法�??�究?��?例�??��??�\n- ?�件起�??��?步�??�\n- 客戶諮詢?��??��?究\n- 但�??��??��?�?AI ?��?律判?�\n- 必�?人工驗�??�?��?律建議\n- 保護客戶?��??��?師職業特權」\n\n**?��??�康**：\n?�醫?��?�?AI 使用?�謹?��??��?\n- ?�育?�知識更?��?輔助工具\n- 行政工�??��?檔整?�\n- ?�究?�獻?��?尋�?總�?\n- 絕�??�替�?��床診?�判?�\n- 不�?供具體�?治�?建議\n- ?�格保護??��隱私�?訊」\n\n**?�育?��?**：\n?��?師�??�育工�??��? AI ?��?：\n- 課�??�容?��??��??�究\n- ?�學?��??�創?�探索\n- 學�?評估?��??�工?�\n- ?��?學�???AI 素�?\n- 示�?負責任�? AI 使用\n- ?�止學�??�度依賴 AI?�\n\n**?��??�智?�財?��?**：\n\n**?��??�業?��?**：\n?�創作者使??AI ?�考�?：\n1. ?�創?�聲?��??�確標示 AI ?��??�創作部?�\n2. ?�慧財產權�?了解 AI ?��??�容?��?權�?況\n3. ?��?完整?��?保�??�人?��?風格?��?念\n4. 市場?�平：避?��??�競?�優?�\n5. ?��?尊�?：避??AI 複製?��??��??��?\n6. ?�?�平衡�?維�??�發展個人?��??��??�\n\n**?�業?��??�用**：\n?��?業環境中?�創作倫�?：\n- �???��??�內容�? AI 輔助\n- ?��?設�??��?裝�??��?來�?\n- ?��??�播?�創?�發?�\n- 客戶體�??�優?�建議\n- 但�?保�??��??�實?�\n- ?��?誤�?消費?�」\n\n**建�??�人?��?框架**：\n\n**?��?評估?��?**：\n?�使??AI ?��??��?檢�?：\n1. ?�種使用?�否符�?專業標�?？\n2. ?�是?�能對�??�承?�責任�?\n3. ?�樣?�是?��??��?人�??��?\n4. ?�是?��??��?學�??��??��?\n5. ?�種使用?�否?��??��?實�?\n6. ?��?來�??�否?��??�社?��??? :
          'Responsible AI use requires establishing clear ethical boundaries in various fields, balancing technological convenience with moral responsibility.',
        keyPoints: isZhHK ? [
          '學�??��?：透�??��??��??�維護、�?質控??,
          '?�場責任：政策遵循、�?業判?�、�?訊�???,
          '專業?��?：�?律、醫?�、�??��??��??�特殊考�?',
          '?��??��?：�??�聲?�、智?�財?��??��??��???,
          '?�人框架：自?��?估、責任承?�、�?續學�?
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
      title: isZhHK ? '?��? 6.5：人工智?��??��?：�???GPT ?��?一步發展�?對社?��??��?影響' : 'Unit 6.5: The Future of AI: GPT\'s Next Development and Long-term Social Impact',
      duration: '25?��?',
      type: 'future' as const,
      description: isZhHK ? '?��? AI ?�術�??��??��?趨勢?��?社�??�層?��?潛在影響?? : 'Explore future trends in AI technology and potential impacts on various aspects of society.',
      content: {
        transcript: isZhHK ? 
          '人工?�能�???�快?�發展�?段�?了解?�未來趨?��??�人?�社?��?規�??�具?��?要�?義。\n\n**?�術發展趨??*：\n\n**模�??��??��???*：\n?�未�?GPT ??AI 模�??�可?�發展�?\n1. ?��??��?增強：更複�??��?輯思考�??��?�?��\n2. 多模?�整?��??�本?��??�、聲?�、影?��??�縫結�?\n3. 實�?學�?：�?續�??��?訊中學�??�適?�\n4. ?�人?��?度�??�深度�??�戶?�性�?體�?\n5. 專業?��?工�??��??��??��??�深度�?精\n6. ?�解?�性�?AI 決�??��??�透�??�」\n\n**?�術整?�趨??*：\n?�AI ?�其他�?術�??��?：\n- ?�聯�?(IoT)：智?�家居�??��??�全?��??�\n- ?��?實�? (AR/VR)：�?浸�? AI 交�?體�?\n- ?�塊�?：去中�??��? AI 治�??��??��??�\n- ?��?計�?：�??�性�?計�??��??��?\n- ?�緣計�?：本?��???AI ?��??��?\n- ?��?介面：直?��??�維-AI 交�??�\n\n**社�?影響?�測**：\n\n**工�??�就業�???*：\n?�AI 對�??��??��??��?影響：\n�?��影響：\n- ?��??��?複性工作�??�放人�?從�??��?工�?\n- ?�造新?�職業�??��?工�?機�?\n- ?��??��??�產?��?經�??��?\n- ?��??��??��??��??��??�檻\n\n?�戰：\n- ?��??�統?�業?�能被�?代\n- ?�?��?求快?��??��??�要�?續學習\n- ?��?鴻�??�能?��?社�?不平等\n- ?��??�值�??�義?��??��?義」\n\n**?�育體系轉�?**：\n?�AI ?�代?��??��??��?\n- ?�人?�學習路徑�?節奏\n- AI 輔助?�智?��?學系統\n- ?�?��??�而�??��?記憶?��??�\n- 終身學�??�為常�?\n- ?��??�批?�思維?��??�智?��??��?\n- 跨學科整?�能?��??��??�\n\n**?��??�康?�命**：\n?�AI ?�醫?��??��??��??�用：\n- 精�??�學?�個人?�治?�\n- ?��??��?檢測?��??�\n- ?�物?�發?��??�\n- ?��??��??�健康監測\n- 心�??�康??AI ?�援\n- ?��?資�??�優?��?置」\n\n**?��??�治?��???*：\n\n**?��??��?議�?**：\n?�AI ?��?帶�??�倫�??��?：\n1. AI 權利：當 AI ?��??�能?��??�否?�要�?律�?護�?\n2. 人�??��?：人類�? AI ?��?線在?�裡？\n3. 決�?責任：AI ?�決定�?，誰?��?後�?？\n4. ?��?主�?：個人?��??�控?��?歸屬\n5. 算�??��?：AI 決�??��??�可?�解?�\n6. ?��?人格：�??�身份�??�實身份?��?係」\n\n**?��?治�??��?*：\n?��??��?作�?規�?建�?：\n- AI 安全?��??��?準�??�議\n- 跨�??��?流�??��??�制定\n- AI 軍�??�用?��??�共識\n- ?�術�?移�??��??�享機制\n- ?��?中�?家�? AI ?��?建設\n- ?��? AI ?��?框架?�建立」\n\n**?�人?�社?��?準�?**：\n\n**?�人?��?建設**：\n?�在 AI ?�代保�?競爭?��?\n1. ?��?學�??��??�能?�\n2. 跨�??�知識�??��?\n3. ?��??�創?�思維\n4. ?��??�能?�人?��??�\n5. ?�判?�思考�??�斷?�\n6. ?��?變�??��?活性」\n\n**社�??�度?��?**：\n?�社?�層?��?準�?工�?：\n- ?�育?�度?�全?�改?�\n- 社�?保�?體系?��??�設計\n- 法�?框架?�更?��?完�?\n- 經�?模�??�創?�探索\n- ?��??�值�??�新審�?\n- ?��??��?機制?��?強」\n\n**積極?��??��?**：\n\n**?�為 AI ?�代?��?極�??��?*：\n?��?何在 AI ?��?中發?��??��?\n- 保�?對新?�術�??�放?�度\n- ?��? AI ?��??�政策�?討�?\n- ?��?負責任�? AI ?��?\n- ?��?下�?�?? AI 素�?\n- ?�自己�??��??�索 AI ?�用\n- 促進�?容性�??�術發展」\n\n**結�?：�??��??��?塑造未�?*：\n\n?�人工智?��??��?不是?��??�命?��??�是?�們共?�創?��?結�??�通�?負責任�??�發?��??��??�用?��?積極?��??��??�們可以確�?AI ?�術�?�?��人�?福�??��?，創?��??�更?�智?�、公平、�??��?續�??��??��? :
          'Artificial intelligence is in a rapid development phase, and understanding its future trends is important for both personal and social planning.',
        keyPoints: isZhHK ? [
          '?�術趨?��?模�??��?增強?��?模�??��??��?術�???,
          '社�?影響：就業�??�、�??��??�、醫?�革??,
          '?��??�戰：新?�議題、全?�治?�、責任歸�?,
          '?�人準�?：�?續學習、跨?��??��??��??�智??,
          '積極?��?：�??��?度、倫�?討�??��?容發�?
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

  // ?? ?�能?��?：緩存�??��?�?  const currentUnit = useMemo(() => {
    const unit = units[unitId as keyof typeof units];
    if (!unit) {
      // ?��?一?��?認�??��?結�?以防止錯�?      return {
        id: parseInt(unitId || '1'),
        themeId: parseInt(themeId || '1'),
        title: '?��?不�???,
        duration: '0?��?',
        type: 'video' as const,
        description: '請檢?�單?�ID?�否�?��',
        content: {
          transcript: '?��??�容不�???,
          keyPoints: ['請�??�課程�???]
        }
      };
    }
    return unit;
  }, [units, unitId]);

  if (!currentUnit || currentUnit.title === '?��?不�???) {
    return (
      <div className="min-h-screen chatgpt-unit-page text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">?��?不�???/h1>
          <button
            onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
            className="btn-ai-primary"
          >
            返�?課�?首�?
          </button>
        </div>
      </div>
    );
  }

  const navigationConfig = useMemo(() => {
    const unitNum = parseInt(unitId || '1');
    const isLastUnitOfTheme = (
      unitNum === 5 ||   // 主�?1結�?
      unitNum === 10 ||  // 主�?2結�?  
      unitNum === 16 ||  // 主�?3結�?
      unitNum === 21 ||  // 主�?4結�?
      unitNum === 26 ||  // 主�?5結�?
      unitNum === 31     // 主�?6結�?（課程�??��?
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

  // ?�� 修復?��??�器 - 移除?�?�可?��??�無?�循?��?依賴
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    console.log(`?�� [FIXED] 計�??��?始�?`, {
      currentUnitKey,
      isCompleted,
      forceTimerForTesting,
      shouldStart: !isCompleted || forceTimerForTesting
    });
    
    // ?�� ?��?修復：當?��?已�??��?不在測試模�??��?立即?�止計�???    if (isCompleted && !forceTimerForTesting) {
      console.log(`?��? [FIXED] ?��?已�??��?立即?�止計�??�`);
      setIsTimerActive(false);
      setLearningSeconds(0);
      return; // ?�早返�?，�??��??��?計�???    }
    
    // 決�??�否?��?計�???- ?��??�未完�??�測試模式�??��???    const shouldStart = !isCompleted || forceTimerForTesting;
    
    if (shouldStart) {
      console.log(`??[FIXED] ?��?計�??�`);
      
      // ?�置?�??      setIsTimerActive(true);
      setLearningSeconds(0);
      setRealTimeDisplay('00:00:00');
      setTimerStartTime(Date.now());
      
      // ?��?計�???      interval = setInterval(() => {
        setLearningSeconds(prev => {
          const newSeconds = prev + 1;
          console.log(`??[FIXED] 計�??�更?? ${newSeconds}秒`);
          
          // ?��??�顯示為 MM:SS ?��?
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const seconds = newSeconds % 60;
          
          // ?��??�為 00:00:00 ?��?
          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
          const display = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          
          // ?��??�新顯示
          setRealTimeDisplay(display);
          
          return newSeconds;
        });
      }, 1000);
      
      console.log(`?�� [FIXED] 計�??�創建�??�`);
    } else {
      console.log(`?��? [FIXED] 計�??��??��? - ?��?已�??�`);
      setIsTimerActive(false);
    }
    
    // 清�??�數
    return () => {
      if (interval) {
        console.log(`?�� [FIXED] 清�?計�??�`);
        clearInterval(interval);
      }
    };
  }, [currentUnitKey, isCompleted, forceTimerForTesting]); // ?�� ?��?修復：添??isCompleted 作為依賴

  return (
    <div className="min-h-screen chatgpt-unit-page" style={{ backgroundColor: '#121212' }}>
      {/* Skip Links for Keyboard Navigation */}
      <a href="#main-content" className="skip-link">
        跳至主�??�容
      </a>
      <a href="#sidebar-content" className="skip-link">
        跳至學�?輔助?�
      </a>
      
      <Navigation />
      
      <div className="container mx-auto px-6 py-0 main-content-wrapper" role="main" aria-label="學�??�面主�??�容">
        {/* ?�� ?��?式智?�Header - 移�?端�??�設�?*/}
        <motion.header 
          className="header-ai-smart mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="banner"
          aria-label="課�?導航?�進度資�?"
        >
          {/* 桌面?�Header */}
          <div className="hidden lg:flex items-center justify-between py-4 px-6">
            
            {/* 左側：�??��???*/}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary hover-lift click-scale focus-visible-enhanced"
                aria-label="返�?ChatGPT完整?�學課�?首�?"
              >
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">返�?課�?</span>
              </button>
              
              <button 
                onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                className="btn-ai-primary hover-lift click-scale focus-visible-enhanced"
                aria-label="返�?學�?概覽?�面"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">學�?概覽</span>
              </button>
              
              <div className="text-gray-400 text-sm" aria-label="課�?位置資�?">
                <span className="text-gray-300 font-medium">ChatGPT 完整?�學</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>主�? {themeId}</span>
            </div>
          </div>
          
            {/* 中央：進度信息 + 計�???*/}
            <div className="flex items-center space-x-6" role="region" aria-label="學�??�度?��??�器">
              
              {/* 學�??�度 */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400" aria-label={`?��??��?：第${unitId}?��?，共31?�單?�`}>?��? {unitId}/31</div>
                  <div className="text-lg font-bold text-white" aria-label={`總學習進度�?{stats.totalProgress}%`}>{stats.totalProgress}%</div>
          </div>
                <div className="w-24 progress-ai-sm performance-optimized" role="progressbar" aria-valuenow={stats.totalProgress} aria-valuemin={0} aria-valuemax={100} aria-label="課�??��??�度">
                  <motion.div 
                    className={`progress-ai-fill gpu-accelerated ${progressConfig.progressColorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.totalProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
              </div>

              {/* 計�???- 極簡??*/}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-ai-md transition-all duration-200 performance-optimized ${progressConfig.timerStatusClass}`} role="timer" aria-label={`?�次學�??��?�?{realTimeDisplay}�?{isTimerActive && !isCompleted ? '計�??��?�? : isCompleted ? '學�?已�??? : '計�??�未?��?'}`}>
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="font-mono text-sm font-medium">{realTimeDisplay}</span>
                {isTimerActive && !isCompleted && (
                  <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse gpu-accelerated" aria-hidden="true"></div>
                )}
              </div>
            </div>

            {/* ?�側：主要�?作�???*/}
            <div className="flex items-center space-x-3" role="group" aria-label="學�??��??��?">
              {(() => {
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`標�??��?${unitId}?�已完�?`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                      完�?學�?
                    </Button>
                  );
                }
                
                if (navigationConfig.isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 performance-optimized"
                      aria-label={`?�入主�?${themeId}?�測驗`}
                    >
                      ?��?測�?
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                } else {
                  return (
                    <Button 
                      onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                      className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`?��?下�?課�??��?${navigationConfig.nextUnitId}`}
                    >
                      下�?�?                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                }
              })()}
              
              {/* 上�?課�???- ?�在?�要�?顯示 */}
              {navigationConfig.hasPrevUnit && (
                      <button
                  onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-md duration-200 hover-lift click-scale focus-visible-enhanced performance-optimized"
                  aria-label={`返�?上�?課�??��?${navigationConfig.prevUnitId}`}
                  title="上�?�?
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                          )}
                        </div>
          </div>

          {/* 移�?端Header - ?��?佈�? */}
          <div className="lg:hidden header-ai-mobile">
            {/* 第�?行�?返�? + 課�?信息 */}
            <div className="header-row">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleNavigateBack}
                  className="btn-ai-secondary btn-mobile-compact hover-lift click-scale focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">返�?</span>
                      </button>

                <button 
                  onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                  className="btn-ai-primary btn-mobile-compact hover-lift click-scale focus-ring"
                  aria-label="返�?學�?概覽?�面"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">概覽</span>
                </button>
                              </div>
              
              <div className="text-center flex-1 mx-4">
                <div className="text-white font-medium text-sm">?��? {unitId}</div>
                <div className="text-gray-400 text-xs">主�? {themeId}</div>
              </div>
              
              {/* 上�?�?下�?課�???*/}
              <div className="flex items-center space-x-2">
                {currentUnit.id > 1 && (
                  <button 
                    onClick={() => handleNavigatePrev(currentUnit.id - 1)}
                    className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-sm duration-200 focus-ring"
                    title="上�?�?
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 第�?行�??�度 + 計�???*/}
            <div className="header-progress">
              {/* ?�度�?*/}
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

              {/* 計�???*/}
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

            {/* 第�?行�?主�??��??��? */}
            <div className="w-full">
              {(() => {
                const unitNum = parseInt(unitId);
                const isLastUnitOfTheme = (
                  unitNum === 5 ||   // 主�?1結�?
                  unitNum === 10 ||  // 主�?2結�?  
                  unitNum === 16 ||  // 主�?3結�?
                  unitNum === 21 ||  // 主�?4結�?
                  unitNum === 26 ||  // 主�?5結�?
                  unitNum === 31     // 主�?6結�?（課程�??��?
                );
                
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success btn-mobile-full hover-lift click-scale focus-ring py-3"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      完�?學�?
                    </Button>
                  );
                }
                
                if (isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary btn-mobile-full hover-lift click-scale focus-ring py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                    >
                      ?��?測�?
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
                      下�?�?                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  );
                }
              })()}
            </div>
          </div>
        </motion.header>

        {/* ?�� 簡�??�單?��?題�???*/}
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
                  {currentUnit.type === 'video' ? '影�?課�?' : 
                   currentUnit.type === 'text' ? '?�本課�?' : '?��??��?'}
                </Badge>
                {isCompleted && (
                  <span className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">已�???/span>
                  </span>
                )}
                      </div>
                    </div>
          </div>

          {/* 學�??�?��?�?- 簡�???*/}
          {isTimerActive && !isCompleted && (
            <motion.div 
              className="mt-4 card-ai-base border-learning-300/50 p-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse"></div>
                <span className="text-learning-300 text-sm">�?��學�?中�?計�??�已?��?</span>
              </div>
            </motion.div>
                  )}
                </motion.div>

        {/* ?�� ?��?式學習�?局 - 移�??��?設�? */}
        <div className="layout-learning-main desktop">
          
          {/* 主�?學�??�??- ?��?�?*/}
          <div className="layout-main-content content-optimized" id="main-content" role="main" aria-label="課�?主�??�容">
            
            {/* ?�� 調試?�制?�板 - ?�在?�發模�?顯示 */}
            {isDevelopment && showDebugPanel && (
                <motion.div 
                className="bg-yellow-900/90 border border-yellow-600 rounded-lg p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-yellow-200 text-sm space-y-2">
                  <div className="font-bold text-yellow-100 mb-2">?�� 計�??�調試面??/div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>?��?: {currentUnitKey}</div>
                    <div>已�??? {isCompleted ? '?? : '??}</div>
                    <div>計�??�活�? {isTimerActive ? '?��' : '??}</div>
                    <div>學�?秒數: {learningSeconds}</div>
                    <div>顯示?��?: {realTimeDisplay}</div>
                    <div>強制測試: {forceTimerForTesting ? '?? : '??}</div>
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
                      {forceTimerForTesting ? '?��?測試模�?' : '?�用測試模�?'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setLearningSeconds(0);
                        setRealTimeDisplay('00:00:00');
                        console.log('?? [DEBUG] ?��??�置計�???);
                      }}
                      className="px-3 py-1 rounded text-xs font-medium bg-gray-700 text-white"
                    >
                      ?�置計�???                    </button>
                    </div>
                  
                  <div className="text-xs text-yellow-300 mt-2">
                    ?�� ?��? Console (F12) ?��?詳細?��?
                  </div>
                </div>
              </motion.div>
            )}

            {/* 主�?課�??�容 - ?��?式優??*/}
            <motion.div 
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* 課�??�述 */}
              <div className="text-responsive-body text-gray-300 leading-relaxed">
                {currentUnit.description}
              </div>

              {/* 主�??�容?��? - ?��?式�?�?*/}
              <div className="prose prose-invert prose-lg lg:prose-xl max-w-none">
                <div className="text-white/95 leading-loose space-y-6 lg:space-y-8">
                  {currentUnit.content.transcript.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-responsive-body leading-loose tracking-wide">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* ?��??�用案�?展示 - ?��?式優??*/}
              <div className="mt-8 lg:mt-12 p-6 lg:p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl lg:rounded-2xl border border-gray-600/30">
                                  <h3 className="text-xl lg:text-2xl font-bold text-gray-200 mb-4 lg:mb-6 flex items-center">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                  {(() => {
                    switch(currentUnit.id) {
                      case 1:
                        return '?���?學�??��?';
                      case 2:
                        return '?? ?�解 LLM';
                      case 3:
                        return '?? GPT 演進史';
                      case 4:
                        return '?�� 精�??��?';
                      case 5:
                        return '?���?安全註�?';
                      case 6:
                        return '?? 介面快覽';
                      case 7:
                        return '?? 對話?��?�?;
                      case 8:
                        return '?��? ?�人?��?�?;
                      case 9:
                        return '?�� ?��?實戰';
                      case 10:
                        return '?�� ?�索 GPT ?��?';
                      case 11:
                        return '??�??�令?�基??;
                      case 12:
                        return '?�� 角色?��?�?;
                      case 13:
                        return '??範�?引�?�?;
                      case 14:
                        return '?? ?�維?��?�?;
                      case 15:
                        return '?�� 追�??��?';
                      case 16:
                        return '?? ?�令範本�?;
                      case 17:
                        return '?��? ?�容?��?引�?';
                      case 18:
                        return '?? 學�??�究?�速器';
                      case 19:
                        return '?�� ?��??��??�夥�?;
                      case 20:
                        return '?�� 程�?設�?超�??��?';
                      case 21:
                        return '?? 語�?翻譯?�潤飾大�?;
                      case 22:
                        return '?? ?��??��?大師';
                      case 23:
                        return '?? 實�?網絡?�覽';
                      case 24:
                        return '?�� DALL-E 3 ?��??��?';
                      case 25:
                        return '?? ?�建你�? Custom GPT';
                      case 26:
                        return '?? 識別 AI?�幻覺�?;
                      case 27:
                        return '?? ?��?私隱?��???;
                      case 28:
                        return '?��? 認�? AI ?��?';
                      case 29:
                        return '??負責任地使用 AI';
                      case 30:
                        return '?�� 展�?人工?�能?�未�?;
                      case 7:
                        return '對話管�??�佳實�?;
                      case 8:
                        return '?�本?��?決�??��?';
                      case 9:
                        return '介面?��??�巧總�?;
                      case 10:
                        return '跨平?�使?�建�?;
                      case 22:
                        return '?��??�令實�??�用?�景';
                      case 27:
                        return 'ChatGPT ?��??��??��?實�??�用';
                      default:
                        return '實�??�用案�?';
                    }
                  })()}
                </h3>
                {(() => {
                  switch(currentUnit.id) {
                    case 1:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?節係整?�課程�??�端，�??��?介紹人工?�能?�基?��?念�?�???�個課程�?�??你�??��??��??��??��?份�??��?學�?路�??��?了解?�大?��??��?構�??��?點樣跟�?課�??�步伐�??�零?��?一步步?�為 AI ?�用高�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">清晰了解課�??�大?��??��?構�??��???�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">確�?你學完�?後可以�??��??��??�?��?例�?：獨立寫?��??��?令�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握?�?��??�學習方法�?點樣跟�?課�??�實?��??��?齊�?，�??��?好�??��???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 2:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              究�?大�?語�?模�? (Large Language Model) 係咩？呢一節?�用?�?�活?�、�?簡單?��??��?例�?將佢比喻?��??��??��??��??��??�館?�實習�?）�?徹�??�解 LLM ?�核心�?作�??��?令�??��?覺�? AI 係�??��?不可?��?黑�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�自己�?說話�???�咩�?LLM ?��? GPT??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解?��?練數??(Training Data)?��?�?��??AI ?��?答�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�白點解 AI ?��??�「�??��??��?建�?�?AI ?��??�正確�??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 3:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ??GPT-3.5 ??GPT-4，�??��??��? GPT-4o，�?一次�?級都帶�??�命?��??��??�呢一節?�帶你快?��?�?GPT ?�發展歷?��??��?比�??��??�本?�推?�能?�、速度?��??��?模�?（�??��??��?講�??�面?��??�差?��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">講�???GPT-3.5 ??GPT-4/4o 之�??�主要能?�差距�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解?��?模�??��?實�??�用帶�??�好?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�??��??��??�任?��??�斷?�該?��??�模?��??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 4:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?�費?�已經好好用，�?點解仲�?俾錢?��? Plus ?��??��?節?�並?��?較�?費�???Plus ?��??�?��??��??�括?�度?�模?�使?��??��??��??��??��??��??�DALL-E 3）�?等�??��?供幾?�典?��??�戶?�景，幫你�??�精�??�選?��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握?�費?��? Plus ?��?完整?�能?�別?�表??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��??�己?�使?��?求�??�斷?�己?�?��?要�?級�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">了解 Plus ?�獨?��?高�??�能?�以點樣幫到你�?工�??�學習�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 5:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              工欲?�其事�?必�??�其?�。呢一節?��?供�?詳細?�步驟�??��??�帶你由?��?始註?��???OpenAI 帳戶?��??��??��??�特?�強調帳?��??��??��?點樣設�?一?��?強度密碼，�??��??�「兩步�?�?(2FA)?��??��?保�?你�??�人資�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?註�?並登?�自己�? ChatGPT 帳戶??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣設�??��??�兩步�?證�??��?帳戶安全?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">了解?�本?��??�設定�??��?點樣管�?你�?對話歷史紀?��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 6:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?節?�帶你進�?一?��??��? ChatGPT 介面導覽，由左�??�歷?��??�面?��??�中?��?主�?話�?窗�??�到?��?角�??�戶設�?，�?一?��??�、�?一?�選?��??�能?��?詳細�??，確保�?對�?作環境瞭如�??��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">快速搵?�並使用對話歷史紀?�、新增�?話�??��??�能??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解?��?設�??��?（�?如主題�??�、�?言）�?作用??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��??�個�??��?局，為之�??��??��?作�?好基礎�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 7:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?使用次數增�?，�?話�?表�?變�?好混亂。呢一節?��?你�?套實?��?對話管�??�巧�??�括點樣?��?要�?對話?��??��??��??�、�?�???�用?��?話�?享俾?��??��?事�??��?點樣?�除?�用?��?話�?保�?工�??�乾淨企�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握?��?對話?��?佳實踐�??�便?��??��???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣?��??�享???，�??��?人�?作�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">養�?定�?清�?對話?�表?�好習慣，�??�使?��??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 8:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?�個�?一?��?強大但好多人?�忽?��??��??��??��??�深?��?�?Custom Instructions 點樣?��?，�?你�?�?��?�個輸?��??�面，�??�設定�??�「�?係�??�」�??�「�?希�? AI 點樣?��??��?永�??�令?�設定�?次�?以�?每次對話 AI ?��??��?帶�??�個「�??�」�?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解 Custom Instructions ?�兩?�設定�?位�??�別?��??��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣寫出?��??�個人?��?令�?例�?設�?你�??�業?�寫作風?��?好�???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?實�??��?設�??��?，AI ?��?質�??�巨大�??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 9:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ChatGPT ?�只?�以?�電?�用?�呢一節?��?中�?紹�?�?App ?�獨?��??��??�別係�??�便?�「�??��?話」�??��??��??�以影相?��??��??�「�??�辨識」�??�。�??��??��?幾個�?活�??��?子�?展示點樣?��?上面?��??�地�?��?��???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣?��?機進�?流暢?��??��?話�?就好似�??�人?��?一�?�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣影�?張相，然後叫 AI 幫�??��??�入?��??�容??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��??��??�場?��?使用 AI ?�創?�方法�?例�?翻譯餐�??��??��??��???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 10:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              GPT Store 就好似�??��?機�? App Store，入?��??��?上萬?�其他人?��??��?對特定任?��?客製??GPTs?�呢一節?��?你�?�???��??��??�篩?��?評估?�啲 GPTs，搵?��?�??質�??�幫?��??��?工具??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�? GPT Store ?�基?�瀏覽?��?尋�?巧�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣?��?評�??�使?�人?��??��??�判?��???GPT ?�好壞�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?幾個�?你�??��? GPTs，建立�??�個人?�工?�箱??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 11:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              一條好?��?令�?就好似�?份�??��?工�?簡報?�呢一節?��?紹被?��??��??��??�「CRPF ?�令框架?��?C (Context/?�絡)?�R (Role/角色)?�P (Process/?��?)?�F (Format/?��?)?��??��?詳細?�解每個�?素�?作用，�?你�?�??織�??��?題�?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">徹�??�解?�令?�大?�石?��?義�??��??��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�??��??��??��??�思考�?�??供足夠�??�景（�?絡�???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣將�??�模糊�??��?，改寫�?一?��??��?大基?��?清晰?�令??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 12:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?�個�??�簡單但�??��??��?巧�?一?�當你命�?AI?�扮演�??��?深�?市場?��?師」�?，佢就�??��?調用?��??��?，令?��??��?業。�??��?展示多個�??��?角色設�?範�?，並�???��??��??��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解點解賦�??��??�」可以大幅�???AI ?��??�質素�?準確度�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?使用?��?係�???..?�、「扮演�???..?��??�鍵?��??��??��??��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣設�??��??��?家�??��?例�??��?深�?案」�??�數?��??�師?��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 13:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?，�?講�?求�??��??�。呢一節?��?你「Few-Shot Prompting?��?巧�??��??��??��?令入?��??�俾一?�個�??��??��?案「�?例」。AI ?�好?��??�「學?��??��?例�??��??��?�??風格?�格式去?��??��??�容??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�白?�Zero-shot?��??��?例�??�「Few-shot?��??��?例�??�令?��??��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣?��?令中建�?清晰?�輸?�輸?��?例�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣?�呢?��?巧�?統�?輸出?��?，�?如寫詩、寫?��??��?等�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 14:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��??��??��??��??��??�好?�接?��?案。呢一節?��?你「Chain of Thought?��?巧�??��??�令 AI?��?步�?步�?俾�??�」。�?�???�止?�以?��?答�??��?確性�?仲可以俾你�???AI ?�思考�?程�??�便你檢?��?修正??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解點解引�? AI ?�步?�考可以�??��??��?題�?�?��?��???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�??��?令中?�入?��??�步?�考」、「Let's think step by step?��??�鍵?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�用?�個�?巧去�?��?�學題、�?輯推?��??��??�活?��??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 15:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?�到第�??��?案�?後�?對話?�至?�正?��??��???AI 高�??�?��?就�?追�??�呢一節?��?你幾種�??��?追�?策略，�?如「可?�可以詳細啲？」、「�??�其他�?度�??�、「用一?�更簡單?��??�解?��??��?將�???60 ?��?答�??�磨??95 ?��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">建�??��?話�?一?��?程」�?心�?，�?好滿足於第�??��?案�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握?��?三種?��??�追?��?巧�?例�?：�?求深?�、�?求簡?�、�?求�?變�?度�???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣?�禮貌地?�出 AI 答�?中�?不足，並引�?佢修�?�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 16:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              學�??��?，�??��??��?一?��?實用?��?源�?一?��??��???20 ?�精心設計�??�令範本庫。呢?��??�涵?��?工�??�學習、�?活�??�種常�??�景，�??�以?�接複製?�修?�使?��??�刻體�??��??��?令帶?��?威�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?一?�可以即?�用?��?質�??�令範本庫�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣將�??�中?��??��??�自己�??�求�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�發你創?�更多屬?��??�己?�個人?��?令�??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 17:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?節係�?實戰課�??��??�由?��?始�?帶�??�用?�第三單?�學?��??�令?�巧�?完�?三�??��??�寫作任?��??��??�產?�寫一篇吸引人??Instagram 貼�??�撰寫�?封�?業�?工�??�報 Email?�以?�為一?�網上廣?��??��??��??�風?��?標�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握?�社交�?體創作內容�??�令，�??��???emoji ??Call-to-Action??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣要�? AI ?�用?��?語氣（�?如�?專業?��?鬆、�?說�??��??�寫?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">實�?點樣??AI ?��??��?稿�??�進�?步修?��?令內容更?�人?�味??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�用 AI ?��??��??�盪，快?�產?�大?��??��?度�?標�??��?子�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 18:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?就�??�錢?�呢一節?��?你�?�?? ChatGPT 變�?你�?學�??��?究助?�。�??��?實戰點樣將�?篇長篇大論�?網�??��???PDF ?��?，喺一?��??�總結�?幾個�?點�?並�?�?AI ?�簡?��?比喻，解?�當中�?複�?專�??��???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣貼�??��?，並俾出清晰?�令（�?如�??�總結�? 5 點」、「�??�主要�?點」�???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握?��??�巧�?要�? AI �???��??�面你�??�白?�任何�?念�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣??AI ?��?一份�??��?幫�??�幾條�?題�??��?測試你�??��?係�?�????/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�用 AI 快速�?較兩篇�??��?章�?觀點�??��??�步?��??��??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 19:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?諗到?�都大�??�無 idea ?��??��?AI 就�?你�?好�?夥伴?�呢一節?�實?��??��?：由?��?始�???AI 一齊�??��??�公?��??��?建設?��?Team-building Day）。由構思活?�主題�??�編?�詳細�??��?表�??�到?�慮後勤?��?算�??��??��?示�?�?? AI 一?��?答�?完�??�個�??��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣?��??��??��?，�?�?AI ?��?大�??��??��??��?子�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣??AI ?��??��?子基礎�?，進�?步追?��?深�??�可行�??��???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�用 AI ?��?輯能?��?幫�??��?計�?中可?�出?��??��??��??��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">快速起?�活?��?�?��稿�??��?請函??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 20:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?你�??�工程師，呢一節?��?你�??�。�??��?實戰三個場?��?(1) 貼�?一段�??��???Code，叫 AI ?�廣?�話?��?�??俾�??��?(2) 將�??��?式錯誤�???(Error Message) 貼俾 AI，叫佢�??��??��?俾出�?��?��?�?3) ??AI 寫�?段簡?��? Python ?�本，去?��??��??��??��?複性�?任�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣俾出清晰?�令，�?�?AI �??程�?碼�??�輯?��??��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握??AI ?�述程�??�誤?��??�方法�?以獲得�?準確?�除??(debug) 建議??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?講�?楚�??��?求�?�?AI ?��??��??�用?�、簡?��??��??�腳?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">了解點樣??AI 幫�??��?你寫??code，�??��?佢由一種�?言翻譯?�另一種�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 21:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              Google Translate ?��??�到?�翻譯」�???ChatGPT ?�以?�到?�潤飾」。呢一節?�實?��??��?：�?一份中?��??�人履歷 (CV) ?�者�?業建議書，�??�止翻譯?�英?��?仲�? AI 將佢?��?磨」到好似?��??�英?��?語者寫?��??��??�、�?業�?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解?�翻譯」�??�潤�?(Polish)?��?令�??��??�別??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣要�? AI ?��??��??��?�??例�??�普?�英?��?得更?�說?��??�更學�??��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣??AI 幫�??�擴寫」�?將幾?��?點句子�??��??��?段�??�通�??�段?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�用?�個�?巧去?��?你�??��?寫�?，無論�? Email 定報?��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 22:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?節係�???hands-on ?�實驗室?��??��??��?一份模?��??�售?��? CSV 檔�?，學?��?要親?��?佢�??��??��?學�??�日常說話�? AI 溝通�??��??��??��??��?如�?：「�?五款?��?�???�好�??�、「用棒形?�顯示�??��??�銷?��??�、「幫?��??�廣?�支?��??�售額�??��??��?係�???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?上傳 Excel ??CSV 檔�?，並確�? AI 已�?讀?�到?��???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�??�自?��?言?��?，進�??��??�詢?��?序�?計�???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��??��??��?，命�?AI ?��??��??�種?��?類�??��?表�?例�?：�?形�??��?餅�?）�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�試??AI ?��??��??�出觀察�??��?�?(insights)??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 23:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              �?ChatGPT 一對可以�??�全世�??�眼?�。呢一節?��?你�?�???��??��?使用?��?網絡?�覽?�能?��??��?實戰?�目係�??�設你�??��?份競?��??��?市場調查?��?，命�?ChatGPT 上網?�出對�??�?�發佈�??��??��??��??��??��??��??�網民�??��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解?��??��?該�??�網絡瀏覽模�?，咩?�候�??�要�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣?��?，去?��??��??��?資�?（�?如�?今日?�股?�、天�????/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣??AI 總�??�自幾個�??�網站�?資�?，整?��?一份報?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">養�?好�????要�? AI ?��?資�?來�??��??，方便自己查證�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 24:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��?念到?��?，只係�?要�??�話?�呢一節?��?你「�?覺�??�令 (Visual Prompting)?��??��??��??��?展示一?�簡?��?令�??��??��??��??��??�詳細�?令�??��??��??��??�曬太陽?��??�肥貓�?毛髮細緻，電影�??��?�?K?�質?��?之�??�巨大�??�。實?��??��??��??��?構�??�司，創作�?系�??��??�風?��?�?��?��???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣?��?確�?形容詞、場?��?述、風?��?例�?：相?��??�實?�卡?�、印象派）去?�制?�面??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣?��??��??�長寬�?（�?�?16:9 ?��??�橫額�???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣?��?張�??��??��??��?上�?修改?�令?�微調細節??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解 DALL-E 3 ?��?權�?使用上�??�制??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 25:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?�個�??�單?��??�業?�課?��??��?一步�?步帶你�?一�?GPT ?�建介面?�實?��??��?：創建�??�「�?議總結�??�」GPT?�學?��?要親?�為佢設定核心�?令�??��??�任?��?將�?議�??�總結�??��??��??��??�」�??��??�知識�?案�?一份�?議�??��??��??��??�設定好引�?使用?��?對話?�場?��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��? GPT Builder 介面?��??�部?��?Create / Configure）�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣寫出清晰?�無歧義?�核心�?�?(Instructions)??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣上傳 PDF ??TXT 檔�?，�??��???GPT ?��?屬知識庫??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?覽�?窗進�?測試?�除?��?確�?你�? GPT ?��?�?��??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 26:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              AI ?��??�好?�自信�??��??��??��??�個現象�??�稱之為?�幻�?(Hallucination)?�。呢一節?�深?�解?�呢?�現象�??��?，並?��?一套實?��?事實?��? (Fact Check) 流�?，�?你�?�?��引用 AI ?��??��??��??��??��?足�?證�?夫�?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解 AI ?��?幻覺?��?術�??��?建�??�判?�思維??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握?��?三種?��? AI 資�??�方法�?例�?：�?求�?供�?源、交?��?對、用網絡?�覽?�能驗�?）�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�日常使?�中，�??��? AI ?��??��?實�?資�?保�??��??��?度�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 27:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?��???ChatGPT 講�??��??��?俾人?�到？」呢?��?好�?人�?心�??��??�呢一節?�帶你詳細閱讀 OpenAI ?��??�政策�?�??你�?對話?��??�咩?��?下�?被用?��?模�?訓練，並?��?點樣?�設定中?��?對話紀?��?保�?你�??�人?��?業�??��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">清�??��??�己?��?話歷?��??��??�用?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣?��??��??��?話�??��??��?清除?�?�歷?��?話�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">建�?一?��??��?使用習慣，避?�喺對話中輸?��?度�??��??�人?�公?��?密�??��?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 28:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              AI 係由人�??�數?��?練出?��??�以佢亦都?�學?��??�人類社?��??��??�種?��?（�?如�??�別?�種?��?見�??�呢一節?�透�?一?�實例�?展示 AI ?��??�以點樣?��?答中?�現，並?��?點樣識別?��?對呢?��??��??�內容�?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�解 AI ?��??��?源�?主�?係�?練數?��???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣??AI ?�建議中，�?覺可?��??��??�性�?見�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?�握點樣?��?修改?�令，去?�試減�??��???AI 答�?中�??��???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 29:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ??AI ?�以幫�?寫�?章、寫 code，�??��??�」�??��?襲」�??��??��?？呢一節?�深?��?論喺學�??��??�場上�?使用 AI ?�該?��??��?德�?範。�??��??��?點樣�?��?��???AI?�咩?��?下�?該�??�報使用??AI，以?��?�?��?��??��?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">了解學�??��??�使??AI 輔助寫�??��??��??��???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">學�?點樣�?AI ?��?一?�「�??�工?�」而�?係「代筆�??�」�?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">建�?一?��?實、透�???AI 使用?��?，無論喺學�?定工作�??��?得�??�己??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 30:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 主�??�容</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ChatGPT ?��?一?��?始。呢一節?�帶你�??��??��??��?展�?人工?�能?��?一步發展�???GPT-5 ?�傳?��??�更?��??�通用人工?�能 (AGI) ?��?念�??�到 AI 對未來社?�、工作職位�??��?影響??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">了解 AI ?��??��??�幾?�主要發展方?��?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��?AI ?�能?��?�?��變�??�?��?行業??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">以�??��?極、�??��?審�??��??��??��??��??�由 AI 深度?��??�未來�?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    default:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 學�??��?</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?��??�單?�內容整?��??��?概念?�實踐�?點�?/p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?�� 實�??�用</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">將�?學知識�??�到實�?工�??��?活場?�中?�具體方法�?/p>
                          </div>
                        </div>
                      );
                   }
                 })()}
              </div>
                </motion.div>
          </div>

          {/* 學�?輔助?�??- ?��?式側?��? */}
          <div className="layout-sidebar-content content-optimized" id="sidebar-content" role="complementary" aria-label="學�?輔助工具">
            
            {/* 移�?端�??��??��??��? */}
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
                ?��??��?
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

            {/* 學�?統�? - 移�?端優??*/}
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
                學�?統�?
              </h3>
              
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">?�次?��?</dt>
                  <dd className="text-gray-300 font-mono font-medium text-sm lg:text-base" aria-label={`?�次學�??��?�?{realTimeDisplay}`}>{realTimeDisplay}</dd>
                    </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">總進度</dt>
                  <dd className="text-green-300 font-bold text-sm lg:text-base" aria-label={`總學習進度�?{stats.totalProgress}%`}>{stats.totalProgress}%</dd>
              </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">完�?主�?</dt>
                  <dd className="text-gray-300 font-medium text-sm lg:text-base" aria-label={`已�???{stats.completedThemes}?�主題�???{stats.totalThemes}?�主題`}>{stats.completedThemes}/{stats.totalThemes}</dd>
          </div>
                
                {isCompleted && (
                  <div className="flex items-center space-x-2 mt-4 p-2 bg-green-500/20 border border-green-400/30 rounded-lg" role="status" aria-label="?��?已�???>
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" aria-hidden="true" />
                    <span className="text-green-300 text-xs lg:text-sm font-medium">已�???/span>
        </div>
                )}
              </dl>
            </motion.div>


          </div>
        </div>
            </div>
            
      {/* ?�� ?��?底部?��?�?- 確�??��?始�??��? */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 左側：學習進度信息 */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              ?��? {unitId} / 31
            </div>
            <div className="text-sm text-gray-400">
              {isCompleted ? '已�??? : '?��?�?}
            </div>
          </div>

          {/* ?�側：�?作�???*/}
          <div className="flex items-center space-x-3">
            {/* 上�?課�???*/}
            {navigationConfig.hasPrevUnit && (
                <Button
                onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                className="btn-ai-secondary px-4 py-2"
                aria-label={`返�?上�?課�??��?${navigationConfig.prevUnitId}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                上�?�?                </Button>
              )}
              
            {/* 主�??��??��? */}
            {!isCompleted ? (
              // ?��???- 顯示完�??��?
                <Button
                onClick={handleMarkComplete}
                className="btn-ai-success px-6 py-3"
                aria-label={`標�??��?${unitId}?�已完�?`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                完�?學�?
              </Button>
            ) : navigationConfig.isLastUnitOfTheme ? (
              // 已�??��??�主題�?後�?�?- 顯示測�??��?
              <Button 
                onClick={handleNavigateQuiz}
                                        className="btn-ai-primary px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                aria-label={`?�入主�?${themeId}?�測驗`}
              >
                ?��?測�?
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : navigationConfig.hasNextUnit ? (
              // 已�??��??��?一�?- 顯示下�?課�???              <Button 
                onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                className="btn-ai-primary px-6 py-3"
                aria-label={`?��?下�?課�??��?${navigationConfig.nextUnitId}`}
              >
                下�?�?                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              // 課�?結�? - 返�?課�?總覽
              <Button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary px-6 py-3"
                aria-label="返�?課�?總覽"
              >
                課�?完�?
                <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
      </div>

      {/* 完�??�畫彈�? - 保�??�樣 */}
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
              <h3 className="text-xl font-bold">?��?完�?�?/h3>
              <p className="text-green-100">學�??��?: {realTimeDisplay}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 
