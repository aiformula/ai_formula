/**
 * AI Business Automation Free Course Outline Page
 * @fileoverview Sample page demonstrating the FreeCourseOutlineTemplate with AI automation course data
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Play, Clock, BookOpen, Target, Users, Star, 
  Award, TrendingUp, Brain, Zap, CheckCircle, Calendar,
  Lightbulb, BarChart3, Trophy
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const AIBusinessAutomationOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  const courseData = {
    title: isZhHK ? 'AI 商業自動化實戰課程' : 'AI Business Automation Practice Course',
    subtitle: isZhHK ? '為你的事業裝上智慧引擎，提升效率降低成本' : 'Power your business with smart engines, boost efficiency and reduce costs',
    progress: 25,
    totalTime: isZhHK ? '5.5小時總課程' : '5.5h Total Course',
    totalModules: isZhHK ? '3 大主題 • 9 單元' : '3 Themes • 9 Units',
    students: 1247,
    rating: 4.8,
    reviews: 156
  };

  const themes = [
    {
      id: 1,
      title: isZhHK ? 'AI 商業自動化基礎' : 'AI Business Automation Fundamentals',
      subtitle: isZhHK ? '為你的事業裝上智慧引擎' : 'Powering Your Business with Smart Engine',
      description: isZhHK ? '了解什麼是 AI 自動化，以及它如何為您的企業節省時間、降低成本，成為最聰明的競爭優勢。' : 'Understand what AI automation is and how it can save time, reduce costs, and become the smartest competitive advantage for your business.',
      duration: isZhHK ? '90分鐘' : '90 minutes',
      units: 3,
      difficulty: isZhHK ? '初級' : 'Beginner',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/50',
      icon: <Target className="w-8 h-8" />,
      emoji: '🎯',
      progress: 67,
      topics: isZhHK ? [
        '什麼是「AI 商業自動化」？',
        '三大核心優勢：省時、省錢、防錯',
        '自動化工具箱：Zapier, Make 與 API'
      ] : [
        'What is "AI Business Automation"?',
        'Three core advantages: Save time, money, prevent errors',
        'Automation toolbox: Zapier, Make and API'
      ]
    },
    {
      id: 2,
      title: isZhHK ? '核心應用實戰' : 'Core Application Practice',
      subtitle: isZhHK ? '三大部門的 AI 自動化魔法' : 'AI Automation Magic for Three Major Departments',
      description: isZhHK ? '深入行銷、客服、營運三大核心部門，提供可立即上手的 AI 自動化應用案例與流程。' : 'Dive deep into the three core departments of marketing, customer service, and operations, providing immediately applicable AI automation use cases.',
      duration: isZhHK ? '120分鐘' : '120 minutes',
      units: 3,
      difficulty: isZhHK ? '中級' : 'Intermediate',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/50',
      icon: <Zap className="w-8 h-8" />,
      emoji: '⚡',
      progress: 0,
      topics: isZhHK ? [
        '行銷自動化：從文案生成到社群發文',
        '客服自動化：打造 24H 智慧客服',
        '營運自動化：報表整理與資訊擷取'
      ] : [
        'Marketing Automation: From copywriting to social media',
        'Customer Service Automation: Building 24H smart service',
        'Operations Automation: Report organization and data extraction'
      ]
    },
    {
      id: 3,
      title: isZhHK ? '進階整合與策略' : 'Advanced Integration and Strategy',
      subtitle: isZhHK ? '打造全方位的自動化商業體系' : 'Building a Comprehensive Automated Business System',
      description: isZhHK ? '學習如何將單點的自動化流程，整合成一個互相連動的生態系，並評估其效益，為企業打造長期的數位競爭力。' : 'Learn how to integrate single-point automation processes into an interconnected ecosystem and evaluate their benefits.',
      duration: isZhHK ? '120分鐘' : '120 minutes',
      units: 3,
      difficulty: isZhHK ? '進階' : 'Advanced',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/50',
      icon: <BarChart3 className="w-8 h-8" />,
      emoji: '📊',
      progress: 0,
      topics: isZhHK ? [
        '跨系統工作流：當客戶下單後，會發生什麼事？',
        '打造你的專屬 AI 助理 (Agent)',
        '效益評估 (ROI) 與持續優化'
      ] : [
        'Cross-system Workflow: What happens after a customer places an order?',
        'Build Your Personal AI Assistant (Agent)',
        'ROI Assessment and Continuous Optimization'
      ]
    }
  ];

  const handleStartLearning = () => {
    // 導航到第一個主題
    navigate('/courses/ai-business-automation/theme/1');
  };

  const handleThemeClick = (themeId: number) => {
    navigate(`/courses/ai-business-automation/theme/${themeId}`);
  };

  const overallProgress = Math.round(
    themes.reduce((acc, theme) => acc + theme.progress, 0) / themes.length
  );

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Course Header */}
          <motion.div {...fadeIn} className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold mb-2">{courseData.title}</h1>
                <p className="text-xl text-gray-300">{courseData.subtitle}</p>
              </div>
            </div>

            {/* Course Stats */}
            <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{courseData.totalTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{courseData.totalModules}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{courseData.students} {isZhHK ? '位學員' : 'students'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{courseData.rating} ({courseData.reviews} {isZhHK ? '評價' : 'reviews'})</span>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{isZhHK ? '整體進度' : 'Overall Progress'}</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3 bg-slate-800">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: `${overallProgress}%`}} />
              </Progress>
            </div>

            {/* Main CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <Button 
                onClick={handleStartLearning}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {isZhHK ? '開始學習課程' : 'Start Learning Course'}
              </Button>
            </motion.div>
          </motion.div>

          {/* Themes Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-center mb-8">{isZhHK ? '課程主題' : 'Course Themes'}</h2>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-pointer"
                  onClick={() => handleThemeClick(theme.id)}
                >
                  <Card className={`bg-gray-800/50 border-2 ${theme.borderColor} hover:border-opacity-100 transition-all duration-500 overflow-hidden h-full backdrop-blur-sm relative`}>
                    
                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-r ${theme.bgGradient} rounded-lg blur-xl`}></div>
                    </div>

                    <CardContent className="p-6 relative z-10">
                      
                      {/* Theme Header */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          className={`p-3 bg-gradient-to-br ${theme.bgGradient} rounded-xl border ${theme.borderColor}`}
                        >
                          {theme.icon}
                        </motion.div>
                        <span className="text-3xl">{theme.emoji}</span>
                      </div>

                      {/* Theme Info */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`bg-gradient-to-r ${theme.gradient} text-white border-0 text-xs`}>
                            {isZhHK ? `主題 ${theme.id}` : `Theme ${theme.id}`}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                            {theme.difficulty}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                          {theme.title}
                        </h3>
                        <p className="text-sm text-blue-300 mb-3">{theme.subtitle}</p>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">{theme.description}</p>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{isZhHK ? '進度' : 'Progress'}</span>
                          <span>{theme.progress}%</span>
                        </div>
                        <Progress value={theme.progress} className="h-2 bg-slate-700">
                          <div className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full`} style={{width: `${theme.progress}%`}} />
                        </Progress>
                      </div>

                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {theme.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {theme.units} {isZhHK ? '單元' : 'units'}
                        </span>
                      </div>

                      {/* Topics List */}
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-yellow-300 mb-2 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          {isZhHK ? '你將學到' : 'You will learn'}
                        </h4>
                        <ul className="space-y-1">
                          {theme.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${theme.gradient} rounded-full mt-1.5 flex-shrink-0`}></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className={`w-full bg-gradient-to-r ${theme.gradient} hover:shadow-lg text-white font-semibold py-2 transition-all duration-300 group border-0`}
                        >
                          {theme.progress > 0 ? (
                            <>
                              {isZhHK ? '繼續學習' : 'Continue Learning'}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                          ) : (
                            <>
                              {isZhHK ? '開始學習' : 'Start Learning'}
                              <Play className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </motion.div>

                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Course Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-8">{isZhHK ? '課程特色' : 'Course Features'}</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">{isZhHK ? '實戰導向' : 'Practical Focus'}</h3>
                  <p className="text-sm text-gray-400">{isZhHK ? '每個單元都有實際案例和可立即應用的技巧' : 'Every unit includes real cases and immediately applicable techniques'}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">{isZhHK ? '專家指導' : 'Expert Guidance'}</h3>
                  <p className="text-sm text-gray-400">{isZhHK ? '由 AI Formula 專家團隊精心設計的課程內容' : 'Course content carefully designed by AI Formula expert team'}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">{isZhHK ? '終身學習' : 'Lifetime Learning'}</h3>
                  <p className="text-sm text-gray-400">{isZhHK ? '一次購買，終身訪問，持續更新的課程內容' : 'One-time purchase, lifetime access, continuously updated content'}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AIBusinessAutomationOutline; 