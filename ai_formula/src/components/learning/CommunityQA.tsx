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
      title: '如何撰寫 Prompt 來獲得更好的回應？',
      content: '我嘗試了很多不同的prompt，但是AI的回答總是不夠精確。有什麼具體的技巧嗎？',
      author: {
        name: '小�?',
        role: 'student',
        reputation: 85
      },
      timestamp: new Date('2024-01-15T10:30:00'),
      tags: ['prompt-engineering', '?��?', '?��?],
      votes: 12,
      answers: [
        {
          id: '1-1',
          content: '?�是一?��?好�??��?！�?建議你�?試以下幾?��?巧�?\n\n1. **?��??��??��?�?* - 不�?�?幫�?寫�?�?，而是�?幫�?寫�?�?00字�?科�??��?介紹?��?"\n2. **?��?上�???* - ?�訴 AI 你�??��??�眾?�誰\n3. **使用範�?** - 給出一?��??��??��?例�?\n4. **?�步驟說??* - 將�??�任?��?�??小步驟\n\n你可以�?試這個模?��?\n```\n你是一?�[角色]，為[?��??�眾]?�寫[?�容類�?]?�\n要�?：[?��?要�?]\n?��?：[輸出?��?]\n```',
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
              content: '謝�??�師！�?試�?一下�??��??��?好�?多�?',
              author: {
                name: '小�?',
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
      title: 'ChatGPT ??Claude ??prompt engineering 上�?什麼�??��?',
      content: '?�發?��?�?? prompt ?��??��? AI 模�?上�??��??��??��?�??下�??��??��???,
      author: {
        name: '?��???,
        role: 'student',
        reputation: 120
      },
      timestamp: new Date('2024-01-16T14:20:00'),
      tags: ['ChatGPT', 'Claude', '比�?'],
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

  // ?�濾?��?序�?�?
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

  // ?��?角色顏色
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

  // ?��?角色標籤
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'instructor':
        return '導師';
      case 'ta':
        return '?��?';
      default:
        return '學員';
    }
  };

  // ?�交?��?�?
  const handleSubmitQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      title: newQuestionTitle,
      content: newQuestionContent,
      author: {
        name: '?��??�戶',
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

  // ?��??��???
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} ?��??�`;
    } else if (hours < 24) {
      return `${hours} 小�??�`;
    } else {
      return `${days} 天�?`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* ?�部?�索?�控??*/}
      <div className="p-4 border-b border-gray-700 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            社群?��?
          </h3>
          <Button
            onClick={() => setShowNewQuestion(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            ?��?
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="?�索?��?..."
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
            <option value="newest">?�??/option>
            <option value="popular">?��?</option>
            <option value="unanswered">?��?�?/option>
          </select>
        </div>
      </div>

      {/* ?��??�表 */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">?��??��?�?/h3>
                <p className="text-sm text-gray-500">?�為第�??��??��?人吧�?/p>
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
                        {/* ?�票?�??*/}
                        <div className="flex flex-col items-center space-y-2 text-sm">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 p-1">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <span className="text-gray-300 font-medium">{question.votes}</span>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 p-1">
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* ?��??�容 */}
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
                              <span>??/span>
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

      {/* ?��?題模?��? */}
      {showNewQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl"
          >
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">?�出?��?�?/h3>
              <p className="text-sm text-gray-400 mt-1">
                詳細?�述?��??��?，其他學?��?導師?�幫?�您�??
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ?��?標�?
                </label>
                <Input
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder="?��??�話概括?��??��?..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ?��?詳�?
                </label>
                <Textarea
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  placeholder="詳細?�述?��??��?，�??�相?��??��??�已經�?試�??��?..."
                  className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  標籤 (?�逗�??��?)
                </label>
                <Input
                  value={newQuestionTags}
                  onChange={(e) => setNewQuestionTags(e.target.value)}
                  placeholder="例�?: prompt-engineering, ChatGPT, ?��?"
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
                ?��?
              </Button>
              <Button
                onClick={handleSubmitQuestion}
                disabled={!newQuestionTitle.trim() || !newQuestionContent.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                ?��??��?
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 底部統�? */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            ??{filteredQuestions.length} ?��?�?
            {searchTerm && ` ???�索: "${searchTerm}"`}
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>{questions.filter(q => q.isSolved).length} 已解�?/span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3 text-blue-400" />
              <span>{questions.filter(q => q.answers.length === 0).length} 待�?�?/span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityQA; 
