export const perplexityCourseData = {
  courseInfo: {
    badge: '免費完整課程',
    badgeEn: 'Free Complete Course',
    title: 'Perplexity AI 終極大師課程',
    titleEn: 'Perplexity AI Ultimate Master Course',
    subtitle: '從基礎概念到高階應用，全面掌握 Perplexity 的核心技能與實戰技巧，成為 AI 時代的數位專家。',
    subtitleEn: 'From fundamental concepts to advanced applications, comprehensively master Perplexity\'s core skills and practical techniques to become a digital expert in the AI era.',
    instructor: 'AI Formula 團隊',
    instructorEn: 'AI Formula Team',
    instructorTitle: 'AI 應用專家',
    instructorTitleEn: 'AI Application Specialists',
    rating: 4.8,
    students: 200,
    duration: '8+ 小時',
    durationEn: '8+ Hours',
    lastUpdated: '2024-12-12'
  },
  courseStats: {
    totalHours: 8,
    totalLessons: 25,
    totalQuizzes: 6,
    completionRate: 92
  },
  courseFeatures: [
    '深度理論基礎',
    '實戰技能訓練', 
    '知識管理工作流',
    '8+ 小時深度學習',
    '線上自學',
    '專業深度內容',
    '6大章節 25+單元'
  ],
  targetAudience: [
    '職場工作者：希望運用 AI 工具提升工作效率的專業人士',
    '創業者與自由工作者：需要利用 AI 降低營運成本的獨立工作者',
    '學生與研究者：希望大幅加快學術研究效率的學生及教研人員',
    '技術愛好者：對最新興技術充滿好奇的科技愛好者'
  ],
  courseModules: [
    {
      id: 1,
      title: '第一章：Perplexity AI 入門',
      titleEn: 'Chapter 1: Perplexity AI Fundamentals',
      description: '重新定義資訊搜索',
      descriptionEn: 'Redefining Information Search',
      duration: '1.5 小時',
      lessons: [
        {
          id: 1,
          title: '1.1 什麼是 Perplexity AI？——「答案引擎」vs 搜索引擎',
          titleEn: '1.1 What is Perplexity AI? — "Answer Engine" vs Search Engine',
          duration: '15 分鐘',
          durationEn: '15 minutes',
          type: 'text' as const,
          description: '深入了解 Perplexity AI 的核心概念、工作原理和獨特定位，理解它與傳統搜索引擎的根本差異。',
          descriptionEn: 'Gain deep understanding of Perplexity AI\'s core concepts, working principles, and unique positioning, and comprehend its fundamental differences from traditional search engines.',
          image: '/images/courses/perplexity-complete-course/unit-images/perplexity-concept.png',
          imageAlt: 'Perplexity AI 答案引擎概念圖解',
          transcript: `Perplexity AI 將自己定位為「答案引擎」（Answer Engine），這個稱呼並非僅僅是營銷術語，而是對其核心價值主張的精確描述。與傳統搜索引擎（如 Google、Bing）提供網頁連結列表不同，Perplexity 致力於為用戶提供一個直接、綜合且附有引用來源的答案。

傳統搜索引擎的工作模式是：用戶輸入查詢 → 搜索引擎返回相關網頁列表 → 用戶需要點擊多個連結、閱讀不同來源、自行整合資訊。這個過程往往耗時且效率低下，特別是當用戶需要快速獲得準確答案時。

Perplexity 的革命性在於它改變了這個流程：用戶輸入問題 → Perplexity 即時搜索、分析並整合多個來源 → 直接提供一個結構化、有引用來源的綜合答案。這種模式讓用戶能夠在幾秒鐘內獲得高質量、可驗證的資訊，大幅提升了資訊獲取的效率。

Perplexity 的核心使命是「將知識的獲取民主化」（Democratizing Access to Knowledge）。這意味著無論用戶的技術背景如何，都能輕鬆獲得高質量、準確的資訊。通過結合先進的大型語言模型和即時網絡搜索，Perplexity 打破了傳統搜索的局限性，讓知識變得更加觸手可及。

在實際應用中，Perplexity 特別擅長處理複雜的、需要多源整合的查詢。例如，當你問「2024年人工智能領域最重要的突破是什麼？」時，Perplexity 會搜索最新的新聞報導、學術論文和技術報告，然後提供一個結構化的答案，並標明每個論點的具體來源。`,
          keyPoints: [
            'Perplexity AI 定位為「答案引擎」，直接提供綜合答案而非網頁連結列表',
            '革命性地改變了資訊獲取流程：從「搜索→瀏覽→整合」變為「提問→獲得答案」',
            '核心使命是將知識獲取民主化，讓所有用戶都能輕鬆獲得高質量資訊',
            '特別擅長處理複雜的、需要多源整合的查詢，提供結構化且有引用來源的答案'
          ],
          completed: false
        },
        {
          id: 2,
          title: '1.2 Perplexity 的核心使命：知識民主化',
          titleEn: '1.2 Perplexity\'s Core Mission: Democratizing Knowledge',
          duration: '18 分鐘',
          durationEn: '18 minutes',
          type: 'text' as const,
          description: '探討 Perplexity 的願景和使命，理解它如何通過技術創新實現知識獲取的民主化。',
          descriptionEn: 'Explore Perplexity\'s vision and mission, understanding how it democratizes knowledge acquisition through technological innovation.',
          image: '/images/courses/perplexity-complete-course/unit-images/knowledge-democratization.png',
          imageAlt: '知識民主化概念圖',
          transcript: `「知識民主化」是 Perplexity AI 的核心理念，這個概念遠超出了技術本身，涉及到資訊公平性、教育機會均等以及認知負擔的降低。在傳統的資訊獲取模式中，獲得高質量、準確資訊往往需要特定的技能：知道如何使用正確的關鍵詞、理解如何評估來源可靠性、具備整合多個資訊源的能力。這些技能上的門檻創造了「資訊鴻溝」，讓一些人比其他人更容易獲得所需的知識。

Perplexity 通過其先進的 AI 技術，大幅降低了這些門檻。用戶只需要用自然語言提出問題，無需掌握複雜的搜索技巧或關鍵詞優化策略。AI 會自動理解用戶的意圖，搜索相關資訊，並提供結構化的答案。這種設計哲學讓知識變得更加親民和accessible。

更重要的是，Perplexity 的引用系統（Citations）確保了資訊的透明度和可驗證性。每個答案都會標明具體的來源，用戶可以輕鬆追溯資訊的出處，這不僅提高了答案的可信度，也培養了用戶的批判性思維能力。

在教育和學術研究領域，這種民主化特別有意義。學生和研究人員可以快速進行文獻綜述、尋找最新研究並輕鬆追溯來源，大大提高了學習和研究的效率。對於專業人士而言，Perplexity 成為了一個強大的決策支持工具，幫助他們在快速變化的商業環境中保持資訊優勢。`,
          keyPoints: [
            '知識民主化旨在消除資訊鴻溝，讓所有人都能平等地獲得高質量資訊',
            '降低了資訊獲取的技能門檻，用戶只需用自然語言提問即可獲得專業級答案',
            '引用系統確保資訊透明度和可驗證性，培養用戶的批判性思維',
            '在教育、學術研究和專業決策領域具有特別重要的意義和價值'
          ],
          completed: false
        },
        {
          id: 3,
          title: '1.3 與 ChatGPT、Google 的差異化競爭優勢',
          titleEn: '1.3 Competitive Advantages vs ChatGPT and Google',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'text' as const,
          description: '深入比較 Perplexity AI 與主流競爭對手的核心差異，理解各自的優勢和適用場景。',
          descriptionEn: 'Deep comparison of Perplexity AI with mainstream competitors, understanding their respective advantages and applicable scenarios.',
          image: '/images/courses/perplexity-complete-course/unit-images/ai-comparison.png',
          imageAlt: 'AI 工具比較分析圖',
          transcript: `要真正理解 Perplexity AI 的價值，我們需要將它與當前市場上的主要競爭對手進行深入比較。主要的競爭對手包括傳統搜索引擎（如 Google）和生成式 AI 工具（如 ChatGPT）。

與 Google 的差異：
Google 是世界上最大的搜索引擎，擅長索引和檢索網頁資訊。但 Google 的核心模式是提供資訊位置（網頁連結），而不是資訊本身。用戶需要自己點擊、閱讀、篩選和整合資訊。Perplexity 則直接提供整合後的答案，大幅減少了用戶的工作量。

另一個關鍵差異是資訊的時效性。Google 雖然能搜索到最新資訊，但用戶需要自己判斷哪些資訊是最新、最相關的。Perplexity 的 AI 會自動優先考慮最新、最權威的來源，並在答案中明確標示資訊的時間和來源。

與 ChatGPT 的差異：
ChatGPT 是一個強大的對話式 AI，擅長創意寫作、代碼生成、問題解決等任務。但 ChatGPT 的知識截止到訓練數據的時間點，無法獲取最新資訊。而且，ChatGPT 的回答有時可能包含「幻覺」（hallucination），即生成看似合理但實際錯誤的資訊。

Perplexity 通過即時搜索解決了這兩個問題：它能獲取最新資訊，並通過引用真實來源來減少幻覺現象。當 Perplexity 提供答案時，每個論點都有明確的來源支持，用戶可以輕鬆驗證資訊的準確性。

Perplexity 的獨特定位：
Perplexity 最大的優勢在於它結合了搜索引擎的即時性和生成式 AI 的理解能力。它特別適合需要高準確性和最新資訊的事實密集型研究，如學術研究、新聞追蹤、市場分析等。對於需要創意或開放式討論的任務，ChatGPT 可能更合適；對於需要廣泛瀏覽或購物的需求，Google 仍然是首選。`,
          keyPoints: [
            'Google 提供資訊位置，Perplexity 提供整合後的答案，大幅減少用戶工作量',
            'ChatGPT 知識有時效限制且可能產生幻覺，Perplexity 通過即時搜索和引用來源解決這些問題',
            'Perplexity 結合了搜索引擎的即時性和生成式 AI 的理解能力',
            '特別適合事實密集型、需要最新資訊的研究任務，如學術研究、新聞追蹤、市場分析'
          ],
          completed: false
        },
        {
          id: 4,
          title: '1.4 Citations 的重要性：建立可信的資訊來源',
          titleEn: '1.4 The Importance of Citations: Building Reliable Information Sources',
          duration: '17 分鐘',
          durationEn: '17 minutes',
          type: 'text' as const,
          description: '深入了解 Perplexity 的引用系統如何確保資訊可靠性，以及如何有效利用這個功能。',
          descriptionEn: 'Understand how Perplexity\'s citation system ensures information reliability and how to effectively utilize this feature.',
          image: '/images/courses/perplexity-complete-course/unit-images/citations-system.png',
          imageAlt: '引用來源系統示意圖',
          transcript: `Citations（引用來源）是 Perplexity AI 最具革命性的功能之一，它不僅是技術特色，更是建立用戶信任和確保資訊質量的核心機制。在資訊爆炸的時代，辨別真假資訊變得越來越困難，而 Perplexity 的引用系統為這個問題提供了一個優雅的解決方案。

引用系統的工作原理：
當 Perplexity 生成答案時，它會為每個關鍵論點標註具體的來源。這些來源以數字標記的形式出現在文本中，用戶可以點擊查看原始網頁。這種設計讓用戶能夠：
1. 驗證資訊的準確性
2. 深入閱讀原始材料
3. 評估來源的權威性
4. 追蹤資訊的發布時間

信任三角（Trust Triangle）：
Perplexity 提出了「信任三角」的概念，包括三個核心要素：
- 綜合（Synthesis）：AI 整合多個來源的能力
- 引用（Citation）：為每個論點提供可驗證的來源
- 控制（Control）：用戶對資訊來源和搜索範圍的控制權

這個框架確保了 Perplexity 不僅提供便利，更提供可信度。

實際應用價值：
對於學生和研究人員來說，引用系統大大簡化了文獻綜述的過程。傳統上，研究人員需要花費大量時間搜索、閱讀和整理相關文獻。Perplexity 能夠快速識別最相關的來源，並提供初步的綜合分析，研究人員可以基於這些引用進行深入研究。

對於專業人士，引用系統提供了決策依據的透明度。當需要向同事或客戶解釋某個分析結論時，可以輕鬆指向具體的數據來源和報告，提高了專業可信度。

批判性思維的培養：
引用系統不僅提供便利，還培養了用戶的批判性思維。通過查看不同來源，用戶可以：
- 比較不同觀點
- 識別潛在偏見
- 評估證據強度
- 形成更全面的理解`,
          keyPoints: [
            'Citations 為每個論點提供可驗證的來源，確保資訊透明度和可信度',
            '「信任三角」包括綜合、引用、控制三個要素，建立完整的信任框架',
            '大大簡化學術研究和專業分析的文獻綜述過程',
            '培養用戶批判性思維，促進多角度思考和深度理解'
          ],
          completed: false
        },
        {
          id: 5,
          title: '1.5 適用場景分析：何時選擇 Perplexity？',
          duration: '20 分鐘',
          type: 'text' as const,
          description: '掌握 Perplexity AI 的最佳使用場景，學會在不同情況下選擇最合適的 AI 工具。',
          image: '/images/courses/perplexity-complete-course/unit-images/use-cases.png',
          imageAlt: 'Perplexity 使用場景分析圖',
          transcript: `理解何時使用 Perplexity 是掌握這個工具的關鍵。雖然 Perplexity 功能強大，但它並非適用於所有情況。正確的場景選擇能夠最大化工具的價值，提高工作效率。

Perplexity 的最佳使用場景：

1. 事實驗證和資訊查證
當你需要快速驗證某個事實、數據或新聞時，Perplexity 是理想選擇。它能夠搜索多個可靠來源，提供基於事實的答案，並標明每個論點的具體出處。

2. 學術研究和文獻綜述
對於學生、研究人員和學者，Perplexity 能夠快速識別相關研究、總結關鍵發現，並提供引用來源。這大大加速了研究的初期階段。

3. 市場調研和行業分析
商業專業人士可以使用 Perplexity 快速了解行業趨勢、競爭對手動態、市場數據等。AI 會整合來自不同來源的資訊，提供全面的市場概況。

4. 新聞和時事追蹤
當你想了解某個新聞事件的最新發展、背景資訊或不同觀點時，Perplexity 能夠提供及時、全面的資訊整合。

5. 技術問題解決
對於技術相關的問題，特別是需要最新解決方案的情況，Perplexity 能夠搜索最新的技術文檔、論壇討論和官方指南。

何時不適合使用 Perplexity：

1. 創意寫作和頭腦風暴
對於需要原創性和創造力的任務，如創意寫作、詩歌創作或開放式頭腦風暴，ChatGPT 等工具可能更合適。

2. 深度程式設計
雖然 Perplexity 能解答程式設計問題，但對於複雜的代碼開發、debugging 或架構設計，專門的編程 AI 工具或 IDE 插件可能更有效。

3. 個人對話和情感支持
Perplexity 主要關注事實性資訊，對於需要情感理解或個人化對話的場景，其他對話式 AI 可能更適合。

4. 本地化或私密資訊
如果你的查詢涉及個人隱私、公司內部資訊或需要訊問本地資源，傳統搜索或內部知識庫可能更合適。

最佳實踐建議：
- 將 Perplexity 作為研究的起點，然後使用其他工具進行深入分析
- 結合多個 AI 工具的優勢，創建混合工作流程
- 始終驗證重要資訊，特別是用於關鍵決策的資料
- 利用引用功能深入閱讀原始來源`,
          keyPoints: [
            '最適合事實驗證、學術研究、市場調研、新聞追蹤等需要最新準確資訊的場景',
            '不適合創意寫作、深度程式設計、個人對話等需要創造力或個人化的任務',
            '應作為研究起點，結合其他工具創建混合工作流程',
            '始終驗證重要資訊，充分利用引用功能深入了解原始來源'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第一章測驗：Perplexity AI 入門',
        description: '測試你對 Perplexity AI 基礎概念的理解。',
        timeLimit: 15,
        questions: [
          {
            question: 'Perplexity AI 將自己定位為「答案引擎」，這與傳統搜索引擎最主要的區別是什麼？',
            options: [
              'Perplexity 的頁面是藍色的，而 Google 是白色的。',
              'Perplexity 只搜索學術網站。',
              'Perplexity 提供一個直接、綜合且附有引用來源的答案，而非僅僅是一個網頁連結列表。',
              'Perplexity 完全離線運作，不連接互聯網。'
            ],
            correctAnswer: 2,
            explanation: 'Perplexity 提供直接、綜合且有引用來源的答案，這是最大分別。'
          },
          {
            question: '根據課程內容，Perplexity 的核心使命是？',
            options: [
              '成為全球最大的廣告平台。',
              '將知識的獲取民主化。',
              '取代所有社交媒體應用。',
              '開發最先進的電子遊戲。'
            ],
            correctAnswer: 1,
            explanation: 'Perplexity 的使命是將知識獲取民主化。'
          },
          {
            question: '與 ChatGPT 相比，Perplexity AI 更擅長處理哪一類型的任務？',
            options: [
              '撰寫詩歌和創意故事。',
              '進行開放式、無主題的長時間對話。',
              '進行需要高準確性和最新資訊的事實密集型研究。',
              '生成不基於任何外部來源的內容。'
            ],
            correctAnswer: 2,
            explanation: 'Perplexity 更適合事實密集型、需要最新資訊的研究。'
          },
          {
            question: 'Perplexity 答案中的哪個標誌性功能，有助於用戶驗證資訊的準確性和可靠性？',
            options: [
              '答案的字數統計。',
              '答案旁邊的圖片。',
              '為關鍵論點提供清晰、可點擊的引用來源（Citations）。',
              '答案的背景顏色。'
            ],
            correctAnswer: 2,
            explanation: '引用來源（Citations）可驗證資訊。'
          },
          {
            question: '對於學生和研究人員來說，Perplexity 的主要價值在於？',
            options: [
              '可以幫他們玩線上遊戲。',
              '可以快速進行文獻綜述、尋找最新研究並輕鬆追溯來源。',
              '可以幫他們設計社交媒體帖子。',
              '可以提供天氣預報。'
            ],
            correctAnswer: 1,
            explanation: '快速文獻綜述、追溯來源是最大價值。'
          },
          {
            question: 'Perplexity 提出的「信任三角」不包括以下哪一項？',
            options: [
              '綜合（Synthesis）',
              '引用（Citation）',
              '控制（Control）',
              '廣告（Advertisement）'
            ],
            correctAnswer: 3,
            explanation: '信任三角不包括廣告。'
          }
        ]
      }
    },
    {
      id: 2,
      title: '第二章：掌握介面',
      titleEn: 'Chapter 2: Mastering the Interface',
      description: '全面功能導覽',
      descriptionEn: 'Comprehensive Feature Tour',
      duration: '1.2 小時',
      lessons: [
        {
          id: 6,
          title: '2.1 主介面導覽：搜索框、側邊欄與功能區',
          duration: '15 分鐘',
          type: 'text' as const,
          description: '深入了解 Perplexity AI 的主介面設計，掌握搜索框、側邊欄和各功能區的使用方法。',
          image: '/images/courses/perplexity-complete-course/unit-images/main-interface.png',
          imageAlt: 'Perplexity AI 主介面導覽',
          transcript: `Perplexity AI 的介面設計體現了「簡潔而強大」的設計哲學。當你第一次打開 Perplexity 時，你會看到一個乾淨、專注的介面，中央是一個大型搜索框，這是整個平台的核心。

搜索框功能詳解：
主搜索框不僅僅是一個輸入文字的地方，它是一個智能化的查詢中心。你可以在這裡輸入自然語言問題，無需擔心關鍵詞優化或特殊語法。搜索框支援多種輸入方式：純文字查詢、文件上傳（PDF、圖片等）、甚至語音輸入。

左側邊欄導航：
左側邊欄是你的個人化控制中心，包含了幾個重要區域：
1. Library（圖書館）：存儲所有歷史對話和研究記錄
2. Spaces（空間）：組織主題相關的研究項目
3. Discover（探索）：瀏覽熱門話題和趨勢內容
4. Settings（設定）：個人化配置選項

右上角功能區：
這裡包含了帳戶管理、語言切換、主題模式切換等設定選項。對於 Pro 用戶，還能看到使用量統計和 AI 模型選擇選項。

介面的響應式設計確保了在不同裝置上都能獲得一致的使用體驗，無論是桌面端、平板還是手機，核心功能都觸手可及。`,
          keyPoints: [
            '中央搜索框是平台核心，支援自然語言查詢、文件上傳和語音輸入',
            '左側邊欄包含 Library、Spaces、Discover 等重要功能區域',
            '右上角功能區提供帳戶管理、設定和 Pro 用戶專屬功能',
            '響應式設計確保跨裝置一致的使用體驗'
          ],
          completed: false
        },
        {
          id: 7,
          title: '2.2 帳戶設定與個人化選項',
          duration: '12 分鐘',
          type: 'text' as const,
          description: '學習如何配置 Perplexity AI 的個人化設定，優化使用體驗。',
          image: '/images/courses/perplexity-complete-course/unit-images/account-settings.png',
          imageAlt: 'Perplexity AI 帳戶設定介面',
          transcript: `個人化設定是提升 Perplexity 使用體驗的關鍵。通過合理的配置，你可以讓 AI 更好地理解你的需求和偏好。

基本帳戶設定：
首先，建議完善你的個人資料，包括姓名、偏好語言、時區等。這些資訊幫助 Perplexity 提供更貼切的搜索結果和建議。

語言與地區設定：
Perplexity 支援多種語言，包括繁體中文、簡體中文、英文、日文等。設定正確的語言不僅影響介面顯示，也會影響 AI 回答的語言和文化背景。地區設定則影響本地化內容的優先級。

搜索偏好配置：
你可以設定預設的搜索範圍，例如偏好學術來源、新聞網站或特定類型的內容。這些偏好會影響 AI 在搜索和整理答案時的優先級。

隱私與安全設定：
Perplexity 提供了詳細的隱私控制選項。你可以選擇是否保存搜索歷史、是否允許數據用於改善服務、以及如何處理敏感資訊。

通知設定：
你可以自定義各種通知，包括新功能通知、Spaces 更新、以及重要的帳戶安全提醒。合理的通知設定能幫你保持與平台的良好互動。

對於 Pro 用戶，還有額外的設定選項，如 AI 模型偏好、高級搜索參數等。`,
          keyPoints: [
            '完善個人資料有助於獲得更貼切的搜索結果',
            '語言與地區設定影響介面語言和內容本地化',
            '搜索偏好配置可優化 AI 搜索和答案整理的優先級',
            '隱私設定提供詳細的數據控制選項，保護個人隱私'
          ],
          completed: false
        },
        {
          id: 8,
          title: '2.3 免費 vs Pro 功能對比一覽',
          duration: '18 分鐘',
          type: 'text' as const,
          description: '全面比較 Perplexity AI 免費版與 Pro 版的功能差異，幫助你做出最適合的選擇。',
          image: '/images/courses/perplexity-complete-course/unit-images/free-vs-pro.png',
          imageAlt: 'Perplexity AI 免費版與 Pro 版功能比較',
          transcript: `選擇適合的 Perplexity 版本是優化使用體驗的重要決策。讓我們深入比較免費版和 Pro 版的具體差異。

免費版功能：
免費版已經相當強大，提供了核心的 AI 搜索功能。你可以進行無限次的基本搜索、獲得帶引用的答案、使用 Library 功能保存歷史記錄、創建基本的 Spaces，以及生成簡單的 Pages。免費版使用的是標準 AI 模型，對於日常研究和學習需求已經足夠。

Pro 版增強功能：
1. 更強大的 AI 模型：Pro 用戶可以選擇 GPT-4、Claude-3、Gemini 等最新模型，獲得更準確、更深入的分析。

2. Pro Search：這是 Pro 版的王牌功能，提供更深度的搜索，能夠分析更多來源，提供更全面的答案。

3. 無限 AI 模型切換：根據不同任務選擇最適合的 AI 模型，如用 GPT-4 進行創意思考，用 Claude 進行文件分析。

4. 高級 Spaces 功能：包括自定義指令、協作功能、更大的存儲空間等。

5. API 存取：開發者可以整合 Perplexity 到自己的應用中。

6. 優先客服支援：獲得更快的回應和專業技術支援。

投資回報分析：
Pro 版每月約 $20 美元，對於重度使用者、研究人員、內容創作者和專業人士來說，這個投資通常能夠快速回本。Pro 版能顯著提升研究效率，節省時間成本。

使用建議：
建議先使用免費版熟悉平台，當你發現免費版無法滿足需求時，再考慮升級。很多用戶發現，一旦體驗過 Pro Search 的強大功能，就很難回到免費版了。`,
          keyPoints: [
            '免費版提供核心 AI 搜索功能，足以滿足日常研究和學習需求',
            'Pro 版提供更強大的 AI 模型、Pro Search、無限模型切換等進階功能',
            'Pro 版每月約 $20，對重度使用者和專業人士具有良好的投資回報',
            '建議先體驗免費版，確認需求後再考慮升級至 Pro 版'
          ],
          completed: false
        },
        {
          id: 9,
          title: '2.4 快捷鍵與效率技巧',
          duration: '15 分鐘',
          type: 'text' as const,
          description: '掌握 Perplexity AI 的快捷鍵和效率技巧，大幅提升使用速度。',
          image: '/images/courses/perplexity-complete-course/unit-images/shortcuts-tips.png',
          imageAlt: 'Perplexity AI 快捷鍵與效率技巧',
          transcript: `掌握快捷鍵和效率技巧是從 Perplexity 新手進階為高效用戶的關鍵。這些技巧能讓你的研究工作事半功倍。

核心快捷鍵：
- Ctrl/Cmd + K：快速開啟搜索框，無論你在頁面哪個位置
- Ctrl/Cmd + Enter：送出查詢，比滑鼠點擊更快
- Ctrl/Cmd + /：開啟快捷鍵幫助面板
- Esc：關閉當前對話框或返回主介面
- Tab：在不同介面元素間快速切換

搜索效率技巧：
1. 使用自然語言：不要像 Google 一樣只輸入關鍵詞，完整描述你的問題
2. 指定時間範圍：加上「最近一年」、「2024年」等時間限制
3. 指定來源類型：如「根據學術論文」、「來自新聞報導」
4. 分步驟提問：複雜問題分解成多個簡單問題

Library 管理技巧：
- 使用描述性標題：重新命名對話記錄，方便日後搜索
- 善用標籤功能：為對話添加主題標籤
- 定期整理：將相關對話歸類到 Spaces 中

Spaces 高效使用：
- 設定清晰的 Space 主題和描述
- 使用自定義指令統一該 Space 的 AI 行為
- 邀請合作者共同研究特定主題

Pages 快速生成：
- 先在 Space 中累積足夠的研究資料
- 使用 AI 自動生成初稿，再手動完善
- 善用範本功能，建立標準格式

瀏覽器擴充功能：
如果可用，安裝 Perplexity 的瀏覽器擴充功能，可以在任何網頁上快速啟動搜索，或將網頁內容直接發送到 Perplexity 進行分析。`,
          keyPoints: [
            '核心快捷鍵如 Ctrl+K 開啟搜索、Ctrl+Enter 送出查詢能顯著提升操作速度',
            '使用自然語言提問，指定時間範圍和來源類型可獲得更精準結果',
            '善用 Library 標籤和 Spaces 分類功能，建立個人知識管理系統',
            '瀏覽器擴充功能讓你在任何網頁上都能快速使用 Perplexity'
          ],
          completed: false
        },
        {
          id: 10,
          title: '2.5 移動端 vs 桌面端體驗差異',
          duration: '12 分鐘',
          type: 'text' as const,
          description: '了解 Perplexity AI 在不同裝置上的使用體驗差異，學會跨平台高效使用。',
          image: '/images/courses/perplexity-complete-course/unit-images/mobile-vs-desktop.png',
          imageAlt: 'Perplexity AI 移動端與桌面端比較',
          transcript: `Perplexity AI 提供了出色的跨平台體驗，但不同裝置有其獨特的優勢和限制。了解這些差異能幫你在不同情境下選擇最適合的使用方式。

桌面端優勢：
1. 大螢幕優勢：能同時顯示更多資訊，方便比較多個來源
2. 多視窗操作：可以開啟多個 Perplexity 頁面進行平行研究
3. 鍵盤快捷鍵：提供完整的快捷鍵支援，操作更高效
4. 檔案管理：更方便上傳和管理大型文件
5. 複製貼上：與其他桌面應用程式的整合更流暢

移動端優勢：
1. 隨時隨地使用：通勤、會議間隙都能進行快速查詢
2. 語音輸入：在移動情境下，語音比打字更方便
3. 相機整合：可以直接拍攝文件或圖片進行分析
4. 推送通知：重要更新和回覆能即時收到
5. 觸控操作：在某些場景下比滑鼠操作更直覺

功能差異分析：
大部分核心功能在兩個平台上都可用，但有一些細微差異：
- 檔案上傳：桌面端支援更大的檔案和更多格式
- Spaces 管理：桌面端的介面更適合複雜的組織工作
- Pages 編輯：桌面端提供更豐富的編輯功能
- 同時進行多項研究：桌面端的多標籤頁功能更強大

最佳使用策略：
1. 深度研究用桌面端：當需要處理大量資料、比較多個來源時
2. 快速查詢用移動端：日常問題、突發奇想的查詢
3. 實地研究用移動端：參觀博物館、會議中的即時查證
4. 內容創作用桌面端：撰寫報告、整理 Spaces 時

同步功能：
所有數據在雲端同步，你可以在桌面端開始研究，在移動端繼續，或vice versa。這種無縫切換是 Perplexity 的一大優勢。

選擇建議：
理想情況下，同時使用兩個平台能獲得最佳體驗。重度使用者通常以桌面端為主力，移動端為輔助。`,
          keyPoints: [
            '桌面端適合深度研究，提供大螢幕、多視窗、快捷鍵等優勢',
            '移動端適合隨時查詢，支援語音輸入、相機整合、推送通知',
            '核心功能跨平台一致，但複雜操作在桌面端體驗更佳',
            '雲端同步讓你可以在不同裝置間無縫切換，延續研究工作'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第二章測驗：掌握介面',
        description: '測試你對 Perplexity 介面的理解。',
        timeLimit: 10,
        questions: [
          {
            question: 'Perplexity AI 的主介面中央最重要的元素是什麼？',
            options: [
              '側邊欄導航',
              '搜索框',
              '設定按鈕',
              '用戶頭像'
            ],
            correctAnswer: 1,
            explanation: '搜索框是 Perplexity 的核心，位於介面中央，是所有查詢的起點。'
          },
          {
            question: '左側邊欄中的「Library」功能主要用於什麼？',
            options: [
              '下載檔案',
              '存儲所有歷史對話和研究記錄',
              '設定個人資料',
              '查看使用統計'
            ],
            correctAnswer: 1,
            explanation: 'Library 是個人化知識中心，自動保存所有對話線程和研究記錄。'
          },
          {
            question: 'Perplexity Pro 版本每月的訂閱費用大約是多少？',
            options: [
              '$10 美元',
              '$15 美元',
              '$20 美元',
              '$25 美元'
            ],
            correctAnswer: 2,
            explanation: 'Perplexity Pro 目前的定價為每月約 $20 美元。'
          },
          {
            question: '以下哪個是 Perplexity 的核心快捷鍵，用於快速開啟搜索框？',
            options: [
              'Ctrl/Cmd + S',
              'Ctrl/Cmd + K',
              'Ctrl/Cmd + F',
              'Ctrl/Cmd + N'
            ],
            correctAnswer: 1,
            explanation: 'Ctrl/Cmd + K 是快速開啟搜索框的核心快捷鍵，無論你在頁面哪個位置都可以使用。'
          },
          {
            question: '桌面端與移動端相比，哪個平台更適合深度研究和複雜的資料處理？',
            options: [
              '移動端',
              '桌面端',
              '兩者相同',
              '取決於網路速度'
            ],
            correctAnswer: 1,
            explanation: '桌面端提供大螢幕、多視窗、完整快捷鍵支援，更適合深度研究和複雜資料處理。'
          }
        ]
      }
    },
    {
      id: 3,
      title: '第三章：核心搜索功能詳解',
      titleEn: 'Chapter 3: Core Search Features Deep Dive',
      description: '精準獲取答案的藝術',
      descriptionEn: 'The Art of Precise Answer Retrieval',
      duration: '1.8 小時',
      lessons: [
        {
          id: 11,
          title: '3.1 基礎搜索：如何問出好問題',
          duration: '20 分鐘',
          type: 'text' as const,
          description: '掌握有效提問的技巧和原則，學會如何與 AI 進行高效對話。',
          image: '/images/courses/perplexity-complete-course/unit-images/effective-questioning.png',
          imageAlt: '有效提問技巧示範',
          transcript: `在 AI 時代，「會問問題」成為了一項核心技能。Perplexity 的強大之處不僅在於它的搜索能力，更在於它能理解和回應複雜的自然語言查詢。

提問的黃金原則：
1. 具體而非抽象：比起「AI 是什麼？」，問「AI 在醫療診斷中的具體應用有哪些？」會得到更有用的答案。

2. 加入背景脈絡：告訴 AI 你的身份、需求和使用目的。例如：「我是一名大學生，正在寫關於氣候變化的報告，請解釋溫室效應的機制。」

3. 指定回答格式：明確說明你希望得到什麼樣的答案，如「請用列表形式」、「包含具體數據」、「提供實例說明」。

4. 設定限制條件：加入時間範圍、地理範圍、來源類型等限制，如「2023年後的研究」、「來自學術期刊」。

進階提問技巧：
- 分層提問：先問總體概念，再深入細節
- 對比提問：「A 和 B 的主要差異是什麼？」
- 假設性提問：「如果...會發生什麼？」
- 評估性提問：「X 方法的優缺點是什麼？」

避免的提問陷阱：
- 過於寬泛的問題
- 是非題（AI 更擅長開放性問題）
- 多重問題（一次問一個重點）
- 情感化或主觀性過強的問題

實際範例：
差的問題：「Python」
好的問題：「我是程式設計初學者，想學習 Python 進行資料分析，請推薦適合新手的學習路徑和資源。」

最佳的問題：「我有統計學背景但沒有程式設計經驗，計劃在未來 3 個月內學會使用 Python 進行基礎資料分析，請根據 2024 年最新的學習資源，為我制定詳細的學習計劃。」`,
          keyPoints: [
            '提問要具體明確，加入背景脈絡和身份資訊',
            '指定回答格式和限制條件，如時間範圍、來源類型',
            '使用分層、對比、假設性等進階提問技巧',
            '避免過於寬泛或多重問題，一次專注一個重點'
          ],
          completed: false
        },
        {
          id: 12,
          title: '3.2 Focus 模式深度解析：Academic、Writing、Math、Programming',
          duration: '25 分鐘',
          type: 'text' as const,
          description: '深入了解不同 Focus 模式的特點和應用場景，學會根據任務選擇最適合的模式。',
          image: '/images/courses/perplexity-complete-course/unit-images/focus-modes.png',
          imageAlt: 'Perplexity Focus 模式比較',
          transcript: `Focus 模式是 Perplexity 的一項強大功能，它讓 AI 能夠針對特定領域和任務類型進行優化，提供更精準、更專業的回答。

Academic Focus（學術模式）：
這個模式專為學術研究和教育需求設計。當啟用 Academic Focus 時，Perplexity 會：
- 優先引用學術期刊、研究論文和權威學術機構的內容
- 提供更詳細的引用資訊，包括 DOI、發表日期、作者資訊
- 使用更正式、更嚴謹的學術語言
- 特別注重證據的可靠性和研究方法的科學性

最適用場景：文獻綜述、學術論文寫作、研究方向探索、科學概念解釋

Writing Focus（寫作模式）：
專為內容創作者和寫作任務設計。這個模式會：
- 提供更多創意靈感和寫作角度
- 注重語言的流暢性和表達的生動性
- 提供結構化的寫作建議和大綱
- 包含更多實例、比喻和故事化元素

最適用場景：部落格文章、新聞稿、創意寫作、內容策劃、文案創作

Math Focus（數學模式）：
針對數學和科學計算需求。特點包括：
- 提供詳細的數學推導過程
- 支援複雜的數學符號和公式
- 解釋數學概念時更加清晰和邏輯化
- 提供多種解題方法和驗證步驟

最適用場景：數學問題解決、科學計算、統計分析、工程計算

Programming Focus（程式設計模式）：
為開發者和程式設計學習者優化。功能包括：
- 提供更準確的代碼範例和解釋
- 關注最佳實踐和代碼優化
- 包含多種程式語言的對比和選擇建議
- 提供除錯和性能優化的建議

最適用場景：代碼學習、技術問題解決、架構設計、程式設計教學

選擇策略：
1. 明確你的主要目標：是學習、創作、計算還是開發？
2. 考慮受眾：學術論文用 Academic，一般文章用 Writing
3. 注意切換：可以在同一個對話中切換 Focus 模式
4. 實驗比較：同一個問題在不同模式下的回答差異

Pro 版專屬優勢：
Pro 用戶可以自由切換所有 Focus 模式，而免費用戶可能有使用次數限制。`,
          keyPoints: [
            'Academic 模式優先學術來源，提供嚴謹的學術引用和科學性內容',
            'Writing 模式注重創意和表達，適合內容創作和文案寫作',
            'Math 模式提供詳細數學推導，支援複雜計算和科學分析',
            'Programming 模式優化代碼範例，提供最佳實踐和技術建議'
          ],
          completed: false
        },
        {
          id: 13,
          title: '3.3 上傳檔案功能：PDF、圖片、文檔的智能解析',
          duration: '22 分鐘',
          type: 'text' as const,
          description: '學習如何有效利用檔案上傳功能進行深度分析，支援多種格式的文檔處理。',
          image: '/images/courses/perplexity-complete-course/unit-images/file-upload.png',
          imageAlt: 'Perplexity 檔案上傳功能展示',
          transcript: `檔案上傳功能是 Perplexity 的一項革命性功能，它將 AI 的理解能力擴展到了各種文檔格式，讓你能夠對現有資料進行深度分析和提問。

支援的檔案格式：
1. PDF 文檔：包括學術論文、報告、電子書、合約等
2. 圖片檔案：JPG、PNG、WebP 等，支援圖表、截圖、手寫筆記
3. 文字檔案：TXT、Word、RTF 等純文字和格式化文檔
4. 試算表：CSV 檔案的數據分析
5. 簡報檔案：PowerPoint 的內容提取和分析

PDF 分析功能：
當你上傳 PDF 時，Perplexity 會：
- 自動提取文字內容，包括多欄位排版
- 識別圖表、表格和數據
- 理解文檔結構，如章節、標題、引用
- 保持原始格式的邏輯關係

常見應用場景：
- 學術論文摘要和重點提取
- 合約條款分析和風險評估
- 財務報告的關鍵資訊整理
- 技術文檔的重點說明

圖片分析功能：
對於圖片，AI 能夠：
- 識別和解釋圖表、流程圖、組織架構圖
- 提取表格數據並進行分析
- 讀取手寫或印刷文字（OCR）
- 理解圖片中的概念和關係

實用技巧：
- 截圖分析：將網頁、應用介面截圖後上傳分析
- 數據視覺化解讀：上傳統計圖表請 AI 解釋趨勢
- 手寫筆記數位化：將手寫筆記轉為數位文字
- 多語言內容翻譯：上傳外文文檔請求翻譯和摘要

高效使用策略：
1. 檔案預處理：確保圖片清晰、PDF 文字可選取
2. 明確提問：「總結這份報告的主要發現」比「分析這個檔案」更有效
3. 分段分析：大型文檔可以分段上傳，逐步深入
4. 結合搜索：上傳檔案後，可以結合網路搜索進行對比分析

限制和注意事項：
- 檔案大小限制（通常為幾十 MB）
- 某些加密或保護的 PDF 可能無法完全分析
- 圖片品質影響識別準確度
- 隱私考量：敏感文檔需謹慎處理

Pro 版優勢：
Pro 用戶通常享有更大的檔案大小限制、更快的處理速度，以及更先進的 AI 模型進行檔案分析。`,
          keyPoints: [
            '支援 PDF、圖片、文字檔等多種格式，自動提取和理解內容',
            '能識別圖表、表格、手寫文字，並保持原始邏輯結構',
            '適用於學術論文分析、合約審查、數據圖表解讀等場景',
            '結合明確提問和網路搜索，可進行深度對比分析'
          ],
          completed: false
        },
        {
          id: 14,
          title: '3.4 Copilot 建議系統：讓 AI 引導你的探索',
          duration: '18 分鐘',
          type: 'text' as const,
          description: '利用 Copilot 獲得智能搜索建議和後續問題，提升研究的深度和廣度。',
          image: '/images/courses/perplexity-complete-course/unit-images/copilot-suggestions.png',
          imageAlt: 'Perplexity Copilot 建議系統',
          transcript: `Copilot 建議系統是 Perplexity 的智能助手功能，它不僅回答你的問題，還主動建議後續探索方向，幫助你發現原本可能忽略的重要角度。

Copilot 的工作原理：
當你提出一個問題後，Copilot 會：
- 分析你的查詢意圖和背景脈絡
- 識別相關的子主題和延伸議題
- 生成邏輯相關的後續問題建議
- 考慮不同角度和觀點的探索可能

建議類型分析：
1. 深度探索：將表面問題引向更深層的機制和原理
2. 廣度延伸：探索相關領域和交叉議題
3. 實務應用：從理論概念轉向實際應用場景
4. 對比分析：提供不同方案、觀點的比較角度
5. 時間維度：探索歷史發展或未來趨勢

實際應用場景：

學術研究中的 Copilot：
假設你問「什麼是機器學習？」，Copilot 可能建議：
- 「機器學習與傳統程式設計的根本差異是什麼？」
- 「目前機器學習在醫療診斷中的應用現狀如何？」
- 「深度學習是機器學習的子集嗎？它們的關係是什麼？」

商業分析中的 Copilot：
問及「電商市場趨勢」時，可能建議：
- 「疫情如何永久改變了消費者的購物習慣？」
- 「社交商務與傳統電商的競爭態勢如何？」
- 「元宇宙技術對未來零售業的潛在影響是什麼？」

最大化 Copilot 價值的策略：
1. 保持開放心態：不要只關注原始問題，探索建議的方向
2. 建立問題清單：將有趣的建議問題記錄下來，逐步深入
3. 交叉驗證：使用建議問題從多角度驗證資訊
4. 建立知識網絡：透過建議問題建立主題間的連結

與傳統搜索的差異：
傳統搜索需要你已經知道要問什麼，而 Copilot 幫助你發現你不知道自己需要問什麼。這種「未知的未知」的探索是創新思維和深度學習的關鍵。

進階使用技巧：
- 問題鏈式探索：跟隨 Copilot 建議形成問題鏈
- 跨域思考：利用建議跳出原有知識框架
- 反向思考：從 Copilot 建議中發現問題的另一面
- 假設驗證：將建議轉化為假設進行驗證

Copilot 與研究方法論：
Copilot 的建議過程實際上遵循了良好的研究方法論：從廣泛探索到深度聚焦，從理論理解到實務應用，從單一角度到多元觀點。`,
          keyPoints: [
            'Copilot 主動建議後續探索方向，幫助發現原本可能忽略的重要角度',
            '提供深度探索、廣度延伸、實務應用、對比分析等多種建議類型',
            '特別有助於探索「未知的未知」，突破原有知識框架',
            '結合問題鏈式探索和跨域思考，提升研究的系統性和創新性'
          ],
          completed: false
        },
        {
          id: 15,
          title: '3.5 高級搜索技巧：時間限制、來源過濾、語言設定',
          duration: '23 分鐘',
          type: 'text' as const,
          description: '掌握進階搜索參數，精確控制搜索範圍和結果品質。',
          image: '/images/courses/perplexity-complete-course/unit-images/advanced-search.png',
          imageAlt: 'Perplexity 高級搜索技巧',
          transcript: `掌握高級搜索技巧是成為 Perplexity 專家用戶的必經之路。這些技巧讓你能夠精確控制搜索範圍，獲得更相關、更高品質的結果。

時間限制技巧：
時間範圍是影響搜索結果相關性的關鍵因素。有效的時間限制方法包括：

明確時間表述：
- 「過去 24 小時」、「最近一週」、「2024 年內」
- 「2020 年以後的研究」、「疫情期間（2020-2022）」
- 「最新發展」、「近期趨勢」、「歷史回顧」

專業時間查詢：
- 財報季：「Q3 2024 財報」
- 會議期間：「CES 2024 期間的新產品發佈」
- 政策生效：「新法規實施後的影響」

來源過濾策略：
不同來源類型適用於不同需求：

學術來源指定：
- 「根據同行評議的研究」
- 「來自 Nature、Science 等頂級期刊」
- 「引用最多的論文」
- 「最新的 meta-analysis」

新聞來源選擇：
- 「主流媒體報導」
- 「財經專業媒體觀點」
- 「技術媒體分析」
- 「官方聲明和新聞稿」

專業機構資料：
- 「政府官方數據」
- 「國際組織報告」
- 「行業協會統計」
- 「智庫研究報告」

語言設定應用：
語言選擇不僅影響介面，更影響搜索結果的來源：

多語言搜索策略：
- 英文搜索：獲得最廣泛的國際資訊
- 中文搜索：針對華人地區的特定內容
- 日文搜索：日本技術和文化相關內容
- 其他語言：特定地區的本土觀點

跨語言比較：
「比較中英文媒體對某事件的報導差異」
「不同國家對同一政策的評價」

地區化內容：
- 本地法規和政策
- 地區性市場數據
- 文化特定的內容和觀點

進階搜索語法：
雖然 Perplexity 主要使用自然語言，但一些搜索技巧仍然有效：

精確短語搜索：
使用引號包圍關鍵短語："人工智能倫理"

排除特定內容：
「AI 發展趨勢 -加密貨幣」（排除加密貨幣相關內容）

指定網站搜索：
「site:nature.com 量子計算」

綜合查詢範例：
「2024 年發表在頂級期刊上關於 CRISPR 基因編輯在癌症治療中應用的最新研究進展，請提供詳細的技術分析和臨床試驗結果」

這個查詢包含了：
- 時間限制（2024 年）
- 來源品質要求（頂級期刊）
- 具體主題（CRISPR 基因編輯）
- 應用領域（癌症治療）
- 期望內容類型（技術分析、臨床結果）

專家級技巧：
1. 搜索策略分層：從廣泛到具體，逐步縮小範圍
2. 來源交叉驗證：使用不同類型來源驗證資訊
3. 時間軸分析：比較不同時期的觀點變化
4. 多角度探索：從技術、商業、社會等多角度分析同一主題`,
          keyPoints: [
            '使用明確的時間表述和專業時間查詢，獲得最相關的時效性內容',
            '根據需求選擇適當來源：學術期刊、新聞媒體、政府機構、專業組織',
            '善用多語言搜索和跨語言比較，獲得更全面的國際視野',
            '結合時間、來源、語言等多維度限制，形成精確的綜合查詢策略'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第三章測驗：核心搜索功能詳解',
        description: '測試你對核心搜索功能的掌握。',
        timeLimit: 15,
        questions: [
          {
            question: '在使用 Perplexity 進行搜索時，以下哪種提問方式最有效？',
            options: [
              '只輸入關鍵詞',
              '使用完整的自然語言描述問題，包含背景脈絡',
              '複製貼上其他網站的內容',
              '只問是非題'
            ],
            correctAnswer: 1,
            explanation: '使用完整的自然語言描述問題，加入背景脈絡和身份資訊，能獲得更精準有用的答案。'
          },
          {
            question: 'Academic Focus 模式最適合用於以下哪種任務？',
            options: [
              '創意寫作',
              '學術研究和文獻分析',
              '程式碼除錯',
              '數學計算'
            ],
            correctAnswer: 1,
            explanation: 'Academic Focus 專為學術研究設計，優先引用學術期刊和權威來源，提供嚴謹的學術引用。'
          },
          {
            question: 'Perplexity 支援上傳分析的檔案格式包括哪些？',
            options: [
              '只支援 PDF',
              '只支援圖片',
              'PDF、圖片、文字檔案、CSV 等多種格式',
              '只支援 Word 文檔'
            ],
            correctAnswer: 2,
            explanation: 'Perplexity 支援多種檔案格式，包括 PDF、圖片、文字檔案、CSV 等，能進行智能解析和分析。'
          },
          {
            question: 'Copilot 建議系統的主要價值在於什麼？',
            options: [
              '加快搜索速度',
              '幫助發現原本可能忽略的重要探索角度',
              '減少網路使用量',
              '自動儲存搜索結果'
            ],
            correctAnswer: 1,
            explanation: 'Copilot 主動建議後續探索方向，幫助發現「未知的未知」，突破原有知識框架。'
          },
          {
            question: '進行高級搜索時，以下哪種策略最有效？',
            options: [
              '只使用最新資訊',
              '只搜索單一來源類型',
              '結合時間限制、來源過濾、語言設定等多維度限制',
              '避免使用任何限制條件'
            ],
            correctAnswer: 2,
            explanation: '結合時間、來源、語言等多維度限制，能形成精確的綜合查詢策略，獲得最相關的高品質結果。'
          },
          {
            question: '當需要分析複雜的學術論文時，最好的策略是什麼？',
            options: [
              '直接詢問論文結論',
              '上傳 PDF 檔案並提出具體分析問題',
              '只搜索論文標題',
              '詢問作者背景'
            ],
            correctAnswer: 1,
            explanation: '上傳 PDF 檔案並提出明確的分析問題，如「總結這份報告的主要發現」，比籠統的「分析這個檔案」更有效。'
          }
        ]
      }
    },
    {
      id: 4,
      title: '第四章：知識管理與分享',
      titleEn: 'Chapter 4: Knowledge Management & Sharing',
      description: '善用 Library、Spaces 與 Pages',
      descriptionEn: 'Mastering Library, Spaces & Pages',
      duration: '1.5 小時',
      lessons: [
        {
          id: 16,
          title: '4.1 「Library」入門：你的個人研究資料庫',
          duration: '20 分鐘',
          type: 'text' as const,
          description: '深入了解 Library 功能，學會建立和管理個人研究資料庫。',
          image: '/images/courses/perplexity-complete-course/unit-images/library-intro.png',
          imageAlt: 'Perplexity Library 功能介面',
          transcript: `「Library」（圖書館）是 Perplexity AI 為每位註冊用戶提供的個人化知識中心，它不僅僅是一個歷史記錄列表，而是一個功能完備的、用於存儲、組織和檢索所有研究活動的中央樞紐。

核心定義與功能：
Library 構成了用戶在 Perplexity 中所有智力活動的存檔。其主要功能包括：

歷史記錄存檔：
用戶發起的每一次搜索、每一次與 AI 的對話，都會以一個獨立的「Thread」（對話線程）的形式被自動、永久地保存在 Library 中。這意味著用戶可以隨時輕鬆地訪問和回顧過去的任何一次研究，無需擔心資訊丟失。

知識組織中心：
Library 是所有知識組織工作的起點。用戶可以在這裡創建和管理「Spaces」（空間），並將那些零散的、但主題相關的 Threads 歸類到不同的 Spaces 中，從而將混亂的搜索歷史轉變為結構化的項目檔案。

內容創作與分享門戶：
Library 同時也是內容創作和分享的發起點。用戶可以在這裡創建「Pages」（頁面），將研究成果轉化為精美的報告。此外，無論是單個的 Thread，還是整個 Space 或 Page，用戶都可以從 Library 中生成分享連結，與同事、同學或公眾分享自己的發現。

Library 的界面設計：
主界面採用時間軸排列，最新的對話顯示在頂部。每個 Thread 都有清晰的標題（可自定義）、時間戳記、以及首幾句的預覽。用戶可以通過搜索功能快速找到特定主題的歷史對話。

高效管理策略：
1. 重新命名 Threads：為每個對話設置描述性標題，便於日後搜索
2. 添加標籤：使用關鍵詞標籤對對話進行分類
3. 定期整理：將相關對話移動到相應的 Spaces 中
4. 書籤重要對話：將特別有價值的研究結果標記為書籤

搜索與檢索：
Library 內建強大的搜索功能，可以根據關鍵詞、時間範圍、主題類別等多種條件快速找到歷史對話。這讓 Library 不僅是存儲工具，更是一個可檢索的個人知識庫。

隱私與安全：
所有存儲在 Library 中的內容都受到嚴格的隱私保護。用戶可以選擇將特定對話設為私人，或者與特定人群分享。對於敏感研究項目，建議使用私人模式進行對話。

總而言之，Library 扮演著用戶個人研究資料庫的角色，確保了知識的沉澱、組織和再利用，是 Perplexity 生態系統中不可或缺的基礎設施。`,
          keyPoints: [
            'Library 是個人化知識中心，自動保存所有對話線程和研究記錄',
            '提供知識組織功能，可建立 Spaces 並將相關對話歸類管理',
            '支援內容創作和分享，可生成 Pages 並產生分享連結',
            '內建搜索功能，支援關鍵詞、時間、主題等多維度檢索'
          ],
          completed: false
        },
        {
          id: 17,
          title: '4.2 從「Collections」到「Spaces」：項目式研究的演進',
          duration: '18 分鐘',
          type: 'text' as const,
          description: '理解 Spaces 設計理念和與舊版 Collections 的差異，掌握項目式研究方法。',
          image: '/images/courses/perplexity-complete-course/unit-images/collections-to-spaces.png',
          imageAlt: 'Collections 到 Spaces 的功能演進',
          transcript: `Perplexity 的知識組織功能經歷了一次重要的演進，從最初的「Collections」（收藏集）升級為現在更為強大和靈活的「Spaces」（空間）。理解這一演變，有助於把握 Perplexity 在知識管理領域的深層思考。

演變過程：
最初，Perplexity 提供了名為「Collections」的功能，允許用戶將主題相關的對話線程（Threads）分組管理。這在一定程度上解決了搜索歷史雜亂無章的問題。然而，隨著平台功能的豐富，Perplexity 推出了功能更全面、體驗更流暢的「Spaces」，並以此取代了 Collections。

核心理念的轉變：
這次升級不僅僅是名稱的改變，更是一次核心理念的飛躍。它標誌著 Perplexity 的定位，從一個單純的「問答工具」，向一個綜合性的「項目式研究平台」轉變。

Spaces 的設計理念是，用戶的研究活動往往不是孤立的、一次性的問答，而是圍繞著某個特定項目或主題（例如，「我的日本關西自由行計劃」、「關於量子計算的學期報告」、「2025年市場趨勢分析」）持續進行的探索過程。Spaces 正是為這種項目式的、持續性的研究活動提供了專門的工作環境。

Collections vs Spaces 對比：

Collections（舊版）：
- 功能相對簡單，主要是對話的分類收集
- 缺乏深度的協作功能
- 沒有自定義 AI 行為的能力
- 介面設計較為基礎

Spaces（新版）：
- 完整的項目管理功能
- 強大的協作和分享機制
- 可設定專屬的 AI 指令（Custom Instructions）
- 整合了 Pages 創建功能
- 更直觀的視覺化界面

項目式研究的優勢：
1. 持續性：研究不再是零散的問答，而是連續的探索過程
2. 系統性：相關資訊被有機地組織在一起，形成知識網絡
3. 協作性：團隊成員可以共同參與研究，分享發現
4. 產出性：研究成果可以直接轉化為 Pages 報告

實際應用場景：
- 學術研究：為每個研究主題建立獨立的 Space
- 商業分析：為不同的市場調研項目建立專門 Space
- 內容創作：為每個創作主題建立創意收集 Space
- 學習進修：為不同課程或技能學習建立學習 Space

移轉策略：
對於仍在使用 Collections 的用戶，Perplexity 提供了平滑的移轉路徑。舊的 Collections 可以直接升級為 Spaces，並獲得所有新功能。

這種演進反映了 Perplexity 對用戶需求的深度理解：現代知識工作者需要的不僅是單次的問答，而是支援複雜、長期研究項目的完整工作環境。`,
          keyPoints: [
            'Spaces 取代了舊版 Collections，實現從問答工具到項目研究平台的轉變',
            '支援項目式研究理念，圍繞特定主題進行持續性、系統性探索',
            '新增自定義 AI 指令、協作分享、Pages 整合等強大功能',
            '適用於學術研究、商業分析、內容創作、學習進修等多種場景'
          ],
          completed: false
        },
        {
          id: 18,
          title: '4.3 如何建立與管理 Spaces：設定專屬指令與協作',
          duration: '25 分鐘',
          type: 'text' as const,
          description: '掌握 Spaces 的創建、配置和團隊協作功能，學會設定自定義 AI 指令。',
          image: '/images/courses/perplexity-complete-course/unit-images/spaces-management.png',
          imageAlt: 'Spaces 建立與管理介面',
          transcript: `Spaces 是 Perplexity 中用於深度研究和知識組織的核心工具。掌握其創建和管理方法，能極大地提升研究效率和質量。

創建與組織：
用戶可以在 Library 介面中輕鬆創建一個新的 Space。創建時，可以為其設定一個清晰的名稱（如「畢業論文資料」）和一段簡要的描述。創建後，用戶便可以將任何新的或已有的 Threads 添加到這個 Space 中，就像將文件放入文件夾一樣，從而實現研究資料的系統化分類和管理。

專屬指令（Custom Instructions）：
這是 Spaces 最具變革性的功能，它將 AI 的個人化提升到了一個新的高度。用戶可以為每一個 Space 單獨設置一個獨特的、持久生效的系統提示（System Prompt）或指令。這意味著，AI 在處理該 Space 內部所有查詢時，都會嚴格遵守這個預設指令。

自定義指令的實際應用：

示例1：定制寫作風格
用戶可以創建一個名為「莎士比亞戲劇研究」的 Space，並將其專屬指令設置為：「你是一位研究莎士比亞的文學教授，請在回答所有問題時，都使用嚴謹、學術的語氣，並適當引用莎翁原句。」

示例2：限定資訊來源
用戶可以創建一個名為「最新科技新聞追蹤」的 Space，指令設為：「在回答時，你必須只使用過去72小時內發布的網絡來源，並在答案末尾列出所有來源的標題和連結。」

示例3：簡化複雜文檔
用戶可以創建一個「文檔簡化器」Space，上傳複雜的技術或法律文件，並設置指令：「你是一位善於化繁為簡的溝通專家，當我上傳文件並提問『enlighten me』時，請用最簡單的語言解釋文件中的核心概念。」

協作與隱私：
Spaces 的設計也考慮到了團隊合作的需求。用戶可以邀請同事或合作夥伴加入某個特定的 Space，共同進行研究、添加 Threads 和共享發現。同時，每個 Space 都有詳細的隱私設定，用戶可以選擇將其設為完全私人、僅限邀請者訪問，或者公開分享。

協作功能詳解：
1. 成員管理：可以邀請特定用戶，設定不同的權限等級
2. 即時同步：所有成員的操作都會即時更新，支援並行工作
3. 評論系統：成員可以對特定 Threads 添加評論和註釋
4. 版本追蹤：記錄 Space 的變更歷史，可以回溯修改

高效管理策略：
1. 明確的命名規範：使用描述性的 Space 名稱，如「2024Q4市場分析」
2. 詳細的描述說明：在 Space 描述中明確其目的、範圍和使用規則
3. 定期整理歸檔：將完成的項目 Space 歸檔，保持活躍列表的整潔
4. 權限分級管理：根據成員角色設定適當的訪問和編輯權限

進階設定技巧：
- 使用標籤系統對 Spaces 進行分類（如 #研究、#商業、#個人）
- 設定提醒和截止日期，進行項目進度管理
- 利用模板功能，為常見的研究類型建立標準化 Space 結構
- 整合外部工具，如連結 Google Drive 或 Notion 文檔

最佳實踐：
成功的 Space 管理需要平衡組織性和靈活性。建議用戶：
- 開始時建立較少但清晰的 Spaces，避免過度分割
- 定期回顧和整理，移除不再需要的內容
- 善用搜索功能，即使在大量 Spaces 中也能快速找到所需資訊
- 充分利用自定義指令，讓每個 Space 都有其獨特的「個性」`,
          keyPoints: [
            'Spaces 創建簡單，支援詳細描述和系統化組織管理',
            '自定義指令是核心功能，可為每個 Space 設定專屬的 AI 行為模式',
            '支援團隊協作，提供成員管理、即時同步、評論系統等功能',
            '有效管理需要明確命名、定期整理、權限分級和善用搜索功能'
          ],
          completed: false
        },
        {
          id: 19,
          title: '4.4 Pages 功能：將研究轉化為精美報告',
          duration: '22 分鐘',
          type: 'text' as const,
          description: '學習使用 Pages 功能創建和分享專業報告，將研究成果可視化呈現。',
          image: '/images/courses/perplexity-complete-course/unit-images/pages-creation.png',
          imageAlt: 'Perplexity Pages 功能展示',
          transcript: `Pages 功能是 Perplexity 生態系統中的內容創作和分享工具，它允許用戶將在 Spaces 中積累的研究成果轉化為結構化、可分享的精美報告。這個功能將 Perplexity 從一個純搜索工具升級為完整的知識產出平台。

Pages 的核心概念：
Pages 本質上是一個智能化的報告生成器。用戶可以基於在某個 Space 中收集的研究資料，讓 AI 自動生成一份結構化的報告，或者手動組織內容創建自定義頁面。每個 Page 都有獨特的 URL，可以輕鬆分享給同事、客戶或公眾。

創建 Pages 的方法：

自動生成模式：
當你在某個 Space 中積累了足夠的研究資料後，可以請求 AI 基於這些內容自動生成一個 Page。AI 會分析所有相關的 Threads，提取關鍵資訊，並按照邏輯順序組織成一份連貫的報告。

手動創建模式：
對於需要特定結構或風格的報告，用戶可以選擇手動創建 Page。這種模式提供了更多的控制權，用戶可以：
- 自定義章節結構和標題
- 選擇特定的 Threads 內容進行引用
- 添加自己的分析和評論
- 插入圖表、表格和其他視覺元素

Pages 的格式特色：
1. 專業排版：自動應用一致的格式和樣式
2. 智能引用：所有資訊都包含原始來源的引用
3. 互動元素：讀者可以點擊查看更詳細的背景資訊
4. 響應式設計：在不同裝置上都能良好顯示
5. 搜索優化：內容經過優化，便於搜索引擎索引

實際應用場景：

學術報告：
研究生可以將文獻綜述的所有研究整理成一個 Page，包含：
- 研究背景和目標
- 關鍵發現的總結
- 不同研究之間的比較分析
- 研究缺口和未來方向

商業分析報告：
市場分析師可以創建包含以下內容的 Page：
- 市場趨勢概述
- 競爭對手分析
- 消費者行為洞察
- 戰略建議和行動計劃

技術文檔：
開發團隊可以將技術研究整理成：
- 技術調研背景
- 不同解決方案的比較
- 實施建議和風險評估
- 相關資源和參考文件

協作與分享功能：
Pages 支援多種分享模式：
- 公開分享：任何人都可以通過 URL 訪問
- 限制存取：只有特定人員可以查看
- 協作編輯：多人可以共同編輯同一個 Page
- 評論功能：讀者可以添加評論和反饋

版本控制與更新：
Pages 支援版本管理，用戶可以：
- 查看頁面的修改歷史
- 回溯到之前的版本
- 設定自動更新，當 Space 中有新內容時更新 Page
- 通知訂閱者頁面已更新

最佳實踐指南：
1. 結構規劃：在開始創建前，先規劃好頁面的整體結構
2. 內容精煉：選擇最相關和最有價值的研究內容
3. 視覺優化：適當使用標題、列表、引用等格式提高可讀性
4. 定期更新：保持內容的時效性和準確性
5. 讀者導向：考慮目標讀者的需求和背景知識水平

Pages 與其他功能的整合：
Pages 與 Spaces 和 Library 形成了完整的知識管理循環：
- 在 Library 中進行初步研究
- 在 Spaces 中組織深度研究
- 用 Pages 將成果轉化為可分享的產出

這種整合讓 Perplexity 不僅是一個搜索工具，更是一個完整的知識工作平台。`,
          keyPoints: [
            'Pages 將 Spaces 中的研究成果轉化為結構化、可分享的精美報告',
            '支援自動生成和手動創建兩種模式，提供靈活的內容組織方式',
            '具備專業排版、智能引用、互動元素等特色，適合各種專業場景',
            '提供協作編輯、版本控制、多種分享模式等進階功能'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第四章測驗：知識管理與分享',
        description: '測試你對知識管理功能的理解。',
        timeLimit: 12,
        questions: [
          {
            question: 'Perplexity 的「Library」功能最主要的作用是什麼？',
            options: [
              '下載和存儲檔案',
              '作為個人化知識中心，存儲和組織所有研究活動',
              '與其他用戶聊天',
              '購買 Pro 訂閱'
            ],
            correctAnswer: 1,
            explanation: 'Library 是個人化知識中心，自動保存所有對話線程，是知識組織和內容創作的起點。'
          },
          {
            question: '「Spaces」取代了舊版的哪個功能？',
            options: [
              'Library',
              'Collections',
              'Pages',
              'Search'
            ],
            correctAnswer: 1,
            explanation: 'Spaces 取代了舊版的 Collections，實現從問答工具到項目研究平台的轉變。'
          },
          {
            question: 'Spaces 中的「自定義指令」(Custom Instructions) 功能可以做什麼？',
            options: [
              '改變介面顏色',
              '為每個 Space 設定專屬的 AI 行為模式',
              '自動備份資料',
              '加快搜索速度'
            ],
            correctAnswer: 1,
            explanation: '自定義指令讓 AI 在處理該 Space 內所有查詢時，都遵守預設的系統提示或指令。'
          },
          {
            question: '「Pages」功能的主要用途是什麼？',
            options: [
              '瀏覽其他用戶的內容',
              '將 Spaces 中的研究成果轉化為可分享的精美報告',
              '設定個人資料',
              '購買額外存儲空間'
            ],
            correctAnswer: 1,
            explanation: 'Pages 將研究成果轉化為結構化、可分享的精美報告，支援自動生成和手動創建。'
          },
          {
            question: '在 Spaces 中進行團隊協作時，以下哪項功能不包括？',
            options: [
              '成員管理和權限設定',
              '即時同步和並行工作',
              '評論系統和版本追蹤',
              '自動翻譯成員對話'
            ],
            correctAnswer: 3,
            explanation: 'Spaces 提供成員管理、即時同步、評論系統等協作功能，但不包括自動翻譯功能。'
          },
          {
            question: '建立有效的 Spaces 管理策略，以下哪項最重要？',
            options: [
              '創建盡可能多的 Spaces',
              '明確命名、定期整理、權限分級管理',
              '只使用預設設定',
              '避免與他人分享'
            ],
            correctAnswer: 1,
            explanation: '有效管理需要明確的命名規範、定期整理歸檔、權限分級管理和善用搜索功能。'
          }
        ]
      }
    },
    {
      id: 5,
      title: '第五章：釋放全部潛力',
      titleEn: 'Chapter 5: Unlocking Full Potential',
      description: 'Perplexity Pro 進階功能與訂閱方案',
      descriptionEn: 'Perplexity Pro Advanced Features & Subscription Plans',
      duration: '1.3 小時',
      lessons: [
        {
          id: 20,
          title: '5.1 Pro 訂閱方案詳解：功能對比與投資回報分析',
          duration: '20 分鐘',
          type: 'text' as const,
          description: '深入分析 Perplexity Pro 的完整功能和價值，幫助你做出明智的訂閱決策。',
          image: '/images/courses/perplexity-complete-course/unit-images/pro-subscription.png',
          imageAlt: 'Perplexity Pro 訂閱方案比較',
          transcript: `選擇是否升級到 Perplexity Pro 是許多重度使用者面臨的重要決策。本節將深入分析 Pro 版本的完整功能集，幫助你評估其投資回報價值。

Pro 訂閱方案概覽：
Perplexity Pro 目前的定價為每月 $20 美元（年付有折扣），相比許多 AI 工具的訂閱費用，這個價格在市場中屬於中等偏上的水平。但關鍵在於其提供的功能是否能為你的工作和學習帶來相應的價值。

核心功能對比：

1. Pro Search 功能：
免費版：標準搜索，基本 AI 模型回答
Pro 版：深度搜索，分析更多來源，提供更全面的答案

Pro Search 是 Pro 版本的王牌功能。它不僅搜索更多的網頁來源，還能進行更深層的分析，提供更準確、更全面的答案。對於需要高質量研究的用戶，這個功能往往能節省大量時間。

2. AI 模型選擇：
免費版：預設 AI 模型，無法切換
Pro 版：可選擇 GPT-4、Claude-3、Gemini 等最新模型

不同的 AI 模型各有特長：GPT-4 擅長創意思考，Claude 在文檔分析方面表現優秀，Gemini 在數據處理上有優勢。Pro 用戶可以根據具體任務選擇最適合的模型。

3. 使用限制：
免費版：每日查詢次數有限制
Pro 版：無限制使用所有功能

對於重度使用者，每日查詢限制可能是一個重要障礙。Pro 版本移除了這些限制，讓你可以專注於研究而不用擔心用量。

4. 檔案上傳：
免費版：支援基本檔案上傳
Pro 版：更大檔案、更多格式、更快處理速度

5. Spaces 和 Pages：
免費版：基本功能
Pro 版：高級協作功能、更多存儲空間、優先技術支援

投資回報分析：

時間成本節省：
如果 Pro Search 和高級 AI 模型能讓你每天節省 30 分鐘的研究時間，按照時薪 $30 計算，每天就能創造 $15 的價值，月收益 $450，遠超 $20 的訂閱費用。

工作效率提升：
- 學術研究者：更快的文獻綜述和數據分析
- 商業分析師：更準確的市場研究和競爭分析
- 內容創作者：更高質量的研究支撐和創意激發
- 學生：更高效的學習和作業完成

適合訂閱 Pro 的用戶類型：
1. 每天使用 Perplexity 超過 1 小時的重度用戶
2. 需要高質量研究的專業人士
3. 經常處理複雜檔案和數據的用戶
4. 需要團隊協作功能的組織用戶

不適合 Pro 的情況：
1. 偶爾使用，每週少於 5 次查詢
2. 主要用於簡單問答，不需要深度研究
3. 預算有限的個人用戶
4. 已有其他滿足需求的研究工具

試用建議：
Perplexity 通常提供免費試用期，建議在試用期間：
1. 測試 Pro Search 與標準搜索的差異
2. 體驗不同 AI 模型的表現
3. 評估檔案分析功能的實用性
4. 計算實際節省的時間成本

總結：
對於需要高質量研究的專業用戶，Perplexity Pro 通常能提供良好的投資回報。但對於輕度使用者，免費版本可能已經足夠滿足需求。關鍵是要根據自己的實際使用情況和工作需求做出判斷。`,
          keyPoints: [
            'Pro 版每月 $20，提供 Pro Search、AI 模型選擇、無限使用等核心功能',
            '適合每天使用超過 1 小時的重度用戶和專業研究人士',
            '時間成本節省往往能超過訂閱費用，具有良好的投資回報',
            '建議利用免費試用期充分測試功能，根據實際需求決定是否訂閱'
          ],
          completed: false
        },
        {
          id: 21,
          title: '5.2 Pro Search：更深度的查詢與更精準的結果',
          duration: '18 分鐘',
          type: 'text' as const,
          description: '探索 Pro Search 的高級算法和搜索能力，了解其與標準搜索的差異。',
          image: '/images/courses/perplexity-complete-course/unit-images/pro-search.png',
          imageAlt: 'Pro Search 功能展示',
          transcript: `Pro Search 是 Perplexity Pro 版本的核心功能，它代表了 AI 搜索技術的最前沿應用。理解其工作原理和優勢，能幫助你最大化利用這項強大工具。

Pro Search 的技術原理：
Pro Search 使用更先進的算法和更大的計算資源來處理查詢。與標準搜索相比，它會：
- 搜索更廣泛的網絡來源
- 進行更深層的內容分析
- 使用更複雜的推理過程
- 提供更全面的答案綜合

搜索深度的差異：

標準搜索：
- 通常檢查 10-20 個網頁來源
- 側重於最新和最相關的表面資訊
- 處理時間較短，回應較快
- 適合一般性問題和快速查詢

Pro Search：
- 可以檢查 50+ 個高質量來源
- 深入分析內容的邏輯關係和脈絡
- 處理時間較長，但結果更全面
- 特別適合複雜問題和深度研究

實際應用對比：

示例1：市場研究查詢
查詢：「2024年電動車市場的主要趨勢和挑戰」

標準搜索結果：
- 提供 3-5 個主要趨勢點
- 基於最新新聞報導和市場報告
- 約 300-500 字的答案

Pro Search 結果：
- 提供 8-12 個詳細趨勢分析
- 整合多個行業報告、專家觀點、政策文件
- 包含數據對比和預測分析
- 約 800-1200 字的綜合報告

示例2：學術研究查詢
查詢：「機器學習在醫療診斷中的最新突破」

標準搜索：概述性介紹，主要來自科技新聞
Pro Search：詳細的技術分析，引用最新論文，包含具體案例研究和臨床試驗數據

優勢特色：

1. 來源多樣性：
Pro Search 會同時檢索學術論文、新聞報導、政府文件、行業報告等多種來源類型，確保資訊的全面性和權威性。

2. 深度分析：
不僅提供表面資訊，還會分析不同觀點之間的關係、識別爭議點、提供平衡的觀點呈現。

3. 時效性平衡：
在提供最新資訊的同時，也會包含重要的歷史背景和發展脈絡，幫助用戶全面理解主題。

4. 品質控制：
優先選擇權威來源，並會標注資訊的可靠性等級，幫助用戶判斷資訊品質。

最佳使用策略：

何時選擇 Pro Search：
- 進行重要決策前的深度研究
- 撰寫學術論文或商業報告
- 需要全面了解複雜主題
- 驗證重要資訊的準確性

何時使用標準搜索：
- 快速查詢基本資訊
- 日常問題解答
- 時間緊迫的情況
- 簡單事實核查

技巧與注意事項：

1. 問題表述：
Pro Search 對問題的表述更敏感，詳細、明確的問題能獲得更好的結果。

2. 等待時間：
Pro Search 需要更長的處理時間（通常 30-60 秒），但結果品質顯著提升。

3. 結果利用：
Pro Search 的結果通常很長，建議重點關注：
- 執行摘要部分
- 關鍵發現和結論
- 引用來源的權威性

4. 成本意識：
雖然 Pro 用戶可以無限使用，但 Pro Search 消耗更多計算資源，建議針對真正需要深度分析的問題使用。

與其他功能的整合：
Pro Search 與 Spaces、Pages 功能整合良好，深度研究的結果可以直接保存到 Spaces 中，並用於生成專業報告。

總結：
Pro Search 是為需要高質量、深度研究的用戶設計的高級功能。它不是為了取代標準搜索，而是在需要最高品質結果時的專業選擇。`,
          keyPoints: [
            'Pro Search 檢查 50+ 來源，提供更深度的分析和更全面的答案',
            '特別適合重要決策研究、學術寫作、商業分析等高質量需求',
            '處理時間較長但結果品質顯著提升，需要平衡效率和品質',
            '與 Spaces、Pages 整合良好，支援完整的專業研究工作流程'
          ],
          completed: false
        },
        {
          id: 22,
          title: '5.3 AI 模型選擇：GPT-4、Claude、Gemini 的戰略性運用',
          duration: '22 分鐘',
          type: 'text' as const,
          description: '學習如何根據不同任務需求選擇最適合的 AI 模型，最大化使用效果。',
          image: '/images/courses/perplexity-complete-course/unit-images/ai-models.png',
          imageAlt: 'AI 模型選擇指南',
          transcript: `Perplexity Pro 用戶最大的優勢之一是可以選擇不同的 AI 模型來處理查詢。每個模型都有其獨特的強項和特色，了解如何戰略性地選擇模型能顯著提升你的研究效果。

主要 AI 模型介紹：

GPT-4 (OpenAI)：
GPT-4 是目前最知名的大語言模型之一，以其強大的通用能力著稱。

主要優勢：
- 優秀的創意思考和內容生成能力
- 強大的邏輯推理和問題解決能力
- 良好的多語言支援
- 在對話理解方面表現出色

最適用場景：
- 創意寫作和內容策劃
- 複雜問題的邏輯分析
- 多步驟推理任務
- 需要創新思維的商業策略制定

Claude (Anthropic)：
Claude 以其在安全性和有用性方面的平衡著稱，特別擅長文檔分析和結構化思考。

主要優勢：
- 優秀的文檔理解和分析能力
- 嚴謹的事實核查和引用習慣
- 良好的結構化輸出能力
- 在處理敏感話題時更加謹慎

最適用場景：
- 學術研究和文獻分析
- 法律文件和合約審查
- 需要嚴謹性的專業報告
- 複雜文檔的摘要和解析

Gemini (Google)：
Gemini 是 Google 的多模態 AI 模型，在處理數據和整合多種資訊類型方面有優勢。

主要優勢：
- 強大的數據分析和統計能力
- 優秀的多模態理解（文字、圖片、數據）
- 與 Google 生態系統整合良好
- 在科學和技術查詢方面表現突出

最適用場景：
- 數據分析和統計研究
- 科學和技術問題查詢
- 需要處理圖表和數據的任務
- 多媒體內容分析

戰略選擇指南：

任務類型導向選擇：

創意任務 → GPT-4
- 部落格文章創作
- 行銷文案撰寫
- 產品創新思考
- 故事和內容創作

分析任務 → Claude
- 學術論文分析
- 商業計畫書審查
- 政策文件解讀
- 風險評估報告

數據任務 → Gemini
- 市場數據分析
- 科學研究查詢
- 技術規格比較
- 統計趋势分析

專業領域選擇建議：

商業和管理：
- 戰略規劃：GPT-4（創意思維）
- 財務分析：Gemini（數據處理）
- 合約審查：Claude（嚴謹分析）

學術研究：
- 文獻綜述：Claude（結構化分析）
- 假設生成：GPT-4（創新思考）
- 數據解釋：Gemini（統計分析）

技術開發：
- 架構設計：GPT-4（創意解決方案）
- 代碼審查：Claude（嚴謹檢查）
- 性能分析：Gemini（數據驅動）

實際應用策略：

1. 單一模型深度使用：
對於專業度要求很高的任務，選擇最適合的模型進行深度對話，建立上下文理解。

2. 多模型對比驗證：
對於重要決策，可以用不同模型處理同一問題，比較結果的差異和一致性。

3. 階段性模型切換：
- 初期探索：GPT-4（廣泛思考）
- 深度分析：Claude（嚴謹分析）
- 數據驗證：Gemini（事實核查）

4. 專案導向配置：
在 Spaces 中為不同類型的專案設定預設模型，確保一致性。

模型選擇的注意事項：

1. 沒有絕對的最佳選擇：
每個模型都有其優勢和限制，關鍵是匹配任務需求。

2. 定期重新評估：
AI 模型持續更新，要定期重新評估各模型的表現。

3. 個人偏好因素：
不同用戶可能對同一模型有不同的體驗，建議親自測試找到最適合的組合。

4. 成本效益考量：
雖然 Pro 用戶可以自由切換，但要考慮切換模型的時間成本。

未來發展趨勢：
隨著 AI 技術的快速發展，預期會有更多專業化的模型加入 Perplexity 平台。保持開放心態，持續學習新模型的特性將是保持競爭優勢的關鍵。`,
          keyPoints: [
            'GPT-4 擅長創意思考，Claude 專精文檔分析，Gemini 優於數據處理',
            '根據任務類型選擇：創意用 GPT-4，分析用 Claude，數據用 Gemini',
            '可採用單一模型深度使用或多模型對比驗證的策略',
            '沒有絕對最佳選擇，關鍵是匹配具體任務需求和個人偏好'
          ],
          completed: false
        },
        {
          id: 23,
          title: '5.4 API 整合與自動化工作流程',
          duration: '18 分鐘',
          type: 'text' as const,
          description: '學習如何將 Perplexity 整合到現有工作流程中，實現自動化和效率提升。',
          image: '/images/courses/perplexity-complete-course/unit-images/api-integration.png',
          imageAlt: 'Perplexity API 整合示意圖',
          transcript: `Perplexity 的 API 功能允許開發者和進階用戶將其強大的搜索和 AI 能力整合到自己的應用程式和工作流程中。這種整合能夠實現真正的自動化研究和智能決策支援。

API 基礎概念：
Perplexity API 提供了程式化存取平台核心功能的能力，包括：
- 搜索查詢執行
- AI 模型選擇
- 檔案上傳和分析
- Spaces 管理
- Pages 創建和編輯

主要應用場景：

1. 自動化內容研究：
媒體公司可以建立自動化系統，定期搜索特定主題的最新發展，生成研究報告。

範例工作流程：
- 每日自動搜索「AI 技術最新突破」
- 分析結果並提取關鍵資訊
- 生成簡報格式的每日技術動態
- 自動發送給相關團隊成員

2. 商業智能整合：
企業可以將 Perplexity 整合到商業智能平台中，提供即時的市場分析和競爭情報。

整合範例：
- 監控競爭對手的產品發佈和策略變化
- 自動分析行業趨勢和市場動態
- 生成定期的競爭分析報告
- 觸發預警系統提醒重要變化

3. 學術研究輔助：
研究機構可以建立自動化的文獻監控和分析系統。

實施策略：
- 設定關鍵詞追蹤最新論文發表
- 自動分析新研究的相關性和重要性
- 生成文獻綜述更新
- 通知研究團隊重要發現

4. 客戶服務增強：
客服團隊可以整合 Perplexity 提供更準確、更及時的資訊支援。

應用方式：
- 即時查詢產品技術規格和相容性
- 搜索解決方案和故障排除指南
- 提供行業最佳實踐建議
- 生成個人化的產品推薦

技術實施考量：

API 呼叫限制：
- 了解每月 API 呼叫次數限制
- 設計高效的查詢策略避免浪費
- 實施快取機制減少重複查詢
- 監控使用量和成本

資料處理最佳實踐：
- 結構化 API 回應數據
- 實施錯誤處理和重試機制
- 設計資料清理和正規化流程
- 建立品質控制檢查點

安全性和隱私：
- 保護 API 金鑰和存取憑證
- 實施適當的資料加密
- 遵守資料保護法規
- 建立稽核記錄追蹤

整合工具和平台：

與現有工具整合：
- Slack：建立聊天機器人提供即時研究支援
- Microsoft Teams：整合會議助手提供背景資訊
- Notion：自動更新知識庫和專案文件
- Google Workspace：增強文件協作和研究能力

自動化平台：
- Zapier：無代碼整合解決方案
- Microsoft Power Automate：企業級自動化
- IFTTT：簡單的觸發器自動化
- Custom Scripts：客製化解決方案

實施策略建議：

1. 從小開始：
選擇一個簡單的使用案例進行試點，驗證概念和價值。

2. 逐步擴展：
成功驗證後，逐步擴展到更複雜的使用案例。

3. 使用者培訓：
確保團隊了解如何使用新的自動化工具和流程。

4. 持續優化：
定期評估和改進自動化流程的效果和效率。

成本效益分析：
評估 API 整合的投資回報：
- 計算節省的人工時間成本
- 評估決策品質的提升價值
- 考慮實施和維護成本
- 分析競爭優勢的長期價值

未來發展方向：
隨著 AI 技術的發展，預期 Perplexity API 將提供更多高級功能：
- 更精細的個人化設定
- 更強大的多模態分析能力
- 更好的與其他 AI 工具整合
- 更靈活的工作流程自動化選項

成功案例啟示：
許多組織通過 API 整合實現了顯著的效率提升和競爭優勢。關鍵是要清楚定義目標，選擇適當的實施策略，並持續優化流程。`,
          keyPoints: [
            'API 整合可實現自動化內容研究、商業智能、學術輔助等多種應用',
            '需要考慮 API 限制、資料處理、安全性等技術實施要點',
            '可與 Slack、Notion、Zapier 等現有工具平台無縫整合',
            '建議從小規模試點開始，逐步擴展並持續優化自動化流程'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第五章測驗：Perplexity Pro 進階功能',
        description: '測試你對 Pro 功能的掌握。',
        timeLimit: 15,
        questions: [
          {
            question: 'Perplexity Pro 的訂閱費用每月大約是多少，年付會有折扣嗎？',
            options: [
              '每月 $15，年付無折扣',
              '每月 $20，年付有折扣',
              '每月 $25，年付無折扣',
              '每月 $30，年付有折扣'
            ],
            correctAnswer: 1,
            explanation: 'Perplexity Pro 目前定價為每月 $20 美元，年付通常會有折扣優惠。'
          },
          {
            question: 'Pro Search 與標準搜索最主要的差異是什麼？',
            options: [
              '介面設計不同',
              'Pro Search 檢查更多來源，提供更深度的分析',
              '只是價格不同',
              '回應速度更快'
            ],
            correctAnswer: 1,
            explanation: 'Pro Search 可以檢查 50+ 個高質量來源，進行更深層的分析，處理時間較長但結果更全面。'
          },
          {
            question: '在 AI 模型選擇中，GPT-4 最擅長處理哪類任務？',
            options: [
              '數據分析和統計',
              '創意思考和內容生成',
              '文檔分析和結構化思考',
              '圖片識別'
            ],
            correctAnswer: 1,
            explanation: 'GPT-4 以其強大的創意思考和內容生成能力著稱，最適合創意寫作、複雜邏輯推理等任務。'
          },
          {
            question: 'Claude AI 模型的主要優勢是什麼？',
            options: [
              '處理速度最快',
              '優秀的文檔理解和分析能力',
              '支援最多語言',
              '檔案容量最大'
            ],
            correctAnswer: 1,
            explanation: 'Claude 特別擅長文檔分析和結構化思考，在學術研究、法律文件審查等需要嚴謹性的任務中表現優秀。'
          },
          {
            question: 'Gemini AI 模型在哪個領域表現最突出？',
            options: [
              '創意寫作',
              '數據分析和多模態理解',
              '對話聊天',
              '語言翻譯'
            ],
            correctAnswer: 1,
            explanation: 'Gemini 在數據分析、統計能力和多模態理解方面有優勢，特別適合科學技術查詢和數據處理任務。'
          },
          {
            question: 'Perplexity API 整合的主要應用場景不包括以下哪項？',
            options: [
              '自動化內容研究',
              '商業智能整合',
              '學術研究輔助',
              '直接替代人工客服進行情感支援'
            ],
            correctAnswer: 3,
            explanation: 'API 主要用於自動化研究、商業分析、學術輔助等，但不適合需要情感支援的人工客服場景。'
          },
          {
            question: '對於重度使用者，Pro 版本的投資回報主要體現在哪裡？',
            options: [
              '介面更美觀',
              '節省大量研究時間，提升決策品質',
              '支援更多裝置',
              '提供免費存儲空間'
            ],
            correctAnswer: 1,
            explanation: 'Pro 版本通過節省研究時間（每天 30 分鐘可創造遠超 $20 的價值）和提升決策品質實現良好投資回報。'
          }
        ]
      }
    },
    {
      id: 6,
      title: '第六章：實戰與比較',
      titleEn: 'Chapter 6: Practical Applications & Comparisons',
      description: 'Perplexity 在 AI 工具生態中的定位',
      descriptionEn: "Perplexity's Position in the AI Tools Ecosystem",
      duration: '1.7 小時',
      lessons: [
        {
          id: 24,
          title: '6.1 學術研究實戰：文獻綜述與引用管理',
          duration: '25 分鐘',
          type: 'text' as const,
          description: '學習在學術環境中充分發揮 Perplexity 的價值，提升研究效率和品質。',
          image: '/images/courses/perplexity-complete-course/unit-images/academic-research.png',
          imageAlt: '學術研究實戰應用',
          transcript: `在學術研究領域，Perplexity AI 正在革命性地改變研究者獲取、分析和整理資訊的方式。本節將深入探討如何在學術環境中最大化利用 Perplexity 的強大功能。

學術研究的挑戰：
傳統的學術研究面臨諸多挑戰：資訊過載、來源分散、時間成本高昂、語言障礙、以及難以追蹤最新發展。Perplexity 的出現為這些問題提供了創新的解決方案。

文獻綜述革新：

傳統文獻綜述流程：
1. 在多個資料庫中搜索關鍵詞
2. 逐一閱讀論文摘要
3. 下載相關論文全文
4. 手動整理和分類
5. 識別研究空白和趨勢

Perplexity 增強的文獻綜述：
1. 使用自然語言描述研究問題
2. AI 自動搜索並分析相關文獻
3. 獲得結構化的研究現狀總結
4. 識別關鍵論文和引用網絡
5. 發現潛在的研究方向

實戰應用案例：

案例1：快速了解研究領域
查詢：「2020年以來關於量子計算在密碼學應用的主要研究進展，請分析技術突破、應用場景和面臨的挑戰」

Perplexity 回應：
- 自動搜索最新學術論文
- 提供技術發展時間軸
- 分析不同研究機構的貢獻
- 識別研究熱點和爭議點
- 預測未來研究方向

案例2：跨學科研究探索
查詢：「人工智能在醫學影像診斷中的應用如何與傳統放射學方法結合，有哪些成功案例和技術挑戰？」

優勢：
- 整合醫學和AI兩個領域的文獻
- 提供跨領域的視角和洞察
- 識別學科交叉的創新機會

引用管理最佳實踐：

自動引用生成：
Perplexity 為每個資訊點提供詳細的來源引用，包括：
- 論文標題和作者
- 發表期刊和時間
- DOI 和連結
- 引用格式（APA、MLA、Chicago 等）

引用驗證策略：
1. 優先權威期刊：Nature、Science、IEEE 等
2. 檢查同行評議狀態
3. 驗證作者機構和聲譽
4. 交叉對比多個來源
5. 注意發表時間的時效性

建立引用資料庫：
- 在 Spaces 中為每個研究項目建立專門空間
- 使用自定義指令確保引用格式一致
- 定期匯出引用清單到 Mendeley 或 Zotero
- 建立個人的研究主題分類系統

學術寫作支援：

論文結構規劃：
請求 Perplexity 協助：
「基於現有文獻，幫我規劃一篇關於[主題]的論文結構，包括引言、文獻回顧、方法、預期結果和討論的重點」

研究方法建議：
「針對[研究問題]，分析不同研究方法的優缺點，推薦最適合的研究設計和數據收集方法」

數據分析指導：
「解釋[統計方法]在[研究領域]中的應用，提供具體的分析步驟和結果解釋指南」

國際合作與語言支援：

多語言文獻整合：
Perplexity 能夠搜索和分析不同語言的學術文獻，特別有助於：
- 獲得更全面的國際視野
- 發現非英語文獻中的獨特觀點
- 比較不同文化背景下的研究方法

翻譯和本地化：
- 將重要外文文獻要點翻譯成中文
- 解釋專業術語的多語言對應
- 協助撰寫國際期刊投稿的英文論文

研究倫理和學術誠信：

正確使用原則：
1. 明確標示所有引用來源
2. 避免過度依賴AI生成內容
3. 保持批判性思維驗證資訊
4. 尊重原創性和知識產權
5. 遵守學術機構的AI使用政策

品質控制檢查：
- 交叉驗證重要發現
- 查閱原始論文確認解釋準確性
- 與指導教授討論AI協助的範圍
- 建立個人的資訊核查清單

效率提升統計：
根據用戶反饋，使用 Perplexity 進行學術研究的效率提升包括：
- 文獻搜索時間減少 60-80%
- 跨領域資訊整合效率提升 3-5倍
- 論文寫作準備時間縮短 40-60%
- 研究趨勢掌握速度提升 5-10倍

成功案例分享：
許多研究生和學者已經成功將 Perplexity 整合到研究工作流程中，在國際期刊發表論文、完成學位論文、獲得研究基金等方面取得顯著成果。`,
          keyPoints: [
            '革新文獻綜述流程，從關鍵詞搜索轉向自然語言問題驅動的研究',
            '提供自動引用生成和多格式支援，簡化引用管理工作',
            '支援跨學科和多語言文獻整合，擴大研究視野',
            '大幅提升研究效率，文獻搜索時間減少 60-80%，整合效率提升 3-5倍'
          ],
          completed: false
        },
        {
          id: 25,
          title: '6.2 商業應用案例：市場調研、競爭分析、趨勢預測',
          duration: '28 分鐘',
          type: 'text' as const,
          description: '探討 Perplexity 在商業環境中的實際應用，提升決策品質和競爭優勢。',
          image: '/images/courses/perplexity-complete-course/unit-images/business-applications.png',
          imageAlt: '商業應用案例展示',
          transcript: `在快速變化的商業環境中，及時準確的資訊獲取和分析能力直接影響企業的競爭力和決策品質。Perplexity AI 為商業用戶提供了強大的市場情報和分析工具。

商業情報革命：

傳統商業調研挑戰：
- 資訊來源分散且更新不及時
- 人工收集和分析耗時費力
- 難以獲得全面的市場視角
- 國際市場資訊獲取困難
- 趨勢識別往往滞後於市場變化

Perplexity 的商業價值：
- 即時市場資訊獲取
- 自動化競爭情報收集
- 全球化視野和本地化洞察
- 趨勢預測和機會識別
- 決策支援和風險評估

市場調研實戰應用：

1. 新市場進入評估
查詢範例：「分析東南亞電動車市場的現狀、主要參與者、政策環境、消費者需求和進入障礙，評估2024-2026年的市場機會」

Perplexity 提供：
- 市場規模和增長趨勢
- 主要競爭者分析
- 政策法規環境
- 消費者行為洞察
- 進入策略建議

2. 產品市場驗證
查詢範例：「智能家居安防系統在歐洲市場的需求趨勢、價格敏感度、技術要求和通路偏好分析」

分析維度：
- 市場需求規模
- 客戶群體分析
- 技術趨勢要求
- 定價策略參考
- 銷售通路選擇

3. 行業趨勢監控
設定定期查詢：「金融科技行業本月的重要發展、監管變化、新技術應用和投資動態」

持續洞察：
- 行業動態追蹤
- 監管環境變化
- 技術創新趨勢
- 投資併購活動
- 新興商業模式

競爭分析深度應用：

競爭對手情報收集：
1. 全面競爭者檔案建立
「分析[競爭對手]的商業模式、產品策略、市場定位、財務表現、管理團隊和近期戰略動向」

2. 產品對比分析
「比較[我們產品]與[競爭產品]在功能、價格、用戶體驗、市場表現等方面的差異和優劣勢」

3. 競爭策略預測
「基於[競爭對手]的歷史行為和當前市場環境，預測其可能的策略調整和市場行動」

SWOT 分析增強：
利用 Perplexity 進行更客觀的 SWOT 分析：
- Strengths：對比行業標竿識別優勢
- Weaknesses：分析競爭者表現找出差距
- Opportunities：發現市場空白和新興機會
- Threats：監控外部風險和競爭威脅

趨勢預測和機會識別：

宏觀趨勢分析：
「分析影響[行業]未來3-5年發展的主要趨勢，包括技術、社會、經濟、環境和政治因素」

新興機會發現：
「識別[行業]中尚未被充分開發的細分市場、技術應用或商業模式創新機會」

風險預警系統：
「監控可能對[公司/行業]造成重大影響的潛在風險，包括技術變革、監管變化、供應鏈中斷等」

商業決策支援：

投資決策分析：
「評估投資[特定項目/公司]的機會和風險，分析行業前景、競爭環境、財務表現和增長潛力」

策略規劃支援：
「為[公司]制定未來3年的數位轉型策略，考慮技術趨勢、市場需求、競爭環境和內部能力」

併購盡職調查：
「分析[目標公司]的市場地位、競爭優勢、財務健康度、技術價值和整合風險」

具體行業應用案例：

科技行業：
- 新技術趨勢監控
- 專利競爭分析
- 產品發布策略
- 人才市場動態

零售業：
- 消費趨勢分析
- 供應鏈優化
- 全通路策略
- 品牌定位研究

金融服務：
- 監管變化追蹤
- 金融科技創新
- 風險管理趨勢
- 客戶行為分析

製造業：
- 供應鏈風險監控
- 自動化技術趨勢
- 可持續發展要求
- 全球市場機會

實施建議和最佳實踐：

1. 建立系統化的資訊收集流程
- 設定定期監控主題
- 建立關鍵問題清單
- 創建資訊驗證機制
- 建立決策應用流程

2. 組建商業情報團隊
- 培訓員工使用 Perplexity
- 分配專門的分析責任
- 建立資訊共享機制
- 定期評估分析品質

3. 整合現有商業系統
- 與 CRM 系統整合
- 連接商業智能平台
- 建立報告自動化
- 設定預警提醒系統

投資回報評估：
企業使用 Perplexity 進行商業分析的典型收益：
- 市場調研成本降低 50-70%
- 競爭情報獲取速度提升 5-10倍
- 決策反應時間縮短 40-60%
- 新機會識別率提升 3-5倍
- 風險預警準確性提升 200%

成功案例啟示：
許多企業已經成功將 Perplexity 整合到商業決策流程中，在新產品開發、市場擴張、投資決策等方面取得顯著成果，大幅提升了競爭優勢和盈利能力。`,
          keyPoints: [
            '提供即時市場情報和全球化視野，支援新市場進入和產品驗證',
            '強化競爭分析和 SWOT 分析，建立客觀的競爭情報系統',
            '支援趨勢預測和機會識別，提供決策支援和風險預警',
            '大幅提升商業分析效率，市場調研成本降低 50-70%，決策速度提升 5-10倍'
          ],
          completed: false
        },
        {
          id: 26,
          title: '6.3 與其他 AI 工具的協同：ChatGPT + Perplexity 混合工作流',
          duration: '22 分鐘',
          type: 'text' as const,
          description: '學習建立高效的多工具協作策略，發揮不同 AI 工具的組合優勢。',
          image: '/images/courses/perplexity-complete-course/unit-images/ai-collaboration.png',
          imageAlt: 'AI 工具協同工作流程',
          transcript: `在 AI 工具日益豐富的今天，單一工具往往難以滿足所有需求。學會組合使用不同的 AI 工具，特別是 Perplexity 與 ChatGPT 的協同，能夠創造出遠超單一工具的價值。

工具協同的核心理念：

互補性原則：
不同 AI 工具各有優勢，通過組合使用可以：
- 彌補單一工具的局限性
- 發揮各工具的最大優勢
- 創造協同效應
- 提升整體工作效率

Perplexity vs ChatGPT 比較：

Perplexity 的核心優勢：
- 即時資訊搜索和獲取
- 可靠的來源引用和驗證
- 最新資訊和趨勢分析
- 事實密集型研究
- 多來源資訊整合

ChatGPT 的核心優勢：
- 創意內容生成和創作
- 複雜邏輯推理和分析
- 程式碼生成和除錯
- 教學和解釋複雜概念
- 對話式互動和brainstorming

協同工作流程設計：

1. 研究 → 創作流程
步驟：
a) Perplexity：收集最新資料和趨勢分析
b) ChatGPT：基於收集的資料進行創意發想
c) Perplexity：驗證和補充具體數據
d) ChatGPT：完成內容創作和編輯

實際應用：
「撰寫一篇關於2024年AI發展趨勢的文章」
- Perplexity：搜索2024年AI領域的最新發展
- ChatGPT：基於收集資料創作文章大綱和內容
- Perplexity：補充具體數據和案例
- ChatGPT：優化文章結構和語言表達

2. 分析 → 決策流程
步驟：
a) Perplexity：收集市場數據和競爭資訊
b) ChatGPT：進行SWOT分析和策略建議
c) Perplexity：驗證分析假設和補充資料
d) ChatGPT：制定具體行動計劃

實際應用：
「制定新產品上市策略」
- Perplexity：分析目標市場現狀和競爭環境
- ChatGPT：基於分析結果提出策略選項
- Perplexity：研究成功案例和最佳實踐
- ChatGPT：制定詳細的執行計劃

3. 學習 → 應用流程
步驟：
a) Perplexity：搜索最新的技術資料和教學資源
b) ChatGPT：解釋複雜概念和提供學習指導
c) Perplexity：尋找實際應用案例和工具
d) ChatGPT：協助實踐和問題解決

具體工作流程範例：

學術研究工作流：
1. 主題探索階段
   - Perplexity：「2024年機器學習在醫療診斷中的最新突破」
   - ChatGPT：「基於這些資料，幫我分析研究趨勢和潛在研究方向」

2. 文獻綜述階段
   - Perplexity：收集相關論文和數據
   - ChatGPT：協助整理文獻脈絡和理論框架

3. 研究設計階段
   - ChatGPT：設計研究方法和實驗流程
   - Perplexity：驗證方法的可行性和尋找相似研究

4. 論文撰寫階段
   - ChatGPT：協助寫作和結構優化
   - Perplexity：補充最新引用和數據驗證

商業分析工作流：
1. 市場研究階段
   - Perplexity：「東南亞電商市場2024年發展現狀」
   - ChatGPT：「分析這些數據，識別關鍵成功因素」

2. 競爭分析階段
   - Perplexity：收集競爭對手資訊
   - ChatGPT：進行競爭策略分析和建議

3. 機會評估階段
   - ChatGPT：基於數據進行SWOT分析
   - Perplexity：驗證市場機會和風險因素

4. 策略制定階段
   - ChatGPT：制定進入策略和行動計劃
   - Perplexity：研究最佳實踐和成功案例

技術開發工作流：
1. 需求分析階段
   - Perplexity：「2024年前端開發框架趨勢和最佳實踐」
   - ChatGPT：「分析項目需求，推薦技術方案」

2. 技術選型階段
   - ChatGPT：比較不同技術方案的優缺點
   - Perplexity：查證技術的最新發展和社群支援

3. 開發實施階段
   - ChatGPT：協助代碼編寫和問題解決
   - Perplexity：尋找解決方案和最佳實踐

4. 優化改進階段
   - Perplexity：研究性能優化技術
   - ChatGPT：協助實施優化方案

工具整合策略：

1. 序列式協同
按照固定順序使用不同工具，每個工具處理特定類型的任務。

2. 並行式協同
同時使用多個工具處理不同方面的問題，然後整合結果。

3. 迭代式協同
在不同工具間反覆切換，逐步完善和深化分析。

4. 驗證式協同
使用一個工具的結果來驗證另一個工具的輸出。

效率優化建議：

1. 建立標準工作流程
為常見任務建立標準的工具使用順序和流程。

2. 設定工具轉換點
明確什麼情況下應該從一個工具切換到另一個工具。

3. 維護工作記錄
記錄不同工具的輸出，便於追蹤和整合。

4. 持續評估優化
定期評估工作流程的效果，進行調整和優化。

協同效果評估：
合理的工具協同可以帶來：
- 工作效率提升 150-300%
- 輸出品質改善 50-100%
- 創新思維增強 200%
- 決策準確性提升 40-80%

注意事項和最佳實踐：

1. 避免工具依賴
保持對每個工具能力和限制的清晰認識。

2. 維護一致性
確保不同工具輸出間的邏輯一致性。

3. 品質控制
建立檢查機制，驗證協同結果的準確性。

4. 成本意識
合理分配各工具的使用，避免不必要的重複。

未來發展趨勢：
隨著 AI 生態系統的發展，工具間的協同將變得更加重要。掌握多工具協同能力將成為未來知識工作者的核心競爭力。`,
          keyPoints: [
            'Perplexity 擅長即時資訊搜索，ChatGPT 專精創意生成，組合使用發揮互補優勢',
            '建立研究→創作、分析→決策、學習→應用等標準協同工作流程',
            '採用序列式、並行式、迭代式、驗證式等不同協同策略',
            '合理協同可提升工作效率 150-300%，決策準確性提升 40-80%'
          ],
          completed: false
        },
        {
          id: 27,
          title: '6.4 未來展望：「答案引擎」將如何重塑資訊獲取',
          duration: '20 分鐘',
          type: 'text' as const,
          description: '探討 AI 搜索的未來趨勢和對知識工作、教育、決策的深遠影響。',
          image: '/images/courses/perplexity-complete-course/unit-images/future-outlook.png',
          imageAlt: '答案引擎未來發展前景',
          transcript: `我們正站在資訊革命的新起點。「答案引擎」的興起不僅是技術的進步，更是人類獲取和處理知識方式的根本性轉變。理解這一趨勢對於把握未來的機會和挑戰至關重要。

資訊獲取的演進歷程：

從圖書館到搜索引擎：
- 圖書館時代：實體資源，專家導引
- 互聯網時代：海量資訊，自主搜索
- 搜索引擎時代：關鍵詞匹配，連結導航
- 答案引擎時代：直接答案，智能理解

技術演進的核心推動力：
1. 大語言模型的突破性進展
2. 多模態 AI 的整合能力
3. 實時資訊處理技術
4. 個人化和上下文理解
5. 跨語言和跨文化適應

答案引擎的技術前景：

即將到來的突破：
1. 更強的推理能力
   - 複雜邏輯推理
   - 因果關係分析
   - 預測性分析
   - 創新思維模擬

2. 更深的個人化
   - 學習個人偏好和習慣
   - 適應專業背景和知識水平
   - 記憶歷史互動和反饋
   - 提供客製化的學習路徑

3. 更廣的整合能力
   - 多模態資訊處理（文字、圖像、音頻、視頻）
   - 實時數據流整合
   - 跨平台無縫協作
   - 物聯網設備連接

4. 更快的回應速度
   - 毫秒級查詢回應
   - 預測性資訊準備
   - 邊緣計算優化
   - 量子計算應用

對各行業的深遠影響：

教育領域革命：
傳統教育模式：
- 標準化課程和教學方法
- 以教師為中心的知識傳授
- 被動學習和記憶導向
- 統一的評估標準

答案引擎驅動的新教育：
- 個人化學習路徑和內容
- 學生主導的探索式學習
- 實時問答和即時反饋
- 能力導向的動態評估

具體變化：
- 教師角色從知識傳授者轉為學習引導者
- 學習內容從固定課本轉為動態資源
- 評估方式從考試分數轉為能力展現
- 學習空間從教室擴展到任何地方

醫療健康轉型：
現狀挑戰：
- 醫療資源分佈不均
- 診斷經驗依賴個人積累
- 醫學知識更新滯後
- 病患自我診斷困難

答案引擎的貢獻：
- 輔助診斷和治療建議
- 最新醫學研究整合
- 個人化健康管理
- 醫患溝通優化

應用前景：
- 智能症狀分析和初步診斷
- 個人化治療方案推薦
- 藥物相互作用檢查
- 持續健康監控和預警

商業決策革新：
傳統決策挑戰：
- 資訊收集耗時耗力
- 分析能力有限
- 預測準確性不足
- 決策滞後於市場變化

答案引擎增強決策：
- 實時市場情報分析
- 多維度風險評估
- 預測性商業建模
- 自動化決策支援

科學研究加速：
研究流程優化：
- 文獻綜述自動化
- 假設生成和驗證
- 實驗設計優化
- 跨學科知識整合

發現加速：
- 模式識別和洞察發現
- 潛在研究方向預測
- 研究資源最佳分配
- 國際合作促進

社會影響和挑戰：

積極影響：
1. 知識民主化
   - 消除資訊獲取的經濟和地理障礙
   - 提供平等的學習和發展機會
   - 促進全球知識分享和協作

2. 效率大幅提升
   - 減少重複性的資訊搜索工作
   - 加快決策和問題解決速度
   - 提升創新和創造力

3. 個人化體驗
   - 適應個人需求和偏好
   - 提供客製化的學習和工作支援
   - 增強人機協作效果

潛在挑戰：
1. 資訊依賴問題
   - 批判思維能力可能退化
   - 對AI回答的過度信任
   - 獨立思考能力的削弱

2. 隱私和安全考量
   - 個人資料的收集和使用
   - 資訊安全和數據保護
   - 演算法偏見和公平性

3. 社會結構變化
   - 某些職業可能被取代
   - 數位鴻溝可能加劇
   - 社會不平等問題

應對策略和建議：

個人層面：
1. 培養批判思維
   - 學會驗證AI提供的資訊
   - 保持獨立思考和判斷能力
   - 發展多元化的知識來源

2. 提升AI素養
   - 理解AI工具的能力和限制
   - 學會有效地與AI協作
   - 掌握多種AI工具的使用

3. 持續學習適應
   - 跟上技術發展趨勢
   - 不斷更新知識和技能
   - 培養終身學習的習慣

組織層面：
1. 制定AI策略
   - 評估AI對業務的影響
   - 制定AI採用和整合計劃
   - 建立AI治理框架

2. 培訓員工
   - 提供AI工具培訓
   - 發展AI協作技能
   - 建立新的工作流程

3. 倫理考量
   - 建立AI使用倫理準則
   - 確保透明度和問責制
   - 保護員工和客戶權益

社會層面：
1. 政策制定
   - 制定AI發展規範
   - 保護個人隱私權益
   - 促進公平和包容

2. 教育改革
   - 更新教育課程和方法
   - 培養21世紀所需技能
   - 建立終身學習體系

3. 國際合作
   - 促進全球AI治理合作
   - 分享最佳實踐和經驗
   - 應對共同挑戰

未來5-10年的預測：

技術發展：
- 答案引擎將變得更加智能和人性化
- 多模態整合將成為標準
- 個人AI助手將普及
- 實時協作AI將興起

社會變遷：
- 教育和工作模式將徹底改變
- 新的職業和技能需求將出現
- 人機協作將成為新常態
- 知識工作的定義將重新定義

機會和挑戰：
- 巨大的創新和創業機會
- 新的社會和倫理挑戰
- 國際競爭格局的重塑
- 人類文明發展的新階段

結論：
答案引擎的發展將帶來人類歷史上最深刻的資訊革命之一。雖然面臨挑戰，但機會遠大於風險。關鍵是要主動適應、理性應用、負責任地發展這項技術，確保它能真正服務於人類的福祉和進步。

作為這場革命的見證者和參與者，我們有責任學習、理解並善用這些工具，同時保持對其影響的敏感性和責任感。未來屬於那些能夠與AI協作、發揮人類獨特價值的人。`,
          keyPoints: [
            '答案引擎將推動教育、醫療、商業、科研等領域的根本性變革',
            '技術發展趨勢包括更強推理能力、更深個人化、更廣整合能力',
            '帶來知識民主化和效率提升，但也面臨依賴性、隱私、社會結構變化等挑戰',
            '個人和組織需要培養AI素養、批判思維，制定適應策略和倫理準則'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第六章測驗：實戰與比較',
        description: '測試你對實戰應用的理解。',
        timeLimit: 18,
        questions: [
          {
            question: '在學術研究中使用 Perplexity 進行文獻綜述，最大的優勢是什麼？',
            options: [
              '完全取代人工閱讀',
              '從關鍵詞搜索轉向自然語言問題驅動的研究',
              '只提供英文文獻',
              '自動寫作論文'
            ],
            correctAnswer: 1,
            explanation: 'Perplexity 革新了文獻綜述流程，使用自然語言描述問題，AI 自動搜索分析相關文獻，大幅提升效率。'
          },
          {
            question: '使用 Perplexity 進行商業分析，在市場調研成本方面可以實現多少改善？',
            options: [
              '降低 20-30%',
              '降低 50-70%',
              '降低 80-90%',
              '沒有明顯改善'
            ],
            correctAnswer: 1,
            explanation: '企業使用 Perplexity 進行商業分析，市場調研成本通常能降低 50-70%，決策速度提升 5-10倍。'
          },
          {
            question: 'Perplexity 與 ChatGPT 的協同工作流程中，哪個工具更適合進行即時資訊搜索？',
            options: [
              'ChatGPT',
              'Perplexity',
              '兩者相同',
              '都不適合'
            ],
            correctAnswer: 1,
            explanation: 'Perplexity 擅長即時資訊搜索和可靠來源引用，而 ChatGPT 更適合創意內容生成和複雜邏輯推理。'
          },
          {
            question: '在研究→創作的協同工作流程中，正確的順序是什麼？',
            options: [
              'ChatGPT 收集資料 → Perplexity 創作內容',
              'Perplexity 收集資料 → ChatGPT 創意發想 → Perplexity 驗證數據 → ChatGPT 完成創作',
              '只使用一個工具完成所有任務',
              '同時使用兩個工具做相同的事'
            ],
            correctAnswer: 1,
            explanation: '最佳協同流程是：Perplexity 收集最新資料 → ChatGPT 創意發想 → Perplexity 驗證補充 → ChatGPT 完成創作。'
          },
          {
            question: '答案引擎對教育領域的最大影響是什麼？',
            options: [
              '完全取代教師',
              '實現個人化學習路徑和學生主導的探索式學習',
              '只是提供更多教材',
              '加快考試速度'
            ],
            correctAnswer: 1,
            explanation: '答案引擎將推動教育從標準化轉向個人化，從教師中心轉向學生主導的探索式學習。'
          },
          {
            question: '面對答案引擎時代的挑戰，個人最重要的應對策略是什麼？',
            options: [
              '完全依賴 AI 工具',
              '拒絕使用任何 AI 工具',
              '培養批判思維、提升 AI 素養、持續學習適應',
              '只關注技術發展'
            ],
            correctAnswer: 2,
            explanation: '個人需要培養批判思維驗證 AI 資訊、提升 AI 素養學會協作、持續學習跟上發展趨勢。'
          },
          {
            question: '合理的多工具協同可以帶來多少工作效率提升？',
            options: [
              '50-100%',
              '150-300%',
              '無明顯提升',
              '500% 以上'
            ],
            correctAnswer: 1,
            explanation: '合理的工具協同可以帶來工作效率提升 150-300%，決策準確性提升 40-80%。'
          },
          {
            question: '在未來 5-10 年，答案引擎發展的主要趨勢不包括以下哪項？',
            options: [
              '更強的推理能力和更深的個人化',
              '多模態整合成為標準',
              '完全取代人類思考',
              '個人 AI 助手普及'
            ],
            correctAnswer: 2,
            explanation: '答案引擎將變得更智能和人性化，但目標是輔助而非取代人類思考，重點在於人機協作。'
          }
        ]
      }
    }
  ],
  faqData: [
    {
      question: '這個課程適合完全沒有 AI 經驗的新手嗎？',
      questionEn: 'Is this course suitable for complete beginners with no AI experience?',
      answer: '絕對適合。本課程專為所有水平的學習者設計。我們從最基礎的「什麼是答案引擎？」等概念講起，引導您循序漸進。無需任何技術或 AI 背景知識。',
      answerEn: 'Absolutely suitable. This course is designed for learners of all levels. We start from the most basic concepts like "What is an answer engine?" and guide you step by step. No technical or AI background knowledge required.'
    },
    {
      question: '學完這個課程後，我能達到什麼水平？',
      questionEn: 'What level can I achieve after completing this course?',
      answer: '完成課程後，您將成為 Perplexity 的高階用戶。您將能熟練地運用它進行高效研究，使用 Library 和 Spaces 管理複雜項目，透過 Pages 創建精美的報告，並能戰略性地將 Perplexity 整合到與 ChatGPT 等其他 AI 工具的協作流程中。',
      answerEn: 'Upon completion, you will become an advanced Perplexity user. You will be able to skilfully use it for efficient research, manage complex projects using Library and Spaces, create beautiful reports through Pages, and strategically integrate Perplexity into collaborative workflows with other AI tools like ChatGPT.'
    },
    {
      question: '課程內容會定期更新嗎？',
      questionEn: 'Will the course content be updated regularly?',
      answer: '會的。AI 的世界發展一日千里。本課程內容將定期更新，以反映 Perplexity 的最新功能、新增的 AI 模型以及業界最新的趨勢與策略，確保課程的長期價值。',
      answerEn: 'Yes. The AI world develops at lightning speed. This course content will be updated regularly to reflect the latest features of Perplexity, new AI models, and the latest industry trends and strategies, ensuring the long-term value of the course.'
    },
    {
      question: '我需要付費訂閱 Perplexity Pro 才能學習嗎？',
      questionEn: 'Do I need to pay for Perplexity Pro subscription to learn?',
      answer: '完全不需要。整個課程的設計讓您可以使用免費版的 Perplexity 進行有效的學習和練習。第五章將詳細介紹 Pro 訂閱的強大功能，擁有訂閱將能讓您跟隨操作那些進階功能，但這並非學習的必要條件。',
      answerEn: 'Not at all. The entire course is designed so you can effectively learn and practise using the free version of Perplexity. Chapter 5 will introduce the powerful features of Pro subscription in detail. Having a subscription will allow you to follow along with those advanced features, but it is not a requirement for learning.'
    },
    {
      question: '學習這個課程需要多長時間？',
      questionEn: 'How long does it take to complete this course?',
      answer: '課程包含超過 8 小時的核心內容。由於是線上自學模式，您可以根據自己的進度安排學習。為了達到最佳效果，我們建議每週投入 2-3 小時，在一個月內完成課程。',
      answerEn: 'The course contains over 8 hours of core content. Since it is an online self-study format, you can arrange your learning according to your own pace. For optimal results, we recommend investing 2-3 hours per week to complete the course within one month.'
    }
  ],
  isFree: true
};