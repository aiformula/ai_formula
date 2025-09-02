import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, Clock, 
  Trophy, Target, Star, BookOpen, Users, TrendingUp, Award, Zap, Check,
  Brain, Play
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizData {
  [key: number]: {
    title: string;
    description: string;
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit: number; // 分鐘
  }
}

const ChatGPTCompleteCourseQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { themeId } = useParams<{ themeId: string }>();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  const { completeQuiz, isThemeCompleted, getThemeProgress } = useChatGPTProgress();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentThemeId = parseInt(themeId || '1');

  // Quiz 數據定義
  const quizData: QuizData = {
    1: {
      title: isZhHK ? '第一章測驗：初見 ChatGPT - 基礎入門' : 'Chapter 1 Quiz: First Encounter with ChatGPT - Basic Introduction',
      description: isZhHK ? '測試您對 ChatGPT 基礎概念的理解，包括核心技術、使用方法和基本功能。' : 'Test your understanding of ChatGPT basic concepts, including core technology, usage methods and basic functions.',
      passingScore: 60,
      timeLimit: 15,
      questions: [
        {
          id: 1,
          question: isZhHK ? 'GPT 嘅全寫「Generative Pre-trained Transformer」，入面嘅 "Generative" (生成式) 係點解？' : 'GPT stands for "Generative Pre-trained Transformer", what does "Generative" mean?',
          options: [
            isZhHK ? '佢可以幫你理財同埋計數' : 'It can help you with financial management and calculations',
            isZhHK ? '佢可以根據指令創造出全新嘅文字內容' : 'It can create brand new text content based on instructions',
            isZhHK ? '佢嘅主要功能係過濾垃圾郵件' : 'Its main function is filtering spam emails',
            isZhHK ? '佢淨係識得將一種語言翻譯成另一種' : 'It only knows how to translate from one language to another'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '「生成式」指 ChatGPT 能夠創造和生成全新的文字內容，而不只是分類或判斷現有內容。這是它與判別式模型的主要區別。' : '"Generative" means ChatGPT can create and generate new text content, not just classify or judge existing content. This is the main difference from discriminative models.',
          difficulty: 'easy'
        },
        {
          id: 2,
          question: isZhHK ? '當你同 ChatGPT 傾偈嘅時候，如果想佢記得你之前講過嘅嘢，你應該點做？' : 'When chatting with ChatGPT, if you want it to remember what you said before, what should you do?',
          options: [
            isZhHK ? '每次提問都開一個全新嘅對話 (New Chat)' : 'Start a new chat (New Chat) for every question',
            isZhHK ? '喺同一個對話視窗入面繼續傾落去' : 'Continue the conversation in the same chat window',
            isZhHK ? '每問一條問題就重新整理一次網頁' : 'Refresh the webpage after asking each question',
            isZhHK ? '無論點做，佢都唔會記得之前嘅對話' : 'No matter what you do, it won\'t remember previous conversations'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? 'ChatGPT 在同一個對話視窗中具有對話記憶功能，能記住之前的內容。但如果開新對話，它就不會記得之前的內容了。' : 'ChatGPT has conversation memory within the same chat window and can remember previous content. But if you start a new conversation, it won\'t remember previous content.',
          difficulty: 'easy'
        },
        {
          id: 3,
          question: isZhHK ? '關於 ChatGPT Plus 會員版同免費版嘅分別，以下邊個講法最準確？' : 'Regarding the difference between ChatGPT Plus subscription and free version, which statement is most accurate?',
          options: [
            isZhHK ? '兩者用嘅模型完全一樣，只係 Plus 版速度快啲' : 'Both use exactly the same model, Plus version is just faster',
            isZhHK ? 'Plus 版通常可以用到更新、更強大嘅語言模型 (例如 GPT-4)，而且喺繁忙時間有優先使用權' : 'Plus version usually has access to newer, more powerful language models (like GPT-4), and has priority access during busy times',
            isZhHK ? '只有 Plus 版先可以問問題，免費版淨係可以睇人哋嘅對話' : 'Only Plus version can ask questions, free version can only view others\' conversations',
            isZhHK ? 'Plus 版無字數限制，免費版每次回答唔可以超過10個字' : 'Plus version has no word limit, free version cannot exceed 10 words per response'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? 'ChatGPT Plus 的主要優勢是可使用更先進的模型（如GPT-4）、在高峰時段有優先訪問權，以及獲得新功能的早期體驗。' : 'The main advantages of ChatGPT Plus are access to more advanced models (like GPT-4), priority access during peak hours, and early access to new features.',
          difficulty: 'medium'
        },
        {
          id: 4,
          question: isZhHK ? '如果你發現 ChatGPT 俾你嘅答案唔係好啱心水，最直接有效嘅改善方法係咩？' : 'If you find that ChatGPT\'s answers don\'t quite meet your expectations, what\'s the most direct and effective way to improve?',
          options: [
            isZhHK ? '放棄呢個問題，再試另一個完全唔同嘅問題' : 'Give up on this question and try a completely different one',
            isZhHK ? '關閉瀏覽器然後再重新開一次' : 'Close the browser and reopen it',
            isZhHK ? '提供更清晰、更具體嘅指示或者追問，引導佢俾出更好嘅答案' : 'Provide clearer, more specific instructions or follow-up questions to guide it towards better answers',
            isZhHK ? '投訴 OpenAI 客服，話個答案唔好' : 'Complain to OpenAI customer service about the poor answer'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? '改善 ChatGPT 回答質量的最有效方法是提供更清晰具體的指示，或透過追問來引導它提供更符合需求的答案。這種「提示工程」技巧非常重要。' : 'The most effective way to improve ChatGPT\'s response quality is to provide clearer and more specific instructions, or use follow-up questions to guide it towards answers that better meet your needs. This "prompt engineering" skill is very important.',
          difficulty: 'medium'
        },
        {
          id: 5,
          question: isZhHK ? 'ChatGPT 嘅知識庫有咩主要限制？' : 'What is the main limitation of ChatGPT\'s knowledge base?',
          options: [
            isZhHK ? '佢嘅知識只係更新到某個特定日期，對於之後發生嘅事可能唔知道' : 'Its knowledge is only updated to a specific date, and it may not know about events that happened after',
            isZhHK ? '佢完全唔識科學同數學嘅知識' : 'It doesn\'t know any scientific or mathematical knowledge',
            isZhHK ? '佢只可以理解英文，唔明其他語言' : 'It can only understand English and doesn\'t know other languages',
            isZhHK ? '佢嘅資料庫每日都會清空一次' : 'Its database is cleared once every day'
          ],
          correctAnswer: 0,
          explanation: isZhHK ? 'ChatGPT 的知識有一個「知識截止日期」，對於該日期之後發生的最新事件或資訊，它可能不了解或資訊不準確。這是使用時需要注意的重要限制。' : 'ChatGPT has a "knowledge cutoff date", and it may not know about or have inaccurate information about the latest events or information that occurred after that date. This is an important limitation to be aware of when using it.',
          difficulty: 'easy'
        }
      ]
    },
    2: {
      title: isZhHK ? '第二章測驗：提問的藝術 - 高效 Prompt Engineering' : 'Chapter 2 Quiz: The Art of Questioning - Efficient Prompt Engineering',
      description: isZhHK ? '測試您對 Prompt Engineering 的理解，包括有效提示詞的構建技巧和優化策略。' : 'Test your understanding of Prompt Engineering, including effective prompt construction techniques and optimisation strategies.',
      passingScore: 60,
      timeLimit: 18,
      questions: [
        {
          id: 1,
          question: isZhHK ? '你想 ChatGPT 幫你寫一封正式嘅求職信，以下邊一個 Prompt (提示) 係最好嘅？' : 'You want ChatGPT to help you write a formal job application letter. Which of the following prompts is the best?',
          options: [
            isZhHK ? '「寫信」' : '"Write a letter"',
            isZhHK ? '「幫我寫封求職信」' : '"Help me write a job application letter"',
            isZhHK ? '「假設你係一位專業嘅職業顧問，請幫我為『市場分析師』呢個職位寫一封求職信，內容要強調我數據分析同溝通嘅能力，風格要專業、誠懇。」' : '"Assume you are a professional career consultant. Please help me write a job application letter for the position of \'Market Analyst\', emphasizing my data analysis and communication skills, with a professional and sincere style."',
            isZhHK ? '「求職信應該點樣寫？」' : '"How should a job application letter be written?"'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? '最好的 Prompt 應該包含角色設定（職業顧問）、具體任務（為市場分析師職位寫求職信）、內容要求（強調特定技能）和風格指導（專業、誠懇）。這樣的詳細提示能讓 ChatGPT 生成更精確和有用的回答。' : 'The best prompt should include role setting (career consultant), specific task (writing a job application letter for market analyst position), content requirements (emphasizing specific skills), and style guidance (professional, sincere). Such detailed prompts enable ChatGPT to generate more precise and useful responses.',
          difficulty: 'easy'
        },
        {
          id: 2,
          question: isZhHK ? '喺 Prompt 入面加入「請用表格形式列出優點同缺點」，呢個係應用緊高效 Prompt 嘅邊一個核心元素？' : 'Adding "Please list the pros and cons in table format" in a prompt applies which core element of effective prompting?',
          options: [
            isZhHK ? '角色 (Role)' : 'Role',
            isZhHK ? '任務 (Task)' : 'Task',
            isZhHK ? '背景 (Context)' : 'Context',
            isZhHK ? '格式 (Format)' : 'Format'
          ],
          correctAnswer: 3,
          explanation: isZhHK ? '「請用表格形式列出」明確指定了輸出的格式要求，這屬於格式（Format）元素。好的 Prompt 應該清楚說明你希望得到什麼樣的輸出格式，如表格、列表、段落等。' : '"Please list in table format" clearly specifies the output format requirements, which belongs to the Format element. Good prompts should clearly state what kind of output format you want, such as tables, lists, paragraphs, etc.',
          difficulty: 'medium'
        },
        {
          id: 3,
          question: isZhHK ? '關於一個好嘅 Prompt，以下邊個講法係錯嘅？' : 'Regarding a good prompt, which of the following statements is WRONG?',
          options: [
            isZhHK ? '提供充足嘅背景資料有助於生成更貼切嘅答案' : 'Providing sufficient background information helps generate more relevant answers',
            isZhHK ? '指派一個角色俾 ChatGPT，可以令答案風格更到位' : 'Assigning a role to ChatGPT can make the answer style more appropriate',
            isZhHK ? 'Prompt 應該盡量模糊同簡短，俾 AI 最大嘅發揮空間' : 'Prompts should be as vague and brief as possible to give AI maximum creative space',
            isZhHK ? '清晰咁講出你想要嘅任務係非常重要嘅' : 'Clearly stating the task you want is very important'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? '這個說法是錯誤的。好的 Prompt 應該清晰、具體和詳細，而不是模糊和簡短。具體的指示能幫助 AI 理解你的真正需求，生成更符合期望的結果。模糊的 Prompt 往往會導致不理想的輸出。' : 'This statement is wrong. Good prompts should be clear, specific, and detailed, not vague and brief. Specific instructions help AI understand your real needs and generate results that better meet expectations. Vague prompts often lead to unsatisfactory outputs.',
          difficulty: 'medium'
        },
        {
          id: 4,
          question: isZhHK ? '當你叫 ChatGPT 「扮演一個5歲小朋友」去解釋黑洞，呢個技巧主要係運用緊 Prompt 工程入面嘅咩元素？' : 'When you ask ChatGPT to "act like a 5-year-old child" to explain black holes, which element of prompt engineering are you mainly using?',
          options: [
            isZhHK ? '角色 (Role)' : 'Role',
            isZhHK ? '格式 (Format)' : 'Format',
            isZhHK ? '任務 (Task)' : 'Task',
            isZhHK ? '範例 (Example)' : 'Example'
          ],
          correctAnswer: 0,
          explanation: isZhHK ? '「扮演一個5歲小朋友」是在為 ChatGPT 設定角色（Role），這會影響它的回答風格、語言複雜度和表達方式。角色設定是 Prompt 工程中的重要元素，能讓 AI 以特定的身份和視角來回答問題。' : '"Act like a 5-year-old child" is setting a role for ChatGPT, which affects its response style, language complexity, and expression. Role setting is an important element in prompt engineering that allows AI to answer questions from a specific identity and perspective.',
          difficulty: 'easy'
        },
        {
          id: 5,
          question: isZhHK ? '如果 ChatGPT 第一次嘅答案唔夠好，你點樣「追問」去優化佢？' : 'If ChatGPT\'s first answer is not good enough, how should you "follow up" to optimise it?',
          options: [
            isZhHK ? '直接話「你錯喇」，然後唔再追問' : 'Directly say "you are wrong" and stop asking',
            isZhHK ? '開一個新對話，問完全一樣嘅問題' : 'Start a new conversation and ask exactly the same question',
            isZhHK ? '喺原有答案基礎上，提出更具體嘅要求，例如「好好，但可唔可以寫得再簡單啲，同埋加多兩個例子？」' : 'Build on the original answer with more specific requirements, such as "Good, but can you make it simpler and add two more examples?"',
            isZhHK ? '將佢嘅答案複製再貼上一次，睇下會唔會唔同' : 'Copy and paste its answer again to see if it will be different'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? '最有效的追問方式是在原有答案基礎上提出具體的改善要求。這種方法保持了對話的連續性，讓 ChatGPT 能理解你的具體需求，並在原有基礎上進行優化。給出具體的改善方向比簡單的否定更有建設性。' : 'The most effective follow-up method is to make specific improvement requests based on the original answer. This approach maintains conversation continuity, allows ChatGPT to understand your specific needs, and optimise based on the original foundation. Giving specific improvement directions is more constructive than simple negation.',
          difficulty: 'medium'
        }
      ]
    },
    3: {
      title: isZhHK ? '第三章測驗：生活與工作 - 日常實用場景' : 'Chapter 3 Quiz: Life and Work - Daily Practical Scenarios',
      description: isZhHK ? '測試您在日常生活和工作中應用 ChatGPT 的實用技巧。' : 'Test your practical skills in applying ChatGPT in daily life and work.',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          id: 1,
          question: isZhHK ? '你想 ChatGPT 幫你總結一篇好長嘅網上新聞，你最基本要提供啲咩俾佢？' : 'If you want ChatGPT to help you summarize a long online news article, what do you basically need to provide?',
          options: [
            isZhHK ? '新聞發佈嘅日期同時間' : 'The publication date and time of the news',
            isZhHK ? '新聞嘅標題，或者成篇新聞嘅文字內容/網址' : 'The news title, or the complete text content/URL of the news',
            isZhHK ? '寫呢篇新聞嘅記者個名' : 'The name of the journalist who wrote the news',
            isZhHK ? '你自己對呢篇新聞嘅睇法' : 'Your own opinion about the news'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '要讓 ChatGPT 總結新聞，最基本需要提供新聞的實際內容，可以是標題、完整文字內容或網址，這樣 AI 才能分析和總結新聞的重點。' : 'To have ChatGPT summarize news, you basically need to provide the actual news content, which can be the title, complete text content or URL, so the AI can analyze and summarize the key points.',
          difficulty: 'easy'
        },
        {
          id: 2,
          question: isZhHK ? '你叫 ChatGPT 幫手寫一封投訴電郵，除咗講清楚投訴嘅事，提供邊樣嘢最可以令封信寫得更好？' : 'When asking ChatGPT to help write a complaint email, besides clearly stating the complaint, what can you provide to make the letter better?',
          options: [
            isZhHK ? '你今日嘅心情' : 'Your mood today',
            isZhHK ? '你希望封信嘅語氣係點 (例如：強硬但有禮貌)，同埋你想要達到咩目的 (例如：要求退款)' : 'Your desired tone for the letter (e.g., firm but polite), and what goal you want to achieve (e.g., request refund)',
            isZhHK ? '隨便一個電郵地址' : 'Any random email address',
            isZhHK ? '你屋企人嘅電話號碼' : 'Your family member\'s phone number'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '提供期望的語氣和目標能讓 ChatGPT 寫出更有效的投訴信。明確的語氣指導（如強硬但有禮貌）和具體目標（如退款、道歉等）能讓信件更有針對性和說服力。' : 'Providing the desired tone and goal allows ChatGPT to write a more effective complaint letter. Clear tone guidance (like firm but polite) and specific goals (like refund, apology, etc.) make the letter more targeted and persuasive.',
          difficulty: 'medium'
        },
        {
          id: 3,
          question: isZhHK ? '以下邊一項任務，目前嘅 ChatGPT（單純嘅文字模型）本身係做唔到嘅？' : 'Which of the following tasks cannot be performed by current ChatGPT (pure text model) itself?',
          options: [
            isZhHK ? '將一段中文錄音檔直接轉成文字' : 'Convert a Chinese audio file directly to text',
            isZhHK ? '檢查一段 Python 程式碼有冇語法錯誤' : 'Check a Python code for syntax errors',
            isZhHK ? '寫一首關於夏天嘅十四行詩' : 'Write a sonnet about summer',
            isZhHK ? '將一段法文翻譯成德文' : 'Translate French text to German'
          ],
          correctAnswer: 0,
          explanation: isZhHK ? 'ChatGPT 是純文字模型，無法直接處理音頻文件。它可以檢查代碼、寫詩、翻譯文字，但需要其他工具來處理音頻轉文字的任務。' : 'ChatGPT is a pure text model and cannot directly process audio files. It can check code, write poetry, and translate text, but needs other tools to handle audio-to-text conversion.',
          difficulty: 'medium'
        },
        {
          id: 4,
          question: isZhHK ? '你想用 ChatGPT 學習一種新語言（例如日文），以下邊個係一個好嘅應用方法？' : 'If you want to use ChatGPT to learn a new language (e.g., Japanese), which is a good application method?',
          options: [
            isZhHK ? '叫佢幫你設計一個學習計劃，同埋進行角色扮演對話練習' : 'Ask it to design a learning plan and conduct role-playing conversation practice',
            isZhHK ? '淨係用佢嚟查字典' : 'Only use it as a dictionary',
            isZhHK ? '叫佢直接將成個日文文法系統一次過俾你' : 'Ask it to give you the entire Japanese grammar system all at once',
            isZhHK ? '叫佢幫你考日文能力試' : 'Ask it to help you take the Japanese proficiency test'
          ],
          correctAnswer: 0,
          explanation: isZhHK ? '最有效的方法是讓 ChatGPT 設計個人化學習計劃並進行互動練習。這樣可以循序漸進地學習，通過對話練習來提高實際應用能力。' : 'The most effective method is to have ChatGPT design a personalized learning plan and conduct interactive practice. This allows gradual learning and improves practical application skills through conversation practice.',
          difficulty: 'easy'
        },
        {
          id: 5,
          question: isZhHK ? '關於利用 ChatGPT 進行「腦力激盪」(Brainstorming)，以下講法邊個最貼切？' : 'Regarding using ChatGPT for "Brainstorming", which statement is most accurate?',
          options: [
            isZhHK ? '佢只可以提供一個最終答案，唔識得俾好多唔同嘅建議' : 'It can only provide one final answer, cannot give many different suggestions',
            isZhHK ? '你可以俾佢一個主題（例如：環保主題嘅公司活動），叫佢諗出10個唔同嘅創意點子' : 'You can give it a topic (e.g., eco-friendly company activities) and ask it to come up with 10 different creative ideas',
            isZhHK ? '腦力激盪功能只係 Plus 會員先有' : 'Brainstorming function is only available for Plus members',
            isZhHK ? '佢諗出嚟嘅主意通常都好唔實際，無參考價值' : 'The ideas it generates are usually impractical and have no reference value'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? 'ChatGPT 非常擅長腦力激盪，可以根據給定主題快速生成多個創意想法。只要提供清楚的主題和要求，它就能提供多樣化和實用的建議。' : 'ChatGPT excels at brainstorming and can quickly generate multiple creative ideas based on a given topic. As long as you provide a clear topic and requirements, it can offer diverse and practical suggestions.',
          difficulty: 'easy'
        }
      ]
    },
    4: {
      title: isZhHK ? '第四章測驗：釋放潛能 - 進階功能與技巧' : 'Chapter 4 Quiz: Unleashing Potential - Advanced Features and Techniques',
      description: isZhHK ? '測試您對 ChatGPT 進階功能和高級應用技巧的掌握程度。' : 'Test your mastery of ChatGPT advanced features and high-level application techniques.',
      passingScore: 70,
      timeLimit: 25,
      questions: [
        {
          id: 1,
          question: isZhHK ? '你係一個學生，想 ChatGPT 之後回答你所有問題嗰陣，都用比較學術、嚴謹嘅風格，並且以繁體中文回答。你應該用咩功能去設定呢個長遠嘅要求？' : 'As a student, you want ChatGPT to always answer all your questions in an academic, rigorous style and in Traditional Chinese. What function should you use to set this long-term requirement?',
          options: [
            isZhHK ? '每次提問前都重複打一次「請用學術風格同繁體中文回答」' : 'Repeat "Please answer in academic style and Traditional Chinese" before every question',
            isZhHK ? '用「Custom Instructions (自訂指令)」功能一次過設定好' : 'Use "Custom Instructions" feature to set it once',
            isZhHK ? '登出再登入，系統就會自動調整' : 'Log out and log in again, the system will adjust automatically',
            isZhHK ? '呢個係做唔到嘅，只可以逐次要求' : 'This cannot be done, can only request each time'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? 'Custom Instructions (自訂指令) 功能允許用戶一次性設定長期的對話偏好，包括回答風格、語言選擇等，讓 ChatGPT 在每次對話中都遵循這些設定。' : 'Custom Instructions feature allows users to set long-term conversation preferences once, including response style and language choice, making ChatGPT follow these settings in every conversation.',
          difficulty: 'medium'
        },
        {
          id: 2,
          question: isZhHK ? '關於創建一個屬於你自己嘅 GPT，以下邊個講法係啱嘅？' : 'Regarding creating your own GPT, which statement is correct?',
          options: [
            isZhHK ? '只有專業程式設計師先可以創建 GPT' : 'Only professional programmers can create GPTs',
            isZhHK ? '創建 GPT 嘅過程非常複雜，需要至少一個星期' : 'Creating a GPT is very complex and takes at least a week',
            isZhHK ? '你可以透過對話形式，用自然語言指示 ChatGPT 去創建一個有特定功能嘅 GPT，唔一定需要寫程式碼' : 'You can create a GPT with specific functions through conversation using natural language, without necessarily writing code',
            isZhHK ? '所有自己創建嘅 GPT 都一定要公開俾全世界嘅人用' : 'All self-created GPTs must be made public for everyone to use'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? 'ChatGPT 允許用戶通過自然語言對話來創建自定義 GPT，過程相對簡單直觀，不需要編程知識，也可以選擇是否公開分享。' : 'ChatGPT allows users to create custom GPTs through natural language conversation, with a relatively simple and intuitive process that requires no programming knowledge, and you can choose whether to share publicly.',
          difficulty: 'medium'
        },
        {
          id: 3,
          question: isZhHK ? 'ChatGPT 嘅「Advanced Data Analysis (進階數據分析)」功能最適合處理以下邊一項任務？' : 'Which task is most suitable for ChatGPT\'s "Advanced Data Analysis" function?',
          options: [
            isZhHK ? '問佢「宇宙嘅意義係咩？」' : 'Ask it "What is the meaning of the universe?"',
            isZhHK ? '上傳一個 Excel 銷售數據檔案，叫佢分析趨勢並畫一個棒形圖 (bar chart)' : 'Upload an Excel sales data file and ask it to analyze trends and create a bar chart',
            isZhHK ? '叫佢寫一篇感人嘅愛情小說' : 'Ask it to write a touching love story',
            isZhHK ? '即時查詢紐約而家幾多點' : 'Real-time query of current time in New York'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? 'Advanced Data Analysis 功能專門用於處理和分析數據文件，可以上傳文檔進行數據分析、創建圖表和執行統計計算，非常適合處理 Excel 等數據文件。' : 'Advanced Data Analysis function is specifically designed for processing and analyzing data files, allowing file uploads for data analysis, chart creation, and statistical calculations, making it ideal for handling Excel and other data files.',
          difficulty: 'easy'
        },
        {
          id: 4,
          question: isZhHK ? '喺 GPT Store 入面，你搵到一個專門用嚟「優化旅行路線」嘅 GPT。呢個 GPT 同普通 ChatGPT 相比，最大嘅優點可能係咩？' : 'In the GPT Store, you find a GPT specifically for "optimizing travel routes". What might be the biggest advantage of this GPT compared to regular ChatGPT?',
          options: [
            isZhHK ? '佢回答速度一定快幾倍' : 'It definitely answers several times faster',
            isZhHK ? '佢被預先設定好特定嘅知識同指令，可以更專業、更有效率咁處理旅行規劃嘅問題' : 'It is pre-configured with specific knowledge and instructions, enabling more professional and efficient handling of travel planning issues',
            isZhHK ? '佢識得講全世界所有語言' : 'It can speak all languages in the world',
            isZhHK ? '佢可以幫你直接訂機票同酒店' : 'It can directly book flights and hotels for you'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '專門的 GPT 通常被預先配置了特定領域的知識、指令和工作流程，使其在處理相關任務時更加專業和高效，比通用 ChatGPT 更有針對性。' : 'Specialized GPTs are usually pre-configured with domain-specific knowledge, instructions, and workflows, making them more professional and efficient in handling related tasks, more targeted than general ChatGPT.',
          difficulty: 'medium'
        },
        {
          id: 5,
          question: isZhHK ? '你想用 Advanced Data Analysis 功能去分析一份 PDF 文件入面嘅文字內容，你嘅第一步應該係咩？' : 'If you want to use Advanced Data Analysis function to analyze text content in a PDF file, what should your first step be?',
          options: [
            isZhHK ? '將 PDF 嘅內容用口讀俾電腦聽' : 'Read the PDF content aloud to the computer',
            isZhHK ? '將成份 PDF 嘅文字複製，然後貼上對話框' : 'Copy all the PDF text and paste it into the chat box',
            isZhHK ? '用對話框左邊嘅「萬字夾」圖示上傳個 PDF 檔案' : 'Use the "paperclip" icon on the left side of the chat box to upload the PDF file',
            isZhHK ? '先將 PDF 轉成 Word 檔案先可以分析' : 'First convert the PDF to a Word file before analysis'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? 'Advanced Data Analysis 功能支持直接上傳 PDF 文件進行分析。使用對話框旁的上傳功能（通常是paperclip圖示）是最直接有效的方法。' : 'Advanced Data Analysis function supports direct PDF file upload for analysis. Using the upload feature next to the chat box (usually a paperclip icon) is the most direct and effective method.',
          difficulty: 'easy'
        }
      ]
    },
    5: {
      title: isZhHK ? '第五章測驗：創意無限 - 探索娛樂與創作' : 'Chapter 5 Quiz: Unlimited Creativity - Exploring Entertainment and Creation',
      description: isZhHK ? '測試您在創意寫作、娛樂互動和藝術創作方面的 ChatGPT 應用技巧。' : 'Test your ChatGPT application skills in creative writing, entertainment interaction, and artistic creation.',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          id: 1,
          question: isZhHK ? '你想 ChatGPT 幫你寫一個偵探故仔，為咗令故仔更精彩，喺 Prompt 入面提供邊啲元素效果最好？' : 'If you want ChatGPT to help write a detective story, what elements should you provide in the prompt to make the story more exciting?',
          options: [
            isZhHK ? '淨係講「寫個偵探故仔」' : 'Just say "write a detective story"',
            isZhHK ? '提供主角設定、案情背景、兇案現場線索，同埋想要嘅結局方向' : 'Provide character settings, case background, crime scene clues, and desired ending direction',
            isZhHK ? '提供你最鍾意嘅偵探個名' : 'Provide the name of your favorite detective',
            isZhHK ? '問佢識唔識寫偵探故仔' : 'Ask if it knows how to write detective stories'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '創作優質故事需要詳細的背景信息和創作指導。提供主角設定、案情背景、線索和結局方向能讓 ChatGPT 創作出更豐富、更有結構的故事。' : 'Creating quality stories requires detailed background information and creative guidance. Providing character settings, case background, clues, and ending direction enables ChatGPT to create richer, more structured stories.',
          difficulty: 'easy'
        },
        {
          id: 2,
          question: isZhHK ? '關於用 ChatGPT 進行文字角色扮演遊戲 (RPG)，以下描述何者正確？' : 'Regarding using ChatGPT for text-based role-playing games (RPG), which description is correct?',
          options: [
            isZhHK ? '呢個功能需要另外俾錢' : 'This function requires additional payment',
            isZhHK ? '你可以要求 ChatGPT 扮演「遊戲管理員」(GM)，由佢創造世界觀同劇情，你扮演冒險者進行互動' : 'You can ask ChatGPT to play "Game Master" (GM), creating worldview and storylines while you play as an adventurer for interaction',
            isZhHK ? 'ChatGPT 只可以扮演好人角色，唔可以扮演壞人' : 'ChatGPT can only play good characters, not villains',
            isZhHK ? '遊戲一旦開始就唔可以中途停低' : 'Once the game starts, it cannot be paused midway'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? 'ChatGPT 可以很好地扮演遊戲管理員角色，創造豐富的世界觀、劇情和各種角色（包括反派），與玩家進行互動式的角色扮演遊戲，而且可以隨時暫停或調整。' : 'ChatGPT can effectively play the game master role, creating rich worldviews, storylines, and various characters (including villains), engaging in interactive role-playing games with players, and can be paused or adjusted anytime.',
          difficulty: 'medium'
        },
        {
          id: 3,
          question: isZhHK ? '「請用金庸武俠小說嘅風格，寫一段關於兩個高手喺竹林對決嘅描寫。」呢個 Prompt 係想測試 ChatGPT 嘅咩能力？' : '"Please write a description of two masters dueling in a bamboo forest in the style of Jin Yong\'s martial arts novels." What ability of ChatGPT does this prompt aim to test?',
          options: [
            isZhHK ? '模仿特定風格同語氣嘅能力' : 'Ability to mimic specific styles and tones',
            isZhHK ? '翻譯文言文嘅能力' : 'Ability to translate classical Chinese',
            isZhHK ? '總結小說內容嘅能力' : 'Ability to summarize novel content',
            isZhHK ? '認識歷史人物嘅能力' : 'Knowledge of historical figures'
          ],
          correctAnswer: 0,
          explanation: isZhHK ? '這個 Prompt 主要測試 ChatGPT 模仿特定作家風格的能力。要求以金庸的寫作風格創作武俠場景，需要 AI 理解並重現特定的文學風格、用詞習慣和敘述方式。' : 'This prompt primarily tests ChatGPT\'s ability to mimic specific author styles. Requiring creation of martial arts scenes in Jin Yong\'s writing style needs the AI to understand and reproduce specific literary styles, word usage habits, and narrative approaches.',
          difficulty: 'medium'
        },
        {
          id: 4,
          question: isZhHK ? '除咗寫故仔，ChatGPT 喺創意方面可以點樣幫一個畫家或者設計師？' : 'Besides writing stories, how can ChatGPT help a painter or designer creatively?',
          options: [
            isZhHK ? '幫佢調校電腦螢幕嘅顏色' : 'Help adjust computer screen colours',
            isZhHK ? '直接取代畫家，畫出完美嘅作品' : 'Directly replace the painter and create perfect artwork',
            isZhHK ? '為佢嘅作品提供文字描述、創作理念，或者根據一個主題（例如「孤獨嘅城市」）提供畫面構圖嘅靈感同想法' : 'Provide text descriptions and creative concepts for their work, or offer composition inspiration and ideas based on themes (e.g., "lonely city")',
            isZhHK ? '幫佢登記作品版權' : 'Help register artwork copyrights'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? 'ChatGPT 可以作為創意夥伴，為視覺藝術家提供概念描述、主題解釋、構圖建議和創作靈感，幫助藝術家拓展創意思維和表達方式。' : 'ChatGPT can serve as a creative partner, providing concept descriptions, theme interpretations, composition suggestions, and creative inspiration to help visual artists expand their creative thinking and expression methods.',
          difficulty: 'easy'
        },
        {
          id: 5,
          question: isZhHK ? '當你完全冇靈感嘅時候，可以點樣用一個開放式問題，叫 ChatGPT 幫你進行「腦力激盪」？' : 'When you have no inspiration at all, how can you use an open-ended question to ask ChatGPT to help you brainstorm?',
          options: [
            isZhHK ? '「我冇靈感，點算？」' : '"I have no inspiration, what should I do?"',
            isZhHK ? '「俾啲靈感我。」' : '"Give me some inspiration."',
            isZhHK ? '「我係一個遊戲設計師，想設計一款以『時間旅行』為主題嘅手機遊戲，請俾10個唔同玩法嘅創意點子。」' : '"I am a game designer wanting to create a mobile game with \'time travel\' theme, please give me 10 different creative gameplay ideas."',
            isZhHK ? '「靈感係咩？」' : '"What is inspiration?"'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? '有效的腦力激盪需要提供具體的背景、明確的目標和具體的要求。說明自己的身份（遊戲設計師）、項目主題（時間旅行）和具體需求（10個玩法創意）能讓 ChatGPT 提供更有針對性和實用性的建議。' : 'Effective brainstorming requires providing specific background, clear objectives, and concrete requirements. Stating your identity (game designer), project theme (time travel), and specific needs (10 gameplay ideas) enables ChatGPT to provide more targeted and practical suggestions.',
          difficulty: 'easy'
        }
      ]
    },
    6: {
      title: isZhHK ? '第六章測驗：智慧使用 - 限制、道德與未來' : 'Chapter 6 Quiz: Smart Usage - Limitations, Ethics and Future',
      description: isZhHK ? '測試您對 AI 限制、使用道德和負責任應用的理解。' : 'Test your understanding of AI limitations, usage ethics, and responsible application.',
      passingScore: 60,
      timeLimit: 15,
      questions: [
        {
          id: 1,
          question: isZhHK ? '當 ChatGPT 俾咗一個睇落好真，但其實係完全錯誤或者憑空捏造嘅資訊，呢個現象行內術語叫咩？' : 'When ChatGPT provides information that looks real but is completely wrong or fabricated, what is this phenomenon called in industry terms?',
          options: [
            isZhHK ? '系統故障 (System Error)' : 'System Error',
            isZhHK ? '產生幻覺 (Hallucination)' : 'Hallucination',
            isZhHK ? '網絡延遲 (Network Lag)' : 'Network Lag',
            isZhHK ? '知識偏見 (Knowledge Bias)' : 'Knowledge Bias'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '「Hallucination（幻覺）」是AI領域的專業術語，指AI模型生成看似真實但實際錯誤或虛構的信息，這是當前大型語言模型的一個重要限制。' : '"Hallucination" is a professional term in the AI field, referring to AI models generating information that appears real but is actually incorrect or fabricated, which is an important limitation of current large language models.',
          difficulty: 'medium'
        },
        {
          id: 2,
          question: isZhHK ? '為咗保護你嘅私隱，以下邊一樣嘢你最唔應該直接輸入 ChatGPT？' : 'To protect your privacy, which of the following should you NEVER directly input into ChatGPT?',
          options: [
            isZhHK ? '一個公開嘅新聞網址，想佢幫你總結' : 'A public news URL for summarization',
            isZhHK ? '你嘅完整身份證號碼同銀行戶口密碼' : 'Your complete ID number and bank account password',
            isZhHK ? '一條公開嘅數學題' : 'A public math problem',
            isZhHK ? '一段你想佢幫手潤飾嘅公司簡介文字' : 'Company introduction text you want polished'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '絕對不應該向 ChatGPT 提供任何敏感個人信息，如身份證號碼、密碼、銀行信息等。這些信息可能被儲存或用於訓練，存在隱私洩露風險。' : 'You should never provide any sensitive personal information to ChatGPT, such as ID numbers, passwords, banking information, etc. This information might be stored or used for training, posing privacy leak risks.',
          difficulty: 'easy'
        },
        {
          id: 3,
          question: isZhHK ? '關於 ChatGPT 提供嘅資訊，以下邊個心態先係最正確、最負責任？' : 'Regarding information provided by ChatGPT, which attitude is most correct and responsible?',
          options: [
            isZhHK ? '佢係超級AI，俾嘅所有資訊（尤其醫療、法律、金融建議）都係絕對準確，應該完全信晒佢' : 'It\'s a super AI, all information (especially medical, legal, financial advice) is absolutely accurate and should be completely trusted',
            isZhHK ? '佢只係一個輔助工具，所提供嘅資訊應該要抱持懷疑態度，並且喺重要情況下搵專家或可靠來源核實' : 'It\'s just an auxiliary tool, information provided should be approached with skepticism, and verified with experts or reliable sources in important situations',
            isZhHK ? '佢講嘅嘢全部都係假嘅，完全冇參考價值' : 'Everything it says is fake and has no reference value',
            isZhHK ? '只有用付費版，答案先係可信嘅' : 'Only paid version answers are trustworthy'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '正確的態度是將 ChatGPT 視為有用的輔助工具，但要保持批判性思維。特別是涉及健康、法律、金融等重要決策時，必須諮詢專業人士或查證可靠來源。' : 'The correct attitude is to view ChatGPT as a useful auxiliary tool while maintaining critical thinking. Especially for important decisions involving health, legal, or financial matters, professional consultation or reliable source verification is essential.',
          difficulty: 'medium'
        },
        {
          id: 4,
          question: isZhHK ? '點解話 AI 嘅答案可能會有「偏見」(Bias)？呢個偏見最主要係源自邊度？' : 'Why might AI answers have "bias"? Where does this bias mainly come from?',
          options: [
            isZhHK ? 'AI 自己有個人喜好同情緒' : 'AI has personal preferences and emotions',
            isZhHK ? '訓練 AI 嘅大量數據本身就包含咗人類社會存在嘅各種偏見' : 'The massive data used to train AI contains various biases that exist in human society',
            isZhHK ? '程式設計師故意寫入嘅偏見' : 'Bias intentionally written by programmers',
            isZhHK ? '因為伺服器放置嘅地理位置唔同' : 'Due to different geographic locations of servers'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? 'AI 偏見主要源於訓練數據。由於 AI 從人類創造的大量文本和內容中學習，這些數據不可避免地包含了人類社會的各種偏見、刻板印象和不平等觀念。' : 'AI bias mainly comes from training data. Since AI learns from massive amounts of human-created texts and content, this data inevitably contains various biases, stereotypes, and inequality concepts from human society.',
          difficulty: 'medium'
        },
        {
          id: 5,
          question: isZhHK ? '當你用 ChatGPT 輔助完成一份功課報告時，點樣先算係一個負責任同埋誠實嘅做法？' : 'When using ChatGPT to assist with homework assignments, what constitutes responsible and honest practice?',
          options: [
            isZhHK ? '將 ChatGPT 寫嘅所有文字直接複製貼上，當成係自己寫嘅' : 'Copy and paste all ChatGPT-written text directly as your own work',
            isZhHK ? '利用佢嚟搵資料、整理大綱、激發靈感同潤飾自己嘅句子，但最終嘅內容同觀點必須經過自己嘅理解同重寫' : 'Use it to find information, organize outlines, inspire ideas and polish your sentences, but final content and viewpoints must be understood and rewritten by yourself',
            isZhHK ? '完全唔用，因為用 AI 就等於作弊' : 'Don\'t use it at all, because using AI equals cheating',
            isZhHK ? '喺報告最後寫一句「多謝 ChatGPT」就得' : 'Just write "Thanks ChatGPT" at the end of the report'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '負責任的使用方式是將 ChatGPT 作為研究和寫作的輔助工具，用來激發想法、整理思路或改善表達，但最終的內容必須經過自己的思考、理解和重新組織，體現自己的學習成果。' : 'Responsible usage involves using ChatGPT as a research and writing assistant to inspire ideas, organize thoughts, or improve expression, but the final content must go through your own thinking, understanding, and reorganization, reflecting your own learning outcomes.',
          difficulty: 'easy'
        }
      ]
    }
  };

  const currentQuiz = quizData[currentThemeId];
  const currentQuestionData = currentQuiz?.questions[currentQuestion];
  const totalQuestions = currentQuiz?.questions.length || 0;

  // 計時器
  useEffect(() => {
    if (quizStarted && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResults, timeRemaining]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeRemaining(currentQuiz.timeLimit * 60);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      handleSubmitQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = currentQuiz.questions.filter(
      (question, index) => selectedAnswers[index] === question.correctAnswer
    ).length;
    
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (finalScore >= currentQuiz.passingScore) {
      completeQuiz(currentThemeId, finalScore);
    }
  };

  const retakeQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen chatgpt-quiz-page bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">[測驗不存在]</h2>
          <Button onClick={() => navigate('/courses/chatgpt-complete-course/outline')}>
            [返回課程]
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen chatgpt-quiz-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId}`)}
          className="breadcrumb-item mb-6 text-white/70 hover:text-white flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isZhHK ? '[返回主題]' : '[Back to Theme]'}</span>
        </motion.button>

        {/* Quiz Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
                              <Brain className="w-8 h-8 text-gray-400" />
            <h1 className="text-4xl font-bold text-white">
              {currentQuiz.title}
            </h1>
          </div>
          <p className="text-xl text-white/80 mb-6">{currentQuiz.description}</p>

          {/* Quiz Stats */}
          <div className="flex items-center justify-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
                                <BookOpen className="w-5 h-5 text-gray-400" />
              <span>{totalQuestions} {isZhHK ? '題目' : 'Questions'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>{currentQuiz.timeLimit} {isZhHK ? '分鐘' : 'minutes'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span>{currentQuiz.passingScore}% {isZhHK ? '[及格]' : '[Pass Rate]'}</span>
            </div>
          </div>
        </motion.div>

        {/* Quiz Content */}
        <div className="max-w-4xl mx-auto">
          {!quizStarted && !showResults && (
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
                              <Brain className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                {isZhHK ? '準備開始測驗' : 'Ready to Start Quiz'}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {isZhHK ? '測驗說明' : 'Quiz Instructions'}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
                                      <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{totalQuestions} {isZhHK ? '題目' : 'Questions'}</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[選擇題形式]' : '[Multiple Choice Format]'}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{currentQuiz.timeLimit} {isZhHK ? '分鐘' : 'minutes'}</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[限時完成]' : '[Time Limited]'}</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{currentQuiz.passingScore}% {isZhHK ? '[及格]' : '[Pass Rate]'}</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[通過標準]' : '[Passing Standard]'}</p>
                </div>
              </div>

              <Button 
                className="btn-primary px-8 py-4 text-lg"
                onClick={startQuiz}
              >
                <Play className="w-5 h-5 mr-2" />
                {isZhHK ? '[開始測驗]' : '[Start Quiz]'}
              </Button>
            </motion.div>
          )}

          {quizStarted && !showResults && (
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Quiz Progress */}
              <div className="bg-gray-900/50 p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm">
                    {isZhHK ? '[題目]' : '[Question]'} {currentQuestion + 1} of {totalQuestions}
                  </span>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Clock className="w-4 h-4" />
                    <span className={timeRemaining < 300 ? 'text-red-400' : ''}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>
                <Progress value={(currentQuestion + 1) / totalQuestions * 100} className="h-2" />
              </div>

              <div className="p-8">
                {/* Question */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {currentQuestion + 1}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${currentQuestionData?.difficulty === 'easy' ? 'border-green-500 text-green-400' : ''}
                        ${currentQuestionData?.difficulty === 'medium' ? 'border-yellow-500 text-yellow-400' : ''}
                        ${currentQuestionData?.difficulty === 'hard' ? 'border-red-500 text-red-400' : ''}
                      `}
                    >
                      {currentQuestionData?.difficulty === 'easy' && '[簡單]'}
                      {currentQuestionData?.difficulty === 'medium' && '[中等]'}
                      {currentQuestionData?.difficulty === 'hard' && '[困難]'}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {currentQuestionData?.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestionData?.options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    
                    return (
                      <motion.button
                        key={index}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 group relative ${
                          isSelected
                            ? 'border-yellow-400 bg-yellow-400/10 text-white transform scale-105'
                            : 'border-gray-600 bg-gray-700/20 text-white/80 hover:border-yellow-400 hover:bg-gray-600/20'
                        }`}
                        style={{
                          boxShadow: isSelected 
                            ? '0 0 20px rgba(251, 191, 36, 0.3)' 
                            : 'none'
                        }}
                        onClick={() => selectAnswer(index)}
                        whileHover={!isSelected ? { 
                          scale: 1.01,
                          boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)'
                        } : {}}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                              isSelected
                                ? 'border-yellow-400 bg-yellow-400 text-black'
                                : 'border-gray-400 text-gray-400 group-hover:border-yellow-400'
                            }`}>
                              {isSelected ? (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.2, delay: 0.1 }}
                                  className="text-black font-bold"
                                >
                                  {String.fromCharCode(65 + index)}
                                </motion.div>
                              ) : (
                                String.fromCharCode(65 + index)
                              )}
                            </div>
                            <span className="flex-1">{option}</span>
                          </div>
                          
                          {/* 剔號圖標 */}
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: -90 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.3, type: "spring", bounce: 0.5 }}
                                className="ml-3"
                              >
                                <Check className="w-5 h-5 text-yellow-400" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    [上一題]
                  </Button>

                  <div className="flex items-center space-x-4">
                    {currentQuestion === totalQuestions - 1 ? (
                      <Button
                        className="btn-success px-8"
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length !== totalQuestions}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        [提交測驗]
                      </Button>
                    ) : (
                      <Button
                        className="btn-primary"
                        onClick={nextQuestion}
                        disabled={selectedAnswers[currentQuestion] === undefined}
                      >
                        [下一題]
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {showResults && (
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="mb-8">
                {score >= currentQuiz.passingScore ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-green-400 mb-2">
                      {isZhHK ? '[恭喜通過]' : '[Congratulations]'}
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-red-400 mb-2">
                      {isZhHK ? '[未達標準]' : '[Not Passed]'}
                    </h2>
                  </motion.div>
                )}
                
                <p className="text-xl text-white/80 mb-6">
                  {isZhHK ? '[您的得分]' : '[Your Score]'}: {score}% ({currentQuiz.passingScore}% {isZhHK ? '[及格]' : '[Pass]'})
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
                                      <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white mb-1">[正確答案]</h3>
                    <p className="text-2xl font-bold text-gray-300">
                    {currentQuiz.questions.filter((_, index) => selectedAnswers[index] === currentQuiz.questions[index].correctAnswer).length} / {totalQuestions}
                  </p>
                </div>
                                  <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
                                      <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white mb-1">[完成時間]</h3>
                    <p className="text-2xl font-bold text-gray-300">
                    {formatTime((currentQuiz.timeLimit * 60) - timeRemaining)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={retakeQuiz}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  [重新測驗]
                </Button>
                
                {score >= currentQuiz.passingScore && (
                  <Button
                    className="btn-primary"
                    onClick={() => {
                      if (currentThemeId < 6) {
                        navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId + 1}`);
                      } else {
                        navigate('/courses/chatgpt-complete-course/learning');
                      }
                    }}
                  >
                                          {currentThemeId < 6 ? (isZhHK ? '下一主題' : 'Next Theme') : (isZhHK ? '完成課程' : 'Complete Course')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseQuiz; 