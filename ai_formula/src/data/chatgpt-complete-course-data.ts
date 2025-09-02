/**
 * ChatGPT Complete Course Data
 * @fileoverview 完整的ChatGPT課程文稿資料
 * @author AI Formula Team
 * @version 1.0.0
 */

// 課程模組資料
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
        transcript: `大型語言模型（Large Language Model, LLM）是一種尖端的人工智能（AI）程式，經過海量文本資料的訓練，從而學會了理解、生成、總結、翻譯人類語言以及執行其他複雜的文本相關任務。從根本上說，LLM 是一個深度學習模型，它並非真正地進行人類意義上的「思考」，而是基於極其複雜的概率計算，來預測一個文本序列中接下來最可能出現的詞語。

「大型」這個詞彙主要體現在兩個維度：其一是訓練資料集的規模，這些資料集往往來源於互聯網的廣泛文本，例如包含數十億網頁的 Common Crawl 資料庫和擁有數千萬頁面的維基百科；其二是模型本身的複雜度，即其包含的「參數」數量，這些參數可視為模型在學習過程中調整的內部變量，數量可高達數千億甚至更多。

LLM 與傳統 AI 最大的區別在於其驚人的通用性和靈活性。傳統的機器學習模型通常是為單一、特定的任務而設計，例如情感分析或垃圾郵件過濾。然而，一個 LLM 卻能憑藉其廣博的「知識」，執行多種截然不同的任務，從回答常識問題、撰寫專業文案，到生成電腦代碼，都可由同一個基礎模型完成。

在人工智能的技術層級中，LLM 處於金字塔的頂端。它建立在機器學習的基礎之上，是深度學習的一個分支，並利用神經網路作為其計算架構。作為生成式 AI 的一個高度專業化的子集，LLM 專注於理解、預測和生成類人文本。`,
        transcriptEn: `A Large Language Model (LLM) is a cutting-edge artificial intelligence (AI) program that has been trained on massive text datasets, thus learning to understand, generate, summarise, translate human language, and execute other complex text-related tasks. Fundamentally, an LLM is a deep learning model that doesn't truly "think" in the human sense, but rather, based on extremely complex probability calculations, predicts the most likely word to appear next in a text sequence.

The term "large" manifests primarily in two dimensions: firstly, the scale of training datasets, which often originate from extensive internet texts, such as the Common Crawl database containing billions of web pages and Wikipedia with tens of millions of pages; secondly, the complexity of the model itself, namely the number of "parameters" it contains, which can be viewed as internal variables adjusted during the learning process, numbering in the hundreds of billions or even more.

The most significant difference between LLMs and traditional AI lies in their remarkable versatility and flexibility. Traditional machine learning models are typically designed for single, specific tasks, such as sentiment analysis or spam filtering. However, an LLM, leveraging its extensive "knowledge," can execute vastly different tasks, from answering common knowledge questions and writing professional copy to generating computer code, all accomplished by the same foundational model.

In the technical hierarchy of artificial intelligence, LLMs sit at the apex of the pyramid. They build upon machine learning foundations, represent a branch of deep learning, and utilise neural networks as their computational architecture. As a highly specialised subset of generative AI, LLMs focus on understanding, predicting, and generating human-like text.`,
        keyPoints: [
          "LLM is a deep learning model trained on massive text datasets, predicting next words through probability calculations",
          "'Large' reflects training data scale (like Common Crawl, Wikipedia) and model parameter count (reaching hundreds of billions)",
          "Neural networks: computational models mimicking brain neurons",
          "Compared to traditional AI, LLMs possess remarkable versatility, capable of executing diverse tasks"
        ],
        keyPointsEn: [
          "LLM is a deep learning model trained on massive text datasets, predicting next words through probability calculations",
          "'Large' reflects training data scale (like Common Crawl, Wikipedia) and model parameter count (reaching hundreds of billions)",
          "Neural networks: computational models mimicking brain neurons",
          "Compared to traditional AI, LLMs possess remarkable versatility, capable of executing diverse tasks"
        ],
        completed: false
      },
      {
        id: 2,
        title: "1.2 Transformer 架構：神經網路與自注意力機制 (Self-Attention)",
        titleEn: "1.2 Transformer Architecture: Neural Networks & Self-Attention Mechanism",
        duration: "18分鐘",
        durationEn: "18 minutes",
        type: "text" as const,
        description: "探索LLM的建構基礎神經網路以及革命性Transformer架構的核心創新自注意力機制。",
        descriptionEn: "Explore the foundational neural networks of LLM construction and the revolutionary core innovation of Transformer architecture's self-attention mechanism.",
        transcript: `LLM 的構建基石是人工神經網路，這是一種模仿生物大腦中神經元相互連接和傳遞信號方式的計算模型。它由多個層級的節點組成，包括輸入層、輸出層以及一層或多層位於兩者之間的「隱藏層」。

然而，LLM 能力實現質的飛躍，其真正的技術突破在於 2017 年被提出的 Transformer 架構。在 Transformer 出現之前，主流的序列處理模型（如循環神經網路 RNN）必須按順序逐字處理文本，這極大地限制了訓練速度和處理長文本的能力。Transformer 架構則引入了並行處理機制，可以同時分析整個輸入序列，從而能夠利用現代 GPU 的強大並行計算能力，大幅縮短訓練時間。

為了讓神經網路能夠處理語言，LLM 採用了「詞嵌入」（Word Embeddings）技術來表示單詞。傳統的機器學習方法可能使用孤立的數字來代表每個詞，無法表達詞語間的語義關係。詞嵌入則將每個單詞映射到一個高維的向量空間中。在這個空間裡，意思或用法相近的詞語（例如「國王」與「女王」，或「走路」與「奔跑」）在向量上的距離會更近。這種表示方式使得模型能夠捕捉到單詞之間細微的語義和句法關係，為理解複雜語言奠定了數學基礎。`,
        transcriptEn: `The foundational building blocks of LLMs are artificial neural networks, which are computational models that mimic the way neurons interconnect and transmit signals in biological brains. They consist of multiple layers of nodes, including input layers, output layers, and one or more "hidden layers" positioned between them.

However, the qualitative leap in LLM capabilities stems from the true technological breakthrough of the Transformer architecture, proposed in 2017. Before Transformers emerged, mainstream sequence processing models (such as Recurrent Neural Networks or RNNs) had to process text sequentially, word by word, which greatly limited training speed and the ability to handle long texts. The Transformer architecture introduced parallel processing mechanisms, enabling simultaneous analysis of entire input sequences, thus leveraging the powerful parallel computing capabilities of modern GPUs and dramatically reducing training time.

To enable neural networks to process language, LLMs employ "Word Embeddings" technology to represent words. Traditional machine learning methods might use isolated numbers to represent each word, unable to express semantic relationships between words. Word embeddings map each word to a high-dimensional vector space. In this space, words with similar meanings or usage (such as "king" and "queen," or "walk" and "run") are positioned closer together in vector distance. This representation method enables models to capture subtle semantic and syntactic relationships between words, establishing a mathematical foundation for understanding complex language.`,
        keyPoints: [
          "Neural networks: computational models mimicking brain neurons",
          "Transformer architecture: revolutionary 2017 technology supporting parallel processing",
          "Self-attention mechanism: core technology for simultaneous analysis of entire input sequences",
          "Word embeddings: mapping words to high-dimensional vector spaces, capturing semantic relationships"
        ],
        keyPointsEn: [
          "Neural networks: computational models mimicking brain neurons",
          "Transformer architecture: revolutionary 2017 technology supporting parallel processing",
          "Self-attention mechanism: core technology for simultaneous analysis of entire input sequences",
          "Word embeddings: mapping words to high-dimensional vector spaces, capturing semantic relationships"
        ],
        completed: false
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
    subtitle: "由零開始到進階應用，全面掌握 ChatGPT 核心技術與實戰技巧。",
    subtitleEn: "From zero to advanced, master ChatGPT's core techniques with hands‑on practice.",
    description: `想用 ChatGPT 做到又快又準，而唔係只係「整笑話、寫罐頭文案」？呢個免費課程由淺入深，教你點樣用結構化方法去同模型傾偈：由指令設計、系統提示、few‑shot 範例，到角色/語氣/格式控制，一步一步教你將「模糊要求」變成「可執行嘅清晰任務」。

你會學到：
- 建立可重用嘅提示範本（Email、會議記錄、報告摘要、研究大綱等）
- 用 Chain‑of‑Thought、Self‑Consistency 等方法提升推理同準確度
- 透過外掛/工具鏈接資料，做檔案分析、網頁擷取同自動化
- 為唔同場景（商業、教育、創作、程式）設計高命中率工作流程

完成之後，你唔只係識「問問題」，而係識「下指令」——用最短時間，攞到最貼近需求、可直接使用嘅輸出。`,
    descriptionEn: `Want ChatGPT to be fast and precise—not just "funny lines and canned copy"? This free course takes a structured, hands‑on approach: from instruction design, system prompts and few‑shot examples to controlling role/tone/format, you will learn to turn vague requests into clear, executable tasks.

You will learn to:
- Build reusable prompt templates (emails, meeting notes, report summaries, research outlines)
- Improve reasoning and accuracy with Chain‑of‑Thought and Self‑Consistency
- Connect external tools/plugins for file analysis, web extraction and automation
- Design high‑hit‑rate workflows for business, education, creativity and coding

By the end, you won't just "ask questions"—you will "issue instructions", achieving ready‑to‑use outputs in the shortest time.`,
    instructor: "AI Formula Team",
    instructorEn: "AI Formula Team",
    instructorTitle: "AI 應用專家與提示工程師",
    instructorTitleEn: "AI Application Specialists and Prompt Engineers",
    rating: 4.9,
    students: 300,
    duration: "15+ 小時",
    durationEn: "15+ Hours"
  },
  courseModules,
  faqData,
  isFree: true
};

export default chatGPTCourseData;