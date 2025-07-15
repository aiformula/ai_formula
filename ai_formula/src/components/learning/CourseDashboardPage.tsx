import React, { useState, useEffect } from 'react' } from 'react-router-dom', AnimatePresence } from 'framer-motion'
} from 'recharts' } from '@/contexts/LanguageContext'
import Navigation from '@/components/Navigation', CardContent, CardHeader, CardTitle } from '@/components/ui/card' } from '@/components/ui/button' } from '@/components/ui/badge' } from '@/components/ui/progress', AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion' } from '@/components/ui/scroll-area',
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
} from 'lucide-react'
} from '@/data/courseData/promptEngineeringComplete'
}

const CourseDashboardPage: React.FC<CourseDashboardPageProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  // 確�
  const isZhTW = language === 'zh-HK'
  
  // Debug: 輸出
  console.log('Current language:', language, 'isZhTW:', setDailyFocusType] = useState<'prompt' | 'tool' | 'fact'>('prompt'
  };

  // 
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

  // 檢查課�
  const isLessonUnlocked = (lesson: CourseLesson): boolean => {
    const isCompleted = userProgress.completedLessons.includes(lesson.id);
    const nextLesson = getNextLesson();
    const isNext = nextLesson === lesson.id;
    
    // 如�    return isCompleted || isNext;
  };

  // 檢查
  const isModuleAccessible = (module: CourseModule): boolean => {
    return module.lessons.some(lesson => isLessonUnlocked(lesson));
  };

  //   const getLessonStatusIcon = (lesson: CourseLesson) => {
    if (userProgress.completedLessons.includes(lesson.id)) {
      return <CheckCircle className="]"
    }
    
    const nextLesson = getNextLesson();
    if (nextLesson && nextLesson.id === lesson.id) {
      return <PlayCircle className="]"
    }
    
    return <Lock className="w-5 h-5 text-gray-500"
  };

  //  -   const getLessonTypeIcon = (lesson: CourseLesson) => {
    if (!lesson.lessonType) {
      return <FileText className="]"
    }
    
    switch (lesson.lessonType) {
      case 'video'
        return <Video className="]"
      case 'interactive-text'
        return <BookOpen className="]"
      case 'quiz'
        return <Target className="]"
      default:
        return <FileText className="]"
    }
  };

  // 處理繼續學習功能
  const handleContinueLearning = () => {
    if (userProgress.lastViewedLesson) {
      // 如果有上次觀看的課程，跳轉到課程檢視器
      navigate('/courses/lesson-viewer'
      });
    } else {
      //       const firstLesson = courseData.modules[0]
      if (firstLesson) {
        navigate('/courses/lesson-viewer'
        });
      }
    }
  };

  // 
  const handleLessonClick = (lesson: CourseLesson) => {
    // 檢查    if (isLessonUnlocked(lesson)) {
      // 跳�
      navigate('/courses/lesson-viewer'
      });
    } else {
      // 顯示
      alert(isZhTW ? '請�' : 'Please complete previous lessons first!'
    }
  };

  //   const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // 
  const getAchievementRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      case 'rare': return ']/20 text-[#3EFFDC] border-[#3EFFDC]/30'
      case 'epic': return ']/20 text-[#8A3FFC] border-[#8A3FFC]/30'
      case 'legendary': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  };

  // 
  useEffect(() => {
    const focusTypes: ('prompt' | 'tool' | 'fact')[] = ['prompt', 'tool', 'fact'
  }, []);

  const totalProgress = calculateTotalProgress();
  const nextLesson = getNextLesson();

  //   const cardStyle = {
    backgroundColor: ', 255, 255, 0.05)'
    border: '1px solid'
    borderImageSource: ', #3EFFDC, #8A3FFC)'
    borderRadius: '8px'
  };

  // 子�
  const SkillRadarChart: React.FC<{ skills: SkillLevel[] }> = ({ skills }) => {
    const radarData = skills.map(skill => ({
      skill: isZhTW ? "skill.skillZh"
    }));

    return (
      <div style={cardStyle} className="p-6"
        <div className="mb-6"
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2"
            <BarChart3 className="]"
            <span>{isZhTW ? "" : 'Skill Radar'
          </h3>
        </div>
        <div className="h-64"
          <ResponsiveContainer width="100%" height="100%"
              <PolarGrid stroke=", 255, 255, 0.1)"
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#E0E0E0'
              <PolarRadiusAxis 
                tick={{ fill: '#E0E0E0'
              />
              <Radar
                name=""
                dataKey="level"
                stroke="#3EFFDC"
                fill=", 255, 220, 0.2)"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center"
          <p className="]"
            {isZhTW ? '你�? AI  : 'Your AI skill development'
    );
  };

  // 子� AI 
  const DailyAIFocus: React.FC = () => {
    const focusContent = {
      prompt: {
        title: isZhTW ? '今日' : 'Daily Challenge'
        content: isZhTW ? '試� � 寫� : 'Try this prompt to make AI write poetry: ", write a 5-character quatrain about autumn leaves"'
        icon: <PenTool className="]"
      },
      tool: {
        title: isZhTW ? '工具' : 'Tool Spotlight'
        content: isZhTW ? '你試 AI  : ', especially useful for research!'
        icon: <Zap className="]"
      },
      fact: {
        title: isZhTW ? 'AI �' : 'AI Fun Fact'
        content: isZhTW ? '你知 "T" 係咩 "Transformer"！呢 : 'Do you know what the "T" in GPT stands for? It\'s "Transformer"! This architecture revolutionized natural language processing.'
        icon: <Lightbulb className="]"
      }
    };

    const currentFocus = focusContent[dailyFocusType];

    return (
      <div style={cardStyle} className="p-6"
        <div className="mb-6"
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2"
            <Sparkles className="]"
            <span>{isZhTW ? '每日 AI ' : 'Daily AI Focus'
          className="space-y-4"
        >
          <div className="flex items-center space-x-2"
            <h4 className="font-semibold text-white"
          </div>
          <p className="] leading-relaxed"
          </p>
          <button 
            className="] text-[#3EFFDC] rounded-lg hover:bg-[#3EFFDC]/10 transition-colors flex items-center justify-center space-x-2") => navigate('/courses/prompt-engineering-learning'
          >
            <Rocket className="w-4 h-4"
            <span>{isZhTW ? '立即試試' : 'Try It Now'
    );
  };

  // 子�
  const CommunityHotspot: React.FC = () => (
    <div style={cardStyle} className="p-6"
      <div className="mb-6"
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2"
          <Users className="]"
          <span>{isZhTW ? '社群' : 'Community Hotspot'
          <div className="]/20 border border-[#3EFFDC]/30 rounded-full text-xs text-[#3EFFDC]"} {isZhTW ? "" : 'online'
          </div>
        </h3>
      </div>
      <div className="space-y-4"
        <div>
          <h4 className="] mb-3 flex items-center space-x-1"
            <Flame className="]"
            <span>{isZhTW ? ' : 'Most Discussed Topics'
          </h4>
          <div className="space-y-2"} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                <div className="flex items-center justify-between"
                  <span className="text-sm text-white"
                  <div className="flex items-center space-x-1"
                    <MessageCircle className="]"
                    <span className="]"
            ))}
          </div>
        </div>

        <div>
          <h4 className="] mb-3 flex items-center space-x-1"
            <Star className="]"
            <span>{isZhTW ? '上�' : 'Popular Student Works'
          </h4>
          <div className="space-y-2"} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                <div className="flex items-center justify-between"
                  <div>
                    <span className="text-sm text-white"
                    <p className="]"
                  </div>
                  <div className="flex items-center space-x-1"
                    <Heart className="]"
                    <span className="]"
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 子�
  const MyAchievements: React.FC = () => (
    <div style={cardStyle} className="p-6"
      <div className="mb-6"
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2"
          <Trophy className="]"
          <span>{isZhTW ? "" : 'My Achievements'
        </h3>
      </div>
      <ScrollArea className="h-40"
        <div className="space-y-3"
              className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
            >
              <div className="text-2xl"
              <div className="flex-1"
                <div className="flex items-center space-x-2 mb-1"
                  <h4 className="font-medium text-white text-sm"
                    {isZhTW ? "achievement.titleZh"
                  </div>
                </div>
                <p className="]"
                  {isZhTW ? "achievement.descriptionZh"
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="] text-[#E0E0E0]"
      <div className="] to-[#1A1A2E] border-b border-[#3EFFDC]/20"
        <div className="container mx-auto px-4"
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-6"
              <div className="] to-[#8A3FFC] rounded-xl flex items-center justify-center"
                <Brain className="w-10 h-10 text-white"
                <h1 className="text-3xl font-bold text-white mb-2"
                  {isZhTW ? "}！`"
                </h1>
                <p className="] text-lg mb-4"
                  {isZhTW ? "courseData.titleZh"
                  className="] hover:bg-[#7A35EC] text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <PlayCircle className="w-5 h-5"
                  <span>
                    {userProgress.lastViewedLesson ? 
                      (isZhTW ? '繼� : 'Continue Learning: Core Principles'
                      (isZhTW ? ' : 'Start from First Lesson'
                    }
                  </span>
                </button>
              </div>
            </div>
            
            {/* 總進度 */}
            <div className="text-right"
              <div className="flex items-center space-x-2 mb-2"
                <Trophy className="]"
                <span className="text-sm text-white"
                  {isZhTW ? '學�' : 'Progress'
                </span>
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-2 mb-2"
                <div 
                  className="] to-[#8A3FFC] h-2 rounded-full transition-all duration-300"
                />
              </div>
              <div className="]")} {isZhTW ? '已學�? : 'studied'} {isZhTW ? '天�' : 'day streak'
      <div className="container mx-auto px-4 py-8"
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          <div className="lg:col-span-2"} className="p-6"
              <div className="mb-6"
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2"
                  <BookMarked className="]"
                  <span>{isZhTW ? '課�' : 'Course Modules'
                </h2>
              </div>
              <Accordion type="multiple" className="w-full"} value={module.id} className="border-gray-600"
                          !isModuleUnlocked ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!isModuleUnlocked}
                      >
                        <div className="flex items-center justify-between w-full"
                          <div className="flex items-center space-x-3"
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                              isModuleUnlocked 
                                ? '] to-[#8A3FFC]'
                                : 'bg-gray-600'
                            }`}>
                              {!isModuleUnlocked && <Lock className="w-4 h-4"
                            </div>
                            <div className="text-left"
                              <h3 className={`font-semibold ${isModuleUnlocked ? 'text-white' : 'text-gray-500'
                                {isZhTW ? "module.titleZh"
                              </h3>
                              <p className="]"
                                {isZhTW ? "module.estimatedTimeZh"} } {isZhTW ? '�? : 'lessons'
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-4 space-y-3"
                              className={`group cursor-pointer ${isUnlocked ? 'hover:bg-white/10' : 'cursor-not-allowed'
                            >
                              <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                                isUnlocked ? 'bg-white/5' : 'bg-white/2'
                              }`}>
                                <div className="flex items-center space-x-3"
                                  
                                  <div>
                                    <h4 className={`font-medium ${
                                      isUnlocked ? ']' : 'text-gray-500'
                                    }`}>
                                      {isZhTW ? "lesson.titleZh"
                                    </h4>
                                    <p className="]"
                                      {isZhTW ? "lesson.durationZh"
                                    </p>
                                  </div>
                                </div>
                                
                                {isUnlocked && (
                                  <ArrowRight className="] group-hover:text-[#3EFFDC]"
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

          {/* 3. 資� ()：個人 */}
          <div className="space-y-6"
  );
};

export default CourseDashboardPage; 
