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

// ?èÈ?È°ûÂ?ÂÆöÁæ©
interface BaseQuestion {
  id: string;
  type: 'multiple-choice' | 'code-analysis' | 'prompt-writing' | 'concept-matching' | 'interactive-choice';
  question: string;
  questionZh: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit?: number; // Áß?
  explanation: string;
  explanationZh: string;
  videoTimestamp?: string; // ?ºÂ?: "12:34"
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
  const [timeLeft, setTimeLeft] = useState(300); // 5 ?ÜÈ?
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const [matchedPairs, setMatchedPairs] = useState<{[key: string]: string}>({});
  const [score, setScore] = useState(0);

  // Ê®°Êì¨?èÈ??∏Ê?
  const questions: Question[] = [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What is the main purpose of prompt engineering?',
      questionZh: 'Prompt Engineering ?Ñ‰∏ªË¶ÅÁõÆ?ÑÊòØ‰ªÄÈ∫ºÔ?',
      difficulty: 'easy',
      points: 10,
      timeLimit: 60,
      explanation: 'Prompt engineering is the process of designing and optimizing prompts to get better responses from AI models.',
      explanationZh: 'Prompt Engineering ?ØË®≠Ë®àÂ??™Â??êÁ§∫Ë©û‰ª•Âæ?AI Ê®°Â??≤Â??¥Â•Ω?ûÊ??ÑÈ?Á®ã„Ä?,
      videoTimestamp: '05:32',
      options: [
        {
          id: 'a',
          text: 'To make AI models faster',
          textZh: 'ËÆ?AI Ê®°Â??¥Âø´',
          isCorrect: false,
          feedback: 'Speed is not the primary goal of prompt engineering.',
          feedbackZh: '?üÂ∫¶‰∏çÊòØ Prompt Engineering ?Ñ‰∏ªË¶ÅÁõÆÊ®ô„Ä?
        },
        {
          id: 'b',
          text: 'To get better and more accurate responses from AI',
          textZh: 'Âæ?AI ?≤Â??¥Â•Ω?¥Ê?Á¢∫Á??ûÊ?',
          isCorrect: true,
          feedback: 'Correct! Prompt engineering focuses on crafting prompts that elicit the desired response.',
          feedbackZh: 'Ê≠?¢∫ÔºÅPrompt Engineering Â∞àÊ≥®?ºË£Ω‰ΩúËÉΩÂºïÂá∫?Ä?Ä?ûÊ??ÑÊ?Á§∫Ë???
        },
        {
          id: 'c',
          text: 'To reduce the cost of AI usage',
          textZh: '?ç‰? AI ‰ΩøÁî®?êÊú¨',
          isCorrect: false,
          feedback: 'While good prompts can be more efficient, cost reduction is not the primary purpose.',
          feedbackZh: '?ñÁÑ∂Â•ΩÁ??êÁ§∫Ë©ûÂèØ‰ª•Êõ¥?âÊ??áÔ?‰ΩÜÊ??¨Â?Ê∏õ‰??Ø‰∏ªË¶ÅÁõÆ?Ñ„Ä?
        },
        {
          id: 'd',
          text: 'To train new AI models',
          textZh: 'Ë®ìÁ∑¥?∞Á? AI Ê®°Â?',
          isCorrect: false,
          feedback: 'Prompt engineering works with existing models, not training new ones.',
          feedbackZh: 'Prompt Engineering ?ØË??æÊ?Ê®°Â??à‰?ÔºåËÄå‰??ØË?Á∑¥Êñ∞Ê®°Â???
        }
      ]
    },
    {
      id: '2',
      type: 'code-analysis',
      question: 'What will be the output of this Python code?',
      questionZh: '?ôÊÆµ Python ‰ª?¢º?ÑËº∏?∫ÊòØ‰ªÄÈ∫ºÔ?',
      difficulty: 'medium',
      points: 15,
      timeLimit: 90,
      explanation: 'The code creates a list comprehension that filters even numbers and squares them.',
      explanationZh: '?ôÊÆµ‰ª?¢º?µÂª∫‰∫Ü‰??ãÂ?Ë°®Êé®Â∞éÔ??éÊøæ?∂Êï∏‰∏¶Â??∂Âπ≥?π„Ä?,
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
          textZh: '?ØË™§',
          isCorrect: false
        }
      ]
    },
    {
      id: '3',
      type: 'prompt-writing',
      question: 'Write a prompt to generate a marketing email for a new coffee machine.',
      questionZh: 'ÂØ´‰??ãÊ?Á§∫Ë?‰æÜÁ??êÊñ∞?ñÂï°Ê©üÁ??üÈä∑?ªÂ??µ‰ª∂??,
      difficulty: 'hard',
      points: 20,
      timeLimit: 180,
      explanation: 'A good prompt should be specific, include context, and specify the desired tone and format.',
      explanationZh: 'Â•ΩÁ??êÁ§∫Ë©ûÊ?Ë©≤ÂÖ∑È´îÔ??ÖÂê´‰∏ä‰??áÔ?‰∏¶Ê?ÂÆöÊ??Ä?ÑË?Ë™øÂ??ºÂ???,
      videoTimestamp: '18:20',
      scenario: 'You are a marketing manager at a coffee equipment company. You need to create an email to promote your new premium coffee machine to existing customers.',
      scenarioZh: '?®ÊòØ‰∏ÄÂÆ∂Â??°Ë®≠?ôÂÖ¨?∏Á??üÈä∑Á∂ìÁ??ÇÊÇ®?ÄË¶ÅÂâµÂª∫‰?Â∞ÅÈõªÂ≠êÈÉµ‰ª∂Â??æÊ?ÂÆ¢Êà∂?®Âª£?∞Á??™Ë≥™?ñÂï°Ê©ü„Ä?,
      targetOutput: 'A compelling marketing email with subject line, personalized greeting, product benefits, and call-to-action.',
      evaluationCriteria: [
        'Includes specific role and context',
        'Mentions target audience (existing customers)',
        'Requests specific format (email with subject line)',
        'Specifies tone (professional, enthusiastic)',
        'Includes key elements (benefits, call-to-action)'
      ],
      evaluationCriteriaZh: [
        '?ÖÂê´?πÂ?ËßíËâ≤?å‰?‰∏ãÊ?',
        '?êÂ??ÆÊ??óÁúæÔºàÁèæ?âÂÆ¢?∂Ô?',
        'Ë´ãÊ??πÂ??ºÂ?ÔºàÂ∏∂‰∏ªÈ?Ë°åÁ??ªÂ??µ‰ª∂Ôº?,
        '?áÂ?Ë™ûË™øÔºàÂ?Ê•≠„ÄÅÁÜ±?ÖÔ?',
        '?ÖÂê´?úÈçµ?ÉÁ?ÔºàÂÑ™?¢„ÄÅË??ïÂëºÁ±≤Ô?'
      ]
    },
    {
      id: '4',
      type: 'concept-matching',
      question: 'Match the AI concepts with their definitions.',
      questionZh: 'Â∞?AI Ê¶ÇÂøµ?áÂÖ∂ÂÆöÁæ©?πÈ???,
      difficulty: 'medium',
      points: 15,
      timeLimit: 120,
      explanation: 'Understanding key AI terminology is essential for effective prompt engineering.',
      explanationZh: '?ÜËß£?úÈçµ AI Ë°ìË?Â∞çÊñº?âÊ???Prompt Engineering ?≥È??çË???,
      videoTimestamp: '25:10',
      concepts: [
        { id: 'transformer', term: 'Transformer', termZh: 'Transformer' },
        { id: 'rag', term: 'RAG', termZh: 'RAG' },
        { id: 'lora', term: 'LoRA', termZh: 'LoRA' },
        { id: 'finetuning', term: 'Fine-tuning', termZh: 'ÂæÆË™ø' }
      ],
      definitions: [
        {
          id: 'def1',
          definition: 'A neural network architecture that uses attention mechanisms',
          definitionZh: '‰ΩøÁî®Ê≥®Ê??õÊ??∂Á?Á•ûÁ?Á∂≤Áµ°?∂Ê?',
          matchesTerm: 'transformer'
        },
        {
          id: 'def2',
          definition: 'Retrieval-Augmented Generation',
          definitionZh: 'Ê™¢Á¥¢Â¢ûÂº∑?üÊ?',
          matchesTerm: 'rag'
        },
        {
          id: 'def3',
          definition: 'Low-Rank Adaptation for efficient model training',
          definitionZh: '?®ÊñºÈ´òÊ?Ê®°Â?Ë®ìÁ∑¥?Ñ‰?Áß©ÈÅ©??,
          matchesTerm: 'lora'
        },
        {
          id: 'def4',
          definition: 'Training a pre-trained model on specific data',
          definitionZh: '?®ÁâπÂÆöÊï∏?ö‰?Ë®ìÁ∑¥?êË?Á∑¥Ê®°??,
          matchesTerm: 'finetuning'
        }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // ?íË???
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

  // ?ãÂ?Ë®àÊ?
  useEffect(() => {
    if (isOpen && !startTime) {
      setStartTime(new Date());
    }
  }, [isOpen, startTime]);

  // ?ºÂ??ñÊ???
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ?ê‰∫§Á≠îÊ?
  const handleSubmitAnswer = () => {
    if (!currentAnswer) return;

    const questionStartTime = startTime || new Date();
    const timeSpent = Math.floor((new Date().getTime() - questionStartTime.getTime()) / 1000);
    
    let isCorrect = false;
    let points = 0;

    // Ë©ï‰º∞Á≠îÊ?
    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'code-analysis':
      case 'interactive-choice':
        const correctOption = currentQuestion.options.find(opt => opt.isCorrect);
        isCorrect = currentAnswer === correctOption?.id;
        points = isCorrect ? currentQuestion.points : 0;
        break;
        
      case 'prompt-writing':
        // Ê®°Êì¨ AI Ë©ï‰º∞
        const prompt = currentAnswer as string;
        const criteria = currentQuestion.evaluationCriteria;
        let score = 0;
        
        // Á∞°ÂñÆ?ÑÈ??µË?Ê™¢Êü•
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
    
    // Âª∂ÈÅ≤È°ØÁ§∫‰∏ã‰?È°åÊ?ÂÆåÊ?
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

  // ÂÆåÊ?Ê∏¨È?
  const handleFinishQuiz = () => {
    setIsFinished(true);
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxScore = questions.reduce((sum, question) => sum + question.points, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    setScore(percentage);
    setShowResult(true);
    onComplete(percentage);
  };

  // ?çÊñ∞?ãÂ?
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

  // Ê∏≤Ê??èÈ?
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
              <h4 className="font-semibold mb-2">?ÖÂ??èËø∞Ôº?/h4>
              <p className="text-sm">{currentQuestion.scenarioZh}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">?®Á? PromptÔº?/label>
              <Textarea
                value={currentAnswer as string}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="?®ÈÄôË£°ÂØ´‰??®Á? prompt..."
                className="min-h-[150px] bg-gray-700 border-gray-600"
              />
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Ë©ï‰º∞Ê®ôÊ?Ôº?/h4>
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
                <h4 className="font-semibold mb-3">Ê¶ÇÂøµÔº?/h4>
                <div className="space-y-2">
                  {currentQuestion.concepts.map((concept) => (
                    <Card key={concept.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{concept.termZh}</span>
                          <Badge variant="outline" className="text-xs">
                            {matchedPairs[concept.id] ? 'Â∑≤Âåπ?? : '?™Âåπ??}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">ÂÆöÁæ©Ôº?/h4>
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
                        // Á∞°Â??ÑÂåπ?çÈ?Ëº?
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
              {/* ?ÇÈÉ®?≤Â∫¶Ê¢?*/}
              <div className="bg-gray-700 p-4 border-b border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-6 h-6 text-blue-400" />
                    <h2 className="text-xl font-bold text-white">?∫ËÉΩÊ∏¨È?</h2>
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

              {/* ?èÈ??ßÂÆπ */}
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
                          {answers[answers.length - 1]?.isCorrect ? 'Á≠îÂ?‰∫ÜÔ?' : 'Á≠îÈåØ‰∫?}
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
                            ?çÊ∫´?∏È??ßÂÆπ ({currentQuestion.videoTimestamp})
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
                            {currentQuestion.difficulty === 'easy' ? 'Á∞°ÂñÆ' :
                             currentQuestion.difficulty === 'medium' ? '‰∏≠Á?' : '?∞Èõ£'}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {currentQuestion.points} ??
                          </span>
                        </div>
                        
                        {currentQuestion.timeLimit && (
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Âª∫Ë≠∞?ÇÈ?: {currentQuestion.timeLimit}Áß?/span>
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
                          ‰∏ä‰?È°?
                        </Button>
                        
                        <Button
                          onClick={handleSubmitAnswer}
                          disabled={!currentAnswer}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                        >
                          {currentQuestionIndex === questions.length - 1 ? 'ÂÆåÊ?Ê∏¨È?' : '‰∏ã‰?È°?}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // ÁµêÊ??ÅÈù¢
            <div className="p-8 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Trophy className="w-12 h-12 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-white">Ê∏¨È?ÂÆåÊ?Ôº?/h2>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="text-6xl font-bold text-blue-400 mb-2">
                    {score}%
                  </div>
                  <p className="text-gray-300">
                    ?®Á?Â∞ç‰? {answers.filter(a => a.isCorrect).length} / {questions.length} È°?
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">
                      {answers.reduce((sum, a) => sum + a.points, 0)}
                    </div>
                    <p className="text-sm text-gray-400">Á∏ΩÂ?</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(answers.reduce((sum, a) => sum + a.timeSpent, 0) / 60)}
                    </div>
                    <p className="text-sm text-gray-400">?®Ê?(?ÜÈ?)</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      {score >= 80 ? 'A' : score >= 60 ? 'B' : 'C'}
                    </div>
                    <p className="text-sm text-gray-400">Á≠âÁ?</p>
                  </div>
                </div>
                
                {score < 80 && (
                  <div className="bg-orange-900/20 border border-orange-600 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-orange-400" />
                      <span className="font-semibold text-orange-400">Âª∫Ë≠∞</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      ?®‰ºº‰πéÂú®?ôÂÄãÁ?ÁØÄ?áÂà∞‰∏Ä‰∫õÂõ∞??ÄÇÊ??ëÁ? AI ?©Ê?Â∑≤Á?Ê∫ñÂ?Â•Ω‰?‰ªΩÂÄã‰∫∫?ñÁ?Ë§áÁ?Á≠ÜË?Áµ¶ÊÇ®ÔºåÊÇ®?≥Áèæ?®Êü•?ãÂ?Ôº?
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
                    ?çÊñ∞Ê∏¨È?
                  </Button>
                  <Button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    ÂÆåÊ?
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