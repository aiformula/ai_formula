import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, Users, Star, Play, BookOpen, Code, Brain, Award, TrendingUp, Search, Sparkles, Wand2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Atropos from 'atropos/react';
import 'atropos/css';

const Course = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Handle course navigation to outline pages
  const handleCourseClick = (courseId: string) => {
    const routeMap = {
      'ai-app-development': '/courses/free-plan',  // 指向免費計劃頁面
      'dotai-advertising': '/courses/free-plan',   // 指向免費計劃頁面
      'shopify-automation': '/courses/free-plan'   // 指向免費計劃頁面
    };
    
    const route = routeMap[courseId];
    if (route) {
      navigate(route);
    } else {
      // 暫時導向免費計劃頁面作為fallback
      navigate('/courses/free-plan');
    }
  };

  // 只保留真正存在嘅課程
  const availableCourses = [
    {
      id: 'ai-app-development',
      title: "AI App Development Masterclass",
      titleCht: "【AI主題班】3小時手把手教你一步步做出「真正好用」手機AI App！",
      description: "Learn to build practical AI mobile apps step by step in just 3 hours.",
      descriptionCht: "3小時完成2個手機App！本課程由全職工程師教你實際開發技能。",
      duration: "3 hours",
      durationCht: "3小時",
      students: 1847,
      rating: 4.8,
      level: "Beginner",
      levelCht: "初級",
      image: "📱",
      type: "AI Development",
      typeCht: "AI開發",
      category: "ai",
      featured: true,
      badge: "即將開班！",
      includes: [
        "3 Hour Complete Course",
        "2 Mobile App Projects",
        "Professional Instructor",
        "Hands-on Development"
      ],
      includesCht: [
        "3小時完整課程",
        "2個手機App專案",
        "專業講師指導",
        "實作開發"
      ]
    },
    {
      id: 'dotai-advertising',
      title: "DotAI Advertising Masterclass Vol.1",
      titleCht: "【AI廣告製作班Vol.1】拆解DotAI廣告片全流程：「Cup Noodle級」AI片",
      description: "Master AI advertising creation with DotAI platform and create professional video ads.",
      descriptionCht: "掌握AI廣告製作，DotAI團隊手把手教你創造專業級廣告片。",
      duration: "4 hours",
      durationCht: "4小時",
      students: 923,
      rating: 4.9,
      level: "Intermediate",
      levelCht: "中級",
      image: "🎬",
      type: "AI Advertising",
      typeCht: "AI廣告",
      category: "ai",
      badge: "即將開班！",
      includes: [
        "DotAI Platform Training",
        "Video Ad Creation",
        "Brand Strategy",
        "Professional Techniques"
      ],
      includesCht: [
        "DotAI平台培訓",
        "影片廣告創作",
        "品牌策略",
        "專業技巧"
      ]
    },
    {
      id: 'shopify-automation',
      title: "AI × Make Automation: Shopify Store Express",
      titleCht: "AI × Make自動化：Shopify網店營運速成班",
      description: "Build automated Shopify systems that can be profitable even for beginners.",
      descriptionCht: "建立無需請人也能盈利運作的Shopify自動化系統，適合新手。",
      duration: "9 hours",
      durationCht: "9小時",
      students: 1234,
      rating: 4.7,
      level: "Advanced",
      levelCht: "高級",
      image: "🛒",
      type: "E-commerce Automation",
      typeCht: "電商自動化",
      category: "automation",
      badge: "了解更多",
      includes: [
        "Shopify Store Setup",
        "Make.com Automation",
        "AI Integration",
        "Profit Optimization"
      ],
      includesCht: [
        "Shopify商店建置",
        "Make.com自動化",
        "AI整合應用",
        "盈利優化"
      ]
    }
  ];

  const categories = [
    { id: 'all', label: isZhTW ? '全部' : 'All Courses' },
    { id: 'ai', label: isZhTW ? 'AI應用' : 'AI Applications' },
    { id: 'automation', label: isZhTW ? '自動化' : 'Automation' }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? availableCourses 
    : availableCourses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {isZhTW ? '免費學習課程' : 'Free Learning Courses'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                {isZhTW ? '精心製作嘅免費課程，幫助你快速提升AI技能並實現商業目標' : 'Carefully crafted free courses to help you quickly improve AI skills and achieve business goals'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {isZhTW ? '精選免費課程' : 'Featured Free Courses'}
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {isZhTW ? '精心製作嘅數位課程，幫助你快速提升技能並實現商業目標' : 'Carefully crafted digital courses to help you quickly improve skills and achieve business goals'}
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    : 'border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Atropos
                  className="atropos-banner"
                  shadowScale={1.05}
                  rotateXMax={10}
                  rotateYMax={10}
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl">{course.image}</span>
                        <div className="flex gap-2">
                          {course.featured && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400">
                              {isZhTW ? '精選' : 'Featured'}
                            </Badge>
                          )}
                          {course.badge && (
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">
                              {course.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-white mb-2">
                        {isZhTW ? course.titleCht : course.title}
                      </CardTitle>
                      
                      <CardDescription className="text-gray-400 text-sm leading-relaxed">
                        {isZhTW ? course.descriptionCht : course.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {isZhTW ? course.durationCht : course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students.toLocaleString()} {isZhTW ? '學生' : 'students'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">
                            {isZhTW ? '包含內容：' : 'Includes:'}
                          </div>
                          <div className="space-y-1">
                            {(isZhTW ? course.includesCht : course.includes).slice(0, 3).map((include, idx) => (
                              <div key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0"></div>
                                {include}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-blue-400">
                                {course.badge || (isZhTW ? '免費' : 'FREE')}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {isZhTW ? course.typeCht : course.type}
                            </Badge>
                          </div>
                          
                          <Button 
                            size="sm"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                            onClick={() => handleCourseClick(course.id)}
                          >
                            {course.badge === '了解更多' ? (isZhTW ? '了解更多' : 'Learn More') : (isZhTW ? '即將開班' : 'Opening Soon')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Atropos>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course; 