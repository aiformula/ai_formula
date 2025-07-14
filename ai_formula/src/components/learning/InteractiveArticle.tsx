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

  // 模擬加載 Markdown 內容
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 示例 Markdown 內容
      const sampleContent = `
# ${isZhTW ? lesson.titleZh : lesson.title}

${isZhTW ? lesson.descriptionZh : lesson.description}

## 核心概念

在這個課程中，我們將深入探討以下關鍵概念：

### 1. 提示工程的定義

提示工程是一門藝術，也是一門科學。它涉及到如何精確地設計和優化輸入給 AI 系統的指令，以獲得最佳的輸出結果。

[TRY-IT-PROMPT:"請幫我寫一個關於春天的詩"]

### 2. 有效提示的特徵

一個有效的提示通常具備以下特徵：
- **清晰性**: 指令明確，不含歧義
- **具體性**: 提供足夠的細節和背景信息
- **結構化**: 使用適當的格式和組織

[CONCEPT-CHECK:"什麼是有效提示的三個主要特徵？"]

### 3. 實例演示

讓我們看一個具體的例子：

\`\`\`
// 不良提示
"寫一個函數"

// 良好提示
"請用 Python 寫一個函數，接受一個整數列表作為輸入，返回列表中所有偶數的和。包含適當的註釋和錯誤處理。"
\`\`\`

[TRY-IT-PROMPT:"請根據上面的良好提示範例，寫一個 Python 函數"]

## 進階技巧

### Chain-of-Thought 提示

這是一種引導 AI 進行分步推理的技巧：

[TRY-IT-PROMPT:"讓我們一步一步思考：如何優化網站的加載速度？1. 分析當前問題 2. 識別瓶頸 3. 提出解決方案"]

### 角色扮演提示

通過設定特定角色來獲得更專業的回答：

[TRY-IT-PROMPT:"你是一位經驗豐富的 UX 設計師，請分析這個移動應用的用戶界面設計"]

## 總結

掌握提示工程需要：
1. 理解 AI 系統的工作原理
2. 練習不同類型的提示技巧
3. 持續優化和改進

[CONCEPT-CHECK:"列舉至少三種不同的提示技巧"]
      `;
      
      setMarkdownContent(sampleContent);
      setIsLoading(false);
    };

    loadContent();
  }, [lesson, isZhTW]);

  // 處理迷你 Playground 執行
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

    const mockResponse = `AI 回應: ${prompt}

這是一個模擬的 AI 回應，展示了如何處理您的提示。在實際應用中，這裡會顯示真實的 AI 生成內容。`;

    setMiniPlaygrounds(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        response: mockResponse,
        isLoading: false,
        hasExecuted: true
      }
    }));

    // 標記為已完成
    setCompletedElements(prev => new Set([...prev, elementId]));
  };

  // 處理概念檢查
  const handleConceptCheck = (elementId: string, answer: string, expectedAnswer: string) => {
    const isCorrect = answer.toLowerCase().includes(expectedAnswer.toLowerCase()) || 
                     answer.length > 20; // 簡單的正確性檢查

    const feedback = isCorrect ? 
      (isZhTW ? '回答正確！很好地理解了概念。' : 'Correct! Good understanding of the concept.') :
      (isZhTW ? '請再仔細思考一下，或者查看上面的內容。' : 'Please think more carefully or review the content above.');

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

  // 發送到主 Playground
  const sendToMainPlayground = (prompt: string) => {
    onSendToMainPlayground(prompt);
  };

  // 複製到剪貼板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 渲染迷你 Playground
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
            {isZhTW ? '迷你實驗室' : 'Mini Playground'}
          </span>
          <Badge variant="outline" className="text-green-300 border-green-500/30 bg-green-500/10">
            {isZhTW ? '互動' : 'Interactive'}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              {isZhTW ? '提示內容：' : 'Prompt:'}
            </label>
            <Textarea
              value={state.prompt}
              onChange={(e) => setMiniPlaygrounds(prev => ({
                ...prev,
                [elementId]: { ...prev[elementId], prompt: e.target.value }
              }))}
              placeholder={isZhTW ? '輸入你的提示...' : 'Enter your prompt...'}
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
              {isZhTW ? '執行' : 'Execute'}
            </Button>
            
            <Button
              onClick={() => sendToMainPlayground(state.prompt)}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isZhTW ? '發送到主實驗室' : 'Send to Main Playground'}
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
                  {isZhTW ? '回應：' : 'Response:'}
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

  // 渲染概念檢查
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
            {isZhTW ? '思考' : 'Think'}
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
              placeholder={isZhTW ? '輸入你的答案...' : 'Enter your answer...'}
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
            {isZhTW ? '檢查答案' : 'Check Answer'}
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
                    (isZhTW ? '正確！' : 'Correct!') : 
                    (isZhTW ? '再試一次' : 'Try Again')
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

  // 處理 Markdown 中的特殊語法
  const processMarkdown = (content: string) => {
    const lines = content.split('\n');
    const processedLines: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      // 處理 TRY-IT-PROMPT 語法
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
      
      // 處理 CONCEPT-CHECK 語法
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
      
      // 處理普通 Markdown 語法（簡化版）
      let processedLine = line;
      
      // 標題
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
      
      // 代碼塊
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
      
      // 列表項
      if (line.startsWith('- ')) {
        processedLines.push(
          <li key={index} className="text-slate-300 mb-1 ml-4">
            {line.slice(2)}
          </li>
        );
        return;
      }
      
      // 普通段落
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

  // 計算完成進度
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
          <span>{isZhTW ? '加載中...' : 'Loading...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 text-slate-100 min-h-screen">
      {/* 文章頭部 */}
      <div className="mb-8 pb-6 border-b border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <Badge variant="outline" className="text-green-300 border-green-500/30 bg-green-500/10">
            {isZhTW ? '互動文章' : 'Interactive Article'}
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
              {isZhTW ? '進度' : 'Progress'}: {calculateProgress()}%
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

      {/* 文章內容 */}
      <div className="prose prose-invert max-w-none">
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4">
            {processMarkdown(markdownContent)}
          </div>
        </ScrollArea>
      </div>

      {/* 底部操作 */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-300">
              {isZhTW ? '完成度' : 'Completion'}: {calculateProgress()}%
            </span>
          </div>
          <Button
            onClick={() => onProgressUpdate(true)}
            disabled={calculateProgress() < 100}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            {isZhTW ? '完成課程' : 'Complete Lesson'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveArticle; 