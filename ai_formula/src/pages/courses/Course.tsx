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
  const isZhTW = language === 'zh-HK';
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All', nameCht: '全部', label: '全部' },
    { id: 'ai', name: 'AI', nameCht: 'AI應用', label: 'AI應用' },
    { id: 'automation', name: 'Automation', nameCht: '自動化', label: '自動化' },
  ];

  // Handle course navigation to outline pages
  const handleCourseClick = (courseId: string) => {
    const routeMap = {
      'ai-app-development': '/courses/free-plan',  // 導向免費計劃頁面
      'ai-formula-advertising': '/courses/free-plan',   // 導向免費計劃頁面
      'shopify-automation': '/courses/free-plan',   // 導向免費計劃頁面
      'prompt-engineering': '/courses/prompt-engineering-outline',
      'chatgpt-mastery': '/courses/chatgpt-mastery-outline',
      'perplexity-tools': '/courses/perplexity-tools-outline',
      'coding-basics': '/courses/coding-basics-outline',
      'midjourney-ai': '/courses/free-plan'
    };
    
    const route = routeMap[courseId];
    if (route) {
      navigate(route);
    } else {
      // ?��?導�??�費計�??�面作為fallback
      navigate('/courses/free-plan');
    }
  };

  // Handle real course navigation
  const handleRealCourseClick = (courseId: string) => {
    const routeMap = {
      'prompt-engineering': '/courses/prompt-engineering-outline',
      'chatgpt-mastery': '/courses/chatgpt-mastery-outline',
      'perplexity-tools': '/courses/perplexity-tools-outline',
      'coding-basics': '/courses/coding-basics-outline',
      'midjourney-ai': '/courses/free-plan'
    };
    
    const route = routeMap[courseId];
    if (route) {
      navigate(route);
    } else {
      navigate('/courses/free-plan');
    }
  };

  // 3個特色課程加上2個內容課程
  const availableCourses = [
    {
      id: 'ai-app-development',
      title: "AI App Development Masterclass",
      titleCht: "用AI主導的小程式開發：教你一步步寫出「世界第一」的手機AI App",
      description: "Learn to build practical AI mobile apps step by step in just 3 hours.",
      descriptionCht: "3小時完成2個手機App！本課程由全端工程師實戰開發經驗",
      duration: "3 hours",
      durationCht: "3小時",
      students: 1847,
      rating: 4.8,
      level: "Beginner",
      levelCht: "初級",
      image: "default",
      type: "AI Development",
      typeCht: "AI開發",
      category: "ai",
      featured: true,
      badge: "?��??�班�?,
      includes: [
        "3 Hour Complete Course",
        "2 Mobile App Projects",
        "Professional Instructor",
        "Hands-on Development"
      ],
      includesCht: [
        "3小�?完整課�?",
        "2?��?機App專�?",
        "專業講師?��?",
        "實�??�發練�?"
      ]
    },
    {
      id: 'ai-formula-advertising',
      title: "AI Formula Advertising Masterclass Vol.1",
      titleCht: "?�AI�??製�??�Vol.1?��?解AI Formula�???�全流�?：「Cup Noodle級」AI??,
      description: "Master AI advertising creation with AI Formula platform and create professional video ads.",
      descriptionCht: "?�握AI�??製�?，AI Formula?��??��??��?你創?��?業�?�???��?,
      duration: "4 hours",
      durationCht: "4小�?",
      students: 923,
      rating: 4.9,
      level: "Intermediate",
      levelCht: "中�?",
      image: "?��",
      type: "AI Advertising",
      typeCht: "AI營銷",
      category: "ai",
      featured: true,
      badge: "?��??�班�?,
      includes: [
        "AI Formula Platform Training",
        "Professional Video Creation",
        "Brand Integration",
        "Advanced Techniques"
      ],
      includesCht: [
        "AI Formula平台訓練",
        "專業影�?製�?",
        "?��??��??�用",
        "?��?製�??��?
      ]
    },
    {
      id: 'shopify-automation',
      title: "AI ? Make Automation: Shopify Store Express",
      titleCht: "AI ? Make?��??��?Shopify網�??��??��???,
      description: "Build automated Shopify systems that can be profitable even for beginners.",
      descriptionCht: "建�??��?請人也能?�利?��??�Shopify?��??�系統�??��??��???,
      duration: "9 hours",
      durationCht: "9小�?",
      students: 1234,
      rating: 4.7,
      level: "Beginner",
      levelCht: "?��?",
      image: "??",
      type: "E-commerce Automation",
      typeCht: "電商自動化",
      category: "automation",
      featured: true,
      badge: "了解?��?",
      includes: [
        "Shopify Store Setup",
        "Make.com Automation",
        "AI Integration",
        "Profit Optimization"
      ],
      includesCht: [
        "Shopify?��?建置",
        "Make.com?��???,
        "AI?��??�用",
        "?�利?��?策略"
      ]
    }
  ];

  // 5?��?�???��?課�?
  const realCourses = [
    {
      id: 'prompt-engineering',
      title: "Prompt Engineering Mastery",
      titleCht: "?�示工�?精通課�?,
      description: "Master the art of AI prompt engineering for better results.",
      descriptionCht: "?�握AI?�示工�??�巧�??��??�好?��??��?,
      duration: "6 hours",
      durationCht: "6小�?",
      students: 2341,
      rating: 4.9,
      level: "All Levels",
      levelCht: "?�?��???,
      image: "??",
      type: "AI Fundamentals",
      typeCht: "AI?��?",
      category: "ai",
      featured: true,
      badge: "?�費",
      includes: [
        "Complete Prompt Guide",
        "Practical Examples",
        "Advanced Techniques",
        "Real-world Applications"
      ],
      includesCht: [
        "完整?�示?��?",
        "實用範�?",
        "?��??��?,
        "實�??�用"
      ]
    },
    {
      id: 'chatgpt-mastery',
      title: "ChatGPT Mastery Course",
      titleCht: "ChatGPT精通課�?,
      description: "Complete guide to mastering ChatGPT for productivity and creativity.",
      descriptionCht: "完整?�ChatGPT精通�??��??��??�產?��??�造�???,
      duration: "4 hours",
      durationCht: "4小�?",
      students: 1876,
      rating: 4.8,
      level: "Beginner",
      levelCht: "?��?",
      image: "?��",
      type: "AI Tools",
      typeCht: "AI工具",
      category: "ai",
      featured: true,
      badge: "?�費",
      includes: [
        "ChatGPT Fundamentals",
        "Advanced Prompting",
        "Use Cases",
        "Productivity Tips"
      ],
      includesCht: [
        "ChatGPT?��?",
        "?��??�示?��?,
        "使用案�?",
        "?�產?��?�?
      ]
    },
    {
      id: 'perplexity-tools',
      title: "Perplexity Tools Mastery",
      titleCht: "Perplexity工具精�?,
      description: "Master Perplexity AI for research and information gathering.",
      descriptionCht: "?�握Perplexity AI?��??�究?��?訊收?��?,
      duration: "3 hours",
      durationCht: "3小�?",
      students: 1234,
      rating: 4.7,
      level: "Intermediate",
      levelCht: "中�?",
      image: "??",
      type: "AI Research",
      typeCht: "AI?�究",
      category: "ai",
      featured: true,
      badge: "?�費",
      includes: [
        "Perplexity Basics",
        "Research Techniques",
        "Information Validation",
        "Advanced Queries"
      ],
      includesCht: [
        "Perplexity?��?",
        "?�究?��?,
        "資�?驗�?",
        "?��??�詢"
      ]
    },
    {
      id: 'coding-basics',
      title: "Coding Basics with AI",
      titleCht: "AI輔助編�??��?",
      description: "Learn programming fundamentals with AI assistance.",
      descriptionCht: "使用AI輔助學�?編�??��???,
      duration: "8 hours",
      durationCht: "8小�?",
      students: 987,
      rating: 4.6,
      level: "Beginner",
      levelCht: "?��?",
      image: "?��",
      type: "Programming",
      typeCht: "編�?",
      category: "ai",
      featured: true,
      badge: "?�費",
      includes: [
        "Programming Fundamentals",
        "AI-Assisted Coding",
        "Project Building",
        "Best Practices"
      ],
      includesCht: [
        "編�??��?",
        "AI輔助編碼",
        "專�?建�?",
        "?�佳實�?
      ]
    },
    {
      id: 'midjourney-ai',
      title: "Midjourney AI Image Creation",
      titleCht: "Midjourney AI?��??��?",
      description: "Create stunning AI-generated images with Midjourney.",
      descriptionCht: "使用Midjourney?�造令人�??��?AI?��??��???,
      duration: "5 hours",
      durationCht: "5小�?",
      students: 2156,
      rating: 4.8,
      level: "All Levels",
      levelCht: "?�?��???,
      image: "?��",
      type: "AI Art",
      typeCht: "AI?��?",
      category: "ai",
      featured: true,
      badge: "?�費",
      includes: [
        "Midjourney Basics",
        "Advanced Prompting",
        "Style Techniques",
        "Commercial Usage"
      ],
      includesCht: [
        "Midjourney?��?",
        "?��??�示?��?,
        "風格?��?,
        "?�業?�用"
      ]
    }
  ];

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === 'all' 
    ? realCourses 
    : realCourses.filter(course => course.category === selectedCategory);

  // Filter available courses based on selected category
  const filteredAvailableCourses = selectedCategory === 'all' 
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

      {/* Part 1: Main Title - ?�費學�?課�? */}
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
                  {isZhTW ? '?�費學�?課�?' : 'Free Learning Courses'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                {isZhTW ? '精�?製�??��?費課程�?幫助你快?��??�AI?�?�並實現?�業?��?' : 'Carefully crafted free courses to help you quickly improve AI skills and achieve business goals'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Part 2: Featured Courses (3?�特?�課�? */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {availableCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-[520px] flex flex-col overflow-hidden bg-slate-800/50 backdrop-blur-sm border-slate-600/50 hover:border-blue-500/50 transition-all duration-300">
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-4xl flex-shrink-0">{course.image}</div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="secondary" className="mb-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {course.badge}
                        </Badge>
                        <CardTitle className="text-lg leading-tight text-white line-clamp-3 h-[4.5rem]">
                          {isZhTW ? course.titleCht : course.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300 text-sm line-clamp-2 h-[2.5rem]">
                      {isZhTW ? course.descriptionCht : course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-200">{isZhTW ? course.durationCht : course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-200">{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-200">{course.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-white">{isZhTW ? '?�含?�容�? : 'Includes:'}</h4>
                        <ul className="text-sm text-gray-300 space-y-1 h-[6rem] overflow-hidden">
                          {(isZhTW ? course.includesCht : course.includes).slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 pt-4 mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-400">
                            {course.badge || (isZhTW ? '?�費' : 'FREE')}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-slate-600/50 text-gray-200 border-slate-500/30">
                          {isZhTW ? course.typeCht : course.type}
                        </Badge>
                      </div>
                      
                      <Button 
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                        onClick={() => handleCourseClick(course.id)}
                      >
                        {course.id === 'ai-app-development' ? (isZhTW ? '?��??�班' : 'Coming Soon') : 
                         course.id === 'ai-formula-advertising' ? (isZhTW ? '?��??�班' : 'Coming Soon') : 
                         (isZhTW ? '了解?��?' : 'Learn More')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 3: 精選?�費課�? Title and Description */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isZhTW ? '精選?�費課�?' : 'Featured Free Courses'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {isZhTW ? '精�?製�??�數位課程�?幫助你快?��??��??�並實現?�業?��?' : 'Carefully crafted digital courses to help you quickly improve skills and achieve business goals'}
            </p>
          </div>

          {/* Course Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {isZhTW ? category.nameCht : category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Part 4: Real Courses (5?��?實課�? */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-[520px] flex flex-col overflow-hidden bg-slate-800/50 backdrop-blur-sm border-slate-600/50 hover:border-blue-500/50 transition-all duration-300">
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-4xl flex-shrink-0">{course.image}</div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="secondary" className="mb-2 bg-green-500/20 text-green-300 border-green-500/30">
                          {course.badge}
                        </Badge>
                        <CardTitle className="text-lg leading-tight text-white line-clamp-3 h-[4.5rem]">
                          {isZhTW ? course.titleCht : course.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300 text-sm line-clamp-2 h-[2.5rem]">
                      {isZhTW ? course.descriptionCht : course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-200">{isZhTW ? course.durationCht : course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-200">{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-200">{course.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-white">{isZhTW ? '?�含?�容�? : 'Includes:'}</h4>
                        <ul className="text-sm text-gray-300 space-y-1 h-[6rem] overflow-hidden">
                          {(isZhTW ? course.includesCht : course.includes).slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 pt-4 mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-green-400">
                            {course.badge || (isZhTW ? '?�費' : 'FREE')}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-slate-600/50 text-gray-200 border-slate-500/30">
                          {isZhTW ? course.typeCht : course.type}
                        </Badge>
                      </div>
                      
                      <Button 
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                        onClick={() => handleRealCourseClick(course.id)}
                      >
                        {isZhTW ? '?��?課�?大綱' : 'View Course Outline'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course; 
