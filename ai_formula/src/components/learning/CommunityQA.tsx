import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  Send,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  Star,
  Flag,
  MoreHorizontal,
  User,
  Award,
  BookOpen,
  Code,
  Heart,
  Eye,
  TrendingUp,
  Pin
} from 'lucide-react';

interface CommunityQAProps {
  courseId: string;
  moduleId: string;
}

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'ta';
    reputation: number;
  };
  timestamp: Date;
  tags: string[];
  votes: number;
  answers: Answer[];
  views: number;
  isPinned: boolean;
  isSolved: boolean;
}

interface Answer {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'ta';
    reputation: number;
  };
  timestamp: Date;
  votes: number;
  isAccepted: boolean;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'ta';
    reputation: number;
  };
  timestamp: Date;
  votes: number;
}

export const CommunityQA: React.FC<CommunityQAProps> = ({ courseId, moduleId }) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      title: '如何優化 Prompt 來獲得更好的回應？',
      content: '我嘗試了很多不同的 prompt，但是 AI 的回應總是不夠準確。有什麼具體的技巧嗎？',
      author: {
        name: '小明',
        role: 'student',
        reputation: 85
      },
      timestamp: new Date('2024-01-15T10:30:00'),
      tags: ['prompt-engineering', '優化', '技巧'],
      votes: 12,
      answers: [
        {
          id: '1-1',
          content: '這是一個很好的問題！我建議你嘗試以下幾個技巧：\n\n1. **具體化你的需求** - 不要說"幫我寫文章"，而是說"幫我寫一篇500字的科技產品介紹文章"\n2. **提供上下文** - 告訴 AI 你的目標受眾是誰\n3. **使用範例** - 給出一個理想回應的例子\n4. **分步驟說明** - 將複雜任務分解成小步驟\n\n你可以嘗試這個模板：\n```\n你是一個[角色]，為[目標受眾]撰寫[內容類型]。\n要求：[具體要求]\n格式：[輸出格式]\n```',
          author: {
            name: 'Kenneth Wong',
            role: 'instructor',
            reputation: 2580
          },
          timestamp: new Date('2024-01-15T11:45:00'),
          votes: 25,
          isAccepted: true,
          replies: [
            {
              id: '1-1-1',
              content: '謝謝老師！我試了一下，效果真的好很多！',
              author: {
                name: '小明',
                role: 'student',
                reputation: 85
              },
              timestamp: new Date('2024-01-15T12:00:00'),
              votes: 3
            }
          ]
        }
      ],
      views: 156,
      isPinned: true,
      isSolved: true
    },
    {
      id: '2',
      title: 'ChatGPT 和 Claude 在 prompt engineering 上有什麼區別？',
      content: '我發現同樣的 prompt 在不同的 AI 模型上效果不同，想了解一下各自的特點。',
      author: {
        name: '李小華',
        role: 'student',
        reputation: 120
      },
      timestamp: new Date('2024-01-16T14:20:00'),
      tags: ['ChatGPT', 'Claude', '比較'],
      votes: 8,
      answers: [],
      views: 89,
      isPinned: false,
      isSolved: false
    }
  ]);

  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newQuestionTags, setNewQuestionTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'unanswered'>('newest');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // 過濾和排序問題
  const filteredQuestions = questions
    .filter(question => 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'popular':
          return b.votes - a.votes;
        case 'unanswered':
          return a.answers.length - b.answers.length;
        default:
          return 0;
      }
    });

  // 獲取角色顏色
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'instructor':
        return 'text-yellow-400';
      case 'ta':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  // 獲取角色標籤
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'instructor':
        return '導師';
      case 'ta':
        return '助教';
      default:
        return '學員';
    }
  };

  // 提交新問題
  const handleSubmitQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      title: newQuestionTitle,
      content: newQuestionContent,
      author: {
        name: '當前用戶',
        role: 'student',
        reputation: 50
      },
      timestamp: new Date(),
      tags: newQuestionTags.split(',').map(tag => tag.trim()).filter(Boolean),
      votes: 0,
      answers: [],
      views: 0,
      isPinned: false,
      isSolved: false
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setNewQuestionTitle('');
    setNewQuestionContent('');
    setNewQuestionTags('');
    setShowNewQuestion(false);
  };

  // 時間格式化
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} 分鐘前`;
    } else if (hours < 24) {
      return `${hours} 小時前`;
    } else {
      return `${days} 天前`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 頂部搜索和控制 */}
      <div className="p-4 border-b border-gray-700 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            社群問答
          </h3>
          <Button
            onClick={() => setShowNewQuestion(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            提問
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索問題..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="newest">最新</option>
            <option value="popular">熱門</option>
            <option value="unanswered">未回答</option>
          </select>
        </div>
      </div>

      {/* 問題列表 */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">還沒有問題</h3>
                <p className="text-sm text-gray-500">成為第一個提問的人吧！</p>
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* 投票區域 */}
                        <div className="flex flex-col items-center space-y-2 text-sm">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 p-1">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <span className="text-gray-300 font-medium">{question.votes}</span>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 p-1">
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* 問題內容 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            {question.isPinned && (
                              <Pin className="w-4 h-4 text-yellow-400" />
                            )}
                            {question.isSolved && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                            <h4 className="font-semibold text-white text-lg hover:text-blue-400 transition-colors">
                              {question.title}
                            </h4>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {question.content}
                          </p>

                          {/* 標籤 */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-blue-400 border-blue-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* 底部信息 */}
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>{question.answers.length}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{question.views}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className={getRoleColor(question.author.role)}>
                                {getRoleLabel(question.author.role)}
                              </span>
                              <span className="font-medium">{question.author.name}</span>
                              <span>•</span>
                              <span>{formatTime(question.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* 新問題模態框 */}
      {showNewQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl"
          >
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">提出新問題</h3>
              <p className="text-sm text-gray-400 mt-1">
                詳細描述您的問題，其他學員和導師會幫助您解答
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  問題標題
                </label>
                <Input
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder="用一句話概括您的問題..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  問題詳情
                </label>
                <Textarea
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  placeholder="詳細描述您的問題，包含相關背景和您已經嘗試的方法..."
                  className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  標籤 (用逗號分隔)
                </label>
                <Input
                  value={newQuestionTags}
                  onChange={(e) => setNewQuestionTags(e.target.value)}
                  placeholder="例如: prompt-engineering, ChatGPT, 優化"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowNewQuestion(false)}
                className="text-gray-400 border-gray-600"
              >
                取消
              </Button>
              <Button
                onClick={handleSubmitQuestion}
                disabled={!newQuestionTitle.trim() || !newQuestionContent.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                發布問題
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 底部統計 */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            共 {filteredQuestions.length} 個問題
            {searchTerm && ` • 搜索: "${searchTerm}"`}
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>{questions.filter(q => q.isSolved).length} 已解決</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3 text-blue-400" />
              <span>{questions.filter(q => q.answers.length === 0).length} 待回答</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityQA; 