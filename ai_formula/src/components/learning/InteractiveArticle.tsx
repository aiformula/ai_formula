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

  // Ê®°Êì¨?†Ë? Markdown ?ßÂÆπ
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      // Ê®°Êì¨ API Ë™øÁî®
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Á§∫‰? Markdown ?ßÂÆπ
      const sampleContent = `
# ${isZhTW ? lesson.titleZh : lesson.title}

${isZhTW ? lesson.descriptionZh : lesson.description}

## ?∏Â?Ê¶ÇÂøµ

?®ÈÄôÂÄãË™≤Á®ã‰∏≠ÔºåÊ??ëÂ?Ê∑±ÂÖ•?¢Ë?‰ª•‰??úÈçµÊ¶ÇÂøµÔº?

### 1. ?êÁ§∫Â∑•Á??ÑÂ?Áæ?

?êÁ§∫Â∑•Á??Ø‰??Ä?ùË?Ôºå‰??Ø‰??ÄÁßëÂ≠∏?ÇÂ?Ê∂âÂ??∞Â?‰ΩïÁ≤æÁ¢∫Âú∞Ë®≠Ë??åÂÑ™?ñËº∏?•Áµ¶ AI Á≥ªÁµ±?ÑÊ?‰ª§Ô?‰ª•Áç≤ÂæóÊ?‰Ω≥Á?Ëº∏Âá∫ÁµêÊ???

[TRY-IT-PROMPT:"Ë´ãÂπ´?ëÂØ´‰∏Ä?ãÈ??ºÊò•Â§©Á?Ë©?]

### 2. ?âÊ??êÁ§∫?ÑÁâπÂæ?

‰∏Ä?ãÊ??àÁ??êÁ§∫?öÂ∏∏?∑Â?‰ª•‰??πÂæµÔº?
- **Ê∏ÖÊô∞??*: ?á‰ª§?éÁ¢∫Ôºå‰??´Ê≠ßÁæ?
- **?∑È???*: ?ê‰?Ë∂≥Â??ÑÁ¥∞ÁØÄ?åË??Ø‰ø°??
- **ÁµêÊ???*: ‰ΩøÁî®?©Áï∂?ÑÊ†ºÂºèÂ?ÁµÑÁ?

[CONCEPT-CHECK:"‰ªÄÈ∫ºÊòØ?âÊ??êÁ§∫?Ñ‰??ã‰∏ªË¶ÅÁâπÂæµÔ?"]

### 3. ÂØ¶‰?ÊºîÁ§∫

ËÆìÊ??ëÁ?‰∏Ä?ãÂÖ∑È´îÁ?‰æãÂ?Ôº?

\`\`\`
// ‰∏çËâØ?êÁ§∫
"ÂØ´‰??ãÂáΩ??

// ?ØÂ•Ω?êÁ§∫
"Ë´ãÁî® Python ÂØ´‰??ãÂáΩ?∏Ô??•Â?‰∏Ä?ãÊï¥?∏Â?Ë°®‰??∫Ëº∏?•Ô?ËøîÂ??óË°®‰∏≠Ê??âÂÅ∂?∏Á??å„ÄÇÂ??´ÈÅ©?∂Á?Ë®ªÈ??åÈåØË™§Ë??Ü„Ä?
\`\`\`

[TRY-IT-PROMPT:"Ë´ãÊ†π?ö‰??¢Á??ØÂ•Ω?êÁ§∫ÁØÑ‰?ÔºåÂØ´‰∏Ä??Python ?ΩÊï∏"]

## ?≤È??ÄÂ∑?

### Chain-of-Thought ?êÁ§∫

?ôÊòØ‰∏ÄÁ®ÆÂ?Â∞?AI ?≤Ë??ÜÊ≠•?®Á??ÑÊ?Â∑ßÔ?

[TRY-IT-PROMPT:"ËÆìÊ??ë‰?Ê≠•‰?Ê≠•ÊÄùËÄÉÔ?Â¶Ç‰??™Â?Á∂≤Á??ÑÂ?ËºâÈÄüÂ∫¶Ôº?. ?ÜÊ??∂Â??èÈ? 2. Ë≠òÂà•?∂È†∏ 3. ?êÂá∫Ëß?±∫?πÊ?"]

### ËßíËâ≤?ÆÊ??êÁ§∫

?öÈ?Ë®≠Â??πÂ?ËßíËâ≤‰æÜÁç≤ÂæóÊõ¥Â∞àÊ•≠?ÑÂ?Á≠îÔ?

[TRY-IT-PROMPT:"‰Ω†ÊòØ‰∏Ä‰ΩçÁ?È©óË?ÂØåÁ? UX Ë®≠Ë?Â∏´Ô?Ë´ãÂ??êÈÄôÂÄãÁßª?ïÊ??®Á??®Êà∂?åÈù¢Ë®≠Ë?"]

## Á∏ΩÁ?

?åÊè°?êÁ§∫Â∑•Á??ÄË¶ÅÔ?
1. ?ÜËß£ AI Á≥ªÁµ±?ÑÂ∑•‰ΩúÂ???
2. Á∑¥Á?‰∏çÂ?È°ûÂ??ÑÊ?Á§∫Ê?Â∑?
3. ?ÅÁ??™Â??åÊîπ??

[CONCEPT-CHECK:"?óË??≥Â?‰∏âÁ®Æ‰∏çÂ??ÑÊ?Á§∫Ê?Â∑?]
      `;
      
      setMarkdownContent(sampleContent);
      setIsLoading(false);
    };

    loadContent();
  }, [lesson, isZhTW]);

  // ?ïÁ?Ëø∑‰? Playground ?∑Ë?
  const handleMiniPlaygroundExecution = async (elementId: string, prompt: string) => {
    setMiniPlaygrounds(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        isLoading: true,
        hasExecuted: false
      }
    }));

    // Ê®°Êì¨ API Ë™øÁî®
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockResponse = `AI ?ûÊ?: ${prompt}

?ôÊòØ‰∏Ä?ãÊ®°?¨Á? AI ?ûÊ?ÔºåÂ?Á§∫‰?Â¶Ç‰??ïÁ??®Á??êÁ§∫?ÇÂú®ÂØ¶È??âÁî®‰∏≠Ô??ôË£°?ÉÈ°ØÁ§∫Á?ÂØ¶Á? AI ?üÊ??ßÂÆπ?Ç`;

    setMiniPlaygrounds(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        response: mockResponse,
        isLoading: false,
        hasExecuted: true
      }
    }));

    // Ê®ôË??∫Â∑≤ÂÆåÊ?
    setCompletedElements(prev => new Set([...prev, elementId]));
  };

  // ?ïÁ?Ê¶ÇÂøµÊ™¢Êü•
  const handleConceptCheck = (elementId: string, answer: string, expectedAnswer: string) => {
    const isCorrect = answer.toLowerCase().includes(expectedAnswer.toLowerCase()) || 
                     answer.length > 20; // Á∞°ÂñÆ?ÑÊ≠£Á¢∫ÊÄßÊ™¢??

    const feedback = isCorrect ? 
      (isZhTW ? '?ûÁ?Ê≠?¢∫ÔºÅÂ?Â•ΩÂú∞?ÜËß£‰∫ÜÊ?Âøµ„Ä? : 'Correct! Good understanding of the concept.') :
      (isZhTW ? 'Ë´ãÂ?‰ªîÁ¥∞?ùËÄÉ‰?‰∏ãÔ??ñËÄÖÊü•?ã‰??¢Á??ßÂÆπ?? : 'Please think more carefully or review the content above.');

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

  // ?ºÈÄÅÂà∞‰∏?Playground
  const sendToMainPlayground = (prompt: string) => {
    onSendToMainPlayground(prompt);
  };

  // Ë§áË£Ω?∞Ââ™Ë≤ºÊùø
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Ê∏≤Ê?Ëø∑‰? Playground
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
            {isZhTW ? 'Ëø∑‰?ÂØ¶È?ÂÆ? : 'Mini Playground'}
          </span>
          <Badge variant="outline" className="text-green-300 border-green-500/30 bg-green-500/10">
            {isZhTW ? '‰∫íÂ?' : 'Interactive'}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              {isZhTW ? '?êÁ§∫?ßÂÆπÔº? : 'Prompt:'}
            </label>
            <Textarea
              value={state.prompt}
              onChange={(e) => setMiniPlaygrounds(prev => ({
                ...prev,
                [elementId]: { ...prev[elementId], prompt: e.target.value }
              }))}
              placeholder={isZhTW ? 'Ëº∏ÂÖ•‰Ω†Á??êÁ§∫...' : 'Enter your prompt...'}
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
              {isZhTW ? '?∑Ë?' : 'Execute'}
            </Button>
            
            <Button
              onClick={() => sendToMainPlayground(state.prompt)}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isZhTW ? '?ºÈÄÅÂà∞‰∏ªÂØ¶È©óÂÆ§' : 'Send to Main Playground'}
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
                  {isZhTW ? '?ûÊ?Ôº? : 'Response:'}
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

  // Ê∏≤Ê?Ê¶ÇÂøµÊ™¢Êü•
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
            {isZhTW ? 'Ê¶ÇÂøµÊ™¢Êü•' : 'Concept Check'}
          </span>
          <Badge variant="outline" className="text-purple-300 border-purple-500/30 bg-purple-500/10">
            {isZhTW ? '?ùËÄ? : 'Think'}
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
              placeholder={isZhTW ? 'Ëº∏ÂÖ•‰Ω†Á?Á≠îÊ?...' : 'Enter your answer...'}
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
            {isZhTW ? 'Ê™¢Êü•Á≠îÊ?' : 'Check Answer'}
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
                    (isZhTW ? 'Ê≠?¢∫Ôº? : 'Correct!') : 
                    (isZhTW ? '?çË©¶‰∏ÄÊ¨? : 'Try Again')
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

  // ?ïÁ? Markdown ‰∏≠Á??πÊ?Ë™ûÊ?
  const processMarkdown = (content: string) => {
    const lines = content.split('\n');
    const processedLines: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      // ?ïÁ? TRY-IT-PROMPT Ë™ûÊ?
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
      
      // ?ïÁ? CONCEPT-CHECK Ë™ûÊ?
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
      
      // ?ïÁ??ÆÈÄ?Markdown Ë™ûÊ?ÔºàÁ∞°?ñÁ?Ôº?
      let processedLine = line;
      
      // Ê®ôÈ?
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
      
      // ‰ª?¢ºÂ°?
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
      
      // ?óË°®??
      if (line.startsWith('- ')) {
        processedLines.push(
          <li key={index} className="text-slate-300 mb-1 ml-4">
            {line.slice(2)}
          </li>
        );
        return;
      }
      
      // ?ÆÈÄöÊÆµ??
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

  // Ë®àÁ?ÂÆåÊ??≤Â∫¶
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
          <span>{isZhTW ? '?†Ë?‰∏?..' : 'Loading...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 text-slate-100 min-h-screen">
      {/* ?áÁ??≠ÈÉ® */}
      <div className="mb-8 pb-6 border-b border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <Badge variant="outline" className="text-green-300 border-green-500/30 bg-green-500/10">
            {isZhTW ? '‰∫íÂ??áÁ?' : 'Interactive Article'}
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
              {isZhTW ? '?≤Â∫¶' : 'Progress'}: {calculateProgress()}%
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

      {/* ?áÁ??ßÂÆπ */}
      <div className="prose prose-invert max-w-none">
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4">
            {processMarkdown(markdownContent)}
          </div>
        </ScrollArea>
      </div>

      {/* Â∫ïÈÉ®?ç‰? */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-300">
              {isZhTW ? 'ÂÆåÊ?Â∫? : 'Completion'}: {calculateProgress()}%
            </span>
          </div>
          <Button
            onClick={() => onProgressUpdate(true)}
            disabled={calculateProgress() < 100}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            {isZhTW ? 'ÂÆåÊ?Ë™≤Á?' : 'Complete Lesson'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveArticle; 