import React, { useState, useEffect } from 'react', AnimatePresence } from 'framer-motion' } from '@/components/ui/button', CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card' } from '@/components/ui/input' } from '@/components/ui/textarea' } from '@/components/ui/badge' } from '@/components/ui/progress' } from '@/components/ui/scroll-area',
  Brain,
  RotateCcw,
  Play,
  Code,
  ImageIcon,
  MousePointer,
  Zap,
  BookOpen,
  Award
} from 'lucide-react'

// 
interface BaseQuestion {
  id: string;
  type: 'multiple-choice' | 'code-analysis' | 'prompt-writing' | 'concept-matching' | 'interactive-choice'
  question: string;
  questionZh: string;
  difficulty: 'easy' | 'medium' | 'hard'
  points: number;
  timeLimit?: number; // �?
  explanation: string;
  explanationZh: string;
  videoTimestamp?: string; // : "12:34"
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice'
  }[];
}

interface CodeAnalysisQuestion extends BaseQuestion {
  type: 'code-analysis'
  }[];
}

interface PromptWritingQuestion extends BaseQuestion {
  type: 'prompt-writing'
}

interface ConceptMatchingQuestion extends BaseQuestion {
  type: 'concept-matching'
  }[];
  definitions: {
    id: string;
    definition: string;
    definitionZh: string;
    matchesTerm: string;
  }[];
}

interface InteractiveChoiceQuestion extends BaseQuestion {
  type: 'interactive-choice'
  scenario: string;
  scenarioZh: string;
  options: {
    id: string;
    text: string;
    textZh: string;
    isCorrect: boolean;
    media?: {
      type: 'image' | 'code'
    };
  }[];
}

type Question = MultipleChoiceQuestion | CodeAnalysisQuestion | PromptWritingQuestion | ConceptMatchingQuestion | InteractiveChoiceQuestion;

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
  courseId: string;
  onComplete: (score: number) => void;
}

