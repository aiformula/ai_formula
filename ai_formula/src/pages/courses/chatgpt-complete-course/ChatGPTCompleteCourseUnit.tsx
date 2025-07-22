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
  const isDevelopment = process.env.NODE_ENV === 'development';

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
  
  const { 
    completeUnit,
    getThemeProgress,
    getProgressStats,
    isThemeCompleted,
    isThemeAccessible,
    themeProgress,
    courseStats
  } = useChatGPTProgress();

  // 修正的 getThemeId 函數，對應30個單元
  const getThemeId = useCallback((unitNumber: number) => {
    if (unitNumber >= 1 && unitNumber <= 5) return 1;   // 第一章：解構 ChatGPT (1-5)
    if (unitNumber >= 6 && unitNumber <= 10) return 2;  // 第二章：初探門徑 (6-10)
    if (unitNumber >= 11 && unitNumber <= 16) return 3; // 第三章：核心功能實戰 (11-16)
    if (unitNumber >= 17 && unitNumber <= 21) return 4; // 第四章：精通之道 (17-21)
    if (unitNumber >= 22 && unitNumber <= 26) return 5; // 第五章：打造專屬 AI (22-26)
    if (unitNumber >= 27 && unitNumber <= 30) return 6; // 第六章：展望未來 (27-30)
    return 1;
  }, []);

  // 課程單元數據 - 30個單元
  const unitsData = useMemo(() => [
    // 第一章：解構 ChatGPT (Units 1-5)
    {
      id: 1, themeId: 1, title: '什麼是 ChatGPT？全面認識AI聊天革命',
      keyPoints: ['ChatGPT基本概念', 'AI聊天機器人發展', '技術背景介紹', '應用場景概覽'],
      transcript: 'ChatGPT 是由 OpenAI 開發的先進 AI 聊天機器人，基於大型語言模型技術...'
    },
    {
      id: 2, themeId: 1, title: 'ChatGPT 的核心技術：大型語言模型解密',
      keyPoints: ['大型語言模型原理', 'GPT技術演進', '神經網絡基礎', '訓練數據來源'],
      transcript: '大型語言模型（LLM）是 ChatGPT 的核心技術，透過深度學習技術訓練...'
    },
    {
      id: 3, themeId: 1, title: 'ChatGPT vs 其他AI工具：優勢與差異分析',
      keyPoints: ['競爭對手比較', 'ChatGPT獨特優勢', '技術差異分析', '選擇標準'],
      transcript: '在眾多 AI 工具中，ChatGPT 以其出色的對話能力和廣泛的應用場景脫穎而出...'
    },
    {
      id: 4, themeId: 1, title: '註冊與設置：開始你的 ChatGPT 之旅',
      keyPoints: ['帳號註冊流程', '介面設置說明', '個人化設定', '安全性配置'],
      transcript: '開始使用 ChatGPT 的第一步是創建帳號並進行基本設置...'
    },
    {
      id: 5, themeId: 1, title: '基本操作與介面導覽',
      keyPoints: ['主介面介紹', '基本操作方法', '功能按鈕說明', '快捷鍵使用'],
      transcript: 'ChatGPT 的使用者介面設計直觀，讓初學者也能快速上手...'
    },
    
    // 第二章：初探門徑 (Units 6-10)
    {
      id: 6, themeId: 2, title: '第一次對話：如何與 AI 開始交流',
      keyPoints: ['對話開始技巧', '問題表達方式', '互動禮儀', '預期管理'],
      transcript: '與 ChatGPT 的第一次對話可能會令人興奮，掌握正確的開始方式很重要...'
    },
    {
      id: 7, themeId: 2, title: '提問的藝術：如何問出好問題',
      keyPoints: ['問題設計原則', '具體化技巧', '開放式vs封閉式問題', '追問策略'],
      transcript: '好的問題是獲得高質量回答的關鍵，學會如何提問是掌握 ChatGPT 的第一步...'
    },
    {
      id: 8, themeId: 2, title: '理解 AI 回答：解讀與驗證',
      keyPoints: ['回答解讀技巧', '資訊驗證方法', '準確性評估', '批判性思考'],
      transcript: 'ChatGPT 的回答需要正確理解和驗證，培養批判性思維很重要...'
    },
    {
      id: 9, themeId: 2, title: '對話延續：深入探討話題',
      keyPoints: ['對話延續技巧', '話題深化方法', '脈絡維持', '多輪對話管理'],
      transcript: '有效的對話延續能夠獲得更深入和詳細的資訊...'
    },
    {
      id: 10, themeId: 2, title: '常見錯誤與避免方法',
      keyPoints: ['新手常見錯誤', '問題解決方案', '最佳實踐', '注意事項'],
      transcript: '了解並避免常見錯誤能讓你更有效地使用 ChatGPT...'
    },
    
    // 第三章：核心功能實戰 (Units 11-16)
    {
      id: 11, themeId: 3, title: '文字創作：釋放創意潛能',
      keyPoints: ['創意寫作技巧', '文體掌握', '靈感激發', '創作流程'],
      transcript: 'ChatGPT 在文字創作方面表現出色，能夠協助各種文體的創作...'
    },
    {
      id: 12, themeId: 3, title: '數據分析：AI 驅動的洞察',
      keyPoints: ['數據解讀能力', '分析方法論', '圖表說明', '趨勢預測'],
      transcript: '利用 ChatGPT 進行數據分析能夠快速獲得有價值的洞察...'
    },
    {
      id: 13, themeId: 3, title: '程式編碼：AI 程式設計助手',
      keyPoints: ['代碼生成', '程式除錯', '演算法解釋', '最佳實踐'],
      transcript: 'ChatGPT 是強大的程式設計助手，能夠協助編碼和除錯...'
    },
    {
      id: 14, themeId: 3, title: '語言翻譯：跨越語言障礙',
      keyPoints: ['翻譯準確性', '文化適應', '專業術語', '多語言支援'],
      transcript: 'ChatGPT 的多語言能力使其成為優秀的翻譯工具...'
    },
    {
      id: 15, themeId: 3, title: '學術研究：研究方法與資料整理',
      keyPoints: ['研究方法論', '文獻整理', '學術寫作', '引用格式'],
      transcript: '在學術研究中，ChatGPT 能夠提供方法論指導和資料整理支援...'
    },
    {
      id: 16, themeId: 3, title: '創意發想：腦力激盪與點子生成',
      keyPoints: ['創意發想技巧', '腦力激盪方法', '點子評估', '創新思維'],
      transcript: 'ChatGPT 能夠激發創意思維，協助產生創新點子...'
    },
    
    // 第四章：精通之道 (Units 17-21)
    {
      id: 17, themeId: 4, title: '進階提示詞技巧',
      keyPoints: ['提示詞工程', '角色扮演', '情境設定', '輸出格式控制'],
      transcript: '掌握進階提示詞技巧能夠大幅提升 ChatGPT 的表現...'
    },
    {
      id: 18, themeId: 4, title: '角色扮演與情境模擬',
      keyPoints: ['角色設定技巧', '情境構建', '沉浸式體驗', '專業顧問模式'],
      transcript: '透過角色扮演，ChatGPT 能夠提供更專業和針對性的建議...'
    },
    {
      id: 19, themeId: 4, title: '複雜任務分解與管理',
      keyPoints: ['任務分解方法', '步驟規劃', '執行監控', '成果整合'],
      transcript: '複雜任務需要有效的分解和管理策略...'
    },
    {
      id: 20, themeId: 4, title: '批量處理與自動化思維',
      keyPoints: ['批量處理技巧', '自動化流程', '效率優化', '範本建立'],
      transcript: '批量處理和自動化思維能夠大幅提升工作效率...'
    },
    {
      id: 21, themeId: 4, title: '品質控制與結果優化',
      keyPoints: ['品質評估標準', '結果優化方法', '迭代改進', '最佳實踐'],
      transcript: '建立品質控制機制確保 ChatGPT 輸出的高品質...'
    },
    
    // 第五章：打造專屬 AI (Units 22-26)
    {
      id: 22, themeId: 5, title: '個人化設定與偏好調整',
      keyPoints: ['個人偏好設定', '對話風格調整', '回應長度控制', '專業領域聚焦'],
      transcript: '透過個人化設定，打造符合個人需求的 AI 助手...'
    },
    {
      id: 23, themeId: 5, title: '建立專屬知識庫',
      keyPoints: ['知識庫建構', '資訊組織', '檢索優化', '更新維護'],
      transcript: '建立專屬知識庫能夠提供更精準的專業支援...'
    },
    {
      id: 24, themeId: 5, title: '工作流程整合',
      keyPoints: ['工作流程設計', '系統整合', '效率最大化', '無縫銜接'],
      transcript: '將 ChatGPT 整合到工作流程中，實現效率最大化...'
    },
    {
      id: 25, themeId: 5, title: '團隊協作與分享',
      keyPoints: ['團隊協作模式', '知識分享', '最佳實踐交流', '協同效應'],
      transcript: '在團隊環境中有效運用 ChatGPT，創造協同效應...'
    },
    {
      id: 26, themeId: 5, title: '持續學習與改進',
      keyPoints: ['學習機制建立', '技能提升路徑', '反馈循環', '持續優化'],
      transcript: '建立持續學習機制，不斷提升 AI 使用技能...'
    },
    
    // 第六章：展望未來 (Units 27-30)
    {
      id: 27, themeId: 6, title: 'AI 發展趨勢與未來展望',
      keyPoints: ['技術發展趨勢', '應用前景預測', '社會影響分析', '機遇挑戰並存'],
      transcript: '了解 AI 技術的發展趨勢，把握未來機遇...'
    },
    {
      id: 28, themeId: 6, title: '職場變革：AI 時代的工作技能',
      keyPoints: ['職場技能轉型', '人機協作模式', '競爭力提升', '職業發展策略'],
      transcript: 'AI 時代的職場變革要求我們掌握新的工作技能...'
    },
    {
      id: 29, themeId: 6, title: '倫理考量與責任使用',
      keyPoints: ['AI 倫理原則', '責任使用指南', '隱私保護', '社會責任'],
      transcript: '負責任地使用 AI 技術，考慮倫理和社會影響...'
    },
    {
      id: 30, themeId: 6, title: '建立你的 AI 學習藍圖',
      keyPoints: ['學習路徑規劃', '技能發展藍圖', '資源整合', '持續成長'],
      transcript: '制定個人 AI 學習藍圖，開啟持續成長之路...'
    }
  ], []);

  const currentUnit = useMemo(() => {
    const unitNumber = parseInt(unitId || '1');
    const themeNumber = parseInt(themeId || '1');
    
    if (unitNumber < 1 || unitNumber > 30 || themeNumber < 1 || themeNumber > 6) {
      return unitsData[0];
    }
    
    const expectedTheme = getThemeId(unitNumber);
    if (expectedTheme !== themeNumber) {
      return unitsData[0];
    }
    
    return unitsData.find(unit => unit.id === unitNumber) || unitsData[0];
  }, [unitId, themeId, unitsData, getThemeId]);

  const isLastUnitInTheme = useMemo(() => {
    const unitNumber = parseInt(unitId || '1');
    const lastUnitsInThemes = [5, 10, 16, 21, 26, 30];
    return lastUnitsInThemes.includes(unitNumber);
  }, [unitId]);

  const handleNextAction = useCallback(() => {
    const unitNumber = parseInt(unitId || '1');
    
    if (isLastUnitInTheme) {
      const currentTheme = getThemeId(unitNumber);
      navigate(`/courses/chatgpt-complete-course/theme/${currentTheme}/quiz`);
    } else {
      const nextUnit = unitNumber + 1;
      const nextTheme = getThemeId(nextUnit);
      navigate(`/courses/chatgpt-complete-course/theme/${nextTheme}/unit/${nextUnit}`);
    }
  }, [unitId, isLastUnitInTheme, getThemeId, navigate]);

  const handleBackToTheme = useCallback(() => {
    const themeNumber = parseInt(themeId || '1');
    navigate(`/courses/chatgpt-complete-course/theme/${themeNumber}`);
  }, [themeId, navigate]);

  // 視覺卡片渲染
  const renderVisualCard = useMemo(() => {
    const unitNumber = parseInt(unitId || '1');
    
    switch (unitNumber) {
      case 1: return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
          <div className="text-center">
            <MessageSquare className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI 對話革命</h3>
            <p className="text-gray-600">探索 ChatGPT 如何改變人機互動方式</p>
          </div>
        </div>
      );
      case 2: return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl">
          <div className="text-center">
            <Zap className="mx-auto mb-4 text-purple-600" size={48} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">技術核心</h3>
            <p className="text-gray-600">深入了解大型語言模型的運作原理</p>
          </div>
        </div>
      );
      default: return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-100 p-6 rounded-xl">
          <div className="text-center">
            <BookOpen className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">學習重點</h3>
            <p className="text-gray-600">掌握本單元的核心概念</p>
          </div>
        </div>
      );
    }
  }, [unitId]);

  return (
    <div className="dark min-h-screen bg-slate-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 標題區域 */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToTheme}
              className="mb-4 text-gray-300 hover:text-white"
            >
              <ArrowLeft className="mr-2" size={20} />
              返回主題
            </Button>
            
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  第 {currentUnit.themeId} 章
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  單元 {currentUnit.id}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-white">
                {currentUnit.title}
              </h1>
              
              <div className="flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>15-20 分鐘</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} />
                  <span>核心概念掌握</span>
                </div>
              </div>
            </div>
          </div>

          {/* 主要內容區域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左側：學習內容 */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Play className="text-blue-500" size={20} />
                    學習內容
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-slate-300 leading-relaxed">
                    {currentUnit.transcript}
                  </div>
                  
                  {/* 視覺卡片 */}
                  <div className="my-8">
                    {renderVisualCard}
                  </div>
                  
                  {/* 導航按鈕 */}
                  <div className="flex justify-end pt-6">
                    <Button 
                      onClick={handleNextAction}
                      className={`px-8 py-3 ${
                        isLastUnitInTheme 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {isLastUnitInTheme ? '開始測驗' : '下一個單元'}
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右側：學習重點 */}
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="text-yellow-500" size={20} />
                    學習重點
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentUnit.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-slate-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* 學習統計 */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="text-blue-500" size={20} />
                    學習統計
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">整體進度</span>
                      <span className="text-white">{courseStats.totalProgress}%</span>
                    </div>
                    <Progress value={courseStats.totalProgress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="text-2xl font-bold text-white">
                        {Object.values(themeProgress).reduce((total, theme) => total + theme.completedUnits.length, 0)}
                      </div>
                      <div className="text-xs text-slate-400">已完成</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="text-2xl font-bold text-white">30</div>
                      <div className="text-xs text-slate-400">總單元</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 