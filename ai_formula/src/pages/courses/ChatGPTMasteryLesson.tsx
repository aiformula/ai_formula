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

// 模�??��?結�?
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

// 實�?練�?組件
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
          <p className="text-sm text-gray-400 mb-1">範�?:</p>
          <p className="text-green-400 text-sm">{example}</p>
        </div>
        <Button 
          onClick={onStart} 
          disabled={status === 'locked'}
          className="w-full"
          variant={status === 'current' ? 'default' : 'outline'}
        >
          {status === 'completed' ? '已�??? : status === 'current' ? '?��?練�?' : '尚未�??'}
        </Button>
      </CardContent>
    </Card>
  );
};

// 課�??��?
const courseModules: Module[] = [
  {
    id: 'basics',
    title: 'Basics',
    titleZh: '?��?',
    icon: <Brain className="w-6 h-6" />,
    description: 'Master the fundamentals of ChatGPT prompting',
    descriptionZh: '?�握 ChatGPT ?�示?�基?��???,
    difficulty: 'beginner',
    duration: '20 mins',
    durationZh: '20?��?',
    status: 'completed',
    color: 'bg-green-500',
    lessons: [
      {
        id: 'what-is-chatgpt',
        title: 'What is ChatGPT?',
        titleZh: '什麼是 ChatGPT�?,
        type: 'theory',
        duration: '5 mins',
        durationZh: '5?��?',
        status: 'completed',
        content: (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">什麼是 ChatGPT�?/h3>
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
              <p className="text-gray-300 mb-4">
                ChatGPT ?�由 OpenAI ?�發?�人工智?��?天�??�人，使?�大?��?言模�? (LLM) ?�術�?
                ?��??�解?��??�人類�?言，進�??�然對話??
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">???��??��?</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>???�然語�??�解</li>
                    <li>???��??�容?��?</li>
                    <li>???��?�??</li>
                    <li>??�?��編寫</li>
                    <li>??翻譯?�總�?/li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">?�� ?�用?�景</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>??學�??��?</li>
                    <li>???��?寫�?</li>
                    <li>??工�?輔助</li>
                    <li>??程�??�發</li>
                    <li>??語�?學�?</li>
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
    titleZh: '?��?',
    icon: <Lightbulb className="w-6 h-6" />,
    description: 'Advanced prompting techniques and strategies',
    descriptionZh: '?��??�示?�巧�?策略',
    difficulty: 'intermediate',
    duration: '30 mins',
    durationZh: '30?��?',
    status: 'current',
    color: 'bg-blue-500',
    lessons: []
  },
  {
    id: 'practice',
    title: 'Practice',
    titleZh: '實�?',
    icon: <Wrench className="w-6 h-6" />,
    description: 'Hands-on exercises and real-world applications',
    descriptionZh: '實戰練�??��?實�???,
    difficulty: 'intermediate',
    duration: '45 mins',
    durationZh: '45?��?',
    status: 'locked',
    color: 'bg-orange-500',
    lessons: []
  },
  {
    id: 'creative',
    title: 'Creative',
    titleZh: '?��?',
    icon: <Palette className="w-6 h-6" />,
    description: 'Creative prompting for content generation',
    descriptionZh: '?��??�示?�巧�???,
    difficulty: 'advanced',
    duration: '25 mins',
    durationZh: '25?��?',
    status: 'locked',
    color: 'bg-purple-500',
    lessons: []
  },
  {
    id: 'quiz',
    title: 'Quiz',
    titleZh: '測�?',
    icon: <FileText className="w-6 h-6" />,
    description: 'Test your knowledge and skills',
    descriptionZh: '測試?��??��??��???,
    difficulty: 'advanced',
    duration: '15 mins',
    durationZh: '15?��?',
    status: 'locked',
    color: 'bg-red-500',
    lessons: []
  }
];

const ChatGPTMasteryLesson: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
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
        {/* 課�?標�??�進度 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {isZhTW ? '?�� ChatGPT ?�示精�? : '?�� ChatGPT Prompt Mastery'}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {isZhTW ? '?�握 AI 對話?��?' : 'Master the Art of AI Conversation'}
            </p>
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">3/8</div>
                <div className="text-sm text-gray-400">{isZhTW ? '已�??? : 'Completed'}</div>
              </div>
              <div className="w-64">
                <Progress value={currentProgress} className="h-3" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{currentProgress}%</div>
                <div className="text-sm text-gray-400">{isZhTW ? '?�度' : 'Progress'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 模�??��??��? */}
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

        {/* ?��?學�?模�??�容 */}
        {currentModule && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isZhTW ? '?��?學�?模�?' : 'Current Learning Module'}
              </h2>
              <p className="text-gray-400">
                {isZhTW ? currentModule.descriptionZh : currentModule.description}
              </p>
            </div>

            {/* 課�??�容 */}
            {currentLesson && (
              <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
                {currentLesson.content}
              </div>
            )}

            {/* 實�?練�??�??*/}
            {activeModule === 'practice' && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {isZhTW ? '?�� 實�?練�?' : '?�� Practice Exercises'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <PracticeCard
                    title="?��?對話練�?"
                    description="練�??�本??ChatGPT 對話?��?
                    example="請幫?��??��??�週末?�健康飲食�???
                    status="completed"
                    onStart={() => {}}
                  />
                  <PracticeCard
                    title="?��?寫�?練�?"
                    description="使用 ChatGPT ?��??��??�容?��?"
                    example="寫�??��??��??��?行�??��??��?"
                    status="current"
                    onStart={() => {}}
                  />
                  <PracticeCard
                    title="?��?�?��練�?"
                    description="?�用 ChatGPT �?��複�??��?"
                    example="?��??��?網�?轉�??��??�可?��???
                    status="locked"
                    onStart={() => {}}
                  />
                </div>
              </div>
            )}

            {/* 導航?��? */}
            <div className="flex items-center justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {isZhTW ? '上�?模�?' : 'Previous Module'}
              </Button>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {isZhTW ? '筆�?' : 'Notes'}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {isZhTW ? '討�?' : 'Discussion'}
                </Button>
              </div>
              
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                {isZhTW ? '下�?模�?' : 'Next Module'}
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