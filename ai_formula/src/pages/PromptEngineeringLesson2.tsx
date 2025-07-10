import React, { useState, useMemo, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/course/QuizCard';
import LessonSidebar from '@/components/course/LessonSidebar';
import LessonContent, { useLessonCompletion } from '@/components/course/LessonContent';
import type { LessonItem, LessonSection } from '@/components/course/LessonSidebar';
import type { QuizQuestion } from '@/components/course/QuizCard';

// Quiz 問題定義

// Define English quiz questions
const enQuizQuestions = [
  {
    q: '1. Which of the following is the best practice for writing an effective prompt?',
    options: [
      'Ensure the prompt is clear and specific, and includes background information',
      'Make the prompt as vague as possible to let the AI generate freely',
      'Repeat the same word multiple times to emphasise importance',
      'Avoid setting any format restrictions',
    ],
    answer: 0,
  },
  {
    q: '2. What is the primary purpose of role-play prompts in generative AI?',
    options: [
      "To guide the AI to assume a specific role, helping it generate content that is more aligned with the user's needs",
      'To let the AI automatically choose the most suitable response style',
      'To reduce the amount of input data required by the AI',
      'To test the AI\'s creativity and logical reasoning abilities',
    ],
    answer: 0,
  },
  {
    q: '3. Which element is most important to improve the effectiveness of a prompt in generative AI?',
    options: [
      'Provide sufficient context and data to ensure the prompt is well-grounded',
      'Input multiple vague instructions to stimulate the AI\'s creativity',
      'Provide the simplest instructions, avoiding excessive detail',
      "Emphasise the use of highly technical terms to challenge the model's understanding",
    ],
    answer: 0,
  },
  {
    q: '4. How should "output indicators" be set when crafting a prompt to guide the AI in generating appropriate responses?',
    options: [
      'Define the tone, style, length, and format of the output',
      'Only ask the AI to provide a brief response without specifying the format',
      'Provide a large amount of data without setting specific requirements',
      'Only ask for a random response',
    ],
    answer: 0,
  },
  {
    q: '5. Which feature of prompt engineering tools helps users improve the effectiveness of their prompts?',
    options: [
      'Provide instant feedback, allowing users to refine their prompts for better results',
      'Help users generate datasets to support the generated content',
      'Automatically rewrite prompts into code',
      'Restrict prompts to a pre-defined input format',
    ],
    answer: 0,
  },
];

// Define Cantonese quiz questions
const zhQuizQuestions: QuizQuestion[] = [
  {
    q: '1. 以下哪一項是寫好提示的最佳做法？',
    options: [
      '確保提示內容具體清晰，並包含背景資料',
      '盡量模糊提示，讓AI自由發揮',
      '重複相同的詞語來強調重要性',
      '避免設置任何格式限制',
    ],
    answer: 0,
  },
  {
    q: '2. 在生成式AI中，角色扮演（Role-play）提示的主要目的是？',
    options: [
      '引導AI扮演特定角色，幫助生成更貼近需求的內容',
      '讓AI能自動選擇最適合的回答風格',
      '減少AI所需的輸入數據量',
      '測試AI的創造性和邏輯能力',
    ],
    answer: 0,
  },
  {
    q: '3. 要提高生成式AI的提示效果，以下哪個元素最為重要？',
    options: [
      '提供充分的上下文和數據，確保提示有根有據',
      '輸入多個模糊不清的指令，激發AI創造性',
      '只提供最簡單的指令，避免過多詳細要求',
      '強調使用高深的專業術語，挑戰模型的理解能力',
    ],
    answer: 0,
  },
  {
    q: '4. 在編寫提示時，如何設置"輸出指標"（Output Indicator）有助於指引AI生成合適的回應？',
    options: [
      '定義輸出的語氣、風格、長度、格式等要求',
      '只要求AI提供簡短的回應，不設格式要求',
      '提供大量數據但沒有設置具體要求',
      '只要求生成一個隨機的回答',
    ],
    answer: 0,
  },
  {
    q: '5. 在提示工程工具中，哪個功能幫助使用者改進提示的效果？',
    options: [
      '提供即時反饋，讓使用者調整提示以達到最佳效果',
      '幫助使用者生成數據集以支持生成內容',
      '自動將提示重寫成程式碼',
      '限制提示只能按照某一固定格式輸入',
    ],
    answer: 0,
  },
];




const lesson2Sections: { en: LessonSection[], 'zh-TW': LessonSection[] } = {
  en: [
    {
      group: 'Lesson 2: Prompt Structure',
      groupIcon: '🧩',
      items: [
        {
          key: 'instruction',
          title: 'Instruction',
          icon: '🔍',
          duration: '3 min',
          description: 'Tell the AI what to do, clearly define action requirements and goals.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Instruction</h3>
              <p>This part tells the model what to do and is the most fundamental component. Instructions ensure the model understands your requirements and generates content in the correct direction.</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"You are a career advisor. Write a persuasive LinkedIn summary for a student majoring in data science who is seeking a remote internship."</blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Action Requirement:</b> Specifies the role (Career Advisor) and tells the AI to write a persuasive LinkedIn Summary.</li>
                <li><b>Goal:</b> The purpose is to help a student (majoring in data science) seek a remote internship, providing a clear action framework.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'context',
          title: 'Context',
          icon: '🔍',
          duration: '2 min',
          description: 'Provide background information to help the AI understand the situation.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Context</h3>
              <p>Context provides important situational information that helps the AI understand requirements and scenarios, making the generated content more relevant and in-depth. Without context, the generated content may lose focus.</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">Example:<br/>"The student has experience in Python and machine learning, and wants to work in a startup."</blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Background Information:</b> Provides the AI with information about the student's Python and machine learning experience, and indicates they want to work in a startup.</li>
                <li><b>Purpose:</b> Offers the student's skills and career goals background, helping the AI generate a LinkedIn Summary suitable for startups and related fields.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'input-data',
          title: 'Input Data',
          icon: '🔍',
          duration: '2 min',
          description: 'Provide specific information or data to help the AI generate more precise content.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Input Data</h3>
              <p>This part refers to the specific information or data you provide to the AI, which can be a dataset, a piece of text, or other supplementary materials that help the model generate more specific and precise content.</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>Professional Example:</strong><br/>
                "You have access to a comprehensive dataset containing Pacific Ocean temperature records from 2010-2023 and corresponding sea level measurements. The student's portfolio includes three machine learning projects: a predictive model for stock prices (Python/TensorFlow), a recommendation system for e-commerce (Python/Scikit-learn), and a sentiment analysis tool for social media (Python/NLTK). Additionally, they have completed internships at two tech startups and contributed to open-source projects on GitHub."
              </blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Comprehensive Data:</b> Provides specific datasets with timeframes and multiple data types, giving the AI rich context to work with.</li>
                <li><b>Detailed Portfolio:</b> Includes specific projects with technologies used, demonstrating depth of experience.</li>
                <li><b>Contextual Relevance:</b> All data points are relevant to the career guidance scenario, helping the AI generate more targeted recommendations.</li>
                <li><b>Professional Depth:</b> The expanded information allows the AI to create more nuanced and professional responses.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'output-indicator',
          title: 'Output Indicator',
          icon: '🔍',
          duration: '2 min',
          description: 'Define the format, tone, length, and other requirements for the answer.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Output Indicator</h3>
              <p>Output indicators specify the format, style, length, or other requirements for the generated content, allowing the AI to know what kind of content it should generate.</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>Comprehensive Example:</strong><br/>
                "Structure your response as a professional LinkedIn summary with the following specifications: Use a confident yet approachable tone, keep it between 150-200 words, include at least two specific case studies with quantifiable results, highlight technical skills prominently, incorporate industry-relevant keywords for remote work and startups, format with short paragraphs for readability, and conclude with a clear call-to-action for potential employers."
              </blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Format Specification:</b> Clearly defines the document type (LinkedIn summary) and structural requirements.</li>
                <li><b>Tone Requirements:</b> Specifies both confident and approachable characteristics, providing clear emotional direction.</li>
                <li><b>Length Parameters:</b> Gives specific word count (150-200 words) for precise output control.</li>
                <li><b>Content Requirements:</b> Demands two case studies with quantifiable results, ensuring substance and credibility.</li>
                <li><b>SEO Optimization:</b> Includes keyword strategy for remote work and startup industries.</li>
                <li><b>Readability Focus:</b> Specifies formatting for better user experience.</li>
                <li><b>Action-Oriented:</b> Requires a call-to-action to drive engagement.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'full-example',
          title: 'Full Example Prompt (Complete Structure)',
          icon: '🧠',
          duration: '2 min',
          description: 'Complete structure demonstration',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Full Example Prompt (Complete Structure)</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Instruction:</b> You are a career advisor. Write a persuasive LinkedIn summary for a student majoring in data science who is seeking a remote internship.</li>
                <li><b>Context:</b> The student has experience in Python and machine learning, and wants to work in a startup.</li>
                <li><b>Input Data:</b> N/A (This example doesn't require specific data like temperature records, but could include a list of skills or project experiences if necessary).</li>
                <li><b>Output Indicator:</b> Make sure the response is in a formal tone and includes at least two case studies.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'practice',
          title: 'Practice Exercise',
          icon: '👩‍💻',
          duration: '3 min',
          description: 'Practice breaking down the four elements of a prompt',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">👩‍💻 Practice Exercise</h3>
              <p>Now, try breaking down the following prompt into the four elements, and think about how you could improve it:</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>Practice Prompt:</strong><br/>
                "You are a customer service representative at a premium e-commerce company. Write a professional response to a customer complaint about a delayed order. The customer has been waiting for 10 days beyond the promised delivery date for their anniversary gift. Apologize sincerely for the delay, explain the reason (shipping partner issues), offer a meaningful solution (expedited delivery + discount), and maintain the company's reputation for excellent customer service."
              </blockquote>
              <p className="mt-2 font-semibold">✅ Enhanced Analysis Solution</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Instruction:</b> You are a customer service representative at a premium e-commerce company. Write a professional response to a customer complaint about a delayed order.</li>
                <li><b>Context:</b> The customer has been waiting for 10 days beyond the promised delivery date for their anniversary gift.</li>
                <li><b>Input Data:</b> Specific delay timeframe (10 days), occasion (anniversary gift), reason (shipping partner issues), and company positioning (premium e-commerce).</li>
                <li><b>Output Indicator:</b> Apologize sincerely, explain the reason, offer a meaningful solution (expedited delivery + discount), and maintain the company's reputation for excellent customer service.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'quiz',
          title: 'Quiz',
          icon: '📝',
          duration: '5 min',
          description: 'Complete the following multiple-choice questions to test your understanding of prompt structure.',
          type: 'quiz',
          content: <QuizCard questions={enQuizQuestions} isZhTW={false} />
        },
      ]
    },
  ],
  'zh-TW': [
    {
      group: '課堂 2：優質提示結構',
      groupIcon: '🧩',
      items: [
        {
          key: 'instruction',
          title: '指令',
          icon: '🔍',
          duration: '3分鐘',
          description: '告訴AI要做什麼，明確行動要求和目標。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">指令</h3>
              <p>這一部分是告訴模型要做什麼，是最基本的部分。指令能夠確保模型能夠理解你的需求，並且朝著正確的方向去生成內容。</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>專業範例：</strong><br/>
                "您是一位資深的職業顧問和LinkedIn專家。請為一位主修數據科學的大學生撰寫一份具有說服力的LinkedIn個人摘要，該學生正在尋求一個遠程實習機會。請確保摘要能夠突出其技術能力、學習熱忱和對初創公司文化的適應性。"
              </blockquote>
              <p className="mt-2 font-semibold">分析：</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>角色明確：</b>指定了「資深職業顧問」和「LinkedIn專家」兩重身份，提供專業權威感。</li>
                <li><b>行動要求：</b>明確指示要撰寫「具有說服力的LinkedIn個人摘要」，目標清晰。</li>
                <li><b>目標受眾：</b>指定了「主修數據科學的大學生」，幫助AI理解內容方向。</li>
                <li><b>具體目標：</b>「尋求遠程實習機會」給予了明確的職業目標框架。</li>
              </ul>
            </div>
          )
        },
        {
          key: 'context',
          title: '背景',
          icon: '🔍',
          duration: '2分鐘',
          description: '給AI背景資料，讓它明白情境。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">背景</h3>
              <p>背景提供了重要的情境，幫助AI理解需求和情境，並且讓生成的內容更加相關和有深度。沒有背景的話，生成的內容可能會失去焦點。</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>詳細背景範例：</strong><br/>
                "該學生在過去兩年中累積了豐富的Python和機器學習經驗，包括完成了三個主要項目和兩次實習。他特別希望在充滿創新精神的初創公司環境中工作，渴望參與產品開發的早期階段，並且願意接受快節奏的工作挑戰。此外，他對遠程工作模式非常適應，具備良好的自我管理和溝通能力。"
              </blockquote>
              <p className="mt-2 font-semibold">分析：</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>時間框架：</b>「過去兩年」提供了經驗的時間深度，增加可信度。</li>
                <li><b>具體經驗：</b>「三個主要項目和兩次實習」給予了量化的成就背景。</li>
                <li><b>工作偏好：</b>明確表達對初創公司環境的偏好和原因。</li>
                <li><b>適應能力：</b>突出了遠程工作和自我管理的能力，符合現代職場需求。</li>
              </ul>
            </div>
          )
        },
        {
          key: 'input-data',
          title: '輸入數據',
          icon: '🔍',
          duration: '2分鐘',
          description: '提供具體資料或數據，讓AI生成更精準內容。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">輸入數據</h3>
              <p>這部分是指你給AI提供的具體資料或數據，可以是一個資料集、一段文字或者其他補充資料，幫助模型生成更具體和精準的內容。</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"You have access to a dataset with Pacific Ocean temperature records and sea level measurements."</blockquote>
              <p className="mt-2 font-semibold">分析：</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>資料：這部分提供了具體的數據集（Pacific Ocean temperature records 和 sea level measurements）。雖然這個例子跟背景和職位無關，但可以理解為AI在撰寫履歷或者文章時，可能需要背景數據來支持它的分析或建議。</li>
                <li>作用：數據用來支持論點、例子或具體分析，提供精準的參考。</li>
              </ul>
            </div>
          )
        },
        {
          key: 'output-indicator',
          title: '輸出指標',
          icon: '🔍',
          duration: '2分鐘',
          description: '定義答案格式、語氣、長度等。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">輸出指標</h3>
              <p>輸出指標指定了生成內容的格式、風格、長度或者其他要求，從而讓AI知道應該生成怎樣的內容。</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"Make sure the response is in a formal tone and includes at least two case studies."</blockquote>
              <p className="mt-2 font-semibold">分析：</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>風格要求：強調生成的內容要有「正式語氣」，這個能夠幫助AI確保產生的內容適合專業用途，例如履歷或者工作申請。</li>
                <li>具體要求：包括至少兩個具體的「案例研究」，這個讓AI明確知道要有實際範例，增加說服力。</li>
              </ul>
            </div>
          )
        },
        {
          key: 'full-examples',
          title: '綜合範例 Prompt（完整結構）',
          icon: '🧠',
          duration: '2分鐘',
          description: '完整結構示範',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2"> 綜合範例 Prompt（完整結構）</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Instruction:</b> You are a career advisor. Write a persuasive LinkedIn summary for a student majoring in data science who is seeking a remote internship.</li>
                <li><b>Context:</b> The student has experience in Python and machine learning, and wants to work in a startup.</li>
                <li><b>Input Data:</b> N/A (This example doesn't require specific data like temperature records, but could include a list of skills or project experiences if necessary).</li>
                <li><b>Output Indicator:</b> Make sure the response is in a formal tone and includes at least two case studies.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'practice',
          title: '練習：拆解與理解',
          icon: '👩‍💻',
          duration: '3分鐘',
          description: '練習拆解Prompt四大元素',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">👩‍💻 練習：拆解與理解</h3>
              <p>現在，你可以練習將下面的 Prompt 拆解成四個元素，並思考如何優化：</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>進階練習題：</strong><br/>
                「你是一位高級電商客戶服務代表。請專業回應一位客戶對於超過承諾交付日期10天的訂單延遲投訴。客戶正在等待重要的週年紀念禮物。請真誠地為延遲道歉，解釋原因（物流合作夥伴問題），提供有意義的解決方案（加急配送+折扣補償），並維護公司在優質客戶服務方面的聲譽。」
              </blockquote>
              <p className="mt-2 font-semibold">✅ 增強版答案拆解範例</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>指令：</b>你是一位高級電商客戶服務代表。請專業回應一位客戶對於訂單延遲的投訴。</li>
                <li><b>背景：</b>客戶等待超過承諾交付日期10天的重要週年紀念禮物。</li>
                <li><b>輸入數據：</b>具體延遲時間框架（10天）、場合（週年紀念禮物）、原因（物流合作夥伴問題）、公司定位（高級電商）。</li>
                <li><b>輸出指標：</b>真誠道歉，解釋原因，提供有意義的解決方案（加急配送+折扣補償），並維護公司優質客戶服務聲譽。</li>
              </ul>
            </div>
          )
        },
        {
          key: 'quiz',
          title: '小測驗',
          icon: '📝',
          duration: '5分鐘',
          description: '完成以下選擇題，測試你對優質提示結構的理解。',
          type: 'quiz',
          content: <QuizCard questions={zhQuizQuestions} isZhTW={true} />
        },
      ]
    }
  ]
};



const PromptEngineeringLesson2: React.FC = memo(() => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-TW';
  const [selectedKey, setSelectedKey] = useState(() => {
    const sections = isZhTW ? lesson2Sections['zh-TW'] : lesson2Sections.en;
    return sections[0]?.items?.[0]?.key || '';
  });
  
  // 記憶化 sections 避免不必要重新計算
  const sections = useMemo(() => 
    isZhTW ? lesson2Sections['zh-TW'] : lesson2Sections.en, 
    [isZhTW]
  );

  // 使用來自 LessonContent 的 hooks
  const { isCompleted } = useLessonCompletion();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="flex pt-20">
        <LessonSidebar
          sections={sections}
          selectedKey={selectedKey}
          onSelectItem={setSelectedKey}
          isZhTW={isZhTW}
          isCompleted={isCompleted}
        />
        <LessonContent
          sections={sections}
          selectedKey={selectedKey}
          onSelectItem={setSelectedKey}
          isZhTW={isZhTW}
        />
      </div>
    </div>
  );
});

PromptEngineeringLesson2.displayName = 'PromptEngineeringLesson2';

export default PromptEngineeringLesson2; 