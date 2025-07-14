import React, { useState, useMemo, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/course/QuizCard';
import LessonSidebar from '@/components/course/LessonSidebar';
import LessonContent, { useLessonCompletion } from '@/components/course/LessonContent';
import type { LessonItem, LessonSection } from '@/components/course/LessonSidebar';
import type { QuizQuestion } from '@/components/course/QuizCard';

// Quiz ?��?定義

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
    q: '1. 以�??��??�是寫好?�示?��?佳�?法�?',
    options: [
      '確�??�示?�容?��?清晰，並?�含?�景資�?',
      '?��?模�??�示，�?AI?�由?�揮',
      '?��??��??��?語�?強調?��???,
      '?��?設置任�??��??�制',
    ],
    answer: 0,
  },
  {
    q: '2. ?��??��?AI中�?角色?��?（Role-play）�?示�?主�??��??��?',
    options: [
      '引�?AI?��??��?角色，幫?��??�更貼�??�求�??�容',
      '讓AI?�自?�選?��??��??��?答風??,
      '減�?AI?�?�?�輸?�數?��?',
      '測試AI?�創?�性�??�輯?��?',
    ],
    answer: 0,
  },
  {
    q: '3. 要�?高�??��?AI?��?示�??��?以�??�個�?素�??��?要�?',
    options: [
      '?��??��??��?下�??�數?��?確�??�示?�根?��?',
      '輸入多個模糊�?清�??�令，�??�AI?�造�?,
      '?��?供�?簡單?��?令�??��??��?詳細要�?',
      '強調使用高深?��?業�?語�??�戰模�??��?�?��??,
    ],
    answer: 0,
  },
  {
    q: '4. ?�編寫�?示�?，�?何設�?輸出?��?"（Output Indicator）�??�於?��?AI?��??�適?��??��?',
    options: [
      '定義輸出?��?�?��風?�、長度、格式�?要�?',
      '?��?求AI?��?簡短?��??��?不設?��?要�?',
      '?��?大�??��?但�??�設置具體�?�?,
      '?��?求�??��??�隨機�??��?',
    ],
    answer: 0,
  },
  {
    q: '5. ?��?示工程工?�中，哪?��??�幫?�使?�者改?��?示�??��?�?,
    options: [
      '?��??��??��?，�?使用?�調?��?示以?�到?�佳�???,
      '幫助使用?��??�數?��?以支?��??�內�?,
      '?��?將�?示�?寫�?程�?�?,
      '?�制?�示?�能?�照?��??��??��?輸入',
    ],
    answer: 0,
  },
];