interface QuizResult {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  moduleId,
  courseId,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>(''
    {
      id: '1'
      type: 'multiple-choice'
      question: 'What is the main purpose of prompt engineering?'
      questionZh: 'Prompt Engineering 的主要目標是什麼？'
      difficulty: 'easy'
      explanation: 'Prompt engineering is the process of designing and optimizing prompts to get better responses from AI models.'
      explanationZh: 'Prompt Engineering 是設計和優化提示詞以從AI 模型獲得更好回應的過程。'
      videoTimestamp: '05:32'
      options: [
        {
          id: 'a'
          text: 'To make AI models faster'
          textZh: '� 模�'
          feedback: 'Speed is not the primary goal of prompt engineering.'
          feedbackZh: '速度不是 Prompt Engineering 的主要目標'
        },
        {
          id: 'b'
          text: 'To get better and more accurate responses from AI'
          textZh: '讓AI獲得更好更準確的回應'
          feedback: 'Correct! Prompt engineering focuses on crafting prompts that elicit the desired response.'
          feedbackZh: '正確！Prompt Engineering 專注於製作能引出期望回應的提示詞'
        },
        {
          id: 'c'
          text: 'To reduce the cost of AI usage'
          textZh: ' AI 使用'
          feedback: ', cost reduction is not the primary purpose.'
          feedbackZh: '
        },
        {
          id: 'd'
          text: 'To train new AI models'
          textZh: '訓練 AI 模�?'
          feedback: ', not training new ones.'
          feedbackZh: '
        }
      ]
    },
    {
      id: '2'
      type: 'code-analysis'
      question: 'What will be the output of this Python code?'
      questionZh: ' Python �'
      difficulty: 'medium'
      explanation: 'The code creates a list comprehension that filters even numbers and squares them.'
      explanationZh: '
      videoTimestamp: '12:45'
      language: 'python'
      options: [
        {
          id: 'a'
          text: ', 4, 9, 16, 25, 36]'
          textZh: ', 4, 9, 16, 25, 36]'
        },
        {
          id: 'b'
          text: ', 16, 36]'
          textZh: ', 16, 36]'
        },
        {
          id: 'c'
          text: ', 4, 6]'
          textZh: ', 4, 6]'
        },
        {
          id: 'd'
          text: 'Error'
          textZh: ''
        }
      ]
    },
    {
      id: '3'
      type: 'prompt-writing'
      question: 'Write a prompt to generate a marketing email for a new coffee machine.'
      questionZh: '
      difficulty: 'hard'
      explanation: ', include context, and specify the desired tone and format.'
      explanationZh: '
      videoTimestamp: '18:20'
      scenario: 'You are a marketing manager at a coffee equipment company. You need to create an email to promote your new premium coffee machine to existing customers.'
      scenarioZh: '
      targetOutput: ', personalized greeting, product benefits, and call-to-action.'
      evaluationCriteria: [
        'Includes specific role and context'
        ')'
        ')'
        ', enthusiastic)'
        ', call-to-action)'
      evaluationCriteriaZh: [
        ''
        ''
        '
        ''
        ''
    },
    {
      id: '4'
      type: 'concept-matching'
      question: 'Match the AI concepts with their definitions.'
      questionZh: '
      difficulty: 'medium'
      explanation: 'Understanding key AI terminology is essential for effective prompt engineering.'
      explanationZh: '
      videoTimestamp: '25:10'
      concepts: [
        { id: 'transformer', term: 'Transformer', termZh: 'Transformer'
        { id: 'rag', term: 'RAG', termZh: 'RAG'
        { id: 'lora', term: 'LoRA', termZh: 'LoRA'
        { id: 'finetuning', term: 'Fine-tuning', termZh: '微調'
      definitions: [
        {
          id: 'def1'
          definition: 'A neural network architecture that uses attention mechanisms'
          definitionZh: '使用注�'
          matchesTerm: 'transformer'
        },
        {
          id: 'def2'
          definition: 'Retrieval-Augmented Generation'
          definitionZh: '檢索增強'
          matchesTerm: 'rag'
        },
        {
          id: 'def3'
          definition: 'Low-Rank Adaptation for efficient model training'
          definitionZh: '
          matchesTerm: 'lora'
        },
        {
          id: 'def4'
          definition: 'Training a pre-trained model on specific data'
          definitionZh: '
          matchesTerm: 'finetuning'
        }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // 
  useEffect(() => {
    if (isOpen && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, isFinished]);

  // 
  useEffect(() => {
    if (isOpen && !startTime) {
      setStartTime(new Date());
    }
  }, [isOpen, startTime]);

  // 
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0'
  };

  // 
  const handleSubmitAnswer = () => {
    if (!currentAnswer) return;

    const questionStartTime = startTime || new Date();
    const timeSpent = Math.floor((new Date().getTime() - questionStartTime.getTime()) / 1000);
    
    let isCorrect = false;
    let points = 0;

    // 評估答�?
    switch (currentQuestion.type) {
      case 'multiple-choice'
      case 'code-analysis'
      case 'interactive-choice'
        isCorrect = currentAnswer === correctOption
        points = isCorrect ? currentQuestion.points : 0;
        break;
        
      case 'prompt-writing').includes('marketing') || prompt.toLowerCase().includes('email').includes('coffee') || prompt.toLowerCase().includes('machine').includes('customer') || prompt.toLowerCase().includes('existing'
        break;
        
      case 'concept-matching'
        }, {} as {[key: string]: string});
        
        const userMatches = matchedPairs;
        let correctCount = 0;
        
        Object.keys(correctMatches).forEach(term => {
          if (userMatches[term] === correctMatches[term]) {
            correctCount++;
          }
        });
        
        isCorrect = correctCount === Object.keys(correctMatches).length;
        points = Math.round((correctCount / Object.keys(correctMatches).length) * currentQuestion.points);
        break;
    }

    const result: QuizResult = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      isCorrect,
      timeSpent,
      points
    };

    setAnswers(prev => [...prev, result]);
    setShowFeedback(true);
    
    // 延遲顯示下�
    setTimeout(() => {
      setShowFeedback(false);
      setCurrentAnswer(''
      } else {
        handleFinishQuiz();
      }
    }, 3000);
  };

  // 完�
  const handleFinishQuiz = () => {
    setIsFinished(true);
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxScore = questions.reduce((sum, question) => sum + question.points, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    setScore(percentage);
    setShowResult(true);
    onComplete(percentage);
  };

  // 
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
    setStartTime(new Date());
    setIsFinished(false);
    setShowFeedback(false);
    setCurrentAnswer(''
  };

  // 渲�
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice'
      case 'code-analysis'
      case 'interactive-choice'
        return (
          <div className="space-y-4"
            {currentQuestion.type === 'code-analysis'
              <div className="bg-gray-900 rounded-lg p-4 mb-4"
                <pre className="text-green-400 font-mono text-sm overflow-x-auto"
            )}
            
            <div className="grid gap-3"
                  className={`cursor-pointer transition-all duration-200 ${
                    currentAnswer === option.id
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => setCurrentAnswer(option.id)}
                >
                  <CardContent className="p-4"
                    <div className="flex items-start space-x-3"
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        currentAnswer === option.id
                          ? 'border-white bg-white'
                          : 'border-gray-400'
                      }`}>
                        {currentAnswer === option.id && <div className="w-3 h-3 bg-blue-600 rounded-full"
                      </div>
                      <div className="flex-1"
                        <p className="text-sm"
                        {option.media && (
                          <div className="mt-2"
                            {option.media.type === 'image'} alt="Option" className="max-w-full h-auto rounded"
                            )}
                            {option.media.type === 'code'
                              <pre className="bg-gray-900 p-2 rounded text-xs overflow-x-auto"
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'prompt-writing'
        return (
          <div className="space-y-4"
            <div className="bg-gray-700 rounded-lg p-4"
              <h4 className="font-semibold mb-2"
              <p className="text-sm"
            </div>
            
            <div className="space-y-2"
              <label className="text-sm font-medium"
                placeholder=" prompt..."
                className="] bg-gray-700 border-gray-600"
              />
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4"
              <h4 className="font-semibold mb-2"
              <ul className="text-sm space-y-1"} className="flex items-center space-x-2"
                    <Target className="w-4 h-4 text-blue-400"
                ))}
              </ul>
            </div>
          </div>
        );

      case 'concept-matching'
        return (
          <div className="space-y-4"
            <div className="grid md:grid-cols-2 gap-6"
              <div>
                <h4 className="font-semibold mb-3"
                <div className="space-y-2"} className="bg-gray-700 border-gray-600"
                      <CardContent className="p-3"
                        <div className="flex items-center justify-between"
                          <span className="font-medium"
                          <Badge variant="outline" className="text-xs"] ? '已匹 : '
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3"
                <div className="space-y-2"
                          ? 'bg-green-600 border-green-500'
                          : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        // 簡�
                        const newPairs = { ...matchedPairs };
                        const concept = currentQuestion.concepts.find(c => c.id === definition.matchesTerm);
                        if (concept) {
                          newPairs[concept.id] = definition.id;
                          setMatchedPairs(newPairs);
                          setCurrentAnswer(Object.keys(newPairs));
                        }
                      }}
                    >
                      <CardContent className="p-3"
                        <p className="text-sm"
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          className="] overflow-hidden"
        >
          {!showResult ? (
            <div className="flex flex-col h-full"
              <div className="bg-gray-700 p-4 border-b border-gray-600"
                <div className="flex items-center justify-between mb-3"
                  <div className="flex items-center space-x-3"
                    <Brain className="w-6 h-6 text-blue-400"
                    <h2 className="text-xl font-bold text-white"
                    <Badge variant="outline" className="text-blue-400 border-blue-400"
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4"
                    <div className="flex items-center space-x-2"
                      <Clock className="w-4 h-4 text-yellow-400"
                      <span className="text-sm font-mono"
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4"
                  className="w-full"
              <div className="flex-1 overflow-y-auto p-6"
                <div className="max-w-3xl mx-auto"
                      className="text-center space-y-4"
                    >
                      <div className="flex items-center justify-center space-x-2"
                          <CheckCircle className="w-8 h-8 text-green-400"
                        ) : (
                          <XCircle className="w-8 h-8 text-red-400"
                        )}
                        <h3 className="text-xl font-bold"] ? '答�' : '
                        </h3>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-4"
                        <p className="text-sm text-gray-300 mb-3"
                        </p>
                        
                        {currentQuestion.videoTimestamp && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                          >
                            <Play className="w-4 h-4 mr-2"
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-6"
                      <div className="flex items-center justify-between"
                        <div className="flex items-center space-x-2"
                          <Badge className={`${
                            currentQuestion.difficulty === 'easy' ? 'bg-green-600'
                            currentQuestion.difficulty === 'medium' ? 'bg-yellow-600'
                            'bg-red-600'
                          }`}>
                            {currentQuestion.difficulty === 'easy' ? '簡單'
                             currentQuestion.difficulty === 'medium' ? '中�?' : ''
                          </Badge>
                          <span className="text-sm text-gray-400"
                          </span>
                        </div>
                        
                        {currentQuestion.timeLimit && (
                          <div className="flex items-center space-x-2 text-sm text-gray-400"
                            <Clock className="w-4 h-4"
                        )}
                      </div>
                      
                      <div className="text-center"
                        <h3 className="text-lg font-semibold mb-4"
                      
                      <div className="flex justify-between items-center pt-6"
                        <Button
                          variant="ghost"
                          className="text-gray-400"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                        >
                          {currentQuestionIndex === questions.length - 1 ? '完�' : '
                          <ArrowRight className="w-4 h-4 ml-2"
                  )}
                </div>
              </div>
            </div>
          ) : (
            // 結�
            <div className="p-8 text-center"
              <div className="max-w-2xl mx-auto space-y-6"
                <div className="flex items-center justify-center space-x-3"
                  <Trophy className="w-12 h-12 text-yellow-400"
                  <h2 className="text-3xl font-bold text-white"
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6"
                  <div className="text-6xl font-bold text-blue-400 mb-2"
                  </div>
                  <p className="text-gray-300"
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center"
                  <div className="bg-gray-700 rounded-lg p-4"
                    <div className="text-2xl font-bold text-green-400"
                    </div>
                    <p className="text-sm text-gray-400"
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4"
                    <div className="text-2xl font-bold text-blue-400"
                    </div>
                    <p className="text-sm text-gray-400"
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4"
                    <div className="text-2xl font-bold text-purple-400"
                      {score >= 80 ? 'A' : score >= 60 ? 'B' : 'C'
                    </div>
                    <p className="text-sm text-gray-400"
                  </div>
                </div>
                
                {score < 80 && (
                  <div className="bg-orange-900/20 border border-orange-600 rounded-lg p-4"
                    <div className="flex items-center space-x-2 mb-2"
                      <Lightbulb className="w-5 h-5 text-orange-400"
                      <span className="font-semibold text-orange-400"
                    </div>
                    <p className="text-sm text-gray-300"
                )}
                
                <div className="flex justify-center space-x-4"
                  <Button
                    variant="outline"
                    className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2"
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizModal; 
