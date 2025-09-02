import React, { useState, useRef, useEffect } from 'react', AnimatePresence } from 'framer-motion' } from '@/components/ui/button' } from '@/components/ui/input', CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card' } from '@/components/ui/badge' } from '@/components/ui/scroll-area', TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs',
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
} from 'lucide-react'
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai'
  content: string;
  timestamp: Date;
  messageType: 'text' | 'code' | 'suggestion' | 'explanation' | 'quiz'
  rating?: 'positive' | 'negative'
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'explain' | 'debug' | 'practice' | 'review'
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  isOpen,
  onClose,
  courseId,
  moduleId,
  currentTimestamp
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('', setActiveTab] = useState('chat'
      const welcomeMessage: ChatMessage = {
        id: 'welcome'
        type: 'ai'
        messageType: 'text'
        suggestions: [
          '解釋這個章節的內容'
          '檢查我的答案'
          '給我一些練習建議'
          '總結到目前為止的學習內容'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // 快速�
  const quickActions: QuickAction[] = [
    {
      id: 'explain-current'
      label: '解釋內容'
      icon: <Lightbulb className="w-4 h-4") => handleQuickAction('請解釋當前章節的重點'
      category: 'explain'
    },
    {
      id: 'debug-code'
      label: '除錯協助'
      icon: <Code className="w-4 h-4") => handleQuickAction('幫我檢查代碼中的問題'
      category: 'debug'
    },
    {
      id: 'practice-suggestions'
      label: '練習建議'
      icon: <Target className="w-4 h-4") => handleQuickAction('給我一些練習建議'
      category: 'practice'
    },
    {
      id: 'review-summary'
      label: '總�'
      icon: <BookOpen className="w-4 h-4") => handleQuickAction('總�'
      category: 'review'
    }
  ];

  // 
  const handleSendMessage = async (message: string = inputValue) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user'
      messageType: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue(''
    }, 1500);
  };

  // 快速�
  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  //  AI 
  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    // �
    if (lowerMessage.includes('�') || lowerMessage.includes('code') || lowerMessage.includes('') || lowerMessage.includes('bug'
        type: 'ai'
        messageType: 'code'
        codeLanguage: 'python'
        suggestions: [
          '檢查 Python 語法'
          '運行這段代碼看結果'
          '測試不同的功能'
          '修復錯誤'
      };
    }

    // �
    if (lowerMessage.includes('�') || lowerMessage.includes('什麼是') || lowerMessage.includes('概念'
        type: 'ai'
        content: `讓�

**Prompt Engineering 

1. ** - 清晰
2. **上� - 
3. ** - 
4. **範� - 

**實用
- 使用角色設�? ("你是一"
-  ("請�"
- 設� (""

,
        timestamp: new Date(),
        messageType: 'explanation'
        relatedTimestamp: '08:15'
        suggestions: [
          '什麼是 Temperature 參數？'
          '如何寫好的 System Prompt？'
          '怎樣減少樣本差別'
          '多維度提示技巧'
      };
    }

    // 練�
    if (lowerMessage.includes('練�?') || lowerMessage.includes('建議') || lowerMessage.includes('如�'
        type: 'ai'

,
        timestamp: new Date(),
        messageType: 'suggestion'
        suggestions: [
          '
          ''
          '測試 prompt'
          '
      };
    }

    // 總�?
    if (lowerMessage.includes('總�?') || lowerMessage.includes('') || lowerMessage.includes('複�?'
        type: 'ai'

,
        timestamp: new Date(),
        messageType: 'explanation'
        suggestions: [
          '測試'
          ''
          ''
          '複�'
      };
    }

    // 
    return {
      id: (Date.now() + 1).toString(),
      type: 'ai'

,
      timestamp: new Date(),
      messageType: 'text'
      suggestions: [
        ''
        '
        '
        ''
    };
  };

  // 訊息評�?
  const handleRateMessage = (messageId: string, rating: 'positive' | 'negative'
      )
    );
  };

  // 複製
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // 渲�
  const renderMessage = (message: ChatMessage) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'
      >
        {message.type === 'ai'
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            <Bot className="w-5 h-5 text-white"
        )}
        
        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''
          <div className={`rounded-lg p-4 ${
            message.type === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-white'
          }`}>
            <div className="whitespace-pre-wrap text-sm leading-relaxed"
            </div>
            
            {message.relatedTimestamp && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs text-blue-400 hover:text-blue-300"
              >
                <Play className="w-3 h-3 mr-1"
            )}
          </div>
          
          {message.suggestions && (
            <div className="mt-3 flex flex-wrap gap-2"
                  variant="outline"
                  size="sm"
                  className="text-xs text-gray-400 border-gray-600 hover:bg-gray-600 hover:text-white"
              ))}
            </div>
          )}
          
          {message.type === 'ai'
            <div className="flex items-center gap-2 mt-3"
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400 hover:text-gray-300"
              >
                <Copy className="w-3 h-3 mr-1"
                複製
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs ${
                  message.rating === 'positive' ? 'text-green-400' : 'text-gray-400'
                } hover:text-green-400`}
                onClick={() => handleRateMessage(message.id, 'positive'
              >
                <ThumbsUp className="w-3 h-3"
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs ${
                  message.rating === 'negative' ? 'text-red-400' : 'text-gray-400'
                } hover:text-red-400`}
                onClick={() => handleRateMessage(message.id, 'negative'
              >
                <ThumbsDown className="w-3 h-3"
          )}
        </div>
        
        {message.type === 'user'
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
            <User className="w-5 h-5 text-white"
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
          className="] flex flex-col"
          <div className="flex items-center justify-between p-4 border-b border-gray-700"
            <div className="flex items-center space-x-3"
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                <Bot className="w-6 h-6 text-white"
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white"
                <p className="text-sm text-gray-400"
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4"
          <div className="p-4 border-b border-gray-700"
            <div className="flex flex-wrap gap-2"
                  variant="outline"
                  size="sm"
                  className="text-xs text-gray-400 border-gray-600 hover:bg-gray-600 hover:text-white"
                  <span className="ml-2"
              ))}
            </div>
          </div>

          {/* 訊息}
          <div className="flex-1 overflow-hidden"
            <ScrollArea className="h-full"
              <div className="p-4 space-y-6"
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                      <Bot className="w-5 h-5 text-white"
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4"
                      <div className="flex items-center space-x-2"
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400"
                        <span className="text-sm text-gray-400"
                )}
              </div>
            </ScrollArea>
          </div>

          {/* 輸入}
          <div className="p-4 border-t border-gray-700"
            <div className="flex gap-2"
                placeholder="輸入"
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  if (e.key === 'Enter'
                  }
                }}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4"
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2"
              <span className="text-xs text-gray-500"
                  
              </span>
              <div className="flex items-center space-x-2"
                <Badge variant="outline" className="text-xs text-green-400 border-green-400"
                  
                </Badge>
                <span className="text-xs text-gray-500"
  );
};

export default AITutorChat; 
