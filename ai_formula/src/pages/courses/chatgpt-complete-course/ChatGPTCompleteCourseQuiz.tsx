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
  
  const { markQuizCompleted, isQuizCompleted, getThemeProgress } = useChatGPTProgress();
  
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
      title: isZhHK ? '[ChatGPT 主題1測驗標題]' : '[ChatGPT Theme 1 Quiz Title]',
      description: isZhHK ? '[ChatGPT 主題1測驗描述]' : '[ChatGPT Theme 1 Quiz Description]',
      passingScore: 70,
      timeLimit: 15,
      questions: [
        {
          id: 1,
          question: isZhHK ? '[ChatGPT 主題1問題1]' : '[ChatGPT Theme 1 Question 1]',
          options: [
            isZhHK ? '[ChatGPT 選項1A]' : '[ChatGPT Option 1A]',
            isZhHK ? '[ChatGPT 選項1B]' : '[ChatGPT Option 1B]',
            isZhHK ? '[ChatGPT 選項1C]' : '[ChatGPT Option 1C]',
            isZhHK ? '[ChatGPT 選項1D]' : '[ChatGPT Option 1D]'
          ],
          correctAnswer: 1,
          explanation: isZhHK ? '[ChatGPT 問題1解釋]' : '[ChatGPT Question 1 Explanation]',
          difficulty: 'easy'
        },
        {
          id: 2,
          question: isZhHK ? '[ChatGPT 主題1問題2]' : '[ChatGPT Theme 1 Question 2]',
          options: [
            isZhHK ? '[ChatGPT 選項2A]' : '[ChatGPT Option 2A]',
            isZhHK ? '[ChatGPT 選項2B]' : '[ChatGPT Option 2B]',
            isZhHK ? '[ChatGPT 選項2C]' : '[ChatGPT Option 2C]',
            isZhHK ? '[ChatGPT 選項2D]' : '[ChatGPT Option 2D]'
          ],
          correctAnswer: 2,
          explanation: isZhHK ? '[ChatGPT 問題2解釋]' : '[ChatGPT Question 2 Explanation]',
          difficulty: 'medium'
        }
      ]
    },
    2: {
      title: isZhHK ? '[ChatGPT 主題2測驗標題]' : '[ChatGPT Theme 2 Quiz Title]',
      description: isZhHK ? '[ChatGPT 主題2測驗描述]' : '[ChatGPT Theme 2 Quiz Description]',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          id: 1,
          question: isZhHK ? '[ChatGPT 主題2問題1]' : '[ChatGPT Theme 2 Question 1]',
          options: [
            isZhHK ? '[ChatGPT 選項1A]' : '[ChatGPT Option 1A]',
            isZhHK ? '[ChatGPT 選項1B]' : '[ChatGPT Option 1B]',
            isZhHK ? '[ChatGPT 選項1C]' : '[ChatGPT Option 1C]',
            isZhHK ? '[ChatGPT 選項1D]' : '[ChatGPT Option 1D]'
          ],
          correctAnswer: 0,
          explanation: isZhHK ? '[ChatGPT 問題1解釋]' : '[ChatGPT Question 1 Explanation]',
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
      markQuizCompleted(`theme-${currentThemeId}`);
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
          <Button onClick={() => navigate('/courses/chatgpt-complete-course')}>
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