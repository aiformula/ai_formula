import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Target,
  Trophy,
  Brain,
  RotateCcw,
  Play,
  Code,
  ImageIcon,
  MousePointer,
  Zap,
  BookOpen,
  Award
} from 'lucide-react';

// 問題類型定義
interface BaseQuestion {
  id: string;
  type: 'multiple-choice' | 'code-analysis' | 'prompt-writing' | 'concept-matching' | 'interactive-choice';
  question: string;
  questionZh: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit?: number; // 秒
  explanation: string;
  explanationZh: string;
  videoTimestamp?: string; // 格式: "12:34"
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: {
    id: string;
    text: string;
    textZh: string;
    isCorrect: boolean;
    feedback?: string;
    feedbackZh?: string;
  }[];
}

interface CodeAnalysisQuestion extends BaseQuestion {
  type: 'code-analysis';
  codeSnippet: string;
  language: string;
  options: {
    id: string;
    text: string;
    textZh: string;
    isCorrect: boolean;
  }[];
}

interface PromptWritingQuestion extends BaseQuestion {
  type: 'prompt-writing';
  scenario: string;
  scenarioZh: string;
  targetOutput: string;
  evaluationCriteria: string[];
  evaluationCriteriaZh: string[];
}

interface ConceptMatchingQuestion extends BaseQuestion {
  type: 'concept-matching';
  concepts: {
    id: string;
    term: string;
    termZh: string;
  }[];
  definitions: {
    id: string;
    definition: string;
    definitionZh: string;
    matchesTerm: string;
  }[];
}

