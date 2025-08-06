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
        titleEn: 'Part 1 Quiz: Foundations of Prompt Engineering',
        description: '測試您對提示工程基礎概念的理解',
        descriptionEn: 'Test your understanding of basic prompt engineering concepts',
        timeLimit: 10,
        passingScore: 80,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: '提示工程的核心目標是什麼？',
            questionEn: 'What is the core objective of prompt engineering?',
            options: [
              '讓 AI 回答更多問題',
              '引導 AI 產生最符合期望、最精準的輸出',
              '減少 AI 模型的大小',
              '提高 AI 的運行速度'
            ],
            optionsEn: [
              'Make AI answer more questions',
              'Guide AI to produce the most expected and precise outputs',
              'Reduce AI model size',
              'Improve AI running speed'
            ],
            correctAnswer: 1,
            explanation: '提示工程的核心目標是引導 AI 產生最符合期望、最精準的輸出，這是通過策略性地設計指令來實現的。',
            explanationEn: 'The core objective of prompt engineering is to guide AI to produce the most expected and precise outputs, which is achieved through strategically designing instructions.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '一個結構良好的提示通常不包含以下哪個元素？',
            questionEn: 'Which element is usually NOT included in a well-structured prompt?',
            options: [
              '指令 (Instruction)',
              '角色 (Persona)',
              '模型參數 (Model Parameters)',
              '格式 (Format)'
            ],
            optionsEn: [
              'Instruction',
              'Persona',
              'Model Parameters',
              'Format'
            ],
            correctAnswer: 2,
            explanation: '模型參數不是提示本身的組成部分，而是在 API 調用時設定的技術參數。提示的核心元素包括指令、情境、角色、範例和格式。',
            explanationEn: 'Model parameters are not part of the prompt itself, but technical parameters set during API calls. The core elements of prompts include instructions, context, persona, examples, and format.'
          }
        ]
      }
    },

    {
      id: 2,
      title: '第二部分：核心提示技巧與實用框架',
      titleEn: 'Part 2: Core Prompting Techniques and Practical Frameworks',
      description: '學習具體的提示技巧和經過驗證的框架，包括零樣本、少樣本提示和五大實用框架。',
      descriptionEn: 'Learn specific prompting techniques and proven frameworks, including zero-shot, few-shot prompting and five practical frameworks.',
      duration: '150 分鐘',
      durationEn: '150 minutes',
      lessons: [
        {
          id: 6,
          title: '2.1 基礎提示法：零樣本、單樣本與少樣本',
          titleEn: '2.1 Basic Prompting Methods: Zero-shot, One-shot, and Few-shot',
          duration: '25 分鐘',
          durationEn: '25 minutes',
          type: 'interactive' as const,
          description: '掌握三種基礎提示方法，了解何時使用哪種技巧',
          descriptionEn: 'Master three basic prompting methods and understand when to use which technique',
          image: '/images/courses/prompt-engineering/unit-images/shot-methods.png',
          imageAlt: '零樣本、單樣本與少樣本示意圖',
          imageAltEn: 'Zero-shot, one-shot, and few-shot illustration',
          transcript: `提示工程中有三種基礎嘅學習方法，佢哋根據提供範例嘅數量嚟分類：

**零樣本提示 (Zero-shot)**
直接下達指令，唔提供任何範例。適用於簡單、直接嘅任務。

範例：
```
將「市場分析」翻譯成英文。
```

特點：
- 最簡潔嘅方法
- 依賴模型嘅預訓練知識
- 適合常見任務

**單樣本提示 (One-shot)**
喺提示中提供一個完整嘅輸入-輸出範例。

範例：
```
法文 'mer' 係指英文 'sea'。
咁法文 'ciel' 係指咩？
```

特點：
- 提供一個學習模式
- 幫助模型理解任務格式
- 比零樣本更精確

**少樣本提示 (Few-shot)**
提供多個範例，讓 AI 從中學習模式。呢個係提升複雜任務表現嘅極其有效嘅技術。

範例：
```
情緒分析任務：

正面情緒：呢部電影太棒了！
負面情緒：我對呢個產品好失望。
正面情緒：服務態度非常好，值得推薦。
負面情緒：呢家餐廳嘅食物好難食。

請分析：「今日嘅天氣真係太好了！」
```

**選擇指南：**
- 零樣本：簡單、常見任務
- 單樣本：需要特定格式嘅任務
- 少樣本：複雜、需要模式識別嘅任務

**實戰技巧：**
1. 範例質量比數量更重要
2. 範例應該涵蓋不同類型嘅輸入
3. 保持範例格式一致
4. 通常 3-5 個範例就足夠`,
          transcriptEn: `There are three basic learning methods in prompt engineering, classified by the number of examples provided:

**Zero-shot Prompting**
Directly giving instructions without providing any examples. Suitable for simple, direct tasks.

Example:
```
Translate "market analysis" into Chinese.
```

Characteristics:
- Most concise method
- Relies on model's pre-trained knowledge
- Suitable for common tasks

**One-shot Prompting**
Providing one complete input-output example in the prompt.

Example:
```
French 'mer' means English 'sea'.
What does French 'ciel' mean?
```

Characteristics:
- Provides one learning pattern
- Helps model understand task format
- More precise than zero-shot

**Few-shot Prompting**
Providing multiple examples for AI to learn patterns from. This is an extremely effective technique for improving performance on complex tasks.

Example:
```
Sentiment analysis task:

Positive: This movie is amazing!
Negative: I'm very disappointed with this product.
Positive: The service attitude is excellent, highly recommended.
Negative: The food at this restaurant is terrible.

Please analyse: "The weather today is absolutely wonderful!"
```

**Selection Guide:**
- Zero-shot: Simple, common tasks
- One-shot: Tasks requiring specific formats
- Few-shot: Complex tasks requiring pattern recognition

**Practical Tips:**
1. Example quality is more important than quantity
2. Examples should cover different types of inputs
3. Maintain consistent example formats
4. Usually 3-5 examples are sufficient`,
          keyPoints: [
            '零樣本適合簡單直接嘅任務',
            '單樣本幫助模型理解格式要求',
            '少樣本係複雜任務嘅有效技術',
            '範例質量比數量更重要'
          ],
          keyPointsEn: [
            'Zero-shot is suitable for simple, direct tasks',
            'One-shot helps models understand format requirements',
            'Few-shot is an effective technique for complex tasks',
            'Example quality is more important than quantity'
          ],
          completed: false
        },
        {
          id: 7,
          title: '2.2 清晰指令的黃金法則',
          titleEn: '2.2 Golden Rules for Clear Instructions',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive' as const,
          description: '學習撰寫清晰、具體、有效指令的核心原則',
          descriptionEn: 'Learn core principles for writing clear, specific, and effective instructions',
          image: '/images/courses/prompt-engineering/unit-images/clear-instructions.png',
          imageAlt: '清晰指令黃金法則圖示',
          imageAltEn: 'Golden rules for clear instructions illustration',
          transcript: `撰寫清晰指令係提示工程嘅核心技能。以下係幾個關鍵嘅黃金法則：

**法則 1：具體、明確、直接**
避免模糊嘅表達。一個包含更多細節嘅較長提示，通常比簡短嘅提示效果更好。

❌ 錯誤範例：「幫我寫個報告」
✅ 正確範例：「幫我寫一份關於 2024 年電商趨勢嘅 5 頁市場分析報告，包括市場規模、主要玩家、消費者行為變化和未來 3 年預測」

**法則 2：強調「做咩」，而唔係「唔好做咩」**
正面指令更有效。與其話「唔好使用行話」，不如話「請用外行人能聽懂嘅簡單語言嚟解釋」。

❌ 錯誤範例：「唔好寫得太複雜」
✅ 正確範例：「請用小學生都能理解嘅簡單詞語解釋」

**法則 3：分解複雜任務**
將大任務分解為一系列更簡單嘅子任務，讓模型分步執行。

範例：
```
請按以下步驟分析呢份銷售數據：
1. 首先計算每個產品嘅總銷售額
2. 然後識別銷售表現最好嘅前 3 名產品
3. 分析呢 3 個產品嘅成功因素
4. 最後提出改善其他產品銷售嘅建議
```

**法則 4：使用具體嘅動詞**
- 「分析」比「睇下」更清晰
- 「總結要點」比「講下重點」更精確
- 「比較優缺點」比「評價下」更具體

**法則 5：設定期望和約束**
明確告知輸出嘅長度、格式、語調等要求。

範例：「用 200 字以內嘅專業語調總結，並以項目符號列表呈現」`,
          transcriptEn: `Writing clear instructions is a core skill in prompt engineering. Here are several key golden rules:

**Rule 1: Be Specific, Clear, and Direct**
Avoid vague expressions. A longer prompt with more details usually works better than a brief one.

❌ Wrong example: "Help me write a report"
✅ Correct example: "Help me write a 5-page market analysis report on 2024 e-commerce trends, including market size, major players, consumer behaviour changes, and 3-year forecasts"

**Rule 2: Emphasise "What to Do" Rather Than "What Not to Do"**
Positive instructions are more effective. Instead of saying "don't use jargon," say "please explain using simple language that laypeople can understand."

❌ Wrong example: "Don't write too complexly"
✅ Correct example: "Please explain using simple words that primary school students can understand"

**Rule 3: Break Down Complex Tasks**
Decompose large tasks into a series of simpler sub-tasks for the model to execute step by step.

Example:
```
Please analyse this sales data following these steps:
1. First calculate the total sales for each product
2. Then identify the top 3 best-performing products
3. Analyse the success factors of these 3 products
4. Finally propose suggestions for improving sales of other products
```

**Rule 4: Use Specific Verbs**
- "Analyse" is clearer than "have a look"
- "Summarise key points" is more precise than "talk about the main points"
- "Compare advantages and disadvantages" is more specific than "evaluate"

**Rule 5: Set Expectations and Constraints**
Clearly specify requirements for output length, format, tone, etc.

Example: "Summarise in a professional tone within 200 words and present as bullet points"`,
          keyPoints: [
            '具體明確嘅指令比模糊嘅更有效',
            '正面指令優於負面限制',
            '複雜任務需要分解成子任務',
            '設定清晰嘅期望和約束條件'
          ],
          keyPointsEn: [
            'Specific and clear instructions are more effective than vague ones',
            'Positive instructions are better than negative restrictions',
            'Complex tasks need to be broken down into sub-tasks',
            'Set clear expectations and constraints'
          ],
          completed: false
        }
      ]
    }
  ],

  faqData: [
    {
      question: '我需要有程式設計背景才能學習提示工程嗎？',
      questionEn: 'Do I need a programming background to learn prompt engineering?',
      answer: '唔需要！提示工程主要係關於如何用自然語言與 AI 溝通。雖然有程式設計背景會有幫助，但最重要嘅係邏輯思維和清晰嘅表達能力。',
      answerEn: 'No! Prompt engineering is mainly about how to communicate with AI using natural language. While a programming background can be helpful, the most important things are logical thinking and clear expression skills.'
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