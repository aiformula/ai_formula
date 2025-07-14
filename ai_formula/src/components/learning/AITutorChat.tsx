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

  // ?å??–æ­¡è¿è???
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        content: `?? ?¨å¥½ï¼æ??¯æ‚¨?„å?å±?AI ?©æ??‚æ?å·²ç?å­¸ç?äº†é€™å€‹èª²ç¨‹ç??€?‰å…§å®¹ï??…æ‹¬è¬›ç¾©?é€å?ç¨¿å?å¸¸è??é???

?‘å¯ä»¥å¹«?¨ï?
??è§??è¤‡é??„æ?å¿?
???¤éŒ¯?¨ç?ä»?¢¼
???ä?å­¸ç?å»ºè­°
???ç?èª²ç??¸é??é?
???ºæ‚¨ç¸½ç??é?

è«‹å?è¨´æ??¨é?è¦ä?éº¼å¹«?©ï?`,
        timestamp: new Date(),
        messageType: 'text',
        suggestions: [
          'è§???¶å?ç« ç??„é?é»?,
          'æª¢æŸ¥?‘ç?ä»?¢¼',
          'çµ¦æ?ä¸€äº›ç·´ç¿’å»ºè­?,
          'ç¸½ç??°ç›®?ç‚ºæ­¢ç?å­¸ç??§å®¹'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // å¿«é€Ÿæ?ä½œæ???
  const quickActions: QuickAction[] = [
    {
      id: 'explain-current',
      label: 'è§???¶å??§å®¹',
      icon: <Lightbulb className="w-4 h-4" />,
      action: () => handleQuickAction('è«‹è§£?‹ç•¶?ç?ç¯€?„é?é»æ?å¿?),
      category: 'explain'
    },
    {
      id: 'debug-code',
      label: '?¤éŒ¯ä»?¢¼',
      icon: <Code className="w-4 h-4" />,
      action: () => handleQuickAction('å¹«æ?æª¢æŸ¥ä»?¢¼?‰æ??‰å?é¡?),
      category: 'debug'
    },
    {
      id: 'practice-suggestions',
      label: 'ç·´ç?å»ºè­°',
      icon: <Target className="w-4 h-4" />,
      action: () => handleQuickAction('çµ¦æ?ä¸€äº›ç·´ç¿’å»ºè­?),
      category: 'practice'
    },
    {
      id: 'review-summary',
      label: 'ç¸½ç??é?',
      icon: <BookOpen className="w-4 h-4" />,
      action: () => handleQuickAction('ç¸½ç??°ç›®?ç‚ºæ­¢ç??é?'),
      category: 'review'
    }
  ];

  // ?¼é€è???
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

    // æ¨¡æ“¬ AI ?æ?
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // å¿«é€Ÿæ?ä½?
  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  // ?Ÿæ? AI ?æ?
  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    // ä»?¢¼?¸é??é?
    if (lowerMessage.includes('ä»?¢¼') || lowerMessage.includes('code') || lowerMessage.includes('?¤éŒ¯') || lowerMessage.includes('bug')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `?‘ä?å¹«æ‚¨æª¢æŸ¥ä»?¢¼ï¼è??Šæ‚¨?„ä»£ç¢¼è²¼ä¸Šä?ï¼Œæ??ƒï?

1. ?? æª¢æŸ¥èªæ??¯èª¤
2. ?¯ ?†æ??è¼¯?é?
3. ?’¡ ?ä??¹é€²å»ºè­?
4. ?? è§???¸é?æ¦‚å¿µ

?¨ä??¯ä»¥?´æ¥å¾?AI Playground è¤‡è£½ä»?¢¼?ä?ï¼`,
        timestamp: new Date(),
        messageType: 'code',
        codeLanguage: 'python',
        suggestions: [
          'æª¢æŸ¥ Python ä»?¢¼',
          'è§???™æ®µä»?¢¼?„é?è¼?,
          '?ªå?ä»?¢¼?ˆèƒ½',
          'ä¿®å¾©?¯èª¤'
        ]
      };
    }

    // è§??æ¦‚å¿µ
    if (lowerMessage.includes('è§??') || lowerMessage.includes('ä»€éº¼æ˜¯') || lowerMessage.includes('æ¦‚å¿µ')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `è®“æ??ºæ‚¨è§???è?æ¦‚å¿µï¼?

**Prompt Engineering ?¸å??Ÿå?ï¼?*

1. **?ç¢º??* - æ¸…æ™°?è¿°?¨ç??€æ±?
2. **ä¸Šä???* - ?ä?è¶³å??„è??¯ä¿¡??
3. **?¼å???* - ?‡å?è¼¸å‡º?¼å?
4. **ç¯„ä?** - ?ä??·é?ä¾‹å?

**å¯¦ç”¨?€å·§ï?**
- ä½¿ç”¨è§’è‰²è¨­å? ("ä½ æ˜¯ä¸€??..")
- ?‡å?æ­¥é? ("è«‹æ??§ä»¥ä¸‹æ­¥é©?..")
- è¨­å??åˆ¶ ("??00å­—å…§...")

?³ä?è§?›´å¤šç´°ç¯€?ï??‘å¯ä»¥æ·±?¥è§£?‹ä»»ä½•æ?å¿µï?`,
        timestamp: new Date(),
        messageType: 'explanation',
        relatedTimestamp: '08:15',
        suggestions: [
          'ä»€éº¼æ˜¯ Temperature ?ƒæ•¸ï¼?,
          'å¦‚ä?å¯«å¥½??System Promptï¼?,
          '?¶æ¨£?¬å?å°‘æ¨£?¬ç?å·®åˆ¥',
          '?ˆå??ç¶­?ç¤º?€å·?
        ]
      };
    }

    // ç·´ç?å»ºè­°
    if (lowerMessage.includes('ç·´ç?') || lowerMessage.includes('å»ºè­°') || lowerMessage.includes('å¦‚ä??å?')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `?¹æ??¨ç?å­¸ç??²åº¦ï¼Œæ?å»ºè­°ä»¥ä?ç·´ç?ï¼?

**?¯ ç«‹å³?¯å??„ç·´ç¿’ï?**
1. ?—è©¦å¯«ä??‹ç”¢?æ?è¿°ç? prompt
2. ç·´ç?èª¿æ•´ Temperature ?ƒæ•¸
3. æ¯”è?ä¸å?æ¨¡å??„å???

**?’ª ?²é??‘æˆ°ï¼?*
- è¨­è?ä¸€?‹å?æ­¥é??„æ¨?†ä»»??
- ?µå»º?ªå·±??prompt æ¨¡æ¿
- å¯¦ç¾?ˆå??ç¶­?ç¤º

**?? è©•ä¼°?¹å?ï¼?*
- ?‡é??Ÿè¼¸?ºæ?è¼?
- æ¸¬è©¦ä¸å??…æ?
- ?¶é??¨æˆ¶?é?

?¨æƒ³?ˆå??ªå€‹ç·´ç¿’é?å§‹ï?`,
        timestamp: new Date(),
        messageType: 'suggestion',
        suggestions: [
          '?‹å?ç¬¬ä??‹ç·´ç¿?,
          '?‹ç??´å?ç¯„ä?',
          'æ¸¬è©¦?‘ç? prompt',
          '?²å??‹äºº?–å»ºè­?
        ]
      };
    }

    // ç¸½ç?
    if (lowerMessage.includes('ç¸½ç?') || lowerMessage.includes('?é?') || lowerMessage.includes('è¤‡ç?')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `?? **å­¸ç??é?ç¸½ç?**

**å·²å??å…§å®¹ï?**
??Prompt Engineering ?ºç?æ¦‚å¿µ
???ƒæ•¸èª¿æ•´?€å·?
??å¯¦é?æ¡ˆä??†æ?

**?¸å?è¦é?ï¼?*
?¯ **?ç¢º?„æ?ä»?* - è¶Šå…·é«”è?å¥?
?¯ **?©ç•¶?„ä?ä¸‹æ?** - ?ä?å¿…è??Œæ™¯
?¯ **?¼å??–è¼¸??* - ?‡å??Ÿæ??¼å?
?¯ **è¿­ä»£?ªå?** - ä¸æ–·?¹é€?prompt

**ä¸‹ä?æ­¥å»ºè­°ï?**
??å®Œæ??¬ç?ç¯€æ¸¬é?
???—è©¦?´è??œç? prompt è¨­è?
??å­¸ç?é«˜é??€å·?

?¨å??ªå€‹éƒ¨?†é??‰ç??ï?`,
        timestamp: new Date(),
        messageType: 'explanation',
        relatedTimestamp: currentTimestamp,
        suggestions: [
          'æ¸¬è©¦?‘ç??†è§£',
          '?‹ç?å¯¦é?ä¾‹å?',
          '?²å…¥ä¸‹ä?ç« ç?',
          'è¤‡ç??è?æ¦‚å¿µ'
        ]
      };
    }

    // ?è¨­?æ?
    return {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: `?‘ç?è§?‚¨?„å?é¡Œï?è®“æ??ºæ‚¨?ä?å¹«åŠ©??

?¹æ??¨ç??å?ï¼Œæ?å»ºè­°ï¼?

1. **æª¢æŸ¥?¶å?å­¸ç??²åº¦** - ç¢ºä??†è§£?ºç?æ¦‚å¿µ
2. **?ƒè€ƒç›¸?œè???* - ?‘å¯ä»¥æ??‘å…·é«”ç?èª²ç??§å®¹
3. **å¯¦é?ç·´ç?** - ?•æ??—è©¦?¯æ?å¥½ç?å­¸ç??¹å?

?¨èƒ½?´å…·é«”åœ°?è¿°?¨é??°ç??é??ï??™æ¨£?‘å¯ä»¥æ?ä¾›æ›´ç²¾ç¢º?„å¹«?©ï?`,
      timestamp: new Date(),
      messageType: 'text',
      suggestions: [
        '?‘åœ¨?™å€‹æ­¥é©Ÿå¡ä½ä?',
        '?™å€‹æ?å¿µä?å¤ªç?è§?,
        '?€è¦æ›´å¤šç·´ç¿?,
        '?³ç?å¯¦é?ä¾‹å?'
      ]
    };
  };

  // è¨Šæ¯è©•å?
  const handleRateMessage = (messageId: string, rating: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, rating }
          : msg
      )
    );
  };

  // è¤‡è£½?§å®¹
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // æ¸²æ?è¨Šæ¯
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
                è·³è???{message.relatedTimestamp}
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
                è¤‡è£½
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
          {/* ?‚éƒ¨æ¨™é???*/}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">AI ?©æ?</h2>
                <p className="text-sm text-gray-400">?¨æ??ºæ‚¨è§???‘å?</p>
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

          {/* å¿«é€Ÿæ?ä½œæ? */}
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

          {/* è¨Šæ¯?€??*/}
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
                        <span className="text-sm text-gray-400">AI ?©æ?æ­?œ¨?è€?..</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* è¼¸å…¥?€??*/}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="è¼¸å…¥?¨ç??é?..."
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
                ??Enter ?¼é€???Shift+Enter ?›è?
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                  ?¨ç?
                </Badge>
                <span className="text-xs text-gray-500">
                  ?‚é?: {currentTimestamp}
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
