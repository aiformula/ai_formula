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
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress';
import './ChatGPTCompleteCourseUnit.css';
import '@/styles/design-system.css';
import { LearningPageSkeleton, HeaderSkeleton, LearningContentSkeleton, SidebarSkeleton } from '@/components/ui/skeleton';

const ChatGPTCompleteCourseUnit: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  const [learningSeconds, setLearningSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  const [forceTimerForTesting, setForceTimerForTesting] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [completionAnimation, setCompletionAnimation] = useState(false);
  const [realTimeDisplay, setRealTimeDisplay] = useState('00:00:00');

  const isDevelopment = process.env.NODE_ENV === 'development';

  // Development keyboard shortcuts
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
  
  // Progress tracking hooks
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    themeProgress
  } = useChatGPTProgress();

  // Unit completion check
  const isUnitCompleted = useCallback((unitKey: string): boolean => {
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return false;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    
    const progress = getThemeProgress(themeId);
    return progress ? progress.completedUnits.includes(unitId) : false;
  }, [getThemeProgress]);
  
  // Mark unit as completed
  const markUnitCompleted = useCallback((unitKey: string, timeSpent: number = 60) => {
    const match = unitKey.match(/t(\d+)-u(\d+)/);
    if (!match) return;
    
    const themeId = parseInt(match[1]);
    const unitId = parseInt(match[2]);
    const timeInMinutes = Math.ceil(timeSpent / 60);
    
    completeUnit(themeId, unitId, timeInMinutes);
  }, [completeUnit]);

  // Generate unit key
  const getUnitKey = (themeId: string, unitId: string): string => {
    return `t${themeId}-u${unitId}`;
  };

  const currentUnitKey = getUnitKey(themeId || '1', unitId || '1');
  const isCompleted = isUnitCompleted(currentUnitKey);
  const stats = getProgressStats();

  // Handle mark complete
  const handleMarkComplete = useCallback(() => {
    setIsTimerActive(false);
    const finalSeconds = Math.max(learningSeconds, 1);
    
    const finalHours = Math.floor(finalSeconds / 3600);
    const finalMinutes = Math.floor((finalSeconds % 3600) / 60);
    const remainingSeconds = finalSeconds % 60;
    
    const formattedHours = finalHours.toString().padStart(2, '0');
    const formattedMinutes = finalMinutes.toString().padStart(2, '0');
    const formattedSecondsDisplay = remainingSeconds.toString().padStart(2, '0');
    const finalTimeDisplay = `${formattedHours}:${formattedMinutes}:${formattedSecondsDisplay}`;
    
    setRealTimeDisplay(finalTimeDisplay);
    markUnitCompleted(currentUnitKey, finalSeconds);
    
    setCompletionAnimation(true);
    setTimeout(() => {
      setCompletionAnimation(false);
    }, 2000);
  }, [learningSeconds, currentUnitKey, markUnitCompleted]);

  // Navigation handlers
  const handleNavigateBack = useCallback(() => {
    navigate('/courses/chatgpt-complete-course/learning');
  }, [navigate]);

  const handleNavigateNext = useCallback((nextUnitId: number) => {
    let nextThemeId = themeId;
    if (nextUnitId >= 6 && nextUnitId <= 10) nextThemeId = '2';
    if (nextUnitId >= 11 && nextUnitId <= 16) nextThemeId = '3';
    if (nextUnitId >= 17 && nextUnitId <= 21) nextThemeId = '4';
    if (nextUnitId >= 22 && nextUnitId <= 26) nextThemeId = '5';
    if (nextUnitId >= 27 && nextUnitId <= 31) nextThemeId = '6';
    
    navigate(`/courses/chatgpt-complete-course/theme/${nextThemeId}/unit/${nextUnitId}`);
  }, [navigate, themeId]);

  const handleNavigatePrev = useCallback((prevUnitId: number) => {
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

  // Course units data - properly structured
  const units = useMemo(() => ({
    '1': {
      id: 1,
      themeId: 1,
      title: isZhHK ? '單元 1.1：什麼是大型語言模型 (LLM)?' : 'Unit 1.1: What is a Large Language Model (LLM)?',
      duration: '15分鐘',
      type: 'text' as const,
      description: isZhHK ? '整個課程的起點，介紹人工智能基礎概念和完整學習路線圖，建立學習目標和方法' : 'The beginning of the entire course, introducing basic AI concepts and complete learning roadmap, establishing learning goals and methods.',
      content: {
        transcript: isZhHK ? 
          '大型語言模型（Large Language Model, LLM）是一種先進的人工智能（AI）程式，經過海量文本數據訓練，從而學會理解、生成、總結、翻譯人類語言以及執行其他複雜的文本相關任務。' :
          'A Large Language Model (LLM) is a cutting-edge artificial intelligence program trained on massive text data to understand, generate, summarize, translate human language and perform other complex text-related tasks.',
        keyPoints: isZhHK ? [
          '大型語言模型：基於Transformer架構的先進AI系統',
          '海量訓練：使用互聯網大量文本數據進行訓練',
          '多功能性：理解、生成、翻譯、總結等多種能力',
          '參數規模：數十億到數千億個參數的複雜模型'
        ] : [
          'Large Language Model: Advanced AI system based on Transformer architecture',
          'Massive Training: Trained on vast amounts of internet text data',
          'Versatility: Multiple capabilities including understanding, generation, translation, summarization',
          'Parameter Scale: Complex models with billions to hundreds of billions of parameters'
        ]
      },
      nextUnit: 2,
      nextTheme: null,
      completed: false
    },
    '2': {
      id: 2,
      themeId: 1,
      title: isZhHK ? '單元 1.2：深度解析 LLM' : 'Unit 1.2: Deep Analysis of LLM',
      duration: '18分鐘',
      type: 'text' as const,
      description: isZhHK ? '探索LLM的建構基礎神經網絡以及革命性Transformer架構的核心創新自注意力機制' : 'Explore the building blocks of LLM neural networks and the core innovation of the revolutionary Transformer architecture self-attention mechanisms.',
      content: {
        transcript: isZhHK ? 
          'LLM的建構基礎是人工神經網絡，這是一種模仿我們大腦中神經元相互連接傳遞信息方式的計算模型。' :
          'The building blocks of LLM are artificial neural networks, which are computational models that mimic the way neurons in biological brains interconnect and transmit signals.',
        keyPoints: isZhHK ? [
          '神經網絡：模仿大腦神經元的計算模型',
          'Transformer架構：2017年革命性的深度學習架構',
          '自注意力機制：捕捉文本中長距離依賴關係的核心技術',
          '並行處理：相比RNN大幅提升訓練效率'
        ] : [
          'Neural Networks: Computational models mimicking brain neurons',
          'Transformer Architecture: Revolutionary deep learning architecture from 2017',
          'Self-Attention Mechanism: Core technology for capturing long-range dependencies in text',
          'Parallel Processing: Significantly improved training efficiency compared to RNN'
        ]
      },
      nextUnit: 3,
      nextTheme: null,
      completed: false
    },
    // Add remaining units following the same pattern...
    '31': {
      id: 31,
      themeId: 6,
      title: isZhHK ? '單元 6.5：人工智能的未來：展望 GPT 的下一步發展與對社會的長遠影響' : 'Unit 6.5: The Future of AI: GPT\'s Next Development and Long-term Social Impact',
      duration: '25分鐘',
      type: 'text' as const,
      description: isZhHK ? '探索AI技術的未來趨勢和對社會各個層面的潛在影響' : 'Explore future trends in AI technology and potential impacts on various aspects of society.',
      content: {
        transcript: isZhHK ? 
          '人工智能正處於快速發展階段，了解其未來趨勢對個人和社會規劃都具有重要意義。' :
          'Artificial intelligence is in a rapid development phase, and understanding its future trends is important for both personal and social planning.',
        keyPoints: isZhHK ? [
          '技術趨勢：模型能力增強、多模態整合、技術融合',
          '社會影響：就業變化、教育轉型、醫療革命',
          '倫理挑戰：新興議題、全球治理、責任歸屬',
          '個人準備：持續學習、跨領域技能、情感智能',
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

  // Current unit data with proper fallback
  const currentUnit = useMemo(() => {
    const unit = units[unitId as keyof typeof units];
    if (!unit) {
      return {
        id: parseInt(unitId || '1'),
        themeId: parseInt(themeId || '1'),
        title: '單元不存在',
        duration: '0分鐘',
        type: 'video' as const,
        description: '請檢查單元ID是否正確',
        content: {
          transcript: '內容不存在',
          keyPoints: ['請返回課程列表']
        }
      };
    }
    return unit;
  }, [units, unitId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isCompleted && !forceTimerForTesting) {
      setIsTimerActive(false);
      setLearningSeconds(0);
      return;
    }
    
    const shouldStart = !isCompleted || forceTimerForTesting;
    
    if (shouldStart && isTimerActive) {
      interval = setInterval(() => {
        setLearningSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const seconds = newSeconds % 60;
          
          const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          setRealTimeDisplay(display);
          
          return newSeconds;
        });
      }, 1000);
    } else {
      setIsTimerActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, isCompleted, forceTimerForTesting]);

  // Auto-start timer on component mount
  useEffect(() => {
    if (!isCompleted || forceTimerForTesting) {
      setIsTimerActive(true);
    }
  }, [isCompleted, forceTimerForTesting]);

  // Navigation configuration
  const navigationConfig = useMemo(() => {
    const currentId = currentUnit.id;
    const hasPrevUnit = currentId > 1;
    const hasNextUnit = currentId < 31;
    
    return {
      hasPrevUnit,
      hasNextUnit,
      prevUnitId: currentId - 1,
      nextUnitId: currentId + 1
    };
  }, [currentUnit.id]);

  // Progress configuration
  const progressConfig = useMemo(() => {
    const totalUnits = 31;
    const completedUnits = stats.completedUnits || 0;
    const progressPercentage = Math.round((completedUnits / totalUnits) * 100);
    
    return {
      totalUnits,
      completedUnits,
      progressPercentage,
      currentUnitNumber: currentUnit.id,
      isLastUnit: currentUnit.id === totalUnits
    };
  }, [stats.completedUnits, currentUnit.id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      {/* Main Content */}
      <div className="pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={handleNavigateBack}
                className="btn-ai-secondary flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isZhHK ? '返回課程' : 'Back to Course'}</span>
              </Button>
              
              <div className="text-right">
                <div className="text-sm text-gray-400">{isZhHK ? '進度' : 'Progress'}</div>
                <div className="text-lg font-semibold text-green-400">
                  {progressConfig.completedUnits}/{progressConfig.totalUnits}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Badge className="bg-green-500/20 text-green-300 mb-4">
                {isZhHK ? `第 ${currentUnit.themeId} 章` : `Chapter ${currentUnit.themeId}`}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {currentUnit.title}
              </h1>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                {currentUnit.description}
              </p>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 lg:p-8 border border-gray-700/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Content Display */}
                <div className="space-y-6">
                  
                  {/* Main Transcript */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-400" />
                      {isZhHK ? '主要內容' : 'Main Content'}
                    </h3>
                    <div className="prose prose-invert prose-lg max-w-none">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentUnit.content.transcript}
                      </p>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                      {isZhHK ? '重點整理' : 'Key Points'}
                    </h3>
                    <ul className="space-y-3">
                      {currentUnit.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">•</span>
                          <span className="text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    
                    {/* Mark Complete Button */}
                    {!isCompleted && (
                      <Button
                        onClick={handleMarkComplete}
                        className="btn-ai-primary flex items-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>{isZhHK ? '標記完成' : 'Mark Complete'}</span>
                      </Button>
                    )}

                    {isCompleted && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span>{isZhHK ? '已完成' : 'Completed'}</span>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex space-x-3">
                      {navigationConfig.hasPrevUnit && (
                        <Button
                          onClick={() => handleNavigatePrev(navigationConfig.prevUnitId)}
                          className="btn-ai-secondary"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          {isZhHK ? '上一單元' : 'Previous'}
                        </Button>
                      )}

                      {navigationConfig.hasNextUnit && (
                        <Button
                          onClick={() => handleNavigateNext(navigationConfig.nextUnitId)}
                          className="btn-ai-primary"
                        >
                          {isZhHK ? '下一單元' : 'Next'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}

                      {progressConfig.isLastUnit && (
                        <Button
                          onClick={handleNavigateQuiz}
                          className="btn-ai-accent"
                        >
                          {isZhHK ? '進行測驗' : 'Take Quiz'}
                        </Button>
                      )}
                    </div>

                  </div>
                </div>

              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                
                {/* Unit Info */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold mb-4">
                    {isZhHK ? '單元資訊' : 'Unit Info'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '時長' : 'Duration'}</span>
                      <span className="text-white font-medium">{currentUnit.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '類型' : 'Type'}</span>
                      <span className="text-white font-medium capitalize">{currentUnit.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '學習時間' : 'Study Time'}</span>
                      <span className="text-green-400 font-mono font-medium">{realTimeDisplay}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold mb-4">
                    {isZhHK ? '學習進度' : 'Progress'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '總進度' : 'Overall'}</span>
                      <span className="text-green-400 font-bold">{stats.totalProgress}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{isZhHK ? '完成主題' : 'Themes'}</span>
                      <span className="text-white">{stats.completedThemes}/{stats.totalThemes}</span>
                    </div>
                    {isCompleted && (
                      <div className="flex items-center space-x-2 mt-4 p-2 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 text-sm font-medium">{isZhHK ? '已完成' : 'Completed'}</span>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Completion Animation */}
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
              <h3 className="text-xl font-bold">{isZhHK ? '完成！' : 'Completed!'}</h3>
              <p className="text-green-100">{isZhHK ? '學習時間' : 'Study Time'}: {realTimeDisplay}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 