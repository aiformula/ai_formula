import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Code2, 
  TrendingUp, 
  Brain, 
  Users, 
  Rocket,
  ArrowRight,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

const AudiencePathwaysSection = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  const pathways = [
    {
      id: 1,
      icon: <BookOpen className="w-8 h-8" />,
      emoji: "?”°",
      title: isZhTW ? "?‘ä?AI?°æ?ï¼Œæƒ³?“å¥½?ºç?" : "I'm an AI beginner, want to build foundations",
      description: isZhTW 
        ? "å¾é›¶?‹å?å­¸ç?AIï¼Œå»ºç«‹ç´®å¯¦ç??ºç??¥è?ï¼Œé©?ˆå??¨æ??‰AIç¶“é??„å?å­¸è€…ã€?
        : "Start learning AI from scratch, build solid foundational knowledge, perfect for complete beginners.",
      features: isZhTW ? [
        "AI?ºç?æ¦‚å¿µè§??",
        "å¯¦ç”¨å·¥å…·ä»‹ç´¹", 
        "?Ÿå¯¦æ¡ˆä??†æ?",
        "?æ­¥å¯¦ä??‡å?"
      ] : [
        "AI fundamental concepts",
        "Practical tools introduction",
        "Real case studies", 
        "Step-by-step guidance"
      ],
      level: isZhTW ? "?ç?" : "Beginner",
      duration: isZhTW ? "4-6?? : "4-6 weeks",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/50",
      route: "/courses?level=beginner"
    },
    {
      id: 2,
      icon: <Code2 className="w-8 h-8" />,
      emoji: "?’»",
      title: isZhTW ? "?‘ä??‹ç™¼?…ï??³å­¸?²é??€è¡? : "I'm a developer, want to learn advanced techniques",
      description: isZhTW 
        ? "æ·±å…¥AI?€è¡“ç´°ç¯€ï¼Œå­¸ç¿’API?´å??è‡ª?•å?å·¥å…·?Œé€²é??‹ç™¼?€å·§ã€?
        : "Dive deep into AI technical details, learn API integration, automation tools and advanced development skills.",
      features: isZhTW ? [
        "API?´å?å¯¦æˆ°",
        "?ªå??–å·¥?·é???,
        "?²é?ç¨‹å??€å·?,
        "ç³»çµ±?¶æ?è¨­è?"
      ] : [
        "API integration practice",
        "Automation tool development",
        "Advanced programming skills",
        "System architecture design"
      ],
      level: isZhTW ? "?²é?" : "Advanced",
      duration: isZhTW ? "8-12?? : "8-12 weeks",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/50",
      route: "/courses?level=advanced&category=development"
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      emoji: "??",
      title: isZhTW ? "?‘ä?è¡ŒéŠ·äººå“¡ï¼Œæƒ³?¨AI?å??ˆç?" : "I'm a marketer, want to use AI to boost efficiency",
      description: isZhTW 
        ? "å­¸ç?å¦‚ä??‹ç”¨AIå·¥å…·?ªå?è¡ŒéŠ·æµç?ï¼Œæ??‡å…§å®¹å‰µä½œå??¸æ??†æ??ˆç???
        : "Learn how to use AI tools to optimize marketing processes, enhance content creation and data analysis efficiency.",
      features: isZhTW ? [
        "AI?§å®¹?µä?å·¥å…·",
        "è¡ŒéŠ·?ªå??–è¨­ç½?,
        "?¸æ??†æ??ªå?",
        "å®¢æˆ¶?œä?ç®¡ç?"
      ] : [
        "AI content creation tools",
        "Marketing automation setup",
        "Data analysis optimization",
        "Customer relationship management"
      ],
      level: isZhTW ? "ä¸­ç?" : "Intermediate",
      duration: isZhTW ? "6-8?? : "6-8 weeks",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/50",
      route: "/courses?level=intermediate&category=marketing"
    }
  ];

  const handlePathwayClick = (route: string) => {
    // Navigate to the course page with filters
    window.location.href = route;
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full mb-6"
          >
            <Target className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">
              {isZhTW ? '?‹äºº?–å­¸ç¿’è·¯å¾? : 'Personalized Learning Path'}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              {isZhTW ? 'ä½ ä??Šä?é¡äººï¼? : 'What Type Are You?'}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZhTW 
              ? '?”å??Œæ™¯?…ä??€è¦å??Œå?å­¸ç?è·¯å??‚æ??±ä??…èµ·é»ï??‹å?ä½ å?AIå­¸ç?ä¹‹æ?ï¼? 
              : 'Different backgrounds require different learning paths. Choose your starting point and begin your AI learning journey!'
            }
          </p>
        </motion.div>

        {/* Pathway Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-12">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
              onClick={() => handlePathwayClick(pathway.route)}
            >
              <Card className={`bg-gray-800/50 border-2 ${pathway.borderColor} hover:border-opacity-100 transition-all duration-500 overflow-hidden h-full backdrop-blur-sm relative`}>
                {/* Card Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-r ${pathway.bgGradient} rounded-lg blur-xl`}></div>
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon & Emoji */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 bg-gradient-to-br ${pathway.bgGradient} rounded-xl border ${pathway.borderColor}`}
                    >
                      {pathway.icon}
                    </motion.div>
                    <span className="text-4xl">{pathway.emoji}</span>
                  </div>

                  {/* Pathway Info */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`bg-gradient-to-r ${pathway.gradient} text-white border-0`}>
                        {pathway.level}
                      </Badge>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {pathway.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                      {pathway.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {pathway.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      {isZhTW ? 'ä½ æ?å­¸åˆ°' : 'You will learn'}
                    </h4>
                    <ul className="space-y-2">
                      {pathway.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className={`w-2 h-2 bg-gradient-to-r ${pathway.gradient} rounded-full flex-shrink-0`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className={`w-full bg-gradient-to-r ${pathway.gradient} hover:shadow-lg hover:shadow-${pathway.gradient.split('-')[1]}-500/25 text-white font-semibold py-3 transition-all duration-300 group border-0`}
                    >
                      {isZhTW ? '?‹å?å­¸ç?' : 'Start Learning'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">
            {isZhTW ? 'ä»ç„¶?”ç¢ºå®šé??‹èª²ç¨‹é©?ˆä?ï¼? : 'Still not sure which course suits you?'}
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 hover:border-yellow-400 transition-all duration-300 px-8 py-3"
          >
            {isZhTW ? '?¯çµ¡?‘å€‘ç²å¾—å»ºè­? : 'Contact Us for Advice'}
            <Users className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AudiencePathwaysSection; 