/**
 * 精通提示工程：從基礎到進階的完整實戰指南
 * @description 完整的提示工程課程資料
 * @author AI Formula Team
 * @version 1.0.0
 */

import { CourseData } from '@/components/course-template/types';

export const promptEngineeringCourseData: CourseData = {
  courseInfo: {
    badge: '免費完整課程',
    badgeEn: 'Free Complete Course',
    title: '精通提示工程：從基礎到進階的完整實戰指南',
    titleEn: 'Mastering Prompt Engineering: A Complete Practical Guide from Basics to Advanced',
    subtitle: '掌握與 AI 溝通的藝術：從零開始學習提示工程，釋放人工智能的全部潛能',
    subtitleEn: 'Master the Art of AI Communication: Learn prompt engineering from scratch and unlock the full potential of artificial intelligence',
    description: '這是一門全面的提示工程課程，將複雜的 AI 溝通技巧拆解成清晰的步驟。無論您是初學者還是希望系統化提升技能，本課程都將幫助您有效地與 AI 模型溝通，獲得精準、高質量的輸出結果。',
    descriptionEn: 'This comprehensive prompt engineering course breaks down complex AI communication techniques into clear steps. Whether you\'re a beginner or looking to systematically improve your skills, this course will help you communicate effectively with AI models and achieve precise, high-quality outputs.',
    instructor: 'AI Formula 團隊',
    instructorEn: 'AI Formula Team',
    instructorTitle: 'AI 應用專家',
    instructorTitleEn: 'AI Application Experts',
    language: 'zh-HK',
    level: 'beginner_to_advanced',
    levelEn: 'Beginner to Advanced',
    duration: '6+ 小時',
    durationEn: '6+ Hours',
    totalLessons: 16,
    totalHours: 6.5,
    students: 500,
    tags: ['提示工程', 'AI 溝通', '人工智能', '實戰指南'],
    tagsEn: ['Prompt Engineering', 'AI Communication', 'Artificial Intelligence', 'Practical Guide'],
    prerequisites: [
      '基本電腦操作能力',
      '對人工智能的基本了解',
      'ChatGPT 或類似 AI 工具的使用經驗（建議但非必需）'
    ],
    prerequisitesEn: [
      'Basic computer operation skills',
      'Basic understanding of artificial intelligence',
      'Experience with ChatGPT or similar AI tools (recommended but not required)'
    ],
    learningOutcomes: [
      '深入理解提示工程的核心概念和原理',
      '掌握多種實用的提示技巧和框架',
      '學會設計和優化複雜的提示指令',
      '能夠應用進階策略解決實際問題',
      '具備獨立開發 AI 應用的提示能力'
    ],
    learningOutcomesEn: [
      'Deep understanding of core concepts and principles of prompt engineering',
      'Master various practical prompting techniques and frameworks',
      'Learn to design and optimise complex prompt instructions',
      'Apply advanced strategies to solve real-world problems',
      'Develop independent prompt engineering capabilities for AI applications'
    ]
  },

  courseStats: {
    totalHours: 6.5,
    totalLessons: 16,
    totalQuizzes: 4,
    completionRate: 95
  },

  targetAudience: [
    '希望學習 AI 溝通技巧的初學者',
    '想要提升 AI 使用效率的專業人士',
    '對提示工程感興趣的開發者',
    '需要優化 AI 工作流程的企業用戶'
  ],
  targetAudienceEn: [
    'Beginners who wish to learn AI communication skills',
    'Professionals seeking to enhance AI usage efficiency',
    'Developers interested in prompt engineering',
    'Enterprise users needing to optimise AI workflows'
  ],

  courseModules: [
    {
      id: 1,
      title: '第一部分：提示工程基礎',
      titleEn: 'Part 1: Foundations of Prompt Engineering',
      description: '從零開始理解提示工程的核心概念、發展歷史和基本構成元素，為後續深入學習打下堅實基礎。',
      descriptionEn: 'Starting from scratch to understand the core concepts, development history, and basic components of prompt engineering, laying a solid foundation for further in-depth learning.',
      duration: '80 分鐘',
      durationEn: '80 minutes',
      lessons: [
        {
          id: 1,
          title: '1.1 什麼是提示工程？',
          titleEn: '1.1 What is Prompt Engineering?',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive' as const,
          description: '深入了解提示工程的定義、核心目標和基本概念',
          descriptionEn: 'Deep dive into the definition, core objectives, and basic concepts of prompt engineering',
          image: '/images/courses/prompt-engineering/unit-images/prompt-basics.png',
          imageAlt: '提示工程基礎概念圖示',
          imageAltEn: 'Prompt engineering basic concepts illustration',
          transcript: `提示工程是一門設計和優化「提示（Prompt）」的技術。所謂「提示」，就係您給予大型語言模型（如 ChatGPT）嘅指令或問題。

呢個技術唔只係提問咁簡單，更係一種有策略地建構指令嘅過程。其核心目標係引導 AI 產生最符合期望、最精準嘅輸出。您可以將其視為學習如何與一個極其聰明但需要清晰指引嘅助手進行高效溝通。

提示工程嘅重要性：
1. 精準控制：通過精心設計嘅提示，我哋可以更準確地控制 AI 嘅輸出
2. 效率提升：好嘅提示可以減少重複修改嘅次數
3. 質量保證：結構化嘅提示有助於獲得更高質量嘅回答

現代 AI 模型具有強大嘅語言理解能力，但佢哋同時需要清晰嘅指引先能發揮最佳表現。呢就係提示工程師嘅價值所在。`,
          transcriptEn: `Prompt engineering is a technique for designing and optimising "prompts." A "prompt" is an instruction or question you give to large language models (like ChatGPT).

This technique is not just about asking questions; it's a strategic process of constructing instructions. Its core objective is to guide AI to produce the most expected and precise outputs. You can think of it as learning how to communicate efficiently with an extremely intelligent assistant that needs clear guidance.

The importance of prompt engineering:
1. Precise control: Through carefully designed prompts, we can more accurately control AI outputs
2. Efficiency improvement: Good prompts can reduce the number of repeated modifications
3. Quality assurance: Structured prompts help obtain higher-quality responses

Modern AI models have powerful language understanding capabilities, but they simultaneously need clear guidance to perform at their best. This is where the value of prompt engineers lies.`,
          keyPoints: [
            '提示工程係設計和優化 AI 指令嘅技術',
            '核心目標係獲得精準、高質量嘅 AI 輸出',
            '需要策略性思考和清晰嘅溝通技巧',
            'AI 模型需要明確指引先能發揮最佳表現'
          ],
          keyPointsEn: [
            'Prompt engineering is the technique of designing and optimising AI instructions',
            'Core objective is to achieve precise, high-quality AI outputs',
            'Requires strategic thinking and clear communication skills',
            'AI models need explicit guidance to perform at their best'
          ],
          completed: false
        },
        {
          id: 2,
          title: '1.2 為何提示工程至關重要？',
          titleEn: '1.2 Why is Prompt Engineering Crucial?',
          duration: '15 分鐘',
          durationEn: '15 minutes',
          type: 'interactive' as const,
          description: '探討提示工程在提升精準度、釋放潛能和保障安全性方面的關鍵作用',
          descriptionEn: 'Explore the critical role of prompt engineering in improving accuracy, unleashing potential, and ensuring safety',
          image: '/images/courses/prompt-engineering/unit-images/importance.png',
          imageAlt: '提示工程重要性示意圖',
          imageAltEn: 'Importance of prompt engineering diagram',
          transcript: `提示工程嘅重要性可以從三個核心方面嚟理解：

**1. 提升精準度**
AI 冇人類嘅常識，佢會嚴格按照字面意思理解。一個清晰嘅提示能避免誤解，減少 AI 產生錯誤資訊（即「幻覺」）嘅機率。

例如：
- 模糊提示：「幫我寫個報告」
- 清晰提示：「幫我寫一份關於 2024 年電商趨勢嘅 5 頁市場分析報告，包括數據圖表和具體建議」

**2. 釋放全部潛能**
一個未經引導嘅 AI 就像一位知識淵博但目標渙散嘅專家。提示工程師嘅角色係為其設定明確嘅任務，從而將 AI 嘅「潛在能力」轉化為「實際效能」。

**3. 保障安全性**
通過喺提示中設定規則和約束，我哋可以主動引導模型規避生成有害或帶有偏見嘅內容。

實際應用場景：
- 客戶服務：確保 AI 回答專業且有幫助
- 內容創作：控制語調和風格
- 數據分析：獲得準確嘅洞察和建議`,
          transcriptEn: `The importance of prompt engineering can be understood from three core aspects:

**1. Improving Accuracy**
AI lacks human common sense and interprets instructions literally. A clear prompt can avoid misunderstandings and reduce the probability of AI generating false information (i.e., "hallucinations").

For example:
- Vague prompt: "Help me write a report"
- Clear prompt: "Help me write a 5-page market analysis report on 2024 e-commerce trends, including data charts and specific recommendations"

**2. Unleashing Full Potential**
An unguided AI is like a knowledgeable but unfocused expert. The role of a prompt engineer is to set clear tasks, thereby transforming AI's "potential capabilities" into "actual performance."

**3. Ensuring Safety**
By setting rules and constraints in prompts, we can proactively guide models to avoid generating harmful or biased content.

Practical application scenarios:
- Customer service: Ensuring AI responses are professional and helpful
- Content creation: Controlling tone and style
- Data analysis: Obtaining accurate insights and recommendations`,
          keyPoints: [
            'AI 需要清晰指引避免產生錯誤資訊',
            '適當嘅提示能將 AI 潛能轉化為實際效能',
            '提示工程有助於確保 AI 輸出嘅安全性',
            '廣泛應用於客服、創作、分析等多個領域'
          ],
          keyPointsEn: [
            'AI needs clear guidance to avoid generating false information',
            'Appropriate prompts can transform AI potential into actual performance',
            'Prompt engineering helps ensure the safety of AI outputs',
            'Widely applied in customer service, creation, analysis, and other fields'
          ],
          completed: false
        },
        {
          id: 3,
          title: '1.3 提示工程的發展簡史',
          titleEn: '1.3 Brief History of Prompt Engineering',
          duration: '15 分鐘',
          durationEn: '15 minutes',
          type: 'interactive' as const,
          description: '回顧從 Transformer 到 GPT-3 的發展歷程，了解上下文學習的突破',
          descriptionEn: 'Review the development from Transformer to GPT-3, understanding the breakthrough of in-context learning',
          image: '/images/courses/prompt-engineering/unit-images/history.png',
          imageAlt: '提示工程發展歷史時間軸',
          imageAltEn: 'Timeline of prompt engineering development history',
          transcript: `AI 嘅發展經歷咗從簡單到複雜嘅過程，而提示工程嘅興起有其特定嘅歷史背景：

**關鍵里程碑：**

**2017年 - Transformer 架構誕生**
Google 發表咗「Attention Is All You Need」論文，提出咗 Transformer 架構。呢個突破為後續嘅大型語言模型奠定咗基礎。

**2018-2019年 - GPT 系列起步**
OpenAI 發布咗 GPT-1 和 GPT-2，展示咗生成式預訓練模型嘅潛力。

**2020年 - GPT-3 嘅革命性突破**
GPT-3 嘅發布係提示工程正式確立嘅轉折點。佢展現咗驚人嘅「上下文學習」（In-context Learning）能力。

**上下文學習嘅重要性：**
呢個能力意味住唔再需要對模型本身進行昂貴嘅重新訓練，僅通過喺提示中提供少量範例，就能讓模型快速學會新任務。

**2021-2024年 - 技術成熟期**
隨住 ChatGPT、GPT-4 等模型嘅普及，提示工程從研究領域走向實際應用，成為 AI 應用開發嘅核心技能。

**意義：**
呢個發展過程顯示，提示工程唔只係一個技術工具，更係人機協作嘅新模式。`,
          transcriptEn: `AI development has gone through a process from simple to complex, and the rise of prompt engineering has its specific historical background:

**Key Milestones:**

**2017 - Birth of Transformer Architecture**
Google published the "Attention Is All You Need" paper, proposing the Transformer architecture. This breakthrough laid the foundation for subsequent large language models.

**2018-2019 - GPT Series Launch**
OpenAI released GPT-1 and GPT-2, demonstrating the potential of generative pre-trained models.

**2020 - Revolutionary Breakthrough of GPT-3**
The release of GPT-3 was the turning point for the formal establishment of prompt engineering. It demonstrated amazing "In-context Learning" capabilities.

**Importance of In-context Learning:**
This capability means that expensive retraining of the model itself is no longer needed; models can quickly learn new tasks just by providing a few examples in prompts.

**2021-2024 - Technology Maturation Period**
With the popularisation of models like ChatGPT and GPT-4, prompt engineering moved from research fields to practical applications, becoming a core skill in AI application development.

**Significance:**
This development process shows that prompt engineering is not just a technical tool, but a new model of human-machine collaboration.`,
          keyPoints: [
            'Transformer 架構係現代 AI 嘅基礎',
            'GPT-3 確立咗上下文學習嘅重要性',
            '提示工程從研究走向實際應用',
            '代表住人機協作嘅新模式'
          ],
          keyPointsEn: [
            'Transformer architecture is the foundation of modern AI',
            'GPT-3 established the importance of in-context learning',
            'Prompt engineering moved from research to practical applications',
            'Represents a new model of human-machine collaboration'
          ],
          completed: false
        },
        {
          id: 4,
          title: '1.4 提示的基本構成元素',
          titleEn: '1.4 Basic Components of Prompts',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive' as const,
          description: '學習構建有效提示的五大核心元素：指令、情境、角色、範例和格式',
          descriptionEn: 'Learn the five core elements for building effective prompts: instructions, context, persona, examples, and format',
          image: '/images/courses/prompt-engineering/unit-images/components.png',
          imageAlt: '提示構成元素示意圖',
          imageAltEn: 'Prompt component elements diagram',
          transcript: `一個結構良好嘅提示通常包含以下幾個核心元素：

**1. 指令 (Instruction)**
核心任務，明確告知模型需要做咩。例如：「總結」、「翻譯」、「生成代碼」。

範例：
- 基本指令：「翻譯呢段文字」
- 詳細指令：「將以下中文文字翻譯成地道嘅英式英文，保持原意嘅同時注意語境和文化差異」

**2. 情境 (Context)**
提供完成任務所需嘅背景資訊或參考文本。呢個能顯著減少 AI 憑空捏造資訊嘅現象。

範例：「基於以下公司財務報表嘅數據...」

**3. 角色 (Persona)**
為 AI 指定一個具體嘅身份。呢個能極大地影響輸出嘅語氣、風格和專業度。

範例：「你係一位資深嘅財經記者...」「你係一位專業嘅程式設計師...」

**4. 範例 (Examples)**
提供一或多個具體嘅輸入/輸出範例，向模型展示期望嘅格式或回答方式。

**5. 格式 (Format)**
明確指定期望嘅輸出格式。例如：「使用項目符號列表」、「生成 JSON 對象」。

**實際應用範例：**
角色：你係一位專業嘅市場分析師
情境：基於以下銷售數據
指令：分析季度業績趨勢並提出改善建議
格式：用項目符號列表呈現，包含數據和建議
範例：[提供一個類似分析嘅例子]`,
          transcriptEn: `A well-structured prompt usually contains the following core elements:

**1. Instruction**
The core task, clearly telling the model what needs to be done. For example: "summarise," "translate," "generate code."

Examples:
- Basic instruction: "Translate this text"
- Detailed instruction: "Translate the following Chinese text into idiomatic British English, maintaining the original meaning whilst paying attention to context and cultural differences"

**2. Context**
Providing background information or reference text needed to complete the task. This can significantly reduce AI's tendency to fabricate information.

Example: "Based on the following company financial statement data..."

**3. Persona**
Assigning a specific identity to the AI. This can greatly influence the tone, style, and professionalism of the output.

Examples: "You are an experienced financial journalist..." "You are a professional programmer..."

**4. Examples**
Providing one or more specific input/output examples to show the model the expected format or response style.

**5. Format**
Clearly specifying the expected output format. For example: "use bullet point lists," "generate JSON objects."

**Practical Application Example:**
Persona: You are a professional market analyst
Context: Based on the following sales data
Instruction: Analyse quarterly performance trends and propose improvement suggestions
Format: Present using bullet points, including data and recommendations
Examples: [Provide a similar analysis example]`,
          keyPoints: [
            '指令係提示嘅核心，需要明確具體',
            '情境提供背景資訊，減少 AI 嘅錯誤輸出',
            '角色設定影響輸出嘅專業度和風格',
            '範例和格式規範確保輸出符合期望'
          ],
          keyPointsEn: [
            'Instructions are the core of prompts and need to be clear and specific',
            'Context provides background information, reducing AI errors',
            'Persona setting affects the professionalism and style of output',
            'Examples and format specifications ensure outputs meet expectations'
          ],
          completed: false
        },
        {
          id: 5,
          title: '1.5 提示工程 vs. 模型微調',
          titleEn: '1.5 Prompt Engineering vs. Model Fine-tuning',
          duration: '10 分鐘',
          durationEn: '10 minutes',
          type: 'interactive' as const,
          description: '比較提示工程和模型微調的優缺點，了解何時選擇哪種方法',
          descriptionEn: 'Compare the advantages and disadvantages of prompt engineering and model fine-tuning, understanding when to choose which method',
          image: '/images/courses/prompt-engineering/unit-images/comparison.png',
          imageAlt: '提示工程與模型微調比較圖',
          imageAltEn: 'Comparison chart between prompt engineering and model fine-tuning',
          transcript: `喺讓 AI 適應特定任務時，有兩種主要策略：

**提示工程 (Prompt Engineering)**
通過優化輸入（提示）嚟引導模型，唔改變模型本身。

優點：
- 速度快：即時生效，無需等待訓練
- 成本低：唔需要額外嘅計算資源和數據
- 靈活性高：可以隨時調整和優化
- 易於實驗：可以快速測試不同嘅策略

缺點：
- 受限於模型本身嘅能力
- 對於極度專業嘅任務可能效果有限

**模型微調 (Fine-tuning)**
使用特定數據集重新訓練模型嘅一部分，以調整其內部參數。

優點：
- 深度定制：可以讓模型深度學習特定領域知識
- 效果更好：對於專業任務通常有更佳表現
- 長期穩定：一次訓練，持續使用

缺點：
- 成本高：需要大量計算資源和時間
- 需要數據：要有足夠嘅高質量訓練數據
- 靈活性低：修改需要重新訓練
- 技術門檻高：需要專業嘅機器學習知識

**選擇建議：**
- 日常應用：提示工程
- 原型開發：提示工程
- 專業領域深度應用：模型微調
- 大規模商業部署：考慮混合方案

**結論：**
對於絕大多數日常和商業應用，提示工程係更快捷、更具成本效益嘅選擇。`,
          transcriptEn: `When adapting AI to specific tasks, there are two main strategies:

**Prompt Engineering**
Optimising inputs (prompts) to guide the model without changing the model itself.

Advantages:
- Fast: Takes effect immediately, no training wait time
- Low cost: Doesn't require additional computational resources and data
- High flexibility: Can be adjusted and optimised at any time
- Easy experimentation: Can quickly test different strategies

Disadvantages:
- Limited by the model's inherent capabilities
- May have limited effectiveness for extremely specialised tasks

**Model Fine-tuning**
Retraining part of the model using specific datasets to adjust its internal parameters.

Advantages:
- Deep customisation: Can make models deeply learn domain-specific knowledge
- Better performance: Usually performs better on professional tasks
- Long-term stability: Train once, use continuously

Disadvantages:
- High cost: Requires significant computational resources and time
- Data requirements: Need sufficient high-quality training data
- Low flexibility: Modifications require retraining
- High technical threshold: Requires professional machine learning knowledge

**Selection Recommendations:**
- Daily applications: Prompt engineering
- Prototype development: Prompt engineering
- Professional domain deep applications: Model fine-tuning
- Large-scale commercial deployment: Consider hybrid solutions

**Conclusion:**
For most daily and commercial applications, prompt engineering is a faster and more cost-effective choice.`,
          keyPoints: [
            '提示工程速度快、成本低、靈活性高',
            '模型微調效果好但成本高、技術門檻高',
            '日常應用建議選擇提示工程',
            '專業領域深度應用可考慮模型微調'
          ],
          keyPointsEn: [
            'Prompt engineering is fast, low-cost, and highly flexible',
            'Model fine-tuning is effective but costly with high technical barriers',
            'Daily applications are recommended to choose prompt engineering',
            'Professional domain deep applications may consider model fine-tuning'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第一部分測驗：提示工程基礎',
        titleEn: 'Part 1 Quiz: Prompt Engineering Foundations',
        description: '測試你對提示工程基礎概念的理解',
        descriptionEn: 'Test your understanding of prompt engineering foundation concepts',
        timeLimit: 15,
        passingScore: 80,
        questions: [
          {
            id: 1,
            question: '提示工程 (Prompt Engineering) 的主要目標是什麼？',
            questionEn: 'What is the main goal of Prompt Engineering?',
            type: 'single' as const,
            options: [
              '讓 AI 的運算速度變得更快',
              '改變 AI 模型的核心程式碼',
              '引導 AI 產生最精準、最符合期望的輸出',
              '增加 AI 模型的訓練數據量'
            ],
            optionsEn: [
              'Make AI computation faster',
              'Change the core code of AI models',
              'Guide AI to produce the most precise and expected outputs',
              'Increase the training data of AI models'
            ],
            correctAnswer: 2,
            explanation: '提示工程的核心目標是通過優化輸入指令，引導 AI 產生最符合期望、最精準的輸出結果。',
            explanationEn: 'The core goal of prompt engineering is to guide AI to produce the most expected and precise outputs by optimising input instructions.'
          },
          {
            id: 2,
            question: '在提示的五個基本構成元素中，哪一項是用於為 AI 指定一個具體身份，以影響其語氣和風格？',
            questionEn: 'Among the five basic elements of prompts, which one is used to assign a specific identity to AI to influence its tone and style?',
            type: 'single' as const,
            options: [
              '指令 (Instruction)',
              '格式 (Format)',
              '角色 (Persona)',
              '情境 (Context)'
            ],
            optionsEn: [
              'Instruction',
              'Format',
              'Persona',
              'Context'
            ],
            correctAnswer: 2,
            explanation: '角色 (Persona) 是為 AI 指定具體身份的元素，能極大地影響輸出的語氣、風格和專業度。',
            explanationEn: 'Persona is the element that assigns a specific identity to AI, which can greatly influence the tone, style, and professionalism of the output.'
          },
          {
            id: 3,
            question: '當 AI 產生了看似合理但實際上是錯誤或無中生有的資訊時，這種現象被稱為什麼？',
            questionEn: 'When AI generates information that seems reasonable but is actually false or fabricated, what is this phenomenon called?',
            type: 'single' as const,
            options: [
              '當機 (Crash)',
              '幻覺 (Hallucination)',
              '延遲 (Lag)',
              '偏見 (Bias)'
            ],
            optionsEn: [
              'Crash',
              'Hallucination',
              'Lag',
              'Bias'
            ],
            correctAnswer: 1,
            explanation: '幻覺 (Hallucination) 是指 AI 產生看似合理但實際錯誤或虛構的資訊，這是大型語言模型的一個重要挑戰。',
            explanationEn: 'Hallucination refers to AI generating information that seems reasonable but is actually false or fabricated, which is an important challenge for large language models.'
          },
          {
            id: 4,
            question: '關於「提示工程」與「模型微調」的比較，以下哪項描述是正確的？',
            questionEn: 'Regarding the comparison between "prompt engineering" and "model fine-tuning", which description is correct?',
            type: 'single' as const,
            options: [
              '提示工程成本高昂，而模型微調快速又便宜',
              '提示工程就像教助理新任務，而模型微調就像送助理去深度培訓',
              '兩者沒有任何區別，只是叫法不同',
              '只有模型微調才能讓 AI 回答問題'
            ],
            optionsEn: [
              'Prompt engineering is expensive while model fine-tuning is fast and cheap',
              'Prompt engineering is like teaching an assistant new tasks, while model fine-tuning is like sending the assistant for intensive training',
              'There is no difference between them, just different names',
              'Only model fine-tuning can make AI answer questions'
            ],
            correctAnswer: 1,
            explanation: '提示工程像教助理新任務（快速、低成本、靈活），而模型微調像送助理深度培訓（耗時、昂貴、需要大量數據）。',
            explanationEn: 'Prompt engineering is like teaching an assistant new tasks (fast, low-cost, flexible), while model fine-tuning is like sending the assistant for intensive training (time-consuming, expensive, requires lots of data).'
          },
          {
            id: 5,
            question: '現代提示工程之所以變得如此重要，與大型語言模型發展出的哪一項關鍵能力密切相關？',
            questionEn: 'Why has modern prompt engineering become so important? It is closely related to which key capability developed by large language models?',
            type: 'single' as const,
            options: [
              '上下文學習 (In-context Learning)',
              '圖像辨識 (Image Recognition)',
              '離線運作 (Offline Operation)',
              '多國語言翻譯'
            ],
            optionsEn: [
              'In-context Learning',
              'Image Recognition',
              'Offline Operation',
              'Multi-language Translation'
            ],
            correctAnswer: 0,
            explanation: '上下文學習 (In-context Learning) 使得模型能夠僅通過提示中的範例學會新任務，無需重新訓練，這使提示工程成為核心技術。',
            explanationEn: 'In-context Learning enables models to learn new tasks just through examples in prompts without retraining, making prompt engineering a core technology.'
          }
        ]
      }
    },
    
    {
      id: 3,
      title: '第三部分：進階提示策略',
      titleEn: 'Part 3: Advanced Prompting Strategies',
      description: '學習高級提示策略，包括思維鏈、自我一致性、思維樹和ReAct框架，釋放AI的推理潛力。',
      descriptionEn: 'Learn advanced prompting strategies including Chain-of-Thought, Self-Consistency, Tree-of-Thought, and ReAct framework to unlock AI\'s reasoning potential.',
      duration: '120 分鐘',
      durationEn: '120 minutes',
      lessons: [
        {
          id: 9,
          title: '3.1 思維鏈 (Chain-of-Thought, CoT)',
          titleEn: '3.1 Chain-of-Thought (CoT)',
          duration: '30 分鐘',
          durationEn: '30 minutes',
          type: 'interactive' as const,
          description: '學習革命性的思維鏈技術，引導模型分步思考',
          descriptionEn: 'Learn the revolutionary Chain-of-Thought technique to guide models in step-by-step thinking',
          image: '/images/courses/prompt-engineering/unit-images/cot.png',
          imageAlt: '思維鏈示意圖',
          imageAltEn: 'Chain-of-Thought illustration',
          transcript: `思維鏈 (Chain-of-Thought, CoT) 係一種革命性嘅技術，通過在提示中加入「讓我們一步一步地思考」之類嘅指令，來引導模型在回答前先生成一個邏輯連貫嘅推理過程。

**核心概念：**
思維鏈嘅核心思想係模仿人類解決問題嘅方式 - 將複雜問題分解成一系列較簡單嘅步驟，逐步推理得出答案。

**實施方法：**
1. 在提示末尾加入引導語句
2. 要求模型展示推理過程
3. 鼓勵逐步分析

**範例：**
問題：一家商店有240個蘋果，賣出了3/5，又進了80個，現在有多少個？

標準提示：「計算最終的蘋果數量。」

CoT提示：「請一步一步計算最終的蘋果數量，並展示每個步驟的推理過程。」

**優勢：**
- 大幅提升數學推理準確率
- 使推理過程透明化
- 幫助發現錯誤邏輯
- 提高複雜問題解決能力`,
          transcriptEn: `Chain-of-Thought (CoT) is a revolutionary technique that guides models to generate a logically coherent reasoning process before answering by adding instructions like "let's think step by step" in prompts.

**Core Concept:**
The core idea of CoT is to mimic how humans solve problems - breaking down complex problems into a series of simpler steps and reasoning through them progressively to reach an answer.

**Implementation Methods:**
1. Add guiding phrases at the end of prompts
2. Require models to show reasoning process
3. Encourage step-by-step analysis

**Example:**
Question: A shop has 240 apples, sells 3/5 of them, then receives 80 more. How many apples are there now?

Standard prompt: "Calculate the final number of apples."

CoT prompt: "Please calculate the final number of apples step by step and show the reasoning process for each step."

**Advantages:**
- Dramatically improves mathematical reasoning accuracy
- Makes reasoning process transparent
- Helps identify logical errors
- Enhances complex problem-solving capabilities`,
          keyPoints: [
            '思維鏈技術模仿人類逐步推理過程',
            '通過「一步一步思考」引導模型展示推理',
            '大幅提升數學和邏輯推理準確率',
            '使AI思考過程變得透明可解釋'
          ],
          keyPointsEn: [
            'CoT technique mimics human step-by-step reasoning process',
            'Guides models to show reasoning through "think step by step"',
            'Dramatically improves mathematical and logical reasoning accuracy',
            'Makes AI thinking process transparent and explainable'
          ],
          completed: false
        },
        {
          id: 10,
          title: '3.2 自我一致性 (Self-Consistency)',
          titleEn: '3.2 Self-Consistency',
          duration: '25 分鐘',
          durationEn: '25 minutes',
          type: 'interactive' as const,
          description: '學習自我一致性技術，從多重推理路徑中找到最可靠的答案',
          descriptionEn: 'Learn self-consistency technique to find the most reliable answer from multiple reasoning paths',
          image: '/images/courses/prompt-engineering/unit-images/self-consistency.png',
          imageAlt: '自我一致性示意圖',
          imageAltEn: 'Self-Consistency illustration',
          transcript: `自我一致性 (Self-Consistency) 係在思維鏈 (CoT) 基礎上嘅增強技術。它讓模型對同一個問題生成多條不同嘅推理路徑，然後通過「多數投票」嘅方式，選出最可靠嘅答案。

**工作原理：**
1. 對同一問題進行多次CoT推理
2. 生成多個不同嘅推理路徑
3. 收集所有推理嘅最終答案
4. 選擇出現次數最多嘅答案

**實施步驟：**
1. 設計一個CoT提示
2. 運行多次（通常5-10次）
3. 收集所有答案
4. 統計答案頻率
5. 選擇最常見嘅答案

**範例應用：**
數學競賽題：一個複雜嘅幾何問題

第一次推理：答案A（通過三角函數）
第二次推理：答案A（通過相似三角形）
第三次推理：答案B（計算錯誤）
第四次推理：答案A（通過座標幾何）
第五次推理：答案A（通過向量方法）

結果：答案A出現4次，答案B出現1次
最終選擇：答案A

**優勢：**
- 顯著提高複雜推理任務嘅準確率
- 減少偶發性錯誤
- 提供答案可信度指標
- 特別適用於數學和邏輯問題`,
          transcriptEn: `Self-Consistency is an enhancement technique built on Chain-of-Thought (CoT). It has the model generate multiple different reasoning paths for the same problem, then selects the most reliable answer through "majority voting."

**Working Principle:**
1. Perform multiple CoT reasoning for the same problem
2. Generate multiple different reasoning paths
3. Collect all final answers from reasoning
4. Select the answer that appears most frequently

**Implementation Steps:**
1. Design a CoT prompt
2. Run multiple times (usually 5-10 times)
3. Collect all answers
4. Count answer frequency
5. Choose the most common answer

**Example Application:**
Math competition problem: A complex geometry question

First reasoning: Answer A (via trigonometry)
Second reasoning: Answer A (via similar triangles)
Third reasoning: Answer B (calculation error)
Fourth reasoning: Answer A (via coordinate geometry)
Fifth reasoning: Answer A (via vector method)

Result: Answer A appears 4 times, Answer B appears 1 time
Final choice: Answer A

**Advantages:**
- Significantly improves accuracy on complex reasoning tasks
- Reduces random errors
- Provides answer confidence metrics
- Particularly suitable for mathematical and logical problems`,
          keyPoints: [
            '在CoT基礎上使用多次推理和投票機制',
            '通過多數投票選擇最可靠嘅答案',
            '顯著提高複雜推理任務準確率',
            '特別適用於數學和邏輯問題'
          ],
          keyPointsEn: [
            'Uses multiple reasoning and voting mechanism based on CoT',
            'Selects most reliable answer through majority voting',
            'Significantly improves accuracy on complex reasoning tasks',
            'Particularly suitable for mathematical and logical problems'
          ],
          completed: false
        },
        {
          id: 11,
          title: '3.3 思維樹 (Tree-of-Thought, ToT)',
          titleEn: '3.3 Tree-of-Thought (ToT)',
          duration: '35 分鐘',
          durationEn: '35 minutes',
          type: 'interactive' as const,
          description: '掌握思維樹技術，探索多種方案並進行評估和回溯',
          descriptionEn: 'Master Tree-of-Thought technique to explore multiple solutions with evaluation and backtracking',
          image: '/images/courses/prompt-engineering/unit-images/tot.png',
          imageAlt: '思維樹示意圖',
          imageAltEn: 'Tree-of-Thought illustration',
          transcript: `思維樹 (Tree-of-Thought, ToT) 允許模型在推理嘅每一步探索多個可能嘅分支，並對呢啲分支進行評估，甚至在發現某個分支係死胡同時進行「回溯」。呢個技術特別適用於需要規劃或權衡利弊嘅複雜任務。

**核心概念：**
ToT將問題解決過程視為一棵樹，每個節點代表一個中間狀態，每個分支代表一個可能嘅行動或思路。

**關鍵特性：**
1. **多分支探索**：在每一步考慮多種可能性
2. **狀態評估**：評估每個中間狀態嘅價值
3. **路徑選擇**：選擇最有希望嘅路徑繼續
4. **回溯機制**：遇到死胡同時返回上一步

**實施方法：**
1. 定義問題和目標狀態
2. 在每一步生成多個候選方案
3. 評估每個候選方案嘅潛力
4. 選擇最佳方案繼續
5. 如果遇到死胡同，回溯到上一步

**應用場景：**
- 策略規劃（如下棋）
- 創意寫作（情節發展）
- 問題解決（多種解法比較）
- 決策制定（權衡多個選項）

**範例：規劃一個週末旅行**
根節點：週末有兩天時間
分支1：城市文化遊 → 評估：有趣但費用高
分支2：自然風景遊 → 評估：放鬆但交通不便
分支3：附近小鎮遊 → 評估：方便且經濟

選擇分支3，繼續規劃：
子分支1：古鎮歷史遊
子分支2：溫泉度假
子分支3：農家體驗

**優勢：**
- 系統化探索解決方案空間
- 避免陷入單一思路
- 提供多種備選方案
- 適合複雜決策問題`,
          transcriptEn: `Tree-of-Thought (ToT) allows models to explore multiple possible branches at each step of reasoning, evaluate these branches, and even "backtrack" when discovering a branch is a dead end. This technique is particularly suitable for complex tasks requiring planning or weighing pros and cons.

**Core Concept:**
ToT views the problem-solving process as a tree, where each node represents an intermediate state and each branch represents a possible action or line of thinking.

**Key Features:**
1. **Multi-branch exploration**: Consider multiple possibilities at each step
2. **State evaluation**: Assess the value of each intermediate state
3. **Path selection**: Choose the most promising path to continue
4. **Backtracking mechanism**: Return to previous step when encountering dead ends

**Implementation Method:**
1. Define problem and target state
2. Generate multiple candidate solutions at each step
3. Evaluate the potential of each candidate
4. Select the best solution to continue
5. If encountering a dead end, backtrack to previous step

**Application Scenarios:**
- Strategic planning (like chess)
- Creative writing (plot development)
- Problem solving (comparing multiple solutions)
- Decision making (weighing multiple options)

**Example: Planning a weekend trip**
Root node: Two days available for weekend
Branch 1: Urban cultural tour → Assessment: Interesting but expensive
Branch 2: Natural scenery tour → Assessment: Relaxing but inconvenient transport
Branch 3: Nearby town tour → Assessment: Convenient and economical

Choose branch 3, continue planning:
Sub-branch 1: Historic town tour
Sub-branch 2: Hot spring resort
Sub-branch 3: Farm experience

**Advantages:**
- Systematically explores solution space
- Avoids getting stuck in single line of thinking
- Provides multiple alternative solutions
- Suitable for complex decision problems`,
          keyPoints: [
            'ToT在每一步探索多個可能分支',
            '包含狀態評估和回溯機制',
            '特別適用於規劃和決策任務',
            '避免陷入單一思路嘅限制'
          ],
          keyPointsEn: [
            'ToT explores multiple possible branches at each step',
            'Includes state evaluation and backtracking mechanisms',
            'Particularly suitable for planning and decision tasks',
            'Avoids limitations of single line of thinking'
          ],
          completed: false
        },
        {
          id: 12,
          title: '3.4 ReAct 框架 (Reasoning and Acting)',
          titleEn: '3.4 ReAct Framework (Reasoning and Acting)',
          duration: '30 分鐘',
          durationEn: '30 minutes',
          type: 'interactive' as const,
          description: '學習ReAct框架，結合推理與行動，讓AI與外部工具互動',
          descriptionEn: 'Learn ReAct framework to combine reasoning and acting, enabling AI to interact with external tools',
          image: '/images/courses/prompt-engineering/unit-images/react.png',
          imageAlt: 'ReAct框架示意圖',
          imageAltEn: 'ReAct Framework illustration',
          transcript: `ReAct 框架 (Reasoning and Acting) 賦予模型與外部世界交互嘅能力。它讓模型遵循一個「思考-行動-觀察」嘅循環，可以調用外部工具（如搜索引擎、計算器）來獲取實時資訊或執行精確計算，極大地擴展咗其能力邊界。

**框架結構：**
ReAct = Reasoning（推理）+ Acting（行動）

**工作循環：**
1. **Thought（思考）**：分析當前情況，制定行動計劃
2. **Action（行動）**：執行具體操作（調用工具、搜索資訊等）
3. **Observation（觀察）**：處理行動結果，獲取新資訊
4. **重複循環**：基於新資訊繼續思考和行動

**可調用嘅工具：**
- 搜索引擎：獲取最新資訊
- 計算器：進行精確數學計算
- 資料庫：查詢特定數據
- API接口：調用外部服務
- 文件系統：讀取和處理文件

**實施範例：**
任務：「查找今年諾貝爾物理學獎得主嘅主要研究領域」

Thought: 我需要搜索2023年諾貝爾物理學獎得主嘅資訊
Action: Search["2023年諾貝爾物理學獎得主"]
Observation: 找到三位得主：Pierre Agostini, Ferenc Krausz, Anne L'Huillier

Thought: 現在我需要了解佢哋嘅具體研究領域
Action: Search["Pierre Agostini Ferenc Krausz Anne L'Huillier 研究領域"]
Observation: 佢哋嘅研究集中在超快激光和阿秒科學領域

Thought: 我已經獲得咗所需資訊，可以總結答案
Final Answer: 2023年諾貝爾物理學獎得主嘅主要研究領域係超快激光和阿秒科學...

**優勢：**
- 突破純文本生成嘅限制
- 獲取實時和準確嘅資訊
- 執行複雜嘅多步驟任務
- 提供可驗證嘅資訊來源`,
          transcriptEn: `The ReAct framework (Reasoning and Acting) gives models the ability to interact with the external world. It has models follow a "think-act-observe" cycle, allowing them to call external tools (like search engines, calculators) to obtain real-time information or perform precise calculations, greatly expanding their capability boundaries.

**Framework Structure:**
ReAct = Reasoning + Acting

**Working Cycle:**
1. **Thought**: Analyse current situation, formulate action plan
2. **Action**: Execute specific operations (call tools, search information, etc.)
3. **Observation**: Process action results, obtain new information
4. **Repeat cycle**: Continue thinking and acting based on new information

**Available Tools:**
- Search engines: Obtain latest information
- Calculators: Perform precise mathematical calculations
- Databases: Query specific data
- API interfaces: Call external services
- File systems: Read and process files

**Implementation Example:**
Task: "Find the main research field of this year's Nobel Physics Prize winners"

Thought: I need to search for information about 2023 Nobel Physics Prize winners
Action: Search["2023 Nobel Physics Prize winners"]
Observation: Found three winners: Pierre Agostini, Ferenc Krausz, Anne L'Huillier

Thought: Now I need to understand their specific research fields
Action: Search["Pierre Agostini Ferenc Krausz Anne L'Huillier research field"]
Observation: Their research focuses on ultrafast lasers and attosecond science

Thought: I have obtained the required information and can summarise the answer
Final Answer: The main research field of 2023 Nobel Physics Prize winners is ultrafast lasers and attosecond science...

**Advantages:**
- Breaks through limitations of pure text generation
- Obtains real-time and accurate information
- Executes complex multi-step tasks
- Provides verifiable information sources`,
          keyPoints: [
            'ReAct結合推理和行動能力',
            '遵循「思考-行動-觀察」循環',
            '可調用外部工具獲取實時資訊',
            '極大擴展AI嘅能力邊界'
          ],
          keyPointsEn: [
            'ReAct combines reasoning and acting capabilities',
            'Follows "think-act-observe" cycle',
            'Can call external tools to obtain real-time information',
            'Greatly expands AI capability boundaries'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第三部分測驗：進階提示策略',
        titleEn: 'Part 3 Quiz: Advanced Prompting Strategies',
        description: '測試你對進階提示策略的理解和應用',
        descriptionEn: 'Test your understanding and application of advanced prompting strategies',
        timeLimit: 25,
        passingScore: 80,
        questions: [
          {
            id: 1,
            question: '「思維鏈 (Chain-of-Thought, CoT)」提示策略的核心思想是什麼？',
            questionEn: 'What is the core idea of Chain-of-Thought (CoT) prompting strategy?',
            type: 'single' as const,
            options: [
              '將多個 AI 模型串連在一起工作',
              '要求 AI 在給出最終答案前，先逐步展示其推理過程',
              '讓 AI 一次回答多個不相關的問題',
              '讓 AI 使用外部工具來回答問題'
            ],
            optionsEn: [
              'Connect multiple AI models to work together',
              'Require AI to show its reasoning process step by step before giving final answer',
              'Have AI answer multiple unrelated questions at once',
              'Have AI use external tools to answer questions'
            ],
            correctAnswer: 1,
            explanation: 'CoT的核心是引導模型在回答前先生成邏輯連貫的推理過程，模仿人類逐步思考的方式。',
            explanationEn: 'The core of CoT is to guide models to generate a logically coherent reasoning process before answering, mimicking human step-by-step thinking.'
          },
          {
            id: 2,
            question: 'ReAct 框架與其他推理策略（如 CoT）最根本的區別在於，它賦予了 AI 什麼能力？',
            questionEn: 'What is the fundamental difference between ReAct framework and other reasoning strategies (like CoT) in terms of AI capabilities?',
            type: 'single' as const,
            options: [
              '寫出更長的文字',
              '理解更複雜的語言',
              '與外部工具（如搜索引擎）互動以獲取資訊或執行動作',
              '產生更具情感的回答'
            ],
            optionsEn: [
              'Write longer texts',
              'Understand more complex language',
              'Interact with external tools (like search engines) to obtain information or execute actions',
              'Generate more emotional responses'
            ],
            correctAnswer: 2,
            explanation: 'ReAct框架的獨特之處在於它讓AI能夠與外部世界交互，調用工具獲取實時信息或執行動作。',
            explanationEn: 'The uniqueness of ReAct framework is that it enables AI to interact with the external world, calling tools to obtain real-time information or execute actions.'
          },
          {
            id: 3,
            question: '如果你需要解決一個極其複雜的數學競賽題，並且希望得到最可靠的答案，你會如何運用「自我一致性 (Self-Consistency)」？',
            questionEn: 'If you need to solve an extremely complex math competition problem and want the most reliable answer, how would you apply "Self-Consistency"?',
            type: 'single' as const,
            options: [
              '只讓 AI 回答一次，但要求它寫得非常詳細',
              '讓 AI 生成多條不同的推理路徑，然後選擇出現次數最多的答案',
              '讓 AI 扮演一位數學家',
              '要求 AI 以圖表格式呈現答案'
            ],
            optionsEn: [
              'Have AI answer only once but require very detailed writing',
              'Have AI generate multiple different reasoning paths, then choose the most frequent answer',
              'Have AI play the role of a mathematician',
              'Require AI to present answers in chart format'
            ],
            correctAnswer: 1,
            explanation: '自我一致性通過讓模型多次推理同一問題，然後選擇出現頻率最高的答案來提高可靠性。',
            explanationEn: 'Self-consistency improves reliability by having the model reason through the same problem multiple times, then selecting the most frequently occurring answer.'
          },
          {
            id: 4,
            question: '對於一個需要探索多種可能性、評估不同方案優劣並可能需要「回溯」的規劃任務（如下棋），哪種進階策略最為適合？',
            questionEn: 'For a planning task that requires exploring multiple possibilities, evaluating different solutions, and potentially "backtracking" (like chess), which advanced strategy is most suitable?',
            type: 'single' as const,
            options: [
              '思維樹 (Tree-of-Thought, ToT)',
              '零樣本提示 (Zero-shot Prompting)',
              'ReAct 框架',
              '思維鏈 (Chain-of-Thought, CoT)'
            ],
            optionsEn: [
              'Tree-of-Thought (ToT)',
              'Zero-shot Prompting',
              'ReAct Framework',
              'Chain-of-Thought (CoT)'
            ],
            correctAnswer: 0,
            explanation: '思維樹(ToT)專門設計用於探索多個分支、評估方案並支持回溯，非常適合如下棋等策略規劃任務。',
            explanationEn: 'Tree-of-Thought (ToT) is specifically designed to explore multiple branches, evaluate solutions, and support backtracking, making it ideal for strategic planning tasks like chess.'
          },
          {
            id: 5,
            question: '在提示中加入「讓我們一步一步地思考」這句話，是為了觸發 AI 的哪種能力？',
            questionEn: 'Adding "let\'s think step by step" in prompts is meant to trigger which AI capability?',
            type: 'single' as const,
            options: [
              '角色扮演 (Persona)',
              '少樣本學習 (Few-shot Learning)',
              '思維鏈 (Chain-of-Thought)',
              '格式化輸出'
            ],
            optionsEn: [
              'Persona',
              'Few-shot Learning',
              'Chain-of-Thought',
              'Formatted Output'
            ],
            correctAnswer: 2,
            explanation: '「讓我們一步一步地思考」是觸發思維鏈推理的經典提示語，引導AI展示逐步推理過程。',
            explanationEn: '"Let\'s think step by step" is a classic prompt phrase to trigger Chain-of-Thought reasoning, guiding AI to show step-by-step reasoning process.'
          }
        ]
      }
    },

    {
      id: 4,
      title: '第四部分：實踐應用與結語',
      titleEn: 'Part 4: Practical Applications and Conclusion',
      description: '將所學技能應用到實際場景中，掌握提示工程的最佳實踐和倫理考量。',
      descriptionEn: 'Apply learned skills to real scenarios, master best practices and ethical considerations in prompt engineering.',
      duration: '100 分鐘',
      durationEn: '100 minutes',
      lessons: [
        {
          id: 13,
          title: '4.1 實際應用領域',
          titleEn: '4.1 Practical Application Areas',
          duration: '25 分鐘',
          durationEn: '25 minutes',
          type: 'interactive' as const,
          description: '探索提示工程在各個領域的實際應用',
          descriptionEn: 'Explore practical applications of prompt engineering in various fields',
          image: '/images/courses/prompt-engineering/unit-images/applications.png',
          imageAlt: '實際應用領域示意圖',
          imageAltEn: 'Practical application areas illustration',
          transcript: `提示工程嘅技能可以應用於多種實際場景，幫助解決各行各業嘅問題：

**1. 文本摘要與報告生成**
- 會議記錄自動摘要
- 研究報告精華提取
- 新聞文章重點整理
- 學術論文摘要生成

**2. 問答系統建構**
- 企業內部知識庫問答
- 客戶服務機器人
- 教育輔導系統
- 法律諮詢助手

**3. 程式碼生成與調試**
- 自動生成程式碼
- 程式碼錯誤診斷
- 代碼優化建議
- 技術文檔生成

**4. 創意寫作與行銷**
- 廣告文案創作
- 社群媒體內容
- 部落格文章寫作
- 品牌故事創作

**5. 數據分析與洞察**
- 數據報告解讀
- 趨勢分析報告
- 商業洞察提取
- 決策支援分析

**應用技巧：**
- 根據具體領域調整提示風格
- 使用領域專業術語
- 提供充足嘅上下文資訊
- 設定適當嘅輸出格式`,
          transcriptEn: `Prompt engineering skills can be applied to various practical scenarios, helping solve problems across different industries:

**1. Text Summarisation and Report Generation**
- Automatic meeting minutes summarisation
- Research report key extraction
- News article highlights compilation
- Academic paper abstract generation

**2. Q&A System Construction**
- Enterprise internal knowledge base Q&A
- Customer service chatbots
- Educational tutoring systems
- Legal consultation assistants

**3. Code Generation and Debugging**
- Automatic code generation
- Code error diagnosis
- Code optimisation suggestions
- Technical documentation generation

**4. Creative Writing and Marketing**
- Advertising copy creation
- Social media content
- Blog article writing
- Brand story creation

**5. Data Analysis and Insights**
- Data report interpretation
- Trend analysis reports
- Business insight extraction
- Decision support analysis

**Application Tips:**
- Adjust prompt style according to specific fields
- Use domain-specific terminology
- Provide sufficient contextual information
- Set appropriate output formats`,
          keyPoints: [
            '提示工程適用於文本摘要、問答系統等多個領域',
            '可應用於程式碼生成和創意寫作',
            '在數據分析和商業洞察中發揮重要作用',
            '需要根據具體領域調整提示策略'
          ],
          keyPointsEn: [
            'Prompt engineering applies to multiple fields like text summarisation and Q&A systems',
            'Can be used for code generation and creative writing',
            'Plays important role in data analysis and business insights',
            'Need to adjust prompt strategies according to specific fields'
          ],
          completed: false
        },
        {
          id: 14,
          title: '4.2 最佳實踐與倫理考量',
          titleEn: '4.2 Best Practices and Ethical Considerations',
          duration: '30 分鐘',
          durationEn: '30 minutes',
          type: 'interactive' as const,
          description: '學習提示工程的最佳實踐和重要的倫理考量',
          descriptionEn: 'Learn best practices and important ethical considerations in prompt engineering',
          image: '/images/courses/prompt-engineering/unit-images/ethics.png',
          imageAlt: '最佳實踐與倫理示意圖',
          imageAltEn: 'Best practices and ethics illustration',
          transcript: `提示工程不僅僅係技術問題，更涉及倫理和責任考量：

**最佳實踐：**

1. **迭代優化**
   - 唔要期望一次就寫出完美提示
   - 持續測試和改進
   - 記錄有效嘅提示模式

2. **上下文管理**
   - 提供充足但不冗餘嘅背景資訊
   - 避免資訊過載
   - 確保上下文相關性

3. **結果驗證**
   - 始終驗證AI輸出嘅準確性
   - 建立質量檢查機制
   - 保持批判性思維

**倫理考量：**

1. **避免偏見強化**
   - 注意提示中嘅隱含偏見
   - 促進包容性和多樣性
   - 定期審查提示內容

2. **資訊準確性**
   - 防止AI生成錯誤資訊
   - 要求引用可靠來源
   - 明確標示AI生成內容

3. **隱私保護**
   - 避免在提示中包含敏感資訊
   - 保護用戶數據安全
   - 遵守數據保護法規

4. **透明度原則**
   - 明確告知AI使用情況
   - 解釋AI決策過程
   - 提供人工審核機制

**責任使用：**
- 考慮AI輸出對社會嘅影響
- 建立適當嘅監督機制
- 持續學習和改進`,
          transcriptEn: `Prompt engineering is not just a technical issue, but also involves ethical and responsibility considerations:

**Best Practices:**

1. **Iterative Optimisation**
   - Don't expect to write perfect prompts in one go
   - Continuously test and improve
   - Record effective prompt patterns

2. **Context Management**
   - Provide sufficient but not redundant background information
   - Avoid information overload
   - Ensure context relevance

3. **Result Verification**
   - Always verify accuracy of AI outputs
   - Establish quality checking mechanisms
   - Maintain critical thinking

**Ethical Considerations:**

1. **Avoid Bias Reinforcement**
   - Pay attention to implicit biases in prompts
   - Promote inclusivity and diversity
   - Regularly review prompt content

2. **Information Accuracy**
   - Prevent AI from generating false information
   - Require citing reliable sources
   - Clearly mark AI-generated content

3. **Privacy Protection**
   - Avoid including sensitive information in prompts
   - Protect user data security
   - Comply with data protection regulations

4. **Transparency Principle**
   - Clearly inform about AI usage
   - Explain AI decision processes
   - Provide human review mechanisms

**Responsible Use:**
- Consider societal impact of AI outputs
- Establish appropriate oversight mechanisms
- Continue learning and improving`,
          keyPoints: [
            '採用迭代優化和結果驗證嘅最佳實踐',
            '注意避免偏見強化和確保資訊準確性',
            '保護隱私和遵守透明度原則',
            '負責任地使用AI技術'
          ],
          keyPointsEn: [
            'Adopt best practices of iterative optimisation and result verification',
            'Pay attention to avoiding bias reinforcement and ensuring information accuracy',
            'Protect privacy and follow transparency principles',
            'Use AI technology responsibly'
          ],
          completed: false
        },
        {
          id: 15,
          title: '4.3 持續學習與技能提升',
          titleEn: '4.3 Continuous Learning and Skill Enhancement',
          duration: '25 分鐘',
          durationEn: '25 minutes',
          type: 'interactive' as const,
          description: '制定個人提示工程技能提升計劃',
          descriptionEn: 'Develop personal prompt engineering skill enhancement plan',
          image: '/images/courses/prompt-engineering/unit-images/learning.png',
          imageAlt: '持續學習示意圖',
          imageAltEn: 'Continuous learning illustration',
          transcript: `提示工程係一門實踐嘅藝術與科學，需要持續學習和改進：

**學習策略：**

1. **動手實踐**
   - 將學到嘅框架應用到日常工作
   - 建立個人提示範本庫
   - 記錄成功和失敗嘅案例

2. **社群參與**
   - 加入提示工程社群
   - 分享經驗和最佳實踐
   - 學習他人嘅創新方法

3. **持續實驗**
   - 嘗試新嘅提示技巧
   - 測試不同模型嘅表現
   - 探索新興嘅AI工具

**技能發展路徑：**

初級階段：
- 掌握基礎提示結構
- 學會使用常見框架
- 理解模型限制

中級階段：
- 開發自定義框架
- 優化複雜任務提示
- 處理多模態輸入

高級階段：
- 設計創新提示策略
- 建立評估體系
- 指導他人學習

**未來趨勢：**
- 多模態提示工程
- 自動化提示優化
- 領域特化應用
- 倫理AI發展

**建議行動：**
1. 每週練習新嘅提示技巧
2. 建立個人學習日誌
3. 參與線上課程和工作坊
4. 關注AI技術最新發展`,
          transcriptEn: `Prompt engineering is a practical art and science that requires continuous learning and improvement:

**Learning Strategies:**

1. **Hands-on Practice**
   - Apply learned frameworks to daily work
   - Build personal prompt template library
   - Record successful and failed cases

2. **Community Participation**
   - Join prompt engineering communities
   - Share experiences and best practices
   - Learn innovative methods from others

3. **Continuous Experimentation**
   - Try new prompting techniques
   - Test performance of different models
   - Explore emerging AI tools

**Skill Development Path:**

Beginner Level:
- Master basic prompt structures
- Learn to use common frameworks
- Understand model limitations

Intermediate Level:
- Develop custom frameworks
- Optimise complex task prompts
- Handle multimodal inputs

Advanced Level:
- Design innovative prompt strategies
- Build evaluation systems
- Guide others in learning

**Future Trends:**
- Multimodal prompt engineering
- Automated prompt optimisation
- Domain-specific applications
- Ethical AI development

**Recommended Actions:**
1. Practice new prompting techniques weekly
2. Maintain personal learning journal
3. Participate in online courses and workshops
4. Follow latest AI technology developments`,
          keyPoints: [
            '通過動手實踐和社群參與持續學習',
            '按初級、中級、高級階段發展技能',
            '關注多模態和自動化等未來趨勢',
            '建立個人學習計劃和實踐習慣'
          ],
          keyPointsEn: [
            'Continuously learn through hands-on practice and community participation',
            'Develop skills through beginner, intermediate, and advanced stages',
            'Pay attention to future trends like multimodal and automation',
            'Establish personal learning plans and practice habits'
          ],
          completed: false
        },
        {
          id: 16,
          title: '4.4 課程總結與下一步',
          titleEn: '4.4 Course Summary and Next Steps',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive' as const,
          description: '回顧課程重點，規劃未來學習方向',
          descriptionEn: 'Review course highlights and plan future learning directions',
          image: '/images/courses/prompt-engineering/unit-images/summary.png',
          imageAlt: '課程總結示意圖',
          imageAltEn: 'Course summary illustration',
          transcript: `恭喜您完成咗提示工程嘅完整學習之旅！讓我哋回顧一下重要嘅學習成果：

**課程回顧：**

第一部分：基礎建立
- 理解提示工程嘅核心概念
- 掌握提示嘅五個基本元素
- 明白提示工程vs模型微調

第二部分：技巧掌握
- 學會零樣本、單樣本、少樣本方法
- 掌握五大實用框架(R-T-F, T-A-G, B-A-B, C-A-R-E, R-I-S-E)
- 理解清晰指令嘅重要性

第三部分：進階策略
- 掌握思維鏈(CoT)推理
- 學會自我一致性技術
- 理解思維樹(ToT)和ReAct框架

第四部分：實踐應用
- 了解各領域應用場景
- 學習最佳實踐和倫理考量
- 制定持續學習計劃

**關鍵收穫：**
1. 結構化思考能力
2. 清晰溝通技巧
3. 問題分解方法
4. 創新解決方案

**下一步建議：**

短期目標(1-3個月)：
- 每日練習基礎提示技巧
- 建立個人提示範本庫
- 選擇一個應用領域深入實踐

中期目標(3-6個月)：
- 掌握進階策略嘅實際應用
- 開發自己嘅提示框架
- 分享經驗，幫助他人學習

長期目標(6個月以上)：
- 成為特定領域嘅提示專家
- 參與提示工程社群建設
- 探索新興技術和方法

**最後嘅話：**
提示工程係一個充滿可能性嘅領域。記住，最好嘅學習方法就係持續實踐。不要害怕犯錯，每個錯誤都係學習嘅機會。

願您在AI時代中，用提示工程嘅力量創造無限可能！`,
          transcriptEn: `Congratulations on completing the complete learning journey of prompt engineering! Let's review the important learning outcomes:

**Course Review:**

Part 1: Foundation Building
- Understand core concepts of prompt engineering
- Master five basic elements of prompts
- Understand prompt engineering vs model fine-tuning

Part 2: Technique Mastery
- Learn zero-shot, one-shot, few-shot methods
- Master five practical frameworks (R-T-F, T-A-G, B-A-B, C-A-R-E, R-I-S-E)
- Understand importance of clear instructions

Part 3: Advanced Strategies
- Master Chain-of-Thought (CoT) reasoning
- Learn self-consistency techniques
- Understand Tree-of-Thought (ToT) and ReAct frameworks

Part 4: Practical Applications
- Understand application scenarios in various fields
- Learn best practices and ethical considerations
- Develop continuous learning plans

**Key Gains:**
1. Structured thinking ability
2. Clear communication skills
3. Problem decomposition methods
4. Innovative solutions

**Next Step Recommendations:**

Short-term Goals (1-3 months):
- Practice basic prompting techniques daily
- Build personal prompt template library
- Choose one application field for deep practice

Medium-term Goals (3-6 months):
- Master practical applications of advanced strategies
- Develop your own prompt frameworks
- Share experiences and help others learn

Long-term Goals (6+ months):
- Become a prompt expert in specific fields
- Participate in prompt engineering community building
- Explore emerging technologies and methods

**Final Words:**
Prompt engineering is a field full of possibilities. Remember, the best learning method is continuous practice. Don't be afraid to make mistakes; every error is a learning opportunity.

May you use the power of prompt engineering to create infinite possibilities in the AI era!`,
          keyPoints: [
            '完成咗從基礎到進階嘅完整學習旅程',
            '掌握咗結構化思考和清晰溝通技巧',
            '建立咗短期、中期和長期學習目標',
            '準備好在AI時代發揮提示工程嘅力量'
          ],
          keyPointsEn: [
            'Completed the complete learning journey from basics to advanced',
            'Mastered structured thinking and clear communication skills',
            'Established short-term, medium-term, and long-term learning goals',
            'Ready to harness the power of prompt engineering in the AI era'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第四部分測驗：實踐應用與結語',
        titleEn: 'Part 4 Quiz: Practical Applications and Conclusion',
        description: '測試你對實踐應用和最佳實踐的理解',
        descriptionEn: 'Test your understanding of practical applications and best practices',
        timeLimit: 20,
        passingScore: 80,
        questions: [
          {
            id: 1,
            question: '在建立一個基於公司內部文件的問答系統時，為了防止 AI 捏造答案，最關鍵的提示技巧是什麼？',
            questionEn: 'When building a Q&A system based on company internal documents, what is the most critical prompting technique to prevent AI from fabricating answers?',
            type: 'single' as const,
            options: [
              '使用非常高的溫度參數',
              '要求 AI 嚴格基於所提供的「上下文」來回答，若無答案則明說',
              '讓 AI 扮演公司 CEO 的角色',
              '盡可能縮短提示的長度'
            ],
            optionsEn: [
              'Use very high temperature parameters',
              'Require AI to answer strictly based on provided "context", clearly stating if no answer exists',
              'Have AI play the role of company CEO',
              'Shorten prompts as much as possible'
            ],
            correctAnswer: 1,
            explanation: '要求AI嚴格基於提供的上下文回答，並在沒有相關信息時明確說明，是防止幻覺的關鍵策略。',
            explanationEn: 'Requiring AI to answer strictly based on provided context and clearly stating when no relevant information exists is a key strategy to prevent hallucinations.'
          },
          {
            id: 2,
            question: '根據指南，以下哪項不是提示工程的典型應用領域？',
            questionEn: 'According to the guide, which of the following is NOT a typical application area of prompt engineering?',
            type: 'single' as const,
            options: [
              '文本摘要與報告生成',
              '設計和製造電腦晶片',
              '輔助程式設計師生成和調試代碼',
              '產生行銷文案和社群媒體內容'
            ],
            optionsEn: [
              'Text summarisation and report generation',
              'Designing and manufacturing computer chips',
              'Assisting programmers in code generation and debugging',
              'Generating marketing copy and social media content'
            ],
            correctAnswer: 1,
            explanation: '設計和製造電腦晶片屬於硬體工程領域，不是提示工程的典型應用範圍。',
            explanationEn: 'Designing and manufacturing computer chips belongs to hardware engineering, which is not a typical application area of prompt engineering.'
          },
          {
            id: 3,
            question: '指南總結道，提示工程本質上是一種需要培養的習慣，它關乎什麼？',
            questionEn: 'The guide concludes that prompt engineering is essentially a habit to be cultivated. What does it concern?',
            type: 'single' as const,
            options: [
              '快速打字的能力',
              '結構化思考和清晰溝通',
              '了解 AI 的硬體規格',
              '記住所有提示框架的縮寫'
            ],
            optionsEn: [
              'Fast typing ability',
              'Structured thinking and clear communication',
              'Understanding AI hardware specifications',
              'Memorising all prompt framework abbreviations'
            ],
            correctAnswer: 1,
            explanation: '提示工程培養的是結構化思考和清晰溝通的習慣，這是其核心價值所在。',
            explanationEn: 'Prompt engineering cultivates habits of structured thinking and clear communication, which is its core value.'
          },
          {
            id: 4,
            question: '提升個人提示工程技能最有效的方法是什麼？',
            questionEn: 'What is the most effective way to improve personal prompt engineering skills?',
            type: 'single' as const,
            options: [
              '只閱讀理論，不進行實踐',
              '每次都使用完全相同的提示',
              '堅持使用一種 AI 模型，不嘗試新的',
              '不斷地動手實踐、觀察結果並進行迭代優化'
            ],
            optionsEn: [
              'Only read theory without practice',
              'Always use exactly the same prompts',
              'Stick to one AI model without trying new ones',
              'Continuously practice hands-on, observe results, and iterate for optimisation'
            ],
            correctAnswer: 3,
            explanation: '持續的實踐、觀察和迭代優化是提升提示工程技能最有效的方法。',
            explanationEn: 'Continuous practice, observation, and iterative optimisation is the most effective way to improve prompt engineering skills.'
          },
          {
            id: 5,
            question: '為什麼在設計提示時需要考慮倫理問題？',
            questionEn: 'Why do we need to consider ethical issues when designing prompts?',
            type: 'single' as const,
            options: [
              '因為符合倫理的提示能讓 AI 運算更快',
              '因為不當的提示可能會強化社會偏見或導致 AI 生成有害內容',
              '因為 AI 只會回答符合倫理的提示',
              '因為倫理考量是所有進階框架的必要組成部分'
            ],
            optionsEn: [
              'Because ethical prompts make AI compute faster',
              'Because inappropriate prompts may reinforce social biases or lead AI to generate harmful content',
              'Because AI only responds to ethical prompts',
              'Because ethical considerations are necessary components of all advanced frameworks'
            ],
            correctAnswer: 1,
            explanation: '考慮倫理問題是為了防止提示強化偏見或導致AI生成有害內容，確保負責任的AI使用。',
            explanationEn: 'Considering ethical issues prevents prompts from reinforcing biases or leading AI to generate harmful content, ensuring responsible AI use.'
          }
        ]
      }
    }
  ],

  faqData: [
    {
      question: '我需要有程式設計背景才能學習提示工程嗎？',
      questionEn: 'Do I need a programming background to learn prompt engineering?',
      answer: '唔需要！提示工程主要係關於如何用自然語言與 AI 溝通。雖然有程式設計背景會有幫助，但最重要嘅係邏輯思維和清晰嘅表達能力。',
      answerEn: 'No! Prompt engineering is mainly about how to communicate with AI using natural language. While a programming background can be helpful, the most important thing is logical thinking and clear expression skills.'
    },
    {
      question: '學完這個課程後，我可以做什麼工作？',
      questionEn: 'What jobs can I do after completing this course?',
      answer: '提示工程師、AI 應用開發者、內容創作專員、客戶服務優化師、數據分析師等。隨著 AI 技術嘅普及，提示工程技能喺各行各業都越嚟越重要。',
      answerEn: 'Prompt engineer, AI application developer, content creation specialist, customer service optimiser, data analyst, etc. As AI technology becomes more widespread, prompt engineering skills are becoming increasingly important in all industries.'
    },
    {
      question: '這個課程適合完全嘅初學者嗎？',
      questionEn: 'Is this course suitable for complete beginners?',
      answer: '絕對適合！我哋從最基礎嘅概念開始，逐步深入。只要您有基本嘅電腦操作能力和對 AI 嘅興趣，就可以輕鬆跟上課程進度。',
      answerEn: 'Absolutely suitable! We start from the most basic concepts and gradually go deeper. As long as you have basic computer operation skills and an interest in AI, you can easily keep up with the course progress.'
    }
  ]
}; 