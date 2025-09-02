import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Copy, 
  ExternalLink, 
  Lightbulb, 
  Code, 
  Play, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Info,
  Target,
  Zap,
  ArrowRight,
  RefreshCw,
  BookMarked,
  PenTool,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { CourseLesson, InteractiveElement } from '@/data/courseData/promptEngineeringComplete';

interface InteractiveArticleProps {
  lesson: CourseLesson;
  onSendToMainPlayground: (prompt: string) => void;
  onProgressUpdate: (completed: boolean) => void;
}

interface MiniPlaygroundState {
  prompt: string;
  response: string;
  isLoading: boolean;
  hasExecuted: boolean;
}

interface ConceptCheckState {
  userAnswer: string;
  isCorrect: boolean | null;
  hasAnswered: boolean;
  feedback: string;
}

const InteractiveArticle: React.FC<InteractiveArticleProps> = ({ 
  lesson, 
  onSendToMainPlayground, 
  onProgressUpdate 
}) => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [miniPlaygrounds, setMiniPlaygrounds] = useState<{ [key: string]: MiniPlaygroundState }>({});
  const [conceptChecks, setConceptChecks] = useState<{ [key: string]: ConceptCheckState }>({});
  const [completedElements, setCompletedElements] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // 模擬?��? Markdown ?�容
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 示�? Markdown ?�容
      const sampleContent = `
# ${isZhTW ? lesson.titleZh : lesson.title}

${isZhTW ? lesson.descriptionZh : lesson.description}

## ?��?概念

?�這個課程中，�??��?深入?��?以�??�鍵概念�?

### 1. ?�示工�??��?�?

?�示工�??��??�?��?，�??��??�科學?��?涉�??��?何精確地設�??�優?�輸?�給 AI 系統?��?令�?以獲得�?佳�?輸出結�???

[TRY-IT-PROMPT:"請幫?�寫一?��??�春天�?�?]

### 2. ?��??�示?�特�?

一?��??��??�示?�常?��?以�??�徵�?
- **清晰??*: ?�令?�確，�??�歧�?
- **?��???*: ?��?足�??�細節?��??�信??
- **結�???*: 使用?�當?�格式�?組�?

[CONCEPT-CHECK:"什麼是?��??�示?��??�主要特徵�?"]

### 3. 實�?演示

讓�??��?一?�具體�?例�?�?

\`\`\`
// 不良?�示
"寫�??�函??

// ?�好?�示
"請用 Python 寫�??�函?��??��?一?�整?��?表�??�輸?��?返�??�表中�??�偶?��??�。�??�適?��?註�??�錯誤�??��?
\`\`\`

[TRY-IT-PROMPT:"請根?��??��??�好?�示範�?，寫一??Python ?�數"]

## ?��??��?

### Chain-of-Thought ?�示

?�是一種�?�?AI ?��??�步?��??��?巧�?

[TRY-IT-PROMPT:"讓�??��?步�?步思考�?如�??��?網�??��?載速度�?. ?��??��??��? 2. 識別?�頸 3. ?�出�?��?��?"]

### 角色?��??�示

?��?設�??��?角色來獲得更專業?��?答�?

[TRY-IT-PROMPT:"你是一位�?驗�?富�? UX 設�?師�?請�??�這個移?��??��??�戶?�面設�?"]

## 總�?

?�握?�示工�??�要�?
1. ?�解 AI 系統?�工作�???
2. 練�?不�?類�??��?示�?�?
3. ?��??��??�改??

[CONCEPT-CHECK:"?��??��?三種不�??��?示�?�?]
      `;
      
      setMarkdownContent(sampleContent);
      setIsLoading(false);
    };

    loadContent();
  }, [lesson, isZhTW]);

  // ?��?迷�? Playground ?��?
  const handleMiniPlaygroundExecution = async (elementId: string, prompt: string) => {
    setMiniPlaygrounds(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        isLoading: true,
        hasExecuted: false
      }
    }));

    // 模擬 API 調用
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockResponse = `AI ?��?: ${prompt}

?�是一?�模?��? AI ?��?，�?示�?如�??��??��??�示?�在實�??�用中�??�裡?�顯示�?實�? AI ?��??�容?�`;

    setMiniPlaygrounds(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        response: mockResponse,
        isLoading: false,
        hasExecuted: true
      }
    }));

    // 標�??�已完�?
    setCompletedElements(prev => new Set([...prev, elementId]));
  };

  // ?��?概念檢查
  const handleConceptCheck = (elementId: string, answer: string, expectedAnswer: string) => {
    const isCorrect = answer.toLowerCase().includes(expectedAnswer.toLowerCase()) || 
                     answer.length > 20; // 簡單?�正確性檢??

    const feedback = isCorrect ? 
      (isZhTW ? '?��?�?��！�?好地?�解了�?念�? : 'Correct! Good understanding of the concept.') :
      (isZhTW ? '請�?仔細?�考�?下�??�者查?��??��??�容?? : 'Please think more carefully or review the content above.');

    setConceptChecks(prev => ({
      ...prev,
      [elementId]: {
        userAnswer: answer,
        isCorrect,
        hasAnswered: true,
        feedback
      }
    }));

    if (isCorrect) {
      setCompletedElements(prev => new Set([...prev, elementId]));
    }
  };

  // ?�送到�?Playground
  const sendToMainPlayground = (prompt: string) => {
    onSendToMainPlayground(prompt);
  };

  // 複製?�剪貼板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 渲�?迷�? Playground
  const renderMiniPlayground = (elementId: string, prompt: string) => {
    const state = miniPlaygrounds[elementId] || {
      prompt,
      response: '',
      isLoading: false,
      hasExecuted: false
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-6 p-4 bg-slate-800 rounded-lg border border-slate-700"
      >
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold text-slate-200">
            {isZhTW ? '迷�?實�?�? : 'Mini Playground'}
          </span>
          <Badge variant="outline" className="text-green-300 border-green-500/30 bg-green-500/10">
            {isZhTW ? '互�?' : 'Interactive'}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              {isZhTW ? '?�示?�容�? : 'Prompt:'}
            </label>
            <Textarea
              value={state.prompt}
              onChange={(e) => setMiniPlaygrounds(prev => ({
                ...prev,
                [elementId]: { ...prev[elementId], prompt: e.target.value }
              }))}
              placeholder={isZhTW ? '輸入你�??�示...' : 'Enter your prompt...'}
              className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 min-h-[80px]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleMiniPlaygroundExecution(elementId, state.prompt)}
              disabled={state.isLoading || !state.prompt.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {state.isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isZhTW ? '?��?' : 'Execute'}
            </Button>
            
            <Button
              onClick={() => sendToMainPlayground(state.prompt)}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isZhTW ? '?�送到主實驗室' : 'Send to Main Playground'}
            </Button>
          </div>
          
          {state.hasExecuted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-3 bg-slate-700 rounded-lg border border-slate-600"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300 font-medium">
                  {isZhTW ? '?��?�? : 'Response:'}
                </span>
                <Button
                  onClick={() => copyToClipboard(state.response)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-200"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-sm text-slate-200 whitespace-pre-wrap">
                {state.response}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // 渲�?概念檢查
  const renderConceptCheck = (elementId: string, question: string, expectedAnswer: string) => {
    const state = conceptChecks[elementId] || {
      userAnswer: '',
      isCorrect: null,
      hasAnswered: false,
      feedback: ''
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-6 p-4 bg-slate-800 rounded-lg border border-slate-700"
      >
        <div className="flex items-center space-x-2 mb-3">
          <Target className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">
            {isZhTW ? '概念檢查' : 'Concept Check'}
          </span>
          <Badge variant="outline" className="text-purple-300 border-purple-500/30 bg-purple-500/10">
            {isZhTW ? '?��? : 'Think'}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-slate-300 mb-3">{question}</p>
            <Textarea
              value={state.userAnswer}
              onChange={(e) => setConceptChecks(prev => ({
                ...prev,
                [elementId]: { ...prev[elementId], userAnswer: e.target.value }
              }))}
              placeholder={isZhTW ? '輸入你�?答�?...' : 'Enter your answer...'}
              className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 min-h-[80px]"
            />
          </div>
          
          <Button
            onClick={() => handleConceptCheck(elementId, state.userAnswer, expectedAnswer)}
            disabled={!state.userAnswer.trim()}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isZhTW ? '檢查答�?' : 'Check Answer'}
          </Button>
          
          {state.hasAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mt-4 p-3 rounded-lg border ${
                state.isCorrect 
                  ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {state.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-medium">
                  {state.isCorrect ? 
                    (isZhTW ? '�?���? : 'Correct!') : 
                    (isZhTW ? '?�試一�? : 'Try Again')
                  }
                </span>
              </div>
              <p className="text-sm">{state.feedback}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // ?��? Markdown 中�??��?語�?
  const processMarkdown = (content: string) => {
    const lines = content.split('\n');
    const processedLines: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      // ?��? TRY-IT-PROMPT 語�?
      const promptMatch = line.match(/\[TRY-IT-PROMPT:"(.+?)"\]/);
      if (promptMatch) {
        const prompt = promptMatch[1];
        const elementId = `prompt-${index}`;
        processedLines.push(
          <div key={elementId}>
            {renderMiniPlayground(elementId, prompt)}
          </div>
        );
        return;
      }
      
      // ?��? CONCEPT-CHECK 語�?
      const checkMatch = line.match(/\[CONCEPT-CHECK:"(.+?)"\]/);
      if (checkMatch) {
        const question = checkMatch[1];
        const elementId = `check-${index}`;
        processedLines.push(
          <div key={elementId}>
            {renderConceptCheck(elementId, question, 'expected')}
          </div>
        );
        return;
      }
      
      // ?��??��?Markdown 語�?（簡?��?�?
      let processedLine = line;
      
      // 標�?
      if (line.startsWith('# ')) {
        processedLines.push(
          <h1 key={index} className="text-2xl font-bold text-white mb-4 mt-6">
            {line.slice(2)}
          </h1>
        );
        return;
      }
      
      if (line.startsWith('## ')) {
        processedLines.push(
          <h2 key={index} className="text-xl font-semibold text-white mb-3 mt-5">
            {line.slice(3)}
          </h2>
        );
        return;
      }
      
      if (line.startsWith('### ')) {
        processedLines.push(
          <h3 key={index} className="text-lg font-semibold text-slate-200 mb-2 mt-4">
            {line.slice(4)}
          </h3>
        );
        return;
      }
      
      // �?���?
      if (line.startsWith('```')) {
        processedLines.push(
          <div key={index} className="bg-slate-800 p-4 rounded-lg my-4 border border-slate-700">
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{line.slice(3)}</code>
            </pre>
          </div>
        );
        return;
      }
      
      // ?�表??
      if (line.startsWith('- ')) {
        processedLines.push(
          <li key={index} className="text-slate-300 mb-1 ml-4">
            {line.slice(2)}
          </li>
        );
        return;
      }
      
      // ?�通段??
      if (line.trim()) {
        processedLines.push(
          <p key={index} className="text-slate-300 mb-3 leading-relaxed">
            {line}
          </p>
        );
      } else {
        processedLines.push(<br key={index} />);
      }
    });
    
    return processedLines;
  };

  // 計�?完�??�度
  const calculateProgress = () => {
    const totalElements = (lesson.interactiveElements || []).length;
    const completedCount = completedElements.size;
    return totalElements > 0 ? Math.round((completedCount / totalElements) * 100) : 100;
  };

  useEffect(() => {
    const progress = calculateProgress();
    onProgressUpdate(progress === 100);
  }, [completedElements, onProgressUpdate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>{isZhTW ? '?��?�?..' : 'Loading...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-slate-100 min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* 頂部 */}
      <div className="mb-8 pb-6 border-b border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <Badge variant="outline" className="text-green-300 border-green-500/30 bg-green-500/10">
            {isZhTW ? '互�??��?' : 'Interactive Article'}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">
          {isZhTW ? lesson.titleZh : lesson.title}
        </h1>
        <p className="text-slate-400 text-lg mb-4">
          {isZhTW ? lesson.descriptionZh : lesson.description}
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-300">
              {isZhTW ? '?�度' : 'Progress'}: {calculateProgress()}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <BookMarked className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">
              {isZhTW ? lesson.durationZh : lesson.duration}
            </span>
          </div>
        </div>
      </div>

      {/* 內容 */}
      <div className="prose prose-invert max-w-none">
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4">
            {processMarkdown(markdownContent)}
          </div>
        </ScrollArea>
      </div>

      {/* 底部 */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-300">
              {isZhTW ? '完�?�? : 'Completion'}: {calculateProgress()}%
            </span>
          </div>
          <Button
            onClick={() => onProgressUpdate(true)}
            disabled={calculateProgress() < 100}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            {isZhTW ? '完�?課�?' : 'Complete Lesson'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveArticle; 
