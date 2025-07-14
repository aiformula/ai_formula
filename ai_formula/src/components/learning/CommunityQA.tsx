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
      title: 'å¦‚ä??ªå? Prompt ä¾†ç²å¾—æ›´å¥½ç??æ?ï¼?,
      content: '?‘å?è©¦ä?å¾ˆå?ä¸å???promptï¼Œä???AI ?„å??‰ç¸½?¯ä?å¤ æ?ç¢ºã€‚æ?ä»€éº¼å…·é«”ç??€å·§å?ï¼?,
      author: {
        name: 'å°æ?',
        role: 'student',
        reputation: 85
      },
      timestamp: new Date('2024-01-15T10:30:00'),
      tags: ['prompt-engineering', '?ªå?', '?€å·?],
      votes: 12,
      answers: [
        {
          id: '1-1',
          content: '?™æ˜¯ä¸€?‹å?å¥½ç??é?ï¼æ?å»ºè­°ä½ å?è©¦ä»¥ä¸‹å¹¾?‹æ?å·§ï?\n\n1. **?·é??–ä??„é?æ±?* - ä¸è?èª?å¹«æ?å¯«æ?ç«?ï¼Œè€Œæ˜¯èª?å¹«æ?å¯«ä?ç¯?00å­—ç?ç§‘æ??¢å?ä»‹ç´¹?‡ç?"\n2. **?ä?ä¸Šä???* - ?Šè¨´ AI ä½ ç??®æ??—çœ¾?¯èª°\n3. **ä½¿ç”¨ç¯„ä?** - çµ¦å‡ºä¸€?‹ç??³å??‰ç?ä¾‹å?\n4. **?†æ­¥é©Ÿèªª??* - å°‡è??œä»»?™å?è§??å°æ­¥é©Ÿ\n\nä½ å¯ä»¥å?è©¦é€™å€‹æ¨¡?¿ï?\n```\nä½ æ˜¯ä¸€?‹[è§’è‰²]ï¼Œç‚º[?®æ??—çœ¾]?°å¯«[?§å®¹é¡å?]?‚\nè¦æ?ï¼š[?·é?è¦æ?]\n?¼å?ï¼š[è¼¸å‡º?¼å?]\n```',
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
              content: 'è¬è??å¸«ï¼æ?è©¦ä?ä¸€ä¸‹ï??ˆæ??Ÿç?å¥½å?å¤šï?',
              author: {
                name: 'å°æ?',
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
      title: 'ChatGPT ??Claude ??prompt engineering ä¸Šæ?ä»€éº¼å??¥ï?',
      content: '?‘ç™¼?¾å?æ¨?? prompt ?¨ä??Œç? AI æ¨¡å?ä¸Šæ??œä??Œï??³ä?è§??ä¸‹å??ªç??¹é???,
      author: {
        name: '?å???,
        role: 'student',
        reputation: 120
      },
      timestamp: new Date('2024-01-16T14:20:00'),
      tags: ['ChatGPT', 'Claude', 'æ¯”è?'],
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

  // ?æ¿¾?Œæ?åºå?é¡?
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

  // ?²å?è§’è‰²é¡è‰²
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

  // ?²å?è§’è‰²æ¨™ç±¤
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'instructor':
        return 'å°å¸«';
      case 'ta':
        return '?©æ?';
      default:
        return 'å­¸å“¡';
    }
  };

  // ?äº¤?°å?é¡?
  const handleSubmitQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      title: newQuestionTitle,
      content: newQuestionContent,
      author: {
        name: '?¶å??¨æˆ¶',
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

  // ?‚é??¼å???
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} ?†é??`;
    } else if (hours < 24) {
      return `${hours} å°æ??`;
    } else {
      return `${days} å¤©å?`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* ?‚éƒ¨?œç´¢?Œæ§??*/}
      <div className="p-4 border-b border-gray-700 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            ç¤¾ç¾¤?ç?
          </h3>
          <Button
            onClick={() => setShowNewQuestion(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            ?å?
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="?œç´¢?é?..."
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
            <option value="newest">?€??/option>
            <option value="popular">?±é?</option>
            <option value="unanswered">?ªå?ç­?/option>
          </select>
        </div>
      </div>

      {/* ?é??—è¡¨ */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">?„æ??‰å?é¡?/h3>
                <p className="text-sm text-gray-500">?ç‚ºç¬¬ä??‹æ??ç?äººå§ï¼?/p>
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
                        {/* ?•ç¥¨?€??*/}
                        <div className="flex flex-col items-center space-y-2 text-sm">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 p-1">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <span className="text-gray-300 font-medium">{question.votes}</span>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 p-1">
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* ?é??§å®¹ */}
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

                          {/* æ¨™ç±¤ */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-blue-400 border-blue-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* åº•éƒ¨ä¿¡æ¯ */}
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

      {/* ?°å?é¡Œæ¨¡?‹æ? */}
      {showNewQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl"
          >
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">?å‡º?°å?é¡?/h3>
              <p className="text-sm text-gray-400 mt-1">
                è©³ç´°?è¿°?¨ç??é?ï¼Œå…¶ä»–å­¸?¡å?å°å¸«?ƒå¹«?©æ‚¨è§??
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ?é?æ¨™é?
                </label>
                <Input
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder="?¨ä??¥è©±æ¦‚æ‹¬?¨ç??é?..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ?é?è©³æ?
                </label>
                <Textarea
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  placeholder="è©³ç´°?è¿°?¨ç??é?ï¼Œå??«ç›¸?œè??¯å??¨å·²ç¶“å?è©¦ç??¹æ?..."
                  className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  æ¨™ç±¤ (?¨é€—è??†é?)
                </label>
                <Input
                  value={newQuestionTags}
                  onChange={(e) => setNewQuestionTags(e.target.value)}
                  placeholder="ä¾‹å?: prompt-engineering, ChatGPT, ?ªå?"
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
                ?–æ?
              </Button>
              <Button
                onClick={handleSubmitQuestion}
                disabled={!newQuestionTitle.trim() || !newQuestionContent.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                ?¼å??é?
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* åº•éƒ¨çµ±è? */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            ??{filteredQuestions.length} ?‹å?é¡?
            {searchTerm && ` ???œç´¢: "${searchTerm}"`}
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>{questions.filter(q => q.isSolved).length} å·²è§£æ±?/span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3 text-blue-400" />
              <span>{questions.filter(q => q.answers.length === 0).length} å¾…å?ç­?/span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityQA; 
