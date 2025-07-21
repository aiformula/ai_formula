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
    },

    // 第三章：核心功能實戰 — 掌握日常互動技巧
    { 
      id: 11, 
      title: "3.1 多模態輸入：文字、檔案、圖片與語音指令", 
      duration: "28分鐘",
      transcript: `現代的 ChatGPT 已經超越了單純的文本聊天機器人，能夠理解和處理多種格式的輸入信息。

基礎文本輸入：這是最基本也是最常見的互動方式。您可以在底部的輸入框中，通過鍵盤輸入您的問題或指令。

文件上傳 (File Uploads)：這是一項強大的付費功能。您可以點擊輸入框旁的迴紋針圖標，上傳 PDF、Word 文檔、演示文稿、代碼文件或純文本文檔。上傳後，您可以要求 ChatGPT 根據文件內容進行總結、提取關鍵信息、回答相關問題，或將其作為後續對話的上下文。這對於快速消化長篇報告或研究論文極為高效。

圖像輸入 (Image Input)：同樣是付費功能，您可以上傳圖片、照片、圖表或螢幕截圖。ChatGPT 能夠「看懂」這些圖像，並執行多種任務，例如：描述圖片中的場景、識別並提取圖中的文字（OCR）、解釋數據圖表的含義，或者幫助您解讀複雜的視覺數據。

語音模式 (Voice Mode)：所有用戶均可在手機和桌面應用程式上使用此功能。點擊麥克風或聲波圖標，您就可以直接與 ChatGPT 進行實時的語音對話。它會將您的語音轉換為文本進行理解，然後以合成的、自然的語音形式回答您。您還可以在設置中選擇不同的聲音風格和性別，打造個性化的聽覺體驗。`,
      keyPoints: [
        "掌握四種主要輸入方式：文本、文件、圖像、語音",
        "了解付費功能與免費功能的區別",
        "學會利用文件上傳功能處理複雜文檔",
        "體驗多模態交互帶來的便利性"
      ]
    },
    { 
      id: 12, 
      title: "3.2 網頁瀏覽 (Search)：獲取即時資訊與來源引用", 
      duration: "25分鐘",
      transcript: `傳統的 LLM 因其訓練數據的時效性限制，存在「知識截止日期」（Knowledge Cutoff）的問題，無法回答關於近期事件的提問。網頁瀏覽功能正是為了解決這一核心痛點而生。

功能目的：使 ChatGPT 能夠實時訪問互聯網，檢索和整合最新的信息來回答用戶的提問。

啟用方式：對於付費版用戶，當您選擇 GPT-4o 等高級模型時，此功能通常是默認啟用的。在早期版本中，可能需要在「設定 (Settings)」的「Beta features」中手動開啟「Browse with Bing」選項。

運作機制：當您提出一個明顯需要即時資訊的問題時（例如「今天香港的頭條新聞是什麼？」或「NVIDIA 最新的股價是多少？」），ChatGPT 會自動觸發其內置的 Bing 搜索引擎。它會生成相關的搜索查詢詞，訪問搜索結果中的網頁，讀取並理解內容，最後綜合這些信息，生成一個全面的回答。

引用來源：為了保證透明度和可驗證性，ChatGPT 在其利用網絡信息生成的回答中，會附上數字形式的引用標記。用戶可以點擊這些標記，直接跳轉到它所參考的原始網頁，這對於進行嚴謹的事實核查至關重要。

適用場景：此功能非常適用於任何需要時效性的任務，包括但不限於：查詢時事新聞、研究最新的科技發展、獲取產品的市場價格和用戶評價、規劃旅行時查詢最新的航班和酒店信息等。`,
      keyPoints: [
        "理解知識截止日期問題及其解決方案",
        "掌握如何觸發和使用網頁瀏覽功能",
        "學會驗證AI引用的來源可靠性",
        "識別適合使用實時搜索的場景"
      ]
    },
    { 
      id: 13, 
      title: "3.3 數據分析 (Data Analysis)：上傳檔案、生成圖表與解讀數據", 
      duration: "32分鐘",
      transcript: `數據分析功能，其前身為「代碼解釋器」（Code Interpreter），這個名字精準地揭示了其強大能力的來源：在安全的環境中編寫並執行代碼。

啟用與使用：此功能為付費版專享。在主對話界面，點擊輸入框旁的迴紋針圖標即可上傳您的數據文件。它支持多種常見的結構化數據格式，包括 Excel 表格 (.xls,.xlsx)、逗號分隔值文件 (.csv)、JSON 文件，甚至可以從 PDF 中提取表格數據。

運作機制：當您上傳一個數據文件並提出分析請求時（例如「請分析這份銷售數據，並找出哪個產品類別的增長最快」），ChatGPT 會在一個隔離的、安全的沙盒（sandbox）環境中，自動編寫並執行 Python 代碼來完成您的任務。它主要利用強大的 pandas 庫進行數據處理和計算，並使用 matplotlib 庫來創建數據可視化圖表。

核心能力：
數據清理：能夠自動執行繁瑣的數據預處理工作，例如識別和修正數據格式的不一致、填補缺失值、或刪除重複記錄。

統計分析：可以執行從基礎到中階的統計分析，包括計算平均值、中位數、標準差等描述性統計量，甚至進行更複雜的回歸分析、T-檢驗等推斷性統計。

數據可視化：能夠根據數據的特性自動推薦並生成最合適的圖表，或者根據您的明確指令生成特定類型的圖表，如條形圖、折線圖、散點圖、餅圖和熱力圖等。

洞察提取：不僅僅是呈現數據和圖表，它還能用自然語言對分析結果進行解讀，總結數據中蘊含的趨勢、規律和異常點，並根據您的要求提出可行的建議。`,
      keyPoints: [
        "掌握數據文件上傳和格式要求",
        "了解Python沙盒環境的運作機制",
        "學會數據清理和統計分析的基本流程",
        "體驗自動化數據可視化和洞察提取"
      ]
    },
    { 
      id: 14, 
      title: "3.4 DALL·E 圖像生成與編輯：將文字化為視覺藝術", 
      duration: "30分鐘",
      transcript: `ChatGPT Plus 將 OpenAI 旗下著名的文本到圖像生成模型 DALL·E 無縫整合到了對話體驗中，讓用戶能夠僅憑語言就創造出豐富的視覺內容。

使用方法：操作極其簡單。您無需學習複雜的指令，只需在對話框中用自然、描述性的語言告訴 ChatGPT 您想看到的畫面即可。您的描述可以包括主題、物體、場景、風格（如「水彩畫風格」、「賽博朋克風格」、「梵高風格」）、構圖、色調、光線等細節。例如，您可以輸入：「請生成一張圖片，內容是一隻穿著宇航服的貓，漂浮在太空中，背景是土星環，風格為復古科幻海報。」

圖像編輯與迭代：DALL·E 的強大之處不僅在於生成，還在於修改。當第一版圖像生成後，您可以像與設計師溝通一樣，繼續通過對話提出修改意見。例如：「很好，但請把貓的頭盔換成玻璃魚缸的樣子」、「讓背景的星空更璀璨一些」，或者「生成一個橫版的構圖」。

適用場景：此功能極大地拓展了內容創作的可能性。您可以利用它為您的博客文章或演示文稿快速創作獨一無二的插圖，為新產品設計概念草圖和原型，為社交媒體帖子生成引人注目的視覺素材，或者純粹用於探索個人藝術創想。`,
      keyPoints: [
        "掌握有效的圖像描述技巧和語言",
        "學會迭代修改和優化生成的圖像",
        "了解不同藝術風格的描述方法",
        "探索圖像生成在各種場景下的應用"
      ]
    },
    { 
      id: 15, 
      title: "3.5 畫布 (Canvas) 與專案 (Projects)：高效整理與協作工作流程", 
      duration: "26分鐘",
      transcript: `「畫布」和「專案」這兩項功能的出現，標誌著 ChatGPT 的交互模式正在從簡單的「線性對話流」向更複雜、更強大的「非線性工作空間」轉變。

畫布 (Canvas)：這是一個專為協同寫作和編程設計的交互式工作空間。

核心優勢：傳統的對話模式中，若要修改 AI 生成的長文或代碼，往往需要重新生成整個輸出，效率低下。Canvas 徹底改變了這一點。它將 AI 的輸出呈現為一個可直接編輯的文檔。您可以高亮顯示其中的任何一個單詞、句子或段落，然後針對這部分內容下達精準的修改指令，例如「將這段話的語氣改得更正式一些」或「為這個函數添加註釋」。

使用方式：當您向 ChatGPT 提出一個明確的文檔創作請求時，例如「請幫我起草一份關於第二季度市場分析的報告」，它很有可能會自動在 Canvas 模式下呈現其輸出。

專案 (Projects)：這是一項面向付費版用戶的頂層組織功能，旨在解決管理複雜、長期任務時信息散亂的問題。

功能結構：您可以將一個「專案」理解為一個智能文件夾。在這個文件夾內，您可以整合多個相關的對話線程、所有上傳的背景文件（如研究報告、數據集），以及一套僅適用於此專案的特定自訂指令。

適用場景：當您需要圍繞一個宏大目標進行多方面工作時，專案功能就顯得尤為寶貴。您可以將所有相關的 ChatGPT 對話都歸集到同一個專案中，確保知識和上下文的連貫性，極大地提升了工作效率和條理性。`,
      keyPoints: [
        "理解從線性對話到非線性工作空間的轉變",
        "掌握Canvas的精準編輯和協作功能",
        "學會使用Projects進行長期項目管理",
        "體驗結構化工作流程的效率提升"
      ]
    },

    // 第四章：精通之道 — 高級提示工程
    { 
      id: 16, 
      title: "4.1 提示工程的核心原則：清晰、具體、提供上下文", 
      duration: "25分鐘",
      transcript: `無論使用何種高級技巧，所有有效的提示都建立在幾個基本原則之上。

清晰與具體 (Clarity and Specificity)：這是最重要的原則。您必須避免使用模糊、籠統或有歧義的語言。指令越明確、越具體，AI 就越能準確理解您的意圖。例如，一個無效的提示是「給我寫點關於車的東西」，而一個有效的提示則是「請為一款新型號的電動 SUV 撰寫一段 150 字的產品描述，重點突出其 500 公里的續航里程和豪華內飾」。

提供充足的上下文 (Context)：在提問時，盡量提供所有相關的背景信息。這包括您的最終目標、目標受眾的特徵（例如他們的知識水平、興趣點）、您所在的行業或領域，以及任何需要遵守的限制條件。上下文能幫助模型更好地校準其回答的風格、深度和側重點。

使用結構化提示：對於複雜的請求，將其分解成結構化的部分，可以極大地提高 AI 的理解準確性。您可以使用 Markdown 的標題和列表，或者使用類似 XML 的標籤來清晰地分隔提示的不同組成部分，引導模型按部就班地處理您的請求。

正面指令優於負面指令：心理學研究表明，給出肯定的指令（「做什麼」）通常比給出否定的禁令（「不要做什麼」）更容易被理解和執行。這一點對 AI 同樣適用。`,
      keyPoints: [
        "掌握清晰具體的提示設計原則",
        "學會提供充足有效的上下文信息",
        "運用結構化方式組織複雜提示",
        "理解正面指令與負面指令的差異"
      ]
    },
    { 
      id: 17, 
      title: "4.2 角色扮演 (Persona) 技巧：讓 AI 成為你的專屬顧問", 
      duration: "22分鐘",
      transcript: `角色扮演是一種極其強大且易於使用的提示技巧，它通過賦予 ChatGPT 一個特定的身份或專家角色，來精準地控制其輸出的語氣、風格、知識領域和視角。

概念：在提示的開頭，用一句話明確地為 ChatGPT 設定一個角色。這就像是為一場戲劇指定演員，演員一旦入戲，其言行舉止便會自然地符合角色設定。

指令結構：一個完整的角色扮演提示通常包含以下幾個要素：
- 角色 (Role)：您希望 AI 扮演誰？
- 任務 (Task)：您希望它做什麼？
- 語氣 (Tone)：您希望它用什麼樣的風格溝通？
- 目標受眾 (Audience)：它的回答是給誰看的？
- 限制/格式 (Constraints/Format)：有什麼特殊要求？

範例應用：
求職教練：「你現在是一位專門輔導大學畢業生進入科技行業的資深職業教練。請針對一個初級產品經理的職位，向我提出五個最常見的面試問題，並解釋每個問題背後的考察目的。」

營銷文案寫手：「請扮演一位頂級的廣告文案寫手，專長是為奢侈品撰寫富有情感和故事性的文案。現在，請為一款名為『時光』的瑞士手工腕錶，撰寫一則 30 秒的電視廣告腳本。」`,
      keyPoints: [
        "理解角色扮演在提示工程中的重要性",
        "掌握完整角色設定的五個核心要素",
        "學會為不同場景設計合適的專家角色",
        "體驗角色扮演對輸出質量的顯著影響"
      ]
    },
    { 
      id: 18, 
      title: "4.3 少樣本提示 (Few-Shot Prompting)：提供範例以引導輸出", 
      duration: "27分鐘",
      transcript: `當您需要 AI 嚴格按照特定的格式或風格進行輸出時，僅靠語言描述可能不夠精確。此時，提供具體範例的「少樣本提示」就成為了最佳選擇。

概念與類型：
零樣本 (Zero-shot)：不提供任何範例，僅給出指令。這是最基本的形式，適用於模型已經非常熟悉且無需特殊格式的簡單任務。

單樣本 (One-shot)：在指令中提供一個完整的「輸入-輸出」範例，為模型樹立一個清晰的模仿標杆。

少樣本 (Few-shot)：提供多個（通常是 2-5 個）範例。範例越多，模型對您期望的模式理解就越準確，尤其適用於需要嚴格格式或進行細微分類的複雜任務。

實際範例：
根據以下範例，從文本中提取產品名稱和主要功能。

範例1：
文本：「我們的全新產品 AquaPure 是一款智能淨水器，它可以有效過濾 99.9% 的細菌。」
產品名稱：AquaPure
主要功能：有效過濾 99.9% 的細菌

範例2：
文本：「隆重介紹 NovaDesk，這是一款可升降的智能辦公桌，能記住您的身高偏好。」
產品名稱：NovaDesk
主要功能：記住身高偏好

現在請處理：
文本：「體驗一下 ZenBuds Pro，這款降噪耳機讓您在喧囂中也能享受片刻寧靜。」

核心要點：研究表明，在少樣本提示中，範例的「格式一致性」其重要性甚至超過了範例中標籤本身的絕對準確性。即使您提供標籤隨機的範例，只要格式保持一致，模型依然能很好地學會任務的結構。`,
      keyPoints: [
        "區分零樣本、單樣本和少樣本提示的應用場景",
        "掌握設計有效範例的關鍵要素",
        "理解格式一致性的重要性",
        "學會根據任務複雜度選擇合適的樣本數量"
      ]
    },
    { 
      id: 19, 
      title: "4.4 思維鏈 (Chain-of-Thought, CoT) 提示：引導模型進行複雜推理", 
      duration: "24分鐘",
      transcript: `對於需要多個步驟才能解決的邏輯問題、數學應用題或複雜推理任務，思維鏈提示通過引導模型模仿人類「一步一步思考」的過程，來顯著提高其在複雜任務上的準確性。

概念：CoT 提示的核心思想是，不直接索要答案，而是要求模型在給出答案之前，先展示其詳細的、分步驟的推理過程。這個過程迫使模型將一個大問題分解成一系列更小、更容易處理的子問題，從而降低出錯的概率。

零樣本 CoT (Zero-shot CoT)：這是最簡單也最常用的 CoT 方法。您只需在您的問題後面，加上一句話：「請一步一步地思考」（Let's think step by step）。這句簡單的指令就能觸發模型採用更審慎的、分步驟的推理模式。

少樣本 CoT (Few-shot CoT)：對於更複雜的任務，您可以提供一個完整的問答範例，而這個範例本身就包含詳盡的推理步驟。然後，再提出您自己的問題，模型便會模仿範例中的推理方式來解決新問題。

範例應用：
標準提示：「一個架子上有 5 本書，從左到右是物理、化學、生物、數學、歷史。化學書在物理書和生物書之間。歷史書不在最右邊。數學書在歷史書的右邊。請問從左到右的順序是什麼？」

CoT 提示：「一個架子上有 5 本書...（問題同上）。請列出你的推理步驟，然後給出最終答案。」

這種方法特別適用於數學計算、邏輯推理、程序設計思路分析等需要嚴密思維的任務。`,
      keyPoints: [
        "理解思維鏈提示的核心機制和優勢",
        "掌握零樣本CoT的簡單觸發方法",
        "學會設計包含推理步驟的少樣本範例",
        "識別適合使用CoT技巧的任務類型"
      ]
    },
    { 
      id: 20, 
      title: "4.5 迭代與優化：如何根據回覆修正你的提問", 
      duration: "23分鐘",
      transcript: `沒有人能保證一次就寫出完美的提示。頂尖的提示工程師都深諳迭代優化的重要性。這是一個持續對話、評估和修正的循環過程。

迭代優化循環：
1. 提出初始提示：根據您的初步想法，構建並發送您的第一個提示。
2. 評估輸出結果：仔細審查 AI 的回覆。它是否準確？是否完整？格式和語氣是否符合您的要求？
3. 診斷問題所在：分析回覆不佳的原因。是您的指令太過籠統嗎？AI 是否誤解了某個關鍵詞？
4. 修正並完善提示：基於您的診斷，對原始提示進行修改。
5. 重複此過程：將修正後的提示再次發送給 AI，並重復上述評估和修正的步驟。

實用高級技巧：
要求自我批判：在 AI 給出回答後，您可以跟進一個指令，要求它對自己的回答進行批判性評估。例如：「請批判你剛才生成的這段文案。從說服力、清晰度和原創性三個角度，指出其不足之處，並提供修改建議。」

鏈式提示 (Prompt Chaining)：將一個複雜的大任務，分解為一系列連續的、更小的提示。每一步的輸出都可以作為下一步提示的輸入。例如：
第一步：「為我的新咖啡品牌 brainstorm 10 個名字。」
第二步：「從以上 10 個名字中，選出 3 個最適合年輕市場的，並解釋原因。」
第三步：「為你選出的第一個名字，設計一句廣告標語。」

這種協作式的提示工程方法，將使您從 AI 的「使用者」轉變為 AI 的「協作夥伴」，共同創造出更優質的結果。`,
      keyPoints: [
        "掌握系統性的迭代優化循環流程",
        "學會診斷和分析提示問題的根源",
        "運用自我批判技巧提升輸出質量",
        "體驗鏈式提示在複雜任務中的應用"
      ]
    },

    // 第五章：打造專屬 AI — 個人化與 GPT 商店
    { 
      id: 21, 
      title: "5.1 自訂指令 (Custom Instructions)：設定你的個人偏好與風格", 
      duration: "24分鐘",
      transcript: `自訂指令是實現個人化的第一步，也是最基礎的功能。它允許您設定一套全局性的規則和背景信息，讓 ChatGPT 在之後所有新的對話中都能自動記住並遵循。

設置入口：網頁版點擊介面左下角的您的用戶名，在彈出菜單中選擇「Settings」，然後進入「Personalization」標籤頁。手機 App 進入「Settings」，點擊「Personalization」即可找到相應選項。

兩個核心輸入框：該功能主要由兩個文本框組成，每個文本框有 1500 個字符的限制。

第一個框：「你想讓 ChatGPT 了解你的哪些信息，以便提供更好的回覆？」用途是輸入關於您個人的、相對固定的背景信息。例如：您可以輸入您的職業（「我是一名專注於數據可視化的產品經理」）、您的專業領域和技能（「我精通 Python 和 R 語言」）、您的目標（「我使用 ChatGPT 的主要目的是為了提高編程效率和學習新的數據分析技術」）。

第二個框：「你希望 ChatGPT 如何回覆？」用途是設定您對 AI 輸出格式、風格、語氣和行為的通用要求。例如：您可以要求特定的格式（「請始終使用 Markdown 格式化您的回答」）、語氣（「請以專業、簡潔的語氣回答」）、或行為準則（「在回答複雜問題時，請先列出您的思考步驟」）。

效果：一旦設定，這些指令將自動應用於所有新開啟的對話。例如，一個開發者設定了自己偏好 Go 語言，那麼當他請求代碼範例時，ChatGPT 會優先提供 Go 語言的版本。`,
      keyPoints: [
        "了解自訂指令的設置方法和入口",
        "掌握兩個輸入框的不同用途和填寫技巧",
        "學會設計有效的個人背景和偏好描述",
        "體驗全局設定對所有對話的影響"
      ]
    },
    { 
      id: 22, 
      title: "5.2 記憶 (Memory) 功能：讓 ChatGPT 記住你的重要資訊", 
      duration: "21分鐘",
      transcript: `如果說自訂指令是您為 AI 設定的「靜態出廠設置」，那麼記憶功能則是 AI 在與您互動過程中「動態學習」到的個人知識。

功能目的：讓 ChatGPT 能夠捕捉並記住您在對話過程中透露的具體事實和偏好，並在未來的對話中智能地應用這些信息，從而提供更具連續性和個人化的體驗。

與自訂指令的區別：自訂指令是全局的、高優先級的規則，對所有對話都產生強制性影響。而記憶則是上下文相關的、在對話中動態生成的。AI 會根據當前對話的內容，判斷是否需要調用某個記憶。例如，自訂指令可能是「我是一名醫生」，而記憶可能是「我上週告訴過你，我對心血管領域的研究特別感興趣」。

使用方式：
自動記憶：在對話中，ChatGPT 會嘗試自動識別並記住它認為重要的信息，例如您的項目名稱、家庭成員的飲食偏好等。

手動指令：您也可以明確地命令它記住某件事，例如：「請記住，我的公司品牌色是 #4A90E2」。

管理與控制：用戶對記憶有完全的控制權。您可以在「Settings」->「Personalization」->「Memory」中，隨時查看、編輯甚至刪除 AI 記住的任何一條信息。

當前限制：需要注意的是，記憶功能目前在自訂 GPTs 中尚不可用。`,
      keyPoints: [
        "理解記憶功能與自訂指令的本質區別",
        "掌握自動記憶和手動記憶的使用方法",
        "學會管理和控制AI記住的信息",
        "了解記憶功能的當前限制和適用範圍"
      ]
    },
    { 
      id: 23, 
      title: "5.3 創建你的第一個自訂 GPT (My GPTs)", 
      duration: "28分鐘",
      transcript: `自訂 GPTs 是個人化的終極形態。它讓付費版用戶無需任何編程知識，就能為特定的目的或任務，創建一個獨一無二、經過專門優化的 ChatGPT 版本。

創建入口：在 ChatGPT 主介面的左側邊欄點擊「Explore GPTs」，然後在頁面右上角點擊「+ Create」按鈕。

兩種創建模式：進入創建界面後，您會看到左右分屏的視圖，左邊是配置區，右邊是實時預覽區。

Create (對話式創建)：這是一種對新手極其友好的模式。您只需與一個名為「GPT Builder」的特殊聊天機器人進行對話，用自然語言告訴它您想創建一個什麼樣的 GPT。例如，您可以說：「我想創建一個能幫我把技術文章翻譯成通俗易懂的中文的助手」。GPT Builder 會通過一系列問題，引導您完成命名、生成圖標、設定行為準則等所有步驟。

Configure (手動配置)：這是一個更為直接和專業的模式。您可以在一個結構化的表單界面中，手動填寫和配置 GPT 的所有參數，包括名稱、描述、詳細指令等。對於有經驗的用戶來說，這種模式提供了更精準的控制。

創建流程：
1. 選擇創建模式
2. 定義GPT的用途和角色
3. 設計對話風格和個性
4. 配置知識庫和能力
5. 測試和優化
6. 發布或私人使用

這標誌著用戶從 AI 的「使用者」轉變為 AI 的「創造者」。`,
      keyPoints: [
        "掌握自訂GPT的創建入口和基本流程",
        "了解對話式創建和手動配置的差異",
        "學會定義GPT的用途、角色和個性",
        "體驗從AI使用者到創造者的轉變"
      ]
    },
    { 
      id: 24, 
      title: "5.4 GPT 知識庫與功能配置", 
      duration: "26分鐘",
      transcript: `在「Configure」標籤頁中，您可以對您的自訂 GPT 進行詳細的配置，這也是其強大之處所在。

名稱與描述：為您的 GPT 取一個能準確反映其功能的名稱和一段簡潔的描述，這將在 GPT 商店中展示給其他用戶。

指令 (Instructions)：這是自訂 GPT 的「大腦」和「靈魂」。您需要在此處輸入詳細的提示，定義它的角色、目標、行為規則、個性、回答風格以及應遵循的步驟。所有在第四章學到的高級提示工程技巧都可以在這裡應用。

對話啟動器 (Conversation starters)：您可以預設幾個問題按鈕，當用戶打開您的 GPT 時，這些按鈕會顯示在對話框上方，以引導他們快速開始互動。

知識庫 (Knowledge)：這是自訂 GPT 最具價值的核心功能之一。您可以點擊「Upload files」，上傳您自己的私有文件（如 PDF、TXT、DOCX 等，最多 20 個文件，單個文件最大 512MB）。這些文件將構成該 GPT 的專有知識庫。當您在指令中引導 GPT 從這些文件中尋找答案時，它就能提供基於您私有數據的、高度專業和準確的回覆。例如，您可以上傳公司所有的產品手冊，創建一個內部產品專家 GPT。

能力 (Capabilities)：您可以通過勾選框，來決定您的 GPT 是否需要額外的能力，包括：網頁瀏覽（Web Browsing）、DALL·E 圖像生成（Image Generation）或數據分析（Code Interpreter）。

操作 (Actions)：這是一項面向開發者的高級功能。通過配置第三方服務的 API，您可以讓您的 GPT 執行現實世界的操作，例如查詢實時天氣、預訂酒店、在您的日曆中創建事件或從您的公司數據庫中提取信息。`,
      keyPoints: [
        "掌握GPT配置的各個核心組件",
        "學會設計有效的指令和對話啟動器",
        "了解知識庫上傳和私有數據應用",
        "探索高級功能：能力配置和API操作"
      ]
    },
    { 
      id: 25, 
      title: "5.5 探索 GPT 商店：尋找與分享強大的自訂應用", 
      duration: "23分鐘",
      transcript: `GPT 商店（GPT Store）是 OpenAI 打造的一個生態平台，旨在讓用戶能夠發現、使用和分享由全球社區成員創建的優秀自訂 GPTs。

平台概覽：GPT 商店於 2024 年 1 月正式上線，並在同年 5 月向所有用戶（包括免費版和付費版）開放使用權限，儘管免費版用戶在使用時會受到 GPT-4o 的次數限制。

探索與使用：商店內設有官方精選推薦和社區排行榜，並將 GPTs 按照寫作、編程、生產力、教育、生活方式等多個類別進行了分類。您可以像逛手機應用商店一樣，通過搜索或瀏覽來找到滿足您特定需求的 GPT，並直接開始使用。例如，有可以幫您設計遊戲規則的「Game Time」，或幫您分析個人色彩以推薦服飾搭配的「Personal Color Analysis」。

分享與發布：如果您創建了一個自己非常滿意的 GPT，並希望與全世界分享，您需要完成兩個步驟：
1. 在保存您的 GPT 時，將分享設置選擇為「Public」（公開）。
2. 在您的 OpenAI 帳戶設置中，完成「Builder profile」（創建者個人資料）的驗證，您可以選擇驗證您的姓名或一個您擁有的網站。

盈利潛力：為了激勵創作者，OpenAI 已經開始測試一項基於 GPT 使用量的收入分成計劃。這意味著，如果您的 GPT 廣受歡迎，您將有機會從中獲得經濟回報，這為開發者和創意人士開闢了全新的盈利途徑。

社區生態：GPT 商店不僅是一個工具平台，更是一個創意社區。您可以從其他創作者的 GPT 中獲得靈感，學習最佳實踐，並與全球的 AI 愛好者交流經驗。`,
      keyPoints: [
        "了解GPT商店的發展歷程和生態結構",
        "掌握探索和使用社區GPT的方法",
        "學會發布和分享自己的GPT作品",
        "認識GPT經濟和創作者盈利機會"
      ]
    },

    // 第六章：展望未來 — 應用、倫理與挑戰
    { 
      id: 26, 
      title: "6.1 實際應用案例：內容創作、總結、翻譯與編程", 
      duration: "25分鐘",
      transcript: `ChatGPT 的通用性使其能夠滲透到日常工作和生活的方方面面，成為一個強大的效率倍增器。

內容創作：這是其最直觀的應用。它可以根據您的要求，起草各種類型的文本，從正式的商業郵件、詳細的博客文章，到吸引眼球的社交媒體帖子和富有創意的廣告文案。甚至，它還能創作詩歌、歌詞和劇本初稿。成功的關鍵在於提供清晰的目標受眾、期望的語氣和具體的格式要求。

文本總結：面對長篇累牘的文章、學術論文或冗長的會議記錄，ChatGPT 能夠在數秒內提取核心論點，生成簡潔的摘要。您可以指定總結的長度（例如「用 200 字總結」）或提取的要點數量（例如「列出 5 個關鍵要點」），極大地節省了閱讀和理解的時間。

語言翻譯：ChatGPT 是一個出色的多語言翻譯工具。與傳統的機器翻譯相比，它更擅長理解和處理上下文、文化習語和口語化表達，因此其譯文往往更加流暢和自然，減少了生硬的「機器翻譯腔」。

編程輔助：對於開發者而言，ChatGPT 是一個不知疲倦的編程夥伴。它可以根據自然語言描述生成特定功能的代碼片段（支持 Python, JavaScript, Ruby 等多種語言），解釋一段複雜的既有代碼的邏輯，幫助定位和修復程序中的錯誤（debugging），甚至可以將一種編程語言的代碼自動轉換為另一種語言。

頭腦風暴與創意發想：當您陷入創意枯竭時，ChatGPT 可以作為一個絕佳的「思維催化劑」。您可以讓它為新產品構思名字、為市場活動設計主題、或者針對一個棘手的問題提出五種不同的解決方案角度。`,
      keyPoints: [
        "掌握ChatGPT在各種內容創作場景的應用技巧",
        "學會高效使用文本總結和翻譯功能",
        "了解編程輔助的多種用途和限制",
        "體驗AI在創意激發和問題解決中的價值"
      ]
    },
    { 
      id: 27, 
      title: "6.2 模型的限制：理解「幻覺」與事實核查的重要性", 
      duration: "22分鐘",
      transcript: `儘管 ChatGPT 的能力令人驚嘆，但它的可靠性卻異常脆弱。理解其內在的限制，是安全、有效使用它的前提。

AI 幻覺 (Hallucination)：這是大型語言模型最核心、也是最危險的缺陷。所謂「幻覺」，是指模型會自信地生成一些聽起來非常權威、格式完美，但實際上完全錯誤或純屬憑空捏造的信息。它可能會編造統計數據、引用不存在的法律條文、或杜撰學術論文來支持其論點。據估計，聊天機器人產生幻覺的頻率高達 27%，其生成文本中含有事實錯誤的比例可達 46%。

幻覺的根源：這種現象的根本原因在於，LLM 的設計目標是基於其龐大的訓練數據，預測並生成「統計上最可能」的文本序列，而不是驗證和輸出「事實上最準確」的信息。它沒有真正的世界模型或常識推理能力。當其訓練數據中存在知識空白或面對它不確定的問題時，其內在機制傾向於「創造」一個流暢連貫的答案來「填補」這個空白。

事實核查的必要性：基於以上原因，一個核心的使用原則是：絕對不要盲目信任 ChatGPT 提供的任何未經驗證的事實性信息。所有涉及數據、日期、人名、事件、引用的內容，都必須通過權威的、獨立的來源進行交叉核查。

其他限制：模型還常常表現出過於冗長和重複的傾向，例如反覆重申「作為一個由 OpenAI 訓練的語言模型...」。這主要源於訓練數據中的偏見以及模型優化過程中的一些技術問題。

這種「能力的強大」與「可靠性的脆弱」之間的巨大鴻溝，構成了使用 ChatGPT 的核心矛盾。一個高級用戶的標誌，不在於驚嘆其能力，而在於深刻理解其不可靠性。`,
      keyPoints: [
        "深入理解AI幻覺現象的本質和危害",
        "掌握識別和驗證AI輸出真實性的方法",
        "建立批判性思維和事實核查的習慣",
        "認識模型能力與可靠性之間的核心矛盾"
      ]
    },
    { 
      id: 28, 
      title: "6.3 倫理考量：數據偏見與社會影響", 
      duration: "24分鐘",
      transcript: `作為一個在充滿人類社會偏見的數據上訓練出來的模型，ChatGPT 不可避免地會學習並放大這些偏見，帶來一系列深刻的倫理挑戰。

偏見的來源與表現：LLM 的偏見根植於其訓練數據——即海量的互聯網文本，其中充斥著關於性別、種族、年齡、政治立場等方面的刻板印象和歧視性言論。研究發現，模型在被要求為相同資歷的男女員工建議薪酬時，可能會給予女性更低的建議；在描述不同種族時，可能會不自覺地使用刻板印象化的語言；在被問及敏感的政治議題時，也可能表現出特定的政治傾向。

社會層面的影響：
錯誤信息與信息繭房：如果被惡意使用，ChatGPT 可能成為製造和傳播虛假信息、政治宣傳的強大工具。更微妙的風險在於，它可能加劇「回音室效應」：由 AI 生成的、未經核實的內容被大量發布到網絡上，這些內容反過來又可能被下一代 AI 模型作為「事實」來學習。

學術與職業誠信：學生和研究人員使用 ChatGPT 來完成作業、撰寫論文，引發了全球教育界對學術抄襲和誠信問題的廣泛擔憂。雖然有工具試圖檢測 AI 生成的文本，但其準確性仍有待提高。

勞工倫理問題：為了讓模型學會識別和過濾有害內容，OpenAI 等公司雇傭了大量的數據標註員。據報導，其中一些標註員（例如在肯尼亞的「數字民工」）時薪極低，卻需要長時間暴露在暴力、色情和仇恨言論等極端負面的信息中。

社會責任：作為 AI 用戶，我們每個人都有責任負責任地使用這些技術，避免放大偏見，並積極推動更公平、更包容的 AI 發展。`,
      keyPoints: [
        "認識AI模型中偏見的來源和表現形式",
        "了解AI對信息環境和學術誠信的影響",
        "關注AI產業鏈中的勞工權益問題",
        "建立負責任的AI使用意識和社會責任感"
      ]
    },
    { 
      id: 29, 
      title: "6.4 數據隱私：你的對話如何被使用與保護", 
      duration: "21分鐘",
      transcript: `將個人或公司信息輸入 ChatGPT，其背後的數據隱私問題是每個用戶都必須關注的。

收集的數據類型：OpenAI 會收集您的帳戶信息、您輸入的提示和上傳的文件（統稱為「內容」），以及您的使用數據，如您使用的功能、訪問時間、設備類型等。

數據的主要用途：這些數據主要用於提供和維護服務、響應您的請求、進行研究以開發新功能、以及防止服務被濫用。

關於模型訓練的政策：
對於商業用戶（API 和 ChatGPT Enterprise/Team），OpenAI 承諾，默認情況下不會使用您的業務數據來訓練其模型。這是其商業產品的核心隱私保障。

對於個人用戶（免費版和 Plus 版），您的對話內容可能會被用於模型訓練。但是，OpenAI 提供了選擇退出（opt-out）的權利。您可以在帳戶的「Data controls」設置中關閉「Chat history & training」選項。

數據保留與刪除：您可以隨時刪除您的對話歷史。已刪除的對話會在 30 天內從 OpenAI 的系統中永久移除（除非法律要求保留）。此外，使用「臨時對話」（Temporary Chat）功能，對話內容不會被保存。

用戶所有權：根據 OpenAI 的服務條款，在法律允許的範圍內，用戶擁有其輸入的內容以及由模型生成的輸出內容的所有權。

安全建議：儘管 OpenAI 採取了商業上合理的安全措施，但任何網絡傳輸都無法保證絕對安全。因此，強烈建議用戶避免在 ChatGPT 中輸入任何高度敏感的信息，例如個人身份證件號碼、詳細的醫療記錄、銀行賬戶信息或公司的核心商業機密。`,
      keyPoints: [
        "了解OpenAI收集和使用數據的完整政策",
        "掌握保護個人隱私的設置和選項",
        "區分商業用戶和個人用戶的隱私保障",
        "建立謹慎的信息輸入習慣和安全意識"
      ]
    },
    { 
      id: 30, 
      title: "6.5 LLM 的未來：多模態、個人化與 AI 代理的發展", 
      duration: "27分鐘",
      transcript: `大型語言模型正處於一個飛速發展的階段，其未來演進將圍繞幾個關鍵方向展開。

深度多模態集成 (Deep Multimodality)：未來的模型將不再僅僅是文本處理器，而是能夠原生、流暢地理解、推理和生成包括文本、圖像、音訊、影片在內的多種信息模態。GPT-4o 已經展示了這一趨勢的開端，未來的模型將能夠進行更複雜的跨模態交互，例如觀看一段影片並為其撰寫摘要和配樂。

更強的推理能力：當前 LLM 的「推理」更多是基於模式匹配的類比推理。未來的模型（如傳聞中的 GPT-5 或 OpenAI 的 o1 模型）將致力於整合更嚴謹的邏輯推理和規劃能力。這將使其能夠更可靠地解決複雜的、需要多步思考的科學、數學和編程問題，從而減少「幻覺」的發生。

極致個人化與領域專業化：隨著技術的成熟和成本的降低，用戶將能更輕鬆地使用自己的數據對模型進行微調或定製，創造出高度個人化的 AI 助手，它不僅了解您的知識背景，甚至能模仿您的寫作風格。同時，針對特定行業（如醫療、法律、金融）的專業 LLM 將會更加普及和精準。

AI 代理的興起 (Agentic AI)：這是 LLM 發展最令人興奮的方向之一。未來的 AI 將從一個被動的「問答機器」進化為一個主動的「任務執行者」。一個 AI 代理將能夠理解一個複雜的、高層次的目標，然後自主地將其分解為一系列子任務，並調用各種工具來一步步完成整個目標。

開源與閉源生態的競爭與共榮：以 OpenAI 和 Google 為代表的閉源模型，與以 Meta 的 Llama 系列和 Mistral AI 為代表的開源模型之間的競爭將持續加劇。這將共同推動整個 AI 生態系統的創新和繁榮。`,
      keyPoints: [
        "展望多模態AI的發展趨勢和應用前景",
        "理解AI推理能力和個人化的技術演進",
        "認識AI代理概念和未來的自主執行能力",
        "了解開源與閉源AI生態的競爭格局"
      ]
    }
  ];

  // 計算主題ID - 移到前面
  const getThemeId = (unitNumber: number) => {
    if (unitNumber >= 1 && unitNumber <= 5) return 1;   // 第一章：解構 ChatGPT
    if (unitNumber >= 6 && unitNumber <= 10) return 2;  // 第二章：初探門徑
    if (unitNumber >= 11 && unitNumber <= 15) return 3; // 第三章：核心功能實戰
    if (unitNumber >= 16 && unitNumber <= 20) return 4; // 第四章：精通之道
    if (unitNumber >= 21 && unitNumber <= 25) return 5; // 第五章：打造專屬 AI
    if (unitNumber >= 26 && unitNumber <= 30) return 6; // 第六章：展望未來
    return 1; // 默認第一章
  };

  // 當前單元 - 簡化版本（路由驗證已在App.tsx處理）
  const currentUnit = useMemo(() => {
    const unitNum = parseInt(unitId || '1');
    const unitIndex = unitNum - 1;
    return unitsData[unitIndex];
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
                  onClick={() => {
                    // 檢查是否為章節最後一個單元（5, 10, 15, 20, 25, 30）
                    const isLastUnitOfTheme = [5, 10, 15, 20, 25, 30].includes(currentUnit.id);
                    
                    if (isLastUnitOfTheme) {
                      // 章節最後單元，導航到Quiz
                      handleNavigateQuiz();
                    } else {
                      // 正常導航到下一單元
                      handleNextUnit();
                    }
                  }}
                  className={
                    // 章節最後單元使用黃色漸變，其他使用藍紫漸變
                    [5, 10, 15, 20, 25, 30].includes(currentUnit.id)
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  }
                >
                  {(() => {
                    // 決定按鈕文字
                    const isLastUnitOfTheme = [5, 10, 15, 20, 25, 30].includes(currentUnit.id);
                    
                    if (isLastUnitOfTheme) {
                      return '開始測驗';
                    } else if (currentUnit.id >= unitsData.length) {
                      return '完成課程';
                    } else {
                      return '下一單元';
                    }
                  })()}
                  
                  {/* 圖標根據按鈕類型變化 */}
                  {[5, 10, 15, 20, 25, 30].includes(currentUnit.id) ? (
                    <svg className="h-4 w-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <ArrowRight className="h-4 w-4 ml-2" />
                  )}
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


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 