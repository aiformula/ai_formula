import React, { useState, useEffect } from 'react';
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

  // 簡化版單元數據 - 保持原有數據結構
  const units = {
    '1': {
      id: 1,
      themeId: 1,
      title: isZhHK ? '單元 1：什麼是「AI 商業自動化」？不只是取代人力，更是升級戰力！' : 'Unit 1: What is "AI Business Automation"? Not just replacing manpower, but upgrading capabilities!',
      duration: '20分鐘',
      type: 'video',
      description: isZhHK ? '介紹傳統自動化與 AI 自動化的區別。AI 自動化能「理解、判斷、創造」，處理更複雜的任務。' : 'Introduction to the differences between traditional automation and AI automation.',
      content: {
        video: '/videos/unit-1-ai-automation-basics.mp4',
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
      type: 'video',
      description: isZhHK ? '分析導入 AI 自動化的投資回報。透過實際案例，說明如何將員工從重複性高的庶務中解放。' : 'Analyzing the ROI of implementing AI automation through real cases.',
      content: {
        video: '/videos/unit-2-core-advantages.mp4',
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
      type: 'interactive',
      description: isZhHK ? '實用工具入門介紹。了解如何透過 Zapier 或 Make 等平台，將不同的軟體與 AI 串接起來。' : 'Practical tool introduction for connecting different software with AI.',
      content: {
        video: '/videos/unit-3-automation-tools.mp4',
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
    },
    '4': {
      id: 4,
      themeId: 2,
      title: isZhHK ? '單元 4：【行銷自動化】：從文案生成到社群發文，一條龍搞定' : 'Unit 4: Marketing Automation: From copywriting to social posting',
      duration: '40分鐘',
      type: 'interactive',
      description: isZhHK ? '實戰教學：設定一個流程，當你在 Notion 中新增一筆「點子」，AI 會自動生成 FB 貼文草稿、IG 圖說，並排程發布。' : 'Hands-on: Set up AI-powered social media content generation.',
      content: {
        video: '/videos/unit-4-marketing-automation.mp4',
        transcript: isZhHK ? 
          '歡迎來到行銷自動化單元！在這個部分，我們將學習如何利用 AI 自動化來革命性地改善您的行銷流程。\n\n首先，我們來看文案生成自動化。透過 AI 工具如 ChatGPT 或 Claude，結合 Zapier 平台，您可以建立一個自動化流程：當您在 Notion 中輸入一個商品概念或點子時，AI 會自動生成多版本的 Facebook 貼文、Instagram 圖說、Twitter 文案，甚至是 LinkedIn 文章。\n\n接下來是社群發文自動化。透過整合社群媒體管理工具如 Buffer 或 Hootsuite，您可以設定 AI 自動將生成的內容排程發布到不同平台，並根據各平台的特性調整內容格式和風格。\n\n最後，我們會學習如何建立內容效果分析循環，讓 AI 根據貼文的互動率、點擊率等數據，自動調整未來的內容策略和發文時間。' :
          'Welcome to the Marketing Automation unit! In this section, we will learn how to use AI automation to revolutionize your marketing processes.',
        keyPoints: isZhHK ? [
          'AI 文案生成：多平台內容一次生成',
          '社群發文排程：跨平台自動發布',
          '內容效果分析：數據驅動優化',
          '完整行銷漏斗自動化'
        ] : [
          'AI Content Generation: Multi-platform content at once',
          'Social Media Scheduling: Cross-platform auto-posting',
          'Content Performance Analysis: Data-driven optimization',
          'Complete Marketing Funnel Automation'
        ]
      },
      nextUnit: 5,
      nextTheme: null,
      completed: false
    },
    '5': {
      id: 5,
      themeId: 2,
      title: isZhHK ? '單元 5：【客服自動化】：打造 24H 智慧客服，提升客戶滿意度' : 'Unit 5: Customer Service Automation: 24H smart customer service',
      duration: '45分鐘',
      type: 'interactive',
      description: isZhHK ? '實戰教學：將官網的常見問題 (FAQ) 訓練成一個 AI 知識庫，當客戶透過 LINE 或 Messenger 提問時，AI 能即時提供準確回覆。' : 'Hands-on: Train FAQ into AI knowledge base for instant responses.',
      content: {
        video: '/videos/unit-5-customer-service-automation.mp4',
        transcript: isZhHK ? 
          '客服自動化是 AI 應用中最具立即效益的領域之一。在這個單元，我們將學習如何建立一個 24 小時不間斷的智慧客服系統。\n\n首先，我們從知識庫建立開始。將您的 FAQ、產品手冊、服務說明等文件整理成結構化資料，透過 AI 訓練平台如 CustomGPT 或 Chatbase，建立專屬的 AI 客服助理。\n\n接下來是多通道整合。我們會學習如何將 AI 客服接入 LINE、Facebook Messenger、WhatsApp、網站聊天機器人等多個客服通道，確保客戶無論從哪個管道聯繫，都能獲得一致的服務體驗。\n\n最重要的是智慧分流機制。AI 客服會先處理 80% 的常見問題，對於複雜或情緒性的問題，會自動分流給人工客服，並附上問題摘要和客戶背景資訊，讓人工客服能快速接手處理。' :
          'Customer service automation is one of the most immediately beneficial areas of AI application. In this unit, we will learn how to build a 24-hour intelligent customer service system.',
        keyPoints: isZhHK ? [
          'AI 知識庫建立：FAQ 智能化',
          '多通道整合：一致服務體驗',
          '智慧分流機制：人機協作',
          '客戶滿意度提升策略'
        ] : [
          'AI Knowledge Base: Intelligent FAQ',
          'Multi-channel Integration: Consistent service experience',
          'Smart Routing: Human-AI collaboration',
          'Customer Satisfaction Enhancement Strategy'
        ]
      },
      nextUnit: 6,
      nextTheme: null,
      completed: false
    },
    '6': {
      id: 6,
      themeId: 2,
      title: isZhHK ? '單元 6：【營運自動化】：報表整理與資訊擷取的智慧幫手' : 'Unit 6: Operations Automation: Smart assistant for reports',
      duration: '35分鐘',
      type: 'interactive',
      description: isZhHK ? '實戰教學：設定一個流程，每日自動抓取網路上的特定新聞或評論，由 AI 進行摘要與情緒分析，最後彙整成一份報告發送到你的 Email。' : 'Hands-on: Set up automated daily information extraction and AI analysis.',
      content: {
        video: '/videos/unit-6-operations-automation.mp4',
        transcript: isZhHK ? 
          '營運自動化能夠大幅減少重複性的行政工作，讓團隊專注在更具策略性的任務上。\n\n我們從資訊擷取自動化開始。透過 web scraping 工具如 Apify 或 Octoparse，結合 AI 摘要服務，您可以自動監控競爭對手動態、行業新聞、客戶評論等資訊，並生成每日或每週的洞察報告。\n\n接下來是報表自動化。學習如何連接您的 CRM、ERP、Google Analytics 等系統，自動生成銷售報表、客戶分析、財務摘要等各類營運報表，並設定定期發送給相關團隊成員。\n\n最後，我們會建立智慧預警系統。當系統偵測到異常數據（如銷售下滑、庫存不足、客戶投訴增加）時，會自動發送警示並建議處理方案，讓管理者能及時應對。' :
          'Operations automation can significantly reduce repetitive administrative work, allowing teams to focus on more strategic tasks.',
        keyPoints: isZhHK ? [
          '資訊擷取自動化：競爭情報收集',
          '報表自動生成：數據視覺化',
          '智慧預警系統：異常偵測',
          '營運效率最大化'
        ] : [
          'Information Extraction Automation: Competitive intelligence',
          'Automated Report Generation: Data visualization',
          'Smart Alert System: Anomaly detection',
          'Operational Efficiency Maximization'
        ]
      },
      nextUnit: null,
      nextTheme: null,
      completed: false
    },
    '7': {
      id: 7,
      themeId: 3,
      title: isZhHK ? '單元 7：【跨系統工作流】：當客戶下單後，會發生什麼事？' : 'Unit 7: Cross-system Workflow: What happens after an order?',
      duration: '45分鐘',
      type: 'interactive',
      description: isZhHK ? '設計一個完整的跨系統流程。例如：當 Shopify 商店有新訂單時，自動在會計軟體中建立帳目、更新 Google Sheets 的庫存、並透過 AI 發送一封個人化的感謝信給客戶。' : 'Design a complete cross-system process for e-commerce order handling.',
      content: {
        video: '/videos/unit-7-cross-system-workflow.mp4',
        transcript: isZhHK ? 
          '跨系統工作流是 AI 自動化的進階應用，能夠將企業內不同系統無縫整合，創造真正的端到端自動化體驗。\n\n我們以電商訂單處理為例，設計一個完整的自動化流程：當 Shopify 收到新訂單時，系統會自動觸發一系列動作：首先在 QuickBooks 中建立發票和應收帳款、同時更新 Google Sheets 的庫存數量、發送訂單資訊到倉庫管理系統、生成個人化的感謝郵件給客戶、建立客戶資料到 CRM 系統、設定後續的行銷自動化觸發點。\n\n接著我們會學習如何處理異常情況。例如庫存不足時自動通知採購部門、付款失敗時觸發催收流程、高價值客戶訂單時通知客戶經理等。\n\n最後，我們會建立流程監控儀表板，讓您能即時檢視整個自動化流程的運行狀況，並在出現問題時快速定位和修復。' :
          'Cross-system workflows are advanced applications of AI automation that can seamlessly integrate different systems within an enterprise.',
        keyPoints: isZhHK ? [
          '端到端流程設計：訂單到交付',
          '多系統整合：無縫資料流',
          '異常處理機制：智慧應變',
          '流程監控儀表板：即時檢視'
        ] : [
          'End-to-end Process Design: Order to delivery',
          'Multi-system Integration: Seamless data flow',
          'Exception Handling: Smart response',
          'Process Monitoring Dashboard: Real-time view'
        ]
      },
      nextUnit: 8,
      nextTheme: null,
      completed: false
    },
    '8': {
      id: 8,
      themeId: 3,
      title: isZhHK ? '單元 8：【打造專屬 AI 助理】：訓練它成為專家' : 'Unit 8: Build Personal AI Assistant: Train it to be an expert',
      duration: '45分鐘',
      type: 'interactive',
      description: isZhHK ? '介紹如何利用現有工具，為 AI 設定特定角色、知識庫與指令集，打造一個「市場分析助理」或「法務合約初審助理」，執行更專業的任務。' : 'Learn how to create specialized AI assistants with specific roles and knowledge bases.',
      content: {
        video: '/videos/unit-8-ai-assistant.mp4',
        transcript: isZhHK ? 
          '在這個單元，我們將學習如何打造專業級的 AI 助理，讓它成為您團隊中不可或缺的專家成員。\n\n首先是角色設定與知識庫建立。我們會學習如何為 AI 助理定義明確的專業角色，例如「市場研究分析師」、「法務合約審查員」、「財務數據分析師」等，並建立相應的專業知識庫，包括行業報告、法規文件、歷史案例等。\n\n接下來是指令集優化。透過精心設計的 prompt engineering，我們可以讓 AI 助理具備特定的思考模式和工作流程，例如法務助理會按照「條款識別→風險評估→修改建議→優先級排序」的邏輯來審查合約。\n\n最後是整合與部署。學習如何將專屬 AI 助理整合到現有的工作流程中，例如自動接收郵件中的文件進行分析、在 Slack 中回答專業問題、定期生成行業分析報告等。' :
          'In this unit, we will learn how to create professional-grade AI assistants that become indispensable expert members of your team.',
        keyPoints: isZhHK ? [
          '專業角色定義：領域專家設定',
          '知識庫建立：專業資料整合',
          '指令集優化：思考邏輯設計',
          '工作流程整合：無縫協作'
        ] : [
          'Professional Role Definition: Domain expert setup',
          'Knowledge Base Creation: Professional data integration',
          'Instruction Set Optimization: Thinking logic design',
          'Workflow Integration: Seamless collaboration'
        ]
      },
      nextUnit: 9,
      nextTheme: null,
      completed: false
    },
    '9': {
      id: 9,
      themeId: 3,
      title: isZhHK ? '單元 9：【效益評估與優化】：如何證明 AI 的價值？' : 'Unit 9: ROI Assessment and Optimization: Prove AI value',
      duration: '30分鐘',
      type: 'interactive',
      description: isZhHK ? '學習如何量化 AI 自動化帶來的效益，例如計算節省的工時、提升的訂單轉換率。並根據數據，不斷回頭優化你的自動化流程。' : 'Learn how to quantify AI automation benefits and continuously optimize processes.',
      content: {
        video: '/videos/unit-9-roi-optimization.mp4',
        transcript: isZhHK ? 
          '效益評估與優化是 AI 自動化項目成功的關鍵。在這個最後單元，我們將學習如何科學地衡量和優化 AI 自動化的投資回報。\n\n首先是建立評估指標體系。我們會學習如何設定關鍵績效指標（KPI），包括時間節省（工時減少百分比）、成本降低（人力成本節省）、品質提升（錯誤率降低）、效率改善（處理速度提升）等量化指標。\n\n接下來是數據收集與分析。透過自動化工具收集「實施前」vs「實施後」的對比數據，建立清晰的 ROI 計算模型。例如：客服自動化讓回應時間從 4 小時縮短到 5 分鐘，客戶滿意度從 85% 提升到 95%，同時減少 60% 的客服人力需求。\n\n最後是持續優化策略。學習如何根據數據反饋不斷調整自動化流程，包括優化 AI 模型準確性、簡化工作流程、擴展應用範圍等，確保 AI 自動化系統能夠持續創造價值。' :
          'ROI assessment and optimization are key to the success of AI automation projects. In this final unit, we will learn how to scientifically measure and optimize the return on investment of AI automation.',
        keyPoints: isZhHK ? [
          'KPI 指標體系：科學評估標準',
          '數據收集分析：量化投資回報',
          '對比效果驗證：前後數據比較',
          '持續優化策略：價值最大化'
        ] : [
          'KPI Indicator System: Scientific evaluation standards',
          'Data Collection and Analysis: Quantified ROI',
          'Comparative Effect Verification: Before and after data comparison',
          'Continuous Optimization Strategy: Value maximization'
        ]
      },
      nextUnit: null,
      nextTheme: null,
      completed: false
    }
  };

  const currentUnit = units[unitId as keyof typeof units];
  
  if (!currentUnit) {
    return <div>單元不存在</div>;
  }

  const handleMarkComplete = () => {
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
  };

  const handleSaveNotes = () => {
    // 保存筆記的邏輯
    console.log('保存筆記:', notes);
  };

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
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div 
          className="breadcrumb mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/courses/ai-business-automation')}
            className="breadcrumb-item"
          >
            {isZhHK ? '返回課程總覽' : 'Back to Course Overview'}
          </button>
          <span className="breadcrumb-separator">/</span>
          <button 
            onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}`)}
            className="breadcrumb-item"
          >
            {isZhHK ? `第${themeId}大主題` : `Theme ${themeId}`}
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {isZhHK ? `單元 ${unitId}` : `Unit ${unitId}`}
          </span>
        </motion.div>

          {/* 🔧 調試控制面板 - 只在開發模式顯示 */}
          {isDevelopment && showDebugPanel && (
            <motion.div 
              className="fixed top-4 left-4 z-50 bg-yellow-900/90 border border-yellow-600 rounded-lg p-4 backdrop-blur-sm"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
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

        {/* Unit Title Section */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                currentUnit.type === 'video' ? 'bg-purple-500/20 text-purple-400' :
                currentUnit.type === 'interactive' ? 'bg-blue-500/20 text-blue-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {currentUnit.type === 'video' ? <Video className="w-6 h-6" /> :
                 currentUnit.type === 'interactive' ? <Target className="w-6 h-6" /> :
                 <FileText className="w-6 h-6" />}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{currentUnit.title}</h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentUnit.duration}</span>
                  </span>
                  <Badge variant={currentUnit.type === 'video' ? 'default' : 'secondary'}>
                    {currentUnit.type === 'video' ? '影片課程' : 
                     currentUnit.type === 'interactive' ? '互動練習' : '閱讀材料'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* 🎯 主要計時器顯示 - 醒目位置 */}
              <motion.div 
                className={`px-6 py-4 rounded-xl border-2 ${
                  isTimerActive && !isCompleted 
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 shadow-lg shadow-blue-500/25' 
                    : isCompleted 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50'
                    : 'bg-gray-500/20 border-gray-400/30'
                }`}
                animate={{
                  scale: isTimerActive && !isCompleted ? [1, 1.02, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isTimerActive && !isCompleted ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center space-x-3">
                  <Clock className={`w-6 h-6 ${
                    isTimerActive && !isCompleted 
                      ? 'text-blue-400' 
                      : isCompleted 
                      ? 'text-green-400'
                      : 'text-gray-400'
                  }`} />
                  <div className="text-center">
                    <div className={`text-2xl font-bold font-mono tracking-wider ${
                      isTimerActive && !isCompleted 
                        ? 'text-blue-300' 
                        : isCompleted 
                        ? 'text-green-300'
                        : 'text-gray-300'
                    }`}>
                      {realTimeDisplay}
                    </div>
                    <div className={`text-xs uppercase tracking-widest ${
                      isTimerActive && !isCompleted 
                        ? 'text-blue-400/80' 
                        : isCompleted 
                        ? 'text-green-400/80'
                        : 'text-gray-400/80'
                    }`}>
                      {isCompleted 
                        ? (isZhHK ? '學習完成' : 'Completed')
                        : isTimerActive 
                        ? (isZhHK ? '學習計時中' : 'Learning Timer')
                        : (isZhHK ? '準備開始' : 'Ready to Start')
                      }
                    </div>
                  </div>
                </div>
              </motion.div>

              {isCompleted && (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{isZhHK ? '已完成' : 'Completed'}</span>
                </div>
              )}
            </div>
          </div>

          {/* 🎯 學習進度提示條 */}
          {isTimerActive && !isCompleted && (
            <motion.div 
              className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-blue-300">
                  <span className="font-medium">正在學習中...</span>
                  <span className="ml-2 text-blue-400/80">計時器已啟動，專心學習吧！</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Content Section - IMPROVED (No Video) */}
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="content-section-header">
                <BookOpen className="w-6 h-6 text-blue-400 mr-3" />
                <div>
                  <h2 className="content-section-title text-white">{isZhHK ? '課程內容' : 'Course Content'}</h2>
                  <p className="content-section-subtitle text-white/70">
                    {currentUnit.description}
                  </p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="text-white/80 leading-relaxed space-y-4">
                  {currentUnit.content.transcript.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Practical Examples Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  {isZhHK ? '實際應用案例' : 'Practical Applications'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">{isZhHK ? '電商自動化' : 'E-commerce Automation'}</h4>
                    <p className="text-sm text-white/70">{isZhHK ? '從訂單處理到客戶通知的完整流程' : 'Complete workflow from order processing to customer notifications'}</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">{isZhHK ? '內容創作' : 'Content Creation'}</h4>
                    <p className="text-sm text-white/70">{isZhHK ? '自動生成社群媒體內容與排程發布' : 'Auto-generate social media content and schedule posting'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Key Points - IMPROVED */}
            <motion.div 
              className="sidebar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="sidebar-header">
                <h3 className="sidebar-title text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  {isZhHK ? '重點摘要' : 'Key Points'}
                </h3>
              </div>
              <div className="sidebar-content">
                <div className="key-points-container">
                  <div className="key-points-list">
                    {currentUnit.content.keyPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        className="key-point-item"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <CheckCircle className="key-point-icon" />
                        <span className="key-point-text text-white/80">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notes Section - IMPROVED */}
            <motion.div 
              className="notes-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="sidebar-header">
                <h3 className="sidebar-title text-white flex items-center">
                  <Edit className="w-5 h-5 mr-2 text-green-400" />
                  {isZhHK ? '我的筆記' : 'My Notes'}
                </h3>
              </div>
              <div className="sidebar-content">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isZhHK ? '在此記錄你的學習筆記...' : 'Record your learning notes here...'}
                  className="notes-textarea text-white bg-gray-700/50 border-gray-600/50 focus:border-blue-500/50 focus:ring-blue-500/30"
                />
                <Button 
                  onClick={handleSaveNotes}
                  className="notes-save-button"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isZhHK ? '儲存' : 'Save'}
                </Button>
              </div>
            </motion.div>

            {/* Course Actions - IMPROVED */}
            <motion.div 
              className="sidebar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="sidebar-header">
                <h3 className="sidebar-title text-white">{isZhHK ? '課程互動' : 'Course Actions'}</h3>
              </div>
              <div className="sidebar-content space-y-3">
                <Button className="btn-secondary w-full justify-start">
                  <Bookmark className="w-4 h-4 mr-2" />
                  {isZhHK ? '收藏' : 'Bookmark'}
                </Button>
                <Button className="btn-secondary w-full justify-start">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {isZhHK ? '點讚' : 'Like'}
                </Button>
                <Button className="btn-secondary w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  {isZhHK ? '分享' : 'Share'}
                </Button>
                <Button className="btn-secondary w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  {isZhHK ? '下載資源' : 'Download'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Unit Navigation - IMPROVED */}
        <motion.div 
          className="unit-navigation mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between">
            {/* Previous Unit Button with Smart State */}
            {currentUnit.id > 1 ? (
              <Button 
                onClick={() => {
                  const prevUnitId = currentUnit.id - 1;
                  navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${prevUnitId}`);
                }}
                className="nav-button-with-context nav-button-secondary"
              >
                <ArrowLeft className="w-4 h-4" />
                <div className="nav-label-context">
                  <span className="nav-label-primary">{isZhHK ? '上一課' : 'Previous'}</span>
                  <span className="nav-label-secondary">{isZhHK ? `單元 ${currentUnit.id - 1}` : `Unit ${currentUnit.id - 1}`}</span>
                </div>
              </Button>
            ) : (
              <Button 
                onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}`)}
                className="nav-button-with-context nav-button-secondary"
              >
                <ArrowLeft className="w-4 h-4" />
                <div className="nav-label-context">
                  <span className="nav-label-primary">{isZhHK ? '返回' : 'Back'}</span>
                  <span className="nav-label-secondary">{isZhHK ? '主題概覽' : 'Theme Overview'}</span>
                </div>
              </Button>
            )}

            {/* Center Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Progress Indicator */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-sm text-gray-300">
                  {isZhHK ? `單元 ${unitId} / 主題 ${themeId}` : `Unit ${unitId} / Theme ${themeId}`}
                </span>
              </div>

              {/* Completed Indicator (when marked complete) */}
              {isCompleted && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-900/30 rounded-lg border border-green-700/30">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-green-400">
                    {isZhHK ? '已完成' : 'Completed'}
                  </span>
                </div>
              )}
            </div>

            {/* Smart Unified Action Button */}
            {(() => {
              const unitNum = parseInt(unitId);
              const themeNum = parseInt(themeId);
              const isLastUnitOfTheme = (unitNum % 3 === 0);
              
              // If not completed yet, show mark complete button
              if (!isCompleted) {
                return (
                  <Button 
                    onClick={handleMarkComplete}
                    className="nav-button-success"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <div className="nav-label-context">
                      <span className="nav-label-primary">{isZhHK ? '標記完成' : 'Mark Complete'}</span>
                    </div>
                  </Button>
                );
              }
              
              // If completed, show next action
              if (isLastUnitOfTheme) {
                // Last unit of theme -> Go to quiz
                return (
                  <Button 
                    onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}/quiz`)}
                    className="nav-button-with-context nav-button-primary"
                  >
                    <div className="nav-label-context">
                      <span className="nav-label-primary">{isZhHK ? '進入測驗' : 'Take Quiz'}</span>
                      <span className="nav-label-secondary">{isZhHK ? `主題 ${themeId} 小測驗` : `Theme ${themeId} Quiz`}</span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                );
              } else {
                // Not last unit -> Go to next unit in same theme
                const nextUnitId = unitNum + 1;
                return (
                  <Button 
                    onClick={() => {
                      navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${nextUnitId}`);
                    }}
                    className="nav-button-with-context nav-button-primary"
                  >
                    <div className="nav-label-context">
                      <span className="nav-label-primary">{isZhHK ? '下一課' : 'Next'}</span>
                      <span className="nav-label-secondary">
                        {isZhHK ? `單元 ${nextUnitId}` : `Unit ${nextUnitId}`}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                );
              }
            })()} 
          </div>

          {/* Learning Progress Bar */}
          <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{isZhHK ? '課程整體進度' : 'Overall Course Progress'}</span>
              <span className="text-sm font-medium text-white">
                {stats.totalProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.totalProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{stats.completedUnits}/{stats.totalUnits} 單元完成</span>
              <span>{stats.completedQuizzes}/{stats.totalQuizzes} 測驗完成</span>
            </div>
            {isCompleted && (
              <div className="flex items-center mt-3 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>{isZhHK ? '本單元已完成！' : 'This unit is completed!'}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Completion Animation Overlay */}
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