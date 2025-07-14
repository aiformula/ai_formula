import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  Play, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Clock, 
  Star, 
  Trophy, 
  Target,
  ArrowRight,
  Award,
  Calendar,
  Users,
  Video,
  Code,
  Zap,
  Lightbulb,
  TrendingUp,
  BarChart3,
  PlayCircle,
  BookMarked,
  Lock,
  Flame,
  MessageCircle,
  Heart,
  Eye,
  Sparkles,
  Globe,
  Gift,
  Crown,
  Gem,
  Coffee,
  Rocket,
  PenTool
} from 'lucide-react';
import { 
  promptEngineeringCourseData, 
  CourseLesson, 
  CourseModule, 
  sampleUserProgress, 
  sampleCommunityData,
  UserProgress,
  SkillLevel,
  Achievement as AchievementType,
  CommunityData 
} from '@/data/courseData/promptEngineeringComplete';

interface CourseDashboardPageProps {
  courseId: string;
}

const CourseDashboardPage: React.FC<CourseDashboardPageProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  // 確�?中�?顯示
  const isZhTW = language === 'zh-HK';
  
  // Debug: 輸出?��?語�?
  console.log('Current language:', language, 'isZhTW:', isZhTW);
  
  // 使用示�??��?，實?��??�中?��? API ?��??�管?�獲??  const courseData = promptEngineeringCourseData;
  const [userProgress] = useState<UserProgress>(sampleUserProgress);
  const [communityData] = useState<CommunityData>(sampleCommunityData);
  const [dailyFocusType, setDailyFocusType] = useState<'prompt' | 'tool' | 'fact'>('prompt');

  // 計�?總�??�度
  const calculateTotalProgress = (): number => {
    const totalLessons = courseData.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = userProgress.completedLessons.length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  // ?��?下�??�未完�?課�?
  const getNextLesson = (): CourseLesson | null => {
    for (const module of courseData.modules) {
      for (const lesson of module.lessons) {
        if (!userProgress.completedLessons.includes(lesson.id)) {
          return lesson;
        }
      }
    }
    return null;
  };

  // 檢查課�??�否�??
  const isLessonUnlocked = (lesson: CourseLesson): boolean => {
    const isCompleted = userProgress.completedLessons.includes(lesson.id);
    const nextLesson = getNextLesson();
    const isNext = nextLesson?.id === lesson.id;
    
    // 如�?已�??��??�是下�??�課程�??�解??    return isCompleted || isNext;
  };

  // 檢查?�個模塊是?��?任�?課�?�??
  const isModuleAccessible = (module: CourseModule): boolean => {
    return module.lessons.some(lesson => isLessonUnlocked(lesson));
  };

  // ?��?課�??�?��?�?  const getLessonStatusIcon = (lesson: CourseLesson) => {
    if (userProgress.completedLessons.includes(lesson.id)) {
      return <CheckCircle className="w-5 h-5 text-[#3EFFDC]" />;
    }
    
    const nextLesson = getNextLesson();
    if (nextLesson && nextLesson.id === lesson.id) {
      return <PlayCircle className="w-5 h-5 text-[#3EFFDC]" />;
    }
    
    return <Lock className="w-5 h-5 text-gray-500" />;
  };

  // ?��?課�?類�??��? - ?��?視頻類�??��???  const getLessonTypeIcon = (lesson: CourseLesson) => {
    if (!lesson.lessonType) {
      return <FileText className="w-4 h-4 text-[#E0E0E0]" />;
    }
    
    switch (lesson.lessonType) {
      case 'video':
        return <Video className="w-4 h-4 text-[#3EFFDC]" />;
      case 'interactive-text':
        return <BookOpen className="w-4 h-4 text-[#3EFFDC]" />;
      case 'quiz':
        return <Target className="w-4 h-4 text-[#8A3FFC]" />;
      default:
        return <FileText className="w-4 h-4 text-[#E0E0E0]" />;
    }
  };

  // ?��?繼�?學�??��?
  const handleContinueLearning = () => {
    if (userProgress.lastViewedLesson) {
      // 如�??��?次�??��?課�?，跳轉到課�?檢�???      navigate('/courses/lesson-viewer', {
        state: { lessonId: userProgress.lastViewedLesson }
      });
    } else {
      // ?��??��?第�?�?      const firstLesson = courseData.modules[0]?.lessons[0];
      if (firstLesson) {
        navigate('/courses/lesson-viewer', {
          state: { lessonId: firstLesson.id }
        });
      }
    }
  };

  // ?��?課�?點�?
  const handleLessonClick = (lesson: CourseLesson) => {
    // 檢查?�否已解??    if (isLessonUnlocked(lesson)) {
      // 跳�??�新?�課程檢視器
      navigate('/courses/lesson-viewer', { 
        state: { lessonId: lesson.id } 
      });
    } else {
      // 顯示?�要�??��??�課程�??�示
      alert(isZhTW ? '請�?完�??�面?�課程�?' : 'Please complete previous lessons first!');
    }
  };

  // ?��??��???  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // ?��??�就稀?�度顏色
  const getAchievementRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'rare': return 'bg-[#3EFFDC]/20 text-[#3EFFDC] border-[#3EFFDC]/30';
      case 'epic': return 'bg-[#8A3FFC]/20 text-[#8A3FFC] border-[#8A3FFC]/30';
      case 'legendary': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // ?��??��?每日?��??�容
  useEffect(() => {
    const focusTypes: ('prompt' | 'tool' | 'fact')[] = ['prompt', 'tool', 'fact'];
    const randomType = focusTypes[Math.floor(Math.random() * focusTypes.length)];
    setDailyFocusType(randomType);
  }, []);

  const totalProgress = calculateTotalProgress();
  const nextLesson = getNextLesson();

  // ?��?義卡?�樣�?  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(to right, #3EFFDC, #8A3FFC)',
    borderRadius: '8px',
  };

  // 子�?件�??�?�雷?��?
  const SkillRadarChart: React.FC<{ skills: SkillLevel[] }> = ({ skills }) => {
    const radarData = skills.map(skill => ({
      skill: isZhTW ? skill.skillZh : skill.skill,
      level: skill.level
    }));

    return (
      <div style={cardStyle} className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#3EFFDC]" />
            <span>{isZhTW ? '?�?�雷?��?' : 'Skill Radar'}</span>
          </h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#E0E0E0', fontSize: 12 }} />
              <PolarRadiusAxis 
                tick={{ fill: '#E0E0E0', fontSize: 10 }} 
                domain={[0, 100]} 
              />
              <Radar
                name="?�?��?�?
                dataKey="level"
                stroke="#3EFFDC"
                fill="rgba(62, 255, 220, 0.2)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-[#E0E0E0]">
            {isZhTW ? '你�? AI ?�?�發展�?�? : 'Your AI skill development'}
          </p>
        </div>
      </div>
    );
  };

  // 子�?件�?每日 AI ?��?
  const DailyAIFocus: React.FC = () => {
    const focusContent = {
      prompt: {
        title: isZhTW ? '今日?�戰' : 'Daily Challenge',
        content: isZhTW ? '試�??�呢??Prompt �?AI 寫�?首詩：「�??��?位浪漫詩人�?請寫一首�??��?天落?��?五�?絕句?? : 'Try this prompt to make AI write poetry: "As a romantic poet, write a 5-character quatrain about autumn leaves"',
        icon: <PenTool className="w-5 h-5 text-[#3EFFDC]" />
      },
      tool: {
        title: isZhTW ? '工具?�焦' : 'Tool Spotlight', 
        content: isZhTW ? '你試??Perplexity AI ?��?佢�??��?資�??��??�實?��?索�?對於?�究工�??�別?�用�? : 'Have you tried Perplexity AI? It excels at data integration and real-time search, especially useful for research!',
        icon: <Zap className="w-5 h-5 text-[#3EFFDC]" />
      },
      fact: {
        title: isZhTW ? 'AI �??' : 'AI Fun Fact',
        content: isZhTW ? '你知??GPT ??"T" 係咩?�思�?？�? "Transformer"！呢?�架構革?�性地?��??�自?��?言?��??? : 'Do you know what the "T" in GPT stands for? It\'s "Transformer"! This architecture revolutionized natural language processing.',
        icon: <Lightbulb className="w-5 h-5 text-[#3EFFDC]" />
      }
    };

    const currentFocus = focusContent[dailyFocusType];

    return (
      <div style={cardStyle} className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#8A3FFC]" />
            <span>{isZhTW ? '每日 AI ?��?' : 'Daily AI Focus'}</span>
          </h3>
        </div>
        <motion.div
          key={dailyFocusType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            {currentFocus.icon}
            <h4 className="font-semibold text-white">{currentFocus.title}</h4>
          </div>
          <p className="text-sm text-[#E0E0E0] leading-relaxed">
            {currentFocus.content}
          </p>
          <button 
            className="w-full py-2 px-4 bg-transparent border border-[#3EFFDC] text-[#3EFFDC] rounded-lg hover:bg-[#3EFFDC]/10 transition-colors flex items-center justify-center space-x-2"
            onClick={() => navigate('/courses/prompt-engineering-learning')}
          >
            <Rocket className="w-4 h-4" />
            <span>{isZhTW ? '立即試試' : 'Try It Now'}</span>
          </button>
        </motion.div>
      </div>
    );
  };

  // 子�?件�?社群?��?
  const CommunityHotspot: React.FC = () => (
    <div style={cardStyle} className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Users className="w-5 h-5 text-[#3EFFDC]" />
          <span>{isZhTW ? '社群?��?' : 'Community Hotspot'}</span>
          <div className="px-2 py-1 bg-[#3EFFDC]/20 border border-[#3EFFDC]/30 rounded-full text-xs text-[#3EFFDC]">
            {communityData.onlineUsers} {isZhTW ? '?��?' : 'online'}
          </div>
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-[#E0E0E0] mb-3 flex items-center space-x-1">
            <Flame className="w-4 h-4 text-[#3EFFDC]" />
            <span>{isZhTW ? '?�多人討�??��?�? : 'Most Discussed Topics'}</span>
          </h4>
          <div className="space-y-2">
            {communityData.hotTopics.map((topic) => (
              <div key={topic.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{isZhTW ? topic.titleZh : topic.title}</span>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3 text-[#E0E0E0]" />
                    <span className="text-xs text-[#E0E0E0]">{topic.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#E0E0E0] mb-3 flex items-center space-x-1">
            <Star className="w-4 h-4 text-[#3EFFDC]" />
            <span>{isZhTW ? '上�??��??�歡迎�?學�?作�?' : 'Popular Student Works'}</span>
          </h4>
          <div className="space-y-2">
            {communityData.popularWorks.map((work) => (
              <div key={work.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-white">{isZhTW ? work.titleZh : work.title}</span>
                    <p className="text-xs text-[#E0E0E0]">by {work.author}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-[#8A3FFC]" />
                    <span className="text-xs text-[#E0E0E0]">{work.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 子�?件�??��??�就
  const MyAchievements: React.FC = () => (
    <div style={cardStyle} className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-[#3EFFDC]" />
          <span>{isZhTW ? '?��??�就' : 'My Achievements'}</span>
        </h3>
      </div>
      <ScrollArea className="h-40">
        <div className="space-y-3">
          {userProgress.achievements.map((achievement) => (
            <motion.div 
              key={achievement.id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-white text-sm">
                    {isZhTW ? achievement.titleZh : achievement.title}
                  </h4>
                  <div className={`px-2 py-1 rounded-full text-xs border ${getAchievementRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </div>
                </div>
                <p className="text-xs text-[#E0E0E0]">
                  {isZhTW ? achievement.descriptionZh : achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-[#E0E0E0]">
      <Navigation />
      
      {/* 1. ?�面?�部：智?�總覽�? */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-[#0D0D1A] to-[#1A1A2E] border-b border-[#3EFFDC]/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#3EFFDC] to-[#8A3FFC] rounded-xl flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                {/* ?�人?�歡迎�? */}
                <h1 className="text-3xl font-bold text-white mb-2">
                  {isZhTW ? `歡�?返�?�?{userProgress.studentName}！` : `Welcome back, ${userProgress.studentName}!`}
                </h1>
                <p className="text-[#E0E0E0] text-lg mb-4">
                  {isZhTW ? courseData.titleZh : courseData.title}
                </p>
                
                {/* ?�能繼�?學�??��? */}
                <button
                  onClick={handleContinueLearning}
                  className="bg-[#8A3FFC] hover:bg-[#7A35EC] text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>
                    {userProgress.lastViewedLesson ? 
                      (isZhTW ? '繼�?學�?：核心�??��??�佳實�? : 'Continue Learning: Core Principles') :
                      (isZhTW ? '?�第一課�?�? : 'Start from First Lesson')
                    }
                  </span>
                </button>
              </div>
            </div>
            
            {/* 總進度 */}
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="w-5 h-5 text-[#3EFFDC]" />
                <span className="text-sm text-white">
                  {isZhTW ? '學�??�度' : 'Progress'}: {totalProgress}%
                </span>
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-[#3EFFDC] to-[#8A3FFC] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <div className="flex items-center space-x-4 text-sm text-[#E0E0E0]">
                <span>{formatTime(userProgress.totalTimeSpent)} {isZhTW ? '已學�? : 'studied'}</span>
                <span>{userProgress.dailyStreak} {isZhTW ? '天�??' : 'day streak'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 主�??�容?�??*/}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. 主�? (左側)：�??��?課�??��? */}
          <div className="lg:col-span-2">
            <div style={cardStyle} className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <BookMarked className="w-6 h-6 text-[#3EFFDC]" />
                  <span>{isZhTW ? '課�?模�?' : 'Course Modules'}</span>
                </h2>
              </div>
              <Accordion type="multiple" className="w-full" defaultValue={courseData.modules.map(module => module.id)}>
                {courseData.modules.map((module: CourseModule, moduleIndex: number) => {
                  const isModuleUnlocked = isModuleAccessible(module);
                  return (
                    <AccordionItem key={module.id} value={module.id} className="border-gray-600">
                      <AccordionTrigger 
                        className={`hover:no-underline text-[#E0E0E0] hover:text-white ${
                          !isModuleUnlocked ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!isModuleUnlocked}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                              isModuleUnlocked 
                                ? 'bg-gradient-to-r from-[#3EFFDC] to-[#8A3FFC]' 
                                : 'bg-gray-600'
                            }`}>
                              {!isModuleUnlocked && <Lock className="w-4 h-4" />}
                              {isModuleUnlocked && (moduleIndex + 1)}
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold ${isModuleUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                {isZhTW ? module.titleZh : module.title}
                              </h3>
                              <p className="text-sm text-[#E0E0E0]">
                                {isZhTW ? module.estimatedTimeZh : module.estimatedTime} ??{module.lessons.length} {isZhTW ? '�? : 'lessons'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-4 space-y-3">
                        {module.lessons.map((lesson: CourseLesson, lessonIndex: number) => {
                          const isUnlocked = isLessonUnlocked(lesson);
                          
                          return (
                            <motion.div
                              key={lesson.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: lessonIndex * 0.1 }}
                              className={`group cursor-pointer ${isUnlocked ? 'hover:bg-white/10' : 'cursor-not-allowed'}`}
                              onClick={() => handleLessonClick(lesson)}
                            >
                              <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                                isUnlocked ? 'bg-white/5' : 'bg-white/2'
                              }`}>
                                <div className="flex items-center space-x-3">
                                  {/* ?�?��?�?*/}
                                  {getLessonStatusIcon(lesson)}
                                  
                                  {/* 類�??��? */}
                                  {getLessonTypeIcon(lesson)}
                                  
                                  <div>
                                    <h4 className={`font-medium ${
                                      isUnlocked ? 'text-white group-hover:text-[#3EFFDC]' : 'text-gray-500'
                                    }`}>
                                      {isZhTW ? lesson.titleZh : lesson.title}
                                    </h4>
                                    <p className="text-sm text-[#E0E0E0]">
                                      {isZhTW ? lesson.durationZh : lesson.duration}
                                    </p>
                                  </div>
                                </div>
                                
                                {isUnlocked && (
                                  <ArrowRight className="w-4 h-4 text-[#E0E0E0] group-hover:text-[#3EFFDC]" />
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>

          {/* 3. 資�??��? (?�側)：個人?��?表板 */}
          <div className="space-y-6">
            {/* A. ?�?�雷?��? */}
            <SkillRadarChart skills={userProgress.skillCompetency} />
            
            {/* B. 每日 AI ?��? */}
            <DailyAIFocus />
            
            {/* C. 社群?��? */}
            <CommunityHotspot />
            
            {/* D. ?��??�就 */}
            <MyAchievements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboardPage; 
