import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Send, 
  Bot, 
  User, 
  X, 
  Lightbulb, 
  Code, 
  BookOpen, 
  MessageCircle,
  Sparkles,
  Clock,
  CheckCircle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Zap,
  Target,
  Brain,
  FileText,
  Play,
  Star,
  Loader2
} from 'lucide-react';

interface AITutorChatProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  moduleId: string;
  currentTimestamp: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  messageType: 'text' | 'code' | 'suggestion' | 'explanation' | 'quiz';
  codeLanguage?: string;
  relatedTimestamp?: string;
  suggestions?: string[];
  rating?: 'positive' | 'negative' | null;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'explain' | 'debug' | 'practice' | 'review';
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  isOpen,
  onClose,
  courseId,
  moduleId,
  currentTimestamp
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ?��??�歡迎�???
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        content: `?? ?�好！�??�您?��?�?AI ?��??��?已�?學�?了這個課程�??�?�內容�??�括講義?�逐�?稿�?常�??��???

?�可以幫?��?
??�??複�??��?�?
???�錯?��?�?��
???��?學�?建議
???��?課�??��??��?
???�您總�??��?

請�?訴�??��?要�?麼幫?��?`,
        timestamp: new Date(),
        messageType: 'text',
        suggestions: [
          '解釋這個章節的內容',
          '檢查我的答案',
          '給我一些練習建議',
          '總結到目前為止的學習內容'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // 快速�?作�???
  const quickActions: QuickAction[] = [
    {
      id: 'explain-current',
      label: '解釋內容',
      icon: <Lightbulb className="w-4 h-4" />,
      action: () => handleQuickAction('請解釋當前章節的重點'),
      category: 'explain'
    },
    {
      id: 'debug-code',
      label: '除錯協助',
      icon: <Code className="w-4 h-4" />,
      action: () => handleQuickAction('幫我檢查代碼中的問題'),
      category: 'debug'
    },
    {
      id: 'practice-suggestions',
      label: '練習建議',
      icon: <Target className="w-4 h-4" />,
      action: () => handleQuickAction('給我一些練習建議'),
      category: 'practice'
    },
    {
      id: 'review-summary',
      label: '總�??��?',
      icon: <BookOpen className="w-4 h-4" />,
      action: () => handleQuickAction('總�??�目?�為止�??��?'),
      category: 'review'
    }
  ];

  // ?�送�???
  const handleSendMessage = async (message: string = inputValue) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      messageType: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模擬 AI ?��?
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // 快速�?�?
  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  // ?��? AI ?��?
  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    // �?��?��??��?
    if (lowerMessage.includes('�?��') || lowerMessage.includes('code') || lowerMessage.includes('?�錯') || lowerMessage.includes('bug')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `?��?幫您檢查�?��！�??�您?�代碼貼上�?，�??��?

1. ?? 檢查語�??�誤
2. ?�� ?��??�輯?��?
3. ?�� ?��??�進建�?
4. ?? �???��?概念

?��??�以?�接�?AI Playground 複製�?��?��?！`,
        timestamp: new Date(),
        messageType: 'code',
        codeLanguage: 'python',
        suggestions: [
          '檢查 Python �?��',
          '�???�段�?��?��?�?,
          '?��?�?��?�能',
          '修復?�誤'
        ]
      };
    }

    // �??概念
    if (lowerMessage.includes('�??') || lowerMessage.includes('什麼是') || lowerMessage.includes('概念')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `讓�??�您�???��?概念�?

**Prompt Engineering ?��??��?�?*

1. **?�確??* - 清晰?�述?��??��?
2. **上�???* - ?��?足�??��??�信??
3. **?��???* - ?��?輸出?��?
4. **範�?** - ?��??��?例�?

**實用?�巧�?**
- 使用角色設�? ("你是一??..")
- ?��?步�? ("請�??�以下步�?..")
- 設�??�制 ("??00字內...")

?��?�?��多細節?��??�可以深?�解?�任何�?念�?`,
        timestamp: new Date(),
        messageType: 'explanation',
        relatedTimestamp: '08:15',
        suggestions: [
          '什麼是 Temperature ?�數�?,
          '如�?寫好??System Prompt�?,
          '?�樣?��?少樣?��?差別',
          '?��??�維?�示?��?
        ]
      };
    }

    // 練�?建議
    if (lowerMessage.includes('練�?') || lowerMessage.includes('建議') || lowerMessage.includes('如�??��?')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `?��??��?學�??�度，�?建議以�?練�?�?

**?�� 立即?��??�練習�?**
1. ?�試寫�??�產?��?述�? prompt
2. 練�?調整 Temperature ?�數
3. 比�?不�?模�??��???

**?�� ?��??�戰�?*
- 設�?一?��?步�??�推?�任??
- ?�建?�己??prompt 模板
- 實現?��??�維?�示

**?? 評估?��?�?*
- ?��??�輸?��?�?
- 測試不�??��?
- ?��??�戶?��?

?�想?��??�個練習�?始�?`,
        timestamp: new Date(),
        messageType: 'suggestion',
        suggestions: [
          '?��?第�??�練�?,
          '?��??��?範�?',
          '測試?��? prompt',
          '?��??�人?�建�?
        ]
      };
    }

    // 總�?
    if (lowerMessage.includes('總�?') || lowerMessage.includes('?��?') || lowerMessage.includes('複�?')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `?? **學�??��?總�?**

**已�??�內容�?**
??Prompt Engineering ?��?概念
???�數調整?��?
??實�?案�??��?

**?��?要�?�?*
?�� **?�確?��?�?* - 越具體�?�?
?�� **?�當?��?下�?** - ?��?必�??�景
?�� **?��??�輸??* - ?��??��??��?
?�� **迭代?��?** - 不斷?��?prompt

**下�?步建議�?**
??完�??��?節測�?
???�試?��??��? prompt 設�?
??學�?高�??��?

?��??�個部?��??��??��?`,
        timestamp: new Date(),
        messageType: 'explanation',
        relatedTimestamp: currentTimestamp,
        suggestions: [
          '測試?��??�解',
          '?��?實�?例�?',
          '?�入下�?章�?',
          '複�??��?概念'
        ]
      };
    }

    // ?�設?��?
    return {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: `?��?�?��?��?題�?讓�??�您?��?幫助??

?��??��??��?，�?建議�?

1. **檢查?��?學�??�度** - 確�??�解?��?概念
2. **?�考相?��???* - ?�可以�??�具體�?課�??�容
3. **實�?練�?** - ?��??�試?��?好�?學�??��?

?�能?�具體地?�述?��??��??��??��??�樣?�可以�?供更精確?�幫?��?`,
      timestamp: new Date(),
      messageType: 'text',
      suggestions: [
        '?�在?�個步驟卡住�?',
        '?�個�?念�?太�?�?,
        '?�要更多練�?,
        '?��?實�?例�?'
      ]
    };
  };

  // 訊息評�?
  const handleRateMessage = (messageId: string, rating: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, rating }
          : msg
      )
    );
  };

  // 複製?�容
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // 渲�?訊息
  const renderMessage = (message: ChatMessage) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        {message.type === 'ai' && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        )}
        
        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
          <div className={`rounded-lg p-4 ${
            message.type === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-white'
          }`}>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
            
            {message.relatedTimestamp && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs text-blue-400 hover:text-blue-300"
              >
                <Play className="w-3 h-3 mr-1" />
                跳�???{message.relatedTimestamp}
              </Button>
            )}
          </div>
          
          {message.suggestions && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs text-gray-400 border-gray-600 hover:bg-gray-600 hover:text-white"
                  onClick={() => handleSendMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          
          {message.type === 'ai' && (
            <div className="flex items-center gap-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400 hover:text-gray-300"
                onClick={() => handleCopyMessage(message.content)}
              >
                <Copy className="w-3 h-3 mr-1" />
                複製
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs ${
                  message.rating === 'positive' ? 'text-green-400' : 'text-gray-400'
                } hover:text-green-400`}
                onClick={() => handleRateMessage(message.id, 'positive')}
              >
                <ThumbsUp className="w-3 h-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs ${
                  message.rating === 'negative' ? 'text-red-400' : 'text-gray-400'
                } hover:text-red-400`}
                onClick={() => handleRateMessage(message.id, 'negative')}
              >
                <ThumbsDown className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
        
        {message.type === 'user' && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </motion.div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col"
        >
          {/* ?�部標�???*/}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">AI ?��?</h2>
                <p className="text-sm text-gray-400">?��??�您�???��?</p>
              </div>
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

          {/* 快速�?作�? */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  className="text-xs text-gray-400 border-gray-600 hover:bg-gray-600 hover:text-white"
                  onClick={action.action}
                >
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 訊息?�??*/}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-6">
                {messages.map((message) => (
                  <div key={message.id}>
                    {renderMessage(message)}
                  </div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-sm text-gray-400">AI ?��?�?��?��?..</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* 輸入?�??*/}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="輸入?��??��?..."
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                ??Enter ?��???Shift+Enter ?��?
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                  ?��?
                </Badge>
                <span className="text-xs text-gray-500">
                  ?��?: {currentTimestamp}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AITutorChat; 
