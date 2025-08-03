/**
 * Course Quiz Template
 * @fileoverview 通用的課程測驗頁面模板
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, Clock,
  Trophy, Target, Star, BookOpen, Check, Play, Brain, Award
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { CourseConfig } from './types';

interface CourseQuizTemplateProps {
  config: CourseConfig;
}

const CourseQuizTemplate: React.FC<CourseQuizTemplateProps> = ({ config }) => {
  const navigate = useNavigate();
  const { themeId } = useParams<{ themeId: string }>();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  const { dataSource, baseRoute, progressHook, themeColor, cssPrefix } = config;

  const { completeQuiz } = progressHook();

  const currentThemeId = parseInt(themeId || '1');
  const currentTheme = dataSource.courseModules.find((module: any) => module.id === currentThemeId);
  const quizData = currentTheme?.quiz;

  // 獲取測驗問題
  const questions = quizData?.questions || [];
  const totalQuestions = questions.length;
  const passingScore = Math.max(71, Math.round((5 / Math.max(totalQuestions, 7)) * 100)); // 5/7題通過，約71%
  const timeLimit = quizData?.timeLimit || 15; // 分鐘

  // 狀態管理
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [score, setScore] = useState(0);

  // 動態樣式類名
  const getThemeClasses = () => {
    if (cssPrefix === 'perplexity') {
      return {
        primary: 'from-black to-gray-900',
        accent: 'text-yellow-500',
        button: 'bg-yellow-500 hover:bg-yellow-600 text-black',
        progress: 'bg-yellow-500',
        card: 'bg-black border-gray-800',
        text: 'text-white',
        correct: 'bg-yellow-500',
        incorrect: 'bg-red-500',
        gradient: 'from-yellow-500/20 to-orange-500/20'
      };
    } else {
      return {
        primary: 'from-green-600 to-emerald-700',
        accent: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700 text-white',
        progress: 'bg-green-600',
        card: 'bg-white border-gray-200',
        text: 'text-gray-900',
        correct: 'bg-green-500',
        incorrect: 'bg-red-500',
        gradient: 'from-green-500/20 to-blue-500/20'
      };
    }
  };

  const themeClasses = getThemeClasses();

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

  // 格式化時間顯示
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 開始測驗
  const startQuiz = () => {
    setQuizStarted(true);
    setTimeRemaining(timeLimit * 60);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  // 重新開始測驗
  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeRemaining(timeLimit * 60);
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
    
    if (finalScore >= passingScore) {
      completeQuiz(currentThemeId, finalScore);
    }
  };

  // 計算進度
  const progress = useMemo(() => {
    if (!quizStarted) return 0;
    return Math.round(((currentQuestion + 1) / totalQuestions) * 100);
  }, [currentQuestion, totalQuestions, quizStarted]);

  // 如果沒有測驗數據
  if (!quizData || totalQuestions === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">測驗不存在</h1>
            <p className="text-gray-600 mb-4">找不到指定的測驗內容</p>
            <Button onClick={() => navigate(`${baseRoute}/theme/${currentThemeId}`)}>
              返回主題頁面
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        {/* 返回按鈕 */}
        <Button
          variant="ghost"
          onClick={() => navigate(`${baseRoute}/theme/${currentThemeId}`)}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isZhHK ? '返回主題頁面' : 'Back to Theme'}
        </Button>

        {/* 測驗尚未開始 */}
        {!quizStarted && !showResults && (
          <Card className={`${themeClasses.card} max-w-2xl mx-auto`}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle className={`text-2xl ${themeClasses.text}`}>
                {quizData.title || `${isZhHK ? '第' : 'Chapter '}${currentThemeId}${isZhHK ? '章測驗' : ' Quiz'}`}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {quizData.description || (isZhHK ? '測試您在本章的學習成果' : 'Test your knowledge from this chapter')}
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-800">
                    {totalQuestions} {isZhHK ? '題目' : 'Questions'}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-800">
                    {timeLimit} {isZhHK ? '分鐘' : 'Minutes'}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-800">
                    {passingScore}% {isZhHK ? '及格' : 'Pass'}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-orange-800">
                    {isZhHK ? '即時反饋' : 'Instant Feedback'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
                  {isZhHK ? '測驗須知' : 'Quiz Instructions'}
                </h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {isZhHK ? '每題只能選擇一個答案' : 'Select only one answer per question'}
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {isZhHK ? '可以返回修改之前的答案' : 'You can go back and change previous answers'}
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {isZhHK ? `需要達到 ${passingScore}% 才能通過` : `Need ${passingScore}% to pass`}
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {isZhHK ? '時間到會自動提交' : 'Auto-submit when time runs out'}
                  </li>
                </ul>
              </div>

              <Button
                onClick={startQuiz}
                className={`${themeClasses.button} px-8 py-3 text-lg`}
              >
                <Play className="h-5 w-5 mr-2" />
                {isZhHK ? '開始測驗' : 'Start Quiz'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 測驗進行中 */}
        {quizStarted && !showResults && currentQuestionData && (
          <div className="space-y-6">
            {/* 進度和時間 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      {isZhHK ? '問題' : 'Question'} {currentQuestion + 1}/{totalQuestions}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {progress}% {isZhHK ? '完成' : 'Complete'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className={`font-mono ${timeRemaining < 60 ? 'text-red-600' : 'text-gray-700'}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* 問題卡片 */}
            <Card className={themeClasses.card}>
              <CardContent className="p-8">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className={`text-xl font-bold ${themeClasses.text} mb-6`}>
                    {currentQuestionData.question}
                  </h2>

                  {/* 答案選項 */}
                  <div className="space-y-3">
                    {currentQuestionData.options.map((option: string, index: number) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          onClick={() => selectAnswer(index)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            selectedAnswers[currentQuestion] === index
                              ? `border-blue-500 bg-blue-50 ${themeClasses.text}`
                              : 'border-gray-200 hover:border-gray-300 bg-white text-gray-900'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                              selectedAnswers[currentQuestion] === index
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedAnswers[currentQuestion] === index && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="flex-1">{option}</span>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* 導航按鈕 */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {isZhHK ? '上一題' : 'Previous'}
              </Button>

              <div className="flex space-x-2">
                {currentQuestion === totalQuestions - 1 ? (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className={themeClasses.button}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    {isZhHK ? '提交測驗' : 'Submit Quiz'}
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className={themeClasses.button}
                  >
                    {isZhHK ? '下一題' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 測驗結果 */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className={`${themeClasses.card} text-center`}>
              <CardContent className="p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  {score >= passingScore ? (
                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto">
                      <XCircle className="h-10 w-10 text-white" />
                    </div>
                  )}
                </motion.div>

                <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>
                  {score >= passingScore 
                    ? (isZhHK ? '恭喜通過！' : 'Congratulations!')
                    : (isZhHK ? '繼續努力！' : 'Keep Trying!')
                  }
                </h2>

                <div className="text-6xl font-bold mb-4" style={{ color: score >= passingScore ? '#10b981' : '#ef4444' }}>
                  {score}%
                </div>

                <p className="text-gray-600 mb-6">
                  {isZhHK 
                    ? `您答對了 ${questions.filter((_, index) => selectedAnswers[index] === questions[index].correctAnswer).length} 題，共 ${totalQuestions} 題`
                    : `You got ${questions.filter((_, index) => selectedAnswers[index] === questions[index].correctAnswer).length} out of ${totalQuestions} questions correct`
                  }
                </p>

                {score >= passingScore ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800">
                        {isZhHK ? '您已成功完成本章測驗！' : 'You have successfully completed this chapter quiz!'}
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate(`${baseRoute}/theme/${currentThemeId + 1}`)}
                      className={themeClasses.button}
                    >
                      {isZhHK ? '進入下一章' : 'Next Chapter'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                      <p className="text-red-800">
                        {isZhHK ? `需要達到 ${passingScore}% 才能通過，建議重新學習後再次嘗試。` : `You need ${passingScore}% to pass. We recommend reviewing the material and trying again.`}
                      </p>
                    </div>
                    <div className="flex space-x-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`${baseRoute}/theme/${currentThemeId}`)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        {isZhHK ? '重新學習' : 'Review Material'}
                      </Button>
                      <Button
                        onClick={restartQuiz}
                        className={themeClasses.button}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {isZhHK ? '重新測驗' : 'Retake Quiz'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseQuizTemplate; 