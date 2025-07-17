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
import { useAIAutomationProgress } from '@/hooks/useAIAutomationProgress'; // 新增：進度追蹤
import './AIBusinessAutomationUnit.css'; // 🎨 課程頁面增強樣式
import '@/styles/design-system.css'; // 🎨 統一設計系統
import { LearningPageSkeleton, HeaderSkeleton, LearningContentSkeleton, SidebarSkeleton } from '@/components/ui/skeleton'; // 新增：骨架屏

const AIBusinessAutomationUnit: React.FC = () => {
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
    markUnitCompleted,
    isUnitCompleted,
    getProgressStats,
    // 實時計時功能
    startUnitLearning,
    stopUnitLearning,
    getCurrentLearningTime,
    getRealTimeSeconds,
    formatLearningTime
  } = useAIAutomationProgress();
  
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
    navigate('/courses/ai-business-automation');
  }, [navigate]);

  const handleNavigateNext = useCallback((nextUnitId: number) => {
    navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${nextUnitId}`);
  }, [navigate, themeId]);

  const handleNavigatePrev = useCallback((prevUnitId: number) => {
    navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${prevUnitId}`);
  }, [navigate, themeId]);

  const handleNavigateQuiz = useCallback(() => {
    navigate(`/courses/ai-business-automation/theme/${themeId}/quiz`);
  }, [navigate, themeId]);

  // 簡化版單元數據 - 保持原有數據結構
  const units = useMemo(() => ({
    '1': {
      id: 1,
      themeId: 1,
      title: isZhHK ? '單元 1：什麼是「AI 商業自動化」？不只是取代人力，更是升級戰力！' : 'Unit 1: What is "AI Business Automation"? Not just replacing manpower, but upgrading capabilities!',
      duration: '20分鐘',
      type: 'video' as const,
      description: isZhHK ? '介紹傳統自動化與 AI 自動化的區別。AI 自動化能「理解、判斷、創造」，處理更複雜的任務。' : 'Introduction to the differences between traditional automation and AI automation.',
      content: {
        transcript: isZhHK ? 
          '歡迎來到我們的 AI 商業自動化課程！在這個單元，我們將深入了解什麼是 AI 商業自動化，以及它與傳統自動化的區別。\n\n傳統自動化只能處理固定規則的任務，如設定郵件排程、資料備份等。而 AI 自動化則能夠理解複雜的自然語言、基於情境做出智慧決策、生成個人化的內容和回應，甚至從過往經驗中學習改進。\n\n舉例來說，傳統客服自動化只能發送固定模板回應，但 AI 客服自動化能夠理解客戶的具體問題，判斷問題的複雜程度，提供個人化的解決方案。\n\n現在是導入 AI 自動化的最佳時機，因為技術已經成熟、成本效益越來越高、早期採用者能獲得先行者優勢，而且客戶對更好服務體驗的期望不斷提升。' :
          'Welcome to our AI Business Automation course! In this unit, we will deeply understand what AI business automation is and how it differs from traditional automation.',
        keyPoints: isZhHK ? [
          'AI 自動化能「理解、判斷、創造」',
          '與傳統自動化的根本區別', 
          '實際應用案例分析',
          '現在是導入的最佳時機'
        ] : [
          'AI automation can "understand, judge, create"',
          'Fundamental differences from traditional automation',
          'Real-world application case studies',
          'Now is the perfect time for implementation'
        ]
      },
      nextUnit: 2,
      nextTheme: null,
      completed: true
    },
    '2': {
      id: 2,
      themeId: 1,
      title: isZhHK ? '單元 2：為什麼現在必須導入？三大核心優勢：省時、省錢、防錯' : 'Unit 2: Why must we implement now? Three core advantages: Save time, save money, prevent errors',
      duration: '25分鐘',
      type: 'video' as const,
      description: isZhHK ? '分析導入 AI 自動化的投資回報。透過實際案例，說明如何將員工從重複性高的庶務中解放。' : 'Analyzing the ROI of implementing AI automation through real cases.',
      content: {
        transcript: isZhHK ? 
          '在上一個單元，我們了解了什麼是 AI 商業自動化。現在讓我們深入分析為什麼現在是導入的最佳時機，以及它的三大核心優勢。\n\n第一個優勢是省時。AI 自動化可以自動處理 80% 的常規任務、即時資料同步和更新、智能工作流程管理，以及快速資訊檢索和分析。某電商公司導入後，訂單處理時間從 30 分鐘縮短到 3 分鐘，客服回應從 24 小時縮短到即時。\n\n第二個優勢是省錢。以一家 50 人的公司為例，如果每人每天節省 2 小時，以平均時薪 200 元計算，一年可節省 500 萬元成本，而 AI 系統投資只需 50 萬元，投資回報率超過 900%。\n\n第三個優勢是防錯。AI 自動化可以標準化流程執行、智能資料驗證、一致性檢查，以及預測性風險管理。某會計事務所導入後，資料錯誤率從 5% 降到 0.1%，合規檢查準確率達到 99.9%。' :
          'In the previous unit, we learned what AI business automation is. Now let\'s analyze in depth why now is the best time to implement it and its three core advantages.',
        keyPoints: isZhHK ? [
          '省時：自動處理 80% 常規任務',
          '省錢：ROI 可達 900%+',
          '防錯：準確率達 99.9%',
          '現在是導入的最佳時機'
        ] : [
          'Save Time: Automatically handle 80% of routine tasks',
          'Save Money: ROI can reach 900%+',
          'Prevent Errors: Accuracy rate up to 99.9%',
          'Now is the perfect time for implementation'
        ]
      },
      nextUnit: 3,
      nextTheme: null,
      completed: true
    },
    '3': {
      id: 3,
      themeId: 1,
      title: isZhHK ? '單元 3：認識你的自動化工具箱：Zapier, Make 與 API 基礎' : 'Unit 3: Know your automation toolbox: Zapier, Make and API basics',
      duration: '45分鐘',
      type: 'interactive' as const,
      description: isZhHK ? '實用工具入門介紹。了解如何透過 Zapier 或 Make 等平台，將不同的軟體與 AI 串接起來。' : 'Practical tool introduction for connecting different software with AI.',
      content: {
        transcript: isZhHK ? 
          '現在我們已經了解了 AI 自動化的重要性，接下來讓我們學習具體的工具，讓你能夠立即開始實施自動化。\n\nZapier 是自動化新手的最佳朋友，它是一個自動化平台，讓你可以連接超過 5000 個不同的應用程式，無需寫程式就能創建自動化工作流程。核心概念包括 Trigger（觸發器）、Action（動作）和 Zap（完整的自動化流程）。\n\nMake（前身為 Integromat）是進階自動化的選擇，提供更強大的功能，包括視覺化編輯器、條件邏輯處理、強大的資料處理能力，以及完善的錯誤處理機制。\n\nAPI 基礎知識可以解鎖無限可能。API 是應用程式之間溝通的橋樑，讓不同軟體可以交換資料和功能。基本概念包括 Endpoint（API 存取位址）、Request Methods（GET、POST、PUT、DELETE），以及 Authentication（API Key、OAuth 等認證方法）。' :
          'Now that we understand the importance of AI automation, let\'s learn about specific tools that will allow you to start implementing automation immediately.',
        keyPoints: isZhHK ? [
          'Zapier：新手友善的自動化平台',
          'Make：進階功能與視覺化設計',
          'API 基礎：解鎖無限可能性',
          '工具選擇決策框架'
        ] : [
          'Zapier: Beginner-friendly automation platform',
          'Make: Advanced features and visual design',
          'API Basics: Unlock unlimited possibilities',
          'Tool selection decision framework'
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
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">單元不存在</h1>
          <button
            onClick={() => navigate('/courses/ai-business-automation')}
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
    const isLastUnitOfTheme = (unitNum % 3 === 0);
    
    return {
      unitNum,
      isLastUnitOfTheme,
      hasNextUnit: unitNum < 9,
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

  // 🎯 移除重複的 useEffect，因為主要 useEffect 已經處理完成狀態

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
                aria-label="返回AI商業自動化課程首頁"
              >
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" aria-hidden="true" />
                <span className="font-medium text-sm">返回課程</span>
              </button>
              
              <div className="text-gray-400 text-sm" aria-label="課程位置資訊">
                <span className="text-gray-300 font-medium">AI商業自動化</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>主題 {themeId}</span>
              </div>
            </div>

            {/* 中央：進度信息 + 計時器 */}
            <div className="flex items-center space-x-6" role="region" aria-label="學習進度和計時器">
              
              {/* 學習進度 */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400" aria-label={`目前單元：第${unitId}單元，共9個單元`}>單元 {unitId}/9</div>
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
              <button 
                onClick={handleNavigateBack}
                className="btn-ai-secondary btn-mobile-compact hover-lift click-scale focus-ring"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">返回</span>
              </button>
              
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
                const isLastUnitOfTheme = (unitNum % 3 === 0);
                
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
              currentUnit.type === 'interactive' ? 'bg-blue-500/20 text-blue-300' :
              'bg-green-500/20 text-green-300'
            }`}>
              {currentUnit.type === 'video' ? <Video className="w-6 h-6" /> :
               currentUnit.type === 'interactive' ? <Target className="w-6 h-6" /> :
               <FileText className="w-6 h-6" />}
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
                   currentUnit.type === 'interactive' ? '互動練習' : '閱讀材料'}
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

              {/* 實際應用案例 - 響應式優化 */}
              <div className="mt-8 lg:mt-12 p-6 lg:p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl lg:rounded-2xl border border-blue-500/20">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-200 mb-4 lg:mb-6 flex items-center">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                  實際應用案例
                </h3>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-3">
                    <h4 className="text-base lg:text-lg font-semibold text-white">🛒 電商自動化</h4>
                    <p className="text-gray-300 leading-relaxed text-sm lg:text-base">從訂單處理到客戶通知的完整流程自動化，提升營運效率。</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-base lg:text-lg font-semibold text-white">📝 內容創作</h4>
                    <p className="text-gray-300 leading-relaxed text-sm lg:text-base">自動生成社群媒體內容與排程發布，節省創作時間。</p>
                  </div>
                </div>
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
                  <dt className="text-gray-300 text-xs lg:text-sm">完成單元</dt>
                  <dd className="text-purple-300 font-medium text-sm lg:text-base" aria-label={`已完成${stats.completedUnits}個單元，共${stats.totalUnits}個單元`}>{stats.completedUnits}/{stats.totalUnits}</dd>
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
              單元 {unitId} / 9
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

export default AIBusinessAutomationUnit; 