interface InteractiveChoiceQuestion extends BaseQuestion {
  type: 'interactive-choice';
  scenario: string;
  scenarioZh: string;
  options: {
    id: string;
    text: string;
    textZh: string;
    isCorrect: boolean;
    media?: {
      type: 'image' | 'code';
      content: string;
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
  const [timeLeft, setTimeLeft] = useState(300); // 5 分鐘
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const [matchedPairs, setMatchedPairs] = useState<{[key: string]: string}>({});
  const [score, setScore] = useState(0);

  // 模擬問題數據
  const questions: Question[] = [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What is the main purpose of prompt engineering?',
      questionZh: 'Prompt Engineering 的主要目的是什麼？',
      difficulty: 'easy',
      points: 10,
      timeLimit: 60,
      explanation: 'Prompt engineering is the process of designing and optimizing prompts to get better responses from AI models.',
      explanationZh: 'Prompt Engineering 是設計和優化提示詞以從 AI 模型獲得更好回應的過程。',
      videoTimestamp: '05:32',
      options: [
        {
          id: 'a',
          text: 'To make AI models faster',
          textZh: '讓 AI 模型更快',
          isCorrect: false,
          feedback: 'Speed is not the primary goal of prompt engineering.',
          feedbackZh: '速度不是 Prompt Engineering 的主要目標。'
        },
        {
          id: 'b',
          text: 'To get better and more accurate responses from AI',
          textZh: '從 AI 獲得更好更準確的回應',
          isCorrect: true,
          feedback: 'Correct! Prompt engineering focuses on crafting prompts that elicit the desired response.',
          feedbackZh: '正確！Prompt Engineering 專注於製作能引出所需回應的提示詞。'
        },
        {
          id: 'c',
          text: 'To reduce the cost of AI usage',
          textZh: '降低 AI 使用成本',
          isCorrect: false,
          feedback: 'While good prompts can be more efficient, cost reduction is not the primary purpose.',
          feedbackZh: '雖然好的提示詞可以更有效率，但成本削減不是主要目的。'
        },
        {
          id: 'd',
          text: 'To train new AI models',
          textZh: '訓練新的 AI 模型',
          isCorrect: false,
          feedback: 'Prompt engineering works with existing models, not training new ones.',
          feedbackZh: 'Prompt Engineering 是與現有模型合作，而不是訓練新模型。'
        }
      ]
    },
    {
      id: '2',
      type: 'code-analysis',
      question: 'What will be the output of this Python code?',
      questionZh: '這段 Python 代碼的輸出是什麼？',
      difficulty: 'medium',
      points: 15,
      timeLimit: 90,
      explanation: 'The code creates a list comprehension that filters even numbers and squares them.',
      explanationZh: '這段代碼創建了一個列表推導，過濾偶數並將其平方。',
      videoTimestamp: '12:45',
      codeSnippet: `numbers = [1, 2, 3, 4, 5, 6]
result = [x**2 for x in numbers if x % 2 == 0]
print(result)`,
      language: 'python',
      options: [
        {
          id: 'a',
          text: '[1, 4, 9, 16, 25, 36]',
          textZh: '[1, 4, 9, 16, 25, 36]',
          isCorrect: false
        },
        {
          id: 'b',
          text: '[4, 16, 36]',
          textZh: '[4, 16, 36]',
          isCorrect: true
        },
        {
          id: 'c',
          text: '[2, 4, 6]',
          textZh: '[2, 4, 6]',
          isCorrect: false
        },
        {
          id: 'd',
          text: 'Error',
          textZh: '錯誤',
          isCorrect: false
        }
      ]
    },
    {
      id: '3',
      type: 'prompt-writing',
      question: 'Write a prompt to generate a marketing email for a new coffee machine.',
      questionZh: '寫一個提示詞來生成新咖啡機的營銷電子郵件。',
      difficulty: 'hard',
      points: 20,
      timeLimit: 180,
      explanation: 'A good prompt should be specific, include context, and specify the desired tone and format.',
      explanationZh: '好的提示詞應該具體，包含上下文，並指定所需的語調和格式。',
      videoTimestamp: '18:20',
      scenario: 'You are a marketing manager at a coffee equipment company. You need to create an email to promote your new premium coffee machine to existing customers.',
      scenarioZh: '您是一家咖啡設備公司的營銷經理。您需要創建一封電子郵件向現有客戶推廣新的優質咖啡機。',
      targetOutput: 'A compelling marketing email with subject line, personalized greeting, product benefits, and call-to-action.',
      evaluationCriteria: [
        'Includes specific role and context',
        'Mentions target audience (existing customers)',
        'Requests specific format (email with subject line)',
        'Specifies tone (professional, enthusiastic)',
        'Includes key elements (benefits, call-to-action)'
      ],
      evaluationCriteriaZh: [
        '包含特定角色和上下文',
        '提及目標受眾（現有客戶）',
        '請求特定格式（帶主題行的電子郵件）',
        '指定語調（專業、熱情）',
        '包含關鍵元素（優勢、行動呼籲）'
      ]
    },
    {
      id: '4',
      type: 'concept-matching',
      question: 'Match the AI concepts with their definitions.',
      questionZh: '將 AI 概念與其定義匹配。',
      difficulty: 'medium',
      points: 15,
      timeLimit: 120,
      explanation: 'Understanding key AI terminology is essential for effective prompt engineering.',
      explanationZh: '理解關鍵 AI 術語對於有效的 Prompt Engineering 至關重要。',
      videoTimestamp: '25:10',
      concepts: [
        { id: 'transformer', term: 'Transformer', termZh: 'Transformer' },
        { id: 'rag', term: 'RAG', termZh: 'RAG' },
        { id: 'lora', term: 'LoRA', termZh: 'LoRA' },
        { id: 'finetuning', term: 'Fine-tuning', termZh: '微調' }
      ],
      definitions: [
        {
          id: 'def1',
          definition: 'A neural network architecture that uses attention mechanisms',
          definitionZh: '使用注意力機制的神經網絡架構',
          matchesTerm: 'transformer'
        },
        {
          id: 'def2',
          definition: 'Retrieval-Augmented Generation',
          definitionZh: '檢索增強生成',
          matchesTerm: 'rag'
        },
        {
          id: 'def3',
          definition: 'Low-Rank Adaptation for efficient model training',
          definitionZh: '用於高效模型訓練的低秩適應',
          matchesTerm: 'lora'
        },
        {
          id: 'def4',
          definition: 'Training a pre-trained model on specific data',
          definitionZh: '在特定數據上訓練預訓練模型',
          matchesTerm: 'finetuning'
        }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // 倒計時
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

  // 開始計時
  useEffect(() => {
    if (isOpen && !startTime) {
      setStartTime(new Date());
    }
  }, [isOpen, startTime]);

  // 格式化時間
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 提交答案
  const handleSubmitAnswer = () => {
    if (!currentAnswer) return;

    const questionStartTime = startTime || new Date();
    const timeSpent = Math.floor((new Date().getTime() - questionStartTime.getTime()) / 1000);
    
    let isCorrect = false;
    let points = 0;

    // 評估答案
    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'code-analysis':
      case 'interactive-choice':
        const correctOption = currentQuestion.options.find(opt => opt.isCorrect);
        isCorrect = currentAnswer === correctOption?.id;
        points = isCorrect ? currentQuestion.points : 0;
        break;
        
      case 'prompt-writing':
        // 模擬 AI 評估
        const prompt = currentAnswer as string;
        const criteria = currentQuestion.evaluationCriteria;
        let score = 0;
        
        // 簡單的關鍵詞檢查
        if (prompt.toLowerCase().includes('marketing') || prompt.toLowerCase().includes('email')) score += 2;
        if (prompt.toLowerCase().includes('coffee') || prompt.toLowerCase().includes('machine')) score += 2;
        if (prompt.toLowerCase().includes('customer') || prompt.toLowerCase().includes('existing')) score += 1;
        
        isCorrect = score >= 3;
        points = Math.round((score / 5) * currentQuestion.points);
        break;
        
      case 'concept-matching':
        const correctMatches = currentQuestion.definitions.reduce((acc, def) => {
          acc[def.matchesTerm] = def.id;
          return acc;
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
    
    // 延遲顯示下一題或完成
    setTimeout(() => {
      setShowFeedback(false);
      setCurrentAnswer('');
      setMatchedPairs({});
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleFinishQuiz();
      }
    }, 3000);
  };

  // 完成測驗
  const handleFinishQuiz = () => {
    setIsFinished(true);
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxScore = questions.reduce((sum, question) => sum + question.points, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    setScore(percentage);
    setShowResult(true);
    onComplete(percentage);
  };

  // 重新開始
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
    setStartTime(new Date());
    setIsFinished(false);
    setShowFeedback(false);
    setCurrentAnswer('');
    setMatchedPairs({});
    setScore(0);
  };

  // 渲染問題
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'code-analysis':
      case 'interactive-choice':
        return (
          <div className="space-y-4">
            {currentQuestion.type === 'code-analysis' && (
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  <code>{currentQuestion.codeSnippet}</code>
                </pre>
              </div>
            )}
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    currentAnswer === option.id
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => setCurrentAnswer(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        currentAnswer === option.id
                          ? 'border-white bg-white'
                          : 'border-gray-400'
                      }`}>
                        {currentAnswer === option.id && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{option.textZh}</p>
                        {option.media && (
                          <div className="mt-2">
                            {option.media.type === 'image' && (
                              <img src={option.media.content} alt="Option" className="max-w-full h-auto rounded" />
                            )}
                            {option.media.type === 'code' && (
                              <pre className="bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                                <code>{option.media.content}</code>
                              </pre>
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

      case 'prompt-writing':
        return (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">情境描述：</h4>
              <p className="text-sm">{currentQuestion.scenarioZh}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">您的 Prompt：</label>
              <Textarea
                value={currentAnswer as string}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="在這裡寫下您的 prompt..."
                className="min-h-[150px] bg-gray-700 border-gray-600"
              />
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">評估標準：</h4>
              <ul className="text-sm space-y-1">
                {currentQuestion.evaluationCriteriaZh.map((criteria, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'concept-matching':
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">概念：</h4>
                <div className="space-y-2">
                  {currentQuestion.concepts.map((concept) => (
                    <Card key={concept.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{concept.termZh}</span>
                          <Badge variant="outline" className="text-xs">
                            {matchedPairs[concept.id] ? '已匹配' : '未匹配'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">定義：</h4>
                <div className="space-y-2">
                  {currentQuestion.definitions.map((definition) => (
                    <Card
                      key={definition.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        Object.values(matchedPairs).includes(definition.id)
                          ? 'bg-green-600 border-green-500'
                          : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                      }`}
                      onClick={() => {
                        // 簡化的匹配邏輯
                        const newPairs = { ...matchedPairs };
                        const concept = currentQuestion.concepts.find(c => c.id === definition.matchesTerm);
                        if (concept) {
                          newPairs[concept.id] = definition.id;
                          setMatchedPairs(newPairs);
                          setCurrentAnswer(Object.keys(newPairs));
                        }
                      }}
                    >
                      <CardContent className="p-3">
                        <p className="text-sm">{definition.definitionZh}</p>
                      </CardContent>
                    </Card>
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
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {!showResult ? (
            <div className="flex flex-col h-full">
              {/* 頂部進度條 */}
              <div className="bg-gray-700 p-4 border-b border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-6 h-6 text-blue-400" />
                    <h2 className="text-xl font-bold text-white">智能測驗</h2>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      {currentQuestionIndex + 1} / {questions.length}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Progress 
                  value={((currentQuestionIndex + 1) / questions.length) * 100} 
                  className="w-full"
                />
              </div>

              {/* 問題內容 */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                  {showFeedback ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-4"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {answers[answers.length - 1]?.isCorrect ? (
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        ) : (
                          <XCircle className="w-8 h-8 text-red-400" />
                        )}
                        <h3 className="text-xl font-bold">
                          {answers[answers.length - 1]?.isCorrect ? '答對了！' : '答錯了'}
                        </h3>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-4">
                        <p className="text-sm text-gray-300 mb-3">
                          {currentQuestion.explanationZh}
                        </p>
                        
                        {currentQuestion.videoTimestamp && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            重溫相關內容 ({currentQuestion.videoTimestamp})
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={`${
                            currentQuestion.difficulty === 'easy' ? 'bg-green-600' :
                            currentQuestion.difficulty === 'medium' ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}>
                            {currentQuestion.difficulty === 'easy' ? '簡單' :
                             currentQuestion.difficulty === 'medium' ? '中等' : '困難'}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {currentQuestion.points} 分
                          </span>
                        </div>
                        
                        {currentQuestion.timeLimit && (
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>建議時間: {currentQuestion.timeLimit}秒</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">
                          {currentQuestion.questionZh}
                        </h3>
                      </div>
                      
                      {renderQuestion()}
                      
                      <div className="flex justify-between items-center pt-6">
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                          disabled={currentQuestionIndex === 0}
                          className="text-gray-400"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          上一題
                        </Button>
                        
                        <Button
                          onClick={handleSubmitAnswer}
                          disabled={!currentAnswer}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                        >
                          {currentQuestionIndex === questions.length - 1 ? '完成測驗' : '下一題'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // 結果頁面
            <div className="p-8 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Trophy className="w-12 h-12 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-white">測驗完成！</h2>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="text-6xl font-bold text-blue-400 mb-2">
                    {score}%
                  </div>
                  <p className="text-gray-300">
                    您答對了 {answers.filter(a => a.isCorrect).length} / {questions.length} 題
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">
                      {answers.reduce((sum, a) => sum + a.points, 0)}
                    </div>
                    <p className="text-sm text-gray-400">總分</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(answers.reduce((sum, a) => sum + a.timeSpent, 0) / 60)}
                    </div>
                    <p className="text-sm text-gray-400">用時(分鐘)</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      {score >= 80 ? 'A' : score >= 60 ? 'B' : 'C'}
                    </div>
                    <p className="text-sm text-gray-400">等級</p>
                  </div>
                </div>
                
                {score < 80 && (
                  <div className="bg-orange-900/20 border border-orange-600 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-orange-400" />
                      <span className="font-semibold text-orange-400">建議</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      您似乎在這個章節遇到一些困難。我們的 AI 助教已經準備好一份個人化的複習筆記給您，您想現在查看嗎？
                    </p>
                  </div>
                )}
                
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重新測驗
                  </Button>
                  <Button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    完成
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizModal; 