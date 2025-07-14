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

  // 初始化歡迎訊息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        content: `👋 您好！我是您的專屬 AI 助教。我已經學習了這個課程的所有內容，包括講義、逐字稿和常見問題。

我可以幫您：
• 解釋複雜的概念
• 除錯您的代碼
• 提供學習建議
• 回答課程相關問題
• 為您總結重點

請告訴我您需要什麼幫助！`,
        timestamp: new Date(),
        messageType: 'text',
        suggestions: [
          '解釋當前章節的重點',
          '檢查我的代碼',
          '給我一些練習建議',
          '總結到目前為止的學習內容'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // 快速操作按鈕
  const quickActions: QuickAction[] = [
    {
      id: 'explain-current',
      label: '解釋當前內容',
      icon: <Lightbulb className="w-4 h-4" />,
      action: () => handleQuickAction('請解釋當前章節的重點概念'),
      category: 'explain'
    },
    {
      id: 'debug-code',
      label: '除錯代碼',
      icon: <Code className="w-4 h-4" />,
      action: () => handleQuickAction('幫我檢查代碼有沒有問題'),
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
      label: '總結重點',
      icon: <BookOpen className="w-4 h-4" />,
      action: () => handleQuickAction('總結到目前為止的重點'),
      category: 'review'
    }
  ];

  // 發送訊息
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

    // 模擬 AI 回應
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // 快速操作
  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  // 生成 AI 回應
  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    // 代碼相關問題
    if (lowerMessage.includes('代碼') || lowerMessage.includes('code') || lowerMessage.includes('除錯') || lowerMessage.includes('bug')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `我來幫您檢查代碼！請把您的代碼貼上來，我會：

1. 🔍 檢查語法錯誤
2. 🎯 分析邏輯問題
3. 💡 提供改進建議
4. 📚 解釋相關概念

您也可以直接從 AI Playground 複製代碼過來！`,
        timestamp: new Date(),
        messageType: 'code',
        codeLanguage: 'python',
        suggestions: [
          '檢查 Python 代碼',
          '解釋這段代碼的邏輯',
          '優化代碼效能',
          '修復錯誤'
        ]
      };
    }

    // 解釋概念
    if (lowerMessage.includes('解釋') || lowerMessage.includes('什麼是') || lowerMessage.includes('概念')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `讓我為您解釋重要概念！

**Prompt Engineering 核心原則：**

1. **明確性** - 清晰描述您的需求
2. **上下文** - 提供足夠的背景信息
3. **格式化** - 指定輸出格式
4. **範例** - 提供具體例子

**實用技巧：**
- 使用角色設定 ("你是一個...")
- 指定步驟 ("請按照以下步驟...")
- 設定限制 ("在100字內...")

想了解更多細節嗎？我可以深入解釋任何概念！`,
        timestamp: new Date(),
        messageType: 'explanation',
        relatedTimestamp: '08:15',
        suggestions: [
          '什麼是 Temperature 參數？',
          '如何寫好的 System Prompt？',
          '零樣本和少樣本的差別',
          '鏈式思維提示技巧'
        ]
      };
    }

    // 練習建議
    if (lowerMessage.includes('練習') || lowerMessage.includes('建議') || lowerMessage.includes('如何提升')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `根據您的學習進度，我建議以下練習：

**🎯 立即可做的練習：**
1. 嘗試寫一個產品描述的 prompt
2. 練習調整 Temperature 參數
3. 比較不同模型的回應

**💪 進階挑戰：**
- 設計一個多步驟的推理任務
- 創建自己的 prompt 模板
- 實現鏈式思維提示

**📊 評估方式：**
- 與預期輸出比較
- 測試不同情況
- 收集用戶反饋

您想先從哪個練習開始？`,
        timestamp: new Date(),
        messageType: 'suggestion',
        suggestions: [
          '開始第一個練習',
          '看看更多範例',
          '測試我的 prompt',
          '獲得個人化建議'
        ]
      };
    }

    // 總結
    if (lowerMessage.includes('總結') || lowerMessage.includes('重點') || lowerMessage.includes('複習')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `📚 **學習重點總結**

**已完成內容：**
✅ Prompt Engineering 基礎概念
✅ 參數調整技巧
✅ 實際案例分析

**核心要點：**
🎯 **明確的指令** - 越具體越好
🎯 **適當的上下文** - 提供必要背景
🎯 **格式化輸出** - 指定期望格式
🎯 **迭代優化** - 不斷改進 prompt

**下一步建議：**
• 完成本章節測驗
• 嘗試更複雜的 prompt 設計
• 學習高階技巧

您對哪個部分還有疑問？`,
        timestamp: new Date(),
        messageType: 'explanation',
        relatedTimestamp: currentTimestamp,
        suggestions: [
          '測試我的理解',
          '看看實際例子',
          '進入下一章節',
          '複習重要概念'
        ]
      };
    }

    // 預設回應
    return {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: `我理解您的問題！讓我為您提供幫助。

根據您的提問，我建議：

1. **檢查當前學習進度** - 確保理解基礎概念
2. **參考相關資料** - 我可以指向具體的課程內容
3. **實際練習** - 動手嘗試是最好的學習方式

您能更具體地描述您遇到的問題嗎？這樣我可以提供更精確的幫助！`,
      timestamp: new Date(),
      messageType: 'text',
      suggestions: [
        '我在這個步驟卡住了',
        '這個概念不太理解',
        '需要更多練習',
        '想看實際例子'
      ]
    };
  };

  // 訊息評分
  const handleRateMessage = (messageId: string, rating: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, rating }
          : msg
      )
    );
  };

  // 複製內容
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // 渲染訊息
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
                跳轉到 {message.relatedTimestamp}
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
          {/* 頂部標題列 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">AI 助教</h2>
                <p className="text-sm text-gray-400">隨時為您解答疑問</p>
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

          {/* 快速操作欄 */}
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

          {/* 訊息區域 */}
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
                        <span className="text-sm text-gray-400">AI 助教正在思考...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* 輸入區域 */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="輸入您的問題..."
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
                按 Enter 發送 • Shift+Enter 換行
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                  在線
                </Badge>
                <span className="text-xs text-gray-500">
                  時間: {currentTimestamp}
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