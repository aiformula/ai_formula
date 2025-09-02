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
    } else if (cssPrefix === 'prompt-engineering') {
      return {
        primary: 'from-black to-gray-900',
        accent: 'text-[#9E768F]',
        button: 'bg-[#9E768F] hover:bg-[#9FA4C4] text-white',
        progress: 'bg-[#9E768F]',
        card: 'bg-black border-gray-800',
        text: 'text-white',
        correct: 'bg-[#9E768F]',
        incorrect: 'bg-red-500',
        gradient: 'from-[#9E768F]/20 to-[#9FA4C4]/20'
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
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="pt-20 px-4 py-8">
        {/* 返回按鈕 */}
        <motion.button
          className="flex items-center space-x-2 text-white/70 hover:text-white mb-8 px-4"
          onClick={() => navigate(`${baseRoute}/theme/${currentThemeId}`)}
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
              {quizData?.title || `${isZhHK ? '第' : 'Chapter '}${currentThemeId}${isZhHK ? '部分測驗' : ' Quiz'}`}
            </h1>
          </div>
          <p className="text-xl text-white/80 mb-6">
            {quizData?.description || (isZhHK ? '測試您對本章內容的理解' : 'Test your understanding of this chapter')}
          </p>

          {/* Quiz Stats */}
          <div className="flex items-center justify-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <span>{totalQuestions} {isZhHK ? '題目' : 'Questions'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>{timeLimit} {isZhHK ? '分鐘' : 'minutes'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span>{passingScore}% {isZhHK ? '[及格]' : '[Pass Rate]'}</span>
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
                  <h3 className="font-semibold text-white mb-1">{timeLimit} {isZhHK ? '分鐘' : 'minutes'}</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[限時完成]' : '[Time Limited]'}</p>
                </div>
                <div className={`${cssPrefix === 'prompt-engineering' ? 'bg-[#9E768F]/10 border-[#9E768F]/20' : 'bg-yellow-500/10 border-yellow-500/20'} rounded-lg p-4`}>
                  <Target className={`w-8 h-8 ${cssPrefix === 'prompt-engineering' ? 'text-[#9E768F]' : 'text-yellow-400'} mx-auto mb-2`} />
                  <h3 className="font-semibold text-white mb-1">{passingScore}% {isZhHK ? '[及格]' : '[Pass Rate]'}</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[通過標準]' : '[Passing Standard]'}</p>
                </div>
              </div>

              <Button 
                className={`${cssPrefix === 'prompt-engineering' ? 'bg-[#9E768F] hover:bg-[#9FA4C4]' : 'btn-primary'} px-8 py-4 text-lg text-white`}
                onClick={startQuiz}
              >
                <Play className="w-5 h-5 mr-2" />
                {isZhHK ? '[開始測驗]' : '[Start Quiz]'}
              </Button>
            </motion.div>
          )}

          {/* 測驗進行中 */}
          {quizStarted && !showResults && currentQuestionData && (
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
                      className="border-gray-500 text-gray-400"
                    >
                      {isZhHK ? '[選擇題]' : '[Multiple Choice]'}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {currentQuestionData.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestionData.options.map((option: string, index: number) => {
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    
                    return (
                      <motion.button
                        key={index}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 group relative ${
                          isSelected
                            ? `${cssPrefix === 'prompt-engineering' ? 'border-[#9E768F] bg-[#9E768F]/10' : 'border-yellow-400 bg-yellow-400/10'} text-white transform scale-105`
                            : 'border-gray-600 bg-gray-700/20 text-white/80 hover:border-yellow-400 hover:bg-gray-600/20'
                        }`}
                        style={{
                          boxShadow: isSelected 
                            ? `0 0 20px ${cssPrefix === 'prompt-engineering' ? 'rgba(158, 118, 143, 0.3)' : 'rgba(251, 191, 36, 0.3)'}` 
                            : 'none'
                        }}
                        onClick={() => selectAnswer(index)}
                        whileHover={!isSelected ? { 
                          scale: 1.01,
                          boxShadow: `0 0 15px ${cssPrefix === 'prompt-engineering' ? 'rgba(158, 118, 143, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`
                        } : {}}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                            isSelected 
                              ? `${cssPrefix === 'prompt-engineering' ? 'border-[#9E768F] bg-[#9E768F]' : 'border-yellow-400 bg-yellow-400'} text-white`
                              : 'border-gray-500 text-gray-400'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className={isSelected ? 'text-white font-medium' : 'text-white/80'}>
                            {option}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                    className="text-white/70 border-gray-600 hover:bg-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {isZhHK ? '[上一題]' : '[Previous]'}
                  </Button>
                  
                  <Button
                    onClick={nextQuestion}
                    className={`${cssPrefix === 'prompt-engineering' ? 'bg-[#9E768F] hover:bg-[#9FA4C4]' : 'btn-primary'} text-white`}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                  >
                    {currentQuestion === totalQuestions - 1 
                      ? (isZhHK ? '[完成測驗]' : '[Complete Quiz]')
                      : (isZhHK ? '[下一題]' : '[Next]')
                    }
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 測驗結果 */}
          {showResults && (
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="mb-6">
                {score >= passingScore ? (
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                )}
                <h2 className="text-3xl font-bold text-white mb-2">
                  {score >= passingScore 
                    ? (isZhHK ? '恭喜通過！' : 'Congratulations!')
                    : (isZhHK ? '未能通過' : 'Not Passed')
                  }
                </h2>
                <p className="text-gray-300">
                  {isZhHK ? `您的得分：${score}% (及格線：${passingScore}%)` : `Your Score: ${score}% (Pass: ${passingScore}%)`}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <Trophy className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{score}%</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[最終得分]' : '[Final Score]'}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">
                    {questions.filter((_: any, index: number) => selectedAnswers[index] === questions[index].correctAnswer).length}/{totalQuestions}
                  </h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[正確答案]' : '[Correct Answers]'}</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">{passingScore}%</h3>
                  <p className="text-sm text-white/60">{isZhHK ? '[及格標準]' : '[Pass Rate]'}</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={restartQuiz}
                  className="text-white/70 border-gray-600 hover:bg-gray-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isZhHK ? '[重新測驗]' : '[Retake Quiz]'}
                </Button>
                <Button
                  onClick={() => navigate(`${baseRoute}/theme/${currentThemeId}`)}
                  className={`${cssPrefix === 'prompt-engineering' ? 'bg-[#9E768F] hover:bg-[#9FA4C4]' : 'btn-primary'} text-white`}
                >
                  {isZhHK ? '[返回主題]' : '[Back to Theme]'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseQuizTemplate; 