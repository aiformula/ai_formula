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
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress'; // ChatGPT ?²åº¦è¿½è¹¤
import './ChatGPTCompleteCourseUnit.css'; // ?¨ èª²ç??é¢å¢å¼·æ¨??
import '@/styles/design-system.css'; // ?¨ çµ±ä?è¨­è?ç³»çµ±
import { LearningPageSkeleton, HeaderSkeleton, LearningContentSkeleton, SidebarSkeleton } from '@/components/ui/skeleton'; // ?°å?ï¼šéª¨?¶å?

const ChatGPTCompleteCourseUnit: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  // è¨ˆæ??¨ç???- ç°¡å???  const [learningSeconds, setLearningSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  
  // ?”§ èª¿è©¦æ¨¡å?ï¼šå¼·?¶å??•è??‚å™¨ï¼ˆæ¸¬è©¦ç”¨ï¼?  const [forceTimerForTesting, setForceTimerForTesting] = useState(false); // ?¯ ?¹ç‚º falseï¼Œç??¢ç’°å¢ƒä?å¼·åˆ¶?Ÿå?

  // ?”§ èª¿è©¦?¢æ¿?§åˆ¶ - ?ªåœ¨?¹å?æ¢ä»¶ä¸‹é¡¯ç¤?  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  // ?”§ ?‹ç™¼?…å¿«?·éµï¼šæ? Ctrl+D é¡¯ç¤º/?±è?èª¿è©¦?¢æ¿
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
  
  // ?¯ ä½¿ç”¨?²åº¦è¿½è¹¤ Hook
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    themeProgress
  } = useChatGPTProgress();

  // ?ªå?ç¾©å–®?ƒå??æª¢??  const isUnitCompleted = useCallback((unitKey: string): boolean => {
    // å¾?unitKey è§?? themeId ??unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return false;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    const progress = getThemeProgress(themeId);
    return progress ? progress.completedUnits.includes(unitId) : false;
  }, [getThemeProgress]);
  
  // ?ªå?ç¾©å–®?ƒå??å???  const markUnitCompleted = useCallback((unitKey: string, timeSpent: number = 60) => {
    // å¾?unitKey è§?? themeId ??unitId
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    // å°‡ç??¸è??›ç‚º?†é?
    const timeInMinutes = Math.ceil(timeSpent / 60);
    
    completeUnit(themeId, unitId, timeInMinutes);
  }, [completeUnit]);
  
  const [completionAnimation, setCompletionAnimation] = useState(false);
  const [realTimeDisplay, setRealTimeDisplay] = useState('00:00:00'); // ä¿®æ­£ï¼šçµ±ä¸€?å??–ç‚º HH:MM:SS ?¼å?

  // ?¹æ? themeId ??unitId ?Ÿæ? unit key
  const getUnitKey = (themeId: string, unitId: string): string => {
    return `t${themeId}-u${unitId}`;
  };

  const currentUnitKey = getUnitKey(themeId || '1', unitId || '1');
  const isCompleted = isUnitCompleted(currentUnitKey);
  const stats = getProgressStats();

  // ?? ?§èƒ½?ªå?ï¼šç·©å­˜ä?ä»¶è??†å‡½??  const handleMarkComplete = useCallback(() => {
    console.log(`?¯ [FIXED] æ¨™è?å®Œæ? - ?¶å?å­¸ç?ç§’æ•¸:`, learningSeconds);
    
    // ?¯ ?è?ï¼šç??³å?æ­¢è??‚å™¨
    setIsTimerActive(false);
    
    // ä½¿ç”¨?¶å???learningSeconds ä½œç‚º?€çµ‚æ???    const finalSeconds = Math.max(learningSeconds, 1); // ?€å°?ç§?    
    console.log(`?? [FIXED] ?€çµ‚å­¸ç¿’æ??? ${finalSeconds}ç§’`);
    
    // ?¼å??–æ?çµ‚é¡¯ç¤ºæ??“ç‚º HH:MM:SS ?¼å?
    const finalHours = Math.floor(finalSeconds / 3600);
    const finalMinutes = Math.floor((finalSeconds % 3600) / 60);
    const remainingSeconds = finalSeconds % 60;
    
    const formattedHours = finalHours.toString().padStart(2, '0');
    const formattedMinutes = finalMinutes.toString().padStart(2, '0');
    const formattedSecondsDisplay = remainingSeconds.toString().padStart(2, '0');
    const finalTimeDisplay = `${formattedHours}:${formattedMinutes}:${formattedSecondsDisplay}`;
    
    setRealTimeDisplay(finalTimeDisplay);
    
    // ?¯ ?è?ä¿®æ”¹ï¼šå‚³?ç²¾ç¢ºç?å­¸ç?ç§’æ•¸çµ?markUnitCompleted
    markUnitCompleted(currentUnitKey, finalSeconds);
    
    console.log(`?? [FIXED] å®Œæ??•ç•«å°‡é¡¯ç¤?`, finalTimeDisplay);
    console.log(`?’¾ [STORAGE] å·²å„²å­˜å­¸ç¿’æ??? ${finalSeconds}ç§’`);
    console.log(`?¹ï? [TIMER] è¨ˆæ??¨å·²?œæ­¢ï¼ŒisCompleted å°‡è???true`);
    
    // é¡¯ç¤ºå®Œæ??•ç•«
    setCompletionAnimation(true);
    
    setTimeout(() => {
      setCompletionAnimation(false);
    }, 2000);
  }, [learningSeconds, currentUnitKey, markUnitCompleted]);



  const handleNavigateBack = useCallback(() => {
    navigate('/courses/chatgpt-complete-course/learning');
  }, [navigate]);

  const handleNavigateNext = useCallback((nextUnitId: number) => {
    // ?¤æ–·ä¸‹ä??‹å–®?ƒå±¬?¼å“ª?‹ä¸»é¡?    let nextThemeId = themeId;
    if (nextUnitId >= 6 && nextUnitId <= 10) nextThemeId = '2';
    if (nextUnitId >= 11 && nextUnitId <= 16) nextThemeId = '3';
    if (nextUnitId >= 17 && nextUnitId <= 21) nextThemeId = '4';
    if (nextUnitId >= 22 && nextUnitId <= 26) nextThemeId = '5';
    if (nextUnitId >= 27 && nextUnitId <= 31) nextThemeId = '6';
    
    navigate(`/courses/chatgpt-complete-course/theme/${nextThemeId}/unit/${nextUnitId}`);
  }, [navigate, themeId]);

  const handleNavigatePrev = useCallback((prevUnitId: number) => {
    // ?¤æ–·ä¸Šä??‹å–®?ƒå±¬?¼å“ª?‹ä¸»é¡?    let prevThemeId = themeId;
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

  // ChatGPT èª²ç??®å??¸æ? - å®Œæ•´??31 ?‹å–®??  const units = useMemo(() => ({
    // ç¬¬ä?ç« ï?è§?? ChatGPT ??æ·±å…¥?¸å??€è¡?    '1': {
      id: 1,
      themeId: 1,
      title: isZhHK ? '?®å? 1.1ï¼šä?éº¼æ˜¯å¤§å?èªè?æ¨¡å? (LLM)ï¼? : 'Unit 1.1: What is a Large Language Model (LLM)?',
      duration: '15?†é?',
      type: 'text' as const,
      description: isZhHK ? '?´å€‹èª²ç¨‹ç??‹ç«¯ï¼Œä?ç´¹äººå·¥æ™º?½åŸº?¬æ?å¿µå?å®Œæ•´å­¸ç?è·¯ç??–ï?å»ºç?å­¸ç??®æ??Œæ–¹æ³•ã€? : 'The beginning of the entire course, introducing basic AI concepts and complete learning roadmap, establishing learning goals and methods.',
      content: {
        transcript: isZhHK ? 
          'å¤§å?èªè?æ¨¡å?ï¼ˆLarge Language Model, LLMï¼‰æ˜¯ä¸€ç¨®å?ç«¯ç?äººå·¥?ºèƒ½ï¼ˆAIï¼‰ç?å¼ï?ç¶“é?æµ·é??‡æœ¬?¸æ??„è?ç·´ï?å¾è€Œå­¸?ƒä??†è§£?ç??ã€ç¸½çµã€ç¿»è­¯äººé¡è?è¨€ä»¥å??·è??¶ä?è¤‡é??„æ??¬ç›¸?œä»»?™ã€‚å??¹æœ¬ä¸Šèªªï¼ŒLLM ?¯ä??‹æ·±åº¦å­¸ç¿’æ¨¡?‹ï?å®ƒä¸¦?ç?æ­?œ°?²è?äººé??ç¾©ä¸Šç??Œæ€è€ƒã€ï??Œæ˜¯?ºæ–¼æ¥µå…¶è¤‡é??„æ??‡è?ç®—ï?ä¾†é?æ¸¬ä??‹æ??¬å??—ä¸­?¥ä?ä¾†æ??¯èƒ½?ºç¾?„è?èªã€‚\n\n?Œå¤§?‹ã€é€™å€‹è?å½™ä¸»è¦é??¾åœ¨?©å€‹ç¶­åº¦ï??¶ä??¯è?ç·´æ•¸?šé??„è?æ¨¡ï??™ä??¸æ??†å?å¾€ä¾†æ??¼ä??¯ç¶²?„å»£æ³›æ??¬ï?ä¾‹å??…å«?¸å??„ç¶²?ç? Common Crawl ?¸æ?åº«å??æ??¸å??¬é??¢ç?ç¶­åŸº?¾ç?ï¼›å…¶äºŒæ˜¯æ¨¡å??¬èº«?„è??œåº¦ï¼Œå³?¶å??«ç??Œå??¸ã€æ•¸?ï??™ä??ƒæ•¸?¯è??ºæ¨¡?‹åœ¨å­¸ç??ç?ä¸­èª¿?´ç??§éƒ¨è®Šé?ï¼Œæ•¸?å¯é«˜é??¸å??„ç??³æ›´å¤šã€‚\n\nLLM ?‡å‚³çµ?AI ?€å¤§ç??€?¥åœ¨?¼å…¶é©šäºº?„é€šç”¨?§å??ˆæ´»?§ã€‚å‚³çµ±ç?æ©Ÿå™¨å­¸ç?æ¨¡å??šå¸¸?¯ç‚º?®ä??ç‰¹å®šç?ä»»å??Œè¨­è¨ˆï?ä¾‹å??…æ??†æ??–å??¾éƒµä»¶é?æ¿¾ã€‚ç„¶?Œï?ä¸€??LLM ?»èƒ½?‘è??¶å»£?šç??ŒçŸ¥è­˜ã€ï??·è?å¤šç¨®?ªç„¶ä¸å??„ä»»?™ï?å¾å?ç­”å¸¸è­˜å?é¡Œã€æ’°å¯«å?æ¥­æ?æ¡ˆï??°ç??é›»?¦ä»£ç¢¼ï??½å¯?±å?ä¸€?‹åŸºç¤æ¨¡?‹å??ã€‚\n\n?¨äººå·¥æ™º?½ç??€è¡“å±¤ç´šä¸­ï¼ŒLLM ?•æ–¼?‘å?å¡”ç??‚ç«¯?‚å?å»ºç??¨æ??¨å­¸ç¿’ç??ºç?ä¹‹ä?ï¼Œæ˜¯æ·±åº¦å­¸ç??„ä??‹å??¯ï?ä¸¦åˆ©?¨ç?ç¶“ç¶²çµ¡ä??ºå…¶è¨ˆç??¶æ??‚ä??ºç??å? AI ?„ä??‹é?åº¦å?æ¥­å??„å??†ï?LLM å°ˆæ³¨?¼ç?è§?€é?æ¸¬å??Ÿæ?é¡äºº?‡æœ¬?? :
          'A Large Language Model (LLM) is a cutting-edge artificial intelligence program trained on massive text data to understand, generate, summarize, translate human language and perform other complex text-related tasks.',
        keyPoints: isZhHK ? [
          'æ¸…æ™°äº†è§£èª²ç??­å¤§?®å??…ç?æ§‹å??‹é???,
          'ç¢ºç?ä½ å­¸å®Œä?å¾Œå¯ä»¥é??°å??·é??€?½ï?ä¾‹å?ï¼šç¨ç«‹å¯«?ºé??ˆæ?ä»?,
          '?Œæ¡?€?‰æ??…å­¸ç¿’æ–¹æ³•ï?é»æ¨£è·Ÿä?èª²ç??…å¯¦?°é??®ä?é½Šå?ï¼Œå??°æ?å¥½å??ˆæ?'
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
      title: isZhHK ? '?®å? 1.2ï¼šğŸ§??†è§£ LLM' : 'Unit 1.2: ?? Decoding LLM',
      duration: '12?†é?',
      type: 'text' as const,
      description: isZhHK ? '?¢ç´¢LLM?„æ?å»ºåŸº?³â€”ç?ç¶“ç¶²çµ¡ï?ä»¥å?revolutionaryTransformer?¶æ??„æ ¸å¿ƒå‰µ?°è‡ªæ³¨æ??›æ??¶ã€? : 'Explore the building blocks of LLM?”neural networks, and the core innovation of the revolutionary Transformer architecture: self-attention mechanisms.',
      content: {
        transcript: isZhHK ? 
          'LLM ?„æ?å»ºåŸº?³æ˜¯äººå·¥ç¥ç?ç¶²çµ¡ï¼Œé€™æ˜¯ä¸€ç¨®æ¨¡ä»¿ç??©å¤§?¦ä¸­ç¥ç??ƒç›¸äº’é€?¥?Œå‚³?ä¿¡?Ÿæ–¹å¼ç?è¨ˆç?æ¨¡å??‚å??±å??‹å±¤ç´šç?ç¯€é»ç??ï??…æ‹¬è¼¸å…¥å±¤ã€è¼¸?ºå±¤ä»¥å?ä¸€å±¤æ?å¤šå±¤ä½æ–¼?©è€…ä??“ç??Œéš±?å±¤?ã€‚\n\n?¶è€Œï?LLM ?½å?å¯¦ç¾è³ªç?é£›è?ï¼Œå…¶?Ÿæ­£?„æ?è¡“ç??´åœ¨??2017 å¹´è¢«?å‡º??Transformer ?¶æ??‚åœ¨ Transformer ?ºç¾ä¹‹å?ï¼Œä¸»æµç?åºå??•ç?æ¨¡å?ï¼ˆå?å¾ªç’°ç¥ç?ç¶²çµ¡ RNNï¼‰å??ˆæ??†å??å??•ç??‡æœ¬ï¼Œé€™æ¥µå¤§åœ°?åˆ¶äº†è?ç·´é€Ÿåº¦?Œè??†é•·?‡æœ¬?„èƒ½?›ã€‚Transformer ?¶æ??‡å??¥ä?ä¸¦è??•ç?æ©Ÿåˆ¶ï¼Œå¯ä»¥å??‚å??æ•´?‹è¼¸?¥å??—ï?å¾è€Œèƒ½å¤ åˆ©?¨ç¾ä»?GPU ?„å¼·å¤§ä¸¦è¡Œè?ç®—èƒ½?›ï?å¤§å?ç¸®çŸ­è¨“ç·´?‚é??‚\n\nTransformer ?¶æ??„æ ¸å¿ƒæ˜¯?¶ç¨?µç??Œè‡ªæ³¨æ??›æ??¶ã€ï?Self-Attention Mechanismï¼‰ã€‚é€™å€‹æ??¶ä½¿å¾—æ¨¡?‹åœ¨?•ç?åºå?ä¸­ç??å€‹å–®è©æ?ï¼Œèƒ½å¤ æ?è¡¡è¼¸?¥æ??¬ä¸­?€?‰å…¶ä»–å–®è©å?è©²å–®è©ç??è??§ï?ä¸¦çµ¦äºˆä??Œç??Œæ³¨?å??æ??ã€‚é€™è?æ¨¡å??½å??•æ??°è?èªä??“è??œç??é•·è·é›¢?„ä?è³´é?ä¿‚ï?å¾è€Œæ›´æ·±åˆ»?°ç?è§??ä¸‹æ??‚ä?å¦‚ï??¨å¥å­ã€Œè??ªè¿½?—è€é?ï¼Œå?ä¸ºå?é¥¿ä??ä¸­ï¼Œè‡ªæ³¨æ??›æ??¶èƒ½å¹«åŠ©æ¨¡å?æº–ç¢º?°å?ä»???Œå??è?ä¸»è??Œè??ªã€è¯ç¹«èµ·ä¾†ï??Œä??¯ã€Œè€é??ã€‚\n\n?ºä?è®“ç?ç¶“ç¶²çµ¡èƒ½å¤ è??†è?è¨€ï¼ŒLLM ?¡ç”¨äº†ã€Œè?åµŒå…¥?ï?Word Embeddingsï¼‰æ?è¡“ä?è¡¨ç¤º?®è??‚å‚³çµ±ç?æ©Ÿå™¨å­¸ç??¹æ??¯èƒ½ä½¿ç”¨å­¤ç??„æ•¸å­—ä?ä»?¡¨æ¯å€‹è?ï¼Œç„¡æ³•è¡¨?”è?èªé??„è?ç¾©é?ä¿‚ã€‚è?åµŒå…¥?‡å?æ¯å€‹å–®è©æ?å°„åˆ°ä¸€?‹é?ç¶­ç??‘é?ç©ºé?ä¸­ã€‚åœ¨?™å€‹ç©º?“è£¡ï¼Œæ??æ??¨æ??¸è??„è?èªï?ä¾‹å??Œå??‹ã€è??Œå¥³?‹ã€ï??–ã€Œèµ°è·¯ã€è??Œå?è·‘ã€ï??¨å??ä??„è??¢æ??´è??‚é€™ç¨®è¡¨ç¤º?¹å?ä½¿å?æ¨¡å??½å??•æ??°å–®è©ä??“ç´°å¾®ç?èªç¾©?Œå¥æ³•é?ä¿‚ï??ºç?è§???œè?è¨€å¥ å?äº†æ•¸å­¸åŸºç¤ã€‚\n\n?™ç¨®å¾é?åºè??†åˆ°ä¸¦è??•ç??„ç?å¼è?ç§»ï??¯è?å¹´ä? AI ?¼å?çªç„¶? é€Ÿç??¹æœ¬?Ÿå??‚å?ä½¿å??¨æµ·?æ•¸?šä?è¨“ç·´?·æ??¸å??„å??¸ç?è¶…å¤§è¦æ¨¡æ¨¡å??ç‚º?¯èƒ½ï¼Œæ?çµ‚å‚¬?Ÿä??·å?å¼·å¤§?½å???ChatGPT?? :
          'The building blocks of LLM are artificial neural networks, which are computational models that mimic the way neurons in biological brains interconnect and transmit signals.',
        keyPoints: isZhHK ? [
          'ç¥ç?ç¶²çµ¡ï¼šæ¨¡ä»¿ç??©å¤§?¦ç?è¨ˆç?æ¨¡å?ï¼Œå??«å?å±¤ç?é»?,
          'Transformerï¼?017å¹´æ??ºç??©å‘½?§æ¶æ§‹ï??¯æ´ä¸¦è??•ç?',
          '?ªæ³¨?å?æ©Ÿåˆ¶ï¼šæ?è¡¡è?èªé??è??§ï??•æ??·è??¢ä?è³´é?ä¿?,
          'è©å??¥æ?è¡“ï?å°‡å–®è©æ?å°„åˆ°é«˜ç¶­?‘é?ç©ºé?è¡¨ç¤ºèªç¾©?œä?',
          'ä¸¦è??•ç?ï¼šå??†å??°ä¸¦è¡Œç?ç¯„å?è½‰ç§»ï¼Œå??ŸAI?¼å?'
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
      title: isZhHK ? '?®å? 1.3ï¼šğ??GPT æ¼”é€²å²' : 'Unit 1.3: ?? GPT Evolution History',
      duration: '10?†é?',
      type: 'text' as const,
      description: isZhHK ? 'è§??ChatGPT?¸å??€è¡“ç?ä¸‰å¤§è¦ç?ï¼Œç?è§?…¶?¶æ??è?ç·´æ–¹æ³•å??¸å??Ÿèƒ½?„æ·±å±¤å«ç¾©ã€? : 'Analyze the three core elements of ChatGPT technology, understanding the deep meaning of its architecture, training methods, and core functions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?„æ ¸å¿ƒæ?è¡“å¯ä»¥å??¶å…¨ç¨?GPTï¼ˆGenerative Pre-trained Transformerï¼‰ä¸­å¾—åˆ°ç²¾ç¢º?„è§£?‹ã€‚é€™ä??‹è??­ç¤ºäº†å…¶?¶æ??è?ç·´æ–¹æ³•å??¸å??Ÿèƒ½?‚\n\nè®Šå???(Transformer)ï¼šé€™æ??ä??¶å?å±¤ç??€è¡“æ¶æ§‹ï??³å?ä¸€ç¯€?€è©³è¿°?„ã€åŸº?¼è‡ªæ³¨æ??›æ??¶ç? Transformer æ¨¡å??‚\n\n?è?ç·?(Pre-trained)ï¼šé€™æ˜¯ GPT æ¨¡å?è¨“ç·´?¹æ??„ç¬¬ä¸€?‹ã€ä??¯æ??œéµ?„é?æ®µã€‚åœ¨?™å€‹é?æ®µï?æ¨¡å??ƒé€²è??€è¬‚ç??Œç„¡??£å­¸ç??ï?æ¶ˆå?ä¾†è‡ªäº’è¯ç¶²ã€æ›¸ç±ã€æ?ç« ç?æµ·é??„ã€æœªç¶“æ?è¨»ç??‡æœ¬?¸æ??‚å…¶?¸å?å­¸ç?ä»»å??å¸¸ç°¡å–®ï¼šæ ¹?šä?æ®µæ??¬ç?ä¸Šæ?ï¼Œé?æ¸¬ä?ä¸€?‹æ??‰å¯?½å‡º?¾ç??®è??–å?ç¬¦ã€‚é€šé??¨æ•¸ä»¥è¬?„è??„å¥å­ä??è??™å€‹é?ç¨‹ï?æ¨¡å?ä¸å?å­¸æ?äº†è?æ³•è??‡å?è©å??¥è?ï¼Œé??§å?äº†å¤§?ç?ä¸–ç?å¸¸è??è?ç¾©é?ä¿‚ï??šè‡³?æ­¥?„æ¨?†æ¨¡å¼ã€‚é€™å€‹é?æ®µç‚ºæ¨¡å??“ä?äº†ä??‹å»£?šç??¥è??ºç??‚\n\n?Ÿæ?å¼?(Generative)ï¼šé€™å€‹è??è¿°äº†æ¨¡?‹æ??¸å??„èƒ½?›â€”â€”å‰µ? ï??Ÿæ?ï¼‰å…¨?°ç??å??µç??§å®¹?‚é€™è??¦ä?é¡è¢«ç¨±ç‚º?Œåˆ¤?¥å?æ¨¡å??ï?Discriminative Modelsï¼‰ç? AI å½¢æ?å°æ??‚åˆ¤?¥å?æ¨¡å?ï¼ˆå??¨æ–¼?‡æœ¬?†é???BERTï¼‰ç?ä¸»è?ä»»å??¯é€²è??†é??–åˆ¤?·ï?ä¾‹å??¤æ–·ä¸€å°éƒµä»¶æ˜¯?¦ç‚º?ƒåœ¾?µä»¶?‚è€Œç??å?æ¨¡å??‡èƒ½å¤ å??¶é?å§‹å‰µä½œï??Ÿæ??¨æ–°?„å¥å­ã€æ®µ?½ã€ä»£ç¢¼ï??šè‡³?¯å??å??³æ??‚\n\n?¨å??å¤§è¦æ¨¡?„ã€Œé?è¨“ç·´?ä?å¾Œï?æ¨¡å??šå¸¸?ƒé€²å…¥ç¬¬ä??‹è?ç·´é?æ®µâ€”â€”ã€Œå¾®èª¿ã€ï?Fine-tuningï¼‰ã€‚åœ¨?™å€‹é?æ®µï??‹ç™¼?…æ?ä½¿ç”¨ä¸€?‹è?æ¨¡å?å¾—å??ä?å¸¶æ??¹å?ä»»å?æ¨™ç±¤?„æ•¸?šé?ä¾†é€²ä?æ­¥è?ç·´æ¨¡?‹ã€‚æ›´?è??„æ˜¯ï¼ŒOpenAI å¼•å…¥äº†ã€Œä??ªäººé¡å?é¥‹ç?å¼·å?å­¸ç??ï?Reinforcement Learning from Human Feedback, RLHFï¼‰æ?è¡“ã€‚åœ¨?™å€‹é?ç¨‹ä¸­ï¼Œäººé¡è?ç·´å“¡?ƒå?æ¨¡å??„ä??Œå?ç­”é€²è?è©•å??Œæ?åºï?æ¨¡å??‡æ ¹?šé€™ä??é?ä¾†èª¿?´å…¶è¡Œç‚ºï¼Œä½¿?¶è¼¸?ºæ›´ç¬¦å?äººé??„æ??›ï?ä¾‹å??´æ?ç¢ºåœ°?µå¾ª?‡ä»¤?æ?å°‘æ?å®³æ?å¸¶æ??è??„å…§å®¹ã€? :
          'The core technology of ChatGPT can be precisely explained through its full name GPT (Generative Pre-trained Transformer). These three words reveal its architecture, training methods, and core functions.',
        keyPoints: isZhHK ? [
          'Transformerï¼šåŸº?¼è‡ªæ³¨æ??›æ??¶ç?åº•å±¤?€è¡“æ¶æ§?,
          '?è?ç·´ï??¡ç›£??­¸ç¿’æµ·?æ??¬ï??æ¸¬ä¸‹ä??‹è?èª?,
          '?Ÿæ?å¼ï??µé€ å…¨?°å??µå…§å®¹ï??€?¥æ–¼?¤åˆ¥å¼æ¨¡??,
          'å¾®èª¿?æ®µï¼šä½¿?¨ç‰¹å®šä»»?™æ•¸?šé??²ä?æ­¥å„ª??,
          'RLHFï¼šäººé¡å?é¥‹å¼·?–å­¸ç¿’ï?ä½¿è¼¸?ºç¬¦?ˆäººé¡æ???
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
      title: isZhHK ? '?®å? 1.4ï¼šğ??ç²¾æ??¸æ?' : 'Unit 1.4: ?’³ Smart Choice',
      duration: '14?†é?',
      type: 'text' as const,
      description: isZhHK ? 'è¿½æº¯GPTæ¨¡å??„ç™¼å±•æ­·ç¨‹ï?äº†è§£æ¯ä?ä»?¨¡?‹ç??€è¡“ç??´å??½å??å??„é??µç?é»ã€? : 'Trace the development history of GPT models, understanding the technical breakthroughs and key capability improvements of each generation.',
      content: {
        transcript: isZhHK ? 
          'GPT æ¨¡å??„ç™¼å±•æ­·ç¨‹æ??°åœ°å±•ç¤ºäº?OpenAI ?„æ?è¡“æ??²è·¯å¾‘ï?æ¯ä?ä»?¨¡?‹éƒ½?¨è?æ¨¡å??½å?ä¸Šå¯¦?¾ä?é¡¯è??„é?èºã€‚é€™æ?è·¯å?ä¸å??¯æ?è¡“ç??ªç„¶å»¶ä¼¸ï¼Œä??æ?äº?OpenAI ?„ç”¢?å??°ç•¥ï¼šé??ˆå»ºç«‹ä??‹çŸ¥è­˜æ·µ?šç??Œå¤§?¦ã€ï??¶å??™å??Œè½?‚æ?ä»¤ã€ï??€å¾Œè³¦äºˆå??‡ä??Œå?ç¶­åº¦äº’å??„ã€Œæ?å®˜ã€ã€‚\n\nGPT-1 (2018)ï¼šä??ºé??µè€…ï?GPT-1 é¦–æ¬¡?å??°å? Transformer ?¶æ??‰ç”¨?¼ç??å??è?ç·´ä»»?™ã€‚å??æ? 1.17 ?„å€‹å??¸ï??¨ç•¶?‚ç?å¤šå€‹è‡ª?¶è?è¨€?•ç??ºæ?æ¸¬è©¦ä¸­å?å¾—ä??ªç•°?ç¸¾ï¼Œé?è­‰ä??™æ??€è¡“è·¯ç·šç??¯è??§ã€‚\n\nGPT-2 (2019)ï¼šå??¸è?æ¨¡å?è¨“ç·´?¸æ??å¤§å¹…æ??‡ï?å±•ç¾äº†ä»¤äººé?è¨ç??Œé›¶æ¨?œ¬å­¸ç??ï?Zero-shot learningï¼‰èƒ½?›ã€‚é€™æ??³è?å®ƒå¯ä»¥åœ¨æ²’æ?ä»»ä??¹å?ä»»å?ç¯„ä??„æ?æ³ä?ï¼Œå??‘æ?ä»¤å°±å®Œæ?ä¸€äº›æ–°ä»»å?ï¼Œé¡¯ç¤ºå‡º?´å¼·?„æ??–èƒ½?›ã€‚\n\nGPT-3 (2020)ï¼šé€™æ˜¯ä¸€?‹é?ç¨‹ç?å¼ç?æ¨¡å?ï¼Œæ???1750 ?„å€‹å??¸ã€‚å…¶?€é¡¯è??„ç??´æ˜¯å¼·å¤§?„ã€Œå?æ¨?œ¬å­¸ç??ï?Few-shot learningï¼‰èƒ½?›ï??³åª?€?¨æ?ç¤ºä¸­çµ¦å‡ºæ¥µå??¸ï?å¹¾å€‹ï?ç¯„ä?ï¼Œæ¨¡?‹å°±?½è??Ÿæ??¡æ–°ä»»å??„æ¨¡å¼ä¸¦?‰ä??ä??‚\n\nInstructGPT (2022)ï¼šè??¶èªª?™æ˜¯ä¸‹ä?ä»?¨¡?‹ï?ä¸å?èªªæ˜¯ä¸€æ¬¡æ–¹?‘æ€§ç?è½‰è??‚OpenAI ?¼ç¾ï¼Œå??…ã€Œå?å­¸ã€ç?æ¨¡å?ä¸¦ä?ç¸½æ˜¯?Œæ??¨ã€æ??Œå??¨ã€ã€‚InstructGPT ?é?å¼•å…¥äº?RLHF è¨“ç·´?¹æ?ï¼Œæ—¨?¨è§£æ±?AI ?„ã€Œå?é½Šã€ï?Alignmentï¼‰å?é¡Œï??³ä½¿æ¨¡å??„è??ºå?è¼¸å‡º?´ç¬¦?ˆäººé¡ç??å??Œåƒ¹?¼è??‚é€™ä½¿å¾—æ¨¡?‹æ¥µå¤§åœ°?å?äº†éµå¾ªç”¨?¶æ?ä»¤ç??½å?ï¼Œç‚º ChatGPT ?„è??Ÿå?å®šä??œéµ?ºç??‚\n\nGPT-4 (2023)ï¼šGPT-4 ä¸å??¨è?è¨€?†è§£?é?è¼¯æ¨?†å?æº–ç¢º?§ä??¸æ? GPT-3.5 ?‰ä?è³ªç?é£›è?ï¼Œæ›´?è??„æ˜¯ï¼Œå??ç‚ºäº†ä??‹ã€Œå?æ¨¡æ??ï?multimodalï¼‰æ¨¡?‹ã€‚å?é¦–æ¬¡?·å?äº†è??†æ??¬ä»¥å¤–ä¿¡?¯ç??½å?ï¼Œèƒ½å¤ æ¥?¶å??†è§£?–å?è¼¸å…¥ï¼Œä?å¦‚è§£?‹ä?å¼µå?è¡¨ç??§å®¹?–æ?è¿°ä?å¼µç…§?‡ç??´æ™¯?‚\n\nGPT-4o (2024)ï¼šo ä»?¡¨ "omni"ï¼ˆå…¨?½ï?ï¼Œæ?èªŒè? OpenAI ?¨å?æ¨¡æ?äº¤ä?ä¸Šç??ˆä??å¤§çªç ´?‚GPT-4o ?¯é??‹åœ¨?®ä?ç¥ç?ç¶²çµ¡æ¨¡å?ä¸­å??Ÿæ•´?ˆä??‡æœ¬?éŸ³è¨Šå?è¦–è¦º?•ç??½å??„æ¨¡?‹ã€‚é€™ä½¿å¾—å??½å?å¯¦ç¾è¿‘ä??³æ??„ã€æ¥µ?¶è‡ª?¶ç?å¯¦æ?èªéŸ³å°è©±ï¼Œä¸¦?½å??‚ç?è§?”¨?¶ç?èªéŸ³?Œæ??é ­?•æ??°ç?è¦–è¦ºä¿¡æ¯ï¼Œæ¥µå¤§åœ°?‰è?äº?AI äº¤ä??‡äººé¡è‡ª?¶æ??šç?è·é›¢?? :
          'The development history of GPT models clearly demonstrates OpenAI\'s technical evolution path, with each generation achieving significant leaps in scale and capabilities.',
        keyPoints: isZhHK ? [
          'GPT-1 (2018)ï¼šé??µè€…ï?é¦–æ¬¡å°‡Transformer?‰ç”¨?¼ç??å??è?ç·?,
          'GPT-2 (2019)ï¼šå??¾é›¶æ¨?œ¬å­¸ç??½å?ï¼Œæ??‡æ??–æ€§èƒ½',
          'GPT-3 (2020)ï¼?750?„å??¸é?ç¨‹ç?ï¼Œå¼·å¤§å?æ¨?œ¬å­¸ç??½å?',
          'InstructGPT (2022)ï¼šå??¥RLHFï¼Œè§£æ±ºAIå°é??é?',
          'GPT-4 (2023)ï¼šå?æ¨¡æ?çªç ´ï¼Œæ”¯?´å??ç?è§?,
          'GPT-4o (2024)ï¼šå…¨?½å?æ¨¡å?ï¼Œå??Ÿæ•´?ˆæ??¬ã€éŸ³è¨Šã€è?è¦?
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
      title: isZhHK ? '?®å? 1.5ï¼šğ?¡ï? å®‰å…¨è¨»å?' : 'Unit 1.5: ?›¡ï¸?Secure Registration',
      duration: '13?†é?',
      type: 'text' as const,
      description: isZhHK ? 'äº†è§£OpenAIå¾é??Ÿåˆ©?”ç©¶å¯¦é?å®¤åˆ°AIå·¨é ­?„è??‹æ­·ç¨‹ï?ä»¥å??œéµäººç‰©?Œæˆ°?¥æ±ºç­–ã€? : 'Understand OpenAI\'s transformation from a non-profit research lab to an AI giant, including key figures and strategic decisions.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?„æ©«ç©ºå‡ºä¸–ï?è®“å…¶?Œå??„é??¼æ?æ§?OpenAI å¾ä??‹åœ¨äººå·¥?ºèƒ½?”ç©¶?˜å??™å?å°Šæ•¬?„å?å­—ï?ä¸€èºæ??ºå…¨?ƒç??€?Œç??¦é??Œå®¶?»æˆ¶?‰ç??ç??‚\n\n?µç??‡å?è¡?(2015)ï¼šOpenAI ??2015 å¹´ç”±ä¸€ç¾¤ç??€?Œç?? è??…å…±?Œå‰µç«‹ï??¶ä¸­?…æ‹¬ Sam Altman?Elon Musk?Greg Brockman ??Ilya Sutskever ç­‰äºº?‚å…¶?€?ç?å½¢æ??¯ä??‹é??Ÿåˆ©?”ç©¶å¯¦é?å®¤ï??·æŠ±?—ä??‹å?å¤§ç?ä½¿å‘½ï¼šç¢ºä¿é€šç”¨äººå·¥?ºèƒ½ï¼ˆArtificial General Intelligence, AGIï¼‰ç??¼å??½å?å®‰å…¨?è?è²¬ä»»?°é€ ç??¨äººé¡ï??Œä??¯è¢«å°‘æ•¸å·¨é ­å£Ÿæ–·?–å?äººé?æ§‹æ?å¨è??‚\n\nè½‰å??‡å¾®è»Ÿç??°ç•¥?ˆä?ï¼šéš¨?—ç?ç©¶ç?æ·±å…¥ï¼ŒOpenAI ?è??°è?ç·´é?å°–å¤§?‹è?è¨€æ¨¡å??€è¦æ¥µ?¶é?å¤§ç?è¨ˆç?è³‡æ??Œè??‘æ??¥ï??™é??ä??‹é??Ÿåˆ©çµ„ç??€?½è??”ã€‚ç‚ºäº†æ?å°é€™ä??‘æˆ°ï¼ŒOpenAI ??2019 å¹´é€²è?äº†ç?æ§‹é?çµ„ï??ç?äº†ä?å®¶å???OpenAI LP ?„ã€Œåˆ©æ½¤ä??ã€ï?capped-profitï¼‰å…¬?¸ã€‚é€™ä??¨ç‰¹?„ç?æ§‹æ—¨?¨å¹³è¡¡å…¶è¿½æ?ç§‘ç?ä½¿å‘½?‡å¸å¼•å?æ¥­æ?è³‡ç??€æ±‚ã€‚å?å¹´ï?å¾®è???OpenAI ?²è?äº?10 ?„ç??ƒç??å??•è?ï¼Œä¸¦?¨éš¨å¾Œç?å¹¾å¹´è£¡è¿½? ä??¸å??„ç??ƒï??ç‚º?¶æ??è??„æˆ°?¥å?ä½œå¤¥ä¼´ï??ºå…¶?ä?äº†æ??€??Azure ?²è?ç®—è?æºã€‚\n\n?œéµäººç‰©ï¼šå…¬?¸ç??ˆé?äººç‰©?¯å…¶?¯å??µå?äººå…¼è¡Œæ”¿ç¸½è? Sam Altman?‚åœ¨?·æ? OpenAI ä¹‹å?ï¼ŒAltman ä»¥å…¶ä½œç‚º?—å??å‰µä¼æ¥­å­µå???Y Combinator ç¸½è??„ç?æ­·è€Œè??ï??å?å­µå?äº?Airbnb?Reddit ç­‰çœ¾å¤šçŸ¥?ä?æ¥­ã€‚ä??‘è??¶åœ¨ç§‘æ??Œç?å½±éŸ¿?›å??“è??„é?å°å?ï¼Œå¸¶??OpenAI å¾ä??‹ç?ç©¶æ?æ§‹è??‹ç‚ºä¼°å€¼æ•¸?¾å?ç¾å???AI å·¨é ­?‚å¦ä¸€ä½å??—é?æ³¨ç??µå?äº?Elon Musk ?‡å?å°å…¬?¸ç™¼å±•æ–¹?‘å?å®‰å…¨?é??„æ??‚ï???2018 å¹´é›¢?‹ä? OpenAI ????ƒï?ä¸¦åœ¨ä¹‹å??µç?äº†è‡ªå·±ç? AI ?¬å¸ xAI?‚\n\nChatGPT ?„å??†é? (2022)ï¼šå?ç®?OpenAI ?¨æ­¤ä¹‹å?å·²ç??¼å?äº†å??‹ç??¬ç? GPT æ¨¡å?ï¼Œä¸¦?¨å­¸è¡“ç??Œé??¼è€…ç¤¾?€ä¸­äº«?‰ç?è­½ï?ä½†ç?æ­???¶ç??´å?å±¤ã€å??¼å…¨?ƒæ€§é?æ³¨ç?ï¼Œæ˜¯ 2022 å¹?11 ?ˆç™¼å¸ƒç? ChatGPT?‚å…¶æ¥µå…¶?“ç”¨?„å?è©±ç??¢å?å¼·å¤§?„èƒ½?›ï?è¿…é€Ÿå¸å¼•ä??¸ä»¥?„è??„ç”¨?¶ï?å¼•ç?äº†å…¨?ƒç??å…§?„ç??å? AI ?±æ½®ï¼Œä¸¦ä¿ƒä½¿ Google?Meta ç­‰ç??€å·¨é ­ç´›ç?? é€Ÿæ¨?ºè‡ªå·±ç?ç«¶å??? :
          'The emergence of ChatGPT has transformed OpenAI from a respected name in AI research into a global tech focus and household brand.',
        keyPoints: isZhHK ? [
          '?µç??è¡· (2015)ï¼šé??Ÿåˆ©?”ç©¶å¯¦é?å®¤ï?ç¢ºä?AGIå®‰å…¨? ç?äººé?',
          '?°ç•¥è½‰å? (2019)ï¼šé?çµ„ç‚º?©æ½¤ä¸Šé??¬å¸ï¼Œå¹³è¡¡ä½¿?½è??•è?',
          'å¾®è??ˆä?ï¼?0?„ç??ƒå?å§‹æ?è³‡ï??ä?Azure?²è?ç®—è?æº?,
          '?œéµäººç‰©ï¼šSam Altman (CEO)?Elon Musk (å·²é›¢???Ilya Sutskever',
          'ChatGPTå¼•ç?é»?(2022)ï¼šç??´å?å±¤ï?å¼•ç™¼?¨ç??Ÿæ?å¼AI?±æ½®',
          'è¡Œæ¥­å½±éŸ¿ï¼šä?ä½¿Google?Metaç­‰å·¨?­å??Ÿæ¨?ºç«¶??
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

    // ç¬¬ä?ç« ï??æ¢?€å¾???å¸³æˆ¶è¨­å??‡ä??¢å?è¦?    '6': {
      id: 6,
      themeId: 2,
      title: isZhHK ? '?®å? 2.1ï¼šä¸»ä»‹é¢æ·±åº¦å°è¦½ï¼šå?è©±è?çª—ã€æ­·?²ç???(History) ?‡è¨­å®šå?' : 'Unit 2.1: Main Interface Deep Tour: Chat Window, History & Settings',
      duration: '12?†é?',
      type: 'text' as const,
      description: isZhHK ? 'è©³ç´°ä»‹ç´¹ ChatGPT ä¸»ä??¢ç??„å€‹å?ç´ ï??…æ‹¬å°è©±è¦–ç??ä??æ­·?²ç??„ç®¡?†å?è¨­å??€?Ÿèƒ½?? : 'Detailed introduction to ChatGPT main interface elements, including chat window operations, history management, and settings functionality.',
      content: {
        transcript: isZhHK ? 
          '?¶æ‚¨é¦–æ¬¡?»å…¥ ChatGPT ?‚ï??¨æ??‹åˆ°ä¸€?‹ç°¡æ½”è€Œå??½è?å¯Œç?ä¸»ä??¢ã€‚ç?è§?€™å€‹ä??¢ç?æ¯å€‹å?ç´ å?å¹«åŠ©?¨æ›´?‰æ??°ä½¿??ChatGPT?‚\n\nå°è©±è¦–ç??¯æ•´?‹ä??¢ç??¸å?ï¼Œä??¼è¢å¹•ä¸­å¤®ã€‚é€™è£¡?¯æ‚¨??ChatGPT ?²è?å°è©±?„ä¸»è¦å??Ÿã€‚åœ¨å°è©±è¦–ç??„å??¨ï??¨æ??¾åˆ°?‡å?è¼¸å…¥æ¡†ï??™æ˜¯?¨è¼¸?¥å?é¡Œæ??‡ä»¤?„åœ°?¹ã€‚è¼¸?¥æ??¯æ´å¤šè??‡å?ï¼Œæ‚¨?¯ä»¥??Shift+Enter ä¾†æ?è¡Œï??Œå–®ç´”æ? Enter ?‡æ??å‡ºè¨Šæ¯?‚\n\nå·¦å´?Šæ??…å«?¨ç?å°è©±æ­·å²ç´€?„ã€‚æ?æ¬¡é?å§‹æ–°å°è©±?‚ï?ChatGPT ?½æ??ªå??µå»ºä¸€?‹æ–°?„å?è©±æ??®ã€‚é€™ä?å°è©±?ƒæ??‚é??†å??’å?ï¼Œæ??°ç?å°è©±é¡¯ç¤º?¨æ?ä¸Šæ–¹?‚æ‚¨?¯ä»¥é»æ?ä»»ä?ä¸€?‹æ­·?²å?è©±ä??æ–°?“é?å®ƒï?ç¹¼ç?ä¹‹å??„è?è«–ã€‚\n\n?¨å·¦?´é?æ¬„ç??‚éƒ¨ï¼Œæ‚¨?ƒç??°ã€ŒNew Chat?æ??•ï?é»æ?å®ƒå¯ä»¥é?å§‹å…¨?°ç?å°è©±?‚è?ä½ï?æ¯å€‹å?è©±éƒ½?¯ç¨ç«‹ç? - ChatGPT ä¸æ?è¨˜ä??¶ä?å°è©±ä¸­ç??§å®¹?‚\n\n?³ä?è§’ç??‹äººè³‡æ??€?Ÿæ?ä¾›å??¨å¸³?¶ç?å­˜å??‚é€™è£¡?¨å¯ä»¥ç®¡?†è??±ã€æŸ¥?‹ä½¿?¨æ?æ³ï?ä»¥å?å­˜å??è?è¨­å??‚å???ChatGPT Plus ?¨æˆ¶ï¼Œé€™è£¡?„æ?é¡¯ç¤º?¨ç?è¨‚é–±?€?‹å??¯ç”¨?„é??å??½ã€? :
          'When you first log into ChatGPT, you\'ll see a clean yet feature-rich main interface. Understanding each element of this interface will help you use ChatGPT more effectively.',
        keyPoints: isZhHK ? [
          'å°è©±è¦–ç?ï¼šä??¢æ ¸å¿ƒï??²è? AI å°è©±?„ä¸»è¦å???,
          '?‡å?è¼¸å…¥æ¡†ï??¯æ´å¤šè?è¼¸å…¥ï¼ŒShift+Enter?›è?ï¼ŒEnter?å‡º',
          'æ­·å²ç´€?„ï?å·¦å´?Šæ?é¡¯ç¤º?€?‰å?è©±ï??‰æ??“æ?åº?,
          'New Chat ?‰é?ï¼šé?å§‹å…¨?°ç¨ç«‹å?è©?,
          '?‹äººè³‡æ??€ï¼šç®¡?†å¸³?¶ã€è??±å?è¨­å?'
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
      title: isZhHK ? '?®å? 2.2ï¼šå?è©±ç®¡?†æ?å·§ï?å¦‚ä??‰æ??½å? (Rename)?å?äº?(Share) ?‡åˆª??(Delete) å°è©±' : 'Unit 2.2: Conversation Management: Rename, Share & Delete Conversations',
      duration: '10?†é?',
      type: 'text' as const,
      description: isZhHK ? 'å­¸ç?å¦‚ä??‰æ?ç®¡ç??¨ç? ChatGPT å°è©±ï¼Œå??¬é??°å‘½?ã€å?äº«é€???Œåˆª?¤ä??€è¦ç?å°è©±?? : 'Learn how to effectively manage your ChatGPT conversations, including renaming, sharing links, and deleting unnecessary conversations.',
      content: {
        transcript: isZhHK ? 
          '?‰æ??„å?è©±ç®¡?†æ˜¯?å? ChatGPT ä½¿ç”¨é«”é??„é??µã€‚éš¨?—æ‚¨ä½¿ç”¨ ChatGPT ?„æ??“å??·ï??¨æ?ç´¯ç?å¤§é??„å?è©±è??„ã€‚å­¸?ƒç®¡?†é€™ä?å°è©±å°‡å¹«?©æ‚¨å¿«é€Ÿæ‰¾?°é?è¦ç?è³‡è??‚\n\n?æ–°?½å?å°è©±?¯ç?ç¹”å?è©±ç?ç¬¬ä?æ­¥ã€‚é?è¨­æ?æ³ä?ï¼ŒChatGPT ?ƒæ ¹?šå?è©±ç??‹é ­å¹¾å¥è©±è‡ª?•å‘½?å?è©±ã€‚ä??¯ï??¨å¯ä»¥çµ¦å°è©±?–æ›´?‰æ?ç¾©ç??ç¨±?‚è??æ–°?½å?å°è©±ï¼Œåª?€å°‡æ?é¼ æ‡¸?œåœ¨å·¦å´?Šæ??„å?è©±æ?é¡Œä?ï¼Œé??Šå‡º?¾ç?ç·¨è¼¯?–ç¤ºï¼Œç„¶å¾Œè¼¸?¥æ–°?„å?ç¨±ã€‚å¥½?„å‘½?ç??¥å??¬ï?ä½¿ç”¨å°ˆæ??ç¨±?ä¸»é¡Œé??µå?ï¼Œæ??…æ—¥?Ÿæ?è¨˜ã€‚\n\n?†äº«å°è©±?Ÿèƒ½è®“æ‚¨?¯ä»¥?‡ä?äººå?äº«æ‚¨??ChatGPT å°è©±?‚é€™å??¼å??Šå?ä½œã€æ?å­¸ï??–å?ç¤?AI å¦‚ä?è§?±º?¹å??é??å¸¸?‰ç”¨?‚è??†äº«å°è©±ï¼Œé??Šå?è©±æ??„å?äº«å?ç¤ºï?ChatGPT ?ƒç??ä??‹å…¬?‹é€???‚é?è¦æ??’ï??†äº«?„å?è©±å?è®Šæ??¬é??¯è?ï¼Œä»»ä½•æ??‰é€???„äºº?½å¯ä»¥æŸ¥?‹ï?? æ­¤è«‹ç¢ºä¿ä?è¦å?äº«å??«æ??Ÿè?è¨Šç?å°è©±?‚\n\n?ªé™¤å°è©±?Ÿèƒ½å¹«åŠ©?¨ä??å?è©±å?è¡¨ç??´æ??‚è??ªé™¤å°è©±ï¼Œé??Šå?è©±æ??„åˆª?¤å?ç¤ºã€‚è?æ³¨æ?ï¼Œä??¦åˆª?¤å?è©±ï?è©²æ?ä½œç„¡æ³•æ’¤?·ï??€?‰å?è©±å…§å®¹å?æ°¸ä?æ¶ˆå¤±?‚å?æ­¤ï??¨åˆª?¤é?è¦å?è©±ä??ï?è«‹ä??è€Œå?è¡Œã€‚\n\nå»ºè­°?„ç®¡?†ç??¥ï??ºé?è¦å?æ¡ˆå»ºç«‹å??€?„å?è©±ä¸¦çµ¦ä?æ¸…æ™°?„å‘½?ï?å®šæ?æ¸…ç?æ¸¬è©¦?§æ??¨æ??§ç?å°è©±ï¼›å??‰åƒ¹?¼ç?å°è©±?¶è??–åŒ¯?ºé?è¦å…§å®¹ã€? :
          'Effective conversation management is key to enhancing your ChatGPT experience. As you use ChatGPT longer, you\'ll accumulate many conversation records.',
        keyPoints: isZhHK ? [
          '?æ–°?½å?ï¼šä½¿?¨å?æ¡ˆå?ç¨±ã€ä¸»é¡Œé??µå??–æ—¥?Ÿæ?è¨?,
          '?†äº«?Ÿèƒ½ï¼šç??å…¬?‹é€??ï¼Œé©?ˆå??Šå?ä½œå??™å­¸',
          'æ³¨æ??±ç?ï¼šå?äº«ç?å°è©±è®Šæ??¬é??¯è?ï¼Œé¿?æ??Ÿè?è¨?,
          '?ªé™¤ç®¡ç?ï¼šæ?ä½œç„¡æ³•æ’¤?·ï??ªé™¤?è?ä¸‰æ€?,
          'ç®¡ç?ç­–ç•¥ï¼šå??€?½å??å??Ÿæ??†ã€æ”¶?é?è¦å…§å®?
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
      title: isZhHK ? '?®å? 2.3ï¼šCustom Instructions (?ªè??‡ä»¤)ï¼šæ?? ä??„å€‹äºº??AI ?©æ?ï¼Œè?æ¯æ¬¡?ç??´è²¼å¿? : 'Unit 2.3: Custom Instructions: Create Your Personal AI Assistant',
      duration: '15?†é?',
      type: 'text' as const,
      description: isZhHK ? 'å­¸ç?å¦‚ä?è¨­å??ªè??‡ä»¤ï¼Œè? ChatGPT ?´ä?è§?‚¨?„é?æ±‚å??å¥½ï¼Œæ?ä¾›æ›´?‹äºº?–ç??ç??? : 'Learn how to set up custom instructions to make ChatGPT better understand your needs and preferences for more personalized responses.',
      content: {
        transcript: isZhHK ? 
          'Custom Instructionsï¼ˆè‡ªè¨‚æ?ä»¤ï???ChatGPT Plus ?¨æˆ¶?¯ä½¿?¨ç?å¼·å¤§?Ÿèƒ½ï¼Œå??è¨±?¨ç‚º?€?‰æ–°å°è©±è¨­å??è¨­?„è??¯è?è¨Šå??ç??å¥½?‚é€™å€‹å??½å°±?æ˜¯çµ?ChatGPT ä¸€ä»½ã€Œä½¿?¨æ??Šã€ï??Šè¨´å®ƒæ‚¨?¯èª°?æ‚¨?„å·¥ä½œæ€§è³ªï¼Œä»¥?Šæ‚¨å¸Œæ?å®ƒå?ä½•å?ç­”å?é¡Œã€‚\n\nè¨­å??ªè??‡ä»¤?†ç‚º?©å€‹ä¸»è¦éƒ¨?†ï??Œé??¼æ‚¨?å??Œæ‚¨å¸Œæ? ChatGPT å¦‚ä??æ??ã€‚\n\n?¨ã€Œé??¼æ‚¨?ç??¨å?ï¼Œæ‚¨?¯ä»¥?ä??‹äºº?Œæ™¯è³‡è??‚ä?å¦‚ï??¨ç??·æ¥­ï¼ˆã€Œæ??¯ä??è?é«”å·¥ç¨‹å¸«?ï??å?æ¥­é??Ÿï??Œå?ç²¾æ–¼æ©Ÿå™¨å­¸ç??ï??ç•¶?å?æ¡ˆï??Œæ­£?¨é??¼ä??‹é›»?†å¹³?°ã€ï??å­¸ç¿’ç›®æ¨™ï??Œæƒ³è¦å­¸ç¿?Python ç¨‹å?è¨­è??ï?ç­‰ã€‚é€™ä?è³‡è?å¹«åŠ© ChatGPT ?†è§£?¨ç?èº«ä»½?Œé?æ±‚ã€‚\n\n?¨ã€Œæ‚¨å¸Œæ? ChatGPT å¦‚ä??æ??ç??¨å?ï¼Œæ‚¨?¯ä»¥è¨­å??ç??„é¢¨?¼å??¼å??å¥½?‚ä?å¦‚ï??Œè??¨ç?é«”ä¸­?‡å?ç­”ã€ã€ã€Œå?ç­”è?ç°¡æ??ç­ï¼Œä?è¶…é? 200 å­—ã€ã€ã€Œåœ¨?ç??€è¡“å?é¡Œæ?ï¼Œè??ä?å¯¦é??„ç?å¼ç¢¼ç¯„ä??ã€ã€Œä½¿?¨å??„ä?å°ˆæ¥­?„è?èª¿ã€ç??‚\n\n?‰æ??„è‡ªè¨‚æ?ä»¤ç?ä¾‹ï?\nå°æ–¼å­¸ç?ï¼šã€Œæ??¯è?è¨Šå·¥ç¨‹ç³»äºŒå¹´ç´šå­¸?Ÿï?æ­?œ¨å­¸ç?è³‡æ?çµæ??‡æ?ç®—æ??‚è??¨æ·ºé¡¯æ??‚ç??¹å?è§??æ¦‚å¿µï¼Œä¸¦?ä? Python ç¨‹å?ç¢¼ç?ä¾‹ã€‚ã€\nå°æ–¼å°ˆæ¥­äººå£«ï¼šã€Œæ??¯ç”¢?ç??†ï?è² è²¬ B2B SaaS ?¢å??‚åœ¨è¨è??†æ¥­ç­–ç•¥?‚ï?è«‹è??æ–¼å¯¦é??·è??§å??•è??±é…¬?‡å??ã€‚ã€\n\nè¨˜ä?ï¼Œä??¦è¨­å®šä??ªè??‡ä»¤ï¼Œå??ƒå??¨åˆ°?€?‰æ–°?„å?è©±ä¸­ï¼Œä?ä¸æ?å½±éŸ¿?¾æ??„å?è©±ã€‚æ‚¨?¯ä»¥?¨æ?ä¿®æ”¹?–å??¨é€™ä??‡ä»¤?? :
          'Custom Instructions is a powerful feature available to ChatGPT Plus users, allowing you to set default background information and response preferences for all new conversations.',
        keyPoints: isZhHK ? [
          '?©å¤§è¨­å?ï¼šã€Œé??¼æ‚¨?æ?ä¾›å€‹äºº?Œæ™¯ï¼Œã€Œå??‰å?å¥½ã€è¨­å®šé¢¨??,
          '?‹äºº?Œæ™¯ï¼šè·æ¥­ã€å?æ¥­é??Ÿã€ç•¶?å?æ¡ˆã€å­¸ç¿’ç›®æ¨?,
          '?æ??å¥½ï¼šè?è¨€?é•·åº¦ã€æ ¼å¼ã€è?èª¿ç?è¨­å?',
          'å¯¦é??‰ç”¨ï¼šç‚ºå­¸ç??å?æ¥­äººå£«ç?ä¸å?è§’è‰²å®¢è£½??,
          'ä½¿ç”¨ç¯„å?ï¼šå?å¥—ç”¨?°æ–°å°è©±ï¼Œå¯?¨æ?ä¿®æ”¹?–å???
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
      title: isZhHK ? '?®å? 2.4ï¼šæ?æ©?App ?¨æ??Ÿèƒ½ï¼šè??³å?è©±è??–å?è¾¨è?å¯¦æˆ°' : 'Unit 2.4: Mobile App Exclusive Features: Voice Chat & Image Recognition',
      duration: '13?†é?',
      type: 'text' as const,
      description: isZhHK ? '?¢ç´¢ ChatGPT ?‹æ??‰ç”¨ç¨‹å??„ç¨?¹å??½ï??…æ‹¬èªéŸ³å°è©±?Œå??è¾¨è­˜ï??å?è¡Œå?è£ç½®ä½¿ç”¨é«”é??? : 'Explore the unique features of ChatGPT mobile app, including voice conversations and image recognition, enhancing mobile device user experience.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?‹æ??‰ç”¨ç¨‹å??ä?äº†ç¶²?ç??¬æ??‰ç??¨ç‰¹?Ÿèƒ½ï¼Œè??¨å¯ä»¥æ›´?ªç„¶?æ›´ä¾¿åˆ©?°è? AI äº’å??‚é€™ä??Ÿèƒ½?¹åˆ¥?©å??¨ç§»?•ä¸­ä½¿ç”¨ï¼Œæ??¶æ‚¨?€è¦æ›´?³æ??æ›´?´è??„äº¤æµæ–¹å¼æ??‚\n\nèªéŸ³å°è©±?Ÿèƒ½?¯æ?æ©?App ?„äº®é»ä?ä¸€?‚é€™å€‹å??½è??¨å¯ä»¥ç›´?¥è? ChatGPT ?²è?èªéŸ³å°è©±ï¼Œå°±?è??Ÿäºº?Šå¤©ä¸€æ¨?€‚è?ä½¿ç”¨èªéŸ³?Ÿèƒ½ï¼Œåª?€é»æ?è¨Šæ¯è¼¸å…¥æ¡†æ??„éº¥?‹é¢¨?–ç¤ºï¼Œç„¶å¾Œé?å§‹èªªè©±ã€‚ChatGPT ?ƒå??¨ç?èªéŸ³è½‰æ??æ?å­—ï??•ç?å¾Œå?ä»¥è??³å??‰æ‚¨?‚\n\nèªéŸ³å°è©±?„å„ª?¢å??¬ï?è§?”¾?™æ?ï¼Œé©?ˆé?é§›æ??‹å??‚ä½¿?¨ï??´è‡ª?¶ç?äº¤æ??¹å?ï¼Œç‰¹?¥é©?ˆç·´ç¿’è?è¨€?–é€²è??µæ??¼æƒ³ï¼›æ?é«˜æ??‡ï?èªªè©±?šå¸¸æ¯”æ?å­—æ›´å¿«ï?å¤šè?è¨€?¯æ´ï¼Œå¯ä»¥ç·´ç¿’ä??Œè?è¨€?„ç™¼?³å?å°è©±?‚\n\n?–å?è¾¨è??Ÿèƒ½è®“æ‚¨?¯ä»¥ä¸Šå‚³?§ç?ä¸¦è? ChatGPT ?†æ??Œæ?è¿°å??å…§å®¹ã€‚é€™å€‹å??½åœ¨å¾ˆå?å¯¦é??´æ™¯ä¸­éƒ½?å¸¸?‰ç”¨ï¼šè??¥æ??©ã€å??©æ??©å?ï¼›è§£è®€?–è¡¨?æ?ä»¶æ??‹å¯«ç­†è?ï¼›å??è?è¡“ä??æ?å»ºç?ï¼›å??©è?è¦ºé?ç¤™ç”¨?¶ç?è§???å…§å®¹ã€‚\n\nè¦ä½¿?¨å??å??½ï?é»æ?è¨Šæ¯è¼¸å…¥æ¡†æ??„ç›¸æ©Ÿå?ç¤ºï??¶å??¸æ??ç…§?–å??¸ç°¿?¸æ??§ç??‚ä??³å?ï¼Œæ‚¨?¯ä»¥è©¢å? ChatGPT ?œæ–¼?–å??„ä»»ä½•å?é¡Œï?ä¾‹å??Œé€™æ˜¯ä»€éº¼æ??©ï??æ??Œè??è¿°?™å¼µ?–ç??„å…§å®¹ã€ã€‚\n\nä½¿ç”¨?€å·§ï?ç¢ºä??§ç?æ¸…æ™°ï¼Œé¿?æ¨¡ç³Šæ??‰ç?ä¸è¶³ï¼›æ?ä¾›å…·é«”ç??é?ï¼Œè€Œä??¯åª?¯ã€Œé€™æ˜¯ä»€éº¼ï??ï?å°æ–¼è¤‡é??–å?ï¼Œå¯ä»¥æ??ºæ‚¨?³ä?è§???¹å??¨å?ï¼›åˆ©?¨å??å??½å­¸ç¿’æ–°?¥è?ï¼Œä?å¦‚è??¥å»ºç¯‰é¢¨?¼æ??è?æµæ´¾?? :
          'The ChatGPT mobile app provides unique features not available in the web version, allowing for more natural and convenient AI interaction.',
        keyPoints: isZhHK ? [
          'èªéŸ³å°è©±ï¼šéº¥?‹é¢¨?–ç¤º?Ÿå?ï¼Œè??³è??‡å??è??³å???,
          'èªéŸ³?ªå‹¢ï¼šè§£?¾é??‹ã€è‡ª?¶äº¤æµã€æ?é«˜æ??‡ã€å?èªè??¯æ´',
          '?–å?è¾¨è?ï¼šä??³ç…§?‡è? ChatGPT ?†æ??Œæ?è¿°å…§å®?,
          'å¯¦ç”¨?´æ™¯ï¼šè??¥ç‰©?ã€è§£è®€?‡ä»¶?å??è?è¡“ã€è??©è???,
          'ä½¿ç”¨?€å·§ï?æ¸…æ™°?§ç??å…·é«”å?é¡Œã€æ?å®šéƒ¨?†ã€å­¸ç¿’æ???
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
      title: isZhHK ? '?®å? 2.5ï¼šæ¢ç´?GPT Storeï¼šå?ä½•å??¾ã€è?ä¼°å?ä½¿ç”¨?¥äººå»ºç??„å„ªç§€ GPTs' : 'Unit 2.5: Exploring GPT Store: Finding, Evaluating & Using GPTs',
      duration: '14?†é?',
      type: 'text' as const,
      description: isZhHK ? 'æ·±å…¥äº†è§£ GPT Store ?„ä½¿?¨æ–¹æ³•ï?å­¸æ?å¦‚ä??¾åˆ°?©å??„è‡ªè¨?GPTï¼Œä¸¦?‰æ?è©•ä¼°?Œä½¿?¨å??‘ã€? : 'Deep dive into GPT Store usage, learn how to find suitable custom GPTs and effectively evaluate and use them.',
      content: {
        transcript: isZhHK ? 
          'GPT Store ??OpenAI ?¨å‡º?„ä??‹å??†å¹³?°ï?é¡ä¼¼?¼æ?æ©Ÿç? App Storeï¼Œä?å°ˆé??¨æ–¼?†äº«?Œç™¼?¾è‡ªè¨‚ç? GPT ?‰ç”¨ç¨‹å??‚é€™å€‹å¹³?°è??¨ä??Œç??‹ç™¼?…å??µä??…å¯ä»¥å»ºç«‹å??€?–ç? AI ?©æ?ï¼Œä¸¦?‡å…¶ä»–ç”¨?¶å?äº«ã€‚\n\nè¦é€²å…¥ GPT Storeï¼Œæ‚¨?€è¦æ˜¯ ChatGPT Plus è¨‚é–±?¨æˆ¶?‚åœ¨ ChatGPT ä»‹é¢ä¸­ï?é»æ?å·¦ä?è§’ç??ŒExplore GPTs?æ??¨æ–°å°è©±ä¸­é¸?‡ã€ŒGPT Store?é¸?…ã€‚é€²å…¥å¾Œï??¨æ??‹åˆ°?„ç¨®?†é???GPTï¼Œå??¬ï??Ÿç”¢?›å·¥?·ã€æ??²åŠ©?‹ã€å‰µ?å¯«ä½œã€ç?å¼è¨­è¨ˆã€è?è¨€å­¸ç?ç­‰ã€‚\n\nå°‹æ‰¾?©å???GPT ?‰å¹¾?‹ç??¥ï?\n\nä½¿ç”¨?œå??Ÿèƒ½ï¼šç›´?¥æ?å°‹é??µå?ï¼Œä?å¦‚ã€ŒPython ç¨‹å?è¨­è??ã€ã€Œç°¡æ­·æ’°å¯«ã€æ??Œè?è¨€ç¿»è­¯?ã€‚\n\n?è¦½?†é?ï¼šGPT Store å°?GPT ?†ç‚ºä¸å?é¡åˆ¥ï¼Œæ‚¨?¯ä»¥?¹æ??€æ±‚ç€è¦½?¸æ??†é??‚\n\n?¥ç??±é??Œæ¨?¦ï?å¹³å°?ƒæ¨?¦ç†±?€?Œé??è³ª??GPTï¼Œé€™ä??šå¸¸?¯ç??é?è­‰ç??ªç??‰ç”¨?‚\n\nè©•ä¼° GPT ?è³ª?„é??µæ?æ¨™ï?\n\n?¨æˆ¶è©•å??Œè?è«–ï??¥ç??¶ä??¨æˆ¶?„è??¹å?ä½¿ç”¨ç¶“é??‚\n\n?‹ç™¼?…è?è¨Šï?äº†è§£?µå»º?…ç??Œæ™¯?Œå?æ¥­ç?åº¦ã€‚\n\n?Ÿèƒ½?è¿°ï¼šä?ç´°é–±è®€ GPT ?„å??½èªª?å?ä½¿ç”¨æ¡ˆä??‚\n\n?´æ–°?»ç?ï¼šå??Ÿæ›´?°ç? GPT ?šå¸¸ç¶­è­·å¾—æ›´å¥½ã€‚\n\nä½¿ç”¨ GPT ?„æ?ä½³å¯¦è¸ï?\n\n?ˆé–±è®€ä½¿ç”¨èªªæ?ï¼šæ???GPT ?½æ??¹å??„ä½¿?¨æ–¹æ³•å??‡ä»¤?¼å??‚\n\næ¸¬è©¦?ºæœ¬?Ÿèƒ½ï¼šå??¨ç°¡?®ç??é?æ¸¬è©¦ GPT ?„éŸ¿?‰å?è³ªã€‚\n\näº†è§£?åˆ¶ï¼šæ???GPT ?½æ??¶å??·é??Ÿå??åˆ¶ï¼Œä?è§?€™ä??‰åŠ©?¼æ›´å¥½åœ°ä½¿ç”¨?‚\n\n?ä?æ¸…æ™°?‡ä»¤ï¼šå°±?ä½¿?¨æ?æº?ChatGPT ä¸€æ¨??æ¸…æ™°?„æ?ä»¤æ??¢ç??´å¥½?„ç??œã€? :
          'GPT Store is a marketplace platform launched by OpenAI, similar to a mobile App Store, but specifically for sharing and discovering custom GPT applications.',
        keyPoints: isZhHK ? [
          'GPT Storeï¼šOpenAI å¸‚é?å¹³å°ï¼Œé? ChatGPT Plus è¨‚é–±',
          'å°‹æ‰¾ç­–ç•¥ï¼šæ?å°‹é??µå??ç€è¦½?†é??æŸ¥?‹ç†±?€?¨è–¦',
          'è©•ä¼°?‡æ?ï¼šç”¨?¶è??†ã€é??¼è€…è?è¨Šã€å??½æ?è¿°ã€æ›´?°é »??,
          'ä½¿ç”¨å¯¦è?ï¼šé–±è®€èªªæ??æ¸¬è©¦å??½ã€ä?è§???¶ã€æ??°æ?ä»?,
          '?†é?ç¯„ä?ï¼šç??¢å??æ??²ã€å‰µ?ã€ç?å¼è¨­è¨ˆã€è?è¨€å­¸ç?'
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

    // ç¬¬ä?ä¸»é?ï¼šæ?ä»¤ç??è? (Prompt Engineering)
    '11': {
      id: 11,
      themeId: 3,
      title: isZhHK ? '?®å? 3.1ï¼šå„ªè³ªæ?ä»¤ç??›å¤§?ºçŸ³ï¼šè???(Role)?ä»»??(Task)?è?çµ?(Context)?æ ¼å¼?(Format)' : 'Unit 3.1: Four Pillars of Quality Prompts: Role, Task, Context, Format',
      duration: '32?†é?',
      type: 'interactive' as const,
      description: isZhHK ? 'å­¸ç?æ§‹å»ºé«˜æ??ç¤ºè©ç??›å¤§?¸å?è¦ç?ï¼Œå»ºç«‹ç³»çµ±æ€§ç? Prompt è¨­è?æ¡†æ¶?? : 'Learn the four core elements for building effective prompts and establish a systematic prompt design framework.',
      content: {
        transcript: isZhHK ? 
          '?ªè³ª??Prompt è¨­è??‰å??‹æ ¸å¿ƒåŸº?³ï?è§’è‰² (Role)?ä»»??(Task)?è?çµ?(Context) ?Œæ ¼å¼?(Format)ï¼Œç°¡ç¨?RTCF æ¡†æ¶?‚\n\n**è§’è‰² (Role)**ï¼šæ?ç¢ºå?ç¾?ChatGPT ?‰è©²?®æ??„è??²å?èº«ä»½?‚ä?å¦‚ï??Œä??¯ä?ä½è?æ·±ç?å¸‚å ´?ŸéŠ·å°ˆå®¶?ã€ã€Œä??ºä??ç?é©—è?å¯Œç?ç¨‹å?è¨­è?å¸«ã€æ??Œæ‰®æ¼”ä?ä½è€å??„è‹±èªè€å¸«?ã€‚è??²è¨­å®šå¹«??AI ä»¥ç‰¹å®šç?å°ˆæ¥­è¦–è??Œè?èª¿ä??æ??‚\n\n**ä»»å? (Task)**ï¼šæ?æ¥šèªª?ä?å¸Œæ? AI å®Œæ??„å…·é«”ä»»?™ã€‚ä»»?™æ?è¿°æ?è©²å…·é«”ã€æ?ç¢ºï??¿å?æ¨¡ç??„è¡¨?”ã€‚ä?å¦‚ï??Œå¹«?‘æ’°å¯«ä?ä»½ç”¢?ç™¼å¸ƒæ??„æ–°?ç¨¿?è€Œé??Œå¹«?‘å¯«é»æ±è¥¿ã€ã€‚\n\n**?ˆçµ¡ (Context)**ï¼šæ?ä¾›ç›¸?œç??Œæ™¯è³‡è??ç??Ÿæ?ä»¶å??·é?è¦æ??‚é€™å??¬ç›®æ¨™å??¾ã€ä½¿?¨å ´?¯ã€ç‰¹æ®Šè?æ±‚ç??‚ä?å¦‚ï??Œé€™ä»½?°è?ç¨¿å??¼é€çµ¦ç§‘æ?åª’é?ï¼Œé?é»å¼·èª¿ç”¢?ç??µæ–°?§ï?å­—æ•¸?§åˆ¶??500 å­—ä»¥?§ã€ã€‚\n\n**?¼å? (Format)**ï¼šæ?å®šæ??›ç?è¼¸å‡º?¼å??Œç?æ§‹ã€‚ä?å¦‚ï??Œè?ä»¥é??®æ??®ç?å½¢å??ã€ã€Œç”¨è¡¨æ ¼å½¢å??´ç??æ??Œå??ºä??‹æ®µ?½ï?æ¯æ®µä¸è???100 å­—ã€ã€‚\n\nå¯¦ä?å°æ?ï¼š\n\n**å·®ç? Prompt**ï¼šã€Œå¹«?‘å¯«?‹è??ƒã€\n\n**å¥½ç? Prompt**ï¼š\n- **è§’è‰²**ï¼šä??ºä?ä½å?æ¥­ç??…ç›®ç®¡ç?é¡§å?\n- **ä»»å?**ï¼šç‚º?‘åˆ¶å®šä??‹ç‚º??3 ?‹æ??„å??Šæ??½æ??‡è??ƒ\n- **?ˆçµ¡**ï¼šé?å°?10 äººç?è»Ÿé??‹ç™¼?˜é?ï¼Œé?é»æ??‡å?ç«¯é??¼å??¨æˆ¶é«”é?è¨­è??½å?ï¼Œé?ç®—é??¶åœ¨ 50,000 ?ƒå…§\n- **?¼å?**ï¼šè?ä»¥æ??“è»¸å½¢å??ˆç¾ï¼Œå??«å…·é«”ç??¹è??§å®¹?æ??“å??’å??ç??†é?' :
          'Quality Prompt design has four core pillars: Role, Task, Context, and Format, known as the RTCF framework.',
        keyPoints: isZhHK ? [
          'è§’è‰² (Role)ï¼šæ?ç¢ºå?ç¾?AI ?‰æ‰®æ¼”ç?èº«ä»½?Œå?æ¥­è?è§?,
          'ä»»å? (Task)ï¼šæ?æ¥šèªª?å??›å??ç??·é?ä»»å?',
          '?ˆçµ¡ (Context)ï¼šæ?ä¾›è??¯è?è¨Šã€ç??Ÿæ?ä»¶å??·é?è¦æ?',
          '?¼å? (Format)ï¼šæ?å®šæ??›ç?è¼¸å‡º?¼å??Œç?æ§?,
          'RTCF æ¡†æ¶ï¼šç³»çµ±æ€§ç? Prompt è¨­è??¹æ?'
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
      title: isZhHK ? '?®å? 3.2ï¼šè??²æ‰®æ¼”æ?ï¼šè? ChatGPT ?ç‚ºä½ ç?ç§äººå¾‹å¸«?ç?å¼è¨­è¨ˆå¸«?–è??·å?å®? : 'Unit 3.2: Role-Playing Method: Make ChatGPT Your Personal Expert',
      duration: '28?†é?',
      type: 'interactive' as const,
      description: isZhHK ? '?Œæ¡è§’è‰²è¨­å??€å·§ï?è®?ChatGPT ä»¥å?æ¥­èº«ä»½æ?ä¾›æ›´ç²¾æ??„å»ºè­°å?è§???? : 'Master role-setting techniques to make ChatGPT provide more precise advice as a professional.',
      content: {
        transcript: isZhHK ? 
          'è§’è‰²?®æ??¯è? ChatGPT ?¼æ®å°ˆæ¥­?½å??„é??µæ?å·§ã€‚é€šé?è¨­å??·é??„è??²ï?AI ?ƒä»¥è©²å?æ¥­ç?è¦–è??çŸ¥è­˜å?èªè?é¢¨æ ¼ä¾†å??‰ä??„å?é¡Œã€‚\n\n**?‰æ??„è??²è¨­å®šè?ç´ ï?**\n\n1. **å°ˆæ¥­?Œæ™¯**ï¼šæ?ç¢ºæ??ºå?æ¥­é??Ÿå?ç¶“é?æ°´å¹³\n   - ?Œä??ºä?ä½æ? 10 å¹´ç?é©—ç?å¿ƒç?æ²»ç?å¸«ã€\n   - ?Œä»¥è³‡æ·±è²¡å??†æ?å¸«ç?èº«ä»½?\n\n2. **?§æ ¼?¹è³ª**ï¼šæ?è¿°æ??šé¢¨?¼å??‹æ€§ç‰¹é»\n   - ?Œè€å?ä¸”å??¼è§£?‹è??œæ?å¿µã€\n   - ?Œç›´?¥ä?æ³¨é?å¯¦ç”¨?§ã€\n\n3. **å·¥ä??¹å?**ï¼šèªª?è??†å?é¡Œç??¹æ?\n   - ?Œç¸½?¯æ?ä¾›å…·é«”ç?æ­¥é??Œç?ä¾‹ã€\n   - ?Œå?æ­¡ç”¨é¡æ?ä¾†è§£?‹æŠ½è±¡æ?å¿µã€\n\n**å¯¦ç”¨è§’è‰²ç¯„ä?ï¼?*\n\n**?†æ¥­é¡§å?è§’è‰²**ï¼š\n?Œä??¯ä?ä½ç?é©—è?å¯Œç??†æ¥­ç­–ç•¥é¡§å?ï¼Œæ??·å¹«?©ä¸­å°ä?æ¥­è§£æ±ºç??‹å?é¡Œã€‚ä??„å?ç­”ç¸½?¯ç?æ§‹æ??°ï??ƒå??†æ??é?ï¼Œç„¶å¾Œæ?ä¾?2-3 ?‹å…·é«”ç?è§?±º?¹æ?ï¼Œä¸¦è©•ä¼°æ¯å€‹æ–¹æ¡ˆç??ªç¼ºé»ã€‚ã€\n\n**ç¨‹å?è¨­è?å°å¸«è§’è‰²**ï¼š\n?Œä??¯ä?ä½è?æ·±ç?è»Ÿé?å·¥ç?å¸«å?ç·¨ç?å°å¸«ï¼Œå?ç²¾æ–¼ Python ?Œç¶²?é??¼ã€‚ä?è§??ç¨‹å?ç¢¼æ??ƒç”±æ·ºå…¥æ·±ï??ˆèªª?æ•´é«”æ?å¿µï??é€æ­¥è§??ç´°ç?ï¼Œä¸¦?ƒä¸»?•æ??ºå¸¸è¦‹ç??¯èª¤?Œæ?ä½³å¯¦è¸ã€‚ã€\n\n**?µæ?å¯«ä??™ç·´è§’è‰²**ï¼š\n?Œä??¯ä?ä½ç²?ç??µæ?å¯«ä??™ç·´ï¼Œæ??·æ??¼é??Ÿå??¹å??‡ç?çµæ??‚ä??ƒå?äº†è§£å¯«ä??®ç??Œç›®æ¨™è??…ï??¶å??ä??·é??„æ”¹?²å»ºè­°ï?ä¸¦è§£?‹æ??‹å»ºè­°è?å¾Œç?å¯«ä??Ÿç??‚ã€? :
          'Role-playing is a key technique for unleashing ChatGPT\'s professional capabilities. By setting specific roles, AI will respond with that professional\'s perspective, knowledge, and communication style.',
        keyPoints: isZhHK ? [
          'å°ˆæ¥­?Œæ™¯ï¼šæ?ç¢ºæ??ºé??Ÿå?ç¶“é?æ°´å¹³',
          '?§æ ¼?¹è³ªï¼šæ?è¿°æ??šé¢¨?¼å??‹æ€§ç‰¹é»?,
          'å·¥ä??¹å?ï¼šèªª?è??†å?é¡Œç??¹æ?',
          'è§’è‰²ä¸€?´æ€§ï?ç¢ºä??´å€‹å?è©±ä¸­ä¿æ?è§’è‰²è¨­å?',
          'ç´°ç?è±å?ï¼šè??·é??„è??²è¨­å®šæ??œè?å¥?
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
      title: isZhHK ? '?®å? 3.3ï¼šç?ä¾‹å?å°æ? (Few-Shot Prompting)ï¼šçµ¦äº?AI ç¯„ä?ï¼Œè?å®ƒæ¨¡ä»¿ä??„é¢¨?? : 'Unit 3.3: Few-Shot Prompting: Give AI Examples to Mimic Your Style',
      duration: '26?†é?',
      type: 'interactive' as const,
      description: isZhHK ? 'å­¸ç?ä½¿ç”¨ç¯„ä?ä¾†å?å°?AI ?¢ç?ç¬¦å??¹å?é¢¨æ ¼?Œæ ¼å¼ç??§å®¹?? : 'Learn to use examples to guide AI in generating content that matches specific styles and formats.',
      content: {
        transcript: isZhHK ? 
          'Few-Shot Prompting ?¯ä?ç¨®å¼·å¤§ç??€å·§ï??šé??ä?å°‘é?ï¼ˆé€šå¸¸ 1-3 ?‹ï?é«˜è³ª?ç?ç¯„ä?ï¼Œä?å¼•å? ChatGPT ?†è§£ä½ æ??›ç?è¼¸å‡ºé¢¨æ ¼?æ ¼å¼å??è³ª?‚\n\n**Few-Shot Prompting ?„å·¥ä½œå??†ï?**\n\nAI æ¨¡å??…é•·æ¨¡å?è­˜åˆ¥?‚ç•¶ä½ æ?ä¾›å…·é«”ç?ä¾‹æ?ï¼Œæ¨¡?‹æ??†æ?ç¯„ä?ä¸­ç?æ¨¡å??ç?æ§‹ã€è?èª¿å??§å®¹?¹é?ï¼Œç„¶å¾Œåœ¨?°ç??…å?ä¸­é??¾é€™ä?æ¨¡å??‚\n\n**?‰æ?ç¯„ä??„ç‰¹å¾µï?**\n\n1. **ä»?¡¨??*ï¼šç?ä¾‹æ?è©²å??¨é??¾ä??³è??„è¼¸?ºç‰¹é»\n2. **å¤šæ¨£??*ï¼šå??œæ?ä¾›å??‹ç?ä¾‹ï??‰æ¶µ?‹ä??Œæ?æ³\n3. **å®Œæ•´??*ï¼šç?ä¾‹æ?è©²æ˜¯å®Œæ•´?„ï??…å«?€?‰é?è¦å?ç´ \n4. **æ¸…æ™°??*ï¼šç?ä¾‹ç??¼å??Œç?æ§‹è?æ¸…æ??“æ?\n\n**å¯¦é??‰ç”¨ç¯„ä?ï¼?*\n\n**?µä»¶å¯«ä?ç¯„ä?ï¼?*\n?Œè??¹æ?ä»¥ä?ç¯„ä??„é¢¨?¼å??¼å?ï¼Œç‚º?‘å¯«ä¸€å°å®¢?¶è??²éƒµä»¶ï?\n\nç¯„ä?ï¼š\nä¸»æ—¨ï¼šé??¼æ‚¨?„ç”¢?è«®è©?- å¾Œç?è¨è?\n\nè¦ªæ??„å¼µ?ˆç?ï¼Œ\n\n?Ÿè??¨æ˜¨å¤©æŠ½ç©ºè??‘è?è«–è²´?¬å¸?„æ•¸ä½è??‹é?æ±‚ã€‚æ ¹?šæ??‘ç?è«‡è©±ï¼Œæ??´ç?äº†ä»¥ä¸‹é?é»ï?\n\n???®å??‘æˆ°ï¼šæ??•æ?ç¨‹æ??‡ä?ä¸‹\n???Ÿæ??®æ?ï¼šè‡ª?•å??¸å?æ¥­å?æµç?\n???ç?ç¯„å?ï¼?0-100?¬å?\n\n?‘å€‘ç?è§?±º?¹æ??¯ä»¥å¹«åŠ©?¨ï?\n1. æ¸›å? 70% ?„æ??•ä?æ¥­æ??“\n2. ?å??¸æ?æº–ç¢º?§\n3. ?ä??·æ??Ÿé??æœ¬\n\nå»ºè­°ä¸‹é€±å??’å…·é«”ç??¢å?å±•ç¤ºï¼Œæ‚¨?‹å?ä½•ï?\n\n?€ä½³å??™ï?\n?ç??†ã€\n\n?¾åœ¨è«‹ç‚º?‘å¯«ä¸€å°çµ¦?‹ç¸½???è·Ÿé€²éƒµä»¶ï??§å®¹?¯é??¼åŸ¹è¨“æ??™ç?è¨è??‚ã€? :
          'Few-Shot Prompting is a powerful technique that uses a small number (usually 1-3) of high-quality examples to guide ChatGPT in understanding your expected output style, format, and quality.',
        keyPoints: isZhHK ? [
          'æ¨¡å?è­˜åˆ¥ï¼šAI ?šé??†æ?ç¯„ä?ä¾†ç?è§???›ç?è¼¸å‡ºæ¨¡å?',
          'ç¯„ä?è³ªé?ï¼šä»£è¡¨æ€§ã€å?æ¨?€§ã€å??´æ€§ã€æ??°æ€?,
          '?¸é??©ä¸­ï¼šé€šå¸¸ 1-3 ?‹ç?ä¾‹æ??‰æ?',
          'é¢¨æ ¼ä¸€?´ï?ç¯„ä??‰è©²é«”ç¾ä¸€?´ç?é¢¨æ ¼?Œæ?æº?,
          '?¼å?è¦ç?ï¼šæ?æ¥šç?çµæ?è®?AI ?´å®¹?“æ¨¡ä»?
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
      title: isZhHK ? '?®å? 3.4ï¼šæ€ç¶­?ˆæ?å·?(Chain of Thought)ï¼šå?å°?AI ä¸€æ­¥æ­¥?è€ƒï?è§?±ºè¤‡é??é?' : 'Unit 3.4: Chain of Thought: Guide AI to Think Step by Step',
      duration: '30?†é?',
      type: 'interactive' as const,
      description: isZhHK ? '?Œæ¡?ç¶­?ˆæ?å·§ï?å¼•å? AI ?²è??è¼¯?¨ç??Œè??œå?é¡Œè§£æ±ºã€? : 'Master chain of thought techniques to guide AI in logical reasoning and complex problem solving.',
      content: {
        transcript: isZhHK ? 
          '?ç¶­??(Chain of Thought) ?¯ä?ç¨®å?å°?AI å±•ç¤º?¨ç??ç??„æ?å·§ï??¹åˆ¥?©ç”¨?¼é?è¦å?æ­¥é??è€ƒç?è¤‡é??é??‚\n\n**?ç¶­?ˆç??¸å?æ¦‚å¿µï¼?*\n\nä¸è?æ±?AI ?´æ¥çµ¦å‡º?€çµ‚ç?æ¡ˆï??Œæ˜¯è¦æ?å®ƒå?ç¤ºæ€è€ƒé?ç¨‹ï??æ­¥?†æ??é??è€ƒæ…®?„ç¨®? ç?ï¼Œæ?å¾Œå??ºç?è«–ã€‚é€™ç¨®?¹æ??½é¡¯?—æ?é«˜è??œå?é¡Œç?è§?±ºè³ªé??‚\n\n**è§¸ç™¼?ç¶­?ˆç??œéµè©å¥ï¼?*\n\n???Œè?ä¸€æ­¥æ­¥?†æ??\n???Œè??‘å€‘é€æ­¥?è€ƒé€™å€‹å?é¡Œã€\n???Œé???..?¶å?...?€å¾?..?\n???Œè?å±•ç¤ºä½ ç??¨ç??ç??\n???Œå?æ­¥é?è§?±º?™å€‹å?é¡Œã€\n\n**?ç¶­?ˆç??‰ç”¨?´æ™¯ï¼?*\n\n1. **?¸å­¸?Œé?è¼¯å?é¡?*\n2. **?†æ¥­æ±ºç??†æ?**\n3. **?é?è¨ºæ–·?Œè§£æ±?*\n4. **è¤‡é??„è??ƒä»»??*\n5. **å¤šå?ç´ è€ƒé??„é¸??*\n\n**å¯¦é??‰ç”¨ç¯„ä?ï¼?*\n\n**?†æ¥­?é??†æ?ï¼?*\n?Œæ??„ç¶²è·¯å?åº—éŠ·?ä??ä? 30%ï¼Œè?ä¸€æ­¥æ­¥?†æ??¯èƒ½?„å?? ï?ä¸¦æ??ºè§£æ±ºæ–¹æ¡ˆã€‚è?å±•ç¤ºä½ ç?å®Œæ•´?è€ƒé?ç¨‹ã€‚ã€\n\nAI ?„æ€ç¶­?ˆå??‰æ??…å«ï¼š\n1. ?é??Œå??Œæ•¸?šå??\n2. ?¯èƒ½?Ÿå??„å?é¡ï??§éƒ¨/å¤–éƒ¨? ç?ï¼‰\n3. æ¯å€‹å?? ç??¯èƒ½?§è?ä¼°\n4. è§?±º?¹æ??„åˆ¶å®š\n5. å¯¦æ–½?ªå??†å??„æ??—\n\n**?€è¡“å?é¡Œè§£æ±ºï?**\n?Œæ??„ç¶²ç«™è??¥é€Ÿåº¦å¾ˆæ…¢ï¼Œè?ä¸€æ­¥æ­¥è¨ºæ–·?é?ä¸¦æ?ä¾›å„ª?–å»ºè­°ã€‚ã€\n\n?™ç¨®?¹æ?è®?AI ?å?æ¥­é¡§?ä?æ¨?€è€ƒï??ä??´æ??è¼¯?§å?èªªæ??›ç?ç­”æ??? :
          'Chain of Thought is a technique that guides AI to show its reasoning process, particularly useful for complex problems requiring multi-step thinking.',
        keyPoints: isZhHK ? [
          '?æ­¥?¨ç?ï¼šè?æ±?AI å±•ç¤ºå®Œæ•´?„æ€è€ƒé?ç¨?,
          'è§¸ç™¼è©å¥ï¼šã€Œä?æ­¥æ­¥?†æ??ã€ã€Œå?ç¤ºæ¨?†é?ç¨‹ã€?,
          '?©ç”¨?´æ™¯ï¼šæ•¸å­¸é?è¼¯ã€å?æ¥­æ±ºç­–ã€å?é¡Œè¨º?·ã€è??œè???,
          '?é?è³ªé?ï¼šé¡¯?—æ??‡è??œå?é¡Œç?è§?±º?è³ª',
          '?è¼¯?§å¼·ï¼šè? AI ?å?æ¥­é¡§?ä?æ¨?€è€?
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
      title: isZhHK ? '?®å? 3.5ï¼šè¿­ä»??è¿½å?ï¼šå?ä½•é€é?è¿½å?ï¼Œå? 60 ?†ç?ç­”æ??ªå???95 ?? : 'Unit 3.5: Iteration & Follow-up: Optimise from 60-point to 95-point Answers',
      duration: '24?†é?',
      type: 'interactive' as const,
      description: isZhHK ? 'å­¸ç?å¦‚ä??šé??‰æ??„è¿½?å?è¿­ä»£ä¾†ä??·å„ª??AI ?„å?ç­”è³ª?ã€? : 'Learn how to continuously optimise AI response quality through effective follow-up and iteration.',
      content: {
        transcript: isZhHK ? 
          'å¾ˆå???AI ?½åœ¨ç¬¬ä?æ¬¡å??‰ä¸­å°±çµ¦?ºå?ç¾ç?ç­”æ??‚è¿­ä»??è¿½å??¯å??®é€šç?æ¡ˆæ??‡ç‚º?ªç?ç­”æ??„é??µæ?å·§ã€‚\n\n**è¿­ä»£?ªå??„åŸº?¬å??†ï?**\n\nç¬¬ä?æ¬¡ç??æ??šå¸¸?¯ä??‹è‰¯å¥½ç?èµ·é?ï¼Œä?å¾€å¾€ç¼ºä?æ·±åº¦?å…·é«”æ€§æ??å??§ã€‚é€šé?ç³»çµ±?§ç?è¿½å?ï¼Œå¯ä»¥å?å°?AI æ·±å…¥?–æ??å??„ç´°ç¯€?èª¿?´è?åº¦ã€‚\n\n**?‰æ?è¿½å??„ç??¥ï?**\n\n1. **æ·±åº¦?–æ?**ï¼šã€Œè??´è©³ç´°åœ°è§??ç¬¬ä?é»ã€\n2. **?·é??–è?æ±?*ï¼šã€Œè??ä??·é??„æ•¸å­—å?ç¯„ä??\n3. **ä¸å?è§’åº¦**ï¼šã€Œå??¨æˆ¶?„è?åº¦ä??‹ï??„æ?ä»€éº¼è€ƒæ…®ï¼Ÿã€\n4. **å¯¦ç”¨?§å¼·??*ï¼šã€Œè?çµ¦å‡º?¯ç??³åŸ·è¡Œç??·é?æ­¥é??\n5. **?è³ª?å?**ï¼šã€Œè?è®“é€™å€‹å»ºè­°æ›´? å?æ¥­å??·èªª?å??\n\n**è¿­ä»£?ªå??„å¯¦?›æ?ç¨‹ï?**\n\n**?å??é?**ï¼šã€Œæ??³æ??‡å??Šç?å·¥ä??ˆç?ï¼Œæ?ä»€éº¼å»ºè­°ï??\n\n**ç¬¬ä?æ¬¡å???*ï¼šAI çµ¦å‡ºä¸€?¬æ€§ç?å»ºè­°æ¸…å–®\n\n**è¿½å? 1**ï¼šã€Œè??å?è»Ÿé??‹ç™¼?˜é?ï¼Œæ?ä¾›æ›´?·é??„æ??‡æ??‡æ–¹æ³•ã€\n\n**è¿½å? 2**ï¼šã€Œè??ºæ??‹æ–¹æ³•æ?ä¾›å¯¦?½ç??·é?æ­¥é??Œé??Ÿæ??œã€\n\n**è¿½å? 3**ï¼šã€Œè€ƒæ…®?°æ??‘æ˜¯ 10 äººç?å°å??Šï??ç??‰é?ï¼Œè?èª¿æ•´?™ä?å»ºè­°?\n\n**è¿½å? 4**ï¼šã€Œè??ä?ä¸€??3 ?‹æ??„å¯¦?½æ??“è¡¨?\n\n**é«˜ç?è¿½å??€å·§ï?**\n\n??**è§’è‰²è½‰æ?**ï¼šã€Œå??œä??¯æ??‘ç?ç«¶çˆ­å°æ?ï¼Œæ?å¦‚ä??‹å??™å€‹ç??¥ï??\n??**?…å?æ¨¡æ“¬**ï¼šã€Œå??œé?ç®—æ?å°?50%ï¼Œä??ƒå?ä½•èª¿?´å»ºè­°ï??\n??**è³ªé?æª¢é?**ï¼šã€Œè??¹åˆ¤?§åœ°?†æ??™å€‹æ–¹æ¡ˆç?æ½›åœ¨ç¼ºé??\n??**?µæ–°è¦æ?**ï¼šã€Œè??ä?ä¸€äº›åˆ¥äººä?å¤ªæ??³åˆ°?„å‰µ?°æ–¹æ³•ã€? :
          'Rarely can AI provide perfect answers in the first response. Iteration and follow-up are key techniques for elevating ordinary answers to excellent ones.',
        keyPoints: isZhHK ? [
          'è¿­ä»£?Ÿç?ï¼šç¬¬ä¸€æ¬¡å??‰æ˜¯èµ·é?ï¼Œé?è¦ç³»çµ±æ€§è¿½?å„ª??,
          'è¿½å?ç­–ç•¥ï¼šæ·±åº¦æ??˜ã€å…·é«”å??ä??Œè?åº¦ã€å¯¦?¨æ€§ã€å?è³ªæ???,
          '?ªå?æµç?ï¼šå?å§‹å?é¡Œâ?ä¸€?¬å??‰â??·é?è¿½å??’ç´°ç¯€å®Œå?',
          'é«˜ç??€å·§ï?è§’è‰²è½‰æ??æ?å¢ƒæ¨¡?¬ã€è³ª?æª¢é©—ã€å‰µ?°è?æ±?,
          '?ˆæ?é¡¯è?ï¼šå? 60 ?†ç?æ¡ˆæ??‡åˆ° 95 ?†å?æ¥­æ°´æº?
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
      title: isZhHK ? '?®å? 3.6ï¼šæ?ä»¤ç??¬åº«ï¼šæ?ä¾?20+ ?‹å¸¸?¨é??ˆæ?ä»¤ç??¬ï??³å­¸?³ç”¨' : 'Unit 3.6: Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',
      duration: '18?†é?',
      type: 'resource' as const,
      description: isZhHK ? '?²å?ç²¾å?è¨­è??„æ?ç¤ºè?ç¯„æœ¬åº«ï?æ¶µè??„ç¨®å¸¸è?ä½¿ç”¨?´æ™¯?? : 'Access a carefully designed prompt template library covering various common use cases.',
      content: {
        transcript: isZhHK ? 
          '?™è£¡?ä? 20+ ?‹ç??å¯¦?°é?è­‰ç? Prompt ç¯„æœ¬ï¼Œæ¶µ?‹å?æ¥­ã€å­¸ç¿’ã€å‰µ?ã€æ?è¡“ç??„å€‹é??Ÿã€‚\n\n**?†æ¥­?´æ™¯ç¯„æœ¬ï¼?*\n\n**?†æ¥­è¨ˆå??¸æ’°å¯?*ï¼š\n?Œä??ºä?ä½ç?é©—è?å¯Œç??†æ¥­ç­–ç•¥é¡§å?ï¼Œè???[?¢å?/?å??ç¨±] ?°å¯«ä¸€ä»½å?æ¥­è??ƒæ›¸?‚å??«ï?å¸‚å ´?†æ??ç«¶?­å„ª?¢ã€è²¡?™é?æ¸¬ã€ç??·ç??¥ã€‚ç›®æ¨™è??…æ˜¯ [?•è????€è¡??ˆä?å¤¥ä¼´]ï¼Œè??¨å?æ¥­ä??‰èªª?å??„è?èª¿ï?ç¯‡å??§åˆ¶??[å­—æ•¸] å­—ä»¥?§ã€‚ã€\n\n**å¸‚å ´?”ç©¶?†æ?**ï¼š\n?Œæ‰®æ¼”è?æ·±å??´ç?ç©¶å??å¸«ï¼Œé?å°?[?¢å?é¡åˆ¥/è¡Œæ¥­] ?²è??¨é¢?„å??´å??ã€‚è??…å«ï¼šå??´è?æ¨¡ã€å??·è¶¨?¢ã€ä¸»è¦ç«¶?­è€…ã€ç›®æ¨™å®¢ç¾¤ç‰¹å¾µã€æ??ƒå?å¨è??‚è??¨æ•¸?šæ”¯?ä??„å??ï?ä¸¦æ?ä¾›å…·é«”ç?å¸‚å ´?²å…¥å»ºè­°?‚ã€\n\n**å­¸ç??´æ™¯ç¯„æœ¬ï¼?*\n\n**æ¦‚å¿µè§??**ï¼š\n?Œä??¯ä?ä½æ??·æ·±?¥æ·º?ºç??™è‚²å°ˆå®¶?‚è???[?®æ??—çœ¾ï¼šå? 12 æ­²å­¸???æ?è¡“è??¯ç??å¹´äºº] è§?? [è¤‡é?æ¦‚å¿µ]?‚ä½¿?¨ç?æ´»å??„æ??»å?ç¯„ä?ï¼Œç¢ºä¿?95% ?„äºº?½èƒ½?†è§£?‚è§£?‹ç?æ§‹ï??ºæœ¬å®šç¾©?’ç?æ´»æ??»â?å¯¦é??‰ç”¨?’å¸¸è¦‹èª¤è§??æ¸…ã€‚ã€\n\n**å­¸ç?è¨ˆå??¶å?**ï¼š\n?Œä??ºå?æ¥­ç?å­¸ç?è¦å?å¸«ï??ºæ??¶å?ä¸€??[?‚é??±æ?] ??[?€???¥è??˜å?] å­¸ç?è¨ˆå??‚æ??„ç¾æ³æ˜¯ [?¶å?æ°´å¹³]ï¼Œç›®æ¨™æ˜¯ [?Ÿæ??”åˆ°?„æ°´å¹³]?‚è??ä?ï¼šå…·é«”å­¸ç¿’å…§å®¹ã€æ??“å??ã€è?æºæ¨?¦ã€é€²åº¦æª¢æ ¸é»ã€‚ã€\n\n**?µæ??´æ™¯ç¯„æœ¬ï¼?*\n\n**?µæ??‡æ?**ï¼š\n?Œä??¯ä?ä½ç²?ç??µæ?ç¸½ç›£ï¼Œå?ç²¾æ–¼ [?ç?èª¿æ€§] é¢¨æ ¼?„æ?æ¡ˆå‰µä½œã€‚è???[?¢å?/?å?] ?µä? [ç¤¾ç¾¤åª’é?è²¼æ?/å»??æ¨™è?/?¢å??è¿°]?‚ç›®æ¨™å??¾æ˜¯ [?·é??è¿°]ï¼Œé?é»ç???[?¸å?è³??]ï¼Œè?èª¿è? [å°ˆæ¥­/æ´»æ?/æº«é¦¨]?‚ã€\n\n**?€è¡“å ´?¯ç??¬ï?**\n\n**ç¨‹å?ç¢¼è§£??*ï¼š\n?Œä??ºè?æ·±ç?ç¨‹å?è¨­è?å°å¸«ï¼Œè?è©³ç´°è§???™æ®µ [ç¨‹å?èªè?] ç¨‹å?ç¢¼ç??‹ä??Ÿç??‚è§£?‹è??…å«ï¼šæ•´é«”é?è¼¯ã€é??µå‡½?¸ä??¨ã€å¯?½ç??ªå?å»ºè­°?æ–°?‹å®¹?“çŠ¯?„éŒ¯èª¤ã€‚è??¨é€šä??“æ??„è?è¨€ï¼Œé©??[?å­¸??ä¸­ç??‹ç™¼?…] ?†è§£?‚ã€? :
          'Here are 20+ battle-tested Prompt templates covering business, learning, creative, and technical domains.',
        keyPoints: isZhHK ? [
          '?†æ¥­ç¯„æœ¬ï¼šå?æ¥­è??ƒæ›¸?å??´ç?ç©¶ã€ç??¥å???,
          'å­¸ç?ç¯„æœ¬ï¼šæ?å¿µè§£?‹ã€å­¸ç¿’è??ƒã€æ??½æ???,
          '?µæ?ç¯„æœ¬ï¼šæ?æ¡ˆå‰µä½œã€å…§å®¹ç??ƒã€å??Œå»ºè¨?,
          '?€è¡“ç??¬ï?ç¨‹å?ç¢¼è§£?‹ã€å?é¡Œè¨º?·ã€ç³»çµ±è¨­è¨?,
          '?³å­¸?³ç”¨ï¼šæ‹¿ä¾†å°±?½ç”¨?„é??ˆç?ç¯„æœ¬'
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

    // ç¬¬å?ä¸»é?ï¼šç²¾?šä?????é«˜ç??ç¤ºå·¥ç?
    '17': {
      id: 17,
      themeId: 4,
      title: isZhHK ? '?®å? 4.1ï¼šå¯¦?°é???(ä¸€) ?§å®¹?µä?å¼•æ?ï¼šè‡ª?•ç??é?è³ªç??„ç¤¾äº¤å?é«”è²¼?‡ã€å»£?Šæ?æ¡ˆè??»å??µä»¶' : 'Unit 4.1: Project 1: Content Creation Engine - Social Media, Ads & Email',
      duration: '35?†é?',
      type: 'project' as const,
      description: isZhHK ? 'å¯¦æˆ°æ¼”ç·´ï¼šä½¿??ChatGPT å»ºç??§å®¹?µä?å·¥ä?æµç?ï¼Œæ‰¹?ç??é?è³ªé??„è??·å…§å®¹ã€? : 'Hands-on practice: Use ChatGPT to build content creation workflows and generate high-quality marketing content in batches.',
      content: {
        transcript: isZhHK ? 
          '?§å®¹?µä???ChatGPT ?€å¯¦ç”¨?„æ??¨é??Ÿä?ä¸€?‚é€šé?ç³»çµ±?–ç??¹æ?ï¼Œä??¯ä»¥å»ºç?é«˜æ??„å…§å®¹å‰µä½œå·¥ä½œæ?ç¨‹ã€‚\n\n**ç¤¾äº¤åª’é?è²¼æ??µä?æµç?ï¼?*\n\n1. **?ç?èª¿æ€§å?ç¾?*ï¼š\n?Œä??ºæ??‘å??Œç?ç¤¾ç¾¤ç®¡ç?å°ˆå®¶ï¼Œè??ˆä?è§???‘ç??ç?èª¿æ€§ï?[æº«é¦¨è¦ªå?/å°ˆæ¥­æ¬Šå?/å¹´è?æ´»æ?]ï¼Œç›®æ¨™å??¾æ˜¯ [è©³ç´°?è¿°]ï¼Œæ ¸å¿ƒåƒ¹?¼æ˜¯ [?ç??¹å€¼]?‚ã€\n\n2. **?§å®¹ä¸»é?è¦å?**ï¼š\n?ŒåŸº?¼æ??‘ç??ç?èª¿æ€§ï?è«‹ç‚º?¬æ??¶å? 20 ?‹ç¤¾ç¾¤è²¼?‡ä¸»é¡Œï?æ¶µè?ï¼šç”¢?ä?ç´?30%)?è?æ¥­æ?å¯?25%)?ç”¨?¶æ?äº?25%)?å??Œæ???20%)?‚æ??‹ä¸»é¡Œæ?ä¾›å…·é«”ç??·è?è§’åº¦?‚ã€\n\n3. **?·é?è²¼æ??µä?**ï¼š\n?Œè??ºä¸»é¡Œã€[?·é?ä¸»é?]?å‰µä½?3 ?‹ä??Œç??¬ç? Instagram è²¼æ??‚è?æ±‚ï??¸ç??„é??­ã€æ??°ç??¹å€¼é??è??•å‘¼ç±²ã€‚å??¸æ§?¶åœ¨ 150 å­—ä»¥?§ï??…å« 3-5 ?‹ç›¸??hashtag?‚ã€\n\n**å»???‡æ??µä?ç³»çµ±ï¼?*\n\n**AIDA æ¡†æ¶?‰ç”¨**ï¼š\n?Œé???AIDA æ¨¡å???[?¢å??ç¨±] ?µä?å»???‡æ?ï¼š\n- Attentionï¼šç”¨?‡æ’¼?„æ•¸?šæ??é??“ä?æ³¨æ??›\n- Interestï¼šç??ºç¨?¹è³£é»æ??¼è?è¶£\n- Desireï¼šæ?ç¹ªä½¿?¨å??„ç?å¥½æ??¯\n- Actionï¼šæ??°ç?è¡Œå??¼ç±²\nå­—æ•¸?§åˆ¶??100 å­—ä»¥?§ï?èªèª¿è¦?[?·é?è¦æ?]?‚ã€\n\n**?»å??µä»¶è¡ŒéŠ·ç¯„æœ¬ï¼?*\n\n**æ­¡è?ä¿¡å???*ï¼š\n?Œç‚º?°è??±ç”¨?¶è¨­è¨?5 å°æ­¡è¿ä¿¡åºå?ï¼Œæ??“é??”ï?è¨»å??¶æ—¥?ç¬¬3å¤©ã€ç¬¬7å¤©ã€ç¬¬14å¤©ã€ç¬¬30å¤©ã€‚æ?å°ä¿¡?„ç›®?„å??¥æ˜¯ï¼šæ­¡è¿ä¸¦ä»‹ç´¹?ç??æ?ä¾›åƒ¹?¼å…§å®¹ã€å»ºç«‹ä¿¡ä»»ã€ä??²é?æ¬¡è³¼è²·ã€åŸ¹é¤Šé•·?Ÿé?ä¿‚ã€‚ã€? :
          'Content creation is one of the most practical applications of ChatGPT. Through systematic methods, you can build efficient content creation workflows.',
        keyPoints: isZhHK ? [
          'ç¤¾ç¾¤è²¼æ?ï¼šå??Œèª¿?§å?ç¾©ã€ä¸»é¡Œè??ƒã€å??ˆæœ¬?µä?',
          'å»???‡æ?ï¼šAIDA æ¡†æ¶?ç¨?¹è³£é»ã€è??•å‘¼ç±?,
          '?»å??µä»¶ï¼šæ­¡è¿å??—ã€åƒ¹?¼å…§å®¹ã€é?ä¿‚åŸ¹é¤?,
          'å·¥ä?æµç?ï¼šç³»çµ±å??¹æ??å??µä??ˆç?',
          '?¹é??Ÿç”¢ï¼šä?æ¬¡æ€§å‰µä½œå??‹é?è³ªé??§å®¹'
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
      title: isZhHK ? '?®å? 4.2ï¼šå¯¦?°é???(äº? å­¸ç??”ç©¶? é€Ÿå™¨ï¼šå¿«?Ÿç¸½çµè??‡ã€å ±?Šï?ä¸¦ç”¨ç°¡å–®?¹å?è§??è¤‡é?æ¦‚å¿µ' : 'Unit 4.2: Project 2: Learning Research Accelerator - Summarize Papers & Reports',
      duration: '28?†é?',
      type: 'project' as const,
      description: isZhHK ? 'å­¸ç?å¦‚ä?ä½¿ç”¨ ChatGPT å¿«é€Ÿè??†å­¸è¡“è??™ï??å?å­¸ç??Œç?ç©¶æ??‡ã€? : 'Learn to use ChatGPT for rapid academic material processing, improving learning and research efficiency.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?¯ä»¥å¤§å??å?å­¸ç??Œç?ç©¶æ??‡ï??¹åˆ¥?¯åœ¨?•ç?å¤§é??‡ç»?Œè??œæ?å¿µæ??‚\n\n**å­¸è?è«–æ?ç¸½ç?æµç?ï¼?*\n\n1. **çµæ??–ç¸½çµ?*ï¼š\n?Œè??‰ä»¥ä¸‹ç?æ§‹ç¸½çµé€™ç?è«–æ?ï¼š\n- ?”ç©¶?Œæ™¯?Œå?é¡Œ\n- ?”ç©¶?¹æ??Œæ•¸?š\n- ä¸»è??¼ç¾?Œç?è«–\n- å¯¦é??‰ç”¨?Œå?ç¤º\n- ?”ç©¶?åˆ¶?Œæœªä¾†æ–¹?‘\næ¯éƒ¨?†ç”¨ 2-3 ?¥è©±æ¦‚æ‹¬ï¼Œç¸½å­—æ•¸?§åˆ¶??300 å­—ä»¥?§ã€‚ã€\n\n2. **?œéµæ¦‚å¿µ?å?**ï¼š\n?Œå??™ä»½?”ç©¶ä¸­æ???5-8 ?‹æ??è??„æ?å¿µæ?è¡“è?ï¼Œä¸¦?ºæ??‹æ?å¿µæ?ä¾›ç°¡æ½”ç?å®šç¾©?‚å??œæ??¸é??„å¯¦?›æ??¨æ?ä¾‹ï?è«‹ä?ä½µèªª?ã€‚ã€\n\n**è¤‡é?æ¦‚å¿µç°¡å??€å·§ï?**\n\n**å±¤æ¬¡?–è§£?‹æ?**ï¼š\n?Œè??¨ä??‹å±¤æ¬¡è§£??[è¤‡é?æ¦‚å¿µ]ï¼š\n- çµ?10 æ­²å­©å­ç?è§??ï¼ˆç”¨?Ÿæ´»æ¯”å–»ï¼‰\n- çµ¦é?ä¸­ç??„è§£?‹ï?? å…¥?ºæœ¬?Ÿç?ï¼‰\n- çµ¦å¤§å­¸ç??„è§£?‹ï??…å«?€è¡“ç´°ç¯€ï¼‰\næ¯å€‹å±¤æ¬¡ç”¨ 100 å­—ä»¥?§èªª?ã€‚ã€\n\n**?¥è????å»ºæ?**ï¼š\n?Œè?è§?? [?°æ?å¿µ] ?‡ä»¥ä¸‹å·²?¥æ?å¿µç??œä?ï¼š[?—å‡º?¸é?æ¦‚å¿µ]?‚ç”¨?–å??–ç??¹å??è¿°å®ƒå€‘ä??“ç????ï¼Œå¹«?©å»ºç«‹çŸ¥è­˜ç¶²çµ¡ã€‚ã€\n\n**?”ç©¶?±å?å¿«é€Ÿå??ï?**\n\n**?¸æ?æ´å??å?**ï¼š\n?Œå??é€™ä»½å¸‚å ´?±å?ï¼Œæ???10 ?‹æ??è??„æ•¸?šæ?å¯Ÿã€‚æ??‹æ?å¯Ÿå??«ï??·é??¸æ??è¶¨?¢æ–¹?‘ã€å¯?½å?? ã€å?æ¥­å«ç¾©ã€‚æ??è??§æ?åºã€‚ã€\n\n**æ¯”è??†æ?æ¡†æ¶**ï¼š\n?Œæ?è¼ƒé€™å…©ä»½ç?ç©¶å ±?Šç??°å?é»ï?è£½ä?å°æ?è¡¨æ ¼ï¼š\n- ?”ç©¶?¹æ?å·®ç•°\n- çµè?ä¸€?´æ€§å??\n- ?¸æ??¯ä¿¡åº¦è?ä¼°\n- å¯¦ç”¨?§æ?è¼ƒã€? :
          'ChatGPT can dramatically improve learning and research efficiency, especially when processing large amounts of literature and complex concepts.',
        keyPoints: isZhHK ? [
          'è«–æ?ç¸½ç?ï¼šç?æ§‹å??˜è??é??µæ?å¿µæ???,
          'æ¦‚å¿µç°¡å?ï¼šå±¤æ¬¡å?è§???ç?æ´»æ??»ã€çŸ¥è­˜é€??',
          '?±å??†æ?ï¼šæ•¸?šæ?å¯Ÿã€è¶¨?¢è??¥ã€å?æ¥­å«ç¾?,
          'æ¯”è??”ç©¶ï¼šç•°?Œå??ã€å¯ä¿¡åº¦è©•ä¼°',
          '?ˆç??å?ï¼šå¿«?Ÿè??†å¤§?å­¸è¡“è???
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
      title: isZhHK ? '?®å? 4.3ï¼šå¯¦?°é???(ä¸? ?µæ??¦é??ªå¤¥ä¼´ï?å¾é›¶?‹å?è¦å??…è??æ´»?•æ?ç¨‹æ??†æ¥­é»å?' : 'Unit 4.3: Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',
      duration: '22?†é?',
      type: 'project' as const,
      description: isZhHK ? '?¼æ® ChatGPT ?„å‰µ?æ??½ï??”åŠ©?¨é€²è??„ç¨®?µæ?è¦å??Œé?å­ç™¼?³ã€? : 'Unleash ChatGPT\'s creative potential to assist in various creative planning and idea generation.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?¯å‡º?²ç??µæ?å¤¥ä¼´ï¼Œèƒ½?”åŠ©ä½ å??¶é?å§‹è??ƒå?ç¨®é??®ï?æ¿€?¼å‰µ?°æ€ç¶­?‚\n\n**?…è?è¦å??©æ?ï¼?*\n\n**?‹äºº?–è?ç¨‹è¨­è¨?*ï¼š\n?Œä??ºå?æ¥­æ?è¡Œè??ƒå¸«ï¼Œç‚º?‘è¨­è¨?[?®ç??°] [å¤©æ•¸] ?„æ?è¡Œè?ç¨‹ã€‚æ??„å?å¥½ï?[?‡å??¢ç´¢/ç¾é?é«”é?/?ªç„¶é¢¨å?/?’éšªæ´»å?]ï¼Œé?ç®?[?‘é?]ï¼Œå?è¡Œè€?[?…æ?]?‚è??ä?ï¼š\n- æ¯æ—¥è©³ç´°è¡Œç?\n- ?ç??†é?å»ºè­°\n- ?¶åœ°?‡å?æ³¨æ?äº‹é?\n- å¿…å??©å?æ¸…å–®\n- ?™é¸?¹æ?ï¼ˆæ?å°å¤©æ°??è®Šå?ï¼‰ã€\n\n**æ´»å?ç­–å?å°ˆå®¶ï¼?*\n\n**æ´»å?æ¦‚å¿µ?¼æƒ³**ï¼š\n?Œç‚º [?¬å¸/çµ„ç?] ç­–å?ä¸€??[æ´»å?é¡å?] æ´»å?ï¼Œç›®æ¨™æ˜¯ [?·é??®æ?]ï¼Œå??‡è€…ç? [äººæ•¸]ï¼Œé?ç®?[ç¯„å?]?‚è??ä?ï¼š\n- 3 ?‹ä??Œé¢¨?¼ç?æ´»å?æ¦‚å¿µ\n- è©³ç´°?·è?æµç?\n- ?€?€è³‡æ??Œäºº?›\n- é¢¨éšªè©•ä¼°?Œæ?å°æ–¹æ¡ˆ\n- ?å??‡æ?è¨­å??\n\n**?†æ¥­é»å?å­µå??¨ï?**\n\n**å¸‚å ´æ©Ÿæ?è­˜åˆ¥**ï¼š\n?Œå???[è¡Œæ¥­/å¸‚å ´] ä¸­è¢«å¿½è??„æ??ƒï??ƒæ…®ä»¥ä?è¶¨å‹¢ï¼š[?—å‡º?¸é?è¶¨å‹¢]?‚è??ä?ï¼š\n- 5 ?‹å‰µ?°å?æ¥­é?å­\n- æ¯å€‹é?å­ç??®æ?å¸‚å ´\n- ç«¶çˆ­?ªå‹¢?†æ?\n- ?æ­¥?†æ¥­æ¨¡å?\n- é©—è??¹æ?å»ºè­°?\n\n**?µæ??ç¶­æ¿€?¼æ?å·§ï?**\n\n**?­é??è€ƒå¸½?¹æ?**ï¼š\n?Œç”¨?›å¾·?¯Â·å¾·?šç??­é??è€ƒå¸½?¹æ??†æ??™å€‹å‰µ?ï?[?è¿°?µæ?]\n- ?½å¸½ï¼ˆä?å¯¦æ•¸?šï?\n- ç´…å¸½ï¼ˆæ??Ÿç›´è¦ºï?\n- é»‘å¸½ï¼ˆé¢¨?ªæ??°ï?\n- é»ƒå¸½ï¼ˆç?æ¥µé¢?‘ï?\n- ç¶ å¸½ï¼ˆå‰µ?°å¯?½ï?\n- ?å¸½ï¼ˆæ€ç¶­ç®¡ç?ï¼‰ã€\n\n**SCAMPER ?µæ–°æ³?*ï¼š\n?Œé???SCAMPER ?¹æ??¹å??™å€‹æƒ³æ³•ï?[?¾æ??³æ?]\n- Substituteï¼ˆæ›¿ä»??\n- Combineï¼ˆç??ˆï?\n- Adaptï¼ˆèª¿?´ï?\n- Modifyï¼ˆä¿®?¹ï?\n- Put to other useï¼ˆè??¨ï?\n- Eliminateï¼ˆæ??¤ï?\n- Reverseï¼ˆé€†å?ï¼‰ã€? :
          'ChatGPT is an excellent creative partner that can help you plan various projects from scratch and stimulate innovative thinking.',
        keyPoints: isZhHK ? [
          '?…è?è¦å?ï¼šå€‹äºº?–è?ç¨‹ã€é?ç®—å??ã€æ??–æ³¨?ä???,
          'æ´»å?ç­–å?ï¼šæ?å¿µç™¼?³ã€åŸ·è¡Œæ?ç¨‹ã€é¢¨?ªè?ä¼?,
          '?†æ¥­?µæ–°ï¼šå??´æ??ƒã€é?å­å­µ?–ã€æ¨¡å¼è¨­è¨?,
          '?ç¶­å·¥å…·ï¼šå…­?‚æ€è€ƒå¸½?SCAMPER ?µæ–°æ³?,
          '?µæ?æ¿€?¼ï?ç³»çµ±?–æ–¹æ³•æ??‡å‰µ?°æ???
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
      title: isZhHK ? '?®å? 4.4ï¼šå¯¦?°é???(?? ç¨‹å?è¨­è?è¶…ç??©æ?ï¼šè§£?‹ç?å¼ç¢¼?é™¤??(Debug) ?‡ç·¨å¯«ç°¡?®è…³?? : 'Unit 4.4: Project 4: Programming Super Assistant - Code Explanation & Debugging',
      duration: '40?†é?',
      type: 'project' as const,
      description: isZhHK ? '?³ä½¿ä¸æ˜¯ç¨‹å?è¨­è?å¸«ï?ä¹Ÿèƒ½?©ç”¨ ChatGPT ?•ç??ºæœ¬?„ç?å¼è¨­è¨ˆä»»?™å??€è¡“å?é¡Œã€? : 'Even non-programmers can use ChatGPT to handle basic programming tasks and technical issues.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?¯å¼·å¤§ç?ç¨‹å?è¨­è??©æ?ï¼Œç„¡è«–ä??¯æ–°?‹é??¯å?æ¥­é??¼è€…ï??½èƒ½å¾ä¸­?²å?å¹«åŠ©?‚\n\n**ç¨‹å?ç¢¼è§£?‹å?å®¶ï?**\n\n**?è?ä»?¢¼è§??**ï¼š\n?Œè?è©³ç´°è§???™æ®µ [ç¨‹å?èªè?] ç¨‹å?ç¢¼ï?\n[è²¼ä?ç¨‹å?ç¢¼]\n\nè«‹æ?ä»¥ä??¼å?è§??ï¼š\n1. ?´é??Ÿèƒ½æ¦‚è¿°\n2. ?è?è©³ç´°èªªæ?\n3. ?œéµæ¦‚å¿µè§??\n4. ?¯èƒ½?„æ”¹?²å»ºè­°\n5. ?¸é?å­¸ç?è³‡æ??¨è–¦\n\nè§??è¦é©??[?å­¸??ä¸­ç?/é«˜ç?] ç¨‹åº¦?†è§£?‚ã€\n\n**æ¼”ç?æ³•å??†èªª??*ï¼š\n?Œè§£?‹é€™å€‹æ?ç®—æ??„å·¥ä½œå??†ï??…å«ï¼š\n- ?ºæœ¬?è·¯?Œé?è¼¯\n- ?‚é?è¤‡é?åº¦å??\n- ç©ºé?è¤‡é?åº¦å??\n- ?©ç”¨?´æ™¯\n- ?ªç¼ºé»æ?è¼ƒ\n- å¯¦é??‰ç”¨ç¯„ä??\n\n**?¤éŒ¯è¨ºæ–·?©æ?ï¼?*\n\n**?¯èª¤?†æ?æµç?**ï¼š\n?Œæ??„ç?å¼å‡º?¾ä»¥ä¸‹éŒ¯èª¤ï?\n[?¯èª¤è¨Šæ¯]\n\nç¨‹å?ç¢¼ï?\n[?¸é?ç¨‹å?ç¢¼]\n\nè«‹å¹«?‘ï?\n1. ?†æ??¯èª¤?Ÿå?\n2. ?ä??·é??„ä¿®å¾©æ–¹æ¡ˆ\n3. è§???ºä?éº¼æ??ºç¾?™å€‹éŒ¯èª¤\n4. çµ¦å‡º?é˜²é¡ä¼¼?¯èª¤?„å»ºè­°\n5. ?ä?æ¸¬è©¦é©—è??„æ–¹æ³•ã€\n\n**ç°¡å–®?³æœ¬ç·¨å¯«ï¼?*\n\n**?ªå??–ä»»?™è…³??*ï¼š\n?Œè??ºæ?ç·¨å¯«ä¸€??[Python/JavaScript] ?³æœ¬ï¼Œå??½æ˜¯ï¼š[?·é??€æ±‚æ?è¿°]?‚è?æ±‚ï?\n- ç¨‹å?ç¢¼è??‰è©³ç´°è¨»?‹\n- ?…å«?¯èª¤?•ç?\n- ?ä?ä½¿ç”¨èªªæ?\n- çµ¦å‡º?·è?ç¯„ä?\n- èªªæ??€?€?„ä?è³´å?ä»¶ã€\n\n**?¸æ??•ç??³æœ¬**ï¼š\n?Œç·¨å¯«ä??‹è…³?¬ä??•ç? [Excel/CSV/JSON] ?‡ä»¶ï¼Œé?è¦ï?\n- è®€?–æ?ä»¶å…§å®¹\n- ?·è? [?·é??•ç??è¼¯]\n- è¼¸å‡º?•ç?çµæ?\n- ?•ç??°å¸¸?…æ?\nè«‹å??«å??´ç?ç¯„ä??Œä½¿?¨æ??—ã€‚ã€? :
          'ChatGPT is a powerful programming assistant that can help both beginners and professional developers.',
        keyPoints: isZhHK ? [
          'ç¨‹å?è§??ï¼šé€è??†æ??æ?ç®—æ??Ÿç??æ?å¿µèªª??,
          '?¤éŒ¯?”åŠ©ï¼šéŒ¯èª¤è¨º?·ã€ä¿®å¾©æ–¹æ¡ˆã€é??²å»ºè­?,
          '?³æœ¬ç·¨å¯«ï¼šè‡ª?•å?ä»»å??æ•¸?šè??†ã€å??´è¨»??,
          'å­¸ç??¯æ´ï¼šé©?‰ä??Œç?åº¦ã€æ?ä¾›å­¸ç¿’è?æº?,
          'å¯¦ç”¨å°å?ï¼šå³å­¸å³?¨ç?ç¨‹å?è¨­è?è§?±º?¹æ?'
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
      title: isZhHK ? '?®å? 4.5ï¼šå¯¦?°é???(äº? èªè?ç¿»è­¯?‡æ½¤é£¾å¤§å¸«ï??²è?å¤šå?èªè?ç²¾æ?ç¿»è­¯?‡å?æ¥­ç??‡ç??¡å?' : 'Unit 4.5: Project 5: Language Translation & Polishing Master',
      duration: '25?†é?',
      type: 'project' as const,
      description: isZhHK ? '?Œæ¡ ChatGPT ?„è?è¨€?•ç??½å?ï¼Œå¯¦?¾å?æ¥­ç??„ç¿»è­¯å??‡æ?æ½¤é£¾?? : 'Master ChatGPT\'s language processing capabilities for professional-level translation and copywriting.',
      content: {
        transcript: isZhHK ? 
          'ChatGPT ?¨è?è¨€?•ç??¹é¢è¡¨ç¾?ºè‰²ï¼Œèƒ½?ä?é«˜è³ª?ç?ç¿»è­¯?Œæ?å­—æ½¤é£¾æ??™ã€‚\n\n**å°ˆæ¥­ç¿»è­¯?€å·§ï?**\n\n**?…å??–ç¿»è­?*ï¼š\n?Œè?å°‡ä»¥ä¸?[æºè?è¨€] ?‡å?ç¿»è­¯??[?®æ?èªè?]ï¼š\n[?Ÿæ??§å®¹]\n\nç¿»è­¯è¦æ?ï¼š\n- ?®æ?è®€?…ï?[?·é??è¿°]\n- ?‡é?é¢¨æ ¼ï¼š[æ­??/?æ­£å¼??€è¡“æ€??‡å­¸?§]\n- ?‡å??©æ?ï¼šè€ƒæ…®?®æ??‡å??„è¡¨?”ç??£\n- è¡“è??•ç?ï¼šä??å?æ¥­è?èªç?æº–ç¢º?§\n- èªèª¿ä¿æ?ï¼šè??Ÿæ??…æ??²å½©ä¸€?´\n\nè«‹æ?ä¾›ç¿»è­¯ç??œå??è?ç¿»è­¯èªªæ??‚ã€\n\n**å¤šç??¬ç¿»è­¯æ?è¼?*ï¼š\n?Œç‚º?™æ®µ?‡å??ä? 3 ?‹ä??Œé¢¨?¼ç?ç¿»è­¯?ˆæœ¬ï¼š\n- ?ˆæœ¬ 1ï¼šç›´è­¯ç?ï¼ˆå?å¯¦å??‡ç?æ§‹ï?\n- ?ˆæœ¬ 2ï¼šæ?è­¯ç?ï¼ˆæ??¢è‡ª?¶è¡¨?”ï?\n- ?ˆæœ¬ 3ï¼šå‰µ?ç?ï¼ˆé©?‰ç›®æ¨™æ??–ï?\nä¸¦è§£?‹æ??‹ç??¬ç??¹é??Œé©?¨å ´?¯ã€‚ã€\n\n**?‡ç?æ½¤é£¾?å?ï¼?*\n\n**?¨é¢?¡å?æµç?**ï¼š\n?Œè?å°ä»¥ä¸‹æ?ç« é€²è??¨é¢?¡å??Œæ½¤é£¾ï?\n[?‡ç??§å®¹]\n\n?¡å??é?ï¼š\n1. èªæ??Œæ‹¼å¯«æª¢?¥\n2. ?¥å?çµæ??ªå?\n3. è©å??¸æ??¹å?\n4. ?è¼¯?†å?èª¿æ•´\n5. ?´é??¯è??§æ??‡\n\nè«‹æ?ç¤ºæ??‰ä¿®?¹ä¸¦è§??ä¿®æ”¹?Ÿå??‚ã€\n\n**é¢¨æ ¼èª¿æ•´å°ˆå®¶**ï¼š\n?Œå??™ç??‡ç??„é¢¨?¼å? [?Ÿé¢¨?¼] èª¿æ•´??[?®æ?é¢¨æ ¼]ï¼š\n[?Ÿæ??§å®¹]\n\nèª¿æ•´èªªæ?ï¼š\n- ?®æ?è®€?…è??–\n- èªèª¿è½‰æ?è¦æ?\n- å°ˆæ¥­ç¨‹åº¦èª¿æ•´\n- ?…æ??²å½©è®Šå?\n\nè«‹æ?ä¾›èª¿?´å??„ç??¬å?é¢¨æ ¼è®Šå?èªªæ??‚ã€\n\n**å¤šè?è¨€?§å®¹ç­–ç•¥ï¼?*\n\n**?¬åœ°?–å»ºè­?*ï¼š\n?Œç‚º?²å…¥ [?®æ?å¸‚å ´] å¸‚å ´ï¼Œè??ºæ??‘ç? [?¢å?/?å?] ?ä??§å®¹?¬åœ°?–å»ºè­°ï?\n- ?‡å??æ??§è€ƒé?\n- èªè?è¡¨é?ç¿’æ…£\n- ?ŸéŠ·ä¿¡æ¯èª¿æ•´\n- è¦–è¦º?ƒç?å»ºè­°\n- ?¿å??„æ??–ç?å¿Œã€? :
          'ChatGPT excels in language processing, providing high-quality translation and text polishing services.',
        keyPoints: isZhHK ? [
          'å°ˆæ¥­ç¿»è­¯ï¼šæ?å¢ƒå??•ç??æ??–é©?‰ã€è?èªæ?ç¢?,
          'å¤šç??¬å?æ¯”ï??´è­¯?æ?è­¯ã€å‰µ?ç??¬é¸??,
          '?‡ç?æ½¤é£¾ï¼šè?æ³•æ ¡å°ã€ç?æ§‹å„ª?–ã€å¯è®€?§æ???,
          'é¢¨æ ¼èª¿æ•´ï¼šè?èª¿è??›ã€è??…é©?‰ã€æ??Ÿæ???,
          '?¬åœ°?–ç??¥ï??‡å??ƒé??å??´é©?‰ã€ç?å¿Œé¿??
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

    // ç¬¬ä?ä¸»é?ï¼šæ?? å?å±?AI ???‹äºº?–è? GPT ?†å?
    '22': {
      id: 22,
      themeId: 5,
      title: isZhHK ? '?®å? 5.1ï¼šAdvanced Data Analysis (?¸æ??†æ?å¤§å¸«)ï¼šä???Excel/CSV/PDFï¼Œé€²è??¸æ??†æ??‡å?è¡¨è£½ä½? : 'Unit 5.1: Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',
      duration: '35?†é?',
      type: 'advanced' as const,
      description: isZhHK ? 'å­¸ç?ä½¿ç”¨ ChatGPT ??Advanced Data Analysis ?Ÿèƒ½ï¼Œè??†å??†æ??„ç¨®?¸æ??‡ä»¶?? : 'Learn to use ChatGPT\'s Advanced Data Analysis feature to process and analyze various data files.',
      content: {
        transcript: isZhHK ? 
          'Advanced Data Analysis ??ChatGPT Plus ?„å¼·å¤§å??½ï??½å??•ç? Excel?CSV?PDF ç­‰å?ç¨®æ?ä»¶æ ¼å¼ï??²è?æ·±åº¦?¸æ??†æ??‚\n\n**?‡ä»¶ä¸Šå‚³?‡è??†ï?**\n\n**Excel ?‡ä»¶?†æ?**ï¼š\n?Œæ?ä¸Šå‚³äº†ä??‹éŠ·?®æ•¸?šç? Excel ?‡ä»¶ï¼Œè?å¹«æ?ï¼š\n1. ?†æ??¸æ??„åŸº?¬ç?æ§‹å?çµ±è?è³‡è?\n2. è­˜åˆ¥?·å”®è¶¨å‹¢?Œå­£ç¯€?§æ¨¡å¼\n3. ?¾å‡ºè¡¨ç¾?€å¥½å??€å·®ç??¢å?é¡åˆ¥\n4. è¨ˆç??œéµç¸¾æ??‡æ?ï¼ˆKPIï¼‰\n5. ?µå»ºè¦–è¦º?–å?è¡¨å?ç¤ºä¸»è¦ç™¼?¾\n6. ?ä??¹å??·å”®?„å…·é«”å»ºè­°ã€\n\n**CSV ?¸æ?æ¸…ç?**ï¼š\n?Œé€™å€?CSV ?‡ä»¶?…å«å®¢æˆ¶?¸æ?ï¼Œè??”åŠ©ï¼š\n- æª¢æŸ¥?¸æ?å®Œæ•´?§å?ä¸€?´æ€§\n- è­˜åˆ¥?Œè??†ç¼ºå¤±å€¼\n- ?¼ç¾?è?è¨˜é?ä¸¦å»ºè­°è??†æ–¹æ³•\n- æ¨™æ??–æ•¸?šæ ¼å¼\n- ?µå»º?¸æ??è³ª?±å??\n\n**PDF ?‡ä»¶è§??**ï¼š\n?Œè??†æ??™ä»½ PDF ?±å?ï¼š\n- ?å??œéµ?¸æ??Œçµ±è¨ˆè?è¨Š\n- ç¸½ç?ä¸»è??¼ç¾?Œç?è«–\n- è­˜åˆ¥?è?è¶¨å‹¢?Œæ¨¡å¼\n- ?‡æ­·?²æ•¸?šé€²è?æ¯”è??†æ?\n- è£½ä??˜è??Œå¯è¦–å??–è¡¨?\n\n**?¸æ??†æ?æµç?ï¼?*\n\n**?¢ç´¢?§æ•¸?šå???(EDA)**ï¼š\n?Œå??™å€‹æ•¸?šé??²è??¨é¢?„æ¢ç´¢æ€§å??ï?\n1. ?¸æ?æ¦‚è¦½?ŒåŸº?¬çµ±è¨ˆ\n2. è®Šé??†ä??†æ?\n3. ?¸é??§å??\n4. ?°å¸¸?¼æª¢æ¸¬\n5. ç¼ºå¤±?¼æ¨¡å¼å??\n6. ?¸æ??¯è??–\n7. ?æ­¥æ´å??Œå?è¨­ã€\n\n**?†æ¥­?ºèƒ½?†æ?**ï¼š\n?ŒåŸº?¼é€™ä?æ¥­å??¸æ?ï¼Œè??ä?ï¼š\n- ?œéµæ¥­å??‡æ??†æ?\n- å®¢æˆ¶ç´°å??Œè??ºå??\n- å¸‚å ´è¶¨å‹¢è­˜åˆ¥\n- ?¶å…¥?Œæ??¬å??\n- ?æ¸¬?Œé?è­¦æ?æ¨™\n- è¡Œå?å»ºè­°?Œç??¥æ–¹?‘ã€? :
          'Advanced Data Analysis is a powerful feature of ChatGPT Plus that can process Excel, CSV, PDF and other file formats for deep data analysis.',
        keyPoints: isZhHK ? [
          '?‡ä»¶?¯æ´ï¼šExcel?CSV?PDF ç­‰å?ç¨®æ ¼å¼è???,
          '?¸æ?æ¸…ç?ï¼šå??´æ€§æª¢?¥ã€ç¼ºå¤±å€¼è??†ã€æ ¼å¼æ?æº–å?',
          '?†æ??Ÿèƒ½ï¼šè¶¨?¢å??ã€çµ±è¨ˆè?ç®—ã€ç•°å¸¸æª¢æ¸?,
          'è¦–è¦º?–ï??ªå??Ÿæ??–è¡¨?Œæ•¸?šå¯è¦–å?',
          '?†æ¥­æ´å?ï¼šKPI è¨ˆç??å®¢?¶å??ã€é?æ¸¬å»ºè­?
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
      title: isZhHK ? '?®å? 5.2ï¼šWeb Browse (å¯¦æ?ç¶²çµ¡?è¦½)ï¼šç??ˆå³?‚ç¶²çµ¡è?è¨Šï??²è?å¸‚å ´èª¿æŸ¥?‡æ–°?ç¸½çµ? : 'Unit 5.2: Web Browse: Real-time Web Information for Market Research',
      duration: '30?†é?',
      type: 'advanced' as const,
      description: isZhHK ? '?Œæ¡ ChatGPT ?„ç¶²çµ¡ç€è¦½?Ÿèƒ½ï¼Œç²?–æ??°è?è¨Šä¸¦?²è??†æ??? : 'Master ChatGPT\'s web browsing feature to gather latest information and conduct analysis.',
      content: {
        transcript: isZhHK ? 
          'Web Browse ?Ÿèƒ½è®?ChatGPT ?½å?è¨ªå??³æ?ç¶²çµ¡è³‡è?ï¼Œå¤§å¤§æ“´å±•ä??¶çŸ¥è­˜ç??å?å¯¦ç”¨?§ã€‚\n\n**å¯¦æ?è³‡è??²å?ï¼?*\n\n**?°è???¸¬?‡ç¸½çµ?*ï¼š\n?Œè??œå?ä¸¦ç¸½çµä?å¤©é???[?¹å?ä¸»é?/?¬å¸/è¡Œæ¥­] ?„æ??°æ–°?ï?\n- ?—å‡º 5-10 æ¢æ??è??„æ–°?\n- æ¯æ??°è??ä?ç°¡æ??˜è?\n- ?†æ??´é?è¶¨å‹¢?Œå½±?¿\n- è­˜åˆ¥?œéµäº‹ä»¶?Œè??˜é?\n- ?æ¸¬?¯èƒ½?„å?çºŒç™¼å±•\n- ?ä??¸é??„æ?è³‡æ??†æ¥­å»ºè­°?\n\n**å¸‚å ´?”ç©¶?‡ç«¶?­å???*ï¼š\n?Œé?å°?[?¢å?/?å?/è¡Œæ¥­] ?²è?å¸‚å ´èª¿æŸ¥ï¼š\n- ?œå??€?°ç?å¸‚å ´?±å??Œæ•¸?š\n- ?†æ?ä¸»è?ç«¶çˆ­å°æ??„å??‹\n- è­˜åˆ¥å¸‚å ´è¶¨å‹¢?Œæ??ƒ\n- ?¶é?å®¢æˆ¶è©•åƒ¹?Œå?é¥‹\n- æ¯”è?å®šåƒ¹ç­–ç•¥\n- ç¸½ç?å¸‚å ´?²å…¥å»ºè­°?\n\n**?€è¡“è¶¨?¢è¿½è¹?*ï¼š\n?Œç?ç©?[?€è¡“é??Ÿ] ?„æ??°ç™¼å±•ï?\n- ?œå??€?°ç??€è¡“ç??´\n- ?†æ??è??”ç©¶è«–æ??Œå??©\n- è­˜åˆ¥?˜å??„å…¬?¸å??”ç©¶æ©Ÿæ?\n- è©•ä¼°?€è¡“æ??Ÿåº¦?Œæ??¨å??¯\n- ?æ¸¬?ªä??¼å??¹å?\n- ?ä??€è¡“æ?è³‡å»ºè­°ã€\n\n**å¯¦ç”¨?‰ç”¨?´æ™¯ï¼?*\n\n**?•è?æ±ºç??¯æ´**ï¼š\n?Œè?å¹«æ??”ç©¶ [?¬å¸?ç¨±/?¡ç¥¨ä»?¢¼]ï¼š\n- ?œå??€?°ç?è²¡å??±å??Œæ–°?\n- ?†æ??¡åƒ¹è¡¨ç¾?Œå??´å??‰\n- ?¶é??†æ?å¸«è?é»å?è©•ç?\n- è­˜åˆ¥é¢¨éšª? ç??Œæ??ƒ\n- æ¯”è??Œè?æ¥­å…¬?¸è¡¨?¾\n- ?ä??•è?å»ºè­°?Œé¢¨?ªè?ä¼°ã€\n\n**?…è?è¦å??´æ–°**ï¼š\n?Œç‚º?‘ç? [?®ç??°] ?…è?è¨ˆå??ä??€?°è?è¨Šï?\n- ?¥è©¢?¶å??„æ?è¡Œé??¶å?è¦æ?\n- ?œå??€?°ç??¯é??‹æ”¾?…æ?\n- ?¶é??¶åœ°å¤©æ°£?Œå­£ç¯€è³‡è?\n- ?¾åˆ°?€?°ç?æ´»å??Œç??¶\n- ?²å?äº¤é€šå?ä½å®¿?„æ??°åƒ¹?¼\n- ?ä?å®‰å…¨?é??Œæ³¨?ä??…ã€? :
          'The Web Browse feature allows ChatGPT to access real-time web information, greatly expanding its knowledge range and practicality.',
        keyPoints: isZhHK ? [
          '?³æ?è³‡è?ï¼šç²?–æ??°æ–°?ã€å ±?Šã€æ•¸??,
          'å¸‚å ´èª¿æŸ¥ï¼šç«¶?­å??ã€è¶¨?¢è??¥ã€å®¢?¶å?é¥?,
          '?€è¡“è¿½è¹¤ï??€?°ç??´ã€ç?ç©¶å??‹ã€ç™¼å±•é?æ¸?,
          '?•è??¯æ´ï¼šè²¡?™å??ã€é¢¨?ªè?ä¼°ã€å??´æ?è¼?,
          '?Ÿæ´»?‰ç”¨ï¼šæ?è¡Œè??ƒã€ä?ä»¶è¿½è¹¤ã€å¯¦?¨è?è¨?
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
      title: isZhHK ? '?®å? 5.3ï¼šDALL-E 3 ?–å??Ÿæ?ï¼šç”¨?‡å??µé€ å‡ºå°ˆæ¥­ç´šç??†æ¥­?’å??ç°¡?±å??‡è??è?ä½œå?' : 'Unit 5.3: DALL-E 3 Image Generation: Create Professional Business Illustrations',
      duration: '32?†é?',
      type: 'creative' as const,
      description: isZhHK ? 'å­¸ç?ä½¿ç”¨ DALL-E 3 ?µä?é«˜è³ª?å??ï?æ»¿è¶³?„ç¨®?†æ¥­?Œå‰µ?é?æ±‚ã€? : 'Learn to use DALL-E 3 to create high-quality images for various business and creative needs.',
      content: {
        transcript: isZhHK ? 
          'DALL-E 3 ??ChatGPT ?´å??„å¼·å¤§å??ç??å·¥?·ï??½æ ¹?šæ?å­—æ?è¿°å‰µ? å‡ºä»¤äººé©šè??„è?è¦ºå…§å®¹ã€‚\n\n**å°ˆæ¥­?–å??µä??€å·§ï?**\n\n**?†æ¥­?’å?è¨­è?**ï¼š\n?Œè??ºæ??µä?ä¸€å¹…å?æ¥­æ??–ï?\nä¸»é?ï¼š[?·é?æ¥­å??´æ™¯]\né¢¨æ ¼ï¼šç¾ä»?€ç°¡æ½”ã€å?æ¥­\n?²å½©ï¼šä?æ¥­å??Œè‰²èª?[?·é?é¡è‰²]\n?ƒç?ï¼šå???[?¸é??†æ¥­?ƒç?]\n?¨é€”ï?ç¶²ç?é¦–é??ç°¡?±ã€è??·æ??™\nå°ºå¯¸å»ºè­°ï¼šé©?ˆç¶²?å??°åˆ·ä½¿ç”¨\n?…æ??ºèª¿ï¼šå¯ä¿¡ã€å‰µ?°ã€æ??Ÿã€\n\n**ç°¡å ±è¦–è¦º?ƒç?**ï¼š\n?Œç‚º?‘ç??†æ¥­ç°¡å ±?µä??å?ï¼š\nç°¡å ±ä¸»é?ï¼š[ä¸»é??§å®¹]\n?®æ??—çœ¾ï¼š[?·é??è¿°]\nè¨­è?è¦æ?ï¼š\n- é¢¨æ ¼ä¸€?´æ€§\n- æ¸…æ™°?„è?è¦ºå±¤æ¬¡\n- ?©å??•å½±é¡¯ç¤º\n- ?¯æ??¸å?è¨Šæ¯\n- å°ˆæ¥­ä¸”å¸å¼•äºº\nè«‹æ?ä¾?3-5 ?‹ä??Œç?è¨­è?æ¦‚å¿µ?\n\n**?ç?è¦–è¦ºè­˜åˆ¥**ï¼š\n?Œå??©è¨­è¨ˆå??Œç›¸?œå??ï?\nBrandï¼š[?ç??ç¨±?Œå?ä½]\n?¢å?/?å?ï¼š[?·é??è¿°]\n?®æ?å¸‚å ´ï¼š[?—çœ¾?¹å¾µ]\n?ç??‹æ€§ï?[å½¢å®¹è©æ?è¿°]\nè¦–è¦ºé¢¨æ ¼ï¼š[?¾ä»£/ç¶“å…¸/?µæ–°ç­‰]\n?‰ç”¨?´æ™¯ï¼šLogo?å?è£ã€å»£?Šã€ç¤¾ç¾¤å?é«”\nè«‹å‰µä½œé??¾å??Œç²¾ç¥ç?è¦–è¦º?ƒç??\n\n**?µæ??ç¤ºè©æ?å·§ï?**\n\n**?è¿°çµæ??ªå?**ï¼š\n?Œæ??ˆç? DALL-E 3 ?ç¤ºè©ç?æ§‹ï?\n1. ä¸»é??è¿°ï¼ˆè??µä?ä»€éº¼ï?\n2. é¢¨æ ¼?‡å?ï¼ˆè?è¡“é¢¨?¼ã€è?è¦ºé¢¨?¼ï?\n3. ?€è¡“å??¸ï??‰ç??æ??–ã€è‰²å½©ï?\n4. ?…æ??ºèª¿ï¼ˆæ??ã€æ??—ï?\n5. ?è³ªè¦æ?ï¼ˆé?è§??åº¦ã€å?æ¥­ç?ï¼‰\n6. ?ƒè€ƒé¢¨?¼ï??—å??è?å®¶ã€è¨­è¨ˆæ?æ´¾ï??\n\n**å¸¸è??‰ç”¨?´æ™¯**ï¼š\n\n**ç¤¾ç¾¤åª’é??§å®¹**ï¼š\n?Œç‚ºç¤¾ç¾¤åª’é?è²¼æ??µä??¸ç??–å?ï¼š\nå¹³å°ï¼š[Instagram/Facebook/LinkedIn]\n?§å®¹ä¸»é?ï¼š[è²¼æ??§å®¹]\nè¦–è¦ºé¢¨æ ¼ï¼šè??ç?ä¸€?´\nå°ºå¯¸è¦æ?ï¼šé©?ˆå?å¹³å°è¦ç?\n?‡å?ç©ºé?ï¼šé??™æ?é¡Œå?æ¨™è?ä½ç½®\nè¡Œå??¼ç±²ï¼šè?è¦ºä??¯æ? CTA?\n\n**?™è‚²?¹è??æ?**ï¼š\n?Œå‰µä½œæ?å­¸ç”¨?–å?ï¼š\nèª²ç?ä¸»é?ï¼š[?·é?èª²ç?]\nå­¸ç??®æ?ï¼š[?™å­¸?é?]\nå­¸å“¡ç¨‹åº¦ï¼š[?ç?/ä¸­ç?/é«˜ç?]\nè¦–è¦ºè¦æ?ï¼šæ??°ã€æ??‚ã€è??¶æ·±?»\né¢¨æ ¼?å¥½ï¼šå??„ã€å?æ¥­ã€å??¼æ€§ã€? :
          'DALL-E 3 is a powerful image generation tool integrated with ChatGPT that can create stunning visual content based on text descriptions.',
        keyPoints: isZhHK ? [
          '?†æ¥­?‰ç”¨ï¼šæ??–è¨­è¨ˆã€ç°¡?±é??–ã€å??Œè?è¦?,
          '?µæ??€å·§ï??ç¤ºè©ç?æ§‹ã€é¢¨?¼æ?å®šã€å?è³ªæ§??,
          'å¤šå??´æ™¯ï¼šç¤¾ç¾¤å?é«”ã€æ??²åŸ¹è¨“ã€è??·æ???,
          'å°ˆæ¥­?è³ªï¼šé?è§??åº¦ã€å?æ¥­ç??¥ç?è¦–è¦º?ˆæ?',
          '?ˆç??å?ï¼šå¿«?Ÿç”¢?Ÿå??‹è¨­è¨ˆæ?å¿µå??ˆæœ¬'
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
      title: isZhHK ? '?®å? 5.4ï¼šå‰µå»ºä??„ç¬¬ä¸€??Custom GPTï¼šç„¡?€ç·¨ç?ï¼Œæ??Šæ??™ä??“é€ å€‹äººå°ˆå±¬??AI ?‰ç”¨' : 'Unit 5.4: Create Your First Custom GPT: Build Personal AI Applications Without Programming',
      duration: '28?†é?',
      type: 'practical' as const,
      description: isZhHK ? 'å­¸ç??µå»º?ªè? GPTï¼Œæ?? å??€?–ç? AI ?©æ?ä¾†è§£æ±ºç‰¹å®šå?é¡Œã€? : 'Learn to create custom GPTs and build specialized AI assistants to solve specific problems.',
      content: {
        transcript: isZhHK ? 
          'Custom GPT è®“ä??½å??µå»ºå°ˆé??–ç? AI ?©æ?ï¼Œç„¡?€ç·¨ç??¥è?å°±èƒ½?“é€ å€‹äººå°ˆå±¬??AI ?‰ç”¨?‚\n\n**Custom GPT ?µå»ºæµç?ï¼?*\n\n**æ¦‚å¿µè¨­è??æ®µ**ï¼š\n?Œè??ƒä???Custom GPTï¼š\n?®ç?ï¼šè?è§?±ºä»€éº¼å?é¡Œï?\n?®æ??¨æˆ¶ï¼šèª°?ƒä½¿?¨é€™å€?GPTï¼Ÿ\n?¸å??Ÿèƒ½ï¼šä¸»è¦æ?ä¾›å“ªäº›æ??™ï?\nå°ˆæ¥­?˜å?ï¼šé?è¦ä?éº¼å?æ¥­çŸ¥è­˜ï?\näº’å?é¢¨æ ¼ï¼šæ­£å¼ã€å??„ã€æ?è¡“æ€§ï?\n?¨ç‰¹?¹å€¼ï??‡å…¶ä»?GPT ?„å·®?°å?ï¼Ÿã€\n\n**?¥è?åº«å»ºè¨?*ï¼š\n?Œç‚º Custom GPT æº–å??¥è??§å®¹ï¼š\n- ä¸Šå‚³?¸é??‡æ??Œè??™\n- ?´ç?å¸¸è??é??Œç?æ¡ˆ\n- å»ºç?å°ˆæ¥­è¡“è?è©å…¸\n- ?¶é??€ä½³å¯¦è¸æ?ä¾‹\n- æº–å?ç¯„ä?å°è©±?Œå??‰\n- è¨­å??æ??„è?èª¿å?é¢¨æ ¼?\n\n**å¯¦ç”¨ Custom GPT ç¯„ä?ï¼?*\n\n**?†æ¥­é¡§å? GPT**ï¼š\n?Œå‰µå»ºä?æ¥­å??¨é¡§?ï?\nè§’è‰²ï¼šè?æ·±å?æ¥­ç??¥é¡§?\nå°ˆé•·ï¼šä¸­å°ä?æ¥­ç??‹å„ª?–\n?¥è??ºç?ï¼šè?æ¥­æ?ä½³å¯¦è¸ã€æ?ä¾‹ç?ç©¶\n?å?ç¯„å?ï¼šç??¥è??ƒã€ç??‹æ”¹?„ã€å??´å??\næºé€šé¢¨?¼ï?å°ˆæ¥­?ç?æ§‹å??è??•å??‘\n?¹æ??Ÿèƒ½ï¼šSWOT ?†æ??å?æ¥­æ¨¡å¼è¨­è¨ˆã€\n\n**å­¸ç?è¼”å? GPT**ï¼š\n?Œæ?? å€‹äºº?–å­¸ç¿’åŠ©?‹ï?\nå°ˆæ¥­?˜å?ï¼š[?¹å?å­¸ç??–æ??½]\n?™å­¸é¢¨æ ¼ï¼šå¾ªåºæ¼¸?²ã€ä??•å?ç­”\nå­¸ç?è³‡æ?ï¼šæ??ã€ç·´ç¿’é??å??ƒè??™\nè©•ä¼°æ©Ÿåˆ¶ï¼šé€²åº¦è¿½è¹¤?å¼±é»è??¥\næ¿€?µç³»çµ±ï?é¼“å‹µ?Œå»ºè­°\n?©æ??§ï??¹æ?å­¸ç??²åº¦èª¿æ•´??º¦?\n\n**Creative GPT**ï¼š\n?Œè¨­è¨ˆå‰µ?åŠ©?‹ï?\n?µæ??˜å?ï¼šå¯«ä½œã€è¨­è¨ˆã€éŸ³æ¨‚ã€å½±?‡\n?ˆæ?ä¾†æ?ï¼šå¤§?å‰µ?ä??æ?ä¾‹\n?µä?æµç?ï¼šå?æ§‹æ€åˆ°?·è??„å??´æ?å°\né¢¨æ ¼å¤šæ¨£ï¼šä??Œæ?æ´¾å??€æ³•\n?”ä?æ¨¡å?ï¼šè??¨æˆ¶?±å??µä?\n?è³ª?§åˆ¶ï¼šå‰µ?è?ä¼°å??¹å?å»ºè­°?\n\n**GPT ?ªå??€å·§ï?**\n\n**?ç¤ºè©å„ª??*ï¼š\n?Œå???Custom GPT ?„ç³»çµ±æ?ç¤ºï?\n1. æ¸…æ™°?„è??²å?ç¾©\n2. ?·é??„è??ºæ?å¼•\n3. ?æ??¼å?è¦ç?\n4. å°ˆæ¥­?¥è??Šç?\n5. ?¯èª¤?•ç?æ©Ÿåˆ¶\n6. ?¨æˆ¶é«”é??ªå??\n\n**æ¸¬è©¦?‡æ”¹??*ï¼š\n?ŒCustom GPT ?è³ªä¿è?ï¼š\n- å¤šå ´?¯æ¸¬è©¦å?è©±\n- ?¶é??¨æˆ¶?é?\n- ?ç??ªå??æ??è³ª\n- ?´å??¥è?åº«å…§å®¹\n- èª¿æ•´äº’å?é¢¨æ ¼\n- ??§ä½¿ç”¨?ˆæ??? :
          'Custom GPT allows you to create specialized AI assistants and build personal AI applications without programming knowledge.',
        keyPoints: isZhHK ? [
          '?µå»ºæµç?ï¼šæ?å¿µè¨­è¨ˆã€çŸ¥è­˜å»ºè¨­ã€ç³»çµ±é?ç½?,
          '?‰ç”¨ç¯„ä?ï¼šå?æ¥­é¡§?ã€å­¸ç¿’è?å°ã€å‰µ?åŠ©??,
          '?ªå??€å·§ï??ç¤ºè©å??„ã€æ¸¬è©¦æ”¹?²ã€ç”¨?¶å?é¥?,
          '?¡é?ç·¨ç?ï¼šè?è¦ºå??Œé¢?ä?ï¼Œç°¡?®æ???,
          '?‹äºº?–å??¶ï?å°ˆå±¬?Ÿèƒ½?é¢¨?¼ã€çŸ¥è­˜é???
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
      title: isZhHK ? '?®å? 5.5ï¼šGPTs ?‰ç”¨?†å??„ç?å¯†ï?å¦‚ä??¼ä?ä½ ç? GPTï¼Œç??³æœªä¾†å¯?½å?ä¸­ç²?? : 'Unit 5.5: GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',
      duration: '32?†é?',
      type: 'business' as const,
      description: isZhHK ? 'äº†è§£ GPT Store ?„é?ä½œæ??¶ï?å­¸ç?å¦‚ä??¼ä??Œæ¨å»????Custom GPT?? : 'Understand how GPT Store works and learn to publish and promote your Custom GPT.',
      content: {
        transcript: isZhHK ? 
          'GPT Store ?ºå‰µä½œè€…æ?ä¾›ä??†äº«?Œæ??¨ç²?©ç?å¹³å°ï¼Œä?è§?…¶?‹ä?æ©Ÿåˆ¶å°æ??Ÿç™¼ä½ˆè‡³?œé?è¦ã€‚\n\n**GPT Store ?¼ä?æµç?ï¼?*\n\n**?¼ä??æ???*ï¼š\n?Œæ??™ç™¼ä½ˆä???Custom GPTï¼š\n1. å®Œå? GPT ?Ÿèƒ½?Œæ€§èƒ½\n2. ?µå»º?¸å?äººç??ç¨±?Œæ?è¿°\n3. è¨­è?å°ˆæ¥­?„å?æ¨™å?è¦–è¦º?ƒç?\n4. ?°å¯«æ¸…æ™°?„ä½¿?¨èªª?\n5. ?²è??¨é¢æ¸¬è©¦?Œå„ª?–\n6. æº–å?ç¤ºç?æ¡ˆä??Œç?ä¾‹å?è©±\n7. è¨­å??©ç•¶?„é??¥å?æ¨™ç±¤?\n\n**å¸‚å ´å®šä?ç­–ç•¥**ï¼š\n?Œæ‰¾?°ä???GPT ?¨ç‰¹å®šä?ï¼š\n?®æ??¨æˆ¶ï¼šæ?ç¢ºå?ç¾©ä½¿?¨è€…ç¾¤é«”\nè§?±º?›é?ï¼šè??¥å…·é«”ç??¨æˆ¶?€æ±‚\nç«¶çˆ­?†æ?ï¼šç?ç©¶é?ä¼¼ç? GPT ?‰ç”¨\nå·®ç•°?–å„ª?¢ï?çªå‡º?¨ç‰¹?Ÿèƒ½?Œåƒ¹?¼\nå¸‚å ´ç©ºç™½ï¼šç™¼?¾æœªè¢«æ»¿è¶³ç??€æ±‚\n?¨æˆ¶é«”é?ï¼šå„ª?–ä??•æ?ç¨‹å?æ»¿æ?åº¦ã€\n\n**?§å®¹?ªå???SEO**ï¼š\n\n**?è¿°?‡æ??ªå?**ï¼š\n?Œæ’°å¯«å¸å¼•äºº??GPT ?è¿°ï¼š\næ¨™é??ªå?ï¼šå??«é??µè?ï¼Œç°¡æ½”æ??›\n?Ÿèƒ½ä»‹ç´¹ï¼šæ?æ¥šèªª?æ ¸å¿ƒå??½å??ªå‹¢\nä½¿ç”¨?´æ™¯ï¼šæ?è¿°å…·é«”ç??‰ç”¨?…å?\n?¨æˆ¶?¶ç?ï¼šå¼·èª¿ä½¿?¨è€…èƒ½?²å??„åƒ¹?¼\n?œéµè©ç??¥ï??å…¥?¸é??œå?è©å?\nè¡Œå??¼ç±²ï¼šå?å°ç”¨?¶è©¦?¨å?äº’å??\n\n**è¦–è¦ºè¨­è??è???*ï¼š\n?Œæ?? å?æ¥­ç? GPT å½¢è±¡ï¼š\n?–æ?è¨­è?ï¼šç°¡æ½”ã€è??¥åº¦é«˜ã€ç¬¦?ˆå??½\n?²å½©?¸æ?ï¼šè??ç?ä¸€?´ï??¸å??®æ??¨æˆ¶\nè¦–è¦ºé¢¨æ ¼ï¼šå?æ¥­æ€§è?è¦ªå??›ç?å¹³è¡¡\n?ç?ä¸€?´æ€§ï??€?‰è?è¦ºå?ç´ å?èª¿çµ±ä¸€\n?¨æˆ¶èªçŸ¥ï¼šå®¹?“ç?è§??è¨˜æ†¶?\n\n**?¨å»£?‡ç??·ç??¥ï?**\n\n**ç¤¾ç¾¤åª’é??¨å»£**ï¼š\n?Œæ??ˆæ¨å»????Custom GPTï¼š\n- ??LinkedIn?Twitter ç­‰å¹³?°å?äº«\n- ?µå»ºä½¿ç”¨?™ç??Œæ?ä¾‹ç?ç©¶\n- ?ƒè??¸é?ç¤¾ç¾¤?Œè?è«–\n- ?‡æ?è¦‹é?è¢–å?å°ˆå®¶?ˆä?\n- å®šæ??†äº«?´æ–°?Œæ”¹?²\n- ?¶é??Œå?ç¤ºç”¨?¶è?è­‰ã€\n\n**?§å®¹è¡ŒéŠ·**ï¼š\n?Œå»ºç«?GPT ?„æ?å¨æ€§ï?\n- ?°å¯«?¸é??˜å??„å?æ¥­æ?ç« \n- è£½ä??ä??‡å??Œæ?ä½³å¯¦è¸\n- ?‰è¾¦ç·šä??”è??ƒæ??¹è?\n- ?µå»ºå½±ç??™ç??Œæ?ç¤º\n- å»ºç??¨æˆ¶ç¤¾ç¾¤?Œæ”¯?´ç³»çµ±\n- ?ç??ªå??Œå??½æ›´?°ã€\n\n**?ªä??²åˆ©æ©Ÿæ?**ï¼š\n\n**?†æ¥­æ¨¡å??¢ç´¢**ï¼š\n?ŒGPT è®Šç¾?„å¯?½é€”å?ï¼š\n1. ?´æ¥?¶è²»æ¨¡å?ï¼ˆå??œå¹³?°æ”¯?´ï?\n2. è«®è©¢?å??Œå®¢è£½å??‹ç™¼\n3. ?¹è?èª²ç??Œæ??²å…§å®¹\n4. ?ç??ˆä??Œè??©æ??ƒ\n5. ?²é??ˆæœ¬?Œå?æ¥­æ??™\n6. ?¸æ?æ´å??Œå??´ç?ç©¶ã€? :
          'GPT Store provides creators with a platform for sharing and potential monetization, understanding its mechanisms is crucial for successful publishing.',
        keyPoints: isZhHK ? [
          '?¼ä?æº–å?ï¼šå??½å??„ã€æ?è¿°å„ª?–ã€è?è¦ºè¨­è¨?,
          'å¸‚å ´å®šä?ï¼šç›®æ¨™ç”¨?¶ã€å·®?°å??ç«¶?­å???,
          'SEO ?ªå?ï¼šé??µè?ç­–ç•¥?æ?è¿°æ?æ¡ˆã€æ?å°‹å¯è¦‹åº¦',
          '?¨å»£ç­–ç•¥ï¼šç¤¾ç¾¤å?é«”ã€å…§å®¹è??·ã€ç”¨?¶è?è­?,
          '?²åˆ©æ©Ÿæ?ï¼šå??ƒè??¾æ¨¡å¼ã€å?æ¥­å?ä½œå¯??
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

    // ç¬¬å…­ä¸»é?ï¼šå??›æœªä¾????‰ç”¨?å€«ç??‡æ???    '27': {
      id: 27,
      themeId: 6,
      title: isZhHK ? '?®å? 6.1ï¼šAI ?„ã€Œå¹»è¦ºã€ç¾è±¡ï?å¦‚ä?è­˜åˆ¥ä¸¦æŸ¥è­?AI ?Ÿæ??„è??‡è?è¨? : 'Unit 6.1: AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',
      duration: '25?†é?',
      type: 'critical' as const,
      description: isZhHK ? 'äº†è§£ AI å¹»è¦º?¾è±¡?„æ?? ï?å­¸ç?è­˜åˆ¥?Œé?è­?AI è¼¸å‡º?„ç?å¯¦æ€§ã€? : 'Understand the causes of AI hallucination and learn to identify and verify the authenticity of AI outputs.',
      content: {
        transcript: isZhHK ? 
          'AI?Œå¹»è¦ºã€æ˜¯?‡äººå·¥æ™º?½ç??ç?ä¼¼å??†ä?å¯¦é??¯èª¤?–è?æ§‹ç?è³‡è?ï¼Œä?è§?€™å€‹ç¾è±¡å?è² è²¬ä»»åœ°ä½¿ç”¨ AI ?³é??è??‚\n\n**AI å¹»è¦º?„å?ç¾©è??¹å¾µï¼?*\n\n**ä»€éº¼æ˜¯ AI å¹»è¦º**ï¼š\nAI å¹»è¦º?‡ç??¯è?è¨€æ¨¡å??¨æ??‰è¶³å¤ æ?æ­?¢ºè³‡è??„æ?æ³ä?ï¼Œä??¶æ?ä»¥é?åº¦è‡ªä¿¡ç?èªèª¿?¢ç??¯èª¤?èª¤å°æ?å®Œå…¨?›æ??„å…§å®¹ã€‚é€™ä??æ?å¾€å¾€?¨è?æ³•å??è¼¯ä¸Šéƒ½å¾ˆé€šé?ï¼Œè?äººé›£ä»¥ç??³è??¥å…¶?›å??§ã€‚\n\n**å¸¸è??„å¹»è¦ºé???*ï¼š\n1. **äº‹å¯¦?§éŒ¯èª?*ï¼šéŒ¯èª¤ç??¥æ??äºº?ã€åœ°é»ã€æ•¸?š\n2. **?›æ?å¼•ç”¨**ï¼šä?å­˜åœ¨?„ç?ç©¶ã€æ›¸ç±ã€æ?ç« å??¨\n3. **?è¼¯?›ç›¾**ï¼šå?å¾Œä?ä¸€?´ç??³è¿°\n4. **?åº¦å¤–æ¨**ï¼šåŸº?¼æ??è?è¨Šå??ºé??¼ç?å°ç?çµè?\n5. **æ··å??Ÿå?**ï¼šå??Ÿå¯¦?Œè??‡è?è¨Šæ··?ˆå??¾\n\n**å¹»è¦º?¢ç??„å?? ï?**\n\n**?€è¡“å±¤?¢å???*ï¼š\n- è¨“ç·´?¸æ??„é??¶å??å·®\n- æ¨¡å?å°ä?ç¢ºå??§ç??•ç?ä¸ç•¶\n- ?Ÿæ?æ©Ÿåˆ¶?„éš¨æ©Ÿæ€§\n- ?¥è??ªæ­¢?¥æ??„é??¶\n- ?·æ??¬ç??ä¸­?„å?å·®ç´¯ç©\n\n**è­˜åˆ¥ AI å¹»è¦º?„æ?å·§ï?**\n\n**?¹åˆ¤?§æ€ç¶­æª¢æŸ¥**ï¼š\n?Œè?ä¼?AI ?æ??„å¯ä¿¡åº¦ï¼š\n1. äº‹å¯¦?¥è?ï¼šé?è¦æ•¸?šå??³è¿°?€è¦ç¨ç«‹é?è­‰\n2. ?è¼¯ä¸€?´æ€§ï?æª¢æŸ¥?å??³è¿°?¯å¦?›ç›¾\n3. ä¾†æ?è¿½è¹¤ï¼šè?æ±‚æ?ä¾›å…·é«”ç?è³‡æ?ä¾†æ?\n4. å¸¸è??¤æ–·ï¼šä??ˆç??„å…§å®¹é?è¦è³ª?‘\n5. å°ˆæ¥­?¥è?ï¼šåœ¨ä½ ç??‰ç??˜å?æª¢é?æº–ç¢º?§\n6. å¤šé?é©—è?ï¼šä½¿?¨å??‹è?è¨Šä?æºäº¤?‰é?è­‰ã€\n\n**å¯¦ç”¨é©—è??¹æ?**ï¼š\n\n**äº‹å¯¦?¥è?æµç?**ï¼š\n?Œå»ºç«‹ç³»çµ±æ€§ç?é©—è?ç¿’æ…£ï¼š\n- å°å…·é«”æ•¸?šå?çµ±è?è³‡è?ä¿æ??·ç?\n- ä½¿ç”¨?¯ä¿¡?„ä?å¯¦æŸ¥è­‰ç¶²ç«™\n- ?¥æ‰¾?Ÿå?è³‡æ?ä¾†æ?\n- è«®è©¢?˜å?å°ˆå®¶?è?\n- æ¯”è?å¤šå€?AI å·¥å…·?„å??‰\n- ä½¿ç”¨?œå?å¼•æ??¨ç?é©—è?\n- ?¹åˆ¥æ³¨æ??æ??–çˆ­è­°æ€§è©±é¡Œã€\n\n**é¢¨éšªè©•ä¼°ç­–ç•¥**ï¼š\n\n**é«˜é¢¨?ªæ??¨å ´??*ï¼š\n?Œåœ¨ä»¥ä??…æ?ä¸‹ç‰¹?¥è¬¹?ï?\n- ?«ç??¥åº·å»ºè­°\n- æ³•å??Œç›£ç®¡ä??™\n- è²¡å??•è?æ±ºç?\n- å­¸è??”ç©¶å¼•ç”¨\n- ?°è??Œæ?äº‹è?è¨Š\n- ?€è¡“è??¼å??ä??‡å?\n- å®‰å…¨?¸é??‡ç¤º?\n\n**?€ä½³å¯¦è¸å»ºè­?*ï¼š\n\n**è² è²¬ä»»ä½¿?¨å???*ï¼š\n?Œå»ºç«‹å¥åº·ç? AI ä½¿ç”¨ç¿’æ…£ï¼š\n1. ä¿æ??¹åˆ¤?§æ€ç¶­\n2. å»ºç?å¤šé?é©—è?æ©Ÿåˆ¶\n3. äº†è§£ AI ?„é??¶\n4. ?¨é?è¦æ±ºç­–ä¸­è«®è©¢å°ˆå®¶\n5. ?ç?å­¸ç??Œæ›´?°çŸ¥è­˜\n6. ?™è‚²ä»–äººè­˜åˆ¥ AI å¹»è¦º?? :
          'AI "hallucination" refers to artificial intelligence generating seemingly reasonable but actually incorrect or fabricated information. Understanding this phenomenon is crucial for responsible AI use.',
        keyPoints: isZhHK ? [
          'AI å¹»è¦ºï¼šè??‡ä??‹ä¼¼?ˆç??„AI?Ÿæ??§å®¹',
          'å¸¸è?é¡å?ï¼šä?å¯¦éŒ¯èª¤ã€è?æ§‹å??¨ã€é?è¼¯ç???,
          '?¢ç??Ÿå?ï¼šè?ç·´é??¶ã€ä?ç¢ºå??§è??†ã€çŸ¥è­˜æˆªæ­?,
          'è­˜åˆ¥?€å·§ï??¹åˆ¤?ç¶­?ä?å¯¦æŸ¥è­‰ã€å??é?è­?,
          'é¢¨éšªç®¡æ§ï¼šé?é¢¨éšª?´æ™¯è¬¹æ??å?å®¶è«®è©¢ã€æ?çºŒå­¸ç¿?
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
      title: isZhHK ? '?®å? 6.2ï¼šæ•¸?šç??±è?å®‰å…¨ï¼šä??„å?è©±å??¨å?ï¼Ÿå?ä½•ç®¡?†ä??„æ•¸?? : 'Unit 6.2: Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',
      duration: '22?†é?',
      type: 'security' as const,
      description: isZhHK ? 'äº†è§£ AI ?å??„éš±ç§æ”¿ç­–ï?å­¸ç?ä¿è­·?‹äºº?Œä?æ¥­æ•¸?šç??€ä½³å¯¦è¸ã€? : 'Understand AI service privacy policies and learn best practices for protecting personal and business data.',
      content: {
        transcript: isZhHK ? 
          '?¨ä½¿??ChatGPT ç­?AI ?å??‚ï?äº†è§£?¸æ??±ç??Œå??¨è­°é¡Œå??‹äºº?Œä?æ¥­éƒ½?³é??è??‚\n\n**?¸æ??¶é??‡ä½¿??*ï¼š\n\n**OpenAI ?„æ•¸?šæ”¿ç­?*ï¼š\nOpenAI ?ƒæ”¶?†ç”¨?¶ç?å°è©±?§å®¹?¨æ–¼?¹å??å??è³ªï¼Œä??‰å¹¾?‹é?è¦è€ƒé?ï¼š\n- ?è²»?ˆç”¨?¶ç?å°è©±?¯èƒ½?¨æ–¼æ¨¡å?è¨“ç·´\n- ChatGPT Plus ?¨æˆ¶?¯ä»¥?¸æ??€?ºæ•¸?šæ”¶?†\n- ä¼æ¥­?ˆæ?ä¾›æ›´?´æ ¼?„æ•¸?šä?è­·é¸?…\n- API ä½¿ç”¨?„æ•¸?šä??ƒç”¨?¼æ¨¡?‹è?ç·´\n\n**?±ç?é¢¨éšªè©•ä¼°**ï¼š\n\n**?‹äººè³‡è?æ´©éœ²é¢¨éšª**ï¼š\n?Œè??¥æ??¨ç??±ç?å¨è?ï¼š\n1. ?‹äººèº«ä»½è³‡è? (PII) ?å??†äº«\n2. ?æ??†æ¥­è³‡è?æ´©éœ²\n3. å®¢æˆ¶è³‡æ??Œè¯çµ¡æ–¹å¼\n4. è²¡å??Œé†«?‚è?è¨Š\n5. å¯†ç¢¼?Œç™»?¥æ?è­‰\n6. ?§éƒ¨?‡ä»¶?Œç??¥ã€\n\n**?¸æ?ä¿è­·?€ä½³å¯¦è¸?*ï¼š\n\n**?‹äºº?¨æˆ¶?‡å?**ï¼š\n?Œä?è­·ä??„å€‹äºº?±ç?ï¼š\n- ?¿å??†äº«?Ÿå¯¦å§“å??åœ°?€?é›»è©±\n- ä¸æ?ä¾›ä¿¡?¨å¡?Ÿç¢¼?–é?è¡Œè?è¨Š\n- ä½¿ç”¨?‡å??–ä»£?Ÿæ›¿ä»??å¯¦èº«ä»½\n- å®šæ?æª¢æŸ¥?Œæ??†å?è©±æ­·?²\n- ?Ÿç”¨?±ç?è¨­å??¸é?\n- äº†è§£?¸æ?ä¿ç??¿ç??\n\n**ä¼æ¥­å®‰å…¨ç­–ç•¥**ï¼š\n\n**?†æ¥­?¸æ?ä¿è­·**ï¼š\n?Œä?æ¥­ä½¿??AI ?„å??¨æ??‡ï?\n1. å»ºç??ç¢º??AI ä½¿ç”¨?¿ç?\n2. è¨“ç·´?¡å·¥?±ç??è?\n3. ä½¿ç”¨ä¼æ¥­ç´šæ??™æ–¹æ¡ˆ\n4. å¯¦æ–½?¸æ??†é?ç³»çµ±\n5. å®šæ??²è?å®‰å…¨å¯©æŸ¥\n6. å»ºç?äº‹æ??‰å?æµç??\n\n**?æ?è³‡è??¿ä»£ç­–ç•¥**ï¼š\n\n**è³‡è??¿å??–æ?å·?*ï¼š\n?Œå??¨åœ°ä½¿ç”¨ AI ?å?ï¼š\n- ??[?¬å¸A] ?¿ä»£?Ÿå¯¦?¬å¸?ç¨±\n- ??[å®¢æˆ¶B] ?¿ä»£?·é?å®¢æˆ¶ä¿¡æ¯\n- ä½¿ç”¨ç¤ºä??¸æ??Œé??Ÿå¯¦?¸æ?\n- ?è¿°?…å??Œé??·é?æ¡ˆä?\n- ?šç„¦?¹æ??Œé??æ?ç´°ç?\n- ä½¿ç”¨?šç”¨è¡“è??¿ä»£å°ˆæ??è??\n\n**æ³•è??µå¾ª?ƒé?**ï¼š\n\n**?¨ç??±ç?æ³•è?**ï¼š\n?Œä?è§?›¸?œæ?è¦è?æ±‚ï?\n- GDPRï¼ˆæ??Ÿä??¬æ•¸?šä?è­·è??‡ï?\n- CCPAï¼ˆå?å·æ?è²»è€…éš±ç§æ?ï¼‰\n- ?‹äººè³‡æ?ä¿è­·æ³•ï??°ç£ï¼‰\n- ?¸æ?å®‰å…¨æ³•ï?ä¸­å?ï¼‰\n- è¡Œæ¥­?¹å?è¦ç?ï¼ˆé??ã€é†«?‚ç?ï¼‰ã€\n\n**å®‰å…¨å·¥å…·?‡è¨­å®?*ï¼š\n\n**?±ç??§åˆ¶?¸é?**ï¼š\n?Œå„ª?–ä??„éš±ç§è¨­å®šï?\n1. ?œé?å°è©±æ­·å²è¨˜é?\n2. ç¦ç”¨?¸æ??¶é??¨æ–¼è¨“ç·´\n3. å®šæ??ªé™¤å°è©±è¨˜é?\n4. ä½¿ç”¨?¡ç??è¦½æ¨¡å?\n5. ?ƒæ…®ä½¿ç”¨ VPN ?å?\n6. ??§å¸³æˆ¶æ´»å??\n\n**äº‹æ??¿æ?è¨ˆå?**ï¼š\n\n**?¸æ?æ´©éœ²?‰å?**ï¼š\n?Œå??œæ‡·?‘æ•¸?šæ´©?²ï?\n- ç«‹å³?œæ­¢ä½¿ç”¨?¸é??å?\n- è¨˜é??Œè?ä¼°æ´©?²ç??\n- ?¯ç¹«?å??ä??†\n- ?šçŸ¥?¸é??ä»½?…\n- å¯¦æ–½?å®³?§åˆ¶?ªæ–½\n- æª¢è??Œæ”¹?„å??¨æ”¿ç­–ã€? :
          'When using AI services like ChatGPT, understanding data privacy and security issues is crucial for both individuals and businesses.',
        keyPoints: isZhHK ? [
          '?¸æ??¿ç?ï¼šä?è§£AI?å??„æ”¶?†å?ä½¿ç”¨è¦å?',
          'é¢¨éšªè©•ä¼°ï¼šè??¥å€‹äºº?Œå?æ¥­è?è¨Šæ´©?²å???,
          'ä¿è­·ç­–ç•¥ï¼šåŒ¿?å??è?è¨Šæ›¿ä»?€éš±ç§è¨­å®?,
          'ä¼æ¥­å®‰å…¨ï¼šæ”¿ç­–åˆ¶å®šã€å“¡å·¥åŸ¹è¨“ã€æ??™é¸??,
          'æ³•è??µå¾ªï¼šGDPR?CCPAç­‰éš±ç§æ?è¦è?æ±?
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
      title: isZhHK ? '?®å? 6.3ï¼šAI ?„å?è¦‹å?é¡Œï?èªè?è¨“ç·´?¸æ?å¸¶ä??„æ??¨å½±?¿ï?ä¸¦å­¸ç¿’å?ä½•æ?å°? : 'Unit 6.3: AI Bias Issues: Understanding Training Data Impact and How to Respond',
      duration: '20?†é?',
      type: 'ethical' as const,
      description: isZhHK ? '?¢è? AI ?è??„ä?æºå?å½±éŸ¿ï¼Œå­¸ç¿’è??¥å?æ¸›å??è??„ç??¥ã€? : 'Explore the sources and impacts of AI bias, learn strategies to identify and reduce bias.',
      content: {
        transcript: isZhHK ? 
          'AI ?è??¯æ?äººå·¥?ºèƒ½ç³»çµ±?¨è??†è?è¨Šæ?è¡¨ç¾?ºä??¬å¹³?–æ­§è¦–æ€§ç??¾å?ï¼Œä?è§?€™å€‹å?é¡Œæ??©æ–¼?´è?è²¬ä»»?°ä½¿??AI?‚\n\n**AI ?è??„ä?æº?*ï¼š\n\n**è¨“ç·´?¸æ??è?**ï¼š\nAI æ¨¡å??„è?ç·´æ•¸?šä??ªä??¯ç¶²?Œå?ç¨®æ??¬è?æºï??™ä?è³‡æ?ä¸å¯?¿å??°å??«ä?äººé?ç¤¾æ??„å?è¦‹å??»æ¿?°è±¡ï¼š\n- æ­·å²?‡ç»ä¸­ç??§åˆ¥?Œç¨®?å?è¦‹\n- ?°ç??Œæ??–ç?ä»?¡¨?§ä??‡\n- ç¤¾æ?ç¶“æ??°ä??„å·®?°\n- èªè??Œè¡¨?”æ–¹å¼ç??å¥½\n- ?¹å€¼è??Œä??Œè??„å??æ€§\n\n**å¸¸è??„å?è¦‹é???*ï¼š\n\n**ç¤¾æ?äººå£?è?**ï¼š\n?Œè??¥ä??Œé??‹ç? AI ?è?ï¼š\n1. ?§åˆ¥?è?ï¼šè·æ¥­åˆ»?¿å°è±¡ã€èƒ½?›å?è¨­\n2. ç¨®æ??è?ï¼šæ??–èª¤è§?€æ­·?²å?è¦‹\n3. å¹´é½¡?è?ï¼šä?ä»?·®?°ã€æ?è¡“èƒ½?›å?è¨­\n4. ?°ç??è?ï¼šè¥¿?¹ä¸­å¿ƒä¸»ç¾©ã€å??‰å·®?°\n5. èªè??è?ï¼šè‹±èªå„ª?ˆã€æ–¹è¨€æ­§è?\n6. ç¶“æ??è?ï¼šé?ç´šå?è¨­ã€æ?è²»èƒ½?›åˆ¤?·ã€\n\n**èªçŸ¥?è?**ï¼š\n?ŒAI ?¯èƒ½è¤‡è£½?„äººé¡è??¥å?è¦‹ï?\n- ç¢ºè??èª¤ï¼šå?å¥½æ”¯?æ—¢?‰è?é»ç?è³‡è?\n- ?¯å??§å?èª¤ï?é«˜ä¼°å¸¸è?äº‹ä»¶?„æ??‡\n- ä»?¡¨?§å?èª¤ï??åº¦æ¦‚æ‹¬å°æ¨£?¬ç‰¹å¾µ\n- ?¨å??èª¤ï¼šé?åº¦ä?è³´é?æ¬¡ç²å¾—ç?è³‡è?\n- ç¾¤é??ç¶­ï¼šç›²å¾å??¸æ?è¦‹ã€\n\n**?è?è­˜åˆ¥?€å·?*ï¼š\n\n**?¹åˆ¤?§è?ä¼°æ–¹æ³?*ï¼š\n?Œæª¢æ¸?AI ?æ?ä¸­ç?æ½›åœ¨?è?ï¼š\n1. å¤šè?åº¦æ¸¬è©¦ï??¨ä??Œèº«ä»½å??Œæ™¯?è??é?\n2. ?å?é©—è?ï¼šæ¸¬è©¦ç›¸?æ?å°ç??„æ?æ³\n3. ?‡å??æ??§ï?æª¢æŸ¥?¯å¦?ƒæ…®ä¸å??‡å?è§€é»\n4. èªè??†æ?ï¼šæ³¨?ç”¨è©æ˜¯?¦æ?ç¤ºåˆ»?¿å°è±¡\n5. ?¸æ?ä¾†æ?ï¼šè³ª?‘çµ±è¨ˆå?äº‹å¯¦?„ä»£è¡¨æ€§\n6. å°ˆå®¶è«®è©¢ï¼šåœ¨ä¸ç??‰é??Ÿå?æ±‚å?æ¥­æ?è¦‹ã€\n\n**æ¸›å??è??„ç???*ï¼š\n\n**?ç¤ºè©å„ª??*ï¼š\n?Œè¨­è¨ˆæ›´?¬å¹³??AI äº’å?ï¼š\n- ?ç¢ºè¦æ?å¤šå??–è?é»\n- ?¿å?ä½¿ç”¨?¯èƒ½?—ç¤º?è??„è?å½™\n- è¦æ??ƒæ…®ä¸å??‡å??Œè??¯\n- è«‹æ?å¹³è¡¡?Œå®¢è§€?„å??\n- ?ç¢º?‡å‡º?€è¦é¿?ç??è?é¡å?\n- è¦æ??ä?å¤šç¨®è§?±º?¹æ??\n\n**å¯¦ä??‰ç”¨**ï¼š\n\n**?¹å??ç¤ºè©ç?ä¾?*ï¼š\n\n**?Ÿå??ç¤º**ï¼šã€Œæ?è¿°ä??‹æ??Ÿç?ä¼æ¥­å®¶ã€\n**?¹è‰¯?ç¤º**ï¼šã€Œæ?è¿°ä??Œè??¯ç??å?ä¼æ¥­å®¶ï??…æ‹¬ä¸å??§åˆ¥?ç¨®?ã€å¹´é½¡å??°ç?ä½ç½®?„ä?å­ï??¿å??»æ¿?°è±¡?\n\n**?Ÿå??ç¤º**ï¼šã€Œè§£?‹ç‚ºä»€éº¼æ?äº›å?å®¶æ?è¼ƒç™¼?”ã€\n**?¹è‰¯?ç¤º**ï¼šã€Œå?å¤šå€‹è?åº¦å??å?å®¶ç™¼å±•ç?è¤‡é?? ç?ï¼Œé¿?ç°¡?–æ??è??§ç?è§??ï¼Œè€ƒæ…®æ­·å²?åœ°?†ã€æ”¿æ²»ã€ç?æ¿Ÿç?å¤šé?? ç??\n\n**çµ„ç?å±¤é¢?„æ?å°?*ï¼š\n\n**ä¼æ¥­ AI æ²»ç?**ï¼š\n?Œå»ºç«‹è?è²¬ä»»??AI ä½¿ç”¨?‡å?ï¼š\n1. ?¶å? AI ?«ç??¿ç?\n2. ?ä??è??è??¹è?\n3. å»ºç?å¤šå??–ç? AI ä½¿ç”¨?˜é?\n4. å®šæ?å¯©æŸ¥ AI ?¢å‡º?è³ª\n5. å»ºç??é??Œæ”¹?²æ??¶\n6. ?‡å??ƒå?ç¤¾ç¾¤ä¿æ?å°è©±?\n\n**?ç??¹é€?*ï¼š\n\n**å­¸ç??Œé©??*ï¼š\n?ŒåŸ¹é¤Šé•·?Ÿç??è??è?ï¼š\n- å®šæ??´æ–°å°å?è¦‹å?é¡Œç??†è§£\n- ?ƒè??¸é??„æ??²å?è¨è?\n- ?‡ä??Œè??¯ç?äººäº¤æµç?é©—\n- ?œæ³¨ AI ?«ç??„æ??°ç™¼å±•\n- ç©æ¥µ?ƒè??µå»º?´å…¬å¹³ç? AI ?°å??? :
          'AI bias refers to unfair or discriminatory tendencies in AI systems when processing information. Understanding this issue helps use AI more responsibly.',
        keyPoints: isZhHK ? [
          '?è?ä¾†æ?ï¼šè?ç·´æ•¸?šä¸­?„æ­·?²å?ç¤¾æ??è?',
          '?è?é¡å?ï¼šç¤¾?ƒäºº??€è??¥ã€æ??–ç?å¤šç¨®?è?',
          'è­˜åˆ¥?€å·§ï?å¤šè?åº¦æ¸¬è©¦ã€æ‰¹?¤æ€§è?ä¼°ã€å?å®¶è«®è©?,
          'æ¸›å?ç­–ç•¥ï¼šæ?ç¤ºè??ªå??å??ƒå?è¦æ??å¹³è¡¡å???,
          'çµ„ç?æ²»ç?ï¼šå€«ç??¿ç??åŸ¹è¨“æ??²ã€æ?çºŒæ”¹??
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
      title: isZhHK ? '?®å? 6.4ï¼šè?è²¬ä»»?°ä½¿??AIï¼šåœ¨å­¸è??å·¥ä½œè??µä?ä¸­æ??µå??„å€«ç??Œç?' : 'Unit 6.4: Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',
      duration: '18?†é?',
      type: 'ethical' as const,
      description: isZhHK ? '?¢è??¨ä??Œé??Ÿä½¿??AI ?„å€«ç?æº–å??Œæ?ä½³å¯¦è¸ã€? : 'Explore ethical guidelines and best practices for using AI in different fields.',
      content: {
        transcript: isZhHK ? 
          'è² è²¬ä»»åœ°ä½¿ç”¨ AI ?€è¦åœ¨?„å€‹é??Ÿå»ºç«‹æ?ç¢ºç??«ç??Œç?ï¼Œå¹³è¡¡æ?è¡“ä¾¿?©è??“å¾·è²¬ä»»?‚\n\n**å­¸è??”ç©¶?«ç?**ï¼š\n\n**AI è¼”åŠ©?”ç©¶?„æ???*ï¼š\n?Œåœ¨å­¸è??°å?ä¸­ä½¿??AI ?„å€«ç??ƒé?ï¼š\n1. ?æ?åº¦å??‡ï??ç¢º?²æ? AI ?„ä½¿?¨ç??\n2. ?Ÿå‰µ?§ç¶­è­·ï?ç¢ºä??”ç©¶?„ç¨ç«‹æ€è€ƒåƒ¹?¼\n3. å¼•ç”¨è¦ç?ï¼šé©?¶æ?è¨?AI ?”åŠ©?„éƒ¨?†\n4. ?è³ª?§åˆ¶ï¼šäººå·¥é?è­?AI ?Ÿæ??„å…§å®¹\n5. å­¸è?èª ä¿¡ï¼šé¿?å? AI è¼¸å‡º?´æ¥ä½œç‚º?ªå·±?„æ??œ\n6. ?Œå?å¯©æŸ¥ï¼šæ¥?—å? AI ä½¿ç”¨?„ç›£???è©•ä¼°?\n\n**?¯æ¥?—ç?ä½¿ç”¨?´æ™¯**ï¼š\n?Œå­¸è¡“ç?ç©¶ä¸­ AI ?„é©?¶æ??¨ï?\n- ?‡ç»?œå??Œå?æ­¥æ•´?†\n- ?¸æ??†æ??Œæ¨¡å¼è??¥\n- èªè?æ½¤é£¾?Œæ ¼å¼å„ª?–\n- æ¦‚å¿µè§???Œç?è«–æ¢è¨\n- ?”ç©¶?¹æ??„å»ºè­°å?è¨è?\n- è·¨å­¸ç§‘çŸ¥è­˜ç??´å??\n\n**?‰é¿?ç?è¡Œç‚º**ï¼š\n?Œå­¸è¡“ä??¶ä½¿??AI ?„ä?å­ï?\n- ?´æ¥è¤‡è£½ AI ?Ÿæ??„è??‡æ®µ?½\n- ??AI ?½é€ å¯¦é©—æ•¸?šæ?çµæ?\n- ä¸è²??AI è¼”åŠ©å°±æ?äº¤ä?æ¥­\n- è®?AI ä»?›¿å®Œæ??¸å??µæ–°å·¥ä?\n- ä½¿ç”¨ AI ?²è?ä¸ç•¶?„å??•è?è­°ã€\n\n**?·å ´?‰ç”¨?«ç?**ï¼š\n\n**å°ˆæ¥­è²¬ä»»?Œç?**ï¼š\n?Œå·¥ä½œç’°å¢ƒä¸­??AI ä½¿ç”¨?Ÿå?ï¼š\n1. ?¬å¸?¿ç??µå¾ªï¼šä?è§?¸¦?µå?çµ„ç???AI ä½¿ç”¨è¦ç?\n2. å®¢æˆ¶?©ç?ä¿è­·ï¼šç¢ºä¿?AI ä½¿ç”¨ä¸æ?å®³å®¢?¶æ??Š\n3. å°ˆæ¥­?½å?ç¶­è­·ï¼šä?è®?AI ?¿ä»£?¸å?å°ˆæ¥­?¤æ–·\n4. è³‡è?å®‰å…¨ï¼šé¿?æ´©?²æ??Ÿç??†æ¥­è³‡è?\n5. ?è³ªè²¬ä»»ï¼šå? AI è¼”åŠ©?„å·¥ä½œæ??œè?è²¬\n6. ?ç?å­¸ç?ï¼šä??å??å??‹äººå°ˆæ¥­?½å??\n\n**ä¸å??·æ¥­?„è€ƒé?**ï¼š\n\n**æ³•å?å°ˆæ¥­**ï¼š\n?Œå?å¸«ä½¿??AI ?„å€«ç??Œç?ï¼š\n- æ³•å??”ç©¶?Œæ?ä¾‹å??è??©\n- ?‡ä»¶èµ·è??„å?æ­¥å??©\n- å®¢æˆ¶è«®è©¢?„è??¯ç?ç©¶\n- ä½†ä??½å??¨ä?è³?AI ?šæ?å¾‹åˆ¤?·\n- å¿…é?äººå·¥é©—è??€?‰æ?å¾‹å»ºè­°\n- ä¿è­·å®¢æˆ¶?±ç??Œå?å¸«è·æ¥­ç‰¹æ¬Šã€\n\n**?«ç??¥åº·**ï¼š\n?Œé†«?‚å?æ¥?AI ä½¿ç”¨?„è¬¹?å??‡ï?\n- ?™è‚²?ŒçŸ¥è­˜æ›´?°ç?è¼”åŠ©å·¥å…·\n- è¡Œæ”¿å·¥ä??Œæ?æª”æ•´?†\n- ?”ç©¶?‡ç»?„æ?å°‹å?ç¸½ç?\n- çµ•ä??½æ›¿ä»?‡¨åºŠè¨º?·åˆ¤?·\n- ä¸æ?ä¾›å…·é«”ç?æ²»ç?å»ºè­°\n- ?´æ ¼ä¿è­·??€…éš±ç§è?è¨Šã€\n\n**?™è‚²?˜å?**ï¼š\n?Œæ?å¸«å??™è‚²å·¥ä??…ç? AI ?«ç?ï¼š\n- èª²ç??§å®¹?„æ??™å??”ç©¶\n- ?™å­¸?¹æ??„å‰µ?°æ¢ç´¢\n- å­¸ç?è©•ä¼°?„è??©å·¥?·\n- ?¹é?å­¸ç???AI ç´ é?\n- ç¤ºç?è² è²¬ä»»ç? AI ä½¿ç”¨\n- ?²æ­¢å­¸ç??åº¦ä¾è³´ AI?\n\n**?µä??‡æ™º?§è²¡?¢æ?**ï¼š\n\n**?µæ??¢æ¥­?«ç?**ï¼š\n?Œå‰µä½œè€…ä½¿??AI ?„è€ƒé?ï¼š\n1. ?Ÿå‰µ?§è²?ï??ç¢ºæ¨™ç¤º AI ?ƒè??„å‰µä½œéƒ¨?†\n2. ?ºæ…§è²¡ç”¢æ¬Šï?äº†è§£ AI ?Ÿæ??§å®¹?„ç?æ¬Šç?æ³\n3. ?è?å®Œæ•´?§ï?ä¿æ??‹äºº?µä?é¢¨æ ¼?Œç?å¿µ\n4. å¸‚å ´?¬å¹³ï¼šé¿?ä??¶ç«¶?­å„ª?¢\n5. ?‡å?å°Šé?ï¼šé¿??AI è¤‡è£½?æ??‡å??ƒç?\n6. ?€?½å¹³è¡¡ï?ç¶­æ??Œç™¼å±•å€‹äºº?µä??½å??\n\n**?†æ¥­?µä??‰ç”¨**ï¼š\n?Œå?æ¥­ç’°å¢ƒä¸­?„å‰µä½œå€«ç?ï¼š\n- å»???Œè??·å…§å®¹ç? AI è¼”åŠ©\n- ?¢å?è¨­è??Œå?è£ç??ˆæ?ä¾†æ?\n- ?ç??³æ’­?„å‰µ?ç™¼?³\n- å®¢æˆ¶é«”é??„å„ª?–å»ºè­°\n- ä½†é?ä¿æ??ç??Ÿå¯¦?§\n- ?¿å?èª¤å?æ¶ˆè²»?…ã€\n\n**å»ºç??‹äºº?«ç?æ¡†æ¶**ï¼š\n\n**?ªæ?è©•ä¼°?é?**ï¼š\n?Œä½¿??AI ?ç??«ç?æª¢è?ï¼š\n1. ?™ç¨®ä½¿ç”¨?¯å¦ç¬¦å?å°ˆæ¥­æ¨™æ?ï¼Ÿ\n2. ?‘æ˜¯?¦èƒ½å°ç??œæ‰¿?”è²¬ä»»ï?\n3. ?™æ¨£?šæ˜¯?¦å??ä?äººæ??Šï?\n4. ?‘æ˜¯?¦ä??ä?å­¸ç??Œæ??·ï?\n5. ?™ç¨®ä½¿ç”¨?¯å¦?æ??Œè?å¯¦ï?\n6. ?·æ?ä¾†ç??¯å¦?‰ç??¼ç¤¾?ƒï??? :
          'Responsible AI use requires establishing clear ethical boundaries in various fields, balancing technological convenience with moral responsibility.',
        keyPoints: isZhHK ? [
          'å­¸è??«ç?ï¼šé€æ??²æ??å??µç¶­è­·ã€å?è³ªæ§??,
          '?·å ´è²¬ä»»ï¼šæ”¿ç­–éµå¾ªã€å?æ¥­åˆ¤?·ã€è?è¨Šå???,
          'å°ˆæ¥­?Œç?ï¼šæ?å¾‹ã€é†«?‚ã€æ??²ç??˜å??„ç‰¹æ®Šè€ƒé?',
          '?µä??«ç?ï¼šå??µè²?ã€æ™º?§è²¡?¢æ??æ??–å???,
          '?‹äººæ¡†æ¶ï¼šè‡ª?‘è?ä¼°ã€è²¬ä»»æ‰¿?”ã€æ?çºŒå­¸ç¿?
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
      title: isZhHK ? '?®å? 6.5ï¼šäººå·¥æ™º?½ç??ªä?ï¼šå???GPT ?„ä?ä¸€æ­¥ç™¼å±•è?å°ç¤¾?ƒç??·é?å½±éŸ¿' : 'Unit 6.5: The Future of AI: GPT\'s Next Development and Long-term Social Impact',
      duration: '25?†é?',
      type: 'future' as const,
      description: isZhHK ? '?¢è? AI ?€è¡“ç??ªä??¼å?è¶¨å‹¢?Œå?ç¤¾æ??„å±¤?¢ç?æ½›åœ¨å½±éŸ¿?? : 'Explore future trends in AI technology and potential impacts on various aspects of society.',
      content: {
        transcript: isZhHK ? 
          'äººå·¥?ºèƒ½æ­???¼å¿«?Ÿç™¼å±•é?æ®µï?äº†è§£?¶æœªä¾†è¶¨?¢å??‹äºº?Œç¤¾?ƒç?è¦å??½å…·?‰é?è¦æ?ç¾©ã€‚\n\n**?€è¡“ç™¼å±•è¶¨??*ï¼š\n\n**æ¨¡å??½å??„æ???*ï¼š\n?Œæœªä¾?GPT ??AI æ¨¡å??„å¯?½ç™¼å±•ï?\n1. ?¨ç??½å?å¢å¼·ï¼šæ›´è¤‡é??„é?è¼¯æ€è€ƒå??é?è§?±º\n2. å¤šæ¨¡?‹æ•´?ˆï??‡æœ¬?å??ã€è²?³ã€å½±?‡ç??¡ç¸«çµå?\n3. å¯¦æ?å­¸ç?ï¼šæ?çºŒå??°è?è¨Šä¸­å­¸ç??Œé©?‰\n4. ?‹äºº?–ç?åº¦ï??´æ·±åº¦ç??¨æˆ¶?‹æ€§å?é«”é?\n5. å°ˆæ¥­?–å?å·¥ï??å??¹å??˜å??„æ·±åº¦å?ç²¾\n6. ?¯è§£?‹æ€§ï?AI æ±ºç??ç??„é€æ??–ã€\n\n**?€è¡“æ•´?ˆè¶¨??*ï¼š\n?ŒAI ?‡å…¶ä»–æ?è¡“ç??å?ï¼š\n- ?©è¯ç¶?(IoT)ï¼šæ™º?½å®¶å±…å??å??„å…¨?¢è??‹\n- ?´å?å¯¦å? (AR/VR)ï¼šæ?æµ¸å? AI äº¤ä?é«”é?\n- ?€å¡Šé?ï¼šå»ä¸­å??–ç? AI æ²»ç??Œæ??µæ??¶\n- ?å?è¨ˆç?ï¼šç??´æ€§ç?è¨ˆç??½å??å?\n- ?Šç·£è¨ˆç?ï¼šæœ¬?°å???AI ?•ç??½å?\n- ?¦æ?ä»‹é¢ï¼šç›´?¥ç??ç¶­-AI äº¤ä??\n\n**ç¤¾æ?å½±éŸ¿?æ¸¬**ï¼š\n\n**å·¥ä??Œå°±æ¥­è???*ï¼š\n?ŒAI å°å??•å??´ç??·æ?å½±éŸ¿ï¼š\næ­?¢å½±éŸ¿ï¼š\n- ?ªå??–é?è¤‡æ€§å·¥ä½œï??‹æ”¾äººå?å¾ä??µæ?å·¥ä?\n- ?µé€ æ–°?„è·æ¥­é??¥å?å·¥ä?æ©Ÿæ?\n- ?é??´é??Ÿç”¢?›å?ç¶“æ??ˆç?\n- ?ä??ä??å??„æ??¬å??€æª»\n\n?‘æˆ°ï¼š\n- ?ä??³çµ±?·æ¥­?¯èƒ½è¢«å?ä»£\n- ?€?½è?æ±‚å¿«?Ÿè??–ï??€è¦æ?çºŒå­¸ç¿’\n- ?¸ä?é´»æ??¯èƒ½? å?ç¤¾æ?ä¸å¹³ç­‰\n- ?å??¹å€¼å??ç¾©?„é??°å?ç¾©ã€\n\n**?™è‚²é«”ç³»è½‰å?**ï¼š\n?ŒAI ?‚ä»£?„æ??²è??©ï?\n- ?‹äºº?–å­¸ç¿’è·¯å¾‘å?ç¯€å¥\n- AI è¼”åŠ©?„æ™º?½æ?å­¸ç³»çµ±\n- ?€?½å??‘è€Œé??¥è?è¨˜æ†¶?„æ??²\n- çµ‚èº«å­¸ç??ç‚ºå¸¸æ?\n- ?µæ??æ‰¹?¤æ€ç¶­?æ??Ÿæ™º?½ç??è?\n- è·¨å­¸ç§‘æ•´?ˆèƒ½?›ç??¹é??\n\n**?«ç??¥åº·?©å‘½**ï¼š\n?ŒAI ?¨é†«?‚é??Ÿç??ªä??‰ç”¨ï¼š\n- ç²¾æ??«å­¸?Œå€‹äºº?–æ²»?‚\n- ?©æ??¾ç?æª¢æ¸¬?Œé??²\n- ?¥ç‰©?”ç™¼?„å??Ÿ\n- ? ç??«ç??Œå¥åº·ç›£æ¸¬\n- å¿ƒç??¥åº·??AI ?¯æ´\n- ?«ç?è³‡æ??„å„ª?–é?ç½®ã€\n\n**?«ç??Œæ²»?†æ???*ï¼š\n\n**?°è??«ç?è­°é?**ï¼š\n?ŒAI ?¼å?å¸¶ä??„å€«ç??ƒé?ï¼š\n1. AI æ¬Šåˆ©ï¼šç•¶ AI ?´å??ºèƒ½?‚ï??¯å¦?€è¦æ?å¾‹ä?è­·ï?\n2. äººæ??œä?ï¼šäººé¡è? AI ?„ç?ç·šåœ¨?ªè£¡ï¼Ÿ\n3. æ±ºç?è²¬ä»»ï¼šAI ?šæ±ºå®šæ?ï¼Œèª°?¿æ?å¾Œæ?ï¼Ÿ\n4. ?¸æ?ä¸»æ?ï¼šå€‹äºº?¸æ??„æ§?¶æ?æ­¸å±¬\n5. ç®—æ??æ?ï¼šAI æ±ºç??ç??„å¯?†è§£?§\n6. ?¸ä?äººæ ¼ï¼šè??¬èº«ä»½å??Ÿå¯¦èº«ä»½?„é?ä¿‚ã€\n\n**?¨ç?æ²»ç??€æ±?*ï¼š\n?Œå??›å?ä½œè?è¦ç?å»ºç?ï¼š\n- AI å®‰å…¨?„å??›æ?æº–å??”è­°\n- è·¨å??¸æ?æµå??„è??‡åˆ¶å®š\n- AI è»ä??‰ç”¨?„é??¶å…±è­˜\n- ?€è¡“è?ç§»å??¥è??±äº«æ©Ÿåˆ¶\n- ?¼å?ä¸­å?å®¶ç? AI ?½å?å»ºè¨­\n- ?¨ç? AI ?«ç?æ¡†æ¶?„å»ºç«‹ã€\n\n**?‹äºº?Œç¤¾?ƒç?æº–å?**ï¼š\n\n**?‹äºº?½å?å»ºè¨­**ï¼š\n?Œåœ¨ AI ?‚ä»£ä¿æ?ç«¶çˆ­?›ï?\n1. ?ç?å­¸ç??é??Œèƒ½?›\n2. è·¨é??ŸçŸ¥è­˜ç??´å?\n3. ?µæ??Œå‰µ?°æ€ç¶­\n4. ?…æ??ºèƒ½?Œäºº?›æ??½\n5. ?¹åˆ¤?§æ€è€ƒå??¤æ–·?›\n6. ?©æ?è®Šå??„é?æ´»æ€§ã€\n\n**ç¤¾æ??¶åº¦?©æ?**ï¼š\n?Œç¤¾?ƒå±¤?¢ç?æº–å?å·¥ä?ï¼š\n- ?™è‚²?¶åº¦?„å…¨?¢æ”¹?©\n- ç¤¾æ?ä¿é?é«”ç³»?„é??°è¨­è¨ˆ\n- æ³•å?æ¡†æ¶?„æ›´?°å?å®Œå?\n- ç¶“æ?æ¨¡å??„å‰µ?°æ¢ç´¢\n- ?‡å??¹å€¼ç??æ–°å¯©è?\n- ?‹é??ˆä?æ©Ÿåˆ¶?„å?å¼·ã€\n\n**ç©æ¥µ?ƒè??ªä?**ï¼š\n\n**?ç‚º AI ?‚ä»£?„ç?æ¥µå??‡è€?*ï¼š\n?Œå?ä½•åœ¨ AI ?¼å?ä¸­ç™¼?®ä??¨ï?\n- ä¿æ?å°æ–°?€è¡“ç??‹æ”¾?‹åº¦\n- ?ƒè? AI ?«ç??Œæ”¿ç­–ç?è¨è?\n- ?¯æ?è² è²¬ä»»ç? AI ?¼å?\n- ?¹é?ä¸‹ä?ä»?? AI ç´ é?\n- ?¨è‡ªå·±ç??˜å??¢ç´¢ AI ?‰ç”¨\n- ä¿ƒé€²å?å®¹æ€§ç??€è¡“ç™¼å±•ã€\n\n**çµè?ï¼šæ??±è??–ï?å¡‘é€ æœªä¾?*ï¼š\n\n?Œäººå·¥æ™º?½ç??ªä?ä¸æ˜¯?å??„å‘½?‹ï??Œæ˜¯?‘å€‘å…±?Œå‰µ? ç?çµæ??‚é€šé?è² è²¬ä»»ç??‹ç™¼?æ??ºç??‰ç”¨?å?ç©æ¥µ?„å??‡ï??‘å€‘å¯ä»¥ç¢ºä¿?AI ?€è¡“ç?æ­?‚ºäººé?ç¦ç??å?ï¼Œå‰µ? ä??‹æ›´? æ™º?½ã€å…¬å¹³ã€å??¯æ?çºŒç??ªä??‚ã€? :
          'Artificial intelligence is in a rapid development phase, and understanding its future trends is important for both personal and social planning.',
        keyPoints: isZhHK ? [
          '?€è¡“è¶¨?¢ï?æ¨¡å??½å?å¢å¼·?å?æ¨¡æ??´å??æ?è¡“è???,
          'ç¤¾æ?å½±éŸ¿ï¼šå°±æ¥­è??–ã€æ??²è??‹ã€é†«?‚é©??,
          '?«ç??‘æˆ°ï¼šæ–°?ˆè­°é¡Œã€å…¨?ƒæ²»?†ã€è²¬ä»»æ­¸å±?,
          '?‹äººæº–å?ï¼šæ?çºŒå­¸ç¿’ã€è·¨?˜å??½å??æ??Ÿæ™º??,
          'ç©æ¥µ?ƒè?ï¼šé??¾æ?åº¦ã€å€«ç?è¨è??å?å®¹ç™¼å±?
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

  // ?? ?§èƒ½?ªå?ï¼šç·©å­˜è??œè?ç®?  const currentUnit = useMemo(() => {
    const unit = units[unitId as keyof typeof units];
    if (!unit) {
      // ?ä?ä¸€?‹é?èªç??®å?çµæ?ä»¥é˜²æ­¢éŒ¯èª?      return {
        id: parseInt(unitId || '1'),
        themeId: parseInt(themeId || '1'),
        title: '?®å?ä¸å???,
        duration: '0?†é?',
        type: 'video' as const,
        description: 'è«‹æª¢?¥å–®?ƒID?¯å¦æ­?¢º',
        content: {
          transcript: '?®å??§å®¹ä¸å???,
          keyPoints: ['è«‹è??èª²ç¨‹é???]
        }
      };
    }
    return unit;
  }, [units, unitId]);

  if (!currentUnit || currentUnit.title === '?®å?ä¸å???) {
    return (
      <div className="min-h-screen chatgpt-unit-page text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">?®å?ä¸å???/h1>
          <button
            onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
            className="btn-ai-primary"
          >
            è¿”å?èª²ç?é¦–é?
          </button>
        </div>
      </div>
    );
  }

  const navigationConfig = useMemo(() => {
    const unitNum = parseInt(unitId || '1');
    const isLastUnitOfTheme = (
      unitNum === 5 ||   // ä¸»é?1çµæ?
      unitNum === 10 ||  // ä¸»é?2çµæ?  
      unitNum === 16 ||  // ä¸»é?3çµæ?
      unitNum === 21 ||  // ä¸»é?4çµæ?
      unitNum === 26 ||  // ä¸»é?5çµæ?
      unitNum === 31     // ä¸»é?6çµæ?ï¼ˆèª²ç¨‹ç??Ÿï?
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

  // ?¯ ä¿®å¾©?ˆè??‚å™¨ - ç§»é™¤?€?‰å¯?½å??´ç„¡?å¾ª?°ç?ä¾è³´
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    console.log(`?”§ [FIXED] è¨ˆæ??¨å?å§‹å?`, {
      currentUnitKey,
      isCompleted,
      forceTimerForTesting,
      shouldStart: !isCompleted || forceTimerForTesting
    });
    
    // ?¯ ?è?ä¿®å¾©ï¼šç•¶?®å?å·²å??ä?ä¸åœ¨æ¸¬è©¦æ¨¡å??‚ï?ç«‹å³?œæ­¢è¨ˆæ???    if (isCompleted && !forceTimerForTesting) {
      console.log(`?¹ï? [FIXED] ?®å?å·²å??ï?ç«‹å³?œæ­¢è¨ˆæ??¨`);
      setIsTimerActive(false);
      setLearningSeconds(0);
      return; // ?æ—©è¿”å?ï¼Œä??Ÿå??°ç?è¨ˆæ???    }
    
    // æ±ºå??¯å¦?Ÿå?è¨ˆæ???- ?ªæ??¨æœªå®Œæ??–æ¸¬è©¦æ¨¡å¼æ??å???    const shouldStart = !isCompleted || forceTimerForTesting;
    
    if (shouldStart) {
      console.log(`??[FIXED] ?Ÿå?è¨ˆæ??¨`);
      
      // ?ç½®?€??      setIsTimerActive(true);
      setLearningSeconds(0);
      setRealTimeDisplay('00:00:00');
      setTimerStartTime(Date.now());
      
      // ?Ÿå?è¨ˆæ???      interval = setInterval(() => {
        setLearningSeconds(prev => {
          const newSeconds = prev + 1;
          console.log(`??[FIXED] è¨ˆæ??¨æ›´?? ${newSeconds}ç§’`);
          
          // ?¼å??–é¡¯ç¤ºç‚º MM:SS ?¼å?
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const seconds = newSeconds % 60;
          
          // ?¼å??–ç‚º 00:00:00 ?¼å?
          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
          const display = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          
          // ?¹é??´æ–°é¡¯ç¤º
          setRealTimeDisplay(display);
          
          return newSeconds;
        });
      }, 1000);
      
      console.log(`?¯ [FIXED] è¨ˆæ??¨å‰µå»ºæ??Ÿ`);
    } else {
      console.log(`?¸ï? [FIXED] è¨ˆæ??¨ä??Ÿå? - ?®å?å·²å??`);
      setIsTimerActive(false);
    }
    
    // æ¸…ç??½æ•¸
    return () => {
      if (interval) {
        console.log(`?§¹ [FIXED] æ¸…ç?è¨ˆæ??¨`);
        clearInterval(interval);
      }
    };
  }, [currentUnitKey, isCompleted, forceTimerForTesting]); // ?¯ ?è?ä¿®å¾©ï¼šæ·»??isCompleted ä½œç‚ºä¾è³´

  return (
    <div className="min-h-screen chatgpt-unit-page" style={{ backgroundColor: '#121212' }}>
      {/* Skip Links for Keyboard Navigation */}
      <a href="#main-content" className="skip-link">
        è·³è‡³ä¸»è??§å®¹
      </a>
      <a href="#sidebar-content" className="skip-link">
        è·³è‡³å­¸ç?è¼”åŠ©?€
      </a>
      
      <Navigation />
      
      <div className="container mx-auto px-6 py-0 main-content-wrapper" role="main" aria-label="å­¸ç??é¢ä¸»è??§å®¹">
        {/* ?¯ ?¿æ?å¼æ™º?½Header - ç§»å?ç«¯å??„è¨­è¨?*/}
        <motion.header 
          className="header-ai-smart mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="banner"
          aria-label="èª²ç?å°èˆª?Œé€²åº¦è³‡è?"
        >
          {/* æ¡Œé¢?ˆHeader */}
          <div className="hidden lg:flex items-center justify-between py-4 px-6">
            
            {/* å·¦å´ï¼šè??å???*/}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary hover-lift click-scale focus-visible-enhanced"
                aria-label="è¿”å?ChatGPTå®Œæ•´?™å­¸èª²ç?é¦–é?"
              >
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">è¿”å?èª²ç?</span>
              </button>
              
              <button 
                onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                className="btn-ai-primary hover-lift click-scale focus-visible-enhanced"
                aria-label="è¿”å?å­¸ç?æ¦‚è¦½?é¢"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">å­¸ç?æ¦‚è¦½</span>
              </button>
              
              <div className="text-gray-400 text-sm" aria-label="èª²ç?ä½ç½®è³‡è?">
                <span className="text-gray-300 font-medium">ChatGPT å®Œæ•´?™å­¸</span>
                <span className="mx-2" aria-hidden="true">Â·</span>
                <span>ä¸»é? {themeId}</span>
            </div>
          </div>
          
            {/* ä¸­å¤®ï¼šé€²åº¦ä¿¡æ¯ + è¨ˆæ???*/}
            <div className="flex items-center space-x-6" role="region" aria-label="å­¸ç??²åº¦?Œè??‚å™¨">
              
              {/* å­¸ç??²åº¦ */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400" aria-label={`?®å??®å?ï¼šç¬¬${unitId}?®å?ï¼Œå…±31?‹å–®?ƒ`}>?®å? {unitId}/31</div>
                  <div className="text-lg font-bold text-white" aria-label={`ç¸½å­¸ç¿’é€²åº¦ï¼?{stats.totalProgress}%`}>{stats.totalProgress}%</div>
          </div>
                <div className="w-24 progress-ai-sm performance-optimized" role="progressbar" aria-valuenow={stats.totalProgress} aria-valuemin={0} aria-valuemax={100} aria-label="èª²ç??´é??²åº¦">
                  <motion.div 
                    className={`progress-ai-fill gpu-accelerated ${progressConfig.progressColorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.totalProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
              </div>

              {/* è¨ˆæ???- æ¥µç°¡??*/}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-ai-md transition-all duration-200 performance-optimized ${progressConfig.timerStatusClass}`} role="timer" aria-label={`?¬æ¬¡å­¸ç??‚é?ï¼?{realTimeDisplay}ï¼?{isTimerActive && !isCompleted ? 'è¨ˆæ??²è?ä¸? : isCompleted ? 'å­¸ç?å·²å??? : 'è¨ˆæ??¨æœª?Ÿå?'}`}>
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="font-mono text-sm font-medium">{realTimeDisplay}</span>
                {isTimerActive && !isCompleted && (
                  <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse gpu-accelerated" aria-hidden="true"></div>
                )}
              </div>
            </div>

            {/* ?³å´ï¼šä¸»è¦æ?ä½œæ???*/}
            <div className="flex items-center space-x-3" role="group" aria-label="å­¸ç??ä??‰é?">
              {(() => {
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`æ¨™è??®å?${unitId}?ºå·²å®Œæ?`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                      å®Œæ?å­¸ç?
                    </Button>
                  );
                }
                
                if (navigationConfig.isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 performance-optimized"
                      aria-label={`?²å…¥ä¸»é?${themeId}?„æ¸¬é©—`}
                    >
                      ?‹å?æ¸¬é?
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                } else {
                  return (
                    <Button 
                      onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                      className="btn-ai-primary hover-lift click-scale focus-visible-enhanced px-6 py-2 performance-optimized"
                      aria-label={`?å?ä¸‹ä?èª²ï??®å?${navigationConfig.nextUnitId}`}
                    >
                      ä¸‹ä?èª?                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  );
                }
              })()}
              
              {/* ä¸Šä?èª²æ???- ?ªåœ¨?€è¦æ?é¡¯ç¤º */}
              {navigationConfig.hasPrevUnit && (
                      <button
                  onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-md duration-200 hover-lift click-scale focus-visible-enhanced performance-optimized"
                  aria-label={`è¿”å?ä¸Šä?èª²ï??®å?${navigationConfig.prevUnitId}`}
                  title="ä¸Šä?èª?
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                          )}
                        </div>
          </div>

          {/* ç§»å?ç«¯Header - ?†ç?ä½ˆå? */}
          <div className="lg:hidden header-ai-mobile">
            {/* ç¬¬ä?è¡Œï?è¿”å? + èª²ç?ä¿¡æ¯ */}
            <div className="header-row">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleNavigateBack}
                  className="btn-ai-secondary btn-mobile-compact hover-lift click-scale focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">è¿”å?</span>
                      </button>

                <button 
                  onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
                  className="btn-ai-primary btn-mobile-compact hover-lift click-scale focus-ring"
                  aria-label="è¿”å?å­¸ç?æ¦‚è¦½?é¢"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">æ¦‚è¦½</span>
                </button>
                              </div>
              
              <div className="text-center flex-1 mx-4">
                <div className="text-white font-medium text-sm">?®å? {unitId}</div>
                <div className="text-gray-400 text-xs">ä¸»é? {themeId}</div>
              </div>
              
              {/* ä¸Šä?èª?ä¸‹ä?èª²å???*/}
              <div className="flex items-center space-x-2">
                {currentUnit.id > 1 && (
                  <button 
                    onClick={() => handleNavigatePrev(currentUnit.id - 1)}
                    className="p-2 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 rounded-ai-sm duration-200 focus-ring"
                    title="ä¸Šä?èª?
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ç¬¬ä?è¡Œï??²åº¦ + è¨ˆæ???*/}
            <div className="header-progress">
              {/* ?²åº¦æ¢?*/}
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

              {/* è¨ˆæ???*/}
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

            {/* ç¬¬ä?è¡Œï?ä¸»è??ä??‰é? */}
            <div className="w-full">
              {(() => {
                const unitNum = parseInt(unitId);
                const isLastUnitOfTheme = (
                  unitNum === 5 ||   // ä¸»é?1çµæ?
                  unitNum === 10 ||  // ä¸»é?2çµæ?  
                  unitNum === 16 ||  // ä¸»é?3çµæ?
                  unitNum === 21 ||  // ä¸»é?4çµæ?
                  unitNum === 26 ||  // ä¸»é?5çµæ?
                  unitNum === 31     // ä¸»é?6çµæ?ï¼ˆèª²ç¨‹ç??Ÿï?
                );
                
                if (!isCompleted) {
                  return (
                    <Button 
                      onClick={handleMarkComplete}
                      className="btn-ai-success btn-mobile-full hover-lift click-scale focus-ring py-3"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      å®Œæ?å­¸ç?
                    </Button>
                  );
                }
                
                if (isLastUnitOfTheme) {
                  return (
                    <Button 
                      onClick={handleNavigateQuiz}
                                              className="btn-ai-primary btn-mobile-full hover-lift click-scale focus-ring py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                    >
                      ?‹å?æ¸¬é?
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
                      ä¸‹ä?èª?                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  );
                }
              })()}
            </div>
          </div>
        </motion.header>

        {/* ?¯ ç°¡å??„å–®?ƒæ?é¡Œå???*/}
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
                  {currentUnit.type === 'video' ? 'å½±ç?èª²ç?' : 
                   currentUnit.type === 'text' ? '?‡æœ¬èª²ç?' : '?±è??æ?'}
                </Badge>
                {isCompleted && (
                  <span className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">å·²å???/span>
                  </span>
                )}
                      </div>
                    </div>
          </div>

          {/* å­¸ç??€?‹æ?ç¤?- ç°¡å???*/}
          {isTimerActive && !isCompleted && (
            <motion.div 
              className="mt-4 card-ai-base border-learning-300/50 p-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-learning-400 rounded-full animate-pulse"></div>
                <span className="text-learning-300 text-sm">æ­?œ¨å­¸ç?ä¸­ï?è¨ˆæ??¨å·²?Ÿå?</span>
              </div>
            </motion.div>
                  )}
                </motion.div>

        {/* ?¯ ?¿æ?å¼å­¸ç¿’ä?å±€ - ç§»å??ªå?è¨­è? */}
        <div className="layout-learning-main desktop">
          
          {/* ä¸»è?å­¸ç??€??- ?¿æ?å¼?*/}
          <div className="layout-main-content content-optimized" id="main-content" role="main" aria-label="èª²ç?ä¸»è??§å®¹">
            
            {/* ?”§ èª¿è©¦?§åˆ¶?¢æ¿ - ?ªåœ¨?‹ç™¼æ¨¡å?é¡¯ç¤º */}
            {isDevelopment && showDebugPanel && (
                <motion.div 
                className="bg-yellow-900/90 border border-yellow-600 rounded-lg p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-yellow-200 text-sm space-y-2">
                  <div className="font-bold text-yellow-100 mb-2">?”§ è¨ˆæ??¨èª¿è©¦é¢??/div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>?®å?: {currentUnitKey}</div>
                    <div>å·²å??? {isCompleted ? '?? : '??}</div>
                    <div>è¨ˆæ??¨æ´»èº? {isTimerActive ? '?”µ' : '??}</div>
                    <div>å­¸ç?ç§’æ•¸: {learningSeconds}</div>
                    <div>é¡¯ç¤º?‚é?: {realTimeDisplay}</div>
                    <div>å¼·åˆ¶æ¸¬è©¦: {forceTimerForTesting ? '?? : '??}</div>
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
                      {forceTimerForTesting ? '?œé?æ¸¬è©¦æ¨¡å?' : '?Ÿç”¨æ¸¬è©¦æ¨¡å?'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setLearningSeconds(0);
                        setRealTimeDisplay('00:00:00');
                        console.log('?? [DEBUG] ?‹å??ç½®è¨ˆæ???);
                      }}
                      className="px-3 py-1 rounded text-xs font-medium bg-gray-700 text-white"
                    >
                      ?ç½®è¨ˆæ???                    </button>
                    </div>
                  
                  <div className="text-xs text-yellow-300 mt-2">
                    ?’¡ ?‹å? Console (F12) ?¥ç?è©³ç´°?¥è?
                  </div>
                </div>
              </motion.div>
            )}

            {/* ä¸»è?èª²ç??§å®¹ - ?¿æ?å¼å„ª??*/}
            <motion.div 
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* èª²ç??è¿° */}
              <div className="text-responsive-body text-gray-300 leading-relaxed">
                {currentUnit.description}
              </div>

              {/* ä¸»è??§å®¹?‡å? - ?¿æ?å¼å?é«?*/}
              <div className="prose prose-invert prose-lg lg:prose-xl max-w-none">
                <div className="text-white/95 leading-loose space-y-6 lg:space-y-8">
                  {currentUnit.content.transcript.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-responsive-body leading-loose tracking-wide">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* ?•æ??‰ç”¨æ¡ˆä?å±•ç¤º - ?¿æ?å¼å„ª??*/}
              <div className="mt-8 lg:mt-12 p-6 lg:p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl lg:rounded-2xl border border-gray-600/30">
                                  <h3 className="text-xl lg:text-2xl font-bold text-gray-200 mb-4 lg:mb-6 flex items-center">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                  {(() => {
                    switch(currentUnit.id) {
                      case 1:
                        return '?—ºï¸?å­¸ç??°å?';
                      case 2:
                        return '?? ?†è§£ LLM';
                      case 3:
                        return '?? GPT æ¼”é€²å²';
                      case 4:
                        return '?’³ ç²¾æ??¸æ?';
                      case 5:
                        return '?›¡ï¸?å®‰å…¨è¨»å?';
                      case 6:
                        return '?? ä»‹é¢å¿«è¦½';
                      case 7:
                        return '?? å°è©±?´ç?è¡?;
                      case 8:
                        return '?ï? ?‹äºº?–æ?ä»?;
                      case 9:
                        return '?“± ?‹æ?å¯¦æˆ°';
                      case 10:
                        return '?ª ?¢ç´¢ GPT ?†å?';
                      case 11:
                        return '??ï¸??‡ä»¤?›åŸº??;
                      case 12:
                        return '?­ è§’è‰²?®æ?æ³?;
                      case 13:
                        return '??ç¯„ä?å¼•å?è¡?;
                      case 14:
                        return '?? ?ç¶­?ˆæ?å·?;
                      case 15:
                        return '?¯ è¿½å??ªå?';
                      case 16:
                        return '?? ?‡ä»¤ç¯„æœ¬åº?;
                      case 17:
                        return '?ï? ?§å®¹?µä?å¼•æ?';
                      case 18:
                        return '?? å­¸ç??”ç©¶? é€Ÿå™¨';
                      case 19:
                        return '?’¡ ?µæ??¦é??ªå¤¥ä¼?;
                      case 20:
                        return '?’» ç¨‹å?è¨­è?è¶…ç??©æ?';
                      case 21:
                        return '?? èªè?ç¿»è­¯?‡æ½¤é£¾å¤§å¸?;
                      case 22:
                        return '?? ?¸æ??†æ?å¤§å¸«';
                      case 23:
                        return '?? å¯¦æ?ç¶²çµ¡?è¦½';
                      case 24:
                        return '?¨ DALL-E 3 ?–å??Ÿæ?';
                      case 25:
                        return '?? ?µå»ºä½ ç? Custom GPT';
                      case 26:
                        return '?? è­˜åˆ¥ AI?Œå¹»è¦ºã€?;
                      case 27:
                        return '?? ?¸æ?ç§éš±?‡å???;
                      case 28:
                        return '?–ï? èªè? AI ?è?';
                      case 29:
                        return '??è² è²¬ä»»åœ°ä½¿ç”¨ AI';
                      case 30:
                        return '?”­ å±•æ?äººå·¥?ºèƒ½?„æœªä¾?;
                      case 7:
                        return 'å°è©±ç®¡ç??€ä½³å¯¦è¸?;
                      case 8:
                        return '?ˆæœ¬?¸æ?æ±ºç??‡å?';
                      case 9:
                        return 'ä»‹é¢?ä??€å·§ç¸½çµ?;
                      case 10:
                        return 'è·¨å¹³?°ä½¿?¨å»ºè­?;
                      case 22:
                        return '?ªè??‡ä»¤å¯¦é??‰ç”¨?´æ™¯';
                      case 27:
                        return 'ChatGPT ?¨ä??Œé??Ÿç?å¯¦é??‰ç”¨';
                      default:
                        return 'å¯¦é??‰ç”¨æ¡ˆä?';
                    }
                  })()}
                </h3>
                {(() => {
                  switch(currentUnit.id) {
                    case 1:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¢ä?ç¯€ä¿‚æ•´?‹èª²ç¨‹å??‹ç«¯ï¼Œæ??‹æ?ä»‹ç´¹äººå·¥?ºèƒ½?…åŸº?¬æ?å¿µï?è§???¢å€‹èª²ç¨‹é?è§??ä½ å??è??‚ä??ƒå??°ä?ä»½æ??°å?å­¸ç?è·¯ç??–ï?äº†è§£?­å¤§?®å??…ç?æ§‹ï??Œå?é»æ¨£è·Ÿä?èª²ç??…æ­¥ä¼ï??±é›¶?ºç?ä¸€æ­¥æ­¥?ç‚º AI ?‰ç”¨é«˜æ???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">æ¸…æ™°äº†è§£èª²ç??­å¤§?®å??…ç?æ§‹å??‹é???€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">ç¢ºç?ä½ å­¸å®Œä?å¾Œå¯ä»¥é??°å??·é??€?½ï?ä¾‹å?ï¼šç¨ç«‹å¯«?ºé??ˆæ?ä»¤ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡?€?‰æ??…å­¸ç¿’æ–¹æ³•ï?é»æ¨£è·Ÿä?èª²ç??…å¯¦?°é??®ä?é½Šå?ï¼Œå??°æ?å¥½å??ˆæ???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 2:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ç©¶ç?å¤§å?èªè?æ¨¡å? (Large Language Model) ä¿‚å’©ï¼Ÿå‘¢ä¸€ç¯€?ƒç”¨?€?Ÿæ´»?–ã€æ?ç°¡å–®?…æ??»ï?ä¾‹å?å°‡ä½¢æ¯”å–»?ä??‹è??æ??¨ä??Œå??¸é¤¨?…å¯¦ç¿’ç?ï¼‰ï?å¾¹å??†è§£ LLM ?…æ ¸å¿ƒé?ä½œå??†ï?ä»¤ä??”å?è¦ºå? AI ä¿‚ä??‹é?ä¸å¯?Šå?é»‘ç???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?¨è‡ªå·±å?èªªè©±è§???°å’©ä¿?LLM ?Œå? GPT??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£?Œè?ç·´æ•¸??(Training Data)?é?æ¨?½±??AI ?…å?ç­”ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?ç™½é»è§£ AI ?‰æ??ƒã€Œä??…ä??ï?å»ºç?å°?AI ?½å??…æ­£ç¢ºè??¥ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 3:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ??GPT-3.5 ??GPT-4ï¼Œå??°æ??°å? GPT-4oï¼Œæ?ä¸€æ¬¡å?ç´šéƒ½å¸¶å??©å‘½?§å??¹è??‚å‘¢ä¸€ç¯€?ƒå¸¶ä½ å¿«?Ÿå?é¡?GPT ?…ç™¼å±•æ­·?²ï??é?æ¯”è??”å??ˆæœ¬?ºæ¨?†èƒ½?›ã€é€Ÿåº¦?å??‹å?æ¨¡æ?ï¼ˆè??‡è??½è?è¬›ï??¹é¢?…é??µå·®?°ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">è¬›å???GPT-3.5 ??GPT-4/4o ä¹‹é??…ä¸»è¦èƒ½?›å·®è·ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£?Œå?æ¨¡æ??å?å¯¦é??‰ç”¨å¸¶å??…å¥½?•ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è??¹æ??”å??…ä»»?™ï??¤æ–·?‰è©²?¨é??‹æ¨¡?‹ç??¬ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 4:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?è²»?ˆå·²ç¶“å¥½å¥½ç”¨ï¼Œå?é»è§£ä»²è?ä¿¾éŒ¢?‡ç? Plus ?ˆï??¢ä?ç¯€?ƒä¸¦?’æ?è¼ƒå?è²»ç???Plus ?ˆå??€?‰å??½ï??…æ‹¬?Ÿåº¦?æ¨¡?‹ä½¿?¨æ??é??å??½ï??¸æ??†æ??DALL-E 3ï¼‰ç?ç­‰ï??æ?ä¾›å¹¾?‹å…¸?‹å??¨æˆ¶?´æ™¯ï¼Œå¹«ä½ å??€ç²¾æ??…é¸?‡ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡?è²»?ˆå? Plus ?ˆå?å®Œæ•´?Ÿèƒ½?†åˆ¥?—è¡¨??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†æ??ªå·±?…ä½¿?¨é?æ±‚ï??¤æ–·?ªå·±?€?”é?è¦å?ç´šã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">äº†è§£ Plus ?ˆç¨?‰å?é«˜é??Ÿèƒ½?¯ä»¥é»æ¨£å¹«åˆ°ä½ å?å·¥ä??Œå­¸ç¿’ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 5:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              å·¥æ¬²?„å…¶äº‹ï?å¿…å??©å…¶?¨ã€‚å‘¢ä¸€ç¯€?ƒæ?ä¾›æ?è©³ç´°?…æ­¥é©Ÿï??‹æ??‹å¸¶ä½ ç”±?¶é?å§‹è¨»?Šä???OpenAI å¸³æˆ¶?‚å??‚ï??‘å??ƒç‰¹?¥å¼·èª¿å¸³?¶å??¨ï??™ä?é»æ¨£è¨­å?ä¸€?‹é?å¼·åº¦å¯†ç¢¼ï¼Œå??‹é??Ÿã€Œå…©æ­¥é?è­?(2FA)?å??½ï?ä¿é?ä½ å??‹äººè³‡æ???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?å?è¨»å?ä¸¦ç™»?¥è‡ªå·±å? ChatGPT å¸³æˆ¶??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£è¨­å??Œé??Ÿå…©æ­¥é?è­‰ï??å?å¸³æˆ¶å®‰å…¨?§ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">äº†è§£?ºæœ¬?…ç??±è¨­å®šï??¥é?é»æ¨£ç®¡ç?ä½ å?å°è©±æ­·å²ç´€?„ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 6:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¢ä?ç¯€?ƒå¸¶ä½ é€²è?ä¸€?‹å??´å? ChatGPT ä»‹é¢å°è¦½ï¼Œç”±å·¦é??…æ­·?²ç??„é¢?¿ï??°ä¸­?“å?ä¸»å?è©±è?çª—ï??åˆ°?³ä?è§’å??¨æˆ¶è¨­å?ï¼Œæ?ä¸€?‹æ??•ã€æ?ä¸€?‹é¸?…å??Ÿèƒ½?½æ?è©³ç´°è§??ï¼Œç¢ºä¿ä?å°æ?ä½œç’°å¢ƒç­å¦‚æ??Œã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å¿«é€Ÿæµ?°ä¸¦ä½¿ç”¨å°è©±æ­·å²ç´€?„ã€æ–°å¢å?è©±ç??¸å??Ÿèƒ½??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£?”å?è¨­å??¸é?ï¼ˆä?å¦‚ä¸»é¡Œé??²ã€è?è¨€ï¼‰å?ä½œç”¨??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Ÿæ??´å€‹ä??¢ä?å±€ï¼Œç‚ºä¹‹å??…é??ˆæ?ä½œæ?å¥½åŸºç¤ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 7:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¨ä?ä½¿ç”¨æ¬¡æ•¸å¢å?ï¼Œå?è©±å?è¡¨æ?è®Šå?å¥½æ··äº‚ã€‚å‘¢ä¸€ç¯€?ƒæ?ä½ ä?å¥—å¯¦?¨å?å°è©±ç®¡ç??€å·§ï??…æ‹¬é»æ¨£?ºé?è¦å?å°è©±?¹ä??‹æ??°å??ã€é?æ¨???‰ç”¨?…å?è©±å?äº«ä¿¾?‹å??–å?äº‹ï??Œå?é»æ¨£?ªé™¤?¡ç”¨?…å?è©±ï?ä¿æ?å·¥ä??€ä¹¾æ·¨ä¼ç???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡?½å?å°è©±?…æ?ä½³å¯¦è¸ï??¹ä¾¿?¥å??œå???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£?¢ç??†äº«???ï¼Œå??¶ä?äººå?ä½œã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">é¤Šæ?å®šæ?æ¸…ç?å°è©±?—è¡¨?…å¥½ç¿’æ…£ï¼Œæ??‡ä½¿?¨æ??‡ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 8:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¢å€‹ä?ä¸€?‹è?å¼·å¤§ä½†å¥½å¤šäºº?½å¿½?¥å??…å??½ï??‘å??ƒæ·±?¥è?è§?Custom Instructions é»æ¨£?‹ä?ï¼Œæ?ä½ é?æ¨?–º?©å€‹è¼¸?¥æ??¥é¢ï¼Œå??¥è¨­å®šé??¼ã€Œä?ä¿‚é??‹ã€å??‹ã€Œä?å¸Œæ? AI é»æ¨£?ç??å?æ°¸ä??‡ä»¤?‚è¨­å®šä?æ¬¡ï?ä»¥å?æ¯æ¬¡å°è©± AI ?½æ??ªå?å¸¶ä??¢å€‹ã€Œè??¶ã€ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£ Custom Instructions ?…å…©?‹è¨­å®šæ?ä½å??†åˆ¥?Œä??¨ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£å¯«å‡º?‰æ??…å€‹äºº?–æ?ä»¤ï?ä¾‹å?è¨­å?ä½ å??·æ¥­?å¯«ä½œé¢¨?¼å?å¥½ç???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?é?å¯¦ä??Ÿå?è¨­å??å?ï¼ŒAI ?ç?è³ªç??…å·¨å¤§æ??‡ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 9:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ChatGPT ?”åª?¯ä»¥?ºé›»?¦ç”¨?‚å‘¢ä¸€ç¯€?ƒé?ä¸­ä?ç´¹æ?æ©?App ?…ç¨?‰å??½ï??¹åˆ¥ä¿‚è??¹ä¾¿?…ã€Œè??³å?è©±ã€å??½ï??Œå??¯ä»¥å½±ç›¸?³æ??†æ??…ã€Œå??è¾¨è­˜ã€å??½ã€‚æ??‹æ??é?å¹¾å€‹ç?æ´»å??…ä?å­ï?å±•ç¤ºé»æ¨£?ºè?ä¸Šé¢?¨æ??¨åœ°è§?±º?é???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£?¨æ?æ©Ÿé€²è?æµæš¢?…è??³å?è©±ï?å°±å¥½ä¼¼å??Ÿäºº?¾å?ä¸€æ¨?€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£å½±ä?å¼µç›¸ï¼Œç„¶å¾Œå« AI å¹«ä??†æ??¸å…¥?¢å??§å®¹??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?¼æ??ºæ??•å ´?¯ä?ä½¿ç”¨ AI ?…å‰µ?æ–¹æ³•ï?ä¾‹å?ç¿»è­¯é¤ç??è??¥æ??©ç???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 10:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              GPT Store å°±å¥½ä¼¼ä??‹æ?æ©Ÿå? App Storeï¼Œå…¥?¢æ??å?ä¸Šè¬?±å…¶ä»–äºº?´å??é?å°ç‰¹å®šä»»?™å?å®¢è£½??GPTs?‚å‘¢ä¸€ç¯€?ƒæ?ä½ é?æ¨???ˆå??œå??ç¯©?¸å?è©•ä¼°?¢å•² GPTsï¼Œæµ?ºç?æ­??è³ªç??å¹«?°ä??‹å?å·¥å…·??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è? GPT Store ?…åŸº?¬ç€è¦½?Œæ?å°‹æ?å·§ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£?é?è©•å??ä½¿?¨äºº?¸ç??‡æ??»åˆ¤?·ä???GPT ?…å¥½å£ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?¶è?å¹¾å€‹å?ä½ æ??¨å? GPTsï¼Œå»ºç«‹ä??…å€‹äºº?–å·¥?·ç®±??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 11:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ä¸€æ¢å¥½?…æ?ä»¤ï?å°±å¥½ä¼¼ä?ä»½æ??°å?å·¥ä?ç°¡å ±?‚å‘¢ä¸€ç¯€?ƒä?ç´¹è¢«?¬è??ºæ??‰æ??…ã€ŒCRPF ?‡ä»¤æ¡†æ¶?ï?C (Context/?ˆçµ¡)?R (Role/è§’è‰²)?P (Process/?ç?)?F (Format/?¼å?)?‚æ??‹æ?è©³ç´°?†è§£æ¯å€‹å?ç´ å?ä½œç”¨ï¼Œæ?ä½ é?æ¨??ç¹”ä??…å?é¡Œã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å¾¹å??†è§£?‡ä»¤?›å¤§?ºçŸ³?…å?ç¾©å??è??§ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è??ºæ??ä??ï??ˆæ€è€ƒé?æ¨??ä¾›è¶³å¤ å??Œæ™¯ï¼ˆè?çµ¡ï???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£å°‡ä??‹æ¨¡ç³Šå??é?ï¼Œæ”¹å¯«æ?ä¸€?‹å??«å?å¤§åŸº?³å?æ¸…æ™°?‡ä»¤??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 12:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¢å€‹ä??€ç°¡å–®ä½†æ??‰æ??…æ?å·§ä?ä¸€?‚ç•¶ä½ å‘½ä»?AI?Œæ‰®æ¼”ä??‹è?æ·±å?å¸‚å ´?†æ?å¸«ã€æ?ï¼Œä½¢å°±æ??ªå?èª¿ç”¨?¸é??¥è?ï¼Œä»¤?ç??´å?æ¥­ã€‚æ??‹æ?å±•ç¤ºå¤šå€‹å??Œå?è§’è‰²è¨­å?ç¯„ä?ï¼Œä¸¦è§???Œå??…å??†ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£é»è§£è³¦ä??Œè??²ã€å¯ä»¥å¤§å¹…æ???AI ?ç??…è³ªç´ å?æº–ç¢ºåº¦ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?ä½¿ç”¨?Œä?ä¿‚ä???..?ã€ã€Œæ‰®æ¼”ä???..?ç??œéµ?¥å??Ÿå??•è??²ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£è¨­å??”å??…å?å®¶è??²ï?ä¾‹å??Œè?æ·±æ?æ¡ˆã€å??Œæ•¸?šå??å¸«?ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 13:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?‰æ?ï¼Œé?è¬›è?æ±‚ä??”å??…ã€‚å‘¢ä¸€ç¯€?ƒæ?ä½ ã€ŒFew-Shot Prompting?æ?å·§ï??³ä??ºä??…æ?ä»¤å…¥?¢ï??ˆä¿¾ä¸€?©å€‹ä??³è??…ç?æ¡ˆã€Œç?ä¾‹ã€ã€‚AI ?ƒå¥½?°æ??ã€Œå­¸?ä??…ç?ä¾‹ï??¶å??¨å?æ¨??é¢¨æ ¼?Œæ ¼å¼å»?¢ç??°å??§å®¹??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?ç™½?ŒZero-shot?ï??¡ç?ä¾‹ï??Œã€ŒFew-shot?ï??‰ç?ä¾‹ï??‡ä»¤?…å??¥ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£?ºæ?ä»¤ä¸­å»ºæ?æ¸…æ™°?…è¼¸?¥è¼¸?ºç?ä¾‹ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£?¨å‘¢?‹æ?å·§å?çµ±ä?è¼¸å‡º?¼å?ï¼Œä?å¦‚å¯«è©©ã€å¯«?±å??˜è?ç­‰ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 14:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¶é??°è??œå??é??‚ï??”å¥½?´æ¥?ç?æ¡ˆã€‚å‘¢ä¸€ç¯€?ƒæ?ä½ ã€ŒChain of Thought?æ?å·§ï??³ä??½ä»¤ AI?Œä?æ­¥ä?æ­¥è?ä¿¾æ??‡ã€ã€‚å?æ¨???®æ­¢?¯ä»¥?é?ç­”æ??…æ?ç¢ºæ€§ï?ä»²å¯ä»¥ä¿¾ä½ ç???AI ?…æ€è€ƒé?ç¨‹ï??¹ä¾¿ä½ æª¢?¥å?ä¿®æ­£??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£é»è§£å¼•å? AI ?æ­¥?è€ƒå¯ä»¥æ??‡è??œå?é¡Œå?è§?±º?½å???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è??ºæ?ä»¤ä¸­? å…¥?Œè??æ­¥?è€ƒã€ã€ã€ŒLet's think step by step?ç??œéµ?¥ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?‰ç”¨?¢å€‹æ?å·§å»è§?±º?¸å­¸é¡Œã€é?è¼¯æ¨?†æ??…ä??šæ´»?•è??ƒã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 15:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?åˆ°ç¬¬ä??‹ç?æ¡ˆä?å¾Œï?å°è©±?ˆè‡³?Ÿæ­£?‹å??‚ä???AI é«˜æ??€?»å?å°±ä?è¿½å??‚å‘¢ä¸€ç¯€?ƒæ?ä½ å¹¾ç¨®æ??ˆå?è¿½å?ç­–ç•¥ï¼Œä?å¦‚ã€Œå¯?”å¯ä»¥è©³ç´°å•²ï¼Ÿã€ã€ã€Œæ??¡å…¶ä»–è?åº¦ï??ã€ã€Œç”¨ä¸€?‹æ›´ç°¡å–®?…æ??»è§£?‹ï??ï?å°‡ä???60 ?†å?ç­”æ??“ç£¨??95 ?†ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å»ºç??Œå?è©±ä?ä¸€?‹é?ç¨‹ã€å?å¿ƒæ?ï¼Œå?å¥½æ»¿è¶³æ–¼ç¬¬ä??‹ç?æ¡ˆã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡?³å?ä¸‰ç¨®?”å??…è¿½?æ?å·§ï?ä¾‹å?ï¼šè?æ±‚æ·±?¥ã€è?æ±‚ç°¡?–ã€è?æ±‚è?è®Šè?åº¦ï???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£?‰ç¦®è²Œåœ°?‡å‡º AI ç­”æ?ä¸­å?ä¸è¶³ï¼Œä¸¦å¼•å?ä½¢ä¿®æ­?€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 16:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              å­¸å??†è?ï¼Œæ??‹æ??ä?ä¸€?‹è?å¯¦ç”¨?…è?æºï?ä¸€?‹å??«è???20 ?‹ç²¾å¿ƒè¨­è¨ˆå??‡ä»¤ç¯„æœ¬åº«ã€‚å‘¢?²ç??¬æ¶µ?‹å?å·¥ä??å­¸ç¿’ã€ç?æ´»ç??„ç¨®å¸¸è??´æ™¯ï¼Œä??¯ä»¥?´æ¥è¤‡è£½?ä¿®?¹ä½¿?¨ï??³åˆ»é«”é??°é??ˆæ?ä»¤å¸¶?Ÿå?å¨å???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?²å?ä¸€?‹å¯ä»¥å³?»ç”¨?…é?è³ªç??‡ä»¤ç¯„æœ¬åº«ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£å°‡ç??¬ä¸­?…è??¸æ??è‡ªå·±å??€æ±‚ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Ÿç™¼ä½ å‰µ? æ›´å¤šå±¬?¼ä??ªå·±?…å€‹äºº?–æ?ä»¤ç??¬ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 17:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¢ä?ç¯€ä¿‚ç?å¯¦æˆ°èª²ï??‘å??ƒç”±?¶é?å§‹ï?å¸¶ä??‹ç”¨?ºç¬¬ä¸‰å–®?ƒå­¸?°å??‡ä»¤?€å·§ï?å®Œæ?ä¸‰é??·é??…å¯«ä½œä»»?™ï??ºä??‹ç”¢?å¯«ä¸€ç¯‡å¸å¼•äºº??Instagram è²¼æ??æ’°å¯«ä?å°å?æ¥­å?å·¥ä??¯å ± Email?ä»¥?Šç‚ºä¸€?‹ç¶²ä¸Šå»£?Šæ??ä??‹å??Œé¢¨?¼å?æ¨™é???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡?ºç¤¾äº¤å?é«”å‰µä½œå…§å®¹å??‡ä»¤ï¼Œå??¬å???emoji ??Call-to-Action??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£è¦æ? AI ?¡ç”¨?¹å?èªæ°£ï¼ˆä?å¦‚ï?å°ˆæ¥­?è?é¬†ã€æ?èªªæ??›ï??»å¯«?¢ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å¯¦è?é»æ¨£??AI ?Ÿæ??…å?ç¨¿ï??é€²ä?æ­¥ä¿®?¹ï?ä»¤å…§å®¹æ›´?‰äºº?…å‘³??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?©ç”¨ AI ?²è??¦å??‡ç›ªï¼Œå¿«?Ÿç”¢?Ÿå¤§?å??Œè?åº¦å?æ¨™é??–é?å­ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 18:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?‚é?å°±ä??‘éŒ¢?‚å‘¢ä¸€ç¯€?ƒæ?ä½ é?æ¨?? ChatGPT è®Šæ?ä½ å?å­¸ç??Œç?ç©¶åŠ©?†ã€‚æ??‹æ?å¯¦æˆ°é»æ¨£å°‡ä?ç¯‡é•·ç¯‡å¤§è«–å?ç¶²ä??‡ç???PDF ?±å?ï¼Œå–ºä¸€?†é??§ç¸½çµæ?å¹¾å€‹é?é»ï?ä¸¦è?æ±?AI ?¨ç°¡?®å?æ¯”å–»ï¼Œè§£?‹ç•¶ä¸­å?è¤‡é?å°ˆæ??è???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£è²¼ä??·æ?ï¼Œä¸¦ä¿¾å‡ºæ¸…æ™°?‡ä»¤ï¼ˆä?å¦‚ï??Œç¸½çµæ? 5 é»ã€ã€ã€Œå??ºä¸»è¦è?é»ã€ï???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡?å??€å·§ï?è¦æ? AI è§???‡ç??¥é¢ä½ å??ç™½?…ä»»ä½•æ?å¿µã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸ç?é»æ¨£??AI ?¹æ?ä¸€ä»½è??™ï?å¹«ä??ºå¹¾æ¢å?é¡Œï??¨å?æ¸¬è©¦ä½ ä??ªç?ä¿‚ç?è§????/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?‰ç”¨ AI å¿«é€Ÿæ?è¼ƒå…©ç¯‡å??Œæ?ç« å?è§€é»ï??²è??æ­¥?…æ??»å??ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 19:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¶ä?è«—åˆ°?­éƒ½å¤§å??½ç„¡ idea ?…æ??™ï?AI å°±ä?ä½ æ?å¥½å?å¤¥ä¼´?‚å‘¢ä¸€ç¯€?…å¯¦?°é??®ä?ï¼šç”±?¶é?å§‹ï???AI ä¸€é½Šç??ƒä??‹å…¬?¸å??˜é?å»ºè¨­?¥ï?Team-building Dayï¼‰ã€‚ç”±æ§‹æ€æ´»?•ä¸»é¡Œï??°ç·¨?’è©³ç´°å??‚é?è¡¨ï??åˆ°?ƒæ…®å¾Œå‹¤?Œé?ç®—ï??‘å??ƒå?ç¤ºé?æ¨?? AI ä¸€?ä?ç­”ï?å®Œæ??´å€‹ä??ƒã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£?¨é??¾å??é?ï¼Œå?å°?AI ?¢ç?å¤§é??Œæ??µæ??…é?å­ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£??AI ?ä??…é?å­åŸºç¤ä?ï¼Œé€²ä?æ­¥è¿½?ï?æ·±å??å¯è¡Œå??¹æ???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?©ç”¨ AI ?…é?è¼¯èƒ½?›ï?å¹«ä??è?è¨ˆå?ä¸­å¯?½å‡º?¾å??é??Œæ??°ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å¿«é€Ÿèµ·?‰æ´»?•å?å®?‚³ç¨¿æ??…é?è«‹å‡½??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 20:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¡è?ä½ ä??ªå·¥ç¨‹å¸«ï¼Œå‘¢ä¸€ç¯€?½å?ä½ æ??¨ã€‚æ??‹æ?å¯¦æˆ°ä¸‰å€‹å ´?¯ï?(1) è²¼ä?ä¸€æ®µç??”æ???Codeï¼Œå« AI ?¨å»£?±è©±?è?è§??ä¿¾ä??½ï?(2) å°‡ä??‹ç?å¼éŒ¯èª¤è???(Error Message) è²¼ä¿¾ AIï¼Œå«ä½¢å??å?? å?ä¿¾å‡ºè§?±º?¹æ?ï¼?3) ??AI å¯«ä?æ®µç°¡?®å? Python ?³æœ¬ï¼Œå»?ªå??–è??†ä??‹é?è¤‡æ€§å?ä»»å???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£ä¿¾å‡ºæ¸…æ™°?‡ä»¤ï¼Œè?æ±?AI è§??ç¨‹å?ç¢¼å??è¼¯?Œå??½ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡??AI ?è¿°ç¨‹å??¯èª¤?…æ??ˆæ–¹æ³•ï?ä»¥ç²å¾—æ?æº–ç¢º?…é™¤??(debug) å»ºè­°??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?½å?è¬›æ?æ¥šä??…é?æ±‚ï?ä»?AI ?ºä??¢ç??¯ç”¨?…ã€ç°¡?®å??ªå??–è…³?¬ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">äº†è§£é»æ¨£??AI å¹«æ??ªå?ä½ å¯«??codeï¼Œæ??…å?ä½¢ç”±ä¸€ç¨®è?è¨€ç¿»è­¯?å¦ä¸€ç¨®ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 21:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              Google Translate ?ªä??šåˆ°?Œç¿»è­¯ã€ï???ChatGPT ?¯ä»¥?šåˆ°?Œæ½¤é£¾ã€ã€‚å‘¢ä¸€ç¯€?…å¯¦?°é??®ä?ï¼šå?ä¸€ä»½ä¸­?‡å??‹äººå±¥æ­· (CV) ?–è€…å?æ¥­å»ºè­°æ›¸ï¼Œå??®æ­¢ç¿»è­¯?è‹±?‡ï?ä»²è? AI å°‡ä½¢?Œæ?ç£¨ã€åˆ°å¥½ä¼¼?±ä??‹è‹±?‡æ?èªè€…å¯«?ºå??æ??¢ã€å?æ¥­ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£?Œç¿»è­¯ã€å??Œæ½¤é£?(Polish)?æ?ä»¤ä??“å??†åˆ¥??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£è¦æ? AI ?¹è??‡ç??…è?æ°??ä¾‹å??±æ™®?šè‹±?‡è?å¾—æ›´?·èªª?å??–æ›´å­¸è??–ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£??AI å¹«æ??Œæ“´å¯«ã€ï?å°‡å¹¾?‹é?é»å¥å­ï??´å??ä?æ®µå??´é€šé??…æ®µ?½ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?‰ç”¨?¢å€‹æ?å·§å»?¹å?ä½ å??±æ?å¯«ä?ï¼Œç„¡è«–ä? Email å®šå ±?Šã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 22:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¢ä?ç¯€ä¿‚ä???hands-on ?…å¯¦é©—å®¤?‚æ??‹æ??ä?ä¸€ä»½æ¨¡?¬å??·å”®?¸æ? CSV æª”æ?ï¼Œå­¸?¡é?è¦è¦ª?‹å?ä½¢ä??³ï??¶å?å­¸ç??¨æ—¥å¸¸èªªè©±å? AI æºé€šï??²è??¸æ??†æ??‚ä?å¦‚å?ï¼šã€Œé?äº”æ¬¾?¢å?è³???€å¥½ï??ã€ã€Œç”¨æ£’å½¢?–é¡¯ç¤ºæ??‹æ??…éŠ·?®é??ã€ã€Œå¹«?‘å??å»£?Šæ”¯?ºå??·å”®é¡ä??“æ??‡é?ä¿‚ï???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?å?ä¸Šå‚³ Excel ??CSV æª”æ?ï¼Œä¸¦ç¢ºè? AI å·²ç?è®€?–åˆ°?¸æ???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è??¨è‡ª?¶è?è¨€?å?ï¼Œé€²è??¸æ??¥è©¢?æ?åºå?è¨ˆç???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?½å??¹æ??¸æ?ï¼Œå‘½ä»?AI ?¢ç??³å??©ç¨®?”å?é¡å??…å?è¡¨ï?ä¾‹å?ï¼šæ?å½¢å??å?é¤…å?ï¼‰ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?—è©¦??AI ?¹æ??¸æ??å‡ºè§€å¯Ÿæ??…æ?è¦?(insights)??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 23:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ä¿?ChatGPT ä¸€å°å¯ä»¥ç??°å…¨ä¸–ç??…çœ¼?›ã€‚å‘¢ä¸€ç¯€?ƒæ?ä½ é?æ¨???•å??‰æ?ä½¿ç”¨?³æ?ç¶²çµ¡?è¦½?Ÿèƒ½?‚æ??‹å?å¯¦æˆ°?…ç›®ä¿‚ï??‡è¨­ä½ è??šä?ä»½ç«¶?­å??‹å?å¸‚å ´èª¿æŸ¥?±å?ï¼Œå‘½ä»?ChatGPT ä¸Šç¶²?µå‡ºå°æ??€?°ç™¼ä½ˆå??¢å??è??Ÿå??°è??±å??å??‹ç¶²æ°‘è??¹ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£?©æ??™æ?è©²å??•ç¶²çµ¡ç€è¦½æ¨¡å?ï¼Œå’©?‚å€™å??€è¦ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£?å?ï¼Œå»?œå??³æ??§å?è³‡è?ï¼ˆä?å¦‚ï?ä»Šæ—¥?…è‚¡?¹ã€å¤©æ°????/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£??AI ç¸½ç??Ÿè‡ªå¹¾å€‹å??Œç¶²ç«™å?è³‡æ?ï¼Œæ•´?ˆæ?ä¸€ä»½å ±?Šã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">é¤Šæ?å¥½ç????è¦æ? AI ?ä?è³‡æ?ä¾†æ??…é€??ï¼Œæ–¹ä¾¿è‡ªå·±æŸ¥è­‰ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 24:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?±æ?å¿µåˆ°?–å?ï¼Œåªä¿‚é?è¦ä??¥è©±?‚å‘¢ä¸€ç¯€?ƒæ?ä½ ã€Œè?è¦ºå??‡ä»¤ (Visual Prompting)?å??è??‚æ??‹æ?å±•ç¤ºä¸€?‹ç°¡?®æ?ä»¤ï??Œä??»è??ï??Œä??‹è©³ç´°æ?ä»¤ï??Œä??»å??ºç??Šæ›¬å¤ªé™½?…æ??²è‚¥è²“ï?æ¯›é«®ç´°ç·»ï¼Œé›»å½±æ??‰ç?ï¼?K?«è³ª?ï?ä¹‹é??…å·¨å¤§å??¥ã€‚å¯¦?°é??®ä??ºä??“è?æ§‹å??¬å¸ï¼Œå‰µä½œä?ç³»å??‰å??Œé¢¨?¼å?å®?‚³?–ç???                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£?¨æ?ç¢ºå?å½¢å®¹è©ã€å ´?¯æ?è¿°ã€é¢¨?¼ï?ä¾‹å?ï¼šç›¸?‡ç??Ÿå¯¦?å¡?šã€å°è±¡æ´¾ï¼‰å»?§åˆ¶?«é¢??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£?‡å??–ç??…é•·å¯¬æ?ï¼ˆä?å¦?16:9 ?¨å??šæ©«é¡ï???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸ç?é»æ¨£?ºä?å¼µç??å??–ç??ºç?ä¸Šï?ä¿®æ”¹?‡ä»¤?»å¾®èª¿ç´°ç¯€??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£ DALL-E 3 ?ºç?æ¬Šå?ä½¿ç”¨ä¸Šå??åˆ¶??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 25:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?¢å€‹ä??¬å–®?ƒå??¢æ¥­?Ÿèª²?‚æ??‹æ?ä¸€æ­¥ä?æ­¥å¸¶ä½ è?ä¸€æ¬?GPT ?µå»ºä»‹é¢?‚å¯¦?°é??®ä?ï¼šå‰µå»ºä??‹ã€Œæ?è­°ç¸½çµç??¨ã€GPT?‚å­¸?¡é?è¦è¦ª?‹ç‚ºä½¢è¨­å®šæ ¸å¿ƒæ?ä»¤ï??Œä??…ä»»?™ä?å°‡æ?è­°ç??„ç¸½çµæ??é??Œè??•é??®ã€ï??ä??³çŸ¥è­˜æ?æ¡ˆï?ä¸€ä»½æ?è­°ç??„ç??¬ï??å??‹è¨­å®šå¥½å¼•å?ä½¿ç”¨?…å?å°è©±?‹å ´?½ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Ÿæ? GPT Builder ä»‹é¢?…å??‹éƒ¨?†ï?Create / Configureï¼‰ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£å¯«å‡ºæ¸…æ™°?ç„¡æ­§ç¾©?…æ ¸å¿ƒæ?ä»?(Instructions)??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£ä¸Šå‚³ PDF ??TXT æª”æ?ï¼Œä??ºä???GPT ?…å?å±¬çŸ¥è­˜åº«??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?ºé?è¦½è?çª—é€²è?æ¸¬è©¦?Œé™¤?¯ï?ç¢ºä?ä½ å? GPT ?‹ä?æ­?¸¸??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 26:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              AI ?‰æ??ƒå¥½?‰è‡ªä¿¡å??Œä??…ä??ï??¢å€‹ç¾è±¡æ??‹ç¨±ä¹‹ç‚º?Œå¹»è¦?(Hallucination)?ã€‚å‘¢ä¸€ç¯€?ƒæ·±?¥è§£?‹å‘¢?‹ç¾è±¡å??å?ï¼Œä¸¦?ä?ä¸€å¥—å¯¦?¨å?äº‹å¯¦?¥è? (Fact Check) æµç?ï¼Œæ?ä½ é?æ¨?–ºå¼•ç”¨ AI ?ä??…è??™ä??ï??ˆå?è¶³é?è­‰å?å¤«ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£ AI ?¢ç?å¹»è¦º?…æ?è¡“å?? ï?å»ºç??¹åˆ¤?§æ€ç¶­??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡?³å?ä¸‰ç¨®?¥è? AI è³‡è??…æ–¹æ³•ï?ä¾‹å?ï¼šè?æ±‚æ?ä¾›ä?æºã€äº¤?‰æ?å°ã€ç”¨ç¶²çµ¡?è¦½?Ÿèƒ½é©—è?ï¼‰ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?ºæ—¥å¸¸ä½¿?¨ä¸­ï¼Œé??å? AI ?ä??…ä?å¯¦é?è³‡è?ä¿æ??·ç??…æ?åº¦ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 27:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ?Œæ???ChatGPT è¬›å??¢æ??”æ?ä¿¾äºº?‡åˆ°ï¼Ÿã€å‘¢?‹ä?å¥½å?äººé?å¿ƒå??é??‚å‘¢ä¸€ç¯€?ƒå¸¶ä½ è©³ç´°é–±è®€ OpenAI ?…ç??±æ”¿ç­–ï?è§??ä½ å?å°è©±?¸æ??ºå’©?…æ?ä¸‹æ?è¢«ç”¨?Ÿå?æ¨¡å?è¨“ç·´ï¼Œä¸¦?™ä?é»æ¨£?ºè¨­å®šä¸­?œé?å°è©±ç´€?„ï?ä¿é?ä½ å??‹äºº?Œå?æ¥­ç??±ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">æ¸…æ??¥é??ªå·±?…å?è©±æ­·?²æ??©æ??¨ç”¨?”ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£?‹å??–é??‰å?è©±ç??„ï??Œå?æ¸…é™¤?€?‰æ­·?²å?è©±ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å»ºç?ä¸€?‹å??¨å?ä½¿ç”¨ç¿’æ…£ï¼Œé¿?å–ºå°è©±ä¸­è¼¸?¥é?åº¦æ??Ÿå??‹äºº?–å…¬?¸æ?å¯†è??™ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 28:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              AI ä¿‚ç”±äººé??…æ•¸?šè?ç·´å‡º?Ÿï??€ä»¥ä½¢äº¦éƒ½?Œå­¸?è??—äººé¡ç¤¾?ƒå??¨å??„ç¨®?è?ï¼ˆä?å¦‚ï??§åˆ¥?ç¨®?å?è¦‹ï??‚å‘¢ä¸€ç¯€?ƒé€é?ä¸€?²å¯¦ä¾‹ï?å±•ç¤º AI ?è??¯ä»¥é»æ¨£?ºå?ç­”ä¸­?ˆç¾ï¼Œä¸¦?™ä?é»æ¨£è­˜åˆ¥?Œæ?å°å‘¢?²æ??è??…å…§å®¹ã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?†è§£ AI ?è??…ä?æºï?ä¸»è?ä¿‚è?ç·´æ•¸?šï???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£??AI ?…å»ºè­°ä¸­ï¼Œå?è¦ºå¯?½å??¨å??±æ€§å?è¦‹ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?Œæ¡é»æ¨£?é?ä¿®æ”¹?‡ä»¤ï¼Œå»?—è©¦æ¸›ä??–æ???AI ç­”æ?ä¸­å??è???/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 29:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ??AI ?¯ä»¥å¹«ä?å¯«æ?ç« ã€å¯« codeï¼Œå??Œå??µã€å??Œæ?è¥²ã€å??Œç??ºé?ï¼Ÿå‘¢ä¸€ç¯€?ƒæ·±?¥è?è«–å–ºå­¸è??Œå??·å ´ä¸Šï?ä½¿ç”¨ AI ?‰è©²?µå??…é?å¾·è?ç¯„ã€‚æ??‹æ??¢è?é»æ¨£æ­?¢º?°å???AI?å’©?…æ?ä¸‹æ?è©²è??³å ±ä½¿ç”¨??AIï¼Œä»¥?Šé?æ¨?¿?è??Œã€?                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">äº†è§£å­¸è??Œå??¼ä½¿??AI è¼”åŠ©å¯«è??‡å??®é??‡å???/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å­¸è?é»æ¨£å°?AI ?¶æ?ä¸€?‹ã€Œè??©å·¥?·ã€è€Œå?ä¿‚ã€Œä»£ç­†æ??‹ã€ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å»ºç?ä¸€?‹è?å¯¦ã€é€æ???AI ä½¿ç”¨?Ÿå?ï¼Œç„¡è«–å–ºå­¸ç?å®šå·¥ä½œä??½å?å¾—ä??ªå·±??/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    case 30:
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?? ä¸»è??§å®¹</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                              ChatGPT ?ªä?ä¸€?‹é?å§‹ã€‚å‘¢ä¸€ç¯€?ƒå¸¶ä½ å??¼å??¾é??²ï?å±•æ?äººå·¥?ºèƒ½?…ä?ä¸€æ­¥ç™¼å±•ï???GPT-5 ?…å‚³?ï??°æ›´?™é??…é€šç”¨äººå·¥?ºèƒ½ (AGI) ?…æ?å¿µï??åˆ° AI å°æœªä¾†ç¤¾?ƒã€å·¥ä½œè·ä½å??·é?å½±éŸ¿??                            </p>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å­¸ç??é?</h4>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">äº†è§£ AI ?˜å??¶å??…å¹¾?‹ä¸»è¦ç™¼å±•æ–¹?‘ã€?/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?è€?AI ?¯èƒ½?ƒé?æ¨?”¹è®Šä??€?•å?è¡Œæ¥­??/p>
                              </div>
                              <div className="flex items-start">
                                <span className="text-green-400 mr-2">??/span>
                                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">ä»¥ä??‹ç?æ¥µã€é??¾ä?å¯©æ??…å??‹ï??»è??¥ä??‹ç”± AI æ·±åº¦?ƒè??…æœªä¾†ã€?/p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    default:
                      return (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?’¡ å­¸ç??é?</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">?¹æ??¬å–®?ƒå…§å®¹æ•´?†ç??¸å?æ¦‚å¿µ?Œå¯¦è¸è?é»ã€?/p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-base lg:text-lg font-semibold text-white">?¯ å¯¦é??‰ç”¨</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">å°‡æ?å­¸çŸ¥è­˜æ??¨åˆ°å¯¦é?å·¥ä??Œç?æ´»å ´?¯ä¸­?„å…·é«”æ–¹æ³•ã€?/p>
                          </div>
                        </div>
                      );
                   }
                 })()}
              </div>
                </motion.div>
          </div>

          {/* å­¸ç?è¼”åŠ©?€??- ?¿æ?å¼å´?Šæ? */}
          <div className="layout-sidebar-content content-optimized" id="sidebar-content" role="complementary" aria-label="å­¸ç?è¼”åŠ©å·¥å…·">
            
            {/* ç§»å?ç«¯ï??é??˜è??¨å? */}
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
                ?é??˜è?
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

            {/* å­¸ç?çµ±è? - ç§»å?ç«¯å„ª??*/}
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
                å­¸ç?çµ±è?
              </h3>
              
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">?¬æ¬¡?‚é?</dt>
                  <dd className="text-gray-300 font-mono font-medium text-sm lg:text-base" aria-label={`?¬æ¬¡å­¸ç??‚é?ï¼?{realTimeDisplay}`}>{realTimeDisplay}</dd>
                    </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">ç¸½é€²åº¦</dt>
                  <dd className="text-green-300 font-bold text-sm lg:text-base" aria-label={`ç¸½å­¸ç¿’é€²åº¦ï¼?{stats.totalProgress}%`}>{stats.totalProgress}%</dd>
              </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-gray-300 text-xs lg:text-sm">å®Œæ?ä¸»é?</dt>
                  <dd className="text-gray-300 font-medium text-sm lg:text-base" aria-label={`å·²å???{stats.completedThemes}?‹ä¸»é¡Œï???{stats.totalThemes}?‹ä¸»é¡Œ`}>{stats.completedThemes}/{stats.totalThemes}</dd>
          </div>
                
                {isCompleted && (
                  <div className="flex items-center space-x-2 mt-4 p-2 bg-green-500/20 border border-green-400/30 rounded-lg" role="status" aria-label="?®å?å·²å???>
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" aria-hidden="true" />
                    <span className="text-green-300 text-xs lg:text-sm font-medium">å·²å???/span>
        </div>
                )}
              </dl>
            </motion.div>


          </div>
        </div>
            </div>
            
      {/* ?¯ ?ºå?åº•éƒ¨?ä?æ¬?- ç¢ºä??‰é?å§‹ç??¯è? */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* å·¦å´ï¼šå­¸ç¿’é€²åº¦ä¿¡æ¯ */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              ?®å? {unitId} / 31
            </div>
            <div className="text-sm text-gray-400">
              {isCompleted ? 'å·²å??? : '?²è?ä¸?}
            </div>
          </div>

          {/* ?³å´ï¼šæ?ä½œæ???*/}
          <div className="flex items-center space-x-3">
            {/* ä¸Šä?èª²æ???*/}
            {navigationConfig.hasPrevUnit && (
                <Button
                onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                className="btn-ai-secondary px-4 py-2"
                aria-label={`è¿”å?ä¸Šä?èª²ï??®å?${navigationConfig.prevUnitId}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                ä¸Šä?èª?                </Button>
              )}
              
            {/* ä¸»è??ä??‰é? */}
            {!isCompleted ? (
              // ?ªå???- é¡¯ç¤ºå®Œæ??‰é?
                <Button
                onClick={handleMarkComplete}
                className="btn-ai-success px-6 py-3"
                aria-label={`æ¨™è??®å?${unitId}?ºå·²å®Œæ?`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                å®Œæ?å­¸ç?
              </Button>
            ) : navigationConfig.isLastUnitOfTheme ? (
              // å·²å??ä??¯ä¸»é¡Œæ?å¾Œä?èª?- é¡¯ç¤ºæ¸¬é??‰é?
              <Button 
                onClick={handleNavigateQuiz}
                                        className="btn-ai-primary px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                aria-label={`?²å…¥ä¸»é?${themeId}?„æ¸¬é©—`}
              >
                ?‹å?æ¸¬é?
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : navigationConfig.hasNextUnit ? (
              // å·²å??ä??‰ä?ä¸€èª?- é¡¯ç¤ºä¸‹ä?èª²æ???              <Button 
                onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                className="btn-ai-primary px-6 py-3"
                aria-label={`?å?ä¸‹ä?èª²ï??®å?${navigationConfig.nextUnitId}`}
              >
                ä¸‹ä?èª?                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              // èª²ç?çµæ? - è¿”å?èª²ç?ç¸½è¦½
              <Button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary px-6 py-3"
                aria-label="è¿”å?èª²ç?ç¸½è¦½"
              >
                èª²ç?å®Œæ?
                <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
      </div>

      {/* å®Œæ??•ç•«å½ˆç? - ä¿æ??Ÿæ¨£ */}
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
              <h3 className="text-xl font-bold">?®å?å®Œæ?ï¼?/h3>
              <p className="text-green-100">å­¸ç??‚é?: {realTimeDisplay}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 
