import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Users, 
  Target, 
  Briefcase, 
  CheckCircle, 
  Clock,
  Award,
  BookOpen,
  TrendingUp,
  Zap,
  ArrowRight,
  PlayCircle,
  Download,
  Star,
  Trophy,
  Gamepad2,
  Sparkles,
  Shield,
  Rocket,
  Gift,
  ChevronRight,
  Coins,
  Timer,
  MapPin,
  Compass,
  Mountain,
  Gem,
  ScrollText,
  Wand2,
  Sword,
  Flame
} from 'lucide-react';

const ProPlanLearning: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';

  const courseInfo = {
    title: isZhTW ? "專業培訓方案 - 冠軍聯賽" : "Professional Training - Champion League",
    subtitle: isZhTW ? "解鎖全部課程，成為AI領域的終極冠軍！" : "Unlock All Courses, Become the Ultimate AI Champion!",
    level: isZhTW ? "冠軍等級" : "Champion Level",
    xp: "50,000+ XP",
    badges: "100+",
    duration: isZhTW ? "無限學習時間" : "Unlimited Learning Time",
    difficulty: isZhTW ? "全階級通關" : "All Levels Mastery"
  };

  const championStats = {
    currentXP: 0,
    totalXP: 50000,
    currentLevel: 1,
    badges: 0,
    completedCourses: 0,
    totalCourses: 4,
    streak: 0
  };

  const championFeatures = [
    {
      icon: <Crown className="w-8 h-8 text-yellow-400" />,
      title: isZhTW ? "冠軍特權" : "Champion Privileges",
      description: isZhTW ? "解鎖所有課程和專屬內容" : "Unlock all courses and exclusive content",
      color: "bg-yellow-900/20 border-yellow-500/50"
    },
    {
      icon: <Sword className="w-8 h-8 text-red-400" />,
      title: isZhTW ? "專家武器庫" : "Expert Arsenal",
      description: isZhTW ? "獲得最強大的AI工具" : "Get the most powerful AI tools",
      color: "bg-red-900/20 border-red-500/50"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "終極技能" : "Ultimate Skills",
      description: isZhTW ? "掌握所有AI技能組合" : "Master all AI skill combinations",
      color: "bg-purple-900/20 border-purple-500/50"
    },
    {
      icon: <Flame className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "無限潛能" : "Infinite Potential",
      description: isZhTW ? "持續更新的新內容" : "Continuously updated new content",
      color: "bg-orange-900/20 border-orange-500/50"
    }
  ];

  const championshipPath = [
    {
      id: 1,
      title: isZhTW ? "提示工程王者" : "Prompt Engineering Master",
      description: isZhTW ? "征服AI提示的藝術" : "Conquer the art of AI prompts",
      icon: <Wand2 className="w-6 h-6" />,
      status: "available",
      xp: 15000,
      color: "from-blue-400 to-purple-600",
      route: "/prompt-engineering/overview"
    },
    {
      id: 2,
      title: isZhTW ? "編程英雄" : "Coding Hero",
      description: isZhTW ? "成為程式設計的傳奇" : "Become a programming legend",
      icon: <Sword className="w-6 h-6" />,
      status: "available",
      xp: 12000,
      color: "from-green-400 to-blue-600",
      route: "/coding-basics/overview"
    },
    {
      id: 3,
      title: isZhTW ? "ChatGPT 神話" : "ChatGPT Legend",
      description: isZhTW ? "掌控對話AI的力量" : "Control the power of conversational AI",
      icon: <Sparkles className="w-6 h-6" />,
      status: "available",
      xp: 18000,
      color: "from-purple-400 to-pink-600",
      route: "/chatgpt-mastery/overview"
    },
    {
      id: 4,
      title: isZhTW ? "Perplexity 專家" : "Perplexity Expert",
      description: isZhTW ? "成為搜索研究的大師" : "Become a search research master",
      icon: <Crown className="w-6 h-6" />,
      status: "available",
      xp: 14000,
      color: "from-yellow-400 to-orange-600",
      route: "/perplexity-tools/overview"
    }
  ];

  const legendaryAchievements = [
    {
      id: 1,
      title: isZhTW ? "全能冠軍" : "All-Round Champion",
      description: isZhTW ? "完成所有課程" : "Complete all courses",
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    },
    {
      id: 2,
      title: isZhTW ? "技能大師" : "Skill Master",
      description: isZhTW ? "獲得所有技能徽章" : "Earn all skill badges",
      icon: <Star className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    },
    {
      id: 3,
      title: isZhTW ? "連勝傳奇" : "Winning Streak Legend",
      description: isZhTW ? "保持30天學習連勝" : "Maintain 30-day learning streak",
      icon: <Flame className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    },
    {
      id: 4,
      title: isZhTW ? "AI領袖" : "AI Leader",
      description: isZhTW ? "成為AI領域的領導者" : "Become a leader in AI field",
      icon: <Crown className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    }
  ];

  const premiumTools = [
    {
      name: isZhTW ? "終極AI工具包" : "Ultimate AI Toolkit",
      icon: "🛠️",
      power: isZhTW ? "神級" : "Divine",
      description: isZhTW ? "包含所有專業AI工具" : "Includes all professional AI tools"
    },
    {
      name: isZhTW ? "專家模板庫" : "Expert Template Library",
      icon: "📚",
      power: isZhTW ? "傳說" : "Legendary",
      description: isZhTW ? "1000+專業模板" : "1000+ professional templates"
    },
    {
      name: isZhTW ? "VIP支援" : "VIP Support",
      icon: "💎",
      power: isZhTW ? "至尊" : "Supreme",
      description: isZhTW ? "24/7專家支援" : "24/7 expert support"
    },
    {
      name: isZhTW ? "認證徽章" : "Certification Badge",
      icon: "🏅",
      power: isZhTW ? "榮耀" : "Glorious",
      description: isZhTW ? "業界認可的專業認證" : "Industry-recognized certification"
    }
  ];

  const handleCourseClick = (route: string) => {
    navigate(route);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-600';
      case 'rare': return 'text-blue-400 border-blue-600';
      case 'epic': return 'text-purple-400 border-purple-600';
      case 'legendary': return 'text-yellow-400 border-yellow-600';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 blur-3xl -z-10" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {courseInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              {courseInfo.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-lg px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                {courseInfo.level}
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400 text-lg px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                {courseInfo.xp}
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400 text-lg px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                {courseInfo.badges}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Champion Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-yellow-400" />
                {isZhTW ? "冠軍成就統計" : "Champion Achievement Stats"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {championStats.currentLevel}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "冠軍等級" : "Champion Level"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {championStats.currentXP.toLocaleString()}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "榮耀點數" : "Glory Points"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    {championStats.completedCourses}/{championStats.totalCourses}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "征服課程" : "Conquered Courses"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {championStats.streak}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "勝利連擊" : "Victory Streak"}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{isZhTW ? "冠軍之路進度" : "Champion Path Progress"}</span>
                  <span className="text-yellow-400">{championStats.currentXP} / {championStats.totalXP}</span>
                </div>
                <Progress value={(championStats.currentXP / championStats.totalXP) * 100} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isZhTW ? "專業工具庫" : "Professional Arsenal"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumTools.map((tool, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{tool.name}</h3>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400 mb-3">
                    {tool.power}
                  </Badge>
                  <p className="text-gray-300 text-sm">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Champion Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isZhTW ? "冠軍特權" : "Champion Privileges"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {championFeatures.map((feature, index) => (
              <Card key={index} className={`${feature.color} border backdrop-blur-sm hover:scale-105 transition-transform`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Championship Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isZhTW ? "冠軍征程" : "Championship Journey"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {championshipPath.map((path, index) => (
              <Card key={path.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => handleCourseClick(path.route)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${path.color}`}>
                      {path.icon}
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{path.title}</h3>
                  <p className="text-gray-300 mb-4">{path.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      <Coins className="w-4 h-4 mr-1" />
                      {path.xp} XP
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Legendary Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isZhTW ? "傳奇成就殿堂" : "Legendary Achievement Hall"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legendaryAchievements.map((achievement) => (
              <Card key={achievement.id} className={`bg-gray-900/50 border-gray-700 backdrop-blur-sm ${achievement.unlocked ? '' : 'opacity-50'}`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full border-2 ${getRarityColor(achievement.rarity)} flex items-center justify-center mx-auto mb-4`}>
                    {achievement.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-white">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                  
                  <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">
                {isZhTW ? "準備好成為AI冠軍了嗎？" : "Ready to Become the AI Champion?"}
              </h3>
              <p className="text-gray-300 mb-6">
                {isZhTW ? "解鎖所有課程，開始你的冠軍之路！" : "Unlock all courses and start your championship journey!"}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/prompt-engineering/overview')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {isZhTW ? "開始征程" : "Start Journey"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProPlanLearning; 