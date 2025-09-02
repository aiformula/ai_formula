import React, { useState } from 'react' } from 'framer-motion' } from '@/components/ui/button', CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card' } from '@/components/ui/badge' } from '@/components/ui/scroll-area' } from '@/components/ui/input' } from '@/components/ui/textarea', AvatarFallback } from '@/components/ui/avatar',
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
} from 'lucide-react'
}

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'ta'
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
    role: 'student' | 'instructor' | 'ta'
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
    role: 'student' | 'instructor' | 'ta'
  };
  timestamp: Date;
  votes: number;
}

export const CommunityQA: React.FC<CommunityQAProps> = ({ courseId, moduleId }) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1'
      title: '如何撰寫 Prompt 來獲得更好的回應？'
      content: '我嘗試了很多不同的prompt，但是AI的回答總是不夠精確。有什麼具體的技巧嗎？'
      author: {
        name: '小�?'
        role: 'student'
      },
      timestamp: new Date('2024-01-15T10:30:00'
      tags: ['prompt-engineering', '初學者', '技巧'
      answers: [
        {
          id: '1-1'
          content: '這是一個很好的問題！我建議你嘗試以下幾個技巧：\n\n1. **具體化你的需求** - 不要說"幫我寫文案"，而是說"幫我寫一篇300字的科技產品介紹文案"]，為[目標受眾]撰寫[內容類型]。\n要求：[具體要求]\n格式：[輸出格式]\n```'
          author: {
            name: 'Kenneth Wong'
            role: 'instructor'
          },
          timestamp: new Date('2024-01-15T11:45:00'
          replies: [
            {
              id: '1-1-1'
              content: '謝�'
              author: {
                name: '小�?'
                role: 'student'
              },
              timestamp: new Date('2024-01-15T12:00:00'
            }
          ]
        }
      ],
      views: 156,
      isPinned: true,
      isSolved: true
    },
    {
      id: '2'
      title: 'ChatGPT   engineering 上�'
      content: '
      author: {
        name: '
        role: 'student'
      },
      timestamp: new Date('2024-01-16T14:20:00'
      tags: ['ChatGPT', 'Claude', '比�?'
    }
  ]);

  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('', setNewQuestionContent] = useState('', setNewQuestionTags] = useState('', setSearchTerm] = useState('', setSortBy] = useState<'newest' | 'popular' | 'unanswered'>('newest'
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest'
        case 'popular'
          return b.votes - a.votes;
        case 'unanswered'
      }
    });

  // 
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'instructor'
        return 'text-yellow-400'
      case 'ta'
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  };

  // 
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'instructor'
        return '導師'
      case 'ta'
        return ''
      default:
        return '學員'
    }
  };

  // 
  const handleSubmitQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      title: newQuestionTitle,
      content: newQuestionContent,
      author: {
        name: ''
        role: 'student'
      },
      timestamp: new Date(),
      tags: newQuestionTags.split(','
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setNewQuestionTitle(''
    setNewQuestionContent(''
    setNewQuestionTags(''
  };

  // 
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} 
    } else if (hours < 24) {
      return `${hours} 小�
    } else {
      return `${days} 天�
    }
  };

  return (
    <div className="h-full flex flex-col"
      <div className="p-4 border-b border-gray-700 space-y-3"
        <div className="flex items-center justify-between"
          <h3 className="text-lg font-semibold text-white flex items-center"
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2"
            
          </Button>
        </div>

        <div className="flex items-center space-x-3"
          <div className="relative flex-1"
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            <Input
              placeholder=""
              className="pl-10 bg-gray-700 border-gray-600 text-white"
            className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="newest"
            <option value="popular"
            <option value="unanswered"
      <div className="flex-1 overflow-hidden"
        <ScrollArea className="h-full"
          <div className="p-4 space-y-4"
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8"
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4"
                <h3 className="text-lg font-semibold text-gray-300 mb-2"
                <p className="text-sm text-gray-500"
            ) : (
              filteredQuestions.map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                    <CardContent className="p-4"
                      <div className="flex items-start space-x-4"
                        <div className="flex flex-col items-center space-y-2 text-sm"
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 p-1"
                            <ThumbsUp className="w-4 h-4"
                          </Button>
                          <span className="text-gray-300 font-medium"
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 p-1"
                            <ThumbsDown className="w-4 h-4"
                        <div className="flex-1 min-w-0"
                          <div className="flex items-center space-x-2 mb-2"
                            {question.isPinned && (
                              <Pin className="w-4 h-4 text-yellow-400"
                            )}
                            {question.isSolved && (
                              <CheckCircle className="w-4 h-4 text-green-400"
                            )}
                            <h4 className="font-semibold text-white text-lg hover:text-blue-400 transition-colors"
                            </h4>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2"
                          <div className="flex flex-wrap gap-2 mb-3"} variant="outline" className="text-xs text-blue-400 border-blue-400"
                            ))}
                          </div>

                          {/* 底部信息 */}
                          <div className="flex items-center justify-between text-sm text-gray-400"
                            <div className="flex items-center space-x-4"
                              <div className="flex items-center space-x-1"
                                <MessageSquare className="w-3 h-3"
                              </div>
                              <div className="flex items-center space-x-1"
                                <Eye className="w-3 h-3"
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2"
                              </span>
                              <span className="font-medium"
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/*  */}
      {showNewQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl"
          >
            <div className="p-6 border-b border-gray-700"
              <h3 className="text-xl font-semibold text-white"
              <p className="text-sm text-gray-400 mt-1"
                詳細
              </p>
            </div>
            
            <div className="p-6 space-y-4"
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2"
                  placeholder=""
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2"
                  placeholder="詳細"
                  className="]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2"
                  placeholder=", ChatGPT, "
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3"
              <Button
                variant="outline"
                className="text-gray-400 border-gray-600"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4 mr-2"
      )}

      {/* 底部統�? */}
      <div className="p-4 border-t border-gray-700"
        <div className="flex items-center justify-between text-sm text-gray-400"
            } 
            {searchTerm && ` : "}"
          </span>
          <div className="flex items-center space-x-4"
            <div className="flex items-center space-x-1"
              <CheckCircle className="w-3 h-3 text-green-400"
            </div>
            <div className="flex items-center space-x-1"
              <MessageSquare className="w-3 h-3 text-blue-400"
  );
};

export default CommunityQA; 
