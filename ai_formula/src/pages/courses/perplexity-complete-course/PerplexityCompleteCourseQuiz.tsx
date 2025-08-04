import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, Clock,
  Trophy, Target, Star, BookOpen, Check, Play
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { perplexityCourseData } from '@/data/perplexity-complete-course-data';
import { usePerplexityProgress } from '@/hooks/usePerplexityProgress';

const PASSING_SCORE = 80; // 及格分數

const PerplexityCompleteCourseQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { themeId } = useParams<{ themeId: string }>();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  const { completeQuiz } = usePerplexityProgress();

  const currentThemeId = parseInt(themeId || '1');
  const currentTheme = perplexityCourseData.courseModules.find(module => module.id === currentThemeId);
  const quizData = currentTheme?.quiz;

  // 假設 quizData.questions 是 array
  const questions = quizData?.questions || [];
  const totalQuestions = questions.length;

  // 狀態
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState((quizData?.timeLimit || 10) * 60);
  const [score, setScore] = useState(0);

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

  // 開始測驗
  const startQuiz = () => {
    setQuizStarted(true);
    setTimeRemaining((quizData?.timeLimit || 10) * 60);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  // 選擇答案
  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  // 下一題
  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  // 上一題
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 提交測驗
  const handleSubmitQuiz = () => {
    const correctAnswers = questions.filter(
      (question: any, index: number) => selectedAnswers[index] === question.correctAnswer
    ).length;
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(finalScore);
    setShowResults(true);
    if (finalScore >= PASSING_SCORE) {
      completeQuiz(currentThemeId, finalScore);
    }
  };

  // 重新開始
  const retakeQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
  };

  // 格式化時間
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizData || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#18181b] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">{isZhHK ? '測驗不存在' : 'Quiz not found'}</h2>
          <Button onClick={() => navigate('/courses/perplexity-complete-course/outline')}>
            {isZhHK ? '返回課程' : 'Back to Course'}
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#18181b' }}>
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(`/courses/perplexity-complete-course/theme/${currentThemeId}`)}
          className="mb-6 text-white/70 hover:text-white flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isZhHK ? '返回主題' : 'Back to Theme'}</span>
        </motion.button>

        {/* Quiz Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="secondary" className="mb-4 bg-blue-600/20 text-blue-300 border-blue-500/30">
            {isZhHK ? `第 ${currentThemeId} 章` : `Chapter ${currentThemeId}`}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {isZhHK ? quizData.title : (quizData.titleEn || quizData.title)}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {isZhHK ? quizData.description : (quizData.descriptionEn || quizData.description)}
          </p>
          {/* Quiz Stats */}
          <div className="flex items-center justify-center space-x-8 text-white/70">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-yellow-400" />
                  <span>{totalQuestions} {isZhHK ? '題目' : 'Questions'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>{quizData.timeLimit} {isZhHK ? '分鐘' : 'minutes'}</span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span>{PASSING_SCORE}% 及格</span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Start Screen */}
          {!quizStarted && !showResults && (
            <motion.div
              className="bg-[#232329] border border-[#232329] rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <BookOpen className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                {isZhHK ? '準備開始測驗' : 'Ready to Start Quiz'}
              </h2>
              <p className="text-white/70 mb-8">
                {isZhHK ? '測驗說明' : 'Quiz Instructions'}
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#232329] border border-gray-600/30 rounded-lg p-4">
                  <BookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{totalQuestions} {isZhHK ? '題目' : 'Questions'}</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '選擇題形式' : 'Multiple Choice Format'}</p>
                </div>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                  <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{quizData.timeLimit} {isZhHK ? '分鐘' : 'minutes'}</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '測驗時間' : 'Time Limit'}</p>
                </div>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                  <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{PASSING_SCORE}%</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '通過標準' : 'Passing Score'}</p>
                </div>
              </div>
              <Button
                className="bg-yellow-400 text-black px-8 py-4 text-lg hover:bg-yellow-500"
                onClick={startQuiz}
              >
                <Play className="w-5 h-5 mr-2" />
                {isZhHK ? '開始測驗' : 'Start Quiz'}
              </Button>
            </motion.div>
          )}

          {/* Quiz Content */}
          {quizStarted && !showResults && (
            <motion.div
              className="bg-[#232329] border border-[#232329] rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Quiz Progress */}
              <div className="bg-[#18181b] p-4 border-b border-[#232329]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-center text-gray-400 mb-4">
                    {isZhHK ? `題目 ${currentQuestion + 1} of ${totalQuestions}` : `Question ${currentQuestion + 1} of ${totalQuestions}`}
                  </div>
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
                    <div className="w-8 h-8 bg-[#232329] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {currentQuestion + 1}
                    </div>
                    <Badge
                      variant="outline"
                      className="border-yellow-400 text-yellow-400"
                    >
                      {isZhHK ? '題目' : 'Question'}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {isZhHK ? currentQuestionData.question : (currentQuestionData.questionEn || currentQuestionData.question)}
                  </h3>
                </div>
                {/* Options */}
                <div className="space-y-3 mb-8">
                  {(isZhHK ? currentQuestionData.options : (currentQuestionData.optionsEn || currentQuestionData.options)).map((option: string, index: number) => {
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    return (
                      <motion.button
                        key={index}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 group relative ${
                          isSelected
                            ? 'border-yellow-400 bg-yellow-400/10 text-white transform scale-105'
                            : 'border-gray-600 bg-[#232329] text-white/80 hover:border-yellow-400 hover:bg-gray-600/20'
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
                    上一題
                  </Button>
                  <div className="flex items-center space-x-4">
                    {currentQuestion === totalQuestions - 1 ? (
                      <Button
                        className="bg-yellow-400 text-black px-8"
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length !== totalQuestions}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {isZhHK ? '提交測驗' : 'Submit Quiz'}
                      </Button>
                    ) : (
                      <Button
                        className="bg-yellow-400 text-black"
                        onClick={nextQuestion}
                        disabled={selectedAnswers[currentQuestion] === undefined}
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        {isZhHK ? '下一題' : 'Next'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 結果畫面 */}
          {showResults && (
            <motion.div
              className="bg-[#232329] border border-[#232329] rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="mb-8">
                {score >= PASSING_SCORE ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-green-400 mb-2">
                      {isZhHK ? '恭喜通過' : 'Congratulations'}
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
                      {isZhHK ? '未達標準' : 'Not Passed'}
                    </h2>
                  </motion.div>
                )}
                <p className="text-xl text-white/80 mb-6">
                  您的得分: {score}% ({PASSING_SCORE}% 及格)
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#232329] border border-gray-600/30 rounded-lg p-6">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">正確答案</h3>
                  <p className="text-2xl font-bold text-gray-300">
                    {questions.filter((q: any, idx: number) => selectedAnswers[idx] === q.correctAnswer).length} / {totalQuestions}
                  </p>
                </div>
                <div className="bg-[#232329] border border-gray-600/30 rounded-lg p-6">
                  <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">完成時間</h3>
                  <p className="text-2xl font-bold text-gray-300">
                    {formatTime((quizData.timeLimit * 60) - timeRemaining)}
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
                  重新測驗
                </Button>
                {score >= PASSING_SCORE && (
                  <Button
                    className="bg-yellow-400 text-black"
                    onClick={() => {
                      if (currentThemeId < perplexityCourseData.courseModules.length) {
                        navigate(`/courses/perplexity-complete-course/theme/${currentThemeId + 1}`);
                      } else {
                        navigate('/courses/perplexity-complete-course/learning');
                      }
                    }}
                  >
                    {currentThemeId < perplexityCourseData.courseModules.length ? '下一主題' : '完成課程'}
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

export default PerplexityCompleteCourseQuiz;