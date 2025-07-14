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
  // Á¢∫‰?‰∏≠Ê?È°ØÁ§∫
  const isZhTW = language === 'zh-HK';
  
  // Debug: Ëº∏Âá∫?∂Â?Ë™ûË?
  console.log('Current language:', language, 'isZhTW:', isZhTW);
  
  // ‰ΩøÁî®Á§∫‰??∏Ê?ÔºåÂØ¶?õÊ??®‰∏≠?ÉÂ? API ?ñÁ??ãÁÆ°?ÜÁç≤??  const courseData = promptEngineeringCourseData;
  const [userProgress] = useState<UserProgress>(sampleUserProgress);
  const [communityData] = useState<CommunityData>(sampleCommunityData);
  const [dailyFocusType, setDailyFocusType] = useState<'prompt' | 'tool' | 'fact'>('prompt');

  // Ë®àÁ?Á∏ΩÈ??≤Â∫¶
  const calculateTotalProgress = (): number => {
    const totalLessons = courseData.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = userProgress.completedLessons.length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  // ?≤Â?‰∏ã‰??ãÊú™ÂÆåÊ?Ë™≤Á?
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

  // Ê™¢Êü•Ë™≤Á??ØÂê¶Ëß??
  const isLessonUnlocked = (lesson: CourseLesson): boolean => {
    const isCompleted = userProgress.completedLessons.includes(lesson.id);
    const nextLesson = getNextLesson();
    const isNext = nextLesson?.id === lesson.id;
    
    // Â¶ÇÊ?Â∑≤Â??êÊ??ÖÊòØ‰∏ã‰??ãË™≤Á®ãÔ??áËß£??    return isCompleted || isNext;
  };

  // Ê™¢Êü•?¥ÂÄãÊ®°Â°äÊòØ?¶Ê?‰ªª‰?Ë™≤Á?Ëß??
  const isModuleAccessible = (module: CourseModule): boolean => {
    return module.lessons.some(lesson => isLessonUnlocked(lesson));
  };

  // ?≤Â?Ë™≤Á??Ä?ãÂ?Ê®?  const getLessonStatusIcon = (lesson: CourseLesson) => {
    if (userProgress.completedLessons.includes(lesson.id)) {
      return <CheckCircle className="w-5 h-5 text-[#3EFFDC]" />;
    }
    
    const nextLesson = getNextLesson();
    if (nextLesson && nextLesson.id === lesson.id) {
      return <PlayCircle className="w-5 h-5 text-[#3EFFDC]" />;
    }
    
    return <Lock className="w-5 h-5 text-gray-500" />;
  };

  // ?≤Â?Ë™≤Á?È°ûÂ??ñÊ? - ?ïÁ?Ë¶ñÈ†ªÈ°ûÂ??¥Â???  const getLessonTypeIcon = (lesson: CourseLesson) => {
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

  // ?ïÁ?ÁπºÁ?Â≠∏Á??âÈ?
  const handleContinueLearning = () => {
    if (userProgress.lastViewedLesson) {
      // Â¶ÇÊ??â‰?Ê¨°Ë??ãÁ?Ë™≤Á?ÔºåË∑≥ËΩâÂà∞Ë™≤Á?Ê™¢Ë???      navigate('/courses/lesson-viewer', {
        state: { lessonId: userProgress.lastViewedLesson }
      });
    } else {
      // ?¶Â??ãÂ?Á¨¨‰?Ë™?      const firstLesson = courseData.modules[0]?.lessons[0];
      if (firstLesson) {
        navigate('/courses/lesson-viewer', {
          state: { lessonId: firstLesson.id }
        });
      }
    }
  };

  // ?ïÁ?Ë™≤Á?ÈªûÊ?
  const handleLessonClick = (lesson: CourseLesson) => {
    // Ê™¢Êü•?ØÂê¶Â∑≤Ëß£??    if (isLessonUnlocked(lesson)) {
      // Ë∑≥Ë??∞Êñ∞?ÑË™≤Á®ãÊ™¢Ë¶ñÂô®
      navigate('/courses/lesson-viewer', { 
        state: { lessonId: lesson.id } 
      });
    } else {
      // È°ØÁ§∫?ÄË¶ÅÂ??êÂ??¢Ë™≤Á®ãÁ??êÁ§∫
      alert(isZhTW ? 'Ë´ãÂ?ÂÆåÊ??çÈù¢?ÖË™≤Á®ãÔ?' : 'Please complete previous lessons first!');
    }
  };

  // ?ºÂ??ñÊ???  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // ?≤Â??êÂ∞±Á®Ä?âÂ∫¶È°èËâ≤
  const getAchievementRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'rare': return 'bg-[#3EFFDC]/20 text-[#3EFFDC] border-[#3EFFDC]/30';
      case 'epic': return 'bg-[#8A3FFC]/20 text-[#8A3FFC] border-[#8A3FFC]/30';
      case 'legendary': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // ?®Ê??áÊ?ÊØèÊó•?¶È??ßÂÆπ
  useEffect(() => {
    const focusTypes: ('prompt' | 'tool' | 'fact')[] = ['prompt', 'tool', 'fact'];
    const randomType = focusTypes[Math.floor(Math.random() * focusTypes.length)];
    setDailyFocusType(randomType);
  }, []);

  const totalProgress = calculateTotalProgress();
  const nextLesson = getNextLesson();

  // ?™Â?Áæ©Âç°?áÊ®£Âº?  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(to right, #3EFFDC, #8A3FFC)',
    borderRadius: '8px',
  };

  // Â≠êÁ?‰ª∂Ô??Ä?ΩÈõ∑?îÂ?
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
            <span>{isZhTW ? '?Ä?ΩÈõ∑?îÂ?' : 'Skill Radar'}</span>
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
                name="?Ä?ΩÁ?Á¥?
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
            {isZhTW ? '‰Ω†Â? AI ?Ä?ΩÁôºÂ±ïÊ?Ê≥? : 'Your AI skill development'}
          </p>
        </div>
      </div>
    );
  };

  // Â≠êÁ?‰ª∂Ô?ÊØèÊó• AI ?¶È?
  const DailyAIFocus: React.FC = () => {
    const focusContent = {
      prompt: {
        title: isZhTW ? '‰ªäÊó•?ëÊà∞' : 'Daily Challenge',
        content: isZhTW ? 'Ë©¶‰??®Âë¢??Prompt ‰ª?AI ÂØ´‰?È¶ñË©©Ôºö„Äå‰??∫‰?‰ΩçÊµ™Êº´Ë©©‰∫∫Ô?Ë´ãÂØ´‰∏ÄÈ¶ñÈ??ºÁ?Â§©ËêΩ?âÂ?‰∫îË?ÁµïÂè•?? : 'Try this prompt to make AI write poetry: "As a romantic poet, write a 5-character quatrain about autumn leaves"',
        icon: <PenTool className="w-5 h-5 text-[#3EFFDC]" />
      },
      tool: {
        title: isZhTW ? 'Â∑•ÂÖ∑?öÁÑ¶' : 'Tool Spotlight', 
        content: isZhTW ? '‰Ω†Ë©¶??Perplexity AI ?™Ô?‰Ω¢Ê??∑Â?Ë≥áÊ??¥Â??åÂØ¶?ÇÊ?Á¥¢Ô?Â∞çÊñº?îÁ©∂Â∑•‰??πÂà•?âÁî®Ôº? : 'Have you tried Perplexity AI? It excels at data integration and real-time search, especially useful for research!',
        icon: <Zap className="w-5 h-5 text-[#3EFFDC]" />
      },
      fact: {
        title: isZhTW ? 'AI Ë∂??' : 'AI Fun Fact',
        content: isZhTW ? '‰Ω†Áü•??GPT ??"T" ‰øÇÂí©?èÊÄùÂ?Ôºü‰? "Transformer"ÔºÅÂë¢?ãÊû∂ÊßãÈù©?ΩÊÄßÂú∞?πË??óËá™?∂Ë?Ë®Ä?ïÁ??? : 'Do you know what the "T" in GPT stands for? It\'s "Transformer"! This architecture revolutionized natural language processing.',
        icon: <Lightbulb className="w-5 h-5 text-[#3EFFDC]" />
      }
    };

    const currentFocus = focusContent[dailyFocusType];

    return (
      <div style={cardStyle} className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#8A3FFC]" />
            <span>{isZhTW ? 'ÊØèÊó• AI ?¶È?' : 'Daily AI Focus'}</span>
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
            <span>{isZhTW ? 'Á´ãÂç≥Ë©¶Ë©¶' : 'Try It Now'}</span>
          </button>
        </motion.div>
      </div>
    );
  };

  // Â≠êÁ?‰ª∂Ô?Á§æÁæ§?±È?
  const CommunityHotspot: React.FC = () => (
    <div style={cardStyle} className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Users className="w-5 h-5 text-[#3EFFDC]" />
          <span>{isZhTW ? 'Á§æÁæ§?±È?' : 'Community Hotspot'}</span>
          <div className="px-2 py-1 bg-[#3EFFDC]/20 border border-[#3EFFDC]/30 rounded-full text-xs text-[#3EFFDC]">
            {communityData.onlineUsers} {isZhTW ? '?®Á?' : 'online'}
          </div>
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-[#E0E0E0] mb-3 flex items-center space-x-1">
            <Flame className="w-4 h-4 text-[#3EFFDC]" />
            <span>{isZhTW ? '?ÄÂ§ö‰∫∫Ë®éË??ÖÂ?È°? : 'Most Discussed Topics'}</span>
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
            <span>{isZhTW ? '‰∏äÊ??üÊ??óÊ≠°ËøéÂ?Â≠∏Á?‰ΩúÂ?' : 'Popular Student Works'}</span>
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

  // Â≠êÁ?‰ª∂Ô??ëÂ??êÂ∞±
  const MyAchievements: React.FC = () => (
    <div style={cardStyle} className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-[#3EFFDC]" />
          <span>{isZhTW ? '?ëÂ??êÂ∞±' : 'My Achievements'}</span>
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
      
      {/* 1. ?ÅÈù¢?ÇÈÉ®ÔºöÊô∫?ΩÁ∏ΩË¶ΩÂ? */}
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
                {/* ?ã‰∫∫?ñÊ≠°ËøéË? */}
                <h1 className="text-3xl font-bold text-white mb-2">
                  {isZhTW ? `Ê≠°Ë?ËøîÂ?Ôº?{userProgress.studentName}ÔºÅ` : `Welcome back, ${userProgress.studentName}!`}
                </h1>
                <p className="text-[#E0E0E0] text-lg mb-4">
                  {isZhTW ? courseData.titleZh : courseData.title}
                </p>
                
                {/* ?∫ËÉΩÁπºÁ?Â≠∏Á??âÈ? */}
                <button
                  onClick={handleContinueLearning}
                  className="bg-[#8A3FFC] hover:bg-[#7A35EC] text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>
                    {userProgress.lastViewedLesson ? 
                      (isZhTW ? 'ÁπºÁ?Â≠∏Á?ÔºöÊ†∏ÂøÉÂ??áÂ??Ä‰Ω≥ÂØ¶Ë∏? : 'Continue Learning: Core Principles') :
                      (isZhTW ? '?±Á¨¨‰∏ÄË™≤È?Âß? : 'Start from First Lesson')
                    }
                  </span>
                </button>
              </div>
            </div>
            
            {/* Á∏ΩÈÄ≤Â∫¶ */}
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="w-5 h-5 text-[#3EFFDC]" />
                <span className="text-sm text-white">
                  {isZhTW ? 'Â≠∏Á??≤Â∫¶' : 'Progress'}: {totalProgress}%
                </span>
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-[#3EFFDC] to-[#8A3FFC] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <div className="flex items-center space-x-4 text-sm text-[#E0E0E0]">
                <span>{formatTime(userProgress.totalTimeSpent)} {isZhTW ? 'Â∑≤Â≠∏Áø? : 'studied'}</span>
                <span>{userProgress.dailyStreak} {isZhTW ? 'Â§©ÈÄ??' : 'day streak'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ‰∏ªË??ßÂÆπ?Ä??*/}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. ‰∏ªÊ? (Â∑¶ÂÅ¥)Ôºö‰??ïÂ?Ë™≤Á??ÆÈ? */}
          <div className="lg:col-span-2">
            <div style={cardStyle} className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <BookMarked className="w-6 h-6 text-[#3EFFDC]" />
                  <span>{isZhTW ? 'Ë™≤Á?Ê®°Â?' : 'Course Modules'}</span>
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
                                {isZhTW ? module.estimatedTimeZh : module.estimatedTime} ??{module.lessons.length} {isZhTW ? 'Ë™? : 'lessons'}
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
                                  {/* ?Ä?ãÂ?Ê®?*/}
                                  {getLessonStatusIcon(lesson)}
                                  
                                  {/* È°ûÂ??ñÊ? */}
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

          {/* 3. Ë≥áË??äÊ? (?≥ÂÅ¥)ÔºöÂÄã‰∫∫?ñÂ?Ë°®Êùø */}
          <div className="space-y-6">
            {/* A. ?Ä?ΩÈõ∑?îÂ? */}
            <SkillRadarChart skills={userProgress.skillCompetency} />
            
            {/* B. ÊØèÊó• AI ?¶È? */}
            <DailyAIFocus />
            
            {/* C. Á§æÁæ§?±È? */}
            <CommunityHotspot />
            
            {/* D. ?ëÂ??êÂ∞± */}
            <MyAchievements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboardPage; 
