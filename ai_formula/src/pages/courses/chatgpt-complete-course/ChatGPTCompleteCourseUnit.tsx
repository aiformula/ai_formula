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

  // 課程數據配置 - 完全按照正確大綱結構
  const unitsData = [
    // 第一章：解構 ChatGPT — 深入核心技術
    { 
      id: 1, 
      title: "1.1 什麼是大型語言模型 (LLM)？", 
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
      title: "1.2 Transformer 架構：神經網絡與自注意力機制", 
      duration: "30分鐘",
      transcript: `LLM 的構建基石是人工神經網絡，這是一種模仿生物大腦中神經元相互連接和傳遞信號方式的計算模型。它由多個層級的節點組成，包括輸入層、輸出層以及一層或多層位於兩者之間的「隱藏層」。

然而，LLM 能力實現質的飛躍，其真正的技術突破在於 2017 年被提出的 Transformer 架構。在 Transformer 出現之前，主流的序列處理模型（如循環神經網絡 RNN）必須按順序逐字處理文本，這極大地限制了訓練速度和處理長文本的能力。Transformer 架構則引入了並行處理機制，可以同時分析整個輸入序列，從而能夠利用現代 GPU 的強大並行計算能力，大幅縮短訓練時間。

Transformer 架構的核心是其獨創的「自注意力機制」（Self-Attention Mechanism）。這個機制使得模型在處理序列中的某個單詞時，能夠權衡輸入文本中所有其他單詞對該單詞的重要性，並給予不同的「注意力」權重。這讓模型能夠捕捉到詞語之間複雜的、長距離的依賴關係，從而更深刻地理解上下文。例如，在句子「貓咪追著老鼠，因为它饿了」中，自注意力機制能幫助模型準確地將代詞「它」與主語「貓咪」聯繫起來，而不是「老鼠」。

為了讓神經網絡能夠處理語言，LLM 採用了「詞嵌入」（Word Embeddings）技術來表示單詞。傳統的機器學習方法可能使用孤立的數字來代表每個詞，無法表達詞語間的語義關係。詞嵌入則將每個單詞映射到一個高維的向量空間中。在這個空間裡，意思或用法相近的詞語（例如「國王」與「女王」，或「走路」與「奔跑」）在向量上的距離會更近。這種表示方式使得模型能夠捕捉到單詞之間細微的語義和句法關係，為理解複雜語言奠定了數學基礎。

這種從順序處理到並行處理的範式轉移，是近年來 AI 發展突然加速的根本原因。它使得在海量數據上訓練具有數千億參數的超大規模模型成為可能，最終催生了具備強大能力的 ChatGPT。`,
      keyPoints: [
        "理解人工神經網絡的基本結構和工作原理",
        "掌握Transformer架構的革命性突破：並行處理機制",
        "深入了解自注意力機制如何處理語言的上下文關係",
        "認識詞嵌入技術在語言理解中的重要作用"
      ]
    },
    { 
      id: 3, 
      title: "1.3 GPT 的意義：生成式、預訓練、變壓器", 
      duration: "25分鐘",
      transcript: `ChatGPT 的核心技術可以從其全稱 GPT（Generative Pre-trained Transformer）中得到精確的解釋。這三個詞揭示了其架構、訓練方法和核心功能。

變壓器 (Transformer)：這指明了其底層的技術架構，即前一節所詳述的、基於自注意力機制的 Transformer 模型。

預訓練 (Pre-trained)：這是 GPT 模型訓練方法的第一個、也是最關鍵的階段。在這個階段，模型會進行所謂的「無監督學習」，消化來自互聯網、書籍、文章等海量的、未經標註的文本數據。其核心學習任務非常簡單：根據一段文本的上文，預測下一個最有可能出現的單詞或字符。通過在數以萬億計的句子上重複這個過程，模型不僅學會了語法規則和詞彙知識，還內化了大量的世界常識、語義關係，甚至初步的推理模式。這個階段為模型打下了一個廣博的知識基礎。

生成式 (Generative)：這個詞描述了模型最核心的能力——創造（生成）全新的、原創的內容。這與另一類被稱為「判別式模型」（Discriminative Models）的 AI 形成對比。判別式模型（如用於文本分類的 BERT）的主要任務是進行分類或判斷，例如判斷一封郵件是否為垃圾郵件。而生成式模型則能夠從零開始創作，生成全新的句子、段落、代碼，甚至是圖像和音樂。

在完成大規模的「預訓練」之後，模型通常會進入第二個訓練階段——「微調」（Fine-tuning）。在這個階段，開發者會使用一個規模小得多、但帶有特定任務標籤的數據集來進一步訓練模型。更重要的是，OpenAI 引入了「來自人類反饋的強化學習」（Reinforcement Learning from Human Feedback, RLHF）技術。在這個過程中，人類訓練員會對模型的不同回答進行評分和排序，模型則根據這些反饋來調整其行為，使其輸出更符合人類的期望，例如更準確地遵循指令、減少有害或帶有偏見的內容。`,
      keyPoints: [
        "理解GPT名稱中三個關鍵詞的技術含義",
        "掌握預訓練階段的無監督學習機制",
        "區分生成式模型與判別式模型的根本差異",
        "了解RLHF技術如何提升模型的安全性和有用性"
      ]
    },
    { 
      id: 4, 
      title: "1.4 從 GPT-1 到 GPT-4o：模型的演進之路", 
      duration: "28分鐘",
      transcript: `GPT 模型的發展歷程清晰地展示了 OpenAI 的技術演進路徑，每一代模型都在規模和能力上實現了顯著的飛躍。這條路徑不僅是技術的自然延伸，也反映了 OpenAI 的產品化戰略：首先建立一個知識淵博的「大腦」，然後教它「聽懂指令」，最後賦予它與世界多維度互動的「感官」。

GPT-1 (2018)：作為開創者，GPT-1 首次成功地將 Transformer 架構應用於生成式預訓練任務。它擁有 1.17 億個參數，在當時的多個自然語言處理基準測試中取得了優異成績，驗證了這條技術路線的可行性。

GPT-2 (2019)：參數規模和訓練數據量大幅提升，展現了令人驚訝的「零樣本學習」（Zero-shot learning）能力。這意味著它可以在沒有任何特定任務範例的情況下，僅憑指令就完成一些新任務，顯示出更強的泛化能力。

GPT-3 (2020)：這是一個里程碑式的模型，擁有 1750 億個參數。其最顯著的突破是強大的「少樣本學習」（Few-shot learning）能力，即只需在提示中給出極少數（幾個）範例，模型就能迅速掌握新任務的模式並舉一反三。

InstructGPT (2022)：與其說這是下一代模型，不如說是一次方向性的轉變。OpenAI 發現，僅僅「博學」的模型並不總是「有用」或「安全」。InstructGPT 重點引入了 RLHF 訓練方法，旨在解決 AI 的「對齊」（Alignment）問題，即使模型的行為和輸出更符合人類的意圖和價值觀。這使得模型極大地提升了遵循用戶指令的能力，為 ChatGPT 的誕生奠定了關鍵基礎。

GPT-4 (2023)：GPT-4 不僅在語言理解、邏輯推理和準確性上相比 GPT-3.5 有了質的飛躍，更重要的是，它成為了一個「多模態」（multimodal）模型。它首次具備了處理文本以外信息的能力，能夠接收和理解圖像輸入，例如解釋一張圖表的內容或描述一張照片的場景。

GPT-4o (2024)：o 代表 "omni"（全能），標誌著 OpenAI 在多模態交互上的又一重大突破。GPT-4o 是首個在單一神經網絡模型中原生整合了文本、音訊和視覺處理能力的模型。這使得它能夠實現近乎即時的、極其自然的實時語音對話，並能同時理解用戶的語音和攝像頭捕捉到的視覺信息，極大地拉近了 AI 交互與人類自然溝通的距離。`,
      keyPoints: [
        "追溯GPT模型從1.17億到數千億參數的技術演進",
        "理解每一代模型在能力上的關鍵突破點",
        "掌握從純文本到多模態交互的發展脈絡",
        "認識RLHF技術在模型安全性方面的重要作用"
      ]
    },
    { 
      id: 5, 
      title: "1.5 OpenAI 簡史：ChatGPT 的創造者", 
      duration: "22分鐘",
      transcript: `ChatGPT 的橫空出世，讓其背後的開發機構 OpenAI 從一個在人工智能研究領域備受尊敬的名字，一躍成為全球科技界的焦點和家喻戶曉的品牌。

創立與初衷 (2015)：OpenAI 於 2015 年由一群科技界的遠見者共同創立，其中包括 Sam Altman、Elon Musk、Greg Brockman 和 Ilya Sutskever 等人。其最初的形態是一個非營利研究實驗室，懷抱著一個宏大的使命：確保通用人工智能（Artificial General Intelligence, AGI）的發展能夠安全、負責任地造福全人類，而不是被少數巨頭壟斷或對人類構成威脅。

轉型與微軟的戰略合作：隨著研究的深入，OpenAI 意識到訓練頂尖大型語言模型需要極其龐大的計算資源和資金投入，這遠非一個非營利組織所能負擔。為了應對這一挑戰，OpenAI 在 2019 年進行了結構重組，成立了一家名為 OpenAI LP 的「利潤上限」（capped-profit）公司。這一獨特的結構旨在平衡其追求科研使命與吸引商業投資的需求。同年，微軟向 OpenAI 進行了 10 億美元的初始投資，並在隨後的幾年裡追加了數十億美元，成為其最重要的戰略合作夥伴，為其提供了所需的 Azure 雲計算資源。

關鍵人物：公司的靈魂人物是其聯合創始人兼行政總裁 Sam Altman。在執掌 OpenAI 之前，Altman 以其作為著名初創企業孵化器 Y Combinator 總裁的經歷而聞名，成功孵化了 Airbnb、Reddit 等眾多知名企業。他憑藉其在科技界的影響力和卓越的領導力，帶領 OpenAI 從一個研究機構轉型為估值數百億美元的 AI 巨頭。另一位備受關注的創始人 Elon Musk 則因對公司發展方向和安全問題的擔憂，於 2018 年離開了 OpenAI 董事會，並在之後創立了自己的 AI 公司 xAI。

ChatGPT 的引爆點 (2022)：儘管 OpenAI 在此之前已經發布了多個版本的 GPT 模型，並在學術界和開發者社區中享有盛譽，但真正讓其突破圈層、引發全球性關注的，是 2022 年 11 月發布的 ChatGPT。其極其易用的對話界面和強大的能力，迅速吸引了數以億計的用戶，引爆了全球範圍內的生成式 AI 熱潮，並促使 Google、Meta 等科技巨頭紛紛加速推出自己的競品。`,
      keyPoints: [
        "了解OpenAI的創立背景和非營利初衷",
        "理解從非營利到「利潤上限」公司的戰略轉型",
        "認識Sam Altman等關鍵人物的領導作用",
        "掌握ChatGPT如何引爆全球AI熱潮的歷史意義"
      ]
    },

    // 第二章：初探門徑 — 帳戶設定與介面導覽
    { 
      id: 6, 
      title: "2.1 註冊與登入：開啟您的 AI 之旅", 
      duration: "20分鐘",
      transcript: `開始使用 ChatGPT 的第一步是創建一個 OpenAI 帳戶。整個過程相當直接和便捷。

訪問官方網站：在您的網頁瀏覽器中輸入官方網址 chat.openai.com。

開始註冊：在頁面中，點擊「Sign up」（註冊）按鈕。您可以選擇使用常用的電郵地址進行註冊，或者為了更快捷的流程，直接使用您的 Google、Microsoft 或 Apple 帳戶進行關聯註冊。

完成驗證：如果您使用電郵地址註冊，系統會發送一封驗證郵件到您的郵箱，您需要點擊郵件中的連結來確認您的帳戶。此外，為了防止濫用和確認您是真實用戶，系統可能會要求您提供一個有效的手機號碼以接收驗證碼。

成功登入：完成所有驗證步驟後，您就可以返回登入頁面，點擊「Log in」（登入），輸入您的帳戶信息，正式進入 ChatGPT 的主操作介面。

值得一提的是，為了降低用戶體驗的門檻，OpenAI 現在也允許用戶在不創建帳戶的情況下，即時使用部分基礎功能。然而，這種模式下，您將無法保存對話歷史、使用自訂指令等核心的個人化功能，因此註冊一個帳戶仍然是獲得完整體驗的推薦做法。`,
      keyPoints: [
        "掌握ChatGPT帳戶註冊的完整流程",
        "了解多種註冊方式的優缺點",
        "理解帳戶驗證的安全性目的",
        "認識註冊帳戶與匿名使用的功能差異"
      ]
    },
    { 
      id: 7, 
      title: "2.2 免費版與付費版 (Plus/Team) 比較分析", 
      duration: "25分鐘",
      transcript: `OpenAI 提供了不同的服務方案以滿足不同用戶的需求，主要分為免費版和以 ChatGPT Plus 為代表的付費版。兩者在功能、性能和使用限制上存在顯著差異，理解這些差異有助於您選擇最適合自己的方案。

這種區分策略的背後，體現了 OpenAI 的核心商業模式。通過提供一個功能足夠強大但存在明顯限制的免費版，OpenAI 能夠吸引海量的用戶，這些用戶的使用數據和反饋成為其快速迭代和改進模型的寶貴資源。與此同時，將最先進的模型、更高的使用限額和獨家新功能作為付費牆後的內容，有效地驅動了對性能和效率有更高要求的重度用戶和專業人士升級為付費訂閱者，從而形成一個「數據與收入共同驅動模型進步」的正向循環。`,
      keyPoints: [
        "理解免費版與付費版的核心功能差異",
        "掌握使用量限制和響應速度的區別",
        "了解高級功能（GPT-4o、數據分析、圖像生成）的訪問權限",
        "學會根據個人需求評估升級的必要性"
      ]
    },
    { 
      id: 8, 
      title: "2.3 主介面詳解：側邊欄、對話歷史與模型選擇", 
      duration: "30分鐘",
      transcript: `ChatGPT 的主介面設計簡潔直觀，主要分為左側的導航側邊欄和右側的主對話區。近年來，介面的演變也反映了其從一個單純的聊天工具向一個綜合性 AI 工作平台的戰略轉型。早期介面僅聚焦於對話本身，而如今新增的「專案」和「GPT 商店」等功能，旨在鼓勵用戶在平台內完成從研究、創作到協作的完整工作流。

左側側邊欄包含新建對話、對話歷史、探索GPTs和專案功能。主對話區則包含模型選擇器、臨時對話模式和輸入框等核心交互元素。`,
      keyPoints: [
        "熟悉左側邊欄的所有功能模塊",
        "掌握對話歷史的管理和組織技巧",
        "了解不同模型選項的特點和適用場景",
        "學會使用臨時對話保護隱私"
      ]
    },
    { 
      id: 9, 
      title: "2.4 基本對話操作：重新生成、編輯、複製與分享", 
      duration: "25分鐘",
      transcript: `在與 ChatGPT 的每一次互動中，您都可以對生成的回覆進行一系列操作，以更好地控制對話流程和結果。

編輯提示、重新生成回答、複製內容、評分反饋和分享對話等功能，讓用戶能夠充分控制AI交互的過程和結果。`,
      keyPoints: [
        "掌握編輯已發送提示的方法",
        "學會使用重新生成功能優化回答",
        "了解複製和分享功能的實用技巧",
        "理解評分反饋對改進AI的重要性"
      ]
    },
    { 
      id: 10, 
      title: "2.5 跨平台體驗：網頁、桌面應用與手機 App 的異同", 
      duration: "22分鐘",
      transcript: `ChatGPT 致力於提供無縫的跨平台體驗，確保您可以在不同的設備上接續您的工作。

多平台覆蓋包括網頁版、桌面應用和手機App，每個平台都有其獨特的優勢和功能特色。數據同步確保了一致的用戶體驗。`,
      keyPoints: [
        "了解各平台的獨特功能和優勢",
        "掌握數據同步的工作原理",
        "學會選擇最適合特定任務的平台",
        "熟悉各平台的快捷操作和特色功能"
      ]
    }
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

  // 計算主題ID
  const getThemeId = (unitNumber: number) => {
    if (unitNumber >= 1 && unitNumber <= 5) return 1; // 第一章：解構 ChatGPT
    if (unitNumber >= 6 && unitNumber <= 10) return 2; // 第二章：初探門徑
    return 1; // 默認第一章
  };

  // 導航到Quiz
  const handleNavigateQuiz = useCallback(() => {
    const currentThemeId = getThemeId(currentUnit.id);
    navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId}/quiz`);
  }, [currentUnit.id, navigate]);

  // 導航到下一單元
  const handleNextUnit = useCallback(() => {
    handleSaveProgress();
    const nextUnitId = currentUnit.id + 1;
    if (nextUnitId <= unitsData.length) {
      const nextThemeId = getThemeId(nextUnitId);
      navigate(`/courses/chatgpt-complete-course/theme/${nextThemeId}/unit/${nextUnitId}`);
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
    <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
                    onClick={() => navigate('/courses/chatgpt-complete-course/learning')}
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
                      case 1: // 1.1 什麼是大型語言模型 (LLM)？
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🧠 LLM 技術應用領域</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h5 className="text-white font-medium">🧠 自然語言理解</h5>
                                  <p className="text-gray-300 text-sm">文本分類、情感分析、實體識別等複雜語言處理任務。</p>
                                </div>
                                <div className="space-y-2">
                                  <h5 className="text-white font-medium">✍️ 文本生成應用</h5>
                                  <p className="text-gray-300 text-sm">自動摘要、機器翻譯、創意寫作和程式碼生成。</p>
                                </div>
                                <div className="space-y-2">
                                  <h5 className="text-white font-medium">🔍 資訊檢索</h5>
                                  <p className="text-gray-300 text-sm">智能搜尋、問答系統、知識圖譜構建。</p>
                                </div>
                                <div className="space-y-2">
                                  <h5 className="text-white font-medium">🎯 個人化推薦</h5>
                                  <p className="text-gray-300 text-sm">內容推薦、用戶畫像分析、個性化服務。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                        
                      case 2: // 1.2 Transformer 架構：神經網絡與自注意力機制
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">⚡ Transformer 技術突破</h4>
                              <div className="space-y-4">
                                <div className="bg-white/5 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">🔄 並行處理機制</h5>
                                  <p className="text-gray-300 text-sm">打破順序處理限制，同時分析整個輸入序列，大幅提升訓練效率。</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">🎯 自注意力機制</h5>
                                  <p className="text-gray-300 text-sm">模型能權衡文本中每個詞的重要性，捕捉複雜的上下文關係。</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">📊 詞嵌入技術</h5>
                                  <p className="text-gray-300 text-sm">將詞語映射到高維向量空間，讓相近詞語在數學上更接近。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 3: // 1.3 GPT 的意義：生成式、預訓練、變壓器
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🔤 GPT 名稱解構</h4>
                              <div className="space-y-4">
                                <div className="border-l-4 border-blue-400 pl-4">
                                  <h5 className="text-white font-medium">G - Generative (生成式)</h5>
                                  <p className="text-gray-300 text-sm">能創造全新原創內容，而非僅進行分類判斷。</p>
                                </div>
                                <div className="border-l-4 border-green-400 pl-4">
                                  <h5 className="text-white font-medium">P - Pre-trained (預訓練)</h5>
                                  <p className="text-gray-300 text-sm">在海量無標註數據上學習語言模式和世界知識。</p>
                                </div>
                                <div className="border-l-4 border-purple-400 pl-4">
                                  <h5 className="text-white font-medium">T - Transformer (變壓器)</h5>
                                  <p className="text-gray-300 text-sm">基於自注意力機制的革命性神經網絡架構。</p>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 mt-4">
                                <h5 className="text-white font-medium mb-2">🎯 RLHF 技術</h5>
                                <p className="text-gray-300 text-sm">來自人類反饋的強化學習，讓AI更安全、更有用。</p>
                              </div>
                            </div>
                          </div>
                        );

                      case 4: // 1.4 從 GPT-1 到 GPT-4o：模型的演進之路
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">📈 GPT 演進時間軸</h4>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">GPT-1 (2018)</span>
                                    <span className="text-gray-300 text-sm ml-2">1.17億參數，驗證技術可行性</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">GPT-2 (2019)</span>
                                    <span className="text-gray-300 text-sm ml-2">零樣本學習能力突破</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">GPT-3 (2020)</span>
                                    <span className="text-gray-300 text-sm ml-2">1750億參數，少樣本學習里程碑</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">GPT-4 (2023)</span>
                                    <span className="text-gray-300 text-sm ml-2">多模態能力，圖像理解</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                  <div>
                                    <span className="text-white font-medium">GPT-4o (2024)</span>
                                    <span className="text-gray-300 text-sm ml-2">全能模型，實時語音交互</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 5: // 1.5 OpenAI 簡史：ChatGPT 的創造者
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🏢 OpenAI 發展歷程</h4>
                              <div className="space-y-4">
                                <div className="bg-blue-500/20 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">2015年 創立</h5>
                                  <p className="text-gray-300 text-sm">Sam Altman、Elon Musk等人創立非營利AI研究實驗室</p>
                                </div>
                                <div className="bg-green-500/20 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">2019年 轉型</h5>
                                  <p className="text-gray-300 text-sm">成立"利潤上限"公司，微軟10億美元投資</p>
                                </div>
                                <div className="bg-purple-500/20 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">2022年 爆發</h5>
                                  <p className="text-gray-300 text-sm">ChatGPT發布，引爆全球生成式AI熱潮</p>
                                </div>
                              </div>
                              <div className="border-t border-white/20 pt-4">
                                <h5 className="text-white font-medium mb-2">🎯 使命願景</h5>
                                <p className="text-gray-300 text-sm">確保通用人工智能安全、負責任地造福全人類</p>
                              </div>
                            </div>
                          </div>
                        );

                      case 6: // 2.1 註冊與登入：開啟您的 AI 之旅
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🚀 快速開始指南</h4>
                              <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-0.5">1</span>
                                  <div>
                                    <p className="text-white font-medium">訪問 chat.openai.com</p>
                                    <p className="text-gray-300 text-sm">官方唯一入口，確保安全可靠</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-0.5">2</span>
                                  <div>
                                    <p className="text-white font-medium">選擇註冊方式</p>
                                    <p className="text-gray-300 text-sm">電子郵件或Google/Microsoft/Apple帳戶</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-0.5">3</span>
                                  <div>
                                    <p className="text-white font-medium">完成驗證</p>
                                    <p className="text-gray-300 text-sm">郵箱驗證 + 手機號碼確認</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-0.5">4</span>
                                  <div>
                                    <p className="text-white font-medium">開始對話</p>
                                    <p className="text-gray-300 text-sm">享受完整的AI助手體驗</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 7: // 2.2 免費版與付費版比較分析
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">💰 版本比較表</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-white/20">
                                      <th className="text-left text-white font-medium py-2">功能特性</th>
                                      <th className="text-center text-green-400 font-medium py-2">免費版</th>
                                      <th className="text-center text-blue-400 font-medium py-2">Plus版</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-gray-300">
                                    <tr className="border-b border-white/10">
                                      <td className="py-2">GPT-4o 使用</td>
                                      <td className="text-center">有限制</td>
                                      <td className="text-center">無限制</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                      <td className="py-2">響應速度</td>
                                      <td className="text-center">標準</td>
                                      <td className="text-center">優先</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                      <td className="py-2">數據分析</td>
                                      <td className="text-center">有限制</td>
                                      <td className="text-center">完整功能</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                      <td className="py-2">圖像生成</td>
                                      <td className="text-center">有限制</td>
                                      <td className="text-center">更高限額</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2">創建GPTs</td>
                                      <td className="text-center">❌</td>
                                      <td className="text-center">✅</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        );

                      case 8: // 2.3 主介面詳解
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">🖥️ 介面佈局導覽</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h5 className="text-white font-medium">📋 左側邊欄</h5>
                                  <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>新建對話</li>
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>對話歷史</li>
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>探索GPTs</li>
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>專案管理</li>
                                  </ul>
                                </div>
                                <div className="space-y-3">
                                  <h5 className="text-white font-medium">💬 主對話區</h5>
                                  <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>模型選擇器</li>
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>臨時對話</li>
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>訊息輸入框</li>
                                    <li className="flex items-center"><span className="text-green-400 mr-2">•</span>文件上傳</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 9: // 2.4 基本對話操作
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">⚡ 對話控制技巧</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">✏️ 編輯提示</h5>
                                  <p className="text-gray-300 text-sm">修改已發送的問題，重新獲得回答</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">🔄 重新生成</h5>
                                  <p className="text-gray-300 text-sm">基於同樣問題獲得不同角度的回答</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">📋 複製內容</h5>
                                  <p className="text-gray-300 text-sm">一鍵複製AI回答到剪貼板</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">🔗 分享對話</h5>
                                  <p className="text-gray-300 text-sm">生成公開連結與他人分享對話</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 10: // 2.5 跨平台體驗
                        return (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="text-base lg:text-lg font-semibold text-white">📱 平台特色功能</h4>
                              <div className="space-y-4">
                                <div className="border border-blue-400/30 rounded-lg p-4">
                                  <h5 className="text-blue-400 font-medium mb-2">🌐 網頁版</h5>
                                  <p className="text-gray-300 text-sm">最新功能優先體驗，完整功能支援</p>
                                </div>
                                <div className="border border-green-400/30 rounded-lg p-4">
                                  <h5 className="text-green-400 font-medium mb-2">💻 桌面應用</h5>
                                  <p className="text-gray-300 text-sm">全局快捷鍵、螢幕截圖分析</p>
                                </div>
                                <div className="border border-purple-400/30 rounded-lg p-4">
                                  <h5 className="text-purple-400 font-medium mb-2">📱 手機App</h5>
                                  <p className="text-gray-300 text-sm">流暢語音模式、移動場景優化</p>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4">
                                <h5 className="text-white font-medium mb-2">☁️ 雲端同步</h5>
                                <p className="text-gray-300 text-sm">所有設備數據即時同步，無縫切換</p>
                              </div>
                            </div>
                          </div>
                        );
                        
                      default:
                        return (
                          <div className="text-center py-8">
                            <p className="text-gray-400">此章節的視覺卡片內容正在準備中...</p>
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
                      const prevThemeId = getThemeId(prevUnitId);
                      navigate(`/courses/chatgpt-complete-course/theme/${prevThemeId}/unit/${prevUnitId}`);
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
                    <span className="text-gray-300">當前主題</span>
                    <span className="text-white font-medium">
                      主題 {getThemeId(currentUnit.id)} / 2
                    </span>
                  </div>
                  
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
                  
                  <div className="text-xs text-gray-400 pt-2 border-t border-white/10">
                    {getThemeId(currentUnit.id) === 1 ? '第一章：解構 ChatGPT' : '第二章：初探門徑'}
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

              {/* 學習重點卡片 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-400" />
                  學習重點
                </h3>
                
                <div className="space-y-3">
                  {currentUnit.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quiz 卡片 - 在每個主題的最後一個單元顯示 */}
              {((getThemeId(currentUnit.id) === 1 && currentUnit.id === 5) || 
                (getThemeId(currentUnit.id) === 2 && currentUnit.id === 10)) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    章節測驗
                  </h3>
                  
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm">
                      恭喜完成{getThemeId(currentUnit.id) === 1 ? '第一章' : '第二章'}！
                      現在可以進行章節測驗來檢驗學習成果。
                    </p>
                    
                    <div className="space-y-2 text-xs text-gray-400">
                      <div>📊 題目數量：10題</div>
                      <div>⏱️ 測驗時間：15分鐘</div>
                      <div>🎯 及格分數：70%</div>
                    </div>
                    
                    <Button
                      onClick={handleNavigateQuiz}
                      className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      開始測驗
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 