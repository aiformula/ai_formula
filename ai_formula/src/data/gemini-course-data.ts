/**
 * Gemini 權威大師班：從入門到精通的全方位指南
 * @description Gemini mastery course data (ZH + basic EN)
 */

import { CourseData } from '@/components/course-template/types';

export const geminiCourseData: CourseData = {
  courseInfo: {
    badge: 'NEW',
    badgeEn: 'NEW',
    title: 'Gemini 權威大師班：從入門到精通的全方位指南',
    titleEn: 'Gemini Mastery: From Fundamentals to Expert',
    subtitle: '原生多模態、產品生態、操作介面、提示工程與負責任使用的完整路線',
    subtitleEn: 'Natively multimodal, product ecosystem, UI, prompting, and responsible use',
    description: '系統學習 Google Gemini：從誕生與使命、核心技術到產品生態與操作，並以提示工程與倫理實務收結。',
    descriptionEn: 'Systematic learning of Google Gemini: origins/mission, core tech, product ecosystem and UI, plus prompting and responsible AI.',
    instructor: 'AI Formula Team',
    instructorEn: 'AI Formula Team',
    instructorTitle: 'AI Automation & Education',
    instructorTitleEn: 'AI Automation & Education',
    rating: 4.9,
    students: 5000,
    duration: '6+ 小時',
    durationEn: '6+ Hours',
    level: 'beginner_to_advanced',
    levelEn: 'Beginner to Advanced',
    totalLessons: 6,
    totalHours: 6,
    language: 'zh-HK',
    tags: ['Gemini', 'Google', 'DeepMind', 'Multimodal', 'Prompt Engineering'],
    tagsEn: ['Gemini', 'Google', 'DeepMind', 'Multimodal', 'Prompt Engineering']
  },
  courseStats: {
    totalHours: 6,
    totalLessons: 6,
    totalQuizzes: 6,
    completionRate: 95
  },
  targetAudience: [
    '希望快速掌握 Gemini 的初學者',
    '需要在工作中應用 Gemini 的專業人士',
    '內容創作者、學生與研究人員',
    '對多模態與企業應用有興趣的開發者'
  ],
  targetAudienceEn: [
    'Beginners seeking quick Gemini mastery',
    'Professionals applying Gemini at work',
    'Creators, students and researchers',
    'Developers interested in multimodal and enterprise use'
  ],
  courseModules: [
    {
      id: 1,
      title: '第一章：初探 Gemini — 重新認識 Google AI',
      titleEn: 'Chapter 1: Meet Gemini — Rethinking Google AI',
      description: '從 Bard 演進到 Gemini 的誕生與使命，理解其原生多模態的核心價值。',
      descriptionEn: 'From Bard to Gemini: origins, mission and the value of native multimodality.',
      duration: '45 分鐘',
      durationEn: '45 Minutes',
      lessons: [
        {
          id: 1,
          title: '1.1 什麼是 Gemini？不只是一個聊天機械人',
          titleEn: '1.1 What is Gemini? More than a chatbot',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'text',
          description: '釐清 Gemini 的本質：原生多模態的大型模型家族，而非單一產品。',
          descriptionEn: 'Clarify Gemini’s essence: a natively multimodal model family, not a single app.',
          image: '',
          imageAlt: 'Gemini 誕生',
          imageAltEn: 'Gemini origins',
          transcript: `本入門章節將為整個課程奠定基礎，清晰定義 Google Gemini 的本質，並闡述其在人工智能領域的革命性意義。我們將追溯其從前身 Bard 演變而來的歷史，並深入探討使其成為一項突破性技術的核心理念——「原生多模態」。

許多使用者初次接觸 Gemini，可能會將其視為一個網頁應用程式或聊天機械人，但這僅是冰山一角。從根本上說，Gemini 並非單一產品，而是由 Google 旗下頂尖 AI 研究機構 DeepMind 開發的一整個強大、底層的大型語言模型（Large Language Models, LLMs）家族。這個模型家族從一開始就被設計成一個多模態（multimodal）AI 平台，天生就能夠理解、操作並結合多種類型的資訊，包括文字、圖像、音訊、影片和程式碼。

因此，當使用者在 gemini.google.com 網站上互動時，他們所使用的是一個由 Gemini 模型家族中某個成員驅動的應用程式。這個應用程式的設計宗旨是成為一個多功能的 AI 助理，協助使用者完成寫作、策劃、學習等各式各樣的任務。Gemini 的真正威力在於其底層模型的強大能力，而非僅僅是其聊天介面。`,
          transcriptEn: `This foundational lesson establishes the groundwork for the entire course by clearly defining the true nature of Google Gemini and explaining its revolutionary significance in the field of artificial intelligence. We'll trace its evolution from its predecessor Bard and explore the core philosophy that makes it a breakthrough technology: "native multimodality".

Many users first encountering Gemini might view it as a web application or chatbot, but this is merely the tip of the iceberg. Fundamentally, Gemini is not a single product but an entire powerful, foundational family of Large Language Models (LLMs) developed by Google's premier AI research institution, DeepMind. This model family was designed from the ground up as a multimodal AI platform, inherently capable of understanding, manipulating, and combining multiple types of information including text, images, audio, video, and code.

Therefore, when users interact on the gemini.google.com website, they're using an application powered by one of the members of the Gemini model family. This application is designed to serve as a versatile AI assistant, helping users complete various tasks such as writing, planning, and learning. Gemini's true power lies in the robust capabilities of its underlying models, not merely its chat interface.`,
          keyPoints: ['大型模型家族', '原生多模態設計', 'DeepMind 開發', '革命性意義'],
          keyPointsEn: ['Large model family', 'Native multimodal design', 'DeepMind development', 'Revolutionary significance'],
          completed: false
        },
        {
          id: 2,
          title: '1.2 從 Bard 到 Gemini：一段演進史',
          titleEn: '1.2 From Bard to Gemini',
          duration: '12 分鐘',
          durationEn: '12 Minutes',
          type: 'text',
          description: '品牌與技術的雙重更迭：Bard 更名、Gemini 1.0 原生多模態。',
          descriptionEn: 'Brand and technical shift: Bard rename; Gemini 1.0 native multimodality.',
          image: '',
          imageAlt: 'Bard → Gemini',
          imageAltEn: 'Bard → Gemini',
          transcript: `要理解 Gemini 的重要性，必須回顧其發展歷程。Gemini 的前身是一個名為 Bard 的 Google AI 產品。Bard 最初是作為一個以文字為主的對話式 AI 推出的，旨在與市場上的其他聊天機械人競爭。然而，在 2023 年底，Google 宣佈了一項重大變革：Bard 被全新的 Gemini 模型系列所取代，並且整個產品品牌也統一更名為 Gemini。

這次轉變遠不止是簡單的品牌重塑，它標誌著一場深刻的技術革新和戰略轉向。Bard 主要處理文字輸入，而全新的 Gemini 1.0 系列則以其原生多模態架構登場，象徵著 Google 的 AI 策略從一個單一的聊天工具，正式邁向一個能夠處理全方位資訊的綜合性 AI 平台。市場對 AI 的期望已從純文字對話擴展至理解圖像、影片等多種媒介；Google 的回應不是為 Bard 加圖像功能，而是從根本上推出一個為多模態而生的新模型家族。`,
          transcriptEn: `To understand Gemini's significance, we must review its development history. Gemini's predecessor was a Google AI product called Bard. Bard was initially launched as a primarily text-based conversational AI, designed to compete with other chatbots in the market. However, in late 2023, Google announced a major transformation: Bard was replaced by the entirely new Gemini model series, and the entire product brand was unified under the Gemini name.

This transformation was far more than simple rebranding—it marked a profound technological innovation and strategic shift. While Bard primarily handled text input, the new Gemini 1.0 series debuted with its native multimodal architecture, symbolising Google's AI strategy evolving from a single chat tool to a comprehensive AI platform capable of processing all types of information. Market expectations for AI had expanded from pure text conversation to understanding images, videos, and other media; Google's response wasn't to add image functionality to Bard, but to fundamentally launch a new model family designed for multimodality from the ground up.`,
          keyPoints: ['品牌重塑', '技術革新', '戰略轉向', '綜合性平台'],
          keyPointsEn: ['Brand transformation', 'Technical innovation', 'Strategic shift', 'Comprehensive platform'],
          completed: false
        },
        {
          id: 3,
          title: '1.3 核心理念：原生多模態',
          titleEn: '1.3 Core Idea: Natively Multimodal',
          duration: '10 分鐘',
          durationEn: '10 Minutes',
          type: 'text',
          description: '與「拼接式」設計對比；跨格式推理的優勢。',
          descriptionEn: 'Contrast with stitched approaches; advantages of cross‑modal reasoning.',
          image: '',
          imageAlt: '原生多模態',
          imageAltEn: 'Native multimodality',
          transcript: `Gemini 最關鍵的區別在於其「原生多模態」（natively multimodal）的設計哲學。早期的多模態 AI 模型通常採用「拼接」的方式，將獨立訓練的文字模型、圖像模型等不同模塊組合起來。這種方法雖然可行，但在不同資訊類型之間進行深度推理時常常會遇到瓶頸。

相比之下，Gemini 從一開始就被設計成一個統一的模型，能夠無縫地跨越不同數據類型進行推理。這種架構使其能夠實現流暢、具備情境感知能力的跨格式互動，而不是在孤立、單一模式的任務中切換。舉例：分析一段影片時，Gemini 能同時理解視覺畫面、轉錄音訊內容，並將兩者關聯起來回答複雜問題，例如「在 5:30 講者提到第四季財報時，圖表上顯示的數字是多少？」這正是其強大之處的核心。`,
          transcriptEn: `Gemini's most crucial distinction lies in its "natively multimodal" design philosophy. Early multimodal AI models typically used a "stitching" approach, combining independently trained text models, image models, and other different modules. While this method was workable, it often encountered bottlenecks when performing deep reasoning between different information types.

In contrast, Gemini was designed from the beginning as a unified model capable of seamlessly reasoning across different data types. This architecture enables it to achieve fluid, context-aware cross-format interactions rather than switching between isolated, single-mode tasks. For example: when analysing a video, Gemini can simultaneously understand visual frames and transcribe audio content, then correlate both to answer complex questions like "At 5:30 when the speaker mentioned Q4 financial results, what number was displayed on the chart?" This is the core of its powerful capabilities.`,
          keyPoints: ['原生多模態', '統一訓練', '深度推理', '跨模態理解'],
          keyPointsEn: ['Native multimodal', 'Unified training', 'Deep reasoning', 'Cross-modal understanding'],
          completed: false
        },
        {
          id: 4,
          title: '1.4 生態系統概覽：從日常到企業',
          titleEn: '1.4 Ecosystem Overview',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: 'Consumer / Workspace / AI Studio / Vertex AI / On‑device Nano。',
          descriptionEn: 'Consumer, Workspace, AI Studio, Vertex AI, on‑device Nano.',
          image: '',
          imageAlt: '生態系統',
          imageAltEn: 'Ecosystem',
          transcript: `Google 的策略是將 Gemini 的能力滲透到其生態系統的每一個角落，形成由日常到企業、由雲端到裝置端的完整佈局：

- 消費者日常應用（Consumer Access）：透過 gemini.google.com 網頁版與手機 App，處理查詢、寫作、創意發想等任務。
- 生產力工具整合（Productivity Integration）：深度嵌入 Google Workspace（Gmail/Docs/Sheets），協助撰寫郵件、起草文件與分析數據。
- 開發者快速原型（Developer Prototyping）：在 Google AI Studio 快速試驗 Gemini API，無需複雜設定。
- 企業級解決方案（Enterprise Solutions）：Google Cloud 的 Vertex AI 提供治理、安全與整合，支援生產級落地。
- 裝置端 AI（On‑Device AI）：Gemini Nano 可於手機等終端裝置原生運行，離線完成智慧回覆、錄音摘要等，兼顧效率與私隱。`,
          transcriptEn: `Google's strategy is to permeate Gemini's capabilities into every corner of its ecosystem, forming a complete deployment from daily consumer use to enterprise applications, from cloud to device-edge:

- Consumer Daily Applications: Through the gemini.google.com web version and mobile apps, handling queries, writing, creative brainstorming, and other tasks.
- Productivity Tool Integration: Deeply embedded in Google Workspace (Gmail/Docs/Sheets), assisting with email composition, document drafting, and data analysis.
- Developer Rapid Prototyping: Quickly experiment with Gemini API in Google AI Studio without complex setup.
- Enterprise Solutions: Google Cloud's Vertex AI provides governance, security, and integration, supporting production-level deployment.
- On-Device AI: Gemini Nano can run natively on mobile devices and other terminals, completing smart replies, recording summaries offline while balancing efficiency and privacy.`,
          keyPoints: ['消費者應用', 'Workspace 整合', 'AI Studio', 'Vertex AI', '端側 Nano'],
          keyPointsEn: ['Consumer applications', 'Workspace integration', 'AI Studio', 'Vertex AI', 'On-device Nano'],
          completed: false
        }
      ],
      quiz: {
        title: '第一章測驗：Gemini 的誕生與使命',
        titleEn: 'Chapter 1 Quiz: Origins & Mission',
        timeLimit: 15,
        passingScore: 60,
        questions: [
          { id: 1, question: 'Google 推出 Gemini 的主要目的是什麼？', questionEn: 'Primary purpose of Gemini?', type: 'single', options: ['取代搜尋引擎','更強大且通用的多模態模型','遊戲專用 AI','內部工具'], optionsEn: ['Replace Search','More powerful, general multimodal model','Game‑only AI','Internal tool'], correctAnswer: 1, explanation: 'Gemini 旨在成為通用的原生多模態 AI。', explanationEn: 'A powerful, general multimodal AI.' },
          { id: 2, question: 'Gemini 取代了哪個對話式 AI 服務？', questionEn: 'Gemini replaced which service?', type: 'single', options: ['Google Assistant','LaMDA','Bard','DeepMind'], optionsEn: ['Assistant','LaMDA','Bard','DeepMind'], correctAnswer: 2, explanation: 'Bard 被更名並由 Gemini 模型驅動。', explanationEn: 'Bard was renamed and powered by Gemini.' },
          { id: 3, question: '「多模態」是指什麼？', questionEn: 'What does “multimodal” mean?', type: 'single', options: ['多語言','多任務','能理解文字/圖片/聲音等多種資訊','多種性格'], optionsEn: ['Many languages','Many tasks','Understands text/images/audio, etc.','Many personas'], correctAnswer: 2, explanation: '能原生理解並整合不同資訊類型。', explanationEn: 'Understanding and combining different information types.' },
          { id: 4, question: 'Gemini 由哪兩個團隊合作開發？', questionEn: 'Which two teams developed Gemini?', type: 'single', options: ['Search 與 Chrome','Google Brain 與 DeepMind','Waymo 與 Verily','Android 與 Cloud'], optionsEn: ['Search & Chrome','Brain & DeepMind','Waymo & Verily','Android & Cloud'], correctAnswer: 1, explanation: 'Google Brain 與 DeepMind 的合作結晶。', explanationEn: 'A collaboration between Google Brain and DeepMind.' },
          { id: 5, question: '使命「Be helpful for everyone」強調什麼？', questionEn: '“Be helpful for everyone” emphasizes?', type: 'single', options: ['只為付費','技術複雜性','普惠/實用/責任','基準第一'], optionsEn: ['Paid only','Max complexity','Inclusiveness/practicality/responsibility','Benchmarks #1'], correctAnswer: 2, explanation: '普惠、實用與責任的核心價值。', explanationEn: 'Inclusiveness, practicality and responsibility.' }
        ]
      }
    },
    {
      id: 2,
      title: '第二章：Gemini 的核心技術深度解析',
      titleEn: 'Chapter 2: Core Technical Deep Dive',
      description: '模型家族（Ultra/Pro/Nano/Flash）、原生多模態與推理能力。',
      descriptionEn: 'Model family (Ultra/Pro/Nano/Flash), native multimodality and reasoning.',
      duration: '45 分鐘',
      durationEn: '45 Minutes',
      lessons: [
        {
          id: 1,
          title: '2.1 性能王者：Gemini Ultra',
          titleEn: '2.1 Ultra: Flagship Performance',
          duration: '10 分鐘',
          durationEn: '10 Minutes',
          type: 'text',
          description: '最強推理與研究能力；Gemini Advanced 核心引擎。',
          descriptionEn: 'Top reasoning/research; engine of Gemini Advanced.',
          image: '',
          imageAlt: 'Ultra',
          imageAltEn: 'Ultra',
          transcript: `Gemini Ultra 被定位為 Gemini 家族中最強大、規模最大的模型，專為處理高度複雜和專業的任務而設計。它是 Google 頂尖 AI 技術的結晶，代表著當前能力的巔峰。

在一系列行業標準的學術基準測試中（如 MMLU），Gemini Ultra 的表現都名列前茅，能夠理解和處理文字、圖像、音訊、影片和程式碼中極其細微和複雜的資訊。它擅長進行深入的邏輯推理、多步驟的複雜指令執行，以及高質量的創意生成。

目標用戶主要面向需要最強 AI 能力的專業人士、研究人員和付費高端用戶。它是付費訂閱服務「Gemini Advanced」背後的核心引擎，為用戶提供最高級別的 AI 能力。適用於複雜科學研究、深度邏輯推理、高級創意生成、多模態分析等場景。`,
          transcriptEn: `Gemini Ultra represents Google's flagship AI model, positioned as the most powerful member of the Gemini family. It's designed to handle the most complex reasoning tasks and advanced research scenarios.

Ultra excels in academic benchmark tests (such as MMLU), demonstrating top-tier performance in understanding and processing extremely nuanced and complex information across text, images, audio, video, and code. It excels at deep logical reasoning, multi-step complex instruction execution, and high-quality creative generation.

The target users are primarily professionals, researchers, and premium paying users who need the strongest AI capabilities. It serves as the core engine behind the paid subscription service "Gemini Advanced", providing users with the highest level of AI capabilities. It's suitable for complex scientific research, deep logical reasoning, advanced creative generation, multimodal analysis, and similar scenarios.`,
          keyPoints: ['旗艦級定位', 'MMLU 基準領先', '複雜推理能力', 'Gemini Advanced', '專業研究'],
          keyPointsEn: ['Flagship positioning', 'MMLU benchmark leader', 'Complex reasoning capability', 'Gemini Advanced', 'Professional research'],
          completed: false
        },
        {
          id: 2,
          title: '2.2 全能主力：Gemini Pro',
          titleEn: '2.2 Pro: General‑purpose Workhorse',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '免費版與多服務主力；頭腦風暴、摘要、翻譯與輕量編程。',
          descriptionEn: 'Backbone for free app/services; brainstorming, summaries, translation, light coding.',
          image: '',
          imageAlt: 'Pro',
          imageAltEn: 'Pro',
          transcript: `Gemini Pro 是一款在性能和成本效益之間取得完美平衡的通用模型，被譽為「可擴展各種任務的最佳模型」。它如同一個多才多藝的「工作主力」，旨在滿足絕大多數用戶的日常需求。

Gemini Pro 針對頭腦風暴、內容摘要、日常寫作、翻譯和簡單編程等任務進行了優化，其能力顯著超越了前一代的 AI 模型（如 LaMDA）。它的響應速度快，效果可靠。

目標用戶為廣大普通消費者和開發者。它是免費版 Gemini 網頁應用程式和眾多 Google 內部服務（包括 Workspace 的部分功能）的動力來源。開發者也可以透過 API 調用 Gemini Pro 來構建自己的應用。`,
          transcriptEn: `Gemini Pro is a versatile model that achieves perfect balance between performance and cost-effectiveness, earning the reputation as "the best model for scaling various tasks". It serves as a multi-talented "workhorse" designed to meet the daily needs of the vast majority of users.

Gemini Pro is optimised for brainstorming, content summarisation, daily writing, translation, and simple programming tasks. Its capabilities significantly exceed previous-generation AI models (such as LaMDA). It responds quickly and reliably.

The target users are general consumers and developers. It powers the free Gemini web application and numerous Google internal services (including parts of Workspace functionality). Developers can also call Gemini Pro via API to build their own applications.`,
          keyPoints: ['平衡性能', '通用性強', '免費版主力', 'Workspace 整合', 'API 可用'],
          keyPointsEn: ['Balanced performance', 'Strong versatility', 'Free version backbone', 'Workspace integration', 'API available'],
          completed: false
        },
        {
          id: 3,
          title: '2.3 輕巧高效：Gemini Nano（裝置端）',
          titleEn: '2.3 Nano: On‑Device Efficiency',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '端側私隱與效率；Nano‑1 / Nano‑2 差異。',
          descriptionEn: 'On‑device privacy/efficiency; Nano‑1 vs Nano‑2.',
          image: '',
          imageAlt: 'Nano',
          imageAltEn: 'Nano',
          transcript: `Gemini Nano 是家族中體積最細、效率最高的模型，專為在裝置上原生和離線運行而設計，特別是在 Android 手機（如 Google Pixel 系列）上。

它犧牲了部分複雜性以換取極致的效率和低功耗。它有兩個變體：Nano-1（1.8B 參數）適用於低記憶體裝置，而 Nano-2（3.25B 參數）則針對高記憶體裝置。其主要應用場景是那些對速度和私隱要求極高的端側 AI 功能。

目標用戶為手機等智能裝置的終端用戶，以及裝置製造商。應用包括 Gboard 鍵盤的智慧回覆（Smart Reply）、通話錄音的即時摘要等。這些任務無需將你的個人數據發送到雲端伺服器即可完成，極大地保障了用戶私隱。`,
          transcriptEn: `Gemini Nano is Google's lightweight, efficient on-device AI model designed specifically for mobile devices and edge computing scenarios. It represents Google's commitment to bringing AI capabilities directly to user devices while maintaining privacy and efficiency.

It sacrifices some complexity in exchange for ultimate efficiency and low power consumption. It has two variants: Nano-1 (1.8B parameters) suitable for low-memory devices, and Nano-2 (3.25B parameters) targeting high-memory devices. Its primary application scenarios are edge AI functions that require extremely high speed and privacy.

Target users are end users of smart devices like mobile phones, as well as device manufacturers. Applications include smart reply in Gboard keyboard and real-time summaries of call recordings. These tasks can be completed without sending your personal data to cloud servers, greatly protecting user privacy.`,
          keyPoints: ['端側輕量化', '離線功能', 'Nano-1/Nano-2', '智慧回覆', '隱私保護'],
          keyPointsEn: ['Edge lightweight', 'Offline functionality', 'Nano-1/Nano-2', 'Smart reply', 'Privacy protection'],
          completed: false
        },
        {
          id: 4,
          title: '2.4 速度先鋒：Gemini Flash / Flash‑Lite',
          titleEn: '2.4 Speed: Gemini Flash / Flash‑Lite',
          duration: '9 分鐘',
          durationEn: '9 Minutes',
          type: 'text',
          description: '高頻低延遲與成本效益；1.5 Flash 支援長上下文；API 常見預設。',
          descriptionEn: 'High‑throughput, low‑latency and cost; 1.5 Flash supports long context; common API default.',
          image: '',
          imageAlt: 'Flash',
          imageAltEn: 'Flash',
          transcript: `Flash 系列模型是為速度、低延遲和成本效益而生的。它們專為需要快速響應的高頻率或大規模應用場景而設計。

Gemini 1.5 Flash 被譽為性價比最高的模型，它在強大能力（擁有與 Pro 相當的 100 萬 token 上下文視窗）和極快的響應速度之間取得了驚人的平衡。而 Flash-Lite 則是成本效益最高、速度最快的模型，專為高吞吐量的任務而設計。

目標用戶主要是在應用程式中需要大規模調用 API 的開發者和企業。非常適合聊天機械人、實時內容摘要、大規模數據標註等需要「快、靚、正」的場景。對於需要透過 API 構建應用程式的開發者來說，Flash 模型通常是預設的首選。`,
          transcriptEn: `The Flash series models are built for speed, low latency, and cost-effectiveness. They're designed specifically for high-frequency or large-scale application scenarios requiring rapid responses.

Gemini 1.5 Flash is acclaimed as the most cost-effective model, achieving an amazing balance between powerful capabilities (possessing a 1 million token context window comparable to Pro) and extremely fast response speeds. Flash-Lite is the most cost-effective and fastest model, designed specifically for high-throughput tasks.

Target users are primarily developers and enterprises needing large-scale API calls in applications. Perfect for chatbots, real-time content summarisation, large-scale data annotation, and other scenarios requiring "fast, beautiful, and accurate" results. For developers building applications through APIs, Flash models are typically the default first choice.`,
          keyPoints: ['速度優先', '百萬 token', '高吞吐量', '成本效益', 'API 首選'],
          keyPointsEn: ['Speed priority', 'Million tokens', 'High throughput', 'Cost effective', 'API preferred'],
          completed: false
        },
        {
          id: 5,
          title: '2.5 模型家族與架構：如何選擇',
          titleEn: '2.5 Family & Architecture: How to choose',
          duration: '10 分鐘',
          durationEn: '10 Minutes',
          type: 'text',
          description: '總結 Ultra/Pro/Nano/Flash 分工與 Transformer 架構，提供選型指引。',
          descriptionEn: 'Summarise roles of Ultra/Pro/Nano/Flash and Transformer basics; give selection guidance.',
          image: '',
          imageAlt: '模型家族',
          imageAltEn: 'Model family',
          transcript: `選型速覽（不加圖片，以條列清晰呈現）\n\nUltra\n- 核心定位：旗艦級，最強推理與研究能力\n- 主要應用：戰略分析、學術研究、高階創作與多模態推理\n- 目標平台：雲端數據中心\n- 關鍵特性：基準表現亮眼、處理極度複雜任務\n- 可用性：Gemini Advanced 訂閱\n\nPro\n- 核心定位：平衡、通用、可擴展的主力\n- 主要應用：日常寫作、摘要、翻譯、輕量編程、原型開發\n- 目標平台：雲端數據中心（亦供 API 調用）\n- 關鍵特性：性能/成本/可及性三者平衡，免費版網頁與 Workspace 功能的主力\n- 可用性：免費版 Gemini、Vertex AI\n\nFlash / Flash‑Lite\n- 核心定位：速度先鋒，低延遲與高吞吐的最佳性價比\n- 主要應用：聊天機械人、即時摘要、內容審核、標註流水線等大規模 API 場景\n- 目標平台：雲端數據中心（API 常見預設）\n- 關鍵特性：1.5 Flash 支援超長上下文（百萬級 token），Flash‑Lite 進一步壓低成本/延遲\n- 可用性：Google AI Studio、Vertex AI\n\nNano\n- 核心定位：端側輕量高效，強調私隱與離線\n- 主要應用：智慧回覆、錄音摘要、裝置端分類與助理功能\n- 目標平台：手機等終端裝置（Nano‑1 / Nano‑2 對應不同記憶體）\n- 關鍵特性：完全離線、低功耗、低延遲，數據不離開裝置\n- 可用性：Pixel 8 Pro 及後續機型\n\n總結建議\n- 研究/高推理：選 Ultra\n- 日常/內容創作/原型：選 Pro\n- 海量 API/低延遲：選 Flash（或 Flash‑Lite）\n- 私隱/離線/行動裝置：選 Nano\n\n技術補充\n- 架構基礎為 Transformer；原生多模態訓練支撐跨模態推理與長上下文能力。`,
          transcriptEn: `Quick selector (text‑only, bullet format)\n\nUltra\n- Positioning: Flagship with strongest reasoning/research\n- Use cases: Strategy, academic research, advanced creation, multimodal reasoning\n- Platform: Cloud data center\n- Key traits: Top benchmarks, handles highly complex tasks\n- Availability: Gemini Advanced\n\nPro\n- Positioning: Balanced, general‑purpose workhorse\n- Use cases: Everyday writing, summaries, translation, light coding, prototyping\n- Platform: Cloud (API available)\n- Key traits: Best mix of performance/cost/access; powers free web app & Workspace features\n- Availability: Free Gemini, Vertex AI\n\nFlash / Flash‑Lite\n- Positioning: Speed/cost champion for high‑throughput, low‑latency APIs\n- Use cases: Chatbots, instant summaries, moderation, labeling pipelines\n- Platform: Cloud (common API default)\n- Key traits: 1.5 Flash supports very long context (million‑token class); Flash‑Lite pushes cost/latency lower\n- Availability: Google AI Studio, Vertex AI\n\nNano\n- Positioning: On‑device efficiency with privacy & offline\n- Use cases: Smart reply, call summaries, on‑device classification/assistant features\n- Platform: Devices (Nano‑1 / Nano‑2 for memory tiers)\n- Key traits: Fully offline, low power & latency; data stays on device\n- Availability: Pixel 8 Pro and newer\n\nSummary guide\n- Deep reasoning/research: Ultra\n- Everyday/prototyping/content: Pro\n- Massive API/low latency: Flash (or Flash‑Lite)\n- Privacy/offline/mobile: Nano\n\nTech note\n- Based on Transformer; native multimodal training enables cross‑modal reasoning and long context.`,
          keyPoints: ['選型指南', 'Transformer'],
          keyPointsEn: ['Selection', 'Transformer'],
          completed: false
        }
      ],
      quiz: {
        title: '第二章測驗：核心技術',
        titleEn: 'Chapter 2 Quiz: Core Tech',
        timeLimit: 15,
        passingScore: 60,
        questions: [
          { id: 1, question: '哪個版本設計於行動裝置上高效運行？', questionEn: 'Which version runs efficiently on-device?', type: 'single', options: ['Ultra','Pro','Nano','Flash'], optionsEn: ['Ultra','Pro','Nano','Flash'], correctAnswer: 2, explanation: 'Nano 針對終端裝置離線運行。', explanationEn: 'Nano targets on-device use.' },
          { id: 2, question: '原生多模態與早期模型的差異？', questionEn: 'Native multimodality vs early models?', type: 'single', options: ['只能一種資訊','先轉文字再處理','用統一模型共同處理多種數據','需手動標記資訊類型'], optionsEn: ['Single modality only','Convert to text first','Unified model for multiple modalities','Manual tagging needed'], correctAnswer: 2, explanation: '從訓練起即統一處理多模態。', explanationEn: 'Unified from training stage.' },
          { id: 3, question: 'Gemini 的基礎架構是？', questionEn: 'Underlying architecture?', type: 'single', options: ['CNN','RNN','Decision Tree','Transformer'], optionsEn: ['CNN','RNN','Decision Tree','Transformer'], correctAnswer: 3, explanation: '採用 Transformer 架構。', explanationEn: 'Transformer-based.' },
          { id: 4, question: 'Gemini 在何處展現強大推理？', questionEn: 'Where does Gemini excel at reasoning?', type: 'single', options: ['基礎算術','多步驟跨學科複雜問題','單篇文章抽取事實','押韻詩歌'], optionsEn: ['Basic arithmetic','Multi-step, cross‑disciplinary problems','Single doc fact extraction','Rhyming poems'], correctAnswer: 1, explanation: '在 MMLU 等基準中表現亮眼。', explanationEn: 'Strong on multi-step cross‑disciplinary tasks.' },
          { id: 5, question: '旗艦模型定位為？', questionEn: 'Flagship model?', type: 'single', options: ['Nano','Pro','Ultra','1.0'], optionsEn: ['Nano','Pro','Ultra','1.0'], correctAnswer: 2, explanation: 'Ultra 為最強大的旗艦模型。', explanationEn: 'Ultra is the flagship.' }
        ]
      }
    },
    {
      id: 3,
      title: '第三章：Gemini 產品家族與應用場景',
      titleEn: 'Chapter 3: Product Family & Use Cases',
      description: 'Workspace 整合、程式設計、創意寫作、學習研究與行動端功能。',
      descriptionEn: 'Workspace integration, coding, creative writing, learning and mobile features.',
      duration: '45 分鐘',
      durationEn: '45 Minutes',
      lessons: [
        {
          id: 1,
          title: '3.1 首次登入與介面巡禮',
          titleEn: '3.1 First Login & Interface Tour',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '帳戶/瀏覽器要求；側邊欄、主視窗、輸入欄與企業盾牌圖示。',
          descriptionEn: 'Account/browser requirements; sidebar, main window, input bar, enterprise shield.',
          image: '',
          imageAlt: '介面巡禮',
          imageAltEn: 'Interface tour',
          transcript: `要使用 Gemini，您需要擁有以下其中一種帳戶：個人 Google 帳戶（需年滿 13 歲）、符合資格的 Workspace 工作帳戶（需年滿 18 歲），或學校 Google 帳戶（需年滿 13 歲且由管理員啟用）。支援的瀏覽器包括 Chrome、Safari、Firefox、Opera 或 Edgium。

登入後，您會看到一個簡潔直觀的介面：

左側邊欄：這裡是您的對話歷史記錄。所有過往的對話都會按時間順序列出，方便您隨時查找和繼續之前的討論。

中間主視窗：這是主要的對話區域，您與 Gemini 的所有互動都會在這裡顯示。

底部輸入欄：這是您輸入指令（Prompt）的地方。

企業用戶標示：如果您是透過 Workspace 帳戶登入，對話視窗中會顯示一個盾牌圖示，這表示您的對話數據受到企業級的安全和私隱保護，不會被用於訓練通用模型。`,
          transcriptEn: `To use Gemini, you need one of the following account types: personal Google account (must be 13+ years old), eligible Workspace work account (must be 18+ years old), or school Google account (must be 13+ years old and enabled by administrator). Supported browsers include Chrome, Safari, Firefox, Opera, or Edgium.

After logging in, you'll see a clean and intuitive interface:

Left sidebar: This is your conversation history. All past conversations are listed chronologically, making it easy to find and continue previous discussions.

Central main window: This is the primary conversation area where all your interactions with Gemini are displayed.

Bottom input bar: This is where you input your prompts.

Enterprise user indicator: If you log in through a Workspace account, a shield icon will appear in the conversation window, indicating that your conversation data is protected by enterprise-grade security and privacy, and won't be used to train general models.`,
          keyPoints: ['登入要求', '介面佈局', '對話歷史', '企業標示', '瀏覽器支援'],
          keyPointsEn: ['Login requirements', 'Interface layout', 'Conversation history', 'Enterprise indicator', 'Browser support'],
          completed: false
        },
        {
          id: 2,
          title: '3.2 發起第一個對話：文字/語音/檔案上傳',
          titleEn: '3.2 Start a Chat: Text/Voice/Upload',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '文字送出、麥克風語音、上傳圖片/文件/試算表/簡報/程式碼。',
          descriptionEn: 'Text send, microphone input, upload images/docs/sheets/slides/code.',
          image: '',
          imageAlt: '開始對話',
          imageAltEn: 'Start chat',
          transcript: `文字輸入：這是最基礎的互動方式。在底部的文字框中輸入您的問題或指令，然後按 Enter 鍵或點擊右側的紙飛機圖示提交。

語音輸入：點擊輸入欄右側的麥克風圖示，即可透過語音輸入。這在您不方便打字或希望更自然地表達想法時非常有用。

檔案上傳：這是發揮 Gemini 多模態能力的關鍵。點擊輸入欄左側的「新增檔案」圖示（通常是加號或迴紋針圖示），您可以從您的電腦裝置或 Google 雲端硬碟上傳多種檔案，包括：

圖片 (JPG, PNG, WebP)
文件 (PDF, Word, TXT)
試算表 (Excel, CSV)
簡報 (PowerPoint)
程式碼檔案`,
          transcriptEn: `Text input: This is the most basic form of interaction. Type your question or instruction in the bottom text box, then press Enter or click the paper plane icon on the right to submit.

Voice input: Click the microphone icon on the right side of the input bar to use voice input. This is very useful when typing is inconvenient or when you want to express ideas more naturally.

File upload: This is key to unleashing Gemini's multimodal capabilities. Click the "add file" icon on the left side of the input bar (usually a plus or paperclip icon), and you can upload various files from your computer or Google Drive, including:

Images (JPG, PNG, WebP)
Documents (PDF, Word, TXT)
Spreadsheets (Excel, CSV)
Presentations (PowerPoint)
Code files`,
          keyPoints: ['文字輸入', '語音輸入', '檔案上傳', '多模態能力', '多種格式'],
          keyPointsEn: ['Text input', 'Voice input', 'File upload', 'Multimodal capability', 'Multiple formats'],
          completed: false
        },
        {
          id: 3,
          title: '3.3 解讀回應：複製/修改/草稿/匯出',
          titleEn: '3.3 Read Responses: Copy/Edit/Drafts/Export',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '回應工具列：讚/倒讚、修改回應、顯示草稿、複製、匯出。',
          descriptionEn: 'Toolbar: feedback, modify response, show drafts, copy, export.',
          image: '',
          imageAlt: '回應操作',
          imageAltEn: 'Response ops',
          transcript: `在 Gemini 的每個回應下方，都有一排實用的互動按鈕，它們是您與 AI 協作的核心工具。

讚/倒讚 (Feedback)：點擊「讚」（👍）或「倒讚」（👎）圖示，可以向 Google 提供關於該回應品質的反饋。這有助於他們不斷改進模型。

修改回應 (Modify Response)：點擊此按鈕（通常是一個編輯圖示），您可以快速要求 Gemini 對剛才的答案進行調整，選項通常包括：更長、更短、更簡單、更休閒、更專業。這比重新輸入指令要快得多。

顯示草稿 (Show Drafts)：這是一個非常強大的創意功能。點擊此按鈕，您會看到 Gemini 其實為您的同一個提示，在內部生成了另外幾個不同版本的答案。您可以左右切換，從中挑選最符合您心意的一個，或從不同草稿中汲取靈感。

複製 (Copy)：點擊複製圖示（📋），可以一鍵將整個回應內容複製到剪貼簿。如果回應中包含程式碼區塊，該區塊右上方也會有一個專門的複製按鈕，方便您直接取用程式碼。

分享與匯出 (Share & Export)：Gemini 與 Google Workspace 深度整合。您可以：匯出至 Google 文件：將文字回應直接轉換為一個新的 Google Doc，方便後續編輯和排版。匯出至試算表：如果生成的是表格數據，點擊此選項，系統會自動為您創建一個新的 Google Sheet 並填入所有數據，省去手動複製粘貼的麻煩。`,
          transcriptEn: `Below each Gemini response, there's a row of useful interaction buttons that are core tools for collaborating with AI.

Like/Dislike (Feedback): Click the "like" (👍) or "dislike" (👎) icons to provide Google with feedback about the response quality. This helps them continuously improve the model.

Modify Response: Click this button (usually an edit icon) to quickly ask Gemini to adjust the previous answer. Options typically include: longer, shorter, simpler, more casual, more professional. This is much faster than re-entering prompts.

Show Drafts: This is a very powerful creative feature. Click this button to see that Gemini actually generated several different versions of answers internally for your same prompt. You can switch between them to pick the one that best suits your needs, or draw inspiration from different drafts.

Copy: Click the copy icon (📋) to copy the entire response content to clipboard with one click. If the response contains code blocks, there's also a dedicated copy button in the top-right corner of each block for easy code extraction.

Share & Export: Gemini integrates deeply with Google Workspace. You can export to Google Docs to convert text responses directly into a new Google Doc for further editing and formatting, or export to Sheets where the system automatically creates a new Google Sheet with all data, saving manual copy-paste effort.`,
          keyPoints: ['讚/倒讚', '修改回應', '顯示草稿', '一鍵複製', 'Workspace 匯出'],
          keyPointsEn: ['Like/Dislike', 'Modify response', 'Show drafts', 'One-click copy', 'Workspace export'],
          completed: false
        },
        {
          id: 4,
          title: '3.4 對話管理：釘選/重命名/刪除',
          titleEn: '3.4 Manage Chats: Pin/Rename/Delete',
          duration: '6 分鐘',
          durationEn: '6 Minutes',
          type: 'text',
          description: '側邊欄管理與最佳做法。',
          descriptionEn: 'Sidebar management and best practices.',
          image: '',
          imageAlt: '對話管理',
          imageAltEn: 'Chat management',
          transcript: `在左側的對話歷史記錄側邊欄中，將滑鼠懸停在任一對話標題上，會出現一個「…」圖示，點擊後即可進行管理：

釘選 (Pin)：對於重要的、正在進行中的項目，您可以將其釘選，使其始終顯示在歷史記錄的頂部。

重新命名 (Rename)：Gemini 會自動為對話生成標題，但您最好為其手動命名一個有意義的標題（例如「市場推廣活動腦力激盪」），方便日後快速查找。

刪除 (Delete)：刪除不再需要的對話，保持側邊欄的整潔。`,
          transcriptEn: 'Hover title and use “…”: pin important chats, rename with meaningful titles, delete stale threads to stay tidy.',
          keyPoints: ['釘選置頂', '重命名', '刪除整理', '對話管理', '最佳實踐'],
          keyPointsEn: ['Pin to top', 'Rename', 'Delete cleanup', 'Chat management', 'Best practices'],
          completed: false
        },
        {
          id: 5,
          title: '3.5 進階：Gems / Canvas / Deep Research',
          titleEn: '3.5 Advanced: Gems / Canvas / Deep Research',
          duration: '10 分鐘',
          durationEn: '10 Minutes',
          type: 'text',
          description: '自訂角色 Gems、互動 Canvas、帶引用 Deep Research。',
          descriptionEn: 'Custom roles (Gems), interactive Canvas, cited Deep Research.',
          image: '',
          imageAlt: '進階功能',
          imageAltEn: 'Advanced features',
          transcript: `Gems：這是 Gemini 的自訂指令或個人化 AI 角色功能。您可以創建自己的「Gems」，為 Gemini 設定一個特定的角色和行為指南。例如，您可以創建一個「健身教練 Gem」，指令是：「你是一位專業的健身教練，總是提供鼓勵性且科學的健身建議。」保存後，您每次調用這個 Gem，它都會以該角色與您對話，無需重複輸入背景設定。

Canvas：一個即將推出的互動式工作空間。它旨在將純文字的輸出轉化為更動態、更具結構的形式。例如，您可以要求 Gemini 規劃一個項目，它可能會在 Canvas 中生成一個可互動的時間軸或心智圖，而不僅僅是文字列表。

Deep Research：這項功能專為深入研究複雜主題而設。當您提出一個複雜問題時，它會智能地將問題分解成多個子問題，深入梳理網絡上的高品質資源，綜合分析後提供一份帶有引用來源的詳細報告。它還可以整合用戶上傳的檔案，進行更具相關性的分析。`,
          transcriptEn: 'Gems save personal roles/instructions; Canvas turns text into interactive structures; Deep Research decomposes problems, aggregates high‑quality sources with citations, and can include your uploads.',
          keyPoints: ['自訂角色 Gems', '互動 Canvas', '深度研究', '個人化 AI', '進階功能'],
          keyPointsEn: ['Custom role Gems', 'Interactive Canvas', 'Deep Research', 'Personalised AI', 'Advanced features'],
          completed: false
        },
        {
          id: 6,
          title: '3.6 設定與個人化：擴充與位置',
          titleEn: '3.6 Settings & Personalisation',
          duration: '5 分鐘',
          durationEn: '5 Minutes',
          type: 'text',
          description: '啟用 Workspace/地圖/航班/YouTube 擴充；管理位置資訊。',
          descriptionEn: 'Enable Workspace/Maps/Flights/YouTube; manage location.',
          image: '',
          imageAlt: '設定',
          imageAltEn: 'Settings',
          transcript: `擴充功能 (Extensions)：這是 Gemini 擴展其能力的關鍵。在設定中，您可以啟用或停用連接至其他 Google 應用程式的擴充功能，如 Workspace (Gmail, Drive, Docs)、Google 地圖、Google 航班和 YouTube。啟用後，Gemini 就能夠從這些應用程式中即時提取您的個人化資訊，以提供更貼切的回答。

示例：啟用 Workspace 擴充功能後，您可以問：「幫我總結一下上週 David 發給我所有關於『Project Phoenix』的郵件。」Gemini 會直接在您的 Gmail 中搜索並提供摘要。

位置資訊：在設定選單底部，您可以管理 Gemini 使用的位置資訊。提供準確的位置，可以讓您在查詢天氣、尋找附近餐廳或規劃路線時，獲得更精準的回答。`,
          transcriptEn: 'Enable extensions so Gemini can access Gmail/Drive/Docs, Maps, Flights and YouTube; manage location at the bottom for more accurate local answers.',
          keyPoints: ['Workspace 擴充', 'Google 應用連接', '位置資訊', '個人化設定', '實時資訊'],
          keyPointsEn: ['Workspace extensions', 'Google app connections', 'Location info', 'Personalised settings', 'Real-time info'],
          completed: false
        }
      ],
      quiz: {
        title: '第三章測驗：產品家族與應用',
        titleEn: 'Chapter 3 Quiz: Products & Use',
        timeLimit: 15,
        passingScore: 60,
        questions: [
          { id: 1, question: 'Gemini 在 Workspace 中處理郵件的方式？', questionEn: 'What can Gemini do with emails?', type: 'single', options: ['自動刪垃圾','總結對話與草擬回覆','設計頭像','阻止上司發郵件'], optionsEn: ['Auto delete spam','Summarise threads & draft replies','Design avatars','Block boss emails'], correctAnswer: 1, explanation: '可總結與草擬，提升效率。', explanationEn: 'Summaries and drafting improve productivity.' },
          { id: 2, question: '對程式設計師的幫助？', questionEn: 'Help for developers?', type: 'single', options: ['自動發布','取代測試','生成片段/除錯/解釋','保證無漏洞'], optionsEn: ['Auto deploy','Replace QA','Generate/debug/explain code','Guarantee no bugs'], correctAnswer: 2, explanation: '可生成程式碼並協助除錯與解釋。', explanationEn: 'Generates code, assists debugging and explanations.' },
          { id: 3, question: '創意寫作的長處？', questionEn: 'Creative writing strength?', type: 'single', options: ['從不虛構','腦暴、風格範例、延續故事','只學術論文','一次一個字'], optionsEn: ['Never fictional','Brainstorm, style examples, continue stories','Academic only','One word at a time'], correctAnswer: 1, explanation: '幫助靈感激發與延展。', explanationEn: 'Helps with inspiration and continuation.' },
          { id: 4, question: '學習研究的最佳實踐？', questionEn: 'Best practice for study/research?', type: 'single', options: ['直接貼上作業','只問是非題','作為起點並核查來源','完全相信'], optionsEn: ['Copy‑paste','Only yes/no','Use as starting point and verify','Trust 100%'], correctAnswer: 2, explanation: '將其視為助手並外部驗證。', explanationEn: 'Use as assistant and verify externally.' },
          { id: 5, question: '行動端直接體現之一？', questionEn: 'Direct mobile feature?', type: 'single', options: ['續航翻倍','畫圈搜尋更智能','訊號更強','所有 App 免費'], optionsEn: ['Battery 2x','Smarter Circle to Search','Stronger signal','All apps free'], correctAnswer: 1, explanation: 'Pixel 等裝置支援畫圈搜尋。', explanationEn: 'Circle to Search on Pixel.' }
        ]
      }
    },
    {
      id: 4,
      title: '第四章：Gemini 操作介面全攻略',
      titleEn: 'Chapter 4: Gemini Web/App UI Guide',
      description: '回應操作、草稿版本、按讚回饋、語音輸入與分享匯出。',
      descriptionEn: 'Editing prompts, drafts, feedback, voice input and share/export.',
      duration: '45 分鐘',
      durationEn: '45 Minutes',
      lessons: [
        {
          id: 1,
          title: '4.1 介面操作要點',
          titleEn: '4.1 Key UI Operations',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'text',
          description: '編輯提示、顯示其他草稿、回饋與語音。',
          descriptionEn: 'Edit prompt, show drafts, feedback and voice.',
          image: '',
          imageAlt: '操作介面',
          imageAltEn: 'UI',
          transcript: '逐項示範常用按鈕與工作流程。',
          transcriptEn: 'Demonstrate common controls and flows.',
          keyPoints: ['Edit', 'Drafts', 'Feedback', 'Voice'],
          keyPointsEn: ['Edit', 'Drafts', 'Feedback', 'Voice'],
          completed: false
        },
        {
          id: 2,
          title: '4.2 文字處理大師：摘要、寫作與長文分析',
          titleEn: '4.2 Text Mastery: Summarise, Write, Analyse',
          duration: '12 分鐘',
          durationEn: '12 Minutes',
          type: 'text',
          description: '用巨大情境視窗處理長文、摘要與專業寫作。',
          descriptionEn: 'Use large context windows for long‑form analysis and writing.',
          image: '',
          imageAlt: '文字處理',
          imageAltEn: 'Text',
          transcript: `Gemini 在文字處理方面展現了卓越的能力，這是其最基礎也是最強大的功能之一。

多語言支援：Gemini 支援超過 40 種語言，包括繁體中文、簡體中文、英文、日文、韓文、法文、德文、西班牙文等。它不僅能進行準確的翻譯，還能理解不同語言的文化背景和語言習慣。

內容創作：
• 創意寫作：小說、詩歌、劇本、廣告文案
• 商業文檔：提案書、報告、郵件、會議記錄
• 學術寫作：論文、研究報告、文獻回顧
• 技術文檔：API 文檔、使用手冊、技術規格

文字分析：
• 摘要與重點提取
• 情感分析與語調識別
• 文本分類與標籤
• 語法檢查與風格建議

上下文理解：Gemini 能夠根據對話上下文調整回應的語調、專業程度和詳細程度，確保回應符合您的需求和場景。`,
          transcriptEn: `Gemini demonstrates exceptional capabilities in text processing, which is both its most fundamental and most powerful function.

Multilingual Support: Gemini supports over 40 languages, including Traditional Chinese, Simplified Chinese, English, Japanese, Korean, French, German, Spanish, and more. It not only provides accurate translation but also understands the cultural backgrounds and linguistic habits of different languages.

Content Creation:
• Creative writing: Novels, poetry, scripts, advertising copy
• Business documents: Proposals, reports, emails, meeting minutes
• Academic writing: Papers, research reports, literature reviews
• Technical documentation: API docs, user manuals, technical specifications

Text Analysis:
• Summarisation and key point extraction
• Sentiment analysis and tone recognition
• Text classification and tagging
• Grammar checking and style suggestions

Contextual Understanding: Gemini can adjust the tone, professional level, and detail level of responses based on conversation context, ensuring responses match your needs and scenarios.`,
          keyPoints: ['多語言支援', '內容創作', '文字分析', '上下文理解', '全方位能力'],
          keyPointsEn: ['Multilingual support', 'Content creation', 'Text analysis', 'Contextual understanding', 'Comprehensive capabilities'],
          completed: false
        },
        {
          id: 3,
          title: '4.3 視覺創意家：圖片理解與生成（Imagen 4）',
          titleEn: '4.3 Vision: Understanding & Generation (Imagen 4)',
          duration: '12 分鐘',
          durationEn: '12 Minutes',
          type: 'text',
          description: '對話式圖像分割與高品質圖片生成。',
          descriptionEn: 'Conversational segmentation and high‑quality image generation.',
          image: '',
          imageAlt: '視覺',
          imageAltEn: 'Vision',
          transcript: `Gemini 整合了 Google 最新的 Imagen 3 模型，提供強大的視覺處理能力。

圖像理解：
• 物件識別：準確識別圖片中的人物、動物、物品、建築等
• 場景分析：理解圖片的環境、氛圍、時間、地點
• 文字提取：從圖片中讀取和理解文字內容（OCR）
• 細節描述：提供詳細的圖像描述，包括顏色、構圖、風格

圖像生成：
• 高品質輸出：生成清晰、細緻的圖像
• 多種風格：寫實、插畫、抽象、卡通等
• 靈活比例：方形、橫向、直向等不同尺寸
• 精確控制：根據詳細描述生成符合要求的圖像

實用應用：
• 產品設計概念圖
• 營銷素材創作
• 教育插圖製作
• 個人創意項目

注意：圖像生成功能可能因地區而異，請查看您所在地區的可用性。`,
          transcriptEn: `Gemini integrates Google's latest Imagen 3 model, providing powerful visual processing capabilities.

Image Understanding:
• Object recognition: Accurately identify people, animals, objects, buildings, etc. in images
• Scene analysis: Understand the environment, atmosphere, time, and location of images
• Text extraction: Read and understand text content from images (OCR)
• Detail description: Provide detailed image descriptions including colours, composition, and style

Image Generation:
• High-quality output: Generate clear, detailed images
• Multiple styles: Realistic, illustration, abstract, cartoon, etc.
• Flexible ratios: Square, landscape, portrait, and other different sizes
• Precise control: Generate images that meet requirements based on detailed descriptions

Practical Applications:
• Product design concept images
• Marketing material creation
• Educational illustration production
• Personal creative projects

Note: Image generation functionality may vary by region. Please check availability in your area.`,
          keyPoints: ['圖像理解', '圖像生成', 'Imagen 3', '多種風格', '實用應用'],
          keyPointsEn: ['Image understanding', 'Image generation', 'Imagen 3', 'Multiple styles', 'Practical applications'],
          completed: false
        },
        {
          id: 4,
          title: '4.4 動態敘事者：影片分析與生成（Veo 3）',
          titleEn: '4.4 Video: Analysis & Generation (Veo 3)',
          duration: '10 分鐘',
          durationEn: '10 Minutes',
          type: 'text',
          description: '多模態影片分析與短片生成，支援音訊。',
          descriptionEn: 'Multimodal video analysis and short generation with audio.',
          image: '',
          imageAlt: '影片',
          imageAltEn: 'Video',
          transcript: `Gemini 整合了 Google 的 Veo 2 影片生成模型，為用戶提供前所未有的影片創作能力。

影片理解：
• 內容分析：理解影片的主題、情節、角色
• 動作識別：分析影片中的動作、手勢、表情
• 場景解析：識別拍攝環境、燈光、構圖
• 時間軸分析：理解影片的節奏和時間結構

影片生成：
• 高品質輸出：生成 1080p 高清影片
• 多種風格：寫實、動畫、紀錄片、電影風格
• 靈活時長：從幾秒到數分鐘的影片片段
• 精確控制：根據詳細腳本生成符合要求的影片

創作應用：
• 廣告和營銷影片
• 教育和培訓內容
• 社交媒體短片
• 概念驗證和原型

技術特點：
• 物理真實性：生成符合物理定律的動作
• 連貫性：保持角色和場景的一致性
• 創意靈活性：支援各種創意和風格要求

注意：Veo 2 功能正在逐步推出，可用性可能因地區而異。`,
          transcriptEn: `Gemini integrates Google's Veo 2 video generation model, providing users with unprecedented video creation capabilities.

Video Understanding:
• Content analysis: Understand video themes, plots, and characters
• Action recognition: Analyse movements, gestures, and expressions in videos
• Scene parsing: Identify filming environments, lighting, and composition
• Timeline analysis: Understand video rhythm and temporal structure

Video Generation:
• High-quality output: Generate 1080p high-definition videos
• Multiple styles: Realistic, animated, documentary, cinematic styles
• Flexible duration: Video clips from seconds to several minutes
• Precise control: Generate videos meeting requirements based on detailed scripts

Creative Applications:
• Advertising and marketing videos
• Educational and training content
• Social media short clips
• Concept validation and prototypes

Technical Features:
• Physical realism: Generate movements that comply with physical laws
• Consistency: Maintain character and scene consistency
• Creative flexibility: Support various creative and style requirements

Note: Veo 2 functionality is being gradually rolled out, and availability may vary by region.`,
          keyPoints: ['影片理解', '影片生成', 'Veo 2', '高品質輸出', '創作應用'],
          keyPointsEn: ['Video understanding', 'Video generation', 'Veo 2', 'High-quality output', 'Creative applications'],
          completed: false
        },
        {
          id: 5,
          title: '4.5 聲音與程式：轉錄、摘要、生成與除錯',
          titleEn: '4.5 Audio & Code: Transcribe, Summarise, Generate, Debug',
          duration: '11 分鐘',
          durationEn: '11 Minutes',
          type: 'text',
          description: '音訊轉錄/摘要/說話人分離；程式碼生成、解釋與除錯。',
          descriptionEn: 'Audio transcription/summaries/diarisation; code generation/explanation/debugging.',
          image: '',
          imageAlt: '音訊與程式碼',
          imageAltEn: 'Audio & Code',
          transcript: `Gemini 的音訊處理能力為多媒體創作和分析提供了強大支援。

音訊理解：
• 語音轉文字：準確轉錄各種語言的語音內容
• 音樂分析：識別音樂類型、節拍、樂器、情緒
• 音效識別：識別環境音、動物聲音、機械聲等
• 音質評估：分析音訊品質、噪音水平、清晰度

語音處理：
• 多語言支援：支援主要語言的語音識別
• 說話者識別：區分不同說話者的聲音
• 情緒分析：分析語音中的情緒和語調
• 內容摘要：為長音訊提供重點摘要

音樂創作：
• 風格生成：根據描述生成不同風格的音樂
• 情緒匹配：創作符合特定情緒的背景音樂
• 樂器選擇：指定特定樂器或樂器組合
• 時長控制：生成指定長度的音樂片段

實用應用：
• 會議記錄轉錄
• 播客內容分析
• 音樂創作輔助
• 音效設計
• 語言學習輔助

注意：音訊生成功能可能因地區和版本而異。

程式碼處理：
Gemini 在程式設計方面提供全方位的支援，是開發者的強大助手。

支援語言：
• 主流語言：Python, JavaScript, Java, C++, C#, Go, Rust
• 網頁技術：HTML, CSS, TypeScript, React, Vue, Angular
• 資料庫：SQL, NoSQL 查詢語言
• 腳本語言：Bash, PowerShell, R, MATLAB
• 新興語言：Kotlin, Swift, Dart, Julia

程式碼生成：
• 函數實作：根據需求描述生成完整函數
• 演算法實現：實作各種演算法和資料結構
• API 整合：生成 API 調用和處理代碼
• 測試代碼：自動生成單元測試和整合測試

程式碼分析：
• 錯誤偵測：識別語法錯誤和邏輯問題
• 效能分析：找出效能瓶頸和最佳化機會
• 安全審查：識別潛在的安全漏洞
• 程式碼品質：評估可讀性和維護性

開發輔助：
• 程式碼解釋：詳細解釋複雜程式碼的運作原理
• 重構建議：提供程式碼改進和重構方案
• 文檔生成：自動生成程式碼文檔和註解
• 除錯協助：協助定位和解決程式問題

實際應用：
• 快速原型開發
• 程式碼學習和教學
• 技術債務清理
• 跨語言程式碼轉換
• 自動化腳本編寫`,
          transcriptEn: 'Upload recordings for transcripts, summaries and diarisation; with Code Assist it generates code, explains logic, finds/fixes bugs and suggests refactors.',
          keyPoints: ['音訊處理', '程式碼支援', '多語言識別', '音樂創作', '開發輔助'],
          keyPointsEn: ['Audio processing', 'Code support', 'Multilingual recognition', 'Music creation', 'Development assistance'],
          completed: false
        }
      ],
      quiz: {
        title: '第四章測驗：介面全攻略',
        titleEn: 'Chapter 4 Quiz: UI Guide',
        timeLimit: 15,
        passingScore: 60,
        questions: [
          { id: 1, question: '「編輯」按鈕的作用？', questionEn: 'Edit button does?', type: 'single', options: ['改回答','改你之前的提示','刪除對話','分享對話'], optionsEn: ['Edit answer','Edit your previous prompt','Delete chat','Share chat'], correctAnswer: 1, explanation: '能修改先前輸入的提示。', explanationEn: 'Edit the previous prompt.' },
          { id: 2, question: '「顯示其他草稿」意義？', questionEn: '“Show drafts” means?', type: 'single', options: ['郵件草稿','為同題提供多個版本答案','歷史編輯記錄','存成草稿文件'], optionsEn: ['Email drafts','Alternative answers for same prompt','Edit history','Save as draft doc'], correctAnswer: 1, explanation: '可挑選不同風格的版本。', explanationEn: 'Choose among alternative versions.' },
          { id: 3, question: '讚/爛圖示用途？', questionEn: 'Thumbs up/down purpose?', type: 'single', options: ['換贈品','公開你的滿意度','回饋開發團隊改進模型','加入最愛'], optionsEn: ['Redeem gifts','Publicly show satisfaction','Feedback for model improvement','Add favorites'], correctAnswer: 2, explanation: '作為改進模型的重要回饋。', explanationEn: 'Improves the model via feedback.' },
          { id: 4, question: '麥克風圖示功能？', questionEn: 'Microphone icon?', type: 'single', options: ['錄音存檔','語音輸入問題','辨識音樂','打電話'], optionsEn: ['Record and save','Voice input','Identify music','Call contact'], correctAnswer: 1, explanation: '啟動語音輸入。', explanationEn: 'Start voice input.' },
          { id: 5, question: '「分享與匯出」通常不包含？', questionEn: 'Share/Export usually does NOT include?', type: 'single', options: ['公開連結','匯出到 Docs','直接發佈到個人社群帳號','匯出為 Replit 程式碼'], optionsEn: ['Public link','Export to Docs','Direct publish to your social account','Export to Replit'], correctAnswer: 2, explanation: '不會直接發佈到你的社群帳號。', explanationEn: 'No direct publish to personal social accounts.' }
        ]
      }
    },
    {
      id: 5,
      title: '第五章：精通 Gemini：從入門到進階',
      titleEn: 'Chapter 5: Prompting with Gemini — Beginner to Advanced',
      description: '角色設定、格式要求、連鎖思考、多模態提示與錯誤修正。',
      descriptionEn: 'Persona, format control, chain‑of‑thought, multimodal prompts and refinement.',
      duration: '45 分鐘',
      durationEn: '45 Minutes',
      lessons: [
        {
          id: 1,
          title: '5.1 提示工程基礎',
          titleEn: '5.1 Prompting Basics',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'text',
          description: '角色/任務/情境/格式四要素。',
          descriptionEn: 'Persona/Task/Context/Format.',
          image: '',
          imageAlt: '提示工程',
          imageAltEn: 'Prompting',
          transcript: `提示工程是與 AI 有效溝通的藝術和科學。一個優秀的提示通常包含四個核心要素：

1. 角色設定（Persona）：
明確告訴 Gemini 您希望它扮演什麼角色。例如：
• 「作為一位資深的市場研究分析師」
• 「以一位小學老師的身份」
• 「像一位經驗豐富的程式設計師」

2. 任務描述（Task）：
清晰說明您希望 Gemini 做什麼。使用具體的動詞：
• 「分析」、「總結」、「比較」、「解釋」
• 「幫我分析這份財務報告的關鍵指標」
• 「為這個產品撰寫一份市場定位策略」

3. 背景情境（Context）：
提供相關的背景資訊，幫助 Gemini 理解情況：
• 目標受眾是誰
• 使用場景和目的
• 相關的約束或限制
• 「這是為了下週的董事會報告」

4. 格式要求（Format）：
指定您希望的輸出格式：
• 「以條列式列出」
• 「用表格形式呈現」
• 「分為三個段落，每段 100-150 字」
• 「提供繁體中文和英文版本」

實際範例：
「作為一位資深的數位行銷專家，請幫我分析這個電商網站的用戶體驗問題，並提供具體的改進建議。背景：這是一個新創的服裝電商平台，目標客戶是 25-35 歲的都市女性。請以條列式格式列出 5 個主要問題和對應的解決方案。」

這樣的提示包含了所有四個要素，能夠幫助 Gemini 提供更精確、更實用的回應。`,
          transcriptEn: `Prompt engineering is the art and science of effective communication with AI. An excellent prompt typically contains four core elements:

1. Role Setting (Persona):
Clearly tell Gemini what role you want it to play. For example:
• "As a senior market research analyst"
• "In the capacity of a primary school teacher"
• "Like an experienced software engineer"

2. Task Description (Task):
Clearly explain what you want Gemini to do. Use specific verbs:
• "Analyse", "Summarise", "Compare", "Explain"
• "Help me analyse the key metrics in this financial report"
• "Write a market positioning strategy for this product"

3. Background Context (Context):
Provide relevant background information to help Gemini understand the situation:
• Who is the target audience
• Usage scenarios and purposes
• Relevant constraints or limitations
• "This is for next week's board meeting report"

4. Format Requirements (Format):
Specify your desired output format:
• "Present as a bullet-point list"
• "Show in table format"
• "Divide into three paragraphs, 100-150 words each"
• "Provide both Traditional Chinese and English versions"

Practical Example:
"As a senior digital marketing expert, please help me analyse the user experience issues of this e-commerce website and provide specific improvement suggestions. Background: This is a startup clothing e-commerce platform targeting urban women aged 25-35. Please list 5 main issues and corresponding solutions in bullet-point format."

This prompt includes all four elements and helps Gemini provide more accurate and practical responses.`,
          keyPoints: ['角色設定', '任務描述', '背景情境', '格式要求', '四要素框架'],
          keyPointsEn: ['Role setting', 'Task description', 'Background context', 'Format requirements', 'Four-element framework'],
          completed: false
        },
        {
          id: 2,
          title: '5.2 指令式 vs 問句式：下達清晰的指令',
          titleEn: '5.2 Imperative vs Interrogative: Be Explicit',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '指令式通常比開放式問句更精準可執行。',
          descriptionEn: 'Imperatives usually produce clearer, more executable results than open questions.',
          image: '',
          imageAlt: '指令式',
          imageAltEn: 'Imperative',
          transcript: `在與 Gemini 互動時，提示的表達方式會直接影響結果的品質。指令式提示通常比開放式問句更能產生可執行的結果。

指令式提示的優勢：
• 明確的行動導向：直接告訴 AI 要做什麼
• 減少歧義：避免模糊的表達
• 提高效率：直接得到所需的輸出
• 更好的結構：產生有組織的內容

對比範例：

開放式問句（較弱）：
「新品發佈會應該包含什麼？」
「怎麼做市場研究？」
「什麼是好的簡報？」

指令式提示（較強）：
「為新品發佈會撰寫一份完整的專案計劃，包含時程、預算、人力配置和風險評估」
「制定一個為期 3 個月的市場研究計劃，針對 25-40 歲的上班族，研究他們對智能家電的需求」
「將這份 50 頁的市場報告整理成一份 5 分鐘的簡報，重點包含主要發現、數據亮點和行動建議」

最佳實踐：
1. 使用具體的動詞：「分析」、「創建」、「整理」、「比較」
2. 提供明確的參數：數量、時間、範圍
3. 指定期望的結果：格式、長度、細節程度
4. 包含相關的約束條件：預算、時間、資源限制

這樣的方法能夠確保 Gemini 理解您的確切需求，並提供更實用、更可執行的結果。`,
          transcriptEn: `When interacting with Gemini, the way you phrase your prompts directly affects the quality of results. Imperative prompts typically produce more actionable results than open-ended questions.

Advantages of Imperative Prompts:
• Clear action direction: Directly tells the AI what to do
• Reduces ambiguity: Avoids vague expressions
• Improves efficiency: Gets the desired output directly
• Better structure: Produces organised content

Comparison Examples:

Open-ended Questions (Weaker):
"What should a new product launch include?"
"How do you conduct market research?"
"What makes a good presentation?"

Imperative Prompts (Stronger):
"Write a complete project plan for a new product launch, including timeline, budget, staffing allocation, and risk assessment"
"Create a 3-month market research plan targeting working professionals aged 25-40, studying their smart home appliance needs"
"Transform this 50-page market report into a 5-minute presentation, focusing on key findings, data highlights, and action recommendations"

Best Practices:
1. Use specific verbs: "analyse", "create", "organise", "compare"
2. Provide clear parameters: quantities, timeframes, scope
3. Specify expected outcomes: format, length, level of detail
4. Include relevant constraints: budget, time, resource limitations

This approach ensures Gemini understands your exact requirements and provides more practical, actionable results.`,
          keyPoints: ['指令式優勢', '具體動詞', '明確參數', '可執行性', '最佳實踐'],
          keyPointsEn: ['Imperative advantages', 'Specific verbs', 'Clear parameters', 'Actionability', 'Best practices'],
          completed: false
        },
        {
          id: 3,
          title: '5.3 少樣本提示：用範例教模型',
          titleEn: '5.3 Few‑Shot Prompting: Teach by Examples',
          duration: '9 分鐘',
          durationEn: '9 Minutes',
          type: 'text',
          description: '在提示中提供一至多個範例，鎖定格式與邏輯。',
          descriptionEn: 'Provide one or more examples in the prompt to lock format/logic.',
          image: '',
          imageAlt: 'Few‑Shot',
          imageAltEn: 'Few‑Shot',
          transcript: `少樣本提示（Few-Shot Prompting）是一種強大的技巧，通過在提示中提供一個或多個範例，教會 Gemini 您期望的輸出格式和邏輯。

為什麼使用少樣本提示：
• 格式一致性：確保輸出符合特定的結構要求
• 品質控制：通過範例設定品質標準
• 複雜任務：對於難以描述的任務特別有效
• 減少歧義：明確展示期望的結果

實用範例 1 - 情感分析：
「請分析以下評論的情感倾向：

範例：
評論：「這個產品真的太棒了！超出我的期望！」
情感：正面
理由：使用「太棒了」和「超出期望」等正面詞彙

評論：「品質還可以，但價格有點貴」
情感：中性
理由：既有讚美也有批評，整體評價平衡

現在請分析：「這個服務的客服態度很差，完全不理我的問題」」

實用範例 2 - 郵件格式：
「請按照以下格式撰寫商務郵件：

範例：
主旨：關於 Q3 市場研究報告的討論

親愛的 [姓名]：

希望您一切都好。我寫信是想與您討論 Q3 市場研究報告的相關事宜。

[具體內容]

期待您的回覆。

此致
敬禮
[您的姓名]

現在請為以下情況撰寫郵件：邀請客戶參加新產品發佈會」

最佳實踐：
1. 選擇 2-3 個代表性範例
2. 確保範例涵蓋不同情況
3. 明確標示輸入和輸出
4. 提供簡潔的解釋
5. 保持範例的相關性和實用性

這種方法對於需要嚴格格式或複雜邏輯的任務特別有效。`,
          transcriptEn: `Few-shot prompting is a powerful technique that teaches Gemini your expected output format and logic by providing one or more examples in the prompt.

Why Use Few-Shot Prompting:
• Format consistency: Ensures outputs meet specific structural requirements
• Quality control: Sets quality standards through examples
• Complex tasks: Particularly effective for tasks difficult to describe
• Reduces ambiguity: Clearly demonstrates expected results

Practical Example 1 - Sentiment Analysis:
"Please analyse the sentiment of the following comments:

Examples:
Comment: "This product is absolutely brilliant! Exceeded my expectations!"
Sentiment: Positive
Reason: Uses "absolutely brilliant" and "exceeded expectations" - positive language

Comment: "Quality is decent but the price is a bit steep"
Sentiment: Neutral
Reason: Both praise and criticism present, overall balanced assessment

Now please analyse: 'The customer service attitude was terrible, completely ignored my questions'"

Practical Example 2 - Email Format:
"Please write business emails following this format:

Example:
Subject: Regarding Q3 Market Research Report Discussion

Dear [Name],

I hope you're well. I'm writing to discuss matters related to the Q3 market research report.

[Specific content]

Looking forward to your response.

Kind regards,
[Your name]

Now please write an email for the following situation: Inviting clients to a new product launch event"

Best Practices:
1. Choose 2-3 representative examples
2. Ensure examples cover different scenarios
3. Clearly mark input and output
4. Provide brief explanations
5. Keep examples relevant and practical

This method is particularly effective for tasks requiring strict formatting or complex logic.`,
          keyPoints: ['範例教學', '格式一致', '品質控制', '複雜任務', '實用範例'],
          keyPointsEn: ['Example teaching', 'Format consistency', 'Quality control', 'Complex tasks', 'Practical examples'],
          completed: false
        },
        {
          id: 4,
          title: '5.4 連續追問：迭代優化答案',
          titleEn: '5.4 Iteration: Refine via Follow‑ups',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '用連續追問調整語氣、充實內容、總結要點。',
          descriptionEn: 'Use follow‑ups to adjust tone, expand content, or summarise key points.',
          image: '',
          imageAlt: '迭代',
          imageAltEn: 'Iteration',
          transcript: `迭代優化是與 Gemini 協作的核心技巧。將對話視為一個協作過程，通過連續的追問和調整，逐步完善結果。

迭代優化的優勢：
• 精確化：逐步調整到符合需求
• 個性化：根據反饋調整風格和內容
• 深化：逐步展開特定面向
• 效率：避免一次性提供過多要求

常用迭代指令：

1. 語調調整：
• 「請用更專業的語調重寫」
• 「請讓語氣更加親切和易懂」
• 「請使用更正式的商務用語」

2. 內容擴展：
• 「請詳細解釋第三點」
• 「為第二個建議提供更多實例」
• 「加入更多關於風險評估的細節」

3. 結構調整：
• 「請將這份報告壓縮成五個要點」
• 「請重新組織，先說結論再說理由」
• 「請分成三個段落，每段不超過 150 字」

4. 格式轉換：
• 「請轉換成表格格式」
• 「請以條列式呈現」
• 「請製作成簡報大綱」

實際範例：

初始提示：「幫我分析這個產品的市場機會」

第一次迭代：「請特別展開競爭分析部分」

第二次迭代：「請加入具體的數據和市場份額資訊」

第三次迭代：「請將整份分析整理成一份具有執行性的行動計劃」

最佳實踐：
1. 一次只調整一個面向
2. 提供具體的指導
3. 利用上下文連續性
4. 不斷測試和調整
5. 保存有用的中間結果

這種方法能夠幫助您從一個粗略的想法逐步打造出精緻、實用的最終成果。`,
          transcriptEn: `Iterative optimisation is a core technique for collaborating with Gemini. Treat the conversation as a collaborative process, gradually perfecting results through continuous follow-ups and adjustments.

Advantages of Iterative Optimisation:
• Precision: Gradually adjust to meet requirements
• Personalisation: Adapt style and content based on feedback
• Deepening: Progressively expand specific aspects
• Efficiency: Avoid providing too many requirements at once

Common Iterative Commands:

1. Tone Adjustment:
• "Please rewrite this in a more professional tone"
• "Make the language more friendly and approachable"
• "Please use more formal business language"

2. Content Expansion:
• "Please elaborate on the third point in detail"
• "Provide more examples for the second recommendation"
• "Add more details about risk assessment"

3. Structural Adjustment:
• "Please compress this report into five key points"
• "Reorganise this to present conclusions first, then reasoning"
• "Please divide into three paragraphs, each no more than 150 words"

4. Format Conversion:
• "Please convert this to table format"
• "Present this as a bullet-point list"
• "Create a presentation outline from this"

Practical Example:

Initial prompt: "Help me analyse the market opportunities for this product"

First iteration: "Please particularly expand the competitive analysis section"

Second iteration: "Please add specific data and market share information"

Third iteration: "Please organise the entire analysis into an actionable business plan"

Best Practices:
1. Adjust only one aspect at a time
2. Provide specific guidance
3. Utilise contextual continuity
4. Continuously test and adjust
5. Save useful intermediate results

This approach helps you gradually craft refined, practical final results from a rough initial idea.`,
          keyPoints: ['迭代優化', '連續追問', '協作過程', '逐步完善', '品質提升'],
          keyPointsEn: ['Iterative optimisation', 'Continuous follow-ups', 'Collaborative process', 'Gradual refinement', 'Quality improvement'],
          completed: false
        },
        {
          id: 5,
          title: '5.5 實用提示範例庫：工作/學習/創意',
          titleEn: '5.5 Prompt Library: Work/Study/Creative',
          duration: '12 分鐘',
          durationEn: '12 Minutes',
          type: 'text',
          description: '郵件、會議記錄、數據分析、科普解釋、測驗生成與文案。',
          descriptionEn: 'Emails, minutes, data analysis, explanations, quiz generation and copywriting.',
          image: '',
          imageAlt: '範例庫',
          imageAltEn: 'Library',
          transcript: `以下是精心整理的實用提示範例庫，涵蓋工作、學習和創意三大領域。您可以直接複製使用，並根據具體需求進行調整。

✨ 工作場景

1. 商務郵件撰寫：
「作為一位專業的商務沟通專家，請幫我撰寫一封郵件給 [收件人]，主題是 [具體事項]。請保持正式但友善的語調，包含明確的行動要求和時間表。」

2. 會議紀錄整理：
「請將以下會議錄音整理成結構化的會議紀錄，包含：1) 主要議題 2) 決議事項 3) 行動項目（負責人 + 時間） 4) 下次會議安排。請使用清晰的條列式格式。」

3. 數據分析報告：
「作為一位資深數據分析師，請分析這份 [數據類型] 數據，提供：1) 數據概覽 2) 關鍵趨勢和模式 3) 異常值或值得關注的發現 4) 商業建議。請使用清晰的視覺化建議。」

4. 專案計劃書：
「請為 [專案名稱] 制定一份完整的專案計劃，包含：1) 專案目標和成功指標 2) 時程表和里程碑 3) 資源需求和預算 4) 風險評估和緩解策略 5) 溝通計劃。期程 [時間範圍]。」

🎓 學習場景

5. 概念解釋：
「作為一位優秀的教育工作者，請用簡單易懂的方式解釋 [概念名稱]。請包含：1) 核心定義 2) 日常生活中的類比 3) 實際應用例子 4) 常見誤解澄清。目標受眾是 [目標受眾]。」

6. 測驗題目生成：
「請為 [主題] 設計 10 道選擇題，難度為 [難度等級]。每道題目包含：1) 明確的問題描述 2) 4 個選項（其中 1 個正確答案） 3) 答案解釋。請確保題目涵蓋不同的知識點。」

7. 學習計劃制定：
「請為我制定一個 [時間長度] 的 [學習主題] 學習計劃。我的背景是 [背景描述]，目標是 [學習目標]。請包含：1) 學習路徑和進度 2) 推薦資源 3) 實踐練習 4) 進度評估方法。」

🎨 創意場景

8. 內容創意發想：
「作為一位富有創意的內容策劃師，請為 [品牌/產品] 發想 15 個 [內容類型] 創意想法。目標受眾是 [目標受眾]，主要目標是 [營銷目標]。請為每個想法提供簡短的執行說明。」

9. 產品文案撰寫：
「請為 [產品名稱] 撰寫吸引人的產品文案。產品特點：[特點列表]。目標客戶：[客戶描述]。請包含：1) 吸引人的標題 2) 痛點識別 3) 產品優勢 4) 社會證明 5) 行動呼籲。語調要 [語調要求]。」

10. 社交媒體內容：
「請為 [平台名稱] 創作 7 天的內容日曆，主題是 [主題]。每天包含：1) 內容類型 2) 文案內容 3) 推薦的視覺元素 4) 最佳發佈時間 5) 相關標籤。請確保內容多元化且具有互動性。」

📝 使用技巧：
1. 根據具體情況調整方括號內的內容
2. 保留範例的結構，更換具體細節
3. 結合多個範例來處理複雜任務
4. 在提示末尾加上特定的格式要求
5. 定期更新和優化您的提示庫

這些範例都經過實際測試，可以直接使用或作為基礎進行客製化調整。`,
          transcriptEn: `Below is a carefully curated library of practical prompt examples covering work, study, and creative domains. You can copy these directly and adjust them according to your specific needs.

✨ Work Scenarios

1. Business Email Writing:
"As a professional business communication expert, please help me write an email to [recipient] about [specific matter]. Please maintain a formal but friendly tone, include clear action requests and timeline. Please keep it professional yet approachable."

2. Meeting Minutes Organisation:
"Please organise the following meeting recording into structured meeting minutes, including: 1) Main agenda items 2) Decisions made 3) Action items (responsible person + timeline) 4) Next meeting arrangements. Please use clear bullet-point format."

3. Data Analysis Report:
"As a senior data analyst, please analyse this [data type] data and provide: 1) Data overview 2) Key trends and patterns 3) Anomalies or noteworthy findings 4) Business recommendations. Please include clear visualisation suggestions."

4. Project Planning:
"Please create a comprehensive project plan for [project name], including: 1) Project objectives and success metrics 2) Timeline and milestones 3) Resource requirements and budget 4) Risk assessment and mitigation strategies 5) Communication plan. Duration: [time range]."

🎓 Study Scenarios

5. Concept Explanation:
"As an excellent educator, please explain [concept name] in simple, understandable terms. Please include: 1) Core definition 2) Everyday analogies 3) Practical application examples 4) Common misconceptions clarification. Target audience: [target audience]."

6. Quiz Generation:
"Please design 10 multiple-choice questions for [topic], difficulty level [difficulty level]. Each question should include: 1) Clear question description 2) 4 options (1 correct answer) 3) Answer explanation. Please ensure questions cover different knowledge points."

7. Study Plan Creation:
"Please create a [duration] study plan for [learning topic]. My background: [background description], goal: [learning objective]. Please include: 1) Learning path and progress 2) Recommended resources 3) Practical exercises 4) Progress assessment methods."

🎨 Creative Scenarios

8. Content Brainstorming:
"As a creative content strategist, please brainstorm 15 [content type] creative ideas for [brand/product]. Target audience: [target audience], main objective: [marketing goal]. Please provide brief execution instructions for each idea."

9. Product Copywriting:
"Please write compelling product copy for [product name]. Product features: [feature list]. Target customers: [customer description]. Please include: 1) Attention-grabbing headline 2) Pain point identification 3) Product advantages 4) Social proof 5) Call to action. Tone: [tone requirements]."

10. Social Media Content:
"Please create a 7-day content calendar for [platform name], theme: [theme]. Each day should include: 1) Content type 2) Copy content 3) Recommended visual elements 4) Optimal posting time 5) Relevant hashtags. Please ensure content diversity and interactivity."

📝 Usage Tips:
1. Adjust content in square brackets according to specific situations
2. Keep the example structure, replace specific details
3. Combine multiple examples for complex tasks
4. Add specific format requirements at the end of prompts
5. Regularly update and optimise your prompt library

These examples have all been practically tested and can be used directly or as a foundation for customised adjustments.`,
          keyPoints: ['工作場景', '學習場景', '創意場景', '即用範例', '客製化調整'],
          keyPointsEn: ['Work scenarios', 'Learning scenarios', 'Creative scenarios', 'Ready-to-use examples', 'Customisable adjustments'],
          completed: false
        }
      ],
      quiz: {
        title: '第五章測驗：提示工程',
        titleEn: 'Chapter 5 Quiz: Prompting',
        timeLimit: 15,
        passingScore: 60,
        questions: [
          { id: 1, question: '「賦予角色」是指？', questionEn: 'Assigning a role means?', type: 'single', options: ['請 Gemini 扮演特定角色','選頭像','設定權限','給對話取名'], optionsEn: ['Ask Gemini to play a role','Choose avatar','Set permissions','Name the chat'], correctAnswer: 0, explanation: '可設定語氣、風格與知識領域。', explanationEn: 'Sets tone, style and domain.' },
          { id: 2, question: '獲得結構化回答的技巧？', questionEn: 'Best for structured answers?', type: 'single', options: ['單詞提問','明確要求格式','全大寫','重複問題'], optionsEn: ['One‑word prompt','Specify format clearly','ALL CAPS','Repeat question'], correctAnswer: 1, explanation: '直接指定輸出表格/JSON 等格式。', explanationEn: 'Specify table/JSON formats.' },
          { id: 3, question: '連鎖思考提示法？', questionEn: 'Chain‑of‑thought?', type: 'single', options: ['串長篇故事','請一步一步思考或提供範例','把無關問題連在一起','引用思想來源'], optionsEn: ['Long story','Think step by step or give example','Join unrelated questions','Cite its thoughts'], correctAnswer: 1, explanation: '有助多步推理與準確率。', explanationEn: 'Helps multi‑step reasoning and accuracy.' },
          { id: 4, question: '最佳利用多模態的提示？', questionEn: 'Best multimodal prompt?', type: 'single', options: ['好看嗎','何時拍的','解讀圖表並找異常','轉黑白'], optionsEn: ['Nice?','When taken?','Interpret chart and find anomalies','Make B/W'], correctAnswer: 2, explanation: '結合圖像理解與數據分析。', explanationEn: 'Combines vision and data analysis.' },
          { id: 5, question: '答案不準確時的最佳下一步？', questionEn: 'Best next step when answer is off?', type: 'single', options: ['放棄','提供更多上下文或換角度','重開網頁','威脅它'], optionsEn: ['Give up','Provide more context or new angle','Reload page','Threaten it'], correctAnswer: 1, explanation: '透過迭代與補充資訊修正輸出。', explanationEn: 'Iterate with more context or angle.' }
        ]
      }
    },
    {
      id: 6,
      title: '第六章：Gemini 的未來展望與倫理考量',
      titleEn: 'Chapter 6: Future Outlook & Ethics',
      description: '幻覺與偏見、Responsible AI、隱私控制與 Agentic 未來。',
      descriptionEn: 'Hallucination and bias, responsible AI, privacy controls and agentic future.',
      duration: '45 分鐘',
      durationEn: '45 Minutes',
      lessons: [
        {
          id: 1,
          title: '6.1 倫理與未來路線',
          titleEn: '6.1 Ethics and Roadmap',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'text',
          description: 'Responsible AI 原則、資料隱私與 Agent 模式。',
          descriptionEn: 'Responsible AI, data privacy and Agent mode.',
          image: '',
          imageAlt: '倫理',
          imageAltEn: 'Ethics',
          transcript: `Google 在 Gemini 的開發過程中始終將負責任的 AI 原則放在首位，致力於創建安全、公平、有益的人工智能技術。

Google 的 AI 原則：

1. 對社會有益：
• AI 應該幫助解決重要的社會問題
• 促進廣泛的社會和經濟利益
• 考慮對所有利益相關者的影響
• 支持可持續發展目標

2. 避免創造或加強不公平的偏見：
• 積極識別和減少算法偏見
• 確保 AI 系統對所有群體公平
• 定期評估和改進公平性
• 透明地報告偏見緩解措施

3. 建立並測試安全性：
• 嚴格的安全測試和驗證
• 持續監控和改進
• 建立故障安全機制
• 定期安全審計

4. 對人負責：
• 人類始終保持最終控制權
• 提供有意義的人類監督
• 確保可解釋性和透明度
• 建立明確的責任鏈

數據隱私保護：

• 數據最小化：只收集必要的數據
• 用途限制：數據僅用於聲明的目的
• 透明度：清楚說明數據使用方式
• 用戶控制：提供數據管理和刪除選項
• 安全存儲：採用最高級別的安全措施

企業版隱私增強：
• 數據駐留控制：選擇數據存儲位置
• 加密保護：端到端加密傳輸和存儲
• 訪問日誌：完整的數據訪問記錄
• 合規支持：滿足 GDPR、HIPAA 等要求

未來發展方向：

Agent Mode 願景：
• 從工具到夥伴：AI 成為主動的協作夥伴
• 個性化服務：深度理解用戶需求和偏好
• 跨平台整合：無縫連接各種服務和應用
• 智能自動化：處理複雜的多步驟任務

技術路線圖：
• 更強的推理能力
• 更好的多模態理解
• 更自然的對話交互
• 更可靠的事實準確性
• 更廣泛的專業領域知識

倫理挑戰與應對：
• 就業影響：協助而非替代人類工作
• 決策透明：提供可解釋的 AI 決策
• 數字鴻溝：確保技術普及和公平獲取
• 全球治理：參與國際 AI 治理標準制定

這些原則和措施確保 Gemini 的發展始終以人類福祉為中心，在推動技術進步的同時，維護社會價值和倫理標準。`,
          transcriptEn: `Google has consistently prioritised responsible AI principles throughout Gemini's development, committed to creating safe, fair, and beneficial artificial intelligence technology.

Google's AI Principles:

1. Be socially beneficial:
• AI should help solve important social problems
• Promote broad social and economic benefits
• Consider impact on all stakeholders
• Support sustainable development goals

2. Avoid creating or reinforcing unfair bias:
• Actively identify and reduce algorithmic bias
• Ensure AI systems are fair to all groups
• Regularly assess and improve fairness
• Transparently report bias mitigation measures

3. Be built and tested for safety:
• Rigorous safety testing and validation
• Continuous monitoring and improvement
• Establish fail-safe mechanisms
• Regular security audits

4. Be accountable to people:
• Humans always maintain ultimate control
• Provide meaningful human oversight
• Ensure explainability and transparency
• Establish clear chains of responsibility

Data Privacy Protection:
• Data minimisation: Only collect necessary data
• Purpose limitation: Data used only for stated purposes
• Transparency: Clearly explain data usage
• User control: Provide data management and deletion options
• Secure storage: Employ highest-level security measures

Enterprise Privacy Enhancements:
• Data residency control: Choose data storage locations
• Encryption protection: End-to-end encryption for transmission and storage
• Access logging: Complete data access records
• Compliance support: Meet GDPR, HIPAA, and other requirements

Future Development Direction:

Agent Mode Vision:
• From tool to partner: AI becomes a proactive collaborative partner
• Personalised service: Deep understanding of user needs and preferences
• Cross-platform integration: Seamless connection of various services and applications
• Intelligent automation: Handle complex multi-step tasks

Technical Roadmap:
• Stronger reasoning capabilities
• Better multimodal understanding
• More natural conversational interaction
• More reliable factual accuracy
• Broader professional domain knowledge

Ethical Challenges and Responses:
• Employment impact: Assist rather than replace human work
• Decision transparency: Provide explainable AI decisions
• Digital divide: Ensure equitable technology access
• Global governance: Participate in international AI governance standards

These principles and measures ensure Gemini's development always centres on human wellbeing, maintaining social values and ethical standards while advancing technology.`,
          keyPoints: ['AI 原則', '數據隱私', '未來願景', 'Agent Mode', '倖理挑戰'],
          keyPointsEn: ['AI principles', 'Data privacy', 'Future vision', 'Agent Mode', 'Ethical challenges'],
          completed: false
        },
        {
          id: 2,
          title: '6.2 企業級應用：Vertex AI 與 RAG',
          titleEn: '6.2 Enterprise: Vertex AI & RAG',
          duration: '10 分鐘',
          durationEn: '10 Minutes',
          type: 'text',
          description: '定制化、微調與接地（RAG）的企業落地。',
          descriptionEn: 'Fine‑tuning and grounding (RAG) for enterprise.',
          image: '',
          imageAlt: '企業應用',
          imageAltEn: 'Enterprise',
          transcript: `Google 的 Vertex AI 平台為企業級 Gemini 應用提供了強大的基礎設施和進階功能。

Vertex AI 企業優勢：
• 安全性：企業級的安全性和符合性保障
• 可擴展性：支援大規模部署和高併發訪問
• 客製化：支援模型微調和客製化訓練
• 整合性：與 Google Cloud 生態系統深度整合

檢索增強生成（RAG）：
RAG 是企業 AI 應用的核心技術，它能夠：

1. 接地能力：
• 連接企業內部知識庫
• 實時獲取最新資訊
• 確保回應基於事實
• 提供可驗證的來源

2. 減少幻覺：
• 降低編造資訊的風險
• 提高事實準確性
• 增強回應的可信度
• 支援事實核查

3. 實施步驟：
• 数據準備：整理和索引企業文檔
• 向量化：將文檔轉換為向量表示
• 檢索系統：建立高效的相似性搜尋
• 整合流程：將 RAG 與 Gemini 連接

企業治理與安全：
• 數據隱私：企業數據不用於模型訓練
• 訪問控制：細粒度的權限管理
• 審計日誌：完整的使用記錄和追蹤
• 符合性：滿足各種法規要求

常見應用場景：
• 內部知識庫問答
• 文檔自動化處理
• 客戶服務智能化
• 法規符合性檢查
• 研發資料分析`,
          transcriptEn: 'Ground with private data to reduce hallucination; governance and security.',
          keyPoints: ['Vertex AI', 'RAG 技術', '企業治理', '安全措施', '常見應用'],
          keyPointsEn: ['Vertex AI', 'RAG technology', 'Enterprise governance', 'Security measures', 'Common applications'],
          completed: false
        },
        {
          id: 3,
          title: '6.3 負責任的 AI：理解限制與偏見',
          titleEn: '6.3 Responsible AI: Limits & Bias',
          duration: '10 分鐘',
          durationEn: '10 Minutes',
          type: 'text',
          description: '幻覺、偏見、隱私與高風險場景。',
          descriptionEn: 'Hallucination, bias, privacy and high‑risk scenarios.',
          image: '',
          imageAlt: 'Responsible AI',
          imageAltEn: 'Responsible AI',
          transcript: `負責任的 AI 使用是確保 Gemini 能夠安全、公平和有效地為人類服務的關鍵。理解其限制和潛在風險是明智使用的第一步。

主要風險類型：

1. 幻覺（Hallucination）：
• 定義：AI 生成看似合理但實際不正確的資訊
• 常見情況：編造事實、虛構引用、錯誤統計
• 緩解策略：交叉驗證、要求來源、使用 RAG

2. 偏見（Bias）：
• 類型：性別、種族、年齡、文化偏見
• 來源：訓練數據中的歷史偏見
• 識別方法：多角度測試、敏感性分析

3. 隱私風險：
• 數據洩漏：意外揭露敏感資訊
• 記憶效應：模型可能「記住」輸入內容
• 保護措施：避免輸入敏感資訊、使用企業版本

實用檢查清單：

✅ 事實核查：
• 重要事實需要獨立驗證
• 檢查引用來源的真實性
• 對數字和統計特別謹慎
• 避免在醫療、法律等高風險領域直接應用

✅ 偏見檢測：
• 測試不同人群的回應
• 檢查語言和描述的公平性
• 避免強化刻板印象
• 尋求多元觀點

✅ 隱私保護：
• 不輸入個人識別資訊
• 避免分享商業機密
• 使用企業版本以獲得更好保護
• 定期清理對話歷史

高風險應用場景：
• 醫療診斷和治療建議
• 法律意見和合約審查
• 金融投資決策
• 安全關鍵系統控制
• 人事決策和績效評估

在這些領域，建議：
• 使用 AI 作為輔助工具而非最終決策者
• 結合專業人士的審查和指導
• 建立多層次的檢查機制
• 保持透明度和可解釋性`,
          transcriptEn: 'Explain common risks and provide verification/privacy checklist.',
          keyPoints: ['幻覺風險', '偏見問題', '隱私保護', '檢查清單', '高風險場景'],
          keyPointsEn: ['Hallucination risks', 'Bias issues', 'Privacy protection', 'Verification checklist', 'High-risk scenarios'],
          completed: false
        },
        {
          id: 4,
          title: '6.4 未來的 AI 助理：Agent 模式',
          titleEn: '6.4 Agentic Future',
          duration: '8 分鐘',
          durationEn: '8 Minutes',
          type: 'text',
          description: '從工具到代理人：主動、多步與跨應用協作。',
          descriptionEn: 'From tool to agent: proactive, multi‑step, cross‑app collaboration.',
          image: '',
          imageAlt: 'Agent 模式',
          imageAltEn: 'Agent mode',
          transcript: `Agent Mode 代表了 AI 技術的下一個重大躍進：從被動的工具轉變為主動的智能代理人。這種模式將彼底改變我們與 AI 的互動方式。

Agent Mode 的核心特點：

1. 主動性：
• 主動提出建議和解決方案
• 預測用戶需求和偏好
• 自動化日常任務和流程
• 持續學習和適應用戶習慣

2. 多步驟推理：
• 將複雜任務分解成子任務
• 順序執行並調整策略
• 處理依賴關係和約束條件
• 在過程中學習和改進

3. 跨應用協作：
• 整合多個 Google 服務
• 與第三方應用連接
• 統一的數據和上下文管理
• 無縫的用戶體驗

典型應用場景：

🏨 旅行規劃：
「幫我規劃下個月去東京的 5 天行程」
→ 查詢航班和酒店
→ 建議景點和餐廳
→ 創建日程表
→ 預訂所有必要服務
→ 同步到日曆和地圖

💼 工作流程自動化：
「幫我準備下週的專案報告」
→ 從 Gmail 和 Drive 收集相關資料
→ 分析數據和產生圖表
→ 撰寫報告大綱
→ 安排會議並發送邀請
→ 準備簡報材料

🎉 活動組織：
「組織一個團隊聚餐」
→ 檢查團隊成員的日曆可用性
→ 建議適合的餐廳和時間
→ 發送邀請並收集回覆
→ 預訂餐廳和安排交通
→ 提醒所有參與者

技術實現原理：
• 連鎖推理：將大目標分解成小步驟
• 工具調用：自動使用各種 API 和服務
• 上下文管理：跨任務保持資訊連貫性
• 錯誤處理：智能重試和替代方案

未來展望：
• 更深度的個性化學習
• 更廣泛的第三方整合
• 更複雜的多步驟任務處理
• 更自然的人機協作模式

Agent Mode 不僅是技術升級，更是一種全新的人機互動範式，它將讓 AI 成為真正的智能助手，主動幫助用戶解決問題和完成目標。`,
          transcriptEn: 'Explain Agent Mode goals and tasks (trip planning, booking, calendar).',
          keyPoints: ['主動性', '多步驟推理', '跨應用協作', '智能代理', '未來展望'],
          keyPointsEn: ['Proactivity', 'Multi-step reasoning', 'Cross-app collaboration', 'Intelligent agents', 'Future prospects'],
          completed: false
        }
      ],
      quiz: {
        title: '第六章測驗：未來與倫理',
        titleEn: 'Chapter 6 Quiz: Future & Ethics',
        timeLimit: 15,
        passingScore: 60,
        questions: [
          { id: 1, question: '「幻覺」是指？', questionEn: 'What is hallucination?', type: 'single', options: ['AI 有情感','自信但錯誤/虛構資訊','藝術風格圖像','拒答敏感問題'], optionsEn: ['AI emotions','Confident but wrong/fictional info','Hallucinatory images','Refuse sensitive Qs'], correctAnswer: 1, explanation: '聽起來合理但實際錯誤或虛構。', explanationEn: 'Plausible but wrong or fabricated info.' },
          { id: 2, question: '偏見產生的原因？', questionEn: 'Why bias occurs?', type: 'single', options: ['AI 有觀點','訓練數據含社會偏見','工程師故意加入','為多樣化隨機產生'], optionsEn: ['AI opinions','Training data carries societal bias','Engineers add it intentionally','Random for diversity'], correctAnswer: 1, explanation: '數據本身包含偏見與刻板印象。', explanationEn: 'Data contains societal biases and stereotypes.' },
          { id: 3, question: 'Responsible AI 原則不包含？', questionEn: 'NOT in responsible AI principles?', type: 'single', options: ['社會有益','安全建置與測試','對人負責','保證 100% 利潤增長'], optionsEn: ['Be socially beneficial','Built/tested for safety','Be accountable to people','Guarantee 100% profit growth'], correctAnswer: 3, explanation: '這是商業目標而非倫理原則。', explanationEn: 'A business goal, not an ethical principle.' },
          { id: 4, question: '未來最符合展望的方向？', questionEn: 'Most aligned future direction?', type: 'single', options: ['更好計算機','更主動且情境化的通用助理','完全取代創意工作','只保留文字功能'], optionsEn: ['Better computer','Proactive, contextual general assistant','Replace all creative work','Keep only text'], correctAnswer: 1, explanation: '走向無縫、主動、情境化的通用助理。', explanationEn: 'Toward a seamless, proactive, contextual assistant.' },
          { id: 5, question: '正確的隱私敘述？', questionEn: 'Correct privacy statement?', type: 'single', options: ['全部公開','員工可隨意查看','用戶可檢視與刪除活動記錄並管理隱私','無法刪除任何資訊'], optionsEn: ['All public','Staff can browse freely','Users can view/delete activity and manage privacy','Nothing deletable'], correctAnswer: 2, explanation: '可查看與刪除活動記錄並調整設定。', explanationEn: 'Users can review/delete activity and adjust settings.' }
        ]
      }
    }
  ]
};

export default geminiCourseData;


