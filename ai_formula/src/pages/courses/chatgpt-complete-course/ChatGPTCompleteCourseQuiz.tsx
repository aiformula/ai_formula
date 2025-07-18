import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle, AlertCircle, Trophy, Timer, 
  BookOpen, Target, ArrowRight, RotateCcw, Star,
  Brain, Lightbulb, Award, Zap, ThumbsUp, ChevronRight, Play
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
      description: isZhHK ? '測試您對 Prompt Engineering 的理解，包括有效提示詞的構建技巧和優化策略。' : 'Test your understanding of Prompt Engineering, including effective prompt construction techniques and optimization strategies.',
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
          question: isZhHK ? '如果 ChatGPT 第一次嘅答案唔夠好，你點樣「追問」去優化佢？' : 'If ChatGPT\'s first answer is not good enough, how should you "follow up" to optimize it?',
          options: [
            isZhHK ? '直接話「你錯喇」，然後唔再追問' : 'Directly say "you are wrong" and stop asking',
            isZhHK ? '開一個新對話，問完全一樣嘅問題' : 'Start a new conversation and ask exactly the same question',
            isZhHK ? '喺原有答案基礎上，提出更具體嘅要求，例如「好好，但可唔可以寫得再簡單啲，同埋加多兩個例子？」' : 'Build on the original answer with more specific requirements, such as "Good, but can you make it simpler and add two more examples?"',
            isZhHK ? '將佢嘅答案複製再貼上一次，睇下會唔會唔同' : 'Copy and paste its answer again to see if it will be different'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? '最有效的追問方式是在原有答案基礎上提出具體的改善要求。這種方法保持了對話的連續性，讓 ChatGPT 能理解你的具體需求，並在原有基礎上進行優化。給出具體的改善方向比簡單的否定更有建設性。' : 'The most effective follow-up method is to make specific improvement requests based on the original answer. This approach maintains conversation continuity, allows ChatGPT to understand your specific needs, and optimize based on the original foundation. Giving specific improvement directions is more constructive than simple negation.',
          difficulty: 'medium'
        }
      ]
    },
    3: {
      title: isZhHK ? '[ChatGPT 主題3測驗標題]' : '[ChatGPT Theme 3 Quiz Title]',
      description: isZhHK ? '[ChatGPT 主題3測驗描述]' : '[ChatGPT Theme 3 Quiz Description]',
      passingScore: 80,
      timeLimit: 25,
      questions: [
        {
          id: 1,
          question: isZhHK ? '[ChatGPT 主題3問題1]' : '[ChatGPT Theme 3 Question 1]',
          options: [
            isZhHK ? '[ChatGPT 選項1A]' : '[ChatGPT Option 1A]',
            isZhHK ? '[ChatGPT 選項1B]' : '[ChatGPT Option 1B]',
            isZhHK ? '[ChatGPT 選項1C]' : '[ChatGPT Option 1C]',
            isZhHK ? '[ChatGPT 選項1D]' : '[ChatGPT Option 1D]'
          ],
          correctAnswer: 3,
          explanation: isZhHK ? '[ChatGPT 問題1解釋]' : '[ChatGPT Question 1 Explanation]',
          difficulty: 'hard'
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
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
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
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
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">
              {currentQuiz.title}
            </h1>
          </div>
          <p className="text-xl text-white/80 mb-6">{currentQuiz.description}</p>

          {/* Quiz Stats */}
          <div className="flex items-center justify-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>{totalQuestions} [題目]</span>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="w-5 h-5 text-green-400" />
              <span>{currentQuiz.timeLimit} [分鐘]</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span>{currentQuiz.passingScore}% [及格]</span>
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
              <Brain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                {isZhHK ? '[準備開始測驗]' : '[Ready to Start Quiz]'}
              </h2>
              <p className="text-white/70 mb-8">
                {isZhHK ? '[測驗說明]' : '[Quiz Instructions]'}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{totalQuestions} [題目]</h3>
                  <p className="text-sm text-white/60">[選擇題形式]</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <Timer className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{currentQuiz.timeLimit} [分鐘]</h3>
                  <p className="text-sm text-white/60">[限時完成]</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{currentQuiz.passingScore}% [及格]</h3>
                  <p className="text-sm text-white/60">[通過標準]</p>
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
                    [題目] {currentQuestion + 1} of {totalQuestions}
                  </span>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Timer className="w-4 h-4" />
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
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
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
                  {currentQuestionData?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-gray-600 bg-gray-700/20 text-white/80 hover:border-gray-500 hover:bg-gray-600/20'
                      }`}
                      onClick={() => selectAnswer(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-400 text-gray-400'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
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
                    <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-red-400 mb-2">
                      {isZhHK ? '[未達標準]' : '[Not Passed]'}
                    </h2>
                  </motion.div>
                )}
                
                <p className="text-xl text-white/80 mb-6">
                  [您的得分]: {score}% ({currentQuiz.passingScore}% [及格])
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <Star className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">[正確答案]</h3>
                  <p className="text-2xl font-bold text-blue-400">
                    {currentQuiz.questions.filter((_, index) => selectedAnswers[index] === currentQuiz.questions[index].correctAnswer).length} / {totalQuestions}
                  </p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                  <Timer className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">[完成時間]</h3>
                  <p className="text-2xl font-bold text-purple-400">
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
                      if (currentThemeId < 3) {
                        navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId + 1}`);
                      } else {
                        navigate('/courses/chatgpt-complete-course/learning');
                      }
                    }}
                  >
                    {currentThemeId < 3 ? '[下一主題]' : '[完成課程]'}
                    <ChevronRight className="w-4 h-4 ml-2" />
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