const lesson2Sections: { en: LessonSection[], 'zh-HK': LessonSection[] } = {
  en: [
    {
      group: 'Lesson 2: Prompt Structure',
      groupIcon: '?��',
      items: [
        {
          key: 'instruction',
          title: 'Instruction',
          icon: '??',
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
          icon: '??',
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
          icon: '??',
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
          icon: '??',
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
          icon: '??',
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
          icon: '?��?��??,
          duration: '3 min',
          description: 'Practice breaking down the four elements of a prompt',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?��?��??Practice Exercise</h3>
              <p>Now, try breaking down the following prompt into the four elements, and think about how you could improve it:</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>Practice Prompt:</strong><br/>
                "You are a customer service representative at a premium e-commerce company. Write a professional response to a customer complaint about a delayed order. The customer has been waiting for 10 days beyond the promised delivery date for their anniversary gift. Apologize sincerely for the delay, explain the reason (shipping partner issues), offer a meaningful solution (expedited delivery + discount), and maintain the company's reputation for excellent customer service."
              </blockquote>
              <p className="mt-2 font-semibold">??Enhanced Analysis Solution</p>
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
          icon: '??',
          duration: '5 min',
          description: 'Complete the following multiple-choice questions to test your understanding of prompt structure.',
          type: 'quiz',
          content: <QuizCard questions={enQuizQuestions} isZhTW={false} />
        },
      ]
    },
  ],
  'zh-HK': [
    {
      group: '課�? 2：優質�?示�?�?,
      groupIcon: '?��',
      items: [
        {
          key: 'instruction',
          title: '?�令',
          icon: '??',
          duration: '3?��?',
          description: '?�訴AI要�?什麼�??�確行�?要�??�目標�?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?�令</h3>
              <p>?��??��??��?訴模?��??��?麼�??��??�本?�部?�。�?令能夠確保模?�能夠�?�???��?求�?並�??��?�?��?�方?�去?��??�容??/p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>專業範�?�?/strong><br/>
                "?�是一位�?深�??�業顧�??�LinkedIn專家?��??��?位主修數?��?學�?大學?�撰寫�?份具?�說?��??�LinkedIn?�人?��?，該學�?�?��尋�?一?��?程實習�??�。�?確�??��??��?突出?��?術能?�、學習熱忱�?對�??�公?��??��??��??��?
              </blockquote>
              <p className="mt-2 font-semibold">?��?�?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>角色?�確�?/b>?��?了「�?深職業顧?�」�??�LinkedIn專家?�兩?�身份�??��?專業權�??��?/li>
                <li><b>行�?要�?�?/b>?�確?�示要撰寫「具?�說?��??�LinkedIn?�人?��??��??��?清晰??/li>
                <li><b>?��??�眾�?/b>?��?了「主修數?��?學�?大學?�」�?幫助AI?�解?�容?��???/li>
                <li><b>?��??��?�?/b>?��?求�?程實習�??�」給予�??�確?�職業目標�??��?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'context',
          title: '?�景',
          icon: '??',
          duration: '2?��?',
          description: '給AI?�景資�?，�?它�??��?境�?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?�景</h3>
              <p>?�景?��?了�?要�??��?，幫?�AI?�解?�求�??��?，並且�??��??�內容更?�相?��??�深度。�??��??��?話�??��??�內容可?��?失去?��???/p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>詳細?�景範�?�?/strong><br/>
                "該學?�在?�去?�年中累積�?豐�??�Python?��??�學習�?驗�??�括完�?了�??�主要�??��??�次實�??��??�別希�??��?滿創?�精神�??�創?�司?��?中工作�?渴�??��??��??�發?�早?��?段�?並�?願�??��?快�?奏�?工�??�戰?�此外�?他�??��?工�?模�??�常?��?，具?�良好�??��?管�??��??�能?��?
              </blockquote>
              <p className="mt-2 font-semibold">?��?�?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>?��?框架�?/b>?��??�兩年」�?供�?經�??��??�深度�?增�??�信度�?/li>
                <li><b>?��?經�?�?/b>?��??�主要�??��??�次實�??�給予�??��??��?就�??��?/li>
                <li><b>工�??�好�?/b>?�確表�?對�??�公?�環境�??�好?��??��?/li>
                <li><b>?��??��?�?/b>突出了�?程工作�??��?管�??�能?��?符�??�代?�場?�求�?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'input-data',
          title: '輸入?��?',
          icon: '??',
          duration: '2?��?',
          description: '?��??��?資�??�數?��?讓AI?��??�精準內容�?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">輸入?��?</h3>
              <p>?�部?�是?��?給AI?��??�具體�??��??��?，可以是一?��??��??��?段�?字�??�其他�??��??��?幫助模�??��??�具體�?精�??�內容�?/p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"You have access to a dataset with Pacific Ocean temperature records and sea level measurements."</blockquote>
              <p className="mt-2 font-semibold">?��?�?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li>資�?：這部?��?供�??��??�數?��?（Pacific Ocean temperature records ??sea level measurements）。�??�這個�?子�??�景?�職位無?��?但可以�?�?��AI?�撰寫履歷�??��?章�?，可?��?要�??�數?��??��?它�??��??�建議�?/li>
                <li>作用：數?�用來支?��?點、�?子�??��??��?，�?供精準�??�考�?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'output-indicator',
          title: '輸出?��?',
          icon: '??',
          duration: '2?��?',
          description: '定義答�??��??��?�?��長度�???,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">輸出?��?</h3>
              <p>輸出?��??��?了�??�內容�??��??�風?�、長度�??�其他�?求�?從而�?AI?��??�該?��??�樣?�內容�?/p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"Make sure the response is in a formal tone and includes at least two case studies."</blockquote>
              <p className="mt-2 font-semibold">?��?�?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li>風格要�?：強調�??��??�容要�??�正式�?�?���??�個能夠幫?�AI確�??��??�內容適?��?業用?��?例�?履歷?�者工作申請�?/li>
                <li>?��?要�?：�??�至少兩?�具體�??��?例�?究」�??�個�?AI?�確?��?要�?實�?範�?，�??�說?��???/li>
              </ul>
            </div>
          )
        },
        {
          key: 'full-examples',
          title: '綜�?範�? Prompt（�??��?構�?',
          icon: '??',
          duration: '2?��?',
          description: '完整結�?示�?',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2"> 綜�?範�? Prompt（�??��?構�?</h3>
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
          title: '練�?：�?�???�解',
          icon: '?��?��??,
          duration: '3?��?',
          description: '練�??�解Prompt?�大?��?',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?��?��??練�?：�?�???�解</h3>
              <p>?�在，�??�以練�?將�??��? Prompt ?�解?��??��?素�?並思考�?何優?��?</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>?��?練�?題�?</strong><br/>
                ?��??��?位�?級電?�客?��??�代表。�?專業?��?一位客?��??��??�承諾交付日??0天�?訂單延遲?�訴?�客?�正?��?待�?要�??�年紀念禮?�。�??��??�為延遲?��?，解?��??��??��??��?夥伴?��?）�??��??��?義�?�?��?��?（�??��????�扣補�?）�?並維護公?�在?�質客戶?��??�面?�聲譽。�?
              </blockquote>
              <p className="mt-2 font-semibold">??增強?��?案�?�??�?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>?�令�?/b>你是一位�?級電?�客?��??�代表。�?專業?��?一位客?��??��??�延?��??�訴??/li>
                <li><b>?�景�?/b>客戶等�?超�??�諾交�??��?10天�??��??�年紀念禮?��?/li>
                <li><b>輸入?��?�?/b>?��?延遲?��?框架�?0天�??�場?��??�年紀念禮?��??��??��??��??��?夥伴?��?）、公?��?位�?高�??��?）�?/li>
                <li><b>輸出?��?�?/b>?��??��?，解?��??��??��??��?義�?�?��?��?（�??��????�扣補�?）�?並維護公?�優質客?��??�聲譽�?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'quiz',
          title: '小測�?,
          icon: '??',
          duration: '5?��?',
          description: '完�?以�??��?題�?測試你�??�質?�示結�??��?�?�?,
          type: 'quiz',
          content: <QuizCard questions={zhQuizQuestions} isZhTW={true} />
        },
      ]
    }
  ]
};



const PromptEngineeringLesson2: React.FC = memo(() => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  const [selectedKey, setSelectedKey] = useState(() => {
    const sections = isZhTW ? lesson2Sections['zh-HK'] : lesson2Sections.en;
    return sections[0]?.items?.[0]?.key || '';
  });
  
  // 記憶??sections ?��?不�?要�??��?�?
  const sections = useMemo(() => 
    isZhTW ? lesson2Sections['zh-HK'] : lesson2Sections.en, 
    [isZhTW]
  );

  // 使用來自 LessonContent ??hooks
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
