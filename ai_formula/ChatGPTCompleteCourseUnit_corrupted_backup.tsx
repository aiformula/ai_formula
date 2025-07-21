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
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress'; // ChatGPT ?嚙賢漲餈質馱
import './ChatGPTCompleteCourseUnit.css'; // ?嚙踝蕭 隤莎蕭??嚙賡憓撥嚙??
import '@/styles/design-system.css'; // ?嚙踝蕭 蝯梧蕭?閮哨蕭?蝟餌絞
import { LearningPageSkeleton, HeaderSkeleton, LearningContentSkeleton, SidebarSkeleton } from '@/components/ui/skeleton'; // ?嚙踝蕭?嚗爸?嚙踝蕭?

const ChatGPTCompleteCourseUnit: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  // 閮蕭??嚙踝蕭???- 蝪∴蕭???  const [learningSeconds, setLearningSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  
  // ?嚙踝蕭 隤輯岫璅∴蕭?嚗撥?嚙踝蕭??嚙踝蕭??嚙賢嚗葫閰衣嚙?  const [forceTimerForTesting, setForceTimerForTesting] = useState(false); // ?嚙踝蕭 ?嚙賜 false嚗蕭??嚙賜憓蕭?撘瑕?嚙踝蕭?

  // ?嚙踝蕭 隤輯岫?嚙賣?嚙賢 - ?嚙賢?嚙踝蕭?璇辣銝＊嚙?  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  // ?嚙踝蕭 ?嚙賜?嚙賢翰?嚙賡嚗蕭? Ctrl+D 憿舐內/?嚙踝蕭?隤輯岫?嚙賣
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
  
  // ?嚙踝蕭 雿輻?嚙賢漲餈質馱 Hook
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    themeProgress
  } = useChatGPTProgress();

  // ?嚙踝蕭?蝢拙?嚙踝蕭??嚙賣炎??  const isUnitCompleted = useCallback((unitKey: string): boolean => {
    // 嚙?unitKey 嚙?? themeId ??unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return false;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    const progress = getThemeProgress(themeId);
    return progress ? progress.completedUnits.includes(unitId) : false;
  }, [getThemeProgress]);
  
  // ?嚙踝蕭?蝢拙?嚙踝蕭??嚙踝蕭???  const markUnitCompleted = useCallback((unitKey: string, timeSpent: number = 60) => {
    // 嚙?unitKey 嚙?? themeId ??unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    // 撠蕭??嚙踝蕭??嚙賜?嚙踝蕭?
    const timeInMinutes = Math.ceil(timeSpent / 60);
    
    completeUnit(themeId, unitId, timeInMinutes);
  }, [completeUnit]);
  
  const [completionAnimation, setCompletionAnimation] = useState(false);
  const [realTimeDisplay, setRealTimeDisplay] = useState('00:00:00'); // 靽格迤嚗絞銝?嚙踝蕭??嚙賜 HH:MM:SS ?嚙踝蕭?

  // ?嚙踝蕭? themeId ??unitId ?嚙踝蕭? unit key
  const getUnitKey = (themeId: string, unitId: string): string => {
    return `t${themeId}-u${unitId}`;
  };

  const currentUnitKey = getUnitKey(themeId || '1', unitId || '1');
  const isCompleted = isUnitCompleted(currentUnitKey);
  const stats = getProgressStats();

  // ?? ?嚙質?嚙踝蕭?嚗楨摮蕭?隞塚蕭??嚙賢??  const handleMarkComplete = useCallback(() => {
    console.log(`?嚙踝蕭 [FIXED] 璅蕭?摰蕭? - ?嚙踝蕭?摮賂蕭?蝘:`, learningSeconds);
    
    // ?嚙踝蕭 ?嚙踝蕭?嚗蕭??嚙踝蕭?甇ｇ蕭??嚙賢
    setIsTimerActive(false);
    
    // 雿輻?嚙踝蕭???learningSeconds 雿?嚙賜?嚙???    const finalSeconds = Math.max(learningSeconds, 1); // ?嚙踝蕭?嚙?    
    console.log(`?? [FIXED] ?嚙賜?摮貊?嚙??? ${finalSeconds}蝘);
    
    // ?嚙踝蕭??嚙踝蕭?蝯＊蝷綽蕭??嚙賜 HH:MM:SS ?嚙踝蕭?
    const finalHours = Math.floor(finalSeconds / 3600);
    const finalMinutes = Math.floor((finalSeconds % 3600) / 60);
    const remainingSeconds = finalSeconds % 60;
    
    const formattedHours = finalHours.toString().padStart(2, '0');
    const formattedMinutes = finalMinutes.toString().padStart(2, '0');
    const formattedSecondsDisplay = remainingSeconds.toString().padStart(2, '0');
    const finalTimeDisplay = `${formattedHours}:${formattedMinutes}:${formattedSecondsDisplay}`;
    
    setRealTimeDisplay(finalTimeDisplay);
    
    // ?嚙踝蕭 ?嚙踝蕭?靽格嚗?嚙賜移蝣綽蕭?摮賂蕭?蝘嚙?markUnitCompleted
    markUnitCompleted(currentUnitKey, finalSeconds);
    
    console.log(`?? [FIXED] 摰蕭??嚙賜撠＊嚙?`, finalTimeDisplay);
    console.log(`?嚙踝蕭 [STORAGE] 撌脣摮飛蝧蕭??? ${finalSeconds}蝘);
    console.log(`?嚙踝蕭? [TIMER] 閮蕭??嚙賢歇?嚙賣迫嚗sCompleted 撠蕭???true`);
    
    // 憿舐內摰蕭??嚙賜
    setCompletionAnimation(true);
    
    setTimeout(() => {
      setCompletionAnimation(false);
    }, 2000);
  }, [learningSeconds, currentUnitKey, markUnitCompleted]);



  const handleNavigateBack = useCallback(() => {
    navigate('/courses/chatgpt-complete-course/learning');
  }, [navigate]);

  const handleNavigateNext = useCallback((nextUnitId: number) => {
    // ?嚙賣銝蕭??嚙賢?嚙賢惇?嚙賢?嚙賭蜓嚙?    let nextThemeId = themeId;
    if (nextUnitId >= 6 && nextUnitId <= 10) nextThemeId = '2';
    if (nextUnitId >= 11 && nextUnitId <= 16) nextThemeId = '3';
    if (nextUnitId >= 17 && nextUnitId <= 21) nextThemeId = '4';
    if (nextUnitId >= 22 && nextUnitId <= 26) nextThemeId = '5';
    if (nextUnitId >= 27 && nextUnitId <= 31) nextThemeId = '6';
    
    navigate(`/courses/chatgpt-complete-course/theme/${nextThemeId}/unit/${nextUnitId}`);
  }, [navigate, themeId]);

  const handleNavigatePrev = useCallback((prevUnitId: number) => {
    // ?嚙賣銝蕭??嚙賢?嚙賢惇?嚙賢?嚙賭蜓嚙?    let prevThemeId = themeId;
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

  // ChatGPT 隤莎蕭??嚙踝蕭??嚙踝蕭? - 摰??31 ?嚙賢??  const units = useMemo(() => ({
    // 蝚穿蕭?蝡蕭?嚙?? ChatGPT ??瘛勗?嚙踝蕭??嚙踝蕭?    '1': {
          id: 1,
      themeId: 1,
      title: isZhHK ? '?嚙踝蕭? 1.1嚗蕭?暻潭憭改蕭?隤蕭?璅∴蕭? (LLM)嚙? : 'Unit 1.1: What is a Large Language Model (LLM)?',
      duration: '15?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '?嚙賢玨蝔蕭??嚙賜垢嚗蕭?蝝嫣犖撌交?嚙賢?嚙踝蕭?敹蛛蕭?摰摮賂蕭?頝荔蕭??嚙踝蕭?撱綽蕭?摮賂蕭??嚙踝蕭??嚙賣瘜蕭? : 'The beginning of the entire course, introducing basic AI concepts and complete learning roadmap, establishing learning goals and methods.',
      content: {
        transcript: isZhHK ? 
          '憭改蕭?隤蕭?璅∴蕭?嚗arge Language Model, LLM嚗銝蝔殷蕭?蝡荔蕭?鈭箏極?嚙質嚗I嚗蕭?撘蕭?蝬蕭?瘚瘀蕭??嚙賣?嚙踝蕭??嚙踝蕭?蝺湛蕭?敺飛?嚙踝蕭??嚙質圾?嚙踝蕭??嚙賬蜇蝯蕃霅臭犖憿蕭?閮隞伐蕭??嚙踝蕭??嚙踝蕭?銴蕭??嚙踝蕭??嚙賜?嚙賭遙?嚙賬蕭??嚙賣銝牧嚗LM ?嚙踝蕭??嚙賣楛摨血飛蝧芋?嚙踝蕭?摰蒂?嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭?鈭綽蕭??嚙賜儔銝蕭??嚙賣蕭??嚙賣?嚙賣璆萄銴蕭??嚙踝蕭??嚙踝蕭?蝞蕭?靘蕭?皜穿蕭??嚙踝蕭??嚙踝蕭??嚙賭葉?嚙踝蕭?靘蕭??嚙質?嚙賜?嚙踝蕭?隤n\n?嚙賢之?嚙賬蕭?敶蜓閬蕭??嚙賢?嚙賢雁摨佗蕭??嚙踝蕭??嚙踝蕭?蝺湔?嚙踝蕭??嚙踝蕭?璅∴蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?敺靘蕭??嚙踝蕭??嚙賜雯?嚙賢誨瘜蕭??嚙踝蕭?靘蕭??嚙賢?嚙踝蕭??嚙賜雯?嚙踝蕭? Common Crawl ?嚙踝蕭?摨恬蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?蝬剖?嚙踝蕭?嚗鈭璅∴蕭??嚙質澈?嚙踝蕭??嚙賢漲嚗?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賬?嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭??嚙賣芋?嚙賢摮賂蕭??嚙踝蕭?銝剛矽?嚙踝蕭??嚙賡霈蕭?嚗?嚙賢擃蕭??嚙踝蕭??嚙踝蕭??嚙賣憭n\nLLM ?嚙賢嚙?AI ?嚙賢之嚙??嚙?嚙賢?嚙賢撽犖?嚙賡?嚙踝蕭??嚙賣暑?嚙賬蝯梧蕭?璈摮賂蕭?璅∴蕭??嚙賢虜?嚙賜?嚙踝蕭??嚙賜摰蕭?隞鳴蕭??嚙質身閮蕭?靘蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡隞塚蕭?瞈整?嚙踝蕭?銝??LLM ?嚙質?嚙踝蕭??嚙賢誨?嚙踝蕭??嚙賜霅蕭??嚙踝蕭?憭車?嚙賜銝蕭??嚙賭遙?嚙踝蕭?敺蕭?蝑虜霅蕭?憿撖恬蕭?璆哨蕭?獢蕭??嚙踝蕭??嚙賡?嚙賭誨蝣潘蕭??嚙賢?嚙踝蕭?銝?嚙賢蝷芋?嚙踝蕭??嚙賬n\n?嚙賭犖撌交?嚙踝蕭??嚙質?撅斤?銝哨?LLM ?嚙賣?嚙踝蕭?憛蕭??嚙賜垢?嚙踝蕭?撱綽蕭??嚙踝蕭??嚙賢飛蝧蕭??嚙踝蕭?銋蕭?嚗瘛勗漲摮賂蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?銝血?嚙踝蕭?蝬雯蝯∴蕭??嚙賢閮蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭? AI ?嚙踝蕭??嚙踝蕭?摨佗蕭?璆哨蕭??嚙踝蕭??嚙踝蕭?LLM 撠釣?嚙踝蕭?嚙?嚙踝蕭嚙?皜穿蕭??嚙踝蕭?憿犖?嚙賣?? :
          'A Large Language Model (LLM) is a cutting-edge artificial intelligence program trained on massive text data to understand, generate, summarize, translate human language and perform other complex text-related tasks.',
        keyPoints: isZhHK ? [
          '皜鈭圾隤莎蕭??嚙賢之?嚙踝蕭??嚙踝蕭?瑽蕭??嚙踝蕭???,
          '蝣綽蕭?雿飛摰蕭?敺隞伐蕭??嚙踝蕭??嚙踝蕭??嚙?嚙踝蕭?靘蕭?嚗蝡神?嚙踝蕭??嚙踝蕭?嚙?,
          '?嚙賣?嚙?嚙踝蕭??嚙賢飛蝧瘜蕭?暺見頝蕭?隤莎蕭??嚙賢祕?嚙踝蕭??嚙踝蕭?朣蕭?嚗蕭??嚙踝蕭?憟踝蕭??嚙踝蕭?'
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
      title: isZhHK ? '?嚙踝蕭? 1.2嚗蕭??嚙質圾 LLM' : 'Unit 1.2: ?? Decoding LLM',
      duration: '12?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '?嚙賜揣LLM?嚙踝蕭?撱箏?嚙賤蕭?蝬雯蝯∴蕭?隞伐蕭?revolutionaryTransformer?嚙踝蕭??嚙賣敹?嚙質瘜剁蕭??嚙踝蕭??嚙踝蕭? : 'Explore the building blocks of LLM?嚙緯eural networks, and the core innovation of the revolutionary Transformer architecture: self-attention mechanisms.',
      content: {
        transcript: isZhHK ? 
          'LLM ?嚙踝蕭?撱箏?嚙賣鈭箏極蟡蕭?蝬脩窗嚗銝蝔格芋隞選蕭??嚙賢之?嚙賭葉蟡蕭??嚙賜鈭蕭?嚙踝蕭?嚙賢?嚙賭縑?嚙賣撘蕭?閮蕭?璅∴蕭??嚙踝蕭??嚙踝蕭??嚙賢惜蝝蕭?蝭暺蕭??嚙踝蕭??嚙賣頛詨撅扎撓?嚙賢惜隞伐蕭?銝撅歹蕭?憭惜雿?嚙質蕭??嚙踝蕭??嚙賡?嚙賢惜?嚙賬n\n?嚙質蕭?LLM ?嚙踝蕭?撖衣鞈迎蕭?憌蕭?嚗?嚙賣迤?嚙踝蕭?銵蕭??嚙賢??2017 撟渲◤?嚙賢??Transformer ?嚙踝蕭??嚙賢 Transformer ?嚙賜銋蕭?嚗蜓瘚蕭?摨蕭??嚙踝蕭?璅∴蕭?嚗蕭?敺芰蟡蕭?蝬脩窗 RNN嚗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣嚗扔憭批?嚙賢鈭蕭?蝺湧漲?嚙踝蕭??嚙賡?嚙賣?嚙質?嚙賬ransformer ?嚙踝蕭??嚙踝蕭??嚙踝蕭?銝佗蕭??嚙踝蕭?璈嚗隞伐蕭??嚙踝蕭??嚙賣?嚙質撓?嚙踝蕭??嚙踝蕭?敺憭?嚙賜嚙?GPU ?嚙賢撥憭找蒂銵蕭?蝞?嚙踝蕭?憭改蕭?蝮桃閮毀?嚙踝蕭??嚙穀n\nTransformer ?嚙踝蕭??嚙賣敹?嚙賜?嚙踝蕭??嚙質瘜剁蕭??嚙踝蕭??嚙賬蕭?Self-Attention Mechanism嚗蕭??嚙賭蝙敺芋?嚙賢?嚙踝蕭?摨蕭?銝哨蕭??嚙賢閰蕭?嚗憭蕭?銵∟撓?嚙踝蕭??嚙賭葉?嚙?嚙賢隞閰蕭?閰脣閰蕭??嚙踝蕭??嚙踝蕭?銝衣策鈭蕭??嚙踝蕭??嚙賣釣?嚙踝蕭??嚙踝蕭??嚙賬蕭?璅∴蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?隤蕭??嚙踝蕭??嚙踝蕭??嚙賡頝?嚙踝蕭?鞈湛蕭?靽蕭?敺瘛勗?嚙踝蕭?嚙??銝蕭??嚙踝蕭?憒蕭??嚙賢摮蕭??嚙質蕭?嚙質蕭?嚗蕭?銝綽蕭?擖選蕭??嚙賭葉嚗瘜剁蕭??嚙踝蕭??嚙質撟怠璅∴蕭?皞Ⅱ?嚙踝蕭?嚙???嚙踝蕭??嚙踝蕭?銝鳴蕭??嚙踝蕭??嚙賬蝜怨絲靘蕭??嚙踝蕭??嚙賬蕭??嚙賬n\n?嚙踝蕭?霈蕭?蝬雯蝯∟憭蕭??嚙踝蕭?閮嚗LM ?嚙賜鈭蕭?撋?嚙踝蕭?Word Embeddings嚗蕭?銵蕭?銵函內?嚙踝蕭??嚙賢蝯梧蕭?璈摮賂蕭??嚙踝蕭??嚙質雿輻摮歹蕭??嚙賣摮蕭?嚙?嚙踝蕭瘥蕭?嚗瘜”?嚙踝蕭?隤蕭??嚙踝蕭?蝢抬蕭?靽蕭?撋?嚙踝蕭?瘥閰蕭?撠銝?嚙踝蕭?蝬哨蕭??嚙踝蕭?蝛綽蕭?銝准?嚙賢征?嚙質ㄐ嚗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?隤蕭?靘蕭??嚙踝蕭??嚙賬蕭??嚙賢戊?嚙賬蕭??嚙賬粥頝胯蕭??嚙踝蕭?頝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡車銵函內?嚙踝蕭?雿選蕭?璅∴蕭??嚙踝蕭??嚙踝蕭??嚙賢閰蕭??嚙賜敦敺殷蕭?隤儔?嚙賢瘜蕭?靽蕭??嚙踝蕭?嚙???嚙踝蕭?閮憟蕭?鈭摮詨蝷n\n?嚙賜車敺蕭?摨蕭??嚙賢銝佗蕭??嚙踝蕭??嚙踝蕭?撘蕭?蝘鳴蕭??嚙踝蕭?撟湛蕭? AI ?嚙踝蕭?蝒?嚙賡蕭??嚙賣?嚙踝蕭??嚙踝蕭?雿選蕭??嚙賣絲?嚙賣?嚙踝蕭?閮毀?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?頞之閬芋璅∴蕭??嚙賜?嚙質嚗蕭?蝯?嚙踝蕭??嚙踝蕭?撘瑕之?嚙踝蕭???ChatGPT?? :
          'The building blocks of LLM are artificial neural networks, which are computational models that mimic the way neurons in biological brains interconnect and transmit signals.',
        keyPoints: isZhHK ? [
          '蟡蕭?蝬脩窗嚗芋隞選蕭??嚙賢之?嚙踝蕭?閮蕭?璅∴蕭?嚗蕭??嚙踝蕭?撅歹蕭?嚙?,
          'Transformer嚙?017撟湛蕭??嚙踝蕭??嚙賢?嚙賣瑽蕭??嚙賣銝佗蕭??嚙踝蕭?',
          '?嚙賣釣?嚙踝蕭?璈嚗蕭?銵∴蕭?隤蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?鞈湛蕭?嚙?,
          '閰蕭??嚙踝蕭?銵蕭?撠閰蕭?撠擃雁?嚙踝蕭?蝛綽蕭?銵函內隤儔?嚙踝蕭?',
          '銝佗蕭??嚙踝蕭?嚗蕭??嚙踝蕭??嚙賭蒂銵蕭?蝭蕭?頧宏嚗蕭??嚙璀I?嚙踝蕭?'
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
      title: isZhHK ? '?嚙踝蕭? 1.3嚗蕭??GPT 瞍脣' : 'Unit 1.3: ?? GPT Evolution History',
      duration: '10?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '嚙??ChatGPT?嚙踝蕭??嚙質?嚙?銝之閬蕭?嚗蕭?嚙?嚙踝蕭?嚙踝蕭??嚙踝蕭?蝺湔瘜蕭??嚙踝蕭??嚙質?嚙賣楛撅文蝢抬蕭? : 'Analyze the three core elements of ChatGPT technology, understanding the deep meaning of its architecture, training methods, and core functions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?嚙賣敹蕭?銵隞伐蕭??嚙賢嚙?GPT嚗enerative Pre-trained Transformer嚗葉敺蝎曄Ⅱ?嚙質圾?嚙賬蕭??嚙踝蕭??嚙賜內鈭?嚙踝蕭??嚙踝蕭?蝺湔瘜蕭??嚙踝蕭??嚙質?嚙穀n\n霈蕭???(Transformer)嚗蕭??嚙踝蕭??嚙踝蕭?撅歹蕭??嚙質??嗆?嚙??嚙踝蕭?銝蝭?嚙質底餈?嚙賬?嚙質瘜剁蕭??嚙踝蕭??嚙踝蕭? Transformer 璅∴蕭??嚙穀n\n?嚙踝蕭?嚙?(Pre-trained)嚗 GPT 璅∴蕭?閮毀?嚙踝蕭??嚙賜洵銝?嚙賬蕭??嚙踝蕭??嚙賡?嚙踝蕭?畾萸?嚙賢蕭?畾蛛蕭?璅∴蕭??嚙賡莎蕭??嚙質?嚙??嚙賜??嚙踝蕭摮賂蕭??嚙踝蕭?瘨蕭?靘鈭蝬脯蝐蕭?蝡蕭?瘚瘀蕭??嚙賬蝬蕭?閮鳴蕭??嚙賣?嚙踝蕭??嚙賢?嚙踝蕭?摮賂蕭?隞鳴蕭??嚙賢虜蝪∪嚗?嚙踝蕭?畾蛛蕭??嚙踝蕭?銝蕭?嚗蕭?皜穿蕭?銝?嚙踝蕭??嚙賢?嚙賢?嚙踝蕭??嚙踝蕭??嚙踝蕭?蝚艾蕭??嚙賣隞亥?嚙踝蕭??嚙賢摮蕭??嚙踝蕭??嚙賢蕭?蝔蕭?璅∴蕭?銝蕭?摮賂蕭?鈭蕭?瘜蕭??嚙踝蕭?閰蕭??嚙踝蕭?嚗蕭??嚙踝蕭?鈭之?嚙踝蕭?銝蕭?撣賂蕭??嚙踝蕭?蝢抬蕭?靽蕭??嚙質?嚙賣郊?嚙賣?嚙賣芋撘蕭?畾萇璅∴蕭??嚙踝蕭?鈭蕭??嚙賢誨?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙穀n\n?嚙踝蕭?嚙?(Generative)嚗蕭??嚙質膩鈭芋?嚙踝蕭??嚙踝蕭??嚙質?嚙賤?嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢捆?嚙賡蕭??嚙踝蕭?憿◤蝔梁?嚙賢?嚙踝蕭?璅∴蕭??嚙踝蕭?Discriminative Models嚗蕭? AI 敶ｇ蕭?撠蕭??嚙賢?嚙踝蕭?璅∴蕭?嚗蕭??嚙賣?嚙賣?嚙踝蕭???BERT嚗蕭?銝鳴蕭?隞鳴蕭??嚙賡莎蕭??嚙踝蕭??嚙賢?嚙踝蕭?靘蕭??嚙賣銝撠隞嗆?嚙賜?嚙賢?嚙賭辣?嚙質蕭??嚙踝蕭?璅∴蕭??嚙質憭蕭??嚙踝蕭?憪雿蕭??嚙踝蕭??嚙賣?嚙賢摮挾?嚙賬誨蝣潘蕭??嚙質?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙穀n\n?嚙踝蕭??嚙賢之閬芋?嚙賬蕭?閮毀?嚙踝蕭?敺蕭?璅∴蕭??嚙賢虜?嚙賡脣蝚穿蕭??嚙踝蕭?蝺湛蕭?畾菊凝隤踴蕭?Fine-tuning嚗?嚙賢蕭?畾蛛蕭??嚙賜?嚙踝蕭?雿輻銝?嚙踝蕭?璅∴蕭?敺蕭??嚙踝蕭?撣塚蕭??嚙踝蕭?隞鳴蕭?璅惜?嚙賣?嚙踝蕭?靘莎蕭?甇伐蕭?蝺湔芋?嚙賬?嚙踝蕭??嚙賣嚗penAI 撘鈭蕭??嚙賭犖憿蕭?擖蕭?撘瘀蕭?摮賂蕭??嚙踝蕭?Reinforcement Learning from Human Feedback, RLHF嚗蕭?銵?嚙賢蕭?蝔葉嚗犖憿蕭?蝺游?嚙踝蕭?璅∴蕭??嚙踝蕭??嚙踝蕭?蝑莎蕭?閰蕭??嚙踝蕭?摨蕭?璅∴蕭??嚙賣?嚙賡蕭??嚙踝蕭?靘矽?嚙賢銵嚗蝙?嚙質撓?嚙賣蝚佗蕭?鈭綽蕭??嚙踝蕭??嚙踝蕭?靘蕭??嚙踝蕭?蝣箏?嚙賢儐?嚙賭誘?嚙踝蕭?撠蕭?摰喉蕭?撣塚蕭??嚙踝蕭??嚙賢摰對蕭? :
          'The core technology of ChatGPT can be precisely explained through its full name GPT (Generative Pre-trained Transformer). These three words reveal its architecture, training methods, and core functions.',
        keyPoints: isZhHK ? [
          'Transformer嚗?嚙質瘜剁蕭??嚙踝蕭??嚙踝蕭?摨惜?嚙質??塚蕭?,
          '?嚙踝蕭?蝺湛蕭??嚙賜??嚙踝蕭蝧絲?嚙踝蕭??嚙踝蕭??嚙賣葫銝蕭??嚙踝蕭?嚙?,
          '?嚙踝蕭?撘蕭??嚙賡?嚙踝蕭??嚙賢摰對蕭??嚙?嚙賣?嚙賢撘芋??,
          '敺株矽?嚙賣挾嚗蝙?嚙賜摰遙?嚙賣?嚙踝蕭??嚙踝蕭?甇亙??,
          'RLHF嚗犖憿蕭?擖撥?嚙賢飛蝧蕭?雿輯撓?嚙賜泵?嚙賭犖憿蕭???
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
      title: isZhHK ? '?嚙踝蕭? 1.4嚗蕭??蝎橘蕭??嚙踝蕭?' : 'Unit 1.4: ?嚙踝蕭 Smart Choice',
      duration: '14?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '餈賣滲GPT璅∴蕭??嚙賜撅風蝔蕭?鈭圾瘥蕭?嚙?嚙踝蕭?嚙踝蕭??嚙質?嚙??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?暺蕭? : 'Trace the development history of GPT models, understanding the technical breakthroughs and key capability improvements of each generation.',
      content: {
        transcript: isZhHK ? 
          'GPT 璅∴蕭??嚙賜撅風蝔蕭??嚙賢撅內嚙?OpenAI ?嚙踝蕭?銵蕭??嚙質楝敺蕭?瘥蕭?嚙?嚙踝蕭?嚙賡?嚙踝蕭?璅∴蕭??嚙踝蕭?銝祕?嚙踝蕭?憿荔蕭??嚙踝蕭?頨蕭?頝荔蕭?銝蕭??嚙踝蕭?銵蕭??嚙賜撱嗡撓嚗蕭??嚙踝蕭?嚙?OpenAI ?嚙賜?嚙踝蕭??嚙賜嚗蕭??嚙賢遣蝡蕭??嚙賜霅殿?嚙踝蕭??嚙賢之?嚙賬蕭??嚙踝蕭??嚙踝蕭??嚙質?嚙踝蕭?隞扎蕭??嚙賢?鞈虫?嚙??嚙踝蕭??嚙踝蕭?蝬剖漲鈭蕭??嚙賬蕭?摰n\nGPT-1 (2018)嚗蕭??嚙踝蕭??嚙質蕭?GPT-1 擐活?嚙踝蕭??嚙踝蕭? Transformer ?嚙踝蕭??嚙賜?嚙踝蕭??嚙踝蕭??嚙踝蕭?蝺港遙?嚙賬蕭??嚙踝蕭? 1.17 ?嚙賢蕭??嚙踝蕭??嚙賜?嚙踝蕭?憭?嚙踝蕭?閮?嚙踝蕭??嚙踝蕭?皜祈岫銝哨蕭?敺蕭??嚙賜?嚙賜蜀嚗蕭?霅蕭??嚙踝蕭??嚙質?頝舐?嚙??嚙踝蕭??嚙賬n\nGPT-2 (2019)嚗蕭??嚙踝蕭?璅∴蕭?閮毀?嚙踝蕭??嚙賢之撟蕭??嚙踝蕭?撅鈭誘鈭綽蕭?閮蕭??嚙賡嚙?嚙踝蕭摮賂蕭??嚙踝蕭?Zero-shot learning嚗?嚙賬蕭??嚙踝蕭?摰隞亙瘝蕭?隞鳴蕭??嚙踝蕭?隞鳴蕭?蝭蕭??嚙踝蕭?瘜蕭?嚗蕭??嚙踝蕭?隞文停摰蕭?銝鈭隞鳴蕭?嚗＊蝷箏?嚙賢撥?嚙踝蕭??嚙質?嚙賬n\nGPT-3 (2020)嚗銝?嚙踝蕭?蝔蕭?撘蕭?璅∴蕭?嚗蕭???1750 ?嚙賢蕭??嚙賬?嚙賡＊嚙??嚙踝蕭??嚙賣撘瑕之?嚙賬蕭?嚙?嚙踝蕭摮賂蕭??嚙踝蕭?Few-shot learning嚗?嚙踝蕭??嚙賢?嚙?嚙踝蕭?蝷箔葉蝯血璆蛛蕭??嚙踝蕭?撟曉蕭?蝭蕭?嚗芋?嚙賢停?嚙踝蕭??嚙踝蕭??嚙賣隞鳴蕭??嚙賣芋撘蒂?嚙踝蕭??嚙踝蕭??嚙穀n\nInstructGPT (2022)嚗蕭??嚙質牧?嚙賣銝蕭?嚙?嚙踝蕭?嚙踝蕭?銝蕭?隤芣銝甈⊥?嚙賣改蕭?頧蕭??嚙瞌penAI ?嚙賜嚗蕭??嚙賬蕭?摮詻蕭?璅∴蕭?銝佗蕭?蝮賣?嚙踝蕭??嚙賬蕭??嚙踝蕭??嚙賬nstructGPT ?嚙踝蕭?撘嚙?RLHF 閮毀?嚙踝蕭?嚗?嚙質圾嚙?AI ?嚙賬蕭?朣蕭?Alignment嚗蕭?憿蕭??嚙賭蝙璅∴蕭??嚙踝蕭??嚙踝蕭?頛詨?嚙賜泵?嚙賭犖憿蕭??嚙踝蕭??嚙賢?嚙踝蕭??嚙賡蝙敺芋?嚙賣扔憭批?嚙踝蕭?鈭敺芰?嚙踝蕭?隞歹蕭??嚙踝蕭?嚗 ChatGPT ?嚙踝蕭??嚙踝蕭?摰蕭??嚙賡?嚙踝蕭??嚙穀n\nGPT-4 (2023)嚗PT-4 銝蕭??嚙踝蕭?閮?嚙質圾?嚙踝蕭?頛舀?嚙踝蕭?皞Ⅱ?嚙踝蕭??嚙踝蕭? GPT-3.5 ?嚙踝蕭?鞈迎蕭?憌蕭?嚗?嚙踝蕭??嚙賣嚗蕭??嚙賜鈭蕭??嚙賬蕭?璅∴蕭??嚙踝蕭?multimodal嚗芋?嚙賬蕭?擐活?嚙踝蕭?鈭蕭??嚙踝蕭??嚙賭誑憭縑?嚙踝蕭??嚙踝蕭?嚗憭?嚙踝蕭??嚙質圾?嚙踝蕭?頛詨嚗蕭?憒圾?嚙踝蕭?撘蛛蕭?銵剁蕭??嚙賢捆?嚙踝蕭?餈堆蕭?撘萇?嚙踝蕭??嚙賣?嚙穀n\nGPT-4o (2024)嚗 嚙?嚙踝蕭 "omni"嚗?嚙踝蕭?嚗蕭?隤蕭? OpenAI ?嚙踝蕭?璅∴蕭?鈭歹蕭?銝蕭??嚙踝蕭??嚙賢之蝒?嚙瘦PT-4o ?嚙踝蕭??嚙賢?嚙踝蕭?蟡蕭?蝬脩窗璅∴蕭?銝哨蕭??嚙賣?嚙踝蕭??嚙賣?嚙賡閮蕭?閬死?嚙踝蕭??嚙踝蕭??嚙賣芋?嚙賬蝙敺蕭??嚙踝蕭?撖衣餈蕭??嚙踝蕭??嚙賬扔?嚙質?嚙踝蕭?撖佗蕭?隤撠店嚗蒂?嚙踝蕭??嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭?隤?嚙踝蕭??嚙賡?嚙踝蕭??嚙踝蕭?閬死靽⊥嚗扔憭批?嚙踝蕭?嚙?AI 鈭歹蕭??嚙賭犖憿?嚙踝蕭??嚙踝蕭?頝?? :
          'The development history of GPT models clearly demonstrates OpenAI\'s technical evolution path, with each generation achieving significant leaps in scale and capabilities.',
        keyPoints: isZhHK ? [
          'GPT-1 (2018)嚗蕭??嚙質蕭?擐活撠ransformer?嚙賜?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚙?,
          'GPT-2 (2019)嚗蕭??嚙賡嚙?嚙踝蕭摮賂蕭??嚙踝蕭?嚗蕭??嚙踝蕭??嚙賣扯',
          'GPT-3 (2020)嚙?750?嚙踝蕭??嚙踝蕭?蝔蕭?嚗撥憭改蕭?嚙?嚙踝蕭摮賂蕭??嚙踝蕭?',
          'InstructGPT (2022)嚗蕭??嚙磋LHF嚗圾瘙態I撠蕭??嚙踝蕭?',
          'GPT-4 (2023)嚗蕭?璅∴蕭?蝒嚗?嚙踝蕭??嚙踝蕭?嚙?,
          'GPT-4o (2024)嚗?嚙踝蕭?璅∴蕭?嚗蕭??嚙賣?嚙踝蕭??嚙賬閮蕭?嚙?
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
      title: isZhHK ? '?嚙踝蕭? 1.5嚗蕭?嚙踝蕭? 摰閮鳴蕭?' : 'Unit 1.5: ?嚙踝蕭嚙?Secure Registration',
      duration: '13?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '鈭圾OpenAI敺蕭??嚙賢?嚙賜弦撖佗蕭?摰文AI撌券?嚙踝蕭??嚙賣風蝔蕭?隞伐蕭??嚙賡鈭箇?嚙賣?嚙賣捱蝑蕭? : 'Understand OpenAI\'s transformation from a non-profit research lab to an AI giant, including key figures and strategic decisions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?嚙賣帖蝛箏銝蕭?霈?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚙?OpenAI 敺蕭??嚙賢鈭箏極?嚙質?嚙賜弦?嚙踝蕭??嚙踝蕭?撠?嚙踝蕭?摮蕭?銝頨蕭??嚙賢?嚙踝蕭??嚙?嚙踝蕭??嚙踝蕭??嚙賢振?嚙賣?嚙踝蕭??嚙踝蕭??嚙穀n\n?嚙踝蕭??嚙踝蕭?嚙?(2015)嚗penAI ??2015 撟渡銝蝢歹蕭??嚙?嚙踝蕭??嚙踝蕭??嚙賢?嚙賢蝡蕭??嚙賭葉?嚙賣 Sam Altman?嚙瘟lon Musk?嚙瘦reg Brockman ??Ilya Sutskever 蝑犖?嚙賢?嚙?嚙踝蕭?敶ｇ蕭??嚙踝蕭??嚙踝蕭??嚙賢?嚙賜弦撖佗蕭?摰歹蕭??嚙賣?嚙踝蕭??嚙踝蕭?憭改蕭?雿踹嚗Ⅱ靽鈭箏極?嚙質嚗rtificial General Intelligence, AGI嚗蕭??嚙踝蕭??嚙踝蕭?摰?嚙踝蕭?鞎砌遙?嚙賡蕭??嚙賭犖憿蕭??嚙踝蕭??嚙質◤撠撌券憯?嚙踝蕭?鈭綽蕭?瑽蕭?憡蕭??嚙穀n\n頧蕭??嚙賢凝頠蕭??嚙賜?嚙踝蕭?嚗?嚙踝蕭?蝛塚蕭?瘛勗嚗penAI ?嚙踝蕭??嚙踝蕭?蝺湛蕭?撠之?嚙踝蕭?閮璅∴蕭??嚙質?璆?嚙踝蕭?憭改蕭?閮蕭?鞈蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢蝯蕭??嚙?嚙踝蕭??嚙賬鈭蕭?撠蕭??嚙賣嚗penAI ??2019 撟湧莎蕭?鈭蕭?瑽蕭?蝯蕭??嚙踝蕭?鈭蕭?摰塚蕭???OpenAI LP ?嚙賬瞏歹蕭??嚙賬蕭?capped-profit嚗?嚙賬蕭??嚙賜?嚙踝蕭?瑽?嚙賢像銵∪餈踝蕭?蝘蕭?雿踹?嚙賢撘蕭?璆哨蕭?鞈蕭??嚙賣??蕭?撟湛蕭?敺殷蕭???OpenAI ?嚙踝蕭?嚙?10 ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗蒂?嚙賡敺蕭?撟曉僑鋆∟蕭?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賜?嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭?雿丰隡湛蕭??嚙賢?嚙踝蕭?鈭蕭??嚙??Azure ?嚙踝蕭?蝞蕭?皞n\n?嚙賡鈭箇嚗?嚙踝蕭??嚙踝蕭?鈭箇?嚙賢?嚙踝蕭??嚙踝蕭?鈭箏銵蝮踝蕭? Sam Altman?嚙賢?嚙踝蕭? OpenAI 銋蕭?嚗ltman 隞亙雿?嚙踝蕭??嚙賢隡平摮蛛蕭???Y Combinator 蝮踝蕭??嚙踝蕭?甇瑁蕭??嚙踝蕭??嚙踝蕭?摮蛛蕭?嚙?Airbnb?嚙磋eddit 蝑憭?嚙踝蕭?璆准蕭??嚙踝蕭??嚙賢蝘蕭??嚙踝蕭?敶梢?嚙踝蕭??嚙踝蕭??嚙踝蕭?撠蕭?嚗葆??OpenAI 敺蕭??嚙踝蕭?蝛塚蕭?瑽蕭??嚙賜隡啣潭?嚙踝蕭?蝢蕭???AI 撌券?嚙賢銝雿蕭??嚙踝蕭?瘜剁蕭??嚙踝蕭?嚙?Elon Musk ?嚙踝蕭?撠?嚙賜撅?嚙踝蕭?摰?嚙踝蕭??嚙踝蕭??嚙踝蕭???2018 撟湧?嚙踝蕭? OpenAI ????嚙踝蕭?銝血銋蕭??嚙踝蕭?鈭撌梧蕭? AI ?嚙賢 xAI?嚙穀n\nChatGPT ?嚙踝蕭??嚙踝蕭? (2022)嚗蕭?嚙?OpenAI ?嚙賣迨銋蕭?撌莎蕭??嚙踝蕭?鈭蕭??嚙踝蕭??嚙踝蕭? GPT 璅∴蕭?嚗蒂?嚙賢飛銵蕭??嚙踝蕭??嚙質冗?嚙賭葉鈭?嚙踝蕭?霅踝蕭?雿蕭?嚙???嚙踝蕭??嚙踝蕭?撅扎蕭??嚙賢?嚙賣改蕭?瘜剁蕭?嚗 2022 嚙?11 ?嚙賜撣蕭? ChatGPT?嚙賢璆萄?嚙賜?嚙踝蕭?閰梧蕭??嚙踝蕭?撘瑕之?嚙質?嚙踝蕭?餈撘蕭??嚙賭誑?嚙踝蕭??嚙賜?嚙踝蕭?撘蕭?鈭?嚙踝蕭??嚙賢?嚙踝蕭??嚙踝蕭? AI ?嚙賣蔭嚗蒂靽蝙 Google?嚙瞎eta 蝑蕭??嚙賢楊?剔?嚙??嚙賡?嚙質撌梧蕭?蝡塚蕭??? :
          'The emergence of ChatGPT has transformed OpenAI from a respected name in AI research into a global tech focus and household brand.',
        keyPoints: isZhHK ? [
          '?嚙踝蕭??嚙質◎ (2015)嚗蕭??嚙賢?嚙賜弦撖佗蕭?摰歹蕭?蝣綽蕭?AGI摰?嚙踝蕭?鈭綽蕭?',
          '?嚙賜頧蕭? (2019)嚗蕭?蝯?嚙賣膜銝蕭??嚙賢嚗像銵∩蝙?嚙踝蕭??嚙踝蕭?',
          '敺殷蕭??嚙踝蕭?嚙?0?嚙踝蕭??嚙踝蕭?憪蕭?鞈蕭??嚙踝蕭?Azure?嚙踝蕭?蝞蕭?嚙?,
          '?嚙賡鈭箇嚗am Altman (CEO)?嚙瘟lon Musk (撌脤???嚙瘢lya Sutskever',
          'ChatGPT撘蕭?嚙?(2022)嚗蕭??嚙踝蕭?撅歹蕭?撘?嚙踝蕭??嚙踝蕭?撘I?嚙賣蔭',
          '銵平敶梢嚗蕭?雿澶oogle?嚙瞎eta蝑楊?嚙踝蕭??嚙賣?嚙賜奎??
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

    // 蝚穿蕭?蝡蕭??嚙賣?嚙踝蕭???撣單閮哨蕭??嚙踝蕭??嚙踝蕭?嚙?    '6': {
      id: 6,
      themeId: 2,
      title: isZhHK ? '?嚙踝蕭? 2.1嚗蜓隞瘛勗漲撠汗嚗蕭?閰梧蕭?蝒風?嚙踝蕭???(History) ?嚙質身摰蕭?' : 'Unit 2.1: Main Interface Deep Tour: Chat Window, History & Settings',
      duration: '12?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '閰喟敦隞晶 ChatGPT 銝鳴蕭??嚙踝蕭??嚙賢蕭?蝝蕭??嚙賣撠店閬蕭??嚙踝蕭??嚙賣風?嚙踝蕭??嚙賜恣?嚙踝蕭?閮哨蕭??嚙?嚙質?? : 'Detailed introduction to ChatGPT main interface elements, including chat window operations, history management, and settings functionality.',
      content: {
        transcript: isZhHK ? 
          '?嚙賣擐活?嚙賢 ChatGPT ?嚙踝蕭??嚙踝蕭??嚙賢銝?嚙賜陛瞏蕭??嚙踝蕭?撖蕭?銝鳴蕭??嚙賬蕭?嚙?嚙踝蕭?蕭??嚙踝蕭?瘥蕭?蝝蕭?撟怠?嚙賣?嚙踝蕭??嚙賭蝙??ChatGPT?嚙穀n\n撠店閬蕭??嚙賣?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗蕭??嚙質撟葉憭柴ㄐ?嚙賣??ChatGPT ?嚙踝蕭?撠店?嚙賭蜓閬蕭??嚙賬撠店閬蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢?嚙踝蕭?頛詨獢蕭??嚙賣?嚙質撓?嚙踝蕭?憿蕭??嚙賭誘?嚙賢?嚙賬撓?嚙踝蕭??嚙賣憭蕭??嚙踝蕭?嚗?嚙賭誑??Shift+Enter 靘蕭?銵蕭??嚙賢蝝蕭? Enter ?嚙踝蕭??嚙賢閮?嚙穀n\n撌血?嚙踝蕭??嚙賢?嚙踝蕭?撠店甇瑕蝝?嚙賬蕭?甈∴蕭?憪撠店?嚙踝蕭?ChatGPT ?嚙踝蕭??嚙踝蕭??嚙賢遣銝?嚙賣?嚙踝蕭?閰梧蕭??嚙賬蕭?撠店?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗蕭??嚙踝蕭?撠店憿舐內?嚙踝蕭?銝?嚙賣?嚙賭誑暺蕭?隞鳴蕭?銝?嚙賣風?嚙踝蕭?閰梧蕭??嚙賣?嚙踝蕭?摰蕭?蝜潘蕭?銋蕭??嚙踝蕭?隢n\n?嚙賢椰?嚙踝蕭?甈蕭??嚙賡嚗?嚙踝蕭??嚙賬ew Chat?嚙踝蕭??嚙踝蕭?暺蕭?摰隞伐蕭?憪?嚙踝蕭?撠店?嚙踝蕭?雿蕭?瘥蕭?閰梢?嚙賜蝡蕭? - ChatGPT 銝蕭?閮蕭??嚙踝蕭?撠店銝哨蕭??嚙賢捆?嚙穀n\n?嚙踝蕭?閫蕭??嚙賭犖鞈蕭??嚙?嚙踝蕭?靘蕭??嚙賢董?嚙踝蕭?摮蕭??嚙賡ㄐ?嚙賢隞亦恣?嚙踝蕭??嚙賬?嚙賭蝙?嚙踝蕭?瘜蕭?隞伐蕭?摮蕭??嚙踝蕭?閮哨蕭??嚙踝蕭???ChatGPT Plus ?嚙賣嚗ㄐ?嚙踝蕭?憿舐內?嚙踝蕭?閮?嚙?嚙踝蕭??嚙賜?嚙踝蕭??嚙踝蕭??嚙踝蕭? :
          'When you first log into ChatGPT, you\'ll see a clean yet feature-rich main interface. Understanding each element of this interface will help you use ChatGPT more effectively.',
        keyPoints: isZhHK ? [
          '撠店閬蕭?嚗蕭??嚙賣敹蕭??嚙踝蕭? AI 撠店?嚙賭蜓閬蕭???,
          '?嚙踝蕭?頛詨獢蕭??嚙賣憭蕭?頛詨嚗hift+Enter?嚙踝蕭?嚗nter?嚙賢',
          '甇瑕蝝?嚙踝蕭?撌血?嚙踝蕭?憿舐內?嚙?嚙踝蕭?閰梧蕭??嚙踝蕭??嚙踝蕭?嚙?,
          'New Chat ?嚙踝蕭?嚗蕭?憪?嚙賜蝡蕭?嚙?,
          '?嚙賭犖鞈蕭??嚙踝?蝞?嚙賢董?嚙賬蕭??嚙踝蕭?閮哨蕭?'
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
      title: isZhHK ? '?嚙踝蕭? 2.2嚗蕭?閰梁恣?嚙踝蕭?撌改蕭?憒蕭??嚙踝蕭??嚙踝蕭? (Rename)?嚙踝蕭?嚙?(Share) ?嚙賢??(Delete) 撠店' : 'Unit 2.2: Conversation Management: Rename, Share & Delete Conversations',
      duration: '10?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '摮賂蕭?憒蕭??嚙踝蕭?蝞∴蕭??嚙踝蕭? ChatGPT 撠店嚗蕭??嚙踝蕭??嚙賢?嚙賬蕭?鈭恬蕭???嚙賢?嚙踝蕭??嚙質?嚙?撠店?? : 'Learn how to effectively manage your ChatGPT conversations, including renaming, sharing links, and deleting unnecessary conversations.',
      content: {
        transcript: isZhHK ? 
          '?嚙踝蕭??嚙踝蕭?閰梁恣?嚙賣?嚙踝蕭? ChatGPT 雿輻擃蕭??嚙踝蕭??嚙賬?嚙賣雿輻 ChatGPT ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?蝝荔蕭?憭改蕭??嚙踝蕭?閰梧蕭??嚙賬飛?嚙賜恣?嚙賡蕭?撠店撠鼠?嚙賣敹恍?嚙踝蕭?閬蕭?鞈蕭??嚙穀n\n?嚙賣?嚙踝蕭?撠店?嚙踝蕭?蝜蕭?閰梧蕭?蝚穿蕭?甇乓蕭?閮哨蕭?瘜蕭?嚗hatGPT ?嚙賣?嚙踝蕭?閰梧蕭??嚙賡撟曉閰梯?嚙賢?嚙踝蕭?閰晞蕭??嚙踝蕭??嚙賢隞亦策撠店?嚙賣?嚙踝蕭?蝢抬蕭??嚙賜迂?嚙踝蕭??嚙賣?嚙踝蕭?撠店嚗?嚙賢?嚙?曌?嚙賢撌血?嚙踝蕭??嚙踝蕭?閰梧蕭?憿蕭?嚗蕭??嚙賢?嚙踝蕭?蝺刻摩?嚙賜內嚗敺撓?嚙賣?嚙踝蕭?蝔晞末?嚙賢?嚙踝蕭??嚙踝蕭??嚙踝蕭?雿輻撠蕭??嚙賜迂?嚙賭蜓憿蕭??嚙踝蕭?嚗蕭??嚙賣?嚙踝蕭?閮n\n?嚙賭澈撠店?嚙質霈?嚙賭誑?嚙踝蕭?鈭綽蕭?鈭急??ChatGPT 撠店?嚙賡蕭??嚙踝蕭??嚙踝蕭?雿蕭?摮賂蕭??嚙踝蕭?嚙?AI 憒蕭?嚙?嚙踝蕭?嚙踝蕭??嚙踝蕭??嚙賢虜?嚙賜?嚙踝蕭??嚙賭澈撠店嚗蕭??嚙踝蕭?閰梧蕭??嚙踝蕭?鈭恬蕭?蝷綽蕭?ChatGPT ?嚙踝蕭??嚙踝蕭??嚙賢?嚙踝蕭???嚙踝蕭?閬蕭??嚙踝蕭??嚙賭澈?嚙踝蕭?閰梧蕭?霈蕭??嚙踝蕭??嚙踝蕭?嚗遙雿蕭??嚙踝蕭???嚙賭犖?嚙賢隞交?嚙踝蕭??嚙賣迨隢Ⅱ靽蕭?閬蕭?鈭恬蕭??嚙踝蕭??嚙踝蕭?閮蕭?撠店?嚙穀n\n?嚙賡撠店?嚙質撟怠?嚙踝蕭??嚙踝蕭?閰梧蕭?銵剁蕭??嚙踝蕭??嚙踝蕭??嚙賡撠店嚗蕭??嚙踝蕭?閰梧蕭??嚙賢?嚙踝蕭?蝷箝蕭?瘜剁蕭?嚗蕭??嚙賢?嚙踝蕭?閰梧蕭?閰莎蕭?雿瘜?嚙踝蕭??嚙?嚙踝蕭?閰勗摰對蕭?瘞賂蕭?瘨仃?嚙踝蕭?甇歹蕭??嚙賢?嚙踝蕭?閬蕭?閰梧蕭??嚙踝蕭?隢蕭??嚙質蕭?銵n\n撱箄降?嚙賜恣?嚙踝蕭??嚙踝蕭??嚙踝蕭?閬蕭?獢遣蝡蕭??嚙?嚙踝蕭?閰曹蒂蝯佗蕭?皜?嚙賢?嚙踝蕭?摰蕭?皜蕭?皜祈岫?嚙踝蕭??嚙踝蕭??嚙踝蕭?撠店嚗蕭??嚙賢?嚙踝蕭?撠店?嚙踝蕭??嚙賢?嚙踝蕭?閬摰對蕭? :
          'Effective conversation management is key to enhancing your ChatGPT experience. As you use ChatGPT longer, you\'ll accumulate many conversation records.',
        keyPoints: isZhHK ? [
          '?嚙賣?嚙踝蕭?嚗蝙?嚙踝蕭?獢蕭?蝔晞蜓憿蕭??嚙踝蕭??嚙賣?嚙踝蕭?嚙?,
          '?嚙賭澈?嚙質嚗蕭??嚙賢?嚙踝蕭??嚗?嚙踝蕭??嚙踝蕭?雿蕭??嚙賢飛',
          '瘜剁蕭??嚙踝蕭?嚗蕭?鈭恬蕭?撠店霈蕭??嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭??嚙踝蕭?嚙?,
          '?嚙賡蝞∴蕭?嚗蕭?雿瘜?嚙踝蕭??嚙賡?嚙踝蕭?銝蕭?,
          '蝞∴蕭?蝑嚗蕭??嚙?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賬?嚙踝蕭?閬嚙?
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
      title: isZhHK ? '?嚙踝蕭? 2.3嚗ustom Instructions (?嚙踝蕭??嚙賭誘)嚗蕭??嚙踝蕭??嚙賢犖??AI ?嚙踝蕭?嚗蕭?瘥活?嚙踝蕭??嚙質票嚙? : 'Unit 2.3: Custom Instructions: Create Your Personal AI Assistant',
      duration: '15?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '摮賂蕭?憒蕭?閮哨蕭??嚙踝蕭??嚙賭誘嚗蕭? ChatGPT ?嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭?瘙蕭??嚙賢末嚗蕭?靘?嚙賭犖?嚙踝蕭??嚙踝蕭??? : 'Learn how to set up custom instructions to make ChatGPT better understand your needs and preferences for more personalized responses.',
      content: {
        transcript: isZhHK ? 
          'Custom Instructions嚗閮蕭?隞歹蕭???ChatGPT Plus ?嚙賣?嚙賭蝙?嚙踝蕭?撘瑕之?嚙質嚗蕭??嚙質迂?嚙賜?嚙?嚙賣撠店閮哨蕭??嚙質身?嚙踝蕭??嚙踝蕭?閮蕭??嚙踝蕭??嚙賢末?嚙賡蕭??嚙賢停?嚙賣嚙?ChatGPT 銝隞賬蝙?嚙踝蕭??嚙賬蕭??嚙質迄摰?嚙質狐?嚙賣?嚙賢極雿扯釭嚗誑?嚙賣撣蕭?摰蕭?雿蕭?蝑蕭?憿n\n閮哨蕭??嚙踝蕭??嚙賭誘?嚙賜?嚙賢蜓閬?嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭??嚙賣撣蕭? ChatGPT 憒蕭??嚙踝蕭??嚙賬n\n?嚙賬蕭??嚙賣?嚙踝蕭??嚙踝蕭?嚗?嚙賭誑?嚙踝蕭??嚙賭犖?嚙賣鞈蕭??嚙踝蕭?憒蕭??嚙踝蕭??嚙賣平嚗蕭??嚙踝蕭??嚙踝蕭?擃極蝔葦?嚙踝蕭??嚙踝蕭?璆哨蕭??嚙踝蕭??嚙踝蕭?蝎暹璈摮賂蕭??嚙踝蕭??嚙賜?嚙踝蕭?獢蕭??嚙賣迤?嚙踝蕭??嚙踝蕭??嚙賡?嚙賢像?嚙賬蕭??嚙賢飛蝧璅蕭??嚙賣閬飛嚙?Python 蝔蕭?閮哨蕭??嚙踝蕭?蝑蕭?鞈蕭?撟怠 ChatGPT ?嚙質圾?嚙踝蕭?頨思遢?嚙踝蕭?瘙n\n?嚙賬撣蕭? ChatGPT 憒蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗?嚙賭誑閮哨蕭??嚙踝蕭??嚙賡◢?嚙踝蕭??嚙踝蕭??嚙賢末?嚙踝蕭?憒蕭??嚙踝蕭??嚙踝蕭?擃葉?嚙踝蕭?蝑蕭?蝑蕭?蝪∴蕭??嚙賜嚗蕭?頞蕭? 200 摮?嚙踝蕭??嚙質?嚙?憿蕭?嚗蕭??嚙踝蕭?撖佗蕭??嚙踝蕭?撘Ⅳ蝭蕭??嚙賬蝙?嚙踝蕭??嚙踝蕭?撠平?嚙踝蕭?隤踴蕭??嚙穀n\n?嚙踝蕭??嚙質閮蕭?隞歹蕭?靘蕭?\n撠摮賂蕭?嚗蕭??嚙踝蕭?閮極蝔頂鈭僑蝝飛?嚙踝蕭?嚙?嚙踝蕭摮賂蕭?鞈蕭?蝯蕭??嚙踝蕭?蝞蕭??嚙踝蕭??嚙賣滓憿荔蕭??嚙踝蕭??嚙踝蕭?嚙??璁艙嚗蒂?嚙踝蕭? Python 蝔蕭?蝣潘蕭?靘n撠撠平鈭箏ㄚ嚗蕭??嚙賜?嚙踝蕭??嚙踝蕭?鞎痊 B2B SaaS ?嚙踝蕭??嚙賢閮蕭??嚙賣平蝑?嚙踝蕭?隢蕭??嚙賣撖佗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡?嚙踝蕭??嚙賬n\n閮蕭?嚗蕭??嚙質身摰蕭??嚙踝蕭??嚙賭誘嚗蕭??嚙踝蕭??嚙賢?嚙?嚙賣?嚙踝蕭?閰曹葉嚗蕭?銝蕭?敶梢?嚙踝蕭??嚙踝蕭?閰晞?嚙賭誑?嚙踝蕭?靽格?嚙踝蕭??嚙賡蕭??嚙賭誘?? :
          'Custom Instructions is a powerful feature available to ChatGPT Plus users, allowing you to set default background information and response preferences for all new conversations.',
        keyPoints: isZhHK ? [
          '?嚙賢之閮哨蕭?嚗蕭??嚙賣?嚙踝蕭?靘犖?嚙賣嚗蕭??嚙踝蕭?憟賬身摰◢??,
          '?嚙賭犖?嚙賣嚗璆准蕭?璆哨蕭??嚙賬?嚙踝蕭?獢飛蝧嚙?,
          '?嚙踝蕭??嚙賢末嚗蕭?閮?嚙賡摨艾撘蕭?隤選蕭?閮哨蕭?',
          '撖佗蕭??嚙賜嚗摮賂蕭??嚙踝蕭?璆凋犖憯恬蕭?銝蕭?閫摰Ｚˊ??,
          '雿輻蝭蕭?嚗蕭?憟?嚙賣撠店嚗?嚙踝蕭?靽格?嚙踝蕭???
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
      title: isZhHK ? '?嚙踝蕭? 2.4嚗蕭?嚙?App ?嚙踝蕭??嚙質嚗蕭??嚙踝蕭?閰梧蕭??嚙踝蕭?颲剁蕭?撖行' : 'Unit 2.4: Mobile App Exclusive Features: Voice Chat & Image Recognition',
      duration: '13?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '?嚙賜揣 ChatGPT ?嚙踝蕭??嚙賜蝔蕭??嚙賜?嚙踝蕭??嚙踝蕭??嚙賣隤撠店?嚙踝蕭??嚙質儘霅蕭??嚙踝蕭?銵蕭?鋆蔭雿輻擃蕭??? : 'Explore the unique features of ChatGPT mobile app, including voice conversations and image recognition, enhancing mobile device user experience.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?嚙踝蕭??嚙賜蝔蕭??嚙踝蕭?鈭雯?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賜?嚙質嚗蕭??嚙賢隞交?嚙賜?嚙賣靘踹?嚙踝蕭? AI 鈭蕭??嚙賡蕭??嚙質?嚙賢?嚙踝蕭??嚙賜宏?嚙賭葉雿輻嚗蕭??嚙賣?嚙質???嚙踝蕭??嚙賣?嚙踝蕭??嚙賭漱瘚撘蕭??嚙穀n\n隤撠店?嚙質?嚙踝蕭?嚙?App ?嚙賭漁暺蕭?銝?嚙賡蕭??嚙踝蕭??嚙賢隞亦?嚙踝蕭? ChatGPT ?嚙踝蕭?隤撠店嚗停?嚙踝蕭??嚙賭犖?嚙賢予銝嚙?嚙踝蕭嚙?雿輻隤?嚙質嚗?嚙賡?嚙?閮頛詨獢蕭??嚙賡漸?嚙賡◢?嚙賜內嚗敺蕭?憪牧閰晞hatGPT ?嚙踝蕭??嚙踝蕭?隤頧蕭??嚙踝蕭?摮蕭??嚙踝蕭?敺蕭?隞伐蕭??嚙踝蕭??嚙賣?嚙穀n\n隤撠店?嚙賢?嚙踝蕭??嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭?嚗?嚙踝蕭?擏蕭??嚙踝蕭??嚙賭蝙?嚙踝蕭??嚙質?嚙踝蕭?鈭歹蕭??嚙踝蕭?嚗?嚙賡?嚙賜毀蝧蕭?閮?嚙賡莎蕭??嚙踝蕭??嚙賣嚗蕭?擃蕭??嚙踝蕭?隤芾店?嚙賢虜瘥蕭?摮敹恬蕭?憭蕭?閮?嚙賣嚗隞亦毀蝧蕭??嚙踝蕭?閮?嚙賜?嚙踝蕭?撠店?嚙穀n\n?嚙踝蕭?颲剁蕭??嚙質霈?嚙賭誑銝?嚙踝蕭?銝佗蕭? ChatGPT ?嚙踝蕭??嚙踝蕭?餈堆蕭??嚙賢摰嫘蕭??嚙賢敺蕭?撖佗蕭??嚙賣銝剝?嚙賢虜?嚙賜嚗蕭??嚙踝蕭??嚙賬蕭??嚙踝蕭??嚙踝蕭?嚗圾霈?嚙質”?嚙踝蕭?隞塚蕭??嚙賢神蝑蕭?嚗蕭??嚙踝蕭?銵蕭??嚙踝蕭?撱綽蕭?嚗蕭??嚙踝蕭?閬綽蕭?蝷?嚙踝蕭?嚙???嚙賢摰嫘n\n閬蝙?嚙踝蕭??嚙踝蕭??嚙踝蕭?暺蕭?閮頛詨獢蕭??嚙賜璈蕭?蝷綽蕭??嚙踝蕭??嚙踝蕭??嚙賜?嚙踝蕭??嚙賜倏?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗?嚙賭誑閰ｇ蕭? ChatGPT ?嚙賣?嚙踝蕭??嚙賭遙雿蕭?憿蕭?靘蕭??嚙賡隞暻潘蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質膩?嚙賢撐?嚙踝蕭??嚙賢摰嫘n\n雿輻?嚙賢概嚙?蝣綽蕭??嚙踝蕭?皜嚗?嚙賣芋蝟蕭??嚙踝蕭?銝雲嚗蕭?靘擃蕭??嚙踝蕭?嚗蕭??嚙賢?嚙賬隞暻潘蕭??嚙踝蕭?撠銴蕭??嚙踝蕭?嚗隞伐蕭??嚙賣?嚙踝蕭?嚙???嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭??嚙踝蕭??嚙賢飛蝧?嚙踝蕭?嚗蕭?憒蕭??嚙賢遣蝭◢?嚙踝蕭??嚙踝蕭?瘚晷?? :
          'The ChatGPT mobile app provides unique features not available in the web version, allowing for more natural and convenient AI interaction.',
        keyPoints: isZhHK ? [
          '隤撠店嚗漸?嚙賡◢?嚙賜內?嚙踝蕭?嚗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭???,
          '隤?嚙賢嚗圾?嚙踝蕭??嚙賬?嚙賭漱瘚蕭?擃蕭??嚙賬蕭?隤蕭??嚙賣',
          '?嚙踝蕭?颲剁蕭?嚗蕭??嚙賜?嚙踝蕭? ChatGPT ?嚙踝蕭??嚙踝蕭?餈啣嚙?,
          '撖衣?嚙賣嚗蕭??嚙賜?嚙賬圾霈?嚙賭辣?嚙踝蕭??嚙踝蕭?銵蕭??嚙踝蕭???,
          '雿輻?嚙賢概嚙?皜?嚙踝蕭??嚙賢擃蕭?憿蕭?摰?嚙賬飛蝧蕭???
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
      title: isZhHK ? '?嚙踝蕭? 2.5嚗嚙?GPT Store嚗蕭?雿蕭??嚙賬蕭?隡堆蕭?雿輻?嚙賭犖撱綽蕭??嚙賢蝘 GPTs' : 'Unit 2.5: Exploring GPT Store: Finding, Evaluating & Using GPTs',
      duration: '14?嚙踝蕭?',
      type: 'text' as const,
      description: isZhHK ? '瘛勗鈭圾 GPT Store ?嚙賭蝙?嚙賣瘜蕭?摮賂蕭?憒蕭??嚙賢?嚙踝蕭??嚙質嚙?GPT嚗蒂?嚙踝蕭?閰摯?嚙賭蝙?嚙踝蕭??嚙踝蕭? : 'Deep dive into GPT Store usage, learn how to find suitable custom GPTs and effectively evaluate and use them.',
      content: {
        transcript: isZhHK ? 
          'GPT Store ??OpenAI ?嚙賢?嚙踝蕭??嚙踝蕭??嚙賢像?嚙踝蕭?憿撮?嚙踝蕭?璈蕭? App Store嚗蕭?撠蕭??嚙賣?嚙賭澈?嚙賜?嚙質閮蕭? GPT ?嚙賜蝔蕭??嚙賡像?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賜?嚙踝蕭??嚙踝蕭??嚙賢隞亙遣蝡蕭??嚙?嚙踝蕭? AI ?嚙踝蕭?嚗蒂?嚙賢隞?嚙踝蕭?鈭怒n\n閬脣 GPT Store嚗?嚙質???ChatGPT Plus 閮?嚙賣?嚙賢 ChatGPT 隞銝哨蕭?暺蕭?撌佗蕭?閫蕭??嚙瘟xplore GPTs?嚙踝蕭??嚙賣撠店銝剝?嚙賬PT Store?嚙賡?嚙賬脣敺蕭??嚙踝蕭??嚙賢?嚙賜車?嚙踝蕭???GPT嚗蕭??嚙踝蕭??嚙賜?嚙賢極?嚙賬蕭??嚙賢?嚙賬?嚙賢神雿蕭?撘身閮蕭?閮摮賂蕭?蝑n\n撠?嚙踝蕭???GPT ?嚙賢嗾?嚙踝蕭??嚙踝蕭?\n\n雿輻?嚙踝蕭??嚙質嚗?嚙踝蕭?撠蕭??嚙踝蕭?嚗蕭?憒ython 蝔蕭?閮哨蕭??嚙賬陛甇瑟撖怒蕭??嚙踝蕭?閮蝧餉陌?嚙賬n\n?嚙質汗?嚙踝蕭?嚗PT Store 嚙?GPT ?嚙賜銝蕭?憿嚗?嚙賭誑?嚙踝蕭??嚙賣??汗?嚙踝蕭??嚙踝蕭??嚙穀n\n?嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭?撟喳?嚙賣?嚙賜?嚙?嚙踝蕭??嚙質釭??GPT嚗蕭??嚙賢虜?嚙踝蕭??嚙踝蕭?霅蕭??嚙踝蕭??嚙賜?嚙穀n\n閰摯 GPT ?嚙質釭?嚙踝蕭??嚙踝蕭?璅蕭?\n\n?嚙賣閰蕭??嚙踝蕭?隢蕭??嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭??嚙踝蕭?雿輻蝬蕭??嚙穀n\n?嚙賜?嚙踝蕭?閮蕭?鈭圾?嚙賢遣?嚙踝蕭??嚙賣?嚙踝蕭?璆哨蕭?摨艾n\n?嚙質?嚙質膩嚗蕭?蝝圈霈 GPT ?嚙踝蕭??嚙質牧?嚙踝蕭?雿輻獢蕭??嚙穀n\n?嚙賣?嚙踝蕭?嚗蕭??嚙賣?嚙踝蕭? GPT ?嚙賢虜蝬剛風敺憟賬n\n雿輻 GPT ?嚙踝蕭?雿喳祕頦蕭?\n\n?嚙賡霈雿輻隤迎蕭?嚗蕭???GPT ?嚙踝蕭??嚙踝蕭??嚙賭蝙?嚙賣瘜蕭??嚙賭誘?嚙踝蕭??嚙穀n\n皜祈岫?嚙賣?嚙質嚗蕭??嚙賜陛?嚙踝蕭??嚙踝蕭?皜祈岫 GPT ?嚙賡?嚙踝蕭?鞈芥n\n鈭圾?嚙賢嚗蕭???GPT ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢嚗蕭?嚙?嚙踝蕭嚙??嚙賢?嚙賣憟賢雿輻?嚙穀n\n?嚙踝蕭?皜?嚙賭誘嚗停?嚙賭蝙?嚙踝蕭?嚙?ChatGPT 銝嚙??皜?嚙踝蕭?隞歹蕭??嚙踝蕭??嚙賢末?嚙踝蕭??嚙踝蕭? :
          'GPT Store is a marketplace platform launched by OpenAI, similar to a mobile App Store, but specifically for sharing and discovering custom GPT applications.',
        keyPoints: isZhHK ? [
          'GPT Store嚗penAI 撣蕭?撟喳嚗蕭? ChatGPT Plus 閮',
          '撠蝑嚗蕭?撠蕭??嚙踝蕭??嚙賜汗?嚙踝蕭??嚙賣?嚙賜?嚙?嚙質',
          '閰摯?嚙踝蕭?嚗?嚙踝蕭??嚙賬蕭??嚙質蕭?閮蕭??嚙踝蕭?餈啜?嚙賡??,
          '雿輻撖佗蕭?嚗霈隤迎蕭??嚙賣葫閰佗蕭??嚙賬蕭?嚙???嚙賬蕭??嚙踝蕭?嚙?,
          '?嚙踝蕭?蝭蕭?嚗蕭??嚙踝蕭??嚙踝蕭??嚙賬?嚙賬蕭?撘身閮蕭?閮摮賂蕭?'
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

    // 蝚穿蕭?銝鳴蕭?嚗蕭?隞歹蕭??嚙踝蕭? (Prompt Engineering)
    '11': {
      id: 11,
      themeId: 3,
      title: isZhHK ? '?嚙踝蕭? 3.1嚗鞈迎蕭?隞歹蕭??嚙賢之?嚙賜嚗蕭???(Role)?嚙賭遙??(Task)?嚙踝蕭?嚙?(Context)?嚙賣嚙?(Format)' : 'Unit 3.1: Four Pillars of Quality Prompts: Role, Task, Context, Format',
      duration: '32?嚙踝蕭?',
      type: 'interactive' as const,
      description: isZhHK ? '摮賂蕭?瑽遣擃蕭??嚙賜內閰蕭??嚙賢之?嚙踝蕭?閬蕭?嚗遣蝡頂蝯望改蕭? Prompt 閮哨蕭?獢?? : 'Learn the four core elements for building effective prompts and establish a systematic prompt design framework.',
      content: {
        transcript: isZhHK ? 
          '?嚙質釭??Prompt 閮哨蕭??嚙踝蕭??嚙賣敹?嚙踝蕭?閫 (Role)?嚙賭遙??(Task)?嚙踝蕭?嚙?(Context) ?嚙賣嚙?(Format)嚗陛嚙?RTCF 獢?嚙穀n\n**閫 (Role)**嚗蕭?蝣綽蕭?嚙?ChatGPT ?嚙質府?嚙踝蕭??嚙踝蕭??嚙踝蕭?頨思遢?嚙踝蕭?憒蕭??嚙踝蕭??嚙踝蕭?雿蕭?瘛梧蕭?撣?嚙賡撠振?嚙賬蕭??嚙踝蕭??嚙踝蕭?撽蕭?撖蕭?蝔蕭?閮哨蕭?撣怒蕭??嚙賣瞍蕭?雿蕭??嚙質隤葦?嚙賬蕭??嚙質身摰鼠??AI 隞亦摰蕭?撠平閬蕭??嚙踝蕭?隤選蕭??嚙踝蕭??嚙穀n\n**隞鳴蕭? (Task)**嚗蕭?璆牧?嚙踝蕭?撣蕭? AI 摰蕭??嚙賢擃遙?嚙賬遙?嚙踝蕭?餈堆蕭?閰脣擃蕭?蝣綽蕭??嚙踝蕭?璅∴蕭??嚙質”?嚙賬蕭?憒蕭??嚙賢鼠?嚙賣撖恬蕭?隞賜?嚙賜撣蕭??嚙賣?嚙賜阮?嚙質蕭??嚙賢鼠?嚙賢神暺镼踴n\n**?嚙賜窗 (Context)**嚗蕭?靘?嚙踝蕭??嚙賣鞈蕭??嚙踝蕭??嚙踝蕭?隞塚蕭??嚙踝蕭?閬蕭??嚙賡蕭??嚙賜璅蕭??嚙賬蝙?嚙賢?嚙賬畾蕭?瘙蕭??嚙踝蕭?憒蕭??嚙賡遢?嚙踝蕭?蝔選蕭??嚙賡策蝘蕭?慦蕭?嚗蕭?暺撥隤輻?嚙踝蕭??嚙賣?嚙踝蕭?摮?嚙賢??500 摮誑?嚙賬n\n**?嚙踝蕭? (Format)**嚗蕭?摰蕭??嚙踝蕭?頛詨?嚙踝蕭??嚙踝蕭?瑽蕭?憒蕭??嚙踝蕭?隞伐蕭??嚙踝蕭??嚙踝蕭?敶ｇ蕭??嚙賬銵冽敶ｇ蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣挾?嚙踝蕭?瘥挾銝蕭???100 摮n\n撖佗蕭?撠蕭?嚗n\n**撌殷蕭? Prompt**嚗鼠?嚙賢神?嚙踝蕭??嚙賬n\n**憟踝蕭? Prompt**嚗n- **閫**嚗蕭??嚙踝蕭?雿蕭?璆哨蕭??嚙賜蝞∴蕭?憿改蕭?\n- **隞鳴蕭?**嚗?嚙賢摰蕭??嚙賜??3 ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙穀n- **?嚙賜窗**嚗蕭?嚙?10 鈭綽蕭?頠蕭??嚙賜?嚙踝蕭?嚗蕭?暺蕭??嚙踝蕭?蝡荔蕭??嚙踝蕭??嚙賣擃蕭?閮哨蕭??嚙踝蕭?嚗蕭?蝞蕭??嚙賢 50,000 ?嚙賢\n- **?嚙踝蕭?**嚗蕭?隞伐蕭??嚙質遘敶ｇ蕭??嚙賜嚗蕭??嚙賢擃蕭??嚙踝蕭??嚙賢捆?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?' :
          'Quality Prompt design has four core pillars: Role, Task, Context, and Format, known as the RTCF framework.',
        keyPoints: isZhHK ? [
          '閫 (Role)嚗蕭?蝣綽蕭?嚙?AI ?嚙賣瞍蕭?頨思遢?嚙踝蕭?璆哨蕭?嚙?,
          '隞鳴蕭? (Task)嚗蕭?璆牧?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?隞鳴蕭?',
          '?嚙賜窗 (Context)嚗蕭?靘蕭??嚙踝蕭?閮蕭??嚙踝蕭?隞塚蕭??嚙踝蕭?閬蕭?',
          '?嚙踝蕭? (Format)嚗蕭?摰蕭??嚙踝蕭?頛詨?嚙踝蕭??嚙踝蕭?嚙?,
          'RTCF 獢嚗頂蝯望改蕭? Prompt 閮哨蕭??嚙踝蕭?'
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
      title: isZhHK ? '?嚙踝蕭? 3.2嚗蕭??嚙賣瞍蕭?嚗蕭? ChatGPT ?嚙賜雿蕭?蝘犖敺葦?嚙踝蕭?撘身閮葦?嚙踝蕭??嚙踝蕭?嚙? : 'Unit 3.2: Role-Playing Method: Make ChatGPT Your Personal Expert',
      duration: '28?嚙踝蕭?',
      type: 'interactive' as const,
      description: isZhHK ? '?嚙賣閫閮哨蕭??嚙賢概嚙?嚙?ChatGPT 隞伐蕭?璆剛澈隞踝蕭?靘蝎橘蕭??嚙賢遣霅堆蕭?嚙???? : 'Master role-setting techniques to make ChatGPT provide more precise advice as a professional.',
      content: {
        transcript: isZhHK ? 
          '閫?嚙踝蕭??嚙踝蕭? ChatGPT ?嚙賣撠平?嚙踝蕭??嚙踝蕭??嚙踝蕭?撌扼蕭?閮哨蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?AI ?嚙賭誑閰莎蕭?璆哨蕭?閬蕭??嚙賜霅蕭?隤蕭?憸冽靘蕭??嚙踝蕭??嚙踝蕭?憿n\n**?嚙踝蕭??嚙踝蕭??嚙質身摰蕭?蝝蕭?**\n\n1. **撠平?嚙賣**嚗蕭?蝣綽蕭??嚙踝蕭?璆哨蕭??嚙踝蕭?蝬蕭?瘞游像\n   - ?嚙踝蕭??嚙踝蕭?雿蕭? 10 撟湛蕭?撽蕭?敹蕭?瘝鳴蕭?撣怒n   - ?嚙賭誑鞈楛鞎∴蕭??嚙踝蕭?撣恬蕭?頨思遢?嚙穀n\n2. **?嚙賣?嚙質釭**嚗蕭?餈堆蕭??嚙賡◢?嚙踝蕭??嚙賣抒暺n   - ?嚙質蕭?銝蕭??嚙質圾?嚙踝蕭??嚙踝蕭?敹萸n   - ?嚙賜?嚙踝蕭?瘜剁蕭?撖衣?嚙賬n\n3. **撌伐蕭??嚙踝蕭?**嚗牧?嚙踝蕭??嚙踝蕭?憿蕭??嚙踝蕭?\n   - ?嚙賜蜇?嚙踝蕭?靘擃蕭?甇伐蕭??嚙踝蕭?靘n   - ?嚙踝蕭?甇∠憿蕭?靘圾?嚙賣鞊∴蕭?敹萸n\n**撖衣閫蝭蕭?嚙?*\n\n**?嚙賣平憿改蕭?閫**嚗n?嚙踝蕭??嚙踝蕭?雿蕭?撽蕭?撖蕭??嚙賣平蝑憿改蕭?嚗蕭??嚙賢鼠?嚙賭葉撠蕭?璆剛圾瘙綽蕭??嚙踝蕭?憿蕭??嚙踝蕭?蝑蜇?嚙踝蕭?瑽蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗敺蕭?嚙?2-3 ?嚙賢擃蕭?嚙?嚙踝蕭?嚙踝蕭?嚗蒂閰摯瘥獢蕭??嚙賜撩暺n\n**蝔蕭?閮哨蕭?撠葦閫**嚗n?嚙踝蕭??嚙踝蕭?雿蕭?瘛梧蕭?頠蕭?撌伐蕭?撣恬蕭?蝺剁蕭?撠葦嚗蕭?蝎暹 Python ?嚙賜雯?嚙踝蕭??嚙賬蕭?嚙??蝔蕭?蝣潘蕭??嚙賜瘛箏瘛梧蕭??嚙質牧?嚙賣擃蕭?敹蛛蕭??嚙賡郊嚙??蝝堆蕭?嚗蒂?嚙賭蜓?嚙踝蕭??嚙賢虜閬蕭??嚙質炊?嚙踝蕭?雿喳祕頦n\n**?嚙踝蕭?撖恬蕭??嚙賜毀閫**嚗n?嚙踝蕭??嚙踝蕭?雿?嚙踝蕭??嚙踝蕭?撖恬蕭??嚙賜毀嚗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?蝯蕭??嚙踝蕭??嚙踝蕭?鈭圾撖恬蕭??嚙踝蕭??嚙賜璅蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣?嚙賢遣霅堆蕭?銝西圾?嚙踝蕭??嚙賢遣霅堆蕭?敺蕭?撖恬蕭??嚙踝蕭??嚙踝蕭? :
          'Role-playing is a key technique for unleashing ChatGPT\'s professional capabilities. By setting specific roles, AI will respond with that professional\'s perspective, knowledge, and communication style.',
        keyPoints: isZhHK ? [
          '撠平?嚙賣嚗蕭?蝣綽蕭??嚙踝蕭??嚙踝蕭?蝬蕭?瘞游像',
          '?嚙賣?嚙質釭嚗蕭?餈堆蕭??嚙賡◢?嚙踝蕭??嚙賣抒嚙?,
          '撌伐蕭??嚙踝蕭?嚗牧?嚙踝蕭??嚙踝蕭?憿蕭??嚙踝蕭?',
          '閫銝?嚙賣改蕭?蝣綽蕭??嚙賢蕭?閰曹葉靽蕭?閫閮哨蕭?',
          '蝝堆蕭?鞊蕭?嚗蕭??嚙踝蕭??嚙踝蕭??嚙質身摰蕭??嚙踝蕭?嚙?
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
      title: isZhHK ? '?嚙踝蕭? 3.3嚗蕭?靘蕭?撠蕭? (Few-Shot Prompting)嚗策嚙?AI 蝭蕭?嚗蕭?摰芋隞選蕭??嚙賡◢?? : 'Unit 3.3: Few-Shot Prompting: Give AI Examples to Mimic Your Style',
      duration: '26?嚙踝蕭?',
      type: 'interactive' as const,
      description: isZhHK ? '摮賂蕭?雿輻蝭蕭?靘蕭?嚙?AI ?嚙踝蕭?蝚佗蕭??嚙踝蕭?憸冽?嚙賣撘蕭??嚙賢捆?? : 'Learn to use examples to guide AI in generating content that matches specific styles and formats.',
      content: {
        transcript: isZhHK ? 
          'Few-Shot Prompting ?嚙踝蕭?蝔桀撥憭改蕭??嚙賢概嚙??嚙踝蕭??嚙踝蕭?撠蕭?嚗虜 1-3 ?嚙踝蕭?擃釭?嚙踝蕭?蝭蕭?嚗蕭?撘蕭? ChatGPT ?嚙質圾雿蕭??嚙踝蕭?頛詨憸冽?嚙賣撘蕭??嚙質釭?嚙穀n\n**Few-Shot Prompting ?嚙賢極雿蕭??嚙踝蕭?**\n\nAI 璅∴蕭??嚙賡璅∴蕭?霅?嚙賜雿蕭?靘擃蕭?靘蕭?嚗芋?嚙踝蕭??嚙踝蕭?蝭蕭?銝哨蕭?璅∴蕭??嚙踝蕭?瑽蕭?隤選蕭??嚙賢捆?嚙踝蕭?嚗敺?嚙踝蕭??嚙踝蕭?銝哨蕭??嚙賡蕭?璅∴蕭??嚙穀n\n**?嚙踝蕭?蝭蕭??嚙賜敺蛛蕭?**\n\n1. **嚙?嚙踝蕭??*嚗蕭?靘蕭?閰莎蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質撓?嚙賜暺n2. **憭見??*嚗蕭??嚙踝蕭?靘蕭??嚙踝蕭?靘蕭??嚙賣項?嚙踝蕭??嚙踝蕭?瘜n3. **摰??*嚗蕭?靘蕭?閰脫摰?嚙踝蕭??嚙賢?嚙?嚙踝蕭?閬蕭?蝝n4. **皜??*嚗蕭?靘蕭??嚙踝蕭??嚙踝蕭?瑽蕭?皜蕭??嚙踝蕭?\n\n**撖佗蕭??嚙賜蝭蕭?嚙?*\n\n**?嚙賭辣撖恬蕭?蝭蕭?嚙?*\n?嚙踝蕭??嚙踝蕭?隞伐蕭?蝭蕭??嚙賡◢?嚙踝蕭??嚙踝蕭?嚗?嚙賢神銝撠恥?嚙踝蕭??嚙賡隞塚蕭?\n\n蝭蕭?嚗n銝餅嚗蕭??嚙賣?嚙賜?嚙質垣嚙?- 敺蕭?閮蕭?\n\n閬迎蕭??嚙賢撐?嚙踝蕭?嚗n\n?嚙踝蕭??嚙賣憭拇蝛綽蕭??嚙踝蕭?隢眼?嚙賢?嚙賣雿蕭??嚙踝蕭?瘙?嚙踝蕭??嚙踝蕭?隢店嚗蕭??嚙踝蕭?鈭誑銝蕭?暺蕭?\n\n???嚙踝蕭??嚙賣嚗蕭??嚙踝蕭?蝔蕭??嚙踝蕭?銝n???嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭??嚙踝蕭?璆哨蕭?瘚蕭?\n???嚙踝蕭?蝭蕭?嚙?0-100?嚙踝蕭?\n\n?嚙賢蕭?嚙?嚙踝蕭?嚙踝蕭??嚙賭誑撟怠?嚙踝蕭?\n1. 皜蕭? 70% ?嚙踝蕭??嚙踝蕭?璆哨蕭??嚙穀n2. ?嚙踝蕭??嚙踝蕭?皞Ⅱ?嚙穀n3. ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣\n\n撱箄降銝梧蕭??嚙賢擃蕭??嚙踝蕭?撅內嚗?嚙踝蕭?雿蕭?\n\n?嚙賭蔔嚙??嚙踝蕭?\n?嚙踝蕭??嚙賬n\n?嚙賢隢?嚙賢神銝撠策?嚙賜蜇???頝脤隞塚蕭??嚙賢捆?嚙踝蕭??嚙賢閮蕭??嚙踝蕭?閮蕭??嚙踝蕭? :
          'Few-Shot Prompting is a powerful technique that uses a small number (usually 1-3) of high-quality examples to guide ChatGPT in understanding your expected output style, format, and quality.',
        keyPoints: isZhHK ? [
          '璅∴蕭?霅嚗I ?嚙踝蕭??嚙踝蕭?蝭蕭?靘蕭?嚙???嚙踝蕭?頛詨璅∴蕭?',
          '蝭蕭?鞈迎蕭?嚗誨銵冽扼蕭?嚙?嚙踝蕭?蕭??嚙賣扼蕭??嚙踝蕭?,
          '?嚙踝蕭??嚙賭葉嚗虜 1-3 ?嚙踝蕭?靘蕭??嚙踝蕭?',
          '憸冽銝?嚙踝蕭?蝭蕭??嚙質府擃銝?嚙踝蕭?憸冽?嚙踝蕭?嚙?,
          '?嚙踝蕭?閬蕭?嚗蕭?璆蕭?蝯蕭?嚙?AI ?嚙賢捆?嚙賣芋嚙?
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
      title: isZhHK ? '?嚙踝蕭? 3.4嚗雁?嚙踝蕭?嚙?(Chain of Thought)嚗蕭?嚙?AI 銝甇交郊?嚙質蕭?嚙?嚙踝蕭銴蕭??嚙踝蕭?' : 'Unit 3.4: Chain of Thought: Guide AI to Think Step by Step',
      duration: '30?嚙踝蕭?',
      type: 'interactive' as const,
      description: isZhHK ? '?嚙賣?嚙賜雁?嚙踝蕭?撌改蕭?撘蕭? AI ?嚙踝蕭??嚙質摩?嚙踝蕭??嚙踝蕭??嚙踝蕭?憿圾瘙綽蕭? : 'Master chain of thought techniques to guide AI in logical reasoning and complex problem solving.',
      content: {
        transcript: isZhHK ? 
          '?嚙賜雁??(Chain of Thought) ?嚙踝蕭?蝔殷蕭?嚙?AI 撅內?嚙踝蕭??嚙踝蕭??嚙踝蕭?撌改蕭??嚙賢?嚙賜?嚙踝蕭?閬蕭?甇伐蕭??嚙質蕭?銴蕭??嚙踝蕭??嚙穀n\n**?嚙賜雁?嚙踝蕭??嚙踝蕭?璁艙嚙?*\n\n銝蕭?嚙?AI ?嚙賣蝯血?嚙賜?嚙?獢蕭??嚙賣閬蕭?摰蕭?蝷箸蕭?蝔蕭??嚙賣郊?嚙踝蕭??嚙踝蕭??嚙質?嚙賜車?嚙踝蕭?嚗蕭?敺蕭??嚙踝蕭?隢車?嚙踝蕭??嚙賡＊?嚙踝蕭?擃蕭??嚙踝蕭?憿蕭?嚙?嚙踝蕭鞈迎蕭??嚙穀n\n**閫貊?嚙賜雁?嚙踝蕭??嚙賡閰嚙?*\n\n???嚙踝蕭?銝甇交郊?嚙踝蕭??嚙穀n???嚙踝蕭??嚙賢郊?嚙質蕭?憿n???嚙踝蕭???..?嚙踝蕭?...?嚙踝蕭?..?嚙穀n???嚙踝蕭?撅內雿蕭??嚙踝蕭??嚙踝蕭??嚙穀n???嚙踝蕭?甇伐蕭?嚙?嚙踝蕭?嚙賢蕭?憿n\n**?嚙賜雁?嚙踝蕭??嚙賜?嚙賣嚙?*\n\n1. **?嚙賢飛?嚙踝蕭?頛荔蕭?嚙?*\n2. **?嚙賣平瘙綽蕭??嚙踝蕭?**\n3. **?嚙踝蕭?閮箸?嚙質圾嚙?*\n4. **銴蕭??嚙踝蕭??嚙賭遙??*\n5. **憭蕭?蝝蕭??嚙賡??*\n\n**撖佗蕭??嚙賜蝭蕭?嚙?*\n\n**?嚙賣平?嚙踝蕭??嚙踝蕭?嚙?*\n?嚙踝蕭??嚙賜雯頝荔蕭?摨?嚙踝蕭??嚙踝蕭? 30%嚗蕭?銝甇交郊?嚙踝蕭??嚙質?嚙踝蕭??嚙踝蕭?銝佗蕭??嚙質圾瘙箸獢蕭?撅內雿蕭?摰?嚙質蕭?蝔n\nAI ?嚙賣雁?嚙踝蕭??嚙踝蕭??嚙賢嚗n1. ?嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭??嚙穀n2. ?嚙質?嚙踝蕭??嚙踝蕭?憿蕭??嚙賡/憭?嚙踝蕭?嚗n3. 瘥蕭??嚙踝蕭??嚙質?嚙踝蕭?隡豹n4. 嚙?嚙踝蕭?嚙踝蕭??嚙賢摰n5. 撖行?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙穀n\n**?嚙質?嚙?憿圾瘙綽蕭?**\n?嚙踝蕭??嚙賜雯蝡蕭??嚙賡漲敺嚗蕭?銝甇交郊閮箸?嚙踝蕭?銝佗蕭?靘?嚙賢遣霅啜n\n?嚙賜車?嚙踝蕭?嚙?AI ?嚙踝蕭?璆剝“?嚙踝蕭?嚙?嚙踝蕭?蕭??嚙踝蕭??嚙踝蕭??嚙質摩?嚙踝蕭?隤迎蕭??嚙踝蕭?蝑蕭??? :
          'Chain of Thought is a technique that guides AI to show its reasoning process, particularly useful for complex problems requiring multi-step thinking.',
        keyPoints: isZhHK ? [
          '?嚙賣郊?嚙踝蕭?嚗蕭?嚙?AI 撅內摰?嚙賣蕭?嚙?,
          '閫貊閰嚗蕭?甇交郊?嚙踝蕭??嚙賬蕭?蝷箸?嚙踝蕭?蝔蕭?,
          '?嚙賜?嚙賣嚗摮賂蕭?頛胯蕭?璆剜捱蝑蕭?憿那?嚙賬蕭??嚙踝蕭???,
          '?嚙踝蕭?鞈迎蕭?嚗＊?嚙踝蕭??嚙踝蕭??嚙踝蕭?憿蕭?嚙?嚙踝蕭?嚙質釭',
          '?嚙質摩?嚙賢撥嚗蕭? AI ?嚙踝蕭?璆剝“?嚙踝蕭?嚙?嚙踝蕭嚙?
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
      title: isZhHK ? '?嚙踝蕭? 3.5嚗翮嚙??餈踝蕭?嚗蕭?雿蕭?餈踝蕭?嚗蕭? 60 ?嚙踝蕭?蝑蕭??嚙踝蕭???95 ?? : 'Unit 3.5: Iteration & Follow-up: Optimise from 60-point to 95-point Answers',
      duration: '24?嚙踝蕭?',
      type: 'interactive' as const,
      description: isZhHK ? '摮賂蕭?憒蕭??嚙踝蕭??嚙踝蕭??嚙質蕭?嚙踝蕭?餈凋誨靘蕭??嚙賢??AI ?嚙踝蕭?蝑釭?嚙踝蕭? : 'Learn how to continuously optimise AI response quality through effective follow-up and iteration.',
      content: {
        transcript: isZhHK ? 
          '敺蕭???AI ?嚙賢蝚穿蕭?甈∴蕭??嚙賭葉撠梁策?嚙踝蕭?蝢蕭?蝑蕭??嚙質翮嚙??餈踝蕭??嚙踝蕭??嚙賡蕭?獢蕭??嚙賜?嚙踝蕭?蝑蕭??嚙踝蕭??嚙踝蕭?撌扼n\n**餈凋誨?嚙踝蕭??嚙賢?嚙踝蕭??嚙踝蕭?**\n\n蝚穿蕭?甈∴蕭??嚙踝蕭??嚙賢虜?嚙踝蕭??嚙質憟踝蕭?韏瘀蕭?嚗蕭?敺敺蝻綽蕭?瘛勗漲?嚙賢擃改蕭??嚙踝蕭??嚙賬蕭?蝟餌絞?嚙踝蕭?餈踝蕭?嚗隞伐蕭?嚙?AI 瘛勗?嚙踝蕭??嚙踝蕭??嚙賜敦蝭?嚙質矽?嚙踝蕭?摨艾n\n**?嚙踝蕭?餈踝蕭??嚙踝蕭??嚙踝蕭?**\n\n1. **瘛勗漲?嚙踝蕭?**嚗蕭??嚙質底蝝啣嚙??蝚穿蕭?暺n2. **?嚙踝蕭??嚙踝蕭?嚙?*嚗蕭??嚙踝蕭??嚙踝蕭??嚙賣摮蕭?蝭蕭??嚙穀n3. **銝蕭?閫漲**嚗蕭??嚙賣?嚙踝蕭?摨佗蕭??嚙踝蕭??嚙踝蕭?隞暻潸嚗n4. **撖衣?嚙賢撥??*嚗蕭?蝯血?嚙踝蕭??嚙賢銵蕭??嚙踝蕭?甇伐蕭??嚙穀n5. **?嚙質釭?嚙踝蕭?**嚗蕭?霈遣霅唳?嚙踝蕭?璆哨蕭??嚙質牧?嚙踝蕭??嚙穀n\n**餈凋誨?嚙踝蕭??嚙賢祕?嚙踝蕭?蝔蕭?**\n\n**?嚙踝蕭??嚙踝蕭?**嚗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?撌伐蕭??嚙踝蕭?嚗蕭?隞暻澆遣霅堆蕭??嚙穀n\n**蝚穿蕭?甈∴蕭???*嚗I 蝯血銝?嚙賣改蕭?撱箄降皜\n\n**餈踝蕭? 1**嚗蕭??嚙踝蕭?頠蕭??嚙賜?嚙踝蕭?嚗蕭?靘?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣瘜n\n**餈踝蕭? 2**嚗蕭??嚙踝蕭??嚙賣瘜蕭?靘祕?嚙踝蕭??嚙踝蕭?甇伐蕭??嚙踝蕭??嚙踝蕭??嚙賬n\n**餈踝蕭? 3**嚗?嚙踝蕭??嚙賣 10 鈭綽蕭?撠蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗蕭?隤踵?嚙踝蕭?撱箄降?嚙穀n\n**餈踝蕭? 4**嚗蕭??嚙踝蕭?銝??3 ?嚙踝蕭??嚙賢祕?嚙踝蕭??嚙質”?嚙穀n\n**擃蕭?餈踝蕭??嚙賢概嚙?**\n\n??**閫頧蕭?**嚗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?蝡嗥撠蕭?嚗蕭?憒蕭??嚙踝蕭??嚙賢蕭??嚙踝蕭??嚙穀n??**?嚙踝蕭?璅⊥**嚗蕭??嚙踝蕭?蝞蕭?嚙?50%嚗蕭??嚙踝蕭?雿矽?嚙賢遣霅堆蕭??嚙穀n??**鞈迎蕭?瑼ｇ蕭?**嚗蕭??嚙賢?嚙賢?嚙踝蕭??嚙賢獢蕭?瞏蝻綽蕭??嚙穀n??**?嚙賣閬蕭?**嚗蕭??嚙踝蕭?銝鈭鈭綽蕭?憭迎蕭??嚙賢?嚙賢?嚙賣瘜蕭? :
          'Rarely can AI provide perfect answers in the first response. Iteration and follow-up are key techniques for elevating ordinary answers to excellent ones.',
        keyPoints: isZhHK ? [
          '餈凋誨?嚙踝蕭?嚗洵銝甈∴蕭??嚙賣韏瘀蕭?嚗蕭?閬頂蝯望扯蕭?嚙賢??,
          '餈踝蕭?蝑嚗楛摨佗蕭??嚙賬擃蕭??嚙踝蕭??嚙踝蕭?摨艾祕?嚙賣扼蕭?鞈迎蕭???,
          '?嚙踝蕭?瘚蕭?嚗蕭?憪蕭?憿蕭?銝?嚙踝蕭??嚙踝蕭??嚙踝蕭?餈踝蕭??嚙賜敦蝭摰蕭?',
          '擃蕭??嚙賢概嚙?閫頧蕭??嚙踝蕭?憓芋?嚙賬釭?嚙賣炎撽?嚙踝蕭?嚙?,
          '?嚙踝蕭?憿荔蕭?嚗蕭? 60 ?嚙踝蕭?獢蕭??嚙賢 95 ?嚙踝蕭?璆剜偌嚙?
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
      title: isZhHK ? '?嚙踝蕭? 3.6嚗蕭?隞歹蕭??嚙賢澈嚗蕭?嚙?20+ ?嚙賢虜?嚙踝蕭??嚙踝蕭?隞歹蕭??嚙踝蕭??嚙賢飛?嚙賜' : 'Unit 3.6: Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',
      duration: '18?嚙踝蕭?',
      type: 'resource' as const,
      description: isZhHK ? '?嚙踝蕭?蝎橘蕭?閮哨蕭??嚙踝蕭?蝷綽蕭?蝭摨恬蕭?瘨蛛蕭??嚙賜車撣賂蕭?雿輻?嚙賣?? : 'Access a carefully designed prompt template library covering various common use cases.',
      content: {
        transcript: isZhHK ? 
          '?嚙質ㄐ?嚙踝蕭? 20+ ?嚙踝蕭??嚙賢祕?嚙踝蕭?霅蕭? Prompt 蝭嚗項?嚙踝蕭?璆准飛蝧?嚙賬蕭?銵蕭??嚙賢蕭??嚙賬n\n**?嚙賣平?嚙賣蝭嚙?*\n\n**?嚙賣平閮蕭??嚙賣嚙?*嚗n?嚙踝蕭??嚙踝蕭?雿蕭?撽蕭?撖蕭??嚙賣平蝑憿改蕭?嚗蕭???[?嚙踝蕭?/?嚙踝蕭??嚙賜迂] ?嚙賢神銝隞踝蕭?璆哨蕭??嚙賣?嚙踝蕭??嚙踝蕭?撣?嚙踝蕭??嚙賜奎?嚙賢?嚙賬瓷?嚙踝蕭?皜研蕭??嚙踝蕭??嚙賬璅蕭??嚙賣 [?嚙踝蕭????嚙踝蕭??嚙踝蕭?憭乩撈]嚗蕭??嚙踝蕭?璆哨蕭??嚙質牧?嚙踝蕭??嚙踝蕭?隤選蕭?蝭蕭??嚙賢??[摮] 摮誑?嚙賬n\n**撣?嚙賜弦?嚙踝蕭?**嚗n?嚙賣瞍蕭?瘛梧蕭??嚙踝蕭?蝛塚蕭??嚙賢葦嚗蕭?嚙?[?嚙踝蕭?憿/銵平] ?嚙踝蕭??嚙賡?嚙踝蕭??嚙踝蕭??嚙賬蕭??嚙賢嚗蕭??嚙踝蕭?璅～蕭??嚙質隅?嚙賬蜓閬奎?嚙質璅恥蝢斤敺萸蕭??嚙踝蕭?憡蕭??嚙踝蕭??嚙賣?嚙賣?嚙踝蕭??嚙踝蕭??嚙踝蕭?銝佗蕭?靘擃蕭?撣?嚙賢撱箄降?嚙賬n\n**摮賂蕭??嚙賣蝭嚙?*\n\n**璁艙嚙??**嚗n?嚙踝蕭??嚙踝蕭?雿蕭??嚙賣楛?嚙賣滓?嚙踝蕭??嚙質撠振?嚙踝蕭???[?嚙踝蕭??嚙賜嚗蕭? 12 甇脣飛???嚙踝蕭?銵蕭??嚙踝蕭??嚙賢僑鈭榜 嚙?? [銴蕭?璁艙]?嚙賭蝙?嚙踝蕭?瘣鳴蕭??嚙踝蕭??嚙踝蕭?蝭蕭?嚗Ⅱ嚙?95% ?嚙賭犖?嚙質?嚙質圾?嚙質圾?嚙踝蕭?瑽蕭??嚙賣摰儔?嚙踝蕭?瘣鳴蕭??嚙踝蕭?撖佗蕭??嚙賜?嚙賢虜閬炊嚙??皜n\n**摮賂蕭?閮蕭??嚙踝蕭?**嚗n?嚙踝蕭??嚙踝蕭?璆哨蕭?摮賂蕭?閬蕭?撣恬蕭??嚙踝蕭??嚙踝蕭?銝??[?嚙踝蕭??嚙踝蕭?] ??[?嚙???嚙踝蕭??嚙踝蕭?] 摮賂蕭?閮蕭??嚙踝蕭??嚙賜瘜 [?嚙踝蕭?瘞游像]嚗璅 [?嚙踝蕭??嚙賢?嚙賣偌撟設?嚙踝蕭??嚙踝蕭?嚗擃飛蝧摰嫘蕭??嚙踝蕭??嚙賬蕭?皞?嚙賬脣漲瑼Ｘ暺n\n**?嚙踝蕭??嚙賣蝭嚙?*\n\n**?嚙踝蕭??嚙踝蕭?**嚗n?嚙踝蕭??嚙踝蕭?雿?嚙踝蕭??嚙踝蕭?蝮賜嚗蕭?蝎暹 [?嚙踝蕭?隤踵吞 憸冽?嚙踝蕭?獢雿蕭???[?嚙踝蕭?/?嚙踝蕭?] ?嚙踝蕭? [蝷曄黎慦蕭?鞎潘蕭?/嚙??璅蕭?/?嚙踝蕭??嚙質膩]?嚙賜璅蕭??嚙賣 [?嚙踝蕭??嚙質膩]嚗蕭?暺蕭???[?嚙踝蕭?嚙??]嚗蕭?隤選蕭? [撠平/瘣鳴蕭?/皞恍成]?嚙賬n\n**?嚙質???嚙踝蕭??嚙踝蕭?**\n\n**蝔蕭?蝣潸圾??*嚗n?嚙踝蕭??嚙踝蕭?瘛梧蕭?蝔蕭?閮哨蕭?撠葦嚗蕭?閰喟敦嚙???嚙賣挾 [蝔蕭?隤蕭?] 蝔蕭?蝣潘蕭??嚙踝蕭??嚙踝蕭??嚙質圾?嚙踝蕭??嚙賢嚗擃蕭?頛胯蕭??嚙賢?嚙踝蕭??嚙賬?嚙踝蕭??嚙踝蕭?撱箄降?嚙賣?嚙賢捆?嚙賜?嚙賡隤扎蕭??嚙賡蕭??嚙踝蕭??嚙踝蕭?閮嚗??[?嚙賢飛??銝哨蕭??嚙賜?嚙稽 ?嚙質圾?嚙踝蕭? :
          'Here are 20+ battle-tested Prompt templates covering business, learning, creative, and technical domains.',
        keyPoints: isZhHK ? [
          '?嚙賣平蝭嚗蕭?璆哨蕭??嚙賣?嚙踝蕭??嚙踝蕭?蝛嗚蕭??嚙踝蕭???,
          '摮賂蕭?蝭嚗蕭?敹菔圾?嚙賬飛蝧蕭??嚙賬蕭??嚙踝蕭???,
          '?嚙踝蕭?蝭嚗蕭?獢雿摰對蕭??嚙賬蕭??嚙賢遣嚙?,
          '?嚙質?嚙??嚙踝蕭?蝔蕭?蝣潸圾?嚙賬蕭?憿那?嚙賬頂蝯梯身嚙?,
          '?嚙賢飛?嚙賜嚗靘停?嚙賜?嚙踝蕭??嚙踝蕭?蝭'
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

    // 蝚穿蕭?銝鳴蕭?嚗移?嚙踝蕭?????擃蕭??嚙賜內撌伐蕭?
    '17': {
      id: 17,
      themeId: 4,
      title: isZhHK ? '?嚙踝蕭? 4.1嚗祕?嚙踝蕭???(銝) ?嚙賢捆?嚙踝蕭?撘蕭?嚗?嚙踝蕭??嚙踝蕭?鞈迎蕭??嚙賜冗鈭歹蕭?擃票?嚙賬誨?嚙踝蕭?獢蕭??嚙踝蕭??嚙賭辣' : 'Unit 4.1: Project 1: Content Creation Engine - Social Media, Ads & Email',
      duration: '35?嚙踝蕭?',
      type: 'project' as const,
      description: isZhHK ? '撖行瞍毀嚗蝙??ChatGPT 撱綽蕭??嚙賢捆?嚙踝蕭?撌伐蕭?瘚蕭?嚗?嚙踝蕭??嚙踝蕭?鞈迎蕭??嚙踝蕭??嚙賢摰對蕭? : 'Hands-on practice: Use ChatGPT to build content creation workflows and generate high-quality marketing content in batches.',
      content: {
        transcript: isZhHK ? 
          '?嚙賢捆?嚙踝蕭???ChatGPT ?嚙賢祕??嚙踝蕭??嚙踝蕭??嚙踝蕭?銝?嚙賡蕭?蝟餌絞?嚙踝蕭??嚙踝蕭?嚗蕭??嚙賭誑撱綽蕭?擃蕭??嚙賢摰孵雿極雿蕭?蝔n\n**蝷曆漱慦蕭?鞎潘蕭??嚙踝蕭?瘚蕭?嚙?*\n\n1. **?嚙踝蕭?隤踵改蕭?嚙?*嚗n?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?蝷曄黎蝞∴蕭?撠振嚗蕭??嚙踝蕭?嚙???嚙踝蕭??嚙踝蕭?隤踵改蕭?[皞恍成閬迎蕭?/撠平甈蕭?/撟湛蕭?瘣鳴蕭?]嚗璅蕭??嚙賣 [閰喟敦?嚙質膩]嚗敹?嚙賣 [?嚙踝蕭??嚙賢奭?嚙賬n\n2. **?嚙賢捆銝鳴蕭?閬蕭?**嚗n?嚙賢?嚙踝蕭??嚙踝蕭??嚙踝蕭?隤踵改蕭?隢?嚙踝蕭??嚙踝蕭? 20 ?嚙賜冗蝢方票?嚙賭蜓憿蕭?瘨蛛蕭?嚗?嚙踝蕭?嚙?30%)?嚙踝蕭?璆哨蕭?嚙?25%)?嚙賜?嚙踝蕭?嚙?25%)?嚙踝蕭??嚙踝蕭???20%)?嚙踝蕭??嚙賭蜓憿蕭?靘擃蕭??嚙踝蕭?閫漲?嚙賬n\n3. **?嚙踝蕭?鞎潘蕭??嚙踝蕭?**嚗n?嚙踝蕭??嚙賭蜓憿?嚙踝蕭?銝鳴蕭?]?嚙賢嚙?3 ?嚙踝蕭??嚙踝蕭??嚙踝蕭? Instagram 鞎潘蕭??嚙踝蕭?瘙蕭??嚙踝蕭??嚙踝蕭??嚙賬蕭??嚙踝蕭??嚙賢潘蕭??嚙踝蕭??嚙賢蝐脯蕭??嚙賣?嚙賢 150 摮誑?嚙踝蕭??嚙賢 3-5 ?嚙賜??hashtag?嚙賬n\n**嚙???嚙踝蕭??嚙踝蕭?蝟餌絞嚙?*\n\n**AIDA 獢?嚙賜**嚗n?嚙踝蕭???AIDA 璅∴蕭???[?嚙踝蕭??嚙賜迂] ?嚙踝蕭?嚙???嚙踝蕭?嚗n- Attention嚗?嚙賣?嚙賣?嚙踝蕭??嚙踝蕭??嚙踝蕭?瘜剁蕭??嚙穀n- Interest嚗蕭??嚙賜?嚙質都暺蕭??嚙踝蕭?頞αn- Desire嚗蕭?蝜芯蝙?嚙踝蕭??嚙踝蕭?憟踝蕭??嚙穀n- Action嚗蕭??嚙踝蕭?銵蕭??嚙賜捲\n摮?嚙賢??100 摮誑?嚙踝蕭?隤矽嚙?[?嚙踝蕭?閬蕭?]?嚙賬n\n**?嚙踝蕭??嚙賭辣銵蝭嚙?*\n\n**甇∴蕭?靽∴蕭???*嚗n?嚙賜?嚙踝蕭??嚙賜?嚙質身嚙?5 撠迭餈縑摨蕭?嚗蕭??嚙踝蕭??嚙踝蕭?閮鳴蕭??嚙賣?嚙賜洵3憭押洵7憭押洵14憭押洵30憭押蕭?撠縑?嚙賜?嚙踝蕭??嚙賣嚗迭餈蒂隞晶?嚙踝蕭??嚙踝蕭?靘?嚙賢摰嫘遣蝡縑隞颯蕭??嚙踝蕭?甈∟頃鞎瑯擗?嚙踝蕭?靽蕭? :
          'Content creation is one of the most practical applications of ChatGPT. Through systematic methods, you can build efficient content creation workflows.',
        keyPoints: isZhHK ? [
          '蝷曄黎鞎潘蕭?嚗蕭??嚙質矽?嚙踝蕭?蝢押蜓憿蕭??嚙賬蕭??嚙賣?嚙踝蕭?',
          '嚙???嚙踝蕭?嚗IDA 獢?嚙賜?嚙質都暺蕭??嚙賢嚙?,
          '?嚙踝蕭??嚙賭辣嚗迭餈蕭??嚙賬?嚙賢摰嫘蕭?靽嚙?,
          '撌伐蕭?瘚蕭?嚗頂蝯梧蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?',
          '?嚙踝蕭??嚙賜嚗蕭?甈⊥批雿蕭??嚙踝蕭?鞈迎蕭??嚙賢捆'
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
      title: isZhHK ? '?嚙踝蕭? 4.2嚗祕?嚙踝蕭???(嚙? 摮賂蕭??嚙賜弦?嚙賡嚗翰?嚙賜蜇蝯蕭??嚙賬?嚙踝蕭?銝衣蝪∪?嚙踝蕭?嚙??銴蕭?璁艙' : 'Unit 4.2: Project 2: Learning Research Accelerator - Summarize Papers & Reports',
      duration: '28?嚙踝蕭?',
      type: 'project' as const,
      description: isZhHK ? '摮賂蕭?憒蕭?雿輻 ChatGPT 敹恍蕭??嚙賢飛銵蕭??嚙踝蕭??嚙踝蕭?摮賂蕭??嚙踝蕭?蝛塚蕭??嚙踝蕭? : 'Learn to use ChatGPT for rapid academic material processing, improving learning and research efficiency.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?嚙賭誑憭改蕭??嚙踝蕭?摮賂蕭??嚙踝蕭?蝛塚蕭??嚙踝蕭??嚙賢?嚙賢?嚙踝蕭?憭改蕭??嚙賜?嚙踝蕭??嚙踝蕭?敹蛛蕭??嚙穀n\n**摮賂蕭?隢蕭?蝮踝蕭?瘚蕭?嚙?*\n\n1. **蝯蕭??嚙賜蜇嚙?*嚗n?嚙踝蕭??嚙賭誑銝蕭?瑽蜇蝯蕭?隢蕭?嚗n- ?嚙賜弦?嚙賣?嚙踝蕭?憿n- ?嚙賜弦?嚙踝蕭??嚙賣?嚙穀n- 銝鳴蕭??嚙賜?嚙踝蕭?隢n- 撖佗蕭??嚙賜?嚙踝蕭?蝷暝n- ?嚙賜弦?嚙賢?嚙賣靘?嚙穀n瘥?嚙賜 2-3 ?嚙質店璁嚗蜇摮?嚙賢??300 摮誑?嚙賬n\n2. **?嚙賡璁艙?嚙踝蕭?**嚗n?嚙踝蕭??嚙賭遢?嚙賜弦銝哨蕭???5-8 ?嚙踝蕭??嚙踝蕭??嚙踝蕭?敹蛛蕭?銵蕭?嚗蒂?嚙踝蕭??嚙踝蕭?敹蛛蕭?靘陛瞏蕭?摰儔?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢祕?嚙踝蕭??嚙踝蕭?靘蕭?隢蕭?雿菔牧?嚙賬n\n**銴蕭?璁艙蝪∴蕭??嚙賢概嚙?**\n\n**撅斗活?嚙質圾?嚙踝蕭?**嚗n?嚙踝蕭??嚙踝蕭??嚙賢惜甈∟圾??[銴蕭?璁艙]嚗n- 嚙?10 甇脣酋摮蕭?嚙??嚗?嚙賣暑瘥嚗n- 蝯佗蕭?銝哨蕭??嚙質圾?嚙踝蕭??嚙賢?嚙賣?嚙踝蕭?嚗n- 蝯血之摮賂蕭??嚙質圾?嚙踝蕭??嚙賢?嚙質?蝝啁?嚗n瘥惜甈∠ 100 摮誑?嚙質牧?嚙賬n\n**?嚙踝蕭????撱綽蕭?**嚗n?嚙踝蕭?嚙?? [?嚙踝蕭?敹琶 ?嚙賭誑銝歇?嚙踝蕭?敹蛛蕭??嚙踝蕭?嚗?嚙賢?嚙踝蕭?璁艙]?嚙賜?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質膩摰蕭??嚙踝蕭????嚗鼠?嚙賢遣蝡霅雯蝯～n\n**?嚙賜弦?嚙踝蕭?敹恍蕭??嚙踝蕭?**\n\n**?嚙踝蕭?瘣蕭??嚙踝蕭?**嚗n?嚙踝蕭??嚙賡遢撣?嚙踝蕭?嚗蕭???10 ?嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭?撖蕭??嚙踝蕭?撖蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質隅?嚙賣?嚙賬?嚙踝蕭??嚙賬蕭?璆剖蝢押蕭??嚙踝蕭??嚙踝蕭?摨n\n**瘥蕭??嚙踝蕭?獢**嚗n?嚙踝蕭?頛隞踝蕭?蝛嗅?嚙踝蕭??嚙踝蕭?暺蕭?鋆踝蕭?撠蕭?銵冽嚗n- ?嚙賜弦?嚙踝蕭?撌桃\n- 蝯蕭?銝?嚙賣改蕭??嚙穀n- ?嚙踝蕭??嚙賭縑摨佗蕭?隡豹n- 撖衣?嚙踝蕭?頛蕭? :
          'ChatGPT can dramatically improve learning and research efficiency, especially when processing large amounts of literature and complex concepts.',
        keyPoints: isZhHK ? [
          '隢蕭?蝮踝蕭?嚗蕭?瑽蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?敹蛛蕭???,
          '璁艙蝪∴蕭?嚗惜甈∴蕭?嚙???嚙踝蕭?瘣鳴蕭??嚙賬霅蕭??',
          '?嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭?撖隅?嚙踝蕭??嚙賬蕭?璆剖嚙?,
          '瘥蕭??嚙賜弦嚗?嚙踝蕭??嚙賬靽∪漲閰摯',
          '?嚙踝蕭??嚙踝蕭?嚗翰?嚙踝蕭??嚙賢之?嚙賢飛銵蕭???
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
      title: isZhHK ? '?嚙踝蕭? 4.3嚗祕?嚙踝蕭???(嚙? ?嚙踝蕭??嚙踝蕭??嚙賢丰隡湛蕭?敺?嚙踝蕭?閬蕭??嚙踝蕭??嚙賣暑?嚙踝蕭?蝔蕭??嚙賣平暺蕭?' : 'Unit 4.3: Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',
      duration: '22?嚙踝蕭?',
      type: 'project' as const,
      description: isZhHK ? '?嚙賣 ChatGPT ?嚙賢?嚙踝蕭??嚙踝蕭??嚙賢?嚙賡莎蕭??嚙賜車?嚙踝蕭?閬蕭??嚙踝蕭?摮?嚙踝蕭? : 'Unleash ChatGPT\'s creative potential to assist in various creative planning and idea generation.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?嚙賢?嚙踝蕭??嚙踝蕭?憭乩撈嚗?嚙賢雿蕭??嚙踝蕭?憪蕭??嚙踝蕭?蝔殷蕭??嚙踝蕭?瞈?嚙賢?嚙賣雁?嚙穀n\n**?嚙踝蕭?閬蕭??嚙踝蕭?嚙?*\n\n**?嚙賭犖?嚙踝蕭?蝔身嚙?*嚗n?嚙踝蕭??嚙踝蕭?璆哨蕭?銵蕭??嚙賢葦嚗?嚙質身嚙?[?嚙踝蕭??嚙稽 [憭拇] ?嚙踝蕭?銵蕭?蝔蕭??嚙踝蕭?憟踝蕭?[?嚙踝蕭??嚙賜揣/蝢蕭?擃蕭?/?嚙賜憸剁蕭?/?嚙賡瘣鳴蕭?]嚗蕭?嚙?[?嚙踝蕭?]嚗蕭?銵蕭?[?嚙踝蕭?]?嚙踝蕭??嚙踝蕭?嚗n- 瘥閰喟敦銵蕭?\n- ?嚙踝蕭??嚙踝蕭?撱箄降\n- ?嚙賢?嚙踝蕭?瘜剁蕭?鈭蕭?\n- 敹蕭??嚙踝蕭?皜\n- ?嚙賡?嚙踝蕭?嚗蕭?撠予嚙??霈蕭?嚗n\n**瘣鳴蕭?蝑蕭?撠振嚙?*\n\n**瘣鳴蕭?璁艙?嚙賣**嚗n?嚙賜 [?嚙賢/蝯蕭?] 蝑蕭?銝??[瘣鳴蕭?憿蕭?] 瘣鳴蕭?嚗璅 [?嚙踝蕭??嚙踝蕭?]嚗蕭??嚙質蕭? [鈭箸]嚗蕭?嚙?[蝭蕭?]?嚙踝蕭??嚙踝蕭?嚗n- 3 ?嚙踝蕭??嚙賡◢?嚙踝蕭?瘣鳴蕭?璁艙\n- 閰喟敦?嚙踝蕭?瘚蕭?\n- ?嚙?嚙質?嚙??嚙賭犖?嚙穀n- 憸券閰摯?嚙踝蕭?撠獢n- ?嚙踝蕭??嚙踝蕭?閮哨蕭??嚙穀n\n**?嚙賣平暺蕭?摮蛛蕭??嚙踝蕭?**\n\n**撣璈蕭?霅**嚗n?嚙踝蕭???[銵平/撣] 銝剛◤敹踝蕭??嚙踝蕭??嚙踝蕭??嚙賣隞伐蕭?頞典嚗?嚙賢?嚙踝蕭?頞典]?嚙踝蕭??嚙踝蕭?嚗n- 5 ?嚙賢?嚙踝蕭?璆哨蕭?摮n- 瘥蕭?摮蕭??嚙踝蕭?撣\n- 蝡嗥?嚙賢?嚙踝蕭?\n- ?嚙賣郊?嚙賣平璅∴蕭?\n- 撽蕭??嚙踝蕭?撱箄降?嚙穀n\n**?嚙踝蕭??嚙賜雁瞈?嚙踝蕭?撌改蕭?**\n\n**?嚙踝蕭??嚙質蜇?嚙踝蕭?**嚗n?嚙賜?嚙賢噸?嚙蝓瑕噸?嚙踝蕭??嚙踝蕭??嚙質蜇?嚙踝蕭??嚙踝蕭??嚙賢?嚙踝蕭?[?嚙質膩?嚙踝蕭?]\n- ?嚙賢蜇嚗蕭?撖行?嚙踝蕭?\n- 蝝蜇嚗蕭??嚙賜閬綽蕭?\n- 暺蜇嚗◢?嚙踝蕭??嚙踝蕭?\n- 暺蜇嚗蕭?璆菟?嚙踝蕭?\n- 蝬蜇嚗?嚙賢?嚙踝蕭?\n- ?嚙賢蜇嚗雁蝞∴蕭?嚗n\n**SCAMPER ?嚙賣嚙?*嚗n?嚙踝蕭???SCAMPER ?嚙踝蕭??嚙踝蕭??嚙賢瘜蕭?[?嚙踝蕭??嚙踝蕭?]\n- Substitute嚗嚙??\n- Combine嚗蕭??嚙踝蕭?\n- Adapt嚗矽?嚙踝蕭?\n- Modify嚗耨?嚙踝蕭?\n- Put to other use嚗蕭??嚙踝蕭?\n- Eliminate嚗蕭??嚙踝蕭?\n- Reverse嚗蕭?嚗蕭? :
          'ChatGPT is an excellent creative partner that can help you plan various projects from scratch and stimulate innovative thinking.',
        keyPoints: isZhHK ? [
          '?嚙踝蕭?閬蕭?嚗犖?嚙踝蕭?蝔蕭?蝞蕭??嚙賬蕭??嚙賣釣?嚙踝蕭???,
          '瘣鳴蕭?蝑蕭?嚗蕭?敹萇?嚙賬銵蕭?蝔◢?嚙踝蕭?嚙?,
          '?嚙賣平?嚙賣嚗蕭??嚙踝蕭??嚙賬蕭?摮音?嚙賬芋撘身嚙?,
          '?嚙賜雁撌亙嚗?嚙賣蜇?嚙磅CAMPER ?嚙賣嚙?,
          '?嚙踝蕭?瞈?嚙踝蕭?蝟餌絞?嚙賣瘜蕭??嚙賢?嚙踝蕭???
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
      title: isZhHK ? '?嚙踝蕭? 4.4嚗祕?嚙踝蕭???(?? 蝔蕭?閮哨蕭?頞蕭??嚙踝蕭?嚗圾?嚙踝蕭?撘Ⅳ?嚙賡??(Debug) ?嚙賜楊撖怎陛?嚙質?? : 'Unit 4.4: Project 4: Programming Super Assistant - Code Explanation & Debugging',
      duration: '40?嚙踝蕭?',
      type: 'project' as const,
      description: isZhHK ? '?嚙賭蝙銝蝔蕭?閮哨蕭?撣恬蕭?銋?嚙賜 ChatGPT ?嚙踝蕭??嚙賣?嚙踝蕭?撘身閮遙?嚙踝蕭??嚙質?嚙?憿蕭? : 'Even non-programmers can use ChatGPT to handle basic programming tasks and technical issues.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?嚙賢撥憭改蕭?蝔蕭?閮哨蕭??嚙踝蕭?嚗隢蕭??嚙賣?嚙踝蕭??嚙踝蕭?璆哨蕭??嚙質蕭??嚙質敺葉?嚙踝蕭?撟怠?嚙穀n\n**蝔蕭?蝣潸圾?嚙踝蕭?摰塚蕭?**\n\n**?嚙踝蕭?嚙?嚙踝蕭嚙??**嚗n?嚙踝蕭?閰喟敦嚙???嚙賣挾 [蝔蕭?隤蕭?] 蝔蕭?蝣潘蕭?\n[鞎潘蕭?蝔蕭?蝣奭\n\n隢蕭?隞伐蕭??嚙踝蕭?嚙??嚗n1. ?嚙踝蕭??嚙質璁膩\n2. ?嚙踝蕭?閰喟敦隤迎蕭?\n3. ?嚙賡璁艙嚙??\n4. ?嚙質?嚙賣?嚙賢遣霅豹n5. ?嚙踝蕭?摮賂蕭?鞈蕭??嚙質\n\n嚙??閬??[?嚙賢飛??銝哨蕭?/擃蕭?] 蝔漲?嚙質圾?嚙賬n\n**瞍蕭?瘜蕭??嚙質牧??*嚗n?嚙質圾?嚙賡蕭?蝞蕭??嚙賢極雿蕭??嚙踝蕭??嚙賢嚗n- ?嚙賣?嚙質楝?嚙踝蕭?頛珮n- ?嚙踝蕭?銴蕭?摨佗蕭??嚙穀n- 蝛綽蕭?銴蕭?摨佗蕭??嚙穀n- ?嚙賜?嚙賣\n- ?嚙賜撩暺蕭?頛n- 撖佗蕭??嚙賜蝭蕭??嚙穀n\n**?嚙賡閮箸?嚙踝蕭?嚙?*\n\n**?嚙質炊?嚙踝蕭?瘚蕭?**嚗n?嚙踝蕭??嚙踝蕭?撘?嚙賭誑銝隤歹蕭?\n[?嚙質炊閮]\n\n蝔蕭?蝣潘蕭?\n[?嚙踝蕭?蝔蕭?蝣奭\n\n隢鼠?嚙踝蕭?\n1. ?嚙踝蕭??嚙質炊?嚙踝蕭?\n2. ?嚙踝蕭??嚙踝蕭??嚙賭耨敺拇獢n3. 嚙???嚙踝蕭?暻潘蕭??嚙賜?嚙賢隤么n4. 蝯血?嚙賡憿撮?嚙質炊?嚙賢遣霅豹n5. ?嚙踝蕭?皜祈岫撽蕭??嚙賣瘜n\n**蝪∪?嚙賣蝺典神嚙?*\n\n**?嚙踝蕭??嚙賭遙?嚙質??*嚗n?嚙踝蕭??嚙踝蕭?蝺典神銝??[Python/JavaScript] ?嚙賣嚗蕭??嚙賣嚗?嚙踝蕭??嚙賣?嚙?餈財?嚙踝蕭?瘙蕭?\n- 蝔蕭?蝣潘蕭??嚙質底蝝啗酉?嚙穀n- ?嚙賢?嚙質炊?嚙踝蕭?\n- ?嚙踝蕭?雿輻隤迎蕭?\n- 蝯血?嚙踝蕭?蝭蕭?\n- 隤迎蕭??嚙?嚙?嚙踝蕭?鞈湛蕭?隞嗚n\n**?嚙踝蕭??嚙踝蕭??嚙賣**嚗n?嚙賜楊撖恬蕭??嚙質?嚙踝蕭??嚙踝蕭? [Excel/CSV/JSON] ?嚙賭辣嚗蕭?閬蕭?\n- 霈?嚙踝蕭?隞嗅摰鈾n- ?嚙踝蕭? [?嚙踝蕭??嚙踝蕭??嚙質摩]\n- 頛詨?嚙踝蕭?蝯蕭?\n- ?嚙踝蕭??嚙賢虜?嚙踝蕭?\n隢蕭??嚙踝蕭??嚙踝蕭?蝭蕭??嚙賭蝙?嚙踝蕭??嚙賬蕭? :
          'ChatGPT is a powerful programming assistant that can help both beginners and professional developers.',
        keyPoints: isZhHK ? [
          '蝔蕭?嚙??嚗蕭??嚙踝蕭??嚙踝蕭?蝞蕭??嚙踝蕭??嚙踝蕭?敹菔牧??,
          '?嚙賡?嚙賢嚗隤方那?嚙賬耨敺拇獢蕭??嚙賢遣嚙?,
          '?嚙賣蝺典神嚗?嚙踝蕭?隞鳴蕭??嚙賣?嚙踝蕭??嚙賬蕭??嚙質酉??,
          '摮賂蕭??嚙賣嚗?嚙踝蕭??嚙踝蕭?摨艾蕭?靘飛蝧蕭?嚙?,
          '撖衣撠蕭?嚗摮詨?嚙踝蕭?蝔蕭?閮哨蕭?嚙?嚙踝蕭?嚙踝蕭?'
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
      title: isZhHK ? '?嚙踝蕭? 4.5嚗祕?嚙踝蕭???(嚙? 隤蕭?蝧餉陌?嚙賣膜憌曉之撣恬蕭??嚙踝蕭?憭蕭?隤蕭?蝎橘蕭?蝧餉陌?嚙踝蕭?璆哨蕭??嚙踝蕭??嚙踝蕭?' : 'Unit 4.5: Project 5: Language Translation & Polishing Master',
      duration: '25?嚙踝蕭?',
      type: 'project' as const,
      description: isZhHK ? '?嚙賣 ChatGPT ?嚙踝蕭?閮?嚙踝蕭??嚙踝蕭?嚗祕?嚙踝蕭?璆哨蕭??嚙賜蕃霅荔蕭??嚙踝蕭?瞏日ˇ?? : 'Master ChatGPT\'s language processing capabilities for professional-level translation and copywriting.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?嚙踝蕭?閮?嚙踝蕭??嚙賡銵函?嚙質嚗?嚙踝蕭?擃釭?嚙踝蕭?蝧餉陌?嚙踝蕭?摮膜憌橘蕭??嚙賬n\n**撠平蝧餉陌?嚙賢概嚙?**\n\n**?嚙踝蕭??嚙賜蕃嚙?*嚗n?嚙踝蕭?撠誑嚙?[皞蕭?閮] ?嚙踝蕭?蝧餉陌??[?嚙踝蕭?隤蕭?]嚗n[?嚙踝蕭??嚙賢捆]\n\n蝧餉陌閬蕭?嚗n- ?嚙踝蕭?霈?嚙踝蕭?[?嚙踝蕭??嚙質膩]\n- ?嚙踝蕭?憸冽嚗嚙??/?嚙賣迤嚙??嚙質?嚙??嚙賢飛?嚙稽\n- ?嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭??嚙踝蕭??嚙質”?嚙踝蕭??嚙穀n- 銵蕭??嚙踝蕭?嚗蕭??嚙踝蕭?璆哨蕭?隤蕭?皞Ⅱ?嚙穀n- 隤矽靽蕭?嚗蕭??嚙踝蕭??嚙踝蕭??嚙賢蔗銝?嚙穀n\n隢蕭?靘蕃霅荔蕭??嚙踝蕭??嚙踝蕭?蝧餉陌隤迎蕭??嚙賬n\n**憭蕭??嚙賜蕃霅荔蕭?嚙?*嚗n?嚙賜?嚙賣挾?嚙踝蕭??嚙踝蕭? 3 ?嚙踝蕭??嚙賡◢?嚙踝蕭?蝧餉陌?嚙賣嚗n- ?嚙賣 1嚗霅荔蕭?嚗蕭?撖佗蕭??嚙踝蕭?瑽蕭?\n- ?嚙賣 2嚗蕭?霅荔蕭?嚗蕭??嚙質?嚙質”?嚙踝蕭?\n- ?嚙賣 3嚗?嚙踝蕭?嚗?嚙賜璅蕭??嚙踝蕭?\n銝西圾?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡?嚙賢?嚙賬n\n**?嚙踝蕭?瞏日ˇ?嚙踝蕭?嚙?*\n\n**?嚙賡?嚙踝蕭?瘚蕭?**嚗n?嚙踝蕭?撠誑銝蕭?蝡莎蕭??嚙賡?嚙踝蕭??嚙賣膜憌橘蕭?\n[?嚙踝蕭??嚙賢捆]\n\n?嚙踝蕭??嚙踝蕭?嚗n1. 隤蕭??嚙賣撖急炎?嚙穀n2. ?嚙踝蕭?蝯蕭??嚙踝蕭?\n3. 閰蕭??嚙踝蕭??嚙踝蕭?\n4. ?嚙質摩?嚙踝蕭?隤踵\n5. ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙穀n\n隢蕭?蝷綽蕭??嚙賭耨?嚙賭蒂嚙??靽格?嚙踝蕭??嚙賬n\n**憸冽隤踵撠振**嚗n?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡◢?嚙踝蕭? [?嚙賡◢?嚙稽 隤踵??[?嚙踝蕭?憸冽]嚗n[?嚙踝蕭??嚙賢捆]\n\n隤踵隤迎蕭?嚗n- ?嚙踝蕭?霈?嚙踝蕭??嚙穀n- 隤矽頧蕭?閬蕭?\n- 撠平蝔漲隤踵\n- ?嚙踝蕭??嚙賢蔗霈蕭?\n\n隢蕭?靘矽?嚙踝蕭??嚙踝蕭??嚙踝蕭?憸冽霈蕭?隤迎蕭??嚙賬n\n**憭蕭?閮?嚙賢捆蝑嚙?*\n\n**?嚙賢?嚙賢遣嚙?*嚗n?嚙賜?嚙賢 [?嚙踝蕭?撣] 撣嚗蕭??嚙踝蕭??嚙踝蕭? [?嚙踝蕭?/?嚙踝蕭?] ?嚙踝蕭??嚙賢捆?嚙賢?嚙賢遣霅堆蕭?\n- ?嚙踝蕭??嚙踝蕭??嚙質蕭?\n- 隤蕭?銵剁蕭?蝧\n- ?嚙賡靽⊥隤踵\n- 閬死?嚙踝蕭?撱箄降\n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭?敹蕭? :
          'ChatGPT excels in language processing, providing high-quality translation and text polishing services.',
        keyPoints: isZhHK ? [
          '撠平蝧餉陌嚗蕭?憓蕭??嚙踝蕭??嚙踝蕭??嚙賡?嚙賬蕭?隤蕭?嚙?,
          '憭蕭??嚙踝蕭?瘥蕭??嚙質陌?嚙踝蕭?霅胯?嚙踝蕭??嚙賡??,
          '?嚙踝蕭?瞏日ˇ嚗蕭?瘜撠蕭?瑽?嚙賬霈?嚙踝蕭???,
          '憸冽隤踵嚗蕭?隤選蕭??嚙賬蕭??嚙賡?嚙賬蕭??嚙踝蕭???,
          '?嚙賢?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡?嚙賬蕭?敹??
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

    // 蝚穿蕭?銝鳴蕭?嚗蕭??嚙踝蕭?嚙?AI ???嚙賭犖?嚙踝蕭? GPT ?嚙踝蕭?
    '22': {
      id: 22,
      themeId: 5,
      title: isZhHK ? '?嚙踝蕭? 5.1嚗dvanced Data Analysis (?嚙踝蕭??嚙踝蕭?憭批葦)嚗蕭???Excel/CSV/PDF嚗莎蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?銵刻ˊ嚙? : 'Unit 5.1: Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',
      duration: '35?嚙踝蕭?',
      type: 'advanced' as const,
      description: isZhHK ? '摮賂蕭?雿輻 ChatGPT ??Advanced Data Analysis ?嚙質嚗蕭??嚙踝蕭??嚙踝蕭??嚙賜車?嚙踝蕭??嚙賭辣?? : 'Learn to use ChatGPT\'s Advanced Data Analysis feature to process and analyze various data files.',
      content: {
        transcript: isZhHK ? 
          'Advanced Data Analysis ??ChatGPT Plus ?嚙賢撥憭改蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭? Excel?嚙瘠SV?嚙瞑DF 蝑蕭?蝔殷蕭?隞嗆撘蕭??嚙踝蕭?瘛勗漲?嚙踝蕭??嚙踝蕭??嚙穀n\n**?嚙賭辣銝?嚙踝蕭??嚙踝蕭?**\n\n**Excel ?嚙賭辣?嚙踝蕭?**嚗n?嚙踝蕭?銝鈭蕭??嚙賡?嚙賣?嚙踝蕭? Excel ?嚙賭辣嚗蕭?撟恬蕭?嚗n1. ?嚙踝蕭??嚙踝蕭??嚙賢?嚙踝蕭?瑽蕭?蝯梧蕭?鞈蕭?\n2. 霅?嚙賢頞典?嚙賢迤蝭?嚙賣芋撘n3. ?嚙賢銵函?嚙賢末嚙??嚙賢榆嚙??嚙踝蕭?憿\n4. 閮蕭??嚙賡蝮橘蕭??嚙踝蕭?嚗PI嚗n5. ?嚙賢遣閬死?嚙踝蕭?銵剁蕭?蝷箔蜓閬?嚙穀n6. ?嚙踝蕭??嚙踝蕭??嚙賢?嚙賢擃遣霅啜n\n**CSV ?嚙踝蕭?皜蕭?**嚗n?嚙賡蕭?CSV ?嚙賭辣?嚙賢摰Ｘ?嚙踝蕭?嚗蕭??嚙賢嚗n- 瑼Ｘ?嚙踝蕭?摰?嚙踝蕭?銝?嚙賣吭n- 霅?嚙踝蕭??嚙賜撩憭勗墦n- ?嚙賜?嚙踝蕭?閮蕭?銝血遣霅堆蕭??嚙賣瘜n- 璅蕭??嚙賣?嚙賣撘n- ?嚙賢遣?嚙踝蕭??嚙質釭?嚙踝蕭??嚙穀n\n**PDF ?嚙賭辣嚙??**嚗n?嚙踝蕭??嚙踝蕭??嚙賭遢 PDF ?嚙踝蕭?嚗n- ?嚙踝蕭??嚙賡?嚙踝蕭??嚙賜絞閮蕭?閮n- 蝮踝蕭?銝鳴蕭??嚙賜?嚙踝蕭?隢n- 霅?嚙踝蕭?頞典?嚙賣芋撘n- ?嚙賣風?嚙賣?嚙賡莎蕭?瘥蕭??嚙踝蕭?\n- 鋆踝蕭??嚙踝蕭??嚙賢閬蕭??嚙質”?嚙穀n\n**?嚙踝蕭??嚙踝蕭?瘚蕭?嚙?*\n\n**?嚙賜揣?嚙賣?嚙踝蕭???(EDA)**嚗n?嚙踝蕭??嚙賢?嚙踝蕭??嚙踝蕭??嚙賡?嚙賣蝝Ｘ改蕭??嚙踝蕭?\n1. ?嚙踝蕭?璁汗?嚙賢?嚙賜絞閮n2. 霈蕭??嚙踝蕭??嚙踝蕭?\n3. ?嚙踝蕭??嚙踝蕭??嚙穀n4. ?嚙賢虜?嚙賣炎皜枯n5. 蝻箏仃?嚙賣芋撘蕭??嚙穀n6. ?嚙踝蕭??嚙踝蕭??嚙穀n7. ?嚙賣郊瘣蕭??嚙踝蕭?閮准n\n**?嚙賣平?嚙質?嚙踝蕭?**嚗n?嚙賢?嚙賡蕭?璆哨蕭??嚙踝蕭?嚗蕭??嚙踝蕭?嚗n- ?嚙賡璆哨蕭??嚙踝蕭??嚙踝蕭?\n- 摰Ｘ蝝堆蕭??嚙踝蕭??嚙踝蕭??嚙穀n- 撣頞典霅\n- ?嚙賢?嚙踝蕭??嚙踝蕭??嚙穀n- ?嚙賣葫?嚙踝蕭?霅佗蕭?璅n- 銵蕭?撱箄降?嚙踝蕭??嚙賣?嚙踝蕭? :
          'Advanced Data Analysis is a powerful feature of ChatGPT Plus that can process Excel, CSV, PDF and other file formats for deep data analysis.',
        keyPoints: isZhHK ? [
          '?嚙賭辣?嚙賣嚗xcel?嚙瘠SV?嚙瞑DF 蝑蕭?蝔格撘蕭???,
          '?嚙踝蕭?皜蕭?嚗蕭??嚙賣扳炎?嚙賬撩憭勗潘蕭??嚙賬撘蕭?皞蕭?',
          '?嚙踝蕭??嚙質嚗隅?嚙踝蕭??嚙賬絞閮蕭?蝞撣豢炎嚙?,
          '閬死?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質”?嚙賣?嚙賢閬蕭?',
          '?嚙賣平瘣蕭?嚗PI 閮蕭??嚙賢恥?嚙踝蕭??嚙賬蕭?皜砍遣嚙?
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
      title: isZhHK ? '?嚙踝蕭? 5.2嚗eb Browse (撖佗蕭?蝬脩窗?嚙質汗)嚗蕭??嚙賢?嚙賜雯蝯∴蕭?閮蕭??嚙踝蕭?撣隤踵?嚙賣?嚙賜蜇嚙? : 'Unit 5.2: Web Browse: Real-time Web Information for Market Research',
      duration: '30?嚙踝蕭?',
      type: 'advanced' as const,
      description: isZhHK ? '?嚙賣 ChatGPT ?嚙賜雯蝯∠汗?嚙質嚗?嚙踝蕭??嚙踝蕭?閮蒂?嚙踝蕭??嚙踝蕭??? : 'Master ChatGPT\'s web browsing feature to gather latest information and conduct analysis.',
      content: {
        transcript: isZhHK ? 
          'Web Browse ?嚙質嚙?ChatGPT ?嚙踝蕭?閮迎蕭??嚙踝蕭?蝬脩窗鞈蕭?嚗之憭扳撅蕭??嚙賜霅蕭??嚙踝蕭?撖衣?嚙賬n\n**撖佗蕭?鞈蕭??嚙踝蕭?嚙?*\n\n**?嚙踝蕭???嚙踝蕭?嚙賜蜇嚙?*嚗n?嚙踝蕭??嚙踝蕭?銝衣蜇蝯蕭?憭抬蕭???[?嚙踝蕭?銝鳴蕭?/?嚙賢/銵平] ?嚙踝蕭??嚙賣?嚙踝蕭?\n- ?嚙賢 5-10 璇蕭??嚙踝蕭??嚙賣?嚙穀n- 瘥蕭??嚙踝蕭??嚙踝蕭?蝪∴蕭??嚙踝蕭?\n- ?嚙踝蕭??嚙踝蕭?頞典?嚙賢蔣?嚙穀n- 霅?嚙賡鈭辣?嚙踝蕭??嚙踝蕭?\n- ?嚙賣葫?嚙質?嚙踝蕭?蝥撅n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭?鞈蕭??嚙賣平撱箄降?嚙穀n\n**撣?嚙賜弦?嚙賜奎?嚙踝蕭???*嚗n?嚙踝蕭?嚙?[?嚙踝蕭?/?嚙踝蕭?/銵平] ?嚙踝蕭?撣隤踵嚗n- ?嚙踝蕭??嚙?嚙踝蕭?撣?嚙踝蕭??嚙賣?嚙穀n- ?嚙踝蕭?銝鳴蕭?蝡嗥撠蕭??嚙踝蕭??嚙穀n- 霅撣頞典?嚙踝蕭??嚙穀n- ?嚙踝蕭?摰Ｘ閰?嚙踝蕭?擖n- 瘥蕭?摰蝑\n- 蝮踝蕭?撣?嚙賢撱箄降?嚙穀n\n**?嚙質?頞?嚙質蕭嚙?*嚗n?嚙踝蕭?嚙?[?嚙質?嚙??嚙稽 ?嚙踝蕭??嚙賜撅蕭?\n- ?嚙踝蕭??嚙?嚙踝蕭??嚙質?嚙??嚙穀n- ?嚙踝蕭??嚙踝蕭??嚙賜弦隢蕭??嚙踝蕭??嚙穀n- 霅?嚙踝蕭??嚙賢?嚙踝蕭??嚙賜弦璈蕭?\n- 閰摯?嚙質?嚙??嚙賢漲?嚙踝蕭??嚙踝蕭??嚙穀n- ?嚙賣葫?嚙踝蕭??嚙踝蕭??嚙踝蕭?\n- ?嚙踝蕭??嚙質?嚙?鞈遣霅啜n\n**撖衣?嚙賜?嚙賣嚙?*\n\n**?嚙踝蕭?瘙綽蕭??嚙賣**嚗n?嚙踝蕭?撟恬蕭??嚙賜弦 [?嚙賢?嚙賜迂/?嚙賜巨嚙?嚙踝蕭]嚗n- ?嚙踝蕭??嚙?嚙踝蕭?鞎∴蕭??嚙踝蕭??嚙賣?嚙穀n- ?嚙踝蕭??嚙賢銵函?嚙踝蕭??嚙踝蕭??嚙穀n- ?嚙踝蕭??嚙踝蕭?撣恬蕭?暺蕭?閰蕭?\n- 霅憸券?嚙踝蕭??嚙踝蕭??嚙穀n- 瘥蕭??嚙踝蕭?璆剖?嚙質”?嚙穀n- ?嚙踝蕭??嚙踝蕭?撱箄降?嚙賡◢?嚙踝蕭?隡啜n\n**?嚙踝蕭?閬蕭??嚙賣**嚗n?嚙賜?嚙踝蕭? [?嚙踝蕭??嚙稽 ?嚙踝蕭?閮蕭??嚙踝蕭??嚙?嚙踝蕭?閮蕭?\n- ?嚙質岷?嚙踝蕭??嚙踝蕭?銵蕭??嚙踝蕭?閬蕭?\n- ?嚙踝蕭??嚙?嚙踝蕭??嚙踝蕭??嚙賣?嚙踝蕭?\n- ?嚙踝蕭??嚙賢憭拇除?嚙賢迤蝭鞈蕭?\n- ?嚙賢?嚙?嚙踝蕭?瘣鳴蕭??嚙踝蕭??嚙穀n- ?嚙踝蕭?鈭日蕭?雿挪?嚙踝蕭??嚙賢?嚙穀n- ?嚙踝蕭?摰?嚙踝蕭??嚙賣釣?嚙踝蕭??嚙踝蕭? :
          'The Web Browse feature allows ChatGPT to access real-time web information, greatly expanding its knowledge range and practicality.',
        keyPoints: isZhHK ? [
          '?嚙踝蕭?鞈蕭?嚗?嚙踝蕭??嚙賣?嚙賬?嚙賬??,
          '撣隤踵嚗奎?嚙踝蕭??嚙賬隅?嚙踝蕭??嚙賬恥?嚙踝蕭?嚙?,
          '?嚙質?餈質馱嚙??嚙?嚙踝蕭??嚙賬蕭?蝛塚蕭??嚙賬撅蕭?嚙?,
          '?嚙踝蕭??嚙賣嚗瓷?嚙踝蕭??嚙賬◢?嚙踝蕭?隡啜蕭??嚙踝蕭?嚙?,
          '?嚙賣暑?嚙賜嚗蕭?銵蕭??嚙賬蕭?隞嗉蕭頩扎祕?嚙踝蕭?嚙?
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
      title: isZhHK ? '?嚙踝蕭? 5.3嚗ALL-E 3 ?嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭??嚙賡撠平蝝蕭??嚙賣平?嚙踝蕭??嚙賜陛?嚙踝蕭??嚙踝蕭??嚙踝蕭?雿蕭?' : 'Unit 5.3: DALL-E 3 Image Generation: Create Professional Business Illustrations',
      duration: '32?嚙踝蕭?',
      type: 'creative' as const,
      description: isZhHK ? '摮賂蕭?雿輻 DALL-E 3 ?嚙踝蕭?擃釭?嚙踝蕭??嚙踝蕭?皛輯雲?嚙賜車?嚙賣平?嚙賢?嚙踝蕭?瘙蕭? : 'Learn to use DALL-E 3 to create high-quality images for various business and creative needs.',
      content: {
        transcript: isZhHK ? 
          'DALL-E 3 ??ChatGPT ?嚙踝蕭??嚙賢撥憭改蕭??嚙踝蕭??嚙賢極?嚙踝蕭??嚙賣?嚙踝蕭?摮蕭?餈啣?嚙賢隞支犖撽蕭??嚙踝蕭?閬箏摰嫘n\n**撠平?嚙踝蕭??嚙踝蕭??嚙賢概嚙?**\n\n**?嚙賣平?嚙踝蕭?閮哨蕭?**嚗n?嚙踝蕭??嚙踝蕭??嚙踝蕭?銝撟蕭?璆哨蕭??嚙踝蕭?\n銝鳴蕭?嚗?嚙踝蕭?璆哨蕭??嚙賣]\n憸冽嚗嚙?嚙踝蕭蝪⊥??蕭?璆苒n?嚙賢蔗嚗蕭?璆哨蕭??嚙質嚙?[?嚙踝蕭?憿]\n?嚙踝蕭?嚗蕭???[?嚙踝蕭??嚙賣平?嚙踝蕭?]\n?嚙賡蕭?蝬莎蕭?擐蕭??嚙賜陛?嚙賬蕭??嚙踝蕭??嚙穀n撠箏站撱箄降嚗?嚙賜雯?嚙踝蕭??嚙賢雿輻\n?嚙踝蕭??嚙質矽嚗靽～?嚙賬蕭??嚙賬n\n**蝪∪閬死?嚙踝蕭?**嚗n?嚙賜?嚙踝蕭??嚙賣平蝪∪?嚙踝蕭??嚙踝蕭?嚗n蝪∪銝鳴蕭?嚗銝鳴蕭??嚙賢捆]\n?嚙踝蕭??嚙賜嚗?嚙踝蕭??嚙質膩]\n閮哨蕭?閬蕭?嚗n- 憸冽銝?嚙賣吭n- 皜?嚙踝蕭?閬箏惜甈﹏n- ?嚙踝蕭??嚙賢蔣憿舐內\n- ?嚙踝蕭??嚙踝蕭?閮\n- 撠平銝撘犖\n隢蕭?嚙?3-5 ?嚙踝蕭??嚙踝蕭?閮哨蕭?璁艙?嚙穀n\n**?嚙踝蕭?閬死霅**嚗n?嚙踝蕭??嚙質身閮蕭??嚙賜?嚙踝蕭??嚙踝蕭?\nBrand嚗?嚙踝蕭??嚙賜迂?嚙踝蕭?雿\n?嚙踝蕭?/?嚙踝蕭?嚗?嚙踝蕭??嚙質膩]\n?嚙踝蕭?撣嚗?嚙賜?嚙賢噩]\n?嚙踝蕭??嚙賣改蕭?[敶Ｗ捆閰蕭?餈財\n閬死憸冽嚗?嚙賭誨/蝬/?嚙賣蝑\n?嚙賜?嚙賣嚗ogo?嚙踝蕭?鋆誨?嚙賬冗蝢歹蕭?擃n隢雿蕭??嚙踝蕭??嚙賜移蟡蕭?閬死?嚙踝蕭??嚙穀n\n**?嚙踝蕭??嚙賜內閰蕭?撌改蕭?**\n\n**?嚙質膩蝯蕭??嚙踝蕭?**嚗n?嚙踝蕭??嚙踝蕭? DALL-E 3 ?嚙賜內閰蕭?瑽蕭?\n1. 銝鳴蕭??嚙質膩嚗蕭??嚙踝蕭?隞暻潘蕭?\n2. 憸冽?嚙踝蕭?嚗蕭?銵◢?嚙賬蕭?閬粹◢?嚙踝蕭?\n3. ?嚙質?嚙??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賬敶抬蕭?\n4. ?嚙踝蕭??嚙質矽嚗蕭??嚙賬蕭??嚙踝蕭?\n5. ?嚙質釭閬蕭?嚗蕭?嚙??摨艾蕭?璆哨蕭?嚗n6. ?嚙質◢?嚙踝蕭??嚙踝蕭??嚙踝蕭?摰嗚身閮蕭?瘣橘蕭??嚙穀n\n**撣賂蕭??嚙賜?嚙賣**嚗n\n**蝷曄黎慦蕭??嚙賢捆**嚗n?嚙賜蝷曄黎慦蕭?鞎潘蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗n撟喳嚗Instagram/Facebook/LinkedIn]\n?嚙賢捆銝鳴蕭?嚗鞎潘蕭??嚙賢捆]\n閬死憸冽嚗蕭??嚙踝蕭?銝?嚙穀n撠箏站閬蕭?嚗?嚙踝蕭?撟喳閬蕭?\n?嚙踝蕭?蝛綽蕭?嚗蕭??嚙踝蕭?憿蕭?璅蕭?雿蔭\n銵蕭??嚙賜捲嚗蕭?閬綽蕭??嚙踝蕭? CTA?嚙穀n\n**?嚙質?嚙踝蕭??嚙踝蕭?**嚗n?嚙賢雿蕭?摮貊?嚙踝蕭?嚗n隤莎蕭?銝鳴蕭?嚗?嚙踝蕭?隤莎蕭?]\n摮賂蕭??嚙踝蕭?嚗?嚙賢飛?嚙踝蕭?]\n摮詨蝔漲嚗?嚙踝蕭?/銝哨蕭?/擃蕭?]\n閬死閬蕭?嚗蕭??嚙賬蕭??嚙賬蕭??嚙賣楛?嚙穀n憸冽?嚙賢末嚗蕭??嚙賬蕭?璆准蕭??嚙賣改蕭? :
          'DALL-E 3 is a powerful image generation tool integrated with ChatGPT that can create stunning visual content based on text descriptions.',
        keyPoints: isZhHK ? [
          '?嚙賣平?嚙賜嚗蕭??嚙質身閮陛?嚙踝蕭??嚙賬蕭??嚙踝蕭?嚙?,
          '?嚙踝蕭??嚙賢概嚙??嚙賜內閰蕭?瑽◢?嚙踝蕭?摰蕭?鞈芣??,
          '憭蕭??嚙賣嚗冗蝢歹蕭?擃蕭??嚙賢閮蕭??嚙踝蕭???,
          '撠平?嚙質釭嚗蕭?嚙??摨艾蕭?璆哨蕭??嚙踝蕭?閬死?嚙踝蕭?',
          '?嚙踝蕭??嚙踝蕭?嚗翰?嚙賜?嚙踝蕭??嚙質身閮蕭?敹蛛蕭??嚙賣'
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
      title: isZhHK ? '?嚙踝蕭? 5.4嚗撱綽蕭??嚙賜洵銝??Custom GPT嚗?嚙賜楊嚙?嚗蕭??嚙踝蕭??嚙踝蕭??嚙賡犖撠惇??AI ?嚙賜' : 'Unit 5.4: Create Your First Custom GPT: Build Personal AI Applications Without Programming',
      duration: '28?嚙踝蕭?',
      type: 'practical' as const,
      description: isZhHK ? '摮賂蕭??嚙賢遣?嚙踝蕭? GPT嚗蕭??嚙踝蕭??嚙?嚙踝蕭? AI ?嚙踝蕭?靘圾瘙箇摰蕭?憿蕭? : 'Learn to create custom GPTs and build specialized AI assistants to solve specific problems.',
      content: {
        transcript: isZhHK ? 
          'Custom GPT 霈蕭??嚙踝蕭??嚙賢遣撠蕭??嚙踝蕭? AI ?嚙踝蕭?嚗?嚙賜楊嚙??嚙踝蕭?撠梯?嚙賡犖撠惇??AI ?嚙賜?嚙穀n\n**Custom GPT ?嚙賢遣瘚蕭?嚙?*\n\n**璁艙閮哨蕭??嚙賣挾**嚗n?嚙踝蕭??嚙踝蕭???Custom GPT嚗n?嚙踝蕭?嚗蕭?嚙?嚙踝蕭隞暻潘蕭?憿蕭?\n?嚙踝蕭??嚙賣嚗狐?嚙賭蝙?嚙賡蕭?GPT嚗n?嚙踝蕭??嚙質嚗蜓閬蕭?靘鈭蕭??嚙踝蕭?\n撠平?嚙踝蕭?嚗蕭?閬蕭?暻潘蕭?璆剔霅蕭?\n鈭蕭?憸冽嚗迤撘蕭??嚙賬蕭?銵改蕭?\n?嚙賜?嚙賢潘蕭??嚙賢嚙?GPT ?嚙賢榆?嚙踝蕭?嚗n\n**?嚙踝蕭?摨怠遣嚙?*嚗n?嚙賜 Custom GPT 皞蕭??嚙踝蕭??嚙賢捆嚗n- 銝?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙穀n- ?嚙踝蕭?撣賂蕭??嚙踝蕭??嚙踝蕭?獢n- 撱綽蕭?撠平銵蕭?閰\n- ?嚙踝蕭??嚙賭蔔撖西?嚙?靘n- 皞蕭?蝭蕭?撠店?嚙踝蕭??嚙穀n- 閮哨蕭??嚙踝蕭??嚙踝蕭?隤選蕭?憸冽?嚙穀n\n**撖衣 Custom GPT 蝭蕭?嚙?*\n\n**?嚙賣平憿改蕭? GPT**嚗n?嚙賢撱綽蕭?璆哨蕭??嚙賡“?嚙踝蕭?\n閫嚗蕭?瘛梧蕭?璆哨蕭??嚙賡“?嚙穀n撠嚗葉撠蕭?璆哨蕭??嚙賢?嚙穀n?嚙踝蕭??嚙踝蕭?嚗蕭?璆哨蕭?雿喳祕頦蕭?靘蕭?蝛跚n?嚙踝蕭?蝭蕭?嚗蕭??嚙踝蕭??嚙賬蕭??嚙賣?嚙賬蕭??嚙踝蕭??嚙穀n皞◢?嚙踝蕭?撠平?嚙踝蕭?瑽蕭??嚙踝蕭??嚙踝蕭??嚙穀n?嚙踝蕭??嚙質嚗WOT ?嚙踝蕭??嚙踝蕭?璆剜芋撘身閮n\n**摮賂蕭?頛蕭? GPT**嚗n?嚙踝蕭??嚙賢犖?嚙賢飛蝧?嚙踝蕭?\n撠平?嚙踝蕭?嚗?嚙踝蕭?摮賂蕭??嚙踝蕭??嚙稽\n?嚙賢飛憸冽嚗儐摨撓?嚙賬蕭??嚙踝蕭?蝑n摮賂蕭?鞈蕭?嚗蕭??嚙賬毀蝧蕭??嚙踝蕭??嚙踝蕭??嚙穀n閰摯璈嚗脣漲餈質馱?嚙賢摹暺蕭??嚙穀n瞈?嚙賜頂蝯梧蕭?曌?嚙賢遣霅豹n?嚙踝蕭??嚙踝蕭??嚙踝蕭?摮賂蕭??嚙賢漲隤踵??嚙踝蕭?嚙穀n\n**Creative GPT**嚗n?嚙質身閮?嚙賢?嚙踝蕭?\n?嚙踝蕭??嚙踝蕭?嚗神雿身閮璅蔣?嚙穀n?嚙踝蕭?靘蕭?嚗之?嚙賢?嚙踝蕭??嚙踝蕭?靘n?嚙踝蕭?瘚蕭?嚗蕭?瑽?嚙踝蕭??嚙踝蕭??嚙踝蕭?撠n憸冽憭見嚗蕭??嚙踝蕭?瘣橘蕭??嚙賣?\n?嚙踝蕭?璅∴蕭?嚗蕭??嚙賣?嚙踝蕭??嚙踝蕭?\n?嚙質釭?嚙賢嚗?嚙踝蕭?隡堆蕭??嚙踝蕭?撱箄降?嚙穀n\n**GPT ?嚙踝蕭??嚙賢概嚙?**\n\n**?嚙賜內閰??*嚗n?嚙踝蕭???Custom GPT ?嚙賜頂蝯梧蕭?蝷綽蕭?\n1. 皜?嚙踝蕭??嚙踝蕭?蝢坼n2. ?嚙踝蕭??嚙踝蕭??嚙踝蕭?撘n3. ?嚙踝蕭??嚙踝蕭?閬蕭?\n4. 撠平?嚙踝蕭??嚙踝蕭?\n5. ?嚙質炊?嚙踝蕭?璈\n6. ?嚙賣擃蕭??嚙踝蕭??嚙穀n\n**皜祈岫?嚙賣??*嚗n?嚙瘠ustom GPT ?嚙質釭靽蕭?嚗n- 憭?嚙賣葫閰佗蕭?閰崤n- ?嚙踝蕭??嚙賣?嚙踝蕭?\n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質釭\n- ?嚙踝蕭??嚙踝蕭?摨怠摰鈾n- 隤踵鈭蕭?憸冽\n- ??嚙踝蕭雿輻?嚙踝蕭??? :
          'Custom GPT allows you to create specialized AI assistants and build personal AI applications without programming knowledge.',
        keyPoints: isZhHK ? [
          '?嚙賢遣瘚蕭?嚗蕭?敹菔身閮霅遣閮准頂蝯梧蕭?嚙?,
          '?嚙賜蝭蕭?嚗蕭?璆剝“?嚙賬飛蝧蕭?撠?嚙賢??,
          '?嚙踝蕭??嚙賢概嚙??嚙賜內閰蕭??嚙賬葫閰行?嚙賬?嚙踝蕭?嚙?,
          '?嚙踝蕭?蝺剁蕭?嚗蕭?閬綽蕭??嚙賡?嚙踝蕭?嚗陛?嚙踝蕭???,
          '?嚙賭犖?嚙踝蕭??嚙踝蕭?撠惇?嚙質?嚙賡◢?嚙賬霅蕭???
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
      title: isZhHK ? '?嚙踝蕭? 5.5嚗PTs ?嚙賜?嚙踝蕭??嚙踝蕭?撖蕭?憒蕭??嚙踝蕭?雿蕭? GPT嚗蕭??嚙賣靘?嚙踝蕭?銝剔?? : 'Unit 5.5: GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',
      duration: '32?嚙踝蕭?',
      type: 'business' as const,
      description: isZhHK ? '鈭圾 GPT Store ?嚙踝蕭?雿蕭??嚙踝蕭?摮賂蕭?憒蕭??嚙踝蕭??嚙賣嚙????Custom GPT?? : 'Understand how GPT Store works and learn to publish and promote your Custom GPT.',
      content: {
        transcript: isZhHK ? 
          'GPT Store ?嚙賢雿蕭?靘蕭??嚙賭澈?嚙踝蕭??嚙賜?嚙踝蕭?撟喳嚗蕭?嚙?嚙踝蕭?嚙踝蕭?璈撠蕭??嚙賜雿?嚙踝蕭?閬n\n**GPT Store ?嚙踝蕭?瘚蕭?嚙?*\n\n**?嚙踝蕭??嚙踝蕭???*嚗n?嚙踝蕭??嚙賜雿蕭???Custom GPT嚗n1. 摰蕭? GPT ?嚙質?嚙賣扯\n2. ?嚙賢遣?嚙踝蕭?鈭綽蕭??嚙賜迂?嚙踝蕭?餈豹n3. 閮哨蕭?撠平?嚙踝蕭?璅蕭?閬死?嚙踝蕭?\n4. ?嚙賢神皜?嚙賭蝙?嚙質牧?嚙穀n5. ?嚙踝蕭??嚙賡皜祈岫?嚙賢?嚙穀n6. 皞蕭?蝷綽蕭?獢蕭??嚙踝蕭?靘蕭?閰崤n7. 閮哨蕭??嚙賜?嚙踝蕭??嚙踝蕭?璅惜?嚙穀n\n**撣摰蕭?蝑**嚗n?嚙賣?嚙踝蕭???GPT ?嚙賜摰蕭?嚗n?嚙踝蕭??嚙賣嚗蕭?蝣綽蕭?蝢拐蝙?嚙質黎擃n嚙?嚙踝蕭?嚙踝蕭?嚗蕭??嚙賢擃蕭??嚙賣?嚙賣?\n蝡嗥?嚙踝蕭?嚗蕭?蝛塚蕭?隡潘蕭? GPT ?嚙賜\n撌桃?嚙賢?嚙踝蕭?蝒?嚙賜?嚙質?嚙賢?嚙穀n撣蝛箇嚗?嚙賣鋡急遛頞喉蕭??嚙賣?\n?嚙賣擃蕭?嚗?嚙踝蕭??嚙踝蕭?蝔蕭?皛選蕭?摨艾n\n**?嚙賢捆?嚙踝蕭???SEO**嚗n\n**?嚙質膩?嚙踝蕭??嚙踝蕭?**嚗n?嚙賣撖怠撘犖??GPT ?嚙質膩嚗n璅蕭??嚙踝蕭?嚗蕭??嚙踝蕭??嚙踝蕭?嚗陛瞏蕭??嚙穀n?嚙質隞晶嚗蕭?璆牧?嚙賣敹蕭??嚙踝蕭??嚙賢\n雿輻?嚙賣嚗蕭?餈啣擃蕭??嚙賜?嚙踝蕭?\n?嚙賣?嚙踝蕭?嚗撥隤蹂蝙?嚙質?嚙踝蕭??嚙賢?嚙穀n?嚙賡閰蕭??嚙踝蕭??嚙賢?嚙踝蕭??嚙踝蕭?閰蕭?\n銵蕭??嚙賜捲嚗蕭?撠?嚙質岫?嚙踝蕭?鈭蕭??嚙穀n\n**閬死閮哨蕭??嚙踝蕭???*嚗n?嚙踝蕭??嚙踝蕭?璆哨蕭? GPT 敶Ｚ情嚗n?嚙踝蕭?閮哨蕭?嚗陛瞏蕭??嚙賢漲擃泵?嚙踝蕭??嚙穀n?嚙賢蔗?嚙踝蕭?嚗蕭??嚙踝蕭?銝?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣\n閬死憸冽嚗蕭?璆剜改蕭?閬迎蕭??嚙踝蕭?撟唾﹛\n?嚙踝蕭?銝?嚙賣改蕭??嚙?嚙踝蕭?閬綽蕭?蝝蕭?隤輻絞銝\n?嚙賣隤嚗捆?嚙踝蕭?嚙??閮?嚙穀n\n**?嚙賢誨?嚙踝蕭??嚙踝蕭??嚙踝蕭?**\n\n**蝷曄黎慦蕭??嚙賢誨**嚗n?嚙踝蕭??嚙賣嚙????Custom GPT嚗n- ??LinkedIn?嚙確witter 蝑像?嚙踝蕭?鈭俞n- ?嚙賢遣雿輻?嚙踝蕭??嚙踝蕭?靘蕭?蝛跚n- ?嚙踝蕭??嚙踝蕭?蝷曄黎?嚙踝蕭?隢n- ?嚙踝蕭?閬蕭?鋡蕭?撠振?嚙踝蕭?\n- 摰蕭??嚙賭澈?嚙賣?嚙賣?嚙穀n- ?嚙踝蕭??嚙踝蕭?蝷箇?嚙踝蕭?霅n\n**?嚙賢捆銵**嚗n?嚙賢遣嚙?GPT ?嚙踝蕭?憡改蕭?\n- ?嚙賢神?嚙踝蕭??嚙踝蕭??嚙踝蕭?璆哨蕭?蝡n- 鋆踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?雿喳祕頦n- ?嚙質齒蝺蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?\n- ?嚙賢遣敶梧蕭??嚙踝蕭??嚙踝蕭?蝷暝n- 撱綽蕭??嚙賣蝷曄黎?嚙賣?嚙賜頂蝯崤n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣?嚙賬n\n**?嚙踝蕭??嚙賢璈蕭?**嚗n\n**?嚙賣平璅∴蕭??嚙賜揣**嚗n?嚙瘦PT 霈?嚙賢?嚙賡蕭?嚗n1. ?嚙賣?嚙質祥璅∴蕭?嚗蕭??嚙賢像?嚙賣?嚙踝蕭?\n2. 隢株岷?嚙踝蕭??嚙賢恥鋆踝蕭??嚙賜\n3. ?嚙踝蕭?隤莎蕭??嚙踝蕭??嚙賢摰鈾n4. ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙穀n5. ?嚙踝蕭??嚙賣?嚙踝蕭?璆哨蕭??嚙穀n6. ?嚙踝蕭?瘣蕭??嚙踝蕭??嚙踝蕭?蝛塚蕭? :
          'GPT Store provides creators with a platform for sharing and potential monetization, understanding its mechanisms is crucial for successful publishing.',
        keyPoints: isZhHK ? [
          '?嚙踝蕭?皞蕭?嚗蕭??嚙踝蕭??嚙賬蕭?餈啣?嚙賬蕭?閬箄身嚙?,
          '撣摰蕭?嚗璅?嚙賬榆?嚙踝蕭??嚙賜奎?嚙踝蕭???,
          'SEO ?嚙踝蕭?嚗蕭??嚙踝蕭?蝑?嚙踝蕭?餈堆蕭?獢蕭?撠閬漲',
          '?嚙賢誨蝑嚗冗蝢歹蕭?擃摰對蕭??嚙賬?嚙踝蕭?嚙?,
          '?嚙賢璈蕭?嚗蕭??嚙踝蕭??嚙賣芋撘蕭?璆哨蕭?雿??
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

    // 蝚砍銝鳴蕭?嚗蕭??嚙賣嚙????嚙賜?嚙賢恬蕭??嚙踝蕭???    '27': {
      id: 27,
      themeId: 6,
      title: isZhHK ? '?嚙踝蕭? 6.1嚗I ?嚙賬劂閬箝鞊∴蕭?憒蕭?霅銝行嚙?AI ?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚙? : 'Unit 6.1: AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',
      duration: '25?嚙踝蕭?',
      type: 'critical' as const,
      description: isZhHK ? '鈭圾 AI 撟餉死?嚙質情?嚙踝蕭??嚙踝蕭?摮賂蕭?霅?嚙踝蕭?嚙?AI 頛詨?嚙踝蕭?撖行改蕭? : 'Understand the causes of AI hallucination and learn to identify and verify the authenticity of AI outputs.',
      content: {
        transcript: isZhHK ? 
          'AI?嚙賢劂閬箝?嚙賭犖撌交?嚙踝蕭??嚙踝蕭?隡潘蕭??嚙踝蕭?撖佗蕭??嚙質炊?嚙踝蕭?瑽蕭?鞈蕭?嚗蕭?嚙?嚙踝蕭?鞊∴蕭?鞎痊隞餃雿輻 AI ?嚙踝蕭??嚙踝蕭??嚙穀n\n**AI 撟餉死?嚙踝蕭?蝢抬蕭??嚙賢噩嚙?*\n\n**隞暻潭 AI 撟餉死**嚗nAI 撟餉死?嚙踝蕭??嚙踝蕭?閮璅∴蕭??嚙踝蕭??嚙質雲憭蕭?嚙?嚙踝蕭鞈蕭??嚙踝蕭?瘜蕭?嚗蕭??嚙踝蕭?隞伐蕭?摨西靽∴蕭?隤矽?嚙踝蕭??嚙質炊?嚙質炊撠蕭?摰?嚙踝蕭??嚙賢摰嫘蕭??嚙踝蕭?敺敺?嚙踝蕭?瘜蕭??嚙質摩銝敺蕭?嚗蕭?鈭粹隞伐蕭??嚙踝蕭??嚙賢?嚙踝蕭??嚙賬n\n**撣賂蕭??嚙賢劂閬綽蕭???*嚗n1. **鈭祕?嚙賡嚙?*嚗隤歹蕭??嚙踝蕭??嚙賭犖?嚙賬暺?嚙穀n2. **?嚙踝蕭?撘**嚗蕭?摮?嚙踝蕭?蝛嗚蝐蕭?蝡蕭??嚙穀n3. **?嚙質摩?嚙賜**嚗蕭?敺蕭?銝?嚙踝蕭??嚙質膩\n4. **?嚙賢漲憭**嚗?嚙踝蕭??嚙踝蕭?閮蕭??嚙踝蕭??嚙踝蕭?撠蕭?蝯蕭?\n5. **瘛瘀蕭??嚙踝蕭?**嚗蕭??嚙賢祕?嚙踝蕭??嚙踝蕭?閮毽?嚙踝蕭??嚙穀n\n**撟餉死?嚙踝蕭??嚙踝蕭??嚙踝蕭?**\n\n**?嚙質?撅?嚙踝蕭???*嚗n- 閮毀?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢榆\n- 璅∴蕭?撠蕭?蝣綽蕭??嚙踝蕭??嚙踝蕭?銝\n- ?嚙踝蕭?璈?嚙賡璈吭n- ?嚙踝蕭??嚙賣迫?嚙踝蕭??嚙踝蕭??嚙穀n- ?嚙踝蕭??嚙踝蕭??嚙賭葉?嚙踝蕭?撌桃敞蝛n\n**霅 AI 撟餉死?嚙踝蕭?撌改蕭?**\n\n**?嚙賢?嚙賣雁瑼Ｘ**嚗n?嚙踝蕭?嚙?AI ?嚙踝蕭??嚙賢靽∪漲嚗n1. 鈭祕?嚙踝蕭?嚗蕭?閬?嚙踝蕭??嚙質膩?嚙質??函?嚙?霅n2. ?嚙質摩銝?嚙賣改蕭?瑼Ｘ?嚙踝蕭??嚙質膩?嚙賢?嚙賜\n3. 靘蕭?餈質馱嚗蕭?瘙蕭?靘擃蕭?鞈蕭?靘蕭?\n4. 撣賂蕭??嚙賣嚗蕭??嚙踝蕭??嚙賢摰對蕭?閬釭?嚙穀n5. 撠平?嚙踝蕭?嚗雿蕭??嚙踝蕭??嚙踝蕭?瑼ｇ蕭?皞Ⅱ?嚙穀n6. 憭蕭?撽蕭?嚗蝙?嚙踝蕭??嚙踝蕭?閮蕭?皞漱?嚙踝蕭?霅n\n**撖衣撽蕭??嚙踝蕭?**嚗n\n**鈭祕?嚙踝蕭?瘚蕭?**嚗n?嚙賢遣蝡頂蝯望改蕭?撽蕭?蝧嚗n- 撠擃?嚙踝蕭?蝯梧蕭?鞈蕭?靽蕭??嚙踝蕭?\n- 雿輻?嚙賭縑?嚙踝蕭?撖行霅雯蝡n- ?嚙賣?嚙踝蕭?鞈蕭?靘蕭?\n- 隢株岷?嚙踝蕭?撠振?嚙踝蕭?\n- 瘥蕭?憭蕭?AI 撌亙?嚙踝蕭??嚙穀n- 雿輻?嚙踝蕭?撘蕭??嚙踝蕭?撽蕭?\n- ?嚙賢瘜剁蕭??嚙踝蕭??嚙賜霅唳扯店憿n\n**憸券閰摯蝑**嚗n\n**擃◢?嚙踝蕭??嚙賢??*嚗n?嚙賢隞伐蕭??嚙踝蕭?銝?嚙質牲?嚙踝蕭?\n- ?嚙踝蕭??嚙賢熒撱箄降\n- 瘜蕭??嚙賜蝞∴蕭??嚙穀n- 鞎∴蕭??嚙踝蕭?瘙綽蕭?\n- 摮賂蕭??嚙賜弦撘\n- ?嚙踝蕭??嚙踝蕭?鈭蕭?閮n- ?嚙質?嚙??嚙踝蕭??嚙踝蕭??嚙踝蕭?\n- 摰?嚙踝蕭??嚙賜內?嚙穀n\n**?嚙賭蔔撖西?撱綽蕭?*嚗n\n**鞎痊隞颱蝙?嚙踝蕭???*嚗n?嚙賢遣蝡摨瘀蕭? AI 雿輻蝧嚗n1. 靽蕭??嚙賢?嚙賣雁\n2. 撱綽蕭?憭蕭?撽蕭?璈\n3. 鈭圾 AI ?嚙踝蕭??嚙穀n4. ?嚙踝蕭?閬捱蝑葉隢株岷撠振\n5. ?嚙踝蕭?摮賂蕭??嚙賣?嚙賜霅n6. ?嚙質隞犖霅 AI 撟餉死?? :
          'AI "hallucination" refers to artificial intelligence generating seemingly reasonable but actually incorrect or fabricated information. Understanding this phenomenon is crucial for responsible AI use.',
        keyPoints: isZhHK ? [
          'AI 撟餉死嚗蕭??嚙踝蕭??嚙賭撮?嚙踝蕭??嚙璀I?嚙踝蕭??嚙賢捆',
          '撣賂蕭?憿蕭?嚗蕭?撖阡隤扎蕭?瑽蕭??嚙賬蕭?頛荔蕭???,
          '?嚙踝蕭??嚙踝蕭?嚗蕭?蝺湛蕭??嚙賬蕭?蝣綽蕭??嚙踝蕭??嚙賬霅嚙?,
          '霅?嚙賢概嚙??嚙賢?嚙賜雁?嚙踝蕭?撖行霅蕭??嚙踝蕭?嚙?,
          '憸券蝞⊥嚗蕭?憸券?嚙賣雓對蕭??嚙踝蕭?摰嗉垣閰Ｕ蕭?蝥飛嚙?
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
      title: isZhHK ? '?嚙踝蕭? 6.2嚗?嚙踝蕭??嚙踝蕭?摰嚗蕭??嚙踝蕭?閰梧蕭??嚙踝蕭?嚗蕭?雿恣?嚙踝蕭??嚙賣?? : 'Unit 6.2: Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',
      duration: '22?嚙踝蕭?',
      type: 'security' as const,
      description: isZhHK ? '鈭圾 AI ?嚙踝蕭??嚙賡蝘蝑蕭?摮賂蕭?靽風?嚙賭犖?嚙踝蕭?璆剜?嚙踝蕭??嚙賭蔔撖西?嚙? : 'Understand AI service privacy policies and learn best practices for protecting personal and business data.',
      content: {
        transcript: isZhHK ? 
          '?嚙賭蝙??ChatGPT 嚙?AI ?嚙踝蕭??嚙踝蕭?鈭圾?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質降憿蕭??嚙賭犖?嚙踝蕭?璆剝?嚙踝蕭??嚙踝蕭??嚙穀n\n**?嚙踝蕭??嚙踝蕭??嚙賭蝙??*嚗n\n**OpenAI ?嚙賣?嚙賣嚙?*嚗nOpenAI ?嚙賣?嚙賜?嚙踝蕭?撠店?嚙賢捆?嚙賣?嚙踝蕭??嚙踝蕭??嚙質釭嚗蕭??嚙賢嗾?嚙踝蕭?閬蕭?嚗n- ?嚙質祥?嚙賜?嚙踝蕭?撠店?嚙質?嚙賣璅∴蕭?閮毀\n- ChatGPT Plus ?嚙賣?嚙賭誑?嚙踝蕭??嚙?嚙賣?嚙賣?嚙穀n- 隡平?嚙踝蕭?靘?嚙賣?嚙賣?嚙踝蕭?霅琿?嚙穀n- API 雿輻?嚙賣?嚙踝蕭??嚙賜?嚙賣芋?嚙踝蕭?蝺廄n\n**?嚙踝蕭?憸券閰摯**嚗n\n**?嚙賭犖鞈蕭?瘣拚憸券**嚗n?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?憡蕭?嚗n1. ?嚙賭犖頨思遢鞈蕭? (PII) ?嚙踝蕭??嚙賭澈\n2. ?嚙踝蕭??嚙賣平鞈蕭?瘣拚\n3. 摰Ｘ鞈蕭??嚙質蝯⊥撘n4. 鞎∴蕭??嚙賡?嚙踝蕭?閮n5. 撖Ⅳ?嚙賜?嚙踝蕭?霅n6. ?嚙賡?嚙賭辣?嚙踝蕭??嚙賬n\n**?嚙踝蕭?靽風?嚙賭蔔撖佗蕭?*嚗n\n**?嚙賭犖?嚙賣?嚙踝蕭?**嚗n?嚙踝蕭?霅瘀蕭??嚙賢犖?嚙踝蕭?嚗n- ?嚙踝蕭??嚙賭澈?嚙賢祕憪蕭??嚙賢?嚙?嚙賡閰崤n- 銝蕭?靘縑?嚙賢?嚙賜Ⅳ?嚙踝蕭?銵蕭?閮n- 雿輻?嚙踝蕭??嚙賭誨?嚙賣嚙??撖西澈隞穀n- 摰蕭?瑼Ｘ?嚙踝蕭??嚙踝蕭?閰望風?嚙穀n- ?嚙賜?嚙踝蕭?閮哨蕭??嚙踝蕭?\n- 鈭圾?嚙踝蕭?靽蕭??嚙踝蕭??嚙穀n\n**隡平摰蝑**嚗n\n**?嚙賣平?嚙踝蕭?靽風**嚗n?嚙踝蕭?璆凋蝙??AI ?嚙踝蕭??嚙踝蕭??嚙踝蕭?\n1. 撱綽蕭??嚙賜Ⅱ??AI 雿輻?嚙踝蕭?\n2. 閮毀?嚙賢極?嚙踝蕭??嚙踝蕭?\n3. 雿輻隡平蝝蕭??嚙賣獢n4. 撖行?嚙踝蕭??嚙踝蕭?蝟餌絞\n5. 摰蕭??嚙踝蕭?摰撖拇\n6. 撱綽蕭?鈭蕭??嚙踝蕭?瘚蕭??嚙穀n\n**?嚙踝蕭?鞈蕭??嚙賭誨蝑**嚗n\n**鞈蕭??嚙踝蕭??嚙踝蕭?嚙?*嚗n?嚙踝蕭??嚙賢雿輻 AI ?嚙踝蕭?嚗n- ??[?嚙賢A] ?嚙賭誨?嚙賢祕?嚙賢?嚙賜迂\n- ??[摰ＸB] ?嚙賭誨?嚙踝蕭?摰Ｘ靽⊥\n- 雿輻蝷綽蕭??嚙踝蕭??嚙踝蕭??嚙賢祕?嚙踝蕭?\n- ?嚙質膩?嚙踝蕭??嚙踝蕭??嚙踝蕭?獢蕭?\n- ?嚙賜?嚙踝蕭??嚙踝蕭??嚙踝蕭?蝝堆蕭?\n- 雿輻?嚙賜銵蕭??嚙賭誨撠蕭??嚙踝蕭??嚙穀n\n**瘜蕭??嚙賢儐?嚙踝蕭?**嚗n\n**?嚙踝蕭??嚙踝蕭?瘜蕭?**嚗n?嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭?閬蕭?瘙蕭?\n- GDPR嚗蕭??嚙踝蕭??嚙賣?嚙踝蕭?霅瘀蕭??嚙踝蕭?\n- CCPA嚗蕭?撌蕭?鞎餉蝘蕭?嚗n- ?嚙賭犖鞈蕭?靽風瘜蕭??嚙賜嚗n- ?嚙踝蕭?摰瘜蕭?銝哨蕭?嚗n- 銵平?嚙踝蕭?閬蕭?嚗蕭??嚙賬?嚙踝蕭?嚗n\n**摰撌亙?嚙質身嚙?*嚗n\n**?嚙踝蕭??嚙賢?嚙踝蕭?**嚗n?嚙賢?嚙踝蕭??嚙賡蝘身摰蕭?\n1. ?嚙踝蕭?撠店甇瑕閮蕭?\n2. 蝳?嚙踝蕭??嚙踝蕭??嚙賣閮毀\n3. 摰蕭??嚙賡撠店閮蕭?\n4. 雿輻?嚙踝蕭??嚙質汗璅∴蕭?\n5. ?嚙賣雿輻 VPN ?嚙踝蕭?\n6. ??嚙踝蕭撣單瘣鳴蕭??嚙穀n\n**鈭蕭??嚙踝蕭?閮蕭?**嚗n\n**?嚙踝蕭?瘣拚?嚙踝蕭?**嚗n?嚙踝蕭??嚙賣?嚙賣?嚙賣援?嚙踝蕭?\n- 蝡?嚙賣迫雿輻?嚙踝蕭??嚙踝蕭?\n- 閮蕭??嚙踝蕭?隡唳援?嚙踝蕭??嚙穀n- ?嚙賜鼠?嚙踝蕭??嚙踝蕭??嚙穀n- ?嚙賜?嚙踝蕭??嚙賭遢?嚙穀n- 撖行?嚙賢拿?嚙賢?嚙賣\n- 瑼ｇ蕭??嚙賣?嚙踝蕭??嚙賣蝑蕭? :
          'When using AI services like ChatGPT, understanding data privacy and security issues is crucial for both individuals and businesses.',
        keyPoints: isZhHK ? [
          '?嚙踝蕭??嚙踝蕭?嚗蕭?閫ｘI?嚙踝蕭??嚙賣?嚙踝蕭?雿輻閬蕭?',
          '憸券閰摯嚗蕭??嚙賢犖?嚙踝蕭?璆哨蕭?閮援?嚙踝蕭???,
          '靽風蝑嚗?嚙踝蕭??嚙踝蕭?閮嚙?嚙踝蕭?梁?閮哨蕭?,
          '隡平摰嚗蝑摰撌亙閮蕭??嚙賡??,
          '瘜蕭??嚙賢儐嚗DPR?嚙瘠CPA蝑蝘蕭?閬蕭?嚙?
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
      title: isZhHK ? '?嚙踝蕭? 6.3嚗I ?嚙踝蕭?閬蕭?憿蕭?隤蕭?閮毀?嚙踝蕭?撣塚蕭??嚙踝蕭??嚙賢蔣?嚙踝蕭?銝血飛蝧蕭?雿蕭?嚙? : 'Unit 6.3: AI Bias Issues: Understanding Training Data Impact and How to Respond',
      duration: '20?嚙踝蕭?',
      type: 'ethical' as const,
      description: isZhHK ? '?嚙踝蕭? AI ?嚙踝蕭??嚙踝蕭?皞蕭?敶梢嚗飛蝧蕭??嚙踝蕭?皜蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭? : 'Explore the sources and impacts of AI bias, learn strategies to identify and reduce bias.',
      content: {
        transcript: isZhHK ? 
          'AI ?嚙踝蕭??嚙踝蕭?鈭箏極?嚙質蝟餌絞?嚙踝蕭??嚙踝蕭?閮蕭?銵函?嚙踝蕭??嚙賢像?嚙賣郁閬改蕭??嚙踝蕭?嚗蕭?嚙?嚙踝蕭?蕭?憿蕭??嚙賣?嚙踝蕭?鞎砌遙?嚙賭蝙??AI?嚙穀n\n**AI ?嚙踝蕭??嚙踝蕭?嚙?*嚗n\n**閮毀?嚙踝蕭??嚙踝蕭?**嚗nAI 璅∴蕭??嚙踝蕭?蝺湔?嚙踝蕭??嚙踝蕭??嚙賜雯?嚙踝蕭?蝔殷蕭??嚙踝蕭?皞蕭??嚙踝蕭?鞈蕭?銝?嚙踝蕭??嚙踝蕭??嚙踝蕭?鈭綽蕭?蝷橘蕭??嚙踝蕭?閬蕭??嚙賣?嚙質情嚗n- 甇瑕?嚙賜銝哨蕭??嚙賢?嚙賜車?嚙踝蕭?閬n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭??嚙穀n- 蝷橘蕭?蝬蕭??嚙踝蕭??嚙賢榆?嚙穀n- 隤蕭??嚙質”?嚙賣撘蕭??嚙賢末\n- ?嚙賢潘蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣吭n\n**撣賂蕭??嚙踝蕭?閬蕭???*嚗n\n**蝷橘蕭?鈭箏?嚙踝蕭?**嚗n?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭? AI ?嚙踝蕭?嚗n1. ?嚙賢?嚙踝蕭?嚗璆剖?嚙賢鞊～?嚙踝蕭?閮苒n2. 蝔殷蕭??嚙踝蕭?嚗蕭??嚙質炊嚙?嚙踝蕭甇?嚙踝蕭?閬n3. 撟湧翩?嚙踝蕭?嚗蕭?嚙?嚙踝蕭?嚙賬蕭?銵?嚙踝蕭?閮苒n4. ?嚙踝蕭??嚙踝蕭?嚗正?嚙賭葉敹蜓蝢押蕭??嚙賢榆?嚙穀n5. 隤蕭??嚙踝蕭?嚗隤?嚙賬閮甇改蕭?\n6. 蝬蕭??嚙踝蕭?嚗蕭?蝝蕭?閮准蕭?鞎餉?嚙賢?嚙賬n\n**隤?嚙踝蕭?**嚗n?嚙璀I ?嚙質銴ˊ?嚙賭犖憿蕭??嚙踝蕭?閬蕭?\n- 蝣綽蕭??嚙質炊嚗蕭?憟賣?嚙賣?嚙踝蕭?暺蕭?鞈蕭?\n- ?嚙踝蕭??嚙踝蕭?隤歹蕭?擃摯撣賂蕭?鈭辣?嚙踝蕭??嚙穀n- 嚙?嚙踝蕭?嚙踝蕭?隤歹蕭??嚙賢漲璁撠見?嚙賜敺琵n- ?嚙踝蕭??嚙質炊嚗蕭?摨佗蕭?鞈湛蕭?甈∠敺蕭?鞈蕭?\n- 蝢歹蕭??嚙賜雁嚗敺蕭??嚙踝蕭?閬n\n**?嚙踝蕭?霅?嚙踝蕭?*嚗n\n**?嚙賢?嚙踝蕭?隡唳嚙?*嚗n?嚙賣炎嚙?AI ?嚙踝蕭?銝哨蕭?瞏?嚙踝蕭?嚗n1. 憭蕭?摨行葫閰佗蕭??嚙踝蕭??嚙質澈隞踝蕭??嚙賣?嚙踝蕭??嚙踝蕭?\n2. ?嚙踝蕭?撽蕭?嚗葫閰衣?嚙踝蕭?撠蕭??嚙踝蕭?瘜n3. ?嚙踝蕭??嚙踝蕭??嚙踝蕭?瑼Ｘ?嚙賢?嚙賣銝蕭??嚙踝蕭?閫暺n4. 隤蕭??嚙踝蕭?嚗釣?嚙賜閰?嚙踝蕭?蝷箏?嚙賢鞊﹏n5. ?嚙踝蕭?靘蕭?嚗釭?嚙賜絞閮蕭?鈭祕?嚙賭誨銵冽吭n6. 撠振隢株岷嚗銝蕭??嚙踝蕭??嚙踝蕭?瘙蕭?璆哨蕭?閬n\n**皜蕭??嚙踝蕭??嚙踝蕭???*嚗n\n**?嚙賜內閰??*嚗n?嚙質身閮?嚙賢像??AI 鈭蕭?嚗n- ?嚙賜Ⅱ閬蕭?憭蕭??嚙踝蕭?暺n- ?嚙踝蕭?雿輻?嚙質?嚙賜內?嚙踝蕭??嚙踝蕭?敶n- 閬蕭??嚙賣銝蕭??嚙踝蕭??嚙踝蕭??嚙穀n- 隢蕭?撟唾﹛?嚙賢恥閫?嚙踝蕭??嚙穀n- ?嚙賜Ⅱ?嚙賢?嚙質???嚙踝蕭??嚙踝蕭?憿蕭?\n- 閬蕭??嚙踝蕭?憭車嚙?嚙踝蕭?嚙踝蕭??嚙穀n\n**撖佗蕭??嚙賜**嚗n\n**?嚙踝蕭??嚙賜內閰蕭?嚙?*嚗n\n**?嚙踝蕭??嚙賜內**嚗蕭?餈堆蕭??嚙踝蕭??嚙踝蕭?隡平摰嗚n**?嚙質?嚙賜內**嚗蕭?餈堆蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?隡平摰塚蕭??嚙賣銝蕭??嚙賢?嚙賜車?嚙賬僑朣∴蕭??嚙踝蕭?雿蔭?嚙踝蕭?摮蕭??嚙踝蕭??嚙賣?嚙質情?嚙穀n\n**?嚙踝蕭??嚙賜內**嚗圾?嚙賜隞暻潘蕭?鈭蕭?摰塚蕭?頛?嚙賬n**?嚙質?嚙賜內**嚗蕭?憭蕭?摨佗蕭??嚙踝蕭?摰嗥撅蕭?銴蕭??嚙踝蕭?嚗?嚙賜陛?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚙??嚗甇瑕?嚙賢?嚙賬瘝颯蕭?瞈蕭?憭蕭??嚙踝蕭??嚙穀n\n**蝯蕭?撅日?嚙踝蕭?嚙?*嚗n\n**隡平 AI 瘝鳴蕭?**嚗n?嚙賢遣蝡蕭?鞎砌遙??AI 雿輻?嚙踝蕭?嚗n1. ?嚙踝蕭? AI ?嚙踝蕭??嚙踝蕭?\n2. ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?\n3. 撱綽蕭?憭蕭??嚙踝蕭? AI 雿輻?嚙踝蕭?\n4. 摰蕭?撖拇 AI ?嚙賢?嚙質釭\n5. 撱綽蕭??嚙踝蕭??嚙賣?嚙踝蕭??嚙穀n6. ?嚙踝蕭??嚙踝蕭?蝷曄黎靽蕭?撠店?嚙穀n\n**?嚙踝蕭??嚙踝蕭?*嚗n\n**摮賂蕭??嚙賡??*嚗n?嚙賢擗?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗n- 摰蕭??嚙賣撠蕭?閬蕭?憿蕭??嚙質圾\n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?閮蕭?\n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭?鈭箔漱瘚蕭?撽n- ?嚙賣釣 AI ?嚙踝蕭??嚙踝蕭??嚙賜撅n- 蝛扔?嚙踝蕭??嚙賢遣?嚙賢撟喉蕭? AI ?嚙踝蕭??? :
          'AI bias refers to unfair or discriminatory tendencies in AI systems when processing information. Understanding this issue helps use AI more responsibly.',
        keyPoints: isZhHK ? [
          '?嚙踝蕭?靘蕭?嚗蕭?蝺湔?嚙賭葉?嚙賣風?嚙踝蕭?蝷橘蕭??嚙踝蕭?',
          '?嚙踝蕭?憿蕭?嚗冗?嚙賭犖??嚙踝蕭嚙??嚙賬蕭??嚙踝蕭?憭車?嚙踝蕭?',
          '霅?嚙賢概嚙?憭蕭?摨行葫閰艾?嚙賣改蕭?隡啜蕭?摰嗉垣嚙?,
          '皜蕭?蝑嚗蕭?蝷綽蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?閬蕭??嚙賢像銵∴蕭???,
          '蝯蕭?瘝鳴蕭?嚗恬蕭??嚙踝蕭??嚙賢閮蕭??嚙賬蕭?蝥??
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
      title: isZhHK ? '?嚙踝蕭? 6.4嚗蕭?鞎砌遙?嚙賭蝙??AI嚗摮賂蕭??嚙賢極雿蕭??嚙踝蕭?銝哨蕭??嚙踝蕭??嚙賢恬蕭??嚙踝蕭?' : 'Unit 6.4: Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',
      duration: '18?嚙踝蕭?',
      type: 'ethical' as const,
      description: isZhHK ? '?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賭蝙??AI ?嚙賢恬蕭?皞蕭??嚙踝蕭?雿喳祕頦蕭? : 'Explore ethical guidelines and best practices for using AI in different fields.',
      content: {
        transcript: isZhHK ? 
          '鞎痊隞餃雿輻 AI ?嚙質???嚙賢蕭??嚙賢遣蝡蕭?蝣綽蕭??嚙踝蕭??嚙踝蕭?嚗像銵∴蕭?銵噶?嚙踝蕭??嚙賢噸鞎砌遙?嚙穀n\n**摮賂蕭??嚙賜弦?嚙踝蕭?**嚗n\n**AI 頛?嚙賜弦?嚙踝蕭???*嚗n?嚙賢摮賂蕭??嚙踝蕭?銝凋蝙??AI ?嚙賢恬蕭??嚙踝蕭?嚗n1. ?嚙踝蕭?摨佗蕭??嚙踝蕭??嚙賜Ⅱ?嚙踝蕭? AI ?嚙賭蝙?嚙踝蕭??嚙穀n2. ?嚙賢?嚙賜雁霅瘀蕭?蝣綽蕭??嚙賜弦?嚙賜蝡?嚙穀n3. 撘閬蕭?嚗?嚙踝蕭?嚙?AI ?嚙賢?嚙賡?嚙穀n4. ?嚙質釭?嚙賢嚗犖撌伐蕭?嚙?AI ?嚙踝蕭??嚙賢摰鈾n5. 摮賂蕭?隤縑嚗?嚙踝蕭? AI 頛詨?嚙賣雿?嚙賢楛?嚙踝蕭??嚙穀n6. ?嚙踝蕭?撖拇嚗?嚙踝蕭? AI 雿輻?嚙賜???閰摯?嚙穀n\n**?嚙賣?嚙踝蕭?雿輻?嚙賣**嚗n?嚙賢飛銵蕭?蝛嗡葉 AI ?嚙賡?嚙踝蕭??嚙踝蕭?\n- ?嚙賜?嚙踝蕭??嚙踝蕭?甇交?嚙穀n- ?嚙踝蕭??嚙踝蕭??嚙賣芋撘蕭??嚙穀n- 隤蕭?瞏日ˇ?嚙賣撘?嚙穀n- 璁艙嚙???嚙踝蕭?隢閮n- ?嚙賜弦?嚙踝蕭??嚙賢遣霅堆蕭?閮蕭?\n- 頝典飛蝘霅蕭??嚙踝蕭??嚙穀n\n**?嚙賡?嚙踝蕭?銵**嚗n?嚙賢飛銵蕭??嚙賭蝙??AI ?嚙踝蕭?摮蕭?\n- ?嚙賣銴ˊ AI ?嚙踝蕭??嚙踝蕭??嚙賣挾?嚙穀n- ??AI ?嚙賡祕撽?嚙踝蕭?蝯蕭?\n- 銝??AI 頛撠梧蕭?鈭歹蕭?璆苒n- 嚙?AI 嚙?嚙踝蕭摰蕭??嚙踝蕭??嚙賣撌伐蕭?\n- 雿輻 AI ?嚙踝蕭?銝?嚙踝蕭??嚙踝蕭?霅啜n\n**?嚙賢?嚙賜?嚙踝蕭?**嚗n\n**撠平鞎砌遙?嚙踝蕭?**嚗n?嚙賢極雿憓葉??AI 雿輻?嚙踝蕭?嚗n1. ?嚙賢?嚙踝蕭??嚙賢儐嚗蕭?嚙?嚙踝蕭?嚙踝蕭?蝯蕭???AI 雿輻閬蕭?\n2. 摰Ｘ?嚙踝蕭?靽風嚗Ⅱ嚙?AI 雿輻銝蕭?摰喳恥?嚙踝蕭??嚙穀n3. 撠平?嚙踝蕭?蝬剛風嚗蕭?嚙?AI ?嚙賭誨?嚙踝蕭?撠平?嚙賣\n4. 鞈蕭?摰嚗?嚙賣援?嚙踝蕭??嚙踝蕭??嚙賣平鞈蕭?\n5. ?嚙質釭鞎砌遙嚗蕭? AI 頛?嚙賢極雿蕭??嚙踝蕭?鞎枯n6. ?嚙踝蕭?摮賂蕭?嚗蕭??嚙踝蕭??嚙踝蕭??嚙賭犖撠平?嚙踝蕭??嚙穀n\n**銝蕭??嚙賣平?嚙質蕭?**嚗n\n**瘜蕭?撠平**嚗n?嚙踝蕭?撣思蝙??AI ?嚙賢恬蕭??嚙踝蕭?嚗n- 瘜蕭??嚙賜弦?嚙踝蕭?靘蕭??嚙踝蕭??嚙穀n- ?嚙賭辣韏瘀蕭??嚙踝蕭?甇伐蕭??嚙穀n- 摰Ｘ隢株岷?嚙踝蕭??嚙踝蕭?蝛跚n- 雿蕭??嚙踝蕭??嚙踝蕭?嚙?AI ?嚙踝蕭?敺?嚙穀n- 敹蕭?鈭箏極撽蕭??嚙?嚙踝蕭?敺遣霅豹n- 靽風摰Ｘ?嚙踝蕭??嚙踝蕭?撣怨璆剔甈n\n**?嚙踝蕭??嚙賢熒**嚗n?嚙賡?嚙踝蕭?嚙?AI 雿輻?嚙質牲?嚙踝蕭??嚙踝蕭?\n- ?嚙質?嚙賜霅?嚙踝蕭?頛撌亙\n- 銵撌伐蕭??嚙踝蕭?瑼?嚙穀n- ?嚙賜弦?嚙賜?嚙踝蕭?撠蕭?蝮踝蕭?\n- 蝯蕭??嚙賣嚙?嚙踝蕭摨那?嚙賢?嚙穀n- 銝蕭?靘擃蕭?瘝鳴蕭?撱箄降\n- ?嚙賣靽風??嚙踝蕭?梁?嚙?閮n\n**?嚙質?嚙踝蕭?**嚗n?嚙踝蕭?撣恬蕭??嚙質撌伐蕭??嚙踝蕭? AI ?嚙踝蕭?嚗n- 隤莎蕭??嚙賢捆?嚙踝蕭??嚙踝蕭??嚙賜弦\n- ?嚙賢飛?嚙踝蕭??嚙賢?嚙賣蝝兝n- 摮賂蕭?閰摯?嚙踝蕭??嚙賢極?嚙穀n- ?嚙踝蕭?摮賂蕭???AI 蝝蕭?\n- 蝷綽蕭?鞎痊隞鳴蕭? AI 雿輻\n- ?嚙賣迫摮賂蕭??嚙賢漲靘陷 AI?嚙穀n\n**?嚙踝蕭??嚙賣?嚙質瓷?嚙踝蕭?**嚗n\n**?嚙踝蕭??嚙賣平?嚙踝蕭?**嚗n?嚙賢雿蝙??AI ?嚙質蕭?嚗n1. ?嚙賢?嚙質?嚙踝蕭??嚙賜Ⅱ璅內 AI ?嚙踝蕭??嚙賢雿?嚙穀n2. ?嚙賣鞎∠甈蕭?鈭圾 AI ?嚙踝蕭??嚙賢捆?嚙踝蕭?甈蕭?瘜n3. ?嚙踝蕭?摰?嚙踝蕭?靽蕭??嚙賭犖?嚙踝蕭?憸冽?嚙踝蕭?敹琵n4. 撣?嚙賢像嚗?嚙踝蕭??嚙賜奎?嚙賢?嚙穀n5. ?嚙踝蕭?撠蕭?嚗??AI 銴ˊ?嚙踝蕭??嚙踝蕭??嚙踝蕭?\n6. ?嚙?嚙賢像銵∴蕭?蝬哨蕭??嚙賜撅犖?嚙踝蕭??嚙踝蕭??嚙穀n\n**?嚙賣平?嚙踝蕭??嚙賜**嚗n?嚙踝蕭?璆剔憓葉?嚙賢雿恬蕭?嚗n- 嚙???嚙踝蕭??嚙賢摰對蕭? AI 頛\n- ?嚙踝蕭?閮哨蕭??嚙踝蕭?鋆蕭??嚙踝蕭?靘蕭?\n- ?嚙踝蕭??嚙賣?嚙賢?嚙賜?嚙穀n- 摰Ｘ擃蕭??嚙賢?嚙賢遣霅豹n- 雿蕭?靽蕭??嚙踝蕭??嚙賢祕?嚙穀n- ?嚙踝蕭?隤歹蕭?瘨祥?嚙賬n\n**撱綽蕭??嚙賭犖?嚙踝蕭?獢**嚗n\n**?嚙踝蕭?閰摯?嚙踝蕭?**嚗n?嚙賭蝙??AI ?嚙踝蕭??嚙踝蕭?瑼ｇ蕭?嚗n1. ?嚙賜車雿輻?嚙賢蝚佗蕭?撠平璅蕭?嚗n2. ?嚙賣?嚙質撠蕭??嚙賣?嚙質痊隞鳴蕭?\n3. ?嚙賣見?嚙賣?嚙踝蕭??嚙踝蕭?鈭綽蕭??嚙踝蕭?\n4. ?嚙賣?嚙踝蕭??嚙踝蕭?摮賂蕭??嚙踝蕭??嚙踝蕭?\n5. ?嚙賜車雿輻?嚙賢?嚙踝蕭??嚙踝蕭?撖佗蕭?\n6. ?嚙踝蕭?靘蕭??嚙賢?嚙踝蕭??嚙賜冗?嚙踝蕭??? :
          'Responsible AI use requires establishing clear ethical boundaries in various fields, balancing technological convenience with moral responsibility.',
        keyPoints: isZhHK ? [
          '摮賂蕭??嚙踝蕭?嚗蕭??嚙踝蕭??嚙踝蕭??嚙賜雁霅瑯蕭?鞈芣??,
          '?嚙賢鞎砌遙嚗蝑敺芥蕭?璆剖?嚙賬蕭?閮蕭???,
          '撠平?嚙踝蕭?嚗蕭?敺?嚙賬蕭??嚙踝蕭??嚙踝蕭??嚙賜畾蕭?',
          '?嚙踝蕭??嚙踝蕭?嚗蕭??嚙質?嚙賬?嚙質瓷?嚙踝蕭??嚙踝蕭??嚙踝蕭???,
          '?嚙賭犖獢嚗?嚙踝蕭?隡啜痊隞餅?嚙賬蕭?蝥飛嚙?
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
      title: isZhHK ? '?嚙踝蕭? 6.5嚗犖撌交?嚙踝蕭??嚙踝蕭?嚗蕭???GPT ?嚙踝蕭?銝甇亦撅蕭?撠冗?嚙踝蕭??嚙踝蕭?敶梢' : 'Unit 6.5: The Future of AI: GPT\'s Next Development and Long-term Social Impact',
      duration: '25?嚙踝蕭?',
      type: 'future' as const,
      description: isZhHK ? '?嚙踝蕭? AI ?嚙質?嚙??嚙踝蕭??嚙踝蕭?頞典?嚙踝蕭?蝷橘蕭??嚙賢惜?嚙踝蕭?瞏敶梢?? : 'Explore future trends in AI technology and potential impacts on various aspects of society.',
      content: {
        transcript: isZhHK ? 
          '鈭箏極?嚙質嚙???嚙賢翰?嚙賜撅蕭?畾蛛蕭?鈭圾?嚙賣靘隅?嚙踝蕭??嚙賭犖?嚙賜冗?嚙踝蕭?閬蕭??嚙賢?嚙踝蕭?閬蕭?蝢押n\n**?嚙質??澆?頞??*嚗n\n**璅∴蕭??嚙踝蕭??嚙踝蕭???*嚗n?嚙賣嚙?GPT ??AI 璅∴蕭??嚙賢?嚙賜撅蕭?\n1. ?嚙踝蕭??嚙踝蕭?憓撥嚗銴蕭??嚙踝蕭?頛舀蕭??嚙踝蕭?嚙?嚙踝蕭\n2. 憭芋?嚙賣?嚙踝蕭??嚙賣?嚙踝蕭??嚙賬?嚙賬蔣?嚙踝蕭??嚙賜葦蝯蕭?\n3. 撖佗蕭?摮賂蕭?嚗蕭?蝥蕭??嚙踝蕭?閮葉摮賂蕭??嚙賡?嚙穀n4. ?嚙賭犖?嚙踝蕭?摨佗蕭??嚙賣楛摨佗蕭??嚙賣?嚙賣改蕭?擃蕭?\n5. 撠平?嚙踝蕭?撌伐蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣楛摨佗蕭?蝎閱n6. ?嚙質圾?嚙賣改蕭?AI 瘙綽蕭??嚙踝蕭??嚙賡蕭??嚙賬n\n**?嚙質???嚙質隅??*嚗n?嚙璀I ?嚙賢隞蕭?銵蕭??嚙踝蕭?嚗n- ?嚙質嚙?(IoT)嚗?嚙賢振撅蕭??嚙踝蕭??嚙賢?嚙踝蕭??嚙穀n- ?嚙踝蕭?撖佗蕭? (AR/VR)嚗蕭?瘚賂蕭? AI 鈭歹蕭?擃蕭?\n- ?嚙賢?嚙?嚗銝哨蕭??嚙踝蕭? AI 瘝鳴蕭??嚙踝蕭??嚙踝蕭??嚙穀n- ?嚙踝蕭?閮蕭?嚗蕭??嚙賣改蕭?閮蕭??嚙踝蕭??嚙踝蕭?\n- ?嚙賜楠閮蕭?嚗?嚙踝蕭???AI ?嚙踝蕭??嚙踝蕭?\n- ?嚙踝蕭?隞嚗?嚙踝蕭??嚙賜雁-AI 鈭歹蕭??嚙穀n\n**蝷橘蕭?敶梢?嚙賣葫**嚗n\n**撌伐蕭??嚙賢停璆哨蕭???*嚗n?嚙璀I 撠蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?敶梢嚗n嚙?嚙踝蕭敶梢嚗n- ?嚙踝蕭??嚙踝蕭?銴批極雿蕭??嚙賣鈭綽蕭?敺蕭??嚙踝蕭?撌伐蕭?\n- ?嚙賡?嚙質璆哨蕭??嚙踝蕭?撌伐蕭?璈蕭?\n- ?嚙踝蕭??嚙踝蕭??嚙賜?嚙踝蕭?蝬蕭??嚙踝蕭?\n- ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣盂\n\n?嚙賣嚗n- ?嚙踝蕭??嚙賜絞?嚙賣平?嚙質鋡恬蕭?隞αn- ?嚙?嚙踝蕭?瘙翰?嚙踝蕭??嚙踝蕭??嚙質?嚙?蝥飛蝧n- ?嚙踝蕭?暾鳴蕭??嚙質?嚙踝蕭?蝷橘蕭?銝像蝑n- ?嚙踝蕭??嚙賢潘蕭??嚙賜儔?嚙踝蕭??嚙踝蕭?蝢押n\n**?嚙質擃頂頧蕭?**嚗n?嚙璀I ?嚙賭誨?嚙踝蕭??嚙踝蕭??嚙踝蕭?\n- ?嚙賭犖?嚙賢飛蝧楝敺蕭?蝭憟n- AI 頛?嚙賣?嚙踝蕭?摮貊頂蝯崤n- ?嚙?嚙踝蕭??嚙質蕭??嚙踝蕭?閮?嚙踝蕭??嚙穀n- 蝯澈摮賂蕭??嚙賜撣賂蕭?\n- ?嚙踝蕭??嚙賣?嚙賣雁?嚙踝蕭??嚙賣?嚙踝蕭??嚙踝蕭?\n- 頝典飛蝘?嚙質?嚙踝蕭??嚙踝蕭??嚙穀n\n**?嚙踝蕭??嚙賢熒?嚙賢**嚗n?嚙璀I ?嚙賡?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賜嚗n- 蝎橘蕭??嚙賢飛?嚙賢犖?嚙賣祥?嚙穀n- ?嚙踝蕭??嚙踝蕭?瑼Ｘ葫?嚙踝蕭??嚙穀n- ?嚙賜?嚙賜?嚙踝蕭??嚙穀n- ?嚙踝蕭??嚙踝蕭??嚙賢摨瑞皜枯n- 敹蕭??嚙賢熒??AI ?嚙賣\n- ?嚙踝蕭?鞈蕭??嚙賢?嚙踝蕭?蝵柴n\n**?嚙踝蕭??嚙賣祥?嚙踝蕭???*嚗n\n**?嚙踝蕭??嚙踝蕭?霅堆蕭?**嚗n?嚙璀I ?嚙踝蕭?撣塚蕭??嚙賢恬蕭??嚙踝蕭?嚗n1. AI 甈嚗 AI ?嚙踝蕭??嚙質?嚙踝蕭??嚙賢?嚙質?嚙?敺蕭?霅瘀蕭?\n2. 鈭綽蕭??嚙踝蕭?嚗犖憿蕭? AI ?嚙踝蕭?蝺?嚙質ㄐ嚗n3. 瘙綽蕭?鞎砌遙嚗I ?嚙賣捱摰蕭?嚗狐?嚙踝蕭?敺蕭?嚗n4. ?嚙踝蕭?銝鳴蕭?嚗犖?嚙踝蕭??嚙賣?嚙踝蕭?甇詨惇\n5. 蝞蕭??嚙踝蕭?嚗I 瘙綽蕭??嚙踝蕭??嚙賢?嚙質圾?嚙穀n6. ?嚙踝蕭?鈭箸嚗蕭??嚙質澈隞踝蕭??嚙賢祕頨思遢?嚙踝蕭?靽n\n**?嚙踝蕭?瘝鳴蕭??嚙踝蕭?*嚗n?嚙踝蕭??嚙踝蕭?雿蕭?閬蕭?撱綽蕭?嚗n- AI 摰?嚙踝蕭??嚙踝蕭?皞蕭??嚙質降\n- 頝剁蕭??嚙踝蕭?瘚蕭??嚙踝蕭??嚙賢摰n- AI 頠蕭??嚙賜?嚙踝蕭??嚙賢霅n- ?嚙質?嚙?蝘鳴蕭??嚙踝蕭??嚙賭澈璈\n- ?嚙踝蕭?銝哨蕭?摰塚蕭? AI ?嚙踝蕭?撱箄身\n- ?嚙踝蕭? AI ?嚙踝蕭?獢?嚙賢遣蝡n\n**?嚙賭犖?嚙賜冗?嚙踝蕭?皞蕭?**嚗n\n**?嚙賭犖?嚙踝蕭?撱箄身**嚗n?嚙賢 AI ?嚙賭誨靽蕭?蝡嗥?嚙踝蕭?\n1. ?嚙踝蕭?摮賂蕭??嚙踝蕭??嚙質?嚙穀n2. 頝剁蕭??嚙賜霅蕭??嚙踝蕭?\n3. ?嚙踝蕭??嚙賢?嚙賣雁\n4. ?嚙踝蕭??嚙質?嚙賭犖?嚙踝蕭??嚙穀n5. ?嚙賢?嚙賣蕭??嚙賣?嚙穀n6. ?嚙踝蕭?霈蕭??嚙踝蕭?瘣餅扼n\n**蝷橘蕭??嚙賢漲?嚙踝蕭?**嚗n?嚙賜冗?嚙賢惜?嚙踝蕭?皞蕭?撌伐蕭?嚗n- ?嚙質?嚙賢漲?嚙賢?嚙賣?嚙穀n- 蝷橘蕭?靽蕭?擃頂?嚙踝蕭??嚙質身閮n- 瘜蕭?獢?嚙賣?嚙踝蕭?摰蕭?\n- 蝬蕭?璅∴蕭??嚙賢?嚙賣蝝兝n- ?嚙踝蕭??嚙賢潘蕭??嚙賣撖抬蕭?\n- ?嚙踝蕭??嚙踝蕭?璈?嚙踝蕭?撘瑯n\n**蝛扔?嚙踝蕭??嚙踝蕭?**嚗n\n**?嚙賜 AI ?嚙賭誨?嚙踝蕭?璆蛛蕭??嚙踝蕭?*嚗n?嚙踝蕭?雿 AI ?嚙踝蕭?銝剔?嚙踝蕭??嚙踝蕭?\n- 靽蕭?撠?嚙質?嚙??嚙賣?嚙賢漲\n- ?嚙踝蕭? AI ?嚙踝蕭??嚙賣蝑蕭?閮蕭?\n- ?嚙踝蕭?鞎痊隞鳴蕭? AI ?嚙踝蕭?\n- ?嚙踝蕭?銝蕭?嚙?? AI 蝝蕭?\n- ?嚙質撌梧蕭??嚙踝蕭??嚙賜揣 AI ?嚙賜\n- 靽莎蕭?摰寞改蕭??嚙質??澆??n\n**蝯蕭?嚗蕭??嚙踝蕭??嚙踝蕭?憛嚙?*嚗n\n?嚙賭犖撌交?嚙踝蕭??嚙踝蕭?銝?嚙踝蕭??嚙賢?嚙踝蕭??嚙賣?嚙賢?嚙賢?嚙踝蕭?蝯蕭??嚙賡蕭?鞎痊隞鳴蕭??嚙賜?嚙踝蕭??嚙踝蕭??嚙賜?嚙踝蕭?蝛扔?嚙踝蕭??嚙踝蕭??嚙賢隞亦Ⅱ嚙?AI ?嚙質?嚙?嚙?嚙踝蕭鈭綽蕭?蝳蕭??嚙踝蕭?嚗?嚙踝蕭??嚙賣?嚙賣?嚙賬撟喋蕭??嚙踝蕭?蝥蕭??嚙踝蕭??嚙踝蕭? :
          'Artificial intelligence is in a rapid development phase, and understanding its future trends is important for both personal and social planning.',
        keyPoints: isZhHK ? [
          '?嚙質?頞?嚙踝蕭?璅∴蕭??嚙踝蕭?憓撥?嚙踝蕭?璅∴蕭??嚙踝蕭??嚙踝蕭?銵蕭???,
          '蝷橘蕭?敶梢嚗停璆哨蕭??嚙賬蕭??嚙踝蕭??嚙賬?嚙賡??,
          '?嚙踝蕭??嚙賣嚗?嚙質降憿?嚙賣祥?嚙賬痊隞餅飛嚙?,
          '?嚙賭犖皞蕭?嚗蕭?蝥飛蝧楊?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣??,
          '蝛扔?嚙踝蕭?嚗蕭??嚙踝蕭?摨艾恬蕭?閮蕭??嚙踝蕭?摰寧嚙?
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

  // ?? ?嚙質?嚙踝蕭?嚗楨摮蕭??嚙踝蕭?嚙?  const currentUnit = useMemo(() => {
    const unit = units[unitId as keyof typeof units];
    if (!unit) {
      // ?嚙踝蕭?銝?嚙踝蕭?隤蕭??嚙踝蕭?蝯蕭?隞仿甇ａ嚙?      return {
        id: parseInt(unitId || '1'),
        themeId: parseInt(themeId || '1'),
        title: '?嚙踝蕭?銝蕭???,
        duration: '0?嚙踝蕭?',
        type: 'video' as const,
        description: '隢炎?嚙賢?嚙瘢D?嚙賢嚙?嚙踝蕭',
        content: {
          transcript: '?嚙踝蕭??嚙賢捆銝蕭???,
          keyPoints: ['隢蕭??嚙質玨蝔蕭???]
        }
      };
    }
    return unit;
  }, [units, unitId]);

  if (!currentUnit || currentUnit.title === '?嚙踝蕭?銝蕭???) {
    return (
      <div className="min-h-screen chatgpt-unit-page text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">?嚙踝蕭?銝蕭???/h1>
          <button
            onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
            className="btn-ai-primary"
          >
            餈蕭?隤莎蕭?擐蕭?
          </button>
        </div>
      </div>
    );
  }

  const navigationConfig = useMemo(() => {
    const unitNum = parseInt(unitId || '1');
    const isLastUnitOfTheme = (
      unitNum === 5 ||   // 銝鳴蕭?1蝯蕭?
      unitNum === 10 ||  // 銝鳴蕭?2蝯蕭?  
      unitNum === 16 ||  // 銝鳴蕭?3蝯蕭?
      unitNum === 21 ||  // 銝鳴蕭?4蝯蕭?
      unitNum === 26 ||  // 銝鳴蕭?5蝯蕭?
      unitNum === 31     // 銝鳴蕭?6蝯蕭?嚗玨蝔蕭??嚙踝蕭?
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

  // ?嚙踝蕭 靽桀儔?嚙踝蕭??嚙賢 - 蝘駁?嚙?嚙賢?嚙踝蕭??嚙賜?嚙賢儐?嚙踝蕭?靘陷
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    console.log(`?嚙踝蕭 [FIXED] 閮蕭??嚙踝蕭?憪蕭?`, {
      currentUnitKey,
      isCompleted,
      forceTimerForTesting,
      shouldStart: !isCompleted || forceTimerForTesting
    });
    
    // ?嚙踝蕭 ?嚙踝蕭?靽桀儔嚗?嚙踝蕭?撌莎蕭??嚙踝蕭?銝皜祈岫璅∴蕭??嚙踝蕭?蝡?嚙賣迫閮蕭???    if (isCompleted && !forceTimerForTesting) {
      console.log(`?嚙踝蕭? [FIXED] ?嚙踝蕭?撌莎蕭??嚙踝蕭?蝡?嚙賣迫閮蕭??嚙窯);
      setIsTimerActive(false);
      setLearningSeconds(0);
      return; // ?嚙賣餈蕭?嚗蕭??嚙踝蕭??嚙踝蕭?閮蕭???    }
    
    // 瘙綽蕭??嚙賢?嚙踝蕭?閮蕭???- ?嚙踝蕭??嚙賣摰蕭??嚙賣葫閰行芋撘蕭??嚙踝蕭???    const shouldStart = !isCompleted || forceTimerForTesting;
    
    if (shouldStart) {
      console.log(`??[FIXED] ?嚙踝蕭?閮蕭??嚙窯);
      
      // ?嚙賜蔭?嚙??      setIsTimerActive(true);
      setLearningSeconds(0);
      setRealTimeDisplay('00:00:00');
      setTimerStartTime(Date.now());
      
      // ?嚙踝蕭?閮蕭???      interval = setInterval(() => {
        setLearningSeconds(prev => {
          const newSeconds = prev + 1;
          console.log(`??[FIXED] 閮蕭??嚙賣?? ${newSeconds}蝘);
          
          // ?嚙踝蕭??嚙賡＊蝷箇 MM:SS ?嚙踝蕭?
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const seconds = newSeconds % 60;
          
          // ?嚙踝蕭??嚙賜 00:00:00 ?嚙踝蕭?
          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
          const display = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          
          // ?嚙踝蕭??嚙賣憿舐內
          setRealTimeDisplay(display);
          
          return newSeconds;
        });
      }, 1000);
      
      console.log(`?嚙踝蕭 [FIXED] 閮蕭??嚙賢撱綽蕭??嚙窯);
    } else {
      console.log(`?嚙踝蕭? [FIXED] 閮蕭??嚙踝蕭??嚙踝蕭? - ?嚙踝蕭?撌莎蕭??嚙窯);
      setIsTimerActive(false);
    }
    
    // 皜蕭??嚙賣
    return () => {
      if (interval) {
        console.log(`?嚙踝蕭 [FIXED] 皜蕭?閮蕭??嚙窯);
        clearInterval(interval);
      }
    };
  }, [currentUnitKey, isCompleted, forceTimerForTesting]); // ?嚙踝蕭 ?嚙踝蕭?靽桀儔嚗溶??isCompleted 雿靘陷

  return (
    <div className="min-h-screen chatgpt-unit-page" style={{ backgroundColor: '#121212' }}>
      {/* Skip Links for Keyboard Navigation */}
      <a href="#main-content" className="skip-link">
        頝唾銝鳴蕭??嚙賢捆
      </a>
      <a href="#sidebar-content" className="skip-link">
        頝唾摮賂蕭?頛?嚙?      </a>
      
      <Navigation />
      
      <div className="container mx-auto px-6 py-0 main-content-wrapper" role="main" aria-label="摮賂蕭??嚙賡銝鳴蕭??嚙賢捆">
        {/* ?嚙踝蕭 ?嚙踝蕭?撘?嚙瘡eader - 蝘鳴蕭?蝡荔蕭??嚙質身嚙?*/}
        <motion.header 
          className="header-ai-smart mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="banner"
          aria-label="隤莎蕭?撠?嚙賡脣漲鞈蕭?"
        >
          {/* 獢?嚙瘡eader */}
          <div className="hidden lg:flex items-center justify-between py-4 px-6">
            
            {/* 撌血嚗蕭??嚙踝蕭???*/}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary hover-lift click-scale focus-visible-enhanced"
                aria-label="餈蕭?ChatGPT摰?嚙賢飛隤莎蕭?擐蕭?"
              >
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">餈蕭?隤莎蕭?</span>
              </button>
              
              <button 
                onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                className="btn-ai-primary hover-lift click-scale focus-visible-enhanced"
                aria-label="餈蕭?摮賂蕭?璁汗?嚙賡"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">摮賂蕭?璁汗</span>
              </button>
              
              <div className="text-gray-400 text-sm" aria-label="隤莎蕭?雿蔭鞈蕭?">
                <span className="text-gray-300 font-medium">ChatGPT 摰?嚙賢飛</span>
                <span className="mx-2" aria-hidden="true">繚</span>
                <span>銝鳴蕭? {themeId}</span>
            </div>
          </div>
          
            {/* 銝剖亢嚗脣漲靽⊥ + 閮蕭???*/}
            <div className="flex items-center space-x-6" role="region" aria-label="摮賂蕭??嚙賢漲?嚙踝蕭??嚙賢">
              
              {/* 摮賂蕭??嚙賢漲 */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400" aria-label={`?嚙踝蕭??嚙踝蕭?嚗洵${unitId}?嚙踝蕭?嚗31?嚙賢?嚙窯}>?嚙踝蕭? {unitId}/31</div>
                  <div className="text-lg font-bold text-white" aria-label={`蝮賢飛蝧脣漲嚙?{stats.totalProgress}%`}>{stats.totalProgress}%</div>
          </div>
                <div className="w-24 progress-ai-sm performance-optimized" role="progressbar" aria-valuenow={stats.totalProgress} aria-valuemin={0} aria-valuemax={100} aria-label="隤莎蕭??嚙踝蕭??嚙賢漲">
                  <motion.div 
                    className={`progress-ai-fill gpu-accelerated ${progressConfig.progressColorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.totalProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
              </div>

              {/* 閮蕭???- 璆萇陛??*/}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-ai-md transition-all duration-200 performance-optimized ${progressConfig.timerStatusClass}`} role="timer" aria-label={`?嚙賣活摮賂蕭??嚙踝蕭?嚙?{realTimeDisplay}嚙?{isTimerActive && !isCompleted ? '閮蕭??嚙踝蕭?嚙? : isCompleted ? '摮賂蕭?撌莎蕭??? : '閮蕭??嚙賣?嚙踝蕭?'}`}>
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="font-mono text-sm font-medium">{realTimeDisplay}</span>
                {isTimerActive && !isCompleted && (
                  <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse gpu-accelerated" aria-hidden="true"></div>
                )}
              </div>
            </div>

            {/* ?嚙賢嚗蜓閬蕭?雿蕭???*/}
            <div className="flex items-center space-x-3" role="group" aria-label="摮賂蕭??嚙踝蕭??嚙踝蕭?">
              {(() => {
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`璅蕭??嚙踝蕭?${unitId}?嚙賢歇摰蕭?`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                      摰蕭?摮賂蕭?
                    </Button>
                  );
                }
                
                if (navigationConfig.isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 performance-optimized"
                      aria-label={`?嚙賢銝鳴蕭?${themeId}?嚙賣葫撽}
                    >
                      ?嚙踝蕭?皜穿蕭?
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                } else {
                  return (
                    <Button 
                      onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                      className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`?嚙踝蕭?銝蕭?隤莎蕭??嚙踝蕭?${navigationConfig.nextUnitId}`}
                    >
                      銝蕭?嚙?                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                }
              })()}
              
              {/* 銝蕭?隤莎蕭???- ?嚙賢?嚙質?嚙?憿舐內 */}
              {navigationConfig.hasPrevUnit && (
                      <button
                  onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-md duration-200 hover-lift click-scale focus-visible-enhanced performance-optimized"
                  aria-label={`餈蕭?銝蕭?隤莎蕭??嚙踝蕭?${navigationConfig.prevUnitId}`}
                  title="銝蕭?嚙?
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                          )}
                        </div>
          </div>

          {/* 蝘鳴蕭?蝡浹eader - ?嚙踝蕭?雿蕭? */}
          <div className="lg:hidden header-ai-mobile">
            {/* 蝚穿蕭?銵蕭?餈蕭? + 隤莎蕭?靽⊥ */}
            <div className="header-row">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleNavigateBack}
                  className="btn-ai-secondary btn-mobile-compact hover-lift click-scale focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">餈蕭?</span>
                      </button>

                <button 
                  onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                  className="btn-ai-primary btn-mobile-compact hover-lift click-scale focus-ring"
                  aria-label="餈蕭?摮賂蕭?璁汗?嚙賡"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">璁汗</span>
                </button>
                              </div>
              
              <div className="text-center flex-1 mx-4">
                <div className="text-white font-medium text-sm">?嚙踝蕭? {unitId}</div>
                <div className="text-gray-400 text-xs">銝鳴蕭? {themeId}</div>
              </div>
              
              {/* 銝蕭?嚙?銝蕭?隤莎蕭???*/}
              <div className="flex items-center space-x-2">
                {currentUnit.id > 1 && (
                  <button 
                    onClick={() => handleNavigatePrev(currentUnit.id - 1)}
                    className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-sm duration-200 focus-ring"
                    title="銝?
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 蝚穿蕭?銵蕭??嚙賢漲 + 閮蕭???*/}
            <div className="header-progress">
              {/* ?嚙賢漲嚙?*/}
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

              {/* 閮蕭???*/}
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

            {/* 蝚穿蕭?銵蕭?銝鳴蕭??嚙踝蕭??嚙踝蕭? */}
            <div className="w-full">
              {(() => {
                const unitNum = parseInt(unitId);
                const isLastUnitOfTheme = (
                  unitNum === 5 ||   // 銝鳴蕭?1蝯蕭?
                  unitNum === 10 ||  // 銝鳴蕭?2蝯蕭?  
                  unitNum === 16 ||  // 銝鳴蕭?3蝯蕭?
                  unitNum === 21 ||  // 銝鳴蕭?4蝯蕭?
                  unitNum === 26 ||  // 銝鳴蕭?5蝯蕭?
                  unitNum === 31     // 銝鳴蕭?6蝯蕭?嚗玨蝔蕭??嚙踝蕭?
                );
                
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success btn-mobile-full hover-lift click-scale focus-ring py-3"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      摰蕭?摮賂蕭?
                    </Button>
                  );
                }
                
                if (isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary btn-mobile-full hover-lift click-scale focus-ring py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                    >
                      ?嚙踝蕭?皜穿蕭?
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
                      銝蕭?嚙?                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  );
                }
              })()}
            </div>
          </div>
        </motion.header>

        {/* ?嚙踝蕭 蝪∴蕭??嚙賢?嚙踝蕭?憿蕭???*/}
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
                  {currentUnit.type === 'video' ? '敶梧蕭?隤莎蕭?' : 
                   currentUnit.type === 'text' ? '?嚙賣隤莎蕭?' : '?嚙踝蕭??嚙踝蕭?'}
                </Badge>
                {isCompleted && (
                  <span className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">撌莎蕭???/span>
                  </span>
                )}
                      </div>
                    </div>
          </div>

          {/* 摮賂蕭??嚙?嚙踝蕭?嚙?- 蝪∴蕭???*/}
          {isTimerActive && !isCompleted && (
            <motion.div 
              className="mt-4 card-ai-base border-learning-300/50 p-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse"></div>
                <span className="text-learning-300 text-sm">嚙?嚙踝蕭摮賂蕭?銝哨蕭?閮蕭??嚙賢歇?嚙踝蕭?</span>
              </div>
            </motion.div>
                  )}
                </motion.div>

        {/* ?嚙踝蕭 ?嚙踝蕭?撘飛蝧蕭?撅 - 蝘鳴蕭??嚙踝蕭?閮哨蕭? */}
        <div className="layout-learning-main desktop">
          
          {/* 銝鳴蕭?摮賂蕭??嚙??- ?嚙踝蕭?嚙?*/}
          <div className="layout-main-content content-optimized" id="main-content" role="main" aria-label="隤莎蕭?銝鳴蕭??嚙賢捆">
            
            {/* ?嚙踝蕭 隤輯岫?嚙賢?嚙賣 - ?嚙賢?嚙賜璅∴蕭?憿舐內 */}
            {isDevelopment && showDebugPanel && (
                <motion.div 
                className="bg-yellow-900/90 border border-yellow-600 rounded-lg p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-yellow-200 text-sm space-y-2">
                  <div className="font-bold text-yellow-100 mb-2">?嚙踝蕭 閮蕭??嚙質矽閰阡??/div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>?嚙踝蕭?: {currentUnitKey}</div>
                    <div>撌莎蕭??? {isCompleted ? '?? : '??}</div>
                    <div>閮蕭??嚙賣暑嚙? {isTimerActive ? '?嚙踝蕭' : '??}</div>
                    <div>摮賂蕭?蝘: {learningSeconds}</div>
                    <div>憿舐內?嚙踝蕭?: {realTimeDisplay}</div>
                    <div>撘瑕皜祈岫: {forceTimerForTesting ? '?? : '??}</div>
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
                      {forceTimerForTesting ? '?嚙踝蕭?皜祈岫璅∴蕭?' : '?嚙賜皜祈岫璅∴蕭?'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setLearningSeconds(0);
                        setRealTimeDisplay('00:00:00');
                        console.log('?? [DEBUG] ?嚙踝蕭??嚙賜蔭閮蕭???);
                      }}
                      className="px-3 py-1 rounded text-xs font-medium bg-gray-700 text-white"
                    >
                      ?嚙賜蔭閮蕭???                    </button>
                    </div>
                  
                  <div className="text-xs text-yellow-300 mt-2">
                    ?嚙踝蕭 ?嚙踝蕭? Console (F12) ?嚙踝蕭?閰喟敦?嚙踝蕭?
                  </div>
                </div>
              </motion.div>
            )}

            {/* 銝鳴蕭?隤莎蕭??嚙賢捆 - ?嚙踝蕭?撘??*/}
            <motion.div 
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* 隤莎蕭??嚙質膩 */}
              <div className="text-responsive-body text-gray-300 leading-relaxed">
                {currentUnit.description}
              </div>

              {/* 銝鳴蕭??嚙賢捆?嚙踝蕭? - ?嚙踝蕭?撘蕭?嚙?*/}
              <div className="prose prose-invert prose-lg lg:prose-xl max-w-none">
                <div className="text-white/95 leading-loose space-y-6 lg:space-y-8">
                  {currentUnit.content.transcript.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-responsive-body leading-loose tracking-wide">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* ?嚙踝蕭??嚙賜獢蕭?撅內 - ?嚙踝蕭?撘??*/}
              <div className="mt-8 lg:mt-12 p-6 lg:p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl lg:rounded-2xl border border-gray-600/30">
                                  <h3 className="text-xl lg:text-2xl font-bold text-gray-200 mb-4 lg:mb-6 flex items-center">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                  {(() => {
                    switch(currentUnit.id) {
                      case 1:
                        return '?嚙踝蕭嚙?摮賂蕭??嚙踝蕭?';
                      case 2:
                        return '?? ?嚙質圾 LLM';
                      case 3:
                        return '?? GPT 瞍脣';
                      case 4:
                        return '?嚙踝蕭 蝎橘蕭??嚙踝蕭?';
                      case 5:
                        return '?嚙踝蕭嚙?摰閮鳴蕭?';
                      case 6:
                        return '?? 隞敹怨汗';
                      case 7:
                        return '?? 撠店?嚙踝蕭?嚙?;
                      case 8:
                        return '?嚙踝蕭? ?嚙賭犖?嚙踝蕭?嚙?;
                      case 9:
                        return '?嚙踝蕭 ?嚙踝蕭?撖行';
                      case 10:
                        return '?嚙踝蕭 ?嚙賜揣 GPT ?嚙踝蕭?';
                      case 11:
                        return '??嚙??嚙賭誘?嚙賢??;
                      case 12:
                        return '?嚙踝蕭 閫?嚙踝蕭?嚙?;
                      case 13:
                        return '??蝭蕭?撘蕭?嚙?;
                      case 14:
                        return '?? ?嚙賜雁?嚙踝蕭?嚙?;
                      case 15:
                        return '?嚙踝蕭 餈踝蕭??嚙踝蕭?';
                      case 16:
                        return '?? ?嚙賭誘蝭嚙?;
                      case 17:
                        return '?嚙踝蕭? ?嚙賢捆?嚙踝蕭?撘蕭?';
                      case 18:
                        return '?? 摮賂蕭??嚙賜弦?嚙賡';
                      case 19:
                        return '?嚙踝蕭 ?嚙踝蕭??嚙踝蕭??嚙賢丰嚙?;
                      case 20:
                        return '?嚙踝蕭 蝔蕭?閮哨蕭?頞蕭??嚙踝蕭?';
                      case 21:
                        return '?? 隤蕭?蝧餉陌?嚙賣膜憌曉之嚙?;
                      case 22:
                        return '?? ?嚙踝蕭??嚙踝蕭?憭批葦';
                      case 23:
                        return '?? 撖佗蕭?蝬脩窗?嚙質汗';
                      case 24:
                        return '?嚙踝蕭 DALL-E 3 ?嚙踝蕭??嚙踝蕭?';
                      case 25:
                        return '?? ?嚙賢遣雿蕭? Custom GPT';
                      case 26:
                        return '?? 霅 AI?嚙賢劂閬綽蕭?;
                      case 27:
                        return '?? ?嚙踝蕭?蝘?嚙踝蕭???;
                      case 28:
                        return '?嚙踝蕭? 隤蕭? AI ?嚙踝蕭?';
                      case 29:
                        return '??鞎痊隞餃雿輻 AI';
                      case 30:
                        return '?嚙踝蕭 撅蕭?鈭箏極?嚙質?嚙賣嚙?;
                      case 7:
                        return '撠店蝞∴蕭??嚙賭蔔撖佗蕭?;
                      case 8:
                        return '?嚙賣?嚙踝蕭?瘙綽蕭??嚙踝蕭?';
                      case 9:
                        return '隞?嚙踝蕭??嚙賢概蝮踝蕭?;
                      case 10:
                        return '頝典像?嚙賭蝙?嚙賢遣嚙?;
                      case 22:
                        return '?嚙踝蕭??嚙賭誘撖佗蕭??嚙賜?嚙賣';
                      case 27:
                        return 'ChatGPT ?嚙踝蕭??嚙踝蕭??嚙踝蕭?撖佗蕭??嚙賜';
                      default:
                        return '撖佗蕭??嚙賜獢蕭?';
                    }
                  })()}
                </h3>
                {(() => {
                  switch(currentUnit.id) {
                    case 1:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?蝭靽?嚙質玨蝔蕭??嚙賜垢嚗蕭??嚙踝蕭?隞晶鈭箏極?嚙質?嚙賢?嚙踝蕭?敹蛛蕭?嚙???嚙賢玨蝔蕭?嚙??雿蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?隞踝蕭??嚙踝蕭?摮賂蕭?頝荔蕭??嚙踝蕭?鈭圾?嚙賢之?嚙踝蕭??嚙踝蕭?瑽蕭??嚙踝蕭?暺見頝蕭?隤莎蕭??嚙賣郊隡蕭??嚙賡?嚙踝蕭?銝甇交郊?嚙賜 AI ?嚙賜擃蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">皜鈭圾隤莎蕭??嚙賢之?嚙踝蕭??嚙踝蕭?瑽蕭??嚙踝蕭???嚙?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">蝣綽蕭?雿飛摰蕭?敺隞伐蕭??嚙踝蕭??嚙踝蕭??嚙?嚙踝蕭?靘蕭?嚗蝡神?嚙踝蕭??嚙踝蕭?隞歹蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣?嚙?嚙踝蕭??嚙賢飛蝧瘜蕭?暺見頝蕭?隤莎蕭??嚙賢祕?嚙踝蕭??嚙踝蕭?朣蕭?嚗蕭??嚙踝蕭?憟踝蕭??嚙踝蕭???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 2:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              蝛塚蕭?憭改蕭?隤蕭?璅∴蕭? (Large Language Model) 靽嚗銝蝭?嚙賜?嚙?嚙賣暑?嚙賬蕭?蝪∪?嚙踝蕭??嚙踝蕭?靘蕭?撠耦瘥?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡尹?嚙賢祕蝧蕭?嚗蕭?敺對蕭??嚙質圾 LLM ?嚙賣敹蕭?雿蕭??嚙踝蕭?隞歹蕭??嚙踝蕭?閬綽蕭? AI 靽蕭??嚙踝蕭?銝?嚙踝蕭?暺蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質撌梧蕭?隤芾店嚙???嚙賢嚙?LLM ?嚙踝蕭? GPT??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾?嚙踝蕭?蝺湔??(Training Data)?嚙踝蕭?嚙?嚙踝蕭??AI ?嚙踝蕭?蝑蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜暺圾 AI ?嚙踝蕭??嚙賬蕭??嚙踝蕭??嚙踝蕭?撱綽蕭?嚙?AI ?嚙踝蕭??嚙賣迤蝣綽蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 3:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ??GPT-3.5 ??GPT-4嚗蕭??嚙踝蕭??嚙踝蕭? GPT-4o嚗蕭?銝甈∴蕭?蝝撣塚蕭??嚙賢?嚙踝蕭??嚙踝蕭??嚙賢銝蝭?嚙賢葆雿翰?嚙踝蕭?嚙?GPT ?嚙賜撅風?嚙踝蕭??嚙踝蕭?瘥蕭??嚙踝蕭??嚙賣?嚙賣?嚙質?嚙賬漲?嚙踝蕭??嚙踝蕭?璅∴蕭?嚗蕭??嚙踝蕭??嚙踝蕭?雓蕭??嚙賡?嚙踝蕭??嚙賢榆?嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">雓蕭???GPT-3.5 ??GPT-4/4o 銋蕭??嚙賭蜓閬?嚙賢榆頝蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾?嚙踝蕭?璅∴蕭??嚙踝蕭?撖佗蕭??嚙賜撣塚蕭??嚙賢末?嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭??嚙踝蕭??嚙踝蕭??嚙賭遙?嚙踝蕭??嚙賣?嚙質府?嚙踝蕭??嚙賣芋?嚙踝蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 4:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙質祥?嚙賢歇蝬末憟賜嚗蕭?暺圾隞莎蕭?靽暸?嚙踝蕭? Plus ?嚙踝蕭??嚙踝蕭?蝭?嚙賭蒂?嚙踝蕭?頛蕭?鞎鳴蕭???Plus ?嚙踝蕭??嚙?嚙踝蕭??嚙踝蕭??嚙賣?嚙賢漲?嚙賣芋?嚙賭蝙?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙瘩ALL-E 3嚗蕭?蝑蕭??嚙踝蕭?靘嗾?嚙賢?嚙踝蕭??嚙賣?嚙賣嚗鼠雿蕭??嚙賜移嚙??嚙賡?嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣?嚙質祥?嚙踝蕭? Plus ?嚙踝蕭?摰?嚙質?嚙賢?嚙質”??/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭??嚙賢楛?嚙賭蝙?嚙踝蕭?瘙蕭??嚙賣?嚙賢楛?嚙?嚙踝蕭?閬蕭?蝝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">鈭圾 Plus ?嚙賜?嚙踝蕭?擃蕭??嚙質?嚙賭誑暺見撟怠雿蕭?撌伐蕭??嚙賢飛蝧蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 5:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              撌交炬?嚙賢鈭蕭?敹蕭??嚙賢?嚙賬銝蝭?嚙踝蕭?靘蕭?閰喟敦?嚙賣郊撽蕭??嚙踝蕭??嚙賢葆雿?嚙踝蕭?憪酉?嚙踝蕭???OpenAI 撣單?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賜?嚙賢撥隤踹董?嚙踝蕭??嚙踝蕭??嚙踝蕭?暺見閮哨蕭?銝?嚙踝蕭?撘瑕漲撖Ⅳ嚗蕭??嚙踝蕭??嚙賬甇伐蕭?嚙?(2FA)?嚙踝蕭??嚙踝蕭?靽蕭?雿蕭??嚙賭犖鞈蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?閮鳴蕭?銝衣?嚙質撌梧蕭? ChatGPT 撣單??/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見閮哨蕭??嚙踝蕭??嚙賢甇伐蕭?霅蕭??嚙踝蕭?撣單摰?嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">鈭圾?嚙賣?嚙踝蕭??嚙質身摰蕭??嚙踝蕭?暺見蝞∴蕭?雿蕭?撠店甇瑕蝝?嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 6:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?蝭?嚙賢葆雿莎蕭?銝?嚙踝蕭??嚙踝蕭? ChatGPT 隞撠汗嚗撌佗蕭??嚙賣風?嚙踝蕭??嚙賡?嚙踝蕭??嚙賭葉?嚙踝蕭?銝鳴蕭?閰梧蕭?蝒蕭??嚙賢?嚙踝蕭?閫蕭??嚙賣閮哨蕭?嚗蕭?銝?嚙踝蕭??嚙賬蕭?銝?嚙賡?嚙踝蕭??嚙質?嚙踝蕭?閰喟敦嚙??嚗Ⅱ靽蕭?撠蕭?雿憓憒蕭??嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">敹恍?嚙賭蒂雿輻撠店甇瑕蝝?嚙賬憓蕭?閰梧蕭??嚙踝蕭??嚙質??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾?嚙踝蕭?閮哨蕭??嚙踝蕭?嚗蕭?憒蜓憿蕭??嚙賬蕭?閮嚗蕭?雿??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭??嚙賢蕭??嚙踝蕭?撅嚗銋蕭??嚙踝蕭??嚙踝蕭?雿蕭?憟賢蝷蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 7:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?雿輻甈⊥憓蕭?嚗蕭?閰梧蕭?銵剁蕭?霈蕭?憟賣毽鈭銝蝭?嚙踝蕭?雿蕭?憟祕?嚙踝蕭?撠店蝞∴蕭??嚙賢概嚙??嚙賣暺見?嚙踝蕭?閬蕭?撠店?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賬蕭?嚙???嚙賜?嚙踝蕭?閰梧蕭?鈭思蕪?嚙踝蕭??嚙踝蕭?鈭蕭??嚙踝蕭?暺見?嚙賡?嚙賜?嚙踝蕭?閰梧蕭?靽蕭?撌伐蕭??嚙賭嗾瘛其?嚙???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣?嚙踝蕭?撠店?嚙踝蕭?雿喳祕頦蕭??嚙賭噶?嚙踝蕭??嚙踝蕭???/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見?嚙踝蕭??嚙賭澈???嚗蕭??嚙踝蕭?鈭綽蕭?雿蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">擗蕭?摰蕭?皜蕭?撠店?嚙質”?嚙賢末蝧嚗蕭??嚙賭蝙?嚙踝蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 8:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙賢蕭?銝?嚙踝蕭?撘瑕之雿末憭犖?嚙賢蕭?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣楛?嚙踝蕭?嚙?Custom Instructions 暺見?嚙踝蕭?嚗蕭?雿蕭?嚙?嚙踝蕭?嚙賢撓?嚙踝蕭??嚙賡嚗蕭??嚙質身摰蕭??嚙賬蕭?靽蕭??嚙賬蕭??嚙賬蕭?撣蕭? AI 暺見?嚙踝蕭??嚙踝蕭?瘞賂蕭??嚙賭誘?嚙質身摰蕭?甈∴蕭?隞伐蕭?瘥活撠店 AI ?嚙踝蕭??嚙踝蕭?撣塚蕭??嚙賢蕭??嚙賬蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾 Custom Instructions ?嚙賢?嚙質身摰蕭?雿蕭??嚙賢?嚙踝蕭??嚙踝蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見撖怠?嚙踝蕭??嚙賢犖?嚙踝蕭?隞歹蕭?靘蕭?閮哨蕭?雿蕭??嚙賣平?嚙賢神雿◢?嚙踝蕭?憟踝蕭???/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?撖佗蕭??嚙踝蕭?閮哨蕭??嚙踝蕭?嚗I ?嚙踝蕭?鞈迎蕭??嚙賢楊憭改蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 9:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ChatGPT ?嚙賢?嚙賭誑?嚙賡?嚙賜?嚙賢銝蝭?嚙踝蕭?銝哨蕭?蝝對蕭?嚙?App ?嚙賜?嚙踝蕭??嚙踝蕭??嚙賢靽蕭??嚙賭噶?嚙賬蕭??嚙踝蕭?閰晞蕭??嚙踝蕭??嚙踝蕭??嚙賭誑敶梁?嚙踝蕭??嚙踝蕭??嚙賬蕭??嚙質儘霅蕭??嚙賬蕭??嚙踝蕭??嚙踝蕭?撟曉蕭?瘣鳴蕭??嚙踝蕭?摮蕭?撅內暺見?嚙踝蕭?銝?嚙踝蕭??嚙賢嚙?嚙踝蕭?嚙踝蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見?嚙踝蕭?璈莎蕭?瘚?嚙踝蕭??嚙踝蕭?閰梧蕭?撠勗末隡潘蕭??嚙賭犖?嚙踝蕭?銝嚙?嚙?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見敶梧蕭?撘萇嚗敺 AI 撟恬蕭??嚙踝蕭??嚙賢?嚙踝蕭??嚙賢捆??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭??嚙踝蕭??嚙賢?嚙踝蕭?雿輻 AI ?嚙賢?嚙賣瘜蕭?靘蕭?蝧餉陌擗蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 10:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              GPT Store 撠勗末隡潘蕭??嚙踝蕭?璈蕭? App Store嚗?嚙踝蕭??嚙踝蕭?銝?嚙賢隞犖?嚙踝蕭??嚙踝蕭?撠摰遙?嚙踝蕭?摰Ｚˊ??GPTs?嚙賢銝蝭?嚙踝蕭?雿蕭?嚙???嚙踝蕭??嚙踝蕭??嚙賜祟?嚙踝蕭?閰摯?嚙賢 GPTs嚗?嚙踝蕭?嚙??鞈迎蕭??嚙賢鼠?嚙踝蕭??嚙踝蕭?撌亙??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭? GPT Store ?嚙賢?嚙賜汗?嚙踝蕭?撠蕭?撌改蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見?嚙踝蕭?閰蕭??嚙賭蝙?嚙賭犖?嚙踝蕭??嚙踝蕭??嚙賢?嚙踝蕭???GPT ?嚙賢末憯蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?撟曉蕭?雿蕭??嚙踝蕭? GPTs嚗遣蝡蕭??嚙賢犖?嚙賢極?嚙賜拳??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 11:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              銝璇末?嚙踝蕭?隞歹蕭?撠勗末隡潘蕭?隞踝蕭??嚙踝蕭?撌伐蕭?蝪∪?嚙賢銝蝭?嚙踝蕭?蝝寡◤?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賬RPF ?嚙賭誘獢?嚙踝蕭?C (Context/?嚙賜窗)?嚙磋 (Role/閫)?嚙瞑 (Process/?嚙踝蕭?)?嚙瘤 (Format/?嚙踝蕭?)?嚙踝蕭??嚙踝蕭?閰喟敦?嚙質圾瘥蕭?蝝蕭?雿嚗蕭?雿蕭?嚙??蝜蕭??嚙踝蕭?憿蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">敺對蕭??嚙質圾?嚙賭誘?嚙賢之?嚙賜?嚙踝蕭?蝢抬蕭??嚙踝蕭??嚙踝蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣蕭?嚙??靘雲憭蕭??嚙賣嚗蕭?蝯∴蕭???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見撠蕭??嚙賣芋蝟蕭??嚙踝蕭?嚗撖恬蕭?銝?嚙踝蕭??嚙踝蕭?憭批?嚙踝蕭?皜?嚙賭誘??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 12:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙賢蕭??嚙賜陛?桐?嚙??嚙踝蕭??嚙踝蕭?撌改蕭?銝?嚙賜雿嚙?AI?嚙賣瞍蕭??嚙踝蕭?瘛梧蕭?撣?嚙踝蕭?撣怒蕭?嚗耦撠梧蕭??嚙踝蕭?隤輻?嚙踝蕭??嚙踝蕭?嚗誘?嚙踝蕭??嚙踝蕭?璆准蕭??嚙踝蕭?撅內憭蕭??嚙踝蕭?閫閮哨蕭?蝭蕭?嚗蒂嚙???嚙踝蕭??嚙踝蕭??嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾暺圾鞈佗蕭??嚙踝蕭??嚙賬隞亙之撟蕭???AI ?嚙踝蕭??嚙質釭蝝蕭?皞Ⅱ摨佗蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?雿輻?嚙踝蕭?靽蕭???..?嚙賬瞍蕭???..?嚙踝蕭??嚙賡?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見閮哨蕭??嚙踝蕭??嚙踝蕭?摰塚蕭??嚙踝蕭?靘蕭??嚙踝蕭?瘛梧蕭?獢蕭??嚙賣?嚙踝蕭??嚙賢葦?嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 13:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?嚗蕭?雓蕭?瘙蕭??嚙踝蕭??嚙賬銝蝭?嚙踝蕭?雿ew-Shot Prompting?嚙踝蕭?撌改蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?隞文?嚙踝蕭??嚙賭蕪銝?嚙賢蕭??嚙踝蕭??嚙踝蕭?獢蕭?靘I ?嚙賢末?嚙踝蕭??嚙賬飛?嚙踝蕭??嚙踝蕭?靘蕭??嚙踝蕭??嚙踝蕭?嚙??憸冽?嚙賣撘?嚙踝蕭??嚙踝蕭??嚙賢捆??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜?嚙稿ero-shot?嚙踝蕭??嚙踝蕭?靘蕭??嚙賬ew-shot?嚙踝蕭??嚙踝蕭?靘蕭??嚙賭誘?嚙踝蕭??嚙踝蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見?嚙踝蕭?隞支葉撱綽蕭?皜?嚙質撓?嚙質撓?嚙踝蕭?靘蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見?嚙賢?嚙踝蕭?撌改蕭?蝯梧蕭?頛詨?嚙踝蕭?嚗蕭?憒神閰押神?嚙踝蕭??嚙踝蕭?蝑蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 14:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢末?嚙賣?嚙踝蕭?獢銝蝭?嚙踝蕭?雿hain of Thought?嚙踝蕭?撌改蕭??嚙踝蕭??嚙賭誘 AI?嚙踝蕭?甇伐蕭?甇伐蕭?靽橘蕭??嚙賬蕭?嚙???嚙賣迫?嚙賭誑?嚙踝蕭?蝑蕭??嚙踝蕭?蝣箸改蕭?隞脣隞乩蕪雿蕭???AI ?嚙賣蕭?蝔蕭??嚙賭噶雿炎?嚙踝蕭?靽格迤??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾暺圾撘蕭? AI ?嚙賣郊?嚙質隞伐蕭??嚙踝蕭??嚙踝蕭?憿蕭?嚙?嚙踝蕭?嚙踝蕭???/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭??嚙踝蕭?隞支葉?嚙賢?嚙踝蕭??嚙賣郊?嚙質et's think step by step?嚙踝蕭??嚙賡?嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜?嚙賢蕭?撌批嚙?嚙踝蕭?嚙賢飛憿蕭?頛舀?嚙踝蕭??嚙踝蕭??嚙賣暑?嚙踝蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 15:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙賢蝚穿蕭??嚙踝蕭?獢蕭?敺蕭?撠店?嚙質?嚙賣迤?嚙踝蕭??嚙踝蕭???AI 擃蕭??嚙?嚙踝蕭?撠梧蕭?餈踝蕭??嚙賢銝蝭?嚙踝蕭?雿嗾蝔殷蕭??嚙踝蕭?餈踝蕭?蝑嚗蕭?憒?嚙賢隞亥底蝝啣嚗蕭??嚙賢隞蕭?摨佗蕭??嚙賬銝?嚙賣蝪∪?嚙踝蕭??嚙質圾?嚙踝蕭??嚙踝蕭?撠蕭???60 ?嚙踝蕭?蝑蕭??嚙賜ㄗ??95 ?嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">撱綽蕭??嚙踝蕭?閰梧蕭?銝?嚙踝蕭?蝔蕭?敹蕭?嚗蕭?憟賣遛頞單蝚穿蕭??嚙踝蕭?獢蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣?嚙踝蕭?銝車?嚙踝蕭??嚙質蕭?嚙踝蕭?撌改蕭?靘蕭?嚗蕭?瘙楛?嚙賬蕭?瘙陛?嚙賬蕭?瘙蕭?霈蕭?摨佗蕭???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見?嚙賜旨鞎?嚙賢 AI 蝑蕭?銝哨蕭?銝雲嚗蒂撘蕭?雿Ｖ耨嚙?嚙?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 16:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              摮賂蕭??嚙踝蕭?嚗蕭??嚙踝蕭??嚙踝蕭?銝?嚙踝蕭?撖衣?嚙踝蕭?皞蕭?銝?嚙踝蕭??嚙踝蕭???20 ?嚙賜移敹身閮蕭??嚙賭誘蝭摨怒?嚙踝蕭??嚙賣項?嚙踝蕭?撌伐蕭??嚙賢飛蝧蕭?瘣鳴蕭??嚙賜車撣賂蕭??嚙賣嚗蕭??嚙賭誑?嚙賣銴ˊ?嚙賭耨?嚙賭蝙?嚙踝蕭??嚙賢擃蕭??嚙踝蕭??嚙踝蕭?隞文葆?嚙踝蕭?憡蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?銝?嚙賢隞亙?嚙賜?嚙踝蕭?鞈迎蕭??嚙賭誘蝭摨恬蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見撠蕭??嚙賭葉?嚙踝蕭??嚙踝蕭??嚙質撌梧蕭??嚙賣?嚙?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜雿?嚙賣憭惇?嚙踝蕭??嚙賢楛?嚙賢犖?嚙踝蕭?隞歹蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 17:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?蝭靽蕭?撖行隤莎蕭??嚙踝蕭??嚙賜?嚙踝蕭?憪蕭?撣塚蕭??嚙賜?嚙賜洵銝?嚙賢飛?嚙踝蕭??嚙賭誘?嚙賢概嚙?摰蕭?銝蕭??嚙踝蕭??嚙賢神雿遙?嚙踝蕭??嚙踝蕭??嚙賜?嚙賢神銝蝭撘犖??Instagram 鞎潘蕭??嚙賣撖恬蕭?撠蕭?璆哨蕭?撌伐蕭??嚙賢 Email?嚙賭誑?嚙賜銝?嚙賜雯銝誨?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賡◢?嚙踝蕭?璅蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣?嚙賜冗鈭歹蕭?擃雿摰對蕭??嚙賭誘嚗蕭??嚙踝蕭???emoji ??Call-to-Action??/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見閬蕭? AI ?嚙賜?嚙踝蕭?隤除嚗蕭?憒蕭?撠平?嚙踝蕭?擛蕭?隤迎蕭??嚙踝蕭??嚙賢神?嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">撖佗蕭?暺見??AI ?嚙踝蕭??嚙踝蕭?蝔選蕭??嚙賡莎蕭?甇乩耨?嚙踝蕭?隞文摰寞?嚙賭犖?嚙賢??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜 AI ?嚙踝蕭??嚙踝蕭??嚙賜嚗翰?嚙賜?嚙賢之?嚙踝蕭??嚙踝蕭?摨佗蕭?璅蕭??嚙踝蕭?摮蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 18:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?撠梧蕭??嚙賡?嚙賢銝蝭?嚙踝蕭?雿蕭?嚙?? ChatGPT 霈蕭?雿蕭?摮賂蕭??嚙踝蕭?蝛嗅?嚙賬蕭??嚙踝蕭?撖行暺見撠蕭?蝭蝭之隢蕭?蝬莎蕭??嚙踝蕭???PDF ?嚙踝蕭?嚗銝?嚙踝蕭??嚙賜蜇蝯蕭?撟曉蕭?暺蕭?銝佗蕭?嚙?AI ?嚙賜陛?嚙踝蕭?瘥嚗圾?嚙賜銝哨蕭?銴蕭?撠蕭??嚙踝蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見鞎潘蕭??嚙踝蕭?嚗蒂靽曉皜?嚙賭誘嚗蕭?憒蕭??嚙賜蜇蝯蕭? 5 暺蕭??嚙賭蜓閬蕭?暺蕭???/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣?嚙踝蕭??嚙賢概嚙?閬蕭? AI 嚙???嚙踝蕭??嚙賡雿蕭??嚙賜?嚙賭遙雿蕭?敹蛛蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見??AI ?嚙踝蕭?銝隞踝蕭??嚙踝蕭?撟恬蕭??嚙賢嗾璇蕭?憿蕭??嚙踝蕭?皜祈岫雿蕭??嚙踝蕭?靽蕭?嚙????/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜 AI 敹恍蕭?頛蝭蕭??嚙踝蕭?蝡蕭?閫暺蕭??嚙踝蕭??嚙賣郊?嚙踝蕭??嚙踝蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 19:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?隢?嚙賡憭改蕭??嚙賜 idea ?嚙踝蕭??嚙踝蕭?AI 撠梧蕭?雿蕭?憟踝蕭?憭乩撈?嚙賢銝蝭?嚙賢祕?嚙踝蕭??嚙踝蕭?嚗?嚙踝蕭?憪蕭???AI 銝朣蕭??嚙踝蕭??嚙賢?嚙踝蕭??嚙踝蕭?撱箄身?嚙踝蕭?Team-building Day嚗瑽暑?嚙賭蜓憿蕭??嚙賜楊?嚙質底蝝堆蕭??嚙踝蕭?銵剁蕭??嚙賢?嚙賣敺?嚙踝蕭?蝞蕭??嚙踝蕭??嚙踝蕭?蝷綽蕭?嚙?? AI 銝?嚙踝蕭?蝑蕭?摰蕭??嚙賢蕭??嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗蕭?嚙?AI ?嚙踝蕭?憭改蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?摮蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見??AI ?嚙踝蕭??嚙踝蕭?摮蝷蕭?嚗莎蕭?甇亥蕭?嚙踝蕭?瘛梧蕭??嚙賢銵蕭??嚙踝蕭???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜 AI ?嚙踝蕭?頛航?嚙踝蕭?撟恬蕭??嚙踝蕭?閮蕭?銝剖?嚙賢?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">敹恍絲?嚙賣暑?嚙踝蕭?嚙?嚙踝蕭蝔選蕭??嚙踝蕭?隢??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 20:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?雿蕭??嚙賢極蝔葦嚗銝蝭?嚙踝蕭?雿蕭??嚙賬蕭??嚙踝蕭?撖行銝?嚙踝蕭?(1) 鞎潘蕭?銝畾蛛蕭??嚙踝蕭???Code嚗 AI ?嚙賢誨?嚙質店?嚙踝蕭?嚙??靽橘蕭??嚙踝蕭?(2) 撠蕭??嚙踝蕭?撘隤歹蕭???(Error Message) 鞎潔蕪 AI嚗雿ｇ蕭??嚙踝蕭??嚙踝蕭?靽曉嚙?嚙踝蕭?嚙踝蕭?嚙?3) ??AI 撖恬蕭?畾萇陛?嚙踝蕭? Python ?嚙賣嚗?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?銴改蕭?隞鳴蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見靽曉皜?嚙賭誘嚗蕭?嚙?AI 嚙??蝔蕭?蝣潘蕭??嚙質摩?嚙踝蕭??嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣??AI ?嚙質膩蝔蕭??嚙質炊?嚙踝蕭??嚙賣瘜蕭?隞亦敺蕭?皞Ⅱ?嚙賡??(debug) 撱箄降??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?雓蕭?璆蕭??嚙踝蕭?瘙蕭?嚙?AI ?嚙踝蕭??嚙踝蕭??嚙賜?嚙賬陛?嚙踝蕭??嚙踝蕭??嚙質?嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">鈭圾暺見??AI 撟恬蕭??嚙踝蕭?雿神??code嚗蕭??嚙踝蕭?雿Ｙ銝蝔殷蕭?閮蝧餉陌?嚙賢銝蝔殷蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 21:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              Google Translate ?嚙踝蕭??嚙賢?嚙賜蕃霅胯蕭???ChatGPT ?嚙賭誑?嚙賢?嚙賣膜憌整銝蝭?嚙賢祕?嚙踝蕭??嚙踝蕭?嚗蕭?銝隞賭葉?嚙踝蕭??嚙賭犖撅交風 (CV) ?嚙質蕭?璆剖遣霅唳嚗蕭??嚙賣迫蝧餉陌?嚙質?嚙踝蕭?隞莎蕭? AI 撠耦?嚙踝蕭?蝤具憟賭撮?嚙踝蕭??嚙質?嚙踝蕭?隤神?嚙踝蕭??嚙踝蕭??嚙賬蕭?璆哨蕭?                            </p>
                            </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾?嚙賜蕃霅胯蕭??嚙賣膜嚙?(Polish)?嚙踝蕭?隞歹蕭??嚙踝蕭??嚙賢??/p>
                            </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見閬蕭? AI ?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚙??靘蕭??嚙賣?嚙質?嚙踝蕭?敺?嚙質牧?嚙踝蕭??嚙賣摮賂蕭??嚙踝蕭?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見??AI 撟恬蕭??嚙賣撖怒蕭?撠嗾?嚙踝蕭?暺摮蕭??嚙踝蕭??嚙踝蕭?畾蛛蕭??嚙賡蕭??嚙賣挾?嚙踝蕭?/p>
                            </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賜?嚙賢蕭?撌批?嚙踝蕭?雿蕭??嚙踝蕭?撖恬蕭?嚗隢蕭? Email 摰?嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 22:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?蝭靽蕭???hands-on ?嚙賢祕撽恕?嚙踝蕭??嚙踝蕭??嚙踝蕭?銝隞賣芋?嚙踝蕭??嚙賢?嚙踝蕭? CSV 瑼蕭?嚗飛?嚙踝蕭?閬扛?嚙踝蕭?雿ｇ蕭??嚙踝蕭??嚙踝蕭?摮賂蕭??嚙賣撣貉牧閰梧蕭? AI 皞蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?憒蕭?嚗蕭?鈭狡?嚙踝蕭?嚙???嚙賢末嚙??嚙賬璉耦?嚙賡＊蝷綽蕭??嚙踝蕭??嚙賡?嚙踝蕭??嚙賬鼠?嚙踝蕭??嚙賢誨?嚙賣?嚙踝蕭??嚙賢憿蕭??嚙踝蕭??嚙踝蕭?靽蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?銝 Excel ??CSV 瑼蕭?嚗蒂蝣綽蕭? AI 撌莎蕭?霈?嚙賢?嚙踝蕭???/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭??嚙質?嚙踝蕭?閮?嚙踝蕭?嚗莎蕭??嚙踝蕭??嚙質岷?嚙踝蕭?摨蕭?閮蕭???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭??嚙踝蕭??嚙踝蕭?嚗嚙?AI ?嚙踝蕭??嚙踝蕭??嚙賜車?嚙踝蕭?憿蕭??嚙踝蕭?銵剁蕭?靘蕭?嚗蕭?敶ｇ蕭??嚙踝蕭?擗蕭?嚗蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質岫??AI ?嚙踝蕭??嚙踝蕭??嚙賢閫撖蕭??嚙踝蕭?嚙?(insights)??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 23:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              嚙?ChatGPT 銝撠隞伐蕭??嚙賢銝蕭??嚙賜?嚙賬銝蝭?嚙踝蕭?雿蕭?嚙???嚙踝蕭??嚙踝蕭?雿輻?嚙踝蕭?蝬脩窗?嚙質汗?嚙質?嚙踝蕭??嚙踝蕭?撖行?嚙賜靽蕭??嚙質身雿蕭??嚙踝蕭?隞賜奎?嚙踝蕭??嚙踝蕭?撣隤踵?嚙踝蕭?嚗嚙?ChatGPT 銝雯?嚙賢撠蕭??嚙?嚙賜雿蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賜雯瘞蕭??嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾?嚙踝蕭??嚙踝蕭?閰莎蕭??嚙賜雯蝯∠汗璅∴蕭?嚗?嚙賢蕭??嚙質?嚙?/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見?嚙踝蕭?嚗?嚙踝蕭??嚙踝蕭??嚙踝蕭?鞈蕭?嚗蕭?憒蕭?隞?嚙質?嚙賬予嚙????/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見??AI 蝮踝蕭??嚙質撟曉蕭??嚙賜雯蝡蕭?鞈蕭?嚗?嚙踝蕭?銝隞賢?嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">擗蕭?憟踝蕭????閬蕭? AI ?嚙踝蕭?鞈蕭?靘蕭??嚙踝蕭??嚗靘輯撌望霅蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 24:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭?敹萄?嚙踝蕭?嚗靽蕭?閬蕭??嚙質店?嚙賢銝蝭?嚙踝蕭?雿蕭?閬綽蕭??嚙賭誘 (Visual Prompting)?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?撅內銝?嚙賜陛?嚙踝蕭?隞歹蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質底蝝堆蕭?隞歹蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賣憭芷?嚙踝蕭??嚙質鞎蕭?瘥垣蝝啁溶嚗敶梧蕭??嚙踝蕭?嚙?K?嚙質釭?嚙踝蕭?銋蕭??嚙賢楊憭改蕭??嚙賬祕?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?瑽蕭??嚙賢嚗雿蕭?蝟鳴蕭??嚙踝蕭??嚙賡◢?嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見?嚙踝蕭?蝣綽蕭?敶Ｗ捆閰?嚙踝蕭?餈啜◢?嚙踝蕭?靘蕭?嚗?嚙踝蕭??嚙賢祕?嚙賢?嚙賬鞊⊥晷嚗?嚙賢?嚙賡??/p>
                          </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見?嚙踝蕭??嚙踝蕭??嚙賡撖穿蕭?嚗蕭?嚙?16:9 ?嚙踝蕭??嚙賣帖憿蕭???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見?嚙踝蕭?撘蛛蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?銝蕭?靽格?嚙賭誘?嚙賢凝隤輻敦蝭??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾 DALL-E 3 ?嚙踝蕭?甈蕭?雿輻銝蕭??嚙賢??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 25:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙賢蕭??嚙賢?嚙踝蕭??嚙賣平?嚙質玨?嚙踝蕭??嚙踝蕭?銝甇伐蕭?甇亙葆雿蕭?銝嚙?GPT ?嚙賢遣隞?嚙賢祕?嚙踝蕭??嚙踝蕭?嚗撱綽蕭??嚙賬蕭?霅啁蜇蝯蕭??嚙賬PT?嚙賢飛?嚙踝蕭?閬扛?嚙賜雿Ｚ身摰敹蕭?隞歹蕭??嚙踝蕭??嚙賭遙?嚙踝蕭?撠蕭?霅堆蕭??嚙賜蜇蝯蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賬蕭??嚙踝蕭??嚙賜霅蕭?獢蕭?銝隞踝蕭?霅堆蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙質身摰末撘蕭?雿輻?嚙踝蕭?撠店?嚙賢?嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                          <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭? GPT Builder 隞?嚙踝蕭??嚙賡?嚙踝蕭?Create / Configure嚗蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見撖怠皜?嚙賜甇抒儔?嚙賣敹蕭?嚙?(Instructions)??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見銝 PDF ??TXT 瑼蕭?嚗蕭??嚙踝蕭???GPT ?嚙踝蕭?撅祉霅澈??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?閬踝蕭?蝒莎蕭?皜祈岫?嚙賡?嚙踝蕭?蝣綽蕭?雿蕭? GPT ?嚙踝蕭?嚙?嚙踝蕭??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 26:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              AI ?嚙踝蕭??嚙賢末?嚙質靽∴蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賢鞊∴蕭??嚙賜迂銋?嚙賢劂嚙?(Hallucination)?嚙賬銝蝭?嚙賣楛?嚙質圾?嚙賢?嚙賜鞊∴蕭??嚙踝蕭?嚗蒂?嚙踝蕭?銝憟祕?嚙踝蕭?鈭祕?嚙踝蕭? (Fact Check) 瘚蕭?嚗蕭?雿蕭?嚙?嚙踝蕭撘 AI ?嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?頞喉蕭?霅蕭?憭恬蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾 AI ?嚙踝蕭?撟餉死?嚙踝蕭?銵蕭??嚙踝蕭?撱綽蕭??嚙賢?嚙賣雁??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣?嚙踝蕭?銝車?嚙踝蕭? AI 鞈蕭??嚙賣瘜蕭?靘蕭?嚗蕭?瘙蕭?靘蕭?皞漱?嚙踝蕭?撠蝬脩窗?嚙質汗?嚙質撽蕭?嚗蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣撣訾蝙?嚙賭葉嚗蕭??嚙踝蕭? AI ?嚙踝蕭??嚙踝蕭?撖佗蕭?鞈蕭?靽蕭??嚙踝蕭??嚙踝蕭?摨佗蕭?/p>
                              </div>
                            </div>
                          </div>
                                                 </div>
                       );
                     case 27:
                       return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?嚙踝蕭???ChatGPT 雓蕭??嚙踝蕭??嚙踝蕭?靽曆犖?嚙賢嚗?嚙踝蕭?憟踝蕭?鈭綽蕭?敹蕭??嚙踝蕭??嚙賢銝蝭?嚙賢葆雿底蝝圈霈 OpenAI ?嚙踝蕭??嚙賣蝑蕭?嚙??雿蕭?撠店?嚙踝蕭??嚙賢?嚙踝蕭?銝蕭?鋡怎?嚙踝蕭?璅∴蕭?閮毀嚗蒂?嚙踝蕭?暺見?嚙質身摰葉?嚙踝蕭?撠店蝝?嚙踝蕭?靽蕭?雿蕭??嚙賭犖?嚙踝蕭?璆哨蕭??嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                           <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">皜蕭??嚙踝蕭??嚙賢楛?嚙踝蕭?閰望風?嚙踝蕭??嚙踝蕭??嚙賜?嚙踝蕭?/p>
                           </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見?嚙踝蕭??嚙踝蕭??嚙踝蕭?閰梧蕭??嚙踝蕭??嚙踝蕭?皜?嚙?嚙賣風?嚙踝蕭?閰梧蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">撱綽蕭?銝?嚙踝蕭??嚙踝蕭?雿輻蝧嚗?嚙賢撠店銝剛撓?嚙踝蕭?摨佗蕭??嚙踝蕭??嚙賭犖?嚙賢?嚙踝蕭?撖蕭??嚙踝蕭?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 28:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              AI 靽鈭綽蕭??嚙賣?嚙踝蕭?蝺游?嚙踝蕭??嚙賭誑雿Ｖ漲??嚙賢飛?嚙踝蕭??嚙賭犖憿冗?嚙踝蕭??嚙踝蕭??嚙賜車?嚙踝蕭?嚗蕭?憒蕭??嚙賢?嚙賜車?嚙踝蕭?閬蕭??嚙賢銝蝭?嚙賡蕭?銝?嚙賢祕靘蕭?撅內 AI ?嚙踝蕭??嚙賭誑暺見?嚙踝蕭?蝑葉?嚙賜嚗蒂?嚙踝蕭?暺見霅?嚙踝蕭?撠?嚙踝蕭??嚙踝蕭??嚙賢摰對蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                           <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙質圾 AI ?嚙踝蕭??嚙踝蕭?皞蕭?銝鳴蕭?靽蕭?蝺湔?嚙踝蕭???/p>
                           </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見??AI ?嚙賢遣霅唬葉嚗蕭?閬箏?嚙踝蕭??嚙踝蕭??嚙賣改蕭?閬蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙賣暺見?嚙踝蕭?靽格?嚙賭誘嚗?嚙質岫皜蕭??嚙踝蕭???AI 蝑蕭?銝哨蕭??嚙踝蕭???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 29:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ??AI ?嚙賭誑撟恬蕭?撖恬蕭?蝡神 code嚗蕭??嚙踝蕭??嚙賬蕭??嚙踝蕭?镼脯蕭??嚙踝蕭??嚙踝蕭?嚗銝蝭?嚙賣楛?嚙踝蕭?隢摮賂蕭??嚙踝蕭??嚙賢銝蕭?雿輻 AI ?嚙質府?嚙踝蕭??嚙踝蕭?敺瘀蕭?蝭蕭??嚙踝蕭??嚙踝蕭?暺見嚙?嚙踝蕭?嚙踝蕭???AI?嚙賢?嚙踝蕭?銝蕭?閰莎蕭??嚙賢雿輻??AI嚗誑?嚙踝蕭?嚙?嚙踝蕭?嚙踝蕭??嚙踝蕭?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                           <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">鈭圾摮賂蕭??嚙踝蕭??嚙賭蝙??AI 頛撖恬蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭???/p>
                           </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">摮賂蕭?暺見嚙?AI ?嚙踝蕭?銝?嚙賬蕭??嚙賢極?嚙賬蕭?靽誨蝑蕭??嚙賬蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">撱綽蕭?銝?嚙踝蕭?撖艾蕭???AI 雿輻?嚙踝蕭?嚗隢摮賂蕭?摰極雿蕭??嚙踝蕭?敺蕭??嚙賢楛??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 30:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? 銝鳴蕭??嚙賢捆</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ChatGPT ?嚙踝蕭?銝?嚙踝蕭?憪銝蝭?嚙賢葆雿蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭?撅蕭?鈭箏極?嚙質?嚙踝蕭?銝甇亦撅蕭???GPT-5 ?嚙賢?嚙踝蕭??嚙賣?嚙踝蕭??嚙賡鈭箏極?嚙質 (AGI) ?嚙踝蕭?敹蛛蕭??嚙賢 AI 撠靘冗?嚙賬極雿雿蕭??嚙踝蕭?敶梢??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                           <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">鈭圾 AI ?嚙踝蕭??嚙踝蕭??嚙賢嗾?嚙賭蜓閬撅?嚙踝蕭?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭?AI ?嚙質?嚙踝蕭?嚙?嚙踝蕭霈蕭??嚙?嚙踝蕭?銵平??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">隞伐蕭??嚙踝蕭?璆萸蕭??嚙踝蕭?撖抬蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭??嚙賜 AI 瘛勗漲?嚙踝蕭??嚙賣靘蕭?/p>
                              </div>
                            </div>
                           </div>
                         </div>
                       );
                     default:
                       return (
                         <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                           <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 摮賂蕭??嚙踝蕭?</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?嚙踝蕭??嚙賢?嚙賢摰寞?嚙踝蕭??嚙踝蕭?璁艙?嚙賢祕頦蕭?暺蕭?/p>
                           </div>
                           <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?嚙踝蕭 撖佗蕭??嚙賜</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">撠蕭?摮貊霅蕭??嚙賢撖佗蕭?撌伐蕭??嚙踝蕭?瘣餃?嚙賭葉?嚙賢擃瘜蕭?/p>
                           </div>
                         </div>
                       );
                   }
                 })()}
              </div>
                </motion.div>
          </div>

          {/* 摮賂蕭?頛?嚙??- ?嚙踝蕭?撘?嚙踝蕭? */}
          <div className="layout-sidebar-content content-optimized" id="sidebar-content" role="complementary" aria-label="摮賂蕭?頛撌亙">
            
            {/* 蝘鳴蕭?蝡荔蕭??嚙踝蕭??嚙踝蕭??嚙踝蕭? */}
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
                ?嚙踝蕭??嚙踝蕭?
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

            {/* 摮賂蕭?蝯梧蕭? - 蝘鳴蕭?蝡臬??*/}
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
                摮賂蕭?蝯梧蕭?
              </h3>
              
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">?嚙賣活?嚙踝蕭?</dt>
                  <dd className="text-gray-300 font-mono font-medium text-sm lg:text-base" aria-label={`?嚙賣活摮賂蕭??嚙踝蕭?嚙?{realTimeDisplay}`}>{realTimeDisplay}</dd>
                    </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">蝮賡脣漲</dt>
                  <dd className="text-green-300 font-bold text-sm lg:text-base" aria-label={`蝮賢飛蝧脣漲嚙?{stats.totalProgress}%`}>{stats.totalProgress}%</dd>
              </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">摰蕭?銝鳴蕭?</dt>
                  <dd className="text-gray-300 font-medium text-sm lg:text-base" aria-label={`撌莎蕭???{stats.completedThemes}?嚙賭蜓憿蕭???{stats.totalThemes}?嚙賭蜓憿}>{stats.completedThemes}/{stats.totalThemes}</dd>
          </div>
                
                {isCompleted && (
                  <div className="flex items-center space-x-2 mt-4 p-2 bg-green-500/20 border border-green-400/30 rounded-lg" role="status" aria-label="?嚙踝蕭?撌莎蕭???>
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" aria-hidden="true" />
                    <span className="text-green-300 text-xs lg:text-sm font-medium">撌莎蕭???/span>
        </div>
                )}
              </dl>
            </motion.div>


          </div>
        </div>
            </div>
            
      {/* ?嚙踝蕭 ?嚙踝蕭?摨?嚙踝蕭?嚙?- 蝣綽蕭??嚙踝蕭?憪蕭??嚙踝蕭? */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 撌血嚗飛蝧脣漲靽⊥ */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              ?嚙踝蕭? {unitId} / 31
            </div>
            <div className="text-sm text-gray-400">
              {isCompleted ? '撌莎蕭??? : '?嚙踝蕭?嚙?}
            </div>
          </div>

          {/* ?嚙賢嚗蕭?雿蕭???*/}
          <div className="flex items-center space-x-3">
            {/* 銝蕭?隤莎蕭???*/}
            {navigationConfig.hasPrevUnit && (
                <Button
                onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                className="btn-ai-secondary px-4 py-2"
                aria-label={`餈蕭?銝蕭?隤莎蕭??嚙踝蕭?${navigationConfig.prevUnitId}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                銝蕭?嚙?                </Button>
              )}
              
            {/* 銝鳴蕭??嚙踝蕭??嚙踝蕭? */}
            {!isCompleted ? (
              // ?嚙踝蕭???- 憿舐內摰蕭??嚙踝蕭?
                <Button
                onClick={handleMarkComplete}
                className="btn-ai-success px-6 py-3"
                aria-label={`璅蕭??嚙踝蕭?${unitId}?嚙賢歇摰蕭?`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                摰蕭?摮賂蕭?
              </Button>
            ) : navigationConfig.isLastUnitOfTheme ? (
              // 撌莎蕭??嚙踝蕭??嚙賭蜓憿蕭?敺蕭?嚙?- 憿舐內皜穿蕭??嚙踝蕭?
              <Button 
                onClick={handleNavigateQuiz}
                                        className="btn-ai-primary px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                aria-label={`?嚙賢銝鳴蕭?${themeId}?嚙賣葫撽}
              >
                ?嚙踝蕭?皜穿蕭?
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : navigationConfig.hasNextUnit ? (
              // 撌莎蕭??嚙踝蕭??嚙踝蕭?銝嚙?- 憿舐內銝蕭?隤莎蕭???              <Button 
                onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                className="btn-ai-primary px-6 py-3"
                aria-label={`?嚙踝蕭?銝蕭?隤莎蕭??嚙踝蕭?${navigationConfig.nextUnitId}`}
              >
                銝蕭?嚙?                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              // 隤莎蕭?蝯蕭? - 餈蕭?隤莎蕭?蝮質汗
              <Button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary px-6 py-3"
                aria-label="餈蕭?隤莎蕭?蝮質汗"
              >
                隤莎蕭?摰蕭?
                <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
      </div>

      {/* 摰蕭??嚙賜敶蕭? - 靽蕭??嚙賣見 */}
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
              <h3 className="text-xl font-bold">?嚙踝蕭?摰蕭?嚙?/h3>
              <p className="text-green-100">摮賂蕭??嚙踝蕭?: {realTimeDisplay}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 

