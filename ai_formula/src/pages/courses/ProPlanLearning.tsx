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
  const isZhTW = language === 'zh-HK';

  const courseInfo = {
    title: isZhTW ? "Â∞àÊ•≠?πË??πÊ? - ?†Ë??ØË≥Ω" : "Professional Training - Champion League",
    subtitle: isZhTW ? "Ëß???®ÈÉ®Ë™≤Á?ÔºåÊ??∫AI?òÂ??ÑÁ?Ê•µÂ?ËªçÔ?" : "Unlock All Courses, Become the Ultimate AI Champion!",
    level: isZhTW ? "?†Ë?Á≠âÁ?" : "Champion Level",
    xp: "50,000+ XP",
    badges: "100+",
    duration: isZhTW ? "?°È?Â≠∏Á??ÇÈ?" : "Unlimited Learning Time",
    difficulty: isZhTW ? "?®È?Á¥öÈÄöÈ?" : "All Levels Mastery"
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
      title: isZhTW ? "?†Ë??πÊ?" : "Champion Privileges",
      description: isZhTW ? "Ëß???Ä?âË™≤Á®ãÂ?Â∞àÂ±¨?ßÂÆπ" : "Unlock all courses and exclusive content",
      color: "bg-yellow-900/20 border-yellow-500/50"
    },
    {
      icon: <Sword className="w-8 h-8 text-red-400" />,
      title: isZhTW ? "Â∞àÂÆ∂Ê≠¶Âô®Â∫? : "Expert Arsenal",
      description: isZhTW ? "?≤Â??ÄÂº∑Â§ß?ÑAIÂ∑•ÂÖ∑" : "Get the most powerful AI tools",
      color: "bg-red-900/20 border-red-500/50"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      title: isZhTW ? "ÁµÇÊ•µ?Ä?? : "Ultimate Skills",
      description: isZhTW ? "?åÊè°?Ä?âAI?Ä?ΩÁ??? : "Master all AI skill combinations",
      color: "bg-purple-900/20 border-purple-500/50"
    },
    {
      icon: <Flame className="w-8 h-8 text-orange-400" />,
      title: isZhTW ? "?°È?ÊΩõËÉΩ" : "Infinite Potential",
      description: isZhTW ? "?ÅÁ??¥Êñ∞?ÑÊñ∞?ßÂÆπ" : "Continuously updated new content",
      color: "bg-orange-900/20 border-orange-500/50"
    }
  ];

  const championshipPath = [
    {
      id: 1,
      title: isZhTW ? "?êÁ§∫Â∑•Á??ãËÄ? : "Prompt Engineering Master",
      description: isZhTW ? "ÂæÅÊ?AI?êÁ§∫?ÑË?Ë°? : "Conquer the art of AI prompts",
      icon: <Wand2 className="w-6 h-6" />,
      status: "available",
      xp: 15000,
      color: "from-blue-400 to-purple-600",
      route: "/prompt-engineering/overview"
    },
    {
      id: 2,
      title: isZhTW ? "Á∑®Á??±È?" : "Coding Hero",
      description: isZhTW ? "?êÁÇ∫Á®ãÂ?Ë®≠Ë??ÑÂÇ≥Â•? : "Become a programming legend",
      icon: <Sword className="w-6 h-6" />,
      status: "available",
      xp: 12000,
      color: "from-green-400 to-blue-600",
      route: "/coding-basics/overview"
    },
    {
      id: 3,
      title: isZhTW ? "ChatGPT Á•ûË©±" : "ChatGPT Legend",
      description: isZhTW ? "?åÊéßÂ∞çË©±AI?ÑÂ??? : "Control the power of conversational AI",
      icon: <Sparkles className="w-6 h-6" />,
      status: "available",
      xp: 18000,
      color: "from-purple-400 to-pink-600",
      route: "/chatgpt-mastery/overview"
    },
    {
      id: 4,
      title: isZhTW ? "Perplexity Â∞àÂÆ∂" : "Perplexity Expert",
      description: isZhTW ? "?êÁÇ∫?úÁ¥¢?îÁ©∂?ÑÂ§ßÂ∏? : "Become a search research master",
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
      title: isZhTW ? "?®ËÉΩ?†Ë?" : "All-Round Champion",
      description: isZhTW ? "ÂÆåÊ??Ä?âË™≤Á®? : "Complete all courses",
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    },
    {
      id: 2,
      title: isZhTW ? "?Ä?ΩÂ§ßÂ∏? : "Skill Master",
      description: isZhTW ? "?≤Â??Ä?âÊ??ΩÂæΩÁ´? : "Earn all skill badges",
      icon: <Star className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    },
    {
      id: 3,
      title: isZhTW ? "????≥Â?" : "Winning Streak Legend",
      description: isZhTW ? "‰øùÊ?30Â§©Â≠∏ÁøíÈÄ??" : "Maintain 30-day learning streak",
      icon: <Flame className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    },
    {
      id: 4,
      title: isZhTW ? "AI?òË?" : "AI Leader",
      description: isZhTW ? "?êÁÇ∫AI?òÂ??ÑÈ?Â∞éËÄ? : "Become a leader in AI field",
      icon: <Crown className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary"
    }
  ];

  const premiumTools = [
    {
      name: isZhTW ? "ÁµÇÊ•µAIÂ∑•ÂÖ∑?? : "Ultimate AI Toolkit",
      icon: "??Ô∏?,
      power: isZhTW ? "Á•ûÁ?" : "Divine",
      description: isZhTW ? "?ÖÂê´?Ä?âÂ?Ê•≠AIÂ∑•ÂÖ∑" : "Includes all professional AI tools"
    },
    {
      name: isZhTW ? "Â∞àÂÆ∂Ê®°ÊùøÂ∫? : "Expert Template Library",
      icon: "??",
      power: isZhTW ? "?≥Ë™™" : "Legendary",
      description: isZhTW ? "1000+Â∞àÊ•≠Ê®°Êùø" : "1000+ professional templates"
    },
    {
      name: isZhTW ? "VIP?ØÊè¥" : "VIP Support",
      icon: "??",
      power: isZhTW ? "?≥Â?" : "Supreme",
      description: isZhTW ? "24/7Â∞àÂÆ∂?ØÊè¥" : "24/7 expert support"
    },
    {
      name: isZhTW ? "Ë™çË?ÂæΩÁ?" : "Certification Badge",
      icon: "??",
      power: isZhTW ? "Ê¶ÆËÄÄ" : "Glorious",
      description: isZhTW ? "Ê•≠Á?Ë™çÂèØ?ÑÂ?Ê•≠Ë?Ë≠? : "Industry-recognized certification"
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
                {isZhTW ? "?†Ë??êÂ∞±Áµ±Ë?" : "Champion Achievement Stats"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {championStats.currentLevel}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "?†Ë?Á≠âÁ?" : "Champion Level"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {championStats.currentXP.toLocaleString()}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "Ê¶ÆËÄÄÈªûÊï∏" : "Glory Points"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    {championStats.completedCourses}/{championStats.totalCourses}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "ÂæÅÊ?Ë™≤Á?" : "Conquered Courses"}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {championStats.streak}
                  </div>
                  <div className="text-gray-400">{isZhTW ? "?ùÂà©???" : "Victory Streak"}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{isZhTW ? "?†Ë?‰πãË∑Ø?≤Â∫¶" : "Champion Path Progress"}</span>
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
            {isZhTW ? "Â∞àÊ•≠Â∑•ÂÖ∑Â∫? : "Professional Arsenal"}
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
            {isZhTW ? "?†Ë??πÊ?" : "Champion Privileges"}
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
            {isZhTW ? "?†Ë?ÂæÅÁ?" : "Championship Journey"}
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
            {isZhTW ? "?≥Â??êÂ∞±ÊÆøÂ?" : "Legendary Achievement Hall"}
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
                {isZhTW ? "Ê∫ñÂ?Â•ΩÊ??∫AI?†Ë?‰∫ÜÂ?Ôº? : "Ready to Become the AI Champion?"}
              </h3>
              <p className="text-gray-300 mb-6">
                {isZhTW ? "Ëß???Ä?âË™≤Á®ãÔ??ãÂ?‰Ω†Á??†Ë?‰πãË∑ØÔº? : "Unlock all courses and start your championship journey!"}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/prompt-engineering/overview')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {isZhTW ? "?ãÂ?ÂæÅÁ?" : "Start Journey"}
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