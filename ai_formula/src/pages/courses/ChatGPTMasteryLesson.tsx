import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Target, 
  Wrench, 
  Palette, 
  FileText,
  CheckCircle,
  Lock,
  Timer,
  BookOpen,
  MessageSquare,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';

// 模組數據結構
interface Module {
  id: string;
  title: string;
  titleZh: string;
  icon: JSX.Element;
  description: string;
  descriptionZh: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  durationZh: string;
  status: 'completed' | 'current' | 'locked';
  lessons: Lesson[];
  color: string;
}

interface Lesson {
  id: string;
  title: string;
  titleZh: string;
  type: 'theory' | 'practice' | 'example' | 'quiz';
  duration: string;
  durationZh: string;
  content: JSX.Element;
  status: 'completed' | 'current' | 'locked';
}

// 實作練習組件
const PracticeCard: React.FC<{
  title: string;
  description: string;
  example: string;
  status: 'completed' | 'current' | 'locked';
  onStart: () => void;
}> = ({ title, description, example, status, onStart }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'current': return <Play className="w-5 h-5 text-blue-400" />;
      case 'locked': return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'border-green-500/50 bg-green-900/20';
      case 'current': return 'border-blue-500/50 bg-blue-900/20';
      case 'locked': return 'border-gray-500/50 bg-gray-900/20';
    }
  };

  return (
    <Card className={`${getStatusColor()} transition-all duration-300 hover:scale-105`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">{title}</CardTitle>
          {getStatusIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-3">{description}</p>
        <div className="bg-gray-800/50 p-3 rounded-lg mb-3">
          <p className="text-sm text-gray-400 mb-1">範例:</p>
          <p className="text-green-400 text-sm">{example}</p>
        </div>
        <Button 
          onClick={onStart} 
          disabled={status === 'locked'}
          className="w-full"
          variant={status === 'current' ? 'default' : 'outline'}
        >
          {status === 'completed' ? '已完成' : status === 'current' ? '開始練習' : '尚未解鎖'}
        </Button>
      </CardContent>
    </Card>
  );
};

// 課程數據
const courseModules: Module[] = [
  {
    id: 'basics',
    title: 'Basics',
    titleZh: '基礎',
    icon: <Brain className="w-6 h-6" />,
    description: 'Master the fundamentals of ChatGPT prompting',
    descriptionZh: '掌握 ChatGPT 提示的基本原理',
    difficulty: 'beginner',
    duration: '20 mins',
    durationZh: '20分鐘',
    status: 'completed',
    color: 'bg-green-500',
    lessons: [
      {
        id: 'what-is-chatgpt',
        title: 'What is ChatGPT?',
        titleZh: '什麼是 ChatGPT？',
        type: 'theory',
        duration: '5 mins',
        durationZh: '5分鐘',
        status: 'completed',
        content: (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">什麼是 ChatGPT？</h3>
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
              <p className="text-gray-300 mb-4">
                ChatGPT 是由 OpenAI 開發的人工智能聊天機器人，使用大型語言模型 (LLM) 技術，
                能夠理解和生成人類語言，進行自然對話。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">✨ 核心能力</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 自然語言理解</li>
                    <li>• 創意內容生成</li>
                    <li>• 問題解答</li>
                    <li>• 代碼編寫</li>
                    <li>• 翻譯與總結</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">🎯 應用場景</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 學習助手</li>
                    <li>• 創意寫作</li>
                    <li>• 工作輔助</li>
                    <li>• 程式開發</li>
                    <li>• 語言學習</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced',
    titleZh: '進階',
    icon: <Lightbulb className="w-6 h-6" />,
    description: 'Advanced prompting techniques and strategies',
    descriptionZh: '進階提示技巧與策略',
    difficulty: 'intermediate',
    duration: '30 mins',
    durationZh: '30分鐘',
    status: 'current',
    color: 'bg-blue-500',
    lessons: []
  },
  {
    id: 'practice',
    title: 'Practice',
    titleZh: '實作',
    icon: <Wrench className="w-6 h-6" />,
    description: 'Hands-on exercises and real-world applications',
    descriptionZh: '實戰練習與真實應用',
    difficulty: 'intermediate',
    duration: '45 mins',
    durationZh: '45分鐘',
    status: 'locked',
    color: 'bg-orange-500',
    lessons: []
  },
  {
    id: 'creative',
    title: 'Creative',
    titleZh: '創意',
    icon: <Palette className="w-6 h-6" />,
    description: 'Creative prompting for content generation',
    descriptionZh: '創意提示技巧應用',
    difficulty: 'advanced',
    duration: '25 mins',
    durationZh: '25分鐘',
    status: 'locked',
    color: 'bg-purple-500',
    lessons: []
  },
  {
    id: 'quiz',
    title: 'Quiz',
    titleZh: '測驗',
    icon: <FileText className="w-6 h-6" />,
    description: 'Test your knowledge and skills',
    descriptionZh: '測試您的知識與技能',
    difficulty: 'advanced',
    duration: '15 mins',
    durationZh: '15分鐘',
    status: 'locked',
    color: 'bg-red-500',
    lessons: []
  }
];

const ChatGPTMasteryLesson: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-TW';
  
  const [activeModule, setActiveModule] = useState<string>('basics');
  const [activeLesson, setActiveLesson] = useState<string>('what-is-chatgpt');
  const [completedModules, setCompletedModules] = useState<string[]>(['basics']);
  const [currentProgress, setCurrentProgress] = useState(25);

  const currentModule = useMemo(() => 
    courseModules.find(m => m.id === activeModule), 
    [activeModule]
  );

  const currentLesson = useMemo(() => 
    currentModule?.lessons.find(l => l.id === activeLesson), 
    [currentModule, activeLesson]
  );

  const handleModuleSelect = useCallback((moduleId: string) => {
    const module = courseModules.find(m => m.id === moduleId);
    if (module && module.status !== 'locked') {
      setActiveModule(moduleId);
      if (module.lessons.length > 0) {
        setActiveLesson(module.lessons[0].id);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* 課程標題和進度 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {isZhTW ? '🎯 ChatGPT 提示精通' : '🎯 ChatGPT Prompt Mastery'}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {isZhTW ? '掌握 AI 對話藝術' : 'Master the Art of AI Conversation'}
            </p>
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">3/8</div>
                <div className="text-sm text-gray-400">{isZhTW ? '已完成' : 'Completed'}</div>
              </div>
              <div className="w-64">
                <Progress value={currentProgress} className="h-3" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{currentProgress}%</div>
                <div className="text-sm text-gray-400">{isZhTW ? '進度' : 'Progress'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 模組選擇卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {courseModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`
                  relative cursor-pointer rounded-xl p-6 border-2 transition-all duration-300
                  ${activeModule === module.id 
                    ? 'border-blue-500 bg-blue-900/30' 
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                  }
                  ${module.status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={() => handleModuleSelect(module.id)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-full ${module.color} bg-opacity-20`}>
                    {module.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-white">
                    {isZhTW ? module.titleZh : module.title}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {isZhTW ? module.durationZh : module.duration}
                  </Badge>
                  <div className="absolute top-2 right-2">
                    {module.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {module.status === 'current' && <Timer className="w-5 h-5 text-blue-400" />}
                    {module.status === 'locked' && <Lock className="w-5 h-5 text-gray-400" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 當前學習模組內容 */}
        {currentModule && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isZhTW ? '當前學習模組' : 'Current Learning Module'}
              </h2>
              <p className="text-gray-400">
                {isZhTW ? currentModule.descriptionZh : currentModule.description}
              </p>
            </div>

            {/* 課程內容 */}
            {currentLesson && (
              <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
                {currentLesson.content}
              </div>
            )}

            {/* 實作練習區域 */}
            {activeModule === 'practice' && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {isZhTW ? '🎯 實作練習' : '🎯 Practice Exercises'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <PracticeCard
                    title="基礎對話練習"
                    description="練習基本的 ChatGPT 對話技巧"
                    example="請幫我規劃一個週末的健康飲食計劃"
                    status="completed"
                    onStart={() => {}}
                  />
                  <PracticeCard
                    title="創意寫作練習"
                    description="使用 ChatGPT 進行創意內容生成"
                    example="寫一個關於時間旅行的短篇故事"
                    status="current"
                    onStart={() => {}}
                  />
                  <PracticeCard
                    title="問題解決練習"
                    description="利用 ChatGPT 解決複雜問題"
                    example="分析電商網站轉換率低的可能原因"
                    status="locked"
                    onStart={() => {}}
                  />
                </div>
              </div>
            )}

            {/* 導航按鈕 */}
            <div className="flex items-center justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {isZhTW ? '上一模組' : 'Previous Module'}
              </Button>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {isZhTW ? '筆記' : 'Notes'}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {isZhTW ? '討論' : 'Discussion'}
                </Button>
              </div>
              
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                {isZhTW ? '下一模組' : 'Next Module'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatGPTMasteryLesson; 