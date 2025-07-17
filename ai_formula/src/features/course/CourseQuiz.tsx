/**
 * 可重用課程測驗組件
 * @fileoverview 通用的課程測驗組件，支援任何課程的測驗功能
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle, XCircle, RotateCcw, Target, 
  Trophy, Award, Clock, Brain, Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

// 類型定義
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

interface CourseQuizProps {
  // 測驗數據
  quiz: Quiz;
  
  // 返回路徑
  backPath: string;
  backLabel?: string;
  
  // 事件處理
  onQuizComplete: (score: number, passed: boolean) => void;
  onBackToSelection?: () => void;
  
  // 可選配置
  showScore?: boolean;
  allowRetake?: boolean;
  
  // 主題色彩 (可選)
  themeColor?: 'blue' | 'green' | 'purple' | 'yellow';
}

const CourseQuiz: React.FC<CourseQuizProps> = ({
  quiz,
  backPath,
  backLabel,
  onQuizComplete,
  onBackToSelection,
  showScore = true,
  allowRetake = true,
  themeColor = 'yellow'
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  // 根據主題色彩設定樣式
  const getThemeStyles = () => {
    switch (themeColor) {
      case 'blue':
        return {
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'border-blue-500 text-blue-400 hover:bg-blue-500/10',
          accent: 'text-blue-400',
          gradient: 'from-blue-500 to-blue-600'
        };
      case 'green':
        return {
          primary: 'bg-green-600 hover:bg-green-700',
          secondary: 'border-green-500 text-green-400 hover:bg-green-500/10',
          accent: 'text-green-400',
          gradient: 'from-green-500 to-green-600'
        };
      case 'purple':
        return {
          primary: 'bg-purple-600 hover:bg-purple-700',
          secondary: 'border-purple-500 text-purple-400 hover:bg-purple-500/10',
          accent: 'text-purple-400',
          gradient: 'from-purple-500 to-purple-600'
        };
      default: // yellow
        return {
          primary: 'bg-yellow-600 hover:bg-yellow-700',
          secondary: 'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10',
          accent: 'text-yellow-400',
          gradient: 'from-yellow-500 to-yellow-600'
        };
    }
  };

  const themeStyles = getThemeStyles();

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    const correct = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleQuizComplete = () => {
    const score = calculateScore();
    const passed = score >= (quiz?.passingScore || 70);
    onQuizComplete(score, passed);
    
    if (!passed && allowRetake) {
      // 如果失敗且允許重考，重置測驗
      resetQuiz();
    }
  };

  const handleBackToSelection = () => {
    if (onBackToSelection) {
      onBackToSelection();
    } else {
      navigate(backPath);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // 檢查數據有效性
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
        <Navigation />
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {isZhHK ? '測驗數據載入中...' : 'Loading Quiz Data...'}
            </h1>
            <Button onClick={() => navigate(backPath)} variant="outline">
              {backLabel || (isZhHK ? '返回' : 'Back')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <motion.div {...fadeIn} className="mb-6">
            <Button
              onClick={() => navigate(backPath)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel || (isZhHK ? '返回' : 'Back')}
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div {...fadeIn} className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${themeStyles.gradient} rounded-xl flex items-center justify-center`}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                {quiz.title}
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              {quiz.description}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{quiz.questions.length} {isZhHK ? '題目' : 'Questions'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{isZhHK ? '及格分數' : 'Passing Score'}: {quiz.passingScore}%</span>
              </div>
            </div>
          </motion.div>

          {!showResults ? (
            /* Quiz Questions */
            <motion.div {...fadeIn}>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{quiz.title}</CardTitle>
                    <Badge variant="outline" className="text-gray-300">
                      {currentQuestionIndex + 1} / {quiz.questions.length}
                    </Badge>
                  </div>
                  <Progress 
                    value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} 
                    className="h-2"
                  />
                </CardHeader>
                <CardContent>
                  {currentQuestion && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-white leading-relaxed">
                        {currentQuestion.question}
                      </h3>
                      
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                              selectedAnswers[currentQuestionIndex] === index
                                ? `border-${themeColor}-500 bg-${themeColor}-500/10 text-white`
                                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswers[currentQuestionIndex] === index
                                  ? `border-${themeColor}-500 bg-${themeColor}-500 text-white`
                                  : 'border-gray-500'
                              }`}>
                                {selectedAnswers[currentQuestionIndex] === index && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between pt-4">
                        {allowRetake && (
                          <Button
                            variant="outline"
                            onClick={resetQuiz}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            {isZhHK ? '重新測驗' : 'Retake Quiz'}
                          </Button>
                        )}
                        <Button
                          onClick={handleNextQuestion}
                          disabled={selectedAnswers[currentQuestionIndex] === undefined}
                          className={`ml-auto ${themeStyles.primary} text-white`}
                        >
                          {currentQuestionIndex < quiz.questions.length - 1 
                            ? (isZhHK ? '下一題' : 'Next Question')
                            : (isZhHK ? '完成測驗' : 'Finish Quiz')
                          }
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Quiz Results */
            <motion.div {...fadeIn}>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {calculateScore() >= quiz.passingScore ? (
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <XCircle className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">
                    {calculateScore() >= quiz.passingScore 
                      ? (isZhHK ? '恭喜通過！' : 'Congratulations!')
                      : (isZhHK ? '需要再努力' : 'Keep Trying!')
                    }
                  </CardTitle>
                  {showScore && (
                    <>
                      <div className={`text-3xl font-bold ${themeStyles.accent} mb-2`}>
                        {calculateScore()}%
                      </div>
                      <p className="text-gray-300">
                        {isZhHK ? `你答對了 ${selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} / ${quiz.questions.length} 道題目` : 
                          `You got ${selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} / ${quiz.questions.length} questions correct`}
                      </p>
                    </>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quiz.questions.map((question, index) => (
                      <div key={question.id} className="p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-start gap-3 mb-2">
                          {selectedAnswers[index] === question.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-white font-medium mb-2">{question.question}</p>
                            <p className="text-sm text-gray-300">
                              {isZhHK ? '正確答案：' : 'Correct answer: '}
                              {question.options[question.correctAnswer]}
                            </p>
                            {question.explanation && (
                              <p className="text-sm text-gray-400 mt-2">
                                {question.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6">
                    {calculateScore() >= quiz.passingScore ? (
                      // User PASSED
                      <>
                        <Button
                          onClick={handleQuizComplete}
                          className={`flex-1 ${themeStyles.primary} text-white`}
                        >
                          <Trophy className="w-4 h-4 mr-2" />
                          {isZhHK ? '繼續學習' : 'Continue Learning'}
                        </Button>
                        {allowRetake && (
                          <Button
                            variant="outline"
                            onClick={resetQuiz}
                            className="border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            {isZhHK ? '重新測驗' : 'Retake Quiz'}
                          </Button>
                        )}
                      </>
                    ) : (
                      // User FAILED
                      <>
                        <Button
                          variant="outline"
                          onClick={handleBackToSelection}
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {isZhHK ? '返回選擇' : 'Back to Selection'}
                        </Button>
                        {allowRetake && (
                          <Button
                            onClick={resetQuiz}
                            className={`flex-1 ${themeStyles.primary} text-white`}
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            {isZhHK ? '重新測驗' : 'Retake Quiz'}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseQuiz; 