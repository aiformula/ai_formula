import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Edit, 
  BarChart3, 
  Target, 
  TrendingUp,
  Play,
  Pause,
  Share2,
  BookOpen,
  MessageSquare,
  Users,
  Clock,
  Award,
  CheckCircle,
  Video,
  FileText,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Settings,
  Download,
  Eye
} from 'lucide-react';

// 數據結構
interface LessonModule {
  id: string;
  title: string;
  titleZh: string;
  icon: JSX.Element;
  status: 'completed' | 'current' | 'locked';
  progress: number;
}

interface LearningStats {
  timeSpent: number;
  completionRate: number;
  accuracy: number;
  streak: number;
}

interface Discussion {
  id: string;
  type: 'instructor' | 'student' | 'faq';
  author: string;
  content: string;
  contentZh: string;
  time: string;
  likes: number;
}

// 學習統計組件
const StatsCard: React.FC<{
  title: string;
  value: string;
  icon: JSX.Element;
  color: string;
}> = ({ title, value, icon, color }) => (
  <div className={`bg-gradient-to-r ${color} p-4 rounded-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-300">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="text-white">{icon}</div>
    </div>
  </div>
);

// 影片播放器組件
const VideoPlayer: React.FC<{
  title: string;
  duration: string;
  isPlaying: boolean;
  onToggle: () => void;
}> = ({ title, duration, isPlaying, onToggle }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden">
    <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <Button
        onClick={onToggle}
        size="lg"
        className="bg-white/20 hover:bg-white/30 rounded-full w-16 h-16"
      >
        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
      </Button>
    </div>
    <div className="p-4">
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{duration}</span>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>1.2K views</span>
        </div>
      </div>
    </div>
  </div>
);

// 互動練習組件
const InteractivePractice: React.FC<{
  title: string;
  description: string;
  onStart: () => void;
}> = ({ title, description, onStart }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h4 className="font-semibold text-white mb-2">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <Badge variant="outline" className="text-blue-400 border-blue-400">
        實作
      </Badge>
    </div>
    <div className="space-y-3">
      <Textarea
        placeholder="在此輸入您的 Perplexity 搜索查詢..."
        className="bg-gray-900/50 border-gray-600 min-h-[80px]"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Target className="w-4 h-4" />
          <span>練習目標: 精確搜索</span>
        </div>
        <Button onClick={onStart} size="sm" className="bg-blue-600 hover:bg-blue-700">
          開始練習
        </Button>
      </div>
    </div>
  </div>
);

// 筆記編輯器組件
const NotesEditor: React.FC<{
  notes: string;
  onNotesChange: (notes: string) => void;
}> = ({ notes, onNotesChange }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-semibold text-white">個人筆記</h4>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          自動保存
        </Badge>
        <Button size="sm" variant="outline">
          <Download className="w-4 h-4 mr-1" />
          導出
        </Button>
      </div>
    </div>
    <Textarea
      value={notes}
      onChange={(e) => onNotesChange(e.target.value)}
      placeholder="記錄您的學習重點、想法和問題..."
      className="bg-gray-900/50 border-gray-600 min-h-[200px] resize-none"
    />
    <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
      <span>最後更新: 2 分鐘前</span>
      <span>{notes.length}/1000 字符</span>
    </div>
  </div>
);

// 主要課程數據
const lessonModules: LessonModule[] = [
  {
    id: 'search',
    title: 'Search',
    titleZh: '搜索',
    icon: <Search className="w-5 h-5" />,
    status: 'current',
    progress: 75
  },
  {
    id: 'writing',
    title: 'Writing',
    titleZh: '寫作',
    icon: <Edit className="w-5 h-5" />,
    status: 'locked',
    progress: 0
  },
  {
    id: 'analysis',
    title: 'Analysis',
    titleZh: '分析',
    icon: <BarChart3 className="w-5 h-5" />,
    status: 'locked',
    progress: 0
  },
  {
    id: 'optimization',
    title: 'Optimization',
    titleZh: '優化',
    icon: <Target className="w-5 h-5" />,
    status: 'locked',
    progress: 0
  },
  {
    id: 'reporting',
    title: 'Reporting',
    titleZh: '報告',
    icon: <TrendingUp className="w-5 h-5" />,
    status: 'locked',
    progress: 0
  }
];

const discussions: Discussion[] = [
  {
    id: '1',
    type: 'instructor',
    author: 'Dr. Chen',
    content: 'Remember to use specific keywords when searching with Perplexity for better results.',
    contentZh: '記住在使用 Perplexity 搜索時使用具體關鍵詞以獲得更好的結果。',
    time: '2 hours ago',
    likes: 12
  },
  {
    id: '2',
    type: 'student',
    author: 'Alex Wang',
    content: 'How do I search for academic papers using Perplexity?',
    contentZh: '如何使用 Perplexity 搜索學術論文？',
    time: '3 hours ago',
    likes: 8
  },
  {
    id: '3',
    type: 'faq',
    author: 'FAQ Bot',
    content: 'Common search operators: quotation marks for exact phrases, AND/OR for logical operations.',
    contentZh: '常見搜索操作符：引號用於精確短語，AND/OR用於邏輯運算。',
    time: '1 day ago',
    likes: 15
  }
];

const PerplexityToolsLesson: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-TW';
  
  const [activeModule, setActiveModule] = useState('search');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [personalNotes, setPersonalNotes] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(12);
  
  const currentModule = useMemo(() => 
    lessonModules.find(m => m.id === activeModule), 
    [activeModule]
  );

  const learningStats: LearningStats = {
    timeSpent: 8,
    completionRate: 92,
    accuracy: 85,
    streak: 5
  };

  const totalProgress = useMemo(() => {
    const completed = lessonModules.filter(m => m.status === 'completed').length;
    const current = lessonModules.find(m => m.status === 'current');
    const currentProgress = current ? current.progress / 100 : 0;
    return Math.round(((completed + currentProgress) / lessonModules.length) * 100);
  }, []);

  const handleModuleSelect = useCallback((moduleId: string) => {
    const module = lessonModules.find(m => m.id === moduleId);
    if (module && module.status !== 'locked') {
      setActiveModule(moduleId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* 頂部儀表板 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/30 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                📊 {isZhTW ? 'Perplexity 工具掌握' : 'Perplexity Tools Mastery'}
              </h1>
              <p className="text-gray-300 mt-2">
                {isZhTW ? '當前: 搜索技巧' : 'Current: Search Techniques'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">
                ⏱️ {isZhTW ? '剩餘: 12分' : 'Remaining: 12 min'}
              </div>
              <div className="text-sm text-gray-400">
                {isZhTW ? '第 2 課 / 共 5 課' : 'Lesson 2 / 5'}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <Progress value={totalProgress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>0%</span>
              <span className="font-semibold text-blue-400">{totalProgress}%</span>
              <span>100%</span>
            </div>
          </div>
        </motion.div>

        {/* 模組選擇標籤 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 bg-gray-800/50 p-2 rounded-xl">
            {lessonModules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleSelect(module.id)}
                disabled={module.status === 'locked'}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                  ${activeModule === module.id 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-400'
                  }
                  ${module.status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {module.icon}
                <span className="font-medium">
                  {isZhTW ? module.titleZh : module.title}
                </span>
                {module.status === 'current' && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
                {module.status === 'completed' && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 主要學習區域 - 三欄佈局 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* 左欄 - 理論學習 */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  {isZhTW ? '📚 理論' : '📚 Theory'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">搜索技巧</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      掌握 Perplexity 的高級搜索功能，包括語義搜索、引用追蹤和多語言支持。
                    </p>
                  </div>
                  
                  <VideoPlayer
                    title="Perplexity 搜索基礎"
                    duration="8:45"
                    isPlaying={isVideoPlaying}
                    onToggle={() => setIsVideoPlaying(!isVideoPlaying)}
                  />
                  
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                    <h5 className="font-semibold text-blue-400 mb-2">✨ 核心概念</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 語義搜索 vs 關鍵詞搜索</li>
                      <li>• 引用來源驗證</li>
                      <li>• 搜索結果優化</li>
                      <li>• 多語言查詢技巧</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中欄 - 實作練習 */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-orange-400" />
                  {isZhTW ? '🛠️ 實作' : '🛠️ Practice'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <InteractivePractice
                    title="即時搜索練習"
                    description="使用 Perplexity 進行實時搜索練習，學習如何構建有效的查詢。"
                    onStart={() => {}}
                  />
                  
                  <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                    <h5 className="font-semibold text-orange-400 mb-2">🎯 練習目標</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">搜索準確性</span>
                        <span className="text-orange-400">85%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">查詢優化</span>
                        <span className="text-orange-400">92%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">引用驗證</span>
                        <span className="text-orange-400">78%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      開始
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Settings className="w-4 h-4" />
                      設定
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右欄 - 筆記 */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5 text-green-400" />
                  {isZhTW ? '📝 筆記' : '📝 Notes'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NotesEditor
                  notes={personalNotes}
                  onNotesChange={setPersonalNotes}
                />
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* 討論區和學習統計 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* 討論區 */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                {isZhTW ? '💬 討論區' : '💬 Discussion'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          discussion.type === 'instructor' ? 'bg-blue-400' :
                          discussion.type === 'student' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></div>
                        <span className="font-medium text-white text-sm">
                          {discussion.author}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {discussion.type === 'instructor' ? '🧑‍💼 導師' : 
                           discussion.type === 'student' ? '👥 學員' : '💡 FAQ'}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">{discussion.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      {isZhTW ? discussion.contentZh : discussion.content}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <button className="hover:text-red-400">❤️ {discussion.likes}</button>
                      <button className="hover:text-blue-400">回覆</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 學習統計 */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                {isZhTW ? '📊 學習統計' : '📊 Learning Stats'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <StatsCard
                  title={isZhTW ? '本課時間' : 'Session Time'}
                  value={`${learningStats.timeSpent}分`}
                  icon={<Clock className="w-5 h-5" />}
                  color="from-blue-500/20 to-blue-600/20"
                />
                <StatsCard
                  title={isZhTW ? '完成率' : 'Completion'}
                  value={`${learningStats.completionRate}%`}
                  icon={<TrendingUp className="w-5 h-5" />}
                  color="from-green-500/20 to-green-600/20"
                />
                <StatsCard
                  title={isZhTW ? '正確率' : 'Accuracy'}
                  value={`${learningStats.accuracy}%`}
                  icon={<Target className="w-5 h-5" />}
                  color="from-orange-500/20 to-orange-600/20"
                />
                <StatsCard
                  title={isZhTW ? '連續天數' : 'Streak'}
                  value={`${learningStats.streak}天`}
                  icon={<Award className="w-5 h-5" />}
                  color="from-purple-500/20 to-purple-600/20"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 底部導航 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-between">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {isZhTW ? '上一課' : 'Previous'}
            </Button>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Pause className="w-4 h-4" />
                {isZhTW ? '暫停' : 'Pause'}
              </Button>
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4" />
                {isZhTW ? '完成' : 'Complete'}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                {isZhTW ? '分享' : 'Share'}
              </Button>
            </div>
            
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              {isZhTW ? '下一課' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerplexityToolsLesson; 