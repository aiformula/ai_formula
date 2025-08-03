/**
 * ChatGPT Complete Course Data
 * @fileoverview 完整的ChatGPT課程文稿數據
 * @author AI Formula Team
 * @version 1.0.0
 */

// 課程模組數據
const courseModules = [
  {
    id: 1,
    title: "第一章：解構 ChatGPT — 深入核心技術",
    titleEn: "Chapter 1: Deconstructing ChatGPT — Deep Dive into Core Technology",
    description: "本章旨在為學員建立堅實的理論基礎，不僅解釋 ChatGPT「是什麼」，更深入探討「為什麼」它能如此強大。",
    descriptionEn: "This chapter aims to establish a solid theoretical foundation for learners, not only explaining what ChatGPT 'is', but also exploring in depth 'why' it is so powerful.",
    lessons: [
      {
        id: 1,
        title: "1.1 什麼是大型語言模型 (LLM)？",
        titleEn: "1.1 What is a Large Language Model (LLM)?",
        duration: "15分鐘",
        durationEn: "15 minutes",
        type: "text" as const,
        description: "深入了解大型語言模型的核心概念、工作原理和技術特徵，為後續學習打下堅實基礎。",
        descriptionEn: "Gain an in-depth understanding of the core concepts, working principles, and technical characteristics of large language models, laying a solid foundation for subsequent learning.",
        image: "/images/courses/chatgpt-complete-course/unit-images/llm-concept.png",
        imageAlt: "大型語言模型概念圖解",
        imageAltEn: "Large Language Model Concept Illustration",
        transcript: `大型語言模型（Large Language Model, LLM）是一種尖端的人工智能（AI）程式，經過海量文本數據的訓練，從而學會了理解、生成、總結、翻譯人類語言以及執行其他複雜的文本相關任務。從根本上說，LLM 是一個深度學習模型，它並非真正地進行人類意義上的「思考」，而是基於極其複雜的概率計算，來預測一個文本序列中接下來最可能出現的詞語。

「大型」這個詞彙主要體現在兩個維度：其一是訓練數據集的規模，這些數據集往往來源於互聯網的廣泛文本，例如包含數十億網頁的 Common Crawl 數據庫和擁有數千萬頁面的維基百科；其二是模型本身的複雜度，即其包含的「參數」數量，這些參數可視為模型在學習過程中調整的內部變量，數量可高達數千億甚至更多。

LLM 與傳統 AI 最大的區別在於其驚人的通用性和靈活性。傳統的機器學習模型通常是為單一、特定的任務而設計，例如情感分析或垃圾郵件過濾。然而，一個 LLM 卻能憑藉其廣博的「知識」，執行多種截然不同的任務，從回答常識問題、撰寫專業文案，到生成電腦代碼，都可由同一個基礎模型完成。

在人工智能的技術層級中，LLM 處於金字塔的頂端。它建立在機器學習的基礎之上，是深度學習的一個分支，並利用神經網絡作為其計算架構。作為生成式 AI 的一個高度專業化的子集，LLM 專注於理解、預測和生成類人文本。`,
        transcriptEn: `A Large Language Model (LLM) is a cutting-edge artificial intelligence (AI) programme that has been trained on massive text datasets, thus learning to understand, generate, summarise, translate human language, and execute other complex text-related tasks. Fundamentally, an LLM is a deep learning model that doesn't truly "think" in the human sense, but rather predicts the most likely next word in a text sequence based on extremely complex probability calculations.

The term "large" manifests primarily in two dimensions: firstly, the scale of training datasets, which often originate from extensive internet text, such as the Common Crawl database containing billions of web pages and Wikipedia with tens of millions of pages; secondly, the complexity of the model itself, namely the number of "parameters" it contains—these parameters can be viewed as internal variables adjusted during the learning process, numbering in the hundreds of billions or even more.

The most significant difference between LLMs and traditional AI lies in their remarkable versatility and flexibility. Traditional machine learning models are typically designed for single, specific tasks, such as sentiment analysis or spam filtering. However, an LLM can leverage its extensive "knowledge" to perform various disparate tasks, from answering general knowledge questions and writing professional copy to generating computer code—all accomplished by the same foundational model.

In the hierarchy of artificial intelligence technology, LLMs sit at the pinnacle of the pyramid. They are built upon the foundation of machine learning, represent a branch of deep learning, and utilise neural networks as their computational architecture. As a highly specialised subset of generative AI, LLMs focus on understanding, predicting, and generating human-like text.`,
        keyPoints: [
          "LLM是基於海量文本數據訓練的深度學習模型，通過概率計算預測下一個詞語",
          "「大型」體現在訓練數據規模（如Common Crawl、維基百科）和模型參數數量（可達數千億）",
          "LLM具備驚人的通用性，一個模型可以執行多種不同任務，不似傳統AI只做單一任務",
          "LLM處於AI技術金字塔頂端，是生成式AI的高度專業化子集"
        ],
        keyPointsEn: [
          "LLMs are deep learning models trained on massive text data, predicting the next word through probability calculations",
          "\"Large\" manifests in training data scale (such as Common Crawl, Wikipedia) and model parameter count (reaching hundreds of billions)",
          "LLMs possess remarkable versatility, with one model capable of executing multiple different tasks, unlike traditional AI that performs single tasks",
          "LLMs sit at the pinnacle of AI technology, representing a highly specialised subset of generative AI"
        ]
      },
      {
        id: 2,
        title: "1.2 Transformer 架構：神經網絡與自注意力機制 (Self-Attention)",
        duration: "18分鐘",
        type: "text" as const,
        description: "探索LLM的建構基礎神經網絡以及革命性Transformer架構的核心創新自注意力機制。",
        transcript: `LLM 的構建基石是人工神經網絡，這是一種模仿生物大腦中神經元相互連接和傳遞信號方式的計算模型。它由多個層級的節點組成，包括輸入層、輸出層以及一層或多層位於兩者之間的「隱藏層」。

然而，LLM 能力實現質的飛躍，其真正的技術突破在於 2017 年被提出的 Transformer 架構。在 Transformer 出現之前，主流的序列處理模型（如循環神經網絡 RNN）必須按順序逐字處理文本，這極大地限制了訓練速度和處理長文本的能力。Transformer 架構則引入了並行處理機制，可以同時分析整個輸入序列，從而能夠利用現代 GPU 的強大並行計算能力，大幅縮短訓練時間。

Transformer 架構的核心是其獨創的「自注意力機制」（Self-Attention Mechanism）。這個機制使得模型在處理序列中的某個單詞時，能夠權衡輸入文本中所有其他單詞對該單詞的重要性，並給予不同的「注意力」權重。這讓模型能夠捕捉到詞語之間複雜的、長距離的依賴關係，從而更深刻地理解上下文。例如，在句子「貓咪追著老鼠，因为它饿了」中，自注意力機制能幫助模型準確地將代詞「它」與主語「貓咪」聯繫起來，而不是「老鼠」。

為了讓神經網絡能夠處理語言，LLM 採用了「詞嵌入」（Word Embeddings）技術來表示單詞。傳統的機器學習方法可能使用孤立的數字來代表每個詞，無法表達詞語間的語義關係。詞嵌入則將每個單詞映射到一個高維的向量空間中。在這個空間裡，意思或用法相近的詞語（例如「國王」與「女王」，或「走路」與「奔跑」）在向量上的距離會更近。這種表示方式使得模型能夠捕捉到單詞之間細微的語義和句法關係，為理解複雜語言奠定了數學基礎。

這種從順序處理到並行處理的範式轉移，是近年來 AI 發展突然加速的根本原因。它使得在海量數據上訓練具有數千億參數的超大規模模型成為可能，最終催生了具備強大能力的 ChatGPT。`,
        transcriptEn: `The core of the Transformer architecture is its innovative self-attention mechanism. This mechanism allows the model to weigh the importance of each word in the input text to the current word, giving different "attention" weights. This allows the model to capture the complex, long-distance dependencies between words, allowing it to understand the context more deeply. For example, in the sentence "貓咪追著老鼠，因为它饿了", the self-attention mechanism helps the model accurately associate the pronoun "它" with the subject "貓咪", rather than "老鼠".

To allow the neural network to process language, LLM uses "word embeddings" technology to represent words. Traditional machine learning methods might use isolated numbers to represent each word, unable to express the semantic relationship between words. Word embeddings map each word into a high-dimensional vector space. In this space, words with similar meanings or usages (e.g., "king" and "queen", or "walking" and "running") are closer to each other. This representation allows the model to capture subtle semantic and syntactic relationships between words, laying the groundwork for understanding complex language.

This shift from sequential processing to parallel processing is the fundamental reason for the sudden acceleration of AI development in recent years. It has made it possible to train extremely large models with billions of parameters on massive text datasets, ultimately leading to the creation of ChatGPT, a powerful AI system.`,
        keyPoints: [
          "神經網絡：模仿大腦神經元的計算模型",
          "Transformer架構：2017年革命性的深度學習架構",
          "自注意力機制：捕捉文本中長距離依賴關係的核心技術",
          "並行處理：相比RNN大幅提升訓練效率"
        ]
      },
      {
        id: 3,
        title: "1.3 GPT 的意義：生成式、預訓練、變壓器 (Generative, Pre-trained, Transformer)",
        duration: "16分鐘",
        type: "text" as const,
        description: "深入解析GPT三個關鍵詞的含義，理解其架構、訓練方法和核心功能。",
        transcript: `ChatGPT 的核心技術可以從其全稱 GPT（Generative Pre-trained Transformer）中得到精確的解釋。這三個詞揭示了其架構、訓練方法和核心功能。

變壓器 (Transformer)：這指明了其底層的技術架構，即前一節所詳述的、基於自注意力機制的 Transformer 模型。

預訓練 (Pre-trained)：這是 GPT 模型訓練方法的第一個、也是最關鍵的階段。在這個階段，模型會進行所謂的「無監督學習」，消化來自互聯網、書籍、文章等海量的、未經標註的文本數據。其核心學習任務非常簡單：根據一段文本的上文，預測下一個最有可能出現的單詞或字符。通過在數以萬億計的句子上重複這個過程，模型不僅學會了語法規則和詞彙知識，還內化了大量的世界常識、語義關係，甚至初步的推理模式。這個階段為模型打下了一個廣博的知識基礎。

生成式 (Generative)：這個詞描述了模型最核心的能力——創造（生成）全新的、原創的內容。這與另一類被稱為「判別式模型」（Discriminative Models）的 AI 形成對比。判別式模型（如用於文本分類的 BERT）的主要任務是進行分類或判斷，例如判斷一封郵件是否為垃圾郵件。而生成式模型則能夠從零開始創作，生成全新的句子、段落、代碼，甚至是圖像和音樂。

在完成大規模的「預訓練」之後，模型通常會進入第二個訓練階段——「微調」（Fine-tuning）。在這個階段，開發者會使用一個規模小得多、但帶有特定任務標籤的數據集來進一步訓練模型。更重要的是，OpenAI 引入了「來自人類反饋的強化學習」（Reinforcement Learning from Human Feedback, RLHF）技術。在這個過程中，人類訓練員會對模型的不同回答進行評分和排序，模型則根據這些反饋來調整其行為，使其輸出更符合人類的期望，例如更準確地遵循指令、減少有害或帶有偏見的內容。`,
        transcriptEn: `ChatGPT's core technology can be precisely explained from its full name GPT (Generative Pre-trained Transformer). These three words reveal its architecture, training method, and core functionality.

Transformer: This indicates its underlying technical architecture, i.e., the Transformer model based on self-attention mechanism discussed earlier.

Pre-trained: This is the first and most critical stage of GPT model training method. In this stage, the model undergoes what is known as "unsupervised learning", digesting vast amounts of unlabelled text data from the internet, books, articles, etc. Its core learning task is very simple: predicting the next most likely word or character based on the context of a text segment. Through this process repeated on trillions of sentences, the model not only learns grammar rules and vocabulary knowledge but also internalizes a large amount of common sense and semantic relationships, even rudimentary reasoning patterns. This stage lays a solid foundation for the model.

Generative: This term describes the model's core ability—creating new, original content. This contrasts with another type of AI known as "discriminative models" (Discriminative Models). The main task of discriminative models (such as BERT used for text classification) is to classify or make a judgment, e.g., determining whether an email is spam. Generative models, on the other hand, can create new sentences, paragraphs, code, even images and music from scratch.

After completing the "pre-training" on a large scale, the model usually enters the second training stage—"fine-tuning". In this stage, developers use a much smaller dataset with specific task labels to further train the model. More importantly, OpenAI has introduced "reinforcement learning from human feedback" (RLHF) technology. In this process, human trainers score and rank different responses from the model, and the model adjusts its behavior based on these feedbacks to produce outputs that are more aligned with human expectations, e.g., following instructions more accurately and reducing harmful or biased content.`,
        keyPoints: [
          "Transformer：基於自注意力機制的底層技術架構",
          "Pre-trained：通過海量無標註文本數據進行無監督學習",
          "Generative：能夠創造全新原創內容，區別於判別式模型",
          "RLHF：人類反饋強化學習，使模型輸出更符合人類期望"
        ]
      },
      {
        id: 4,
        title: "1.4 從 GPT-1 到 GPT-4o：模型的演進之路",
        duration: "20分鐘",
        type: "text" as const,
        description: "追溯GPT模型系列的發展歷程，理解每一代模型的技術突破和能力提升。",
        transcript: `GPT 模型的發展歷程清晰地展示了 OpenAI 的技術演進路徑，每一代模型都在規模和能力上實現了顯著的飛躍。這條路徑不僅是技術的自然延伸，也反映了 OpenAI 的產品化戰略：首先建立一個知識淵博的「大腦」，然後教它「聽懂指令」，最後賦予它與世界多維度互動的「感官」。

GPT-1 (2018)：作為開創者，GPT-1 首次成功地將 Transformer 架構應用於生成式預訓練任務。它擁有 1.17 億個參數，在當時的多個自然語言處理基準測試中取得了優異成績，驗證了這條技術路線的可行性。

GPT-2 (2019)：參數規模和訓練數據量大幅提升，展現了令人驚訝的「零樣本學習」（Zero-shot learning）能力。這意味著它可以在沒有任何特定任務範例的情況下，僅憑指令就完成一些新任務，顯示出更強的泛化能力。

GPT-3 (2020)：這是一個里程碑式的模型，擁有 1750 億個參數。其最顯著的突破是強大的「少樣本學習」（Few-shot learning）能力，即只需在提示中給出極少數（幾個）範例，模型就能迅速掌握新任務的模式並舉一反三。

InstructGPT (2022)：與其說這是下一代模型，不如說是一次方向性的轉變。OpenAI 發現，僅僅「博學」的模型並不總是「有用」或「安全」。InstructGPT 重點引入了 RLHF 訓練方法，旨在解決 AI 的「對齊」（Alignment）問題，即使模型的行為和輸出更符合人類的意圖和價值觀。這使得模型極大地提升了遵循用戶指令的能力，為 ChatGPT 的誕生奠定了關鍵基礎。

GPT-4 (2023)：GPT-4 不僅在語言理解、邏輯推理和準確性上相比 GPT-3.5 有了質的飛躍，更重要的是，它成為了一個「多模態」（multimodal）模型。它首次具備了處理文本以外信息的能力，能夠接收和理解圖像輸入，例如解釋一張圖表的內容或描述一張照片的場景。

GPT-4o (2024)：o 代表 "omni"（全能），標誌著 OpenAI 在多模態交互上的又一重大突破。GPT-4o 是首個在單一神經網絡模型中原生整合了文本、音訊和視覺處理能力的模型。這使得它能夠實現近乎即時的、極其自然的實時語音對話，並能同時理解用戶的語音和攝像頭捕捉到的視覺信息，極大地拉近了 AI 交互與人類自然溝通的距離。`,
        transcriptEn: `GPT model development history clearly shows OpenAI's technological evolution path. Each generation of models has achieved significant leaps in scale and capability. This path is not only a natural extension of technology but also reflects OpenAI's productization strategy: first building a "brain" with vast knowledge, then teaching it "to understand commands", and finally giving it the "senses" to interact with the world in multiple dimensions.

GPT-1 (2018): As the pioneer, GPT-1 successfully applied the Transformer architecture to generative pre-training tasks for the first time. It had 1.17 billion parameters and achieved excellent results on multiple natural language processing benchmarks at the time, confirming the feasibility of this technology path.

GPT-2 (2019): The parameter scale and training data volume increased significantly, demonstrating an astonishing "zero-shot learning" (Zero-shot learning) ability. This means it can complete new tasks without any specific task examples, showing a stronger generalization ability.

GPT-3 (2020): This is a milestone model with 175 billion parameters. Its most significant breakthrough is the strong "few-shot learning" (Few-shot learning) ability, meaning that only a few examples (a few) in the prompt can quickly grasp the new task pattern and generalize.

InstructGPT (2022): Instead of being the next generation model, it's more like a directional shift. OpenAI found that just "knowledgeable" models are not always "useful" or "safe". InstructGPT focuses on introducing RLHF training methods to solve the "alignment" (Alignment) problem of AI, making the model's behavior and output more aligned with human intentions and values. This greatly improved the model's ability to follow user commands, laying the foundation for ChatGPT's birth.

GPT-4 (2023): GPT-4 not only has a qualitative leap in language understanding, logical reasoning, and accuracy compared to GPT-3.5, but more importantly, it has become a "multimodal" (multimodal) model. It has become the first AI to process information beyond text, able to receive and understand image inputs, such as explaining the content of a chart or describing the scene of a photo.

GPT-4o (2024): "o" stands for "omni" (omni), marking OpenAI's another major breakthrough in multimodal interaction. GPT-4o is the first AI to natively integrate text, audio, and visual processing capabilities in a single neural network model. This allows it to achieve near-instant, extremely natural real-time voice conversations, and to understand the user's voice and visual information captured by the camera at the same time, greatly reducing the distance between AI interaction and human natural communication.`,
        keyPoints: [
          "GPT-1：驗證Transformer生成式預訓練的可行性",
          "GPT-3：1750億參數，實現強大的少樣本學習能力",
          "InstructGPT：引入RLHF技術，解決AI對齊問題",
          "GPT-4o：原生多模態整合，實現近乎即時的自然對話"
        ]
      },
      {
        id: 5,
        title: "1.5 OpenAI 簡史：ChatGPT 的創造者",
        duration: "14分鐘",
        type: "text" as const,
        description: "了解OpenAI的創立歷程、關鍵人物和發展里程碑，理解ChatGPT背後的組織文化。",
        transcript: `ChatGPT 的橫空出世，讓其背後的開發機構 OpenAI 從一個在人工智能研究領域備受尊敬的名字，一躍成為全球科技界的焦點和家喻戶曉的品牌。

創立與初衷 (2015)：OpenAI 於 2015 年由一群科技界的遠見者共同創立，其中包括 Sam Altman、Elon Musk、Greg Brockman 和 Ilya Sutskever 等人。其最初的形態是一個非營利研究實驗室，懷抱著一個宏大的使命：確保通用人工智能（Artificial General Intelligence, AGI）的發展能夠安全、負責任地造福全人類，而不是被少數巨頭壟斷或對人類構成威脅。

轉型與微軟的戰略合作：隨著研究的深入，OpenAI 意識到訓練頂尖大型語言模型需要極其龐大的計算資源和資金投入，這遠非一個非營利組織所能負擔。為了應對這一挑戰，OpenAI 在 2019 年進行了結構重組，成立了一家名為 OpenAI LP 的「利潤上限」（capped-profit）公司。這一獨特的結構旨在平衡其追求科研使命與吸引商業投資的需求。同年，微軟向 OpenAI 進行了 10 億美元的初始投資，並在隨後的幾年裡追加了數十億美元，成為其最重要的戰略合作夥伴，為其提供了所需的 Azure 雲計算資源。

關鍵人物：公司的靈魂人物是其聯合創始人兼行政總裁 Sam Altman。在執掌 OpenAI 之前，Altman 以其作為著名初創企業孵化器 Y Combinator 總裁的經歷而聞名，成功孵化了 Airbnb、Reddit 等眾多知名企業。他憑藉其在科技界的影響力和卓越的領導力，帶領 OpenAI 從一個研究機構轉型為估值數百億美元的 AI 巨頭。另一位備受關注的創始人 Elon Musk 則因對公司發展方向和安全問題的擔憂，於 2018 年離開了 OpenAI 董事會，並在之後創立了自己的 AI 公司 xAI。

ChatGPT 的引爆點 (2022)：儘管 OpenAI 在此之前已經發布了多個版本的 GPT 模型，並在學術界和開發者社區中享有盛譽，但真正讓其突破圈層、引發全球性關注的，是 2022 年 11 月發布的 ChatGPT。其極其易用的對話界面和強大的能力，迅速吸引了數以億計的用戶，引爆了全球範圍內的生成式 AI 熱潮，並促使 Google、Meta 等科技巨頭紛紛加速推出自己的競品。`,
        transcriptEn: `ChatGPT's sudden appearance has turned its development institution, OpenAI, from a respected name in the field of artificial intelligence research into a global focus and household brand.

Founding and Purpose (2015): OpenAI was co-founded in 2015 by a group of visionaries from the technology field, including Sam Altman, Elon Musk, Greg Brockman, and Ilya Sutskever. Its initial form was a non-profit research laboratory with a grand mission: ensuring that the development of general artificial intelligence (AGI) can benefit all humanity safely and responsibly, rather than being monopolized by a few giants or posing a threat to humans.

Strategic Transformation and Collaboration with Microsoft: As research deepened, OpenAI realized that training top-tier large language models required an extremely large amount of computing resources and funding, which far exceeded the capabilities of a non-profit organization. In response to this challenge, OpenAI restructured its structure in 2019, establishing a "capped-profit" company called OpenAI LP. This unique structure aimed to balance its pursuit of scientific mission with the need for attracting business investment. In the same year, Microsoft invested $1 billion in OpenAI, and over the years, added billions of dollars, becoming its most important strategic partner, providing the Azure cloud computing resources it needed.

Key Figures: The soul of the company is its co-founder and CEO, Sam Altman. Before taking charge of OpenAI, Altman was famous for his experience as the president of the famous startup incubator Y Combinator, successfully incubating companies like Airbnb and Reddit. He led OpenAI from a research institution to a giant AI company with a valuation of hundreds of billions of dollars due to his influence in the technology field and his outstanding leadership ability. Another co-founder, Elon Musk, left the OpenAI board in 2018 due to concerns about the company's direction and safety issues, and later founded his own AI company, xAI.

ChatGPT's Explosion Point (2022): Although OpenAI had already released multiple versions of GPT models before this and enjoyed a high reputation in both academia and the developer community, it was the release of ChatGPT in November 2022 that truly broke through the circle and sparked global attention. Its extremely easy-to-use dialogue interface and powerful capabilities quickly attracted billions of users, sparking a global trend of generative AI, and prompting major technology giants like Google and Meta to accelerate the launch of their own products.`,
        keyPoints: [
          "2015年創立：非營利研究實驗室，致力於AGI安全發展",
          "戰略轉型：2019年重組為利潤上限公司，獲微軟投資",
          "關鍵人物：Sam Altman領導，Elon Musk早期參與後離開",
          "ChatGPT爆發：2022年引發全球生成式AI熱潮"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "第二章：初探門徑 — 帳戶設定與介面導覽",
    titleEn: "Chapter 2: Initial Exploration — Account Setup and Interface Navigation",
    description: "從最實際的操作入手，引導學員完成從註冊帳戶到熟悉ChatGPT各個介面元素的全部過程。",
    descriptionEn: "Starting with the most practical operations, guiding learners through the complete process from account registration to familiarising themselves with all ChatGPT interface elements.",
    lessons: [
      {
        id: 6,
        title: "2.1 註冊與登入：開啟您的 AI 之旅",
        duration: "12分鐘",
        type: "text" as const,
        description: "詳細介紹ChatGPT註冊流程、驗證步驟和登入方式。",
        transcript: `開始使用 ChatGPT 的第一步是創建一個 OpenAI 帳戶。整個過程相當直接和便捷。

訪問官方網站：在您的網頁瀏覽器中輸入官方網址 chat.openai.com。

開始註冊：在頁面中，點擊「Sign up」（註冊）按鈕。您可以選擇使用常用的電郵地址進行註冊，或者為了更快捷的流程，直接使用您的 Google、Microsoft 或 Apple 帳戶進行關聯註冊。

完成驗證：如果您使用電郵地址註冊，系統會發送一封驗證郵件到您的郵箱，您需要點擊郵件中的連結來確認您的帳戶。此外，為了防止濫用和確認您是真實用戶，系統可能會要求您提供一個有效的手機號碼以接收驗證碼。

成功登入：完成所有驗證步驟後，您就可以返回登入頁面，點擊「Log in」（登入），輸入您的帳戶信息，正式進入 ChatGPT 的主操作介面。

值得一提的是，為了降低用戶體驗的門檻，OpenAI 現在也允許用戶在不創建帳戶的情況下，即時使用部分基礎功能。然而，這種模式下，您將無法保存對話歷史、使用自訂指令等核心的個人化功能，因此註冊一個帳戶仍然是獲得完整體驗的推薦做法。`,
        transcriptEn: `Starting to use ChatGPT involves creating an OpenAI account. The process is straightforward and convenient.

Visit the official website: Enter the official website address chat.openai.com in your web browser.

Sign up: Click the "Sign up" (register) button on the page. You can choose to register using your usual email address, or for a faster process, directly link your Google, Microsoft, or Apple account.

Complete verification: If you register using an email address, the system will send a verification email to your inbox. You need to click the link in the email to confirm your account. Additionally, to prevent misuse and confirm that you are a real user, the system may ask you to provide a valid phone number to receive a verification code.

Successful login: After completing all verification steps, you can return to the login page, click "Log in", enter your account information, and officially enter the main interface of ChatGPT.

It's worth noting that OpenAI now also allows users to use some basic functions without creating an account. However, in this mode, you will not be able to save dialogue history, use custom commands, etc., so registering an account is still the recommended approach to get a complete experience.`,
        keyPoints: [
          "訪問chat.openai.com進行註冊或登入",
          "支援電郵、Google、Microsoft、Apple多種註冊方式",
          "需要完成電郵驗證和手機號碼驗證",
          "註冊帳戶可享受完整功能，包括對話歷史保存"
        ]
      },
      {
        id: 7,
        title: "2.2 免費版與付費版 (Plus/Team) 比較分析",
        duration: "15分鐘",
        type: "text" as const,
        description: "詳細分析免費版和付費版的功能差異，幫助用戶選擇最適合的方案。",
        transcript: `OpenAI 提供了不同的服務方案以滿足不同用戶的需求，主要分為免費版和以 ChatGPT Plus 為代表的付費版。兩者在功能、性能和使用限制上存在顯著差異，理解這些差異有助於您選擇最適合自己的方案。

免費版特點：主要使用 GPT-4o mini，對 GPT-4o 等頂級模型有嚴格的限次使用。在高峰時段可能響應較慢，對話次數和訊息長度有較嚴格的限制。可以使用網頁瀏覽、數據分析、圖像生成等功能，但都有使用次數限制。

付費版優勢：優先、無限制或享有更高限額地訪問最強大的模型，如 GPT-4o, GPT-4.5。享有更快的響應速度和更高的使用限額，即使在高峰時段也能流暢使用。可以創建、發布和管理自己的自訂 GPTs。可以使用專案 (Projects) 功能，方便組織和管理複雜工作流程。

價格結構：Plus 版約 20 美元/月，Team 和 Enterprise 版有不同定價。企業版和團隊版數據默認不被用於模型訓練，Plus 版用戶數據同樣可控。

這種區分策略的背後，體現了 OpenAI 的核心商業模式。通過提供一個功能足夠強大但存在明顯限制的免費版，OpenAI 能夠吸引海量的用戶，這些用戶的使用數據和反饋成為其快速迭代和改進模型的寶貴資源。與此同時，將最先進的模型、更高的使用限額和獨家新功能作為付費牆後的內容，有效地驅動了對性能和效率有更高要求的重度用戶和專業人士升級為付費訂閱者。`,
        transcriptEn: `OpenAI offers different service plans to meet the needs of different users, mainly divided into free and paid versions represented by ChatGPT Plus. There are significant differences in functionality, performance, and usage restrictions between the two, which helps you choose the most suitable one for yourself.

Free version features: Mainly uses GPT-4o mini, with strict usage limits for GPT-4o and other top-level models. It may respond slower during peak hours, with strict limits on dialogue frequency and message length. You can use functions like web browsing, data analysis, and image generation, but all have usage limits.

Paid version advantages: Priority access to the strongest models, such as GPT-4o and GPT-4.5, with faster response speed and higher usage limits. You can create, publish, and manage your own custom GPTs. You can use the Projects feature to organize and manage complex workflows.

Pricing structure: Plus version costs about $20 per month, with different pricing for Team and Enterprise versions. Enterprise and team data are not used for model training by default, and Plus users' data is also controllable.

This differentiated strategy reflects OpenAI's core business model. By providing a free version with a strong enough feature set but with clear limitations, OpenAI can attract a large number of users, and these users' usage data and feedback become valuable resources for its rapid iteration and improvement of the model. At the same time, the latest models, higher usage limits, and exclusive new features are offered as content behind the paywall, effectively driving heavy users and professional人士 to upgrade to a paid subscription for better performance and efficiency.`,
        keyPoints: [
          "免費版：GPT-4o mini為主，高級模型有限次使用",
          "付費版：無限制訪問最強模型，更快響應速度",
          "功能差異：付費版可創建自訂GPT和使用專案功能",
          "數據隱私：企業版數據默認不用於訓練"
        ]
      },
      {
        id: 8,
        title: "2.3 主介面詳解：側邊欄、對話歷史與模型選擇",
        duration: "18分鐘",
        type: "text" as const,
        description: "全面介紹ChatGPT主介面的各個組成部分和功能特色。",
        transcript: `ChatGPT 的主介面設計簡潔直觀，主要分為左側的導航側邊欄和右側的主對話區。近年來，介面的演變也反映了其從一個單純的聊天工具向一個綜合性 AI 工作平台的戰略轉型。

左側側邊欄功能：
新建對話 (New Chat)：位於左上角的圖標，點擊後即可在主對話區開啟一個全新的、空白的對話。將不同主題的查詢分置於不同的對話中，是保持工作條理清晰的良好習慣。

對話歷史 (Chat History)：您與 ChatGPT 的所有對話（臨時對話除外）都會被自動保存於此。系統會根據對話內容智能地為其命名，方便您日後快速查找、回顧和繼續之前的討論。

探索 GPTs (Explore GPTs)：這是通往 GPT 商店的門戶。點擊此處，您可以瀏覽和搜索由 OpenAI 官方及廣大社區開發者創建的、針對特定任務的自訂版本 ChatGPT。

專案 (Projects)：這是一項為付費版用戶提供的高級組織功能。您可以創建一個專案來統籌管理一個複雜的任務，將所有相關的對話、上傳的文件和特定的指令集都歸集於此。

主對話區組成：
模型選擇器 (Model Selector)：位於頁面頂部中央，這是一個下拉菜單。付費版用戶可在此處自由切換不同的 AI 模型，例如在追求最高質量的 GPT-4o 和速度更快的 GPT-4o mini 之間進行選擇。

臨時對話 (Temporary Chat)：在右上角可能會有一個切換按鈕。啟用此模式後，當前的對話將不會被保存到您的歷史記錄中，其內容也不會被用於 OpenAI 的模型訓練。

輸入框 (Message Bar)：位於頁面最底部，這是您與 ChatGPT 互動的核心區域。您可以在這裡輸入文字提示（Prompt），或者點擊旁邊的圖標來上傳文件或啟動語音輸入。`,
        transcriptEn: `ChatGPT's main interface is simple and intuitive, mainly divided into the left navigation sidebar and the main dialogue area on the right. In recent years, the evolution of the interface has reflected its strategic transformation from a simple chat tool to a comprehensive AI work platform.

Left sidebar features:
New Chat: Located at the top left corner, clicking it opens a new, blank dialogue. Separating different topics into different dialogues is a good habit for maintaining work order.

Chat History: All dialogues you have with ChatGPT (excluding temporary dialogues) will be automatically saved here. The system will name them based on the content of the dialogue for easy later retrieval, review, and continuation of the discussion.

Explore GPTs: This is the gateway to the GPT store. Clicking here, you can browse and search for custom versions of ChatGPT created by OpenAI and the vast community.

Projects: This is an advanced organizational feature for paid users. You can create a project to manage a complex task, gathering all relevant dialogues, uploaded files, and specific command sets into one place.

Main dialogue area composition:
Model Selector: Located at the top center of the page, this is a dropdown menu. Paid users can freely switch between different AI models here, such as choosing between GPT-4o for higher quality and GPT-4o mini for faster speed.

Temporary Chat: There may be a switch button in the top right corner. When this mode is enabled, the current dialogue will not be saved to your history or used for model training.

Message Bar: Located at the bottom of the page, this is the core area where you interact with ChatGPT. You can enter text prompts here, or click the icons next to it to upload files or start voice input.`,
        keyPoints: [
          "左側邊欄：新建對話、歷史記錄、GPT商店、專案管理",
          "模型選擇器：付費版可切換不同AI模型",
          "臨時對話：提供額外隱私保護，不保存記錄",
          "輸入框：支援文字、文件、語音多種輸入方式"
        ]
      },
      {
        id: 9,
        title: "2.4 手機 App 獨有功能：語音對話與圖像辨識實戰",
        duration: "35分鐘",
        type: "text" as const,
        description: "探索ChatGPT手機應用的獨有功能，包括語音對話和圖像識別功能。",
        transcript: `ChatGPT 的手機應用程式不僅提供了便攜性，更引入了一些桌面版本所不具備的獨特功能，特別是語音對話和圖像識別功能。

語音對話功能：
ChatGPT 手機應用的語音模式可以實現近乎即時的語音交互。用戶只需點擊麥克風圖標，即可開始語音輸入。應用會將語音轉換為文字，ChatGPT 處理後再以合成語音回應。這個功能支援多種語音風格和語言設定。

圖像識別與分析：
手機版 ChatGPT 允許用戶直接拍照或上傳圖片進行分析。它可以：
- 識別圖片中的物體、場景和人物
- 讀取和解釋圖片中的文字內容（OCR功能）
- 分析圖表、統計數據和視覺化內容
- 提供關於圖片內容的詳細描述和解釋

實際應用場景：
這些功能在日常生活中極為實用，例如掃描菜單進行翻譯、分析商品標籤、解讀複雜的圖表或數據視覺化、甚至協助解決數學問題（通過拍攝數學題目）。

使用技巧：
為了獲得最佳體驗，建議在光線充足的環境下拍攝清晰的圖片，語音輸入時選擇安靜的環境，並學會利用這些功能的組合來處理複雜的查詢任務。`,
        transcriptEn: `ChatGPT's mobile app not only provides portability but also introduces some unique features that are not available in the desktop version, especially voice interaction and image recognition.

Voice interaction:
The voice mode of ChatGPT's mobile app allows for near-instant voice interaction. Users can simply click the microphone icon to start voice input. The app will convert the voice to text, and ChatGPT will respond with synthesized voice. This feature supports multiple voice styles and language settings.

Image recognition and analysis:
The mobile version of ChatGPT allows users to take photos or upload images for analysis. It can:
- Identify objects, scenes, and people in images
- Read and explain the text content in images (OCR function)
- Analyze charts, statistical data, and visual content
- Provide detailed descriptions and explanations of image content

Real-world applications:
These features are extremely useful in everyday life, such as translating menus, analyzing product labels, interpreting complex charts or data visualization, or even helping to solve math problems (by taking photos of math problems).

Usage tips:
To get the best experience, we recommend taking clear photos in well-lit environments and choosing a quiet environment for voice input. It's also important to learn how to use these features together to handle complex query tasks.`,
        keyPoints: [
          "語音對話：近乎即時的語音交互，支援多種語音風格",
          "圖像識別：可分析物體、場景、文字和圖表內容", 
          "OCR功能：準確識別和提取圖片中的文字信息",
          "實用場景：菜單翻譯、標籤分析、數學題解答等"
        ]
      },
      {
        id: 10,
        title: "2.5 探索 GPT Store：如何尋找、評估及使用別人建立的優秀 GPTs",
        duration: "25分鐘", 
        type: "text" as const,
        description: "深入了解GPT商店的使用方法，學會尋找和評估高質量的自訂GPT。",
        transcript: `GPT Store 是 OpenAI 推出的一個平台，讓用戶可以發現、使用和分享由社區創建的專業化 ChatGPT 版本。這些自訂 GPT 針對特定任務或領域進行了優化。

瀏覽和搜索GPTs：
GPT Store 提供了分類瀏覽功能，包括寫作、程式設計、教育、商業等類別。用戶可以使用搜索功能找到特定需求的 GPT，或者瀏覽熱門和推薦的 GPT。

評估GPT質量：
在選擇 GPT 時，應該注意以下指標：
- 用戶評分和評論數量
- 創建者的信譽和專業背景  
- GPT 的描述是否清晰明確
- 是否定期更新和維護
- 用戶反饋的質量和具體性

使用最佳實踐：
首次使用新的 GPT 時，建議先測試簡單的查詢以了解其能力範圍。仔細閱讀 GPT 的使用說明和建議的提示格式。對於專業領域的 GPT，驗證其提供信息的準確性是重要的。

隱私和安全考慮：
使用第三方 GPT 時要注意數據隱私。避免在對話中包含敏感個人信息或商業機密。了解 GPT 創建者的數據處理政策，選擇信譽良好的開發者創建的 GPT。

創建自己的GPT：
付費用戶還可以創建自己的專業 GPT，上傳特定領域的知識文檔，設定專門的指令和行為模式，打造真正符合個人或企業需求的 AI 助手。`,
        transcriptEn: `GPT Store is a platform launched by OpenAI, allowing users to discover, use, and share professional ChatGPT versions created by the community. These custom GPTs are optimized for specific tasks or fields.

Browsing and searching GPTs:
GPT Store provides category browsing features, including writing, programming, education, business, etc. Users can use the search function to find specific GPTs they need, or browse popular and recommended GPTs.

Assessing GPT quality:
When choosing GPTs, you should consider the following indicators:
- User ratings and review numbers
- The credibility and professional background of creators
- Whether the description of GPT is clear and specific
- Whether it is regularly updated and maintained
- The quality and specificity of user feedback

Best practices:
When using a new GPT for the first time, it's recommended to test simple queries to understand its capabilities. Carefully read the usage instructions and prompts provided by GPTs. For GPTs in professional fields, verifying the accuracy of the information provided is important.

Privacy and security considerations:
When using third-party GPTs, you should pay attention to data privacy. Avoid including sensitive personal information or business secrets in dialogues. Understand the data processing policies of GPT creators and choose GPTs created by reputable developers.

Creating your own GPT:
Paid users can also create their own professional GPTs, uploading knowledge documents related to specific fields, setting specific commands and behavioral patterns to create AI assistants that truly meet personal or business needs.`,
        keyPoints: [
          "分類瀏覽：按寫作、程式設計、教育等領域查找GPT",
          "質量評估：關注評分、評論、創建者信譽和更新頻率",
          "安全使用：注意數據隱私，避免分享敏感信息",
          "自訂創建：付費用戶可創建專屬的個人化GPT"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "第三章：核心功能實戰 — 掌握日常互動技巧",
    description: "帶領學員親手實踐ChatGPT的各項核心功能，探索其作為強大多模態工具的潛力。",
    lessons: [
      {
        id: 11,
        title: "3.1 優質指令的四大基石：角色 (Role)、任務 (Task)、脈絡 (Context)、格式 (Format)",
        duration: "32分鐘",
        type: "text" as const,
        description: "掌握提示工程的核心原則，學會設計高質量的指令。",
        transcript: `優質指令的構建需要遵循四個核心基石，這些原則能夠顯著提升AI回應的準確性和相關性。

角色 (Role)：明確告訴ChatGPT它應該扮演什麼角色。例如「你是一位經驗豐富的數據分析師」或「請以專業律師的身份」。角色設定能幫助AI調整其回應的風格、深度和專業程度。

任務 (Task)：清晰地描述你希望AI完成的具體任務。避免模糊的指令如「幫我寫些東西」，而應該說「為我的新產品撰寫一份500字的產品描述」。

脈絡 (Context)：提供充足的背景信息和約束條件。包括目標受眾、使用場景、風格要求、長度限制等。脈絡越豐富，AI的回應越精準。

格式 (Format)：明確指定輸出格式，如「以表格形式呈現」、「使用項目符號列表」或「按照intro-body-conclusion結構」。這確保輸出符合你的使用需求。

實例對比：
差的指令：「寫一篇關於AI的文章」
好的指令：「你是一位科技記者(Role)，為一般大眾撰寫一篇800字的文章(Task)，解釋AI在醫療領域的最新應用，用簡單易懂的語言(Context)，包含引言、三個主要應用案例和結論(Format)」。`,
        transcriptEn: `High-quality instructions need to follow four core principles to significantly improve the accuracy and relevance of AI responses.

Role: Clearly tell ChatGPT what role it should play. For example, "You are an experienced data analyst" or "Please act as a professional lawyer." Setting the role helps AI adjust its style, depth, and professionalism.

Task: Clearly describe the specific task you want AI to complete. Instead of vague instructions like "Help me write something about AI", you should say "Write a 500-word product description for my new product as a technology journalist (Role), explaining the latest application of AI in the medical field (Task), using simple and understandable language (Context), including an introduction, three main application cases, and a conclusion (Format)."`,
        keyPoints: [
          "角色設定：明確定義AI應扮演的專業身份",
          "任務描述：具體說明期望完成的工作內容",
          "背景脈絡：提供充足的情境信息和約束條件",
          "格式要求：明確指定輸出的結構和樣式"
        ]
      },
      {
        id: 12,
        title: "3.2 角色扮演法：讓 ChatGPT 成為你的私人律師、程式設計師或行銷專家",
        duration: "28分鐘",
        type: "text" as const,
        description: "學習如何通過角色設定讓AI提供專業級的建議和服務。",
        transcript: `角色扮演是提示工程中最強大的技巧之一，能讓通用的ChatGPT瞬間變身為各領域的專家顧問。

專業律師模式：
「你是一位擁有15年經驗的商業律師，專精合約法和智慧財產權。請以專業但易懂的方式...」
這種設定讓AI能提供更精準的法律建議，使用適當的專業術語，並考慮實際法律風險。

程式設計師模式：
「你是一位資深的Python開發工程師，擅長數據分析和機器學習。請檢視以下代碼並...」
AI會以專業開發者的視角分析代碼，提供最佳實踐建議和錯誤修正。

行銷專家模式：
「你是一位數位行銷策略顧問，有豐富的社群媒體和內容行銷經驗。針對我們的新產品...」
AI會運用行銷思維，考慮目標受眾、市場定位和轉換率優化。

高級技巧：
1. 組合角色：「你是一位既懂技術又有商業頭腦的產品經理」
2. 情境增強：「在一個快速變化的新創環境中」
3. 經驗層級：「以10年經驗的專家水準」
4. 風格調整：「以友善但專業的語調」

這種方法特別適合需要專業判斷、創意思考或特定領域知識的任務。`,
        transcriptEn: `Role-playing is one of the most powerful techniques in prompt engineering, allowing ChatGPT to instantly transform into an expert consultant in various fields.

Professional lawyer mode:
"You are a business lawyer with 15 years of experience specializing in contract law and intellectual property. Please provide advice in a professional yet easy-to-understand way..."
This setting allows AI to provide more accurate legal advice, using appropriate professional jargon, and considering practical legal risks.

Programmer mode:
"You are an experienced Python developer specializing in data analysis and machine learning. Please review the following code and..."
AI will analyze the code from a professional developer's perspective, providing best practices and error correction.

Marketing expert mode:
"You are a digital marketing strategist with extensive experience in social media and content marketing. Regarding our new product..."
AI will use marketing thinking, considering target audience, market positioning, and conversion rate optimization.

Advanced techniques:
1. Combined roles: "You are a product manager who is both technically savvy and has business acumen."
2. Situational enhancement: "In a rapidly changing startup environment."
3. Level of experience: "At the expert level of a 10-year veteran."
4. Style adjustment: "In a friendly yet professional tone."

This approach is particularly suitable for tasks that require professional judgment, creative thinking, or specific domain knowledge.`,
        keyPoints: [
          "專業身份：設定具體的職業角色和專業背景",
          "經驗層級：明確專業水準和經驗年數",
          "領域專精：指定特定的專業領域和技能",
          "風格融合：結合專業性和個人化溝通風格"
        ]
      },
      {
        id: 13,
        title: "3.3 範例引導法 (Few-Shot Prompting)：給予 AI 範例，讓它模仿你的風格與格式",
        duration: "26分鐘",
        type: "text" as const,
        description: "通過提供範例來引導AI產生符合特定風格和格式的輸出。",
        transcript: `Few-Shot Prompting是一種強大的技術，通過提供幾個高質量的範例來「教導」AI理解你的期望格式和風格。

基本原理：
人類學習新技能時往往從模仿開始，AI也是如此。與其用冗長的文字描述期望的輸出格式，不如直接提供2-3個標準範例，讓AI通過模式識別來理解規則。

產品描述範例：
輸入：「請為以下產品撰寫描述，參考以下格式：

範例1：[產品名稱] - 革命性的智慧手錶，融合時尚與科技。採用軍規級材質，續航力長達7天，支援50+運動模式。適合追求效率與品味的現代人。

範例2：[產品名稱] - 專業級無線耳機，降噪技術領先業界。Hi-Fi音質配合人體工學設計，讓您享受純淨音樂體驗。商務、運動、休閒皆宜。

現在請為我們的新款咖啡機撰寫描述...」

電子郵件範例：
「以下是我們公司的標準回覆格式：

範例1：親愛的[客戶姓名]，感謝您的詢問。關於[具體問題]，我們很樂意為您說明...[具體回答]...如有其他疑問，請隨時聯繫我們。祝好，[簽名]

範例2：[客戶姓名] 您好，謝謝您對我們產品的關注...[內容]...期待為您提供更好的服務。敬祝 商祺，[簽名]」

高級技巧：
1. 範例品質比數量重要
2. 涵蓋不同變化情況
3. 明確標示範例開始和結束
4. 結合Zero-shot和Few-shot的混合使用`,
        transcriptEn: `Few-Shot Prompting is a powerful technique that uses a few high-quality examples to "teach" AI how to understand your desired format and style.

Basic principle:
Humans learn new skills often by imitating, and so does AI. Instead of describing the desired output format in long text, it's better to directly provide 2-3 standard examples for AI to understand the rules through pattern recognition.

Product description examples:
Input: "Please write a description for the following product, based on the following format:

Example 1: [Product Name] - Revolutionary smartwatch combining fashion and technology. Made from military-grade material, with a battery life of 7 days and support for 50+ sports modes. Suitable for modern people who value efficiency and taste.

Example 2: [Product Name] - Professional wireless headphones with noise-canceling technology leading the industry. Hi-Fi sound quality with ergonomic design, allowing you to enjoy pure music experience. Suitable for both business and leisure.

Now, please write a description for our new coffee machine..."

Email example:
"Below is our standard reply format:

Example 1: Dear [Customer Name], thank you for your inquiry. Regarding [specific question], we are happy to explain... [specific answer]... If you have any other questions, please feel free to contact us. Best regards, [Signature]

Example 2: [Customer Name] Hello, thank you for your interest in our product... [Content]... We look forward to providing you with better service. Best wishes, [Signature]"

Advanced techniques:
1. Quality of examples is more important than quantity
2. Covering different situations
3. Clearly marking the beginning and end of examples
4. Combining both Zero-shot and Few-shot`,
        keyPoints: [
          "模式學習：通過範例讓AI理解期望的輸出模式",
          "格式一致性：確保所有範例遵循相同的結構",
          "變化涵蓋：提供不同情況下的標準範例",
          "品質重於數量：2-3個高質量範例勝過多個平庸範例"
        ]
      },
      {
        id: 14,
        title: "3.4 思維鏈技巧 (Chain of Thought)：引導 AI 一步步思考，解決複雜問題",
        duration: "30分鐘",
        type: "text" as const,
        description: "學習如何引導AI進行邏輯推理和多步驟問題解決。",
        transcript: `Chain of Thought (CoT) 是一種強大的提示技術，通過引導AI展示其推理過程來提高複雜問題的解決準確性。

核心概念：
與其直接要求答案，CoT要求AI「展示工作過程」，就像解數學題時要求學生寫出每一步驟。這種方法特別適合需要邏輯推理、多步驟計算或復雜分析的任務。

基礎CoT提示：
「請一步步思考這個問題，並展示你的推理過程：
[問題描述]

請按照以下格式回答：
步驟1：[分析問題的第一步]
步驟2：[基於步驟1的進一步分析]
步驟3：[得出結論]
最終答案：[明確的結論]」

商業案例分析範例：
「我們公司考慮進入新市場，請一步步分析可行性：

步驟1：市場規模分析 - 評估目標市場的總量和增長潜力
步驟2：競爭環境分析 - 識別主要競爭對手和市場進入壁壘  
步驟3：自身能力評估 - 分析我們的優勢和資源限制
步驟4：風險評估 - 識別主要風險因素和緩解策略
步驟5：投資回報預估 - 計算預期成本和收益
最終建議：基於以上分析提供具體建議」

零樣本CoT (Zero-shot CoT)：
最簡單的方法是在問題後加上「讓我們一步步來思考」或「請仔細思考並解釋你的推理過程」。

Few-shot CoT：
提供完整的推理範例，包括思考步驟和最終答案，然後讓AI模仿這種推理模式。

高級技巧：
1. 樹狀思維：考慮多個可能性分支
2. 假設檢驗：「如果...那麼...」的邏輯推理
3. 反向推理：從結論推回原因
4. 元認知：讓AI評估自己的推理品質`,
        transcriptEn: `Chain of Thought (CoT) is a powerful prompting technique that improves the accuracy of solving complex problems by guiding AI to show its reasoning process.

Core concept:
Instead of directly asking for an answer, CoT requires AI to "show its working process", similar to how students are asked to write out each step when solving a math problem. This method is particularly suitable for tasks that require logical reasoning, multi-step calculations, or complex analysis.

Basic CoT prompt:
"Please think step-by-step about this question and show your reasoning process:
[Question description]

Please answer in the following format:
Step 1: [First step in analyzing the question]
Step 2: [Further analysis based on Step 1]
Step 3: [Conclusion]
Final answer: [Clear conclusion]"

Business case analysis example:
"We are considering entering a new market. Let's analyze its feasibility step-by-step:

Step 1: Market size analysis - assessing the total size and growth potential of the target market
Step 2: Competitive environment analysis - identifying main competitors and market entry barriers  
Step 3: Self-assessment - analyzing our strengths and resource constraints
Step 4: Risk assessment - identifying key risks and mitigation strategies
Step 5: Return on investment estimation - calculating expected costs and benefits
Final recommendation: Based on the above analysis, we provide specific recommendations."

Zero-shot CoT:
The simplest method is to add "let's think step-by-step" or "please carefully think through and explain your reasoning process" after the question.

Few-shot CoT:
Provide complete reasoning examples, including thinking steps and final answers, then let AI imitate this reasoning pattern.

Advanced techniques:
1. Tree thinking: Considering multiple possible branches
2. Hypothetical testing: Logical reasoning "if...then..."
3. Reverse reasoning: Reasoning from conclusions back to causes
4. Meta-cognition: Let AI evaluate its own reasoning quality`,
        keyPoints: [
          "步驟化思考：將複雜問題分解為清晰的推理步驟",
          "推理透明化：要求AI展示完整的思考過程",
          "邏輯檢驗：通過可見的推理鏈提高答案準確性",
          "適用範圍：特別適合分析、計算和決策類問題"
        ]
      },
      {
        id: 15,
        title: "3.5 迭代與追問：如何透過追問，從 60 分的答案優化到 95 分",
        duration: "24分鐘",
        type: "text" as const,
        description: "掌握通過持續對話和精準追問來優化AI回應品質的技巧。",
        transcript: `真正的提示工程高手不只會寫好的初始提示，更懂得如何通過巧妙的追問和迭代來持續改善AI的回應品質。

迭代優化的核心原則：
把與AI的對話視為一個協作過程，而非一次性的問答。首次回應通常是「草稿」，通過追問和細化來達到理想效果。

第一層：澄清和補充
「請針對剛才的回答補充更多細節」
「你能舉一個具體的例子來說明這點嗎？」
「這個方法有什麼潛在的風險或限制？」

第二層：角度和深度
「請從不同角度重新分析這個問題」
「如果我是初學者，你會如何解釋？」
「專業人士可能會提出什麼進階問題？」

第三層：應用和實踐
「請提供一個實際的行動計劃」
「如何評估這個方案的成功？」
「在實施過程中可能遇到什麼挑戰？」

實例對話：
初始問題：「如何改善團隊溝通？」
AI回應：提供5個基本建議

追問1：「請針對遠距工作團隊具體說明」
追問2：「如何衡量溝通改善的效果？」
追問3：「有哪些工具可以支援這些方法？」
追問4：「如果遇到阻力該如何處理？」

高級迭代技巧：
1. 對比分析：「請比較這個方法與[其他方法]的優缺點」
2. 情境變化：「如果情況是[不同條件]，建議會如何調整？」
3. 品質檢查：「請檢視你的回答，有沒有遺漏重要觀點？」
4. 反向驗證：「這個建議可能會失敗的原因是什麼？」

追問的藝術在於知道何時深挖，何時轉向，何時滿足。透過系統性的迭代，能將AI的初步想法精煉成高質量、可執行的解決方案。`,
        transcriptEn: `The true master of prompt engineering not only writes good initial prompts but also knows how to continuously improve the quality of AI responses through clever follow-up questions and iterations.

The core principle of iterative optimization:
Treating the dialogue with AI as a collaborative process rather than a one-time question-and-answer session. The initial response is usually a "draft", and the ideal effect is achieved through follow-up questions and refinement.

First layer: Clarification and supplementation
"Please add more details to the answer you just gave."
"Can you give me an example to explain this point?"
"What are the potential risks or limitations of this method?"

Second layer: Angle and depth
"Please re-analyze this question from a different perspective."
"If I were a beginner, how would you explain it?"
"What advanced questions might professionals ask?"

Third layer: Application and practice
"Please provide a practical action plan."
"How can we evaluate the success of this plan?"
"What challenges might we face in the implementation process?"

Real dialogue:
Initial question: "How can we improve team communication?"
AI response: Providing 5 basic suggestions

Follow-up questions:
1. "Can you explain this in more detail for a remote team?"
2. "How can we measure the effectiveness of communication improvement?"
3. "What tools can support these methods?"
4. "What should we do if we encounter resistance?"

Advanced iterative techniques:
1. Comparative analysis: "Please compare this method with [other methods] in terms of pros and cons."
2. Situational change: "If the situation is [different conditions], what suggestions would you make?"
3. Quality check: "Please check your answer to see if you've missed any important points."
4. Reverse verification: "What could be the reason why this suggestion might fail?"

The art of follow-up questions is knowing when to dig deeper, when to switch topics, and when to satisfy. Through systematic iteration, we can refine AI's initial ideas into high-quality, executable solutions.`,
        keyPoints: [
          "協作對話：將AI互動視為持續的協作過程",
          "分層追問：從澄清到深化再到實踐的漸進式提問",
          "角度多元：從不同視角和專業程度來檢視問題",
          "品質把關：通過反向驗證確保方案的可行性"
        ]
      },
      {
        id: 16,
        title: "3.6 指令範本庫：提供 20+ 個常用高效指令範本，即學即用",
        duration: "18分鐘",
        type: "text" as const,
        description: "提供經過實戰驗證的高效指令範本，涵蓋各種常見應用場景。",
        transcript: `以下是經過實戰驗證的高效指令範本庫，可直接使用或根據需求調整。

【內容創作類】

1. 專業文章範本：
「你是一位經驗豐富的[領域]專家。請為[目標受眾]撰寫一篇關於[主題]的文章，約[字數]字。
結構要求：引言→主要觀點(3-4個)→實例支撐→結論
語調：[專業/友善/正式]
目標：[告知/說服/教育]」

2. 社群媒體範本：
「為[平台名稱]創作一則關於[主題]的貼文。
目標受眾：[描述]
字數限制：[數字]
包含元素：吸引眼球的開頭、主要訊息、行動呼籲、相關hashtag
語調：[活潑/專業/幽默]」

【商業分析類】

3. SWOT分析範本：
「請對[公司/產品/計劃]進行SWOT分析：
Strengths (優勢)：內部正面因素
Weaknesses (劣勢)：內部負面因素  
Opportunities (機會)：外部正面因素
Threats (威脅)：外部負面因素
請提供具體分析和策略建議。」

4. 市場研究範本：
「你是市場研究專家。請分析[產品/服務]在[市場]的機會：
1. 市場規模和趨勢
2. 目標客群分析
3. 競爭對手分析
4. 定價策略建議
5. 行銷管道推薦」

【學習教育類】

5. 概念解釋範本：
「請用[初學者/中級/專家]水準解釋[概念]：
1. 基本定義（用簡單語言）
2. 核心要點（3-5個）
3. 實際例子
4. 常見誤解
5. 延伸學習資源」

6. 摘要整理範本：
「請將以下內容總結為[字數]字的摘要：
[貼上原文]
要求：保留核心信息、使用項目符號、突出關鍵數據」

【創意發想類】

7. 腦力激盪範本：
「我需要為[專案/問題]產生創意想法。請扮演創意顧問：
背景：[描述情況]
限制：[預算/時間/資源]
目標：[預期成果]
請提供10個不同角度的創意方案，每個都要包含具體執行步驟。」

【技術協助類】

8. 程式碼檢查範本：
「你是資深程式設計師。請檢查以下[語言]代碼：
[貼上代碼]
請提供：
1. 代碼功能說明
2. 潛在錯誤識別
3. 性能優化建議
4. 最佳實踐建議」

每個範本都可以根據具體需求調整參數，關鍵是保持結構清晰、要求具體。`,
        transcriptEn: `Below are command templates that have been verified through practical experience. They can be used directly or adjusted according to specific needs.

【Content Creation】

1. Professional article template:
"You are an expert in the [field]. Please write an article about [topic] for [target audience], about [number] words.
Structure: Introduction → Main points (3-4) → Supporting examples → Conclusion
Tone: [Professional/Friendly/Formal]
Objective: [Inform/Persuade/Educate]"

2. Social media template:
"Create a post about [topic] for [platform].
Target audience: [Description]
Word limit: [Number]
Elements: Eye-catching opening, main message, call to action, relevant hashtags
Tone: [Playful/Professional/Humorous]"

【Business Analysis】

3. SWOT analysis template:
"Please perform SWOT analysis on [company/product/plan]:
Strengths (strengths): Internal positive factors
Weaknesses (weaknesses): Internal negative factors  
Opportunities (opportunities): External positive factors
Threats (threats): External negative factors
Please provide specific analysis and strategic suggestions."

4. Market research template:
"You are a market research expert. Please analyze the opportunities of [product/service] in [market]:
1. Market size and trends
2. Target audience analysis
3. Competitor analysis
4. Pricing strategy suggestions
5. Marketing channel recommendations"

【Learning and Education】

5. Concept explanation template:
"Please explain [concept] at the [beginner/intermediate/expert] level:
1. Basic definition (in simple language)
2. Core points (3-5)
3. Practical examples
4. Common misunderstandings
5. Extensive learning resources"

6. Summary template:
"Please summarize the following content in [number] words:
[Paste original text]
Requirements: Retaining core information, using bullet points, highlighting key data"

【Creative Thinking】

7. Brainstorming template:
"I need to generate creative ideas for [project/question]. Please act as a creative consultant:
Background: [Describe situation]
Limitations: [Budget/Time/Resources]
Objective: [Anticipated outcome]
Please provide 10 creative solutions from different angles, each of which must include specific execution steps."

【Technical Assistance】

8. Code checking template:
"You are an experienced programmer. Please check the following [language] code:
[Paste code]
Please provide:
1. Code functionality description
2. Potential error identification
3. Performance optimization suggestions
4. Best practices"

Each template can be adjusted according to specific needs, but the key is to maintain clear structure and specific requirements.`,
        keyPoints: [
          "範本分類：按應用場景分類，便於快速查找",
          "參數化設計：使用[]標示可替換的參數部分",
          "結構清晰：每個範本都有明確的輸出要求",
          "即用即改：可直接使用或微調以符合特定需求"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "第四章：精通之道 — 高級提示工程 (Prompt Engineering)",
    description: "學會如何設計和優化輸入提示，引導AI模型產生高質量、高相關性的輸出。",
    lessons: [
      {
        id: 17,
        title: "4.1 實戰項目 (一) 內容創作引擎：自動生成高質素的社交媒體貼文、廣告文案與電子郵件",
        duration: "35分鐘",
        type: "text" as const,
        description: "掌握使用ChatGPT進行各種內容創作的實戰技巧。",
        transcript: `內容創作是ChatGPT最受歡迎的應用領域之一。本節將教您如何打造一個多功能的內容創作引擎。

社交媒體貼文創作：
不同平台需要不同的內容策略。Instagram偏重視覺效果描述，LinkedIn需要專業語調，Twitter要求簡潔有力。

實戰範本：
「你是一位專業的社群媒體經理。為[平台]創作一則關於[主題]的貼文：
- 目標受眾：[描述特徵]
- 語調：[專業/輕鬆/幽默]
- 字數：[限制]
- 包含：引人注目的開頭、主要訊息、行動呼籲、3-5個相關hashtag
- 避免：過度推銷、空泛內容」

廣告文案創作：
優秀的廣告文案需要AIDA公式：Attention(注意)、Interest(興趣)、Desire(慾望)、Action(行動)。

進階範本：
「你是獲獎廣告文案撰稿人。為[產品/服務]撰寫廣告文案：
產品特色：[列出3-5個關鍵特點]
目標客群：[年齡、收入、興趣]
痛點：[客戶面臨的問題]
解決方案：[產品如何解決]
呼籲行動：[期望的具體行為]
限制：50字內的標題 + 150字的內文」

電子郵件行銷：
電子郵件需要個人化、價值導向，避免被標記為垃圾郵件。

專業範本：
「撰寫一封給[客戶類型]的電子郵件：
目的：[告知/邀請/促銷/感謝]
語調：友善且專業
結構：個人化問候→價值提供→具體行動→禮貌結尾
避免：過度銷售用詞、緊迫性語言」

批量創作技巧：
1. 建立品牌語調指南
2. 使用變量模板系統  
3. A/B測試不同版本
4. 建立內容日曆規劃`,
        transcriptEn: `Content creation is one of the most popular applications of ChatGPT. This section will teach you how to create a multi-functional content creation engine.

Social media post creation:
Different platforms require different content strategies. Instagram emphasizes visual description, LinkedIn requires professional tone, and Twitter requires concise and impactful language.

Practical template:
"You are a professional social media manager. Create a post about [topic] for [platform]:
- Target audience: [Descriptive characteristics]
- Tone: [Professional/Casual/Humorous]
- Word count: [Limit]
- Elements: Eye-catching opening, main message, call to action, 3-5 relevant hashtags
- Avoid: Over-selling, generic content"

Advertising copywriting:
Excellent advertising copy requires the AIDA formula: Attention (attention), Interest (interest), Desire (desire), Action (action).

Advanced template:
"You are an award-winning advertising copywriter. Write advertising copy for [product/service]:
Product features: [List 3-5 key features]
Target audience: [Age, income, interests]
Pain points: [Problems customers face]
Solutions: [How the product solves]
Call to action: [Specific actions expected]
Limit: Title of 50 words + 150 words of text"

Email marketing:
Email needs personalization and value orientation to avoid being marked as spam.

Professional template:
"Write an email to [customer type]:
Purpose: [Inform/Invite/Promote/Thank you]
Tone: Friendly and professional
Structure: Personalized greeting → Value proposition → Specific action → Polite closing
Avoid: Over-sales language, urgent language"

Batch creation techniques:
1. Establish brand tone guidelines
2. Use variable template system  
3. A/B testing different versions
4. Establish content calendar planning`,
        keyPoints: [
          "平台特性：根據不同社群媒體平台調整內容風格",
          "AIDA公式：運用注意-興趣-慾望-行動的廣告架構",
          "個人化郵件：避免垃圾郵件特徵，提供真實價值",
          "批量創作：建立系統化的內容生產流程"
        ]
      },
      {
        id: 18,
        title: "4.2 實戰項目 (二) 學習研究加速器：快速總結論文、報告，並用簡單方式解釋複雜概念",
        duration: "28分鐘",
        type: "text" as const,
        description: "學習如何使用ChatGPT加速學習和研究工作。",
        transcript: `ChatGPT可以成為強大的學習研究助手，幫助您快速消化大量資訊並深化理解。

學術論文總結：
學術論文通常結構複雜、術語繁多。有效的總結需要抓住核心論點和證據。

專業範本：
「請分析以下學術論文並提供結構化總結：
[貼上論文摘要或全文]

請按以下格式整理：
1. 研究背景：為什麼進行這項研究？
2. 核心問題：研究要解決什麼問題？
3. 方法論：使用了什麼研究方法？
4. 主要發現：關鍵結果是什麼？(用數據支撐)
5. 重要意義：對領域有什麼影響？
6. 局限性：研究有哪些不足？
7. 延伸思考：引發了什麼新問題？

請用一般大眾能理解的語言，避免過度技術性術語。」

複雜概念簡化：
將艱深概念轉化為易懂的解釋是一門藝術，需要找到合適的類比和例子。

教學範本：
「請用三個層次解釋[複雜概念]：

初學者版本(國中程度)：
- 用日常生活的比喻
- 避免專業術語  
- 重點在概念的本質

進階版本(大學程度)：
- 引入必要的專業詞彙
- 解釋運作機制
- 提供具體應用例子

專家版本：
- 技術細節和深層原理
- 與其他概念的關聯
- 前沿研究和爭議點」

報告分析與洞察：
商業報告、市場研究、政策文件都需要快速提取關鍵洞察。

分析範本：
「分析以下報告並提取關鍵洞察：
[貼上報告內容]

請提供：
1. 執行摘要(100字內)
2. 三個最重要的發現
3. 對我們的影響分析
4. 建議的後續行動
5. 需要關注的風險或機會

以決策者的角度思考，重點在於可執行的洞察。」

研究方法建議：
1. 交叉驗證多個來源
2. 要求提供引用和數據支撐  
3. 詢問不同觀點和批評意見
4. 將複雜主題分解為子問題`,
        transcriptEn: `ChatGPT can become a powerful learning and research assistant, helping you quickly digest vast amounts of information and deepen your understanding.

Academic paper summary:
Academic papers are often complex and full of jargon. Effective summarization requires grasping the core points and evidence.

Professional template:
"Please analyze the following academic paper and provide structured summary:
[Paste abstract or full text]

Please organize in the following format:
1. Research background: Why is this research being conducted?
2. Core question: What problem is the research trying to solve?
3. Methodology: What research methods are used?
4. Main findings: What are the key results? (supported by data)
5. Significance: What impact does this have on the field?
6. Limitations: What are the shortcomings of the research?
7. Further thinking: What new questions have arisen?"

Simplifying complex concepts:
Translating complex concepts into easy-to-understand explanations is an art that requires finding appropriate analogies and examples.

Teaching template:
"Please explain [complex concept] at three levels:

Beginner level (middle school level):
- Using everyday life analogies
- Avoiding jargon  
- Focusing on the essence of the concept

Advanced level (university level):
- Introducing necessary professional jargon
- Explaining operating mechanisms
- Providing specific application examples

Expert level:
- Technical details and deep-level principles
- Connections with other concepts
- Cutting-edge research and controversies"

Report analysis and insights:
Business reports, market research, and policy documents all need to quickly extract key insights.

Analysis template:
"Please analyze the following report and extract key insights:
[Paste report content]

Please provide:
1. Executive summary (within 100 words)
2. Three most important findings
3. Analysis of their impact on us
4. Suggested follow-up actions
5. Any risks or opportunities we need to pay attention to"

Research method suggestions:
1. Cross-verification from multiple sources
2. Requesting citations and data support  
3. Asking for different perspectives and criticisms
4. Breaking down complex topics into sub-questions`,
        keyPoints: [
          "結構化總結：使用固定框架分析學術論文",
          "分層解釋：根據受眾程度調整解釋深度",
          "洞察提取：從大量資訊中提煉可執行的要點",
          "驗證機制：通過多角度分析確保理解準確性"
        ]
      },
      {
        id: 19,
        title: "4.3 實戰項目 (三) 創意腦震盪夥伴：從零開始規劃旅行、活動流程或商業點子",
        duration: "22分鐘",
        type: "text" as const,
        description: "學習如何利用ChatGPT進行創意發想和專案規劃。",
        transcript: `ChatGPT在創意發想和專案規劃方面具有獨特優勢，能提供多角度的思考和系統化的規劃方法。

旅行規劃助手：
旅行規劃需要考慮預算、時間、興趣、季節等多重因素。

全面規劃範本：
「請為我規劃一次[目的地][天數]的旅行：

基本資訊：
- 預算：[總額度]
- 旅行時間：[月份/季節]
- 旅伴：[人數和特徵]
- 興趣偏好：[文化/美食/自然/購物/冒險]
- 住宿偏好：[星級要求/位置偏好]

請提供：
1. 整體行程概覽(逐日安排)
2. 交通規劃(航班/當地交通)
3. 住宿建議(具體推薦+原因)
4. 必遊景點(排序+最佳遊覽時間)
5. 美食推薦(當地特色+價位)
6. 預算分配(住宿/交通/餐飲/門票/購物)
7. 實用貼士(天氣/文化/安全)
8. 備案計劃(雨天/景點關閉時的替代方案)」

活動企劃專家：
無論是公司活動、生日派對還是商業會議，都需要細緻的規劃。

活動範本：
「請幫我策劃一場[活動類型]：

活動背景：
- 目的：[慶祝/宣傳/培訓/聯誼]
- 參加者：[人數/年齡/職業背景]
- 預算：[總預算範圍]
- 時間：[日期/時長]
- 地點限制：[室內外/場地大小]

請制定：
1. 活動主題和概念
2. 詳細流程安排(時間表)
3. 場地佈置建議
4. 餐飲安排
5. 娛樂節目/議程
6. 必需物品清單
7. 人員分工建議
8. 應急預案」

商業創意發想：
創業想法需要結合市場需求、個人能力和資源限制。

創業範本：
「基於以下條件，幫我發想10個商業機會：

個人情況：
- 專業背景：[技能/經驗/學歷]
- 可用資源：[資金/時間/人脈]
- 興趣領域：[喜歡的行業/活動]
- 風險偏好：[保守/積極]

市場環境：
- 目標市場：[本地/網路/國際]
- 趨勢關注：[科技/環保/健康/教育]

請為每個想法提供：
1. 核心概念(一句話描述)
2. 目標客群
3. 收益模式
4. 啟動成本估算
5. 主要競爭對手
6. 成功關鍵因素
7. 潛在風險
8. 第一步行動建議」

創意激發技巧：
1. 使用「如果...會怎樣？」的假設性思考
2. 結合不相關的概念產生新想法
3. 從問題的反面思考解決方案
4. 參考其他行業的成功案例`,
        transcriptEn: `ChatGPT has unique advantages in creative brainstorming and project planning, providing multiple perspectives and systematic planning methods.

Travel planning assistant:
Travel planning needs to consider factors such as budget, time, interest, season, etc.

Comprehensive planning template:
"Please plan a trip to [destination] for [number of days] for me:

Basic information:
- Budget: [Total amount]
- Travel time: [Month/Season]
- Travel companions: [Number and characteristics]
- Interest preferences: [Culture/Food/Nature/Shopping/Adventure]
- Accommodation preferences: [Star rating/Location preference]

Please provide:
1. Overall itinerary overview (daily schedule)
2. Transportation planning (flight/local transportation)
3. Accommodation suggestions (specific recommendations + reasons)
4. Must-visit attractions (ranked + best visiting times)
5. Food recommendations (local specialties + price)
6. Budget allocation (accommodation/transportation/dining/tickets/shopping)
7. Practical tips (weather/culture/safety)
8. Backup plan (alternative options for closed attractions)"

Event planning expert:
Whether it's a company event, a birthday party, or a business meeting, careful planning is required.

Event template:
"Please help me plan an [event type]:

Event background:
- Purpose: [Celebration/Promotion/Training/Networking]
- Participants: [Number/Age/Professional background]
- Budget: [Total budget range]
- Time: [Date/Duration]
- Location restrictions: [Indoor/Outdoor/Space size]

Please develop:
1. Event theme and concept
2. Detailed flow chart (time table)
3. Suggestions for venue setup
4. Catering arrangements
5. Entertainment programs/agenda
6. Necessary item list
7. Suggestions for personnel division
8. Emergency预案"

Business innovation ideas:
Business ideas need to be combined with market demand, personal capabilities, and resource constraints.

Business idea template:
"Based on the following conditions, please help me come up with 10 business opportunities:

Personal situation:
- Professional background: [Skills/Experience/Education]
- Available resources: [Funds/Time/Connections]
- Interest areas: [Industries/Activities you like]
- Risk preference: [Conservative/Aggressive]

Market environment:
- Target market: [Local/Online/International]
- Trend focus: [Technology/Environment/Health/Education]

Please provide:
1. Core concept (one-sentence description)
2. Target audience
3. Revenue model
4. Initial cost estimation
5. Main competitors
6. Key success factors
7. Potential risks
8. First step action plan"

Creative stimulation techniques:
1. Hypothetical thinking: "What if...?"
2. Combining unrelated concepts to generate new ideas
3. Thinking from the opposite side of the problem
4. Drawing inspiration from successful cases in other industries`,
        keyPoints: [
          "全方位規劃：考慮預算、時間、偏好等多重約束",
          "系統化思考：將複雜專案分解為可管理的組件",
          "風險預案：為每個計劃準備備選方案",
          "創意結合：將個人資源與市場機會相結合"
        ]
      },
      {
        id: 20,
        title: "4.4 實戰項目 (四) 程式設計超級助手：解釋程式碼、除錯 (Debug) 與編寫簡單腳本",
        duration: "40分鐘",
        type: "text" as const,
        description: "學習如何使用ChatGPT協助程式設計工作，從代碼解釋到錯誤修復。",
        transcript: `ChatGPT是程式設計師的得力助手，無論您是初學者還是資深開發者，都能從中獲得幫助。

代碼解釋與學習：
理解複雜代碼是編程學習的關鍵，ChatGPT可以提供逐行解釋。

代碼分析範本：
「請詳細解釋以下[程式語言]代碼：
[貼上代碼]

請提供：
1. 整體功能概述
2. 逐行或逐塊解釋
3. 關鍵概念說明(演算法/設計模式)
4. 輸入輸出說明
5. 潛在的改進建議
6. 類似功能的替代實現方法

請用初學者能理解的語言，並解釋專業術語。」

Debug除錯專家：
錯誤定位和修復是編程的核心技能之一。

除錯範本：
「我的[語言]代碼出現問題，請幫我除錯：

代碼：
[貼上有問題的代碼]

錯誤訊息：
[貼上錯誤訊息]

預期結果：
[描述期望的行為]

實際結果：
[描述實際發生的情況]

請提供：
1. 錯誤原因分析
2. 修正後的代碼
3. 解釋為什麼會出錯
4. 如何預防類似錯誤
5. 相關最佳實踐建議」

腳本自動化專家：
日常工作中的重複性任務可以通過簡單腳本來自動化。

腳本生成範本：
「請為我寫一個[語言]腳本來完成以下任務：

任務描述：[具體要完成什麼]
輸入：[數據來源/格式]
輸出：[期望的結果/格式]
特殊要求：[錯誤處理/性能要求]

請提供：
1. 完整的可執行代碼
2. 詳細的註釋說明
3. 使用方法和範例
4. 必要的依賴套件
5. 錯誤處理機制
6. 可能的擴展建議」

代碼優化與重構：
改善代碼性能和可讀性是進階技能。

優化範本：
「請幫我優化以下代碼：
[貼上原始代碼]

優化目標：
- 性能提升
- 可讀性改善  
- 程式碼簡化
- 遵循最佳實踐

請提供：
1. 優化後的代碼
2. 改進要點說明
3. 性能提升估算
4. 權衡考量(如果有)」

API文檔理解：
學習使用新的程式庫或API時，ChatGPT可以提供實用範例。

API範本：
「請幫我理解和使用[API/程式庫名稱]：

需求：[想要實現的功能]
文檔：[貼上相關API文檔]

請提供：
1. 基本使用範例
2. 常見用法模式
3. 注意事項和陷阱
4. 錯誤處理範例
5. 進階應用技巧」`,
        transcriptEn: `ChatGPT is a powerful assistant for programmers, whether you're a beginner or an experienced developer.

Code explanation and learning:
Understanding complex code is key to programming. ChatGPT can provide line-by-line explanations.

Code analysis template:
"Please provide a detailed explanation of the following [programming language] code:
[Paste code]

Please provide:
1. Overall functionality overview
2. Line-by-line or block-by-block explanation
3. Explanation of key concepts (algorithms/design patterns)
4. Input/output description
5. Potential improvements
6. Alternative implementations for similar functions"

Debugging expert:
Debugging is one of the core skills of programming.

Debugging template:
"My [programming language] code is having issues. Please help me debug:

Code:
[Paste code with issues]

Error message:
[Paste error message]

Expected result:
[Describe expected behavior]

Actual result:
[Describe actual situation]

Please provide:
1. Analysis of the error
2. Revised code
3. Explanation of why it's wrong
4. How to prevent similar errors
5. Suggestions for best practices"

Script automation expert:
Repetitive tasks in everyday work can be automated with simple scripts.

Script generation template:
"Please write a [programming language] script to complete the following task:

Task description: [Specific task to complete]
Input: [Data source/format]
Output: [Expected result/format]
Special requirements: [Error handling/performance requirements]

Please provide:
1. Complete executable code
2. Detailed comments
3. Usage and examples
4. Necessary dependencies
5. Error handling mechanism
6. Possible expansion suggestions"

Code optimization and refactoring:
Improving code performance and readability is an advanced skill.

Optimization template:
"Please optimize the following code for me:
[Paste original code]

Optimization goals:
- Performance improvement
- Readability enhancement  
- Code simplification
- Following best practices

Please provide:
1. Optimized code
2. Points for improvement
3. Estimated performance improvement
4. Trade-offs (if any)"

API documentation understanding:
When learning to use new libraries or APIs, ChatGPT can provide practical examples.

API template:
"Please help me understand and use [API/library name]:

Requirements: [Functionality you want to achieve]
Documentation: [Paste related API documentation]

Please provide:
1. Basic usage examples
2. Common usage patterns
3. Notes and pitfalls
4. Error handling examples
5. Advanced application techniques"`,
        keyPoints: [
          "代碼理解：逐步解釋複雜程式邏輯和演算法",
          "錯誤診斷：系統化分析和修復程式錯誤",
          "自動化腳本：快速生成日常任務的自動化解決方案",
          "最佳實踐：學習和應用程式設計的規範和優化技巧"
        ]
      },
      {
        id: 21,
        title: "4.5 實戰項目 (五) 語言翻譯與潤飾大師：進行多國語言精準翻譯與專業級文章校對",
        duration: "25分鐘",
        type: "text" as const,
        description: "掌握使用ChatGPT進行高質量翻譯和文字潤飾的技巧。",
        transcript: `ChatGPT在語言處理方面表現出色，不僅能進行多語言翻譯，還能提供專業級的文字潤飾服務。

精準翻譯技巧：
優質翻譯不只是字面轉換，更要考慮文化背景、語境和目標受眾。

專業翻譯範本：
「請將以下文本翻譯成[目標語言]：
[原文內容]

翻譯要求：
- 目標受眾：[專業人士/一般大眾/學生]
- 語調：[正式/非正式/友善/權威]
- 專業領域：[醫學/法律/技術/商業/文學]
- 地區偏好：[美式/英式/繁體/簡體]

請提供：
1. 直譯版本
2. 意譯版本(自然流暢)
3. 關鍵術語對照表
4. 文化適應性調整說明
5. 替代表達方式(如適用)」

多語言本地化：
不同市場需要不同的語言策略和文化適應。

本地化範本：
「請為[產品/服務]進行[語言]市場的本地化：

原始內容：[英文版本]
目標市場：[具體國家/地區]
產品類型：[軟體/網站/行銷材料]

請考慮：
1. 文化敏感性調整
2. 當地慣用表達方式
3. 法規要求用詞
4. 市場競爭環境的語言特色
5. 目標客群的語言偏好

提供本地化建議和完整翻譯。」

文章潤飾與校對：
將草稿提升為發表水準的專業文章。

潤飾範本：
「請校對和潤飾以下文章：
[原始文章]

改進目標：
- 語法和拼寫檢查
- 句式結構優化
- 邏輯流暢性改善
- 語調一致性調整
- 專業術語精確性

請提供：
1. 修改後的完整文章
2. 主要改動說明
3. 風格改進建議
4. 結構優化意見
5. 進一步提升的建議」

商業文件專業化：
商業文件需要特定的格式和語調。

商業文件範本：
「請將以下內容改寫為專業的[文件類型]：
[原始內容]

文件類型：[提案書/報告/郵件/合約]
收件對象：[客戶/上司/合作夥伴]
語調要求：[正式/友善/說服性]

請確保：
1. 符合商業文件規範
2. 邏輯清晰、層次分明
3. 用詞精準、避免歧義
4. 包含必要的格式要素
5. 適合目標讀者的理解水平」

創意寫作助手：
協助創作各種類型的創意內容。

創意寫作範本：
「請幫我創作一篇[文體類型]：

主題：[核心概念]
目標讀者：[年齡/興趣群體]
長度：[字數要求]
風格：[幽默/感人/懸疑/資訊性]

特殊要求：
- [任何特定要求]

請提供原創內容，並確保：
1. 引人入勜的開頭
2. 邏輯連貫的發展
3. 滿足讀者期待的結尾
4. 適當的語言風格
5. 原創性和創意性」`,
        transcriptEn: `ChatGPT excels in language processing, not only able to perform multi-language translation but also providing professional proofreading services.

Precise translation techniques:
Quality translation goes beyond word-for-word translation; it also considers cultural context, language nuances, and target audience.

Professional translation template:
"Please translate the following text into [target language]:
[Original content]

Translation requirements:
- Target audience: [Professional/General public/Students]
- Tone: [Formal/Informal/Friendly/Authoritative]
- Professional field: [Medicine/Law/Technology/Business/Literature]
- Regional preference: [American/British/Traditional/Simplified]

Please provide:
1. Literal translation
2. Natural flow translation (if applicable)
3. Glossary of key terms
4. Cultural adaptation notes
5. Alternative wording (if applicable)"

Multi-language localization:
Different markets require different language strategies and cultural adaptation.

Localization template:
"Please localize [product/service] for the [language] market:

Original content: [English version]
Target market: [Specific country/region]
Product type: [Software/Website/Marketing materials]

Please consider:
1. Cultural sensitivity adjustments
2. Local idiomatic expressions
3. Legal requirements for wording
4. Language features of the competitive environment
5. Language preferences of the target audience

Providing localized suggestions and complete translation."

Article proofreading and editing:
Turning drafts into professional-level articles.

Proofreading and editing template:
"Please proofread and edit the following article:
[Original article]

Improvement goals:
- Grammar and spelling check
- Sentence structure optimization
- Logical flow improvement
- Tone consistency adjustment
- Precision of professional jargon

Please provide:
1. Revised complete article
2. Main changes explained
3. Suggestions for style improvement
4. Structural optimization suggestions
5. Further suggestions for improvement"

Business document professionalism:
Business documents require specific formats and tones.

Business document template:
"Please rewrite the following content in the professional [document type]:
[Original content]

Document type: [Proposal/Report/Email/Contract]
Recipient: [Customer/Boss/Partner]
Tone requirements: [Formal/Friendly/Persuasive]

Please ensure:
1. Compliance with business document standards
2. Clear logic and clear hierarchy
3. Precise wording, avoiding ambiguity
4. Including necessary format elements
5. Suitable for the understanding level of the target reader"

Creative writing assistant:
Assisting in creating various types of creative content.

Creative writing template:
"Please help me write an [article type]:

Theme: [Core concept]
Target audience: [Age/Interest group]
Length: [Word count required]
Style: [Humorous/Touching/Suspenseful/Informative]

Special requirements:
- [Any specific requirements]

Please provide original content and ensure:
1. Catchy opening
2. Logical development
3. Satisfying conclusion
4. Appropriate language style
5. Originality and creativity"`,
        keyPoints: [
          "文化適應：翻譯時考慮目標文化的語言習慣",
          "專業術語：確保特定領域術語的準確性",
          "語調統一：維持文章整體風格的一致性",
          "多層次校對：從語法到邏輯的全面文字優化"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "第五章：打造專屬 AI — 個人化與 GPT 商店",
    description: "學習如何將ChatGPT從通用工具轉變為真正懂您、為您量身定做的私人AI助手。",
    lessons: [
      {
        id: 22,
        title: "5.1 Advanced Data Analysis (數據分析大師)：上傳 Excel/CSV/PDF，進行數據分析與圖表製作",
        duration: "38分鐘",
        type: "text" as const,
        description: "掌握ChatGPT的進階數據分析功能，處理各種格式的數據文件。",
        transcript: `Advanced Data Analysis是ChatGPT Plus的強大功能，能夠處理複雜的數據分析任務，相當於擁有一位專業的數據科學家助手。

文件上傳與處理：
支援多種格式包括Excel (.xlsx, .xls)、CSV、PDF、JSON等。上傳後ChatGPT能自動識別數據結構並提供初步分析。

數據探索與清理：
「請分析我上傳的數據集：
1. 提供數據集基本概況（行數、列數、數據類型）
2. 識別缺失值和異常值
3. 計算基本統計量（均值、中位數、標準差）
4. 檢查數據品質問題
5. 建議數據清理步驟」

視覺化圖表製作：
ChatGPT能創建各種專業圖表：折線圖、長條圖、散佈圖、熱力圖、箱型圖等。

圖表範本：
「基於數據創建以下視覺化：
1. 銷售趨勢的時間序列圖
2. 各地區收入對比的長條圖  
3. 產品類別的圓餅圖
4. 客戶年齡與消費的散佈圖
要求：專業配色、清楚標籤、適當標題」

進階分析功能：
- 相關性分析和迴歸模型
- 時間序列預測
- 集群分析和分類
- A/B測試結果分析

商業應用實例：
銷售數據分析、客戶行為洞察、財務報表分析、市場研究數據處理、營運效率評估。`,
        transcriptEn: `Advanced Data Analysis is a powerful feature of ChatGPT Plus, allowing it to handle complex data analysis tasks, equivalent to having a professional data scientist assistant.

File upload and processing:
Supports various formats including Excel (.xlsx, .xls), CSV, PDF, JSON, etc. After uploading, ChatGPT can automatically identify the data structure and provide preliminary analysis.

Data exploration and cleaning:
"Please analyze the dataset I uploaded:
1. Provide basic overview of the dataset (number of rows, number of columns, data types)
2. Identify missing values and outliers
3. Calculate basic statistics (mean, median, standard deviation)
4. Check data quality issues
5. Suggest data cleaning steps"

Visual chart creation:
ChatGPT can create various professional charts: line graphs, bar graphs, scatter plots, heat maps, box plots, etc.

Chart template:
"Based on data, create the following visualizations:
1. Time series chart of sales trends
2. Bar graph showing regional income comparisons  
3. Pie chart showing product categories
4. Scatter plot showing customer age and spending
Requirements: Professional color scheme, clear labels, appropriate title"

Advanced analysis features:
- Correlation analysis and regression models
- Time series forecasting
- Cluster analysis and classification
- Analysis of A/B test results

Business applications:
Sales data analysis, customer behavior insights, financial statement analysis, market research data processing, operational efficiency evaluation.`,
        keyPoints: [
          "多格式支援：處理Excel、CSV、PDF等各種數據文件",
          "自動化分析：快速生成數據概況和統計摘要",
          "專業視覺化：創建各種類型的商業級圖表",
          "深度洞察：進行相關性、預測和集群等進階分析"
        ]
      },
      {
        id: 23,
        title: "5.2 Web Browse (實時網絡瀏覽)：結合即時網絡資訊，進行市場調查與新聞總結",
        duration: "20分鐘",
        type: "text" as const,
        description: "學習如何利用ChatGPT的網絡瀏覽功能獲取和分析最新資訊。",
        transcript: `Web Browse功能讓ChatGPT能夠實時訪問互聯網，獲取最新資訊並進行深度分析，解決了傳統AI模型知識更新滯後的問題。

實時資訊搜尋：
「請搜尋並總結[主題]的最新發展：
- 時間範圍：最近[天數/月數]
- 資訊來源：[新聞媒體/學術論文/官方報告]
- 重點關注：[特定角度/影響層面]
- 提供來源連結以便驗證」

市場調查與競爭分析：
「進行[產品/服務]的市場調查：
1. 搜尋主要競爭對手的最新動態
2. 分析市場趨勢和消費者反應
3. 收集定價和功能比較資訊
4. 識別市場機會和威脅
5. 提供策略建議」

新聞事件追蹤：
「請追蹤[事件/話題]的發展：
- 收集來自不同觀點的報導
- 分析各方立場和論點
- 總結事件的關鍵時間線
- 評估對相關行業的影響
- 預測可能的後續發展」

投資研究支援：
「研究[公司/行業]的投資價值：
1. 最新財報和業績表現
2. 分析師評級和預測
3. 行業趨勢和監管變化
4. 風險因素和機會分析
5. 投資建議和注意事項」

使用技巧：
- 明確指定時間範圍和資訊來源類型
- 要求提供原始連結以便核實
- 針對爭議性話題尋求多方觀點
- 定期更新搜尋以獲取最新資訊`,
        transcriptEn: `Web Browse allows ChatGPT to access the internet in real-time, obtain the latest information, and perform deep analysis, solving the problem of delayed knowledge update in traditional AI models.

Real-time information search:
"Please search and summarize the latest developments of [topic]:
- Time range: Recent [number of days/months]
- Information sources: [News media/Academic papers/Official reports]
- Focus: [Specific angle/Aspect]
- Providing source links for verification"

Market research and competitive analysis:
"Conduct market research for [product/service]:
1. Search for the latest developments of main competitors
2. Analyze market trends and consumer reactions
3. Collect information about pricing and feature comparisons
4. Identify market opportunities and threats
5. Provide strategic suggestions"

News event tracking:
"Please track the development of [event/topic]:
- Collect reports from different perspectives
- Analyze different viewpoints and arguments
- Summarize the key timeline of events
- Assess the impact on related industries
- Predict possible subsequent developments"

Investment research support:
"Research on the investment value of [company/industry]:
1. Latest financial reports and performance
2. Analyst ratings and forecasts
3. Industry trends and regulatory changes
4. Risk factors and opportunities analysis
5. Investment advice and considerations"

Usage tips:
- Clearly specify the time range and type of information source
- Request original links for verification
- Seek multiple perspectives on controversial topics
- Regularly update searches to obtain the latest information`,
        keyPoints: [
          "即時更新：獲取最新的市場和新聞資訊",
          "多源整合：結合不同來源的資訊進行綜合分析",
          "投資研究：支援財務分析和投資決策",
          "趨勢追蹤：持續監控行業和事件發展"
        ]
      },
      {
        id: 24,
        title: "5.3 DALL-E 3 圖像生成：用文字創造出專業級的商業插圖、簡報圖片與藝術作品",
        duration: "32分鐘",
        type: "text" as const,
        description: "掌握使用DALL-E 3創作高質量圖像的技巧和應用。",
        transcript: `DALL-E 3是整合在ChatGPT中的強大圖像生成AI，能夠根據文字描述創造出令人驚艷的視覺內容。

商業插圖創作：
「為[產品/服務]創作商業插圖：
風格：[現代簡約/專業商務/創意藝術]
用途：[網站首頁/宣傳海報/產品包裝]
色調：[品牌色彩/暖色調/冷色調]
構圖：[中心焦點/對稱布局/動態安排]
元素：[特定物件/人物/背景]」

簡報視覺設計：
「為商業簡報創建視覺元素：
1. 概念圖解：將抽象概念視覺化
2. 流程圖示：展示工作流程或決策樹
3. 比較圖表：突出產品優勢
4. 背景圖像：專業且不干擾文字的背景
5. 圖標設計：符合主題的小圖標」

創意藝術作品：
「創作[主題]的藝術作品：
藝術風格：[印象派/超現實主義/數位藝術/水彩畫]
情感基調：[平靜/活力/神秘/溫暖]
構圖要素：[人物/風景/抽象/幾何]
色彩偏好：[鮮豔對比/柔和漸層/單色調]」

品牌視覺設計：
「為[品牌名稱]設計視覺識別：
1. Logo概念圖：反映品牌價值
2. 包裝設計：產品包裝視覺
3. 廣告海報：市場推廣材料
4. 社群媒體圖像：各平台適用的視覺
5. 辦公空間設計：品牌環境應用」

技術技巧：
- 詳細描述想要的視覺效果
- 指定藝術風格和技法
- 說明用途以獲得合適的構圖
- 要求多個版本以便選擇
- 結合品牌指南確保一致性

應用場景：
網站設計、行銷材料、產品概念圖、教育插圖、社群媒體內容、演講背景等。`,
        transcriptEn: `DALL-E 3 is a powerful image generation AI integrated into ChatGPT, capable of creating visually stunning content based on text descriptions.

Commercial illustration creation:
"Create commercial illustrations for [product/service]:
Style: [Modern minimalist/Professional business/Creative art]
Purpose: [Homepage of website/Promotional poster/Product packaging]
Tone: [Brand colors/Warm tones/Cool tones]
Composition: [Central focal point/Symmetrical layout/Dynamic arrangement]
Elements: [Specific objects/Characters/Backgrounds]"

Presentation visual design:
"Creating visual elements for business presentations:
1. Concept diagrams: Visualizing abstract concepts
2. Flowcharts: Illustrating workflow or decision trees
3. Comparative charts: Highlighting product advantages
4. Background images: Professional and unobtrusive text background
5. Icon design: Small icons that fit the theme"

Creative art:
"Creating art for [theme]:
Art style: [Impressionism/Surrealism/Digital art/Watercolor]
Emotional tone: [Calm/Vibrant/Mystical/Warm]
Composition elements: [Characters/Landscapes/Abstract/Geometric]
Color preferences: [Vivid contrast/Gradual transition/Monochrome]"

Brand visual design:
"Designing visual identity for [brand name]:
1. Logo concept diagram: Reflecting brand value
2. Packaging design: Product packaging visuals
3. Advertisement posters: Marketing materials for the market
4. Social media images: Visuals suitable for various platforms
5. Office space design: Brand environment application"

Technical skills:
- Clearly describe the visual effects you want
- Specify the artistic style and techniques
- Explain the purpose to get an appropriate composition
- Request multiple versions for selection
- Combine with brand guidelines for consistency

Application scenarios:
Website design, marketing materials, product concept diagrams, educational illustrations, social media content, presentation backgrounds, etc.`,
        keyPoints: [
          "商業應用：創建專業的商業插圖和行銷素材",
          "風格多樣：支援各種藝術風格和表現技法",
          "品牌一致：確保視覺內容符合品牌識別",
          "用途廣泛：適用於網站、簡報、廣告等多種場景"
        ]
      },
      {
        id: 25,
        title: "5.4 創建你的第一個 Custom GPT：無需編程，手把手教你打造個人專屬的 AI 應用",
        duration: "45分鐘",
        type: "text" as const,
        description: "學習如何創建和配置自訂GPT，打造專屬的AI助手。",
        transcript: `Custom GPT讓每個人都能創建專門的AI助手，無需編程技能即可打造滿足特定需求的應用。

創建流程概覽：
1. 確定GPT的用途和目標用戶
2. 設計對話流程和專業領域
3. 撰寫系統指令和行為準則
4. 上傳相關知識文件
5. 測試和優化回應品質
6. 發布和維護更新

系統指令設計：
「你是一位專業的[領域]顧問，專門協助[目標用戶]解決[特定問題]。

核心職責：
- [具體任務1]
- [具體任務2]  
- [具體任務3]

溝通風格：
- 語調：[專業/友善/幽默]
- 詳細程度：[簡潔/詳細/分層]
- 特殊要求：[避免術語/提供例子/互動引導]

工作流程：
1. 理解用戶需求
2. 提供專業分析
3. 給出具體建議
4. 確認理解和後續步驟」

知識庫建置：
上傳相關文件、手冊、最佳實踐指南等，建立GPT的專業知識基礎。文件類型支援PDF、Word、文本文件等。

實用範例：
1. 健身教練GPT：提供個人化運動計劃
2. 財務顧問GPT：分析投資組合和理財建議
3. 烹飪助手GPT：根據食材推薦食譜
4. 學習導師GPT：制定個人化學習計劃
5. 創業顧問GPT：提供商業策略指導

優化技巧：
- 持續收集用戶反饋
- 定期更新知識庫
- 調整系統指令
- 增加新功能和能力
- 監控使用數據和效果

發布策略：
選擇私人使用、分享給特定用戶、或公開發布到GPT商店。考慮目標受眾和商業模式。`,
        transcriptEn: `Custom GPT allows everyone to create their own AI assistant without the need for programming skills.

Creation process overview:
1. Determine the purpose and target users of GPT
2. Design dialogue flow and professional field
3. Write system commands and behavioral guidelines
4. Upload relevant knowledge documents
5. Test and optimize response quality
6. Release and maintain updates

System command design:
"You are a professional consultant in the [field], specializing in helping [target users] solve [specific problems].

Core responsibilities:
- [Specific task 1]
- [Specific task 2]  
- [Specific task 3]

Communication style:
- Tone: [Professional/Friendly/Humorous]
- Detail level: [Concise/Detailed/Layered]
- Special requirements: [Avoid jargon/Provide examples/Interactive guidance]

Workflow:
1. Understanding user needs
2. Providing professional analysis
3. Giving specific suggestions
4. Confirming understanding and subsequent steps"

Knowledge base setup:
Upload relevant files, manuals, best practice guides, etc., to establish the professional knowledge base of GPT. File types supported include PDF, Word, text files, etc.

Practical examples:
1. Fitness coach GPT: Providing personalized workout plan
2. Financial advisor GPT: Analyzing investment portfolio and financial advice
3. Cooking assistant GPT: Recommend recipes based on ingredients
4. Learning mentor GPT: Developing personalized learning plan
5. Entrepreneur advisor GPT: Providing business strategy guidance

Optimization techniques:
- Continuously collecting user feedback
- Regularly updating knowledge base
- Adjusting system commands
- Adding new features and capabilities
- Monitoring usage data and effectiveness

Release strategy:
Choose private use, share with specific users, or publicly release to GPT Store. Consider target audience and business model.`,
        keyPoints: [
          "無需編程：使用自然語言即可創建專業AI助手",
          "知識整合：上傳專業文件建立領域知識庫",
          "個人化設計：根據特定需求定制對話風格和功能",
          "持續優化：通過反饋和數據不斷改進GPT效能"
        ]
      },
      {
        id: 26,
        title: "5.5 GPTs 應用商店的秘密：如何發佈你的 GPT，甚至未來可能從中獲利",
        duration: "22分鐘",
        type: "text" as const,
        description: "了解GPT商店的運作機制和商業化策略。",
        transcript: `GPT Store不僅是使用他人創建的GPT的平台，也是創作者展示作品和建立品牌的重要管道。

發布準備工作：
1. 完善GPT功能和穩定性
2. 撰寫吸引人的描述和標題
3. 設計專業的圖標和封面
4. 準備使用範例和說明文檔
5. 測試不同使用場景

商店排名因素：
- 用戶評分和評論質量
- 使用頻率和活躍度
- 描述的清晰度和完整性
- 回應品質和準確性
- 更新頻率和維護狀況

市場定位策略：
「分析你的GPT的獨特價值：
1. 目標用戶群體：誰最需要這個工具？
2. 競爭對手分析：現有類似GPT的優缺點
3. 差異化優勢：你的GPT有什麼獨特之處？
4. 使用場景：具體的應用情境
5. 價值主張：為用戶解決什麼問題？」

內容行銷技巧：
- 創建使用教學和範例
- 分享成功案例和用戶故事
- 參與社群討論和技術交流
- 建立個人品牌和專業形象
- 收集和展示用戶證言

未來商業機會：
雖然目前GPT Store還未開放收費機制，但預期未來可能的盈利模式包括：
1. 付費訂閱模式
2. 使用次數計費
3. 高級功能增值服務
4. 企業客戶客制化服務
5. 品牌合作和廣告收入

品質維護策略：
- 定期更新改進
- 即時回應用戶問題
- 監控性能和錯誤
- 擴展功能和知識庫
- 建立用戶社群

成功案例分析：
研究熱門GPT的成功因素，學習最佳實踐，避免常見陷阱，建立可持續的發展策略。`,
        transcriptEn: `GPT Store is not only a platform for using GPTs created by others but also an important channel for creators to showcase their work and build brands.

Preparation for release:
1. Improve GPT functionality and stability
2. Write attractive descriptions and headlines
3. Design professional icons and covers
4. Prepare example usage and documentation
5. Test different usage scenarios

Store ranking factors:
- User ratings and review quality
- Usage frequency and activity
- Clarity and completeness of description
- Response quality and accuracy
- Update frequency and maintenance status

Market positioning strategy:
"Analyze the unique value of your GPT:
1. Target user group: Who needs this tool the most?
2. Competitor analysis: Strengths and weaknesses of similar GPTs
3. Differentiation advantage: What makes your GPT unique?
4. Usage scenarios: Specific application contexts
5. Value proposition: What problem does your GPT solve for users?"

Content marketing techniques:
- Creating instructional content and examples
- Sharing success stories and user experiences
- Participating in community discussions and technical exchanges
- Building personal brand and professional image
- Collecting and showcasing user testimonials

Future business opportunities:
Although GPT Store has not yet implemented a paid mechanism, future possible revenue models include:
1. Paid subscription model
2. Usage-based fee
3. Premium feature value-added services
4. Enterprise customer customization services
5. Brand collaboration and advertising revenue

Quality maintenance strategy:
- Regular updates and improvements
- Immediate response to user questions
- Monitoring performance and errors
- Expanding features and knowledge base
- Building user community

Case studies:
Studying the success factors of popular GPTs, learning from best practices, avoiding common pitfalls, and establishing sustainable development strategies.`,
        keyPoints: [
          "市場定位：明確目標用戶和差異化優勢",
          "品質優化：持續改進功能和用戶體驗",
          "社群建設：通過內容行銷建立用戶基礎",
          "商業準備：為未來的盈利機會做好準備"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "第六章：展望未來 — 應用、倫理與挑戰",
    description: "從宏觀視角審視ChatGPT及其背後的技術，探討應用前景、倫理挑戰和未來發展。",
    lessons: [
      {
        id: 27,
        title: "6.1 AI 的「幻覺」現象：如何識別並查證 AI 生成的虛假資訊",
        duration: "18分鐘",
        type: "text" as const,
        description: "深入了解AI幻覺問題，學會批判性評估AI輸出的可信度。",
        transcript: `AI幻覺是大型語言模型最需要重視的限制，理解和識別這個現象對安全使用AI至關重要。

幻覺現象的特徵：
1. 事實性錯誤：編造不存在的統計數據、日期、人名
2. 邏輯不一致：前後矛盾的陳述
3. 來源虛構：引用不存在的研究或文獻
4. 過度自信：以權威語調陳述錯誤信息
5. 細節豐富：虛假信息往往包含大量細節以增加可信度

識別技巧：
「評估AI回應的可信度：
1. 事實核查：重要數據需要獨立驗證
2. 來源追溯：檢查引用的文獻是否真實存在
3. 邏輯檢驗：分析推理過程是否合理
4. 專業諮詢：涉及專業領域時尋求專家意見
5. 多源比較：對比不同資訊來源的說法」

高風險領域：
- 醫療健康建議
- 法律條文解釋
- 財務投資指導
- 技術規範說明
- 歷史事實陳述

預防策略：
1. 設定適當期望：理解AI的限制
2. 要求引用來源：請AI提供資料來源
3. 分段驗證：將複雜問題分解驗證
4. 保持懷疑：對異常結果保持警覺
5. 建立檢查流程：制定標準驗證程序

實用檢驗方法：
「請針對以下回應進行事實檢查：
[AI回應內容]
1. 識別可驗證的事實陳述
2. 檢查數據和統計的準確性
3. 驗證引用來源的真實性
4. 評估邏輯推理的合理性
5. 提供修正或替代資訊」`,
        transcriptEn: `AI hallucination is one of the most important limitations of large language models, and understanding and identifying this phenomenon is crucial for safe use of AI.

Characteristics of hallucination:
1. Factually incorrect: Fabricating statistics, dates, or names that don't exist
2. Logically inconsistent: Contradictory statements
3. Source fictional: Citing non-existent research or literature
4. Overconfidence: Asserting incorrect information in an authoritative tone
5. Rich details: Fake information often contains a lot of details to increase credibility

Recognition techniques:
"Assessing the credibility of AI responses:
1. Fact-checking: Important data needs independent verification
2. Source tracing: Checking whether the cited literature actually exists
3. Logical verification: Analyzing whether the reasoning process is reasonable
4. Professional consultation: Seeking expert opinions when dealing with professional fields
5. Multi-source comparison: Comparing different sources' explanations"

High-risk areas:
- Medical health advice
- Legal interpretation
- Financial investment guidance
- Technical specifications
- Historical factual statements

Prevention strategies:
1. Setting appropriate expectations: Understanding AI's limitations
2. Requesting source attribution: Asking AI to provide data sources
3. Segmented verification: Breaking down complex questions into smaller parts for verification
4. Maintaining suspicion: Being alert to unusual results
5. Establishing check procedures: Establishing standardized verification procedures`,
        keyPoints: [
          "幻覺識別：學會辨識AI生成的虛假或不準確信息",
          "驗證方法：建立系統化的事實查核流程",
          "風險意識：特別注意高風險領域的AI建議",
          "批判思維：保持健康的懷疑態度和獨立判斷"
        ]
      },
      {
        id: 28,
        title: "6.2 數據私隱與安全：你的對話安全嗎？如何管理你的數據",
        duration: "15分鐘",
        type: "text" as const,
        description: "了解使用ChatGPT時的隱私風險和數據保護措施。",
        transcript: `在享受AI便利的同時，保護個人隱私和敏感數據是每個用戶都應該重視的問題。

數據收集與使用：
OpenAI會收集用戶的對話內容用於模型改進，除非用戶主動選擇退出或使用臨時對話模式。

隱私風險評估：
1. 個人身份信息洩露
2. 商業機密和知識產權
3. 財務和法律敏感信息
4. 個人隱私和家庭信息
5. 工作相關的內部資料

保護策略：
「使用ChatGPT時的隱私保護清單：
□ 啟用臨時對話模式（敏感話題）
□ 避免輸入真實姓名和聯絡方式
□ 不分享密碼或帳戶資訊
□ 匿名化商業數據和案例
□ 避免討論機密項目細節
□ 定期檢查和刪除對話歷史」

企業使用指南：
1. 制定AI使用政策
2. 員工隱私意識培訓
3. 敏感數據分類管理
4. 使用企業版ChatGPT
5. 建立數據外洩應對程序

法律合規考慮：
不同地區的數據保護法規（如GDPR、CCPA）對AI使用有不同要求，企業需要確保合規使用。

最佳實踐：
- 數據最小化原則：只分享必要信息
- 去識別化處理：移除可識別個人的信息
- 定期審查：檢查存儲的對話記錄
- 透明溝通：告知團隊成員AI使用政策
- 持續監控：關注隱私政策的更新`,
        transcriptEn: `While enjoying the convenience of AI, protecting personal privacy and sensitive data is a concern for every user.

Data collection and use:
OpenAI collects user dialogue content for model improvement unless users choose to opt out or use temporary dialogue mode.

Privacy risk assessment:
1. Personal identity information leakage
2. Business secrets and intellectual property rights
3. Financial and legal sensitive information
4. Personal privacy and family information
5. Internal data related to work

Protection strategies:
"The privacy protection checklist for using ChatGPT:
□ Enable temporary dialogue mode (sensitive topics)
□ Avoid entering real name and contact information
□ Not sharing passwords or account information
□ Anonymizing business data and cases
□ Avoid discussing project details in sensitive topics
□ Regularly checking and deleting dialogue history"

Enterprise user guide:
1. Establishing AI usage policies
2. Employee privacy awareness training
3. Categorizing sensitive data
4. Using enterprise version of ChatGPT
5. Establishing data leakage response procedures

Legal compliance considerations:
Different data protection regulations (such as GDPR, CCPA) have different requirements for AI use, and enterprises need to ensure compliance.

Best practices:
- Data minimization principle: Sharing only necessary information
- De-identification processing: Removing identifiable personal information
- Regular review: Checking stored dialogue records
- Transparent communication: Informing team members about AI usage policies
- Continuous monitoring: Keeping an eye on privacy policy updates`,
        keyPoints: [
          "風險認知：了解使用AI時可能的隱私風險",
          "保護措施：掌握具體的數據保護技巧",
          "企業合規：建立組織層面的AI使用規範",
          "持續警覺：保持對隱私保護的持續關注"
        ]
      },
      {
        id: 29,
        title: "6.3 AI 的偏見問題：認識訓練數據帶來的潛在影響，並學習如何應對",
        duration: "22分鐘",
        type: "text" as const,
        description: "探討AI偏見的來源和影響，學習如何識別和減少偏見。",
        transcript: `AI偏見是訓練數據和算法設計固有的問題，影響著AI系統的公平性和準確性。

偏見的來源：
1. 訓練數據偏見：數據集本身反映的社會偏見
2. 標註偏見：人工標註過程中的主觀判斷
3. 選擇偏見：數據收集過程的系統性偏差
4. 確認偏見：模型強化既有的刻板印象
5. 算法偏見：設計和優化過程的偏向

常見偏見類型：
「識別AI回應中的潛在偏見：
1. 性別偏見：職業和角色的性別刻板印象
2. 種族偏見：文化和族群的不當聯想
3. 年齡偏見：對不同年齡群體的假設
4. 社經偏見：基於收入或教育的判斷
5. 地理偏見：對特定地區的偏見看法」

識別方法：
- 多角度測試相同問題
- 檢查回應中的刻板印象
- 注意用詞的潛在偏向
- 比較不同群體的描述
- 尋求多元觀點的驗證

減少偏見的策略：
1. 明確要求平衡觀點：「請提供不同角度的看法」
2. 挑戰假設：「這個建議是否適用於所有群體？」
3. 要求證據支撐：「請提供支持這個觀點的證據」
4. 尋求替代方案：「還有其他可能的解釋嗎？」
5. 多元化輸入：使用不同的提示方式

實用技巧：
「減少AI偏見的提示技巧：
- 明確要求包容性：『請確保建議適用於不同背景的人』
- 質疑預設假設：『請說明這個建議的前提條件』
- 要求多元觀點：『請從不同文化角度分析這個問題』
- 檢查代表性：『這個例子是否具有普遍適用性？』」

教育與意識提升：
了解偏見問題有助於成為更負責任的AI用戶，同時也能幫助改善AI系統的公平性。`,
        transcriptEn: `AI bias is a problem inherent in training data and algorithm design, affecting the fairness and accuracy of AI systems.

Sources of bias:
1. Training data bias: Social biases reflected in the dataset itself
2. Annotation bias: Subjective judgments in the process of manual annotation
3. Selection bias: Systematic bias in the data collection process
4. Confirmation bias: Reinforcement of existing stereotypes in the model
5. Algorithmic bias: Bias in design and optimization process

Common types of bias:
"Identifying potential bias in AI responses:
1. Gender bias: Gender stereotypes in occupations and roles
2. Racial bias: Cultural and ethnic stereotypes
3. Age bias: Assumptions about different age groups
4. Socio-economic bias: Judgments based on income or education
5. Geographical bias: Prejudices about specific regions"

Recognition methods:
- Testing the same question from multiple angles
- Checking for stereotypes in responses
- Paying attention to subtle biases in wording
- Comparing descriptions across different groups
- Seeking validation from multiple perspectives

Strategies to reduce bias:
1. Clearly stating multiple perspectives: "Please provide different viewpoints"
2. Challenging assumptions: "Is this suggestion applicable to all groups?"
3. Requesting evidence to support viewpoints: "Please provide evidence to support this viewpoint"
4. Seeking alternative explanations: "Are there any other possible explanations?"
5. Using diverse input prompts: Asking questions from different cultural perspectives

Educational and awareness enhancement:
Understanding issues related to bias helps you become a more responsible AI user, while also helping to improve the fairness of AI systems.`,
        keyPoints: [
          "偏見來源：理解AI偏見的多重來源和表現形式",
          "識別技巧：學會發現AI回應中的潛在偏見",
          "減少策略：掌握減少偏見影響的實用方法",
          "責任意識：培養負責任使用AI的觀念"
        ]
      },
      {
        id: 30,
        title: "6.4 負責任地使用 AI：在學術、工作與創作中應遵守的倫理界線",
        duration: "20分鐘",
        type: "text" as const,
        description: "建立AI使用的倫理框架，在不同場景中做出負責任的選擇。",
        transcript: `隨著AI能力的增強，如何負責任地使用這些工具成為每個用戶都應該思考的重要問題。

學術研究中的AI倫理：
1. 誠實申報：在論文中明確標示AI協助的部分
2. 原創性維護：確保核心觀點和分析是自己的貢獻
3. 資料驗證：對AI提供的引用和數據進行獨立確認
4. 避免抄襲：不直接使用AI生成的文字作為自己的作品
5. 尊重指導原則：遵循學校和期刊的AI使用政策

工作場域的倫理考量：
「建立工作中的AI使用準則：
1. 透明原則：告知團隊和客戶AI協助的範圍
2. 品質保證：對AI輸出進行人工審核和驗證
3. 責任歸屬：為最終決策和結果承擔責任
4. 隱私保護：避免將敏感信息輸入AI系統
5. 公平競爭：不利用AI進行不當競爭行為」

創作領域的界線：
- 創意靈感 vs. 直接抄襲
- 協助工具 vs. 替代創作者
- 原創聲明 vs. AI生成聲明
- 商業使用的合法性和道德性

建立個人倫理框架：
「思考你的AI使用原則：
1. 目的正當性：使用AI的目的是否正當？
2. 方法適當性：使用方式是否恰當？
3. 結果負責性：是否為結果承擔責任？
4. 影響考量：對他人和社會的影響如何？
5. 持續學習：如何不斷改進使用方式？」

不同場景的指導原則：
1. 教育學習：增進理解而非替代思考
2. 專業工作：提升效率而非降低品質
3. 創意創作：激發靈感而非完全依賴
4. 決策支援：提供資訊而非代替判斷
5. 溝通協助：改善表達而非虛假包裝

培養判斷能力：
定期反思AI使用經驗，與同事和朋友討論倫理問題，關注相關法規和行業標準的發展。`,
        transcriptEn: `As AI capabilities increase, how to use these tools responsibly has become a significant concern for every user.

AI ethics in academic research:
1. Honest declaration: Clearly marking the part assisted by AI in papers
2. Originality maintenance: Ensuring that the core points and analysis are their own contributions
3. Data verification: Independently confirming the references and data provided by AI
4. Avoiding plagiarism: Not using AI-generated text directly as their own work
5. Following AI usage policies of schools and journals

Ethical considerations in the workplace:
"Establishing guidelines for using AI in the workplace:
1. Transparent principle: Informing team members and clients about the scope of AI assistance
2. Quality assurance: Conducting manual review and verification of AI outputs
3. Attribution of responsibility: Taking responsibility for final decisions and outcomes
4. Privacy protection: Avoiding inputting sensitive information into AI systems
5. Fair competition: Not engaging in improper competitive behavior using AI"

Boundaries in creative fields:
- Creative inspiration vs. direct plagiarism
- Helper tools vs. alternative creators
- Original statements vs. AI-generated statements
- Legality and morality of commercial use

Establishing personal ethical framework:
"Thinking about your principles for using AI:
1. Legitimacy of purpose: Is using AI legitimate?
2. Appropriateness of methods: Is the way of using AI appropriate?
3. Responsibility for outcomes: Are you responsible for the results?
4. Consideration of impact: What is the impact on others and society?
5. Continuous learning: How can we continuously improve our use of AI?"

Guidelines for different scenarios:
1. Educational learning: Enhancing understanding rather than replacing thinking
2. Professional work: Improving efficiency rather than lowering quality
3. Creative creation: Stimulating inspiration rather than relying entirely on AI
4. Decision support: Providing information rather than making judgments for others
5. Communication assistance: Improving expression rather than false packaging

Developing judgment:
Regularly reflecting on AI usage experiences, discussing ethical issues with colleagues and friends, and keeping an eye on developments in relevant laws and industry standards.`,
        keyPoints: [
          "情境意識：在不同場景中應用適當的倫理標準",
          "透明誠實：對AI使用保持開放和誠實的態度",
          "責任承擔：為AI協助下的決策和結果負責",
          "持續學習：不斷更新和改進AI使用的倫理觀念"
        ]
      },
      {
        id: 31,
        title: "6.5 人工智能的未來：展望 GPT 的下一步發展與對社會的長遠影響",
        duration: "25分鐘",
        type: "text" as const,
        description: "探索AI技術的未來發展方向和對社會的深遠影響。",
        transcript: `站在AI革命的轉折點，我們需要思考技術發展的方向和社會影響，為未來做好準備。

技術發展趨勢：
1. 多模態整合：文字、圖像、音頻、視頻的無縫結合
2. 推理能力增強：從模式匹配到真正的邏輯推理
3. 個人化程度提升：基於個人數據的深度定制
4. 實時學習能力：持續從互動中學習和改進
5. 具身智能：AI與機器人技術的深度融合

社會影響層面：
「AI對社會的多重影響：
經濟層面：
- 工作性質的根本改變
- 新興職業和技能需求
- 生產力的大幅提升
- 經濟不平等的可能加劇

教育層面：
- 個人化學習的普及
- 教師角色的轉變
- 終身學習的必要性
- 批判思維的重要性提升

社會結構：
- 人機協作模式的建立
- 決策過程的自動化
- 隱私和監控的平衡
- 數位落差的挑戰」

機會與挑戰：
機會：
- 解決複雜全球問題（氣候變化、疾病治療）
- 提升生活品質和工作效率
- 促進知識民主化和教育普及
- 釋放人類創造力和想像力

挑戰：
- 就業市場的結構性變化
- 技術依賴和技能退化
- 倫理和責任的複雜問題
- 技術控制和權力集中

個人準備策略：
「為AI時代做準備：
1. 持續學習：保持好奇心和學習能力
2. 培養批判思維：學會質疑和驗證
3. 發展人際技能：重視人類獨有的能力
4. 擁抱技術變化：積極適應新工具
5. 關注倫理問題：參與社會討論和決策」

長期願景：
理想的AI未來應該是人機協作、技術普惠、倫理約束的社會，每個人都能從AI發展中受益，同時保持人類的自主性和尊嚴。

行動建議：
- 積極學習和使用AI工具
- 參與AI倫理和政策討論
- 支持AI教育和技能培訓
- 關注技術發展對弱勢群體的影響
- 推動負責任的AI發展`,
        transcriptEn: `At the turning point of the AI revolution, we need to think about the direction of technological development and its long-term impact on society, preparing for the future.

Trends in technological development:
1. Multi-modal integration: Seamless combination of text, images, audio, and video
2. Enhanced reasoning ability: From pattern matching to true logical reasoning
3. Increased personalization: Deep customization based on personal data
4. Real-time learning ability: Continuous learning and improvement from interactions
5. Embodied intelligence: Deep integration of AI and robotics technology

Social impact dimensions:
"Multi-faceted impact of AI on society:
Economic aspect:
- Fundamental change in job nature
- Emergence of new professions and skill needs
- Significant increase in productivity
- Possible exacerbation of economic inequality

Educational aspect:
- Popularization of personalized learning
- Transformation of teacher roles
- Necessity of lifelong learning
- Significance of critical thinking

Social structure:
- Establishment of human-machine collaboration mode
- Automation of decision-making process
- Balance between privacy and monitoring
- Challenge of digital divide"

Opportunities and challenges:
Opportunities:
- Solving complex global issues (climate change, disease treatment)
- Improving quality of life and work efficiency
- Promoting democratization of knowledge and education
- Releasing human creativity and imagination

Challenges:
- Structural changes in the job market
- Technological dependence and skill degradation
- Complex issues related to ethics and responsibility
- Technological control and concentration of power

Personal preparation strategies:
"Preparing for the AI era:
1. Continuous learning: Maintaining curiosity and learning ability
2. Developing critical thinking: Learning to question and verify
3. Developing interpersonal skills: Valuing human-specific abilities
4. Embracing technological changes: Actively adapting to new tools
5. Engaging in AI ethics and policy discussions"

Long-term vision:
The ideal future of AI should be a society where human-machine collaboration, technological inclusivity, and ethical constraints are the norm, with everyone benefiting from AI development while maintaining human autonomy and dignity.

Actionable advice:
- Actively learning and using AI tools
- Participating in AI ethics and policy discussions
- Supporting AI education and skill training
- Paying attention to the impact of technological development on disadvantaged groups
- Promoting responsible AI development`,
        keyPoints: [
          "技術前瞻：理解AI技術的發展方向和可能性",
          "社會影響：認識AI對經濟、教育、社會的深遠影響",
          "個人適應：制定個人的AI時代適應策略",
          "集體責任：參與構建負責任的AI未來社會"
        ]
      }
    ]
  }
];

// FAQ數據
const faqData = [
  {
    question: "這個課程適合完全沒有AI經驗的新手嗎？",
    questionEn: "Is this course suitable for complete beginners with no AI experience?",
    answer: "絕對適合！本課程從最基礎的概念開始，逐步深入到高級應用。我們會詳細解釋每個專業術語，並提供大量實戰案例，確保零基礎學員也能輕鬆跟上。",
    answerEn: "Absolutely! This course starts from the most fundamental concepts and gradually progresses to advanced applications. We explain every technical term in detail and provide numerous practical examples to ensure that even complete beginners can follow along easily."
  },
  {
    question: "學完這個課程後，我能達到什麼水平？",
    questionEn: "What level will I achieve after completing this course?",
    answer: "學完後，您將能夠：1) 深度理解ChatGPT的技術原理；2) 熟練運用各種高級提示工程技巧；3) 創建和管理自訂GPT；4) 在工作中有效應用AI工具提升效率；5) 具備AI倫理和隱私保護意識。",
    answerEn: "Upon completion, you will be able to: 1) Deeply understand ChatGPT's technical principles; 2) Proficiently apply various advanced prompt engineering techniques; 3) Create and manage custom GPTs; 4) Effectively apply AI tools in your work to enhance efficiency; 5) Possess AI ethics and privacy protection awareness."
  },
  {
    question: "課程內容會定期更新嗎？",
    questionEn: "Will the course content be regularly updated?",
    answer: "是的！AI技術發展迅速，我們會密切關注OpenAI的更新，及時調整課程內容。當有重大功能更新時（如新模型發布、新功能上線），我們會免費提供補充內容。",
    answerEn: "Yes! AI technology develops rapidly, and we closely monitor OpenAI's updates to adjust course content promptly. When there are major functional updates (such as new model releases or new features going live), we will provide supplementary content free of charge."
  },
  {
    question: "我需要付費訂閱ChatGPT Plus才能學習嗎？",
    questionEn: "Do I need to pay for a ChatGPT Plus subscription to study this course?",
    answer: "不是必需的。課程涵蓋免費版和付費版的功能，我們會明確標註哪些是付費功能。不過，如果您希望實踐所有高級功能（如自訂GPT、高級數據分析等），建議考慮訂閱Plus版本。",
    answerEn: "It's not necessary. The course covers both free and paid version features, and we clearly mark which are paid features. However, if you wish to practise all advanced features (such as custom GPTs, advanced data analysis, etc.), we recommend considering a Plus subscription."
  },
  {
    question: "學習這個課程需要多長時間？",
    questionEn: "How long does it take to complete this course?",
    answer: "課程總時長約15小時，建議按照章節順序學習。如果您每天投入1-2小時，大約1-2週可以完成。重要的是理解和實踐，而不是速度。",
    answerEn: "The total course duration is approximately 15 hours, and we recommend studying in chapter order. If you dedicate 1-2 hours per day, you can complete it in about 1-2 weeks. What's important is understanding and practice, not speed."
  }
];

// 完整的課程數據
export const chatGPTCourseData = {
  courseInfo: {
    badge: "免費完整課程",
    badgeEn: "Free Complete Course",
    title: "ChatGPT 完整教學實戰",
    titleEn: "ChatGPT Complete Practical Course",
    subtitle: "從基礎概念到高級應用，全面掌握ChatGPT的核心技術與實戰技巧，成為AI時代的數位專家。",
    subtitleEn: "From fundamental concepts to advanced applications, comprehensively master ChatGPT's core technologies and practical techniques to become a digital expert in the AI era.",
    instructor: "AI Formula Team",
    instructorEn: "AI Formula Team",
    instructorTitle: "AI 應用專家與提示工程師",
    instructorTitleEn: "AI Application Specialists and Prompt Engineers",
    rating: 4.9,
    students: 50000,
    duration: "15+ 小時",
    durationEn: "15+ Hours"
  },
  courseModules,
  faqData,
  isFree: true
};

export default chatGPTCourseData;