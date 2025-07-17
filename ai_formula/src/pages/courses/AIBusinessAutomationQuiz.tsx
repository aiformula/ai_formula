import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { useAIAutomationProgress } from '@/hooks/useAIAutomationProgress'; // 新增：進度追蹤

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

const AIBusinessAutomationQuiz: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // 🎯 使用進度追蹤 Hook
  const {
    markQuizCompleted,
    getThemeProgress,
    getProgressStats
  } = useAIAutomationProgress();

  const currentThemeId = parseInt(themeId || '1');
  const themeProgress = getThemeProgress(currentThemeId);
  const stats = getProgressStats();

  // Get the specific quiz for the current theme
  const getCurrentQuiz = (): Quiz => {
    const themeNumber = parseInt(themeId || '1');
    
    const quizzes: Quiz[] = [
      {
        id: 1,
        title: isZhHK ? '主題 1 小測驗：AI 自動化基礎概念' : 'Theme 1 Quiz: AI Automation Fundamentals',
        description: isZhHK ? '測試你對 AI 商業自動化基本概念的理解' : 'Test your understanding of AI business automation fundamentals',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: isZhHK ? 'AI 自動化與傳統自動化的主要區別是什麼？' : 'What is the main difference between AI automation and traditional automation?',
            options: [
              isZhHK ? 'AI 自動化更便宜' : 'AI automation is cheaper',
              isZhHK ? 'AI 自動化能理解、判斷和創造' : 'AI automation can understand, judge and create',
              isZhHK ? 'AI 自動化速度更快' : 'AI automation is faster',
              isZhHK ? 'AI 自動化更簡單' : 'AI automation is simpler'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? 'AI 自動化的核心優勢在於能夠理解、判斷和創造，處理更複雜的任務。' : 'The core advantage of AI automation is its ability to understand, judge and create, handling more complex tasks.'
          },
          {
            id: 2,
            question: isZhHK ? '實施 AI 自動化時，應該從哪裡開始？' : 'When implementing AI automation, where should you start?',
            options: [
              isZhHK ? '最新的技術' : 'The latest technology',
              isZhHK ? '最痛的工作流程' : 'The most painful workflows',
              isZhHK ? '最便宜的方案' : 'The cheapest solution',
              isZhHK ? '最複雜的系統' : 'The most complex systems'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? '從最痛、最耗時、最重複的工作開始，通常是 AI 自動化最好的切入點。' : 'Starting from the most painful, time-consuming, and repetitive work is usually the best entry point for AI automation.'
          },
          {
            id: 3,
            question: isZhHK ? 'AI 自動化的主要目標是什麼？' : 'What is the main goal of AI automation?',
            options: [
              isZhHK ? '完全取代人類員工' : 'Completely replace human employees',
              isZhHK ? '降低成本並提升員工價值' : 'Reduce costs and enhance employee value',
              isZhHK ? '增加工作複雜度' : 'Increase work complexity',
              isZhHK ? '減少工作機會' : 'Reduce job opportunities'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? 'AI 自動化的目標是將員工從重複性工作中解放出來，專注於更有創造力和價值的工作。' : 'The goal of AI automation is to free employees from repetitive work to focus on more creative and valuable tasks.'
          }
        ]
      },
      {
        id: 2,
        title: isZhHK ? '主題 2 小測驗：核心應用實戰' : 'Theme 2 Quiz: Core Applications',
        description: isZhHK ? '測試你對三大部門 AI 自動化應用的理解' : 'Test your understanding of AI automation applications for three key departments',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: isZhHK ? '在行銷自動化中，AI 的主要優勢是什麼？' : 'What is the main advantage of AI in marketing automation?',
            options: [
              isZhHK ? '只能發送大量郵件' : 'Can only send bulk emails',
              isZhHK ? '個人化內容生成和精準投放' : 'Personalized content generation and precise targeting',
              isZhHK ? '減少行銷預算' : 'Reduce marketing budget',
              isZhHK ? '完全自動化所有決策' : 'Fully automate all decisions'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? 'AI 能夠根據客戶數據生成個人化內容，並精準投放給目標受眾。' : 'AI can generate personalized content based on customer data and precisely target the right audience.'
          },
          {
            id: 2,
            question: isZhHK ? '24H 智慧客服的核心價值是什麼？' : 'What is the core value of 24H smart customer service?',
            options: [
              isZhHK ? '降低人力成本' : 'Reduce labor costs',
              isZhHK ? '提供即時、準確的客戶支援' : 'Provide instant, accurate customer support',
              isZhHK ? '只回答簡單問題' : 'Only answer simple questions',
              isZhHK ? '替代所有客服人員' : 'Replace all customer service staff'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? '智慧客服能夠24小時不間斷地提供即時、準確的客戶支援，提升客戶滿意度。' : 'Smart customer service can provide instant, accurate customer support 24/7, improving customer satisfaction.'
          },
          {
            id: 3,
            question: isZhHK ? '營運自動化最適合處理什麼類型的工作？' : 'What type of work is operations automation best suited for?',
            options: [
              isZhHK ? '創意設計工作' : 'Creative design work',
              isZhHK ? '重複性數據處理和報表生成' : 'Repetitive data processing and report generation',
              isZhHK ? '戰略決策制定' : 'Strategic decision making',
              isZhHK ? '客戶關係建立' : 'Customer relationship building'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? '營運自動化最擅長處理重複性、規律性的數據處理和報表生成工作。' : 'Operations automation excels at handling repetitive, regular data processing and report generation tasks.'
          }
        ]
      },
      {
        id: 3,
        title: isZhHK ? '主題 3 小測驗：進階整合與優化' : 'Theme 3 Quiz: Advanced Integration & Optimization',
        description: isZhHK ? '測試你對進階 AI 自動化整合與優化的掌握程度' : 'Test your mastery of advanced AI automation integration and optimization',
        passingScore: 70,
        questions: [
          {
            id: 1,
            question: isZhHK ? '多系統整合時，最重要的考量因素是什麼？' : 'What is the most important consideration when integrating multiple systems?',
            options: [
              isZhHK ? '系統成本' : 'System cost',
              isZhHK ? '數據安全性和隱私保護' : 'Data security and privacy protection',
              isZhHK ? '整合速度' : 'Integration speed',
              isZhHK ? '系統複雜度' : 'System complexity'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? '在多系統整合中，數據安全性和隱私保護是最重要的考量，必須確保客戶和公司資料的安全。' : 'In multi-system integration, data security and privacy protection are the most important considerations.'
          },
          {
            id: 2,
            question: isZhHK ? '如何持續優化 AI 自動化系統？' : 'How to continuously optimize AI automation systems?',
            options: [
              isZhHK ? '永不改變系統設定' : 'Never change system settings',
              isZhHK ? '定期分析數據、收集反饋並調整流程' : 'Regularly analyze data, collect feedback and adjust processes',
              isZhHK ? '只在系統出錯時才調整' : 'Only adjust when system errors occur',
              isZhHK ? '完全依賴AI自主優化' : 'Completely rely on AI self-optimization'
            ],
            correctAnswer: 1,
            explanation: isZhHK ? '持續優化需要定期分析系統數據，收集用戶反饋，並根據結果調整自動化流程。' : 'Continuous optimization requires regular analysis of system data, collecting user feedback, and adjusting automation processes based on results.'
          }
        ]
      }
    ];

    return quizzes[themeNumber - 1] || quizzes[0];
  };

  const currentQuiz = getCurrentQuiz();
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;
    const correct = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === currentQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correct / currentQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleQuizComplete = () => {
    const score = calculateScore();
    if (score >= (currentQuiz?.passingScore || 70)) {
      // 🎯 標記測驗為完成
      markQuizCompleted(currentThemeId, score);
      
      // 導航邏輯保持不變
      resetQuiz();
      navigate('/courses/ai-business-automation/learning');
    } else {
      // If failed, reset and allow retaking
      resetQuiz();
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
              <div className="page-content-with-nav pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <motion.div {...fadeIn} className="mb-6">
            <Button
              onClick={() => navigate('/courses/ai-business-automation/learning')}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhHK ? '返回學習頁面' : 'Back to Learning Page'}
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div {...fadeIn} className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                {currentQuiz?.title}
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              {currentQuiz?.description}
            </p>
          </motion.div>

          {!showResults ? (
            /* Quiz Questions */
            <motion.div {...fadeIn}>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{currentQuiz?.title}</CardTitle>
                    <Badge variant="outline" className="text-gray-300">
                      {currentQuestionIndex + 1} / {currentQuiz?.questions.length}
                    </Badge>
                  </div>
                  <Progress 
                    value={((currentQuestionIndex + 1) / (currentQuiz?.questions.length || 1)) * 100} 
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
                                ? 'border-yellow-500 bg-yellow-500/10 text-white'
                                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswers[currentQuestionIndex] === index
                                  ? 'border-yellow-500 bg-yellow-500 text-white'
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
                        <Button
                          variant="outline"
                          onClick={resetQuiz}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {isZhHK ? '重新測驗' : 'Retake Quiz'}
                        </Button>
                        <Button
                          onClick={handleNextQuestion}
                          disabled={selectedAnswers[currentQuestionIndex] === undefined}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          {currentQuestionIndex < (currentQuiz?.questions.length || 1) - 1 
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
                    {calculateScore() >= (currentQuiz?.passingScore || 70) ? (
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
                    {calculateScore() >= (currentQuiz?.passingScore || 70) 
                      ? (isZhHK ? '恭喜通過！' : 'Congratulations!')
                      : (isZhHK ? '需要再努力' : 'Keep Trying!')
                    }
                  </CardTitle>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {calculateScore()}%
                  </div>
                  <p className="text-gray-300">
                    {isZhHK ? `你答對了 ${selectedAnswers.filter((answer, index) => answer === currentQuiz?.questions[index].correctAnswer).length} / ${currentQuiz?.questions.length} 道題目` : 
                      `You got ${selectedAnswers.filter((answer, index) => answer === currentQuiz?.questions[index].correctAnswer).length} / ${currentQuiz?.questions.length} questions correct`}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentQuiz?.questions.map((question, index) => (
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
                    {calculateScore() >= (currentQuiz?.passingScore || 70) ? (
                      // User PASSED - Show Continue Learning as primary action
                      <>
                        <Button
                          onClick={() => {
                            handleQuizComplete();
                            // Navigate to next theme or back to course if all themes completed
                            const nextTheme = parseInt(themeId || '1') + 1;
                            if (nextTheme <= 3) {
                              navigate(`/courses/ai-business-automation/theme/${nextTheme}`);
                            } else {
                              // All themes completed - show completion message and go back to learning page
                              navigate('/courses/ai-business-automation/learning');
                            }
                          }}
                          className="flex-1 nav-button-primary bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                          <Trophy className="w-4 h-4 mr-2" />
                          {(() => {
                            const nextTheme = parseInt(themeId || '1') + 1;
                            if (nextTheme <= 3) {
                              return isZhHK ? `繼續學習 - 第${nextTheme}大主題` : `Continue to Theme ${nextTheme}`;
                            } else {
                              return isZhHK ? '完成課程！' : 'Course Complete!';
                            }
                          })()}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetQuiz}
                          className="border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {isZhHK ? '重新測驗' : 'Retake Quiz'}
                        </Button>
                      </>
                    ) : (
                      // User FAILED - Show retake as primary action
                      <>
                        <Button
                          variant="outline"
                          onClick={handleQuizComplete}
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {isZhHK ? '返回選擇' : 'Back to Selection'}
                        </Button>
                        <Button
                          onClick={resetQuiz}
                          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {isZhHK ? '重新測驗' : 'Retake Quiz'}
                        </Button>
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

export default AIBusinessAutomationQuiz; 